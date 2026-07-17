import { NextResponse } from "next/server";

import { requireUserApi } from "@/lib/session";
import { isPro, proRequiredError } from "@/lib/access";
import { startMock } from "@/lib/quiz/attempt";

export async function POST() {
  const user = await requireUserApi();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!(await isPro())) {
    return NextResponse.json(proRequiredError("mock"), { status: 402 });
  }
  const started = await startMock(user.id);
  if (started.sections.length === 0) {
    return NextResponse.json({ error: "No questions available." }, { status: 422 });
  }
  return NextResponse.json(started);
}
