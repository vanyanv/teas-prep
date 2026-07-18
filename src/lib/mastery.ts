import { db } from "@/lib/db";
import { masteryCredit } from "@/lib/quiz/confidence";
import {
  SECTIONS,
  topicLabel,
  type Section,
} from "@/lib/teas-blueprint";

/**
 * Single source of truth for "how well does Chris know this?" — used by the
 * dashboard, Progress, the Plan, and the adaptive Today session so they all
 * agree. Two deliberate choices keep the signal honest:
 *
 *  - Confidence-weighted: a correct-but-guessed answer earns little credit
 *    (see `masteryCredit`), so luck doesn't mask a weak topic.
 *  - Recency-weighted: older answers decay (14-day half-life), so mastery
 *    reflects where you are now, not where you were a month ago.
 */
const HALF_LIFE_DAYS = 14;
const MIN_WEIGHT = 0.08; // a very old answer still counts a little

export interface TopicMasteryRow {
  section: Section;
  topic: string;
  label: string;
  pct: number | null; // null = not yet assessed
  count: number; // raw items answered
}

export interface MasteryData {
  overall: number | null;
  sections: Record<Section, number | null>;
  topics: TopicMasteryRow[];
  totalAnswered: number;
}

interface Bucket {
  weightedCredit: number;
  weight: number;
  count: number;
}

function recencyWeight(when: Date, now: number): number {
  const ageDays = Math.max(0, (now - when.getTime()) / 86_400_000);
  return Math.max(MIN_WEIGHT, Math.pow(0.5, ageDays / HALF_LIFE_DAYS));
}

function pct(b: Bucket | undefined): number | null {
  if (!b || b.weight === 0) return null;
  return Math.round((b.weightedCredit / b.weight) * 100);
}

/** Compute the full mastery picture in one query. */
export async function getMasteryData(userId: string): Promise<MasteryData> {
  const items = await db.attemptItem.findMany({
    where: { isCorrect: { not: null }, attempt: { userId } },
    select: {
      isCorrect: true,
      confidence: true,
      question: { select: { section: true, topic: true } },
      attempt: { select: { finishedAt: true, startedAt: true } },
    },
    take: 5000,
  });

  const now = Date.now();
  const overall: Bucket = { weightedCredit: 0, weight: 0, count: 0 };
  const sectionAgg = new Map<string, Bucket>();
  const topicAgg = new Map<string, Bucket>();

  for (const it of items) {
    const when = it.attempt.finishedAt ?? it.attempt.startedAt ?? new Date(now);
    const w = recencyWeight(when, now);
    const credit = masteryCredit(!!it.isCorrect, it.confidence ?? null);
    const sec = it.question.section;
    const topicKey = `${sec}:${it.question.topic}`;

    for (const [map, key] of [
      [sectionAgg, sec],
      [topicAgg, topicKey],
    ] as const) {
      const b = map.get(key) ?? { weightedCredit: 0, weight: 0, count: 0 };
      b.weightedCredit += w * credit;
      b.weight += w;
      b.count += 1;
      map.set(key, b);
    }
    overall.weightedCredit += w * credit;
    overall.weight += w;
    overall.count += 1;
  }

  const sections = {} as Record<Section, number | null>;
  const topics: TopicMasteryRow[] = [];
  for (const spec of SECTIONS) {
    sections[spec.key] = pct(sectionAgg.get(spec.key));
    for (const t of spec.topics) {
      const b = topicAgg.get(`${spec.key}:${t.key}`);
      topics.push({
        section: spec.key,
        topic: t.key,
        label: topicLabel(spec.key, t.key),
        pct: pct(b),
        count: b?.count ?? 0,
      });
    }
  }

  return {
    overall: pct(overall),
    sections,
    topics,
    totalAnswered: overall.count,
  };
}

/** Mastery for a single skill (question.subtopic), same weighting as topics. */
export async function getSkillMastery(
  userId: string,
  skill: string,
): Promise<{ pct: number | null; count: number }> {
  const items = await db.attemptItem.findMany({
    where: {
      isCorrect: { not: null },
      attempt: { userId },
      question: { subtopic: skill },
    },
    select: {
      isCorrect: true,
      confidence: true,
      attempt: { select: { finishedAt: true, startedAt: true } },
    },
    take: 2000,
  });

  const now = Date.now();
  const bucket: Bucket = { weightedCredit: 0, weight: 0, count: 0 };
  for (const it of items) {
    const when = it.attempt.finishedAt ?? it.attempt.startedAt ?? new Date(now);
    const w = recencyWeight(when, now);
    bucket.weightedCredit += w * masteryCredit(!!it.isCorrect, it.confidence ?? null);
    bucket.weight += w;
    bucket.count += 1;
  }
  return { pct: pct(bucket), count: bucket.count };
}

/** Per-section mastery (confidence + recency weighted). */
export async function getSectionScores(
  userId: string,
): Promise<Record<Section, number | null>> {
  return (await getMasteryData(userId)).sections;
}

/** Overall readiness mastery, or null if nothing answered yet. */
export async function getReadiness(userId: string): Promise<number | null> {
  return (await getMasteryData(userId)).overall;
}
