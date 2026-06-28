import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { startAttempt, startNurseHubDiagnostic } from "@/lib/quiz/attempt";

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Prefer the user's imported NurseHub questions as the certified baseline.
  // Fall back to a balanced seed diagnostic only when none are imported.
  const nurseHub = await startNurseHubDiagnostic(session.user.id);
  if (nurseHub.questions.length > 0) {
    return NextResponse.json({ ...nurseHub, variant: "nursehub" });
  }

  const started = await startAttempt(session.user.id, "DIAGNOSTIC", 24);
  return NextResponse.json({ ...started, variant: "seed" });
}
