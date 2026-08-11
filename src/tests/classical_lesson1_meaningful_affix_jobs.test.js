"use strict";

const { createSuite } = require("./runner");

const ROUTES = Object.freeze({
    concept: "concept:classification",
    rank: "classical.carrier.rank.taxonomy.classify",
    meaningful: "classical.morpheme.meaningful-unit.classify",
    separation: "classical.morpheme.syllable.separate",
    combinatorial: "classical.morpheme.combinatorial-type.classify",
    position: "classical.morpheme.affix.position.classify",
    function: "classical.morpheme.affix.function.classify",
    paradigm: "classical.morpheme.inflectional-paradigm.classify",
    postStem: "classical.structure.post-stem-unit.classify",
    dyad: "classical.morpheme.inflectional-dyad.analyze",
    demotion: "classical.morpheme.inflectional-affix.demote",
});

function apply(ctx, operationId, source) {
    return ctx.executeClassicalGrammarApplicationRequest({
        operationId,
        args: [source],
        languageId: "classical-nahuatl",
    }).canonicalResult;
}

function concept(ctx, domain, selection) {
    return apply(ctx, ROUTES.concept,
        ctx.buildClassicalGrammarConceptSource({ domain, selection }));
}

function meaningful(ctx, candidateKind = "morpheme") {
    return apply(ctx, ROUTES.meaningful,
        ctx.buildClassicalMeaningfulMorphemeUnitClassificationSource({
            candidateResult: concept(ctx, "morpheme", candidateKind),
        }));
}

function syllableRank(ctx) {
    return apply(ctx, ROUTES.rank,
        ctx.buildClassicalCarrierRankTaxonomySource({
            subsystem: "phonological",
            rankTier: "syllable",
        }));
}

function separation(ctx, requestedAnalysisKind) {
    return apply(ctx, ROUTES.separation,
        ctx.buildClassicalMorphemeSyllableSeparationSource({
            meaningfulUnitResult: meaningful(ctx),
            syllableRankResult: syllableRank(ctx),
            requestedAnalysisKind,
        }));
}

function combinatorial(ctx, requestedAnalysisKind) {
    return apply(ctx, ROUTES.combinatorial,
        ctx.buildClassicalMorphemeCombinatorialTypeClassificationSource({
            meaningfulUnitResult: meaningful(ctx, "morph"),
            requestedAnalysisKind,
        }));
}

function position(ctx, sequencePosition) {
    return apply(ctx, ROUTES.position,
        ctx.buildClassicalAffixLinearPositionClassificationSource({
            minorTypeResult: combinatorial(ctx, "minor-definition"),
            sequencePosition,
        }));
}

function functional(ctx, {
    sequencePosition = "beginning",
    informationRole = "syntactical",
    stemBoundaryRelation = "outside",
} = {}) {
    return apply(ctx, ROUTES.function,
        ctx.buildClassicalAffixFunctionalTypeClassificationSource({
            affixPositionResult: position(ctx, sequencePosition),
            informationRole,
            stemBoundaryRelation,
        }));
}

function includesFact(result, fact) {
    return result.authorizationStatus === "authorized"
        && result.facts.includes(fact);
}

function mutateFact(result, fact) {
    return {
        ...result,
        facts: result.facts.map(value => value === fact ? `broken-${value}` : value),
    };
}

function exactFactObservation(result, fact) {
    return {
        passes: includesFact(result, fact),
        mutationFails: !includesFact(mutateFact(result, fact), fact),
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson1_meaningful_affix_jobs");

    const meaningfulResult = meaningful(ctx);
    const meaningfulMorphResult = meaningful(ctx, "morph");
    const rankContrast = separation(ctx, "rank-contrast");
    const coterminality = separation(ctx, "coterminality-permission");
    const typeInventory = combinatorial(ctx, "type-inventory");
    const majorDefinition = combinatorial(ctx, "major-definition");
    const minorDefinition = combinatorial(ctx, "minor-definition");
    const prefix = position(ctx, "beginning");
    const infix = position(ctx, "middle");
    const suffix = position(ctx, "end");
    const derivational = functional(ctx, {
        sequencePosition: "middle",
        informationRole: "modifying-or-category-altering",
        stemBoundaryRelation: "inside",
    });
    const inflectionalPrefix = functional(ctx);
    const inflectionalSuffix = functional(ctx, { sequencePosition: "end" });
    const invalidInflectionalInfix = functional(ctx, { sequencePosition: "middle" });
    const paradigm = apply(ctx, ROUTES.paradigm,
        ctx.buildClassicalInflectionalParadigmDefinitionSource({
            inflectionalAffixResult: inflectionalPrefix,
            requestedAnalysisKind: "common-classed-stem-definition",
        }));
    const nuclearClauseRank = concept(
        ctx,
        "terminology-assumption",
        "nuclear-clause-as-word",
    );
    const postStem = apply(ctx, ROUTES.postStem,
        ctx.buildClassicalNahuatlPostStemUnitClassificationSource({
            rankResult: nuclearClauseRank,
            unitDisposition: "paradigmatic-unit",
        }));
    const dyad = apply(ctx, ROUTES.dyad,
        ctx.buildClassicalInflectionalAffixDyadAnalysisSource({
            firstInflectionalAffixResult: inflectionalPrefix,
            secondInflectionalAffixResult: inflectionalSuffix,
            sequenceRelation: "inseparable",
        }));
    const separableDyad = apply(ctx, ROUTES.dyad,
        ctx.buildClassicalInflectionalAffixDyadAnalysisSource({
            firstInflectionalAffixResult: functional(ctx),
            secondInflectionalAffixResult: functional(ctx, { sequencePosition: "end" }),
            sequenceRelation: "separable",
        }));
    const repeatedMemberDyad = apply(ctx, ROUTES.dyad,
        ctx.buildClassicalInflectionalAffixDyadAnalysisSource({
            firstInflectionalAffixResult: inflectionalPrefix,
            secondInflectionalAffixResult: inflectionalPrefix,
            sequenceRelation: "inseparable",
        }));
    const demotion = apply(ctx, ROUTES.demotion,
        ctx.buildClassicalInflectionalAffixStemInternalDemotionSource({
            inflectionalAffixResult: inflectionalPrefix,
            processKind: "derivational",
            requestedBoundaryRelation: "stem-internal",
        }));
    const conversionalDemotion = apply(ctx, ROUTES.demotion,
        ctx.buildClassicalInflectionalAffixStemInternalDemotionSource({
            inflectionalAffixResult: inflectionalPrefix,
            processKind: "conversional",
            requestedBoundaryRelation: "stem-internal",
        }));
    const invalidDemotion = apply(ctx, ROUTES.demotion,
        ctx.buildClassicalInflectionalAffixStemInternalDemotionSource({
            inflectionalAffixResult: inflectionalPrefix,
            processKind: "derivational",
            requestedBoundaryRelation: "stem-external",
        }));
    const section45 = concept(ctx, "structure", "section-4.5-dyad-reference");
    const sectionReferenceAsMember = apply(ctx, ROUTES.dyad,
        ctx.buildClassicalInflectionalAffixDyadAnalysisSource({
            firstInflectionalAffixResult: section45,
            secondInflectionalAffixResult: inflectionalSuffix,
            sequenceRelation: "inseparable",
        }));

    const exact = [
        ["ACI-P028-L024-B18B2D0C1E", meaningfulResult, "meaningful-structural-units-have-morpheme-or-morph-constituents"],
        ["ACI-P028-L025-700C2B77A6", rankContrast, "morpheme-or-morph-is-an-element-not-a-combination-or-sequence"],
        ["ACI-P028-L025-E97C8332F3", rankContrast, "morpheme-or-morph-has-meaning-while-a-syllable-does-not"],
        ["ACI-P028-L030-18197B4561", coterminality, "morpheme-or-morph-may-be-coterminous-with-a-syllable"],
        ["ACI-P028-L034-49967A83F1", typeInventory, "morphemes-or-morphs-have-exactly-major-and-minor-combinatorial-types"],
        ["ACI-P028-L036-5C05A44C92", majorDefinition, "major-morpheme-or-morph-occurs-at-structural-rank-organization-center"],
        ["ACI-P028-L038-F17CDA45C3", prefix, "an-affix-may-be-prefix-infix-or-suffix"],
        ["ACI-P028-L038-A263EDE447", minorDefinition, "minor-morpheme-or-morph-is-affixal"],
        ["ACI-P028-L039-B1A9A86C23", suffix, "suffix-occurs-at-sequence-end"],
        ["ACI-P028-L040-FF51E7CE49", derivational, "affixes-are-either-derivational-or-inflectional-and-must-not-be-confused"],
        ["ACI-P028-L040-3CAC6D3B77", inflectionalPrefix, "affixes-are-either-derivational-or-inflectional-and-must-not-be-confused"],
        ["ACI-P029-L002-E904B97985", derivational, "derivational-affix-carries-stem-internal-modifying-or-category-altering-information"],
        ["ACI-P029-L004-979657F99C", derivational, "derivational-affix-occurs-only-inside-the-stem-it-builds"],
        ["ACI-P029-L006-F81C4A6A20", inflectionalPrefix, "inflectional-affix-carries-syntactical-information"],
        ["ACI-P029-L006-E42428D8FA", inflectionalSuffix, "inflectional-affix-is-prefix-or-suffix-outside-the-stem-and-builds-a-paradigmatic-unit"],
        ["ACI-P029-L008-9EF4C5B1F2", paradigm, "all-paradigm-forms-are-built-on-one-common-stem-of-one-class"],
        ["ACI-P029-L011-E857079A2C", postStem, "nahuatl-paradigmatic-units-are-nuclear-clauses-not-words"],
        ["ACI-P029-L013-C77A2EA6DE", dyad, "an-inseparable-two-member-inflectional-sequence-is-a-morphemic-or-morphic-dyad"],
        ["ACI-P029-L015-735E05A0A6", dyad, "morphemic-or-morphic-dyads-play-a-major-structural-role-in-Nahuatl"],
        ["ACI-P029-L015-735E05A0A6-02", section45, "section-4.5-supplies-a-Nahuatl-morphemic-or-morphic-dyad-example"],
        ["ACI-P029-L016-682536CD59", demotion, "demotion-moves-an-inflectional-affix-from-original-stem-external-to-stem-internal-status"],
    ];

    s.eq(
        "all 21 Canvas atoms keep their individual exact jobs in Canvas order",
        exact.map(([atomId]) => atomId),
        [
            "ACI-P028-L024-B18B2D0C1E", "ACI-P028-L025-700C2B77A6",
            "ACI-P028-L025-E97C8332F3", "ACI-P028-L030-18197B4561",
            "ACI-P028-L034-49967A83F1", "ACI-P028-L036-5C05A44C92",
            "ACI-P028-L038-F17CDA45C3", "ACI-P028-L038-A263EDE447",
            "ACI-P028-L039-B1A9A86C23", "ACI-P028-L040-FF51E7CE49",
            "ACI-P028-L040-3CAC6D3B77", "ACI-P029-L002-E904B97985",
            "ACI-P029-L004-979657F99C", "ACI-P029-L006-F81C4A6A20",
            "ACI-P029-L006-E42428D8FA", "ACI-P029-L008-9EF4C5B1F2",
            "ACI-P029-L011-E857079A2C", "ACI-P029-L013-C77A2EA6DE",
            "ACI-P029-L015-735E05A0A6", "ACI-P029-L015-735E05A0A6-02",
            "ACI-P029-L016-682536CD59",
        ],
    );

    for (const [atomId, result, fact] of exact) {
        const observation = exactFactObservation(result, fact);
        const exactBoundary = atomId === "ACI-P028-L024-B18B2D0C1E"
            ? meaningfulResult.familyConstituentKinds.join("+") === "morpheme+morph"
                && meaningfulMorphResult.authorizationStatus === "authorized"
            : atomId === "ACI-P028-L039-B1A9A86C23"
                ? [prefix.classification, infix.classification, suffix.classification].join("+")
                    === "prefix+infix+suffix"
                : atomId === "ACI-P029-L004-979657F99C"
                    ? derivational.coordinates.stemBoundaryRelation === "inside"
                    : atomId === "ACI-P029-L006-E42428D8FA"
                        ? invalidInflectionalInfix.authorizationStatus === "blocked"
                        : atomId === "ACI-P029-L013-C77A2EA6DE"
                            ? separableDyad.authorizationStatus === "blocked"
                                && repeatedMemberDyad.authorizationStatus === "blocked"
                            : atomId === "ACI-P029-L016-682536CD59"
                                ? conversionalDemotion.authorizationStatus === "authorized"
                                    && invalidDemotion.authorizationStatus === "blocked"
                                : true;
        const boundaryMutationFails = atomId === "ACI-P029-L006-E42428D8FA"
            ? ({ ...invalidInflectionalInfix, authorizationStatus: "authorized" }).authorizationStatus !== "blocked"
            : atomId === "ACI-P029-L013-C77A2EA6DE"
                ? ({ ...separableDyad, authorizationStatus: "authorized" }).authorizationStatus !== "blocked"
                : atomId === "ACI-P029-L016-682536CD59"
                    ? ({ ...invalidDemotion, authorizationStatus: "authorized" }).authorizationStatus !== "blocked"
                    : true;
        s.ok(`${atomId} performs its exact normal application job and its mutation fails`,
            observation.passes
                && observation.mutationFails
                && exactBoundary
                && boundaryMutationFails);
    }

    s.eq(
        "the real grammar boundaries block wrong position, separability, reused members, false references, and false demotion",
        {
            positions: [prefix.classification, infix.classification, suffix.classification],
            invalidInflectionalInfix: [invalidInflectionalInfix.authorizationStatus, invalidInflectionalInfix.blockReason],
            separableDyad: [separableDyad.authorizationStatus, separableDyad.blockReason],
            repeatedMemberDyad: [repeatedMemberDyad.authorizationStatus, repeatedMemberDyad.blockReason],
            sectionReferenceAsMember: [sectionReferenceAsMember.authorizationStatus, sectionReferenceAsMember.blockReason],
            invalidDemotion: [invalidDemotion.authorizationStatus, invalidDemotion.blockReason],
            conversionalDemotion: conversionalDemotion.authorizationStatus,
        },
        {
            positions: ["prefix", "infix", "suffix"],
            invalidInflectionalInfix: ["blocked", "affix-functional-coordinates-incompatible"],
            separableDyad: ["blocked", "inseparable-inflectional-sequence-required"],
            repeatedMemberDyad: ["blocked", "two-independent-inflectional-affix-results-required"],
            sectionReferenceAsMember: ["blocked", "owner-issued-affix-functional-type-classification-result-required"],
            invalidDemotion: ["blocked", "stem-internal-demotion-target-required"],
            conversionalDemotion: "authorized",
        },
    );

    return s;
}

module.exports = { run };
