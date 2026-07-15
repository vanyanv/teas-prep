import { BuildPlanButton } from "@/components/plan/build-plan-button";
import { ReviewList } from "@/components/quiz/review-list";
import {
  BAND_LABELS,
  type Band,
  type DiagnosticInsights,
} from "@/lib/quiz/diagnostic-insights";
import type { AttemptResult } from "@/lib/quiz/attempt";
import { cn } from "@/lib/utils";

const BAND_BAR: Record<Band, string> = {
  strong: "bg-success",
  solid: "bg-primary",
  "needs-work": "bg-warning",
  priority: "bg-destructive",
};

const BAND_TEXT: Record<Band, string> = {
  strong: "text-success",
  solid: "text-primary",
  "needs-work": "text-warning",
  priority: "text-destructive",
};

/** The narrative diagnosis: headline → section bands → priorities → CTA → review. */
export function DiagnosticResultView({
  insights,
  planPreview,
  items,
}: {
  insights: DiagnosticInsights;
  planPreview: string;
  items: AttemptResult["items"];
}) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        Diagnostic results
      </p>
      <h1 className="mt-3 text-2xl font-semibold leading-snug tracking-tight text-balance sm:text-3xl">
        {insights.headline}
      </h1>
      <p className="mt-3 max-w-prose text-sm text-muted-foreground">
        {insights.totalCorrect} of {insights.totalItems} correct. This is a starting
        point, not a verdict — it tells us exactly where to begin.
      </p>

      <section className="mt-8 space-y-3" aria-label="Results by section">
        {insights.sections.map((s) => (
          <details key={s.section} className="rounded-xl border bg-card p-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
              <span className="min-w-0">
                <span className="block text-sm font-medium">{s.label}</span>
                <span
                  className={cn(
                    "block text-xs font-medium",
                    s.band ? BAND_TEXT[s.band] : "text-muted-foreground",
                  )}
                >
                  {s.band ? BAND_LABELS[s.band] : "Not assessed"}
                  {s.pct != null && ` · ${s.correct}/${s.total} correct`}
                </span>
              </span>
              <span className="font-mono text-sm tabular-nums">
                {s.pct != null ? `${s.pct}%` : "—"}
              </span>
            </summary>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className={cn("h-full rounded-full", s.band && BAND_BAR[s.band])}
                style={{ width: `${s.pct ?? 0}%` }}
              />
            </div>
            <ul className="mt-4 space-y-2">
              {s.topics.map((t) => (
                <li
                  key={t.topic}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <span className="text-muted-foreground">{t.label}</span>
                  <span className="font-mono text-xs tabular-nums">
                    {t.pct != null ? `${t.correct}/${t.total} · ${t.pct}%` : "—"}
                  </span>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </section>

      {insights.priorities.length > 0 && (
        <section className="mt-8" aria-label="Top priorities">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Your top priorities
          </h2>
          <ol className="mt-3 space-y-2">
            {insights.priorities.map((p, i) => (
              <li
                key={`${p.section}:${p.topic}`}
                className="flex items-start gap-3 rounded-xl border bg-card p-4"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-primary/10 font-mono text-xs font-semibold text-primary">
                  {i + 1}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium">
                    {p.label}{" "}
                    <span className="font-normal text-muted-foreground">
                      · {p.sectionLabel}
                    </span>
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    About {p.examSharePct}% of the exam — you scored {p.correct}/
                    {p.total} here.
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {insights.guessed.total > 0 && (
        <section className="mt-4 rounded-xl border bg-card p-4">
          <p className="text-sm leading-relaxed">
            You guessed on{" "}
            <span className="font-medium">{insights.guessed.total}</span> questions
            and got {insights.guessed.correct} right. Lucky guesses count as gaps,
            not strengths — your plan includes them.
          </p>
        </section>
      )}

      <div className="sticky bottom-20 z-10 mt-8 rounded-2xl border bg-background/95 p-4 shadow-sm backdrop-blur sm:bottom-4">
        <p className="text-center text-xs text-muted-foreground">{planPreview}</p>
        <BuildPlanButton className="mt-3" />
      </div>

      <section className="mt-10">
        <h2 className="text-base font-semibold tracking-tight">
          Review every question
        </h2>
        <div className="mt-3">
          <ReviewList items={items} />
        </div>
      </section>
    </div>
  );
}
