/**
 * Independent-verification harness for the authored seed questions.
 *
 *  --blind : read scratchpad/gen-*.json, write scratchpad/blind-<topic>.json
 *            (ref + type + stem + options, NO key/explanation) and a private
 *            scratchpad/keys.json mapping ref -> correct. Verifier agents solve
 *            the blind files with zero anchoring on the intended answer.
 *
 *  --diff  : read scratchpad/verdict-*.json (each [{ref, answer}]) and compare
 *            to keys.json. Report every mismatch / unsolved item for human fix.
 *
 * A "ref" is "<genFileBasename>#<index>" so fixes map back to the source file.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const SCRATCH =
  "/tmp/claude-1000/-home-vardan/daa678ad-173e-4625-9462-0f4b3c9f05ed/scratchpad";

function genFiles() {
  return readdirSync(SCRATCH)
    .filter((f) => f.startsWith("gen-") && f.endsWith(".json"))
    .sort();
}

function sameSet(a: number[], b: number[]) {
  if (a.length !== b.length) return false;
  const s = new Set(a);
  return b.every((x) => s.has(x));
}
function norm(s: string) {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

if (process.argv.includes("--blind")) {
  const keys: Record<string, { type: string; correct: unknown }> = {};
  for (const file of genFiles()) {
    const arr = JSON.parse(readFileSync(join(SCRATCH, file), "utf8"));
    const topic = file.replace(/^gen-/, "").replace(/\.json$/, "");
    const blind = arr.map((q: Record<string, unknown>, i: number) => {
      const ref = `${file}#${i}`;
      keys[ref] = { type: (q.type as string) ?? "SINGLE", correct: q.correct };
      return {
        ref,
        type: (q.type as string) ?? "SINGLE",
        stem: q.stem,
        options: q.options,
      };
    });
    writeFileSync(join(SCRATCH, `blind-${topic}.json`), JSON.stringify(blind, null, 2));
  }
  writeFileSync(join(SCRATCH, "keys.json"), JSON.stringify(keys));
  console.log(`Blinded ${Object.keys(keys).length} items across ${genFiles().length} topics.`);
}

if (process.argv.includes("--diff")) {
  const keys = JSON.parse(readFileSync(join(SCRATCH, "keys.json"), "utf8")) as Record<
    string,
    { type: string; correct: unknown }
  >;
  const verdicts: Record<string, unknown> = {};
  for (const f of readdirSync(SCRATCH).filter((f) => f.startsWith("verdict-") && f.endsWith(".json"))) {
    const arr = JSON.parse(readFileSync(join(SCRATCH, f), "utf8"));
    for (const v of arr) verdicts[v.ref] = v.answer;
  }

  let agree = 0;
  const mismatches: string[] = [];
  const missing: string[] = [];
  for (const ref of Object.keys(keys)) {
    if (!(ref in verdicts)) {
      missing.push(ref);
      continue;
    }
    const { type, correct } = keys[ref];
    const got = verdicts[ref];
    let ok = false;
    if (type === "FILL_BLANK") {
      const acc = (correct as string[]).map(norm);
      ok = typeof got === "string" && acc.includes(norm(got));
    } else if (type === "ORDERED") {
      ok = Array.isArray(got) && JSON.stringify(got) === JSON.stringify(correct);
    } else if (type === "MULTI") {
      ok = Array.isArray(got) && sameSet(got as number[], correct as number[]);
    } else {
      const g = Array.isArray(got) ? (got as number[]) : [got as number];
      ok = sameSet(g, correct as number[]);
    }
    if (ok) agree++;
    else mismatches.push(`${ref}: key=${JSON.stringify(correct)} verifier=${JSON.stringify(got)}`);
  }

  console.log(`Agree: ${agree}/${Object.keys(keys).length}`);
  console.log(`Mismatches: ${mismatches.length}  Unverified: ${missing.length}`);
  if (mismatches.length) {
    console.log("\n--- DISPUTED (review each) ---");
    for (const m of mismatches) console.log("  " + m);
  }
  if (missing.length) {
    console.log("\n--- NOT VERIFIED ---");
    for (const m of missing) console.log("  " + m);
  }
}

if (!process.argv.includes("--blind") && !process.argv.includes("--diff")) {
  console.log("Use --blind or --diff");
}
void existsSync;
