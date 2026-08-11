"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

const EXPECTATIONS = Object.freeze({
    "level-summary-chart-dependency": ["type", "summary-chart-restates-sections-1.3-through-1.7"],
    "sound-instance-level": ["instance", "sound-belongs-to-instance-level"],
    "letter-instance-level": ["instance", "letter-belongs-to-instance-level"],
    "meaning-instance-level": ["instance", "meaning-belongs-to-instance-level"],
    "form-instance-level": ["instance", "form-belongs-to-instance-level"],
    "phone-token-level": ["token", "phone-belongs-to-token-level"],
    "graph-token-level": ["token", "graph-belongs-to-token-level"],
    "sig-token-level": ["token", "sig-belongs-to-token-level"],
    "seme-token-level": ["token", "seme-belongs-to-token-level"],
    "morph-token-level": ["token", "morph-belongs-to-token-level"],
    "phoneme-type-level": ["type", "phoneme-belongs-to-type-level"],
    "grapheme-type-level": ["type", "grapheme-belongs-to-type-level"],
    "sigeme-type-level": ["type", "sigeme-belongs-to-type-level"],
    "sememe-type-level": ["type", "sememe-belongs-to-type-level"],
    "morpheme-type-level": ["type", "morpheme-belongs-to-type-level"],
});

const CASES = Object.freeze({
    type: ["linguistic-element", "type-level-inventory"],
    token: ["token-element", "inventory"],
    instance: ["token-element", "instance-boundary"],
});

function runConcept(ctx, domain, selection) {
    const source = ctx.buildClassicalGrammarConceptSource({ domain, selection });
    const receipt = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "concept:classification",
        args: [source],
        languageId: "classical-nahuatl",
    });
    return {
        status: receipt.authorizationStatus,
        facts: receipt.canonicalResult?.facts || [],
        routeIdentity: receipt.greatestCommonDivisor
            .invariantProofs["semantic-operation-identity"],
    };
}

function readMutationProbe() {
    const conceptsPath = path.join(ROOT, "src/core/concepts/concepts.mjs");
    const values = [
        ...Object.values(EXPECTATIONS).map(([, value]) => value),
        "silence-not-instance-level-element",
        "sig-has-no-instance-level-representation",
    ];
    const script = `
        const fs = await import("node:fs");
        const path = await import("node:path");
        const url = await import("node:url");
        const sourcePath = ${JSON.stringify(conceptsPath)};
        const sourceDirectory = path.dirname(sourcePath);
        let source = fs.readFileSync(sourcePath, "utf8");
        for (const value of ${JSON.stringify(values)}) {
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
            + "#lesson1-level-matrix-mutations"
        );
        const api = module.createConceptsApi({});
        const results = Object.fromEntries(Object.entries(${JSON.stringify(CASES)}).map(
            ([key, [domain, selection]]) => {
                const conceptSource = api.buildClassicalGrammarConceptSource({ domain, selection });
                return [key, api.evaluateClassicalGrammarConcept(conceptSource).facts];
            }
        ));
        process.stdout.write(JSON.stringify(results));
    `;
    const result = spawnSync(process.execPath, ["--input-type=module", "--eval", script], {
        cwd: ROOT,
        encoding: "utf8",
        maxBuffer: 10 * 1024 * 1024,
    });
    if (result.status !== 0) throw new Error(result.stderr || "level matrix mutation probe failed");
    return JSON.parse(result.stdout);
}

function run(ctx) {
    const s = createSuite("classical_lesson1_level_matrix_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson1-job-ledger.json"
    ), "utf8"));
    const records = ledger.records.filter(record => record.canvasSection.startsWith("§1.10"));
    const normal = Object.fromEntries(Object.entries(CASES).map(
        ([key, [domain, selection]]) => [key, runConcept(ctx, domain, selection)]
    ));
    const mutation = readMutationProbe();

    s.eq(
        "section 1.10 gives every chart cell one exact level without making the chart a generator",
        {
            count: records.length,
            byJob: records.reduce((counts, record) => {
                counts[record.jobType] = (counts[record.jobType] || 0) + 1;
                return counts;
            }, {}),
            unassigned: records.filter(record => !record.observationKind).map(record => record.atomId),
        },
        {
            count: 15,
            byJob: { BUILD_CODE_MODEL: 1, CHECK_GRAMMAR: 14 },
            unassigned: [],
        }
    );

    s.eq(
        "the blank silence-family instance cell is an enforced absence",
        {
            silenceExcluded: normal.instance.facts.includes(
                "silence-not-instance-level-element"
            ),
            sigHasNoInstance: normal.instance.facts.includes(
                "sig-has-no-instance-level-representation"
            ),
            noPositiveSilenceCell: [
                "silence-belongs-to-instance-level",
                "sig-belongs-to-instance-level",
            ].every(value => !normal.instance.facts.includes(value)),
            mutationBreaksBlankCell: !mutation.instance.includes(
                "silence-not-instance-level-element"
            ) && !mutation.instance.includes(
                "sig-has-no-instance-level-representation"
            ),
        },
        {
            silenceExcluded: true,
            sigHasNoInstance: true,
            noPositiveSilenceCell: true,
            mutationBreaksBlankCell: true,
        }
    );

    for (const record of records) {
        const [level, value] = EXPECTATIONS[record.observationKind] || [];
        const wrongLevels = Object.keys(CASES).filter(candidate => candidate !== level);
        s.eq(
            `${record.atomId} keeps its element on exactly one linguistic level`,
            {
                atomId: record.atomId,
                normalRoutesValid: Object.values(normal).every(result =>
                    result.status === "authorized" && result.routeIdentity
                ),
                exactObserved: Boolean(value)
                    && normal[level].facts.includes(value)
                    && wrongLevels.every(candidate => !normal[candidate].facts.includes(value)),
                mutationBreaksObservation: Boolean(value)
                    && !mutation[level].includes(value),
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
