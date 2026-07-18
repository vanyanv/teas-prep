import "dotenv/config";
import { db } from "../src/lib/db";
import { captureBaseline } from "../src/lib/progress/baseline";
import type { Section } from "../src/lib/teas-blueprint";

/**
 * Backfill SectionBaseline from history: the earliest finished section
 * diagnostic per user+section becomes the permanent baseline. Idempotent —
 * captureBaseline no-ops when a baseline already exists.
 */
async function main() {
  const attempts = await db.attempt.findMany({
    where: { mode: "DIAGNOSTIC", finishedAt: { not: null }, scorePct: { not: null } },
    orderBy: { finishedAt: "asc" }, // earliest first → first seen per (user,section) wins
    select: { id: true, userId: true, scorePct: true, config: true },
  });

  const seen = new Set<string>();
  let captured = 0;
  for (const a of attempts) {
    const cfg = a.config as { variant?: string; section?: Section } | null;
    if (cfg?.variant !== "section" || !cfg.section) continue;
    const key = `${a.userId} ${cfg.section}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const ok = await captureBaseline(a.userId, cfg.section, a.id, a.scorePct as number);
    if (ok) captured += 1;
  }
  console.log(`Baselines: captured ${captured} (from ${attempts.length} finished diagnostics).`);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
