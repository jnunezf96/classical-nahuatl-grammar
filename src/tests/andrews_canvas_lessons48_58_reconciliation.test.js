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
    GENUINE_USER_CHOICE_ITEM_IDS,
    LESSONS_48_58_SOURCE_ITEM_COUNT,
    LESSONS_48_58_SOURCE_MANIFEST_DIGEST,
    auditLessons4858Reconciliation,
    buildLessons4858GrammarReconciliation,
    buildLessons4858NonAuthorityRecords,
    sourceManifest,
} = require(
    "../../scripts/reconciliation/andrews_canvas_lessons48_58"
);

const ROOT = path.resolve(__dirname, "..", "..");

function countBy(records, key) {
    const counts = {};
    for (const record of records) {
        const value = record[key];
        counts[value] = (counts[value] || 0) + 1;
    }
    return counts;
}

function lessonFromCoordinate(classification) {
    return Number(
        classification.canvasCoordinate.container
            .match(/^§(\d+)/u)?.[1]
    );
}

function run() {
    const s = createSuite(
        "andrews_canvas_lessons48_58_reconciliation"
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
        "the stable independent Lessons 48-58 population is exact",
        {
            inventoryValid: index.valid,
            count: manifest.count,
            digest: manifest.digest,
            valid: manifest.valid,
            expectedCount: LESSONS_48_58_SOURCE_ITEM_COUNT,
            expectedDigest:
                LESSONS_48_58_SOURCE_MANIFEST_DIGEST,
        },
        {
            inventoryValid: true,
            count: 2784,
            digest:
                "e630fd4310de91cee09860e82fdd148d6e0d30ee601be92b1f8181f0a57400ad",
            valid: true,
            expectedCount: 2784,
            expectedDigest:
                "e630fd4310de91cee09860e82fdd148d6e0d30ee601be92b1f8181f0a57400ad",
        }
    );

    const built = buildLessons4858GrammarReconciliation(
        index,
        canvasText
    );
    const nonAuthority =
        buildLessons4858NonAuthorityRecords(index);
    const audit = auditLessons4858Reconciliation(index, canvasText);

    s.eq(
        "all grammar items are accounted without converting ownership gaps into count-only closure",
        {
            byLesson: countBy(
                built.classifications.map((classification) => ({
                    lesson: lessonFromCoordinate(classification),
                })),
                "lesson"
            ),
            required: audit.required,
            assigned: audit.assigned,
            fullyProved: audit.fullyProved,
            blocked: audit.blocked,
            unowned: audit.unowned,
            unresolved: audit.unresolved,
            accountingValid: audit.accountingValid,
            countOnlyClosures: audit.countOnlyClosures,
            invalidGrammar: audit.invalidGrammarRecords,
        },
        {
            byLesson: {
                48: 108,
                49: 46,
                50: 90,
                51: 46,
                52: 80,
                53: 36,
                54: 158,
                55: 47,
                56: 80,
                57: 46,
                58: 63,
            },
            required: 800,
            assigned: 800,
            fullyProved: 0,
            blocked: 800,
            unowned: 0,
            unresolved: 800,
            accountingValid: true,
            countOnlyClosures: 0,
            invalidGrammar: [],
        }
    );

    s.eq(
        "assignable claims reuse generic production semantic owners",
        countBy(
            built.classifications.filter(
                (record) => record.semanticOwnerId
            ),
            "semanticOwnerId"
        ),
        {
            "classical-nahuatl-place-gentilic-application": 108,
            "classical-nahuatl-adverbial-adjunction-application": 136,
            "classical-nahuatl-clause-composition-application": 127,
            "classical-nahuatl-comparison-application": 35,
            "classical-nahuatl-deverbal-nnc-application": 1,
            "classical-nahuatl-denominal-vnc-application": 206,
            "classical-nahuatl-personal-name-application": 81,
            "classical-nahuatl-vnc-contextual-time-application": 15,
            "classical-nahuatl-vnc-source-valence-application": 8,
            "classical-nahuatl-supplementation-application": 43,
            "classical-nahuatl-ordinary-nnc-application": 11,
            "classical-nahuatl-nominal-construction-application": 29,
        }
    );

    s.eq(
        "curriculum-named Sources and absent textual owners remain exact unowned findings",
        {
            byReason: countBy(
                built.unownedGrammarRecords,
                "reasonCode"
            ),
            byCandidateOperation: countBy(
                built.unownedGrammarRecords,
                "candidateSharedOperationId"
            ),
            byLesson: countBy(
                built.unownedGrammarRecords.map((record) => ({
                    lesson: Number(
                        record.canvasCoordinate.container
                            .match(/^§(\d+)/u)?.[1]
                    ),
                })),
                "lesson"
            ),
            missingOwnerCount: built.missingOwnerItemIds.length,
        },
        {
            byReason: {},
            byCandidateOperation: {},
            byLesson: {},
            missingOwnerCount: 0,
        }
    );

    const byId = new Map(built.classifications.map(
        (record) => [record.inventoryItemId, record]
    ));
    s.eq(
        "cross-range claims follow their semantic object and expose rather than alias conflicting Source paths",
        [
            "ACI-P510-L019-64C93E0C02",
            "ACI-P535-L014-79273D0EE0",
            "ACI-P552-L012-DC3D1D0DD8",
            "ACI-P577-L032-6819CA0F01",
            "ACI-P582-L028-025CB045A2",
            "ACI-P609-L013-5A28EB4442",
            "ACI-P623-L003-4174F418EA",
            "ACI-P625-L007-B80DA0D0E5",
            "ACI-P629-L037-54FD771B49",
            "ACI-P631-L003-8771E1E254",
            "ACI-P632-L028-EEE0151966",
            "ACI-P635-L041-1E92175792",
            "ACI-P636-L002-3C380510A6",
            "ACI-P637-L038-A4D98CF3B6",
            "ACI-P641-L015-A28BF28866",
        ].map((itemId) => {
            const record = byId.get(itemId);
            return [
                itemId,
                record?.semanticOwnerId || "UNOWNED",
                record?.sharedOperationId
                    || record?.candidateSharedOperationId
                    || "NO-PRODUCTION-OWNER",
                record?.currentDisposition,
            ].join("|");
        }),
        [
            "ACI-P510-L019-64C93E0C02"
                + "|classical-nahuatl-place-gentilic-application"
                + "|nnc:place-gentilic"
                + "|blocked-missing-item-complete-owner-receipt",
            "ACI-P535-L014-79273D0EE0"
                + "|classical-nahuatl-adverbial-adjunction-application"
                + "|clause:adverbial-adjunction"
                + "|blocked-missing-item-complete-owner-receipt",
            "ACI-P552-L012-DC3D1D0DD8"
                + "|classical-nahuatl-clause-composition-application"
                + "|clause:composition"
                + "|blocked-missing-item-complete-owner-receipt",
            "ACI-P577-L032-6819CA0F01"
                + "|classical-nahuatl-comparison-application"
                + "|clause:comparison"
                + "|blocked-missing-item-complete-owner-receipt",
            "ACI-P582-L028-025CB045A2"
                + "|classical-nahuatl-denominal-vnc-application"
                + "|vnc:denominal"
                + "|blocked-missing-item-complete-owner-receipt",
            "ACI-P609-L013-5A28EB4442"
                + "|classical-nahuatl-personal-name-application"
                + "|nnc:personal-name"
                + "|blocked-missing-item-complete-owner-receipt",
            "ACI-P623-L003-4174F418EA"
                + "|classical-nahuatl-vnc-contextual-time-application"
                + "|vnc:application"
                + "|blocked-missing-item-complete-owner-receipt",
            "ACI-P625-L007-B80DA0D0E5"
                + "|classical-nahuatl-vnc-source-valence-application"
                + "|vnc:application"
                + "|blocked-missing-item-complete-owner-receipt",
            "ACI-P629-L037-54FD771B49"
                + "|classical-nahuatl-ordinary-nnc-application"
                + "|nnc:ordinary"
                + "|blocked-missing-item-complete-owner-receipt",
            "ACI-P631-L003-8771E1E254"
                + "|classical-nahuatl-ordinary-nnc-application"
                + "|nnc:ordinary"
                + "|blocked-missing-item-complete-owner-receipt",
            "ACI-P632-L028-EEE0151966"
                + "|classical-nahuatl-denominal-vnc-application"
                + "|vnc:denominal"
                + "|blocked-missing-item-complete-owner-receipt",
            "ACI-P635-L041-1E92175792"
                + "|classical-nahuatl-personal-name-application"
                + "|nnc:personal-name"
                + "|blocked-missing-item-complete-owner-receipt",
            "ACI-P636-L002-3C380510A6"
                + "|classical-nahuatl-supplementation-application"
                + "|sentence:supplementation"
                + "|blocked-missing-item-complete-owner-receipt",
            "ACI-P637-L038-A4D98CF3B6"
                + "|classical-nahuatl-nominal-construction-application"
                + "|grammar:nominal-construction"
                + "|blocked-missing-item-complete-owner-receipt",
            "ACI-P641-L015-A28BF28866"
                + "|classical-nahuatl-clause-composition-application"
                + "|clause:composition"
                + "|blocked-missing-item-complete-owner-receipt",
        ]
    );

    s.eq(
        "only exact structural or operation selections are classified as genuine choices",
        {
            declared: GENUINE_USER_CHOICE_ITEM_IDS.size,
            found: audit.genuineUserChoiceCount,
            unknown: [...GENUINE_USER_CHOICE_ITEM_IDS].filter(
                (itemId) => !byId.has(itemId)
            ),
            nonOperationObjects:
                [...GENUINE_USER_CHOICE_ITEM_IDS].filter(
                    (itemId) => (
                        byId.get(itemId)?.semanticObjectKind
                        !== "operation"
                    )
                ),
        },
        {
            declared: 60,
            found: 60,
            unknown: [],
            nonOperationObjects: [],
        }
    );

    s.ok(
        "every grammar item retains its exact coordinate and source-span digest without disguising unowned items",
        built.classifications.every((classification) => (
            /^§(?:4[89]|5[0-8])\./u.test(
                classification.canvasCoordinate.container
            )
            && /^[a-f0-9]{64}$/u.test(
                classification.exactCanvasSpanDigest
            )
            && (
                classification.semanticOwnerId
                    ? (
                        classification.currentDisposition
                            === "blocked-missing-item-complete-owner-receipt"
                        && !/(?:lesson|canvas|inventory|example|stored)/iu.test(
                            classification.semanticOwnerId
                        )
                        && !/(?:lesson|canvas|inventory|example|stored)/iu.test(
                            classification.canonicalSourceObjectId
                        )
                        && !/(?:lesson|canvas|inventory|example|stored)/iu.test(
                            classification.sharedOperationId
                        )
                    )
                    : (
                        classification.currentDisposition.startsWith(
                            "unowned-"
                        )
                        && classification.canonicalSourceObjectId === ""
                        && classification.sharedOperationId === ""
                    )
            )
        ))
    );

    s.eq(
        "all evidence, analysis, and documentary items are explicitly non-authoritative",
        {
            required: audit.nonGrammarRequired,
            dispositioned: audit.nonGrammarDispositioned,
            byForce: audit.nonGrammarByForce,
            invalid: audit.invalidNonAuthorityRecords,
            activeAuthority: nonAuthority.filter((record) => {
                const disposition = record.nonAuthorityDisposition;
                return disposition.runtimeAuthority
                    || disposition.sourceSupplier
                    || disposition.operationSelector
                    || disposition.resultSupplier;
            }).map((record) => record.inventoryItemId),
        },
        {
            required: 1984,
            dispositioned: 1984,
            byForce: {
                evidence: 1434,
                analysis: 311,
                documentary: 239,
            },
            invalid: [],
            activeAuthority: [],
        }
    );

    const firstBlocked = built.reconciliationRecords[0];
    const forgedClosure = {
        ...firstBlocked,
        status: "fully-proved",
    };
    const forgedGrammarValidation =
        validateGrammarReconciliationRecord(
            forgedClosure,
            index.byId[firstBlocked.inventoryItemId]
        );
    const firstNonAuthority = nonAuthority[0];
    const forgedNonAuthority = {
        ...firstNonAuthority,
        nonAuthorityDisposition: {
            ...firstNonAuthority.nonAuthorityDisposition,
            runtimeAuthority: true,
        },
    };
    const forgedNonAuthorityValidation =
        validateNonAuthorityDispositionRecord(
            forgedNonAuthority,
            index.byId[firstNonAuthority.inventoryItemId],
            new Set(index.grammarBearingRecords.map(
                (record) => record.itemId
            ))
        );
    s.ok(
        "blocked and non-authoritative records cannot be shape-forged into authority",
        forgedGrammarValidation.ok === false
            && forgedGrammarValidation.blocked === false
            && forgedGrammarValidation.errors.length > 0
            && forgedNonAuthorityValidation.ok === false
            && forgedNonAuthorityValidation.errors.length > 0
    );

    return s;
}

module.exports = { run };
