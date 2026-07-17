import { NextResponse } from "next/server";

import { requireUserApi } from "@/lib/session";
import { isPro, proRequiredError } from "@/lib/access";
import { getDueCards } from "@/lib/flashcards/service";

export async function GET() {
  const user = await requireUserApi();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!(await isPro())) {
    return NextResponse.json(proRequiredError("flashcards"), { status: 402 });
  }
  const data = await getDueCards(user.id, 20);
  return NextResponse.json(data);
}
