export type TaskKind =
  | "STUDY"
  | "DRILL"
  | "TEST"
  | "FLASHCARD"
  | "REVIEW"
  | "SESSION"
  | "CHECK";

export interface PlanTaskDraft {
  dayOfWeek: number; // 0 = Mon .. 6 = Sun
  kind: TaskKind;
  section: null;
  topic: null;
  label: string;
  targetCount: number | null;
  durationMin: number | null;
}

export interface PlanWeekDraft {
  weekIndex: number;
  focus: string;
  tasks: PlanTaskDraft[];
}

export interface GenerateInput {
  weeks: number;
  daysPerWeek: number;
}

/** Approximate minutes for one adaptive session (review + micro-lesson + drill). */
export const SESSION_MINUTES = 25;
const FLASHCARD_MINUTES = 15;
const REVIEW_MINUTES = 45;
const CHECK_MINUTES = 35;
const MOCK_MINUTES = 210;

/** Spread n study days across Mon–Sat (Sunday is reserved for spaced review). */
function studyDayIndices(n: number): number[] {
  const days = Math.max(1, Math.min(n, 6));
  const all = [0, 1, 2, 3, 4, 5];
  if (days === 6) return all;
  const picked: number[] = [];
  for (let i = 0; i < days; i++) {
    picked.push(all[Math.round((i * 5) / Math.max(days - 1, 1))]);
  }
  return [...new Set(picked)];
}

/**
 * Deterministic week-by-week schedule of the session engine's own units. The
 * plan does not pre-assign topics: each daily session targets whatever is
 * weakest on the day it's taken, so the schedule and Today can never disagree.
 * Every week ends with spaced review; alternate weeks add a timed progress
 * check; the final phase tapers new content and adds full mock exams.
 */
export function generatePlan(input: GenerateInput): PlanWeekDraft[] {
  const weeks = Math.max(1, Math.min(input.weeks, 16));
  const daysPerWeek = Math.max(2, Math.min(input.daysPerWeek, 7));
  // Sunday is the review day; up to six days carry sessions.
  const sessionDays = Math.min(daysPerWeek, 6);

  const result: PlanWeekDraft[] = [];

  for (let w = 0; w < weeks; w++) {
    const isFinalPhase = weeks >= 2 && w >= weeks - 2;
    const isLastWeek = w === weeks - 1;
    const isCheckWeek = !isFinalPhase && w % 2 === 1;
    const tasks: PlanTaskDraft[] = [];

    const days = studyDayIndices(isFinalPhase ? Math.max(2, sessionDays - 1) : sessionDays);

    for (const day of days) {
      tasks.push({
        dayOfWeek: day,
        kind: "SESSION",
        section: null,
        topic: null,
        label: "Daily session: review + lesson + drill on your weakest area",
        targetCount: null,
        durationMin: SESSION_MINUTES,
      });
    }

    // A&P flashcard upkeep on up to three of the study days.
    for (const day of days.slice(0, 3)) {
      tasks.push({
        dayOfWeek: day,
        kind: "FLASHCARD",
        section: null,
        topic: null,
        label: "A&P flashcards review",
        targetCount: 15,
        durationMin: FLASHCARD_MINUTES,
      });
    }

    // Alternate weeks: a timed, mixed progress check to measure movement.
    if (isCheckWeek) {
      tasks.push({
        dayOfWeek: days.at(-1) ?? 5,
        kind: "CHECK",
        section: null,
        topic: null,
        label: "Progress check: 30 timed, mixed questions",
        targetCount: 30,
        durationMin: CHECK_MINUTES,
      });
    }

    // Final phase: a full timed mock exam.
    if (isFinalPhase) {
      tasks.push({
        dayOfWeek: 5,
        kind: "TEST",
        section: null,
        topic: null,
        label: isLastWeek
          ? "Full timed mock exam (final dress rehearsal)"
          : "Full timed mock exam",
        targetCount: null,
        durationMin: MOCK_MINUTES,
      });
    }

    // Weekly spaced review.
    tasks.push({
      dayOfWeek: 6,
      kind: "REVIEW",
      section: null,
      topic: null,
      label: "Spaced review: due questions you missed or were unsure about",
      targetCount: null,
      durationMin: REVIEW_MINUTES,
    });

    const focus = isLastWeek
      ? "Final review & mock"
      : isFinalPhase
        ? "Taper & dress rehearsal"
        : isCheckWeek
          ? "Weakest areas + progress check"
          : "Build your weakest areas";

    tasks.sort((a, b) => a.dayOfWeek - b.dayOfWeek);
    result.push({ weekIndex: w, focus, tasks });
  }

  return result;
}

export function weeksUntil(testDate: Date, from: Date): number {
  const ms = testDate.getTime() - from.getTime();
  return Math.max(1, Math.ceil(ms / (7 * 24 * 60 * 60 * 1000)));
}
