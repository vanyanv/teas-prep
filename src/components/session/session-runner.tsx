"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Kicker } from "@/components/ui/page";
import { QuestionView, isAnswered, usesSplitLayout } from "@/components/quiz/question-view";
import { QuizCalculator } from "@/components/quiz/calculator";
import { RationalePanel } from "@/components/quiz/rationale-panel";
import { useEnterFocusMode } from "@/components/focus-mode";
import { cn } from "@/lib/utils";
import type { AnswerFeedback } from "@/lib/quiz/attempt";
import type { Answer, ClientQuestion } from "@/lib/quiz/types";

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
  const startedAtRef = useRef<number | null>(null);

  // Stamp the question's start time on mount and whenever the question changes.
  useEffect(() => {
    startedAtRef.current = Date.now();
  }, [index]);

  const q = questions[index];
  if (!q) return null;
  const isLast = index === questions.length - 1;
  const wide = usesSplitLayout(q);

  async function check() {
    if (!q || checking || !isAnswered(answer)) return;
    setChecking(true);
    setError(null);
    try {
      const fb = await onAnswer(
        q.id,
        answer,
        confidence,
        Date.now() - (startedAtRef.current ?? Date.now()),
      );
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
  }

  return (
    <div
      className={cn(
        "mx-auto flex min-h-dvh w-full flex-col px-4 pb-32 pt-4",
        wide ? "max-w-2xl lg:max-w-5xl" : "max-w-2xl",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <Kicker>Today&apos;s session</Kicker>
        <div className="flex items-center gap-2">
          {q.section === "MATH" && <QuizCalculator />}
          <p className="font-mono text-sm tabular-nums">
            {index + 1}{" "}
            <span className="text-muted-foreground">/ {questions.length}</span>
          </p>
        </div>
      </div>

      <Progress
        value={((index + 1) / questions.length) * 100}
        size="sm"
        className="mt-3"
        aria-label={`Question ${index + 1} of ${questions.length}`}
      />

      <div className="mt-6 flex-1">
        <QuestionView
          question={q}
          value={answer}
          onChange={setAnswer}
          confidence={confidence}
          onConfidence={(c) => setConfidence(c)}
          result={feedback}
        />

        {feedback && <RationalePanel question={q} feedback={feedback} />}
        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
      </div>

      <div className="fixed inset-x-0 bottom-0 border-t bg-background/95 backdrop-blur">
        <div
          className={cn(
            "mx-auto flex items-center justify-end px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]",
            wide ? "max-w-2xl lg:max-w-5xl" : "max-w-2xl",
          )}
        >
          {feedback ? (
            <Button onClick={next} className="w-full sm:w-auto">
              {isLast ? "Finish session" : "Continue"}
              <ArrowRight />
            </Button>
          ) : (
            <Button
              onClick={check}
              disabled={!isAnswered(answer) || checking}
              className="w-full sm:w-auto"
            >
              {checking && <Loader2 className="animate-spin" />}
              Check answer
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
