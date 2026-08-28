"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function issueOrdinary(ctx, stem = "mich", subject = "3sg") {
    const source = ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({ stem });
    const operation = ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(
        source,
        {
            state: "absolutive",
            subject,
            sentenceType: "statement",
            polarity: "positive",
        }
    );
    return ctx.executeClassicalGrammarApplicationRequest({
        operationId: "nnc:ordinary",
        args: [source, operation],
    });
}

function run(ctx = {}) {
    const suite = createSuite(
        "classical_formation_capability_navigator_interface_workflow"
    );
    const rendering = fs.readFileSync(
        path.join(ROOT, "src", "ui", "rendering", "rendering.mjs"),
        "utf8"
    );
    const shell = fs.readFileSync(
        path.join(ROOT, "src", "ui", "shell", "classical_shell.mjs"),
        "utf8"
    );
    const ordinary = issueOrdinary(ctx);
    const exactNnc = ordinary.canonicalResult;
    const exactNominalEmbed = issueOrdinary(ctx, "mich", "1sg")
        .canonicalResult;
    const exactNominalMatrixApplication = ctx
        .evaluateClassicalNahuatlVncApplication({
            sourceStem: "chōca",
            verbClass: "A",
            sourceValence: "intransitive",
            subject: "3sg",
            mood: "indicative",
            tense: "present",
            requestedDerivation: "direct",
            requestedVoice: "active",
        });
    const exactNominalMatrix = exactNominalMatrixApplication.resultFrame;
    const nominalBinding = ctx
        .issueClassicalNahuatlFormationResultBindingFrame(
            "grammar:nominal-construction",
            exactNominalMatrix,
            {
                nominalEmbedRelation: "adverb",
                nominalEmbedRoute: "direct-adverb",
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                voice: "active",
            }
        );
    const nominalCompletion = ctx
        .issueClassicalNahuatlFormationResultBindingCompletionFrame(
            nominalBinding,
            "nominal-embed:matrix-vnc-result",
            "nominal-embed-constituent",
            exactNominalEmbed
        );
    const nominalEmbedProjection = ctx
        .getClassicalNahuatlNncContinuationSourceConstituents(
            exactNominalEmbed
        );
    const nominalMatrixProjection = ctx
        .getClassicalNahuatlVncContinuationSourceConstituents(
            exactNominalMatrix
        );
    const nominalSource = {
        embedStem: nominalEmbedProjection.sourceIdentityStem,
        embedClass: nominalEmbedProjection.sourceNounClass,
        embedConstituent: {
            kind: "ordinary-nnc",
            stem: nominalEmbedProjection.sourceIdentityStem,
            resultFrame: exactNominalEmbed,
        },
        matrixStem: nominalMatrixProjection.sourceStem,
        matrixValence: "intransitive",
        matrixVerbClass: nominalMatrixProjection.verbClass,
        matrixConstituent: {
            kind: "vnc-result",
            stem: nominalMatrixProjection.sourceStem,
            resultFrame: exactNominalMatrix,
        },
        objectReferenceIds: [],
        possessorReferenceCandidates: [],
        embedState: "absolutive",
        possessionKind: "intimate",
    };
    const executeNominalEmbed = (relation, route) => (
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "grammar:nominal-construction",
            args: [{
                constructionKind: "nominal-embed-vnc",
                relation,
                route,
                adverbRole: "means",
                orientation: "not-applicable",
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                voice: "active",
                outputKind: "single",
                source: nominalSource,
            }],
        })
    );
    const invalidObjectNominal = executeNominalEmbed("object", "object");
    const exactAdverbNominal = executeNominalEmbed(
        "adverb",
        "direct-adverb"
    );

    const denominalInitial = ctx
        .issueClassicalGrammarFormationResultBindingFrame(
            "vnc:denominal",
            exactNnc,
            {}
        );
    const denominalPath = denominalInitial.ownerPreflightFrame
        .pathChoices[0];
    const denominalAfterOperation = ctx
        .issueClassicalGrammarFormationResultBindingFrame(
            "vnc:denominal",
            exactNnc,
            { denominalOperation: denominalPath.operationId }
        );
    const denominalReady = ctx
        .issueClassicalGrammarFormationResultBindingFrame(
            "vnc:denominal",
            exactNnc,
            {
                denominalOperation: denominalPath.operationId,
                denominalOperationPath: denominalPath.pathChoiceId,
            }
        );
    const denominal = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "vnc:denominal",
        args: [{
            ...denominalPath.sourceRequest,
            operationId: denominalPath.operationId,
            operationPath: denominalPath.operationPath,
            classChoice: denominalPath.finalClassChoice,
            classChoices: denominalPath.classChoices,
            subject: "3sg",
            mood: "indicative",
            tense: "present",
            outputScope: "single",
        }],
    });

    const placeInitial = ctx.issueClassicalGrammarFormationResultBindingFrame(
        "nnc:place-gentilic",
        exactNnc,
        {}
    );
    const placeReady = ctx.issueClassicalGrammarFormationResultBindingFrame(
        "nnc:place-gentilic",
        exactNnc,
        { constructionKind: "place-name", formation: "co" }
    );
    const place = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "nnc:place-gentilic",
        args: [{
            canonicalNncResult: exactNnc,
            constructionKind: "place-name",
            formation: "co",
            usage: "adverbial",
        }],
    });

    suite.eq(
        "denominal and place pathways advance only through owner-validated choices and preserve the exact Result",
        {
            denominalProgression: [
                denominalInitial.requiredChoiceIds,
                denominalAfterOperation.requiredChoiceIds,
                denominalReady.requiredChoiceIds,
            ],
            denominalResult: [
                denominal.authorizationStatus,
                denominal.canonicalResult?.canonicalNncResult === exactNnc,
            ],
            placeProgression: [
                placeInitial.requiredChoiceIds,
                placeReady.requiredChoiceIds,
            ],
            placeResult: [
                place.authorizationStatus,
                place.canonicalResult?.canonicalNncResult === exactNnc,
            ],
        },
        {
            denominalProgression: [
                ["classical-denominal-vnc-operation"],
                ["classical-denominal-vnc-operation-path"],
                [],
            ],
            denominalResult: ["authorized", true],
            placeProgression: [[
                "classical-place-gentilic-result-kind",
                "classical-place-gentilic-formation",
            ], []],
            placeResult: ["authorized", true],
        }
    );

    const nominalReadyPathStart = rendering.indexOf(
        'current.operationId === "grammar:nominal-construction"'
    );
    const nominalReadyPath = rendering.slice(
        nominalReadyPathStart,
        rendering.indexOf(
            '"nnc:deverbal-construction",',
            nominalReadyPathStart
        )
    );
    suite.eq(
        "nominal completion preserves both exact Results and publishes its owner Result through the unified Continue panel",
        {
            completion: [
                nominalCompletion.authorizationStatus,
                nominalCompletion.primaryExactResult === exactNominalMatrix,
                nominalCompletion.additionalExactResult
                    === exactNominalEmbed,
                nominalCompletion.bothExactResultIdentitiesPreserved,
            ],
            ownerExecution: [
                invalidObjectNominal.authorizationStatus,
                invalidObjectNominal.blockReason,
                exactAdverbNominal.authorizationStatus,
                exactAdverbNominal.canonicalResult?.sourceAuthorizationFrame
                    ?.lexicalFacts?.capturedEmbedResult
                    === exactNominalEmbed,
                exactAdverbNominal.canonicalResult?.sourceAuthorizationFrame
                    ?.lexicalFacts?.matrixResultCaptured,
            ],
            interface: [
                nominalReadyPath.includes(
                    "isClassicalNahuatlFormationResultBindingCompletionFrame"
                ),
                nominalReadyPath.includes(
                    "completion.primaryExactResult === current.exactResult"
                ),
                nominalReadyPath.includes(
                    "completion.additionalExactResult === exactAdditionalResult"
                ),
                nominalReadyPath.includes(
                    "exactRequestConstituentResults.includes("
                ),
                nominalReadyPath.includes(
                    'operationId: "grammar:nominal-construction"'
                ),
                nominalReadyPath.includes(
                    "buildClassicalNominalConstructionUiRequest(activeBinding)"
                ),
                shell.includes(
                    '<option value="" selected>Choose embed role</option>'
                ),
                shell.includes(
                    'id="classical-capability-required-result-field"'
                ),
                shell.includes(">Add NNC embed Result</label>"),
                shell.includes(">Use this Result</button>"),
                rendering.includes(
                    "function syncClassicalRequiredResultChooser(snapshot = null)"
                ),
                rendering.includes(
                    'binding.operationId === "grammar:nominal-construction"'
                ),
                rendering.includes(
                    'binding.selectedBindingId === "nominal-embed:matrix-vnc-result"'
                ),
                rendering.includes(
                    "issueClassicalFormationResultCompletionEvaluation("
                ),
                rendering.includes(
                    '"Exact Result retained. Choose a compatible NNC embed Result below."'
                ),
                nominalReadyPath.includes(
                    "renderClassicalCapabilityApplicationResultForReview("
                ),
                rendering.includes(
                    "function renderClassicalUnifiedCapabilityResultPanel({"
                ),
                rendering.includes(
                    'continueAction.textContent = "Continue this Result";'
                ),
            ],
        },
        {
            completion: ["authorized", true, true, true],
            ownerExecution: [
                "blocked",
                "incorporated-object-requires-transitive-matrix",
                "authorized",
                true,
                true,
            ],
            interface: [
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
                true,
            ],
        }
    );

    suite.ok(
        "the interface stages explicit prompts and sends ready formation requests through the one Result panel",
        rendering.includes("Choose a denominal operation")
        && rendering.includes("Choose an operation path")
        && rendering.includes("Choose a place or gentilic Result")
        && rendering.includes("Choose a formation")
        && rendering.includes(
            '"nnc:deverbal-construction",\n          "nnc:place-gentilic",\n          "vnc:denominal",'
        )
        && rendering.includes(
            'current.operationId === "nnc:relational"'
        )
        && rendering.includes(
            "renderClassicalCapabilityApplicationResultForReview("
        )
        && rendering.includes(
            "renderClassicalNominalConstructionSurfaceBlock("
        )
    );

    return suite;
}

module.exports = { run };
