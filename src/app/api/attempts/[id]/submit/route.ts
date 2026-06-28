import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { auth } from "@/auth";
import { submitAttempt } from "@/lib/quiz/attempt";

export async function POST(
  request: NextRequest,
  ctx: RouteContext<"/api/attempts/[id]/submit">,
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const answers = (body.answers ?? {}) as Record<string, never>;
  const flagged = Array.isArray(body.flagged) ? (body.flagged as string[]) : [];

  try {
    const result = await submitAttempt(session.user.id, id, answers, flagged);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Could not submit" }, { status: 400 });
  }
}
