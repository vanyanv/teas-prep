export interface WeekStripDay {
  date: Date;
  /** 0 = Monday … 6 = Sunday, matching PlanTask.dayOfWeek. */
  dayOfWeek: number;
  isToday: boolean;
  taskCount: number;
  doneCount: number;
}

interface StripPlan {
  createdAt: Date;
  weeks: { weekIndex: number; tasks: { dayOfWeek: number; done: boolean }[] }[];
}

function mondayOf(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  x.setDate(x.getDate() - ((x.getDay() + 6) % 7));
  return x;
}

/**
 * Which plan week the calendar is in (Monday-start). Week 0 is the calendar
 * week the plan was created in; clamped so a valid week always exists, even
 * past the plan's end. Pure — safe in client components.
 */
export function currentPlanWeekIndex(
  createdAt: Date,
  weekCount: number,
  today: Date = new Date(),
): number {
  const rawIndex = Math.floor(
    (mondayOf(today).getTime() - mondayOf(createdAt).getTime()) / (7 * 86_400_000),
  );
  return Math.min(Math.max(rawIndex, 0), Math.max(weekCount - 1, 0));
}

/**
 * Map the plan's current week onto the current calendar week (Monday-start),
 * one entry per day.
 */
export function buildWeekStrip(
  plan: StripPlan,
  today: Date = new Date(),
): WeekStripDay[] | null {
  if (plan.weeks.length === 0) return null;

  const thisMonday = mondayOf(today);
  const weekIndex = currentPlanWeekIndex(plan.createdAt, plan.weeks.length, today);
  const week =
    plan.weeks.find((w) => w.weekIndex === weekIndex) ?? plan.weeks[0];

  const todayStart = new Date(today);
  todayStart.setHours(0, 0, 0, 0);

  return Array.from({ length: 7 }, (_, day) => {
    const date = new Date(thisMonday);
    date.setDate(thisMonday.getDate() + day);
    const tasks = week.tasks.filter((t) => t.dayOfWeek === day);
    return {
      date,
      dayOfWeek: day,
      isToday: date.getTime() === todayStart.getTime(),
      taskCount: tasks.length,
      doneCount: tasks.filter((t) => t.done).length,
    };
  });
}
