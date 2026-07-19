/**
 * Diagram-backed Science questions.
 *
 * Image URLs and hot-spot geometry are derived from the asset registry rather
 * than written out here, so a re-crop that shifts a region updates every
 * question that uses it. `hotspotsFor` takes the structure order explicitly:
 * that order IS the answer-index order, and it has to line up with `options`.
 *
 * These assess reasoning over recall wherever possible — naming a chamber from
 * the vessel attached to it, or an organelle from its job — so that a learner
 * who memorised one picture still has to understand the structure.
 */
import { getAsset, assetUrl, hotspotsFor } from "@/content/assets";
import type { SeedQuestion } from "@/content/seed-types";

/**
 * Resolves an asset to the shape a question stores.
 *
 * This must never throw. The bank is imported by tests, scripts, and the seed
 * path, and only some of those load .env; a module that refuses to import
 * without an environment variable takes the whole question bank down with it.
 * When the R2 base URL is absent the object key is used as a root-relative
 * path, which is correct for CUSTOM assets and an obvious broken link for
 * remote ones — `validate-assets` is where a missing base URL should be
 * reported, not here.
 */
function figure(assetId: string) {
  const a = getAsset(assetId);
  if (!a) throw new Error(`unknown asset ${assetId}`);
  return {
    asset: a,
    images: [{ src: assetUrl(a) ?? `/${a.objectKey}`, alt: a.altText }],
  };
}

const heart = figure("sci-heart-chambers");
const cell = figure("sci-animal-cell");
const planes = figure("sci-anatomical-planes");
const atom = figure("sci-atomic-structure");

/** Chamber order for the heart hot-spot; index position is the answer index. */
const HEART_CHAMBERS = [
  "right-atrium",
  "left-atrium",
  "right-ventricle",
  "left-ventricle",
];

const CELL_REGIONS = ["nucleus", "cell-membrane", "cytoplasm"];

export const DIAGRAM_QUESTIONS: SeedQuestion[] = [
  {
    section: "SCIENCE",
    topic: "anatomy-physiology",
    subtopic: "Cardiovascular System",
    assetId: heart.asset.id,
    difficulty: 2,
    type: "HOT_SPOT",
    stem:
      "The chamber that pumps blood into the aorta has the thickest muscular " +
      "wall of the four. Select that chamber in the diagram.",
    options: ["Right atrium", "Left atrium", "Right ventricle", "Left ventricle"],
    correct: [3],
    images: heart.images,
    hotspots: hotspotsFor(heart.asset, HEART_CHAMBERS),
    explanation:
      "The left ventricle pumps oxygenated blood into the aorta and out to the " +
      "whole body, so it works against far higher resistance than any other " +
      "chamber and its wall is correspondingly thick.",
    rationale: {
      takeaway: "Wall thickness follows workload: the left ventricle pushes blood to the entire body.",
      whyCorrect:
        "The aorta leaves the left ventricle. Supplying the systemic circulation " +
        "means generating much higher pressure than the right side needs, and the " +
        "muscle is built for it.",
      distractors: {
        "0": "The right atrium only receives blood from the venae cavae and drops it into the right ventricle, so it has a thin wall.",
        "1": "The left atrium receives oxygenated blood from the lungs and passes it down to the left ventricle; it is also thin-walled.",
        "2": "The right ventricle does pump, but only to the lungs, which sit close by and offer low resistance, so its wall is much thinner than the left ventricle's.",
      },
      commonMistake:
        "Reading left and right from your own point of view. Sides are named from " +
        "the patient's perspective, so the left ventricle appears on the right of " +
        "a front-facing diagram.",
    },
  },
  {
    section: "SCIENCE",
    topic: "anatomy-physiology",
    subtopic: "Cardiovascular System",
    assetId: heart.asset.id,
    difficulty: 2,
    type: "ORDERED",
    stem:
      "Place these structures in the order a single red blood cell passes " +
      "through them, starting as it returns from the body.",
    options: [
      "Right atrium",
      "Right ventricle",
      "Lungs",
      "Left atrium",
      "Left ventricle",
    ],
    correct: [0, 1, 2, 3, 4],
    images: heart.images,
    explanation:
      "Deoxygenated blood returns to the right atrium, drops into the right " +
      "ventricle, is pumped to the lungs, returns to the left atrium, and is " +
      "pumped out from the left ventricle.",
    rationale: {
      takeaway: "Blood alternates: right side to the lungs, left side to the body.",
      steps: [
        "Blood returning from the body enters the right atrium through the venae cavae.",
        "It passes the tricuspid valve into the right ventricle.",
        "The right ventricle pumps it to the lungs to pick up oxygen.",
        "Oxygenated blood returns to the left atrium through the pulmonary veins.",
        "It passes the mitral valve into the left ventricle and out to the body.",
      ],
      commonMistake:
        "Assuming both sides pump to the body. Every circuit passes through the " +
        "lungs between the right and left sides.",
    },
  },
  {
    section: "SCIENCE",
    topic: "biology",
    subtopic: "Describe Cell Structure, Function, and Organization",
    assetId: cell.asset.id,
    difficulty: 1,
    type: "HOT_SPOT",
    stem:
      "Select the structure that contains the cell's DNA and controls which " +
      "proteins the cell makes.",
    options: ["Nucleus", "Cell membrane", "Cytoplasm"],
    correct: [0],
    images: cell.images,
    hotspots: hotspotsFor(cell.asset, CELL_REGIONS),
    explanation:
      "The nucleus stores the cell's DNA. Because DNA carries the instructions " +
      "for every protein, the nucleus effectively directs the cell's activity.",
    rationale: {
      takeaway: "The nucleus holds DNA, so it decides which proteins get made.",
      whyCorrect:
        "DNA never leaves the nucleus in a eukaryotic cell. It is transcribed to " +
        "mRNA there, and the mRNA carries the instructions out to the ribosomes.",
      distractors: {
        "1": "The cell membrane controls what crosses into and out of the cell, but it stores no genetic material.",
        "2": "The cytoplasm is the fluid the organelles sit in. It is where many reactions happen, but it does not hold the DNA.",
      },
      commonMistake:
        "Confusing the nucleus with the nucleolus. The nucleolus sits inside the " +
        "nucleus and assembles ribosomes; it is not the DNA store itself.",
    },
  },
  {
    section: "SCIENCE",
    topic: "biology",
    subtopic: "Describe Cell Structure, Function, and Organization",
    assetId: cell.asset.id,
    difficulty: 2,
    type: "SINGLE",
    stem:
      "A muscle cell needs far more ATP than a skin cell does. Which organelle " +
      "would you expect to find in unusually high numbers in the muscle cell?",
    options: ["Mitochondria", "Lysosomes", "Golgi apparatus", "Vacuoles"],
    correct: [0],
    images: cell.images,
    explanation:
      "Mitochondria carry out cellular respiration, which produces ATP. Cells " +
      "with high energy demands, such as muscle cells, contain many more of them.",
    rationale: {
      takeaway: "Organelle counts track what a cell actually does for a living.",
      whyCorrect:
        "ATP is made by cellular respiration, and that happens in the " +
        "mitochondria. A cell that contracts constantly needs a large, steady ATP " +
        "supply, so it carries more mitochondria.",
      distractors: {
        "1": "Lysosomes break down waste and worn-out organelles. Useful, but unrelated to how much ATP a cell can generate.",
        "2": "The Golgi apparatus packages and ships proteins. A cell that secretes heavily needs more, but contraction is not a secretion problem.",
        "3": "Vacuoles store water and materials, and are far more prominent in plant cells than in muscle.",
      },
      commonMistake:
        "Treating every organelle as equally present in every cell. Structure " +
        "follows function, and the counts differ enormously by cell type.",
    },
  },
  {
    section: "SCIENCE",
    topic: "anatomy-physiology",
    subtopic:
      "Demonstrate Knowledge of the General Orientation of Human Anatomy",
    assetId: planes.asset.id,
    difficulty: 1,
    type: "SINGLE",
    stem:
      "A surgeon needs a view that separates the front half of the body from " +
      "the back half. Which plane does that?",
    options: ["Frontal plane", "Sagittal plane", "Transverse plane", "Midsagittal plane"],
    correct: [0],
    images: planes.images,
    explanation:
      "The frontal plane, also called the coronal plane, runs vertically and " +
      "divides the body into anterior and posterior portions.",
    rationale: {
      takeaway: "Frontal separates front from back; sagittal left from right; transverse top from bottom.",
      whyCorrect:
        "The frontal plane is vertical and runs side to side through the body, so " +
        "everything in front of it is anterior and everything behind it posterior.",
      distractors: {
        "1": "A sagittal plane is also vertical, but runs front to back, so it separates left from right rather than front from back.",
        "2": "The transverse plane is horizontal and separates superior from inferior, giving a cross-section.",
        "3": "The midsagittal plane is just the sagittal plane taken exactly down the midline, so it still divides left from right.",
      },
      commonMistake:
        "Matching a plane to the direction you are looking rather than to the two " +
        "portions it creates. Name the plane by what it separates.",
    },
  },
  {
    section: "SCIENCE",
    topic: "chemistry",
    subtopic: "Recognize Basic Atomic Structure",
    assetId: atom.asset.id,
    difficulty: 1,
    type: "SINGLE",
    stem:
      "Using the diagram, what is the mass number of this atom?",
    options: ["6", "12", "18", "24"],
    correct: [1],
    images: atom.images,
    explanation:
      "Mass number counts the protons and neutrons together. Six protons plus " +
      "six neutrons gives a mass number of 12.",
    rationale: {
      takeaway: "Mass number = protons + neutrons. Electrons are too light to count.",
      whyCorrect:
        "The nucleus holds six protons and six neutrons, so 6 + 6 = 12. That is " +
        "why this atom is called carbon-12.",
      distractors: {
        "0": "Six is the atomic number, the proton count alone. It identifies the element but not its mass.",
        "2": "Eighteen counts every particle in the diagram, electrons included. Electrons have almost no mass and are left out.",
        "3": "Twenty-four would be right only if you doubled the mass number for no reason.",
      },
      commonMistake:
        "Adding the electrons in. An electron weighs roughly 1/1800 of a proton, " +
        "so mass number ignores them entirely.",
    },
  },
  {
    section: "SCIENCE",
    topic: "chemistry",
    subtopic: "Recognize Basic Atomic Structure",
    assetId: atom.asset.id,
    difficulty: 2,
    type: "SINGLE",
    stem:
      "A second atom is found with 6 protons and 8 neutrons. Compared with the " +
      "atom shown, this second atom is",
    options: [
      "the same element, with a different mass number",
      "a different element, with the same mass number",
      "a different element, because the neutron count changed",
      "the same element, with a positive overall charge",
    ],
    correct: [0],
    images: atom.images,
    explanation:
      "Proton count alone determines the element. Both atoms have six protons, " +
      "so both are carbon; the different neutron count makes them isotopes.",
    rationale: {
      takeaway: "Protons set the element. Neutrons only set which isotope it is.",
      whyCorrect:
        "Six protons means carbon either way. The second atom has 6 + 8 = 14 " +
        "nuclear particles, so it is carbon-14 rather than carbon-12.",
      distractors: {
        "1": "The mass numbers differ, 12 against 14, and the element is unchanged. This reverses both halves.",
        "2": "Neutron count never changes the element. Changing it produces an isotope of the same element.",
        "3": "Charge depends on protons against electrons, and nothing here says the electron count changed.",
      },
      commonMistake:
        "Treating any change to the nucleus as a change of element. Only the " +
        "proton count carries the element's identity.",
    },
  },
  {
    section: "SCIENCE",
    topic: "chemistry",
    subtopic: "Recognize Basic Atomic Structure",
    assetId: atom.asset.id,
    difficulty: 2,
    type: "SINGLE",
    stem:
      "The atom in the diagram has no overall charge. Which statement explains why?",
    options: [
      "It has as many electrons as protons, and their charges cancel",
      "It has as many neutrons as protons, and their charges cancel",
      "Neutrons have no charge, so the atom has none either",
      "The electrons are held in shells, which blocks their charge",
    ],
    correct: [0],
    images: atom.images,
    explanation:
      "Six positive protons and six negative electrons cancel exactly, so the " +
      "atom is neutral. Neutrons contribute no charge in either direction.",
    rationale: {
      takeaway: "Neutral means proton count equals electron count.",
      whyCorrect:
        "Each proton carries +1 and each electron −1. Six of each sums to zero, " +
        "which is what a neutral atom means.",
      distractors: {
        "1": "Neutrons carry no charge, so pairing them against protons cancels nothing.",
        "2": "Uncharged neutrons cannot make the atom neutral on their own; the six protons would still leave it at +6.",
        "3": "A shell is a position, not a shield. An electron in a shell carries its full negative charge.",
      },
      commonMistake:
        "Assuming an ion must look different. An ion is drawn exactly like this " +
        "but with the electron count no longer matching the proton count.",
    },
  },
  {
    section: "SCIENCE",
    topic: "chemistry",
    subtopic: "Recognize Basic Atomic Structure",
    assetId: atom.asset.id,
    difficulty: 2,
    type: "SINGLE",
    stem:
      "The outer shell shown can hold eight electrons in total. Based on the " +
      "diagram, how many more electrons would this atom need to fill it?",
    options: ["4", "2", "6", "8"],
    correct: [0],
    images: atom.images,
    explanation:
      "The outer shell holds four electrons in the diagram. Filling it to eight " +
      "requires four more, which is why carbon forms four bonds.",
    rationale: {
      takeaway: "Count the outer-shell electrons, then subtract from eight.",
      whyCorrect:
        "The inner shell is full at two. The remaining four electrons sit in the " +
        "outer shell, so 8 − 4 = 4 more would fill it.",
      distractors: {
        "1": "Two is the capacity of the inner shell, not the gap left in the outer one.",
        "2": "Six would be right for an atom carrying only two outer electrons. This one carries four.",
        "3": "Eight is the shell's full capacity. The atom already holds four of those places.",
      },
      commonMistake:
        "Counting all six electrons as outer-shell. Two of them fill the inner " +
        "shell first, and only the outer four are available for bonding.",
    },
  },
];
