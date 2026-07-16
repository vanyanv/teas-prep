import type { GuidedLesson } from "../guided-lesson-types";

/** Guided lesson for READING / key-ideas-details / "Summarize a Multi-Paragraph
 *  Text". Content carried over from the flat skill-lesson blocks, restructured
 *  into the concept / rule / example / mistake / quick check pattern. */
export const SUMMARIZE_MULTI_PARAGRAPH_TEXT: GuidedLesson = {
  section: "READING",
  topic: "key-ideas-details",
  skill: "Summarize a Multi-Paragraph Text",
  slug: "summarize-a-multi-paragraph-text",
  title: "Summarizing a Multi-Paragraph Text",
  summary:
    "Capture the central point of a longer passage in a short, accurate restatement without adding opinions.",
  minutes: [5, 7],
  objectives: [
    "Identify what belongs in a summary and what to leave out",
    "Recognize answer choices that are too narrow or add unstated ideas",
    "Choose the option that covers the whole passage, not one paragraph",
    "Test a summary against the passage before selecting it",
  ],
  sections: [
    {
      id: "what-a-summary-is",
      title: "What a summary is",
      blocks: [
        {
          kind: "concept",
          body: "A summary states the main idea plus the most important supporting points across all paragraphs, in your own condensed words. It is not a copy of any one sentence, and it is not a reaction to the passage; it is the whole passage shrunk down to its essentials.",
        },
        {
          kind: "rule",
          title: "A good summary",
          items: [
            "Includes the main idea of the whole passage",
            "Includes the most important supporting points from every paragraph",
            "Leaves out minor examples and repetition",
            "Leaves out personal reactions and opinions",
          ],
        },
        {
          kind: "tip",
          body: "A good summary is shorter than the original and would still make sense to someone who never read it. If it only makes sense alongside the passage, it is a detail, not a summary.",
        },
      ],
      quickCheck: {
        prompt: "Which of these belongs in a summary of a passage?",
        choices: [
          "A minor example the author mentions once",
          "Your opinion of whether the author is right",
          "The main idea plus the most important supporting points",
          "Every sentence of the passage, reworded",
        ],
        answer: 2,
        explanation:
          "A summary condenses the whole passage to its main idea and key support. Minor examples, opinions, and full restatements do not belong.",
      },
    },
    {
      id: "how-teas-tests-it",
      title: "How the TEAS tests it",
      blocks: [
        {
          kind: "concept",
          body: "On the TEAS you pick the answer choice that best summarizes the whole passage. The wrong choices are built to look reasonable, so knowing the two standard traps matters as much as knowing the passage.",
        },
        {
          kind: "rule",
          title: "The two traps",
          items: [
            "Too narrow: a choice that is true but covers only one paragraph",
            "Too far: a choice that adds an idea the text never stated",
          ],
        },
        {
          kind: "mistake",
          body: "Do not pick a choice just because it is true. A statement can be accurate and still fail as a summary if it captures only one paragraph of a multi-paragraph passage.",
        },
      ],
      quickCheck: {
        prompt:
          "An answer choice accurately restates a fact from the second paragraph of a four-paragraph passage. Why might it still be the wrong summary?",
        choices: [
          "Facts never appear in summaries",
          "It covers only one paragraph, not the whole passage",
          "Summaries must quote the passage word for word",
          "The second paragraph is never important",
        ],
        answer: 1,
        explanation:
          "A summary must cover the whole passage. A true statement about a single paragraph is the classic too-narrow trap.",
      },
    },
    {
      id: "choosing-the-best-summary",
      title: "Choosing the best summary",
      blocks: [
        {
          kind: "concept",
          body: "When you compare answer choices, measure each one against the full passage: does it account for every paragraph, and does it stay inside what the text actually said?",
        },
        {
          kind: "example",
          title: "Whole passage versus one step",
          steps: [
            {
              note: "A passage describes how a nurse checks a patient's chart, confirms allergies, then verifies the medication label before giving a dose.",
              work: [],
            },
            {
              note: "The best summary covers all of the steps as one idea.",
              work: [
                '"Nurses follow several checks before giving medication to keep patients safe."',
              ],
            },
            {
              note: "A choice that names only one step is too narrow.",
              work: ['"Nurses confirm allergies." (only one step)'],
            },
          ],
          answer:
            "Nurses follow several checks before giving medication to keep patients safe.",
        },
        {
          kind: "tip",
          body: "If a choice mentions a detail from just one paragraph, it is too small to be the summary. The right answer should touch the whole passage.",
        },
      ],
      quickCheck: {
        prompt:
          "A passage explains how handwashing, glove use, and surface cleaning each reduce infection in clinics. Which choice best summarizes it?",
        choices: [
          "Gloves protect nurses from infection",
          "Clinics should be fined for poor hygiene",
          "Several hygiene practices work together to reduce infection in clinics",
          "Handwashing is the oldest hygiene practice",
        ],
        answer: 2,
        explanation:
          "Only this choice covers all three practices. The glove choice is too narrow, and the fine and oldest-practice choices add ideas the passage never stated.",
      },
    },
  ],
};
