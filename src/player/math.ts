import type { Track } from '../catalog/types';
export const clamp = (value: number, min = 0, max = 1) => Math.max(min, Math.min(max, value));
export const mix = (from: number, to: number, p: number) => from + (to - from) * p;
export const phase = (timeMs: number, startMs: number, durationMs: number) =>
  durationMs <= 0 ? Number(timeMs >= startMs) : clamp((timeMs - startMs) / durationMs);
export function cubicBezier(a: number, b: number, c: number, d: number) {
  const value = (t: number, x: number, y: number) =>
    3 * (1 - t) ** 2 * t * x + 3 * (1 - t) * t ** 2 * y + t ** 3;
  return (progress: number) => {
    if (progress <= 0 || progress >= 1) return clamp(progress);
    let lo = 0,
      hi = 1;
    for (let i = 0; i < 25; i++) {
      const t = (lo + hi) / 2;
      if (value(t, a, c) < progress) lo = t;
      else hi = t;
    }
    return value((lo + hi) / 2, b, d);
  };
}
export const curves = {
  reveal: cubicBezier(0.33, 1, 0.68, 1),
  settle: cubicBezier(0.22, 1, 0.36, 1),
  header: cubicBezier(0.3, 0.6, 0, 1),
  drawer: cubicBezier(0.32, 0.72, 0, 1),
  standard: cubicBezier(0.4, 0, 0.2, 1),
  out: cubicBezier(0, 0, 0.2, 1),
  nativeOut: cubicBezier(0, 0, 0.58, 1),
  css: cubicBezier(0.25, 0.1, 0.25, 1),
  quad: (p: number) => 1 - (1 - p) ** 2,
  inOutQuad: (p: number) => (p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2),
  cubic: (p: number) => 1 - (1 - p) ** 3,
  inOutExpo: (p: number) =>
    p === 0 || p === 1 ? p : p < 0.5 ? 2 ** (20 * p - 10) / 2 : (2 - 2 ** (-20 * p + 10)) / 2,
  inOutQuint: (p: number) => (p < 0.5 ? 16 * p ** 5 : 1 - (-2 * p + 2) ** 5 / 2),
  quint: (p: number) => 1 - (1 - p) ** 5,
  expo: (p: number) => (p >= 1 ? 1 : 1 - 2 ** (-10 * p)),
  linear: (p: number) => p,
};
export const sampleTrack = (
  timeMs: number,
  track: Pick<Track, 'startMs' | 'durationMs'>,
  ease = curves.reveal,
) => ease(phase(timeMs, track.startMs, track.durationMs));
export function overlapValues(progress: number, narrow = false) {
  const p = clamp(progress);
  if (narrow) return { leftX: mix(-14, 0, p), rightX: mix(14, 0, p), leftY: 0, rightY: 0 };
  return {
    leftX: 40 * (1 - clamp(p / 0.42)),
    rightX: -40 * (1 - clamp(p / 0.42)),
    leftY: p <= 0.32 ? mix(22, 0, p / 0.32) : mix(0, -40, (p - 0.32) / 0.68),
    rightY: p <= 0.32 ? mix(-22, 0, p / 0.32) : mix(0, 36, (p - 0.32) / 0.68),
  };
}
export const compactHeader = (wasCompact: boolean, scrollY: number) =>
  wasCompact ? scrollY >= 4 : scrollY > 24;
export function letterDelays(text: string, characterMs = 25, wordMs = 80) {
  let index = 0;
  return text
    .trim()
    .split(/\s+/)
    .flatMap((word, wordIndex) =>
      Array.from(word).map((char) => ({
        char,
        word: wordIndex,
        delayMs: characterMs * index++ + wordMs * wordIndex,
      })),
    );
}
