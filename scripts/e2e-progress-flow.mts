import "dotenv/config";
import { db } from "../src/lib/db";
import {
  startAttempt,
  submitAttempt,
  startSectionDiagnostic,
  startMock,
  getResumableMock,
  saveAttemptItem,
} from "../src/lib/quiz/attempt";
import { recomputeProgress } from "../src/lib/progress/recompute";
import { getGamificationSummary } from "../src/lib/gamification/summary";
import { getAchievements } from "../src/lib/gamification/achievements";
import { getSkillProgress } from "../src/lib/progress/read";
import { slugifySkill } from "../src/content/skills";
import { quickCheckKeysForSlug } from "../src/content/guided-lessons";
import type { Answer } from "../src/lib/quiz/types";

/**
 * End-to-end verification of the progress/assessment/gamification system: drives
 * the real service code through completion → mastery → baseline → exam → gamification
 * against a throwaway user, asserting the cross-cutting behavior, then cleans up.
 *
 *   npx tsx scripts/e2e-progress-flow.mts
 */
const EMAIL = "e2e-verify@test.local";
const SKILL_NAME = "Solve Equations in One Variable";
const SKILL_ID = "numbers-algebra:solve-equations-in-one-variable";

let passed = 0;
let failed = 0;
function check(label: string, cond: boolean, detail = "") {
  if (cond) {
    passed++;
    console.log(`  ✓ ${label}`);
  } else {
    failed++;
    console.log(`  ✗ ${label}${detail ? `  — ${detail}` : ""}`);
  }
}

/** Build correct answers for an attempt's questions from the stored key. */
async function correctAnswers(ids: string[]): Promise<Record<string, Answer>> {
  const rows = await db.question.findMany({
    where: { id: { in: ids } },
    select: { id: true, type: true, correct: true },
  });
  const answers: Record<string, Answer> = {};
  for (const r of rows) {
    answers[r.id] =
      r.type === "FILL_BLANK"
        ? ((r.correct as string[])[0] ?? "")
        : (r.correct as number[]);
  }
  return answers;
}
const conf3 = (ids: string[]) => Object.fromEntries(ids.map((id) => [id, 3]));

async function cleanup(userId: string) {
  // QuestionExposure has no user FK relation, so delete it explicitly; the rest
  // cascade from User.
  await db.questionExposure.deleteMany({ where: { userId } });
  await db.user.delete({ where: { id: userId } }).catch(() => {});
}

async function main() {
  // fresh start
  const prior = await db.user.findUnique({ where: { email: EMAIL }, select: { id: true } });
  if (prior) await cleanup(prior.id);

  const user = await db.user.create({
    data: { email: EMAIL, name: "E2E Verify", targetScore: 70, studyDaysPerWeek: 4 },
    select: { id: true },
  });
  const userId = user.id;
  console.log(`\nE2E progress flow — user ${userId}\n`);

  try {
    // ── 1. Skill quiz → mastery + skillQuizDone ─────────────────────────────
    console.log("1. Skill quiz drives mastery + quiz completion");
    const quiz = await startAttempt(userId, "PRACTICE", 6, { subtopic: SKILL_NAME });
    const quizIds = quiz.questions.map((q) => q.id);
    check("skill quiz drew questions", quizIds.length >= 4, `got ${quizIds.length}`);
    await submitAttempt(userId, quiz.attemptId, await correctAnswers(quizIds), [], conf3(quizIds));

    let skills = await getSkillProgress(userId, "MATH");
    let row = skills.find((s) => s.skillId === SKILL_ID)!;
    check("skill quiz recorded (skillQuizDone)", row.skillQuizDone);
    check("latest quiz is 100%", row.latestQuizPct === 100, `got ${row.latestQuizPct}`);
    check(
      "mastery is PROFICIENT (strong, but not yet MASTERED without spaced review)",
      row.masteryState === "PROFICIENT",
      `got ${row.masteryState}`,
    );
    check("not completed yet (lesson/checks pending)", row.completed === false);

    // ── 2. Lesson + quick checks → skill completed ──────────────────────────
    console.log("2. Lesson + quick checks complete the skill");
    await db.lessonCompletion.create({
      data: { userId, lessonId: SKILL_ID, skillId: SKILL_ID, section: "MATH" },
    });
    const keys = quickCheckKeysForSlug(slugifySkill(SKILL_NAME));
    for (const checkKey of keys) {
      await db.quickCheckAttempt.create({
        data: { userId, skillId: SKILL_ID, lessonId: SKILL_ID, checkKey, isCorrect: true },
      });
    }
    await recomputeProgress(userId);
    skills = await getSkillProgress(userId, "MATH");
    row = skills.find((s) => s.skillId === SKILL_ID)!;
    check("lesson marked done", row.lessonDone);
    check(
      "all quick checks attempted",
      row.quickChecksDone === row.quickChecksTotal,
      `${row.quickChecksDone}/${row.quickChecksTotal}`,
    );
    check("skill now COMPLETED (lesson + checks + quiz)", row.completed === true);

    // ── 3. Section diagnostic → permanent baseline ──────────────────────────
    console.log("3. Section diagnostic captures a preserved baseline");
    const diag = await startSectionDiagnostic(userId, "MATH");
    const diagIds = diag.questions.map((q) => q.id);
    await submitAttempt(userId, diag.attemptId, await correctAnswers(diagIds), [], conf3(diagIds));
    const baseline = await db.sectionBaseline.findUnique({
      where: { userId_section: { userId, section: "MATH" } },
    });
    check("MATH baseline captured", baseline != null);
    check("baseline score is 100%", baseline?.scorePct === 100, `got ${baseline?.scorePct}`);
    // retake must not overwrite it
    const diag2 = await startSectionDiagnostic(userId, "MATH");
    const diag2Ids = diag2.questions.map((q) => q.id);
    const wrong = Object.fromEntries(diag2Ids.map((id) => [id, 999 as unknown as Answer]));
    await submitAttempt(userId, diag2.attemptId, wrong, [], {});
    const baseline2 = await db.sectionBaseline.findUnique({
      where: { userId_section: { userId, section: "MATH" } },
    });
    check("baseline preserved after a worse retake", baseline2?.scorePct === 100, `got ${baseline2?.scorePct}`);

    // ── 4. Mock autosave + resume + exposure ────────────────────────────────
    console.log("4. Mock autosave, resume, and exposure cooldown");
    const mock = await startMock(userId);
    const firstQ = mock.sections[0]?.questions[0];
    check("mock built sections", mock.sections.length >= 1);
    if (firstQ) {
      await saveAttemptItem(userId, mock.attemptId, firstQ.id, { selected: [0] as Answer, flagged: true });
      const resume = await getResumableMock(userId);
      check("in-progress mock is resumable", resume?.attemptId === mock.attemptId);
      check("autosaved answer restored on resume", resume?.answers[firstQ.id] != null);
      check("autosaved flag restored on resume", resume?.flagged.includes(firstQ.id) ?? false);
    }
    const exposureCount = await db.questionExposure.count({ where: { userId } });
    check("mock recorded question exposure", exposureCount > 0, `got ${exposureCount}`);

    // ── 5. Gamification ─────────────────────────────────────────────────────
    console.log("5. Gamification: milestones, journey, points");
    await recomputeProgress(userId); // ensure awards run after all activity
    const gam = await getGamificationSummary(userId);
    check("journey advanced past baseline", gam.journey.stageIndex >= 1, `stage ${gam.journey.stageIndex}`);
    check("points are positive", gam.points > 0, `got ${gam.points}`);
    check("a recent win is surfaced", gam.recentWin != null);
    const ach = await getAchievements(userId);
    const earnedIds = ach.earned.map((a) => a.id);
    check("earned: diagnostic-complete", earnedIds.includes("diagnostic-complete"));
    check("earned: first-skill-completed", earnedIds.includes("first-skill-completed"));
    check("earned: first-subject-quiz", earnedIds.includes("first-subject-quiz"));
  } finally {
    await cleanup(userId);
    console.log(`\ncleaned up user ${userId}`);
  }

  console.log(`\n${failed === 0 ? "ALL PASSED" : "FAILURES"} — ${passed} passed, ${failed} failed\n`);
  process.exit(failed === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
