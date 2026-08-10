#!/usr/bin/env node

import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const workspace = path.resolve(import.meta.dirname, "..");
const version = "v20260810-shared-oracle-broad-completion";
const stageRoot = path.join(workspace, "work", "proof-corpora", version);
const replayRoot = path.join(stageRoot, "replay-root");
const ownerDocument = JSON.parse(fs.readFileSync(path.join(stageRoot, "owner-ids.json"), "utf8"));
const ownerIds = [...ownerDocument.ownerIds];
const checkpointPath = path.join(stageRoot, "replay-checkpoint.json");
const checkpoint = fs.existsSync(checkpointPath)
  ? JSON.parse(fs.readFileSync(checkpointPath, "utf8"))
  : { completedOwnerIds: [] };
const completed = new Set(checkpoint.completedOwnerIds || []);
const pending = ownerIds.filter((ownerId) => !completed.has(ownerId));
const batchSize = 20;
const batches = [];
for (let index = 0; index < pending.length; index += batchSize) {
  batches.push(pending.slice(index, index + batchSize));
}

function shardPath(kind, ownerId) {
  return path.join(stageRoot, "override", kind, `${ownerId}.json`);
}

function validateBatch(ownerBatch) {
  for (const ownerId of ownerBatch) {
    for (const kind of ["runs", "routes"]) {
      const file = shardPath(kind, ownerId);
      if (!fs.existsSync(file)) throw new Error(`staged-shard-missing:${kind}:${ownerId}`);
      const document = JSON.parse(fs.readFileSync(file, "utf8"));
      if (document.ownerId !== ownerId) throw new Error(`staged-shard-owner-mismatch:${kind}:${ownerId}`);
    }
  }
}

function persistCheckpoint() {
  fs.writeFileSync(checkpointPath, `${JSON.stringify({
    schemaVersion: 1,
    version,
    requiredOwnerCount: ownerIds.length,
    completedOwnerIds: [...completed].sort(),
  }, null, 2)}\n`, "utf8");
}

function runBatch(ownerBatch, batchNumber) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [
      "--max-old-space-size=6144",
      "scripts/run_andrews_validation.mjs",
      "--execute-only",
      "--jobs", "4",
      ...ownerBatch.flatMap((ownerId) => ["--owner", ownerId]),
    ], {
      cwd: replayRoot,
      stdio: ["ignore", "pipe", "pipe"],
    });
    let output = "";
    child.stdout.on("data", (chunk) => { output += chunk; });
    child.stderr.on("data", (chunk) => { output += chunk; });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`staged-batch-${batchNumber}-failed:${code}\n${output}`));
        return;
      }
      validateBatch(ownerBatch);
      for (const ownerId of ownerBatch) completed.add(ownerId);
      persistCheckpoint();
      process.stdout.write(`batch ${batchNumber}/${batches.length}: ${ownerBatch.length} owners staged; total ${completed.size}/${ownerIds.length}\n`);
      resolve();
    });
  });
}

for (let index = 0; index < batches.length; index += 1) {
  await runBatch(batches[index], index + 1);
}
validateBatch(ownerIds);
console.log(JSON.stringify({
  valid: true,
  version,
  requiredOwnerCount: ownerIds.length,
  previouslyCompletedOwnerCount: ownerIds.length - pending.length,
  executedOwnerCount: pending.length,
  completedOwnerCount: completed.size,
}, null, 2));
