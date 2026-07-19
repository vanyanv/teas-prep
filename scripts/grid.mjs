/**
 * Overlays a percentage grid on an image so hot-spot regions can be read off
 * rather than guessed. Minor lines every 5%, major every 10%, labelled.
 *
 *   node scripts/grid.mjs <image-path> <out.png> [renderWidth]
 */
import { readFileSync } from "node:fs";
import { basename, extname, resolve } from "node:path";
import { chromium } from "playwright";

const [img, out, w = "700"] = process.argv.slice(2);
const ext = extname(img).toLowerCase();
const mime = ext === ".svg" ? "image/svg+xml" : "image/png";
const data = `data:${mime};base64,${readFileSync(resolve(img)).toString("base64")}`;

const lines = [];
for (let i = 5; i < 100; i += 5) {
  const major = i % 10 === 0;
  const c = major ? "rgba(220,0,0,.75)" : "rgba(0,90,220,.35)";
  lines.push(`<div style="position:absolute;left:${i}%;top:0;bottom:0;width:1px;background:${c}"></div>`);
  lines.push(`<div style="position:absolute;top:${i}%;left:0;right:0;height:1px;background:${c}"></div>`);
  if (major) {
    lines.push(`<div style="position:absolute;left:${i}%;top:0;font:10px monospace;color:#c00;background:#fff">${i}</div>`);
    lines.push(`<div style="position:absolute;top:${i}%;left:0;font:10px monospace;color:#c00;background:#fff">${i}</div>`);
  }
}
const html = `<body style="margin:0;background:#fff">
<div style="position:relative;width:${w}px">
<img src="${data}" style="width:100%;display:block">${lines.join("")}
</div></body>`;

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: +w + 20, height: 1400 } });
await p.setContent(html, { waitUntil: "load" });
const el = await p.$("div");
await el.screenshot({ path: out });
await b.close();
console.log(`${basename(img)} -> ${out}`);
