import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for ENGLISH / knowledge-language / "Identifying Appropriate
 * Language for Intended Audience/Tone". Content carried over from the flat
 * skill-lesson blocks, restructured into the concept / rule / example /
 * mistake / quick check pattern. Quick checks are informal and never touch
 * mastery.
 */
export const APPROPRIATE_LANGUAGE_AUDIENCE_TONE: GuidedLesson = {
  section: "ENGLISH",
  topic: "knowledge-language",
  skill: "Identifying Appropriate Language for Intended Audience/Tone",
  slug: "identifying-appropriate-language-for-intended-audience-tone",
  title: "Language for Audience and Tone",
  summary:
    "Effective writing matches its formality, word choice, and tone to its audience and purpose.",
  minutes: [8, 10],
  objectives: [
    "Define tone as the writer's attitude toward the subject and reader",
    "Distinguish formal language from informal language",
    "Match word choice to a given audience and setting",
    "Spot a phrase whose language does not fit the rest of the passage",
  ],
  sections: [
    {
      id: "what-it-is",
      title: "Tone and formality",
      blocks: [
        {
          kind: "concept",
          body: "Tone is the writer's attitude toward the subject and the reader. It comes through in word choice, and it can be serious, encouraging, neutral, or urgent depending on what the writing is trying to do.\n\nFormality is a separate dial. Formal language suits professional or academic settings and avoids slang. Informal language is casual and conversational, closer to how you would speak to someone you know.",
        },
        {
          kind: "rule",
          title: "Two things language has to fit",
          items: [
            "The audience: who is reading, and what they expect from you",
            "The purpose: what the writing is meant to do, which sets the tone",
          ],
        },
        {
          kind: "rule",
          title: "Formal or informal",
          items: [
            "Formal: precise wording, no slang, no contractions, professional or academic settings",
            "Informal: casual and conversational, everyday words, contractions, personal settings",
          ],
        },
        {
          kind: "tip",
          body: "Tone and formality can vary independently. A formal letter can still be encouraging, and a casual note to a friend can still be serious.",
        },
      ],
      quickCheck: {
        prompt: "What does tone refer to in a piece of writing?",
        choices: [
          "The writer's attitude toward the subject and the reader",
          "The number of formal words the writing contains",
          "How long the sentences are",
          "Whether the statements can be verified",
        ],
        answer: 0,
        explanation:
          "Tone is the writer's attitude, and it shows up in word choice. Formality, sentence length, and verifiability are separate matters.",
      },
    },
    {
      id: "how-tested",
      title: "How the TEAS tests it",
      blocks: [
        {
          kind: "concept",
          body: "You will pick the sentence whose language best fits a given audience or tone, or you will spot the phrase that does not match the rest.\n\nThe question always tells you the setting, so read that first. The setting decides which choice is right; a sentence is not correct or incorrect on its own.",
        },
        {
          kind: "rule",
          title: "How to work the question",
          ordered: true,
          items: [
            "Identify the audience and the setting the question names",
            "Decide whether that setting calls for formal or informal language",
            "Eliminate choices whose word choice clashes with that setting",
          ],
        },
        {
          kind: "concept",
          body: "Watch for mismatches in both directions:\n\n- Slang in a formal report\n- Stiff jargon in a friendly patient note",
        },
        {
          kind: "mistake",
          body: "Do not assume the most formal choice always wins. Stiff jargon is just as wrong in a get-well note as slang is in a clinical chart. The target is fit, not formality.",
        },
      ],
      quickCheck: {
        prompt:
          "A question asks which sentence best fits a friendly note to a patient. What should decide your answer?",
        choices: [
          "The choice with the most professional vocabulary",
          "The choice with the shortest sentence",
          "Whether the language fits a warm, personal setting",
          "The choice that contains no contractions",
        ],
        answer: 2,
        explanation:
          "The setting decides. A friendly note calls for a warmer everyday voice, so the most formal or most jargon-heavy option would be a mismatch.",
      },
    },
    {
      id: "worked-example",
      title: "Matching sentence to setting",
      blocks: [
        {
          kind: "concept",
          body: "The two sentences below both concern a person who is unwell. Each one fits exactly one of the settings, and swapping them would feel wrong.",
        },
        {
          kind: "example",
          title: "Which sentence goes where?",
          steps: [
            {
              note: "Start with the clinical chart. It is a professional record, so it calls for formal, precise wording.",
              work: [
                "\"The patient reports moderate abdominal pain\"",
                "Precise, neutral, no slang.",
              ],
              becomes: "Fits the clinical chart",
            },
            {
              note: "Now the get-well card to a friend. This is a personal setting, so it calls for a warm, informal voice.",
              work: [
                "\"Hope you feel better soon\"",
                "Casual, warm, conversational.",
              ],
              becomes: "Fits the get-well card",
            },
            {
              note: "Test the swap to confirm. Put each sentence in the other setting.",
              work: [
                "\"Hope you feel better soon\" in a chart: too casual for a record.",
                "\"The patient reports moderate abdominal pain\" in a card: cold and clinical to a friend.",
              ],
              becomes: "Both swaps clash",
            },
          ],
          answer:
            "Each sentence fits its own setting. Neither sentence is better writing than the other; each is right only where it belongs.",
        },
      ],
      quickCheck: {
        prompt:
          "Which sentence best fits a formal clinical chart entry?",
        choices: [
          "The patient's stomach is killing him",
          "The patient reports moderate abdominal pain",
          "Hope his tummy troubles clear up soon",
          "Poor guy is really hurting today",
        ],
        answer: 1,
        explanation:
          "A chart is a professional record, so it calls for precise, neutral wording. The other three use slang or warmth that belongs in a personal note, not a clinical entry.",
      },
    },
    {
      id: "picture-the-setting",
      title: "Picture the setting",
      blocks: [
        {
          kind: "concept",
          body: "When a choice is close, picture the setting before you read the options again. If it is professional, choose precise formal wording. If it is personal, a warmer everyday voice usually fits better.",
        },
        {
          kind: "tabs",
          tabs: [
            {
              label: "Professional",
              blocks: [
                {
                  kind: "concept",
                  body: "Charts, reports, academic writing, and workplace correspondence.\n\n- Precise, specific wording\n- No slang\n- Neutral or serious tone",
                },
              ],
            },
            {
              label: "Personal",
              blocks: [
                {
                  kind: "concept",
                  body: "Cards, notes to friends, casual messages, and friendly patient communication.\n\n- Everyday words\n- Conversational phrasing\n- Warm or encouraging tone",
                },
              ],
            },
          ],
        },
        {
          kind: "tip",
          body: "Read the option aloud in your head as if you were the reader in that setting. A mismatch is usually easier to hear than to reason out.",
        },
        {
          kind: "mistake",
          body: "One out-of-place phrase can spoil an otherwise fitting sentence. When you are asked to spot the mismatch, check every phrase rather than judging the sentence by its overall feel.",
        },
      ],
      quickCheck: {
        prompt:
          "A workplace incident report includes the line \"the whole thing went sideways pretty fast.\" Why is that phrase a mismatch?",
        choices: [
          "It is too short for a report",
          "It uses slang in a setting that calls for formal wording",
          "It states an opinion rather than a fact",
          "It is written in the past tense",
        ],
        answer: 1,
        explanation:
          "An incident report is a professional document, so it calls for precise formal wording. Went sideways is casual slang, which clashes with that setting.",
      },
    },
  ],
};
