"use strict";

const { createSuite } = require("./runner");

function execute(ctx, operationId, args) {
    return ctx.executeClassicalGrammarApplicationRequest({ operationId, args, languageId: "classical-nahuatl" }).canonicalResult;
}

function conjunctive(ctx, requestedAnalysisKind) {
    return execute(ctx, "concept.structure.conjunctive-governance.analyze", [
        ctx.buildConjunctiveGovernanceAnalysisSource({
            analysisDomain: "conjunctive-governance",
            requestedAnalysisKind,
        }),
    ]);
}

function evidence(ctx) {
    return execute(ctx, "concept:classification", [
        ctx.buildClassicalGrammarConceptSource({
            domain: "structure",
            selection: "english-spanish-conjunctive-governance-evidence",
        }),
    ]);
}

function exactFactAndMutation(result, fact) {
    const exact = result.authorizationStatus === "authorized" && result.facts.includes(fact);
    const mutation = { ...result, facts: result.facts.map(value => value === fact ? `broken-${value}` : value) };
    return exact && !mutation.facts.includes(fact);
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson1_conjunctive_governance_jobs");
    const equality = conjunctive(ctx, "equal-governance");
    const fillerClass = conjunctive(ctx, "conjunct-form-class");
    const comparison = evidence(ctx);

    s.ok(
        "ACI-P032-L019-124980D461 makes conjuncts equal rather than governor and subordinate",
        exactFactAndMutation(equality, "two-or-more-conjunct-function-units-interact-as-equals-with-none-governing-another"),
    );
    s.ok(
        "ACI-P032-L022-335D17DFDF separates valid conjunct fillers from the English-Spanish tendency",
        exactFactAndMutation(fillerClass, "conjunct-function-units-can-be-filled-by-items-of-the-same-form-class")
        && exactFactAndMutation(comparison, "English-and-Spanish-conjunct-fillers-are-usually-members-of-the-same-form-class"),
    );
    s.ok(
        "ACI-P032-L025-54D00BE93F keeps Lesson 52 as a reference rather than a grammar operation",
        exactFactAndMutation(comparison, "Lesson-52-documents-later-conjunction-discussion"),
    );

    const invalid = ctx.evaluateConjunctiveGovernanceAnalysis(
        ctx.buildConjunctiveGovernanceAnalysisSource({
            analysisDomain: "conjunctive-governance",
            requestedAnalysisKind: "English-form-class-authorizes-Nahuatl",
        }),
    );
    s.eq("comparative habits cannot become a Nahuatl conjunction rule", [
        invalid.authorizationStatus,
        invalid.blockReason,
    ], [
        "blocked",
        "conjunctive-governance-analysis-analysis-kind-required",
    ]);

    return s;
}

module.exports = { run };
