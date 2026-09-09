/**
 * Personas, ninth pass: "Everyone Else v9" (53.1s).
 *
 * v8 with an opening beat added in front, and the hook animation stretched to
 * actually use its scene.
 *
 * INTRO DURATION IS PROVISIONAL. 150 frames is an estimate for the new spoken
 * line, not a measurement. The recording that contains it is not on disk yet:
 * audio/regressions-0.mp3 turned out to be an earlier, faster read of the same
 * ten lines (41.57s, same 13 segment structure as regressions-1.mp3), and
 * audio/regressions-0.mp4 is a byte identical copy of the finished video.
 *
 * When the real recording lands, regenerate with eleven lines and this file
 * gets replaced wholesale:
 *
 *   node scripts-audio-timeline.mjs audio/<file> --lines 11 \
 *     --script audio/<script>.txt \
 *     --names intro,hook,blast,aiUsers,question,keployUsers,record,generate,replay,verify,payoff \
 *     --out src/videos/ai-regressions/timelineFromAudio11.ts
 *
 * Everything from `hook` down is measured, carried over from
 * audio/regressions-1.mp3 unchanged.
 */
export const PV9 = {
  intro: 150,        // 5.0s  PROVISIONAL, not measured
  hook: 191,         // 6.37s measured
  blast: 177,        // 5.90s measured
  aiUsers: 194,      // 6.47s measured
  question: 72,      // 2.40s measured
  keployUsers: 159,  // 5.30s measured
  record: 153,       // 5.10s measured
  generate: 179,     // 5.97s measured
  replay: 93,        // 3.10s measured
  verify: 141,       // 4.70s measured
  payoff: 84,        // 2.80s measured
} as const;

export const TOTAL_V9 = Object.values(PV9).reduce((a, b) => a + b, 0); // 1593 = 53.10s
