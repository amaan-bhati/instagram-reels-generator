/**
 * Tight variant: "Regressions" (30s).
 *
 * Same seven beats as the 40s cut, same weighting, every beat re-timed to its
 * floor. The floor is the settled hold: DESIGN §0.5 wants roughly 0.8s (24
 * frames) of stillness at the end of each scene, so the last element in a
 * scene has to finish settling 24 frames before the cut. Every duration here
 * is set by that constraint, not by taste.
 *
 *   problem  225 frames   7.5s   25%
 *   Keploy   600 frames  20.0s   67%
 *   payoff    75 frames   2.5s    8%
 */
export const T = {
  hook: 75,       // 2.5s
  blast: 150,     // 5.0s
  record: 165,    // 5.5s
  generate: 150,  // 5.0s
  replay: 135,    // 4.5s
  verdict: 150,   // 5.0s
  payoff: 75,     // 2.5s
} as const;

export const TOTAL_TIGHT = Object.values(T).reduce((a, b) => a + b, 0); // 900 = 30.0s
