"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");
const {
    buildAndrewsCanvasInventoryIndex,
    validateGrammarReconciliationRecord,
    validateNonAuthorityDispositionRecord,
} = require(
    "../../scripts/lib/andrews_canvas_inventory_reconciliation"
);
const {
    LESSONS_2_3_SOURCE_ITEM_COUNT,
    LESSONS_2_3_SOURCE_MANIFEST_DIGEST,
    auditLessons23Reconciliation,
    buildLessons23GrammarReconciliation,
    buildLessons23NonAuthorityRecords,
    sourceManifest,
} = require(
    "../../scripts/reconciliation/andrews_canvas_lessons2_3"
);

const ROOT = path.resolve(__dirname, "..", "..");

function countsBy(records, key) {
    const counts = {};
    for (const record of records) {
        counts[record[key]] = (counts[record[key]] || 0) + 1;
    }
    return counts;
}

function run(runtimeContext = {}) {
    const s = createSuite("andrews_canvas_lessons2_3_reconciliation");
    const inventoryText = fs.readFileSync(
        path.join(ROOT, "docs", "ANDREWS_CANVAS_INVENTORY.md"),
        "utf8"
    );
    const canvasText = fs.readFileSync(
        path.join(ROOT, "ANDREWS_TRANSCRIPTION_CANVAS.md"),
        "utf8"
    );
    const sourceIndex = buildAndrewsCanvasInventoryIndex({
        inventoryText,
        canvasText,
    });
    const manifest = sourceManifest(sourceIndex);

    s.eq(
        "the manually reviewed Lessons 2-3 source population is exact and cannot inherit new rows",
        {
            valid: manifest.valid,
            count: manifest.count,
            digest: manifest.digest,
            expectedCount: LESSONS_2_3_SOURCE_ITEM_COUNT,
            expectedDigest: LESSONS_2_3_SOURCE_MANIFEST_DIGEST,
        },
        {
            valid: true,
            count: 526,
            digest:
                "ac7d78579482f8584af91e482978301769494027ac7ab3e3d6e8c1e0e58e4a03",
            expectedCount: 526,
            expectedDigest:
                "ac7d78579482f8584af91e482978301769494027ac7ab3e3d6e8c1e0e58e4a03",
        }
    );

    s.eq(
        "the canonical Lessons 2-3 denominator reflects reviewed claim force",
        {
            lesson2: countsBy(
                sourceIndex.records.filter((record) => record.lesson === 2),
                "force"
            ),
            lesson3: countsBy(
                sourceIndex.records.filter((record) => record.lesson === 3),
                "force"
            ),
        },
        {
            lesson2: {
                "grammar-bearing": 267,
                analysis: 9,
                documentary: 17,
                evidence: 94,
            },
            lesson3: {
                "grammar-bearing": 128,
                analysis: 4,
                evidence: 1,
                documentary: 6,
            },
        }
    );

    const audit = auditLessons23Reconciliation(
        sourceIndex,
        canvasText,
        {
            runtimeContext,
            rootDir: ROOT,
        }
    );
    s.eq(
        "every effective grammar item has one honest canonical-owner assignment",
        {
            required: audit.required,
            assigned: audit.assigned,
            fullyProved: audit.fullyProved,
            blocked: audit.blocked,
            unresolved: audit.unresolved,
            unowned: audit.unowned,
            countOnlyClosures: audit.countOnlyClosures,
            missingOwners: audit.missingOwnerItemIds,
            invalid: audit.invalidGrammarRecords,
        },
        {
            required: 395,
            assigned: 395,
            fullyProved: 311,
            blocked: 84,
            unresolved: 84,
            unowned: 0,
            countOnlyClosures: 0,
            missingOwners: [],
            invalid: [],
        }
    );

    s.eq(
        "all evidence, analysis, and documentary items receive explicit non-authority dispositions",
        {
            required: audit.nonGrammarRequired,
            dispositioned: audit.nonGrammarDispositioned,
            byForce: audit.nonGrammarByForce,
            invalid: audit.invalidNonAuthorityRecords,
        },
        {
            required: 131,
            dispositioned: 131,
            byForce: {
                evidence: 95,
                analysis: 13,
                documentary: 23,
            },
            invalid: [],
        }
    );

    const grammar = buildLessons23GrammarReconciliation(
        sourceIndex,
        canvasText,
        {
            runtimeContext,
            rootDir: ROOT,
        }
    );
    const ownerValues = (lesson, key) => Array.from(new Set(
        grammar.classifications
            .filter((record) => (
                record.canvasCoordinate.container.startsWith(`§${lesson}.`)
            ))
            .map((record) => record[key])
    )).sort();
    s.eq(
        "owner assignments reuse only the existing canonical transcription and particle routes",
        {
            lesson2Sources:
                ownerValues(2, "canonicalSourceObjectId"),
            lesson2Operations:
                ownerValues(2, "sharedOperationId"),
            lesson3Sources:
                ownerValues(3, "canonicalSourceObjectId"),
            lesson3Operations:
                ownerValues(3, "sharedOperationId"),
            sentenceCompositionSourceRequirements:
                Array.from(new Set(
                    grammar.classifications
                        .filter((record) => (
                            record.sharedOperationId
                            === "sentence:particle-adjunction"
                        ))
                        .map((record) => (
                            record.typedSourceRequirements.join(",")
                        ))
                )),
        },
        {
            lesson2Sources: [
                "classical-nahuatl-transcription-source-frame",
            ],
            lesson2Operations: [
                "orthography:transcription",
            ],
            lesson3Sources: [
                "classical-nahuatl-particle-source-frame",
            ],
            lesson3Operations: [
                "particle:result",
                "sentence:particle-adjunction",
            ],
            sentenceCompositionSourceRequirements: [
                "classical-nahuatl-particle-source-frame,"
                + "one-of:classical-nahuatl-vnc-sentence-result-frame|"
                + "issued-classical-nahuatl-nnc-sentence-surface-frame|"
                + "issued-classical-nahuatl-particle-sentence-layer-frame",
            ],
        }
    );
    const grammarById = new Map(
        sourceIndex.grammarBearingRecords.map(
            (record) => [record.itemId, record]
        )
    );
    s.eq(
        "every proved or explicitly UI-blocked grammar item satisfies the shared fail-closed record contract",
        grammar.reconciliationRecords.flatMap((record) => {
            const validation = validateGrammarReconciliationRecord(
                record,
                grammarById.get(record.inventoryItemId)
            );
            return (
                validation.ok
                || validation.blocked
            ) && validation.errors.length === 0
                ? []
                : [{
                    itemId: record.inventoryItemId,
                    errors: validation.errors,
                }];
        }),
        []
    );

    const nonAuthority =
        buildLessons23NonAuthorityRecords(sourceIndex);
    const grammarIds = new Set(
        sourceIndex.grammarBearingRecords.map((record) => record.itemId)
    );
    s.eq(
        "every non-authority disposition satisfies the shared coordinate-bound contract",
        nonAuthority.flatMap((record) => {
            const validation = validateNonAuthorityDispositionRecord(
                record,
                sourceIndex.byId[record.inventoryItemId],
                grammarIds
            );
            return validation.ok
                ? []
                : [{
                    itemId: record.inventoryItemId,
                    errors: validation.errors,
                }];
        }),
        []
    );

    s.eq(
        "the recovered penultimate-stress claim is assigned while both recovered list intros remain non-authoritative",
        {
            stress: grammar.classifications
                .find((record) => (
                    record.inventoryItemId
                    === "ACI-P047-L023-6987BF2E55"
                )),
            intros: nonAuthority.filter((record) => [
                "ACI-P047-L024-CC9F26F769",
                "ACI-P057-L027-655886AF4C",
            ].includes(record.inventoryItemId)).map((record) => ({
                itemId: record.inventoryItemId,
                kind: record.nonAuthorityDisposition.kind,
                runtimeAuthority:
                    record.nonAuthorityDisposition.runtimeAuthority,
            })),
        },
        {
            stress: {
                inventoryItemId: "ACI-P047-L023-6987BF2E55",
                canvasCoordinate: {
                    itemId: "ACI-P047-L023-6987BF2E55",
                    container: "§2.7",
                    pdfPage: 47,
                    pageLine: 23,
                    canvasSpan: "1759",
                },
                exactCanvasSpanDigest:
                    "e0d03b15a65f5b60fa959d8d68c95545f2758213f85974093bab3a034c1e0bec",
                sourceInventoryCategory: "RUL",
                sourceInventoryForce: "grammar-bearing",
                effectiveCategory: "RUL",
                effectiveForce: "grammar-bearing",
                semanticObjectKind: "operation",
                semanticObjectId:
                    "classical-vocable-prosody-owner:rul:6987bf2e55",
                semanticOwnerId: "classical-vocable-prosody-owner",
                canonicalSourceObjectId:
                    "classical-nahuatl-transcription-source-frame",
                typedSourceRequirements: [
                    "classical-nahuatl-transcription-source-frame",
                ],
                sharedOperationId: "orthography:transcription",
                executableDisposition: "typed-validation",
                factRole: "derived-fact",
                currentDisposition:
                    "fully-proved-owner-runtime-receipt",
            },
            intros: [
                {
                    itemId: "ACI-P047-L024-CC9F26F769",
                    kind: "documentary-note",
                    runtimeAuthority: false,
                },
                {
                    itemId: "ACI-P057-L027-655886AF4C",
                    kind: "evidence-not-used",
                    runtimeAuthority: false,
                },
            ],
        }
    );

    s.ok(
        "formula examples and traditional spellings never become source, operation, or result authority",
        nonAuthority.every((record) => {
            const disposition = record.nonAuthorityDisposition;
            return disposition.runtimeAuthority === false
                && disposition.sourceSupplier === false
                && disposition.operationSelector === false
                && disposition.resultSupplier === false;
        })
    );

    s.ok(
        "every exact grammar coordinate carries a source-span digest",
        grammar.classifications.every((classification) => (
            /^§[23]\./u.test(classification.canvasCoordinate.container)
            && /^[a-f0-9]{64}$/u.test(
                classification.exactCanvasSpanDigest
            )
        ))
    );

    const proved = grammar.reconciliationRecords.filter(
        record => record.status === "fully-proved"
    );
    s.ok(
        "all proved items carry exact independently issued written and formula projections",
        proved.length === 311
        && proved.every(record => (
            record.projections.independent === true
            && record.projections.written.output
            && record.projections.formula.output
            && record.projections.written.projectionId
                !== record.projections.formula.projectionId
        ))
    );
    const blocked = grammar.reconciliationRecords.filter(
        record => record.status === "blocked"
    );
    s.ok(
        "only user-actionable particle identities and honorific composition remain blocked on live UI proof",
        blocked.length === 84
        && blocked.every(record => (
            record.blocker.blockerId
                === "particle-live-desktop-and-narrow-ui-receipt-missing"
        ))
    );

    return s;
}

module.exports = { run };
