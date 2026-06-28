import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { signupSchema } from "@/lib/validators";

export async function POST(request: Request) {
  // Single-user app: registration self-disables once an account exists.
  const existing = await db.user.count();
  if (existing > 0) {
    return NextResponse.json(
      { error: "Registration is closed." },
      { status: 403 },
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = signupSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }

  const { email, password, name } = parsed.data;
  const passwordHash = await bcrypt.hash(password, 12);

  await db.user.create({
    data: { email: email.toLowerCase(), name: name ?? null, passwordHash },
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}

// Lets the signup page know whether registration is still open.
export async function GET() {
  const existing = await db.user.count();
  return NextResponse.json({ open: existing === 0 });
}
