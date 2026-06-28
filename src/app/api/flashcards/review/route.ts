import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { gradeCard } from "@/lib/flashcards/service";
import type { Grade } from "@/lib/flashcards/sm2";

const GRADES: Grade[] = ["again", "hard", "good", "easy"];

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  const cardId = body?.cardId as string | undefined;
  const grade = body?.grade as Grade | undefined;
  if (!cardId || !grade || !GRADES.includes(grade)) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  try {
    await gradeCard(session.user.id, cardId, grade);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
