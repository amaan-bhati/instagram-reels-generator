/**
 * Personas, fourth pass: "Everyone Else v4" (49s).
 *
 * Two changes, both on the record and replay beats, both from a supplied
 * reference diagram.
 *
 *   sequence  The old diagram opened with Keploy already in the middle and
 *             three lines fanning out below it, which read as Keploy turning
 *             into Postgres. Record now opens on the app calling its own
 *             dependencies, with no Keploy anywhere, and Keploy lands on that
 *             path about two seconds in. You watch it interpose, so there is
 *             nothing left to misread.
 *
 *   actor     In replay Keploy is the one driving. The dependency cards go
 *             dashed and read `mocked`, the traffic dots run upward from the
 *             mocks back to Keploy, and the app is labelled `under test`.
 *             Recording is something done TO the app; replay is something
 *             Keploy does.
 *
 * Record went 4.0s to 6.0s because it now has two phases to show, and replay
 * 4.0s to 5.0s. Everything else is v3 unchanged.
 */
export const PX = {
  hook: 135,         // 4.5s
  blast: 180,        // 6.0s
  aiUsers: 150,      // 5.0s
  question: 90,      // 3.0s
  keployUsers: 195,  // 6.5s
  record: 180,       // 6.0s  direct calls first, then Keploy lands
  generate: 195,     // 6.5s
  replay: 150,       // 5.0s  Keploy drives, mocks answer upward
  verdict: 135,      // 4.5s
  payoff: 60,        // 2.0s
} as const;

export const TOTAL_PERSONAS_V4 = Object.values(PX).reduce((a, b) => a + b, 0); // 1470 = 49.0s
