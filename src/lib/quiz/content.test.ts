import { describe, expect, it } from "vitest";

import { fillBlankInstruction, parseStem, tokenize, typographize } from "./content";

describe("parseStem", () => {
  it("returns the whole stem as prompt when there is no passage", () => {
    const r = parseStem("What is the mean of 2, 4, and 6?");
    expect(r.passage).toBeUndefined();
    expect(r.lead).toBeUndefined();
    expect(r.prompt).toBe("What is the mean of 2, 4, and 6?");
  });

  it("splits a 'Read the passage' lead-in, passage body, and trailing prompt", () => {
    const stem =
      "Read the passage and answer the question.\n\n" +
      "For centuries, sailors navigated by dead reckoning.\n\n" +
      "The marine chronometer changed this by keeping accurate time.\n\n" +
      "Which choice best summarizes the passage?";
    const r = parseStem(stem);
    expect(r.lead).toBe("Read the passage and answer the question.");
    expect(r.passage).toContain("dead reckoning");
    expect(r.passage).toContain("marine chronometer");
    expect(r.prompt).toBe("Which choice best summarizes the passage?");
    // the prompt must not still be inside the passage
    expect(r.passage).not.toContain("best summarizes");
  });

  it("extracts a quoted passage introduced by 'Passage:'", () => {
    const stem =
      'Passage: "The city council voted to extend library hours after residents petitioned." What is the main idea?';
    const r = parseStem(stem);
    expect(r.passage).toContain("city council voted");
    expect(r.passage).not.toContain("Passage:");
    expect(r.prompt).toBe("What is the main idea?");
  });

  it("pulls label:value data lines out of the stem as dataRows", () => {
    const stem =
      "A bookstore recorded the number of books sold each day:\n" +
      "Mon: 12, Tue: 8, Wed: 15, Thu: 9, Fri: 21.\n" +
      "On which day were the most books sold?";
    const r = parseStem(stem);
    expect(r.dataRows).toEqual([
      ["Mon", "12"],
      ["Tue", "8"],
      ["Wed", "15"],
      ["Thu", "9"],
      ["Fri", "21"],
    ]);
    expect(r.dataCaption).toBe("A bookstore recorded the number of books sold each day");
    expect(r.prompt).toBe("On which day were the most books sold?");
    expect(r.prompt).not.toContain("Mon:");
  });

  it("does not treat a short single-paragraph prompt as a passage", () => {
    const stem = "In the sentence \"The negotiation reached an impasse,\" the word \"impasse\" most nearly means:";
    const r = parseStem(stem);
    expect(r.passage).toBeUndefined();
    expect(r.prompt).toBe(stem);
  });
});

describe("tokenize", () => {
  it("keeps plain prose as a single text token", () => {
    const toks = tokenize("The quick brown fox.");
    expect(toks).toEqual([{ kind: "text", value: "The quick brown fox." }]);
  });

  it("recognizes a simple slash fraction", () => {
    const toks = tokenize("What is 3/4 of the total?");
    const frac = toks.find((t) => t.kind === "frac");
    expect(frac).toMatchObject({ kind: "frac", num: "3", den: "4" });
  });

  it("recognizes a mixed number as whole + fraction", () => {
    const toks = tokenize("Add 4 5/12 cups.");
    const frac = toks.find((t) => t.kind === "frac");
    expect(frac).toMatchObject({ kind: "frac", whole: "4", num: "5", den: "12" });
  });

  it("does NOT turn a ratio into a fraction", () => {
    const toks = tokenize("Mix flour to sugar in a 3:2 ratio.");
    expect(toks.every((t) => t.kind !== "frac")).toBe(true);
  });

  it("does NOT turn a variable expression x/4 into a numeric fraction", () => {
    const toks = tokenize("Solve x/4 + 6 = 14.");
    expect(toks.every((t) => t.kind !== "frac")).toBe(true);
  });

  it("renders a caret exponent as a superscript", () => {
    const toks = tokenize("area in cm^2 total");
    const sup = toks.find((t) => t.kind === "sup");
    expect(sup).toMatchObject({ kind: "sup", value: "2" });
  });

  it("subscripts the digits in a chemical formula", () => {
    const toks = tokenize("Balance CH4 + O2 -> CO2 + 2H2O");
    const subs = toks.filter((t) => t.kind === "sub");
    // CH4, O2, CO2, H2O each contribute a subscript
    expect(subs.length).toBeGreaterThanOrEqual(4);
    expect(subs.some((t) => t.kind === "sub" && t.value === "4")).toBe(true);
  });

  it("does NOT subscript an ordinary capitalized word", () => {
    const toks = tokenize("The Mon2day typo");
    // guard: only element-like tokens become sub; a made-up word stays text-ish.
    // "Mon2day" is not a valid formula, so no sub is emitted for it.
    expect(toks.every((t) => t.kind !== "sub")).toBe(true);
  });

  it("marks a run of underscores as a blank", () => {
    const toks = tokenize("The medication was ____ in reducing fever.");
    expect(toks.some((t) => t.kind === "blank")).toBe(true);
  });

  it("round-trips every token's visible text back to the source (no loss)", () => {
    const reconstruct = (toks: ReturnType<typeof tokenize>) =>
      toks
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
              return "____";
          }
        })
        .join("");
    const src = "A circle r=5, area 78.5 cm^2, ratio 3/4 and CO2.";
    expect(reconstruct(tokenize(src))).toBe(src);
  });
});

describe("fillBlankInstruction", () => {
  it("splits a trailing 'Enter a number.' instruction out of the prompt", () => {
    const r = fillBlankInstruction(
      "A triangle has a base of 10 cm and a height of 6 cm. What is its area in cm^2? Enter a number.",
    );
    expect(r.prompt).toBe("A triangle has a base of 10 cm and a height of 6 cm. What is its area in cm^2?");
    expect(r.cue).toBe("Enter a number.");
    expect(r.numeric).toBe(true);
  });

  it("keeps a specific format instruction as the cue", () => {
    const r = fillBlankInstruction(
      "Evaluate 2/3 + 1/4. Enter your answer as a fraction (for example, 5/6).",
    );
    expect(r.prompt).toBe("Evaluate 2/3 + 1/4.");
    expect(r.cue).toBe("Enter your answer as a fraction (for example, 5/6).");
  });

  it("falls back to a default cue when the stem has no instruction", () => {
    const r = fillBlankInstruction("The capital of France is ____.");
    expect(r.prompt).toBe("The capital of France is ____.");
    expect(r.cue).toBe("Enter your answer");
  });
});

describe("typographize", () => {
  it("converts a straight double-quote pair to curly quotes", () => {
    expect(typographize('She said "hello" today.')).toBe("She said “hello” today.");
  });

  it("converts a contraction apostrophe to a curly apostrophe", () => {
    expect(typographize("the oven doesn't run hot")).toBe("the oven doesn’t run hot");
  });

  it("leaves DNA prime notation (3'-TAC) with a straight prime", () => {
    const out = typographize("The strand 3'-TACGGT-5' pairs up.");
    expect(out).toContain("3'-TACGGT-5'");
  });
});
