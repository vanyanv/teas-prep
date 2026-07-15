import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { auth } from "@/auth";
import { answerItem } from "@/lib/quiz/attempt";
import type { Answer } from "@/lib/quiz/types";

export async function POST(
  request: NextRequest,
  ctx: RouteContext<"/api/attempts/[id]/answer">,
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || typeof body.questionId !== "string") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  try {
    const feedback = await answerItem(
      session.user.id,
      id,
      body.questionId,
      (body.answer ?? null) as Answer,
      typeof body.confidence === "number" ? body.confidence : null,
      typeof body.timeMs === "number" ? body.timeMs : null,
    );
    return NextResponse.json(feedback);
  } catch {
    return NextResponse.json({ error: "Could not grade answer" }, { status: 400 });
  }
}
