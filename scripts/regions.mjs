/**
 * Draws an asset's registered hot-spot regions over its artwork so the
 * geometry can be checked by eye. Interactive regions are solid, label anchors
 * dashed — mixing them up is how a region ends up too small to tap.
 *
 * Percent geometry is easy to get subtly wrong and impossible to verify by
 * reading numbers, so nothing should reach a learner without this render.
 *
 *   node scripts/regions.mjs <asset-id> <out.png> [renderWidth]
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { chromium } from "playwright";

const [assetId, out, w = "700"] = process.argv.slice(2);
const { getAsset, isInteractive } = await import("../src/content/assets.ts");

const asset = getAsset(assetId);
if (!asset) throw new Error(`unknown asset ${assetId}`);

// Read from the staging copy or public/, never the network: the point is to
// check the file about to ship, not whatever is already deployed.
const local = asset.sourceProvider === "CUSTOM"
  ? `public/${asset.objectKey}`
  : `assets/science/${asset.objectKey.split("/").pop()}`;
const data = `data:image/svg+xml;base64,${readFileSync(resolve(local)).toString("base64")}`;

const boxes = asset.structures.map((s) => {
  const live = isInteractive(s);
  const color = live ? "rgba(200,0,0,.9)" : "rgba(0,110,200,.75)";
  return `<div style="position:absolute;left:${s.x}%;top:${s.y}%;width:${s.w}%;height:${s.h}%;
    border:2px ${live ? "solid" : "dashed"} ${color};box-sizing:border-box">
    <span style="position:absolute;top:0;left:0;font:10px monospace;color:#fff;
      background:${color};padding:0 2px;white-space:nowrap">${s.id}</span></div>`;
});

const html = `<body style="margin:0;background:#fff">
<div style="position:relative;width:${w}px">
<img src="${data}" style="width:100%;display:block">${boxes.join("")}
</div></body>`;

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: +w + 20, height: 1400 } });
await p.setContent(html, { waitUntil: "load" });
await (await p.$("div")).screenshot({ path: out });
await b.close();

const solid = asset.structures.filter(isInteractive).length;
console.log(`${assetId}: ${solid} interactive, ${asset.structures.length - solid} label anchors -> ${out}`);
