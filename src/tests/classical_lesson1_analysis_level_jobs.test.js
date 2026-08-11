"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

const EXPECTATIONS = Object.freeze({
    "type-level-classification": ["type", "classification", "type-level"],
    "token-level-classification": ["token", "classification", "token-level"],
    "instance-level-classification": ["instance", "classification", "instance-level"],
    "type-abstract-generalization": ["type", "facts", "ideal-abstract-generalizing-entity"],
    "type-hypothetical-class": ["type", "facts", "hypothetical-identificational-class"],
    "type-eme-label": ["type", "relations", "identified-by-eme-label"],
    "type-slash-notation-check": ["type", "facts", "slash-notation-documents-type-level-item"],
    "type-representation-selected-by-analyst": ["type", "facts", "analyst-selects-type-representation-shape"],
    "type-representation-explanatory-power": ["type", "facts", "explanatory-power-guides-type-representation"],
    "type-representation-not-frequency": ["type", "facts", "frequency-does-not-govern-type-representation"],
    "token-particularizes-type": ["token", "facts", "type-particularization"],
    "token-may-add-conditioned-variation": ["token", "facts", "may-add-environment-conditioned-variation"],
    "token-square-bracket-notation": ["token", "facts", "square-bracket-notation-documents-token-level-item"],
    "token-square-bracket-notation-check": ["token", "facts", "square-bracket-notation-documents-token-level-item"],
    "instance-concrete-one-time-realization": ["instance", "facts", "concrete-actual-performed-specific-one-time-realization"],
    "instance-manifests-token": ["instance", "relations", "manifests-token"],
    "instance-quotation-notation": ["instance", "facts", "quotation-marks-nontechnical-identification"],
    "type-limited-token-repertory": ["type", "relations", "represented-by-limited-token-repertory"],
    "token-unbounded-instance-repertory": ["token", "relations", "manifested-by-unbounded-instances"],
    "type-distills-token-variation": ["type", "relations", "distills-token-level-variation"],
    "token-distills-instance-details": ["token", "relations", "distills-instance-level-details"],
    "token-distills-irrelevant-instance-details": ["token", "relations", "distills-instance-level-details"],
});

function runLevel(ctx, selection) {
    const source = ctx.buildClassicalGrammarConceptSource({
        domain: "analysis-level",
        selection,
    });
    const receipt = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "concept:classification",
        args: [source],
        languageId: "classical-nahuatl",
    });
    const result = receipt.canonicalResult;
    return {
        status: receipt.authorizationStatus,
        classification: result?.classification || "",
        facts: result?.facts || [],
        relations: result?.relations || [],
        restrictions: result?.restrictions || [],
        routeIdentity: receipt.greatestCommonDivisor
            .invariantProofs["semantic-operation-identity"],
    };
}

function readMutationProbe() {
    const conceptsPath = path.join(
        ROOT,
        "src/core/concepts/concepts.mjs"
    );
    const mutationValues = [
        ...new Set(Object.values(EXPECTATIONS).map(entry => entry[2])),
        "type-representation",
        "conforms-to-type-distinguishing-function",
        "mental-construct",
        "abstraction-derived-from-experienced-similarity-difference-correspondence-and-contrast",
    ];
    const script = `
        const fs = await import("node:fs");
        const path = await import("node:path");
        const url = await import("node:url");
        const sourcePath = ${JSON.stringify(conceptsPath)};
        const sourceDirectory = path.dirname(sourcePath);
        let source = fs.readFileSync(sourcePath, "utf8");
        const classificationValues = new Set([
            "type-level",
            "token-level",
            "instance-level"
        ]);
        for (const value of ${JSON.stringify(mutationValues)}) {
            const from = classificationValues.has(value)
                ? 'classification: "' + value + '"'
                : '"' + value + '"';
            const to = classificationValues.has(value)
                ? 'classification: "broken-' + value + '"'
                : '"broken-' + value + '"';
            const next = source.replaceAll(from, to);
            if (next === source) throw new Error("mutation did not apply: " + value);
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
            + "#lesson1-analysis-level-mutations"
        );
        const api = module.createConceptsApi({});
        const results = Object.fromEntries(
            ["type", "token", "instance"].map(selection => {
                const conceptSource = api.buildClassicalGrammarConceptSource({
                    domain: "analysis-level",
                    selection
                });
                const result = api.evaluateClassicalGrammarConcept(conceptSource);
                return [selection, {
                    classification: result.classification,
                    facts: result.facts,
                    relations: result.relations,
                    restrictions: result.restrictions
                }];
            })
        );
        process.stdout.write(JSON.stringify(results));
    `;
    const result = spawnSync(
        process.execPath,
        ["--input-type=module", "--eval", script],
        { cwd: ROOT, encoding: "utf8", maxBuffer: 10 * 1024 * 1024 }
    );
    if (result.status !== 0) {
        throw new Error(result.stderr || "analysis-level mutation probe failed");
    }
    return JSON.parse(result.stdout);
}

function hasValue(result, collection, value) {
    if (collection === "classification") {
        return result.classification === value;
    }
    return result[collection].includes(value);
}

function run(ctx) {
    const s = createSuite("classical_lesson1_analysis_level_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT,
        "docs/canvas-progress/lesson1-job-ledger.json"
    ), "utf8"));
    const records = ledger.records.filter(record =>
        record.canvasSection === "§1.5"
    );
    const normal = {
        type: runLevel(ctx, "type"),
        token: runLevel(ctx, "token"),
        instance: runLevel(ctx, "instance"),
    };
    const mutation = readMutationProbe();

    s.eq(
        "all section 1.5 atoms model or check analysis levels without becoming generator rules",
        {
            count: records.length,
            byJob: records.reduce((counts, record) => {
                counts[record.jobType] = (counts[record.jobType] || 0) + 1;
                return counts;
            }, {}),
            owners: [...new Set(records.map(record => record.targetOwnerId))],
            unassigned: records.filter(record => !record.observationKind)
                .map(record => record.atomId),
        },
        {
            count: 25,
            byJob: { BUILD_CODE_MODEL: 23, CHECK_GRAMMAR: 2 },
            owners: ["linguistic-analysis-levels"],
            unassigned: [],
        }
    );

    for (const record of records) {
        let exactObserved = false;
        let mutationBreaksObservation = false;
        if (
            record.observationKind
                === "token-represents-and-conforms-to-type"
        ) {
            const values = [
                "type-representation",
                "conforms-to-type-distinguishing-function",
            ];
            exactObserved = values.every(value =>
                normal.token.facts.includes(value)
            );
            mutationBreaksObservation = values.some(value =>
                !mutation.token.facts.includes(value)
            );
        } else if (
            record.observationKind === "type-and-token-mental-constructs"
        ) {
            exactObserved = normal.type.facts.includes("mental-construct")
                && normal.token.facts.includes("mental-construct");
            mutationBreaksObservation =
                !mutation.type.facts.includes("mental-construct")
                || !mutation.token.facts.includes("mental-construct");
        } else if (
            record.observationKind === "abstraction-from-experienced-contrasts"
        ) {
            const value =
                "abstraction-derived-from-experienced-similarity-difference-correspondence-and-contrast";
            exactObserved = normal.type.facts.includes(value)
                && normal.token.facts.includes(value);
            mutationBreaksObservation = !mutation.type.facts.includes(value)
                || !mutation.token.facts.includes(value);
        } else {
            const [selection, collection, value] = EXPECTATIONS[
                record.observationKind
            ] || [];
            exactObserved = Boolean(selection)
                && hasValue(normal[selection], collection, value);
            mutationBreaksObservation = Boolean(selection)
                && !hasValue(mutation[selection], collection, value);
        }
        s.eq(
            `${record.atomId} performs its exact type-token-instance job`,
            {
                atomId: record.atomId,
                status: normal.type.routeIdentity
                    && normal.token.routeIdentity
                    && normal.instance.routeIdentity,
                exactObserved,
                mutationBreaksObservation,
            },
            {
                atomId: record.atomId,
                status: true,
                exactObserved: true,
                mutationBreaksObservation: true,
            }
        );
    }

    return s;
}

module.exports = { run };
