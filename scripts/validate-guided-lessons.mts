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

const KINDS = ["concept", "rule", "example", "mistake", "tip", "why", "tabs", "wordProblem"];

async function main() {
  const dir = "../src/content/guided-lessons";
  const bySlug = new Map(SKILL_LESSONS.map((l) => [l.slug, l]));
  let ok = 0;
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
    ok++;
  }

  console.log(`validated ${ok} lessons`);
  if (problems.length) {
    console.error(problems.join("\n"));
    process.exit(1);
  }
  console.log("NO PROBLEMS");
}

main();
