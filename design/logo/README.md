# kantan か mark — design variations

Proof-of-concept for the kantan logo: a **か monogram mark** + a **"kantan かんたん"
wordmark**, per the `i18n / SEO / logo` plan. Direction chosen with the user: か (simple,
self-explanatory, holds up at favicon size). All assets are hand-coded SVG — free to produce,
one solid color, no stock or paid type. The か glyph is font-rendered (Noto Sans JP / system
sans); convert to paths later only if pixel-perfect lockup is needed at every size.

## Tile marks (favicon candidates)

| # | File | Idea |
| --- | --- | --- |
| 01 | `01-classic-tile.svg` | Rounded square, white bold か on accent blue — direct evolution of today's favicon. **Recommended primary.** |
| 02 | `02-squircle.svg` | Softer continuous-corner tile, same blue. |
| 03 | `03-circle.svg` | Circular tile, app-icon feel. |
| 04 | `04-outline.svg` | Hairline tile, か in accent — lighter, editorial. |
| 05 | `05-ink-tile.svg` | Near-black tile, white か — classic, print-safe, strong in dark UI. |
| 06 | `06-solid-glyph.svg` | か alone, no tile — watermark / mono companion. **Recommended companion.** |
| 07 | `07-pen-ka.svg` | Hand-built stroke paths, round caps — handwritten feel. Rough; needs a designer's eye. |

## Wordmark lockups (header / hero)

- `lockup-a-word-kana.svg` — accent tile mark + `kantan` + small `かんたん — simple` tagline.
- `lockup-b-ink-tile.svg` — same, with the ink tile and muted tagline.
- `lockup-c-type-only.svg` — type only: `kantan` + accent `かんたん`, no tile.

## Share image

- `share-image.svg` — 1200 × 630 og:image template: mark + wordmark + the site title on a
  clean tile.

## Next steps (if a variant is chosen)

- Set the mark as `public/favicon.svg` (+ `apple-touch-icon`) and the lockup in the header.
- Build the 1200 × 630 default share image from `share-image.svg`.
- Colors are provisional (`#2563eb`); final accent should be pulled from the AstroPaper theme
  presets (see the i18n/SEO/logo plan).
