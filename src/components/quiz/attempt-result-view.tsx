import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";

import { ScoreRing } from "@/components/score-ring";
import { Button } from "@/components/ui/button";
import {
  SECTIONS,
  sectionLabel,
  topicLabel,
  type Section,
} from "@/lib/teas-blueprint";
import type { AttemptResult } from "@/lib/quiz/attempt";
import type { Answer, QuizQuestion } from "@/lib/quiz/types";

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

  const weak = Object.entries(score.byTopic)
    .map(([k, v]) => {
      const [section, topic] = k.split(":") as [Section, string];
      return { section, topic, ...v };
    })
    .sort((a, b) => a.pct - b.pct)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {kicker}
      </p>

      <section className="mt-4 flex flex-col items-center gap-4 rounded-xl border bg-card p-6 sm:flex-row sm:gap-8 sm:p-8">
        <div className="flex flex-col items-center gap-1">
          <ScoreRing score={score.pct} size="xl" />
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Overall
          </p>
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-xl font-semibold tracking-tight">{headline}</h1>
          {blurb && <p className="mt-2 text-sm text-muted-foreground">{blurb}</p>}
          {cta && (
            <Button asChild className="mt-4">
              <Link href={cta.href}>
                {cta.label}
                <ArrowRight />
              </Link>
            </Button>
          )}
        </div>
      </section>

      {usedSections.length > 1 && (
        <section className="mt-6">
          <h2 className="text-sm font-medium text-muted-foreground">By section</h2>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {usedSections.map((s) => {
              const sec = score.bySection[s.key];
              return (
                <div
                  key={s.key}
                  className="flex flex-col items-center gap-2 rounded-lg border bg-card p-4"
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
                </div>
              );
            })}
          </div>
        </section>
      )}

      {showWeakAreas && weak.length > 0 && (
        <section className="mt-6 rounded-xl border bg-card p-5">
          <h2 className="text-sm font-medium">Focus areas to revisit</h2>
          <ul className="mt-3 space-y-2">
            {weak.map((w) => (
              <li
                key={`${w.section}:${w.topic}`}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <span>{topicLabel(w.section, w.topic)}</span>
                <span className="font-mono text-xs text-muted-foreground tabular-nums">
                  {w.correct}/{w.total} ({w.pct}%)
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-8">
        <h2 className="text-sm font-medium text-muted-foreground">
          Review every question
        </h2>
        <div className="mt-3 space-y-3">
          {result.items.map((item, i) => (
            <ReviewItem
              key={item.question.id}
              index={i}
              question={item.question}
              selected={item.selected}
              isCorrect={item.isCorrect}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function ReviewItem({
  index,
  question,
  selected,
  isCorrect,
}: {
  index: number;
  question: QuizQuestion;
  selected: Answer;
  isCorrect: boolean | null;
}) {
  return (
    <details className="group rounded-lg border bg-card transition-colors hover:border-foreground/15">
      <summary className="flex cursor-pointer list-none items-start gap-3 rounded-lg p-4 outline-none transition-colors hover:bg-secondary/40 focus-visible:ring-[3px] focus-visible:ring-ring/40">
        <span
          className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${
            isCorrect
              ? "bg-success/15 text-success"
              : "bg-destructive/15 text-destructive"
          }`}
        >
          {isCorrect ? <Check className="size-3.5" /> : <X className="size-3.5" />}
        </span>
        <span className="flex-1 text-sm">
          <span className="font-mono text-xs text-muted-foreground">
            {index + 1}.
          </span>{" "}
          {question.stem}
        </span>
      </summary>
      <div className="border-t px-4 py-3 text-sm">
        <p className="text-muted-foreground">
          <span className="font-medium text-foreground">Your answer: </span>
          {formatAnswer(question, selected)}
        </p>
        <p className="mt-1 text-muted-foreground">
          <span className="font-medium text-foreground">Correct: </span>
          {formatCorrect(question)}
        </p>
        {question.explanation && (
          <p className="mt-2 text-muted-foreground">{question.explanation}</p>
        )}
        {question.attribution && (
          <p className="mt-2 font-mono text-[10px] text-muted-foreground/70">
            {question.attribution}
          </p>
        )}
      </div>
    </details>
  );
}

function formatAnswer(q: QuizQuestion, a: Answer): string {
  if (a == null || (Array.isArray(a) && a.length === 0) || a === "")
    return "Not answered";
  if (q.type === "FILL_BLANK") return String(a);
  const idxs = Array.isArray(a) ? a : [a as number];
  return idxs.map((i) => q.options[i as number]).filter(Boolean).join(", ");
}

function formatCorrect(q: QuizQuestion): string {
  if (q.type === "FILL_BLANK") return (q.correct as string[]).join(" / ");
  const idxs = q.correct as number[];
  if (q.type === "ORDERED") return idxs.map((i) => q.options[i]).join(" → ");
  return idxs.map((i) => q.options[i]).filter(Boolean).join(", ");
}
