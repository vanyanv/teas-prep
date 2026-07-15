import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { composeSession } from "@/lib/study/session";

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const composed = await composeSession(session.user.id);
  if (!composed) {
    return NextResponse.json(
      { error: "Take the diagnostic first — it builds your daily session." },
      { status: 422 },
    );
  }
  return NextResponse.json(composed);
}
