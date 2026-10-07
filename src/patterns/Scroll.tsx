import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import type { StudyProps } from '../catalog/types';
import { Artwork } from '../components/Artwork';
import { enabled } from '../player/useTrack';
import { overlapValues, clamp } from '../player/math';
export function ScrollConverge(p: StudyProps & { realDefault?: boolean }) {
  const root = useRef<HTMLDivElement>(null),
    target = useRef<HTMLDivElement>(null),
    first = useRef<HTMLDivElement>(null),
    second = useRef<HTMLDivElement>(null),
    [real, setReal] = useState(p.realDefault ?? false);
  const desktop = useScroll({ container: root, target, offset: ['start 1.25', 'end .35'] });
  const narrowFirst = useScroll({
      container: root,
      target: first,
      offset: ['start 1.05', 'start .7'],
    }),
    narrowSecond = useScroll({
      container: root,
      target: second,
      offset: ['start 1.05', 'start .7'],
    });
  const progress = useTransform(() => (real ? desktop.scrollYProgress.get() : p.time.get() / 1000));
  const leftX = useTransform(() =>
    !enabled(p, 'cards')
      ? '0%'
      : p.narrow
        ? overlapValues(real ? narrowFirst.scrollYProgress.get() : progress.get(), true).leftX + '%'
        : overlapValues(progress.get()).leftX + '%',
  );
  const rightX = useTransform(() =>
    !enabled(p, 'cards')
      ? '0%'
      : p.narrow
        ? overlapValues(real ? narrowSecond.scrollYProgress.get() : progress.get(), true).rightX +
          '%'
        : overlapValues(progress.get()).rightX + '%',
  );
  const leftY = useTransform(progress, (v) =>
      !enabled(p, 'cards') || p.narrow ? 0 : overlapValues(v).leftY,
    ),
    rightY = useTransform(progress, (v) =>
      !enabled(p, 'cards') || p.narrow ? 0 : overlapValues(v).rightY,
    );
  const light = useTransform(progress, (v) => (enabled(p, 'light') ? 0.15 + clamp(v) * 0.6 : 0)),
    headline = useTransform(progress, (v) => (enabled(p, 'headline') ? clamp(v / 0.22) : 1));
  return (
    <div className="scroll-study">
      <div className="scroll-mode">
        <label>
          <input type="checkbox" checked={real} onChange={(e) => setReal(e.target.checked)} /> Use
          real scrolling
        </label>
        <span>
          {real
            ? 'Container-relative viewport offsets'
            : 'Illustrative progress · use the scrubber below'}
        </span>
      </div>
      <div
        className={'scroll-window ' + (p.narrow ? 'narrow-cards' : '')}
        ref={root}
        tabIndex={0}
        aria-label="Scroll story preview"
        style={{ overflowY: real ? 'auto' : 'hidden' }}
      >
        <div className={real ? 'scroll-story-long' : 'scroll-story-still'}>
          <motion.header className="scroll-intro" style={{ opacity: headline }}>
            <span className="demo-eyebrow">BETTER TOGETHER</span>
            <h2>Room for everyone.</h2>
            <p>Two perspectives become one place.</p>
          </motion.header>
          <div className="overlap-cards" ref={target}>
            <motion.div
              className="overlap-card left-card"
              ref={first}
              style={{ x: leftX, y: leftY }}
            >
              <Artwork />
              <span>A place to pause</span>
            </motion.div>
            <motion.div
              className="overlap-card right-card"
              ref={second}
              style={{ x: rightX, y: rightY }}
            >
              <Artwork tone="clay" />
              <span>A place to connect</span>
            </motion.div>
            <motion.div className="overlap-light" style={{ opacity: light }} />
          </div>
          {real && (
            <div className="scroll-outro">
              The cards now hold their horizontal position.
              <br />
              The vertical drift continues.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export function ScrollLight(p: StudyProps) {
  const progress = useTransform(p.time, (v) => clamp(v / 1000));
  const y = useTransform(progress, (v) => `${enabled(p, 'beam') ? v * 100 : 0}%`),
    opacity = useTransform(progress, (v) =>
      enabled(p, 'beam') ? 0.25 + 0.65 * Math.sin(v * Math.PI) : 0.2,
    );
  return (
    <div className="pattern-stage dark light-study">
      <div className="light-panel">
        <span className="demo-eyebrow">A MOVING EDGE, NOT MOVING CONTENT</span>
        <h2>
          Give the frame
          <br />a quiet pulse.
        </h2>
        <p>Use progress to reveal lighting while the text remains still.</p>
        <motion.div className="edge-light" style={{ top: y, opacity }} />
      </div>
    </div>
  );
}
export function NativeCarousel(p: StudyProps) {
  const row = useRef<HTMLDivElement>(null),
    [index, setIndex] = useState(0),
    [canNext, setCanNext] = useState(true);
  function move(direction: number) {
    if (row.current)
      row.current.scrollBy({
        left: row.current.clientWidth * direction,
        behavior: p.reduced ? 'instant' : 'smooth',
      });
  }
  return (
    <div className="native-study">
      <div
        className="native-row"
        ref={row}
        tabIndex={0}
        aria-label="Native horizontal project gallery"
        onScroll={(e) => {
          const el = e.currentTarget;
          setIndex(Math.round(el.scrollLeft / Math.max(1, el.clientWidth * 0.84)));
          setCanNext(el.scrollWidth - el.clientWidth - el.scrollLeft > 1);
        }}
        style={{ scrollBehavior: p.reduced ? 'auto' : 'smooth' }}
      >
        {['Public life', 'Room to gather', 'Shared ground', 'A quieter city'].map((title, i) => (
          <article className="native-slide" key={title}>
            <Artwork tone={i % 2 ? 'clay' : 'sage'} />
            <h2>{title}</h2>
            <p>0{i + 1} / Common Ground</p>
          </article>
        ))}
      </div>
      <div className="row-navigation">
        <span>Drag, scroll horizontally, or use the arrows.</span>
        <button aria-label="Previous project" disabled={index === 0} onClick={() => move(-1)}>
          ←
        </button>
        <button aria-label="Next project" disabled={!canNext} onClick={() => move(1)}>
          →
        </button>
      </div>
    </div>
  );
}
