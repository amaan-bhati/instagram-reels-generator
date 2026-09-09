/**
 * Reads a finished voiceover and rebuilds the video timeline to match it.
 *
 * This inverts the pipeline. Up to now the timeline was fixed and the script
 * had to fit it, which is why every VO pass involved trimming words. Once real
 * audio exists, the audio is the immovable artifact: it has a length, and the
 * pauses in it are where the speaker actually stopped. So measure those, and
 * generate scene durations from them.
 *
 * Sync then cannot drift, because the scene boundaries ARE the speech
 * boundaries. There is nothing left to line up by hand.
 *
 * Detection is ffmpeg silencedetect rather than a transcription model. The
 * script is known, the line count is known, and all that is missing is where
 * the gaps fall, which is exactly what silencedetect returns. No model
 * download, no API call.
 *
 *   node scripts-audio-timeline.mjs <audio> --lines 10 [--noise -35] [--gap 0.35]
 *   node scripts-audio-timeline.mjs <audio> --lines 10 --out src/videos/.../timelineFromAudio.ts \
 *        --names hook,blast,aiUsers,question,keployUsers,record,generate,replay,verify,payoff
 */
import {execFileSync, spawnSync} from 'child_process';
import {existsSync, readFileSync, writeFileSync} from 'fs';

const args = process.argv.slice(2);
const audio = args.find((a) => !a.startsWith('--'));
const opt = (n, d) => {
  const i = args.indexOf(`--${n}`);
  return i > -1 ? args[i + 1] : d;
};

if (!audio || !existsSync(audio)) {
  console.error('usage: node scripts-audio-timeline.mjs <audio file> --lines N');
  console.error('       the audio file must exist. Put your mp3 somewhere readable and pass its path.');
  process.exit(2);
}

const expected = Number(opt('lines', '0'));
const noise = opt('noise', '-35');
const minGap = Number(opt('gap', '0.35'));
const fps = Number(opt('fps', '30'));
const out = opt('out', null);
const names = opt('names', '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

/**
 * silencedetect reports on STDERR, and it exits 0, so execFileSync's return
 * value (stdout only) is empty and the catch branch never fires. spawnSync and
 * both streams concatenated is the only reliable way to read it.
 */
const run = (cmd, a) => {
  const r = spawnSync(cmd, a, {encoding: 'utf8', maxBuffer: 32 * 1024 * 1024});
  return (r.stdout ?? '') + (r.stderr ?? '');
};
const runOut = (cmd, a) => execFileSync(cmd, a, {encoding: 'utf8'});

const duration = Number(
  runOut('ffprobe', [
    '-v', 'error',
    '-show_entries', 'format=duration',
    '-of', 'default=noprint_wrappers=1:nokey=1',
    audio,
  ]).trim(),
);

const log = run('ffmpeg', [
  '-hide_banner',
  '-i', audio,
  '-af', `silencedetect=noise=${noise}dB:d=${minGap}`,
  '-f', 'null', '-',
]);

const starts = [...log.matchAll(/silence_start:\s*([\d.]+)/g)].map((m) => Number(m[1]));
const ends = [...log.matchAll(/silence_end:\s*([\d.]+)/g)].map((m) => Number(m[1]));

// speech runs from the end of one silence to the start of the next
const speech = [];
let cursor = starts.length && starts[0] < 0.15 ? ends.shift() ?? 0 : 0;
for (const s of starts) {
  if (s <= cursor) continue;
  speech.push({start: cursor, end: s});
  cursor = ends.find((e) => e > s) ?? duration;
}
if (cursor < duration - 0.05) speech.push({start: cursor, end: duration});

console.log(`\n${audio}`);
console.log(`  length ${duration.toFixed(2)}s, threshold ${noise}dB, min gap ${minGap}s`);
console.log(`  detected ${speech.length} spoken segment(s)\n`);

console.log('  #   start     end     spoken    gap after');
speech.forEach((s, i) => {
  const gap = i + 1 < speech.length ? speech[i + 1].start - s.end : duration - s.end;
  console.log(
    `  ${String(i + 1).padStart(2)}  ${s.start.toFixed(2).padStart(6)}  ${s.end.toFixed(2).padStart(6)}  ${(s.end - s.start).toFixed(2).padStart(7)}  ${gap.toFixed(2).padStart(9)}`,
  );
});

/**
 * Merging detected segments back into script lines.
 *
 * silencedetect finds every pause, and a speaker pauses at commas as readily
 * as at full stops. On this recording the longest internal pause (0.52s, mid
 * line two) is LONGER than a real line boundary (0.40s, between lines nine and
 * ten), so no single gap threshold can separate them. Retuning is hopeless.
 *
 * What does work is using the script as a prior. The line count is known and so
 * are the word counts, which give the expected share of total speaking time per
 * line. This picks the grouping of consecutive segments into lines that best
 * matches those shares, by dynamic programming. Segments always merge with
 * neighbours, so a line can never be assembled out of order.
 */
const scriptFile = opt('script', null);
if (scriptFile) {
  if (!existsSync(scriptFile)) {
    console.error(`  script not found: ${scriptFile}`);
    process.exit(2);
  }
  const lines = readFileSync(scriptFile, 'utf8')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  const n = lines.length;
  const m = speech.length;

  if (m < n) {
    console.error(`  cannot merge: ${m} segments detected for ${n} script lines. Lower --gap.`);
    process.exit(1);
  }

  if (m > n) {
    const wordsOf = (t) => t.split(/\s+/).length;
    const weights = lines.map(wordsOf);
    const wTotal = weights.reduce((a, b) => a + b, 0);
    const dur = speech.map((s) => s.end - s.start);
    const dTotal = dur.reduce((a, b) => a + b, 0);
    const pre = [0];
    for (const d of dur) pre.push(pre[pre.length - 1] + d);
    const span = (i, k) => (pre[k + 1] - pre[i]) / dTotal;

    const INF = Infinity;
    const f = Array.from({length: n + 1}, () => new Array(m + 1).fill(INF));
    const back = Array.from({length: n + 1}, () => new Array(m + 1).fill(-1));
    f[n][m] = 0;
    for (let j = n - 1; j >= 0; j--) {
      for (let i = m - 1; i >= 0; i--) {
        // line j takes segments i..k, leaving at least one per remaining line
        for (let k = i; k <= m - (n - j); k++) {
          if (f[j + 1][k + 1] === INF) continue;
          const cost = Math.abs(span(i, k) - weights[j] / wTotal) + f[j + 1][k + 1];
          if (cost < f[j][i]) {
            f[j][i] = cost;
            back[j][i] = k;
          }
        }
      }
    }

    const merged = [];
    let i = 0;
    for (let j = 0; j < n; j++) {
      const k = back[j][i];
      merged.push({start: speech[i].start, end: speech[k].end, from: k - i + 1});
      i = k + 1;
    }

    console.log(`  merging ${m} detected segments into ${n} script lines\n`);
    console.log('   #  start     end   spoken   segs  line');
    merged.forEach((s, idx) => {
      console.log(
        `  ${String(idx + 1).padStart(2)}  ${s.start.toFixed(2).padStart(5)}  ${s.end.toFixed(2).padStart(6)}  ${(s.end - s.start).toFixed(2).padStart(6)}  ${String(s.from).padStart(5)}  ${lines[idx].slice(0, 46)}${lines[idx].length > 46 ? '...' : ''}`,
      );
    });
    console.log('');
    speech.length = 0;
    speech.push(...merged);
  }
}

if (expected && speech.length !== expected) {
  console.error(
    `\n  MISMATCH: expected ${expected} lines, detected ${speech.length}.` +
      `\n  Retune and run again. Too many segments means the threshold is splitting a line at` +
      `\n  an internal pause: raise --gap (try 0.5) or lower --noise (try -40).` +
      `\n  Too few means two lines are being merged: lower --gap (try 0.25).`,
  );
  process.exit(1);
}

/**
 * Each scene owns its line plus the pause that follows it, so every boundary
 * lands in silence and a cut can never chop a word.
 *
 * Boundaries are rounded CUMULATIVELY, from absolute times, and the durations
 * are then the differences. Rounding each scene independently lets error
 * accumulate: on the first run that put two of ten boundaries half a frame on
 * the wrong side of their own speech.
 *
 * The final scene is extended past the end of the audio by --tail so the
 * closing frame holds briefly and the mux cannot clip the last word.
 */
const tail = Number(opt('tail', '0.3'));
const bounds = [0];
// FLOOR, not round. Rounding can land a boundary a fraction AFTER the speech
// it is supposed to precede, which puts the first syllable of a line on the
// previous scene. Every gap here is at least 0.4s, twelve frames, so flooring
// stays well inside the silence and guarantees the cut comes first.
for (let i = 1; i < speech.length; i++) bounds.push(Math.floor(speech[i].start * fps));
// CEIL the end, so the video always covers the audio rather than clipping it.
bounds.push(Math.ceil((duration + tail) * fps));

const scenes = speech.map((s, i) => ({
  name: names[i] ?? `scene${i + 1}`,
  frames: bounds[i + 1] - bounds[i],
  secs: (bounds[i + 1] - bounds[i]) / fps,
  speechIn: s.start,
  speechOut: s.end,
  videoIn: bounds[i] / fps,
  videoOut: bounds[i + 1] / fps,
}));
const total = scenes.reduce((a, s) => a + s.frames, 0);

// every line must sit strictly inside the scene that shows it
let bad = 0;
for (const s of scenes) {
  if (s.speechIn < s.videoIn - 1e-9 || s.speechOut > s.videoOut + 1e-9) {
    console.error(
      `  BOUNDARY  ${s.name}: speech ${s.speechIn.toFixed(3)}..${s.speechOut.toFixed(3)} ` +
        `is not inside video ${s.videoIn.toFixed(3)}..${s.videoOut.toFixed(3)}`,
    );
    bad++;
  }
}
if (bad) {
  console.error(`\n  ${bad} boundary error(s).`);
  process.exit(1);
}
console.log(`  every line sits inside its own scene, tail ${tail}s past the audio\n`);

console.log(`\n  scene durations, ${fps}fps`);
for (const s of scenes) {
  console.log(`    ${s.name.padEnd(14)} ${String(s.frames).padStart(4)} frames  ${s.secs.toFixed(2)}s`);
}
console.log(`    ${'TOTAL'.padEnd(14)} ${String(total).padStart(4)} frames  ${(total / fps).toFixed(2)}s`);

if (out) {
  const body = scenes
    .map((s) => `  ${s.name}: ${s.frames},${' '.repeat(Math.max(1, 14 - s.name.length))}// ${s.secs.toFixed(2)}s`)
    .join('\n');
  writeFileSync(
    out,
    `/**\n` +
      ` * Timeline derived from the finished voiceover, not written by hand.\n` +
      ` *\n` +
      ` * Source: ${audio} (${duration.toFixed(2)}s)\n` +
      ` * Generated by scripts-audio-timeline.mjs. Every boundary sits inside a\n` +
      ` * pause in the recording, so a scene change never lands mid word and the\n` +
      ` * audio cannot drift against the picture.\n` +
      ` *\n` +
      ` * Regenerate rather than edit. If a beat needs longer, re-record that line.\n` +
      ` */\nexport const AT = {\n${body}\n} as const;\n\n` +
      `export const TOTAL_FROM_AUDIO = Object.values(AT).reduce((a, b) => a + b, 0); // ${total} = ${(total / fps).toFixed(2)}s\n`,
  );
  console.log(`\n  wrote ${out}`);
}
