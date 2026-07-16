import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for SCIENCE / anatomy-physiology / "Endocrine System".
 * Content carried over from the flat skill-lesson blocks, restructured into
 * the concept / rule / example / mistake / quick check pattern. Quick checks
 * are informal and never touch mastery.
 */
export const ENDOCRINE_SYSTEM: GuidedLesson = {
  section: "SCIENCE",
  topic: "anatomy-physiology",
  skill: "Endocrine System",
  slug: "endocrine-system",
  title: "The Endocrine System",
  summary:
    "Match the major endocrine glands to the hormones they secrete, and understand how insulin and glucagon regulate blood glucose.",
  minutes: [8, 10],
  objectives: [
    "Describe how hormonal signaling differs from nervous signaling",
    "Explain the roles of the hypothalamus and the pituitary gland",
    "Match the major endocrine glands to the hormones they secrete",
    "Trace how insulin and glucagon keep blood glucose stable",
  ],
  sections: [
    {
      id: "how-it-works",
      title: "How the endocrine system works",
      blocks: [
        {
          kind: "concept",
          body: "The endocrine system uses glands that secrete hormones directly into the bloodstream. The hormone travels in the blood and acts on distant target cells, so one gland can affect tissues far away from it.\n\nCompare this with the nervous system. Nerves send fast electrical signals along fixed pathways; hormones are slower to start but their effects last longer.",
        },
        {
          kind: "rule",
          title: "Two signaling systems",
          items: [
            "Nervous: electrical signals, fast to start, short lasting",
            "Endocrine: hormones in the blood, slow to start, long lasting",
            "The hypothalamus links the two systems",
          ],
        },
        {
          kind: "concept",
          body: "The hypothalamus sits in the brain and controls the pituitary gland. The pituitary is called the master gland because it regulates many other glands, but it is itself directed by the hypothalamus.",
        },
        {
          kind: "mistake",
          body: "Do not treat the pituitary as the top of the chain. It is the master gland over other glands, yet the hypothalamus is what directs the pituitary.",
        },
      ],
      quickCheck: {
        prompt:
          "Which statement best describes hormonal signaling compared with nervous signaling?",
        choices: [
          "Faster to start and shorter lasting",
          "Slower to start and longer lasting",
          "Faster to start and longer lasting",
          "Identical in speed, differing only in pathway",
        ],
        answer: 1,
        explanation:
          "Hormones travel in the bloodstream rather than along nerves, so they take longer to take effect but their effects persist.",
      },
    },
    {
      id: "glands-and-hormones",
      title: "Major gland and hormone pairs",
      blocks: [
        {
          kind: "concept",
          body: "Most endocrine questions test one pairing: which gland releases which hormone. Learn the pairs by gland, and note that two glands are split into parts that secrete different hormones (the pituitary into anterior and posterior, the adrenal into cortex and medulla).",
        },
        {
          kind: "tabs",
          tabs: [
            {
              label: "Pituitary",
              blocks: [
                {
                  kind: "rule",
                  title: "Pituitary gland",
                  intro: "Directed by the hypothalamus; regulates other glands.",
                  items: [
                    "Anterior: growth hormone, thyroid-stimulating hormone, ACTH, FSH, LH, prolactin",
                    "Posterior: ADH (antidiuretic hormone) and oxytocin",
                  ],
                },
                {
                  kind: "tip",
                  body: "The posterior pituitary holds only two hormones, ADH and oxytocin. Everything else on the pituitary list is anterior.",
                },
              ],
            },
            {
              label: "Calcium & metabolism",
              blocks: [
                {
                  kind: "rule",
                  title: "Thyroid and parathyroid",
                  items: [
                    "Thyroid: thyroxine (T4) and triiodothyronine (T3), which set metabolic rate",
                    "Thyroid: calcitonin, which lowers blood calcium",
                    "Parathyroid: parathyroid hormone, which raises blood calcium",
                  ],
                },
                {
                  kind: "tip",
                  body: "Calcitonin and parathyroid hormone are opposites: calcitonin takes calcium down, parathyroid hormone brings it up.",
                },
              ],
            },
            {
              label: "Adrenal & pancreas",
              blocks: [
                {
                  kind: "rule",
                  title: "Adrenal glands and pancreas",
                  items: [
                    "Adrenal cortex: cortisol and aldosterone",
                    "Adrenal medulla: epinephrine (adrenaline) and norepinephrine",
                    "Pancreas: insulin and glucagon",
                  ],
                },
              ],
            },
            {
              label: "Gonads & pineal",
              blocks: [
                {
                  kind: "rule",
                  title: "Gonads and pineal gland",
                  items: [
                    "Ovaries: estrogen and progesterone",
                    "Testes: testosterone",
                    "Pineal gland: melatonin, which is tied to sleep",
                  ],
                },
              ],
            },
          ],
        },
        {
          kind: "example",
          title: "Reading a gland question backward",
          steps: [
            {
              note: "A question asks which gland secretes aldosterone.",
              work: ["Aldosterone: adrenal cortex"],
            },
            {
              note: "Check the trap answer: the adrenal medulla is the other half of the same gland, but it releases epinephrine and norepinephrine instead.",
              work: ["Adrenal medulla: epinephrine, norepinephrine"],
            },
          ],
          answer: "The adrenal cortex",
        },
        {
          kind: "mistake",
          body: "Do not stop at the gland name when the gland has two parts. Adrenal cortex and adrenal medulla secrete different hormones, and so do the anterior and posterior pituitary.",
        },
      ],
      quickCheck: {
        prompt: "Which gland secretes parathyroid hormone?",
        choices: [
          "The thyroid",
          "The parathyroid",
          "The anterior pituitary",
          "The adrenal cortex",
        ],
        answer: 1,
        explanation:
          "The parathyroid secretes parathyroid hormone, which raises blood calcium. The nearby thyroid secretes calcitonin, which lowers it.",
      },
    },
    {
      id: "glucose-regulation",
      title: "Glucose regulation: insulin and glucagon",
      blocks: [
        {
          kind: "concept",
          body: "Blood glucose is controlled by the pancreas through negative feedback, using two hormones that pull in opposite directions. Whichever way glucose drifts, one hormone is released to push it back toward normal.",
        },
        {
          kind: "rule",
          title: "The opposing pair",
          items: [
            "Insulin: released when blood glucose is HIGH, such as after a meal. Cells take up glucose and the liver stores it as glycogen, which LOWERS blood sugar.",
            "Glucagon: released when blood glucose is LOW, such as between meals. The liver breaks glycogen back down into glucose and releases it, which RAISES blood sugar.",
          ],
        },
        {
          kind: "example",
          title: "Follow glucose after a meal, then hours later",
          steps: [
            {
              note: "A meal pushes blood glucose up, so the pancreas releases insulin.",
              work: ["Glucose HIGH", "Insulin released"],
              becomes: "Cells take up glucose; liver stores glycogen",
            },
            {
              note: "Glucose falls back toward normal, so insulin release slows. This is the negative feedback loop closing.",
              work: ["Glucose returns to normal"],
            },
            {
              note: "Hours later, between meals, glucose drops and the pancreas releases glucagon instead.",
              work: ["Glucose LOW", "Glucagon released"],
              becomes: "Liver breaks glycogen down and releases glucose",
            },
          ],
          answer:
            "The two hormones work in balance to keep blood glucose stable.",
        },
        {
          kind: "tip",
          body: "Keep the two apart by what the liver does. Insulin puts glucose into storage; glucagon takes it back out. Glycogen is the stored form the liver builds and breaks down, not a hormone.",
        },
        {
          kind: "concept",
          body: "In diabetes mellitus this control fails. Insufficient insulin or insulin resistance means glucose is not taken up and stored, so blood glucose stays dangerously high.",
        },
        {
          kind: "mistake",
          body: "Do not swap the triggers. Insulin answers high blood sugar and lowers it; glucagon answers low blood sugar and raises it. Reversing the pair is the most common endocrine error on the test.",
        },
      ],
      quickCheck: {
        prompt:
          "Blood glucose falls several hours after a meal. Which hormone is released, and what does it do?",
        choices: [
          "Insulin, which tells the liver to store glucose as glycogen",
          "Insulin, which tells the liver to release stored glucose",
          "Glucagon, which tells the liver to break glycogen down into glucose",
          "Glucagon, which tells body cells to take up more glucose",
        ],
        answer: 2,
        explanation:
          "Low blood glucose triggers glucagon, which makes the liver break glycogen back down into glucose and release it, raising blood sugar.",
      },
    },
  ],
};
