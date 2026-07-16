import Link from "next/link";
import { ArrowRight, BookOpen, Check, Lightbulb, X } from "lucide-react";

import { Kicker } from "@/components/ui/page";
import { LETTERS } from "@/components/quiz/question-view";
import { ContentBlocks, RichText } from "@/components/quiz/question-content";
import { SaveQuestionButton } from "@/components/quiz/save-question-button";
import { learnSkillHref } from "@/lib/quiz/links";
import { splitExplanation, type StructuredRationale } from "@/lib/quiz/rationale";
import { cn } from "@/lib/utils";
import type { AnswerFeedback } from "@/lib/quiz/attempt";
import type { Answer, ClientQuestion } from "@/lib/quiz/types";

/** Human-readable correct answer, by question type. */
export function formatCorrectAnswer(
  q: ClientQuestion,
  correct: number[] | string[],
): string {
  if (q.type === "FILL_BLANK") return (correct as string[]).join(" or ");
  if (q.type === "ORDERED")
    return (correct as number[]).map((i) => q.options[i]).join(" → ");
  return (correct as number[])
    .map((i) =>
      q.options[i] != null ? `${LETTERS[i] ?? i + 1}. ${q.options[i]}` : `Region ${i + 1}`,
    )
    .join("; ");
}

/**
 * Types whose correct answer is painted in place (onto the choices or the
 * diagram), so the panel never restates it as text.
 */
const ANSWER_SHOWN_IN_PLACE = new Set(["SINGLE", "MULTI", "HOT_SPOT"]);

/**
 * The explanation content, structured when authored, flat otherwise:
 * takeaway, steps (or prose body), why the correct answer works, why each
 * distractor fails, and the common mistake. Shared by the live rationale
 * panel and the post-hoc review list. Sections render only when data exists.
 */
export function RationaleBody({
  explanation,
  rationale,
  options,
  pickedIndexes = [],
  className,
}: {
  explanation: string | null;
  rationale: StructuredRationale | null;
  options: string[];
  /** the user's selected option indexes, to lead the distractor list */
  pickedIndexes?: number[];
  className?: string;
}) {
  const flat = splitExplanation(explanation);
  const takeaway = rationale?.takeaway ?? flat.takeaway;
  const body = rationale?.steps ? null : flat.body;

  const distractors = rationale?.distractors
    ? Object.entries(rationale.distractors)
        .map(([k, why]) => ({ index: Number(k), why }))
        .filter((d) => options[d.index] != null)
        .sort((a, b) => {
          const aPicked = pickedIndexes.includes(a.index) ? 0 : 1;
          const bPicked = pickedIndexes.includes(b.index) ? 0 : 1;
          return aPicked - bPicked || a.index - b.index;
        })
    : [];

  if (!takeaway && !body && !rationale) return null;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {takeaway && (
        <div>
          <Kicker className="text-[11px]">Key takeaway</Kicker>
          <p className="mt-1.5 max-w-prose text-[15px] leading-relaxed">
            <RichText className="font-medium">{takeaway}</RichText>
          </p>
        </div>
      )}

      {rationale?.steps && (
        <div>
          <Kicker className="text-[11px]">Step by step</Kicker>
          <ol className="mt-1.5 flex max-w-prose flex-col gap-1.5">
            {rationale.steps.map((step, i) => (
              <li key={i} className="flex gap-2.5 text-[15px] leading-relaxed">
                <span className="mt-px shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
                  {i + 1}.
                </span>
                <RichText className="min-w-0">{step}</RichText>
              </li>
            ))}
          </ol>
        </div>
      )}

      {body && (
        <ContentBlocks
          text={body}
          className="max-w-prose text-[15px] leading-relaxed text-muted-foreground"
        />
      )}

      {rationale?.whyCorrect && (
        <div>
          <Kicker className="text-[11px]">Why it works</Kicker>
          <p className="mt-1.5 max-w-prose text-[15px] leading-relaxed text-muted-foreground">
            <RichText>{rationale.whyCorrect}</RichText>
          </p>
        </div>
      )}

      {distractors.length > 0 && (
        <div>
          <Kicker className="text-[11px]">Why the others fail</Kicker>
          <ul className="mt-1.5 flex max-w-prose flex-col gap-1.5">
            {distractors.map((d) => (
              <li key={d.index} className="flex gap-2.5 text-[15px] leading-relaxed">
                <span
                  className={cn(
                    "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border font-mono text-[11px]",
                    pickedIndexes.includes(d.index)
                      ? "border-destructive/60 text-destructive"
                      : "text-muted-foreground",
                  )}
                >
                  {LETTERS[d.index] ?? d.index + 1}
                </span>
                <RichText className="min-w-0 text-muted-foreground">{d.why}</RichText>
              </li>
            ))}
          </ul>
        </div>
      )}

      {rationale?.commonMistake && (
        <div className="flex max-w-prose gap-2.5 rounded-md bg-secondary/60 px-3 py-2.5">
          <Lightbulb className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
          <p className="text-sm leading-relaxed text-secondary-foreground">
            <span className="font-medium">Watch for: </span>
            <RichText>{rationale.commonMistake}</RichText>
          </p>
        </div>
      )}
    </div>
  );
}

/**
 * The teaching moment after checking an answer: verdict, structured
 * explanation, related lesson, and save-for-review. A bordered card with a
 * tinted verdict icon — never a full-color wall.
 */
export function RationalePanel({
  question,
  feedback,
  answer,
}: {
  question: ClientQuestion;
  feedback: AnswerFeedback;
  /** the user's submitted answer, used to lead the distractor rationales */
  answer?: Answer;
}) {
  const restateAnswer =
    !feedback.isCorrect && !ANSWER_SHOWN_IN_PLACE.has(question.type);
  const pickedIndexes =
    typeof answer === "number"
      ? [answer]
      : Array.isArray(answer)
        ? answer.filter((n): n is number => typeof n === "number")
        : [];

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
          {question.type === "MULTI" && !feedback.isCorrect && (
            <p className="text-xs text-muted-foreground">
              Multi-select scores as all or nothing: every correct option, no extras.
            </p>
          )}
        </div>
      </div>

      <RationaleBody
        explanation={feedback.explanation}
        rationale={feedback.rationale}
        options={question.options}
        pickedIndexes={feedback.isCorrect ? [] : pickedIndexes}
        className="px-4 py-4"
      />

      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t px-4 py-2.5">
        {feedback.subtopic ? (
          <Link
            href={learnSkillHref(feedback.section, feedback.topic, feedback.subtopic)}
            className={cn(
              "group flex min-w-0 items-center gap-2 rounded-md px-2 py-1.5",
              "text-sm font-medium text-primary outline-none transition-colors",
              "hover:bg-secondary/60 focus-visible:ring-[3px] focus-visible:ring-ring/40",
            )}
          >
            <BookOpen className="size-4 shrink-0" aria-hidden />
            <span className="truncate">Review this skill: {feedback.subtopic}</span>
            <ArrowRight
              className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        ) : (
          <span />
        )}
        <SaveQuestionButton questionId={question.id} initialSaved={feedback.saved} />
      </div>
    </section>
  );
}
