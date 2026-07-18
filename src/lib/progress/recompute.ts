import { db } from "@/lib/db";
import { SKILL_NODES, type SkillNode } from "@/content/taxonomy";
import { quickCheckKeysForSlug } from "@/content/guided-lessons";
import { slugifySkill } from "@/content/skills";
import { SECTIONS, type Section } from "@/lib/teas-blueprint";
import {
  computeMastery,
  defaultMasteryConfig,
  type MasteryConfig,
  type MasteryItem,
} from "@/lib/progress/mastery";
import type { Confidence } from "@/lib/quiz/confidence";
import type { MasteryState } from "@/generated/prisma/enums";

/**
 * The SINGLE writer of the derived progress caches (UserSkillProgress,
 * UserSectionProgress). It reads only the source-of-truth logs (attempt items,
 * lesson completions, quick-check attempts, question reviews) and fully
 * rebuilds the caches, so the caches can never disagree with the truth and are
 * safe to drop and recompute at any time. Idempotent.
 */

export interface RecomputeConfig {
  mastery: MasteryConfig;
  /** items of one skill in a graded attempt needed to count as a skill quiz */
  skillQuizItems: number;
  /** section items in a finished attempt needed to treat it as a section quiz */
  sectionQuizItems: number;
}

export const defaultRecomputeConfig: RecomputeConfig = {
  mastery: defaultMasteryConfig,
  skillQuizItems: 6,
  sectionQuizItems: 5,
};

/** Quick-check totals per skillId, from guided-lesson content. */
function quickCheckTotals(): Map<string, number> {
  const m = new Map<string, number>();
  for (const n of SKILL_NODES) {
    m.set(n.skillId, quickCheckKeysForSlug(slugifySkill(n.name)).length);
  }
  return m;
}

interface AnsweredItem {
  attemptId: string;
  skillId: string | null;
  section: Section;
  difficulty: 1 | 2 | 3;
  isCorrect: boolean;
  confidence: Confidence | null;
  when: Date;
  spacedReview: boolean;
}

interface QuizAgg {
  latest: number;
  latestWhen: number;
  best: number;
}

/**
 * Per-skill "quiz" scores derived from finished, skill-focused attempts: a
 * graded attempt counts as a quiz on a skill when it contains at least
 * `min(skillQuizItems, questions available for that skill)` items of it. Latest
 * is by attempt time; best is the max accuracy across qualifying attempts.
 */
function quizScores(
  items: AnsweredItem[],
  finishedAttemptIds: Set<string>,
  availableBySkill: Map<string, number>,
  cfg: RecomputeConfig,
): Map<string, QuizAgg> {
  const byAttemptSkill = new Map<string, AnsweredItem[]>();
  for (const it of items) {
    if (!it.skillId || !finishedAttemptIds.has(it.attemptId)) continue;
    const k = `${it.attemptId} ${it.skillId}`;
    (byAttemptSkill.get(k) ?? byAttemptSkill.set(k, []).get(k)!).push(it);
  }
  const out = new Map<string, QuizAgg>();
  for (const [k, group] of byAttemptSkill) {
    const skillId = k.split(" ")[1];
    const threshold = Math.min(
      cfg.skillQuizItems,
      availableBySkill.get(skillId) ?? cfg.skillQuizItems,
    );
    if (group.length < threshold) continue;
    const pct = Math.round((group.filter((g) => g.isCorrect).length / group.length) * 100);
    const when = group.reduce((a, b) => (a.when >= b.when ? a : b)).when.getTime();
    const prev = out.get(skillId);
    if (!prev) {
      out.set(skillId, { latest: pct, latestWhen: when, best: pct });
    } else {
      out.set(skillId, {
        latest: when >= prev.latestWhen ? pct : prev.latest,
        latestWhen: Math.max(when, prev.latestWhen),
        best: Math.max(prev.best, pct),
      });
    }
  }
  return out;
}

/**
 * Section accuracy of the most recent *section-scoped* finished attempt — one
 * with enough items of the section AND where the section is the clear majority
 * (≥80%). This counts single-section diagnostics and section exams, but not a
 * full mock's section slice or a mixed session.
 */
function latestSectionQuiz(
  items: AnsweredItem[],
  finishedAttemptIds: Set<string>,
  attemptTotals: Map<string, number>,
  section: Section,
  minItems: number,
): number | null {
  const byAttempt = new Map<string, AnsweredItem[]>();
  for (const it of items) {
    if (it.section !== section || !finishedAttemptIds.has(it.attemptId)) continue;
    (byAttempt.get(it.attemptId) ?? byAttempt.set(it.attemptId, []).get(it.attemptId)!).push(it);
  }
  let bestWhen = -Infinity;
  let pct: number | null = null;
  for (const [attemptId, group] of byAttempt) {
    const total = attemptTotals.get(attemptId) ?? group.length;
    if (group.length < minItems || group.length / total < 0.8) continue;
    const when = group.reduce((a, b) => (a.when >= b.when ? a : b)).when.getTime();
    if (when > bestWhen) {
      bestWhen = when;
      pct = Math.round((group.filter((g) => g.isCorrect).length / group.length) * 100);
    }
  }
  return pct;
}

export interface SkillProgressRow {
  skillId: string;
  section: Section;
  topicId: string;
  lessonDone: boolean;
  quickChecksDone: number;
  quickChecksTotal: number;
  skillQuizDone: boolean;
  completed: boolean;
  masteryPct: number | null;
  masteryState: MasteryState;
  evidenceCount: number;
  latestQuizPct: number | null;
  bestQuizPct: number | null;
  reviewsDue: number;
}

export async function recomputeProgress(
  userId: string,
  cfg: RecomputeConfig = defaultRecomputeConfig,
): Promise<{ skills: number; sections: number }> {
  const now = Date.now();

  // ── Source-of-truth reads ────────────────────────────────────────────────
  const [attemptItems, lessonRows, quickRows, dueReviews, availableRows] = await Promise.all([
    db.attemptItem.findMany({
      where: { isCorrect: { not: null }, attempt: { userId } },
      select: {
        attemptId: true,
        isCorrect: true,
        confidence: true,
        question: { select: { skillId: true, section: true, difficulty: true } },
        attempt: { select: { finishedAt: true, startedAt: true, config: true } },
      },
      take: 10000,
    }),
    db.lessonCompletion.findMany({ where: { userId }, select: { lessonId: true } }),
    db.quickCheckAttempt.findMany({ where: { userId }, select: { skillId: true, checkKey: true } }),
    db.questionReview.findMany({
      where: { userId, dueDate: { lte: new Date(now) } },
      select: { question: { select: { skillId: true } } },
    }),
    db.question.groupBy({
      by: ["skillId"],
      where: { skillId: { not: null } },
      _count: { _all: true },
    }),
  ]);

  const lessonDone = new Set(lessonRows.map((r) => r.lessonId));
  const qcDone = new Map<string, Set<string>>();
  for (const r of quickRows) {
    (qcDone.get(r.skillId) ?? qcDone.set(r.skillId, new Set()).get(r.skillId)!).add(r.checkKey);
  }
  const reviewsDueBySkill = new Map<string, number>();
  for (const r of dueReviews) {
    const sid = r.question.skillId;
    if (sid) reviewsDueBySkill.set(sid, (reviewsDueBySkill.get(sid) ?? 0) + 1);
  }
  const availableBySkill = new Map<string, number>();
  for (const r of availableRows) if (r.skillId) availableBySkill.set(r.skillId, r._count._all);

  const finishedAttemptIds = new Set<string>();
  const items: AnsweredItem[] = [];
  for (const it of attemptItems) {
    const when = it.attempt.finishedAt ?? it.attempt.startedAt ?? new Date(now);
    if (it.attempt.finishedAt) finishedAttemptIds.add(it.attemptId);
    const variant = (it.attempt.config as { variant?: string } | null)?.variant;
    const rawDiff = it.question.difficulty;
    const difficulty: 1 | 2 | 3 = rawDiff === 1 || rawDiff === 3 ? rawDiff : 2;
    items.push({
      attemptId: it.attemptId,
      skillId: it.question.skillId,
      section: it.question.section,
      difficulty,
      isCorrect: !!it.isCorrect,
      confidence: (it.confidence as Confidence | null) ?? null,
      when,
      spacedReview: variant === "review",
    });
  }

  const attemptTotals = new Map<string, number>();
  for (const it of items) {
    if (finishedAttemptIds.has(it.attemptId)) {
      attemptTotals.set(it.attemptId, (attemptTotals.get(it.attemptId) ?? 0) + 1);
    }
  }

  const qcTotals = quickCheckTotals();
  const quizBySkill = quizScores(items, finishedAttemptIds, availableBySkill, cfg);

  const itemsBySkill = new Map<string, MasteryItem[]>();
  for (const it of items) {
    if (!it.skillId) continue;
    const list = itemsBySkill.get(it.skillId) ?? itemsBySkill.set(it.skillId, []).get(it.skillId)!;
    list.push({
      isCorrect: it.isCorrect,
      confidence: it.confidence,
      difficulty: it.difficulty,
      when: it.when,
      spacedReview: it.spacedReview,
    });
  }

  // ── Per-skill rows ───────────────────────────────────────────────────────
  const skillRows: SkillProgressRow[] = SKILL_NODES.map((node: SkillNode) => {
    const mastery = computeMastery(itemsBySkill.get(node.skillId) ?? [], cfg.mastery, now);
    const quickTotal = qcTotals.get(node.skillId) ?? 0;
    const quickDone = qcDone.get(node.skillId)?.size ?? 0;
    const lessonOk = lessonDone.has(node.lessonId);
    const quiz = quizBySkill.get(node.skillId);
    const skillQuizDone = quiz !== undefined;
    const completed = lessonOk && quickDone >= quickTotal && skillQuizDone;
    return {
      skillId: node.skillId,
      section: node.sectionId,
      topicId: node.topicId,
      lessonDone: lessonOk,
      quickChecksDone: Math.min(quickDone, quickTotal),
      quickChecksTotal: quickTotal,
      skillQuizDone,
      completed,
      masteryPct: mastery.pct,
      masteryState: mastery.state,
      evidenceCount: mastery.evidenceCount,
      latestQuizPct: quiz?.latest ?? null,
      bestQuizPct: quiz?.best ?? null,
      reviewsDue: reviewsDueBySkill.get(node.skillId) ?? 0,
    };
  });

  // ── Section aggregates ───────────────────────────────────────────────────
  const sectionRows = SECTIONS.map((spec) => {
    const nodes = skillRows.filter((r) => r.section === spec.key);
    const sectionItems: MasteryItem[] = items
      .filter((it) => it.section === spec.key && it.skillId)
      .map((it) => ({
        isCorrect: it.isCorrect,
        confidence: it.confidence,
        difficulty: it.difficulty,
        when: it.when,
        spacedReview: it.spacedReview,
      }));
    const sectionMastery = computeMastery(sectionItems, cfg.mastery, now);
    return {
      section: spec.key,
      skillsCompleted: nodes.filter((n) => n.completed).length,
      skillsRequired: nodes.length,
      masteryPct: sectionMastery.pct,
      latestQuizPct: latestSectionQuiz(
        items,
        finishedAttemptIds,
        attemptTotals,
        spec.key,
        cfg.sectionQuizItems,
      ),
    };
  });

  // ── Rebuild caches in one transaction ────────────────────────────────────
  await db.$transaction([
    db.userSkillProgress.deleteMany({ where: { userId } }),
    db.userSectionProgress.deleteMany({ where: { userId } }),
    db.userSkillProgress.createMany({ data: skillRows.map((r) => ({ userId, ...r })) }),
    db.userSectionProgress.createMany({ data: sectionRows.map((r) => ({ userId, ...r })) }),
  ]);

  return { skills: skillRows.length, sections: sectionRows.length };
}
