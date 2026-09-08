/**
 * Turns a timed VO script into a voiced video.
 *
 * WHY PER SEGMENT: the naive approach sends the whole script to TTS as one
 * blob and lays the result over the video. It always drifts, because the model
 * decides its own pacing and one long breath is enough to slide every later
 * line off its scene. Here each line is synthesised on its own and placed at
 * the exact offset the script declares, so line N cannot be moved by line N-1.
 * Sync is structural rather than lucky.
 *
 * Clips are cached by a hash of voice + text + settings, so re-running after
 * editing one line only re-bills that line.
 *
 *   export ELEVENLABS_API_KEY=...
 *   node scripts-voiceover.mjs vo/personas-40s-duo.json
 *   node scripts-voiceover.mjs vo/personas-40s-duo.json --dry-run
 *   node scripts-voiceover.mjs vo/personas-40s-duo.json --music assets/bed.mp3
 */
import {createHash} from 'crypto';
import {execFileSync} from 'child_process';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'fs';
import {basename, dirname, join} from 'path';

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith('--'));
const dryRun = args.includes('--dry-run');
const musicIdx = args.indexOf('--music');
const music = musicIdx > -1 ? args[musicIdx + 1] : null;

if (!file) {
  console.error('usage: node scripts-voiceover.mjs <vo json> [--dry-run] [--music <file>]');
  process.exit(2);
}

const MODEL = process.env.ELEVENLABS_MODEL ?? 'eleven_multilingual_v2';
const FORMAT = 'mp3_44100_128';
/** atempo beyond this starts sounding rushed. Past it, cut words instead. */
const MAX_SPEEDUP = 1.18;

const d = JSON.parse(readFileSync(file, 'utf8'));
const name = basename(file).replace(/\.json$/, '');
const dir = join(dirname(file), 'audio', name);
mkdirSync(dir, {recursive: true});

const sh = (cmd, a) => execFileSync(cmd, a, {stdio: ['ignore', 'pipe', 'pipe']}).toString();
const probe = (f) =>
  Number(
    sh('ffprobe', [
      '-v', 'error',
      '-show_entries', 'format=duration',
      '-of', 'default=noprint_wrappers=1:nokey=1',
      f,
    ]).trim(),
  );

const key = process.env.ELEVENLABS_API_KEY;
if (!dryRun && !key) {
  console.error('ELEVENLABS_API_KEY is not set. Export it, or pass --dry-run to preview.');
  process.exit(1);
}

const tts = async (seg, cfg, out) => {
  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${cfg.elevenlabsVoiceId}?output_format=${FORMAT}`,
    {
      method: 'POST',
      headers: {'xi-api-key': key, 'content-type': 'application/json'},
      body: JSON.stringify({
        text: seg.text,
        model_id: MODEL,
        voice_settings: {
          stability: cfg.stability ?? 0.45,
          similarity_boost: cfg.similarityBoost ?? 0.75,
          style: cfg.style ?? 0.1,
          use_speaker_boost: true,
        },
      }),
    },
  );
  if (!res.ok) {
    throw new Error(`ElevenLabs ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
  writeFileSync(out, Buffer.from(await res.arrayBuffer()));
};

const clips = [];
let warned = 0;

for (const [i, seg] of d.segments.entries()) {
  const cfg = d.voices[seg.voice];
  if (!cfg) throw new Error(`voice ${seg.voice} not declared`);
  const slot = seg.end - seg.start;
  const hash = createHash('sha1')
    .update(JSON.stringify([cfg.elevenlabsVoiceId, seg.text, cfg, MODEL]))
    .digest('hex')
    .slice(0, 10);
  const raw = join(dir, `${String(i).padStart(2, '0')}-${seg.voice}-${hash}.mp3`);

  if (dryRun) {
    console.log(
      `  ${String(i).padStart(2)} ${seg.scene.padEnd(12)} ${seg.voice.padEnd(8)} ${seg.start.toFixed(2)}s slot ${slot.toFixed(2)}s  "${seg.text}"`,
    );
    continue;
  }

  if (existsSync(raw)) {
    console.log(`  ${String(i).padStart(2)} cached   ${seg.scene}/${seg.voice}`);
  } else {
    process.stdout.write(`  ${String(i).padStart(2)} synth    ${seg.scene}/${seg.voice} ... `);
    await tts(seg, cfg, raw);
    console.log('done');
  }

  let clip = raw;
  const dur = probe(raw);
  if (dur > slot) {
    const ratio = dur / slot;
    if (ratio > MAX_SPEEDUP) {
      console.warn(
        `     WARNING ${seg.scene}/${seg.voice} is ${dur.toFixed(2)}s for a ${slot.toFixed(2)}s slot (${ratio.toFixed(2)}x). Speeding it up this much will sound rushed. Cut words instead.`,
      );
      warned++;
    }
    const fitted = raw.replace('.mp3', '-fit.mp3');
    sh('ffmpeg', [
      '-y', '-v', 'error',
      '-i', raw,
      '-filter:a', `atempo=${Math.min(ratio, 2).toFixed(4)}`,
      fitted,
    ]);
    console.log(`     fitted ${dur.toFixed(2)}s -> ${slot.toFixed(2)}s (atempo ${ratio.toFixed(3)})`);
    clip = fitted;
  }
  clips.push({clip, startMs: Math.round(seg.start * 1000)});
}

if (dryRun) {
  console.log(`\ndry run: ${d.segments.length} segments, nothing synthesised, no credits spent.`);
  process.exit(0);
}

// place every clip at its declared offset, then mix
const inputs = [];
const filters = [];
clips.forEach((c, i) => {
  inputs.push('-i', c.clip);
  filters.push(`[${i + 1}:a]adelay=${c.startMs}:all=1[v${i}]`);
});
let mixIns = clips.map((_, i) => `[v${i}]`).join('');
let mixCount = clips.length;

if (music) {
  if (!existsSync(music)) throw new Error(`music not found: ${music}`);
  inputs.push('-i', music);
  filters.push(
    `[${clips.length + 1}:a]volume=0.13,afade=t=out:st=${(d.durationSeconds - 1.2).toFixed(2)}:d=1.2[bed]`,
  );
  mixIns += '[bed]';
  mixCount += 1;
}

filters.push(`${mixIns}amix=inputs=${mixCount}:normalize=0:dropout_transition=0[mixed]`);
filters.push(`[mixed]alimiter=limit=0.95,aresample=44100[aout]`);

const out = d.video.replace(/\.mp4$/, `-voiced-${name.endsWith('duo') ? 'duo' : 'single'}.mp4`);
sh('ffmpeg', [
  '-y', '-v', 'error',
  '-i', d.video,
  ...inputs,
  '-filter_complex', filters.join(';'),
  '-map', '0:v',
  '-map', '[aout]',
  '-c:v', 'copy',
  '-c:a', 'aac',
  '-b:a', '192k',
  '-shortest',
  out,
]);

console.log(`\nwrote ${out}`);
console.log(`  video ${probe(d.video).toFixed(2)}s, output ${probe(out).toFixed(2)}s`);
if (warned) console.log(`  ${warned} line(s) needed heavy speedup. Consider trimming them.`);
