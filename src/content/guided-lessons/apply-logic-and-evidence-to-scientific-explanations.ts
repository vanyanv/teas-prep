import type { GuidedLesson } from "../guided-lesson-types";

/** Guided lesson for SCIENCE / scientific-reasoning / "Apply Logic and
 *  Evidence to Scientific Explanations". Content carried over from the flat
 *  skill-lesson blocks, restructured into the concept / rule / example /
 *  mistake / quick check pattern. */
export const APPLY_LOGIC_EVIDENCE_SCIENTIFIC_EXPLANATIONS: GuidedLesson = {
  section: "SCIENCE",
  topic: "scientific-reasoning",
  skill: "Apply Logic and Evidence to Scientific Explanations",
  slug: "apply-logic-and-evidence-to-scientific-explanations",
  title: "Logic and Evidence in Scientific Explanations",
  summary:
    "Judge whether evidence actually supports a claim, and separate correlation from causation.",
  minutes: [6, 8],
  objectives: [
    "Distinguish correlation from causation",
    "Identify a confounding variable that could explain a link",
    "Recognize the conclusion wording that matches the evidence",
    "Decide when a study can support a cause-and-effect claim",
  ],
  sections: [
    {
      id: "correlation-vs-causation",
      title: "Correlation vs. causation",
      blocks: [
        {
          kind: "concept",
          body: "A strong scientific explanation is backed by evidence and sound logic, not just a pattern you noticed. The most important distinction to hold onto is the difference between two things moving together and one thing making the other happen.",
        },
        {
          kind: "rule",
          title: "The key terms",
          items: [
            "Correlation: two things change together",
            "Causation: one thing actually makes the other happen",
            "Two variables can move together because a third hidden factor drives both, or by pure coincidence",
          ],
        },
        {
          kind: "tip",
          body: "Only a controlled experiment, not a single observation, can support a cause-and-effect claim.",
        },
      ],
      quickCheck: {
        prompt:
          "An observational study finds that two variables rise together. What can you conclude from this alone?",
        choices: [
          "The first variable causes the second",
          "The second variable causes the first",
          "The two variables are correlated",
          "There is no real relationship between them",
        ],
        answer: 2,
        explanation:
          "Rising together shows correlation only. A causal claim in either direction needs a controlled experiment, and a real pattern is still a relationship.",
      },
    },
    {
      id: "how-teas-tests-it",
      title: "How the TEAS tests it",
      blocks: [
        {
          kind: "concept",
          body: "Questions give a finding and ask which conclusion is justified. The answer choices are built around how far the evidence actually reaches.",
        },
        {
          kind: "rule",
          title: "What to expect",
          items: [
            "The trap answer states causation (X causes Y) when the data only show correlation (X and Y rise together)",
            "Some questions ask you to spot a confounding variable that could explain the link",
            "They reward the cautious wording, such as \"is associated with\" instead of \"causes,\" when the study only observed a pattern",
          ],
        },
        {
          kind: "mistake",
          body: "Choosing the answer that sounds most confident. On the TEAS, the bold causal claim is usually the trap; the justified conclusion matches the evidence, no more.",
        },
      ],
      quickCheck: {
        prompt:
          "A survey finds that nurses who drink more coffee also report more stress. Which conclusion is justified?",
        choices: [
          "Coffee causes stress in nurses",
          "Reducing coffee would reduce stress",
          "Coffee intake is associated with higher reported stress",
          "Coffee and stress are unrelated",
        ],
        answer: 2,
        explanation:
          "The survey only observed a pattern, so the cautious wording \"is associated with\" is the conclusion the evidence supports. Any causal claim goes beyond the data.",
      },
    },
    {
      id: "worked-example",
      title: "Worked example: sunscreen and heat exhaustion",
      blocks: [
        {
          kind: "example",
          title:
            "A survey finds that towns selling more sunscreen also report more cases of heat exhaustion. Can we conclude sunscreen causes heat exhaustion?",
          steps: [
            {
              note: "Ask what the data actually show: sunscreen sales and heat exhaustion rise together, which is a correlation.",
              work: [],
            },
            {
              note: "Look for a third factor that could drive both.",
              work: [
                "Hot, sunny weather increases sunscreen sales",
                "Hot, sunny weather also increases heat exhaustion",
              ],
            },
            {
              note: "Name the relationship: this is correlation explained by a confounding variable, not causation.",
              work: [],
            },
          ],
          answer:
            "No. The two are associated, with weather as the likely common cause.",
        },
        {
          kind: "mistake",
          body: "Do not conclude that sunscreen causes heat exhaustion just because the two rise together. When a hidden factor can drive both variables, the link between them is not causal.",
        },
      ],
      quickCheck: {
        prompt:
          "In the sunscreen example, what is the confounding variable?",
        choices: [
          "The brand of sunscreen sold",
          "Hot, sunny weather",
          "The number of towns surveyed",
          "How heat exhaustion was reported",
        ],
        answer: 1,
        explanation:
          "Hot, sunny weather is the hidden third factor that drives both sunscreen sales and heat exhaustion, explaining the correlation without any causal link between them.",
      },
    },
    {
      id: "testing-causal-claims",
      title: "Testing a causal claim",
      blocks: [
        {
          kind: "concept",
          body: "When an answer choice says \"causes,\" put the study itself on trial before you accept the wording.",
        },
        {
          kind: "rule",
          title: "Ask before accepting \"causes\"",
          ordered: true,
          items: [
            "Did the study actually change one variable?",
            "Did it control the rest?",
            "If it only observed, downgrade the claim to \"is linked to\"",
          ],
        },
        {
          kind: "tip",
          body: "Watch for a hidden third variable; it is the most common reason a correlation is not causation.",
        },
      ],
      quickCheck: {
        prompt:
          "Which kind of study can support the claim that X causes Y?",
        choices: [
          "A single observation of X and Y occurring together",
          "A survey showing X and Y rise together",
          "A controlled experiment that changes X and controls other variables",
          "A larger survey confirming the same pattern",
        ],
        answer: 2,
        explanation:
          "Only a controlled experiment, which changes one variable and controls the rest, can support causation. Observations and surveys of any size show correlation only.",
      },
    },
  ],
};
