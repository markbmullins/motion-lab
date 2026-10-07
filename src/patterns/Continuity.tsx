import { useEffect, useId, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion, useMotionValueEvent } from 'motion/react';
import type { StudyProps } from '../catalog/types';
import { Artwork, Furniture } from '../components/Artwork';
import { enabled, seconds } from '../player/useTrack';
import { usePlayer } from '../player/usePlayer';
import { MeasuredHighlight } from './Focus';
const items = [
  { name: 'Common bench', type: 'Seating', tone: 'sage' },
  { name: 'Gather table', type: 'Tables', tone: 'clay' },
  { name: 'Garden pavilion', type: 'Spaces', tone: 'blue' },
  { name: 'Arc stool', type: 'Seating', tone: 'clay' },
  { name: 'Courtyard table', type: 'Tables', tone: 'sage' },
  { name: 'Public canopy', type: 'Spaces', tone: 'blue' },
] as const;
export function Collection(p: StudyProps) {
  const [category, setCategory] = useState('All'),
    [pending, setPending] = useState('All'),
    [outgoing, setOutgoing] = useState(false),
    [generation, setGeneration] = useState(0),
    [focus, setFocus] = useState<string | null>(null),
    [outdoor, setOutdoor] = useState<string | null>(null);
  useEffect(() => {
    if (!outgoing) return;
    const timer = setTimeout(
      () => {
        setCategory(pending);
        setGeneration((n) => n + 1);
        setOutgoing(false);
        setFocus(null);
      },
      enabled(p, 'filter') ? 500 / p.speed : 0,
    );
    return () => clearTimeout(timer);
  }, [pending, outgoing, p.speed, p.reduced, p.layers]);
  const filtered = items.filter((item) => category === 'All' || item.type === category);
  function select(value: string) {
    if (value === category && !outgoing) return;
    setPending(value);
    setOutgoing(true);
  }
  return (
    <div className="collection-demo">
      <header>
        <span className="demo-eyebrow">COMMON GROUND / OBJECTS FOR PUBLIC LIFE</span>
        <h2>Find your place.</h2>
        <div className="collection-filters" aria-label="Filter collection">
          {['All', 'Seating', 'Tables', 'Spaces'].map((value) => (
            <button key={value} aria-pressed={pending === value} onClick={() => select(value)}>
              {value}
              <span className="filter-underline" />
            </button>
          ))}
        </div>
      </header>
      <div className="collection-grid" aria-busy={outgoing}>
        {filtered.map((item, i) => (
          <motion.button
            className="collection-card"
            key={item.name + '-' + generation}
            initial={{ opacity: p.reduced ? 1 : 0, y: p.reduced ? 0 : 20 }}
            animate={{
              opacity:
                outgoing && enabled(p, 'filter')
                  ? 0
                  : focus && focus !== item.name && filtered.length < 5 && enabled(p, 'siblings')
                    ? 0.5
                    : 1,
              y: 0,
            }}
            transition={{
              duration: enabled(p, 'filter') ? seconds(500, p) : 0,
              delay: outgoing ? 0 : enabled(p, 'filter') ? (i * 0.05) / p.speed : 0,
              ease: [0.16, 1, 0.3, 1],
            }}
            onMouseEnter={() => {
              setFocus(item.name);
              setOutdoor(item.name);
            }}
            onMouseLeave={() => {
              setFocus(null);
              setOutdoor(null);
            }}
            onFocus={() => {
              setFocus(item.name);
              setOutdoor(item.name);
            }}
            onBlur={() => {
              setFocus(null);
              setOutdoor(null);
            }}
            onClick={() => setOutdoor((v) => (v === item.name ? null : item.name))}
          >
            <div className="collection-card-media">
              {item.type === 'Seating' ? (
                <>
                  <Furniture />
                  <motion.div
                    className="product-overlay"
                    animate={{ opacity: outdoor === item.name ? 1 : 0 }}
                    transition={{
                      duration: enabled(p, 'images') ? seconds(300, p) : 0,
                      ease: [0, 0, 0.2, 1],
                    }}
                  >
                    <Furniture lifestyle />
                  </motion.div>
                </>
              ) : (
                <Artwork tone={item.tone} decorative />
              )}
            </div>
            <span>
              <b>{item.name}</b>
              <small>
                {item.type} / 0{i + 1}
              </small>
              <i>↗</i>
            </span>
          </motion.button>
        ))}
      </div>
      <p className="collection-count" role="status">
        {outgoing ? 'Changing collection…' : `${filtered.length} objects · ${category}`}
      </p>
    </div>
  );
}
export function Workflow(p: StudyProps) {
  const clock = usePlayer(5300, 'timeline', false),
    [sent, setSent] = useState(false),
    [stage, setStage] = useState(0),
    id = useId();
  useMotionValueEvent(clock.time, 'change', (t) => setStage(t >= 3000 ? 2 : t >= 2000 ? 1 : 0));
  function send() {
    setSent(true);
    setStage(0);
    clock.play();
    if (p.reduced) setStage(2);
  }
  function reset() {
    clock.reset();
    setSent(false);
    setStage(0);
  }
  const issue = (
    <motion.div
      className="new-issue"
      layoutId={p.compare ? undefined : 'issue'}
      layout={!p.compare}
      transition={{ duration: enabled(p, 'identity') ? seconds(600, p) : 0, bounce: 0 }}
    >
      <span className="issue-id">CG-24</span>
      <b>Make the collection keyboard friendly</b>
      <span className="issue-meta">
        ○ Planned <i>2</i>
      </span>
    </motion.div>
  );
  return (
    <div className="workflow-demo" ref={clock.container}>
      <header>
        <b>RELAY</b>
        <span>DESIGN / THIS WEEK</span>
      </header>
      <div className="workflow-selection">
        <MeasuredHighlight {...p} />
      </div>
      <LayoutGroup id={id}>
        <div className="workflow-columns">
          <section className="mock-chat">
            <span className="demo-eyebrow">TEAM CONVERSATION</span>
            <div className="chat-author">
              <i>J</i>
              <div>
                <b>Jules</b>
                <p>Can we make browsing feel calmer?</p>
              </div>
            </div>
            <AnimatePresence>
              {sent && (
                <motion.div
                  className="sent-message"
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: seconds(500, p), bounce: 0 }}
                >
                  Create an issue: make the collection keyboard friendly
                </motion.div>
              )}
            </AnimatePresence>
            {sent && stage >= 1 && (
              <motion.div
                className="chat-response"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: seconds(600, p), bounce: 0 }}
              >
                <span>✓ Issue created</span>
                {stage === 1 && issue}
                {stage === 2 && <small>Moved to the project board →</small>}
              </motion.div>
            )}
            <div className="workflow-send">
              <span>/issue Make the collection keyboard friendly</span>
              <button onClick={send} disabled={sent}>
                Send mock command ↑
              </button>
            </div>
          </section>
          <section className="mock-board">
            <span className="demo-eyebrow">
              PLANNED <b>{stage === 2 && sent ? '03' : '02'}</b>
            </span>
            <div className="static-issue">
              <small>CG-21</small>
              <b>Refine the navigation</b>
              <span>○ Planned</span>
            </div>
            <div className="static-issue">
              <small>CG-22</small>
              <b>Review material details</b>
              <span>○ Planned</span>
            </div>
            {sent && stage === 2 && issue}
          </section>
        </div>
      </LayoutGroup>
      <div className="workflow-controls">
        <p role="status">
          {!sent
            ? 'A local mock command. No external messages.'
            : stage === 0
              ? 'Message sent · response arrives after 2s'
              : stage === 1
                ? 'Issue created · board follows 1s later'
                : 'Same issue. New context.'}
        </p>
        {sent && stage < 2 && (
          <button onClick={clock.running ? clock.pause : () => clock.resume()}>
            {clock.running ? 'Pause sequence' : 'Resume sequence'}
          </button>
        )}
        <button onClick={reset}>Reset scenario</button>
      </div>
    </div>
  );
}
