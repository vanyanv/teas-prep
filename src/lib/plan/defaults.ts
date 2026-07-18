export const DEFAULT_DAYS_PER_WEEK = 4;
/** ATI's minimum recommended runway when no exam date is known. */
export const DEFAULT_RUNWAY_DAYS = 42;

export interface PlanInputs {
  testDate: Date;
  daysPerWeek: number;
}

/**
 * Resolve plan inputs so "Build my study plan" works with one tap:
 * explicit request values win, then the profile (exam date if still ahead,
 * onboarding study days), then defaults (~6-week runway, 4 days/week).
 */
export function resolvePlanInputs(
  opts: {
    bodyTestDate?: string | null;
    bodyDays?: number | null;
    userTestDate?: Date | null;
    userDaysPerWeek?: number | null;
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

  const valid = (d: unknown): d is number =>
    typeof d === "number" && Number.isFinite(d) && d >= 2 && d <= 7;
  const daysPerWeek = valid(opts.bodyDays)
    ? Math.round(opts.bodyDays)
    : valid(opts.userDaysPerWeek)
      ? Math.round(opts.userDaysPerWeek)
      : DEFAULT_DAYS_PER_WEEK;

  return { testDate, daysPerWeek };
}
