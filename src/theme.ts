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
  exposed: '#E11D48',
  exposedBg: '#FEE2E2',

  // semantic: pass / matches baseline
  masked: '#059669',
  maskedBright: '#10B981',
  maskedBg: '#86EFAC',

  // text
  /** text/glyphs sitting on a filled gradient */
  onBrand: '#FFFFFF',

  text: '#1C2434',
  textDim: '#64748B',
  textFaint: '#94A3B8',
} as const;

/**
 * Per dependency colours, from the reference diagram.
 *
 * DESIGN 0.3 allows one accent, so this is a deliberate, requested exception.
 * The justification that makes it defensible: these read as third party service
 * identities rather than as Keploy accents, the same way a logo does, and
 * colour coding the connector to its card is what makes three simultaneous
 * call paths legible at a glance. If it ever needs to come back inside the
 * rule, set every `line` and `tint` below to colors.orange and the layout
 * still works.
 */
export const deps = {
  postgres: {line: '#C2740A', tint: 'rgba(194,116,10,0.12)', text: '#8A5208'},
  redis: {line: '#2563EB', tint: 'rgba(37,99,235,0.10)', text: '#1D4ED8'},
  mail: {line: '#7C3AED', tint: 'rgba(124,58,237,0.10)', text: '#6D28D9'},
} as const;

export const radius = {sm: 10, md: 16, lg: 24, pill: 999} as const;

export const shadow = {
  soft: '0 3px 14px rgba(28,36,52,0.055)',
  card: '0 22px 60px rgba(28,36,52,0.10), 0 3px 10px rgba(28,36,52,0.05)',
  orange: '0 16px 44px rgba(247,107,28,0.26)',
  red: '0 16px 44px rgba(225,29,72,0.20)',
  lift: '0 10px 28px rgba(28,36,52,0.08)',
} as const;

/** Lit top edge, applied to cards. */
export const highlight = 'inset 0 1px 0 rgba(255,255,255,0.9)';

/**
 * Gradients.
 *
 * These started as the logo ramp (#FAD961 to #F76B1C) so that accent surfaces
 * matched the mark. That was wrong for anything carrying text: white on
 * #FAD961 measures 1.39:1. Two rounds of review later, every ramp below is
 * held to 4.5:1 at BOTH stops, not just the 3:1 large-text floor, because
 * these chips are small on a phone and the light stop was what kept reading as
 * washed out.
 *
 * `logo` keeps the original ramp. It is correct for the mark, which is an
 * image, and wrong for everything else.
 *
 * scripts-lint-contrast.mjs enforces all of this.
 */
export const grad = {
  /** fills that carry white text. Both stops clear WCAG AA large text. */
  brand: 'linear-gradient(135deg, #C44A0A 0%, #9A3208 100%)',
  /** gradient TEXT on the white page. Dark enough to read at display sizes. */
  brandText: 'linear-gradient(135deg, #C44A0A 0%, #96300A 100%)',
  /** the logo ramp. Correct for the mark itself, never for text or fills. */
  logo: 'linear-gradient(135deg, #FAD961 0%, #F76B1C 100%)',
  brandSoft: 'linear-gradient(135deg, rgba(247,107,28,0.14) 0%, rgba(232,89,14,0.12) 100%)',
  pass: 'linear-gradient(135deg, #0A7E56 0%, #036049 100%)',
  passSoft: 'linear-gradient(135deg, rgba(52,211,153,0.18) 0%, rgba(5,150,105,0.13) 100%)',
  fail: 'linear-gradient(135deg, #DC2F50 0%, #A81834 100%)',
  failSoft: 'linear-gradient(135deg, rgba(251,113,133,0.18) 0%, rgba(220,38,38,0.13) 100%)',
  neutral: 'linear-gradient(135deg, #F8FAFC 0%, #EEF2F7 100%)',
  skeleton: 'linear-gradient(90deg, #EDF1F6 0%, #E2E8F0 50%, #EDF1F6 100%)',
} as const;

export const gradient = {
  orange: grad.brand,
} as const;

/**
 * Canvas + safe zones.
 *
 * DESIGN §0.6 says y~1790, but that only clears Instagram's very bottom bar.
 * In practice Reels/LinkedIn paint the profile row, caption, and the like/
 * comment/share rail over roughly the bottom third of the frame. So the real
 * content floor is ~1340 and the bottom ~580px is left deliberately empty.
 * Everything sits in the upper-middle, which is also where the eye lands.
 */
export const canvas = {
  width: 1080,
  height: 1920,
  fps: 30,
  safeTop: 190,
  /** Hard floor. Nothing legible may cross this. */
  safeBottom: 1340,
  /** Caption band sits just above the floor. */
  captionTop: 1210,
  /** Stage centres content between safeTop and this. */
  stageBottom: 1180,
  gutter: 72,
} as const;

/** DESIGN §2: min on-screen text ~30px, code ~27px nowrap. */
export const type = {
  minBody: 30,
  code: 27,
} as const;
