"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ClipboardCheck, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { QuizRunner } from "@/components/quiz/quiz-runner";
import type { Answer, ClientQuestion } from "@/lib/quiz/types";

type Phase = "intro" | "loading" | "running" | "submitting";

export function DiagnosticFlow({
  hasNurseHub = false,
}: {
  /** true when the user has imported NurseHub questions (the certified base) */
  hasNurseHub?: boolean;
}) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("intro");
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [variant, setVariant] = useState<"nursehub" | "seed">("seed");
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
      setVariant(data.variant === "nursehub" ? "nursehub" : "seed");
      setQuestions(data.questions);
      setPhase("running");
    } catch {
      setError("Could not start the diagnostic. Please try again.");
      setPhase("intro");
    }
  }

  async function submit(
    answers: Record<string, Answer>,
    flagged: string[],
    confidence: Record<string, number>,
  ) {
    if (!attemptId) return;
    setPhase("submitting");
    try {
      const res = await fetch(`/api/attempts/${attemptId}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, flagged, confidence }),
      });
      if (!res.ok) throw new Error();
      // The certified NurseHub run lands on the per-skill score sheet; the
      // balanced fallback uses the standard results breakdown.
      router.push(
        variant === "nursehub"
          ? `/nursehub/results/${attemptId}`
          : `/diagnostic/results/${attemptId}`,
      );
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

  const points = hasNurseHub
    ? [
        "Real, certified NurseHub questions across all four sections",
        "Rate how sure you are, so a lucky guess won't hide a weak spot",
        "You'll get a per-skill score sheet that builds your plan",
      ]
    : [
        "Reading, Math, Science, and English",
        "Rate your confidence so guesses don't inflate your baseline",
        "You'll see a full breakdown when you finish",
      ];

  return (
    <div className="mx-auto max-w-xl px-4 py-12 sm:py-16">
      <ClipboardCheck className="size-7 text-primary" />
      <h1 className="mt-4 text-2xl font-semibold tracking-tight">
        Your diagnostic
      </h1>
      <p className="mt-3 text-muted-foreground">
        {hasNurseHub
          ? "The real NurseHub practice questions you imported, across all four TEAS sections. There's no timer, and your results set the baseline for your study plan. Mark how sure you are on each one, and flag anything you want to revisit."
          : "A short, balanced set of questions across all four TEAS sections. Answer as many as you can. There's no timer, and your score sets the baseline for your study plan. Mark how sure you are on each one, and flag anything you're unsure about."}
      </p>
      <ul className="mt-6 space-y-2.5 text-sm text-muted-foreground">
        {points.map((item) => (
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
