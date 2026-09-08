# Script: "Everyone Else v5"  ·  one card, real contrast, visible verification (48s)

**Length** 48.0s (1440 frames @ 30fps) · **Format** 9:16, 1080x1920 · **Audio** none
**Composition** `PersonasV5` · **Render** `npm run render:personas5`
**Supersedes** nothing. Every earlier personas cut stays.

## The three notes

### 1. "we can just show one card"

The request card and the app card were saying the same thing twice, and the app
name plus a route plus a status was more technical detail than the beat needed.

The whole tier is gone. One card now, and it just reads **`Your app`**.

`DepFlow` gained a `cards` prop rather than being rewritten, so `PersonasV4`
keeps its exact two card geometry. `route` is optional now too, which is what
lets the card carry nothing but the name.

Dropping the tier is also what freed the vertical room for note 3.

### 2. "ensure the contrast score is nice everywhere we use gradients"

Second time this came up, so it stopped being a judgement call and became a
threshold. Every gradient that carries text is now held to **4.5:1 at both
stops**, not the 3:1 large-text floor, because these chips are small on a phone
and the light stop was what kept reading as washed out.

| Token | v4 | v5 | Measured |
|---|---|---|---|
| `grad.brand` | `#E8590E` to `#B03A08` | **`#C44A0A` to `#9A3208`** | 4.85 to 7.41 |
| `grad.brandText` | `#E8590E` to `#A8330A` | **`#C44A0A` to `#96300A`** | 4.85 to 7.71 |
| `grad.pass` | `#0F9D6B` to `#047857` | **`#0A7E56` to `#036049`** | 5.08 to 7.57 |
| `grad.fail` | `#E5405E` to `#B91C3C` | **`#DC2F50` to `#A81834`** | 4.60 to 7.38 |
| `deps.postgres.line` | `#F59E0B` (1.72:1) | **`#C2740A`** | 3.62 |
| `deps.redis.line` | `#3B82F6` | **`#2563EB`** | 5.17 |
| `deps.mail.line` | `#8B5CF6` | **`#7C3AED`** | 5.70 |

The connector colours matter because they carry meaning (which card a call goes
to), so WCAG 1.4.11's 3:1 applies to them as graphical elements. Amber at
1.72:1 was the worst offender on screen.

`scripts-lint-contrast.mjs` enforces all of it and caught three stops I had
still left short on the first attempt.

**Cost, stated plainly:** the brand fill is now a noticeably deeper burnt
orange than Keploy's `#F26A21`. The logo keeps the true ramp, since it is an
image and not a text surface. If the deeper fill is too far from brand, the
alternative is dark text on a light orange fill rather than white on dark.

### 3. "it is not clear what exactly we are replaying"

`REPLAYING EVERY ONE` was a label with nothing behind it. The answer is on
screen now, underneath the diagram.

New component `src/kit/TestRunStack.tsx`:

- five rows land one at a time, each **pending** with a pulsing grey dot
- about two thirds of a second later each **resolves** to a green tick or a red
  cross, so the run is something you watch happen rather than a claim
- four pass, one fails. That failure is the one the verdict beat then opens up.
- rows carry **skeleton bars, not text**, for the same reason the blast map
  labels are skeletons: readable case names pull the eye off the heading
- **ghost rows underneath** say the visible five are the top of a deeper pile.
  No count on them: a number would be an unsourced stat, and depth says "many"
  without claiming how many.

Replay went 5.0s to 6.5s so the run has time to resolve. Record dropped to 5.5s
because the diagram lost a tier and reveals faster.

## What record still does

Two phases, unchanged from v4 and still the thing that fixed the "Keploy turns
into Postgres" read:

| Frames | On screen |
|---|---|
| 0 to 55 | `Your app` calling Postgres, Redis and the Mail API itself. No Keploy. |
| 56 onward | Keploy lands on those exact paths, `RECORDING` starts |

Heading is **"Keploy learns your app from your real traffic."**

## Beat sheet

| # | Scene | In | Dur | Changed in this pass |
|---|---|---|---|---|
| 1 | Hook | 0:00 | 4.5s | contrast |
| 2 | Blast | 0:04 | 5.5s | contrast |
| 3 | AI personas | 0:10 | 4.5s | contrast |
| 4 | Question | 0:14 | 3.0s | contrast |
| 5 | Keploy personas | 0:17 | 6.0s | contrast |
| 6 | **Record** | 0:23 | 5.5s | **one card, `Your app`** |
| 7 | Generate | 0:29 | 6.0s | contrast |
| 8 | **Replay** | 0:35 | 6.5s | **one card plus the run resolving beneath it** |
| 9 | Verdict | 0:41 | 4.5s | contrast |
| 10 | Payoff | 0:46 | 2.0s | contrast |

## Two small fixes found in review

- `PostgreSQL` was truncating to `PostgreS...` at the narrower card font, so the
  label is the standard `Postgres` shorthand now.
- Safe zone verified with `PersonasV5-SafeZone`: the run stack and its ghost
  rows bottom out around y=1195, clear of both the caption band and the
  platform UI floor at y=1340.

## Still illustrative

`35ms`, `12ms`, `48ms` and the call counts are invented, and the five run rows
are not a real result. DESIGN 0.4 wants real captures. Record an actual
`keploy record` and `keploy test` pair and use the real numbers before shipping.

## Voiceover

Scripts in `vo/` are timed to the 40s cut. Regenerate for 48.0s:

```bash
node scripts-vo-generate.mjs \
  --timeline src/videos/ai-regressions/timelinePersonasV5.ts \
  --scenes   src/videos/ai-regressions/scenes/personas-v5 \
  --video    out/ai-regressions/personas-v5-48s.mp4 \
  --style    duo \
  --out      src/videos/ai-regressions/vo/personas-v5-duo.json
```

Record and replay each have two things happening now, so give each two lines.
