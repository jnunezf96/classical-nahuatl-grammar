"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const { pathToFileURL } = require("url");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

const SECTION_1_1_EXPECTATIONS = Object.freeze({
    "preliminary-scope-bounded": Object.freeze({
        property: "preliminaryScopeBounded",
        value: true,
    }),
    "preliminary-foundation-not-complete-grammar": Object.freeze({
        property: "preliminaryFoundationIsCompleteGrammar",
        value: false,
    }),
    "general-prerequisites-only": Object.freeze({
        property: "generalPrerequisitesOnly",
        value: true,
    }),
    "later-lesson-specific-owners-required": Object.freeze({
        property: "laterLessonSpecificOwnersRequired",
        value: true,
    }),
});

function readFoundationProbe() {
    const moduleUrl = pathToFileURL(path.join(
        ROOT,
        "src/core/concepts/classical_grammar_foundation.mjs"
    )).href;
    const script = `
        const fs = await import("node:fs");
        const module = await import(${JSON.stringify(moduleUrl)});
        const sourceText = fs.readFileSync(
            new URL(${JSON.stringify(moduleUrl)}),
            "utf8"
        );
        const importMutation = async (from, to, name) => {
            const mutated = sourceText.replace(from, to);
            if (mutated === sourceText) throw new Error(
                "foundation mutation did not apply: " + name
            );
            return import(
                "data:text/javascript;base64,"
                + Buffer.from(mutated).toString("base64")
                + "#" + name
            );
        };
        const foundation = module.CLASSICAL_GRAMMAR_FOUNDATION;
        const valid = module.validateClassicalGrammarFoundationRoute({
            operationId: "orthography:transcription",
            capabilityName: "buildClassicalNahuatlTranscriptionFrame",
            axisIds: [
                "transcription-source",
                "phonological-boundary",
                "orthographic-realization"
            ]
        });
        const languageIdentities = [
            module.validateClassicalGrammarLanguageIdentity(),
            module.validateClassicalGrammarLanguageIdentity("classical-nahuatl"),
            module.validateClassicalGrammarLanguageIdentity("english")
        ];
        const scopeMutation = await importMutation(
            "preliminaryScopeBounded: true",
            "preliminaryScopeBounded: false",
            "scope-bounded"
        );
        const completenessMutation = await importMutation(
            "preliminaryFoundationIsCompleteGrammar: false",
            "preliminaryFoundationIsCompleteGrammar: true",
            "foundation-complete"
        );
        const prerequisitesMutation = await importMutation(
            "generalPrerequisitesOnly: true",
            "generalPrerequisitesOnly: false",
            "general-prerequisites"
        );
        const laterOwnersMutation = await importMutation(
            "laterLessonSpecificOwnersRequired: true",
            "laterLessonSpecificOwnersRequired: false",
            "later-owners"
        );
        const definitionMutation = await importMutation(
            "elements: \\\"typed-linguistic-elements\\\"",
            "elements: \\\"untyped-display-labels\\\"",
            "grammar-definition"
        );
        const languageMutation = await importMutation(
            "const valid = languageId === CLASSICAL_GRAMMAR_FOUNDATION.languageId;",
            "const valid = true;",
            "foreign-language-admission"
        );
        const mutationOutcomes = {
            preliminaryScopeBounded:
                scopeMutation.CLASSICAL_GRAMMAR_FOUNDATION.scopeRules
                    .preliminaryScopeBounded,
            preliminaryFoundationIsCompleteGrammar:
                completenessMutation.CLASSICAL_GRAMMAR_FOUNDATION.scopeRules
                    .preliminaryFoundationIsCompleteGrammar,
            generalPrerequisitesOnly:
                prerequisitesMutation.CLASSICAL_GRAMMAR_FOUNDATION.scopeRules
                    .generalPrerequisitesOnly,
            laterLessonSpecificOwnersRequired:
                laterOwnersMutation.CLASSICAL_GRAMMAR_FOUNDATION.scopeRules
                    .laterLessonSpecificOwnersRequired,
            grammarDefinitionElements:
                definitionMutation.CLASSICAL_GRAMMAR_FOUNDATION
                    .grammarDefinition.elements,
            foreignLanguageAccepted:
                languageMutation.validateClassicalGrammarLanguageIdentity(
                    "english"
                ).valid
        };
        const mutations = [
            module.validateClassicalGrammarFoundationRoute({
                operationId: "lesson:example-display",
                capabilityName: "buildClassicalNahuatlTranscriptionFrame",
                axisIds: ["orthographic-realization"]
            }),
            module.validateClassicalGrammarFoundationRoute({
                operationId: "orthography:transcription",
                capabilityName: "buildClassicalNahuatlTranscriptionFrame",
                axisIds: ["phonological-boundary", "phonological-boundary"]
            }),
            module.validateClassicalGrammarFoundationRoute({
                operationId: "orthography:transcription",
                capabilityName: "",
                axisIds: ["phonological-boundary"]
            })
        ];
        process.stdout.write(JSON.stringify({
            foundation,
            valid,
            languageIdentities,
            mutationOutcomes,
            mutations
        }));
    `;
    const result = spawnSync(
        process.execPath,
        ["--input-type=module", "--eval", script],
        { cwd: ROOT, encoding: "utf8" }
    );
    if (result.status !== 0) {
        throw new Error(result.stderr || "Lesson 1 foundation probe failed");
    }
    return JSON.parse(result.stdout);
}

function failureMessage(fn) {
    try {
        fn();
        return "";
    } catch (error) {
        return String(error?.message || error);
    }
}

function run(ctx) {
    const s = createSuite("classical_lesson1_foundation");
    const probe = readFoundationProbe();

    s.eq(
        "Lesson 1 supplies the shared type-token-instance and carrier-content code model",
        {
            languageId: probe.foundation.languageId,
            analysisLevels: probe.foundation.analysisLevels,
            typeElements: probe.foundation.elementMatrix.type,
            tokenElements: probe.foundation.elementMatrix.token,
            carrierSubsystems: probe.foundation.carrierSubsystems,
            contentSystem: probe.foundation.contentSystem,
            scopeRules: probe.foundation.scopeRules,
            languageBoundary: probe.foundation.languageBoundary,
        },
        {
            languageId: "classical-nahuatl",
            analysisLevels: ["type", "token", "instance"],
            typeElements: [
                "phoneme",
                "grapheme",
                "sigeme",
                "sememe",
                "morpheme",
            ],
            tokenElements: ["phone", "graph", "sig", "seme", "morph"],
            carrierSubsystems: [
                "phonological",
                "sigological",
                "graphological",
            ],
            contentSystem: "semantic",
            scopeRules: {
                preliminaryScopeBounded: true,
                preliminaryFoundationIsCompleteGrammar: false,
                generalPrerequisitesOnly: true,
                laterLessonSpecificOwnersRequired: true,
                laterConceptsMayExtendFoundation: true,
                foundationMayNotReplaceSpecificOwner: true,
            },
            languageBoundary: {
                foreignGrammarTransferAllowed: false,
                foreignCategoryTransferAllowed: false,
                translationMayAuthorizeGrammar: false,
                languageSpecificOwnerRequired: true,
            },
        }
    );

    s.eq(
        "a real grammar route uses the foundation while three broken routes fail for the exact broken rule",
        {
            valid: probe.valid.valid,
            languageId: probe.valid.languageId,
            selectedAxes: probe.valid.axisIds,
            foundationRole: probe.valid.foundationRole,
            laterLessonSpecificOwnersRequired:
                probe.valid.laterLessonSpecificOwnersRequired,
            languageIdentities: probe.languageIdentities,
            mutations: probe.mutations.map(result => ({
                valid: result.valid,
                errors: result.errors,
            })),
        },
        {
            valid: true,
            languageId: "classical-nahuatl",
            selectedAxes: [
                "transcription-source",
                "phonological-boundary",
                "orthographic-realization",
            ],
            foundationRole: "required-prerequisite-not-complete-grammar",
            laterLessonSpecificOwnersRequired: true,
            languageIdentities: [
                {
                    valid: true,
                    supplied: false,
                    languageId: "classical-nahuatl",
                    expectedLanguageId: "classical-nahuatl",
                    foreignGrammarTransferAllowed: false,
                    error: "",
                },
                {
                    valid: true,
                    supplied: true,
                    languageId: "classical-nahuatl",
                    expectedLanguageId: "classical-nahuatl",
                    foreignGrammarTransferAllowed: false,
                    error: "",
                },
                {
                    valid: false,
                    supplied: true,
                    languageId: "english",
                    expectedLanguageId: "classical-nahuatl",
                    foreignGrammarTransferAllowed: false,
                    error: "foreign-language-grammar-forbidden:english",
                },
            ],
            mutations: [
                {
                    valid: false,
                    errors: ["non-grammatical-operation-identity"],
                },
                { valid: false, errors: ["duplicate-axis-id"] },
                { valid: false, errors: ["capability-name-required"] },
            ],
        }
    );

    const source = ctx.buildClassicalNahuatlTranscriptionSourceFrame({
        constituents: [{ segments: ["/k/", "a"] }],
    });
    const receipt = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "orthography:transcription",
        args: [source],
        languageId: "classical-nahuatl",
    });
    s.eq(
        "the normal application uses the shared foundation and still realizes /k/ plus a as ca",
        {
            status: receipt.authorizationStatus,
            surface: receipt.canonicalResult?.surface,
            routeIdentity: receipt.greatestCommonDivisor
                .invariantProofs["semantic-operation-identity"],
        },
        {
            status: "authorized",
            surface: "ca",
            routeIdentity: true,
        }
    );

    const foreignLanguageFailure = failureMessage(() =>
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "orthography:transcription",
            args: [source],
            languageId: "english",
        })
    );
    s.eq(
        "a foreign language cannot replace Classical Nahuatl grammar on the normal application path",
        foreignLanguageFailure,
        "classical-grammar-application-request-invalid:foreign-language-grammar-forbidden:english"
    );

    const forbidden = ["lesson", "example", "translation", "displayText"]
        .map(key => failureMessage(() =>
            ctx.executeClassicalGrammarApplicationRequest({
                operationId: "orthography:transcription",
                args: [source],
                [key]: "must-not-control-grammar",
            })
        ));
    s.eq(
        "Lesson 1 grammar is protected from lesson order, examples, translations, and display text",
        forbidden,
        ["lesson", "example", "translation", "displayText"].map(key =>
            `classical-grammar-application-request-invalid:forbidden-authority:${key}`
        )
    );

    const jobLedger = JSON.parse(fs.readFileSync(path.join(
        ROOT,
        "docs/canvas-progress/lesson1-job-ledger.json"
    ), "utf8"));
    const acceptedRecords = jobLedger.records.filter(record =>
        record.acceptanceStatus
            === "exactly-observed-normal-application-behavior"
        && ["§1.1", "§1.2"].includes(record.canvasSection)
    );
    for (const record of acceptedRecords) {
        const scopeExpectation = SECTION_1_1_EXPECTATIONS[
            record.observationKind
        ];
        if (scopeExpectation) {
            const actualValue = probe.foundation.scopeRules[
                scopeExpectation.property
            ];
            const mutatedValue = probe.mutationOutcomes[
                scopeExpectation.property
            ];
            s.eq(
                `${record.atomId} performs its accepted Lesson 1 foundation job`,
                {
                    atomId: record.atomId,
                    jobType: record.jobType,
                    observationKind: record.observationKind,
                    normalRouteAccepted: receipt.authorizationStatus
                        === "authorized",
                    exactFoundationValue: actualValue,
                    mutationBreaksObservation:
                        mutatedValue !== scopeExpectation.value,
                },
                {
                    atomId: record.atomId,
                    jobType: "BUILD_CODE_MODEL",
                    observationKind: record.observationKind,
                    normalRouteAccepted: true,
                    exactFoundationValue: scopeExpectation.value,
                    mutationBreaksObservation: true,
                }
            );
            continue;
        }
        if (
            record.observationKind
                === "grammar-definition-used-by-normal-route"
        ) {
            s.eq(
                `${record.atomId} performs its accepted grammar-definition job`,
                {
                    atomId: record.atomId,
                    jobType: record.jobType,
                    definition: probe.foundation.grammarDefinition,
                    normalRouteIdentity: receipt.greatestCommonDivisor
                        .invariantProofs["semantic-operation-identity"],
                    mutationBreaksObservation:
                        probe.mutationOutcomes.grammarDefinitionElements
                            !== "typed-linguistic-elements",
                },
                {
                    atomId: record.atomId,
                    jobType: "BUILD_CODE_MODEL",
                    definition: {
                        elements: "typed-linguistic-elements",
                        relationships:
                            "owner-executed-grammatical-relationships",
                        rules: "language-specific-canonical-operations",
                    },
                    normalRouteIdentity: true,
                    mutationBreaksObservation: true,
                }
            );
            continue;
        }
        s.eq(
            `${record.atomId} performs its accepted language-transfer protection job`,
            {
                atomId: record.atomId,
                jobType: record.jobType,
                classicalRouteStatus: receipt.authorizationStatus,
                foreignLanguageFailure,
                mutationBreaksObservation:
                    probe.mutationOutcomes.foreignLanguageAccepted === true,
            },
            {
                atomId: record.atomId,
                jobType: "PROTECT_GRAMMAR",
                classicalRouteStatus: "authorized",
                foreignLanguageFailure:
                    "classical-grammar-application-request-invalid:foreign-language-grammar-forbidden:english",
                mutationBreaksObservation: true,
            }
        );
    }

    return s;
}

module.exports = { run };
