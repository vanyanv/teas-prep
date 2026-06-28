"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg" | "xl";

const DIM: Record<Size, { box: number; r: number; stroke: number; font: string }> = {
  sm: { box: 40, r: 16, stroke: 3, font: "text-xs" },
  md: { box: 56, r: 23, stroke: 4, font: "text-sm" },
  lg: { box: 80, r: 33, stroke: 5, font: "text-lg" },
  xl: { box: 120, r: 50, stroke: 7, font: "text-3xl" },
};

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Score band tone: muted (<60), primary (60–79), strong (80+). */
function toneClass(score: number): string {
  if (score >= 80) return "text-success";
  if (score >= 60) return "text-primary";
  if (score > 0) return "text-warning";
  return "text-muted-foreground/40";
}

/**
 * Animated score ring. On mount, the arc fills and the number counts up
 * together (eased), so seeing a score feels earned. Respects reduced motion.
 */
export function ScoreRing({
  score,
  size = "md",
  label,
  animate = true,
  className,
}: {
  score: number | null;
  size?: Size;
  label?: string;
  animate?: boolean;
  className?: string;
}) {
  const { box, r, stroke, font } = DIM[size];
  const target = Math.max(0, Math.min(100, score ?? 0));
  const [t, setT] = useState(animate && score != null ? 0 : 1);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Initial state is already correct when not animating (1) or unscored (1).
    if (score == null || !animate) return;
    if (prefersReducedMotion()) {
      rafRef.current = requestAnimationFrame(() => setT(1));
      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }
    const start = performance.now();
    const dur = 750;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setT(easeOutQuart(p));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, animate, score]);

  const circumference = 2 * Math.PI * r;
  const shown = Math.round(target * t);
  const dash = (target / 100) * circumference * t;
  const tone = toneClass(target);

  return (
    <div
      className={cn("relative inline-flex shrink-0 items-center justify-center", className)}
      style={{ width: box, height: box }}
    >
      <svg
        width={box}
        height={box}
        viewBox={`0 0 ${box} ${box}`}
        className={cn("absolute inset-0 -rotate-90", tone)}
        aria-hidden
      >
        <circle
          cx={box / 2}
          cy={box / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.14}
          strokeWidth={stroke}
        />
        {target > 0 && (
          <circle
            cx={box / 2}
            cy={box / 2}
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circumference}`}
          />
        )}
      </svg>
      <span
        className={cn(
          "relative z-10 font-mono font-semibold tabular-nums leading-none",
          font,
          target > 0 ? "text-foreground" : "text-muted-foreground/60",
        )}
      >
        {score == null ? "—" : shown}
      </span>
      {label && (
        <span className="sr-only">
          {label}: {score == null ? "not attempted" : `${target}%`}
        </span>
      )}
    </div>
  );
}
