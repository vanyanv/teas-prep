import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for ENGLISH / conventions / "Using Commas with Nonessential
 * Clauses". Content carried over from the flat skill-lesson blocks,
 * restructured into the concept / rule / example / mistake / quick check
 * pattern. Quick checks are informal and never touch mastery.
 */
export const USING_COMMAS_WITH_NONESSENTIAL_CLAUSES: GuidedLesson = {
  section: "ENGLISH",
  topic: "conventions",
  skill: "Using Commas with Nonessential Clauses",
  slug: "using-commas-with-nonessential-clauses",
  title: "Commas with Nonessential Clauses",
  summary:
    "Surround nonessential information with commas; do not set off information the sentence needs to identify its subject.",
  minutes: [8, 10],
  objectives: [
    "Distinguish a nonessential clause from an essential one",
    "Place commas on both sides of a nonessential clause",
    "Leave an essential clause unpunctuated",
    "Use which and that as signals of which kind you have",
    "Apply the removal test to decide a sentence",
  ],
  sections: [
    {
      id: "essential-vs-nonessential",
      title: "The two kinds of clause",
      blocks: [
        {
          kind: "concept",
          body: "Some clauses add extra detail about something the sentence has already identified. Others do the identifying themselves. The commas tell your reader which job the clause is doing.\n\nA nonessential clause adds detail you could drop. The sentence would still point to the same specific person or thing without it, so you set it off with commas.\n\nAn essential clause narrows the meaning. It answers the question \"which one?\" and the sentence cannot identify its subject without it, so it takes no commas.",
        },
        {
          kind: "rule",
          title: "The rule",
          items: [
            "A nonessential clause can be removed without changing the basic meaning, so set it off with commas.",
            "An essential clause limits the meaning and is needed, so use no commas.",
          ],
        },
        {
          kind: "tip",
          body: "The commas are a pair. If a nonessential clause sits in the middle of a sentence, it needs a comma on both sides, not just one.",
        },
      ],
      quickCheck: {
        prompt: "What does a pair of commas around a clause tell the reader?",
        choices: [
          "The clause identifies which person or thing is meant",
          "The clause is extra detail and could be removed",
          "The clause is the most important part of the sentence",
          "The clause begins a new independent thought",
        ],
        answer: 1,
        explanation:
          "Commas mark a clause as nonessential, meaning the sentence already identifies its subject and the clause only adds detail. A clause that does the identifying takes no commas.",
      },
    },
    {
      id: "which-and-that",
      title: "Which and that",
      blocks: [
        {
          kind: "concept",
          body: "The word that introduces a clause is a useful first signal, though you should still confirm it with the meaning of the sentence.",
        },
        {
          kind: "rule",
          title: "Signal words",
          items: [
            "The word which usually signals nonessential detail, so expect commas.",
            "The word that usually signals essential detail, so expect no commas.",
          ],
        },
        {
          kind: "example",
          title: "The same subject, two different clauses",
          steps: [
            {
              note: "Start with which, introducing detail you could drop.",
              work: [
                "\"The east wing, which opened in March, houses the lab.\"",
                "The east wing is already identified by name.",
              ],
              becomes: "Nonessential: commas on both sides",
            },
            {
              note: "Now use that, which narrows the meaning to one wing.",
              work: [
                "\"The wing that opened in March houses the lab.\"",
                "Without the clause you do not know which wing.",
              ],
              becomes: "Essential: no commas",
            },
          ],
          answer:
            "Which takes commas because the detail is extra; that takes none because the detail identifies.",
        },
        {
          kind: "mistake",
          body: "Do not treat the signal words as a guarantee. Writers sometimes use which for an essential clause, so read the sentence without the clause before you commit to the commas.",
        },
      ],
      quickCheck: {
        prompt:
          "A clause begins with the word that. What punctuation should you expect?",
        choices: [
          "Commas on both sides",
          "A comma before it only",
          "No commas, because that usually signals essential detail",
          "A semicolon before it",
        ],
        answer: 2,
        explanation:
          "That usually introduces a clause the sentence needs in order to identify its subject, and essential clauses take no commas.",
      },
    },
    {
      id: "worked-examples",
      title: "Correct and incorrect",
      blocks: [
        {
          kind: "concept",
          body: "Compare two sentences that look alike. The difference is whether the sentence can identify its subject on its own.",
        },
        {
          kind: "example",
          title: "Do these commas belong?",
          steps: [
            {
              note: "The subject is named, so the clause is only extra detail.",
              work: [
                "\"Dr. Lee, who trained in Boston, leads the unit.\"",
                "Dr. Lee is identified by name already.",
              ],
              becomes: "Correct: nonessential, so the commas belong",
            },
            {
              note: "Now picture a unit with several nurses on shift. The subject is not identified without the clause.",
              work: [
                "\"The nurse, who charted the vitals, must sign the form.\"",
                "With several nurses on shift, the nurse alone does not say which one.",
              ],
              becomes: "Incorrect here: the clause is doing identifying work, so remove the commas",
            },
            {
              note: "Fix the second sentence by dropping both commas.",
              work: ["\"The nurse who charted the vitals must sign the form.\""],
              becomes: "Correct: essential, no commas",
            },
          ],
          answer:
            "A named subject like Dr. Lee takes commas around the clause; an unidentified subject like the nurse takes none.",
        },
        {
          kind: "mistake",
          body: "Adding commas around a clause you actually need changes the meaning. \"The nurse, who charted the vitals, must sign the form\" implies there is only one nurse and the charting is just a side note. Which is why essential and nonessential depend on the situation, not on the words alone: if only one nurse is on shift, that same sentence is correct. Ask what the reader already knows.",
        },
      ],
      quickCheck: {
        prompt:
          "Several nurses are on shift. Why are the commas wrong in \"The nurse, who charted the vitals, must sign the form\"?",
        choices: [
          "The clause is needed to identify which nurse is meant",
          "A clause may never be placed in the middle of a sentence",
          "The clause should begin with that instead of who",
          "Only one comma is needed, not two",
        ],
        answer: 0,
        explanation:
          "Without the clause, the nurse does not point to any specific person, so the clause is essential and takes no commas.",
      },
    },
    {
      id: "removal-test",
      title: "The removal test",
      blocks: [
        {
          kind: "concept",
          body: "When the signal word does not settle it, test the sentence directly. Read it without the clause and see whether you still know who or what is meant.",
        },
        {
          kind: "rule",
          title: "How to test a clause",
          ordered: true,
          items: [
            "Cover the clause and read the sentence without it",
            "Ask whether it still points to the same specific person or thing",
            "If yes, the clause is nonessential: put commas on both sides",
            "If no, the clause is essential: use no commas",
          ],
        },
        {
          kind: "example",
          title: "Running the test",
          steps: [
            {
              note: "Cover the clause in the first sentence and read what is left.",
              work: [
                "\"Dr. Lee leads the unit.\"",
                "Still the same person, so nothing was lost.",
              ],
              becomes: "Nonessential: commas needed",
            },
            {
              note: "Do the same with the second sentence.",
              work: [
                "\"The nurse must sign the form.\"",
                "Which nurse? The sentence no longer says.",
              ],
              becomes: "Essential: no commas",
            },
          ],
          answer:
            "If removing the clause leaves the meaning intact, use commas. If it leaves you asking which one, do not.",
        },
        {
          kind: "tip",
          body: "Proper names are usually already specific, so a clause describing a named person is often nonessential. A general noun like the nurse or the wing usually needs the clause to identify it.",
        },
      ],
      quickCheck: {
        prompt:
          "You remove a clause and the sentence still points to the same specific person. What does that tell you?",
        choices: [
          "The clause is essential and takes no commas",
          "The clause is nonessential and needs commas on both sides",
          "The clause should be deleted from the sentence",
          "The clause must be rewritten to begin with that",
        ],
        answer: 1,
        explanation:
          "Surviving removal with the meaning intact is the definition of a nonessential clause, and nonessential clauses are set off with commas.",
      },
    },
  ],
};
