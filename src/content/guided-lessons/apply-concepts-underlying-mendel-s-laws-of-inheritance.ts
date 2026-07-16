import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for SCIENCE / biology / "Apply Concepts Underlying Mendel's
 * Laws of Inheritance". Content carried over from the flat skill-lesson
 * blocks, restructured into the concept / rule / example / mistake / quick
 * check pattern. Quick checks are informal and never touch mastery.
 */
export const MENDEL_LAWS_INHERITANCE: GuidedLesson = {
  section: "SCIENCE",
  topic: "biology",
  skill: "Apply Concepts Underlying Mendel's Laws of Inheritance",
  slug: "apply-concepts-underlying-mendel-s-laws-of-inheritance",
  title: "Mendel's Laws of Inheritance",
  summary:
    "Traits are passed through dominant and recessive alleles, and Punnett squares let you predict the genotype and phenotype ratios of offspring.",
  minutes: [8, 10],
  objectives: [
    "Distinguish dominant from recessive alleles",
    "Tell genotype apart from phenotype",
    "Identify homozygous and heterozygous genotypes",
    "Use a Punnett square to predict offspring genotype and phenotype ratios",
    "Recognize incomplete dominance and how it differs from codominance",
  ],
  sections: [
    {
      id: "dominant-recessive",
      title: "Dominant and recessive alleles",
      blocks: [
        {
          kind: "concept",
          body: "Genes come in different versions called alleles. For a given trait, each person inherits one allele from each parent, so every individual carries two.\n\nWhich of the two alleles you can see depends on whether it is dominant or recessive.",
        },
        {
          kind: "rule",
          title: "The two allele types",
          items: [
            "Dominant allele: its trait shows even if only one copy is present. Written as a capital letter (B).",
            "Recessive allele: its trait shows only when two copies are present. Written as a lowercase letter (b).",
          ],
        },
        {
          kind: "example",
          title: "Brown (B) dominant, blue (b) recessive",
          steps: [
            {
              note: "Bb carries one dominant and one recessive allele.",
              work: ["B = brown", "b = blue"],
            },
            {
              note: "The dominant allele masks the recessive one, so the brown trait shows.",
              work: ["Bb shows brown"],
            },
            {
              note: "Blue can appear only with two recessive copies.",
              work: ["bb shows blue"],
            },
          ],
          answer: "Bb shows brown; only bb shows blue.",
        },
        {
          kind: "mistake",
          body: "A recessive allele is not lost when it is masked. Bb looks brown, but the b is still there and can be passed to a child.",
        },
      ],
      quickCheck: {
        prompt:
          "If B (brown) is dominant and b (blue) is recessive, what trait does Bb show?",
        choices: [
          "Blue, because the recessive allele is listed second",
          "Brown, because one dominant allele is enough",
          "A blend of brown and blue",
          "Neither, because the alleles cancel out",
        ],
        answer: 1,
        explanation:
          "A dominant allele shows with only one copy, so Bb is brown. The b is carried but masked.",
      },
    },
    {
      id: "genotype-phenotype",
      title: "Genotype and phenotype",
      blocks: [
        {
          kind: "concept",
          body: "Two terms separate what the alleles are from what you can see.\n\n- Genotype: the actual allele combination (BB, Bb, or bb).\n- Phenotype: the visible trait that results (brown eyes or blue eyes).",
        },
        {
          kind: "rule",
          title: "Describing a genotype",
          items: [
            "Homozygous: two of the same allele (BB or bb), also called purebred.",
            "Heterozygous: two different alleles (Bb), also called hybrid.",
          ],
        },
        {
          kind: "example",
          title: "One phenotype, two genotypes",
          steps: [
            {
              note: "BB is homozygous dominant, and the brown trait shows.",
              work: ["BB: genotype homozygous, phenotype brown"],
            },
            {
              note: "Bb is heterozygous, and the brown trait still shows.",
              work: ["Bb: genotype heterozygous, phenotype brown"],
            },
            {
              note: "So two different genotypes produce the same phenotype.",
              work: ["bb: genotype homozygous, phenotype blue"],
            },
          ],
          answer: "BB and Bb look alike; only bb looks different.",
        },
        {
          kind: "tip",
          body: "Read the question carefully: a genotype answer is a letter pair (Bb), while a phenotype answer is a described trait (brown eyes).",
        },
      ],
      quickCheck: {
        prompt: "Which genotype is heterozygous?",
        choices: ["BB", "bb", "Bb", "All three"],
        answer: 2,
        explanation:
          "Heterozygous means two different alleles, so Bb. BB and bb are homozygous, or purebred.",
      },
    },
    {
      id: "punnett-squares",
      title: "Punnett squares and ratios",
      blocks: [
        {
          kind: "concept",
          body: "A Punnett square is a grid that predicts the possible genotypes of offspring from two parents. One parent's alleles go along the top, the other parent's along the side, and each box combines the allele from its row with the allele from its column.",
        },
        {
          kind: "example",
          title: "Cross Bb x Bb, both parents heterozygous",
          expression: "Bb x Bb",
          steps: [
            {
              note: "Put B and b along the top, B and b along the side.",
              work: ["Top: B, b", "Side: B, b"],
            },
            {
              note: "Fill the four boxes by combining each row and column.",
              work: ["BB, Bb", "Bb, bb"],
              becomes: "BB, Bb, Bb, bb",
            },
            {
              note: "Count the genotypes.",
              work: ["1 BB : 2 Bb : 1 bb"],
              becomes: "Genotype ratio 1:2:1",
            },
            {
              note: "Group by what shows. BB plus the two Bb all show brown; only bb shows blue.",
              work: ["3 brown : 1 blue"],
              becomes: "Phenotype ratio 3:1",
            },
          ],
          answer: "Genotype 1:2:1, phenotype 3:1, so a 25 percent chance of bb.",
        },
        {
          kind: "rule",
          title: "Results of a Bb x Bb cross",
          items: [
            "Genotype ratio: 1 BB : 2 Bb : 1 bb (written 1:2:1)",
            "Phenotype ratio: 3 dominant (brown) : 1 recessive (blue), or 3:1",
            "There is a 25 percent chance of a bb child showing the recessive trait",
          ],
        },
        {
          kind: "mistake",
          body: "Do not report the genotype ratio when the question asks about appearance. The four boxes split 1:2:1 by genotype but 3:1 by phenotype, because BB and Bb look the same.",
        },
      ],
      quickCheck: {
        prompt:
          "In a Bb x Bb cross, what is the chance an offspring shows the recessive trait?",
        choices: ["0 percent", "25 percent", "50 percent", "75 percent"],
        answer: 1,
        explanation:
          "Only bb shows the recessive trait, and it fills 1 of the 4 boxes: 25 percent.",
      },
    },
    {
      id: "incomplete-dominance",
      title: "Incomplete dominance",
      blocks: [
        {
          kind: "concept",
          body: "Not all traits follow simple dominant and recessive patterns.\n\nIn incomplete dominance, neither allele is fully dominant, so the heterozygote shows a blended, in-between phenotype instead of matching one parent.",
        },
        {
          kind: "example",
          title: "Red flower crossed with white flower",
          expression: "RR x WW",
          steps: [
            {
              note: "Neither R nor W fully masks the other.",
              work: ["RR = red", "WW = white"],
            },
            {
              note: "Every offspring is the heterozygote RW, which blends the two.",
              work: ["RW = pink"],
            },
          ],
          answer: "RW offspring are pink, a blend of red and white.",
        },
        {
          kind: "rule",
          title: "Compare the two patterns",
          items: [
            "Incomplete dominance: the two traits blend into an in-between phenotype (pink).",
            "Codominance: both traits show fully at the same time, without blending (AB blood type).",
          ],
        },
        {
          kind: "mistake",
          body: "Blending and both-at-once are not the same thing. Pink is a new in-between color, so it is incomplete dominance; AB blood type shows A and B fully, so it is codominance.",
        },
      ],
      quickCheck: {
        prompt:
          "A red flower (RR) crossed with a white flower (WW) gives pink offspring (RW). What does this show?",
        choices: [
          "Complete dominance, with red dominant",
          "Codominance, because both alleles are present",
          "Incomplete dominance, because the phenotype is a blend",
          "That the offspring are homozygous",
        ],
        answer: 2,
        explanation:
          "Neither allele is fully dominant, so the heterozygote is an in-between pink. Codominance would show red and white fully, not blended.",
      },
    },
  ],
};
