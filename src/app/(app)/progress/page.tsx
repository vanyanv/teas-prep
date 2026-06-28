import Link from "next/link";

import { requireUser } from "@/lib/session";
import { getProgressData } from "@/lib/progress";
import { ScoreRing } from "@/components/score-ring";
import { ProgressChart } from "@/components/progress/progress-chart";
import { Button } from "@/components/ui/button";
import { SECTIONS, sectionLabel } from "@/lib/teas-blueprint";
import { cn } from "@/lib/utils";

export default async function ProgressPage() {
  const user = await requireUser();
  const data = await getProgressData(user.id);

  if (data.totalAnswered === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">No data yet</h1>
        <p className="mt-2 text-muted-foreground">
          Take the diagnostic or some practice questions and your progress will
          show up here.
        </p>
        <Button asChild className="mt-6">
          <Link href="/diagnostic">Take the diagnostic</Link>
        </Button>
      </div>
    );
  }

  const readiness = data.readiness ?? 0;
  const gap = data.target - readiness;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        Progress
      </p>

      {/* Readiness vs target */}
      <section className="mt-4 flex flex-col items-center gap-5 rounded-xl border bg-card p-6 sm:flex-row sm:gap-8 sm:p-8">
        <div className="flex flex-col items-center gap-1">
          <ScoreRing score={readiness} size="xl" />
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Readiness
          </p>
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-xl font-semibold tracking-tight">
            {gap <= 0
              ? `You're at or above your ${data.target}% target.`
              : `${gap}% to your ${data.target}% target.`}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Based on {data.totalAnswered} questions answered so far. Keep drilling
            your weakest topics to close the gap.
          </p>
        </div>
      </section>

      {/* Trend */}
      {data.trend.length > 1 && (
        <section className="mt-6 rounded-xl border bg-card p-5">
          <h2 className="text-sm font-medium">Score trend</h2>
          <div className="mt-3">
            <ProgressChart data={data.trend} target={data.target} />
          </div>
        </section>
      )}

      {/* Section rings */}
      <section className="mt-6">
        <h2 className="text-sm font-medium text-muted-foreground">By section</h2>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {SECTIONS.map((s) => (
            <div
              key={s.key}
              className="flex flex-col items-center gap-2 rounded-lg border bg-card p-4"
            >
              <ScoreRing score={data.sectionScores[s.key]} size="md" />
              <p className="text-center text-xs text-muted-foreground">
                {sectionLabel(s.key)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Topic mastery bars */}
      <section className="mt-6 rounded-xl border bg-card p-5">
        <h2 className="text-sm font-medium">Topic mastery</h2>
        <ul className="mt-4 space-y-3">
          {data.topics.map((t) => (
            <li key={`${t.section}:${t.topic}`}>
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="truncate">{t.label}</span>
                <span className="shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
                  {t.pct == null ? "—" : `${t.pct}%`}
                  {t.count > 0 && (
                    <span className="ml-1 text-muted-foreground/60">
                      ({t.count})
                    </span>
                  )}
                </span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-secondary">
                <div
                  className={cn(
                    "h-full rounded-full transition-[width] duration-500",
                    t.pct == null
                      ? "bg-transparent"
                      : t.pct >= 80
                        ? "bg-success"
                        : t.pct >= 60
                          ? "bg-primary"
                          : "bg-warning",
                  )}
                  style={{ width: `${t.pct ?? 0}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
