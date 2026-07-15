"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, BookOpen, ClipboardCheck, Loader2, RotateCcw, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LessonContent } from "@/components/learn/lesson-content";
import { SessionRunner } from "@/components/session/session-runner";
import { estimateSessionMinutes } from "@/lib/study/estimate";
import type { AnswerFeedback } from "@/lib/quiz/attempt";
import type { Answer, ClientQuestion } from "@/lib/quiz/types";
import type { SkillLesson } from "@/content/skill-lesson-types";

type Phase = "loading" | "empty" | "intro" | "lesson" | "questions" | "finishing" | "done";

interface SessionData {
  attemptId: string;
  questions: ClientQuestion[];
  whyLine: string;
  reviewCount: number;
  lesson: SkillLesson | null;
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
      <div className="mx-auto max-w-xl px-4 py-12 sm:py-16">
        <ClipboardCheck className="size-7 text-primary" />
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">
          {caughtUp ? "You're caught up for now" : "Your session starts with a baseline"}
        </h1>
        <p className="mt-3 text-muted-foreground">
          {error ??
            "Take the diagnostic first — it finds your weak spots so each session knows exactly what to work on."}
        </p>
        <Button asChild className="mt-8" size="lg">
          <Link href={caughtUp ? "/practice" : "/diagnostic"}>
            {caughtUp ? "Go to practice" : "Take the diagnostic"}
            <ArrowRight />
          </Link>
        </Button>
      </div>
    );
  }

  if (phase === "intro") {
    const minutes = estimateSessionMinutes(data.questions.length, data.lesson != null);
    return (
      <div className="mx-auto max-w-xl px-4 py-12 sm:py-16">
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
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          ~{minutes} min
        </p>
        <Button
          className="mt-8"
          size="lg"
          onClick={() => setPhase(data.lesson ? "lesson" : "questions")}
        >
          Start
          <ArrowRight />
        </Button>
      </div>
    );
  }

  if (phase === "lesson" && data.lesson) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Lesson · {data.focus.label}
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          {data.lesson.skill}
        </h1>
        <p className="mt-3 text-muted-foreground">{data.lesson.summary}</p>
        <LessonContent sections={data.lesson.blocks} />
        <div className="sticky bottom-20 mt-10 sm:bottom-4">
          <Button size="lg" className="w-full" onClick={() => setPhase("questions")}>
            Continue to questions
            <ArrowRight />
          </Button>
        </div>
      </div>
    );
  }

  if (phase === "questions") {
    return (
      <SessionRunner questions={data.questions} onAnswer={onAnswer} onDone={onDone} />
    );
  }

  // done
  return (
    <div className="mx-auto max-w-xl px-4 py-12 text-center sm:py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Session complete</h1>
      <p className="mt-3 text-muted-foreground">
        {correct} of {data.questions.length} correct
        {scorePct != null ? ` (${Math.round(scorePct)}%)` : ""}. Every answer updates
        your mastery and review schedule — tomorrow&apos;s session builds on it.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Button asChild size="lg">
          <Link href="/">Back to Today</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href={`/results/${data.attemptId}`}>Review this session</Link>
        </Button>
      </div>
    </div>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[60dvh] flex-col items-center justify-center gap-3">
      {children}
    </div>
  );
}
