"use strict";

const crypto = require("crypto");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");
const { pathToFileURL } = require("url");
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

function readRetiredProofAddresses() {
    const registryUrl = pathToFileURL(path.join(
        ROOT,
        "src",
        "core",
        "grammar",
        "canonical_proof_address_registry.mjs"
    )).href;
    const program = `
      import {
        CLASSICAL_CANONICAL_PROOF_ADDRESS_IDS as IDS,
        getCanonicalProofAddress,
      } from ${JSON.stringify(registryUrl)};
      const keys = Object.keys(IDS).filter(
        key => key.startsWith("LEGACY_")
      );
      process.stdout.write(JSON.stringify(keys.map(key => {
        const record = getCanonicalProofAddress(IDS[key]);
        return {
          key,
          proofAddressId: record.proofAddressId,
          deprecated: record.deprecated === true,
          addressSource: record.addressSource,
          replacementProofAddressIds:
            record.replacementProofAddressIds || [],
        };
      })));
    `;
    return JSON.parse(execFileSync(
        process.execPath,
        ["--input-type=module", "--eval", program],
        {
            cwd: ROOT,
            encoding: "utf8",
            maxBuffer: 2 * 1024 * 1024,
        }
    ));
}

function run(ctx = {}) {
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
    const effectiveCoordinates =
        ctx.listRoutineSemanticEffectiveProofCoordinates?.() || [];
    const migratedCoordinates = effectiveCoordinates.filter(
        (record) => record.migratedFromBroadCompletion === true
    );
    const effectiveBroadCoordinates = migratedCoordinates.filter(
        (record) => CLEAR_BROAD_PROOF_SUFFIXES.some((suffix) =>
            String(record.effectiveCanonicalPath || "")
                .toLowerCase()
                .endsWith(suffix)
        )
    );

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

    s.ok(
        "the first exact vertical migration removes at least six unmistakably administrative coordinates",
        current.length <= baseline.legacyCoordinateCount - 6
    );

    s.eq(
        "every remaining legacy broad source coordinate is projected to one distinct exact canonical witness",
        {
            sourceBroadCoordinates: current.length,
            migratedCoordinates: migratedCoordinates.length,
            uniqueExactProofAddresses:
                new Set(migratedCoordinates.map(
                    (record) => record.proofAddressId
                )).size,
            uniqueLegacyProofAddresses:
                new Set(migratedCoordinates.map(
                    (record) => record.legacyProofAddressId
                )).size,
            wholeResultWitnesses: migratedCoordinates.filter(
                (record) => !record.effectiveCanonicalPath
            ).length,
            effectiveBroadCoordinates:
                effectiveBroadCoordinates.length,
            migrationDigest: crypto.createHash("sha256").update(
                JSON.stringify(migratedCoordinates.map((record) => [
                    record.ownerId,
                    record.coordinateKey,
                    record.proofAddressId,
                    record.legacyProofAddressId,
                    record.effectiveCanonicalPath,
                ]).sort((left, right) => (
                    JSON.stringify(left).localeCompare(
                        JSON.stringify(right)
                    )
                )))
            ).digest("hex"),
            nonAuthorizing: migratedCoordinates.every(
                (record) => record.grammarAuthority === false
            ),
        },
        {
            sourceBroadCoordinates: 826,
            migratedCoordinates: 826,
            uniqueExactProofAddresses: 826,
            uniqueLegacyProofAddresses: 483,
            wholeResultWitnesses: 187,
            effectiveBroadCoordinates: 0,
            migrationDigest:
                "3f78681a0d60b8a94e18a8bb1f674193c3b3421c436ce55e9bff71038a4f8023",
            nonAuthorizing: true,
        }
    );

    s.eq(
        "all automatic legacy proof identities remain resolvable as deprecated aliases to their exact witnesses",
        migratedCoordinates.flatMap((record) => {
            const exact = ctx.getCanonicalProofAddress?.(
                record.proofAddressId
            );
            const legacy = ctx.getCanonicalProofAddress?.(
                record.legacyProofAddressId
            );
            const valid = Boolean(
                exact
                && legacy
                && exact.addressSource
                    === "automatic-exact-semantic-observation"
                && exact.currentPath
                    === record.effectiveCanonicalPath
                && legacy.deprecated === true
                && legacy.addressSource
                    === "retired-broad-checkpoint"
                && legacy.replacementProofAddressIds?.includes(
                    record.proofAddressId
                )
                && record.proofAddressId
                    !== record.legacyProofAddressId
            );
            return valid ? [] : [{
                ownerId: record.ownerId,
                coordinateKey: record.coordinateKey,
                exact,
                legacy,
            }];
        }),
        []
    );

    const retiredAddresses = readRetiredProofAddresses();
    s.eq(
        "retired broad proof IDs remain permanently resolvable through exact replacements",
        retiredAddresses.map((record) => ({
            key: record.key,
            proofAddressId: record.proofAddressId,
            deprecated: record.deprecated,
            addressSource: record.addressSource,
            hasReplacement:
                record.replacementProofAddressIds.length > 0,
        })),
        [
            {
                key: "LEGACY_NEMI_AUTHORIZATION_STATUS",
                proofAddressId:
                    "881b37c8-657d-5998-9333-d2c7ddba3420",
                deprecated: true,
                addressSource: "retired-broad-checkpoint",
                hasReplacement: true,
            },
            {
                key:
                    "LEGACY_PRETERIT_AGENTIVE_AUTHORIZATION_STATUS",
                proofAddressId:
                    "6bdfc603-8957-5eb5-aadf-b0ef9667a4c5",
                deprecated: true,
                addressSource: "retired-broad-checkpoint",
                hasReplacement: true,
            },
            {
                key:
                    "LEGACY_PRETERIT_AGENTIVE_CANONICAL_RESULT",
                proofAddressId:
                    "dd4a70b1-4474-5701-a0f0-ff04ea05a390",
                deprecated: true,
                addressSource: "retired-broad-checkpoint",
                hasReplacement: true,
            },
            {
                key:
                    "LEGACY_PRETERIT_AGENTIVE_GCD_SATISFIED",
                proofAddressId:
                    "58640559-f3ba-5d85-80c5-8b276b0f31a3",
                deprecated: true,
                addressSource: "retired-broad-checkpoint",
                hasReplacement: true,
            },
            {
                key:
                    "LEGACY_PRETERIT_AGENTIVE_LCM_COMPLETE",
                proofAddressId:
                    "c3b9fdf9-eacb-59b0-9b58-580b7cdb36ae",
                deprecated: true,
                addressSource: "retired-broad-checkpoint",
                hasReplacement: true,
            },
        ]
    );

    return s;
}

module.exports = { run };
