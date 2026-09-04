import {readdirSync, readFileSync} from 'fs';
import {join} from 'path';
const dir = 'src/scenes';
let bad = 0;
for (const f of readdirSync(dir)) {
  const src = readFileSync(join(dir, f), 'utf8');
  src.split('\n').forEach((line, i) => {
    const m = line.match(/#[0-9a-fA-F]{3,8}\b/);
    if (m) { console.error(`${dir}/${f}:${i + 1}  raw hex ${m[0]} — import from theme.ts instead`); bad++; }
  });
}
if (bad) { console.error(`\n${bad} raw hex value(s) in scenes. DESIGN §1 violation.`); process.exit(1); }
console.log('✓ no raw hex in scenes — all colour comes from theme.ts');
