# Script: "The Blast Radius"  ·  v4

**Length** 60.0s (1800 frames @ 30fps) · **Format** 9:16, 1080x1920 · **Audio** none (silent, burned-in captions)
**Example** PetClinic, and only PetClinic.

## House copy rules

- **No em dashes or en dashes anywhere.** Enforced by `node scripts-lint-tokens.mjs`.
- **"Keploy"** capitalised in all display text. Lowercase only where it is a literal CLI name.
- **Show, do not tell.** If a beat can be a bar filling, a counter running, a card
  materialising or a wave spreading, it is not a sentence.

## Beat sheet

| # | Scene | In | Dur | On screen | Caption |
|---|---|---|---|---|---|
| 1 | Hook | 0:00 | 5.5s | A pipeline that **completes on camera**: `build` bar fills to a tick, `AI wrote the tests` counts up to 12, `tests passed` fills 12 green dots one by one, `deployed` lands on a gradient `production` chip | *Everything looks fine. For now.* |
| 2 | Ship | 0:05 | 3.5s | `visit.controller.js` types itself in, chip `AI-generated`, prompt was "let owners book a visit online" | *It writes the feature. And the test that checks it.* |
| 3 | Blind spot | 0:09 | 5.0s | "Then AI wrote the tests for itself." 1 PASS above 4 NOT WRITTEN. Chip `the rest ships to production` | *AI writes the happy path only. Your users find the rest.* |
| 4 | The fix | 0:14 | 5.5s | "Ask it to cover them, and it will." Rows flip green **slowly**, to convey it taking time. Chip lands on `slow, and never complete` | *Every box ticked. You think you are good to go.* |
| 5 | **Blast radius** | 0:19 | 6.5s | Shockwave out of `/api/visits`; `/api/owners`, `/api/pettypes`, `/api/pets` flip BROKEN. Chips `1 endpoint changed` · `3 broken elsewhere` · `AI never checked them` | *One fix. Three regressions. Straight to production.* |
| 6 | Users | 0:26 | 4.5s | WHAT AI TESTED vs WHAT USERS SEND, then a `…` row and chip `+ every case nobody thought to write down` | *Your users are not a happy path.* |
| 7 | **Record** | 0:30 | 6.5s | "So Keploy captures everything." Diagram: PetClinic API to **Keploy proxy** (logo, RECORDING) to PostgreSQL / Redis / Mail API, all REAL, traffic flowing down. Chips `requests to test cases` · `dependency calls to mocks` | *It tracks what AI can break, before it does.* |
| 8 | **Generate** | 0:37 | 6.5s | "Then it writes the cases AI never got to." A `Keploy GENERATING` pill, then six test cases materialise as **skeleton cards** with gradient method badges (POST, GET, PUT, DELETE, GET, PATCH). Chip `edge cases included` | *The cases nobody ever wrote.* |
| 9 | **Replay** | 0:43 | 5.5s | "Then it replays everything again." Same diagram, REPLAYING · SERVING MOCKS. Deps dashed and MOCKED, connectors quiet, dots flow upward | *Any drift shows up instantly.* |
| 10 | **Verdict** | 0:49 | 7.5s | No command, just results. `Delete_Visit (7)` FAILED above `Vet_CRUD_Lifecycle (7)` PASSED, then Keploy's panel: breadcrumb, explanation, **Buggy**, **AI Confidence: 95%** counting up, assertion `404` vs `200`, chip `fix it yourself, or hand it to your AI` | *What broke, why, and how sure it is.* |
| 11 | Payoff | 0:56 | 3.5s | "Ship with AI." then gradient "Just don't let it grade its own homework." plus real Keploy logo | |

## What changed in v4

- **Scene 1 is watched, not read.** Progress bars, a running counter and twelve dots that
  go green in sequence, instead of three static rows of text.
- **Scene 8 replaces the IP-localization card entirely.** It is now generation shown as
  generation: skeleton cards with method badges appearing under a live `GENERATING` pill.
  No geography copy, no invented locality claims.
- **Scene 10 dropped the `keploy test` terminal.** Results only, matching the real product UI,
  with the fix path spelled out.
- **Scene 4 re-timed** so the rows fill slowly. The delay is the message: it does the work,
  it just takes a while and still misses things.
- **Gradients throughout.** The brand ramp is lifted off the logo SVG itself
  (`#FAD961` to `#F76B1C`), so accent chips, method badges, progress fills and the payoff
  headline all match the mark. Pass and fail get their own ramps.
- **Every em dash and en dash removed**, and a lint added so they cannot come back.

## Continuity

- Scene 5 breaks **`/api/pettypes`**. Scene 10's verdict is the **`/api/pettypes` 404**.
  Same bug, followed from cause to detection.
- Scenes 7 and 9 are the same diagram in two phases, so record and replay read as one
  mechanic rather than two claims.

## Layout rule

Instagram and LinkedIn paint the profile row, caption and action rail over roughly the
bottom third:

- Hard content floor at **y = 1340**
- Caption band at **y = 1210 to 1330**
- Content centres in the **upper-middle** (y 190 to 1180)
- Verify with the `BlastRadius-SafeZone` composition

## Honesty check (DESIGN §6)

- Never claims Keploy proves correctness. It detects drift from a recorded baseline.
- Scene 6's "every case nobody thought to write down" is deliberately qualitative. A
  fabricated count would be an unsourced stat, which §6 forbids.
- Scene 8 shows *that* cases are generated, not fictional specifics.
- Every pass/fail carries colour **and** icon **and** text label.
- Remaining check: confirm the verdict panel wording against real product behaviour.
