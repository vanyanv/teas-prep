import * as React from "react";

import { cn } from "@/lib/utils";

type Tone = "primary" | "success" | "warning" | "muted";

const TONE: Record<Tone, string> = {
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  muted: "bg-muted-foreground/40",
};

/** Thin, accessible progress/meter bar. `value` is 0-100. */
function Progress({
  value,
  tone = "primary",
  className,
  ...props
}: React.ComponentProps<"div"> & { value: number; tone?: Tone }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("h-2 w-full overflow-hidden rounded-full bg-secondary", className)}
      {...props}
    >
      <div
        className={cn("h-full rounded-full transition-[width] duration-500", TONE[tone])}
        style={{ width: `${pct}%`, transitionTimingFunction: "var(--ease-out-quint)" }}
      />
    </div>
  );
}

export { Progress };
