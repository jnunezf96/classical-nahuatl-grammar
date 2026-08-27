"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

const FIXED_CAPABILITY_CLOSURE_OPERATION_IDS = Object.freeze([
    "vnc:application",
    "vnc:ordered-voice-application",
    "vnc:derivational-operation",
    "sentence:adverbial-adjunction",
    "sentence:particle-adjunction",
    "particle:negative-selection",
    "sentence:supplementation",
    "nnc:adjectival-modification",
    "clause:adverbial-adjunction",
    "clause:composition",
    "clause:comparison",
    "grammar:nominal-construction",
    "nnc:deverbal-construction",
    "nnc:adverbial",
    "nnc:relational",
    "nnc:place-gentilic",
    "vnc:denominal",
    "nnc:personal-name",
]);

function issueVncResult(ctx, sourceStem, tense = "present") {
    return ctx.requestClassicalVncApplicationResult({
        sourceStem,
        verbClass: "A",
        sourceValence: "intransitive",
        subject: "3sg",
        mood: "indicative",
        tense,
        requestedDerivation: "direct",
        requestedVoice: "active",
        voice: "active",
    }).resultFrame;
}

function issueOrdinaryNncResult(
    ctx,
    stem = "mich",
    subject = "3sg"
) {
    const source = ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({
        stem,
    });
    const operation = ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(
        source,
        {
            state: "absolutive",
            subject,
            sentenceType: "statement",
            polarity: "positive",
        }
    );
    return ctx.requestClassicalOrdinaryNncResult(source, operation);
}

function issueNncSentenceResult(ctx, nncResult) {
    return ctx.executeClassicalGrammarApplicationRequest({
        operationId: "nnc:sentence-surface",
        args: [nncResult.typedSlotFrame],
    }).canonicalResult;
}

function issuePreteritAgentiveResult(ctx) {
    return ctx.requestClassicalDeverbalNncResult({
        constructionKind: "predicate-nominalization",
        nominalizationKind: "preterit-agentive",
        source: {
            sourceStage: "preterit-predicate",
            sourceStem: "pix",
            verbClass: "A",
            sourceVoice: "active",
            sourceValence: "intransitive",
            sourceObjectPattern: "none",
            sourceSubject: "3sg",
        },
        subject: "3sg",
        state: "absolutive",
        animacy: "animate",
    });
}

function frameRetainsExactResult(frame, exactResult) {
    return Boolean(
        frame
        && [
            frame.exactInputResult,
            frame.exactResult,
            frame.inputResult,
        ].includes(exactResult)
    );
}

function getOperation(navigator, operationId) {
    return navigator?.operations?.find(
        candidate => candidate.operationId === operationId
    ) || null;
}

function run(ctx = {}) {
    const suite = createSuite("classical_capability_closure_entry");
    const vncResult = issueVncResult(ctx, "ahci");
    const ordinaryNncResult = issueOrdinaryNncResult(ctx);
    const nncSentenceResult = issueNncSentenceResult(
        ctx,
        ordinaryNncResult
    );
    const particleResult = ctx.requestClassicalParticleResult(
        "l3-auh-conjunctor"
    );
    const preteritAgentiveResult = issuePreteritAgentiveResult(ctx);
    const adverbialVncResult = issueVncResult(ctx, "cencah");
    const personalNameVncResult = issueVncResult(
        ctx,
        "temō",
        "preterit"
    );

    const cases = [
        [
            "vnc:application",
            "vnc-continuation",
            vncResult,
            "issueClassicalNahuatlVncContinuationBindingFrame",
            "isClassicalNahuatlVncContinuationBindingFrame",
        ],
        [
            "vnc:ordered-voice-application",
            "vnc-continuation",
            vncResult,
            "issueClassicalNahuatlVncContinuationBindingFrame",
            "isClassicalNahuatlVncContinuationBindingFrame",
        ],
        [
            "vnc:derivational-operation",
            "vnc-continuation",
            vncResult,
            "issueClassicalNahuatlVncContinuationBindingFrame",
            "isClassicalNahuatlVncContinuationBindingFrame",
        ],
        [
            "sentence:adverbial-adjunction",
            "particle-sentence",
            nncSentenceResult,
            "issueClassicalNahuatlParticleSentenceBindingFrame",
            "isClassicalNahuatlParticleSentenceBindingFrame",
        ],
        [
            "sentence:particle-adjunction",
            "particle-sentence",
            nncSentenceResult,
            "issueClassicalNahuatlParticleSentenceBindingFrame",
            "isClassicalNahuatlParticleSentenceBindingFrame",
        ],
        [
            "particle:negative-selection",
            "particle-sentence",
            particleResult,
            "issueClassicalNahuatlParticleSentenceBindingFrame",
            "isClassicalNahuatlParticleSentenceBindingFrame",
        ],
        [
            "sentence:supplementation",
            "clause-relation",
            nncSentenceResult,
            "issueClassicalClauseRelationBindingFrame",
            "isClassicalClauseRelationBindingFrame",
        ],
        [
            "nnc:adjectival-modification",
            "clause-relation",
            nncSentenceResult,
            "issueClassicalClauseRelationBindingFrame",
            "isClassicalClauseRelationBindingFrame",
        ],
        [
            "clause:adverbial-adjunction",
            "clause-relation",
            nncSentenceResult,
            "issueClassicalClauseRelationBindingFrame",
            "isClassicalClauseRelationBindingFrame",
        ],
        [
            "clause:composition",
            "clause-relation",
            nncSentenceResult,
            "issueClassicalClauseRelationBindingFrame",
            "isClassicalClauseRelationBindingFrame",
        ],
        [
            "clause:comparison",
            "clause-relation",
            nncSentenceResult,
            "issueClassicalClauseRelationBindingFrame",
            "isClassicalClauseRelationBindingFrame",
        ],
        [
            "grammar:nominal-construction",
            "formation-result",
            ordinaryNncResult,
            "issueClassicalNahuatlFormationResultBindingFrame",
            "isClassicalNahuatlFormationResultBindingFrame",
        ],
        [
            "nnc:deverbal-construction",
            "formation-result",
            ordinaryNncResult,
            "issueClassicalNahuatlFormationResultBindingFrame",
            "isClassicalNahuatlFormationResultBindingFrame",
        ],
        [
            "nnc:adverbial",
            "formation",
            adverbialVncResult,
            "",
            "",
        ],
        [
            "nnc:relational",
            "formation-result",
            preteritAgentiveResult,
            "issueClassicalNahuatlFormationResultBindingFrame",
            "isClassicalNahuatlFormationResultBindingFrame",
        ],
        [
            "nnc:place-gentilic",
            "formation",
            ordinaryNncResult,
            "",
            "",
        ],
        [
            "vnc:denominal",
            "formation",
            ordinaryNncResult,
            "",
            "",
        ],
        [
            "nnc:personal-name",
            "formation",
            personalNameVncResult,
            "",
            "",
        ],
    ].map(([
        operationId,
        family,
        exactResult,
        issuerCapabilityName,
        validatorCapabilityName,
    ]) => Object.freeze({
        operationId,
        family,
        exactResult,
        issuerCapabilityName,
        validatorCapabilityName,
    }));

    suite.eq(
        "the focused matrix covers the fixed 18 closure operations exactly",
        cases.map(candidate => candidate.operationId),
        FIXED_CAPABILITY_CLOSURE_OPERATION_IDS
    );

    const navigatorEvidence = cases.map(candidate => {
        const navigator = ctx
            .getClassicalGrammarApplicationCapabilityNavigator(
                candidate.exactResult
            );
        const operation = getOperation(
            navigator,
            candidate.operationId
        );
        const frame = operation?.ownerBindingFrame || null;
        const installedValidator = String(
            operation?.ownerBindingValidatorCapabilityName || ""
        );
        const validatorAvailable = typeof ctx[installedValidator]
            === "function";
        return [
            candidate.operationId,
            ctx.isClassicalGrammarApplicationCapabilityNavigator(
                navigator
            ),
            operation?.availabilityStatus,
            operation?.availabilityReason,
            operation?.availabilityAuthority,
            operation?.ownerBindingFamily,
            operation?.ownerBindingContractDeclared,
            operation?.ownerBindingCapabilitiesInstalled,
            operation?.ownerBindingInvoked,
            operation?.ownerBindingThrew,
            operation?.ownerBindingFrameValidated,
            operation?.ownerInputAcceptanceProven,
            operation?.ownerBindingInputResult === candidate.exactResult,
            operation?.ownerProbeInputResult === candidate.exactResult,
            frame?.authorizationStatus,
            frameRetainsExactResult(frame, candidate.exactResult),
            operation?.ownerBindingIds?.length > 0,
            operation?.ownerBindingIds?.join("|")
                === frame?.bindingIds?.join("|"),
            operation?.ownerChoicesRequired === Boolean(
                frame?.ownerChoicesRequired === true
                || operation?.ownerBindingIds?.length > 1
                || operation?.requiredChoiceIds?.length > 0
                || operation?.requiredResultRoles?.length > 0
            ),
            !validatorAvailable || ctx[installedValidator](frame) === true,
        ];
    });
    const expectedNavigatorEvidence = cases.map(candidate => [
        candidate.operationId,
        true,
        "available",
        "canonical-owner-result-binding-accepted",
        "canonical-owner-result-binding",
        candidate.family,
        true,
        true,
        true,
        false,
        true,
        true,
        true,
        true,
        "authorized",
        true,
        true,
        true,
        true,
        true,
    ]);
    suite.eq(
        "all 18 navigator entries retain exact identity and a validated owner binding",
        navigatorEvidence,
        expectedNavigatorEvidence
    );

    const directlyCallableCases = cases.filter(
        candidate => candidate.issuerCapabilityName
    );
    suite.eq(
        "the 14 public binding owners independently validate exact frames",
        directlyCallableCases.map(candidate => {
            const frame = ctx[candidate.issuerCapabilityName](
                candidate.operationId,
                candidate.exactResult
            );
            return [
                candidate.operationId,
                typeof ctx[candidate.issuerCapabilityName],
                typeof ctx[candidate.validatorCapabilityName],
                frame.authorizationStatus,
                ctx[candidate.validatorCapabilityName](frame),
                frame.ownerInputAcceptanceProven,
                frameRetainsExactResult(frame, candidate.exactResult),
                frame.bindingIds.length > 0,
            ];
        }),
        directlyCallableCases.map(candidate => [
            candidate.operationId,
            "function",
            "function",
            "authorized",
            true,
            true,
            true,
            true,
        ])
    );

    suite.eq(
        "top-level copies cannot recover navigator authority",
        cases.map(candidate => [
            candidate.operationId,
            ctx.getClassicalGrammarApplicationCapabilityNavigator({
                ...candidate.exactResult,
            }),
        ]),
        cases.map(candidate => [candidate.operationId, null])
    );

    suite.eq(
        "the public binding owners issue validated blocked frames for copies",
        directlyCallableCases.map(candidate => {
            const frame = ctx[candidate.issuerCapabilityName](
                candidate.operationId,
                { ...candidate.exactResult }
            );
            return [
                candidate.operationId,
                frame.authorizationStatus,
                ctx[candidate.validatorCapabilityName](frame),
                frame.ownerInputAcceptanceProven,
                frame.bindingIds.length,
                frameRetainsExactResult(frame, candidate.exactResult),
            ];
        }),
        directlyCallableCases.map(candidate => [
            candidate.operationId,
            "blocked",
            true,
            false,
            0,
            false,
        ])
    );

    const secondOrdinaryNncResult = issueOrdinaryNncResult(
        ctx,
        "tēuc",
        "1sg"
    );
    const secondNncSentenceResult = issueNncSentenceResult(
        ctx,
        secondOrdinaryNncResult
    );
    const clauseCases = cases.filter(
        candidate => candidate.family === "clause-relation"
    );
    suite.eq(
        "all five selected clause roles route the next exact Result through owner capture",
        clauseCases.map(candidate => {
            const bindingFrame = ctx.issueClassicalClauseRelationBindingFrame(
                candidate.operationId,
                candidate.exactResult
            );
            const selectedChoice = bindingFrame.bindingChoices.find(
                choice => choice.missingCaptureRolesAfterBinding.length === 1
            );
            const controller = ctx.createClassicalClauseRelationController();
            const application = controller.applyBindingFrame(
                bindingFrame,
                selectedChoice.id
            );
            const missingRole = application.missingCaptureRoles[0] || "";
            const additionalCapture = controller.captureCurrentResult(
                missingRole,
                secondNncSentenceResult
            );
            const remainingOption = controller
                .issueRelationAvailabilityContract()
                .relations.find(
                    option => option.value === selectedChoice.relation
                );
            const controllerState = controller.getState();

            const copiedController =
                ctx.createClassicalClauseRelationController();
            const copiedApplication = copiedController.applyBindingFrame(
                bindingFrame,
                selectedChoice.id
            );
            const copiedCapture = copiedController.captureCurrentResult(
                missingRole,
                { ...secondNncSentenceResult }
            );
            const wrongRoleCapture = controller.captureCurrentResult(
                "not-a-clause-role",
                secondNncSentenceResult
            );
            return [
                candidate.operationId,
                ctx.isClassicalClauseRelationBindingFrame(bindingFrame),
                application.authorizationStatus,
                application.exactResultIdentityPreserved,
                application.missingCaptureRoles,
                selectedChoice.missingCaptureRolesAfterBinding,
                additionalCapture.authorizationStatus,
                controllerState.captures[missingRole]?.captured,
                controllerState.captures[missingRole]
                    ?.ownerIssuedResultSourcePresent,
                remainingOption?.missingCaptureRoles?.includes(missingRole),
                copiedApplication.authorizationStatus,
                copiedCapture.authorizationStatus,
                wrongRoleCapture.authorizationStatus,
            ];
        }),
        clauseCases.map(candidate => {
            const bindingFrame = ctx.issueClassicalClauseRelationBindingFrame(
                candidate.operationId,
                candidate.exactResult
            );
            const selectedChoice = bindingFrame.bindingChoices.find(
                choice => choice.missingCaptureRolesAfterBinding.length === 1
            );
            return [
                candidate.operationId,
                true,
                "authorized",
                true,
                selectedChoice.missingCaptureRolesAfterBinding,
                selectedChoice.missingCaptureRolesAfterBinding,
                "authorized",
                true,
                true,
                false,
                "authorized",
                "blocked",
                "blocked",
            ];
        })
    );

    const renderingSource = fs.readFileSync(
        path.join(ROOT, "src", "ui", "rendering", "rendering.mjs"),
        "utf8"
    );
    const clauseEntryStart = renderingSource.indexOf(
        'if (current.family === "clause-relation")'
    );
    const clauseEntryEnd = renderingSource.indexOf(
        'if (current.family === "vnc-continuation")',
        clauseEntryStart
    );
    const clauseSupplyStart = renderingSource.indexOf(
        'if (binding.family === "clause-relation")'
    );
    const clauseSupplyEnd = renderingSource.indexOf(
        'if (binding.family === "vnc-continuation")',
        clauseSupplyStart
    );
    const clauseEntrySource = renderingSource.slice(
        clauseEntryStart,
        clauseEntryEnd
    );
    const clauseSupplySource = renderingSource.slice(
        clauseSupplyStart,
        clauseSupplyEnd
    );
    suite.ok(
        "the UI retains only owner-issued missing roles and advances them after exact capture",
        clauseEntryStart >= 0
        && clauseEntryEnd > clauseEntryStart
        && clauseSupplyStart >= 0
        && clauseSupplyEnd > clauseSupplyStart
        && clauseEntrySource.includes(
            "Array.isArray(result.missingCaptureRoles)"
        )
        && clauseEntrySource.includes(
            "Array.isArray(decisionContract?.missingCaptureRoles)"
        )
        && clauseEntrySource.includes(
            "requiredResultRoles: ownerMissingCaptureRoles"
        )
        && clauseEntrySource.includes(
            "classicalCapabilityBindingResults"
        )
        && clauseEntrySource.includes(
            "syncClassicalGrammarWorkspaceHistory()"
        )
        && clauseSupplySource.includes(
            "controller?.captureCurrentResult?.("
        )
        && clauseSupplySource.includes(
            "binding.requiredResultRoles.filter("
        )
        && clauseSupplySource.includes(
            "requiredResultRoles: remainingRequiredResultRoles"
        )
        && clauseSupplySource.includes(
            "syncClassicalGrammarWorkspaceHistory()"
        )
    );

    return suite;
}

module.exports = { run };
