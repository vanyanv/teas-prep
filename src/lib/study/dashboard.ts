import { db } from "@/lib/db";
import { getTodaySummary, type TodaySummary } from "@/lib/study/today";
import { planSession } from "@/lib/study/session";
import { estimateSessionMinutes } from "@/lib/study/estimate";
import { getActivePlan } from "@/lib/plan/service";
import { buildWeekStrip, type WeekStripDay } from "@/lib/plan/week-strip";

export interface SessionPreview {
  whyLine: string;
  reviewCount: number;
  practiceCount: number;
  hasLesson: boolean;
  lessonTitle: string | null;
  estimatedMinutes: number;
  focusLabel: string;
}

export interface TodayInsight {
  kind: "due-review" | "due-cards" | "weakest";
  text: string;
}

export interface TodayDashboard {
  summary: TodaySummary;
  testDate: Date | null;
  /** Whole days until the test; null when unset or already past. */
  daysUntilTest: number | null;
  /** Composition of today's session, when the session is the primary action. */
  sessionPreview: SessionPreview | null;
  weekStrip: WeekStripDay[] | null;
  insight: TodayInsight | null;
}

function buildInsight(summary: TodaySummary): TodayInsight | null {
  // Before the diagnostic, the hero is the whole story — no competing lines.
  if (!summary.hasData) return null;
  if (summary.dueQuestions > 0) {
    return {
      kind: "due-review",
      text: `${summary.dueQuestions} question${summary.dueQuestions === 1 ? " is" : "s are"} due for review.`,
    };
  }
  if (summary.dueCards > 0) {
    return {
      kind: "due-cards",
      text: `${summary.dueCards} flashcard${summary.dueCards === 1 ? " is" : "s are"} ready to review.`,
    };
  }
  if (summary.weakest?.pct != null) {
    return {
      kind: "weakest",
      text: `${summary.weakest.label} is your weakest area right now (${summary.weakest.pct}% mastery).`,
    };
  }
  return null;
}

/** Everything the Today page needs, in one server-side read. */
export async function getTodayDashboard(userId: string): Promise<TodayDashboard> {
  const [summary, user, plan] = await Promise.all([
    getTodaySummary(userId),
    db.user.findUnique({ where: { id: userId }, select: { testDate: true } }),
    getActivePlan(userId),
  ]);

  // Preview mirrors planSession exactly, so it cannot drift from the session
  // that starts when the user taps through.
  const sessionPlan =
    summary.primary.kind === "session" ? await planSession(userId) : null;
  const sessionPreview: SessionPreview | null = sessionPlan
    ? {
        whyLine: sessionPlan.whyLine,
        reviewCount: sessionPlan.reviewCount,
        practiceCount: sessionPlan.practiceCount,
        hasLesson: sessionPlan.lesson != null,
        lessonTitle: sessionPlan.lesson?.skill ?? null,
        estimatedMinutes: estimateSessionMinutes(
          sessionPlan.questionIds.length,
          sessionPlan.lesson?.minutes[0] ?? null,
        ),
        focusLabel: sessionPlan.focus.label,
      }
    : null;

  const testDate = user?.testDate ?? null;
  const now = new Date();
  const rawDays = testDate
    ? Math.ceil((testDate.getTime() - now.getTime()) / 86_400_000)
    : null;
  const daysUntilTest = rawDays != null && rawDays >= 0 ? rawDays : null;

  return {
    summary,
    testDate,
    daysUntilTest,
    sessionPreview,
    weekStrip: plan ? buildWeekStrip(plan, now) : null,
    insight: buildInsight(summary),
  };
}
