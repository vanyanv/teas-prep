import { db } from "@/lib/db";
import { getMasteryData } from "@/lib/mastery";
import { sectionLabel, type Section } from "@/lib/teas-blueprint";

export interface TrendPoint {
  date: string; // ISO date
  label: string;
  pct: number;
  mode: string;
  /** average seconds per answered question in this attempt; null when untimed */
  avgSec: number | null;
}

export interface MockRow {
  id: string;
  date: string; // ISO date
  label: string;
  pct: number;
  sections: { key: Section; label: string; correct: number; total: number; pct: number }[];
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
  mocks: MockRow[];
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
    select: { id: true, scorePct: true, finishedAt: true, mode: true },
    take: 100,
  });

  // Pace: average time per answered question, per attempt (null when untimed).
  const timing = await db.attemptItem.groupBy({
    by: ["attemptId"],
    where: { attemptId: { in: attempts.map((a) => a.id) }, timeMs: { not: null } },
    _avg: { timeMs: true },
  });
  const avgSecByAttempt = new Map(
    timing.map((t) => [t.attemptId, t._avg.timeMs != null ? t._avg.timeMs / 1000 : null]),
  );

  const dateLabel = (d: Date) =>
    d.toLocaleDateString(undefined, { month: "short", day: "numeric" });

  const trend: TrendPoint[] = attempts.map((a) => {
    const avgSec = avgSecByAttempt.get(a.id);
    return {
      date: a.finishedAt!.toISOString(),
      label: dateLabel(a.finishedAt!),
      pct: Math.round(a.scorePct!),
      mode: a.mode,
      avgSec: avgSec != null ? Math.round(avgSec) : null,
    };
  });

  // Mock-exam history with a per-section breakdown, newest first.
  const mockAttempts = attempts.filter((a) => a.mode === "MOCK").slice(-12);
  const mockItems = mockAttempts.length
    ? await db.attemptItem.findMany({
        where: { attemptId: { in: mockAttempts.map((a) => a.id) }, isCorrect: { not: null } },
        select: {
          attemptId: true,
          isCorrect: true,
          question: { select: { section: true } },
        },
      })
    : [];
  const mocks: MockRow[] = mockAttempts
    .map((a) => {
      const tallies = new Map<Section, { correct: number; total: number }>();
      for (const it of mockItems) {
        if (it.attemptId !== a.id) continue;
        const t = tallies.get(it.question.section) ?? { correct: 0, total: 0 };
        t.total += 1;
        if (it.isCorrect) t.correct += 1;
        tallies.set(it.question.section, t);
      }
      return {
        id: a.id,
        date: a.finishedAt!.toISOString(),
        label: dateLabel(a.finishedAt!),
        pct: Math.round(a.scorePct!),
        sections: [...tallies.entries()].map(([key, t]) => ({
          key,
          label: sectionLabel(key),
          correct: t.correct,
          total: t.total,
          pct: t.total ? Math.round((t.correct / t.total) * 100) : 0,
        })),
      };
    })
    .reverse();

  return {
    readiness: mastery.overall,
    sectionScores,
    topics,
    trend,
    mocks,
    totalAnswered: mastery.totalAnswered,
    target,
  };
}
