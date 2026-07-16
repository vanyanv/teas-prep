import { describe, expect, it } from "vitest";

import { QUESTIONS } from "../../content/questions";
import { parseStem, tokenize } from "./content";

/** Reconstruct the visible text a token set was derived from (no info loss). */
function reconstruct(toks: ReturnType<typeof tokenize>): string {
  return toks
    .map((t) => {
      switch (t.kind) {
        case "text":
          return t.value;
        case "sub":
          return t.value;
        case "sup":
          return "^" + t.value;
        case "frac":
          return `${t.whole ? t.whole + " " : ""}${t.num}/${t.den}`;
        case "blank":
          return "";
      }
    })
    .join("");
}

describe("content parser over the full bank", () => {
  it("parses every stem without throwing and always yields a prompt", () => {
    for (const q of QUESTIONS) {
      const parsed = parseStem(q.stem);
      expect(parsed.prompt.length).toBeGreaterThan(0);
    }
  });

  it("tokenizes every stem and option with no character loss (blanks aside)", () => {
    for (const q of QUESTIONS) {
      for (const text of [q.stem, ...q.options, q.explanation ?? ""]) {
        const stripped = text.replace(/_{2,}/g, "");
        expect(reconstruct(tokenize(text)).replace(/_{2,}/g, "")).toBe(stripped);
      }
    }
  });

  it("never emits an empty numerator or denominator", () => {
    for (const q of QUESTIONS) {
      for (const text of [q.stem, ...q.options]) {
        for (const t of tokenize(text)) {
          if (t.kind === "frac") {
            expect(t.num.length).toBeGreaterThan(0);
            expect(t.den.length).toBeGreaterThan(0);
          }
        }
      }
    }
  });
});
