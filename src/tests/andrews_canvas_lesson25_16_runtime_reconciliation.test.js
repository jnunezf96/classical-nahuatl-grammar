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
    SECTION_25_16_GRAMMAR_ITEM_IDS,
    auditLessons1734GrammarReconciliation,
    buildLessons1734GrammarReconciliation,
} = require(
    "../../scripts/reconciliation/andrews_canvas_lessons17_34_grammar"
);
const {
    LIVE_UI_BLOCKER,
    buildSupplementationRuntimeReconciliation,
    buildSupplementationRuntimeScenario,
    scanConflictingAuthorityPath,
} = require(
    "../../scripts/reconciliation/"
    + "andrews_canvas_supplementation_runtime"
);

const ROOT = path.resolve(__dirname, "..", "..");

function run(runtimeContext = {}) {
    const s = createSuite(
        "andrews_canvas_lesson25_16_runtime_reconciliation"
    );
    const inventoryText = fs.readFileSync(
        path.join(
            ROOT,
            "docs",
            "ANDREWS_CANVAS_INVENTORY.md"
        ),
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
    const documentaryBuild =
        buildLessons1734GrammarReconciliation(
            index,
            canvasText
        );
    const classificationsById = new Map(
        documentaryBuild.classifications.map(record => [
            record.inventoryItemId,
            record,
        ])
    );
    const inventoryById = new Map(
        index.grammarBearingRecords.map(record => [
            record.itemId,
            record,
        ])
    );
    const directRuntime =
        buildSupplementationRuntimeReconciliation({
            inventoryRecords:
                SECTION_25_16_GRAMMAR_ITEM_IDS.map(
                    itemId => inventoryById.get(itemId)
                ),
            classifications:
                SECTION_25_16_GRAMMAR_ITEM_IDS.map(
                    itemId => classificationsById.get(itemId)
                ),
            runtimeContext,
            rootDir: ROOT,
        });
    const provedIds = [
        "ACI-P224-L023-5F7E12F303",
        "ACI-P224-L023-00A73C7DF4",
    ];
    const uiBlockedId =
        "ACI-P224-L023-BE002E40FA";
    const provedRecords = provedIds.map(
        itemId => directRuntime.records.get(itemId)
    );

    s.eq(
        "the two derived §25.16 atoms receive complete owner-bound receipts while the genuine UI operation remains honestly blocked",
        {
            attempted: directRuntime.attempted,
            provedIds: [
                ...directRuntime.records.keys(),
            ],
            failures: [
                ...directRuntime.failures.entries(),
            ],
            invalid: provedRecords.filter(Boolean).flatMap(record => {
                const validation =
                    validateGrammarReconciliationRecord(
                        record,
                        inventoryById.get(
                            record?.inventoryItemId
                        )
                    );
                return validation.ok
                    ? []
                    : [{
                        itemId:
                            record?.inventoryItemId || "",
                        errors: validation.errors,
                    }];
            }),
        },
        {
            attempted: true,
            provedIds,
            failures: [[uiBlockedId, LIVE_UI_BLOCKER]],
            invalid: [],
        }
    );
    if (
        provedRecords.some(
            record => record?.status !== "fully-proved"
        )
    ) {
        return s;
    }

    s.eq(
        "the exact silent-object result projects written and formula outputs independently from one owner-issued supplementation Result",
        provedRecords.map(record => [
            record.inventoryItemId,
            record.projections.written.output,
            record.projections.formula.output,
            record.projections.written.typedResultId
                === record.scalarReceipt.typedResultId,
            record.projections.formula.typedResultId
                === record.scalarReceipt.typedResultId,
            record.projections.written.projectionId
                !== record.projections.formula.projectionId,
        ]),
        provedIds.map(itemId => [
            itemId,
            "In cintli quimmāmaltiah.",
            "in + #0-0(cin)tli-0# + "
                + "#0-0+qu-in+⎕-0(māma-l-tia)0+0-h#",
            true,
            true,
            true,
        ])
    );

    s.eq(
        "typed Source, exact-negative, parity, hostile authority, and removal receipts all bind to the existing supplementation owner",
        provedRecords.map(record => [
            record.inventoryItemId,
            record.semanticOwner.ownerId,
            record.semanticOwner.canonicalSourceObjectId,
            record.semanticOwner.sharedOperationId,
            record.scalarReceipt.productionPathId,
            record.typedSourceRequirements.constituents
                .map(constituent => constituent.name),
            record.validation.rejectionReceipt
                .rejectionReasonCode,
            record.paradigm.receipt.scalarEvaluatorId,
            record.paradigm.receipt.coordinateCount,
            record.paradigm.receipt.mismatchCount,
            record.hostileAuthorityNegative
                .rejectionReasonCode,
            record.hostileAuthorityNegative.resultIssued,
            record.conflictingPathRemoval.status,
            record.conflictingPathRemoval.receipt.matchCount,
            record.uiReachability.userActionable,
            record.uiReachability.applicabilityReceipt
                .decision,
        ]),
        provedIds.map(itemId => [
            itemId,
            "classical-nahuatl-supplementation-operation",
            "classical-nahuatl-supplementation-operation-request",
            "sentence:supplementation",
            "typed-clause-results>canonical-grammar-application>"
                + "licensed-supplementation>"
                + "canonical-sentence-result",
            [
                "principal-clause-result",
                "supplement-clause-result",
                "shared-referent-relation",
            ],
            "typed-principal-personal-head-required",
            "evaluateClassicalNahuatlSupplementationOperation",
            2,
            0,
            "authorized-typed-principal-and-supplement-required",
            false,
            "removed",
            0,
            false,
            "not-user-actionable",
        ])
    );

    const copiedScalarValidation =
        validateGrammarReconciliationRecord(
            {
                ...provedRecords[0],
                scalarReceipt: {
                    ...provedRecords[0].scalarReceipt,
                },
            },
            inventoryById.get(provedRecords[0].inventoryItemId)
        );
    const copiedHostileValidation =
        validateGrammarReconciliationRecord(
            {
                ...provedRecords[1],
                hostileAuthorityNegative: {
                    ...provedRecords[1]
                        .hostileAuthorityNegative,
                },
            },
            inventoryById.get(provedRecords[1].inventoryItemId)
        );
    s.eq(
        "spread copies of scalar and hostile receipts lose owner authority",
        {
            copiedScalarAccepted:
                copiedScalarValidation.ok,
            copiedScalarRejected:
                copiedScalarValidation.errors.includes(
                    "record.scalarReceipt:"
                    + "owner-issued-runtime-receipt-required"
                ),
            copiedHostileAccepted:
                copiedHostileValidation.ok,
            copiedHostileRejected:
                copiedHostileValidation.errors.includes(
                    "record.hostileAuthorityNegative:"
                    + "owner-issued-runtime-receipt-required"
                ),
        },
        {
            copiedScalarAccepted: false,
            copiedScalarRejected: true,
            copiedHostileAccepted: false,
            copiedHostileRejected: true,
        }
    );

    const scenario =
        buildSupplementationRuntimeScenario(runtimeContext);
    s.eq(
        "the UI-blocked third atom nevertheless reaches the canonical scalar and pointwise paradigm path without a parallel result lane",
        {
            canonicalApplication: [
                scenario.silent.applicationResult
                    .authorizationStatus,
                scenario.silent.applicationResult.operationId,
                scenario.silent.applicationResult
                    .canonicalResult
                    === scenario.silentResult,
            ],
            silent: [
                scenario.silentResult.authorizationStatus,
                scenario.silentResult.referenceFrame
                    .principalHead.id,
                scenario.silentResult.referenceFrame
                    .principalHead.silent,
                scenario.silentResult.formulaRealization,
                scenario.silentResult.surfaceRealization,
            ],
            sounded: [
                scenario.soundedResult.authorizationStatus,
                scenario.soundedResult.referenceFrame
                    .principalHead.id,
                scenario.soundedResult.referenceFrame
                    .principalHead.silent,
            ],
            paradigm: [
                scenario.paradigm.scalarBuilder,
                scenario.paradigm.coordinateCount,
                scenario.paradigm.authorizedCoordinateCount,
                scenario.paradigm.rows.every(
                    row => row.authorizationStatus
                        === "authorized"
                ),
            ],
            exactNegative: [
                scenario.negativeResult.authorizationStatus,
                scenario.negativeResult.blockReason,
                scenario.negativeResult.formulaRealization || "",
                scenario.negativeResult.surfaceRealization || "",
                scenario.negativeApplicationEvidence.rejected,
                scenario.negativeApplicationEvidence.diagnostic,
            ],
            copiedClause: [
                scenario.hostileEvidence.copiedClauseResult
                    .authorizationStatus,
                scenario.hostileEvidence.copiedClauseResult
                    .blockReason,
                scenario.hostileApplicationEvidence.rejected,
                scenario.hostileApplicationEvidence.diagnostic,
            ],
            forgedProjection: [
                scenario.hostileEvidence.forgedProjectionResult
                    .authorizationStatus,
                scenario.hostileEvidence.forgedProjectionResult
                    .blockReason,
                scenario.forgedProjectionApplicationEvidence
                    .rejected,
                scenario.forgedProjectionApplicationEvidence
                    .diagnostic,
            ],
            conflictingPathMatches:
                scanConflictingAuthorityPath(ROOT).matchCount,
        },
        {
            canonicalApplication: [
                "authorized",
                "sentence:supplementation",
                true,
            ],
            silent: [
                "authorized",
                "source-object-1",
                true,
                "in + #0-0(cin)tli-0# + "
                    + "#0-0+qu-in+⎕-0(māma-l-tia)0+0-h#",
                "In cintli quimmāmaltiah.",
            ],
            sounded: [
                "authorized",
                "source-object-1",
                false,
            ],
            paradigm: [
                "evaluateClassicalNahuatlSupplementationOperation",
                2,
                2,
                true,
            ],
            exactNegative: [
                "blocked",
                "typed-principal-personal-head-required",
                "",
                "",
                true,
                "typed-principal-personal-head-required",
            ],
            copiedClause: [
                "blocked",
                "authorized-typed-principal-and-supplement-required",
                true,
                "classical-grammar-application-request-invalid:"
                    + "forbidden-authority:formulaRealization",
            ],
            forgedProjection: [
                "blocked",
                "forbidden-supplementation-request-authority:"
                    + "formulaRealization",
                true,
                "classical-grammar-application-request-invalid:"
                    + "forbidden-authority:formulaRealization",
            ],
            conflictingPathMatches: 0,
        }
    );

    const integrated =
        buildLessons1734GrammarReconciliation(
            index,
            canvasText,
            {
                runtimeContext,
                rootDir: ROOT,
            }
        );
    const integratedRecordsById = new Map(
        integrated.reconciliationRecords.map(record => [
            record.inventoryItemId,
            record,
        ])
    );
    const integratedClassificationsById = new Map(
        integrated.classifications.map(record => [
            record.inventoryItemId,
            record,
        ])
    );
    s.eq(
        "the Lessons 17–34 builder installs only the two complete receipts and preserves the third item as blocked",
        SECTION_25_16_GRAMMAR_ITEM_IDS.map(itemId => [
            itemId,
            integratedRecordsById.get(itemId)?.status,
            integratedClassificationsById.get(itemId)
                ?.currentDisposition,
            integrated.runtimeReconciliation.failures
                .get(itemId) || "",
        ]),
        [
            [
                "ACI-P224-L023-5F7E12F303",
                "fully-proved",
                "fully-proved-owner-runtime-receipt",
                "",
            ],
            [
                "ACI-P224-L023-00A73C7DF4",
                "fully-proved",
                "fully-proved-owner-runtime-receipt",
                "",
            ],
            [
                uiBlockedId,
                "blocked",
                "blocked-missing-item-complete-owner-receipt",
                LIVE_UI_BLOCKER,
            ],
        ]
    );

    const audit = auditLessons1734GrammarReconciliation(
        index,
        canvasText,
        {
            runtimeContext,
            rootDir: ROOT,
        }
    );
    s.eq(
        "the slice advances only the two honestly complete atoms",
        {
            required: audit.required,
            assigned: audit.assigned,
            fullyProved: audit.fullyProved,
            blocked: audit.blocked,
            unresolved: audit.unresolved,
            unowned: audit.unowned,
            invalid: audit.invalidRecords,
            runtimeDispositioned:
                audit.classifications.filter(
                    classification => (
                        classification.currentDisposition
                            === "fully-proved-owner-runtime-receipt"
                    )
                ).length,
        },
        {
            required: 1587,
            assigned: 1587,
            fullyProved: 12,
            blocked: 1575,
            unresolved: 1575,
            unowned: 0,
            invalid: [],
            runtimeDispositioned: 12,
        }
    );

    return s;
}

module.exports = { run };
