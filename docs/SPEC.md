# Motion Lab

Approved direction: the user's “ok go” authorizes the preceding Motion Lab proposal. Personal React learning and implementation tool, stored alongside five independent audits. The originals remain authoritative and are never edited by this app.

## Objective and acceptance

A polished, extensible React exhibition organized by motion purpose, with an interactive pattern catalog, five compositions across source sites, and three miniature websites. Every study explains when to use it, what it contributes, what to avoid, the mechanics, and provenance. Source values and adapted settings are distinct. Source-only/bundled but inactive effects are excluded.

Success: working search and purpose filters; deep links; suitable timed, scroll, interactive and native controls; speed, reduced motion, solo/mute; choreography diagram; actual implementation source; preserved audit links; responsive at 320/768/1024/1440; clean build/tests/console; pause active timelines when document hidden or demo offscreen; no external API calls or remote media playback.

## Stack and commands

React + TypeScript + Vite + Motion. Native CSS/scroll retained where appropriate. Versions resolved in package-lock.json.

- `npm install` installs the pinned lockfile (use `npm ci` subsequently).
- `npm run dev -- --host 127.0.0.1` serves the development app.
- `npm run build` validates TypeScript and emits the portable production bundle.
- `npm test` checks timing math, registry references and composition structure.
- `npm run sync-audits -- /absolute/path/to/motion-showcase` packages unchanged audits and raw data.
- `npm run preview -- --host 127.0.0.1` serves the production bundle.

## Structure

src/catalog: typed pattern/recipe data and provenance.
src/player: shared playback, settings, curve math, track sampling.
src/patterns: implementations grouped by mechanism.
src/recipes: authored compositions and timings.
src/scenes: complete embedded scrolling websites.
src/components: catalog, inspector, source viewer and transport.
public/audits: generated copies of the unchanged audit folders.
docs: decisions and extension instructions.
tests: useful clock math and catalog integrity tests.

## Code style and contract

Explicit units: milliseconds in catalog and player; Motion transition seconds at the component boundary. Named component per responsibility. Settings through context; frame values through MotionValue. Typed definitions with sources and semantics, rather than a universal “animate everything” engine.

```ts
const track = { id: 'headline', label: 'Masked headline', startMs: 80, durationMs: 800 };
const progress = sampleTrack(timeMs, track, curves.reveal);
```

## Verification and boundaries

Unit tests target interpolation, clamping, invalid references and source separation. TypeScript/build after each complete slice. Browser tests exercise actual controls, state interruption, local input, filters, scene scrolling, responsive layout and reduced motion. Source/preview screenshots saved. Automated accessibility scan and keyboard checks; do not claim a screen-reader or FPS certification without doing it.

Always: preserve audit files, label reconstructions, honor reduced motion and hidden-document lifecycle, clean up observers/RAF, use semantic controls, keep navigation shareable.
Ask first: publishing, adding cloud services, messaging or modifying an original audit.
Never: execute archived first-party website scripts as application code; transmit mock query/content; claim authored duration for browser scroll; silently call adaptations original measurements.

## Implementation slices

1. Foundation, first editorial recipe, player and typography; build and browser proof.
2. Complete normalized catalog and all pattern mechanisms; build/test.
3. Five hybrid recipes, track inspector, decisions comparisons, implementation/source access; build/browser.
4. Three scenes and audit preservation; build/browser.
5. Accessibility/responsive/lifecycle tests, documentation and packaged project; canonical copy and final verification.

## Design research

Direct primary references are the five user-requested audits already completed; Refero tools are unavailable in this environment. Vestre: exact masked text + large fixed clipping containers. Linear: compact interface language + shared identity. Instrument: measured highlights + deliberate focus. Lenzing: staggered editorial sequencing. Barber: gradual structured reveals + ornamental separators. Motion Lab uses warm paper, charcoal, vermilion accents and an original Common Ground architectural illustration. Two intentional type roles: compact sans UI and occasional editorial serif. No testimonial/social proof claims: this is a private teaching tool.

The source profile is a faithful mechanism reconstruction with substitute content/geometry. The adapted profile changes amplitude/tempo and is labeled. Recipes/scenes are new compositions, never attributed as original site implementations. No single global timeline for native scroll or interactive springs.
