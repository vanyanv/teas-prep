import { describe, expect, it } from "vitest";

import {
  BLUEPRINT,
  SECTIONS,
  TOTAL_ITEMS,
  TOTAL_MINUTES,
  TOTAL_SCORED,
  sectionCountsFor,
  topicCountsFor,
} from "./teas-blueprint";

describe("blueprint totals", () => {
  it("matches the official TEAS 7 structure", () => {
    expect(TOTAL_ITEMS).toBe(170);
    expect(TOTAL_SCORED).toBe(150);
    expect(TOTAL_MINUTES).toBe(209);
  });

  it("each section's topics sum close to its scored count", () => {
    for (const s of SECTIONS) {
      const sum = s.topics.reduce((n, t) => n + t.scored, 0);
      // topic scored counts should not exceed the section scored count
      expect(sum).toBeLessThanOrEqual(s.scored + 2);
      expect(sum).toBeGreaterThan(0);
    }
  });
});

describe("sectionCountsFor", () => {
  it("sums exactly to the requested total", () => {
    for (const total of [10, 25, 45, 150]) {
      const counts = sectionCountsFor(total);
      const sum = Object.values(counts).reduce((a, b) => a + b, 0);
      expect(sum).toBe(total);
    }
  });

  it("gives science the largest share", () => {
    const counts = sectionCountsFor(150);
    expect(counts.SCIENCE).toBeGreaterThanOrEqual(counts.READING);
    expect(counts.SCIENCE).toBeGreaterThan(counts.ENGLISH);
  });
});

describe("topicCountsFor", () => {
  it("sums exactly to the requested total per section", () => {
    for (const section of Object.keys(BLUEPRINT) as (keyof typeof BLUEPRINT)[]) {
      const counts = topicCountsFor(section, 12);
      const sum = Object.values(counts).reduce((a, b) => a + b, 0);
      expect(sum).toBe(12);
    }
  });
});
