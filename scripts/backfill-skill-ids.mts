import "dotenv/config";
import { db } from "../src/lib/db";
import { resolveSkill } from "../src/content/taxonomy";

/**
 * Backfill Question.skillId / lessonId from the free-text subtopic, using the
 * taxonomy resolver (exact → normalized → override). Idempotent: re-running
 * only rewrites rows whose resolved id differs. Reports every subtopic that
 * did not resolve so it can be triaged (mapped, or intentionally left null).
 *
 *   npx tsx scripts/backfill-skill-ids.mts           # apply
 *   npx tsx scripts/backfill-skill-ids.mts --dry     # report only
 */
const DRY = process.argv.includes("--dry");

async function main() {
  const rows = await db.question.findMany({
    select: { id: true, section: true, topic: true, subtopic: true, skillId: true, lessonId: true },
  });

  let mapped = 0;
  let updated = 0;
  let alreadyOk = 0;
  let nullSubtopic = 0;
  const unmapped = new Map<string, number>();
  const topicMismatch = new Map<string, number>();

  for (const r of rows) {
    if (!r.subtopic) {
      nullSubtopic += 1;
      continue;
    }
    const node = resolveSkill(r.subtopic);
    if (!node) {
      const k = `${r.section}/${r.topic} :: ${r.subtopic}`;
      unmapped.set(k, (unmapped.get(k) ?? 0) + 1);
      continue;
    }
    mapped += 1;
    // Report (do not block) rows whose stored topic differs from the skill's
    // canonical topic — a content placement smell worth surfacing.
    if (node.topicId !== r.topic) {
      const k = `${r.section}/${r.topic} :: ${r.subtopic} -> canonical ${node.topicId}`;
      topicMismatch.set(k, (topicMismatch.get(k) ?? 0) + 1);
    }
    if (r.skillId === node.skillId && r.lessonId === node.lessonId) {
      alreadyOk += 1;
      continue;
    }
    if (!DRY) {
      await db.question.update({
        where: { id: r.id },
        data: { skillId: node.skillId, lessonId: node.lessonId },
      });
    }
    updated += 1;
  }

  console.log(`\n${DRY ? "[DRY RUN] " : ""}Backfill Question.skillId/lessonId`);
  console.log(`  total rows      ${rows.length}`);
  console.log(`  mapped          ${mapped}`);
  console.log(`  ${DRY ? "would update" : "updated     "}    ${updated}`);
  console.log(`  already correct ${alreadyOk}`);
  console.log(`  null subtopic   ${nullSubtopic} (topic-only questions; skillId stays null by design)`);
  console.log(`  unmapped        ${[...unmapped.values()].reduce((a, b) => a + b, 0)} rows / ${unmapped.size} distinct`);
  for (const [k, n] of [...unmapped].sort((a, b) => b[1] - a[1])) console.log(`    [${n}] ${k}`);
  if (topicMismatch.size > 0) {
    console.log(`  topic mismatches (report only, resolved to canonical topic):`);
    for (const [k, n] of [...topicMismatch].sort((a, b) => b[1] - a[1])) console.log(`    [${n}] ${k}`);
  }
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
