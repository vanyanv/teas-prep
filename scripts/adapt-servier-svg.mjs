/**
 * Turns a rendered Servier slide into a clean, croppable diagram asset.
 *
 * Every kit shares one slide template: decorative gradient wedges bleeding off
 * the top-left, a title across the top, a licence line along the bottom, and
 * the Servier wordmark bottom-right. All of it has to go. The logo is not a
 * style preference: Servier licenses the images under CC BY 4.0 but expressly
 * reserves its trademarks, so redistributing the wordmark is the one part of
 * the slide we have no licence for.
 *
 * Geometry is measured in a real browser via getBBox() rather than parsed out
 * of the path data, because transforms and nested groups make static analysis
 * of DrawingML-derived SVG unreliable.
 *
 *   node scripts/adapt-servier-svg.mjs in.svg out.svg
 *   node scripts/adapt-servier-svg.mjs in.svg out.svg --region 0.5,0,0.5,1
 *   node scripts/adapt-servier-svg.mjs in.svg out.svg --keep-text --pad 24
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { chromium } from "playwright";

const args = process.argv.slice(2);
const [input, output] = args.filter((a) => !a.startsWith("--"));
if (!input || !output) {
  console.error("usage: adapt-servier-svg.mjs <in.svg> <out.svg> [--region x,y,w,h] [--keep-text] [--pad n]");
  process.exit(1);
}

const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};
const region = flag("region", null)?.split(",").map(Number) ?? null;
const pad = Number(flag("pad", 16));
const keepText = args.includes("--keep-text");
const stripLeaders = args.includes("--strip-leaders");

/**
 * Explicit leader-ink colours, as `--strip-ink 86,91,162 --strip-ink 0,51,153`.
 *
 * Some kits draw their leaders as CURVES, which no geometric rule can separate
 * from artwork — a curved leader and a microtubule are the same shape. Colour
 * would separate them, but only per-kit: in the Intracellular kit the leaders
 * are navy while the cell membrane is a near blue, so any automatic blue rule
 * deletes the membrane. That is a judgement call about one specific diagram,
 * so it is made by the operator and recorded in the command, not guessed here.
 */
const stripInk = args
  .map((a, i) => (a === "--strip-ink" ? args[i + 1] : null))
  .filter(Boolean)
  .map((v) => v.split(",").map(Number));

/**
 * Bands of the slide, as fractions, that hold template furniture rather than
 * artwork. An element is dropped only when it sits ENTIRELY inside one of
 * these, so a diagram that happens to reach into the margin survives.
 */
const CHROME_BANDS = [
  { name: "footer", x: 0, y: 0.93, w: 1, h: 0.07 },
  { name: "logo", x: 0.78, y: 0.82, w: 0.22, h: 0.18 },
  { name: "title", x: 0.12, y: 0, w: 0.76, h: 0.17 },
];

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(readFileSync(resolve(input), "utf8"), { waitUntil: "load" });

const result = await page.evaluate(
  ({ bands, keepText, pad, region, stripLeaders, stripInk }) => {
    const svg = document.querySelector("svg");
    if (!svg) throw new Error("no <svg> root");

    const vb = svg.viewBox.baseVal;
    const W = vb.width || svg.width.baseVal.value;
    const H = vb.height || svg.height.baseVal.value;
    const X0 = vb.x || 0;
    const Y0 = vb.y || 0;

    const box = (b) => ({
      x: X0 + b.x * W,
      y: Y0 + b.y * H,
      w: b.w * W,
      h: b.h * H,
    });
    const inside = (r, o) =>
      r.x >= o.x - 0.5 && r.y >= o.y - 0.5 &&
      r.x + r.width <= o.x + o.w + 0.5 && r.y + r.height <= o.y + o.h + 0.5;

    const chrome = bands.map(box);
    const removed = [];
    // Stroke colours of the leader shafts we drop. Their arrowheads are
    // separate filled paths too small for any size test to catch, but they are
    // always drawn in the shaft's own colour.
    const leaderColors = new Set();
    const drawable = [...svg.querySelectorAll("path,rect,circle,ellipse,polygon,polyline,text,image,use")];

    for (const el of drawable) {
      let r;
      try { r = el.getBBox(); } catch { continue; }
      // Only a box with no extent on EITHER axis is nothing. A dead-flat
      // horizontal leader has height exactly 0, so skipping one-axis-zero
      // boxes here quietly exempted the very elements this pass removes.
      if (!r || (r.width === 0 && r.height === 0)) continue;

      // Template furniture: entirely within a chrome band.
      if (chrome.some((c) => inside(r, c))) {
        removed.push(el);
        continue;
      }
      // Decorative wedges: large, bleed off an edge, and sit behind the art.
      const bleeds = r.x <= X0 + 1 || r.y <= Y0 + 1;
      const big = (r.width * r.height) / (W * H) > 0.04;
      if (bleeds && big) {
        removed.push(el);
        continue;
      }
      const tag = el.tagName.toLowerCase();

      // Operator-declared leader ink. Matched on either paint, within a small
      // tolerance for the renderer's rounding.
      if (stripInk.length) {
        const cs = getComputedStyle(el);
        const near = (c) => {
          const m = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(c || "");
          if (!m) return false;
          const v = [+m[1], +m[2], +m[3]];
          return stripInk.some((t) => t.every((n, i) => Math.abs(n - v[i]) <= 6));
        };
        if (near(cs.fill) || near(cs.stroke)) {
          removed.push(el);
          continue;
        }
      }

      // pdftocairo emits text as <use> references to glyph symbols, not as
      // <text>, so dropping labels means dropping glyph uses.
      if (!keepText && (tag === "text" || tag === "use")) {
        removed.push(el);
        continue;
      }

      // Leader lines would otherwise survive their labels and point at
      // nothing. They are long, essentially straight strokes; curved artwork
      // like a microtubule has real extent on both axes and is spared.
      if (stripLeaders) {
        const thin = Math.min(r.width, r.height);
        const long = Math.max(r.width, r.height);
        if (thin < 4 && long > 40) {
          removed.push(el);
          continue;
        }
        // A diagonal leader has a fat bounding box and may be any colour the
        // kit's designer chose, so neither geometry nor hue finds it. What it
        // always is, structurally, is a single straight segment: one moveto,
        // one lineto, no curves. Anatomical artwork is drawn in Béziers, so
        // a curve-free two-point path is a leader with near-certainty.
        if (tag === "path") {
          const d = el.getAttribute("d") || "";
          const straight = !/[CcSsQqTtAa]/.test(d);
          const points = (d.match(/[MmLlHhVv]/g) || []).length;
          if (straight && points <= 3 && Math.hypot(r.width, r.height) > 40) {
            const sc = getComputedStyle(el).stroke;
            if (sc && sc !== "none") leaderColors.add(sc);
            removed.push(el);
            continue;
          }
        }
        // Neutral-grey leaders, which the kits also use, caught by hue.
        const cs = getComputedStyle(el);
        const m = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(cs.stroke || "");
        if (m) {
          const [cr, cg, cb] = [+m[1], +m[2], +m[3]];
          const neutral =
            Math.abs(cr - cg) < 14 && Math.abs(cg - cb) < 14 && Math.abs(cr - cb) < 14;
          const mid = cr > 90 && cr < 210;
          const diag = Math.hypot(r.width, r.height);
          if (neutral && mid && diag > 50) {
            removed.push(el);
            continue;
          }
        }
      }
    }
    // Second pass, once the leader palette is known. Two things escape the
    // first pass: arrowheads, which are filled paths too small for any size
    // test, and short shafts under the length threshold. Both are drawn in a
    // colour we have now positively identified as leader ink, so matching on
    // that colour is safe where matching on size alone was not.
    if (stripLeaders && leaderColors.size) {
      const gone = new Set(removed);
      for (const el of drawable) {
        if (gone.has(el)) continue;
        let r;
        try { r = el.getBBox(); } catch { continue; }
        const cs = getComputedStyle(el);
        const small = Math.max(r.width, r.height) <= 20;
        if (small && leaderColors.has(cs.fill)) {
          removed.push(el);
          continue;
        }
        if (el.tagName.toLowerCase() === "path" && leaderColors.has(cs.stroke)) {
          const d = el.getAttribute("d") || "";
          if (!/[CcSsQqTtAa]/.test(d)) removed.push(el);
        }
      }
    }

    for (const el of removed) el.remove();

    // Dropping the glyph <use> references orphans the glyph outlines they
    // pointed at. They no longer render but still ship, and on a text-heavy
    // slide they are most of the file.
    const referenced = new Set(
      [...svg.querySelectorAll("use")].map((u) =>
        (u.getAttribute("xlink:href") || u.getAttribute("href") || "").replace("#", ""),
      ),
    );
    for (const def of svg.querySelectorAll("defs [id], symbol[id]")) {
      if (!referenced.has(def.id)) def.remove();
    }

    // Whatever survives defines the real artwork bounds.
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const el of svg.querySelectorAll("path,rect,circle,ellipse,polygon,polyline,text,image")) {
      let r;
      try { r = el.getBBox(); } catch { continue; }
      if (!r || r.width === 0 || r.height === 0) continue;
      minX = Math.min(minX, r.x); minY = Math.min(minY, r.y);
      maxX = Math.max(maxX, r.x + r.width); maxY = Math.max(maxY, r.y + r.height);
    }
    if (!isFinite(minX)) throw new Error("nothing left after cleaning");

    // Reported so --region fractions can be chosen against the right frame:
    // they apply to the CLEANED artwork, which is smaller than the raw slide.
    const cleaned = {
      x: Math.round(minX), y: Math.round(minY),
      w: Math.round(maxX - minX), h: Math.round(maxY - minY),
    };

    // An optional sub-region selects one panel of a multi-panel slide, in
    // fractions of the cleaned artwork rather than of the original slide.
    if (region) {
      const [rx, ry, rw, rh] = region;
      const cw = maxX - minX, ch = maxY - minY;
      const nx = minX + rx * cw, ny = minY + ry * ch;
      maxX = nx + rw * cw; maxY = ny + rh * ch;
      minX = nx; minY = ny;
    }

    minX -= pad; minY -= pad; maxX += pad; maxY += pad;
    const w = Math.round(maxX - minX), h = Math.round(maxY - minY);

    svg.setAttribute("viewBox", `${minX.toFixed(1)} ${minY.toFixed(1)} ${w} ${h}`);
    svg.setAttribute("width", String(w));
    svg.setAttribute("height", String(h));
    svg.removeAttribute("style");

    // Column occupancy over the cleaned artwork, so multi-panel slides can be
    // split on a measured gap instead of a guessed fraction.
    const N = 20;
    const cols = new Array(N).fill(0);
    for (const el of svg.querySelectorAll("path,rect,circle,ellipse,polygon")) {
      let r;
      try { r = el.getBBox(); } catch { continue; }
      if (!r || !r.width || !r.height) continue;
      const a = Math.floor(((r.x - cleaned.x) / cleaned.w) * N);
      const z = Math.floor(((r.x + r.width - cleaned.x) / cleaned.w) * N);
      for (let i = Math.max(0, a); i <= Math.min(N - 1, z); i++) cols[i]++;
    }

    return {
      svg: new XMLSerializer().serializeToString(svg),
      removed: removed.length,
      width: w,
      height: h,
      cleaned,
      cols,
    };
  },
  { bands: CHROME_BANDS, keepText, pad, region, stripLeaders, stripInk },
);

await browser.close();

mkdirSync(dirname(resolve(output)), { recursive: true });
writeFileSync(resolve(output), result.svg);

const before = readFileSync(resolve(input)).length;
const after = result.svg.length;
console.log(
  `${output}  ${result.width}x${result.height}  ` +
    `removed ${result.removed} elements  ` +
    `${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`,
);
console.log(
  `cleaned artwork: ${result.cleaned.w}x${result.cleaned.h} at ` +
    `(${result.cleaned.x},${result.cleaned.y})`,
);
// Low buckets are gutters between panels; pick --region fractions across them.
console.log(
  "columns: " +
    result.cols.map((c, i) => `${(i / result.cols.length).toFixed(2)}:${c}`).join(" "),
);
