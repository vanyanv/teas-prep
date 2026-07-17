import { NextResponse } from "next/server";

import { requireUserApi } from "@/lib/session";
import { getAccess, proRequiredError } from "@/lib/access";
import { composeSession } from "@/lib/study/session";
import { getMasteryData } from "@/lib/mastery";

export async function POST() {
  const user = await requireUserApi();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
  return NextResponse.json(composed);
}
