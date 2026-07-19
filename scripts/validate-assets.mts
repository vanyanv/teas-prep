/**
 * Structural and legal validation for the Science diagram registry
 * (src/content/assets.ts). Runs in the style of validate-guided-lessons.mts:
 * collect every problem, print them all, exit non-zero.
 *
 * The licence checks are the point. An asset that reaches PUBLISHED without
 * verified commercial-use terms is a legal exposure, not a content bug, so the
 * gate refuses it rather than warning.
 *
 *   npx tsx scripts/validate-assets.mts
 */
import {
  ASSETS,
  ALLOWED_LICENSES,
  MIN_TAP_TARGET_PX,
  MIN_RENDERED_WIDTH_PX,
  isInteractive,
  type LearningAsset,
} from "../src/content/assets";
import { SKILL_NODES } from "../src/content/taxonomy";

const problems: string[] = [];
const p = (msg: string) => problems.push(msg);

const KNOWN_SKILL_IDS = new Set(SKILL_NODES.map((n) => n.skillId));

/** Statuses at which an asset is served to learners. */
const LIVE: LearningAsset["status"][] = ["PUBLISHED"];

function checkLicence(a: LearningAsset) {
  const at = `${a.id} [licence]`;

  if (!(ALLOWED_LICENSES as readonly string[]).includes(a.licenseName)) {
    p(`${at}: "${a.licenseName}" is not on the allowlist`);
  }
  if (!a.commercialUseAllowed) {
    p(`${at}: commercialUseAllowed is false — the product ships a paid tier`);
  }
  if (!a.adaptationAllowed) {
    p(`${at}: adaptationAllowed is false, but every asset is adapted`);
  }
  if (a.shareAlikeRequired) {
    p(`${at}: shareAlikeRequired is true — share-alike assets are rejected`);
  }
  if (a.attributionRequired && !a.attributionText.trim()) {
    p(`${at}: attribution required but attributionText is empty`);
  }
  for (const [field, url] of [
    ["originalSourceUrl", a.originalSourceUrl],
    ["licenseUrl", a.licenseUrl],
    ["downloadUrl", a.downloadUrl],
  ] as const) {
    if (!/^https:\/\//.test(url)) p(`${at}: ${field} must be an https URL`);
  }
  if (!a.creator.trim()) p(`${at}: creator is required`);

  // Provenance must be signed off before an asset can be served.
  if (LIVE.includes(a.status) && !a.reviewedBy) {
    p(`${at}: status ${a.status} requires reviewedBy`);
  }
}

function checkPresentation(a: LearningAsset) {
  const at = `${a.id} [presentation]`;

  if (!a.altText.trim()) {
    p(`${at}: altText is required`);
  } else if (a.altText.trim().length < 20) {
    p(`${at}: altText is too short to describe a diagram`);
  } else if (/^(image|diagram|figure|picture)\b/i.test(a.altText.trim())) {
    p(`${at}: altText should describe the diagram, not announce that it is one`);
  }

  // Dimensions are load-bearing: remote images with no intrinsic size shift
  // layout on load, which is worse here than it was for local files.
  if (!(a.width > 0) || !(a.height > 0)) {
    p(`${at}: width and height are required and must be positive`);
  }
  if (!a.objectKey.trim() || a.objectKey.startsWith("/")) {
    p(`${at}: objectKey must be a non-empty R2 key with no leading slash`);
  }
  const ext = a.objectKey.split(".").pop()?.toUpperCase();
  if (ext && ext !== a.format) {
    p(`${at}: objectKey extension .${ext} disagrees with format ${a.format}`);
  }
}

function checkTaxonomy(a: LearningAsset) {
  const at = `${a.id} [taxonomy]`;
  if (!a.skillIds.length) p(`${at}: at least one skillId is required`);
  for (const sid of a.skillIds) {
    if (!KNOWN_SKILL_IDS.has(sid)) p(`${at}: unknown skillId "${sid}"`);
    if (!sid.startsWith(`${a.topic}:`)) {
      p(`${at}: skillId "${sid}" does not belong to topic "${a.topic}"`);
    }
  }
}

function checkStructures(a: LearningAsset) {
  const at = `${a.id} [structures]`;
  const seen = new Set<string>();

  // Geometry is authored after adaptation, so an asset is allowed to be
  // structure-less until it is put in front of a learner.
  if (!a.structures.length && !["PROPOSED", "LICENSE_REVIEW", "APPROVED", "ADAPTED"].includes(a.status)) {
    p(`${at}: status ${a.status} requires structures to back a labelled or hot-spot view`);
  }

  // How wide the image renders on the narrowest supported phone, used to turn
  // percent geometry into real tap targets.
  const renderedH = (MIN_RENDERED_WIDTH_PX * a.height) / a.width;

  for (const s of a.structures) {
    if (seen.has(s.id)) p(`${at}: duplicate structure id "${s.id}"`);
    seen.add(s.id);

    if (!s.accessibleLabel.trim()) {
      p(`${at}/${s.id}: accessibleLabel is required — hot-spot questions must be answerable without the image`);
    }

    for (const [k, v] of [["x", s.x], ["y", s.y], ["w", s.w], ["h", s.h]] as const) {
      if (v < 0 || v > 100) p(`${at}/${s.id}: ${k}=${v} is outside 0-100`);
    }
    if (s.x + s.w > 100 || s.y + s.h > 100) {
      p(`${at}/${s.id}: region extends past the image edge`);
    }

    // Tap size only constrains regions a learner actually clicks; a label
    // anchor may legitimately be small.
    if (!isInteractive(s)) continue;

    const tapW = (s.w / 100) * MIN_RENDERED_WIDTH_PX;
    const tapH = (s.h / 100) * renderedH;
    if (tapW < MIN_TAP_TARGET_PX || tapH < MIN_TAP_TARGET_PX) {
      p(
        `${at}/${s.id}: renders ${tapW.toFixed(0)}x${tapH.toFixed(0)}px at ` +
          `${MIN_RENDERED_WIDTH_PX}px wide, below the ${MIN_TAP_TARGET_PX}px minimum`,
      );
    }
  }
}

function checkOverlaps(a: LearningAsset) {
  // Overlapping regions make a hot-spot answer ambiguous: a tap in the overlap
  // silently resolves to whichever region paints last.
  // Only interactive regions need to be disjoint: overlap is ambiguous only
  // when a tap has to resolve to exactly one answer.
  const s = a.structures.filter(isInteractive);
  for (let i = 0; i < s.length; i++) {
    for (let j = i + 1; j < s.length; j++) {
      const A = s[i];
      const B = s[j];
      const ox = Math.min(A.x + A.w, B.x + B.w) - Math.max(A.x, B.x);
      const oy = Math.min(A.y + A.h, B.y + B.h) - Math.max(A.y, B.y);
      if (ox > 0 && oy > 0) {
        p(`${a.id} [structures]: regions "${A.id}" and "${B.id}" overlap`);
      }
    }
  }
}

function main() {
  const ids = new Set<string>();
  for (const a of ASSETS) {
    if (ids.has(a.id)) p(`duplicate asset id ${a.id}`);
    ids.add(a.id);

    checkLicence(a);
    checkPresentation(a);
    checkTaxonomy(a);
    checkStructures(a);
    checkOverlaps(a);
  }

  const live = ASSETS.filter((a) => LIVE.includes(a.status)).length;
  console.log(
    `validated ${ASSETS.length} assets (${live} published, ` +
      `${ASSETS.length - live} in progress)`,
  );

  if (problems.length) {
    console.error(`\n${problems.length} problem(s):`);
    console.error(problems.join("\n"));
    process.exit(1);
  }
  console.log("NO PROBLEMS");
}

main();
