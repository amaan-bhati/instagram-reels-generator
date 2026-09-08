# Script: "Someone Has To"  ·  bridge variant (40s)

**Length** 40.0s (1200 frames @ 30fps) · **Format** 9:16, 1080x1920 · **Audio** none
**Composition** `Bridged40` · **Render** `npm run render:bridge`
**Example** PetClinic, same as every other cut.

## The problem this variant fixes

In every earlier cut, Keploy just turns up. The blast radius happens, and then the next scene
opens with "So Keploy captures everything." That is a topic change, not an introduction. The
viewer has been shown a problem and is then handed a product, with nothing connecting the two.

This cut puts three beats in between, and the product only appears in the third.

| Beat | What it does | Product on screen |
|---|---|---|
| 3. Gap | Names the miss in numbers: twelve tests written, none of them the edge cases | no |
| 4. Question | Asks it plainly, then answers it as a requirement: *something has to think of the edge cases, before your users do* | **no** |
| 5. Enter | *That is exactly what Keploy does*, and here are the two things it writes | yes |

Scene 4 is the hinge, and it is the only beat in any variant with no product, no diagram and
no UI in frame. It states a requirement the viewer already agrees with. So when the logo lands
in scene 5, Keploy is answering a question that has been asked out loud, which is a different
thing from being announced.

## Structure

|  | Frames | Time | Share |
|---|---|---|---|
| Problem (hook + blast) | 210 | 7.0s | 18% |
| **Bridge (gap + question + enter)** | **360** | **12.0s** | **30%** |
| Keploy mechanics (record, generate, replay, verdict) | 570 | 19.0s | 47% |
| Payoff | 60 | 2.0s | 5% |

The regression story is still 7.0s, inside the budget. The bridge is not overhead: scene 5 is
already Keploy, it just introduces rather than demonstrates.

## Beat sheet

| # | Scene | In | Dur | On screen | Caption |
|---|---|---|---|---|---|
| 1 | Hook | 0:00 | 2.5s | `build` ticks, `12 tests passed` fills 12 dots, `deployed` lands on `production` | *Everything looked fine.* |
| 2 | Blast | 0:02 | 4.5s | Shockwave out of `/api/visits`; `/api/owners`, `/api/pettypes`, `/api/pets` flip BROKEN | *Regressions shipped. Your users found them first.* |
| 3 | **Gap** | 0:07 | 4.0s | "It wrote 12 tests." The **same twelve dots from scene 1** come back, now as the problem, with three NOT WRITTEN edge cases under them | *None of the twelve were the edge cases.* |
| 4 | **Question** | 0:11 | 3.5s | "So how do you stop that?" then in gradient: "Something has to think of the edge cases." Nothing else in frame | *Before your users do.* |
| 5 | **Enter** | 0:14 | 4.5s | The logo lands large with a warm glow, then "That is exactly what Keploy does." and a `KEPLOY WRITES` panel: `the test cases` and `the edge cases AI missed` | *Not just the tests. The ones AI never thought of.* |
| 6 | Record | 0:19 | 4.5s | "It learns your app from real traffic." Proxy diagram, RECORDING, deps REAL | *Your real traffic becomes the baseline.* |
| 7 | Generate | 0:23 | 5.5s | "So it writes both kinds." `NORMAL CASES` and `EDGE CASES` columns. Chip `AI wrote none of the right column` | *The ones your users will actually hit.* |
| 8 | Replay | 0:29 | 4.0s | REPLAYING · SERVING MOCKS, deps dashed and MOCKED | *Any drift shows up instantly.* |
| 9 | Verdict | 0:33 | 5.0s | `Delete_Visit (7)` FAILED, Buggy + AI Confidence 95% + `404` vs `200` + fix chip | *Before your users do.* |
| 10 | Payoff | 0:38 | 2.0s | "Ship fast with AI." then gradient "Just don't ship its regressions." + logo | |

## The callback in scene 3

Scene 1 fills twelve green dots as a win. Scene 3 brings the identical twelve dots back and
re-reads them as the problem: they all passed, and not one of them was an edge case. Reusing
the exact visual is what makes the reversal land without a sentence explaining it.

## One copy change downstream

Scene 6's heading used to be "So Keploy captures everything", which was the old unearned
introduction. Now that scene 5 does the introducing, scene 6 explains the mechanism instead:
"It learns your app from real traffic."

## Closed loop

Scene 2 breaks `/api/pettypes`. Scene 9 catches that exact endpoint's 404.

## Same house rules

- No em dashes or en dashes. Enforced by `npm run check`.
- One example only: PetClinic.
- No raw hex in scenes.
- Nothing legible below y=1340. Check with `Bridged40-SafeZone`.
- Never claims Keploy proves correctness.
