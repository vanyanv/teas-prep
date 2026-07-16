import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for SCIENCE / biology / "Describe the Structure and Function
 * of the Basic Macromolecules in a Biological System". Content carried over
 * from the flat skill-lesson blocks, restructured into the concept / rule /
 * example / mistake / quick check pattern. Quick checks are informal and
 * never touch mastery.
 */
export const BASIC_MACROMOLECULES: GuidedLesson = {
  section: "SCIENCE",
  topic: "biology",
  skill:
    "Describe the Structure and Function of the Basic Macromolecules in a Biological System",
  slug: "describe-the-structure-and-function-of-the-basic-macromolecules-in-a-biological-system",
  title: "Structure and Function of the Basic Macromolecules",
  summary:
    "The four macromolecules (carbohydrates, lipids, proteins, and nucleic acids) are built from smaller monomers and each carries out essential jobs in the body.",
  minutes: [10, 12],
  objectives: [
    "Identify the monomer that builds each of the four macromolecules",
    "Describe the main functions of carbohydrates, lipids, proteins, and nucleic acids",
    "Explain how a protein's shape determines what it does",
    "Distinguish the roles of DNA and RNA",
    "Match a described molecule to its macromolecule class",
  ],
  sections: [
    {
      id: "carbohydrates",
      title: "Carbohydrates",
      blocks: [
        {
          kind: "concept",
          body: "Carbohydrates are made of carbon, hydrogen, and oxygen, and they are the body's main quick energy source. When a question mentions fast fuel, sugars, or starch, it is pointing at carbohydrates.",
        },
        {
          kind: "rule",
          title: "Structure, from small to large",
          items: [
            "Monomer (building block): monosaccharides, simple sugars such as glucose",
            "Disaccharides: two sugars joined, such as sucrose",
            "Polysaccharides: many sugars joined, such as starch and glycogen for storage, and cellulose for plant structure",
          ],
        },
        {
          kind: "rule",
          title: "Functions",
          items: [
            "Provide fast energy",
            "Store energy short term",
            "Give structural support in plants",
          ],
        },
        {
          kind: "example",
          title: "Sort three carbohydrates by size",
          steps: [
            {
              note: "Glucose is a single simple sugar, so it is the monomer.",
              work: ["glucose = monosaccharide"],
            },
            {
              note: "Sucrose is two sugars joined together.",
              work: ["sucrose = disaccharide"],
            },
            {
              note: "Starch is many sugars joined into a long chain the body uses for storage.",
              work: ["starch = polysaccharide"],
            },
          ],
          answer: "Glucose is the monomer; sucrose and starch are built from it.",
        },
        {
          kind: "mistake",
          body: "Cellulose is a carbohydrate, but it is structural rather than an energy store. Do not assume every polysaccharide is fuel; starch and glycogen store energy, while cellulose holds plant cells up.",
        },
      ],
      quickCheck: {
        prompt: "What is the monomer of carbohydrates?",
        choices: ["Amino acids", "Monosaccharides", "Nucleotides", "Fatty acids"],
        answer: 1,
        explanation:
          "Carbohydrates are built from monosaccharides, simple sugars such as glucose. Amino acids build proteins and nucleotides build nucleic acids.",
      },
    },
    {
      id: "lipids",
      title: "Lipids",
      blocks: [
        {
          kind: "concept",
          body: "Lipids are fats, oils, and related molecules. They do not dissolve in water, which is what hydrophobic means, and that single property explains most of what they do.",
        },
        {
          kind: "rule",
          title: "Structure",
          items: [
            "Building blocks: glycerol and fatty acids",
            "Lipids are the one group without a single repeating monomer",
          ],
        },
        {
          kind: "tabs",
          tabs: [
            {
              label: "Fats & oils",
              blocks: [
                {
                  kind: "concept",
                  body: "Fats and oils are the body's long-term energy storage. They also provide insulation and cushioning for organs.",
                },
              ],
            },
            {
              label: "Phospholipids",
              blocks: [
                {
                  kind: "concept",
                  body: "Phospholipids are the main component of cell membranes. Because they are hydrophobic, they form a barrier that water and dissolved substances cannot cross freely.",
                },
              ],
            },
            {
              label: "Steroids",
              blocks: [
                {
                  kind: "concept",
                  body: "Steroids include cholesterol and some hormones. These act as signaling molecules, carrying messages between parts of the body.",
                },
              ],
            },
          ],
        },
        {
          kind: "example",
          title: "Which lipid is being described?",
          steps: [
            {
              note: "A molecule forms the boundary of a cell and repels water.",
              work: ["hydrophobic + cell boundary"],
              becomes: "phospholipid",
            },
            {
              note: "A molecule stores energy for the long term under the skin.",
              work: ["long-term storage + insulation"],
              becomes: "fat",
            },
          ],
          answer:
            "Membrane means phospholipid; long-term storage means fats and oils.",
        },
        {
          kind: "mistake",
          body: "Carbohydrates and lipids both store energy, so do not treat them as interchangeable. Carbohydrates are the quick, short-term source; lipids are the dense, long-term store.",
        },
      ],
      quickCheck: {
        prompt: "Which lipid is the main component of cell membranes?",
        choices: ["Cholesterol", "Glycogen", "Phospholipids", "Fatty acids alone"],
        answer: 2,
        explanation:
          "Phospholipids make up the bulk of cell membranes. Cholesterol is a steroid, and glycogen is a carbohydrate, not a lipid at all.",
      },
    },
    {
      id: "proteins",
      title: "Proteins",
      blocks: [
        {
          kind: "concept",
          body: "Proteins are the workhorses of the cell and the most varied macromolecule. If a question lists a job being done inside the body, a protein is usually doing it.",
        },
        {
          kind: "rule",
          title: "Structure",
          items: [
            "Monomer (building block): amino acids, of which there are 20 kinds",
            "Amino acids are linked by peptide bonds",
            "The order and folding of amino acids determine the protein's shape, and shape determines function",
          ],
        },
        {
          kind: "rule",
          title: "Functions",
          items: [
            "Enzymes that speed up reactions",
            "Structural support, such as collagen and keratin",
            "Transport, such as hemoglobin carrying oxygen",
            "Muscle movement",
            "Antibodies for immune defense",
            "Some hormones",
          ],
        },
        {
          kind: "example",
          title: "Trace shape to function",
          steps: [
            {
              note: "A protein's amino acids are linked in a specific order by peptide bonds.",
              work: ["amino acid order"],
            },
            {
              note: "That order makes the chain fold into one particular shape.",
              work: ["order sets folding"],
              becomes: "shape",
            },
            {
              note: "The shape lets hemoglobin bind oxygen and carry it. Change the shape and it can no longer do the job.",
              work: ["shape sets function"],
              becomes: "oxygen transport",
            },
          ],
          answer: "Order determines shape, and shape determines function.",
        },
        {
          kind: "tip",
          body: "When a question says enzyme, antibody, collagen, keratin, or hemoglobin, the answer is protein. All five are named proteins doing specific jobs.",
        },
        {
          kind: "mistake",
          body: "Not every hormone is a protein, and not every protein is a hormone. Some hormones are proteins and some are steroids, which are lipids, so read what the question describes rather than assuming.",
        },
      ],
      quickCheck: {
        prompt: "What determines a protein's function?",
        choices: [
          "Its total number of amino acids",
          "Its shape, which comes from the order and folding of its amino acids",
          "The type of sugar attached to it",
          "Whether it dissolves in water",
        ],
        answer: 1,
        explanation:
          "The order of amino acids sets how the chain folds, the folding sets the shape, and the shape determines what the protein can do.",
      },
    },
    {
      id: "nucleic-acids",
      title: "Nucleic acids",
      blocks: [
        {
          kind: "concept",
          body: "Nucleic acids store and carry genetic information. They are the instruction set the rest of the cell reads.",
        },
        {
          kind: "rule",
          title: "Structure",
          items: [
            "Monomer (building block): nucleotides",
            "Each nucleotide is made of a sugar, a phosphate group, and a nitrogen base",
          ],
        },
        {
          kind: "rule",
          title: "The two types",
          items: [
            "DNA stores the genetic code",
            "RNA helps copy the code and build proteins",
          ],
        },
        {
          kind: "rule",
          title: "Functions",
          items: [
            "Hold hereditary instructions",
            "Pass traits to offspring",
            "Direct the production of proteins",
          ],
        },
        {
          kind: "example",
          title: "Build a nucleotide, then a nucleic acid",
          steps: [
            {
              note: "Start with the three parts every nucleotide has.",
              work: ["sugar + phosphate + nitrogen base"],
              becomes: "one nucleotide",
            },
            {
              note: "Join many nucleotides into a chain that stores the code.",
              work: ["many nucleotides"],
              becomes: "DNA",
            },
          ],
          answer:
            "Nucleotides are the monomers; chains of them form DNA and RNA.",
        },
        {
          kind: "mistake",
          body: "DNA does not build proteins directly. DNA stores the code, and RNA copies it and carries out protein production, so a question about making a protein from the code points to RNA.",
        },
      ],
      quickCheck: {
        prompt: "Which three parts make up a single nucleotide?",
        choices: [
          "Glycerol, a fatty acid, and a phosphate group",
          "A sugar, a phosphate group, and a nitrogen base",
          "An amino acid, a peptide bond, and a sugar",
          "Two simple sugars and a nitrogen base",
        ],
        answer: 1,
        explanation:
          "Every nucleotide has a sugar, a phosphate group, and a nitrogen base. Glycerol and fatty acids build lipids; amino acids build proteins.",
      },
    },
    {
      id: "monomer-recap",
      title: "Monomer recap",
      blocks: [
        {
          kind: "concept",
          body: "Most questions on this skill are really one question: given a description, which of the four macromolecules is it? The fastest way in is the monomer, because each group has its own building block.",
        },
        {
          kind: "rule",
          title: "Monomers at a glance",
          items: [
            "Carbohydrates: monosaccharides",
            "Lipids: glycerol and fatty acids",
            "Proteins: amino acids",
            "Nucleic acids: nucleotides",
          ],
        },
        {
          kind: "rule",
          title: "Functions at a glance",
          items: [
            "Carbohydrates: quick energy, short-term storage, plant structure",
            "Lipids: long-term energy storage, insulation and cushioning, membranes, signaling",
            "Proteins: enzymes, structure, transport, movement, immune defense",
            "Nucleic acids: store the genetic code, pass on traits, direct protein production",
          ],
        },
        {
          kind: "example",
          title: "Identify a molecule from its description",
          steps: [
            {
              note: "A molecule is built from amino acids linked by peptide bonds and speeds up a reaction.",
              work: ["amino acids = protein", "speeds up a reaction = enzyme"],
              becomes: "a protein acting as an enzyme",
            },
            {
              note: "A molecule is built from nucleotides and carries hereditary instructions.",
              work: ["nucleotides = nucleic acid", "stores the code = DNA"],
              becomes: "DNA",
            },
          ],
          answer: "Name the monomer first, then read the function.",
        },
        {
          kind: "tip",
          body: "If a question names the building block, you already have the class. Monosaccharide means carbohydrate, amino acid means protein, nucleotide means nucleic acid, and glycerol with fatty acids means lipid.",
        },
      ],
      quickCheck: {
        prompt:
          "A molecule is built from nucleotides and helps copy the genetic code to build proteins. What is it?",
        choices: ["A polysaccharide", "DNA", "RNA", "An enzyme"],
        answer: 2,
        explanation:
          "Nucleotides mean a nucleic acid, and copying the code to build proteins is RNA's job. DNA stores the code rather than copying it.",
      },
    },
  ],
};
