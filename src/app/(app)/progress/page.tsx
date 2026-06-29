import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { requireUser } from "@/lib/session";
import { getProgressData } from "@/lib/progress";
import { ScoreRing } from "@/components/score-ring";
import { ProgressChart } from "@/components/progress/progress-chart";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { practiceHref } from "@/lib/quiz/links";
import { SECTIONS, sectionLabel } from "@/lib/teas-blueprint";

function masteryTone(pct: number | null): "success" | "primary" | "warning" | "muted" {
  if (pct == null) return "muted";
  if (pct >= 80) return "success";
  if (pct >= 60) return "primary";
  return "warning";
}

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

      {/* Section rings (tap to drill that section) */}
      <section className="mt-6">
        <h2 className="text-sm font-medium text-muted-foreground">By section</h2>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {SECTIONS.map((s) => (
            <Link
              key={s.key}
              href={practiceHref({ section: s.key })}
              className="flex flex-col items-center gap-2 rounded-xl border bg-card p-4 outline-none transition-colors hover:bg-secondary/40 focus-visible:ring-[3px] focus-visible:ring-ring/40"
            >
              <ScoreRing score={data.sectionScores[s.key]} size="md" />
              <p className="text-center text-xs text-muted-foreground">
                {sectionLabel(s.key)}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Topic mastery bars — each links straight into a drill of that topic */}
      <section className="mt-6 rounded-2xl border bg-card p-5">
        <h2 className="text-sm font-medium">Topic mastery</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Confidence-weighted. Tap any topic to drill it.
        </p>
        <ul className="mt-4 space-y-3">
          {data.topics.map((t) => (
            <li key={`${t.section}:${t.topic}`}>
              <Link
                href={practiceHref({ section: t.section, topic: t.topic })}
                className="group block rounded-md px-1 py-1 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
              >
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="truncate group-hover:underline">{t.label}</span>
                  <span className="flex shrink-0 items-center gap-1.5 font-mono text-xs text-muted-foreground tabular-nums">
                    {t.pct == null ? "—" : `${t.pct}%`}
                    {t.count > 0 && (
                      <span className="text-muted-foreground/60">({t.count})</span>
                    )}
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
                <Progress
                  value={t.pct ?? 0}
                  tone={masteryTone(t.pct)}
                  className="mt-1.5"
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
