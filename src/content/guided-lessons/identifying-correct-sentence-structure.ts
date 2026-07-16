import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for ENGLISH / conventions / "Identifying Correct Sentence
 * Structure". Content carried over from the flat skill-lesson blocks,
 * restructured into the concept / rule / example / mistake / quick check
 * pattern. Quick checks are informal and never touch mastery.
 */
export const CORRECT_SENTENCE_STRUCTURE: GuidedLesson = {
  section: "ENGLISH",
  topic: "conventions",
  skill: "Identifying Correct Sentence Structure",
  slug: "identifying-correct-sentence-structure",
  title: "Correct Sentence Structure",
  summary:
    "A complete sentence needs a subject and a verb and must avoid fragments, run-ons, and comma splices.",
  minutes: [8, 10],
  objectives: [
    "Test whether a group of words is a complete sentence",
    "Recognize a fragment and name what it is missing",
    "Tell a run-on apart from a comma splice",
    "Repair two joined clauses with a period, a semicolon, or a comma plus a conjunction",
  ],
  sections: [
    {
      id: "complete-sentences",
      title: "Complete sentences and fragments",
      blocks: [
        {
          kind: "concept",
          body: "A complete sentence has three things: a subject (who or what the sentence is about), a verb (what the subject does or is), and a complete thought that can stand on its own.\n\nA group of words that fails any one of those tests is a fragment. Fragments often look like sentences because they start with a capital letter and end with a period, so you have to check the parts rather than trust the punctuation.",
        },
        {
          kind: "rule",
          title: "A fragment is missing one of these",
          items: [
            "A subject: \"Charted the vitals after rounds.\" Who charted them?",
            "A verb: \"The nurse on the night shift.\" What did the nurse do?",
            "A complete thought: \"Because the shift ended.\" This has a subject and a verb, but it leaves you waiting.",
          ],
        },
        {
          kind: "example",
          title: "Testing a group of words",
          steps: [
            {
              note: "Look for the subject and the verb first.",
              work: [
                "\"After the long shift ended at seven.\"",
                "Subject: shift. Verb: ended.",
              ],
              becomes: "Both parts are present, so keep testing.",
            },
            {
              note: "Now ask whether it stands on its own as a complete thought.",
              work: [
                "After signals that something else is coming.",
                "You are left waiting for what happened.",
              ],
              becomes: "Fragment: no complete thought",
            },
          ],
          answer:
            "It is a fragment. Having a subject and a verb is not enough when a word like after leaves the thought unfinished.",
        },
        {
          kind: "mistake",
          body: "Length is not the test. \"Because the exhausted nurse finally finished charting every patient's vitals after a twelve-hour shift\" is long and detailed and still a fragment. Meanwhile \"She left.\" is short and complete.",
        },
      ],
      quickCheck: {
        prompt: "Why is \"Because the monitor alarmed\" a fragment?",
        choices: [
          "It has no subject",
          "It has no verb",
          "It does not express a complete thought",
          "It is too short to be a sentence",
        ],
        answer: 2,
        explanation:
          "It has a subject (monitor) and a verb (alarmed), but because leaves the thought unfinished, so it cannot stand on its own. Length never decides the question.",
      },
    },
    {
      id: "run-ons-and-splices",
      title: "Run-ons and comma splices",
      blocks: [
        {
          kind: "concept",
          body: "An independent clause is a group of words that could be its own sentence: subject, verb, complete thought. Trouble starts when two independent clauses get joined without the punctuation the join requires.\n\nThere are two versions of this error, and they differ only in what sits between the clauses.",
        },
        {
          kind: "rule",
          title: "Two ways a join goes wrong",
          items: [
            "Run-on: two independent clauses jammed together with no punctuation at all.",
            "Comma splice: two independent clauses joined with only a comma, which is not strong enough to do the job alone.",
          ],
        },
        {
          kind: "example",
          title: "Spotting the error",
          steps: [
            {
              note: "Read the sentence and find where one complete thought ends and the next begins.",
              work: [
                "Incorrect: \"The shift ended the nurse went home.\"",
                "Clause 1: \"The shift ended.\"",
                "Clause 2: \"The nurse went home.\"",
              ],
              becomes: "Two independent clauses",
            },
            {
              note: "Check what sits between them.",
              work: ["Nothing sits between them, not even a comma."],
              becomes: "Run-on",
            },
            {
              note: "Now try the same two clauses with only a comma.",
              work: ["\"The shift ended, the nurse went home.\""],
              becomes: "Comma splice: a comma alone cannot join them",
            },
          ],
          answer:
            "Both versions are errors. The first is a run-on (no punctuation); the second is a comma splice (a comma doing work it cannot do).",
        },
        {
          kind: "mistake",
          body: "A comma splice reads smoothly, which is exactly why it slips past. If you can put a period between the two halves and get two real sentences, a lone comma is wrong there.",
        },
      ],
      quickCheck: {
        prompt:
          "Which error is \"The monitor alarmed, the nurse checked the patient\"?",
        choices: [
          "A fragment",
          "A comma splice",
          "A run-on",
          "Nothing is wrong with it",
        ],
        answer: 1,
        explanation:
          "Two independent clauses are joined with only a comma, which is a comma splice. A run-on would have no punctuation between them at all.",
      },
    },
    {
      id: "fixing-the-join",
      title: "Joining clauses correctly",
      blocks: [
        {
          kind: "concept",
          body: "Once you have found two independent clauses that are joined badly, you have three standard repairs. All three are correct, so on a test the question is usually which choice applies one of them properly.",
        },
        {
          kind: "rule",
          title: "Three ways to fix the join",
          intro: "Given two independent clauses, use any one of these:",
          items: [
            "A period: \"The shift ended. The nurse went home.\"",
            "A semicolon: \"The shift ended; the nurse went home.\"",
            "A comma plus a conjunction: \"The shift ended, so the nurse went home.\"",
          ],
        },
        {
          kind: "example",
          title: "Repairing a run-on",
          steps: [
            {
              note: "Start with the broken sentence and split it at the seam.",
              work: [
                "\"The shift ended the nurse went home.\"",
                "\"The shift ended\" + \"the nurse went home\"",
              ],
              becomes: "Two independent clauses to join",
            },
            {
              note: "The two ideas are closely related, so a semicolon links them without a conjunction.",
              work: ["Correct: \"The shift ended; the nurse went home.\""],
              becomes: "A full sentence sits on each side of the semicolon",
            },
          ],
          answer:
            "\"The shift ended; the nurse went home.\" A period or a comma plus a conjunction would fix it just as correctly.",
        },
        {
          kind: "tip",
          body: "When two independent clauses are closely related, a semicolon links them cleanly without a conjunction. Before you use one, check that a full sentence sits on each side of it.",
        },
        {
          kind: "mistake",
          body: "A semicolon is not a fancy comma. \"The nurse went home; after the long shift\" fails, because the words after the semicolon are a fragment rather than a complete sentence.",
        },
      ],
      quickCheck: {
        prompt:
          "Which choice correctly fixes \"The alarm sounded the team responded\"?",
        choices: [
          "The alarm sounded, the team responded",
          "The alarm sounded; the team responded",
          "The alarm sounded; because the team responded",
          "The alarm sounded the team responded, quickly",
        ],
        answer: 1,
        explanation:
          "A semicolon joins two independent clauses, and a full sentence sits on each side. The comma alone is a splice, and the third choice puts a fragment after the semicolon.",
      },
    },
  ],
};
