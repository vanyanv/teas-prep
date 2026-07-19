/**
 * Screenshot a local file in both colour schemes.
 *
 * Uses real colorScheme emulation rather than Chrome's --force-dark-mode:
 * forced dark post-processes the rendered pixels, so it shows a page that no
 * user will ever see and hides whether the SVG's own media query works.
 *
 *   node scripts/shot.mjs <file-or-url> <out-prefix> [width] [height]
 */
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

import { chromium } from "playwright";

const [target, out, w = "900", h = "700"] = process.argv.slice(2);
// Relative paths are the common case from the shell, and "file://" + a
// relative path silently resolves the first segment as a hostname.
const url = /^https?:|^file:/.test(target)
  ? target
  : pathToFileURL(resolve(target)).href;

const b = await chromium.launch();
for (const colorScheme of ["light", "dark"]) {
  const ctx = await b.newContext({
    colorScheme,
    viewport: { width: +w, height: +h },
  });
  const p = await ctx.newPage();
  await p.goto(url);
  // Not fullPage: a standalone SVG document has no layout height for Chrome
  // to measure, and the fullPage path hangs waiting for one.
  await p.screenshot({ path: `${out}-${colorScheme}.png` });
  await ctx.close();
}
await b.close();
