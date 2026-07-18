import { describe, expect, it } from "vitest";
import {
  SKILL_NODES,
  resolveSkill,
  skillIdFor,
  nodeBySkillId,
  skillNodesForSection,
  requiredSkillCount,
  unknownTopicIds,
} from "@/content/taxonomy";
import { SKILLS } from "@/content/skills";

describe("taxonomy identity", () => {
  it("has one node per authored skill (85)", () => {
    const authored = SKILLS.reduce((n, g) => n + g.skills.length, 0);
    expect(SKILL_NODES.length).toBe(authored);
    expect(SKILL_NODES.length).toBe(85);
  });

  it("assigns globally unique skillIds", () => {
    const ids = new Set(SKILL_NODES.map((n) => n.skillId));
    expect(ids.size).toBe(SKILL_NODES.length);
  });

  it("derives skillId as topicId:slug", () => {
    expect(skillIdFor("anatomy-physiology", "Cardiovascular System")).toBe(
      "anatomy-physiology:cardiovascular-system",
    );
  });

  it("maps lessonId 1:1 with skillId", () => {
    for (const n of SKILL_NODES) expect(n.lessonId).toBe(n.skillId);
  });

  it("resolves every canonical skill name exactly", () => {
    for (const n of SKILL_NODES) {
      expect(resolveSkill(n.name)?.skillId).toBe(n.skillId);
    }
  });

  it("resolves known variant titles via overrides/normalization", () => {
    expect(resolveSkill("Identify the Topic or Main Idea")?.name).toBe(
      "Identify the Topic, Main Idea, and Supporting Details",
    );
  });

  it("returns null for unknown or empty names", () => {
    expect(resolveSkill(null)).toBeNull();
    expect(resolveSkill("")).toBeNull();
    expect(resolveSkill("Totally Not A Skill")).toBeNull();
  });

  it("round-trips skillId -> node", () => {
    const n = SKILL_NODES[0];
    expect(nodeBySkillId(n.skillId)?.name).toBe(n.name);
  });

  it("groups skills under the four sections", () => {
    const counts = {
      READING: skillNodesForSection("READING").length,
      MATH: skillNodesForSection("MATH").length,
      SCIENCE: skillNodesForSection("SCIENCE").length,
      ENGLISH: skillNodesForSection("ENGLISH").length,
    };
    expect(counts).toEqual({ READING: 21, MATH: 13, SCIENCE: 24, ENGLISH: 27 });
  });

  it("reports required-skill counts per section", () => {
    expect(requiredSkillCount("SCIENCE")).toBe(24);
  });

  it("references only blueprint topic ids", () => {
    expect(unknownTopicIds()).toEqual([]);
  });
});
