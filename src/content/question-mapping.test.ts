import { describe, expect, it } from "vitest";
import { QUESTIONS } from "@/content/questions";
import { resolveSkill, SKILL_NODES } from "@/content/taxonomy";
import { SKILLS } from "@/content/skills";

/**
 * CI guard for the question -> skill mapping. Every seeded question that
 * carries a subtopic MUST resolve to a known skill, and its stored topic must
 * match that skill's canonical topic. Topic-only questions (no subtopic) are
 * allowed and excluded from skill-level stats by design.
 */
describe("question -> skill mapping", () => {
  const withSubtopic = QUESTIONS.filter((q) => q.subtopic);

  it("resolves every subtopic to a known skill", () => {
    const unresolved = withSubtopic
      .filter((q) => !resolveSkill(q.subtopic))
      .map((q) => `${q.section}/${q.topic} :: ${q.subtopic}`);
    expect(unresolved).toEqual([]);
  });

  it("stores each mapped question under its skill's canonical topic", () => {
    const mismatched = withSubtopic
      .map((q) => ({ q, node: resolveSkill(q.subtopic) }))
      .filter(({ q, node }) => node && node.topicId !== q.topic)
      .map(({ q, node }) => `${q.section}/${q.topic} :: ${q.subtopic} -> ${node!.topicId}`);
    expect(mismatched).toEqual([]);
  });

  it("keeps skills.ts and the taxonomy node set in agreement", () => {
    const authored = SKILLS.flatMap((g) => g.skills).sort();
    const nodes = SKILL_NODES.map((n) => n.name).sort();
    expect(nodes).toEqual(authored);
  });
});
