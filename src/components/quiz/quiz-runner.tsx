"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Flag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ExamTimer } from "@/components/exam-timer";
import { QuestionView, isAnswered } from "@/components/quiz/question-view";
import { cn } from "@/lib/utils";
import type { Answer, ClientQuestion } from "@/lib/quiz/types";

export interface QuizRunnerProps {
  questions: ClientQuestion[];
  /** total seconds; when set, an auto-submitting timer is shown */
  durationSec?: number;
  title?: string;
  submitLabel?: string;
  onSubmit: (
    answers: Record<string, Answer>,
    flagged: string[],
    confidence: Record<string, number>,
  ) => void;
}

export function QuizRunner({
  questions,
  durationSec,
  title,
  submitLabel = "Finish",
  onSubmit,
}: QuizRunnerProps) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [confidence, setConfidence] = useState<Record<string, number>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());

  const q = questions[index];
  const answeredCount = useMemo(
    () => questions.filter((x) => isAnswered(answers[x.id])).length,
    [answers, questions],
  );

  function setAnswer(id: string, value: Answer) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  function setConfidenceFor(id: string, value: number) {
    setConfidence((prev) => ({ ...prev, [id]: value }));
  }

  function toggleFlag(id: string) {
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function finish() {
    onSubmit(answers, [...flagged], confidence);
  }

  const isLast = index === questions.length - 1;
  if (!q) return null;

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-4 pb-28 pt-4">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          {title && (
            <p className="truncate font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {title}
            </p>
          )}
          <p className="font-mono text-sm tabular-nums">
            {index + 1}{" "}
            <span className="text-muted-foreground">/ {questions.length}</span>
          </p>
        </div>
        {durationSec ? (
          <ExamTimer durationSec={durationSec} onExpire={finish} />
        ) : null}
        <Button
          variant={flagged.has(q.id) ? "secondary" : "ghost"}
          size="sm"
          onClick={() => toggleFlag(q.id)}
          aria-pressed={flagged.has(q.id)}
        >
          <Flag className={cn(flagged.has(q.id) && "fill-current")} />
          {flagged.has(q.id) ? "Flagged" : "Flag"}
        </Button>
      </div>

      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-300"
          style={{ width: `${((index + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="mt-6 flex-1">
        <QuestionView
          question={q}
          value={answers[q.id] ?? null}
          onChange={(v) => setAnswer(q.id, v)}
          confidence={confidence[q.id] ?? null}
          onConfidence={(c) => setConfidenceFor(q.id, c)}
        />
      </div>

      <div className="fixed inset-x-0 bottom-0 border-t bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-4 py-3">
          <Button
            variant="outline"
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
          >
            <ChevronLeft />
            Back
          </Button>
          <p className="font-mono text-xs text-muted-foreground tabular-nums">
            {answeredCount}/{questions.length} answered
          </p>
          {isLast ? (
            <Button onClick={finish}>{submitLabel}</Button>
          ) : (
            <Button
              onClick={() => setIndex((i) => Math.min(questions.length - 1, i + 1))}
            >
              Next
              <ChevronRight />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
