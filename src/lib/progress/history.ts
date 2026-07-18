import { db } from "@/lib/db";
import { nodeBySkillId } from "@/content/taxonomy";
import { sectionLabel, type Section } from "@/lib/teas-blueprint";

/**
 * Quiz history: every finished practice/diagnostic attempt, most recent first,
 * with a derived scope label and the skills that need review. Attempts are
 * never overwritten — this is a read over the immutable attempt log. Full mocks
 * are exam history and are excluded here.
 */
export interface QuizHistoryEntry {
  attemptId: string;
  finishedAt: Date;
  scopeLabel: string;
  scorePct: number;
  correct: number;
  total: number;
  timeMs: number | null;
  skillsNeedingReview: string[];
  isPersonalBest: boolean;
}

interface ItemLite {
  isCorrect: boolean | null;
  timeMs: number | null;
  question: { skillId: string | null; section: Section };
}

function scopeLabel(variant: string | undefined, mode: string, items: ItemLite[]): string {
  if (variant === "review") return "Spaced review";
  if (variant === "saved") return "Saved questions";
  const skillIds = new Set(items.map((i) => i.question.skillId).filter(Boolean) as string[]);
  const sections = new Set(items.map((i) => i.question.section));
  if (skillIds.size === 1) {
    const node = nodeBySkillId([...skillIds][0]);
    if (node) return node.name;
  }
  if (sections.size === 1) {
    const label = sectionLabel([...sections][0]);
    return mode === "DIAGNOSTIC" ? `${label} diagnostic` : `${label} practice`;
  }
  return mode === "DIAGNOSTIC" ? "Diagnostic" : "Mixed practice";
}

export async function getQuizHistory(userId: string): Promise<QuizHistoryEntry[]> {
  const attempts = await db.attempt.findMany({
    where: { userId, finishedAt: { not: null }, mode: { in: ["PRACTICE", "DIAGNOSTIC"] } },
    orderBy: { finishedAt: "desc" },
    select: {
      id: true,
      mode: true,
      config: true,
      finishedAt: true,
      scorePct: true,
      items: {
        select: {
          isCorrect: true,
          timeMs: true,
          question: { select: { skillId: true, section: true, subtopic: true } },
        },
      },
    },
    take: 200,
  });

  const entries: QuizHistoryEntry[] = attempts.map((a) => {
    const answered = a.items.filter((i) => i.isCorrect !== null);
    const correct = answered.filter((i) => i.isCorrect).length;
    const total = answered.length;
    const timeMs = answered.reduce((n, i) => n + (i.timeMs ?? 0), 0) || null;
    const variant = (a.config as { variant?: string } | null)?.variant;
    const needing = new Set<string>();
    for (const i of answered) {
      if (i.isCorrect === false && i.question.subtopic) needing.add(i.question.subtopic);
    }
    return {
      attemptId: a.id,
      finishedAt: a.finishedAt as Date,
      scopeLabel: scopeLabel(variant, a.mode, a.items),
      scorePct: a.scorePct ?? (total ? Math.round((correct / total) * 100) : 0),
      correct,
      total,
      timeMs,
      skillsNeedingReview: [...needing],
      isPersonalBest: false,
    };
  });

  // Mark the personal best per scope label (first time it was achieved).
  const bestByScope = new Map<string, number>();
  for (const e of entries) {
    bestByScope.set(e.scopeLabel, Math.max(bestByScope.get(e.scopeLabel) ?? 0, e.scorePct));
  }
  const bestClaimed = new Set<string>();
  // iterate oldest-first so the earliest attempt that reaches the best is flagged
  for (const e of [...entries].reverse()) {
    if (!bestClaimed.has(e.scopeLabel) && e.scorePct === bestByScope.get(e.scopeLabel)) {
      e.isPersonalBest = true;
      bestClaimed.add(e.scopeLabel);
    }
  }

  return entries;
}
