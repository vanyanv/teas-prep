import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for READING / integration-knowledge / "Evaluate an Argument".
 * Content carried over from the flat skill-lesson blocks, restructured into
 * the concept / rule / example / mistake / quick check pattern. Quick checks
 * are informal and never touch mastery.
 */
export const EVALUATE_AN_ARGUMENT: GuidedLesson = {
  section: "READING",
  topic: "integration-knowledge",
  skill: "Evaluate an Argument",
  slug: "evaluate-an-argument",
  title: "Evaluate an Argument",
  summary:
    "Judge whether a writer's claim is well supported by reasons and evidence and free of weak reasoning.",
  minutes: [8, 10],
  objectives: [
    "Separate a writer's claim from the reasons and evidence behind it",
    "Judge whether support is relevant, sufficient, and logical",
    "Distinguish fact from opinion in a passage",
    "Identify which evidence strengthens or weakens an argument",
  ],
  sections: [
    {
      id: "parts-of-an-argument",
      title: "The parts of an argument",
      blocks: [
        {
          kind: "concept",
          body: "An argument is not a fight. It is a claim plus the support a writer offers for it.\n\nEvery argument has three parts. The claim is the main point the writer wants you to accept. The reasons say why you should accept it. The evidence is the specific material (data, examples, expert testimony, observations) that backs each reason.",
        },
        {
          kind: "rule",
          title: "Find these three parts first",
          ordered: true,
          items: [
            "Claim: the point the writer wants you to accept",
            "Reasons: why the writer says you should accept it",
            "Evidence: the specific facts or examples backing each reason",
          ],
        },
        {
          kind: "tip",
          body: "The claim is usually the sentence you could put after 'The writer wants me to believe that...'. Everything else in the passage is there to hold that sentence up.",
        },
        {
          kind: "example",
          title: "Break an argument into its parts",
          steps: [
            {
              note: "Read the passage and find the sentence the writer wants you to accept.",
              work: [
                "'Hospitals should stock more portable ultrasound units.'",
              ],
              becomes: "That is the claim.",
            },
            {
              note: "Ask why the writer says so. That answer is the reason.",
              work: ["'They shorten the wait for bedside imaging.'"],
              becomes: "That is the reason.",
            },
            {
              note: "Ask what specific material backs the reason.",
              work: [
                "'A 2019 study found bedside scans cut average wait times by 40 minutes.'",
              ],
              becomes: "That is the evidence.",
            },
          ],
          answer:
            "Claim: stock more units. Reason: they shorten waits. Evidence: the study's 40-minute figure.",
        },
      ],
      quickCheck: {
        prompt:
          "A writer states: 'Schools should serve later lunches, because students concentrate poorly when they eat at 10:30 a.m.' What is the claim?",
        choices: [
          "Students concentrate poorly",
          "Schools should serve later lunches",
          "Students eat at 10:30 a.m.",
          "Concentration matters in school",
        ],
        answer: 1,
        explanation:
          "The claim is the point the writer wants you to accept. The poor concentration is the reason offered in support of it.",
      },
    },
    {
      id: "judging-the-support",
      title: "Judging the support",
      blocks: [
        {
          kind: "concept",
          body: "Once you have the parts, evaluating means deciding whether the support actually holds the claim up. You are asking three things of the evidence: is it relevant, is there enough of it, and does it follow logically.\n\nSupport fails when it relies on opinion or faulty thinking rather than proof. Emotional language often stands in for evidence: it makes a claim feel true without giving you any reason to think it is.",
        },
        {
          kind: "rule",
          title: "Ask these three questions of the evidence",
          items: [
            "Relevant: does it actually bear on this claim, or is it about something adjacent?",
            "Sufficient: is there enough of it, or does one anecdote carry the whole argument?",
            "Logical: does the conclusion really follow, or is a step missing?",
          ],
        },
        {
          kind: "concept",
          body: "A fact can be checked against the world and confirmed or disproved. An opinion states a belief, preference, or judgment.\n\n- Fact: 'The clinic saw 4,200 patients last year.'\n- Opinion: 'The clinic is the best in the county.'\n\nOpinions are not forbidden in an argument, and a writer may reasonably hold one. But an opinion cannot serve as the evidence for a claim, because it is exactly the thing that needs support.",
        },
        {
          kind: "mistake",
          body: "Do not judge an argument by whether you agree with the claim. A claim you happen to like can be badly supported, and a claim you dislike can be argued well. Evaluate the support, not the conclusion.",
        },
      ],
      quickCheck: {
        prompt:
          "Which statement is an opinion rather than a fact?",
        choices: [
          "The hospital added twelve beds in March",
          "The new wing cost 3.1 million dollars",
          "The new wing is a waste of the hospital's money",
          "The wing opened before the flu season began",
        ],
        answer: 2,
        explanation:
          "Calling something a waste states a judgment, which cannot be checked or disproved. The other three could each be verified against records.",
      },
    },
    {
      id: "strengthen-and-weaken",
      title: "Strengthening and weakening",
      blocks: [
        {
          kind: "concept",
          body: "The TEAS asks about arguments in a few predictable ways: which evidence best supports a claim, which choice weakens the argument, or whether a given statement is fact or opinion.\n\nStrong support is specific and on topic. It names a number, a study, a documented case, and it bears directly on the claim being made. Weak support is vague, off topic, or emotional.",
        },
        {
          kind: "rule",
          title: "Reading the answer choices",
          items: [
            "Strengthens: adds specific, on-topic evidence for the claim",
            "Weakens: gives a reason the claim may not hold, or offers another explanation for the evidence",
            "Irrelevant: true and interesting, but does not touch this claim",
            "Emotional: stirs feeling but proves nothing",
          ],
        },
        {
          kind: "example",
          title: "Evaluate the clinic's argument",
          steps: [
            {
              note: "Identify the claim and its evidence.",
              work: [
                "Claim: 'The clinic should extend evening hours.'",
                "Evidence: a survey showing most patients work daytime jobs.",
              ],
            },
            {
              note: "Ask whether the evidence is relevant. If patients work days, they cannot come during day hours, which is exactly why evening hours would help.",
              work: [],
              becomes: "Relevant and specific, so it is strong support.",
            },
            {
              note: "Now test a second line from the passage.",
              work: ["'Everyone knows mornings are inconvenient.'"],
              becomes:
                "Opinion, not support. 'Everyone knows' asserts agreement instead of showing evidence.",
            },
            {
              note: "Consider what would weaken the argument: a fact that undercuts the reason.",
              work: [
                "'A prior evening pilot ran at 15 percent capacity for six months.'",
              ],
              becomes:
                "Weakens it, because the surveyed patients did not actually use evening hours when offered.",
            },
          ],
          answer:
            "The survey supports the claim; the 'everyone knows' line does not; the failed pilot weakens the claim.",
        },
        {
          kind: "tip",
          body: "Separate the claim from its backing, then ask whether the backing would convince a skeptical reader who shares no opinions with the author.",
        },
        {
          kind: "mistake",
          body: "A choice that simply restates the claim in new words is not evidence for it. Support has to bring in something the claim did not already say.",
        },
      ],
      quickCheck: {
        prompt:
          "A writer claims a town should add bike lanes because cycling is safer than driving. Which choice best supports the claim?",
        choices: [
          "Many residents say they enjoy cycling on weekends",
          "Towns with protected bike lanes report 38 percent fewer cyclist injuries",
          "Driving in traffic is frustrating for everyone",
          "Bike lanes would make the town a better place to live",
        ],
        answer: 1,
        explanation:
          "Only the injury figure is specific and on topic, tying bike lanes to the safety reason. The others state preference, feeling, or opinion.",
      },
    },
  ],
};
