# Drop finished voiceover files here

Put the mp3 or wav in this folder and it is readable from the project root.

```bash
# 1. measure it and generate a matching timeline
node scripts-audio-timeline.mjs audio/<your file>.mp3 --lines 10 \
  --names hook,blast,aiUsers,question,keployUsers,record,generate,replay,verify,payoff \
  --out src/videos/ai-regressions/timelineFromAudio.ts

# 2. render a Reel against that timeline, then attach the audio
node scripts-attach-audio.mjs out/ai-regressions/<render>.mp4 audio/<your file>.mp3
```

`scripts-attach-audio.mjs` stops if the two lengths differ by more than 0.5s,
rather than silently clipping the last line.
