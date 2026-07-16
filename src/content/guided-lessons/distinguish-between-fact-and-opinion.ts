import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for READING / craft-structure / "Distinguish Between Fact and
 * Opinion". Content carried over from the flat skill-lesson blocks,
 * restructured into the concept / rule / example / mistake / quick check
 * pattern. Quick checks are informal and never touch mastery.
 */
export const DISTINGUISH_FACT_AND_OPINION: GuidedLesson = {
  section: "READING",
  topic: "craft-structure",
  skill: "Distinguish Between Fact and Opinion",
  slug: "distinguish-between-fact-and-opinion",
  title: "Fact and Opinion",
  summary:
    "A fact can be proven or checked, while an opinion expresses a belief, judgment, or feeling.",
  minutes: [8, 10],
  objectives: [
    "Define what makes a statement a fact or an opinion",
    "Apply the verifiability test to a single sentence",
    "Recognize opinion signal words such as best, should, and probably",
    "Label individual sentences in a passage that mixes both",
  ],
  sections: [
    {
      id: "what-it-is",
      title: "What counts as each",
      blocks: [
        {
          kind: "concept",
          body: "A fact is a statement that can be verified with evidence, measurement, or a reliable source. You could look it up, count it, or check a record, and everyone checking would land on the same answer.\n\nAn opinion states what someone thinks, feels, or values. It cannot be proven true for everyone, because it depends on the person holding it.",
        },
        {
          kind: "rule",
          title: "The verifiability test",
          intro: "Ask one question of the sentence:",
          items: [
            "Could I check this against evidence, a measurement, or a record? If yes, it is a fact.",
            "Does this report a belief, judgment, taste, or feeling? If yes, it is an opinion.",
          ],
        },
        {
          kind: "mistake",
          body: "A fact does not have to be true. \"The clinic has forty beds\" is a factual statement even if the real number is thirty. It is a fact because it can be checked, not because it is correct.",
        },
      ],
      quickCheck: {
        prompt:
          "What makes a statement a fact rather than an opinion?",
        choices: [
          "It is true",
          "It can be verified with evidence or a reliable source",
          "Most people agree with it",
          "It contains no descriptive words",
        ],
        answer: 1,
        explanation:
          "A fact is defined by whether it can be checked, not by whether it is true or popular. A checkable statement that turns out to be wrong is still a fact-type statement.",
      },
    },
    {
      id: "how-tested",
      title: "How the TEAS tests it",
      blocks: [
        {
          kind: "concept",
          body: "You will be given several sentences and asked which one is a fact, or which one is an opinion. Sometimes one passage mixes both and you must label a specific sentence.\n\nBecause the question points at one sentence, judge that sentence on its own. The rest of the passage does not change what it is.",
        },
        {
          kind: "rule",
          title: "How to work the question",
          ordered: true,
          items: [
            "Read only the sentence the question names",
            "Ask whether it could be checked against evidence",
            "Eliminate choices that fail that test",
          ],
        },
        {
          kind: "tip",
          body: "A passage written by an expert, or one that sounds authoritative, still contains opinions. Who is speaking does not decide the label; verifiability does.",
        },
      ],
      quickCheck: {
        prompt:
          "A question asks you to label one sentence in a passage that mixes facts and opinions. What should you judge it against?",
        choices: [
          "The overall tone of the passage",
          "Whether the author is qualified to say it",
          "Whether that sentence alone could be verified",
          "Whether the surrounding sentences are facts",
        ],
        answer: 2,
        explanation:
          "Each sentence is labeled on its own. A passage can hold both kinds, so the surrounding sentences and the author's authority tell you nothing about the one you were asked about.",
      },
    },
    {
      id: "worked-example",
      title: "Sorting two sentences",
      blocks: [
        {
          kind: "concept",
          body: "The two sentences below describe the same night shift. Only one of them can be checked.",
        },
        {
          kind: "example",
          title: "Fact or opinion?",
          steps: [
            {
              note: "Take the first sentence and ask whether it can be checked.",
              work: [
                "\"The night shift at the clinic runs from 7 p.m. to 7 a.m.\"",
                "The schedule is posted, so this can be verified.",
              ],
              becomes: "Fact",
            },
            {
              note: "Now the second sentence. There is no record you could consult.",
              work: [
                "\"The night shift is the hardest shift to work.\"",
                "Hardest is a judgment, and it varies by person.",
              ],
              becomes: "Opinion",
            },
          ],
          answer:
            "The first is a fact (checkable against the schedule); the second is an opinion (a judgment).",
        },
        {
          kind: "tip",
          body: "Try asking who could disagree. Nobody can reasonably disagree about the posted hours, but plenty of people could disagree about which shift is hardest.",
        },
      ],
      quickCheck: {
        prompt: "Which of these sentences is a fact?",
        choices: [
          "The waiting room is far too small",
          "Patients should arrive fifteen minutes early",
          "The clinic closes at 6 p.m. on Fridays",
          "The new scheduling system is a big improvement",
        ],
        answer: 2,
        explanation:
          "The closing time can be checked against the clinic's posted hours. Too small, should, and improvement all express judgments that no record can settle.",
      },
    },
    {
      id: "signal-words",
      title: "Signal words",
      blocks: [
        {
          kind: "concept",
          body: "Certain words tend to mark an opinion because they carry judgment or uncertainty. They are a useful first scan, not a substitute for the verifiability test.",
        },
        {
          kind: "rule",
          title: "Opinion signal words",
          items: [
            "Judgments: best, worst, beautiful, easy, terrible",
            "Recommendations: should, ought to, must",
            "Hedges: probably, seems, likely",
          ],
        },
        {
          kind: "rule",
          title: "Fact signals",
          intro: "Facts often include something you could look up:",
          items: [
            "Numbers and measurements",
            "Dates and times",
            "Names, records, and documented events",
          ],
        },
        {
          kind: "example",
          title: "The signal word decides it",
          steps: [
            {
              note: "Start with a plain measurement.",
              work: ["\"The shift lasts twelve hours.\""],
              becomes: "Fact: a measurement you could check",
            },
            {
              note: "Add a judgment word and the same subject becomes an opinion.",
              work: ["\"Twelve hours is too long for one shift.\""],
              becomes: "Opinion: too long is a judgment",
            },
          ],
          answer:
            "The topic did not change; the judgment word did the work.",
        },
        {
          kind: "mistake",
          body: "Numbers do not guarantee a fact. \"Twelve hours is too long for one shift\" contains a number and is still an opinion. Check the whole claim, not just whether a figure appears.",
        },
      ],
      quickCheck: {
        prompt:
          "Which word most clearly signals that a sentence is an opinion?",
        choices: ["Twelve", "Should", "Friday", "Clinic"],
        answer: 1,
        explanation:
          "Should makes a recommendation, which no record can verify. Numbers, dates, and names point toward checkable content instead.",
      },
    },
  ],
};
