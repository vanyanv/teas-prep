import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";

import { track } from "@/lib/analytics";
import { db } from "@/lib/db";

/**
 * Clerk webhooks (Svix-signed; requires CLERK_WEBHOOK_SIGNING_SECRET).
 * Subscription lifecycle lands here so churn events are observable without
 * ever storing card data. Access control never depends on these rows;
 * `has({ plan: "pro" })` is always read live from the session.
 */
export async function POST(request: NextRequest) {
  let evt: Awaited<ReturnType<typeof verifyWebhook>>;
  try {
    evt = await verifyWebhook(request);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const type = evt.type as string;
  const data = evt.data as unknown as Record<string, unknown>;
  const payer = data.payer as { user_id?: string } | undefined;
  const clerkId =
    payer?.user_id ?? (typeof data.user_id === "string" ? data.user_id : null);
  const user = clerkId
    ? await db.user.findUnique({ where: { clerkId }, select: { id: true } })
    : null;
  const ids = { userId: user?.id };
  const plan = (data.plan as { slug?: string } | undefined)?.slug;

  switch (type) {
    case "subscriptionItem.active":
      await track("checkout_completed", { plan }, ids);
      break;
    case "subscriptionItem.canceled":
      await track("subscription_canceled", { plan }, ids);
      break;
    case "subscriptionItem.abandoned":
      await track("checkout_abandoned", { plan }, ids);
      break;
    case "subscriptionItem.past_due":
      await track("subscription_canceled", { plan, pastDue: true }, ids);
      break;
    default:
      // Other events are acknowledged but not recorded.
      break;
  }

  return NextResponse.json({ ok: true });
}
