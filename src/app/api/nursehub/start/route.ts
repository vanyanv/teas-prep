import { NextResponse } from "next/server";

import { requireUserApi } from "@/lib/session";
import { startNurseHubDiagnostic } from "@/lib/quiz/attempt";

export async function POST() {
  const user = await requireUserApi();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const started = await startNurseHubDiagnostic(user.id);
  if (started.questions.length === 0) {
    return NextResponse.json(
      { error: "No NurseHub questions imported yet." },
      { status: 422 },
    );
  }
  return NextResponse.json(started);
}
