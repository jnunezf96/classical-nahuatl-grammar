"use strict";

const { createSuite } = require("./runner");

function meaningful(ctx, candidateKind = "morpheme") {
    const candidateResult = ctx.evaluateClassicalGrammarConcept(
        ctx.buildClassicalGrammarConceptSource({
            domain: "morpheme",
            selection: candidateKind,
        }),
    );
    return ctx.evaluateClassicalMeaningfulMorphemeUnitClassification(
        ctx.buildClassicalMeaningfulMorphemeUnitClassificationSource({
            candidateResult,
        }),
    );
}

function combinatorial(ctx, requestedAnalysisKind, candidateKind = "morpheme") {
    return ctx.evaluateClassicalMorphemeCombinatorialTypeClassification(
        ctx.buildClassicalMorphemeCombinatorialTypeClassificationSource({
            meaningfulUnitResult: meaningful(ctx, candidateKind),
            requestedAnalysisKind,
        }),
    );
}

function position(ctx, sequencePosition = "end") {
    return ctx.evaluateClassicalAffixLinearPositionClassification(
        ctx.buildClassicalAffixLinearPositionClassificationSource({
            minorTypeResult: combinatorial(ctx, "minor-definition", "morph"),
            sequencePosition,
        }),
    );
}

function functional(ctx, kind = "derivational") {
    return ctx.evaluateClassicalAffixFunctionalTypeClassification(
        ctx.buildClassicalAffixFunctionalTypeClassificationSource({
            affixPositionResult: position(ctx, kind === "derivational" ? "end" : "beginning"),
            informationRole: kind === "derivational"
                ? "modifying-or-category-altering"
                : "syntactical",
            stemBoundaryRelation: kind === "derivational" ? "inside" : "outside",
        }),
    );
}

function hierarchy(ctx) {
    return ctx.evaluateClassicalMeaningfulStructuralRankHierarchy(
        ctx.buildClassicalMeaningfulStructuralRankHierarchySource({
            majorTypeResult: combinatorial(ctx, "major-definition"),
            minorTypeResult: combinatorial(ctx, "minor-definition", "morph"),
            requestedHierarchy: "nahuatl-meaningful-ranks",
        }),
    );
}

function root(ctx) {
    return ctx.evaluateClassicalRootMajorMorphemeDefinition(
        ctx.buildClassicalRootMajorMorphemeDefinitionSource({
            majorTypeResult: combinatorial(ctx, "major-definition"),
            majorUnitCount: 1,
            requestedStructureKind: "root",
        }),
    );
}

function stockStem(ctx) {
    return ctx.evaluateClassicalStockMediatedStemFormation(
        ctx.buildClassicalStockMediatedStemFormationSource({
            rootResult: root(ctx),
            derivationalSuffixResult: functional(ctx, "derivational"),
            requestedFormation:
                "root-plus-derivational-suffix-via-stock-to-stem",
        }),
    );
}

function rankUpgrade(ctx, sourceRank = "root", targetRank = "stem", transitionMode = "explicit-upgrade") {
    return ctx.evaluateClassicalMeaningfulRankSourceUpgradeAdmissibility(
        ctx.buildClassicalMeaningfulRankSourceUpgradeAdmissibilitySource({
            hierarchyResult: hierarchy(ctx),
            sourceRank,
            targetRank,
            transitionMode,
        }),
    );
}

function postStem(ctx, unitDisposition) {
    const particle = unitDisposition
        === "monomorphemic-invariant-sentence-fragment";
    const rankResult = ctx.evaluateClassicalGrammarConcept(
        ctx.buildClassicalGrammarConceptSource({
            domain: particle ? "word-rank" : "terminology-assumption",
            selection: particle ? "particle" : "nuclear-clause-as-word",
        }),
    );
    return ctx.evaluateClassicalNahuatlPostStemUnitClassification(
        ctx.buildClassicalNahuatlPostStemUnitClassificationSource({
            rankResult,
            unitDisposition,
        }),
    );
}

function run(ctx = {}) {
    const s = createSuite("meaningful_rank_transition_owners");
    const prefixes = [
        "ClassicalNahuatlPostStemUnitClassification",
        "ClassicalInflectionalAffixStemInternalDemotion",
        "ClassicalMeaningfulRankSourceUpgradeAdmissibility",
        "ClassicalMeaningfulRankDowngrade",
        "ClassicalRootMajorMorphemeDefinition",
        "ClassicalDirectStemFormation",
        "ClassicalStockMediatedStemFormation",
        "ClassicalCompoundStemFormation",
        "ClassicalLexemeBearingUnitClassification",
        "ClassicalStemLexicalItemClassification",
        "ClassicalRootMeaningRankUpgrade",
        "ClassicalStemInflectionTransitionZone",
    ];
    s.eq(
        "twelve precise owners expose independent Source Result contract and evidence APIs",
        prefixes.map((prefix) => [
            prefix,
            [
                `build${prefix}Source`,
                `is${prefix}Source`,
                `evaluate${prefix}`,
                `is${prefix}Result`,
                `is${prefix}OperationContract`,
                `get${prefix}ExecutionEvidence`,
                `is${prefix}ExecutionEvidence`,
            ].map((name) => typeof ctx[name]),
        ]),
        prefixes.map((prefix) => [prefix, Array(7).fill("function")]),
    );

    const postStemResults = [
        "paradigmatic-unit",
        "monomorphemic-invariant-sentence-fragment",
        "other-post-stem-structural-unit",
    ].map((disposition) => postStem(ctx, disposition));
    s.eq(
        "post-stem classification keeps the particle exception distinct from the nuclear-clause default",
        postStemResults.map((result) => [
            result.authorizationStatus,
            result.analysisKind,
            result.classification,
        ]),
        [
            ["authorized", "paradigmatic-unit", "nuclear-clause"],
            ["authorized", "monomorphemic-invariant-sentence-fragment", "particle"],
            ["authorized", "other-post-stem-structural-unit", "nuclear-clause"],
        ],
    );

    const demotion = ctx.evaluateClassicalInflectionalAffixStemInternalDemotion(
        ctx.buildClassicalInflectionalAffixStemInternalDemotionSource({
            inflectionalAffixResult: functional(ctx, "inflectional"),
            processKind: "derivational",
            requestedBoundaryRelation: "stem-internal",
        }),
    );
    const normalSource = rankUpgrade(
        ctx,
        "root",
        "stock",
        "normal-adjacent-source",
    );
    const upgrade = rankUpgrade(ctx);
    const downgrade = rankUpgrade(
        ctx,
        "nuclear-clause",
        "stem",
        "explicit-downgrade",
    );
    s.eq(
        "demotion and lower-to-higher source or upgrade remain different mechanisms",
        [demotion, normalSource, upgrade, downgrade].map((result) => [
            result.authorizationStatus,
            result.semanticOwnerId,
            result.classification,
            result.blockReason,
        ]),
        [
            ["authorized", "inflectional-affix-stem-internal-demotion", "stem-internal-demoted-inflectional-affix", ""],
            ["authorized", "meaningful-rank-source-and-upgrade-admissibility", "normal-adjacent-rank-source", ""],
            ["authorized", "meaningful-rank-source-and-upgrade-admissibility", "explicit-meaningful-rank-upgrade", ""],
            ["blocked", "meaningful-rank-source-and-upgrade-admissibility", "", "meaningful-rank-source-or-upgrade-not-admissible"],
        ],
    );

    const rootResult = root(ctx);
    const stock = stockStem(ctx);
    const compound = ctx.evaluateClassicalCompoundStemFormation(
        ctx.buildClassicalCompoundStemFormationSource({
            firstStemResult: stock,
            secondStemResult: stockStem(ctx),
            compositionRelation: "stem-plus-stem",
        }),
    );
    s.eq(
        "root validation and the two stem-forming owners preserve distinct effects",
        [rootResult, stock, compound].map((result) => [
            result.authorizationStatus,
            result.semanticOwnerId,
            result.classification,
            result.unitConstructed,
            result.formulaGenerated,
            result.writtenSurfaceGenerated,
        ]),
        [
            ["authorized", "root-major-morpheme-definition", "root", false, false, false],
            ["authorized", "stock-mediated-stem-formation", "stock-mediated-stem", true, false, false],
            ["authorized", "compound-stem-formation", "compound-stem", true, false, false],
        ],
    );

    const lowerLexeme = ctx.evaluateClassicalLexemeBearingUnitClassification(
        ctx.buildClassicalLexemeBearingUnitClassificationSource({
            unitResult: meaningful(ctx),
            unitKind: "lower-rank-morphological-unit",
        }),
    );
    const stemLexeme = ctx.evaluateClassicalLexemeBearingUnitClassification(
        ctx.buildClassicalLexemeBearingUnitClassificationSource({
            unitResult: stock,
            unitKind: "stem",
        }),
    );
    const idiomFrame = ctx.buildClassicalNahuatlIdiomFrame("zan-huītz");
    const idiomLexeme = ctx.evaluateClassicalLexemeBearingUnitClassification(
        ctx.buildClassicalLexemeBearingUnitClassificationSource({
            unitResult: idiomFrame,
            unitKind: "idiom",
        }),
    );
    s.eq(
        "lexeme-bearing classification distinguishes sememe lower units from stem and idiom lexemes",
        [lowerLexeme, stemLexeme, idiomLexeme].map((result) => [
            result.authorizationStatus,
            result.coordinates.meaningComponentKind,
            result.coordinates.unitKind,
        ]),
        [
            ["authorized", "sememe", "lower-rank-morphological-unit"],
            ["authorized", "lexeme", "stem"],
            ["authorized", "lexeme", "idiom"],
        ],
    );

    const lexicalItem = ctx.evaluateClassicalStemLexicalItemClassification(
        ctx.buildClassicalStemLexicalItemClassificationSource({
            stemResult: stock,
            requestedLexicalStatus: "lexical-item",
        }),
    );
    const rootMeaning = ctx.evaluateClassicalRootMeaningRankUpgrade(
        ctx.buildClassicalRootMeaningRankUpgradeSource({
            rootResult,
            rankUpgradeResult: upgrade,
            requestedMeaningTransition: "root-sememe-to-stem-lexeme",
        }),
    );
    s.eq(
        "stem lexical status and root meaning upgrade keep independent operation identities",
        [lexicalItem, rootMeaning].map((result) => [
            result.authorizationStatus,
            result.semanticOwnerId,
            result.classification,
            result.unitConstructed,
        ]),
        [
            ["authorized", "stem-lexical-item-classification", "stem-rank-lexical-item", false],
            ["authorized", "root-meaning-rank-upgrade", "root-sememe-upgraded-to-lexeme", false],
        ],
    );

    const transitionResults = [
        "transition-boundary",
        "derivation-upper-bound",
        "inflection-domain-onset",
    ].map((requestedAnalysisKind) =>
        ctx.evaluateClassicalStemInflectionTransitionZone(
            ctx.buildClassicalStemInflectionTransitionZoneSource({
                stemResult: stockStem(ctx),
                postStemResult: postStem(ctx, "paradigmatic-unit"),
                requestedAnalysisKind,
            }),
        ));
    s.eq(
        "the transition-zone owner retains three atom-specific checkpoints",
        transitionResults.map((result) => [
            result.authorizationStatus,
            result.analysisKind,
            result.classification,
        ]),
        [
            ["authorized", "transition-boundary", "stem-to-post-stem-rank-boundary"],
            ["authorized", "derivation-upper-bound", "stem-rank-upper-bound-of-derivation"],
            ["authorized", "inflection-domain-onset", "post-stem-rank-domain-of-inflection"],
        ],
    );

    const copiedIdiom = Object.freeze({ ...idiomFrame });
    const hostile = [
        ctx.evaluateClassicalRootMajorMorphemeDefinition(
            ctx.buildClassicalRootMajorMorphemeDefinitionSource({
                majorTypeResult: Object.freeze({ ...combinatorial(ctx, "major-definition") }),
                majorUnitCount: 1,
                requestedStructureKind: "root",
            }),
        ),
        ctx.evaluateClassicalCompoundStemFormation(
            ctx.buildClassicalCompoundStemFormationSource({
                firstStemResult: stock,
                secondStemResult: stock,
                compositionRelation: "stem-plus-stem",
            }),
        ),
        ctx.evaluateClassicalLexemeBearingUnitClassification(
            ctx.buildClassicalLexemeBearingUnitClassificationSource({
                unitResult: copiedIdiom,
                unitKind: "idiom",
            }),
        ),
        ctx.evaluateClassicalRootMeaningRankUpgrade(
            ctx.buildClassicalRootMeaningRankUpgradeSource({
                rootResult,
                rankUpgradeResult: normalSource,
                requestedMeaningTransition: "root-sememe-to-stem-lexeme",
            }),
        ),
    ];
    s.eq(
        "copied prerequisites duplicate compound members and wrong rank paths fail closed",
        hostile.map((result) => [
            result.authorizationStatus,
            result.ownerExecutionCompleted,
            result.generationAllowed,
            result.formulaGenerated,
            result.writtenSurfaceGenerated,
        ]),
        Array(4).fill(["blocked", false, false, false, false]),
    );

    const allAuthorized = [
        ...postStemResults,
        demotion,
        normalSource,
        upgrade,
        ctx.evaluateClassicalMeaningfulRankDowngrade(
            ctx.buildClassicalMeaningfulRankDowngradeSource({
                hierarchyResult: hierarchy(ctx),
                sourceRank: "nuclear-clause",
                targetRank: "stem",
                transitionMode: "explicit-downgrade",
            }),
        ),
        rootResult,
        ctx.evaluateClassicalDirectStemFormation(
            ctx.buildClassicalDirectStemFormationSource({
                baseResult: root(ctx),
                derivationalAffixResult: null,
                formationKind: "root-alone",
            }),
        ),
        stock,
        compound,
        lowerLexeme,
        stemLexeme,
        idiomLexeme,
        lexicalItem,
        rootMeaning,
        ...transitionResults,
    ];
    const validators = Object.fromEntries(prefixes.map((prefix) => [
        prefixes[prefixes.indexOf(prefix)],
        {
            get: ctx[`get${prefix}ExecutionEvidence`],
            is: ctx[`is${prefix}ExecutionEvidence`],
            result: allAuthorized.find((candidate) =>
                candidate.operationContract
                && ctx[`is${prefix}OperationContract`](candidate.operationContract)),
        },
    ]));
    s.eq(
        "each owner validates only its own identity-bound live execution evidence",
        Object.values(validators).map(({ get, is, result }) => {
            const evidence = get(result);
            return [Boolean(result), is(evidence, result), evidence?.ownerId];
        }),
        [
            "nahuatl-post-stem-unit-classification",
            "inflectional-affix-stem-internal-demotion",
            "meaningful-rank-source-and-upgrade-admissibility",
            "meaningful-rank-downgrade",
            "root-major-morpheme-definition",
            "direct-stem-formation",
            "stock-mediated-stem-formation",
            "compound-stem-formation",
            "lexeme-bearing-unit-classification",
            "stem-lexical-item-classification",
            "root-meaning-rank-upgrade",
            "stem-inflection-transition-zone",
        ].map((ownerId) => [true, true, ownerId]),
    );

    return s;
}

module.exports = { run };
