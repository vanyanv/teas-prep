import { NextResponse } from "next/server";

import { requireUserApi } from "@/lib/session";
import { getAccess, proRequiredError } from "@/lib/access";
import {
  startAttempt,
  startReviewSession,
  startSavedSession,
  type QuestionFilter,
} from "@/lib/quiz/attempt";
import type { Section } from "@/lib/teas-blueprint";
import { SKILLS } from "@/content/skills";

const SECTIONS = ["READING", "MATH", "SCIENCE", "ENGLISH"];
const SKILL_NAMES = new Set(SKILLS.flatMap((s) => s.skills));

export async function POST(request: Request) {
  const user = await requireUserApi();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const access = await getAccess(user.id);

  // Spaced repetition and saved-question drills are part of TEAS Pro.
  if (!access.isPro && (body.mode === "review" || body.mode === "saved")) {
    return NextResponse.json(proRequiredError("review"), { status: 402 });
  }

  // Spaced-repetition review queue: due questions instead of a filtered drill.
  if (body.mode === "review") {
    const started = await startReviewSession(user.id, 20);
    if (started.questions.length === 0) {
      return NextResponse.json(
        { error: "Nothing due for review right now. Nice work staying current." },
        { status: 422 },
      );
    }
    return NextResponse.json(started);
  }

  // Bookmarked-questions drill: everything the user saved for review.
  if (body.mode === "saved") {
    const started = await startSavedSession(user.id, 20);
    if (started.questions.length === 0) {
      return NextResponse.json(
        { error: "No saved questions yet. Save one from any explanation." },
        { status: 422 },
      );
    }
    return NextResponse.json(started);
  }

  const filter: QuestionFilter = {};
  if (typeof body.section === "string" && SECTIONS.includes(body.section)) {
    filter.section = body.section as Section;
  }
  if (typeof body.topic === "string" && body.topic) filter.topic = body.topic;
  if (typeof body.subtopic === "string" && SKILL_NAMES.has(body.subtopic)) {
    filter.subtopic = body.subtopic;
  }
  if ([1, 2, 3].includes(Number(body.difficulty))) {
    filter.difficulty = Number(body.difficulty);
  }

  let count = Math.max(5, Math.min(Number(body.count) || 10, 40));
  if (!access.isPro) {
    if (access.practiceLeft <= 0) {
      return NextResponse.json(proRequiredError("practice"), { status: 402 });
    }
    // Serve out the remaining free allowance rather than refusing a start.
    count = Math.min(count, access.practiceLeft);
  }
  const started = await startAttempt(user.id, "PRACTICE", count, filter);

  if (started.questions.length === 0) {
    return NextResponse.json(
      { error: "No questions match those filters yet." },
      { status: 422 },
    );
  }
  return NextResponse.json(started);
}
