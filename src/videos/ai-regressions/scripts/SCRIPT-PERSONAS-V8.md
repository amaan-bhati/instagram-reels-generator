# Script: "Everyone Else v8"  ·  timed from the recording (48.1s)

**Deliverable** `out/ai-regressions/FINAL-keploy-regressions-48s.mp4`
**Silent master** `out/ai-regressions/personas-v8-48s.mp4`
**Voiceover** `audio/regressions-1.mp3` (47.79s)
**Composition** `PersonasV8` · **Render** `npm run render:final`
**Format** 9:16, 1080x1920, 30fps, H.264 + AAC mono

## What is different about this cut

Every scene length came out of the recording rather than out of a design
decision. That inverts how the previous seven cuts were built: there, the
timeline was fixed and the script had to be trimmed to fit, which is why each
VO pass lost words. Here the recording is the immovable artifact and the
picture bends around it.

`scripts-audio-timeline.mjs` measures where the speaker actually paused, then
hands each scene its own line plus the pause that follows it. Sync is therefore
a property of the build, not something aligned afterwards. Every cut lands
inside a pause; none can clip a word.

`src/videos/ai-regressions/timelineFromAudio.ts` is **generated**. Regenerate
it rather than editing it. If a beat needs longer, re-record that line.

## Derived timeline

| # | Scene | Video in..out | Spoken line in..out | Hold after speech |
|---|---|---|---|---|
| 1 | hook | 0.00..6.37 | 0.00..5.48 | 27f |
| 2 | blast | 6.37..12.27 | 6.38..11.61 | 20f |
| 3 | aiUsers | 12.27..18.73 | 12.29..17.87 | 26f |
| 4 | question | 18.73..21.13 | 18.74..20.68 | 14f |
| 5 | keployUsers | 21.13..26.43 | 21.15..25.78 | 20f |
| 6 | record | 26.43..31.53 | 26.44..30.93 | 18f |
| 7 | generate | 31.53..37.50 | 31.55..37.02 | 14f |
| 8 | replay | 37.50..40.60 | 37.53..39.91 | 21f |
| 9 | verify | 40.60..45.30 | 40.62..44.94 | 11f |
| 10 | payoff | 45.30..48.10 | 45.33..47.79 | 9f |

Four scenes had to be re-timed by hand or they would have overrun: `question`
lost 33 frames, `replay` 42, `keployUsers` 51, `verify` 54. All ten animations
were checked to complete inside their new duration.

## Three problems the detector hit, and the fixes

**1. Thirteen segments detected for ten lines.** The speaker pauses at commas as
readily as at full stops, so lines 1 and 2 were each split. No gap threshold can
fix this: the longest internal pause in the recording (0.52s, mid line two) is
*longer* than a real line boundary (0.40s, between lines nine and ten).

Fixed by using the script as a prior. `--script` takes the ten lines, derives
each one's expected share of speaking time from its word count, and picks the
grouping of consecutive segments that best matches, by dynamic programming.
Segments only ever merge with neighbours, so a line cannot be assembled out of
order.

**2. Boundaries rounded on the wrong side.** Rounding each scene's duration
independently let error accumulate, and `Math.round` on a boundary can land it a
fraction *after* the speech it is meant to precede, putting the first syllable
of a line on the previous scene. Two of ten boundaries failed this way.

Fixed by computing boundaries cumulatively from absolute times and **flooring**
them, so a cut always precedes its line. Every gap is at least 0.4s, so
flooring stays well inside the silence. An assertion now fails the build if any
line does not sit strictly inside its own scene.

**3. The tail was being truncated.** `ffmpeg -shortest` cut the output to the
audio length, discarding the deliberate 0.3s hold after the last word. The mux
now pads the voice with silence to the video length instead, since the video is
authoritative for duration.

## Verification

| Check | Result |
|---|---|
| Streams | h264 1080x1920 30fps + aac 44.1kHz mono |
| Duration | video 48.10s, audio track 48.15s |
| Levels | mean -20.6 dB, peak -1.9 dB, no clipping |
| Every line inside its own scene | 10 of 10 |
| Cuts landing in silence | 9 of 9, measured -49 to -63 dB across each gap |
| Animations completing | all 10, verified on the last frame of the two most compressed scenes |
| Picture matches audio | spot checked at 3s, 15s, 24s, 34s, 43.5s, 47s |

One measurement worth recording: an early pass reported the cuts sitting at
-19 dB, which would have meant every one landed on speech. That was wrong.
`ffmpeg -ss` before `-i` seeks to a keyframe and is not sample accurate over a
0.16s window. Re-measured with the `atrim` filter the same gaps read -49 to
-63 dB. Both `silencedetect` and `volumedetect` also report on **stderr** while
exiting 0, so a parser reading stdout sees nothing at all: that caused a
separate false result earlier in the same session.

## The recorded script

1. Your AI wrote the feature, wrote the tests based on the code it wrote, and you shipped it.
2. One feature added or updated by the AI. Three others broke due to the blast radius.
3. While writing the tests, AI could only imagine few test cases and handful of people using it.
4. Someone has to think of the missed cases.
5. So Keploy studies, learns and understand your app, turns it all into test cases.
6. Keploy sits between your app and everything your app calls to turn them into test cases.
7. Then Keploy segregates it all into test suites, covering tests and the edge cases as well.
8. Then runs every test against what it recorded.
9. Keploy hands back passes and failures together, so nothing slips through.
10. Find what breaks before your users do!

Stored at `audio/regressions-1.script.txt`, which is what the merge step reads.

## One thing to know before publishing

The dependency latencies (`35ms`, `12ms`, `48ms`), the call counts, and the
eleven verification rows are **illustrative, not captured**. DESIGN 0.4 asks for
real product behaviour. For a launch or docs placement, record a real
`keploy record` and `keploy test` pair against a Gin plus Postgres app and use
its actual numbers. For a social post this is a stylised diagram rather than a
screenshot, which is a normal thing for a reel to be.

Also: line 8 of the voiceover ("Then runs every test against what it recorded")
and the on-screen heading for that beat ("Then Keploy replays every recorded
test") say close to the same thing. Deliberate reinforcement given the brief
asked for the product name to be explicit, but it is the one place the voice
and the picture overlap rather than complement.

## Rebuilding from scratch

```bash
node scripts-audio-timeline.mjs audio/regressions-1.mp3 --lines 10 \
  --script audio/regressions-1.script.txt \
  --names hook,blast,aiUsers,question,keployUsers,record,generate,replay,verify,payoff \
  --out src/videos/ai-regressions/timelineFromAudio.ts
npm run render:final
```
