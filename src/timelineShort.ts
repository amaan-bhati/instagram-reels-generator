/**
 * Short variant: "Regressions" (40s).
 *
 * v4 spends about half its minute establishing what a regression is and what a
 * blast radius means. That concept is worth roughly ten seconds, not thirty.
 * Here the problem is stated fast and Keploy gets the airtime:
 *
 *   problem  315 frames  10.5s   26%
 *   Keploy   795 frames  26.5s   66%
 *   payoff    90 frames   3.0s    8%
 */
export const S = {
  hook: 105,      // 3.5s  AI shipped it, everything green
  blast: 210,     // 7.0s  the fix broke three endpoints nobody watched
  record: 210,    // 7.0s  Keploy captures the real traffic
  generate: 195,  // 6.5s  it writes the cases AI never got to
  replay: 180,    // 6.0s  replays everything against the mocks
  verdict: 210,   // 7.0s  what broke, why, how sure
  payoff: 90,     // 3.0s
} as const;

export const TOTAL_SHORT = Object.values(S).reduce((a, b) => a + b, 0); // 1200 = 40.0s
