/**
 * Personas, fifth pass: "Everyone Else v5" (48s).
 *
 * Three notes, all on the record and replay beats.
 *
 *   one card    The request card and the app card said the same thing twice.
 *               The route folds into the app card now, which drops a whole tier
 *               and frees the vertical room the replay beat needed.
 *
 *   contrast    Second time this was raised, so it is no longer a judgement
 *               call. Every gradient that carries text is held to 4.5:1 at
 *               BOTH stops, not the 3:1 large-text floor, and the per
 *               dependency connectors clear 3:1 as graphical elements.
 *               scripts-lint-contrast.mjs fails the build otherwise.
 *
 *   verify      "REPLAYING EVERY ONE" was a label with nothing behind it. The
 *               replayed cases are now visible underneath the diagram: rows
 *               land pending, then resolve to pass or fail, on top of a deeper
 *               pile of ghost rows. You watch the run happen.
 *
 * Replay went 5.0s to 6.5s to give the run time to resolve. Record dropped to
 * 5.5s because the diagram lost a tier and reveals faster.
 */
export const PY = {
  hook: 135,         // 4.5s
  blast: 165,        // 5.5s
  aiUsers: 135,      // 4.5s
  question: 90,      // 3.0s
  keployUsers: 180,  // 6.0s
  record: 165,       // 5.5s  one card, then Keploy lands on the path
  generate: 180,     // 6.0s
  replay: 195,       // 6.5s  diagram plus the run resolving beneath it
  verdict: 135,      // 4.5s
  payoff: 60,        // 2.0s
} as const;

export const TOTAL_PERSONAS_V5 = Object.values(PY).reduce((a, b) => a + b, 0); // 1440 = 48.0s
