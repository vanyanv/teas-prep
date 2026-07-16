import type { GuidedLesson } from "../guided-lesson-types";

/** Guided lesson for MATH / numbers-algebra / "Solve Equations in One
 *  Variable". Content carried over from the flat skill-lesson blocks,
 *  restructured into the concept / rule / example / mistake / quick check
 *  pattern. */
export const SOLVE_EQUATIONS_IN_ONE_VARIABLE: GuidedLesson = {
  section: "MATH",
  topic: "numbers-algebra",
  skill: "Solve Equations in One Variable",
  slug: "solve-equations-in-one-variable",
  title: "Equations in One Variable",
  summary:
    "Isolate the variable using inverse operations, from one-step equations up to multi-step equations with distribution and variables on both sides.",
  minutes: [8, 10],
  objectives: [
    "Solve one-step equations using inverse operations",
    "Solve two-step equations by undoing addition before multiplication",
    "Clear parentheses with the distributive property",
    "Solve equations with variables on both sides",
    "Check a solution by substituting it back into the original equation",
  ],
  sections: [
    {
      id: "one-two-step",
      title: "One-step and two-step equations",
      blocks: [
        {
          kind: "concept",
          body: "Solving an equation means getting the variable alone on one side. You do that by undoing each operation with its inverse: subtraction undoes addition, division undoes multiplication. The one unbreakable rule is balance: whatever you do to one side, you must do to the other.",
        },
        {
          kind: "example",
          title: "One-step: undo addition",
          expression: "x + 7 = 12",
          steps: [
            {
              note: "The variable has 7 added to it, so subtract 7 from both sides.",
              work: ["x + 7 − 7 = 12 − 7"],
              becomes: "x = 5",
            },
          ],
          answer: "x = 5",
        },
        {
          kind: "example",
          title: "One-step: undo multiplication",
          expression: "3x = 21",
          steps: [
            {
              note: "The variable is multiplied by 3, so divide both sides by 3.",
              work: ["3x ÷ 3 = 21 ÷ 3"],
              becomes: "x = 7",
            },
          ],
          answer: "x = 7",
        },
        {
          kind: "example",
          title: "Two-step: undo in reverse order",
          expression: "2x + 5 = 17",
          steps: [
            {
              note: "Subtract 5 from both sides first.",
              work: ["2x + 5 − 5 = 17 − 5"],
              becomes: "2x = 12",
            },
            {
              note: "Divide both sides by 2.",
              work: ["12 ÷ 2 = 6"],
              becomes: "x = 6",
            },
          ],
          answer: "x = 6",
        },
        {
          kind: "tip",
          body: "In a two-step equation, undo addition or subtraction first, then multiplication or division. That is PEMDAS in reverse: you peel operations off the variable from the outside in.",
        },
        {
          kind: "mistake",
          body: "Doing an operation to one side only. If you subtract 5 from the left of 2x + 5 = 17 but not from the right, the equation is no longer true and every step after it is wrong.",
        },
      ],
      quickCheck: {
        prompt: "What is the best first step to solve 4x + 3 = 19?",
        choices: [
          "Divide both sides by 4",
          "Subtract 3 from both sides",
          "Add 3 to both sides",
          "Subtract 19 from both sides",
        ],
        answer: 1,
        explanation:
          "Undo the addition first: 4x = 16, then divide by 4 to get x = 4. Dividing first works only if you divide every term, which invites errors.",
      },
    },
    {
      id: "distribute-simplify",
      title: "Distributing and combining like terms",
      blocks: [
        {
          kind: "concept",
          body: "Multi-step equations often start with parentheses or several terms on one side. Before you can isolate the variable, simplify each side: distribute to clear the parentheses and combine like terms. After that, the equation solves like a two-step equation.",
        },
        {
          kind: "rule",
          title: "Multi-step order",
          ordered: true,
          items: [
            "Distribute to clear parentheses",
            "Combine like terms on each side",
            "Move variable terms to one side and numbers to the other",
            "Undo the remaining multiplication or division",
          ],
        },
        {
          kind: "example",
          expression: "3(x − 2) = 15",
          steps: [
            {
              note: "Distribute the 3 to both terms inside the parentheses.",
              work: ["3 × x = 3x", "3 × (−2) = −6"],
              becomes: "3x − 6 = 15",
            },
            {
              note: "Add 6 to both sides.",
              work: ["15 + 6 = 21"],
              becomes: "3x = 21",
            },
            {
              note: "Divide both sides by 3.",
              work: ["21 ÷ 3 = 7"],
              becomes: "x = 7",
            },
          ],
          answer: "x = 7",
        },
        {
          kind: "mistake",
          body: "Distributing to the first term only. 3(x − 2) is 3x − 6, not 3x − 2; the 3 multiplies every term inside the parentheses.",
        },
      ],
      quickCheck: {
        prompt: "After distributing, what does 2(x + 4) = 18 become?",
        choices: [
          "2x + 8 = 18",
          "2x + 4 = 18",
          "x + 8 = 18",
          "2x + 4 = 36",
        ],
        answer: 0,
        explanation:
          "The 2 multiplies both terms inside the parentheses: 2 × x = 2x and 2 × 4 = 8, so the equation becomes 2x + 8 = 18.",
      },
    },
    {
      id: "variables-both-sides",
      title: "Variables on both sides",
      blocks: [
        {
          kind: "concept",
          body: "When the variable appears on both sides, collect the variable terms on one side and the plain numbers on the other. Use the same inverse-operation moves: add or subtract a variable term from both sides, just as you would a number.",
        },
        {
          kind: "example",
          expression: "5x − 3 = 2x + 9",
          steps: [
            {
              note: "Subtract 2x from both sides so the variable lives on the left only.",
              work: ["5x − 2x = 3x"],
              becomes: "3x − 3 = 9",
            },
            {
              note: "Add 3 to both sides.",
              work: ["9 + 3 = 12"],
              becomes: "3x = 12",
            },
            {
              note: "Divide both sides by 3.",
              work: ["12 ÷ 3 = 4"],
              becomes: "x = 4",
            },
            {
              note: "Check by substituting x = 4 into the original equation.",
              work: ["5(4) − 3 = 17", "2(4) + 9 = 17"],
              becomes: "Both sides match, so x = 4 is correct",
            },
          ],
          answer: "x = 4",
        },
        {
          kind: "tip",
          body: "Move the smaller variable term to the other side (subtract 2x rather than 5x) so the remaining coefficient stays positive, and always check your answer by plugging it back into the original equation.",
        },
      ],
      quickCheck: {
        prompt: "Solve: 7x − 2 = 4x + 10",
        choices: ["x = 4", "x = 12", "x = 8/3", "x = 3"],
        answer: 0,
        explanation:
          "Subtract 4x from both sides (3x − 2 = 10), add 2 (3x = 12), then divide by 3: x = 4. Forgetting the final division gives 12.",
      },
    },
  ],
};
