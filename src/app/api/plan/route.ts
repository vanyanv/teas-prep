import { NextResponse } from "next/server";

import { requireUserApi } from "@/lib/session";
import { createPlan } from "@/lib/plan/service";
import { resolvePlanInputs } from "@/lib/plan/defaults";

export async function POST(request: Request) {
  const user = await requireUserApi();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));

  const inputs = resolvePlanInputs({
    bodyTestDate: typeof body?.testDate === "string" ? body.testDate : null,
    bodyDays: body?.daysPerWeek != null ? Number(body.daysPerWeek) : null,
    userTestDate: user.testDate ?? null,
    userDaysPerWeek: user.studyDaysPerWeek ?? null,
  });

  const planId = await createPlan(user.id, inputs.testDate, inputs.daysPerWeek);
  return NextResponse.json({ planId });
}
