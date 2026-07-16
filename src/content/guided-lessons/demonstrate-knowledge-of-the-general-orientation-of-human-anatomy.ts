import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for SCIENCE / anatomy-physiology / "Demonstrate Knowledge of
 * the General Orientation of Human Anatomy". Content carried over from the
 * flat skill-lesson blocks, restructured into the concept / rule / example /
 * mistake / quick check pattern.
 */
export const GENERAL_ORIENTATION_HUMAN_ANATOMY: GuidedLesson = {
  section: "SCIENCE",
  topic: "anatomy-physiology",
  skill: "Demonstrate Knowledge of the General Orientation of Human Anatomy",
  slug: "demonstrate-knowledge-of-the-general-orientation-of-human-anatomy",
  title: "General Orientation of Human Anatomy",
  summary:
    "Master directional terms, body planes, cavities, abdominal regions, the levels of structural organization, and how homeostasis is maintained through negative feedback.",
  minutes: [10, 13],
  objectives: [
    "Describe locations using standard directional terms from anatomical position",
    "Distinguish the sagittal, frontal, and transverse planes",
    "Locate organs within the dorsal and ventral body cavities",
    "Map the abdomen by quadrant and by region",
    "Order the levels of structural organization and explain negative feedback",
  ],
  sections: [
    {
      id: "directional-terms",
      title: "Anatomical position and directional terms",
      blocks: [
        {
          kind: "concept",
          body: "Every anatomical description assumes one standard starting posture, the anatomical position: standing erect, facing forward, feet together, arms at the sides with the palms turned forward.\n\nThis matters because directional terms are relative. A term like above means nothing until you fix the body's orientation, so the position is agreed on first and every description is written from it.",
        },
        {
          kind: "rule",
          title: "Directional term pairs",
          items: [
            "Superior (cranial): toward the head. Inferior (caudal): toward the feet",
            "Anterior (ventral): toward the front. Posterior (dorsal): toward the back",
            "Medial: toward the midline. Lateral: away from the midline",
            "Proximal: closer to the trunk or the origin of a limb. Distal: farther from it",
            "Superficial: toward the surface. Deep: away from the surface",
          ],
        },
        {
          kind: "example",
          title: "Locate the wrist relative to the elbow",
          steps: [
            {
              note: "Both are on the arm, so use the proximal and distal pair, which measures distance from the limb's origin at the trunk.",
              work: [],
            },
            {
              note: "The wrist sits farther from the shoulder than the elbow does.",
              work: ["The wrist is distal to the elbow", "The elbow is proximal to the wrist"],
            },
          ],
          answer: "The wrist is distal to the elbow.",
        },
        {
          kind: "tip",
          body: "Proximal and distal are used for limbs. For the trunk and head, reach for superior and inferior instead.",
        },
        {
          kind: "mistake",
          body: "Do not describe the body as you see it in front of you. Terms are read from the body's own anatomical position, so the patient's left is on your right.",
        },
      ],
      quickCheck: {
        prompt: "The nose is which of the following relative to the ears?",
        choices: [
          "Lateral, because it sits on the face",
          "Medial, because it is closer to the midline",
          "Distal, because it is farther from the trunk",
          "Superficial, because it can be seen",
        ],
        answer: 1,
        explanation:
          "Medial means toward the midline. The nose sits on the midline and the ears sit off to the sides, so the nose is medial to the ears.",
      },
    },
    {
      id: "body-planes",
      title: "Body planes",
      blocks: [
        {
          kind: "concept",
          body: "A plane is a flat surface used to section the body. Naming a plane tells you which two parts the cut produces, which is how imaging and dissection views are described.",
        },
        {
          kind: "rule",
          title: "The three planes",
          items: [
            "Sagittal: divides the body into left and right parts. A midsagittal (median) plane makes equal left and right halves",
            "Frontal (coronal): divides the body into anterior (front) and posterior (back) parts",
            "Transverse (horizontal): divides the body into superior (upper) and inferior (lower) parts, producing a cross section",
          ],
        },
        {
          kind: "example",
          title: "Name the plane that produces a cross section",
          steps: [
            {
              note: "A cross section separates an upper piece from a lower piece.",
              work: ["Result: superior part and inferior part"],
            },
            {
              note: "Only one plane divides superior from inferior.",
              work: ["Transverse (horizontal) plane"],
            },
          ],
          answer: "The transverse plane.",
        },
        {
          kind: "mistake",
          body: "Every sagittal plane makes a left and a right part, but only the midsagittal (median) plane makes them equal. An off-center sagittal cut is still sagittal.",
        },
      ],
      quickCheck: {
        prompt:
          "Which plane divides the body into anterior and posterior parts?",
        choices: [
          "Sagittal",
          "Midsagittal",
          "Frontal (coronal)",
          "Transverse (horizontal)",
        ],
        answer: 2,
        explanation:
          "The frontal, or coronal, plane separates front from back. Sagittal planes separate left from right, and transverse planes separate upper from lower.",
      },
    },
    {
      id: "body-cavities",
      title: "Body cavities",
      blocks: [
        {
          kind: "concept",
          body: "The body's organs sit in two main closed spaces. The dorsal cavity is on the back and contains the cranial cavity (brain) and the vertebral, or spinal, cavity (spinal cord).\n\nThe ventral cavity is on the front and is split by the diaphragm into a thoracic cavity above and an abdominopelvic cavity below.",
        },
        {
          kind: "tabs",
          tabs: [
            {
              label: "Dorsal",
              blocks: [
                {
                  kind: "rule",
                  items: [
                    "Cranial cavity: the brain",
                    "Vertebral (spinal) cavity: the spinal cord",
                  ],
                },
              ],
            },
            {
              label: "Thoracic",
              blocks: [
                {
                  kind: "rule",
                  intro: "Everything above the diaphragm.",
                  items: [
                    "Pleural cavities: the lungs",
                    "Mediastinum: the central region between the lungs",
                    "Pericardial cavity, inside the mediastinum: the heart",
                  ],
                },
              ],
            },
            {
              label: "Abdominopelvic",
              blocks: [
                {
                  kind: "rule",
                  intro: "Everything below the diaphragm.",
                  items: [
                    "Abdominal cavity: stomach, intestines, liver, spleen",
                    "Pelvic cavity: bladder and reproductive organs",
                  ],
                },
              ],
            },
          ],
        },
        {
          kind: "example",
          title: "Place the heart",
          steps: [
            {
              note: "The heart is on the front of the body, so it is in the ventral cavity, and it sits above the diaphragm.",
              work: ["Ventral cavity, thoracic portion"],
            },
            {
              note: "Within the thorax it lies centrally, between the lungs, inside the mediastinum.",
              work: ["Mediastinum, pericardial cavity"],
            },
          ],
          answer: "The pericardial cavity, within the mediastinum of the thoracic cavity.",
        },
        {
          kind: "mistake",
          body: "The diaphragm is the divider inside the ventral cavity, not between the dorsal and ventral cavities. The brain and spinal cord are dorsal regardless of the diaphragm.",
        },
      ],
      quickCheck: {
        prompt: "The stomach and liver are located in which cavity?",
        choices: [
          "The thoracic cavity",
          "The abdominal cavity",
          "The pelvic cavity",
          "The dorsal cavity",
        ],
        answer: 1,
        explanation:
          "The abdominal cavity, below the diaphragm, holds the stomach, intestines, liver, and spleen. The pelvic cavity holds the bladder and reproductive organs.",
      },
    },
    {
      id: "abdominal-regions",
      title: "Abdominal regions and quadrants",
      blocks: [
        {
          kind: "concept",
          body: "The abdomen is mapped two ways: a simple four-quadrant scheme used clinically, and a nine-region scheme used for finer description.\n\nIn both, right and left always refer to the patient's own sides, not to the sides as you face them.",
        },
        {
          kind: "rule",
          title: "The four quadrants",
          items: [
            "Right upper quadrant (RUQ)",
            "Left upper quadrant (LUQ)",
            "Right lower quadrant (RLQ), where the appendix lies",
            "Left lower quadrant (LLQ)",
          ],
        },
        {
          kind: "rule",
          title: "The nine regions, top row to bottom row",
          ordered: true,
          items: [
            "Right hypochondriac, epigastric, left hypochondriac",
            "Right lumbar, umbilical, left lumbar",
            "Right iliac (inguinal), hypogastric (pubic), left iliac",
          ],
        },
        {
          kind: "example",
          title: "A patient reports pain low on their right side",
          steps: [
            {
              note: "Use the patient's own right, not the side nearest you.",
              work: ["Right side + lower = right lower quadrant"],
            },
            {
              note: "Recall which structure sits there.",
              work: ["The appendix lies in the RLQ"],
            },
          ],
          answer: "RLQ pain, which raises suspicion of appendicitis.",
        },
        {
          kind: "mistake",
          body: "Do not chart a quadrant from your own point of view. Facing a patient, their right upper quadrant appears on your left.",
        },
      ],
      quickCheck: {
        prompt: "Which region sits in the center of the nine-region map?",
        choices: ["Epigastric", "Umbilical", "Hypogastric", "Left lumbar"],
        answer: 1,
        explanation:
          "The umbilical region is the middle of the center column. Epigastric is directly above it and hypogastric directly below it.",
      },
    },
    {
      id: "structural-organization",
      title: "Levels of structural organization",
      blocks: [
        {
          kind: "concept",
          body: "The body builds from simple parts to complex ones, with each level made of the level beneath it. Knowing the order lets you place any structure a question names.",
        },
        {
          kind: "rule",
          title: "Simplest to most complex",
          ordered: true,
          items: [
            "Chemical: atoms and molecules",
            "Cellular: cells, the smallest living unit",
            "Tissue: similar cells working together",
            "Organ: two or more tissue types performing a function",
            "Organ system: groups of organs sharing a purpose",
            "Organism: the whole living body",
          ],
        },
        {
          kind: "rule",
          title: "The four primary tissue types",
          items: [
            "Epithelial: covers and lines",
            "Connective: supports and binds, including blood and bone",
            "Muscle: produces movement",
            "Nervous: transmits signals",
          ],
        },
        {
          kind: "example",
          title: "Place the stomach",
          steps: [
            {
              note: "The stomach contains several tissue types working toward one function, digestion.",
              work: ["Epithelial lining, muscle layers, nervous tissue, connective tissue"],
            },
            {
              note: "Two or more tissue types with a shared function defines an organ, and the stomach belongs to a system of such organs.",
              work: ["Stomach = organ", "Digestive system = organ system"],
            },
          ],
          answer: "The stomach is an organ within the digestive system.",
        },
        {
          kind: "mistake",
          body: "The cell, not the tissue, is the smallest living unit. Molecules at the chemical level are not alive on their own.",
        },
      ],
      quickCheck: {
        prompt:
          "Which level of organization comes directly between cells and organs?",
        choices: ["Chemical", "Tissues", "Organ systems", "Organism"],
        answer: 1,
        explanation:
          "Similar cells group into tissues, and two or more tissue types combine to form an organ.",
      },
    },
    {
      id: "homeostasis",
      title: "Homeostasis and negative feedback",
      blocks: [
        {
          kind: "concept",
          body: "Homeostasis is the maintenance of a stable internal environment despite changing external conditions. It is not a fixed state but a value held near a set point by constant correction.",
        },
        {
          kind: "rule",
          title: "The three parts of a feedback loop",
          ordered: true,
          items: [
            "Receptor: detects the change (the stimulus)",
            "Control center: often the brain or an endocrine gland, compares the value to a set point",
            "Effector: produces the response",
          ],
        },
        {
          kind: "concept",
          body: "Most homeostasis uses negative feedback, in which the response opposes or reverses the original stimulus and returns the variable toward the set point.\n\nPositive feedback is rarer and amplifies the change instead. Its examples are events meant to finish quickly: blood clotting, uterine contractions during childbirth (oxytocin), and milk release during nursing.",
        },
        {
          kind: "example",
          title: "Temperature regulation as negative feedback",
          steps: [
            {
              note: "A stimulus arrives and receptors in the skin and brain detect it.",
              work: ["Stimulus: body temperature rises above the set point"],
            },
            {
              note: "The control center compares the reading to the set point and signals effectors.",
              work: ["Control center: the brain", "Effectors: sweat glands and blood vessels"],
            },
            {
              note: "The response opposes the stimulus, so temperature falls back toward the set point.",
              work: ["Response: sweating and vasodilation cool the body"],
              becomes: "The rise is reversed, so this is negative feedback",
            },
          ],
          answer: "Negative feedback: the response reverses the original change.",
        },
        {
          kind: "mistake",
          body: "Negative does not mean harmful and positive does not mean helpful. The labels describe direction only: negative feedback opposes the change, positive feedback amplifies it.",
        },
      ],
      quickCheck: {
        prompt:
          "Uterine contractions during childbirth grow stronger as oxytocin is released. This is an example of what?",
        choices: [
          "Negative feedback, because the response ends the stimulus",
          "Positive feedback, because the response amplifies the stimulus",
          "A set point being lowered by the control center",
          "An effector acting without a receptor",
        ],
        answer: 1,
        explanation:
          "The response increases the original stimulus rather than opposing it, which is positive feedback. Blood clotting and milk release work the same way.",
      },
    },
  ],
};
