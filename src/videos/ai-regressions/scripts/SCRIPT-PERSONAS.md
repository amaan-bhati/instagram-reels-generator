# Script: "Everyone Else"  ·  personas variant (40s)

**Length** 40.0s (1200 frames @ 30fps) · **Format** 9:16, 1080x1920 · **Audio** none
**Composition** `Personas40` · **Render** `npm run render:personas`
**Example** PetClinic, same as every other cut.

## The idea

The coverage argument stops being a list and becomes a picture. One hub and spoke graph,
used twice at different densities:

| | Hub | Spokes | Nodes |
|---|---|---|---|
| Scene 3 | grey `AI` | grey, dashed, quiet | **5** |
| Scene 5 | Keploy mark, glowing | brand orange | **36** |

Same component, same glyphs, same spoke geometry. Only the count changes, and the count *is*
the argument. Nothing has to say "more coverage": in scene 3 the frame is mostly empty, and
in scene 5 it fills.

Five is not an arbitrary number. It is roughly what you can infer from a single file, which is
all AI was given. Thirty six is what turns up when something has actually watched the traffic.

## Structure

| | Frames | Time | Share |
|---|---|---|---|
| **AI side** (hook + blast + ai personas) | **345** | **11.5s** | 29% |
| Bridge (question) | 90 | 3.0s | 7% |
| Keploy | 705 | 23.5s | 59% |
| Payoff | 60 | 2.0s | 5% |

AI side comes in at 11.5s, inside the ten to twelve second budget.

## Beat sheet

| # | Scene | In | Dur | On screen | Caption |
|---|---|---|---|---|---|
| 1 | Hook | 0:00 | 2.5s | `build` ticks, `12 tests passed` fills 12 dots, `deployed` lands on `production` | *Everything looked fine.* |
| 2 | Blast | 0:02 | 4.0s | Shockwave out of `/api/visits`; `/api/owners`, `/api/pettypes`, `/api/pets` flip BROKEN | *Regressions shipped. Your users found them first.* |
| 3 | **AI personas** | 0:06 | 5.0s | "It wrote tests for the users it could imagine." Grey `AI` hub, five people on grey spokes, dots travelling out one at a time. Chip `5 scenarios, guessed from the code` | *Only the ones the code implied.* |
| 4 | Question | 0:11 | 3.0s | "So how do you stop that?" then in gradient "Something has to think of the edge cases." Nothing else in frame | *Before your users do.* |
| 5 | **Keploy personas** | 0:14 | 7.0s | "That is exactly what Keploy does." The Keploy mark glows at the centre and thirty six people bloom outward on orange spokes over about two and a half seconds. Chip `36 scenarios, learned from real traffic` | *Every kind of user. Every path they take.* |
| 6 | Record | 0:21 | 4.0s | "It learns your app from real traffic." Proxy diagram, RECORDING, deps REAL | *Your real traffic becomes the baseline.* |
| 7 | Generate | 0:25 | 4.5s | `NORMAL CASES` and `EDGE CASES` columns of skeleton test cards | *The ones your users will actually hit.* |
| 8 | Replay | 0:30 | 3.5s | REPLAYING · SERVING MOCKS, deps dashed and MOCKED | *Any drift shows up instantly.* |
| 9 | Verdict | 0:33 | 4.5s | `Delete_Visit (7)` FAILED, Buggy + AI Confidence 95% + `404` vs `200` | *Before your users do.* |
| 10 | Payoff | 0:38 | 2.0s | "Ship fast with AI." then gradient "Just don't ship its regressions." + logo | |

## How the graph is built

`src/kit/PersonaGraph.tsx`, driven by `hub` and `count`:

- **Layout** puts nodes on concentric rings with jittered angle and radius, so it reads
  organic instead of like a clock face. Sets of six or fewer get one wide ring with large
  nodes; larger sets get three rings with smaller nodes, which is what keeps thirty six
  legible at reel scale.
- **Jitter is deterministic**, seeded off the node index, so the layout is identical on every
  frame and every re-render. A random layout would jitter frame to frame and look broken.
- **Spokes** are quadratic curves from the hub edge to the node edge, bent by a seeded
  perpendicular offset. A dot travels each curve once and arrives exactly as its node lands.
- **Nodes** are person and bot glyphs, roughly one bot in eight, to read as "all kinds of
  clients" and not only humans.

### One deliberate departure from the reference image

The image you shared has multicoloured pastel avatars. DESIGN §0.3 allows one accent, Keploy
orange, plus green for pass and red for fail. So the node chips here are neutral white and
grey and the spokes carry the orange. It stays on brand, and it makes the orange spokes read
more strongly than they would against a field of colour.

## Closed loop

Scene 2 breaks `/api/pettypes`. Scene 9 catches that exact endpoint's 404.

## Same house rules

- No em dashes or en dashes. Enforced by `npm run check`.
- One example only: PetClinic.
- No raw hex in scenes.
- Nothing legible below y=1340. Check with `Personas40-SafeZone`.
- Never claims Keploy proves correctness.
