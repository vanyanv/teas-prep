import type { GuidedLesson } from "../guided-lesson-types";

/** Guided lesson for READING / key-ideas-details / "Locate Specific
 *  Information in a Text". Content carried over from the flat skill-lesson
 *  blocks, restructured into the concept / rule / example / mistake / quick
 *  check pattern. */
export const LOCATE_SPECIFIC_INFORMATION: GuidedLesson = {
  section: "READING",
  topic: "key-ideas-details",
  skill: "Locate Specific Information in a Text",
  slug: "locate-specific-information-in-a-text",
  title: "Locating Specific Information",
  summary:
    "Scan a passage to find an exact fact, name, number, or detail quickly and accurately.",
  minutes: [5, 7],
  objectives: [
    "Recognize questions that ask for a directly stated detail",
    "Pull a keyword from the question to guide your scan",
    "Read the full sentence around a keyword to verify the detail",
    "Avoid grabbing a similar detail that answers a different question",
  ],
  sections: [
    {
      id: "targeted-searching",
      title: "Targeted searching",
      blocks: [
        {
          kind: "concept",
          body: "This is targeted searching, not deep reading. You hunt for one precise piece of information that is stated directly in the text, such as a date, a dosage, a definition, or a location.\n\nBecause the answer sits on the page, you do not need to interpret tone, infer motives, or summarize. You need to find one detail and read it correctly.",
        },
        {
          kind: "tip",
          body: "Treat these questions like looking up a number in a phone directory: you know exactly what you are looking for before you start reading.",
        },
      ],
      quickCheck: {
        prompt:
          "Which question is asking you to locate specific information?",
        choices: [
          "What is the author's overall purpose?",
          "What dose does the passage say to give every 6 hours?",
          "What can you infer about the patient's mood?",
          "Which title best summarizes the passage?",
        ],
        answer: 1,
        explanation:
          "A dose stated in the passage is one precise, directly stated detail. Purpose, inference, and summary questions all require interpreting the passage as a whole.",
      },
    },
    {
      id: "how-teas-asks",
      title: "How the TEAS tests it",
      blocks: [
        {
          kind: "concept",
          body: "Stems ask \"According to the passage...\" or \"Which detail is stated about...\". The answer is found word-for-word or closely paraphrased in the text, so going back to verify always beats guessing.",
        },
        {
          kind: "rule",
          title: "What these stems promise",
          items: [
            "\"According to the passage...\": the answer is stated in the text",
            "\"Which detail is stated about...\": the answer may be a close paraphrase",
            "Either way, the passage settles it; you never need outside knowledge",
          ],
        },
        {
          kind: "mistake",
          body: "Answering from memory of your first read-through. A choice that sounds familiar is often a near-miss detail; return to the passage and confirm before you commit.",
        },
      ],
      quickCheck: {
        prompt:
          "A stem begins \"According to the passage...\". What does that tell you about the correct answer?",
        choices: [
          "It is stated in the text, word-for-word or closely paraphrased",
          "It must be inferred from the author's tone",
          "It depends on your outside knowledge of the subject",
          "It is the choice that best summarizes the whole passage",
        ],
        answer: 0,
        explanation:
          "\"According to the passage\" signals a directly stated detail, so you can verify the answer by pointing to the sentence that contains it.",
      },
    },
    {
      id: "keyword-scan",
      title: "The keyword scan",
      blocks: [
        {
          kind: "rule",
          title: "Keyword scan",
          ordered: true,
          items: [
            "Pull a keyword from the question (a name, number, or distinctive term)",
            "Scan the passage for that keyword, ignoring everything else",
            "Read the full sentence around it so you grab the correct detail, not a similar nearby one",
            "Match what you found against the answer choices",
          ],
        },
        {
          kind: "example",
          title: "Find the Saturday opening time",
          expression:
            "\"The clinic opens at 7 a.m. on weekdays and 9 a.m. on Saturdays.\"",
          steps: [
            {
              note: "The question asks when the clinic opens on Saturday, so the keyword is Saturday.",
              work: [],
            },
            {
              note: "Scan for the keyword and land on the phrase around it.",
              work: ["\"...and 9 a.m. on Saturdays.\""],
            },
            {
              note: "Read the number attached to the keyword, not the first number in the sentence.",
              work: ["Saturday opening time: 9 a.m."],
            },
          ],
          answer: "9 a.m.",
        },
        {
          kind: "mistake",
          body: "Grabbing the first plausible detail you see. In the clinic sentence, 7 a.m. appears first, but it answers the weekday question, not the Saturday one.",
        },
      ],
      quickCheck: {
        prompt:
          "A passage states: \"Visiting hours end at 8 p.m. on weekdays and 6 p.m. on weekends.\" When do visiting hours end on weekends?",
        choices: ["8 p.m.", "6 p.m.", "7 p.m.", "The passage does not say"],
        answer: 1,
        explanation:
          "Scan for the keyword weekends and read the number next to it: 6 p.m. The 8 p.m. time belongs to weekdays.",
      },
    },
  ],
};
