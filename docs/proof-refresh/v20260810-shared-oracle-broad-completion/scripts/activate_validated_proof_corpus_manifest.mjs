import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const workspace = '/Users/jaimenunez/Documents/Codex/2026-08-08/referenced-chatgpt-conversation-this-is-an';
const version = 'v20260810-shared-oracle-broad-completion';
const stage = path.join(workspace, 'work/proof-corpora', version);
const manifests = path.join(workspace, 'work/proof-corpus-manifests');
const activePath = path.join(manifests, 'active.json');
const basePath = path.join(manifests, 'base.json');
const candidatePath = path.join(manifests, `${version}.json`);
const report = JSON.parse(fs.readFileSync(path.join(stage, 'final-staged-validation-report.json'), 'utf8'));
if (report.activation.permitted !== true) throw new Error('candidate-activation-not-permitted');
if (!Object.entries(report.validation).filter(([key]) => key !== 'section7_9').every(([, value]) => value === true)) {
  throw new Error('candidate-validation-gate-failed');
}
const base = fs.readFileSync(basePath);
const candidate = fs.readFileSync(candidatePath);
const before = fs.readFileSync(activePath);
if (!before.equals(base)) throw new Error('active-manifest-not-base-before-activation');

function atomicReplace(targetPath, content, label) {
  const temporary = path.join(path.dirname(targetPath), `.${path.basename(targetPath)}.${label}.tmp`);
  const descriptor = fs.openSync(temporary, 'w', 0o644);
  try { fs.writeFileSync(descriptor, content); fs.fsyncSync(descriptor); }
  finally { fs.closeSync(descriptor); }
  fs.renameSync(temporary, targetPath);
  const directory = fs.openSync(path.dirname(targetPath), 'r');
  try { fs.fsyncSync(directory); } finally { fs.closeSync(directory); }
}

const activeView = path.join(stage, 'active-materialized-view');
let rolledBackOnFailure = false;
try {
  atomicReplace(activePath, candidate, 'candidate');
  if (!fs.readFileSync(activePath).equals(candidate)) throw new Error('active-manifest-byte-verification-failed');
  const materialized = spawnSync(process.execPath, [
    path.join(workspace, 'work/materialize_proof_corpus_manifest.mjs'), activePath, activeView,
  ], {cwd: workspace, encoding: 'utf8'});
  if (materialized.status !== 0) throw new Error(`active-materialization-failed:${materialized.stderr || materialized.stdout}`);
  const viewReport = JSON.parse(fs.readFileSync(path.join(activeView, 'materialization.json'), 'utf8'));
  if (viewReport.runShardCount !== 2497 || viewReport.routeShardCount !== 2497 || viewReport.overlayOwnerCount !== 350) {
    throw new Error('active-materialization-count-mismatch');
  }
} catch (error) {
  atomicReplace(activePath, base, 'automatic-rollback');
  rolledBackOnFailure = true;
  throw error;
}

const active = JSON.parse(fs.readFileSync(activePath, 'utf8'));
const activation = {
  schemaVersion: 1, version, activated: true, rolledBackOnFailure,
  activeManifestId: active.manifestId, activeManifestDigest: active.contentDigest,
  rollbackManifestId: JSON.parse(base).manifestId,
  rollbackManifestDigest: JSON.parse(base).contentDigest,
  activeRunShardCount: 2497, activeRouteShardCount: 2497, overlayOwnerCount: 350,
  oldCorpusRetained: true,
};
fs.writeFileSync(path.join(stage, 'activation-report.json'), `${JSON.stringify(activation, null, 2)}\n`);
console.log(JSON.stringify(activation, null, 2));
