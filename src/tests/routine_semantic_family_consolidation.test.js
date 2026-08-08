"use strict";

const { createSuite } = require("./runner");

const UUID_PATTERN =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/u;

function evaluateOwner(ctx, {
    prefix,
    domain,
    claim,
    facet,
}) {
    const source = ctx[`build${prefix}Source`]({
        analysisDomain: domain,
        selection: claim,
        requestedFacet: facet,
        participantChoice: `${claim}:${facet}`,
    });
    return ctx[`evaluate${prefix}`](source);
}

function metricDelta(after, before, key) {
    return Number(after?.[key] || 0) - Number(before?.[key] || 0);
}

function run(ctx = {}) {
    const s = createSuite("routine_semantic_family_consolidation");

    s.eq(
        "the runtime exposes read-only grammatical-family inspection",
        [
            "getCanonicalGrammarFamilyForOwner",
            "getCanonicalGrammarFamilyMetrics",
            "getRoutineSemanticFamilyForOwner",
            "getRoutineSemanticFamilyMetrics",
            "isCanonicalGrammarFamilyRecord",
            "isRoutineSemanticFamilyRecord",
            "listCanonicalGrammarFamilies",
            "listRoutineSemanticFamilies",
        ].map((name) => [name, typeof ctx[name]]),
        [
            ["getCanonicalGrammarFamilyForOwner", "function"],
            ["getCanonicalGrammarFamilyMetrics", "function"],
            ["getRoutineSemanticFamilyForOwner", "function"],
            ["getRoutineSemanticFamilyMetrics", "function"],
            ["isCanonicalGrammarFamilyRecord", "function"],
            ["isRoutineSemanticFamilyRecord", "function"],
            ["listCanonicalGrammarFamilies", "function"],
            ["listRoutineSemanticFamilies", "function"],
        ]
    );

    const routineFamilies = ctx.listRoutineSemanticFamilies();
    const allFamilies = ctx.listCanonicalGrammarFamilies();
    const preteritFamily = ctx.getCanonicalGrammarFamilyForOwner(
        "classical-predicate-nominalization-preterit-agentive"
    );

    s.eq(
        "all 1,617 owner identities are organized behind 170 grammatical families",
        {
            familyCount: allFamilies.length,
            ownerAdapterCount: allFamilies.reduce(
                (total, family) => total + family.memberOwnerCount,
                0
            ),
            multiMemberFamilyCount: allFamilies.filter(
                (family) => family.memberOwnerCount > 1
            ).length,
            singletonFamilyCount: allFamilies.filter(
                (family) => family.memberOwnerCount === 1
            ).length,
            routineFamilyCount: routineFamilies.length,
            routineOwnerAdapterCount: routineFamilies.reduce(
                (total, family) => total + family.memberOwnerCount,
                0
            ),
            systemKinds: [...new Set(allFamilies.flatMap(
                (family) => family.systemKinds
            ))].sort(),
            allReadOnly: allFamilies.every((family) => (
                ctx.isCanonicalGrammarFamilyRecord(family)
                && family.grammarAuthority === false
                && family.identityAuthority === false
                && UUID_PATTERN.test(family.familyIdentityId)
            )),
        },
        {
            familyCount: 170,
            ownerAdapterCount: 1617,
            multiMemberFamilyCount: 50,
            singletonFamilyCount: 120,
            routineFamilyCount: 164,
            routineOwnerAdapterCount: 1563,
            systemKinds: [
                "carrier-structure",
                "conceptual-structure",
                "foundational",
                "linguistic-structure",
                "morpheme-structure",
                "nuclear-grammar",
                "routine",
            ],
            allReadOnly: true,
        }
    );

    s.eq(
        "the complete preterit-agentive jurisdiction is one family with eight canonical execution lanes",
        {
            familyOwnerId: preteritFamily?.familyOwnerId || "",
            familyKind: preteritFamily?.familyKind || "",
            memberOwnerCount: preteritFamily?.memberOwnerCount || 0,
            executionLaneCount: preteritFamily?.executionLaneCount || 0,
            canonicalActorCount:
                preteritFamily?.canonicalActorIds?.length || 0,
            containsCoreOwner:
                preteritFamily?.memberOwnerIds?.includes(
                    "classical-predicate-nominalization-preterit-agentive"
                ) === true,
            containsRestrictedOwner:
                preteritFamily?.memberOwnerIds?.includes(
                    "classical-preterit-agentive-restricted-use"
                ) === true,
            containsAdverbialOwner:
                preteritFamily?.memberOwnerIds?.includes(
                    "classical-adverbial-preterit-agentive-regular-intransitive"
                ) === true,
        },
        {
            familyOwnerId: "classical-preterit-agentive-family",
            familyKind: "grammatical-family",
            memberOwnerCount: 35,
            executionLaneCount: 8,
            canonicalActorCount: 8,
            containsCoreOwner: true,
            containsRestrictedOwner: true,
            containsAdverbialOwner: true,
        }
    );

    const before = ctx.getCanonicalGrammarFamilyMetrics(
        "classical-preterit-agentive-family"
    );
    const coreResult = evaluateOwner(ctx, {
        prefix: "ClassicalPredicateNominalizationPreteritAgentive",
        domain: "classical-predicate-nominalization-preterit-agentive",
        claim: "claim-p3361",
        facet: "p3361-the-stem-of-any-kind-of-agentive-nnc-names",
    });
    const restrictedResult = evaluateOwner(ctx, {
        prefix: "ClassicalPreteritAgentiveRestrictedUse",
        domain: "classical-preterit-agentive-restricted-use",
        claim: "claim-p3369",
        facet:
            "p3369-a-preterit-tense-vnc-is-converted-into-an-absolutive",
    });
    const after = ctx.getCanonicalGrammarFamilyMetrics(
        "classical-preterit-agentive-family"
    );

    s.eq(
        "legacy owner APIs remain identity-bound proof adapters while one family kernel reuses the canonical Result",
        {
            coreStatus: coreResult.authorizationStatus,
            coreOwnerId: coreResult.semanticOwnerId,
            coreObservedValue: coreResult.payload?.facetValue,
            restrictedStatus: restrictedResult.authorizationStatus,
            restrictedOwnerId: restrictedResult.semanticOwnerId,
            restrictedObservedValue:
                restrictedResult.payload?.facetValue,
            invocationDelta: metricDelta(after, before, "invocationCount"),
            cacheHitDelta: metricDelta(after, before, "cacheHitCount"),
            cacheMissDelta: metricDelta(after, before, "cacheMissCount"),
            cacheEntryDelta: metricDelta(after, before, "cacheEntryCount"),
        },
        {
            coreStatus: "authorized",
            coreOwnerId:
                "classical-predicate-nominalization-preterit-agentive",
            coreObservedValue: "agent-of-action",
            restrictedStatus: "authorized",
            restrictedOwnerId:
                "classical-preterit-agentive-restricted-use",
            restrictedObservedValue: "authorized",
            invocationDelta: 2,
            cacheHitDelta: 1,
            cacheMissDelta: 1,
            cacheEntryDelta: 1,
        }
    );

    s.eq(
        "the proven consolidation pattern is repeated across routine and bespoke systems",
        (() => {
            const denominalFirst = ctx.getCanonicalGrammarFamilyForOwner(
                "classical-denominal-vnc-adverbial-huia-semantics"
            );
            const denominalLast = ctx.getCanonicalGrammarFamilyForOwner(
                "classical-denominal-vnc-yo-hua-spelling-analysis"
            );
            const particle = ctx.getCanonicalGrammarFamilyForOwner(
                "classical-particle-lexicon"
            );
            const foundational = ctx.getCanonicalGrammarFamilyForOwner(
                "classical-segmental-phoneme-inventory"
            );
            const carrier = ctx.getCanonicalGrammarFamilyForOwner(
                "classical-syllable-structure"
            );
            const morpheme = ctx.getCanonicalGrammarFamilyForOwner(
                "compound-stem-formation"
            );
            const linguistic = ctx.getCanonicalGrammarFamilyForOwner(
                "conjunctive-governance-analysis"
            );
            const nuclear = ctx.getCanonicalGrammarFamilyForOwner(
                "classical-vnc"
            );
            return {
                denominalSameFamily:
                    denominalFirst?.familyIdentityId
                    === denominalLast?.familyIdentityId,
                denominalMemberCount:
                    denominalFirst?.memberOwnerCount || 0,
                particleFamily: particle?.familyOwnerId || "",
                particleMemberCount: particle?.memberOwnerCount || 0,
                foundationalFamily:
                    foundational?.familyOwnerId || "",
                foundationalMemberCount:
                    foundational?.memberOwnerCount || 0,
                carrierFamily: carrier?.familyOwnerId || "",
                carrierMemberCount: carrier?.memberOwnerCount || 0,
                morphemeFamily: morpheme?.familyOwnerId || "",
                morphemeMemberCount: morpheme?.memberOwnerCount || 0,
                linguisticFamily: linguistic?.familyOwnerId || "",
                linguisticMemberCount:
                    linguistic?.memberOwnerCount || 0,
                nuclearFamily: nuclear?.familyOwnerId || "",
                nuclearMemberCount: nuclear?.memberOwnerCount || 0,
            };
        })(),
        {
            denominalSameFamily: true,
            denominalMemberCount: 155,
            particleFamily: "classical-particle-family",
            particleMemberCount: 9,
            foundationalFamily:
                "classical-foundational-grammar-family",
            foundationalMemberCount: 11,
            carrierFamily: "classical-carrier-structure-family",
            carrierMemberCount: 11,
            morphemeFamily: "classical-morpheme-structure-family",
            morphemeMemberCount: 17,
            linguisticFamily: "classical-linguistic-structure-family",
            linguisticMemberCount: 5,
            nuclearFamily: "classical-nuclear-grammar-family",
            nuclearMemberCount: 3,
        }
    );

    return s;
}

module.exports = { run };
