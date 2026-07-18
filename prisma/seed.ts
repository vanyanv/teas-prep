import "dotenv/config";
import { db } from "../src/lib/db";
// Seed the native multi-format bank (single, multi-select, fill-in,
// ordered, hot-spot). The single-answer conversion in questions.single.ts
// (built by scripts/convert-to-single.mts) is retained for reference only.
import { QUESTIONS } from "../src/content/questions";
import { FLASHCARDS } from "../src/content/flashcards";
import { resolveSkill } from "../src/content/taxonomy";

// Reconciliation seed: AttemptItem and QuestionReview cascade-delete with
// their Question (same for CardReview/Flashcard), so a blanket
// deleteMany + recreate would wipe attempt history and SRS state. Instead,
// rows whose content still matches the bank keep their ids; only genuinely
// changed or removed items are deleted and recreated.

const json = (v: unknown) => JSON.stringify(v ?? null);

function questionKey(q: {
  section: string;
  topic: string;
  type?: string | null;
  stem: string;
  options: unknown;
  correct: unknown;
}) {
  return [q.section, q.topic, q.type ?? "SINGLE", q.stem, json(q.options), json(q.correct)].join("\u0000");
}

async function seedQuestions() {
  const existing = await db.question.findMany({
    where: { ownerId: null, source: "original" },
  });
  const pool = new Map<string, { id: string }[]>();
  for (const row of existing) {
    const k = questionKey(row);
    const list = pool.get(k) ?? [];
    list.push(row);
    pool.set(k, list);
  }

  let kept = 0;
  let created = 0;
  for (const item of QUESTIONS) {
    const k = questionKey(item);
    const node = resolveSkill(item.subtopic);
    const skillId = node?.skillId ?? null;
    const lessonId = node?.lessonId ?? null;
    const match = pool.get(k)?.shift();
    if (match) {
      // Content is identical; refresh the mutable metadata in place so the
      // row (and its attempt/review history) survives.
      await db.question.update({
        where: { id: match.id },
        data: {
          subtopic: item.subtopic ?? null,
          skillId,
          lessonId,
          difficulty: item.difficulty ?? 2,
          explanation: item.explanation,
          rationale: item.rationale ?? undefined,
          images: item.images ?? undefined,
          hotspots: item.hotspots ?? undefined,
        },
      });
      kept += 1;
    } else {
      await db.question.create({
        data: {
          section: item.section,
          topic: item.topic,
          subtopic: item.subtopic ?? null,
          skillId,
          lessonId,
          difficulty: item.difficulty ?? 2,
          type: item.type ?? "SINGLE",
          stem: item.stem,
          options: item.options,
          correct: item.correct,
          explanation: item.explanation,
          rationale: item.rationale ?? undefined,
          images: item.images ?? undefined,
          hotspots: item.hotspots ?? undefined,
          source: "original",
          ownerId: null,
        },
      });
      created += 1;
    }
  }

  const leftoverIds = [...pool.values()].flat().map((row) => row.id);
  if (leftoverIds.length > 0) {
    const orphanedAttempts = await db.attemptItem.count({
      where: { questionId: { in: leftoverIds } },
    });
    await db.question.deleteMany({ where: { id: { in: leftoverIds } } });
    console.log(
      `Questions: removed ${leftoverIds.length} outdated rows (cascading ${orphanedAttempts} attempt items).`,
    );
  }
  console.log(`Questions: kept ${kept}, created ${created}, total ${kept + created}.`);
}

function cardKey(c: { topic: string; front: string; back: string }) {
  return [c.topic, c.front, c.back].join("\u0000");
}

async function seedFlashcards() {
  const existing = await db.flashcard.findMany({
    where: { ownerId: null, source: "original" },
  });
  const pool = new Map<string, { id: string }[]>();
  for (const row of existing) {
    const k = cardKey(row);
    const list = pool.get(k) ?? [];
    list.push(row);
    pool.set(k, list);
  }

  let kept = 0;
  let created = 0;
  for (const card of FLASHCARDS) {
    const match = pool.get(cardKey(card))?.shift();
    if (match) {
      kept += 1;
    } else {
      await db.flashcard.create({
        data: {
          topic: card.topic,
          front: card.front,
          back: card.back,
          source: "original",
          ownerId: null,
        },
      });
      created += 1;
    }
  }

  const leftoverIds = [...pool.values()].flat().map((row) => row.id);
  if (leftoverIds.length > 0) {
    await db.flashcard.deleteMany({ where: { id: { in: leftoverIds } } });
    console.log(`Flashcards: removed ${leftoverIds.length} outdated rows.`);
  }
  console.log(`Flashcards: kept ${kept}, created ${created}, total ${kept + created}.`);
}

async function main() {
  await seedQuestions();
  await seedFlashcards();
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
