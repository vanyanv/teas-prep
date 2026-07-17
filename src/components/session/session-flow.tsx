"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, BookOpen, ClipboardCheck, Loader2, RotateCcw, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LessonBlocks } from "@/components/learn/guided/lesson-blocks";
import { SessionRunner } from "@/components/session/session-runner";
import { useEnterFocusMode } from "@/components/focus-mode";
import { estimateSessionMinutes } from "@/lib/study/estimate";
import type { AnswerFeedback } from "@/lib/quiz/attempt";
import type { Answer, ClientQuestion } from "@/lib/quiz/types";
import type { GuidedLesson } from "@/content/guided-lesson-types";
import { PageContainer, Kicker } from "@/components/ui/page";

type Phase = "loading" | "empty" | "intro" | "lesson" | "questions" | "finishing" | "done";

interface SessionData {
  attemptId: string;
  questions: ClientQuestion[];
  whyLine: string;
  reviewCount: number;
  lesson: GuidedLesson | null;
  focus: { section: string; topic: string; label: string };
}

export function SessionFlow() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("loading");
  const [data, setData] = useState<SessionData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [emptyReason, setEmptyReason] = useState<"no-data" | "caught-up">(
    "no-data",
  );
  const [correct, setCorrect] = useState(0);
  const [scorePct, setScorePct] = useState<number | null>(null);

  const startedRef = useRef(false);
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    fetch("/api/session/start", { method: "POST" })
      .then(async (res) => {
        if (res.status === 422) {
          const body = (await res.json().catch(() => ({}))) as {
            reason?: "no-data" | "caught-up";
            error?: string;
          };
          if (body.reason === "caught-up") setEmptyReason("caught-up");
          if (body.error) setError(body.error);
          setPhase("empty");
          return;
        }
        if (!res.ok) throw new Error();
        const d = (await res.json()) as SessionData;
        setData(d);
        setPhase("intro");
      })
      .catch(() => {
        setError("Could not build today's session. Please try again.");
        setPhase("empty");
      });
  }, []);

  async function onAnswer(
    questionId: string,
    answer: Answer,
    confidence: number | null,
    timeMs: number,
  ): Promise<AnswerFeedback> {
    const res = await fetch(`/api/attempts/${data!.attemptId}/answer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionId, answer, confidence, timeMs }),
    });
    if (!res.ok) throw new Error();
    return (await res.json()) as AnswerFeedback;
  }

  async function onDone(correctCount: number) {
    setCorrect(correctCount);
    setPhase("finishing");
    try {
      const res = await fetch(`/api/attempts/${data!.attemptId}/finish`, {
        method: "POST",
      });
      if (res.ok) {
        const r = (await res.json()) as { scorePct: number };
        setScorePct(r.scorePct);
      }
    } catch {
      // The per-question answers are already saved; the summary still shows.
    }
    setPhase("done");
    router.refresh();
  }

  if (phase === "loading" || phase === "finishing") {
    return (
      <Centered>
        <Loader2 className="size-6 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">
          {phase === "loading" ? "Building today's session…" : "Wrapping up…"}
        </p>
      </Centered>
    );
  }

  if (phase === "empty" || !data) {
    const caughtUp = emptyReason === "caught-up";
    return (
      <PageContainer width="narrow">
        <ClipboardCheck className="size-7 text-primary" />
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">
          {caughtUp ? "You're caught up for now" : "Your session starts with a baseline"}
        </h1>
        <p className="mt-3 text-muted-foreground">
          {error ??
            "Take the diagnostic first. It finds your weak spots so each session knows exactly what to work on."}
        </p>
        <Button asChild className="mt-8" size="lg">
          <Link href={caughtUp ? "/practice" : "/diagnostic"}>
            {caughtUp ? "Go to practice" : "Take the diagnostic"}
            <ArrowRight />
          </Link>
        </Button>
      </PageContainer>
    );
  }

  if (phase === "intro") {
    const minutes = estimateSessionMinutes(
      data.questions.length,
      data.lesson?.minutes[0] ?? null,
    );
    return (
      <PageContainer width="narrow">
        <Sparkles className="size-7 text-primary" />
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">
          Today&apos;s session
        </h1>
        <p className="mt-3 text-muted-foreground">{data.whyLine}</p>
        <ul className="mt-6 space-y-2.5 text-sm text-muted-foreground">
          {data.reviewCount > 0 && (
            <li className="flex items-center gap-2.5">
              <RotateCcw className="size-4 shrink-0 text-primary/70" />
              {data.reviewCount} review question{data.reviewCount === 1 ? "" : "s"} you
              missed or were unsure about
            </li>
          )}
          {data.lesson && (
            <li className="flex items-center gap-2.5">
              <BookOpen className="size-4 shrink-0 text-primary/70" />
              Short lesson: {data.lesson.skill}
            </li>
          )}
          <li className="flex items-center gap-2.5">
            <ClipboardCheck className="size-4 shrink-0 text-primary/70" />
            {data.questions.length - data.reviewCount} targeted {data.focus.label}{" "}
            questions
          </li>
        </ul>
        <Kicker className="mt-4">~{minutes} min</Kicker>
        <Button
          className="mt-8"
          size="lg"
          onClick={() => setPhase(data.lesson ? "lesson" : "questions")}
        >
          Start
          <ArrowRight />
        </Button>
      </PageContainer>
    );
  }

  if (phase === "lesson" && data.lesson) {
    return (
      <LessonStep
        lesson={data.lesson}
        focusLabel={data.focus.label}
        onContinue={() => setPhase("questions")}
      />
    );
  }

  if (phase === "questions") {
    return (
      <SessionRunner questions={data.questions} onAnswer={onAnswer} onDone={onDone} />
    );
  }

  // done
  return (
    <PageContainer width="narrow" className="text-center">
      <h1 className="text-2xl font-semibold tracking-tight">Session complete</h1>
      <p className="mt-3 text-muted-foreground">
        {correct} of {data.questions.length} correct
        {scorePct != null ? ` (${Math.round(scorePct)}%)` : ""}. Every answer updates
        your mastery and review schedule, and tomorrow&apos;s session builds on it.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Button asChild size="lg">
          <Link href="/today">Back to Today</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href={`/results/${data.attemptId}`}>Review this session</Link>
        </Button>
      </div>
    </PageContainer>
  );
}

/**
 * The session's focus lesson: the same guided content and voice as Learn, read
 * straight through rather than one section at a time. The quick checks are
 * dropped on purpose, because the session's own questions do that job next.
 */
function LessonStep({
  lesson,
  focusLabel,
  onContinue,
}: {
  lesson: GuidedLesson;
  focusLabel: string;
  onContinue: () => void;
}) {
  useEnterFocusMode();
  return (
    <PageContainer width="narrow" className="pb-28">
      <Kicker>Lesson · {focusLabel}</Kicker>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">{lesson.skill}</h1>
      <p className="mt-3 text-muted-foreground">{lesson.summary}</p>
      <div className="mt-8 space-y-10">
        {lesson.sections.map((s) => (
          <section key={s.id} aria-labelledby={`session-lesson-${s.id}`}>
            <h2
              id={`session-lesson-${s.id}`}
              className="text-base font-semibold tracking-tight"
            >
              {s.title}
            </h2>
            <div className="mt-4 space-y-6">
              <LessonBlocks blocks={s.blocks} />
            </div>
          </section>
        ))}
      </div>
      <div className="fixed inset-x-0 bottom-0 border-t bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-end px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <Button className="w-full sm:w-auto" onClick={onContinue}>
            Continue to questions
            <ArrowRight />
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[60dvh] flex-col items-center justify-center gap-3">
      {children}
    </div>
  );
}
