import type { GuidedLesson } from "../guided-lesson-types";

/** Guided lesson for MATH / numbers-algebra / "Convert Among Decimals,
 *  Fractions & Percents". Content carried over from the flat skill-lesson
 *  blocks, restructured into the concept / rule / example / mistake / quick
 *  check pattern. */
export const CONVERT_DECIMALS_FRACTIONS_PERCENTS: GuidedLesson = {
  section: "MATH",
  topic: "numbers-algebra",
  skill: "Convert Among Decimals, Fractions & Percents",
  slug: "convert-among-decimals-fractions-percents",
  title: "Decimals, Fractions & Percents",
  summary:
    "Move freely among fractions, decimals, and percents, and compare values written in different forms.",
  minutes: [10, 12],
  objectives: [
    "Convert between fractions and percents",
    "Convert between decimals and percents",
    "Convert between fractions and decimals",
    "Compare values written in different forms",
  ],
  sections: [
    {
      id: "fraction-percent",
      title: "Fraction and percent",
      blocks: [
        {
          kind: "concept",
          body: "A fraction and a percent are two ways of naming the same amount. Converting in either direction is a short, mechanical process, and each direction has its own rule.",
        },
        {
          kind: "tabs",
          tabs: [
            {
              label: "Fraction to percent",
              blocks: [
                {
                  kind: "rule",
                  ordered: true,
                  items: [
                    "Divide the numerator by the denominator to get a decimal",
                    "Multiply by 100 and attach the % sign",
                  ],
                },
                {
                  kind: "example",
                  expression: "3/4",
                  steps: [
                    {
                      note: "Divide to get a decimal.",
                      work: ["3 ÷ 4 = 0.75"],
                    },
                    {
                      note: "Multiply by 100 to express it as a percent.",
                      work: ["0.75 = 75%"],
                    },
                  ],
                  answer: "75%",
                },
              ],
            },
            {
              label: "Percent to fraction",
              blocks: [
                {
                  kind: "rule",
                  ordered: true,
                  items: [
                    "Write the percent over 100",
                    "Simplify to lowest terms",
                  ],
                },
                {
                  kind: "example",
                  expression: "40%",
                  steps: [
                    {
                      note: "Write the percent over 100.",
                      work: ["40% = 40/100"],
                    },
                    {
                      note: "Divide top and bottom by 20 to simplify.",
                      work: ["40/100 = 2/5"],
                    },
                  ],
                  answer: "2/5",
                },
              ],
            },
          ],
        },
        {
          kind: "tip",
          body: "Memorize a few anchors: 1/2 = 50%, 1/4 = 25%, 1/5 = 20%, and 1/3 is about 33.3%. They let you convert many values instantly.",
        },
      ],
      quickCheck: {
        prompt: "What is 40% written as a fraction in lowest terms?",
        choices: ["2/5", "4/10", "1/4", "4/5"],
        answer: 0,
        explanation:
          "40% = 40/100, and dividing top and bottom by 20 gives 2/5. 4/10 is equal but not in lowest terms.",
      },
    },
    {
      id: "decimal-percent",
      title: "Decimal and percent",
      blocks: [
        {
          kind: "concept",
          body: "Percent means per hundred, so converting between a decimal and a percent is always a shift of exactly two decimal places. Only the direction changes.",
        },
        {
          kind: "tabs",
          tabs: [
            {
              label: "Decimal to percent",
              blocks: [
                {
                  kind: "rule",
                  items: [
                    "Move the decimal point two places to the right and add a % sign",
                  ],
                },
                {
                  kind: "example",
                  steps: [
                    {
                      note: "Shift the point two places right and attach the sign.",
                      work: ["0.6 = 60%", "0.075 = 7.5%"],
                    },
                  ],
                  answer: "0.6 = 60% and 0.075 = 7.5%",
                },
              ],
            },
            {
              label: "Percent to decimal",
              blocks: [
                {
                  kind: "rule",
                  items: [
                    "Move the decimal point two places to the left and drop the % sign",
                  ],
                },
                {
                  kind: "example",
                  steps: [
                    {
                      note: "Shift the point two places left and drop the sign.",
                      work: ["85% = 0.85", "4% = 0.04"],
                    },
                  ],
                  answer: "85% = 0.85 and 4% = 0.04",
                },
              ],
            },
          ],
        },
        {
          kind: "mistake",
          body: "Moving the point only one place is the most common slip: 4% is 0.04, not 0.4. Percent means per hundred, so the shift is always two places.",
        },
      ],
      quickCheck: {
        prompt: "What is 7.5% written as a decimal?",
        choices: ["0.75", "0.075", "7.5", "0.0075"],
        answer: 1,
        explanation:
          "Move the decimal point two places to the left: 7.5% = 0.075. Moving only one place gives 0.75, which is 75%.",
      },
    },
    {
      id: "fraction-decimal",
      title: "Fraction and decimal",
      blocks: [
        {
          kind: "concept",
          body: "A fraction is a division problem waiting to happen, and a decimal is a fraction whose denominator is a power of ten. Each conversion just makes that relationship explicit.",
        },
        {
          kind: "rule",
          items: [
            "Fraction to decimal: divide the numerator by the denominator",
            "Decimal to fraction: write the decimal over its place value (tenths, hundredths), then simplify",
          ],
        },
        {
          kind: "example",
          title: "Fraction to decimal",
          expression: "5/8",
          steps: [
            {
              note: "Divide the numerator by the denominator.",
              work: ["5 ÷ 8 = 0.625"],
            },
          ],
          answer: "0.625",
        },
        {
          kind: "example",
          title: "Decimal to fraction",
          expression: "0.45",
          steps: [
            {
              note: "0.45 ends in the hundredths place, so write it over 100.",
              work: ["0.45 = 45/100"],
            },
            {
              note: "Divide top and bottom by 5 to simplify.",
              work: ["45/100 = 9/20"],
            },
          ],
          answer: "9/20",
        },
      ],
      quickCheck: {
        prompt: "What is 0.45 written as a fraction in lowest terms?",
        choices: ["9/20", "45/100", "4/5", "5/9"],
        answer: 0,
        explanation:
          "0.45 = 45/100, and dividing top and bottom by 5 gives 9/20. 45/100 is correct but not in lowest terms.",
      },
    },
    {
      id: "comparing-forms",
      title: "Comparing across all three forms",
      blocks: [
        {
          kind: "concept",
          body: "To compare a mix of fractions, decimals, and percents, convert them all to one form first. Decimals are usually the easiest common form, because you can line values up and compare place by place.",
        },
        {
          kind: "rule",
          ordered: true,
          items: [
            "Convert every value to a decimal",
            "Line the decimals up and compare place by place",
            "Report the order using the original forms",
          ],
        },
        {
          kind: "example",
          title: "Order 0.7, 3/5, and 65% from least to greatest",
          steps: [
            {
              note: "Convert each value to a decimal.",
              work: ["3/5 = 0.60", "65% = 0.65", "0.7 = 0.70"],
            },
            {
              note: "Line them up and order them: 0.60 < 0.65 < 0.70.",
              work: ["3/5 < 65% < 0.7"],
            },
          ],
          answer: "3/5 < 65% < 0.7",
        },
        {
          kind: "tip",
          body: "Write every decimal with the same number of places (0.7 as 0.70) before comparing. Equal lengths make the place-by-place comparison foolproof.",
        },
      ],
      quickCheck: {
        prompt: "Which value is greatest: 1/2, 0.55, or 45%?",
        choices: ["1/2", "0.55", "45%", "They are all equal"],
        answer: 1,
        explanation:
          "Convert to decimals: 1/2 = 0.50, 45% = 0.45, and 0.55 stays 0.55. The largest is 0.55.",
      },
    },
  ],
};
