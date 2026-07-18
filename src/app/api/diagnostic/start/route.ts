import { NextResponse } from "next/server";

import { requireUserApi } from "@/lib/session";
import { track } from "@/lib/analytics";
import { parseSectionSlug } from "@/lib/teas-blueprint";
import { startSectionDiagnostic } from "@/lib/quiz/attempt";

export async function POST(req: Request) {
  const user = await requireUserApi();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as { section?: string } | null;
  const section = parseSectionSlug(String(body?.section ?? ""));
  if (!section) {
    return NextResponse.json({ error: "Unknown section" }, { status: 400 });
  }

  const started = await startSectionDiagnostic(user.id, section);
  if (started.questions.length === 0) {
    return NextResponse.json(
      { error: "No questions available for this section yet." },
      { status: 422 },
    );
  }
  await track("diagnostic_started", { variant: "section", section }, { userId: user.id });
  return NextResponse.json(started);
}
