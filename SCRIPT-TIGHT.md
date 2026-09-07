# Script: "Regressions"  ·  tight variant (30s)

**Length** 30.0s (900 frames @ 30fps) · **Format** 9:16, 1080x1920 · **Audio** none
**Composition** `Regressions30` · **Render** `npm run render:tight`
**Example** PetClinic, same as every other cut.

## What changed from the 40s cut

Nothing was dropped. Same seven beats, same 25/67/8 weighting, every hold pulled to its floor.

The floor is a real constraint, not a preference. DESIGN §0.5 asks for roughly a 0.8s settled
hold at the end of each scene, which is 24 frames at 30fps. So the last element in a scene has
to finish settling 24 frames before the cut. Every duration below was set by that limit.

| Beat | 40s | 30s |
|---|---|---|
| Hook | 3.5s | **2.5s** |
| Blast | 7.0s | **5.0s** |
| Record | 7.0s | **5.5s** |
| Generate | 6.5s | **5.0s** |
| Replay | 6.0s | **4.5s** |
| Verdict | 7.0s | **5.0s** |
| Payoff | 3.0s | **2.5s** |

Weighting held steady across all three cuts:

| | 60s | 40s | 30s |
|---|---|---|---|
| Problem | 52% | 26% | **25%** |
| Keploy | 44% | 66% | **67%** |
| Payoff | 4% | 8% | **8%** |

## Beat sheet

| # | Scene | In | Dur | On screen | Caption |
|---|---|---|---|---|---|
| 1 | Hook | 0:00 | 2.5s | `build` fills to a tick, `12 tests passed` fills 12 dots, `deployed` lands on `production` | *Everything looked fine.* |
| 2 | Blast | 0:02 | 5.0s | Shockwave out of `/api/visits`; `/api/owners`, `/api/pettypes`, `/api/pets` flip BROKEN. Three chips | *Regressions shipped. Your users found them first.* |
| 3 | Record | 0:07 | 5.5s | PetClinic API to Keploy proxy (RECORDING) to PostgreSQL / Redis / Mail API, all REAL | *Your real traffic becomes the baseline.* |
| 4 | Generate | 0:13 | 5.0s | `Keploy GENERATING`, six skeleton cards land every 5 frames | *The cases nobody ever wrote.* |
| 5 | Replay | 0:18 | 4.5s | REPLAYING · SERVING MOCKS, deps dashed and MOCKED, dots flowing up | *Any drift shows up instantly.* |
| 6 | Verdict | 0:22 | 5.0s | `Delete_Visit (7)` FAILED, `Vet_CRUD_Lifecycle (7)` PASSED, Buggy + AI Confidence 95% + `404` vs `200` + fix chip | *Before your users do.* |
| 7 | Payoff | 0:27 | 2.5s | "Ship fast with AI." then gradient "Just don't ship its regressions." + Keploy logo | |

## Two specific re-timings worth knowing

- **Hook**: the caption fades in at frame 24, overlapping the last two pipeline steps rather
  than following them. That overlap is what buys the settled hold in a 2.5s scene.
- **Generate**: cards land every 5 frames instead of 6, so all six are on screen by frame 41
  and the chip and caption still have room.

## Closed loop

Scene 2 breaks `/api/pettypes`. Scene 6 catches that exact endpoint's 404.

## Same house rules

- No em dashes or en dashes. Enforced by `npm run check`.
- One example only: PetClinic.
- Nothing legible below y=1340. Check with `Regressions30-SafeZone`.
- Never claims Keploy proves correctness, only that it detects drift from a recorded baseline.
