# Script: "Everyone Else v6"  ·  slower, unnumbered, ends on the run (51.5s)

**Length** 51.5s (1545 frames @ 30fps) · **Format** 9:16, 1080x1920 · **Audio** none
**Composition** `PersonasV6` · **Render** `npm run render:personas6`
**Supersedes** nothing. Every earlier personas cut stays.

## Pacing

The opening was still too fast to read, and the Keploy personas beat needed
room too. The AI personas beat was called out as already fine and is untouched.

| Beat | v5 | v6 |
|---|---|---|
| Hook | 4.5s | **5.5s** |
| Blast | 5.5s | **6.5s** |
| AI personas | 4.5s | 4.5s, unchanged |
| Question | 3.0s | **3.5s** |
| Keploy personas | 6.0s | **7.0s** |

The hook has now been slowed twice: 2.5s, then 4.5s, now 5.5s. Fills are longer
again and the twelve dots land on a four frame beat instead of three.

## Copy

| Beat | Was | Now |
|---|---|---|
| Keploy personas chip | `36 scenarios, learned from real traffic` | **`scenarios and edge cases, learned from your app`** |
| Generate heading | "So it writes both kinds." | **"It writes the tests, and the edge cases, from what it learned about your app."** |
| Generate caption | "The half nobody gets around to." | **"AI would have missed every one of these."** |
| Replay caption | "Every case it recorded. Verified, one by one." | **"Against the mocks it captured, not your database."** |
| Replay chip | `Keploy answers, not your database` | **removed** |

Dropping the count is the right call beyond taste: 36 was never sourced, and
the graph already communicates density better than a figure does. The same
reasoning applies to the run stack, which has no total on it either.

## The verdict beat is gone

The Buggy panel with the confidence score has been cut, and the reel now ends
on the verification run.

That panel was *reporting* what the run *shows*. Four failures landing in front
of you is the same information as a card saying a test failed, except you watch
it happen. Cutting it saves 4.5s of runtime and one beat of the viewer's
attention, and it removes the last piece of the reel that made a claim the
footage did not demonstrate.

## Replay is two beats now

| Beat | Dur | What |
|---|---|---|
| Replay | 5.0s | `Your app` under test, Keploy `REPLAYING EVERY ONE`, three dashed `mocked` dependencies, traffic running back up |
| **Verify** | **6.5s** | **eleven cases** landing pending then resolving, **four of them failing**, on a deeper pile of ghost rows |

They had to be split. Eleven rows plus the diagram plus a heading does not fit
above the platform UI floor at y=1340, and the note asked for more rows, not
smaller ones.

Eleven and four rather than five and one, because five rows with a single
failure reads as a tidy demo. A real run is messier, and the ghost rows
underneath say these eleven are only the top of it.

## Beat sheet

| # | Scene | In | Dur | Changed |
|---|---|---|---|---|
| 1 | Hook | 0:00 | 5.5s | **slower again** |
| 2 | Blast | 0:05 | 6.5s | **slower** |
| 3 | AI personas | 0:12 | 4.5s | |
| 4 | Question | 0:16 | 3.5s | **slower** |
| 5 | Keploy personas | 0:20 | 7.0s | **slower, count removed** |
| 6 | Record | 0:27 | 5.5s | |
| 7 | Generate | 0:32 | 5.5s | **new heading and caption** |
| 8 | Replay | 0:38 | 5.0s | **chip removed, diagram only** |
| 9 | **Verify** | 0:43 | 6.5s | **new beat, 11 rows, 4 failures** |
| 10 | Payoff | 0:49 | 2.0s | |

## Still illustrative

The dependency latencies and call counts are invented, and the eleven run rows
are not a real result. DESIGN 0.4 wants real captures. Record an actual
`keploy record` and `keploy test` pair and use the real numbers before shipping.

## Voiceover

Regenerate for 51.5s. The structure changed, so the old scripts will not map:

```bash
node scripts-vo-generate.mjs \
  --timeline src/videos/ai-regressions/timelinePersonasV6.ts \
  --scenes   src/videos/ai-regressions/scenes/personas-v6 \
  --video    out/ai-regressions/personas-v6-52s.mp4 \
  --style    duo \
  --out      src/videos/ai-regressions/vo/personas-v6-duo.json
```

The slower opening gives the voice noticeably more room than any earlier cut,
so the word budgets on beats 1, 2 and 5 will come back higher.
