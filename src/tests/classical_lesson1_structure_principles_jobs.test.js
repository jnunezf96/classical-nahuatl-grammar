"use strict";

const { createSuite } = require("./runner");

function execute(ctx, operationId, args) {
    return ctx.executeClassicalGrammarApplicationRequest({
        operationId,
        args,
        languageId: "classical-nahuatl",
    }).canonicalResult;
}

function concept(ctx, domain, selection) {
    return execute(ctx, "concept:classification", [
        ctx.buildClassicalGrammarConceptSource({ domain, selection }),
    ]);
}

function principles(ctx, requestedAnalysisKind) {
    return execute(ctx, "concept.structure.principles.analyze", [
        ctx.buildLinguisticStructurePrinciplesAnalysisSource({
            analysisDomain: "linguistic-structure-principles",
            requestedAnalysisKind,
        }),
    ]);
}

function composition(ctx) {
    const element = concept(ctx, "linguistic-element", "element");
    const source = ctx.buildClassicalLinguisticUnitCompositionSource({
        medium: "speech",
        sequenceOrder: "temporal",
        structurePattern: "patterned-whole",
        constituents: [element, element],
    });
    return { element, result: execute(ctx, "classical.linguistic.unit.compose", [source]) };
}

function includesFact(result, fact) {
    return Boolean(result && result.authorizationStatus === "authorized" && result.facts.includes(fact));
}

function exactFactAndMutation(result, fact) {
    const mutation = {
        ...result,
        facts: result.facts.map(value => value === fact ? `broken-${value}` : value),
    };
    return includesFact(result, fact) && !includesFact(mutation, fact);
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson1_structure_principles_jobs");
    const facets = principles(ctx, "static-dynamic-facets");
    const cooperation = principles(ctx, "cooperative-principles");
    const additive = principles(ctx, "concatenation-additive");
    const closure = principles(ctx, "concatenation-unit-closure");
    const composed = composition(ctx);
    const english = concept(ctx, "structure", "english-concatenation-evidence");

    const exact = [
        ["ACI-P031-L018-805D8A996A", facets, "morphological-morphosyntactical-and-syntactical-structures-share-static-and-dynamic-facets"],
        ["ACI-P031-L018-805D8A996A-02", facets, "static-structure-is-a-complex-unit-composed-from-less-complex-or-lower-ranked-units"],
        ["ACI-P031-L018-805D8A996A-03", facets, "dynamic-structure-is-a-complex-unit-resulting-from-interaction-and-interrelation-of-parts"],
        ["ACI-P031-L021-F146630E6E", cooperation, "linguistic-structure-requires-cooperation-of-concatenation-and-interaction"],
        ["ACI-P031-L026-3E260F7B01", english, "English-syntax-is-used-only-to-illustrate-concatenation"],
        ["ACI-P031-L027-D6810B1325", english, "English-noun-plus-noun-forms-a-nominal-group-as-in-town-house"],
        ["ACI-P031-L028-8889801E87", english, "English-adjective-plus-nominal-group-forms-a-nominal-group-as-in-new-town-house"],
        ["ACI-P031-L029-7A0947340E", english, "English-my-plus-new-town-house-forms-the-nominal-group-my-new-town-house"],
        ["ACI-P031-L030-7E3D3D542F", english, "English-of-is-the-preposition-in-the-cited-concatenation-example"],
        ["ACI-P031-L030-7E3D3D542F-02", english, "English-my-new-town-house-is-the-nominal-group-in-the-cited-example"],
        ["ACI-P031-L030-7E3D3D542F-03", english, "English-preposition-plus-nominal-group-forms-a-prepositional-group"],
        ["ACI-P031-L030-7E3D3D542F-04", english, "English-of-my-new-town-house-is-the-resulting-prepositional-group"],
        ["ACI-P031-L030-7E3D3D542F-05", english, "English-concatenation-terminology-does-not-authorize-Classical-Nahuatl-constituent-order"],
    ];

    s.eq("thirteen single-fact atoms keep Canvas order", exact.length, 13);
    for (const [atomId, result, fact] of exact) {
        s.ok(`${atomId} performs its exact job and its fact mutation fails`, exactFactAndMutation(result, fact));
    }

    s.ok(
        "ACI-P031-L024-D4D08940CA makes additive concatenation do real composition work",
        includesFact(additive, "concatenation-meaningfully-combines-two-or-more-constituents-additively")
        && includesFact(composed.result, "constituents-entered-combination-as-units")
        && composed.result.resultUnitCount === 1,
    );
    s.ok(
        "ACI-P031-L026-388B1CEA5B keeps one-plus-one-equals-one as an observed Result",
        includesFact(closure, "concatenation-retains-the-one-plus-one-equals-one-structural-principle")
        && composed.result.constituentCount === 2
        && composed.result.resultUnitCount === 1,
    );

    const copiedElement = Object.freeze({ ...composed.element });
    const brokenSource = ctx.buildClassicalLinguisticUnitCompositionSource({
        medium: "speech",
        sequenceOrder: "temporal",
        structurePattern: "patterned-whole",
        constituents: [copiedElement, composed.element],
    });
    const brokenComposition = ctx.evaluateClassicalLinguisticUnitComposition(brokenSource);
    s.eq("copied constituent structure cannot fake concatenation", [
        brokenComposition.authorizationStatus,
        brokenComposition.blockReason,
    ], [
        "blocked",
        "owner-issued-basic-linear-element-unit-required",
    ]);

    return s;
}

module.exports = { run };
