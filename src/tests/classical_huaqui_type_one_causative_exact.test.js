"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_huaqui_type_one_causative_exact");
    const selection = "claim-p2291";
    const facet = "aci-p199-l012-84fe322a8a-07-huaqui-final-i-and-consonant-replacement";
    const ownerSource = ctx.buildClassicalTypeOneFinalIReplacementSource({
        analysisDomain: "classical-type-one-final-i-replacement",
        selection,
        requestedFacet: facet,
        participantChoice: `${selection}:${facet}`,
    });
    const ownerResult = ctx.evaluateClassicalTypeOneFinalIReplacement(ownerSource);
    const ownerEvidence = ctx.getClassicalTypeOneFinalIReplacementExecutionEvidence(
        ownerResult
    );
    const participantFacet =
        "aci-p199-l012-84fe322a8a-05-huaqui-nonspecific-nonhuman-object";
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

    s.eq("ACI-P199-L012-84FE322A8A-07 has one direct owner-issued observation", {
        status: ownerResult.authorizationStatus,
        canonicalPath: ownerResult.payload.effectiveCanonicalPath,
        sourceCanonicalPath: ownerResult.payload.sourceCanonicalPath,
        facetValue: ownerResult.payload.facetValue,
        observationKind: ownerResult.payload.proofObservationKind,
        observationStatus: ownerResult.payload.proofObservationStatus,
        broadProxyRetired: ownerResult.payload.broadCompletionProxyRetired,
        resultCanonical: ctx.isClassicalTypeOneFinalIReplacementResult(ownerResult),
        evidenceCanonical: ctx.isClassicalTypeOneFinalIReplacementExecutionEvidence(
            ownerEvidence,
            ownerResult
        ),
    }, {
        status: "authorized",
        canonicalPath: "derivations.huaqui.options.0.procedure",
        sourceCanonicalPath: "derivations.huaqui.options.0.procedure",
        facetValue: "replace-final-qui-with-tz-plus-causative-a",
        observationKind: "direct-canonical-result-observation",
        observationStatus: "direct",
        broadProxyRetired: false,
        resultCanonical: true,
        evidenceCanonical: true,
    });

    const validation = ownerResult.payload.definition;
    const ownerOption = validation.derivations.huaqui.options.find(
        candidate => candidate.ruleId === "cn-l24-2431a-huaqui-huatza"
    );
    s.eq("the owner derives the Canvas Type 1 stem without a spelling toggle", {
        sourceStem: ownerOption.sourceStem,
        targetStem: ownerOption.targetStem,
        targetClass: ownerOption.targetClass,
        route: ownerOption.derivationRoute,
        procedure: ownerOption.procedure,
        callerSuppliedTargetAllowed: ownerOption.callerSuppliedTargetAllowed,
    }, {
        sourceStem: "huā-qui",
        targetStem: "huā-tz-a",
        targetClass: "B",
        route: "type-one-final-i-consonant-alternation-exact",
        procedure: "replace-final-qui-with-tz-plus-causative-a",
        callerSuppliedTargetAllowed: false,
    });

    const nonspecific = validation.participants.huaquiNonspecific;
    s.eq("the owner derives the Canvas tla participant from impersonal Source voice", {
        status: nonspecific.authorizationStatus,
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
        formula: "#0-0+tla(huā-tz-a)0+0-0#",
        word: "tlahuātza",
    });

    s.eq("ACI-P199-L012-84FE322A8A-05 has one direct owner-issued observation", {
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
    }, {
        status: "authorized",
        canonicalPath:
            "participants.huaquiNonspecific.implicitAgentObjectKind",
        sourceCanonicalPath:
            "participants.huaquiNonspecific.implicitAgentObjectKind",
        facetValue: "nonspecific-nonhuman",
        observationKind: "direct-canonical-result-observation",
        observationStatus: "direct",
        broadProxyRetired: false,
        resultCanonical: true,
        evidenceCanonical: true,
    });

    const request = {
        sourceStem: "huā-qui",
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
        candidate => candidate.ruleId === "cn-l24-2431a-huaqui-huatza"
    );
    const applied = ctx.evaluateClassicalNahuatlVncApplication({
        ...request,
        derivationOptionId: typeOne?.optionId || "missing-huaqui-type-one-option",
    });

    s.eq("normal Causative Grammar produces the exact tla huā-tz-a Result", {
        previewStatus: preview.authorizationStatus,
        previewReason: preview.blockReason,
        options: preview.controlFrame.derivationOptionInventory.options.map(
            option => option.targetStem
        ),
        selectedTarget: typeOne?.targetStem || "",
        selectedRoute: typeOne?.derivationRoute || "",
        selectedConstruction: typeOne?.targetConstruction || null,
        appliedStatus: applied.authorizationStatus,
        formula: applied.resultFrame?.formulaRealization || "",
        surface: applied.resultFrame?.surfaceRealization || "",
        resultCanonical: ctx.isClassicalNahuatlVncApplicationResultFrame(
            applied.resultFrame
        ),
    }, {
        previewStatus: "blocked",
        previewReason: "classical-vnc-derivation-option-selection-required",
        options: ["huā-tz-a", "huā-qui-l-tiā"],
        selectedTarget: "huā-tz-a",
        selectedRoute: "type-one-final-i-consonant-alternation-exact",
        selectedConstruction: {
            operation: "replace-final-and-consonant",
            remove: "qui",
            add: "tz-a",
        },
        appliedStatus: "authorized",
        formula: "#0-0+tla(huā-tz-a)0+0-0#",
        surface: "tlahuātza",
        resultCanonical: true,
    });

    const copiedSource = JSON.parse(JSON.stringify(ownerSource));
    const copiedParticipantSource = JSON.parse(JSON.stringify(participantSource));
    s.eq("copied owner requests cannot mint either huā-qui atom receipt", {
        formationAuthentic: ownerResult.authorizationStatus,
        participantAuthentic: participantResult.authorizationStatus,
        formationCopied:
            ctx.evaluateClassicalTypeOneFinalIReplacement(copiedSource)
                .authorizationStatus,
        participantCopied:
            ctx.evaluateClassicalTypeOneFinalIReplacement(
                copiedParticipantSource
            ).authorizationStatus,
    }, {
        formationAuthentic: "authorized",
        participantAuthentic: "authorized",
        formationCopied: "blocked",
        participantCopied: "blocked",
    });

    return s;
}

module.exports = { run };
