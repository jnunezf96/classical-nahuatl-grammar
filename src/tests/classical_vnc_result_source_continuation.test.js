"use strict";

const { createSuite } = require("./runner");

function buildFirstCaquiCausative(service) {
    const request = {
        sourceStem: "caqui",
        verbClass: "B",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
        sourceSubject: "2sg",
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "causative",
        causativeObjectKind: "specific-projective",
        requestedVoice: "active",
    };
    const preview = service.evaluate(request);
    const optionId = preview.controlFrame?.derivationOptionInventory
        ?.options?.find(option => option.targetStem === "caqui-tiā")
        ?.optionId || "";
    return service.evaluate({ ...request, derivationOptionId: optionId });
}

function buildSecondCausativeRequest(source) {
    return {
        sourceStem: source.sourceStem,
        sourceLexemeId: source.sourceLexemeId,
        sourceInitialISelection: source.sourceInitialISelection,
        verbClass: source.verbClass,
        sourceValence: source.sourceValence,
        sourceSubject: source.sourceSubject,
        objectKind: source.objectKind,
        objectPerson: source.objectPerson,
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "causative",
        causativeObjectKind: "specific-projective",
        requestedVoice: "active",
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_vnc_result_source_continuation");
    const service = ctx.classicalNahuatlVncApplication;
    const first = buildFirstCaquiCausative(service);
    const source = service.getContinuationSourceConstituents(
        first.resultFrame
    );
    const secondRequest = buildSecondCausativeRequest(source);
    const second = service.continueFromResult(
        first.resultFrame,
        secondRequest
    );
    const directContinuation = service.continueFromResult(
        first.resultFrame,
        {
            ...secondRequest,
            requestedDerivation: "direct",
            causativeObjectKind: "",
        }
    );
    const plan = service.prepareParadigmFromResult(
        first.resultFrame,
        { ...secondRequest, outputScope: "paradigm" }
    );
    const [coordinate] = service.projectParadigmCoordinates(plan, [{
        subject: "3sg",
        mood: "indicative",
        tense: "present",
    }]);

    s.eq(
        "an exact owner-issued Result becomes the typed Source of the same scalar evaluator and its pointwise paradigm",
        {
            first: [
                first.authorizationStatus,
                first.resultFrame.surfaceRealization,
                first.resultFrame.formulaRealization,
            ],
            source: {
                stem: source.sourceStem,
                class: source.verbClass,
                valence: source.sourceValence,
                subject: source.sourceSubject,
                objectKind: source.objectKind,
                objectPerson: source.objectPerson,
                participantBindings: source.sourceObjectRequests.map(
                    request => [
                        request.objectKind,
                        request.objectPerson,
                        request.governor,
                        request.derivationalLevel,
                    ]
                ),
                grammarAuthority: source.grammarAuthority,
            },
            second: [
                second.authorizationStatus,
                second.resultFrame.surfaceRealization,
                second.resultFrame.formulaRealization,
                ctx.isClassicalNahuatlVncApplicationFrame(second),
            ],
            directContinuation: [
                directContinuation.authorizationStatus,
                directContinuation.resultFrame.surfaceRealization,
                directContinuation.resultFrame.formulaRealization,
                ctx.isClassicalNahuatlVncApplicationFrame(
                    directContinuation
                ),
            ],
            paradigm: [
                plan.authorizationStatus,
                coordinate.authorizationStatus,
                coordinate.surfaceRealization,
                coordinate.formulaRealization,
                coordinate.scalarEquivalent,
                ctx.isClassicalNahuatlVncParadigmCoordinateFrame(coordinate),
            ],
        },
        {
            first: [
                "authorized",
                "nimitzcaquitia",
                "#ni-0+m-itz+⎕-0(caqui-tia)0+0-0#",
            ],
            source: {
                stem: "caqui-tiā",
                class: "C",
                valence: "multiple-object",
                subject: "1sg",
                objectKind: "multiple-object",
                objectPerson: "3sg",
                participantBindings: [
                    ["specific-projective", "3sg", "directive", 1],
                    ["specific-projective", "2sg", "causative", 2],
                ],
                grammarAuthority: false,
            },
            second: [
                "authorized",
                "nēchcaquitiltia",
                "#0-0+n-ēch+⎕-⎕+⎕-0(caqui-ti-l-tia)0+0-0#",
                true,
            ],
            directContinuation: [
                "authorized",
                "nimitzcaquitia",
                "#ni-0+m-itz+⎕-0(caqui-tia)0+0-0#",
                true,
            ],
            paradigm: [
                "authorized",
                "authorized",
                "nēchcaquitiltia",
                "#0-0+n-ēch+⎕-⎕+⎕-0(caqui-ti-l-tia)0+0-0#",
                true,
                true,
            ],
        }
    );

    const otherService = ctx.createClassicalNahuatlVncApplication(ctx);
    const otherFirst = buildFirstCaquiCausative(otherService);
    const exactExplicitObjects = service.continueFromResult(
        first.resultFrame,
        {
            ...secondRequest,
            sourceObjectRequests: source.sourceObjectRequests,
        }
    );
    const poisonedRequest = service.continueFromResult(
        first.resultFrame,
        {
            ...secondRequest,
            surface: "nēchcaquitiltia",
            formula: "#forged#",
        }
    );
    const mismatches = [
        { sourceStem: "nēchcaquitiltia" },
        { verbClass: "B" },
        { sourceValence: "specific-projective" },
        { sourceSubject: "2sg" },
        { objectKind: "specific-projective" },
        { objectPerson: "2sg" },
        {
            sourceObjectRequests: [{
                objectId: "source-object-1",
                objectKind: "specific-projective",
                objectPerson: "3sg",
                governor: "directive",
                derivationalLevel: 1,
            }],
        },
    ].map(change => service.continueFromResult(
        first.resultFrame,
        { ...secondRequest, ...change }
    ));

    s.eq(
        "copies, other service instances, display authority, and every edited Source constituent fail closed",
        {
            copied: service.continueFromResult(
                { ...first.resultFrame },
                secondRequest
            ),
            jsonCopy: service.continueFromResult(
                JSON.parse(JSON.stringify(first.resultFrame)),
                secondRequest
            ),
            otherConsumesShared: otherService.continueFromResult(
                first.resultFrame,
                secondRequest
            ),
            sharedConsumesOther: service.continueFromResult(
                otherFirst.resultFrame,
                secondRequest
            ),
            mismatches,
            exactExplicitObjects: [
                exactExplicitObjects.authorizationStatus,
                exactExplicitObjects.resultFrame.surfaceRealization,
            ],
            poisoned: [
                poisonedRequest.authorizationStatus,
                poisonedRequest.blockReason,
                poisonedRequest.resultFrame.formulaRealization,
                poisonedRequest.resultFrame.surfaceRealization,
            ],
        },
        {
            copied: null,
            jsonCopy: null,
            otherConsumesShared: null,
            sharedConsumesOther: null,
            mismatches: [null, null, null, null, null, null, null],
            exactExplicitObjects: ["authorized", "nēchcaquitiltia"],
            poisoned: [
                "blocked",
                "classical-vnc-application-caller-authority-rejected",
                "",
                "",
            ],
        }
    );

    const unknownShuntline = service.evaluate({
        sourceStem: "caqui",
        verbClass: "B",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
        sourceSubject: "2sg",
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "causative",
        causativeObjectKind: "specific-projective",
        causativeSpecificShuntlineRealization: "forged",
        requestedVoice: "active",
        derivationOptionId:
            first.controlFrame.selectedDerivationOptionId,
    });
    s.eq(
        "unknown nonempty specific-shuntline intent is retained for rejection before an operation can issue",
        {
            status: unknownShuntline.authorizationStatus,
            reason: unknownShuntline.blockReason,
            requested:
                unknownShuntline.normalizedRequest
                    .requestedCausativeSpecificShuntlineRealization,
            recognized:
                unknownShuntline.normalizedRequest
                    .requestedCausativeSpecificShuntlineRealizationRecognized,
            operation:
                unknownShuntline.resultFrame.derivationOperationFrame,
            formula: unknownShuntline.resultFrame.formulaRealization,
            written: unknownShuntline.resultFrame.surfaceRealization,
        },
        {
            status: "blocked",
            reason:
                "classical-vnc-causative-specific-shuntline-realization-not-recognized",
            requested: "forged",
            recognized: false,
            operation: null,
            formula: "",
            written: "",
        }
    );

    return s;
}

module.exports = { run };
