"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const { pathToFileURL } = require("url");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function runConcept(ctx, domain, selection, assertedClassification = "") {
    const source = ctx.buildClassicalGrammarConceptSource({
        domain,
        selection,
        assertedClassification,
    });
    const receipt = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "concept:classification",
        args: [source],
        languageId: "classical-nahuatl",
    });
    return {
        sourceAccepted: ctx.isClassicalGrammarConceptSource(source),
        status: receipt.authorizationStatus,
        blockReason: receipt.blockReason,
        classification: receipt.canonicalResult?.classification || "",
        owner: receipt.canonicalResult?.semanticOwnerId || "",
        routeIdentity: receipt.greatestCommonDivisor
            .invariantProofs["semantic-operation-identity"],
    };
}

function readMutationProbe() {
    const conceptsPath = path.join(
        ROOT,
        "src/core/concepts/concepts.mjs"
    );
    const conceptsUrl = pathToFileURL(conceptsPath).href;
    const script = `
        const fs = await import("node:fs");
        const path = await import("node:path");
        const url = await import("node:url");
        const sourcePath = ${JSON.stringify(conceptsPath)};
        const sourceDirectory = path.dirname(sourcePath);
        const original = fs.readFileSync(sourcePath, "utf8");
        const absolutizeImports = source => source.replace(
            /from\\s+(["'])(\\.{1,2}\\/[^"']+)\\1/gu,
            (_match, quote, relativePath) => {
                const absoluteUrl = url.pathToFileURL(
                    path.resolve(sourceDirectory, relativePath)
                ).href;
                return "from " + quote + absoluteUrl + quote;
            }
        );
        const importMutation = async (source, name) => import(
            "data:text/javascript;base64,"
            + Buffer.from(absolutizeImports(source)).toString("base64")
            + "#" + name
        );
        const rejectionSource = original.replaceAll(
            "rejected: true",
            "rejected: false"
        );
        const rejectionModule = await importMutation(
            rejectionSource,
            "rejection-disabled"
        );
        const rejectionApi = rejectionModule.createConceptsApi({});
        const rejectedCases = [
            ["terminology-assumption", "english-sentence-template-as-nahuatl"],
            ["terminology-assumption", "noun-as-nounword"],
            ["terminology-assumption", "english-transitivity-definition"],
            ["terminology-assumption", "auxiliary-verb"],
            ["terminology-assumption", "translation-as-grammar"],
            ["terminology-assumption", "nuclear-clause-as-word"]
        ];
        const rejectionMutationStatuses = Object.fromEntries(
            rejectedCases.map(([domain, selection]) => {
                const source = rejectionApi.buildClassicalGrammarConceptSource({
                    domain,
                    selection
                });
                const result = rejectionApi.evaluateClassicalGrammarConcept(
                    source
                );
                return [selection, result.authorizationStatus];
            })
        );
        const classificationSource = original
            .replace(
                'classification: "syllabic-carrier-unit"',
                'classification: "broken-vocable-classification"'
            )
            .replace(
                'domain: "word-rank",\\n    selection: "particle",\\n    classification: "word"',
                'domain: "word-rank",\\n    selection: "particle",\\n    classification: "broken-particle-rank"'
            )
            .replace(
                'classification: "classical-structural-term"',
                'classification: "foreign-display-label"'
            );
        const classificationModule = await importMutation(
            classificationSource,
            "classification-broken"
        );
        const classificationApi = classificationModule.createConceptsApi({});
        const acceptedCases = [
            ["terminology", "vocable"],
            ["word-rank", "particle"],
            ["terminology", "mainline-object"]
        ];
        const classificationMutationValues = Object.fromEntries(
            acceptedCases.map(([domain, selection]) => {
                const source = classificationApi.buildClassicalGrammarConceptSource({
                    domain,
                    selection
                });
                const result = classificationApi.evaluateClassicalGrammarConcept(
                    source
                );
                return [selection, result.classification];
            })
        );
        process.stdout.write(JSON.stringify({
            rejectionMutationStatuses,
            classificationMutationValues
        }));
    `;
    const result = spawnSync(
        process.execPath,
        ["--input-type=module", "--eval", script],
        { cwd: ROOT, encoding: "utf8", maxBuffer: 10 * 1024 * 1024 }
    );
    if (result.status !== 0) {
        throw new Error(result.stderr || "terminology mutation probe failed");
    }
    return JSON.parse(result.stdout);
}

function run(ctx) {
    const s = createSuite("classical_lesson1_terminology_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT,
        "docs/canvas-progress/lesson1-job-ledger.json"
    ), "utf8"));
    const records = ledger.records.filter(record =>
        record.canvasSection.startsWith("§1.3")
    );
    const cases = {
        template: runConcept(
            ctx,
            "terminology-assumption",
            "english-sentence-template-as-nahuatl"
        ),
        translation: runConcept(
            ctx,
            "terminology-assumption",
            "translation-as-grammar"
        ),
        wordClass: runConcept(
            ctx,
            "terminology-assumption",
            "noun-as-nounword"
        ),
        transitivity: runConcept(
            ctx,
            "terminology-assumption",
            "english-transitivity-definition"
        ),
        foreignCategory: runConcept(
            ctx,
            "terminology-assumption",
            "auxiliary-verb"
        ),
        nuclearWord: runConcept(
            ctx,
            "terminology-assumption",
            "nuclear-clause-as-word"
        ),
        particleWord: runConcept(ctx, "word-rank", "particle"),
        vocable: runConcept(ctx, "terminology", "vocable"),
        structuralTerm: runConcept(
            ctx,
            "terminology",
            "mainline-object"
        ),
    };
    const mutation = readMutationProbe();

    s.eq(
        "all 94 section 1.3 atoms have a concrete terminology job before credit",
        {
            count: records.length,
            unassigned: records.filter(record => (
                !record.observationKind || !record.targetOwnerId
            )).map(record => record.atomId),
            grammarGenerators: records.filter(record =>
                record.jobType === "BUILD_GRAMMAR"
            ).map(record => record.atomId),
        },
        { count: 94, unassigned: [], grammarGenerators: [] }
    );

    for (const record of records) {
        let actual;
        let expected;
        switch (record.observationKind) {
        case "vocable-is-carrier-unit":
            actual = {
                status: cases.vocable.status,
                classification: cases.vocable.classification,
                owner: cases.vocable.owner,
                mutationBreaksObservation:
                    mutation.classificationMutationValues.vocable
                        !== "syllabic-carrier-unit",
            };
            expected = {
                status: "authorized",
                classification: "syllabic-carrier-unit",
                owner: "classical-concept-classification",
                mutationBreaksObservation: true,
            };
            break;
        case "nuclear-clause-not-word":
            actual = {
                nuclearStatus: cases.nuclearWord.status,
                nuclearReason: cases.nuclearWord.blockReason,
                particleStatus: cases.particleWord.status,
                particleClassification: cases.particleWord.classification,
                rejectionMutationBreaksObservation:
                    mutation.rejectionMutationStatuses[
                        "nuclear-clause-as-word"
                    ] === "authorized",
                particleMutationBreaksObservation:
                    mutation.classificationMutationValues.particle !== "word",
            };
            expected = {
                nuclearStatus: "blocked",
                nuclearReason: "nuclear-clause-is-not-word",
                particleStatus: "authorized",
                particleClassification: "word",
                rejectionMutationBreaksObservation: true,
                particleMutationBreaksObservation: true,
            };
            break;
        case "english-transitivity-rejected":
            actual = {
                status: cases.transitivity.status,
                reason: cases.transitivity.blockReason,
                mutationBreaksObservation:
                    mutation.rejectionMutationStatuses[
                        "english-transitivity-definition"
                    ] === "authorized",
            };
            expected = {
                status: "blocked",
                reason: "transitivity-must-be-classical-source-structure",
                mutationBreaksObservation: true,
            };
            break;
        case "form-class-word-conflation-rejected":
            actual = {
                status: cases.wordClass.status,
                reason: cases.wordClass.blockReason,
                mutationBreaksObservation:
                    mutation.rejectionMutationStatuses["noun-as-nounword"]
                        === "authorized",
            };
            expected = {
                status: "blocked",
                reason: "lexical-item-is-a-stem-not-a-word-class",
                mutationBreaksObservation: true,
            };
            break;
        case "foreign-category-rejected":
            actual = {
                status: cases.foreignCategory.status,
                reason: cases.foreignCategory.blockReason,
                mutationBreaksObservation:
                    mutation.rejectionMutationStatuses["auxiliary-verb"]
                        === "authorized",
            };
            expected = {
                status: "blocked",
                reason: "foreign-category-has-no-classical-referent",
                mutationBreaksObservation: true,
            };
            break;
        case "classical-structural-terms-retained":
            actual = {
                status: cases.structuralTerm.status,
                classification: cases.structuralTerm.classification,
                mutationBreaksObservation:
                    mutation.classificationMutationValues[
                        "mainline-object"
                    ] !== "classical-structural-term",
            };
            expected = {
                status: "authorized",
                classification: "classical-structural-term",
                mutationBreaksObservation: true,
            };
            break;
        case "later-owner-dependency-retained":
            actual = {
                routeIdentity: cases.structuralTerm.routeIdentity,
                lessonAuthorityAbsent: cases.structuralTerm.status
                    === "authorized",
                mutationBreaksObservation:
                    mutation.classificationMutationValues[
                        "mainline-object"
                    ] !== "classical-structural-term",
            };
            expected = {
                routeIdentity: true,
                lessonAuthorityAbsent: true,
                mutationBreaksObservation: true,
            };
            break;
        case "foreign-example-checks-without-authority":
            actual = {
                classicalTermStatus: cases.structuralTerm.status,
                translationStatus: cases.translation.status,
                translationReason: cases.translation.blockReason,
                mutationBreaksObservation:
                    mutation.rejectionMutationStatuses[
                        "translation-as-grammar"
                    ] === "authorized",
            };
            expected = {
                classicalTermStatus: "authorized",
                translationStatus: "blocked",
                translationReason:
                    "translation-is-not-source-or-grammar-authority",
                mutationBreaksObservation: true,
            };
            break;
        default:
            actual = {
                templateStatus: cases.template.status,
                templateReason: cases.template.blockReason,
                translationStatus: cases.translation.status,
                translationReason: cases.translation.blockReason,
                templateMutationBreaksObservation:
                    mutation.rejectionMutationStatuses[
                        "english-sentence-template-as-nahuatl"
                    ] === "authorized",
                translationMutationBreaksObservation:
                    mutation.rejectionMutationStatuses[
                        "translation-as-grammar"
                    ] === "authorized",
            };
            expected = {
                templateStatus: "blocked",
                templateReason:
                    "foreign-sentence-template-not-classical-grammar",
                translationStatus: "blocked",
                translationReason:
                    "translation-is-not-source-or-grammar-authority",
                templateMutationBreaksObservation: true,
                translationMutationBreaksObservation: true,
            };
        }
        s.eq(
            `${record.atomId} performs its exact section 1.3 terminology job`,
            { atomId: record.atomId, behavior: actual },
            { atomId: record.atomId, behavior: expected }
        );
    }

    return s;
}

module.exports = { run };
