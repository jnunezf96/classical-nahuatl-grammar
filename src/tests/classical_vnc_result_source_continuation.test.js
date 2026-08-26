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
        ?.options?.find(option => option.targetStem === "caquī-tiā")
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

function buildFirstCaquiCausativeReceipt(ctx) {
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
    const preview = ctx.evaluateClassicalNahuatlVncApplication(request);
    const optionId = preview.controlFrame?.derivationOptionInventory
        ?.options?.find(option => option.targetStem === "caquī-tiā")
        ?.optionId || "";
    return ctx.executeClassicalGrammarApplicationRequest({
        operationId: "vnc:application",
        args: [{ ...request, derivationOptionId: optionId }],
    });
}

function run(ctx = {}) {
    const s = createSuite("classical_vnc_result_source_continuation");
    const service = ctx.createClassicalNahuatlVncApplication(ctx);
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
                "nimitzcaquītia",
                "#ni-0+m-itz+⎕-0(caquī-tia)0+0-0#",
            ],
            source: {
                stem: "caquī-tiā",
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
                "nēchcaquītiltia",
                "#0-0+n-ēch+⎕-⎕+⎕-0(caquī-ti-l-tia)0+0-0#",
                true,
            ],
            directContinuation: [
                "authorized",
                "nimitzcaquītia",
                "#ni-0+m-itz+⎕-0(caquī-tia)0+0-0#",
                true,
            ],
            paradigm: [
                "authorized",
                "authorized",
                "nēchcaquītiltia",
                "#0-0+n-ēch+⎕-⎕+⎕-0(caquī-ti-l-tia)0+0-0#",
                true,
                true,
            ],
        }
    );

    const firstReceipt = buildFirstCaquiCausativeReceipt(ctx);
    const exactFirstResult = firstReceipt.canonicalResult.resultFrame;
    const receiptSource =
        ctx.getClassicalNahuatlVncContinuationSourceConstituents(
            exactFirstResult
        );
    const receiptSecondRequest = buildSecondCausativeRequest(
        receiptSource
    );
    const secondReceipt =
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "vnc:application",
            args: [receiptSecondRequest, exactFirstResult],
        });
    const secondGraph =
        ctx.getClassicalGrammarApplicationLayerGraph(secondReceipt);
    const directReceipt =
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "vnc:application",
            args: [{
                ...receiptSecondRequest,
                requestedDerivation: "direct",
                causativeObjectKind: "",
            }, exactFirstResult],
        });
    const exactDirectResult =
        directReceipt.canonicalResult.resultFrame;
    const directSource =
        ctx.getClassicalNahuatlVncContinuationSourceConstituents(
            exactDirectResult
        );
    const thirdReceipt =
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "vnc:application",
            args: [{
                ...buildSecondCausativeRequest(directSource),
            }, exactDirectResult],
        });
    const thirdGraph =
        ctx.getClassicalGrammarApplicationLayerGraph(thirdReceipt);
    const unusedExactReceipt =
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "vnc:application",
            args: [{
                sourceStem: "cuīca",
                verbClass: "A",
                sourceValence: "intransitive",
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                requestedDerivation: "direct",
                requestedVoice: "active",
                notes: [exactFirstResult],
            }],
        });
    const copiedContinuationReceipt =
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "vnc:application",
            args: [receiptSecondRequest, { ...exactFirstResult }],
        });
    let jsonContinuationReceipt = null;
    let jsonContinuationError = "";
    try {
        jsonContinuationReceipt =
            ctx.executeClassicalGrammarApplicationRequest({
                operationId: "vnc:application",
                args: [
                    receiptSecondRequest,
                    JSON.parse(JSON.stringify(exactFirstResult)),
                ],
            });
    } catch (error) {
        jsonContinuationError = String(error?.message || error || "");
    }
    const topology = ctx.getClassicalGrammarApplicationInventory()
        .grammaticalRhymeCalibration.topology;
    s.eq(
        "repeated same-owner applications are distinct local Result nodes without creating a topology self-route",
        {
            statuses: [
                firstReceipt.authorizationStatus,
                secondReceipt.authorizationStatus,
                directReceipt.authorizationStatus,
                thirdReceipt.authorizationStatus,
            ],
            secondGraph: {
                valid:
                    ctx.isClassicalGrammarApplicationLayerGraph(
                        secondGraph
                    ),
                operations: secondGraph?.operationIds,
                nodeCount: secondGraph?.nodeCount,
                edgeCount: secondGraph?.edgeCount,
                depth: secondGraph?.maximumDepth,
                linear: secondGraph?.isLinear,
                exactIdentities: [
                    secondGraph?.nodes?.[0]?.applicationResult
                        === firstReceipt,
                    secondGraph?.nodes?.[1]?.applicationResult
                        === secondReceipt,
                    secondGraph?.edges?.[0]?.innerApplicationResult
                        === firstReceipt,
                    secondGraph?.edges?.[0]?.outerApplicationResult
                        === secondReceipt,
                ],
                evidence:
                    secondGraph?.edges?.[0]?.continuationEvidenceKind,
                exactSlot:
                    secondGraph?.edges?.[0]
                        ?.exactContinuationSlotValidated,
                ownerProjection:
                    secondGraph?.edges?.[0]
                        ?.ownerContinuationProjectionValidated,
                topologyCompatibility:
                    secondGraph?.edges?.[0]
                        ?.topologyCompatibilityObserved,
                compatibilityAuthority:
                    secondGraph?.edges?.[0]?.compatibilityAuthority,
            },
            thirdGraph: {
                operations: thirdGraph?.operationIds,
                nodeCount: thirdGraph?.nodeCount,
                edgeCount: thirdGraph?.edgeCount,
                depth: thirdGraph?.maximumDepth,
                linear: thirdGraph?.isLinear,
                identities: thirdGraph?.nodes?.map(node => (
                    node.applicationResult === firstReceipt
                        ? "first"
                        : node.applicationResult === directReceipt
                            ? "second"
                            : node.applicationResult === thirdReceipt
                                ? "third"
                                : "unknown"
                )),
            },
            unusedExactArgument: {
                status: unusedExactReceipt.authorizationStatus,
                nodeCount:
                    ctx.getClassicalGrammarApplicationLayerGraph(
                        unusedExactReceipt
                    )?.nodeCount,
            },
            copiedContinuation: {
                status: copiedContinuationReceipt.authorizationStatus,
                graph:
                    ctx.getClassicalGrammarApplicationLayerGraph(
                        copiedContinuationReceipt
                    ),
            },
            jsonContinuation: {
                status:
                    jsonContinuationReceipt?.authorizationStatus
                    || "rejected",
                graph:
                    ctx.getClassicalGrammarApplicationLayerGraph(
                        jsonContinuationReceipt
                    ),
                forbiddenAuthorityRejected:
                    jsonContinuationError.startsWith(
                        "classical-grammar-application-request-invalid:"
                        + "forbidden-authority:"
                    ),
            },
            ownerProofObservationCount:
                ctx.getClassicalGrammarApplicationRhymeOwnerProofObservations(
                    secondReceipt
                ).length,
            globalSelfEdgeCount: topology.exactContinuationEdges.filter(
                edge => edge.innerOperationId === "vnc:application"
                    && edge.outerOperationId === "vnc:application"
            ).length,
        },
        {
            statuses: [
                "authorized",
                "authorized",
                "authorized",
                "authorized",
            ],
            secondGraph: {
                valid: true,
                operations: ["vnc:application", "vnc:application"],
                nodeCount: 2,
                edgeCount: 1,
                depth: 2,
                linear: true,
                exactIdentities: [true, true, true, true],
                evidence: "exact-instance-continuation",
                exactSlot: true,
                ownerProjection: true,
                topologyCompatibility: false,
                compatibilityAuthority: false,
            },
            thirdGraph: {
                operations: [
                    "vnc:application",
                    "vnc:application",
                    "vnc:application",
                ],
                nodeCount: 3,
                edgeCount: 2,
                depth: 3,
                linear: true,
                identities: ["first", "second", "third"],
            },
            unusedExactArgument: {
                status: "authorized",
                nodeCount: 1,
            },
            copiedContinuation: {
                status: "blocked",
                graph: null,
            },
            jsonContinuation: {
                status: "rejected",
                graph: null,
                forbiddenAuthorityRejected: true,
            },
            ownerProofObservationCount: 0,
            globalSelfEdgeCount: 0,
        }
    );

    s.eq(
        "owner-issued VNC continuation bindings preserve exact Results and expose only proven execution arguments",
        (() => {
            const operationIds = [
                "vnc:application",
                "vnc:ordered-voice-application",
                "vnc:derivational-operation",
            ];
            const initialFrames = operationIds.map(operationId => (
                ctx.issueClassicalNahuatlVncContinuationBindingFrame(
                    operationId,
                    exactFirstResult
                )
            ));
            const applicationFrame =
                ctx.issueClassicalNahuatlVncContinuationBindingFrame(
                    "vnc:application",
                    exactFirstResult,
                    {
                        subject: "3sg",
                        mood: "indicative",
                        tense: "present",
                        requestedDerivation: "direct",
                        requestedVoice: "active",
                    }
                );
            const lateFrame =
                ctx.issueClassicalNahuatlVncContinuationBindingFrame(
                    "vnc:derivational-operation",
                    exactFirstResult,
                    {
                        lateOperation: "frequentative",
                        lateVariant: "ordinary-long",
                        frequentativeRepetitions: 2,
                    }
                );
            const additionalResultFrame =
                ctx.issueClassicalNahuatlVncContinuationBindingFrame(
                    "vnc:derivational-operation",
                    exactFirstResult,
                    {
                        lateOperation: "reverential",
                        lateVariant: "preterit-embed",
                    }
                );
            const orderedBaseReceipt =
                ctx.executeClassicalGrammarApplicationRequest({
                    operationId: "vnc:application",
                    args: [{
                        sourceStem: "yohua",
                        verbClass: "A",
                        sourceValence: "intransitive",
                        subject: "1sg",
                        mood: "indicative",
                        tense: "present",
                        requestedDerivation: "direct",
                        requestedVoice: "impersonal",
                        nonactiveOptionId: "inherent-impersonal",
                    }],
                });
            const exactOrderedBaseResult =
                orderedBaseReceipt.canonicalResult.resultFrame;
            const orderedChoiceFrame =
                ctx.issueClassicalNahuatlVncContinuationBindingFrame(
                    "vnc:ordered-voice-application",
                    exactOrderedBaseResult
                );
            const orderedFrame =
                ctx.issueClassicalNahuatlVncContinuationBindingFrame(
                    "vnc:ordered-voice-application",
                    exactOrderedBaseResult,
                    {
                        operations: [
                            "inherent-impersonal",
                            "tla-impersonal",
                            "nonactive-lō",
                        ],
                    }
                );
            const copiedSourceFrame =
                ctx.issueClassicalNahuatlVncContinuationBindingFrame(
                    "vnc:application",
                    { ...exactFirstResult }
                );
            return {
                api: [
                    ctx
                        .CLASSICAL_NAHUATL_VNC_CONTINUATION_BINDING_FRAME_KIND,
                    ctx
                        .CLASSICAL_NAHUATL_VNC_CONTINUATION_BINDING_OPERATION_IDS,
                    ctx
                        .CLASSICAL_NAHUATL_VNC_CONTINUATION_BINDING_STATUSES,
                    typeof ctx
                        .issueClassicalNahuatlVncContinuationBindingFrame,
                    typeof ctx
                        .isClassicalNahuatlVncContinuationBindingFrame,
                ],
                initial: initialFrames.map(frame => ({
                    status: frame.bindingStatus,
                    authorization: frame.authorizationStatus,
                    choices: frame.requiredChoiceIds,
                    roles: frame.requiredResultRoles,
                    exact: frame.exactInputResult === exactFirstResult,
                    executionArgs: frame.executionArgs.length,
                    valid:
                        ctx.isClassicalNahuatlVncContinuationBindingFrame(
                            frame
                        ),
                })),
                ready: [applicationFrame, orderedFrame, lateFrame].map(
                    frame => ({
                        status: frame.bindingStatus,
                        authorization: frame.authorizationStatus,
                        preflight: frame.ownerPreflightAuthorized,
                        exact: frame.exactInputResult === (
                            frame === orderedFrame
                                ? exactOrderedBaseResult
                                : exactFirstResult
                        ),
                        executionArgs: frame.executionArgs.length,
                        valid:
                            ctx.isClassicalNahuatlVncContinuationBindingFrame(
                                frame
                            ),
                    })
                ),
                orderedChoice: {
                    status: orderedChoiceFrame.bindingStatus,
                    authorization: orderedChoiceFrame.authorizationStatus,
                    choices: orderedChoiceFrame.requiredChoiceIds,
                    baseOperations: orderedChoiceFrame
                        .orderedVoiceBaseOperations,
                    optionOperations: orderedChoiceFrame
                        .orderedVoiceLayerChoiceInventory?.options
                        ?.map(option => option.operationId)
                        .sort() || [],
                    valid:
                        ctx.isClassicalNahuatlVncContinuationBindingFrame(
                            orderedChoiceFrame
                        ),
                },
                recapture: [
                    lateFrame.outerVncApplicationFrame
                        ?.normalizedRequest?.sourceStem,
                    lateFrame.continuationSourceProjection?.sourceStem,
                    lateFrame.outerVncApplicationFrame
                        !== firstReceipt.canonicalResult,
                    orderedFrame.outerVncApplicationFrame
                        === orderedBaseReceipt.canonicalResult,
                ],
                executionIdentities: [
                    applicationFrame.executionArgs[0]
                        === applicationFrame.ownerRequest,
                    applicationFrame.executionArgs[1]
                        === exactFirstResult,
                    orderedFrame.executionArgs[0]
                        === orderedBaseReceipt.canonicalResult,
                    orderedFrame.executionArgs[1]
                        === orderedFrame.ownerRequest,
                    lateFrame.executionArgs[0]
                        === lateFrame.ownerRequest,
                    lateFrame.ownerRequest?.sourceApplicationFrame
                        === lateFrame.outerVncApplicationFrame,
                ],
                additionalResult: [
                    additionalResultFrame.bindingStatus,
                    additionalResultFrame.authorizationStatus,
                    additionalResultFrame.requiredResultRoles,
                    additionalResultFrame.executionArgs.length,
                    ctx.isClassicalNahuatlVncContinuationBindingFrame(
                        additionalResultFrame
                    ),
                ],
                hostile: [
                    copiedSourceFrame.bindingStatus,
                    copiedSourceFrame.ownerRejectionProven,
                    ctx.isClassicalNahuatlVncContinuationBindingFrame(
                        copiedSourceFrame
                    ),
                    ctx.isClassicalNahuatlVncContinuationBindingFrame({
                        ...applicationFrame,
                    }),
                ],
            };
        })(),
        {
            api: [
                "classical-nahuatl-vnc-continuation-binding-frame",
                [
                    "vnc:application",
                    "vnc:ordered-voice-application",
                    "vnc:derivational-operation",
                ],
                [
                    "ready",
                    "choices-required",
                    "additional-result-required",
                    "rejected",
                ],
                "function",
                "function",
            ],
            initial: [
                {
                    status: "choices-required",
                    authorization: "authorized",
                    choices: [
                        "subject",
                        "mood",
                        "tense",
                        "requestedDerivation",
                        "requestedVoice",
                    ],
                    roles: [],
                    exact: true,
                    executionArgs: 0,
                    valid: true,
                },
                {
                    status: "rejected",
                    authorization: "blocked",
                    choices: [],
                    roles: [],
                    exact: false,
                    executionArgs: 0,
                    valid: true,
                },
                {
                    status: "choices-required",
                    authorization: "authorized",
                    choices: ["lateOperation"],
                    roles: [],
                    exact: true,
                    executionArgs: 0,
                    valid: true,
                },
            ],
            ready: [
                {
                    status: "ready",
                    authorization: "authorized",
                    preflight: true,
                    exact: true,
                    executionArgs: 2,
                    valid: true,
                },
                {
                    status: "ready",
                    authorization: "authorized",
                    preflight: true,
                    exact: true,
                    executionArgs: 2,
                    valid: true,
                },
                {
                    status: "ready",
                    authorization: "authorized",
                    preflight: true,
                    exact: true,
                    executionArgs: 1,
                    valid: true,
                },
            ],
            orderedChoice: {
                status: "choices-required",
                authorization: "authorized",
                choices: ["operations"],
                baseOperations: ["inherent-impersonal"],
                optionOperations: ["nonactive-lō", "tla-impersonal"],
                valid: true,
            },
            recapture: ["caquī-tiā", "caquī-tiā", true, true],
            executionIdentities: [true, true, true, true, true, true],
            additionalResult: [
                "additional-result-required",
                "authorized",
                ["attitude-source-closure"],
                0,
                true,
            ],
            hostile: ["rejected", true, true, false],
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
            surface: "nēchcaquītiltia",
            formula: "#forged#",
        }
    );
    const mismatches = [
        { sourceStem: "nēchcaquītiltia" },
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
            exactExplicitObjects: ["authorized", "nēchcaquītiltia"],
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

    const lateResult = ctx.requestClassicalLateVncOperation({
        sourceStem: "chōca",
        sourceValence: "intransitive",
        verbClass: "A",
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        derivationType: "direct",
        voice: "active",
        lateOperation: "frequentative",
        lateVariant: "ordinary-long",
        frequentativeRepetitions: 2,
    });
    const lateProjection = service.getContinuationSourceConstituents(
        lateResult
    );
    const orderedBase = service.evaluate({
        sourceStem: "yohua",
        verbClass: "A",
        sourceValence: "intransitive",
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "direct",
        requestedVoice: "impersonal",
        nonactiveOptionId: "inherent-impersonal",
    });
    const orderedResult =
        ctx.buildClassicalNahuatlOrderedVoiceVncApplicationFrame(
            orderedBase,
            {
                operations: [
                    "inherent-impersonal",
                    "tla-impersonal",
                    "nonactive-lō",
                ],
            }
        );
    const orderedProjection = service.getContinuationSourceConstituents(
        orderedResult
    );
    const lateContinuationRequest = {
        sourceStem: lateProjection?.sourceStem,
        sourceLexemeId: lateProjection?.sourceLexemeId,
        sourceInitialISelection:
            lateProjection?.sourceInitialISelection,
        verbClass: lateProjection?.verbClass,
        sourceValence: lateProjection?.sourceValence,
        sourceSubject: lateProjection?.sourceSubject,
        objectKind: lateProjection?.objectKind,
        objectPerson: lateProjection?.objectPerson,
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "direct",
        requestedVoice: "active",
    };
    const continuedLate = service.continueFromResult(
        lateResult,
        lateContinuationRequest
    );
    const evaluatedLate = ctx.evaluateClassicalNahuatlVncApplication(
        lateContinuationRequest,
        lateResult
    );
    const evaluatedCopiedLate = ctx.evaluateClassicalNahuatlVncApplication(
        lateContinuationRequest,
        { ...lateResult }
    );
    const evaluatedIneligibleOrdered =
        ctx.evaluateClassicalNahuatlVncApplication(
            lateContinuationRequest,
            orderedResult
        );
    s.ok(
        "the public evaluator sends every exact service-projectable Result through canonical continuation while copied and ineligible terminal frames fail closed",
        lateResult.authorizationStatus === "authorized"
            && lateProjection?.sourceStem === "chō-chō-chōca"
            && continuedLate?.authorizationStatus === "authorized"
            && evaluatedLate?.authorizationStatus === "authorized"
            && evaluatedLate.resultFrame?.formulaRealization
                === continuedLate.resultFrame?.formulaRealization
            && evaluatedCopiedLate?.authorizationStatus !== "authorized"
            && evaluatedIneligibleOrdered?.authorizationStatus
                !== "authorized"
            && orderedResult.authorizationStatus === "authorized"
            && orderedProjection === null
            && service.getContinuationSourceConstituents(
                { ...lateResult }
            ) === null
            && service.getContinuationSourceConstituents(
                JSON.parse(JSON.stringify(lateResult))
            ) === null
            && service.getContinuationSourceConstituents(
                { ...orderedResult }
            ) === null
    );

    const lateApplicationReceipt =
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "vnc:application",
            args: [lateContinuationRequest, lateResult],
        });
    const lateProducerProvenance =
        ctx.getClassicalGrammarApplicationRhymeContinuationProvenance(
            lateResult
        );
    const lateLayerGraph =
        ctx.getClassicalGrammarApplicationLayerGraph(
            lateApplicationReceipt
        );
    const globalTopology = ctx.getClassicalGrammarApplicationInventory()
        .grammaticalRhymeCalibration.topology;
    s.eq(
        "an exact late-operation Result and its continued VNC application remain distinct local nodes without declaring global compatibility",
        {
            statuses: [
                lateProducerProvenance?.applicationResult
                    ?.authorizationStatus,
                lateApplicationReceipt.authorizationStatus,
            ],
            graphValid:
                ctx.isClassicalGrammarApplicationLayerGraph(
                    lateLayerGraph
                ),
            operationIds: lateLayerGraph?.operationIds,
            nodeCount: lateLayerGraph?.nodeCount,
            edgeCount: lateLayerGraph?.edgeCount,
            depth: lateLayerGraph?.maximumDepth,
            linear: lateLayerGraph?.isLinear,
            exactIdentities: [
                lateLayerGraph?.nodes?.[0]?.applicationResult
                    === lateProducerProvenance?.applicationResult,
                lateLayerGraph?.nodes?.[0]?.canonicalResult
                    === lateResult,
                lateLayerGraph?.nodes?.[1]?.applicationResult
                    === lateApplicationReceipt,
                lateLayerGraph?.edges?.[0]?.innerApplicationResult
                    === lateProducerProvenance?.applicationResult,
                lateLayerGraph?.edges?.[0]?.outerApplicationResult
                    === lateApplicationReceipt,
            ],
            evidence:
                lateLayerGraph?.edges?.[0]?.continuationEvidenceKind,
            exactSlot:
                lateLayerGraph?.edges?.[0]
                    ?.exactContinuationSlotValidated,
            ownerProjection:
                lateLayerGraph?.edges?.[0]
                    ?.ownerContinuationProjectionValidated,
            topologyCompatibility:
                lateLayerGraph?.edges?.[0]
                    ?.topologyCompatibilityObserved,
            compatibilityAuthority:
                lateLayerGraph?.edges?.[0]?.compatibilityAuthority,
            ownerProofObservationCount:
                ctx.getClassicalGrammarApplicationRhymeOwnerProofObservations(
                    lateApplicationReceipt
                ).length,
            globalExactEdgeCount:
                globalTopology.exactContinuationEdges.filter(edge => (
                    edge.innerOperationId
                        === "vnc:derivational-operation"
                    && edge.outerOperationId === "vnc:application"
                )).length,
        },
        {
            statuses: ["authorized", "authorized"],
            graphValid: true,
            operationIds: [
                "vnc:derivational-operation",
                "vnc:application",
            ],
            nodeCount: 2,
            edgeCount: 1,
            depth: 2,
            linear: true,
            exactIdentities: [true, true, true, true, true],
            evidence: "topology-owner-proof",
            exactSlot: false,
            ownerProjection: false,
            topologyCompatibility: true,
            compatibilityAuthority: false,
            ownerProofObservationCount: 1,
            globalExactEdgeCount: 1,
        }
    );

    return s;
}

module.exports = { run };
