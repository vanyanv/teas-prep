import type { GuidedLesson } from "../guided-lesson-types";

/** Guided lesson for MATH / numbers-algebra / "Compare & Order Rational
 *  Numbers". Content carried over from the flat skill-lesson blocks,
 *  restructured into the concept / rule / example / mistake / quick check
 *  pattern. */
export const COMPARE_ORDER_RATIONAL_NUMBERS: GuidedLesson = {
  section: "MATH",
  topic: "numbers-algebra",
  skill: "Compare & Order Rational Numbers",
  slug: "compare-order-rational-numbers",
  title: "Compare and Order Rational Numbers",
  summary:
    "Order fractions using common denominators and order mixed sets of negatives, decimals, and fractions together.",
  minutes: [5, 7],
  objectives: [
    "Compare fractions by rewriting them over a common denominator",
    "Order a set of fractions from least to greatest",
    "Order mixed sets of negatives, decimals, and fractions by converting to decimals",
    "Compare negative numbers correctly using distance from zero",
  ],
  sections: [
    {
      id: "ordering-fractions",
      title: "Ordering fractions",
      blocks: [
        {
          kind: "concept",
          body: "Fractions with different denominators count different-sized pieces, so their numerators cannot be compared directly. Give the fractions a common denominator first; then the pieces match, and comparing numerators tells you which fraction is larger.",
        },
        {
          kind: "rule",
          ordered: true,
          items: [
            "Find the least common denominator (LCD)",
            "Rewrite each fraction over the LCD",
            "Compare the numerators; the order of the numerators is the order of the fractions",
          ],
        },
        {
          kind: "example",
          title: "Order 2/3, 3/5, 7/10 from least to greatest",
          steps: [
            {
              note: "The LCD of 3, 5, and 10 is 30. Rewrite each fraction over 30.",
              work: ["2/3 = 20/30", "3/5 = 18/30", "7/10 = 21/30"],
            },
            {
              note: "Compare the numerators.",
              work: ["18 < 20 < 21"],
              becomes: "3/5 < 2/3 < 7/10",
            },
          ],
          answer: "3/5, 2/3, 7/10",
        },
        {
          kind: "tip",
          body: "With the same denominator, the larger numerator is the larger fraction. You can also convert each fraction to a decimal and compare that way.",
        },
      ],
      quickCheck: {
        prompt: "Which is greater, 3/5 or 5/8?",
        choices: [
          "3/5, because 3/5 has the smaller denominator",
          "5/8, because 5/8 = 25/40 and 3/5 = 24/40",
          "They are equal",
          "3/5, because 3 + 5 is less than 5 + 8",
        ],
        answer: 1,
        explanation:
          "The LCD of 5 and 8 is 40: 3/5 = 24/40 and 5/8 = 25/40. Since 25 > 24, 5/8 is greater.",
      },
    },
    {
      id: "ordering-mixed-rationals",
      title: "Ordering mixed rational numbers",
      blocks: [
        {
          kind: "concept",
          body: "When a list mixes negatives, decimals, and fractions, convert everything to decimals first so all the numbers are in one form, then order the decimals. For negatives, the number farther from zero is smaller: −2 < −1.5.",
        },
        {
          kind: "rule",
          ordered: true,
          items: [
            "Convert every number in the list to a decimal",
            "Order the decimals, remembering that a negative farther from zero is smaller",
            "Write the final answer using the original forms of the numbers",
          ],
        },
        {
          kind: "example",
          title: "Order −1/2, 0.3, −1.5, 3/4, −2 from least to greatest",
          steps: [
            {
              note: "Convert each number to a decimal.",
              work: ["−1/2 = −0.5", "3/4 = 0.75"],
              becomes: "−0.5, 0.3, −1.5, 0.75, −2",
            },
            {
              note: "Order the decimals; the negative farthest from zero comes first.",
              work: ["−2 < −1.5 < −0.5 < 0.3 < 0.75"],
            },
            {
              note: "Write the answer using the original forms.",
              work: [],
              becomes: "−2, −1.5, −1/2, 0.3, 3/4",
            },
          ],
          answer: "−2, −1.5, −1/2, 0.3, 3/4",
        },
        {
          kind: "mistake",
          body: "Do not treat −2 as greater than −1.5 because 2 is greater than 1.5. With negatives the comparison flips: the farther a number sits from zero, the smaller it is.",
        },
        {
          kind: "tip",
          body: "On a number line, least to greatest goes left to right. All negatives come before zero, and all positives come after.",
        },
      ],
      quickCheck: {
        prompt: "Which number is smallest: −0.7, −3/4, 0.2, or −0.5?",
        choices: ["−0.5", "−0.7", "−3/4", "0.2"],
        answer: 2,
        explanation:
          "Convert −3/4 to −0.75. It is farthest from zero among the negatives, so −3/4 is the smallest: −0.75 < −0.7 < −0.5 < 0.2.",
      },
    },
  ],
};
