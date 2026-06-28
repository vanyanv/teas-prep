import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { startMock } from "@/lib/quiz/attempt";

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const started = await startMock(session.user.id);
  if (started.sections.length === 0) {
    return NextResponse.json({ error: "No questions available." }, { status: 422 });
  }
  return NextResponse.json(started);
}
