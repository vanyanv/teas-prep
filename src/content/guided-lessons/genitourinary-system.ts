import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for SCIENCE / anatomy-physiology / "Genitourinary System".
 * Content carried over from the flat skill-lesson blocks, restructured into
 * the concept / rule / example / mistake / quick check pattern. Quick checks
 * are informal and never touch mastery.
 */
export const GENITOURINARY_SYSTEM: GuidedLesson = {
  section: "SCIENCE",
  topic: "anatomy-physiology",
  skill: "Genitourinary System",
  slug: "genitourinary-system",
  title: "Genitourinary System",
  summary:
    "Understand the urinary organs, the structure of the nephron, and the three steps of urine formation: filtration, reabsorption, and secretion.",
  minutes: [8, 10],
  objectives: [
    "Name the four urinary organs and the job each one does",
    "Describe how the kidneys regulate water, blood pressure, electrolytes, and pH",
    "Trace filtrate through the structures of the nephron in order",
    "Distinguish filtration, reabsorption, and secretion",
  ],
  sections: [
    {
      id: "organs-and-functions",
      title: "Organs and functions",
      blocks: [
        {
          kind: "concept",
          body: "The urinary system filters blood and removes waste as urine. Four organs handle it, and each has one clear job: the kidneys make urine, the ureters move it, the bladder stores it, and the urethra releases it.\n\nRemoving waste is only part of the work. The kidneys also keep the internal environment steady, which is why kidney failure disturbs so much of the body at once.",
        },
        {
          kind: "rule",
          title: "The organs, in the order urine travels",
          ordered: true,
          items: [
            "Kidneys (two): filter the blood and produce urine",
            "Ureters: carry urine from each kidney to the bladder",
            "Urinary bladder: stores urine",
            "Urethra: carries urine out of the body",
          ],
        },
        {
          kind: "rule",
          title: "What the kidneys regulate",
          items: [
            "Nitrogenous waste, especially urea, is removed from the blood",
            "Water balance",
            "Blood pressure",
            "Electrolyte levels",
            "Blood pH",
            "Red blood cell production, through the hormone erythropoietin",
          ],
        },
        {
          kind: "example",
          title: "Follow one drop of urine out of the body",
          steps: [
            {
              note: "It is produced where blood is filtered.",
              work: ["Kidney"],
            },
            {
              note: "It is carried down to storage.",
              work: ["Ureter", "Urinary bladder"],
            },
            {
              note: "It leaves the body through the final tube.",
              work: ["Urethra"],
            },
          ],
          answer: "Kidney, ureter, bladder, urethra",
        },
        {
          kind: "mistake",
          body: "Do not confuse ureter with urethra. There are two ureters, one from each kidney to the bladder, and one urethra, from the bladder to the outside.",
        },
      ],
      quickCheck: {
        prompt:
          "Which hormone do the kidneys use to help control red blood cell production?",
        choices: ["Aldosterone", "Erythropoietin", "Urea", "ADH"],
        answer: 1,
        explanation:
          "Erythropoietin from the kidneys stimulates red blood cell production. Urea is a waste product, not a hormone, and ADH and aldosterone act on water and sodium.",
      },
    },
    {
      id: "the-nephron",
      title: "The nephron",
      blocks: [
        {
          kind: "concept",
          body: "The nephron is the functional filtering unit of the kidney, and each kidney contains about a million of them. Whatever a kidney does to blood, a nephron does it one small volume at a time.\n\nThe nephron is best learned as a path: filtrate enters at one end and leaves as urine at the other, so the order of the structures is the content.",
        },
        {
          kind: "rule",
          title: "Structures in order",
          ordered: true,
          items: [
            "Glomerulus: a tuft of capillaries where filtration begins",
            "Bowman's capsule (glomerular capsule): the cup-shaped structure around the glomerulus that collects the filtrate",
            "Proximal convoluted tubule",
            "Loop of Henle: dips into the kidney's interior and concentrates urine",
            "Distal convoluted tubule",
            "Collecting duct: carries urine toward the ureter",
          ],
        },
        {
          kind: "example",
          title: "Where does filtrate go after Bowman's capsule?",
          steps: [
            {
              note: "Filtration happens at the glomerulus, and the capsule catches what is filtered.",
              work: ["Glomerulus", "Bowman's capsule"],
            },
            {
              note: "The filtrate then runs the tubule path, proximal before distal, with the loop between them.",
              work: [
                "Proximal convoluted tubule",
                "Loop of Henle",
                "Distal convoluted tubule",
              ],
            },
            {
              note: "The collecting duct takes what is left toward the ureter.",
              work: ["Collecting duct"],
            },
          ],
          answer:
            "Proximal convoluted tubule, loop of Henle, distal convoluted tubule, collecting duct",
        },
        {
          kind: "tip",
          body: "Proximal means near and distal means far, measured from Bowman's capsule. The proximal tubule comes first; the distal tubule comes after the loop.",
        },
      ],
      quickCheck: {
        prompt: "Where in the nephron does filtration begin?",
        choices: [
          "The loop of Henle",
          "The collecting duct",
          "The glomerulus",
          "The distal convoluted tubule",
        ],
        answer: 2,
        explanation:
          "Filtration begins at the glomerulus, a tuft of capillaries sitting inside Bowman's capsule, which collects the filtrate.",
      },
    },
    {
      id: "urine-formation",
      title: "Urine formation",
      blocks: [
        {
          kind: "concept",
          body: "Urine is produced in three steps, and each one moves material in a specific direction. Filtration pushes material out of the blood, reabsorption pulls useful material back in, and secretion adds a final round of waste. What remains after these three steps is urine.",
        },
        {
          kind: "rule",
          title: "The three steps",
          ordered: true,
          items: [
            "Filtration: blood pressure forces water and small solutes (water, glucose, ions, urea) out of the glomerulus into Bowman's capsule. Blood cells and proteins are too large and stay in the blood",
            "Reabsorption: as filtrate moves through the tubules, substances the body wants to keep, such as glucose, water, and needed ions, move back into the bloodstream. Glucose is normally reabsorbed completely",
            "Secretion: the tubules actively move additional wastes and excess ions, such as hydrogen ions, potassium, and certain drugs, from the blood into the filtrate",
          ],
        },
        {
          kind: "example",
          title: "Track glucose through the three steps",
          steps: [
            {
              note: "Glucose is a small solute, so filtration carries it out of the glomerulus with the water and ions.",
              work: ["Blood", "Filtrate in Bowman's capsule"],
            },
            {
              note: "The body wants glucose, so the tubules reabsorb it, normally all of it.",
              work: ["Filtrate", "Blood"],
            },
            {
              note: "Nothing returns it to the filtrate, so healthy urine has no glucose in it.",
              work: [],
            },
          ],
          answer: "Filtered, then completely reabsorbed, so it is absent from normal urine",
        },
        {
          kind: "concept",
          body: "Hormones fine-tune the process rather than replace it. ADH and aldosterone adjust how much water and sodium are reabsorbed, which is one way the kidneys control water balance and blood pressure.",
        },
        {
          kind: "mistake",
          body: "Reabsorption and secretion move in opposite directions. Reabsorption returns useful material from the filtrate to the blood; secretion adds waste from the blood into the filtrate.",
        },
      ],
      quickCheck: {
        prompt:
          "Hydrogen ions and certain drugs are moved from the blood into the filtrate. Which step is this?",
        choices: ["Filtration", "Reabsorption", "Secretion", "Concentration"],
        answer: 2,
        explanation:
          "Secretion actively adds extra wastes and excess ions from the blood into the filtrate. Reabsorption moves the other way, returning useful substances to the blood.",
      },
    },
  ],
};
