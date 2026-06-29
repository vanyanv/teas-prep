import { db } from "@/lib/db";
import { getMasteryData } from "@/lib/mastery";
import { type Section } from "@/lib/teas-blueprint";

export interface TrendPoint {
  date: string; // ISO date
  label: string;
  pct: number;
  mode: string;
}

export interface TopicRow {
  section: Section;
  topic: string;
  label: string;
  pct: number | null;
  count: number;
}

export interface ProgressData {
  readiness: number | null;
  sectionScores: Record<Section, number | null>;
  topics: TopicRow[];
  trend: TrendPoint[];
  totalAnswered: number;
}

export async function getProgressData(
  userId: string,
  target = 70,
): Promise<ProgressData & { target: number }> {
  // Mastery (confidence + recency weighted) is the single source of truth so
  // Progress and the Plan show the same numbers.
  const mastery = await getMasteryData(userId);
  const sectionScores = mastery.sections;
  const topics: TopicRow[] = mastery.topics.map((t) => ({
    section: t.section,
    topic: t.topic,
    label: t.label,
    pct: t.pct,
    count: t.count,
  }));

  const attempts = await db.attempt.findMany({
    where: { userId, finishedAt: { not: null }, scorePct: { not: null } },
    orderBy: { finishedAt: "asc" },
    select: { scorePct: true, finishedAt: true, mode: true },
    take: 100,
  });
  const trend: TrendPoint[] = attempts.map((a) => ({
    date: a.finishedAt!.toISOString(),
    label: a.finishedAt!.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    }),
    pct: Math.round(a.scorePct!),
    mode: a.mode,
  }));

  return {
    readiness: mastery.overall,
    sectionScores,
    topics,
    trend,
    totalAnswered: mastery.totalAnswered,
    target,
  };
}
