import { useTransform } from 'motion/react';
import { layerEnabled, type StudyProps } from '../catalog/types';
import { curves, mix, phase } from './math';
export function useTrack(
  p: StudyProps,
  id: string,
  start: number,
  duration: number,
  from = 0,
  to = 1,
  ease = curves.reveal,
) {
  return useTransform(p.time, (t) =>
    mix(from, to, p.reduced || !layerEnabled(p.layers, id) ? 1 : ease(phase(t, start, duration))),
  );
}
export const seconds = (ms: number, p: StudyProps) => (p.reduced ? 0 : ms / (1000 * p.speed));
export const enabled = (p: StudyProps, id: string) => !p.reduced && layerEnabled(p.layers, id);
