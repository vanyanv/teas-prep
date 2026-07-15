import { describe, expect, it, vi } from "vitest";

// Mock db-dependent modules so tests can run without DATABASE_URL
vi.mock("@/lib/db", () => ({ db: {} }));
vi.mock("@/lib/mastery", () => ({
  getMasteryData: vi.fn(),
}));
vi.mock("@/lib/review/question-srs", () => ({
  getDueQuestionIds: vi.fn(),
}));
vi.mock("@/lib/quiz/attempt", () => ({
  startFromIds: vi.fn(),
  type: {},
}));

import { orderUnseenFirst, pickFocusSkill } from "./session";

describe("orderUnseenFirst", () => {
  const pool = ["a", "b", "c", "d", "e"].map((id) => ({ id }));

  it("puts every unseen question before any seen one", () => {
    const seen = new Set(["a", "b"]);
    const picked = orderUnseenFirst(pool, seen, 4, () => 0);
    expect(picked).toHaveLength(4);
    expect(new Set(picked.slice(0, 3))).toEqual(new Set(["c", "d", "e"]));
    expect(seen.has(picked[3])).toBe(true);
  });

  it("returns only unseen when enough exist", () => {
    const picked = orderUnseenFirst(pool, new Set(), 3, () => 0);
    expect(picked).toHaveLength(3);
  });

  it("caps at pool size", () => {
    const picked = orderUnseenFirst(pool, new Set(), 10, () => 0);
    expect(picked).toHaveLength(5);
  });
});

describe("pickFocusSkill", () => {
  const skills = ["Skill A", "Skill B", "Skill C"];
  const all = new Set(skills);

  it("prefers a never-attempted skill", () => {
    const picked = pickFocusSkill(
      skills,
      [
        { skill: "Skill A", attempts: 4, correct: 4 },
        { skill: "Skill B", attempts: 2, correct: 0 },
      ],
      all,
    );
    expect(picked).toBe("Skill C");
  });

  it("breaks attempt ties by lower accuracy", () => {
    const picked = pickFocusSkill(
      skills,
      [
        { skill: "Skill A", attempts: 2, correct: 2 },
        { skill: "Skill B", attempts: 2, correct: 0 },
        { skill: "Skill C", attempts: 2, correct: 1 },
      ],
      all,
    );
    expect(picked).toBe("Skill B");
  });

  it("only picks skills that have a lesson available", () => {
    const picked = pickFocusSkill(skills, [], new Set(["Skill B"]));
    expect(picked).toBe("Skill B");
  });

  it("returns null when nothing is available", () => {
    expect(pickFocusSkill(skills, [], new Set())).toBeNull();
  });
});
