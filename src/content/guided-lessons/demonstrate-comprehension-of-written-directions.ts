import type { GuidedLesson } from "../guided-lesson-types";

/** Guided lesson for READING / key-ideas-details / "Demonstrate Comprehension
 *  of Written Directions". Content carried over from the flat skill-lesson
 *  blocks, restructured into the concept / rule / example / mistake / quick
 *  check pattern. */
export const COMPREHENSION_WRITTEN_DIRECTIONS: GuidedLesson = {
  section: "READING",
  topic: "key-ideas-details",
  skill: "Demonstrate Comprehension of Written Directions",
  slug: "demonstrate-comprehension-of-written-directions",
  title: "Comprehending Written Directions",
  summary:
    "Read step-by-step instructions and correctly understand the order, conditions, and required actions.",
  minutes: [5, 7],
  objectives: [
    "Identify the signal words that change what a step means",
    "Distinguish sequence words from conditional words in a procedure",
    "Determine what to do at a specific point in written directions",
    "Apply a conditional step correctly when its condition is met",
  ],
  sections: [
    {
      id: "signal-words",
      title: "What written directions require",
      blocks: [
        {
          kind: "concept",
          body: "Following written directions means tracking three things at once: what to do, in what order, and under what conditions. The actions are usually easy to spot. The meaning lives in the small words around them: \"before\", \"after\", \"if\", \"unless\", and \"only\" each change what a step actually tells you to do.",
        },
        {
          kind: "rule",
          title: "Signal words to watch",
          items: [
            "Sequence words (first, then, before, after): set the order of the steps",
            "Conditional words (if, unless, when): make a step apply only in a certain situation",
            "Limiting words (only): restrict how or when an action is allowed",
          ],
        },
        {
          kind: "mistake",
          body: "Reading the actions but skimming the small words. \"Call the clinic before the next dose\" and \"call the clinic after the next dose\" contain the same actions, but they direct you to do different things.",
        },
      ],
      quickCheck: {
        prompt:
          "In the direction \"Take the tablet only with food\", which word restricts when the action is allowed?",
        choices: ["Take", "tablet", "only", "food"],
        answer: 2,
        explanation:
          "\"Only\" limits the step: the tablet may be taken with food and in no other circumstance. The other words name the action and its objects, not the restriction.",
      },
    },
    {
      id: "how-teas-tests-it",
      title: "How the TEAS tests it",
      blocks: [
        {
          kind: "concept",
          body: "On the TEAS you read a procedure, such as a recipe, a medication guide, or a form, and answer a question about it. The questions usually take one of two shapes: what should you do at a certain point, or what happens if a condition is met.\n\nMisreading a single signal word leads to the wrong answer, and the distractors are built to catch exactly that: they are often real actions from the passage attached to the wrong step or the wrong condition.",
        },
        {
          kind: "rule",
          title: "The two common question shapes",
          items: [
            "Point questions: \"What should you do after step 3?\" The answer comes from the step at that exact point in the sequence",
            "Condition questions: \"What should you do if X happens?\" The answer comes from the step whose condition matches X",
          ],
        },
        {
          kind: "mistake",
          body: "Answering from your memory of the gist. A wrong choice often quotes a genuine step from the directions, just not the step the question is asking about.",
        },
      ],
      quickCheck: {
        prompt:
          "A question asks what to do if a patient misses a dose. Where in the directions does the answer come from?",
        choices: [
          "The first step, since directions start there",
          "The step whose condition mentions a missed dose",
          "The last step, since it covers everything before it",
          "General knowledge about how medications work",
        ],
        answer: 1,
        explanation:
          "Condition questions point to the step whose \"if\" clause matches the situation. Neither position in the list nor outside knowledge decides the answer.",
      },
    },
    {
      id: "worked-example",
      title: "Applying a conditional step",
      blocks: [
        {
          kind: "example",
          title: "A medication direction",
          steps: [
            {
              note: "Read the directions exactly as written.",
              work: [
                "\"Take one tablet with food.\"",
                "\"If nausea occurs, stop and call the clinic before the next dose.\"",
              ],
            },
            {
              note: "The question: a patient feels nauseated. What should they do?",
              work: [],
            },
            {
              note: "Nausea matches the condition in the second step, so that step applies.",
              work: ["\"If nausea occurs...\" fits this patient's situation"],
            },
            {
              note: "The step gives two actions and one timing constraint.",
              work: [
                "Stop taking the tablet",
                "Call the clinic",
                "Do both before the next dose",
              ],
            },
          ],
          answer: "Stop and call the clinic before taking the next dose.",
        },
        {
          kind: "tip",
          body: "Underline conditional words (if, unless, when) and sequence words (first, then, after) as you read. Then reread the exact step the question points to instead of relying on memory.",
        },
      ],
      quickCheck: {
        prompt:
          "Using the same directions, when must the patient call the clinic?",
        choices: [
          "Before the next dose",
          "After finishing all the tablets",
          "Only at the next scheduled appointment",
          "Whenever they take a tablet with food",
        ],
        answer: 0,
        explanation:
          "The step says to stop and call the clinic \"before the next dose\". The other choices attach the call to timings the directions never mention.",
      },
    },
  ],
};
