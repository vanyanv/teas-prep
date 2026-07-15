import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { auth } from "@/auth";
import { finalizeAttempt } from "@/lib/quiz/attempt";

export async function POST(
  _request: NextRequest,
  ctx: RouteContext<"/api/attempts/[id]/finish">,
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  try {
    const result = await finalizeAttempt(session.user.id, id);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Could not finish attempt" }, { status: 400 });
  }
}
