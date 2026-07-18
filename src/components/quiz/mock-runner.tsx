"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Coffee, Flag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ExamTimer } from "@/components/exam-timer";
import { QuizCalculator } from "@/components/quiz/calculator";
import { QuestionView, isAnswered, usesSplitLayout } from "@/components/quiz/question-view";
import { useAnswerKeys } from "@/components/quiz/use-answer-keys";
import { useLeaveGuard } from "@/components/quiz/use-leave-guard";
import { useEnterFocusMode } from "@/components/focus-mode";
import { BREAK_AFTER, BREAK_MINUTES } from "@/lib/teas-blueprint";
import { cn } from "@/lib/utils";
import type { Answer } from "@/lib/quiz/types";
import type { MockSection } from "@/lib/quiz/attempt";
import { Kicker } from "@/components/ui/page";

type Segment =
  | { kind: "section"; data: MockSection }
  | { kind: "break"; minutes: number };

function buildSegments(sections: MockSection[]): Segment[] {
  const segs: Segment[] = [];
  for (const s of sections) {
    segs.push({ kind: "section", data: s });
    if (s.section === BREAK_AFTER) {
      segs.push({ kind: "break", minutes: BREAK_MINUTES });
    }
  }
  return segs;
}

export function MockRunner({
  sections,
  onSubmit,
  onPersist,
  initialAnswers,
  initialConfidence,
  initialFlagged,
}: {
  sections: MockSection[];
  onSubmit: (
    answers: Record<string, Answer>,
    flagged: string[],
    confidence: Record<string, number>,
  ) => void;
  /** autosave one field of one question (no grading) */
  onPersist?: (
    questionId: string,
    patch: { answer?: Answer; confidence?: number; flagged?: boolean },
  ) => void;
  initialAnswers?: Record<string, Answer>;
  initialConfidence?: Record<string, number>;
  initialFlagged?: string[];
}) {
  useEnterFocusMode();
  useLeaveGuard(true);
  const segments = useMemo(() => buildSegments(sections), [sections]);
  const [segIdx, setSegIdx] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>(initialAnswers ?? {});
  const [confidence, setConfidence] = useState<Record<string, number>>(initialConfidence ?? {});
  const [flagged, setFlagged] = useState<Set<string>>(new Set(initialFlagged ?? []));
  const [confirming, setConfirming] = useState(false);

  const seg = segments[segIdx];
  const isLastSegment = segIdx === segments.length - 1;
  const section = seg?.kind === "section" ? seg.data : null;
  const q = section ? section.questions[qIdx] : undefined;
  const isLastQ = section ? qIdx === section.questions.length - 1 : false;

  function setAnswer(id: string, value: Answer) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    onPersist?.(id, { answer: value });
  }
  function setConfidenceFor(id: string, value: number) {
    setConfidence((prev) => ({ ...prev, [id]: value }));
    onPersist?.(id, { confidence: value });
  }
  function toggleFlag(id: string) {
    setFlagged((prev) => {
      const next = new Set(prev);
      const willFlag = !next.has(id);
      if (willFlag) next.add(id);
      else next.delete(id);
      onPersist?.(id, { flagged: willFlag });
      return next;
    });
  }
  function advanceSegment() {
    setConfirming(false);
    if (segIdx >= segments.length - 1) {
      onSubmit(answers, [...flagged], confidence);
      return;
    }
    setSegIdx((i) => i + 1);
    setQIdx(0);
  }
  const goNextQ = () => {
    if (!section) return;
    if (isLastQ) setConfirming(true);
    else setQIdx((i) => Math.min(section.questions.length - 1, i + 1));
  };
  const goPrevQ = () => setQIdx((i) => Math.max(0, i - 1));

  useAnswerKeys({
    question: confirming ? undefined : q,
    answer: q ? (answers[q.id] ?? null) : null,
    setAnswer: (v) => q && setAnswer(q.id, v),
    onFlag: () => q && toggleFlag(q.id),
    onNext: goNextQ,
    onPrev: goPrevQ,
    onEnter: goNextQ,
    deps: [segIdx, qIdx, answers, isLastQ, confirming],
  });

  if (!seg) return null;

  if (seg.kind === "break") {
    return (
      <div className="mx-auto flex min-h-[70dvh] max-w-md flex-col items-center justify-center px-4 text-center">
        <Coffee className="size-8 text-primary" />
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">Break time</h1>
        <p className="mt-2 text-muted-foreground">
          On the real TEAS you get a 10-minute break after Math. Stretch, breathe,
          hydrate. The next section starts when the timer ends or you&apos;re ready.
        </p>
        <div className="mt-6">
          <ExamTimer
            key={`break-${segIdx}`}
            durationSec={seg.minutes * 60}
            onExpire={advanceSegment}
            prominent
            className="text-xl"
          />
        </div>
        <Button className="mt-8" onClick={advanceSegment}>
          I&apos;m ready, continue
        </Button>
      </div>
    );
  }

  if (!section || !q) return null;

  const answeredInSection = section.questions.filter((x) =>
    isAnswered(answers[x.id]),
  ).length;

  if (confirming) {
    const unanswered = section.questions.length - answeredInSection;
    return (
      <div className="mx-auto flex min-h-[70dvh] max-w-md flex-col items-center justify-center px-4 text-center">
        <Kicker>{section.label}</Kicker>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          End this section?
        </h1>
        <p className="mt-2 text-muted-foreground">
          {unanswered > 0
            ? `You have ${unanswered} unanswered question${unanswered === 1 ? "" : "s"} in this section. On the real exam you can't return to a section once you leave it.`
            : "You've answered every question in this section. On the real exam you can't return to a section once you leave it."}
        </p>
        <div className="mt-7 flex w-full flex-col gap-2 sm:flex-row sm:justify-center">
          <Button variant="outline" onClick={() => setConfirming(false)}>
            Keep reviewing
          </Button>
          <Button onClick={advanceSegment}>
            {isLastSegment ? "Submit mock" : "End section"}
          </Button>
        </div>
      </div>
    );
  }

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
          <Kicker className="truncate">Mock · {section.label}</Kicker>
          <p className="font-mono text-sm tabular-nums">
            {qIdx + 1}{" "}
            <span className="text-muted-foreground">
              / {section.questions.length}
            </span>
          </p>
        </div>
        <ExamTimer
          key={`sec-${segIdx}`}
          durationSec={section.minutes * 60}
          onExpire={advanceSegment}
          prominent
        />
        <div className="flex items-center gap-1">
          {q.section === "MATH" && <QuizCalculator />}
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
        </div>
      </div>

      <Progress
        value={((qIdx + 1) / section.questions.length) * 100}
        size="sm"
        className="mt-3"
        aria-label={`Question ${qIdx + 1} of ${section.questions.length}`}
      />

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
          <Button variant="outline" onClick={goPrevQ} disabled={qIdx === 0}>
            <ChevronLeft />
            Back
          </Button>
          <p className="font-mono text-xs text-muted-foreground tabular-nums">
            {answeredInSection}/{section.questions.length}
          </p>
          {isLastQ ? (
            <Button onClick={() => setConfirming(true)}>
              {isLastSegment ? "Finish" : "Finish section"}
            </Button>
          ) : (
            <Button onClick={goNextQ}>
              Next
              <ChevronRight />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
