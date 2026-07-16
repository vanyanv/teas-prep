"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { TrendPoint } from "@/lib/progress";

/** Shared with the pace summary above the chart, so both read the same way. */
function label(sec: number): string {
  const s = Math.round(sec);
  return s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, "0")}s`;
}

/**
 * Average seconds per question across timed attempts. Quieter than the score
 * trend (it answers "am I getting faster?", not "am I passing?"), so it is a
 * short small-multiple under the accuracy chart rather than a second hero.
 */
export function PaceChart({
  data,
  examPaceSec,
}: {
  data: TrendPoint[];
  examPaceSec: number;
}) {
  const points = data.filter((d) => d.avgSec != null);
  if (points.length < 2) return null;

  // Round the ceiling up to a whole 30s so the ticks land on half-minutes
  // rather than recharts' default 25s steps, which read oddly against a
  // duration axis.
  const rawMax = Math.max(examPaceSec, ...points.map((p) => p.avgSec!));
  const max = Math.max(60, Math.ceil((rawMax * 1.15) / 30) * 30);
  const ticks = Array.from({ length: max / 30 + 1 }, (_, i) => i * 30);

  return (
    <ResponsiveContainer width="100%" height={130}>
      {/* The y labels carry a unit ("1m 14s"), so unlike the score chart's bare
          numbers they need real gutter room or recharts clips them. */}
      <LineChart data={points} margin={{ top: 16, right: 8, bottom: 0, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          tickLine={false}
          axisLine={{ stroke: "var(--border)" }}
        />
        <YAxis
          domain={[0, max]}
          ticks={ticks}
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          tickFormatter={(v) => label(Number(v))}
          tickLine={false}
          axisLine={false}
          width={64}
        />
        <ReferenceLine
          y={examPaceSec}
          stroke="var(--muted-foreground)"
          strokeDasharray="4 4"
          label={{
            value: `Exam pace ${label(examPaceSec)}`,
            position: "insideBottomRight",
            fontSize: 10,
            fill: "var(--muted-foreground)",
          }}
        />
        <Tooltip
          contentStyle={{
            background: "var(--popover)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            fontSize: 12,
            color: "var(--popover-foreground)",
          }}
          labelStyle={{ color: "var(--muted-foreground)" }}
          formatter={(value) => [label(Number(value)), "Per question"]}
        />
        <Line
          type="monotone"
          dataKey="avgSec"
          stroke="var(--muted-foreground)"
          strokeWidth={2}
          dot={{ r: 2.5, fill: "var(--muted-foreground)" }}
          activeDot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
