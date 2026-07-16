import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for SCIENCE / biology / "Describe the Relationship Between
 * Genetic Material and Protein Structure". Content carried over from the flat
 * skill-lesson blocks, restructured into the concept / rule / example /
 * mistake / quick check pattern. Quick checks are informal and never touch
 * mastery.
 */
export const GENETIC_MATERIAL_AND_PROTEIN_STRUCTURE: GuidedLesson = {
  section: "SCIENCE",
  topic: "biology",
  skill:
    "Describe the Relationship Between Genetic Material and Protein Structure",
  slug: "describe-the-relationship-between-genetic-material-and-protein-structure",
  title: "Genetic Material and Protein Structure",
  summary:
    "DNA stores the genetic instructions that are copied into RNA and read in three-letter codons to build the proteins that run the body.",
  minutes: [8, 10],
  objectives: [
    "Relate DNA, genes, and chromosomes to one another",
    "Compare the structure and bases of DNA and RNA",
    "Trace information from DNA to RNA to protein",
    "Explain how codons set the order of amino acids in a protein",
  ],
  sections: [
    {
      id: "chromosomes-genes-dna",
      title: "Chromosomes, genes, and DNA",
      blocks: [
        {
          kind: "concept",
          body: "Genetic information is organized in levels, from a single molecule up to the packaged structures you see in a dividing cell. Each level is made of the one below it.",
        },
        {
          kind: "rule",
          title: "Three levels of genetic material",
          items: [
            "DNA (deoxyribonucleic acid): the molecule that carries the genetic code as a sequence of bases",
            "Gene: a segment of DNA that holds the instructions to make one protein (or trait)",
            "Chromosome: a long, tightly coiled strand of DNA; human body cells have 46 chromosomes (23 pairs)",
          ],
        },
        {
          kind: "example",
          title: "Zoom out from base to chromosome",
          steps: [
            {
              note: "Start with the smallest unit: a run of bases along the DNA molecule.",
              work: ["bases: A, T, C, G"],
            },
            {
              note: "A segment of that DNA long enough to specify one protein is a gene.",
              work: ["DNA segment = 1 gene = instructions for 1 protein"],
            },
            {
              note: "Many genes coil together into one chromosome, and a body cell holds 46 of them.",
              work: ["many genes -> 1 chromosome", "46 chromosomes = 23 pairs"],
              becomes: "DNA makes up genes, and genes are packaged into chromosomes",
            },
          ],
          answer:
            "DNA makes up genes, and many genes are packaged together into chromosomes.",
        },
        {
          kind: "mistake",
          body: "A chromosome is not a different molecule from DNA. It is DNA, coiled tightly and carrying many genes, so the levels nest inside each other rather than competing.",
        },
      ],
      quickCheck: {
        prompt:
          "Which choice puts the levels of genetic material in order from smallest to largest?",
        choices: [
          "Chromosome, gene, DNA",
          "Gene, DNA, chromosome",
          "DNA, gene, chromosome",
          "DNA, chromosome, gene",
        ],
        answer: 2,
        explanation:
          "DNA is the molecule, a gene is a segment of DNA that codes for one protein, and a chromosome is a coiled strand holding many genes.",
      },
    },
    {
      id: "dna-vs-rna",
      title: "DNA vs RNA",
      blocks: [
        {
          kind: "concept",
          body: "DNA and RNA are both nucleic acids built from nucleotides, but they differ in shape, sugar, bases, and job. DNA stores the master code; RNA carries a working copy of it.",
        },
        {
          kind: "tabs",
          tabs: [
            {
              label: "DNA",
              blocks: [
                {
                  kind: "rule",
                  items: [
                    "Double-stranded (the double helix)",
                    "Sugar: deoxyribose",
                    "Bases: adenine, thymine, cytosine, guanine",
                    "Base pairing: A-T and C-G",
                    "Stays in the nucleus and stores the master code",
                  ],
                },
              ],
            },
            {
              label: "RNA",
              blocks: [
                {
                  kind: "rule",
                  items: [
                    "Single-stranded",
                    "Sugar: ribose",
                    "Bases: adenine, uracil, cytosine, guanine",
                    "Base pairing: A-U and C-G",
                    "Carries the message out of the nucleus and helps build proteins",
                  ],
                },
              ],
            },
          ],
        },
        {
          kind: "tip",
          body: "The one swap worth memorizing: in RNA, uracil (U) replaces thymine (T). Cytosine and guanine still pair with each other in both molecules.",
        },
        {
          kind: "example",
          title: "Pair the bases",
          steps: [
            {
              note: "Pair a DNA strand with its complementary DNA bases using A-T and C-G.",
              work: ["DNA: A T C G", "pairs to: T A G C"],
            },
            {
              note: "Now pair the same DNA strand with RNA bases. Thymine is gone, so A pairs with U.",
              work: ["DNA: A T C G", "RNA: U A G C"],
              becomes: "Only the base opposite adenine changes",
            },
          ],
          answer: "RNA uses U wherever DNA would have used T.",
        },
        {
          kind: "mistake",
          body: "Do not put uracil in DNA or thymine in RNA. Thymine belongs to DNA only, and uracil belongs to RNA only.",
        },
      ],
      quickCheck: {
        prompt: "Which base is found in RNA but not in DNA?",
        choices: ["Thymine", "Uracil", "Guanine", "Cytosine"],
        answer: 1,
        explanation:
          "RNA uses uracil in place of thymine. Cytosine and guanine appear in both nucleic acids.",
      },
    },
    {
      id: "transcription-translation",
      title: "Transcription and translation",
      blocks: [
        {
          kind: "concept",
          body: "Proteins are made in two main steps, summarized as DNA to RNA to protein. This flow of information is sometimes called the central dogma.",
        },
        {
          kind: "rule",
          title: "The two steps",
          ordered: true,
          items: [
            "Transcription: in the nucleus, DNA is used as a template to build a messenger RNA (mRNA) copy, which then leaves the nucleus",
            "Translation: at the ribosome in the cytoplasm, the ribosome reads the mRNA and assembles amino acids in the correct order to build a protein",
          ],
        },
        {
          kind: "example",
          title: "Follow one gene to one protein",
          steps: [
            {
              note: "In the nucleus, the gene's DNA is transcribed into mRNA.",
              work: ["gene (DNA) -> mRNA", "location: nucleus"],
            },
            {
              note: "The mRNA leaves the nucleus and travels to a ribosome.",
              work: ["mRNA: nucleus -> cytoplasm"],
            },
            {
              note: "The ribosome translates the mRNA, linking amino acids in order.",
              work: ["mRNA -> amino acid chain", "location: cytoplasm"],
              becomes: "DNA -> RNA -> protein",
            },
          ],
          answer:
            "Transcription happens in the nucleus; translation happens at the ribosome.",
        },
        {
          kind: "tip",
          body: "Use the names as reminders: transcription writes the same language (nucleic acid to nucleic acid), while translation changes languages (bases to amino acids).",
        },
        {
          kind: "mistake",
          body: "DNA does not leave the nucleus to be read at the ribosome. The mRNA copy makes the trip, which is exactly why the cell transcribes it first.",
        },
      ],
      quickCheck: {
        prompt: "Where does translation take place?",
        choices: [
          "In the nucleus, on the DNA template",
          "At the ribosome in the cytoplasm",
          "In the nucleus, on the mRNA copy",
          "In the cell membrane",
        ],
        answer: 1,
        explanation:
          "Transcription makes mRNA in the nucleus; the mRNA then leaves, and the ribosome in the cytoplasm translates it into a protein.",
      },
    },
    {
      id: "codons",
      title: "Codons and amino acids",
      blocks: [
        {
          kind: "concept",
          body: "The genetic code is read in groups of three bases. Amino acids are the building blocks linked together to form a protein, and the mRNA decides their order three bases at a time.",
        },
        {
          kind: "rule",
          title: "How the code is read",
          items: [
            "A codon is a sequence of three mRNA bases that codes for one specific amino acid",
            "AUG codes for methionine and acts as the start signal",
            "Some codons are stop codons that signal the end of the protein",
          ],
        },
        {
          kind: "example",
          title: "Read an mRNA strand in threes",
          expression: "AUGUUUUAA",
          steps: [
            {
              note: "Split the strand into codons, three bases at a time.",
              work: ["AUG | UUU | UAA"],
            },
            {
              note: "AUG is the start codon and brings in methionine; UUU adds the next amino acid.",
              work: ["AUG = methionine (start)", "UUU = one amino acid"],
            },
            {
              note: "UAA is a stop codon, so the ribosome releases the chain.",
              work: ["UAA = stop"],
              becomes: "a 2 amino acid chain",
            },
          ],
          answer: "Three codons: start, one amino acid, stop.",
        },
        {
          kind: "concept",
          body: "The order of codons determines the order of amino acids, which determines the protein's shape and function. A change in the DNA sequence (a mutation) can change the codons and alter the protein.",
        },
        {
          kind: "mistake",
          body: "A codon codes for one amino acid, not one protein. It takes many codons in order to build a single protein.",
        },
      ],
      quickCheck: {
        prompt: "How many mRNA bases make up one codon?",
        choices: ["One", "Two", "Three", "Four"],
        answer: 2,
        explanation:
          "A codon is three mRNA bases coding for one amino acid, such as AUG for methionine, which also serves as the start signal.",
      },
    },
  ],
};
