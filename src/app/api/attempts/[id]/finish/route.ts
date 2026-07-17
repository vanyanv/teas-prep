import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { requireUserApi } from "@/lib/session";
import { track } from "@/lib/analytics";
import { db } from "@/lib/db";
import { finalizeAttempt } from "@/lib/quiz/attempt";

/** The funnel's two milestone completions, observed where they happen. */
async function trackCompletion(userId: string, attemptId: string) {
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

export async function POST(
  _request: NextRequest,
  ctx: RouteContext<"/api/attempts/[id]/finish">,
) {
  const user = await requireUserApi();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  try {
    const result = await finalizeAttempt(user.id, id);
    await trackCompletion(user.id, id);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Could not finish attempt" }, { status: 400 });
  }
}
