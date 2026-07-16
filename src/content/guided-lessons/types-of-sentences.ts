import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for ENGLISH / conventions / "Types of Sentences". Content
 * carried over from the flat skill-lesson blocks, restructured into the
 * concept / rule / example / mistake / quick check pattern. Quick checks are
 * informal and never touch mastery.
 */
export const TYPES_OF_SENTENCES: GuidedLesson = {
  section: "ENGLISH",
  topic: "conventions",
  skill: "Types of Sentences",
  slug: "types-of-sentences",
  title: "Types of Sentences",
  summary:
    "Sentences are classified by purpose as declarative, interrogative, imperative, or exclamatory.",
  minutes: [8, 10],
  objectives: [
    "Name the four sentence types and the purpose each one serves",
    "Match a sentence to the end mark its purpose calls for",
    "Identify an imperative sentence by its unstated subject of you",
    "Label a sentence's type when the wording and the end mark disagree",
  ],
  sections: [
    {
      id: "purpose-and-types",
      title: "Classify by purpose",
      blocks: [
        {
          kind: "concept",
          body: "A sentence is not classified by how long it is or how it is built. It is classified by what it does: whether it tells, asks, directs, or exclaims.\n\nOnce you know the purpose, the end mark follows from it. So the two questions to ask are always the same: what is this sentence doing, and what mark does that job take?",
        },
        {
          kind: "rule",
          title: "The four types",
          intro: "Identify a sentence by what it does and the end mark it takes:",
          items: [
            "Declarative sentences make a statement and end with a period.",
            "Interrogative sentences ask a question and end with a question mark.",
            "Imperative sentences give a command or request and usually end with a period.",
            "Exclamatory sentences express strong feeling and end with an exclamation point.",
          ],
        },
        {
          kind: "tip",
          body: "Try naming the job in one word before you look at the punctuation: tells, asks, commands, exclaims. Deciding the purpose first keeps a stray end mark from steering you.",
        },
      ],
      quickCheck: {
        prompt: "What determines which type a sentence is?",
        choices: [
          "Its length",
          "What it does: tells, asks, commands, or exclaims",
          "Whether its subject is stated",
          "How many clauses it contains",
        ],
        answer: 1,
        explanation:
          "The four types are defined by purpose. Length, clause count, and whether the subject appears do not change what job the sentence is doing.",
      },
    },
    {
      id: "end-marks",
      title: "Matching the end mark",
      blocks: [
        {
          kind: "concept",
          body: "The end mark has to agree with the purpose. When it does not, the sentence is punctuated incorrectly, and that is exactly what these questions test.",
        },
        {
          kind: "example",
          title: "Correct and incorrect",
          steps: [
            {
              note: "Start with a sentence that gives a direction. A command takes a period.",
              work: ["\"Take a deep breath.\""],
              becomes: "Correct: imperative with a period",
            },
            {
              note: "Now a sentence that asks for information. A question takes a question mark.",
              work: ["\"Are you in pain?\""],
              becomes: "Correct: interrogative with a question mark",
            },
            {
              note: "Put a question mark on the command and the mark no longer matches the job.",
              work: [
                "\"Take a deep breath?\"",
                "The sentence still gives a direction, so it is still imperative.",
              ],
              becomes: "Incorrect: a command marked as a question",
            },
          ],
          answer:
            "\"Take a deep breath.\" and \"Are you in pain?\" are correct; \"Take a deep breath?\" mismatches an imperative with a question mark.",
        },
        {
          kind: "mistake",
          body: "Do not let the end mark decide the type for you. \"Take a deep breath?\" carries a question mark, but the sentence is still a command, which is why the punctuation is wrong. The purpose sets the mark, not the other way around.",
        },
      ],
      quickCheck: {
        prompt: "Why is \"Take a deep breath?\" punctuated incorrectly?",
        choices: [
          "It is missing its subject",
          "It is a command, so it should end with a period",
          "It is a question, so it should end with a period",
          "Commands must end with an exclamation point",
        ],
        answer: 1,
        explanation:
          "The sentence gives a direction, which makes it imperative, and imperative sentences usually end with a period. The question mark contradicts the sentence's purpose.",
      },
    },
    {
      id: "imperative-you",
      title: "Imperatives and the unstated you",
      blocks: [
        {
          kind: "concept",
          body: "An imperative sentence often has an unstated subject of you. \"Check the chart\" means \"You check the chart,\" so it is still a complete sentence.\n\nThat is worth knowing because a command can look too short to count. The subject is understood rather than missing.",
        },
        {
          kind: "rule",
          title: "Spotting an imperative",
          ordered: true,
          items: [
            "Ask whether the sentence is directing someone to do something",
            "Try adding you in front of the verb and see if it still makes sense",
            "If it does, the subject is the understood you and the sentence is imperative",
          ],
        },
        {
          kind: "mistake",
          body: "Do not call a command a fragment just because no subject appears. \"Check the chart\" has a subject; it simply is not written out.",
        },
      ],
      quickCheck: {
        prompt: "What is the subject of the sentence \"Check the chart\"?",
        choices: [
          "Chart",
          "It has no subject, so it is a fragment",
          "An unstated you",
          "Check",
        ],
        answer: 2,
        explanation:
          "Imperative sentences carry an understood subject of you, so \"Check the chart\" means \"You check the chart.\" That makes it a complete sentence, not a fragment.",
      },
    },
    {
      id: "telling-them-apart",
      title: "Telling the types apart",
      blocks: [
        {
          kind: "concept",
          body: "Two pairs cause most of the trouble. A request can sound polite enough to seem like a question, and a statement said with feeling can look exclamatory. In both cases, name the job the sentence is doing and let that settle it.",
        },
        {
          kind: "example",
          title: "Naming the type",
          steps: [
            {
              note: "Ask what the sentence does before you look at the mark.",
              work: [
                "\"Please sign the consent form.\"",
                "It requests an action, and you can add the understood you.",
              ],
              becomes: "Imperative, so it takes a period",
            },
            {
              note: "This one asks for information rather than requesting an action.",
              work: ["\"Did you sign the consent form?\""],
              becomes: "Interrogative, so it takes a question mark",
            },
            {
              note: "This one reports information with no strong feeling and no request.",
              work: ["\"The consent form is on the counter.\""],
              becomes: "Declarative, so it takes a period",
            },
            {
              note: "This one expresses strong feeling.",
              work: ["\"What a relief that is!\""],
              becomes: "Exclamatory, so it takes an exclamation point",
            },
          ],
          answer:
            "Purpose decides the label in every case: request, question, statement, strong feeling.",
        },
        {
          kind: "tip",
          body: "Please does not turn a request into a question. \"Please sign the consent form\" still directs someone to act, so it stays imperative and ends with a period.",
        },
      ],
      quickCheck: {
        prompt: "Which sentence is imperative?",
        choices: [
          "The nurse checked your blood pressure.",
          "Please wait in the exam room.",
          "How long have you felt dizzy?",
          "What a long wait that was!",
        ],
        answer: 1,
        explanation:
          "\"Please wait in the exam room\" requests an action and carries the understood subject you. The others make a statement, ask a question, and express strong feeling.",
      },
    },
  ],
};
