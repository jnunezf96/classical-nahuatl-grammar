"use strict";

const { createSuite } = require("./runner");

function execute(ctx, operationId, args) {
    return ctx.executeClassicalGrammarApplicationRequest({
        operationId,
        args,
        languageId: "classical-nahuatl",
    }).canonicalResult;
}

function analyze(ctx, operationId, builderName, analysisDomain, requestedAnalysisKind) {
    return execute(ctx, operationId, [
        ctx[builderName]({ analysisDomain, requestedAnalysisKind }),
    ]);
}

function concept(ctx, domain, selection) {
    return execute(ctx, "concept:classification", [
        ctx.buildClassicalGrammarConceptSource({ domain, selection }),
    ]);
}

function composition(ctx) {
    const element = concept(ctx, "linguistic-element", "element");
    return execute(ctx, "classical.linguistic.unit.compose", [
        ctx.buildClassicalLinguisticUnitCompositionSource({
            medium: "speech",
            sequenceOrder: "temporal",
            structurePattern: "patterned-whole",
            constituents: [element, element],
        }),
    ]);
}

function exactFactAndMutation(result, fact) {
    const exact = result.authorizationStatus === "authorized" && result.facts.includes(fact);
    const mutation = { ...result, facts: result.facts.map(value => value === fact ? `broken-${value}` : value) };
    return exact && !mutation.facts.includes(fact);
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson1_governance_taxonomy_jobs");
    const interaction = analyze(
        ctx,
        "concept.structure.principles.analyze",
        "buildLinguisticStructurePrinciplesAnalysisSource",
        "linguistic-structure-principles",
        "interaction-justification",
    );
    const types = analyze(
        ctx,
        "concept.structure.governance-taxonomy.analyze",
        "buildGovernanceTypeTaxonomySource",
        "linguistic-governance-taxonomy",
        "general-governance-types",
    );
    const subtypes = analyze(
        ctx,
        "concept.structure.governance-taxonomy.analyze",
        "buildGovernanceTypeTaxonomySource",
        "linguistic-governance-taxonomy",
        "function-unit-subtypes",
    );
    const structuredResult = composition(ctx);

    s.ok(
        "ACI-P031-L032-D462261F8C requires interaction behind an actually composed unity",
        exactFactAndMutation(interaction, "interaction-and-interassociation-justify-mere-linear-succession")
        && structuredResult.authorizationStatus === "authorized"
        && structuredResult.resultUnitCount === 1,
    );
    s.ok(
        "ACI-P031-L034-2F173D09B7 keeps adjunctive and conjunctive governance as the two general types",
        exactFactAndMutation(types, "governance-establishes-exactly-adjunctive-and-conjunctive-general-types"),
    );
    s.ok(
        "ACI-P031-L036-0670EA8C38 derives governance subtypes from the coupled function units",
        exactFactAndMutation(subtypes, "specific-governance-subtypes-are-determined-by-coupling-distinctive-function-units"),
    );
    s.eq("the three normal routes keep their jobs separate", {
        interaction: [interaction.classification, interaction.analysisKind],
        types: [types.classification, types.analysisKind],
        subtypes: [subtypes.classification, subtypes.analysisKind],
    }, {
        interaction: ["interaction-justifies-concatenated-unity", "interaction-justification"],
        types: ["adjunctive-and-conjunctive-governance-types", "general-governance-types"],
        subtypes: ["function-unit-coupled-governance-subtypes", "function-unit-subtypes"],
    });

    return s;
}

module.exports = { run };
