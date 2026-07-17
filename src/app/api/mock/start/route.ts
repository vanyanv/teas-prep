import { NextResponse } from "next/server";

import { requireUserApi } from "@/lib/session";
import { startMock } from "@/lib/quiz/attempt";

export async function POST() {
  const user = await requireUserApi();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const started = await startMock(user.id);
  if (started.sections.length === 0) {
    return NextResponse.json({ error: "No questions available." }, { status: 422 });
  }
  return NextResponse.json(started);
}
