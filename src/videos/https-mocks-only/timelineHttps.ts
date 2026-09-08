/**
 * HTTPS troubleshooting variant: "Mocks Only" (41.5s).
 *
 * A different register from every other cut in this repo. The others sell a
 * capability; this one debugs a silent failure, so it is paced to be followed
 * rather than felt: longer beats, one idea each, and a diagnostic the viewer
 * can run themselves.
 *
 * The spine is the asymmetry. Keploy captures two separate streams: calls INTO
 * the app become test cases, the app's calls OUT to Postgres become mocks.
 * Local Postgres traffic is plaintext so egress keeps working; inbound HTTPS is
 * encrypted so ingress cannot be parsed. That is precisely why you get a full
 * mocks.yaml and zero tests, and it makes the diagnosis a single question.
 */
export const HT = {
  symptom: 150,     // 5.0s  keploy/ after recording: mocks.yaml full, tests empty
  confusion: 135,   // 4.5s  same app over HTTP vs HTTPS, side by side
  why: 225,         // 7.5s  the asymmetry: encrypted ingress, plaintext egress
  diagnostic: 195,  // 6.5s  one question splits wiring problem from trust problem
  fix: 255,         // 8.5s  give the app a trust store that includes Keploy's CA
  verify: 195,      // 6.5s  the same tree, now with test cases in it
  payoff: 90,       // 3.0s
} as const;

export const TOTAL_HTTPS = Object.values(HT).reduce((a, b) => a + b, 0); // 1245 = 41.5s
