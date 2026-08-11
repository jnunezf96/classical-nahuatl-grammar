"use strict";

const { createSuite } = require("./runner");

function observe(s, atomId, description, actual, expected) {
    s.eq(`${atomId} observes ${description}`, actual, expected);
    const hostile = JSON.parse(JSON.stringify(actual));
    hostile[Object.keys(hostile)[0]] = "BROKEN";
    s.no(`${atomId} rejects a mutation of ${description}`, JSON.stringify(hostile) === JSON.stringify(expected));
}

function run(ctx = {}) {
    const s = createSuite("classical_cross_family_singleton_exact");

    const frequentativeFacet = "p2652-nahuatl-has-special-derived-verbstems-that-signify-1-repetition";
    const frequentative = ctx.evaluateClassicalFrequentativeVerbstemDomain(
        ctx.buildClassicalFrequentativeVerbstemDomainSource({
            analysisDomain: "classical-frequentative-verbstem-domain",
            selection: "claim-p2652",
            requestedFacet: frequentativeFacet,
            participantChoice: `claim-p2652:${frequentativeFacet}`,
        }),
    );
    const frequentativeCase = frequentative.payload.definition.cases.ordinaryShortGlottal;
    observe(s, "ACI-P243-L003-BFF719FF1B-09", "a reduplicative prefix deriving a frequentative verbstem", {
        operation: frequentativeCase.operation,
        sourceStem: frequentativeCase.sourceStem,
        targetStem: frequentativeCase.targetStem,
        ruleFamily: frequentativeCase.ruleFamily,
    }, {
        operation: "frequentative",
        sourceStem: "chōca",
        targetStem: "choh-chōca",
        ruleFamily: "frequentative-prefix-shape",
    });

    const applicativeFacet = "p2605-the-last-added-applicative-object-pronoun-of-an-applicative";
    const applicative = ctx.evaluateClassicalApplicativeParticipantTransform(
        ctx.buildClassicalApplicativeParticipantTransformSource({
            analysisDomain: "classical-applicative-participant-transform",
            selection: "claim-p2605",
            requestedFacet: applicativeFacet,
            participantChoice: `claim-p2605:${applicativeFacet}`,
        }),
    );
    const applicativeCase = applicative.payload.definition.participants.singleSpecific;
    observe(s, "ACI-P235-L007-E0CDFF94E0-02", "the applicative importing a new object participant", {
        sourceObjectCount: applicativeCase.sourceObjectCount,
        targetObjectCount: applicativeCase.targetObjectCount,
        objectId: applicativeCase.addedObjectRequest.objectId,
        governor: applicativeCase.addedObjectRequest.governor,
        subjectPreserved: applicativeCase.sourceSubjectPreservedByApplicative,
    }, {
        sourceObjectCount: 0,
        targetObjectCount: 1,
        objectId: "applicative-object",
        governor: "applicative",
        subjectPreserved: true,
    });

    const auhFacet = "p4855-auh-has-a-somewhat-restricted-use-not-joining-as";
    const auh = ctx.evaluateClassicalClauseConjunctionAuhPlacement(
        ctx.buildClassicalClauseConjunctionAuhPlacementSource({
            analysisDomain: "classical-clause-conjunction-auh-placement",
            selection: "claim-p4855",
            requestedFacet: auhFacet,
            participantChoice: `claim-p4855:${auhFacet}`,
        }),
    );
    const auhFrame = auh.payload.definition.result.liveResult.relationFrame;
    observe(s, "ACI-P561-L038-897D40C2E2", "auh marking coordination between principal clauses", {
        marker: auhFrame.marker,
        syntacticRank: auhFrame.syntacticRank,
        coordinationType: auhFrame.coordinationType,
    }, {
        marker: "auh",
        syntacticRank: "principal-clause-group",
        coordinationType: "additive",
    });

    const modifierFacet = "p4880-again-they-function-as-adverbial-modifiers-not-as-conjunctors";
    const modifier = ctx.evaluateClassicalClauseConjunctionModifierNotConjunctor(
        ctx.buildClassicalClauseConjunctionModifierNotConjunctorSource({
            analysisDomain: "classical-clause-conjunction-modifier-not-conjunctor",
            selection: "claim-p4880",
            requestedFacet: modifierFacet,
            participantChoice: `claim-p4880:${modifierFacet}`,
        }),
    );
    const modifierFrame = modifier.payload.definition.result.liveResult.relationFrame;
    observe(s, "ACI-P562-L037-3BB856D629", "an adverbial modifier remaining distinct from a conjunctor", {
        modifierIsConjunctor: modifierFrame.modifierIsConjunctor,
        unmarkedAsyndeton: modifierFrame.unmarkedAsyndeton,
    }, {
        modifierIsConjunctor: false,
        unmarkedAsyndeton: true,
    });

    const interrogativeFacet = "p4667-when-the-modifier-is-an-inherently-interrogative-nnc";
    const interrogative = ctx.evaluateClassicalAdverbialAdjunctionInherentInterrogativeOrder(
        ctx.buildClassicalAdverbialAdjunctionInherentInterrogativeOrderSource({
            analysisDomain: "classical-adverbial-adjunction-inherent-interrogative-order",
            selection: "claim-p4667",
            requestedFacet: interrogativeFacet,
            participantChoice: `claim-p4667:${interrogativeFacet}`,
        }),
    );
    observe(s, "ACI-P536-L030-8832443803", "sentence-initial ordering preserving an inherently interrogative modifier", {
        retainsForce: interrogative.payload.definition.analysis.inherentlyInterrogativeModifierRetainsForce,
        order: interrogative.payload.definition.result.order,
    }, {
        retainsForce: true,
        order: "modifier-head",
    });

    const recursionFacet = "p4662-a-structure-of-adverbial-modification-can-be-recursive";
    const recursion = ctx.evaluateClassicalAdverbialAdjunctionRecursionSystem(
        ctx.buildClassicalAdverbialAdjunctionRecursionSystemSource({
            analysisDomain: "classical-adverbial-adjunction-recursion-system",
            selection: "claim-p4662",
            requestedFacet: recursionFacet,
            participantChoice: `claim-p4662:${recursionFacet}`,
        }),
    );
    observe(s, "ACI-P530-L007-353F74199F", "recursive adverbial adjunction producing a complex structure", {
        licensed: recursion.payload.definition.analysis.headOrModifierOrBothMayRecurse,
        structure: recursion.payload.definition.result.structure,
        recursion: recursion.payload.definition.result.recursion,
    }, {
        licensed: true,
        structure: "complex",
        recursion: "head",
    });

    return s;
}

module.exports = { run };
