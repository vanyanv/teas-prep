import type { GuidedLesson } from "../guided-lesson-types";

/** Guided lesson for SCIENCE / scientific-reasoning / "Predict Relationships
 *  Among Events, Objects, and Processes". Content carried over from the flat
 *  skill-lesson blocks, restructured into the concept / rule / example /
 *  mistake / quick check pattern. */
export const PREDICT_RELATIONSHIPS: GuidedLesson = {
  section: "SCIENCE",
  topic: "scientific-reasoning",
  skill: "Predict Relationships Among Events, Objects, and Processes",
  slug: "predict-relationships-among-events-objects-and-processes",
  title: "Predicting Relationships",
  summary:
    "Use an observed trend or rule to predict what happens next when one factor changes.",
  minutes: [6, 8],
  objectives: [
    "Tell a direct relationship from an inverse one",
    "Read the direction of a trend in a table or graph",
    "Extend a trend one step beyond the last data point",
    "Eliminate answer choices that reverse an established trend",
  ],
  sections: [
    {
      id: "what-it-is",
      title: "Direct and inverse relationships",
      blocks: [
        {
          kind: "concept",
          body: "Predicting means using a known relationship to say what one variable will do when another changes. Every relationship you will see runs in one of two directions.",
        },
        {
          kind: "rule",
          title: "The two directions",
          items: [
            "Direct relationship: as one goes up, the other goes up (more exercise, higher heart rate)",
            "Inverse relationship: as one goes up, the other goes down (more altitude, lower oxygen)",
          ],
        },
        {
          kind: "concept",
          body: "Reading the direction of the trend in a data table or graph lets you extend it to a new value. Once you know which way the relationship runs, the prediction follows.",
        },
      ],
      quickCheck: {
        prompt:
          "As altitude increases, the amount of available oxygen decreases. What kind of relationship is this?",
        choices: [
          "Direct, because both variables are changing",
          "Inverse, because one rises while the other falls",
          "Direct, because altitude comes first",
          "Neither, because only one variable is measured",
        ],
        answer: 1,
        explanation:
          "In an inverse relationship one variable goes up while the other goes down. Both variables changing does not make a relationship direct; the directions must match.",
      },
    },
    {
      id: "how-teas-tests-it",
      title: "How the TEAS tests it",
      blocks: [
        {
          kind: "concept",
          body: "Questions give a table, graph, or stated rule and ask what will happen next.",
        },
        {
          kind: "rule",
          title: "What to expect",
          items: [
            "You extend a trend beyond the last data point",
            "You tell a direct relationship from an inverse one",
            "A trap choice reverses the direction, predicting an increase where the trend clearly falls",
          ],
        },
        {
          kind: "mistake",
          body: "The classic wrong answer runs the trend backward. If every step in the data falls, a choice that predicts a rise contradicts the pattern, no matter how reasonable it sounds.",
        },
      ],
      quickCheck: {
        prompt:
          "A graph shows a value falling steadily at every measured point. A question asks what happens at the next point. Which choice is the trap?",
        choices: [
          "The value keeps falling",
          "The value falls a little more slowly",
          "The value rises",
          "The value is lower than the last measurement",
        ],
        answer: 2,
        explanation:
          "A choice that reverses the established direction is the standard trap. A steadily falling trend supports predictions that continue downward.",
      },
    },
    {
      id: "worked-example",
      title: "Worked example: dissolve time",
      blocks: [
        {
          kind: "example",
          title: "Predict the dissolve time at 40 C",
          steps: [
            {
              note: "Read the table: as water temperature rises, the time for a sugar cube to dissolve drops.",
              work: [
                "10 C takes 60 s",
                "20 C takes 40 s",
                "30 C takes 25 s",
              ],
            },
            {
              note: "Label the relationship: higher temperature means shorter time, so it is inverse.",
              work: [],
            },
            {
              note: "Extend the trend one step: the times keep falling, so 40 C should take less than 25 s.",
              work: ["40 C: less than 25 s"],
            },
          ],
          answer: "A prediction near 15 s fits the downward pattern.",
        },
        {
          kind: "mistake",
          body: "Predicting more than 25 s at 40 C would contradict the trend. Every step in the data got shorter, so the next value must be shorter still.",
        },
      ],
      quickCheck: {
        prompt:
          "In the sugar cube data (60 s at 10 C, 40 s at 20 C, 25 s at 30 C), which prediction for 40 C fits the trend?",
        choices: ["About 15 s", "About 25 s", "About 40 s", "About 60 s"],
        answer: 0,
        explanation:
          "The relationship is inverse and the times keep falling, so the value at 40 C must be less than 25 s. Only a prediction near 15 s continues the pattern.",
      },
    },
    {
      id: "strategy",
      title: "A two-step strategy",
      blocks: [
        {
          kind: "rule",
          title: "Before you answer",
          ordered: true,
          items: [
            "Label the relationship as direct or inverse",
            "Push the trend one step further in the same direction",
          ],
        },
        {
          kind: "tip",
          body: "If a choice breaks the established direction (says \"increase\" when every step decreased), eliminate it before weighing the others.",
        },
      ],
      quickCheck: {
        prompt:
          "Data show that as fertilizer increases, plant height increases at every step. Using the two-step strategy, what do you predict for the next increase in fertilizer?",
        choices: [
          "Height decreases, because trends eventually reverse",
          "Height stays the same, because the plant is done growing",
          "Height increases, continuing the direct relationship",
          "Nothing can be predicted from a table",
        ],
        answer: 2,
        explanation:
          "First label the relationship: both variables rise together, so it is direct. Then push the trend one step further in the same direction: height increases.",
      },
    },
  ],
};
