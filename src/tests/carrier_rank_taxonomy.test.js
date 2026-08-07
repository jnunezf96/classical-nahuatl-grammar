"use strict";

const { createSuite } = require("./runner");

const RANKS = Object.freeze({
    phonological: Object.freeze({
        highest: ["stress-group", "stress group", 4],
        vocable: ["vocable", "vocable", 3],
        syllable: ["syllable", "syllable", 2],
        lowest: ["phoneme-phone", "phoneme/phone", 1],
    }),
    graphological: Object.freeze({
        highest: ["punctuation-group", "punctuation group", 4],
        vocable: ["vocable", "vocable", 3],
        syllable: ["syllable", "syllable", 2],
        lowest: ["grapheme-graph", "grapheme/graph", 1],
    }),
});

function classify(ctx, subsystem, rankTier) {
    const source = ctx.buildClassicalCarrierRankTaxonomySource({
        subsystem,
        rankTier,
    });
    return {
        source,
        result: ctx.evaluateClassicalCarrierRankTaxonomy(source),
    };
}

function run(ctx = {}) {
    const s = createSuite("carrier_rank_taxonomy");

    const apiNames = [
        "buildClassicalCarrierRankTaxonomySource",
        "isClassicalCarrierRankTaxonomySource",
        "evaluateClassicalCarrierRankTaxonomy",
        "isClassicalCarrierRankTaxonomyResult",
        "isClassicalCarrierRankTaxonomyOperationContract",
        "getClassicalCarrierRankTaxonomyExecutionEvidence",
        "isClassicalCarrierRankTaxonomyExecutionEvidence",
    ];
    s.eq(
        "the taxonomy has an independent Source, Result, owner contract, and execution-evidence API",
        apiNames.map((name) => [name, typeof ctx[name]]),
        apiNames.map((name) => [name, "function"])
    );

    s.eq(
        "all eight Canvas rank identities are subsystem-bound and ordered without constructing a unit or surface",
        Object.entries(RANKS).flatMap(([subsystem, tiers]) =>
            Object.entries(tiers).map(([rankTier, expected]) => {
                const { source, result } = classify(ctx, subsystem, rankTier);
                const evidence = ctx
                    .getClassicalCarrierRankTaxonomyExecutionEvidence(result);
                return {
                    subsystem,
                    rankTier,
                    sourceValid:
                        ctx.isClassicalCarrierRankTaxonomySource(source),
                    resultValid:
                        ctx.isClassicalCarrierRankTaxonomyResult(result),
                    evidenceValid:
                        ctx.isClassicalCarrierRankTaxonomyExecutionEvidence(
                            evidence,
                            result
                        ),
                    contractValid:
                        ctx.isClassicalCarrierRankTaxonomyOperationContract(
                            result.operationContract
                        ),
                    owner: result.semanticOwnerId,
                    operation: result.operationId,
                    status: result.authorizationStatus,
                    family: result.hierarchyFamily,
                    rank: [
                        result.rankId,
                        result.rankLabel,
                        result.rankOrdinal,
                    ],
                    identity: result.rankIdentity,
                    executionCount: evidence.routeSteps.filter(
                        (step) => step.executedRuleIds.includes(
                            "classical.carrier.rank.taxonomy.classify"
                        )
                    ).length,
                    nonclaims: [
                        result.rankUnitConstructed,
                        result.rankUnitUpgraded,
                        result.rankPotentialAuthorized,
                        result.hierarchyPartitionAuthorized,
                        result.meaningfulUnitAuthorized,
                        result.syllableStructureAuthorized,
                        result.vocableStructureAuthorized,
                    ],
                    surfaces: [
                        result.generationAllowed,
                        result.soundedSurfaceGenerated,
                        result.writtenSurfaceGenerated,
                        result.formulaGenerated,
                    ],
                    expected,
                };
            })
        ),
        Object.entries(RANKS).flatMap(([subsystem, tiers]) =>
            Object.entries(tiers).map(([rankTier, expected]) => ({
                subsystem,
                rankTier,
                sourceValid: true,
                resultValid: true,
                evidenceValid: true,
                contractValid: true,
                owner: "carrier-rank-taxonomy",
                operation: "classical.carrier.rank.taxonomy.classify",
                status: "authorized",
                family: "meaningless",
                rank: expected,
                identity: `${subsystem}:${expected[0]}`,
                executionCount: 1,
                nonclaims: [false, false, false, false, false, false, false],
                surfaces: [false, false, false, false],
                expected,
            }))
        )
    );

    s.eq(
        "shared vocable and syllable labels do not collapse phonological and graphological rank identities",
        ["vocable", "syllable"].map((rankTier) => {
            const phonological = classify(
                ctx,
                "phonological",
                rankTier
            ).result;
            const graphological = classify(
                ctx,
                "graphological",
                rankTier
            ).result;
            return {
                rankTier,
                sameLabel: phonological.rankLabel === graphological.rankLabel,
                identities: [
                    phonological.rankIdentity,
                    graphological.rankIdentity,
                ],
                distinctIdentity:
                    phonological.rankIdentity !== graphological.rankIdentity,
            };
        }),
        ["vocable", "syllable"].map((rankTier) => ({
            rankTier,
            sameLabel: true,
            identities: [
                `phonological:${rankTier}`,
                `graphological:${rankTier}`,
            ],
            distinctIdentity: true,
        }))
    );

    s.eq(
        "meaningful-family and unsupported-tier requests are rejected without executing the carrier taxonomy",
        [
            ["meaningful", "highest"],
            ["phonological", "morpheme"],
        ].map(([subsystem, rankTier]) => {
            const { source, result } = classify(ctx, subsystem, rankTier);
            const evidence = ctx
                .getClassicalCarrierRankTaxonomyExecutionEvidence(result);
            return {
                subsystem,
                rankTier,
                sourceValid:
                    ctx.isClassicalCarrierRankTaxonomySource(source),
                sourceReason: source.blockReason,
                resultValid:
                    ctx.isClassicalCarrierRankTaxonomyResult(result),
                resultReason: result.blockReason,
                evidenceValid:
                    ctx.isClassicalCarrierRankTaxonomyExecutionEvidence(
                        evidence,
                        result
                    ),
                executed: evidence.routeSteps.some(
                    (step) => step.executedRuleIds.includes(
                        "classical.carrier.rank.taxonomy.classify"
                    )
                ),
            };
        }),
        [
            {
                subsystem: "meaningful",
                rankTier: "highest",
                sourceValid: false,
                sourceReason: "carrier-rank-taxonomy-subsystem-required",
                resultValid: true,
                resultReason: "carrier-rank-taxonomy-subsystem-required",
                evidenceValid: true,
                executed: false,
            },
            {
                subsystem: "phonological",
                rankTier: "morpheme",
                sourceValid: false,
                sourceReason: "carrier-rank-taxonomy-rank-tier-required",
                resultValid: true,
                resultReason: "carrier-rank-taxonomy-rank-tier-required",
                evidenceValid: true,
                executed: false,
            },
        ]
    );

    s.eq(
        "rank labels, hierarchy tables, expected ranks, lessons, surfaces, formulas, and answers cannot enter the Source",
        [
            ["rankLabel", "stress group"],
            ["hierarchyTable", ["stress group", "vocable"]],
            ["expectedRank", "stress-group"],
            ["hierarchyFamily", "meaningless"],
            ["lessonId", 1],
            ["surface", "stress group"],
            ["formula", "stress group > vocable"],
            ["canvasAnswer", "stress group"],
        ].map(([field, value]) => {
            const source = ctx.buildClassicalCarrierRankTaxonomySource({
                subsystem: "phonological",
                rankTier: "highest",
                [field]: value,
            });
            const result = ctx.evaluateClassicalCarrierRankTaxonomy(source);
            return [
                field,
                source.authorizationStatus,
                source.blockReason,
                result.authorizationStatus,
                result.blockReason,
            ];
        }),
        [
            "rankLabel",
            "hierarchyTable",
            "expectedRank",
            "hierarchyFamily",
            "lessonId",
            "surface",
            "formula",
            "canvasAnswer",
        ].map((field) => [
            field,
            "blocked",
            `carrier-rank-taxonomy-source-unrecognized-constituent:${field}`,
            "blocked",
            `carrier-rank-taxonomy-source-unrecognized-constituent:${field}`,
        ])
    );

    s.eq(
        "copied Sources and Results lose identity authority",
        (() => {
            const original = classify(ctx, "phonological", "highest");
            const copiedSource = Object.freeze({ ...original.source });
            const copiedSourceResult = ctx
                .evaluateClassicalCarrierRankTaxonomy(copiedSource);
            const copiedResult = Object.freeze({ ...original.result });
            return {
                copiedSourceValid:
                    ctx.isClassicalCarrierRankTaxonomySource(copiedSource),
                copiedSourceResultValid:
                    ctx.isClassicalCarrierRankTaxonomyResult(
                        copiedSourceResult
                    ),
                copiedSourceReason: copiedSourceResult.blockReason,
                copiedSourceExecuted: ctx
                    .getClassicalCarrierRankTaxonomyExecutionEvidence(
                        copiedSourceResult
                    ).routeSteps.some((step) =>
                        step.executedRuleIds.includes(
                            "classical.carrier.rank.taxonomy.classify"
                        )),
                copiedResultValid:
                    ctx.isClassicalCarrierRankTaxonomyResult(copiedResult),
            };
        })(),
        {
            copiedSourceValid: false,
            copiedSourceResultValid: true,
            copiedSourceReason:
                "owner-issued-carrier-rank-taxonomy-source-required",
            copiedSourceExecuted: false,
            copiedResultValid: false,
        }
    );

    const forgedSource = Object.freeze({
        kind: "classical-carrier-rank-taxonomy-source",
        version: 1,
        authorizationStatus: "authorized",
        blockReason: "",
        subsystem: "phonological",
        rankTier: "highest",
    });
    s.eq(
        "a structurally forged Source cannot execute the taxonomy owner",
        (() => {
            const result = ctx
                .evaluateClassicalCarrierRankTaxonomy(forgedSource);
            return {
                sourceValid:
                    ctx.isClassicalCarrierRankTaxonomySource(forgedSource),
                resultValid:
                    ctx.isClassicalCarrierRankTaxonomyResult(result),
                status: result.authorizationStatus,
                reason: result.blockReason,
            };
        })(),
        {
            sourceValid: false,
            resultValid: true,
            status: "blocked",
            reason: "owner-issued-carrier-rank-taxonomy-source-required",
        }
    );

    return s;
}

module.exports = { run };
