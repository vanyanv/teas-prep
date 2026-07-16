import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for MATH / measurement-data / "Convert Within and Between
 * Standard and Metric Units". Content carried over from the flat skill-lesson
 * blocks, restructured into the concept / rule / example / mistake / quick
 * check pattern.
 */
export const CONVERT_STANDARD_METRIC_UNITS: GuidedLesson = {
  section: "MATH",
  topic: "measurement-data",
  skill: "Convert Within and Between Standard and Metric Units",
  slug: "convert-within-and-between-standard-and-metric-units",
  title: "Converting Standard and Metric Units",
  summary:
    "Convert within metric, within standard, between metric and standard for distance, liquid, and weight, and convert temperatures.",
  minutes: [9, 12],
  objectives: [
    "Convert between metric units by moving the decimal point",
    "Apply the common U.S. standard conversion factors",
    "Convert between metric and standard units with bridge factors",
    "Convert temperatures between Celsius and Fahrenheit",
  ],
  sections: [
    {
      id: "metric-to-metric",
      title: "Metric to metric",
      blocks: [
        {
          kind: "concept",
          body: "Metric units share prefixes built on powers of 10, so converting within the metric system only moves the decimal point. The same prefixes work for meters, grams, and liters alike.",
        },
        {
          kind: "rule",
          title: "Metric prefixes",
          items: [
            "1 kilo = 1000 base (1 km = 1000 m, 1 kg = 1000 g, 1 kL = 1000 L)",
            "1 base = 1000 milli (1 m = 1000 mm, 1 g = 1000 mg, 1 L = 1000 mL)",
            "1 centi = 1/100 base (1 m = 100 cm)",
          ],
        },
        {
          kind: "concept",
          body: "Going to a smaller unit multiplies, because it takes more small units to cover the same amount. Going to a larger unit divides.",
        },
        {
          kind: "example",
          title: "Liters to milliliters",
          expression: "2.5 L = ? mL",
          steps: [
            {
              note: "Milliliters are smaller than liters, so multiply by 1000.",
              work: ["2.5 × 1000 = 2500"],
            },
          ],
          answer: "2500 mL",
        },
        {
          kind: "example",
          title: "Grams to kilograms",
          expression: "4500 g = ? kg",
          steps: [
            {
              note: "Kilograms are larger than grams, so divide by 1000.",
              work: ["4500 ÷ 1000 = 4.5"],
            },
          ],
          answer: "4.5 kg",
        },
        {
          kind: "mistake",
          body: "Do not multiply when moving to a larger unit. Converting grams to kilograms divides by 1000; a larger unit always means fewer of them.",
        },
      ],
      quickCheck: {
        prompt: "Convert 3.2 kg to grams.",
        choices: ["0.0032 g", "32 g", "320 g", "3200 g"],
        answer: 3,
        explanation:
          "Grams are smaller than kilograms, so multiply: 3.2 × 1000 = 3200 g.",
      },
    },
    {
      id: "standard-to-standard",
      title: "Standard to standard",
      blocks: [
        {
          kind: "concept",
          body: "U.S. standard units do not follow powers of 10, so you must memorize the common conversion factors. Multiply to reach a smaller unit; divide to reach a larger one.",
        },
        {
          kind: "rule",
          title: "Common U.S. conversion factors",
          items: [
            "Distance: 1 ft = 12 in; 1 yd = 3 ft; 1 mi = 5280 ft",
            "Liquid: 1 gal = 4 qt; 1 qt = 2 pt; 1 pt = 2 cups; 1 cup = 8 fl oz",
            "Weight: 1 lb = 16 oz; 1 ton = 2000 lb",
          ],
        },
        {
          kind: "example",
          title: "Gallons to quarts",
          expression: "3 gal = ? qt",
          steps: [
            {
              note: "Quarts are smaller than gallons, so multiply by 4.",
              work: ["3 × 4 = 12"],
            },
          ],
          answer: "12 qt",
        },
        {
          kind: "example",
          title: "Inches to feet",
          expression: "48 in = ? ft",
          steps: [
            {
              note: "Feet are larger than inches, so divide by 12.",
              work: ["48 ÷ 12 = 4"],
            },
          ],
          answer: "4 ft",
        },
        {
          kind: "example",
          title: "Pounds to ounces",
          expression: "5 lb = ? oz",
          steps: [
            {
              note: "Ounces are smaller than pounds, so multiply by 16.",
              work: ["5 × 16 = 80"],
            },
          ],
          answer: "80 oz",
        },
      ],
      quickCheck: {
        prompt: "How many pints are in 2 gallons?",
        choices: ["4 pints", "8 pints", "16 pints", "32 pints"],
        answer: 2,
        explanation:
          "Convert in two steps: 2 gal × 4 = 8 qt, then 8 qt × 2 = 16 pt.",
      },
    },
    {
      id: "metric-standard-bridge",
      title: "Metric to standard (and back)",
      blocks: [
        {
          kind: "concept",
          body: "Crossing between the metric and standard systems uses a set of bridge factors. As always, multiply or divide based on which unit is larger.",
        },
        {
          kind: "rule",
          title: "Bridge factors",
          items: [
            "Distance: 1 in = 2.54 cm; 1 mi is about 1.6 km",
            "Liquid: 1 L is about 1.06 qt (roughly one quart); 1 gal is about 3.79 L",
            "Weight: 1 kg is about 2.2 lb; 1 oz is about 28.35 g",
          ],
        },
        {
          kind: "example",
          title: "Inches to centimeters",
          expression: "10 in = ? cm",
          steps: [
            {
              note: "Each inch is 2.54 cm, so multiply.",
              work: ["10 × 2.54 = 25.4"],
            },
          ],
          answer: "25.4 cm",
        },
        {
          kind: "example",
          title: "Kilograms to pounds",
          expression: "70 kg = ? lb",
          steps: [
            {
              note: "Each kilogram is about 2.2 lb, so multiply.",
              work: ["70 × 2.2 = 154"],
            },
          ],
          answer: "154 lb",
        },
        {
          kind: "example",
          title: "Centimeters to inches",
          expression: "12.7 cm = ? in",
          steps: [
            {
              note: "Inches are larger than centimeters, so divide by 2.54.",
              work: ["12.7 ÷ 2.54 = 5"],
            },
          ],
          answer: "5 in",
        },
        {
          kind: "tip",
          body: "Write the factor as a fraction so the unit you do not want cancels. To convert 10 in to cm, multiply by (2.54 cm)/(1 in): the inches cancel and centimeters remain.",
        },
      ],
      quickCheck: {
        prompt: "A patient weighs 60 kg. About how many pounds is that?",
        choices: ["27 lb", "62 lb", "132 lb", "154 lb"],
        answer: 2,
        explanation:
          "1 kg is about 2.2 lb, so multiply: 60 × 2.2 = 132 lb. Dividing by 2.2 (about 27) converts the wrong direction.",
      },
    },
    {
      id: "temperature",
      title: "Celsius and Fahrenheit",
      blocks: [
        {
          kind: "concept",
          body: "Temperature conversions use two formulas, one for each direction. Each is the other run in reverse, so the order of the steps matters.",
        },
        {
          kind: "rule",
          title: "Temperature formulas",
          items: [
            "Celsius to Fahrenheit: F = (9/5)C + 32",
            "Fahrenheit to Celsius: C = (5/9)(F − 32)",
          ],
        },
        {
          kind: "example",
          title: "Convert 37 C (normal body temp)",
          expression: "F = (9/5)(37) + 32",
          steps: [
            {
              note: "Multiply by 9/5 first.",
              work: ["(9/5)(37) = 66.6"],
              becomes: "F = 66.6 + 32",
            },
            {
              note: "Then add 32.",
              work: ["66.6 + 32 = 98.6"],
            },
          ],
          answer: "98.6 F",
        },
        {
          kind: "example",
          title: "Convert 212 F (boiling water)",
          expression: "C = (5/9)(212 − 32)",
          steps: [
            {
              note: "Subtract 32 first.",
              work: ["212 − 32 = 180"],
              becomes: "C = (5/9)(180)",
            },
            {
              note: "Then multiply by 5/9.",
              work: ["(5/9)(180) = 100"],
            },
          ],
          answer: "100 C",
        },
        {
          kind: "mistake",
          body: "For Fahrenheit to Celsius, subtract 32 first, then multiply by 5/9. Multiplying before subtracting is the most common mistake on these problems.",
        },
      ],
      quickCheck: {
        prompt: "What is the first step in converting 98.6 F to Celsius?",
        choices: [
          "Multiply 98.6 by 5/9",
          "Subtract 32 from 98.6",
          "Add 32 to 98.6",
          "Multiply 98.6 by 9/5",
        ],
        answer: 1,
        explanation:
          "C = (5/9)(F − 32), so subtract 32 first: 98.6 − 32 = 66.6, then 66.6 × 5/9 = 37 C.",
      },
    },
  ],
};
