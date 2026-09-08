/**
 * Stage 1 of the voiceover pipeline: write the script from the video itself.
 *
 * The timeline file is already the source of truth for how long every scene
 * runs, and the scene files already contain every word that appears on screen.
 * That is everything needed to brief a writer, so this reads both, turns the
 * durations into per scene word budgets, and asks Claude for lines that fit.
 *
 * Two rules are baked into the brief because they are the ones a human gets
 * wrong: the voice must not read the on-screen text back (the viewer can
 * already see it), and every line has a hard word ceiling derived from its
 * scene length rather than from taste.
 *
 *   export ANTHROPIC_API_KEY=...        # or: ant auth login
 *   node scripts-vo-generate.mjs --timeline src/timelinePersonas.ts \
 *        --scenes src/scenes/personas --style single --out vo/draft-single.json
 *
 * Then: vo-check -> vo-export -> voiceover.
 */
import Anthropic from '@anthropic-ai/sdk';
import {readFileSync, readdirSync, writeFileSync} from 'fs';
import {join} from 'path';

const arg = (n, d) => {
  const i = process.argv.indexOf(`--${n}`);
  return i > -1 ? process.argv[i + 1] : d;
};

const timelineFile = arg('timeline', 'src/timelinePersonas.ts');
const scenesDir = arg('scenes', 'src/scenes/personas');
const style = arg('style', 'single');
const out = arg('out', `vo/draft-${style}.json`);
const video = arg('video', 'out/personas-40s.mp4');
const fps = 30;
const WPS = 2.42; // 145 wpm, the pace scripts-vo-check.mjs validates against

// ---- durations straight out of the timeline ----
const tl = readFileSync(timelineFile, 'utf8');
const scenes = [...tl.matchAll(/^\s{2}(\w+):\s*(\d+),/gm)].map((m) => ({
  scene: m[1],
  frames: Number(m[2]),
}));
if (!scenes.length) throw new Error(`no scene durations found in ${timelineFile}`);

let f = 0;
for (const s of scenes) {
  s.start = f / fps;
  s.end = (f + s.frames) / fps;
  s.seconds = s.frames / fps;
  s.wordBudget = Math.floor(s.seconds * WPS);
  f += s.frames;
}
const total = f / fps;

// ---- what is already on screen, so the voice can avoid repeating it ----
const onScreen = readdirSync(scenesDir)
  .filter((n) => n.endsWith('.tsx'))
  .sort()
  .map((n) => `--- ${n} ---\n${readFileSync(join(scenesDir, n), 'utf8')}`)
  .join('\n\n');

const styleBrief =
  style === 'duo'
    ? `Two speakers, DEV and GUIDE. DEV shipped the thing and is a little sheepish then curious; GUIDE is steady and unimpressed but never smug. Give DEV several very short interjections (two to four words) because those are what make it feel live rather than read. Longer scenes should hand off between them at least once.`
    : `One narrator. Calm and dry, a developer talking to a developer, not an ad read.`;

const prompt = `You are writing the voiceover for a 9:16 developer marketing video that is already animated and locked. Your job is to write lines that fit exactly.

VIDEO: ${total.toFixed(1)} seconds at ${fps}fps.

SCENES, with the hard word budget for each (${WPS} words per second, which is a comfortable 145 wpm):

${scenes.map((s) => `- ${s.scene}: ${s.start.toFixed(2)}s to ${s.end.toFixed(2)}s (${s.seconds.toFixed(2)}s) -> AT MOST ${s.wordBudget} words total across all lines in this scene`).join('\n')}

STYLE: ${styleBrief}

THE SOURCE OF THE SCENES (read the Heading, Caption, Chip and Sub strings to see what is already on screen):

${onScreen}

HARD RULES:
1. Never read the on-screen text back. The viewer can already read it. The voice adds what the picture cannot say, or says the same idea in different words. If a scene's caption is "Every kind of user", do not say "every kind of user".
2. Respect every word budget. A scene at 12 words means 12 words INCLUDING every speaker's lines in that scene. Going over means the audio overruns the scene, which is the one failure that cannot be fixed later.
3. Leave a small gap between consecutive lines: start the next line at least 0.10s after the previous one ends.
4. No em dashes and no en dashes anywhere. Use periods, commas or colons. This is a house rule.
5. Spell the product "Keploy". Never claim it proves correctness; it detects drift from recorded real traffic and generates cases from it.
6. Short sentences. This is heard once, at speed, probably on a phone, probably while scrolling.
7. The last line must end at or before ${total.toFixed(1)}s.

Return ONLY a JSON object, no prose and no code fence, in exactly this shape:

{
  "video": "${video}",
  "fps": ${fps},
  "durationSeconds": ${total},
  "style": ${JSON.stringify(style === 'duo' ? 'two speakers' : 'single narrator')},
  "voiceNotes": "<direction for whoever performs or synthesises this>",
  "voices": { ${style === 'duo' ? '"DEV": {...}, "GUIDE": {...}' : '"NARRATOR": {...}'} },
  "segments": [
    {"scene": "<scene key>", "start": 0.0, "end": 2.5, "voice": "<voice key>", "text": "<the line>"}
  ]
}

Each voice object must be: {"elevenlabsVoiceId": "REPLACE_WITH_VOICE_ID", "stability": 0.45, "similarityBoost": 0.75, "style": 0.15, "speed": 1.0}`;

const client = new Anthropic();
const res = await client.messages.create({
  model: 'claude-opus-5',
  max_tokens: 8000,
  thinking: {type: 'adaptive'},
  output_config: {effort: 'high'},
  messages: [{role: 'user', content: prompt}],
});

if (res.stop_reason === 'refusal') {
  console.error('refused:', res.stop_details);
  process.exit(1);
}

const text = res.content
  .filter((b) => b.type === 'text')
  .map((b) => b.text)
  .join('')
  .trim()
  .replace(/^```(?:json)?\n?/, '')
  .replace(/\n?```$/, '');

let parsed;
try {
  parsed = JSON.parse(text);
} catch {
  console.error('model did not return parseable JSON:\n', text.slice(0, 800));
  process.exit(1);
}

writeFileSync(out, JSON.stringify(parsed, null, 2) + '\n');
console.log(`wrote ${out} (${parsed.segments.length} segments)`);
console.log(`now run: node scripts-vo-check.mjs ${out}`);
