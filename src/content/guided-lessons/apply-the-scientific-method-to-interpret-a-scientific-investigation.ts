import type { GuidedLesson } from "../guided-lesson-types";

/** Guided lesson for SCIENCE / scientific-reasoning / "Apply the Scientific
 *  Method to Interpret a Scientific Investigation". Content carried over from
 *  the flat skill-lesson blocks, restructured into the concept / rule /
 *  example / mistake / quick check pattern. */
export const SCIENTIFIC_METHOD_INVESTIGATION: GuidedLesson = {
  section: "SCIENCE",
  topic: "scientific-reasoning",
  skill: "Apply the Scientific Method to Interpret a Scientific Investigation",
  slug: "apply-the-scientific-method-to-interpret-a-scientific-investigation",
  title: "Interpreting a Scientific Investigation",
  summary:
    "Identify the variable types and the hypothesis, and draw only conclusions the data support.",
  minutes: [6, 8],
  objectives: [
    "Identify the independent and dependent variables in a study",
    "Recognize controlled variables and the role of a control group",
    "Judge whether a conclusion is supported by the results",
    "Reject conclusions that overreach beyond what the data show",
  ],
  sections: [
    {
      id: "variables",
      title: "The scientific method and its variables",
      blocks: [
        {
          kind: "concept",
          body: "The scientific method tests a hypothesis by changing one factor and watching the result while holding everything else steady. Every well-designed study assigns each factor one of these roles.",
        },
        {
          kind: "rule",
          title: "The four parts to identify",
          items: [
            "Independent variable: the one factor the researcher changes on purpose",
            "Dependent variable: the outcome that is measured in response",
            "Controlled variables: the factors kept the same so they do not interfere",
            "Control group: the untreated baseline used for comparison",
          ],
        },
        {
          kind: "tip",
          body: "Find the independent variable by asking what the researcher deliberately changed; the dependent variable is whatever they measured as a result.",
        },
      ],
      quickCheck: {
        prompt:
          "In an experiment, which variable does the researcher change on purpose?",
        choices: [
          "The dependent variable",
          "The independent variable",
          "A controlled variable",
          "The control group",
        ],
        answer: 1,
        explanation:
          "The independent variable is the factor the researcher deliberately changes; the dependent variable is the outcome measured in response.",
      },
    },
    {
      id: "how-teas-tests-it",
      title: "How the TEAS tests it",
      blocks: [
        {
          kind: "concept",
          body: "Questions describe a study and ask you to label its parts or judge its conclusion. Expect three kinds of tasks.",
        },
        {
          kind: "rule",
          items: [
            "Identify the independent vs dependent variable from the setup",
            "Spot which variables had to be controlled and why a control group matters",
            "Choose the conclusion supported by the results, and reject ones that overreach beyond the data or ignore the control",
          ],
        },
        {
          kind: "mistake",
          body: "Do not pick a conclusion just because it sounds scientific or plausible. A valid conclusion stays within what the data actually show.",
        },
      ],
      quickCheck: {
        prompt:
          "A TEAS question gives a study's results and four conclusions. Which conclusion should you choose?",
        choices: [
          "The one that makes the broadest claim",
          "The one that matches what you already know about the topic",
          "The one the results directly support",
          "The one that mentions the most variables",
        ],
        answer: 2,
        explanation:
          "A valid conclusion stays within what the data show. Broad claims and outside knowledge overreach beyond the results.",
      },
    },
    {
      id: "worked-example",
      title: "Worked example: the plant study",
      blocks: [
        {
          kind: "example",
          title: "Label the parts of a study",
          steps: [
            {
              note: "Read the setup: a student gives three identical plants 0 mL, 50 mL, and 100 mL of water per day, keeps light, soil, and pot size the same, and measures growth in cm after two weeks.",
              work: [],
            },
            {
              note: "The independent variable is what is changed on purpose.",
              work: ["Independent variable: amount of water"],
            },
            {
              note: "The dependent variable is what is measured in response.",
              work: ["Dependent variable: plant growth in cm"],
            },
            {
              note: "The controlled variables are what is kept the same.",
              work: ["Controlled variables: light, soil, pot size"],
            },
          ],
          answer:
            "Water is the independent variable, growth is the dependent variable, and light, soil, and pot size are controlled.",
        },
        {
          kind: "concept",
          body: "If the 100 mL plant grew most, a valid conclusion is that more water increased growth in this range. Claiming that water is the only thing plants need goes beyond the data.",
        },
        {
          kind: "mistake",
          body: "Reject any conclusion that claims more than the data show or that ignores keeping other variables controlled.",
        },
      ],
      quickCheck: {
        prompt:
          "In the plant study, the 100 mL plant grew the most. Which conclusion do the data support?",
        choices: [
          "Water is the only thing plants need to grow",
          "More water increased growth in the range tested",
          "All plants should receive 100 mL of water per day",
          "Light and soil have no effect on plant growth",
        ],
        answer: 1,
        explanation:
          "The data only show that growth increased with water in the tested range. The other options overreach or contradict the role of the controlled variables.",
      },
    },
  ],
};
