import { describe, expect, it } from "vitest";

import { generatePlan, weeksUntil, type TopicMastery } from "./generate";

const masteries: TopicMastery[] = [
  { section: "READING", topic: "key-ideas-details", pct: 80 },
  { section: "MATH", topic: "numbers-algebra", pct: 20 },
  { section: "SCIENCE", topic: "anatomy-physiology", pct: 10 },
];

describe("generatePlan", () => {
  it("produces the requested number of weeks (clamped to 16)", () => {
    expect(generatePlan({ weeks: 6, hoursPerWeek: 8, masteries })).toHaveLength(6);
    expect(generatePlan({ weeks: 0, hoursPerWeek: 8, masteries })).toHaveLength(1);
    expect(generatePlan({ weeks: 50, hoursPerWeek: 8, masteries })).toHaveLength(16);
  });

  it("every week ends with a review task", () => {
    const plan = generatePlan({ weeks: 6, hoursPerWeek: 8, masteries });
    for (const week of plan) {
      expect(week.tasks.some((t) => t.kind === "REVIEW")).toBe(true);
    }
  });

  it("places a full mock exam in the final week(s) but not week 1", () => {
    const plan = generatePlan({ weeks: 6, hoursPerWeek: 8, masteries });
    const week1HasTest = plan[0].tasks.some((t) => t.kind === "TEST");
    const lastHasTest = plan[plan.length - 1].tasks.some((t) => t.kind === "TEST");
    expect(week1HasTest).toBe(false);
    expect(lastHasTest).toBe(true);
  });

  it("prioritizes weak, high-weight topics (A&P appears early)", () => {
    const plan = generatePlan({ weeks: 4, hoursPerWeek: 8, masteries });
    const firstWeekTopics = plan[0].tasks
      .filter((t) => t.kind === "STUDY" || t.kind === "DRILL")
      .map((t) => t.topic);
    expect(firstWeekTopics).toContain("anatomy-physiology");
  });

  it("includes flashcard upkeep every week", () => {
    const plan = generatePlan({ weeks: 3, hoursPerWeek: 6, masteries });
    for (const week of plan) {
      expect(week.tasks.some((t) => t.kind === "FLASHCARD")).toBe(true);
    }
  });
});

describe("weeksUntil", () => {
  it("counts whole weeks, minimum 1", () => {
    const from = new Date("2026-01-01T00:00:00Z");
    expect(weeksUntil(new Date("2026-01-29T00:00:00Z"), from)).toBe(4);
    expect(weeksUntil(new Date("2026-01-02T00:00:00Z"), from)).toBe(1);
    expect(weeksUntil(new Date("2025-12-01T00:00:00Z"), from)).toBe(1);
  });
});
