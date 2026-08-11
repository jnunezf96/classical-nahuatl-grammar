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

function meaningful(ctx, candidateKind) {
    return execute(ctx, "classical.morpheme.meaningful-unit.classify", [
        ctx.buildClassicalMeaningfulMorphemeUnitClassificationSource({
            candidateResult: concept(ctx, "morpheme", candidateKind),
        }),
    ]);
}

function combinatorial(ctx, kind, candidateKind = "morpheme") {
    return execute(ctx, "classical.morpheme.combinatorial-type.classify", [
        ctx.buildClassicalMorphemeCombinatorialTypeClassificationSource({
            meaningfulUnitResult: meaningful(ctx, candidateKind),
            requestedAnalysisKind: kind,
        }),
    ]);
}

function root(ctx) {
    return execute(ctx, "classical.structure.root.major-morpheme.validate", [
        ctx.buildClassicalRootMajorMorphemeDefinitionSource({
            majorTypeResult: combinatorial(ctx, "major-definition"),
            majorUnitCount: 1,
            requestedStructureKind: "root",
        }),
    ]);
}

function derivationalSuffix(ctx) {
    const position = execute(ctx, "classical.morpheme.affix.position.classify", [
        ctx.buildClassicalAffixLinearPositionClassificationSource({
            minorTypeResult: combinatorial(ctx, "minor-definition", "morph"),
            sequencePosition: "end",
        }),
    ]);
    return execute(ctx, "classical.morpheme.affix.function.classify", [
        ctx.buildClassicalAffixFunctionalTypeClassificationSource({
            affixPositionResult: position,
            informationRole: "modifying-or-category-altering",
            stemBoundaryRelation: "inside",
        }),
    ]);
}

function stem(ctx) {
    return execute(ctx, "classical.structure.stem.form-via-stock", [
        ctx.buildClassicalStockMediatedStemFormationSource({
            rootResult: root(ctx),
            derivationalSuffixResult: derivationalSuffix(ctx),
            requestedFormation: "root-plus-derivational-suffix-via-stock-to-stem",
        }),
    ]);
}

function postStem(ctx, unitDisposition) {
    const particle = unitDisposition === "monomorphemic-invariant-sentence-fragment";
    const rankResult = concept(
        ctx,
        particle ? "word-rank" : "terminology-assumption",
        particle ? "particle" : "nuclear-clause-as-word",
    );
    return execute(ctx, "classical.structure.post-stem-unit.classify", [
        ctx.buildClassicalNahuatlPostStemUnitClassificationSource({
            rankResult,
            unitDisposition,
        }),
    ]);
}

function transition(ctx, requestedAnalysisKind) {
    return execute(ctx, "classical.structure.stem-transition-zone.validate", [
        ctx.buildClassicalStemInflectionTransitionZoneSource({
            stemResult: stem(ctx),
            postStemResult: postStem(ctx, "paradigmatic-unit"),
            requestedAnalysisKind,
        }),
    ]);
}

function wordAnalysis(ctx, requestedAnalysisKind) {
    return execute(ctx, "concept.word.sentence-fragment.analyze", [
        ctx.buildComparativeWordSentenceFragmentAnalysisSource({
            analysisDomain: "english-spanish-word-rank-comparison",
            requestedAnalysisKind,
        }),
    ]);
}

function nuclearMorphosyntax(ctx) {
    const nuclearClause = execute(ctx, "vnc:nuclear-clause", ["tlacatl", {
        nuclearClauseKind: "nominal-nuclear-clause",
        state: "absolutive",
    }]);
    const morphSource = ctx.buildClassicalNuclearClauseMorphosyntaxDomainSource({
        analysisDomain: "nuclear-clause-morphosyntax-domain",
        requestedAnalysisKind: "subject-predicate-morphosyntax",
        prerequisites: { nuclearClauseResult: nuclearClause },
    });
    return {
        nuclearClause,
        result: execute(ctx, "classical.nuclear-clause.morphosyntax.validate", [morphSource]),
    };
}

function includesFact(result, fact) {
    return result.authorizationStatus === "authorized" && result.facts.includes(fact);
}

function exactFactAndMutation(result, fact) {
    const mutation = {
        ...result,
        facts: result.facts.map(value => value === fact ? `broken-${value}` : value),
    };
    return includesFact(result, fact) && !includesFact(mutation, fact);
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson1_transition_zone_jobs");
    const comparison = concept(ctx, "structure", "stem-post-stem-comparison-evidence");
    const boundary = transition(ctx, "transition-boundary");
    const derivationLimit = transition(ctx, "derivation-upper-bound");
    const inflectionOnset = transition(ctx, "inflection-domain-onset");
    const wordFragment = wordAnalysis(ctx, "general-sentence-fragment");
    const wordException = wordAnalysis(ctx, "simple-word-sentence-exception");
    const invalidWordAnalysis = wordAnalysis(ctx, "word-is-complete-sentence");
    const particle = postStem(ctx, "monomorphemic-invariant-sentence-fragment");
    const nuclearDefault = postStem(ctx, "other-post-stem-structural-unit");
    const morphosyntax = nuclearMorphosyntax(ctx);
    const copiedNuclearSource = ctx.buildClassicalNuclearClauseMorphosyntaxDomainSource({
        analysisDomain: "nuclear-clause-morphosyntax-domain",
        requestedAnalysisKind: "subject-predicate-morphosyntax",
        prerequisites: { nuclearClauseResult: Object.freeze({ ...morphosyntax.nuclearClause }) },
    });
    const copiedNuclear = ctx.evaluateClassicalNuclearClauseMorphosyntaxDomain(copiedNuclearSource);

    const exact = [
        ["ACI-P030-L023-78EB624A91", boundary, "an-important-dividing-line-separates-stem-rank-from-the-next-higher-rank"],
        ["ACI-P030-L024-3A51157B24", comparison, "the-stem-to-next-rank-distance-is-greater-in-Nahuatl-than-in-English-or-Spanish"],
        ["ACI-P030-L025-3E94E1F3BC", derivationLimit, "stem-rank-marks-the-upper-end-of-derivation-and-other-stem-forming-processes"],
        ["ACI-P030-L026-A9D90195E5", inflectionOnset, "the-next-higher-rank-is-the-domain-of-inflection"],
        ["ACI-P030-L028-DCA488A819", comparison, "the-English-and-Spanish-rank-above-stem-is-called-word"],
        ["ACI-P030-L029-E82E8935D5", wordFragment, "words-are-sentence-fragments"],
        ["ACI-P030-L029-F880F38CDB", wordException, "a-simple-word-can-occasionally-occur-as-a-sentence"],
        ["ACI-P030-L030-011B524FE8", comparison, "Here-is-cited-as-a-simple-English-word-sentence"],
        ["ACI-P030-L030-99F445C3CC", comparison, "Now-is-cited-as-a-simple-English-word-sentence"],
        ["ACI-P030-L030-50B3891D7A", comparison, "Ouch-is-cited-as-a-simple-English-word-sentence"],
        ["ACI-P030-L030-9F60B26651", comparison, "English-one-word-sentences-are-exceptional-not-the-general-pattern"],
        ["ACI-P030-L030-9F60B26651-02", comparison, "English-one-word-sentences-normally-imply-at-least-one-unspoken-word"],
        ["ACI-P030-L030-9F60B26651-03", comparison, "Hush-can-imply-You-hush"],
        ["ACI-P030-L030-9F60B26651-04", comparison, "Now-can-imply-Do-it-now"],
        ["ACI-P030-L030-9F60B26651-05", comparison, "Here-can-imply-Put-it-here"],
        ["ACI-P030-L031-85B88C9F15", comparison, "Do-it-now-is-the-fuller-structure-behind-Now"],
        ["ACI-P030-L031-3B09167131", comparison, "Put-it-here-or-I-am-here-is-the-fuller-structure-behind-Here"],
        ["ACI-P030-L032-012B1547F4", comparison, "English-and-Spanish-words-may-be-paradigmatic-through-inflectional-suffixes"],
        ["ACI-P030-L032-012B1547F4-02", comparison, "dog-dogs-pick-picks-and-picked-check-paradigmatic-word-variation"],
        ["ACI-P030-L032-012B1547F4-03", comparison, "English-and-Spanish-words-may-be-nonparadigmatic-and-reject-inflection"],
        ["ACI-P030-L032-012B1547F4-04", comparison, "and-if-for-and-slowly-check-nonparadigmatic-English-words"],
        ["ACI-P030-L032-012B1547F4-05", comparison, "English-older-and-oldest-are-analyzed-as-derivational-not-inflectional"],
        ["ACI-P030-L032-012B1547F4-06", comparison, "German-comparative-and-superlative-stems-have-adjective-class-inflectional-paradigms"],
        ["ACI-P030-L038-50324DE696", comparison, "a-nonparadigmatic-word-can-be-coextensive-in-form-with-its-stem"],
        ["ACI-P030-L038-50324DE696-02", comparison, "a-nonparadigmatic-word-still-passes-through-stem-rank-before-word-rank"],
        ["ACI-P030-L038-ED53E96257", comparison, "when-a-stem-gives-rise-to-a-nonparadigmatic-word-the-form-is-coextensive"],
        ["ACI-P030-L042-C122DB3208", comparison, "Nahuatl-post-stem-rank-structure-differs-from-English-and-Spanish-word-rank"],
        ["ACI-P030-L042-1CBA7936F0", particle, "nahuatl-has-monomorphemic-nonparadigmatic-invariant-sentence-fragment-particles"],
        ["ACI-P031-L002-6E5362A211", nuclearDefault, "apart-from-particles-all-structural-units-at-this-rank-are-nuclear-clauses"],
        ["ACI-P031-L002-0267836EF6", comparison, "Lesson-4-is-the-documentary-reference-for-Nahuatl-nuclear-clauses"],
        ["ACI-P031-L003-DE4CB4E50F", morphosyntax.result, "nuclear-clauses-obligatorily-contain-subject-and-predicate-structure"],
        ["ACI-P031-L005-B82FE09E9D", comparison, "English-and-Spanish-words-remain-under-inflectional-morphology-rules"],
    ];

    s.eq("all 32 transition-zone atoms keep Canvas order", exact.length, 32);
    for (const [atomId, result, fact] of exact) {
        s.ok(`${atomId} performs its exact job and its mutation fails`, exactFactAndMutation(result, fact));
    }
    s.eq("the transition owners keep comparative evidence, particles, clauses, and copied Results in their proper places", {
        transitionKinds: [boundary.analysisKind, derivationLimit.analysisKind, inflectionOnset.analysisKind],
        invalidWordAnalysis: [invalidWordAnalysis.authorizationStatus, invalidWordAnalysis.blockReason],
        particle: [particle.authorizationStatus, particle.classification],
        nuclearDefault: [nuclearDefault.authorizationStatus, nuclearDefault.classification],
        morphosyntax: [morphosyntax.result.authorizationStatus, morphosyntax.result.classification],
        copiedNuclear: [copiedNuclear.authorizationStatus, copiedNuclear.blockReason],
    }, {
        transitionKinds: ["transition-boundary", "derivation-upper-bound", "inflection-domain-onset"],
        invalidWordAnalysis: ["blocked", "word-sentence-fragment-analysis-analysis-kind-required"],
        particle: ["authorized", "particle"],
        nuclearDefault: ["authorized", "nuclear-clause"],
        morphosyntax: ["authorized", "nuclear-clause-morphosyntax-domain"],
        copiedNuclear: ["blocked", "nuclear-clause-morphosyntax-domain-owner-issued-prerequisites-required"],
    });

    return s;
}

module.exports = { run };
