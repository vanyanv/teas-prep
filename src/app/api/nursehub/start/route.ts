import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { startNurseHubDiagnostic } from "@/lib/quiz/attempt";

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const started = await startNurseHubDiagnostic(session.user.id);
  if (started.questions.length === 0) {
    return NextResponse.json(
      { error: "No NurseHub questions imported yet." },
      { status: 422 },
    );
  }
  return NextResponse.json(started);
}
