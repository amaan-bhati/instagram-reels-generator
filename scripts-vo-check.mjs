/**
 * Validates a voiceover script against the video it is meant to sit on.
 *
 * Three things go wrong when you write VO for a cut you did not time:
 *   1. a line has more words than its slot can hold, so TTS overruns the scene
 *   2. two lines overlap, so two voices talk at once
 *   3. the last line runs past the end of the video
 *
 * This catches all three before you spend ElevenLabs credits.
 *
 * Budget assumes 2.42 words per second, which is a comfortable 145 wpm. Short
 * interjections read faster than that in practice, so a pass here has headroom.
 *
 *   node scripts-vo-check.mjs vo/personas-40s-duo.json
 */
import {readFileSync} from 'fs';

const WPS = 2.42;
const file = process.argv[2];
if (!file) {
  console.error('usage: node scripts-vo-check.mjs <vo json>');
  process.exit(2);
}

const d = JSON.parse(readFileSync(file, 'utf8'));
let bad = 0;
let words = 0;
let prevEnd = -1;

for (const s of d.segments) {
  const w = s.text.trim().split(/\s+/).length;
  words += w;
  const slot = s.end - s.start;
  const need = w / WPS;
  const tag = `${s.scene}/${s.voice}`;

  if (slot <= 0) {
    console.error(`  FAIL  ${tag}: slot is ${slot.toFixed(2)}s`);
    bad++;
  }
  if (need > slot) {
    console.error(
      `  FAIL  ${tag}: ${w} words needs ~${need.toFixed(2)}s, slot is ${slot.toFixed(2)}s. Cut ${Math.ceil((need - slot) * WPS)} word(s).`,
    );
    bad++;
  }
  if (s.start < prevEnd) {
    console.error(`  FAIL  ${tag}: starts at ${s.start}s, previous line ends at ${prevEnd}s`);
    bad++;
  }
  if (s.end > d.durationSeconds) {
    console.error(`  FAIL  ${tag}: ends at ${s.end}s, video is ${d.durationSeconds}s`);
    bad++;
  }
  if (!d.voices[s.voice]) {
    console.error(`  FAIL  ${tag}: voice "${s.voice}" is not declared in voices`);
    bad++;
  }
  prevEnd = s.end;
}

const speaking = d.segments.reduce((a, s) => a + (s.end - s.start), 0);
console.log(
  `${file}\n  ${d.segments.length} segments, ${words} words, ${(words / d.durationSeconds * 60).toFixed(0)} wpm`,
);
console.log(
  `  speaking ${speaking.toFixed(1)}s of ${d.durationSeconds}s (${((speaking / d.durationSeconds) * 100).toFixed(0)}% dense, ${(d.durationSeconds - speaking).toFixed(1)}s of air)`,
);

if (bad) {
  console.error(`\n${bad} problem(s). Fix before generating audio.`);
  process.exit(1);
}
console.log('  OK: every line fits its slot, no overlaps, nothing past the end');
