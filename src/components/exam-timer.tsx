"use client";

import { useEffect, useRef, useState } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

function format(seconds: number): string {
  const s = Math.max(0, seconds);
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
}

/**
 * Counts down from `durationSec` and calls `onExpire` once when it hits zero.
 * Wall-clock based (survives tab throttling). `prominent` renders a labeled
 * pill that shifts color as time runs low; threshold announcements (5 min,
 * 1 min) reach screen readers without reading every tick aloud.
 */
export function ExamTimer({
  durationSec,
  onExpire,
  paused = false,
  prominent = false,
  className,
}: {
  durationSec: number;
  onExpire: () => void;
  paused?: boolean;
  prominent?: boolean;
  className?: string;
}) {
  const [remaining, setRemaining] = useState(durationSec);
  const [announce, setAnnounce] = useState("");
  const deadlineRef = useRef<number | null>(null);
  const firedRef = useRef(false);
  const announcedRef = useRef<Set<number>>(new Set());
  const onExpireRef = useRef(onExpire);
  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    if (paused) {
      deadlineRef.current = null;
      return;
    }
    const start = performance.now();
    deadlineRef.current = start + remaining * 1000;

    const tick = () => {
      if (deadlineRef.current == null) return;
      const left = Math.round((deadlineRef.current - performance.now()) / 1000);
      setRemaining(left);
      for (const mark of [300, 60]) {
        if (left <= mark && left > mark - 2 && !announcedRef.current.has(mark)) {
          announcedRef.current.add(mark);
          setAnnounce(`${mark / 60} minute${mark === 60 ? "" : "s"} remaining`);
        }
      }
      if (left <= 0 && !firedRef.current) {
        firedRef.current = true;
        onExpireRef.current();
      }
    };
    const id = setInterval(tick, 250);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused]);

  const danger = remaining <= 60;
  const warn = remaining <= 300 && remaining > 60;

  if (prominent) {
    return (
      <>
        <div
          role="timer"
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-base font-semibold tabular-nums tracking-tight transition-colors",
            danger
              ? "border-destructive/40 bg-destructive/10 text-destructive"
              : warn
                ? "border-warning/40 bg-warning/10 text-warning"
                : "border-border bg-secondary text-foreground",
            className,
          )}
        >
          <Clock className={cn("size-4", danger && "animate-pulse")} />
          {format(remaining)}
        </div>
        <span className="sr-only" aria-live="assertive">
          {announce}
        </span>
      </>
    );
  }

  return (
    <div
      role="timer"
      className={cn(
        "inline-flex items-center gap-1.5 font-mono text-sm tabular-nums tracking-tight",
        danger ? "text-destructive" : warn ? "text-warning" : "text-muted-foreground",
        className,
      )}
    >
      {/* Icon appears with the color shift so urgency is never color-only. */}
      {(warn || danger) && (
        <Clock className={cn("size-3.5", danger && "animate-pulse")} aria-hidden />
      )}
      {format(remaining)}
      {(warn || danger) && (
        <span className="sr-only">{danger ? "Time almost up" : "Time running low"}</span>
      )}
    </div>
  );
}
