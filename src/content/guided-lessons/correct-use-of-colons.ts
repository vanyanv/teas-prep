import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for ENGLISH / conventions / "Correct Use of Colons". Content
 * carried over from the flat skill-lesson blocks, restructured into the
 * concept / rule / example / mistake / quick check pattern. Quick checks are
 * informal and never touch mastery.
 */
export const CORRECT_USE_OF_COLONS: GuidedLesson = {
  section: "ENGLISH",
  topic: "conventions",
  skill: "Correct Use of Colons",
  slug: "correct-use-of-colons",
  title: "Correct Use of Colons",
  summary:
    "Use a colon after a complete sentence to introduce a list, explanation, or example.",
  minutes: [8, 10],
  objectives: [
    "Explain what a colon signals to the reader",
    "Check that the words before a colon form a complete sentence",
    "Avoid placing a colon directly after a verb or a preposition",
    "Capitalize the first word after a colon correctly",
    "Apply the cover test to decide whether a colon belongs",
  ],
  sections: [
    {
      id: "what-a-colon-does",
      title: "What a colon does",
      blocks: [
        {
          kind: "concept",
          body: "A colon points forward. It tells the reader that what comes next will deliver on what the sentence just set up: a list, a quotation, or an explanation.\n\nFor that to work, the words before the colon must form a complete sentence on their own. The colon is the hinge between a finished thought and the material that fills it in.",
        },
        {
          kind: "rule",
          title: "The colon rule",
          items: [
            "Use a colon to introduce a list, a quotation, or an explanation",
            "The words before the colon must form a complete sentence",
            "Do not place a colon directly after a verb or a preposition",
          ],
        },
        {
          kind: "tip",
          body: "Think of the colon as meaning \"and here it is.\" If the words before it have not yet said anything complete, there is nothing for the colon to deliver on.",
        },
      ],
      quickCheck: {
        prompt: "What must come before a colon?",
        choices: [
          "A complete sentence",
          "A verb",
          "A list of at least three items",
          "A proper noun",
        ],
        answer: 0,
        explanation:
          "A colon points forward from a finished thought, so the words before it have to stand alone as a complete sentence. What follows may be a list, a quotation, or an explanation.",
      },
    },
    {
      id: "verbs-and-prepositions",
      title: "Verbs and prepositions",
      blocks: [
        {
          kind: "concept",
          body: "The most common colon error is dropping one right after a verb or a preposition. Those words are still reaching for their object, so the sentence is not finished yet.\n\nWhen a colon interrupts there, it cuts the sentence in half. Either remove the colon and let the words run on, or add enough to complete the thought first.",
        },
        {
          kind: "example",
          title: "Fixing a colon after a verb",
          steps: [
            {
              note: "Start with the faulty sentence and find the word before the colon.",
              work: [
                "\"Bring: a stethoscope, a pen, and a notebook.\"",
                "Bring is a verb still waiting for its object.",
              ],
              becomes: "Incorrect: the colon follows a verb",
            },
            {
              note: "Option one: delete the colon and let the verb reach its list.",
              work: ["\"Bring a stethoscope, a pen, and a notebook.\""],
              becomes: "Correct",
            },
            {
              note: "Option two: complete the thought before the colon, then keep it.",
              work: ["\"Bring three items: a stethoscope, a pen, and a notebook.\""],
              becomes: "Correct",
            },
          ],
          answer:
            "Both fixes work. Either remove the colon, or finish the sentence before it.",
        },
        {
          kind: "mistake",
          body: "Assuming any list needs a colon. A list introduced directly by a verb or a preposition takes no punctuation at all. \"The kit consists of gauze, tape, and scissors\" is correct as written; a colon after \"of\" would break it.",
        },
      ],
      quickCheck: {
        prompt: "Which sentence uses the colon correctly?",
        choices: [
          "The cart is stocked with: gauze, tape, and scissors.",
          "Please bring: your badge and your schedule.",
          "The nurse checked three things: pulse, temperature, and blood pressure.",
          "Her shift includes: mornings, evenings, and weekends.",
        ],
        answer: 2,
        explanation:
          "\"The nurse checked three things\" is a complete sentence, so the colon can point forward from it. The other choices place a colon straight after a preposition (with, of) or a verb (bring, includes).",
      },
    },
    {
      id: "capitalization",
      title: "Capitalizing after a colon",
      blocks: [
        {
          kind: "concept",
          body: "What follows a colon is usually lowercase, because it is finishing the sentence rather than starting a new one. Two situations override that.",
        },
        {
          kind: "rule",
          title: "Capitalizing the first word after a colon",
          items: [
            "It is a proper noun: always capitalize",
            "It begins a complete sentence: you may capitalize, and style guides differ. Be consistent",
            "Otherwise, keep it lowercase",
          ],
        },
        {
          kind: "example",
          title: "Three colons, three decisions",
          steps: [
            {
              note: "A list follows, so the first word stays lowercase.",
              work: ["\"Bring three items: a stethoscope, a pen, and a notebook.\""],
              becomes: "Lowercase: a list is not a sentence",
            },
            {
              note: "A complete sentence follows, so it may be capitalized.",
              work: ["\"The reason was simple: The clinic had no beds left.\""],
              becomes: "Capitalized: a full sentence follows",
            },
            {
              note: "A proper noun follows, so it keeps its capital regardless.",
              work: ["\"Only one hospital took the case: Mercy General.\""],
              becomes: "Capitalized: proper noun",
            },
          ],
          answer:
            "Lowercase by default; capitalize for a complete sentence or a proper noun.",
        },
      ],
      quickCheck: {
        prompt:
          "In \"She packed one thing: her stethoscope,\" why is \"her\" lowercase?",
        choices: [
          "Every word after a colon is lowercase",
          "What follows is neither a complete sentence nor a proper noun",
          "The colon follows a verb",
          "The sentence before the colon is short",
        ],
        answer: 1,
        explanation:
          "\"Her stethoscope\" is a phrase finishing the thought, not a sentence or a name, so it stays lowercase. A complete sentence or a proper noun after the colon would be capitalized.",
      },
    },
    {
      id: "cover-test",
      title: "The cover test",
      blocks: [
        {
          kind: "concept",
          body: "You do not have to analyze the grammar to check a colon. Cover everything after it with your finger and read only what is left.\n\nIf what remains is a full sentence, the colon is correct. If it is not, the colon does not belong.",
        },
        {
          kind: "rule",
          title: "Run the cover test",
          ordered: true,
          items: [
            "Cover everything from the colon onward",
            "Read aloud what is left",
            "Ask whether it could stand alone as a sentence",
            "If yes, keep the colon; if no, remove it or finish the thought",
          ],
        },
        {
          kind: "example",
          title: "Testing two sentences",
          steps: [
            {
              note: "Cover the list in the first sentence and read the rest.",
              work: [
                "\"Bring three items: a stethoscope, a pen, and a notebook.\"",
                "Left over: \"Bring three items.\" That stands alone.",
              ],
              becomes: "Colon is correct",
            },
            {
              note: "Do the same with the second sentence.",
              work: [
                "\"Bring: a stethoscope, a pen, and a notebook.\"",
                "Left over: \"Bring.\" That is not a sentence.",
              ],
              becomes: "Colon is incorrect",
            },
          ],
          answer:
            "The cover test separates them at once: \"Bring three items\" survives on its own, \"Bring\" does not.",
        },
        {
          kind: "mistake",
          body: "Judging by what comes after the colon instead of before it. The list looks the same in both sentences above. Only the words in front of the colon decide whether it is correct.",
        },
      ],
      quickCheck: {
        prompt:
          "You cover everything after the colon and the words left over are \"The supplies included.\" What should you do?",
        choices: [
          "Keep the colon, since a list follows it",
          "Keep the colon, since the words before it are long enough",
          "Remove the colon, because \"The supplies included\" is not a complete sentence",
          "Capitalize the first word after the colon",
        ],
        answer: 2,
        explanation:
          "\"Included\" is a verb still waiting for its object, so the words left over cannot stand alone. The colon fails the cover test and should be removed.",
      },
    },
  ],
};
