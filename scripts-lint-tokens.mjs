import {readdirSync, readFileSync, statSync} from 'fs';
import {join} from 'path';

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.tsx') || p.endsWith('.ts') ? [p] : [];
  });

let bad = 0;

// DESIGN §1 - never hardcode a hex in a scene
for (const p of walk('src/scenes')) {
  readFileSync(p, 'utf8')
    .split('\n')
    .forEach((line, i) => {
      const m = line.match(/#[0-9a-fA-F]{3,8}\b/);
      if (m) {
        console.error(`${p}:${i + 1}  raw hex ${m[0]}, import from theme.ts instead`);
        bad++;
      }
    });
}

// House copy rule - no em dashes or en dashes anywhere
for (const p of walk('src')) {
  readFileSync(p, 'utf8')
    .split('\n')
    .forEach((line, i) => {
      if (/[—–]/.test(line)) {
        console.error(`${p}:${i + 1}  em/en dash is not allowed: ${line.trim().slice(0, 70)}`);
        bad++;
      }
    });
}

if (bad) {
  console.error(`\n${bad} violation(s).`);
  process.exit(1);
}
console.log('OK: no raw hex in scenes, no em/en dashes anywhere');
