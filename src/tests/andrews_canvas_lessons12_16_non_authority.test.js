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
    + "andrews_canvas_inventory_line_dispositions_lessons12_16"
);
const {
    auditLessons1216NonAuthority,
    buildLessons1216NonAuthorityRecords,
} = require(
    "../../scripts/reconciliation/andrews_canvas_lessons12_16_non_authority"
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
        "andrews_canvas_lessons12_16_non_authority"
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
        (record) => record.lesson >= 12 && record.lesson <= 16
    );
    s.eq(
        "the canonical Lessons 12-16 denominator reflects reviewed proposition force",
        {
            total: lessonRecords.length,
            lesson12: countsBy(lessonRecords.filter(
                (record) => record.lesson === 12
            ), "force"),
            lesson13: countsBy(lessonRecords.filter(
                (record) => record.lesson === 13
            ), "force"),
            lesson14: countsBy(lessonRecords.filter(
                (record) => record.lesson === 14
            ), "force"),
            lesson15: countsBy(lessonRecords.filter(
                (record) => record.lesson === 15
            ), "force"),
            lesson16: countsBy(lessonRecords.filter(
                (record) => record.lesson === 16
            ), "force"),
        },
        {
            total: 945,
            lesson12: {
                "grammar-bearing": 99,
                analysis: 15,
                documentary: 2,
                evidence: 5,
            },
            lesson13: {
                "grammar-bearing": 62,
                analysis: 10,
                evidence: 2,
                documentary: 3,
            },
            lesson14: {
                "grammar-bearing": 165,
                documentary: 7,
                evidence: 102,
                analysis: 20,
            },
            lesson15: {
                analysis: 23,
                "grammar-bearing": 55,
                evidence: 68,
                documentary: 7,
            },
            lesson16: {
                "grammar-bearing": 127,
                analysis: 40,
                evidence: 125,
                documentary: 8,
            },
        }
    );

    const lineCoverage =
        buildAndrewsCanvasInventoryLineCoverageAudit({
            inventory: index,
            canvasText,
            dispositions:
                ANDREWS_CANVAS_INVENTORY_LINE_DISPOSITIONS,
        });
    const scopedCandidates = lineCoverage.candidates.filter(
        (record) => record.lesson >= 12 && record.lesson <= 16
    );
    const scopedUnresolved = lineCoverage.undispositioned.filter(
        (record) => record.lesson >= 12 && record.lesson <= 16
    );
    s.eq(
        "manual line review leaves no Lessons 12-16 proposition outside an atom or exact non-atomic disposition",
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
            reviewedNonAtomic: 56,
            scopedCandidates: 56,
            scopedUnresolved: 0,
            duplicateDispositionLines: [],
            unknownDispositionLines: [],
            invalidDispositions: [],
        }
    );

    const audit = auditLessons1216NonAuthority(index);
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
            required: 437,
            dispositioned: 437,
            byForce: {
                evidence: 302,
                analysis: 108,
                documentary: 27,
            },
            invalid: [],
        }
    );

    const records = buildLessons1216NonAuthorityRecords(index);
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

    const recordById = new Map(records.map(
        (record) => [record.inventoryItemId, record]
    ));
    s.eq(
        "formula examples, translations, and historical spellings remain witnesses or documentary analysis only",
        [
            "ACI-P119-L004-FBBDBD8C47",
            "ACI-P117-L040-AB60134648",
            "ACI-P123-L013-20A70F50E1",
            "ACI-P136-L018-8B6D188736",
            "ACI-P146-L025-8BFBD677DB",
        ].map((itemId) => {
            const disposition =
                recordById.get(itemId).nonAuthorityDisposition;
            return {
                itemId,
                kind: disposition.kind,
                runtimeAuthority: disposition.runtimeAuthority,
                sourceSupplier: disposition.sourceSupplier,
                operationSelector: disposition.operationSelector,
                resultSupplier: disposition.resultSupplier,
            };
        }),
        [
            {
                itemId: "ACI-P119-L004-FBBDBD8C47",
                kind: "evidence-not-used",
            },
            {
                itemId: "ACI-P117-L040-AB60134648",
                kind: "analysis-guidance",
            },
            {
                itemId: "ACI-P123-L013-20A70F50E1",
                kind: "cross-reference",
            },
            {
                itemId: "ACI-P136-L018-8B6D188736",
                kind: "evidence-not-used",
            },
            {
                itemId: "ACI-P146-L025-8BFBD677DB",
                kind: "evidence-not-used",
            },
        ].map((record) => ({
            ...record,
            runtimeAuthority: false,
            sourceSupplier: false,
            operationSelector: false,
            resultSupplier: false,
        }))
    );

    s.ok(
        "no non-authority row can link itself into runtime authority",
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
