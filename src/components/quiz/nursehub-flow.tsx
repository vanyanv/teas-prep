"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ClipboardList, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { QuizRunner } from "@/components/quiz/quiz-runner";
import type { Answer, ClientQuestion } from "@/lib/quiz/types";

type Phase = "intro" | "loading" | "running" | "submitting";

export function NurseHubFlow() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("intro");
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<ClientQuestion[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function begin() {
    setPhase("loading");
    setError(null);
    try {
      const res = await fetch("/api/nursehub/start", { method: "POST" });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error ?? "Could not start.");
      }
      const data = await res.json();
      setAttemptId(data.attemptId);
      setQuestions(data.questions);
      setPhase("running");
    } catch (e) {
      setError((e as Error).message);
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
      router.push(`/nursehub/results/${attemptId}`);
    } catch {
      setError("Could not submit. Please try again.");
      setPhase("running");
    }
  }

  if (phase === "running") {
    return (
      <QuizRunner
        questions={questions}
        title="NurseHub diagnostic"
        submitLabel="See my score sheet"
        onSubmit={submit}
      />
    );
  }

  if (phase === "submitting") {
    return (
      <div className="flex min-h-[60dvh] flex-col items-center justify-center gap-3">
        <Loader2 className="size-6 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Building your score sheet…</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12 sm:py-16">
      <ClipboardList className="size-7 text-primary" />
      <h1 className="mt-4 text-2xl font-semibold tracking-tight">
        NurseHub diagnostic
      </h1>
      <p className="mt-3 text-muted-foreground">
        The real NurseHub practice questions you imported, across Math, Science,
        and English. When you finish, you get a score sheet that maps every
        question to a specific skill, so you know exactly which lessons to study.
      </p>
      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
      <Button className="mt-8" size="lg" onClick={begin} disabled={phase === "loading"}>
        {phase === "loading" ? (
          <>
            <Loader2 className="animate-spin" />
            Preparing…
          </>
        ) : (
          "Start NurseHub diagnostic"
        )}
      </Button>
    </div>
  );
}
