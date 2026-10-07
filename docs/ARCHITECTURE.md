# Architecture

## Four levels of knowledge

1. **Evidence.** Each original audit folder is copied byte-for-byte into `public/audits/`. `verify-audits` emits a SHA-256 manifest. A source reference is a site ID plus a path inside its preserved JSON record.
2. **Mechanisms.** Named components own their behavior. Typed catalog definitions supply purpose, trigger type, source references, timing structure, guidance, supported variants and comparisons.
3. **Compositions.** Recipes choose leaders, followers and background roles across sites. Existing mechanisms are reused; a recipe can also implement its own choreography when the relationship itself is new.
4. **Pages.** Scenes compose recipes in a scrollable website, with a shared header and optional annotations. Timed sections enter once when the experience has started and the section intersects its container.

## React and animation clocks

React owns selection, filters, accessible interaction state and scenario boundaries. Frame values go through MotionValue to DOM styles. The visual study renderer is memoized so the inspector’s throttled time readout does not rerender every glyph. Scene and workflow clocks do not publish unnecessary readout updates.

`usePlayer` supplies a finite observation clock with elapsed-time speed scaling. It pauses when its preview leaves view, the document becomes hidden, the user pauses all, or the OS/manual reduced-motion preference changes. Its frame, visibility listener and observer are cleaned up. A resumed workflow continues at its current time; Replay deliberately restarts.

Scroll and physical spring values retain their own meaning. Native scrolling retains browser-controlled duration. Embla has its own fixed-step clock and is gated by `useActivity`; Lottie is sampled by the study clock. Interactions use Motion transitions or CSS responses rather than routing all behavior through a generic timeline abstraction.

## Source versus lab settings

Measured values are not edited to fit substitute geometry. Changes in amplitude, timing, artwork or trigger policy are described in the catalog. A separate adapted profile appears only where a supported alternative exists. The source timing map is a reference diagram and explicitly marks adapted previews.

Some studies isolate one part of a larger source mechanism: the first placeholder suggestion, one assistant turn, or three slideshow frames. Their descriptions state that boundary; the full audit remains linked beside them.

## Performance choices

- Transform and opacity carry most motion. Small blur, width, height and layout examples are intentional and labeled; they can still paint or cause layout.
- Native rows remain native. No synthetic smooth-scrolling replacement is installed.
- Lottie’s lighter runtime and implementation text load only when requested. The accessibility scanner is development-only and absent from the production build.
- React and Motion have separate cacheable chunks. There are no downloaded photos, webfonts, external services or remote video loops.
- OS preference changes are subscribed to. Atmosphere freezes under reduced motion. Offscreen and hidden playback has explicit ownership.

These are architectural safeguards, not proof of 60fps. Frame-time profiling on target devices remains part of shipping any technique to a real site.

## Files

| Area | Responsibility |
|---|---|
| `src/catalog` | Typed definitions, provenance, preserved/source-derived records |
| `src/patterns` | Named mechanisms grouped by purpose of their implementation |
| `src/recipes` | Authored choreography and composition-specific views |
| `src/scenes` | Complete contained pages and visibility-triggered sections |
| `src/player` | Clocks, preferences, curves, geometry and lifecycle gates |
| `src/components` | Inspector, transport, artwork, source/code views |
| `scripts` | Read-only reference sync and byte comparison |
| `tests` | Behavioral math, event capture and catalog relationships |

`captureHeaderScroll` snapshots the scroll value before returning a React state updater. Deferred updates must not retain `event.currentTarget`, which React clears after the event handler.
