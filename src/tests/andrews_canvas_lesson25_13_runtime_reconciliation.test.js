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
    SECTION_25_13_GRAMMAR_ITEM_IDS,
    auditLessons1734GrammarReconciliation,
    buildLessons1734GrammarReconciliation,
} = require(
    "../../scripts/reconciliation/andrews_canvas_lessons17_34_grammar"
);

const ROOT = path.resolve(__dirname, "..", "..");

function run(runtimeContext = {}) {
    const s = createSuite(
        "andrews_canvas_lesson25_13_runtime_reconciliation"
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
    const records = SECTION_25_13_GRAMMAR_ITEM_IDS.map(
        itemId => recordsById.get(itemId)
    );

    const runtimeReconciliationSummary = {
        attempted:
            built.runtimeReconciliation.attempted,
        fullyProved: records.filter(
            record => record?.status === "fully-proved"
        ).length,
        failures: [
            ...built.runtimeReconciliation.failures.entries(),
        ].filter(([itemId]) => (
            SECTION_25_13_GRAMMAR_ITEM_IDS.includes(itemId)
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
                || (
                    validation.blocked
                    && validation.errors.length === 0
                )
                ? []
                : [{
                    itemId: record?.inventoryItemId || "",
                    errors: validation.errors,
                }];
        }),
    };
    s.eq(
        "all eight exact §25.13 grammar atoms receive in-process owner-bound runtime reconciliation",
        runtimeReconciliationSummary,
        {
            attempted: true,
            fullyProved: 8,
            failures: [],
            invalid: [],
        }
    );
    if (runtimeReconciliationSummary.fullyProved !== 8) {
        return s;
    }

    s.eq(
        "the receipts expose exact independent written and formula projections from the same typed Result",
        records.map(record => [
            record.inventoryItemId,
            record.projections.written.output,
            record.projections.formula.output,
            record.projections.written.typedResultId
                === record.scalarReceipt.typedResultId
            && record.projections.formula.typedResultId
                === record.scalarReceipt.typedResultId,
            record.projections.written.projectionId
                !== record.projections.formula.projectionId,
        ]),
        [
            [
                "ACI-P223-L013-54403BB040",
                "tinēchtēcaquītiltia",
                "#ti-0+n-ēch+⎕-0+tē(caquī-ti-l-tia)0+0-0#",
                true,
                true,
            ],
            [
                "ACI-P223-L013-93465EC1C5",
                "tinēchtēcaquītiltia",
                "#ti-0+n-ēch+⎕-0+tē(caquī-ti-l-tia)0+0-0#",
                true,
                true,
            ],
            [
                "ACI-P223-L013-F59A8CC80D",
                "tinēchtēcaquītiltia",
                "#ti-0+n-ēch+⎕-0+tē(caquī-ti-l-tia)0+0-0#",
                true,
                true,
            ],
            [
                "ACI-P223-L013-FE0B6576A5",
                "tinēchtēcaquītiltia",
                "#ti-0+n-ēch+⎕-0+tē(caquī-ti-l-tia)0+0-0#",
                true,
                true,
            ],
            [
                "ACI-P223-L013-F04885787B",
                "tinēchtēnōtzaltia",
                "#ti-0+n-ēch+tē(nōtza-l-tia)0+0-0#",
                true,
                true,
            ],
            [
                "ACI-P223-L013-D5C78BA9A6",
                "tinēchtēnōtzaltia",
                "#ti-0+n-ēch+tē(nōtza-l-tia)0+0-0#",
                true,
                true,
            ],
            [
                "ACI-P223-L014-38D7D4236F",
                "tinēchnōtzaltia",
                "#ti-0+n-ēch+⎕-0(nōtza-l-tia)0+0-0#",
                true,
                true,
            ],
            [
                "ACI-P223-L014-2265B7752D",
                "tiquinnetlazohtlaltiah",
                "#ti-0+qu-in+ne(tla-zo-h-tla-l-tia)0+0-h#",
                true,
                true,
            ],
        ]
    );

    s.ok(
        "every claim is pointwise scalar-equivalent and explicitly non-actionable in the UI",
        records.every(record => (
            record.paradigm.applicable === true
            && record.paradigm.receipt.coordinateCount === 1
            && record.paradigm.receipt.mismatchCount === 0
            && record.paradigm.receipt.scalarReceiptId
                === record.scalarReceipt.receiptId
            && record.uiReachability.userActionable === false
            && record.uiReachability.applicabilityReceipt
                .decision === "not-user-actionable"
            && record.licensedGrammar.userSelectable === false
        ))
    );

    const copiedScalarReceiptRecord = {
        ...records[0],
        scalarReceipt: {
            ...records[0].scalarReceipt,
        },
    };
    const copiedHostileReceiptRecord = {
        ...records[0],
        hostileAuthorityNegative: {
            ...records[0].hostileAuthorityNegative,
        },
    };
    const copiedScalarValidation =
        validateGrammarReconciliationRecord(
            copiedScalarReceiptRecord,
            grammarById.get(records[0].inventoryItemId)
        );
    const copiedHostileValidation =
        validateGrammarReconciliationRecord(
            copiedHostileReceiptRecord,
            grammarById.get(records[0].inventoryItemId)
        );
    s.eq(
        "copied scalar and hostile receipts cannot retain owner authority by shape",
        {
            copiedScalarAccepted: copiedScalarValidation.ok,
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
        "the full Lessons 17–34 ledger retains this eight-item slice and the adjacent four fully proved composition/source atoms",
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
