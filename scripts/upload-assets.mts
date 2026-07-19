/**
 * Uploads adapted Science diagram base images to Cloudflare R2.
 *
 * Source of truth is the registry: an asset is uploaded under its `objectKey`,
 * read from a local staging directory. Files not in the registry are ignored,
 * so nothing reaches the bucket without a licence record — that ordering is the
 * whole point and should not be relaxed for convenience.
 *
 *   npx tsx scripts/upload-assets.mts --dry-run
 *   npx tsx scripts/upload-assets.mts
 *   npx tsx scripts/upload-assets.mts --dir assets/science --force
 */
import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import { basename, join } from "node:path";

import "dotenv/config";
import {
  S3Client,
  PutObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";

import { ASSETS, type LearningAsset } from "../src/content/assets";

const argv = process.argv.slice(2);
const dryRun = argv.includes("--dry-run");
const force = argv.includes("--force");
const dirArg = argv.indexOf("--dir");
const STAGING = dirArg !== -1 ? argv[dirArg + 1] : "assets/science";

const CONTENT_TYPE: Record<LearningAsset["format"], string> = {
  PNG: "image/png",
  JPG: "image/jpeg",
  WEBP: "image/webp",
  SVG: "image/svg+xml",
};

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) {
    console.error(`missing ${name} — see .env.example`);
    process.exit(1);
  }
  return v;
}

/** Assets past adaptation are the only ones with a file worth uploading. */
const UPLOADABLE: LearningAsset["status"][] = [
  "ADAPTED",
  "CONTENT_REVIEWED",
  "PUBLISHED",
];

async function main() {
  const bucket = requireEnv("R2_BUCKET");
  const s3 = new S3Client({
    region: "auto",
    endpoint: requireEnv("R2_ENDPOINT"),
    credentials: {
      accessKeyId: requireEnv("R2_ACCESS_KEY_ID"),
      secretAccessKey: requireEnv("R2_SECRET_ACCESS_KEY"),
    },
  });

  // Original artwork ships from public/ and is versioned with the code, so it
  // has no R2 object and must not be reported as a missing upload.
  const queue = ASSETS.filter(
    (a) => UPLOADABLE.includes(a.status) && a.sourceProvider !== "CUSTOM",
  );
  if (!queue.length) {
    console.log("no assets at ADAPTED or later — nothing to upload");
    return;
  }

  let uploaded = 0;
  let skipped = 0;
  const missing: string[] = [];

  for (const asset of queue) {
    const local = join(STAGING, basename(asset.objectKey));
    if (!existsSync(local)) {
      missing.push(`${asset.id}: expected ${local}`);
      continue;
    }

    const body = readFileSync(local);
    const hash = createHash("sha256").update(body).digest("hex").slice(0, 16);

    if (!force) {
      // Re-uploading identical bytes wastes a write and busts caches for no
      // reason, so compare the checksum we stored as metadata last time.
      try {
        const head = await s3.send(
          new HeadObjectCommand({ Bucket: bucket, Key: asset.objectKey }),
        );
        if (head.Metadata?.sha256 === hash) {
          console.log(`= ${asset.objectKey} (unchanged)`);
          skipped++;
          continue;
        }
      } catch {
        // Not present yet; fall through to upload.
      }
    }

    const kb = (statSync(local).size / 1024).toFixed(0);
    if (dryRun) {
      console.log(`+ ${asset.objectKey} (${kb} KB) [dry run]`);
      uploaded++;
      continue;
    }

    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: asset.objectKey,
        Body: body,
        ContentType: CONTENT_TYPE[asset.format],
        // Keys are content-addressed by review, not mutated in place, so a
        // long immutable TTL is safe and keeps r2.dev request counts down.
        CacheControl: "public, max-age=31536000, immutable",
        Metadata: { sha256: hash, "asset-id": asset.id },
      }),
    );
    console.log(`+ ${asset.objectKey} (${kb} KB)`);
    uploaded++;
  }

  console.log(
    `\n${dryRun ? "would upload" : "uploaded"} ${uploaded}, unchanged ${skipped}` +
      (missing.length ? `, missing ${missing.length}` : ""),
  );

  if (missing.length) {
    console.error(`\nmissing local files under ${STAGING}/:`);
    console.error(missing.join("\n"));
    process.exit(1);
  }

  const base = process.env.NEXT_PUBLIC_R2_PUBLIC_BASE_URL;
  if (!base && !dryRun) {
    console.warn(
      "\nNEXT_PUBLIC_R2_PUBLIC_BASE_URL is unset, so the app cannot render " +
        "these yet. Enable public access on the bucket and set it.",
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
