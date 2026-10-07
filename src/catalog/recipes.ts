import { Editorial } from '../recipes/Editorial';
const editorialCode = () => import('../recipes/Editorial.tsx?raw').then((m) => m.default);
import { Collection, Workflow } from '../patterns/Continuity';
import { ScrollConverge } from '../patterns/Scroll';
import { Closing } from '../recipes/Closing';
const continuityCode = () => import('../patterns/Continuity.tsx?raw').then((m) => m.default);
const scrollCode = () => import('../patterns/Scroll.tsx?raw').then((m) => m.default);
const closingCode = () => import('../recipes/Closing.tsx?raw').then((m) => m.default);
import type { Study } from './types';
export const recipes: Study[] = [
  {
    id: 'editorial',
    title: 'An editorial introduction',
    subtitle: 'Let the headline lead. Give the image time to settle.',
    purpose: 'Introduce',
    driver: 'timeline',
    durationMs: 2600,
    sources: [
      { site: 'vestre', field: 'hero', note: 'Masked glyphs, supporting overlap and media settle' },
      { site: 'barber', field: 'actionLists.a-2', note: 'Delayed divider' },
      { site: 'linear', field: 'hero.frame', note: 'Subordinate lighting; adapted here' },
    ],
    tags: ['hero', 'text', 'overlap', 'media', 'hierarchy'],
    useWhen:
      'An editorial or brand opening has one clear message and an image worth settling into.',
    avoidWhen:
      'The visitor needs an immediate task interface. Give repeated visits a shorter path.',
    mechanics:
      'Headline uses clipped per-word glyphs. Supporting fades overlap the final characters. The image independently resolves scale and blur. The divider organizes the copy; lighting stays behind the subject.',
    lesson:
      'One foreground leader, several quieter followers. The decorative media can finish after the copy is already readable.',
    tracks: [
      {
        id: 'headline',
        label: 'Masked headline',
        startMs: 0,
        durationMs: 1465,
        role: 'Lead · 800ms per letter + stagger',
      },
      {
        id: 'support',
        label: 'Supporting copy',
        startMs: 985,
        durationMs: 800,
        role: 'Follow · overlapping fades',
      },
      {
        id: 'media',
        label: 'Media settle',
        startMs: 0,
        durationMs: 2400,
        role: 'Atmosphere · independent clock',
      },
      {
        id: 'divider',
        label: 'Divider',
        startMs: 400,
        durationMs: 1000,
        role: 'Structure · draws under the heading',
      },
      {
        id: 'light',
        label: 'Soft light',
        startMs: 400,
        durationMs: 1800,
        role: 'Accent · adapted from Linear lighting',
      },
    ],
    component: Editorial,
    code: editorialCode,
    patternIds: ['masked-text', 'media-settle', 'divider', 'scroll-light'],
    adapted:
      'Smaller image scale, no media blur, tighter letter offsets. Supporting starts adjust to the new headline rhythm.',
    comparison:
      'Wait until the final letter finishes before showing supporting copy. Compare that extra pause with the overlapping composition.',
  },
  {
    id: 'focused-collection',
    title: 'A collection with focus',
    subtitle: 'A deliberate replacement. A quiet shift of context.',
    purpose: 'Direct attention',
    driver: 'interaction',
    durationMs: 0,
    sources: [
      { site: 'instrument', field: 'filters' },
      { site: 'instrument', field: 'micro' },
      { site: 'vestre', field: 'products' },
      { site: 'vestre', field: 'accents' },
    ],
    tags: ['filter', 'product', 'focus', 'crossfade'],
    useWhen:
      'A curated collection has a few categories and media that can show two useful contexts.',
    avoidWhen:
      'Dense results that need instant scanning. Do not dim large groups or hide the only caption.',
    mechanics:
      'Instrument provides fade-out → replace → staggered reveal. Small groups can dim siblings. Vestre adds aligned studio/lifestyle crossfades and a simple state underline.',
    lesson:
      'Only one relationship needs to lead at a time. Category changes own the transition; media responses become available once browsing resumes.',
    tracks: [
      {
        id: 'filter',
        label: 'Collection replacement',
        startMs: 0,
        durationMs: 1200,
        role: 'Continuity ·500ms out, discrete swap,500ms in +50ms stagger',
      },
      {
        id: 'siblings',
        label: 'Group focus',
        startMs: 0,
        durationMs: 250,
        role: 'Attention · enabled below five visible objects',
      },
      {
        id: 'images',
        label: 'Context crossfade',
        startMs: 0,
        durationMs: 300,
        role: 'Meaning · aligned product views',
      },
    ],
    component: Collection,
    code: continuityCode,
    patternIds: ['filter-swap', 'sibling-dim', 'image-crossfade', 'link-accents'],
  },
  {
    id: 'scroll-story',
    title: 'A spatial story',
    subtitle: 'Converging views carry the argument. The light stays subordinate.',
    purpose: 'Explain',
    driver: 'scroll',
    durationMs: 1000,
    sources: [
      { site: 'vestre', field: 'overlap' },
      { site: 'instrument', field: 'reveals' },
      { site: 'linear', field: 'scrollLighting' },
    ],
    tags: ['scroll', 'story', 'cards', 'responsive'],
    useWhen: 'Two views express a relationship that becomes clearer as they meet.',
    avoidWhen:
      'Using scroll progress as a gate for essential reading, or running three loud effects in parallel.',
    mechanics:
      'Vestre supplies the exact desktop and narrow card mappings. Instrument inspires an early headline reveal. Linear inspires subordinate edge lighting. The latter two are adaptations; this composition ties them to progress for inspection.',
    lesson:
      'Give the geometry the explanatory role. Finish the copy early; let light register progression without competing with the story.',
    tracks: [
      {
        id: 'headline',
        label: 'Headline',
        startMs: 0,
        durationMs: 220,
        role: 'Introduce · finish early',
      },
      {
        id: 'cards',
        label: 'Converging views',
        startMs: 0,
        durationMs: 1000,
        role: 'Explain · responsive geometry',
      },
      {
        id: 'light',
        label: 'Soft lighting',
        startMs: 0,
        durationMs: 1000,
        role: 'Atmosphere · adapted from Linear',
      },
    ],
    component: ScrollConverge,
    code: scrollCode,
    patternIds: ['scroll-converge', 'masked-text', 'scroll-light'],
  },
  {
    id: 'workflow',
    title: 'A workflow with continuity',
    subtitle: 'Selection establishes place. Shared identity explains the result.',
    purpose: 'Preserve continuity',
    driver: 'interaction',
    durationMs: 0,
    sources: [
      { site: 'linear', field: 'slack' },
      { site: 'instrument', field: 'abacus' },
    ],
    tags: ['workflow', 'layout', 'selection', 'product'],
    useWhen: 'An action creates an object in one context and places it in another.',
    avoidWhen:
      'Moving unrelated content across the interface, or adding artificial latency to real results.',
    mechanics:
      'Instrument’s measured outline handles local intent; Linear’s local conversation/board choreography handles causal change. The persistent issue keeps one layout ID while its parent changes. The sequence has its own pauseable clock.',
    lesson:
      'Use a responsive selection for intent and a slightly longer continuity transition for the result. These clocks have different jobs.',
    tracks: [
      {
        id: 'outline',
        label: 'Measured selection',
        startMs: 0,
        durationMs: 300,
        role: 'Respond · persistent outline',
      },
      {
        id: 'identity',
        label: 'Issue identity',
        startMs: 3000,
        durationMs: 600,
        role: 'Continuity · same object, new parent',
      },
    ],
    component: Workflow,
    code: continuityCode,
    patternIds: ['measured-highlight', 'shared-layout', 'press-response'],
    comparison:
      'Remove shared layout identity. The result becomes a disappearance followed by an unrelated appearance.',
  },
  {
    id: 'closing',
    title: 'Two clocks at the close',
    subtitle: 'A quick reading sequence, inside a slowly changing atmosphere.',
    purpose: 'Atmosphere',
    driver: 'continuous',
    durationMs: 120000,
    sources: [
      { site: 'lenzing', field: 'footerTimeline' },
      { site: 'vestre', field: 'footer' },
    ],
    tags: ['footer', 'stagger', 'loop', 'atmosphere'],
    useWhen: 'A final editorial section should feel alive after its navigation is already useful.',
    avoidWhen:
      'Applying a multi-second reveal to an urgent task or allowing decoration to distract from a closing action.',
    mechanics:
      'Lenzing’s semantic footer sequence finishes in2s. Vestre’s repeated outline track takes120s, with separate225–600s rotations. The same clock is sampled here for analysis; foreground and atmosphere remain separate layers.',
    lesson:
      'Content should finish long before the atmosphere does. Turn off the track, then the rotation, to see how much quiet motion is enough.',
    tracks: [
      {
        id: 'items',
        label: 'Footer sequence',
        startMs: 0,
        durationMs: 2000,
        role: 'Introduce · fast foreground',
      },
      {
        id: 'track',
        label: 'Ambient drift',
        startMs: 0,
        durationMs: 120000,
        role: 'Atmosphere ·120s lap',
      },
      {
        id: 'shapes',
        label: 'Outline rotation',
        startMs: 0,
        durationMs: 120000,
        role: 'Atmosphere · independent225–600s periods',
      },
    ],
    component: Closing,
    code: closingCode,
    patternIds: ['stagger-sequence', 'shape-loops'],
    adapted: 'Footer offsets×.6 and18px slide; rotation periods halved.',
    comparison: 'Remove the foreground offsets while the slow atmosphere continues.',
  },
];
