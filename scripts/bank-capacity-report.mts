import { QUESTIONS } from "../src/content/questions";
import { BLUEPRINT, SECTION_ORDER, type Section } from "../src/lib/teas-blueprint";
import { resolveSkill, skillNodesForSection } from "../src/content/taxonomy";

/**
 * Bank-capacity report: how many distinct exam forms the current question bank
 * supports without excessive repetition. Uses blueprint per-section `total`
 * as the form size. Content-only (no DB needed).
 *
 *   npx tsx scripts/bank-capacity-report.mts
 */
function main() {
  const bySection = new Map<Section, number>();
  const byTopic = new Map<string, number>();
  const bySkill = new Map<string, number>();
  let noSkill = 0;

  for (const q of QUESTIONS) {
    bySection.set(q.section, (bySection.get(q.section) ?? 0) + 1);
    byTopic.set(`${q.section}/${q.topic}`, (byTopic.get(`${q.section}/${q.topic}`) ?? 0) + 1);
    const node = resolveSkill(q.subtopic);
    if (node) bySkill.set(node.skillId, (bySkill.get(node.skillId) ?? 0) + 1);
    else noSkill += 1;
  }

  console.log(`\nBANK CAPACITY REPORT — ${QUESTIONS.length} questions\n`);
  console.log(`Section     pool  form(total)  disjoint full forms  skills covered`);
  for (const s of SECTION_ORDER) {
    const spec = BLUEPRINT[s];
    const pool = bySection.get(s) ?? 0;
    const forms = Math.floor(pool / spec.total);
    const totalSkills = skillNodesForSection(s).length;
    const covered = skillNodesForSection(s).filter((n) => (bySkill.get(n.skillId) ?? 0) > 0).length;
    console.log(
      `${s.padEnd(10)}  ${String(pool).padStart(4)}  ${String(spec.total).padStart(11)}  ${String(forms).padStart(19)}  ${covered}/${totalSkills}`,
    );
  }

  const fullFormSize = SECTION_ORDER.reduce((n, s) => n + BLUEPRINT[s].total, 0);
  const disjointFull = Math.min(
    ...SECTION_ORDER.map((s) => Math.floor((bySection.get(s) ?? 0) / BLUEPRINT[s].total)),
  );
  console.log(`\nFull simulation size = ${fullFormSize} items.`);
  console.log(`Fully-disjoint full simulations possible = ${disjointFull} (limited by tightest section).`);
  console.log(`With cooldowns (reuse allowed after a rest window) many more partially-overlapping forms are possible.`);

  // Thin skills (a coverage risk for skill-level drills / adaptive review)
  const thin = SECTION_ORDER.flatMap((s) =>
    skillNodesForSection(s)
      .map((n) => ({ skillId: n.skillId, name: n.name, count: bySkill.get(n.skillId) ?? 0 }))
      .filter((x) => x.count < 4),
  ).sort((a, b) => a.count - b.count);
  console.log(`\nSkills with < 4 questions (${thin.length}) — thin for mastery evidence / drills:`);
  for (const t of thin) console.log(`  [${t.count}] ${t.name}`);
  if (noSkill) console.log(`\nQuestions with no skill mapping: ${noSkill} (topic-only).`);
}

main();
