/**
 * Draws myredirectchecker's icons. The glyph is a link's journey: two stops on
 * the way, joined by one line, and the stop it arrives at carrying the accent.
 *
 *   node scripts/make-icons.js
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { makeIcons, segment } from '@sharapov/service-kit/make-icons';

const PUBLIC_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public');

/** Coordinates are the same 1024-unit grid public/icon.svg is drawn on. */
const STOPS = [
  [300, 724, 'paper'],
  [512, 512, 'paper'],
  [724, 300, 'accent'],
];
const RADIUS = 92;
const LINE = 36;                      // half the stroke width

function glyph(at, x, y) {
  for (const [cx, cy, kind] of STOPS) {
    if (Math.hypot(x - at(cx), y - at(cy)) <= at(RADIUS)) return kind;
  }
  if (segment(x, y, at(300), at(724), at(724), at(300)) <= at(LINE)) return 'paper';
  return null;
}

export { glyph, STOPS, RADIUS };

makeIcons({ publicDir: PUBLIC_DIR, glyph });
