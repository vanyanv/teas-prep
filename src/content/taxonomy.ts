import type { Section } from "@/lib/teas-blueprint";
import { BLUEPRINT } from "@/lib/teas-blueprint";
import { SKILLS, slugifySkill } from "@/content/skills";

/**
 * Stable identity layer for the TEAS taxonomy.
 *
 * The authored source of truth stays in TypeScript (`teas-blueprint.ts` +
 * `skills.ts`); this module derives a *stable slug id* for every section,
 * topic, skill, and lesson so the rest of the system (Question.skillId,
 * progress, exams) can reference identity instead of matching free-text
 * skill-name strings. IDs are derived from existing content, so nothing is
 * re-authored.
 *
 *   sectionId = Section enum value                 e.g. "SCIENCE"
 *   topicId   = blueprint topic key                e.g. "anatomy-physiology"
 *   skillId   = `${topicId}:${slugifySkill(name)}` e.g. "anatomy-physiology:cardiovascular-system"
 *   lessonId  = skillId (1:1 skill↔guided-lesson today; kept as a distinct
 *               name so a future many-lessons-per-skill split doesn't churn ids)
 */

export interface SkillNode {
  sectionId: Section;
  topicId: string;
  skillId: string;
  lessonId: string;
  /** canonical display name from skills.ts (matches Question.subtopic) */
  name: string;
}

export function skillIdFor(topicId: string, name: string): string {
  return `${topicId}:${slugifySkill(name)}`;
}

/** All 85 skills as identity nodes, in authored order. */
export const SKILL_NODES: SkillNode[] = SKILLS.flatMap((group) =>
  group.skills.map((name) => {
    const skillId = skillIdFor(group.topic, name);
    return {
      sectionId: group.section,
      topicId: group.topic,
      skillId,
      lessonId: skillId,
      name,
    } satisfies SkillNode;
  }),
);

const NODE_BY_ID = new Map<string, SkillNode>(SKILL_NODES.map((n) => [n.skillId, n]));
const NODE_BY_NAME = new Map<string, SkillNode>(SKILL_NODES.map((n) => [n.name, n]));

/**
 * Normalization overrides for skill names that appear in imported sources
 * (e.g. NurseHub score-sheet titles) but don't literally match `skills.ts`.
 * The shipped bank needs none of these (every subtopic matches exactly); this
 * table exists so `npm run import:nursehub` and future content can resolve
 * variant titles to the canonical skill. Keys are compared after `normalize()`.
 */
const NAME_OVERRIDES: Record<string, string> = {
  // "Identify the Topic or Main Idea" -> canonical
  "identify the topic or main idea": "Identify the Topic, Main Idea, and Supporting Details",
  "identify the topic main idea and supporting details":
    "Identify the Topic, Main Idea, and Supporting Details",
};

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const NODE_BY_NORMALIZED = new Map<string, SkillNode>(
  SKILL_NODES.map((n) => [normalize(n.name), n]),
);

/**
 * Resolve a free-text skill name (a Question.subtopic) to its canonical skill
 * node. Tries exact match, then normalized match, then the override table.
 * Returns null when the name maps to no known skill (caller decides how to
 * handle — e.g. leave skillId null and report it).
 */
export function resolveSkill(name: string | null | undefined): SkillNode | null {
  if (!name) return null;
  const exact = NODE_BY_NAME.get(name);
  if (exact) return exact;
  const norm = normalize(name);
  const byNorm = NODE_BY_NORMALIZED.get(norm);
  if (byNorm) return byNorm;
  const override = NAME_OVERRIDES[norm];
  if (override) return NODE_BY_NAME.get(override) ?? null;
  return null;
}

export function nodeBySkillId(skillId: string): SkillNode | null {
  return NODE_BY_ID.get(skillId) ?? null;
}

export function skillNodesForSection(section: Section): SkillNode[] {
  return SKILL_NODES.filter((n) => n.sectionId === section);
}

export function skillNodesForTopic(section: Section, topicId: string): SkillNode[] {
  return SKILL_NODES.filter((n) => n.sectionId === section && n.topicId === topicId);
}

/** Required-skill count per section (currently every skill is required). */
export function requiredSkillCount(section: Section): number {
  return skillNodesForSection(section).length;
}

/** Sanity: topic ids referenced by skills all exist in the blueprint. */
export function unknownTopicIds(): string[] {
  const known = new Set(
    Object.values(BLUEPRINT).flatMap((s) => s.topics.map((t) => t.key)),
  );
  return [...new Set(SKILL_NODES.map((n) => n.topicId))].filter((t) => !known.has(t));
}
