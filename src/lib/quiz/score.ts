import type { Answer, QuizQuestion } from "./types";

function normalizeText(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

function sameSet(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false;
  const sa = new Set(a);
  for (const x of b) if (!sa.has(x)) return false;
  return true;
}

function sameOrder(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((x, i) => x === b[i]);
}

function toIndexArray(ans: Answer): number[] {
  if (ans == null) return [];
  if (Array.isArray(ans)) return ans.filter((n): n is number => typeof n === "number");
  if (typeof ans === "number") return [ans];
  return [];
}

/**
 * Grade a single answer. Multi-select is all-or-nothing (matches the real
 * TEAS: any wrong selection or any missed correct option fails the item).
 */
export function gradeQuestion(q: QuizQuestion, answer: Answer): boolean {
  switch (q.type) {
    case "SINGLE":
    case "HOT_SPOT": {
      const correct = (q.correct as number[]) ?? [];
      const picked = toIndexArray(answer);
      return sameSet(picked, correct);
    }
    case "MULTI": {
      const correct = (q.correct as number[]) ?? [];
      const picked = toIndexArray(answer);
      if (picked.length === 0) return false;
      return sameSet(picked, correct);
    }
    case "ORDERED": {
      const correct = (q.correct as number[]) ?? [];
      const picked = toIndexArray(answer);
      return sameOrder(picked, correct);
    }
    case "FILL_BLANK": {
      const accepted = (q.correct as string[]) ?? [];
      if (typeof answer !== "string") return false;
      const norm = normalizeText(answer);
      return accepted.some((a) => normalizeText(a) === norm);
    }
    default:
      return false;
  }
}

export interface GradedItem {
  questionId: string;
  section: QuizQuestion["section"];
  topic: string;
  subtopic?: string | null;
  isCorrect: boolean;
}

type Tally = { total: number; correct: number; pct: number };

export interface ScoreBreakdown {
  total: number;
  correct: number;
  pct: number;
  bySection: Record<string, Tally>;
  byTopic: Record<string, Tally>;
  /** keyed by the skill name (subtopic); only items that carry a subtopic */
  bySubtopic: Record<string, Tally>;
}

export function scoreItems(items: GradedItem[]): ScoreBreakdown {
  const bySection: ScoreBreakdown["bySection"] = {};
  const byTopic: ScoreBreakdown["byTopic"] = {};
  const bySubtopic: ScoreBreakdown["bySubtopic"] = {};
  let correct = 0;

  for (const it of items) {
    if (it.isCorrect) correct += 1;

    const sec = (bySection[it.section] ??= { total: 0, correct: 0, pct: 0 });
    sec.total += 1;
    if (it.isCorrect) sec.correct += 1;

    const topicKey = `${it.section}:${it.topic}`;
    const t = (byTopic[topicKey] ??= { total: 0, correct: 0, pct: 0 });
    t.total += 1;
    if (it.isCorrect) t.correct += 1;

    if (it.subtopic) {
      const sub = (bySubtopic[it.subtopic] ??= { total: 0, correct: 0, pct: 0 });
      sub.total += 1;
      if (it.isCorrect) sub.correct += 1;
    }
  }

  for (const group of [bySection, byTopic, bySubtopic]) {
    for (const k of Object.keys(group)) {
      const g = group[k];
      g.pct = g.total ? Math.round((g.correct / g.total) * 100) : 0;
    }
  }

  return {
    total: items.length,
    correct,
    pct: items.length ? Math.round((correct / items.length) * 100) : 0,
    bySection,
    byTopic,
    bySubtopic,
  };
}
