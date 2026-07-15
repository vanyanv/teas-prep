/**
 * Session length estimate; the single source shared by the session intro
 * (client) and Today's preview (server). Pure — safe to import anywhere.
 */
export function estimateSessionMinutes(
  questionCount: number,
  hasLesson: boolean,
): number {
  return Math.round(questionCount * 1.2 + (hasLesson ? 5 : 0));
}
