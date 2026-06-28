import { db } from "@/lib/db";
import { scoreItems, type GradedItem } from "@/lib/quiz/score";
import { SECTIONS, topicLabel, type Section } from "@/lib/teas-blueprint";

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
  const items = await db.attemptItem.findMany({
    where: { isCorrect: { not: null }, attempt: { userId } },
    include: { question: { select: { section: true, topic: true } } },
    take: 5000,
  });
  const graded: GradedItem[] = items.map((it) => ({
    questionId: it.questionId,
    section: it.question.section as Section,
    topic: it.question.topic,
    isCorrect: !!it.isCorrect,
  }));
  const score = scoreItems(graded);

  const sectionScores = {} as Record<Section, number | null>;
  for (const s of SECTIONS) sectionScores[s.key] = score.bySection[s.key]?.pct ?? null;

  const topics: TopicRow[] = [];
  for (const spec of SECTIONS) {
    for (const t of spec.topics) {
      const cell = score.byTopic[`${spec.key}:${t.key}`];
      topics.push({
        section: spec.key,
        topic: t.key,
        label: topicLabel(spec.key, t.key),
        pct: cell?.pct ?? null,
        count: cell?.total ?? 0,
      });
    }
  }

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
    readiness: graded.length ? score.pct : null,
    sectionScores,
    topics,
    trend,
    totalAnswered: graded.length,
    target,
  };
}
