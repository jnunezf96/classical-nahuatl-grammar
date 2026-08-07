"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");
const {
    buildAndrewsCanvasInventoryIndex,
    validateGrammarReconciliationRecord,
} = require(
    "../../scripts/lib/andrews_canvas_inventory_reconciliation"
);
const {
    GENUINE_USER_CHOICE_ITEM_IDS,
    LESSONS_35_47_SOURCE_ITEM_COUNT,
    LESSONS_35_47_SOURCE_MANIFEST_DIGEST,
    auditLessons3547Reconciliation,
    buildLessons3547GrammarReconciliation,
    buildLessons3547NonAuthorityRecords,
    sourceManifest,
} = require(
    "../../scripts/reconciliation/andrews_canvas_lessons35_47"
);

const ROOT = path.resolve(__dirname, "..", "..");

function countBy(records, key) {
    const counts = {};
    for (const record of records) {
        const value = record[key];
        counts[value] = (counts[value] || 0) + 1;
    }
    return counts;
}

function run() {
    const s = createSuite(
        "andrews_canvas_lessons35_47_reconciliation"
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
        "the stable independent Lessons 35-47 population is exact",
        {
            inventoryValid: index.valid,
            count: manifest.count,
            digest: manifest.digest,
            valid: manifest.valid,
            expectedCount: LESSONS_35_47_SOURCE_ITEM_COUNT,
            expectedDigest:
                LESSONS_35_47_SOURCE_MANIFEST_DIGEST,
        },
        {
            inventoryValid: true,
            count: 3837,
            digest:
                "80b67c26d5c8c15903390f06a27538cc412e7320400a49840e65f43fcceeee38",
            valid: true,
            expectedCount: 3837,
            expectedDigest:
                "80b67c26d5c8c15903390f06a27538cc412e7320400a49840e65f43fcceeee38",
        }
    );

    const built = buildLessons3547GrammarReconciliation(
        index,
        canvasText
    );
    const nonAuthority =
        buildLessons3547NonAuthorityRecords(index);
    const audit = auditLessons3547Reconciliation(index, canvasText);

    s.eq(
        "every grammar item is assigned and honestly blocked where its item-complete owner receipt is absent",
        {
            byLesson: countBy(
                built.classifications.map((classification) => ({
                    lesson: Number(
                        classification.canvasCoordinate.container
                            .match(/^§(\d+)/u)?.[1]
                    ),
                })),
                "lesson"
            ),
            required: audit.required,
            assigned: audit.assigned,
            fullyProved: audit.fullyProved,
            blocked: audit.blocked,
            unresolved: audit.unresolved,
            unowned: audit.unowned,
            countOnlyClosures: audit.countOnlyClosures,
            invalidGrammar: audit.invalidGrammarRecords,
            missingOwners: audit.missingOwnerItemIds,
        },
        {
            byLesson: {
                35: 145,
                36: 120,
                37: 81,
                38: 44,
                39: 114,
                40: 98,
                41: 53,
                42: 75,
                43: 49,
                44: 97,
                45: 82,
                46: 169,
                47: 61,
            },
            required: 1188,
            assigned: 1188,
            fullyProved: 0,
            blocked: 1188,
            unresolved: 1188,
            unowned: 0,
            countOnlyClosures: 0,
            invalidGrammar: [],
            missingOwners: [],
        }
    );

    s.eq(
        "claims reuse canonical semantic operations instead of lesson routes",
        countBy(built.classifications, "semanticOwnerId"),
        {
            "classical-nahuatl-deverbal-nnc-application": 595,
            "classical-nahuatl-adjectival-modification-application": 125,
            "classical-nahuatl-ordinary-nnc-application": 18,
            "classical-nahuatl-pronominal-nnc-application": 6,
            "classical-nahuatl-relational-nnc-application": 313,
            "classical-nahuatl-nominal-construction-application": 33,
            "classical-nahuatl-denominal-vnc-application": 1,
            "classical-nahuatl-adverbial-nnc-application": 97,
        }
    );

    const byId = new Map(built.classifications.map(
        (record) => [record.inventoryItemId, record]
    ));
    s.eq(
        "cross-range claims are owned by their semantic object rather than their curriculum location",
        [
            "ACI-P410-L010-C72A5BA476",
            "ACI-P410-L024-99DB2B2C11",
            "ACI-P420-L002-9DC50ABC06",
            "ACI-P420-L009-55FDC3FD6B",
            "ACI-P427-L002-EBB87F618C",
            "ACI-P427-L004-28A5386180",
            "ACI-P429-L018-BCFB1BD99F",
            "ACI-P436-L023-93A2D65748",
            "ACI-P445-L018-DB17719C8E",
            "ACI-P461-L018-40F785213D",
        ].map((itemId) => {
            const record = byId.get(itemId);
            return [
                itemId,
                record?.semanticOwnerId,
                record?.sharedOperationId,
            ].join("|");
        }),
        [
            "ACI-P410-L010-C72A5BA476"
                + "|classical-nahuatl-pronominal-nnc-application"
                + "|nnc:pronominal",
            "ACI-P410-L024-99DB2B2C11"
                + "|classical-nahuatl-relational-nnc-application"
                + "|nnc:relational",
            "ACI-P420-L002-9DC50ABC06"
                + "|classical-nahuatl-ordinary-nnc-application"
                + "|nnc:ordinary",
            "ACI-P420-L009-55FDC3FD6B"
                + "|classical-nahuatl-adjectival-modification-application"
                + "|nnc:adjectival-modification",
            "ACI-P427-L002-EBB87F618C"
                + "|classical-nahuatl-denominal-vnc-application"
                + "|vnc:denominal",
            "ACI-P427-L004-28A5386180"
                + "|classical-nahuatl-deverbal-nnc-application"
                + "|nnc:deverbal-construction",
            "ACI-P429-L018-BCFB1BD99F"
                + "|classical-nahuatl-adjectival-modification-application"
                + "|nnc:adjectival-modification",
            "ACI-P436-L023-93A2D65748"
                + "|classical-nahuatl-nominal-construction-application"
                + "|grammar:nominal-construction",
            "ACI-P445-L018-DB17719C8E"
                + "|classical-nahuatl-adverbial-nnc-application"
                + "|nnc:adverbial",
            "ACI-P461-L018-40F785213D"
                + "|classical-nahuatl-relational-nnc-application"
                + "|nnc:relational",
        ]
    );

    s.eq(
        "only exact operation-selection claims are classified as genuine choices",
        {
            declared: GENUINE_USER_CHOICE_ITEM_IDS.size,
            found: audit.genuineUserChoiceCount,
            unknown: [...GENUINE_USER_CHOICE_ITEM_IDS].filter(
                (itemId) => !byId.has(itemId)
            ),
            nonOperationObjects:
                [...GENUINE_USER_CHOICE_ITEM_IDS].filter(
                    (itemId) => (
                        byId.get(itemId)?.semanticObjectKind
                        !== "operation"
                    )
                ),
            operations: [...new Set(
                [...GENUINE_USER_CHOICE_ITEM_IDS].map(
                    (itemId) => byId.get(itemId)?.sharedOperationId
                )
            )].sort(),
        },
        {
            declared: 18,
            found: 18,
            unknown: [],
            nonOperationObjects: [],
            operations: [
                "nnc:adjectival-modification",
                "nnc:adverbial",
                "nnc:deverbal-construction",
                "nnc:relational",
            ],
        }
    );

    s.ok(
        "every grammar assignment retains an exact coordinate and source-span digest without documentary owner names",
        built.classifications.every((classification) => (
            /^§(?:3[5-9]|4[0-7])\./u.test(
                classification.canvasCoordinate.container
            )
            && /^[a-f0-9]{64}$/u.test(
                classification.exactCanvasSpanDigest
            )
            && classification.currentDisposition
                === "blocked-missing-item-complete-owner-receipt"
            && !/(?:lesson|canvas|inventory|example|stored)/iu.test(
                classification.semanticOwnerId
            )
            && !/(?:lesson|canvas|inventory|example|stored)/iu.test(
                classification.sharedOperationId
            )
        ))
    );

    s.eq(
        "all evidence, analysis, and documentary items are explicitly non-authoritative",
        {
            required: audit.nonGrammarRequired,
            dispositioned: audit.nonGrammarDispositioned,
            byForce: audit.nonGrammarByForce,
            invalid: audit.invalidNonAuthorityRecords,
            activeAuthority: nonAuthority.filter((record) => {
                const disposition = record.nonAuthorityDisposition;
                return disposition.runtimeAuthority
                    || disposition.sourceSupplier
                    || disposition.operationSelector
                    || disposition.resultSupplier;
            }).map((record) => record.inventoryItemId),
        },
        {
            required: 2649,
            dispositioned: 2649,
            byForce: {
                evidence: 2073,
                analysis: 152,
                documentary: 424,
            },
            invalid: [],
            activeAuthority: [],
        }
    );

    const firstBlocked = built.reconciliationRecords[0];
    const forgedClosure = {
        ...firstBlocked,
        status: "fully-proved",
    };
    const forgedValidation = validateGrammarReconciliationRecord(
        forgedClosure,
        index.byId[firstBlocked.inventoryItemId]
    );
    s.ok(
        "a renamed blocked record cannot become a shape-authorized proof",
        forgedValidation.ok === false
            && forgedValidation.blocked === false
            && forgedValidation.errors.length > 0
    );

    return s;
}

module.exports = { run };
