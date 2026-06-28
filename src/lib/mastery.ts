import { db } from "@/lib/db";
import { scoreItems, type GradedItem } from "@/lib/quiz/score";
import { SECTIONS, type Section } from "@/lib/teas-blueprint";
import type { TopicMastery } from "@/lib/plan/generate";

/** Pull graded attempt items for a user (optionally filtered to a mode). */
async function gradedItems(
  userId: string,
  mode?: "DIAGNOSTIC" | "PRACTICE" | "MOCK",
): Promise<GradedItem[]> {
  const items = await db.attemptItem.findMany({
    where: {
      isCorrect: { not: null },
      attempt: { userId, ...(mode ? { mode } : {}) },
    },
    include: { question: { select: { section: true, topic: true } } },
    take: 2000,
  });
  return items.map((it) => ({
    questionId: it.questionId,
    section: it.question.section as Section,
    topic: it.question.topic,
    isCorrect: !!it.isCorrect,
  }));
}

export async function getScore(userId: string) {
  return scoreItems(await gradedItems(userId));
}

export async function getSectionScores(
  userId: string,
): Promise<Record<Section, number | null>> {
  const score = scoreItems(await gradedItems(userId));
  const out = {} as Record<Section, number | null>;
  for (const s of SECTIONS) out[s.key] = score.bySection[s.key]?.pct ?? null;
  return out;
}

/** Per-topic mastery used by the plan generator. */
export async function getTopicMasteries(userId: string): Promise<TopicMastery[]> {
  const score = scoreItems(await gradedItems(userId));
  const out: TopicMastery[] = [];
  for (const spec of SECTIONS) {
    for (const t of spec.topics) {
      const key = `${spec.key}:${t.key}`;
      out.push({
        section: spec.key,
        topic: t.key,
        pct: score.byTopic[key]?.pct ?? null,
      });
    }
  }
  return out;
}
