import "dotenv/config";
import { db } from "../src/lib/db";
import { recomputeProgress } from "../src/lib/progress/recompute";

/**
 * Rebuild the derived progress caches for every user (or one, with --user=<id>).
 * Safe to run anytime — the caches are pure projections of the source logs.
 *
 *   npx tsx scripts/recompute-progress.mts
 *   npx tsx scripts/recompute-progress.mts --user=<userId>
 */
async function main() {
  const only = process.argv.find((a) => a.startsWith("--user="))?.slice("--user=".length);
  const users = only
    ? [{ id: only }]
    : await db.user.findMany({
        where: { attempts: { some: {} } },
        select: { id: true },
      });

  console.log(`Recomputing progress for ${users.length} user(s)…`);
  let ok = 0;
  for (const u of users) {
    try {
      const r = await recomputeProgress(u.id);
      ok += 1;
      if (users.length <= 20) console.log(`  ${u.id}: ${r.skills} skills, ${r.sections} sections`);
    } catch (err) {
      console.error(`  ${u.id}: FAILED`, err);
    }
  }
  console.log(`Done. ${ok}/${users.length} succeeded.`);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
