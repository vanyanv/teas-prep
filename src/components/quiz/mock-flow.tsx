"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Timer } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MockRunner } from "@/components/quiz/mock-runner";
import { TOTAL_MINUTES } from "@/lib/teas-blueprint";
import type { Answer } from "@/lib/quiz/types";
import type { MockSection } from "@/lib/quiz/attempt";

type Phase = "intro" | "loading" | "running" | "submitting";

export function MockFlow() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("intro");
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [sections, setSections] = useState<MockSection[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function begin() {
    setPhase("loading");
    setError(null);
    try {
      const res = await fetch("/api/mock/start", { method: "POST" });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setAttemptId(data.attemptId);
      setSections(data.sections);
      setPhase("running");
    } catch {
      setError("Could not start the mock exam. Please try again.");
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
      router.push(`/results/${attemptId}`);
    } catch {
      setError("Could not submit. Please try again.");
      setPhase("running");
    }
  }

  if (phase === "running") {
    return <MockRunner sections={sections} onSubmit={submit} />;
  }

  if (phase === "submitting") {
    return (
      <div className="flex min-h-[60dvh] flex-col items-center justify-center gap-3">
        <Loader2 className="size-6 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Scoring your mock exam…</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12 sm:py-16">
      <Timer className="size-7 text-primary" />
      <h1 className="mt-4 text-2xl font-semibold tracking-tight">
        Full mock exam
      </h1>
      <p className="mt-3 text-muted-foreground">
        A timed run that mirrors the real ATI TEAS 7: Reading, Math, a 10-minute
        break, Science, then English. Each section is timed separately and
        submits automatically when time runs out. Treat it like the real thing.
      </p>
      <ul className="mt-6 space-y-2.5 text-sm text-muted-foreground">
        {[
          "Sections run in the official order with their own timers",
          "A 10-minute break after Math, just like test day",
          `Full pace is about ${TOTAL_MINUTES} minutes for the complete exam`,
        ].map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-primary/70" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
      <Button className="mt-8" size="lg" onClick={begin} disabled={phase === "loading"}>
        {phase === "loading" ? (
          <>
            <Loader2 className="animate-spin" />
            Preparing…
          </>
        ) : (
          "Start mock exam"
        )}
      </Button>
    </div>
  );
}
