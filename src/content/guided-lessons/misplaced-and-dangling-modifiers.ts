import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for ENGLISH / conventions / "Misplaced and Dangling
 * Modifiers". Content carried over from the flat skill-lesson blocks,
 * restructured into the concept / rule / example / mistake / quick check
 * pattern. Quick checks are informal and never touch mastery.
 */
export const MISPLACED_AND_DANGLING_MODIFIERS: GuidedLesson = {
  section: "ENGLISH",
  topic: "conventions",
  skill: "Misplaced and Dangling Modifiers",
  slug: "misplaced-and-dangling-modifiers",
  title: "Misplaced and Dangling Modifiers",
  summary:
    "Place modifiers next to the word they describe so the sentence states what you mean.",
  minutes: [8, 10],
  objectives: [
    "Explain what a modifier attaches to in a sentence",
    "Identify a misplaced modifier and move it next to its target",
    "Recognize a dangling modifier whose subject is missing",
    "Fix a dangling modifier by naming the correct subject after the opening phrase",
  ],
  sections: [
    {
      id: "modifiers-attach",
      title: "What a modifier attaches to",
      blocks: [
        {
          kind: "concept",
          body: "A modifier is a word or phrase that describes something else in the sentence. A reader attaches it to whatever it sits closest to, not to whatever you meant.\n\nSo placement carries meaning. Move the same phrase to a different spot and the sentence says something different, even though not a single word has changed.",
        },
        {
          kind: "rule",
          title: "The core rule",
          intro: "Keep each modifier close to the word it modifies. Two things go wrong when you do not:",
          items: [
            "A misplaced modifier sits too far from its target and seems to describe the wrong word.",
            "A dangling modifier describes a word that is not actually in the sentence.",
          ],
        },
        {
          kind: "tip",
          body: "Read the sentence literally, the way a stranger would. If the literal reading is absurd, a modifier has landed next to the wrong word.",
        },
      ],
      quickCheck: {
        prompt: "Which word does a reader naturally attach a modifier to?",
        choices: [
          "The subject of the sentence",
          "The word it sits closest to",
          "The word the writer had in mind",
          "The last noun in the sentence",
        ],
        answer: 1,
        explanation:
          "Readers attach a modifier to whatever is nearest, which is why placement changes meaning. What the writer intended is not visible on the page.",
      },
    },
    {
      id: "misplaced",
      title: "Misplaced modifiers",
      blocks: [
        {
          kind: "concept",
          body: "A misplaced modifier has a target in the sentence, but it is sitting too far away from it. The word it should describe is present, so the fix is simply to move the modifier next to it.",
        },
        {
          kind: "example",
          title: "Move the phrase to its target",
          steps: [
            {
              note: "Read the sentence literally and see what the phrase lands on.",
              work: [
                "\"The nurse handed the chart to the doctor covered in coffee.\"",
                "\"Covered in coffee\" sits next to \"the doctor.\"",
              ],
              becomes: "Literally, the doctor is covered in coffee.",
            },
            {
              note: "Decide what the phrase was meant to describe.",
              work: ["The chart is the thing covered in coffee."],
            },
            {
              note: "Move the modifier next to that word.",
              work: [
                "\"The nurse handed the chart covered in coffee to the doctor.\"",
              ],
              becomes: "The phrase now touches \"chart.\"",
            },
          ],
          answer:
            "The nurse handed the chart covered in coffee to the doctor.",
        },
        {
          kind: "mistake",
          body: "Do not try to fix a misplaced modifier by adding words. The sentence already contains the right target; moving the phrase is enough, and adding words usually makes the sentence longer without fixing what it says.",
        },
      ],
      quickCheck: {
        prompt:
          "\"She served coffee to the patients in paper cups.\" What is wrong with this sentence?",
        choices: [
          "\"In paper cups\" sits next to \"patients,\" so it seems to describe them",
          "The sentence has no subject performing the action",
          "\"Served\" is the wrong verb tense",
          "Nothing is wrong; the meaning is clear enough",
        ],
        answer: 0,
        explanation:
          "The phrase describes the coffee, but it sits beside \"patients,\" so it is misplaced. Moving it gives \"She served coffee in paper cups to the patients.\"",
      },
    },
    {
      id: "dangling",
      title: "Dangling modifiers",
      blocks: [
        {
          kind: "concept",
          body: "A dangling modifier is different. Its target is not in the sentence at all, so there is nothing to move it next to. The reader attaches it to whatever noun follows the comma, and that noun did not perform the action.\n\nThis happens most often when a sentence opens with a descriptive phrase and then names the wrong subject.",
        },
        {
          kind: "example",
          title: "Correct and incorrect, side by side",
          steps: [
            {
              note: "Start with the version that works. Check the noun right after the comma.",
              work: [
                "Correct: \"Walking into the room, the nurse greeted the patient.\"",
                "Who was walking? The nurse, and \"the nurse\" follows the comma.",
              ],
              becomes: "The opening phrase has its subject.",
            },
            {
              note: "Now the version that fails. Apply the same check.",
              work: [
                "Incorrect: \"Walking into the room, the chart was on the bed.\"",
                "Who was walking? Not the chart, and no person is named.",
              ],
              becomes: "The modifier dangles: its subject is missing.",
            },
          ],
          answer:
            "The first sentence names the walker after the comma; the second never names one, so \"walking into the room\" dangles.",
        },
        {
          kind: "mistake",
          body: "Students often assume a dangling modifier can be repaired by rearranging the sentence. It cannot. Rearranging \"Walking into the room, the chart was on the bed\" still leaves no one doing the walking. You have to supply the missing subject.",
        },
      ],
      quickCheck: {
        prompt:
          "What makes a modifier dangling rather than misplaced?",
        choices: [
          "It sits at the end of the sentence instead of the beginning",
          "It describes a word that is not in the sentence at all",
          "It is longer than the clause that follows it",
          "It describes a word that appears too far away in the sentence",
        ],
        answer: 1,
        explanation:
          "A dangling modifier has no target present, so there is nothing to move it beside. A modifier whose target is present but distant is misplaced instead.",
      },
    },
    {
      id: "fixing",
      title: "Fixing the opening phrase",
      blocks: [
        {
          kind: "concept",
          body: "Most dangling modifiers on the TEAS open a sentence with an -ing or -ed phrase followed by a comma. The noun right after that comma must be the one doing that action.\n\nSo the fix is to name the correct subject right after the opening phrase, rebuilding the rest of the sentence around it.",
        },
        {
          kind: "rule",
          title: "How to check an opening phrase",
          ordered: true,
          items: [
            "Find the opening -ing or -ed phrase and the comma that ends it",
            "Ask who or what performed that action",
            "Look at the noun immediately after the comma",
            "If it is not the performer, rewrite so the performer sits there",
          ],
        },
        {
          kind: "example",
          title: "Supply the missing subject",
          steps: [
            {
              note: "Ask who performed the action in the opening phrase.",
              work: [
                "\"Walking into the room, the chart was on the bed.\"",
                "Who was walking? A person, but the sentence never says who.",
              ],
            },
            {
              note: "Name that subject right after the comma and rebuild the rest.",
              work: [
                "\"Walking into the room, the nurse saw the chart on the bed.\"",
              ],
              becomes: "\"The nurse\" now follows the comma and does the walking.",
            },
          ],
          answer: "Walking into the room, the nurse saw the chart on the bed.",
        },
        {
          kind: "tip",
          body: "On a multiple-choice question, read only the noun after the comma in each option. Any choice where that noun could not perform the opening action is out, which usually clears away two or three answers at once.",
        },
      ],
      quickCheck: {
        prompt:
          "\"Rushing to finish the shift, ___\" Which continuation fixes the opening phrase?",
        choices: [
          "the paperwork was left unsigned",
          "the medication cart stayed in the hallway",
          "the aide left the paperwork unsigned",
          "there was no time to sign the paperwork",
        ],
        answer: 2,
        explanation:
          "The noun after the comma must be the one rushing, and only the aide can rush. Paperwork, a cart, and \"there\" cannot perform that action, so those leave the modifier dangling.",
      },
    },
  ],
};
