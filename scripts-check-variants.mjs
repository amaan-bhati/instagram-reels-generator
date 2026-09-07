/**
 * Guards every previous cut.
 *
 * A new iteration must ADD a variant: its own timeline, its own scenes folder,
 * its own composition and its own output file. It must never edit or delete an
 * existing one. This script fails if any registered variant lost a file, a
 * composition, or its rendered mp4, and if a frame count drifts from the
 * number recorded in variants.json.
 */
import {existsSync, readFileSync, statSync} from 'fs';

const reg = JSON.parse(readFileSync('variants.json', 'utf8'));
const root = readFileSync('src/Root.tsx', 'utf8');
let bad = 0;
const fail = (m) => {
  console.error(`  FAIL  ${m}`);
  bad++;
};

for (const v of reg.variants) {
  const tag = `${v.composition} (${v.seconds}s, ${v.status})`;
  for (const key of ['timeline', 'reel', 'scenes', 'script']) {
    if (!existsSync(v[key])) fail(`${tag}: missing ${key} at ${v[key]}`);
  }
  if (!root.includes(`id="${v.composition}"`)) {
    fail(`${tag}: composition id not registered in src/Root.tsx`);
  }
  // frame count must still match what the doc claims
  if (existsSync(v.timeline)) {
    const nums = [...readFileSync(v.timeline, 'utf8').matchAll(/:\s*(\d+),\s*\/\//g)].map((m) =>
      Number(m[1]),
    );
    const total = nums.reduce((a, b) => a + b, 0);
    if (nums.length && total !== v.frames) {
      fail(`${tag}: timeline sums to ${total} frames, variants.json says ${v.frames}`);
    }
  }
  if (!existsSync(v.output)) {
    fail(`${tag}: rendered output missing at ${v.output}. Re-render it, do not delete it.`);
  } else if (statSync(v.output).size < 500_000) {
    fail(`${tag}: ${v.output} is suspiciously small (${statSync(v.output).size} bytes)`);
  }
}

for (const a of reg.archived) {
  if (!existsSync(a.output)) fail(`archived cut missing: ${a.output} (${a.seconds}s)`);
}

if (bad) {
  console.error(`\n${bad} variant guard violation(s). A previous cut was broken.`);
  process.exit(1);
}
console.log(
  `OK: ${reg.variants.length} variants + ${reg.archived.length} archived cuts all intact`,
);
