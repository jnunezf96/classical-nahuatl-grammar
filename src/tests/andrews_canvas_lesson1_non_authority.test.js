"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");
const {
    buildAndrewsCanvasInventoryIndex,
    validateNonAuthorityDispositionRecord,
} = require("../../scripts/lib/andrews_canvas_inventory_reconciliation");
const {
    LESSON1_NON_AUTHORITY_RECORDS,
    auditLesson1NonAuthority,
} = require("../../scripts/reconciliation/andrews_canvas_lesson1_non_authority");

const ROOT = path.resolve(__dirname, "..", "..");

function sorted(values) {
    return [...values].sort();
}

function run() {
    const s = createSuite("andrews_canvas_lesson1_non_authority");
    const index = buildAndrewsCanvasInventoryIndex({
        inventoryText: fs.readFileSync(
            path.join(ROOT, "docs", "ANDREWS_CANVAS_INVENTORY.md"),
            "utf8"
        ),
        canvasText: fs.readFileSync(
            path.join(ROOT, "ANDREWS_TRANSCRIPTION_CANVAS.md"),
            "utf8"
        ),
    });
    const audit = auditLesson1NonAuthority(index);
    const nonGrammar = index.records.filter(
        (record) => record.lesson === 1 && record.force !== "grammar-bearing"
    );
    const inventoryIds = sorted(nonGrammar.map((record) => record.itemId));
    const dispositionIds = sorted(
        LESSON1_NON_AUTHORITY_RECORDS.map(
            (record) => record.inventoryItemId
        )
    );

    s.eq(
        "every canonical Lesson 1 non-grammar item has one explicit disposition",
        {
            inventoryNonGrammar: inventoryIds.length,
            dispositioned: dispositionIds.length,
            dispositionIds,
        },
        {
            inventoryNonGrammar: 232,
            dispositioned: 232,
            dispositionIds: inventoryIds,
        }
    );

    s.eq(
        "Lesson 1 audit closes canonical force accounting without an overlay",
        {
            valid: audit.valid,
            complete: audit.complete,
            examined: audit.examined,
            dispositioned: audit.dispositioned,
            unresolved: audit.unresolved,
            lesson1ForceTotals: audit.lesson1ForceTotals,
            globalForceTotals: audit.globalForceTotals,
            failures: audit.failures,
        },
        {
            valid: true,
            complete: true,
            examined: 232,
            dispositioned: {
                evidence: 68,
                analysis: 149,
                documentary: 15,
            },
            unresolved: {
                evidence: 0,
                analysis: 0,
                documentary: 0,
            },
            lesson1ForceTotals: {
                "grammar-bearing": 203,
                evidence: 68,
                analysis: 149,
                documentary: 15,
            },
            globalForceTotals: {
                documentary: 1118,
                analysis: 1108,
                evidence: 6228,
                "grammar-bearing": 5344,
            },
            failures: [],
        }
    );

    const grammarItemIds = new Set(
        index.grammarBearingRecords.map((record) => record.itemId)
    );
    const validationFailures = [];
    for (const record of LESSON1_NON_AUTHORITY_RECORDS) {
        const validation = validateNonAuthorityDispositionRecord(
            record,
            index.byId[record.inventoryItemId],
            grammarItemIds
        );
        if (!validation.ok) {
            validationFailures.push({
                itemId: record.inventoryItemId,
                errors: validation.errors,
            });
        }
    }
    s.eq(
        "all 232 non-authority records satisfy the shared coordinate-bound schema",
        validationFailures,
        []
    );

    s.eq(
        "all non-authority records explicitly deny every runtime authority role",
        LESSON1_NON_AUTHORITY_RECORDS.filter((record) => {
            const disposition = record.nonAuthorityDisposition;
            return disposition.runtimeAuthority !== false
                || disposition.sourceSupplier !== false
                || disposition.operationSelector !== false
                || disposition.resultSupplier !== false;
        }).map((record) => record.inventoryItemId),
        []
    );

    s.eq(
        "every linked witness targets a current grammar-bearing inventory item",
        LESSON1_NON_AUTHORITY_RECORDS.flatMap((record) =>
            record.nonAuthorityDisposition.linkedGrammarItemIds
                .filter((itemId) => !grammarItemIds.has(itemId))
                .map((itemId) => `${record.inventoryItemId}->${itemId}`)
        ),
        []
    );

    return s;
}

module.exports = { run };
