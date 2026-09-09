# Script: "Everyone Else v10"  ·  the shippable cut (51.83s)

**PUBLISH THIS** `out/ai-regressions/FINAL-keploy-regressions-52s.mp4`
**Silent master** `out/ai-regressions/_silent-masters/personas-v10-52s.mp4`
**Voiceover** `audio/ElevenLabs_regressions.mp3` (51.53s, 11 lines)
**Composition** `PersonasV10` · **Render** `npm run render:final10`
**Format** 9:16, 1080x1920, 30fps, H.264 + AAC mono

## What this is

Eleven scenes. **Every one of their lengths was measured from the recording**,
not chosen. The intro now has its own spoken line, so unlike v9 there is no
silent opening.

| # | Scene | Video in..out | Spoken line in..out | Hold |
|---|---|---|---|---|
| 1 | intro | 0.00..4.70 | 0.00..4.01 | 21f |
| 2 | hook | 4.70..10.20 | 4.73..9.59 | 18f |
| 3 | blast | 10.20..16.13 | 10.23..15.45 | 21f |
| 4 | aiUsers | 16.13..22.57 | 16.13..21.71 | 26f |
| 5 | question | 22.57..24.97 | 22.58..24.52 | 13f |
| 6 | keployUsers | 24.97..30.27 | 24.99..29.62 | 19f |
| 7 | record | 30.27..35.37 | 30.28..34.77 | 18f |
| 8 | generate | 35.37..41.37 | 35.39..40.86 | 15f |
| 9 | replay | 41.37..44.33 | 41.37..43.79 | 16f |
| 10 | verify | 44.33..49.07 | 44.35..48.67 | 12f |
| 11 | payoff | 49.07..51.83 | 49.07..51.53 | 9f |

Three scenes needed re-timing against the measured durations: intro lost 9
frames, **hook lost 26**, replay lost 4. The hook mattered: v9's stretched
fills would have overrun their scene by five frames.

## Verification

| Check | Result |
|---|---|
| Streams | h264 1080x1920 30fps + aac 44.1kHz mono, both default |
| Duration | video 51.83s, audio track 51.88s |
| Levels | mean -20.2 dB, no clipping |
| **Opening audible** | **-19.6 dB across 0.0..4.0s.** v9 opened on 5s of silence; this does not. |
| Every line inside its own scene | 11 of 11 |
| Every cut precedes its line | 10 of 10, verified against unrounded onsets |
| Cuts landing in silence | 10 of 10, -57 to -84 dB in the 0.15s ending at each cut |

The tightest boundary is scene 4: the cut lands at 16.1333s and the line starts
at 16.1344s, a margin of **1.1 milliseconds**. Correct, but that is the one to
watch if the audio is ever re-encoded.

## Two layout fixes, both the same bug

**The verify beat's heading was walking up the screen**, exactly as the opening
beat's had been. Same cause, same fix: `Stage` centres its content in the safe
band, which is right when the content is all present from frame one and wrong
when eleven rows arrive one at a time, because the block then grows in both
directions. The block is pinned to a top derived from its final measured
height, the heading fades in without the shared `enter` helper's 26px rise, and
the camera origin sits on the heading so `pushIn` scales everything away from
it rather than through it.

Measured across the scene: **0px drift**, from four sampled frames. The opening
beat measures 1px.

Worth noting as a pattern rather than two incidents: any scene whose content
arrives progressively needs pinning, not centring. That is currently the
opening beat and the verify beat.

## The replay sandbox

The mocked dependency cards were each individually dashed and labelled
`mocked`, but nothing said they are one thing that Keploy owns. They are now
enclosed in an orange dashed box labelled `KEPLOY SANDBOX`, drawn before the
cards so they sit inside it and with a 3.5% fill so the connectors entering it
stay visible. Replay phase only.

First attempt put the box 22px outside the 900px diagram, which pushed it past
the 72px gutter once the camera push-in expanded it. Pulled to 6px, verified
against the `PersonasV10-SafeZone` overlay.

## Detection notes

The recording produced **14** raw segments for 11 lines, because the speaker
pauses at commas as readily as at full stops. The script prior in
`scripts-audio-timeline.mjs` merged them correctly: line 2 absorbed 3 segments,
line 3 absorbed 2, the rest were one each.

## Two mistakes in this session worth recording

**Two 53s files, one silent.** v9 left `personas-v9-53s.mp4` (the raw silent
render) beside `FINAL-keploy-regressions-53s.mp4` in the same folder. The
report was that "the audio is missing"; the file being opened was the silent
one, which measures -91 dB. Raw renders now go to
`out/ai-regressions/_silent-masters/` so the publish folder only ever contains
finished files.

**A verification that flagged the video instead of itself.** A check measuring
a window *centred* on each cut reported 9 of 10 landing on speech. The check
was wrong: boundaries are floored to the frame just before each line, so a
centred window straddles the onset by design. Measuring the window *ending* at
the cut gives -57 to -84 dB. Second time this class of error appeared in this
session, the first being `-ss` before `-i` seeking to a keyframe.

## Still illustrative

The seven skeleton rows in the intro, the `N` in the failure banner, the
dependency latencies, and the eleven verification rows are stylised, not
captured. Normal for a reel; replace with real `keploy record` and
`keploy test` output for docs or a launch.

## Rebuild

```bash
npm run render:final10
```
