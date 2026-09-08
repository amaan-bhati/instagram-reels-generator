/**
 * Personas, seventh pass: "Everyone Else v7" (52s).
 *
 * A copy pass. Two things:
 *
 *   naming   Every beat in the Keploy half now names Keploy as the subject
 *            instead of saying "it". A viewer reading one frame in isolation,
 *            which is how a scrolling feed works, could not tell what "it" was.
 *
 *   closing  The reel used to end on a slogan. It now ends on the outcome:
 *            you know where the app breaks, and you fix it before users find
 *            it. Payoff grew 2.0s to 3.0s to carry the extra line, paid for by
 *            trimming replay 5.0s to 4.5s.
 *
 * Structure is otherwise v6 exactly.
 */
export const QA = {
  hook: 165,         // 5.5s
  blast: 195,        // 6.5s
  aiUsers: 135,      // 4.5s
  question: 105,     // 3.5s
  keployUsers: 210,  // 7.0s
  record: 165,       // 5.5s
  generate: 165,     // 5.5s
  replay: 135,       // 4.5s  was 5.0s
  verify: 195,       // 6.5s
  payoff: 90,        // 3.0s  was 2.0s, now carries the outcome
} as const;

export const TOTAL_PERSONAS_V7 = Object.values(QA).reduce((a, b) => a + b, 0); // 1560 = 52.0s
