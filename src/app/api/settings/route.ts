import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { settingsSchema } from "@/lib/validators";

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = settingsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }

  const { name, testDate, targetScore } = parsed.data;
  await db.user.update({
    where: { id: session.user.id },
    data: {
      ...(name !== undefined ? { name } : {}),
      ...(testDate !== undefined
        ? { testDate: testDate === "" ? null : new Date(`${testDate}T00:00:00`) }
        : {}),
      ...(targetScore !== undefined ? { targetScore } : {}),
    },
  });

  return NextResponse.json({ ok: true });
}
