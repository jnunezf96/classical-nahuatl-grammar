# Grammar OS v1.1.0 release

Release name: **Cross-Lesson Compositional Closure**

Browser build: **20260825-launch-ready-293**

## Build the public site

```text
npm run verify:launch
```

The command requires a clean committed worktree and writes the publishable
site to:

```text
../Classical_Nahuatl_Grammar/reports/generated/grammar_os_release/v1.1.0/site/
```

Publish only that `site/` directory. Do not publish the repository root.

## Hosting contract

- Serve over HTTPS and redirect HTTP to HTTPS.
- Serve `.mjs` as JavaScript and `.json`/`.webmanifest` with their correct MIME types.
- Apply the policies in `_headers`, including CSP, frame denial, `nosniff`, and permissions restrictions.
- Enable Brotli or gzip compression.
- Keep `index.html` revalidated; versioned JavaScript and CSS may be cached immutably.
- Return 404 for development-only paths such as `/docs/`, `/scripts/`, and `/src/tests/`.

The generated release manifest lists every public file and its SHA-256 digest.

## Public-origin follow-up

The deployment provider or final domain owner must add the canonical URL,
HSTS, and an absolute `sitemap.xml` after the public origin is chosen. Those
values cannot be safely inferred from the source repository.

## Rollback

Keep the immediately preceding release artifact. Rollback consists of
redeploying that immutable directory; grammar data does not require a database
migration.
