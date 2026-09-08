/**
 * Emits the human and machine formats from a VO json:
 *   <name>.md   a read-along script with timecodes, for recording or review
 *   <name>.srt  subtitles, for platforms that want an upload or for burn-in
 *
 *   node scripts-vo-export.mjs vo/personas-40s-duo.json
 */
import {readFileSync, writeFileSync} from 'fs';

const file = process.argv[2];
if (!file) {
  console.error('usage: node scripts-vo-export.mjs <vo json>');
  process.exit(2);
}
const d = JSON.parse(readFileSync(file, 'utf8'));
const base = file.replace(/\.json$/, '');

const tc = (s) => {
  const m = Math.floor(s / 60);
  const sec = s - m * 60;
  return `${String(m).padStart(2, '0')}:${sec.toFixed(2).padStart(5, '0')}`;
};
const srtTc = (s) => {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = Math.floor(s % 60);
  const ms = Math.round((s - Math.floor(s)) * 1000);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')},${String(ms).padStart(3, '0')}`;
};

// ---- markdown ----
const scenes = [...new Set(d.segments.map((s) => s.scene))];
let md = `# Voiceover: ${d.composition} (${d.style})\n\n`;
md += `**Video** \`${d.video}\` · **Length** ${d.durationSeconds}s · **fps** ${d.fps}\n\n`;
md += `## Direction\n\n${d.voiceNotes}\n\n`;
md += `## Voices\n\n`;
for (const [k, v] of Object.entries(d.voices)) {
  md += `- **${k}** \`${v.elevenlabsVoiceId}\` · stability ${v.stability} · similarity ${v.similarityBoost} · style ${v.style}\n`;
}
md += `\n## Script\n\n`;
for (const scene of scenes) {
  const segs = d.segments.filter((s) => s.scene === scene);
  const a = Math.min(...segs.map((s) => s.start));
  const b = Math.max(...segs.map((s) => s.end));
  md += `### ${scene}  ·  ${tc(a)} to ${tc(b)}\n\n`;
  for (const s of segs) {
    md += `\`${tc(s.start)}\` **${s.voice}**  ${s.text}\n\n`;
  }
}
const words = d.segments.reduce((a, s) => a + s.text.trim().split(/\s+/).length, 0);
md += `---\n\n${words} words across ${d.segments.length} lines, ${(words / d.durationSeconds * 60).toFixed(0)} wpm.\n`;
writeFileSync(`${base}.md`, md);

// ---- srt ----
let srt = '';
d.segments.forEach((s, i) => {
  srt += `${i + 1}\n${srtTc(s.start)} --> ${srtTc(s.end)}\n`;
  srt += Object.keys(d.voices).length > 1 ? `${s.voice}: ${s.text}\n\n` : `${s.text}\n\n`;
});
writeFileSync(`${base}.srt`, srt);

console.log(`wrote ${base}.md and ${base}.srt`);
