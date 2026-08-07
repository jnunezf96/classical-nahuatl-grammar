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
    SECTION_25_14_15_GRAMMAR_ITEM_IDS,
    auditLessons1734GrammarReconciliation,
    buildLessons1734GrammarReconciliation,
} = require(
    "../../scripts/reconciliation/andrews_canvas_lessons17_34_grammar"
);

const ROOT = path.resolve(__dirname, "..", "..");

function run(runtimeContext = {}) {
    const s = createSuite(
        "andrews_canvas_lesson25_14_15_runtime_reconciliation"
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
    const built = buildLessons1734GrammarReconciliation(
        index,
        canvasText,
        {
            runtimeContext,
            rootDir: ROOT,
        }
    );
    const grammarById = new Map(
        index.grammarBearingRecords.map(record => [
            record.itemId,
            record,
        ])
    );
    const recordsById = new Map(
        built.reconciliationRecords.map(record => [
            record.inventoryItemId,
            record,
        ])
    );
    const classificationsById = new Map(
        built.classifications.map(record => [
            record.inventoryItemId,
            record,
        ])
    );
    const records = SECTION_25_14_15_GRAMMAR_ITEM_IDS.map(
        itemId => recordsById.get(itemId)
    );

    s.eq(
        "both exact §§25.14–25.15 grammar atoms receive owner-bound runtime reconciliation",
        {
            attempted:
                built.runtimeReconciliation.attempted,
            fullyProved: records.filter(
                record => record?.status === "fully-proved"
            ).length,
            failures: [
                ...built.runtimeReconciliation.failures.entries(),
            ].filter(([itemId]) => (
                SECTION_25_14_15_GRAMMAR_ITEM_IDS.includes(itemId)
            )),
            invalid: records.flatMap(record => {
                const validation =
                    validateGrammarReconciliationRecord(
                        record,
                        grammarById.get(
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
            fullyProved: 2,
            failures: [],
            invalid: [],
        }
    );
    if (
        records.some(
            record => record?.status !== "fully-proved"
        )
    ) {
        return s;
    }

    s.eq(
        "the two atoms identify reusable application-owned composition rules rather than lesson operations",
        SECTION_25_14_15_GRAMMAR_ITEM_IDS.map(itemId => {
            const classification =
                classificationsById.get(itemId);
            return [
                itemId,
                classification.semanticObjectId,
                classification.semanticObjectKind,
                classification.semanticOwnerId,
                classification.canonicalSourceObjectId,
                classification.sharedOperationId,
                classification.executableDisposition,
                classification.factRole,
                classification.currentDisposition,
            ];
        }),
        [
            [
                "ACI-P223-L014-D44004664E",
                "vnc-causative-finite-mood-composition",
                "composition-rule",
                "classical-nahuatl-vnc-application",
                "classical-nahuatl-vnc-application-request",
                "vnc:application",
                "composition",
                "derived",
                "fully-proved-owner-runtime-receipt",
            ],
            [
                "ACI-P224-L011-C1552EFF79",
                "vnc-causative-target-voice-composition",
                "composition-rule",
                "classical-nahuatl-vnc-application",
                "classical-nahuatl-vnc-application-request",
                "vnc:application",
                "composition",
                "derived",
                "fully-proved-owner-runtime-receipt",
            ],
        ]
    );

    s.eq(
        "each exact atom binds independently generated written and formula projections to one owner-issued typed Result",
        records.map(record => [
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
        [
            [
                "ACI-P223-L014-D44004664E",
                "nictlachīhualti",
                "#ni-0+c-0+tla(chīhua-l-ti)0+⎕-0#",
                true,
                true,
                true,
            ],
            [
                "ACI-P224-L011-C1552EFF79",
                "titlachīhualtīloh",
                "#ti-0+tla(chīhua-l-tī-lo)0+0-h#",
                true,
                true,
                true,
            ],
        ]
    );

    s.eq(
        "the receipts prove all four mood coordinates and all five target-voice coordinates through the scalar evaluator",
        records.map(record => [
            record.inventoryItemId,
            record.paradigm.applicable,
            record.paradigm.receipt.coordinateCount,
            record.paradigm.receipt.mismatchCount,
            record.paradigm.receipt.scalarReceiptId
                === record.scalarReceipt.receiptId,
            record.validation.rejectionReceipt
                .rejectionReasonCode,
        ]),
        [
            [
                "ACI-P223-L014-D44004664E",
                true,
                4,
                0,
                true,
                "classical-vnc-derivation-operation-not-authorized",
            ],
            [
                "ACI-P224-L011-C1552EFF79",
                true,
                5,
                0,
                true,
                "classical-vnc-target-voice-not-authorized-for-source",
            ],
        ]
    );

    s.eq(
        "Source remains constituent-only while existing mood, force, and voice choices need no lesson-specific control",
        records.map(record => [
            record.inventoryItemId,
            record.typedSourceRequirements.constituents
                .map(constituent => constituent.name),
            record.licensedGrammar.userSelectable,
            record.uiReachability.userActionable,
            record.uiReachability.applicabilityReceipt
                .decision,
            record.hostileAuthorityNegative
                .rejectionReasonCode,
            record.hostileAuthorityNegative.resultIssued,
            record.conflictingPathRemoval.status,
            record.conflictingPathRemoval.receipt.matchCount,
        ]),
        [
            [
                "ACI-P223-L014-D44004664E",
                [
                    "source-stem",
                    "verbstem-class",
                    "source-valence",
                    "source-participants",
                ],
                false,
                false,
                "not-user-actionable",
                "classical-vnc-application-caller-authority-rejected",
                false,
                "removed",
                0,
            ],
            [
                "ACI-P224-L011-C1552EFF79",
                [
                    "source-stem",
                    "verbstem-class",
                    "source-valence",
                    "source-participants",
                    "source-voice",
                ],
                false,
                false,
                "not-user-actionable",
                "classical-vnc-application-caller-authority-rejected",
                false,
                "removed",
                0,
            ],
        ]
    );

    const copiedScalarValidation =
        validateGrammarReconciliationRecord(
            {
                ...records[0],
                scalarReceipt: {
                    ...records[0].scalarReceipt,
                },
            },
            grammarById.get(records[0].inventoryItemId)
        );
    const copiedHostileValidation =
        validateGrammarReconciliationRecord(
            {
                ...records[1],
                hostileAuthorityNegative: {
                    ...records[1]
                        .hostileAuthorityNegative,
                },
            },
            grammarById.get(records[1].inventoryItemId)
        );
    s.eq(
        "copied scalar and hostile receipts lose owner authority",
        {
            copiedScalarAccepted:
                copiedScalarValidation.ok,
            copiedScalarRejected:
                copiedScalarValidation.errors.includes(
                    "record.scalarReceipt:owner-issued-runtime-receipt-required"
                ),
            copiedHostileAccepted:
                copiedHostileValidation.ok,
            copiedHostileRejected:
                copiedHostileValidation.errors.includes(
                    "record.hostileAuthorityNegative:owner-issued-runtime-receipt-required"
                ),
        },
        {
            copiedScalarAccepted: false,
            copiedScalarRejected: true,
            copiedHostileAccepted: false,
            copiedHostileRejected: true,
        }
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
        "the Lessons 17–34 ledger retains the prior eight atoms, this two-atom slice, and the two fully proved §25.16 derived atoms",
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
