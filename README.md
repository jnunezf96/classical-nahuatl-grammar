# Classical Nahuatl Grammar Web

`Classical_Nahuatl_Grammar_Web` is the live browser-based Classical Nahuatl
grammar and conjugation application.

Current release: **Grammar OS v1.2.1 — Private Play Study Handoff**
(browser build `20260828-private-play-study-handoff-364`).

See [Version History](CHANGELOG.md) for user-facing “What’s New” notes.

Production: <https://jnunezf96.github.io/classical-nahuatl-grammar/>

Consented study mode: <https://jnunezf96.github.io/classical-nahuatl-grammar/?manufacturer=1>

It lives inside:

```text
Classical_Nahuatl/
├── Classical_Nahuatl_Grammar/
└── Classical_Nahuatl_Grammar_Web/
```

## Project Boundary

`Classical_Nahuatl_Grammar_Web` contains the canonical live-site files.

`Classical_Nahuatl_Grammar` contains development, research, validation, OCR,
reports, temporary tooling, and other non-runtime material.

The two sibling projects should not contain duplicate copies of the same owned
files.

## Runtime

The live application uses native ES modules and has no required build step.

Primary browser files:

- `index.html`
- `style.css`
- `src/browser/main.mjs`

Runtime code lives under `src/`. Runtime data lives under `data/`.

## Architecture

The project uses one canonical grammar generator.

Grammar behavior is organized as reusable semantic objects and operations.
Lessons organize evidence and curriculum rather than defining separate runtime
engines.

Andrews is the grammatical authority for Classical Nahuatl behavior. Canvas
supports specification and evidence.

## Repository

- `src/core/` — grammar and semantic mechanisms
- `src/runtime/` — runtime assembly
- `src/application/` — application contracts
- `src/ui/` — UI and rendering
- `src/browser/` — browser startup
- `data/` — runtime data

Repository-wide Codex guidance lives in `AGENTS.md`.

## Development

For a change, locate the canonical mechanism that owns the behavior, implement
the smallest complete correction, and verify the behavior with focused evidence.

Use the sibling `Classical_Nahuatl_Grammar` project for non-runtime development
material rather than duplicating live-site files into both projects.

## Deployment

Build and verify the publishable site from this project:

```text
npm run verify:launch
```

The generated `reports/generated/grammar_os_release/v1.2.1/site/` directory is
the deployment root. Publish that directory—not this full repository. Its
release manifest records every shipped file and digest.

The deployed site consists only of browser/runtime dependencies actually
imported or fetched by the application.

Research material, validation artifacts, OCR output, reports, temporary probes,
and generated development artifacts belong outside the Web project unless the
live application explicitly depends on them.
