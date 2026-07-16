import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for SCIENCE / anatomy-physiology / "Skeletal System". Content
 * carried over from the flat skill-lesson blocks, restructured into the
 * concept / rule / example / mistake / quick check pattern. Quick checks are
 * informal and never touch mastery.
 */
export const SKELETAL_SYSTEM: GuidedLesson = {
  section: "SCIENCE",
  topic: "anatomy-physiology",
  skill: "Skeletal System",
  slug: "skeletal-system",
  title: "Skeletal System",
  summary:
    "Divide the skeleton into axial and appendicular parts, identify major bones, and classify the types of movable joints.",
  minutes: [8, 10],
  objectives: [
    "List the five functions of the skeletal system",
    "Separate the axial skeleton from the appendicular skeleton",
    "Name the major bones of the skull, spine, arm, leg, and trunk",
    "Classify freely movable joints by the motion they allow",
  ],
  sections: [
    {
      id: "functions-and-basics",
      title: "Functions and bone basics",
      blocks: [
        {
          kind: "concept",
          body: "The skeleton is not just scaffolding. It shapes the body, shields the organs inside it, gives muscles something to pull against, banks minerals, and manufactures blood.\n\nThe adult skeleton has 206 bones. Bones meet other bones at joints. Muscles attach to bones by tendons, and bone-to-bone connections are made by ligaments.",
        },
        {
          kind: "rule",
          title: "Five functions",
          items: [
            "Support: provides the body's shape and framework",
            "Protection: the skull guards the brain, the rib cage guards the heart and lungs",
            "Movement: bones act as levers that muscles pull on",
            "Mineral storage: holds calcium and phosphorus",
            "Blood cell production: red bone marrow makes blood cells (hematopoiesis)",
          ],
        },
        {
          kind: "tip",
          body: "Tendons tie muscle to bone; ligaments link bone to bone. Both words start with the letter of what they anchor: T for the pulling tissue, L for the linking tissue between two bones.",
        },
        {
          kind: "example",
          title: "Which function is at work?",
          steps: [
            {
              note: "A patient with low blood calcium draws on a reserve. Which skeletal function is that?",
              work: [
                "Bone stores calcium and phosphorus",
                "Function: mineral storage",
              ],
            },
            {
              note: "A patient recovering from chemotherapy needs new red blood cells. Which function is that?",
              work: [
                "Red bone marrow performs hematopoiesis",
                "Function: blood cell production",
              ],
            },
          ],
          answer:
            "Mineral storage supplies the calcium; blood cell production supplies the new cells.",
        },
        {
          kind: "mistake",
          body: "Do not swap tendons and ligaments. A torn ligament is a bone-to-bone connection at a joint, not a muscle attachment.",
        },
      ],
      quickCheck: {
        prompt: "Where in the body are blood cells produced?",
        choices: [
          "In the red bone marrow",
          "In the tendons that attach muscle to bone",
          "In the ligaments at each joint",
          "In the calcium stored in the bone shaft",
        ],
        answer: 0,
        explanation:
          "Red bone marrow carries out hematopoiesis, the production of blood cells. Calcium and phosphorus are stored in bone, but storage is a separate function.",
      },
    },
    {
      id: "axial-appendicular",
      title: "Axial versus appendicular",
      blocks: [
        {
          kind: "concept",
          body: "The 206 bones divide into two groups. The axial skeleton forms the central axis of the body and protects the brain, spinal cord, and chest organs. The appendicular skeleton is everything that hangs off that axis: the limbs and the girdles that attach them.",
        },
        {
          kind: "rule",
          title: "The two divisions",
          items: [
            "Axial: skull, vertebral column (spine), rib cage, sternum (breastbone)",
            "Appendicular: arm and leg bones, plus the pectoral (shoulder) girdle and the pelvic (hip) girdle",
          ],
        },
        {
          kind: "tip",
          body: "Axial sounds like axis, meaning the center. Appendicular sounds like appendages, meaning the limbs.",
        },
        {
          kind: "example",
          title: "Sort three bones",
          steps: [
            {
              note: "The sternum sits in the chest, along the central axis.",
              work: ["Sternum: axial"],
            },
            {
              note: "The femur is a leg bone, an appendage.",
              work: ["Femur: appendicular"],
            },
            {
              note: "The scapula is part of the pectoral girdle, which attaches the arm.",
              work: ["Scapula: appendicular"],
            },
          ],
          answer: "Sternum is axial; femur and scapula are appendicular.",
        },
        {
          kind: "mistake",
          body: "The girdles are appendicular, not axial. The scapula, clavicle, and hip bones sit near the trunk, but they exist to attach limbs, so they belong with the appendages.",
        },
      ],
      quickCheck: {
        prompt: "Which of these bones belongs to the axial skeleton?",
        choices: [
          "The clavicle",
          "The humerus",
          "The vertebral column",
          "The pelvic girdle",
        ],
        answer: 2,
        explanation:
          "The vertebral column forms the central axis. The clavicle and pelvic girdle are girdles that attach limbs, and the humerus is a limb bone, so all three are appendicular.",
      },
    },
    {
      id: "major-bones",
      title: "Major bones by region",
      blocks: [
        {
          kind: "concept",
          body: "Most skeletal questions are recognition questions: given a bone name, place it. Learn the bones region by region, and learn the arm and leg from the trunk outward, since both follow the same pattern of one bone, then two bones, then a cluster of small bones, then digits.",
        },
        {
          kind: "rule",
          title: "Learn these by region",
          items: [
            "Skull: cranium and the mandible (lower jaw)",
            "Spine, top to bottom: cervical (neck), thoracic (chest), lumbar (lower back), sacrum, coccyx (tailbone)",
            "Arm: humerus (upper arm), radius and ulna (forearm), carpals (wrist), metacarpals (hand), phalanges (fingers)",
            "Leg: femur (thigh, the longest and strongest bone), patella (kneecap), tibia (shinbone) and fibula (lower leg), tarsals (ankle), metatarsals (foot), phalanges (toes)",
            "Trunk: clavicle (collarbone), scapula (shoulder blade), sternum, ribs",
          ],
        },
        {
          kind: "example",
          title: "The arm and leg mirror each other",
          steps: [
            {
              note: "Each limb starts with a single long bone next to the trunk.",
              work: ["Arm: humerus", "Leg: femur"],
            },
            {
              note: "Then a pair of bones runs to the wrist or ankle.",
              work: ["Arm: radius and ulna", "Leg: tibia and fibula"],
            },
            {
              note: "Then a cluster of small bones, the long bones of the hand or foot, and finally the digits.",
              work: [
                "Arm: carpals, metacarpals, phalanges",
                "Leg: tarsals, metatarsals, phalanges",
              ],
            },
          ],
          answer:
            "One bone, then two, then a cluster, then digits: the same pattern in both limbs.",
        },
        {
          kind: "tip",
          body: "Phalanges are the digits in both limbs, so the word alone does not tell you fingers or toes. Read the context.",
        },
        {
          kind: "mistake",
          body: "Carpals are in the wrist and tarsals are in the ankle. The similar names are easy to reverse; tie tarsals to the toes below them.",
        },
      ],
      quickCheck: {
        prompt: "Which bone is the longest and strongest in the body?",
        choices: ["The humerus", "The tibia", "The femur", "The sternum"],
        answer: 2,
        explanation:
          "The femur is the thigh bone, the longest and strongest bone. The humerus is its counterpart in the arm, and the tibia is the shinbone below the knee.",
      },
    },
    {
      id: "joint-types",
      title: "Joint types",
      blocks: [
        {
          kind: "concept",
          body: "Joints, also called articulations, are where bones meet. Some are immovable, such as the sutures of the skull. Freely movable joints are called synovial joints, and they are classified by the motion they allow.",
        },
        {
          kind: "rule",
          title: "Freely movable (synovial) joints",
          items: [
            "Hinge: back-and-forth motion in one plane, like a door. Elbow, knee",
            "Ball-and-socket: the rounded head of one bone sits in a cup of another, allowing movement in all directions. Shoulder, hip",
            "Pivot: rotation around an axis. The joint between the first two neck vertebrae that lets you turn your head side to side",
            "Gliding (plane): flat surfaces slide over one another for limited movement. Between the carpals of the wrist, between the tarsals of the ankle",
          ],
        },
        {
          kind: "concept",
          body: "Other synovial types include the condyloid and saddle joints of the hand. On the TEAS, hinge and ball-and-socket come up most often.",
        },
        {
          kind: "example",
          title: "Name the joint from the motion",
          steps: [
            {
              note: "Your knee bends and straightens but does not rotate freely.",
              work: ["One plane of motion", "Joint: hinge"],
            },
            {
              note: "Your shoulder circles in every direction.",
              work: ["Motion in all directions", "Joint: ball-and-socket"],
            },
            {
              note: "You shake your head no, rotating around the neck's axis.",
              work: ["Rotation around an axis", "Joint: pivot"],
            },
          ],
          answer: "Knee: hinge. Shoulder: ball-and-socket. Neck rotation: pivot.",
        },
        {
          kind: "mistake",
          body: "The knee is a hinge, not a ball-and-socket. Both are large leg joints, but only the hip has the rounded head sitting in a cup.",
        },
      ],
      quickCheck: {
        prompt: "Which type of joint allows movement in all directions?",
        choices: ["Hinge", "Pivot", "Gliding", "Ball-and-socket"],
        answer: 3,
        explanation:
          "A ball-and-socket joint, such as the shoulder or hip, seats a rounded head in a cup, allowing motion in every direction. A hinge moves in one plane only.",
      },
    },
  ],
};
