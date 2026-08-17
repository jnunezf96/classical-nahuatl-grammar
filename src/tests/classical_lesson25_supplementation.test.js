"use strict";

const { createSuite } = require("./runner");

function evaluateCausative(ctx, request, targetStem) {
    const application = ctx.createClassicalNahuatlVncApplication(ctx);
    const preview = application.evaluate(request);
    const option = preview.controlFrame?.derivationOptionInventory
        ?.options?.find(candidate => candidate.targetStem === targetStem);
    return ctx.executeClassicalGrammarApplicationRequest({
        operationId: "vnc:application",
        args: [{
            ...request,
            derivationOptionId:
                option?.optionId || `missing-${targetStem}`,
        }],
    }).canonicalResult;
}

function continueCausative(ctx, sourceApplication, request) {
    return ctx.executeClassicalGrammarApplicationRequest({
        operationId: "vnc:application",
        args: [
            request,
            sourceApplication?.resultFrame || null,
        ],
    });
}

function buildAtolli(ctx) {
    return {
        principal: evaluateCausative(
            ctx,
            {
                sourceStem: "ī",
                verbClass: "A",
                sourceValence: "specific-projective",
                objectKind: "specific-projective",
                objectPerson: "3sg",
                sourceSubject: "1pl",
                subject: "3pl",
                mood: "indicative",
                tense: "future",
                requestedDerivation: "causative",
                causativeObjectKind: "specific-projective",
                requestedVoice: "active",
            },
            "ī-tiā"
        ),
        supplement:
            ctx.buildClassicalNahuatlAbsolutiveNncFrame("ātōl", {
                subject: "3sg",
                nounClass: "tli",
                animacy: "nonanimate",
            }),
        objectId: "source-object-1",
        referenceId: "referent:atolli",
        order: "principal-first",
    };
}

function buildCintli(ctx) {
    return {
        principal: evaluateCausative(
            ctx,
            {
                sourceStem: "māmā",
                verbClass: "D",
                sourceValence: "specific-projective",
                objectKind: "specific-projective",
                objectPerson: "3sg",
                sourceSubject: "3pl",
                subject: "3pl",
                mood: "indicative",
                tense: "present",
                requestedDerivation: "causative",
                causativeObjectKind: "specific-projective",
                requestedVoice: "active",
            },
            "māma-l-tiā"
        ),
        supplement:
            ctx.buildClassicalNahuatlAbsolutiveNncFrame("cin", {
                subject: "3sg",
                nounClass: "tli",
                animacy: "nonanimate",
            }),
        objectId: "source-object-1",
        referenceId: "referent:maize",
        order: "supplement-first",
    };
}

function buildTinocniuh(ctx) {
    const first = evaluateCausative(
        ctx,
        {
            sourceStem: "caqui",
            verbClass: "B",
            sourceValence: "specific-projective",
            objectKind: "specific-projective",
            objectPerson: "3sg",
            sourceSubject: "2sg",
            subject: "1sg",
            mood: "indicative",
            tense: "preterit",
            requestedDerivation: "causative",
            causativeObjectKind: "specific-projective",
            requestedVoice: "active",
        },
        "caqui-tiā"
    );
    const source =
        ctx.getClassicalNahuatlVncContinuationSourceConstituents(
            first.resultFrame
        );
    const continuationReceipt = continueCausative(
        ctx,
        first,
        {
            sourceStem: source.sourceStem,
            sourceLexemeId: source.sourceLexemeId,
            sourceInitialISelection:
                source.sourceInitialISelection,
            verbClass: source.verbClass,
            sourceValence: source.sourceValence,
            sourceSubject: source.sourceSubject,
            objectKind: source.objectKind,
            objectPerson: source.objectPerson,
            subject: "3pl",
            mood: "indicative",
            tense: "preterit",
            requestedDerivation: "causative",
            causativeObjectKind: "specific-projective",
            requestedVoice: "active",
        }
    );
    return {
        principal: continuationReceipt.canonicalResult,
        supplement:
            ctx.buildClassicalNahuatlPossessiveNncFrame("cn-īuh", {
                subject: "2sg",
                possessor: "1sg",
                singularConnector: "0",
                nounstemRelationKind: "nonrelational",
                animacy: "animate",
            }),
        objectId: "causative-object",
        referenceId: "referent:friend",
        order: "principal-first",
    };
}

function buildRequest(ctx, coordinateId, fixture) {
    const principal =
        ctx.buildClassicalNahuatlSupplementationClauseEnvelope(
            fixture.principal,
            {
                referenceId: `principal:${coordinateId}`,
                subjectReferenceId: `principal-subject:${coordinateId}`,
                objectReferenceIds: {
                    [fixture.objectId]: fixture.referenceId,
                },
            }
        );
    const supplement =
        ctx.buildClassicalNahuatlSupplementationClauseEnvelope(
            fixture.supplement,
            { referenceId: fixture.referenceId }
        );
    return {
        coordinateId,
        operationKind: "relation",
        principalClause: principal,
        supplementClause: supplement,
        options: {
            referenceMode: "shared",
            headRole: "object",
            principalObjectId: fixture.objectId,
            supplementContactRole: "subject",
            order: fixture.order,
            adjunctor: "in",
        },
    };
}

function createClauseRelationController(ctx) {
    const controllerTarget = Object.create(ctx);
    const controllerApi =
        ctx.createClassicalClauseRelationControllerGlobals(controllerTarget);
    Object.defineProperties(
        controllerTarget,
        Object.getOwnPropertyDescriptors(controllerApi)
    );
    return controllerTarget.createClassicalClauseRelationController();
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson25_supplementation");

    s.eq(
        "Lesson 25 supplementation no longer installs profile-specific finalizers",
        [
            "getClassicalNahuatlLesson2516SupplementationProfileInventory",
            "buildClassicalNahuatlLesson2516SupplementationFrame",
            "isClassicalNahuatlLesson2516SupplementationFrame",
        ].map(name => [name, typeof ctx[name]]),
        [
            ["getClassicalNahuatlLesson2516SupplementationProfileInventory", "undefined"],
            ["buildClassicalNahuatlLesson2516SupplementationFrame", "undefined"],
            ["isClassicalNahuatlLesson2516SupplementationFrame", "undefined"],
        ]
    );

    const fixtures = [
        buildAtolli(ctx),
        buildCintli(ctx),
        buildTinocniuh(ctx),
    ];
    const requests = [
        buildRequest(ctx, "atolli", fixtures[0]),
        buildRequest(ctx, "cintli", fixtures[1]),
        buildRequest(ctx, "tinocniuh", fixtures[2]),
    ];
    const paradigm =
        ctx.evaluateClassicalNahuatlSupplementationOperationParadigm(
            requests
        );

    s.eq(
        "typed causative objects compose through the shared supplementation operation",
        {
            status: paradigm.authorizationStatus,
            count: paradigm.coordinateCount,
            rows: paradigm.rows.map(row => [
                row.coordinateId,
                row.authorizationStatus,
                row.formulaRealization,
                row.surfaceRealization,
                row.frame.referenceFrame?.principalHead?.id || "",
                row.frame.referenceFrame?.principalHead?.silent,
                row.frame.projectionsGeneratedIndependently,
            ]),
            scalarEquivalent: paradigm.rows.every((row, index) => (
                JSON.stringify(row.frame)
                === JSON.stringify(
                    ctx.evaluateClassicalNahuatlSupplementationOperation(
                        requests[index]
                    )
                )
            )),
        },
        {
            status: "authorized",
            count: 3,
            rows: [
                [
                    "atolli",
                    "authorized",
                    "#0-0+t-ēch+⎕-0(i-ti)z+qu-eh# + in + #0-0(ātōl)li-0#",
                    "Tēchitizqueh in ātollī.",
                    "source-object-1",
                    true,
                    true,
                ],
                [
                    "cintli",
                    "authorized",
                    "in + #0-0(cin)tli-0# + #0-0+qu-in+⎕-0(māma-l-tia)0+0-h#",
                    "In cintli quimmāmaltiah.",
                    "source-object-1",
                    true,
                    true,
                ],
                [
                    "tinocniuh",
                    "authorized",
                    "#0-0+n-ēch+⎕-⎕+⎕-0(caqui-ti-l-tih)0+qu-eh# + in + #ti-0+n-o(cn-īuh)0-0#",
                    "Nēchcaquitiltihqueh in tinocnūh.",
                    "causative-object",
                    true,
                    true,
                ],
            ],
            scalarEquivalent: true,
        }
    );

    const lowLevelMachinery =
        fixtures[2].principal.resultFrame.selectedMachineryFrame;
    const lowLevelEnvelope =
        ctx.buildClassicalNahuatlSupplementationClauseEnvelope(
            lowLevelMachinery,
            {
                referenceId: "principal:raw-machinery",
                subjectReferenceId: "subject:raw-machinery",
                objectReferenceId: "object:raw-machinery",
            }
        );
    const copiedApplicationEnvelope =
        ctx.buildClassicalNahuatlSupplementationClauseEnvelope(
            {
                ...fixtures[2].principal,
                resultFrame: {
                    ...fixtures[2].principal.resultFrame,
                },
            },
            {
                referenceId: "principal:copied-result",
                subjectReferenceId: "subject:copied-result",
                objectReferenceId: "object:copied-result",
            }
        );
    s.eq(
        "only an owner-issued complete VNC Application Result can enter sentence composition",
        {
            applicationAuthorized:
                ctx.isClassicalNahuatlVncApplicationFrame(
                    fixtures[2].principal
                ),
            lowLevel: [
                lowLevelEnvelope.authorizationStatus,
                lowLevelEnvelope.blockReason,
                ctx.isClassicalNahuatlSupplementationClauseEnvelope(
                    lowLevelEnvelope
                ),
            ],
            copiedApplication: [
                copiedApplicationEnvelope.authorizationStatus,
                copiedApplicationEnvelope.blockReason,
                ctx.isClassicalNahuatlSupplementationClauseEnvelope(
                    copiedApplicationEnvelope
                ),
            ],
        },
        {
            applicationAuthorized: true,
            lowLevel: [
                "blocked",
                "authorized-canonical-nuclear-clause-required",
                false,
            ],
            copiedApplication: [
                "blocked",
                "authorized-canonical-nuclear-clause-required",
                false,
            ],
        }
    );

    const applicationRequest = {
        operationId: "vnc:application",
        args: [{
            sourceStem: "yāuh",
            verbClass: "A",
            sourceValence: "intransitive",
            subject: "1sg",
            objectKind: "none",
            requestedDerivation: "direct",
            requestedVoice: "active",
            mood: "indicative",
            tense: "present",
            outputScope: "single",
        }],
    };
    const firstIssuedApplication =
        ctx.executeClassicalGrammarApplicationRequest(applicationRequest);
    const equalSurfaceIssuedApplication =
        ctx.executeClassicalGrammarApplicationRequest(applicationRequest);
    const firstCanonical = firstIssuedApplication.canonicalResult;
    const equalSurfaceCanonical =
        equalSurfaceIssuedApplication.canonicalResult;
    const firstMachinery =
        firstCanonical.resultFrame.selectedMachineryFrame;
    const exactCanonicalCapture =
        createClauseRelationController(ctx).captureCurrentResult(
            "principal",
            firstCanonical
        );
    const machineryAsResultCapture =
        createClauseRelationController(ctx).captureCurrentResult(
            "principal",
            firstMachinery
        );
    const copiedCanonicalCapture =
        createClauseRelationController(ctx).captureCurrentResult(
            "principal",
            { ...firstCanonical }
        );
    const forgedCanonicalCapture =
        createClauseRelationController(ctx).captureCurrentResult(
            "principal",
            {
                ...firstCanonical,
                sourceStem: "forged",
            }
        );
    const equalSurfaceCapture =
        createClauseRelationController(ctx).captureCurrentResult(
            "principal",
            equalSurfaceCanonical
        );
    s.eq(
        "the clause controller captures only complete owner-issued Results and rejects copied, forged, or low-level machinery inputs",
        {
            equalSurface:
                firstCanonical.surfaceRealization
                === equalSurfaceCanonical.surfaceRealization,
            distinctOwnerResults:
                firstCanonical !== equalSurfaceCanonical,
            exactCanonical: [
                exactCanonicalCapture.authorizationStatus,
                exactCanonicalCapture.blockReason,
            ],
            machineryAsResult: [
                machineryAsResultCapture.authorizationStatus,
                machineryAsResultCapture.blockReason,
            ],
            copiedCanonical: [
                copiedCanonicalCapture.authorizationStatus,
                copiedCanonicalCapture.blockReason,
            ],
            forgedCanonical: [
                forgedCanonicalCapture.authorizationStatus,
                forgedCanonicalCapture.blockReason,
            ],
            equalSurfaceOtherResult: [
                equalSurfaceCapture.authorizationStatus,
                equalSurfaceCapture.blockReason,
            ],
        },
        {
            equalSurface: true,
            distinctOwnerResults: true,
            exactCanonical: ["authorized", ""],
            machineryAsResult: [
                "blocked",
                "classical-grammar-application-issued-authorized-result-required",
            ],
            copiedCanonical: [
                "blocked",
                "classical-grammar-application-issued-authorized-result-required",
            ],
            forgedCanonical: [
                "blocked",
                "classical-grammar-application-issued-authorized-result-required",
            ],
            equalSurfaceOtherResult: ["authorized", ""],
        }
    );

    const copiedPrincipal = {
        ...requests[0].principalClause,
        surface: "Caller sentence.",
    };
    const blocked =
        ctx.evaluateClassicalNahuatlSupplementationOperation({
            ...requests[0],
            principalClause: copiedPrincipal,
            formula: "#caller#",
            surface: "Caller sentence.",
        });
    s.eq(
        "copied derived frames and stored answers cannot authorize supplementation",
        [
            ctx.isClassicalNahuatlSupplementationClauseEnvelope(
                copiedPrincipal
            ),
            blocked.authorizationStatus,
            blocked.blockReason,
            blocked.formulaRealization,
            blocked.surfaceRealization,
        ],
        [
            false,
            "blocked",
            "forbidden-supplementation-request-authority:formula",
            "",
            "",
        ]
    );

    return s;
}

module.exports = { run };
