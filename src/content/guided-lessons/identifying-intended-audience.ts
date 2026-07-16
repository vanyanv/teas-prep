import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for ENGLISH / knowledge-language / "Identifying Intended
 * Audience". Content carried over from the flat skill-lesson blocks,
 * restructured into the concept / rule / example / mistake / quick check
 * pattern. Quick checks are informal and never touch mastery.
 */
export const IDENTIFYING_INTENDED_AUDIENCE: GuidedLesson = {
  section: "ENGLISH",
  topic: "knowledge-language",
  skill: "Identifying Intended Audience",
  slug: "identifying-intended-audience",
  title: "Intended Audience",
  summary:
    "The intended audience is the specific group a writer expects to read the text.",
  minutes: [8, 10],
  objectives: [
    "Define intended audience and name the features that reveal it",
    "Use vocabulary and assumed knowledge to place a passage's reader",
    "Choose the most likely audience from a set of options",
    "Avoid judging audience by topic alone",
  ],
  sections: [
    {
      id: "what-it-is",
      title: "What intended audience means",
      blocks: [
        {
          kind: "concept",
          body: "The intended audience is who the writing is meant for. A writer makes choices with a particular reader in mind, and those choices stay on the page for you to read backward.\n\nWord choice, detail level, and tone all reveal it. A piece for experts uses specialized terms, while a piece for the general public explains those terms or avoids them.",
        },
        {
          kind: "rule",
          title: "What gives the audience away",
          intro: "Three features carry the signal:",
          items: [
            "Word choice: specialized terms versus everyday words",
            "Detail level: how much the writer assumes you already know",
            "Tone: formal and clinical versus plain and reassuring",
          ],
        },
        {
          kind: "tip",
          body: "Notice what the writer does not explain. Anything left undefined is something the writer expects this reader to already know.",
        },
      ],
      quickCheck: {
        prompt: "What is the intended audience of a text?",
        choices: [
          "Everyone who happens to read it",
          "The specific group the writer expects to read it",
          "The person or group the text is about",
          "The publication that printed it",
        ],
        answer: 1,
        explanation:
          "The intended audience is the reader the writer had in mind, which is not the same as the text's subject or its actual readers.",
      },
    },
    {
      id: "how-tested",
      title: "How the TEAS tests it",
      blocks: [
        {
          kind: "concept",
          body: "You read a passage and choose the most likely audience, such as children, patients, or medical professionals.\n\nLook at vocabulary and assumed knowledge. Heavy jargon signals a specialist audience; simple, defined terms signal a general or beginner audience.",
        },
        {
          kind: "rule",
          title: "How to work the question",
          ordered: true,
          items: [
            "Scan the passage for its hardest words",
            "Ask whether those words are used bare or explained",
            "Match that language level to the choice whose readers would need this information",
          ],
        },
        {
          kind: "mistake",
          body: "Do not pick the audience from the topic alone. A passage about blood pressure could be written for patients or for clinicians. The language level decides it, not the subject.",
        },
      ],
      quickCheck: {
        prompt:
          "A passage uses terms like systolic and hypertension with no explanation. What does that suggest?",
        choices: [
          "The audience is children",
          "The audience is the general public",
          "The audience already knows medical terms",
          "The audience cannot be determined",
        ],
        answer: 2,
        explanation:
          "Bare jargon means the writer assumed the reader already understands it, which points to a specialist audience.",
      },
    },
    {
      id: "worked-example",
      title: "Reading a passage's audience",
      blocks: [
        {
          kind: "concept",
          body: "The sentence below is one line of a health handout. Work it the way the test asks: language level first, then the reader.",
        },
        {
          kind: "example",
          title: "Who is this written for?",
          steps: [
            {
              note: "Read the sentence and note its hardest language.",
              work: [
                "\"This handout explains, in plain words, what your blood pressure numbers mean and when to call your doctor.\"",
                "No specialized terms appear, and plain words is stated outright.",
              ],
              becomes: "Language level: general, not specialist",
            },
            {
              note: "Ask what the writer assumes the reader knows.",
              work: [
                "The reader is told what the numbers mean, so that knowledge is not assumed.",
                "The reader is told when to call a doctor, so the reader is not the doctor.",
              ],
              becomes: "Assumed knowledge: little to none",
            },
            {
              note: "Match the language and the framing to a reader.",
              work: [
                "Plain wording plus caregiving framing (your numbers, your doctor).",
              ],
              becomes: "Audience: patients",
            },
          ],
          answer:
            "The plain wording and caregiving framing show the audience is patients, not clinicians.",
        },
      ],
      quickCheck: {
        prompt:
          "In the handout sentence, which detail most clearly rules out clinicians as the audience?",
        choices: [
          "It mentions blood pressure",
          "It is called a handout",
          "It tells the reader when to call a doctor",
          "It uses the word numbers",
        ],
        answer: 2,
        explanation:
          "A clinician would not be advised when to call a doctor. That instruction places the reader on the patient side of the exchange.",
      },
    },
    {
      id: "quick-approach",
      title: "A quick way in",
      blocks: [
        {
          kind: "concept",
          body: "When the choices all seem possible, one question usually settles it: who would need this information and already understand the words used?\n\nThe level of the language points straight to the reader. If the words are defined for you, you are the audience; if they are not, someone who already knows them is.",
        },
        {
          kind: "rule",
          title: "Two questions, in order",
          ordered: true,
          items: [
            "Who needs this information?",
            "Who already understands the words used to give it?",
          ],
        },
        {
          kind: "tip",
          body: "Read the choices as language levels rather than as job titles. Children, patients, and medical professionals mostly differ in how much explaining they need.",
        },
      ],
      quickCheck: {
        prompt:
          "A passage defines every technical term the moment it appears. Who is it most likely written for?",
        choices: [
          "Specialists in the field",
          "Readers new to the subject",
          "Other writers",
          "Readers who dislike the subject",
        ],
        answer: 1,
        explanation:
          "Defining terms as they appear means the writer does not assume that knowledge, which fits a general or beginner reader.",
      },
    },
  ],
};
