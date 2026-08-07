"use strict";

const { createSuite } = require("./runner");
const {
    createClassicalSgrBrowserSweepArtifact,
    createClassicalSgrUnobservedSweepReport,
    serializeClassicalSgrBrowserSweepArtifact,
} = require("./helpers/classical_sgr_recipe_executor.mjs");

const INVENTORY_DIGEST = "a".repeat(64);
const RECIPE_DIGEST = "b".repeat(64);

function run() {
    const suite = createSuite("classical_sgr_browser_sweep_artifact");

    suite.eq(
        "canonical JSON serialization is independent of object insertion order",
        serializeClassicalSgrBrowserSweepArtifact({
            z: 3,
            a: { y: 2, x: 1 },
            omitted: undefined,
        }),
        "{\n  \"a\": {\n    \"x\": 1,\n    \"y\": 2\n  },\n  \"z\": 3\n}\n"
    );

    const unobservedReport = createClassicalSgrUnobservedSweepReport();
    const routeFailureArtifact = createClassicalSgrBrowserSweepArtifact({
        report: unobservedReport,
        diagnostic: { scenarioSnapshots: [] },
        recipeValidation: { valid: true, problems: [] },
        inventoryDigest: INVENTORY_DIGEST,
        recipeDigest: RECIPE_DIGEST,
        executionFailureCode: "route-evaluation-failed",
    });
    suite.eq(
        "an unobserved failed sweep preserves all 239 outcomes and partitions all public gaps as route-missing",
        {
            digests: routeFailureArtifact.digests,
            atomOutcomeCount: routeFailureArtifact.atomOutcomes.length,
            counts: routeFailureArtifact.counts,
            partitions: Object.fromEntries(Object.entries(
                routeFailureArtifact.failurePartitions
            ).map(([partition, value]) => [partition, value.atomCount])),
            failurePartitionIsExact:
                routeFailureArtifact.integrity.failurePartitionIsExact,
            complete: routeFailureArtifact.complete,
        },
        {
            digests: {
                inventorySha256: INVENTORY_DIGEST,
                recipeSha256: RECIPE_DIGEST,
            },
            atomOutcomeCount: 239,
            counts: {
                atomOutcomeCount: 239,
                uniqueAtomOutcomeCount: 239,
                public: {
                    expected: 98,
                    materialized: 0,
                    unmaterialized: 98,
                },
                private: { expected: 141, inert: 141, exposed: 0 },
                unexpectedDomIds: 0,
            },
            partitions: {
                "recipe-invalid": 0,
                "route-missing": 98,
                "projection-missing": 0,
                "private-exposure": 0,
            },
            failurePartitionIsExact: true,
            complete: false,
        }
    );

    const projectionTarget = unobservedReport.publicAtomOutcomes[0];
    const privateTarget = unobservedReport.privateAtomOutcomes[0];
    const classifiedReport = {
        ...unobservedReport,
        atomOutcomes: unobservedReport.atomOutcomes.map(entry => {
            if (entry.atomId === projectionTarget.atomId) {
                return {
                    ...entry,
                    primaryReason: "no-correlated-live-dom-node-observed",
                    reasons: ["no-correlated-live-dom-node-observed"],
                };
            }
            if (entry.atomId === privateTarget.atomId) {
                return {
                    ...entry,
                    outcome: "private-exposed",
                    passed: false,
                    primaryReason: "private-atom-exposed-in-live-dom",
                    reasons: ["private-atom-exposed-in-live-dom"],
                };
            }
            return entry;
        }),
    };
    const scenario = {
        familyId: "family-z",
        caseId: "case-z",
        activatesOperationIds: [projectionTarget.operationId],
        activeOperationIds: [projectionTarget.operationId],
        outcomeCodes: ["ready-for-observation", "control-applied"],
        elapsedMs: 9876,
        traceStart: 44,
        port: 60993,
    };
    const classifiedArtifact = createClassicalSgrBrowserSweepArtifact({
        report: classifiedReport,
        diagnostic: { scenarioSnapshots: [scenario] },
        recipeValidation: { valid: true, problems: [] },
        inventoryDigest: INVENTORY_DIGEST,
        recipeDigest: RECIPE_DIGEST,
    });
    const classifiedJson = serializeClassicalSgrBrowserSweepArtifact(
        classifiedArtifact
    );
    suite.eq(
        "route, projection, and private failures are disjoint while timing and process carriers are omitted",
        {
            projectionAtomIds: classifiedArtifact.failurePartitions[
                "projection-missing"
            ].atoms.map(entry => entry.atomId),
            routeCount: classifiedArtifact.failurePartitions[
                "route-missing"
            ].atomCount,
            privateAtomIds: classifiedArtifact.failurePartitions[
                "private-exposure"
            ].atoms.map(entry => entry.atomId),
            failurePartitionIsExact:
                classifiedArtifact.integrity.failurePartitionIsExact,
            containsTiming: classifiedJson.includes("elapsedMs"),
            containsTraceIndex: classifiedJson.includes("traceStart"),
            containsPort: classifiedJson.includes("60993"),
        },
        {
            projectionAtomIds: [projectionTarget.atomId],
            routeCount: 97,
            privateAtomIds: [privateTarget.atomId],
            failurePartitionIsExact: true,
            containsTiming: false,
            containsTraceIndex: false,
            containsPort: false,
        }
    );

    const invalidArtifact = createClassicalSgrBrowserSweepArtifact({
        report: unobservedReport,
        diagnostic: { scenarioSnapshots: [] },
        recipeValidation: {
            valid: false,
            problems: ["z-problem", "a-problem", "z-problem"],
        },
        inventoryDigest: INVENTORY_DIGEST,
        recipeDigest: RECIPE_DIGEST,
    });
    suite.eq(
        "invalid recipes own every public failure without overlap",
        {
            problems: invalidArtifact.failurePartitions[
                "recipe-invalid"
            ].problems,
            recipeInvalidCount: invalidArtifact.failurePartitions[
                "recipe-invalid"
            ].atomCount,
            routeMissingCount: invalidArtifact.failurePartitions[
                "route-missing"
            ].atomCount,
            projectionMissingCount: invalidArtifact.failurePartitions[
                "projection-missing"
            ].atomCount,
            exact: invalidArtifact.integrity.failurePartitionIsExact,
        },
        {
            problems: [
                "a-problem",
                "registry-validation-failed",
                "z-problem",
            ],
            recipeInvalidCount: 98,
            routeMissingCount: 0,
            projectionMissingCount: 0,
            exact: true,
        }
    );

    return suite;
}

module.exports = { run };
