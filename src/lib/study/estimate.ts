/**
 * Session length estimate; the single source shared by the session intro
 * (client) and Today's preview (server). Pure — safe to import anywhere.
 *
 * `lessonMinutes` is the low end of the guided lesson's own range, or null when
 * the session has no lesson. The low end is the honest figure here: the session
 * reads the lesson straight through without its quick checks, so it runs
 * shorter than the same lesson does in Learn.
 */
export function estimateSessionMinutes(
  questionCount: number,
  lessonMinutes: number | null,
): number {
  return Math.round(questionCount * 1.2 + (lessonMinutes ?? 0));
}
