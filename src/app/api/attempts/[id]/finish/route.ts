import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { requireUserApi } from "@/lib/session";
import { finalizeAttempt } from "@/lib/quiz/attempt";
import { trackAttemptCompletion } from "@/lib/quiz/track-completion";

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
    await trackAttemptCompletion(user.id, id);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Could not finish attempt" }, { status: 400 });
  }
}
