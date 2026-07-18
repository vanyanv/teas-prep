import { describe, expect, it } from "vitest";

import { generatePlan, weeksUntil, SESSION_MINUTES } from "./generate";

describe("generatePlan", () => {
  it("produces the requested number of weeks (clamped to 16)", () => {
    expect(generatePlan({ weeks: 6, daysPerWeek: 4 })).toHaveLength(6);
    expect(generatePlan({ weeks: 0, daysPerWeek: 4 })).toHaveLength(1);
    expect(generatePlan({ weeks: 50, daysPerWeek: 4 })).toHaveLength(16);
  });

  it("schedules session-engine units only (no pre-assigned topic blocks)", () => {
    const plan = generatePlan({ weeks: 6, daysPerWeek: 4 });
    for (const week of plan) {
      expect(week.tasks.every((t) => t.kind !== "STUDY" && t.kind !== "DRILL")).toBe(true);
      expect(week.tasks.every((t) => t.section === null && t.topic === null)).toBe(true);
    }
  });

  it("gives every non-final week one daily session per study day, session-sized", () => {
    const plan = generatePlan({ weeks: 6, daysPerWeek: 4 });
    const sessions = plan[0].tasks.filter((t) => t.kind === "SESSION");
    expect(sessions).toHaveLength(4);
    for (const s of sessions) expect(s.durationMin).toBe(SESSION_MINUTES);
    // No two sessions on the same day; Sunday stays free for review.
    const days = sessions.map((s) => s.dayOfWeek);
    expect(new Set(days).size).toBe(days.length);
    expect(days.every((d) => d <= 5)).toBe(true);
  });

  it("clamps days per week to 2..7", () => {
    expect(
      generatePlan({ weeks: 3, daysPerWeek: 1 })[0].tasks.filter((t) => t.kind === "SESSION"),
    ).toHaveLength(2);
    expect(
      generatePlan({ weeks: 3, daysPerWeek: 9 })[0].tasks.filter((t) => t.kind === "SESSION"),
    ).toHaveLength(6);
  });

  it("every week ends with a review task on Sunday", () => {
    const plan = generatePlan({ weeks: 6, daysPerWeek: 4 });
    for (const week of plan) {
      const review = week.tasks.find((t) => t.kind === "REVIEW");
      expect(review?.dayOfWeek).toBe(6);
    }
  });

  it("adds a timed progress check on alternate non-final weeks", () => {
    const plan = generatePlan({ weeks: 6, daysPerWeek: 4 });
    expect(plan[0].tasks.some((t) => t.kind === "CHECK")).toBe(false);
    expect(plan[1].tasks.some((t) => t.kind === "CHECK")).toBe(true);
    expect(plan[3].tasks.some((t) => t.kind === "CHECK")).toBe(true);
    // Final phase replaces checks with mocks.
    expect(plan[4].tasks.some((t) => t.kind === "CHECK")).toBe(false);
    expect(plan[5].tasks.some((t) => t.kind === "CHECK")).toBe(false);
  });

  it("places a full mock exam in the final phase but not week 1, and tapers sessions", () => {
    const plan = generatePlan({ weeks: 6, daysPerWeek: 4 });
    expect(plan[0].tasks.some((t) => t.kind === "TEST")).toBe(false);
    expect(plan[4].tasks.some((t) => t.kind === "TEST")).toBe(true);
    expect(plan[5].tasks.some((t) => t.kind === "TEST")).toBe(true);
    const finalSessions = plan[5].tasks.filter((t) => t.kind === "SESSION");
    expect(finalSessions.length).toBeLessThan(4);
  });

  it("includes flashcard upkeep every week", () => {
    const plan = generatePlan({ weeks: 3, daysPerWeek: 4 });
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
