"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");
const {
    buildAndrewsCanvasInventoryIndex,
    validateNonAuthorityDispositionRecord,
} = require(
    "../../scripts/lib/andrews_canvas_inventory_reconciliation"
);
const {
    buildAndrewsCanvasInventoryLineCoverageAudit,
} = require(
    "../../scripts/lib/andrews_canvas_inventory_line_coverage"
);
const {
    ANDREWS_CANVAS_INVENTORY_LINE_DISPOSITIONS,
} = require(
    "../../scripts/reconciliation/"
    + "andrews_canvas_inventory_line_dispositions_lessons8_11"
);
const {
    auditLessons811NonAuthority,
    buildLessons811NonAuthorityRecords,
} = require(
    "../../scripts/reconciliation/andrews_canvas_lessons8_11_non_authority"
);

const ROOT = path.resolve(__dirname, "..", "..");

function countsBy(records, key) {
    const counts = {};
    for (const record of records) {
        counts[record[key]] = (counts[record[key]] || 0) + 1;
    }
    return counts;
}

function run() {
    const s = createSuite(
        "andrews_canvas_lessons8_11_non_authority"
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

    const lessonRecords = index.records.filter(
        (record) => record.lesson >= 8 && record.lesson <= 11
    );
    s.eq(
        "the canonical Lessons 8-11 force partition accounts for the complete fixed population",
        {
            total: lessonRecords.length,
            lesson8: countsBy(lessonRecords.filter(
                (record) => record.lesson === 8
            ), "force"),
            lesson9: countsBy(lessonRecords.filter(
                (record) => record.lesson === 9
            ), "force"),
            lesson10: countsBy(lessonRecords.filter(
                (record) => record.lesson === 10
            ), "force"),
            lesson11: countsBy(lessonRecords.filter(
                (record) => record.lesson === 11
            ), "force"),
        },
        {
            total: 636,
            lesson8: {
                "grammar-bearing": 77,
                documentary: 3,
                evidence: 48,
                analysis: 9,
            },
            lesson9: {
                "grammar-bearing": 60,
                documentary: 5,
                analysis: 3,
                evidence: 59,
            },
            lesson10: {
                "grammar-bearing": 61,
                analysis: 10,
                evidence: 46,
                documentary: 2,
            },
            lesson11: {
                "grammar-bearing": 106,
                analysis: 19,
                documentary: 8,
                evidence: 120,
            },
        }
    );

    const audit = auditLessons811NonAuthority(index);
    s.eq(
        "every evidence, analysis, and documentary item has an explicit non-authority disposition",
        {
            complete: audit.complete,
            required: audit.required,
            dispositioned: audit.dispositioned,
            byForce: audit.byForce,
            invalid: audit.invalid,
        },
        {
            complete: true,
            required: 332,
            dispositioned: 332,
            byForce: {
                evidence: 273,
                analysis: 41,
                documentary: 18,
            },
            invalid: [],
        }
    );

    const records = buildLessons811NonAuthorityRecords(index);
    const grammarIds = new Set(index.grammarBearingRecords.map(
        (record) => record.itemId
    ));
    s.eq(
        "all non-authority records satisfy the shared coordinate contract",
        records.flatMap((record) => {
            const validation = validateNonAuthorityDispositionRecord(
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

    const lineCoverage =
        buildAndrewsCanvasInventoryLineCoverageAudit({
            inventory: index,
            canvasText,
            dispositions:
                ANDREWS_CANVAS_INVENTORY_LINE_DISPOSITIONS,
        });
    const scopedCandidates = lineCoverage.candidates.filter(
        (record) => record.lesson >= 8 && record.lesson <= 11
    );
    const scopedUnresolved = lineCoverage.undispositioned.filter(
        (record) => record.lesson >= 8 && record.lesson <= 11
    );
    s.eq(
        "manual line review leaves no Lessons 8-11 proposition outside an atom or exact non-atomic disposition",
        {
            reviewedNonAtomic:
                ANDREWS_CANVAS_INVENTORY_LINE_DISPOSITIONS.length,
            scopedCandidates: scopedCandidates.length,
            scopedUnresolved: scopedUnresolved.length,
            duplicateDispositionLines:
                lineCoverage.duplicateDispositionLines,
            unknownDispositionLines:
                lineCoverage.unknownDispositionLines,
            invalidDispositions:
                lineCoverage.invalidDispositions,
        },
        {
            reviewedNonAtomic: 59,
            scopedCandidates: 59,
            scopedUnresolved: 0,
            duplicateDispositionLines: [],
            unknownDispositionLines: [],
            invalidDispositions: [],
        }
    );

    s.ok(
        "documentary examples and analyses cannot supply runtime authority",
        records.every((record) => {
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
