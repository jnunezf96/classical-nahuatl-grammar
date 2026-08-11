"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

const EXPECTATIONS = Object.freeze({
    "token-four-kind-inventory": [["inventory", "facts", "four-basic-type-representing-token-element-kinds"]],
    "token-four-kind-names": [["inventory", "facts", "phone-graph-sig-seme-inventory"]],
    "token-morph-represents-morpheme": [["inventory", "relations", "morphs-represent-morphemes"]],
    "phone-token-noncontrastive-definition": [
        ["phone", "facts", "token-level-nondistinctive-phoneme-representation"],
        ["phone", "facts", "noncontrastive-phone"],
        ["phone", "facts", "specifiable-environment-required"],
    ],
    "phone-english-t-realization-check": [
        ["englishT", "facts", "english-aspirated-and-unaspirated-t-are-nondistinctive-realizations"],
        ["englishT", "restrictions", "foreign-phone-examples-are-evidence-only"],
    ],
    "phone-exclusive-environment-check": [["englishT", "facts", "mutually-exclusive-environments-prevent-phone-contrast"]],
    "phone-post-s-environment-check": [["englishT", "facts", "english-unaspirated-t-occurs-after-s-where-aspirated-t-does-not"]],
    "phone-single-member-repertory": [["singlePhone", "facts", "phonic-repertory-may-have-one-member"]],
    "phone-multiple-member-repertory": [["multiplePhone", "facts", "phonic-repertory-may-have-two-or-more-members"]],
    "phone-regular-definition": [["regularPhone", "facts", "regular-phone-contains-only-phoneme-distinctive-features"]],
    "phone-spanish-regular-example-check": [
        ["spanishS", "facts", "spanish-s-example-checks-regular-phone-definition"],
        ["spanishS", "restrictions", "foreign-phone-examples-are-evidence-only"],
    ],
    "phone-irregular-definition": [["irregularPhone", "facts", "phone-may-be-irregular"]],
    "phone-spanish-z-irregular-check": [["spanishZ", "facts", "spanish-z-can-be-slightly-irregular-phone-of-s"]],
    "phone-spanish-mizmo-check": [["spanishZ", "facts", "spanish-mismo-is-cited-with-z-realization"]],
    "phone-added-voice-check": [["spanishZ", "facts", "spanish-z-differs-from-s-by-added-voice"]],
    "phone-distant-irregular-definition": [["distantPhone", "facts", "irregular-phone-may-be-seriously-or-totally-different"]],
    "phone-cross-phoneme-identity": [["crossPhone", "facts", "different-phone-may-match-regular-phone-of-another-phoneme"]],
    "phone-nahuatl-repertory-foundation": [
        ["nahuatlPhone", "facts", "nahuatl-n-is-regular-phone-of-n"],
        ["nahuatlPhone", "facts", "nahuatl-n-is-irregular-phone-of-m"],
        ["nahuatlPhone", "facts", "nahuatl-ch-is-regular-phone-of-ch"],
        ["nahuatlPhone", "facts", "nahuatl-ch-is-irregular-phone-of-t"],
        ["nahuatlPhone", "facts", "nahuatl-t-is-regular-phone-of-t"],
        ["nahuatlPhone", "facts", "nahuatl-t-is-irregular-phone-of-tl"],
    ],
    "phone-lesson2-owner-link": [["nahuatlPhone", "restrictions", "lesson-cross-reference-is-routing-only"]],
    "phone-symbol-specificity": [
        ["symbolPhone", "facts", "phone-symbol-representation-may-be-loose-or-strict"],
        ["symbolPhone", "facts", "loose-symbolization-leans-toward-type-generality"],
        ["symbolPhone", "facts", "strict-symbolization-leans-toward-instance-particularity"],
    ],
    "graph-token-definition": [["graph", "facts", "token-level-nondistinctive-grapheme-representation"]],
    "graph-typographic-variation": [
        ["grapheme", "facts", "recognizable-value-across-script-print-case-and-typeface"],
        ["graph", "restrictions", "typography-is-not-a-grammar-choice"],
    ],
    "sig-regular-exists": [["regularSig", "classification", "regular-sig-token"]],
    "sig-regular-definition": [["regularSig", "facts", "regular-sig-is-token-level-representation-of-sigeme"]],
    "sig-regular-zero-notation": [["regularSig", "facts", "regular-sig-notation-[0]"]],
    "sigeme-single-token-member": [["regularSig", "facts", "sigeme-has-one-token-level-member"]],
    "sig-irregular-exists": [["irregularSig", "facts", "irregular-sig-alternative-exists"]],
    "sig-irregular-phoneme-unit": [["irregularSig", "facts", "irregular-sig-is-representation-of-phoneme-unit"]],
    "sig-irregular-square-zero": [
        ["irregularSig", "facts", "irregular-sig-notation-[⎕]"],
        ["irregularSig", "facts", "square-zero-name"],
    ],
    "seme-token-definition": [["seme", "facts", "seme-is-token-level-representation-of-sememe"]],
    "morph-token-definition": [["morph", "facts", "morph-is-token-level-representation-of-morpheme"]],
    "morph-regular-irregular-alternative": [["morph", "facts", "morph-may-be-regular-or-irregular"]],
    "morph-meaning-carrier-variation": [
        ["morph", "facts", "morph-meaning-remains-constant-across-carrier-variation"],
        ["morph", "facts", "morph-carrier-may-be-phonic-or-sigic"],
    ],
    "morph-notation-follows-morpheme": [["morph", "facts", "regular-morph-notation-follows-morpheme-notation"]],
    "morph-square-bracket-notation": [["morph", "facts", "regular-morph-notation-uses-square-brackets-around-morphic-carrier"]],
    "morph-english-plural-morpheme-check": [["englishPlural", "facts", "english-s-is-cited-as-plural-number-morpheme"]],
    "morph-english-plural-content-check": [["englishPlural", "facts", "english-s-plural-morpheme-has-more-than-one-content"]],
    "morph-english-s-check": [["englishPlural", "facts", "english-pits-cites-s-plural-carrier"]],
    "morph-english-z-check": [["englishPlural", "facts", "english-pigs-cites-z-plural-carrier"]],
    "morph-english-iz-check": [["englishPlural", "facts", "english-kisses-cites-iz-plural-carrier-with-supportive-vowel"]],
    "morph-english-en-check": [["englishPlural", "facts", "english-oxen-cites-irregular-en-plural-carrier"]],
    "morph-english-zero-plural-check": [["englishPlural", "facts", "english-sheep-cites-zero-plural-carrier"]],
    "morph-zero-shape-distinct-content-check": [["englishPlural", "facts", "english-zero-plural-and-singular-share-shape-but-have-distinct-contextual-number-content"]],
    "morph-borrowing-analysis-check": [["borrowedPlural", "facts", "borrowed-lexical-items-can-complicate-native-morph-analysis"]],
    "morph-data-borrowing-check": [["borrowedPlural", "facts", "data-is-cited-with-nonnative-plural-morph"]],
    "morph-seraphim-borrowing-check": [["borrowedPlural", "facts", "seraphim-is-cited-with-nonnative-plural-morph"]],
    "morph-amoebae-borrowing-check": [["borrowedPlural", "facts", "amoebae-is-cited-with-nonnative-plural-morph"]],
    "morph-phonological-conditioning": [
        ["phonologicalConditioning", "facts", "slightly-irregular-morphs-may-be-phonologically-conditioned"],
        ["phonologicalConditioning", "facts", "contextual-sounds-trigger-morph-variation"],
    ],
    "morph-morphological-conditioning": [
        ["morphologicalConditioning", "facts", "certain-seriously-irregular-morphs-may-be-morphologically-conditioned"],
        ["morphologicalConditioning", "facts", "particular-governing-morpheme-triggers-morph-variation"],
    ],
});

const CASES = Object.freeze({
    inventory: ["token-element", "inventory"],
    phone: ["phone-repertory-analysis", "phone-definition"],
    englishT: ["phone-repertory-analysis", "english-t-evidence"],
    singlePhone: ["phone-repertory-analysis", "single-member-repertory"],
    multiplePhone: ["phone-repertory-analysis", "multiple-member-repertory"],
    regularPhone: ["phone-repertory-analysis", "regular-phone"],
    spanishS: ["phone-repertory-analysis", "spanish-regular-s-evidence"],
    irregularPhone: ["phone-repertory-analysis", "irregular-phone"],
    spanishZ: ["phone-repertory-analysis", "spanish-irregular-z-evidence"],
    distantPhone: ["phone-repertory-analysis", "distant-irregular-phone"],
    crossPhone: ["phone-repertory-analysis", "cross-phoneme-identity"],
    nahuatlPhone: ["phone-repertory-analysis", "nahuatl-irregular-repertory"],
    symbolPhone: ["phone-repertory-analysis", "symbol-specificity"],
    graph: ["graph-variant-analysis", "graph-definition"],
    grapheme: ["linguistic-element", "grapheme"],
    regularSig: ["token-element", "regular-sig"],
    irregularSig: ["token-element", "irregular-sig"],
    seme: ["token-element", "seme"],
    morph: ["morpheme", "morph"],
    englishPlural: ["morpheme", "english-plural-morph-evidence"],
    borrowedPlural: ["morpheme", "borrowed-plural-morph-evidence"],
    phonologicalConditioning: ["morph-conditioning-analysis", "phonological-conditioning"],
    morphologicalConditioning: ["morph-conditioning-analysis", "morphological-conditioning"],
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
            (_match, quote, relativePath) => "from " + quote
                + url.pathToFileURL(path.resolve(sourceDirectory, relativePath)).href
                + quote
        );
        const module = await import(
            "data:text/javascript;base64,"
            + Buffer.from(source).toString("base64")
            + "#lesson1-token-mutations"
        );
        const api = module.createConceptsApi({});
        const results = Object.fromEntries(Object.entries(${JSON.stringify(CASES)}).map(
            ([key, [domain, selection]]) => {
                const conceptSource = api.buildClassicalGrammarConceptSource({ domain, selection });
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
    const result = spawnSync(process.execPath, ["--input-type=module", "--eval", script], {
        cwd: ROOT,
        encoding: "utf8",
        maxBuffer: 10 * 1024 * 1024,
    });
    if (result.status !== 0) throw new Error(result.stderr || "token mutation probe failed");
    return JSON.parse(result.stdout);
}

function observes(results, assertions) {
    return assertions.every(([key, collection, value]) =>
        collection === "classification"
            ? results[key][collection] === value
            : results[key][collection].includes(value)
    );
}

function run(ctx) {
    const s = createSuite("classical_lesson1_token_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson1-job-ledger.json"
    ), "utf8"));
    const records = ledger.records.filter(record => record.canvasSection.startsWith("§1.8"));
    const normal = Object.fromEntries(Object.entries(CASES).map(
        ([key, [domain, selection]]) => [key, runConcept(ctx, domain, selection)]
    ));
    const mutation = readMutationProbe();

    s.eq(
        "all section 1.8 atoms build the token model or check it without becoming generator rules",
        {
            count: records.length,
            byJob: records.reduce((counts, record) => {
                counts[record.jobType] = (counts[record.jobType] || 0) + 1;
                return counts;
            }, {}),
            unassigned: records.filter(record => !record.observationKind).map(record => record.atomId),
        },
        {
            count: 49,
            byJob: { BUILD_CODE_MODEL: 30, CHECK_GRAMMAR: 19 },
            unassigned: [],
        }
    );

    for (const record of records) {
        const assertions = EXPECTATIONS[record.observationKind] || [];
        s.eq(
            `${record.atomId} performs its exact token-level job`,
            {
                atomId: record.atomId,
                normalRoutesValid: Object.values(normal).every(result =>
                    result.status === "authorized" && result.routeIdentity
                ),
                exactObserved: assertions.length > 0 && observes(normal, assertions),
                mutationBreaksObservation: assertions.length > 0 && !observes(mutation, assertions),
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
