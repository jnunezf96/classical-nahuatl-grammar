"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

const EXPECTATIONS = Object.freeze({
    "element-basic-linear-unit": ["element", "facts", "not-linearly-decomposable"],
    "element-feature-bundle": ["element", "facts", "may-be-feature-bundle"],
    "four-type-element-kinds": ["inventory", "facts", "basic-type-level-element-kinds"],
    "carrier-element-partition": ["inventory", "relations", "carrier-elements-phoneme-grapheme-sigeme"],
    "content-element-partition": ["inventory", "relations", "content-element-sememe"],
    "phoneme-phonological-membership": ["phoneme", "facts", "phonological-subsystem-member"],
    "phoneme-meaning-distinguishing": ["phoneme", "facts", "meaningless-but-meaning-distinguishing"],
    "phoneme-distinctive-feature-organization": ["phoneme", "facts", "distinctive-feature-organization"],
    "phoneme-language-specific-identity": ["phoneme", "facts", "enculturated-functional-distinctiveness-establishes-phoneme-identity"],
    "foreign-phoneme-example-check": ["phoneme", "restrictions", "foreign-language-examples-are-witnesses-only"],
    "phoneme-inventory-language-specific": ["phoneme", "facts", "phonemic-inventory-particular-to-language"],
    "phoneme-one-symbol": ["phoneme", "facts", "one-sound-one-alphabetic-symbol"],
    "phoneme-special-symbols": ["phoneme", "facts", "special-phonemic-symbols-may-be-required"],
    "later-nahuatl-phoneme-owner": ["phoneme", "facts", "nahuatl-phonemic-symbols-defined-in-sections-2.2-2.3"],
    "grapheme-graphological-membership": ["grapheme", "facts", "graphological-subsystem-member"],
    "grapheme-visual-representation": ["grapheme", "facts", "visual-representation-of-linguistic-sound"],
    "grapheme-identically-valued-set": ["grapheme", "facts", "identically-valued-shape-set"],
    "grapheme-shape-variation": ["grapheme", "facts", "recognizable-value-across-script-print-case-and-typeface"],
    "grapheme-phoneme-correspondence": ["grapheme", "facts", "phoneme-correspondence-may-be-many-to-many"],
    "carrier-system-wider-than-phonology": ["carrier", "relations", "sigological-subsystem"],
    "phoneme-only-carrier-assumption-rejected": ["carrier", "relations", "sigological-subsystem"],
    "sigeme-is-meaning-carrier": ["sigeme", "facts", "soundless-element-carries-meaning-as-effectively-as-sounded-one"],
    "sigeme-single-member-inventory": ["sigeme", "facts", "one-sigeme-per-language-system"],
    "sigeme-meaning-bearing-silence": ["sigeme", "facts", "single-membered-meaning-bearing-silence-set"],
    "sigeme-oval-zero-notation": ["sigeme", "facts", "slash-oval-zero-symbol"],
    "sigeme-slash-distinction": ["sigeme", "facts", "slash-distinguishes-zero-from-vowel-o"],
    "sememe-only-content-element": ["sememe", "facts", "only-content-element-kind"],
    "sememe-meaningfulness-set": ["sememe", "facts", "meaningfulness-set"],
    "semantic-component-beyond-content-system": ["sememe", "facts", "semantic-component-exceeds-content-system"],
});

const GREEK_FACTS = Object.freeze([
    "phoneme-from-greek-phon-sound",
    "grapheme-from-greek-graph-writing",
    "sigeme-from-greek-sig-silence",
    "sememe-from-greek-sem-sign",
]);

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
        classification: result?.classification || "",
        facts: result?.facts || [],
        relations: result?.relations || [],
        restrictions: result?.restrictions || [],
        routeIdentity: receipt.greatestCommonDivisor
            .invariantProofs["semantic-operation-identity"],
    };
}

function readMutationProbe() {
    const conceptsPath = path.join(ROOT, "src/core/concepts/concepts.mjs");
    const mutationValues = [
        ...new Set(Object.values(EXPECTATIONS).map(entry => entry[2])),
        ...GREEK_FACTS,
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
            + "#lesson1-element-mutations"
        );
        const api = module.createConceptsApi({});
        const cases = {
            element: ["linguistic-element", "element"],
            inventory: ["linguistic-element", "type-level-inventory"],
            phoneme: ["linguistic-element", "phoneme"],
            grapheme: ["linguistic-element", "grapheme"],
            sigeme: ["linguistic-element", "sigeme"],
            sememe: ["linguistic-element", "sememe"],
            carrier: ["communication", "carrier-system"]
        };
        const results = Object.fromEntries(Object.entries(cases).map(
            ([key, [domain, selection]]) => {
                const conceptSource = api.buildClassicalGrammarConceptSource({
                    domain,
                    selection
                });
                const result = api.evaluateClassicalGrammarConcept(conceptSource);
                return [key, {
                    classification: result.classification,
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
        throw new Error(result.stderr || "element mutation probe failed");
    }
    return JSON.parse(result.stdout);
}

function includes(result, collection, value) {
    return result[collection].includes(value);
}

function run(ctx) {
    const s = createSuite("classical_lesson1_element_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT,
        "docs/canvas-progress/lesson1-job-ledger.json"
    ), "utf8"));
    const records = ledger.records.filter(record =>
        record.canvasSection.startsWith("§1.6")
    );
    const normal = {
        element: runConcept(ctx, "linguistic-element", "element"),
        inventory: runConcept(ctx, "linguistic-element", "type-level-inventory"),
        phoneme: runConcept(ctx, "linguistic-element", "phoneme"),
        grapheme: runConcept(ctx, "linguistic-element", "grapheme"),
        sigeme: runConcept(ctx, "linguistic-element", "sigeme"),
        sememe: runConcept(ctx, "linguistic-element", "sememe"),
        carrier: runConcept(ctx, "communication", "carrier-system"),
    };
    const mutation = readMutationProbe();

    s.eq(
        "all section 1.6 atoms model or check elements without becoming generator rules",
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
            count: 40,
            byJob: { BUILD_CODE_MODEL: 30, CHECK_GRAMMAR: 10 },
            unassigned: [],
        }
    );

    for (const record of records) {
        let exactObserved;
        let mutationBreaksObservation;
        if (record.observationKind === "element-greek-root-terminology") {
            exactObserved = GREEK_FACTS.every(value =>
                normal.inventory.facts.includes(value)
            );
            mutationBreaksObservation = GREEK_FACTS.some(value =>
                !mutation.inventory.facts.includes(value)
            );
        } else {
            const [key, collection, value] = EXPECTATIONS[
                record.observationKind
            ] || [];
            exactObserved = Boolean(key)
                && includes(normal[key], collection, value);
            mutationBreaksObservation = Boolean(key)
                && !includes(mutation[key], collection, value);
        }
        s.eq(
            `${record.atomId} performs its exact carrier-or-content element job`,
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
