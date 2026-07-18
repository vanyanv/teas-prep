"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ClipboardCheck, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { QuizRunner } from "@/components/quiz/quiz-runner";
import type { Answer, ClientQuestion } from "@/lib/quiz/types";
import { PageContainer } from "@/components/ui/page";

type Phase = "intro" | "loading" | "running" | "submitting";

export function DiagnosticFlow({
  slug,
  label,
}: {
  /** section url slug, e.g. "reading" — sent to the start API */
  slug: string;
  /** human section label, e.g. "Reading" */
  label: string;
}) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("intro");
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<ClientQuestion[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function begin() {
    setPhase("loading");
    setError(null);
    try {
      const res = await fetch("/api/diagnostic/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: slug }),
      });
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
        title={`${label} diagnostic`}
        submitLabel="See my results"
        onSubmit={submit}
      />
    );
  }

  if (phase === "submitting") {
    return (
      <Centered>
        <Loader2 className="size-6 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Scoring your {label} diagnostic…</p>
      </Centered>
    );
  }

  const points = [
    `${label} only, weighted like the real exam's topic mix`,
    "Rate how sure you are, so a lucky guess won't hide a weak spot",
    "Your results update your mastery map and study plan right away",
  ];

  return (
    <PageContainer width="narrow">
      <ClipboardCheck className="size-7 text-primary" />
      <h1 className="mt-4 text-2xl font-semibold tracking-tight">
        {label} diagnostic
      </h1>
      <p className="mt-3 text-muted-foreground">
        35 questions covering every {label} topic on the TEAS. There&apos;s no
        timer — answer as many as you can, mark how sure you are on each one,
        and flag anything you want to revisit.
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
          `Begin ${label} diagnostic`
        )}
      </Button>
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
