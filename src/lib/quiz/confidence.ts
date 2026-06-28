/**
 * Self-reported confidence on a graded answer.
 * 1 = guessed, 2 = unsure, 3 = confident. null = unrated (optional; the
 * confidence meter never blocks moving on, so an unrated answer is treated as
 * confident).
 */
export type Confidence = 1 | 2 | 3;

/**
 * Mastery credit (0..1) for a single graded item, weighted by confidence.
 *
 * A correct-but-guessed answer barely counts: getting it right by luck does not
 * mean the topic is learned, so the plan keeps prioritizing it. An unrated
 * correct answer earns full credit (confidence is optional).
 */
export function masteryCredit(
  isCorrect: boolean,
  confidence: number | null,
): number {
  if (!isCorrect) return 0;
  switch (confidence) {
    case 1:
      return 0.25; // correct but guessed
    case 2:
      return 0.5; // correct but unsure
    default:
      return 1; // confident, or unrated
  }
}
