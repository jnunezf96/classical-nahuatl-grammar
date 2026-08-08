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
    "legacy_broad_proof_coordinate_hashes.json"
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

function coordinateHash(record) {
    return crypto.createHash("sha256").update([
        record.ownerId,
        record.coordinateKey,
        record.canonicalPath,
    ].join("\u241f"), "utf8").digest("hex");
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
    const legacyHashes = JSON.parse(
        fs.readFileSync(LEGACY_FIXTURE_PATH, "utf8")
    );
    const legacySet = new Set(legacyHashes);
    const current = readCurrentBroadProofCoordinates();
    const currentWithHashes = current.map((record) => ({
        ...record,
        hash: coordinateHash(record),
    }));
    const newBroadCoordinates = currentWithHashes
        .filter((record) => !legacySet.has(record.hash))
        .map(({ ownerId, coordinateKey, canonicalPath }) => ({
            ownerId,
            coordinateKey,
            canonicalPath,
        }));

    s.eq(
        "the legacy broad-proof baseline is unique and well formed",
        {
            count: legacyHashes.length,
            unique: legacySet.size,
            invalid: legacyHashes.filter(
                (value) => !/^[0-9a-f]{64}$/u.test(value)
            ),
        },
        {
            count: 832,
            unique: 832,
            invalid: [],
        }
    );

    s.eq(
        "no new grammar coordinate relies solely on a clear administrative completion flag",
        newBroadCoordinates,
        []
    );

    s.ok(
        "the legacy broad-proof population can only stay level or decrease",
        currentWithHashes.length <= legacyHashes.length
    );

    return s;
}

module.exports = { run };
