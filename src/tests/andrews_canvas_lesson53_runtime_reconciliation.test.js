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
    ALL_ROUTE_IDS,
    LESSON_53_RUNTIME_PROOF_DEFINITIONS,
    LESSON_53_USER_ACTIONABLE_ITEM_IDS,
} = require(
    "../../scripts/reconciliation/"
    + "andrews_canvas_lesson53_comparison_runtime"
);
const {
    GENUINE_USER_CHOICE_ITEM_IDS,
    buildLessons4858GrammarReconciliation,
} = require(
    "../../scripts/reconciliation/"
    + "andrews_canvas_lessons48_58"
);

const ROOT = path.resolve(__dirname, "..", "..");

const EXPECTED_FULLY_PROVED_PROJECTIONS = Object.freeze({
    "ACI-P574-L003-B840650625": Object.freeze([
        "iuhqui in michin",
        "#0-0(iuh-Ø-qui)0-0# + in"
            + " + #0-0(mich)in-0#",
    ]),
    "ACI-P574-L011-6B54AD686D": Object.freeze([
        "īcacallo",
        "#0-0+ī-0(ca-cal-lo)0-0#",
    ]),
    "ACI-P575-L008-E702A16D01": Object.freeze([
        "michin ītloc in calli",
        "#0-0(mich)in-0# + #0-ī(tloc)0-0#"
            + " + in + #0-0(cal)li-0#",
    ]),
    "ACI-P576-L008-CF9A5B77D9": Object.freeze([
        "iuhqui in michin",
        "#0-0(iuh-Ø-qui)0-0# + in"
            + " + #0-0(mich)in-0#",
    ]),
    "ACI-P576-L021-B07C547E6A": Object.freeze([
        "iuhqui in michin",
        "#0-0(iuh-Ø-qui)0-0# + in"
            + " + #0-0(mich)in-0#",
    ]),
    "ACI-P576-L035-ACE84999EE": Object.freeze([
        "iuhqui in michin",
        "#0-0(iuh-Ø-qui)0-0# + in"
            + " + #0-0(mich)in-0#",
    ]),
    "ACI-P577-L009-A3CE72C31F": Object.freeze([
        "yeh iuhqui in calli",
        "#0-0(yeh)0-0# + #0-0(iuh-Ø-qui)0-0#"
            + " + in + #0-0(cal)li-0#",
    ]),
    "ACI-P577-L009-D9C4DD7803": Object.freeze([
        "yeh iuhqui in calli",
        "#0-0(yeh)0-0# + #0-0(iuh-Ø-qui)0-0#"
            + " + in + #0-0(cal)li-0#",
    ]),
    "ACI-P578-L033-2D32ED00FD": Object.freeze([
        "calli, yēceh oc cencah michin",
        "#0-0(cal)li-0# + yēceh + oc"
            + " + cencah + #0-0(mich)in-0#",
    ]),
    "ACI-P579-L015-CF029A6745": Object.freeze([
        "yeh oc achi calli, in ahmō iuhqui michin",
        "#0-0(yeh)0-0# + oc + achi"
            + " + #0-0(cal)li-0# + in + ahmō"
            + " + #0-0(iuh-Ø-qui)0-0#"
            + " + #0-0(mich)in-0#",
    ]),
    "ACI-P580-L011-90CF315E5E": Object.freeze([
        "yeh nitlapanahuia in īc calli,"
            + " in ahmō iuhqui michin",
        "#0-0(yeh)0-0#"
            + " + #ni-0+tla(panahuia)0+0-0#"
            + " + in + īc + #0-0(cal)li-0#"
            + " + in + ahmō + #0-0(iuh-Ø-qui)0-0#"
            + " + #0-0(mich)in-0#",
    ]),
    "ACI-P581-L018-0CF231FB99": Object.freeze([
        "Calli ca cencah michin.",
        "#0-0(cal)li-0# + ca + cencah"
            + " + #0-0(mich)in-0#",
    ]),
    "ACI-P581-L018-9495C3A9A5": Object.freeze([
        "Calli ca cencah michin.",
        "#0-0(cal)li-0# + ca + cencah"
            + " + #0-0(mich)in-0#",
    ]),
    "ACI-P581-L029-AB36951AD2": Object.freeze([
        "Tēuctli mocemahcitzinohticah"
            + " in īc yōlchicāhuacātzintli.",
        "#0-0(tēuc)tli-0#"
            + " + #0-0+m-o(cem-ahci-tzino-h-ti-ca-h)0+0-0#"
            + " + in + īc"
            + " + #0-0(yōlchicāhuacātzintli)0-0#",
    ]),
});

function run(runtimeContext = {}) {
    const s = createSuite(
        "andrews_canvas_lesson53_runtime_reconciliation"
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
        path.join(
            ROOT,
            "ANDREWS_TRANSCRIPTION_CANVAS.md"
        ),
        "utf8"
    );
    const index = buildAndrewsCanvasInventoryIndex({
        inventoryText,
        canvasText,
    });
    const built = buildLessons4858GrammarReconciliation(
        index,
        canvasText,
        {
            runtimeContext,
            rootDir: ROOT,
        }
    );
    const lesson53InventoryRecords =
        index.grammarBearingRecords.filter(
            record => record.lesson === 53
        );
    const inventoryById = new Map(
        lesson53InventoryRecords.map(record => [
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
    const lesson53Records =
        lesson53InventoryRecords.map(
            record => recordsById.get(record.itemId)
        );
    const runtime =
        built.runtimeReconciliation;

    s.eq(
        "the legacy 36-atom runtime lane remains an exact subset of the current 285-atom Lesson 53 inventory",
        {
            inventoryCount:
                lesson53InventoryRecords.length,
            definitionCount:
                Object.keys(
                    LESSON_53_RUNTIME_PROOF_DEFINITIONS
                ).length,
            runtimeDefinitionCount:
                runtime.definitionCount,
            routeCount: runtime.routeIds.length,
            routesExact:
                runtime.routeIds.join("|")
                === ALL_ROUTE_IDS.join("|"),
            observations: runtime.observations.size,
            failureCount: runtime.failures.size,
            failureReasonsAreExplicit:
                [...runtime.failures.values()].every(reason => (
                    String(reason).startsWith(
                        "lesson53-comparison-runtime:"
                    )
                )),
            unmappedCurrentAtoms:
                runtime.unmappedInventoryItemIds.length,
        },
        {
            inventoryCount: 285,
            definitionCount: 36,
            runtimeDefinitionCount: 36,
            routeCount: 23,
            routesExact: true,
            observations: 0,
            failureCount: 36,
            failureReasonsAreExplicit: true,
            unmappedCurrentAtoms: 249,
        }
    );

    const fullyProved = lesson53Records.filter(
        record => record.status === "fully-proved"
    );
    const uiBlocked = lesson53Records.filter(
        record => record.status === "blocked"
    );
    s.eq(
        "the stale legacy lane leaves all current Lesson 53 atoms fail-closed without shrinking the denominator",
        {
            fullyProved: fullyProved.length,
            fullyProvedIds: fullyProved.map(
                record => record.inventoryItemId
            ),
            uiBlocked: uiBlocked.length,
            actionableDefinitions:
                LESSON_53_USER_ACTIONABLE_ITEM_IDS.length,
            actionableSetMatches:
                LESSON_53_USER_ACTIONABLE_ITEM_IDS.every(
                    itemId => (
                        GENUINE_USER_CHOICE_ITEM_IDS.has(itemId)
                    )
                ),
            everyActionableAtomRemainsBlocked:
                LESSON_53_USER_ACTIONABLE_ITEM_IDS.every(itemId => (
                    uiBlocked.some(record => (
                        record.inventoryItemId === itemId
                    ))
                )),
            blockerIds: [
                ...new Set(uiBlocked.map(
                    record => record.blocker.blockerId
                )),
            ],
        },
        {
            fullyProved: 0,
            fullyProvedIds: [],
            uiBlocked: 285,
            actionableDefinitions: 22,
            actionableSetMatches: true,
            everyActionableAtomRemainsBlocked: true,
            blockerIds: [
                "late-range-item-complete-owner-receipt-missing",
            ],
        }
    );

    s.eq(
        "the independently receipted nonactionable atom carries distinct written and formula projections",
        Object.fromEntries(fullyProved.map(record => [
            record.inventoryItemId,
            [
                record.projections.written.output,
                record.projections.formula.output,
                record.projections.written.typedResultId
                    === record.scalarReceipt.typedResultId
                && record.projections.formula.typedResultId
                    === record.scalarReceipt.typedResultId,
                record.projections.written.projectionId
                    !== record.projections.formula.projectionId,
            ],
        ])),
        {}
    );

    s.ok(
        "every finalized atom has genuine scalar, exact-negative, hostile copied-source, and scalar-batch observations even when UI proof remains pending",
        [...runtime.observations.values()].every(
            observation => {
                const common = (
                    observation.validateAssertionEvidence(
                        observation.assertionEvidence
                    )
                    && observation.negative.execution.result
                        .authorizationStatus === "blocked"
                    && observation.negative.execution.result
                        .blockReason
                        === observation.negative.expectedReason
                    && (
                        observation.negative
                            .applicationRejectedByThrow === true
                            ? (
                                observation.negative.execution
                                    .applicationResult === null
                                && observation.negative.execution
                                    .applicationError?.message
                                    === observation.negative
                                        .expectedApplicationReason
                            )
                            : (
                                observation.negative.execution
                                    .applicationResult
                                    .authorizationStatus
                                    === "blocked"
                                && observation.negative.execution
                                    .applicationResult
                                    .canonicalResult === null
                                && observation.negative.execution
                                    .applicationResult.blockReason
                                    === observation.negative
                                        .expectedReason
                            )
                    )
                    && observation.hostile.execution.result
                        .authorizationStatus === "blocked"
                    && observation.hostile.execution.result
                        .blockReason
                        === observation.hostile.expectedReason
                    && observation.hostile.execution
                        .applicationResult.authorizationStatus
                        === "blocked"
                    && observation.hostile.execution
                        .applicationResult.canonicalResult === null
                    && observation.hostile.execution
                        .applicationResult.blockReason
                        === observation.hostile.expectedReason
                    && observation.conflictingPathScan.matchCount
                        === 0
                );
                if (!common) {
                    return false;
                }
                if (observation.ownerKind === "deverbal-nnc") {
                    return (
                        observation.assertionEvidence
                            .primaryExecution.result.sourceFrame
                            .typedSourceAuthority === true
                        && observation.paradigm
                            .coordinateApplication
                            .authorizationStatus === "authorized"
                        && observation.paradigm.coordinates.length
                            === 6
                        && observation.paradigm.coordinates.every(
                            coordinate => (
                                coordinate.scalarEquivalent
                                    === true
                            )
                        )
                    );
                }
                return (
                    observation.assertionEvidence
                        .primaryExecution.result
                        .authorizationStatus === "authorized"
                    && Object.values(
                        observation.assertionEvidence
                            .primaryExecution.result
                            .operationFrame.sourceSlots
                    ).every(source => (
                        source.ownerIssuedSource === true
                    ))
                    && observation.batch.authorizationStatus
                        === "authorized"
                    && observation.batch.requestCount === 1
                    && observation.batch.resultCount === 1
                    && observation.batch.pointwiseScalarEquality
                        === true
                    && observation.batch
                        .formulaProjectionPointwiseScalarEquivalent
                        === true
                    && observation.batch
                        .writtenProjectionPointwiseScalarEquivalent
                        === true
                    && observation.batch.results[0].formula
                        === observation.assertionEvidence
                            .primaryExecution.result.formula
                    && observation.batch.results[0].surface
                        === observation.assertionEvidence
                            .primaryExecution.result.surface
                );
            }
        )
    );

    s.eq(
        "all six exact obsolete comparison authority paths have zero production matches",
        Object.fromEntries(Object.entries(runtime.scans).map(
            ([legacyPathId, scan]) => [
                legacyPathId,
                [
                    scan.matchCount,
                    scan.pathCount > 0,
                    scan.patternCount > 0,
                ],
            ]
        )),
        {
            "caller-minted-comparison-source-and-result-bypass":
                [0, true, true],
            "comparison-candidate-classification-lane":
                [0, true, true],
            "lesson53-comparison-runtime-lane":
                [0, true, true],
            "renderer-comparison-source-reconstruction":
                [0, true, true],
            "stored-comparison-written-form-authority":
                [0, true, true],
            "comparison-owned-organic-possession-nnc-bypass":
                [0, true, true],
        }
    );

    const invalid = lesson53Records.flatMap(record => {
        const validation =
            validateGrammarReconciliationRecord(
                record,
                inventoryById.get(record.inventoryItemId)
            );
        return validation.ok
            || (
                validation.blocked
                && validation.errors.length === 0
            )
            ? []
            : [{
                itemId: record.inventoryItemId,
                errors: validation.errors,
            }];
    });
    s.eq(
        "all proved and specifically UI-blocked Lesson 53 reconciliation records validate exactly",
        invalid,
        []
    );

    s.ok(
        "the legacy lane cannot create a forged proved receipt while its current application prerequisites are blocked",
        fullyProved.length === 0
            && runtime.observations.size === 0
    );

    return s;
}

module.exports = { run };
