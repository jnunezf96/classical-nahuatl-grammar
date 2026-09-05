"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_temi_source_meaning_exact");
    const selection = "claim-p2292";
    const facet =
        "aci-p199-l015-74ce33d9a6-02-temi-source-meaning";
    const ownerSource = ctx.buildClassicalTypeOneFinalIReplacementSource({
        analysisDomain: "classical-type-one-final-i-replacement",
        selection,
        requestedFacet: facet,
        participantChoice: `${selection}:${facet}`,
    });
    const ownerResult = ctx.evaluateClassicalTypeOneFinalIReplacement(
        ownerSource
    );
    const ownerEvidence =
        ctx.getClassicalTypeOneFinalIReplacementExecutionEvidence(
            ownerResult
        );
    const derivationFacet =
        "aci-p199-l015-74ce33d9a6-04-temi-type-one-nonspecific-realization";
    const derivationSource = ctx.buildClassicalTypeOneFinalIReplacementSource({
        analysisDomain: "classical-type-one-final-i-replacement",
        selection,
        requestedFacet: derivationFacet,
        participantChoice: `${selection}:${derivationFacet}`,
    });
    const derivationResult = ctx.evaluateClassicalTypeOneFinalIReplacement(
        derivationSource
    );
    const derivationEvidence =
        ctx.getClassicalTypeOneFinalIReplacementExecutionEvidence(
            derivationResult
        );
    const participantFacet =
        "aci-p199-l015-74ce33d9a6-05-temi-nonspecific-nonhuman-object";
    const participantSource = ctx.buildClassicalTypeOneFinalIReplacementSource({
        analysisDomain: "classical-type-one-final-i-replacement",
        selection,
        requestedFacet: participantFacet,
        participantChoice: `${selection}:${participantFacet}`,
    });
    const participantResult = ctx.evaluateClassicalTypeOneFinalIReplacement(
        participantSource
    );
    const participantEvidence =
        ctx.getClassicalTypeOneFinalIReplacementExecutionEvidence(
            participantResult
        );
    const targetMeaningFacet =
        "aci-p199-l015-74ce33d9a6-06-temi-fill-container-target-meaning";
    const targetMeaningSource = ctx.buildClassicalTypeOneFinalIReplacementSource({
        analysisDomain: "classical-type-one-final-i-replacement",
        selection,
        requestedFacet: targetMeaningFacet,
        participantChoice: `${selection}:${targetMeaningFacet}`,
    });
    const targetMeaningResult = ctx.evaluateClassicalTypeOneFinalIReplacement(
        targetMeaningSource
    );
    const targetMeaningEvidence =
        ctx.getClassicalTypeOneFinalIReplacementExecutionEvidence(
            targetMeaningResult
        );
    const additionalTargetReadingFacet =
        "aci-p199-l015-74ce33d9a6-07-temi-put-something-somewhere-reading";
    const additionalTargetReadingSource =
        ctx.buildClassicalTypeOneFinalIReplacementSource({
            analysisDomain: "classical-type-one-final-i-replacement",
            selection,
            requestedFacet: additionalTargetReadingFacet,
            participantChoice: `${selection}:${additionalTargetReadingFacet}`,
        });
    const additionalTargetReadingResult =
        ctx.evaluateClassicalTypeOneFinalIReplacement(
            additionalTargetReadingSource
        );
    const additionalTargetReadingEvidence =
        ctx.getClassicalTypeOneFinalIReplacementExecutionEvidence(
            additionalTargetReadingResult
        );
    const lexicalExtensionFacet =
        "aci-p199-l015-74ce33d9a6-08-temi-bake-small-oven-lexical-extension";
    const lexicalExtensionSource =
        ctx.buildClassicalTypeOneFinalIReplacementSource({
            analysisDomain: "classical-type-one-final-i-replacement",
            selection,
            requestedFacet: lexicalExtensionFacet,
            participantChoice: `${selection}:${lexicalExtensionFacet}`,
        });
    const lexicalExtensionResult =
        ctx.evaluateClassicalTypeOneFinalIReplacement(
            lexicalExtensionSource
        );
    const lexicalExtensionEvidence =
        ctx.getClassicalTypeOneFinalIReplacementExecutionEvidence(
            lexicalExtensionResult
        );

    s.eq("ACI-P199-L015-74CE33D9A6-02 has one direct owner-issued observation", {
        status: ownerResult.authorizationStatus,
        canonicalPath: ownerResult.payload.effectiveCanonicalPath,
        sourceCanonicalPath: ownerResult.payload.sourceCanonicalPath,
        facetValue: ownerResult.payload.facetValue,
        observationKind: ownerResult.payload.proofObservationKind,
        observationStatus: ownerResult.payload.proofObservationStatus,
        broadProxyRetired: ownerResult.payload.broadCompletionProxyRetired,
        resultCanonical:
            ctx.isClassicalTypeOneFinalIReplacementResult(ownerResult),
        evidenceCanonical:
            ctx.isClassicalTypeOneFinalIReplacementExecutionEvidence(
                ownerEvidence,
                ownerResult
            ),
    }, {
        status: "authorized",
        canonicalPath: "derivations.temi.options.0.sourceMeaning",
        sourceCanonicalPath: "derivations.temi.options.0.sourceMeaning",
        facetValue: "become-brimming-full",
        observationKind: "direct-canonical-result-observation",
        observationStatus: "direct",
        broadProxyRetired: false,
        resultCanonical: true,
        evidenceCanonical: true,
    });

    s.eq("ACI-P199-L015-74CE33D9A6-04 observes the complete tla-(tēm-a) derivation", {
        status: derivationResult.authorizationStatus,
        canonicalPath: derivationResult.payload.effectiveCanonicalPath,
        sourceCanonicalPath: derivationResult.payload.sourceCanonicalPath,
        facetValue: derivationResult.payload.facetValue,
        observationKind: derivationResult.payload.proofObservationKind,
        observationStatus: derivationResult.payload.proofObservationStatus,
        broadProxyRetired:
            derivationResult.payload.broadCompletionProxyRetired,
        resultCanonical:
            ctx.isClassicalTypeOneFinalIReplacementResult(derivationResult),
        evidenceCanonical:
            ctx.isClassicalTypeOneFinalIReplacementExecutionEvidence(
                derivationEvidence,
                derivationResult
            ),
    }, {
        status: "authorized",
        canonicalPath: "participants.temiNonspecific.formulaRealization",
        sourceCanonicalPath:
            "participants.temiNonspecific.formulaRealization",
        facetValue: "#0-0+tla(tēm-a)0+0-0#",
        observationKind: "direct-canonical-result-observation",
        observationStatus: "direct",
        broadProxyRetired: false,
        resultCanonical: true,
        evidenceCanonical: true,
    });

    const nonspecific =
        participantResult.payload.definition.participants.temiNonspecific;
    s.eq("ACI-P199-L015-74CE33D9A6-05 owns the tla participant exactly", {
        status: participantResult.authorizationStatus,
        canonicalPath: participantResult.payload.effectiveCanonicalPath,
        sourceCanonicalPath: participantResult.payload.sourceCanonicalPath,
        facetValue: participantResult.payload.facetValue,
        observationKind: participantResult.payload.proofObservationKind,
        observationStatus: participantResult.payload.proofObservationStatus,
        broadProxyRetired:
            participantResult.payload.broadCompletionProxyRetired,
        resultCanonical:
            ctx.isClassicalTypeOneFinalIReplacementResult(participantResult),
        evidenceCanonical:
            ctx.isClassicalTypeOneFinalIReplacementExecutionEvidence(
                participantEvidence,
                participantResult
            ),
        sourceVoice: nonspecific.sourceVoice,
        implicitAgentBecomesCausee:
            nonspecific.implicitAgentBecomesCausativeObject,
        causeeKind: nonspecific.implicitAgentObjectKind,
        targetObjects: nonspecific.targetObjectRequests,
        machineryStatus: nonspecific.machineryAuthorizationStatus,
        finiteStatus: nonspecific.finiteAuthorizationStatus,
        formula: nonspecific.formulaRealization,
        word: nonspecific.wordRealization,
    }, {
        status: "authorized",
        canonicalPath:
            "participants.temiNonspecific.implicitAgentObjectKind",
        sourceCanonicalPath:
            "participants.temiNonspecific.implicitAgentObjectKind",
        facetValue: "nonspecific-nonhuman",
        observationKind: "direct-canonical-result-observation",
        observationStatus: "direct",
        broadProxyRetired: false,
        resultCanonical: true,
        evidenceCanonical: true,
        sourceVoice: "impersonal",
        implicitAgentBecomesCausee: true,
        causeeKind: "nonspecific-nonhuman",
        targetObjects: [{
            objectId: "causative-object",
            objectKind: "nonspecific-nonhuman",
            objectPerson: "",
            governor: "causative",
            derivationalLevel: 1,
        }],
        machineryStatus: "authorized",
        finiteStatus: "authorized",
        formula: "#0-0+tla(tēm-a)0+0-0#",
        word: "tlatēma",
    });

    const targetMeaningOption = targetMeaningResult.payload.definition
        .derivations.temi.options.find(
            candidate => candidate.ruleId === "cn-l24-2431a-temi-tem-a"
        );
    const targetMeaningParticipant = targetMeaningResult.payload.definition
        .participants.temiNonspecific;
    s.eq("ACI-P199-L015-74CE33D9A6-06 owns the Type 1 target meaning exactly", {
        status: targetMeaningResult.authorizationStatus,
        canonicalPath: targetMeaningResult.payload.effectiveCanonicalPath,
        sourceCanonicalPath: targetMeaningResult.payload.sourceCanonicalPath,
        facetValue: targetMeaningResult.payload.facetValue,
        observationKind: targetMeaningResult.payload.proofObservationKind,
        observationStatus: targetMeaningResult.payload.proofObservationStatus,
        broadProxyRetired:
            targetMeaningResult.payload.broadCompletionProxyRetired,
        resultCanonical:
            ctx.isClassicalTypeOneFinalIReplacementResult(targetMeaningResult),
        evidenceCanonical:
            ctx.isClassicalTypeOneFinalIReplacementExecutionEvidence(
                targetMeaningEvidence,
                targetMeaningResult
            ),
        targetStem: targetMeaningOption.targetStem,
        targetMeaning: targetMeaningOption.targetMeaning,
        causeeKind: targetMeaningParticipant.implicitAgentObjectKind,
        formula: targetMeaningParticipant.formulaRealization,
        word: targetMeaningParticipant.wordRealization,
    }, {
        status: "authorized",
        canonicalPath: "derivations.temi.options.0.targetMeaning",
        sourceCanonicalPath: "derivations.temi.options.0.targetMeaning",
        facetValue: "cause-something-to-fill-a-container",
        observationKind: "direct-canonical-result-observation",
        observationStatus: "direct",
        broadProxyRetired: false,
        resultCanonical: true,
        evidenceCanonical: true,
        targetStem: "tēm-a",
        targetMeaning: "cause-something-to-fill-a-container",
        causeeKind: "nonspecific-nonhuman",
        formula: "#0-0+tla(tēm-a)0+0-0#",
        word: "tlatēma",
    });

    const additionalTargetReadingOption = additionalTargetReadingResult
        .payload.definition.derivations.temi.options[0];
    const additionalTargetReadingParticipant = additionalTargetReadingResult
        .payload.definition.participants.temiNonspecific;
    s.eq("ACI-P199-L015-74CE33D9A6-07 has one direct owner-issued observation", {
        status: additionalTargetReadingResult.authorizationStatus,
        canonicalPath:
            additionalTargetReadingResult.payload.effectiveCanonicalPath,
        sourceCanonicalPath:
            additionalTargetReadingResult.payload.sourceCanonicalPath,
        facetValue: additionalTargetReadingResult.payload.facetValue,
        observationKind:
            additionalTargetReadingResult.payload.proofObservationKind,
        observationStatus:
            additionalTargetReadingResult.payload.proofObservationStatus,
        broadProxyRetired:
            additionalTargetReadingResult.payload.broadCompletionProxyRetired,
        resultCanonical:
            ctx.isClassicalTypeOneFinalIReplacementResult(
                additionalTargetReadingResult
            ),
        evidenceCanonical:
            ctx.isClassicalTypeOneFinalIReplacementExecutionEvidence(
                additionalTargetReadingEvidence,
                additionalTargetReadingResult
            ),
        targetStem: additionalTargetReadingOption.targetStem,
        primaryTargetMeaning: additionalTargetReadingOption.targetMeaning,
        additionalTargetReading:
            additionalTargetReadingOption.additionalTargetReadings[0],
        causeeKind:
            additionalTargetReadingParticipant.implicitAgentObjectKind,
        formula: additionalTargetReadingParticipant.formulaRealization,
        word: additionalTargetReadingParticipant.wordRealization,
    }, {
        status: "authorized",
        canonicalPath:
            "derivations.temi.options.0.additionalTargetReadings.0.meaning",
        sourceCanonicalPath:
            "derivations.temi.options.0.additionalTargetReadings.0.meaning",
        facetValue: "put-something-somewhere",
        observationKind: "direct-canonical-result-observation",
        observationStatus: "direct",
        broadProxyRetired: false,
        resultCanonical: true,
        evidenceCanonical: true,
        targetStem: "tēm-a",
        primaryTargetMeaning: "cause-something-to-fill-a-container",
        additionalTargetReading: {
            meaning: "put-something-somewhere",
            relation: "also",
        },
        causeeKind: "nonspecific-nonhuman",
        formula: "#0-0+tla(tēm-a)0+0-0#",
        word: "tlatēma",
    });

    const lexicalExtensionOption = lexicalExtensionResult.payload.definition
        .derivations.temi.options[0];
    const lexicalExtensionParticipant = lexicalExtensionResult.payload
        .definition.participants.temiNonspecific;
    s.eq("ACI-P199-L015-74CE33D9A6-08 owns the lexical extension and its relation", {
        status: lexicalExtensionResult.authorizationStatus,
        canonicalPath: lexicalExtensionResult.payload.effectiveCanonicalPath,
        sourceCanonicalPath:
            lexicalExtensionResult.payload.sourceCanonicalPath,
        facetValue: lexicalExtensionResult.payload.facetValue,
        observationKind: lexicalExtensionResult.payload.proofObservationKind,
        observationStatus:
            lexicalExtensionResult.payload.proofObservationStatus,
        broadProxyRetired:
            lexicalExtensionResult.payload.broadCompletionProxyRetired,
        resultCanonical:
            ctx.isClassicalTypeOneFinalIReplacementResult(
                lexicalExtensionResult
            ),
        evidenceCanonical:
            ctx.isClassicalTypeOneFinalIReplacementExecutionEvidence(
                lexicalExtensionEvidence,
                lexicalExtensionResult
            ),
        targetStem: lexicalExtensionOption.targetStem,
        primaryTargetMeaning: lexicalExtensionOption.targetMeaning,
        lexicalExtension:
            lexicalExtensionOption.additionalTargetReadings[1],
        causeeKind: lexicalExtensionParticipant.implicitAgentObjectKind,
        formula: lexicalExtensionParticipant.formulaRealization,
        word: lexicalExtensionParticipant.wordRealization,
    }, {
        status: "authorized",
        canonicalPath:
            "derivations.temi.options.0.additionalTargetReadings.1",
        sourceCanonicalPath:
            "derivations.temi.options.0.additionalTargetReadings.1",
        facetValue: {
            meaning: "bake-something-in-a-small-oven",
            relation: "lexical-extension",
        },
        observationKind: "direct-canonical-result-observation",
        observationStatus: "direct",
        broadProxyRetired: false,
        resultCanonical: true,
        evidenceCanonical: true,
        targetStem: "tēm-a",
        primaryTargetMeaning: "cause-something-to-fill-a-container",
        lexicalExtension: {
            meaning: "bake-something-in-a-small-oven",
            relation: "lexical-extension",
        },
        causeeKind: "nonspecific-nonhuman",
        formula: "#0-0+tla(tēm-a)0+0-0#",
        word: "tlatēma",
    });

    const option = ownerResult.payload.definition.derivations.temi.options.find(
        candidate => candidate.ruleId === "cn-l24-2431a-temi-tem-a"
    );
    s.eq("the exact signed Type 1 option carries the primary and additional Canvas readings", {
        sourceStem: option.sourceStem,
        sourceMeaning: option.sourceMeaning,
        targetMeaning: option.targetMeaning,
        additionalTargetReadings: option.additionalTargetReadings,
        targetStem: option.targetStem,
        targetClass: option.targetClass,
        route: option.derivationRoute,
        procedure: option.procedure,
        formationRuleTier: option.formationRuleTier,
        callerSuppliedTargetAllowed: option.callerSuppliedTargetAllowed,
        formulaAuthority: option.formulaArtifactAuthority,
        surfaceAuthority: option.surfaceArtifactAuthority,
    }, {
        sourceStem: "tēmi",
        sourceMeaning: "become-brimming-full",
        targetMeaning: "cause-something-to-fill-a-container",
        additionalTargetReadings: [{
            meaning: "put-something-somewhere",
            relation: "also",
        }, {
            meaning: "bake-something-in-a-small-oven",
            relation: "lexical-extension",
        }],
        targetStem: "tēm-a",
        targetClass: "B",
        route: "type-one-replacement-exact",
        procedure: "replace-final-i-with-causative-a",
        formationRuleTier: "productive-final-shape",
        callerSuppliedTargetAllowed: false,
        formulaAuthority: false,
        surfaceAuthority: false,
    });

    const request = {
        sourceStem: "tēmi",
        verbClass: "B",
        sourceValence: "intransitive",
        sourceSubject: "3sg",
        subject: "3sg",
        objectKind: "none",
        objectPerson: "",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "causative",
        sourceVoice: "impersonal",
        requestedVoice: "active",
    };
    const preview = ctx.evaluateClassicalNahuatlVncApplication(request);
    const typeOne = preview.controlFrame.derivationOptionInventory.options.find(
        candidate => candidate.ruleId === "cn-l24-2431a-temi-tem-a"
    );
    const applied = ctx.evaluateClassicalNahuatlVncApplication({
        ...request,
        derivationOptionId: typeOne?.optionId || "missing-temi-type-one-option",
    });
    const hostileGloss = ctx.evaluateClassicalNahuatlVncApplication({
        ...request,
        derivationOptionId: typeOne?.optionId || "missing-temi-type-one-option",
        sourceMeaning: "caller-supplied-meaning-must-not-authorize",
        targetMeaning: "caller-supplied-meaning-must-not-authorize",
        additionalTargetReadings: [{
            meaning: "caller-supplied-meaning-must-not-authorize",
            relation: "caller"
        }],
        resultMeaning: "caller-supplied-meaning-must-not-authorize",
    });

    s.eq("the read-only meaning neither selects nor changes normal Causative Grammar", {
        previewStatus: preview.authorizationStatus,
        previewReason: preview.blockReason,
        options: preview.controlFrame.derivationOptionInventory.options.map(
            candidate => candidate.targetStem
        ),
        selectedTarget: typeOne?.targetStem || "",
        selectedRoute: typeOne?.derivationRoute || "",
        selectedProcedure: typeOne?.procedure || "",
        selectedMeaning:
            applied.resultFrame?.derivationOperationFrame?.selectedOption
                ?.sourceMeaning || "",
        selectedTargetMeaning:
            applied.resultFrame?.derivationOperationFrame?.selectedOption
                ?.targetMeaning || "",
        selectedAdditionalTargetReadings:
            applied.resultFrame?.derivationOperationFrame?.selectedOption
                ?.additionalTargetReadings || [],
        appliedStatus: applied.authorizationStatus,
        formula: applied.resultFrame?.formulaRealization || "",
        surface: applied.resultFrame?.surfaceRealization || "",
        resultCanonical:
            ctx.isClassicalNahuatlVncApplicationResultFrame(
                applied.resultFrame
            ),
        hostileStatus: hostileGloss.authorizationStatus,
        hostileSelectedMeaning:
            hostileGloss.resultFrame?.derivationOperationFrame?.selectedOption
                ?.sourceMeaning || "",
        hostileSelectedTargetMeaning:
            hostileGloss.resultFrame?.derivationOperationFrame?.selectedOption
                ?.targetMeaning || "",
        hostileSelectedAdditionalTargetReadings:
            hostileGloss.resultFrame?.derivationOperationFrame?.selectedOption
                ?.additionalTargetReadings || [],
        hostileCallerTargetAllowed:
            hostileGloss.resultFrame?.derivationOperationFrame?.selectedOption
                ?.callerSuppliedTargetAllowed === true,
        hostileCallerAuthorityAccepted:
            hostileGloss.resultFrame?.callerSuppliedAuthorityAccepted === true,
        hostileResultCanonical:
            ctx.isClassicalNahuatlVncApplicationResultFrame(
                hostileGloss.resultFrame
            ),
        hostileFormula: hostileGloss.resultFrame?.formulaRealization || "",
        hostileSurface: hostileGloss.resultFrame?.surfaceRealization || "",
    }, {
        previewStatus: "blocked",
        previewReason: "classical-vnc-derivation-option-selection-required",
        options: ["tēm-a", "tēmī-tiā"],
        selectedTarget: "tēm-a",
        selectedRoute: "type-one-replacement-exact",
        selectedProcedure: "replace-final-i-with-causative-a",
        selectedMeaning: "become-brimming-full",
        selectedTargetMeaning: "cause-something-to-fill-a-container",
        selectedAdditionalTargetReadings: [{
            meaning: "put-something-somewhere",
            relation: "also",
        }, {
            meaning: "bake-something-in-a-small-oven",
            relation: "lexical-extension",
        }],
        appliedStatus: "authorized",
        formula: "#0-0+tla(tēm-a)0+0-0#",
        surface: "tlatēma",
        resultCanonical: true,
        hostileStatus: "authorized",
        hostileSelectedMeaning: "become-brimming-full",
        hostileSelectedTargetMeaning: "cause-something-to-fill-a-container",
        hostileSelectedAdditionalTargetReadings: [{
            meaning: "put-something-somewhere",
            relation: "also",
        }, {
            meaning: "bake-something-in-a-small-oven",
            relation: "lexical-extension",
        }],
        hostileCallerTargetAllowed: false,
        hostileCallerAuthorityAccepted: false,
        hostileResultCanonical: true,
        hostileFormula: "#0-0+tla(tēm-a)0+0-0#",
        hostileSurface: "tlatēma",
    });

    const copiedSource = JSON.parse(JSON.stringify(ownerSource));
    const copiedDerivationSource = JSON.parse(JSON.stringify(derivationSource));
    const copiedParticipantSource = JSON.parse(JSON.stringify(participantSource));
    const copiedTargetMeaningSource = JSON.parse(JSON.stringify(targetMeaningSource));
    const copiedAdditionalTargetReadingSource = JSON.parse(
        JSON.stringify(additionalTargetReadingSource)
    );
    const copiedLexicalExtensionSource = JSON.parse(
        JSON.stringify(lexicalExtensionSource)
    );
    s.eq("copied owner requests cannot mint any tēmi atom receipt", {
        meaningAuthentic: ownerResult.authorizationStatus,
        derivationAuthentic: derivationResult.authorizationStatus,
        participantAuthentic: participantResult.authorizationStatus,
        targetMeaningAuthentic: targetMeaningResult.authorizationStatus,
        additionalTargetReadingAuthentic:
            additionalTargetReadingResult.authorizationStatus,
        lexicalExtensionAuthentic:
            lexicalExtensionResult.authorizationStatus,
        meaningCopied:
            ctx.evaluateClassicalTypeOneFinalIReplacement(copiedSource)
                .authorizationStatus,
        derivationCopied:
            ctx.evaluateClassicalTypeOneFinalIReplacement(
                copiedDerivationSource
            ).authorizationStatus,
        participantCopied:
            ctx.evaluateClassicalTypeOneFinalIReplacement(
                copiedParticipantSource
            ).authorizationStatus,
        targetMeaningCopied:
            ctx.evaluateClassicalTypeOneFinalIReplacement(
                copiedTargetMeaningSource
            ).authorizationStatus,
        additionalTargetReadingCopied:
            ctx.evaluateClassicalTypeOneFinalIReplacement(
                copiedAdditionalTargetReadingSource
            ).authorizationStatus,
        lexicalExtensionCopied:
            ctx.evaluateClassicalTypeOneFinalIReplacement(
                copiedLexicalExtensionSource
            ).authorizationStatus,
    }, {
        meaningAuthentic: "authorized",
        derivationAuthentic: "authorized",
        participantAuthentic: "authorized",
        targetMeaningAuthentic: "authorized",
        additionalTargetReadingAuthentic: "authorized",
        lexicalExtensionAuthentic: "authorized",
        meaningCopied: "blocked",
        derivationCopied: "blocked",
        participantCopied: "blocked",
        targetMeaningCopied: "blocked",
        additionalTargetReadingCopied: "blocked",
        lexicalExtensionCopied: "blocked",
    });

    return s;
}

module.exports = { run };
