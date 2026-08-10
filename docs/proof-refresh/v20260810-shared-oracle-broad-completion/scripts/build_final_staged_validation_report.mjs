import fs from 'node:fs';
import path from 'node:path';

const workspace = '/Users/jaimenunez/Documents/Codex/2026-08-08/referenced-chatgpt-conversation-this-is-an';
const version = 'v20260810-shared-oracle-broad-completion';
const stage = path.join(workspace, 'work/proof-corpora', version);
const manifests = path.join(workspace, 'work/proof-corpus-manifests');

const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const listFiles = (dir) => fs.readdirSync(dir, {withFileTypes: true})
  .filter((entry) => entry.isFile() || entry.isSymbolicLink())
  .map((entry) => entry.name)
  .filter((name) => name.endsWith('.json'))
  .sort();
const byteSum = (dir) => listFiles(dir).reduce((sum, name) => sum + fs.statSync(path.join(dir, name)).size, 0);
const allocatedBytes = (root) => {
  let total = 0;
  const visit = (target) => {
    const stat = fs.lstatSync(target);
    total += Number(stat.blocks ?? 0) * 512;
    if (!stat.isDirectory()) return;
    for (const name of fs.readdirSync(target)) visit(path.join(target, name));
  };
  visit(root);
  return total;
};

const snapshot = readJson(path.join(stage, 'base-corpus-snapshot.json'));
const registry = readJson(path.join(stage, 'base-plus-override-registry.json'));
const diff = readJson(path.join(stage, 'old-new-difference-report.json'));
const repairDiff = readJson(path.join(stage, 'activation-blocker-old-new-difference-report.json'));
const repairDependencies = readJson(path.join(stage, 'activation-blocker-dependency-report.json'));
const canary = readJson(path.join(stage, 'section-7.9-canary.json'));
const switchReport = readJson(path.join(stage, 'atomic-switch-rollback-report.json'));
const scope = readJson(path.join(workspace, 'work/oracle-refresh-scope-report.json'));
const methodCanaries = readJson(path.join(stage, 'candidate-validation-root-350/reports/andrews_validation/method-canaries.json'));
const candidate = readJson(path.join(manifests, `${version}.json`));
const standardRegistry = readJson(path.join(stage, 'candidate-validation-root-350/validation/migration-registry.json'));
const activeBytes = fs.readFileSync(path.join(manifests, 'active.json'));
const baseBytes = fs.readFileSync(path.join(manifests, 'base.json'));
const active = JSON.parse(activeBytes);

const snapshotMismatches = [];
const currentNames = {};
for (const kind of ['runs', 'routes']) {
  const baseDir = readJson(path.join(manifests, 'base.json')).base[kind];
  currentNames[kind] = listFiles(baseDir);
  const expectedNames = snapshot[kind].map((entry) => entry.name).sort();
  if (JSON.stringify(currentNames[kind]) !== JSON.stringify(expectedNames)) {
    snapshotMismatches.push(`${kind}:filename-set-changed`);
  }
  for (const entry of snapshot[kind]) {
    const target = path.join(baseDir, entry.name);
    if (!fs.existsSync(target)) {
      snapshotMismatches.push(`${kind}:${entry.name}:missing`);
      continue;
    }
    const stat = fs.statSync(target, {bigint: true});
    for (const [field, actual] of [
      ['size', Number(stat.size)],
      ['mtimeNs', String(stat.mtimeNs)],
      ['inode', String(stat.ino)],
    ]) {
      if (String(entry[field]) !== String(actual)) snapshotMismatches.push(`${kind}:${entry.name}:${field}`);
    }
  }
}

const ownerIds = new Set(registry.owners.map((owner) => `${owner.ownerId}.json`));
const nonOwnerShards = Object.fromEntries(['runs', 'routes'].map((kind) => [
  kind,
  currentNames[kind].filter((name) => !ownerIds.has(name)),
]));

const sourceOwners = [];
const oracleOwners = [];
const categoryMismatchOwners = [];
const nonGrammarOwners = [];
const mutationOwners = [];
for (const owner of registry.blockedOwners) {
  const errors = [...owner.validationErrors, ...owner.methodErrors];
  if (errors.some((error) => error.includes('source-obligation'))) sourceOwners.push(owner.ownerId);
  if (errors.some((error) => error.includes('validator-dependency-stale:validation/oracles/_lesson2-owner-oracle.mjs'))) oracleOwners.push(owner.ownerId);
  if (errors.some((error) => error.includes('inventory-category-mismatch'))) categoryMismatchOwners.push(owner.ownerId);
  if (errors.some((error) => error.includes('not-grammar-bearing'))) nonGrammarOwners.push(owner.ownerId);
  if (errors.some((error) => error.includes('mutation-category:'))) mutationOwners.push(owner.ownerId);
}

const overrideRuns = path.join(stage, 'override/runs');
const overrideRoutes = path.join(stage, 'override/routes');
const mergedRuns = path.join(stage, 'merged-view-350/runs');
const mergedRoutes = path.join(stage, 'merged-view-350/routes');
const statfs = fs.statfsSync(stage);

const gateChecks = {
  basePlusOverrideRegistryComplete: registry.counts.blockedOwnerCount === 0,
  dependencyChecksPassed: scope.affectedWithEngineDependencyMismatch === 0
    && scope.affectedWithRunnerDependencyMismatch === 0
    && scope.affectedWithOtherValidatorDependencyMismatch === 0
    && repairDependencies.failures.length === 0,
  ownerCountsPassed: registry.counts.ownerCount === standardRegistry.counts.ownerCount,
  oldNewVerdictDifferencesPassed: diff.failures.length === 0
    && repairDiff.failures.length === 0
    && diff.regressedCaseCount === 0
    && repairDiff.regressedCaseCount === 0,
  mutationObservationsPassed: diff.mutationStatusDifferenceCount === 0
    && diff.mutationObservationDifferenceCount === 0
    && repairDiff.mutationStatusDifferenceCount === 0
    && repairDiff.mutationObservationDifferenceCount === 0,
  section7_9CanaryPassed: canary.failures.length === 0,
  methodCanariesPassed: methodCanaries.complete === true
    && methodCanaries.detectedCount === methodCanaries.canaryCount,
  atomicSwitchRollbackTestPassed: switchReport.failures.length === 0 && switchReport.liveActiveUnchanged,
  baseCorpusIntegrityPassed: snapshotMismatches.length === 0,
};
const activationPermitted = Object.values(gateChecks).every(Boolean);

const report = {
  schemaVersion: 1,
  version,
  activation: {
    permitted: activationPermitted,
    reason: activationPermitted ? 'all activation gates passed' : 'one or more activation gates failed',
    activeManifestUnchanged: activeBytes.equals(baseBytes),
    activeManifestId: active.manifestId,
    candidateManifestActivated: active.contentDigest === candidate.contentDigest,
    atomicSwitchRollbackTestPassed: gateChecks.atomicSwitchRollbackTestPassed,
  },
  replay: {
    warrantedOwnerCount: 350,
    completedOwnerCount: 350,
    retainedReplayInputOwnerCount: scope.behaviorAffectedWithRetainedReplayInputs,
    retainedRawOracleInputOwnerCount: scope.behaviorAffectedWithRetainedRawOracleInputs,
    oldFailedCaseCount: diff.oldFailedCaseCount + repairDiff.oldFailedCaseCount,
    newFailedCaseCount: diff.newFailedCaseCount + repairDiff.newFailedCaseCount,
    improvedCaseCount: diff.improvedCaseCount + repairDiff.improvedCaseCount,
    regressedCaseCount: diff.regressedCaseCount + repairDiff.regressedCaseCount,
    mutationCount: diff.mutationCount + repairDiff.mutationCount,
    mutationStatusDifferenceCount: diff.mutationStatusDifferenceCount + repairDiff.mutationStatusDifferenceCount,
    mutationObservationDifferenceCount: diff.mutationObservationDifferenceCount + repairDiff.mutationObservationDifferenceCount,
    dependencyMismatches: {
      engine: scope.affectedWithEngineDependencyMismatch + repairDependencies.engineDependencyMismatchCount,
      runner: scope.affectedWithRunnerDependencyMismatch + repairDependencies.unexpectedRunnerDependencyMismatchCount,
      otherValidators: scope.affectedWithOtherValidatorDependencyMismatch + repairDependencies.unexpectedValidatorDependencyMismatchCount,
    },
    failures: [...diff.failures, ...repairDiff.failures, ...repairDependencies.failures],
  },
  registry: registry.counts,
  blockers: {
    ownerCount: registry.blockedOwners.length,
    atomCount: registry.counts.assignedUnprovedAtomCount,
    sourceObligationOwnerCount: sourceOwners.length,
    sourceObligationOwnerIds: sourceOwners,
    nonWaivableStoredFailureOwnerCount: oracleOwners.length,
    nonWaivableStoredFailureOwnerIds: oracleOwners,
    inventoryCategoryMismatchOwnerCount: categoryMismatchOwners.length,
    inventoryCategoryMismatchOwnerIds: categoryMismatchOwners,
    notGrammarBearingOwnerCount: nonGrammarOwners.length,
    notGrammarBearingOwnerIds: nonGrammarOwners,
    mutationCoverageOwnerCount: mutationOwners.length,
    mutationCoverageOwnerIds: mutationOwners,
  },
  validation: {
    ...gateChecks,
    section7_9: canary,
  },
  sourceOverlay: candidate.validationInputs,
  corpusIntegrity: {
    baseSnapshotDigest: snapshot.contentDigest,
    baseSnapshotUnchanged: snapshotMismatches.length === 0,
    baseSnapshotMismatchCount: snapshotMismatches.length,
    baseSnapshotMismatches: snapshotMismatches,
    baseRunShardCount: currentNames.runs.length,
    baseRouteShardCount: currentNames.routes.length,
    nonOwnerShards,
    overrideRunCount: listFiles(overrideRuns).length,
    overrideRouteCount: listFiles(overrideRoutes).length,
    mergedRunCount: listFiles(mergedRuns).length,
    mergedRouteCount: listFiles(mergedRoutes).length,
  },
  disk: {
    overrideLogicalBytes: byteSum(overrideRuns) + byteSum(overrideRoutes),
    stageAllocatedBytes: allocatedBytes(stage),
    filesystemFreeBytes: Number(statfs.bavail) * Number(statfs.bsize),
  },
};

const output = path.join(stage, 'final-staged-validation-report.json');
const deliverable = path.join(workspace, 'outputs/staged-proof-refresh-validation-report.json');
const serialized = `${JSON.stringify(report, null, 2)}\n`;
fs.mkdirSync(path.dirname(deliverable), {recursive: true});
fs.writeFileSync(output, serialized);
fs.writeFileSync(deliverable, serialized);
console.log(JSON.stringify({output, deliverable, ...report}, null, 2));
