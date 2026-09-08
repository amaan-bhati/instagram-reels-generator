# Script: "Mocks Only v2"  ·  HTTPS troubleshooting, deeper (44s)

**Length** 44.0s (1320 frames @ 30fps) · **Format** 9:16, 1080x1920 · **Audio** none
**Composition** `MocksOnly44` · **Render** `npm run render:https2`
**Stack shown** Go + Gin + Postgres
**Supersedes** nothing. `MocksOnly42` stays as its own cut.

## What changed from v1, and why only this

The second brief repeated most of the first. Two things in it were genuinely
new asks, and this pass spends its extra four seconds on exactly those:

| Pillar | v1 | v2 |
|---|---|---|
| Diagnostic checklist | **one question** (`is mocks.yaml empty too?`) as a two way branch | **four ordered checks**, cheapest first, with the row that produces this symptom badged `YOU ARE HERE` |
| CA certificate setup | **one shell line** (`SSL_CERT_FILE`) | **three environments**: local machine, Docker, and the Go runtime that performs the lookup |

Everything else is v1 unchanged: the symptom tree, the HTTP versus HTTPS
comparison, the ingress/egress asymmetry, the verify tree, the payoff.

## Why the checklist beats the branch

A flat list of things to try is the weakest form of troubleshooting content,
because the viewer still has to work out which item applies to them.

These four are ordered so that steps 1, 2 and 3 are all the same class of
cause: *Keploy never got into the path*. And every one of them would leave
`mocks.yaml` empty too. So the symptom itself eliminates them. That is why
step 4 can carry a badge, and why the caption is "mocks exist, so one to three
already passed".

The list stops being a list and becomes a position.

| # | Check | If not |
|---|---|---|
| 1 | `is mocks.yaml populated?` | if it is empty, Keploy never attached at all |
| 2 | `did keploy start the app, with -c?` | attaching to an already running process misses the sockets |
| 3 | `enough privileges for eBPF?` | without root or CAP_BPF the hooks never load |
| 4 | `does the app trust Keploy CA?` | **traffic is seen, but stays encrypted. This is mocks only.** |

## Why the CA panel is stacked, not tabbed

Tabs were the obvious design and are the wrong one here. Troubleshooting reels
get screenshotted for later reference, and a tab the viewer never saw is a tab
they cannot paste from. All three environments are on screen together.

| Environment | Shown |
|---|---|
| LOCAL MACHINE | `export SSL_CERT_FILE=/path/to/keploy/ca.crt` |
| DOCKER | `COPY ca.crt /usr/local/share/ca-certificates/` then `RUN update-ca-certificates` |
| GO RUNTIME | `crypto/x509  ->  SSL_CERT_FILE, SSL_CERT_DIR` |

## VERIFY BEFORE SHIPPING

| Claim | Status |
|---|---|
| Ingress becomes test cases, egress becomes mocks | **Confirm against Keploy's docs or source.** The video rests on this. It matches the reported symptom exactly, but it is reasoning from evidence, not a quoted fact. |
| Local Postgres traffic is plaintext, so egress records fine over HTTPS | **Confirm.** True for a default local Postgres, not for `sslmode=require`. |
| Check 2, attaching later misses sockets | **Confirm.** Stated as the reason `-c` exists; verify it is the actual failure mode. |
| Check 3, eBPF needs root or CAP_BPF | Safe. Standard Linux eBPF requirement. |
| `SSL_CERT_FILE` / `SSL_CERT_DIR` read by Go | Safe. Documented `crypto/x509` behaviour on unix. |
| Docker trust store flow | Safe. Standard Debian and Ubuntu `ca-certificates` flow. |
| The CA path | **Deliberately a placeholder on screen** with an orange chip reading "confirm the CA path for your version". Do not replace it with a real absolute path unless you have verified it for the version being demoed. |
| `4 test cases` / `6 mocks` | Illustrative. Replace with a real capture per DESIGN 0.4. |

The two directory listings are modelled, not captured. Record a real Gin plus
Postgres HTTPS run and swap them in before this ships.

## Beat sheet

| # | Scene | In | Dur | On screen | Caption |
|---|---|---|---|---|---|
| 1 | Symptom | 0:00 | 4.5s | `keploy/` tree: `mocks.yaml` green `6 mocks`, `tests/` red `0 test cases` | *It ran. It wrote mocks. Zero tests.* |
| 2 | Confusion | 0:04 | 4.0s | `OVER HTTP` (4 tests) beside `OVER HTTPS` (0 tests), mocks 6 in both | *Only the scheme changed.* |
| 3 | Why | 0:08 | 7.0s | Client, then Keploy plus Gin app, then Postgres. Red dashed inbound edge `TLS encrypted` / `✕ ingress: no test case`; green solid outbound edge `plaintext` / `✓ egress: mock written` | *One stream it can read. One it cannot.* |
| 4 | **Checklist** | 0:15 | 10.0s | "Work down the list, cheapest first." Four checks, row 4 badged `YOU ARE HERE` | *Mocks exist, so one to three already passed.* |
| 5 | **CA setup** | 0:25 | 10.5s | "So trust the CA wherever the app actually runs." Three stacked env cards. Chips: `all three are standard platform behaviour`, `confirm the CA path for your version` | *One certificate. Three places to install it.* |
| 6 | Verify | 0:36 | 5.0s | The same tree as scene 1, `tests/` now green `4 test cases` | *Same command. Same app. Now over TLS.* |
| 7 | Payoff | 0:41 | 3.0s | "Mocks but no tests?" then gradient "It is almost always the certificate." + logo | |

## New components this cut added

- `Checklist` (`src/kit/Checklist.tsx`) - ordered checks with an optional
  `active` row that renders the `YOU ARE HERE` badge. Reusable for any
  diagnostic video.
- `EnvFixList` (same file) - the same fix per environment, stacked, with a
  gradient env pill and mono command lines.

## Title options, since the brief asked

The brief ends by offering title options emphasising the fix. Ranked for the
high intent search terms it names:

1. **Keploy records mocks but no tests? Fix the HTTPS handshake** - leads with the exact symptom people paste into search
2. **Keploy HTTPS recording: why you get mocks.yaml and zero test cases** - carries both target keywords verbatim
3. **The "mocks only" bug is a certificate problem** - strongest hook, weakest search
4. **Debugging HTTPS with Keploy: Go, Gin and Postgres** - best for the framework audience, worst for the symptom searcher

Option 1 for YouTube, option 3 for the reel caption.

## Same house rules

- No em dashes or en dashes. Enforced by `npm run check`.
- No raw hex in scenes.
- Nothing legible below y=1340. Check with `MocksOnly44-SafeZone`.
- Never claims Keploy proves correctness.
