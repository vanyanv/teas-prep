import Link from "next/link";
import { ArrowRight, ChevronDown, Lightbulb } from "lucide-react";

import { BuildPlanButton } from "@/components/plan/build-plan-button";
import { ReviewList } from "@/components/quiz/review-list";
import { ActionRow } from "@/components/ui/action-row";
import { Kicker, PageContainer, PageHeader } from "@/components/ui/page";
import { Progress } from "@/components/ui/progress";
import { learnSkillHref } from "@/lib/quiz/links";
import {
  BAND_LABELS,
  type Band,
  type DiagnosticInsights,
} from "@/lib/quiz/diagnostic-insights";
import type { AttemptResult } from "@/lib/quiz/attempt";
import { cn } from "@/lib/utils";

const BAND_TONE: Record<Band, "success" | "primary" | "warning" | "destructive"> = {
  strong: "success",
  solid: "primary",
  "needs-work": "warning",
  priority: "destructive",
};

const BAND_TEXT: Record<Band, string> = {
  strong: "text-success",
  solid: "text-primary",
  "needs-work": "text-warning",
  priority: "text-destructive",
};

/** The narrative diagnosis: headline → score → section bands → priorities → CTA → review. */
export function DiagnosticResultView({
  insights,
  planPreview,
  items,
  savedQuestionIds,
  next,
}: {
  insights: DiagnosticInsights;
  planPreview: string;
  items: AttemptResult["items"];
  savedQuestionIds?: string[];
  next?: { label: string; href: string } | null;
}) {
  return (
    <PageContainer width="narrow">
      <PageHeader
        kicker="Diagnostic results"
        title={insights.headline}
        sub="This is a starting point, not a verdict. It tells us exactly where to begin."
      />

      <p className="mt-6 flex items-baseline gap-3">
        <span className="font-mono text-5xl font-semibold tracking-tight tabular-nums">
          {insights.overallPct}%
        </span>
        <span className="text-sm text-muted-foreground">
          {insights.totalCorrect} of {insights.totalItems} correct
        </span>
      </p>

      <section className="mt-8" aria-label="Results by section">
        <Kicker className="text-[11px]">By section</Kicker>
        <ul className="mt-3 space-y-5">
          {insights.sections.map((s) => (
            <li key={s.section}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-sm font-medium">{s.label}</span>
                <span className="flex items-baseline gap-2">
                  <span
                    className={cn(
                      "text-xs font-medium",
                      s.band ? BAND_TEXT[s.band] : "text-muted-foreground",
                    )}
                  >
                    {s.band ? BAND_LABELS[s.band] : "Not assessed"}
                  </span>
                  <span className="font-mono text-sm tabular-nums">
                    {s.pct != null ? `${s.pct}%` : "–"}
                  </span>
                </span>
              </div>
              <Progress
                value={s.pct ?? 0}
                tone={s.band ? BAND_TONE[s.band] : "muted"}
                size="md"
                className="mt-2"
                aria-label={`${s.label}: ${s.pct != null ? `${s.pct}%` : "not assessed"}`}
              />
              {s.topics.some((t) => t.total > 0) && (
                <details className="group mt-2">
                  <summary className="flex w-fit cursor-pointer list-none items-center gap-1 rounded-md text-xs text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/40 [&::-webkit-details-marker]:hidden">
                    Show topics
                    <ChevronDown
                      className="size-3.5 transition-transform group-open:rotate-180"
                      aria-hidden
                    />
                  </summary>
                  <ul className="mt-2 space-y-1.5 border-l pl-4">
                    {s.topics.map((t) => (
                      <li
                        key={t.topic}
                        className="flex items-center justify-between gap-3 text-sm"
                      >
                        <span className="text-muted-foreground">{t.label}</span>
                        <span className="font-mono text-xs text-muted-foreground tabular-nums">
                          {t.pct != null ? `${t.correct}/${t.total} · ${t.pct}%` : "–"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </li>
          ))}
        </ul>
      </section>

      {insights.prioritySkills.length > 0 && (
        <section className="mt-10" aria-label="Highest-priority skills">
          <Kicker className="text-[11px]">Your five highest-priority skills</Kicker>
          <p className="mt-1 text-xs text-muted-foreground">
            Weakest skills, weighted by how much of the exam they cover. Start here.
          </p>
          <ol className="mt-3 space-y-2">
            {insights.prioritySkills.map((p, i) => (
              <li key={p.skillId}>
                <ActionRow asChild className="group items-start">
                  <Link href={learnSkillHref(p.section, p.topic, p.name)}>
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-primary/10 font-mono text-xs font-semibold text-primary">
                      {i + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium">
                        {p.name}{" "}
                        <span className="font-normal text-muted-foreground">· {p.sectionLabel}</span>
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        You scored {p.correct}/{p.total} ({p.pct}%) here.
                      </span>
                    </span>
                    <ArrowRight
                      className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </Link>
                </ActionRow>
              </li>
            ))}
          </ol>
        </section>
      )}

      {(insights.confidence.guessedTotal > 0 ||
        insights.confidence.confidentWrong > 0 ||
        insights.confidence.unanswered > 0) && (
        <section className="mt-4 rounded-xl border bg-card p-4" aria-label="Confidence patterns">
          <div className="flex items-center gap-2">
            <Lightbulb className="size-4 shrink-0 text-warning" aria-hidden />
            <h2 className="text-sm font-medium">What your confidence tells us</h2>
          </div>
          <ul className="mt-2.5 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
            {insights.confidence.guessedTotal > 0 && (
              <li>
                <span className="font-mono font-medium tabular-nums text-foreground">
                  {insights.confidence.guessedCorrect}/{insights.confidence.guessedTotal}
                </span>{" "}
                lucky guesses were right. They count as gaps, not strengths, so your plan keeps them.
              </li>
            )}
            {insights.confidence.confidentWrong > 0 && (
              <li>
                <span className="font-mono font-medium tabular-nums text-foreground">
                  {insights.confidence.confidentWrong}
                </span>{" "}
                you were confident about but got wrong — the misconceptions worth fixing first.
              </li>
            )}
            {insights.confidence.unanswered > 0 && (
              <li>
                <span className="font-mono font-medium tabular-nums text-foreground">
                  {insights.confidence.unanswered}
                </span>{" "}
                left unanswered.
              </li>
            )}
          </ul>
        </section>
      )}

      {/* Fixed so it never overlays the priorities while reading; the page
          reserves clearance via the container's bottom padding. */}
      <div className="fixed inset-x-0 bottom-[calc(3.9rem+env(safe-area-inset-bottom))] z-10 px-4 sm:bottom-4">
        <div className="mx-auto max-w-2xl rounded-xl border bg-background/95 p-4 shadow-sm backdrop-blur">
          <p className="text-center text-xs text-muted-foreground">{planPreview}</p>
          <BuildPlanButton className="mt-3" />
          {next && (
            <Link
              href={next.href}
              className="mt-2 block text-center text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Next up: {next.label} →
            </Link>
          )}
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-base font-semibold tracking-tight">
          Review every question
        </h2>
        <div className="mt-3">
          <ReviewList items={items} savedQuestionIds={savedQuestionIds} />
        </div>
      </section>
    </PageContainer>
  );
}
