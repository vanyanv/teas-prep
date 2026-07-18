import { describe, expect, it } from "vitest";

import {
  QUESTIONS,
  ambiguousRationaleKeys,
  orphanedRationaleKeys,
} from "./questions";
import { RATIONALES } from "./rationales";
import { structuredRationaleSchema } from "@/lib/quiz/rationale";

describe("authored rationales", () => {
  it("every key matches a question stem in the bank", () => {
    expect(orphanedRationaleKeys()).toEqual([]);
  });

  it("no key targets a duplicated stem", () => {
    // Distractors are keyed by option index; two questions sharing a stem can
    // have different options, so an ambiguous key could teach a wrong answer.
    expect(ambiguousRationaleKeys()).toEqual([]);
  });

  it("every rationale validates against the schema", () => {
    for (const [stem, r] of Object.entries(RATIONALES)) {
      const parsed = structuredRationaleSchema.safeParse(r);
      expect(parsed.success, `${stem}: ${parsed.error?.message}`).toBe(true);
    }
  });

  it("distractor keys are real option indices, and never the correct answer", () => {
    const byStem = new Map(QUESTIONS.map((q) => [q.stem, q]));
    for (const [stem, r] of Object.entries(RATIONALES)) {
      if (!r.distractors) continue;
      const q = byStem.get(stem)!;
      const correct = new Set(
        Array.isArray(q.correct) ? q.correct.map((c) => String(c)) : [],
      );
      for (const key of Object.keys(r.distractors)) {
        const i = Number(key);
        expect(i, `${stem}: index ${key} out of range`).toBeLessThan(q.options.length);
        expect(correct.has(key), `${stem}: index ${key} is a correct answer`).toBe(false);
      }
    }
  });

  it("merges onto the bank so the seeded question carries the rationale", () => {
    const q = QUESTIONS.find((x) => x.stem === "Solve for x: 6x = 54");
    expect(q?.rationale?.takeaway).toBeTruthy();
    expect(q?.rationale?.steps?.length).toBeGreaterThan(0);
  });
});
