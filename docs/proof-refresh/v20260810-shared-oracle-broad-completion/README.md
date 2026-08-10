# Shared-oracle proof refresh v20260810-shared-oracle-broad-completion

This versioned release records the validated source and manifest change that refreshed the Andrews atom proof corpus after the shared-oracle correction. It contains the exact corrected validation inputs, the retirement ledger, the deterministic scripts used, and the final validation and activation reports.

The 2,497 base run shards, 2,497 base route shards, and 350 run/route overrides are intentionally not stored in Git. The active corpus remains a base-plus-owner-override registry, and the previous base manifest remains the immediate rollback.

Validated result: 18,639 grammar atoms, 2,491 owners, 350 replayed owners, 830 corrected stored failures, zero new failures or regressions, 3,979 unchanged mutation observations, and all 18 Lesson 7.9 canary cases passing.

Use `release-manifest.json` as the content-addressed index. The manifests in `reports/` are the exact activated local records and therefore retain their original absolute corpus paths as provenance; the corpus shards themselves are external by design.
