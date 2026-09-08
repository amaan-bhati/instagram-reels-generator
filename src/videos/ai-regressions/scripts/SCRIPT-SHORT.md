# Script: "Regressions"  ·  short variant

**Length** 40.0s (1200 frames @ 30fps) · **Format** 9:16, 1080x1920 · **Audio** none
**Example** PetClinic, same as the 60s cut.
**Composition** `Regressions40` · **Render** `npm run render:short`

## Why this variant exists

The 60s cut spends about half its length teaching the concept: AI writes its own tests,
the tests only cover the happy path, you ask it to fill the gaps, the gaps get filled,
the fix breaks other things. That is a good explanation of regression testing and blast
radius, but it is roughly a ten second idea wearing a thirty second coat.

This variant states the problem in two beats and gives the remaining two thirds to Keploy.

| | 60s cut | 40s cut |
|---|---|---|
| Problem setup | 31.0s (52%) | **10.5s (26%)** |
| Keploy | 26.5s (44%) | **26.5s (66%)** |
| Payoff | 3.5s | 3.0s |

Same Keploy airtime in two thirds of the runtime. Nothing about the product was cut.

## Beat sheet

| # | Scene | In | Dur | On screen | Caption |
|---|---|---|---|---|---|
| 1 | Hook | 0:00 | 3.5s | Three pipeline steps complete on camera: `build` fills to a tick, `12 tests passed` fills 12 green dots, `deployed` lands on a gradient `production` chip | *Everything looked fine.* |
| 2 | **Blast** | 0:03 | 7.0s | "Then it changed one thing, and broke three others." Shockwave out of `/api/visits`; `/api/owners`, `/api/pettypes`, `/api/pets` flip BROKEN. Chips `1 endpoint changed` · `3 broken elsewhere` · `AI never checked them` | *Regressions shipped. Your users found them first.* |
| 3 | Record | 0:10 | 7.0s | "So Keploy captures everything." PetClinic API to Keploy proxy (logo, RECORDING) to PostgreSQL / Redis / Mail API, all REAL | *Your real traffic becomes the baseline.* |
| 4 | Generate | 0:17 | 6.5s | "Then it writes the cases AI never got to." `Keploy GENERATING` pill, six skeleton cards with gradient method badges | *The cases nobody ever wrote.* |
| 5 | Replay | 0:24 | 6.0s | "Then replays every one of them." Same diagram, REPLAYING · SERVING MOCKS, deps dashed and MOCKED, dots flowing up. Chip `every endpoint, not just the new one` | *Any drift shows up instantly.* |
| 6 | Verdict | 0:30 | 7.0s | "And catches the regression you missed." `Delete_Visit (7)` FAILED, `Vet_CRUD_Lifecycle (7)` PASSED, then Buggy + AI Confidence 95% + `404` vs `200` + chip `fix it yourself, or hand it to your AI` | *Before your users do.* |
| 7 | Payoff | 0:37 | 3.0s | "Ship fast with AI." then gradient "Just don't ship its regressions." plus Keploy logo | |

## What was cut from the 60s version

- The scene where AI types out `visit.controller.js` and its own test
- The scene listing four unwritten edge cases
- The scene where you ask it to cover them and it slowly does
- The AI-inputs vs user-inputs comparison panel

All four were teaching the concept. The shockwave in scene 2 makes the same argument in one
image, so they are gone rather than shortened.

## What stayed identical

Every Keploy beat: record, generate, replay, verdict. Same components, same claims, same
confidence score, only re-timed to fit shorter sequences.

## Closed loop

Scene 2 breaks `/api/pettypes`. Scene 6 catches that exact endpoint's 404. The cut answers
its own opening.

## Same house rules

- No em dashes or en dashes. Enforced by `node scripts-lint-tokens.mjs`.
- One example only: PetClinic.
- Nothing legible below y=1340. Check with `Regressions40-SafeZone`.
- Never claims Keploy proves correctness, only that it detects drift from a recorded baseline.
