/**
 * Personas, sixth pass: "Everyone Else v6" (51.5s).
 *
 * Pacing, copy, and one structural cut.
 *
 *   slower       The opening three beats were unreadable at speed. Hook 4.5 to
 *                5.5s, blast 5.5 to 6.5s, question 3.0 to 3.5s. The Keploy
 *                personas beat also slowed, 6.0 to 7.0s. The AI personas beat
 *                was called out as already fine and is unchanged.
 *
 *   no numbers   "36 scenarios" became "scenarios and edge cases, learned from
 *                your app". The count was never sourced, and the graph already
 *                shows density better than a figure does.
 *
 *   verify beat  Replay split in two. The diagram gets its own beat, and the
 *                verification gets a beat of its own with eleven rows instead
 *                of five, four of them failing. Cramming both into one scene
 *                could not fit eleven rows above the platform UI floor.
 *
 *   verdict cut  The Buggy panel and confidence score are gone. The reel now
 *                ends on the verification run, which is the same information
 *                shown rather than reported, and it saves 4.5s.
 */
export const PZ = {
  hook: 165,         // 5.5s  was 4.5s
  blast: 195,        // 6.5s  was 5.5s
  aiUsers: 135,      // 4.5s  unchanged, called out as fine
  question: 105,     // 3.5s  was 3.0s
  keployUsers: 210,  // 7.0s  was 6.0s
  record: 165,       // 5.5s
  generate: 165,     // 5.5s
  replay: 150,       // 5.0s  diagram only now
  verify: 195,       // 6.5s  eleven rows resolving. This is the closer.
  payoff: 60,        // 2.0s
} as const;

export const TOTAL_PERSONAS_V6 = Object.values(PZ).reduce((a, b) => a + b, 0); // 1545 = 51.5s
