/**
 * Personas, third pass: "Everyone Else v3" (47s).
 *
 * Four notes from review, all about the words rather than the pictures. The
 * visuals from v2 were working; what they were not doing was explaining
 * themselves, and an animation that needs a caption to make sense is an
 * animation with a missing line of copy.
 *
 *   blast        "changed one thing and broke three others" was a fact, not an
 *                explanation. It now names the blast radius, says the AI's own
 *                tests still passed, and says who found the regressions first.
 *   aiUsers      widened from "the users it could imagine" to the users AND
 *                the cases, and the caption now points at the code AI wrote
 *                rather than at "the code" in the abstract.
 *   keployUsers  the graph was carrying the whole idea alone. A line under the
 *                heading now says what the picture is of.
 *   generate     normal and edge were two side by side columns, which read as
 *                two lists. They are one list, so it is one column now: normal
 *                first, edge directly underneath, full width.
 */
export const PW = {
  hook: 135,         // 4.5s
  blast: 180,        // 6.0s  more copy to read
  aiUsers: 150,      // 5.0s  longer heading
  question: 90,      // 3.0s
  keployUsers: 210,  // 7.0s  gained an explanatory line
  record: 120,       // 4.0s
  generate: 210,     // 7.0s  single column, normal then edge beneath
  replay: 120,       // 4.0s
  verdict: 135,      // 4.5s
  payoff: 60,        // 2.0s
} as const;

export const TOTAL_PERSONAS_V3 = Object.values(PW).reduce((a, b) => a + b, 0); // 1410 = 47.0s
