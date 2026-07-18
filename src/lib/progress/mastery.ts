import { masteryCredit, type Confidence } from "@/lib/quiz/confidence";
import type { MasteryState } from "@/generated/prisma/enums";

/**
 * Skill-level mastery engine (Phase 1). Extends the existing topic/section
 * engine in `src/lib/mastery.ts` — same confidence + recency weighting — and
 * adds two inputs the brief calls for: difficulty weighting and an evidence
 * gate, plus the five named mastery states. Kept as a PURE core so it is unit
 * testable and so every consumer computes mastery the same way.
 *
 * Every weight/threshold lives on `MasteryConfig` (configurable, per the brief:
 * "keep mastery thresholds and formula weights configurable").
 */
export interface MasteryConfig {
  halfLifeDays: number;
  minRecencyWeight: number;
  /** evidence multiplier by question difficulty (1=easy … 3=hard) */
  difficultyWeight: Record<1 | 2 | 3, number>;
  /** minimum distinct-item evidence before a skill may pass Learning */
  evidenceGate: number;
  /** pct boundaries between states */
  thresholds: { practicing: number; proficient: number; mastered: number };
  /** spaced-review successes required to call a high skill "Mastered" */
  masteredRequiresSpacedSuccesses: number;
}

export const defaultMasteryConfig: MasteryConfig = {
  halfLifeDays: 14,
  minRecencyWeight: 0.08,
  difficultyWeight: { 1: 0.85, 2: 1.0, 3: 1.15 },
  evidenceGate: 4,
  thresholds: { practicing: 50, proficient: 70, mastered: 85 },
  masteredRequiresSpacedSuccesses: 2,
};

export interface MasteryItem {
  isCorrect: boolean;
  confidence: Confidence | null;
  difficulty: 1 | 2 | 3;
  when: Date;
  /** answered as part of a due spaced-review (counts toward sustained mastery) */
  spacedReview?: boolean;
}

export interface MasteryResult {
  pct: number | null;
  evidenceCount: number;
  spacedSuccesses: number;
  state: MasteryState;
}

function recencyWeight(when: Date, now: number, cfg: MasteryConfig): number {
  const ageDays = Math.max(0, (now - when.getTime()) / 86_400_000);
  return Math.max(cfg.minRecencyWeight, Math.pow(0.5, ageDays / cfg.halfLifeDays));
}

/**
 * Classify a mastery pct + evidence into one of the five states. Pure and
 * exported so the thresholds are testable in isolation.
 */
export function classifyMastery(
  pct: number | null,
  evidenceCount: number,
  spacedSuccesses: number,
  recentLapse: boolean,
  cfg: MasteryConfig = defaultMasteryConfig,
): MasteryState {
  if (pct === null || evidenceCount === 0) return "NOT_STARTED";
  // Not enough evidence to prove anything beyond "learning", regardless of pct.
  if (evidenceCount < cfg.evidenceGate) return "LEARNING";
  if (pct < cfg.thresholds.practicing) return "LEARNING";
  if (pct < cfg.thresholds.proficient) return "PRACTICING";
  if (pct < cfg.thresholds.mastered) return "PROFICIENT";
  // pct >= mastered: only truly "mastered" if sustained across spaced reviews
  // and no recent lapse — one hot streak is not mastery.
  if (recentLapse || spacedSuccesses < cfg.masteredRequiresSpacedSuccesses) {
    return "PROFICIENT";
  }
  return "MASTERED";
}

/**
 * Compute a skill's mastery from its answered items. pct is
 * Σ(recency·difficulty·credit) / Σ(recency·difficulty): harder items move the
 * needle more, and stale items decay. `recentLapse` = the most recent item was
 * wrong (blocks a premature "Mastered").
 */
export function computeMastery(
  items: MasteryItem[],
  cfg: MasteryConfig = defaultMasteryConfig,
  now: number = 0,
): MasteryResult {
  if (items.length === 0) {
    return { pct: null, evidenceCount: 0, spacedSuccesses: 0, state: "NOT_STARTED" };
  }
  let weightedCredit = 0;
  let weight = 0;
  let spacedSuccesses = 0;
  for (const it of items) {
    const w = recencyWeight(it.when, now, cfg) * cfg.difficultyWeight[it.difficulty];
    weightedCredit += w * masteryCredit(it.isCorrect, it.confidence);
    weight += w;
    if (it.spacedReview && it.isCorrect) spacedSuccesses += 1;
  }
  const pct = weight === 0 ? null : Math.round((weightedCredit / weight) * 100);
  const mostRecent = items.reduce((a, b) => (a.when.getTime() >= b.when.getTime() ? a : b));
  const recentLapse = !mostRecent.isCorrect;
  const state = classifyMastery(pct, items.length, spacedSuccesses, recentLapse, cfg);
  return { pct, evidenceCount: items.length, spacedSuccesses, state };
}
