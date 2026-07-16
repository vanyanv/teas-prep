import type { GuidedLesson } from "../guided-lesson-types";

/** Guided lesson for SCIENCE / scientific-reasoning / "Use Basic Scientific
 *  Measurements and Measurement Tools". Content carried over from the flat
 *  skill-lesson blocks, restructured into the concept / rule / example /
 *  mistake / quick check pattern. */
export const BASIC_SCIENTIFIC_MEASUREMENTS_TOOLS: GuidedLesson = {
  section: "SCIENCE",
  topic: "scientific-reasoning",
  skill: "Use Basic Scientific Measurements and Measurement Tools",
  slug: "use-basic-scientific-measurements-and-measurement-tools",
  title: "Scientific Measurements and Tools",
  summary:
    "Match each tool to the quantity it measures and report the value in the correct unit.",
  minutes: [7, 9],
  objectives: [
    "Match each physical quantity to its measurement tool",
    "Report measurements in the correct metric unit",
    "Distinguish mass from weight",
    "Read liquid volume at the bottom of the meniscus",
    "Convert within metric prefixes such as L to mL",
  ],
  sections: [
    {
      id: "quantity-tool-unit",
      title: "Quantity, tool, and unit",
      blocks: [
        {
          kind: "concept",
          body: "Every physical quantity has a matching tool and a standard unit. Pairing the three correctly is the core of measurement.",
        },
        {
          kind: "rule",
          title: "The five core pairings",
          items: [
            "Length: meter stick or ruler, in meters (m), centimeters (cm), or millimeters (mm)",
            "Volume of a liquid: graduated cylinder, in milliliters (mL) or liters (L)",
            "Mass: balance, in grams (g) or kilograms (kg)",
            "Temperature: thermometer, in degrees Celsius (C) or Kelvin (K)",
            "Time: stopwatch, in seconds (s)",
          ],
        },
        {
          kind: "mistake",
          body: "Mass is not the same as weight. Mass is the amount of matter, measured with a balance; weight is the pull of gravity, measured with a scale or spring.",
        },
      ],
      quickCheck: {
        prompt: "Which tool measures the mass of a sample?",
        choices: [
          "A graduated cylinder",
          "A balance",
          "A spring scale",
          "A thermometer",
        ],
        answer: 1,
        explanation:
          "A balance measures mass, the amount of matter. A spring scale measures weight, the pull of gravity, and a graduated cylinder measures liquid volume.",
      },
    },
    {
      id: "how-teas-tests-it",
      title: "How the TEAS tests it",
      blocks: [
        {
          kind: "concept",
          body: "Questions ask which tool measures a given quantity, or which unit fits a measurement.",
        },
        {
          kind: "rule",
          title: "The common traps",
          items: [
            "A wrong unit makes a number look reasonable but mislabeled, such as reporting liquid volume in grams",
            "Reading a graduated cylinder means reading the bottom of the curved surface (the meniscus) at eye level",
            "Conversions stay within metric prefixes: 1 km = 1000 m and 1 L = 1000 mL",
          ],
        },
        {
          kind: "example",
          title: "Convert 2.5 L to milliliters",
          steps: [
            {
              note: "1 L = 1000 mL, so multiply by 1000.",
              work: ["2.5 × 1000 = 2500"],
              becomes: "2.5 L = 2500 mL",
            },
          ],
          answer: "2500 mL",
        },
      ],
      quickCheck: {
        prompt:
          "A student records the volume of water in a beaker as 150 g. What is wrong with this measurement?",
        choices: [
          "The number is too large for a beaker",
          "Volume should be reported in milliliters, not grams",
          "Water volume must be measured in kilometers",
          "Nothing; grams are a valid volume unit",
        ],
        answer: 1,
        explanation:
          "Grams measure mass, not volume. Liquid volume belongs in milliliters or liters, so the number is mislabeled even if it looks reasonable.",
      },
    },
    {
      id: "worked-example",
      title: "Worked example: liquid medication",
      blocks: [
        {
          kind: "example",
          title:
            "A nurse needs to record how much liquid medication is in a dosing cup. Which tool and unit fit?",
          steps: [
            {
              note: "The quantity is liquid volume, so pick the volume tool and unit.",
              work: [
                "Tool: graduated cylinder or marked cup",
                "Unit: milliliters (mL)",
              ],
            },
            {
              note: "Rule out mass: a balance and grams measure the amount of matter, not volume.",
              work: [],
            },
            {
              note: "Read the level at the meniscus and record it.",
              work: ["The cup reads to the 7 mL line, so record 7 mL"],
            },
          ],
          answer: "7 mL, read from a marked cup at the meniscus",
        },
      ],
      quickCheck: {
        prompt:
          "A dosing cup of liquid reads to the 12 mL line at the meniscus. What do you record?",
        choices: ["12 g", "12 mL", "12 L", "12 cm"],
        answer: 1,
        explanation:
          "Liquid volume in a dosing cup is reported in milliliters. Grams would label it as mass, and liters and centimeters do not fit the measurement.",
      },
    },
    {
      id: "elimination-habit",
      title: "A habit for eliminating answers",
      blocks: [
        {
          kind: "tip",
          body: "Build a quick mental table: quantity, then tool, then unit. If a choice swaps the unit (volume in grams) or the tool (mass with a ruler), eliminate it.",
        },
        {
          kind: "concept",
          body: "Read liquid volume at the bottom of the meniscus with your eye level to the line to avoid a skewed reading.",
        },
      ],
      quickCheck: {
        prompt:
          "Which answer choice should you eliminate on sight using the quantity-tool-unit check?",
        choices: [
          "Length of a leaf: ruler, centimeters",
          "Mass of a rock: balance, grams",
          "Volume of juice: balance, grams",
          "Time of a reaction: stopwatch, seconds",
        ],
        answer: 2,
        explanation:
          "Volume pairs with a graduated cylinder and milliliters. A balance and grams measure mass, so that choice swaps both the tool and the unit.",
      },
    },
  ],
};
