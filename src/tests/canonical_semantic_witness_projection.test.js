"use strict";

const { createSuite } = require("./runner");

const REPRESENTATIVE_COORDINATES = Object.freeze([
    {
        "executionFunctionName": "buildClassicalAdverbialNuclearValidationFrame",
        "ownerId": "classical-adverbial-vnc-possessive-first-degree-restriction",
        "prefix": "ClassicalAdverbialVncPossessiveFirstDegreeRestriction",
        "domain": "classical-adverbial-vnc-possessive-first-degree-restriction",
        "selection": "claim-p4144",
        "facet": "p4144-vncs-and-possessive-state-nncs-permit-only-first-degree"
    },
    {
        "executionFunctionName": "buildClassicalNahuatlAdmonitiveValidationFrame",
        "ownerId": "classical-admonitive-antecessive-contrast-analysis",
        "prefix": "ClassicalAdmonitiveAntecessiveContrastAnalysis",
        "domain": "classical-admonitive-antecessive-contrast-analysis",
        "selection": "claim-p1139",
        "facet": "p1139-remarks-the-admonitive-is-clearly-distinguished-from-the-optative"
    },
    {
        "executionFunctionName": "buildClassicalNahuatlAffectiveNncValidationFrame",
        "ownerId": "classical-affective-affinity-absolutive",
        "prefix": "ClassicalAffectiveAffinityAbsolutive",
        "domain": "classical-affective-affinity-absolutive",
        "selection": "claim-p3156",
        "facet": "p3156-the-affective-matrix-stern-takes-a-reduplicated-prefix-without"
    },
    {
        "executionFunctionName": "buildClassicalNahuatlApplicativeValidationFrame",
        "ownerId": "classical-applicative-unattested-source-licensing",
        "prefix": "ClassicalApplicativeUnattestedSourceLicensing",
        "domain": "classical-applicative-unattested-source-licensing",
        "selection": "claim-p2540",
        "facet": "p2540-at-times-the-source-stem-is-not-attested"
    },
    {
        "executionFunctionName": "buildClassicalNahuatlCardinalNumeralValidationFrame",
        "ownerId": "classical-numeral-base",
        "prefix": "ClassicalNumeralBase",
        "domain": "classical-numeral-base",
        "selection": "claim-p3253",
        "facet": "p3253-the-successive-orders-are-therefore-one-twenty-four-hundred"
    },
    {
        "executionFunctionName": "buildClassicalNahuatlCompoundNncValidationFrame",
        "ownerId": "classical-compound-nnc-affinity",
        "prefix": "ClassicalCompoundNncAffinity",
        "domain": "classical-compound-nnc-affinity",
        "selection": "claim-p3122",
        "facet": "p3122-at-times-however-the-notion-of-affinity-is-expressed"
    },
    {
        "executionFunctionName": "buildClassicalNahuatlDeverbalNncValidationFrame",
        "ownerId": "classical-agentive-source-stage-semantic-contrast",
        "prefix": "ClassicalAgentiveSourceStageSemanticContrast",
        "domain": "classical-agentive-source-stage-semantic-contrast",
        "selection": "claim-p3525",
        "facet": "p3525-the-notion-of-habitual-action-implicit-in-the-customary"
    },
    {
        "executionFunctionName": "buildClassicalNahuatlIrregularValidationFrame",
        "ownerId": "classical-amia-irregular-paradigm",
        "prefix": "ClassicalAmiaIrregularParadigm",
        "domain": "classical-amia-irregular-paradigm",
        "selection": "claim-p1205",
        "facet": "p1205-am-i-a-am-i-h-to-exist-this"
    }
]);


const BROAD_SUFFIXES = Object.freeze([
    "authorizationstatus",
    "gcdsatisfied",
    "lcmcomplete",
    "ownerexecutioncompleted",
    "blocksinput",
    "formulaoutputallowed",
    "classificationstatus",
]);

const NON_SEMANTIC_KEYS = new Set([
    "authorizationStatus",
    "finiteAuthorizationStatus",
    "inventoryAuthorizationStatus",
    "gcdSatisfied",
    "lcmComplete",
    "ownerExecutionCompleted",
    "blocksInput",
    "formulaOutputAllowed",
    "classificationStatus",
    "kind",
    "version",
]);

function meaningful(value, key = "", seen = new WeakSet()) {
    if (value == null) return false;
    if (typeof value !== "object") {
        if (NON_SEMANTIC_KEYS.has(key)) return false;
        if (/authority$/iu.test(key)) return false;
        if (typeof value === "string") return value.trim() !== "";
        return true;
    }
    if (seen.has(value)) return false;
    seen.add(value);
    if (Array.isArray(value)) {
        return value.some((item) => meaningful(item, key, seen));
    }
    return Reflect.ownKeys(value).some((childKey) => {
        if (typeof childKey !== "string") return false;
        if (NON_SEMANTIC_KEYS.has(childKey)) return false;
        if (/authority$/iu.test(childKey)) return false;
        const descriptor = Object.getOwnPropertyDescriptor(
            value,
            childKey
        );
        return Boolean(
            descriptor
            && Object.prototype.hasOwnProperty.call(
                descriptor,
                "value"
            )
            && meaningful(
                descriptor.value,
                childKey,
                seen
            )
        );
    });
}

function run(ctx = {}) {
    const s = createSuite(
        "canonical_semantic_witness_projection"
    );
    const failures = [];

    for (const definition of REPRESENTATIVE_COORDINATES) {
        const buildName = `build${definition.prefix}Source`;
        const evaluateName = `evaluate${definition.prefix}`;
        const evidenceName =
            `get${definition.prefix}ExecutionEvidence`;
        const evidenceValidatorName =
            `is${definition.prefix}ExecutionEvidence`;
        try {
            const source = ctx[buildName]({
                analysisDomain: definition.domain,
                selection: definition.selection,
                requestedFacet: definition.facet,
                participantChoice:
                    `${definition.selection}:${definition.facet}`,
            });
            const result = ctx[evaluateName](source);
            const evidence = ctx[evidenceName](result);
            const exact = ctx.getCanonicalProofAddress(
                result.payload?.proofAddressId
            );
            const legacy = ctx.getCanonicalProofAddress(
                result.payload?.legacyProofAddressId
            );
            const effectivePath =
                result.payload?.effectiveCanonicalPath || "";
            const valid = Boolean(
                result.authorizationStatus === "authorized"
                && result.payload?.proofObservationKind
                    === "selection-specific-canonical-result-witness"
                && result.payload?.proofObservationStatus
                    === "observed"
                && result.payload?.broadCompletionProxyRetired
                    === true
                && meaningful(result.payload?.facetValue)
                && !BROAD_SUFFIXES.some((suffix) =>
                    effectivePath.toLowerCase().endsWith(suffix)
                )
                && exact?.addressSource
                    === "automatic-exact-semantic-observation"
                && legacy?.deprecated === true
                && legacy?.replacementProofAddressIds?.includes(
                    exact.proofAddressId
                )
                && ctx[evidenceValidatorName](
                    evidence,
                    result
                ) === true
                && evidence.proofAddressId
                    === result.payload.proofAddressId
                && evidence.proofObservationStatus
                    === result.payload.proofObservationStatus
            );
            if (!valid) {
                failures.push({
                    ...definition,
                    status: result?.authorizationStatus,
                    proofObservationKind:
                        result?.payload?.proofObservationKind,
                    proofObservationStatus:
                        result?.payload?.proofObservationStatus,
                    effectivePath,
                    facetValue:
                        result?.payload?.facetValue,
                    exact,
                    legacy,
                });
            }
        } catch (error) {
            failures.push({
                ...definition,
                error: String(error?.stack || error),
            });
        }
    }

    s.eq(
        "representative canonical validation lanes yield meaningful owner-issued witnesses instead of broad completion proxies",
        {
            laneCount: REPRESENTATIVE_COORDINATES.length,
            failures,
        },
        {
            laneCount: 8,
            failures: [],
        }
    );

    const effective =
        ctx.listRoutineSemanticEffectiveProofCoordinates();
    const migrated = effective.filter(
        (record) => record.migratedFromBroadCompletion
    );
    s.eq(
        "the effective proof inventory has one exact witness per legacy broad atom",
        {
            migrated: migrated.length,
            exactProofIds:
                new Set(migrated.map(
                    (record) => record.proofAddressId
                )).size,
            legacyProofIds:
                new Set(migrated.map(
                    (record) => record.legacyProofAddressId
                )).size,
            effectiveBroadPaths: migrated.filter(
                (record) => BROAD_SUFFIXES.some((suffix) =>
                    String(
                        record.effectiveCanonicalPath || ""
                    ).toLowerCase().endsWith(suffix)
                )
            ).length,
        },
        {
            migrated: 826,
            exactProofIds: 826,
            legacyProofIds: 483,
            effectiveBroadPaths: 0,
        }
    );

    return s;
}

module.exports = { run };
