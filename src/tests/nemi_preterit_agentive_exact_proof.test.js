"use strict";

const { createSuite } = require("./runner");

const EXACT_CLAIMS = Object.freeze([
    Object.freeze({
        claimId: "p3361",
        facet:
            "p3361-the-stem-of-any-kind-of-agentive-nnc-names",
        proofAddressId:
            "02f255e4-e2ef-4646-9e1c-4bbaf54d2420",
        semanticName: "preterit-agentive.semantic-role.agent",
    }),
    Object.freeze({
        claimId: "p3362",
        facet:
            "p3362-the-most-common-kind-of-agentive-nnc-is-the",
        proofAddressId:
            "51a105d3-996a-4b3f-acf1-c05be39ebaa7",
        semanticName: "preterit-agentive.taxonomy.most-common",
    }),
    Object.freeze({
        claimId: "p3363",
        facet:
            "p3363-like-all-nounstems-a-preterit-agentive-nounstem-has-two",
        proofAddressId:
            "f0ec1f09-868f-4385-ac92-fddd461cce32",
        semanticName: "preterit-agentive.stem-shapes.inventory",
    }),
    Object.freeze({
        claimId: "p3364",
        facet:
            "p3364-the-general-use-stem-is-a-compound-that-uses",
        proofAddressId:
            "0caeef7a-8c5b-43c4-9c8b-c54219342caf",
        semanticName: "preterit-agentive.general-use.compound",
    }),
    Object.freeze({
        claimId: "p3365",
        facet:
            "p3365-the-restricted-use-stem-is-simply-the-predicate-of",
        proofAddressId:
            "b49d598f-f4a4-4de1-80ad-9c1e901b7be6",
        semanticName: "preterit-agentive.restricted-stem.selected",
    }),
    Object.freeze({
        claimId: "p3366",
        facet:
            "p3366-the-restricted-use-stem-is-used-in-absolutive-state",
        proofAddressId:
            "7724581c-0c59-4af1-9d29-29de1d3e603a",
        semanticName: "preterit-agentive.state-use.absolutive",
    }),
    Object.freeze({
        claimId: "p3367",
        facet:
            "p3367-the-restricted-use-stem-is-discussed-first",
        proofAddressId:
            "e7198f9f-9d2f-4c9e-973d-bede2076ff22",
        semanticName:
            "preterit-agentive.derivation-order.restricted-before-general",
    }),
    Object.freeze({
        claimId: "p3368",
        facet:
            "p3368-the-general-use-stem-is-used-everywhere-else",
        proofAddressId:
            "49c10c73-b5ea-4ffa-9527-37f617c6f2b8",
        semanticName: "preterit-agentive.state-use.non-absolutive",
    }),
]);

function evaluateOwnerCoordinate(ctx, definition) {
    const selection = `claim-${definition.claimId}`;
    const source =
        ctx.buildClassicalPredicateNominalizationPreteritAgentiveSource({
            analysisDomain:
                "classical-predicate-nominalization-preterit-agentive",
            selection,
            requestedFacet: definition.facet,
            participantChoice: `${selection}:${definition.facet}`,
        });
    const result =
        ctx.evaluateClassicalPredicateNominalizationPreteritAgentive(
            source
        );
    const proofRecord = ctx.getCanonicalIdentitySurface(result)
        ?.records?.find((record) => (
            record.namespace === "proof-address"
            && record.identityId
                === result.payload?.proofAddressId
        )) || null;
    return { result, proofRecord };
}

function nemiRequest() {
    return {
        constructionKind: "predicate-nominalization",
        nominalizationKind: "preterit-agentive",
        source: {
            sourceStage: "preterit-predicate",
            sourceImperfectiveStem: "nemi",
            verbClass: "B",
            sourceVoice: "active",
            sourceValence: "intransitive",
            sourceObjectPattern: "none",
            sourceSubject: "3sg",
        },
        subject: "3sg",
        state: "absolutive",
    };
}

function run(ctx = {}) {
    const s = createSuite("nemi_preterit_agentive_exact_proof");

    const frame = ctx.evaluateClassicalNahuatlDeverbalNnc(
        nemiRequest()
    );
    const profile = frame.operationFrame?.semanticProfile || {};
    s.eq(
        "the canonical owner-issued chain derives nen before preterit-agentive realization",
        {
            status: frame.authorizationStatus,
            sourceImperfectiveStem:
                frame.sourceFrame?.sourceImperfectiveStem || "",
            selectedPerfectiveStem:
                frame.sourceFrame?.sourceStem || "",
            selectedByCanonicalOwner:
                frame.sourceFrame
                    ?.sourceStemDerivedByCanonicalOwner === true,
            perfectiveChangeRule:
                frame.sourceFrame?.canonicalStageDerivationFrame
                    ?.perfectiveChangeRule || "",
            restrictedUseStem:
                frame.operationFrame?.targetStems?.restrictedUse || "",
            generalUseStem:
                frame.operationFrame?.targetStems?.generalUse || "",
            selectedResultStem:
                frame.canonicalResult?.nncSlotFrame
                    ?.slots?.predicate?.stem || "",
            formula: frame.formulaRealization,
            word: frame.wordSurface,
        },
        {
            status: "authorized",
            sourceImperfectiveStem: "nemi",
            selectedPerfectiveStem: "nen",
            selectedByCanonicalOwner: true,
            perfectiveChangeRule: "class-b-m-to-n",
            restrictedUseStem: "nen-0",
            generalUseStem: "nen-0-cā",
            selectedResultStem: "nen-0",
            formula: "#0-0(nen-0)qui-0#",
            word: "nenqui",
        }
    );

    s.eq(
        "the canonical operation exposes the exact semantic relations used by proof",
        {
            agentRole: profile.agentSemanticRole,
            primaryKind: profile.agentiveTaxonomyStatus,
            stemShapes: profile.stemShapeInventory,
            restrictedSource:
                profile.restrictedUseSourceRelation?.sourceStage,
            restrictedPredicate:
                profile.restrictedUseSourceRelation
                    ?.sourcePredicateStem,
            restrictedOutput:
                profile.restrictedUseSourceRelation?.outputNounstem,
            restrictedSatisfied:
                profile.restrictedUseSourceRelation?.satisfied,
            generalEmbed:
                profile.generalUseCompound?.embedStem,
            generalMatrix:
                profile.generalUseCompound?.matrixStem,
            generalOutput:
                profile.generalUseCompound?.outputStem,
            generalSatisfied:
                profile.generalUseCompound?.satisfied,
            absolutiveRole:
                profile.stateStemDistribution?.absolutive?.stemRole,
            nonAbsolutiveRole:
                profile.stateStemDistribution
                    ?.nonAbsolutive?.stemRole,
            derivationOrder:
                profile.derivationOrder?.orderedRoles,
            derivationDependency:
                profile.derivationOrder?.dependency,
        },
        {
            agentRole: "agent-of-action",
            primaryKind: "most-common-agentive-nnc",
            stemShapes: ["restricted-use", "general-use"],
            restrictedSource: "preterit-predicate",
            restrictedPredicate: "nen",
            restrictedOutput: "nen-0",
            restrictedSatisfied: true,
            generalEmbed: "nen-0",
            generalMatrix: "cā",
            generalOutput: "nen-0-cā",
            generalSatisfied: true,
            absolutiveRole: "restricted-use",
            nonAbsolutiveRole: "general-use",
            derivationOrder: ["restricted-use", "general-use"],
            derivationDependency:
                "general-use-embeds-restricted-use",
        }
    );

    const ownerCoordinates = EXACT_CLAIMS.map((definition) => {
        const { result, proofRecord } =
            evaluateOwnerCoordinate(ctx, definition);
        return {
            claimId: definition.claimId,
            status: result.authorizationStatus,
            proofAddressId:
                result.payload?.proofAddressId || "",
            expectedProofAddressId: definition.proofAddressId,
            semanticName:
                result.payload?.proofSemanticName || "",
            expectedSemanticName: definition.semanticName,
            currentLocation:
                proofRecord?.currentLocation || "",
            broadCompletionPath:
                /(?:authorizationStatus|gcdSatisfied|lcmComplete)$/u
                    .test(proofRecord?.currentLocation || ""),
            observedValue:
                result.payload?.facetValue,
            validationNemi:
                result.payload?.definition
                    ?.cases?.preteritAgentiveNemi || null,
        };
    });

    s.eq(
        "all eight Lesson 35 atoms use distinct exact permanent proof checkpoints",
        ownerCoordinates.map((record) => ({
            claimId: record.claimId,
            status: record.status,
            proofAddressMatches:
                record.proofAddressId
                === record.expectedProofAddressId,
            semanticNameMatches:
                record.semanticName
                === record.expectedSemanticName,
            broadCompletionPath: record.broadCompletionPath,
            observedValuePresent:
                record.observedValue !== undefined
                && record.observedValue !== null
                && record.observedValue !== "",
        })),
        EXACT_CLAIMS.map(({ claimId }) => ({
            claimId,
            status: "authorized",
            proofAddressMatches: true,
            semanticNameMatches: true,
            broadCompletionPath: false,
            observedValuePresent: true,
        }))
    );

    s.eq(
        "the owner validation projection carries the same nemi Result rather than reconstructing it",
        (() => {
            const validation = ownerCoordinates[0].validationNemi || {};
            return {
                status: validation.authorizationStatus,
                sourceImperfectiveStem:
                    validation.sourceImperfectiveStem,
                selectedPerfectiveStem: validation.sourceStem,
                selectedByCanonicalOwner:
                    validation.sourceStemDerivedByCanonicalOwner,
                perfectiveChangeRule:
                    validation.perfectiveChangeRule,
                restrictedUseStem:
                    validation.targetStems?.restrictedUse,
                selectedResultStem:
                    validation.selectedResultStem,
                formula: validation.formulaRealization,
                word: validation.wordSurface,
            };
        })(),
        {
            status: "authorized",
            sourceImperfectiveStem: "nemi",
            selectedPerfectiveStem: "nen",
            selectedByCanonicalOwner: true,
            perfectiveChangeRule: "class-b-m-to-n",
            restrictedUseStem: "nen-0",
            selectedResultStem: "nen-0",
            formula: "#0-0(nen-0)qui-0#",
            word: "nenqui",
        }
    );

    s.eq(
        "the exact proof values state the individual grammatical claims",
        {
            agentRole: ownerCoordinates[0].observedValue,
            primaryKind: ownerCoordinates[1].observedValue,
            stemShapes: ownerCoordinates[2].observedValue,
            generalUseCompound:
                ownerCoordinates[3].observedValue?.satisfied,
            restrictedSource:
                ownerCoordinates[4].observedValue?.sourceStage,
            restrictedStateRole:
                ownerCoordinates[5].observedValue?.stemRole,
            derivationDependency:
                ownerCoordinates[6].observedValue?.dependency,
            nonAbsolutiveStateRole:
                ownerCoordinates[7].observedValue?.stemRole,
        },
        {
            agentRole: "agent-of-action",
            primaryKind: "most-common-agentive-nnc",
            stemShapes: ["restricted-use", "general-use"],
            generalUseCompound: true,
            restrictedSource: "preterit-predicate",
            restrictedStateRole: "restricted-use",
            derivationDependency:
                "general-use-embeds-restricted-use",
            nonAbsolutiveStateRole: "general-use",
        }
    );

    return s;
}

module.exports = { run };
