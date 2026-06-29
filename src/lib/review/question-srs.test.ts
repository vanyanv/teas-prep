import { describe, expect, it } from "vitest";

import { gradeFromOutcome } from "./srs-grade";

describe("gradeFromOutcome", () => {
  it("a wrong answer is always 'again' (comes back today)", () => {
    expect(gradeFromOutcome(false, 3)).toBe("again");
    expect(gradeFromOutcome(false, 1)).toBe("again");
    expect(gradeFromOutcome(false, null)).toBe("again");
  });

  it("correct answers space out by how sure the student was", () => {
    expect(gradeFromOutcome(true, 1)).toBe("hard"); // guessed -> short interval
    expect(gradeFromOutcome(true, 2)).toBe("good"); // unsure -> normal
    expect(gradeFromOutcome(true, 3)).toBe("easy"); // confident -> longest
  });

  it("an unrated correct answer is treated as confident", () => {
    expect(gradeFromOutcome(true, null)).toBe("easy");
  });
});
