"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");
const {
    auditAndrewsCanvasReconciliations,
    buildAndrewsCanvasInventoryIndex,
    validateGrammarReconciliationRecord,
} = require(
    "../../scripts/lib/andrews_canvas_inventory_reconciliation"
);
const { LESSON1_NON_AUTHORITY_RECORDS } = require(
    "../../scripts/reconciliation/andrews_canvas_lesson1_non_authority"
);
const {
    LESSON_1_GRAMMAR_CLAIM_GROUPS,
    auditLesson1GrammarReconciliation,
} = require(
    "../../scripts/reconciliation/andrews_canvas_lesson1_grammar"
);

const ROOT = path.resolve(__dirname, "..", "..");

function run() {
    const s = createSuite("andrews_canvas_lesson1_grammar_reconciliation");
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
    const audit = auditLesson1GrammarReconciliation(index, canvasText);

    s.eq(
        "the canonical Lesson 1 grammar denominator is mapped bijectively",
        {
            required: audit.required,
            assigned: audit.assigned,
            missing: audit.missingItemIds,
            duplicates: audit.duplicateItemIds,
            unexpected: audit.unexpectedItemIds,
            invalid: audit.invalidRecords,
            mappedIds: new Set(
                LESSON_1_GRAMMAR_CLAIM_GROUPS.flatMap(
                    (group) => group.itemIds
                )
            ).size,
        },
        {
            required: 203,
            assigned: 203,
            missing: [],
            duplicates: [],
            unexpected: [],
            invalid: [],
            mappedIds: 203,
        }
    );

    s.eq(
        "no incomplete Lesson 1 item is promoted to a proof",
        {
            complete: audit.complete,
            fullyProved: audit.fullyProved,
            blocked: audit.blocked,
            unresolved: audit.unresolved,
            unowned: audit.unowned,
        },
        {
            complete: false,
            fullyProved: 0,
            blocked: 203,
            unresolved: 203,
            unowned: 0,
        }
    );

    s.ok(
        "every Lesson 1 record preserves its exact coordinate and Canvas span digest",
        audit.classifications.every((classification) => (
            classification.inventoryItemId
                === classification.canvasCoordinate.itemId
            && /^§1\./u.test(classification.canvasCoordinate.container)
            && /^[a-f0-9]{64}$/u.test(
                classification.exactCanvasSpanDigest
            )
        ))
    );

    const lesson1ById = new Map(
        index.grammarBearingRecords
            .filter((record) => record.lesson === 1)
            .map((record) => [record.itemId, record])
    );
    s.ok(
        "every explicit block passes the shared fail-closed record schema",
        audit.reconciliationRecords.every((record) => {
            const validation = validateGrammarReconciliationRecord(
                record,
                lesson1ById.get(record.inventoryItemId)
            );
            return validation.ok === false
                && validation.blocked === true
                && validation.errors.length === 0;
        })
    );

    s.eq(
        "Lesson 1 exposes no conceptual, lexical, derived, contextual, or boundary fact as a user operation",
        audit.genuineUserChoiceCount,
        0
    );

    const sharedAudit = auditAndrewsCanvasReconciliations(
        index,
        [
            ...audit.reconciliationRecords,
            ...LESSON1_NON_AUTHORITY_RECORDS,
        ]
    );
    s.eq(
        "the shared full audit consumes the 435 real Lesson 1 records without treating blocks as closure",
        {
            suppliedRecords:
                audit.reconciliationRecords.length
                + LESSON1_NON_AUTHORITY_RECORDS.length,
            grammarRequired: sharedAudit.grammar.required,
            grammarAssigned: sharedAudit.grammar.assigned,
            grammarBlocked: sharedAudit.grammar.blocked,
            grammarUnresolved: sharedAudit.grammar.unresolved,
            grammarUnowned: sharedAudit.grammar.unowned,
            evidenceDispositioned:
                sharedAudit.nonGrammar.evidence.dispositioned,
            analysisDispositioned:
                sharedAudit.nonGrammar.analysis.dispositioned,
            documentaryDispositioned:
                sharedAudit.nonGrammar.documentary.dispositioned,
            duplicates: sharedAudit.duplicateItemIds,
            unknown: sharedAudit.unknownItemIds,
            complete: sharedAudit.complete,
        },
        {
            suppliedRecords: 435,
            grammarRequired: 5344,
            grammarAssigned: 203,
            grammarBlocked: 203,
            grammarUnresolved: 5344,
            grammarUnowned: 5141,
            evidenceDispositioned: 68,
            analysisDispositioned: 149,
            documentaryDispositioned: 15,
            duplicates: [],
            unknown: [],
            complete: false,
        }
    );

    return s;
}

module.exports = { run };
