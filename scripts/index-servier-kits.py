#!/usr/bin/env python3
"""
Index the Servier Medical Art PPTX kits without converting anything.

A .pptx is a zip of XML, so slide text, shape counts, and embedded media can be
read with the standard library alone. This produces the catalogue we search to
decide which slide backs which diagram, before any rendering tool is involved.

    python3 scripts/index-servier-kits.py <kits-dir> [-o out.json]
"""
from __future__ import annotations

import argparse
import json
import re
import sys
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET

A = "{http://schemas.openxmlformats.org/drawingml/2006/main}"
P = "{http://schemas.openxmlformats.org/presentationml/2006/main}"

# Slide XML orders shapes as authored, not as displayed, so text is joined in
# document order and lightly squashed rather than treated as a title/body pair.
WS = re.compile(r"\s+")


def slide_sort_key(name: str) -> int:
    m = re.search(r"slide(\d+)\.xml$", name)
    return int(m.group(1)) if m else 0


def read_slide(zf: zipfile.ZipFile, name: str) -> dict:
    raw = zf.read(name)
    try:
        root = ET.fromstring(raw)
    except ET.ParseError as e:
        return {"slide": slide_sort_key(name), "error": f"parse: {e}"}

    texts = [t.text for t in root.iter(f"{A}t") if t.text and t.text.strip()]
    label = WS.sub(" ", " ".join(texts)).strip()

    # custGeom is hand-drawn vector; prstGeom is a stock shape. Both are
    # vector, so their sum is a fair proxy for how much artwork a slide holds.
    cust = len(list(root.iter(f"{A}custGeom")))
    prst = len(list(root.iter(f"{A}prstGeom")))
    pics = len(list(root.iter(f"{P}pic")))

    return {
        "slide": slide_sort_key(name),
        "label": label,
        "custGeom": cust,
        "prstGeom": prst,
        "rasters": pics,
        "bytes": len(raw),
        "vector": cust + prst > 0 and pics == 0,
    }


def read_kit(path: Path) -> dict:
    with zipfile.ZipFile(path) as zf:
        names = sorted(
            (n for n in zf.namelist() if re.match(r"ppt/slides/slide\d+\.xml$", n)),
            key=slide_sort_key,
        )
        slides = [read_slide(zf, n) for n in names]
        media = [n for n in zf.namelist() if n.startswith("ppt/media/")]

    return {
        "kit": path.stem,
        "file": str(path),
        "slideCount": len(slides),
        "mediaCount": len(media),
        "slides": slides,
    }


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("kits_dir")
    ap.add_argument("-o", "--out", default="servier-index.json")
    args = ap.parse_args()

    kits_dir = Path(args.kits_dir)
    files = sorted(kits_dir.glob("*.pptx"))
    if not files:
        print(f"no .pptx found in {kits_dir}", file=sys.stderr)
        return 1

    kits, slides_total, vector_total = [], 0, 0
    for f in files:
        try:
            kit = read_kit(f)
        except Exception as e:  # a corrupt kit should not abort the catalogue
            print(f"! {f.name}: {e}", file=sys.stderr)
            continue
        kits.append(kit)
        slides_total += kit["slideCount"]
        vector_total += sum(1 for s in kit["slides"] if s.get("vector"))
        print(f"{kit['kit']:<44} {kit['slideCount']:>3} slides")

    Path(args.out).write_text(json.dumps(kits, indent=2))
    print(
        f"\n{len(kits)} kits, {slides_total} slides, "
        f"{vector_total} pure-vector ({vector_total * 100 // max(slides_total, 1)}%)"
    )
    print(f"wrote {args.out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
