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
}

export interface SeedFlashcard {
  topic: string;
  front: string;
  back: string;
}
