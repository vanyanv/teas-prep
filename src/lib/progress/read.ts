import { db } from "@/lib/db";
import { recomputeProgress } from "@/lib/progress/recompute";
import { SKILL_NODES } from "@/content/taxonomy";
import { slugifySkill } from "@/content/skills";
import { learnSectionHref, learnSkillHref, practiceHref } from "@/lib/quiz/links";
import {
  BLUEPRINT,
  SECTION_ORDER,
  sectionLabel,
  topicLabel,
  type Section,
} from "@/lib/teas-blueprint";
import type { MasteryState } from "@/generated/prisma/enums";

/**
 * Read side of the progress caches. If a user has no cached section rows yet
 * (new user, or first load after this feature shipped), recompute lazily.
 * Mutation paths keep the cache fresh thereafter, so this rebuild is rare.
 */
export async function ensureProgress(userId: string): Promise<void> {
  const has = await db.userSectionProgress.count({ where: { userId } });
  if (has === 0) await recomputeProgress(userId);
}

const nodeBySkillId = new Map(SKILL_NODES.map((n) => [n.skillId, n]));

export const MASTERY_LABEL: Record<MasteryState, string> = {
  NOT_STARTED: "Not started",
  LEARNING: "Learning",
  PRACTICING: "Practicing",
  PROFICIENT: "Proficient",
  MASTERED: "Mastered",
};

export interface SubjectCard {
  section: Section;
  label: string;
  href: string;
  skillsCompleted: number;
  skillsRequired: number;
  completionPct: number;
  masteryPct: number | null;
  latestQuizPct: number | null;
  /** one recommended next action for this section */
  next: { label: string; href: string } | null;
}

export interface SkillProgressView {
  skillId: string;
  name: string;
  topicId: string;
  topicLabel: string;
  completed: boolean;
  lessonDone: boolean;
  quickChecksDone: number;
  quickChecksTotal: number;
  skillQuizDone: boolean;
  masteryPct: number | null;
  masteryState: MasteryState;
  masteryLabel: string;
  latestQuizPct: number | null;
  bestQuizPct: number | null;
  reviewsDue: number;
  learnHref: string;
  practiceHref: string;
}

function pctComplete(done: number, total: number): number {
  return total === 0 ? 0 : Math.round((done / total) * 100);
}

/** Subject cards for the Learn page: completion + mastery + latest quiz + next. */
export async function getSubjectCards(userId: string): Promise<SubjectCard[]> {
  await ensureProgress(userId);
  const [sections, skills] = await Promise.all([
    db.userSectionProgress.findMany({ where: { userId } }),
    db.userSkillProgress.findMany({ where: { userId } }),
  ]);
  const secByKey = new Map(sections.map((s) => [s.section, s]));
  const skillsBySection = new Map<Section, typeof skills>();
  for (const s of skills) {
    const list = skillsBySection.get(s.section) ?? [];
    list.push(s);
    skillsBySection.set(s.section, list);
  }

  return SECTION_ORDER.map((section) => {
    const sec = secByKey.get(section);
    const required = sec?.skillsRequired || BLUEPRINT[section].topics.length; // fallback
    const completed = sec?.skillsCompleted ?? 0;
    return {
      section,
      label: sectionLabel(section),
      href: learnSectionHref(section),
      skillsCompleted: completed,
      skillsRequired: sec?.skillsRequired ?? required,
      completionPct: pctComplete(completed, sec?.skillsRequired ?? required),
      masteryPct: sec?.masteryPct ?? null,
      latestQuizPct: sec?.latestQuizPct ?? null,
      next: recommendNext(section, skillsBySection.get(section) ?? []),
    };
  });
}

/** The single best next action within a section. */
function recommendNext(
  section: Section,
  skills: { skillId: string; completed: boolean; reviewsDue: number; masteryPct: number | null; lessonDone: boolean }[],
): { label: string; href: string } | null {
  // 1) due reviews first
  const due = skills.reduce((n, s) => n + s.reviewsDue, 0);
  if (due > 0) return { label: `Review ${due} due`, href: practiceHref({ review: true }) };
  // 2) weakest assessed-but-incomplete skill
  const assessed = skills
    .filter((s) => !s.completed && s.masteryPct !== null)
    .sort((a, b) => (a.masteryPct ?? 0) - (b.masteryPct ?? 0));
  const weakest = assessed[0];
  if (weakest) {
    const node = nodeBySkillId.get(weakest.skillId);
    if (node) return { label: "Practice weakest skill", href: learnSkillHref(section, node.topicId, node.name) };
  }
  // 3) first un-started skill
  const fresh = skills.find((s) => !s.lessonDone);
  if (fresh) {
    const node = nodeBySkillId.get(fresh.skillId);
    if (node) return { label: "Start next skill", href: learnSkillHref(section, node.topicId, node.name) };
  }
  return { label: "Review this section", href: learnSectionHref(section) };
}

/** Per-skill rows for a section (Learn drill-down / Progress Subjects tab). */
export async function getSkillProgress(
  userId: string,
  section: Section,
): Promise<SkillProgressView[]> {
  await ensureProgress(userId);
  const rows = await db.userSkillProgress.findMany({ where: { userId, section } });
  const byId = new Map(rows.map((r) => [r.skillId, r]));

  // Preserve authored skill order from the taxonomy.
  return SKILL_NODES.filter((n) => n.sectionId === section).map((node) => {
    const r = byId.get(node.skillId);
    const state = (r?.masteryState ?? "NOT_STARTED") as MasteryState;
    return {
      skillId: node.skillId,
      name: node.name,
      topicId: node.topicId,
      topicLabel: topicLabel(section, node.topicId),
      completed: r?.completed ?? false,
      lessonDone: r?.lessonDone ?? false,
      quickChecksDone: r?.quickChecksDone ?? 0,
      quickChecksTotal: r?.quickChecksTotal ?? 0,
      skillQuizDone: r?.skillQuizDone ?? false,
      masteryPct: r?.masteryPct ?? null,
      masteryState: state,
      masteryLabel: MASTERY_LABEL[state],
      latestQuizPct: r?.latestQuizPct ?? null,
      bestQuizPct: r?.bestQuizPct ?? null,
      reviewsDue: r?.reviewsDue ?? 0,
      learnHref: learnSkillHref(section, node.topicId, node.name),
      practiceHref: practiceHref({ subtopic: node.name, start: true }),
    };
  });
}

/** Cross-section rollup for the Progress Overview tab. */
export async function getProgressSummary(userId: string): Promise<{
  skillsCompleted: number;
  skillsTotal: number;
  skillsMastered: number;
}> {
  await ensureProgress(userId);
  const [completed, mastered] = await Promise.all([
    db.userSkillProgress.count({ where: { userId, completed: true } }),
    db.userSkillProgress.count({ where: { userId, masteryState: "MASTERED" } }),
  ]);
  return { skillsCompleted: completed, skillsTotal: SKILL_NODES.length, skillsMastered: mastered };
}

/** Slug helper for building lesson links from a skill name (re-export). */
export { slugifySkill };
