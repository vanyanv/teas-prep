import type { Section } from "@/lib/teas-blueprint";
import type { QuestionType } from "@/lib/quiz/types";

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
  /** asset paths for figures (and the base image for HOT_SPOT) */
  images?: string[];
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
