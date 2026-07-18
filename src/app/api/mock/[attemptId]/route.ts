import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { requireUserApi } from "@/lib/session";
import { discardMock } from "@/lib/quiz/attempt";

/** Discard an in-progress (never-submitted) mock so the user can start fresh. */
export async function DELETE(
  _request: NextRequest,
  ctx: { params: Promise<{ attemptId: string }> },
) {
  const user = await requireUserApi();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { attemptId } = await ctx.params;
  await discardMock(user.id, attemptId);
  return NextResponse.json({ ok: true });
}
