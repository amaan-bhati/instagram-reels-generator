# Keploy Reels — Remotion

9:16 short-form video for Keploy, built as code. First reel: **"The Happy Path Trap"** (38s).

## Run it

```bash
npm install
npm run dev        # Remotion Studio — scrub, hot-reload, jump to any frame
npm run render     # -> out/happy-path-trap.mp4
```

**Frame-check a single moment** (fast — no full render):
```bash
npx remotion still HappyPathTrap out/check.png --frame=630
```

**Check the safe zones** — open the `HappyPathTrap-SafeZone` composition in Studio.
Orange bands = the areas Instagram/LinkedIn UI covers. Nothing critical may sit in them.

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
  scenes/         S1..S7, one file per beat
  Reel.tsx        the cut (Series)
  Root.tsx        compositions
brand/            design docs
out/              renders + frame-checks
```

The `kit/` is the point. Reel #2 should reuse ~70% of it and add one or two new pieces.

## Before you ship — blockers

1. **Replace the terminal scenes with real captures.** DESIGN §0.4 requires real product
   behaviour. Scenes 5 and 6 currently use `<Terminal>` with lines *modelled* on Keploy's CLI.
   Record `keploy record` and `keploy test` for real (Docker/Linux — eBPF needs root), then
   swap in `<OffthreadVideo src={staticFile('record.mp4')} />`. The scene structure and
   captions stay as-is.
2. **Swap the wordmark.** `KeployMark` in `kit/Text.tsx` is a placeholder — drop in the real
   logo asset.
3. **Confirm the green token.** DESIGN §1 lists `masked` as `#059668`; theme.ts uses `#059669`
   (Tailwind emerald-600). `#059668` looks like a typo — confirm which is correct.
4. **Run the house §16 "Zero AI slop" checklist** from `Videos/DESIGN.md` — that file isn't
   in this repo yet.

## Still missing from the design system

- `Videos/DESIGN.md` — the house SSOT. The brand doc here is a *per-video* spec that
  inherits from it. Tokens and typography were taken from the per-video doc.
- `keploy-mcp-contract-break/` — the doc says to reuse this Remotion project as scaffold.
  It isn't on this machine, so `theme.ts`, the kit, `mseg()` and the camera helpers were
  rebuilt from the spec. Diff them against the original when you get it.
- `context.md` — the claim-boundary doc for this video's angle.
