"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");
const {
    INVENTORY_EXPECTATIONS,
    auditAndrewsCanvasReconciliations,
    buildAndrewsCanvasInventoryIndex,
    issueOwnerBoundReconciliationReceipt,
    parseMarkdownTableRow,
    stableSha256,
    validateGrammarReconciliationRecord,
    validateNonAuthorityDispositionRecord,
} = require("../../scripts/lib/andrews_canvas_inventory_reconciliation");

const ROOT = path.resolve(__dirname, "..", "..");

function clone(value) {
    return JSON.parse(JSON.stringify(value));
}

function canvasCoordinate(record) {
    return {
        itemId: record.itemId,
        container: record.container,
        pdfPage: record.pdfPage,
        pageLine: record.pageLine,
        canvasSpan: record.canvasSpan,
    };
}

function receipt(
    kind,
    semanticOwnerId,
    suffix,
    extra = {},
    resultProof = null
) {
    const ownerEvidence = Object.freeze({
        kind: "schema-test-owner-evidence",
        suffix,
    });
    const validateOwnerEvidence = (candidate) => candidate === ownerEvidence;
    const value = {
        receiptId: `synthetic-schema-receipt:${suffix}`,
        kind,
        semanticOwnerId,
        productionPathId: "typed-source>licensed-operation>typed-result",
        inputDigest: stableSha256(`input:${suffix}`),
        observations: [{
            assertionId: `synthetic-schema-assertion:${suffix}`,
            passed: true,
        }],
        ...extra,
    };
    return issueOwnerBoundReconciliationReceipt(value, {
        semanticOwnerId,
        ownerEvidence,
        validateOwnerEvidence,
        ...(resultProof || {}),
    });
}

function fullyProvedSchemaRecord(inventoryRecord) {
    const ownerId = "classical-vnc-finite-owner";
    const sourceObjectId = "classical-vnc-source";
    const operationId = "vnc:finite-generation";
    const typedResultId = "typed-result:synthetic-schema";
    const resultDigest = stableSha256("typed-result");
    const typedResult = Object.freeze({
        kind: "schema-test-typed-result",
        id: typedResultId,
    });
    const scalarReceipt = receipt(
        "owner-issued-scalar-execution",
        ownerId,
        "scalar",
        {
            operationId,
            outcome: "applied",
            typedResultId,
            resultDigest,
        },
        {
            typedResult,
            typedResultId,
            typedResultDigest: resultDigest,
        }
    );
    return {
        inventoryItemId: inventoryRecord.itemId,
        status: "fully-proved",
        canvasCoordinate: canvasCoordinate(inventoryRecord),
        semanticOwner: {
            ownerId,
            objectKind: "operation",
            canonicalSourceObjectId: sourceObjectId,
            sharedOperationId: operationId,
        },
        executableDisposition: {
            kind: "scalar-execution",
            summary: "Synthetic record used only to exercise the accounting schema.",
            choiceKind: "genuine-user-choice",
            runtimeAuthority: "semantic-owner-only",
        },
        typedSourceRequirements: {
            sourceObjectId,
            constituents: [{
                name: "verbstem",
                type: "ClassicalVerbstem",
                required: true,
                authority: "user-input",
            }],
            missingConstituentBehavior: "reject",
        },
        licensedGrammar: {
            grammarObjectId: "classical-vnc-finite",
            kind: "operation",
            operationId,
            userSelectable: true,
            prerequisites: [],
            authorization: "semantic-owner-issued",
        },
        validation: {
            applicationReceipt: receipt(
                "owner-validation-acceptance",
                ownerId,
                "accepted",
                {
                    accepted: true,
                    rejectionReasonCode: null,
                }
            ),
            rejectionReceipt: receipt(
                "owner-validation-rejection",
                ownerId,
                "rejected",
                {
                    accepted: false,
                    rejectionReasonCode: "typed-source-required",
                }
            ),
        },
        projections: {
            independent: true,
            written: receipt(
                "owner-issued-written-projection",
                ownerId,
                "written",
                {
                    typedResultId,
                    typedResultDigest: resultDigest,
                    projectionId: "boundary-written-projector",
                    output: "schema-written-output",
                    outputDigest: stableSha256("schema-written-output"),
                    sourceProjection: "typed-result",
                },
                {
                    typedResult,
                    typedResultId,
                    typedResultDigest: resultDigest,
                    exactOutput: "schema-written-output",
                }
            ),
            formula: receipt(
                "owner-issued-formula-projection",
                ownerId,
                "formula",
                {
                    typedResultId,
                    typedResultDigest: resultDigest,
                    projectionId: "complete-formula-projector",
                    output: "#schema-formula-output#",
                    outputDigest: stableSha256("#schema-formula-output#"),
                    sourceProjection: "typed-result",
                },
                {
                    typedResult,
                    typedResultId,
                    typedResultDigest: resultDigest,
                    exactOutput: "#schema-formula-output#",
                }
            ),
        },
        scalarReceipt,
        paradigm: {
            applicable: false,
            notApplicableReason: "The classified operation has no inflectional coordinate.",
            applicabilityReceipt: receipt(
                "owner-issued-applicability-decision",
                ownerId,
                "paradigm-not-applicable",
                {
                    decision: "not-applicable",
                    reasonCode: "non-paradigmatic-operation",
                }
            ),
        },
        uiReachability: {
            userActionable: false,
            notApplicableReason: "The distinction is lexical and read-only.",
            applicabilityReceipt: receipt(
                "owner-issued-applicability-decision",
                ownerId,
                "ui-not-applicable",
                {
                    decision: "not-user-actionable",
                    reasonCode: "lexical-read-only",
                }
            ),
        },
        hostileAuthorityNegative: receipt(
            "hostile-authority-rejection",
            ownerId,
            "hostile",
            {
                carrierKind: "stored-answer",
                rejectionReasonCode: "owner-issued-source-required",
                resultIssued: false,
            }
        ),
        conflictingPathRemoval: {
            status: "not-applicable",
            notApplicableReason: "No predecessor path exists for this semantic owner.",
            receipt: receipt(
                "production-graph-absence",
                ownerId,
                "absence",
                {
                    legacyPathId: "candidate-predecessor-path",
                    matchCount: 0,
                }
            ),
        },
    };
}

function run() {
    const s = createSuite("andrews_canvas_inventory_reconciliation");
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

    s.eq(
        "the independent Canvas denominator is structurally and classificationally closed",
        {
            valid: index.valid,
            failures: index.failures,
            lessons: index.summary.lessons,
            primarySublessons: index.summary.primarySublessons,
            nestedOccurrences: index.summary.nestedOccurrences,
            atomicItems: index.records.length,
            grammarBearing: index.grammarBearingRecords.length,
            evidence: index.evidenceRecords.length,
            analysis: index.analysisRecords.length,
            documentary: index.documentaryRecords.length,
        },
        {
            valid: true,
            failures: [],
            lessons: INVENTORY_EXPECTATIONS.lessons,
            primarySublessons: INVENTORY_EXPECTATIONS.primarySublessons,
            nestedOccurrences: INVENTORY_EXPECTATIONS.nestedOccurrences,
            atomicItems: INVENTORY_EXPECTATIONS.atomicItems,
            grammarBearing:
                INVENTORY_EXPECTATIONS.forceTotals["grammar-bearing"],
            evidence: INVENTORY_EXPECTATIONS.forceTotals.evidence,
            analysis: INVENTORY_EXPECTATIONS.forceTotals.analysis,
            documentary:
                INVENTORY_EXPECTATIONS.forceTotals.documentary,
        }
    );

    s.eq(
        "every atomic ID and exact claim coordinate is unique",
        {
            itemIds: new Set(index.records.map((record) => record.itemId)).size,
            coordinates: new Set(
                index.records.map((record) => record.coordinateKey)
            ).size,
        },
        {
            itemIds: INVENTORY_EXPECTATIONS.atomicItems,
            coordinates: INVENTORY_EXPECTATIONS.atomicItems,
        }
    );

    s.eq(
        "escaped formula boundaries remain in one anchor cell",
        parseMarkdownTableRow(
            "| ACI-P194-L010-E30CA4B579 | §23.4 | SCH | grammar-bearing "
            + "| 194 | 10 | 7568 | 1 #pers¹-pers²+...+num¹-num² \\| Subject |"
        ),
        [
            "ACI-P194-L010-E30CA4B579",
            "§23.4",
            "SCH",
            "grammar-bearing",
            "194",
            "10",
            "7568",
            "1 #pers¹-pers²+...+num¹-num² | Subject",
        ]
    );

    s.eq(
        "the §49.10 heading correction is explicit, contextual, and denominator-preserving",
        {
            valid: index.correction4910.valid,
            failures: index.correction4910.failures,
            canvasLine: index.correction4910.canvasLine,
            original: index.correction4910.originalTranscription,
            corrected: index.correction4910.correctedTranscription,
            retainedItems: index.summary.section4910Items,
        },
        {
            valid: true,
            failures: [],
            canvasLine: 21058,
            original: "49 .10.",
            corrected: "49.10.",
            retainedItems: 44,
        }
    );

    const grammarItem = index.grammarBearingRecords[0];
    const validSchemaRecord = fullyProvedSchemaRecord(grammarItem);
    s.eq(
        "a reconciliation record must carry the complete typed proof chain",
        validateGrammarReconciliationRecord(validSchemaRecord, grammarItem),
        {
            ok: true,
            blocked: false,
            errors: [],
        }
    );

    const shapedCopy = clone(validSchemaRecord);
    s.ok(
        "a shape-identical or JSON-copied receipt cannot stand in for owner-issued execution",
        validateGrammarReconciliationRecord(shapedCopy, grammarItem)
            .errors.some((error) => (
                error.includes("owner-issued-runtime-receipt-required")
                || error.includes("same-owner-issued-result-identity-required")
            ))
    );

    const moduleOnly = clone(validSchemaRecord);
    moduleOnly.scalarReceipt = {
        moduleName: "src/core/classical/fake.mjs",
    };
    s.ok(
        "a module label is not an execution receipt",
        validateGrammarReconciliationRecord(moduleOnly, grammarItem)
            .errors.some((error) => (
                error.includes("module-path-is-not")
                || error.includes("forbidden-count-module-metadata-carrier")
                || error.includes("object-required")
            ))
    );

    const countOnly = clone(validSchemaRecord);
    countOnly.scalarReceipt.aggregateCount = 1;
    s.ok(
        "an aggregate count cannot close a Canvas item",
        validateGrammarReconciliationRecord(countOnly, grammarItem)
            .errors.some((error) => (
                error.includes("forbidden-count-module-metadata-carrier")
            ))
    );

    const wrongCoordinate = clone(validSchemaRecord);
    wrongCoordinate.canvasCoordinate.canvasSpan = "1";
    s.ok(
        "a reconciliation cannot move away from its exact Canvas coordinate",
        validateGrammarReconciliationRecord(wrongCoordinate, grammarItem)
            .errors.includes(
                "record.canvasCoordinate.canvasSpan:inventory-coordinate-mismatch"
            )
    );

    const rewrittenProjection = clone(validSchemaRecord);
    rewrittenProjection.projections.formula.projectionId =
        rewrittenProjection.projections.written.projectionId;
    s.ok(
        "written and formula projections require distinct derivations",
        validateGrammarReconciliationRecord(rewrittenProjection, grammarItem)
            .errors.includes("record.projections:distinct-projectors-required")
    );

    const formulaAsSource = clone(validSchemaRecord);
    formulaAsSource.typedSourceRequirements.constituents[0].name = "formula";
    s.ok(
        "a stored formula cannot become a typed Source constituent",
        validateGrammarReconciliationRecord(formulaAsSource, grammarItem)
            .errors.some((error) => (
                error.includes("non-source-authority-carrier-forbidden")
            ))
    );

    const emptyAudit = auditAndrewsCanvasReconciliations(index, []);
    s.eq(
        "an absent reconciliation ledger is reported as missing rather than inferred from counts",
        {
            complete: emptyAudit.complete,
            assigned: emptyAudit.grammar.assigned,
            proved: emptyAudit.grammar.fullyProved,
            unresolved: emptyAudit.grammar.unresolved,
            unowned: emptyAudit.grammar.unowned,
            evidenceDispositioned:
                emptyAudit.nonGrammar.evidence.dispositioned,
            analysisDispositioned:
                emptyAudit.nonGrammar.analysis.dispositioned,
            documentaryDispositioned:
                emptyAudit.nonGrammar.documentary.dispositioned,
        },
        {
            complete: false,
            assigned: 0,
            proved: 0,
            unresolved:
                INVENTORY_EXPECTATIONS.forceTotals["grammar-bearing"],
            unowned:
                INVENTORY_EXPECTATIONS.forceTotals["grammar-bearing"],
            evidenceDispositioned: 0,
            analysisDispositioned: 0,
            documentaryDispositioned: 0,
        }
    );

    const evidenceItem = index.evidenceRecords[0];
    const evidenceDisposition = {
        inventoryItemId: evidenceItem.itemId,
        status: "dispositioned",
        canvasCoordinate: canvasCoordinate(evidenceItem),
        nonAuthorityDisposition: {
            kind: "evidence-not-used",
            runtimeAuthority: false,
            sourceSupplier: false,
            operationSelector: false,
            resultSupplier: false,
            linkedGrammarItemIds: [],
            rationale: "The example remains documentary comparison evidence.",
        },
    };
    s.eq(
        "evidence can be dispositioned only as a non-authoritative witness",
        validateNonAuthorityDispositionRecord(
            evidenceDisposition,
            evidenceItem,
            new Set(index.grammarBearingRecords.map((record) => record.itemId))
        ),
        {
            ok: true,
            errors: [],
        }
    );

    return s;
}

module.exports = { run };
