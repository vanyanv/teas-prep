import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for ENGLISH / conventions / "Using Commas to Join Clauses
 * Together". Content carried over from the flat skill-lesson blocks,
 * restructured into the concept / rule / example / mistake / quick check
 * pattern. Quick checks are informal and never touch mastery.
 */
export const USING_COMMAS_TO_JOIN_CLAUSES: GuidedLesson = {
  section: "ENGLISH",
  topic: "conventions",
  skill: "Using Commas to Join Clauses Together",
  slug: "using-commas-to-join-clauses-together",
  title: "Using Commas to Join Clauses",
  summary:
    "Use a comma plus a coordinating conjunction to join two independent clauses.",
  minutes: [6, 8],
  objectives: [
    "Recognize an independent clause",
    "Join two independent clauses with a comma plus a coordinating conjunction",
    "Identify and correct a comma splice",
    "Decide when a conjunction needs no comma at all",
  ],
  sections: [
    {
      id: "comma-plus-fanboys",
      title: "Comma plus a conjunction",
      blocks: [
        {
          kind: "concept",
          body: "An independent clause is a group of words that could stand alone as a complete sentence: it has a subject and a verb and expresses a finished thought. \"The patient rested\" is an independent clause. \"After the patient rested\" is not, because it leaves the thought hanging.\n\nWhen you want to join two independent clauses into one sentence, a comma by itself is not strong enough. You need a comma and a coordinating conjunction working as a pair.\n\nThere are seven coordinating conjunctions, and the word FANBOYS holds all of them: for, and, nor, but, or, yet, so.",
        },
        {
          kind: "rule",
          title: "The joining rule",
          items: [
            "Confirm that both sides are complete sentences on their own.",
            "Place the comma at the end of the first clause, before the conjunction.",
            "Choose the FANBOYS word that fits the meaning: for, and, nor, but, or, yet, so.",
          ],
          ordered: true,
        },
        {
          kind: "example",
          title: "Joining two complete sentences",
          expression: "The patient rested + the swelling decreased",
          steps: [
            {
              note: "Check the first side. It has a subject and a verb and finishes its thought, so it is independent.",
              work: ["\"The patient rested.\""],
            },
            {
              note: "Check the second side. It also stands alone, so both sides are independent clauses.",
              work: ["\"The swelling decreased.\""],
            },
            {
              note: "Join them with a comma before the conjunction. \"And\" fits because the second event simply adds to the first.",
              work: ["\"The patient rested, and the swelling decreased.\""],
            },
          ],
          answer: "The patient rested, and the swelling decreased.",
        },
        {
          kind: "mistake",
          body: "The comma goes before the conjunction, not after it. \"The patient rested and, the swelling decreased\" puts the pause in the wrong place and breaks the pairing.",
        },
      ],
      quickCheck: {
        prompt:
          "Which sentence correctly joins two independent clauses?",
        choices: [
          "The nurse charted the vitals and, the doctor reviewed them.",
          "The nurse charted the vitals, and the doctor reviewed them.",
          "The nurse charted the vitals and the doctor reviewed them,",
          "The nurse charted the vitals, the doctor reviewed them.",
        ],
        answer: 1,
        explanation:
          "Both sides stand alone as sentences, so they need a comma plus a FANBOYS word, with the comma placed before \"and\".",
      },
    },
    {
      id: "comma-splice",
      title: "Comma splices",
      blocks: [
        {
          kind: "concept",
          body: "A comma splice happens when a comma alone is asked to hold two independent clauses together, with no conjunction to help it. It is one of the most common errors tested on the TEAS.\n\nIncorrect: The patient rested, the swelling decreased.\n\nBoth halves are complete sentences, so the lone comma is too weak to join them. Adding the conjunction repairs it: The patient rested, and the swelling decreased.",
        },
        {
          kind: "rule",
          title: "Three ways to fix a splice",
          items: [
            "Add a coordinating conjunction after the comma: The patient rested, and the swelling decreased.",
            "Replace the comma with a semicolon: The patient rested; the swelling decreased.",
            "Split them into two sentences with a period: The patient rested. The swelling decreased.",
          ],
        },
        {
          kind: "mistake",
          body: "A comma splice does not become correct just because the two clauses are short or closely related in meaning. \"She charted it, he signed it\" is still a splice.",
        },
      ],
      quickCheck: {
        prompt:
          "What is wrong with \"The medication arrived late, the dose was still given on time\"?",
        choices: [
          "Nothing, the comma is correct as written.",
          "It is a comma splice: two independent clauses joined by a comma alone.",
          "The comma should be moved to after \"still\".",
          "The two clauses are too closely related to be joined.",
        ],
        answer: 1,
        explanation:
          "Both sides are complete sentences, so a comma alone cannot join them. Add a conjunction such as \"but\", or use a semicolon or a period.",
      },
    },
    {
      id: "standalone-test",
      title: "Testing each side",
      blocks: [
        {
          kind: "concept",
          body: "Not every conjunction needs a comma. When \"and\" or \"but\" joins only two verbs or two subjects, there is just one clause, so no comma belongs there.\n\nThe deciding question is always the same: can each side of the conjunction stand alone as a sentence?",
        },
        {
          kind: "tip",
          body: "Test each side of the conjunction. If both sides can stand alone as a sentence, you need the comma plus conjunction. If one side cannot stand alone, leave the comma out.",
        },
        {
          kind: "example",
          title: "Applying the test twice",
          steps: [
            {
              note: "Test \"The patient rested and recovered quickly.\" The right side, \"recovered quickly\", has no subject, so it cannot stand alone.",
              work: [
                "Left: \"The patient rested.\" Stands alone.",
                "Right: \"recovered quickly\" Does not stand alone.",
              ],
              becomes: "The patient rested and recovered quickly. (no comma)",
            },
            {
              note: "Test \"The patient rested and the swelling decreased.\" Both sides stand alone, so the comma is required.",
              work: [
                "Left: \"The patient rested.\" Stands alone.",
                "Right: \"The swelling decreased.\" Stands alone.",
              ],
              becomes:
                "The patient rested, and the swelling decreased. (comma needed)",
            },
          ],
          answer:
            "One shared subject means no comma; two independent clauses mean a comma before the conjunction.",
        },
        {
          kind: "mistake",
          body: "Do not add a comma when the conjunction joins only two verbs or two subjects. \"The nurse checked the chart, and updated the notes\" is incorrect, because \"updated the notes\" cannot stand alone.",
        },
      ],
      quickCheck: {
        prompt:
          "Does \"The doctor reviewed the scan and ordered more tests\" need a comma before \"and\"?",
        choices: [
          "Yes, every \"and\" between actions takes a comma.",
          "No, because \"ordered more tests\" cannot stand alone as a sentence.",
          "Yes, because there are two verbs.",
          "No, because the sentence is short.",
        ],
        answer: 1,
        explanation:
          "\"And\" joins two verbs that share the subject \"The doctor\", so there is only one clause and no comma belongs before it.",
      },
    },
  ],
};
