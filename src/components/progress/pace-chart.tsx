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

  const max = Math.max(examPaceSec, ...points.map((p) => p.avgSec!));

  return (
    <ResponsiveContainer width="100%" height={120}>
      <LineChart data={points} margin={{ top: 12, right: 8, bottom: 0, left: -16 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          tickLine={false}
          axisLine={{ stroke: "var(--border)" }}
        />
        <YAxis
          domain={[0, Math.ceil((max * 1.15) / 15) * 15]}
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          tickFormatter={(v) => `${v}s`}
          tickLine={false}
          axisLine={false}
          width={40}
        />
        <ReferenceLine
          y={examPaceSec}
          stroke="var(--muted-foreground)"
          strokeDasharray="4 4"
          label={{
            value: `Exam pace ${examPaceSec}s`,
            position: "insideTopRight",
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
          stroke="var(--section-math)"
          strokeWidth={2}
          dot={{ r: 2.5, fill: "var(--section-math)" }}
          activeDot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
