import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for SCIENCE / anatomy-physiology / "Reproductive System".
 * Content carried over from the flat skill-lesson blocks, restructured into
 * the concept / rule / example / mistake / quick check pattern. Quick checks
 * are informal and never touch mastery.
 */
export const REPRODUCTIVE_SYSTEM: GuidedLesson = {
  section: "SCIENCE",
  topic: "anatomy-physiology",
  skill: "Reproductive System",
  slug: "reproductive-system",
  title: "Reproductive System",
  summary:
    "Know the male and female reproductive structures and the basic roles they play in producing gametes and supporting reproduction.",
  minutes: [8, 10],
  objectives: [
    "Identify the male reproductive structures and their functions",
    "Trace the path sperm take from production to exit",
    "Identify the female reproductive structures and their functions",
    "Trace the path an egg takes from ovulation through implantation",
    "Compare how the urinary and reproductive tracts relate in males and females",
  ],
  sections: [
    {
      id: "testes-scrotum",
      title: "Testes and scrotum",
      blocks: [
        {
          kind: "concept",
          body: "The male system has two jobs: produce sperm and deliver them. Both start in the testes, the male gonads.\n\nThe testes produce sperm and the hormone testosterone. They sit outside the body in the scrotum, a pouch of skin that holds them away from the trunk. That position is not incidental: sperm production requires a temperature cooler than the body's core, and the scrotum provides it.",
        },
        {
          kind: "rule",
          title: "What the testes do",
          items: [
            "Produce sperm, the male gamete",
            "Produce testosterone, the male sex hormone",
            "Sit in the scrotum, where the cooler temperature allows sperm production",
          ],
        },
        {
          kind: "example",
          title: "Why the scrotum hangs outside the body",
          steps: [
            {
              note: "Sperm production needs a temperature below core body temperature.",
              work: [],
            },
            {
              note: "The scrotum holds the testes away from the trunk, keeping them cooler.",
              work: ["scrotum position = cooler testes = sperm production"],
            },
          ],
          answer:
            "The external position of the scrotum is what keeps the testes cool enough to make sperm.",
        },
        {
          kind: "mistake",
          body: "The scrotum does not produce sperm or testosterone. It is the pouch that holds the testes; the testes do the producing.",
        },
      ],
      quickCheck: {
        prompt:
          "Why are the testes located in the scrotum rather than inside the abdomen?",
        choices: [
          "The scrotum produces testosterone, so the testes must be near it",
          "Sperm production requires a temperature cooler than the body's core",
          "The abdomen has no room for the testes",
          "The scrotum stores mature sperm until they are released",
        ],
        answer: 1,
        explanation:
          "The scrotum holds the testes outside the trunk because sperm production needs a cooler temperature than the body's core provides. The testes, not the scrotum, make testosterone.",
      },
    },
    {
      id: "sperm-pathway",
      title: "The path of sperm",
      blocks: [
        {
          kind: "concept",
          body: "Sperm made in the testes are not ready to go. They mature and are stored in the epididymis, then travel out through the vas deferens.\n\nAlong the way, accessory glands add fluid. Sperm plus that fluid is semen. The seminal vesicles, prostate gland, and bulbourethral (Cowper's) glands all contribute. Semen then exits through the urethra, which runs through the penis.",
        },
        {
          kind: "rule",
          title: "Sperm travel in this order",
          ordered: true,
          items: [
            "Testes: sperm are produced",
            "Epididymis: sperm mature and are stored",
            "Vas deferens: sperm travel out, joining glandular fluids",
            "Urethra: semen exits through the penis",
          ],
        },
        {
          kind: "rule",
          title: "The accessory glands that make semen",
          items: [
            "Seminal vesicles",
            "Prostate gland",
            "Bulbourethral (Cowper's) glands",
          ],
        },
        {
          kind: "tip",
          body: "In males the urethra is shared: it carries both urine and semen. The male urinary and reproductive systems use one common exit.",
        },
        {
          kind: "example",
          title: "Trace a sperm cell from start to exit",
          steps: [
            {
              note: "Production and maturation happen in two different structures.",
              work: ["testis (made) → epididymis (matured, stored)"],
            },
            {
              note: "The vas deferens carries sperm toward the urethra, and the glands add fluid to form semen.",
              work: ["vas deferens + gland fluids = semen"],
            },
            {
              note: "Semen leaves through the shared urethra.",
              work: ["urethra → out through the penis"],
            },
          ],
          answer: "Testes → epididymis → vas deferens → urethra",
        },
        {
          kind: "mistake",
          body: "Do not confuse the epididymis with the vas deferens. The epididymis is where sperm mature and wait; the vas deferens is the tube that moves them out.",
        },
      ],
      quickCheck: {
        prompt: "Where do sperm mature and get stored after being produced?",
        choices: [
          "The vas deferens",
          "The prostate gland",
          "The epididymis",
          "The seminal vesicles",
        ],
        answer: 2,
        explanation:
          "Sperm mature and are stored in the epididymis, then travel through the vas deferens. The prostate and seminal vesicles add fluid rather than store sperm.",
      },
    },
    {
      id: "ovaries",
      title: "Ovaries and ovulation",
      blocks: [
        {
          kind: "concept",
          body: "The female system produces eggs and supports pregnancy. The ovaries are the female gonads, and like the testes they do two things at once.\n\nThe ovaries produce eggs (ova) and the hormones estrogen and progesterone. During ovulation, an egg is released from an ovary and swept into the fallopian tube.",
        },
        {
          kind: "rule",
          title: "What the ovaries do",
          items: [
            "Produce eggs (ova), the female gamete",
            "Produce estrogen and progesterone, the female sex hormones",
            "Release an egg at ovulation",
          ],
        },
        {
          kind: "example",
          title: "Match each gonad to what it makes",
          steps: [
            {
              note: "Each gonad produces both a gamete and hormones.",
              work: [
                "testes → sperm + testosterone",
                "ovaries → ova + estrogen and progesterone",
              ],
            },
            {
              note: "Ovulation is the moment the ovary releases its gamete into the tube.",
              work: ["ovary → egg released → fallopian tube"],
            },
          ],
          answer:
            "The ovaries are the female counterpart to the testes: gametes plus hormones.",
        },
        {
          kind: "mistake",
          body: "The uterus does not produce eggs or the female sex hormones. The ovaries do both; the uterus houses a developing fetus.",
        },
      ],
      quickCheck: {
        prompt: "Which structure produces both eggs and the hormone estrogen?",
        choices: [
          "The uterus",
          "The fallopian tube",
          "The cervix",
          "The ovary",
        ],
        answer: 3,
        explanation:
          "The ovaries produce eggs (ova) along with estrogen and progesterone, making them the female counterpart to the testes.",
      },
    },
    {
      id: "egg-pathway",
      title: "The path of the egg and the uterus",
      blocks: [
        {
          kind: "concept",
          body: "After ovulation the egg enters the fallopian tube (oviduct). Fertilization typically happens here, in the tube, not in the uterus.\n\nThe fertilized egg then travels to the uterus, which supports a developing fetus. Its muscular wall is the myometrium and its inner lining is the endometrium. The lower neck of the uterus is the cervix, and below it is the vagina, which receives sperm and serves as the birth canal.",
        },
        {
          kind: "rule",
          title: "The egg travels in this order",
          ordered: true,
          items: [
            "Ovary: the egg is released at ovulation",
            "Fallopian tube (oviduct): fertilization typically occurs here",
            "Uterus: the fertilized egg arrives and a fetus develops",
            "Cervix and vagina: the pathway out, and the birth canal",
          ],
        },
        {
          kind: "rule",
          title: "Two layers of the uterus",
          items: [
            "Myometrium: the muscular wall",
            "Endometrium: the inner lining",
          ],
        },
        {
          kind: "tip",
          body: "Unlike in males, the female urinary and reproductive tracts have separate openings. Nothing in the female reproductive tract carries urine.",
        },
        {
          kind: "example",
          title: "Where does fertilization happen?",
          steps: [
            {
              note: "The egg is swept into the fallopian tube right after ovulation, and sperm meet it there.",
              work: ["ovulation → fallopian tube → fertilization"],
            },
            {
              note: "Only after fertilization does the egg move on to the uterus.",
              work: ["fertilized egg → uterus → develops"],
            },
          ],
          answer:
            "Fertilization typically occurs in the fallopian tube; the uterus is where development happens.",
        },
        {
          kind: "mistake",
          body: "Fertilization does not normally occur in the uterus. The egg is fertilized in the fallopian tube and travels to the uterus afterward.",
        },
      ],
      quickCheck: {
        prompt: "Where does fertilization of an egg typically occur?",
        choices: [
          "In the ovary, before the egg is released",
          "In the fallopian tube",
          "In the uterus, on the endometrium",
          "In the cervix",
        ],
        answer: 1,
        explanation:
          "The egg is swept into the fallopian tube at ovulation and is typically fertilized there, then travels to the uterus to develop.",
      },
    },
  ],
};
