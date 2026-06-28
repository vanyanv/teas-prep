"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

function format(seconds: number): string {
  const s = Math.max(0, seconds);
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
}

/**
 * Counts down from `durationSec` and calls `onExpire` once when it hits zero.
 * Wall-clock based (survives tab throttling). Pure presentational countdown;
 * the parent owns submit-on-expire.
 */
export function ExamTimer({
  durationSec,
  onExpire,
  paused = false,
  className,
}: {
  durationSec: number;
  onExpire: () => void;
  paused?: boolean;
  className?: string;
}) {
  const [remaining, setRemaining] = useState(durationSec);
  const deadlineRef = useRef<number | null>(null);
  const firedRef = useRef(false);
  const onExpireRef = useRef(onExpire);
  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    if (paused) {
      deadlineRef.current = null;
      return;
    }
    // performance.now avoids Date.now lint constraints and is monotonic.
    const start = performance.now();
    deadlineRef.current = start + remaining * 1000;

    const tick = () => {
      if (deadlineRef.current == null) return;
      const left = Math.round((deadlineRef.current - performance.now()) / 1000);
      setRemaining(left);
      if (left <= 0 && !firedRef.current) {
        firedRef.current = true;
        onExpireRef.current();
      }
    };
    const id = setInterval(tick, 250);
    return () => clearInterval(id);
    // re-arm only when pause state flips
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused]);

  const danger = remaining <= 60;
  const warn = remaining <= 300 && remaining > 60;

  return (
    <div
      role="timer"
      aria-live="off"
      className={cn(
        "font-mono text-sm tabular-nums tracking-tight",
        danger
          ? "text-destructive"
          : warn
            ? "text-warning"
            : "text-muted-foreground",
        className,
      )}
    >
      {format(remaining)}
    </div>
  );
}
