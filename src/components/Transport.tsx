import type { Player } from '../player/usePlayer';
import type { Driver } from '../catalog/types';
import { useSettings } from '../player/settings';
export function Transport({ player, driver }: { player: Player; driver: Driver }) {
  const { reduced } = useSettings(),
    interactive = driver === 'interaction' || driver === 'native';
  return (
    <div className="transport">
      <div className="transport-top">
        <div className="transport-buttons">
          {interactive ? (
            <button className="play-button" onClick={player.reset}>
              ↻ Reset interaction
            </button>
          ) : (
            <>
              <button className="play-button" onClick={player.running ? player.pause : player.play}>
                {player.running ? 'Ⅱ Pause' : '▶ Replay'}
              </button>
              <button
                className="icon-button"
                aria-label="Go to initial state"
                onClick={() => player.seek(0)}
              >
                ↤
              </button>
              <button
                className="icon-button"
                aria-label="Go to final state"
                onClick={() => player.seek(player.durationMs)}
              >
                ↦
              </button>
            </>
          )}
        </div>
        <span className="clock-label">
          {interactive
            ? driver === 'native'
              ? 'BROWSER CONTROLLED'
              : 'INTERACTION DRIVEN'
            : driver === 'scroll'
              ? ((player.readout / player.durationMs) * 100).toFixed(0) + '% PROGRESS'
              : (player.readout / 1000).toFixed(2) +
                ' / ' +
                (player.durationMs / 1000).toFixed(2) +
                's'}
        </span>
      </div>
      {!interactive && (
        <label className="scrub-label">
          <span className="sr-only">
            {driver === 'scroll' ? 'Illustrative scroll progress' : 'Animation time'}
          </span>
          <input
            type="range"
            min="0"
            max={player.durationMs}
            value={player.readout}
            step="1"
            onChange={(e) => player.seek(Number(e.target.value))}
          />
        </label>
      )}
      <p className="transport-note" role="status">
        {reduced
          ? 'Reduced motion · stable destinations'
          : interactive
            ? 'Use the controls in the preview. Reset returns to its initial state.'
            : driver === 'scroll'
              ? 'Scrub progress, or use actual scrolling in the study. Replay is illustrative.'
              : player.running
                ? 'Playing · pauses when hidden or offscreen'
                : 'Ready to inspect · replay, scrub, or isolate a layer'}
      </p>
    </div>
  );
}
