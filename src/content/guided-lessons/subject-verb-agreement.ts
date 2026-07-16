import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for ENGLISH / conventions / "Subject-Verb Agreement". Content
 * carried over from the flat skill-lesson blocks, restructured into the
 * concept / rule / example / mistake / quick check pattern. Quick checks are
 * informal and never touch mastery.
 */
export const SUBJECT_VERB_AGREEMENT: GuidedLesson = {
  section: "ENGLISH",
  topic: "conventions",
  skill: "Subject-Verb Agreement",
  slug: "subject-verb-agreement",
  title: "Subject-Verb Agreement",
  summary:
    "A verb must agree in number with its subject, even when words come between them.",
  minutes: [8, 10],
  objectives: [
    "Match a singular subject with a singular verb and a plural subject with a plural verb",
    "Find the true subject by setting aside phrases that come between subject and verb",
    "Treat indefinite pronouns such as each, everyone, and either as singular",
    "Choose the verb form for subjects joined by and or by or",
  ],
  sections: [
    {
      id: "the-core-rule",
      title: "The core rule",
      blocks: [
        {
          kind: "concept",
          body: "Number means singular (one) or plural (more than one). A verb has to match its subject in number: a singular subject takes a singular verb, and a plural subject takes a plural verb.\n\nVerbs are easiest to hear in the present tense. A singular verb usually ends in s (the nurse works), while the plural verb usually does not (the nurses work). That is the reverse of what nouns do, which is why the pairing is worth checking rather than guessing.",
        },
        {
          kind: "rule",
          title: "Agreement in number",
          items: [
            "Singular subject, singular verb: the box is, the patient walks",
            "Plural subject, plural verb: the boxes are, the patients walk",
          ],
        },
        {
          kind: "example",
          title: "Matching the verb to the subject",
          steps: [
            {
              note: "Find the subject and decide whether it is one thing or more than one.",
              work: ["\"The chart (is / are) complete.\"", "Chart is one item."],
              becomes: "Singular subject",
            },
            {
              note: "Pick the verb form that matches.",
              work: ["\"The chart is complete.\""],
              becomes: "Singular verb",
            },
          ],
          answer:
            "The chart is complete. Make it plural and both parts change: the charts are complete.",
        },
      ],
      quickCheck: {
        prompt: "Which sentence pairs the subject and verb correctly?",
        choices: [
          "The patients waits in the lobby",
          "The patients wait in the lobby",
          "The patient wait in the lobby",
          "The patient waiting in the lobby",
        ],
        answer: 1,
        explanation:
          "Patients is plural, so it takes the plural verb wait. Remember that the s ending marks a singular verb, not a plural one.",
      },
    },
    {
      id: "words-in-between",
      title: "Words between subject and verb",
      blocks: [
        {
          kind: "concept",
          body: "Most agreement errors happen when a phrase sits between the subject and the verb. The phrase often ends in a noun of the opposite number, and the ear reaches for that nearby noun instead of the real subject.\n\nThe phrase never changes the subject. Set it aside, and the verb agrees with whatever is left.",
        },
        {
          kind: "tip",
          body: "Cross out any phrase that starts with of, in, or with. The verb agrees with the noun that remains, not with the noun nearest the verb.",
        },
        {
          kind: "example",
          title: "Crossing out the phrase",
          steps: [
            {
              note: "Read the full sentence and locate the phrase between the subject and the verb.",
              work: [
                "\"The box of supplies (is / are) on the counter.\"",
                "of supplies is the phrase in between.",
              ],
            },
            {
              note: "Cross it out and see what the subject actually is.",
              work: ["\"The box ... (is / are) on the counter.\"", "Box is singular."],
              becomes: "Singular subject",
            },
            {
              note: "Match the verb to that subject, not to supplies.",
              work: ["Correct: The box of supplies is on the counter.", "Incorrect: The box of supplies are on the counter."],
              becomes: "Singular verb",
            },
          ],
          answer:
            "The box of supplies is on the counter. Supplies is plural, but it is not the subject.",
        },
        {
          kind: "mistake",
          body: "Matching the verb to the closest noun. In \"The box of supplies are on the counter,\" supplies sits right next to the verb and sounds plural, but the subject is box. The word directly before the verb is often a trap.",
        },
      ],
      quickCheck: {
        prompt:
          "In \"The list of medications (was / were) updated,\" which verb is correct and why?",
        choices: [
          "Were, because medications is plural",
          "Was, because list is the subject and is singular",
          "Were, because the sentence describes several items",
          "Either one, since both nouns are in the sentence",
        ],
        answer: 1,
        explanation:
          "Cross out the phrase of medications and the subject is list, which is singular. The noun nearest the verb does not decide the form.",
      },
    },
    {
      id: "indefinite-pronouns",
      title: "Indefinite pronouns",
      blocks: [
        {
          kind: "concept",
          body: "Indefinite pronouns refer to people or things without naming them. Most of them are singular, even when they seem to point at a group, so they take a singular verb.\n\nWords like each, everyone, and either feel plural in meaning because they survey many people. Grammatically they still count as one at a time.",
        },
        {
          kind: "rule",
          title: "Singular indefinite pronouns",
          intro: "These take a singular verb:",
          items: [
            "each, either, neither",
            "everyone, everybody, someone, somebody",
            "anyone, anybody, no one, nobody",
          ],
        },
        {
          kind: "example",
          title: "Everyone takes a singular verb",
          steps: [
            {
              note: "Identify the subject and recognize it as an indefinite pronoun.",
              work: ["\"Everyone on the unit (has / have) a badge.\"", "Everyone is the subject."],
              becomes: "Singular subject",
            },
            {
              note: "Ignore the phrase in between, then use the singular verb.",
              work: ["\"Everyone ... has a badge.\""],
              becomes: "Singular verb",
            },
          ],
          answer:
            "Everyone on the unit has a badge. Both rules apply at once: everyone is singular, and on the unit is only an intervening phrase.",
        },
        {
          kind: "mistake",
          body: "Treating each or everyone as plural because it covers many people. \"Each of the nurses have a locker\" is incorrect; the subject is each, so it is \"Each of the nurses has a locker.\"",
        },
      ],
      quickCheck: {
        prompt: "Which sentence is correct?",
        choices: [
          "Each of the rooms need cleaning",
          "Everyone in the classes are ready",
          "Neither of the forms is complete",
          "Either of the options are acceptable",
        ],
        answer: 2,
        explanation:
          "Neither is a singular indefinite pronoun, so it takes is. Each, everyone, and either are singular too, so the other three sentences all use plural verbs by mistake.",
      },
    },
    {
      id: "compound-subjects",
      title: "Subjects joined by and or or",
      blocks: [
        {
          kind: "concept",
          body: "A compound subject is two or more subjects sharing one verb. The joining word decides the verb form, and and does not behave like or.\n\nSubjects joined by and are usually plural, because you are adding them together. With subjects joined by or, the verb agrees with the nearer subject, the one closest to the verb.",
        },
        {
          kind: "rule",
          title: "Which subject the verb follows",
          items: [
            "Joined by and: usually plural (The doctor and the nurse are here)",
            "Joined by or: agrees with the nearer subject (The doctor or the nurses are here)",
            "Joined by or, reversed: the nearer subject changes the verb (The nurses or the doctor is here)",
          ],
        },
        {
          kind: "example",
          title: "Same two subjects, different verbs",
          steps: [
            {
              note: "With and, add the subjects together.",
              work: ["\"The chart and the form are on the desk.\""],
              becomes: "Plural verb",
            },
            {
              note: "With or, look only at the subject nearest the verb.",
              work: ["\"The charts or the form is on the desk.\"", "Form is nearer, and it is singular."],
              becomes: "Singular verb",
            },
            {
              note: "Reverse the order and the nearer subject changes.",
              work: ["\"The form or the charts are on the desk.\"", "Charts is nearer, and it is plural."],
              becomes: "Plural verb",
            },
          ],
          answer:
            "And joins subjects into a plural. Or leaves them separate, so the verb follows whichever subject sits closest to it.",
        },
        {
          kind: "mistake",
          body: "Using a plural verb after or just because two subjects are named. Or presents one or the other, not both, so \"The nurses or the doctor sign the form\" should be \"The nurses or the doctor signs the form.\"",
        },
      ],
      quickCheck: {
        prompt:
          "In \"The manager or the assistants (is / are) reviewing the schedule,\" which verb is correct?",
        choices: [
          "Is, because manager comes first",
          "Are, because assistants is the nearer subject",
          "Is, because or always takes a singular verb",
          "Are, because two subjects are named",
        ],
        answer: 1,
        explanation:
          "With or, the verb agrees with the nearer subject, and assistants sits closest to the verb. Flip the order to \"The assistants or the manager\" and the correct verb becomes is.",
      },
    },
  ],
};
