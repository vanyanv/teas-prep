import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { startAttempt, type QuestionFilter } from "@/lib/quiz/attempt";
import type { Section } from "@/lib/teas-blueprint";

const SECTIONS = ["READING", "MATH", "SCIENCE", "ENGLISH"];

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const filter: QuestionFilter = {};
  if (typeof body.section === "string" && SECTIONS.includes(body.section)) {
    filter.section = body.section as Section;
  }
  if (typeof body.topic === "string" && body.topic) filter.topic = body.topic;
  if ([1, 2, 3].includes(Number(body.difficulty))) {
    filter.difficulty = Number(body.difficulty);
  }

  const count = Math.max(5, Math.min(Number(body.count) || 10, 40));
  const started = await startAttempt(session.user.id, "PRACTICE", count, filter);

  if (started.questions.length === 0) {
    return NextResponse.json(
      { error: "No questions match those filters yet." },
      { status: 422 },
    );
  }
  return NextResponse.json(started);
}
