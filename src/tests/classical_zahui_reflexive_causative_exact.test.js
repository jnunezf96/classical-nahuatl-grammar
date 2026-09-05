"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_zahui_reflexive_causative_exact");
    const selection = "claim-p2290";
    const facet = "aci-p199-l005-83dbeadb1d-02-zahui-causative-reflexive-realization";
    const ownerSource = ctx.buildClassicalTypeOneFinalIReplacementSource({
        analysisDomain: "classical-type-one-final-i-replacement",
        selection,
        requestedFacet: facet,
        participantChoice: `${selection}:${facet}`,
    });
    const ownerResult = ctx.evaluateClassicalTypeOneFinalIReplacement(ownerSource);
    const validation = ownerResult.payload.definition;
    const exact = validation.participants.zahuiReflexive;
    const option = validation.derivations.zahui.options.find(
        candidate => candidate.ruleId === "cn-l24-2431a-zahui-zahua"
    );

    s.eq("ACI-P199-L005-83DBEADB1D-02 observes the canonical zahui reflexive causative Result", {
        operationStatus: exact.authorizationStatus,
        machineryStatus: exact.machineryAuthorizationStatus,
        finiteStatus: exact.finiteAuthorizationStatus,
        sourceStem: exact.sourceStem,
        targetStem: exact.targetStem,
        targetSubject: exact.targetSubject,
        causeeKind: exact.requestedCausativeObjectKind,
        causeePersonBinding: exact.causativeObjectPersonBinding,
        sourceSubjectBecomesCausee: exact.sourceSubjectBecomesCausativeObject,
        causee: exact.targetObjectRequests[0],
        formula: exact.formulaRealization,
        word: exact.wordRealization,
        formulaCopiedFromWord: exact.formulaDerivedFromWrittenProjection,
        wordCopiedFromFormula: exact.writtenDerivedFromFormulaProjection,
        callerAuthorityAccepted: exact.callerSuppliedAuthorityAccepted,
    }, {
        operationStatus: "authorized",
        machineryStatus: "authorized",
        finiteStatus: "authorized",
        sourceStem: "zahui",
        targetStem: "zahu-a",
        targetSubject: "3sg",
        causeeKind: "reflexive",
        causeePersonBinding: "target-subject-coordinate",
        sourceSubjectBecomesCausee: true,
        causee: {
            objectId: "causative-object",
            objectKind: "reflexive",
            objectPerson: "3sg",
            governor: "causative",
            derivationalLevel: 1,
        },
        formula: "#0-0+m-o(zahu-a)0+0-0#",
        word: "mozahua",
        formulaCopiedFromWord: false,
        wordCopiedFromFormula: false,
        callerAuthorityAccepted: false,
    });

    s.eq("the exact formation is generated and blocks the competing stock analysis", {
        ruleId: option.ruleId,
        sourceStem: option.sourceStem,
        targetStem: option.targetStem,
        route: option.derivationRoute,
        blocksCompetingAnalysis: option.blocksCompetingAnalysis,
        callerSuppliedTargetAllowed: option.callerSuppliedTargetAllowed,
    }, {
        ruleId: "cn-l24-2431a-zahui-zahua",
        sourceStem: "zahui",
        targetStem: "zahu-a",
        route: "type-one-final-i-replacement-exact-simple-source",
        blocksCompetingAnalysis: "destockal-i-hui",
        callerSuppliedTargetAllowed: false,
    });

    const request = {
        sourceStem: "zahui",
        verbClass: "B",
        sourceValence: "intransitive",
        sourceSubject: "3sg",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        requestedVoice: "active",
        requestedDerivation: "causative",
    };
    const preview = ctx.evaluateClassicalNahuatlVncApplication(request);
    const selectedOption = preview.controlFrame.derivationOptionInventory.options.find(
        candidate => candidate.ruleId === "cn-l24-2431a-zahui-zahua"
    );
    const pendingCausee = ctx.evaluateClassicalNahuatlVncApplication({
        ...request,
        derivationOptionId: selectedOption.optionId,
    });
    const reflexive = ctx.evaluateClassicalNahuatlVncApplication({
        ...request,
        derivationOptionId: selectedOption.optionId,
        causativeObjectKind: "reflexive",
    });
    const hostileGloss = ctx.evaluateClassicalNahuatlVncApplication({
        ...request,
        derivationOptionId: selectedOption.optionId,
        causativeObjectKind: "reflexive",
        sourceMeaning: "caller-supplied-meaning-must-not-authorize",
        resultMeaning: "caller-supplied-meaning-must-not-authorize",
    });

    s.eq("formation and causee Valence remain genuine sequential Grammar choices", {
        formationStatus: preview.authorizationStatus,
        formationReason: preview.blockReason,
        formationRequired: preview.controlFrame.derivationSelectorRequired,
        causeeStatus: pendingCausee.authorizationStatus,
        causeeReason: pendingCausee.blockReason,
        causeeRequired: pendingCausee.controlFrame.causativeObjectKindSelectionRequired,
        allowedCausees: pendingCausee.controlFrame.allowedCausativeObjectKinds,
        reflexiveStatus: reflexive.authorizationStatus,
        reflexiveFormula: reflexive.resultFrame.formulaRealization,
        reflexiveSurface: reflexive.resultFrame.surfaceRealization,
        hostileGlossStatus: hostileGloss.authorizationStatus,
        hostileGlossFormula: hostileGloss.resultFrame.formulaRealization,
        hostileGlossSurface: hostileGloss.resultFrame.surfaceRealization,
    }, {
        formationStatus: "blocked",
        formationReason: "classical-vnc-derivation-option-selection-required",
        formationRequired: true,
        causeeStatus: "blocked",
        causeeReason: "classical-vnc-causative-causee-valence-selection-required",
        causeeRequired: true,
        allowedCausees: ["specific-projective", "reflexive"],
        reflexiveStatus: "authorized",
        reflexiveFormula: "#0-0+m-o(zahu-a)0+0-0#",
        reflexiveSurface: "mozahua",
        hostileGlossStatus: "authorized",
        hostileGlossFormula: "#0-0+m-o(zahu-a)0+0-0#",
        hostileGlossSurface: "mozahua",
    });

    const ownerObservations = [
        {
            atomId: "ACI-P199-L005-83DBEADB1D-02",
            selection,
            facet,
            path: "participants.zahuiReflexive.formulaRealization",
            value: "#0-0+m-o(zahu-a)0+0-0#",
        },
        {
            atomId: "ACI-P199-L005-83DBEADB1D-03",
            selection,
            facet: "aci-p199-l005-83dbeadb1d-03-zahui-causative-reflexive-literal-structure",
            path: "participants.zahuiReflexive.targetObjectRequests.0.objectKind",
            value: "reflexive",
        },
        {
            atomId: "ACI-P199-L005-83DBEADB1D-05",
            selection,
            facet: "aci-p199-l005-83dbeadb1d-05-zahui-self-imposed-action-schema",
            path: "participants.zahuiReflexive.causativeObjectPersonBinding",
            value: "target-subject-coordinate",
        },
    ];
    for (const observation of ownerObservations) {
        const source = observation.facet === facet ? ownerSource
            : ctx.buildClassicalTypeOneFinalIReplacementSource({
                analysisDomain: "classical-type-one-final-i-replacement",
                selection: observation.selection,
                requestedFacet: observation.facet,
                participantChoice: `${observation.selection}:${observation.facet}`,
            });
        const result = observation.facet === facet ? ownerResult
            : ctx.evaluateClassicalTypeOneFinalIReplacement(source);
        const evidence = ctx.getClassicalTypeOneFinalIReplacementExecutionEvidence(result);
        s.eq(`${observation.atomId} has one direct owner-issued canonical observation`, {
            status: result.authorizationStatus,
            canonicalPath: result.payload.effectiveCanonicalPath,
            sourceCanonicalPath: result.payload.sourceCanonicalPath,
            facetValue: result.payload.facetValue,
            observationKind: result.payload.proofObservationKind,
            observationStatus: result.payload.proofObservationStatus,
            broadProxyRetired: result.payload.broadCompletionProxyRetired,
            resultCanonical: ctx.isClassicalTypeOneFinalIReplacementResult(result),
            evidenceCanonical: ctx.isClassicalTypeOneFinalIReplacementExecutionEvidence(
                evidence,
                result
            ),
        }, {
            status: "authorized",
            canonicalPath: observation.path,
            sourceCanonicalPath: observation.path,
            facetValue: observation.value,
            observationKind: "direct-canonical-result-observation",
            observationStatus: "direct",
            broadProxyRetired: false,
            resultCanonical: true,
            evidenceCanonical: true,
        });
    }

    const lexicalFacts = [
        {
            atomId: "ACI-P199-L005-83DBEADB1D",
            statement: "Intransitive stem (zahui) means ‘to abstain from food.’",
        },
        {
            atomId: "ACI-P199-L005-83DBEADB1D-04",
            statement: "Causative-reflexive stem m-o-(zahu-a) means ‘to fast.’",
        },
    ];
    for (const fact of lexicalFacts) {
        const projection = ctx.presentPreparedClassicalCanvasGrammarFactForPresentation(
            fact.atomId
        );
        s.eq(`${fact.atomId} is an exact read-only lexical presentation`, {
            status: projection.authorizationStatus,
            atomId: projection.atomId,
            owner: projection.semanticOwnerId,
            statement: projection.statement,
            projectRole: projection.projectRole,
            grammarAuthority: projection.grammarAuthority,
            generationAuthority: projection.generationAuthority,
            evidenceAuthorizesGrammar: projection.evidencePolicy.evidenceAuthorizesGrammar,
            evidenceAbsenceBlocksResult: projection.evidencePolicy.evidenceAbsenceBlocksResult,
            canonical: ctx.isPreparedClassicalCanvasGrammarFactProjectionForPresentation(
                projection
            ),
        }, {
            status: "authorized",
            atomId: fact.atomId,
            owner: "classical-type-one-final-i-replacement",
            statement: fact.statement,
            projectRole: "read-only-grammar-fact",
            grammarAuthority: false,
            generationAuthority: false,
            evidenceAuthorizesGrammar: false,
            evidenceAbsenceBlocksResult: false,
            canonical: true,
        });
    }
    const copiedOwnerResult = JSON.parse(JSON.stringify(ownerResult));
    const copiedPresentation =
        ctx.presentClassicalTypeOneFinalIReplacementGrammarFact(
            copiedOwnerResult,
            lexicalFacts[0].atomId
        );
    s.eq("a copied owner Result cannot present a lexical fact", {
        status: copiedPresentation.authorizationStatus,
        reason: copiedPresentation.blockReason,
        canonical: ctx.isClassicalTypeOneFinalIReplacementGrammarFactProjection(
            copiedPresentation
        ),
    }, {
        status: "blocked",
        reason: "owner-issued-authorized-result-required",
        canonical: false,
    });

    const frequencyFacet = "aci-p199-l005-83dbeadb1d-06-zahui-frequency-analysis";
    const frequencySource = ctx.buildClassicalTypeOneFinalIReplacementSource({
        analysisDomain: "classical-type-one-final-i-replacement",
        selection,
        requestedFacet: frequencyFacet,
        participantChoice: `${selection}:${frequencyFacet}`,
    });
    const frequencyResult = ctx.evaluateClassicalTypeOneFinalIReplacement(frequencySource);
    s.eq("ACI-P199-L005-83DBEADB1D-06 frequency analysis cannot authorize Grammar", {
        sourceCanonical: ctx.isClassicalTypeOneFinalIReplacementSource(frequencySource),
        status: frequencyResult.authorizationStatus,
        resultCanonical: ctx.isClassicalTypeOneFinalIReplacementResult(frequencyResult),
    }, {
        sourceCanonical: false,
        status: "blocked",
        resultCanonical: true,
    });

    const copiedSource = JSON.parse(JSON.stringify(ownerSource));
    s.eq("a copied owner request cannot mint atom authority", {
        authentic: ctx.evaluateClassicalTypeOneFinalIReplacement(ownerSource).authorizationStatus,
        copied: ctx.evaluateClassicalTypeOneFinalIReplacement(copiedSource).authorizationStatus,
    }, {
        authentic: "authorized",
        copied: "blocked",
    });

    return s;
}

module.exports = { run };
