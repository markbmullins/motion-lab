import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
type Settings = { speed: number; setSpeed: (n: number) => void; reduced: boolean; setReduced: (v: boolean) => void; osReduced: boolean; pauseSignal: number; pauseAll: () => void };
const Context = createContext<Settings | null>(null);
export function SettingsProvider({ children }: { children: ReactNode }) {
 const [speed, setSpeed] = useState(1), [osReduced, setOSReduced] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
 const [override, setOverride] = useState<boolean | null>(null), [pauseSignal, setPauseSignal] = useState(0);
 useEffect(() => { const media = matchMedia('(prefers-reduced-motion: reduce)'); const listener = (e: MediaQueryListEvent) => { setOSReduced(e.matches); setOverride(null); }; media.addEventListener('change', listener); return () => media.removeEventListener('change', listener); }, []);
 const value = useMemo(() => ({ speed, setSpeed, reduced: override ?? osReduced, setReduced: setOverride, osReduced, pauseSignal, pauseAll: () => setPauseSignal(n => n + 1) }), [speed, override, osReduced, pauseSignal]);
 return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useSettings() { const value = useContext(Context); if (!value) throw new Error('Motion settings provider is missing'); return value; }
