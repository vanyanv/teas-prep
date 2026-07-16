import type { GuidedLesson } from "../guided-lesson-types";

/** Guided lesson for READING / key-ideas-details / "Interpret Events in a
 *  Sequence". Content carried over from the flat skill-lesson blocks,
 *  restructured into the concept / rule / example / mistake / quick check
 *  pattern. */
export const INTERPRET_EVENTS_SEQUENCE: GuidedLesson = {
  section: "READING",
  topic: "key-ideas-details",
  skill: "Interpret Events in a Sequence",
  slug: "interpret-events-in-a-sequence",
  title: "Events in a Sequence",
  summary:
    "Determine the correct order of events or steps using time and sequence clues in a text.",
  minutes: [5, 7],
  objectives: [
    "Spot signal words that reveal when events happen",
    "Identify which event comes first, last, or next to a given step",
    "Rebuild the true order of events when a text describes them out of order",
  ],
  sections: [
    {
      id: "what-sequencing-is",
      title: "What sequencing is",
      blocks: [
        {
          kind: "concept",
          body: "Sequencing means putting events or steps in the order they happen. A text does not always list events in that order, so you rely on signal words and time references to work out the real timeline.",
        },
        {
          kind: "rule",
          title: "Sequence clues",
          items: [
            "First, next, then, finally: mark an event's position in a series",
            "Before, after: relate one event to another in time",
            "Dates and times: pin events to specific points you can compare",
          ],
        },
        {
          kind: "tip",
          body: "These clues tell you the order even when the events are not listed in line, so read for them before deciding what happened when.",
        },
      ],
      quickCheck: {
        prompt:
          "In the sentence \"Then she labeled the sample,\" what does the word then tell you?",
        choices: [
          "The labeling was the first step",
          "The labeling was the most important step",
          "The labeling happened after an earlier step",
          "The labeling happened at a specific clock time",
        ],
        answer: 2,
        explanation:
          "Then signals that this event follows something that came earlier in the sequence. It says nothing about importance or clock time.",
      },
    },
    {
      id: "how-teas-tests-it",
      title: "How the TEAS tests it",
      blocks: [
        {
          kind: "concept",
          body: "Sequence questions come in a few predictable forms, and each one is answered by rebuilding the timeline from the clues in the passage.",
        },
        {
          kind: "rule",
          title: "Common question forms",
          items: [
            "What happened first, or what happened last",
            "What comes right before or right after a given step",
            "Arrange the events in the order they occurred",
          ],
        },
        {
          kind: "mistake",
          body: "Watch for clues that an event is described out of order, such as \"before that, she had...\". Readers who skim past these phrases place the event where it appears in the text instead of where it belongs in time.",
        },
      ],
      quickCheck: {
        prompt:
          "A passage reads: \"She sealed the envelope. Before that, she had signed the letter.\" Which event happened first?",
        choices: [
          "Sealing the envelope, because it is mentioned first",
          "Signing the letter, because \"before that\" places it earlier",
          "Both happened at the same time",
          "The passage does not say",
        ],
        answer: 1,
        explanation:
          "The phrase \"before that\" tells you the signing came earlier in time, even though it is mentioned second in the text.",
      },
    },
    {
      id: "rebuild-the-timeline",
      title: "Rebuilding the timeline",
      blocks: [
        {
          kind: "concept",
          body: "When events are narrated out of order, use the signal words to place each event, then write out the true sequence before answering.",
        },
        {
          kind: "example",
          title: "Order the events",
          steps: [
            {
              note: "Read the text and mark the signal word.",
              work: [
                "\"She charted the vitals, but only after she had washed her hands and greeted the patient.\"",
              ],
            },
            {
              note: "The word \"after\" signals that charting came last, even though it is mentioned first.",
              work: [],
            },
            {
              note: "Place the remaining events in the order they are given.",
              work: [
                "1) washed hands",
                "2) greeted the patient",
                "3) charted the vitals",
              ],
            },
          ],
          answer: "Washed hands, greeted the patient, charted the vitals",
        },
        {
          kind: "mistake",
          body: "Do not assume the order of sentences equals the order of events. Trust the signal words like before and after to rebuild the true timeline.",
        },
      ],
      quickCheck: {
        prompt:
          "A passage reads: \"The nurse gave the medication, but only after she had checked the patient's ID band.\" What happened first?",
        choices: [
          "Checking the ID band, since \"after\" places the medication later",
          "Giving the medication, since it appears first in the sentence",
          "Both actions happened at once",
          "It cannot be determined from the sentence",
        ],
        answer: 0,
        explanation:
          "\"Only after\" tells you the medication came after the ID check, so checking the ID band happened first despite being mentioned second.",
      },
    },
  ],
};
