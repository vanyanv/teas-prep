import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { importPayloadSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = importPayloadSchema.safeParse(body);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return NextResponse.json(
      {
        error: `Invalid format${issue ? `: ${issue.path.join(".")} — ${issue.message}` : ""}`,
      },
      { status: 400 },
    );
  }

  const rows = parsed.data;
  await db.question.createMany({
    data: rows.map((q) => ({
      section: q.section,
      topic: q.topic,
      subtopic: q.subtopic ?? null,
      difficulty: q.difficulty ?? 2,
      type: q.type ?? "SINGLE",
      stem: q.stem,
      options: q.options,
      correct: q.correct,
      explanation: q.explanation ?? null,
      source: "imported",
      ownerId: session.user.id,
    })),
  });

  return NextResponse.json({ imported: rows.length });
}
