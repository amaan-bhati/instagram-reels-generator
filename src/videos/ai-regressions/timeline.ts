/** Scene durations in frames @30fps. Single source of truth for the cut. */
export const D = {
  s1Hook: 165,       // 5.5s  build, tests, deploy: all shown completing
  s2Ship: 105,       // 3.5s  AI writes the feature + its own test
  s3Blind: 150,      // 5.0s  happy path only, the rest ships
  s4Fix: 165,        // 5.5s  ask it to cover them: slow, still incomplete
  s5Blast: 195,      // 6.5s  the fix breaks endpoints nobody watched
  s6Users: 135,      // 4.5s  AI cannot imagine what users send
  s7Record: 195,     // 6.5s  Keploy captures everything, tracks what can break
  s8Generate: 195,   // 6.5s  it writes the cases AI never got to
  s9Replay: 165,     // 5.5s  replays everything again, mocked deps
  s10Verdict: 225,   // 7.5s  failing suites + Buggy + confidence + assertion
  s11Payoff: 105,    // 3.5s
} as const;

export const TOTAL = Object.values(D).reduce((a, b) => a + b, 0); // 1800 = 60.0s
