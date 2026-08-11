"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

const EXPECTATIONS = Object.freeze({
    "instance-sound-letter-meaning-manifestations": [["boundary", "facts", "instance-manifestations-are-sounds-letters-meanings"]],
    "form-instance-realizes-morph": [["form", "facts", "forms-are-instance-level-realizations-of-morphs"]],
    "instance-variability-boundary": [["instance", "facts", "instance-level-entities-are-too-variable-for-direct-grammar-description"]],
    "phone-instance-variation-check": [
        ["instance", "facts", "two-phone-instances-are-not-expected-to-be-exactly-alike"],
        ["instance", "restrictions", "pronunciation-instance-evidence-does-not-authorize-token-identity"],
    ],
    "instances-witness-abstract-levels": [["instance", "facts", "instances-are-the-only-witnesses-to-hypothesized-abstract-levels"]],
    "abstract-level-inference": [["instance", "facts", "abstract-levels-are-inferred-from-instances-by-extrapolation-and-generalization"]],
    "performance-variability-abstraction": [["instance", "facts", "abstraction-factors-out-performance-variability"]],
    "silence-excluded-from-instance-elements": [["boundary", "facts", "silence-not-instance-level-element"]],
    "sig-no-instance-presence": [
        ["boundary", "facts", "sig-has-no-instance-level-representation"],
        ["boundary", "facts", "sig-has-no-instance-level-presence"],
    ],
    "sig-presence-implicit": [["boundary", "facts", "sig-presence-is-implicit"]],
    "occurrence-silence-perception": [["boundary", "facts", "occurrence-level-silence-may-be-perceived-before-after-or-during-interruption"]],
    "occurrence-silence-audible": [["boundary", "facts", "occurrence-level-silence-is-pronunciational-and-audible"]],
    "audible-silence-not-grammatical-sig": [
        ["boundary", "facts", "audible-occurrence-silence-is-not-implicit-grammatical-sig-silence"],
        ["boundary", "restrictions", "actual-audible-silence-is-not-sig-instance"],
    ],
    "sound-obscures-morph-structure": [["sounded", "facts", "instance-level-sound-obscures-sounded-morphological-structure"]],
    "sounded-morph-recognition-difficulty": [["sounded", "facts", "sounded-morphs-do-not-eliminate-recognition-difficulty"]],
    "sigeme-content-recognition-difficulty": [
        ["sigemeContent", "facts", "phoneme-carried-sememes-can-be-difficult-to-recognize"],
        ["sigemeContent", "facts", "sigeme-carried-sememes-can-be-still-more-difficult-to-grasp"],
    ],
});

const CASES = Object.freeze({
    instance: ["analysis-level", "instance"],
    boundary: ["token-element", "instance-boundary"],
    form: ["morph-form-instance-classification", "form-instance"],
    sounded: ["morph-structure-perception-analysis", "sounded-morph-recognition"],
    sigemeContent: ["morph-structure-perception-analysis", "sigeme-content-recognition"],
});

function runConcept(ctx, domain, selection) {
    const source = ctx.buildClassicalGrammarConceptSource({ domain, selection });
    const receipt = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "concept:classification",
        args: [source],
        languageId: "classical-nahuatl",
    });
    const result = receipt.canonicalResult;
    return {
        status: receipt.authorizationStatus,
        facts: result?.facts || [],
        relations: result?.relations || [],
        restrictions: result?.restrictions || [],
        routeIdentity: receipt.greatestCommonDivisor
            .invariantProofs["semantic-operation-identity"],
    };
}

function completeContrast(candidateKind, overrides = {}) {
    return {
        candidateKind,
        correspondingPosition: "corresponding",
        structuralPattern: "similarly-structured",
        categoryRelation: "related-category",
        soundedCounterpart: "present",
        ...overrides,
    };
}

function runContrast(ctx, candidateKind, overrides = {}) {
    const source = ctx.buildClassicalSilentMorphContrastSource(
        completeContrast(candidateKind, overrides)
    );
    const receipt = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "classical.morpheme.silent.contrast.validate",
        args: [source],
        languageId: "classical-nahuatl",
    });
    return {
        applicationStatus: receipt.authorizationStatus,
        routeIdentity: receipt.greatestCommonDivisor
            .invariantProofs["semantic-operation-identity"],
        result: receipt.canonicalResult,
    };
}

function readMutationProbe() {
    const conceptsPath = path.join(ROOT, "src/core/concepts/concepts.mjs");
    const mutationValues = [
        ...new Set(Object.values(EXPECTATIONS).flat(2)
            .filter((value, index) => index % 3 === 2)),
        "contrast-justifies-silent-hypothesis",
    ];
    const script = `
        const fs = await import("node:fs");
        const path = await import("node:path");
        const url = await import("node:url");
        const sourcePath = ${JSON.stringify(conceptsPath)};
        const sourceDirectory = path.dirname(sourcePath);
        let source = fs.readFileSync(sourcePath, "utf8");
        for (const value of ${JSON.stringify(mutationValues)}) {
            const from = '"' + value + '"';
            const to = '"broken-' + value + '"';
            const next = source.replaceAll(from, to);
            if (next === source) throw new Error("mutation did not apply: " + value);
            source = next;
        }
        source = source.replace(
            /from\\s+(["'])(\\.{1,2}\\/[^"']+)\\1/gu,
            (_match, quote, relativePath) => "from " + quote
                + url.pathToFileURL(path.resolve(sourceDirectory, relativePath)).href
                + quote
        );
        const module = await import(
            "data:text/javascript;base64,"
            + Buffer.from(source).toString("base64")
            + "#lesson1-instance-mutations"
        );
        const api = module.createConceptsApi({});
        const concepts = Object.fromEntries(Object.entries(${JSON.stringify(CASES)}).map(
            ([key, [domain, selection]]) => {
                const conceptSource = api.buildClassicalGrammarConceptSource({ domain, selection });
                const result = api.evaluateClassicalGrammarConcept(conceptSource);
                return [key, { facts: result.facts, relations: result.relations, restrictions: result.restrictions }];
            }
        ));
        const contrasts = Object.fromEntries(["silent-morpheme", "silent-morph"].map(candidateKind => {
            const contrastSource = api.buildClassicalSilentMorphContrastSource({
                candidateKind,
                correspondingPosition: "corresponding",
                structuralPattern: "similarly-structured",
                categoryRelation: "related-category",
                soundedCounterpart: "present"
            });
            const result = api.evaluateClassicalSilentMorphContrast(contrastSource);
            return [candidateKind, { facts: result.facts, authorized: result.silentHypothesisAuthorized }];
        }));
        process.stdout.write(JSON.stringify({ concepts, contrasts }));
    `;
    const result = spawnSync(process.execPath, ["--input-type=module", "--eval", script], {
        cwd: ROOT,
        encoding: "utf8",
        maxBuffer: 10 * 1024 * 1024,
    });
    if (result.status !== 0) throw new Error(result.stderr || "instance mutation probe failed");
    return JSON.parse(result.stdout);
}

function observes(results, assertions) {
    return assertions.every(([key, collection, value]) => results[key][collection].includes(value));
}

function contrastExactlyWorks(ctx, candidateKind) {
    const valid = runContrast(ctx, candidateKind);
    const invalidCases = [
        { correspondingPosition: "noncorresponding" },
        { structuralPattern: "differently-structured" },
        { categoryRelation: "unrelated-category" },
        { soundedCounterpart: "absent" },
    ].map(overrides => {
        const source = ctx.buildClassicalSilentMorphContrastSource(
            completeContrast(candidateKind, overrides)
        );
        return ctx.evaluateClassicalSilentMorphContrast(source);
    });
    return valid.applicationStatus === "authorized"
        && valid.routeIdentity
        && valid.result.silentHypothesisAuthorized === true
        && valid.result.facts.includes("contrast-justifies-silent-hypothesis")
        && invalidCases.every(result =>
            result.authorizationStatus === "blocked"
            && result.silentHypothesisAuthorized === false
        );
}

function run(ctx) {
    const s = createSuite("classical_lesson1_instance_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson1-job-ledger.json"
    ), "utf8"));
    const records = ledger.records.filter(record => record.canvasSection.startsWith("§1.9"));
    const normal = Object.fromEntries(Object.entries(CASES).map(
        ([key, [domain, selection]]) => [key, runConcept(ctx, domain, selection)]
    ));
    const mutation = readMutationProbe();

    s.eq(
        "section 1.9 separates the instance model, evidence check, and real silent-contrast grammar",
        {
            count: records.length,
            byJob: records.reduce((counts, record) => {
                counts[record.jobType] = (counts[record.jobType] || 0) + 1;
                return counts;
            }, {}),
            unassigned: records.filter(record => !record.observationKind).map(record => record.atomId),
        },
        {
            count: 18,
            byJob: { BUILD_CODE_MODEL: 15, CHECK_GRAMMAR: 1, BUILD_GRAMMAR: 2 },
            unassigned: [],
        }
    );

    for (const record of records) {
        const silentKind = record.observationKind === "silent-morpheme-requires-sounded-contrast"
            ? "silent-morpheme"
            : record.observationKind === "silent-morph-requires-sounded-contrast"
                ? "silent-morph"
                : "";
        const assertions = EXPECTATIONS[record.observationKind] || [];
        const exactObserved = silentKind
            ? contrastExactlyWorks(ctx, silentKind)
            : assertions.length > 0 && observes(normal, assertions);
        const mutationBreaksObservation = silentKind
            ? mutation.contrasts[silentKind].authorized
                && !mutation.contrasts[silentKind].facts.includes("contrast-justifies-silent-hypothesis")
            : assertions.length > 0 && !observes(mutation.concepts, assertions);
        s.eq(
            `${record.atomId} performs its exact instance-level job`,
            {
                atomId: record.atomId,
                normalRoutesValid: Object.values(normal).every(result =>
                    result.status === "authorized" && result.routeIdentity
                ),
                exactObserved,
                mutationBreaksObservation,
            },
            {
                atomId: record.atomId,
                normalRoutesValid: true,
                exactObserved: true,
                mutationBreaksObservation: true,
            }
        );
    }

    return s;
}

module.exports = { run };
