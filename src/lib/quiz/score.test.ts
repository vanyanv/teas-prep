import { describe, expect, it } from "vitest";

import { gradeQuestion, scoreItems, type GradedItem } from "./score";
import type { QuizQuestion } from "./types";

function q(partial: Partial<QuizQuestion>): QuizQuestion {
  return {
    id: "x",
    section: "SCIENCE",
    topic: "anatomy-physiology",
    difficulty: 2,
    type: "SINGLE",
    stem: "?",
    options: ["a", "b", "c", "d"],
    correct: [0],
    ...partial,
  };
}

describe("gradeQuestion", () => {
  it("SINGLE: correct only when the right index is chosen", () => {
    const question = q({ type: "SINGLE", correct: [2] });
    expect(gradeQuestion(question, 2)).toBe(true);
    expect(gradeQuestion(question, [2])).toBe(true);
    expect(gradeQuestion(question, 1)).toBe(false);
    expect(gradeQuestion(question, null)).toBe(false);
  });

  it("MULTI: all-or-nothing", () => {
    const question = q({ type: "MULTI", correct: [0, 2] });
    expect(gradeQuestion(question, [0, 2])).toBe(true);
    expect(gradeQuestion(question, [2, 0])).toBe(true); // order irrelevant
    expect(gradeQuestion(question, [0])).toBe(false); // missing one
    expect(gradeQuestion(question, [0, 1, 2])).toBe(false); // extra wrong
    expect(gradeQuestion(question, [])).toBe(false);
  });

  it("ORDERED: order matters", () => {
    const question = q({ type: "ORDERED", correct: [3, 1, 2, 0] });
    expect(gradeQuestion(question, [3, 1, 2, 0])).toBe(true);
    expect(gradeQuestion(question, [3, 1, 0, 2])).toBe(false);
  });

  it("FILL_BLANK: case/space-insensitive, any accepted answer", () => {
    const question = q({
      type: "FILL_BLANK",
      options: [],
      correct: ["mitochondria", "the mitochondria"],
    });
    expect(gradeQuestion(question, "Mitochondria")).toBe(true);
    expect(gradeQuestion(question, "  the   mitochondria ")).toBe(true);
    expect(gradeQuestion(question, "nucleus")).toBe(false);
    expect(gradeQuestion(question, 0)).toBe(false);
  });

  it("HOT_SPOT: set of correct regions", () => {
    const question = q({ type: "HOT_SPOT", correct: [1] });
    expect(gradeQuestion(question, 1)).toBe(true);
    expect(gradeQuestion(question, 0)).toBe(false);
  });
});

describe("scoreItems", () => {
  it("aggregates by section and topic", () => {
    const items: GradedItem[] = [
      { questionId: "1", section: "MATH", topic: "numbers-algebra", isCorrect: true },
      { questionId: "2", section: "MATH", topic: "numbers-algebra", isCorrect: false },
      { questionId: "3", section: "READING", topic: "key-ideas-details", isCorrect: true },
    ];
    const s = scoreItems(items);
    expect(s.total).toBe(3);
    expect(s.correct).toBe(2);
    expect(s.pct).toBe(67);
    expect(s.bySection.MATH).toEqual({ total: 2, correct: 1, pct: 50 });
    expect(s.byTopic["MATH:numbers-algebra"].pct).toBe(50);
    expect(s.bySection.READING.pct).toBe(100);
  });

  it("handles an empty set", () => {
    const s = scoreItems([]);
    expect(s.total).toBe(0);
    expect(s.pct).toBe(0);
  });

  it("breaks down by subtopic (skill) when items carry one", () => {
    const items: GradedItem[] = [
      { questionId: "1", section: "MATH", topic: "numbers-algebra", subtopic: "Order of Operations", isCorrect: true },
      { questionId: "2", section: "MATH", topic: "numbers-algebra", subtopic: "Order of Operations", isCorrect: false },
      { questionId: "3", section: "MATH", topic: "numbers-algebra", subtopic: "Solving Equations", isCorrect: true },
      { questionId: "4", section: "MATH", topic: "numbers-algebra", isCorrect: true },
    ];
    const s = scoreItems(items);
    expect(s.bySubtopic["Order of Operations"]).toEqual({ total: 2, correct: 1, pct: 50 });
    expect(s.bySubtopic["Solving Equations"].pct).toBe(100);
    // an item with no subtopic is not counted in bySubtopic
    expect(Object.keys(s.bySubtopic)).toHaveLength(2);
  });
});
