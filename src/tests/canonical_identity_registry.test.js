"use strict";

const { createSuite } = require("./runner");

const UUID_PATTERN =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/u;

function byNamespace(manifest, namespace) {
    return (manifest?.records || []).filter(
        (record) => record.namespace === namespace
    );
}

function run(ctx = {}) {
    const s = createSuite("canonical_identity_registry");

    s.eq(
        "the runtime exposes read-only canonical identity inspection",
        [
            "getCanonicalIdentityRecord",
            "getCanonicalIdentityId",
            "getCanonicalIdentitySurface",
            "listCanonicalIdentityRecords",
            "isCanonicalIdentityRecord",
        ].map((name) => [name, typeof ctx[name]]),
        [
            ["getCanonicalIdentityRecord", "function"],
            ["getCanonicalIdentityId", "function"],
            ["getCanonicalIdentitySurface", "function"],
            ["listCanonicalIdentityRecords", "function"],
            ["isCanonicalIdentityRecord", "function"],
        ]
    );

    const nemiFacet =
        "p1216-nemi-nen-to-live-vncs-built-on-these-stems";
    const nemiSource = ctx.buildClassicalNemiIrregularParadigmSource({
        analysisDomain: "classical-nemi-irregular-paradigm",
        selection: "claim-p1216",
        requestedFacet: nemiFacet,
        participantChoice: `claim-p1216:${nemiFacet}`,
    });
    const nemiResult =
        ctx.evaluateClassicalNemiIrregularParadigm(nemiSource);
    const nemiManifest = ctx.getCanonicalIdentitySurface(nemiResult);
    const nemiProof = byNamespace(
        nemiManifest,
        "proof-address"
    )[0];

    s.eq(
        "the original nemi proof address remains permanent while its observed value stays separate",
        {
            resultStatus: nemiResult.authorizationStatus,
            observedValue: nemiResult.payload.facetValue,
            proofAddressId: nemiProof?.identityId || "",
            proofName: nemiProof?.semanticName || "",
            currentLocation: nemiProof?.currentLocation || "",
            proofIdShape: UUID_PATTERN.test(
                nemiProof?.identityId || ""
            ),
            observedValueBecameIdentity:
                nemiManifest.records.some(
                    (record) => record.semanticName === "nen"
                ),
        },
        {
            resultStatus: "authorized",
            observedValue: "nen",
            proofAddressId:
                "4d533cc8-d6c2-48fb-8bad-a85bb036f6b0",
            proofName: "stem.perfective.selected",
            currentLocation: "lesson11.selectedStem",
            proofIdShape: true,
            observedValueBecameIdentity: false,
        }
    );

    const foundationalSource =
        ctx.buildClassicalSegmentalPhonemeInventorySource({
            analysisDomain:
                "classical-segmental-phoneme-inventory",
            requestedAnalysisKind: "segmental-count",
            participantChoice: "twenty-three-segmental-phonemes",
            prerequisites: {},
        });
    const foundationalResult =
        ctx.evaluateClassicalSegmentalPhonemeInventory(
            foundationalSource
        );
    const foundationalManifest =
        ctx.getCanonicalIdentitySurface(foundationalResult);

    s.eq(
        "foundational owners receive permanent owner, operation, frame-kind, and analysis-coordinate identities",
        {
            status: foundationalResult.authorizationStatus,
            ownerCount:
                byNamespace(foundationalManifest, "owner").length,
            operationCount:
                byNamespace(foundationalManifest, "operation").length,
            frameKindCount:
                byNamespace(foundationalManifest, "frame-kind").length,
            coordinateNames: byNamespace(
                foundationalManifest,
                "analysis-coordinate"
            ).map((record) => record.semanticName),
            allOpaque: foundationalManifest.records.every(
                (record) => UUID_PATTERN.test(record.identityId)
            ),
        },
        {
            status: "authorized",
            ownerCount: 1,
            operationCount: 1,
            frameKindCount: 3,
            coordinateNames: ["segmental-count"],
            allOpaque: true,
        }
    );

    const linguisticSource =
        ctx.buildComparativeWordSentenceFragmentAnalysisSource({
            analysisDomain: "english-spanish-word-rank-comparison",
            requestedAnalysisKind: "general-sentence-fragment",
        });
    const linguisticResult =
        ctx.evaluateComparativeWordSentenceFragmentAnalysis(
            linguisticSource
        );
    const linguisticEvidence =
        ctx.getComparativeWordSentenceFragmentAnalysisExecutionEvidence(
            linguisticResult
        );
    const evidenceManifest =
        ctx.getCanonicalIdentitySurface(linguisticEvidence);

    s.eq(
        "bespoke route steps and branches receive opaque identities without changing their readable labels",
        {
            status: linguisticResult.authorizationStatus,
            routeStepCount:
                byNamespace(evidenceManifest, "route-step").length,
            routeBranchCount:
                byNamespace(evidenceManifest, "route-branch").length,
            readableStepRetained:
                linguisticEvidence.routeSteps.some(
                    (step) => step.stepId
                        === "general-word-sentence-fragment-checkpoint"
                ),
            allOpaque: [
                ...byNamespace(evidenceManifest, "route-step"),
                ...byNamespace(evidenceManifest, "route-branch"),
            ].every((record) => UUID_PATTERN.test(record.identityId)),
        },
        {
            status: "authorized",
            routeStepCount: 6,
            routeBranchCount: 6,
            readableStepRetained: true,
            allOpaque: true,
        }
    );

    const conceptSource = ctx.buildClassicalGrammarConceptSource({
        domain: "terminology",
        selection: "nounstem",
    });
    const conceptResult =
        ctx.evaluateClassicalGrammarConcept(conceptSource);
    const conceptManifest =
        ctx.getCanonicalIdentitySurface(conceptResult);

    s.eq(
        "older bespoke concept owners are covered by the same identity inspector",
        {
            status: conceptResult.authorizationStatus,
            owner: byNamespace(conceptManifest, "owner")
                .map((record) => record.semanticName),
            operations: byNamespace(conceptManifest, "operation")
                .map((record) => record.semanticName),
            selection: byNamespace(conceptManifest, "selection")
                .map((record) => record.semanticName),
            allOpaque: conceptManifest.records.every(
                (record) => UUID_PATTERN.test(record.identityId)
            ),
        },
        {
            status: "authorized",
            owner: ["classical-linguistic-concept-owner"],
            operations: ["concept:classification"],
            selection: ["nounstem"],
            allOpaque: true,
        }
    );

    const inventory = ctx.listCanonicalIdentityRecords();
    const counts = inventory.reduce((output, record) => {
        output[record.namespace]
            = (output[record.namespace] || 0) + 1;
        return output;
    }, {});

    s.ok(
        "the installed registry covers every routine and shared foundational owner inventory",
        counts.owner >= 1600
            && counts.operation >= 1600
            && counts["semantic-coordinate"] >= 5130
            && counts.assertion === 5130
            && counts["proof-address"] >= 4691
            && counts["analysis-coordinate"] >= 63
            && counts.selection >= 4969
    );

    s.ok(
        "every installed canonical identity record is frozen, opaque, and non-authorizing",
        inventory.length > 30000
            && inventory.every((record) => (
                ctx.isCanonicalIdentityRecord(record)
                && record.identityAuthority === false
                && record.grammarAuthority === false
                && UUID_PATTERN.test(record.identityId)
            ))
    );

    return s;
}

module.exports = { run };
