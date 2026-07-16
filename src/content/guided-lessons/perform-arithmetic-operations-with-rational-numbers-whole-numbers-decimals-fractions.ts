import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for MATH / numbers-algebra / "Perform Arithmetic Operations
 * with Rational Numbers". Content carried over from the flat skill-lesson
 * blocks, restructured into the concept / rule / example / mistake / quick
 * check pattern. Quick checks are informal and never touch mastery.
 */
export const ARITHMETIC_RATIONAL_NUMBERS: GuidedLesson = {
  section: "MATH",
  topic: "numbers-algebra",
  skill:
    "Perform Arithmetic Operations with Rational Numbers (Whole Numbers, Decimals, & Fractions)",
  slug: "perform-arithmetic-operations-with-rational-numbers-whole-numbers-decimals-fractions",
  title: "Arithmetic Operations with Rational Numbers",
  summary:
    "Learn to work correctly with whole numbers, decimals, fractions, and mixed numbers.",
  minutes: [12, 15],
  objectives: [
    "Apply the order of operations",
    "Add, subtract, multiply, and divide decimals",
    "Simplify and compare equivalent fractions",
    "Convert between mixed numbers and improper fractions",
    "Perform arithmetic with fractions and mixed numbers",
  ],
  sections: [
    {
      id: "order-of-operations",
      title: "Order of operations",
      blocks: [
        {
          kind: "concept",
          body: "Every expression simplifies in one agreed order, so everyone reaches the same answer. Multiplication and division rank equally, as do addition and subtraction, so within each pair you simply work left to right.",
        },
        {
          kind: "rule",
          title: "Use this order",
          ordered: true,
          items: [
            "Parentheses",
            "Exponents",
            "Multiplication and division, from left to right",
            "Addition and subtraction, from left to right",
          ],
        },
        {
          kind: "example",
          expression: "6 + 2 × (3^2 − 1) ÷ 4",
          steps: [
            {
              note: "Evaluate the exponent, then finish the parentheses.",
              work: ["3^2 = 9", "9 − 1 = 8"],
              becomes: "6 + 2 × 8 ÷ 4",
            },
            {
              note: "Multiply and divide from left to right.",
              work: ["2 × 8 = 16", "16 ÷ 4 = 4"],
              becomes: "6 + 4",
            },
            {
              note: "Add.",
              work: ["6 + 4 = 10"],
            },
          ],
          answer: "10",
        },
        {
          kind: "mistake",
          body: "Do not add 6 + 2 first. Multiplication and division must be completed before any addition or subtraction.",
        },
      ],
      quickCheck: {
        prompt: "In 5 + 3 × 2, which operation should be completed first?",
        choices: [
          "The addition, because it comes first",
          "The multiplication",
          "Either, the order does not matter",
          "Neither, parentheses are required",
        ],
        answer: 1,
        explanation:
          "Multiplication outranks addition, so 3 × 2 = 6 first, then 5 + 6 = 11. Left to right only breaks ties within the same rank.",
      },
    },
    {
      id: "even-odd",
      title: "Even and odd numbers",
      blocks: [
        {
          kind: "concept",
          body: "Even numbers end in 0, 2, 4, 6, or 8; odd numbers end in 1, 3, 5, 7, or 9. The TEAS often asks whether a result will be even or odd, and the rules let you answer without computing.",
        },
        {
          kind: "rule",
          title: "Parity rules",
          items: [
            "even + even = even",
            "odd + odd = even",
            "even + odd = odd",
            "even × even = even",
            "even × odd = even",
            "odd × odd = odd",
          ],
        },
        {
          kind: "tip",
          body: "A product is odd only when every factor is odd. If even one factor is even, the whole product is even.",
        },
        {
          kind: "example",
          title: "Is 7 × 14 even or odd?",
          steps: [
            {
              note: "One factor, 14, is even, so the product must be even.",
              work: [],
            },
            {
              note: "Check by computing: 98 ends in 8, so it is even.",
              work: ["7 × 14 = 98"],
            },
          ],
          answer: "Even",
        },
      ],
      quickCheck: {
        prompt: "Without computing, is 9 × 13 even or odd?",
        choices: [
          "Even, because 9 + 13 is even",
          "Odd, because both factors are odd",
          "Even, because one factor is even",
          "It cannot be determined without multiplying",
        ],
        answer: 1,
        explanation:
          "odd × odd = odd. Both 9 and 13 are odd, so the product is odd (9 × 13 = 117).",
      },
    },
    {
      id: "word-problems",
      title: "Whole-number word problems",
      blocks: [
        {
          kind: "concept",
          body: "A word problem hides a plain calculation inside a story. Find what the question actually asks, pick the operation the wording suggests, and ignore numbers that do not answer that question.",
        },
        {
          kind: "rule",
          title: "Signal words",
          items: [
            "Total, altogether, combined: add",
            "How many left, fewer, difference: subtract",
            "Groups of, each, per: multiply",
            "Split evenly, shared: divide",
          ],
        },
        {
          kind: "wordProblem",
          problem:
            "A nurse stocks 8 carts with 24 syringes each, then uses 35 syringes from the supply. How many syringes were placed on the carts?",
          asking:
            "Only how many syringes were placed on the carts, not how many remain afterward.",
          relevant: ["8 carts", "24 syringes per cart"],
          extra: [
            "The 35 syringes used later. They do not change how many were placed.",
          ],
          operation: "Each pairs a group size with a count, so multiply.",
          calculation: "8 × 24 = 192",
          answer: "192 syringes were placed on the carts.",
        },
        {
          kind: "example",
          title: "Split evenly means divide",
          steps: [
            {
              note: "6 boxes hold 144 gloves total, split evenly. How many per box?",
              work: ["144 ÷ 6 = 24"],
            },
          ],
          answer: "24 gloves per box",
        },
        {
          kind: "mistake",
          body: "Do not use every number the problem mentions. Extra information is included on purpose; answer only what is asked.",
        },
      ],
      quickCheck: {
        prompt:
          "A problem says a clinic orders 12 boxes with 30 masks each. Which operation does the word each suggest?",
        choices: ["Addition", "Subtraction", "Multiplication", "Division"],
        answer: 2,
        explanation:
          "Each pairs a group size (30 masks) with a count of groups (12 boxes): 12 × 30 = 360 masks.",
      },
    },
    {
      id: "decimal-operations",
      title: "Decimal operations",
      blocks: [
        {
          kind: "concept",
          body: "Decimals use the same four operations as whole numbers. The only new skill is deciding where the decimal point lands, and each operation has its own rule for that.",
        },
        {
          kind: "tabs",
          tabs: [
            {
              label: "Add & subtract",
              blocks: [
                {
                  kind: "rule",
                  ordered: true,
                  items: [
                    "Write missing place values as zeros (12.4 becomes 12.40)",
                    "Line up the decimal points",
                    "Add or subtract as usual, bringing the point straight down",
                  ],
                },
                {
                  kind: "example",
                  expression: "12.4 + 3.75",
                  steps: [
                    {
                      note: "Write 12.4 as 12.40 so both numbers have two decimal places.",
                      work: ["12.4 = 12.40"],
                    },
                    {
                      note: "Align the decimal points and add.",
                      work: ["12.40 + 3.75 = 16.15"],
                    },
                  ],
                  answer: "16.15",
                },
                {
                  kind: "example",
                  title: "Subtraction works the same way",
                  steps: [
                    {
                      note: "Align the points, then subtract.",
                      work: ["20.00 − 7.85 = 12.15"],
                    },
                  ],
                  answer: "12.15",
                },
                {
                  kind: "mistake",
                  body: "Adding digits without aligning the decimal points, such as lining the 4 of 12.4 under the 5 of 3.75, gives a wrong answer. The points must sit in one column.",
                },
              ],
            },
            {
              label: "Multiply",
              blocks: [
                {
                  kind: "rule",
                  ordered: true,
                  items: [
                    "Ignore the decimal points and multiply the digits",
                    "Count the decimal places in both factors combined",
                    "Place the point so the product has that many decimal places",
                  ],
                },
                {
                  kind: "example",
                  expression: "1.2 × 0.05",
                  steps: [
                    {
                      note: "Multiply the digits, ignoring the points.",
                      work: ["12 × 5 = 60"],
                    },
                    {
                      note: "The factors have 1 + 2 = 3 decimal places, so move the point three places.",
                      work: ["0.060 = 0.06"],
                    },
                  ],
                  answer: "0.06",
                },
                {
                  kind: "mistake",
                  body: "Do not line up the decimal points to multiply. That rule belongs to addition and subtraction; here you count decimal places instead.",
                },
              ],
            },
            {
              label: "Divide",
              blocks: [
                {
                  kind: "rule",
                  ordered: true,
                  items: [
                    "Move the divisor's point right until it is a whole number",
                    "Move the dividend's point the same number of places",
                    "Divide as usual",
                  ],
                },
                {
                  kind: "example",
                  expression: "4.5 ÷ 0.9",
                  steps: [
                    {
                      note: "Move both decimal points one place to the right.",
                      work: ["4.5 ÷ 0.9 = 45 ÷ 9"],
                    },
                    {
                      note: "Divide.",
                      work: ["45 ÷ 9 = 5"],
                    },
                  ],
                  answer: "5",
                },
                {
                  kind: "mistake",
                  body: "Move both points the same number of places. Shifting only the divisor's point changes the answer.",
                },
              ],
            },
          ],
        },
      ],
      quickCheck: {
        prompt: "Where should the decimal point go in 0.3 × 0.2?",
        choices: ["0.6", "0.06", "6", "0.006"],
        answer: 1,
        explanation:
          "3 × 2 = 6, and the factors have 1 + 1 = 2 decimal places, so the product is 0.06.",
      },
    },
    {
      id: "equivalent-fractions",
      title: "Equivalent and simplified fractions",
      blocks: [
        {
          kind: "concept",
          body: "Two fractions are equivalent when they name the same amount, like 3/4 and 9/12. You expand fractions to build a common denominator and simplify them to put an answer in lowest terms.",
        },
        {
          kind: "rule",
          items: [
            "Expand: multiply the numerator and denominator by the same number",
            "Simplify: divide the numerator and denominator by their greatest common factor",
          ],
        },
        {
          kind: "example",
          title: "Expand to build an equivalent fraction",
          steps: [
            {
              note: "Multiply top and bottom of 3/4 by 3. This is how you reach a common denominator.",
              work: ["3/4 = 9/12"],
            },
          ],
          answer: "3/4 = 9/12",
        },
        {
          kind: "example",
          title: "Simplify 18/24 to lowest terms",
          steps: [
            {
              note: "The greatest common factor of 18 and 24 is 6. Divide both by it.",
              work: ["18 ÷ 6 = 3", "24 ÷ 6 = 4"],
              becomes: "18/24 = 3/4",
            },
          ],
          answer: "3/4",
        },
        {
          kind: "tip",
          body: "A fraction is fully simplified when the numerator and denominator share no common factor other than 1.",
        },
      ],
      quickCheck: {
        prompt: "Which fraction is equivalent to 2/3?",
        choices: ["3/4", "8/12", "4/9", "6/8"],
        answer: 1,
        explanation:
          "Multiply top and bottom of 2/3 by 4: 2/3 = 8/12. The others change the value.",
      },
    },
    {
      id: "mixed-numbers",
      title: "Mixed numbers and improper fractions",
      blocks: [
        {
          kind: "concept",
          body: "A mixed number like 2 3/5 is a whole number plus a fraction. An improper fraction like 13/5 has a numerator at least as large as its denominator. Converting between the two is a constant step in fraction arithmetic.",
        },
        {
          kind: "rule",
          items: [
            "Mixed to improper: multiply the whole number by the denominator, add the numerator, keep the denominator",
            "Improper to mixed: divide the numerator by the denominator; the quotient is the whole number, the remainder is the new numerator",
          ],
        },
        {
          kind: "example",
          title: "Mixed to improper",
          expression: "2 3/5",
          steps: [
            {
              note: "Multiply the whole number by the denominator and add the numerator.",
              work: ["2 × 5 + 3 = 13"],
              becomes: "2 3/5 = 13/5",
            },
          ],
          answer: "13/5",
        },
        {
          kind: "example",
          title: "Improper to mixed",
          expression: "17/4",
          steps: [
            {
              note: "Divide the numerator by the denominator.",
              work: ["17 ÷ 4 = 4 remainder 1"],
              becomes: "17/4 = 4 1/4",
            },
          ],
          answer: "4 1/4",
        },
        {
          kind: "mistake",
          body: "Do not just move the whole number on top. In 2 3/5 the 2 is worth 10 fifths, so the improper form is 13/5, not 5/5 or 23/5.",
        },
      ],
      quickCheck: {
        prompt: "Write 3 1/4 as an improper fraction.",
        choices: ["7/4", "12/4", "13/4", "4/13"],
        answer: 2,
        explanation: "3 × 4 + 1 = 13, over the same denominator: 13/4.",
      },
    },
    {
      id: "add-subtract-fractions",
      title: "Adding and subtracting fractions",
      blocks: [
        {
          kind: "concept",
          body: "Fractions can only be added or subtracted when they count same-sized pieces, so the first move is always rewriting them over a common denominator.",
        },
        {
          kind: "rule",
          ordered: true,
          items: [
            "Find the least common denominator (LCD)",
            "Rewrite each fraction over it",
            "Add or subtract the numerators; keep the denominator",
            "Simplify, converting an improper result to a mixed number if needed",
          ],
        },
        {
          kind: "example",
          expression: "1/3 + 1/4",
          steps: [
            {
              note: "The LCD of 3 and 4 is 12. Rewrite both fractions.",
              work: ["1/3 = 4/12", "1/4 = 3/12"],
            },
            {
              note: "Add the numerators; the denominator stays.",
              work: ["4/12 + 3/12 = 7/12"],
            },
          ],
          answer: "7/12",
        },
        {
          kind: "example",
          title: "Mixed numbers: combine wholes and fractions",
          expression: "2 1/2 + 1 2/3",
          steps: [
            {
              note: "Rewrite both fraction parts over the LCD, 6.",
              work: ["2 1/2 = 2 3/6", "1 2/3 = 1 4/6"],
            },
            {
              note: "Add wholes and fractions separately.",
              work: ["2 3/6 + 1 4/6 = 3 7/6"],
            },
            {
              note: "7/6 is improper: carry the extra whole.",
              work: ["7/6 = 1 1/6"],
              becomes: "3 7/6 = 4 1/6",
            },
          ],
          answer: "4 1/6",
        },
        {
          kind: "mistake",
          body: "Never add the denominators. 1/3 + 1/4 is not 2/7; the pieces must be the same size before you can count them together.",
        },
        {
          kind: "tip",
          body: "When subtracting mixed numbers and the top fraction is smaller, borrow 1 from the whole number as a fraction first (3 1/4 becomes 2 5/4).",
        },
      ],
      quickCheck: {
        prompt: "1/2 + 1/3 = ?",
        choices: ["2/5", "1/5", "5/6", "2/6"],
        answer: 2,
        explanation:
          "LCD is 6: 1/2 = 3/6 and 1/3 = 2/6, so 3/6 + 2/6 = 5/6. Adding tops and bottoms straight across (2/5) is the classic trap.",
      },
    },
    {
      id: "multiply-divide-fractions",
      title: "Multiplying and dividing fractions",
      blocks: [
        {
          kind: "concept",
          body: "Multiplying fractions is direct: multiply straight across. Division uses the reciprocal: dividing by a fraction is the same as multiplying by that fraction flipped. Convert mixed numbers to improper fractions before either operation.",
        },
        {
          kind: "rule",
          title: "Multiply",
          ordered: true,
          items: [
            "Convert any mixed numbers to improper fractions",
            "Multiply straight across: top × top, bottom × bottom",
            "Simplify",
          ],
        },
        {
          kind: "example",
          expression: "2/3 × 3/4",
          steps: [
            {
              note: "Multiply numerators and denominators straight across.",
              work: ["2 × 3 = 6", "3 × 4 = 12"],
              becomes: "2/3 × 3/4 = 6/12",
            },
            {
              note: "Simplify.",
              work: ["6/12 = 1/2"],
            },
          ],
          answer: "1/2",
        },
        {
          kind: "rule",
          title: "Divide: keep, change, flip",
          ordered: true,
          items: [
            "Keep the first fraction",
            "Change ÷ to ×",
            "Flip the second fraction (use its reciprocal)",
          ],
        },
        {
          kind: "why",
          label: "Why does flipping the second fraction work?",
          body: "Division asks how many of the divisor fit into the dividend. Dividing by 2/3 asks how many two-thirds fit, and every whole holds 3/2 of them, so dividing by 2/3 is the same as multiplying by 3/2. The reciprocal is that question written as arithmetic: a ÷ b/c = a × c/b.",
        },
        {
          kind: "example",
          expression: "3/4 ÷ 2/3",
          steps: [
            {
              note: "Keep 3/4, change ÷ to ×, flip 2/3 to 3/2.",
              work: ["3/4 ÷ 2/3 = 3/4 × 3/2"],
            },
            {
              note: "Multiply straight across.",
              work: ["3/4 × 3/2 = 9/8"],
            },
            {
              note: "Convert the improper result to a mixed number.",
              work: ["9/8 = 1 1/8"],
            },
          ],
          answer: "1 1/8",
        },
        {
          kind: "example",
          title: "Mixed numbers convert first",
          expression: "1 1/2 × 2",
          steps: [
            {
              note: "Convert 1 1/2 to an improper fraction and write 2 as 2/1.",
              work: ["1 1/2 = 3/2"],
            },
            {
              note: "Multiply straight across and simplify.",
              work: ["3/2 × 2/1 = 6/2", "6/2 = 3"],
            },
          ],
          answer: "3",
        },
        {
          kind: "mistake",
          body: "Only the fraction you are dividing by gets flipped. Do not flip the first fraction, and do not flip anything when multiplying.",
        },
      ],
      quickCheck: {
        prompt:
          "To compute 3/4 ÷ 2/3 with keep-change-flip, which multiplication do you set up?",
        choices: ["3/4 × 2/3", "4/3 × 2/3", "3/4 × 3/2", "4/3 × 3/2"],
        answer: 2,
        explanation:
          "Keep 3/4, change ÷ to ×, flip 2/3 into 3/2: 3/4 × 3/2 = 9/8 = 1 1/8.",
      },
    },
  ],
};
