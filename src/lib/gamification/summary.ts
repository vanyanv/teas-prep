import { db } from "@/lib/db";
import { SKILL_NODES } from "@/content/taxonomy";
import { MASTERY_LABEL } from "@/lib/progress/read";
import { getBaseline } from "@/lib/progress/baseline";

/**
 * Mature, derived gamification. Everything here is computed from the source
 * logs and progress caches — no separate counters that can drift. Points are a
 * pure function of durable states (completion, mastery, milestones) and capped
 * activity, so they can't be farmed by repeating easy content.
 */

export const JOURNEY_STAGES = [
  "Baseline Established",
  "Foundations Building",
  "Skills Developing",
  "Section Proficiency",
  "Exam Simulation",
  "Final Review",
] as const;

export interface GamificationSummary {
  journey: { stageIndex: number; stageName: string | null; stages: readonly string[] };
  consistency: { studiedDays: number; window: number };
  weeklyGoal: { studyDaysDone: number; studyDaysTarget: number; sessionsDone: number; reviewsDone: number };
  points: number;
  personalBests: { label: string; value: string }[];
  recentWin: { label: string } | null;
  achievementsEarned: number;
}

const nodeName = new Map(SKILL_NODES.map((n) => [n.skillId, n.name]));

function startOfWeek(now: Date): Date {
  const d = new Date(now);
  d.setHours(0, 0, 0, 0);
  const day = (d.getDay() + 6) % 7; // Monday = 0
  d.setDate(d.getDate() - day);
  return d;
}

function dayKey(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

export async function getGamificationSummary(userId: string): Promise<GamificationSummary> {
  const now = new Date();
  const weekStart = startOfWeek(now);
  const sevenAgo = new Date(now.getTime() - 7 * 86_400_000);

  const [
    recentAttempts,
    skillProgress,
    sectionProgress,
    lessonsDone,
    diagnosticFinished,
    mocks,
    bestQuizAgg,
    quizCount,
    achievementsEarned,
    user,
    baseline,
  ] = await Promise.all([
    db.attempt.findMany({
      where: { userId, startedAt: { gte: sevenAgo } },
      select: { startedAt: true, finishedAt: true, config: true },
    }),
    db.userSkillProgress.findMany({
      where: { userId },
      select: { skillId: true, completed: true, masteryState: true, masteryPct: true },
    }),
    db.userSectionProgress.findMany({
      where: { userId },
      select: { skillsCompleted: true, skillsRequired: true },
    }),
    db.lessonCompletion.count({ where: { userId } }),
    db.attempt.count({ where: { userId, mode: "DIAGNOSTIC", finishedAt: { not: null } } }),
    db.attempt.findMany({
      where: { userId, mode: "MOCK", finishedAt: { not: null }, scorePct: { not: null } },
      select: { scorePct: true },
    }),
    db.attempt.aggregate({
      where: { userId, mode: "PRACTICE", finishedAt: { not: null } },
      _max: { scorePct: true },
    }),
    db.attempt.count({ where: { userId, mode: "PRACTICE", finishedAt: { not: null } } }),
    db.userAchievement.count({ where: { userId } }),
    db.user.findUnique({ where: { id: userId }, select: { targetScore: true, studyDaysPerWeek: true } }),
    getBaseline(userId),
  ]);

  // Consistency: distinct study days in the last 7.
  const daysLast7 = new Set(recentAttempts.map((a) => dayKey(a.startedAt)));

  // Weekly goal: activity since Monday.
  const thisWeek = recentAttempts.filter((a) => a.startedAt >= weekStart);
  const weekDays = new Set(thisWeek.map((a) => dayKey(a.startedAt)));
  const sessionsDone = thisWeek.filter((a) => a.finishedAt != null).length;
  const reviewsDone = thisWeek.filter(
    (a) => a.finishedAt != null && (a.config as { variant?: string } | null)?.variant === "review",
  ).length;

  const skillsCompleted = skillProgress.filter((s) => s.completed).length;
  const skillsMastered = skillProgress.filter((s) => s.masteryState === "MASTERED").length;
  const anySectionCompleted = sectionProgress.some(
    (s) => s.skillsRequired > 0 && s.skillsCompleted >= s.skillsRequired,
  );
  const bestMock = mocks.reduce<number | null>(
    (best, m) => (m.scorePct == null ? best : Math.max(best ?? 0, Math.round(m.scorePct))),
    null,
  );
  const bestQuiz = bestQuizAgg._max.scorePct != null ? Math.round(bestQuizAgg._max.scorePct) : null;
  const target = user?.targetScore ?? 70;

  // Readiness journey — furthest stage reached (derived, monotonic-ish).
  const conditions = [
    diagnosticFinished > 0, // Baseline Established
    skillsCompleted >= 1, // Foundations Building
    skillsCompleted >= 5, // Skills Developing
    anySectionCompleted || skillsMastered >= 5, // Section Proficiency
    mocks.length >= 1, // Exam Simulation
    bestMock != null && bestMock >= target - 5, // Final Review
  ];
  // Cumulative: you're at stage i only if every milestone up to i is met, so a
  // strong early mock can't skip you past the learning you haven't done yet.
  let stageIndex = -1;
  for (let i = 0; i < conditions.length; i++) {
    if (!conditions[i]) break;
    stageIndex = i;
  }

  // Points — pure function of durable states + capped activity (anti-farming).
  const points =
    lessonsDone * 5 +
    skillsCompleted * 10 +
    skillsMastered * 20 +
    achievementsEarned * 15 +
    Math.min(mocks.length, 10) * 30 +
    Math.min(quizCount, 50) * 5;

  // Personal bests.
  const personalBests: { label: string; value: string }[] = [];
  if (bestMock != null) personalBests.push({ label: "Best simulation", value: `${bestMock}%` });
  if (bestQuiz != null) personalBests.push({ label: "Best quiz", value: `${bestQuiz}%` });
  if (bestMock != null && baseline.aggregate != null) {
    const delta = bestMock - baseline.aggregate;
    personalBests.push({ label: "Above baseline", value: `${delta >= 0 ? "+" : ""}${delta}%` });
  }

  // One recent win: the strongest developed skill.
  const developed = skillProgress
    .filter((s) => s.masteryPct != null && s.masteryState !== "NOT_STARTED" && s.masteryState !== "LEARNING")
    .sort((a, b) => (b.masteryPct ?? 0) - (a.masteryPct ?? 0));
  const win = developed[0];
  const recentWin = win
    ? { label: `${nodeName.get(win.skillId) ?? "A skill"} — ${MASTERY_LABEL[win.masteryState]}` }
    : null;

  return {
    journey: {
      stageIndex,
      stageName: stageIndex >= 0 ? JOURNEY_STAGES[stageIndex] : null,
      stages: JOURNEY_STAGES,
    },
    consistency: { studiedDays: daysLast7.size, window: 7 },
    weeklyGoal: {
      studyDaysDone: weekDays.size,
      studyDaysTarget: user?.studyDaysPerWeek ?? 4,
      sessionsDone,
      reviewsDone,
    },
    points,
    personalBests,
    recentWin,
    achievementsEarned,
  };
}
