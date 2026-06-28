// SM-2 inspired spaced repetition with 4 Anki-style grades.

export type Grade = "again" | "hard" | "good" | "easy";

export interface ReviewState {
  ease: number; // ease factor, floor 1.3
  intervalDays: number;
  reps: number; // consecutive successful reviews
  lapses: number;
}

export interface NextReview extends ReviewState {
  dueDate: Date;
}

export const INITIAL_STATE: ReviewState = {
  ease: 2.5,
  intervalDays: 0,
  reps: 0,
  lapses: 0,
};

const MIN_EASE = 1.3;
const EASY_BONUS = 1.3;

function addDays(from: Date, days: number): Date {
  const d = new Date(from.getTime());
  d.setDate(d.getDate() + days);
  return d;
}

/**
 * Compute the next review state for a card given the user's grade.
 * `now` is injected so this stays pure and testable.
 */
export function review(state: ReviewState, grade: Grade, now: Date): NextReview {
  let { ease, intervalDays, reps, lapses } = state;

  if (grade === "again") {
    ease = Math.max(MIN_EASE, ease - 0.2);
    reps = 0;
    lapses += 1;
    intervalDays = 0; // relearn: due again today
    return { ease, intervalDays, reps, lapses, dueDate: now };
  }

  if (grade === "hard") {
    ease = Math.max(MIN_EASE, ease - 0.15);
    intervalDays = Math.max(1, Math.round((intervalDays || 1) * 1.2));
    reps += 1;
  } else if (grade === "good") {
    if (reps === 0) intervalDays = 1;
    else if (reps === 1) intervalDays = 6;
    else intervalDays = Math.round(intervalDays * ease);
    reps += 1;
  } else {
    // easy
    ease = ease + 0.15;
    if (reps === 0) intervalDays = Math.round(4 * EASY_BONUS);
    else if (reps === 1) intervalDays = Math.round(6 * EASY_BONUS);
    else intervalDays = Math.round(intervalDays * ease * EASY_BONUS);
    reps += 1;
  }

  intervalDays = Math.max(1, intervalDays);
  return { ease, intervalDays, reps, lapses, dueDate: addDays(now, intervalDays) };
}
