/**
 * Learning-asset registry for Science diagrams.
 *
 * Assets are authored here rather than in the database for the same reason
 * taxonomy, skills, and lessons are: the review trail is git history and the
 * gate is `scripts/validate-assets.mts`. Binaries live in Cloudflare R2, so a
 * Prisma table would add a second content convention and buy little.
 *
 * NOTHING may be added here without complete licence provenance. An asset with
 * an unclear licence, unclear authorship, or unverified commercial-use terms is
 * rejected, not filed as PROPOSED and revisited.
 */

export type SourceProvider =
  | "SERVIER"
  | "WIKIMEDIA"
  | "CDC_PHIL"
  | "OPEN_ANATOMY"
  | "CUSTOM";

export type AssetStatus =
  | "PROPOSED"
  | "LICENSE_REVIEW"
  | "APPROVED"
  | "ADAPTED"
  | "CONTENT_REVIEWED"
  | "PUBLISHED";

/**
 * Licences cleared for use. Anything outside this set fails validation.
 * CC BY-SA is deliberately absent: share-alike could reach the adaptation layer
 * built around the image, and no single diagram is worth that ambiguity.
 */
export const ALLOWED_LICENSES = [
  "Public Domain",
  "CC0 1.0",
  "CC BY 4.0",
  "CC BY 3.0",
] as const;

export type AllowedLicense = (typeof ALLOWED_LICENSES)[number];

/**
 * One labelled structure within a diagram, in PERCENT of the image box (0-100)
 * so the overlay stays aligned at every responsive size.
 *
 * This single declaration drives every variant: the labelled lesson view, the
 * unlabelled practice view, numbered identification, hot-spot regions, and
 * drag-and-drop targets. Geometry is authored once, never per question.
 */
export interface AssetStructure {
  /** Stable within the asset, e.g. "left-ventricle". */
  id: string;
  /** Display name shown on the labelled variant. */
  name: string;
  /** Screen-reader label; must stand alone without the image. */
  accessibleLabel: string;
  /** Optional function note used by structure-and-function questions. */
  note?: string;
  x: number;
  y: number;
  w: number;
  h: number;
  /** Label anchor when the region centre would collide with artwork. */
  labelX?: number;
  labelY?: number;
  /**
   * Whether this region can be clicked as a hot-spot answer. Default true.
   *
   * Set false when a structure is a label anchor only. Some subjects overlap by
   * nature — the three anatomical planes all pass through the torso — so their
   * boxes cannot be made disjoint without lying about the anatomy. Those
   * diagrams are taught with multiple choice or drag-and-drop, and the
   * geometric constraints that hot-spots require do not apply to them.
   */
  interactive?: boolean;
}

/** A structure is clickable unless it explicitly opts out. */
export function isInteractive(s: AssetStructure): boolean {
  return s.interactive !== false;
}

export interface LearningAsset {
  id: string;
  title: string;
  description: string;
  section: "SCIENCE";
  topic: string;
  /** Full `topic:slug` skill ids this asset can serve. */
  skillIds: string[];

  sourceProvider: SourceProvider;
  creator: string;
  /** Page the asset was found on — not the file URL. */
  originalSourceUrl: string;
  downloadUrl: string;
  licenseName: AllowedLicense;
  licenseUrl: string;
  commercialUseAllowed: boolean;
  adaptationAllowed: boolean;
  shareAlikeRequired: boolean;
  attributionRequired: boolean;
  /** Rendered verbatim in the credits page and the on-image disclosure. */
  attributionText: string;
  reviewedBy?: string;
  reviewedAt?: string;

  /** R2 object key, e.g. "science/heart-chambers.png". Not a public/ path. */
  objectKey: string;
  /** Intrinsic pixel size. Required: prevents layout shift on remote images. */
  width: number;
  height: number;
  format: "PNG" | "JPG" | "WEBP" | "SVG";
  /** Describes the diagram for screen readers; never repeats the caption. */
  altText: string;
  status: AssetStatus;

  structures: AssetStructure[];
}

/** Smallest tap target we accept, in CSS px, per WCAG 2.5.8. */
export const MIN_TAP_TARGET_PX = 44;
/** Rendered width a diagram is assumed to occupy on the narrowest phone. */
export const MIN_RENDERED_WIDTH_PX = 320;

/**
 * Shared Servier provenance. Verified against the live terms on 2026-07-18:
 * CC BY 4.0, commercial use permitted, adaptation permitted, and "inclusion in
 * paid courses and subscription platforms" named explicitly as allowed. Their
 * trademarks are NOT licensed, which is why the adaptation step strips the
 * wordmark from every slide.
 */
const SERVIER = {
  sourceProvider: "SERVIER",
  creator: "Servier Medical Art",
  licenseName: "CC BY 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
  commercialUseAllowed: true,
  adaptationAllowed: true,
  shareAlikeRequired: false,
  attributionRequired: true,
  attributionText:
    "Image adapted from Servier Medical Art (https://smart.servier.com/), " +
    "licensed under CC BY 4.0. Cropped, labels and slide chrome removed, " +
    "recoloured labelling added.",
  reviewedBy: "chris@chrisneddys.com",
  reviewedAt: "2026-07-18",
} as const;

export const ASSETS: LearningAsset[] = [
  {
    id: "sci-heart-chambers",
    title: "Heart chambers and valves",
    description:
      "Coronal section of the heart showing all four chambers, the " +
      "atrioventricular and semilunar valves, and the great vessels.",
    section: "SCIENCE",
    topic: "anatomy-physiology",
    skillIds: ["anatomy-physiology:cardiovascular-system"],
    ...SERVIER,
    originalSourceUrl: "https://smart.servier.com/image-kits-by-category/",
    downloadUrl: "https://smart.servier.com/image-kits-by-category/",
    objectKey: "science/heart-chambers.svg",
    width: 314,
    height: 441,
    format: "SVG",
    altText:
      "A cut-away front view of the heart showing the four chambers: right " +
      "atrium and right ventricle on one side, left atrium and left ventricle " +
      "on the other, separated by valves, with the aorta and pulmonary artery " +
      "leaving the top.",
    status: "ADAPTED",
    structures: [],
  },
  {
    id: "sci-animal-cell",
    title: "Animal cell and organelles",
    description:
      "Cut-away animal cell showing the nucleus and nucleolus, both forms of " +
      "endoplasmic reticulum, Golgi apparatus, mitochondria, lysosomes, " +
      "vacuoles, centrosome, and the cell membrane.",
    section: "SCIENCE",
    topic: "biology",
    skillIds: ["biology:describe-cell-structure-function-and-organization"],
    ...SERVIER,
    originalSourceUrl: "https://smart.servier.com/image-kits-by-category/",
    downloadUrl: "https://smart.servier.com/image-kits-by-category/",
    objectKey: "science/animal-cell.svg",
    width: 499,
    height: 478,
    format: "SVG",
    altText:
      "A cut-away animal cell with a large round nucleus containing a " +
      "nucleolus, surrounded by mitochondria, stacked Golgi membranes, rough " +
      "and smooth endoplasmic reticulum, small lysosomes and vacuoles, all " +
      "enclosed by the cell membrane.",
    status: "ADAPTED",
    structures: [],
  },
  {
    id: "sci-anatomical-planes",
    title: "Anatomical planes and directional terms",
    description:
      "A figure in anatomical position crossed by the sagittal, frontal, and " +
      "transverse planes, with the directional pairs each plane separates.",
    section: "SCIENCE",
    topic: "anatomy-physiology",
    skillIds: [
      "anatomy-physiology:demonstrate-knowledge-of-the-general-orientation-of-human-anatomy",
    ],

    // Original artwork. Servier has no planes diagram — all 990 slides across
    // the 49 kits were searched — so this was drawn rather than adapted.
    sourceProvider: "CUSTOM",
    creator: "TEAS 7 Prep",
    originalSourceUrl: "https://teas-prep-phi.vercel.app/credits",
    downloadUrl: "https://teas-prep-phi.vercel.app/diagrams/anatomical-planes.svg",
    licenseName: "CC0 1.0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    commercialUseAllowed: true,
    adaptationAllowed: true,
    shareAlikeRequired: false,
    attributionRequired: false,
    attributionText: "Original illustration created for TEAS 7 Prep.",

    objectKey: "diagrams/anatomical-planes.svg",
    width: 800,
    height: 640,
    format: "SVG",
    altText:
      "A human figure standing in anatomical position, crossed by three planes: " +
      "a vertical sagittal plane dividing left from right, a vertical frontal " +
      "plane dividing front from back, and a horizontal transverse plane " +
      "dividing upper from lower.",
    status: "ADAPTED",

    // The three planes intersect through the torso by definition, so their
    // boxes overlap and cannot back a hot-spot question. This diagram teaches
    // through multiple choice and drag-and-drop labelling; a separate
    // three-panel variant would be needed for hot-spot use.
    structures: [
      {
        id: "sagittal",
        name: "Sagittal plane",
        accessibleLabel: "Sagittal plane, dividing the body into left and right",
        note: "Divides left from right; the midsagittal plane splits the body evenly.",
        x: 50,
        y: 1.9,
        w: 8.8,
        h: 94,
        interactive: false,
      },
      {
        id: "frontal",
        name: "Frontal plane",
        accessibleLabel:
          "Frontal plane, also called coronal, dividing the body into front and back",
        note: "Divides anterior from posterior.",
        x: 36.5,
        y: 5.6,
        w: 27,
        h: 88.8,
        interactive: false,
      },
      {
        id: "transverse",
        name: "Transverse plane",
        accessibleLabel:
          "Transverse plane, dividing the body into upper and lower portions",
        note: "Divides superior from inferior; also called the axial or horizontal plane.",
        x: 35.8,
        y: 49,
        w: 35.8,
        h: 5.6,
        interactive: false,
      },
    ],
  },
];

const BY_ID = new Map(ASSETS.map((a) => [a.id, a]));

export function getAsset(id: string): LearningAsset | undefined {
  return BY_ID.get(id);
}

export function publishedAssets(): LearningAsset[] {
  return ASSETS.filter((a) => a.status === "PUBLISHED");
}

/** Assets needing attribution, ordered for the credits page. */
export function assetsForCredits(): LearningAsset[] {
  return publishedAssets()
    .filter((a) => a.attributionRequired)
    .sort((a, b) => a.title.localeCompare(b.title));
}

/**
 * Public URL for an asset's base image. Returns null when the R2 public base
 * URL is unset so callers can fall back rather than render a broken image.
 */
export function assetUrl(asset: LearningAsset): string | null {
  // Original artwork is small, versioned with the code, and carries no licence
  // burden, so it ships from public/ rather than paying a round trip to R2.
  if (asset.sourceProvider === "CUSTOM") return `/${asset.objectKey}`;

  const base = process.env.NEXT_PUBLIC_R2_PUBLIC_BASE_URL;
  if (!base) return null;
  return `${base.replace(/\/$/, "")}/${asset.objectKey}`;
}

/**
 * Hot-spot regions in the shape the quiz runner already expects. The order of
 * `structureIds` becomes the answer-index order, matching how grading compares
 * indices, so callers control it explicitly rather than relying on declaration
 * order in `structures`.
 */
export function hotspotsFor(
  asset: LearningAsset,
  structureIds: string[],
): { x: number; y: number; w: number; h: number; label?: string }[] {
  return structureIds.map((sid) => {
    const s = asset.structures.find((st) => st.id === sid);
    if (!s) throw new Error(`asset ${asset.id}: unknown structure "${sid}"`);
    return { x: s.x, y: s.y, w: s.w, h: s.h, label: s.accessibleLabel };
  });
}
