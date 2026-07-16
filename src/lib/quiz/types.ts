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
  images?: string[] | null;
  hotspots?: { x: number; y: number; w: number; h: number; label?: string }[] | null;
  attribution?: string | null;
}

/** A user's answer, shape mirrors the question type. */
export type Answer = number | number[] | string | null;

/** Question as sent to the browser — correct answers and rationale stripped. */
export type ClientQuestion = Omit<QuizQuestion, "correct" | "explanation" | "rationale">;
