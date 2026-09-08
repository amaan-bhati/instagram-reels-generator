/**
 * Bridge variant: "Someone Has To" (40s).
 *
 * Every earlier cut drops Keploy in unannounced: the blast radius happens, then
 * a scene starts with "So Keploy captures everything". The product arrives as an
 * assertion rather than an answer.
 *
 * This cut earns the introduction with three beats between the problem and the
 * product:
 *
 *   gap       name the miss in numbers: 12 tests written, none of them the edge cases
 *   question  ask it plainly, and answer it as a requirement, with no product in frame:
 *             something has to think of the edge cases before your users do
 *   enter     Keploy arrives as that specific answer, not as a topic change
 *
 *   problem    210 frames   7.0s   18%
 *   bridge     360 frames  12.0s   30%
 *   Keploy     570 frames  19.0s   47%
 *   payoff      60 frames   2.0s    5%
 */
export const BR = {
  hook: 75,        // 2.5s  AI shipped it, everything green
  blast: 135,      // 4.5s  one change broke three others
  gap: 120,        // 4.0s  it wrote 12 tests and missed the ones that mattered
  question: 105,   // 3.5s  so how do you stop that? no product in frame yet
  enter: 135,      // 4.5s  that is exactly what Keploy does
  record: 135,     // 4.5s  it learns the app from real traffic
  generate: 165,   // 5.5s  so it writes both kinds
  replay: 120,     // 4.0s  and replays all of them
  verdict: 150,    // 5.0s  the regression, caught
  payoff: 60,      // 2.0s
} as const;

export const TOTAL_BRIDGE = Object.values(BR).reduce((a, b) => a + b, 0); // 1200 = 40.0s
