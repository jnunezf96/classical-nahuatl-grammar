#!/usr/bin/env node

import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const workspace = path.resolve(import.meta.dirname, "..");
const canonicalRoot = "/Users/jaimenunez/Desktop/Classical_Nahuatl/Classical_Nahuatl_Grammar";
const version = "v20260810-shared-oracle-broad-completion";
const stageRoot = path.join(workspace, "work", "proof-corpora", version);
const ownerDocument = JSON.parse(fs.readFileSync(path.join(stageRoot, "owner-ids.json"), "utf8"));
const sharedOraclePath = "validation/oracles/_lesson2-owner-oracle.mjs";

function digestJson(value) {
  return `sha256:${createHash("sha256").update(JSON.stringify(value)).digest("hex")}`;
}

function recordsByPath(records = []) {
  return new Map(records.map((record) => [record.path, record.digest]));
}

function changedRecordPaths(before = [], after = []) {
  const left = recordsByPath(before);
  const right = recordsByPath(after);
  return [...new Set([...left.keys(), ...right.keys()])].sort().filter((key) => left.get(key) !== right.get(key));
}

const failures = [];
const ownerDiffs = [];
let oldFailedCaseCount = 0;
let newFailedCaseCount = 0;
let improvedCaseCount = 0;
let regressedCaseCount = 0;
let mutationCount = 0;
let mutationStatusDifferenceCount = 0;
let mutationObservationDifferenceCount = 0;

for (const ownerId of ownerDocument.ownerIds) {
  const base = JSON.parse(fs.readFileSync(path.join(canonicalRoot, "validation", "runs", `${ownerId}.json`), "utf8"));
  const staged = JSON.parse(fs.readFileSync(path.join(stageRoot, "override", "runs", `${ownerId}.json`), "utf8"));
  const engineChanges = changedRecordPaths(base.engineInputRecords, staged.engineInputRecords);
  const validatorChanges = changedRecordPaths(base.validatorInputRecords, staged.validatorInputRecords);
  const runnerChanges = changedRecordPaths(base.runnerInputRecords, staged.runnerInputRecords);
  if (engineChanges.length) failures.push(`${ownerId}:engine-dependency-changed:${engineChanges.join(",")}`);
  if (runnerChanges.length) failures.push(`${ownerId}:runner-dependency-changed:${runnerChanges.join(",")}`);
  if (validatorChanges.length !== 1 || validatorChanges[0] !== sharedOraclePath) {
    failures.push(`${ownerId}:unexpected-validator-dependency-change:${validatorChanges.join(",")}`);
  }
  if (base.ownerSpecDigest !== staged.ownerSpecDigest) failures.push(`${ownerId}:owner-spec-digest-changed`);
  if (base.caseCount !== staged.caseCount || base.routeCount !== staged.routeCount) {
    failures.push(`${ownerId}:case-or-route-count-changed`);
  }

  const stagedCaseById = new Map(staged.cases.map((testCase) => [testCase.caseId, testCase]));
  const caseDiffs = [];
  for (const before of base.cases) {
    const after = stagedCaseById.get(before.caseId);
    if (!after) {
      failures.push(`${ownerId}:staged-case-missing:${before.caseId}`);
      continue;
    }
    if (!before.passed) oldFailedCaseCount += 1;
    if (!after.passed) newFailedCaseCount += 1;
    if (!before.passed && after.passed) improvedCaseCount += 1;
    if (before.passed && !after.passed) {
      regressedCaseCount += 1;
      failures.push(`${ownerId}:case-regressed:${before.caseId}`);
    }
    if (before.passed !== after.passed) {
      caseDiffs.push({ caseId: before.caseId, before: before.passed, after: after.passed });
    }
  }
  if (staged.cases.some((testCase) => testCase.passed !== true)) {
    failures.push(`${ownerId}:staged-case-failure-retained`);
  }

  const baseMutations = new Map((base.mutationResults || []).map((item) => [item.mutationId, item]));
  const stagedMutations = new Map((staged.mutationResults || []).map((item) => [item.mutationId, item]));
  if (baseMutations.size !== stagedMutations.size) failures.push(`${ownerId}:mutation-count-changed`);
  const mutationDiffs = [];
  for (const [mutationId, before] of baseMutations) {
    mutationCount += 1;
    const after = stagedMutations.get(mutationId);
    if (!after) {
      failures.push(`${ownerId}:mutation-missing:${mutationId}`);
      continue;
    }
    if (before.status !== after.status) mutationStatusDifferenceCount += 1;
    if (after.status !== "killed" || !(after.killedByCaseIds || []).length) {
      failures.push(`${ownerId}:mutation-not-killed:${mutationId}:${after.status}`);
    }
    const beforeCases = [...(before.killedByCaseIds || [])].sort();
    const afterCases = [...(after.killedByCaseIds || [])].sort();
    if (JSON.stringify(beforeCases) !== JSON.stringify(afterCases)) {
      mutationObservationDifferenceCount += 1;
      mutationDiffs.push({ mutationId, beforeKilledByCaseIds: beforeCases, afterKilledByCaseIds: afterCases });
    }
  }
  ownerDiffs.push({ ownerId, caseDiffs, mutationDiffs });
}

if (oldFailedCaseCount === 0) failures.push("no-old-failed-cases-detected");
if (newFailedCaseCount !== 0) failures.push(`new-failed-cases:${newFailedCaseCount}`);
if (improvedCaseCount !== oldFailedCaseCount) {
  failures.push(`not-all-old-failures-improved:${improvedCaseCount}/${oldFailedCaseCount}`);
}
if (regressedCaseCount !== 0) failures.push(`regressed-cases:${regressedCaseCount}`);
if (mutationStatusDifferenceCount !== 0) failures.push(`mutation-status-differences:${mutationStatusDifferenceCount}`);

const report = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  version,
  ownerCount: ownerDocument.ownerIds.length,
  oldFailedCaseCount,
  newFailedCaseCount,
  improvedCaseCount,
  regressedCaseCount,
  mutationCount,
  mutationStatusDifferenceCount,
  mutationObservationDifferenceCount,
  failures,
  ownerDiffs,
};
report.contentDigest = digestJson(report);
fs.writeFileSync(path.join(stageRoot, "old-new-difference-report.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
process.stdout.write(`${JSON.stringify({
  valid: failures.length === 0,
  ownerCount: report.ownerCount,
  oldFailedCaseCount,
  newFailedCaseCount,
  improvedCaseCount,
  regressedCaseCount,
  mutationCount,
  mutationStatusDifferenceCount,
  mutationObservationDifferenceCount,
  failureCount: failures.length,
}, null, 2)}\n`);
if (failures.length) process.exitCode = 1;
