import type { Section } from "@/lib/teas-blueprint";
import { slugifySkill } from "@/content/skills";

/**
 * Canonical deep-links so every surface that *shows* a weakness can also *act*
 * on it. Section keys are the blueprint enum values (e.g. "SCIENCE"); topic is
 * the blueprint topic key; subtopic is the full skill name (URL-encoded).
 */
export interface PracticeLink {
  section?: Section | string;
  topic?: string;
  subtopic?: string;
  difficulty?: number;
  count?: number;
  /** spaced-repetition review queue instead of a filtered drill */
  review?: boolean;
}

export function practiceHref(opts: PracticeLink = {}): string {
  if (opts.review) return "/practice?mode=review";
  const p = new URLSearchParams();
  if (opts.section) p.set("section", String(opts.section));
  if (opts.topic) p.set("topic", opts.topic);
  if (opts.subtopic) p.set("subtopic", opts.subtopic);
  if (opts.difficulty) p.set("difficulty", String(opts.difficulty));
  if (opts.count) p.set("count", String(opts.count));
  const qs = p.toString();
  return qs ? `/practice?${qs}` : "/practice";
}

export function learnSectionHref(section: Section | string): string {
  return `/learn/${section}`;
}

export function learnTopicHref(section: Section | string, topic: string): string {
  return `/learn/${section}/${topic}`;
}

export function learnSkillHref(
  section: Section | string,
  topic: string,
  skill: string,
): string {
  return `/learn/${section}/${topic}/${slugifySkill(skill)}`;
}
