#!/usr/bin/env bash
# Render selected Servier PPTX slides to SVG and PNG.
#
# LibreOffice converts the deck to PDF (preserving the DrawingML vectors), then
# pdftocairo splits out one file per slide. Going via PDF matters: LibreOffice's
# direct SVG export flattens a deck to its first slide only.
#
# Rendering is faithful reproduction, not adaptation. Output lands in a staging
# directory that is NOT committed; an asset only enters the repo once it has a
# licence record in src/content/assets.ts.
#
#   scripts/render-servier.sh <kits-dir> <out-dir> [KitName:slide ...]
#
# With no slide list, renders the default proof-of-concept set.
set -euo pipefail

KITS_DIR="${1:?usage: render-servier.sh <kits-dir> <out-dir> [Kit:slide ...]}"
OUT_DIR="${2:?missing out-dir}"
shift 2

TARGETS=("$@")
if [ ${#TARGETS[@]} -eq 0 ]; then
  TARGETS=(
    "SMART-Intracellular-components:16"   # Example: Animal cell, fully labelled
    "SMART-Heart-physiology:3"            # Heart (1), external anterior view
    "SMART-Heart-physiology:20"           # Heart sections, chambers cutaway
    "SMART-Heart-physiology:19"           # Valves
  )
fi

SOFFICE="$(command -v soffice || command -v libreoffice || true)"
if [ -z "$SOFFICE" ]; then
  echo "LibreOffice not found. Install it, then re-run:" >&2
  echo "  sudo apt-get update && sudo apt-get install -y libreoffice-impress" >&2
  exit 1
fi
command -v pdftocairo >/dev/null || { echo "pdftocairo missing (apt install poppler-utils)" >&2; exit 1; }

mkdir -p "$OUT_DIR/pdf" "$OUT_DIR/svg" "$OUT_DIR/png"

# Converting a whole deck is slow, so cache the PDF and reuse it across slides.
declare -A CONVERTED=()

for target in "${TARGETS[@]}"; do
  kit="${target%%:*}"
  slide="${target##*:}"
  src="$KITS_DIR/$kit.pptx"

  [ -f "$src" ] || { echo "! missing $src" >&2; continue; }

  if [ -z "${CONVERTED[$kit]:-}" ]; then
    echo "converting $kit ..."
    "$SOFFICE" --headless --norestore \
      --convert-to pdf --outdir "$OUT_DIR/pdf" "$src" >/dev/null 2>&1 || true
    [ -f "$OUT_DIR/pdf/$kit.pdf" ] || { echo "! conversion failed: $kit" >&2; continue; }
    CONVERTED[$kit]=1
  fi

  base="$(echo "$kit" | sed 's/^SMART-//' | tr '[:upper:]' '[:lower:]')-s${slide}"
  pdf="$OUT_DIR/pdf/$kit.pdf"

  # -f/-l select the single page; pdftocairo appends nothing for svg but does
  # suffix png output, so both are normalised to <base>.<ext> below.
  pdftocairo -svg -f "$slide" -l "$slide" "$pdf" "$OUT_DIR/svg/$base.svg"
  pdftocairo -png -r 200 -f "$slide" -l "$slide" -singlefile "$pdf" "$OUT_DIR/png/$base"

  sz_svg=$(stat -c%s "$OUT_DIR/svg/$base.svg" 2>/dev/null || echo 0)
  sz_png=$(stat -c%s "$OUT_DIR/png/$base.png" 2>/dev/null || echo 0)
  printf "  %-40s svg %6s KB   png %6s KB\n" "$base" "$((sz_svg / 1024))" "$((sz_png / 1024))"
done

echo
echo "staged in $OUT_DIR (not committed)"
echo "next: crop/trim, then create the licence record in src/content/assets.ts"
