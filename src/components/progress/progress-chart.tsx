"use client";

import dynamic from "next/dynamic";

import type { TrendPoint } from "@/lib/progress";

/**
 * Recharts is the heaviest dependency in the app and only two screens plot
 * anything, so it loads on demand rather than riding in the shared bundle. The
 * placeholder reserves the chart's exact height so nothing below it jumps.
 */
const Chart = dynamic(
  () => import("./progress-chart.impl").then((m) => m.ProgressChart),
  {
    ssr: false,
    loading: () => <ChartSkeleton height={220} />,
  },
);

export function ChartSkeleton({ height }: { height: number }) {
  return (
    <div
      className="w-full animate-pulse rounded-lg bg-secondary/60"
      style={{ height }}
      aria-hidden
    />
  );
}

export function ProgressChart(props: { data: TrendPoint[]; target: number }) {
  return <Chart {...props} />;
}
