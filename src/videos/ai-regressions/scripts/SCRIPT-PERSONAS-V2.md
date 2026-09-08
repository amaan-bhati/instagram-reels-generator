# Script: "Everyone Else v2"  ·  personas, review notes applied (44s)

**Length** 44.0s (1320 frames @ 30fps) · **Format** 9:16, 1080x1920 · **Audio** none
**Composition** `PersonasV2` · **Render** `npm run render:personas2`
**Supersedes** nothing. `Personas40` stays as its own cut.

The argument is unchanged from `Personas40`: AI sits at the centre of five
imagined users, Keploy sits at the centre of thirty six learned from real
traffic. Everything below is about how readable that is, which is what the
feedback was about.

## The six notes, and what each one turned into

### 1. "check the contrast score, it blends into the bg"

Correct, and measurable. The brand gradient started at `#FAD961`, which carries
white text at **1.39:1**. WCAG AA wants 3:1 even for large bold text.

Split into two ramps, because a fill and a piece of text want opposite things:

| Token | Ramp | Purpose | Measured |
|---|---|---|---|
| `grad.brand` | `#E8590E` to `#B03A08` | fills that carry white text | 3.58:1 to 6.08:1 |
| `grad.brandText` | `#E8590E` to `#A8330A` | gradient text on the white page | 3.58:1 to 6.68:1 |
| `grad.logo` | `#FAD961` to `#F76B1C` | the mark only. Never text, never fills. | n/a |

`GradText` now defaults to `brandText`. The `VerdictCard` breadcrumb was using
`colors.amber`, which measured about 2:1 on white, and is now `orangeDeep`.

Added `scripts-lint-contrast.mjs`, wired into `npm run check`. It reads the live
values out of `theme.ts`, computes WCAG ratios for every on-screen pair, and
fails the build below threshold. This class of bug cannot come back silently.

**Note:** the fix is in shared `theme.ts`, so re-rendering an older cut will
pick up the better contrast. The already-rendered mp4s are untouched. This was a
real defect in a shared token, so fixing it in place is the right call rather
than forking a second palette.

### 2. "the start feels very high speed"

| Beat | Personas40 | v2 |
|---|---|---|
| Hook | 2.5s | **4.5s** |
| Blast | 4.0s | **5.5s** |

Every pipeline fill is longer, the twelve dots land at a pace you can count,
and the caption now arrives while the last step is still finishing rather than
after it, which is what buys the settled hold.

### 3. "keploy proxy is being further divided into postgresql"

The bare vertical drops read as structure: the proxy *becoming* Postgres.
Direction is what separates flow from structure, so every hop now terminates in
an arrowhead. It reads as "calls out to" now.

One thing tried and dropped: a labelled `DEPENDENCIES` tier rule. It would have
landed exactly on the routing bus at y=346, and the arrows had already fixed
the read, so it was not worth the collision.

### 4. "iterate on the visualisation of replay" too

Record and replay are the same `ProxyDiagram` component with a `phase` prop, so
the arrowhead fix lands on both beats at once. That was the point of building it
as one component.

### 5. "edge cases can be represented in a stacked form ... both hold equal weight"

They did, and that was wrong. Now:

| Column | Cards | Treatment |
|---|---|---|
| NORMAL CASES | 2 | grey badges, no shadow, 72% opacity. The part everyone already has. |
| EDGE CASES | 4 | brand ramp, full weight, plus three ghost cards stacked behind the last one |

The column is visibly taller and visibly unfinished. No count on the stack on
purpose: a number would be an unsourced stat, and the depth says "and more"
without claiming how many.

### 6. "put skeleton loaders instead of the example content"

The blast map's tiles carried `/api/owners`, `/api/pettypes` and so on, and a
viewer reported reading those instead of the headline. They were never the
message: three of six broke is. `FeatureMap` takes `labelMode="skeleton"` now,
which swaps each label for a shimmer bar and leaves the status colour, icon and
text label intact. The eye gets nothing to parse and goes to the heading.

## Beat sheet

| # | Scene | In | Dur | Changed |
|---|---|---|---|---|
| 1 | Hook | 0:00 | 4.5s | **slower**, was 2.5s |
| 2 | Blast | 0:04 | 5.5s | **slower** + **skeleton labels** |
| 3 | AI personas | 0:10 | 4.5s | contrast only |
| 4 | Question | 0:14 | 3.0s | **gradient headline now readable** |
| 5 | Keploy personas | 0:17 | 6.0s | contrast only |
| 6 | Record | 0:23 | 4.0s | **arrowheads** |
| 7 | Generate | 0:27 | 6.0s | **weighted columns + stacked edge pile** |
| 8 | Replay | 0:33 | 4.0s | **arrowheads** |
| 9 | Verdict | 0:37 | 4.5s | breadcrumb contrast |
| 10 | Payoff | 0:42 | 2.0s | gradient contrast |

## Voiceover

The two scripts in `src/videos/ai-regressions/vo/` are timed to `Personas40`
(40.0s), **not** to this cut. They will not sync. Regenerate against the new
timeline before recording:

```bash
node scripts-vo-generate.mjs \
  --timeline src/videos/ai-regressions/timelinePersonasV2.ts \
  --scenes   src/videos/ai-regressions/scenes/personas-v2 \
  --video    out/ai-regressions/personas-v2-44s.mp4 \
  --style    duo \
  --out      src/videos/ai-regressions/vo/personas-v2-duo.json
node scripts-vo-check.mjs src/videos/ai-regressions/vo/personas-v2-duo.json
```

## Same house rules

- No em dashes or en dashes.
- No raw hex in scenes.
- **New:** every on-screen colour pair clears WCAG AA.
- Nothing legible below y=1340. Check with `PersonasV2-SafeZone`.
- Never claims Keploy proves correctness.
