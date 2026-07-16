import type { GuidedLesson } from "../guided-lesson-types";

/** Guided lesson for READING / craft-structure / "Evaluate the Author's
 *  Purpose in a Given Text". Content carried over from the flat skill-lesson
 *  blocks, restructured into the concept / rule / example / mistake / quick
 *  check pattern. */
export const EVALUATE_AUTHORS_PURPOSE: GuidedLesson = {
  section: "READING",
  topic: "craft-structure",
  skill: "Evaluate the Author's Purpose in a Given Text",
  slug: "evaluate-the-author-s-purpose-in-a-given-text",
  title: "Evaluating the Author's Purpose",
  summary:
    "The author's purpose is the main reason a text was written: usually to inform, persuade, or entertain.",
  minutes: [5, 7],
  objectives: [
    "Identify whether a text is written to inform, persuade, or entertain",
    "Recognize how TEAS answer choices pair a verb with a topic",
    "Use calls to action to spot persuasive writing",
    "Check that both the verb and the topic of a choice fit the passage",
  ],
  sections: [
    {
      id: "three-purposes",
      title: "The three purposes",
      blocks: [
        {
          kind: "concept",
          body: "Every text has a goal. The author's purpose is the main reason the text was written, and on the TEAS it usually falls into one of three categories.",
        },
        {
          kind: "rule",
          title: "The three main purposes",
          items: [
            "Inform: the writing explains or teaches, like a chart or a how-to guide",
            "Persuade: the writing tries to change your mind or get you to act, like a flyer or an ad",
            "Entertain: the writing tells a story or amuses the reader",
          ],
        },
        {
          kind: "mistake",
          body: "Do not confuse the topic with the purpose. Two texts can cover the same topic, such as the flu, yet be written for different reasons; purpose is about why the text exists, not what it is about.",
        },
      ],
      quickCheck: {
        prompt:
          "An article explains, step by step, how to wash your hands correctly. What is the author's purpose?",
        choices: [
          "To persuade readers to buy a particular soap",
          "To inform readers about proper hand washing",
          "To entertain readers with a story about a nurse",
          "To express the author's dislike of germs",
        ],
        answer: 1,
        explanation:
          "The article explains and teaches a process, which is informational writing. Nothing in it asks you to buy, believe, or act.",
      },
    },
    {
      id: "how-teas-tests",
      title: "How the TEAS tests it",
      blocks: [
        {
          kind: "concept",
          body: "You read a short passage and choose why the author wrote it. Answer choices often pair a verb with the topic, such as to inform readers about hand washing.",
        },
        {
          kind: "tip",
          body: "Check both halves of each answer choice. The verb (inform, persuade, entertain) and the topic must each match the passage; a choice can name the right topic with the wrong verb, and it is still wrong.",
        },
      ],
      quickCheck: {
        prompt:
          "On the TEAS, an answer choice for an author's purpose question usually looks like which of these?",
        choices: [
          "A single topic word, such as vaccines",
          "A verb paired with the topic, such as to inform readers about hand washing",
          "A sentence copied word for word from the passage",
          "A one-sentence summary of every paragraph",
        ],
        answer: 1,
        explanation:
          "Purpose choices typically combine a verb (inform, persuade, entertain) with the passage's topic, so you must check that both parts fit.",
      },
    },
    {
      id: "spotting-purpose",
      title: "Spotting the purpose",
      blocks: [
        {
          kind: "concept",
          body: "The fastest test is to ask what the author wants from you. Informational writing wants you to know something; persuasive writing wants you to believe or do something; entertaining writing wants you to enjoy the text itself.",
        },
        {
          kind: "example",
          title: "Same topic, two purposes",
          steps: [
            {
              note: "A flyer speaks directly to the reader and demands action.",
              work: ["\"Protect your family now, get the flu shot today.\""],
              becomes: "The author wants you to act, so the purpose is to persuade.",
            },
            {
              note: "A chart lists flu symptoms without asking anything of you.",
              work: ["fever, cough, sore throat, body aches"],
              becomes: "The author only wants you to know the facts, so the purpose is to inform.",
            },
          ],
          answer: "The flyer persuades; the chart informs.",
        },
        {
          kind: "tip",
          body: "Ask what the author wants you to do after reading. If the answer is to believe something or to act, the purpose is to persuade.",
        },
      ],
      quickCheck: {
        prompt:
          "A pamphlet reads: Don't wait, schedule your health screening today. What is the author's purpose?",
        choices: [
          "To inform readers about screening procedures",
          "To persuade readers to schedule a screening",
          "To entertain readers with a health anecdote",
          "To describe the symptoms screenings detect",
        ],
        answer: 1,
        explanation:
          "The pamphlet tells you to act (schedule today), and a call to action signals persuasion, not information.",
      },
    },
  ],
};
