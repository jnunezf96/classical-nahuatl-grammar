#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const workspace = path.resolve(import.meta.dirname, "..");
const version = "v20260810-shared-oracle-broad-completion";
const manifestRoot = path.join(workspace, "work", "proof-corpus-manifests");
const stageRoot = path.join(workspace, "work", "proof-corpora", version);
const liveActivePath = path.join(manifestRoot, "active.json");
const basePath = path.join(manifestRoot, "base.json");
const candidatePath = path.join(manifestRoot, `${version}.json`);
const testRoot = path.join(stageRoot, "atomic-switch-test");
const testActivePath = path.join(testRoot, "active.json");
const beforeLive = fs.readFileSync(liveActivePath);
const base = fs.readFileSync(basePath);
const candidate = fs.readFileSync(candidatePath);
fs.mkdirSync(testRoot, { recursive: true });
fs.writeFileSync(testActivePath, base);

function atomicReplace(targetPath, content, label) {
  const temporary = path.join(path.dirname(targetPath), `.${path.basename(targetPath)}.${label}.tmp`);
  const descriptor = fs.openSync(temporary, "w", 0o644);
  try {
    fs.writeFileSync(descriptor, content);
    fs.fsyncSync(descriptor);
  } finally {
    fs.closeSync(descriptor);
  }
  fs.renameSync(temporary, targetPath);
  const directoryDescriptor = fs.openSync(path.dirname(targetPath), "r");
  try {
    fs.fsyncSync(directoryDescriptor);
  } finally {
    fs.closeSync(directoryDescriptor);
  }
}

function inspect(file) {
  const document = JSON.parse(fs.readFileSync(file, "utf8"));
  return {
    manifestId: document.manifestId,
    contentDigest: document.contentDigest,
    overlayCount: document.overlays?.length || 0,
    overlayOwnerCount: (document.overlays || []).reduce((sum, overlay) => sum + overlay.ownerIds.length, 0),
  };
}

const initial = inspect(testActivePath);
atomicReplace(testActivePath, candidate, "candidate");
const switched = inspect(testActivePath);
atomicReplace(testActivePath, base, "rollback");
const rolledBack = inspect(testActivePath);
const afterLive = fs.readFileSync(liveActivePath);
const failures = [];
if (initial.overlayCount !== 0) failures.push("test-initial-not-base");
if (switched.overlayOwnerCount !== 350) failures.push("test-candidate-owner-count");
if (rolledBack.contentDigest !== initial.contentDigest || rolledBack.overlayCount !== 0) failures.push("test-rollback-not-immediate-base");
if (!beforeLive.equals(afterLive)) failures.push("live-active-manifest-changed");

const report = {
  schemaVersion: 1,
  version,
  initial,
  switched,
  rolledBack,
  liveActiveUnchanged: beforeLive.equals(afterLive),
  failures,
};
fs.writeFileSync(path.join(stageRoot, "atomic-switch-rollback-report.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
process.stdout.write(`${JSON.stringify({
  valid: failures.length === 0,
  switchedOverlayOwnerCount: switched.overlayOwnerCount,
  rollbackOverlayOwnerCount: rolledBack.overlayOwnerCount,
  liveActiveUnchanged: report.liveActiveUnchanged,
  failureCount: failures.length,
}, null, 2)}\n`);
if (failures.length) process.exitCode = 1;
