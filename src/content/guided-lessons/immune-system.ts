import type { GuidedLesson } from "../guided-lesson-types";

/** Guided lesson for SCIENCE / anatomy-physiology / "Immune System". Content
 *  carried over from the flat skill-lesson blocks, restructured into the
 *  concept / rule / example / mistake / quick check pattern. */
export const IMMUNE_SYSTEM: GuidedLesson = {
  section: "SCIENCE",
  topic: "anatomy-physiology",
  skill: "Immune System",
  slug: "immune-system",
  title: "Immune System",
  summary:
    "Distinguish innate from adaptive immunity and understand the role of the lymphatic system in defense and fluid balance.",
  minutes: [8, 10],
  objectives: [
    "Describe the first and second lines of innate defense",
    "Distinguish innate immunity from adaptive immunity",
    "Compare cell-mediated and humoral immunity",
    "Explain how immune memory and vaccines work",
    "Identify the lymphatic system's roles in immunity and fluid balance",
  ],
  sections: [
    {
      id: "innate-immunity",
      title: "Innate (nonspecific) immunity",
      blocks: [
        {
          kind: "concept",
          body: "Innate immunity is the body's first and second lines of defense. It is present from birth, acts quickly, and is nonspecific, meaning it responds the same way to any threat.\n\nIt does not learn. The same barriers and the same internal response meet a bacterium, a virus, or a splinter, and they meet the second exposure exactly as they met the first.",
        },
        {
          kind: "rule",
          title: "First line: barriers",
          intro:
            "Physical and chemical barriers that keep pathogens outside the body.",
          items: [
            "Skin",
            "Mucous membranes",
            "Stomach acid",
            "Tears and saliva",
          ],
        },
        {
          kind: "rule",
          title: "Second line: internal nonspecific response",
          intro: "What happens once something gets past the barriers.",
          items: [
            "Phagocytic white blood cells (macrophages, neutrophils) engulf pathogens",
            "Natural killer cells destroy compromised cells",
            "Inflammatory response: redness, heat, swelling, pain",
            "Fever raises body temperature to slow pathogen growth",
          ],
        },
        {
          kind: "example",
          title: "A splinter breaks the skin",
          steps: [
            {
              note: "The first line has been breached, so the barrier no longer helps.",
              work: ["Skin broken, bacteria enter the tissue"],
            },
            {
              note: "The second line responds without identifying the specific bacterium.",
              work: [
                "Inflammation: redness, heat, swelling, pain",
                "Neutrophils and macrophages engulf the bacteria",
              ],
            },
          ],
          answer:
            "Innate immunity handles it, the same way it would handle any other pathogen.",
        },
        {
          kind: "mistake",
          body: "Fever and inflammation are not signs that the immune system has failed. They are part of the second line of defense doing its job.",
        },
      ],
      quickCheck: {
        prompt: "Which feature best defines innate immunity?",
        choices: [
          "It targets one specific antigen at a time",
          "It responds the same way to any threat and is present from birth",
          "It develops only after a first exposure to a pathogen",
          "It depends on antibodies made by B cells",
        ],
        answer: 1,
        explanation:
          "Innate immunity is nonspecific and present from birth. Specificity, memory from a first exposure, and antibodies all belong to adaptive immunity.",
      },
    },
    {
      id: "adaptive-immunity",
      title: "Adaptive (specific) immunity",
      blocks: [
        {
          kind: "concept",
          body: "Adaptive immunity is the third line of defense. It is specific to a particular pathogen, slower to develop the first time, and it creates memory, so future responses are faster and stronger.\n\nWhat it targets is an antigen: a foreign marker that identifies a particular pathogen.",
        },
        {
          kind: "tabs",
          tabs: [
            {
              label: "Cell-mediated",
              blocks: [
                {
                  kind: "concept",
                  body: "Cell-mediated immunity uses T lymphocytes (T cells). It works on cells, not on free-floating pathogens.",
                },
                {
                  kind: "rule",
                  items: [
                    "Helper T cells coordinate the immune response",
                    "Cytotoxic T cells destroy infected cells",
                  ],
                },
              ],
            },
            {
              label: "Humoral",
              blocks: [
                {
                  kind: "concept",
                  body: "Humoral immunity uses B lymphocytes (B cells), which produce antibodies that bind and neutralize specific antigens.",
                },
                {
                  kind: "rule",
                  items: [
                    "B cells produce antibodies against a specific antigen",
                    "Antibodies bind and neutralize that antigen",
                    "Memory cells remain afterward for long-term protection",
                  ],
                },
              ],
            },
          ],
        },
        {
          kind: "example",
          title: "First exposure versus second exposure",
          steps: [
            {
              note: "On the first exposure, adaptive immunity has to build a response from scratch, so it is slow.",
              work: ["Antigen recognized", "B cells make antibodies over days"],
            },
            {
              note: "Memory cells stay behind after the infection clears.",
              work: [],
            },
            {
              note: "On a second exposure to the same pathogen, the memory cells act immediately.",
              work: ["Response is faster and stronger"],
              becomes: "The person may never feel sick.",
            },
          ],
          answer:
            "Memory is what makes the second response fast; this is also how vaccines protect you.",
        },
        {
          kind: "concept",
          body: "Vaccines work by training adaptive immunity to build this memory without causing the disease.",
        },
        {
          kind: "mistake",
          body: "Do not swap the two arms. T cells are cell-mediated; B cells are humoral and make the antibodies.",
        },
      ],
      quickCheck: {
        prompt: "Which cells produce antibodies?",
        choices: [
          "Helper T cells",
          "Cytotoxic T cells",
          "B lymphocytes",
          "Natural killer cells",
        ],
        answer: 2,
        explanation:
          "B lymphocytes drive humoral immunity by producing antibodies against a specific antigen. T cells coordinate and kill infected cells but do not make antibodies.",
      },
    },
    {
      id: "lymphatic-system",
      title: "The lymphatic system",
      blocks: [
        {
          kind: "concept",
          body: "The lymphatic system supports immunity and fluid balance. Fluid constantly leaks out of blood capillaries into the tissues; the lymphatic system collects it, returns it to the bloodstream as lymph, and also absorbs fats from the digestive tract.",
        },
        {
          kind: "rule",
          title: "Three jobs",
          items: [
            "Collect excess tissue fluid and return it to the bloodstream",
            "House immune cells that trap and destroy pathogens",
            "Absorb fats from the digestive tract",
          ],
        },
        {
          kind: "rule",
          title: "Lymphatic organs",
          items: [
            "Lymph nodes: filter lymph and house immune cells (swollen nodes signal an active infection)",
            "Spleen: filters blood and removes old red cells",
            "Thymus: where T cells mature",
            "Tonsils",
          ],
        },
        {
          kind: "concept",
          body: "The system has no central pump. Lymph is moved by skeletal muscle contraction, and one-way valves keep it from flowing backward.",
        },
        {
          kind: "example",
          title: "Why a sore throat comes with swollen neck nodes",
          steps: [
            {
              note: "Lymph from the throat drains through nearby lymph nodes.",
              work: ["Pathogens are carried into the node"],
            },
            {
              note: "Immune cells in the node trap and destroy them, and the node fills with activity.",
              work: ["Node swells and becomes tender"],
            },
          ],
          answer:
            "The swelling is the node filtering an active infection, not the infection itself spreading.",
        },
        {
          kind: "tip",
          body: "Movement matters: because there is no pump, skeletal muscle contraction is what keeps lymph circulating.",
        },
      ],
      quickCheck: {
        prompt: "What moves lymph through the lymphatic vessels?",
        choices: [
          "The heart, which pumps lymph as it pumps blood",
          "The spleen, which acts as the lymphatic pump",
          "Skeletal muscle contraction together with one-way valves",
          "Pressure from fluid leaking out of the blood capillaries",
        ],
        answer: 2,
        explanation:
          "The lymphatic system has no central pump. Skeletal muscle contraction moves the lymph, and one-way valves keep it flowing in a single direction.",
      },
    },
  ],
};
