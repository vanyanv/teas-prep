import { beforeEach, describe, expect, it, vi } from "vitest";

// finalizeAttempt / answerItem are DB-bound; mock the data layer and the SRS
// scheduler so we can assert the mode-scoping and finalize-once guards without
// a database. These guards protect spaced-repetition state from being
// double-advanced and keep immediate feedback off non-session attempts.

const attemptFindFirst = vi.fn();
const attemptUpdate = vi.fn();
const attemptItemFindFirst = vi.fn();
const questionFindMany = vi.fn();
const attemptCreate = vi.fn();
const attemptItemCreateMany = vi.fn();

vi.mock("@/lib/db", () => ({
  db: {
    attempt: {
      findFirst: (...a: unknown[]) => attemptFindFirst(...a),
      update: (...a: unknown[]) => attemptUpdate(...a),
      create: (...a: unknown[]) => attemptCreate(...a),
    },
    attemptItem: {
      findFirst: (...a: unknown[]) => attemptItemFindFirst(...a),
      createMany: (...a: unknown[]) => attemptItemCreateMany(...a),
    },
    question: {
      findMany: (...a: unknown[]) => questionFindMany(...a),
    },
  },
}));

const recordQuestionReviews = vi.fn();
vi.mock("@/lib/review/question-srs", () => ({
  recordQuestionReviews: (...a: unknown[]) => recordQuestionReviews(...a),
  getDueQuestionIds: vi.fn(),
}));

import { answerItem, finalizeAttempt, startSectionDiagnostic } from "./attempt";

beforeEach(() => {
  attemptFindFirst.mockReset();
  attemptUpdate.mockReset();
  attemptItemFindFirst.mockReset();
  questionFindMany.mockReset();
  attemptCreate.mockReset();
  attemptItemCreateMany.mockReset();
  recordQuestionReviews.mockReset();
});

describe("finalizeAttempt guards", () => {
  const answeredItem = {
    questionId: "q1",
    isCorrect: true,
    confidence: 3,
    question: { section: "MATH", topic: "numbers-algebra", subtopic: "Ratios" },
  };

  it("refuses to finalize a non-session attempt", async () => {
    attemptFindFirst.mockResolvedValue({
      id: "a1",
      config: { variant: "review" },
      finishedAt: null,
      items: [answeredItem],
    });
    await expect(finalizeAttempt("u1", "a1")).rejects.toThrow("Not a session attempt");
    expect(attemptUpdate).not.toHaveBeenCalled();
    expect(recordQuestionReviews).not.toHaveBeenCalled();
  });

  it("is idempotent: an already-finished attempt returns its score without re-recording SRS", async () => {
    attemptFindFirst.mockResolvedValue({
      id: "a1",
      config: { variant: "session" },
      finishedAt: new Date(),
      scorePct: 72,
      items: [answeredItem],
    });
    const result = await finalizeAttempt("u1", "a1");
    expect(result).toEqual({ scorePct: 72 });
    expect(attemptUpdate).not.toHaveBeenCalled();
    expect(recordQuestionReviews).not.toHaveBeenCalled();
  });

  it("scores and records SRS on the first finalize of a session attempt", async () => {
    attemptFindFirst.mockResolvedValue({
      id: "a1",
      config: { variant: "session" },
      finishedAt: null,
      items: [answeredItem, { ...answeredItem, questionId: "q2", isCorrect: false }],
    });
    const result = await finalizeAttempt("u1", "a1");
    expect(result.scorePct).toBe(50); // 1 of 2 correct
    expect(attemptUpdate).toHaveBeenCalledOnce();
    expect(recordQuestionReviews).toHaveBeenCalledOnce();
    const [, batch] = recordQuestionReviews.mock.calls[0];
    expect(batch).toHaveLength(2);
  });
});

describe("answerItem guards", () => {
  it("refuses to grade an item on a non-session attempt", async () => {
    attemptItemFindFirst.mockResolvedValue({
      id: "i1",
      attempt: { config: { variant: "review" }, finishedAt: null },
    });
    await expect(
      answerItem("u1", "a1", "q1", 0, 3, 1000),
    ).rejects.toThrow("Not a session attempt");
  });

  it("refuses to grade an item on an already-finished session attempt", async () => {
    attemptItemFindFirst.mockResolvedValue({
      id: "i1",
      attempt: { config: { variant: "session" }, finishedAt: new Date() },
    });
    await expect(
      answerItem("u1", "a1", "q1", 0, 3, 1000),
    ).rejects.toThrow("Attempt already finished");
  });
});

describe("startSectionDiagnostic", () => {
  it("returns empty without creating an attempt when the section pool is empty", async () => {
    questionFindMany.mockResolvedValue([]);
    const started = await startSectionDiagnostic("u1", "MATH");
    expect(started).toEqual({ attemptId: "", questions: [] });
    expect(attemptCreate).not.toHaveBeenCalled();
  });

  it("creates a section-variant attempt from the section pool", async () => {
    const pool = Array.from({ length: 40 }, (_, i) => ({
      id: `q${i}`,
      section: "MATH",
      topic: i % 2 ? "numbers-algebra" : "measurement-data",
    }));
    // First findMany returns the id/section/topic pool; second returns full rows.
    questionFindMany
      .mockResolvedValueOnce(pool)
      .mockImplementationOnce(({ where }: { where: { id: { in: string[] } } }) =>
        Promise.resolve(
          where.id.in.map((id: string) => ({
            id,
            section: "MATH",
            topic: "numbers-algebra",
            subtopic: null,
            difficulty: 2,
            type: "single",
            stem: "s",
            options: ["a", "b"],
            correct: [0],
            explanation: null,
            rationale: null,
            images: null,
            hotspots: null,
            attribution: null,
          })),
        ),
      );
    attemptCreate.mockResolvedValue({ id: "a-new" });
    attemptItemCreateMany.mockResolvedValue({ count: 35 });

    const started = await startSectionDiagnostic("u1", "MATH");
    expect(started.attemptId).toBe("a-new");
    expect(started.questions).toHaveLength(35);
    expect(attemptCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          userId: "u1",
          mode: "DIAGNOSTIC",
          config: expect.objectContaining({ variant: "section", section: "MATH", total: 35 }),
        }),
      }),
    );
  });
});
