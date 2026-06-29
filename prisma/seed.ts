import "dotenv/config";
import { db } from "../src/lib/db";
import { QUESTIONS } from "../src/content/questions";
import { FLASHCARDS } from "../src/content/flashcards";

async function main() {
  // Idempotent: clear only global seed content (ownerId = null), keep any
  // user-imported private questions/cards intact.
  await db.question.deleteMany({ where: { ownerId: null, source: "original" } });
  await db.flashcard.deleteMany({ where: { ownerId: null, source: "original" } });

  let q = 0;
  for (const item of QUESTIONS) {
    await db.question.create({
      data: {
        section: item.section,
        topic: item.topic,
        subtopic: item.subtopic ?? null,
        difficulty: item.difficulty ?? 2,
        type: item.type ?? "SINGLE",
        stem: item.stem,
        options: item.options,
        correct: item.correct,
        explanation: item.explanation,
        images: item.images ?? undefined,
        hotspots: item.hotspots ?? undefined,
        source: "original",
        ownerId: null,
      },
    });
    q += 1;
  }

  let f = 0;
  for (const card of FLASHCARDS) {
    await db.flashcard.create({
      data: {
        topic: card.topic,
        front: card.front,
        back: card.back,
        source: "original",
        ownerId: null,
      },
    });
    f += 1;
  }

  console.log(`Seeded ${q} questions and ${f} flashcards.`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
