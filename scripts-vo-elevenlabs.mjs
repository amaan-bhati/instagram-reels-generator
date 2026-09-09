/**
 * Turns a timed VO script into blocks you can paste straight into ElevenLabs.
 *
 * Two outputs, because there are two ways to do this and they are not equal:
 *
 *   *-paste-*.txt   ONE block per voice, with <break> tags sized to the gaps.
 *                   Paste, generate, drop on the timeline at 0.00. Fast, and
 *                   approximately in sync. It drifts, because the break math
 *                   assumes a speech rate and the model picks its own.
 *
 *   *-lines-*.txt   One line per row, each with the timecode to place it at.
 *                   Generate each separately and position them. Tedious, and
 *                   exactly in sync, because nothing can push anything else.
 *
 * For a two speaker script the paste files are split per voice: each track
 * carries that speaker's lines with breaks covering the other speaker's turns,
 * so layering the two tracks reconstructs the dialogue.
 *
 * ElevenLabs caps a single break tag at about 3s, so longer gaps are chained.
 *
 *   node scripts-vo-elevenlabs.mjs src/videos/ai-regressions/vo/personas-v7-duo.json
 */
import {readFileSync, writeFileSync} from 'fs';

/** ElevenLabs' rough conversational pace. Only used to size the breaks. */
const WPS = 2.5;
const MAX_BREAK = 2.5;

const file = process.argv[2];
if (!file) {
  console.error('usage: node scripts-vo-elevenlabs.mjs <vo json>');
  process.exit(2);
}
const d = JSON.parse(readFileSync(file, 'utf8'));
const base = file.replace(/\.json$/, '');
const words = (t) => t.trim().split(/\s+/).length;
const spoken = (t) => words(t) / WPS;

/** Chain tags, since one tag cannot hold an arbitrary gap. */
const breakTags = (seconds) => {
  let left = Math.max(0, seconds);
  const out = [];
  while (left > 0.05) {
    const chunk = Math.min(left, MAX_BREAK);
    out.push(`<break time="${chunk.toFixed(1)}s" />`);
    left -= chunk;
  }
  return out.join(' ');
};

const tc = (s) => {
  const m = Math.floor(s / 60);
  return `${String(m).padStart(2, '0')}:${(s - m * 60).toFixed(2).padStart(5, '0')}`;
};

const voices = Object.keys(d.voices);

for (const v of voices) {
  const mine = d.segments.filter((s) => s.voice === v);
  if (!mine.length) continue;

  // ---- paste block: one continuous script with breaks ----
  let cursor = 0;
  const parts = [];
  for (const s of mine) {
    const gap = s.start - cursor;
    if (gap > 0.05) parts.push(breakTags(gap));
    parts.push(s.text);
    cursor = s.start + spoken(s.text);
  }
  const suffix = voices.length > 1 ? `-${v.toLowerCase()}` : '';
  writeFileSync(`${base}-paste${suffix}.txt`, parts.join(' ') + '\n');

  // ---- per line block: exact placement ----
  const lines = mine
    .map((s) => `[${tc(s.start)}]  ${s.text}`)
    .join('\n');
  writeFileSync(
    `${base}-lines${suffix}.txt`,
    `# ${d.composition} ${voices.length > 1 ? v : 'narrator'}\n` +
      `# Generate each line separately, place at the timecode shown.\n` +
      `# Voice id: ${d.voices[v].elevenlabsVoiceId}\n` +
      `# stability ${d.voices[v].stability} | similarity ${d.voices[v].similarityBoost} | style ${d.voices[v].style}\n\n` +
      lines +
      '\n',
  );

  const total = mine.reduce((a, s) => a + words(s.text), 0);
  console.log(
    `  ${v.padEnd(8)} ${String(mine.length).padStart(2)} lines, ${String(total).padStart(3)} words  ->  ${base}-paste${suffix}.txt  +  ${base}-lines${suffix}.txt`,
  );
}
console.log(`\nspeech rate assumed for break sizing: ${WPS} words/sec`);
