# Package print labels — CV. Nurul Jannah / Moringa

RGB PNG files at 300 DPI. Convert to CMYK at the printer.

## Pouch products (tea, coffee, powder, noodle, stick, crackers)

| | |
|---|---|
| Trim size | 130 × 210 mm |
| Resolution | 300 DPI |
| Pixel size | 1535 × 2480 px |
| Files | `{slug}-front.png`, `{slug}-back.png` |

Front matches the current pack design (NJ mark, MORINGA wordmark, Indonesian name, Madura, net weight, cert marks).
Window pouches (noodle, stick, crackers): the solid white panel is a **knockout / transparent window**. Do not print ink there.

Add 3 mm bleed around the trim when making plates.

## Oil (glass bottle)

| | |
|---|---|
| Trim size | 60 × 90 mm |
| Resolution | 300 DPI |
| Pixel size | 709 × 1063 px |
| Files | `moringa-oil-front.png`, `moringa-oil-back.png` |

Scale to the bottle die if the 30 ml glass wrap differs.

## Notes for production

- Batch code, best-before, and official PIRT number are **not** baked into the art — inkjet/stamp them on pack.
- Ingredient lines are typical for each SKU. Confirm against the approved recipe before press.
- Cert marks: Organik Indonesia, Halal Indonesia, P-IRT Indonesia as used on the website.
- Company: CV. Nurul Jannah · Pakandangan Sangra, Bluto, Sumenep, Madura
- Contact: export@cvnuruljannah.com · +62 853 6765 9422 · cvnuruljannah.com

Regenerate: `node scripts/generate-package-labels.mjs`
