import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for ENGLISH / conventions / "Using Hyphens". Content carried
 * over from the flat skill-lesson blocks, restructured into the concept /
 * rule / example / mistake / quick check pattern. Quick checks are informal
 * and never touch mastery.
 */
export const USING_HYPHENS: GuidedLesson = {
  section: "ENGLISH",
  topic: "conventions",
  skill: "Using Hyphens",
  slug: "using-hyphens",
  summary:
    "A hyphen joins words and word parts (compound modifiers before a noun, compound numbers, fractions, and certain prefixes) and is shorter and different from a dash.",
  title: "Using Hyphens",
  minutes: [12, 14],
  objectives: [
    "Hyphenate compound modifiers that sit directly before a noun",
    "Drop the hyphen when the same words follow the noun",
    "Apply the -ly adverb exception",
    "Hyphenate compound numbers and spelled-out fractions",
    "Decide when a prefix takes a hyphen, and tell a hyphen from a dash",
  ],
  sections: [
    {
      id: "compound-modifiers",
      title: "Compound modifiers before a noun",
      blocks: [
        {
          kind: "concept",
          body: "When two or more words act together as a single adjective directly before a noun, join them with a hyphen. This signals the reader to read the words as one unit describing the noun.\n\n- a well-known author\n- a five-year-old child\n- a high-risk patient\n- a long-term care plan",
        },
        {
          kind: "rule",
          title: "The test",
          intro: "Before you hyphenate, ask two things of the words:",
          items: [
            "Do these words work together as one description, rather than describing separately?",
            "Do they sit directly in front of the noun they describe?",
          ],
        },
        {
          kind: "example",
          title: "Joining the modifier",
          steps: [
            {
              note: "Find the noun and the words describing it.",
              work: [
                "Incorrect: She is a well known author.",
                "The noun is author; well and known describe it together.",
              ],
              becomes: "well + known act as one adjective",
            },
            {
              note: "The pair sits directly before the noun, so join it.",
              work: ["Correct: She is a well-known author."],
            },
            {
              note: "The same move works with a three-word modifier.",
              work: [
                "Incorrect: We admitted a five year old child.",
                "Correct: We admitted a five-year-old child.",
              ],
            },
          ],
          answer:
            "Words acting as one adjective in front of a noun are joined with hyphens: a well-known author, a five-year-old child.",
        },
        {
          kind: "mistake",
          body: "Leaving the hyphens out of a modifier that sits before the noun. \"A five year old child\" reads as three loose descriptions; the hyphens are what tell the reader to take five-year-old as a single unit.",
        },
      ],
      quickCheck: {
        prompt: "Which sentence is punctuated correctly?",
        choices: [
          "We transferred a high risk patient.",
          "We transferred a high-risk patient.",
          "We transferred a high-risk-patient.",
          "We transferred a high risk-patient.",
        ],
        answer: 1,
        explanation:
          "High and risk act as one adjective directly before the noun patient, so they are joined with a hyphen. The noun itself is never attached to the modifier.",
      },
    },
    {
      id: "after-the-noun",
      title: "No hyphen after the noun",
      blocks: [
        {
          kind: "concept",
          body: "When the same describing words come after the noun (usually following a linking verb like is, are, or was), do not hyphenate them. They no longer work as a single modifier in front of the noun, so nothing needs joining.",
        },
        {
          kind: "rule",
          title: "Position decides it",
          items: [
            "Before the noun: hyphenate. She is a well-known author.",
            "After the noun: no hyphen. The author is well known.",
            "After the noun: no hyphen. The child is five years old.",
            "After the noun: no hyphen. This patient is high risk.",
          ],
        },
        {
          kind: "example",
          title: "Moving the words after the noun",
          steps: [
            {
              note: "Start with the hyphenated version, where the modifier leads the noun.",
              work: ["Correct: We admitted a five-year-old child."],
              becomes: "modifier before the noun, so hyphens stay",
            },
            {
              note: "Rewrite it with a linking verb so the words follow the noun.",
              work: [
                "Incorrect: The child is five-years-old.",
                "Correct: The child is five years old.",
              ],
              becomes: "modifier after the noun, so hyphens go",
            },
          ],
          answer:
            "The same words take hyphens before the noun and lose them after it.",
        },
        {
          kind: "tip",
          body: "Locate the noun first, then check which side of it the describing words fall on. That single question settles most hyphen items on the test.",
        },
      ],
      quickCheck: {
        prompt: "Which sentence is punctuated correctly?",
        choices: [
          "The author is well-known.",
          "The author is well known.",
          "The well known author signed books.",
          "The child is five-years-old.",
        ],
        answer: 1,
        explanation:
          "The describing words follow the noun and the linking verb is, so no hyphen is used. The third choice needs a hyphen because the modifier sits before the noun, and the fourth wrongly keeps hyphens after the noun.",
      },
    },
    {
      id: "ly-exception",
      title: "The -ly adverb exception",
      blocks: [
        {
          kind: "concept",
          body: "Do not use a hyphen when the first word is an adverb ending in -ly. The ending -ly already shows the word modifies the adjective that follows, so a hyphen adds nothing.",
        },
        {
          kind: "rule",
          title: "No hyphen after an -ly adverb",
          items: [
            "Correct: a quickly moving car. Incorrect: a quickly-moving car.",
            "Correct: a poorly written report. Incorrect: a poorly-written report.",
            "Correct: a rapidly changing condition. Incorrect: a rapidly-changing condition.",
          ],
        },
        {
          kind: "example",
          title: "When -ly is not an adverb",
          steps: [
            {
              note: "Check whether the -ly word is actually an adverb describing how something is done.",
              work: [
                "\"a poorly written report\": poorly tells how it was written, so it is an adverb.",
              ],
              becomes: "no hyphen",
            },
            {
              note: "Some words end in -ly but are not adverbs, such as family or friendly.",
              work: [
                "\"a family-owned business\": family is a noun, not an adverb.",
              ],
              becomes: "hyphen still used",
            },
          ],
          answer:
            "The exception covers -ly adverbs only. Words like family that merely end in -ly can still take a hyphen.",
        },
        {
          kind: "mistake",
          body: "Applying the exception to every word ending in -ly. \"Family-owned business\" keeps its hyphen because family is a noun, not an adverb telling how something was owned.",
        },
      ],
      quickCheck: {
        prompt: "Which phrase is punctuated correctly?",
        choices: [
          "a rapidly-changing condition",
          "a rapidly changing condition",
          "a family owned business",
          "a poorly-written report",
        ],
        answer: 1,
        explanation:
          "Rapidly is an adverb ending in -ly, so no hyphen is used. Family is a noun rather than an adverb, so family-owned keeps its hyphen.",
      },
    },
    {
      id: "numbers-and-fractions",
      title: "Compound numbers and fractions",
      blocks: [
        {
          kind: "concept",
          body: "Hyphenate the spelled-out whole numbers twenty-one through ninety-nine. Also hyphenate a spelled-out fraction when it is used as a modifier.\n\n- twenty-one, thirty-five, forty-seven, ninety-nine\n- Numbers like sixty (one word) and two hundred (no hyphen) are not hyphenated.",
        },
        {
          kind: "rule",
          title: "What gets a hyphen",
          items: [
            "Spelled-out whole numbers from twenty-one through ninety-nine: The unit has forty-two beds.",
            "Single-word numbers such as sixty, and larger forms such as two hundred: no hyphen.",
            "A spelled-out fraction used as a modifier: A two-thirds majority approved the policy.",
          ],
        },
        {
          kind: "example",
          title: "Two numbers, two decisions",
          steps: [
            {
              note: "Check whether the whole number falls between twenty-one and ninety-nine.",
              work: [
                "Incorrect: The unit has forty two beds.",
                "Correct: The unit has forty-two beds.",
              ],
              becomes: "forty-two is in range, so it takes a hyphen",
            },
            {
              note: "Now check the fraction. It sits before the noun majority, describing it.",
              work: [
                "Incorrect: A two thirds majority approved the policy.",
                "Correct: A two-thirds majority approved the policy.",
              ],
              becomes: "fraction as modifier, so it takes a hyphen",
            },
            {
              note: "A fraction modifying a measurement behaves the same way.",
              work: ["Correct: Add three-fourths of a cup."],
            },
          ],
          answer:
            "Compound numbers twenty-one through ninety-nine take hyphens, and so do spelled-out fractions used as modifiers.",
        },
        {
          kind: "tip",
          body: "When a fraction is a noun, hyphen use can vary, but as a modifier before a noun the hyphen is expected. On the test, look for the fraction sitting in front of a noun.",
        },
      ],
      quickCheck: {
        prompt: "Which sentence is punctuated correctly?",
        choices: [
          "The ward has sixty-beds available.",
          "The unit has forty two beds.",
          "A two-thirds majority approved the policy.",
          "A two thirds majority approved the policy.",
        ],
        answer: 2,
        explanation:
          "Two-thirds is a spelled-out fraction modifying the noun majority, so it is hyphenated. Sixty is a single word that takes no hyphen, and forty-two falls in the twenty-one to ninety-nine range and needs one.",
      },
    },
    {
      id: "prefixes",
      title: "Prefixes that take a hyphen",
      blocks: [
        {
          kind: "concept",
          body: "Most prefixes attach with no hyphen: preexisting, nonsterile, reenter. A few situations call for one.",
        },
        {
          kind: "rule",
          title: "Use a hyphen in these cases",
          items: [
            "After the prefixes self-, ex- (meaning former), and all-: self-care, self-esteem, ex-husband, all-inclusive.",
            "Before a capitalized word or proper noun: anti-American, pre-Columbian, mid-July.",
            "To avoid a confusing double letter or a mixed-up meaning: re-sign (sign again) versus resign (quit).",
          ],
        },
        {
          kind: "example",
          title: "Deciding on two prefixes",
          steps: [
            {
              note: "Check the prefix against the short list of prefixes that always take a hyphen.",
              work: [
                "Incorrect: The patient needs help with selfcare.",
                "Correct: The patient needs help with self-care.",
              ],
              becomes: "self- always takes a hyphen",
            },
            {
              note: "Now check whether the word after the prefix is capitalized.",
              work: [
                "Incorrect: He held antiAmerican views.",
                "Correct: He held anti-American views.",
              ],
              becomes: "American is a proper noun, so anti- takes a hyphen",
            },
          ],
          answer:
            "Self-, ex-, and all- always take a hyphen, and any prefix takes one before a capitalized word.",
        },
        {
          kind: "mistake",
          body: "Hyphenating every prefix. Words like preexisting, nonsterile, and reenter are written closed up. Reach for the hyphen only with self-, ex-, and all-, before a capitalized word, or where the closed form would confuse the meaning.",
        },
      ],
      quickCheck: {
        prompt: "Which word is punctuated correctly?",
        choices: ["selfcare", "non-sterile", "anti-American", "pre-existing"],
        answer: 2,
        explanation:
          "American is a proper noun, so the prefix takes a hyphen. Self-care needs a hyphen, while nonsterile and preexisting are ordinary prefixes written closed up.",
      },
    },
    {
      id: "hyphen-vs-dash",
      title: "Hyphen vs dash",
      blocks: [
        {
          kind: "concept",
          body: "A hyphen and a dash are not the same mark. A hyphen is short and joins words or word parts within a single idea (mother-in-law, ten-year-old). A dash is longer and separates, setting off or interrupting part of a sentence.",
        },
        {
          kind: "rule",
          title: "Joins versus separates",
          items: [
            "Hyphen: joins. Example: a part-time nurse.",
            // The em dashes here are the subject being taught, not UI voice: this
            // lesson's whole point is that a spaced hyphen is not a dash.
            "Dash: separates. Example: She finished her shift \u2014 finally \u2014 and went home.",
          ],
        },
        {
          kind: "example",
          title: "Choosing the mark",
          steps: [
            {
              note: "Ask whether the mark is holding words together or pushing them apart.",
              work: [
                "\"a well-balanced diet\": well and balanced form one description of diet.",
              ],
              becomes: "joining, so use a hyphen with no spaces",
            },
            {
              note: "A hyphen stretched out with spaces does not become a dash, and it breaks the join.",
              work: ["Incorrect: a well - balanced diet"],
              becomes: "Correct: a well-balanced diet",
            },
          ],
          answer:
            "Use a hyphen where words join and a dash where a sentence is interrupted. Do not substitute one for the other.",
        },
        {
          kind: "mistake",
          body: "Do not use a hyphen where a dash is needed, and do not stretch a hyphen into a dash by adding spaces around it. The two marks do opposite jobs: one joins, the other separates.",
        },
      ],
      quickCheck: {
        prompt: "What is the difference between a hyphen and a dash?",
        choices: [
          "A hyphen separates parts of a sentence; a dash joins words",
          "A hyphen joins words or word parts; a dash separates part of a sentence",
          "They do the same job, but a dash is used in formal writing",
          "A hyphen is used with nouns; a dash is used with verbs",
        ],
        answer: 1,
        explanation:
          "A hyphen is short and joins, as in part-time nurse. A dash is longer and sets off or interrupts, as in \"She finished her shift \u2014 finally \u2014 and went home.\"",
      },
    },
  ],
};
