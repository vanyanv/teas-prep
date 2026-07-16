import type { GuidedLesson } from "../guided-lesson-types";

/** Guided lesson for READING / craft-structure / "Evaluate the Author's Point
 *  of View or Perspective in a Given Text". Content carried over from the flat
 *  skill-lesson blocks, restructured into the concept / rule / example /
 *  mistake / quick check pattern. */
export const EVALUATE_AUTHORS_POINT_OF_VIEW: GuidedLesson = {
  section: "READING",
  topic: "craft-structure",
  skill: "Evaluate the Author's Point of View or Perspective in a Given Text",
  slug: "evaluate-the-author-s-point-of-view-or-perspective-in-a-given-text",
  title: "Evaluate the Author's Point of View",
  summary:
    "Point of view is the position or attitude an author takes toward the subject, shaped by their perspective and word choice.",
  minutes: [6, 8],
  objectives: [
    "Define an author's point of view and where it shows in a text",
    "Determine whether an author supports, opposes, or stays neutral on a subject",
    "Identify the attitude an author's wording reveals",
    "Use loaded or emotional word choices to find where an author stands",
  ],
  sections: [
    {
      id: "what-it-is",
      title: "What point of view is",
      blocks: [
        {
          kind: "concept",
          body: "An author's point of view is how they see and feel about a topic. Authors rarely announce it in a single sentence; instead it shows through the choices they make while writing.",
        },
        {
          kind: "rule",
          title: "Where point of view shows",
          items: [
            "The details the author chooses to include",
            "The tone the author uses",
            "Whether the author sounds for, against, or neutral on the subject",
          ],
        },
        {
          kind: "example",
          title: "Same topic, two points of view",
          steps: [
            {
              note: "One author includes details about patients resting better and writes in a warm tone.",
              work: ["\"Quiet hours give patients the calm they need to heal.\""],
              becomes: "This author sounds for quiet hours.",
            },
            {
              note: "Another author includes details about delayed visits and writes in a frustrated tone.",
              work: ["\"Quiet hours lock worried families out of the room.\""],
              becomes: "This author sounds against quiet hours.",
            },
          ],
          answer:
            "The details and tone each author chose reveal their point of view, even though neither says \"I support\" or \"I oppose.\"",
        },
        {
          kind: "mistake",
          body: "Do not expect the author to state their opinion outright. Point of view usually has to be read from details and tone, not from a direct announcement.",
        },
      ],
      quickCheck: {
        prompt: "An author's point of view is best described as:",
        choices: [
          "The main idea of the passage",
          "How the author sees and feels about the topic",
          "The order in which events are presented",
          "The reader's reaction to the text",
        ],
        answer: 1,
        explanation:
          "Point of view is the author's own position or attitude toward the subject. It shows through their details, tone, and stance, not through the passage's structure or the reader's response.",
      },
    },
    {
      id: "how-the-teas-tests-it",
      title: "How the TEAS tests it",
      blocks: [
        {
          kind: "concept",
          body: "TEAS questions about point of view come in two forms. Either you decide whether the author supports, opposes, or stays neutral on a subject, or you identify the attitude their wording reveals.",
        },
        {
          kind: "rule",
          title: "What you are asked to do",
          items: [
            "Decide the author's stance: supports, opposes, or neutral",
            "Name the attitude the author's word choices reveal",
          ],
        },
        {
          kind: "example",
          title: "Reading stance from wording",
          steps: [
            {
              note: "Read the author's sentence about a policy change.",
              work: [
                "\"The new visiting hours finally give families the time they deserve.\"",
              ],
            },
            {
              note: "Notice the words that carry attitude, not just information.",
              work: [
                "\"finally\" suggests the change was overdue",
                "\"deserve\" suggests families were owed this time",
              ],
            },
            {
              note: "Both words cast the change positively, so the author's stance is supportive.",
              work: [],
            },
          ],
          answer: "The author holds a supportive point of view toward the new visiting hours.",
        },
      ],
      quickCheck: {
        prompt:
          "An author writes: \"The clinic's new scheduling system finally ends the pointless waiting patients have endured for years.\" What is the author's point of view toward the new system?",
        choices: [
          "Opposed, because the sentence mentions waiting",
          "Neutral, because the sentence reports a fact",
          "Supportive, because \"finally\" and \"pointless waiting\" cast the change as a needed fix",
          "It cannot be determined from one sentence",
        ],
        answer: 2,
        explanation:
          "\"Finally\" frames the change as overdue and \"pointless waiting\" condemns the old system, so the wording reveals support for the new one. The negative words target the past, not the change.",
      },
    },
    {
      id: "word-choice-signals",
      title: "Word choice as evidence",
      blocks: [
        {
          kind: "concept",
          body: "When the author never states an opinion, their word choices are your evidence. Positive or negative wording usually reveals where the author stands even when they do not say it directly.",
        },
        {
          kind: "tip",
          body: "Focus on loaded or emotional word choices. Ask of each strong word: does it cast the subject in a positive or a negative light?",
        },
        {
          kind: "example",
          title: "Loaded words versus neutral words",
          steps: [
            {
              note: "Compare a neutral report with a loaded one describing the same event.",
              work: [
                "Neutral: \"The hospital changed its visiting hours.\"",
                "Loaded: \"The hospital finally gave families the time they deserve.\"",
              ],
            },
            {
              note: "The first sentence only informs; the second adds \"finally\" and \"deserve,\" which signal approval.",
              work: [],
            },
          ],
          answer:
            "Loaded words reveal a stance; neutral words leave the author's point of view hidden.",
        },
        {
          kind: "mistake",
          body: "Do not treat every passage as having a strong stance. If the wording stays factual and even, the author may be neutral, and \"neutral\" can be the correct answer.",
        },
      ],
      quickCheck: {
        prompt:
          "Which sentence most clearly reveals the author's point of view through word choice?",
        choices: [
          "The unit added two nurses to the night shift.",
          "The schedule changed on March 1.",
          "The unit at last has the reckless understaffing under control.",
          "The night shift runs from 7 p.m. to 7 a.m.",
        ],
        answer: 2,
        explanation:
          "\"At last\" and \"reckless understaffing\" are loaded words that condemn the old staffing and approve the change. The other sentences state facts without revealing an attitude.",
      },
    },
  ],
};
