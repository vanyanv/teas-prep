import { describe, expect, it } from "vitest";
import {
  classifyMastery,
  computeMastery,
  defaultMasteryConfig,
  type MasteryItem,
} from "@/lib/progress/mastery";

const cfg = defaultMasteryConfig;
const at = (daysAgo: number) => new Date(-daysAgo * 86_400_000); // relative to now=0

function items(
  specs: Array<[correct: boolean, conf: 1 | 2 | 3 | null, diff: 1 | 2 | 3, daysAgo: number, spaced?: boolean]>,
): MasteryItem[] {
  return specs.map(([isCorrect, confidence, difficulty, daysAgo, spacedReview]) => ({
    isCorrect,
    confidence,
    difficulty,
    when: at(daysAgo),
    spacedReview,
  }));
}

describe("classifyMastery", () => {
  it("is NOT_STARTED with no evidence", () => {
    expect(classifyMastery(null, 0, 0, false)).toBe("NOT_STARTED");
  });

  it("caps at LEARNING below the evidence gate even at high pct", () => {
    expect(classifyMastery(95, cfg.evidenceGate - 1, 5, false)).toBe("LEARNING");
  });

  it("walks the bands once evidence is sufficient", () => {
    const n = cfg.evidenceGate;
    expect(classifyMastery(40, n, 0, false)).toBe("LEARNING");
    expect(classifyMastery(60, n, 0, false)).toBe("PRACTICING");
    expect(classifyMastery(78, n, 0, false)).toBe("PROFICIENT");
    expect(classifyMastery(90, n, 2, false)).toBe("MASTERED");
  });

  it("holds a high skill at PROFICIENT without sustained spaced success", () => {
    expect(classifyMastery(90, cfg.evidenceGate, 1, false)).toBe("PROFICIENT");
  });

  it("holds a high skill at PROFICIENT if the most recent answer lapsed", () => {
    expect(classifyMastery(90, cfg.evidenceGate, 3, true)).toBe("PROFICIENT");
  });
});

describe("computeMastery", () => {
  it("returns NOT_STARTED for no items", () => {
    expect(computeMastery([], cfg, 0).state).toBe("NOT_STARTED");
  });

  it("does not mark mastery from a single correct answer", () => {
    const r = computeMastery(items([[true, 3, 2, 0]]), cfg, 0);
    expect(r.evidenceCount).toBe(1);
    expect(r.state).toBe("LEARNING");
  });

  it("gives a lucky guess little credit", () => {
    const guessed = computeMastery(items([[true, 1, 2, 0]]), cfg, 0);
    const confident = computeMastery(items([[true, 3, 2, 0]]), cfg, 0);
    expect(guessed.pct!).toBeLessThan(confident.pct!);
  });

  it("weights harder items more heavily", () => {
    // one hard wrong + one easy right → below a naive 50%
    const r = computeMastery(items([[false, 3, 3, 0], [true, 3, 1, 0]]), cfg, 0);
    expect(r.pct!).toBeLessThan(50);
  });

  it("decays stale evidence toward the floor", () => {
    const fresh = computeMastery(items([[true, 3, 2, 0]]), cfg, 0).pct!;
    const stale = computeMastery(items([[true, 3, 2, 400]]), cfg, 0).pct!;
    expect(fresh).toBe(100);
    expect(stale).toBe(100); // all-correct still 100%; decay affects weight, not a pure ratio
  });

  it("reaches MASTERED with strong, sustained, recent evidence", () => {
    const r = computeMastery(
      items([
        [true, 3, 3, 5, true],
        [true, 3, 2, 3, true],
        [true, 3, 2, 2],
        [true, 3, 3, 1],
        [true, 3, 2, 0],
      ]),
      cfg,
      0,
    );
    expect(r.pct).toBe(100);
    expect(r.spacedSuccesses).toBe(2);
    expect(r.state).toBe("MASTERED");
  });

  it("blocks MASTERED when the latest answer is wrong", () => {
    const r = computeMastery(
      items([
        [true, 3, 3, 5, true],
        [true, 3, 2, 3, true],
        [true, 3, 2, 2],
        [true, 3, 3, 1],
        [false, 2, 2, 0],
      ]),
      cfg,
      0,
    );
    expect(r.state).toBe("PROFICIENT");
  });
});
