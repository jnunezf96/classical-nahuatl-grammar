# AGENTS.md

## Purpose

Use this file as the persistent map for working in this repository.
The current user prompt supplies the active objective.

## Project

This repository is `Classical_Nahuatl_Grammar_Web`, the live Classical Nahuatl grammar application inside:

`Classical_Nahuatl/Classical_Nahuatl_Grammar_Web`

Its sibling project is:

`Classical_Nahuatl/Classical_Nahuatl_Grammar`

Use Andrews as the grammatical authority for categories, roles, slots, boundaries,
dependencies, operations, restrictions, and realization.

Use Canvas as specification and evidence support.

Generate results from the canonical grammar system itself. Treat examples,
lesson metadata, display formulas, expected strings, and cached outputs as
evidence or verification material.

## Architecture

Maintain one canonical grammar generator.

Represent shared grammatical behavior with reusable semantic objects and
operations.

Order operations by grammatical dependency.

Preserve typed source, target, valence, object, voice, and boundary structure
through transformations.

Extend the canonical path when behavior changes.

Keep language-specific behavior inside its language boundary. Classical output
uses Classical orthographic realization.

## Project Boundaries

`Classical_Nahuatl_Grammar_Web` owns the live website and its runtime files.

`Classical_Nahuatl_Grammar` owns development, research, validation, OCR, reports,
temporary tooling, and other non-runtime material.

Keep each file in the project that owns it. Share behavior through explicit
interfaces or generated inputs when necessary rather than by duplicating files
between the sibling projects.

## Task Execution

Treat the current user prompt as the active implementation target.

Find the canonical owner of the requested behavior and make the smallest
complete change there.

Preserve compatible working behavior and replace behavior that conflicts with
the requested result.

Scale implementation and proof to the change.

Reuse unchanged, previously established results. Expand scope only when the
requested change depends on a broader system.

## Verification

Verify changed behavior with the narrowest test or check that proves it.

Use broader validation when the change crosses that broader boundary or when a
formal handoff explicitly requires it.

A task is complete when the requested behavior exists on the canonical path and
the relevant proof passes.

## Repository Map

- `index.html` — browser entry document
- `style.css` — browser styles
- `src/browser/` — browser entry and wiring
- `src/runtime/` — canonical runtime assembly
- `src/core/` — grammar and semantic mechanisms
- `src/application/` — application contracts
- `src/ui/` — interface and rendering
- `data/` — runtime data

Deeper development and validation material belongs in the sibling
`Classical_Nahuatl_Grammar` project unless the live application explicitly
imports or fetches it.

## Grammatical Families and Compatibility Owners

Treat canonical grammatical families as the reusable execution layer. Existing
owner IDs remain permanent compatibility and proof-jurisdiction adapters; they
do not each require an independent grammar engine.

Every canonical owner must belong to exactly one non-authorizing family. New
routine owners join the family of their canonical execution contract unless a
reviewed grammatical jurisdiction, such as the preterit-agentive or particle
family, explicitly spans several execution lanes.

Families may share and cache immutable owner-issued canonical Results. They may
not invent grammar, bypass an owner validator, or turn proof metadata into
grammatical authority. Preserve public owner APIs, Results, permanent IDs, and
correct output while consolidating their shared execution machinery.
