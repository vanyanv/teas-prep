/**
 * Wave-4 question integration. Reads scratchpad/gen4-*.json, validates, drops
 * any stem that duplicates an existing question (the committed bank) or another
 * wave-4 item, shuffles options, and emits src/content/questions.generated.4.ts
 * as GENERATED_QUESTIONS_4 (additive — leaves questions.generated.ts untouched).
 *
 * Usage: tsx scripts/build-seed-questions-2.mts [--write]
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import { SKILLS } from "../src/content/skills";
import { QUESTIONS as EXISTING } from "../src/content/questions";

const SCRATCH =
  "/tmp/claude-1000/-home-vardan/daa678ad-173e-4625-9462-0f4b3c9f05ed/scratchpad";
const OUT = "src/content/questions.generated.4.ts";
const SECTIONS = ["READING", "MATH", "SCIENCE", "ENGLISH"];
const TYPES = ["SINGLE", "MULTI", "FILL_BLANK", "ORDERED", "HOT_SPOT"];

const skillSet = new Map<string, Set<string>>();
for (const t of SKILLS) skillSet.set(`${t.section}:${t.topic}`, new Set(t.skills));

interface Item {
  section: string;
  topic: string;
  subtopic?: string;
  difficulty?: number;
  type?: string;
  stem: string;
  options: string[];
  correct: number[] | string[];
  explanation: string;
}

const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");
const isInt = (n: unknown): n is number => typeof n === "number" && Number.isInteger(n);
// Identity = stem + options, so same-stem/different-options items (e.g. the
// many "Which sentence is punctuated correctly?" items) are NOT false dupes.
const keyOf = (q: { stem: string; options?: string[] }) =>
  norm(q.stem) + "||" + (Array.isArray(q.options) ? q.options.map(norm).join("|") : "");

const errors: string[] = [];
const warnings: string[] = [];
const all: Item[] = [];
const seen = new Set<string>(EXISTING.map((q) => keyOf(q)));
let dropped = 0;

for (const file of readdirSync(SCRATCH).filter((f) => f.startsWith("gen4-") && f.endsWith(".json")).sort()) {
  let parsed: unknown;
  try {
    parsed = JSON.parse(readFileSync(join(SCRATCH, file), "utf8"));
  } catch (e) {
    errors.push(`${file}: invalid JSON — ${(e as Error).message}`);
    continue;
  }
  if (!Array.isArray(parsed)) {
    errors.push(`${file}: not an array`);
    continue;
  }
  parsed.forEach((raw, i) => {
    const where = `${file}[${i}]`;
    const q = raw as Item;
    const type = q.type ?? "SINGLE";
    if (!SECTIONS.includes(q.section)) errors.push(`${where}: bad section ${q.section}`);
    if (!TYPES.includes(type)) errors.push(`${where}: bad type ${type}`);
    if (typeof q.stem !== "string" || q.stem.trim().length < 8) errors.push(`${where}: stem too short`);
    if (typeof q.explanation !== "string" || q.explanation.trim().length < 8) errors.push(`${where}: explanation too short`);
    if (q.difficulty != null && ![1, 2, 3].includes(q.difficulty)) errors.push(`${where}: difficulty ${q.difficulty}`);
    const known = skillSet.get(`${q.section}:${q.topic}`);
    if (!known) errors.push(`${where}: unknown ${q.section}:${q.topic}`);
    else if (q.subtopic && !known.has(q.subtopic)) warnings.push(`${where}: subtopic not in skills — "${q.subtopic}"`);

    const opts = q.options ?? [];
    if (type === "FILL_BLANK") {
      const c = q.correct as string[];
      if (!Array.isArray(c) || c.length === 0 || c.some((s) => typeof s !== "string" || !s.trim()))
        errors.push(`${where}: FILL_BLANK correct must be non-empty strings`);
    } else {
      if (!Array.isArray(opts) || opts.length < 2) errors.push(`${where}: needs >=2 options`);
      if (opts.some((o) => typeof o !== "string" || !o.trim())) errors.push(`${where}: blank option`);
      const c = q.correct as number[];
      if (!Array.isArray(c) || c.some((n) => !isInt(n) || n < 0 || n >= opts.length)) errors.push(`${where}: correct out of range`);
      else if ((type === "SINGLE" || type === "HOT_SPOT") && c.length !== 1) errors.push(`${where}: ${type} needs exactly one correct`);
      else if (type === "MULTI" && (c.length < 1 || new Set(c).size !== c.length)) errors.push(`${where}: MULTI needs distinct indices`);
      else if (type === "ORDERED") {
        const sorted = [...c].sort((a, b) => a - b);
        if (c.length !== opts.length || sorted.some((v, k) => v !== k)) errors.push(`${where}: ORDERED must be a permutation`);
      }
    }
    const mangled = /\b(cm|mm|m|km|in|ft|yd|x|r|d)\d\b/i.exec(q.stem);
    if (mangled) warnings.push(`${where}: possible lost exponent near "${mangled[0]}"`);

    const key = keyOf(q);
    if (seen.has(key)) {
      dropped++;
      return; // true duplicate (same stem AND same options)
    }
    seen.add(key);
    all.push(q);
  });
}

const byTopic: Record<string, number> = {};
const bySub: Record<string, number> = {};
for (const q of all) {
  byTopic[`${q.section}/${q.topic}`] = (byTopic[`${q.section}/${q.topic}`] ?? 0) + 1;
  if (q.subtopic) bySub[q.subtopic] = (bySub[q.subtopic] ?? 0) + 1;
}
console.log(`Wave-4 new items: ${all.length}  (dropped ${dropped} duplicates)`);
console.log(`Errors: ${errors.length}  Warnings: ${warnings.length}`);
for (const [k, n] of Object.entries(byTopic).sort()) console.log(`  ${k.padEnd(34)} +${n}`);
for (const e of errors) console.log("  ERROR  " + e);
for (const w of warnings) console.log("  warn   " + w);

// ---- option shuffle (same deterministic scheme as wave 1) ----
function fnv(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function mulberry32(a: number) {
  return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
function shuffle(q: Item): Item {
  const type = q.type ?? "SINGLE";
  if (type === "FILL_BLANK" || !Array.isArray(q.options) || q.options.length < 2) return q;
  const n = q.options.length;
  const idx = [...Array(n).keys()];
  const rng = mulberry32(fnv(q.stem));
  for (let i = n - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
  const o2n = Array(n);
  idx.forEach((oldI, newI) => (o2n[oldI] = newI));
  const options = idx.map((oldI) => q.options[oldI]);
  const correct = (q.correct as number[]).map((oldI) => o2n[oldI]);
  if (type !== "ORDERED") correct.sort((a, b) => a - b);
  return { ...q, options, correct };
}

if (process.argv.includes("--write")) {
  if (errors.length) { console.error("\nRefusing to write: fix errors first."); process.exit(1); }
  const order = (s: string) => SECTIONS.indexOf(s);
  all.sort((a, b) => order(a.section) - order(b.section) || a.topic.localeCompare(b.topic));
  const body = all.map(shuffle).map((q) => {
    const o: Record<string, unknown> = { section: q.section, topic: q.topic };
    if (q.subtopic) o.subtopic = q.subtopic;
    if (q.difficulty) o.difficulty = q.difficulty;
    if (q.type && q.type !== "SINGLE") o.type = q.type;
    o.stem = q.stem; o.options = q.options; o.correct = q.correct; o.explanation = q.explanation;
    return "  " + JSON.stringify(o) + ",";
  }).join("\n");
  const ts = `import type { SeedQuestion } from "./seed-types";\n\n// AUTO-GENERATED by scripts/build-seed-questions-2.mts. Do not edit by hand.\n// Wave 4: more original questions per skill, independently blind-verified.\nexport const GENERATED_QUESTIONS_4: SeedQuestion[] = [\n${body}\n];\n`;
  writeFileSync(OUT, ts);
  console.log(`\nWrote ${all.length} wave-4 questions to ${OUT}`);
}
