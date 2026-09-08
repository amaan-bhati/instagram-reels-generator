/**
 * Coverage variant: "Both Kinds" (40s).
 *
 * The problem is stated in two beats and 7.5s, well inside the fifteen second
 * budget. Everything else goes to Keploy, and the new centrepiece is the
 * coverage contrast: AI can only cover what the code was built to do, Keploy
 * covers what users actually do, which means normal cases AND edge cases.
 *
 *   problem  225 frames   7.5s   19%
 *   Keploy   900 frames  30.0s   75%
 *   payoff    75 frames   2.5s    6%
 */
export const CV = {
  hook: 75,        // 2.5s  AI shipped it, everything green
  blast: 150,      // 5.0s  one change broke three others
  coverage: 225,   // 7.5s  what AI covers vs what Keploy covers
  record: 165,     // 5.5s  Keploy captures the real traffic
  generate: 195,   // 6.5s  normal cases AND edge cases, side by side
  replay: 150,     // 5.0s  replays all of them against mocks
  verdict: 165,    // 5.5s  the regression, caught
  payoff: 75,      // 2.5s
} as const;

export const TOTAL_COVERAGE = Object.values(CV).reduce((a, b) => a + b, 0); // 1200 = 40.0s
