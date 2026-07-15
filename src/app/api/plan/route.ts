import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { createPlan } from "@/lib/plan/service";
import { resolvePlanInputs } from "@/lib/plan/defaults";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { testDate: true },
  });

  const inputs = resolvePlanInputs({
    bodyTestDate: typeof body?.testDate === "string" ? body.testDate : null,
    bodyHours: body?.hoursPerWeek != null ? Number(body.hoursPerWeek) : null,
    userTestDate: user?.testDate ?? null,
  });

  const planId = await createPlan(session.user.id, inputs.testDate, inputs.hoursPerWeek);
  return NextResponse.json({ planId });
}
