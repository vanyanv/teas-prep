import { NextResponse } from "next/server";

import { requireUserApi } from "@/lib/session";
import { getAccess, proRequiredError } from "@/lib/access";
import { track } from "@/lib/analytics";
import { composeSession } from "@/lib/study/session";
import { getResumableSession } from "@/lib/quiz/attempt";
import { getMasteryData } from "@/lib/mastery";
import { topicLabel } from "@/lib/teas-blueprint";

export async function POST() {
  const user = await requireUserApi();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // A partially-answered session from today always resumes — before the access
  // check, because its answers already count toward the free allowance and
  // refusing to finish it would burn the learner's one free session.
  const resumable = await getResumableSession(user.id);
  if (resumable) {
    const label = resumable.focus
      ? topicLabel(resumable.focus.section, resumable.focus.topic)
      : "your weakest area";
    return NextResponse.json({
      attemptId: resumable.attemptId,
      questions: resumable.questions,
      whyLine: `You're partway through today's session: ${resumable.startIndex} of ${resumable.questions.length} answered. Pick up where you left off.`,
      reviewCount: resumable.reviewCount,
      lesson: null,
      focus: {
        section: resumable.focus?.section ?? "READING",
        topic: resumable.focus?.topic ?? "",
        label,
      },
      resumed: true,
      startIndex: resumable.startIndex,
      correctSoFar: resumable.correctSoFar,
    });
  }

  // Free plan includes one personalized session; the paywall explains itself
  // on the session page, this is the server-side backstop.
  const access = await getAccess(user.id);
  if (!access.isPro && access.sessionsLeft <= 0) {
    return NextResponse.json(proRequiredError("session"), { status: 402 });
  }

  const composed = await composeSession(user.id);
  if (!composed) {
    // Distinguish "no baseline yet" (send them to the diagnostic) from
    // "has data but nothing to compose right now" (send them to practice),
    // so the empty state never tells a returning student to start over.
    const { totalAnswered } = await getMasteryData(user.id);
    return NextResponse.json(
      totalAnswered === 0
        ? {
            reason: "no-data",
            error: "Take the diagnostic first. It builds your daily session.",
          }
        : {
            reason: "caught-up",
            error:
              "You're caught up in your weakest area for now. Try a quick practice set in another section.",
          },
      { status: 422 },
    );
  }
  await track(
    "session_started",
    { free: !access.isPro },
    { userId: user.id },
  );
  return NextResponse.json(composed);
}
