import { db } from "@/lib/db";
import { review, INITIAL_STATE, type Grade } from "@/lib/flashcards/sm2";

export interface DueCard {
  id: string;
  topic: string;
  front: string;
  back: string;
  /** current SRS state, so the UI can preview each grade's next interval */
  ease: number;
  intervalDays: number;
  reps: number;
}

/** Cards due now (review.dueDate <= now) plus never-seen cards, capped at limit. */
export async function getDueCards(
  userId: string,
  limit = 20,
): Promise<{ cards: DueCard[]; dueCount: number; newCount: number }> {
  const cards = await db.flashcard.findMany({
    where: { OR: [{ ownerId: null }, { ownerId: userId }] },
    select: { id: true, topic: true, front: true, back: true },
  });

  const reviews = await db.cardReview.findMany({
    where: { userId },
    select: { cardId: true, dueDate: true, ease: true, intervalDays: true, reps: true },
  });
  const byCard = new Map(reviews.map((r) => [r.cardId, r]));

  const now = Date.now();
  const seen: DueCard[] = [];
  const fresh: DueCard[] = [];
  for (const c of cards) {
    const r = byCard.get(c.id);
    if (r === undefined) {
      fresh.push({ ...c, ease: 2.5, intervalDays: 0, reps: 0 });
    } else if (r.dueDate.getTime() <= now) {
      seen.push({ ...c, ease: r.ease, intervalDays: r.intervalDays, reps: r.reps });
    }
  }

  // Due (previously seen) first, then new cards.
  const queue = [...seen, ...fresh].slice(0, limit);
  return { cards: queue, dueCount: seen.length, newCount: fresh.length };
}

export async function gradeCard(userId: string, cardId: string, grade: Grade) {
  const existing = await db.cardReview.findUnique({
    where: { userId_cardId: { userId, cardId } },
  });
  const state = existing
    ? {
        ease: existing.ease,
        intervalDays: existing.intervalDays,
        reps: existing.reps,
        lapses: existing.lapses,
      }
    : INITIAL_STATE;

  const next = review(state, grade, new Date());

  await db.cardReview.upsert({
    where: { userId_cardId: { userId, cardId } },
    create: {
      userId,
      cardId,
      ease: next.ease,
      intervalDays: next.intervalDays,
      reps: next.reps,
      lapses: next.lapses,
      dueDate: next.dueDate,
      lastReviewedAt: new Date(),
    },
    update: {
      ease: next.ease,
      intervalDays: next.intervalDays,
      reps: next.reps,
      lapses: next.lapses,
      dueDate: next.dueDate,
      lastReviewedAt: new Date(),
    },
  });
}
