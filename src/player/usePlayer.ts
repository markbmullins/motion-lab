import { useCallback, useEffect, useRef, useState } from 'react';
import { useMotionValue, useMotionValueEvent } from 'motion/react';
import type { Driver } from '../catalog/types';
import { useSettings } from './settings';
export function usePlayer(durationMs: number, driver: Driver, readoutEnabled = true) {
  const settings = useSettings(),
    time = useMotionValue(durationMs),
    [running, setRunning] = useState(false),
    [readout, setReadout] = useState(durationMs),
    [resetKey, setResetKey] = useState(0);
  const frame = useRef(0),
    last = useRef(0),
    config = useRef(settings),
    container = useRef<HTMLDivElement>(null),
    visible = useRef(true),
    tickReadout = useRef(0);
  config.current = settings;
  const pause = useCallback(() => {
    cancelAnimationFrame(frame.current);
    frame.current = 0;
    setRunning(false);
    setReadout(Math.round(time.get()));
  }, [time]);
  const seek = useCallback(
    (ms: number) => {
      pause();
      time.set(Math.max(0, Math.min(durationMs, ms)));
      setReadout(Math.round(time.get()));
    },
    [durationMs, time, pause],
  );
  const resume = useCallback(() => {
    pause();
    if (config.current.reduced) {
      time.set(driver === 'continuous' ? 0 : durationMs);
      setReadout(time.get());
      return;
    }
    setRunning(true);
    last.current = performance.now();
    const tick = (now: number) => {
      if (document.hidden || !visible.current) {
        pause();
        return;
      }
      const next = Math.min(durationMs, time.get() + (now - last.current) * config.current.speed);
      last.current = now;
      time.set(next);
      if (next < durationMs) frame.current = requestAnimationFrame(tick);
      else pause();
    };
    frame.current = requestAnimationFrame(tick);
  }, [durationMs, driver, pause, time]);
  useMotionValueEvent(time, 'change', (ms) => {
    if (!readoutEnabled) return;
    const now = performance.now();
    if (now - tickReadout.current > 50 || ms === durationMs || ms === 0) {
      tickReadout.current = now;
      setReadout(Math.round(ms));
    }
  });
  useEffect(() => {
    pause();
    time.set(settings.reduced && driver === 'continuous' ? 0 : durationMs);
    setReadout(time.get());
  }, [durationMs, driver, settings.reduced, pause, time]);
  useEffect(() => {
    pause();
  }, [settings.pauseSignal, pause]);
  useEffect(() => {
    const hide = () => {
      if (document.hidden) pause();
    };
    document.addEventListener('visibilitychange', hide);
    const observer = new IntersectionObserver(
      (entries) => {
        visible.current = entries[0].isIntersecting;
        if (!visible.current) pause();
      },
      { threshold: 0 },
    );
    if (container.current) observer.observe(container.current);
    return () => {
      cancelAnimationFrame(frame.current);
      observer.disconnect();
      document.removeEventListener('visibilitychange', hide);
    };
  }, [pause]);
  const play = useCallback(() => {
    time.set(0);
    setReadout(0);
    resume();
  }, [resume, time]);
  return {
    time,
    running,
    readout,
    play,
    resume,
    pause,
    seek,
    durationMs,
    container,
    resetKey,
    reset: () => {
      pause();
      setResetKey((n) => n + 1);
      time.set(durationMs);
    },
  };
}
export type Player = ReturnType<typeof usePlayer>;
