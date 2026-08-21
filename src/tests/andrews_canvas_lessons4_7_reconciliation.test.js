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
    buildAndrewsCanvasInventoryLineCoverageAudit,
} = require(
    "../../scripts/lib/andrews_canvas_inventory_line_coverage"
);
const {
    ANDREWS_CANVAS_INVENTORY_LINE_DISPOSITIONS,
} = require(
    "../../scripts/reconciliation/"
    + "andrews_canvas_inventory_line_dispositions_lessons4_7"
);
const {
    LESSONS_4_7_SOURCE_ITEM_COUNT,
    LESSONS_4_7_SOURCE_MANIFEST_DIGEST,
    auditLessons47Reconciliation,
    buildLessons47GrammarReconciliation,
    buildLessons47NonAuthorityRecords,
    sourceManifest,
} = require(
    "../../scripts/reconciliation/andrews_canvas_lessons4_7"
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
    const s = createSuite("andrews_canvas_lessons4_7_reconciliation");
    const inventoryText = fs.readFileSync(
        path.join(ROOT, "docs", "ANDREWS_CANVAS_INVENTORY.md"),
        "utf8"
    );
    const canvasText = fs.readFileSync(
        path.join(ROOT, "ANDREWS_TRANSCRIPTION_CANVAS.md"),
        "utf8"
    );
    const sourceIndex = buildAndrewsCanvasInventoryIndex({
        inventoryText,
        canvasText,
    });
    const manifest = sourceManifest(sourceIndex);

    s.eq(
        "the reviewed Lessons 4-7 source population is exact and fail-closed",
        {
            valid: manifest.valid,
            count: manifest.count,
            digest: manifest.digest,
            expectedCount: LESSONS_4_7_SOURCE_ITEM_COUNT,
            expectedDigest: LESSONS_4_7_SOURCE_MANIFEST_DIGEST,
        },
        {
            valid: true,
            count: LESSONS_4_7_SOURCE_ITEM_COUNT,
            digest: LESSONS_4_7_SOURCE_MANIFEST_DIGEST,
            expectedCount: LESSONS_4_7_SOURCE_ITEM_COUNT,
            expectedDigest: LESSONS_4_7_SOURCE_MANIFEST_DIGEST,
        }
    );

    const lineAudit = buildAndrewsCanvasInventoryLineCoverageAudit({
        inventory: sourceIndex,
        canvasText,
        dispositions: ANDREWS_CANVAS_INVENTORY_LINE_DISPOSITIONS,
    });
    s.eq(
        "every Lessons 4-7 Canvas line is an exact atom span or a reviewed non-atomic line",
        {
            lessons: Object.fromEntries([4, 5, 6, 7].map((lesson) => [
                lesson,
                lineAudit.perLesson[lesson],
            ])),
            duplicates: lineAudit.duplicateDispositionLines,
            unknown: lineAudit.unknownDispositionLines,
            invalid: lineAudit.invalidDispositions,
        },
        {
            lessons: {
                4: {
                    uncoveredLines: 7,
                    dispositionedLines: 7,
                    unresolvedLines: 0,
                },
                5: {
                    uncoveredLines: 9,
                    dispositionedLines: 9,
                    unresolvedLines: 0,
                },
                6: {
                    uncoveredLines: 5,
                    dispositionedLines: 5,
                    unresolvedLines: 0,
                },
                7: {
                    uncoveredLines: 32,
                    dispositionedLines: 32,
                    unresolvedLines: 0,
                },
            },
            duplicates: [],
            unknown: [],
            invalid: [],
        }
    );

    const requiredOmissionIds = [
        "ACI-P068-L030-652EE57238",
        "ACI-P073-L034-DB645E57A4",
        "ACI-P080-L002-010EC96158",
        "ACI-P080-L003-5B631C05B2",
        "ACI-P080-L028-DC3520E23E",
        "ACI-P080-L030-A3103EEDD3",
    ];
    s.eq(
        "all six line-disproof omissions are now denominator-bound atoms",
        requiredOmissionIds.map((itemId) => {
            const record = sourceIndex.byId[itemId];
            return [
                record.itemId,
                record.canvasSpan,
                record.category,
                record.force,
            ];
        }),
        [
            ["ACI-P068-L030-652EE57238", "2591", "CON", "grammar-bearing"],
            ["ACI-P073-L034-DB645E57A4", "2787", "CON", "grammar-bearing"],
            ["ACI-P080-L002-010EC96158", "3007", "EXA", "evidence"],
            ["ACI-P080-L003-5B631C05B2", "3008", "EXA", "evidence"],
            ["ACI-P080-L028-DC3520E23E", "3033", "INV", "grammar-bearing"],
            ["ACI-P080-L030-A3103EEDD3", "3035", "RUL", "grammar-bearing"],
        ]
    );

    s.eq(
        "both truncated atoms now bind their complete Canvas continuations",
        [
            sourceIndex.byId["ACI-P077-L013-8BD5CC70A0"].canvasSpan,
            sourceIndex.byId["ACI-P081-L019-49E2C9C31D"].canvasSpan,
        ],
        ["2886–2891", "3068–3070"]
    );

    s.eq(
        "canonical Lessons 4-7 force totals follow reviewed claims",
        Object.fromEntries([4, 5, 6, 7].map((lesson) => [
            lesson,
            countsBy(
                sourceIndex.records.filter(
                    (record) => record.lesson === lesson
                ),
                "force"
            ),
        ])),
        {
            4: {
                "grammar-bearing": 111,
                analysis: 25,
                documentary: 11,
                evidence: 20,
            },
            5: {
                "grammar-bearing": 141,
                analysis: 12,
                documentary: 24,
                evidence: 23,
            },
            6: {
                "grammar-bearing": 110,
                analysis: 3,
                documentary: 10,
                evidence: 15,
            },
            7: {
                "grammar-bearing": 188,
                evidence: 100,
                analysis: 29,
                documentary: 27,
            },
        }
    );

    const audit = auditLessons47Reconciliation(
        sourceIndex,
        canvasText
    );
    s.eq(
        "every effective grammar item has one honest canonical-owner assignment",
        {
            required: audit.required,
            assigned: audit.assigned,
            fullyProved: audit.fullyProved,
            blocked: audit.blocked,
            unresolved: audit.unresolved,
            unowned: audit.unowned,
            countOnlyClosures: audit.countOnlyClosures,
            missingOwners: audit.missingOwnerItemIds,
            invalid: audit.invalidGrammarRecords,
        },
        {
            required: 550,
            assigned: 550,
            fullyProved: 0,
            blocked: 550,
            unresolved: 550,
            unowned: 0,
            countOnlyClosures: 0,
            missingOwners: [],
            invalid: [],
        }
    );

    s.eq(
        "all evidence, analysis, and documentary items are explicitly non-authoritative",
        {
            required: audit.nonGrammarRequired,
            dispositioned: audit.nonGrammarDispositioned,
            byForce: audit.nonGrammarByForce,
            invalid: audit.invalidNonAuthorityRecords,
        },
        {
            required: 299,
            dispositioned: 299,
            byForce: {
                evidence: 158,
                analysis: 69,
                documentary: 72,
            },
            invalid: [],
        }
    );

    const grammar = buildLessons47GrammarReconciliation(
        sourceIndex,
        canvasText
    );
    const ownerValues = (lesson, key) => Array.from(new Set(
        grammar.classifications
            .filter((record) => (
                record.canvasCoordinate.container.startsWith(`§${lesson}.`)
            ))
            .map((record) => record[key])
    )).sort();
    s.eq(
        "assignments reuse canonical routes and typed source structures",
        {
            lesson4Operations: ownerValues(4, "sharedOperationId"),
            lesson5Operations: ownerValues(5, "sharedOperationId"),
            lesson6Operations: ownerValues(6, "sharedOperationId"),
            lesson7Operations: ownerValues(7, "sharedOperationId"),
        },
        {
            lesson4Operations: ["vnc:nuclear-clause"],
            lesson5Operations: [
                "vnc:finite-slot",
                "vnc:source-selection",
            ],
            lesson6Operations: ["vnc:transitive-object"],
            lesson7Operations: [
                "vnc:nuclear-clause",
                "vnc:source-selection",
                "vnc:transitive-object",
                "vnc:verbstem-class",
            ],
        }
    );

    const grammarById = new Map(
        sourceIndex.grammarBearingRecords.map(
            (record) => [record.itemId, record]
        )
    );
    s.eq(
        "every grammar block satisfies the hardened fail-closed contract",
        grammar.reconciliationRecords.flatMap((record) => {
            const validation = validateGrammarReconciliationRecord(
                record,
                grammarById.get(record.inventoryItemId)
            );
            return validation.blocked && validation.errors.length === 0
                ? []
                : [{
                    itemId: record.inventoryItemId,
                    errors: validation.errors,
                }];
        }),
        []
    );

    const nonAuthority =
        buildLessons47NonAuthorityRecords(sourceIndex);
    const grammarIds = new Set(
        sourceIndex.grammarBearingRecords.map((record) => record.itemId)
    );
    s.eq(
        "every non-authority disposition is coordinate-bound and valid",
        nonAuthority.flatMap((record) => {
            const validation = validateNonAuthorityDispositionRecord(
                record,
                sourceIndex.byId[record.inventoryItemId],
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
        "formula instances and examples never become runtime authority",
        nonAuthority.every((record) => {
            const disposition = record.nonAuthorityDisposition;
            return disposition.runtimeAuthority === false
                && disposition.sourceSupplier === false
                && disposition.operationSelector === false
                && disposition.resultSupplier === false;
        })
    );

    s.ok(
        "every grammar coordinate carries an exact source-span digest",
        grammar.classifications.every((classification) => (
            /^§[4-7]\./u.test(classification.canvasCoordinate.container)
            && /^[a-f0-9]{64}$/u.test(
                classification.exactCanvasSpanDigest
            )
        ))
    );

    return s;
}

module.exports = { run };
