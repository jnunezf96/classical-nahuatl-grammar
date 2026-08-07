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
    GENUINE_USER_CHOICE_ITEM_IDS,
    LESSONS_17_34_SOURCE_ITEM_COUNT,
    LESSONS_17_34_SOURCE_MANIFEST_DIGEST,
    SECTION_25_13_GRAMMAR_ITEM_IDS,
    SECTION_25_16_GRAMMAR_ITEM_IDS,
    auditLessons1734GrammarReconciliation,
    buildLessons1734GrammarReconciliation,
    sourceManifest,
} = require(
    "../../scripts/reconciliation/andrews_canvas_lessons17_34_grammar"
);
const {
    auditLessons1734NonAuthority,
    buildLessons1734NonAuthorityRecords,
} = require(
    "../../scripts/reconciliation/andrews_canvas_lessons17_34_non_authority"
);

const ROOT = path.resolve(__dirname, "..", "..");

function countsBy(records, key) {
    const counts = {};
    for (const record of records) {
        const value = record[key];
        counts[value] = (counts[value] || 0) + 1;
    }
    return counts;
}

function run() {
    const s = createSuite(
        "andrews_canvas_lessons17_34_reconciliation"
    );
    const inventoryText = fs.readFileSync(
        path.join(ROOT, "docs", "ANDREWS_CANVAS_INVENTORY.md"),
        "utf8"
    );
    const canvasText = fs.readFileSync(
        path.join(ROOT, "ANDREWS_TRANSCRIPTION_CANVAS.md"),
        "utf8"
    );
    const index = buildAndrewsCanvasInventoryIndex({
        inventoryText,
        canvasText,
    });
    const manifest = sourceManifest(index);

    s.eq(
        "the stabilized Lessons 17-34 population cannot inherit an inserted, deleted, moved, or reclassified source row",
        {
            valid: manifest.valid,
            count: manifest.count,
            digest: manifest.digest,
            expectedCount: LESSONS_17_34_SOURCE_ITEM_COUNT,
            expectedDigest:
                LESSONS_17_34_SOURCE_MANIFEST_DIGEST,
        },
        {
            valid: true,
            count: 4051,
            digest:
                "02f6a33fd278d5b08c50311822b11979e6052e879e4b458df6a4f3740250333d",
            expectedCount: 4051,
            expectedDigest:
                "02f6a33fd278d5b08c50311822b11979e6052e879e4b458df6a4f3740250333d",
        }
    );

    const lessonRecords = index.records.filter(
        (record) => record.lesson >= 17 && record.lesson <= 34
    );
    s.eq(
        "the independent denominator is accounted for lesson by lesson",
        countsBy(lessonRecords, "lesson"),
        {
            17: 158,
            18: 159,
            19: 263,
            20: 240,
            21: 81,
            22: 111,
            23: 103,
            24: 299,
            25: 324,
            26: 348,
            27: 170,
            28: 382,
            29: 159,
            30: 359,
            31: 234,
            32: 230,
            33: 168,
            34: 263,
        }
    );

    const built = buildLessons1734GrammarReconciliation(
        index,
        canvasText
    );
    const audit = auditLessons1734GrammarReconciliation(
        index,
        canvasText
    );
    s.eq(
        "every grammar item is assigned to a canonical semantic owner and remains honestly blocked pending item-complete receipts",
        {
            required: audit.required,
            assigned: audit.assigned,
            fullyProved: audit.fullyProved,
            blocked: audit.blocked,
            unowned: audit.unowned,
            unresolved: audit.unresolved,
            countOnlyClosures: audit.countOnlyClosures,
            invalid: audit.invalidRecords,
            missingCanonicalSourceOwner:
                audit.missingOwnerItemIds.length,
        },
        {
            required: 1587,
            assigned: 1587,
            fullyProved: 0,
            blocked: 1587,
            unowned: 0,
            unresolved: 1587,
            countOnlyClosures: 0,
            invalid: [],
            missingCanonicalSourceOwner: 0,
        }
    );

    s.eq(
        "candidate semantic owners reuse the four production application routes without creating a lesson operation",
        countsBy(built.classifications, "sharedOperationId"),
        {
            "sentence:supplementation": 205,
            "vnc:application": 677,
            "vnc:derivational-operation": 355,
            "grammar:nominal-construction": 350,
        }
    );

    const classificationsById = new Map(
        built.classifications.map((record) => [
            record.inventoryItemId,
            record,
        ])
    );
    const reconciliationsById = new Map(
        built.reconciliationRecords.map((record) => [
            record.inventoryItemId,
            record,
        ])
    );
    s.eq(
        "the final §25.13 atoms belong to shared VNC derivation and layer analysis, never to a lesson or example route",
        SECTION_25_13_GRAMMAR_ITEM_IDS.map((itemId) => {
            const classification = classificationsById.get(itemId);
            const reconciliation = reconciliationsById.get(itemId);
            return [
                itemId,
                classification?.semanticObjectId,
                classification?.semanticObjectKind,
                classification?.semanticOwnerId,
                classification?.canonicalSourceObjectId,
                classification?.sharedOperationId,
                classification?.semanticPrerequisiteOperationIds,
                classification?.executableDisposition,
                classification?.factRole,
                reconciliation?.status,
            ];
        }),
        [
            [
                "ACI-P223-L013-54403BB040",
                "vnc-object-prefix-layer-order",
                "composition-rule",
                "classical-nahuatl-vnc-derivation-layer-analysis",
                "classical-nahuatl-vnc-application-request",
                "vnc:application",
                [],
                "composition",
                "derived",
                "blocked",
            ],
            [
                "ACI-P223-L013-93465EC1C5",
                "vnc-object-prefix-functional-syncretism",
                "condition",
                "classical-nahuatl-vnc-derivation-layer-analysis",
                "classical-nahuatl-vnc-application-request",
                "vnc:application",
                [],
                "typed-validation",
                "derived",
                "blocked",
            ],
            [
                "ACI-P223-L013-F59A8CC80D",
                "vnc-multiple-object-ambiguity-condition",
                "condition",
                "classical-nahuatl-vnc-derivation-layer-analysis",
                "classical-nahuatl-vnc-application-request",
                "vnc:application",
                [],
                "typed-validation",
                "derived",
                "blocked",
            ],
            [
                "ACI-P223-L013-FE0B6576A5",
                "vnc-reverse-source-analysis-alternatives",
                "operation",
                "classical-nahuatl-vnc-derivation-layer-analysis",
                "classical-nahuatl-vnc-application-request",
                "vnc:application",
                [],
                "scalar-execution",
                "derived",
                "blocked",
            ],
            [
                "ACI-P223-L013-F04885787B",
                "vnc-contextual-analysis-selection",
                "condition",
                "classical-nahuatl-vnc-derivation-layer-analysis",
                "classical-nahuatl-vnc-application-request",
                "vnc:application",
                [],
                "typed-validation",
                "contextual",
                "blocked",
            ],
            [
                "ACI-P223-L013-D5C78BA9A6",
                "vnc-contextual-analysis-resolution",
                "condition",
                "classical-nahuatl-vnc-derivation-layer-analysis",
                "classical-nahuatl-vnc-application-request",
                "vnc:application",
                [],
                "typed-validation",
                "contextual",
                "blocked",
            ],
            [
                "ACI-P223-L014-38D7D4236F",
                "vnc-specific-object-incompatibility",
                "restriction",
                "classical-nahuatl-vnc-derivation-layer-analysis",
                "classical-nahuatl-vnc-application-request",
                "vnc:application",
                [],
                "exact-rejection",
                "derived",
                "blocked",
            ],
            [
                "ACI-P223-L014-2265B7752D",
                "vnc-mainline-reflexive-shuntline-realization",
                "contextual-realization",
                "classical-nahuatl-vnc-derivation-layer-analysis",
                "classical-nahuatl-vnc-application-request",
                "vnc:application",
                [],
                "contextual-realization",
                "contextual",
                "blocked",
            ],
        ]
    );
    s.eq(
        "the final §25.16 atoms belong to supplementation and require the canonical VNC Result before the silent object can be a supplement head",
        SECTION_25_16_GRAMMAR_ITEM_IDS.map((itemId) => {
            const classification = classificationsById.get(itemId);
            const reconciliation = reconciliationsById.get(itemId);
            return [
                itemId,
                classification?.semanticObjectId,
                classification?.semanticObjectKind,
                classification?.semanticOwnerId,
                classification?.canonicalSourceObjectId,
                classification?.typedSourceConstituentKinds,
                classification?.sharedOperationId,
                classification?.semanticPrerequisiteOperationIds,
                classification?.executableDisposition,
                classification?.factRole,
                reconciliation?.status,
            ];
        }),
        [
            [
                "ACI-P224-L023-5F7E12F303",
                "vnc-silent-specific-object-status",
                "source-structure",
                "classical-nahuatl-supplementation-operation",
                "classical-nahuatl-supplementation-operation-request",
                [
                    "principal-clause-result",
                    "supplement-clause-result",
                    "shared-referent-relation",
                ],
                "sentence:supplementation",
                ["vnc:application"],
                "source-validation",
                "derived",
                "blocked",
            ],
            [
                "ACI-P224-L023-00A73C7DF4",
                "vnc-silent-specific-object-privileges",
                "composition-rule",
                "classical-nahuatl-supplementation-operation",
                "classical-nahuatl-supplementation-operation-request",
                [
                    "principal-clause-result",
                    "supplement-clause-result",
                    "shared-referent-relation",
                ],
                "sentence:supplementation",
                ["vnc:application"],
                "composition",
                "derived",
                "blocked",
            ],
            [
                "ACI-P224-L023-BE002E40FA",
                "supplementation-silent-specific-object-head-relation",
                "operation",
                "classical-nahuatl-supplementation-operation",
                "classical-nahuatl-supplementation-operation-request",
                [
                    "principal-clause-result",
                    "supplement-clause-result",
                    "shared-referent-relation",
                ],
                "sentence:supplementation",
                ["vnc:application"],
                "scalar-execution",
                "genuine-user-choice",
                "blocked",
            ],
        ]
    );

    s.eq(
        "no grammar item survives in an unowned or lesson-authorized reconciliation lane",
        {
            dispositions: countsBy(
                built.classifications,
                "currentDisposition"
            ),
            missingLessons: [...new Set(
                built.classifications
                    .filter((record) => (
                        record.currentDisposition
                            === "unowned-production-source-is-lesson-named"
                    ))
                    .map((record) => Number(
                        record.canvasCoordinate.container
                            .match(/^§(\d+)/u)?.[1]
                    ))
            )],
        },
        {
            dispositions: {
                "blocked-missing-item-complete-owner-receipt": 1587,
            },
            missingLessons: [],
        }
    );

    const grammarById = new Map(index.grammarBearingRecords.map(
        (record) => [record.itemId, record]
    ));
    s.eq(
        "all 1587 blocked owner assignments satisfy the coordinate-bound schema",
        built.reconciliationRecords.flatMap((record) => {
            const validation = validateGrammarReconciliationRecord(
                record,
                grammarById.get(record.inventoryItemId)
            );
            return validation.blocked
                && validation.errors.length === 0
                ? []
                : [{
                    itemId: record.inventoryItemId,
                    errors: validation.errors,
                }];
        }),
        []
    );

    s.ok(
        "canonical owner assignments never use lesson or documentary authority as a Source object or operation",
        built.classifications.every((classification) => (
            !/lesson|canvas|inventory|example|metadata/iu.test(
                classification.canonicalSourceObjectId
            )
            && !/lesson|canvas|inventory|example|metadata/iu.test(
                classification.sharedOperationId
            )
        ))
    );

    s.eq(
        "every declared genuine choice is an exact grammar-bearing Canvas item",
        {
            count: GENUINE_USER_CHOICE_ITEM_IDS.size,
            unknown: [...GENUINE_USER_CHOICE_ITEM_IDS]
                .filter((itemId) => !index.byId[itemId]),
            nonGrammar: [...GENUINE_USER_CHOICE_ITEM_IDS]
                .filter((itemId) => (
                    index.byId[itemId]?.force !== "grammar-bearing"
                )),
            classified:
                audit.genuineUserChoiceCount,
        },
        {
            count: 21,
            unknown: [],
            nonGrammar: [],
            classified: 21,
        }
    );

    s.ok(
        "every grammar classification carries an exact Canvas coordinate, digest, genuine semantic owner candidate, and non-authorizing disposition",
        built.classifications.every((classification) => (
            /^§(?:1[7-9]|2\d|3[0-4])\./u.test(
                classification.canvasCoordinate.container
            )
            && /^[a-f0-9]{64}$/u.test(
                classification.exactCanvasSpanDigest
            )
            && classification.semanticOwnerId
            && classification.canonicalSourceObjectId
            && classification.sharedOperationId
            && classification.executableDisposition
            && classification.factRole
            && classification.currentDisposition !== "fully-proved"
        ))
    );

    const hostileCopy = {
        ...built.reconciliationRecords[0],
        storedAnswer: "grandfather-this-result",
    };
    s.ok(
        "a shape-compatible blocked record cannot smuggle stored result authority",
        validateGrammarReconciliationRecord(
            hostileCopy,
            grammarById.get(hostileCopy.inventoryItemId)
        ).errors.some((error) => (
            error.includes("storedAnswer")
            || error.includes("storedanswer")
        ))
    );

    const nonAuthority =
        auditLessons1734NonAuthority(index);
    s.eq(
        "every evidence, analysis, and documentary item has an explicit false-authority disposition",
        {
            complete: nonAuthority.complete,
            required: nonAuthority.required,
            dispositioned: nonAuthority.dispositioned,
            byForce: nonAuthority.byForce,
            invalid: nonAuthority.invalid,
        },
        {
            complete: true,
            required: 2464,
            dispositioned: 2464,
            byForce: {
                evidence: 1850,
                analysis: 271,
                documentary: 343,
            },
            invalid: [],
        }
    );

    const nonAuthorityRecords =
        buildLessons1734NonAuthorityRecords(index);
    const finalCompoundSectionNonAuthority =
        nonAuthorityRecords.filter((record) => (
            record.canvasCoordinate.container === "§25.13"
            || record.canvasCoordinate.container === "§25.16"
        ));
    s.eq(
        "§25.13 and §25.16 examples, analyses, and references remain exact non-authoritative witnesses",
        {
            bySection: countsBy(
                finalCompoundSectionNonAuthority.map((record) => ({
                    section: record.canvasCoordinate.container,
                })),
                "section"
            ),
            byForce: countsBy(
                finalCompoundSectionNonAuthority.map((record) => ({
                    force:
                        index.byId[record.inventoryItemId].force,
                })),
                "force"
            ),
            authorityLeaks:
                finalCompoundSectionNonAuthority.filter((record) => {
                    const disposition =
                        record.nonAuthorityDisposition;
                    return disposition.runtimeAuthority !== false
                        || disposition.sourceSupplier !== false
                        || disposition.operationSelector !== false
                        || disposition.resultSupplier !== false;
                }).map((record) => record.inventoryItemId),
        },
        {
            bySection: {
                "§25.13": 12,
                "§25.16": 15,
            },
            byForce: {
                documentary: 2,
                analysis: 11,
                evidence: 14,
            },
            authorityLeaks: [],
        }
    );
    const grammarIds = new Set(index.grammarBearingRecords.map(
        (record) => record.itemId
    ));
    s.eq(
        "all 2464 non-authority records satisfy the shared coordinate contract",
        nonAuthorityRecords.flatMap((record) => {
            const validation =
                validateNonAuthorityDispositionRecord(
                    record,
                    index.byId[record.inventoryItemId],
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
    s.ok(
        "no non-authoritative item can supply Source, select Grammar, or issue either Result projection",
        nonAuthorityRecords.every((record) => {
            const disposition = record.nonAuthorityDisposition;
            return disposition.runtimeAuthority === false
                && disposition.sourceSupplier === false
                && disposition.operationSelector === false
                && disposition.resultSupplier === false
                && disposition.linkedGrammarItemIds.length === 0;
        })
    );

    return s;
}

module.exports = { run };
