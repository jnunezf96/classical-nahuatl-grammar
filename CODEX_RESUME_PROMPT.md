# Codex Resume Prompt

Continue in the existing `Classical_Nahuatl_Grammar_Web` worktree located under:

`Classical_Nahuatl/Classical_Nahuatl_Grammar_Web`

Its sibling non-runtime project is:

`Classical_Nahuatl/Classical_Nahuatl_Grammar`

Read `AGENTS.md`.

Treat the current user prompt as the active objective.

Read project-status or specialized documentation only when the current task
depends on prior unfinished work or on a documented subsystem.

Check `git status --short`, locate the canonical owner of the requested behavior,
and implement the smallest complete change there.

Keep live website/runtime files in `Classical_Nahuatl_Grammar_Web`.

Keep development, research, validation, OCR, reports, temporary tooling, and
other non-runtime material in `Classical_Nahuatl_Grammar`.

Preserve file ownership between the sibling projects rather than duplicating
files between them.

Preserve the repository invariants in `AGENTS.md`, including Andrews authority,
typed grammatical structure, and the single canonical generator.

Verify the changed behavior with the narrowest useful test or check. Reuse
unchanged established results and expand verification only when the change
crosses a broader dependency.

Report:

- what changed;
- files changed;
- checks run;
- any remaining dependency relevant to the requested objective.
