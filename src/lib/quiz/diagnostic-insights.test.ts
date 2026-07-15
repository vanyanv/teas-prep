import { describe, expect, it } from "vitest";

import {
  bandFor,
  computeDiagnosticInsights,
  type InsightItem,
} from "./diagnostic-insights";
import type { Section } from "@/lib/teas-blueprint";

function mk(
  section: Section,
  topic: string,
  isCorrect: boolean,
  confidence: number | null = null,
): InsightItem {
  return { section, topic, isCorrect, confidence };
}

/** n items on one section/topic, `c` of them correct */
function batch(section: Section, topic: string, n: number, c: number): InsightItem[] {
  return Array.from({ length: n }, (_, i) => mk(section, topic, i < c));
}

describe("bandFor", () => {
  it("maps pct to bands at the documented cutoffs", () => {
    expect(bandFor(75)).toBe("strong");
    expect(bandFor(74)).toBe("solid");
    expect(bandFor(60)).toBe("solid");
    expect(bandFor(59)).toBe("needs-work");
    expect(bandFor(40)).toBe("needs-work");
    expect(bandFor(39)).toBe("priority");
  });
});

describe("computeDiagnosticInsights", () => {
  const items: InsightItem[] = [
    ...batch("READING", "key-ideas-details", 10, 8), // 80% strong
    ...batch("MATH", "numbers-algebra", 6, 2), // 33%, high weight (18 scored)
    ...batch("SCIENCE", "chemistry", 5, 1), // 20%, low weight (8 scored)
    ...batch("SCIENCE", "anatomy-physiology", 8, 6), // 75% — excluded from priorities
  ];

  it("tallies per-section and per-topic accuracy with bands", () => {
    const r = computeDiagnosticInsights(items);
    const reading = r.sections.find((s) => s.section === "READING")!;
    expect(reading.pct).toBe(80);
    expect(reading.band).toBe("strong");
    const kid = reading.topics.find((t) => t.topic === "key-ideas-details")!;
    expect(kid.correct).toBe(8);
    expect(kid.total).toBe(10);
    const english = r.sections.find((s) => s.section === "ENGLISH")!;
    expect(english.pct).toBeNull();
    expect(english.band).toBeNull();
  });

  it("ranks priorities by weakness × blueprint weight and excludes 75%+", () => {
    const r = computeDiagnosticInsights(items);
    const keys = r.priorities.map((p) => p.topic);
    // numbers-algebra: (1-.33) * 18/150 = .080 > chemistry: (1-.2) * 8/150 = .043
    expect(keys[0]).toBe("numbers-algebra");
    expect(keys[1]).toBe("chemistry");
    expect(keys).not.toContain("anatomy-physiology");
    expect(r.priorities.length).toBeLessThanOrEqual(3);
  });

  it("counts guessed answers and guessed-correct separately", () => {
    const r = computeDiagnosticInsights([
      mk("READING", "key-ideas-details", true, 1),
      mk("READING", "key-ideas-details", false, 1),
      mk("READING", "key-ideas-details", true, 3),
    ]);
    expect(r.guessed).toEqual({ total: 2, correct: 1 });
  });

  it("writes a headline naming the strongest section and top priorities", () => {
    const r = computeDiagnosticInsights(items);
    expect(r.headline).toContain(`${r.overallPct}%`);
    expect(r.headline).toContain("Reading");
    expect(r.headline).toContain("Numbers & algebra");
  });

  it("handles a uniformly strong result without priorities", () => {
    const r = computeDiagnosticInsights(batch("READING", "key-ideas-details", 10, 9));
    expect(r.priorities).toHaveLength(0);
    expect(r.headline).toContain("Solid across the board");
  });
});
