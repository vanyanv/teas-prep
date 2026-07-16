import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for SCIENCE / anatomy-physiology / "Cardiovascular System".
 * Content carried over from the flat skill-lesson blocks, restructured into
 * the concept / rule / example / mistake / quick check pattern. Quick checks
 * are informal and never touch mastery.
 */
export const CARDIOVASCULAR_SYSTEM: GuidedLesson = {
  section: "SCIENCE",
  topic: "anatomy-physiology",
  skill: "Cardiovascular System",
  slug: "cardiovascular-system",
  title: "The Cardiovascular System",
  summary:
    "Trace blood flow through the heart and body, understand the cardiac cycle and the four heart valves, and know blood components and the ABO/Rh blood typing system.",
  minutes: [10, 13],
  objectives: [
    "Trace a drop of blood through the heart, lungs, and body in order",
    "Distinguish systole from diastole and follow the heart's conduction pathway",
    "Name the four heart valves and place each one in the flow",
    "Identify the components of blood and what each one does",
    "Predict transfusion compatibility from ABO and Rh antigens",
  ],
  sections: [
    {
      id: "blood-flow",
      title: "Path of blood flow",
      blocks: [
        {
          kind: "concept",
          body: "The heart has four chambers. The two upper chambers, the atria, receive blood. The two lower chambers, the ventricles, pump it out.\n\nThe path is one loop made of two halves. The right side handles pulmonary circulation, sending oxygen-poor blood to the lungs. The left side handles systemic circulation, sending oxygen-rich blood to the whole body.",
        },
        {
          kind: "rule",
          title: "Follow the blood",
          ordered: true,
          items: [
            "Oxygen-poor blood from the body enters the right atrium through the superior and inferior vena cava",
            "It passes to the right ventricle",
            "It is pumped through the pulmonary artery to the lungs, where it picks up oxygen and drops carbon dioxide",
            "It returns through the pulmonary veins to the left atrium",
            "It passes to the left ventricle",
            "It is pumped out through the aorta to the whole body",
          ],
        },
        {
          kind: "concept",
          body: "The left ventricle has the thickest wall because it pumps against the highest pressure, pushing blood to the entire body rather than just to the lungs.",
        },
        {
          kind: "example",
          title: "Where is a drop of blood most oxygen-rich?",
          steps: [
            {
              note: "Oxygen is loaded at the lungs, so anything before the lungs is oxygen-poor.",
              work: [
                "body to vena cava to right atrium to right ventricle: oxygen-poor",
              ],
            },
            {
              note: "Everything from the pulmonary veins forward carries fresh oxygen.",
              work: [
                "lungs to pulmonary veins to left atrium to left ventricle to aorta: oxygen-rich",
              ],
              becomes: "The switch happens at the lungs, not at the heart.",
            },
          ],
          answer: "In the pulmonary veins, left heart, and aorta.",
        },
        {
          kind: "mistake",
          body: "The usual rule that arteries carry oxygenated blood and veins carry deoxygenated blood breaks here. Pulmonary arteries carry deoxygenated blood to the lungs, and pulmonary veins carry oxygenated blood back. Arteries are defined by carrying blood away from the heart, not by their oxygen content.",
        },
      ],
      quickCheck: {
        prompt:
          "A drop of blood has just left the right ventricle. Where does it go next?",
        choices: [
          "Through the aorta to the body",
          "Through the pulmonary artery to the lungs",
          "Into the left atrium",
          "Into the superior vena cava",
        ],
        answer: 1,
        explanation:
          "The right ventricle pumps oxygen-poor blood through the pulmonary artery to the lungs. The aorta is fed by the left ventricle.",
      },
    },
    {
      id: "cardiac-cycle",
      title: "The cardiac cycle",
      blocks: [
        {
          kind: "concept",
          body: "The cardiac cycle is one complete heartbeat: contraction and relaxation.\n\n- Systole is the contraction phase, when a chamber squeezes and ejects blood.\n- Diastole is the relaxation phase, when a chamber fills.",
        },
        {
          kind: "rule",
          title: "The conduction pathway",
          ordered: true,
          items: [
            "The sinoatrial (SA) node in the right atrium fires; it is the heart's natural pacemaker",
            "The signal reaches the atrioventricular (AV) node",
            "It travels down the bundle of His",
            "It spreads through the Purkinje fibers, making the ventricles contract",
          ],
        },
        {
          kind: "example",
          title: "Reading a blood pressure of 120/80",
          steps: [
            {
              note: "The top number is systolic pressure: the ventricles are contracting.",
              work: ["120 = systolic = ventricular contraction"],
            },
            {
              note: "The bottom number is diastolic pressure: the ventricles are relaxed and filling.",
              work: ["80 = diastolic = ventricular relaxation"],
              becomes: "Blood pressure is reported as systolic over diastolic.",
            },
          ],
          answer: "120/80 is contraction pressure over relaxation pressure.",
        },
        {
          kind: "tip",
          body: "The 'lub-dub' heart sounds come from the valves snapping shut, not from the muscle itself contracting.",
        },
        {
          kind: "mistake",
          body: "Do not read the higher number as the resting pressure. Systole is the higher, contracting number and is always written first.",
        },
      ],
      quickCheck: {
        prompt: "Which structure initiates each heartbeat?",
        choices: [
          "The AV node",
          "The Purkinje fibers",
          "The SA node",
          "The bundle of His",
        ],
        answer: 2,
        explanation:
          "The SA node in the right atrium is the heart's natural pacemaker. The AV node, bundle of His, and Purkinje fibers relay the signal it starts.",
      },
    },
    {
      id: "heart-valves",
      title: "The four heart valves",
      blocks: [
        {
          kind: "concept",
          body: "Valves keep blood moving one way and prevent backflow. There are four, in two pairs: two atrioventricular valves and two semilunar valves.",
        },
        {
          kind: "tabs",
          tabs: [
            {
              label: "AV valves",
              blocks: [
                {
                  kind: "concept",
                  body: "The two atrioventricular (AV) valves sit between the atria and the ventricles.",
                },
                {
                  kind: "rule",
                  items: [
                    "Tricuspid valve: right side, between the right atrium and right ventricle",
                    "Bicuspid valve, also called the mitral valve: left side, between the left atrium and left ventricle",
                  ],
                },
              ],
            },
            {
              label: "Semilunar valves",
              blocks: [
                {
                  kind: "concept",
                  body: "The two semilunar valves sit at the exits of the ventricles.",
                },
                {
                  kind: "rule",
                  items: [
                    "Pulmonary valve: between the right ventricle and the pulmonary artery",
                    "Aortic valve: between the left ventricle and the aorta",
                  ],
                },
              ],
            },
          ],
        },
        {
          kind: "example",
          title: "The valves in flow order",
          steps: [
            {
              note: "Start on the right: blood crosses from the right atrium into the right ventricle, then exits toward the lungs.",
              work: ["tricuspid, then pulmonary"],
            },
            {
              note: "Then the left: blood crosses from the left atrium into the left ventricle, then exits to the body.",
              work: ["mitral (bicuspid), then aortic"],
              becomes: "tricuspid, pulmonary, mitral (bicuspid), aortic",
            },
          ],
          answer: "Tricuspid, pulmonary, mitral (bicuspid), aortic.",
        },
        {
          kind: "tip",
          body: "A memory aid for the side: the LEFT side has the bicuspid/mitral valve (Mitral = Left).",
        },
        {
          kind: "mistake",
          body: "Do not put the tricuspid valve on the left. Tricuspid is right; the bicuspid/mitral valve is left.",
        },
      ],
      quickCheck: {
        prompt:
          "Which valve does blood cross as it leaves the left ventricle?",
        choices: [
          "The mitral valve",
          "The aortic valve",
          "The pulmonary valve",
          "The tricuspid valve",
        ],
        answer: 1,
        explanation:
          "The aortic valve sits between the left ventricle and the aorta. The mitral valve is the entrance to the left ventricle, not its exit.",
      },
    },
    {
      id: "blood-components",
      title: "Blood components",
      blocks: [
        {
          kind: "concept",
          body: "Blood is about 55 percent plasma and 45 percent formed elements.\n\nPlasma is mostly water. It carries proteins, nutrients, hormones, and wastes.",
        },
        {
          kind: "rule",
          title: "The formed elements",
          items: [
            "Red blood cells (erythrocytes): carry oxygen using hemoglobin, and lack a nucleus",
            "White blood cells (leukocytes): defend against infection",
            "Platelets (thrombocytes): cell fragments that trigger clotting",
          ],
        },
        {
          kind: "concept",
          body: "Blood cells are produced in the red bone marrow.",
        },
        {
          kind: "example",
          title: "Matching a job to a component",
          steps: [
            {
              note: "A patient is bleeding and the blood is slow to clot. Which component is involved?",
              work: ["clotting = platelets (thrombocytes)"],
            },
            {
              note: "A patient is fighting an infection. Which count would you expect to rise?",
              work: ["infection defense = white blood cells (leukocytes)"],
            },
          ],
          answer:
            "Platelets for clotting; white blood cells for infection.",
        },
        {
          kind: "mistake",
          body: "Platelets are not whole cells. They are cell fragments. Mature red blood cells are also unusual: they have no nucleus, which leaves more room for hemoglobin.",
        },
      ],
      quickCheck: {
        prompt: "Which blood component carries oxygen?",
        choices: [
          "Plasma",
          "Platelets",
          "White blood cells",
          "Red blood cells",
        ],
        answer: 3,
        explanation:
          "Red blood cells (erythrocytes) carry oxygen using hemoglobin. Plasma carries nutrients, hormones, and wastes, but not the oxygen load.",
      },
    },
    {
      id: "blood-types",
      title: "Blood types (ABO and Rh)",
      blocks: [
        {
          kind: "concept",
          body: "ABO typing is based on antigens, or markers, on the surface of red blood cells. Your antibodies target whichever antigens you do not have.",
        },
        {
          kind: "rule",
          title: "The four ABO types",
          items: [
            "Type A: A antigens, anti-B antibodies",
            "Type B: B antigens, anti-A antibodies",
            "Type AB: both antigens, no antibodies (the universal recipient)",
            "Type O: no antigens, both antibodies (the universal donor)",
          ],
        },
        {
          kind: "concept",
          body: "The Rh factor is a separate antigen. Rh-positive blood has the D antigen; Rh-negative blood does not.",
        },
        {
          kind: "example",
          title: "Why type O is the universal donor",
          steps: [
            {
              note: "A recipient's antibodies attack antigens they do not recognize.",
              work: ["type O red cells carry no A antigen and no B antigen"],
            },
            {
              note: "With no antigens to target, there is nothing for the recipient's antibodies to attack.",
              work: ["no antigens = no agglutination"],
              becomes: "Type O red cells can go to any ABO recipient.",
            },
            {
              note: "Type AB is the mirror image: it has no antibodies, so it can receive any ABO type.",
              work: ["AB = universal recipient"],
            },
          ],
          answer:
            "Type O donates to all; type AB receives from all.",
        },
        {
          kind: "concept",
          body: "A mismatched transfusion causes the recipient's antibodies to attack the donor cells, clumping them together. That clumping is called agglutination.",
        },
        {
          kind: "mistake",
          body: "Do not treat Rh as part of the ABO letter. It is a separate antigen, and it matters on its own. Rh incompatibility is a special concern when an Rh-negative mother carries an Rh-positive fetus.",
        },
      ],
      quickCheck: {
        prompt: "Which antibodies does a person with type A blood carry?",
        choices: [
          "Anti-A antibodies",
          "Anti-B antibodies",
          "Both anti-A and anti-B antibodies",
          "Neither antibody",
        ],
        answer: 1,
        explanation:
          "Type A has A antigens, so it makes antibodies against the antigen it lacks: anti-B. Carrying anti-A would mean attacking its own cells.",
      },
    },
  ],
};
