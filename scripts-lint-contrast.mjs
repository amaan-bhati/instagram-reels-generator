/**
 * WCAG contrast gate for the colour pairs the reels actually put on screen.
 *
 * Added after a viewer reported that the gradient headline and the filled
 * brand chips were washing out against the white background. They were right,
 * and it was measurable: the brand ramp started at #FAD961, which carries
 * white text at 1.39:1. This script makes that class of bug impossible to
 * reintroduce silently.
 *
 * Thresholds are WCAG 2.1 AA:
 *   4.5:1 normal text
 *   3.0:1 large text (>=24px bold, which every headline and chip here is)
 */
const lin = (c) => {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};
const lum = (hex) => {
  const h = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

const WHITE = '#FFFFFF';
const BG = '#FFFFFF';

/** Read the live values out of theme.ts so this cannot drift from the source. */
import {readFileSync} from 'fs';
const theme = readFileSync('src/theme.ts', 'utf8');
const grab = (name) => {
  const m = theme.match(new RegExp(`${name}:\\s*'([^']+)'`));
  if (!m) throw new Error(`token ${name} not found in theme.ts`);
  return m[1];
};
const stops = (name) => {
  const m = theme.match(new RegExp(`${name}:\\s*'linear-gradient\\(([^']+)\\)'`));
  if (!m) throw new Error(`gradient ${name} not found in theme.ts`);
  return [...m[1].matchAll(/#[0-9A-Fa-f]{6}/g)].map((x) => x[0]);
};

const checks = [];

// Gradient fills that carry white text. Held to 4.5 rather than the 3.0
// large-text floor: these chips are small on a phone, and the light stop was
// the thing that still read as washed out at 3.5.
for (const g of ['brand', 'pass', 'fail']) {
  for (const [i, stop] of stops(g).entries()) {
    checks.push({what: `white text on grad.${g} stop ${i} (${stop})`, r: ratio(WHITE, stop), min: 4.5});
  }
}
// gradient TEXT sitting on the page background, same reasoning
for (const [i, stop] of stops('brandText').entries()) {
  checks.push({what: `grad.brandText stop ${i} (${stop}) on bg`, r: ratio(stop, BG), min: 4.5});
}
// Per dependency connector colours. These are graphical elements carrying
// meaning (which card a call goes to), so WCAG 1.4.11's 3:1 applies.
for (const dep of ['postgres', 'redis', 'mail']) {
  const m = theme.match(new RegExp(`${dep}: \\{line: '([^']+)'.*?text: '([^']+)'`));
  if (!m) throw new Error(`dep ${dep} not found`);
  checks.push({what: `deps.${dep}.line (${m[1]}) on bg`, r: ratio(m[1], BG), min: 3.0});
  checks.push({what: `deps.${dep}.text (${m[2]}) on bg`, r: ratio(m[2], BG), min: 4.5});
}
// solid text tokens on the page background
for (const [t, min] of [['text', 4.5], ['textDim', 4.5], ['orangeDeep', 3.0], ['exposed', 3.0], ['masked', 3.0]]) {
  checks.push({what: `colors.${t} (${grab(t)}) on bg`, r: ratio(grab(t), BG), min});
}

let bad = 0;
for (const c of checks) {
  const ok = c.r >= c.min;
  if (!ok) bad++;
  console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${c.r.toFixed(2).padStart(5)}:1  (min ${c.min})  ${c.what}`);
}
if (bad) {
  console.error(`\n${bad} contrast failure(s).`);
  process.exit(1);
}
console.log('OK: every on-screen colour pair clears WCAG AA');
