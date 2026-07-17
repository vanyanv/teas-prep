/**
 * First-party funnel analytics: typed event names, one insert per event.
 * The funnel this instruments: landing visit → account created → diagnostic
 * completed → first session completed (activation) → paid subscription.
 */

export const EVENT_NAMES = [
  "landing_viewed",
  "cta_clicked",
  "signup_started",
  "signup_completed",
  "onboarding_completed",
  "diagnostic_started",
  "diagnostic_completed",
  "results_viewed",
  "session_started",
  "session_completed", // activation when props.nth === 1
  "paywall_viewed",
  "checkout_started",
  "checkout_completed",
  "checkout_abandoned", // derived in analysis: checkout_started without completion
  "subscription_canceled",
  "subscription_reactivated",
] as const;

export type EventName = (typeof EVENT_NAMES)[number];

/** Events the browser may report; everything else is server-observed only. */
export const CLIENT_EVENT_NAMES: readonly EventName[] = [
  "landing_viewed",
  "cta_clicked",
  "signup_started",
  "results_viewed",
  "paywall_viewed",
  "checkout_started",
];

export interface TrackIds {
  /** Local User.id (not the Clerk id). */
  userId?: string | null;
  /** The "aid" cookie value for pre-signup events. */
  anonId?: string | null;
}

/** Small primitives only; anything richer belongs in the domain tables. */
export type EventProps = Record<
  string,
  string | number | boolean | null | undefined
>;

/**
 * Record one event. Analytics must never break the product: failures are
 * swallowed after a console note. Server-side use only.
 */
export async function track(
  name: EventName,
  props?: EventProps,
  ids: TrackIds = {},
): Promise<void> {
  try {
    const clean = props
      ? (Object.fromEntries(
          Object.entries(props).filter(([, v]) => v !== undefined),
        ) as Record<string, string | number | boolean | null>)
      : undefined;
    const { db } = await import("@/lib/db");
    await db.analyticsEvent.create({
      data: {
        name,
        props: clean && Object.keys(clean).length > 0 ? clean : undefined,
        userId: ids.userId ?? null,
        anonId: ids.anonId ?? null,
      },
    });
  } catch (err) {
    console.error(`analytics: failed to record ${name}`, err);
  }
}
