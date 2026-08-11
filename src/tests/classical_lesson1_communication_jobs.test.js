"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function runConcept(ctx, selection) {
    const source = ctx.buildClassicalGrammarConceptSource({
        domain: "communication",
        selection,
    });
    const receipt = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "concept:classification",
        args: [source],
        languageId: "classical-nahuatl",
    });
    const result = receipt.canonicalResult;
    const evidence = ctx.getClassicalGrammarConceptExecutionEvidence(result);
    return {
        status: receipt.authorizationStatus,
        classification: result?.classification || "",
        facts: result?.facts || [],
        relations: result?.relations || [],
        routeStepIds: evidence?.routeSteps?.map(step => step.stepId) || [],
        routeIdentity: receipt.greatestCommonDivisor
            .invariantProofs["semantic-operation-identity"],
    };
}

function readMutationProbe() {
    const conceptsPath = path.join(
        ROOT,
        "src/core/concepts/concepts.mjs"
    );
    const script = `
        const fs = await import("node:fs");
        const path = await import("node:path");
        const url = await import("node:url");
        const sourcePath = ${JSON.stringify(conceptsPath)};
        const sourceDirectory = path.dirname(sourcePath);
        let source = fs.readFileSync(sourcePath, "utf8");
        const replacements = [
            ['facts: ["primary-use-communication"]', 'facts: ["not-primary-use"]'],
            ['      "speaker",', '      "speaker-removed",'],
            ['"shared-rules-constrain-selection-and-integration"', '"shared-rules-ignored"'],
            ['"carrier-content-coupling"', '"carrier-content-separated"'],
            ['"duality-or-double-articulation"', '"duality-removed"'],
            ['classification: "carrier-system"', 'classification: "broken-carrier-system"'],
            ['classification: "content-system"', 'classification: "broken-content-system"'],
            ['relations: ["phonological-subsystem", "sigological-subsystem"]', 'relations: ["one-carrier-subsystem-only"]'],
            ['"derived-from-phonological-subsystem"', '"not-derived-from-phonology"']
        ];
        for (const [from, to] of replacements) {
            const next = source.replace(from, to);
            if (next === source) throw new Error("mutation did not apply: " + from);
            source = next;
        }
        source = source.replace(
            /from\\s+(["'])(\\.{1,2}\\/[^"']+)\\1/gu,
            (_match, quote, relativePath) => {
                const absoluteUrl = url.pathToFileURL(
                    path.resolve(sourceDirectory, relativePath)
                ).href;
                return "from " + quote + absoluteUrl + quote;
            }
        );
        const module = await import(
            "data:text/javascript;base64,"
            + Buffer.from(source).toString("base64")
            + "#lesson1-communication-mutations"
        );
        const api = module.createConceptsApi({});
        const selections = [
            "language",
            "communication-event",
            "carrier-system",
            "content-system",
            "graphological-subsystem"
        ];
        const results = Object.fromEntries(selections.map(selection => {
            const conceptSource = api.buildClassicalGrammarConceptSource({
                domain: "communication",
                selection
            });
            const result = api.evaluateClassicalGrammarConcept(conceptSource);
            return [selection, {
                classification: result.classification,
                facts: result.facts,
                relations: result.relations
            }];
        }));
        process.stdout.write(JSON.stringify(results));
    `;
    const result = spawnSync(
        process.execPath,
        ["--input-type=module", "--eval", script],
        { cwd: ROOT, encoding: "utf8", maxBuffer: 10 * 1024 * 1024 }
    );
    if (result.status !== 0) {
        throw new Error(result.stderr || "communication mutation probe failed");
    }
    return JSON.parse(result.stdout);
}

function run(ctx) {
    const s = createSuite("classical_lesson1_communication_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT,
        "docs/canvas-progress/lesson1-job-ledger.json"
    ), "utf8"));
    const records = ledger.records.filter(record =>
        record.canvasSection === "§1.4"
    );
    const normal = {
        language: runConcept(ctx, "language"),
        event: runConcept(ctx, "communication-event"),
        carrier: runConcept(ctx, "carrier-system"),
        content: runConcept(ctx, "content-system"),
        graphological: runConcept(ctx, "graphological-subsystem"),
    };
    const mutation = readMutationProbe();

    s.eq(
        "all section 1.4 atoms build the shared communication model rather than a separate generator",
        {
            count: records.length,
            jobTypes: [...new Set(records.map(record => record.jobType))],
            owners: [...new Set(records.map(record => record.targetOwnerId))],
            unassigned: records.filter(record => !record.observationKind)
                .map(record => record.atomId),
        },
        {
            count: 9,
            jobTypes: ["BUILD_CODE_MODEL"],
            owners: ["linguistic-communication-structure"],
            unassigned: [],
        }
    );

    for (const record of records) {
        let actual;
        let expected;
        switch (record.observationKind) {
        case "language-primary-communication-function":
            actual = {
                status: normal.language.status,
                classification: normal.language.classification,
                factPresent: normal.language.facts.includes(
                    "primary-use-communication"
                ),
                mutationBreaksObservation: !mutation.language.facts.includes(
                    "primary-use-communication"
                ),
            };
            expected = {
                status: "authorized",
                classification: "communication-system",
                factPresent: true,
                mutationBreaksObservation: true,
            };
            break;
        case "communication-participant-information-medium-model":
            actual = {
                status: normal.event.status,
                parts: ["speaker", "addressee", "information", "medium"]
                    .filter(part => normal.event.facts.includes(part)),
                mutationBreaksObservation:
                    !mutation["communication-event"].facts.includes("speaker"),
            };
            expected = {
                status: "authorized",
                parts: ["speaker", "addressee", "information", "medium"],
                mutationBreaksObservation: true,
            };
            break;
        case "shared-rules-mediate-communication":
            actual = {
                relationPresent: normal.event.relations.includes(
                    "shared-rules-constrain-selection-and-integration"
                ),
                executionObserved: normal.event.routeStepIds.includes(
                    "communication-rule-mediated-sequence-validated"
                ),
                mutationBreaksObservation:
                    !mutation["communication-event"].relations.includes(
                        "shared-rules-constrain-selection-and-integration"
                    ),
            };
            expected = {
                relationPresent: true,
                executionObserved: true,
                mutationBreaksObservation: true,
            };
            break;
        case "carrier-content-coupling":
            actual = {
                relationPresent: normal.event.relations.includes(
                    "carrier-content-coupling"
                ),
                executionObserved: normal.event.routeStepIds.includes(
                    "information-medium-coupling-validated"
                ),
                mutationBreaksObservation:
                    !mutation["communication-event"].relations.includes(
                        "carrier-content-coupling"
                    ),
            };
            expected = {
                relationPresent: true,
                executionObserved: true,
                mutationBreaksObservation: true,
            };
            break;
        case "duality-or-double-articulation":
            actual = {
                factPresent: normal.event.facts.includes(
                    "duality-or-double-articulation"
                ),
                routeIdentity: normal.event.routeIdentity,
                mutationBreaksObservation:
                    !mutation["communication-event"].facts.includes(
                        "duality-or-double-articulation"
                    ),
            };
            expected = {
                factPresent: true,
                routeIdentity: true,
                mutationBreaksObservation: true,
            };
            break;
        case "carrier-system-classification":
            actual = {
                classification: normal.carrier.classification,
                mutationBreaksObservation:
                    mutation["carrier-system"].classification
                        !== "carrier-system",
            };
            expected = {
                classification: "carrier-system",
                mutationBreaksObservation: true,
            };
            break;
        case "content-system-classification":
            actual = {
                classification: normal.content.classification,
                mutationBreaksObservation:
                    mutation["content-system"].classification
                        !== "content-system",
            };
            expected = {
                classification: "content-system",
                mutationBreaksObservation: true,
            };
            break;
        case "phonological-and-sigological-subsystems":
            actual = {
                relations: normal.carrier.relations,
                mutationBreaksObservation:
                    !mutation["carrier-system"].relations.includes(
                        "phonological-subsystem"
                    ),
            };
            expected = {
                relations: ["phonological-subsystem", "sigological-subsystem"],
                mutationBreaksObservation: true,
            };
            break;
        default:
            actual = {
                classification: normal.graphological.classification,
                relationPresent: normal.graphological.relations.includes(
                    "derived-from-phonological-subsystem"
                ),
                mutationBreaksObservation:
                    !mutation["graphological-subsystem"].relations.includes(
                        "derived-from-phonological-subsystem"
                    ),
            };
            expected = {
                classification: "derived-carrier-subsystem",
                relationPresent: true,
                mutationBreaksObservation: true,
            };
        }
        s.eq(
            `${record.atomId} performs its exact communication-model job`,
            { atomId: record.atomId, behavior: actual },
            { atomId: record.atomId, behavior: expected }
        );
    }

    return s;
}

module.exports = { run };
