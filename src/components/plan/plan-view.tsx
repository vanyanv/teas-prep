"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Kicker } from "@/components/ui/page";
import { PlanSetup } from "@/components/plan/plan-setup";
import { currentPlanWeekIndex } from "@/lib/plan/week-strip";
import { cn } from "@/lib/utils";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type Task = {
  id: string;
  dayOfWeek: number;
  kind: string;
  section: string | null;
  topic: string | null;
  label: string;
  targetCount: number | null;
  durationMin: number | null;
  done: boolean;
};
type Week = { id: string; weekIndex: number; focus: string | null; tasks: Task[] };
type Plan = {
  id: string;
  testDate: string | Date;
  hoursPerWeek: number;
  createdAt: string | Date;
  weeks: Week[];
};

const KIND_STYLE: Record<string, string> = {
  STUDY: "bg-primary/10 text-primary",
  DRILL: "bg-accent text-accent-foreground",
  FLASHCARD: "bg-secondary text-secondary-foreground",
  TEST: "bg-warning/15 text-warning",
  REVIEW: "bg-muted text-muted-foreground",
};

function taskHref(t: Task): string | null {
  if (t.kind === "DRILL")
    return `/practice?section=${t.section ?? ""}&topic=${t.topic ?? ""}`;
  if (t.kind === "FLASHCARD") return "/flashcards";
  if (t.kind === "TEST") return "/mock";
  if (t.kind === "REVIEW") return "/practice?mode=review";
  if (t.kind === "STUDY" && t.section && t.topic)
    return `/learn/${t.section}/${t.topic}`;
  return null;
}

export function PlanView({ plan }: { plan: Plan }) {
  const [tasks, setTasks] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      plan.weeks.flatMap((w) => w.tasks.map((t) => [t.id, t.done])),
    ),
  );
  const [rebuilding, setRebuilding] = useState(false);

  const { total, done } = useMemo(() => {
    const ids = Object.keys(tasks);
    return { total: ids.length, done: ids.filter((id) => tasks[id]).length };
  }, [tasks]);

  async function toggle(id: string) {
    const next = !tasks[id];
    setTasks((p) => ({ ...p, [id]: next })); // optimistic
    try {
      await fetch(`/api/plan/task/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done: next }),
      });
    } catch {
      setTasks((p) => ({ ...p, [id]: !next })); // revert
    }
  }

  const testDate = new Date(plan.testDate);
  const pct = total ? Math.round((done / total) * 100) : 0;
  const currentIndex = currentPlanWeekIndex(
    new Date(plan.createdAt),
    plan.weeks.length,
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Kicker>Study plan</Kicker>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            {plan.weeks.length} weeks to test day
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Target: {testDate.toLocaleDateString(undefined, { dateStyle: "medium" })}
            {" · "}
            {plan.hoursPerWeek} hrs/week
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setRebuilding((v) => !v)}>
          <RefreshCw />
          Rebuild
        </Button>
      </div>

      {rebuilding && (
        <div className="mt-4">
          <PlanSetup onDone={() => setRebuilding(false)} />
        </div>
      )}

      {/* Overall progress */}
      <div className="mt-5 flex items-center gap-3">
        <Progress value={pct} className="flex-1" />
        <span className="font-mono text-xs text-muted-foreground tabular-nums">
          {done}/{total}
        </span>
      </div>

      {/* Weeks: current week open and labeled; the rest fold away. */}
      <div className="mt-8 space-y-4">
        {plan.weeks.map((week) => {
          const isCurrent = week.weekIndex === currentIndex;
          const isPast = week.weekIndex < currentIndex;
          const weekDone = week.tasks.filter((t) => tasks[t.id]).length;

          const heading = (
            <div className="flex min-w-0 flex-1 items-baseline justify-between gap-3">
              <span className="flex min-w-0 items-baseline gap-2.5">
                <span className="text-base font-semibold">
                  Week {week.weekIndex + 1}
                </span>
                {isCurrent && (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                    This week
                  </span>
                )}
                {week.focus && (
                  <span className="hidden truncate text-sm text-muted-foreground sm:inline">
                    {week.focus}
                  </span>
                )}
              </span>
              <span className="shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
                {weekDone}/{week.tasks.length}
              </span>
            </div>
          );

          const taskList = (
            <ul className="mt-3 divide-y rounded-xl border bg-card">
              {week.tasks.map((t) => {
                const isDone = tasks[t.id];
                const href = taskHref(t);
                return (
                  <li
                    key={t.id}
                    className={cn(
                      "flex items-center gap-3 p-3 transition-opacity",
                      isDone && "opacity-60",
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => toggle(t.id)}
                      aria-pressed={isDone}
                      aria-label={isDone ? "Mark not done" : "Mark done"}
                      className={cn(
                        "flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40",
                        isDone
                          ? "border-primary bg-primary text-primary-foreground"
                          : "hover:border-primary",
                      )}
                    >
                      {isDone && <Check className="size-3.5" />}
                    </button>

                    <span
                      className={cn(
                        "shrink-0 rounded px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide",
                        KIND_STYLE[t.kind] ?? "bg-muted",
                      )}
                    >
                      {t.kind}
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className={cn("truncate text-sm", isDone && "line-through")}>
                        {href ? (
                          <Link href={href} className="hover:underline">
                            {t.label}
                          </Link>
                        ) : (
                          t.label
                        )}
                      </p>
                    </div>

                    <span className="shrink-0 font-mono text-[11px] text-muted-foreground tabular-nums">
                      {DAYS[t.dayOfWeek]}
                      {t.durationMin ? ` · ${t.durationMin}m` : ""}
                    </span>
                  </li>
                );
              })}
            </ul>
          );

          if (isCurrent) {
            return (
              <section key={week.id} aria-label={`Week ${week.weekIndex + 1}`}>
                {heading}
                {week.focus && (
                  <p className="mt-0.5 text-sm text-muted-foreground sm:hidden">
                    {week.focus}
                  </p>
                )}
                {taskList}
              </section>
            );
          }

          return (
            <details key={week.id} className="group">
              <summary
                className={cn(
                  "flex cursor-pointer list-none items-center gap-2 rounded-md py-1 outline-none",
                  "focus-visible:ring-[3px] focus-visible:ring-ring/40 [&::-webkit-details-marker]:hidden",
                  isPast && "opacity-70",
                )}
              >
                <ChevronDown
                  className="size-4 shrink-0 -rotate-90 text-muted-foreground transition-transform group-open:rotate-0"
                  aria-hidden
                />
                {heading}
              </summary>
              {taskList}
            </details>
          );
        })}
      </div>
    </div>
  );
}
