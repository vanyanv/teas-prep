import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { signupSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = signupSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }

  const { email, password, name, testDate, targetScore } = parsed.data;

  const examDate = testDate ? new Date(`${testDate}T00:00:00`) : null;
  if (examDate && Number.isNaN(examDate.getTime())) {
    return NextResponse.json({ error: "Invalid exam date" }, { status: 400 });
  }

  const existing = await db.user.findUnique({
    where: { email: email.toLowerCase() },
    select: { id: true },
  });
  if (existing) {
    return NextResponse.json(
      { error: "An account with this email already exists." },
      { status: 409 },
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await db.user.create({
    data: {
      email: email.toLowerCase(),
      name: name ?? null,
      passwordHash,
      testDate: examDate,
      targetScore: targetScore ?? 70,
    },
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
