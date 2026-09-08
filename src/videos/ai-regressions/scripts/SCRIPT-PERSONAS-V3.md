# Script: "Everyone Else v3"  ·  personas, copy pass (47s)

**Length** 47.0s (1410 frames @ 30fps) · **Format** 9:16, 1080x1920 · **Audio** none
**Composition** `PersonasV3` · **Render** `npm run render:personas3`
**Supersedes** nothing. `Personas40` and `PersonasV2` both stay.

v2 fixed the visuals: contrast, pacing, skeleton labels, weighted edge pile,
proxy arrowheads. This pass fixes the words, which were leaving those visuals
to explain themselves.

## The four notes

### 1. "then it changed one thing and broke three others is not very descriptive"

Right. That was a fact, not an explanation, and it left the viewer free to
assume CI would have caught it, which kills the problem the reel is about.

Three things are now said instead of one:

| | Was | Now |
|---|---|---|
| Heading | "Then it changed one thing, and broke three others." | **"AI changed one thing. The blast radius did the rest."** |
| Chip 3 | `AI never checked them` | **`its own tests still passed`** |
| Caption | "Regressions shipped. Your users found them first." | **"So the regressions shipped. Your users found them before you did."** |

The middle chip is the load-bearing one. Without "its own tests still passed"
there is no mystery: the viewer assumes a red build somewhere warned somebody.
With it, nothing warned anybody, which is the whole point.

### 2. "AI wrote the tests only for the users AND the cases it could imagine"

Widened, and the ceiling is now named precisely:

| | Was | Now |
|---|---|---|
| Heading | "It wrote tests for the users it could imagine." | **"AI wrote tests only for the users and the cases it could imagine."** |
| Chip | `5 scenarios, guessed from the code` | **`5 scenarios, guessed from its own code`** |
| Caption | "Only the ones the code implied." | **"Only what the code it wrote implied."** |

"the code" was too loose. The limit on what AI can test is the artefact it just
produced, not the system that artefact lives in, and the copy now says that.

### 3. "the animation is not explanatory, add one more line below the heading"

Added. The persona graph was carrying the entire idea by itself:

> **That is exactly what Keploy does.**
> It reasons through every kind of user, and every
> edge case each of them hits, then writes the test.

That is the line the picture needed. An animation that requires its caption to
make sense is an animation with a missing line of copy.

The graph shrank from 700px to 620px tall to make room, which still clears the
node radius at all three rings. Scene went from 6.0s to 7.0s so the extra line
has time to be read.

### 4. "not two separate columns, one single line only"

The generate beat is one column now. Normal cases first, at full width. Edge
cases directly underneath, also full width.

Side by side read as *two lists of things*. They are not two lists: they are one
suite, and the edge half is the part that normally never gets written. Stacking
them says that, and the pile below the second label is plainly longer than the
one above it without needing a count.

The "AI wrote none of the right column" chip moved onto the `EDGE CASES` label
as an inline note, since with one column there is no right column to point at.

## Beat sheet

| # | Scene | In | Dur | Changed in this pass |
|---|---|---|---|---|
| 1 | Hook | 0:00 | 4.5s | |
| 2 | **Blast** | 0:04 | 6.0s | **new heading, new third chip, new caption** |
| 3 | **AI personas** | 0:10 | 5.0s | **heading widened, chip and caption point at its own code** |
| 4 | Question | 0:15 | 3.0s | |
| 5 | **Keploy personas** | 0:18 | 7.0s | **explanatory line added under the heading** |
| 6 | Record | 0:25 | 4.0s | |
| 7 | **Generate** | 0:29 | 7.0s | **one column, normal then edge beneath, note inline on the label** |
| 8 | Replay | 0:36 | 4.0s | |
| 9 | Verdict | 0:40 | 4.5s | |
| 10 | Payoff | 0:45 | 2.0s | |

## Voiceover

The scripts in `src/videos/ai-regressions/vo/` are timed to `Personas40`
(40.0s). This cut is 47.0s with different scene lengths, so they will not sync.
Regenerate against this timeline:

```bash
node scripts-vo-generate.mjs \
  --timeline src/videos/ai-regressions/timelinePersonasV3.ts \
  --scenes   src/videos/ai-regressions/scenes/personas-v3 \
  --video    out/ai-regressions/personas-v3-47s.mp4 \
  --style    duo \
  --out      src/videos/ai-regressions/vo/personas-v3-duo.json
node scripts-vo-check.mjs src/videos/ai-regressions/vo/personas-v3-duo.json
```

Note the new copy is denser, so the VO has less room to restate it. The
generator's "do not read the on-screen text back" rule matters more here than
in any earlier cut.

## Same house rules

- No em dashes or en dashes.
- No raw hex in scenes.
- Every on-screen colour pair clears WCAG AA.
- Nothing legible below y=1340. Check with `PersonasV3-SafeZone`.
- Never claims Keploy proves correctness.
