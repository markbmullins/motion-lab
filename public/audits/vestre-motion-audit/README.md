# Vestre motion audit and interactive showcase

Open **motion-audit.html** in a browser. It works offline with its CSS, JavaScript, structured motion values and decorative SVG embedded. Screenshots and evidence links use adjacent files; keep the folder together.

Audited on 7 October 2026: https://www.vestre.com/us, reached through vestre.com. This is the current US homepage, with desktop navigation and 390px narrow menu/search inspection. It is built with Next.js/React, Motion, Tailwind/CSS modules, Embla Auto Scroll and Base UI.

## What is included

- 14 interactive regions across 17 chapters, plus a linked inventory.
- Replay, pause, start/end, timeline scrubbing, layer isolation and relevant reverse/layout variants.
- Global 0.25×, 0.5×, 1×, 2× and 10× playback; reduced motion; pause all.
- The hero's 25ms character stagger, supporting overlaps and 2.4-second media settle.
- Header hysteresis, mega-menu lifecycle, accents, image crossfades and zoom variants.
- A steady-speed gallery illustration and exact scroll-progress mappings for overlapping cards.
- Native scroll/snap rows; the original footer SVG with independent source clocks.
- Narrow menu slide/drill/back, drawer, search-hint replacement and delayed help greeting.
- Source-backed durations, curves, triggers, reduced-motion behavior and lifecycle observations.
- Live screenshots and 53 public delivered JavaScript/CSS files with URLs and SHA-256 hashes.

These are offline teaching reconstructions with substitute fonts, artwork and dimensions, except for the original decorative footer paths. The gallery study is finite and does not reproduce Embla drag inertia/recycling. The narrow card slider joins two independently triggered source targets for illustration. Native row timing belongs to the browser. No remote videos are downloaded or played by the audit.

The showcase has no autoplay, pauses timed studies when the document becomes hidden, honors the OS reduced-motion preference and provides a local override. The live site has selective guards; the report documents them rather than attributing the showcase safeguards to the original.

## Files

- `motion-audit.html`: audit and interactive showcase.
- `homepage-motion-data.json`: extracted motion rules and evidence/limits.
- `verification.json`: actual browser checks and static/hash checks.
- `live-*.png`: original-site screenshots.
- `audit-preview.png`, `showcase-preview.png`, `footer-showcase-preview.png`, `mobile-preview.png`: verified local artifact views.
- `evidence/`: original delivered source files, manifest, source excerpts, CSSOM rules and runtime snapshots. The source archive is for reading; the showcase does not execute it.
- `source/`: editable builder, authored CSS/JS, chapter prose, motion values and SVG.

## Rebuild

From this folder, run `python3 source/build.py`. No package installation or build dependencies are needed. It rewrites `motion-audit.html` from the local files in `source/`.

Open the result directly, or serve this folder with `python3 -m http.server 8766 --bind 127.0.0.1` and visit http://localhost:8766/motion-audit.html.

## Verification and limits

All 13 timed/progress studies were checked at both endpoints. Direction/layout/hover variants, local input, the native row, keyboard progress scrubbing, header scroll thresholds, grid expansion, layer isolation, pause-all stability and reduced-motion destinations were exercised. Browser console returned no errors. Page width was checked at 320, 768, 1024 and 1440px with no document overflow. Screenshots were visually reviewed.

Live-site observations include offscreen videos still playing, footer rotation rates, hover opacities, hero initial transforms, card endpoints, narrow panels and drawer styles. Exact source values are separate from runtime snapshots; screenshots are not timing traces.

No frame-time/FPS/compositor trace, physical touch session, screen-reader session or live-site OS preference-change test was performed. Forms/accounts, product configurators and unrelated route transitions are outside this homepage scope. Prefetched product-route source is archived but not counted as active homepage animation. This audit does not claim a measured performance certification or a pixel-identical clone.
