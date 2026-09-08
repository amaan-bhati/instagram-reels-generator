/**
 * HTTPS troubleshooting, second pass: "Mocks Only v2" (44s).
 *
 * v1 (MocksOnly42) covered four pillars but gave two of them one beat each.
 * This pass keeps the same spine and spends the extra time where the brief
 * actually asked for depth:
 *
 *   diagnostic  v1 asked one question. Now an ordered four step checklist,
 *               with the row that produces THIS symptom marked "you are here",
 *               so everything above it reads as already eliminated.
 *   ca setup    v1 showed one shell line. Now the same fix in all three
 *               environments the brief named: local machine, Docker, and the
 *               Go runtime itself.
 *
 * Everything else is unchanged from v1, including the ingress/egress asymmetry
 * that makes the symptom explicable in the first place.
 */
export const H2 = {
  symptom: 135,     // 4.5s  mocks.yaml full, tests empty
  confusion: 120,   // 4.0s  HTTP vs HTTPS, same command
  why: 210,         // 7.0s  encrypted ingress, plaintext egress
  checklist: 300,   // 10.0s four ordered checks, one marked "you are here"
  cert: 315,        // 10.5s the CA, in local + Docker + Go runtime
  verify: 150,      // 5.0s  the tree fills in
  payoff: 90,       // 3.0s
} as const;

export const TOTAL_HTTPS2 = Object.values(H2).reduce((a, b) => a + b, 0); // 1320 = 44.0s
