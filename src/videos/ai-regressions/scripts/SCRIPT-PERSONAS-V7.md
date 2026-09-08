# Script: "Everyone Else v7"  ·  Keploy named, closes on the outcome (52s)

**Length** 52.0s (1560 frames @ 30fps) · **Format** 9:16, 1080x1920 · **Audio** none
**Composition** `PersonasV7` · **Render** `npm run render:personas7`
**Supersedes** nothing. Every earlier personas cut stays.

A copy pass. Structure and pacing are v6 exactly, with one duration trade.

## Keploy is the subject now, not "it"

Every beat in the Keploy half said "it". That reads fine watching straight
through, but a feed does not work that way: someone lands mid-scroll, sees one
frame, and "it" tells them nothing. Naming the product in each heading means
any single frame is self-contained.

| Beat | Was | Now |
|---|---|---|
| Keploy personas (heading) | "That is exactly what Keploy does." | unchanged, already named |
| Keploy personas (sub) | "**It** reasons through every kind of user, and every edge case each of them hits, then writes the test." | **"Keploy** reasons through every kind of user, and every edge case each of them hits." |
| Record | "Keploy learns your app from your real traffic." | unchanged, already named |
| Generate | "**It** writes the tests, and the edge cases, from what it learned about your app." | **"Keploy** writes the tests and the edge cases from what it learned about your app." |
| Replay | "Then **it** replays every recorded **case**." | **"Then Keploy** replays every recorded **test**." |
| Verify | "And verifies each one instantly." | **"And Keploy** verifies each one instantly." |

Read as a sequence the Keploy half is now: **Keploy learns**, **Keploy writes**,
**Keploy replays**, **Keploy verifies**. Four verbs, one subject.

## Other copy

| Beat | Was | Now |
|---|---|---|
| Replay caption | "Against the mocks it captured, **not your database**." | **"Against the mocks it captured."** |
| Verify chip | `every test and every edge case, checked` | **`every test and every edge case, checked and verified`** |
| Verify caption | "Passes and failures, in a single run." | **"Every test, every edge case, end to end, in one run."** |

Dropping "not your database" was the right call: singling out the database
implies the other dependencies are still being hit, which is the opposite of
what the dashed `mocked` cards are saying. "Against the mocks it captured"
covers all three without needing to list them.

## The close changed

Every earlier cut ended on **"Ship fast with AI. Just don't ship its
regressions."** That is a decent line that tells the viewer nothing about what
changed for them.

It now ends on the outcome:

> **Now you know where your app breaks.**
> *And you fix it before your users do.*

Payoff grew 2.0s to 3.0s to carry the second line, paid for by trimming replay
5.0s to 4.5s. Net runtime is 52.0s, half a second up on v6.

## Beat sheet

| # | Scene | In | Dur | Changed |
|---|---|---|---|---|
| 1 | Hook | 0:00 | 5.5s | |
| 2 | Blast | 0:05 | 6.5s | |
| 3 | AI personas | 0:12 | 4.5s | |
| 4 | Question | 0:16 | 3.5s | |
| 5 | Keploy personas | 0:20 | 7.0s | **sub names Keploy** |
| 6 | Record | 0:27 | 5.5s | |
| 7 | Generate | 0:32 | 5.5s | **heading names Keploy** |
| 8 | Replay | 0:38 | 4.5s | **heading names Keploy, caption generalised, 0.5s shorter** |
| 9 | Verify | 0:42 | 6.5s | **heading names Keploy, chip and caption rewritten** |
| 10 | Payoff | 0:49 | 3.0s | **rewritten to the outcome, 1.0s longer** |

## Still illustrative

Dependency latencies, call counts and the eleven run rows are invented. Record
a real `keploy record` and `keploy test` pair before shipping, per DESIGN 0.4.

## Voiceover

```bash
node scripts-vo-generate.mjs \
  --timeline src/videos/ai-regressions/timelinePersonasV7.ts \
  --scenes   src/videos/ai-regressions/scenes/personas-v7 \
  --video    out/ai-regressions/personas-v7-52s.mp4 \
  --style    duo \
  --out      src/videos/ai-regressions/vo/personas-v7-duo.json
```

Worth noting for whoever writes the VO: the on-screen copy now names Keploy on
five consecutive beats. The voice should not repeat the name every time or it
will sound like an ad read. Let the picture carry the subject and use pronouns
in the audio, which is the reverse of the rule for the on-screen text.
