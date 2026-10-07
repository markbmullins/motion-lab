# Extending Motion Lab

## Add a mechanism

1. Implement a named component in `src/patterns/`. Use the `StudyProps` contract. Render understandable content even when motion is disabled. Keep hooks in components rather than variable-length loops.
2. Add a definition to `src/catalog/patterns.ts`. Give it a stable kebab-case ID, purpose, truthful driver, references, tags, use/avoid guidance, mechanics, lesson and track IDs.
3. Use `durationMs:0` for native or interaction-driven studies. Their tracks describe event-relative durations; no invented global time is required.
4. Return actual implementation text from a lazy `?raw` import. Register optional variants, an adapted profile and comparison only when they are implemented.
5. Ensure every advertised motion layer is honored by `layerEnabled`/`enabled`. Disabled motion should settle content, not remove meaning. Include focus/tap alternatives where useful.
6. Run `npm test`, `npm run build` and `npm run format:check`. Inspect the mechanism in a real browser at narrow and wide widths, including interrupted input and reduced motion.

A small example definition:

```ts
{
  id: 'aligned-crossfade',
  purpose: 'Direct attention',
  driver: 'interaction',
  durationMs: 0,
  sources: [{site: 'vestre', field: 'products'}],
  tracks: [{id: 'images', label: 'Contexts', startMs: 0, durationMs: 300,
            role: 'One object, two scenes'}],
  component: AlignedCrossfade,
  code: () => import('../patterns/AlignedCrossfade.tsx?raw').then(m => m.default),
  // Add title, subtitle, tags, mechanics, lesson and use/avoid guidance.
}
```

Use Motion for interruptible state/layout transitions and springs. Use CSS for straightforward hover/press accents and simple loops. Use native scrolling for native browsing. A library choice follows the behavior, not the source site’s framework.

## Add a composition

Add a `Study` to `src/catalog/recipes.ts`. Reference its normalized `patternIds` and retain each contributing source. Assign tracks by **job**: leader, follow, structure, continuity, atmosphere. Explain the timing relationship rather than listing properties.

If reusing several components does not express the relationship cleanly, create a composition component in `src/recipes/` and sample its tracks directly. Prefer a few explicit tracks over a universal animation configuration language.

## Add a scene

Add metadata to `src/catalog/scenes.ts` and compose its sections in `src/scenes/SceneView.tsx`. `SceneSlot` supplies settings and visibility-triggered playback. Place one main motion argument in each section. Scene annotations link back to recipes or mechanisms; they are optional in the viewing experience.

## Add another audit

1. Preserve the independent audit folder beside `motion-lab/`, with its JSON record and self-contained audit document.
2. Add the site to the `sites` list in `scripts/sync-audits.mjs` and the `SiteId` type. Update the audit library description/count if adding a sixth source.
3. Run `npm run sync-audits -- /absolute/path/to/motion-showcase`. It reads originals, copies them, refreshes the raw catalog, and derives the recorded Linear dot frames and Vestre outline paths. It never executes original website code.
4. Add explicit source paths to new definitions. `npm test` catches unresolved references and stale derived grid records. Run `npm run verify-audits` to check all copied bytes.
5. Extract transferable mechanisms. Keep source counts, original sequences and runtime limitations in the audit, rather than duplicating every source element as another catalog item.

The Vestre SVG adapter expects the currently audited six-group footer. A changed source structure stops the sync and asks for adapter review. That is deliberate: a silent guess would undermine provenance.

## Before reusing a technique in production

Give the effect a job, choose a trigger, define interruption and reduced-motion behavior, set a readable destination, and profile the real geometry on target devices. Study assets are substitute illustrations and preserved reference artwork. Replace branded source artwork in a public project.
