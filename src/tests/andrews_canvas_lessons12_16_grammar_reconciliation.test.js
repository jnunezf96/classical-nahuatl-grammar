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
    LESSONS_12_16_SOURCE_ITEM_COUNT,
    LESSONS_12_16_SOURCE_MANIFEST_DIGEST,
    auditLessons1216GrammarReconciliation,
    buildLessons1216GrammarReconciliation,
    sourceManifest,
} = require(
    "../../scripts/reconciliation/andrews_canvas_lessons12_16_grammar"
);
const ROOT = path.resolve(__dirname, "..", "..");

function countsByLesson(records) {
    const counts = {};
    for (const record of records) {
        counts[record.lesson] = (counts[record.lesson] || 0) + 1;
    }
    return counts;
}

function run(ctx = {}) {
    const s = createSuite(
        "andrews_canvas_lessons12_16_grammar_reconciliation"
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
        "the canonical Canvas denominator and section 49.10 transcription are exact",
        {
            valid: index.valid,
            atomicItems: index.summary.atomicItems,
            grammarBearing:
                index.summary.forceTotals["grammar-bearing"],
            evidence: index.summary.forceTotals.evidence,
            analysis: index.summary.forceTotals.analysis,
            documentary: index.summary.forceTotals.documentary,
            section4910Items:
                index.summary.section4910Items,
            correctedHeading:
                canvasText.includes(
                    "49.10. The Adverbialized Nuclear Clause as Principal Clause."
                ),
            malformedHeading:
                canvasText.includes(
                    "49 .10. The Adverbialized Nuclear Clause as Principal Clause."
                ),
        },
        {
            valid: true,
            atomicItems: 28540,
            grammarBearing: 18639,
            evidence: 6524,
            analysis: 1423,
            documentary: 1954,
            section4910Items: 133,
            correctedHeading: true,
            malformedHeading: false,
        }
    );

    s.eq(
        "the manually reviewed Lessons 12-16 source population cannot inherit a new row",
        {
            valid: manifest.valid,
            count: manifest.count,
            digest: manifest.digest,
            expectedCount: LESSONS_12_16_SOURCE_ITEM_COUNT,
            expectedDigest:
                LESSONS_12_16_SOURCE_MANIFEST_DIGEST,
        },
        {
            valid: true,
            count: LESSONS_12_16_SOURCE_ITEM_COUNT,
            digest: LESSONS_12_16_SOURCE_MANIFEST_DIGEST,
            expectedCount: LESSONS_12_16_SOURCE_ITEM_COUNT,
            expectedDigest: LESSONS_12_16_SOURCE_MANIFEST_DIGEST,
        }
    );

    const built = buildLessons1216GrammarReconciliation(
        index,
        canvasText
    );
    const audit = auditLessons1216GrammarReconciliation(
        index,
        canvasText
    );

    s.eq(
        "every effective grammar item has one honest canonical application-owner assignment",
        {
            byLesson: countsByLesson(
                index.grammarBearingRecords.filter(
                    (record) => (
                        record.lesson >= 12
                        && record.lesson <= 16
                    )
                )
            ),
            required: audit.required,
            assigned: audit.assigned,
            fullyProved: audit.fullyProved,
            blocked: audit.blocked,
            unresolved: audit.unresolved,
            unowned: audit.unowned,
            countOnlyClosures: audit.countOnlyClosures,
            invalid: audit.invalidRecords,
        },
        {
            byLesson: {
                12: 114,
                13: 68,
                14: 293,
                15: 130,
                16: 197,
            },
            required: 802,
            assigned: 802,
            fullyProved: 0,
            blocked: 802,
            unresolved: 802,
            unowned: 0,
            countOnlyClosures: 0,
            invalid: [],
        }
    );

    const grammarById = new Map(index.grammarBearingRecords.map(
        (record) => [record.itemId, record]
    ));
    s.eq(
        "all 802 honest blocks satisfy the shared coordinate-bound contract",
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

    s.eq(
        "ordinary and pronominal claims point to the canonical typed Source and licensed operation",
        {
            ordinary: [...new Set(built.classifications
                .filter((record) => (
                    Number(record.canvasCoordinate.container
                        .match(/^§(\d+)/u)?.[1]) <= 15
                ))
                .map((record) => [
                    record.semanticOwnerId,
                    record.canonicalSourceObjectId,
                    record.sharedOperationId,
                ].join("|")))],
            pronominal: [...new Set(built.classifications
                .filter((record) => (
                    record.canvasCoordinate.container
                        .startsWith("§16.")
                ))
                .map((record) => [
                    record.semanticOwnerId,
                    record.canonicalSourceObjectId,
                    record.sharedOperationId,
                ].join("|")))],
            unknownChoiceIds:
                [...GENUINE_USER_CHOICE_ITEM_IDS]
                    .filter((itemId) => !grammarById.has(itemId)),
            genuineChoices: audit.genuineUserChoiceCount,
        },
        {
            ordinary: [
                "classical-nahuatl-ordinary-nnc-application"
                + "|classical-nahuatl-ordinary-nnc-source-frame"
                + "|nnc:ordinary",
            ],
            pronominal: [
                "classical-nahuatl-pronominal-nnc-application"
                + "|classical-nahuatl-pronominal-nnc-source-frame"
                + "|nnc:pronominal",
            ],
            unknownChoiceIds: [],
            genuineChoices: 24,
        }
    );

    s.ok(
        "every grammar item carries its exact Canvas coordinate and source-span digest",
        built.classifications.every((classification) => (
            /^§1[2-6]\./u.test(
                classification.canvasCoordinate.container
            )
            && /^[a-f0-9]{64}$/u.test(
                classification.exactCanvasSpanDigest
            )
            && classification.currentDisposition
                === "blocked-missing-item-complete-owner-receipt"
        ))
    );

    /**
     * These are real owner-issued partial receipts.  They establish that the
     * named owners can execute representative scalar/paradigm/hostile paths;
     * the item reconciliation above deliberately remains blocked because
     * these receipts do not prove every link for every Canvas proposition.
     */
    const ordinarySource =
        ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({
            stem: "mich",
        });
    const ordinaryOperation =
        ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(
            ordinarySource,
            {
                state: "absolutive",
                subject: "1sg",
                sentenceType: "statement",
                polarity: "positive",
            }
        );
    const ordinaryReceipt =
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "nnc:ordinary",
            args: [ordinarySource, ordinaryOperation],
        });
    const ordinaryPlan =
        ctx.prepareClassicalOrdinaryNncParadigmPlan(
            ordinarySource,
            {
                states: ["absolutive", "possessive"],
                subjects: ["1sg", "3sg"],
                possessors: ["1sg", "3sg"],
                sentenceType: "statement",
                polarity: "positive",
            }
        );
    const ordinaryCoordinates =
        ctx.projectClassicalOrdinaryNncParadigmCoordinates(
            ordinaryPlan
        );
    const ordinaryScalars = ordinaryPlan.coordinates.map(
        (coordinate) => ctx.requestClassicalOrdinaryNncResult(
            ordinarySource,
            coordinate.operationFrame
        )
    );
    const ordinaryHostile =
        ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(
            ordinarySource,
            {
                state: "absolutive",
                subject: "1sg",
                formula: "#ni-0(mich)in-0#",
            }
        );

    const pronominalSource =
        ctx.buildClassicalNahuatlPronominalNncSourceFrame({
            stem: "eh-huā",
            embedStem: "eh",
            matrixStem: "huā",
        });
    const pronominalOperation =
        ctx.buildClassicalNahuatlPronominalNncOperationFrame(
            pronominalSource,
            {
                subject: "1sg",
                clausePosition: "initial",
                adjunctorInMode: "none",
                sentenceType: "statement",
                polarity: "positive",
            }
        );
    const pronominalReceipt =
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "nnc:pronominal",
            args: [pronominalSource, pronominalOperation],
        });
    const pronominalPlan =
        ctx.prepareClassicalPronominalNncParadigmPlan(
            pronominalSource,
            {
                sentenceType: "statement",
                polarity: "positive",
            }
        );
    const pronominalCoordinates =
        ctx.projectClassicalPronominalNncParadigmCoordinates(
            pronominalPlan
        );
    const pronominalScalars =
        pronominalPlan.coordinates.map(
            (coordinate) =>
                ctx.requestClassicalPronominalNncResult(
                    pronominalSource,
                    coordinate.operationFrame
                )
        );
    const pronominalHostile =
        ctx.buildClassicalNahuatlPronominalNncSourceFrame({
            stem: "eh-huā",
        });

    const partialReceiptItemIds = [
        "ACI-P115-L016-53D8BE9734",
        "ACI-P118-L035-005DAB2BF0",
        "ACI-P142-L019-7E0A22707B",
        "ACI-P142-L020-7219C3FABE",
        "ACI-P142-L023-D8F38048E9",
    ];
    const blockedById = new Map(
        built.reconciliationRecords.map(
            (record) => [record.inventoryItemId, record.status]
        )
    );
    s.eq(
        "representative links use real owner-issued scalar, independent projection, parity, and hostile receipts without falsely closing an item",
        {
            linkedItems: partialReceiptItemIds.map((itemId) => ({
                itemId,
                status: blockedById.get(itemId),
            })),
            ordinary: {
                receipt: ordinaryReceipt.authorizationStatus,
                operationId: ordinaryReceipt.operationId,
                resultIssued:
                    ctx.isClassicalNahuatlOrdinaryNncResult(
                        ordinaryReceipt.canonicalResult
                    ),
                formula:
                    ordinaryReceipt.canonicalResult
                        .formulaRealization,
                written:
                    ordinaryReceipt.canonicalResult
                        .surfaceRealization,
                independent:
                    ordinaryReceipt.canonicalResult
                        .formulaAndWrittenDerivedIndependently,
                paradigmCount: ordinaryCoordinates.length,
                parity: ordinaryCoordinates.every(
                    (coordinate, index) => (
                        coordinate.formulaRealization
                            === ordinaryScalars[index]
                                .formulaRealization
                        && coordinate.surfaceRealization
                            === ordinaryScalars[index]
                                .surfaceRealization
                    )
                ),
                hostile: ordinaryHostile.authorizationStatus,
                hostileReason: ordinaryHostile.blockReason,
            },
            pronominal: {
                receipt:
                    pronominalReceipt.authorizationStatus,
                operationId: pronominalReceipt.operationId,
                resultIssued:
                    ctx.isClassicalNahuatlPronominalNncResult(
                        pronominalReceipt.canonicalResult
                    ),
                formula:
                    pronominalReceipt.canonicalResult
                        .formulaRealization,
                written:
                    pronominalReceipt.canonicalResult
                        .surfaceRealization,
                independent:
                    pronominalReceipt.canonicalResult
                        .formulaAndWrittenDerivedIndependently,
                paradigmCount: pronominalCoordinates.length,
                parity: pronominalCoordinates.every(
                    (coordinate, index) => (
                        coordinate.formulaRealization
                            === pronominalScalars[index]
                                .formulaRealization
                        && coordinate.surfaceRealization
                            === pronominalScalars[index]
                                .surfaceRealization
                    )
                ),
                hostile:
                    pronominalHostile.authorizationStatus,
                hostileReason: pronominalHostile.blockReason,
            },
        },
        {
            linkedItems: partialReceiptItemIds.map((itemId) => ({
                itemId,
                status: "blocked",
            })),
            ordinary: {
                receipt: "authorized",
                operationId: "nnc:ordinary",
                resultIssued: true,
                formula: "#ni-0(mich)in-0#",
                written: "nimichin",
                independent: true,
                paradigmCount: 6,
                parity: true,
                hostile: "blocked",
                hostileReason:
                    "ordinary-nnc-operation-forbidden-authority:$.formula",
            },
            pronominal: {
                receipt: "authorized",
                operationId: "nnc:pronominal",
                resultIssued: true,
                formula: "#n-0(eh-huā)tl-0#",
                written: "nehhuātl",
                independent: true,
                paradigmCount: 16,
                parity: true,
                hostile: "blocked",
                hostileReason:
                    "pronominal-nnc-source-constituent-structure-mismatch",
            },
        }
    );

    return s;
}

module.exports = { run };
