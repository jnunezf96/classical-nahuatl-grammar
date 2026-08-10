#!/usr/bin/env node

import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = "/Users/jaimenunez/Desktop/Classical_Nahuatl/Classical_Nahuatl_Grammar";
const runsDir = path.join(root, "validation/runs");
const sharedOraclePath = "validation/oracles/_lesson2-owner-oracle.mjs";
const broadCompletionSuffixes = new Set([
  "authorizationstatus",
  "gcdsatisfied",
  "lcmcomplete",
  "ownerexecutioncompleted",
  "blocksinput",
  "formulaoutputallowed",
  "classificationstatus",
]);
const registry = JSON.parse(fs.readFileSync(
  path.join(root, "validation/migration-registry.json"),
  "utf8",
));
const activeOwnerIds = new Set(registry.owners.map((owner) => owner.ownerId));

function digest(relativePath) {
  const absolute = path.join(root, relativePath);
  if (!fs.existsSync(absolute)) return null;
  return `sha256:${createHash("sha256").update(fs.readFileSync(absolute)).digest("hex")}`;
}

function broadCompletionPaths(run) {
  const values = [];
  for (const record of run.engineInputRecords || []) {
    if (!record.path.includes("owner-specs/") || !record.path.endsWith(".mjs")) continue;
    const absolute = path.join(root, record.path);
    if (!fs.existsSync(absolute)) continue;
    const source = fs.readFileSync(absolute, "utf8");
    for (const match of source.matchAll(/"canonicalPath"\s*:\s*"([^"]+)"/gu)) {
      const canonicalPath = match[1];
      const leaf = canonicalPath.split(".").at(-1)?.replace(/[^a-z0-9]+/giu, "").toLowerCase();
      if (broadCompletionSuffixes.has(leaf)) values.push(canonicalPath);
    }
  }
  return [...new Set(values)].sort();
}

const files = fs.readdirSync(runsDir)
  .filter((name) => name.endsWith(".json"))
  .filter((name) => activeOwnerIds.has(name.slice(0, -5)))
  .sort();
const currentDigestByPath = new Map();
const mismatchesByPath = new Map();
const ownerRows = [];

for (const file of files) {
  const run = JSON.parse(fs.readFileSync(path.join(runsDir, file), "utf8"));
  const groups = {
    engine: run.engineInputRecords || [],
    validator: run.validatorInputRecords || [],
    runner: run.runnerInputRecords || [],
  };
  const mismatches = [];
  for (const [group, records] of Object.entries(groups)) {
    for (const record of records) {
      if (!currentDigestByPath.has(record.path)) currentDigestByPath.set(record.path, digest(record.path));
      const currentDigest = currentDigestByPath.get(record.path);
      if (currentDigest === record.digest) continue;
      const mismatch = {
        group,
        path: record.path,
        previousDigest: record.digest,
        currentDigest,
      };
      mismatches.push(mismatch);
      const counter = mismatchesByPath.get(record.path) || { engine: 0, validator: 0, runner: 0 };
      counter[group] += 1;
      mismatchesByPath.set(record.path, counter);
    }
  }
  const sharedOracleRecord = groups.validator.find((record) => record.path === sharedOraclePath) || null;
  const positiveCases = (run.cases || []).filter((testCase) => testCase.stratum === "sourced-positive");
  const broadPaths = broadCompletionPaths(run);
  const replayInputsRetained = positiveCases.every((testCase) =>
    testCase.sourceIdentity && testCase.coordinates && testCase.sourceDigest);
  const rawOracleInputsRetained = positiveCases.every((testCase) =>
    testCase.execution && testCase.projection);
  ownerRows.push({
    ownerId: run.ownerId,
    sharedOracleDependency: Boolean(sharedOracleRecord),
    sharedOracleCurrent: sharedOracleRecord?.digest === currentDigestByPath.get(sharedOraclePath),
    replayInputsRetained,
    rawOracleInputsRetained,
    storedPositiveFailure: positiveCases.some((testCase) => testCase.passed !== true),
    broadCompletionPaths: broadPaths,
    engineMismatchCount: mismatches.filter((item) => item.group === "engine").length,
    validatorMismatchCount: mismatches.filter((item) => item.group === "validator").length,
    runnerMismatchCount: mismatches.filter((item) => item.group === "runner").length,
    mismatches,
  });
}

const affected = ownerRows.filter((row) => row.sharedOracleDependency && !row.sharedOracleCurrent);
const behaviorAffected = affected.filter((row) =>
  row.storedPositiveFailure && row.broadCompletionPaths.length > 0);
const report = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  root,
  ownerCount: ownerRows.length,
  orphanRunShardCount: fs.readdirSync(runsDir).filter((name) =>
    name.endsWith(".json") && !activeOwnerIds.has(name.slice(0, -5))).length,
  sharedOraclePath,
  sharedOracleCurrentDigest: currentDigestByPath.get(sharedOraclePath),
  sharedOracleDependentOwnerCount: ownerRows.filter((row) => row.sharedOracleDependency).length,
  sharedOracleAlreadyCurrentOwnerCount: ownerRows.filter((row) => row.sharedOracleDependency && row.sharedOracleCurrent).length,
  sharedOracleAffectedOwnerCount: affected.length,
  sharedOracleBehaviorAffectedOwnerCount: behaviorAffected.length,
  affectedWithRetainedReplayInputs: affected.filter((row) => row.replayInputsRetained).length,
  affectedWithRetainedRawOracleInputs: affected.filter((row) => row.rawOracleInputsRetained).length,
  affectedWithEngineDependencyMismatch: affected.filter((row) => row.engineMismatchCount > 0).length,
  affectedWithOtherValidatorDependencyMismatch: affected.filter((row) =>
    row.mismatches.some((item) => item.group === "validator" && item.path !== sharedOraclePath)).length,
  affectedWithRunnerDependencyMismatch: affected.filter((row) => row.runnerMismatchCount > 0).length,
  behaviorAffectedWithRetainedReplayInputs: behaviorAffected.filter((row) => row.replayInputsRetained).length,
  behaviorAffectedWithRetainedRawOracleInputs: behaviorAffected.filter((row) => row.rawOracleInputsRetained).length,
  behaviorAffectedOwnerIds: behaviorAffected.map((row) => row.ownerId),
  mismatchPathCounts: Object.fromEntries([...mismatchesByPath.entries()].sort(([left], [right]) => left.localeCompare(right))),
  affectedOwnerIds: affected.map((row) => row.ownerId),
  owners: ownerRows,
};

const output = path.resolve(import.meta.dirname, "oracle-refresh-scope-report.json");
fs.writeFileSync(output, `${JSON.stringify(report, null, 2)}\n`, "utf8");
process.stdout.write(`${JSON.stringify({
  ownerCount: report.ownerCount,
  sharedOracleDependentOwnerCount: report.sharedOracleDependentOwnerCount,
  sharedOracleAlreadyCurrentOwnerCount: report.sharedOracleAlreadyCurrentOwnerCount,
  sharedOracleAffectedOwnerCount: report.sharedOracleAffectedOwnerCount,
  sharedOracleBehaviorAffectedOwnerCount: report.sharedOracleBehaviorAffectedOwnerCount,
  affectedWithRetainedReplayInputs: report.affectedWithRetainedReplayInputs,
  affectedWithRetainedRawOracleInputs: report.affectedWithRetainedRawOracleInputs,
  affectedWithEngineDependencyMismatch: report.affectedWithEngineDependencyMismatch,
  affectedWithOtherValidatorDependencyMismatch: report.affectedWithOtherValidatorDependencyMismatch,
  affectedWithRunnerDependencyMismatch: report.affectedWithRunnerDependencyMismatch,
  behaviorAffectedWithRetainedReplayInputs: report.behaviorAffectedWithRetainedReplayInputs,
  behaviorAffectedWithRetainedRawOracleInputs: report.behaviorAffectedWithRetainedRawOracleInputs,
  output,
}, null, 2)}\n`);
