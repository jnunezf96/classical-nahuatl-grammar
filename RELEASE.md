# Grammar OS v1.2.49 release

Release name: **Applied Source Labels**

Browser build: **20261026-source-label-68**

Canonical origin: **https://jnunezf96.github.io/classical-nahuatl-grammar/**

## What's New

- Labels overlapping exact-input operations Applied Source instead of current Result.
- Preserves separate Source-editor routes, input identities, availability and execution. No new panel or grammatical change.

## Review scope and current limits

This build is available for independent review against Andrews. Automated and browser verification cover the recorded supported paths; they do not certify every lexical Source or grammatical combination.

- Conditional lexical readings and irregular formations require the corresponding genuine Source analysis.
- Same-tab reload supports the documented NNC/VNC and conjunction/supplementation input graphs, including original NNC writing context. Cross-device saving is unclaimed.
- Sentence particle/adverbial layers, including quin, now reload over supported host graphs. Source-only internally generated particle outputs remain unclaimed as separate editable application Results.
- The public writing controls are the four long-vowel insertions. Internal Writing owners retain their supported-context limits; this release adds no public Writing lane.
- Supported deverbal families now reload through bounded input recipes, including genuine finite predicates, primitive Core Sources, patientive/characteristic continuations and independent nominal operands. Each operand must have a supported recipe; arbitrary opaque grammar objects and cross-device saving remain unclaimed.
- Two-clause ownerhood supports explicit fixed-order subject or possessor supplementation validated by the existing relation owner. Invented Sources are hypothetical analyses, not attested lexical units. Other readings retain their own Source requirements.
- Nominal compound graphs with replayable operands, finite continuations and supported frequentative/future-object layers now persist in the same tab. Independent operand families retain their own persistence limits; opaque lexical/derived bridge recipes and universal cross-device saving remain unclaimed.
- Accumulated-session performance and some historical inventory provenance remain open qualifications.

See [Version History](CHANGELOG.md) for earlier releases.

## Build the public site

```text
npm run verify:launch
```

The command requires a clean committed worktree and writes the publishable
site to:

```text
../Classical_Nahuatl_Grammar/reports/generated/grammar_os_release/v1.2.49/site/
```

Publish only that `site/` directory. Do not publish the repository root.

## Hosting contract

- Serve over HTTPS and redirect HTTP to HTTPS.
- Serve `.mjs` as JavaScript and `.json`/`.webmanifest` with their correct MIME types.
- Keep `_headers` as the portable policy for hosts that support custom response headers.
- Enable Brotli or gzip compression.
- Keep `index.html` revalidated; versioned JavaScript and CSS may be cached immutably.
- Return 404 for development-only paths such as `/docs/`, `/scripts/`, and `/src/tests/`.

The generated release manifest lists every public file and its SHA-256 digest.

## Private play study handoff

- The consented study URL now presents a visible setup entry before the grammar
  workspace.
- Setup opens the existing Advanced recorder and focuses its consent control.
- Stopped recordings remain local and tell participants to download the JSON
  and give it to the person who invited them.
- The ordinary public URL does not expose the study entry.

## GitHub Pages boundary

GitHub Pages supplies the public HTTPS origin and HSTS for its `github.io`
domain, but does not expose custom response-header configuration. The document
therefore carries its CSP and referrer policy in HTML, while `_headers` records
the stronger portable policy for a future configurable edge. Verify actual
MIME types, compression, caching, and security headers after every deployment;
record provider limitations rather than treating `_headers` as applied.

## Rollback

Keep the immediately preceding release artifact. Rollback consists of
redeploying that immutable directory; grammar data does not require a database
migration.
