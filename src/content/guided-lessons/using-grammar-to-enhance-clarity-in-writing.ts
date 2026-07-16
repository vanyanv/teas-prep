import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for ENGLISH / knowledge-language / "Using Grammar to Enhance
 * Clarity in Writing". Content carried over from the flat skill-lesson blocks,
 * restructured into the concept / rule / example / mistake / quick check
 * pattern. Quick checks are informal and never touch mastery.
 */
export const GRAMMAR_CLARITY_IN_WRITING: GuidedLesson = {
  section: "ENGLISH",
  topic: "knowledge-language",
  skill: "Using Grammar to Enhance Clarity in Writing",
  slug: "using-grammar-to-enhance-clarity-in-writing",
  title: "Grammar and Clarity",
  summary:
    "Clear grammar, word choice, and sentence structure make writing precise and easy to understand.",
  minutes: [8, 10],
  objectives: [
    "Identify the four grammar choices that drive clarity",
    "Choose the clearest version of a sentence on a TEAS item",
    "Spot and repair dangling or misplaced modifiers",
    "Apply the actor test to sentences with vague pronouns",
  ],
  sections: [
    {
      id: "what-it-is",
      title: "What drives clarity",
      blocks: [
        {
          kind: "concept",
          body: "Grammar choices shape clarity. Two sentences can carry the same information, and one of them still leaves the reader guessing about who did what.\n\nStrong writing is not decorated writing. It is writing where each word does a job and nothing has to be reread.",
        },
        {
          kind: "rule",
          title: "Strong writing uses",
          items: [
            "Precise, concrete word choice over vague terms",
            "Clear pronoun references, so readers know who or what is meant",
            "Correctly placed modifiers and parallel structure",
            "Concise wording that cuts needless repetition",
          ],
        },
        {
          kind: "tip",
          body: "These four pull in the same direction. A sentence that names its actor plainly usually fixes the vague pronoun and the wordiness at the same time.",
        },
      ],
      quickCheck: {
        prompt:
          "Which of these is a clarity problem rather than a strength?",
        choices: [
          "Naming exactly which staff member acted",
          "Leaving a pronoun that could point to two people",
          "Placing a modifier next to the word it describes",
          "Cutting a phrase that repeats the previous one",
        ],
        answer: 1,
        explanation:
          "A pronoun with two possible referents forces the reader to guess. The other three are the habits that make writing precise.",
      },
    },
    {
      id: "how-tested",
      title: "How the TEAS tests it",
      blocks: [
        {
          kind: "concept",
          body: "You choose the clearest, most effective version of a sentence, or you fix a confusing one. All four choices are often grammatical, so you are not hunting for a broken rule. You are picking the version that reads cleanly the first time.\n\nWatch for vague pronouns, misplaced modifiers, wordiness, and shifts that muddy the meaning. The clearest, most precise option is usually correct.",
        },
        {
          kind: "rule",
          title: "How to work the question",
          ordered: true,
          items: [
            "Read each choice and ask what it actually says",
            "Eliminate any choice that leaves a pronoun or an actor unclear",
            "Eliminate padding that adds words without adding meaning",
            "Keep the choice a reader could understand in one pass",
          ],
        },
        {
          kind: "mistake",
          body: "Do not assume the longest choice is the most careful, or that the shortest is automatically the clearest. Length is not the test. A short sentence that hides its actor is worse than a slightly longer one that names it.",
        },
      ],
      quickCheck: {
        prompt:
          "On a clarity item, all four sentence choices are grammatically correct. What decides the answer?",
        choices: [
          "The choice with the fewest words",
          "The choice with the most formal vocabulary",
          "The choice whose meaning is clearest and most precise",
          "The choice that keeps the original wording",
        ],
        answer: 2,
        explanation:
          "When every option is grammatical, precision decides it. Word count, formality, and matching the original are not the standard.",
      },
    },
    {
      id: "modifiers",
      title: "Misplaced and dangling modifiers",
      blocks: [
        {
          kind: "concept",
          body: "A modifier describes something. Readers attach it to whatever sits closest to it, so an opening phrase gets attached to the subject that follows it.\n\nWhen that subject is not the thing doing the action, the phrase dangles, and the sentence claims something nobody meant.",
        },
        {
          kind: "example",
          title: "Repairing a dangling modifier",
          steps: [
            {
              note: "Start with the unclear sentence and read the opening phrase literally.",
              work: [
                "\"After charting the medications, the cart was left in the hall.\"",
                "The subject after the comma is the cart.",
              ],
              becomes: "The sentence says the cart did the charting.",
            },
            {
              note: "Ask who actually charted the medications, then make that person the subject.",
              work: ["The nurse charted the medications, not the cart."],
              becomes: "Put the nurse right after the comma.",
            },
            {
              note: "Rewrite so the opening phrase attaches to the real actor.",
              work: [
                "\"After charting the medications, the nurse left the cart in the hall.\"",
              ],
              becomes: "The modifier now describes the nurse.",
            },
          ],
          answer:
            "\"After charting the medications, the nurse left the cart in the hall.\"",
        },
        {
          kind: "mistake",
          body: "A dangler is fixed by naming the performer, not by shuffling the words. Either make the performer the subject right after the comma, or expand the opening phrase into a clause with a subject of its own (\"When the nurse walked into the room...\"). Both are correct; pick whichever keeps the sentence you want.",
        },
      ],
      quickCheck: {
        prompt:
          "Which sentence contains a dangling modifier?",
        choices: [
          "While reviewing the chart, the doctor noticed an error",
          "While reviewing the chart, an error was noticed",
          "The doctor noticed an error while reviewing the chart",
          "An error in the chart was noticed by the doctor",
        ],
        answer: 1,
        explanation:
          "The subject after the comma is an error, so the sentence claims the error reviewed the chart. The other versions all keep the doctor as the one doing the reviewing.",
      },
    },
    {
      id: "actor-test",
      title: "The actor test",
      blocks: [
        {
          kind: "concept",
          body: "One question catches most clarity errors. Read the sentence and ask who is doing what.\n\nIf the actor is missing, or a pronoun could point to more than one person, pick the version that names it directly. Naming the actor is almost never the wrong move on a clarity item.",
        },
        {
          kind: "rule",
          title: "Ask in this order",
          ordered: true,
          items: [
            "Who is doing the action in this sentence?",
            "Does every pronoun have exactly one thing it could refer to?",
            "If either answer is unclear, choose the option that says the name outright",
          ],
        },
        {
          kind: "example",
          title: "Clearing up a vague pronoun",
          steps: [
            {
              note: "Read the sentence and locate the pronoun.",
              work: [
                "\"The nurse told the patient that she needed to rest.\"",
                "The pronoun is she.",
              ],
              becomes: "Who is she: the nurse or the patient?",
            },
            {
              note: "Both people came before the pronoun, so either could be the referent. Replace it with the name.",
              work: [
                "\"The nurse told the patient that the patient needed to rest.\"",
              ],
              becomes: "One reading only, though it repeats a word.",
            },
            {
              note: "Tighten the wording without losing the named actor.",
              work: ["\"The nurse told the patient to rest.\""],
              becomes: "Clear and concise at once.",
            },
          ],
          answer:
            "\"The nurse told the patient to rest.\" Naming the actor removed the ambiguity, and the sentence got shorter as a result.",
        },
        {
          kind: "tip",
          body: "If you cannot answer who is doing what after one read, the sentence is not the answer, however polished it sounds.",
        },
      ],
      quickCheck: {
        prompt:
          "\"The supervisor met with the technician after she finished the report.\" Why is this unclear?",
        choices: [
          "The modifier is in the wrong place",
          "The pronoun she could refer to either person",
          "The sentence is too wordy",
          "The verb tense shifts partway through",
        ],
        answer: 1,
        explanation:
          "Both the supervisor and the technician come before she, so the reader cannot tell who finished the report. Naming the person directly fixes it.",
      },
    },
  ],
};
