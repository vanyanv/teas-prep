import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { Kicker } from "@/components/ui/page";
import { cn } from "@/lib/utils";
import type { WeekStripDay } from "@/lib/plan/week-strip";

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/**
 * This week's plan at a glance. Missed days stay calm (muted, never red);
 * the strip links into the full plan for changes.
 */
export function WeekStrip({ days }: { days: WeekStripDay[] }) {
  return (
    <section aria-label="This week's plan">
      <div className="flex items-baseline justify-between gap-3 px-1">
        <Kicker className="text-[11px]">This week</Kicker>
        <Link
          href="/plan"
          className="flex items-center gap-1 rounded-md text-xs font-medium text-primary outline-none hover:underline focus-visible:ring-[3px] focus-visible:ring-ring/40"
        >
          Full plan
          <ArrowRight className="size-3" aria-hidden />
        </Link>
      </div>
      <ol className="mt-2 grid grid-cols-7 gap-1 sm:gap-1.5">
        {days.map((d) => {
          const complete = d.taskCount > 0 && d.doneCount === d.taskCount;
          const pending = d.taskCount > 0 && !complete;
          const status = complete
            ? "completed"
            : pending
              ? `${d.doneCount} of ${d.taskCount} tasks done`
              : "rest day";
          return (
            <li
              key={d.dayOfWeek}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-lg border py-2.5",
                d.isToday
                  ? "border-primary/40 bg-primary/5"
                  : "border-transparent",
              )}
            >
              <span
                className={cn(
                  "font-mono text-[10px] uppercase tracking-wide",
                  d.isToday ? "font-semibold text-primary" : "text-muted-foreground",
                )}
              >
                {DAY_LABELS[d.dayOfWeek]}
              </span>
              <span className="flex h-4 items-center" aria-hidden>
                {complete ? (
                  <Check className="size-3.5 text-success" />
                ) : pending ? (
                  <span className="size-1.5 rounded-full bg-foreground/35" />
                ) : (
                  <span className="size-1 rounded-full bg-foreground/10" />
                )}
              </span>
              <span className="sr-only">{`${DAY_LABELS[d.dayOfWeek]}: ${status}`}</span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
