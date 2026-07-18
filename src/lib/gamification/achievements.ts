import { db } from "@/lib/db";
import { SKILL_NODES } from "@/content/taxonomy";
import { SECTION_ORDER, sectionLabel, type Section } from "@/lib/teas-blueprint";

/**
 * Milestone catalog (code-authored) + award engine. Milestones are mature and
 * subtle: earning is a quiet, permanent record, not a confetti burst. Awarding
 * is idempotent (unique userId+achievementId) and derived entirely from the
 * source logs, so it can be re-run safely after any graded attempt.
 */

export interface AchievementDef {
  id: string;
  title: string;
  description: string;
  category: "milestone" | "journey" | "personal-best";
}

export const ACHIEVEMENTS: AchievementDef[] = [
  { id: "diagnostic-complete", title: "Diagnostic complete", description: "You took your first diagnostic and set a baseline.", category: "milestone" },
  { id: "baseline-established", title: "Baseline established", description: "All four sections diagnosed — your permanent starting point is set.", category: "journey" },
  { id: "first-skill-completed", title: "First skill completed", description: "Lesson, quick checks, and skill quiz — one skill fully done.", category: "milestone" },
  { id: "first-skill-mastered", title: "First skill mastered", description: "Sustained, confident accuracy on a skill.", category: "milestone" },
  { id: "first-subject-quiz", title: "First subject quiz", description: "You completed your first focused skill quiz.", category: "milestone" },
  { id: "first-full-simulation", title: "First full simulation", description: "You sat a complete realistic TEAS simulation.", category: "milestone" },
  { id: "improved-five-points", title: "Improved five points", description: "Your latest exam is five points above your baseline.", category: "personal-best" },
  { id: "completed-mathematics", title: "Completed Mathematics", description: "Every Math skill finished.", category: "milestone" },
  { id: "cleared-weekly-reviews", title: "Cleared your reviews", description: "You worked through every review that was due.", category: "milestone" },
  { id: "above-target", title: "Above target", description: "You scored at or above your target on an exam.", category: "personal-best" },
];

const ACHIEVEMENT_IDS = new Set(ACHIEVEMENTS.map((a) => a.id));

interface AwardContext {
  diagnosticFinished: number;
  baselineSections: number;
  skillsCompleted: number;
  skillsMastered: number;
  quizCompleted: number;
  mockCount: number;
  mathCompleted: number;
  mathRequired: number;
  reviewsDue: number;
  everHadReviews: boolean;
  baselineAggregate: number | null;
  bestExamPct: number | null;
  target: number;
}

/** Evaluate every milestone against the context; returns the earned ids. */
function earnedIds(ctx: AwardContext): string[] {
  const earned: string[] = [];
  const add = (id: string, when: boolean) => {
    if (when) earned.push(id);
  };
  add("diagnostic-complete", ctx.diagnosticFinished > 0);
  add("baseline-established", ctx.baselineSections >= SECTION_ORDER.length);
  add("first-skill-completed", ctx.skillsCompleted > 0);
  add("first-skill-mastered", ctx.skillsMastered > 0);
  add("first-subject-quiz", ctx.quizCompleted > 0);
  add("first-full-simulation", ctx.mockCount > 0);
  add(
    "improved-five-points",
    ctx.baselineAggregate != null && ctx.bestExamPct != null && ctx.bestExamPct - ctx.baselineAggregate >= 5,
  );
  add("completed-mathematics", ctx.mathRequired > 0 && ctx.mathCompleted >= ctx.mathRequired);
  add("cleared-weekly-reviews", ctx.everHadReviews && ctx.reviewsDue === 0);
  add("above-target", ctx.bestExamPct != null && ctx.bestExamPct >= ctx.target);
  return earned;
}

/** Load the award context from source logs + progress caches. */
async function loadContext(userId: string): Promise<AwardContext> {
  const mathSkillIds = new Set(SKILL_NODES.filter((n) => n.sectionId === "MATH").map((n) => n.skillId));

  const [skillProgress, diagnostics, mocks, quizzes, baselines, reviewAgg, dueReviews, user] =
    await Promise.all([
      db.userSkillProgress.findMany({
        where: { userId },
        select: { skillId: true, section: true, completed: true, masteryState: true },
      }),
      db.attempt.count({ where: { userId, mode: "DIAGNOSTIC", finishedAt: { not: null } } }),
      db.attempt.findMany({
        where: { userId, mode: "MOCK", finishedAt: { not: null }, scorePct: { not: null } },
        select: { scorePct: true },
      }),
      db.attempt.count({ where: { userId, mode: "PRACTICE", finishedAt: { not: null } } }),
      db.sectionBaseline.findMany({ where: { userId }, select: { section: true, scorePct: true } }),
      db.questionReview.count({ where: { userId } }),
      db.questionReview.count({ where: { userId, dueDate: { lte: new Date() } } }),
      db.user.findUnique({ where: { id: userId }, select: { targetScore: true } }),
    ]);

  const skillsCompleted = skillProgress.filter((s) => s.completed).length;
  const skillsMastered = skillProgress.filter((s) => s.masteryState === "MASTERED").length;
  const mathCompleted = skillProgress.filter((s) => s.completed && mathSkillIds.has(s.skillId)).length;

  const bestMock = mocks.reduce<number | null>(
    (best, m) => (m.scorePct == null ? best : Math.max(best ?? 0, Math.round(m.scorePct))),
    null,
  );

  // baseline aggregate = blueprint-weighted mean of captured section baselines
  const { BLUEPRINT } = await import("@/lib/teas-blueprint");
  let baselineAggregate: number | null = null;
  if (baselines.length > 0) {
    const totalScored = baselines.reduce((n, b) => n + BLUEPRINT[b.section as Section].scored, 0);
    const weighted = baselines.reduce((n, b) => n + b.scorePct * BLUEPRINT[b.section as Section].scored, 0);
    baselineAggregate = totalScored > 0 ? Math.round(weighted / totalScored) : null;
  }

  return {
    diagnosticFinished: diagnostics,
    baselineSections: baselines.length,
    skillsCompleted,
    skillsMastered,
    quizCompleted: quizzes,
    mockCount: mocks.length,
    mathCompleted,
    mathRequired: mathSkillIds.size,
    reviewsDue: dueReviews,
    everHadReviews: reviewAgg > 0,
    baselineAggregate,
    bestExamPct: bestMock,
    target: user?.targetScore ?? 70,
  };
}

/**
 * Award any newly-earned milestones. Returns the ids awarded THIS call (for a
 * subtle post-attempt celebration). Never throws into the caller's critical
 * path — failures are logged.
 */
export async function awardAchievements(userId: string): Promise<string[]> {
  try {
    const ctx = await loadContext(userId);
    const eligible = earnedIds(ctx).filter((id) => ACHIEVEMENT_IDS.has(id));
    if (eligible.length === 0) return [];

    const existing = new Set(
      (await db.userAchievement.findMany({ where: { userId }, select: { achievementId: true } })).map(
        (r) => r.achievementId,
      ),
    );
    const fresh = eligible.filter((id) => !existing.has(id));
    if (fresh.length === 0) return [];

    await db.userAchievement.createMany({
      data: fresh.map((achievementId) => ({ userId, achievementId })),
      skipDuplicates: true,
    });
    return fresh;
  } catch (err) {
    console.error("awardAchievements failed", err);
    return [];
  }
}

export interface EarnedAchievement extends AchievementDef {
  earnedAt: Date;
}

export async function getAchievements(userId: string): Promise<{
  earned: EarnedAchievement[];
  locked: AchievementDef[];
}> {
  const rows = await db.userAchievement.findMany({
    where: { userId },
    orderBy: { earnedAt: "desc" },
    select: { achievementId: true, earnedAt: true },
  });
  const byId = new Map(rows.map((r) => [r.achievementId, r.earnedAt]));
  const earned: EarnedAchievement[] = [];
  const locked: AchievementDef[] = [];
  for (const def of ACHIEVEMENTS) {
    const at = byId.get(def.id);
    if (at) earned.push({ ...def, earnedAt: at });
    else locked.push(def);
  }
  earned.sort((a, b) => b.earnedAt.getTime() - a.earnedAt.getTime());
  return { earned, locked };
}

export { sectionLabel };
