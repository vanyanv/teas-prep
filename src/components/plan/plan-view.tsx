"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PlanSetup } from "@/components/plan/plan-setup";
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
  if (t.kind === "STUDY") return `/practice?section=${t.section ?? ""}&topic=${t.topic ?? ""}`;
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

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Study plan
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">
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

      {/* Progress */}
      <div className="mt-5 flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="font-mono text-xs text-muted-foreground tabular-nums">
          {done}/{total}
        </span>
      </div>

      {/* Weeks */}
      <div className="mt-8 space-y-8">
        {plan.weeks.map((week) => (
          <section key={week.id}>
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="text-lg font-semibold">Week {week.weekIndex + 1}</h2>
              {week.focus && (
                <p className="truncate text-sm text-muted-foreground">{week.focus}</p>
              )}
            </div>
            <ul className="mt-3 space-y-2">
              {week.tasks.map((t) => {
                const isDone = tasks[t.id];
                const href = taskHref(t);
                return (
                  <li
                    key={t.id}
                    className={cn(
                      "flex items-center gap-3 rounded-lg border bg-card p-3 transition-opacity",
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
          </section>
        ))}
      </div>
    </div>
  );
}
