"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dumbbell, Loader2 } from "lucide-react";

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
}: {
  initialSection?: string;
  initialTopic?: string;
  initialSubtopic?: string;
}) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("setup");
  const [section, setSection] = useState<string>(initialSection);
  const [topic, setTopic] = useState<string>(initialTopic);
  const [subtopic, setSubtopic] = useState<string>(initialSubtopic);
  const [difficulty, setDifficulty] = useState<string>("");
  const [count, setCount] = useState(10);
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<ClientQuestion[]>([]);
  const [error, setError] = useState<string | null>(null);

  const topics = section ? BLUEPRINT[section as Section].topics : [];
  const skills = section && topic ? getSkills(section, topic) : [];

  async function begin() {
    setPhase("loading");
    setError(null);
    try {
      const res = await fetch("/api/practice/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section: section || undefined,
          topic: topic || undefined,
          subtopic: subtopic || undefined,
          difficulty: difficulty ? Number(difficulty) : undefined,
          count,
        }),
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
        title="Practice"
        submitLabel="Finish & review"
        onSubmit={submit}
      />
    );
  }

  if (phase === "submitting") {
    return (
      <div className="flex min-h-[60dvh] flex-col items-center justify-center gap-3">
        <Loader2 className="size-6 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Scoring…</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-10 sm:py-14">
      <Dumbbell className="size-7 text-primary" />
      <h1 className="mt-4 text-2xl font-semibold tracking-tight">Practice</h1>
      <p className="mt-2 text-muted-foreground">
        Target a section, topic, or difficulty. Build the muscle where it counts.
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        New to a topic?{" "}
        <Link href="/learn" className="font-medium text-primary hover:underline">
          Read the lesson first
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
        <Button onClick={begin} disabled={phase === "loading"} className="w-full sm:w-auto">
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
