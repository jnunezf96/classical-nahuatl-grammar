# Grammar OS v1.2.17 release

Release name: **Repeated NNC Editing**

Browser build: **20261024-composition-36**

Canonical origin: **https://jnunezf96.github.io/classical-nahuatl-grammar/**

## What's New

- Reopens the current inner NNC subject, state and possessor choices after Make and supported reload.
- Restores the accepted NNC editor before applying saved pending choices; keeps acceptance exclusive to Make.
- Clears rejected saved drafts so the next editing attempt can recover from the accepted constituent.
- Retains the whole mixed construction, untouched siblings, reference restrictions and the original nounstem Source.

## Review scope and current limits

This build is available for independent review against Andrews. Automated and browser verification cover the recorded supported paths; they do not certify every lexical Source or grammatical combination.

- Conditional lexical readings and irregular formations require the corresponding genuine Source analysis.
- Same-tab reload supports the documented NNC/VNC and conjunction/supplementation input graphs, including original NNC writing context. Cross-device saving is unclaimed.
- Reload of the complete quin sentence-adverbial outer layer is deliberately unsupported and shows a recovery notice.
- Optional writing coverage and the simple-compound Writing adapter have explicit supported-context limits.
- Accumulated-session performance and some historical inventory provenance remain open qualifications.

See [Version History](CHANGELOG.md) for earlier releases.

## Build the public site

```text
npm run verify:launch
```

The command requires a clean committed worktree and writes the publishable
site to:

```text
../Classical_Nahuatl_Grammar/reports/generated/grammar_os_release/v1.2.17/site/
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
