"use strict";

const { createSuite } = require("./runner");

function meaningful(ctx, candidateKind = "morpheme") {
    const concept = ctx.evaluateClassicalGrammarConcept(
        ctx.buildClassicalGrammarConceptSource({
            domain: "morpheme",
            selection: candidateKind,
        }),
    );
    return ctx.evaluateClassicalMeaningfulMorphemeUnitClassification(
        ctx.buildClassicalMeaningfulMorphemeUnitClassificationSource({
            candidateResult: concept,
        }),
    );
}

function combinatorial(ctx, analysisKind, candidateKind = "morpheme") {
    return ctx.evaluateClassicalMorphemeCombinatorialTypeClassification(
        ctx.buildClassicalMorphemeCombinatorialTypeClassificationSource({
            meaningfulUnitResult: meaningful(ctx, candidateKind),
            requestedAnalysisKind: analysisKind,
        }),
    );
}

function position(ctx, sequencePosition, candidateKind = "morpheme") {
    return ctx.evaluateClassicalAffixLinearPositionClassification(
        ctx.buildClassicalAffixLinearPositionClassificationSource({
            minorTypeResult: combinatorial(
                ctx,
                "minor-definition",
                candidateKind,
            ),
            sequencePosition,
        }),
    );
}

function functional(ctx, {
    candidateKind = "morpheme",
    sequencePosition = "beginning",
    informationRole = "syntactical",
    stemBoundaryRelation = "outside",
} = {}) {
    return ctx.evaluateClassicalAffixFunctionalTypeClassification(
        ctx.buildClassicalAffixFunctionalTypeClassificationSource({
            affixPositionResult: position(
                ctx,
                sequencePosition,
                candidateKind,
            ),
            informationRole,
            stemBoundaryRelation,
        }),
    );
}

function run(ctx = {}) {
    const s = createSuite("morpheme_structure_owners");
    const ownerApis = [
        "ClassicalMorphemeCombinatorialTypeClassification",
        "ClassicalAffixLinearPositionClassification",
        "ClassicalAffixFunctionalTypeClassification",
        "ClassicalInflectionalParadigmDefinition",
        "ClassicalInflectionalAffixDyadAnalysis",
        "ClassicalMeaningfulStructuralRankHierarchy",
    ];
    s.eq(
        "six semantic owners expose six independent typed Source Result route APIs",
        ownerApis.map((prefix) => [
            prefix,
            [
                `build${prefix}Source`,
                `is${prefix}Source`,
                `evaluate${prefix}`,
                `is${prefix}Result`,
                `get${prefix}ExecutionEvidence`,
                `is${prefix}ExecutionEvidence`,
            ].map((name) => typeof ctx[name]),
        ]),
        ownerApis.map((prefix) => [prefix, Array(6).fill("function")]),
    );

    const combinatorialCases = [
        ["type-inventory", "major-minor-inventory"],
        ["major-definition", "major-morpheme-or-morph"],
        ["minor-definition", "minor-affixal-morpheme-or-morph"],
    ];
    s.eq(
        "major minor inventory and definitions execute as taxonomy questions without token-label authority",
        combinatorialCases.map(([analysisKind]) => {
            const result = combinatorial(ctx, analysisKind);
            return [
                result.authorizationStatus,
                result.semanticOwnerId,
                result.analysisKind,
                result.classification,
                result.generationAllowed,
            ];
        }),
        combinatorialCases.map(([analysisKind, classification]) => [
            "authorized",
            "morpheme-combinatorial-type-classification",
            analysisKind,
            classification,
            false,
        ]),
    );

    s.eq(
        "linear position derives prefix infix and suffix from beginning middle and end coordinates",
        ["beginning", "middle", "end"].map((coordinate) => {
            const result = position(ctx, coordinate, "morph");
            return [coordinate, result.authorizationStatus, result.classification];
        }),
        [
            ["beginning", "authorized", "prefix"],
            ["middle", "authorized", "infix"],
            ["end", "authorized", "suffix"],
        ],
    );

    s.eq(
        "functional type derives independently from information boundary and position coordinates",
        [
            {
                sequencePosition: "middle",
                informationRole: "modifying-or-category-altering",
                stemBoundaryRelation: "inside",
            },
            {
                sequencePosition: "beginning",
                informationRole: "syntactical",
                stemBoundaryRelation: "outside",
            },
            {
                sequencePosition: "middle",
                informationRole: "syntactical",
                stemBoundaryRelation: "outside",
            },
        ].map((coordinates) => {
            const result = functional(ctx, coordinates);
            return [
                result.authorizationStatus,
                result.classification,
                result.blockReason,
            ];
        }),
        [
            ["authorized", "derivational", ""],
            ["authorized", "inflectional", ""],
            ["blocked", "", "affix-functional-coordinates-incompatible"],
        ],
    );

    const inflectional = () => functional(ctx);
    const paradigm = ctx.evaluateClassicalInflectionalParadigmDefinition(
        ctx.buildClassicalInflectionalParadigmDefinitionSource({
            inflectionalAffixResult: inflectional(),
            requestedAnalysisKind: "common-classed-stem-definition",
        }),
    );
    const dyad = ctx.evaluateClassicalInflectionalAffixDyadAnalysis(
        ctx.buildClassicalInflectionalAffixDyadAnalysisSource({
            firstInflectionalAffixResult: inflectional(),
            secondInflectionalAffixResult: functional(ctx, {
                sequencePosition: "end",
            }),
            sequenceRelation: "inseparable",
        }),
    );
    const hierarchy = ctx.evaluateClassicalMeaningfulStructuralRankHierarchy(
        ctx.buildClassicalMeaningfulStructuralRankHierarchySource({
            majorTypeResult: combinatorial(ctx, "major-definition"),
            minorTypeResult: combinatorial(ctx, "minor-definition", "morph"),
            requestedHierarchy: "nahuatl-meaningful-ranks",
        }),
    );
    s.eq(
        "paradigm dyad and hierarchy remain independent non-generative owners",
        [paradigm, dyad, hierarchy].map((result) => [
            result.authorizationStatus,
            result.semanticOwnerId,
            result.classification,
            result.generationAllowed,
            result.formulaGenerated,
            result.writtenSurfaceGenerated,
        ]),
        [
            ["authorized", "inflectional-paradigm-definition", "all-inflectional-variants-on-one-common-classed-stem", false, false, false],
            ["authorized", "inflectional-affix-dyad-analysis", "morphemic-or-morphic-dyad", false, false, false],
            ["authorized", "meaningful-structural-rank-hierarchy", "nahuatl-meaningful-rank-hierarchy", false, false, false],
        ],
    );

    const copiedMinor = Object.freeze({
        ...combinatorial(ctx, "minor-definition"),
    });
    const copiedInflectional = Object.freeze({ ...inflectional() });
    const hostile = [
        ctx.evaluateClassicalAffixLinearPositionClassification(
            ctx.buildClassicalAffixLinearPositionClassificationSource({
                minorTypeResult: copiedMinor,
                sequencePosition: "beginning",
            }),
        ),
        ctx.evaluateClassicalInflectionalParadigmDefinition(
            ctx.buildClassicalInflectionalParadigmDefinitionSource({
                inflectionalAffixResult: copiedInflectional,
                requestedAnalysisKind: "common-classed-stem-definition",
            }),
        ),
        ctx.evaluateClassicalInflectionalAffixDyadAnalysis(
            ctx.buildClassicalInflectionalAffixDyadAnalysisSource({
                firstInflectionalAffixResult: inflectional(),
                secondInflectionalAffixResult: inflectional(),
                sequenceRelation: "separable",
            }),
        ),
    ];
    s.eq(
        "copied prerequisite Results and nonlicensed sequence conditions fail closed",
        hostile.map((result) => [
            result.authorizationStatus,
            result.ownerExecutionCompleted,
            result.generationAllowed,
        ]),
        Array(3).fill(["blocked", false, false]),
    );

    s.eq(
        "the retired generic morphological-rank label route cannot duplicate owner proof",
        [
            "major-morpheme",
            "minor-morpheme",
            "prefix",
            "derivational-affix",
            "inflectional-affix",
            "paradigm",
        ].map((selection) => ctx.evaluateClassicalGrammarConcept(
            ctx.buildClassicalGrammarConceptSource({
                domain: "morphological-rank",
                selection,
            }),
        ).authorizationStatus),
        Array(6).fill("blocked"),
    );

    return s;
}

module.exports = { run };
