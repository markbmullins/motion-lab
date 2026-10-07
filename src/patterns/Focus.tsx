import { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import type { StudyProps } from '../catalog/types';
import { Artwork, Furniture } from '../components/Artwork';
import { enabled, seconds } from '../player/useTrack';
const tones = ['sage', 'clay', 'blue'] as const;
export function HoverZoom(p: StudyProps) {
  const [active, setActive] = useState(false),
    isLenzing = p.variant === 'lenzing',
    isInstrument = p.variant === 'instrument';
  const duration = isLenzing ? 1400 : isInstrument ? 250 : p.variant === 'articles' ? 300 : 500;
  const scale = enabled(p, 'media')
    ? isInstrument
      ? active
        ? 1
        : 1.05
      : active
        ? p.variant === 'articles'
          ? 1.04
          : p.profile === 'source'
            ? isLenzing
              ? 1.05
              : 1.03
            : 1.02
        : p.variant === 'articles'
          ? 1.02
          : 1
    : 1;
  return (
    <div className="focus-study">
      <button
        className="image-button"
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        aria-label="Explore Common Ground"
      >
        <motion.div
          animate={{ scale }}
          transition={{
            duration: seconds(duration, p),
            ease: isLenzing ? (value: number) => 1 - (1 - value) ** 5 : [0.25, 0.1, 0.25, 1],
          }}
        >
          <Artwork />
        </motion.div>
        <span>
          Common Ground <i>↗</i>
        </span>
      </button>
      <p>Hover or focus the image. The frame stays fixed.</p>
    </div>
  );
}
export function Crossfade(p: StudyProps) {
  const [active, setActive] = useState(false);
  return (
    <div className="focus-study">
      <button
        className="image-button product-image"
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        onClick={() => setActive((v) => !v)}
        aria-label="Studio / Common bench. Toggle studio and outdoor view."
        aria-pressed={active}
      >
        <Furniture />
        <motion.div
          className="product-overlay"
          animate={{ opacity: active ? 1 : 0 }}
          transition={{
            duration: enabled(p, 'images') ? seconds(300, p) : 0,
            ease: [0, 0, 0.2, 1],
          }}
        >
          <Furniture lifestyle />
        </motion.div>
        <motion.span
          animate={{ opacity: active && enabled(p, 'caption') ? 0 : 1 }}
          transition={{ duration: seconds(300, p) }}
        >
          Studio / Common bench
        </motion.span>
      </button>
      <p>Hover, focus, or tap. The object keeps the same position.</p>
    </div>
  );
}
export function SiblingDim(p: StudyProps) {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div className="focus-study">
      <div className="focus-grid">
        {tones.map((tone, i) => (
          <motion.button
            key={tone}
            className="focus-card"
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
            animate={{
              opacity:
                enabled(p, 'siblings') && active !== null && active !== i
                  ? p.compare
                    ? 0.15
                    : p.profile === 'source'
                      ? 0.5
                      : 0.7
                  : 1,
            }}
            transition={{ duration: seconds(250, p) }}
          >
            <Artwork tone={tone} />
            <span>{['Garden pavilion', 'Public seating', 'Quiet courtyard'][i]}</span>
          </motion.button>
        ))}
      </div>
      <p>Attention belongs to the group, not only the active item.</p>
    </div>
  );
}
export function MeasuredHighlight(p: StudyProps) {
  const [selected, setSelected] = useState(0),
    [box, setBox] = useState({ x: 0, y: 0, width: 0, height: 0 }),
    group = useRef<HTMLDivElement>(null),
    targets = useRef<(HTMLButtonElement | null)[]>([]);
  useLayoutEffect(() => {
    const measure = () => {
      const root = group.current,
        target = targets.current[selected];
      if (root && target) {
        const a = root.getBoundingClientRect(),
          b = target.getBoundingClientRect();
        setBox({ x: b.left - a.left, y: b.top - a.top, width: b.width, height: b.height });
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (group.current) observer.observe(group.current);
    return () => observer.disconnect();
  }, [selected]);
  return (
    <div className="pattern-stage">
      <span className="demo-eyebrow">A SINGLE MEASURED OUTLINE</span>
      <div className="measured-group" ref={group}>
        {['All work', 'Identity', 'Digital experiences', 'Spaces'].map((item, i) => (
          <button
            key={item}
            ref={(el) => {
              targets.current[i] = el;
            }}
            aria-pressed={selected === i}
            onClick={() => setSelected(i)}
            onMouseEnter={() => setSelected(i)}
            onFocus={() => setSelected(i)}
          >
            {item}
          </button>
        ))}
        <motion.div
          className="measured-outline"
          aria-hidden="true"
          animate={box}
          transition={{
            duration: enabled(p, 'outline') ? seconds(p.compare ? 900 : 300, p) : 0,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      </div>
      <p>Measured after layout. Retargeted from its current position.</p>
    </div>
  );
}
export function HoverDetail(p: StudyProps) {
  const [active, setActive] = useState(false),
    [touched, setTouched] = useState(false);
  const act = (value: boolean) => {
    setActive(value);
    setTouched(true);
  };
  return (
    <div className="focus-study">
      <button
        className="detail-card"
        onMouseEnter={() => act(true)}
        onMouseLeave={() => act(false)}
        onFocus={() => act(true)}
        onBlur={() => act(false)}
        onClick={() => act(!active)}
        aria-pressed={active}
      >
        <Artwork tone="clay" />
        <motion.div
          className="detail-shade"
          animate={{ height: active ? '80%' : '40%' }}
          transition={{ duration: enabled(p, 'shade') ? seconds(400, p) : 0 }}
        />
        <motion.div
          className="detail-copy"
          animate={{
            y: p.reduced || p.narrow || !enabled(p, 'body') ? 0 : active ? 0 : touched ? 70 : 249,
          }}
          transition={{ duration: seconds(700, p), ease: [0.19, 1, 0.22, 1] }}
        >
          <span>01 / DOWNTOWN</span>
          <h2>
            The neighborhood
            <br />
            ritual.
          </h2>
          <p>
            A familiar chair. A considered cut.
            <br />A little time to yourself.
          </p>
        </motion.div>
        <motion.i
          className="detail-frame"
          animate={{ opacity: active ? 1 : 0 }}
          transition={{ duration: enabled(p, 'frame') ? seconds(400, p) : 0 }}
        />
      </button>
      <p>
        The source exit rests at 70px, rather than restoring the initial 249px. Narrow layouts keep
        the copy readable.
      </p>
    </div>
  );
}
export function LayerLift(p: StudyProps) {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div className="pattern-stage dark">
      <div className="layer-stack">
        {Array.from({ length: 5 }, (_, i) => (
          <motion.button
            key={i}
            className="stack-layer"
            style={{ top: 90 + i * 25, left: i * 5, zIndex: 5 - i }}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
            animate={{
              y:
                enabled(p, 'layers') && active !== null
                  ? -31.667 * Math.min(3, Math.max(0, active - i + 1))
                  : 0,
            }}
            transition={{
              duration: seconds(700, p),
              delay: enabled(p, 'layers') ? (i * 0.05) / p.speed : 0,
              ease: [0.32, 0.72, 0, 1],
            }}
          >
            <span>0{i + 1}</span>
            {['Direction', 'System', 'Experience', 'Interface', 'Detail'][i]}
          </motion.button>
        ))}
      </div>
      <p>Hover or focus a layer. The rise is capped at three steps.</p>
    </div>
  );
}
