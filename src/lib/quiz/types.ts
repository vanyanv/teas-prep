import type { Section } from "@/lib/teas-blueprint";

export type QuestionType =
  | "SINGLE"
  | "MULTI"
  | "FILL_BLANK"
  | "ORDERED"
  | "HOT_SPOT";

/** Minimal question shape the quiz engine and UI need (DB-agnostic). */
export interface QuizQuestion {
  id: string;
  section: Section;
  topic: string;
  subtopic?: string | null;
  difficulty: number;
  type: QuestionType;
  stem: string;
  /** answer choices; empty for FILL_BLANK */
  options: string[];
  /**
   * Correct answer, shape depends on type:
   * - SINGLE / HOT_SPOT: number[] (one index) or set of correct indices
   * - MULTI: number[] of correct indices
   * - ORDERED: number[] giving the correct order of option indices
   * - FILL_BLANK: string[] of acceptable answers
   */
  correct: number[] | string[];
  explanation?: string | null;
  /** optional structured rationale JSON (see lib/quiz/rationale.ts) */
  rationale?: unknown;
  images?: QuestionImage[] | null;
  hotspots?: { x: number; y: number; w: number; h: number; label?: string }[] | null;
  attribution?: string | null;
}

/**
 * A figure attached to a question. The bare-string form is the original shape
 * and stays supported because `Question.images` is untyped Json holding
 * hundreds of existing rows; the object form adds the alt text that form could
 * never carry. Read through `imageSrc`/`imageAlt` rather than branching inline.
 */
export type QuestionImage = string | { src: string; alt: string };

export function imageSrc(img: QuestionImage): string {
  return typeof img === "string" ? img : img.src;
}

/**
 * Alt text for a figure. Legacy string-only images have none, and a generic
 * "Question figure" is worse than nothing for a screen reader: it announces an
 * image without conveying it. Returning empty marks those decorative so the
 * reader skips them, and `validate-assets` keeps new figures out of that state.
 */
export function imageAlt(img: QuestionImage): string {
  return typeof img === "string" ? "" : img.alt;
}

/** A user's answer, shape mirrors the question type. */
export type Answer = number | number[] | string | null;

/** Question as sent to the browser — correct answers and rationale stripped. */
export type ClientQuestion = Omit<QuizQuestion, "correct" | "explanation" | "rationale">;
