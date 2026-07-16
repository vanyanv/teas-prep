import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for ENGLISH / conventions / "Correctly Punctuating
 * Quotations". Content carried over from the flat skill-lesson blocks,
 * restructured into the concept / rule / example / mistake / quick check
 * pattern. Quick checks are informal and never touch mastery.
 */
export const CORRECTLY_PUNCTUATING_QUOTATIONS: GuidedLesson = {
  section: "ENGLISH",
  topic: "conventions",
  skill: "Correctly Punctuating Quotations",
  slug: "correctly-punctuating-quotations",
  title: "Punctuating Quotations",
  summary:
    "Place quotation marks around exact spoken or written words and put periods and commas inside the marks.",
  minutes: [8, 10],
  objectives: [
    "Enclose a speaker's exact words in quotation marks",
    "Place periods and commas inside the closing quotation mark",
    "Use a comma to join a quotation to its speaker tag",
    "Capitalize the first word of a quoted sentence",
    "Distinguish direct quotations from indirect ones",
  ],
  sections: [
    {
      id: "direct-quotations",
      title: "Quoting exact words",
      blocks: [
        {
          kind: "concept",
          body: "Quotation marks tell the reader that the words between them are someone's exact words, spoken or written. Nothing inside the marks may be reworded, shortened, or smoothed out.\n\nBecause the marks make a promise about exactness, the test is simple: if you can hear the person saying those exact words, the quotation marks belong there.",
        },
        {
          kind: "rule",
          title: "What quotation marks enclose",
          items: [
            "A direct quotation of someone's exact spoken words",
            "A direct quotation of someone's exact written words",
            "Only the quoted words themselves, not the sentence that introduces them",
          ],
        },
        {
          kind: "example",
          title: "Marking off the exact words",
          steps: [
            {
              note: "Start with what the patient actually said.",
              work: ["I feel much better today."],
            },
            {
              note: "Enclose those exact words, and only those words, in quotation marks. The introducing phrase stays outside.",
              work: ['The patient said, "I feel much better today."'],
            },
          ],
          answer: 'The patient said, "I feel much better today."',
        },
        {
          kind: "mistake",
          body: 'Do not stretch the quotation marks around the introducing phrase. The speaker did not say "The patient said," so that part stays outside the marks.',
        },
      ],
      quickCheck: {
        prompt: "What do quotation marks tell a reader?",
        choices: [
          "That the words between them are someone's exact words",
          "That the writer disagrees with the words",
          "That the words are important",
          "That a new paragraph is beginning",
        ],
        answer: 0,
        explanation:
          "Quotation marks enclose a direct quotation: the exact words a person spoke or wrote, reproduced without change.",
      },
    },
    {
      id: "punctuation-placement",
      title: "Commas, periods, and speaker tags",
      blocks: [
        {
          kind: "concept",
          body: "Once you know which words to quote, three punctuation habits do the rest of the work: where the period or comma sits, how the quotation attaches to the speaker tag, and which letter gets capitalized.",
        },
        {
          kind: "rule",
          title: "Three habits",
          items: [
            "Put commas and periods inside the closing quotation mark",
            'Use a comma to separate the quotation from a speaker tag, such as "She said."',
            "Capitalize the first word of a quoted sentence",
          ],
        },
        {
          kind: "example",
          title: "Building a correctly punctuated quotation",
          steps: [
            {
              note: "Set the speaker tag against the quotation with a comma.",
              work: ["The patient said,"],
            },
            {
              note: "Open the quotation and capitalize its first word, since it begins a quoted sentence.",
              work: ['The patient said, "I feel much better today'],
            },
            {
              note: "Close with the period inside the quotation mark, not after it.",
              work: ['The patient said, "I feel much better today."'],
            },
          ],
          answer: 'The patient said, "I feel much better today."',
        },
        {
          kind: "example",
          title: "Correct against incorrect",
          steps: [
            {
              note: "Correct: comma before the quotation, period inside the closing mark.",
              work: ['The patient said, "I feel much better today."'],
            },
            {
              note: "Incorrect: no comma after the speaker tag, and the period sits outside the closing mark.",
              work: ['The patient said "I feel much better today".'],
            },
          ],
          answer: 'The patient said, "I feel much better today."',
        },
        {
          kind: "mistake",
          body: 'Writing "I feel much better today". puts the period outside the closing quotation mark. Periods and commas always go inside.',
        },
        {
          kind: "tip",
          body: "Read the sentence back and check three things in order: comma after the speaker tag, capital letter starting the quotation, period inside the closing mark.",
        },
      ],
      quickCheck: {
        prompt: "Which sentence is punctuated correctly?",
        choices: [
          'The nurse said "Your results look good".',
          'The nurse said, "Your results look good."',
          'The nurse said, "your results look good".',
          'The nurse said "Your results look good."',
        ],
        answer: 1,
        explanation:
          "A comma separates the speaker tag from the quotation, the quoted sentence starts with a capital letter, and the period sits inside the closing quotation mark.",
      },
    },
    {
      id: "indirect-quotations",
      title: "Direct against indirect quotations",
      blocks: [
        {
          kind: "concept",
          body: "An indirect quotation reports the idea of what someone said without reproducing the exact words. Because it makes no claim of exactness, it takes no quotation marks and no comma before it.\n\nIndirect quotations usually rephrase the original, often shifting pronouns and verb tense: I feel becomes she felt.",
        },
        {
          kind: "rule",
          title: "Which one are you writing?",
          items: [
            "Direct quotation: exact words, so use quotation marks",
            "Indirect quotation: reported idea, so use no quotation marks",
          ],
        },
        {
          kind: "example",
          title: "The same statement, both ways",
          steps: [
            {
              note: "Direct: the exact words, in quotation marks, with the period inside.",
              work: ['The patient said, "I feel much better today."'],
            },
            {
              note: "Indirect: the idea reported in the writer's words. No quotation marks, no comma.",
              work: ["The patient said she felt better."],
            },
          ],
          answer:
            "Quotation marks belong only on the direct version.",
        },
        {
          kind: "mistake",
          body: 'Do not put quotation marks around an indirect quotation. "The patient said she felt better" needs no marks, because those are not the words the patient spoke.',
        },
        {
          kind: "tip",
          body: "The word that often signals an indirect quotation: he said that he was ready. If you can drop in that, you are reporting, not quoting.",
        },
      ],
      quickCheck: {
        prompt:
          "How should you punctuate: The doctor said that the test was routine?",
        choices: [
          'The doctor said, "that the test was routine."',
          'The doctor said that "the test was routine."',
          "The doctor said that the test was routine, with no quotation marks.",
          'The doctor said, "The test was routine", with quotation marks and a comma.',
        ],
        answer: 2,
        explanation:
          "This reports the idea rather than the doctor's exact words, so it is an indirect quotation and takes no quotation marks.",
      },
    },
  ],
};
