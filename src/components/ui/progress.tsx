import * as React from "react";

import { cn } from "@/lib/utils";

type Tone = "primary" | "success" | "warning" | "destructive" | "muted";

const TONE: Record<Tone, string> = {
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  destructive: "bg-destructive",
  muted: "bg-muted-foreground/40",
};

type Size = "sm" | "md" | "lg";

const SIZE: Record<Size, string> = {
  sm: "h-1",
  md: "h-1.5",
  lg: "h-2",
};

/** Thin, accessible progress/meter bar. `value` is 0-100. */
function Progress({
  value,
  tone = "primary",
  size = "lg",
  className,
  ...props
}: React.ComponentProps<"div"> & { value: number; tone?: Tone; size?: Size }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        "w-full overflow-hidden rounded-full bg-secondary",
        SIZE[size],
        className,
      )}
      {...props}
    >
      <div
        className={cn("h-full rounded-full transition-[width]", TONE[tone])}
        style={{
          width: `${pct}%`,
          transitionDuration: "var(--dur-med)",
          transitionTimingFunction: "var(--ease-out-quint)",
        }}
      />
    </div>
  );
}

export { Progress };
