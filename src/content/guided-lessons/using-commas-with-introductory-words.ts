import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for ENGLISH / conventions / "Using Commas with Introductory
 * Words". Content carried over from the flat skill-lesson blocks, restructured
 * into the concept / rule / example / mistake / quick check pattern. Quick
 * checks are informal and never touch mastery.
 */
export const COMMAS_WITH_INTRODUCTORY_WORDS: GuidedLesson = {
  section: "ENGLISH",
  topic: "conventions",
  skill: "Using Commas with Introductory Words",
  slug: "using-commas-with-introductory-words",
  title: "Commas with Introductory Words",
  summary:
    "Place a comma after an introductory word, phrase, or clause that comes before the main part of the sentence.",
  minutes: [8, 10],
  objectives: [
    "Explain why an introductory element takes a comma",
    "Identify the introductory word, phrase, or clause in a sentence",
    "Place the comma where the main part of the sentence begins",
    "Decide when a very short introductory phrase can go without one",
  ],
  sections: [
    {
      id: "the-rule",
      title: "The rule",
      blocks: [
        {
          kind: "concept",
          body: "Some sentences open with material that sets the scene before the main idea arrives. That opening material is the introductory element, and a comma marks where it ends.\n\nThe comma is a signal to the reader. Without it, the reader keeps attaching words to the opening element and has to back up once the real subject appears.",
        },
        {
          kind: "rule",
          title: "Set off the introductory element",
          intro:
            "Put a comma after the opening element so the reader knows where the main idea begins:",
          items: [
            "After introductory words like However, Therefore, and Yes",
            "After an introductory phrase such as \"After the shift\" or \"In the morning\"",
            "After an introductory dependent clause such as \"Because she was tired\"",
          ],
        },
        {
          kind: "tip",
          body: "Find the subject and verb of the main idea, then place the comma just before them. Everything ahead of that point is the introductory element.",
        },
      ],
      quickCheck: {
        prompt: "What job does the comma after an introductory element do?",
        choices: [
          "It marks where the main part of the sentence begins",
          "It shows that the sentence contains two complete ideas",
          "It replaces a word that has been left out",
          "It signals a pause of a fixed length",
        ],
        answer: 0,
        explanation:
          "The comma tells the reader the opening material has ended and the main idea starts. It is not joining two complete ideas, and it does not stand in for a missing word.",
      },
    },
    {
      id: "three-kinds",
      title: "Three kinds of opener",
      blocks: [
        {
          kind: "concept",
          body: "The rule is one rule, but the opening element shows up in three sizes. Recognizing which one you are looking at makes the comma easy to place.",
        },
        {
          kind: "tabs",
          tabs: [
            {
              label: "Word",
              blocks: [
                {
                  kind: "concept",
                  body: "A single word opens the sentence, often a transition or a plain yes or no.\n\n- However, the results arrived late.\n- Therefore, the dose was adjusted.\n- Yes, the chart was updated.",
                },
              ],
            },
            {
              label: "Phrase",
              blocks: [
                {
                  kind: "concept",
                  body: "A group of words that sets a time or place, with no subject and verb of its own.\n\n- After the shift, she drove home.\n- In the morning, the unit is quiet.",
                },
              ],
            },
            {
              label: "Clause",
              blocks: [
                {
                  kind: "concept",
                  body: "A dependent clause has its own subject and verb but cannot stand alone. It usually opens with a word like because, when, although, or if.\n\n- Because she was tired, she asked for a break.\n- When the alarm sounded, the team responded.",
                },
              ],
            },
          ],
        },
        {
          kind: "mistake",
          body: "Do not put the comma in the middle of the opening element. In \"Because she was tired, she asked for a break,\" the comma goes after tired, not after Because. The whole clause is the introduction.",
        },
      ],
      quickCheck: {
        prompt:
          "In \"When the alarm sounded the team responded,\" where does the comma belong?",
        choices: [
          "After When",
          "After sounded",
          "After team",
          "No comma is needed",
        ],
        answer: 1,
        explanation:
          "\"When the alarm sounded\" is the introductory dependent clause, so the comma follows sounded, where the main idea (the team responded) begins.",
      },
    },
    {
      id: "worked-example",
      title: "Placing the comma",
      blocks: [
        {
          kind: "concept",
          body: "The sentence below opens with a phrase. Work it the way the rule describes: find the main idea, then mark where it starts.",
        },
        {
          kind: "example",
          title: "After the long shift the nurse charted her notes.",
          steps: [
            {
              note: "Find the subject and verb of the main idea.",
              work: [
                "\"the nurse charted her notes\"",
                "That is the main part of the sentence.",
              ],
            },
            {
              note: "Everything before it is the introductory phrase.",
              work: ["\"After the long shift\""],
              becomes: "An introductory phrase, so it takes a comma",
            },
            {
              note: "Place the comma at the boundary between the two.",
              work: ["Correct: After the long shift, the nurse charted her notes."],
              becomes: "Incorrect: After the long shift the nurse charted her notes.",
            },
          ],
          answer: "After the long shift, the nurse charted her notes.",
        },
        {
          kind: "mistake",
          body: "Running the opener straight into the main idea makes the reader group \"the long shift the nurse\" together before backing up. The comma prevents that stumble.",
        },
      ],
      quickCheck: {
        prompt: "Which sentence places the comma correctly?",
        choices: [
          "In the morning the unit is, quiet.",
          "In, the morning the unit is quiet.",
          "In the morning, the unit is quiet.",
          "In the morning the unit, is quiet.",
        ],
        answer: 2,
        explanation:
          "\"In the morning\" is the introductory phrase, so the comma follows it, right where the main idea (the unit is quiet) begins. The other placements cut into the phrase or split the subject from its verb.",
      },
    },
    {
      id: "short-openers",
      title: "Very short openers",
      blocks: [
        {
          kind: "concept",
          body: "A very short introductory phrase of one or two words sometimes does not require a comma. \"In 2019 the clinic expanded\" reads cleanly without one, because there is no chance of misreading it.\n\nAdding the comma is rarely wrong, though, and it improves clarity. When you are unsure on a test, the comma is the safer choice.",
        },
        {
          kind: "rule",
          title: "When you are deciding",
          items: [
            "Longer opener, or any dependent clause: use the comma",
            "One or two words, with no risk of misreading: the comma is optional",
            "Unsure: include the comma, since it is rarely wrong",
          ],
        },
        {
          kind: "mistake",
          body: "Do not stretch the short-opener allowance to cover introductory clauses. \"Because she was tired\" is short to read but still a dependent clause, and it takes the comma.",
        },
      ],
      quickCheck: {
        prompt:
          "An introductory phrase is only two words long. What is the best approach?",
        choices: [
          "The comma is optional, and including it is rarely wrong",
          "The comma is forbidden for short phrases",
          "The comma is required for every opener without exception",
          "Drop the comma unless the sentence is a question",
        ],
        answer: 0,
        explanation:
          "A very short introductory phrase sometimes does not need a comma, so it is optional. Because adding one is rarely wrong and improves clarity, including it stays safe.",
      },
    },
  ],
};
