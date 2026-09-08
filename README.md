# Keploy Reels — Remotion

9:16 short-form video for Keploy, built as code. Current reel: **"The Blast Radius"** (60s).

## House rules (lint-enforced)

```bash
node scripts-lint-tokens.mjs
```
1. No raw hex in `src/scenes`. Colour comes from `theme.ts` only.
2. **No em dashes or en dashes anywhere.** Use periods, commas or colons.
3. One example only: PetClinic. Do not introduce a second app.
4. Nothing legible below y=1340. The platform's own UI sits there.

Prior cuts kept in `out/`: `happy-path-trap-v1.mp4` (38s), `blast-radius-v2.mp4` (55s, mixed
examples), `blast-radius-v3.mp4` (60s, terminal-heavy, pre-gradient).

**One example rule:** the whole reel uses PetClinic and nothing else. Scene 5 breaks
`/api/pettypes` and scene 10's verdict is that same endpoint's 404 — cause to detection.
If you add a scene, use PetClinic endpoints.

## Run it

```bash
npm install
npm run dev        # Remotion Studio — scrub, hot-reload, jump to any frame
npm run render     # -> out/blast-radius.mp4
```

**Frame-check a single moment** (fast — no full render):
```bash
npx remotion still BlastRadius out/check.png --frame=700
```

**Check the safe zones** — open the `BlastRadius-SafeZone` composition in Studio, or:
```bash
npx remotion still BlastRadius-SafeZone out/safezone.png --frame=700
```
The **red band** (below y=1340) is where Instagram/LinkedIn paint the profile row, caption and
action rail. Nothing legible may enter it. The blue box is the caption band. All content lives
in the upper-middle.

**Enforce the token rule** (DESIGN §1 — never hardcode a hex in a scene):
```bash
node scripts-lint-tokens.mjs
```

## Layout

```
src/
  theme.ts        design tokens — the ONLY place a hex may appear
  timeline.ts     scene durations, single source of truth for the cut
  lib/anim.ts     settle spring, mseg multi-segment easing, pushIn, breathe, typewriter
  kit/            reusable components — reuse these for every future reel
                  PersonaGraph = hub and spokes, `hub` + `count` props
                  Pipeline     = filling progress steps, counters, dot rows
                  TestCaseCard = skeleton test case + gradient method badge
                  SuiteRow     = pass/fail suite row, styled like Keploy's panel
                  FeatureMap   = the blast-radius map (shockwave + tile flips)
                  ProxyDiagram = record/replay architecture, `phase` prop flips it
                  VerdictCard  = Keploy's Buggy / AI-confidence panel
                  Compare      = two-panel "AI vs reality"
  scenes/         S1..S11, one file per beat
public/           keploy-logo.svg (lockup) + keploy-mark.svg (rabbit only)
  Reel.tsx        the 60s cut (Series)
  ReelShort.tsx   the 40s cut (Series)
  timelineShort.ts durations for the 40s cut
  scenes/short/   SH1..SH7, the 40s cut's own scenes
  Root.tsx        compositions
brand/            design docs + logo/
out/              renders + frame-checks
```

The `kit/` is the point. Reel #2 should reuse ~70% of it and add one or two new pieces.

## Before you ship — blockers

1. **Replace scene 10's terminal with a real capture.** DESIGN §0.4 requires real product
   behaviour. Scene 10 uses `<Terminal>` with lines *modelled* on Keploy's CLI. Record
   `keploy test` for real (Docker/Linux — eBPF needs root), then swap in
   `<OffthreadVideo src={staticFile('test.mp4')} />`. Scenes 7 and 9 are architecture
   diagrams, not product output, so they're fine as drawn.
2. **Confirm the verdict-panel copy.** Scene 9 recreates the real Keploy UI but the explanation
   text is shortened to stay legible at reel scale. Check the wording still matches behaviour.
2. **Confirm the green token.** DESIGN §1 lists `masked` as `#059668`; theme.ts uses `#059669`
   (Tailwind emerald-600). `#059668` looks like a typo — confirm which is correct.
3. **Run the house §16 "Zero AI slop" checklist** from `Videos/DESIGN.md` — that file isn't
   in this repo yet.

## Still missing from the design system

- `Videos/DESIGN.md` — the house SSOT. The brand doc here is a *per-video* spec that
  inherits from it. Tokens and typography were taken from the per-video doc.
- `keploy-mcp-contract-break/` — the doc says to reuse this Remotion project as scaffold.
  It isn't on this machine, so `theme.ts`, the kit, `mseg()` and the camera helpers were
  rebuilt from the spec. Diff them against the original when you get it.
- `context.md` — the claim-boundary doc for this video's angle.
