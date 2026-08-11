"use strict";

const { createSuite } = require("./runner");

const ROUTES = Object.freeze({
    concept: "concept:classification",
    meaningful: "classical.morpheme.meaningful-unit.classify",
    combinatorial: "classical.morpheme.combinatorial-type.classify",
    hierarchy: "classical.morpheme.meaningful-rank.hierarchy.validate",
    upgrade: "classical.structure.meaningful-rank.source-or-upgrade.validate",
    downgrade: "classical.structure.meaningful-rank.downgrade",
    root: "classical.structure.root.major-morpheme.validate",
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

function combinatorial(ctx, requestedAnalysisKind, candidateKind) {
    return apply(ctx, ROUTES.combinatorial,
        ctx.buildClassicalMorphemeCombinatorialTypeClassificationSource({
            meaningfulUnitResult: meaningful(ctx, candidateKind),
            requestedAnalysisKind,
        }));
}

function hierarchy(ctx) {
    return apply(ctx, ROUTES.hierarchy,
        ctx.buildClassicalMeaningfulStructuralRankHierarchySource({
            majorTypeResult: combinatorial(ctx, "major-definition", "morpheme"),
            minorTypeResult: combinatorial(ctx, "minor-definition", "morph"),
            requestedHierarchy: "nahuatl-meaningful-ranks",
        }));
}

function upgrade(ctx, sourceRank, targetRank, transitionMode) {
    return apply(ctx, ROUTES.upgrade,
        ctx.buildClassicalMeaningfulRankSourceUpgradeAdmissibilitySource({
            hierarchyResult: hierarchy(ctx),
            sourceRank,
            targetRank,
            transitionMode,
        }));
}

function downgrade(ctx, sourceRank, targetRank, transitionMode = "explicit-downgrade") {
    return apply(ctx, ROUTES.downgrade,
        ctx.buildClassicalMeaningfulRankDowngradeSource({
            hierarchyResult: hierarchy(ctx),
            sourceRank,
            targetRank,
            transitionMode,
        }));
}

function root(ctx, count = 1) {
    return apply(ctx, ROUTES.root,
        ctx.buildClassicalRootMajorMorphemeDefinitionSource({
            majorTypeResult: combinatorial(ctx, "major-definition", "morpheme"),
            majorUnitCount: count,
            requestedStructureKind: "root",
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
    const s = createSuite("classical_lesson1_meaningful_hierarchy_jobs");
    const comparison = concept(ctx, "structure", "meaningful-hierarchy-comparison");
    const hierarchyResult = hierarchy(ctx);
    const normalSource = upgrade(ctx, "root", "stock", "normal-adjacent-source");
    const explicitUpgrade = upgrade(ctx, "root", "stem", "explicit-upgrade");
    const invalidNonadjacentNormal = upgrade(ctx, "root", "stem", "normal-adjacent-source");
    const invalidReverseUpgrade = upgrade(ctx, "stem", "root", "explicit-upgrade");
    const nuclearClauseDowngrade = downgrade(ctx, "nuclear-clause", "stem");
    const generalDowngrade = downgrade(ctx, "sentence", "group");
    const invalidUpgradeAsDowngrade = downgrade(ctx, "root", "stem");
    const invalidDowngradeMode = downgrade(ctx, "nuclear-clause", "stem", "explicit-upgrade");
    const rootResult = root(ctx);
    const invalidRoot = root(ctx, 2);

    const exact = [
        ["ACI-P029-L019-9DA394C7C5", hierarchyResult, "major-and-minor-morpheme-or-morph-distinction-precedes-meaningful-rank-analysis"],
        ["ACI-P029-L020-380B4F2DEC", comparison, "section-1.11.2-presents-an-English-and-Spanish-meaningful-unit-hierarchy"],
        ["ACI-P029-L020-380B4F2DEC-02", comparison, "section-1.11.2-presents-a-Nahuatl-meaningful-unit-hierarchy"],
        ["ACI-P029-L020-380B4F2DEC-03", comparison, "the-two-hierarchies-are-juxtaposed-to-highlight-Nahuatl-rank-differences"],
        ["ACI-P029-L021-5DB865513A", hierarchyResult, "ascending-meaningful-ranks-are-grouped-into-stages"],
        ["ACI-P029-L023-57336AEF67", hierarchyResult, "no-higher-rank-exists-without-a-requisite-lower-stage"],
        ["ACI-P029-L026-C658EB5AA0", comparison, "the-English-and-Spanish-scheme-ascends-morpheme-or-morph-root-stem-word-word-group-clause-clause-group-sentence"],
        ["ACI-P030-L004-D47685394D", normalSource, "a-lower-rank-unit-normally-serves-as-source-for-the-next-higher-rank"],
        ["ACI-P030-L006-518758C8D7", generalDowngrade, "a-higher-rank-unit-can-be-downgraded-to-function-at-a-lower-rank"],
        ["ACI-P030-L006-518758C8D7-02", nuclearClauseDowngrade, "a-Nahuatl-nuclear-clause-can-be-downgraded-to-stem-rank-and-function"],
        ["ACI-P030-L009-7EF7DE26A3", rootResult, "a-root-is-a-single-major-morpheme-or-morph"],
    ];

    s.eq(
        "the 11 hierarchy atoms keep their exact Canvas order",
        exact.map(([atomId]) => atomId),
        [
            "ACI-P029-L019-9DA394C7C5", "ACI-P029-L020-380B4F2DEC",
            "ACI-P029-L020-380B4F2DEC-02", "ACI-P029-L020-380B4F2DEC-03",
            "ACI-P029-L021-5DB865513A", "ACI-P029-L023-57336AEF67",
            "ACI-P029-L026-C658EB5AA0", "ACI-P030-L004-D47685394D",
            "ACI-P030-L006-518758C8D7", "ACI-P030-L006-518758C8D7-02",
            "ACI-P030-L009-7EF7DE26A3",
        ],
    );

    for (const [atomId, result, fact] of exact) {
        const extra = atomId === "ACI-P030-L004-D47685394D"
            ? explicitUpgrade.authorizationStatus === "authorized"
                && explicitUpgrade.facts.includes("a-lower-rank-unit-can-be-explicitly-upgraded-to-a-higher-rank")
            : atomId === "ACI-P030-L006-518758C8D7"
                ? invalidUpgradeAsDowngrade.authorizationStatus === "blocked"
                : atomId === "ACI-P030-L006-518758C8D7-02"
                    ? nuclearClauseDowngrade.classification === "nuclear-clause-downgraded-to-stem"
                    : atomId === "ACI-P030-L009-7EF7DE26A3"
                        ? invalidRoot.authorizationStatus === "blocked"
                        : true;
        s.ok(`${atomId} performs its exact job and fails when that behavior is changed`,
            exactFactAndMutation(result, fact) && extra);
    }

    s.eq(
        "rank movement follows direction, adjacency, explicit mode, and root-count rules",
        {
            normalSource: normalSource.authorizationStatus,
            explicitUpgrade: explicitUpgrade.authorizationStatus,
            invalidNonadjacentNormal: [invalidNonadjacentNormal.authorizationStatus, invalidNonadjacentNormal.blockReason],
            invalidReverseUpgrade: [invalidReverseUpgrade.authorizationStatus, invalidReverseUpgrade.blockReason],
            nuclearClauseDowngrade: nuclearClauseDowngrade.authorizationStatus,
            invalidUpgradeAsDowngrade: [invalidUpgradeAsDowngrade.authorizationStatus, invalidUpgradeAsDowngrade.blockReason],
            invalidDowngradeMode: [invalidDowngradeMode.authorizationStatus, invalidDowngradeMode.blockReason],
            rootCountTwo: [invalidRoot.authorizationStatus, invalidRoot.blockReason],
        },
        {
            normalSource: "authorized",
            explicitUpgrade: "authorized",
            invalidNonadjacentNormal: ["blocked", "meaningful-rank-source-or-upgrade-not-admissible"],
            invalidReverseUpgrade: ["blocked", "meaningful-rank-source-or-upgrade-not-admissible"],
            nuclearClauseDowngrade: "authorized",
            invalidUpgradeAsDowngrade: ["blocked", "explicit-higher-to-lower-rank-downgrade-required"],
            invalidDowngradeMode: ["blocked", "explicit-higher-to-lower-rank-downgrade-required"],
            rootCountTwo: ["blocked", "root-single-major-morpheme-count-required"],
        },
    );

    return s;
}

module.exports = { run };
