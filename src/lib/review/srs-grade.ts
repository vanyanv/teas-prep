import type { Grade } from "@/lib/flashcards/sm2";

/**
 * Map a graded question outcome to an SM-2 grade. Pure (no DB) so it can be
 * unit-tested in isolation. A miss comes back today; a lucky guess comes back
 * soon; a confident-correct answer spaces out the most.
 *
 *   wrong               -> again
 *   correct + guessed   -> hard
 *   correct + unsure    -> good
 *   correct + confident -> easy   (null confidence treated as confident)
 */
export function gradeFromOutcome(
  isCorrect: boolean,
  confidence: number | null,
): Grade {
  if (!isCorrect) return "again";
  switch (confidence) {
    case 1:
      return "hard";
    case 2:
      return "good";
    default:
      return "easy";
  }
}
