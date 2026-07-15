import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { composeSession } from "@/lib/study/session";
import { getMasteryData } from "@/lib/mastery";

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const composed = await composeSession(session.user.id);
  if (!composed) {
    // Distinguish "no baseline yet" (send them to the diagnostic) from
    // "has data but nothing to compose right now" (send them to practice),
    // so the empty state never tells a returning student to start over.
    const { totalAnswered } = await getMasteryData(session.user.id);
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
  return NextResponse.json(composed);
}
