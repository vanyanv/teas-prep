import { track } from "@/lib/analytics";
import { db } from "@/lib/db";

/**
 * The funnel's two milestone completions, observed where they happen. Called
 * from both attempt-completion routes: diagnostics go through /submit while
 * sessions go through /finish, so neither route alone sees every completion.
 */
export async function trackAttemptCompletion(userId: string, attemptId: string) {
  const attempt = await db.attempt.findUnique({
    where: { id: attemptId },
    select: { mode: true, config: true, scorePct: true },
  });
  if (!attempt) return;
  if (attempt.mode === "DIAGNOSTIC") {
    await track(
      "diagnostic_completed",
      { scorePct: attempt.scorePct ?? undefined },
      { userId },
    );
    return;
  }
  const variant = (attempt.config as { variant?: string } | null)?.variant;
  if (attempt.mode === "PRACTICE" && variant === "session") {
    const nth = await db.attempt.count({
      where: {
        userId,
        mode: "PRACTICE",
        finishedAt: { not: null },
        config: { path: ["variant"], equals: "session" },
      },
    });
    // nth === 1 is the activation event.
    await track("session_completed", { nth }, { userId });
  }
}
