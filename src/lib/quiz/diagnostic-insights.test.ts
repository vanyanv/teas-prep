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
  subtopic: string | null = null,
  answered = true,
): InsightItem {
  return { section, topic, subtopic, isCorrect, confidence, answered };
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

  it("captures confidence patterns: guessed, confident-wrong, unanswered", () => {
    const r = computeDiagnosticInsights([
      mk("READING", "key-ideas-details", true, 1), // lucky guess
      mk("READING", "key-ideas-details", false, 3), // confident + wrong
      mk("READING", "key-ideas-details", false, null, null, false), // unanswered
    ]);
    expect(r.confidence.guessedTotal).toBe(1);
    expect(r.confidence.guessedCorrect).toBe(1);
    expect(r.confidence.confidentWrong).toBe(1);
    expect(r.confidence.unanswered).toBe(1);
  });

  it("ranks up to five priority skills, weakest-weighted, excluding 75%+", () => {
    const chem = "Recognize Basic Atomic Structure"; // SCIENCE / chemistry
    const algebra = "Solve Equations in One Variable"; // MATH / numbers-algebra
    const strong = "Cardiovascular System"; // SCIENCE / anatomy-physiology
    const items: InsightItem[] = [
      ...Array.from({ length: 6 }, (_, i) => mk("MATH", "numbers-algebra", i < 2, 2, algebra)), // 33%, weight 18
      ...Array.from({ length: 5 }, (_, i) => mk("SCIENCE", "chemistry", i < 1, 2, chem)), // 20%, weight 8
      ...Array.from({ length: 4 }, (_, i) => mk("SCIENCE", "anatomy-physiology", i < 3, 2, strong)), // 75% excluded
    ];
    const r = computeDiagnosticInsights(items);
    expect(r.prioritySkills.length).toBeLessThanOrEqual(5);
    expect(r.prioritySkills[0].name).toBe(algebra); // higher weakness×weight
    expect(r.prioritySkills.map((p) => p.name)).not.toContain(strong);
  });

  it("writes a headline naming the strongest section and top priorities", () => {
    const r = computeDiagnosticInsights(items);
    expect(r.headline).toContain(`${r.overallPct}%`);
    expect(r.headline).toContain("Reading");
    expect(r.headline).toContain("Numbers & algebra");
  });

  it("never claims a strongest section when only one section is assessed", () => {
    const r = computeDiagnosticInsights(batch("READING", "key-ideas-details", 10, 1));
    expect(r.priorities.length).toBeGreaterThan(0);
    expect(r.headline).not.toContain("strongest");
    expect(r.headline).toContain("Your biggest gains");
  });

  it("handles a uniformly strong result without priorities", () => {
    const r = computeDiagnosticInsights(batch("READING", "key-ideas-details", 10, 9));
    expect(r.priorities).toHaveLength(0);
    expect(r.headline).toContain("Solid across the board");
  });
});
