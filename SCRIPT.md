# Script — "The Happy Path Trap"

**Length** 38.0s (1140 frames @ 30fps) · **Format** 9:16, 1080×1920 · **Audio** none (silent, burned-in captions)
**Angle** AI ships a feature, silently reshapes an old one, and its own tests still pass. Keploy replays real recorded traffic and surfaces the drift.

## Why this angle

The obvious version of this video is "AI writes buggy code." That's weak — it's contested, and every AI-skeptic post already says it. The sharper claim is structural and hard to argue with:

> **An AI-written test can only assert what the code already does.** It's a mirror, not an oracle. It cannot catch a regression in behaviour it never observed.

That reframes Keploy from "another testing tool" to "the independent oracle" — recorded real traffic is the one baseline the AI didn't author. It also stays inside honest claim boundaries: Keploy detects **drift from recorded reality**, it does not prove correctness.

## Beat sheet

| # | Scene | In | Dur | On-screen | Caption (this is the script — no VO) |
|---|---|---|---|---|---|
| 1 | Hook | 0:00 | 4.0s | "Your AI shipped the feature." 3 green PASS rows | *Everything looks fine.* |
| 2 | Ship | 0:04 | 5.0s | Prompt chip → `checkout.js` types itself in, chip `AI-generated` | *It writes the feature — and the test that checks it.* |
| 3 | Blind spot | 0:09 | 7.0s | 1 green PASS above 4 grey NOT WRITTEN rows; chip `happy path only` | *AI writes the happy path. Your users find the rest.* |
| 4 | The break | 0:16 | 6.0s | `cart.controller.js` before/after JSON, `"data"` wrapper marked orange; `GET /api/cart` NO TEST | *Nothing failed. Nothing was watching.* |
| 5 | Record | 0:22 | 6.0s | `keploy record`, REC dot breathing, `eBPF` chip, traffic captured | *Real requests. Real payloads. The edge cases AI never imagined.* |
| 6 | Replay | 0:28 | 6.5s | `keploy test` → FAILED; diff card, `<missing>` red-outlined, `"data"` orange-filled | *The regression surfaces — on the exact field that moved.* |
| 7 | Payoff | 0:34 | 3.5s | "Ship with AI. / Just don't let it grade its own homework." + wordmark | — |

## Retention logic

- **0–2s** the hook is a *win*, not a problem. Pattern-break: devs expect a complaint, get a celebration. Buys the next 3 seconds.
- **9s** the turn. Four greyed-out rows do the argument visually — no narration needed.
- **16s** the twist lands in a feature *nobody asked about*. This is the relatable part.
- **22s** Keploy enters as the answer, not as an ad.
- **34s** the punchline is quotable and shareable on its own.

## Honesty check (DESIGN §6)

- ✅ Never claims Keploy proves correctness — only that it catches drift from a recorded baseline
- ✅ No statistics on screen, so nothing needs a citation
- ✅ Every pass/fail carries colour **+** icon **+** text label
- ⚠️ Terminal output is *modelled* on Keploy's real CLI, not captured. **Must be replaced before shipping** — see README.
