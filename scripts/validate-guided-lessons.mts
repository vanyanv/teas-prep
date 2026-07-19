/**
 * Structural validation for guided lessons (src/content/guided-lessons/):
 * slug/section/topic/skill must match the flat SKILL_LESSONS source, every
 * section needs a unique id and a 4-choice quick check with a valid answer
 * index, and block kinds must stay within the GuidedBlock union.
 *
 *   npx tsx scripts/validate-guided-lessons.mts
 */
import { readdirSync } from "node:fs";

import { SKILL_LESSONS } from "../src/content/skill-lessons";
import { slugifySkill } from "../src/content/skills";

const KINDS = [
  "concept",
  "rule",
  "example",
  "mistake",
  "tip",
  "why",
  "tabs",
  "wordProblem",
  "figure",
];

/**
 * DESIGN.md bans em dashes, but that is a rule about the app's voice, not about
 * what a lesson is allowed to teach. Punctuation lessons have to be able to
 * show the mark they are teaching: the hyphen lesson previously rendered a dash
 * as a spaced hyphen and so contradicted its own rule. Any other lesson using
 * one is the voice leaking in, which is what this check catches.
 */
const EM_DASH_ALLOWED = new Set(["using-hyphens"]);

async function main() {
  const dir = "../src/content/guided-lessons";
  const bySlug = new Map(SKILL_LESSONS.map((l) => [l.slug, l]));
  let ok = 0;
  const slugs: string[] = [];
  const problems: string[] = [];

  for (const f of readdirSync(new URL(dir, import.meta.url)).filter((f) => f.endsWith(".ts"))) {
    const mod: Record<string, unknown> = await import(`${dir}/${f}`);
    const ns = (mod.default && Object.keys(mod).length === 1 ? mod.default : mod) as Record<string, unknown>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lessons = Object.values(ns).filter((v: any) => v && v.slug && v.sections);
    if (lessons.length !== 1) {
      problems.push(`${f}: expected exactly 1 GuidedLesson export, got ${lessons.length}`);
      continue;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const g: any = lessons[0];
    const src = bySlug.get(g.slug);
    if (!src) {
      problems.push(`${f}: slug not found in SKILL_LESSONS: ${g.slug}`);
      continue;
    }
    if (g.section !== src.section || g.topic !== src.topic || g.skill !== src.skill)
      problems.push(`${f}: section/topic/skill mismatch vs source`);
    if (!EM_DASH_ALLOWED.has(g.slug) && JSON.stringify(g).includes("—"))
      problems.push(`${f}: em dash in lesson copy`);
    if (slugifySkill(g.skill) !== g.slug) problems.push(`${f}: slug != slugifySkill(skill)`);
    for (const field of ["title", "summary"] as const) {
      if (typeof g[field] !== "string" || !g[field].trim())
        problems.push(`${f}: missing ${field}`);
    }
    if (!Array.isArray(g.minutes) || g.minutes.length !== 2)
      problems.push(`${f}: minutes must be a [min, max] pair`);
    if (!Array.isArray(g.objectives) || g.objectives.length < 3) problems.push(`${f}: fewer than 3 objectives`);
    const ids = new Set<string>();
    for (const s of g.sections) {
      if (ids.has(s.id)) problems.push(`${f}: duplicate section id ${s.id}`);
      ids.add(s.id);
      const qc = s.quickCheck;
      if (!qc || qc.choices.length !== 4) problems.push(`${f}#${s.id}: quickCheck needs exactly 4 choices`);
      else if (qc.answer < 0 || qc.answer >= 4) problems.push(`${f}#${s.id}: answer index out of range`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      for (const b of s.blocks as any[]) {
        if (!KINDS.includes(b.kind)) problems.push(`${f}#${s.id}: unknown block kind ${b.kind}`);
      }
    }
    slugs.push(g.slug);
    ok++;
  }

  // Coverage is load-bearing: the skill page renders guided lessons only, with
  // no flat-lesson fallback, so a skill without one would have nothing to show.
  const covered = new Set(slugs);
  for (const l of SKILL_LESSONS) {
    if (!covered.has(l.slug)) problems.push(`no guided lesson for skill: ${l.slug}`);
  }

  console.log(`validated ${ok} lessons covering ${covered.size}/${SKILL_LESSONS.length} skills`);
  if (problems.length) {
    console.error(problems.join("\n"));
    process.exit(1);
  }
  console.log("NO PROBLEMS");
}

main();
