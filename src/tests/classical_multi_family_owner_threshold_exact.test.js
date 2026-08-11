"use strict";

const { createSuite } = require("./runner");

function executeOwner(ctx, prefix, domain, selection, facet) {
    const source = ctx[`build${prefix}Source`]({
        analysisDomain: domain,
        selection,
        requestedFacet: facet,
        participantChoice: `${selection}:${facet}`,
    });
    return ctx[`evaluate${prefix}`](source).payload.definition;
}

function observe(s, atomId, description, actual, expected) {
    s.eq(`${atomId} observes ${description}`, actual, expected);
    const hostile = JSON.parse(JSON.stringify(actual));
    hostile[Object.keys(hostile)[0]] = "BROKEN";
    s.no(`${atomId} rejects a mutation of ${description}`, JSON.stringify(hostile) === JSON.stringify(expected));
}

function run(ctx = {}) {
    const s = createSuite("classical_multi_family_owner_threshold_exact");

    const action = executeOwner(ctx, "ClassicalActionPossessorRoleContrast", "classical-action-possessor-role-contrast", "claim-p3670", "p3670-study-the-difference-between-the-members-of-the-following");
    const actionCase = action.cases.actionPossessorRoleContrast;
    observe(s, "ACI-P377-L007-0CD249D451", "the formal active-action versus passive-action contrast", {
        relation: actionCase.relation,
        activeVoice: actionCase.first.sourceVoice,
        passiveVoice: actionCase.second.sourceVoice,
        distinctOperations: actionCase.distinctOperationIds,
    }, {
        relation: "agent-possessor-versus-patient-possessor",
        activeVoice: "active",
        passiveVoice: "passive",
        distinctOperations: true,
    });

    const vocative = executeOwner(ctx, "ClassicalMaleVocativeParticleRealization", "classical-male-vocative-particle-realization", "claim-p1868", "p1868-the-vocative-nnc-used-by-a-male-speaker-is").vocativeMale;
    observe(s, "ACI-P162-L035-E71629218E", "the male vocative particle being appended to the NNC", {
        operation: vocative.operations[1],
        surface: vocative.surfaceRealization,
        speakerGender: vocative.speakerGender,
    }, {
        operation: "append-male-vocative-e",
        surface: "Pille!",
        speakerGender: "male",
    });

    const cah = executeOwner(ctx, "ClassicalCahPrincipalDeletion", "classical-cah-principal-deletion", "claim-p1863", "p1863-under-certain-conditions-a-vnc-that-serves-as-a").deletedCahPrincipal;
    observe(s, "ACI-P162-L007-870071A7AC", "cah-principal deletion licensing its proxy", {
        deletionKind: cah.deletionKind,
        deletedUnit: cah.deletedPrincipalClause.unitKind,
        deletedStem: cah.deletedPrincipalClause.sourceStem,
    }, {
        deletionKind: "cah-proxy",
        deletedUnit: "vnc",
        deletedStem: "ca-h",
    });

    const governance = executeOwner(ctx, "ClassicalCompoundEmbedMatrixGovernance", "classical-compound-embed-matrix-governance", "claim-p2724", "p2724-in-an-adjunctive-compound-the-constituent-stems-are-in").contract;
    observe(s, "ACI-P250-L029-4B8BFDD1A9-02", "the embed representing the adjunct before the matrix", {
        matrixAfterEmbed: governance.matrixAfterEmbed,
        operation: governance.operationOrder[3],
    }, {
        matrixAfterEmbed: true,
        operation: "embed-before-matrix-typed-predicate",
    });

    const affinity = executeOwner(ctx, "ClassicalCompoundNncAffinity", "classical-compound-nnc-affinity", "claim-p3121", "p3121-when-the-subject-pronoun-is-plural-an-absolutive-state").cases.affinity;
    observe(s, "ACI-P303-L004-C33256556E-02", "obligatory matrix affinity in the selected compound class", {
        reduplication: affinity.reduplication,
        target: affinity.reduplicationTarget,
        ruleApplied: affinity.rules["compound-nnc/affinity"],
        surface: affinity.wordSurface,
    }, {
        reduplication: "affinity",
        target: "both",
        ruleApplied: true,
        surface: "āācālcalli",
    });

    const connector = executeOwner(ctx, "ClassicalTlSubclassTwoTruncationSystem", "classical-tl-subclass-two-truncation-system", "claim-p1553", "p1553-subclass-2-of-tl-nounstems-has-three-subclasses");
    observe(s, "ACI-P130-L020-D09B501BC1", "the zero singular num1 connector in the selected subclass", {
        singularConnector: connector.connectorSelectionFrame.singularConnector,
        generalUseShape: connector.contractLeastCommonMultiple.classSubclassInventory[2].generalUseShape,
    }, {
        singularConnector: "",
        generalUseShape: "truncated",
    });

    const classD = executeOwner(ctx, "ClassicalLoClassDReducedLengthFormation", "classical-lo-class-d-reduced-length-formation", "claim-p2001", "p2001-the-formation-is-exceptional-in-that-the-stem-final").nonactive.loClassD;
    observe(s, "ACI-P176-L037-87A9A38CFD", "the reduced-long Class D source spelling before lo", {
        sourceStem: classD.sourceStem,
        verbClass: classD.verbClass,
        finalVowelLength: classD.options[0].finalVowelLength,
        suffix: classD.options[0].surfaceAllomorph,
    }, {
        sourceStem: "cua",
        verbClass: "D",
        finalVowelLength: "long",
        suffix: "lō",
    });

    const patientive = executeOwner(ctx, "ClassicalDenominalVncPatientiveChainTiA", "classical-denominal-vnc-patientive-chain-ti-a", "claim-p5077", "p5077-note-2-a-few-exceptional-causative-stems-presuppose-an").result;
    observe(s, "ACI-P595-L034-C075166E31-02", "the intermediate patientive ch in the ti-a causative chain", {
        operation: patientive.operationId,
        targetStem: patientive.targetStem,
        targetClass: patientive.targetClass,
    }, {
        operation: "patientive-chain-ti-a",
        targetStem: "il-ō-ch-ti-ā",
        targetClass: "C",
    });

    const reciprocal = executeOwner(ctx, "ClassicalReciprocativePossessorFormation", "classical-reciprocative-possessor-formation", "claim-p1398", "p1398-the-reciprocative-possessor-morph-ne-one-another-s-each");
    observe(s, "ACI-P122-L004-79CE340A6C", "ne as a third-person-only reciprocative possessor", {
        morph: reciprocal.contractPossessorStateShapeInventory[0].st,
        role: reciprocal.stateFrame.possessorRole,
        conditioning: reciprocal.contractPossessorStateShapeInventory[0].conditioning,
    }, {
        morph: "ne",
        role: "reciprocal",
        conditioning: "third-person-subject-only",
    });

    const concession = executeOwner(ctx, "ClassicalAdverbialAdjunctionConcessionIntensifier", "classical-adverbial-adjunction-concession-intensifier", "claim-p4765", "p4765-the-collocation-is-made-more-intense-by-adding-the");
    observe(s, "ACI-P549-L041-9A11CAF243", "the concessive intensifier license", {
        pronounIntensifies: concession.analysis.concessionMayTakeIntensivePronoun,
    }, {
        pronounIntensifies: true,
    });

    const preteritHonorific = executeOwner(ctx, "ClassicalAttitudeHonorificPreteritEmbed", "classical-attitude-honorific-preterit-embed", "claim-p3232", "p3232-vncs-with-a-mainline-reflexive-object-pronoun-create-their").cases.honorificPreteritEmbed;
    observe(s, "ACI-P318-L002-3717CEFDF0-03", "the preterit-embed honorific replacement", {
        variant: preteritHonorific.variant,
        targetStem: preteritHonorific.targetStem,
        formula: preteritHonorific.formulaRealization,
    }, {
        variant: "preterit-embed",
        targetStem: "xīn-⎕-tzin-o-ā",
        formula: "#0-0+m-o(xīn-⎕-tzin-o-a)0+0-0#",
    });

    const sex = executeOwner(ctx, "ClassicalCompoundNncSex", "classical-compound-nnc-sex", "claim-p3117", "p3117-a-matrix-nounstem-signifying-an-animate-entity-can-incorporate").cases.sex;
    observe(s, "ACI-P301-L034-D54D7A1D11-02", "sex specification through a compound nounstem", {
        embedRole: sex.embedRole,
        stem: sex.compoundStem,
        ruleApplied: sex.rules["compound-nnc/sex"],
    }, {
        embedRole: "sex",
        stem: "cihuā-cal",
        ruleApplied: true,
    });

    const continuation = executeOwner(ctx, "ClassicalContinuationPreteritAgentiveVnc", "classical-continuation-preterit-agentive-vnc", "claim-p3476", "p3476-the-use-of-a-preterit-agentive-nounstem-as-an").cases.preteritVncContinuation;
    observe(s, "ACI-P350-L025-0696726FB9-06", "preterit-agentive continuation as an adverbial compound", {
        relation: continuation.continuationRelation,
        target: continuation.targetStems.generalUse,
        operation: continuation.operationId,
    }, {
        relation: "adverb",
        target: "mic-ca-chōca",
        operation: "verbal-continuation:adverb",
    });

    const customary = executeOwner(ctx, "ClassicalCustomaryAgentiveTwoDegrees", "classical-customary-agentive-two-degrees", "claim-p3502", "p3502-the-second-most-frequent-type-of-agentive-nnc-results").cases.customaryTwoDegrees;
    observe(s, "ACI-P354-L007-D95BA09915-02", "the fully nominal second degree of customary agentive formation", {
        relation: customary.relation,
        firstOperation: customary.first.operationId,
        secondOperation: customary.second.operationId,
        secondClass: customary.second.nounClass,
    }, {
        relation: "reanalysis-versus-full-nominalization",
        firstOperation: "predicate-nominalization:customary-agentive-reanalysis",
        secondOperation: "predicate-nominalization:customary-agentive-full",
        secondClass: "tl",
    });

    const intransitiveOa = executeOwner(ctx, "ClassicalDenominalVncOaIntransitiveStatus", "classical-denominal-vnc-oa-intransitive-status", "claim-p5116", "p5116-the-one-treated-in-this-section-is-surprisingly-intransitive").result;
    observe(s, "ACI-P601-L024-78EAC70E92-02", "the noncausative intransitive o-a derivation", {
        operation: intransitiveOa.operationId,
        targetStem: intransitiveOa.targetStem,
        objectCount: intransitiveOa.objectCount,
    }, {
        operation: "intransitive-o-a-use",
        targetStem: "āyacach-o-ā",
        objectCount: 0,
    });

    const attitudeRestriction = executeOwner(ctx, "ClassicalNncToVncAttitudeRestriction", "classical-nnc-to-vnc-attitude-restriction", "claim-p3154", "p3154-the-affective-matrix-nounsterns-tzin-tli-and-po-l").blockedCases.freeTzinDenominal;
    observe(s, "ACI-P307-L015-2F2FCC135F-03", "the honorific-matrix restriction on free tzin denominal use", {
        authorization: attitudeRestriction.authorizationStatus,
        reason: attitudeRestriction.blockReason,
    }, {
        authorization: "blocked",
        reason: "tzin-denominal-vnc-is-restricted-to-honorific-matrix-operation",
    });

    const supplement = executeOwner(ctx, "ClassicalIncorporatedAdverbSupplement", "classical-incorporated-adverb-supplement", "claim-p3018", "p3018-the-incorporated-adverb-vncs-of-30-6-30-13").cases.supplementSubject;
    observe(s, "ACI-P285-L018-BBDDAC96DF-02", "the explicit possessor-to-subject supplement transformation", {
        route: supplement.route,
        restriction: supplement.restrictions[0],
        ruleApplied: supplement.rules["incorporated-adverb/supplement-subject"],
    }, {
        route: "supplement-subject",
        restriction: "possessor-case:possessive-to-nominative",
        ruleApplied: true,
    });

    const proxy = executeOwner(ctx, "ClassicalClauseConjunctionProxyPrincipal", "classical-clause-conjunction-proxy-principal", "claim-p4870", "p4870-in-the-following-examples-the-head-modified-by-ihua").result.liveResult.relationFrame;
    observe(s, "ACI-P563-L031-B690488DBE-02", "ihuan as a rightward adverbial modifier rather than a conjunctor", {
        modifier: proxy.rightwardModifierSurface,
        modifierIsConjunctor: proxy.modifierIsConjunctor,
        rank: proxy.syntacticRank,
    }, {
        modifier: "īhuān",
        modifierIsConjunctor: false,
        rank: "principal-clause-group",
    });

    const interrogativeAdjunction = executeOwner(ctx, "ClassicalAdjectivalInterrogativeAdjoinedUnit", "classical-adjectival-interrogative-adjoined-unit", "claim-p4104", "p4104-both-the-structure-of-supplementation-and-the-structure-of").cases.interrogativeHead;
    observe(s, "ACI-P440-L034-11CFC6DF33", "in marking the boundary of an adjoined modifier", {
        adjunctor: interrogativeAdjunction.adjunctor,
        modifierRank: interrogativeAdjunction.modifierRank,
        headRank: interrogativeAdjunction.headRank,
    }, {
        adjunctor: "in",
        modifierRank: "adjoined",
        headRank: "principal",
    });

    const resemblance = executeOwner(ctx, "ClassicalClauseComparisonResemblanceVerbstemNnc", "classical-clause-comparison-resemblance-verbstem-nnc", "claim-p4919", "p4919-an-nnc-built-on-a-verbstem-meaning-to-resemble").result.liveResult;
    observe(s, "ACI-P575-L036-45FD89B9C7", "similarity through a resemblance-verbstem NNC", {
        route: resemblance.routeId,
        operation: resemblance.operation,
        principalFormation: resemblance.operationFrame.sourceSlots.principal.lexicalFormation,
    }, {
        route: "similarity-resemblance-verbstem-nnc",
        operation: "compose-resemblance-verbstem-nnc",
        principalFormation: "verbstem-resemblance-predicate-nnc",
    });

    return s;
}

module.exports = { run };
