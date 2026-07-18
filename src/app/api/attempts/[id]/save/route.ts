import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { requireUserApi } from "@/lib/session";
import { saveAttemptItem } from "@/lib/quiz/attempt";
import type { Answer } from "@/lib/quiz/types";

/**
 * Autosave one in-progress answer (no grading). The mock posts here as the user
 * answers so a refresh or crash never loses work.
 */
export async function POST(
  request: NextRequest,
  ctx: { params: Promise<{ id: string }> },
) {
  const user = await requireUserApi();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await ctx.params;
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || typeof body.questionId !== "string") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  try {
    await saveAttemptItem(user.id, id, body.questionId, {
      ...("answer" in body ? { selected: (body.answer ?? null) as Answer } : {}),
      ...(typeof body.confidence === "number" ? { confidence: body.confidence } : {}),
      ...(typeof body.flagged === "boolean" ? { flagged: body.flagged } : {}),
    });
    return NextResponse.json({ ok: true });
  } catch {
    // Autosave is best-effort; a stale attempt id shouldn't surface an error.
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
