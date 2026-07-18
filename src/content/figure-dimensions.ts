/**
 * Intrinsic pixel dimensions of the schematics in public/hotspots.
 *
 * The plates are hand-drawn SVGs served as <img> (they carry clickable overlay
 * regions, so they can't be inlined or run through next/image). A browser can't
 * know an SVG's aspect ratio until it has downloaded it, so without explicit
 * width/height attributes every diagram lays out at zero height and then shoves
 * the page down on load, mid-question. These are the viewBox dimensions of the
 * files themselves; keep them in sync when a plate is redrawn.
 */
const FIGURE_DIMENSIONS: Record<string, { width: number; height: number }> = {
  "/hotspots/heart.svg": { width: 1000, height: 640 },
  "/hotspots/neuron.svg": { width: 1000, height: 500 },
  "/hotspots/cell.svg": { width: 800, height: 600 },
  "/hotspots/digestive.svg": { width: 800, height: 640 },
};

/** Falls back to 8:5, the shape of the widest plate, for unknown art. */
export function figureDimensions(src: string): { width: number; height: number } {
  return FIGURE_DIMENSIONS[src] ?? { width: 800, height: 500 };
}
