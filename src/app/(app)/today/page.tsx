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
import { practiceHref } from "@/lib/quiz/links";
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
  const dash = await getTodayDashboard(user.id);
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

      {summary.secondary.length > 0 && (
        <section className="mt-8" aria-label="Also worth doing">
          <Kicker className="mb-3 text-[11px]">Also worth doing</Kicker>
          <div className="space-y-2">
            {summary.secondary.map((action) => {
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
