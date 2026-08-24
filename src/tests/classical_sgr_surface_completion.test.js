"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const PROJECT_ROOT = path.resolve(__dirname, "..", "..");

const REQUIRED_INTENTIONALLY_UNSURFACED_ATOM_IDS = Object.freeze([
    "CAA-grammar-nominal-construction--vacant-state",
    "CAA-nnc-adverbial--adverbial-source",
    "CAA-nnc-deverbal-construction--source-stage",
    "CAA-nnc-deverbal-construction--source-voice",
    "CAA-nnc-personal-name--inner-clause",
    "CAA-nnc-personal-name--outer-number",
    "CAA-nnc-place-gentilic--closed-title",
    "CAA-nnc-place-gentilic--place-source",
    "CAA-nnc-place-gentilic--profession",
    "CAA-nnc-relational--voice-source",
    "CAA-vnc-denominal--denominal-source-family",
    "CAA-vnc-denominal--source-rank",
    "CAA-vnc-denominal--target-valence",
    "CAA-vnc-derivational-operation--source-participants",
    "CAA-vnc-ordered-voice-application--source-voice",
    "CAA-vnc-ordered-voice-application--target-voice",
    "CAA-vnc-ordered-voice-chain--source-voice",
    "CAA-vnc-ordered-voice-chain--target-voice",
]);

const REQUIRED_INTENTIONALLY_UNSURFACED_DIAGNOSTIC_ATOM_IDS = Object.freeze([
    "CAA-nnc-adverbial--adverbialized-subject",
    "CAA-vnc-application--source-analysis",
    "CAA-vnc-derivational-operation--operation-order",
    "CAA-vnc-derivational-operation--target-participants",
    "CAA-vnc-ordered-voice-application--participant-transformation",
    "CAA-vnc-ordered-voice-chain--participant-transformation",
]);

function read(relativePath) {
    return fs.readFileSync(path.join(PROJECT_ROOT, relativePath), "utf8");
}

function countMatches(source, pattern) {
    return Array.from(String(source || "").matchAll(pattern)).length;
}

function functionSlice(source, functionName, nextFunctionName = "") {
    const start = source.indexOf(`function ${functionName}`);
    if (start < 0) return "";
    if (nextFunctionName) {
        const end = source.indexOf(`function ${nextFunctionName}`, start + 1);
        return end > start ? source.slice(start, end) : source.slice(start);
    }
    const nextFunction = source.indexOf("\n    function ", start + 1);
    return nextFunction > start
        ? source.slice(start, nextFunction)
        : source.slice(start);
}

function hasDatasetContract(source, attributeName, datasetName) {
    return source.includes(attributeName)
        || source.includes(`dataset.${datasetName}`)
        || source.includes(`"${datasetName}"`);
}

function getAtomProjection(atom = null) {
    return {
        atomId: atom?.atomId || "",
        disposition: atom?.disposition || "",
        stage: atom?.binding?.stage || "",
        public: atom?.binding?.public,
        uiAuthority: atom?.authority?.uiAuthority,
        grammarAuthority: atom?.authority?.grammarAuthority,
    };
}

function buildPersonalNameClause(ctx, sourceFamily = "preterit-agentive") {
    return ctx.buildPersonalNameInnerClauseFrame({
        sourceFamily,
        subjectPrefix: "Ø",
        subjectConnector: "Ø",
        predicateMorphs: ["temō", "Ø"],
        numberPrefix: "c",
        numberSuffix: "Ø",
    });
}

function run(ctx = {}) {
    const suite = createSuite("classical_sgr_surface_completion");
    const indexHtml = read("index.html");
    const shell = read("src/ui/shell/classical_shell.mjs");
    const rendering = read("src/ui/rendering/rendering.mjs");
    const state = read("src/ui/state.mjs");
    const style = read("style.css");

    const sourcePanel = functionSlice(
        shell,
        "ClassicalSourcePanel",
        "ClassicalAuthorityPanel"
    );
    const grammarPanel = functionSlice(
        shell,
        "ClassicalAuthorityPanel",
        "ClassicalResultPanel"
    );
    const resultPanel = functionSlice(
        shell,
        "ClassicalResultPanel",
        "ClassicalFooter"
    );
    const constructionSync = functionSlice(
        rendering,
        "syncClassicalNominalConstructionControlVisibility"
    );
    const customGrammarPresentation = functionSlice(
        rendering,
        "syncClassicalCustomConstructionGrammarPresentation",
        "getClassicalNominalConstructionControlValue"
    );
    const clauseWorkflowMount = functionSlice(
        rendering,
        "mountClassicalClauseRelationWorkflowInResult"
    );
    const personalNameOwnerInventory = functionSlice(
        rendering,
        "getClassicalPersonalNameOwnerInventory"
    );
    const personalNameControlSync = functionSlice(
        rendering,
        "syncClassicalPersonalNameSentenceControls"
    );
    const personalNameSelection = functionSlice(
        rendering,
        "getClassicalPersonalNameSentenceSelection"
    );
    const personalNameSentenceRequest = functionSlice(
        rendering,
        "requestClassicalPersonalNameSentenceOperation"
    );
    const nominalConstructionRequest = functionSlice(
        rendering,
        "buildClassicalNominalConstructionUiRequest"
    );
    const attitudeVncOperationRequest = functionSlice(
        rendering,
        "buildClassicalAttitudeVncOperationRequest"
    );
    const nominalConstructionRenderer = functionSlice(
        rendering,
        "renderClassicalNominalConstructionSurfaceBlock"
    );
    const unavailableConstructionRenderer = functionSlice(
        rendering,
        "renderClassicalUnavailableNominalConstructionSelection"
    );

    const neutralChoca = ctx.requestClassicalVncApplicationResult({
        sourceStem: "chōca",
        sourceValence: "intransitive",
        verbClass: "A",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        derivationType: "direct",
        voice: "active",
    });
    const honorificChoca = ctx.requestClassicalLateVncOperation({
        sourceStem: "chōca",
        sourceValence: "intransitive",
        verbClass: "A",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        derivationType: "direct",
        voice: "active",
        lateOperation: "honorific",
        lateVariant: "causative",
        honoredParticipant: "subject",
    });
    const selfHonorificChoca = ctx.requestClassicalLateVncOperation({
        sourceStem: "chōca",
        sourceValence: "intransitive",
        verbClass: "A",
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        derivationType: "direct",
        voice: "active",
        lateOperation: "honorific",
        lateVariant: "causative",
        honoredParticipant: "subject",
    });
    suite.eq(
        "the Source attitude route executes the Canvas-owned intransitive honorific transformation instead of returning the neutral VNC",
        {
            routeUsesLateVncApplication:
                nominalConstructionRenderer.includes(
                    'selectedConstruction === "attitude-vnc"'
                )
                && nominalConstructionRenderer.includes(
                    "targetObject.requestClassicalLateVncOperation("
                )
                && nominalConstructionRenderer.includes(
                    "buildClassicalAttitudeVncOperationRequest(request)"
                ),
            specializedResultRetainsCanonicalBlockReason:
                nominalConstructionRenderer.includes(
                    "block.dataset.classicalBlockReason = String(frame.blockReason"
                ),
            requestCarriesChoices:
                attitudeVncOperationRequest.includes(
                    'Object.prototype.hasOwnProperty.call(request, "attitude")'
                )
                && attitudeVncOperationRequest.includes("lateOperation,")
                && attitudeVncOperationRequest.includes(
                    "lateVariant: String(request.attitudeFormation"
                )
                && attitudeVncOperationRequest.includes(
                    'String(request.honoredParticipant || "subject")'
                )
                && attitudeVncOperationRequest.includes(
                    "honorificFormationAnalysis:"
                )
                && attitudeVncOperationRequest.includes(
                    "honorificStemAlternative: String("
                )
                && attitudeVncOperationRequest.includes(
                    "honorificDerivationOptionId: String("
                ),
            presentationCarriersIgnored:
                !attitudeVncOperationRequest.includes("formula")
                && !attitudeVncOperationRequest.includes("surface")
                && !attitudeVncOperationRequest.includes("answer"),
            neutralSurface:
                neutralChoca?.resultFrame?.surfaceRealization || "",
            honorificStatus: honorificChoca?.authorizationStatus || "",
            honorificCanonical:
                ctx.isClassicalNahuatlClosureFrame(honorificChoca),
            honorificRule: honorificChoca?.operationFrame?.ruleFamily || "",
            honorificTarget: honorificChoca?.operationFrame?.targetStem || "",
            honorificFormula: honorificChoca?.formulaRealization || "",
            honorificSurface: honorificChoca?.surfaceRealization || "",
            selfHonorificStatus:
                selfHonorificChoca?.authorizationStatus || "",
            selfHonorificReason: selfHonorificChoca?.blockReason || "",
            selfHonorificRecovery:
                ctx.getClassicalRuleLogicSurfaceBlockMessage(
                    selfHonorificChoca?.blockReason
                ),
        },
        {
            routeUsesLateVncApplication: true,
            specializedResultRetainsCanonicalBlockReason: true,
            requestCarriesChoices: true,
            presentationCarriersIgnored: true,
            neutralSurface: "chōca",
            honorificStatus: "authorized",
            honorificCanonical: true,
            honorificRule: "honorific-causative",
            honorificTarget: "choc-tiā",
            honorificFormula: "#0-0+m-o(choc-tia)0+0-0#",
            honorificSurface: "mochoctia",
            selfHonorificStatus: "blocked",
            selfHonorificReason: "self-honorific-not-authorized",
            selfHonorificRecovery:
                "An honorific cannot honor the speaker. Choose a second- or third-person subject.",
        }
    );

    const auditedParticularRecovery = Object.fromEntries([
        "reverential-requires-engine-issued-honorific-source",
        "licensed-attitude-formation-required",
        "honorific-preterit-embed-requires-mainline-reflexive-source",
        "typed-place-gentilic-source-required",
        "n-imperfect-nonactive-requires-typed-nonactive-source",
        "place-affective-structural-analysis-required",
        "typed-source-has-no-licensed-adverbial-potential",
        "nominal-embed-matrix-stem-required",
        "nominal-compound-matrix-stem-and-class-required",
        "tzin-denominal-vnc-is-restricted-to-honorific-matrix-operation",
        "flawed-subject-requires-licensed-defect-stem",
        "affective-zol-requires-nonanimate-embed",
        "pil-honorific-vocative-requires-tzin-vocative",
        "gross-count-requires-plural-subject",
        "special-twenty-classifier-requires-one-through-nineteen-groups-of-twenty",
        "measure-classifier-requires-measure-stem",
        "ordinary-animate-count-requires-singular-or-plural-subject",
        "cardinal-numeral-nnc-is-absolutive-only-except-gross-count",
        "ordinary-nonanimate-count-requires-common-number-subject",
    ].map((reason) => [
        reason,
        ctx.getClassicalRuleLogicSurfaceBlockMessage(reason),
    ]));
    const blockedAdverbialPotential = ctx.prepareClassicalAdverbialNncSource({
        stem: "cal",
        clauseKind: "nnc-absolutive",
    });
    const blockedAdverbialResult = ctx.requestClassicalAdverbialNncResult({
        adverbialPotentialFrame: blockedAdverbialPotential,
    });
    const blockedCompound = ctx.requestClassicalNominalConstructionResult({
        constructionKind: "compound-nnc",
        source: {
            embedStem: "ā",
            embedClass: "tli",
            matrixStem: "cal",
            matrixClass: "tli",
        },
        structure: "linked-connective-t",
        embedRole: "association",
        possessorOrientation: "matrix",
        subject: "3sg",
        state: "absolutive",
        animacy: "animate",
    });
    suite.eq(
        "blocked Source and Grammar cascades retain their owner reason and use particular Result recovery",
        {
            everyAuditedReasonIsParticular: Object.values(
                auditedParticularRecovery
            ).every((message) => (
                message
                && message
                    !== "Review the Source and Grammar selections to continue."
            )),
            adverbialPotentialReason:
                blockedAdverbialPotential?.blockReason || "",
            adverbialResultReason:
                blockedAdverbialResult?.blockReason || "",
            adverbialRecovery:
                ctx.getClassicalRuleLogicSurfaceBlockMessage(
                    blockedAdverbialResult?.blockReason
                ),
            blockedCompoundRetained:
                ctx.isClassicalNahuatlNominalConstructionResult(
                    blockedCompound
                ),
            blockedCompoundReason: blockedCompound?.blockReason || "",
        },
        {
            everyAuditedReasonIsParticular: true,
            adverbialPotentialReason:
                "typed-source-has-no-licensed-adverbial-potential",
            adverbialResultReason:
                "typed-source-has-no-licensed-adverbial-potential",
            adverbialRecovery:
                "This Source has no licensed adverbial use. Choose a Source identified for adverbial use, or select a different operation.",
            blockedCompoundRetained: true,
            blockedCompoundReason:
                "linked-compound-requires-embed-possessor-orientation",
        }
    );

    const incompleteDeverbalRequest = {
        constructionKind: "predicate-nominalization",
        nominalizationKind: "preterit-agentive",
        source: {
            sourceStage: "preterit-predicate",
            sourceStem: "",
            verbClass: "A",
            sourceVoice: "active",
            sourceValence: "intransitive",
            sourceObjectPattern: "none",
        },
        subject: "3sg",
        state: "absolutive",
        animacy: "animate",
    };
    const incompleteDeverbalOwner =
        ctx.evaluateClassicalNahuatlDeverbalNnc(
            incompleteDeverbalRequest
        );
    const incompleteDeverbalReceipt =
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "nnc:deverbal-construction",
            args: [incompleteDeverbalRequest],
        });
    const incompleteDenominalReceipt =
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "vnc:denominal",
            args: [{}],
        });
    const incompletePersonalNameReceipt =
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "nnc:personal-name",
            args: [{ sourceFrame: null, outerSubject: "3sg" }],
        });
    const incompleteDeverbalPrompt =
        ctx.getClassicalSourceOperationBlockPrompt(
            "deverbal-nnc",
            incompleteDeverbalReceipt.blockReason
        );
    const incompleteDenominalPrompt =
        ctx.getClassicalSourceOperationBlockPrompt(
            "denominal-vnc",
            "denominal-operation-selection-required"
        );
    const incompletePersonalNamePrompt =
        ctx.getClassicalSourceOperationBlockPrompt(
            "personal-name-nnc",
            "outer-subject-required"
        );
    const unavailableServicePrompt =
        ctx.getClassicalSourceOperationBlockPrompt(
            "deverbal-nnc",
            "canonical-compound-nnc-evaluator-unavailable"
        );
    const characteristicChoicePrompt =
        ctx.getClassicalSourceOperationBlockPrompt(
            "deverbal-nnc",
            "39.9-full-or-omitted-characteristic-matrix-choice-required"
        );
    const vocativeSourcePrompt =
        ctx.getClassicalSourceOperationBlockPrompt(
            "deverbal-nnc",
            "35.13-exact-owner-issued-absolutive-preterit-agentive-result-required"
        );
    suite.eq(
        "incomplete Source operations retain the exact owner reason and present an actionable route-specific prompt",
        {
            ownerStatus: incompleteDeverbalOwner.authorizationStatus,
            ownerReason: incompleteDeverbalOwner.blockReason,
            receiptValid: ctx.isClassicalGrammarApplicationResult(
                incompleteDeverbalReceipt
            ),
            receiptStatus: incompleteDeverbalReceipt.authorizationStatus,
            receiptReason: incompleteDeverbalReceipt.blockReason,
            canonicalResult: incompleteDeverbalReceipt.canonicalResult,
            promptTitle: incompleteDeverbalPrompt.title,
            promptDetail: incompleteDeverbalPrompt.detail,
            promptReason: incompleteDeverbalPrompt.blockReason,
            promptAuthority: incompleteDeverbalPrompt.grammarAuthority,
            otherRouteReceipts: [
                incompleteDenominalReceipt,
                incompletePersonalNameReceipt,
            ].map(receipt => ({
                valid: ctx.isClassicalGrammarApplicationResult(receipt),
                status: receipt.authorizationStatus,
                reason: receipt.blockReason,
                canonicalResult: receipt.canonicalResult,
            })),
            denominalDetail: incompleteDenominalPrompt.detail,
            personalNameDetail: incompletePersonalNamePrompt.detail,
            characteristicChoiceDetail:
                characteristicChoicePrompt.detail,
            vocativeSourceDetail: vocativeSourcePrompt.detail,
            serviceFailure: [
                unavailableServicePrompt.title,
                unavailableServicePrompt.guidanceKind,
                unavailableServicePrompt.detail,
            ],
            routeMapDeclared:
                rendering.includes(
                    '"deverbal-nnc": "nnc:deverbal-construction"'
                )
                && rendering.includes(
                    '"denominal-vnc": "vnc:denominal"'
                )
                && rendering.includes(
                    '"personal-name-nnc": "nnc:personal-name"'
                ),
            receiptKeptSeparate:
                nominalConstructionRenderer.includes(
                    "sourceOperationApplicationResult ="
                )
                && nominalConstructionRenderer.includes(
                    "sourceOperationApplicationResult?.canonicalResult || null"
                )
                && nominalConstructionRenderer.includes(
                    "sourceOperationApplicationResult?.blockReason"
                ),
            exactReasonRendered:
                unavailableConstructionRenderer.includes(
                    "block.dataset.classicalBlockReason = prompt.blockReason"
                )
                && unavailableConstructionRenderer.includes(
                    "detail.textContent = prompt.detail"
                ),
            oldLossyCopyAbsent:
                !rendering.includes(
                    "This pathway needs more typed Source or Grammar information before it can issue a Result."
                )
                && !rendering.includes(
                    "The selected pathway is waiting for required information."
                ),
        },
        {
            ownerStatus: "blocked",
            ownerReason: "typed-source-stem-required",
            receiptValid: true,
            receiptStatus: "blocked",
            receiptReason: "typed-source-stem-required",
            canonicalResult: null,
            promptTitle: "Complete the Deverbal NNC",
            promptDetail:
                "Enter and apply the verbstem required by this deverbal operation.",
            promptReason: "typed-source-stem-required",
            promptAuthority: false,
            otherRouteReceipts: [
                {
                    valid: true,
                    status: "blocked",
                    reason: "denominal-source-stem-required",
                    canonicalResult: null,
                },
                {
                    valid: true,
                    status: "blocked",
                    reason: "issued-operation-required",
                    canonicalResult: null,
                },
            ],
            denominalDetail:
                "Choose a denominal operation licensed for this nounstem Source.",
            personalNameDetail:
                "Choose a singular outer Subject: 1sg, 2sg, or 3sg.",
            characteristicChoiceDetail:
                "Choose whether to keep the full yō formation or omit its matrix while preserving the meaning.",
            vocativeSourceDetail:
                "Complete the Source verbstem, class, valence, and any object choice. The preterit-agentive Source is built automatically.",
            serviceFailure: [
                "Deverbal NNC unavailable",
                "blocked",
                "This operation could not be loaded. Your Source and Grammar choices are not the cause.",
            ],
            routeMapDeclared: true,
            receiptKeptSeparate: true,
            exactReasonRendered: true,
            oldLossyCopyAbsent: true,
        }
    );

    suite.eq(
        "the numeral modifier picker exposes the Canvas §34.15 choices accepted by the canonical owner",
        {
            canah: shell.includes(
                '<option value="canah">canah · approximately</option>'
            ),
            quen: shell.includes(
                '<option value="quēn">quēn · approximately</option>'
            ),
            ahzoQuen: shell.includes(
                '<option value="ahzo-quēn">ahzo quēn · perhaps approximately</option>'
            ),
            oc: shell.includes(
                '<option value="oc">oc · more or another</option>'
            ),
            unsupportedAzoAbsent: !shell.includes(
                '<option value="azo">'
            ),
            unsupportedAciAbsent: !shell.includes(
                '<option value="acī">'
            ),
        },
        {
            canah: true,
            quen: true,
            ahzoQuen: true,
            oc: true,
            unsupportedAzoAbsent: true,
            unsupportedAciAbsent: true,
        }
    );

    suite.eq(
        "advanced construction controls are individually classified into Source or Grammar and never mounted into Result",
        {
            wrapperDeclaredOnce: countMatches(
                shell,
                /id="classical-construction-controls"/gu
            ),
            sourceHostDeclared: indexHtml.includes('id="classical-source-panel"'),
            grammarHostDeclared: indexHtml.includes('id="classical-authority-panel"'),
            resultHostDeclared: indexHtml.includes('id="classical-result-panel"'),
            sourceInventoryDeclared: rendering.includes(
                "CLASSICAL_CUSTOM_CONSTRUCTION_SOURCE_ANALYSIS_CONTROL_IDS"
            ),
            sourceMovedIndividually:
                constructionSync.includes(
                    "CLASSICAL_CUSTOM_CONSTRUCTION_SOURCE_ANALYSIS_CONTROL_IDS.forEach"
                )
                && constructionSync.includes(
                    "sourceAnalysisRoot.appendChild(wrapper)"
                ),
            inheritedRouteOwnershipPreserved:
                constructionSync.includes("const inheritedOwner = String(")
                && constructionSync.includes(
                    "wrapper.dataset.constructionFor = inheritedOwner"
                ),
            grammarInventoryDeclared: rendering.includes(
                "CLASSICAL_CUSTOM_CONSTRUCTION_GRAMMAR_CONTROL_PLACEMENTS"
            ),
            grammarMovedIndividually:
                customGrammarPresentation.includes("lane.appendChild(wrapper)")
                && customGrammarPresentation.includes(
                    'wrapper.dataset.classicalConstructionGrammarLayer = "route-specific"'
                )
                && customGrammarPresentation.includes(
                    "wrapper.dataset.classicalConstructionGrammarGroup = semanticGroup"
                ),
            wholeWrapperNotMounted:
                !constructionSync.includes("grammarGrid.prepend(controlsRoot)")
                && !rendering.includes("appendChild(controlsRoot)"),
            presentationRunsAfterVisibility: constructionSync.includes(
                "syncClassicalCustomConstructionGrammarPresentation(selected, frame)"
            ),
            resultNotAMountTarget:
                constructionSync.includes(
                    '"#classical-result-panel .classical-result-scope-controls"'
                )
                && constructionSync.includes('id.endsWith("-output-scope")')
                && !constructionSync.includes(
                    "resultScopeControls.appendChild(controlsRoot)"
                )
                && !constructionSync.includes(
                    "container-tense-grid.appendChild(controlsRoot)"
                ),
        },
        {
            wrapperDeclaredOnce: 1,
            sourceHostDeclared: true,
            grammarHostDeclared: true,
            resultHostDeclared: true,
            sourceInventoryDeclared: true,
            sourceMovedIndividually: true,
            inheritedRouteOwnershipPreserved: true,
            grammarInventoryDeclared: true,
            grammarMovedIndividually: true,
            wholeWrapperNotMounted: true,
            presentationRunsAfterVisibility: true,
            resultNotAMountTarget: true,
        }
    );

    suite.eq(
        "the clause-relation workflow belongs to the Grammar continuation while only its canonical Result returns to Result",
        {
            grammarContinuationDeclared: grammarPanel.includes(
                'id="classical-grammar-continuation"'
            ),
            sourceContinuationDeclared: sourcePanel.includes(
                'id="classical-source-continuation"'
            ),
            resultDoesNotDeclareGrammarContinuation: !resultPanel.includes(
                'id="classical-grammar-continuation"'
            ),
            mountUsesGrammarHost: clauseWorkflowMount.includes(
                '"classical-grammar-continuation"'
            ),
            workflowMountedThere: clauseWorkflowMount.includes(
                "host.replaceChildren(...(workflow ? [workflow] : []))"
            ),
            canonicalResultRemovedFirst: clauseWorkflowMount.includes(
                "continuationResult?.remove?.()"
            ),
            resultReceivesOnlyReturnedCanonicalResult: rendering.includes(
                "...(clauseContinuationResult ? [clauseContinuationResult] : [])"
            ),
        },
        {
            grammarContinuationDeclared: true,
            sourceContinuationDeclared: true,
            resultDoesNotDeclareGrammarContinuation: true,
            mountUsesGrammarHost: true,
            workflowMountedThere: true,
            canonicalResultRemovedFirst: true,
            resultReceivesOnlyReturnedCanonicalResult: true,
        }
    );

    suite.eq(
        "personal-name reranking and sentence-operation controls are owner-populated Grammar choices",
        {
            rerankingControl: shell.includes(
                'id="classical-personal-name-reranking"'
            ) && shell.includes(
                'data-classical-rule-logic-control="personal-name-reranking"'
            ) && shell.includes('data-personal-name-reranking="true"'),
            sentenceOperationControl: shell.includes(
                'id="classical-personal-name-sentence-operation"'
            ) && shell.includes(
                'data-classical-rule-logic-control="personal-name-sentence-operation"'
            ) && shell.includes(
                'data-personal-name-sentence-operation="true"'
            ),
            lcmIsTheOptionSource:
                personalNameOwnerInventory.includes(
                    "const { getPersonalNameNncLcm } = targetObject"
                )
                && /Reflect\.apply\(\s*getPersonalNameNncLcm,\s*targetObject,\s*\[\]\s*\)/gu
                    .test(personalNameOwnerInventory)
                && personalNameOwnerInventory.includes(
                    'axis?.id === "god-name-reranking"'
                )
                && personalNameOwnerInventory.includes(
                    "inventory?.sentenceOperations"
                ),
            controlsAreRebuiltFromOwnerValues:
                personalNameControlSync.includes(
                    "rerankingControl.replaceChildren()"
                )
                && personalNameControlSync.includes(
                    "rerankingValues.forEach"
                )
                && personalNameControlSync.includes(
                    "sentenceControl.replaceChildren()"
                )
                && personalNameControlSync.includes(
                    "sentenceOperations.forEach"
                ),
            bothControlsAreRead:
                personalNameSelection.includes(
                    '"classical-personal-name-reranking"'
                )
                && personalNameSelection.includes(
                    '"classical-personal-name-sentence-operation"'
                ),
        },
        {
            rerankingControl: true,
            sentenceOperationControl: true,
            lcmIsTheOptionSource: true,
            controlsAreRebuiltFromOwnerValues: true,
            bothControlsAreRead: true,
        }
    );

    suite.eq(
        "the two personal-name selections enter typed owner requests rather than authorizing a displayed string",
        {
            typedSelectionRead: nominalConstructionRequest.includes(
                "getClassicalPersonalNameSentenceSelection()"
            ),
            rerankingBecomesTypedGodSource:
                nominalConstructionRequest.includes(
                    "sentenceSelection.requiresGodSource"
                )
                && nominalConstructionRequest.includes(
                    '{ referentKind: "god" }'
                ),
            sentenceOperationUsesApplicationRequest:
                personalNameSentenceRequest.includes(
                    "executeClassicalGrammarApplicationRequest"
                )
                && personalNameSentenceRequest.includes(
                    'operationId: "nnc:personal-name"'
                )
                && personalNameSentenceRequest.includes(
                    'outputKind: "sentence-operation"'
                )
                && personalNameSentenceRequest.includes("personalNameResult")
                && personalNameSentenceRequest.includes(
                    "operation: selection.operation"
                ),
            displayedStringsRemainNonAuthorizing:
                !personalNameSelection.includes("formula")
                && !personalNameSelection.includes("surface")
                && !personalNameSelection.includes("answer"),
        },
        {
            typedSelectionRead: true,
            rerankingBecomesTypedGodSource: true,
            sentenceOperationUsesApplicationRequest: true,
            displayedStringsRemainNonAuthorizing: true,
        }
    );

    const getSurfaceInventory =
        ctx.getClassicalSourceGrammarResultSurfaceInventory;
    suite.eq(
        "the focused completion proof consumes the production SGR inventory API",
        typeof getSurfaceInventory,
        "function"
    );
    const inventory = typeof getSurfaceInventory === "function"
        ? getSurfaceInventory()
        : null;
    const atoms = [
        ...(Array.isArray(inventory?.axes) ? inventory.axes : []),
        ...(Array.isArray(inventory?.outputs) ? inventory.outputs : []),
    ];
    const atomsById = new Map(atoms.map(atom => [atom.atomId, atom]));
    const publicAtoms = atoms.filter(atom => atom?.binding?.public === true);
    const privateAtoms = atoms.filter(atom => atom?.binding?.public === false);
    suite.eq(
        "DOM correlation uses the exact v3 496-atom public/private boundary",
        {
            kind: inventory?.kind || "",
            version: inventory?.version,
            axes: inventory?.axes?.length || 0,
            outputs: inventory?.outputs?.length || 0,
            atoms: atoms.length,
            publicAtoms: publicAtoms.length,
            privateAtoms: privateAtoms.length,
            uniqueAtoms: new Set(atoms.map(atom => atom.atomId)).size,
        },
        {
            kind: "classical-source-grammar-result-surface-inventory",
            version: 3,
            axes: 441,
            outputs: 55,
            atoms: 496,
            publicAtoms: 106,
            privateAtoms: 390,
            uniqueAtoms: 496,
        }
    );

    const intentionallyUnsurfacedAxes = inventory.axes.filter(atom => (
        atom.disposition === "intentionally-unsurfaced"
    ));
    suite.eq(
        "the exact 18 former readouts are intentionally unsurfaced and private",
        REQUIRED_INTENTIONALLY_UNSURFACED_ATOM_IDS.map(atomId =>
            getAtomProjection(atomsById.get(atomId))),
        REQUIRED_INTENTIONALLY_UNSURFACED_ATOM_IDS.map(atomId => ({
            atomId,
            disposition: "intentionally-unsurfaced",
            stage: "grammar",
            public: false,
            uiAuthority: "none",
            grammarAuthority: false,
        }))
    );

    suite.eq(
        "the exact six former diagnostic readouts are intentionally unsurfaced and private",
        REQUIRED_INTENTIONALLY_UNSURFACED_DIAGNOSTIC_ATOM_IDS.map(atomId =>
            getAtomProjection(atomsById.get(atomId))),
        REQUIRED_INTENTIONALLY_UNSURFACED_DIAGNOSTIC_ATOM_IDS.map(atomId => ({
            atomId,
            disposition: "intentionally-unsurfaced",
            stage: "grammar",
            public: false,
            uiAuthority: "none",
            grammarAuthority: false,
        }))
    );

    suite.eq(
        "all 373 unsurfaced fact and diagnostic axes retain identity without a public binding",
        {
            count: intentionallyUnsurfacedAxes.length,
            allPrivate: intentionallyUnsurfacedAxes.every(atom => (
                atom.binding?.stage === "grammar"
                && atom.binding?.public === false
                && atom.authority?.uiAuthority === "none"
                && atom.authority?.grammarAuthority === false
            )),
        },
        { count: 373, allPrivate: true }
    );

    suite.eq(
        "the rejected generic Grammar facts component and projection machinery are absent",
        {
            shellComponent: shell.includes("classical-grammar-facts"),
            renderingComponent: rendering.includes("classical-grammar-facts"),
            styleComponent:
                style.includes(".classical-grammar-facts")
                || style.includes(".classical-grammar-fact"),
            projectionFunction:
                rendering.includes("syncClassicalSgrGrammarFacts"),
            projectionResolver:
                rendering.includes("resolveClassicalSgrFactValue"),
            projectionAliases:
                rendering.includes("CLASSICAL_SGR_AXIS_VALUE_ALIASES"),
            factProjectionDataset:
                rendering.includes("classicalFactProjection"),
            diagnosticProjectionDataset:
                rendering.includes("classicalSurfaceDiagnostic"),
        },
        {
            shellComponent: false,
            renderingComponent: false,
            styleComponent: false,
            projectionFunction: false,
            projectionResolver: false,
            projectionAliases: false,
            factProjectionDataset: false,
            diagnosticProjectionDataset: false,
        }
    );

    const privateAtomIds = privateAtoms.map(atom => atom.atomId).sort();
    const publicCorrelationSource = `${shell}\n${rendering}`;
    suite.eq(
        "public DOM correlations derive from the production inventory and private atoms receive no DOM target",
        {
            rendererConsumesProductionInventory:
                rendering.includes(
                    "getClassicalSourceGrammarResultSurfaceInventory"
                ),
            publicBoundaryChecked:
                /binding\?*\.public\s*===\s*true/gu.test(rendering)
                || /binding\.public\s*===\s*true/gu.test(rendering),
            interactiveAxisCorrelation: hasDatasetContract(
                publicCorrelationSource,
                "data-classical-surface-atom-ids",
                "classicalSurfaceAtomIds"
            ),
            outputContractCorrelation: hasDatasetContract(
                publicCorrelationSource,
                "data-classical-output-contract-ids",
                "classicalOutputContractIds"
            ),
            privateIdsWithLiteralDomTargets: privateAtomIds.filter(atomId =>
                publicCorrelationSource.includes(atomId)),
        },
        {
            rendererConsumesProductionInventory: true,
            publicBoundaryChecked: true,
            interactiveAxisCorrelation: true,
            outputContractCorrelation: true,
            privateIdsWithLiteralDomTargets: [],
        }
    );

    suite.eq(
        "the production state owns one non-authorizing SGR inventory rather than a renderer copy",
        {
            stateDefinesInventory: state.includes(
                "CLASSICAL_SOURCE_GRAMMAR_RESULT_SURFACE_INVENTORY"
            ),
            renderingDoesNotDefineInventory:
                !rendering.includes(
                    "const CLASSICAL_SOURCE_GRAMMAR_RESULT_SURFACE_INVENTORY"
                ),
            uiAuthority: inventory?.authority?.uiAuthority,
            grammarAuthority: inventory?.authority?.grammarAuthority,
        },
        {
            stateDefinesInventory: true,
            renderingDoesNotDefineInventory: true,
            uiAuthority: "none",
            grammarAuthority: false,
        }
    );

    const lcm = typeof ctx.getPersonalNameNncLcm === "function"
        ? ctx.getPersonalNameNncLcm()
        : null;
    const rerankingAxis = lcm?.axes?.find(
        axis => axis?.id === "god-name-reranking"
    );
    const personalNameSource = typeof ctx.buildPersonalNameNncSourceFrame
        === "function"
        ? ctx.buildPersonalNameNncSourceFrame({
            sourceFamily: "preterit-agentive",
            clauses: [buildPersonalNameClause(ctx)],
        })
        : null;
    const scalarReceipt = personalNameSource
        && typeof ctx.executeClassicalGrammarApplicationRequest === "function"
        ? ctx.executeClassicalGrammarApplicationRequest({
            operationId: "nnc:personal-name",
            outputKind: "scalar",
            args: [{
                sourceFrame: personalNameSource,
                outerSubject: "3sg",
            }],
        })
        : null;
    const sentenceReceipt = scalarReceipt?.canonicalResult
        && typeof ctx.executeClassicalGrammarApplicationRequest === "function"
        ? ctx.executeClassicalGrammarApplicationRequest({
            operationId: "nnc:personal-name",
            outputKind: "sentence-operation",
            args: [{
                personalNameResult: scalarReceipt.canonicalResult,
                operation: "sentence-name-use",
            }],
        })
        : null;
    suite.eq(
        "the personal-name UI contract terminates in live owner-issued scalar and sentence-operation application receipts",
        {
            rerankingValues: rerankingAxis?.values || [],
            sentenceOperationCount: lcm?.sentenceOperations?.length || 0,
            scalar: [
                scalarReceipt?.authorizationStatus || "",
                scalarReceipt?.operationId || "",
                scalarReceipt?.outputKind || "",
                typeof ctx.isClassicalGrammarApplicationResult === "function"
                    ? ctx.isClassicalGrammarApplicationResult(scalarReceipt)
                    : false,
            ],
            sentence: [
                sentenceReceipt?.authorizationStatus || "",
                sentenceReceipt?.operationId || "",
                sentenceReceipt?.outputKind || "",
                sentenceReceipt?.canonicalResult?.operation || "",
                typeof ctx.isClassicalGrammarApplicationResult === "function"
                    ? ctx.isClassicalGrammarApplicationResult(sentenceReceipt)
                    : false,
            ],
        },
        {
            rerankingValues: [
                "personal-name",
                "normal-nnc-with-plural-rights",
                "place-name-embed",
            ],
            sentenceOperationCount: 8,
            scalar: ["authorized", "nnc:personal-name", "scalar", true],
            sentence: [
                "authorized",
                "nnc:personal-name",
                "sentence-operation",
                "sentence-name-use",
                true,
            ],
        }
    );

    suite.eq(
        "the live Deverbal vocative builder passes the exact owner-issued preterit-agentive NNC Result",
        (() => {
            ctx.applyClassicalBasalUnitMode("vnc", { syncSurface: false });
            ctx.setClassicalSourcePartsMode("whole-stem", {
                clearValues: true,
            });
            ctx.document.getElementById("classical-source-whole").value =
                "chōca";
            ctx.document.getElementById("classical-rule-logic-class").value =
                "A";
            ctx.document.getElementById(
                "classical-rule-logic-valence"
            ).value = "intransitive";
            ctx.document.getElementById(
                "classical-construction-operation"
            ).value = "deverbal-nnc";
            ctx.document.getElementById(
                "classical-deverbal-nnc-family"
            ).value = "vocative";
            ctx.document.getElementById(
                "classical-rule-logic-nnc-subject-person"
            ).value = "3";
            ctx.document.getElementById(
                "classical-rule-logic-nnc-subject-number"
            ).value = "singular";
            ctx.document.getElementById(
                "classical-rule-logic-nnc-state"
            ).value = "absolutive";
            ctx.document.getElementById(
                "classical-rule-logic-nnc-subject-animacy"
            ).value = "animate";
            ctx.renderClassicalRuleLogicSurfaceBlock({ stem: "chōca" });
            const activeFrame =
                ctx.getActiveClassicalRuleLogicSurfaceFrame?.() || null;
            const frame =
                ctx.window.__CLASSICAL_NOMINAL_CONSTRUCTION_FRAME__
                || activeFrame;
            const capture =
                frame?.operationFrame?.vocativeAgentiveCaptureFrame || null;
            return {
                route: [
                    frame?.authorizationStatus || "",
                    frame?.constructionKind || "",
                    frame?.operationFrame?.operationId || "",
                ],
                capture: [
                    capture?.authorizationStatus || "",
                    capture?.exactResultIdentityPreserved === true,
                    capture?.canonicalNncGrammarFrame?.canonicalResult
                        === capture?.canonicalNncResult,
                    capture?.canonicalNncResult?.nncSlotFrame
                        === capture?.canonicalTypedSlotFrame,
                    capture?.canonicalOperationFrame?.nominalizationKind
                        || "",
                ],
            };
        })(),
        {
            route: [
                "authorized",
                "vocative",
                "vocative:preterit-agentive",
            ],
            capture: [
                "authorized",
                true,
                true,
                true,
                "preterit-agentive",
            ],
        }
    );

    return suite;
}

module.exports = { run };
