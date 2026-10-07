import { useEffect, useRef, useState } from 'react';
import { useSettings } from './settings';
// Lifecycle gate for animation libraries whose clocks are not MotionValues.
export function useActivity(reduced: boolean) {
  const root = useRef<HTMLDivElement>(null),
    [requested, setRequested] = useState(false),
    [visible, setVisible] = useState(true),
    [foreground, setForeground] = useState(!document.hidden),
    { pauseSignal } = useSettings();
  useEffect(() => {
    setRequested(false);
  }, [pauseSignal, reduced]);
  useEffect(() => {
    const observe = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (root.current) observe.observe(root.current);
    const hide = () => setForeground(!document.hidden);
    document.addEventListener('visibilitychange', hide);
    return () => {
      observe.disconnect();
      document.removeEventListener('visibilitychange', hide);
    };
  }, []);
  return { root, requested, setRequested, active: requested && visible && foreground && !reduced };
}
