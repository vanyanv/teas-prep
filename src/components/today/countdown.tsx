import Link from "next/link";
import { CalendarDays } from "lucide-react";

/**
 * Days-to-test chip for the Today header. When no date is set, a quiet
 * affordance points at the plan builder instead of an empty state.
 */
export function ExamCountdown({ days }: { days: number | null }) {
  if (days == null) {
    return (
      <Link
        href="/plan"
        className="shrink-0 rounded-md text-xs text-muted-foreground underline-offset-4 outline-none transition-colors hover:text-foreground hover:underline focus-visible:ring-[3px] focus-visible:ring-ring/40"
      >
        Set your test date
      </Link>
    );
  }
  return (
    <p className="flex shrink-0 items-center gap-2 rounded-md border bg-card px-3 py-1.5">
      <CalendarDays className="size-4 text-muted-foreground" aria-hidden />
      {days === 0 ? (
        <span className="text-xs font-medium">Test day</span>
      ) : (
        <>
          <span className="font-mono text-sm font-semibold tabular-nums">{days}</span>
          <span className="text-xs text-muted-foreground">
            {days === 1 ? "day" : "days"} to test
          </span>
        </>
      )}
    </p>
  );
}
