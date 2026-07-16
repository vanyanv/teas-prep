"use client";

import { RationalePanel } from "@/components/quiz/rationale-panel";
import { SessionHero } from "@/components/today/session-hero";
import { WeekStrip } from "@/components/today/week-strip";
import { QuestionView } from "@/components/quiz/question-view";
import { cn } from "@/lib/utils";
import {
  PREVIEW_ACTION,
  PREVIEW_ANSWER,
  PREVIEW_FEEDBACK,
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
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <figure className={cn("min-w-0", className)}>
      <div
        className="overflow-hidden rounded-xl border bg-background p-4 shadow-sm sm:p-5"
        inert
        aria-hidden="true"
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
