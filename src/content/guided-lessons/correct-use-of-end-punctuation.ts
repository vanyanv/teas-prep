import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for ENGLISH / conventions / "Correct Use of End Punctuation".
 * Content carried over from the flat skill-lesson blocks, restructured into
 * the concept / rule / example / mistake / quick check pattern. Quick checks
 * are informal and never touch mastery.
 */
export const END_PUNCTUATION: GuidedLesson = {
  section: "ENGLISH",
  topic: "conventions",
  skill: "Correct Use of End Punctuation",
  slug: "correct-use-of-end-punctuation",
  title: "End Punctuation",
  summary:
    "End a sentence with a period, question mark, or exclamation point based on its purpose.",
  minutes: [8, 10],
  objectives: [
    "Match each end mark to the purpose of its sentence",
    "Choose the correct mark for statements, questions, and commands",
    "Use exclamation points sparingly in formal writing",
    "Recognize an indirect question and end it with a period",
  ],
  sections: [
    {
      id: "match-the-mark",
      title: "Match the mark to the purpose",
      blocks: [
        {
          kind: "concept",
          body: "Every sentence does one job: it states something, it asks something, or it expresses strong feeling. The end mark announces which job the sentence just did.\n\nSo the choice is never about how long or complicated the sentence is. Read what the sentence is doing, then pick the mark that matches.",
        },
        {
          kind: "rule",
          title: "The three end marks",
          intro: "Match the end mark to the type of sentence:",
          items: [
            "Period: a statement or a mild command.",
            "Question mark: a direct question.",
            "Exclamation point: strong emotion or urgency, used sparingly in formal writing.",
          ],
        },
        {
          kind: "tip",
          body: "Say the sentence in your head. A direct question rises at the end and expects an answer. A statement or a mild command settles rather than rises.",
        },
      ],
      quickCheck: {
        prompt: "Which end mark belongs after a mild command such as \"Record the vital signs\"?",
        choices: [
          "A question mark, because it asks someone to act",
          "A period",
          "An exclamation point, because commands are forceful",
          "Either a period or a question mark",
        ],
        answer: 1,
        explanation:
          "A mild command takes a period. Asking someone to act is not the same as asking a question, and a routine instruction carries no strong emotion.",
      },
    },
    {
      id: "choosing-in-context",
      title: "Choosing the mark in context",
      blocks: [
        {
          kind: "concept",
          body: "Test questions often put two short sentences side by side, one a question and one a command. Each sentence gets the mark its own purpose requires, so handle them one at a time.",
        },
        {
          kind: "example",
          title: "Punctuate each sentence for its own purpose",
          steps: [
            {
              note: "Take the first sentence and ask what it is doing.",
              work: [
                "\"Did you check the patient's blood pressure\"",
                "It asks directly and expects an answer.",
              ],
              becomes: "Did you check the patient's blood pressure?",
            },
            {
              note: "Now the second sentence. It tells someone to act.",
              work: [
                "\"Record it now\"",
                "A mild command, not a question.",
              ],
              becomes: "Record it now.",
            },
          ],
          answer:
            "Correct: Did you check the patient's blood pressure? Record it now.",
        },
        {
          kind: "mistake",
          body: "Do not swap the marks: \"Did you check the patient's blood pressure. Record it now?\" is incorrect. The first sentence asks and needs a question mark; the second commands and needs a period.",
        },
      ],
      quickCheck: {
        prompt:
          "How should this pair be punctuated? \"Is the chart updated ___ Bring it to me ___\"",
        choices: [
          "Is the chart updated. Bring it to me?",
          "Is the chart updated? Bring it to me.",
          "Is the chart updated? Bring it to me?",
          "Is the chart updated. Bring it to me.",
        ],
        answer: 1,
        explanation:
          "The first sentence is a direct question, so it takes a question mark. The second is a mild command, so it takes a period.",
      },
    },
    {
      id: "exclamation-restraint",
      title: "Exclamation points in formal writing",
      blocks: [
        {
          kind: "concept",
          body: "An exclamation point signals strong emotion or urgency. That makes it the rarest of the three marks in formal writing, where most sentences simply report or instruct.\n\nBefore using one, check that the sentence really carries urgency. If it only gives an instruction, a period is the correct mark.",
        },
        {
          kind: "rule",
          title: "Before you use an exclamation point",
          ordered: true,
          items: [
            "Ask whether the sentence expresses strong emotion or urgency",
            "If it only states or instructs, use a period instead",
            "In formal writing, reserve the mark for the rare sentence that earns it",
          ],
        },
        {
          kind: "mistake",
          body: "An instruction is not urgent just because it matters. \"Please sign the consent form!\" overstates a routine request; \"Please sign the consent form.\" is correct.",
        },
      ],
      quickCheck: {
        prompt:
          "In a formal clinical report, which sentence most likely warrants an exclamation point?",
        choices: [
          "The patient's chart was updated at noon",
          "Please review the medication list",
          "Stop the infusion immediately",
          "The appointment is scheduled for Friday",
        ],
        answer: 2,
        explanation:
          "Stopping an infusion immediately carries genuine urgency. The others state facts or make routine requests, so each takes a period.",
      },
    },
    {
      id: "indirect-questions",
      title: "Indirect questions",
      blocks: [
        {
          kind: "concept",
          body: "A direct question asks the reader something and expects an answer. An indirect question only reports that a question was asked, which makes the sentence a statement.\n\nBecause an indirect question is a statement, it ends with a period, not a question mark.",
        },
        {
          kind: "example",
          title: "Direct or indirect?",
          steps: [
            {
              note: "This sentence asks the reader directly, so it expects an answer.",
              work: ["\"Are the results ready?\""],
              becomes: "Direct question: question mark",
            },
            {
              note: "This sentence reports that someone else asked. It states a fact about her.",
              work: ["\"She asked whether the results were ready.\""],
              becomes: "Indirect question: period",
            },
          ],
          answer:
            "Write \"She asked whether the results were ready.\" not \"She asked whether the results were ready?\"",
        },
        {
          kind: "tip",
          body: "Words like asked, wondered, and whether often introduce a report of a question rather than a question itself. Check whether the sentence expects an answer from the reader.",
        },
        {
          kind: "mistake",
          body: "Do not let the word \"asked\" pull a question mark onto the sentence. \"He asked when the shift ended?\" is incorrect; the sentence tells you what he did, so it ends with a period.",
        },
      ],
      quickCheck: {
        prompt: "Which sentence is punctuated correctly?",
        choices: [
          "The nurse wondered whether the lab had called?",
          "The nurse wondered whether the lab had called.",
          "Whether the lab had called?",
          "The nurse wondered whether the lab had called!",
        ],
        answer: 1,
        explanation:
          "The sentence reports that the nurse wondered something; it does not ask the reader anything. An indirect question is a statement and takes a period.",
      },
    },
  ],
};
