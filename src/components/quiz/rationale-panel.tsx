import Link from "next/link";
import { ArrowRight, BookOpen, Check, X } from "lucide-react";

import { Kicker } from "@/components/ui/page";
import { LETTERS } from "@/components/quiz/question-view";
import { ContentBlocks, RichText } from "@/components/quiz/question-content";
import { learnSkillHref } from "@/lib/quiz/links";
import { cn } from "@/lib/utils";
import type { AnswerFeedback } from "@/lib/quiz/attempt";
import type { ClientQuestion } from "@/lib/quiz/types";

/** Human-readable correct answer, by question type. */
export function formatCorrectAnswer(
  q: ClientQuestion,
  correct: number[] | string[],
): string {
  if (q.type === "FILL_BLANK") return (correct as string[]).join(" or ");
  if (q.type === "ORDERED")
    return (correct as number[]).map((i) => q.options[i]).join(", then ");
  return (correct as number[])
    .map((i) =>
      q.options[i] != null ? `${LETTERS[i] ?? i + 1}. ${q.options[i]}` : `Region ${i + 1}`,
    )
    .join("; ");
}

/** Choice-based types paint the correct answer onto the choices themselves. */
const CHOICES_SHOW_ANSWER = new Set(["SINGLE", "MULTI"]);

function splitLead(text: string | null): [string | null, string | null] {
  if (!text) return [null, null];
  const m = text.match(/^(.*?[.!?])\s+([\s\S]+)$/);
  return m ? [m[1], m[2]] : [text, null];
}

/**
 * The teaching moment after checking an answer: verdict, why, and where to go
 * deeper. A bordered card with a tinted verdict icon — never a full-color wall.
 */
export function RationalePanel({
  question,
  feedback,
}: {
  question: ClientQuestion;
  feedback: AnswerFeedback;
}) {
  const [lead, rest] = splitLead(feedback.explanation);
  const restateAnswer =
    !feedback.isCorrect && !CHOICES_SHOW_ANSWER.has(question.type);

  return (
    <section
      role="status"
      aria-live="polite"
      className="mt-6 overflow-hidden rounded-xl border bg-card"
    >
      <div className="flex items-center gap-3 border-b px-4 py-3">
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-md",
            feedback.isCorrect
              ? "bg-success/10 text-success"
              : "bg-destructive/10 text-destructive",
          )}
        >
          {feedback.isCorrect ? (
            <Check className="size-4" aria-hidden />
          ) : (
            <X className="size-4" aria-hidden />
          )}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold">
            {feedback.isCorrect ? "Correct" : "Not quite"}
          </p>
          {restateAnswer && (
            <p className="text-xs text-muted-foreground">
              Correct answer: {formatCorrectAnswer(question, feedback.correct)}
            </p>
          )}
        </div>
      </div>

      {lead && (
        <div className="px-4 py-4">
          <Kicker className="text-[11px]">Why</Kicker>
          <p className="mt-1.5 max-w-prose text-[15px] leading-relaxed text-foreground">
            <RichText className="font-medium">{lead}</RichText>
          </p>
          {rest && (
            <ContentBlocks
              text={rest}
              className="mt-2 max-w-prose text-[15px] leading-relaxed text-muted-foreground"
            />
          )}
        </div>
      )}

      {feedback.subtopic && (
        <Link
          href={learnSkillHref(feedback.section, feedback.topic, feedback.subtopic)}
          className={cn(
            "group flex items-center justify-between gap-3 border-t px-4 py-3",
            "text-sm font-medium text-primary outline-none transition-colors",
            "hover:bg-secondary/40 focus-visible:ring-[3px] focus-visible:ring-ring/40",
          )}
        >
          <span className="flex min-w-0 items-center gap-2">
            <BookOpen className="size-4 shrink-0" aria-hidden />
            <span className="truncate">Review this skill: {feedback.subtopic}</span>
          </span>
          <ArrowRight
            className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
      )}
    </section>
  );
}
