"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Flag, Grid2x2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ExamTimer } from "@/components/exam-timer";
import { QuizCalculator } from "@/components/quiz/calculator";
import { QuestionView, isAnswered, usesSplitLayout } from "@/components/quiz/question-view";
import { useAnswerKeys } from "@/components/quiz/use-answer-keys";
import { useLeaveGuard } from "@/components/quiz/use-leave-guard";
import { useEnterFocusMode } from "@/components/focus-mode";
import { cn } from "@/lib/utils";
import type { Answer, ClientQuestion } from "@/lib/quiz/types";
import { Kicker } from "@/components/ui/page";

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
  useEnterFocusMode();
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [confidence, setConfidence] = useState<Record<string, number>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [navOpen, setNavOpen] = useState(false);

  const q = questions[index];
  const answeredCount = useMemo(
    () => questions.filter((x) => isAnswered(answers[x.id])).length,
    [answers, questions],
  );

  // Quiz answers are graded on submit, not autosaved: a refresh loses them.
  useLeaveGuard(answeredCount > 0);

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
  const goNext = () => setIndex((i) => Math.min(questions.length - 1, i + 1));
  const goPrev = () => setIndex((i) => Math.max(0, i - 1));

  useAnswerKeys({
    question: q,
    answer: q ? (answers[q.id] ?? null) : null,
    setAnswer: (v) => q && setAnswer(q.id, v),
    onFlag: () => q && toggleFlag(q.id),
    onNext: goNext,
    onPrev: goPrev,
    onEnter: () => (isLast ? finish() : goNext()),
    deps: [index, answers, questions, isLast],
  });

  if (!q) return null;

  const wide = usesSplitLayout(q);

  return (
    <div
      className={cn(
        "mx-auto flex min-h-dvh w-full flex-col px-4 pb-28 pt-4",
        wide ? "max-w-2xl lg:max-w-5xl" : "max-w-2xl",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          {title && (
            <Kicker className="truncate">{title}</Kicker>
          )}
          <p className="font-mono text-sm tabular-nums">
            {index + 1}{" "}
            <span className="text-muted-foreground">/ {questions.length}</span>
          </p>
        </div>
        {durationSec ? (
          <ExamTimer durationSec={durationSec} onExpire={finish} />
        ) : null}
        <div className="flex items-center gap-1">
          {q.section === "MATH" && <QuizCalculator />}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setNavOpen((v) => !v)}
            aria-expanded={navOpen}
            aria-label="Question navigator"
          >
            <Grid2x2 />
          </Button>
          <Button
            variant={flagged.has(q.id) ? "secondary" : "ghost"}
            size="sm"
            onClick={() => toggleFlag(q.id)}
            aria-pressed={flagged.has(q.id)}
          >
            <Flag className={cn(flagged.has(q.id) && "fill-current")} />
            <span className="hidden sm:inline">
              {flagged.has(q.id) ? "Flagged" : "Flag"}
            </span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            aria-label="Exit without finishing"
            onClick={() => {
              if (
                answeredCount === 0 ||
                window.confirm(
                  "Leave this set? It isn't scored until you finish, so these answers won't be saved.",
                )
              ) {
                router.push("/today");
              }
            }}
          >
            <X />
          </Button>
        </div>
      </div>

      <Progress
        value={((index + 1) / questions.length) * 100}
        size="sm"
        className="mt-3"
        aria-label={`Question ${index + 1} of ${questions.length}`}
      />

      {navOpen && (
        <Navigator
          questions={questions}
          answers={answers}
          flagged={flagged}
          current={index}
          onJump={(i) => {
            setIndex(i);
            setNavOpen(false);
          }}
          onClose={() => setNavOpen(false)}
        />
      )}

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
        <div
          className={cn(
            "mx-auto flex items-center justify-between gap-3 px-4 py-3",
            wide ? "max-w-2xl lg:max-w-5xl" : "max-w-2xl",
          )}
        >
          <Button variant="outline" onClick={goPrev} disabled={index === 0}>
            <ChevronLeft />
            Back
          </Button>
          <p className="font-mono text-xs text-muted-foreground tabular-nums">
            {answeredCount}/{questions.length} answered
          </p>
          {isLast ? (
            <Button onClick={finish}>{submitLabel}</Button>
          ) : (
            <Button onClick={goNext}>
              Next
              <ChevronRight />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function Navigator({
  questions,
  answers,
  flagged,
  current,
  onJump,
  onClose,
}: {
  questions: ClientQuestion[];
  answers: Record<string, Answer>;
  flagged: Set<string>;
  current: number;
  onJump: (i: number) => void;
  onClose: () => void;
}) {
  return (
    <div className="mt-4 rounded-xl border bg-card p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Jump to a question</p>
        <Button variant="ghost" size="icon" className="size-7" onClick={onClose} aria-label="Close navigator">
          <X />
        </Button>
      </div>
      <div className="mt-3 grid grid-cols-8 gap-2 sm:grid-cols-10">
        {questions.map((x, i) => {
          const done = isAnswered(answers[x.id]);
          const isFlagged = flagged.has(x.id);
          return (
            <button
              key={x.id}
              type="button"
              onClick={() => onJump(i)}
              className={cn(
                "relative flex h-9 items-center justify-center rounded-md border font-mono text-xs tabular-nums outline-none transition-colors",
                "focus-visible:ring-[3px] focus-visible:ring-ring/40",
                i === current && "ring-2 ring-primary",
                done
                  ? "border-primary/40 bg-primary/10 text-foreground"
                  : "text-muted-foreground hover:bg-secondary",
              )}
            >
              {i + 1}
              {isFlagged && (
                <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-warning" />
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm border border-primary/40 bg-primary/10" /> answered
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-warning" /> flagged
        </span>
      </div>
    </div>
  );
}
