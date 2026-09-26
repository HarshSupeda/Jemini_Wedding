# Supplied reel analysis

Source video: 720×1280, 30fps, 422 frames, ~14.07s.

## Visible choreography

| Reel window | Observed website state | Implementation |
|---|---|---|
| 0.0–~2.8s | Pink embossed envelope fills the phone screen; circular gold wax seal; centered invitation text | `EnvelopeReveal` + `EnvelopeArt` |
| ~2.8–~5.8s | Envelope/fold opens and transitions to a floral entrance scene | `EnvelopeReveal` -> `GatewayScene` |
| ~5.8–~8.7s | Tall floral arch, drapery, cypress/terrace imagery, monogram and names | `FloralGateway` + `LakeIllustration` |
| ~8.0–~10.5s | Main invitation details: script names, uppercase request copy, split date, venue, time, architectural/lake artwork | `MainInvitation` |
| ~10.0–~11.8s | Countdown page with decorative architectural/floral frame | `CountdownSection` |
| ~11.8–~14.1s | Celebration content continues into illustrated venue/drapery sections | `CelebrationsSection` |

## Typography hierarchy observed

- Large elegant connected-script treatment for names and section headings.
- Refined serif for the body/date system.
- Small uppercase tracking-heavy labels for metadata.
- Thin rules, lots of negative space, and soft low-contrast ink.

## Interaction cues observed

- First interaction is a tap/press on the wax seal / envelope area.
- The long-form page is vertically scrollable.
- A small `EN / DE` language control and floating audio control are visible during the main invitation.
- Artwork is layered rather than presented as boxed cards; images touch the viewport edges and bleed into the paper background.

## Important fidelity note

The supplied reel is a recording of the rendered site, not its source project, so its original DOM, CSS, spring constants, source assets, and breakpoints are not directly recoverable. The implementation therefore reproduces the observed choreography and visual hierarchy with explicit, swappable layers instead of claiming access to the original private source.
