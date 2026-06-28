import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { createPlan } from "@/lib/plan/service";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const testDateStr = body?.testDate as string | undefined;
  const hoursPerWeek = Number(body?.hoursPerWeek);

  const testDate = testDateStr ? new Date(testDateStr) : null;
  if (!testDate || Number.isNaN(testDate.getTime())) {
    return NextResponse.json({ error: "Invalid test date" }, { status: 400 });
  }
  if (!Number.isFinite(hoursPerWeek) || hoursPerWeek < 1 || hoursPerWeek > 60) {
    return NextResponse.json({ error: "Invalid hours per week" }, { status: 400 });
  }

  const planId = await createPlan(session.user.id, testDate, hoursPerWeek);
  return NextResponse.json({ planId });
}
