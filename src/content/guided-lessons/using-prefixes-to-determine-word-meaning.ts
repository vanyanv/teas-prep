import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for ENGLISH / vocabulary / "Using Prefixes to Determine Word
 * Meaning". Content carried over from the flat skill-lesson blocks,
 * restructured into the concept / rule / example / mistake / quick check
 * pattern. Quick checks are informal and never touch mastery.
 */
export const USING_PREFIXES_WORD_MEANING: GuidedLesson = {
  section: "ENGLISH",
  topic: "vocabulary",
  skill: "Using Prefixes to Determine Word Meaning",
  slug: "using-prefixes-to-determine-word-meaning",
  title: "Prefixes and Word Meaning",
  summary:
    "A prefix is added to the front of a root word and shifts its meaning, often signaling negation, direction, or amount.",
  minutes: [8, 10],
  objectives: [
    "Split an unfamiliar word into its prefix and root",
    "Combine a prefix meaning with a root meaning to estimate the whole word",
    "Recall the common prefixes of negation, direction, time, and amount",
    "Tell apart lookalike prefixes such as hyper- and hypo-",
  ],
  sections: [
    {
      id: "what-it-is",
      title: "What a prefix does",
      blocks: [
        {
          kind: "concept",
          body: "A prefix is a word part attached before a root or base word. It does not stand alone, but it reliably shifts the meaning of whatever root it joins.\n\nLearning a handful of common prefixes lets you decode unfamiliar terms. That pays off twice: on the English section, and later on clinical vocabulary, which is built from the same parts.",
        },
        {
          kind: "rule",
          title: "Decoding an unfamiliar word",
          ordered: true,
          items: [
            "Split the word into its parts: prefix and root",
            "Define the prefix",
            "Add the prefix meaning to the root meaning to estimate the whole",
          ],
        },
        {
          kind: "example",
          title: "Decoding \"unable\"",
          steps: [
            {
              note: "Split the word into a prefix and a root you recognize.",
              work: ["unable = un- + able"],
            },
            {
              note: "Define the prefix, then add it to the root meaning.",
              work: ["un- = not", "able = having the ability to do something"],
              becomes: "not able",
            },
          ],
          answer:
            "Unable means not able. The root carried the idea; the prefix reversed it.",
        },
        {
          kind: "tip",
          body: "Only trust the split if the leftover piece is a real root. In \"uncle\" the letters un- are not a prefix, because \"cle\" means nothing on its own.",
        },
      ],
      quickCheck: {
        prompt: "What is the first step in using a prefix to decode an unfamiliar word?",
        choices: [
          "Look for a suffix at the end of the word",
          "Split the word into its prefix and root",
          "Guess the meaning from the sentence's tone",
          "Replace the word with a synonym you already know",
        ],
        answer: 1,
        explanation:
          "You split the word first, then define the prefix, then add that meaning to the root. Without the split there is nothing to define.",
      },
    },
    {
      id: "negation-prefixes",
      title: "Prefixes of negation",
      blocks: [
        {
          kind: "concept",
          body: "The largest group of common prefixes means some version of \"not\". Several of them overlap in meaning, and which one a word uses is a matter of habit rather than logic, so learn them as a set.",
        },
        {
          kind: "rule",
          title: "Not, opposite, bad",
          items: [
            "un- : not, opposite of (unable)",
            "in- / im- : not (invisible, impossible)",
            "dis- : not, away, apart (disagree)",
            "non- : not (nonfatal)",
            "mal- : bad, badly (malnutrition)",
          ],
        },
        {
          kind: "example",
          title: "Decoding \"malnutrition\"",
          steps: [
            {
              note: "Split off the prefix and define it.",
              work: ["malnutrition = mal- + nutrition", "mal- = bad, badly"],
            },
            {
              note: "Add it to the root meaning.",
              work: ["nutrition = nourishment the body takes in"],
              becomes: "bad nourishment",
            },
          ],
          answer:
            "Malnutrition is poor or inadequate nourishment. Note that mal- means bad, not simply not.",
        },
        {
          kind: "mistake",
          body: "Do not treat mal- as another way to say not. Malnutrition is not the absence of nutrition; it is nutrition gone wrong. Reading mal- as not will overshoot the meaning of the word.",
        },
      ],
      quickCheck: {
        prompt: "Based on its prefix, what does \"nonfatal\" mean?",
        choices: [
          "Badly injured",
          "Fatal again",
          "Not fatal",
          "Fatal beforehand",
        ],
        answer: 2,
        explanation:
          "The prefix non- means not, so nonfatal describes something that does not cause death. Bad, again, and before belong to mal-, re-, and pre-.",
      },
    },
    {
      id: "direction-time-amount",
      title: "Direction, time, and amount",
      blocks: [
        {
          kind: "concept",
          body: "The rest of the common prefixes place the root somewhere: in time, in position, or on a scale of how much. These carry most of the clinical vocabulary you will meet.",
        },
        {
          kind: "tabs",
          tabs: [
            {
              label: "Amount",
              blocks: [
                {
                  kind: "rule",
                  items: [
                    "hyper- : over, above, excessive (hypertension)",
                    "hypo- : under, below, deficient (hypothermia)",
                  ],
                },
              ],
            },
            {
              label: "Time",
              blocks: [
                {
                  kind: "rule",
                  items: [
                    "pre- : before (preoperative)",
                    "post- : after (postpartum)",
                    "re- : again, back (rehydrate)",
                  ],
                },
              ],
            },
            {
              label: "Position",
              blocks: [
                {
                  kind: "rule",
                  items: [
                    "sub- : under, below (subcutaneous)",
                    "anti- : against (antibiotic)",
                  ],
                },
              ],
            },
          ],
        },
        {
          kind: "example",
          title: "Decoding \"preoperative\"",
          steps: [
            {
              note: "Split off the prefix and define it.",
              work: ["preoperative = pre- + operative", "pre- = before"],
            },
            {
              note: "Add it to the root meaning.",
              work: ["operative = having to do with an operation"],
              becomes: "before an operation",
            },
          ],
          answer:
            "Preoperative describes what happens before surgery. Swapping the prefix to post- moves the same root to after surgery.",
        },
        {
          kind: "tip",
          body: "When two prefixes share a root, the prefix is the whole difference between the words. Preoperative and postoperative describe the same surgery from opposite sides in time.",
        },
      ],
      quickCheck: {
        prompt: "A medication is described as subcutaneous. What does the prefix tell you?",
        choices: [
          "It goes under the skin",
          "It works against the skin",
          "It is applied to the skin again",
          "It is applied before the skin heals",
        ],
        answer: 0,
        explanation:
          "Sub- means under or below, so subcutaneous means beneath the skin. Against, again, and before belong to anti-, re-, and pre-.",
      },
    },
    {
      id: "lookalike-prefixes",
      title: "Lookalike prefixes",
      blocks: [
        {
          kind: "concept",
          body: "Some prefixes differ by a letter or two but mean opposite things. Those pairs are where careless reading costs the most, because the word does not just get vaguer, it flips.",
        },
        {
          kind: "rule",
          title: "Pairs to separate",
          items: [
            "hyper- (over, excessive) versus hypo- (under, deficient)",
            "pre- (before) versus post- (after)",
            "in- / im- (not) versus the ordinary word start it resembles, as in \"import\"",
          ],
        },
        {
          kind: "example",
          title: "One letter, opposite meanings",
          steps: [
            {
              note: "Start with hypertension and read the prefix carefully.",
              work: ["hypertension = hyper- + tension", "hyper- = over, excessive"],
              becomes: "excessive pressure: high blood pressure",
            },
            {
              note: "Now hypothermia, which differs only in the prefix vowel.",
              work: ["hypothermia = hypo- + thermia", "hypo- = under, deficient"],
              becomes: "deficient heat: body temperature too low",
            },
          ],
          answer:
            "Hyper- means too much and hypo- means too little. Reading past the vowel reverses the term.",
        },
        {
          kind: "mistake",
          body: "Mixing up hyper- and hypo- flips a medical term completely. Hypothermia (too little heat) and hyperthermia (too much heat) name opposite emergencies. Slow down on the prefix before you read the root.",
        },
      ],
      quickCheck: {
        prompt: "What does the prefix in \"hypoglycemia\" tell you about the blood sugar level?",
        choices: [
          "It is above normal",
          "It is below normal",
          "It has returned to normal",
          "It is working against normal levels",
        ],
        answer: 1,
        explanation:
          "Hypo- means under or deficient, so hypoglycemia is low blood sugar. Hyper- would signal the opposite, an excessive level.",
      },
    },
  ],
};
