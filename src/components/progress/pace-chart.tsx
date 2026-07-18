"use client";

import dynamic from "next/dynamic";

import { ChartSkeleton } from "./progress-chart";
import type { TrendPoint } from "@/lib/progress";

const Chart = dynamic(() => import("./pace-chart.impl").then((m) => m.PaceChart), {
  ssr: false,
  loading: () => <ChartSkeleton height={130} />,
});

export function PaceChart({
  data,
  examPaceSec,
}: {
  data: TrendPoint[];
  examPaceSec: number;
}) {
  // Deciding "too few points to plot" here rather than inside the lazy module
  // keeps recharts from being fetched at all for a learner with one attempt.
  if (data.filter((d) => d.avgSec != null).length < 2) return null;
  return <Chart data={data} examPaceSec={examPaceSec} />;
}
