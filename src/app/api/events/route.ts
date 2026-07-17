import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

import { CLIENT_EVENT_NAMES, track, type EventName } from "@/lib/analytics";
import { db } from "@/lib/db";

const eventSchema = z.object({
  name: z.string().max(64),
  props: z.record(z.string(), z.union([z.string().max(200), z.number(), z.boolean()])).optional(),
});

/**
 * Browser event sink. Public (landing-page events arrive before signup),
 * but only allowlisted names are accepted and props are small primitives.
 */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = eventSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid event" }, { status: 400 });
  }
  const name = parsed.data.name as EventName;
  if (!CLIENT_EVENT_NAMES.includes(name)) {
    return NextResponse.json({ error: "Unknown event" }, { status: 400 });
  }

  const anonId = request.cookies.get("aid")?.value ?? null;
  const { userId: clerkId } = await auth();
  const user = clerkId
    ? await db.user.findUnique({ where: { clerkId }, select: { id: true } })
    : null;

  await track(name, parsed.data.props, { userId: user?.id, anonId });
  return NextResponse.json({ ok: true });
}
