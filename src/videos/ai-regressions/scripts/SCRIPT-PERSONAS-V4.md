# Script: "Everyone Else v4"  ·  record and replay rebuilt (49s)

**Length** 49.0s (1470 frames @ 30fps) · **Format** 9:16, 1080x1920 · **Audio** none
**Composition** `PersonasV4` · **Render** `npm run render:personas4`
**Supersedes** nothing. `Personas40`, `PersonasV2` and `PersonasV3` all stay.

Two beats changed. Everything else is v3.

## The fix was sequence, not styling

The note was that the diagram looked like Keploy turning into Postgres, Redis
and the Mail API. Three earlier attempts treated that as a rendering problem:
orthogonal routes, then arrowheads, then a labelled tier rule. Arrowheads
helped. None of them fixed it, because the problem was not how the lines looked.

The problem was that the diagram opened with Keploy already sitting in the
middle with three lines fanning out beneath it. In that frame, "Keploy becomes
these three things" is a perfectly reasonable reading, and no amount of arrow
styling argues a viewer out of it.

So record now has two phases:

| Frames | What is on screen |
|---|---|
| 0 to 61 | `POST /api/visits 201` into **PetClinic API**, and PetClinic calling PostgreSQL, Redis and the Mail API **itself**. No Keploy anywhere. |
| 62 onward | **Keploy proxy** lands in the middle of those exact paths, `RECORDING` starts, and the curves now originate from Keploy. |

You watch it interpose. There is nothing left to misread.

**No layout shift when it arrives.** The hub band is reserved from the first
frame and the curves run straight through the empty space, so Keploy lands *on*
the path rather than pushing the dependency cards down. That is what makes it
read as slotting in rather than as a scene change.

## Replay makes Keploy the actor

Recording is something done TO the app. Replay is something Keploy does, and
the old version did not show that difference: it looked like the app making the
same calls again with Keploy watching.

| | Record | Replay |
|---|---|---|
| Hub badge | `RECORDING`, red dot | `REPLAYING EVERY ONE`, orange dot |
| Dependency cards | solid border, `4 calls`, real latency | **dashed** border, `mocked`, `0ms` |
| Connectors | solid | **dashed** |
| Traffic dots | downward, app to deps | **upward**, mocks back to Keploy |
| App card | plain | labelled **`under test`** |
| Chip | `every call in and out, captured` | `Keploy answers, not your database` |

## Copy

| | Was | Now |
|---|---|---|
| Record heading | "It learns your app from real traffic." | **"Keploy learns your app from real traffic."** |
| Record chip | one static chip | **changes with the phase**: `your app, calling its own dependencies` then `every call in and out, captured` |
| Record caption | "Your real traffic becomes the baseline." | **"It slots into the path you already have."** |
| Replay heading | "Then it replays everything again." | **"Then Keploy replays every one."** |

## Built to the reference

New component `src/kit/DepFlow.tsx`, matching the supplied diagram:

- four tiers: request card, app, reserved hub band, dependency row
- smooth cubic bezier connectors instead of right angles
- dependency cards with an icon tile, name, latency, call count and a fill bar
- connector colour matched to its dependency card

### Two deviations worth knowing

**Per dependency colours are a DESIGN 0.3 exception.** The house rule allows one
accent plus green and red. The reference uses amber, blue and purple, and it was
requested explicitly, so it is implemented as given and documented in
`theme.ts` under `deps`. The defence is that these read as third party service
identities rather than Keploy accents, the way a logo does, and colour coding
each connector to its card is what keeps three simultaneous call paths legible.
To bring it back inside the rule, set every `line` and `tint` in `theme.deps` to
`colors.orange`; the layout is unaffected.

**The dependency icons are drawn, not real logos.** The reference shows the
actual PostgreSQL and Redis marks. Those are third party trademark assets that
are not in this repo, so `DepFlow` renders a generic database cylinder, a
stacked store and an envelope. Drop the real SVGs into `public/` and swap the
`Glyph` component if you want exact parity.

## Still illustrative

Latencies (`35ms`, `12ms`, `48ms`) and call counts (`4 calls`, `2 calls`,
`1 call`) are made up. DESIGN 0.4 wants real captures, so record an actual
`keploy record` run against a Gin plus Postgres app and use its real numbers
before this ships.

## Beat sheet

| # | Scene | In | Dur | Changed in this pass |
|---|---|---|---|---|
| 1 | Hook | 0:00 | 4.5s | |
| 2 | Blast | 0:04 | 6.0s | |
| 3 | AI personas | 0:10 | 5.0s | |
| 4 | Question | 0:15 | 3.0s | |
| 5 | Keploy personas | 0:18 | 6.5s | |
| 6 | **Record** | 0:25 | 6.0s | **rebuilt, two phase, was 4.0s** |
| 7 | Generate | 0:31 | 6.5s | |
| 8 | **Replay** | 0:37 | 5.0s | **rebuilt, Keploy as actor, was 4.0s** |
| 9 | Verdict | 0:42 | 4.5s | |
| 10 | Payoff | 0:47 | 2.0s | |

## Voiceover

Scripts in `src/videos/ai-regressions/vo/` are timed to `Personas40` (40.0s)
and will not sync to this 49.0s cut. Regenerate:

```bash
node scripts-vo-generate.mjs \
  --timeline src/videos/ai-regressions/timelinePersonasV4.ts \
  --scenes   src/videos/ai-regressions/scenes/personas-v4 \
  --video    out/ai-regressions/personas-v4-49s.mp4 \
  --style    duo \
  --out      src/videos/ai-regressions/vo/personas-v4-duo.json
node scripts-vo-check.mjs src/videos/ai-regressions/vo/personas-v4-duo.json
```

The record beat has two phases, so give it two lines: one for the app calling
its own dependencies, one for Keploy arriving.

## Same house rules

- No em dashes or en dashes.
- No raw hex in scenes.
- Every on-screen colour pair clears WCAG AA.
- Nothing legible below y=1340. Check with `PersonasV4-SafeZone`.
- Never claims Keploy proves correctness.
