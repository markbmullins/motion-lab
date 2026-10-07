import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { recipes } from './catalog/recipes';
import { patterns } from './catalog/patterns';
import { scenes } from './catalog/scenes';
import sites from './catalog/sites.json';
import { purposes } from './catalog/types';
import { useSettings } from './player/settings';
import { StudyView } from './components/StudyView';
import { AuditLibrary } from './components/SourceView';
import { SceneView } from './scenes/SceneView';
const AccessibilityProbe = /* @__PURE__ */ lazy(() => import('./components/AccessibilityProbe'));
const qa = import.meta.env.DEV && new URLSearchParams(location.search).has('qa');
type Section = 'patterns' | 'recipes' | 'scenes' | 'sources';
function route() {
  const [kind, id] = location.hash.replace(/^#\/?/, '').split('/');
  return {
    kind: (['patterns', 'recipes', 'scenes', 'sources'].includes(kind)
      ? kind
      : 'recipes') as Section,
    id: id || '',
  };
}
export default function App() {
  const [current, setCurrent] = useState(route),
    [query, setQuery] = useState(''),
    [purpose, setPurpose] = useState('All purposes'),
    settings = useSettings();
  const lastSection = useRef(current.kind);
  useEffect(() => {
    const change = () => {
      const next = route();
      setCurrent(next);
      if (lastSection.current !== next.kind) {
        setQuery('');
        setPurpose('All purposes');
      }
      lastSection.current = next.kind;
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', change);
    return () => window.removeEventListener('hashchange', change);
  }, []);
  const registry = current.kind === 'patterns' ? patterns : recipes,
    selected = registry.find((s) => s.id === current.id) || registry[0],
    scene = scenes.find((s) => s.id === current.id) || scenes[0];
  useEffect(() => {
    document.title =
      (current.kind === 'sources'
        ? 'Source library'
        : current.kind === 'scenes'
          ? scene.title
          : selected.title) + ' · Motion Lab';
  }, [selected, scene, current.kind]);
  const matches = registry.filter(
    (s) =>
      (purpose === 'All purposes' || s.purpose === purpose) &&
      (
        s.id +
        ' ' +
        s.mechanics +
        ' ' +
        s.title +
        ' ' +
        s.subtitle +
        ' ' +
        s.tags.join(' ') +
        ' ' +
        s.sources.map((s) => s.site).join(' ')
      )
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <a
        className="skip"
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('main')?.focus();
        }}
      >
        Skip to study
      </a>
      <header className="app-header">
        <a className="wordmark" href="#/recipes/editorial">
          M<span className="logo-slash">/</span>L <span>Motion Lab</span>
        </a>
        <nav aria-label="Main">
          {(['patterns', 'recipes', 'scenes', 'sources'] as Section[]).map((kind) => (
            <a
              key={kind}
              href={'#/' + kind}
              aria-current={current.kind === kind ? 'page' : undefined}
            >
              {kind[0].toUpperCase() + kind.slice(1)}
            </a>
          ))}
        </nav>
        <div className="global-settings">
          <label>
            Speed{' '}
            <select
              aria-label="Speed"
              value={settings.speed}
              onChange={(e) => settings.setSpeed(Number(e.target.value))}
            >
              <option value=".25">.25×</option>
              <option value=".5">.5×</option>
              <option value="1">1×</option>
              <option value="2">2×</option>
              <option value="10">10×</option>
            </select>
          </label>
          <label title={'OS preference: ' + (settings.osReduced ? 'reduce' : 'no preference')}>
            <input
              type="checkbox"
              checked={settings.reduced}
              onChange={(e) => settings.setReduced(e.target.checked)}
            />{' '}
            Reduce motion
          </label>
          <button onClick={settings.pauseAll}>Pause all</button>
        </div>
      </header>
      <div className="app-layout">
        <aside className="sidebar">
          <span className="eyebrow">
            {current.kind === 'patterns'
              ? 'VOCABULARY / ' + patterns.length
              : current.kind === 'recipes'
                ? 'COMPOSITIONS / ' + recipes.length
                : current.kind === 'scenes'
                  ? 'IN CONTEXT / ' + scenes.length
                  : 'EVIDENCE / ' + sites.length}
          </span>
          {current.kind === 'patterns' || current.kind === 'recipes' ? (
            <>
              <label className="catalog-search">
                <span className="sr-only">Search studies</span>
                <input
                  type="search"
                  aria-label="Search studies"
                  placeholder="Search motion…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <span aria-hidden="true">⌕</span>
              </label>
              {current.kind === 'patterns' && (
                <label className="purpose-filter">
                  <span className="sr-only">Filter by purpose</span>
                  <select
                    aria-label="Filter by purpose"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                  >
                    <option>All purposes</option>
                    {purposes.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </label>
              )}
              <div className="catalog-links">
                {matches.map((study) => (
                  <a
                    key={study.id}
                    className={'study-link ' + (selected.id === study.id ? 'active' : '')}
                    aria-current={selected.id === study.id ? 'page' : undefined}
                    href={'#/' + current.kind + '/' + study.id}
                  >
                    <b>{String(registry.indexOf(study) + 1).padStart(2, '0')}</b>
                    <span className="study-link-title">
                      {study.title}
                      <small>{study.purpose}</small>
                    </span>
                    <i>↗</i>
                  </a>
                ))}
              </div>
              <p className="catalog-count" role="status">
                {matches.length} {matches.length === 1 ? 'study' : 'studies'}
                {matches.length === 0 ? ' · try another term' : ''}
              </p>
            </>
          ) : current.kind === 'scenes' ? (
            <div className="catalog-links">
              {scenes.map((s, i) => (
                <a
                  key={s.id}
                  className={'study-link ' + (scene.id === s.id ? 'active' : '')}
                  href={'#/scenes/' + s.id}
                  aria-current={scene.id === s.id ? 'page' : undefined}
                >
                  <b>0{i + 1}</b>
                  <span className="study-link-title">
                    {s.title}
                    <small>{s.theme}</small>
                  </span>
                  <i>↗</i>
                </a>
              ))}
            </div>
          ) : (
            <div className="sidebar-source-note">
              Measurements stay attached to their origin. Reconstructions and new compositions are
              labeled.
            </div>
          )}
        </aside>
        <main id="main" tabIndex={-1}>
          {current.kind === 'sources' ? (
            <AuditLibrary />
          ) : current.kind === 'scenes' ? (
            <SceneView key={scene.id} scene={scene} />
          ) : (
            <StudyView
              key={current.kind + selected.id}
              study={selected}
              kind={current.kind}
              index={registry.indexOf(selected)}
            />
          )}
        </main>
      </div>
      {qa && (
        <Suspense fallback={null}>
          <AccessibilityProbe />
        </Suspense>
      )}
      <footer className="app-footer">
        <span>Motion Lab / Private study collection</span>
        <span>
          {patterns.length} mechanisms · {recipes.length} recipes · {scenes.length} scenes
        </span>
      </footer>
    </>
  );
}
