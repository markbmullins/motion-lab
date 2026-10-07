import { memo, useEffect, useState } from 'react';
import type { LayerSettings, Study, StudyProps } from '../catalog/types';
import { usePlayer } from '../player/usePlayer';
import { useSettings } from '../player/settings';
import { Transport } from './Transport';
import { SourceView } from './SourceView';
import sites from '../catalog/sites.json';
import textCode from './AnimatedText.tsx?raw';
import trackCode from '../player/useTrack.ts?raw';
import playerCode from '../player/usePlayer.ts?raw';
import mathCode from '../player/math.ts?raw';
import { letterDelays } from '../player/math';
const StudyRenderer = memo(function StudyRenderer({
  component: Component,
  ...props
}: StudyProps & { component: Study['component'] }) {
  return <Component {...props} />;
});
function Timeline({
  study,
  readout,
  variant,
  profile,
  compare,
}: {
  study: Study;
  readout: number;
  variant: string;
  profile: string;
  compare: boolean;
}) {
  const [windowMs, setWindowMs] = useState(study.durationMs || 1500);
  let tracks = study.tracks;
  if (study.id === 'divider' && variant !== 'diamond')
    tracks = [
      { id: 'lines', label: 'Divider', startMs: 400, durationMs: 1000, role: '50px · inOutQuad' },
    ];
  if (study.id === 'masked-text') {
    const instrument = variant === 'instrument',
      delays = letterDelays('Ideas need room.', instrument ? 50 : 25, instrument ? 0 : 80);
    tracks = [
      {
        id: 'text',
        label: 'Headline glyphs',
        startMs: 0,
        durationMs: (instrument ? 1000 : 800) + delays.at(-1)!.delayMs,
        role: 'Character + word offsets',
      },
    ];
  }
  const span =
    study.durationMs > 0 ? windowMs : Math.max(...tracks.map((t) => t.startMs + t.durationMs), 1);
  return (
    <section className="timeline">
      <div className="timeline-heading">
        <span className="eyebrow">
          SOURCE TIMING MAP /{' '}
          {study.driver === 'scroll'
            ? 'PROGRESS'
            : study.driver === 'native'
              ? 'NATIVE'
              : study.driver === 'interaction'
                ? 'EVENT-RELATIVE'
                : 'MS'}
        </span>
        {study.durationMs > 10000 && (
          <label>
            Window{' '}
            <select value={windowMs} onChange={(e) => setWindowMs(Number(e.target.value))}>
              <option value={study.durationMs}>Full lap</option>
              <option value={2500}>First2.5s</option>
            </select>
          </label>
        )}
      </div>
      {tracks.map((track) => (
        <div className="timeline-row" key={track.id}>
          <span>{track.label}</span>
          <div className="timeline-lane">
            <i
              className="timeline-bar"
              style={{
                left: `${Math.min(100, (track.startMs / span) * 100)}%`,
                width: `${Math.max(1, Math.min(100 - (track.startMs / span) * 100, (track.durationMs / span) * 100))}%`,
              }}
            />
            {study.durationMs > 0 && profile === 'source' && !compare && (
              <b
                className="timeline-cursor"
                style={{ left: Math.min(100, (readout / span) * 100) + '%' }}
              />
            )}
          </div>
          <small>
            {study.driver === 'scroll'
              ? `${Math.round(track.startMs / 10)}–${Math.round((track.startMs + track.durationMs) / 10)}%`
              : track.durationMs === 0
                ? 'Native clock'
                : `${track.startMs} + ${track.durationMs}ms`}
          </small>
        </div>
      ))}
      <p>
        Recorded timing structure, not a performance trace.{' '}
        {profile === 'adapted' || compare
          ? 'The preview is currently using an adaptation.'
          : study.driver === 'interaction'
            ? 'Different events own these durations; they do not share a scrubber.'
            : ''}
      </p>
    </section>
  );
}
export function StudyView({
  study,
  kind,
  index,
}: {
  study: Study;
  kind: 'patterns' | 'recipes';
  index: number;
}) {
  const player = usePlayer(study.durationMs, study.driver),
    settings = useSettings(),
    [layers, setLayers] = useState<LayerSettings>({ muted: [], solo: null });
  const [profile, setProfile] = useState<'source' | 'adapted'>('source'),
    [compare, setCompare] = useState(false),
    [narrow, setNarrow] = useState(false),
    [small, setSmall] = useState(false),
    [variant, setVariant] = useState(study.variants?.[0].id || ''),
    [detail, setDetail] = useState('guide'),
    [module, setModule] = useState('study'),
    [copied, setCopied] = useState(false);
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setSmall(entry.contentRect.width < 500));
    if (player.container.current) observer.observe(player.container.current);
    return () => observer.disconnect();
  }, [player.container]);
  const [studyCode, setStudyCode] = useState('Loading implementation…');
  useEffect(() => {
    if (detail !== 'code') return;
    let active = true;
    study
      .code()
      .then((code) => {
        if (active) setStudyCode(code);
      })
      .catch(() => {
        if (active) setStudyCode('Unable to load this module. See the source files in src/.');
      });
    return () => {
      active = false;
    };
  }, [detail, study]);

  const modules: Record<string, string> = {
    study: studyCode,
    text: textCode,
    track: trackCode,
    player: playerCode,
    math: mathCode,
  };
  function exportPreset() {
    const blob = new Blob(
      [
        JSON.stringify(
          {
            version: 1,
            study: study.id,
            kind,
            profile,
            compare,
            narrow,
            variant,
            layers,
            speed: settings.speed,
            reducedMotion: settings.reduced,
          },
          null,
          2,
        ),
      ],
      { type: 'application/json' },
    );
    const url = URL.createObjectURL(blob),
      link = document.createElement('a');
    link.href = url;
    link.download = 'motion-lab-' + study.id + '.json';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">
            {kind === 'recipes' ? 'RECIPE' : 'PATTERN'} {String(index + 1).padStart(2, '0')} /{' '}
            {study.purpose}
          </span>
          <h1>{study.title}</h1>
          <p>{study.subtitle}</p>
        </div>
        <span className="composition-mark">↗</span>
      </div>
      <div className="workspace">
        <div className="study-column">
          <div className="preview-toolbar">
            <div>
              <span className="eyebrow">
                {kind === 'recipes' ? 'NEW COMPOSITION' : 'MECHANISM RECONSTRUCTION'}
              </span>
              <span className="driver-badge">{study.driver}</span>
            </div>
            <label>
              <input
                type="checkbox"
                checked={narrow}
                onChange={(e) => setNarrow(e.target.checked)}
              />{' '}
              Narrow preview
            </label>
          </div>
          <div className={'preview-mat ' + (narrow ? 'narrow-preview' : '')}>
            <div className="preview-frame" ref={player.container}>
              <StudyRenderer
                component={study.component}
                key={player.resetKey}
                time={player.time}
                reduced={settings.reduced}
                speed={settings.speed}
                profile={profile}
                compare={compare}
                layers={layers}
                narrow={narrow || small}
                variant={variant}
                resetKey={player.resetKey}
              />
            </div>
          </div>
          <Transport player={player} driver={study.driver} />
          <Timeline
            study={study}
            readout={player.readout}
            variant={variant}
            profile={profile}
            compare={compare}
          />
          <div className="detail-tabs" aria-label="Study details">
            {['guide', 'code', 'sources'].map((item) => (
              <button key={item} aria-pressed={detail === item} onClick={() => setDetail(item)}>
                {item === 'guide'
                  ? 'Why it works'
                  : item === 'code'
                    ? 'Implementation'
                    : 'Source records'}
              </button>
            ))}
          </div>
          {detail === 'guide' ? (
            <div className="lesson">
              <span className="eyebrow">THE DECISION</span>
              <h2>{kind === 'recipes' ? 'Compose with intent.' : 'Give motion a job.'}</h2>
              <p>{study.lesson}</p>
              <div className="mechanics">
                <span className="eyebrow">HOW IT WORKS</span>
                <p>{study.mechanics}</p>
              </div>
              {study.patternIds && (
                <div className="recipe-links">
                  <span className="eyebrow">BUILDING BLOCKS</span>
                  {study.patternIds.map((id) => (
                    <a key={id} href={'#/patterns/' + id}>
                      {id.replaceAll('-', ' ')} <span>↗</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ) : detail === 'sources' ? (
            <SourceView sources={study.sources} />
          ) : (
            <div className="code-view">
              <div className="code-toolbar">
                <label>
                  Module{' '}
                  <select
                    aria-label="Implementation module"
                    value={module}
                    onChange={(e) => setModule(e.target.value)}
                  >
                    <option value="study">Study / mechanism group</option>
                    <option value="text">AnimatedText</option>
                    <option value="track">Track helpers</option>
                    <option value="player">Playback controller</option>
                    <option value="math">Timing math</option>
                  </select>
                </label>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(modules[module]).then(() => {
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    });
                  }}
                >
                  {copied ? 'Copied' : 'Copy code'}
                </button>
              </div>
              <p>
                This is the actual application source. It uses the adjacent helpers, shared styles
                and context; it is not a standalone copy-paste snippet.
              </p>
              <pre tabIndex={0}>
                <code>{modules[module]}</code>
              </pre>
            </div>
          )}
        </div>
        <aside className="inspector">
          <span className="eyebrow">CHOREOGRAPHY</span>
          <h2>Take it apart.</h2>
          <p className="inspector-intro">Disable motion to leave stable destinations.</p>
          {study.variants && (
            <label className="inspector-field">
              Variant
              <select
                aria-label="Variant"
                value={variant}
                onChange={(e) => {
                  setVariant(e.target.value);
                  player.reset();
                }}
              >
                {study.variants.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.label}
                  </option>
                ))}
              </select>
            </label>
          )}
          <label className="inspector-field">
            Profile
            <select
              aria-label="Profile"
              value={profile}
              onChange={(e) => {
                setProfile(e.target.value as 'source' | 'adapted');
                player.reset();
              }}
            >
              <option value="source">Source mechanism / values</option>
              {study.adapted && <option value="adapted">Adapted for this composition</option>}
            </select>
          </label>
          {profile === 'adapted' && <p className="profile-note">{study.adapted}</p>}
          {study.comparison && (
            <div className="comparison-block">
              <label>
                <input
                  type="checkbox"
                  checked={compare}
                  onChange={(e) => {
                    setCompare(e.target.checked);
                    player.reset();
                  }}
                />{' '}
                Compare the decision
              </label>
              <p>{study.comparison}</p>
            </div>
          )}
          <div className="layer-list">
            {study.tracks.map((track, i) => (
              <div className="layer-item" key={track.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={!layers.muted.includes(track.id)}
                    onChange={(e) =>
                      setLayers((l) => ({
                        ...l,
                        muted: e.target.checked
                          ? l.muted.filter((id) => id !== track.id)
                          : [...l.muted, track.id],
                      }))
                    }
                  />
                  <span>
                    <small>{String(i + 1).padStart(2, '0')}</small>
                    <b>{track.label}</b>
                  </span>
                </label>
                <button
                  aria-label={'Solo motion: ' + track.label}
                  aria-pressed={layers.solo === track.id}
                  onClick={() =>
                    setLayers((l) => ({ ...l, solo: l.solo === track.id ? null : track.id }))
                  }
                >
                  Solo
                </button>
                <p>{track.role}</p>
              </div>
            ))}
          </div>
          {(layers.muted.length > 0 || layers.solo) && (
            <button className="clear-layers" onClick={() => setLayers({ muted: [], solo: null })}>
              Restore all layers
            </button>
          )}
          <div className="inspector-block">
            <span className="eyebrow">USE WHEN</span>
            <p>{study.useWhen}</p>
          </div>
          <div className="inspector-block">
            <span className="eyebrow">RECONSIDER WHEN</span>
            <p>{study.avoidWhen}</p>
          </div>
          <div className="source-pills">
            {Array.from(new Set(study.sources.map((s) => s.site))).map((site, i) => (
              <span className="source-name" key={site}>
                {i > 0 && <i> + </i>}
                {sites.find((s) => s.id === site)?.name}
              </span>
            ))}
          </div>
          <button className="export-button" onClick={exportPreset}>
            Export study preset ↗
          </button>
        </aside>
      </div>
    </>
  );
}
