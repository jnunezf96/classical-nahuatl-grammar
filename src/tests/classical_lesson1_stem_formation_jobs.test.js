"use strict";

const { createSuite } = require("./runner");

const ROUTES = Object.freeze({
    concept: "concept:classification",
    meaningful: "classical.morpheme.meaningful-unit.classify",
    combinatorial: "classical.morpheme.combinatorial-type.classify",
    position: "classical.morpheme.affix.position.classify",
    function: "classical.morpheme.affix.function.classify",
    hierarchy: "classical.morpheme.meaningful-rank.hierarchy.validate",
    upgrade: "classical.structure.meaningful-rank.source-or-upgrade.validate",
    root: "classical.structure.root.major-morpheme.validate",
    directStem: "classical.structure.stem.form-directly",
    stockStem: "classical.structure.stem.form-via-stock",
    compoundStem: "classical.structure.stem.compound",
    meaning: "classical.structure.meaning-bearing-unit.classify",
    lexical: "classical.structure.stem.lexical-status.classify",
    rootMeaning: "classical.structure.root.meaning-rank.upgrade",
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

function meaningful(ctx, candidateKind) {
    return apply(ctx, ROUTES.meaningful,
        ctx.buildClassicalMeaningfulMorphemeUnitClassificationSource({
            candidateResult: concept(ctx, "morpheme", candidateKind),
        }));
}

function combinatorial(ctx, kind, candidateKind = "morpheme") {
    return apply(ctx, ROUTES.combinatorial,
        ctx.buildClassicalMorphemeCombinatorialTypeClassificationSource({
            meaningfulUnitResult: meaningful(ctx, candidateKind),
            requestedAnalysisKind: kind,
        }));
}

function root(ctx) {
    return apply(ctx, ROUTES.root,
        ctx.buildClassicalRootMajorMorphemeDefinitionSource({
            majorTypeResult: combinatorial(ctx, "major-definition"),
            majorUnitCount: 1,
            requestedStructureKind: "root",
        }));
}

function derivationalAffix(ctx) {
    const position = apply(ctx, ROUTES.position,
        ctx.buildClassicalAffixLinearPositionClassificationSource({
            minorTypeResult: combinatorial(ctx, "minor-definition", "morph"),
            sequencePosition: "end",
        }));
    return apply(ctx, ROUTES.function,
        ctx.buildClassicalAffixFunctionalTypeClassificationSource({
            affixPositionResult: position,
            informationRole: "modifying-or-category-altering",
            stemBoundaryRelation: "inside",
        }));
}

function directStem(ctx, formationKind, baseResult, derivationalAffixResult) {
    return apply(ctx, ROUTES.directStem,
        ctx.buildClassicalDirectStemFormationSource({
            baseResult,
            derivationalAffixResult,
            formationKind,
        }));
}

function hierarchy(ctx) {
    return apply(ctx, ROUTES.hierarchy,
        ctx.buildClassicalMeaningfulStructuralRankHierarchySource({
            majorTypeResult: combinatorial(ctx, "major-definition"),
            minorTypeResult: combinatorial(ctx, "minor-definition", "morph"),
            requestedHierarchy: "nahuatl-meaningful-ranks",
        }));
}

function explicitRootToStemUpgrade(ctx) {
    return apply(ctx, ROUTES.upgrade,
        ctx.buildClassicalMeaningfulRankSourceUpgradeAdmissibilitySource({
            hierarchyResult: hierarchy(ctx),
            sourceRank: "root",
            targetRank: "stem",
            transitionMode: "explicit-upgrade",
        }));
}

function includesFact(result, fact) {
    return result.authorizationStatus === "authorized"
        && result.facts.includes(fact);
}

function exactFactAndMutation(result, fact) {
    const mutated = {
        ...result,
        facts: result.facts.map(value => value === fact ? `broken-${value}` : value),
    };
    return includesFact(result, fact) && !includesFact(mutated, fact);
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson1_stem_formation_jobs");
    const evidence = concept(ctx, "structure", "english-spanish-stem-formation-evidence");
    const rootResult = root(ctx);
    const affix = derivationalAffix(ctx);
    const rootAlone = directStem(ctx, "root-alone", rootResult, null);
    const rootAffix = directStem(ctx, "root-plus-derivational-affix", root(ctx), derivationalAffix(ctx));
    const stemAffix = directStem(ctx, "stem-plus-derivational-affix", rootAlone, derivationalAffix(ctx));
    const invalidRootAlone = directStem(ctx, "root-alone", root(ctx), derivationalAffix(ctx));
    const invalidRootAffix = directStem(ctx, "root-plus-derivational-affix", root(ctx), null);
    const stockStem = apply(ctx, ROUTES.stockStem,
        ctx.buildClassicalStockMediatedStemFormationSource({
            rootResult: root(ctx),
            derivationalSuffixResult: derivationalAffix(ctx),
            requestedFormation: "root-plus-derivational-suffix-via-stock-to-stem",
        }));
    const invalidStock = apply(ctx, ROUTES.stockStem,
        ctx.buildClassicalStockMediatedStemFormationSource({
            rootResult: root(ctx),
            derivationalSuffixResult: derivationalAffix(ctx),
            requestedFormation: "direct-root-to-stem",
        }));
    const firstCompoundMember = directStem(ctx, "root-alone", root(ctx), null);
    const secondCompoundMember = directStem(ctx, "root-plus-derivational-affix", root(ctx), derivationalAffix(ctx));
    const compound = apply(ctx, ROUTES.compoundStem,
        ctx.buildClassicalCompoundStemFormationSource({
            firstStemResult: firstCompoundMember,
            secondStemResult: secondCompoundMember,
            compositionRelation: "stem-plus-stem",
        }));
    const invalidCompound = apply(ctx, ROUTES.compoundStem,
        ctx.buildClassicalCompoundStemFormationSource({
            firstStemResult: firstCompoundMember,
            secondStemResult: firstCompoundMember,
            compositionRelation: "stem-plus-stem",
        }));
    const stemMeaning = apply(ctx, ROUTES.meaning,
        ctx.buildClassicalLexemeBearingUnitClassificationSource({
            unitResult: stemAffix,
            unitKind: "stem",
        }));
    const stemLexical = apply(ctx, ROUTES.lexical,
        ctx.buildClassicalStemLexicalItemClassificationSource({
            stemResult: rootAffix,
            requestedLexicalStatus: "lexical-item",
        }));
    const rootMeaning = apply(ctx, ROUTES.rootMeaning,
        ctx.buildClassicalRootMeaningRankUpgradeSource({
            rootResult: root(ctx),
            rankUpgradeResult: explicitRootToStemUpgrade(ctx),
            requestedMeaningTransition: "root-sememe-to-stem-lexeme",
        }));
    const idiomFrame = ctx.buildClassicalNahuatlIdiomFrame("zan-huītz");
    const idiomMeaning = apply(ctx, ROUTES.meaning,
        ctx.buildClassicalLexemeBearingUnitClassificationSource({
            unitResult: idiomFrame,
            unitKind: "idiom",
        }));
    const copiedIdiomMeaning = apply(ctx, ROUTES.meaning,
        ctx.buildClassicalLexemeBearingUnitClassificationSource({
            unitResult: Object.freeze({ ...idiomFrame }),
            unitKind: "idiom",
        }));

    const exact = [
        ["ACI-P030-L010-AE56B41932", evidence, "English-and-Spanish-stems-may-consist-of-a-root-alone"],
        ["ACI-P030-L010-AE56B41932-02", evidence, "duck-is-cited-as-an-English-root-alone-stem"],
        ["ACI-P030-L010-AE56B41932-03", evidence, "friend-is-cited-as-an-English-root-alone-stem"],
        ["ACI-P030-L010-AE56B41932-04", evidence, "English-and-Spanish-stems-may-consist-of-a-root-plus-one-or-more-derivational-affixes"],
        ["ACI-P030-L010-AE56B41932-05", evidence, "duck-ling-is-cited-as-an-English-root-plus-derivational-affix-stem"],
        ["ACI-P030-L010-AE56B41932-06", evidence, "friend-ly-is-cited-as-an-English-derived-stem"],
        ["ACI-P030-L010-AE56B41932-07", evidence, "un-friend-ly-is-cited-as-an-English-multiply-derived-stem"],
        ["ACI-P030-L010-AE56B41932-08", evidence, "un-friend-li-ness-is-cited-as-an-English-multiply-derived-stem"],
        ["ACI-P030-L011-9FE9D0F679", rootAlone, "a-Nahuatl-stem-may-consist-of-a-root-alone"],
        ["ACI-P030-L011-9FE9D0F679-02", rootAffix, "a-Nahuatl-stem-may-consist-of-a-root-plus-a-derivational-affix"],
        ["ACI-P030-L011-9FE9D0F679-03", stemAffix, "a-Nahuatl-stem-may-consist-of-an-existing-stem-plus-another-derivational-affix"],
        ["ACI-P030-L013-583BB05A04", stockStem, "a-special-Nahuatl-stem-can-be-created-through-the-intermediate-stock"],
        ["ACI-P030-L015-A02A98BF92", compound, "Nahuatl-can-create-compound-stems-by-combining-one-stem-with-another"],
        ["ACI-P030-L017-C89E1B0A51", stemMeaning, "the-meaning-component-of-a-stem-is-a-lexeme"],
        ["ACI-P030-L019-3D05203D00", stemLexical, "stem-rank-units-are-lexical-items-listed-in-a-lexicon"],
        ["ACI-P030-L020-7F80CAE091", rootMeaning, "when-a-root-is-upgraded-to-serve-as-a-stem-its-sememe-is-upgraded-to-a-lexeme"],
        ["ACI-P030-L021-208D380F00", idiomMeaning, "the-meaning-component-of-an-idiom-is-a-lexeme"],
    ];

    s.eq("all 17 stem atoms keep Canvas order", exact.map(([atomId]) => atomId), [
        "ACI-P030-L010-AE56B41932", "ACI-P030-L010-AE56B41932-02", "ACI-P030-L010-AE56B41932-03",
        "ACI-P030-L010-AE56B41932-04", "ACI-P030-L010-AE56B41932-05", "ACI-P030-L010-AE56B41932-06",
        "ACI-P030-L010-AE56B41932-07", "ACI-P030-L010-AE56B41932-08", "ACI-P030-L011-9FE9D0F679",
        "ACI-P030-L011-9FE9D0F679-02", "ACI-P030-L011-9FE9D0F679-03", "ACI-P030-L013-583BB05A04",
        "ACI-P030-L015-A02A98BF92", "ACI-P030-L017-C89E1B0A51", "ACI-P030-L019-3D05203D00",
        "ACI-P030-L020-7F80CAE091", "ACI-P030-L021-208D380F00",
    ]);

    for (const [atomId, result, fact] of exact) {
        s.ok(`${atomId} performs its exact job and its mutation fails`,
            exactFactAndMutation(result, fact));
    }

    s.eq("stem construction and meaning fail closed when their required structure is broken", {
        invalidRootAlone: [invalidRootAlone.authorizationStatus, invalidRootAlone.blockReason],
        invalidRootAffix: [invalidRootAffix.authorizationStatus, invalidRootAffix.blockReason],
        invalidStock: [invalidStock.authorizationStatus, invalidStock.blockReason],
        invalidCompound: [invalidCompound.authorizationStatus, invalidCompound.blockReason],
        copiedIdiomMeaning: [copiedIdiomMeaning.authorizationStatus, copiedIdiomMeaning.blockReason],
    }, {
        invalidRootAlone: ["blocked", "root-alone-formation-requires-no-derivational-affix"],
        invalidRootAffix: ["blocked", "owner-issued-affix-functional-type-classification-result-required"],
        invalidStock: ["blocked", "stock-mediated-two-step-stem-formation-required"],
        invalidCompound: ["blocked", "two-independent-stem-results-required"],
        copiedIdiomMeaning: ["blocked", "owner-issued-idiom-lexical-source-required"],
    });

    return s;
}

module.exports = { run };
