import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { getDueCards } from "@/lib/flashcards/service";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await getDueCards(session.user.id, 20);
  return NextResponse.json(data);
}
