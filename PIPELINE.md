# The pipeline

Five stages, each one a file on disk that the next stage reads. Nothing is held
in a chat window, so any stage can be re-run on its own.

```
  idea            you, or an idea backlog
    |
  [1] TIMELINE    src/timeline*.ts        how long each beat runs
    |
  [2] SCENES      src/scenes/<variant>/   what appears on screen
    |             npm run render:<variant>  ->  out/<name>.mp4      SILENT VIDEO
    |
  [3] SCRIPT      npm run vo:generate     ->  vo/<name>.json        TIMED LINES
    |             npm run vo:check            fails if a line cannot fit
    |             npm run vo:export       ->  vo/<name>.md + .srt
    |
  [4] VOICE       npm run vo:voice        ->  ElevenLabs per line
    |
  [5] MUX         (same command)          ->  out/<name>-voiced.mp4  SHIPPABLE
```

## Why the timeline is stage one

Most people write the script first and then try to cut picture to it. That
inverts the hard constraint. A reel has a fixed length, the animation has a
fixed rhythm, and the voice is the only element that can be freely rewritten.
So the durations come first, they generate the word budgets, and the script is
written to fit them. That is why sync is never an issue later: the script was
never allowed to be the wrong length.

## Stage 3, in detail

```bash
# write a draft from the video itself
export ANTHROPIC_API_KEY=...          # or: ant auth login
node scripts-vo-generate.mjs \
  --timeline src/timelinePersonas.ts \
  --scenes   src/scenes/personas \
  --video    out/personas-40s.mp4 \
  --style    duo \
  --out      vo/draft-duo.json
```

`scripts-vo-generate.mjs` reads the timeline for durations and the scene files
for the on-screen strings, converts each scene's length into a word ceiling at
145 wpm, and briefs Claude with two rules that matter more than any other:

- **do not read the on-screen text back** - the viewer can already read it, so
  the voice either adds what the picture cannot say or says it differently
- **respect the word ceiling** - overrunning a scene is the one failure that
  cannot be fixed downstream

Then validate before you spend anything:

```bash
node scripts-vo-check.mjs vo/draft-duo.json
```

It fails on three things: a line with more words than its slot can hold, two
lines that overlap, and a line that runs past the end of the video. Fix the
copy and re-run. This is the gate; nothing reaches ElevenLabs until it passes.

## Stage 4, and why it is per line

```bash
export ELEVENLABS_API_KEY=...
node scripts-voiceover.mjs vo/personas-40s-duo.json --dry-run   # free preview
node scripts-voiceover.mjs vo/personas-40s-duo.json
node scripts-voiceover.mjs vo/personas-40s-duo.json --music assets/bed.mp3
```

The obvious approach is to send the whole script to TTS as one blob and lay the
result over the video. It always drifts, because the model picks its own pacing
and one long breath is enough to slide every later line off its scene.

Instead each line is synthesised on its own and placed at the exact offset the
script declares, with ffmpeg `adelay`. Line N cannot be moved by line N-1, so
sync is structural rather than lucky. Two useful consequences:

- **clips are cached** by a hash of voice, text and settings, so editing one
  line only re-bills that line
- **overruns are caught and fitted** with `atempo`, and anything needing more
  than 1.18x is flagged as a warning rather than silently rushed

## Adding a new variant

Variants are append-only. A new cut adds files, it never edits an existing one:

1. `src/timelineX.ts`
2. `src/scenes/x/`
3. `src/ReelX.tsx`
4. a `<Composition>` in `src/Root.tsx`
5. a new output filename
6. a row in `variants.json`

```bash
npm run check    # lint + variant guard + typecheck
```

`scripts-check-variants.mjs` fails if any registered variant lost a file, lost
its composition, drifted from its recorded frame count, or lost its rendered
mp4. That is what stops a later iteration from quietly breaking an earlier one.

## What is not automated yet, and what it would take

| Gap | What to add |
|---|---|
| Idea backlog | A `ideas/*.md` folder plus a generator that proposes angles from Keploy docs and changelogs. Feed the chosen one to stage 1. |
| Caption burn-in | The `.srt` from stage 3 already exists. Render it as a Remotion layer driven by the same json, so captions and voice cannot disagree. |
| Word-level sync | ElevenLabs has a `/with-timestamps` variant that returns character alignment. Store it beside each clip and animate on word boundaries instead of scene boundaries. |
| Multi-aspect output | Add 1:1 and 16:9 compositions over the same scenes. The kit is already resolution-agnostic; only the safe zones change. |
| Publishing | A final stage that posts `out/*-voiced.mp4` with the caption text. Needs platform API credentials. |

## Full command reference

```bash
npm run dev                 # Remotion Studio
npm run render:personas     # the chosen cut, silent
npm run check               # lint + variant guard + typecheck

npm run vo:all              # validate and export both existing scripts
node scripts-vo-generate.mjs --style duo --out vo/draft-duo.json
node scripts-vo-check.mjs   vo/draft-duo.json
node scripts-vo-export.mjs  vo/draft-duo.json
node scripts-voiceover.mjs  vo/draft-duo.json --dry-run
node scripts-voiceover.mjs  vo/draft-duo.json
```
