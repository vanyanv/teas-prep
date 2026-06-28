import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { auth } from "@/auth";
import { setTaskDone } from "@/lib/plan/service";

export async function PATCH(
  request: NextRequest,
  ctx: RouteContext<"/api/plan/task/[id]">,
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const body = await request.json().catch(() => null);
  const done = !!body?.done;

  try {
    await setTaskDone(session.user.id, id, done);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
