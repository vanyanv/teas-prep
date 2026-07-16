"use client";

import * as React from "react";
import { Check, RotateCcw, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RichText } from "@/components/quiz/question-content";
import type { QuickCheck } from "@/content/guided-lesson-types";

/**
 * One short question with immediate feedback, before moving to the next
 * section. Informal by design: retries are free, nothing here touches
 * mastery, and only the first try is remembered (to suggest review topics
 * in the lesson summary).
 */
export function QuickCheckPanel({
  check,
  onFirstResult,
}: {
  check: QuickCheck;
  /** Called once, on the first selection. */
  onFirstResult?: (correct: boolean) => void;
}) {
  const [selected, setSelected] = React.useState<number | null>(null);
  const [solved, setSolved] = React.useState(false);
  const reported = React.useRef(false);

  const missed = selected != null && !solved;

  function pick(i: number) {
    if (solved || selected != null) return;
    setSelected(i);
    const correct = i === check.answer;
    if (!reported.current) {
      reported.current = true;
      onFirstResult?.(correct);
    }
    if (correct) setSolved(true);
  }

  return (
    <section
      aria-label="Quick check"
      className="rounded-xl border bg-secondary/30 p-4 sm:p-5"
    >
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Quick check
        </p>
        <p className="text-xs text-muted-foreground">Doesn&apos;t affect your score</p>
      </div>
      <p className="mt-2.5 text-[15px] font-medium leading-relaxed">
        <RichText>{check.prompt}</RichText>
      </p>
      <div className="mt-3 grid gap-2">
        {check.choices.map((choice, i) => {
          const isSelected = selected === i;
          const isAnswer = i === check.answer;
          return (
            <button
              key={i}
              type="button"
              onClick={() => pick(i)}
              disabled={solved || (selected != null && !isSelected)}
              className={cn(
                "min-h-11 rounded-md border bg-card px-3.5 py-2.5 text-left text-[15px] leading-relaxed outline-none transition-colors",
                "focus-visible:ring-[3px] focus-visible:ring-ring/40",
                selected == null && "hover:border-primary/40 hover:bg-secondary/40",
                solved && isAnswer && "border-success/60 bg-success/10",
                isSelected && !isAnswer && "border-destructive/50 bg-destructive/5",
                selected != null && !isSelected && !((solved && isAnswer)) && "opacity-60",
              )}
            >
              <span className="flex items-start justify-between gap-3">
                <RichText className="min-w-0">{choice}</RichText>
                {solved && isAnswer && (
                  <Check className="mt-1 size-4 shrink-0 text-success" aria-hidden />
                )}
                {isSelected && !isAnswer && (
                  <X className="mt-1 size-4 shrink-0 text-destructive" aria-hidden />
                )}
              </span>
            </button>
          );
        })}
      </div>
      <div aria-live="polite">
        {solved && (
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            <span className="font-medium text-success">Correct.</span>{" "}
            <RichText>{check.explanation}</RichText>
          </p>
        )}
        {missed && (
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <p className="text-[15px] text-muted-foreground">
              Not quite. Think it through once more.
            </p>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setSelected(null)}
            >
              <RotateCcw />
              Try again
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
