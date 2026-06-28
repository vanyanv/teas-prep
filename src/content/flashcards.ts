import type { SeedFlashcard } from "./seed-types";

// High-yield A&P flashcards (the largest single TEAS 7 science sub-area).
export const FLASHCARDS: SeedFlashcard[] = [
  // Cardiovascular
  { topic: "Cardiovascular", front: "Which heart chamber pumps oxygenated blood to the body?", back: "The left ventricle (the thickest chamber) pumps oxygenated blood into the aorta and out to the body." },
  { topic: "Cardiovascular", front: "Path of blood: right atrium → ?", back: "Right atrium → right ventricle → pulmonary arteries → lungs → pulmonary veins → left atrium → left ventricle → aorta." },
  { topic: "Cardiovascular", front: "Arteries vs. veins: which carries blood toward the heart?", back: "Veins carry blood toward the heart; arteries carry it away. (Pulmonary vessels are the oxygenation exceptions.)" },
  { topic: "Cardiovascular", front: "What is the heart's natural pacemaker?", back: "The sinoatrial (SA) node, located in the right atrium." },
  { topic: "Cardiovascular", front: "Where does actual gas/nutrient exchange happen in the vasculature?", back: "In the capillaries — their thin walls allow exchange between blood and tissues." },

  // Respiratory
  { topic: "Respiratory", front: "Where does gas exchange occur in the lungs?", back: "In the alveoli — tiny air sacs surrounded by capillaries." },
  { topic: "Respiratory", front: "What muscle is the primary driver of breathing?", back: "The diaphragm; it contracts (flattens) to draw air in." },
  { topic: "Respiratory", front: "Order of airflow from mouth to alveoli", back: "Nose/mouth → pharynx → larynx → trachea → bronchi → bronchioles → alveoli." },
  { topic: "Respiratory", front: "What gas do we exhale as a metabolic waste product?", back: "Carbon dioxide (CO₂)." },

  // Nervous
  { topic: "Nervous", front: "What two structures make up the central nervous system (CNS)?", back: "The brain and the spinal cord." },
  { topic: "Nervous", front: "Basic functional unit of the nervous system?", back: "The neuron." },
  { topic: "Nervous", front: "Which division controls 'fight or flight'?", back: "The sympathetic division of the autonomic nervous system." },
  { topic: "Nervous", front: "Which division controls 'rest and digest'?", back: "The parasympathetic division of the autonomic nervous system." },
  { topic: "Nervous", front: "Which brain region controls balance and coordination?", back: "The cerebellum." },

  // Digestive
  { topic: "Digestive", front: "Where does most nutrient absorption occur?", back: "The small intestine (especially via villi and microvilli)." },
  { topic: "Digestive", front: "What organ produces bile, and what stores it?", back: "The liver produces bile; the gallbladder stores it." },
  { topic: "Digestive", front: "What is the main function of the large intestine?", back: "Absorbing water and electrolytes and forming/storing feces." },
  { topic: "Digestive", front: "Which enzyme in saliva begins carbohydrate digestion?", back: "Amylase (salivary amylase)." },

  // Skeletal / Muscular
  { topic: "Skeletal & Muscular", front: "What are the three types of muscle tissue?", back: "Skeletal (voluntary), cardiac (heart), and smooth (involuntary, in organs)." },
  { topic: "Skeletal & Muscular", front: "Where are red blood cells produced?", back: "In red bone marrow (hematopoiesis)." },
  { topic: "Skeletal & Muscular", front: "What connects muscle to bone? What connects bone to bone?", back: "Tendons connect muscle to bone; ligaments connect bone to bone." },
  { topic: "Skeletal & Muscular", front: "How many bones are in the adult human body?", back: "206 bones." },

  // Endocrine
  { topic: "Endocrine", front: "Which gland is the 'master gland'?", back: "The pituitary gland — it regulates many other endocrine glands." },
  { topic: "Endocrine", front: "Which hormone lowers blood glucose, and which raises it?", back: "Insulin lowers blood glucose; glucagon raises it (both from the pancreas)." },
  { topic: "Endocrine", front: "Which gland regulates metabolism via thyroid hormones?", back: "The thyroid gland (T3 and T4)." },

  // Immune
  { topic: "Immune", front: "Which white blood cells produce antibodies?", back: "B lymphocytes (B cells)." },
  { topic: "Immune", front: "What is the role of T cells in immunity?", back: "T cells coordinate the immune response and directly kill infected cells (cytotoxic T cells)." },
  { topic: "Immune", front: "What system transports immune cells and drains excess fluid?", back: "The lymphatic system." },

  // Renal / Urinary
  { topic: "Renal & Urinary", front: "What is the functional unit of the kidney?", back: "The nephron." },
  { topic: "Renal & Urinary", front: "Main functions of the kidneys?", back: "Filter blood, remove waste (urea), balance fluids/electrolytes, and regulate blood pressure and pH." },
  { topic: "Renal & Urinary", front: "Correct order: kidney → ? → bladder → ?", back: "Kidney → ureter → bladder → urethra (out of the body)." },
];
