"use strict";

const { createSuite } = require("./runner");

function captureError(operation) {
    try {
        operation();
        return null;
    } catch (error) {
        return {
            code: error.code || "",
            message: error.message || "",
            details: error.details || null,
        };
    }
}

function buildDefinition(overrides = {}) {
    return {
        contractKind: "test-typed-frame",
        version: 1,
        authorityRole: "provisional",
        producer: "test-engine",
        consumers: ["test-application"],
        validator: (frame) => frame?.payload === "valid",
        description: "A test-only typed frame.",
        requiredCapabilities: ["deriveTestFrame"],
        ...overrides,
    };
}

function buildCapability(overrides = {}) {
    return {
        requirementId: "derive-test-frame",
        capability: "grammar.deriveTestFrame",
        expectedType: "function",
        requiredBy: ["test-application"],
        reason: "The application must derive the registered test frame.",
        ...overrides,
    };
}

function buildGeneratedDerivationContracts(runtimeApi) {
    const application = runtimeApi.createClassicalNahuatlVncApplication(runtimeApi);
    const request = {
        sourceStem: "tomi",
        verbClass: "B",
        sourceValence: "intransitive",
        sourceSubject: "3sg",
        subject: "1sg",
        requestedDerivation: "causative",
        causativeObjectKind: "specific-projective",
        requestedVoice: "active",
    };
    const preview = application.evaluate(request);
    const inventory = preview.controlFrame.derivationOptionInventory;
    const selectedOption = inventory.options.find((option) => option.targetStem === "tom-a");
    const generated = application.evaluate({
        ...request,
        derivationOptionId: selectedOption.optionId,
    });
    return {
        inventory,
        operation: generated.resultFrame.derivationOperationFrame,
        derivedMachinery: generated.resultFrame.activeMachineryFrame,
    };
}

function buildGeneratedMultiObjectDerivationContracts(runtimeApi) {
    const application = runtimeApi.createClassicalNahuatlVncApplication(runtimeApi);
    const request = {
        sourceStem: "chīhua",
        verbClass: "A",
        sourceValence: "specific-projective",
        sourceSubject: "1sg",
        subject: "2sg",
        objectPerson: "3sg",
        requestedDerivation: "causative",
        causativeObjectKind: "specific-projective",
        requestedVoice: "active",
    };
    const preview = application.evaluate(request);
    const selectedOption = preview.controlFrame.derivationOptionInventory.options
        .find((option) => option.targetStem === "chīhua-l-tiā");
    const generated = application.evaluate({
        ...request,
        derivationOptionId: selectedOption.optionId,
    });
    return {
        operation: generated.resultFrame.derivationOperationFrame,
        derivedMachinery: generated.resultFrame.activeMachineryFrame,
    };
}

function run(ctx = {}) {
    const s = createSuite("grammar_contract_registry");
    const registryApi = ctx;

    s.eq("registry factory is exported", typeof registryApi.createGrammarContractRegistry, "function");
    s.eq("module runtime exposes contract inspection", typeof registryApi.inspectRegisteredGrammarContract, "function");
    s.ok(
        "default registry is a real isolated registry",
        registryApi.isGrammarContractRegistry(registryApi.getDefaultGrammarContractRegistry())
    );
    s.ok(
        "default shared-action contracts are registered in one catalog",
        (() => {
            const kinds = registryApi
                .listGrammarContractDefinitions(
                    registryApi.getDefaultGrammarContractRegistry()
                )
                .map((definition) => definition.contractKind);
            return kinds.length >= 175
                && new Set(kinds).size === kinds.length
                && [
                    "classical-grammar-application-result",
                    "classical-nahuatl-transcription-frame",
                    "classical-nahuatl-adverbial-nuclear-result",
                    "classical-nahuatl-vnc-application-frame",
                    "classical-nahuatl-nnc-slot-frame",
                ].every(kind => kinds.includes(kind))
                && kinds.every(kind => !/-lesson\d+/u.test(kind));
        })(),
        [
            "classical-grammar-application-inventory",
            "classical-grammar-application-result",
            "classical-nahuatl-adverbial-context-frame",
            "classical-nahuatl-adverbial-nuclear-batch-coordinate",
            "classical-nahuatl-adverbial-nuclear-batch-plan",
            "classical-nahuatl-adverbial-nuclear-operation-frame",
            "classical-nahuatl-adverbial-nuclear-result",
            "classical-nahuatl-adverbial-potential-frame",
            "classical-nahuatl-adverbialized-subject-operation-frame",
            "classical-nahuatl-canonical-source-stem-inventory-audit",
            "classical-nahuatl-canonical-source-stem-record",
            "classical-nahuatl-comparison-ast",
            "classical-nahuatl-comparison-batch-result",
            "classical-nahuatl-comparison-gcd-frame",
            "classical-nahuatl-comparison-lcm-inventory",
            "classical-nahuatl-comparison-operation-frame",
            "classical-nahuatl-comparison-result-frame",
            "classical-nahuatl-comparison-source-unit",
            "classical-nahuatl-compound-nnc-embed-shape-frame",
            "classical-nahuatl-irregular-vnc-paradigm-plan",
            "classical-nahuatl-absolutive-nnc-absolutive-paradigm-contract-frame",
            "classical-nahuatl-possessive-nnc-possessive-paradigm-contract-frame",
            "classical-nahuatl-possessive-nnc-possessive-paradigm-coordinate-spec",
            "classical-nahuatl-possessive-nnc-possessive-paradigm-plan",
            "classical-nahuatl-nounstem-glottalized-general-use-frame",
            "classical-nahuatl-nounstem-lexical-selection-record",
            "classical-nahuatl-nounstem-nounstem-paradigm-contract-frame",
            "classical-nahuatl-nounstem-subclass-source-shape-frame",
            "classical-nahuatl-nounstem-orthographic-boundary-frame",
            "classical-nahuatl-ordinary-nnc-1516-analogical-restricted-use-contract-frame",
            "classical-nahuatl-ordinary-nnc-1517-reclassification-contract-frame",
            "classical-nahuatl-ordinary-nnc-ordinary-nnc-contract-frame",
            "classical-nahuatl-ordinary-nnc-possessor-reduplication-selection",
            "classical-nahuatl-ordinary-nnc-stem-operation-record",
            "classical-nahuatl-pronominal-nnc-pronominal-grammar-contract-frame",
            "classical-nahuatl-pronominal-nnc-pronominal-paradigm-plan",
            "classical-nahuatl-nonactive-vnc-active-stem-identity-frame",
            "classical-nahuatl-nonactive-vnc-class-c-final-i-vowel-length-rule-frame",
            "classical-nahuatl-nonactive-vnc-final-i-o-hua-vowel-length-rule-frame",
            "classical-nahuatl-nonactive-vnc-nonactive-candidate-lattice",
            "classical-nahuatl-nonactive-vnc-nonactive-final-shape-relation",
            "classical-nahuatl-nonactive-vnc-nonactive-formation-structure",
            "classical-nahuatl-nonactive-vnc-nonactive-option-inventory",
            "classical-nahuatl-nonactive-vnc-nonactive-stem-record",
            "classical-nahuatl-nonactive-vnc-productive-candidate-set",
            "classical-nahuatl-nonactive-vnc-stem-final-shape-frame",
            "classical-nahuatl-impersonal-vnc-inherent-impersonal-record",
            "classical-nahuatl-impersonal-vnc-inherent-impersonal-source-analysis",
            "classical-nahuatl-impersonal-vnc-tla-impersonal-source-analysis",
            "classical-nahuatl-impersonal-vnc-tla-impersonal-stem-record",
            "classical-nahuatl-multiple-object-vnc-object-cluster-frame",
            "classical-nahuatl-nonactive-vnc-nonactive-printed-surface-frame",
            "classical-nahuatl-nonactive-vnc-nonactive-printed-surface-operation-frame",
            "classical-nahuatl-retained-source-reflexive-shuntline-rule-frame",
            "classical-nahuatl-specific-shuntline-specific-shuntline-realization-rule-frame",
            "classical-nahuatl-accompanying-possession-accompanying-possession-result-frame",
            "classical-nahuatl-accompanying-possession-accompanying-possession-supplement-frame",
            "classical-nahuatl-sentence-adverbial-layer-frame",
            "classical-nahuatl-sentence-particle-layer-frame",
            "classical-nahuatl-nominal-embed-nominal-embed-operation-frame",
            "classical-nahuatl-nominal-embed-nominal-embed-source-frame",
            "classical-nahuatl-compound-nnc-compound-nnc-source-frame",
            "classical-nahuatl-compound-nnc-compound-operation-frame",
            "classical-nahuatl-affective-nnc-affective-nnc-source-frame",
            "classical-nahuatl-affective-nnc-affective-operation-frame",
            "classical-nahuatl-attitude-vnc-attitude-member-perfective-frame",
            "classical-nahuatl-attitude-vnc-attitude-operation-frame",
            "classical-nahuatl-attitude-vnc-attitude-vnc-source-frame",
            "classical-nahuatl-numeral-nnc-cardinal-operation-frame",
            "classical-nahuatl-numeral-nnc-cardinal-source-frame",
            "classical-nahuatl-numeral-nnc-measure-adjectival-modification-frame",
            "classical-nahuatl-numeral-nnc-numeral-vnc-adverb-operation-frame",
            "classical-nahuatl-numeral-nnc-numeral-vnc-adverb-source-frame",
            "classical-nahuatl-nuclear-clause-nuclear-clause-machinery-frame",
            "classical-nahuatl-nuclear-clause-personal-pronoun-frame",
            "classical-nahuatl-adverbial-nuclear-lcm",
            "classical-nahuatl-finite-vnc-vnc-subject-tense-machinery-frame",
            "classical-nahuatl-transitive-vnc-transitive-vnc-object-machinery-frame",
            "classical-nahuatl-verbstem-verbstem-class-machinery-frame",
            "classical-nahuatl-nominal-nuclear-clause-grammar-surface-contract-frame",
            "classical-nahuatl-nonactive-vnc-derived-vnc-machinery-frame",
            "classical-nahuatl-voice-object-vnc-voice-object-cluster-frame",
            "classical-nahuatl-derived-vnc-canvas-citation-projection-frame",
            "classical-nahuatl-derived-vnc-canvas-citation-projection-inventory",
            "classical-nahuatl-derived-vnc-canvas-citation-projection-option",
            "classical-nahuatl-derived-vnc-canvas-citation-stage-frame",
            "classical-nahuatl-derived-vnc-canvas-schematic-citation-possibility",
            "classical-nahuatl-derived-vnc-canvas-schematic-citation-possibility-inventory",
            "classical-nahuatl-late-vnc-derivation-closure-frame",
            "classical-nahuatl-late-vnc-derivation-operation-frame",
            "classical-nahuatl-late-vnc-derivation-operation-machinery-frame",
            "classical-nahuatl-late-vnc-derivation-operation-proof-frame",
            "classical-nahuatl-late-vnc-derivation-paradigm-frame",
            "classical-nahuatl-nominal-construction-canonical-vnc-result",
            "classical-nahuatl-nominal-construction-construction-frame",
            "classical-nahuatl-nominal-construction-number-frame",
            "classical-nahuatl-nominal-construction-paradigm-coordinate-frame",
            "classical-nahuatl-nominal-construction-paradigm-plan",
            "classical-nahuatl-nominal-construction-ui-projection",
            "classical-nahuatl-nominal-construction-vacant-state-frame",
            "classical-nahuatl-deverbal-nnc-canonical-nnc-result",
            "classical-nahuatl-deverbal-nnc-external-object-frame",
            "classical-nahuatl-deverbal-nnc-grammar-frame",
            "classical-nahuatl-deverbal-nnc-number-frame",
            "classical-nahuatl-deverbal-nnc-operation-frame",
            "classical-nahuatl-deverbal-nnc-paradigm-coordinate-frame",
            "classical-nahuatl-deverbal-nnc-paradigm-plan",
            "classical-nahuatl-deverbal-nnc-source-frame",
            "classical-nahuatl-deverbal-nnc-ui-projection",
            "classical-nahuatl-deverbal-nnc-vacant-state-frame",
            "classical-nahuatl-adjectival-modification-grammar-frame",
            "classical-nahuatl-adjectival-modification-result-frame",
            "classical-nahuatl-adjectival-modification-selected-clause",
            "classical-nahuatl-relational-nnc-grammar-frame",
            "classical-nahuatl-relational-nnc-prepared-plan",
            "classical-nahuatl-relational-nnc-relational-operation-frame",
            "classical-nahuatl-relational-nnc-relational-result",
            "classical-nahuatl-relational-nnc-relational-source-frame",
            "classical-nahuatl-clause-composition-grammar-contract",
            "classical-nahuatl-denominal-vnc-coordinate-frame",
            "classical-nahuatl-denominal-vnc-grammar-frame",
            "classical-nahuatl-denominal-vnc-operation-frame",
            "classical-nahuatl-denominal-vnc-operation-inventory",
            "classical-nahuatl-denominal-vnc-operation-path-inventory",
            "classical-nahuatl-denominal-vnc-paradigm-plan",
            "classical-nahuatl-denominal-vnc-result-frame",
            "classical-nahuatl-denominal-vnc-source-frame",
            "classical-nahuatl-denominal-vnc-ui-projection",
            "classical-nahuatl-nnc-slot-frame",
            "classical-nahuatl-nominal-embed-shape-frame",
            "classical-nahuatl-nonactive-prerequisite-source-rule-frame",
            "classical-nahuatl-nonactive-voice-grammar-contract",
            "classical-nahuatl-nonactive-voice-grammar-selection-frame",
            "classical-nahuatl-ordered-voice-layer-cascade-inventory",
            "classical-nahuatl-ordered-voice-layer-chain-frame",
            "classical-nahuatl-ordered-voice-layer-frame",
            "classical-nahuatl-ordered-voice-layer-option-inventory",
            "classical-nahuatl-personal-name-inner-clause-frame",
            "classical-nahuatl-personal-name-operation-frame",
            "classical-nahuatl-personal-name-paradigm-plan",
            "classical-nahuatl-personal-name-result",
            "classical-nahuatl-personal-name-sentence-operation",
            "classical-nahuatl-personal-name-source-frame",
            "classical-nahuatl-place-gentilic-nnc-frame",
            "classical-nahuatl-place-gentilic-paradigm-coordinate-frame",
            "classical-nahuatl-place-gentilic-paradigm-plan",
            "classical-nahuatl-place-gentilic-ui-projection",
            "classical-nahuatl-profile-wall-frame",
            "classical-nahuatl-relational-nnc-predicate-source-frame",
            "classical-nahuatl-relational-nnc-predicate-stem-frame",
            "classical-nahuatl-specific-projective-object-participant-frame",
            "classical-nahuatl-transcription-frame",
            "classical-nahuatl-vnc-application-control-frame",
            "classical-nahuatl-vnc-application-frame",
            "classical-nahuatl-vnc-application-request",
            "classical-nahuatl-vnc-application-result-frame",
            "classical-nahuatl-vnc-application-service",
            "classical-nahuatl-vnc-conditioned-paradigm-cell-frame",
            "classical-nahuatl-vnc-derivation-operation-batch-frame",
            "classical-nahuatl-vnc-derivation-operation-frame",
            "classical-nahuatl-vnc-derivation-option-inventory",
            "classical-nahuatl-vnc-derivation-source-analysis",
            "classical-nahuatl-vnc-derivation-type-control-inventory-validation-frame",
            "classical-nahuatl-vnc-derivation-type-selection-frame",
            "classical-nahuatl-vnc-derivation-type-vocabulary",
            "classical-nahuatl-vnc-derived-machinery-frame",
            "classical-nahuatl-vnc-exact-nonactive-bridge-frame",
            "classical-nahuatl-vnc-finite-surface-frame",
            "classical-nahuatl-vnc-nonactive-formation-option",
            "classical-nahuatl-vnc-nonactive-formation-option-inventory",
            "classical-nahuatl-vnc-paradigm-coordinate-frame",
            "classical-nahuatl-vnc-paradigm-generation-plan",
            "classical-nahuatl-vnc-semantic-control-inventory-validation-frame",
            "classical-nahuatl-vnc-semantic-input-vocabulary",
            "classical-nahuatl-vnc-semantic-selection-frame",
            "classical-nahuatl-vnc-sentence-result-frame",
            "classical-nahuatl-vnc-slot-frame",
            "classical-nahuatl-vnc-voice-control-inventory-validation-frame",
            "classical-nahuatl-vnc-voice-selection-frame",
            "classical-nahuatl-vnc-voice-vocabulary",
            "classical-ordinary-nnc-noun-class-vocabulary",
            "classical-result-output-scope-control-inventory-validation-frame",
            "classical-result-output-scope-selection-frame",
            "classical-result-output-scope-vocabulary",
            "generation-source-transitivity-control-inventory-validation-frame",
            "generation-source-transitivity-selection-frame",
            "generation-source-transitivity-vocabulary",
            "ordinary-nnc-noun-class-control-inventory-validation-frame",
            "ordinary-nnc-noun-class-selection-frame",
        ]
    );
    s.eq(
        "default catalog declares the application capability consumers",
        registryApi.listGrammarCapabilityRequirements(registryApi.getDefaultGrammarContractRegistry())
            .map((requirement) => [requirement.capability, requirement.requiredBy]),
        [[
            "evaluateClassicalNahuatlVncApplication",
            ["classical-presentation", "classical-verification"],
        ]]
    );
    s.eq(
        "the semantic transcription contract requires its owner-issued frame and retires both old final kinds",
        (() => {
            const registry =
                registryApi.getDefaultGrammarContractRegistry();
            const sourceFrame =
                registryApi.buildClassicalNahuatlTranscriptionSourceFrame({
                    constituents: [{ segments: ["/k/", "a", "/l/"] }],
                });
            const frame =
                registryApi.buildClassicalNahuatlTranscriptionFrame(sourceFrame);
            return {
                canonical:
                    registryApi.inspectRegisteredGrammarContract(
                        registry,
                        frame
                    ).ok,
                copied:
                    registryApi.inspectRegisteredGrammarContract(
                        registry,
                        { ...frame }
                    ).ok,
                serialized:
                    registryApi.inspectRegisteredGrammarContract(
                        registry,
                        JSON.parse(JSON.stringify(frame))
                    ).ok,
                string:
                    registryApi.inspectRegisteredGrammarContract(
                        registry,
                        "classical-nahuatl-transcription-frame"
                    ).ok,
                oldMachineryDefinition:
                    registryApi.getGrammarContractDefinition(
                        registry,
                        "classical-nahuatl-transcription-machinery-frame",
                        1
                    ),
                oldOrthographyDefinition:
                    registryApi.getGrammarContractDefinition(
                        registry,
                        "classical-nahuatl-transcription-orthography-frame",
                        1
                    ),
            };
        })(),
        {
            canonical: true,
            copied: false,
            serialized: false,
            string: false,
            oldMachineryDefinition: null,
            oldOrthographyDefinition: null,
        }
    );

    const registry = registryApi.createGrammarContractRegistry({ registryId: "test-registry" });
    const definition = registryApi.registerGrammarContractDefinition(registry, buildDefinition());
    s.eq("registered definition keeps explicit identity", {
        contractKind: definition.contractKind,
        version: definition.version,
        authorityRole: definition.authorityRole,
        producer: definition.producer,
        consumers: definition.consumers,
        requiredCapabilities: definition.requiredCapabilities,
    }, {
        contractKind: "test-typed-frame",
        version: 1,
        authorityRole: "provisional",
        producer: "test-engine",
        consumers: ["test-application"],
        requiredCapabilities: ["deriveTestFrame"],
    });
    s.ok("registered definitions are immutable", Object.isFrozen(definition) && Object.isFrozen(definition.consumers));
    s.eq("exact definition lookup succeeds", registryApi.getGrammarContractDefinition(registry, "test-typed-frame", 1), definition);
    s.eq("definition inventory is deterministic", registryApi.listGrammarContractDefinitions(registry), [definition]);

    const versionTwo = registryApi.registerGrammarContractDefinition(registry, buildDefinition({
        version: 2,
        validator: (frame) => frame?.payload === "version-two",
    }));
    s.eq("unversioned lookup returns the newest registered version", registryApi.getGrammarContractDefinition(registry, "test-typed-frame"), versionTwo);
    s.eq(
        "duplicate kind and version fails loudly",
        captureError(() => registryApi.registerGrammarContractDefinition(registry, buildDefinition())).code,
        "DUPLICATE_GRAMMAR_CONTRACT_DEFINITION"
    );
    s.eq(
        "definitions require an explicit authority role",
        captureError(() => registryApi.registerGrammarContractDefinition(
            registryApi.createGrammarContractRegistry(),
            buildDefinition({ authorityRole: "" })
        )).code,
        "GRAMMAR_CONTRACT_AUTHORITY_ROLE_REQUIRED"
    );
    s.eq(
        "definitions require an explicit validator",
        captureError(() => registryApi.registerGrammarContractDefinition(
            registryApi.createGrammarContractRegistry(),
            buildDefinition({ validator: null })
        )).code,
        "GRAMMAR_CONTRACT_VALIDATOR_REQUIRED"
    );

    const validFrame = { kind: "test-typed-frame", version: 1, payload: "valid" };
    s.ok("registered frame validates", registryApi.inspectRegisteredGrammarContract(registry, validFrame).ok);
    s.ok("boolean validator helper accepts the frame", registryApi.isRegisteredGrammarContract(registry, validFrame));
    s.eq("assert returns the original typed frame", registryApi.assertRegisteredGrammarContract(registry, validFrame), validFrame);
    s.eq(
        "caller-selected wrong kind cannot pass",
        registryApi.inspectRegisteredGrammarContract(registry, validFrame, { contractKind: "other-frame" }).errors,
        ["unexpected-contract-kind"]
    );
    s.eq(
        "missing frame version fails closed",
        registryApi.inspectRegisteredGrammarContract(registry, { kind: "test-typed-frame", payload: "valid" }).errors,
        ["contract-version-missing-or-invalid"]
    );
    s.eq(
        "caller-selected wrong contract version cannot pass",
        registryApi.inspectRegisteredGrammarContract(registry, validFrame, { version: 2 }).errors,
        ["unexpected-contract-version"]
    );
    s.eq(
        "validator rejection fails closed",
        registryApi.inspectRegisteredGrammarContract(
            registry,
            { kind: "test-typed-frame", version: 1, payload: "caller-poison" }
        ).errors,
        ["contract-validator-rejected-frame"]
    );
    s.eq(
        "unregistered string-only authority fails closed",
        captureError(() => registryApi.assertRegisteredGrammarContract(registry, "test-typed-frame")).code,
        "INVALID_REGISTERED_GRAMMAR_CONTRACT"
    );

    const throwingRegistry = registryApi.createGrammarContractRegistry({
        definitions: [buildDefinition({ validator: () => { throw new Error("poison"); } })],
    });
    s.eq(
        "validator exceptions fail closed without authorizing",
        registryApi.inspectRegisteredGrammarContract(throwingRegistry, validFrame).errors,
        ["contract-validator-threw"]
    );

    const capabilityRegistry = registryApi.createGrammarContractRegistry();
    const requirement = registryApi.registerGrammarCapabilityRequirement(capabilityRegistry, buildCapability());
    s.ok("capability requirement is immutable", Object.isFrozen(requirement) && Object.isFrozen(requirement.requiredBy));
    s.eq("capability lookup succeeds", registryApi.getGrammarCapabilityRequirement(capabilityRegistry, "derive-test-frame"), requirement);
    s.eq("capability inventory is deterministic", registryApi.listGrammarCapabilityRequirements(capabilityRegistry), [requirement]);

    const missingReport = registryApi.inspectGrammarCapabilityRequirements(capabilityRegistry, { grammar: {} });
    s.no("missing required capability does not pass", missingReport.ok);
    s.eq("missing capability is named", missingReport.missing.map((entry) => entry.requirementId), ["derive-test-frame"]);
    const invalidReport = registryApi.inspectGrammarCapabilityRequirements(capabilityRegistry, {
        grammar: { deriveTestFrame: "not-a-function" },
    });
    s.no("wrong capability type does not pass", invalidReport.ok);
    s.eq("wrong capability type is explicit", invalidReport.invalid[0].actualType, "string");
    const capabilitySource = { grammar: { deriveTestFrame: () => validFrame } };
    const satisfiedReport = registryApi.inspectGrammarCapabilityRequirements(capabilityRegistry, capabilitySource);
    s.ok("present correctly typed capability passes", satisfiedReport.ok);
    s.eq("capability assertion returns the original source", registryApi.assertGrammarCapabilityRequirements(capabilityRegistry, capabilitySource), capabilitySource);
    s.eq(
        "capability assertion fails loudly instead of degrading",
        captureError(() => registryApi.assertGrammarCapabilityRequirements(capabilityRegistry, { grammar: {} })).code,
        "UNSATISFIED_GRAMMAR_CAPABILITY_REQUIREMENTS"
    );
    s.eq(
        "capabilities require explicit consumers",
        captureError(() => registryApi.registerGrammarCapabilityRequirement(
            registryApi.createGrammarContractRegistry(),
            buildCapability({ requiredBy: [] })
        )).code,
        "GRAMMAR_CAPABILITY_CONSUMER_REQUIRED"
    );

    const runtimeRegistry = registryApi.getDefaultGrammarContractRegistry();
    s.eq(
        "canonical grammar application inventory and result validate their GCD LCM boundary",
        (() => {
            const canonicalResult = Object.freeze({
                kind: "classical-nahuatl-nuclear-clause-structure-result",
                version: 1,
                authorizationStatus: "authorized",
                sourceDocument: "ANDREWS_TRANSCRIPTION_CANVAS.md",
                proofFrame: Object.freeze({
                    authorizationStatus: "authorized",
                }),
                grammarGenerationAllowed: true,
                formulaRealization: "#0-0(mati)0+0-0#",
            });
            const application = registryApi.createClassicalGrammarApplicationApi({
                buildClassicalNahuatlNuclearClauseResult: () => canonicalResult,
                isClassicalNahuatlNuclearClauseResult:
                    candidate => candidate === canonicalResult,
            });
            const inventory = application.getClassicalGrammarApplicationInventory();
            const result = application.executeClassicalGrammarApplicationRequest({
                operationId: "vnc:nuclear-clause",
                args: ["mati"],
            });
            const blockedCanonicalResult = Object.freeze({
                    kind: "classical-nahuatl-nuclear-clause-structure-result",
                    version: 1,
                    authorizationStatus: "blocked",
                    blockReason: "typed-source-required",
                });
            const blockedResult = registryApi.createClassicalGrammarApplicationApi({
                buildClassicalNahuatlNuclearClauseResult:
                    () => blockedCanonicalResult,
                isClassicalNahuatlNuclearClauseResult:
                    candidate => candidate === blockedCanonicalResult,
            }).executeClassicalGrammarApplicationRequest({
                operationId: "vnc:nuclear-clause",
                args: ["mati"],
            });
            const hostileInventory = {
                ...inventory,
                formulaStringAuthority: true,
            };
            const hostileAxisInventory = {
                ...inventory,
                leastCommonMultiple: {
                    ...inventory.leastCommonMultiple,
                    axisOwners: inventory.leastCommonMultiple.axisOwners.map((axis, index) => (
                        index === 0 ? { ...axis, ownerOperationIds: [] } : axis
                    )),
                    allAxesOwned: false,
                },
            };
            const hostileResult = {
                ...result,
                leastCommonMultiple: {
                    ...result.leastCommonMultiple,
                    selectedAxisIds: ["hostile-axis"],
                    selectedAxisCount: 1,
                    selectedAxisOwners: [{
                        axisId: "hostile-axis",
                        ownerOperationIds: ["vnc:nuclear-clause"],
                        prerequisiteInvariantIds: result.greatestCommonDivisor.invariantIds,
                        licensedValueAuthority: "semantic-owner-canonical-result",
                        callerSuppliedValueAuthority: false,
                    }],
                },
            };
            return {
                inventory: registryApi.inspectRegisteredGrammarContract(runtimeRegistry, inventory).ok,
                result: registryApi.inspectRegisteredGrammarContract(runtimeRegistry, result).ok,
                blockedResult: registryApi.inspectRegisteredGrammarContract(
                    runtimeRegistry,
                    blockedResult
                ).ok,
                blockedGcdSatisfied: blockedResult.greatestCommonDivisor.satisfied,
                hostileInventory: registryApi.inspectRegisteredGrammarContract(
                    runtimeRegistry,
                    hostileInventory
                ).errors,
                hostileAxisInventory: registryApi.inspectRegisteredGrammarContract(
                    runtimeRegistry,
                    hostileAxisInventory
                ).errors,
                hostileResult: registryApi.inspectRegisteredGrammarContract(
                    runtimeRegistry,
                    hostileResult
                ).errors,
            };
        })(),
        {
            inventory: true,
            result: true,
            blockedResult: true,
            blockedGcdSatisfied: false,
            hostileInventory: [
                "contract-validator-rejected-frame",
                "classical-grammar-application-inventory-external-authority-forbidden",
            ],
            hostileAxisInventory: [
                "contract-validator-rejected-frame",
                "classical-grammar-application-inventory-axis-ownership-invalid",
            ],
            hostileResult: [
                "contract-validator-rejected-frame",
                "classical-grammar-application-result-selected-axes-outside-global-lcm",
            ],
        }
    );
    s.eq(
        "application and derivation contracts expose canonical live-runtime validators",
        [
            "isClassicalNahuatlVncApplicationResultFrame",
            "isClassicalNahuatlVncApplicationFrame",
            "isClassicalNahuatlVncDerivationOptionInventory",
            "isClassicalNahuatlVncDerivationOperationFrame",
            "isClassicalNahuatlDerivedVncMachineryFrame",
        ].map((validatorName) => [validatorName, typeof registryApi[validatorName]]),
        [
            ["isClassicalNahuatlVncApplicationResultFrame", "function"],
            ["isClassicalNahuatlVncApplicationFrame", "function"],
            ["isClassicalNahuatlVncDerivationOptionInventory", "function"],
            ["isClassicalNahuatlVncDerivationOperationFrame", "function"],
            ["isClassicalNahuatlDerivedVncMachineryFrame", "function"],
        ]
    );
    s.eq(
        "real generated inventory, operation, and derived machinery pass their registered canonical contracts",
        (() => {
            const { inventory, operation, derivedMachinery } = buildGeneratedDerivationContracts(registryApi);
            return [inventory, operation, derivedMachinery].map((frame) => ({
                kind: frame.kind,
                status: frame.authorizationStatus,
                registered: registryApi.inspectRegisteredGrammarContract(runtimeRegistry, frame).ok,
                alternateLanguageAuthorityFields: Object.keys(frame).filter((key) => (
                    /forwardPool|languageProfile|orthographyBridge|conversionProfile/iu.test(key)
                )),
            }));
        })(),
        [
            {
                kind: "classical-nahuatl-vnc-derivation-option-inventory",
                status: "authorized",
                registered: true,
                alternateLanguageAuthorityFields: [],
            },
            {
                kind: "classical-nahuatl-vnc-derivation-operation-frame",
                status: "authorized",
                registered: true,
                alternateLanguageAuthorityFields: [],
            },
            {
                kind: "classical-nahuatl-vnc-derived-machinery-frame",
                status: "authorized",
                registered: true,
                alternateLanguageAuthorityFields: [],
            },
        ]
    );
    s.eq(
        "public Impersonal formation inventory exposes every open typed Lesson 22 formation without making internal voice operations public",
        (() => {
            const application = registryApi.createClassicalNahuatlVncApplication(registryApi);
            const preview = application.evaluate({
                sourceStem: "mayāna",
                verbClass: "A",
                sourceValence: "intransitive",
                subject: "3sg",
                requestedDerivation: "direct",
                requestedVoice: "impersonal",
            });
            const inventory = preview.controlFrame.nonactiveOptionInventory;
            const internalOptions = inventory.options.filter((option) => option.kind === "classical-nahuatl-vnc-nonactive-formation-option");
            const forgedInventory = {
                ...inventory,
                internalVoiceOperationsArePublicChoices: true,
            };
            return {
                publicVoice: inventory.publicVoice,
                selectorRequired: inventory.selectorRequired,
                optionIds: inventory.options.map((option) => option.optionId),
                inventoryRegistered: registryApi.inspectRegisteredGrammarContract(runtimeRegistry, inventory).ok,
                internalOptionsRegistered: internalOptions.map((option) => registryApi.inspectRegisteredGrammarContract(runtimeRegistry, option).ok),
                forgedInventoryRegistered: registryApi.inspectRegisteredGrammarContract(runtimeRegistry, forgedInventory).ok,
            };
        })(),
        {
            publicVoice: "impersonal",
            selectorRequired: true,
            optionIds: ["lō:mayāna-lō", "inherent-impersonal", "tla-impersonal"],
            inventoryRegistered: true,
            internalOptionsRegistered: [true, true],
            forgedInventoryRegistered: false,
        }
    );
    s.eq(
        "plausible signature strings and target lies cannot forge authorized derivation contracts",
        (() => {
            const { inventory, operation, derivedMachinery } = buildGeneratedDerivationContracts(registryApi);
            const forgedInventory = {
                ...inventory,
                canonicalSignature: "signed:plausible-inventory",
                options: inventory.options.map((option, index) => index === 0 ? {
                    ...option,
                    targetStem: "LIE",
                    canonicalSignature: "signed:plausible-option",
                } : option),
            };
            const forgedOperation = {
                ...operation,
                targetStem: "LIE",
                canonicalSignature: "signed:plausible-operation",
            };
            const forgedDerivedMachinery = {
                ...derivedMachinery,
                targetStem: "LIE",
                derivationOperationFrame: forgedOperation,
                canonicalSignature: "signed:plausible-derived-machinery",
            };
            return [forgedInventory, forgedOperation, forgedDerivedMachinery].map((frame) => {
                const report = registryApi.inspectRegisteredGrammarContract(runtimeRegistry, frame);
                return {
                    kind: frame.kind,
                    ok: report.ok,
                    canonicalFailure: report.errors.some((error) => error.includes("canonical-validator-required")),
                };
            });
        })(),
        [
            {
                kind: "classical-nahuatl-vnc-derivation-option-inventory",
                ok: false,
                canonicalFailure: true,
            },
            {
                kind: "classical-nahuatl-vnc-derivation-operation-frame",
                ok: false,
                canonicalFailure: true,
            },
            {
                kind: "classical-nahuatl-vnc-derived-machinery-frame",
                ok: false,
                canonicalFailure: true,
            },
        ]
    );
    s.eq(
        "stale signatures cannot hide forged nested selected-option metadata",
        (() => {
            const { operation } = buildGeneratedDerivationContracts(registryApi);
            const inspectMutation = (mutate) => {
                const forged = JSON.parse(JSON.stringify(operation));
                const oldOptionSignature = forged.selectedOption.canonicalSignature;
                const oldOperationSignature = forged.canonicalSignature;
                mutate(forged.selectedOption);
                const report = registryApi.inspectRegisteredGrammarContract(runtimeRegistry, forged);
                return {
                    staleSignaturesPreserved: forged.selectedOption.canonicalSignature === oldOptionSignature
                        && forged.canonicalSignature === oldOperationSignature,
                    canonical: registryApi.isClassicalNahuatlVncDerivationOperationFrame(forged),
                    registered: report.ok,
                    canonicalFailure: report.errors.some((error) => error.includes("canonical-validator-required")),
                };
            };
            return {
                label: inspectMutation((option) => {
                    option.label = "FORGED-LABEL";
                }),
                suffix: inspectMutation((option) => {
                    option.suffix = "FORGED-SUFFIX";
                }),
                exactWitness: inspectMutation((option) => {
                    option.exactWitness = false;
                }),
                authorityFlags: inspectMutation((option) => {
                    option.formulaArtifactAuthority = true;
                    option.surfaceArtifactAuthority = true;
                    option.callerSuppliedTargetAllowed = true;
                }),
            };
        })(),
        {
            label: {
                staleSignaturesPreserved: true,
                canonical: false,
                registered: false,
                canonicalFailure: true,
            },
            suffix: {
                staleSignaturesPreserved: true,
                canonical: false,
                registered: false,
                canonicalFailure: true,
            },
            exactWitness: {
                staleSignaturesPreserved: true,
                canonical: false,
                registered: false,
                canonicalFailure: true,
            },
            authorityFlags: {
                staleSignaturesPreserved: true,
                canonical: false,
                registered: false,
                canonicalFailure: true,
            },
        }
    );
    s.eq(
        "duplicate Lesson 23 object identities cannot survive canonical machinery validation",
        (() => {
            const { derivedMachinery } = buildGeneratedMultiObjectDerivationContracts(registryApi);
            const forgedCluster = JSON.parse(JSON.stringify(derivedMachinery.targetObjectClusterFrame));
            forgedCluster.objectRequests[1].objectId = forgedCluster.objectRequests[0].objectId;
            const forgedMachinery = JSON.parse(JSON.stringify(derivedMachinery));
            forgedMachinery.targetObjectClusterFrame.objectRequests[1].objectId =
                forgedMachinery.targetObjectClusterFrame.objectRequests[0].objectId;
            const report = registryApi.inspectRegisteredGrammarContract(runtimeRegistry, forgedMachinery);
            return {
                objectCount: forgedCluster.objectRequests.length,
                duplicateIds: new Set(forgedCluster.objectRequests.map((request) => request.objectId)).size === 1,
                clusterCanonical: registryApi.isClassicalNahuatlObjectClusterFrame(
                    forgedCluster,
                    forgedCluster.sourceStem
                ),
                machineryCanonical: registryApi.isClassicalNahuatlDerivedVncMachineryFrame(forgedMachinery),
                registered: report.ok,
                canonicalFailure: report.errors.some((error) => error.includes("canonical-validator-required")),
            };
        })(),
        {
            objectCount: 2,
            duplicateIds: true,
            clusterCanonical: false,
            machineryCanonical: false,
            registered: false,
            canonicalFailure: true,
        }
    );
    s.eq(
        "canonical derivation contracts reject poisoned operation aliases, participant authority, and forged lower typed sources",
        (() => {
            const { operation, derivedMachinery } = buildGeneratedDerivationContracts(registryApi);
            const poisonOperation = (mutate) => {
                const forged = JSON.parse(JSON.stringify(operation));
                mutate(forged);
                return registryApi.isClassicalNahuatlVncDerivationOperationFrame(forged);
            };
            const forgedMachinery = JSON.parse(JSON.stringify(derivedMachinery));
            forgedMachinery.derivationOperationFrame.participantTransformFrame.formulaArtifactAuthority = true;
            forgedMachinery.derivationOperationFrame.participantTransformFrame.targetObjectCount = 999;

            const forgedBase = registryApi.buildClassicalNahuatlVerbstemClassFrame("xeloa", {
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                verbClass: "C",
                perfectiveClass: "C",
                requestedSourceValence: "specific-projective",
                valence: "specific-projective",
                transitivity: "transitive",
                objectKind: "specific-projective",
                objectPerson: "3sg",
            });
            const forgedBaseClone = JSON.parse(JSON.stringify(forgedBase));
            const typedSource = forgedBaseClone.proofFrame.conclusion.finalTypedVncSlotFrame;
            typedSource.slots.prePredicate[0].carrier = "LIE";
            typedSource.semanticIdentity = [
                typedSource.slots.subject.pers1,
                typedSource.slots.subject.pers2,
                ...typedSource.slots.prePredicate.map((slot) => slot.carrier),
                typedSource.slots.predicate.stem,
                typedSource.slots.predicate.tns,
                typedSource.slots.number.num1,
                typedSource.slots.number.num2,
            ].join("|");
            const forgedBaseInventory = registryApi.getClassicalNahuatlVncDerivationOptionInventory(forgedBaseClone, {
                derivationType: "applicative",
            });
            return {
                participantAuthority: poisonOperation((forged) => {
                    forged.participantTransformFrame.formulaArtifactAuthority = true;
                }),
                participantCount: poisonOperation((forged) => {
                    forged.participantTransformFrame.targetObjectCount = 999;
                }),
                sourceStemAlias: poisonOperation((forged) => {
                    forged.sourceStem = "LIE";
                }),
                sourceTypedAlias: poisonOperation((forged) => {
                    forged.sourceTypedVncSlotFrame.semanticIdentity = "LIE";
                }),
                requestedOptionAlias: poisonOperation((forged) => {
                    forged.requestedOptionId = "LIE";
                }),
                derivedMachinery: registryApi.isClassicalNahuatlDerivedVncMachineryFrame(forgedMachinery),
                forgedBaseInventory: {
                    status: forgedBaseInventory.authorizationStatus,
                    reason: forgedBaseInventory.blockReason,
                    canonical: registryApi.isClassicalNahuatlVncDerivationOptionInventory(forgedBaseInventory),
                },
            };
        })(),
        {
            participantAuthority: false,
            participantCount: false,
            sourceStemAlias: false,
            sourceTypedAlias: false,
            requestedOptionAlias: false,
            derivedMachinery: false,
            forgedBaseInventory: {
                status: "blocked",
                reason: "classical-vnc-derivation-base-source-not-canonical",
                canonical: false,
            },
        }
    );
    s.eq("module runtime returns its canonical default catalog", runtimeRegistry, registryApi.DEFAULT_GRAMMAR_CONTRACT_REGISTRY);
    s.eq(
        "The Lesson 23 object-cluster contract owns nested governors and rejects hostile carrier authority",
        (() => {
            const cluster = registryApi.buildClassicalNahuatlObjectClusterFrame("contract-proof", {
                subject: "3sg",
                subjectCarrier: "0",
                predicateStem: "contract-proof",
                tense: "present",
                objectRequests: [{
                    objectId: "direct",
                    objectKind: "specific-projective",
                    objectPerson: "3sg",
                    governor: "directive",
                    derivationalLevel: 1,
                }, {
                    objectId: "caused",
                    objectKind: "nonspecific-human",
                    objectPerson: "",
                    governor: "causative",
                    derivationalLevel: 2,
                }],
                minimumPositionCount: 2,
                maximumPositionCount: 2,
            });
            const forgedCluster = JSON.parse(JSON.stringify(cluster));
            forgedCluster.positions[1].governorUnitFrame.objectCarrierAuthority = true;
            return {
                canonical: registryApi.inspectRegisteredGrammarContract(runtimeRegistry, cluster).ok,
                hostile: registryApi.inspectRegisteredGrammarContract(runtimeRegistry, forgedCluster).ok,
                standaloneGovernorContract: Boolean(registryApi.getGrammarContractDefinition(
                    runtimeRegistry,
                    "classical-nahuatl-multiple-object-vnc-object-governor-unit-frame",
                    1,
                )),
                closureBuilder: typeof registryApi.buildClassicalNahuatlLesson23ObjectCombinationClosureFrame,
            };
        })(),
        {
            canonical: true,
            hostile: false,
            standaloneGovernorContract: false,
            closureBuilder: "undefined",
        }
    );
    s.eq("module runtime validates contracts without a DOM", typeof registryApi.inspectRegisteredGrammarContract, "function");
    s.ok("module runtime default catalog remains immutable", Object.isFrozen(runtimeRegistry));
    s.eq(
        "foreign registry-shaped objects are rejected",
        captureError(() => registryApi.listGrammarContractDefinitions({ kind: "grammar-contract-registry" })).code,
        "INVALID_GRAMMAR_CONTRACT_REGISTRY"
    );

    return s;
}

module.exports = { run };
