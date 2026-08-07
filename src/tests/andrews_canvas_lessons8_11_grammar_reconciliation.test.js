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
    LESSONS_8_11_SOURCE_ITEM_COUNT,
    LESSONS_8_11_SOURCE_MANIFEST_DIGEST,
    auditLessons811GrammarReconciliation,
    buildLessons811GrammarReconciliation,
    sourceManifest,
} = require(
    "../../scripts/reconciliation/andrews_canvas_lessons8_11_grammar"
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
        "andrews_canvas_lessons8_11_grammar_reconciliation"
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
        "the canonical independent denominator and source fingerprint are exact",
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
            sourceCount: manifest.count,
            sourceDigest: manifest.digest,
            sourceValid: manifest.valid,
            expectedCount: LESSONS_8_11_SOURCE_ITEM_COUNT,
            expectedDigest:
                LESSONS_8_11_SOURCE_MANIFEST_DIGEST,
        },
        {
            valid: true,
            atomicItems: 13798,
            grammarBearing: 5344,
            evidence: 6228,
            analysis: 1108,
            documentary: 1118,
            section4910Items: 44,
            sourceCount: 636,
            sourceDigest:
                "1738ae5234b86d10f3058e816649f128641d0b90c75dd833ea8e80c47618bc6a",
            sourceValid: true,
            expectedCount: 636,
            expectedDigest:
                "1738ae5234b86d10f3058e816649f128641d0b90c75dd833ea8e80c47618bc6a",
        }
    );

    const built = buildLessons811GrammarReconciliation(
        index,
        canvasText
    );
    const audit = auditLessons811GrammarReconciliation(
        index,
        canvasText
    );

    s.eq(
        "every effective grammar item has one honest canonical VNC or sentence-owner assignment",
        {
            byLesson: countsByLesson(
                index.grammarBearingRecords.filter(
                    (record) => (
                        record.lesson >= 8
                        && record.lesson <= 11
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
                8: 77,
                9: 60,
                10: 61,
                11: 106,
            },
            required: 304,
            assigned: 304,
            fullyProved: 0,
            blocked: 304,
            unresolved: 304,
            unowned: 0,
            countOnlyClosures: 0,
            invalid: [],
        }
    );

    const grammarById = new Map(index.grammarBearingRecords.map(
        (record) => [record.itemId, record]
    ));
    s.eq(
        "all honest blocks satisfy the shared coordinate-bound contract",
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
        "word claims and sentence-composition claims reuse only their canonical owners",
        [...new Set(built.classifications.map((record) => [
            record.semanticOwnerId,
            record.canonicalSourceObjectId,
            record.sharedOperationId,
        ].join("|")))].sort(),
        [
            "classical-nahuatl-vnc-application"
            + "|classical-nahuatl-vnc-application-request"
            + "|vnc:application",
            "classical-nahuatl-vnc-sentence-result"
            + "|classical-nahuatl-vnc-application-frame"
            + "|vnc:sentence-result",
        ]
    );

    s.eq(
        "only manually identified operation values are user choices",
        {
            unknownChoiceIds:
                [...GENUINE_USER_CHOICE_ITEM_IDS]
                    .filter((itemId) => !grammarById.has(itemId)),
            genuineChoices: audit.genuineUserChoiceCount,
            invalidOwnerLabels: built.classifications
                .filter((record) => (
                    /lesson/iu.test(record.semanticOwnerId)
                    || /lesson/iu.test(
                        record.canonicalSourceObjectId
                    )
                    || /lesson/iu.test(record.sharedOperationId)
                ))
                .map((record) => record.inventoryItemId),
        },
        {
            unknownChoiceIds: [],
            genuineChoices: 16,
            invalidOwnerLabels: [],
        }
    );

    s.ok(
        "every grammar item carries its exact Canvas coordinate and span digest",
        built.classifications.every((classification) => (
            /^§(?:8|9|10|11)\./u.test(
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
     * Real owner-issued scalar, sentence, paradigm, and hostile receipts prove
     * the shared paths exist. They deliberately do not close any exact Canvas
     * item because they do not supply the complete per-item receipt chain.
     */
    const application =
        ctx.createClassicalNahuatlVncApplication(ctx);
    const request = {
        sourceStem: "(itt-a)",
        verbClass: "A",
        sourceValence: "specific-projective",
        objectPerson: "3sg",
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "direct",
        requestedVoice: "active",
        sentenceOptions: {
            directionalPrefix: "on",
            directionalIttaContraction: "rare",
        },
    };
    const scalar = application.evaluate(request);
    const sentence =
        ctx.requestClassicalVncSentenceResultFrame(scalar);
    const hostile = application.evaluate({
        ...request,
        lesson: 8,
        formula: "#copied-answer#",
        surface: "copied-answer",
    });
    const paradigm = ctx.buildClassicalVncParadigmFrame({
        basalUnit: "vnc",
        stem: "chōca",
        sourceTransitivity: "intransitive",
        sourceMatrixStem: "chōca",
        verbClass: "A",
        requestedVerbClass: "A",
        valence: "intransitive",
        requestedValence: "intransitive",
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        objectKind: "none",
        objectPerson: "",
        derivationType: "direct",
        requestedVoice: "active",
        lateOperation: "none",
        sentenceNegativeMode: "positive",
        sentenceSurfaceMode: "statement",
    }, {
        valenceKeys: ["intransitive"],
        groupKeys: ["imperfective-indicative"],
        tenseKeys: ["present"],
        subjectKeys: ["1sg"],
    });
    const row = paradigm.rows[0];
    const coordinate = row.preparedCoordinateFrame;
    const blockedById = new Map(
        built.reconciliationRecords.map(
            (record) => [record.inventoryItemId, record.status]
        )
    );

    s.eq(
        "owner-issued partial receipts cannot masquerade as item-complete proof",
        {
            linkedItems: [
                "ACI-P087-L013-9E1F033E21",
                "ACI-P091-L030-6467ED5179",
            ].map((itemId) => ({
                itemId,
                status: blockedById.get(itemId),
            })),
            scalar: {
                status: scalar.authorizationStatus,
                formula:
                    scalar.resultFrame.formulaRealization,
                written:
                    scalar.resultFrame.surfaceRealization,
                typedFrameAuthority:
                    scalar.resultFrame.typedFrameAuthority,
                formulaStringAuthority:
                    scalar.resultFrame.formulaStringAuthority,
                surfaceStringAuthority:
                    scalar.resultFrame.surfaceStringAuthority,
            },
            sentence: {
                status: sentence.authorizationStatus,
                canonical:
                    ctx.isClassicalNahuatlVncSentenceResultFrame(
                        sentence
                    ),
                formula: sentence.sentenceFormulaDisplay,
                written: sentence.sentenceSurfaceDisplay,
            },
            paradigm: {
                status: paradigm.authorizationStatus,
                rowCount: paradigm.rowCount,
                scalarEquivalent:
                    coordinate.scalarEquivalent,
                formulaParity:
                    row.formula
                        === coordinate.scalarApplicationFrame
                            .resultFrame.formulaRealization,
                writtenParity:
                    row.surface
                        === coordinate.sentenceSurfaceDisplay,
            },
            hostile: {
                status: hostile.authorizationStatus,
                reason: hostile.blockReason,
            },
        },
        {
            linkedItems: [
                {
                    itemId: "ACI-P087-L013-9E1F033E21",
                    status: "blocked",
                },
                {
                    itemId: "ACI-P091-L030-6467ED5179",
                    status: "blocked",
                },
            ],
            scalar: {
                status: "authorized",
                formula: "#no-0+c-0+o(tt-a)0+0-0#",
                written: "nocotta",
                typedFrameAuthority: true,
                formulaStringAuthority: false,
                surfaceStringAuthority: false,
            },
            sentence: {
                status: "authorized",
                canonical: true,
                formula: "#no-0+c-0+o(tt-a)0+0-0#",
                written: "nocotta",
            },
            paradigm: {
                status: "authorized",
                rowCount: 1,
                scalarEquivalent: true,
                formulaParity: true,
                writtenParity: true,
            },
            hostile: {
                status: "blocked",
                reason:
                    "classical-vnc-application-caller-authority-rejected",
            },
        }
    );

    return s;
}

module.exports = { run };
