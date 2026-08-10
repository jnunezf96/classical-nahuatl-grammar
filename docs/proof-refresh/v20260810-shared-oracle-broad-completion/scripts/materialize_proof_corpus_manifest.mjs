#!/usr/bin/env node

import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const [manifestArgument, viewArgument] = process.argv.slice(2);
if (!manifestArgument || !viewArgument) throw new Error("usage: manifestPath viewRoot");
const manifestPath = path.resolve(manifestArgument);
const viewRoot = path.resolve(viewArgument);
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

function digestJson(value) {
  return `sha256:${createHash("sha256").update(JSON.stringify(value)).digest("hex")}`;
}

const { contentDigest, ...unsigned } = manifest;
if (contentDigest !== digestJson(unsigned)) throw new Error("proof-corpus-manifest-digest-invalid");
if (manifest.schemaVersion !== 1) throw new Error("proof-corpus-manifest-schema-invalid");

for (const kind of ["runs", "routes"]) {
  const destination = path.join(viewRoot, kind);
  fs.mkdirSync(destination, { recursive: true });
  if (fs.readdirSync(destination).length) throw new Error(`proof-corpus-view-not-empty:${kind}`);
  const sources = new Map();
  for (const name of fs.readdirSync(manifest.base[kind]).filter((name) => name.endsWith(".json")).sort()) {
    sources.set(name, path.join(manifest.base[kind], name));
  }
  for (const overlay of manifest.overlays || []) {
    const expected = new Set((overlay.ownerIds || []).map((ownerId) => `${ownerId}.json`));
    const actual = fs.readdirSync(overlay[kind]).filter((name) => name.endsWith(".json")).sort();
    if (actual.length !== expected.size || actual.some((name) => !expected.has(name))) {
      throw new Error(`proof-corpus-overlay-owner-set-mismatch:${kind}:${overlay.version}`);
    }
    for (const name of actual) sources.set(name, path.join(overlay[kind], name));
  }
  for (const [name, source] of [...sources.entries()].sort(([left], [right]) => left.localeCompare(right))) {
    fs.symlinkSync(source, path.join(destination, name));
  }
}

const result = {
  schemaVersion: 1,
  manifestId: manifest.manifestId,
  manifestDigest: manifest.contentDigest,
  runShardCount: fs.readdirSync(path.join(viewRoot, "runs")).length,
  routeShardCount: fs.readdirSync(path.join(viewRoot, "routes")).length,
  overlayOwnerCount: (manifest.overlays || []).reduce((sum, overlay) => sum + overlay.ownerIds.length, 0),
};
fs.writeFileSync(path.join(viewRoot, "materialization.json"), `${JSON.stringify(result, null, 2)}\n`, "utf8");
process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
