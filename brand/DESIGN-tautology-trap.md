# DESIGN — "The Tautology Trap"
### Visual + motion spec for this video. Pairs with `context.md` (the angle/claims).

> **Inheritance.** The house SSOT is `Videos/DESIGN.md` — read it for the non-negotiables
> (9:16, pure white, orange accent, one-idea-per-scene, safe zones, settled holds, honesty,
> render/versioning). THIS file records where this video's *family* differs and the specifics
> for its scenes.
>
> **Family = code-native short** (same as `keploy-mcp-contract-break`), NOT the diagram/comet
> explainer family. Concretely that means: **DM Sans** (not Poppins), **light code cards +
> camera moves over real screenshots** (not FlowComets/Pipe diagrams), semantic **red/green
> diff**, mascot brand mark. Reuse the contract-break Remotion project as the scaffold.

---

## 0. Non-negotiables (this video)
1. **9:16 · 1080×1920 · 30fps · H.264.** Pure white bg + faint dot grid. Never dark.
2. **DM Sans** for UI/headings/body, **DM Mono** for code + endpoints + JSON.
3. **One accent: Keploy orange** (`#F26A21`). **Green = pass/baseline-matches**, **Red = fail/drift**. No other accents.
4. Real product behavior only. Every terminal line / report / assertion on screen must be real (captured, not mocked up). See `context.md` §6 claim boundaries.
5. Camera always moving subtly (push-in or pan). Every scene ends on a **~0.8s settled hold**.
6. Critical content above the **bottom safe zone** (y ≈ 1790).
7. Back up the previous render before re-rendering.

---

## 1. Tokens (`src/theme.ts` — reuse contract-break's verbatim)
| Token | Hex | Use |
|---|---|---|
| `bg` | `#FFFFFF` | base |
| `bgDeep` | `#F4F6F8` | subtle panels |
| `dot` | `#E7EBF0` | dot grid |
| `codeBg` / `codeBar` / `codeStroke` | `#FFFFFF` / `#EEF1F5` / `#E2E8F0` | light editor card |
| `synKey` / `synStr` / `synPunc` | `#2563EB` / `#15803D` / `#64748B` | code syntax |
| `orange` / `orangeDeep` / `amber` | `#F26A21` / `#E8590E` / `#F9A825` | accent + gradient |
| `exposed` / `exposedBg` | `#DC2626` / `#FEE2E2` | **fail / drift** (red) |
| `masked` / `maskedBg` | `#059668` / `#86EFAC` | **pass / baseline** (green) |
| `text` / `textDim` / `textFaint` | `#1C2434` / `#64748B` / `#94A3B8` | charcoal / secondary / line-nos |

Gradient, radius, shadow (`soft`/`card`/`orange`/`red`), and `highlight` (lit top edge) all
identical to contract-break's `theme.ts`. Never hardcode a hex in a scene — import `theme.colors` as `C`.

**Semantic reframe for THIS video:** green now means "**matches the recorded reality / baseline**",
red means "**diverged from reality**". Same palette, oracle-specific meaning. Keep it consistent.

---

## 2. Typography
- **DM Sans** — headings 700, body/labels 500–600. **DM Mono** — all code, endpoints (`POST /api/products`), JSON, terminal, assertions.
- Min on-screen text ~30px (watched small). Code font tuned to ~27px / nowrap so lines don't wrap (contract-break lesson).
- Letter-spacing: headings tight; mono default.

---

## 3. The two visual motifs (this video's signature)
This story lives or dies on one **contrast**: the AI's own test (green, but circular) vs the
recorded-from-reality test (red, catches it). Build every scene to serve that contrast.

**Motif A — the mirror (tautology).** Two stacked cards: `product.controller.js` (the code) and
`product.test.js` chip **`AI-generated`**. Draw a subtle looping tie between them (a thin orange
connector or a mirrored highlight) to *show* the test reflects the code. Assertions are green — but
the point is they can only ever agree with the code. Optional annotation pill: `asserts what the code does`.

**Motif B — the oracle (real traffic).** A distinct visual vocabulary for *recording*: the running
app + a **capture** element (label `keploy record · eBPF`, breathing REC dot) pulling **real
request/response** off the wire into a `recorded test` card. This is the "answer key from the real
world." Keep it clearly different from Motif A so the viewer feels the independence.

> Do NOT reuse the ATG/"suite created by the agent" screen from the contract-break video here —
> that would undercut the independent-oracle claim (`context.md` §5 🚫). Recording is the hero.

---

## 4. Scene plan (maps to `context.md` §7 demo)
Light theme, camera moving throughout. Screen-rec scenes = your live capture (record-replay runs
in **Docker/Linux** because eBPF needs root).

| # | Scene | Type | Beat | Color |
|---|---|---|---|---|
| 1 | **Problem** | Remotion | AI writes `createProduct` **and** its test → Motif A. Green checks. Hook: the test only agrees with the code. | green (hollow) |
| 2 | **The trap** | Remotion | Spotlight the mirror: `expect(res.body).toEqual(codeReturns)`. Annotation: *asserts what the code does, not what it should.* Dim/vignette the rest. | orange focus |
| 3 | **Record reality** | screen-rec | `keploy record` → hit real endpoints → real traffic captured + deps mocked. Motif B. This is the oracle being minted. | orange (capture) |
| 4 | **AI refactors** | Remotion | Agent "cleans up" the route (wrap in `{ data }` / rename field). AI's unit test re-runs → **still green**. Two-tone pill: `AI test green · reality says otherwise`. | green + red |
| 5 | **Replay reality** | screen-rec | `keploy test` → replay captured traffic → **RED** on the exact field that diverged. | red |
| 6 | **Payoff** | Remotion (pan over real report) | Real failed report. Contrast panel: mocked AI test (✅) beside recorded test (❌) on the *same* change. Land the line: *the AI can't grade its own homework.* | red + green |

No CTA card unless you want one; closer can ride the payoff hold (contract-break precedent).

---

## 5. Camera & motion
- **Push-in** on card/spotlight scenes (~2–4% over the scene), `easeInOutCubic`. **Pan** across the real report/terminal screenshots.
- **Big-screenshot pans:** animate a `background-image` div's `background-size` (hold a known-good DW) + `background-position` — do NOT use `<Img>` width or transform-scale (mis-render at certain values). Use the `mseg()` multi-segment easing helper. *(Both hard-won from contract-break — reuse them.)*
- Entrances: the standard settled spring (`damping 16, mass .9, stiffness 130`). Stagger peers 3–4 frames. Character-by-character typewriter for code; backspace-and-retype for the refactor edit.
- Highlights: marker-style sweep (no hard box) for emphasis; a **red outline box** only for the failure token (`<missing>`/diverged field) and an **orange fill** for the cause (the new wrapper key). Place highlight coords by **programmatic detection** on the real screenshot, never by eyeballing (contract-break lesson).
- Secondary motion always on: REC dot breathes, subtle hero breathe, camera never fully static.

---

## 6. Legibility & honesty checks
- Pass/fail always = color **+** icon (✅/❌) **+** label (`200` / `<missing>` / `FAILED`). Never color alone.
- An element settles ≥0.6s before it changes.
- On-screen claims must match `context.md` §6. If a frame implies "Keploy proves correctness," fix it — it's a regression/drift oracle.
- Numbers/stats on screen require a sourced citation (`context.md` §8) — otherwise keep it qualitative.

---

## 7. Build / render
- Scaffold: copy `keploy-mcp-contract-break/` (theme, kit, fonts, scenes patterns, `mseg`, camera helpers). Change only content.
- `npm run dev` (studio) · frame-check stills for every changed scene before a full render.
- Preserve the previous mp4 (`out/tautology-vN.mp4`) before re-rendering.
- Run the house **§16 "Zero AI slop" checklist** from `Videos/DESIGN.md` before shipping.

---

## 8. Where this diverges from the house SSOT (note deliberately)
- **Font:** DM Sans / DM Mono (house default is Poppins) — matches the code-native shorts family.
- **Visual system:** code cards + real-screenshot camera work + semantic diff (house signature is FlowComets/Pipe diagrams). Both are valid Keploy families; this video is the former.
- **Length:** shorts here have run 45–60s (house target 25–35s) — acceptable for teaching-depth technical pieces; trim holds first if tightening.
