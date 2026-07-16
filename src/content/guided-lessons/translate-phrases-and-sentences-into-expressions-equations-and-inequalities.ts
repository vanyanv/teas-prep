import type { GuidedLesson } from "../guided-lesson-types";

/** Guided lesson for MATH / numbers-algebra / "Translate Phrases and
 *  Sentences into Expressions, Equations, and Inequalities". Content carried
 *  over from the flat skill-lesson blocks, restructured into the concept /
 *  rule / example / mistake / quick check pattern. */
export const TRANSLATE_EXPRESSIONS_EQUATIONS_INEQUALITIES: GuidedLesson = {
  section: "MATH",
  topic: "numbers-algebra",
  skill:
    "Translate Phrases and Sentences into Expressions, Equations, and Inequalities",
  slug: "translate-phrases-and-sentences-into-expressions-equations-and-inequalities",
  title: "Translating Words into Algebra",
  summary:
    "Turn words into algebra, simplify expressions, and solve inequalities, remembering to flip the sign when multiplying or dividing by a negative.",
  minutes: [8, 10],
  objectives: [
    "Translate word phrases into algebraic expressions and equations",
    "Write inequalities from comparison phrases like at least and no more than",
    "Simplify expressions by combining like terms and distributing",
    "Solve inequalities, flipping the sign when multiplying or dividing by a negative",
  ],
  sections: [
    {
      id: "expressions-equations",
      title: "Writing expressions and equations",
      blocks: [
        {
          kind: "concept",
          body: "Word problems describe math in English, and translating them starts with a small vocabulary of key words. Each operation has its own signal words, and the word is or equals marks where the equals sign goes.",
        },
        {
          kind: "rule",
          title: "Key words by operation",
          items: [
            "Sum, more than: add",
            "Difference, less than: subtract",
            "Product, times: multiply",
            "Quotient: divide",
            "Is, equals: =",
          ],
        },
        {
          kind: "example",
          title: "Translate two phrases into expressions",
          steps: [
            {
              note: "5 more than twice a number: twice a number is 2n, and 5 more than it adds 5.",
              work: ["2n + 5"],
            },
            {
              note: "The quotient of x and 3: quotient means divide, in the order given.",
              work: ["x/3"],
            },
          ],
          answer: "2n + 5 and x/3",
        },
        {
          kind: "example",
          title: "Translate a sentence into an equation",
          steps: [
            {
              note: "Three less than a number is 12. Less than subtracts from the number, and is becomes =.",
              work: ["n − 3 = 12"],
            },
          ],
          answer: "n − 3 = 12",
        },
        {
          kind: "mistake",
          body: "Less than reverses the order. Three less than a number is n − 3, not 3 − n.",
        },
      ],
      quickCheck: {
        prompt: "Which expression means 7 less than a number?",
        choices: ["7 − n", "n − 7", "n + 7", "7/n"],
        answer: 1,
        explanation:
          "Less than reverses the order: you take 7 away from the number, so n − 7. Writing 7 − n is the classic trap.",
      },
    },
    {
      id: "writing-inequalities",
      title: "Writing inequalities",
      blocks: [
        {
          kind: "concept",
          body: "Some sentences compare instead of equate: a dose must be at least 10 mg, a wait must be no more than 30 minutes. These translate into inequality signs, and the phrase tells you which sign and whether the boundary value counts.",
        },
        {
          kind: "rule",
          title: "Comparison phrases",
          items: [
            "At least, no less than, minimum: ≥",
            "At most, no more than, maximum: ≤",
            "More than, greater than: >",
            "Less than, fewer than: <",
          ],
        },
        {
          kind: "example",
          title: "Translate two sentences",
          steps: [
            {
              note: "A dose must be at least 10 mg. At least includes 10, so use ≥.",
              work: ["x ≥ 10"],
            },
            {
              note: "A wait time of no more than 30 minutes. No more than includes 30, so use ≤.",
              work: ["t ≤ 30"],
            },
          ],
          answer: "x ≥ 10 and t ≤ 30",
        },
        {
          kind: "tip",
          body: "At least and at most include the boundary value, so they use ≥ and ≤. More than and less than exclude it, so they use > and <.",
        },
      ],
      quickCheck: {
        prompt:
          "A patient must drink at least 8 cups of water. Which inequality matches?",
        choices: ["c > 8", "c < 8", "c ≥ 8", "c ≤ 8"],
        answer: 2,
        explanation:
          "At least means 8 counts, so the sign must include the boundary: c ≥ 8. Using > would wrongly exclude exactly 8 cups.",
      },
    },
    {
      id: "simplifying-expressions",
      title: "Simplifying expressions",
      blocks: [
        {
          kind: "concept",
          body: "Once an expression is written, you often need to simplify it. Two moves do most of the work: combine like terms (terms with the same variable) and distribute when there are parentheses.",
        },
        {
          kind: "rule",
          items: [
            "Combine like terms: add or subtract terms with the same variable",
            "Distribute: multiply the number outside the parentheses by every term inside",
          ],
        },
        {
          kind: "example",
          title: "Combine like terms",
          expression: "3x + 5 − x + 2",
          steps: [
            {
              note: "Group the x terms together and the plain numbers together.",
              work: ["(3x − x) + (5 + 2)"],
            },
            {
              note: "Combine each group.",
              work: ["3x − x = 2x", "5 + 2 = 7"],
              becomes: "2x + 7",
            },
          ],
          answer: "2x + 7",
        },
        {
          kind: "example",
          title: "Distribute",
          expression: "2(3x − 4)",
          steps: [
            {
              note: "Multiply the 2 by each term inside the parentheses.",
              work: ["2 × 3x = 6x", "2 × 4 = 8"],
              becomes: "6x − 8",
            },
          ],
          answer: "6x − 8",
        },
        {
          kind: "mistake",
          body: "Only like terms combine. 2x and 7 cannot be added together, because one has a variable and one does not.",
        },
      ],
      quickCheck: {
        prompt: "Simplify 4x + 3 − x + 6.",
        choices: ["3x + 9", "5x + 9", "12x", "3x + 3"],
        answer: 0,
        explanation:
          "Combine the x terms (4x − x = 3x) and the numbers (3 + 6 = 9): 3x + 9. The x terms and plain numbers never merge with each other.",
      },
    },
    {
      id: "solving-inequalities",
      title: "Solving inequalities: flip the sign",
      blocks: [
        {
          kind: "concept",
          body: "Solve inequalities exactly like equations, with one extra rule: when you multiply or divide both sides by a negative number, flip the inequality sign.",
        },
        {
          kind: "rule",
          title: "The flip rule",
          items: [
            "Add or subtract on both sides: sign stays the same",
            "Multiply or divide by a positive number: sign stays the same",
            "Multiply or divide by a negative number: flip the sign",
          ],
        },
        {
          kind: "example",
          title: "A flip is needed",
          expression: "−2x < 6",
          steps: [
            {
              note: "Divide both sides by −2, and flip < to > because the divisor is negative.",
              work: ["x > −3"],
            },
          ],
          answer: "x > −3",
        },
        {
          kind: "example",
          title: "No flip needed",
          expression: "3x + 4 ≤ 19",
          steps: [
            {
              note: "Subtract 4 from both sides. Subtracting never flips the sign.",
              work: ["3x ≤ 15"],
            },
            {
              note: "Divide both sides by positive 3, so the sign stays.",
              work: ["x ≤ 5"],
            },
          ],
          answer: "x ≤ 5",
        },
        {
          kind: "mistake",
          body: "You only flip the sign for a negative multiply or divide, never for adding or subtracting. Subtracting a number from both sides leaves the sign alone.",
        },
      ],
      quickCheck: {
        prompt: "Solve −3x ≥ 12.",
        choices: ["x ≥ −4", "x ≤ −4", "x ≥ 4", "x ≤ 4"],
        answer: 1,
        explanation:
          "Divide both sides by −3 and flip ≥ to ≤: x ≤ −4. Forgetting the flip gives x ≥ −4.",
      },
    },
  ],
};
