/** Scene durations in frames @30fps. Single source of truth for the cut. */
export const D = {
  s1Hook: 120,      // 4.0s
  s2Ship: 150,      // 5.0s
  s3Blind: 210,     // 7.0s
  s4Break: 180,     // 6.0s
  s5Record: 180,    // 6.0s
  s6Replay: 195,    // 6.5s
  s7Payoff: 105,    // 3.5s
} as const;

export const TOTAL = Object.values(D).reduce((a, b) => a + b, 0); // 1140 = 38.0s
