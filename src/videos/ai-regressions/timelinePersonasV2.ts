/**
 * Personas, second pass: "Everyone Else v2" (44s).
 *
 * Six changes, all from viewer feedback on the 40s cut:
 *
 *   1. slower opening      the first two beats went by faster than anyone could
 *                          read. Hook 2.5s -> 4.5s, blast 4.0s -> 5.5s.
 *   2. contrast            the gradient headline and filled chips washed out
 *                          against white. Measured 1.39:1. Fixed in theme.ts
 *                          and now gated by scripts-lint-contrast.mjs.
 *   3. skeleton labels     the blast map's endpoint paths pulled the eye away
 *                          from the headline, so they are shimmer bars now.
 *                          The status and the count carry the meaning.
 *   4. edge cases weighted the two generate columns held equal weight. Normal
 *                          is now two muted cards; edge is four with depth
 *                          stacked behind, so it reads as the bigger pile that
 *                          is also the one that gets skipped.
 *   5. proxy diagram       the drops to Postgres read as the proxy dividing
 *                          into it. Arrowheads plus a labelled tier rule fix
 *                          the record beat and the replay beat together, since
 *                          both are the same component.
 */
export const PV = {
  hook: 135,         // 4.5s  was 2.5s. Slow enough to actually read.
  blast: 165,        // 5.5s  was 4.0s
  aiUsers: 135,      // 4.5s
  question: 90,      // 3.0s
  keployUsers: 180,  // 6.0s
  record: 120,       // 4.0s
  generate: 180,     // 6.0s  room for the stacked edge pile
  replay: 120,       // 4.0s
  verdict: 135,      // 4.5s
  payoff: 60,        // 2.0s
} as const;

export const TOTAL_PERSONAS_V2 = Object.values(PV).reduce((a, b) => a + b, 0); // 1320 = 44.0s
