# Script: "Both Kinds"  ·  coverage variant (40s)

**Length** 40.0s (1200 frames @ 30fps) · **Format** 9:16, 1080x1920 · **Audio** none
**Composition** `Coverage40` · **Render** `npm run render:coverage`
**Example** PetClinic, same as every other cut.

## The shift in this variant

Every earlier cut argues that Keploy **catches drift**. This one argues that Keploy
**covers what AI cannot reach**, which is a stronger and more specific claim:

> AI can only reason about the code it was handed, so it covers the happy path and the code
> it just wrote. Keploy learned the app from real traffic, so it covers that same list plus
> invalid input, what users actually send, and every other endpoint.
> Normal cases and edge cases, both.

The regression story is still there, but it is setup now rather than the subject. It runs
7.5s, comfortably inside the fifteen second budget.

|  | Frames | Time | Share |
|---|---|---|---|
| Problem (hook + blast) | 225 | 7.5s | **19%** |
| Keploy | 900 | 30.0s | **75%** |
| Payoff | 75 | 2.5s | 6% |

Highest Keploy share of any cut so far.

## Beat sheet

| # | Scene | In | Dur | On screen | Caption |
|---|---|---|---|---|---|
| 1 | Hook | 0:00 | 2.5s | `build` ticks, `12 tests passed` fills 12 dots, `deployed` lands on `production` | *Everything looked fine.* |
| 2 | Blast | 0:02 | 5.0s | Shockwave out of `/api/visits`; `/api/owners`, `/api/pettypes`, `/api/pets` flip BROKEN | *Regressions shipped. Your users found them first.* |
| 3 | **Coverage** | 0:07 | 7.5s | Two panels over **one shared list**. `AI COVERS` ticks 2 of 5 and leaves three open circles. `KEPLOY COVERS` (gradient header) ticks all 5. Chip `normal cases and edge cases` | *Your app was built for one. Your users live in the other.* |
| 4 | Record | 0:15 | 5.5s | PetClinic API to Keploy proxy (RECORDING) to PostgreSQL / Redis / Mail API, all REAL | *Your real traffic becomes the baseline.* |
| 5 | **Generate** | 0:20 | 6.5s | `Keploy GENERATING`, then two labelled columns: `NORMAL CASES` (POST, GET, PUT) and `EDGE CASES` (DELETE, GET, PATCH, gradient header). Chip `AI wrote none of the right column` | *The ones your users will actually hit.* |
| 6 | Replay | 0:27 | 5.0s | REPLAYING · SERVING MOCKS, deps dashed and MOCKED, dots flowing up | *Any drift shows up instantly.* |
| 7 | Verdict | 0:32 | 5.5s | `Delete_Visit (7)` FAILED, `Vet_CRUD_Lifecycle (7)` PASSED, Buggy + AI Confidence 95% + `404` vs `200` + fix chip | *Before your users do.* |
| 8 | Payoff | 0:37 | 2.5s | "Ship fast with AI." then gradient "Just don't ship its regressions." + Keploy logo | |

## Why scene 3 uses one shared list

Two different lists side by side would read as two opinions. The **same five items** in both
columns turns it into a like-for-like count: two ticks against five. The viewer does the
subtraction themselves, which is more convincing than any sentence about coverage.

Per DESIGN §6 the covered state is never colour alone: a filled green tick with a glyph and
bold text for covered, an empty grey ring with dimmed text for not covered.

## Why scene 5 splits into columns

Earlier cuts showed six generated cases in a 2x3 grid, which says "lots of cases" but not
"both kinds". Labelling the columns `NORMAL CASES` and `EDGE CASES`, and flagging the right
one as the part AI wrote none of, makes the coverage claim from scene 3 concrete: you watch
the half AI skipped get written.

## Closed loop

Scene 2 breaks `/api/pettypes`. Scene 7 catches that exact endpoint's 404.

## Same house rules

- No em dashes or en dashes. Enforced by `npm run check`.
- One example only: PetClinic.
- No raw hex in scenes. The white used on gradient fills is the `onBrand` token, added for
  this variant after the lint caught it inline.
- Nothing legible below y=1340. Check with `Coverage40-SafeZone`.
- Never claims Keploy proves correctness, only that it covers and replays real behaviour.
