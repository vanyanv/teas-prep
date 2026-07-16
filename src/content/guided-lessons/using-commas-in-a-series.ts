import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for ENGLISH / conventions / "Using Commas in a Series".
 * Content carried over from the flat skill-lesson blocks, restructured into
 * the concept / rule / example / mistake / quick check pattern. Quick checks
 * are informal and never touch mastery.
 */
export const COMMAS_IN_A_SERIES: GuidedLesson = {
  section: "ENGLISH",
  topic: "conventions",
  skill: "Using Commas in a Series",
  slug: "using-commas-in-a-series",
  title: "Commas in a Series",
  summary:
    "Use commas to separate three or more items in a list, including before the final conjunction.",
  minutes: [8, 10],
  objectives: [
    "Identify when a list is long enough to need commas",
    "Place a comma after each item in a series of three or more",
    "Use the serial comma before the final and or or",
    "Recognize series built from words, phrases, or short clauses",
    "Explain how the serial comma prevents grouping confusion",
  ],
  sections: [
    {
      id: "the-rule",
      title: "The rule",
      blocks: [
        {
          kind: "concept",
          body: "A series is a list of three or more items in one sentence. Commas mark where each item ends, so the reader can tell the items apart.\n\nTwo items joined by and need no comma between them. The rule starts at three.",
        },
        {
          kind: "rule",
          title: "Punctuating a series",
          items: [
            "Place a comma after each item in a series of three or more",
            "Include the comma before and or or at the end of the list; this is the serial or Oxford comma",
            "Do not place a comma after the final item",
          ],
        },
        {
          kind: "example",
          title: "Building the commas in",
          steps: [
            {
              note: "Start with the bare list of four items.",
              work: ["The cart held gloves gauze tape and scissors."],
            },
            {
              note: "Put a comma after each item except the last.",
              work: ["The cart held gloves, gauze, tape, and scissors."],
              becomes: "Three commas for four items",
            },
          ],
          answer: "The cart held gloves, gauze, tape, and scissors.",
        },
      ],
      quickCheck: {
        prompt: "How many items must a list have before this comma rule applies?",
        choices: ["Two or more", "Three or more", "Four or more", "Any number"],
        answer: 1,
        explanation:
          "A series begins at three items. Two items joined by and take no comma between them.",
      },
    },
    {
      id: "series-items",
      title: "What can be in a series",
      blocks: [
        {
          kind: "concept",
          body: "The items in a series do not have to be single words. The same comma rule applies whether the items are words, phrases, or short clauses, as long as there are three or more of them.",
        },
        {
          kind: "tabs",
          tabs: [
            {
              label: "Words",
              blocks: [
                {
                  kind: "concept",
                  body: "Single nouns, verbs, or adjectives listed one after another.\n\n\"The nurse checked pulse, temperature, and respiration.\"",
                },
              ],
            },
            {
              label: "Phrases",
              blocks: [
                {
                  kind: "concept",
                  body: "Groups of words that work together as one item.\n\n\"She washed her hands, put on gloves, and opened the kit.\"",
                },
              ],
            },
            {
              label: "Clauses",
              blocks: [
                {
                  kind: "concept",
                  body: "Short clauses, each with its own subject and verb.\n\n\"The doctor spoke, the nurse listened, and the patient nodded.\"",
                },
              ],
            },
          ],
        },
        {
          kind: "tip",
          body: "Count the items, not the words. A series of three long phrases still takes the same two commas as a series of three single words.",
        },
      ],
      quickCheck: {
        prompt:
          "Which of these can be the items in a comma series?",
        choices: [
          "Single words only",
          "Words and phrases, but not clauses",
          "Words, phrases, or short clauses",
          "Only items of the same length",
        ],
        answer: 2,
        explanation:
          "The series can be built from words, phrases, or short clauses. What matters is that there are three or more items, not what kind they are.",
      },
    },
    {
      id: "correct-and-incorrect",
      title: "Correct and incorrect",
      blocks: [
        {
          kind: "concept",
          body: "Most TEAS questions on this skill show you one sentence and ask whether its commas are placed correctly. Compare the sentence against the rule item by item.",
        },
        {
          kind: "example",
          title: "Spotting the error",
          steps: [
            {
              note: "Read the sentence and find the items.",
              work: [
                "Incorrect: \"The cart held gloves gauze tape and scissors.\"",
                "Items: gloves, gauze, tape, scissors",
              ],
              becomes: "Four items, no commas at all",
            },
            {
              note: "Four items need a comma after each of the first three.",
              work: ["Correct: \"The cart held gloves, gauze, tape, and scissors.\""],
            },
          ],
          answer:
            "Without commas the items run together; with them, each item stands on its own.",
        },
        {
          kind: "mistake",
          body: "Do not put a comma after the last item. \"Gloves, gauze, tape, and scissors, were on the cart\" wrongly separates the list from its verb.",
        },
      ],
      quickCheck: {
        prompt:
          "Which sentence punctuates the series correctly?",
        choices: [
          "She packed bandages, scissors and tape.",
          "She packed bandages, scissors, and tape.",
          "She packed bandages scissors, and tape.",
          "She packed bandages, scissors, and tape,.",
        ],
        answer: 1,
        explanation:
          "Three items need a comma after each of the first two, including the one before and. No comma follows the final item.",
      },
    },
    {
      id: "serial-comma-on-teas",
      title: "The serial comma on the TEAS",
      blocks: [
        {
          kind: "concept",
          body: "Some writing outside the test drops the comma before the final and. On the TEAS, keep it. It is the standard choice, and it avoids cases where two items run together as if they were one.",
        },
        {
          kind: "example",
          title: "How the missing comma confuses grouping",
          steps: [
            {
              note: "Drop the comma before and, and the last two items can read as one description.",
              work: [
                "\"She thanked her parents, the nurse and the doctor.\"",
                "This can be read as: her parents are the nurse and the doctor.",
              ],
              becomes: "Two possible readings",
            },
            {
              note: "Restore the serial comma and the three items separate cleanly.",
              work: [
                "\"She thanked her parents, the nurse, and the doctor.\"",
                "Now the list is clearly three separate parties.",
              ],
              becomes: "One reading only",
            },
          ],
          answer:
            "The serial comma tells the reader the final item is its own item, not a description of the one before it.",
        },
        {
          kind: "tip",
          body: "When a choice differs from another only by the comma before and, the version with the comma is the one the TEAS wants.",
        },
      ],
      quickCheck: {
        prompt:
          "Why does the TEAS prefer the comma before the final and?",
        choices: [
          "It makes the sentence shorter",
          "It is required whenever a list has two items",
          "It is standard and prevents two items from being read as one",
          "It replaces the conjunction and",
        ],
        answer: 2,
        explanation:
          "The serial comma is the standard choice, and it keeps the final item from being read as a description of the item before it. It does not replace and, and it does not apply to two-item lists.",
      },
    },
  ],
};
