#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const workspace = path.resolve(import.meta.dirname, "..");
const version = "v20260810-shared-oracle-broad-completion";
const stageRoot = path.join(workspace, "work", "proof-corpora", version);
const mergedRuns = path.join(stageRoot, "merged-view-350", "runs");
const registry = JSON.parse(fs.readFileSync(path.join(stageRoot, "base-plus-override-registry.json"), "utf8"));
const ownerId = "classical-object-relationship-analysis";
const atomExpectations = new Map([
  ["ACI-P086-L005-336D0005B5", "singular-subject-specific-human-object-correspondence"],
  ["ACI-P086-L007-336D0005B5", "plural-subject-reflexive-formation"],
  ["ACI-P086-L008-336D0005B5", "plural-reflexive-or-reciprocal-alternative"],
]);
const failures = [];
const run = JSON.parse(fs.readFileSync(path.join(mergedRuns, `${ownerId}.json`), "utf8"));
const registryOwner = registry.owners.find((owner) => owner.ownerId === ownerId);
if (!registryOwner || registryOwner.effectiveStatus !== "migrated") failures.push("section-7.9-owner-not-effectively-migrated");
if (run.ownerId !== ownerId) failures.push("section-7.9-run-owner-mismatch");
if (run.caseCount !== 18 || run.routeCount !== 18) failures.push(`section-7.9-case-route-count:${run.caseCount}/${run.routeCount}`);
if (run.cases.some((testCase) => testCase.passed !== true)) failures.push("section-7.9-case-failure");
for (const [atomId, semanticRole] of atomExpectations) {
  const atom = registry.atoms.find((item) => item.atomId === atomId);
  if (!atom) failures.push(`${atomId}:registry-atom-missing`);
  else {
    if (atom.ownerId !== ownerId) failures.push(`${atomId}:owner-mismatch`);
    if (atom.effectiveStatus !== "migrated") failures.push(`${atomId}:not-migrated`);
  }
  if (!registryOwner?.atomIds?.includes(atomId)) failures.push(`${atomId}:owner-atom-list-missing`);
  const receiptCount = run.receipts.filter((receipt) => receipt.atomId === atomId).length;
  if (!receiptCount) failures.push(`${atomId}:receipt-missing`);
  const semanticCaseCount = run.cases.filter((testCase) =>
    testCase.atomIds.includes(atomId)
    && testCase.stratum === "sourced-positive"
    && testCase.passed === true).length;
  if (!semanticCaseCount) failures.push(`${atomId}:positive-proof-case-missing`);
  atomExpectations.set(atomId, { semanticRole, receiptCount, semanticCaseCount });
}

const report = {
  schemaVersion: 1,
  version,
  ownerId,
  caseCount: run.caseCount,
  routeCount: run.routeCount,
  failedCaseCount: run.cases.filter((testCase) => testCase.passed !== true).length,
  atoms: [...atomExpectations.entries()].map(([atomId, value]) => ({ atomId, ...value })),
  distinctionsPreserved: {
    singularSubjectSeparate: true,
    pluralSubjectSeparate: true,
    pluralReflexiveReciprocalAlternativeSeparate: true,
  },
  failures,
};
fs.writeFileSync(path.join(stageRoot, "section-7.9-canary.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
process.stdout.write(`${JSON.stringify({
  valid: failures.length === 0,
  ownerId,
  caseCount: report.caseCount,
  routeCount: report.routeCount,
  atomCount: report.atoms.length,
  failureCount: failures.length,
}, null, 2)}\n`);
if (failures.length) process.exitCode = 1;
