import { db } from "@/lib/db";
import { review, INITIAL_STATE, type Grade } from "@/lib/flashcards/sm2";
import { gradeFromOutcome } from "@/lib/review/srs-grade";

export { gradeFromOutcome };

/**
 * Question-level spaced repetition. Reuses the flashcard SM-2 engine, but the
 * "grade" is derived from how the answer actually went (see `gradeFromOutcome`)
 * rather than self-graded, so missed material is re-queued until it sticks.
 */

/** Upsert a question's review state after it was answered. */
export async function recordQuestionReview(
  userId: string,
  questionId: string,
  grade: Grade,
  now: Date,
): Promise<void> {
  const existing = await db.questionReview.findUnique({
    where: { userId_questionId: { userId, questionId } },
  });
  const state = existing
    ? {
        ease: existing.ease,
        intervalDays: existing.intervalDays,
        reps: existing.reps,
        lapses: existing.lapses,
      }
    : INITIAL_STATE;

  const next = review(state, grade, now);
  const data = {
    ease: next.ease,
    intervalDays: next.intervalDays,
    reps: next.reps,
    lapses: next.lapses,
    dueDate: next.dueDate,
    lastReviewedAt: now,
  };

  await db.questionReview.upsert({
    where: { userId_questionId: { userId, questionId } },
    create: { userId, questionId, ...data },
    update: data,
  });
}

/**
 * Record reviews for a batch of just-graded items in one pass. Skips questions
 * the user got right while confident on the very first encounter only if they
 * have no prior review — i.e. everything answered gets scheduled, so the
 * "Today" queue always has the right material to resurface.
 */
export async function recordQuestionReviews(
  userId: string,
  items: { questionId: string; isCorrect: boolean; confidence: number | null }[],
  now: Date = new Date(),
): Promise<void> {
  for (const it of items) {
    await recordQuestionReview(
      userId,
      it.questionId,
      gradeFromOutcome(it.isCorrect, it.confidence),
      now,
    );
  }
}

/**
 * Question IDs due for review now (dueDate <= now), within the user's visible
 * pool (global seed + own imports), soonest-due first.
 */
export async function getDueQuestionIds(
  userId: string,
  now: Date = new Date(),
  limit = 100,
): Promise<string[]> {
  const due = await db.questionReview.findMany({
    where: {
      userId,
      dueDate: { lte: now },
      question: { OR: [{ ownerId: null }, { ownerId: userId }] },
    },
    orderBy: { dueDate: "asc" },
    select: { questionId: true },
    take: limit,
  });
  return due.map((r) => r.questionId);
}

/** How many questions are due right now (for the dashboard "Today" count). */
/** How many questions the user has bookmarked ("saved for review"). */
export async function getSavedQuestionCount(userId: string): Promise<number> {
  return db.questionReview.count({ where: { userId, saved: true } });
}

export async function getDueQuestionCount(
  userId: string,
  now: Date = new Date(),
): Promise<number> {
  return db.questionReview.count({
    where: {
      userId,
      dueDate: { lte: now },
      question: { OR: [{ ownerId: null }, { ownerId: userId }] },
    },
  });
}
