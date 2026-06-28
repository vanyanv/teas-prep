import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { startAttempt } from "@/lib/quiz/attempt";

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Balanced diagnostic across all sections (sized to the available bank).
  const started = await startAttempt(session.user.id, "DIAGNOSTIC", 24);
  return NextResponse.json(started);
}
