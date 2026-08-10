#!/usr/bin/env node

import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const workspace = path.resolve(import.meta.dirname, "..");
const canonicalRoot = "/Users/jaimenunez/Desktop/Classical_Nahuatl/Classical_Nahuatl_Grammar";
const version = "v20260810-shared-oracle-broad-completion";
const stageRoot = path.join(workspace, "work", "proof-corpora", version);
const manifestRoot = path.join(workspace, "work", "proof-corpus-manifests");
const scope = JSON.parse(fs.readFileSync(
  path.join(workspace, "work", "oracle-refresh-scope-report.json"),
  "utf8",
));
const ownerIds = [...scope.behaviorAffectedOwnerIds].sort();

function digestJson(value) {
  return `sha256:${createHash("sha256").update(JSON.stringify(value)).digest("hex")}`;
}

function ensureEmptyDirectory(directory) {
  if (fs.existsSync(directory) && fs.readdirSync(directory).length) {
    throw new Error(`stage-directory-not-empty:${directory}`);
  }
  fs.mkdirSync(directory, { recursive: true });
}

function link(target, destination) {
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  if (fs.existsSync(destination) || fs.lstatSync(path.dirname(destination)).isSymbolicLink()) {
    if (fs.existsSync(destination)) return;
  }
  fs.symlinkSync(target, destination);
}

function snapshotDirectory(directory) {
  return fs.readdirSync(directory)
    .filter((name) => name.endsWith(".json"))
    .sort()
    .map((name) => {
      const stat = fs.statSync(path.join(directory, name), { bigint: true });
      return {
        name,
        size: Number(stat.size),
        mtimeNs: String(stat.mtimeNs),
        inode: String(stat.ino),
      };
    });
}

function createShadowRoot(shadowRoot, runsTarget, routesTarget) {
  fs.mkdirSync(shadowRoot, { recursive: true });
  const scriptsTarget = path.join(shadowRoot, "scripts");
  if (!fs.existsSync(scriptsTarget)) {
    fs.cpSync(path.join(canonicalRoot, "scripts"), scriptsTarget, {
      recursive: true,
      preserveTimestamps: true,
    });
  }
  for (const relative of [
    "ANDREWS_TRANSCRIPTION_CANVAS.md",
    "config",
    "docs",
    "node_modules",
    "package.json",
    "package-lock.json",
    "src",
  ]) {
    const destination = path.join(shadowRoot, relative);
    if (!fs.existsSync(destination)) fs.symlinkSync(path.join(canonicalRoot, relative), destination);
  }
  const validationRoot = path.join(shadowRoot, "validation");
  fs.mkdirSync(validationRoot, { recursive: true });
  for (const relative of ["declarations", "method-runs", "oracles", "owners", "plans", "runners"]) {
    const destination = path.join(validationRoot, relative);
    if (!fs.existsSync(destination)) fs.symlinkSync(path.join(canonicalRoot, "validation", relative), destination);
  }
  for (const [name, target] of [["runs", runsTarget], ["routes", routesTarget]]) {
    const destination = path.join(validationRoot, name);
    if (!fs.existsSync(destination)) fs.symlinkSync(target, destination);
  }
  fs.mkdirSync(path.join(shadowRoot, "reports", "andrews_validation"), { recursive: true });
}

if (scope.sharedOracleBehaviorAffectedOwnerCount !== ownerIds.length || ownerIds.length !== 321) {
  throw new Error(`unexpected-behavior-affected-owner-count:${ownerIds.length}`);
}

const overrideRuns = path.join(stageRoot, "override", "runs");
const overrideRoutes = path.join(stageRoot, "override", "routes");
ensureEmptyDirectory(overrideRuns);
ensureEmptyDirectory(overrideRoutes);

const baseRuns = path.join(canonicalRoot, "validation", "runs");
const baseRoutes = path.join(canonicalRoot, "validation", "routes");
const baseSnapshot = {
  schemaVersion: 1,
  capturedAt: new Date().toISOString(),
  runs: snapshotDirectory(baseRuns),
  routes: snapshotDirectory(baseRoutes),
};
baseSnapshot.contentDigest = digestJson({ runs: baseSnapshot.runs, routes: baseSnapshot.routes });
fs.mkdirSync(stageRoot, { recursive: true });
fs.writeFileSync(
  path.join(stageRoot, "base-corpus-snapshot.json"),
  `${JSON.stringify(baseSnapshot, null, 2)}\n`,
  "utf8",
);

createShadowRoot(path.join(stageRoot, "replay-root"), overrideRuns, overrideRoutes);

const baseManifest = {
  schemaVersion: 1,
  manifestId: "andrews-proof-corpus-base-v1",
  mode: "base-only",
  base: {
    runs: baseRuns,
    routes: baseRoutes,
    snapshotDigest: baseSnapshot.contentDigest,
  },
  overlays: [],
};
baseManifest.contentDigest = digestJson(baseManifest);
const candidateManifest = {
  schemaVersion: 1,
  manifestId: `andrews-proof-corpus-${version}`,
  mode: "base-plus-owner-override",
  base: baseManifest.base,
  overlays: [{
    version,
    runs: overrideRuns,
    routes: overrideRoutes,
    ownerCount: ownerIds.length,
    ownerIds,
    ownerSetDigest: digestJson(ownerIds),
  }],
};
candidateManifest.contentDigest = digestJson(candidateManifest);

fs.mkdirSync(manifestRoot, { recursive: true });
for (const [name, document] of [["base.json", baseManifest], [`${version}.json`, candidateManifest]]) {
  fs.writeFileSync(path.join(manifestRoot, name), `${JSON.stringify(document, null, 2)}\n`, "utf8");
}
const activePath = path.join(manifestRoot, "active.json");
if (!fs.existsSync(activePath)) {
  fs.copyFileSync(path.join(manifestRoot, "base.json"), activePath);
}
const active = JSON.parse(fs.readFileSync(activePath, "utf8"));
if (active.contentDigest !== baseManifest.contentDigest) {
  throw new Error("active-manifest-not-base-at-stage-start");
}

fs.writeFileSync(path.join(stageRoot, "owner-ids.json"), `${JSON.stringify({
  schemaVersion: 1,
  version,
  ownerCount: ownerIds.length,
  ownerIds,
  ownerSetDigest: digestJson(ownerIds),
}, null, 2)}\n`, "utf8");

process.stdout.write(`${JSON.stringify({
  valid: true,
  version,
  stageRoot,
  ownerCount: ownerIds.length,
  baseRunShardCount: baseSnapshot.runs.length,
  baseRouteShardCount: baseSnapshot.routes.length,
  baseSnapshotDigest: baseSnapshot.contentDigest,
  activeManifest: active.manifestId,
}, null, 2)}\n`);
