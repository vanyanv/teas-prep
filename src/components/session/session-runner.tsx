"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Loader2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { QuestionView, isAnswered, LETTERS } from "@/components/quiz/question-view";
import { useEnterFocusMode } from "@/components/focus-mode";
import { learnSkillHref } from "@/lib/quiz/links";
import { cn } from "@/lib/utils";
import type { AnswerFeedback } from "@/lib/quiz/attempt";
import type { Answer, ClientQuestion } from "@/lib/quiz/types";

/** Human-readable correct answer for the feedback panel, by question type. */
export function formatCorrectAnswer(
  q: ClientQuestion,
  correct: number[] | string[],
): string {
  if (q.type === "FILL_BLANK") return (correct as string[]).join(" or ");
  if (q.type === "ORDERED")
    return (correct as number[]).map((i) => q.options[i]).join(" → ");
  return (correct as number[])
    .map((i) => (q.options[i] != null ? `${LETTERS[i] ?? i + 1}. ${q.options[i]}` : `Region ${i + 1}`))
    .join("; ");
}

/**
 * One-question-at-a-time runner with immediate feedback: answer → check →
 * explanation → continue. No back navigation; the explanation is the point.
 */
export function SessionRunner({
  questions,
  onAnswer,
  onDone,
}: {
  questions: ClientQuestion[];
  onAnswer: (
    questionId: string,
    answer: Answer,
    confidence: number | null,
    timeMs: number,
  ) => Promise<AnswerFeedback>;
  onDone: (correctCount: number) => void;
}) {
  useEnterFocusMode();
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<Answer>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<AnswerFeedback | null>(null);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const startedAtRef = useRef(Date.now());

  const q = questions[index];
  if (!q) return null;
  const isLast = index === questions.length - 1;

  async function check() {
    if (!q || checking || !isAnswered(answer)) return;
    setChecking(true);
    setError(null);
    try {
      const fb = await onAnswer(q.id, answer, confidence, Date.now() - startedAtRef.current);
      setFeedback(fb);
      if (fb.isCorrect) setCorrectCount((n) => n + 1);
    } catch {
      setError("Could not check that answer. Please try again.");
    }
    setChecking(false);
  }

  function next() {
    if (isLast) {
      onDone(correctCount);
      return;
    }
    setIndex((i) => i + 1);
    setAnswer(null);
    setConfidence(null);
    setFeedback(null);
    setError(null);
    startedAtRef.current = Date.now();
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-4 pb-28 pt-4">
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Today&apos;s session
        </p>
        <p className="font-mono text-sm tabular-nums">
          {index + 1} <span className="text-muted-foreground">/ {questions.length}</span>
        </p>
      </div>

      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-300"
          style={{ width: `${((index + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="mt-6 flex-1">
        <div inert={feedback != null || undefined}>
          <QuestionView
            question={q}
            value={answer}
            onChange={setAnswer}
            confidence={confidence}
            onConfidence={(c) => setConfidence(c)}
          />
        </div>

        {feedback && <FeedbackPanel question={q} feedback={feedback} />}
        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
      </div>

      <div className="fixed inset-x-0 bottom-0 border-t bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-end gap-3 px-4 py-3">
          {feedback ? (
            <Button onClick={next}>
              {isLast ? "Finish session" : "Continue"}
              <ArrowRight />
            </Button>
          ) : (
            <Button onClick={check} disabled={!isAnswered(answer) || checking}>
              {checking && <Loader2 className="animate-spin" />}
              Check answer
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function FeedbackPanel({
  question,
  feedback,
}: {
  question: ClientQuestion;
  feedback: AnswerFeedback;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "mt-6 rounded-xl border p-4",
        feedback.isCorrect
          ? "border-success/40 bg-success/5"
          : "border-destructive/40 bg-destructive/5",
      )}
    >
      <p
        className={cn(
          "flex items-center gap-2 text-sm font-semibold",
          feedback.isCorrect ? "text-success" : "text-destructive",
        )}
      >
        {feedback.isCorrect ? <Check className="size-4" /> : <X className="size-4" />}
        {feedback.isCorrect ? "Correct" : "Not quite"}
      </p>
      {!feedback.isCorrect && (
        <p className="mt-2 text-sm">
          <span className="font-medium">Correct answer:</span>{" "}
          {formatCorrectAnswer(question, feedback.correct)}
        </p>
      )}
      {feedback.explanation && (
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {feedback.explanation}
        </p>
      )}
      {feedback.subtopic && (
        <Link
          href={learnSkillHref(feedback.section, feedback.topic, feedback.subtopic)}
          className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
        >
          Review this skill: {feedback.subtopic}
        </Link>
      )}
    </div>
  );
}
