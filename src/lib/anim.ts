import {Easing, interpolate, spring} from 'remotion';

/**
 * The house settled spring. DESIGN §5 — damping 16, mass .9, stiffness 130.
 * Every entrance uses this so the whole reel shares one physical feel.
 */
export const settle = (frame: number, fps: number, delay = 0) =>
  spring({
    frame: frame - delay,
    fps,
    config: {damping: 16, mass: 0.9, stiffness: 130},
  });

/** Standard entrance: fade + rise, driven by the settled spring. */
export const enter = (frame: number, fps: number, delay = 0, rise = 26) => {
  const s = settle(frame, fps, delay);
  return {
    opacity: interpolate(s, [0, 1], [0, 1], {extrapolateRight: 'clamp'}),
    transform: `translateY(${interpolate(s, [0, 1], [rise, 0])}px)`,
  };
};

/** DESIGN §5 — stagger peers 3-4 frames. */
export const stagger = (i: number, step = 4) => i * step;

export type Seg = {at: number; to: number; ease?: (t: number) => number};

/**
 * mseg — multi-segment easing.
 * Drive one value through several keyframes, each with its own easing.
 * Used for camera pans over big screenshots where a single interpolate is too blunt.
 *
 *   mseg(frame, 0, [{at: 30, to: 1}, {at: 90, to: 1}, {at: 120, to: 0}])
 */
export const mseg = (frame: number, from: number, segs: Seg[]): number => {
  let prevAt = 0;
  let prevTo = from;
  for (const s of segs) {
    if (frame <= s.at) {
      return interpolate(frame, [prevAt, s.at], [prevTo, s.to], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: s.ease ?? Easing.inOut(Easing.cubic),
      });
    }
    prevAt = s.at;
    prevTo = s.to;
  }
  return prevTo;
};

/**
 * Camera push-in. DESIGN §0.5 / §5 — 2-4% over the scene, easeInOutCubic.
 * The camera is NEVER fully static.
 */
export const pushIn = (frame: number, duration: number, amount = 0.03) =>
  interpolate(frame, [0, duration], [1, 1 + amount], {
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });

/** Slow drift pan, for scenes that shouldn't zoom. */
export const driftX = (frame: number, duration: number, px = 18) =>
  interpolate(frame, [0, duration], [0, -px], {
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });

/** Breathing loop for REC dots and living elements. DESIGN §5. */
export const breathe = (frame: number, fps: number, period = 1.6) =>
  0.5 + 0.5 * Math.sin((frame / (fps * period)) * Math.PI * 2);

/** Character-by-character typewriter. DESIGN §5. */
export const typeChars = (text: string, frame: number, start: number, cps = 42, fps = 30) => {
  const elapsed = Math.max(0, frame - start);
  const n = Math.floor((elapsed / fps) * cps);
  return text.slice(0, n);
};

export const typeDone = (text: string, start: number, cps = 42, fps = 30) =>
  start + Math.ceil((text.length / cps) * fps);
