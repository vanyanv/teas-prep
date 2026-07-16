import type { GuidedLesson } from "../guided-lesson-types";

/** Guided lesson for READING / craft-structure / "Interpret the Meaning of
 *  Words and Phrases Using Context". Content carried over from the flat
 *  skill-lesson blocks, restructured into the concept / rule / example /
 *  mistake / quick check pattern. */
export const INTERPRET_WORDS_PHRASES_CONTEXT: GuidedLesson = {
  section: "READING",
  topic: "craft-structure",
  skill: "Interpret the Meaning of Words and Phrases Using Context",
  slug: "interpret-the-meaning-of-words-and-phrases-using-context",
  title: "Words and Phrases in Context",
  summary:
    "Context clues are the surrounding words that help you figure out what an unfamiliar word or phrase means.",
  minutes: [6, 8],
  objectives: [
    "Recognize the common types of context clues",
    "Use nearby words to work out what an unfamiliar word means",
    "Answer vocabulary questions from how a word is used in the passage",
    "Apply the cover-and-predict strategy on test day",
  ],
  sections: [
    {
      id: "what-context-clues-are",
      title: "What context clues are",
      blocks: [
        {
          kind: "concept",
          body: "When you do not know a word, you rarely need a dictionary. The nearby sentences usually point to its meaning, and those pointers are called context clues.",
        },
        {
          kind: "rule",
          title: "Four common clue types",
          items: [
            "Definition: the sentence defines the word directly",
            "Example: the text gives an example of the word in action",
            "Restatement: the idea is said again in simpler words",
            "Contrast: the text shows what the word is not",
          ],
        },
        {
          kind: "tip",
          body: "Read a full sentence before and after the unfamiliar word. The clue is often not in the same sentence as the word itself.",
        },
      ],
      quickCheck: {
        prompt:
          "\"Her reply was terse; in other words, it was short and abrupt.\" Which type of context clue reveals what terse means?",
        choices: [
          "Definition, because a dictionary entry is quoted",
          "Example, because an example of a reply is given",
          "Restatement, because the idea is said again in simpler words",
          "Contrast, because the sentence shows what terse is not",
        ],
        answer: 2,
        explanation:
          "The phrase in other words signals a restatement: the sentence repeats the meaning of terse in plainer language.",
      },
    },
    {
      id: "how-the-teas-tests-it",
      title: "How the TEAS tests it",
      blocks: [
        {
          kind: "concept",
          body: "On the TEAS, a word in the passage is underlined or quoted, and the question asks which answer choice is closest to its meaning. You choose based only on how the word is used in that passage, not on a definition you memorized.",
        },
        {
          kind: "mistake",
          body: "Do not pick an answer just because it matches a definition you already know. Many words have several meanings, and the test wants the one that fits this passage. Check your choice against the surrounding sentences.",
        },
      ],
      quickCheck: {
        prompt:
          "A TEAS question underlines a word in the passage and asks for the closest meaning. What should your answer be based on?",
        choices: [
          "The most common dictionary definition of the word",
          "How the word is used in that passage",
          "The first meaning you learned for the word",
          "The longest and most technical answer choice",
        ],
        answer: 1,
        explanation:
          "The question asks for the meaning as the word is used in the passage, so the surrounding context, not a memorized definition, decides the answer.",
      },
    },
    {
      id: "a-clue-in-action",
      title: "A clue in action",
      blocks: [
        {
          kind: "concept",
          body: "Working one example slowly shows how little the unfamiliar word itself matters. The words around it do the work.",
        },
        {
          kind: "example",
          title: "What does suppurate mean?",
          steps: [
            {
              note: "Read the sentence and look for nearby words that describe the same event.",
              work: [
                "\"The wound began to suppurate, oozing pus and fluid for days.\"",
              ],
            },
            {
              note: "The phrase right after the word describes what the wound is doing.",
              work: ["oozing pus and fluid"],
            },
            {
              note: "Match the unfamiliar word to that description.",
              work: [],
            },
          ],
          answer: "Suppurate means to form or discharge pus.",
        },
      ],
      quickCheck: {
        prompt:
          "\"The wound began to suppurate, oozing pus and fluid for days.\" Which words point to the meaning of suppurate?",
        choices: [
          "The wound began",
          "oozing pus and fluid",
          "for days",
          "There are no clues; you must already know the word",
        ],
        answer: 1,
        explanation:
          "The phrase oozing pus and fluid describes the same event as suppurate, so it tells you the word means to form or discharge pus.",
      },
    },
    {
      id: "cover-and-predict",
      title: "Cover the word and predict",
      blocks: [
        {
          kind: "concept",
          body: "The most reliable test-day strategy is to work out your own answer before you look at the choices. Predicting first keeps a tempting wrong choice from steering you.",
        },
        {
          kind: "rule",
          title: "The strategy",
          ordered: true,
          items: [
            "Cover the unfamiliar word and read the sentence with a blank",
            "Predict a simple word of your own that fits the blank",
            "Pick the answer choice closest to your prediction",
          ],
        },
        {
          kind: "example",
          title: "Predict before you peek",
          steps: [
            {
              note: "Cover the word and read the sentence with a blank.",
              work: ["\"The wound began to ___, oozing pus and fluid for days.\""],
            },
            {
              note: "Predict a simple word that fits: something like ooze or leak.",
              work: [],
            },
            {
              note: "Scan the choices for the one closest to your prediction.",
              work: [],
            },
          ],
          answer: "The choice meaning to discharge pus matches the prediction.",
        },
        {
          kind: "tip",
          body: "Your prediction does not have to be fancy. A plain everyday word is enough, because you only need it to point you at the closest answer choice.",
        },
      ],
      quickCheck: {
        prompt:
          "Using the cover-and-predict strategy, what do you do before reading the answer choices?",
        choices: [
          "Eliminate the two longest choices",
          "Look up the word's roots and prefixes",
          "Predict your own simple word that fits the blank",
          "Reread the entire passage from the beginning",
        ],
        answer: 2,
        explanation:
          "You cover the word, read the sentence with a blank, and predict a simple word that fits. Then you pick the choice closest to your prediction.",
      },
    },
  ],
};
