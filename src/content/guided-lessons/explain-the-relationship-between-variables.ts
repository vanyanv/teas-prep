import type { GuidedLesson } from "../guided-lesson-types";

/** Guided lesson for MATH / measurement-data / "Explain the Relationship
 *  Between Variables". Content carried over from the flat skill-lesson
 *  blocks, restructured into the concept / rule / example / mistake / quick
 *  check pattern. */
export const RELATIONSHIP_BETWEEN_VARIABLES: GuidedLesson = {
  section: "MATH",
  topic: "measurement-data",
  skill: "Explain the Relationship Between Variables",
  slug: "explain-the-relationship-between-variables",
  title: "Relationships Between Variables",
  summary:
    "Tell direct from inverse relationships, identify independent and dependent variables, read a line of best fit, and extrapolate beyond the data.",
  minutes: [8, 10],
  objectives: [
    "Distinguish direct from inverse relationships by their trend direction",
    "Identify the independent and dependent variables in a scenario",
    "Read values and judge strength from a line of best fit",
    "Extrapolate a trend beyond the measured data",
  ],
  sections: [
    {
      id: "direct-vs-inverse",
      title: "Direct vs inverse relationships",
      blocks: [
        {
          kind: "concept",
          body: "Two variables are related when a change in one comes with a predictable change in the other. The direction of that change names the relationship.\n\n- Direct (positive) relationship: as one variable increases, the other also increases. The trend rises from left to right (upward slope).\n- Inverse (negative) relationship: as one variable increases, the other decreases. The trend falls from left to right (downward slope).\n- If points show no clear up or down pattern, there is little or no relationship.",
        },
        {
          kind: "example",
          title: "Classify each relationship",
          steps: [
            {
              note: "More hours worked, more pay earned: both variables rise together.",
              work: ["hours up, pay up: direct"],
            },
            {
              note: "Faster average speed, less travel time for a fixed distance: one rises while the other falls.",
              work: ["speed up, time down: inverse"],
            },
          ],
          answer: "Hours and pay are direct; speed and time are inverse.",
        },
        {
          kind: "tip",
          body: "Read the trend from left to right, the same direction you read a sentence. Rising means direct, falling means inverse.",
        },
      ],
      quickCheck: {
        prompt:
          "As the temperature outside increases, sales of hot cocoa decrease. What kind of relationship is this?",
        choices: [
          "Direct, because both variables involve amounts",
          "Inverse, because one variable increases while the other decreases",
          "No relationship, because the variables are unrelated products",
          "Direct, because the trend rises from left to right",
        ],
        answer: 1,
        explanation:
          "One variable goes up while the other goes down, so the relationship is inverse (negative), and its trend falls from left to right.",
      },
    },
    {
      id: "independent-dependent",
      title: "Independent vs dependent variables",
      blocks: [
        {
          kind: "concept",
          body: "The independent variable is the cause or input; it goes on the x-axis. The dependent variable is the effect or output; it changes in response and goes on the y-axis.",
        },
        {
          kind: "rule",
          title: "Sort them with one sentence",
          items: [
            "Say \"the ___ depends on the ___\"",
            "Whatever fills the first blank is the dependent variable (y-axis)",
            "Whatever fills the second blank is the independent variable (x-axis)",
          ],
          ordered: true,
        },
        {
          kind: "example",
          title: "Sunlight and plant growth",
          steps: [
            {
              note: "Fill the sentence: plant growth depends on amount of sunlight.",
              work: ["\"growth depends on sunlight\""],
            },
            {
              note: "The first blank is growth, so growth is dependent; sunlight is independent.",
              work: ["sunlight: independent (x)", "growth: dependent (y)"],
            },
          ],
          answer: "Sunlight is independent (x-axis); growth is dependent (y-axis).",
        },
        {
          kind: "mistake",
          body: "Do not assign axes by which variable is mentioned first in the problem. Use the depends-on sentence: the effect is dependent no matter where it appears in the wording.",
        },
      ],
      quickCheck: {
        prompt:
          "A study measures how a patient's heart rate changes with the dose of a medication. Which variable goes on the x-axis?",
        choices: [
          "Heart rate, because it is measured",
          "Dose, because it is the independent variable",
          "Heart rate, because it is the dependent variable",
          "Either one; axis choice does not matter",
        ],
        answer: 1,
        explanation:
          "Heart rate depends on the dose, so dose is the independent variable and belongs on the x-axis; heart rate goes on the y-axis.",
      },
    },
    {
      id: "line-of-best-fit",
      title: "Line of best fit and trends",
      blocks: [
        {
          kind: "concept",
          body: "A scatter plot shows many points. A line of best fit is a single straight line drawn through the middle of the cloud to summarize the overall trend; about as many points fall above it as below.\n\n- Upward best-fit line = direct relationship\n- Downward best-fit line = inverse relationship\n- The closer the points hug the line, the stronger the relationship",
        },
        {
          kind: "rule",
          title: "Read a value from the line",
          ordered: true,
          items: [
            "Find the input on the x-axis",
            "Go straight up to the line of best fit",
            "Go straight across to the y-axis and read the value",
          ],
        },
        {
          kind: "mistake",
          body: "Do not read from an individual data point. The line of best fit summarizes the trend; use the line itself, even where no point sits on it.",
        },
      ],
      quickCheck: {
        prompt:
          "On a scatter plot, the points cluster tightly around a line of best fit that falls from left to right. What does this show?",
        choices: [
          "A weak direct relationship",
          "A strong direct relationship",
          "A strong inverse relationship",
          "No relationship between the variables",
        ],
        answer: 2,
        explanation:
          "A downward line means an inverse relationship, and points hugging the line closely mean the relationship is strong.",
      },
    },
    {
      id: "extrapolating",
      title: "Extrapolating beyond the data",
      blocks: [
        {
          kind: "concept",
          body: "Extrapolation means extending the trend line past the data you were given to estimate a value you did not measure. Interpolation is estimating between known points.",
        },
        {
          kind: "example",
          title: "Extend a sales trend",
          steps: [
            {
              note: "A best-fit line shows sales rising about 10 units each month, reaching 50 units in month 5.",
              work: ["month 5: 50 units", "trend: +10 units per month"],
            },
            {
              note: "Extrapolate to month 7 by continuing the trend two more months.",
              work: ["50 + 10 + 10 = 70"],
            },
          ],
          answer: "About 70 units in month 7",
        },
        {
          kind: "tip",
          body: "Extrapolation assumes the trend keeps going. Treat far-out predictions with caution, because real patterns can change outside the measured range.",
        },
      ],
      quickCheck: {
        prompt:
          "Data points cover weeks 1 through 6. Estimating a value for week 4 from the best-fit line is called what?",
        choices: [
          "Extrapolation, because you use the best-fit line",
          "Interpolation, because week 4 falls between measured points",
          "Correlation, because two variables are involved",
          "Extrapolation, because week 4 was not directly measured",
        ],
        answer: 1,
        explanation:
          "Estimating within the range of known points is interpolation; extrapolation extends the trend beyond the measured range, such as week 8.",
      },
    },
  ],
};
