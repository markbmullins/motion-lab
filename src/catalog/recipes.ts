import { Editorial } from '../recipes/Editorial';
import editorialCode from '../recipes/Editorial.tsx?raw';
import type { Study } from './types';
export const recipes: Study[] = [{
 id: 'editorial', title: 'An editorial introduction', subtitle: 'Let the headline lead. Give the image time to settle.', purpose: 'Introduce', driver: 'timeline', durationMs: 2600,
 sources: [{ site: 'vestre', field: 'hero', note: 'Masked glyphs, supporting overlap and media settle' }, { site: 'barber', field: 'actionLists.a-2', note: 'Delayed divider' }, { site: 'linear', field: 'hero.frame', note: 'Subordinate lighting; adapted here' }],
 tags: ['hero', 'text', 'overlap', 'media', 'hierarchy'], useWhen: 'An editorial or brand opening has one clear message and an image worth settling into.', avoidWhen: 'The visitor needs an immediate task interface. Give repeated visits a shorter path.',
 mechanics: 'Headline uses clipped per-word glyphs. Supporting fades overlap the final characters. The image independently resolves scale and blur. The divider organizes the copy; lighting stays behind the subject.',
 lesson: 'One foreground leader, several quieter followers. The decorative media can finish after the copy is already readable.',
 tracks: [{ id: 'headline', label: 'Masked headline', startMs: 0, durationMs: 1465, role: 'Lead · 800ms per letter + stagger' }, { id: 'support', label: 'Supporting copy', startMs: 985, durationMs: 800, role: 'Follow · overlapping fades' }, { id: 'media', label: 'Media settle', startMs: 0, durationMs: 2400, role: 'Atmosphere · independent clock' }, { id: 'divider', label: 'Divider', startMs: 400, durationMs: 1000, role: 'Structure · draws under the heading' }, { id: 'light', label: 'Soft light', startMs: 400, durationMs: 1800, role: 'Accent · adapted from Linear lighting' }],
 component: Editorial, code: editorialCode, patternIds: ['masked-text', 'media-settle', 'divider', 'scroll-light']
}];
