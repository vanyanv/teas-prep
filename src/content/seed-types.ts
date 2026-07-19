import type { Section } from "@/lib/teas-blueprint";
import type { QuestionType, QuestionImage } from "@/lib/quiz/types";
import type { StructuredRationale } from "@/lib/quiz/rationale";

export interface SeedQuestion {
  section: Section;
  topic: string;
  subtopic?: string;
  difficulty?: 1 | 2 | 3;
  type?: QuestionType; // default SINGLE
  stem: string;
  options: string[];
  /** indices for SINGLE/MULTI/ORDERED/HOT_SPOT; strings for FILL_BLANK */
  correct: number[] | string[];
  explanation: string;
  /**
   * Optional structured rationale (takeaway, steps, whyCorrect, distractors,
   * commonMistake). Authored progressively; the UI falls back to
   * `explanation` for anything missing.
   */
  rationale?: StructuredRationale;
  /**
   * Figures for the question (and the base image for HOT_SPOT). Prefer the
   * `{ src, alt }` form: the bare string carries no alt text and is kept only
   * for questions authored before figures had any.
   */
  images?: QuestionImage[];
  /** Registry id from `src/content/assets.ts` when the figure is a diagram. */
  assetId?: string;
  /**
   * Clickable regions for HOT_SPOT, in PERCENT of the image box (0-100).
   * The region's array position is its answer index (matches `correct`).
   */
  hotspots?: { x: number; y: number; w: number; h: number; label?: string }[];
}

export interface SeedFlashcard {
  topic: string;
  front: string;
  back: string;
}
