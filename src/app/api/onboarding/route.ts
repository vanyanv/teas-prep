import { NextResponse } from "next/server";

import { requireUserApi } from "@/lib/session";
import { track } from "@/lib/analytics";
import { db } from "@/lib/db";
import { onboardingSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const user = await requireUserApi();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = onboardingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }

  const { testDate, studyDaysPerWeek, sessionMinutes } = parsed.data;
  await db.user.update({
    where: { id: user.id },
    data: {
      ...(testDate !== undefined
        ? { testDate: testDate === "" ? null : new Date(`${testDate}T00:00:00`) }
        : {}),
      ...(studyDaysPerWeek !== undefined ? { studyDaysPerWeek } : {}),
      ...(sessionMinutes !== undefined ? { sessionMinutes } : {}),
      onboardedAt: new Date(),
    },
  });

  await track(
    "onboarding_completed",
    {
      hasTestDate: Boolean(testDate),
      hasCadence: studyDaysPerWeek != null || sessionMinutes != null,
    },
    { userId: user.id },
  );

  return NextResponse.json({ ok: true });
}
