import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  compactHeader,
  cubicBezier,
  letterDelays,
  overlapValues,
  phase,
} from '../src/player/math.ts';
test('hero delays count characters without treating spaces as animated glyphs', () => {
  assert.equal(letterDelays('GLADE').at(-1)?.delayMs, 100);
  assert.equal(letterDelays('PUBLIC BELONGING').at(-1)?.delayMs, 430);
});
test('scroll convergence has separate horizontal and vertical breakpoints and clamps', () => {
  assert.deepEqual(overlapValues(0), { leftX: 40, rightX: -40, leftY: 22, rightY: -22 });
  const mid = overlapValues(0.32);
  assert.equal(mid.leftY, 0);
  assert.equal(mid.rightY, 0);
  assert.ok(mid.leftX > 0);
  assert.equal(overlapValues(0.42).leftX, 0);
  assert.deepEqual(overlapValues(2), overlapValues(1));
  assert.deepEqual(overlapValues(0, true), { leftX: -14, rightX: 14, leftY: 0, rightY: 0 });
});
test('header hysteresis retains state inside the dead zone', () => {
  assert.equal(compactHeader(false, 24), false);
  assert.equal(compactHeader(false, 25), true);
  assert.equal(compactHeader(true, 10), true);
  assert.equal(compactHeader(false, 10), false);
  assert.equal(compactHeader(true, 4), true);
  assert.equal(compactHeader(true, 3), false);
});
test('Bezier samples invert x and preserve endpoints, including non-monotonic y', () => {
  const linear = cubicBezier(0, 0, 1, 1);
  assert.ok(Math.abs(linear(0.37) - 0.37) < 1e-6);
  const curve = cubicBezier(0.22, 1, 0.36, 1);
  assert.equal(curve(-1), 0);
  assert.equal(curve(2), 1);
  assert.ok(curve(0.5) > 0.5);
  assert.equal(phase(300, 400, 500), 0);
  assert.equal(phase(900, 400, 500), 1);
});
