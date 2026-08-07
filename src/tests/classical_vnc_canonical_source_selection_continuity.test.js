"use strict";

const { createSuite } = require("./runner");

function buildRequest(sourceStem) {
    return {
        sourceStem,
        verbClass: "B",
        sourceValence: "intransitive",
        sourceSubject: "3sg",
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "causative",
        causativeObjectKind: "specific-projective",
        requestedVoice: "active",
    };
}

function selectTypeTwo(application, request) {
    const preview = application.evaluate({
        ...request,
        derivationOptionId: "",
    });
    const option = (
        preview.controlFrame?.derivationOptionInventory?.options || []
    ).find((candidate) => (
        candidate.targetStem === "huā-qui-l-tiā"
    )) || null;
    const selectedRequest = {
        ...request,
        derivationOptionId:
            option?.optionId || "missing-huaqui-type-two-option",
    };
    return {
        preview,
        option,
        selectedRequest,
        scalar: application.evaluate(selectedRequest),
    };
}

function run(ctx = {}) {
    const s = createSuite(
        "classical_vnc_canonical_source_selection_continuity"
    );
    const application = ctx.createClassicalNahuatlVncApplication(ctx);

    s.eq(
        "boundaryless and segmented entries reach one canonical huā-qui Source and the same licensed causative",
        (() => {
            const boundaryless = selectTypeTwo(
                application,
                buildRequest("huāqui")
            );
            const segmented = selectTypeTwo(
                application,
                buildRequest("huā-qui")
            );
            const summarize = (selection) => {
                const sourceSelectionFrame =
                    selection.scalar.resultFrame?.sourceMachineryFrame
                        ?.canonicalSourceSelectionFrame || null;
                return {
                    status: selection.scalar.authorizationStatus,
                    target: selection.option?.targetStem || "",
                    route: selection.option?.derivationRoute || "",
                    formula:
                        selection.scalar.resultFrame?.formulaRealization
                        || "",
                    written:
                        selection.scalar.resultFrame?.surfaceRealization
                        || "",
                    entered: sourceSelectionFrame?.enteredStem || "",
                    canonical: sourceSelectionFrame?.canonicalStem || "",
                    boundaryObserved:
                        sourceSelectionFrame?.explicitBoundaryObserved,
                    sourceSelectionCanonical:
                        ctx.isClassicalNahuatlCanonicalSourceSelectionFrame(
                            sourceSelectionFrame
                        ),
                    copiedSourceSelectionAccepted:
                        ctx.isClassicalNahuatlCanonicalSourceSelectionFrame({
                            ...sourceSelectionFrame,
                        }),
                };
            };
            return {
                boundaryless: summarize(boundaryless),
                segmented: summarize(segmented),
                sameCanonicalRecord:
                    boundaryless.scalar.resultFrame?.sourceMachineryFrame
                        ?.canonicalSourceSelectionFrame?.canonicalRecord
                    === segmented.scalar.resultFrame?.sourceMachineryFrame
                        ?.canonicalSourceSelectionFrame?.canonicalRecord,
                sameOptionIdentity:
                    boundaryless.option?.optionId
                    === segmented.option?.optionId,
                sameWritten:
                    boundaryless.scalar.resultFrame?.surfaceRealization
                    === segmented.scalar.resultFrame?.surfaceRealization,
                sameFormula:
                    boundaryless.scalar.resultFrame?.formulaRealization
                    === segmented.scalar.resultFrame?.formulaRealization,
            };
        })(),
        {
            boundaryless: {
                status: "authorized",
                target: "huā-qui-l-tiā",
                route: "type-two-tia-from-exact-huaqui-lo-license",
                formula: "#ni-0+c-0(huā-qui-l-tia)0+0-0#",
                written: "nichuāquiltia",
                entered: "huāqui",
                canonical: "huā-qui",
                boundaryObserved: false,
                sourceSelectionCanonical: true,
                copiedSourceSelectionAccepted: false,
            },
            segmented: {
                status: "authorized",
                target: "huā-qui-l-tiā",
                route: "type-two-tia-from-exact-huaqui-lo-license",
                formula: "#ni-0+c-0(huā-qui-l-tia)0+0-0#",
                written: "nichuāquiltia",
                entered: "huā-qui",
                canonical: "huā-qui",
                boundaryObserved: true,
                sourceSelectionCanonical: true,
                copiedSourceSelectionAccepted: false,
            },
            sameCanonicalRecord: true,
            sameOptionIdentity: true,
            sameWritten: true,
            sameFormula: true,
        }
    );

    s.eq(
        "the paradigm signs the canonical Source and is pointwise identical to scalar generation",
        (() => {
            const boundaryless = selectTypeTwo(
                application,
                buildRequest("huāqui")
            );
            const segmented = selectTypeTwo(
                application,
                buildRequest("huā-qui")
            );
            const boundarylessPlan = application.prepareParadigm({
                ...boundaryless.selectedRequest,
                outputScope: "paradigm",
            });
            const segmentedPlan = application.prepareParadigm({
                ...segmented.selectedRequest,
                outputScope: "paradigm",
            });
            const coordinate = {
                subject: "1sg",
                mood: "indicative",
                tense: "present",
            };
            const boundarylessCoordinate =
                application.inflectPredicateCoordinate(
                    boundarylessPlan,
                    coordinate
                );
            const segmentedCoordinate =
                application.inflectPredicateCoordinate(
                    segmentedPlan,
                    coordinate
                );
            return {
                plans: [
                    boundarylessPlan.authorizationStatus,
                    segmentedPlan.authorizationStatus,
                ],
                canonicalSources: [
                    boundarylessPlan.sourceStem,
                    segmentedPlan.sourceStem,
                ],
                samePredicate:
                    boundarylessPlan.predicateSignature
                    === segmentedPlan.predicateSignature,
                sameSourceOperation:
                    boundarylessPlan.sourceOperationSignature
                    === segmentedPlan.sourceOperationSignature,
                coordinates: [
                    boundarylessCoordinate.authorizationStatus,
                    segmentedCoordinate.authorizationStatus,
                ],
                pointwise: [
                    boundarylessCoordinate.scalarEquivalent,
                    segmentedCoordinate.scalarEquivalent,
                    boundarylessCoordinate.formulaRealization
                        === boundaryless.scalar.resultFrame
                            ?.formulaRealization,
                    segmentedCoordinate.surfaceRealization
                        === segmented.scalar.resultFrame
                            ?.surfaceRealization,
                    boundarylessCoordinate.formulaRealization
                        === boundarylessCoordinate.scalarApplicationFrame
                            ?.resultFrame?.formulaRealization,
                    segmentedCoordinate.surfaceRealization
                        === segmentedCoordinate.scalarApplicationFrame
                            ?.resultFrame?.surfaceRealization,
                ],
                canonicalCoordinateSources: [
                    boundarylessCoordinate.sourceStem,
                    segmentedCoordinate.sourceStem,
                    boundarylessCoordinate.scalarApplicationFrame
                        ?.normalizedRequest?.sourceStem,
                    segmentedCoordinate.scalarApplicationFrame
                        ?.normalizedRequest?.sourceStem,
                ],
                exact: [
                    boundarylessCoordinate.formulaRealization,
                    boundarylessCoordinate.surfaceRealization,
                    segmentedCoordinate.formulaRealization,
                    segmentedCoordinate.surfaceRealization,
                ],
            };
        })(),
        {
            plans: ["authorized", "authorized"],
            canonicalSources: ["huā-qui", "huā-qui"],
            samePredicate: true,
            sameSourceOperation: true,
            coordinates: ["authorized", "authorized"],
            pointwise: [true, true, true, true, true, true],
            canonicalCoordinateSources: [
                "huā-qui",
                "huā-qui",
                "huā-qui",
                "huā-qui",
            ],
            exact: [
                "#ni-0+c-0(huā-qui-l-tia)0+0-0#",
                "nichuāquiltia",
                "#ni-0+c-0(huā-qui-l-tia)0+0-0#",
                "nichuāquiltia",
            ],
        }
    );

    s.eq(
        "caller-supplied Source receipts cannot bypass canonical Source resolution",
        (() => {
            const request = buildRequest("huāqui");
            const selection = selectTypeTwo(application, request);
            const issued =
                selection.scalar.resultFrame?.sourceMachineryFrame
                    ?.canonicalSourceSelectionFrame || null;
            const hostile = application.evaluate({
                ...selection.selectedRequest,
                canonicalSourceSelectionFrame: { ...issued },
            });
            const hostilePlan = application.prepareParadigm({
                ...selection.selectedRequest,
                canonicalSourceSelectionFrame: { ...issued },
                outputScope: "paradigm",
            });
            return {
                scalar: [
                    hostile.authorizationStatus,
                    hostile.blockReason,
                ],
                paradigm: [
                    hostilePlan.authorizationStatus,
                    hostilePlan.blockReason,
                ],
                formula: hostile.resultFrame?.formulaRealization || "",
                written: hostile.resultFrame?.surfaceRealization || "",
            };
        })(),
        {
            scalar: [
                "blocked",
                "classical-vnc-application-caller-authority-rejected",
            ],
            paradigm: [
                "blocked",
                "classical-vnc-paradigm-plan-caller-authority-rejected",
            ],
            formula: "",
            written: "",
        }
    );

    return s;
}

module.exports = { run };
