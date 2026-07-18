import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for SCIENCE / anatomy-physiology / "Gastrointestinal System".
 * Content carried over from the flat skill-lesson blocks, restructured into
 * the concept / rule / example / mistake / quick check pattern. Quick checks
 * are informal and never touch mastery.
 */
export const GASTROINTESTINAL_SYSTEM: GuidedLesson = {
  section: "SCIENCE",
  topic: "anatomy-physiology",
  skill: "Gastrointestinal System",
  slug: "gastrointestinal-system",
  title: "Gastrointestinal System",
  summary:
    "Follow food through the digestive organs and accessory glands, and learn the mechanical and chemical digestion steps with their key enzymes.",
  minutes: [8, 10],
  objectives: [
    "Name the organs of the alimentary canal in order",
    "Distinguish accessory organs from the tract itself",
    "Separate mechanical digestion from chemical digestion",
    "Match each major digestive enzyme to the nutrient it breaks down",
    "Explain where most digestion and absorption take place",
  ],
  sections: [
    {
      id: "gi-organs",
      title: "Organs of the GI tract",
      blocks: [
        {
          kind: "concept",
          body: "The alimentary canal is one continuous tube running from mouth to anus. Anything inside that tube is still, in a sense, outside the body: it has to be broken down and absorbed across the wall before it counts as nourishment.\n\nAccessory organs sit alongside the tube and deliver secretions into it. Food never passes through them, which is the single fact that separates the two groups.",
        },
        {
          kind: "figure",
          src: "/hotspots/digestive.svg",
          alt: "Schematic of the digestive tract: a tube descends from the throat into a curved sac, which leads to a coiled length of intestine framed by a wider loop, with a large organ beside the sac.",
          caption:
            "Trace the tube itself (A → B → D → E). The liver sits beside the tube, not in it: that is what makes it an accessory organ.",
          legend: [
            { label: "A", name: "Esophagus", note: "carries the bolus to the stomach" },
            { label: "B", name: "Stomach", note: "churns food; acid and pepsin start protein digestion" },
            { label: "C", name: "Liver", note: "accessory organ; makes bile" },
            { label: "D", name: "Small intestine", note: "most chemical digestion and absorption" },
            { label: "E", name: "Large intestine", note: "absorbs water; forms stool" },
          ],
        },
        {
          kind: "rule",
          title: "The alimentary canal, in order",
          ordered: true,
          items: [
            "Mouth",
            "Pharynx",
            "Esophagus",
            "Stomach",
            "Small intestine",
            "Large intestine",
            "Rectum",
            "Anus",
          ],
        },
        {
          kind: "rule",
          title: "Accessory organs and what they contribute",
          items: [
            "Salivary glands: saliva, which begins starch digestion",
            "Liver: produces bile",
            "Gallbladder: stores and concentrates bile",
            "Pancreas: produces digestive enzymes and bicarbonate",
          ],
        },
        {
          kind: "example",
          title: "Subdivisions worth memorizing",
          steps: [
            {
              note: "The small intestine has three parts, in the order food meets them.",
              work: ["duodenum", "jejunum", "ileum"],
            },
            {
              note: "The large intestine has four, ending the canal.",
              work: ["cecum", "colon", "rectum", "anal canal"],
            },
          ],
          answer:
            "Small intestine: duodenum, jejunum, ileum. Large intestine: cecum, colon, rectum, anal canal. The list above walks the canal end to end, so it names the rectum and anus separately; both conventions are common, and the rectum is part of the large intestine either way.",
        },
        {
          kind: "mistake",
          body: "The liver and pancreas are not part of the GI tract. Food never enters them; they only send bile and enzymes into the tube. Calling them tract organs is a common error.",
        },
        {
          kind: "tip",
          body: "Bile has two organs attached to it: the liver makes it, the gallbladder stores it. Questions often test which of the two does which.",
        },
      ],
      quickCheck: {
        prompt: "Which of these is an accessory organ rather than part of the alimentary canal?",
        choices: ["Esophagus", "Gallbladder", "Cecum", "Duodenum"],
        answer: 1,
        explanation:
          "The gallbladder stores and concentrates bile but food never passes through it. The esophagus, cecum, and duodenum are all segments of the tube itself.",
      },
    },
    {
      id: "digestion-process",
      title: "The process of digestion",
      blocks: [
        {
          kind: "concept",
          body: "Digestion happens two ways at once. Mechanical digestion physically breaks food apart into smaller pieces. Chemical digestion uses enzymes to break the bonds holding nutrient molecules together.\n\nBoth start in the mouth and continue down the tract, but they are not the same process and questions often ask you to sort one from the other.",
        },
        {
          kind: "rule",
          title: "Following food down the tract",
          ordered: true,
          items: [
            "Mouth: teeth chew (mechanical) while saliva begins starch digestion (chemical)",
            "Esophagus: peristalsis, waves of smooth muscle contraction, moves the bolus down",
            "Stomach: churning mixes food with gastric juice (hydrochloric acid and enzymes) to form chyme",
            "Small intestine: most chemical digestion and nearly all nutrient absorption",
            "Large intestine: absorbs water and electrolytes; remaining waste becomes feces",
          ],
        },
        {
          kind: "example",
          title: "Why the small intestine absorbs so much",
          steps: [
            {
              note: "Its lining is folded into finger-like villi, and each villus is covered in microvilli.",
              work: ["villi", "microvilli"],
            },
            {
              note: "Those projections multiply the surface area available for nutrients to cross the wall.",
              work: [],
              becomes:
                "enormous surface area, so nearly all absorption happens here",
            },
          ],
          answer:
            "Villi and microvilli give the small intestine the surface area for nearly all nutrient absorption.",
        },
        {
          kind: "example",
          title: "Sorting mechanical from chemical",
          steps: [
            {
              note: "Ask whether the food is being broken into smaller pieces or having its bonds cut.",
              work: [
                "chewing: smaller pieces, so mechanical",
                "saliva on starch: bonds cut, so chemical",
                "stomach churning: smaller pieces, so mechanical",
              ],
            },
          ],
          answer: "Pieces means mechanical; bonds means chemical.",
        },
        {
          kind: "concept",
          body: "The large intestine does little digesting of its own. It reclaims water and electrolytes, and it houses bacteria that produce some vitamins.",
        },
        {
          kind: "mistake",
          body: "The stomach is not where most digestion finishes. It churns food into chyme and starts protein digestion, but most chemical digestion and nearly all absorption happen in the small intestine.",
        },
      ],
      quickCheck: {
        prompt: "Where does nearly all nutrient absorption take place?",
        choices: [
          "The stomach, where food is churned into chyme",
          "The small intestine, across villi and microvilli",
          "The large intestine, along with water absorption",
          "The esophagus, during peristalsis",
        ],
        answer: 1,
        explanation:
          "The small intestine's villi and microvilli provide enormous surface area, so nearly all nutrient absorption happens there. The large intestine absorbs water and electrolytes, not nutrients.",
      },
    },
    {
      id: "digestive-enzymes",
      title: "Key digestive enzymes",
      blocks: [
        {
          kind: "concept",
          body: "Enzymes are named for what they break down, so the name usually gives away the answer. Amylase works on starch (amylose), lipase on lipids, lactase on lactose, and nucleases on nucleic acids.\n\nLearn each enzyme with two facts attached: the nutrient it acts on and where it comes from.",
        },
        {
          kind: "tabs",
          tabs: [
            {
              label: "Carbohydrates",
              blocks: [
                {
                  kind: "rule",
                  items: [
                    "Salivary amylase (mouth) and pancreatic amylase break starch into sugars",
                    "Maltase, sucrase, and lactase finish the job in the small intestine",
                  ],
                },
              ],
            },
            {
              label: "Proteins",
              blocks: [
                {
                  kind: "rule",
                  items: [
                    "Pepsin is active in the acidic stomach",
                    "Pancreatic trypsin works in the small intestine",
                    "Both break proteins into peptides and amino acids",
                  ],
                },
              ],
            },
            {
              label: "Fats",
              blocks: [
                {
                  kind: "rule",
                  ordered: true,
                  items: [
                    "Bile from the liver emulsifies fat (mechanical, not an enzyme)",
                    "Pancreatic lipase breaks fats into fatty acids and glycerol",
                  ],
                },
              ],
            },
            {
              label: "Nucleic acids",
              blocks: [
                {
                  kind: "rule",
                  items: ["Nucleases break down nucleic acids"],
                },
              ],
            },
          ],
        },
        {
          kind: "example",
          title: "Tracing a fatty meal",
          steps: [
            {
              note: "Bile, made by the liver, emulsifies the fat into small droplets. No bonds are cut yet.",
              work: ["large fat globules become small droplets"],
            },
            {
              note: "Pancreatic lipase then cuts the bonds chemically.",
              work: ["fats become fatty acids and glycerol"],
              becomes: "products absorbed in the small intestine",
            },
          ],
          answer:
            "Bile emulsifies (mechanical); lipase digests (chemical).",
        },
        {
          kind: "rule",
          title: "The pancreas does two jobs",
          items: [
            "Produces the enzymes that do most digestion in the small intestine: amylase, trypsin, lipase, nucleases",
            "Releases bicarbonate, which neutralizes acid arriving from the stomach",
          ],
        },
        {
          kind: "mistake",
          body: "Bile is not an enzyme. It emulsifies fat into smaller droplets, which is mechanical work; pancreatic lipase does the chemical digestion. Treating bile as the fat-digesting enzyme is a frequent trap.",
        },
        {
          kind: "tip",
          body: "If a question asks which organ supplies the enzymes for the small intestine, the answer is almost always the pancreas.",
        },
      ],
      quickCheck: {
        prompt: "Which pairing is correct?",
        choices: [
          "Bile: the enzyme that digests fats",
          "Pepsin: breaks starch into sugars in the stomach",
          "Pancreatic lipase: breaks fats into fatty acids and glycerol",
          "Salivary amylase: breaks proteins into amino acids",
        ],
        answer: 2,
        explanation:
          "Lipase acts on lipids, producing fatty acids and glycerol. Bile emulsifies fat but is not an enzyme, pepsin digests protein, and amylase digests starch.",
      },
    },
  ],
};
