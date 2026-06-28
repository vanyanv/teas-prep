"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ClipboardCheck, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { QuizRunner } from "@/components/quiz/quiz-runner";
import type { Answer, ClientQuestion } from "@/lib/quiz/types";

type Phase = "intro" | "loading" | "running" | "submitting";

export function DiagnosticFlow() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("intro");
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<ClientQuestion[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function begin() {
    setPhase("loading");
    setError(null);
    try {
      const res = await fetch("/api/diagnostic/start", { method: "POST" });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setAttemptId(data.attemptId);
      setQuestions(data.questions);
      setPhase("running");
    } catch {
      setError("Could not start the diagnostic. Please try again.");
      setPhase("intro");
    }
  }

  async function submit(answers: Record<string, Answer>, flagged: string[]) {
    if (!attemptId) return;
    setPhase("submitting");
    try {
      const res = await fetch(`/api/attempts/${attemptId}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, flagged }),
      });
      if (!res.ok) throw new Error();
      router.push(`/diagnostic/results/${attemptId}`);
    } catch {
      setError("Could not submit. Please try again.");
      setPhase("running");
    }
  }

  if (phase === "running") {
    return (
      <QuizRunner
        questions={questions}
        title="Diagnostic"
        submitLabel="See my results"
        onSubmit={submit}
      />
    );
  }

  if (phase === "submitting") {
    return (
      <Centered>
        <Loader2 className="size-6 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Scoring your diagnostic…</p>
      </Centered>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12 sm:py-16">
      <ClipboardCheck className="size-7 text-primary" />
      <h1 className="mt-4 text-2xl font-semibold tracking-tight">
        Your diagnostic
      </h1>
      <p className="mt-3 text-muted-foreground">
        A short, balanced set of questions across all four TEAS sections. Answer
        as many as you can. There&apos;s no timer, and your score sets the
        baseline for your study plan. You can flag anything you&apos;re unsure
        about.
      </p>
      <ul className="mt-6 space-y-2.5 text-sm text-muted-foreground">
        {[
          "Reading, Math, Science, and English",
          "Honest effort gives the most useful plan",
          "You'll see a full breakdown when you finish",
        ].map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-primary/70" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
      <Button
        className="mt-8"
        size="lg"
        onClick={begin}
        disabled={phase === "loading"}
      >
        {phase === "loading" ? (
          <>
            <Loader2 className="animate-spin" />
            Preparing…
          </>
        ) : (
          "Begin diagnostic"
        )}
      </Button>
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
