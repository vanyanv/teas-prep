import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for SCIENCE / biology / "Describe Cell Structure, Function,
 * and Organization". Content carried over from the flat skill-lesson blocks,
 * restructured into the concept / rule / example / mistake / quick check
 * pattern. Quick checks are informal and never touch mastery.
 */
export const CELL_STRUCTURE_FUNCTION_ORGANIZATION: GuidedLesson = {
  section: "SCIENCE",
  topic: "biology",
  skill: "Describe Cell Structure, Function, and Organization",
  slug: "describe-cell-structure-function-and-organization",
  title: "Cell Structure, Function, and Organization",
  summary:
    "Cells are the basic unit of life, built from specialized organelles, and they reproduce through mitosis for growth and repair or meiosis to make gametes.",
  minutes: [10, 12],
  objectives: [
    "Distinguish prokaryotic cells from eukaryotic cells",
    "Match each major organelle to the job it performs",
    "Order the four phases of mitosis and describe what happens in each",
    "Explain how meiosis halves the chromosome number and creates variation",
    "Compare mitosis and meiosis by purpose and outcome",
  ],
  sections: [
    {
      id: "cell-types",
      title: "Prokaryote vs eukaryote",
      blocks: [
        {
          kind: "concept",
          body: "All living things are made of cells, the smallest unit that can carry out life functions. Every cell falls into one of two basic types, and the dividing line is simple: does it have a true nucleus?",
        },
        {
          kind: "tabs",
          tabs: [
            {
              label: "Prokaryotic",
              blocks: [
                {
                  kind: "rule",
                  items: [
                    "No true nucleus and no membrane-bound organelles",
                    "DNA floats freely in the cytoplasm, in a region called the nucleoid",
                    "Small and simple",
                    "Bacteria are prokaryotes",
                  ],
                },
              ],
            },
            {
              label: "Eukaryotic",
              blocks: [
                {
                  kind: "rule",
                  items: [
                    "Has a true nucleus that holds the DNA",
                    "Has many membrane-bound organelles",
                    "Larger and more complex",
                    "Animals, plants, fungi, and protists are eukaryotes",
                  ],
                },
              ],
            },
          ],
        },
        {
          kind: "example",
          title: "Classify a cell from a description",
          steps: [
            {
              note: "A cell is described as having DNA loose in the cytoplasm with no internal compartments.",
              work: ["No nucleus, no membrane-bound organelles"],
            },
            {
              note: "Loose DNA in a nucleoid is the prokaryote signature, so this is a bacterium.",
              work: [],
              becomes: "Prokaryotic",
            },
          ],
          answer: "Prokaryotic (a bacterium)",
        },
        {
          kind: "tip",
          body: "Human cells are eukaryotic. Any question about your own tissues is a question about eukaryotic cells.",
        },
        {
          kind: "mistake",
          body: "Prokaryotes are not cells without DNA. They carry DNA; it simply is not enclosed in a nucleus.",
        },
      ],
      quickCheck: {
        prompt:
          "A cell has DNA in a nucleoid region and no membrane-bound organelles. What kind of cell is it?",
        choices: [
          "Eukaryotic, because it contains DNA",
          "Prokaryotic, such as a bacterium",
          "Eukaryotic, because the nucleoid is a nucleus",
          "Neither, since all cells must have a nucleus",
        ],
        answer: 1,
        explanation:
          "A nucleoid is a region of free-floating DNA, not a true nucleus. No nucleus and no membrane-bound organelles means prokaryotic.",
      },
    },
    {
      id: "organelles",
      title: "Organelles and their jobs",
      blocks: [
        {
          kind: "concept",
          body: "Organelles are specialized structures inside the cell, each with a specific role. Most TEAS questions give you a job and ask for the structure, or give a structure and ask for the job, so learn them as pairs.",
        },
        {
          kind: "rule",
          title: "Structure and function",
          items: [
            "Nucleus: control center that stores DNA and directs cell activities, including protein production",
            "Mitochondria: powerhouse of the cell; make ATP energy through cellular respiration",
            "Ribosomes: build proteins by joining amino acids; found free in the cytoplasm or on the ER",
            "Endoplasmic reticulum (ER): network of membranes; rough ER has ribosomes and makes proteins, smooth ER makes lipids and helps detoxify",
            "Golgi apparatus: packages, modifies, and ships proteins and other molecules",
            "Lysosomes: contain digestive enzymes that break down waste, worn-out parts, and invaders",
            "Plasma (cell) membrane: outer boundary made of a phospholipid bilayer; controls what enters and leaves (selective permeability)",
            "Cytoskeleton: network of protein fibers that gives the cell shape, support, and helps with movement",
          ],
        },
        {
          kind: "example",
          title: "Trace a protein through the cell",
          steps: [
            {
              note: "The nucleus stores the DNA instructions and directs protein production.",
              work: ["Nucleus: the instructions"],
            },
            {
              note: "Ribosomes, free or on the rough ER, join amino acids into the protein.",
              work: ["Ribosome on rough ER: the protein is built"],
            },
            {
              note: "The Golgi apparatus modifies, packages, and ships it out.",
              work: ["Golgi: package and ship"],
              becomes: "Nucleus to ribosome/rough ER to Golgi",
            },
          ],
          answer:
            "Instructions from the nucleus, assembly at the ribosome, packaging at the Golgi.",
        },
        {
          kind: "tip",
          body: "A cell that does heavy energy work has many mitochondria; a cell that exports a lot of protein has abundant rough ER and Golgi. The organelle count follows the job.",
        },
        {
          kind: "mistake",
          body: "Do not swap the ribosome and the Golgi. Ribosomes build proteins; the Golgi only modifies, packages, and ships proteins that are already built.",
        },
      ],
      quickCheck: {
        prompt:
          "Which organelle produces most of the cell's ATP through cellular respiration?",
        choices: ["Ribosome", "Golgi apparatus", "Mitochondrion", "Lysosome"],
        answer: 2,
        explanation:
          "Mitochondria are the powerhouse of the cell, making ATP by cellular respiration. Ribosomes build proteins, the Golgi ships them, and lysosomes digest waste.",
      },
    },
    {
      id: "mitosis",
      title: "Cellular reproduction: mitosis",
      blocks: [
        {
          kind: "concept",
          body: "Mitosis is cell division used for growth and repair of body (somatic) cells. It produces 2 daughter cells that are genetically identical to the parent and to each other, and both are diploid, meaning they carry the full chromosome number.",
        },
        {
          kind: "rule",
          title: "Four main phases, in order",
          ordered: true,
          items: [
            "Prophase: chromosomes condense and become visible; the nuclear membrane breaks down",
            "Metaphase: chromosomes line up single file along the middle (equator) of the cell",
            "Anaphase: sister chromatids are pulled apart to opposite ends of the cell",
            "Telophase: two new nuclei form and the cell pinches in two (cytokinesis completes the split)",
          ],
        },
        {
          kind: "tip",
          body: "The memory trick for the order is PMAT: Prophase, Metaphase, Anaphase, Telophase. Metaphase is the middle, and anaphase is when things move apart.",
        },
        {
          kind: "example",
          title: "Name the phase from what you see",
          steps: [
            {
              note: "Under a microscope, the chromosomes are lined up in a single row across the center of the cell.",
              work: ["Chromosomes aligned at the equator"],
            },
            {
              note: "Lining up at the middle is metaphase. Pulling apart would be the next phase, anaphase.",
              work: [],
              becomes: "Metaphase",
            },
          ],
          answer: "Metaphase",
        },
        {
          kind: "mistake",
          body: "Mitosis makes 2 cells, not 4, and they are identical, not varied. Those are meiosis outcomes.",
        },
      ],
      quickCheck: {
        prompt:
          "During which phase of mitosis are sister chromatids pulled apart to opposite ends of the cell?",
        choices: ["Prophase", "Metaphase", "Anaphase", "Telophase"],
        answer: 2,
        explanation:
          "Anaphase is the pulling-apart phase. Metaphase lines the chromosomes up first, and telophase forms the two new nuclei afterward.",
      },
    },
    {
      id: "meiosis",
      title: "Cellular reproduction: meiosis",
      blocks: [
        {
          kind: "concept",
          body: "Meiosis makes sex cells (gametes: sperm and eggs). It produces 4 daughter cells that are haploid, meaning they carry half the chromosome number of the parent.",
        },
        {
          kind: "rule",
          title: "What meiosis does",
          items: [
            "Goes through two rounds of division (meiosis I and meiosis II)",
            "Halves the chromosome number, so when sperm and egg join at fertilization the normal full number is restored",
            "Includes crossing over: matching chromosomes swap segments of DNA, creating new gene combinations",
            "Produces 4 genetically varied gametes, because of crossing over and random assortment",
          ],
        },
        {
          kind: "example",
          title: "Why halving matters",
          steps: [
            {
              note: "A human body cell is diploid, with the full chromosome number.",
              work: ["Parent cell: diploid"],
            },
            {
              note: "Meiosis halves that number, so each gamete is haploid.",
              work: ["Sperm: haploid", "Egg: haploid"],
            },
            {
              note: "At fertilization the two haploid gametes join and the full diploid number returns.",
              work: ["haploid + haploid = diploid"],
              becomes: "The chromosome number stays constant across generations",
            },
          ],
          answer:
            "Halving in meiosis is what keeps the chromosome number from doubling every generation.",
        },
        {
          kind: "mistake",
          body: "The 4 gametes from meiosis are not identical copies. Crossing over and random assortment make each one genetically different.",
        },
      ],
      quickCheck: {
        prompt: "Meiosis produces which set of daughter cells?",
        choices: [
          "2 identical diploid cells",
          "2 varied haploid cells",
          "4 identical haploid cells",
          "4 genetically varied haploid cells",
        ],
        answer: 3,
        explanation:
          "Two rounds of division give 4 haploid gametes, and crossing over plus random assortment make them genetically varied.",
      },
    },
    {
      id: "mitosis-vs-meiosis",
      title: "Mitosis vs meiosis",
      blocks: [
        {
          kind: "concept",
          body: "Both are forms of cell division, but they differ in purpose and outcome. Compare them on five points: number of divisions, number of cells produced, ploidy, whether the cells are identical, and what the cells are for.",
        },
        {
          kind: "tabs",
          tabs: [
            {
              label: "Mitosis",
              blocks: [
                {
                  kind: "rule",
                  items: [
                    "1 division",
                    "Makes 2 cells",
                    "Cells are diploid",
                    "Cells are identical",
                    "Used for growth and repair",
                  ],
                },
              ],
            },
            {
              label: "Meiosis",
              blocks: [
                {
                  kind: "rule",
                  items: [
                    "2 divisions",
                    "Makes 4 cells",
                    "Cells are haploid",
                    "Cells are genetically varied",
                    "Includes crossing over",
                    "Used to make gametes",
                  ],
                },
              ],
            },
          ],
        },
        {
          kind: "tip",
          body: "Quick way to remember: mitosis maintains the chromosome number, meiosis reduces it by half.",
        },
        {
          kind: "example",
          title: "Pick the process from the outcome",
          steps: [
            {
              note: "A skin wound heals and the new cells carry the same DNA as the cells around them.",
              work: ["Identical cells, full chromosome number, repair"],
            },
            {
              note: "Identical diploid cells for repair is the mitosis profile, not meiosis.",
              work: [],
              becomes: "Mitosis",
            },
          ],
          answer: "Mitosis",
        },
        {
          kind: "mistake",
          body: "Crossing over belongs to meiosis only. If a question mentions chromosomes swapping segments, mitosis is not the answer.",
        },
      ],
      quickCheck: {
        prompt:
          "A cell divides once and yields two diploid cells identical to the parent. Which process is this, and what is it for?",
        choices: [
          "Meiosis, to make gametes",
          "Mitosis, for growth and repair",
          "Meiosis, for growth and repair",
          "Mitosis, to make gametes",
        ],
        answer: 1,
        explanation:
          "One division into 2 identical diploid cells is mitosis, which maintains the chromosome number for growth and repair. Meiosis takes two divisions and makes 4 varied haploid gametes.",
      },
    },
  ],
};
