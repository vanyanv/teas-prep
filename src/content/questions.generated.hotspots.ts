import type { SeedQuestion } from "./seed-types";

// Hand-authored HOT_SPOT items: click-the-region questions over original
// schematic diagrams in /public/hotspots. For each item the `hotspots` regions
// are listed in the SAME order as `options`, so a region's array index is its
// answer index (what `correct` refers to). Coordinates are percent of the SVG
// viewBox. See public/hotspots/CREDITS.md.
export const GENERATED_QUESTIONS_HOTSPOTS: SeedQuestion[] = [
  // ── Heart (Cardiovascular System) ──
  {
    section: "SCIENCE",
    topic: "anatomy-physiology",
    subtopic: "Cardiovascular System",
    difficulty: 2,
    type: "HOT_SPOT",
    stem: "Click the chamber that pumps oxygen-rich blood out to the entire body.",
    options: ["Right atrium", "Left atrium", "Right ventricle", "Left ventricle"],
    correct: [3],
    explanation:
      "The left ventricle has the thickest muscular wall because it pumps oxygenated blood through the aorta to the whole body. The right ventricle only pumps to the lungs.",
    images: ["/hotspots/heart.svg"],
    hotspots: [
      { x: 25, y: 21, w: 20, h: 26, label: "A" },
      { x: 55, y: 20, w: 19, h: 25, label: "B" },
      { x: 25, y: 50, w: 22, h: 34, label: "C" },
      { x: 55, y: 50, w: 22, h: 37, label: "D" },
    ],
  },
  {
    section: "SCIENCE",
    topic: "anatomy-physiology",
    subtopic: "Cardiovascular System",
    difficulty: 2,
    type: "HOT_SPOT",
    stem: "Click the chamber that receives oxygen-poor blood returning from the body through the venae cavae.",
    options: ["Right atrium", "Left atrium", "Right ventricle", "Left ventricle"],
    correct: [0],
    explanation:
      "Deoxygenated blood from the body returns through the superior and inferior venae cavae into the right atrium, which then passes it to the right ventricle.",
    images: ["/hotspots/heart.svg"],
    hotspots: [
      { x: 25, y: 21, w: 20, h: 26, label: "A" },
      { x: 55, y: 20, w: 19, h: 25, label: "B" },
      { x: 25, y: 50, w: 22, h: 34, label: "C" },
      { x: 55, y: 50, w: 22, h: 37, label: "D" },
    ],
  },
  {
    section: "SCIENCE",
    topic: "anatomy-physiology",
    subtopic: "Cardiovascular System",
    difficulty: 3,
    type: "HOT_SPOT",
    stem: "Click the chamber that pumps blood to the lungs through the pulmonary artery.",
    options: ["Right atrium", "Left atrium", "Right ventricle", "Left ventricle"],
    correct: [2],
    explanation:
      "The right ventricle pumps oxygen-poor blood into the pulmonary artery toward the lungs for gas exchange. The left atrium then receives the oxygenated blood coming back.",
    images: ["/hotspots/heart.svg"],
    hotspots: [
      { x: 25, y: 21, w: 20, h: 26, label: "A" },
      { x: 55, y: 20, w: 19, h: 25, label: "B" },
      { x: 25, y: 50, w: 22, h: 34, label: "C" },
      { x: 55, y: 50, w: 22, h: 37, label: "D" },
    ],
  },

  // ── Neuron (Neuromuscular System) ──
  {
    section: "SCIENCE",
    topic: "anatomy-physiology",
    subtopic: "Neuromuscular System",
    difficulty: 2,
    type: "HOT_SPOT",
    stem: "Click the part of the neuron that receives incoming signals from other neurons.",
    options: ["Dendrites", "Cell body (soma)", "Axon", "Myelin sheath", "Axon terminals"],
    correct: [0],
    explanation:
      "Dendrites are the branching extensions that receive signals and carry them toward the cell body. The axon carries signals away.",
    images: ["/hotspots/neuron.svg"],
    hotspots: [
      { x: 3, y: 20, w: 15, h: 60, label: "A" },
      { x: 15, y: 34, w: 16, h: 32, label: "B" },
      { x: 31, y: 45, w: 8, h: 11, label: "C" },
      { x: 54, y: 43, w: 9, h: 14, label: "D" },
      { x: 84, y: 24, w: 14, h: 52, label: "E" },
    ],
  },
  {
    section: "SCIENCE",
    topic: "anatomy-physiology",
    subtopic: "Neuromuscular System",
    difficulty: 2,
    type: "HOT_SPOT",
    stem: "Click the structure that insulates the axon and speeds up signal transmission.",
    options: ["Dendrites", "Cell body (soma)", "Axon", "Myelin sheath", "Axon terminals"],
    correct: [3],
    explanation:
      "The myelin sheath is a fatty insulating layer around the axon; its gaps (nodes of Ranvier) let the impulse jump, greatly speeding transmission.",
    images: ["/hotspots/neuron.svg"],
    hotspots: [
      { x: 3, y: 20, w: 15, h: 60, label: "A" },
      { x: 15, y: 34, w: 16, h: 32, label: "B" },
      { x: 31, y: 45, w: 8, h: 11, label: "C" },
      { x: 54, y: 43, w: 9, h: 14, label: "D" },
      { x: 84, y: 24, w: 14, h: 52, label: "E" },
    ],
  },
  {
    section: "SCIENCE",
    topic: "anatomy-physiology",
    subtopic: "Neuromuscular System",
    difficulty: 3,
    type: "HOT_SPOT",
    stem: "Click the part that carries the electrical impulse away from the cell body toward the axon terminals.",
    options: ["Dendrites", "Cell body (soma)", "Axon", "Myelin sheath", "Axon terminals"],
    correct: [2],
    explanation:
      "The axon is the long projection that conducts the action potential away from the soma to the axon terminals, where neurotransmitters are released.",
    images: ["/hotspots/neuron.svg"],
    hotspots: [
      { x: 3, y: 20, w: 15, h: 60, label: "A" },
      { x: 15, y: 34, w: 16, h: 32, label: "B" },
      { x: 31, y: 45, w: 8, h: 11, label: "C" },
      { x: 54, y: 43, w: 9, h: 14, label: "D" },
      { x: 84, y: 24, w: 14, h: 52, label: "E" },
    ],
  },

  // ── Digestive tract (Gastrointestinal System) ──
  {
    section: "SCIENCE",
    topic: "anatomy-physiology",
    subtopic: "Gastrointestinal System",
    difficulty: 2,
    type: "HOT_SPOT",
    stem: "Click the organ that releases acid and enzymes to break food into a semi-liquid mixture after swallowing.",
    options: ["Esophagus", "Stomach", "Liver", "Small intestine", "Large intestine"],
    correct: [1],
    explanation:
      "The stomach secretes hydrochloric acid and pepsin and churns food into chyme. The esophagus only transports food to the stomach.",
    images: ["/hotspots/digestive.svg"],
    hotspots: [
      { x: 44, y: 5, w: 7, h: 24, label: "A" },
      { x: 26, y: 27, w: 19, h: 29, label: "B" },
      { x: 53, y: 25, w: 28, h: 17, label: "C" },
      { x: 42, y: 56, w: 26, h: 28, label: "D" },
      { x: 68, y: 40, w: 8, h: 34, label: "E" },
    ],
  },
  {
    section: "SCIENCE",
    topic: "anatomy-physiology",
    subtopic: "Gastrointestinal System",
    difficulty: 2,
    type: "HOT_SPOT",
    stem: "Click the organ where most nutrients are absorbed into the bloodstream.",
    options: ["Esophagus", "Stomach", "Liver", "Small intestine", "Large intestine"],
    correct: [3],
    explanation:
      "The small intestine, lined with villi and microvilli, is where the majority of nutrient absorption occurs. The large intestine mainly absorbs water.",
    images: ["/hotspots/digestive.svg"],
    hotspots: [
      { x: 44, y: 5, w: 7, h: 24, label: "A" },
      { x: 26, y: 27, w: 19, h: 29, label: "B" },
      { x: 53, y: 25, w: 28, h: 17, label: "C" },
      { x: 42, y: 56, w: 26, h: 28, label: "D" },
      { x: 68, y: 40, w: 8, h: 34, label: "E" },
    ],
  },
  {
    section: "SCIENCE",
    topic: "anatomy-physiology",
    subtopic: "Gastrointestinal System",
    difficulty: 3,
    type: "HOT_SPOT",
    stem: "Click the organ whose main job is to reabsorb water and form solid waste.",
    options: ["Esophagus", "Stomach", "Liver", "Small intestine", "Large intestine"],
    correct: [4],
    explanation:
      "The large intestine (colon) reabsorbs water and electrolytes from indigestible residue, forming and storing feces until elimination.",
    images: ["/hotspots/digestive.svg"],
    hotspots: [
      { x: 44, y: 5, w: 7, h: 24, label: "A" },
      { x: 26, y: 27, w: 19, h: 29, label: "B" },
      { x: 53, y: 25, w: 28, h: 17, label: "C" },
      { x: 42, y: 56, w: 26, h: 28, label: "D" },
      { x: 68, y: 40, w: 8, h: 34, label: "E" },
    ],
  },

  // ── Animal cell (Biology) ──
  {
    section: "SCIENCE",
    topic: "biology",
    subtopic: "Describe Cell Structure, Function, and Organization",
    difficulty: 2,
    type: "HOT_SPOT",
    stem: "Click the organelle known as the 'powerhouse of the cell,' where most ATP is produced.",
    options: ["Nucleus", "Mitochondrion", "Cell membrane", "Cytoplasm"],
    correct: [1],
    explanation:
      "Mitochondria carry out cellular respiration, producing most of the cell's ATP. The nucleus stores DNA; it does not generate the cell's energy.",
    images: ["/hotspots/cell.svg"],
    hotspots: [
      { x: 37, y: 31, w: 29, h: 38, label: "A" },
      { x: 60, y: 22, w: 23, h: 23, label: "B" },
      { x: 12, y: 30, w: 8, h: 32, label: "C" },
      { x: 20, y: 62, w: 16, h: 16, label: "D" },
    ],
  },
  {
    section: "SCIENCE",
    topic: "biology",
    subtopic: "Describe Cell Structure, Function, and Organization",
    difficulty: 2,
    type: "HOT_SPOT",
    stem: "Click the structure that controls what enters and leaves the cell.",
    options: ["Nucleus", "Mitochondrion", "Cell membrane", "Cytoplasm"],
    correct: [2],
    explanation:
      "The cell (plasma) membrane is a selectively permeable boundary that regulates the movement of substances into and out of the cell.",
    images: ["/hotspots/cell.svg"],
    hotspots: [
      { x: 37, y: 31, w: 29, h: 38, label: "A" },
      { x: 60, y: 22, w: 23, h: 23, label: "B" },
      { x: 12, y: 30, w: 8, h: 32, label: "C" },
      { x: 20, y: 62, w: 16, h: 16, label: "D" },
    ],
  },
  {
    section: "SCIENCE",
    topic: "biology",
    subtopic: "Describe Cell Structure, Function, and Organization",
    difficulty: 2,
    type: "HOT_SPOT",
    stem: "Click the structure that contains the cell's DNA and directs its activities.",
    options: ["Nucleus", "Mitochondrion", "Cell membrane", "Cytoplasm"],
    correct: [0],
    explanation:
      "The nucleus houses the cell's genetic material (DNA) and acts as the control center directing growth, metabolism, and reproduction.",
    images: ["/hotspots/cell.svg"],
    hotspots: [
      { x: 37, y: 31, w: 29, h: 38, label: "A" },
      { x: 60, y: 22, w: 23, h: 23, label: "B" },
      { x: 12, y: 30, w: 8, h: 32, label: "C" },
      { x: 20, y: 62, w: 16, h: 16, label: "D" },
    ],
  },
];
