"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

const EXPECTATIONS = Object.freeze({
    "morpheme-type-and-name": [
        ["morpheme", "facts", "morpheme-type-level-linguistic-element"],
        ["morpheme", "facts", "morph-greek-root-means-shape-form"],
    ],
    "morpheme-carrier-content-amalgam": [
        ["morpheme", "facts", "carrier-content-symbiotic-amalgam"],
    ],
    "morpheme-formation-parts": [
        ["morpheme", "facts", "sememe-or-sememe-cluster-combines-with-phoneme-unit-or-sigeme"],
        ["morpheme", "relations", "carrier-is-phoneme-unit-or-sigeme"],
    ],
    "morpheme-center-of-duality": [
        ["morpheme", "facts", "carrier-content-amalgam-is-center-of-linguistic-duality"],
    ],
    "morpheme-smallest-duality-unit": [
        ["morpheme", "facts", "smallest-duality-manifesting-unit"],
    ],
    "morpheme-duality-section-link": [
        ["morpheme", "facts", "linguistic-duality-defined-in-section-1.4"],
    ],
    "morpheme-grapheme-exclusion": [
        ["morpheme", "restrictions", "grapheme-is-not-full-morpheme-carrier"],
    ],
    "morpheme-symbiotic-notation": [
        ["morpheme", "facts", "notation-indicates-symbiotic-nature"],
    ],
    "morpheme-fraction-notation-possibility": [
        ["morpheme", "facts", "fraction-format-is-possible-morpheme-notation"],
        ["morpheme", "restrictions", "fraction-format-is-not-canonical-lesson-notation"],
    ],
    "morpheme-economical-lesson-notation": [
        ["morpheme", "facts", "slash-carrier-gloss-notation-saves-space"],
    ],
    "morpheme-carrier-shorthand": [
        ["morpheme", "facts", "carrier-only-representation-may-leave-content-understood"],
    ],
    "morpheme-carrier-nonconflation": [
        ["morpheme", "restrictions", "carrier-alone-is-not-morpheme"],
    ],
    "portmanteau-content-cluster": [
        ["portmanteau", "facts", "content-cluster"],
        ["portmanteau", "facts", "two-or-more-sememes"],
        ["portmanteau", "facts", "no-separate-carrier-per-sememe"],
    ],
    "portmanteau-indivisible-content-cluster": [
        ["portmanteau", "facts", "indivisibly-joined-sememes"],
    ],
    "morpheme-elements-exist-through-cooperation": [
        ["morpheme", "facts", "carrier-content-cooperation-constitutes-elements"],
    ],
    "carrier-system-exists-through-morphemes": [
        ["morpheme", "facts", "carrier-system-has-linguistic-existence-through-morphemes"],
    ],
    "content-system-exists-through-morphemes": [
        ["morpheme", "facts", "content-system-has-linguistic-existence-through-morphemes"],
    ],
    "systems-cooperate-to-form-morphemes": [
        ["morpheme", "relations", "carrier-system-and-content-system-cooperate-in-morpheme"],
    ],
    "three-morpheme-kinds": [
        ["morpheme", "facts", "three-symbiotic-morpheme-kinds"],
    ],
    "connective-sound-without-sememe": [
        ["connective", "facts", "phoneme-unit-carrier"],
        ["connective", "facts", "no-sememe"],
        ["connective", "relations", "sound-plus-no-sememic-meaning"],
    ],
    "connective-english-example-check": [
        ["connective", "facts", "no-sememe"],
        ["connective", "restrictions", "english-example-does-not-authorize-morpheme-source"],
    ],
    "connective-grammatical-not-sememic-meaning": [
        ["connective", "facts", "grammatical-meaning-without-sememic-meaning"],
    ],
    "ordinary-sound-plus-meaning": [
        ["ordinary", "facts", "sound-plus-meaning"],
        ["ordinary", "relations", "sound-plus-meaning-classifies-ordinary-morpheme"],
    ],
    "ordinary-english-pits-example-check": [
        ["ordinary", "facts", "multiple-ordinary-morphemes-may-cooccur-in-one-word"],
        ["ordinary", "restrictions", "english-example-does-not-authorize-morpheme-source"],
    ],
    "silent-no-sound-plus-meaning": [
        ["silent", "facts", "sigeme-carrier"],
        ["silent", "facts", "sememe-unit-content"],
        ["silent", "facts", "no-sound-plus-meaning"],
    ],
    "silent-english-pit-two-morpheme-check": [
        ["silent", "relations", "sigeme-plus-sememe-classifies-silent-morpheme"],
        ["silent", "restrictions", "english-examples-do-not-authorize-morpheme-source"],
    ],
    "silent-english-pit-ordinary-check": [
        ["ordinary", "facts", "sound-plus-meaning"],
        ["ordinary", "restrictions", "english-example-does-not-authorize-morpheme-source"],
    ],
    "silent-english-singular-zero-check": [
        ["silent", "facts", "no-sound-plus-meaning"],
        ["silent", "restrictions", "displayed-zero-does-not-authorize-silent-morpheme"],
    ],
    "silent-linguistic-economy": [
        ["silent", "facts", "linguistic-economy-licenses-silence-for-default-value"],
    ],
    "silent-default-redundancy": [
        ["silent", "facts", "silent-expression-depends-on-cultural-default-redundancy"],
        ["silent", "restrictions", "requires-language-specific-default-value"],
    ],
    "silent-english-plural-sounded-check": [
        ["sounded", "facts", "phoneme-unit-carrier"],
        ["silent", "restrictions", "english-examples-do-not-authorize-morpheme-source"],
    ],
    "silent-english-present-default-check": [
        ["silent", "facts", "silent-expression-depends-on-cultural-default-redundancy"],
        ["silent", "restrictions", "english-examples-do-not-authorize-morpheme-source"],
    ],
    "silent-english-past-sounded-check": [
        ["sounded", "facts", "phoneme-unit-carrier"],
        ["silent", "restrictions", "english-examples-do-not-authorize-morpheme-source"],
    ],
    "silent-english-lean-contrast-check": [
        ["silent", "facts", "no-sound-plus-meaning"],
        ["silent", "restrictions", "english-examples-do-not-authorize-morpheme-source"],
    ],
});

const CASES = Object.freeze({
    morpheme: ["morpheme", "morpheme"],
    portmanteau: ["morpheme", "portmanteau-morpheme"],
    connective: ["morpheme", "connective-morpheme"],
    ordinary: ["morpheme", "ordinary-morpheme"],
    sounded: ["morpheme", "sounded-morpheme"],
    silent: ["morpheme", "silent-morpheme"],
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

function readMutationProbe() {
    const conceptsPath = path.join(ROOT, "src/core/concepts/concepts.mjs");
    const mutationValues = [...new Set(Object.values(EXPECTATIONS)
        .flat(2)
        .filter((value, index) => index % 3 === 2))];
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
            + "#lesson1-morpheme-mutations"
        );
        const api = module.createConceptsApi({});
        const results = Object.fromEntries(Object.entries(${JSON.stringify(CASES)}).map(
            ([key, [domain, selection]]) => {
                const conceptSource = api.buildClassicalGrammarConceptSource({ domain, selection });
                const result = api.evaluateClassicalGrammarConcept(conceptSource);
                return [key, {
                    facts: result.facts,
                    relations: result.relations,
                    restrictions: result.restrictions
                }];
            }
        ));
        process.stdout.write(JSON.stringify(results));
    `;
    const result = spawnSync(
        process.execPath,
        ["--input-type=module", "--eval", script],
        { cwd: ROOT, encoding: "utf8", maxBuffer: 10 * 1024 * 1024 }
    );
    if (result.status !== 0) {
        throw new Error(result.stderr || "morpheme mutation probe failed");
    }
    return JSON.parse(result.stdout);
}

function observes(results, assertions) {
    return assertions.every(([key, collection, value]) =>
        results[key][collection].includes(value)
    );
}

function run(ctx) {
    const s = createSuite("classical_lesson1_morpheme_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT,
        "docs/canvas-progress/lesson1-job-ledger.json"
    ), "utf8"));
    const records = ledger.records.filter(record =>
        record.canvasSection.startsWith("§1.7")
    );
    const normal = Object.fromEntries(Object.entries(CASES).map(
        ([key, [domain, selection]]) => [key, runConcept(ctx, domain, selection)]
    ));
    const mutation = readMutationProbe();

    s.eq(
        "all section 1.7 atoms define the morpheme model or check it without becoming generator rules",
        {
            count: records.length,
            byJob: records.reduce((counts, record) => {
                counts[record.jobType] = (counts[record.jobType] || 0) + 1;
                return counts;
            }, {}),
            unassigned: records.filter(record => !record.observationKind)
                .map(record => record.atomId),
        },
        {
            count: 34,
            byJob: { BUILD_CODE_MODEL: 25, CHECK_GRAMMAR: 9 },
            unassigned: [],
        }
    );

    for (const record of records) {
        const assertions = EXPECTATIONS[record.observationKind] || [];
        s.eq(
            `${record.atomId} performs its exact morpheme job`,
            {
                atomId: record.atomId,
                normalRoutesValid: Object.values(normal).every(result =>
                    result.status === "authorized" && result.routeIdentity
                ),
                exactObserved: assertions.length > 0
                    && observes(normal, assertions),
                mutationBreaksObservation: assertions.length > 0
                    && !observes(mutation, assertions),
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
