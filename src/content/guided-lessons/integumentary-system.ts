import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for SCIENCE / anatomy-physiology / "Integumentary System".
 * Content carried over from the flat skill-lesson blocks, restructured into
 * the concept / rule / example / mistake / quick check pattern. Quick checks
 * are informal and never touch mastery.
 */
export const INTEGUMENTARY_SYSTEM: GuidedLesson = {
  section: "SCIENCE",
  topic: "anatomy-physiology",
  skill: "Integumentary System",
  slug: "integumentary-system",
  title: "The Integumentary System",
  summary:
    "Learn the three layers of the skin (epidermis, dermis, hypodermis) and the protective and regulatory functions of the integumentary system.",
  minutes: [8, 10],
  objectives: [
    "List the organs of the integumentary system and the skin's five main functions",
    "Describe the structure of the epidermis and the role of keratin and melanin",
    "Identify the structures housed in the dermis and what they do",
    "Explain how the hypodermis supports and protects the body",
    "Distinguish the three layers by depth, tissue type, and function",
  ],
  sections: [
    {
      id: "functions",
      title: "Functions of the skin",
      blocks: [
        {
          kind: "concept",
          body: "The integumentary system includes the skin, hair, nails, and associated glands. The skin is the body's largest organ, and it does far more than cover you: it is an active barrier, a thermostat, a sense organ, and a small chemical factory.\n\nEvery function below traces back to a structure in one of the skin's layers, so learning the functions first gives you a place to file the anatomy that follows.",
        },
        {
          kind: "rule",
          title: "Five key functions",
          items: [
            "Protection: a barrier against pathogens, injury, and water loss",
            "Temperature regulation: through sweating and adjusting blood flow",
            "Sensation: touch, pressure, pain, and temperature receptors",
            "Excretion: small amounts of waste leave the body in sweat",
            "Synthesis: vitamin D is produced when skin is exposed to sunlight",
          ],
        },
        {
          kind: "example",
          title: "Matching a function to its purpose",
          steps: [
            {
              note: "A question describes the skin flushing red and sweating on a hot day. Ask which function is at work.",
              work: [
                "Sweating cools by evaporation",
                "Increased blood flow to the skin releases heat",
              ],
            },
            {
              note: "Both mechanisms move heat out of the body, so this is temperature regulation, not excretion.",
              work: [],
            },
          ],
          answer: "Temperature regulation",
        },
        {
          kind: "mistake",
          body: "Sweating shows up in two functions, and students pick the wrong one. Sweat does carry a small amount of waste (excretion), but its main job is cooling. If the question is about heat, the answer is temperature regulation.",
        },
      ],
      quickCheck: {
        prompt:
          "Which function of the skin depends on exposure to sunlight?",
        choices: [
          "Excretion of waste",
          "Synthesis of vitamin D",
          "Protection against pathogens",
          "Sensation of pressure",
        ],
        answer: 1,
        explanation:
          "The skin synthesizes vitamin D when exposed to sunlight. The other functions operate regardless of light.",
      },
    },
    {
      id: "epidermis",
      title: "Epidermis",
      blocks: [
        {
          kind: "concept",
          body: "The epidermis is the outermost layer of the skin. It is made of stratified squamous epithelial tissue and has no blood vessels of its own.\n\nIts deepest cells divide continually and push older cells toward the surface. As those cells rise, they fill with the tough protein keratin and die, forming a waterproof protective barrier that is constantly shed and replaced.",
        },
        {
          kind: "rule",
          title: "What defines the epidermis",
          items: [
            "Outermost layer, made of stratified squamous epithelial tissue",
            "Contains no blood vessels of its own",
            "Deepest cells divide and push older cells upward",
            "Surface cells fill with keratin, die, and are shed and replaced",
            "Contains melanocytes, which produce the pigment melanin",
          ],
        },
        {
          kind: "example",
          title: "The path of one epidermal cell",
          steps: [
            {
              note: "The cell is born in the deepest part of the epidermis, where cells divide.",
              work: ["New cells push older cells toward the surface"],
            },
            {
              note: "As it rises, it fills with keratin and dies.",
              work: ["Living cell becomes a tough, keratin-filled dead cell"],
            },
            {
              note: "At the surface it is part of the waterproof barrier, then it is shed.",
              work: ["Shed cells are replaced from below, continuously"],
            },
          ],
          answer:
            "A dead, keratin-filled surface cell that waterproofs and protects, then sheds",
        },
        {
          kind: "why",
          label: "Why do scrapes of the epidermis alone not bleed?",
          body: "The epidermis has no blood vessels of its own; it is nourished by diffusion from the layer beneath it. A scrape that removes only epidermis takes no vessels with it, so it does not bleed. Bleeding means the injury reached the dermis.",
        },
        {
          kind: "mistake",
          body: "Melanin and melanocytes are not the same thing. Melanocytes are the cells; melanin is the pigment they produce, which gives skin its color and protects against ultraviolet radiation.",
        },
      ],
      quickCheck: {
        prompt:
          "Which protein fills epidermal cells as they move toward the surface, creating the waterproof barrier?",
        choices: ["Melanin", "Collagen", "Keratin", "Elastin"],
        answer: 2,
        explanation:
          "Rising epidermal cells fill with keratin and die, forming the tough waterproof barrier. Melanin is a pigment, and collagen and elastic fibers belong to the dermis.",
      },
    },
    {
      id: "dermis",
      title: "Dermis",
      blocks: [
        {
          kind: "concept",
          body: "The dermis is the thick middle layer, directly beneath the epidermis. It is made mostly of dense connective tissue containing collagen and elastic fibers, which give the skin its strength and flexibility.\n\nThis is the working layer. It is rich in structures the epidermis lacks, and that is what makes deeper injuries behave differently.",
        },
        {
          kind: "rule",
          title: "Structures housed in the dermis",
          items: [
            "Blood vessels, which help regulate temperature",
            "Nerve endings and sensory receptors",
            "Hair follicles",
            "Sweat glands",
            "Sebaceous (oil) glands",
          ],
        },
        {
          kind: "example",
          title: "Reading the depth of a wound",
          steps: [
            {
              note: "A wound bleeds and is painful. Ask which layer holds the structures responsible.",
              work: [
                "Bleeding requires blood vessels",
                "Pain requires nerve endings",
              ],
            },
            {
              note: "The epidermis has neither; the dermis has both.",
              work: ["The injury reached the dermis"],
            },
          ],
          answer: "The wound extends into the dermis",
        },
        {
          kind: "tip",
          body: "Tie each dermal structure back to a function from the first section: blood vessels and sweat glands to temperature regulation, nerve endings to sensation, sweat glands to excretion. The dermis is where most of the skin's functions physically happen.",
        },
        {
          kind: "mistake",
          body: "Sweat glands, oil glands, and hair follicles sit in the dermis even though hair and sweat reach the surface through the epidermis. Do not assign the gland to the layer where you see its product.",
        },
      ],
      quickCheck: {
        prompt: "Why are injuries that reach the dermis painful and bleeding?",
        choices: [
          "The dermis contains keratin, which triggers pain when torn",
          "The dermis contains blood vessels and nerve endings",
          "The dermis is made of adipose tissue that stores blood",
          "The dermis is the outermost layer and takes the most damage",
        ],
        answer: 1,
        explanation:
          "The dermis holds the blood supply and the nerves, so an injury deep enough to reach it both bleeds and hurts.",
      },
    },
    {
      id: "hypodermis",
      title: "Hypodermis (subcutaneous layer)",
      blocks: [
        {
          kind: "concept",
          body: "The hypodermis, also called the subcutaneous layer, is the deepest layer and lies below the dermis. Technically it is not part of the skin itself, but it anchors the skin to the underlying muscle and bone.\n\nIt is composed largely of adipose (fat) tissue along with loose connective tissue, and its jobs follow directly from that composition.",
        },
        {
          kind: "rule",
          title: "Hypodermis at a glance",
          items: [
            "Deepest layer, below the dermis; not technically part of the skin",
            "Anchors the skin to underlying muscle and bone",
            "Made largely of adipose (fat) and loose connective tissue",
            "Insulates, conserving body heat",
            "Stores energy",
            "Cushions deeper structures against impact",
          ],
        },
        {
          kind: "example",
          title: "Naming the layers from the outside in",
          steps: [
            {
              note: "Start at the surface with the dead, keratin-filled barrier cells.",
              work: ["Epidermis: epithelial tissue, no blood vessels"],
            },
            {
              note: "Move deeper to the layer with vessels, nerves, follicles, and glands.",
              work: ["Dermis: dense connective tissue, collagen and elastin"],
            },
            {
              note: "Deepest of the three, mostly fat, anchoring skin to what lies beneath.",
              work: ["Hypodermis: adipose and loose connective tissue"],
            },
          ],
          answer: "Epidermis, dermis, hypodermis",
        },
        {
          kind: "mistake",
          body: "The hypodermis is commonly counted as the third layer of skin, but strictly it lies below the skin and attaches it to muscle and bone. Read the question carefully: if it asks for layers of the skin proper, the answer is epidermis and dermis.",
        },
      ],
      quickCheck: {
        prompt:
          "Which tissue makes up most of the hypodermis and allows it to insulate and cushion?",
        choices: [
          "Stratified squamous epithelial tissue",
          "Dense connective tissue with collagen",
          "Adipose (fat) tissue",
          "Skeletal muscle tissue",
        ],
        answer: 2,
        explanation:
          "The hypodermis is composed largely of adipose tissue, which insulates to conserve heat, stores energy, and cushions deeper structures. Epithelial tissue forms the epidermis and dense connective tissue forms the dermis.",
      },
    },
  ],
};
