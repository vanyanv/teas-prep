import type { GuidedLesson } from "../guided-lesson-types";

/** Guided lesson for MATH / numbers-algebra / "Solve Real World Problems
 *  Involving Percents". Content carried over from the flat skill-lesson
 *  blocks, restructured into the concept / rule / example / mistake / quick
 *  check pattern. */
export const REAL_WORLD_PERCENT_PROBLEMS: GuidedLesson = {
  section: "MATH",
  topic: "numbers-algebra",
  skill: "Solve Real World Problems Involving Percents",
  slug: "solve-real-world-problems-involving-percents",
  title: "Real-World Percent Problems",
  summary:
    "Find a percent of a whole, recover the whole from a part, read percents from tables, and handle increase, decrease, discount, and tax.",
  minutes: [12, 15],
  objectives: [
    "Find a percent of a whole by converting the percent to a decimal",
    "Recover the whole when you know a part and the percent it represents",
    "Calculate a percent from table data",
    "Compute percent increase and decrease from the original amount",
    "Apply discounts and tax to prices",
  ],
  sections: [
    {
      id: "percent-of-whole",
      title: "Finding the percent of a whole",
      blocks: [
        {
          kind: "concept",
          body: "The most common percent question gives you a whole amount and asks for some percent of it. The method is always the same: convert the percent to a decimal and multiply by the whole.",
        },
        {
          kind: "rule",
          ordered: true,
          items: [
            "Convert the percent to a decimal (20% becomes 0.20)",
            "Multiply the decimal by the whole",
          ],
        },
        {
          kind: "example",
          title: "What is 20% of 80?",
          steps: [
            {
              note: "Convert the percent to a decimal.",
              work: ["20% = 0.20"],
            },
            {
              note: "Multiply by the whole.",
              work: ["0.20 × 80 = 16"],
            },
          ],
          answer: "16",
        },
        {
          kind: "example",
          title: "A dosage example",
          steps: [
            {
              note: "A 250 mg dose; the patient gets 30% of it. Convert and multiply.",
              work: ["0.30 × 250 = 75"],
            },
          ],
          answer: "75 mg",
        },
        {
          kind: "tip",
          body: "The word of usually signals multiplication. \"30% of 250\" reads directly as 0.30 × 250.",
        },
      ],
      quickCheck: {
        prompt: "What is 40% of 150?",
        choices: ["6", "60", "3.75", "110"],
        answer: 1,
        explanation:
          "Convert 40% to 0.40, then multiply: 0.40 × 150 = 60. Using 0.04 instead of 0.40 gives 6, a decimal-placement error.",
      },
    },
    {
      id: "whole-from-part",
      title: "Finding 100% from a part",
      blocks: [
        {
          kind: "concept",
          body: "Sometimes you know a part and what percent it represents, and you need the whole. This reverses the last section: instead of multiplying by the percent, you divide by it.",
        },
        {
          kind: "rule",
          items: ["part ÷ percent (as a decimal) = whole"],
        },
        {
          kind: "example",
          title: "15 is 25% of what number?",
          steps: [
            {
              note: "Divide the part by the percent written as a decimal.",
              work: ["15 ÷ 0.25 = 60"],
            },
            {
              note: "Check by going forward: 25% of 60 should give back 15.",
              work: ["0.25 × 60 = 15"],
            },
          ],
          answer: "60",
        },
        {
          kind: "tip",
          body: "Set it up as part ÷ percent = whole. If the part is bigger than the percent suggests, the whole will be larger than the part.",
        },
      ],
      quickCheck: {
        prompt: "12 is 30% of what number?",
        choices: ["3.6", "0.4", "40", "42"],
        answer: 2,
        explanation:
          "Divide the part by the percent as a decimal: 12 ÷ 0.30 = 40. Multiplying instead (0.30 × 12 = 3.6) answers a different question.",
      },
    },
    {
      id: "percents-from-tables",
      title: "Reading percentages from tables",
      blocks: [
        {
          kind: "concept",
          body: "Table questions give counts, not percents. To turn a category count into a percent, divide it by the total, then multiply by 100.",
        },
        {
          kind: "rule",
          ordered: true,
          items: [
            "Find the category amount and the total",
            "Divide the category amount by the total",
            "Multiply by 100 to convert the decimal to a percent",
          ],
        },
        {
          kind: "example",
          title: "What percent chose option A?",
          steps: [
            {
              note: "A table shows 45 patients out of 180 chose option A. Divide the part by the total.",
              work: ["45 ÷ 180 = 0.25"],
            },
            {
              note: "Convert the decimal to a percent.",
              work: ["0.25 = 25%"],
            },
          ],
          answer: "25%",
        },
        {
          kind: "mistake",
          body: "Always confirm what the total is. Sometimes a table gives a grand total; other times you must add the rows yourself before dividing.",
        },
      ],
      quickCheck: {
        prompt:
          "A table shows 36 of 90 surveyed nurses work night shifts. What percent work night shifts?",
        choices: ["36%", "40%", "2.5%", "4%"],
        answer: 1,
        explanation:
          "Divide the category by the total: 36 ÷ 90 = 0.40 = 40%. Reading the raw count 36 as a percent skips the division.",
      },
    },
    {
      id: "increase-decrease",
      title: "Percent increase and decrease",
      blocks: [
        {
          kind: "concept",
          body: "Percent change measures how much a quantity grew or shrank relative to where it started. Find the difference, divide by the original amount, then convert to a percent.",
        },
        {
          kind: "rule",
          ordered: true,
          items: [
            "Find the difference between the new and original amounts",
            "Divide the difference by the ORIGINAL amount",
            "Convert the decimal to a percent",
          ],
        },
        {
          kind: "example",
          title: "Percent increase",
          steps: [
            {
              note: "A price rises from 50 to 65. Find the change.",
              work: ["65 − 50 = 15"],
            },
            {
              note: "Divide by the original amount and convert.",
              work: ["15 ÷ 50 = 0.30 = 30%"],
            },
          ],
          answer: "30% increase",
        },
        {
          kind: "example",
          title: "Percent decrease",
          steps: [
            {
              note: "A count drops from 80 to 60. Find the change.",
              work: ["80 − 60 = 20"],
            },
            {
              note: "Divide by the original amount and convert.",
              work: ["20 ÷ 80 = 0.25 = 25%"],
            },
          ],
          answer: "25% decrease",
        },
        {
          kind: "mistake",
          body: "Always divide by the original (starting) value, not the new value. Dividing 15 by 65 instead of 50 gives the wrong percent.",
        },
      ],
      quickCheck: {
        prompt: "A price drops from 200 to 150. What is the percent decrease?",
        choices: ["25%", "33%", "50%", "75%"],
        answer: 0,
        explanation:
          "The change is 200 − 150 = 50, and 50 ÷ 200 = 0.25 = 25%. Dividing by the new value 150 gives about 33%, the classic error.",
      },
    },
    {
      id: "discount-tax",
      title: "Discount and tax",
      blocks: [
        {
          kind: "concept",
          body: "Discount and tax are percent-of-a-whole problems with one extra step. A discount is an amount you subtract from the price; tax is an amount you add to it.",
        },
        {
          kind: "tabs",
          tabs: [
            {
              label: "Discount",
              blocks: [
                {
                  kind: "rule",
                  ordered: true,
                  items: [
                    "Multiply the price by the discount percent to find the amount off",
                    "Subtract that amount from the price",
                  ],
                },
                {
                  kind: "example",
                  title: "$80 item at 25% off",
                  steps: [
                    {
                      note: "Find the discount amount.",
                      work: ["0.25 × 80 = $20"],
                    },
                    {
                      note: "Subtract it from the price.",
                      work: ["80 − 20 = $60"],
                    },
                  ],
                  answer: "$60",
                },
                {
                  kind: "tip",
                  body: "A 25% discount means you pay 75%, so you can also do 0.75 × 80 = $60 in one step.",
                },
              ],
            },
            {
              label: "Tax",
              blocks: [
                {
                  kind: "rule",
                  ordered: true,
                  items: [
                    "Multiply the price by the tax percent to find the tax amount",
                    "Add that amount to the price",
                  ],
                },
                {
                  kind: "example",
                  title: "$40 item with 8% tax",
                  steps: [
                    {
                      note: "Find the tax amount.",
                      work: ["0.08 × 40 = $3.20"],
                    },
                    {
                      note: "Add it to the price.",
                      work: ["40 + 3.20 = $43.20"],
                    },
                  ],
                  answer: "$43.20",
                },
              ],
            },
          ],
        },
      ],
      quickCheck: {
        prompt: "A $60 item is charged 5% sales tax. What is the total cost?",
        choices: ["$57", "$3", "$63", "$65"],
        answer: 2,
        explanation:
          "The tax is 0.05 × 60 = $3, and tax is added: 60 + 3 = $63. Subtracting gives $57, which treats the tax like a discount.",
      },
    },
  ],
};
