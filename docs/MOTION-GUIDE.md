# Compose motion by intention

## Choose the job first

| Job | Useful mechanisms | What should lead | Typical relationship |
|---|---|---|---|
| Introduce | Masked headline, fade/rise, media settle, cover wipe | One short message | Copy becomes readable before decoration finishes |
| Direct attention | Measured highlight, sibling dim, aligned crossfade | Current intent | Active item stays legible; its neighbors or context respond |
| Respond | Press compression, caret, underline, popover | The control | Contact is immediate; options emerge from a clear origin |
| Preserve continuity | Shared layout, drawer, filter replacement, compact header | Stable identity or location | Change the context while retaining an anchor |
| Explain | Spatial convergence, chart clusters, staged workflow | The relationship being explained | Secondary motion supports the argument rather than starting another |
| Atmosphere | Slow outlines, drift, marquee, dot states | Foreground content | Decoration has a smaller amplitude and a much slower clock |

## Combining techniques across sites

**Vestre text + Barber structure + Linear light.** Masked glyphs establish the message. A delayed line gives the copy a boundary. An image/light layer can finish later. Their durations are intentionally different; synchronize their roles rather than their endpoints.

**Instrument replacement + Vestre product context.** The category transition controls when the collection changes. Within the stable set, an aligned product crossfade answers a different question: where could this object live? Avoid layering card travel, zoom, caption movement and sibling dim on every object at once.

**Vestre spatial convergence + Instrument introduction + Linear framing.** Make the card relationship the main scroll argument. Resolve the copy early. Let a small light response acknowledge progression while the content holds still. Use separate responsive mappings for a stacked narrow composition.

**Instrument selection + Linear shared identity.** A measured outline answers “what am I selecting?” Shared layout answers “where did that object go?” Give selection a fast response and the result enough time to be perceived. The shared object needs a stable ID.

**Lenzing order + Vestre atmosphere.** A footer’s navigation becomes useful in about two seconds. Outline travel can take two minutes, rotations longer. Those clocks should not share equal visual weight.

## Timing relationships worth inspecting

- **Overlap:** let followers start before the leader finishes. Vestre’s supporting copy starts after the last letter’s *start*, plus320ms—not after its full800ms animation.
- **Different easings:** position can stop quickly with expo.out while opacity resolves more gradually. A uniform curve on every property can erase the intended character.
- **Nested opacity:** effective opacity is the product of parent and child. Two .7425 fades produce about .5513. Isolate them when diagnosing a late-looking reveal.
- **Cadence:** per-character and per-word offsets are content-aware. Use short text. Avoid making long content wait for a long serial chain.
- **Discrete change:** Instrument’s filter switch fades, replaces, then reveals. It is not a positional layout tween. Do not describe it as FLIP.
- **Hysteresis:** compact beyond24px, restore below4px. A dead zone avoids header flutter around a threshold.
- **Native and physical clocks:** a browser scroll or spring does not have an honest fixed duration simply because an inspector wants a timeline.

## Practical defaults

Give each section one leader. Keep useful text readable early. Animate inside stable boundaries when possible. Reserve long clocks for background roles. Use one persistent selection or object when it clarifies continuity. Prefer smaller amplitudes before adding more delay. Design the quiet reduced-motion destination first.

Use the source profile to understand the mechanism. Use the adapted profile and comparison to judge the decision. Then use a scene to check whether the section still belongs to the page as a whole.
