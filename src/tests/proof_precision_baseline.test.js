"use strict";

const crypto = require("crypto");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const LEGACY_FIXTURE_PATH = path.join(
    __dirname,
    "fixtures",
    "legacy_broad_proof_baseline.json"
);

const OWNER_SPEC_DIRECTORIES = Object.freeze([
    "src/core/classical/nuclear-owner-specs",
    "src/core/classical/transcription-owner-specs",
    "src/core/classical/particle-owner-specs",
    "src/core/concepts/foundational-owner-specs",
    "src/core/concepts/carrier-structure-owner-specs",
]);

const CLEAR_BROAD_PROOF_SUFFIXES = Object.freeze([
    "authorizationstatus",
    "gcdsatisfied",
    "lcmcomplete",
    "ownerexecutioncompleted",
    "blocksinput",
    "formulaoutputallowed",
    "classificationstatus",
]);

const INVENTORY_PROGRAM = String.raw`
import { readdir } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.argv[2];
const directories = JSON.parse(process.argv[3]);
const broadSuffixes = JSON.parse(process.argv[4]);
const output = [];

for (const directory of directories) {
  const absoluteDirectory = path.join(root, directory);
  const files = (await readdir(absoluteDirectory))
    .filter(file => file.endsWith(".mjs"))
    .sort();
  for (const file of files) {
    const spec = (await import(pathToFileURL(
      path.join(absoluteDirectory, file),
    ).href)).default;
    if (!spec?.ownerId) continue;
    for (const [coordinateKey, coordinate] of Object.entries(
      spec.coordinates || {},
    )) {
      const canonicalPath = String(coordinate?.canonicalPath || "");
      const lowerPath = canonicalPath.toLowerCase();
      if (!broadSuffixes.some(suffix => lowerPath.endsWith(suffix))) {
        continue;
      }
      output.push({
        ownerId: spec.ownerId,
        coordinateKey,
        canonicalPath,
      });
    }
  }
}

process.stdout.write(JSON.stringify(output));
`;

function coordinateDigest(record) {
    return crypto.createHash("sha256").update([
        record.ownerId,
        record.coordinateKey,
        record.canonicalPath,
    ].join("\u241f"), "utf8").digest();
}

function baselineBitIsSet(bitset, bitIndex) {
    return Boolean(bitset[Math.floor(bitIndex / 8)] & (
        1 << (bitIndex % 8)
    ));
}

function belongsToLegacyBaseline(record, baseline, bitset) {
    const digest = coordinateDigest(record);
    const h1 = digest.readBigUInt64BE(0);
    const h2 = digest.readBigUInt64BE(8) | 1n;
    const modulus = BigInt(baseline.bitCount);
    for (let probe = 0; probe < baseline.probeCount; probe += 1) {
        const bitIndex = Number(
            (h1 + BigInt(probe) * h2) % modulus
        );
        if (!baselineBitIsSet(bitset, bitIndex)) return false;
    }
    return true;
}

function readCurrentBroadProofCoordinates() {
    const programPath = path.join(
        os.tmpdir(),
        `classical-proof-precision-inventory-${process.pid}.mjs`
    );
    fs.writeFileSync(programPath, INVENTORY_PROGRAM, "utf8");
    try {
        return JSON.parse(execFileSync(
            process.execPath,
            [
                programPath,
                ROOT,
                JSON.stringify(OWNER_SPEC_DIRECTORIES),
                JSON.stringify(CLEAR_BROAD_PROOF_SUFFIXES),
            ],
            {
                cwd: ROOT,
                encoding: "utf8",
                maxBuffer: 16 * 1024 * 1024,
            }
        ));
    } finally {
        fs.rmSync(programPath, { force: true });
    }
}

function run() {
    const s = createSuite("proof_precision_baseline");
    const baseline = JSON.parse(
        fs.readFileSync(LEGACY_FIXTURE_PATH, "utf8")
    );
    const bitset = Buffer.from(baseline.filterBase64, "base64");
    const current = readCurrentBroadProofCoordinates();
    const newBroadCoordinates = current
        .filter((record) => !belongsToLegacyBaseline(
            record,
            baseline,
            bitset
        ))
        .map(({ ownerId, coordinateKey, canonicalPath }) => ({
            ownerId,
            coordinateKey,
            canonicalPath,
        }));

    s.eq(
        "the legacy broad-proof baseline is compact, fixed, and well formed",
        {
            version: baseline.version,
            algorithm: baseline.algorithm,
            bitCount: baseline.bitCount,
            probeCount: baseline.probeCount,
            coordinateCount: baseline.legacyCoordinateCount,
            decodedByteCount: bitset.length,
        },
        {
            version: 1,
            algorithm: "sha256-prefix128-double-hash",
            bitCount: 65536,
            probeCount: 9,
            coordinateCount: 832,
            decodedByteCount: 8192,
        }
    );

    s.eq(
        "no new grammar coordinate relies solely on a clear administrative completion flag",
        newBroadCoordinates,
        []
    );

    s.ok(
        "the legacy broad-proof population can only stay level or decrease",
        current.length <= baseline.legacyCoordinateCount
    );

    return s;
}

module.exports = { run };
