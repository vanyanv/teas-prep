import type { StructuredRationale } from "@/lib/quiz/rationale";

/**
 * Structured rationales, authored separately from the question bank and merged
 * by stem at seed time (see questions.ts). Keeping them here means the
 * machine-generated question files can be regenerated without losing authored
 * teaching content, and a rationale can never drift onto the wrong question:
 * the key is the exact stem, and seeding warns about any key that matches
 * nothing.
 *
 * Coverage is deliberately deep-first (one whole skill at a time) rather than
 * thin across the bank: a partial rationale reads as a broken promise, while a
 * complete skill gives the session engine something real to teach with.
 */
export const RATIONALES: Record<string, StructuredRationale> = {
  // ── MATH / numbers-algebra / Solve Equations in One Variable ──────────────
  // Note: "Solve for x: 3x + 5 = 20" is deliberately absent. That stem appears
  // twice in the bank with different options, so a stem-keyed entry could not
  // say which option index each distractor note belongs to. Both copies carry
  // their own inline rationale instead.
  "Solve for x: 2(x − 4) = 10": {
    takeaway: "Distribute to every term inside the parentheses, not just the variable.",
    steps: [
      "Distribute the 2: 2x − 8 = 10.",
      "Add 8 to both sides: 2x = 18.",
      "Divide both sides by 2: x = 9.",
    ],
    whyCorrect: "Check by substituting: 2(9 − 4) = 2(5) = 10.",
    distractors: {
      "0": "18 is the value of 2x. Divide by 2 to finish.",
      "2": "7 comes from distributing only to the x, writing 2x − 4 = 10 instead of 2x − 8 = 10.",
      "3": "1 subtracts the 8 from 10 instead of adding it to both sides.",
    },
    commonMistake:
      "Multiplying the 2 by x but forgetting the −4. The factor outside multiplies every term inside.",
  },
  "Solve for x: x/3 − 2 = 4": {
    takeaway: "When x is divided, multiply at the end to undo it.",
    steps: ["Add 2 to both sides: x/3 = 6.", "Multiply both sides by 3: x = 18."],
    whyCorrect: "Check by substituting: 18/3 − 2 = 6 − 2 = 4.",
    distractors: {
      "0": "6 is the value of x/3. Multiply by 3 to get x itself.",
      "1": "12 multiplies 4 by 3 before adding the 2, skipping a step.",
      "3": "2 subtracts instead of adds, and never undoes the division.",
    },
    commonMistake:
      "Dividing by 3 again at the end. x/3 is already divided; multiplying is what undoes it.",
  },
  "Solve for x: 5x − 3 = 2x + 12": {
    takeaway: "Collect the variable terms on one side first, then solve as usual.",
    steps: [
      "Subtract 2x from both sides: 3x − 3 = 12.",
      "Add 3 to both sides: 3x = 15.",
      "Divide both sides by 3: x = 5.",
    ],
    whyCorrect: "Check by substituting: 5(5) − 3 = 22 and 2(5) + 12 = 22.",
    commonMistake:
      "Moving the x terms and the constants in the same step. Do one at a time and the sign errors disappear.",
  },
  "Solve for x: 5x − 7 = 28.": {
    takeaway: "Add back what was subtracted, then divide by the coefficient.",
    steps: ["Add 7 to both sides: 5x = 35.", "Divide both sides by 5: x = 7."],
    whyCorrect: "Check by substituting: 5(7) − 7 = 35 − 7 = 28.",
    distractors: {
      "1": "4.2 divides 28 by 5 before adding the 7 back.",
      "2": "35 is the value of 5x. Divide by 5 to finish.",
      "3": "5 is the coefficient of x, not the solution.",
    },
    commonMistake:
      "Dividing while a constant is still attached to the variable term. Isolate 5x first.",
  },
  "Solve for x: 3(x + 4) = 2x + 19.": {
    takeaway: "Distribute first, then gather x on one side.",
    steps: [
      "Distribute the 3: 3x + 12 = 2x + 19.",
      "Subtract 2x from both sides: x + 12 = 19.",
      "Subtract 12 from both sides: x = 7.",
    ],
    whyCorrect: "Check by substituting: 3(7 + 4) = 33 and 2(7) + 19 = 33.",
    distractors: {
      "0": "31 adds 12 and 19 without ever combining the x terms.",
      "2": "1.4 divides instead of subtracting, treating 5x = 7.",
      "3": "−7 has a sign error: subtracting 12 from 19 gives 7, not −7.",
    },
    commonMistake:
      "Subtracting 3x instead of 2x, which flips the sign of the answer. Move the smaller x term.",
  },
  "Solve for x: x/4 + 6 = 14.": {
    takeaway: "Subtract the constant, then multiply away the division.",
    steps: ["Subtract 6 from both sides: x/4 = 8.", "Multiply both sides by 4: x = 32."],
    whyCorrect: "Check by substituting: 32/4 + 6 = 8 + 6 = 14.",
    commonMistake:
      "Multiplying by 4 before subtracting the 6, which multiplies the 6 as well.",
  },
  "Solve for x: x + 17 = 42": {
    takeaway: "Undo an addition by subtracting the same amount from both sides.",
    steps: ["Subtract 17 from both sides: x = 42 − 17 = 25."],
    whyCorrect: "Check by substituting: 25 + 17 = 42.",
    distractors: {
      "1": "26 is one off: 42 − 17 = 25, not 26.",
      "2": "59 adds 17 instead of subtracting it.",
      "3": "24 is one off: 42 − 17 = 25, not 24.",
    },
    commonMistake:
      "Adding the number that is already on the left. Whatever is done to x must be undone.",
  },
  "Solve for x: 6x = 54": {
    takeaway: "Undo multiplication by dividing both sides by the coefficient.",
    steps: ["Divide both sides by 6: x = 54 ÷ 6 = 9."],
    whyCorrect: "Check by substituting: 6(9) = 54.",
    distractors: {
      "0": "60 adds 6 instead of dividing by it.",
      "1": "8 gives 6(8) = 48, not 54.",
      "3": "48 subtracts 6 instead of dividing by it.",
    },
    commonMistake:
      "Treating 6x as 6 + x. A number written against a variable means multiplication.",
  },
  "Solve for x: 3x − 7 = 20": {
    takeaway: "Clear the constant first, then divide by the coefficient.",
    steps: ["Add 7 to both sides: 3x = 27.", "Divide both sides by 3: x = 9."],
    whyCorrect: "Check by substituting: 3(9) − 7 = 27 − 7 = 20.",
    distractors: {
      "0": "27 is the value of 3x. One step remains: divide by 3.",
      "1": "13/3 subtracts 7 from 20 instead of adding it, then divides.",
      "3": "4.5 halves 9; nothing in the equation divides by 2.",
    },
    commonMistake:
      "Subtracting 7 again because the equation shows a minus sign. The −7 is undone by adding.",
  },
  "Solve for x: 5x + 8 = 43": {
    takeaway: "Isolate the variable term before dividing.",
    steps: ["Subtract 8 from both sides: 5x = 35.", "Divide both sides by 5: x = 7."],
    whyCorrect: "Check by substituting: 5(7) + 8 = 35 + 8 = 43.",
    distractors: {
      "0": "10.2 divides 51 by 5, adding the 8 instead of subtracting it.",
      "1": "6 gives 5(6) + 8 = 38, not 43.",
      "2": "9.2 gives 5(9.2) + 8 = 54, not 43.",
    },
    commonMistake:
      "Dividing 43 by 5 first. The +8 has to come off before the coefficient can be undone.",
  },
  "Solve for x: 4(x − 3) = 28": {
    takeaway:
      "With a factor outside parentheses, dividing by it first is often the fastest route.",
    steps: ["Divide both sides by 4: x − 3 = 7.", "Add 3 to both sides: x = 10."],
    whyCorrect: "Check by substituting: 4(10 − 3) = 4(7) = 28.",
    distractors: {
      "0": "7 is the value of x − 3. Add 3 to get x.",
      "1": "13 gives 4(13 − 3) = 40, not 28.",
      "3": "7.75 comes from distributing only to the x, writing 4x − 3 = 28.",
    },
    commonMistake:
      "Stopping at x − 3 = 7. The question asks for x, so the last step is adding 3.",
  },
  "Solve for x: 7x − 4 = 3x + 16": {
    takeaway: "Variables to one side, numbers to the other, then divide.",
    steps: [
      "Subtract 3x from both sides: 4x − 4 = 16.",
      "Add 4 to both sides: 4x = 20.",
      "Divide both sides by 4: x = 5.",
    ],
    whyCorrect: "Check by substituting: 7(5) − 4 = 31 and 3(5) + 16 = 31.",
    distractors: {
      "0": "20 is the value of 4x. Divide by 4 to finish.",
      "2": "3 gives 7(3) − 4 = 17 and 3(3) + 16 = 25, which are not equal.",
      "3": "6 gives 7(6) − 4 = 38 and 3(6) + 16 = 34, which are not equal.",
    },
    commonMistake:
      "Forgetting the final division once the equation reads 4x = 20.",
  },
  "Solve for x: 2(x + 5) = 3x − 4": {
    takeaway:
      "When the larger x term is on the right, move the smaller one right to keep x positive.",
    steps: [
      "Distribute the 2: 2x + 10 = 3x − 4.",
      "Subtract 2x from both sides: 10 = x − 4.",
      "Add 4 to both sides: x = 14.",
    ],
    whyCorrect: "Check by substituting: 2(14 + 5) = 38 and 3(14) − 4 = 38.",
    distractors: {
      "1": "−14 is a sign error: adding 4 to 10 gives 14, not −14.",
      "2": "2 gives 2(2 + 5) = 14 and 3(2) − 4 = 2, which are not equal.",
      "3": "6 gives 2(6 + 5) = 22 and 3(6) − 4 = 14, which are not equal.",
    },
    commonMistake:
      "Subtracting 3x and then mishandling the negative coefficient. Moving the smaller x term avoids the negative entirely.",
  },
  "Solve for x: 5(x − 2) = 2(x + 7)": {
    takeaway: "Distribute on both sides before collecting like terms.",
    steps: [
      "Distribute both sides: 5x − 10 = 2x + 14.",
      "Subtract 2x from both sides: 3x − 10 = 14.",
      "Add 10 to both sides: 3x = 24.",
      "Divide both sides by 3: x = 8.",
    ],
    whyCorrect: "Check by substituting: 5(8 − 2) = 30 and 2(8 + 7) = 30.",
    distractors: {
      "0": "4 gives 5(4 − 2) = 10 and 2(4 + 7) = 22, which are not equal.",
      "2": "3 comes from failing to distribute, comparing 5x − 2 with 2x + 7.",
      "3": "6 gives 5(6 − 2) = 20 and 2(6 + 7) = 26, which are not equal.",
    },
    commonMistake:
      "Distributing one side but not the other. Both sets of parentheses must be expanded.",
  },
  "Solve for x: x ÷ 4 = 9": {
    takeaway: "Division is undone by multiplication.",
    steps: ["Multiply both sides by 4: x = 9 × 4 = 36."],
    whyCorrect: "Check by substituting: 36 ÷ 4 = 9.",
    distractors: {
      "0": "5 subtracts 4 instead of multiplying by it.",
      "1": "13 adds 4 instead of multiplying by it.",
      "2": "2.25 divides 9 by 4, repeating the operation instead of reversing it.",
    },
    commonMistake:
      "Dividing again because the equation shows a division sign. Ask what was done to x, then do the opposite.",
  },
  "Solve for x: 3x - 7 = 14. Enter a number.": {
    takeaway: "Add back the constant, then divide by the coefficient.",
    steps: ["Add 7 to both sides: 3x = 21.", "Divide both sides by 3: x = 7."],
    whyCorrect: "Check by substituting: 3(7) − 7 = 21 − 7 = 14.",
    commonMistake:
      "Entering 21, the value of 3x, instead of finishing the division.",
  },
  "Put the steps in the correct order to solve the equation 2x + 5 = 17.": {
    takeaway:
      "Solving unwinds the order of operations: undo addition, then multiplication, then check.",
    steps: [
      "Start from the equation as given: 2x + 5 = 17.",
      "Undo the addition: subtract 5 from both sides to get 2x = 12.",
      "Undo the multiplication: divide both sides by 2 to get x = 6.",
      "Check the solution: 2(6) + 5 = 12 + 5 = 17.",
    ],
    whyCorrect:
      "Each step isolates x a little further, and the check confirms the result satisfies the original equation.",
    commonMistake:
      "Dividing by 2 before removing the 5, which forces you to divide the 5 as well.",
  },
};
