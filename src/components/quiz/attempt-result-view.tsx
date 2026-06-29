import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";

import { ScoreRing } from "@/components/score-ring";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ReviewList } from "@/components/quiz/review-list";
import {
  SECTIONS,
  sectionLabel,
  topicLabel,
  type Section,
} from "@/lib/teas-blueprint";
import { practiceHref } from "@/lib/quiz/links";
import type { AttemptResult } from "@/lib/quiz/attempt";

function masteryTone(pct: number): "success" | "primary" | "warning" {
  if (pct >= 80) return "success";
  if (pct >= 60) return "primary";
  return "warning";
}

export function AttemptResultView({
  result,
  kicker,
  headline,
  blurb,
  cta,
  showWeakAreas = true,
}: {
  result: AttemptResult;
  kicker: string;
  headline: string;
  blurb?: string;
  cta?: { href: string; label: string };
  showWeakAreas?: boolean;
}) {
  const { score } = result;
  const usedSections = SECTIONS.filter((s) => score.bySection[s.key]);
  const isMock = result.mode === "MOCK";

  // Build a skill -> {section, topic} lookup from the answered items so every
  // weak skill row can deep-link straight into a drill of that skill.
  const skillLoc = new Map<string, { section: Section; topic: string }>();
  for (const it of result.items) {
    if (it.question.subtopic) {
      skillLoc.set(it.question.subtopic, {
        section: it.question.section,
        topic: it.question.topic,
      });
    }
  }

  const weak = Object.entries(score.byTopic)
    .map(([k, v]) => {
      const [section, topic] = k.split(":") as [Section, string];
      return { section, topic, ...v };
    })
    .sort((a, b) => a.pct - b.pct)
    .slice(0, 3);

  const missCount = result.items.filter((it) => it.isCorrect === false).length;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {kicker}
      </p>

      <section className="mt-4 flex flex-col items-center gap-4 rounded-2xl border bg-card p-6 sm:flex-row sm:gap-8 sm:p-8">
        <div className="flex flex-col items-center gap-1">
          <ScoreRing score={score.pct} size="xl" />
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
            {score.correct}/{score.total}
          </p>
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-xl font-semibold tracking-tight">{headline}</h1>
          {blurb && <p className="mt-2 text-sm text-muted-foreground">{blurb}</p>}
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-center sm:gap-3 sm:justify-start">
            {cta && (
              <Button asChild>
                <Link href={cta.href}>
                  {cta.label}
                  <ArrowRight />
                </Link>
              </Button>
            )}
            {missCount > 0 && (
              <Button asChild variant={cta ? "outline" : "default"}>
                <Link href={practiceHref({ review: true })}>
                  <RotateCcw />
                  Practice your {missCount} miss{missCount === 1 ? "" : "es"}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {usedSections.length > 1 && (
        <section className="mt-6">
          <h2 className="text-sm font-medium text-muted-foreground">By section</h2>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {usedSections.map((s) => {
              const sec = score.bySection[s.key];
              return (
                <Link
                  key={s.key}
                  href={practiceHref({ section: s.key })}
                  className="flex flex-col items-center gap-2 rounded-xl border bg-card p-4 outline-none transition-colors hover:bg-secondary/40 focus-visible:ring-[3px] focus-visible:ring-ring/40"
                >
                  <ScoreRing score={sec ? sec.pct : null} size="md" />
                  <p className="text-center text-xs text-muted-foreground">
                    {sectionLabel(s.key)}
                  </p>
                  {sec && (
                    <p className="font-mono text-[11px] text-muted-foreground tabular-nums">
                      {sec.correct}/{sec.total}
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {showWeakAreas && weak.length > 0 && (
        <section className="mt-6 rounded-2xl border bg-card p-5">
          <h2 className="text-sm font-medium">Focus areas to revisit</h2>
          <ul className="mt-3 space-y-3">
            {weak.map((w) => (
              <li key={`${w.section}:${w.topic}`}>
                <Link
                  href={practiceHref({ section: w.section, topic: w.topic })}
                  className="group flex items-center gap-3 text-sm outline-none"
                >
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className="truncate group-hover:underline">
                        {topicLabel(w.section, w.topic)}
                      </span>
                      <span className="shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
                        {w.pct}%
                      </span>
                    </span>
                    <Progress value={w.pct} tone={masteryTone(w.pct)} className="mt-1.5 h-1.5" />
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {showWeakAreas && Object.keys(score.bySubtopic).length > 1 && (
        <section className="mt-6 rounded-2xl border bg-card p-5">
          <h2 className="text-sm font-medium">By skill</h2>
          <ul className="mt-3 space-y-2">
            {Object.entries(score.bySubtopic)
              .sort((a, b) => a[1].pct - b[1].pct)
              .map(([skill, v]) => {
                const loc = skillLoc.get(skill);
                const row = (
                  <span className="flex items-center justify-between gap-3 text-sm">
                    <span className="min-w-0 truncate">{skill}</span>
                    <span className="shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
                      {v.correct}/{v.total} ({v.pct}%)
                    </span>
                  </span>
                );
                return (
                  <li key={skill}>
                    {loc ? (
                      <Link
                        href={practiceHref({ section: loc.section, topic: loc.topic, subtopic: skill })}
                        className="block rounded-md px-1 py-0.5 outline-none hover:bg-secondary/50 focus-visible:ring-[3px] focus-visible:ring-ring/40"
                      >
                        {row}
                      </Link>
                    ) : (
                      row
                    )}
                  </li>
                );
              })}
          </ul>
        </section>
      )}

      <section className="mt-8">
        <h2 className="text-sm font-medium text-muted-foreground">
          Review every question
        </h2>
        <div className="mt-3">
          <ReviewList items={result.items} groupBySection={isMock} />
        </div>
      </section>
    </div>
  );
}
