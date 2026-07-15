import { getMasteryData } from "@/lib/mastery";
import { pickWeakest } from "@/lib/study/today";
import { getDueQuestionIds } from "@/lib/review/question-srs";
import { startFromIds, type StartedAttempt } from "@/lib/quiz/attempt";
import { getSkills, slugifySkill } from "@/content/skills";
import { getSkillLesson } from "@/content/skill-lessons";
import type { SkillLesson } from "@/content/skill-lesson-types";
import { BLUEPRINT, TOTAL_SCORED, type Section } from "@/lib/teas-blueprint";

const REVIEW_CAP = 4;
const PRACTICE_COUNT = 10;

/**
 * Order a question pool unseen-first (both halves shuffled), returning up to
 * `want` ids. Protects the bank from feeling repetitive: fresh material leads,
 * repeats only fill gaps.
 */
export function orderUnseenFirst(
  pool: { id: string }[],
  seen: Set<string>,
  want: number,
  rand: () => number = Math.random,
): string[] {
  const shuffle = <T,>(arr: T[]): T[] => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const unseen = shuffle(pool.filter((q) => !seen.has(q.id)));
  const rest = shuffle(pool.filter((q) => seen.has(q.id)));
  return [...unseen, ...rest].slice(0, Math.max(0, want)).map((q) => q.id);
}

export interface SkillStat {
  skill: string;
  attempts: number;
  correct: number;
}

/**
 * Pick the focus skill for the session's micro-lesson: least-attempted first
 * (new material beats re-teaching), then lowest accuracy. `available` limits
 * the choice to skills that actually have a lesson.
 */
export function pickFocusSkill(
  skills: string[],
  stats: SkillStat[],
  available: Set<string>,
): string | null {
  const byName = new Map(stats.map((s) => [s.skill, s]));
  const candidates = skills.filter((s) => available.has(s));
  if (candidates.length === 0) return null;
  return [...candidates].sort((a, b) => {
    const sa = byName.get(a) ?? { attempts: 0, correct: 0 };
    const sb = byName.get(b) ?? { attempts: 0, correct: 0 };
    if (sa.attempts !== sb.attempts) return sa.attempts - sb.attempts;
    const accA = sa.attempts ? sa.correct / sa.attempts : 0;
    const accB = sb.attempts ? sb.correct / sb.attempts : 0;
    return accA - accB;
  })[0];
}

export interface ComposedSession extends StartedAttempt {
  whyLine: string;
  reviewCount: number;
  lesson: SkillLesson | null;
  focus: { section: Section; topic: string; label: string };
}

export interface SessionPlan {
  questionIds: string[];
  reviewCount: number;
  practiceCount: number;
  lessonSkill: string | null;
  lesson: SkillLesson | null;
  whyLine: string;
  focus: { section: Section; topic: string; label: string };
}

/**
 * Plan today's session without persisting anything: due-review warm-up (≤4), a
 * skill micro-lesson, and unseen-first practice (≤10) on the weakest topic.
 * Returns null when the user has no answer history yet (the diagnostic comes
 * first) or nothing is available. Counts are deterministic given DB state, so
 * a preview built from this cannot drift from the session that then starts.
 */
export async function planSession(userId: string): Promise<SessionPlan | null> {
  const { db } = await import("@/lib/db");
  const mastery = await getMasteryData(userId);
  if (mastery.totalAnswered === 0) return null;
  const weakest = pickWeakest(mastery.topics);
  if (!weakest) return null;

  const now = new Date();
  const dueIds = await getDueQuestionIds(userId, now, REVIEW_CAP);
  const dueSet = new Set(dueIds);

  const seenRows = await db.attemptItem.findMany({
    where: { attempt: { userId }, isCorrect: { not: null } },
    select: { questionId: true },
    distinct: ["questionId"],
  });
  const seen = new Set(seenRows.map((r) => r.questionId));

  const pool = await db.question.findMany({
    where: {
      section: weakest.section,
      topic: weakest.topic,
      OR: [{ ownerId: null }, { ownerId: userId }],
    },
    select: { id: true },
  });
  const practiceIds = orderUnseenFirst(
    pool.filter((q) => !dueSet.has(q.id)),
    seen,
    PRACTICE_COUNT,
  );

  const ids = [...dueIds, ...practiceIds];
  if (ids.length === 0) return null;

  // Focus skill for the micro-lesson: least practiced, least accurate.
  const topicItems = await db.attemptItem.findMany({
    where: {
      attempt: { userId },
      isCorrect: { not: null },
      question: { section: weakest.section, topic: weakest.topic },
    },
    select: { isCorrect: true, question: { select: { subtopic: true } } },
  });
  const statMap = new Map<string, { attempts: number; correct: number }>();
  for (const it of topicItems) {
    const skill = it.question.subtopic;
    if (!skill) continue;
    const b = statMap.get(skill) ?? { attempts: 0, correct: 0 };
    b.attempts += 1;
    if (it.isCorrect) b.correct += 1;
    statMap.set(skill, b);
  }
  const skills = getSkills(weakest.section, weakest.topic);
  const withLessons = new Set(
    skills.filter((s) =>
      getSkillLesson(weakest.section, weakest.topic, slugifySkill(s)),
    ),
  );
  const focusSkill = pickFocusSkill(
    skills,
    [...statMap].map(([skill, b]) => ({ skill, ...b })),
    withLessons,
  );
  const lesson = focusSkill
    ? (getSkillLesson(weakest.section, weakest.topic, slugifySkill(focusSkill)) ?? null)
    : null;

  const scored =
    BLUEPRINT[weakest.section].topics.find((t) => t.key === weakest.topic)?.scored ?? 0;
  const weightPct = Math.round((scored / TOTAL_SCORED) * 100);
  const whyLine = `${weakest.label} is your weakest area${
    weakest.pct != null ? ` (${weakest.pct}% mastery)` : ""
  } and carries about ${weightPct}% of the exam.`;

  return {
    questionIds: ids,
    reviewCount: dueIds.length,
    practiceCount: ids.length - dueIds.length,
    lessonSkill: focusSkill,
    lesson,
    whyLine,
    focus: { section: weakest.section, topic: weakest.topic, label: weakest.label },
  };
}

/** Plan today's session and start the backing attempt. */
export async function composeSession(userId: string): Promise<ComposedSession | null> {
  const plan = await planSession(userId);
  if (!plan) return null;

  const started = await startFromIds(userId, "PRACTICE", plan.questionIds, {
    variant: "session",
    section: plan.focus.section,
    topic: plan.focus.topic,
    lessonSkill: plan.lessonSkill,
    reviewCount: plan.reviewCount,
  });

  return {
    ...started,
    whyLine: plan.whyLine,
    reviewCount: plan.reviewCount,
    lesson: plan.lesson,
    focus: plan.focus,
  };
}
