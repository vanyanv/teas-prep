"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Timer } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MockRunner } from "@/components/quiz/mock-runner";
import { TOTAL_MINUTES } from "@/lib/teas-blueprint";
import type { Answer } from "@/lib/quiz/types";
import type { MockSection, ResumableMock } from "@/lib/quiz/attempt";
import { PageContainer } from "@/components/ui/page";

type Phase = "intro" | "loading" | "running" | "submitting";

export function MockFlow({ resume }: { resume?: ResumableMock | null }) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("intro");
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [sections, setSections] = useState<MockSection[]>([]);
  const [initial, setInitial] = useState<Pick<ResumableMock, "answers" | "confidence" | "flagged">>({
    answers: {},
    confidence: {},
    flagged: [],
  });
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
      setInitial({ answers: {}, confidence: {}, flagged: [] });
      setPhase("running");
    } catch {
      setError("Could not start the mock exam. Please try again.");
      setPhase("intro");
    }
  }

  function continueResume() {
    if (!resume) return;
    setAttemptId(resume.attemptId);
    setSections(resume.sections);
    setInitial({ answers: resume.answers, confidence: resume.confidence, flagged: resume.flagged });
    setPhase("running");
  }

  async function startOver() {
    if (resume) {
      await fetch(`/api/mock/${resume.attemptId}`, { method: "DELETE" }).catch(() => {});
    }
    await begin();
  }

  // Autosave: persist one field of one answer, best-effort.
  function persist(
    questionId: string,
    patch: { answer?: Answer; confidence?: number; flagged?: boolean },
  ) {
    if (!attemptId) return;
    void fetch(`/api/attempts/${attemptId}/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionId, ...patch }),
      keepalive: true,
    }).catch(() => {});
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
      router.push(`/results/${attemptId}`);
    } catch {
      setError("Could not submit. Please try again.");
      setPhase("running");
    }
  }

  if (phase === "running") {
    return (
      <MockRunner
        sections={sections}
        onSubmit={submit}
        onPersist={persist}
        initialAnswers={initial.answers}
        initialConfidence={initial.confidence}
        initialFlagged={initial.flagged}
      />
    );
  }

  if (phase === "submitting") {
    return (
      <div className="flex min-h-[60dvh] flex-col items-center justify-center gap-3">
        <Loader2 className="size-6 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Scoring your mock exam…</p>
      </div>
    );
  }

  const answeredCount = resume ? Object.keys(resume.answers).length : 0;

  return (
    <PageContainer width="narrow">
      <Timer className="size-7 text-primary" />
      <h1 className="mt-4 text-2xl font-semibold tracking-tight">Full mock exam</h1>

      {resume ? (
        <>
          <p className="mt-3 text-muted-foreground">
            You have a mock in progress with{" "}
            <span className="font-medium text-foreground">{answeredCount} answered</span>. Pick up
            where you left off, or start a fresh one. Section timers restart on resume.
          </p>
          {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
          <div className="mt-8 flex flex-col gap-2 sm:flex-row">
            <Button size="lg" onClick={continueResume}>
              Resume mock
            </Button>
            <Button size="lg" variant="outline" onClick={startOver} disabled={phase === "loading"}>
              {phase === "loading" ? (
                <>
                  <Loader2 className="animate-spin" />
                  Preparing…
                </>
              ) : (
                "Start a fresh mock"
              )}
            </Button>
          </div>
        </>
      ) : (
        <>
          <p className="mt-3 text-muted-foreground">
            A timed run that mirrors the real ATI TEAS 7: Reading, Math, a 10-minute break, Science,
            then English. Each section is timed separately and submits automatically when time runs
            out. Your answers save as you go, so an interruption won&apos;t lose your work.
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
        </>
      )}
    </PageContainer>
  );
}
