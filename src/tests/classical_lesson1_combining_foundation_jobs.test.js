"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

const EXPECTATIONS = Object.freeze({
    "elements-form-linear-sequences": ["composition", "facts", "elements-combined-into-linear-sequence"],
    "speech-sequences-temporal": ["composition", "facts", "speech-sequence-is-temporal"],
    "writing-sequences-spatial": ["writing", "facts", "written-sequence-is-spatial"],
    "valid-sequence-requires-structure": ["composition", "facts", "parts-patterned-into-structured-whole"],
    "one-plus-one-yields-one-unit": ["composition", "resultUnitCount", 1],
    "constituents-enter-and-result-as-units": ["composition", "facts", [
        "constituents-entered-combination-as-units",
        "composition-result-is-a-unit",
    ]],
    "cohesion-allows-nonjuxtaposed-constituents": ["discontinuity", "facts", [
        "predicate-intervenes-between-subject-person-and-number",
        "separated-person-and-number-belong-to-one-subject-function",
    ]],
    "latin-discontinuity-translation-check": ["latin", "facts", "latin-magna-cum-laude-means-with-high-praise"],
    "latin-discontinuity-gloss-check": ["latin", "facts", "latin-laude-magna-cum-glosses-are-praise-great-with"],
    "latin-discontinuity-topology-check": ["latin", "facts", "latin-cum-separates-laude-from-magna-as-discontinuity-witness"],
    "latin-stylistic-discontinuity-check": ["latin", "facts", "latin-magna-cum-laude-discontinuity-is-stylistic-not-obligatory"],
    "obligatory-discontinuity-admissible": ["discontinuity", "facts", "specific-complex-unit-kind-admits-nonjuxtaposed-constituents"],
    "section-4.4-discontinuity-owner-link": ["latin", "facts", "section-4.4-routes-obligatory-discontinuity-examples"],
    "set-single-member-possible": ["simple", "facts", "set-may-have-one-member"],
    "set-multiple-members-possible": ["complex", "facts", "set-may-have-more-than-one-member"],
    "structure-single-constituent-possible": ["simple", "facts", "structural-complex-may-have-one-constituent"],
    "structure-multiple-constituents-possible": ["complex", "facts", "structural-complex-may-have-more-than-one-constituent"],
    "structure-normally-multiple-constituents": ["complex", "facts", "structural-complex-normally-has-two-or-more-constituents"],
    "composition-recursive-reapplication": ["recursion", "facts", "composition-rule-reapplied-after-prior-composition"],
    "lower-to-higher-hierarchy-potential": ["hierarchy", "facts", [
        "higher-ranked-structural-units-can-be-built-from-lower-ranked-units",
        "distinct-ranks-have-distinct-structural-potentials",
    ]],
    "meaningless-meaningful-hierarchy-partition": ["hierarchy", "facts", "one-structural-hierarchy-is-meaningless-and-one-is-meaningful"],
});

function conceptResult(ctx, selection) {
    const source = ctx.buildClassicalGrammarConceptSource({
        domain: "structure",
        selection,
    });
    const receipt = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "concept:classification",
        args: [source],
        languageId: "classical-nahuatl",
    });
    return receipt.canonicalResult;
}

function elementResult(ctx) {
    return conceptResultFor(ctx, "linguistic-element", "element");
}

function conceptResultFor(ctx, domain, selection) {
    const source = ctx.buildClassicalGrammarConceptSource({ domain, selection });
    return ctx.executeClassicalGrammarApplicationRequest({
        operationId: "concept:classification",
        args: [source],
        languageId: "classical-nahuatl",
    }).canonicalResult;
}

function compositionResult(ctx, medium = "speech", overrides = {}) {
    const source = ctx.buildClassicalLinguisticUnitCompositionSource({
        medium,
        sequenceOrder: medium === "speech" ? "temporal" : "spatial",
        structurePattern: "patterned-whole",
        constituents: [elementResult(ctx), elementResult(ctx)],
        ...overrides,
    });
    return ctx.executeClassicalGrammarApplicationRequest({
        operationId: "classical.linguistic.unit.compose",
        args: [source],
        languageId: "classical-nahuatl",
    });
}

function recursionResult(ctx, priorResult) {
    const source = ctx.buildClassicalLinguisticStructureRecursionSource({
        priorStructureResult: priorResult,
        nextConstituentResult: elementResult(ctx),
    });
    return ctx.executeClassicalGrammarApplicationRequest({
        operationId: "classical.linguistic.structure.recurse",
        args: [source],
        languageId: "classical-nahuatl",
    });
}

function discontinuityResult(ctx) {
    const nncSource = ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({ stem: "mich" });
    const nncOperation = ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(nncSource, {
        state: "absolutive",
        subject: "1sg",
        sentenceType: "statement",
        polarity: "positive",
    });
    const nnc = ctx.evaluateClassicalNahuatlOrdinaryNnc(nncSource, nncOperation);
    const source = ctx.buildClassicalDiscontinuousUnitAdmissibilitySource({
        canonicalNuclearClauseResult: nnc,
    });
    return ctx.executeClassicalGrammarApplicationRequest({
        operationId: "classical.linguistic.unit.discontinuity.validate",
        args: [source],
        languageId: "classical-nahuatl",
    });
}

function includesExpected(result, collection, expected) {
    if (collection === "resultUnitCount") return result?.resultUnitCount === expected;
    const values = result?.[collection] || [];
    return Array.isArray(expected)
        ? expected.every(value => values.includes(value))
        : values.includes(expected);
}

function readMutationProbe() {
    const conceptsPath = path.join(ROOT, "src/core/concepts/concepts.mjs");
    const stringValues = [...new Set(Object.values(EXPECTATIONS).flatMap(([, collection, value]) =>
        collection === "facts" ? (Array.isArray(value) ? value : [value]) : []
    ))];
    const script = `
        const fs = await import("node:fs");
        const path = await import("node:path");
        const url = await import("node:url");
        const sourcePath = ${JSON.stringify(conceptsPath)};
        const sourceDirectory = path.dirname(sourcePath);
        const original = fs.readFileSync(sourcePath, "utf8");
        const absolutize = source => source.replace(
            /from\\s+(["'])(\\.{1,2}\\/[^"']+)\\1/gu,
            (_match, quote, relativePath) => "from " + quote
                + url.pathToFileURL(path.resolve(sourceDirectory, relativePath)).href
                + quote
        );
        const load = async (source, tag) => import(
            "data:text/javascript;base64,"
            + Buffer.from(absolutize(source)).toString("base64")
            + "#lesson1-combining-" + tag
        );
        let factSource = original;
        for (const value of ${JSON.stringify(stringValues)}) {
            const next = factSource.replaceAll('"' + value + '"', '"broken-' + value + '"');
            if (next === factSource) throw new Error("fact mutation did not apply: " + value);
            factSource = next;
        }
        const factModule = await load(factSource, "facts");
        const factApi = factModule.createConceptsApi({});
        const concept = (api, selection) => api.evaluateClassicalGrammarConcept(
            api.buildClassicalGrammarConceptSource({ domain: "structure", selection })
        );
        const element = api => api.evaluateClassicalGrammarConcept(
            api.buildClassicalGrammarConceptSource({ domain: "linguistic-element", selection: "element" })
        );
        const compose = (api, medium = "speech", order = medium === "speech" ? "temporal" : "spatial", pattern = "patterned-whole") => api.evaluateClassicalLinguisticUnitComposition(
            api.buildClassicalLinguisticUnitCompositionSource({
                medium, sequenceOrder: order, structurePattern: pattern,
                constituents: [element(api), element(api)],
            })
        );
        const factComposition = compose(factApi);
        const factWriting = compose(factApi, "writing");
        const factRecursion = factApi.evaluateClassicalLinguisticStructureRecursion(
            factApi.buildClassicalLinguisticStructureRecursionSource({
                priorStructureResult: factComposition,
                nextConstituentResult: element(factApi),
            })
        );
        const concepts = Object.fromEntries([
            ["simple", "simple-unit"],
            ["complex", "complex-unit"],
            ["hierarchy", "hierarchy-foundation"],
            ["latin", "latin-discontinuity-evidence"],
        ].map(([key, selection]) => [key, concept(factApi, selection)]));

        const speechSource = original.replace(
            'source?.medium === "speech" && source?.sequenceOrder !== "temporal"',
            'false && source?.medium === "speech" && source?.sequenceOrder !== "temporal"'
        );
        const speechApi = (await load(speechSource, "speech-order")).createConceptsApi({});
        const writingSource = original.replace(
            'source?.medium === "writing" && source?.sequenceOrder !== "spatial"',
            'false && source?.medium === "writing" && source?.sequenceOrder !== "spatial"'
        );
        const writingApi = (await load(writingSource, "writing-order")).createConceptsApi({});
        const structureSource = original.replace(
            'if (source?.structurePattern !== "patterned-whole")',
            'if (false && source?.structurePattern !== "patterned-whole")'
        );
        const structureApi = (await load(structureSource, "structure")).createConceptsApi({});
        const unitySource = original.replace(
            'resultUnitCount: authorized ? 1 : 0,',
            'resultUnitCount: authorized ? 2 : 0,'
        );
        const unityApi = (await load(unitySource, "unity-count")).createConceptsApi({});

        const fakeFrame = Object.freeze({
            semanticIdentity: "mutation-frame",
            slotOrder: ["pers1", "pers2", "stem", "num1", "num2"],
            slots: Object.freeze({
                subject: Object.freeze({ pers1: "ni", pers2: "x" }),
                predicate: Object.freeze({ stem: "mich" }),
                number: Object.freeze({ num1: "y", num2: "z", belongsTo: "subject-personal-pronoun" }),
            }),
        });
        const fakeNnc = Object.freeze({ kind: "mutation-nnc", typedSlotFrame: fakeFrame });
        const discontinuityTarget = {
            isClassicalNahuatlOrdinaryNncResult: value => value === fakeNnc,
            isClassicalNahuatlNncSlotFrame: value => value === fakeFrame,
        };
        const factDiscontinuityApi = factModule.createConceptsApi(discontinuityTarget);
        const factDiscontinuity = factDiscontinuityApi.evaluateClassicalDiscontinuousUnitAdmissibility(
            factDiscontinuityApi.buildClassicalDiscontinuousUnitAdmissibilitySource({ canonicalNuclearClauseResult: fakeNnc })
        );
        const cohesionSource = original.replace(
            'nonjuxtaposedTopology\\n      && number.belongsTo === "subject-personal-pronoun"',
            'false && nonjuxtaposedTopology\\n      && number.belongsTo === "subject-personal-pronoun"'
        );
        const cohesionModule = await load(cohesionSource, "cohesion");
        const cohesionApi = cohesionModule.createConceptsApi(discontinuityTarget);
        const cohesionResult = cohesionApi.evaluateClassicalDiscontinuousUnitAdmissibility(
            cohesionApi.buildClassicalDiscontinuousUnitAdmissibilitySource({ canonicalNuclearClauseResult: fakeNnc })
        );
        process.stdout.write(JSON.stringify({
            facts: {
                composition: factComposition,
                writing: factWriting,
                recursion: factRecursion,
                discontinuity: factDiscontinuity,
                ...concepts,
            },
            boundaries: {
                speechWrongOrderAuthorized: compose(speechApi, "speech", "spatial").authorizationStatus === "authorized",
                writingWrongOrderAuthorized: compose(writingApi, "writing", "temporal").authorizationStatus === "authorized",
                unstructuredAuthorized: compose(structureApi, "speech", "temporal", "unstructured-sequence").authorizationStatus === "authorized",
                unityCount: compose(unityApi).resultUnitCount,
                cohesionStatus: cohesionResult.authorizationStatus,
            },
        }));
    `;
    const result = spawnSync(process.execPath, ["--input-type=module", "--eval", script], {
        cwd: ROOT,
        encoding: "utf8",
        maxBuffer: 20 * 1024 * 1024,
    });
    if (result.status !== 0) throw new Error(result.stderr || "combining mutation probe failed");
    return JSON.parse(result.stdout);
}

function run(ctx) {
    const s = createSuite("classical_lesson1_combining_foundation_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson1-job-ledger.json"
    ), "utf8"));
    const records = ledger.records.filter(record => record.canvasSection === "§1.11");
    const compositionReceipt = compositionResult(ctx);
    const writingReceipt = compositionResult(ctx, "writing");
    const recursionReceipt = recursionResult(ctx, compositionReceipt.canonicalResult);
    const discontinuityReceipt = discontinuityResult(ctx);
    const results = {
        composition: compositionReceipt.canonicalResult,
        writing: writingReceipt.canonicalResult,
        recursion: recursionReceipt.canonicalResult,
        discontinuity: discontinuityReceipt.canonicalResult,
        simple: conceptResult(ctx, "simple-unit"),
        complex: conceptResult(ctx, "complex-unit"),
        hierarchy: conceptResult(ctx, "hierarchy-foundation"),
        latin: conceptResult(ctx, "latin-discontinuity-evidence"),
    };
    const invalidSpeech = compositionResult(ctx, "speech", { sequenceOrder: "spatial" }).canonicalResult;
    const invalidWriting = compositionResult(ctx, "writing", { sequenceOrder: "temporal" }).canonicalResult;
    const invalidStructure = compositionResult(ctx, "speech", {
        structurePattern: "unstructured-sequence",
    }).canonicalResult;
    const mutation = readMutationProbe();

    s.eq(
        "the first section 1.11 group assigns all 21 atoms before any exact credit",
        {
            count: records.length,
            byJob: records.reduce((counts, record) => {
                counts[record.jobType] = (counts[record.jobType] || 0) + 1;
                return counts;
            }, {}),
            unassigned: records.filter(record => !record.observationKind).map(record => record.atomId),
        },
        {
            count: 21,
            byJob: { BUILD_GRAMMAR: 9, CHECK_GRAMMAR: 4, BUILD_CODE_MODEL: 8 },
            unassigned: [],
        }
    );

    s.eq(
        "the normal application path executes composition, recursion, and discontinuity and blocks their key wrong inputs",
        {
            routes: [compositionReceipt, writingReceipt, recursionReceipt, discontinuityReceipt]
                .map(receipt => [receipt.authorizationStatus, Boolean(receipt.greatestCommonDivisor?.invariantProofs?.["semantic-operation-identity"])]),
            speechWrongOrder: [invalidSpeech.authorizationStatus, invalidSpeech.blockReason],
            writingWrongOrder: [invalidWriting.authorizationStatus, invalidWriting.blockReason],
            unstructured: [invalidStructure.authorizationStatus, invalidStructure.blockReason],
            discontinuityScope: [
                results.discontinuity.topology,
                results.discontinuity.validationScope,
                results.discontinuity.universalDiscontinuityAuthorized,
                results.discontinuity.arbitraryGapAuthorized,
            ],
        },
        {
            routes: Array(4).fill(["authorized", true]),
            speechWrongOrder: ["blocked", "speech-linear-sequence-must-be-temporal"],
            writingWrongOrder: ["blocked", "written-linear-sequence-must-be-spatial"],
            unstructured: ["blocked", "linguistically-valid-sequence-must-be-structured"],
            discontinuityScope: ["non-juxtaposed", "specific-typed-unit-kind", false, false],
        }
    );

    for (const record of records) {
        const [resultKey, collection, expected] = EXPECTATIONS[record.observationKind] || [];
        let mutationBreaksObservation = Boolean(resultKey)
            && !includesExpected(mutation.facts[resultKey], collection, expected);
        if (record.observationKind === "speech-sequences-temporal") {
            mutationBreaksObservation = mutation.boundaries.speechWrongOrderAuthorized;
        } else if (record.observationKind === "writing-sequences-spatial") {
            mutationBreaksObservation = mutation.boundaries.writingWrongOrderAuthorized;
        } else if (record.observationKind === "valid-sequence-requires-structure") {
            mutationBreaksObservation = mutation.boundaries.unstructuredAuthorized;
        } else if (record.observationKind === "one-plus-one-yields-one-unit") {
            mutationBreaksObservation = mutation.boundaries.unityCount !== 1;
        } else if (
            record.observationKind === "cohesion-allows-nonjuxtaposed-constituents"
            || record.observationKind === "obligatory-discontinuity-admissible"
        ) {
            mutationBreaksObservation = mutation.boundaries.cohesionStatus !== "authorized";
        }
        s.eq(
            `${record.atomId} has one exact normal job and a matching break test`,
            {
                atomId: record.atomId,
                exactObserved: Boolean(resultKey)
                    && includesExpected(results[resultKey], collection, expected),
                mutationBreaksObservation,
            },
            {
                atomId: record.atomId,
                exactObserved: true,
                mutationBreaksObservation: true,
            }
        );
    }

    return s;
}

module.exports = { run };
