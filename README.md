# Diana & Richard — Luxury Wedding Invitation

A mobile-first Next.js App Router wedding invitation inspired by the supplied 720×1280 reel.

## What was matched from the reel

- Blush/cream paper palette with embossed-looking floral texture.
- Centered wax-seal envelope opening sequence.
- Floral arch gateway that scales outward on scroll, exposing the lake/villa scene underneath.
- Editorial serif + romantic script typography hierarchy.
- Monogram treatment, language toggle, and floating music control.
- Main invitation card with large script names, uppercase microcopy, split month/day/year date block, venue line, and illustrated architectural/lake artwork.
- Long-form scroll with countdown and celebration cards using fine-line venue sketches and drapery.
- Desktop fallback stays phone-like with a 480px max-width stage while real phones remain full-width.

## Motion values

The reel does not expose the original template's private Framer Motion source values, so these are the exact values used in this implementation after tuning to the visible choreography:

```ts
const MOTION = {
  seal: { type: "spring", stiffness: 280, damping: 22, mass: 0.55 },
  flap: { type: "spring", stiffness: 95, damping: 18, mass: 1.05 },
  card: { type: "spring", stiffness: 82, damping: 18, mass: 0.95 },
  reveal: { type: "spring", stiffness: 110, damping: 24, mass: 0.7 },
};
```

The floral gateway uses a scroll-linked scale curve of `1 → 1.8 → 3.7`, with side translation to push the two floral halves beyond the viewport edges.

## Asset replacement

Replace these files while preserving their filenames and dimensions/aspect ratios:

- `public/assets/envelope-texture.svg`
- `public/assets/floral-arch.svg`
- `public/assets/lake-villa.svg`
- `public/assets/curtain.svg`
- `public/assets/villa-sketch.svg`
- `public/assets/tremezzo-sketch.svg`

For photographic/high-resolution artwork, you can instead change the `Image` `src` values in `app/page.tsx` to WebP/AVIF/PNG files under `public/assets`.

## Customising the invitation

Edit the `WEDDING` object near the top of `app/page.tsx`:

- names and monogram
- wedding date and ISO timestamp
- venue and ceremony time
- celebration entries
- venue artwork used for each entry

## Run

```bash
npm install
npm run dev
```

Then open the local URL shown by Next.js.
