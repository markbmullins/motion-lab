# Verification

Verified locally on October 7, 2026 in the Codex Chromium browser. This records the scope of the checks, not a certification for every device.

## Automated checks

- TypeScript and production build pass with no build warnings.
- Ten behavioral tests pass: timing curves, stagger indexing, scroll geometry, header hysteresis, deferred React event capture, catalog relationships, source references, native timing boundaries, hybrid provenance and sampled source sequences.
- Source formatting passes.
- All 208 packaged audit files match the original five folders byte-for-byte. SHA-256 records are in `evidence/audit-manifest.json`.
- Automated WCAG A/AA scans report no violations across 38 pattern views and five recipe views, inspected in stable reduced-motion states. The three scenes were also inspected with no automated violations. Pattern/recipe reports are saved in `evidence/accessibility.json`.

## Browser checks

- All 38 mechanism routes render their expected heading and preview in the production bundle, with no page-level horizontal overflow and no production console warnings or errors.
- Editorial recipe containment checked at 320, 390, 768, 1024 and 1440px. Relay scene containment checked at 320 and 768px; narrow scene mode also checked.
- Diamond/bar study scrubbed at intermediate and final times. Its independent layers preserve the rotation/scale overlap and subsequent bar growth.
- Vector logo renders the preserved SVG paths. Muting its layer while paused at the first frame immediately shows its destination.
- Real Embla drift changes track position. Global Pause all stops it; keyboard focus enters the slides.
- Rapid collection category changes settle on the latest selection.
- Local workflow creation pauses and resumes, then preserves the issue identity as it moves to the board. It was also exercised inside the scrolled Relay scene.
- Native dialog opens with focus inside, closes on Escape, and restores focus to its trigger.
- The scene header compacts under keyboard scrolling. A regression test covers React clearing `currentTarget` before a deferred state update.
- An offscreen timed study pauses its clock. Search persists between study selections; implementation text loads the actual formatted module.

Route and viewport observations are in `evidence/browser-verification.json`. Screenshots are in the same evidence folder.

## Remaining verification boundaries

No physical touch device, assistive screen reader, frame-time profiler or multi-browser/device matrix was used. Hidden-document behavior has explicit lifecycle handling but was not independently exercised with a background-tab test. Automatic accessibility scans and transform-heavy architecture do not establish complete accessibility or guaranteed 60fps. Profile the techniques on the real target hardware and content before using them in a shipped site.
