import Link from "next/link";

import { ArrowRight, Dumbbell } from "lucide-react";

import { requireUser } from "@/lib/session";
import { getProgressData } from "@/lib/progress";
import { ScoreRing } from "@/components/score-ring";
import { ProgressChart } from "@/components/progress/progress-chart";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ActionRow } from "@/components/ui/action-row";
import { PageContainer, PageHeader, Kicker } from "@/components/ui/page";
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
      <PageContainer width="narrow" className="py-16 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">No data yet</h1>
        <p className="mt-2 text-muted-foreground">
          Take the diagnostic or some practice questions and your progress will
          show up here.
        </p>
        <Button asChild className="mt-6">
          <Link href="/diagnostic">Take the diagnostic</Link>
        </Button>
      </PageContainer>
    );
  }

  const readiness = data.readiness ?? 0;
  const gap = data.target - readiness;
  const assessedTopics = data.topics.filter((t) => t.pct != null && t.count > 0);
  const weakest = assessedTopics.length
    ? [...assessedTopics].sort((a, b) => (a.pct ?? 0) - (b.pct ?? 0))[0]
    : null;
  const latest = data.trend.at(-1);
  const first = data.trend[0];

  return (
    <PageContainer>
      <PageHeader
        kicker="Progress"
        title={
          gap <= 0
            ? `You're at or above your ${data.target}% target.`
            : `${gap}% to your ${data.target}% target.`
        }
        sub={`Based on ${data.totalAnswered} questions answered so far.`}
        aside={
          <div className="flex flex-col items-center gap-1">
            <ScoreRing score={readiness} size="lg" />
            <Kicker className="text-[10px] tracking-[0.14em]">Readiness</Kicker>
          </div>
        }
      />

      {weakest && (
        <div className="mt-6">
          <ActionRow asChild>
            <Link
              href={practiceHref({
                section: weakest.section,
                topic: weakest.topic,
                count: 10,
                start: true,
              })}
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                <Dumbbell className="size-[18px]" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium">
                  Next: drill {weakest.label}
                </span>
                <span className="block text-xs text-muted-foreground">
                  Your weakest topic right now
                  {weakest.pct != null ? ` at ${weakest.pct}% mastery` : ""}.
                </span>
              </span>
              <ArrowRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
            </Link>
          </ActionRow>
        </div>
      )}

      {/* Trend */}
      {data.trend.length > 1 && latest && first && (
        <section className="mt-8 rounded-xl border bg-card p-5">
          <Kicker className="text-[11px]">Score trend</Kicker>
          <p className="mt-1 text-sm text-muted-foreground">
            From {first.pct}% to {latest.pct}% over your last {data.trend.length}{" "}
            scored attempts, against a {data.target}% target.
          </p>
          <div className="mt-3">
            <ProgressChart data={data.trend} target={data.target} />
          </div>
        </section>
      )}

      {/* Section rings (tap to drill that section) */}
      <section className="mt-8" aria-label="Performance by section">
        <Kicker className="px-1 text-[11px]">By section</Kicker>
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
      <section className="mt-8 rounded-xl border bg-card p-5">
        <Kicker className="text-[11px]">Topic mastery</Kicker>
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
                  size="md"
                  className="mt-1.5"
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </PageContainer>
  );
}
