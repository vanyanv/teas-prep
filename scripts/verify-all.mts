/**
 * Third-pass adversarial verification over the ENTIRE served bank (all 309:
 * the 38 hand-authored + 271 generated, in final shuffled form), straight from
 * the seed module QUESTIONS — so what we verify is exactly what users get.
 *
 *  --blind : write scratchpad/blind-all-<section>-<topic>.json (ref/type/stem/
 *            options, NO key) + scratchpad/keys-all.json (ref -> {type,correct}).
 *            ref is the index into QUESTIONS, so a dispute maps straight back.
 *  --diff  : compare scratchpad/verdict-all-*.json to keys-all.json, list every
 *            disagreement for human adjudication.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import { QUESTIONS } from "../src/content/questions";

const SCRATCH =
  "/tmp/claude-1000/-home-vardan/daa678ad-173e-4625-9462-0f4b3c9f05ed/scratchpad";

function sameSet(a: number[], b: number[]) {
  if (a.length !== b.length) return false;
  const s = new Set(a);
  return b.every((x) => s.has(x));
}
function norm(s: string) {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

if (process.argv.includes("--blind")) {
  const keys: Record<number, { type: string; correct: unknown }> = {};
  const groups = new Map<string, unknown[]>();
  QUESTIONS.forEach((q, ref) => {
    const type = q.type ?? "SINGLE";
    keys[ref] = { type, correct: q.correct };
    const g = `${q.section}-${q.topic}`;
    if (!groups.has(g)) groups.set(g, []);
    groups.get(g)!.push({ ref, type, stem: q.stem, options: q.options });
  });
  for (const [g, items] of groups) {
    writeFileSync(join(SCRATCH, `blind-all-${g}.json`), JSON.stringify(items, null, 2));
  }
  writeFileSync(join(SCRATCH, "keys-all.json"), JSON.stringify(keys));
  console.log(`Blinded ${QUESTIONS.length} items into ${groups.size} groups.`);
  for (const [g, items] of groups) console.log(`  ${g}: ${items.length}`);
}

if (process.argv.includes("--diff")) {
  const keys = JSON.parse(readFileSync(join(SCRATCH, "keys-all.json"), "utf8")) as Record<
    string,
    { type: string; correct: unknown }
  >;
  const verdicts: Record<string, unknown> = {};
  for (const f of readdirSync(SCRATCH).filter((f) => f.startsWith("verdict-all-") && f.endsWith(".json"))) {
    for (const v of JSON.parse(readFileSync(join(SCRATCH, f), "utf8"))) verdicts[String(v.ref)] = v.answer;
  }
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
    else mism.push(`ref ${ref} (${QUESTIONS[+ref].section}/${QUESTIONS[+ref].topic}): key=${JSON.stringify(correct)} verifier=${JSON.stringify(got)}`);
  }
  console.log(`Agree: ${agree}/${Object.keys(keys).length}  Mismatches: ${mism.length}  Unverified: ${missing.length}`);
  for (const m of mism) console.log("  DISPUTED  " + m);
  if (missing.length) console.log("  not verified refs: " + missing.join(", "));
}
