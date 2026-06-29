import type { Section } from "@/lib/teas-blueprint";
import type { LessonBlock } from "./lesson-types";

export interface SkillLesson {
  section: Section;
  topic: string; // blueprint topic key
  skill: string; // full skill name (matches skills.ts + question.subtopic)
  slug: string; // slugifySkill(skill)
  summary: string;
  blocks: LessonBlock[];
}
