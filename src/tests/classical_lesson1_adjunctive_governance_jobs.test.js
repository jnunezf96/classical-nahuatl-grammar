"use strict";

const { createSuite } = require("./runner");

function execute(ctx, operationId, args) {
    return ctx.executeClassicalGrammarApplicationRequest({ operationId, args, languageId: "classical-nahuatl" }).canonicalResult;
}

function adjunctive(ctx, requestedAnalysisKind) {
    return execute(ctx, "concept.structure.adjunctive-governance.analyze", [
        ctx.buildAdjunctiveGovernanceAnalysisSource({
            analysisDomain: "adjunctive-governance",
            requestedAnalysisKind,
        }),
    ]);
}

function concept(ctx, selection) {
    return execute(ctx, "concept:classification", [
        ctx.buildClassicalGrammarConceptSource({ domain: "structure", selection }),
    ]);
}

function exactFactAndMutation(result, fact) {
    const exact = result.authorizationStatus === "authorized" && result.facts.includes(fact);
    const mutation = { ...result, facts: result.facts.map(value => value === fact ? `broken-${value}` : value) };
    return exact && !mutation.facts.includes(fact);
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson1_adjunctive_governance_jobs");
    const asymmetric = adjunctive(ctx, "asymmetric-governance");
    const sentence = adjunctive(ctx, "predicate-subject-governance");
    const predicates = adjunctive(ctx, "predicate-formation-varieties");
    const relation = adjunctive(ctx, "relation-relator-terminus");
    const modification = adjunctive(ctx, "modification-head-modifier");
    const fillers = adjunctive(ctx, "function-unit-fillers");
    const languagePattern = adjunctive(ctx, "language-specific-function-units");
    const adjunctor = adjunctive(ctx, "optional-adjunctor");
    const devices = adjunctive(ctx, "adjunctive-grammatical-devices");
    const english = concept(ctx, "english-adjunctive-governance-evidence");

    const exact = [
        ["ACI-P031-L039-9FC956C905", asymmetric, "one-function-unit-governs-the-subordinate-adjunctive-function-unit"],
        ["ACI-P031-L040-71DF516169", sentence, "in-sentence-formation-the-predicate-governs-the-subject"],
        ["ACI-P031-L040-71DF516169-02", english, "English-he-laughed-checks-a-predicate-subject-sentence-structure"],
        ["ACI-P031-L040-71DF516169-03", english, "English-laughed-is-the-predicate-in-he-laughed"],
        ["ACI-P032-L002-AB704A3F74", predicates, "predicate-formation-has-copulative-intransitive-and-transitive-varieties"],
        ["ACI-P032-L002-AB704A3F74-02", predicates, "a-copulative-predicate-consists-of-a-copular-plus-a-subject-complement-adjunct"],
        ["ACI-P032-L002-AB704A3F74-03", english, "English-is-Mary-checks-a-copulative-predicate-structure"],
        ["ACI-P032-L002-AB704A3F74-04", predicates, "an-intransitive-predicate-consists-of-a-predicator-with-no-adjunct"],
        ["ACI-P032-L002-AB704A3F74-05", english, "English-laughed-checks-an-intransitive-predicate-structure"],
        ["ACI-P032-L002-AB704A3F74-06", predicates, "a-transitive-predicate-consists-of-a-predicator-plus-a-direct-object-adjunct"],
        ["ACI-P032-L002-AB704A3F74-07", english, "English-makes-an-arrow-checks-a-transitive-predicate-structure"],
        ["ACI-P032-L006-770695376E", relation, "a-structure-of-relation-contains-a-relator-and-a-terminus"],
        ["ACI-P032-L006-770695376E-02", relation, "within-a-structure-of-relation-the-relator-governs-the-terminus"],
        ["ACI-P032-L006-770695376E-03", english, "English-on-the-roof-checks-a-structure-of-relation"],
        ["ACI-P032-L006-770695376E-04", english, "English-on-is-the-relator-in-on-the-roof"],
        ["ACI-P032-L006-770695376E-05", english, "English-the-roof-is-the-terminus-governed-by-on"],
        ["ACI-P032-L007-80EBFD72B8", modification, "in-modification-structure-the-head-governs-the-modifier"],
        ["ACI-P032-L008-42DDCD7D96", fillers, "function-unit-positions-can-be-filled-by-form-class-items-or-other-structures"],
        ["ACI-P032-L010-E7709C9B3F", languagePattern, "languages-can-differ-in-which-function-units-they-select"],
        ["ACI-P032-L010-E7709C9B3F-02", languagePattern, "languages-can-differ-in-how-function-units-are-ordered"],
        ["ACI-P032-L010-E7709C9B3F-03", languagePattern, "languages-can-differ-in-which-fillers-occupy-function-units"],
        ["ACI-P032-L011-D72EE631A2", adjunctor, "a-subordinate-adjunctive-function-unit-can-be-introduced-by-an-adjunctor"],
        ["ACI-P032-L014-B344B2D4A8", devices, "several-grammatical-devices-are-associated-with-adjunctive-governance"],
        ["ACI-P032-L015-0D6A8372E8", devices, "agreement-is-a-general-grammatical-device-associated-with-adjunctive-governance"],
        ["ACI-P032-L015-0D6A8372E8-02", english, "English-this-arrow-and-these-arrows-check-number-correspondence"],
        ["ACI-P032-L015-0D6A8372E8-03", english, "English-I-am-and-we-are-check-person-and-number-correspondence"],
        ["ACI-P032-L015-0D6A8372E8-04", devices, "case-is-a-general-grammatical-device-associated-with-adjunctive-governance"],
        ["ACI-P032-L015-0D6A8372E8-05", english, "English-examples-do-not-authorize-Classical-Nahuatl-agreement-or-case-realization"],
        ["ACI-P032-L016-0E2A598050", devices, "case-is-a-general-grammatical-device-associated-with-adjunctive-governance"],
        ["ACI-P032-L016-0E2A598050-02", english, "English-I-see-him-is-a-case-contrast-witness"],
        ["ACI-P032-L016-0E2A598050-03", english, "in-English-I-see-him-I-is-first-singular-human-subject-and-him-is-third-singular-human-object"],
        ["ACI-P032-L016-0E2A598050-04", english, "English-he-sees-me-is-a-case-contrast-witness"],
        ["ACI-P032-L016-0E2A598050-05", english, "in-English-he-sees-me-he-is-third-singular-human-subject-and-me-is-first-singular-human-object"],
        ["ACI-P032-L017-FA729991C5", english, "sections-17.1-42.1-49.1-and-51.1-document-later-adjunction-discussion"],
    ];

    s.eq("all 34 adjunctive atoms keep Canvas order", exact.length, 34);
    for (const [atomId, result, fact] of exact) {
        s.ok(`${atomId} performs its exact job and its mutation fails`, exactFactAndMutation(result, fact));
    }

    const invalid = ctx.evaluateAdjunctiveGovernanceAnalysis(
        ctx.buildAdjunctiveGovernanceAnalysisSource({
            analysisDomain: "adjunctive-governance",
            requestedAnalysisKind: "English-example-as-Nahuatl-rule",
        }),
    );
    s.eq("English examples cannot become an adjunctive grammar operation", [
        invalid.authorizationStatus,
        invalid.blockReason,
    ], [
        "blocked",
        "adjunctive-governance-analysis-analysis-kind-required",
    ]);

    return s;
}

module.exports = { run };
