# Motion Lab

A React learning environment built from homepage motion audits. Study individual mechanisms, combine them in recipes, and explore them in miniature websites. Independent audits remain unchanged.

## Run it

```sh
cd ~/dev/motion-showcase/motion-lab
npm ci
npm run dev
```

Open `http://127.0.0.1:5178`. The project includes its pinned lockfile and local SVG artwork. It makes no external API calls and does not load remote videos. The Lenzing logo asset and preserved audit files are local.

```sh
npm test                  # Timing, relationships, provenance, deferred event capture
npm run build             # TypeScript + portable production bundle
npm run preview           # Serve dist/ locally
npm run format:check      # Source formatting
npm run verify-audits     # Compare packaged references with ../ originals
```

Use a web server; opening `index.html` directly from the filesystem does not support module or source-record requests. `dist/` is ready for static hosting under a subdirectory, but no deployment has been made.

## A useful first session

1. Open **Recipes → An editorial introduction**. Replay at .25×. Compare the overlapping supporting text with the version that waits for the final letter to finish. Solo the headline, then restore the media and divider.
2. Open **Patterns → Draw the structure**, choose **Locations · diamond + bars**. Scrub through 500–1700ms, then 1500–2500ms. Rotation and scale overlap; the two bars follow.
3. Open **A collection with focus**. Change categories quickly. The latest choice wins. A small group can dim siblings; the bench changes context without moving its geometry.
4. Try **A workflow with continuity**. Send the local mock command, pause the sequence, then resume. Compare the persistent shared issue with a simple disappearance/appearance.
5. Open **Scenes** and start an experience. Scroll inside the miniature website. Composition notes link back to the corresponding studies.
6. Inspect **Two clocks at the close**. Choose the first2.5s timing window for the foreground; use 10× speed to perceive the much slower outline motion.

Search includes names, mechanism IDs, source names, tags and explanatory mechanics. Filters persist as you move between studies in the same section. Hash URLs are shareable local deep links.

## What the controls mean

- **Source mechanism / values:** a reconstruction with substitute content and geometry. Measured original values stay in the source records. Explicitly noted lab adaptations remain adaptations even in this profile.
- **Adapted profile:** only offered when the study defines a concrete alternative. This is a design choice, not a new original measurement.
- **Compare the decision:** changes a specific compositional choice described beside the control. It is not a generic “bad animation” preset.
- **Layer controls / Solo:** disable motion in other layers, leaving their content at useful destinations. They isolate motion contributions rather than hiding the rest of the composition.
- **Timed studies:** replay, pause and scrub a deterministic millisecond clock. Continuous mechanisms have finite observation windows; Replay begins a new inspection window.
- **Scroll studies:** the slider samples progress. Replay is illustrative. Switch on real scrolling for container-relative viewport offsets.
- **Interactions:** use actual buttons, focus, pointer or drag. They have event-relative timings rather than one fictional global scrubber.
- **Native rows:** the browser owns smooth-scroll timing. Global speed does not replace it. Physical springs retain their documented constants.
- **Reduced motion:** useful destinations, static atmosphere. An OS preference change is subscribed to and clears the manual override. Paused/hidden studies do not restart unexpectedly.
- **Pause all:** pauses explicit playback clocks, internal workflow playback and the drifting gallery. Ordinary input feedback still responds to fresh interactions; this is not a browser-wide suspension of every CSS transition.

The timing map shows source structure, not a frame-time trace. During an adapted profile it is explicitly labeled as a reference map. The code view loads the actual formatted TSX module and adjacent helpers on demand. Those modules share styles and context; they are not isolated snippets.

## Build on it

Read [the extension guide](docs/EXTENDING.md), [motion decisions](docs/MOTION-GUIDE.md), [architecture](docs/ARCHITECTURE.md) and [verification](docs/VERIFICATION.md).

The catalog separates **evidence → mechanism → composition → page**. Add an experiment once, then reuse it in recipes and scenes. An audit remains the record of what a specific site delivered; the lab is where those ideas become a reusable vocabulary.

## References and scope

The archived audits are under `public/audits/`. Source records retain audit dates, runtime findings, limitations and inactive-code exclusions. Native videos, physical touch behavior and production account flows are not simulated here. The preserved branded Lottie and source SVG geometry are reference assets for private study; substitute your own artwork for a public project.

Core documentation used: [Motion values](https://motion.dev/docs/react-motion-value), [scroll values](https://motion.dev/docs/react-use-scroll), [layout animation](https://motion.dev/docs/react-layout-animations), [Embla React v8](https://www.embla-carousel.com/docs/v8/get-started/react), [Embla AutoScroll v8](https://www.embla-carousel.com/docs/v8/plugins/auto-scroll), [Lottie](https://github.com/airbnb/lottie-web), [Vite](https://vite.dev/guide/).
