export const DEFAULT_HOURS_PER_WEEK = 8;
/** ATI's minimum recommended runway when no exam date is known. */
export const DEFAULT_RUNWAY_DAYS = 42;

export interface PlanInputs {
  testDate: Date;
  hoursPerWeek: number;
}

/**
 * Resolve plan inputs so "Build my study plan" works with one tap:
 * explicit request values win, then the profile's exam date (if still ahead),
 * then a ~6-week default runway.
 */
export function resolvePlanInputs(
  opts: {
    bodyTestDate?: string | null;
    bodyHours?: number | null;
    userTestDate?: Date | null;
  },
  now: Date = new Date(),
): PlanInputs {
  let testDate: Date | null = null;

  if (opts.bodyTestDate) {
    // Date-only strings ("YYYY-MM-DD" from <input type="date">) parse as UTC
    // midnight, which renders as the previous day west of UTC. Anchor to local
    // midnight instead, matching the settings/onboarding routes.
    const raw = /^\d{4}-\d{2}-\d{2}$/.test(opts.bodyTestDate)
      ? `${opts.bodyTestDate}T00:00:00`
      : opts.bodyTestDate;
    const d = new Date(raw);
    if (!Number.isNaN(d.getTime())) testDate = d;
  }
  if (!testDate && opts.userTestDate && opts.userTestDate.getTime() > now.getTime()) {
    testDate = opts.userTestDate;
  }
  if (!testDate) {
    testDate = new Date(now.getTime() + DEFAULT_RUNWAY_DAYS * 86_400_000);
  }

  const h = opts.bodyHours;
  const hoursPerWeek =
    typeof h === "number" && Number.isFinite(h) && h >= 1 && h <= 60
      ? Math.round(h)
      : DEFAULT_HOURS_PER_WEEK;

  return { testDate, hoursPerWeek };
}
