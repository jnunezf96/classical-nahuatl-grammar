"use strict";

const { createSuite } = require("./runner");

function requireAuthorized(ctx, receipt, label) {
    if (
        !ctx.isClassicalGrammarApplicationResult(receipt)
        || receipt.authorizationStatus !== "authorized"
    ) {
        throw new Error(
            `lessons40-58-exact-composition:${label}:`
            + `${receipt?.blockReason || "blocked"}`
        );
    }
    return receipt;
}

function execute(ctx, operationId, args) {
    return ctx.executeClassicalGrammarApplicationRequest({
        operationId,
        args,
    });
}

function issueOrdinaryNnc(ctx, stem, sourceClass = "") {
    const source = ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({
        stem,
        ...(sourceClass ? { sourceClass } : {}),
    });
    const operation = ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(
        source,
        {
            state: "absolutive",
            subject: "3sg",
            sentenceType: "statement",
            polarity: "positive",
        }
    );
    return requireAuthorized(
        ctx,
        execute(ctx, "nnc:ordinary", [source, operation]),
        `ordinary:${stem}`
    );
}

function observationFor(ctx, receipt, innerOperationId, outerOperationId) {
    return ctx.getClassicalGrammarApplicationRhymeOwnerProofObservations(
        receipt
    ).find(observation => (
        observation.innerOperationId === innerOperationId
        && observation.outerOperationId === outerOperationId
    )) || null;
}

function immediateEdge(graph, innerReceipt, outerReceipt) {
    return graph?.edges?.find(edge => (
        edge.innerApplicationResult === innerReceipt
        && edge.outerApplicationResult === outerReceipt
    )) || null;
}

function run(ctx = {}) {
    const suite = createSuite(
        "classical_lessons40_58_exact_compositional_closure"
    );

    const noun = issueOrdinaryNnc(ctx, "mich");
    const denominalInventory =
        ctx.prepareClassicalDenominalVncOperationPathInventory({
            canonicalNncResult: noun.canonicalResult,
        });
    const inceptive = denominalInventory.pathChoices.find(choice => (
        choice.operationPath.join(">") === "inceptive-ti"
        && choice.finalClassChoice === "A"
    ));
    const denominal = requireAuthorized(
        ctx,
        execute(ctx, "vnc:denominal", [{
            ...inceptive.sourceRequest,
            operationPath: inceptive.operationPath,
            classChoices: inceptive.classChoices,
            subject: "3sg",
            mood: "indicative",
            tense: "present",
        }]),
        "denominal"
    );
    const missingPersonalNameChoice = execute(
        ctx,
        "nnc:personal-name",
        [{
            canonicalSourceResult: denominal.canonicalResult,
            outerSubject: "3sg",
        }]
    );
    const personalName = requireAuthorized(
        ctx,
        execute(ctx, "nnc:personal-name", [{
            canonicalSourceResult: denominal.canonicalResult,
            sourceFamily: "present-agentive",
            outerSubject: "3sg",
        }]),
        "personal-name"
    );
    const nounToDenominal = observationFor(
        ctx,
        denominal,
        "nnc:ordinary",
        "vnc:denominal"
    );
    const denominalToName = observationFor(
        ctx,
        personalName,
        "vnc:denominal",
        "nnc:personal-name"
    );
    const chainGraph = ctx.getClassicalGrammarApplicationLayerGraph(
        personalName
    );
    suite.eq(
        "Lessons 54-56 extend one exact NNC Result through a depth-three owner chain",
        {
            pairs: [
                nounToDenominal && [
                    nounToDenominal.innerOperationId,
                    nounToDenominal.outerOperationId,
                ],
                denominalToName && [
                    denominalToName.innerOperationId,
                    denominalToName.outerOperationId,
                ],
            ],
            exactIdentities: [
                nounToDenominal?.innerCanonicalResult
                    === noun.canonicalResult,
                nounToDenominal?.outerCanonicalResult
                    === denominal.canonicalResult,
                denominalToName?.innerCanonicalResult
                    === denominal.canonicalResult,
                denominalToName?.outerCanonicalResult
                    === personalName.canonicalResult,
                personalName.canonicalResult.canonicalSourceResult
                    === denominal.canonicalResult,
            ],
            exactEdges: [
                immediateEdge(chainGraph, noun, denominal)
                    ?.exactInnerResultIdentityObservedInOuterArguments,
                immediateEdge(chainGraph, denominal, personalName)
                    ?.exactInnerResultIdentityObservedInOuterArguments,
            ],
            maximumDepth: chainGraph.maximumDepth,
            authorizedSurface:
                personalName.canonicalResult.writtenProjection?.result,
        },
        {
            pairs: [
                ["nnc:ordinary", "vnc:denominal"],
                ["vnc:denominal", "nnc:personal-name"],
            ],
            exactIdentities: Array(5).fill(true),
            exactEdges: [true, true],
            maximumDepth: 3,
            authorizedSurface: "michti",
        }
    );

    const copiedDenominal = execute(ctx, "nnc:personal-name", [{
        canonicalSourceResult: { ...denominal.canonicalResult },
        sourceFamily: "present-agentive",
        outerSubject: "3sg",
    }]);
    const forgedPersonalName = execute(
        ctx,
        "nnc:personal-name",
        [{
            canonicalSourceResult: {
                ...denominal.canonicalResult,
                surfaceRealization: "forged",
            },
            sourceFamily: "present-agentive",
            outerSubject: "3sg",
        }]
    );
    suite.eq(
        "the missing choice recovers on the same identity while copies and forged authority fail closed",
        {
            missingChoice: [
                missingPersonalNameChoice.authorizationStatus,
                missingPersonalNameChoice.blockReason,
            ],
            recovered: [
                personalName.authorizationStatus,
                personalName.canonicalResult.canonicalSourceResult
                    === denominal.canonicalResult,
            ],
            copied: [
                copiedDenominal.authorizationStatus,
                copiedDenominal.blockReason,
                ctx.getClassicalGrammarApplicationRhymeOwnerProofObservations(
                    copiedDenominal
                ).length,
            ],
            forged: [
                forgedPersonalName.authorizationStatus,
                forgedPersonalName.blockReason,
                ctx.getClassicalGrammarApplicationRhymeOwnerProofObservations(
                    forgedPersonalName
                ).length,
            ],
        },
        {
            missingChoice: [
                "blocked",
                "personal-name-exact-source-choice-required:source-family",
            ],
            recovered: ["authorized", true],
            copied: [
                "blocked",
                "exact-owner-issued-vnc-nnc-or-clause-result-required",
                0,
            ],
            forged: [
                "blocked",
                "exact-owner-issued-vnc-nnc-or-clause-result-required",
                0,
            ],
        }
    );

    const baseVnc = requireAuthorized(
        ctx,
        execute(ctx, "vnc:application", [{
            sourceStem: "nemi",
            verbClass: "B",
            sourceValence: "intransitive",
            subject: "3sg",
            requestedDerivation: "direct",
            requestedVoice: "active",
            mood: "indicative",
            tense: "present",
            outputScope: "single",
        }]),
        "reorder-base-vnc"
    );
    const sharedStart = requireAuthorized(
        ctx,
        execute(ctx, "vnc:sentence-result", [baseVnc.canonicalResult]),
        "reorder-shared-start"
    );
    const oc = ctx.buildClassicalNahuatlParticleSourceFrame("l3-oc");
    const auh = ctx.buildClassicalNahuatlParticleSourceFrame(
        "l3-auh-conjunctor"
    );

    const adverbialFirst = requireAuthorized(
        ctx,
        execute(ctx, "sentence:adverbial-adjunction", [{
            particleSourceFrame: oc,
            nuclearResultFrame: sharedStart.canonicalResult,
        }]),
        "adverbial-first"
    );
    const particleSecond = requireAuthorized(
        ctx,
        execute(ctx, "sentence:particle-adjunction", [{
            particleSourceFrame: auh,
            consumedSentenceFrame: adverbialFirst.canonicalResult,
        }]),
        "particle-second"
    );
    const particleFirst = requireAuthorized(
        ctx,
        execute(ctx, "sentence:particle-adjunction", [{
            particleSourceFrame: auh,
            nuclearResultFrame: sharedStart.canonicalResult,
        }]),
        "particle-first"
    );
    const adverbialSecond = requireAuthorized(
        ctx,
        execute(ctx, "sentence:adverbial-adjunction", [{
            particleSourceFrame: oc,
            consumedSentenceFrame: particleFirst.canonicalResult,
        }]),
        "adverbial-second"
    );
    const startToAdverbial = observationFor(
        ctx,
        adverbialFirst,
        "vnc:sentence-result",
        "sentence:adverbial-adjunction"
    );
    const adverbialToParticle = observationFor(
        ctx,
        particleSecond,
        "sentence:adverbial-adjunction",
        "sentence:particle-adjunction"
    );
    const startToParticle = observationFor(
        ctx,
        particleFirst,
        "vnc:sentence-result",
        "sentence:particle-adjunction"
    );
    const particleToAdverbial = observationFor(
        ctx,
        adverbialSecond,
        "sentence:particle-adjunction",
        "sentence:adverbial-adjunction"
    );
    suite.eq(
        "the same exact Result supports both A-then-B and B-then-A with distinct outcomes",
        {
            sameStart: [
                startToAdverbial?.innerCanonicalResult
                    === sharedStart.canonicalResult,
                startToParticle?.innerCanonicalResult
                    === sharedStart.canonicalResult,
            ],
            pairs: [
                adverbialToParticle && [
                    adverbialToParticle.innerOperationId,
                    adverbialToParticle.outerOperationId,
                ],
                particleToAdverbial && [
                    particleToAdverbial.innerOperationId,
                    particleToAdverbial.outerOperationId,
                ],
            ],
            exactHandoffs: [
                adverbialToParticle?.innerCanonicalResult
                    === adverbialFirst.canonicalResult,
                particleToAdverbial?.innerCanonicalResult
                    === particleFirst.canonicalResult,
            ],
            outcomes: [
                particleSecond.canonicalResult.sentenceSurfaceDisplay,
                adverbialSecond.canonicalResult.sentenceSurfaceDisplay,
            ],
        },
        {
            sameStart: [true, true],
            pairs: [
                [
                    "sentence:adverbial-adjunction",
                    "sentence:particle-adjunction",
                ],
                [
                    "sentence:particle-adjunction",
                    "sentence:adverbial-adjunction",
                ],
            ],
            exactHandoffs: [true, true],
            outcomes: ["Auh oc nemi", "Oc auh nemi"],
        }
    );

    return suite;
}

module.exports = { run };
