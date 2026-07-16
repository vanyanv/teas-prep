import type { GuidedLesson } from "./guided-lesson-types";
import { ARITHMETIC_RATIONAL_NUMBERS } from "./guided-lessons/arithmetic-rational-numbers";

/**
 * Registry of skills converted to the guided lesson format. Skills not listed
 * here fall back to the flat LessonContent renderer, so conversion ships one
 * skill at a time.
 */
const GUIDED_LESSONS: GuidedLesson[] = [ARITHMETIC_RATIONAL_NUMBERS];

export function getGuidedLesson(
  section: string,
  topic: string,
  slug: string,
): GuidedLesson | undefined {
  return GUIDED_LESSONS.find(
    (l) => l.section === section && l.topic === topic && l.slug === slug,
  );
}
