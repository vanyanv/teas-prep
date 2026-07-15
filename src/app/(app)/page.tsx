import { ArrowRight, Dumbbell, Layers, RotateCcw, type LucideIcon } from "lucide-react";

import { requireUser } from "@/lib/session";
import { getTodayDashboard, type TodayInsight } from "@/lib/study/dashboard";
import { practiceHref } from "@/lib/quiz/links";
import { PageContainer, PageHeader } from "@/components/ui/page";
import { ActionRow } from "@/components/ui/action-row";
import { SessionHero } from "@/components/today/session-hero";
import { WeekStrip } from "@/components/today/week-strip";
import { ExamCountdown } from "@/components/today/countdown";
import Link from "next/link";

const INSIGHT_ICON: Record<TodayInsight["kind"], LucideIcon> = {
  "due-review": RotateCcw,
  "due-cards": Layers,
  weakest: Dumbbell,
};

export default async function DashboardPage() {
  const user = await requireUser();
  const dash = await getTodayDashboard(user.id);
  const { summary, insight } = dash;

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
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
        kicker={first ? `${first} — ${today}` : today}
        title={
          summary.hasData ? "Here's your next move." : "Let's find your starting point."
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
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
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
    </PageContainer>
  );
}
