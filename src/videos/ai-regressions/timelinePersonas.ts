/**
 * Personas variant: "Everyone Else" (40s).
 *
 * The argument is carried by one asset used twice at different densities.
 * AI sits at the centre of five people, because five is what you can infer
 * from a file. Keploy sits at the centre of thirty six, because it watched
 * real traffic. Same component, same spokes, same glyphs. Only the count
 * changes, and the count is the point.
 *
 *   AI side    345 frames  11.5s   29%   (hook + blast + ai personas)
 *   bridge      90 frames   3.0s    7%
 *   Keploy     705 frames  23.5s   59%
 *   payoff      60 frames   2.0s    5%
 */
export const PS = {
  hook: 75,          // 2.5s  AI shipped it
  blast: 120,        // 4.0s  one change broke three others
  aiUsers: 150,      // 5.0s  AI at the centre of five imagined users
  question: 90,      // 3.0s  so how do you stop that?
  keployUsers: 210,  // 7.0s  Keploy at the centre of thirty six. The hero shot.
  record: 120,       // 4.0s  how it knows: real traffic
  generate: 135,     // 4.5s  normal cases and edge cases
  replay: 105,       // 3.5s  replayed against mocks
  verdict: 135,      // 4.5s  the regression, caught
  payoff: 60,        // 2.0s
} as const;

export const TOTAL_PERSONAS = Object.values(PS).reduce((a, b) => a + b, 0); // 1200 = 40.0s
