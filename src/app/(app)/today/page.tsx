import {
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  Dumbbell,
  Layers,
  RotateCcw,
  Trophy,
  type LucideIcon,
} from "lucide-react";

import { requireUser } from "@/lib/session";
import { getTodayDashboard, type TodayInsight } from "@/lib/study/dashboard";
import { getGamificationSummary } from "@/lib/gamification/summary";
import { practiceHref } from "@/lib/quiz/links";
import { cn } from "@/lib/utils";
import { PageContainer, PageHeader, Kicker } from "@/components/ui/page";
import { ActionRow } from "@/components/ui/action-row";
import { SessionHero } from "@/components/today/session-hero";
import { WeekStrip } from "@/components/today/week-strip";
import { ExamCountdown } from "@/components/today/countdown";
import type { TodayAction } from "@/lib/study/today";
import Link from "next/link";

const INSIGHT_ICON: Record<TodayInsight["kind"], LucideIcon> = {
  "due-review": RotateCcw,
  "due-cards": Layers,
  weakest: Dumbbell,
};

const ACTION_ICON: Record<TodayAction["kind"], LucideIcon> = {
  diagnostic: ClipboardCheck,
  session: ClipboardCheck,
  review: RotateCcw,
  flashcards: Layers,
  drill: Dumbbell,
  study: BookOpen,
  mock: Trophy,
};

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ planned?: string }>;
}) {
  const [user, { planned }] = await Promise.all([requireUser(), searchParams]);
  const [dash, gam] = await Promise.all([
    getTodayDashboard(user.id),
    getGamificationSummary(user.id),
  ]);
  const { summary, insight } = dash;
  const justPlanned = planned === "1";

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const first = user.name?.split(" ")[0];

  const insightHref =
    insight?.kind === "due-review"
      ? practiceHref({ review: true })
      : insight?.kind === "due-cards"
        ? "/flashcards"
        : insight?.kind === "weakest" && summary.weakest
          ? practiceHref({
              section: summary.weakest.section,
              topic: summary.weakest.topic,
              count: 10,
            })
          : null;
  const InsightIcon = insight ? INSIGHT_ICON[insight.kind] : null;
  const secondary = insightHref
    ? summary.secondary.filter((action) => action.href !== insightHref)
    : summary.secondary;

  return (
    <PageContainer>
      <PageHeader
        kicker={first ? `${first} · ${today}` : today}
        title={
          justPlanned
            ? "Your plan is ready. Here's today."
            : summary.hasData
              ? "Here's your next move."
              : "Let's find your starting point."
        }
        sub={
          justPlanned
            ? "Every session starts with what your diagnostic says you need most. Come back here each day and the plan keeps itself current."
            : undefined
        }
        aside={<ExamCountdown days={dash.daysUntilTest} />}
      />

      <div className="mt-6">
        <SessionHero action={summary.primary} preview={dash.sessionPreview} />
      </div>

      {dash.weekStrip && (
        <div className="mt-8">
          <WeekStrip days={dash.weekStrip} />
        </div>
      )}

      {summary.hasData && (
        <section className="mt-8" aria-label="Readiness journey">
          <div className="rounded-xl border bg-card p-4">
            <div className="flex items-center justify-between gap-3">
              <Kicker className="text-[11px]">Readiness journey</Kicker>
              <span className="font-mono text-xs tabular-nums text-muted-foreground">
                Studied {gam.consistency.studiedDays} of {gam.consistency.window} days
              </span>
            </div>
            <p className="mt-1.5 text-sm font-medium">
              {gam.journey.stageName ?? "Take your diagnostic to begin"}
            </p>
            <div className="mt-2 flex gap-1" aria-hidden>
              {gam.journey.stages.map((s, i) => (
                <span
                  key={s}
                  className={cn(
                    "h-1 flex-1 rounded-full",
                    i <= gam.journey.stageIndex ? "bg-primary" : "bg-secondary",
                  )}
                />
              ))}
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span>
                Weekly goal{" "}
                <span className="font-mono tabular-nums text-foreground">
                  {gam.weeklyGoal.studyDaysDone}/{gam.weeklyGoal.studyDaysTarget}
                </span>{" "}
                days
              </span>
              {gam.recentWin && <span className="truncate">Recent win: {gam.recentWin.label}</span>}
            </div>
          </div>
        </section>
      )}

      {insight && insightHref && InsightIcon && (
        <section className="mt-8" aria-label="Insight">
          <ActionRow asChild>
            <Link href={insightHref}>
              <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-secondary text-muted-foreground">
                <InsightIcon className="size-[18px]" aria-hidden />
              </span>
              <span className="min-w-0 flex-1 text-sm">{insight.text}</span>
              <ArrowRight
                className="size-4 shrink-0 text-muted-foreground"
                aria-hidden
              />
            </Link>
          </ActionRow>
        </section>
      )}

      {secondary.length > 0 && (
        <section className="mt-8" aria-label="Also worth doing">
          <Kicker className="mb-3 text-[11px]">Also worth doing</Kicker>
          <div className="space-y-2">
            {secondary.map((action) => {
              const Icon = ACTION_ICON[action.kind];
              return (
                <ActionRow asChild key={`${action.kind}-${action.href}`}>
                  <Link href={action.href}>
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-secondary text-muted-foreground">
                      <Icon className="size-[18px]" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium">
                        {action.label}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {action.detail}
                      </span>
                    </span>
                    <ArrowRight
                      className="size-4 shrink-0 text-muted-foreground"
                      aria-hidden
                    />
                  </Link>
                </ActionRow>
              );
            })}
          </div>
        </section>
      )}
    </PageContainer>
  );
}
