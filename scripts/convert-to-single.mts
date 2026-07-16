/**
 * One-off content migration: rewrite every non-SINGLE seed question into a
 * standard single-answer multiple-choice item (NurseHub-style), so the whole
 * bank uses one input type. Reads the current aggregated bank and writes a
 * fully materialized SINGLE-only bank to questions.single.ts.
 *
 *   HOT_SPOT  -> reword the "Click the…" stem into a question, drop the image,
 *               keep the existing options/correct.
 *   ORDERED   -> label the items A–E in the stem; the four answer choices are
 *               candidate orderings (correct one plus scrambles).
 *   MULTI     -> label the items A–E in the stem; the four answer choices are
 *               subsets of letters (the true subset plus near-miss subsets).
 *   FILL_BLANK-> use hand-authored options + the correct answer (below).
 *
 * Run:  npx tsx scripts/convert-to-single.mts
 */
import { writeFileSync } from "node:fs";
import { QUESTIONS } from "../src/content/questions";
import type { SeedQuestion } from "../src/content/seed-types";

const LETTERS = ["A", "B", "C", "D", "E", "F"];

// Deterministic RNG so re-running produces identical output (no Math.random).
function rng(seed: number) {
  let s = (seed >>> 0) || 1;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
function shuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  const next = rng(seed);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** "A only" / "A and B" / "A, B, and D" for a sorted list of letters. */
function formatLetters(letters: string[]): string {
  if (letters.length === 1) return `${letters[0]} only`;
  if (letters.length === 2) return `${letters[0]} and ${letters[1]}`;
  return `${letters.slice(0, -1).join(", ")}, and ${letters[letters.length - 1]}`;
}

const norm = (s: string) => s.trim().replace(/\s+/g, " ");

// ── HOT_SPOT: reword each stem into a real question (keyed by original stem) ──
const HOTSPOT_STEMS: Record<string, string> = {
  "Click the chamber that pumps oxygen-rich blood out to the entire body.":
    "Which heart chamber pumps oxygen-rich blood out to the entire body?",
  "Click the chamber that receives oxygen-poor blood returning from the body through the venae cavae.":
    "Which heart chamber receives oxygen-poor blood returning from the body through the venae cavae?",
  "Click the chamber that pumps blood to the lungs through the pulmonary artery.":
    "Which heart chamber pumps blood to the lungs through the pulmonary artery?",
  "Click the part of the neuron that receives incoming signals from other neurons.":
    "Which part of the neuron receives incoming signals from other neurons?",
  "Click the structure that insulates the axon and speeds up signal transmission.":
    "Which structure insulates the axon and speeds up signal transmission?",
  "Click the part that carries the electrical impulse away from the cell body toward the axon terminals.":
    "Which part of the neuron carries the electrical impulse away from the cell body toward the axon terminals?",
  "Click the organ that releases acid and enzymes to break food into a semi-liquid mixture after swallowing.":
    "Which organ releases acid and enzymes to break food into a semi-liquid mixture after swallowing?",
  "Click the organ where most nutrients are absorbed into the bloodstream.":
    "In which organ are most nutrients absorbed into the bloodstream?",
  "Click the organ whose main job is to reabsorb water and form solid waste.":
    "Which organ's main job is to reabsorb water and form solid waste?",
  "Click the organelle known as the 'powerhouse of the cell,' where most ATP is produced.":
    "Which organelle is known as the 'powerhouse of the cell,' where most ATP is produced?",
  "Click the structure that controls what enters and leaves the cell.":
    "Which structure controls what enters and leaves the cell?",
  "Click the structure that contains the cell's DNA and directs its activities.":
    "Which structure contains the cell's DNA and directs its activities?",
};

// ── FILL_BLANK: authored answer choices (keyed by normalized stem) ──
// correct = the true answer; distractors = common wrong answers.
const FILL_BLANK: Record<string, { correct: string; distractors: string[] }> = {
  "A patient needs 250 mL of fluid every 6 hours. How many mL will they receive in 24 hours? (Enter a number.)":
    { correct: "1,000 mL", distractors: ["750 mL", "1,500 mL", "500 mL"] },
  "Daily rainfall (in inches) for one week was recorded: Mon: 0.5, Tue: 1.2, Wed: 0.0, Thu: 0.8, Fri: 1.5. What was the total rainfall for the week, in inches?":
    { correct: "4.0 inches", distractors: ["3.5 inches", "4.5 inches", "5.0 inches"] },
  "A data set of weekly sales totals is: 15, 22, 8, 30, 19. What is the range of the data set?":
    { correct: "22", distractors: ["30", "19", "8"] },
  "A package has a mass of 2.5 kg. About how many pounds is this? (1 kg ≈ 2.2 lb)":
    { correct: "5.5 lb", distractors: ["4.7 lb", "1.1 lb", "5.0 lb"] },
  "What is 1¾ + 2⅔? Write your answer as a mixed number in simplest form.":
    { correct: "4 5/12", distractors: ["3 5/12", "4 1/12", "3 7/12"] },
  "Express 45% as a fraction in simplest form.":
    { correct: "9/20", distractors: ["45/100", "9/25", "1/45"] },
  "Solve for x: 5x − 3 = 2x + 12":
    { correct: "5", distractors: ["3", "9", "-3"] },
  "On a map, 1 inch represents 25 miles. Two cities are 4.5 inches apart on the map. How many actual miles apart are they?":
    { correct: "112.5 miles", distractors: ["100 miles", "125 miles", "29.5 miles"] },
  "A data set of daily rainfall amounts (in mm) is: 7, 12, 4, 19, 10. What is the range of the data set? Enter your answer in mm.":
    { correct: "15 mm", distractors: ["19 mm", "10 mm", "4 mm"] },
  "A container holds 2.5 liters of solution. Using 1 L = 1000 mL, how many milliliters does it hold? Enter your answer in mL.":
    { correct: "2,500 mL", distractors: ["250 mL", "25,000 mL", "0.0025 mL"] },
  "Express 0.4% as a decimal.":
    { correct: "0.004", distractors: ["0.04", "0.4", "4.0"] },
  "Solve for x: x/4 + 6 = 14.":
    { correct: "32", distractors: ["2", "20", "40"] },
  "A recipe uses flour and sugar in a ratio of 3 cups flour to 2 cups sugar. If 12 cups of flour are used, how many cups of sugar are needed?":
    { correct: "8 cups", distractors: ["6 cups", "18 cups", "24 cups"] },
  "Calculate: 5.6 ÷ 0.7 = ____":
    { correct: "8", distractors: ["0.8", "80", "7"] },
  "Convert the mixed number 4 1/3 to an improper fraction: ____":
    { correct: "13/3", distractors: ["7/3", "12/3", "4/3"] },
  "A rope is 2.5 meters long. How many centimeters long is the rope? Enter a number.":
    { correct: "250 cm", distractors: ["25 cm", "2,500 cm", "0.025 cm"] },
  "A triangle has a base of 10 cm and a height of 6 cm. What is its area in cm^2? Enter a number.":
    { correct: "30 cm^2", distractors: ["60 cm^2", "16 cm^2", "15 cm^2"] },
  "A jacket normally costs $80. It is on sale for 25% off. What is the sale price in dollars? Enter a number.":
    { correct: "$60", distractors: ["$20", "$55", "$100"] },
  "Evaluate 2/3 + 1/4 and write the result as a fraction in lowest terms. Enter your answer as a fraction (for example, 5/6).":
    { correct: "11/12", distractors: ["3/7", "3/12", "5/6"] },
  "Solve for x: 3x - 7 = 14. Enter a number.":
    { correct: "7", distractors: ["21", "3", "5"] },
  "A car travels 150 miles on 5 gallons of gas. At the same rate, how many miles can it travel on 8 gallons of gas? Enter a number.":
    { correct: "240 miles", distractors: ["30 miles", "250 miles", "210 miles"] },
  "Choose the correct verb to complete the sentence: The list of approved vendors ___ posted on the bulletin board. Enter 'is' or 'are'.":
    { correct: "is", distractors: ["are", "were", "have been"] },
  "The prefix in the word 'subterranean' means ___. Enter one word.":
    { correct: "under", distractors: ["above", "around", "through"] },
  "The root 'aud' in the words 'audible,' 'auditorium,' and 'audition' relates to the act of ___. Enter one word.":
    { correct: "hearing", distractors: ["seeing", "speaking", "touching"] },
  "Read the sentence and determine the meaning of the underlined word. Because the directions were so 'ambiguous,' the students each interpreted the assignment differently. The word 'ambiguous' most nearly means ___. Enter one word.":
    { correct: "unclear", distractors: ["detailed", "lengthy", "forceful"] },
};

// Remove only the fixed "select all…" cue from a MULTI stem. (The rest of the
// stem carries the real criterion, so we never strip it.) ORDERED stems are
// kept verbatim — stripping their instruction risks dangling/empty stems.
function stripSelectAll(stem: string): string {
  return norm(stem.replace(/\s*Select all (?:that apply|of the[^.]*)\.?/gi, ""));
}

function build(): SeedQuestion[] {
  let counter = 0;
  return QUESTIONS.map((q): SeedQuestion => {
    counter += 1;
    const base = {
      section: q.section,
      topic: q.topic,
      ...(q.subtopic ? { subtopic: q.subtopic } : {}),
      ...(q.difficulty ? { difficulty: q.difficulty } : {}),
      type: "SINGLE" as const,
      explanation: q.explanation,
    };

    // Already single-answer choice items: keep as-is (preserve any figures).
    if (!q.type || q.type === "SINGLE") {
      return {
        ...base,
        stem: q.stem,
        options: q.options,
        correct: q.correct as number[],
        ...(q.images ? { images: q.images } : {}),
      };
    }

    if (q.type === "HOT_SPOT") {
      const reworded = HOTSPOT_STEMS[norm(q.stem)];
      if (!reworded) throw new Error(`No HOT_SPOT stem rewrite for: ${q.stem}`);
      return {
        ...base,
        stem: reworded,
        options: q.options,
        correct: q.correct as number[],
      };
    }

    if (q.type === "FILL_BLANK") {
      const entry = FILL_BLANK[norm(q.stem)];
      if (!entry) throw new Error(`No FILL_BLANK choices for: ${q.stem}`);
      const options = shuffle([entry.correct, ...entry.distractors], counter);
      return {
        ...base,
        stem: q.stem.replace(/\s*(?:\(Enter a number\.\)|Enter (?:a number|one word|your answer)[^.]*\.|Enter 'is' or 'are'\.)/gi, "").trim(),
        options,
        correct: [options.indexOf(entry.correct)],
      };
    }

    if (q.type === "ORDERED") {
      const items = q.options;
      const correctOrder = q.correct as number[]; // option indices in order
      const correctLetters = correctOrder.map((i) => LETTERS[i]);
      // Distractor orderings: reverse, adjacent-swap, rotate.
      const cands: number[][] = [
        [...correctOrder].reverse(),
        (() => { const a = [...correctOrder]; [a[0], a[1]] = [a[1], a[0]]; return a; })(),
        [...correctOrder.slice(1), correctOrder[0]],
        (() => { const a = [...correctOrder]; const m = a.length - 1; [a[m], a[m - 1]] = [a[m - 1], a[m]]; return a; })(),
      ];
      const key = (arr: number[]) => arr.join(",");
      const seen = new Set([key(correctOrder)]);
      const distractors: number[][] = [];
      for (const c of cands) {
        if (distractors.length >= 3) break;
        if (!seen.has(key(c))) { seen.add(key(c)); distractors.push(c); }
      }
      const asText = (order: number[]) => order.map((i) => LETTERS[i]).join(", ");
      const correctText = correctLetters.join(", ");
      const optionTexts = shuffle([correctText, ...distractors.map(asText)], counter);
      const list = items.map((o, i) => `${LETTERS[i]}. ${o}`).join("\n");
      return {
        ...base,
        stem: `${norm(q.stem)}\n\n${list}\n\nWhich of the following lists them in the correct order?`,
        options: optionTexts,
        correct: [optionTexts.indexOf(correctText)],
      };
    }

    // MULTI
    const items = q.options;
    const correctSet = [...(q.correct as number[])].sort((a, b) => a - b);
    const n = items.length;
    const keyOf = (s: number[]) => s.join(",");
    const correctKey = keyOf(correctSet);
    const toText = (s: number[]) => formatLetters(s.map((i) => LETTERS[i]));
    const seen = new Set([correctKey]);
    const distractors: number[][] = [];
    // Single-membership toggles first (closest near-misses), then pairs.
    const toggles: number[][] = [];
    for (let i = 0; i < n; i++) {
      const set = new Set(correctSet);
      set.has(i) ? set.delete(i) : set.add(i);
      toggles.push([...set].sort((a, b) => a - b));
    }
    for (let i = 0; i < n && distractors.length < 3; i++) {
      for (let j = i + 1; j < n && distractors.length < 3; j++) {
        const set = new Set(correctSet);
        [i, j].forEach((k) => (set.has(k) ? set.delete(k) : set.add(k)));
        toggles.push([...set].sort((a, b) => a - b));
      }
    }
    for (const cand of toggles) {
      if (distractors.length >= 3) break;
      const k = keyOf(cand);
      if (cand.length === 0 || seen.has(k)) continue;
      seen.add(k);
      distractors.push(cand);
    }
    const correctText = toText(correctSet);
    const optionTexts = shuffle([correctText, ...distractors.map(toText)], counter);
    const list = items.map((o, i) => `${LETTERS[i]}. ${o}`).join("\n");
    return {
      ...base,
      stem: `${stripSelectAll(q.stem)}\n\n${list}\n\nWhich of the following includes all of the correct choices?`,
      options: optionTexts,
      correct: [optionTexts.indexOf(correctText)],
    };
  });
}

const converted = build();

// Sanity checks before writing.
for (const q of converted) {
  if (q.type !== "SINGLE") throw new Error(`Not SINGLE: ${q.stem}`);
  const c = q.correct as number[];
  if (!Array.isArray(c) || c.length !== 1 || typeof c[0] !== "number")
    throw new Error(`Bad correct on: ${q.stem}`);
  if (c[0] < 0 || c[0] >= q.options.length)
    throw new Error(`Correct index out of range on: ${q.stem}`);
  if (q.options.length < 2) throw new Error(`Too few options on: ${q.stem}`);
  if (new Set(q.options).size !== q.options.length)
    throw new Error(`Duplicate options on: ${q.stem}`);
}

const header = `import type { SeedQuestion } from "./seed-types";

// AUTO-GENERATED by scripts/convert-to-single.mts — do not edit by hand.
// Every question here is standard single-answer multiple choice (SINGLE).
// Regenerate with: npx tsx scripts/convert-to-single.mts
export const QUESTIONS_SINGLE: SeedQuestion[] = ${JSON.stringify(converted, null, 2)};
`;

writeFileSync("src/content/questions.single.ts", header);
console.log(`Wrote ${converted.length} SINGLE questions to src/content/questions.single.ts`);
