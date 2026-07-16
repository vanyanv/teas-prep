import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for SCIENCE / anatomy-physiology / "Respiratory System".
 * Content carried over from the flat skill-lesson blocks, restructured into
 * the concept / rule / example / mistake / quick check pattern. Quick checks
 * are informal and never touch mastery.
 */
export const RESPIRATORY_SYSTEM: GuidedLesson = {
  section: "SCIENCE",
  topic: "anatomy-physiology",
  skill: "Respiratory System",
  slug: "respiratory-system",
  title: "The Respiratory System",
  summary:
    "Understand the airway structures, the mechanics of inhalation and exhalation, and how gases are exchanged across the alveolar membrane.",
  minutes: [9, 11],
  objectives: [
    "Trace a breath of air from the nose to the alveoli in order",
    "Distinguish the conducting zone from the respiratory zone",
    "Separate the upper respiratory tract from the lower respiratory tract",
    "Explain how the diaphragm and intercostals move air by changing pressure",
    "Describe how oxygen and carbon dioxide diffuse at the alveoli and the tissues",
  ],
  sections: [
    {
      id: "air-pathway",
      title: "The air pathway",
      blocks: [
        {
          kind: "concept",
          body: "Every breath follows one fixed route from the outside air down to the gas-exchange surface. TEAS questions often give you two structures and ask which comes first, so the order itself is worth memorizing.\n\nEach structure along the way has a job. The larynx holds the vocal cords and is guarded by the epiglottis, the flap that covers the airway when you swallow. The trachea stays open because C-shaped rings of cartilage hold it that way.",
        },
        {
          kind: "rule",
          title: "The route air takes",
          ordered: true,
          items: [
            "Nose and nasal cavity",
            "Pharynx (throat)",
            "Larynx (voice box, with the vocal cords and epiglottis)",
            "Trachea (windpipe, held open by C-shaped cartilage rings)",
            "Right and left primary bronchi",
            "Bronchioles",
            "Alveoli",
          ],
        },
        {
          kind: "example",
          title: "Which comes first, the larynx or the trachea?",
          steps: [
            {
              note: "Work down the route from the throat: the pharynx leads into the larynx.",
              work: ["pharynx, then larynx"],
            },
            {
              note: "The larynx opens into the trachea, so the larynx comes first.",
              work: ["larynx, then trachea"],
              becomes: "pharynx, larynx, trachea",
            },
          ],
          answer: "The larynx comes first; air passes it on the way to the trachea.",
        },
        {
          kind: "tip",
          body: "The airway branches from wide to narrow: one trachea splits into two primary bronchi, which branch into many bronchioles, which end at the alveoli. If a structure sounds smaller, it sits further down the path.",
        },
        {
          kind: "mistake",
          body: "Do not place the trachea before the larynx. The larynx sits above the trachea, which is why the epiglottis can cover the airway entrance before anything reaches the windpipe.",
        },
      ],
      quickCheck: {
        prompt: "Air leaving the bronchioles moves next into which structure?",
        choices: ["The primary bronchi", "The alveoli", "The trachea", "The larynx"],
        answer: 1,
        explanation:
          "The bronchioles are the last branching airways, and they end at the alveoli. The bronchi, trachea, and larynx all sit above the bronchioles on the path.",
      },
    },
    {
      id: "zones-and-tracts",
      title: "Zones, tracts, and lobes",
      blocks: [
        {
          kind: "concept",
          body: "The same pathway gets divided two different ways, and the TEAS uses both. One split is by function (does the structure exchange gas?), the other is by location (upper or lower).",
        },
        {
          kind: "tabs",
          tabs: [
            {
              label: "By function",
              blocks: [
                {
                  kind: "rule",
                  title: "Conducting zone vs respiratory zone",
                  items: [
                    "Conducting zone: nose through bronchioles. It warms, humidifies, and filters air, but does no gas exchange",
                    "Respiratory zone: the alveoli. This is where gas exchange occurs",
                  ],
                },
                {
                  kind: "tip",
                  body: "The conducting zone is plumbing; the respiratory zone is the destination. Only the alveoli trade gases with the blood.",
                },
              ],
            },
            {
              label: "By location",
              blocks: [
                {
                  kind: "rule",
                  title: "Upper tract vs lower tract",
                  items: [
                    "Upper respiratory tract: nose, nasal cavity, and pharynx",
                    "Lower respiratory tract: larynx, trachea, bronchi, and lungs",
                  ],
                },
                {
                  kind: "tip",
                  body: "The larynx is the dividing line. Everything from the voice box down is the lower tract.",
                },
              ],
            },
          ],
        },
        {
          kind: "rule",
          title: "Lung lobes",
          items: [
            "The right lung has three lobes",
            "The left lung has two lobes, leaving room for the heart",
          ],
        },
        {
          kind: "example",
          title: "Is the trachea in the conducting zone or the respiratory zone?",
          steps: [
            {
              note: "Ask the functional question: does the trachea exchange gas with the blood?",
              work: ["No gas exchange occurs in the trachea"],
            },
            {
              note: "Only the alveoli exchange gas, so everything above them conducts.",
              work: [],
              becomes: "The trachea is conducting zone (and lower tract).",
            },
          ],
          answer: "Conducting zone, and part of the lower respiratory tract.",
        },
        {
          kind: "mistake",
          body: "Conducting and upper are not the same idea. The trachea is a conducting structure but sits in the lower tract, so a structure can be conducting and lower at once.",
        },
      ],
      quickCheck: {
        prompt: "Why does the left lung have only two lobes?",
        choices: [
          "It performs less gas exchange than the right lung",
          "It leaves room for the heart",
          "It belongs to the upper respiratory tract",
          "It receives air from only one bronchus",
        ],
        answer: 1,
        explanation:
          "The left lung has two lobes and the right has three because the heart occupies space on the left side of the chest.",
      },
    },
    {
      id: "mechanics-of-breathing",
      title: "Mechanics of breathing",
      blocks: [
        {
          kind: "concept",
          body: "Air is not pulled in by the lungs themselves. Muscles change the volume of the chest, volume changes pressure, and air follows the pressure difference. Air always flows from higher pressure to lower pressure.\n\nBoyle's Law states the relationship: as volume increases, pressure decreases. That one sentence explains both halves of a breath.",
        },
        {
          kind: "rule",
          title: "The two phases",
          items: [
            "Inhalation is active: the diaphragm contracts and flattens downward, the external intercostals lift the rib cage, thoracic volume increases, lung pressure drops, and air rushes in",
            "Normal exhalation is passive: the diaphragm and intercostals relax, the lungs recoil elastically, thoracic volume decreases, pressure rises, and air flows out",
          ],
        },
        {
          kind: "example",
          title: "Trace an inhalation",
          steps: [
            {
              note: "The diaphragm contracts, which flattens it and moves it downward.",
              work: ["diaphragm contracts, moves down"],
            },
            {
              note: "The chest cavity gets bigger, so by Boyle's Law the pressure inside falls.",
              work: ["volume increases, so pressure decreases"],
            },
            {
              note: "Outside air is now at higher pressure than the lungs, so it flows in.",
              work: ["high pressure outside, low pressure inside"],
              becomes: "Air moves into the lungs.",
            },
          ],
          answer:
            "Contraction raises volume, lowers pressure, and air flows in.",
        },
        {
          kind: "concept",
          body: "The medulla oblongata sets the breathing rate. It responds mainly to rising carbon dioxide and falling pH in the blood, not to falling oxygen.",
        },
        {
          kind: "mistake",
          body: "A contracting diaphragm moves down, not up. Students often picture the diaphragm rising during inhalation, which would shrink the chest and push air out instead.",
        },
      ],
      quickCheck: {
        prompt:
          "During quiet, normal exhalation, what happens to the diaphragm?",
        choices: [
          "It contracts and flattens downward",
          "It relaxes and thoracic volume decreases",
          "It contracts while pressure in the lungs falls",
          "It stays fixed while the bronchioles squeeze air out",
        ],
        answer: 1,
        explanation:
          "Normal exhalation is passive: the diaphragm and intercostals relax, the lungs recoil, volume drops, pressure rises, and air flows out.",
      },
    },
    {
      id: "gas-exchange",
      title: "Gas exchange at the alveoli",
      blocks: [
        {
          kind: "concept",
          body: "Alveoli are tiny air sacs wrapped in pulmonary capillaries. Together they give a huge, thin, moist surface for gases to cross.\n\nNo pumping is involved. Gases move by simple diffusion, from high partial pressure to low partial pressure. Each gas moves down its own gradient, independently of the other.",
        },
        {
          kind: "rule",
          title: "Two exchange sites, opposite directions",
          items: [
            "External respiration (at the alveoli): oxygen is high in the alveoli and diffuses into the blood, where it binds hemoglobin in red blood cells; carbon dioxide is high in the blood and diffuses out to be exhaled",
            "Internal respiration (at the body tissues): oxygen leaves the blood for the cells, and carbon dioxide enters the blood",
          ],
        },
        {
          kind: "example",
          title: "Which way does oxygen move at the alveoli?",
          steps: [
            {
              note: "Compare partial pressures on each side of the membrane.",
              work: ["oxygen high in alveolar air", "oxygen low in returning blood"],
            },
            {
              note: "Diffusion runs from high to low, so oxygen crosses into the blood.",
              work: ["alveoli, then capillary blood"],
              becomes: "Oxygen binds hemoglobin in the red blood cells.",
            },
          ],
          answer: "Oxygen diffuses from the alveoli into the blood.",
        },
        {
          kind: "why",
          label: "Why does the same gas move both ways in one body?",
          body: "Diffusion has no sense of direction; it only follows the gradient in front of it. At the alveoli, blood arrives low in oxygen and high in carbon dioxide, so oxygen goes in and carbon dioxide goes out. By the time that blood reaches the tissues, the cells have consumed oxygen and produced carbon dioxide, so the gradients are reversed and so is the traffic.",
        },
        {
          kind: "concept",
          body: "The two gases also travel differently once loaded. Oxygen binds to hemoglobin in the red blood cells. Most carbon dioxide is carried in the plasma as bicarbonate ions.",
        },
        {
          kind: "mistake",
          body: "Do not swap external and internal respiration. External respiration happens at the alveoli, where blood meets outside air; internal respiration happens deep in the body at the tissues.",
        },
      ],
      quickCheck: {
        prompt: "How is most carbon dioxide carried in the blood?",
        choices: [
          "Bound to hemoglobin in red blood cells",
          "As bicarbonate ions in the plasma",
          "Dissolved in the alveolar fluid",
          "Attached to the walls of the pulmonary capillaries",
        ],
        answer: 1,
        explanation:
          "Most carbon dioxide travels in the plasma as bicarbonate ions. Hemoglobin binding is the transport route for oxygen.",
      },
    },
  ],
};
