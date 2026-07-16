import type { GuidedLesson } from "../guided-lesson-types";

/** Guided lesson for MATH / numbers-algebra / "Apply Estimation Strategies
 *  and Rounding Rules to Real World Problems". Content carried over from the
 *  flat skill-lesson blocks, restructured into the concept / rule / example /
 *  mistake / quick check pattern. */
export const ESTIMATION_AND_ROUNDING: GuidedLesson = {
  section: "MATH",
  topic: "numbers-algebra",
  skill: "Apply Estimation Strategies and Rounding Rules to Real World Problems",
  slug: "apply-estimation-strategies-and-rounding-rules-to-real-world-problems",
  title: "Estimation and Rounding",
  summary:
    "Round whole numbers and decimals correctly, and use estimation to check answers and solve word problems quickly.",
  minutes: [6, 8],
  objectives: [
    "Round whole numbers to a given place value",
    "Round decimals to a given place value",
    "Estimate answers by rounding to friendly values first",
    "Use an estimate to check a calculated answer for reasonableness",
  ],
  sections: [
    {
      id: "rounding",
      title: "Rounding whole numbers and decimals",
      blocks: [
        {
          kind: "concept",
          body: "Rounding replaces a number with a nearby, simpler one. The whole decision rests on a single digit: the one immediately to the right of the place you are rounding to.",
        },
        {
          kind: "rule",
          title: "How to round",
          ordered: true,
          items: [
            "Find the place you are rounding to",
            "Look at the digit just to its right",
            "If that digit is 5 or more, round up; if 4 or less, keep the digit",
            "Drop or zero out everything after the rounding place",
          ],
        },
        {
          kind: "example",
          title: "Round 4,687 to the nearest hundred",
          steps: [
            {
              note: "The hundreds digit is 6; the digit to its right is 8.",
              work: [],
            },
            {
              note: "8 is 5 or more, so round the 6 up to 7 and zero out the rest.",
              work: ["4,687 rounds to 4,700"],
            },
          ],
          answer: "4,700",
        },
        {
          kind: "example",
          title: "Round 3.6471 to the hundredths place",
          steps: [
            {
              note: "The hundredths digit is 4; the digit to its right is 7.",
              work: [],
            },
            {
              note: "7 is 5 or more, so round the 4 up to 5 and drop the digits after it.",
              work: ["3.6471 rounds to 3.65"],
            },
          ],
          answer: "3.65",
        },
        {
          kind: "mistake",
          body: "Only the single digit immediately to the right decides the rounding. Do not look at, or round through, the digits beyond it.",
        },
      ],
      quickCheck: {
        prompt: "Round 2,349 to the nearest hundred.",
        choices: ["2,300", "2,350", "2,400", "2,000"],
        answer: 0,
        explanation:
          "The hundreds digit is 3 and the digit to its right is 4, which is 4 or less, so keep the 3: 2,300. The 9 at the end plays no part in the decision.",
      },
    },
    {
      id: "estimation",
      title: "Estimation in word problems",
      blocks: [
        {
          kind: "concept",
          body: "Estimation trades a little precision for a lot of speed. Round the numbers to friendly values first, then compute, to get a quick approximate answer or to check a result for reasonableness.",
        },
        {
          kind: "rule",
          ordered: true,
          items: [
            "Round each number to a friendly value that is easy to work with",
            "Compute with the rounded values",
            "Compare the estimate to the exact answer if you have one",
          ],
        },
        {
          kind: "example",
          title: "About how much for 19 items at $4.85 each?",
          steps: [
            {
              note: "Round each number to a friendly value.",
              work: ["19 rounds to 20", "$4.85 rounds to $5"],
            },
            {
              note: "Compute with the rounded values.",
              work: ["20 × 5 = 100"],
            },
            {
              note: "The exact value is close to the estimate, so $100 is a sound estimate.",
              work: ["19 × 4.85 = 92.15"],
            },
          ],
          answer: "About $100",
        },
        {
          kind: "tip",
          body: "Estimation is great for catching big mistakes. If your calculated answer is far from your estimate, recheck your work.",
        },
      ],
      quickCheck: {
        prompt:
          "Which estimate is most reasonable for 31 boxes at $3.95 per box?",
        choices: ["About $12", "About $90", "About $120", "About $1,200"],
        answer: 2,
        explanation:
          "Round 31 to 30 and $3.95 to $4: 30 × 4 = 120, so about $120 is the sound estimate.",
      },
    },
  ],
};
