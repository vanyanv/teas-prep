import { describe, expect, it } from "vitest";

import {
  nextUndiagnosedSection,
  sectionStatusFrom,
} from "./diagnostic-status";

const at = (id: string, section: string, scorePct: number, when: string) => ({
  id,
  scorePct,
  finishedAt: new Date(when),
  config: { variant: "section", section, total: 35 },
});

describe("sectionStatusFrom", () => {
  it("returns all four sections in blueprint order with untaken ones null", () => {
    const status = sectionStatusFrom([at("a1", "MATH", 70, "2026-07-01")]);
    expect(status.map((s) => s.section)).toEqual([
      "READING",
      "MATH",
      "SCIENCE",
      "ENGLISH",
    ]);
    expect(status[1]).toMatchObject({ attemptId: "a1", scorePct: 70 });
    expect(status[0].attemptId).toBeNull();
  });

  it("keeps only the newest attempt per section (input is newest-first)", () => {
    const status = sectionStatusFrom([
      at("new", "MATH", 80, "2026-07-10"),
      at("old", "MATH", 60, "2026-07-01"),
    ]);
    expect(status[1].attemptId).toBe("new");
    expect(status[1].scorePct).toBe(80);
  });

  it("ignores legacy combined-diagnostic attempts", () => {
    const status = sectionStatusFrom([
      { id: "legacy", scorePct: 55, finishedAt: new Date(), config: { total: 24 } },
    ]);
    expect(status.every((s) => s.attemptId === null)).toBe(true);
  });
});

describe("nextUndiagnosedSection", () => {
  it("returns the first untaken section in blueprint order", () => {
    const status = sectionStatusFrom([at("a1", "READING", 70, "2026-07-01")]);
    expect(nextUndiagnosedSection(status)?.section).toBe("MATH");
  });

  it("returns null when all four are done", () => {
    const status = sectionStatusFrom([
      at("a", "READING", 1, "2026-07-01"),
      at("b", "MATH", 1, "2026-07-01"),
      at("c", "SCIENCE", 1, "2026-07-01"),
      at("d", "ENGLISH", 1, "2026-07-01"),
    ]);
    expect(nextUndiagnosedSection(status)).toBeNull();
  });
});
