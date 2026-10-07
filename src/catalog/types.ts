import type { ComponentType } from 'react';
import type { MotionValue } from 'motion/react';
export type Purpose = 'Introduce' | 'Direct attention' | 'Respond' | 'Preserve continuity' | 'Explain' | 'Atmosphere';
export type Driver = 'timeline' | 'scroll' | 'interaction' | 'continuous' | 'native';
export type SiteId = 'barber' | 'lenzing' | 'linear' | 'instrument' | 'vestre';
export type SourceRef = { site: SiteId; field: string; note?: string };
export type Track = { id: string; label: string; startMs: number; durationMs: number; role: string; color?: string };
export type LayerSettings = { muted: string[]; solo: string | null };
export type StudyProps = { time: MotionValue<number>; reduced: boolean; speed: number; profile: 'source' | 'adapted'; compare: boolean; layers: LayerSettings; narrow: boolean; variant: string; resetKey: number };
export type Study = {
 id: string; title: string; subtitle: string; purpose: Purpose; driver: Driver; durationMs: number;
 sources: SourceRef[]; tags: string[]; useWhen: string; avoidWhen: string; mechanics: string;
 lesson: string; tracks: Track[]; variants?: { id: string; label: string }[];
 component: ComponentType<StudyProps>; code: string; patternIds?: string[];
};
export type SceneDefinition = { id: string; title: string; subtitle: string; recipeIds: string[]; purpose: string; theme: 'editorial' | 'portfolio' | 'product' };
export const purposes: Purpose[] = ['Introduce', 'Direct attention', 'Respond', 'Preserve continuity', 'Explain', 'Atmosphere'];
export function layerEnabled(layers: LayerSettings, id: string) { return !layers.muted.includes(id) && (!layers.solo || layers.solo === id); }
