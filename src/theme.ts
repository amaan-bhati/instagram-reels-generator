/**
 * Keploy video design tokens.
 * Source: brand/DESIGN-tautology-trap.md §1 (token table) + §2 (typography).
 *
 * RULE: never hardcode a hex in a scene. Import `colors as C` and use tokens.
 * `npm run lint:tokens` fails the build if a raw hex appears under src/scenes.
 */

export const colors = {
  // base
  bg: '#FFFFFF',
  bgDeep: '#F4F6F8',
  dot: '#E7EBF0',

  // light editor card
  codeBg: '#FFFFFF',
  codeBar: '#EEF1F5',
  codeStroke: '#E2E8F0',

  // code syntax
  synKey: '#2563EB',
  synStr: '#15803D',
  synPunc: '#64748B',

  // accent (the ONLY accent)
  orange: '#F26A21',
  orangeDeep: '#E8590E',
  amber: '#F9A825',

  // semantic: fail / drift
  exposed: '#DC2626',
  exposedBg: '#FEE2E2',

  // semantic: pass / matches baseline
  masked: '#059669',
  maskedBg: '#86EFAC',

  // text
  text: '#1C2434',
  textDim: '#64748B',
  textFaint: '#94A3B8',
} as const;

export const radius = {sm: 10, md: 16, lg: 24, pill: 999} as const;

export const shadow = {
  soft: '0 2px 10px rgba(28,36,52,0.05)',
  card: '0 18px 50px rgba(28,36,52,0.10), 0 2px 8px rgba(28,36,52,0.05)',
  orange: '0 14px 40px rgba(242,106,33,0.22)',
  red: '0 14px 40px rgba(220,38,38,0.18)',
} as const;

/** Lit top edge, applied to cards. */
export const highlight = 'inset 0 1px 0 rgba(255,255,255,0.9)';

export const gradient = {
  orange: `linear-gradient(135deg, ${colors.orange} 0%, ${colors.orangeDeep} 100%)`,
} as const;

/** Canvas + safe zones. DESIGN §0.6 — critical content above y ~1790. */
export const canvas = {
  width: 1080,
  height: 1920,
  fps: 30,
  safeTop: 220,
  safeBottom: 1790,
  gutter: 72,
} as const;

/** DESIGN §2 — min on-screen text ~30px, code ~27px nowrap. */
export const type = {
  minBody: 30,
  code: 27,
} as const;
