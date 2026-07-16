import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for ENGLISH / conventions / "Correct Use of Parentheses".
 * Content carried over from the flat skill-lesson blocks, restructured into
 * the concept / rule / example / mistake / quick check pattern. Quick checks
 * are informal and never touch mastery.
 */
export const CORRECT_USE_OF_PARENTHESES: GuidedLesson = {
  section: "ENGLISH",
  topic: "conventions",
  skill: "Correct Use of Parentheses",
  slug: "correct-use-of-parentheses",
  title: "Using Parentheses",
  summary:
    "Use parentheses to enclose extra information that could be removed without breaking the sentence.",
  minutes: [6, 8],
  objectives: [
    "Identify the nonessential details, clarifications, and asides that parentheses enclose",
    "Apply the removal test to check whether parentheses are used correctly",
    "Place end punctuation and commas correctly around parenthetical material",
    "Decide when a detail belongs in the sentence rather than inside parentheses",
  ],
  sections: [
    {
      id: "what-they-do",
      title: "What parentheses enclose",
      blocks: [
        {
          kind: "concept",
          body: "Parentheses set off nonessential details, clarifications, or asides. The material inside adds something useful, but the sentence does not depend on it.\n\nThat gives you a single test. Cover the parenthetical material with your finger and read what is left. If the sentence still reads correctly on its own, the parentheses are doing their job.",
        },
        {
          kind: "rule",
          title: "The removal test",
          intro: "Read the sentence without the parenthetical material:",
          items: [
            "If the remaining sentence is complete and correct, the parentheses are used properly.",
            "If the remaining sentence is broken or missing something it needs, the material was essential and does not belong in parentheses.",
          ],
        },
        {
          kind: "example",
          title: "Applying the removal test",
          steps: [
            {
              note: "Start with the full sentence.",
              work: [
                "\"The medication (a common antibiotic) was prescribed for ten days.\"",
              ],
            },
            {
              note: "Remove the parenthetical material and read what remains.",
              work: [
                "\"The medication was prescribed for ten days.\"",
                "The sentence is still complete and correct.",
              ],
              becomes: "Correct use",
            },
          ],
          answer:
            "The aside can be lifted out cleanly, so the parentheses are correct.",
        },
      ],
      quickCheck: {
        prompt:
          "How can you tell whether material belongs inside parentheses?",
        choices: [
          "The sentence still reads correctly when the material is removed",
          "The material is shorter than the rest of the sentence",
          "The material appears at the end of the sentence",
          "The material contains a number or a date",
        ],
        answer: 0,
        explanation:
          "Parentheses hold nonessential material, so the sentence must survive without it. Length, position, and content do not decide the question.",
      },
    },
    {
      id: "punctuation",
      title: "Punctuation around parentheses",
      blocks: [
        {
          kind: "concept",
          body: "Once the parentheses are placed correctly, the punctuation around them follows two habits.\n\nThe parenthetical material is an interruption, not a new sentence, so the surrounding sentence keeps its own punctuation and keeps it outside the parentheses.",
        },
        {
          kind: "rule",
          title: "Two punctuation rules",
          items: [
            "Place end punctuation outside the closing parenthesis when the parentheses fall inside a larger sentence.",
            "Do not put a comma directly before an opening parenthesis.",
          ],
        },
        {
          kind: "example",
          title: "Spotting the comma error",
          steps: [
            {
              note: "Read the incorrect version and find the stray mark.",
              work: [
                "Incorrect: \"The medication, (a common antibiotic) was prescribed for ten days.\"",
                "A comma sits directly before the opening parenthesis.",
              ],
            },
            {
              note: "Delete the comma. The parentheses already do the separating.",
              work: [
                "Correct: \"The medication (a common antibiotic) was prescribed for ten days.\"",
              ],
              becomes: "Correct use",
            },
          ],
          answer:
            "Drop the comma before the opening parenthesis; the parentheses set the aside off on their own.",
        },
        {
          kind: "mistake",
          body: "Do not pull the sentence's period inside the closing parenthesis. Write \"The medication was prescribed for ten days (the standard course).\" and not \"...for ten days (the standard course.)\" The period ends the whole sentence, so it stays outside.",
        },
      ],
      quickCheck: {
        prompt:
          "Which sentence punctuates the parentheses correctly?",
        choices: [
          "The patient, (a retired nurse) asked about side effects.",
          "The patient (a retired nurse) asked about side effects.",
          "The patient (a retired nurse,) asked about side effects.",
          "The patient (a retired nurse.) asked about side effects.",
        ],
        answer: 1,
        explanation:
          "No comma belongs directly before the opening parenthesis, and no punctuation from the surrounding sentence belongs inside the closing one.",
      },
    },
    {
      id: "using-sparingly",
      title: "When not to use them",
      blocks: [
        {
          kind: "concept",
          body: "Parentheses quietly tell the reader that what is inside matters less. That signal is useful for an aside, and misleading for anything the main point depends on.\n\nSo the choice is not only about grammar. If a detail is important, work it into the sentence directly rather than tucking it inside parentheses.",
        },
        {
          kind: "tip",
          body: "Use parentheses sparingly. When you find several sets in one paragraph, most of them are usually details that would read better as part of the sentence itself.",
        },
        {
          kind: "example",
          title: "Promoting an important detail",
          steps: [
            {
              note: "The parentheses hide the detail that carries the point.",
              work: [
                "\"The medication (which the patient is allergic to) was prescribed for ten days.\"",
                "The allergy is the most important fact in the sentence.",
              ],
            },
            {
              note: "Rewrite it into the sentence so it carries normal weight.",
              work: [
                "\"The medication was prescribed for ten days, even though the patient is allergic to it.\"",
              ],
              becomes: "The key detail now reads as essential",
            },
          ],
          answer:
            "Essential information belongs in the sentence; parentheses are for material the reader could skip.",
        },
      ],
      quickCheck: {
        prompt:
          "A writer puts a detail that the main point depends on inside parentheses. What should they do instead?",
        choices: [
          "Keep the parentheses but add a comma before them",
          "Replace the parentheses with a second set of parentheses",
          "Work the detail into the sentence directly",
          "Move the parentheses to the end of the sentence",
        ],
        answer: 2,
        explanation:
          "Parentheses signal that material is nonessential, so an important detail belongs in the sentence itself rather than tucked inside them.",
      },
    },
  ],
};
