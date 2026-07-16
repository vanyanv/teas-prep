import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { db } from "@/lib/db";

/**
 * Bookmark ("save for review") a question. Upserts the user's QuestionReview
 * row, which also primes SR scheduling state for the question.
 */
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const questionId = typeof body?.questionId === "string" ? body.questionId : null;
  const saved = typeof body?.saved === "boolean" ? body.saved : null;
  if (!questionId || saved == null) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const question = await db.question.findFirst({
    where: { id: questionId, OR: [{ ownerId: null }, { ownerId: session.user.id }] },
    select: { id: true },
  });
  if (!question) {
    return NextResponse.json({ error: "Question not found" }, { status: 404 });
  }

  const savedAt = saved ? new Date() : null;
  await db.questionReview.upsert({
    where: { userId_questionId: { userId: session.user.id, questionId } },
    create: { userId: session.user.id, questionId, saved, savedAt },
    update: { saved, savedAt },
  });

  return NextResponse.json({ saved });
}
