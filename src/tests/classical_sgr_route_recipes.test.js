"use strict";

const path = require("path");
const { spawnSync } = require("child_process");
const { pathToFileURL } = require("url");
const { createSuite } = require("./runner");

const PROJECT_ROOT = path.resolve(__dirname, "..", "..");
const RECIPE_MODULE_URL = pathToFileURL(path.join(
    PROJECT_ROOT,
    "src",
    "tests",
    "helpers",
    "classical_sgr_route_recipes.mjs"
)).href;

const EXPECTED_FAMILY_ORDER = Object.freeze([
    "vnc-base",
    "vnc-late-derivation",
    "vnc-ordered-voice",
    "vnc-denominal",
    "nnc-base",
    "nnc-pronominal",
    "nominal-construction",
    "specialized-nnc",
    "sentence-layers",
    "clause-relations",
]);

function sortedUnique(values) {
    return [...new Set(values)].sort((left, right) =>
        left.localeCompare(right));
}

function importRecipeRegistry(routeOperationIds) {
    const probe = `
        const module = await import(${JSON.stringify(RECIPE_MODULE_URL)});
        const registry = module.CLASSICAL_SGR_ROUTE_RECIPE_REGISTRY;
        const visit = (value, seen = new Set()) => {
            if (typeof value === "function") return { functionValue: true, frozen: true };
            if (!value || typeof value !== "object" || seen.has(value)) {
                return { functionValue: false, frozen: true };
            }
            seen.add(value);
            return Object.values(value).reduce((state, entry) => {
                const child = visit(entry, seen);
                return {
                    functionValue: state.functionValue || child.functionValue,
                    frozen: state.frozen && child.frozen,
                };
            }, {
                functionValue: false,
                frozen: Object.isFrozen(value),
            });
        };
        const structure = visit(registry);
        const validation = module.validateClassicalSgrRouteRecipeRegistry(
            registry,
            ${JSON.stringify(routeOperationIds)}
        );
        process.stdout.write(JSON.stringify({
            registry,
            validation,
            structure,
            getterReturnsCanonicalRegistry:
                module.getClassicalSgrRouteRecipeRegistry() === registry,
        }));
    `;
    const result = spawnSync(
        process.execPath,
        ["--input-type=module", "--eval", probe],
        {
            cwd: PROJECT_ROOT,
            encoding: "utf8",
            maxBuffer: 4 * 1024 * 1024,
        }
    );
    return {
        status: result.status,
        stderr: String(result.stderr || "").trim(),
        payload: result.status === 0 ? JSON.parse(result.stdout) : null,
    };
}

function run(ctx = {}) {
    const suite = createSuite("classical_sgr_route_recipes");
    const inventory = ctx.getClassicalSourceGrammarResultSurfaceInventory?.();
    const atoms = [
        ...(inventory?.axes || []),
        ...(inventory?.outputs || []),
    ];
    const publicOperationIds = sortedUnique(
        atoms.filter(atom => atom.binding?.public === true)
            .map(atom => atom.operationId)
    );
    const routeOperationIds = sortedUnique([
        ...publicOperationIds,
        ...(inventory?.outputs || []).map(atom => atom.operationId),
    ]);
    const probe = importRecipeRegistry(routeOperationIds);

    suite.eq(
        "the proof recipe module imports against the canonical runtime inventory",
        { status: probe.status, stderr: probe.stderr },
        { status: 0, stderr: "" }
    );
    if (!probe.payload) return suite;

    const { registry, validation, structure } = probe.payload;
    const families = registry.families || [];
    const allCases = families.flatMap(family => family.cases || []);
    const providedOperationIds = families.flatMap(
        family => family.providesOperationIds || []
    );
    const providerCounts = Object.fromEntries(routeOperationIds.map(
        operationId => [
            operationId,
            providedOperationIds.filter(candidate =>
                candidate === operationId).length,
        ]
    ));

    suite.eq(
        "the registry is explicitly proof-only and cannot install runtime authority",
        {
            kind: registry.kind,
            version: registry.version,
            authority: registry.authority,
            getterReturnsCanonicalRegistry:
                probe.payload.getterReturnsCanonicalRegistry,
        },
        {
            kind: "classical-sgr-proof-route-recipe-registry",
            version: 1,
            authority: {
                proofOnly: true,
                uiAuthority: "none",
                grammarAuthority: false,
                semanticOwnerAuthority: false,
                canonicalGenerationAuthority: false,
                runtimeInstallable: false,
            },
            getterReturnsCanonicalRegistry: true,
        }
    );

    suite.eq(
        "the ten reusable families partition every public or Result-producing operation route exactly once",
        {
            routeOperationCount: routeOperationIds.length,
            publicOperationCount: publicOperationIds.length,
            familyCount: families.length,
            providedOperationCount:
                new Set(providedOperationIds).size,
            missing: routeOperationIds.filter(operationId =>
                !providedOperationIds.includes(operationId)),
            unexpected: sortedUnique(providedOperationIds).filter(operationId =>
                !routeOperationIds.includes(operationId)),
            nonSingletonProviders: Object.entries(providerCounts)
                .filter(([, count]) => count !== 1),
        },
        {
            routeOperationCount: routeOperationIds.length,
            publicOperationCount: publicOperationIds.length,
            familyCount: 10,
            providedOperationCount: routeOperationIds.length,
            missing: [],
            unexpected: [],
            nonSingletonProviders: [],
        }
    );

    suite.eq(
        "family and case execution order is explicit, unique, and stable",
        {
            familyOrder: families.map(family => family.familyId),
            familyOrdinals: families.map(family => family.order),
            duplicateCaseIds: allCases.map(entry => entry.caseId)
                .filter((caseId, index, values) =>
                    values.indexOf(caseId) !== index),
            invalidCaseOrders: families.flatMap(family =>
                (family.cases || []).flatMap((entry, index) =>
                    entry.order === index + 1 ? [] : [entry.caseId])),
        },
        {
            familyOrder: EXPECTED_FAMILY_ORDER,
            familyOrdinals: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            duplicateCaseIds: [],
            invalidCaseOrders: [],
        }
    );

    const familyIndex = new Map(families.map((family, index) => [
        family.familyId,
        index,
    ]));
    const dependencyFailures = families.flatMap(family =>
        (family.dependsOnFamilyIds || []).flatMap(dependencyId => {
            const dependencyIndex = familyIndex.get(dependencyId);
            return Number.isInteger(dependencyIndex)
                && dependencyIndex < familyIndex.get(family.familyId)
                ? []
                : [`${family.familyId}:${dependencyId}`];
        }));
    suite.eq(
        "dependencies are acyclic because every dependency precedes its consumer",
        {
            dependencyFailures,
            validationDependencyProblems: validation.problems.filter(problem =>
                problem.startsWith("dependency-")),
        },
        { dependencyFailures: [], validationDependencyProblems: [] }
    );

    const caseIdSet = new Set(allCases.map(entry => entry.caseId));
    const presetIdSet = new Set((registry.presets || []).map(
        preset => preset.presetId
    ));
    const declarativeFailures = families.flatMap(family => {
        const provided = new Set(family.providesOperationIds || []);
        return (family.cases || []).flatMap(caseRecord => [
            ...(caseRecord.presetId && !presetIdSet.has(caseRecord.presetId)
                ? [`missing-preset:${caseRecord.caseId}`]
                : []),
            ...(caseRecord.activatesOperationIds || []).flatMap(operationId =>
                provided.has(operationId)
                    ? []
                    : [`outside-provider:${caseRecord.caseId}:${operationId}`]),
            ...(caseRecord.participants || []).flatMap(participant =>
                caseIdSet.has(participant.fixtureCaseId)
                    ? []
                    : [`missing-fixture:${caseRecord.caseId}:${participant.fixtureCaseId}`]),
            ...((caseRecord.activatesOperationIds || []).length
                ? []
                : [`no-operation:${caseRecord.caseId}`]),
        ]);
    });
    suite.eq(
        "cases only compose declared presets, operations, and reusable fixtures",
        declarativeFailures,
        []
    );

    suite.eq(
        "the registry contains frozen data and no executable callbacks or authority carriers",
        {
            deepFrozen: structure.frozen,
            functionValue: structure.functionValue,
            validationValid: validation.valid,
            validationProblems: validation.problems,
        },
        {
            deepFrozen: true,
            functionValue: false,
            validationValid: true,
            validationProblems: [],
        }
    );

    const orthographyCase = allCases.find(entry =>
        entry.caseId === "vnc-base/orthography-token-156");
    suite.eq(
        "the transcription operation has one declarative phonological-source route",
        orthographyCase && {
            driver: orthographyCase.driver,
            activatesOperationIds: orthographyCase.activatesOperationIds,
            source: orthographyCase.source,
            actions: orthographyCase.actions,
        },
        {
            driver: "transcription-source-application",
            activatesOperationIds: ["orthography:transcription"],
            source: {
                mode: "phonological-segments",
                fields: { transcription: "/k/ a /l/" },
            },
            actions: ["apply-transcription-source"],
        }
    );

    const caseById = new Map(allCases.map(entry => [entry.caseId, entry]));
    const presetById = new Map((registry.presets || []).map(entry => [
        entry.presetId,
        entry,
    ]));
    const resolvedSelections = caseId => {
        const caseRecord = caseById.get(caseId) || {};
        const preset = presetById.get(caseRecord.presetId) || {};
        return Object.fromEntries([
            ...(preset.selections || []),
            ...(caseRecord.selections || []),
        ].map(entry => [entry.controlKey, entry.value]));
    };
    const derivation = caseById.get(
        "vnc-late-derivation/frequentative"
    );
    const ordered = caseById.get("vnc-ordered-voice/layer-three");
    const sourceSelection = caseById.get("vnc-base/embed-matrix-scalar");
    const pronominal = caseById.get("nnc-pronominal/personal-scalar");
    const relational = caseById.get("specialized-nnc/relational");
    const conjunction = caseById.get("clause-relations/conjunction");
    const supplementation = caseById.get(
        "clause-relations/supplementation-shared"
    );
    suite.eq(
        "owner-confirmed reusable routes retain their exact live control contracts",
        {
            derivation: {
                source: derivation.source,
                class: resolvedSelections(derivation.caseId)[
                    "classical-rule-logic-class"
                ],
                valence: resolvedSelections(derivation.caseId)[
                    "classical-rule-logic-valence"
                ],
                subject: resolvedSelections(derivation.caseId)[
                    "classical-rule-logic-subject"
                ],
                mood: resolvedSelections(derivation.caseId)[
                    "classical-rule-logic-mood"
                ],
                tense: resolvedSelections(derivation.caseId)[
                    "classical-rule-logic-tense"
                ],
                operation: resolvedSelections(derivation.caseId)[
                    "classical-rule-logic-late-operation"
                ],
                variant: resolvedSelections(derivation.caseId)[
                    "classical-rule-logic-late-variant"
                ],
                repetitions: resolvedSelections(derivation.caseId)[
                    "classical-rule-logic-frequentative-repetitions"
                ],
            },
            ordered: {
                source: ordered.source,
                subject: resolvedSelections(ordered.caseId)[
                    "classical-rule-logic-subject"
                ],
                voice: resolvedSelections(ordered.caseId)[
                    "classical-rule-logic-vnc-voice"
                ],
                family: resolvedSelections(ordered.caseId)[
                    "classical-rule-logic-nonactive-family"
                ],
                layer2: resolvedSelections(ordered.caseId)[
                    "classical-rule-logic-voice-layer-2"
                ],
                layer3: resolvedSelections(ordered.caseId)[
                    "classical-rule-logic-voice-layer-3"
                ],
            },
            sourceSelection: {
                source: sourceSelection.source,
                construction: resolvedSelections(sourceSelection.caseId)[
                    "classical-construction-operation"
                ],
                valence: resolvedSelections(sourceSelection.caseId)[
                    "classical-rule-logic-valence"
                ],
                subject: resolvedSelections(sourceSelection.caseId)[
                    "classical-rule-logic-subject"
                ],
            },
            pronominal: resolvedSelections(pronominal.caseId),
            relational: resolvedSelections(relational.caseId),
            conjunction: resolvedSelections(conjunction.caseId),
            supplementation: {
                participants: supplementation.participants,
                selections: resolvedSelections(supplementation.caseId),
            },
        },
        {
            derivation: {
                source: { mode: "whole-stem", fields: { whole: "chōca" } },
                class: "A",
                valence: "intransitive",
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                operation: "frequentative",
                variant: "ordinary-long",
                repetitions: "2",
            },
            ordered: {
                source: { mode: "whole-stem", fields: { whole: "yohua" } },
                subject: "1sg",
                voice: "impersonal",
                family: "inherent-impersonal",
                layer2: "tla-impersonal",
                layer3: "nonactive-lō",
            },
            sourceSelection: {
                source: {
                    mode: "embed-matrix",
                    fields: { embed: "huel", matrix: "mati" },
                },
                construction: "none",
                valence: "projective-nonhuman",
                subject: "1sg",
            },
            pronominal: {
                "classical-rule-logic-nnc-output-scope": "single",
                "classical-nnc-source-example": "yeh",
                "classical-construction-operation": "none",
                "classical-rule-logic-nnc-subject-person": "3",
                "classical-rule-logic-nnc-subject-animacy": "animate",
                "classical-rule-logic-nnc-subject-number": "singular",
                "classical-rule-logic-nnc-state": "absolutive",
                "classical-rule-logic-nnc-predicate-form": "source-stem",
                "classical-rule-logic-nnc-stem-relation": "plain",
                polarity: "positive",
                "classical-rule-logic-sentence-surface": "statement",
                "classical-rule-logic-nnc-clause-position": "initial",
            },
            relational: {
                "classical-rule-logic-nnc-output-scope": "single",
                "classical-nnc-source-example": "relational:tlan-bottom",
                "classical-construction-operation": "none",
                "classical-rule-logic-nnc-subject-person": "3",
                "classical-rule-logic-nnc-subject-animacy": "nonanimate",
                "classical-rule-logic-nnc-subject-number": "common",
                "classical-rule-logic-nnc-state": "absolutive",
                "classical-rule-logic-nnc-predicate-form": "source-stem",
                "classical-rule-logic-nnc-stem-relation": "plain",
                polarity: "positive",
                "classical-rule-logic-sentence-surface": "statement",
                "classical-relational-nnc-operation": "relational-nnc",
                "classical-relational-nnc-option": "option-two",
                "classical-relational-nnc-state": "possessive",
                "classical-relational-nnc-possessor": "3sg",
                "classical-relational-nnc-subject-mode": "adverbialized",
            },
            conjunction: {
                relation: "conjunction",
                "coordination-relation": "unmarked",
                "coordination-type": "additive",
                "clause-level": "principal",
                "[data-classical-clause-relation-decision=\"polarity\"]":
                    "positive",
                "left-context": "present",
                "rightward-modifier": "none",
                "modifier-adjunctor": "none",
                "shared-modifier-scope": "none",
                "shared-modifier": "none",
                "adjoined-function": "none",
            },
            supplementation: {
                participants: [
                    {
                        role: "principal",
                        fixtureCaseId: "vnc-base/intransitive-scalar",
                    },
                    {
                        role: "adjoined",
                        fixtureCaseId: "nnc-pronominal/personal-scalar",
                    },
                ],
                selections: {
                    relation: "supplementation",
                    "supplementation-reference-mode": "shared",
                    "supplementation-head-role": "subject",
                    "supplementation-order": "principal-first",
                },
            },
        }
    );

    const sentenceLayers = caseById.get(
        "sentence-layers/particle-and-adverbial"
    );
    const personalName = caseById.get("specialized-nnc/personal-name");
    const placeCaseIds = [
        "specialized-nnc/place-gentilic",
        "specialized-nnc/place-title",
        "specialized-nnc/place-profession",
    ];
    const comparison = caseById.get(
        "clause-relations/comparison-equality-with-dimension"
    );
    suite.eq(
        "route refinements use only visible owner options and required captures",
        {
            hiddenNoopVoiceSelections: [
                "vnc-intransitive-single",
                "vnc-transitive-single",
                "vnc-transitive-paradigm",
            ].flatMap(presetId => (
                presetById.get(presetId)?.selections || []
            )).filter(entry => [
                "classical-rule-logic-voice-layer-2",
                "classical-rule-logic-voice-layer-3",
            ].includes(entry.controlKey)),
            sentenceLayers: {
                particle: resolvedSelections(sentenceLayers.caseId)[
                    "classical-rule-logic-sentence-particle"
                ],
                honorific: resolvedSelections(sentenceLayers.caseId)[
                    "classical-rule-logic-sentence-particle-honorific"
                ],
                adverbial: resolvedSelections(sentenceLayers.caseId)[
                    "classical-rule-logic-sentence-adverbial"
                ],
            },
            personalName: {
                subject: resolvedSelections(personalName.caseId)[
                    "classical-rule-logic-subject"
                ],
                animacy: resolvedSelections(personalName.caseId)[
                    "classical-rule-logic-nnc-subject-animacy"
                ],
                number: resolvedSelections(personalName.caseId)[
                    "classical-rule-logic-nnc-subject-number"
                ],
            },
            placeCases: placeCaseIds.map(caseId => ({
                caseId,
                subject: resolvedSelections(caseId)[
                    "classical-rule-logic-subject"
                ],
                animacy: resolvedSelections(caseId)[
                    "classical-rule-logic-nnc-subject-animacy"
                ],
            })),
            comparisonParticipants: comparison.participants,
        },
        {
            hiddenNoopVoiceSelections: [],
            sentenceLayers: {
                particle: "l3-auh-conjunctor",
                honorific: true,
                adverbial: "l3-oc",
            },
            personalName: {
                subject: "2sg",
                animacy: "animate",
                number: "singular",
            },
            placeCases: placeCaseIds.map(caseId => ({
                caseId,
                subject: "1sg",
                animacy: "animate",
            })),
            comparisonParticipants: [
                {
                    role: "principal",
                    fixtureCaseId: "nnc-base/ordinary-scalar",
                },
                {
                    role: "adjoined",
                    fixtureCaseId: "nnc-base/ordinary-scalar",
                },
                {
                    role: "dependent",
                    fixtureCaseId: "nnc-base/ordinary-scalar",
                },
            ],
        }
    );

    const paradigmCaseIds = allCases
        .filter(entry => (entry.actions || []).includes("show-nnc-paradigm"))
        .map(entry => entry.caseId);
    const doubleNucleus = caseById.get(
        "specialized-nnc/deverbal-double-nucleus"
    );
    const relationalParadigm = caseById.get(
        "specialized-nnc/relational-paradigm"
    );
    const parallelStructure = caseById.get(
        "clause-relations/parallel-structure"
    );
    const compoundContact = caseById.get(
        "clause-relations/adjectival-compound-contact"
    );
    suite.eq(
        "reusable family scenarios exercise exact route gaps and canonical coordinate scopes",
        {
            paradigmCaseIds,
            doubleNucleus: {
                source: doubleNucleus.source,
                family: resolvedSelections(doubleNucleus.caseId)[
                    "classical-deverbal-nnc-family"
                ],
            },
            relationalParadigm: {
                state: resolvedSelections(relationalParadigm.caseId)[
                    "classical-relational-nnc-state"
                ],
                actions: relationalParadigm.actions,
            },
            parallelStructure: {
                participants: parallelStructure.participants,
                selections: resolvedSelections(parallelStructure.caseId),
            },
            compoundContact: {
                participants: compoundContact.participants,
                link: resolvedSelections(compoundContact.caseId)["link-kind"],
                target: resolvedSelections(compoundContact.caseId)[
                    "compound-head-target"
                ],
            },
        },
        {
            paradigmCaseIds: [
                "nominal-construction/cardinal",
                "specialized-nnc/deverbal-predicate",
                "specialized-nnc/adverbial-context",
                "specialized-nnc/place-gentilic",
                "specialized-nnc/relational-paradigm",
                "specialized-nnc/personal-name-paradigm",
                "specialized-nnc/deverbal-action-liz",
            ],
            doubleNucleus: {
                source: {
                    mode: "embed-matrix",
                    fields: { embed: "ā", matrix: "yō" },
                },
                family: "double-nucleus-ownerhood",
            },
            relationalParadigm: {
                state: "absolutive",
                actions: ["apply-source", "show-nnc-paradigm"],
            },
            parallelStructure: {
                participants: [
                    {
                        role: "principal",
                        fixtureCaseId: "nnc-base/ordinary-scalar",
                    },
                    {
                        role: "adjoined",
                        fixtureCaseId: "nnc-base/ordinary-scalar",
                    },
                ],
                selections: {
                    relation: "parallel-structure",
                    "parallel-type": "rephrasive",
                    "rephrase-axis": "active-passive",
                    "appositive-type": "none",
                },
            },
            compoundContact: {
                participants: [
                    {
                        role: "principal",
                        fixtureCaseId: "nominal-construction/compound",
                    },
                    {
                        role: "adjoined",
                        fixtureCaseId: "vnc-base/transitive-scalar",
                    },
                ],
                link: "vnc-subject",
                target: "compound-matrix",
            },
        }
    );

    const scopeOrderingFailures = [
        ...(registry.presets || []).map(entry => ({
            recordId: entry.presetId,
            selections: entry.selections || [],
        })),
        ...allCases.map(entry => ({
            recordId: entry.caseId,
            selections: entry.selections || [],
        })),
    ].flatMap(({ recordId, selections }) => {
        const scopeIndex = selections.findIndex(entry =>
            entry.controlKey.endsWith("output-scope"));
        return scopeIndex < 0 || scopeIndex === 0
            ? []
            : [{ recordId, scopeIndex }];
    });
    suite.eq(
        "output scope settles before every other preset or case selection",
        scopeOrderingFailures,
        []
    );

    return suite;
}

module.exports = { run };
