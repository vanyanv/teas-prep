import { describe, expect, it } from "vitest";

import { masteryCredit } from "./confidence";

describe("masteryCredit", () => {
  it("gives no credit for a wrong answer regardless of confidence", () => {
    expect(masteryCredit(false, 3)).toBe(0);
    expect(masteryCredit(false, 1)).toBe(0);
    expect(masteryCredit(false, null)).toBe(0);
  });

  it("gives full credit for confident or unrated correct answers", () => {
    expect(masteryCredit(true, 3)).toBe(1);
    expect(masteryCredit(true, null)).toBe(1);
  });

  it("discounts correct-but-unsure and correct-but-guessed answers", () => {
    expect(masteryCredit(true, 2)).toBe(0.5);
    expect(masteryCredit(true, 1)).toBe(0.25);
  });

  it("ranks a guessed-correct topic as weaker than a confident-correct one", () => {
    // Topic A: 4 correct, all guessed. Topic B: 4 correct, all confident.
    const a = [1, 1, 1, 1].reduce((s, c) => s + masteryCredit(true, c), 0) / 4;
    const b = [3, 3, 3, 3].reduce((s, c) => s + masteryCredit(true, c), 0) / 4;
    expect(a).toBeLessThan(b);
    expect(Math.round(a * 100)).toBe(25); // surfaces as a weak topic in the plan
  });
});
