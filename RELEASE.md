# Grammar OS v1.2.2 release

Release name: **Lesson 18.8 Precision Update**

Browser build: **20260828-lesson18-note1-ichtequi-365**

Canonical origin: **https://jnunezf96.github.io/classical-nahuatl-grammar/**

## What's New

- Made Andrews 18.8 note 1 operational for `(ich-tequi)`.
- Removed nonspecific human and nonhuman object choices that the verbstem does not permit.
- Preserved both the intransitive reading and specific-object generation.
- Preserved the typed `(ich-tequi)` analysis in exact Result formulas while keeping written forms solid.
- Made Class and Valence changes require a fresh Source commitment before generation.

See [Version History](CHANGELOG.md) for notes from earlier releases.

## Build the public site

```text
npm run verify:launch
```

The command requires a clean committed worktree and writes the publishable
site to:

```text
../Classical_Nahuatl_Grammar/reports/generated/grammar_os_release/v1.2.2/site/
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
