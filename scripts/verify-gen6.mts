/**
 * Blind verification for wave-6 questions (scratchpad/gen6-*.json).
 *  --blind : write blind6-<file>.json (ref/type/stem/options, NO key) + keys6.json
 *  --diff  : compare verdict6-*.json ([{ref, answer}]) to keys6.json
 * ref = "<gen2 file basename>#<index>".
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const SCRATCH =
  "/tmp/claude-1000/-home-vardan/daa678ad-173e-4625-9462-0f4b3c9f05ed/scratchpad";

const files = () =>
  readdirSync(SCRATCH).filter((f) => f.startsWith("gen6-") && f.endsWith(".json")).sort();

const sameSet = (a: number[], b: number[]) =>
  a.length === b.length && new Set(a).size === new Set([...a, ...b]).size;
const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");

if (process.argv.includes("--blind")) {
  const keys: Record<string, { type: string; correct: unknown }> = {};
  for (const file of files()) {
    const arr = JSON.parse(readFileSync(join(SCRATCH, file), "utf8"));
    const topic = file.replace(/^gen6-/, "").replace(/\.json$/, "");
    const blind = arr.map((q: Record<string, unknown>, i: number) => {
      const ref = `${file}#${i}`;
      keys[ref] = { type: (q.type as string) ?? "SINGLE", correct: q.correct };
      return { ref, type: (q.type as string) ?? "SINGLE", stem: q.stem, options: q.options };
    });
    writeFileSync(join(SCRATCH, `blind6-${topic}.json`), JSON.stringify(blind, null, 2));
  }
  writeFileSync(join(SCRATCH, "keys6.json"), JSON.stringify(keys));
  console.log(`Blinded ${Object.keys(keys).length} wave-6 items across ${files().length} files.`);
}

if (process.argv.includes("--diff")) {
  const keys = JSON.parse(readFileSync(join(SCRATCH, "keys6.json"), "utf8")) as Record<
    string,
    { type: string; correct: unknown }
  >;
  const verdicts: Record<string, unknown> = {};
  for (const f of readdirSync(SCRATCH).filter((f) => f.startsWith("verdict6-") && f.endsWith(".json")))
    for (const v of JSON.parse(readFileSync(join(SCRATCH, f), "utf8"))) verdicts[v.ref] = v.answer;

  let agree = 0;
  const mism: string[] = [];
  const missing: string[] = [];
  for (const ref of Object.keys(keys)) {
    if (!(ref in verdicts)) { missing.push(ref); continue; }
    const { type, correct } = keys[ref];
    const got = verdicts[ref];
    let ok = false;
    if (type === "FILL_BLANK") ok = typeof got === "string" && (correct as string[]).map(norm).includes(norm(got));
    else if (type === "ORDERED") ok = Array.isArray(got) && JSON.stringify(got) === JSON.stringify(correct);
    else if (type === "MULTI") ok = Array.isArray(got) && sameSet(got as number[], correct as number[]);
    else { const g = Array.isArray(got) ? (got as number[]) : [got as number]; ok = sameSet(g, correct as number[]); }
    if (ok) agree++;
    else mism.push(`${ref}: key=${JSON.stringify(correct)} verifier=${JSON.stringify(got)}`);
  }
  console.log(`Agree: ${agree}/${Object.keys(keys).length}  Mismatches: ${mism.length}  Unverified: ${missing.length}`);
  for (const m of mism) console.log("  DISPUTED  " + m);
  if (missing.length) console.log("  not verified: " + missing.join(", "));
}
