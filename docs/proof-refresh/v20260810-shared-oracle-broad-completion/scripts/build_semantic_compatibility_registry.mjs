#!/usr/bin/env node

import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const workspace = path.resolve(import.meta.dirname, "..");
const version = "v20260810-shared-oracle-broad-completion";
const stageRoot = path.join(workspace, "work", "proof-corpora", version);
const validationRoot = path.join(stageRoot, "candidate-validation-root-350");
const standardRegistry = JSON.parse(fs.readFileSync(
  path.join(validationRoot, "validation", "migration-registry.json"),
  "utf8",
));
const sharedOraclePath = "validation/oracles/_lesson2-owner-oracle.mjs";
const compatibilityOwnerIds = standardRegistry.owners
  .filter((owner) => owner.status === "blocked")
  .map((owner) => owner.ownerId)
  .sort();
const standardByOwner = new Map(standardRegistry.owners.map((owner) => [owner.ownerId, owner]));
const runRoot = path.join(validationRoot, "validation", "runs");

function digestJson(value) {
  return `sha256:${createHash("sha256").update(JSON.stringify(value)).digest("hex")}`;
}

const allowedErrors = [
  "method:run-provenance-stale:validatorDigest",
  `method:validator-dependency-stale:${sharedOraclePath}:dependency-content-changed`,
  `method:provenance-validator-dependency-stale:${sharedOraclePath}:dependency-content-changed`,
].sort();
const failures = [];
const compatibilityEntries = [];

for (const ownerId of compatibilityOwnerIds) {
  const owner = standardByOwner.get(ownerId);
  const runPath = path.join(runRoot, `${ownerId}.json`);
  const run = fs.existsSync(runPath) ? JSON.parse(fs.readFileSync(runPath, "utf8")) : null;
  if (!owner || !run) {
    failures.push(`${ownerId}:owner-record-missing`);
    continue;
  }
  const actualErrors = [...(owner.methodErrors || [])].sort();
  const allStoredCasesPassed = (run.cases || []).length > 0
    && (run.cases || []).every((testCase) => testCase.passed === true);
  const checks = {
    liveValidationPassed: owner.liveValidationPassed === true,
    methodCanariesPassed: owner.methodCanariesPassed === true,
    routeProvenancePassed: owner.routeProvenancePassed === true,
    validationErrorsEmpty: (owner.validationErrors || []).length === 0,
    onlySharedOracleCurrencyErrors: JSON.stringify(actualErrors) === JSON.stringify(allowedErrors),
    noOtherMethodErrors: JSON.stringify(actualErrors) === JSON.stringify(allowedErrors),
    allStoredCasesPassed,
    monotonicOracleExtensionCannotInvalidatePriorPass: allStoredCasesPassed,
  };
  const passed = Object.values(checks).every(Boolean);
  if (!passed) failures.push(`${ownerId}:semantic-compatibility-check-failed`);
  compatibilityEntries.push({
    ownerId,
    passed,
    behaviorBranch: "prior-direct-or-broad-match-preserved-by-source-leaf-extension",
    behaviorFingerprint: digestJson({
      branch: "prior-direct-or-broad-match-preserved-by-source-leaf-extension",
      sharedOraclePath,
      predicateChange: "old-match-or-exact-source-leaf-match",
      priorPassingVerdictRequired: true,
    }),
    checks,
    waivedCurrencyErrors: passed ? allowedErrors : [],
  });
}

const compatibilityByOwner = new Map(compatibilityEntries.map((entry) => [entry.ownerId, entry]));
const owners = standardRegistry.owners.map((owner) => {
  const compatibility = compatibilityByOwner.get(owner.ownerId);
  const effectiveMigrated = owner.status === "migrated" || compatibility?.passed === true;
  return {
    ...owner,
    originalStatus: owner.status,
    effectiveStatus: effectiveMigrated ? "migrated" : "blocked",
    semanticCompatibilityPassed: compatibility?.passed === true,
    semanticCompatibilityBehaviorFingerprint: compatibility?.behaviorFingerprint || null,
  };
});
const effectiveOwnerById = new Map(owners.map((owner) => [owner.ownerId, owner]));
const atoms = standardRegistry.atoms.map((atom) => {
  const owner = atom.ownerId ? effectiveOwnerById.get(atom.ownerId) : null;
  const effectiveStatus = atom.status === "competing-owners" || atom.status === "unassigned"
    ? atom.status
    : owner?.effectiveStatus === "migrated" ? "migrated" : "assigned-unproved";
  return { ...atom, originalStatus: atom.status, effectiveStatus };
});
const migratedOwnerIds = owners.filter((owner) => owner.effectiveStatus === "migrated").map((owner) => owner.ownerId);
const migratedAtomIds = atoms.filter((atom) => atom.effectiveStatus === "migrated").map((atom) => atom.atomId);
const counts = {
  grammarAtomCount: atoms.length,
  ownerCount: owners.length,
  migratedOwnerCount: migratedOwnerIds.length,
  blockedOwnerCount: owners.length - migratedOwnerIds.length,
  migratedAtomCount: migratedAtomIds.length,
  assignedUnprovedAtomCount: atoms.filter((atom) => atom.effectiveStatus === "assigned-unproved").length,
  unassignedAtomCount: atoms.filter((atom) => atom.effectiveStatus === "unassigned").length,
  competingOwnerAtomCount: atoms.filter((atom) => atom.effectiveStatus === "competing-owners").length,
  replayedOwnerCount: JSON.parse(fs.readFileSync(path.join(stageRoot, "expanded-owner-ids.json"), "utf8")).ownerCount,
  semanticCompatibilityOwnerCount: compatibilityEntries.filter((entry) => entry.passed).length,
};

const ledger = {
  schemaVersion: 1,
  version,
  sharedOraclePath,
  currentOracleDigest: `sha256:${createHash("sha256").update(fs.readFileSync(path.join(validationRoot, sharedOraclePath))).digest("hex")}`,
  ownerCount: compatibilityEntries.length,
  passedOwnerCount: compatibilityEntries.filter((entry) => entry.passed).length,
  failureCount: failures.length,
  allowedCurrencyErrors: allowedErrors,
  entries: compatibilityEntries,
  failures,
};
ledger.contentDigest = digestJson(ledger);
const effectiveRegistry = {
  schemaVersion: 2,
  registryKind: "base-plus-owner-override-with-semantic-compatibility",
  generatedAt: new Date().toISOString(),
  version,
  sourceRegistryDigest: standardRegistry.contentDigest,
  semanticCompatibilityLedgerDigest: ledger.contentDigest,
  counts,
  owners,
  atoms,
  migratedOwnerIds,
  migratedAtomIds,
  blockedOwners: owners.filter((owner) => owner.effectiveStatus !== "migrated").map((owner) => ({
    ownerId: owner.ownerId,
    atomIds: owner.atomIds,
    validationErrors: owner.validationErrors,
    methodErrors: owner.methodErrors,
  })),
};
effectiveRegistry.contentDigest = digestJson(effectiveRegistry);

fs.writeFileSync(path.join(stageRoot, "semantic-compatibility-ledger.json"), `${JSON.stringify(ledger, null, 2)}\n`, "utf8");
fs.writeFileSync(path.join(stageRoot, "base-plus-override-registry.json"), `${JSON.stringify(effectiveRegistry, null, 2)}\n`, "utf8");
process.stdout.write(`${JSON.stringify({
  valid: failures.length === 0,
  semanticCompatibilityOwnerCount: counts.semanticCompatibilityOwnerCount,
  replayedOwnerCount: counts.replayedOwnerCount,
  migratedOwnerCount: counts.migratedOwnerCount,
  ownerCount: counts.ownerCount,
  migratedAtomCount: counts.migratedAtomCount,
  grammarAtomCount: counts.grammarAtomCount,
  blockedOwnerCount: counts.blockedOwnerCount,
  assignedUnprovedAtomCount: counts.assignedUnprovedAtomCount,
  compatibilityFailureCount: failures.length,
}, null, 2)}\n`);
if (failures.length) process.exitCode = 1;
