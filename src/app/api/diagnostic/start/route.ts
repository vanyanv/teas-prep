import { NextResponse } from "next/server";

import { requireUserApi } from "@/lib/session";
import { track } from "@/lib/analytics";
import { startAttempt, startNurseHubDiagnostic } from "@/lib/quiz/attempt";

export async function POST() {
  const user = await requireUserApi();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Prefer the user's imported NurseHub questions as the certified baseline.
  // Fall back to a balanced seed diagnostic only when none are imported.
  const nurseHub = await startNurseHubDiagnostic(user.id);
  if (nurseHub.questions.length > 0) {
    await track("diagnostic_started", { variant: "nursehub" }, { userId: user.id });
    return NextResponse.json({ ...nurseHub, variant: "nursehub" });
  }

  const started = await startAttempt(user.id, "DIAGNOSTIC", 24);
  await track("diagnostic_started", { variant: "seed" }, { userId: user.id });
  return NextResponse.json({ ...started, variant: "seed" });
}
