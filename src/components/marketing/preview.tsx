"use client";

import { ArrowRight, Lightbulb } from "lucide-react";

import { LessonBlocks } from "@/components/learn/guided/lesson-blocks";
import { QuickCheckPanel } from "@/components/learn/guided/quick-check";
import { RationalePanel } from "@/components/quiz/rationale-panel";
import { SessionHero } from "@/components/today/session-hero";
import { WeekStrip } from "@/components/today/week-strip";
import { QuestionView } from "@/components/quiz/question-view";
import { ActionRow } from "@/components/ui/action-row";
import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/ui/page";
import { Progress } from "@/components/ui/progress";
import { BAND_LABELS, type Band } from "@/lib/quiz/diagnostic-insights";
import { COMPARE_ORDER_RATIONAL_NUMBERS } from "@/content/guided-lessons/compare-order-rational-numbers";
import { cn } from "@/lib/utils";
import {
  PREVIEW_ACTION,
  PREVIEW_ANSWER,
  PREVIEW_FEEDBACK,
  PREVIEW_INSIGHTS,
  PREVIEW_QUESTION,
  PREVIEW_SESSION,
  PREVIEW_WEEK,
} from "./fixtures";

/**
 * A framed, non-interactive slice of the real app. The preview is a picture of
 * the product, so it is announced by its caption rather than walked through:
 * its buttons go nowhere and its headings ("Ratios and proportions + review")
 * would otherwise litter the page's heading outline with fixture data.
 *
 * `inert` takes it out of the tab order and `aria-hidden` out of the
 * accessibility tree. Both, deliberately: inert alone should imply the second,
 * but support for that is uneven, and this is not a detail to leave to chance.
 */
function Frame({
  label,
  children,
  className,
  interactive = false,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
  /**
   * A live slice instead of a picture: keeps the contents in the tab order
   * and the accessibility tree. Reserve it for previews whose whole point is
   * being tried (the lesson's worked example and quick check).
   */
  interactive?: boolean;
}) {
  return (
    <figure className={cn("min-w-0", className)}>
      <div
        className="overflow-hidden rounded-xl border bg-background p-4 shadow-sm sm:p-5"
        inert={!interactive || undefined}
        aria-hidden={!interactive || undefined}
      >
        {children}
      </div>
      <figcaption className="mt-3 text-sm text-muted-foreground">
        {label}
      </figcaption>
    </figure>
  );
}

/** Today: the session, why it was chosen, and the week around it. */
export function TodayPreview({ className }: { className?: string }) {
  return (
    <Frame
      className={className}
      label="Today: one session, chosen from your results, with the week around it."
    >
      <SessionHero action={PREVIEW_ACTION} preview={PREVIEW_SESSION} />
      <div className="mt-6">
        <WeekStrip days={PREVIEW_WEEK} />
      </div>
    </Frame>
  );
}

/** A question in its focused shell, exactly as it appears in practice. */
export function QuestionPreview({ className }: { className?: string }) {
  return (
    <Frame
      className={className}
      label="Questions get a quiet screen: the prompt, the choices, and nothing else."
    >
      <QuestionView question={PREVIEW_QUESTION} value={null} onChange={() => {}} />
    </Frame>
  );
}

const BAND_TEXT: Record<Band, string> = {
  strong: "text-success",
  solid: "text-primary",
  "needs-work": "text-warning",
  priority: "text-destructive",
};

const BAND_TONE: Record<
  Band,
  "success" | "primary" | "warning" | "destructive"
> = {
  strong: "success",
  solid: "primary",
  "needs-work": "warning",
  priority: "destructive",
};

/**
 * Diagnostic results, condensed: the same bands, bars, and ranked priorities
 * the real results page renders, minus its page chrome. Tones mirror
 * `diagnostic-result-view.tsx`.
 */
export function ResultsPreview({ className }: { className?: string }) {
  const r = PREVIEW_INSIGHTS;
  return (
    <Frame
      className={className}
      label="Results read as a diagnosis: section by section, then the three skills worth your next hour."
    >
      <Kicker className="text-[11px]">Diagnostic results</Kicker>
      <p className="mt-2 text-base font-semibold tracking-tight text-balance">
        {r.headline}
      </p>
      <p className="mt-3 flex items-baseline gap-2">
        <span className="font-mono text-3xl font-semibold tracking-tight tabular-nums">
          {r.overallPct}%
        </span>
        <span className="text-xs text-muted-foreground">
          {r.totalCorrect} of {r.totalItems} correct
        </span>
      </p>

      <ul className="mt-6 space-y-4">
        {r.sections.map((s) => (
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
            />
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <Kicker className="text-[11px]">Your top priorities</Kicker>
        <ol className="mt-2.5 space-y-2">
          {r.priorities.map((p, i) => (
            <li key={p.topic}>
              <ActionRow className="items-start">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-primary/10 font-mono text-xs font-semibold text-primary">
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium">
                    {p.label}{" "}
                    <span className="font-normal text-muted-foreground">
                      · {p.sectionLabel}
                    </span>
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    About {p.examSharePct}% of the exam. You scored {p.correct}/
                    {p.total} here.
                  </span>
                </span>
              </ActionRow>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-4 flex items-start gap-3 rounded-xl border bg-card p-4">
        <Lightbulb className="mt-0.5 size-4 shrink-0 text-warning" aria-hidden />
        <p className="text-sm leading-relaxed">
          You guessed on <span className="font-medium">{r.guessed.total}</span>{" "}
          questions and got {r.guessed.correct} right. Lucky guesses count as
          gaps, not strengths, so your plan includes them.
        </p>
      </div>

      <Button className="mt-5 w-full" size="lg">
        Build my study plan
        <ArrowRight />
      </Button>
    </Frame>
  );
}

/**
 * A live slice of the real rational-numbers lesson: the concept, the rule,
 * a worked example revealed step by step, and a quick check. Interactive on
 * purpose; the fastest way to trust a lesson is to try one.
 */
export function LessonPreview({ className }: { className?: string }) {
  const lesson = COMPARE_ORDER_RATIONAL_NUMBERS;
  const section = lesson.sections[0];
  return (
    <Frame
      className={className}
      interactive
      label="A real lesson, live on this page. Step through the example and try the quick check."
    >
      <div className="flex items-baseline justify-between gap-3">
        <Kicker className="text-[11px]">Math · Numbers &amp; algebra</Kicker>
        <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
          {lesson.minutes[0]}–{lesson.minutes[1]} min
        </span>
      </div>
      <p className="mt-2 text-lg font-semibold tracking-tight">
        {lesson.title}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Part 1 of {lesson.sections.length}: {section.title}
      </p>
      <div className="mt-5">
        <LessonBlocks blocks={section.blocks} />
      </div>
      {section.quickCheck && (
        <div className="mt-6">
          <QuickCheckPanel check={section.quickCheck} />
        </div>
      )}
    </Frame>
  );
}

/** The rationale: why the right answer works and why yours did not. */
export function RationalePreview({ className }: { className?: string }) {
  return (
    <Frame
      className={className}
      label="Every explanation is worked step by step, including why your answer missed."
    >
      <RationalePanel
        question={PREVIEW_QUESTION}
        feedback={PREVIEW_FEEDBACK}
        answer={PREVIEW_ANSWER}
      />
    </Frame>
  );
}
