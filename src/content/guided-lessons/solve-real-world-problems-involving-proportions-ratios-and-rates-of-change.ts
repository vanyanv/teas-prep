import type { GuidedLesson } from "../guided-lesson-types";

/** Guided lesson for MATH / numbers-algebra / "Solve Real World Problems
 *  Involving Proportions, Ratios, and Rates of Change". Content carried over
 *  from the flat skill-lesson blocks, restructured into the concept / rule /
 *  example / mistake / quick check pattern. */
export const PROPORTIONS_RATIOS_RATES: GuidedLesson = {
  section: "MATH",
  topic: "numbers-algebra",
  skill:
    "Solve Real World Problems Involving Proportions, Ratios, and Rates of Change",
  slug: "solve-real-world-problems-involving-proportions-ratios-and-rates-of-change",
  title: "Proportions, Ratios, and Rates",
  summary:
    "Set up and solve ratio, rate, and proportion problems using cross-multiplication and unit rates.",
  minutes: [10, 12],
  objectives: [
    "Write a rate as a fraction with labeled units",
    "Split a total according to a given ratio",
    "Solve proportions by cross-multiplying",
    "Compute unit rates and use them to compare options",
  ],
  sections: [
    {
      id: "setting-up-rates",
      title: "Setting up rates",
      blocks: [
        {
          kind: "concept",
          body: "A rate compares two quantities with different units, written as a fraction. Keep the units consistent: whatever goes on top stays on top, and whatever goes on the bottom stays on the bottom.",
        },
        {
          kind: "example",
          title: "Miles per hour",
          steps: [
            {
              note: "A car travels 150 miles in 3 hours. Write the rate as miles over hours.",
              work: ["Rate = 150 miles / 3 hours"],
            },
            {
              note: "Divide to express the rate per hour.",
              work: ["150 ÷ 3 = 50"],
            },
          ],
          answer: "50 miles per hour",
        },
        {
          kind: "tip",
          body: "Label your units. Writing miles/hours keeps you from accidentally flipping the ratio.",
        },
      ],
      quickCheck: {
        prompt:
          "A nurse records 90 heartbeats in 60 seconds. Which fraction sets up the rate in beats per second?",
        choices: [
          "60 seconds / 90 beats",
          "90 beats / 60 seconds",
          "90 beats × 60 seconds",
          "60 beats / 90 seconds",
        ],
        answer: 1,
        explanation:
          "Beats per second means beats on top and seconds on the bottom: 90 beats / 60 seconds = 1.5 beats per second. Flipping the fraction gives seconds per beat instead.",
      },
    },
    {
      id: "ratio-word-problems",
      title: "Splitting a total by a ratio",
      blocks: [
        {
          kind: "concept",
          body: "A ratio compares parts. To split a total by a ratio, you first turn the ratio's numbers into actual share sizes.",
        },
        {
          kind: "rule",
          title: "Split a total by a ratio",
          ordered: true,
          items: [
            "Add the parts of the ratio to find the number of shares",
            "Divide the total by that number to find the size of one share",
            "Multiply each part of the ratio by the share size",
          ],
        },
        {
          kind: "example",
          title: "Split 30 in a 3:2 ratio",
          steps: [
            {
              note: "Add the parts to count the shares.",
              work: ["3 + 2 = 5 shares"],
            },
            {
              note: "Divide the total by the number of shares.",
              work: ["30 ÷ 5 = 6 per share"],
            },
            {
              note: "Multiply each part by the share size, then check the sum.",
              work: ["3 × 6 = 18", "2 × 6 = 12", "18 + 12 = 30"],
            },
          ],
          answer: "18 and 12",
        },
        {
          kind: "mistake",
          body: "The numbers in a ratio rarely add to the total directly. Do not answer 3 and 2 when splitting 30 in a 3:2 ratio; convert the ratio to actual share sizes first.",
        },
      ],
      quickCheck: {
        prompt: "Split 40 in a 5:3 ratio. What are the two amounts?",
        choices: ["5 and 3", "25 and 15", "20 and 20", "35 and 5"],
        answer: 1,
        explanation:
          "5 + 3 = 8 shares, and 40 ÷ 8 = 5 per share, so the parts are 5 × 5 = 25 and 3 × 5 = 15. The raw ratio numbers 5 and 3 are shares, not amounts.",
      },
    },
    {
      id: "cross-multiplying",
      title: "Cross-multiplying proportions",
      blocks: [
        {
          kind: "concept",
          body: "A proportion sets two ratios equal. When one value is unknown, solve by cross-multiplying: multiply diagonally across the equals sign, then divide to isolate the unknown.",
        },
        {
          kind: "rule",
          title: "Solve a proportion",
          ordered: true,
          items: [
            "Set the two ratios equal, with matching units across from each other",
            "Cross-multiply: multiply diagonally",
            "Divide to solve for the unknown",
          ],
        },
        {
          kind: "example",
          expression: "4/6 = x/15",
          steps: [
            {
              note: "Cross-multiply diagonally.",
              work: ["6 × x = 4 × 15"],
              becomes: "6x = 60",
            },
            {
              note: "Divide both sides by 6.",
              work: ["x = 60 ÷ 6 = 10"],
            },
          ],
          answer: "x = 10",
        },
        {
          kind: "example",
          expression: "3/4 = x/20",
          steps: [
            {
              note: "Cross-multiply.",
              work: ["4 × x = 3 × 20"],
              becomes: "4x = 60",
            },
            {
              note: "Divide both sides by 4.",
              work: ["x = 60 ÷ 4 = 15"],
            },
          ],
          answer: "x = 15",
        },
        {
          kind: "tip",
          body: "Keep matching units across from each other (miles with miles, hours with hours) when you build the proportion.",
        },
      ],
      quickCheck: {
        prompt: "Solve for x: 2/5 = x/25.",
        choices: ["x = 10", "x = 12", "x = 5", "x = 50"],
        answer: 0,
        explanation:
          "Cross-multiply: 5x = 2 × 25 = 50, so x = 50 ÷ 5 = 10. Answering 50 means you stopped before the final division.",
      },
    },
    {
      id: "unit-rates",
      title: "Unit rates",
      blocks: [
        {
          kind: "concept",
          body: "A unit rate tells you the amount per ONE unit. Divide to get a denominator of 1.\n\nUnit rates make comparison shopping easy: the lower price per item is the better deal.",
        },
        {
          kind: "example",
          title: "Price per item",
          steps: [
            {
              note: "$5.40 buys 6 items. Divide the price by the count.",
              work: ["5.40 ÷ 6 = 0.90"],
            },
          ],
          answer: "$0.90 per item",
        },
        {
          kind: "example",
          title: "Miles per gallon",
          steps: [
            {
              note: "A car goes 240 miles on 8 gallons. Divide miles by gallons.",
              work: ["240 ÷ 8 = 30"],
            },
          ],
          answer: "30 miles per gallon",
        },
        {
          kind: "tip",
          body: "To find a unit rate, always divide by the quantity you want ONE of: price per item divides by the item count, miles per gallon divides by the gallons.",
        },
      ],
      quickCheck: {
        prompt:
          "Brand A costs $3.60 for 4 items and Brand B costs $5.00 for 5 items. Which is the better deal?",
        choices: [
          "Brand A, at $0.90 per item",
          "Brand B, at $1.00 per item",
          "Brand B, because it includes more items",
          "They cost the same per item",
        ],
        answer: 0,
        explanation:
          "Brand A: 3.60 ÷ 4 = $0.90 per item. Brand B: 5.00 ÷ 5 = $1.00 per item. The lower price per item is the better deal, so Brand A wins.",
      },
    },
  ],
};
