"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { QuizRunner } from "@/components/quiz/quiz-runner";
import { BLUEPRINT, SECTIONS, type Section } from "@/lib/teas-blueprint";
import { getSkills } from "@/content/skills";
import type { Answer, ClientQuestion } from "@/lib/quiz/types";
import { cn } from "@/lib/utils";

type Phase = "setup" | "loading" | "running" | "submitting";

const selectClass =
  "h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40";

export function PracticeFlow({
  initialSection = "",
  initialTopic = "",
  initialSubtopic = "",
  initialDifficulty = "",
  initialCount = 10,
  initialMode = "filter",
  autoStart = false,
}: {
  initialSection?: string;
  initialTopic?: string;
  initialSubtopic?: string;
  initialDifficulty?: string;
  initialCount?: number;
  initialMode?: "filter" | "review";
  /** begin the filtered set immediately (deep links from the practice menu) */
  autoStart?: boolean;
}) {
  const router = useRouter();
  const isReview = initialMode === "review";
  const [phase, setPhase] = useState<Phase>(
    isReview || autoStart ? "loading" : "setup",
  );
  const [section, setSection] = useState<string>(initialSection);
  const [topic, setTopic] = useState<string>(initialTopic);
  const [subtopic, setSubtopic] = useState<string>(initialSubtopic);
  const [difficulty, setDifficulty] = useState<string>(initialDifficulty);
  const [count, setCount] = useState(initialCount);
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<ClientQuestion[]>([]);
  const [error, setError] = useState<string | null>(null);

  const topics = section ? BLUEPRINT[section as Section].topics : [];
  const skills = section && topic ? getSkills(section, topic) : [];

  async function begin(reviewMode = false) {
    setPhase("loading");
    setError(null);
    try {
      const res = await fetch("/api/practice/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          reviewMode
            ? { mode: "review" }
            : {
                section: section || undefined,
                topic: topic || undefined,
                subtopic: subtopic || undefined,
                difficulty: difficulty ? Number(difficulty) : undefined,
                count,
              },
        ),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Could not start practice.");
      }
      const data = await res.json();
      setAttemptId(data.attemptId);
      setQuestions(data.questions);
      setPhase("running");
    } catch (e) {
      setError((e as Error).message);
      setPhase("setup");
    }
  }

  // Auto-start on arrival: the review queue (?mode=review) or a menu deep
  // link (?start=1) skips the setup form entirely.
  const startedAuto = useRef(false);
  useEffect(() => {
    if ((isReview || autoStart) && !startedAuto.current) {
      startedAuto.current = true;
      void begin(isReview);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReview, autoStart]);

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
      <QuizRunner
        questions={questions}
        title={isReview ? "Review" : "Practice"}
        submitLabel="Finish & review"
        onSubmit={submit}
      />
    );
  }

  if (phase === "submitting" || ((isReview || autoStart) && phase === "loading")) {
    return (
      <div className="flex min-h-[60dvh] flex-col items-center justify-center gap-3">
        <Loader2 className="size-6 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">
          {phase === "submitting" ? "Scoring…" : "Preparing your questions…"}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:py-12">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
        Practice
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
        Build a custom set
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Target a section, topic, skill, or difficulty.{" "}
        <Link href="/learn" className="font-medium text-primary hover:underline">
          New to a topic? Read the lesson first.
        </Link>
      </p>

      <div className="mt-6 grid gap-5 rounded-xl border bg-card p-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="section">Section</Label>
            <select
              id="section"
              className={selectClass}
              value={section}
              onChange={(e) => {
                setSection(e.target.value);
                setTopic("");
                setSubtopic("");
              }}
            >
              <option value="">All sections</option>
              {SECTIONS.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="topic">Topic</Label>
            <select
              id="topic"
              className={cn(selectClass, !section && "opacity-50")}
              value={topic}
              disabled={!section}
              onChange={(e) => {
                setTopic(e.target.value);
                setSubtopic("");
              }}
            >
              <option value="">All topics</option>
              {topics.map((t) => (
                <option key={t.key} value={t.key}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="skill">Skill</Label>
            <select
              id="skill"
              className={cn(selectClass, !topic && "opacity-50")}
              value={subtopic}
              disabled={!topic}
              onChange={(e) => setSubtopic(e.target.value)}
            >
              <option value="">All skills in this topic</option>
              {skills.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="difficulty">Difficulty</Label>
            <select
              id="difficulty"
              className={selectClass}
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="">Any</option>
              <option value="1">Easy</option>
              <option value="2">Medium</option>
              <option value="3">Hard</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="count">Questions</Label>
            <select
              id="count"
              className={selectClass}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
            >
              {[5, 10, 15, 20].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button onClick={() => begin()} disabled={phase === "loading"} className="w-full sm:w-auto">
          {phase === "loading" ? (
            <>
              <Loader2 className="animate-spin" />
              Preparing…
            </>
          ) : (
            "Start practice"
          )}
        </Button>
      </div>
    </div>
  );
}
