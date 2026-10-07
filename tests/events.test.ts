import { test } from 'node:test';
import assert from 'node:assert/strict';
import { captureHeaderScroll } from '../src/player/events.ts';
test('Deferred header updates keep the scroll snapshot after React clears currentTarget', () => {
  const event: { currentTarget: { scrollTop: number } | null } = {
    currentTarget: { scrollTop: 40 },
  };
  const update = captureHeaderScroll(event as { currentTarget: { scrollTop: number } });
  event.currentTarget = null;
  assert.equal(update(false), true);
  assert.equal(update(true), true);
  const top = captureHeaderScroll({ currentTarget: { scrollTop: 0 } });
  assert.equal(top(true), false);
});
