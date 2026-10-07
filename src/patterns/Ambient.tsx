import { useEffect, useRef, useState } from 'react';
import { motion, useTransform, useMotionValueEvent, useSpring } from 'motion/react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import type { AnimationItem } from 'lottie-web';
import type { StudyProps } from '../catalog/types';
import { Artwork } from '../components/Artwork';
import paths from './footer-paths.json';
import { clamp, phase, curves } from '../player/math';
import { enabled } from '../player/useTrack';
import { useActivity } from '../player/useActivity';
const periods = [450000, 257000, 600000, 327000, 225000, 400000];
function OutlineShape({ p, index }: { p: StudyProps; index: number }) {
  const rotate = useTransform(p.time, (t) =>
    enabled(p, 'shapes')
      ? ((index % 2 ? -1 : 1) * 360 * t) / (periods[index] * (p.profile === 'source' ? 1 : 0.5))
      : 0,
  );
  return (
    <motion.g style={{ rotate, transformBox: 'fill-box', transformOrigin: '50% 50%' }}>
      {paths[index].map((d, j) => (
        <path
          key={j}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </motion.g>
  );
}
export function ShapeLoops(p: StudyProps) {
  const x = useTransform(p.time, (t) =>
    enabled(p, 'track') ? `${-50 * ((t / 120000) % 1)}%` : '0%',
  );
  return (
    <div className="shape-study">
      <div className="shape-caption">
        <span className="demo-eyebrow">TWO CLOCKS / ONE ATMOSPHERE</span>
        <h2>Slow enough to feel.</h2>
        <p>120s track · 225–600s rotations. Try 10× speed.</p>
      </div>
      <motion.div className="shape-track" style={{ x }}>
        {[0, 1].map((copy) => (
          <svg
            viewBox="0 -64 2692 768"
            preserveAspectRatio="xMinYMid meet"
            className="shape-copy"
            key={copy}
            aria-hidden="true"
          >
            {periods.map((_, index) => (
              <OutlineShape key={index} p={p} index={index} />
            ))}
          </svg>
        ))}
      </motion.div>
    </div>
  );
}
export function Marquee(p: StudyProps) {
  const x = useTransform(p.time, (t) =>
    enabled(p, 'track') ? `${-50 * ((t / 18000) % 1)}%` : '0%',
  );
  return (
    <div className="pattern-stage marquee-stage">
      <span className="demo-eyebrow">A REPEATED TRACK / ADAPTED 18S LAP</span>
      <div className="marquee-viewport">
        <motion.div className="text-marquee" style={{ x }}>
          {[0, 1].map((i) => (
            <div key={i} aria-hidden={i === 1}>
              Intent <i>✳</i> Continuity <i>✳</i> Rhythm <i>✳</i> Space <i>✳</i>
            </div>
          ))}
        </motion.div>
      </div>
      <p>Repeat identical geometry. Translate one copy width.</p>
    </div>
  );
}
export function GalleryDrift(p: StudyProps) {
  const activity = useActivity(p.reduced),
    [emblaRef, api] = useEmblaCarousel({ loop: true, dragFree: true, align: 'start' }, [
      AutoScroll({
        playOnInit: false,
        startDelay: 0,
        speed: (p.profile === 'source' ? 0.5 : 0.35) * p.speed,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
        stopOnFocusIn: true,
      }),
    ]);
  useEffect(() => {
    const plugin = api?.plugins().autoScroll;
    if (activity.active && enabled(p, 'track')) plugin?.play();
    else plugin?.stop();
    return () => plugin?.stop();
  }, [api, activity.active, p.layers, p.reduced, p.speed, p.profile]);
  return (
    <div className="gallery-study" ref={activity.root}>
      <span className="demo-eyebrow">FIXED-STEP DRIFT + DRAG FREE</span>
      <div className="embla" ref={emblaRef}>
        <div className="embla-track">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              className="embla-slide"
              key={i}
              tabIndex={0}
              role="group"
              aria-label={`Public life image ${i + 1} of 8`}
            >
              <Artwork tone={i % 2 ? 'clay' : 'sage'} />
              <span>Public life / 0{i + 1}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="row-navigation">
        <span>Drag the strip. Focus pauses the plugin.</span>
        <button
          aria-pressed={activity.requested}
          onClick={() => activity.setRequested((v) => !v)}
          disabled={p.reduced}
        >
          {activity.requested ? 'Stop drift' : 'Start drift'}
        </button>
      </div>
    </div>
  );
}
export function LottieLogo(p: StudyProps) {
  const container = useRef<HTMLDivElement>(null),
    animation = useRef<AnimationItem | null>(null),
    current = useRef(0),
    [error, setError] = useState('');
  current.current = p.time.get();
  const options = useRef(p);
  options.current = p;
  useEffect(() => {
    let disposed = false;
    const abort = new AbortController();
    Promise.all([
      import('lottie-web/build/player/lottie_light'),
      fetch(import.meta.env.BASE_URL + 'audits/lenzing-motion-audit/logo-animation.json', {
        signal: abort.signal,
      }).then((r) => {
        if (!r.ok) throw Error('Logo asset unavailable');
        return r.json();
      }),
    ])
      .then(([module, data]) => {
        if (disposed || !container.current) return;
        animation.current = module.default.loadAnimation({
          container: container.current,
          renderer: 'svg',
          loop: false,
          autoplay: false,
          animationData: structuredClone(data),
        });
        const render = () =>
          animation.current?.goToAndStop(
            options.current.reduced || !enabled(options.current, 'logo')
              ? 339
              : clamp(current.current / 3400) * 339,
            true,
          );
        animation.current.addEventListener('DOMLoaded', render);
        render();
      })
      .catch((e) => {
        if (!disposed) setError(String(e));
      });
    return () => {
      disposed = true;
      abort.abort();
      animation.current?.destroy();
      animation.current = null;
    };
  }, [p.reduced]);
  useEffect(() => {
    animation.current?.goToAndStop(
      p.reduced || !enabled(p, 'logo') ? 339 : clamp(current.current / 3400) * 339,
      true,
    );
  }, [p.layers, p.reduced]);
  useMotionValueEvent(p.time, 'change', (t) => {
    current.current = t;
    animation.current?.goToAndStop(
      p.reduced || !enabled(p, 'logo') ? 339 : clamp(t / 3400) * 339,
      true,
    );
  });
  return (
    <div className="pattern-stage lottie-study">
      <div className="lottie-mark" ref={container} />
      <p>{error || 'Preserved Lenzing vector logo · 340 frames at 100fps · SVG renderer'}</p>
      <small>For private study. Substitute your own artwork in a production site.</small>
    </div>
  );
}
function SpringBar({ index, p, target }: { index: number; p: StudyProps; target: number | null }) {
  const height = useSpring(20, { stiffness: 100, damping: 18, mass: 1 }),
    idle = [
      20.529, 34.049, 54.331, 81.373, 128.697, 81.373, 54.331, 34.049, 20.529, 13.768, 10.387,
      8.698, 7.852, 7.853, 7.853,
    ][index];
  useEffect(() => {
    const d = target === null ? null : Math.abs(index * 12 - target),
      h =
        d === null
          ? idle
          : d <= 25
            ? 128 - (88 * d) / 25
            : d <= 60
              ? 40 - (28 * (d - 25)) / 35
              : 12;
    if (enabled(p, 'bars')) height.set(h);
    else height.jump(h);
  }, [target, idle, index, p.reduced, p.layers, height]);
  return <motion.i style={{ height }} />;
}
export function SpringBars(p: StudyProps) {
  const [target, setTarget] = useState<number | null>(null);
  return (
    <div className="pattern-stage dark">
      <div
        className="spring-bars"
        onPointerMove={(e) => {
          const b = e.currentTarget.getBoundingClientRect();
          setTarget(((e.clientX - b.left) / b.width) * 180);
        }}
        onPointerLeave={() => setTarget(null)}
      >
        {Array.from({ length: 15 }, (_, i) => (
          <SpringBar key={i} index={i} p={p} target={target} />
        ))}
      </div>
      <label className="spring-control">
        Keyboard alternative
        <input
          type="range"
          min="0"
          max="180"
          value={target ?? 60}
          onChange={(e) => setTarget(Number(e.target.value))}
          onBlur={() => setTarget(null)}
        />
      </label>
      <p>
        100 stiffness · 18 damping · 1 mass.
        <br />
        Physics defines the settle, so speed control does not change this spring.
      </p>
    </div>
  );
}
const clients = [
  'ARBOR',
  'Common',
  'PACE',
  'Métro',
  'FIELD',
  'Forma',
  'NORTH',
  'Sundays',
  'GRID',
  'Open',
  'OTTO',
  'Public',
];
function RotatorColumn({ p, index }: { p: StudyProps; index: number }) {
  const a = useTransform(p.time, (t) =>
      !enabled(p, 'columns') ? 0 : Math.floor(Math.max(0, t - index * 100) / 2500) % 2,
    ),
    opacity = useTransform(p.time, (t) =>
      !enabled(p, 'columns') ? 1 : Math.min(1, phase(Math.max(0, t - index * 100) % 2500, 0, 300)),
    ),
    y = useTransform(p.time, (t) =>
      !enabled(p, 'columns') ? 0 : -20 * (1 - phase(Math.max(0, t - index * 100) % 2500, 0, 300)),
    );
  return (
    <div className="rotator-column">
      <motion.span style={{ opacity, y }}>
        <motion.span>{useTransform(a, (v) => clients[index + v * 6])}</motion.span>
      </motion.span>
    </div>
  );
}
export function ColumnRotators(p: StudyProps) {
  return (
    <div className="pattern-stage">
      <span className="demo-eyebrow">COLUMN-LOCAL SEQUENCES</span>
      <div className="client-rotators">
        {Array.from({ length: p.narrow ? 3 : 6 }, (_, i) => (
          <RotatorColumn key={i} p={p} index={i} />
        ))}
      </div>
      <p>
        2.5s period · 100ms column offsets · 300ms changes.
        <br />
        The study uses deterministic ordering so you can replay it.
      </p>
    </div>
  );
}
export function DelayedHelp(p: StudyProps) {
  const expanded = useTransform(p.time, (t) =>
      !enabled(p, 'invitation') ? true : t >= 3000 && t < 9000,
    ),
    opacity = useTransform(p.time, (t) =>
      !enabled(p, 'invitation')
        ? 1
        : curves.out(phase(t, 3000, 300)) * (1 - curves.out(phase(t, 9000, 300))),
    ),
    height = useTransform(opacity, (v) => v * 125);
  return (
    <div className="help-study">
      <span className="demo-eyebrow">A TIMED INVITATION</span>
      <h2>
        A little help
        <br />
        when you need it.
      </h2>
      <motion.div className="help-card" style={{ height, opacity }}>
        <b>Looking for the right fit?</b>
        <p>Our material guide is a good place to start.</p>
        <span>View the guide ↗</span>
      </motion.div>
      <motion.span
        className="help-launcher"
        style={{ opacity: useTransform(expanded, (v) => (v ? 0 : 1)) }}
      >
        ?
      </motion.span>
      <p className="help-note">
        Wait 3s · invite for 6s · then collapse.
        <br />
        This is a timing study; no support message is sent.
      </p>
    </div>
  );
}
