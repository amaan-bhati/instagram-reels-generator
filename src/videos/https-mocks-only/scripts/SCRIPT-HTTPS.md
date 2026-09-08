# Script: "Mocks Only"  ·  HTTPS troubleshooting (41.5s)

**Length** 41.5s (1245 frames @ 30fps) · **Format** 9:16, 1080x1920 · **Audio** none
**Composition** `MocksOnly42` · **Render** `npm run render:https`
**Stack shown** Go + Gin + Postgres, matching the original user report
**Source** community feedback on the Gorilla mux integration video: works over HTTP, HTTPS produces `mocks.yaml` and zero test cases

## VERIFY BEFORE SHIPPING

This cut makes technical claims about product internals, so read this section
before it goes anywhere.

| Claim | Status |
|---|---|
| Ingress becomes test cases, egress becomes mocks | **Confirm against Keploy's docs or source.** The whole video rests on this. It matches the reported symptom exactly, but it is reasoning from evidence, not a quoted fact. |
| Local Postgres traffic is plaintext, so egress records fine over HTTPS | **Confirm.** True for a default local Postgres, not for `sslmode=require`. |
| `SSL_CERT_FILE` makes the Go runtime trust a custom CA | Safe. Standard `crypto/x509` behaviour on Unix, documented in the Go stdlib, nothing to do with Keploy. |
| The CA certificate path | **Deliberately a placeholder on screen** (`/path/to/keploy/ca.crt`) with an orange chip reading "confirm the CA path for your version". Do not replace it with a real absolute path unless you have verified that path for the version you are demoing. A wrong path in a tutorial is worse than an obvious placeholder. |
| `4 test cases` / `6 mocks` in the file trees | Illustrative numbers. Replace with a real capture before shipping, per DESIGN 0.4. |

Two scenes are directory listings and one is a shell block. All three are
**modelled, not captured.** Record the real thing on a Gin + Postgres app over
HTTPS and swap them in.

## The angle

The symptom is confusing because the tool is succeeding and failing on the same
run. Keploy captures two separate streams:

- calls **into** the app become **test cases**
- the app's calls **out** to Postgres become **mocks**

Over HTTPS the inbound hop is TLS, so no HTTP request can be lifted out of it
and no test case is written. The hop to a local Postgres is still plaintext, so
it records perfectly and `mocks.yaml` fills up anyway.

That asymmetry is the explanation *and* the diagnostic. If `mocks.yaml` has
entries, Keploy is demonstrably in the path, so it is not a wiring problem, it
is a decryption problem. One question separates two completely different bugs.

## Beat sheet

| # | Scene | In | Dur | On screen | Caption |
|---|---|---|---|---|---|
| 1 | Symptom | 0:00 | 5.0s | "You moved to HTTPS. Keploy recorded this." A `keploy/` tree: `mocks.yaml` badged green `6 mocks`, `tests/` badged red `0 test cases` | *It ran. It wrote mocks. Zero tests.* |
| 2 | Confusion | 0:05 | 4.5s | "Same app. Same command." `OVER HTTP` (tests 4, mocks 6) beside `OVER HTTPS` (tests 0, mocks 6) | *Only the scheme changed.* |
| 3 | **Why** | 0:09 | 7.5s | "Keploy records two streams." Vertical flow: Client, then Keploy plus the Gin app, then Postgres. The inbound edge is a **red dashed** arrow reading `TLS encrypted` with `✕ ingress: no test case`. The outbound edge is a **green solid** arrow reading `plaintext` with `✓ egress: mock written`. Chip `which is why mocks.yaml fills up anyway` | *One stream it can read. One it cannot.* |
| 4 | **Diagnostic** | 0:17 | 6.5s | "So check one thing first." Question `is mocks.yaml empty too?` branching to `YES` -> "Keploy is not in the path. A wiring problem." and `NO` -> "Keploy is in the path. It just cannot decrypt. A certificate problem." | *Two different bugs. One question.* |
| 5 | **Fix** | 0:23 | 8.5s | "Give the app a trust store that includes Keploy." A shell block types itself in: locate the CA, `export SSL_CERT_FILE=$KEPLOY_CA`, record again. Chips: `SSL_CERT_FILE is standard Go, not Keploy specific` and `confirm the CA path for your version` | *Trust the CA, then record again.* |
| 6 | Verify | 0:32 | 6.5s | "Then the tree fills in." The **same tree as scene 1**, one badge changed: `tests/` now green `4 test cases` | *Same command. Same app. Now over TLS.* |
| 7 | Payoff | 0:38 | 3.0s | "Mocks but no tests?" then in gradient "It is almost always the certificate." + logo | |

## Why scene 6 reuses scene 1's tree

The fix has to be legible as a diff, not as a claim. Rendering the identical
component with one badge flipped from red to green means the viewer verifies the
result themselves, and it costs nothing because `FileTree` is already built.

## Two design notes

- **No lock emoji.** The encrypted edge was going to carry a padlock, but a
  colour emoji would have been the only off-palette pixel in the reel
  (DESIGN 0.3 allows one accent). The red dashed stroke says "encrypted" on its
  own, and the arrow reads cleaner without it.
- **The placeholder is on screen deliberately.** Scene 5 shows
  `/path/to/keploy/ca.crt` with a chip admitting the path varies. Saying "check
  this for your version" builds more trust with an advanced audience than a
  confident wrong path, and this cut is aimed squarely at people who will paste
  what they see.

## New components this cut added

- `FileTree` (`src/kit/FileTree.tsx`) - directory listing with per node
  filled/empty badges. Reusable for any before/after artifact video.
- `TlsFlow` (`src/kit/TlsFlow.tsx`) - vertical hop diagram with per edge
  annotations and outcomes.
- `DecisionBranch` (same file) - one question, two outcome cards, animated
  connectors. Reusable for any diagnostic video.

## Same house rules

- No em dashes or en dashes. Enforced by `npm run check`.
- No raw hex in scenes.
- Nothing legible below y=1340. Check with `MocksOnly42-SafeZone`.
- Never claims Keploy proves correctness.
