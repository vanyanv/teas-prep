import type { GuidedLesson } from "../guided-lesson-types";

/** Guided lesson for READING / integration-knowledge / "Identify Primary
 *  Sources". Content carried over from the flat skill-lesson blocks,
 *  restructured into the concept / rule / example / mistake / quick check
 *  pattern. */
export const IDENTIFY_PRIMARY_SOURCES: GuidedLesson = {
  section: "READING",
  topic: "integration-knowledge",
  skill: "Identify Primary Sources",
  slug: "identify-primary-sources",
  title: "Identifying Primary Sources",
  summary:
    "Recognize firsthand, original records of an event versus secondhand accounts that interpret them.",
  minutes: [5, 7],
  objectives: [
    "Define primary and secondary sources",
    "Classify common source types as primary or secondary",
    "Apply a one-question test to decide whether a source is primary",
  ],
  sections: [
    {
      id: "what-it-is",
      title: "Primary vs. secondary sources",
      blocks: [
        {
          kind: "concept",
          body: "A primary source is created by someone with direct experience of an event or topic, at the time it happened. A secondary source analyzes, summarizes, or comments on primary material after the fact.\n\nThe difference is distance. A primary source is the original record itself; a secondary source stands one step away, describing or interpreting records that someone else produced.",
        },
        {
          kind: "rule",
          title: "The two kinds",
          items: [
            "Primary: a firsthand, original record made by someone who was there, at the time",
            "Secondary: a later account that analyzes, summarizes, or comments on primary material",
          ],
        },
        {
          kind: "mistake",
          body: "A source is not primary just because it is old, detailed, or trustworthy. What matters is who made it and when: direct experience recorded at the time, not the quality of the account.",
        },
      ],
      quickCheck: {
        prompt: "What makes a source a primary source?",
        choices: [
          "It was written by a professional historian",
          "It was created by someone with direct experience, at the time of the event",
          "It has been checked for accuracy by other writers",
          "It summarizes many different accounts of an event",
        ],
        answer: 1,
        explanation:
          "Primary means firsthand and original: made by someone who directly experienced the event, at the time it happened. Summaries of other accounts are secondary.",
      },
    },
    {
      id: "on-the-test",
      title: "How the TEAS tests it",
      blocks: [
        {
          kind: "concept",
          body: "You are given a list of items or descriptions and asked which is a primary source. The fastest way through is knowing the common examples of each kind on sight.",
        },
        {
          kind: "tabs",
          tabs: [
            {
              label: "Primary",
              blocks: [
                {
                  kind: "rule",
                  intro: "Firsthand, original records:",
                  items: [
                    "Diaries and letters",
                    "Interviews",
                    "Original research data",
                    "Photographs",
                    "Eyewitness reports",
                    "Lab notes",
                  ],
                },
              ],
            },
            {
              label: "Secondary",
              blocks: [
                {
                  kind: "rule",
                  intro: "Later accounts that interpret primary material:",
                  items: [
                    "Textbooks",
                    "Review articles",
                    "Biographies",
                    "News analysis of past events",
                  ],
                },
              ],
            },
          ],
        },
        {
          kind: "example",
          title: "Classifying two accounts of the same topic",
          steps: [
            {
              note: "A patient's own handwritten journal describing recovery is a firsthand record made by the person who lived it.",
              work: ["Journal by the patient: primary"],
            },
            {
              note: "A magazine article that summarizes several such journals to describe recovery trends interprets other people's records after the fact.",
              work: ["Magazine article summarizing journals: secondary"],
            },
          ],
          answer: "The journal is primary; the article about the journals is secondary.",
        },
      ],
      quickCheck: {
        prompt: "Which of the following is a primary source?",
        choices: [
          "A textbook chapter on the history of nursing",
          "A biography of a famous surgeon",
          "A soldier's letter home written during a war",
          "A review article comparing several studies",
        ],
        answer: 2,
        explanation:
          "The letter is a firsthand record made at the time by someone who was there. Textbooks, biographies, and review articles all interpret primary material after the fact.",
      },
    },
    {
      id: "deciding-quickly",
      title: "A quick test for any source",
      blocks: [
        {
          kind: "concept",
          body: "When a source does not match a memorized example, fall back on one question about its origin.",
        },
        {
          kind: "tip",
          body: "Ask 'Was this made by someone who was actually there at the time?' If yes, it is primary; if it reports on someone else's experience, it is secondary.",
        },
        {
          kind: "example",
          title: "Applying the question",
          steps: [
            {
              note: "A nurse's own shift notes, written during the shift: was the writer there at the time? Yes.",
              work: ["Shift notes: primary"],
            },
            {
              note: "A news story recounting what several nurses reported about that shift: the writer reports on others' experience.",
              work: ["News story: secondary"],
            },
          ],
          answer: "The notes are primary; the news story is secondary.",
        },
        {
          kind: "mistake",
          body: "Do not label a source primary just because it quotes or describes an eyewitness. If the writer is reporting on someone else's experience, the account itself is secondary.",
        },
      ],
      quickCheck: {
        prompt:
          "A journalist interviews survivors of a flood and publishes an article analyzing what they said. Which statement is correct?",
        choices: [
          "The article is primary because it contains eyewitness quotes",
          "The recorded interviews are primary; the article analyzing them is secondary",
          "Both the interviews and the article are secondary",
          "Neither is primary because the flood is over",
        ],
        answer: 1,
        explanation:
          "The interviews are firsthand accounts, so they are primary. The article reports on and analyzes someone else's experience, which makes it secondary.",
      },
    },
  ],
};
