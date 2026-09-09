# Script: "Everyone Else v9"  ·  intro beat added (53.1s)

**Silent master** `out/ai-regressions/personas-v9-53s.mp4`
**Composition** `PersonasV9` · **Render** `npm run render:personas9`
**Status** structure complete, **awaiting the recording that contains the new opening line**

## What was added

A new beat in front of the hook. It states the claim and proves it in one frame.

> **Your app is going to break in production**
> **if you're writing the tests with AI.**

Beneath it: a `AI writing your tests` chip, then **seven rows landing one at a
time, every one of them going green**. That is AI writing tests and AI passing
them. Then underneath, a red banner: **`3 features broke in production`**.

Both halves have to share the frame. Passing tests on their own say the code is
fine. The banner on its own says nothing about why. Together they say the suite
was never the thing that would have caught it, which is the argument the whole
reel then unpacks.

Built by reusing `TestRunStack` with `depth={0}`, since there is no deeper pile
here: these seven are all AI wrote, and that is the point. `FailureBanner` is
new in `src/kit/TestRunStack.tsx`.

## The hook animation was stretched

You asked for the "Your AI shipped the feature" screen to slow down. Its scene
was already 6.37s, so length was not the problem: every progress bar finished
filling by frame 142 and then nothing moved for fifty frames, which reads as
fast followed by dead air.

| | v8 | v9 |
|---|---|---|
| `build` | starts 10, fills over 24f | starts 12, fills over **30f** |
| `12 tests passed` | starts 44, fills over 48f | starts 50, fills over **60f** |
| dot beat | every 4 frames | every **5 frames** |
| `deployed` | starts 100, fills over 22f | starts **122**, fills over **28f** |
| motion ends | frame 142 of 191 | frame **150 of 191** |

Same scene length, motion that lasts as long as the beat does.

## The audio situation

Neither file that arrived is the recording with the new line:

| File | What it actually is |
|---|---|
| `audio/regressions-0.mp3` | 41.57s. The **same ten line script read faster**. Identical 13 segment structure to `regressions-1.mp3`, and its final segment is 2.46s in both, which is "Find what breaks before your users do!". No intro line. |
| `audio/regressions-0.mp4` | Byte identical to `FINAL-keploy-regressions-48s.mp4`. Same SHA-256, same 9,065,455 bytes. A copy of the finished video. |
| `audio/regressions-1.mp3` | 47.79s, ten lines. This is what v8 and the measured part of v9 are timed to. |

So the intro's **150 frames is an estimate, not a measurement**, and it is the
only duration in this cut that is. Everything from the hook down is measured.

## Finishing it

When the eleven line recording lands:

```bash
node scripts-audio-timeline.mjs audio/<file> --lines 11 \
  --script audio/<script>.txt \
  --names intro,hook,blast,aiUsers,question,keployUsers,record,generate,replay,verify,payoff \
  --out src/videos/ai-regressions/timelineFromAudio11.ts
```

Point `ReelPersonasV9` at that timeline instead of `timelinePersonasV9.ts`,
re-check that every animation still completes inside its new duration, render,
then:

```bash
node scripts-attach-audio.mjs out/ai-regressions/personas-v9-<len>s.mp4 audio/<file>
```

The script file needs eleven lines, the new one first:

```
Your app is going to break in production if you're writing the tests with AI.
Your AI wrote the feature, wrote the tests based on the code it wrote, and you shipped it.
... the existing nine ...
```

## Still illustrative

The seven skeleton rows, the `3` in the failure banner, the dependency
latencies and the eleven verification rows are all stylised. Fine for a reel,
not for docs.
