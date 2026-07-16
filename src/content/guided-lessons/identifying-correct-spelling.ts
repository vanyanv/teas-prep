import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for ENGLISH / conventions / "Identifying Correct Spelling".
 * Content carried over from the flat skill-lesson blocks, restructured into
 * the concept / rule / example / mistake / quick check pattern. Quick checks
 * are informal and never touch mastery.
 */
export const IDENTIFYING_CORRECT_SPELLING: GuidedLesson = {
  section: "ENGLISH",
  topic: "conventions",
  skill: "Identifying Correct Spelling",
  slug: "identifying-correct-spelling",
  title: "Identifying Correct Spelling",
  summary:
    "Correct spelling follows standard patterns, including tricky rules for adding endings and commonly confused words.",
  minutes: [8, 10],
  objectives: [
    "Apply the i before e except after c pattern",
    "Drop or keep a silent e when adding an ending",
    "Decide when to double a final consonant",
    "Spot misspelled words in a sentence",
    "Choose the correct homophone for the meaning",
  ],
  sections: [
    {
      id: "i-before-e",
      title: "I before e except after c",
      blocks: [
        {
          kind: "concept",
          body: "You cannot memorize every word in English, and you do not need to. Most spelling errors on the TEAS come from a small set of patterns, so learning the patterns is what pays off.\n\nThe first pattern covers words where an i and an e sit side by side. In many of these words the i comes first, unless the pair follows a c, in which case the e comes first.",
        },
        {
          kind: "rule",
          title: "The pattern",
          items: [
            "Normally i comes before e: believe",
            "After a c, e comes before i: receive",
          ],
        },
        {
          kind: "example",
          title: "Applying the pattern",
          steps: [
            {
              note: "In believe, the ie pair follows an l, not a c, so i goes first.",
              work: ["bel + ie + ve = believe"],
            },
            {
              note: "In receive, the pair follows a c, so e goes first.",
              work: ["rec + ei + ve = receive"],
            },
          ],
          answer: "believe, receive",
        },
        {
          kind: "mistake",
          body: "Do not treat this as a law that never bends. It holds for many words, so use it to check your instinct rather than to overrule a spelling you are confident about.",
        },
      ],
      quickCheck: {
        prompt: "Which spelling follows the i before e except after c pattern?",
        choices: ["recieve", "receive", "beleive", "releive"],
        answer: 1,
        explanation:
          "The ei pair in receive follows a c, so e comes first. Recieve reverses it, and beleive reverses the pair the other way, putting e before i where no c precedes.",
      },
    },
    {
      id: "silent-e-endings",
      title: "Endings after a silent e",
      blocks: [
        {
          kind: "concept",
          body: "Many words end in a silent e: hope, use, care. When you add an ending to one of these words, what happens to the e depends on how the ending starts.",
        },
        {
          kind: "rule",
          title: "Adding an ending to a silent e word",
          items: [
            "Ending starts with a vowel (-ing, -ed, -able): drop the e",
            "Ending starts with a consonant (-ful, -ment, -ly): keep the e",
          ],
        },
        {
          kind: "mistake",
          body: "Like the i before e pattern, this one bends. A word ending in soft c or g keeps its e before a vowel ending, to hold the soft sound: notice becomes noticeable and change becomes changeable, not noticable or changable. A few common words break the rule the other way: argue becomes argument and true becomes truly.",
        },
        {
          kind: "example",
          title: "hope plus an ending",
          steps: [
            {
              note: "The ending -ing starts with a vowel, so the silent e drops.",
              work: ["hope + ing = hoping"],
            },
            {
              note: "The ending -ful starts with a consonant, so the e stays.",
              work: ["hope + ful = hopeful"],
            },
          ],
          answer: "hoping, hopeful",
        },
        {
          kind: "tip",
          body: "Look at the first letter of the ending, not the whole ending. That one letter decides whether the e goes or stays.",
        },
      ],
      quickCheck: {
        prompt: "Which is the correct spelling of use plus the ending -ing?",
        choices: ["useing", "using", "usseing", "usinge"],
        answer: 1,
        explanation:
          "The ending -ing starts with a vowel, so the silent e in use drops: using. Keeping the e gives the misspelling useing.",
      },
    },
    {
      id: "doubling-consonants",
      title: "Doubling the final consonant",
      blocks: [
        {
          kind: "concept",
          body: "Some short words double their last letter before an ending: stop becomes stopped, not stoped. This happens only when the word has a specific shape, so check the shape before you double anything.",
        },
        {
          kind: "rule",
          title: "Double the final consonant when all of these are true",
          items: [
            "The word has one syllable",
            "It ends in one vowel followed by one consonant",
            "That final consonant is not w, x, or y",
            "The ending you are adding starts with a vowel",
          ],
        },
        {
          kind: "mistake",
          body: "The w, x, and y condition is easy to skip, and it is the one that catches people. Box and play both have the one vowel plus one consonant shape, but they never double: the spellings are boxed and playing, not boxxed or playying.",
        },
        {
          kind: "example",
          title: "Why stop doubles",
          steps: [
            {
              note: "Check the shape of the word. Stop is one syllable and ends in the vowel o plus the single consonant p.",
              work: ["st + o + p"],
            },
            {
              note: "The ending -ed starts with a vowel, so all three conditions hold. Double the p.",
              work: ["stop + ed = stopped"],
            },
          ],
          answer: "stopped",
        },
        {
          kind: "mistake",
          body: "Do not double when the word ends in two consonants or two vowels. Help ends in l plus p, so it is helped, not helpped, and rain ends in two vowels plus n, so it is rained.",
        },
      ],
      quickCheck: {
        prompt: "Which is the correct spelling of run plus the ending -ing?",
        choices: ["runing", "running", "runnning", "runeing"],
        answer: 1,
        explanation:
          "Run is one syllable ending in one vowel plus one consonant, and -ing starts with a vowel, so the n doubles: running.",
      },
    },
    {
      id: "spotting-misspellings",
      title: "Spotting a misspelled word",
      blocks: [
        {
          kind: "concept",
          body: "A common question shows you a sentence and asks whether it is spelled correctly, or which version is correct. The errors are usually vowel swaps and doubled letters inside otherwise familiar words, so work word by word rather than judging the sentence as a whole.",
        },
        {
          kind: "example",
          title: "Compare the two versions",
          expression:
            "The nurse will administer the medication and document the dosage.",
          steps: [
            {
              note: "Read the incorrect version and mark each word that looks off.",
              work: [
                "The nurse will administar the medecation and documment the dosege.",
              ],
            },
            {
              note: "Check the suspect words one at a time. Three have swapped vowels and one has a doubled letter that does not belong.",
              work: [
                "administar becomes administer",
                "medecation becomes medication",
                "documment becomes document",
                "dosege becomes dosage",
              ],
            },
          ],
          answer:
            "The nurse will administer the medication and document the dosage.",
        },
        {
          kind: "tip",
          body: "Slow down on the unstressed vowels in the middle of long words. That is where administar and dosege go wrong, and it is the spot your eye is most likely to skip.",
        },
      ],
      quickCheck: {
        prompt: "Which sentence is spelled correctly?",
        choices: [
          "The nurse will administar the medication and document the dosage.",
          "The nurse will administer the medecation and document the dosage.",
          "The nurse will administer the medication and document the dosage.",
          "The nurse will administer the medication and documment the dosege.",
        ],
        answer: 2,
        explanation:
          "Only the third version spells every word correctly. The others swap a vowel in administer or medication, or double the m in document and misspell dosage.",
      },
    },
    {
      id: "homophones",
      title: "Words that sound alike",
      blocks: [
        {
          kind: "concept",
          body: "Homophones sound the same but mean different things and are spelled differently. Spelling rules cannot help you here, because each spelling is correct on its own. Only the meaning of the sentence tells you which one belongs.",
        },
        {
          kind: "rule",
          title: "Pairs and groups worth knowing",
          items: [
            "their (belonging to them), there (a place), they're (they are)",
            "patient (a person receiving care) and patience (the ability to wait calmly)",
          ],
        },
        {
          kind: "example",
          title: "Let the meaning choose the spelling",
          steps: [
            {
              note: "Read the sentence and ask what it actually means.",
              work: ["The nurses left ____ charts at the station."],
            },
            {
              note: "The charts belong to the nurses, so the possessive spelling is the one that fits.",
              work: [
                "their charts: the charts belonging to them",
                "there charts: no meaning, there names a place",
                "they're charts: reads as they are charts",
              ],
            },
          ],
          answer: "The nurses left their charts at the station.",
        },
        {
          kind: "tip",
          body: "Read the sentence aloud and confirm the meaning matches the spelling. For they're, try replacing it with they are; if the sentence still makes sense, they're is correct.",
        },
        {
          kind: "mistake",
          body: "Do not trust sound alone. Their, there, and they're are identical to the ear, so a spelling can sound perfect in your head and still be the wrong word.",
        },
      ],
      quickCheck: {
        prompt:
          "Which word correctly completes the sentence: The patient thanked the nurse for her ____ during the long wait.",
        choices: ["patients", "patience", "patients'", "patient"],
        answer: 1,
        explanation:
          "The sentence names the ability to wait calmly, which is patience. Patient names a person receiving care, so it does not fit after her.",
      },
    },
  ],
};
