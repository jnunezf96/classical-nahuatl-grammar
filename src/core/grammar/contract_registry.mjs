// Canonical modern ESM module.

import { CLASSICAL_RESULT_OUTPUT_SCOPES } from "../output/scope.mjs?v=20260722-output-scope-contract-054";

export function createGrammarContractRegistryModule(targetObject = globalThis) {
    var GRAMMAR_CONTRACT_REGISTRY_VERSION = 1;
    var GRAMMAR_CONTRACT_REGISTRY_STATE = new WeakMap();
    var GRAMMAR_CAPABILITY_EXPECTED_TYPES = Object.freeze(["array", "boolean", "function", "number", "object", "string"]);
    function normalizeGrammarRegistryToken(value = "") {
      return String(value || "").trim();
    }
    function normalizeGrammarRegistryStringList(values = []) {
      if (!Array.isArray(values)) {
        throw new TypeError("Expected an explicit array of strings.");
      }
      return Object.freeze(Array.from(new Set(values.map(normalizeGrammarRegistryToken).filter(Boolean))));
    }
    function createGrammarRegistryError(code, message, details = null) {
      const error = new Error(message);
      error.code = code;
      if (details) {
        error.details = details;
      }
      return error;
    }
    function getGrammarContractRegistryState(registry) {
      const state = GRAMMAR_CONTRACT_REGISTRY_STATE.get(registry);
      if (!state) {
        throw createGrammarRegistryError("INVALID_GRAMMAR_CONTRACT_REGISTRY", "A registry created by createGrammarContractRegistry() is required.");
      }
      return state;
    }
    function isGrammarContractRegistry(registry) {
      return GRAMMAR_CONTRACT_REGISTRY_STATE.has(registry);
    }
    function createGrammarContractRegistry(options = {}) {
      const registry = Object.freeze({
        kind: "grammar-contract-registry",
        version: GRAMMAR_CONTRACT_REGISTRY_VERSION,
        registryId: normalizeGrammarRegistryToken(options.registryId) || "default"
      });
      GRAMMAR_CONTRACT_REGISTRY_STATE.set(registry, {
        definitions: new Map(),
        capabilityRequirements: new Map()
      });
      (Array.isArray(options.definitions) ? options.definitions : []).forEach(definition => {
        registerGrammarContractDefinition(registry, definition);
      });
      (Array.isArray(options.capabilityRequirements) ? options.capabilityRequirements : []).forEach(requirement => {
        registerGrammarCapabilityRequirement(registry, requirement);
      });
      return registry;
    }
    function getGrammarContractDefinitionKey(contractKind = "", version = 0) {
      return `${normalizeGrammarRegistryToken(contractKind)}@${Number(version) || 0}`;
    }
    function normalizeGrammarContractDefinition(definition = {}) {
      const contractKind = normalizeGrammarRegistryToken(definition.contractKind || definition.kind);
      const version = Number(definition.version);
      const authorityRole = normalizeGrammarRegistryToken(definition.authorityRole);
      const producer = normalizeGrammarRegistryToken(definition.producer);
      if (!contractKind) {
        throw createGrammarRegistryError("GRAMMAR_CONTRACT_KIND_REQUIRED", "Contract definition requires contractKind.");
      }
      if (!Number.isInteger(version) || version < 1) {
        throw createGrammarRegistryError("GRAMMAR_CONTRACT_VERSION_REQUIRED", `${contractKind} requires a positive integer version.`);
      }
      if (!authorityRole) {
        throw createGrammarRegistryError("GRAMMAR_CONTRACT_AUTHORITY_ROLE_REQUIRED", `${contractKind}@${version} requires authorityRole.`);
      }
      if (!producer) {
        throw createGrammarRegistryError("GRAMMAR_CONTRACT_PRODUCER_REQUIRED", `${contractKind}@${version} requires producer.`);
      }
      if (!Array.isArray(definition.consumers)) {
        throw createGrammarRegistryError("GRAMMAR_CONTRACT_CONSUMERS_REQUIRED", `${contractKind}@${version} requires an explicit consumers array.`);
      }
      if (typeof definition.validator !== "function") {
        throw createGrammarRegistryError("GRAMMAR_CONTRACT_VALIDATOR_REQUIRED", `${contractKind}@${version} requires a validator function.`);
      }
      return Object.freeze({
        contractKind,
        version,
        authorityRole,
        producer,
        consumers: normalizeGrammarRegistryStringList(definition.consumers),
        validator: definition.validator,
        description: normalizeGrammarRegistryToken(definition.description),
        requiredCapabilities: normalizeGrammarRegistryStringList(definition.requiredCapabilities || [])
      });
    }
    function registerGrammarContractDefinition(registry, definition = {}) {
      const state = getGrammarContractRegistryState(registry);
      const normalized = normalizeGrammarContractDefinition(definition);
      const key = getGrammarContractDefinitionKey(normalized.contractKind, normalized.version);
      if (state.definitions.has(key)) {
        throw createGrammarRegistryError("DUPLICATE_GRAMMAR_CONTRACT_DEFINITION", `Contract ${key} is already registered.`);
      }
      state.definitions.set(key, normalized);
      return normalized;
    }
    function getGrammarContractDefinition(registry, contractKind = "", version = null) {
      const state = getGrammarContractRegistryState(registry);
      const normalizedKind = normalizeGrammarRegistryToken(contractKind);
      if (!normalizedKind) {
        return null;
      }
      if (version !== null && version !== undefined && version !== "") {
        return state.definitions.get(getGrammarContractDefinitionKey(normalizedKind, version)) || null;
      }
      return Array.from(state.definitions.values()).filter(definition => definition.contractKind === normalizedKind).sort((left, right) => right.version - left.version)[0] || null;
    }
    function listGrammarContractDefinitions(registry) {
      return Object.freeze(Array.from(getGrammarContractRegistryState(registry).definitions.values()).sort((left, right) => left.contractKind.localeCompare(right.contractKind) || left.version - right.version));
    }
    function normalizeGrammarContractValidationResult(result) {
      if (result === true) {
        return {
          ok: true,
          diagnostics: []
        };
      }
      if (result && typeof result === "object") {
        return {
          ok: result.ok === true,
          diagnostics: Array.isArray(result.diagnostics) ? result.diagnostics.map(normalizeGrammarRegistryToken).filter(Boolean) : []
        };
      }
      return {
        ok: false,
        diagnostics: []
      };
    }
    function inspectRegisteredGrammarContract(registry, frame, expected = {}) {
      getGrammarContractRegistryState(registry);
      const errors = [];
      const expectedKind = normalizeGrammarRegistryToken(expected.contractKind || expected.kind);
      const hasExpectedVersion = expected.version !== null && expected.version !== undefined && expected.version !== "";
      const expectedVersion = hasExpectedVersion ? Number(expected.version) : null;
      const frameIsObject = Boolean(frame && typeof frame === "object" && !Array.isArray(frame));
      const contractKind = frameIsObject ? normalizeGrammarRegistryToken(frame.kind) : "";
      const version = frameIsObject ? Number(frame.version) : 0;
      if (!frameIsObject) {
        errors.push("contract-frame-object-required");
      }
      if (!contractKind) {
        errors.push("contract-kind-missing");
      }
      if (!Number.isInteger(version) || version < 1) {
        errors.push("contract-version-missing-or-invalid");
      }
      if (expectedKind && contractKind && expectedKind !== contractKind) {
        errors.push("unexpected-contract-kind");
      }
      if (hasExpectedVersion && (!Number.isInteger(expectedVersion) || expectedVersion < 1)) {
        errors.push("expected-contract-version-invalid");
      } else if (expectedVersion && version && expectedVersion !== version) {
        errors.push("unexpected-contract-version");
      }
      const definition = contractKind && version ? getGrammarContractDefinition(registry, contractKind, version) : null;
      if (contractKind && version && !definition) {
        errors.push("unregistered-contract-kind-or-version");
      }
      if (definition && !errors.length) {
        try {
          const validation = normalizeGrammarContractValidationResult(definition.validator(frame));
          if (!validation.ok) {
            errors.push("contract-validator-rejected-frame");
          }
          errors.push(...validation.diagnostics);
        } catch (_error) {
          errors.push("contract-validator-threw");
        }
      }
      return Object.freeze({
        kind: "grammar-contract-validation-report",
        version: 1,
        ok: errors.length === 0,
        status: errors.length ? "invalid" : "valid",
        contractKind,
        contractVersion: version || null,
        authorityRole: definition?.authorityRole || "",
        definition,
        errors: Object.freeze(errors)
      });
    }
    function isRegisteredGrammarContract(registry, frame, expected = {}) {
      return inspectRegisteredGrammarContract(registry, frame, expected).ok;
    }
    function assertRegisteredGrammarContract(registry, frame, expected = {}) {
      const report = inspectRegisteredGrammarContract(registry, frame, expected);
      if (!report.ok) {
        throw createGrammarRegistryError("INVALID_REGISTERED_GRAMMAR_CONTRACT", `Registered grammar contract validation failed: ${report.errors.join(", ")}.`, report);
      }
      return frame;
    }
    function normalizeGrammarCapabilityRequirement(requirement = {}) {
      const requirementId = normalizeGrammarRegistryToken(requirement.requirementId || requirement.id || requirement.capability);
      const capability = normalizeGrammarRegistryToken(requirement.capability);
      const expectedType = normalizeGrammarRegistryToken(requirement.expectedType || "function");
      const requiredBy = normalizeGrammarRegistryStringList(requirement.requiredBy || []);
      const reason = normalizeGrammarRegistryToken(requirement.reason);
      if (!requirementId || !capability) {
        throw createGrammarRegistryError("GRAMMAR_CAPABILITY_ID_REQUIRED", "Capability requirement requires requirementId and capability.");
      }
      if (!GRAMMAR_CAPABILITY_EXPECTED_TYPES.includes(expectedType)) {
        throw createGrammarRegistryError("GRAMMAR_CAPABILITY_TYPE_INVALID", `${requirementId} has unsupported expectedType ${expectedType}.`);
      }
      if (!requiredBy.length) {
        throw createGrammarRegistryError("GRAMMAR_CAPABILITY_CONSUMER_REQUIRED", `${requirementId} requires at least one requiredBy entry.`);
      }
      if (!reason) {
        throw createGrammarRegistryError("GRAMMAR_CAPABILITY_REASON_REQUIRED", `${requirementId} requires a reason.`);
      }
      return Object.freeze({
        requirementId,
        capability,
        expectedType,
        requiredBy,
        reason
      });
    }
    function registerGrammarCapabilityRequirement(registry, requirement = {}) {
      const state = getGrammarContractRegistryState(registry);
      const normalized = normalizeGrammarCapabilityRequirement(requirement);
      if (state.capabilityRequirements.has(normalized.requirementId)) {
        throw createGrammarRegistryError("DUPLICATE_GRAMMAR_CAPABILITY_REQUIREMENT", `Capability requirement ${normalized.requirementId} is already registered.`);
      }
      state.capabilityRequirements.set(normalized.requirementId, normalized);
      return normalized;
    }
    function getGrammarCapabilityRequirement(registry, requirementId = "") {
      return getGrammarContractRegistryState(registry).capabilityRequirements.get(normalizeGrammarRegistryToken(requirementId)) || null;
    }
    function listGrammarCapabilityRequirements(registry) {
      return Object.freeze(Array.from(getGrammarContractRegistryState(registry).capabilityRequirements.values()).sort((left, right) => left.requirementId.localeCompare(right.requirementId)));
    }
    function getGrammarCapabilityValue(capabilitySource, capability = "") {
      const path = normalizeGrammarRegistryToken(capability).split(".").filter(Boolean);
      let current = capabilitySource;
      for (const segment of path) {
        if (current === null || current === undefined || !(segment in Object(current))) {
          return {
            found: false,
            value: undefined
          };
        }
        current = current[segment];
      }
      return {
        found: path.length > 0,
        value: current
      };
    }
    function getGrammarCapabilityValueType(value) {
      if (Array.isArray(value)) {
        return "array";
      }
      if (value === null) {
        return "null";
      }
      return typeof value;
    }
    function inspectGrammarCapabilityRequirements(registry, capabilitySource = globalThis) {
      const satisfied = [];
      const missing = [];
      const invalid = [];
      listGrammarCapabilityRequirements(registry).forEach(requirement => {
        const resolution = getGrammarCapabilityValue(capabilitySource, requirement.capability);
        const record = Object.freeze({
          requirementId: requirement.requirementId,
          capability: requirement.capability,
          expectedType: requirement.expectedType,
          actualType: resolution.found ? getGrammarCapabilityValueType(resolution.value) : "missing",
          requiredBy: requirement.requiredBy,
          reason: requirement.reason
        });
        if (!resolution.found) {
          missing.push(record);
        } else if (record.actualType !== requirement.expectedType) {
          invalid.push(record);
        } else {
          satisfied.push(record);
        }
      });
      return Object.freeze({
        kind: "grammar-capability-requirement-report",
        version: 1,
        ok: missing.length === 0 && invalid.length === 0,
        satisfied: Object.freeze(satisfied),
        missing: Object.freeze(missing),
        invalid: Object.freeze(invalid)
      });
    }
    function assertGrammarCapabilityRequirements(registry, capabilitySource = globalThis) {
      const report = inspectGrammarCapabilityRequirements(registry, capabilitySource);
      if (!report.ok) {
        const unsatisfied = [...report.missing, ...report.invalid].map(requirement => requirement.requirementId).join(", ");
        throw createGrammarRegistryError("UNSATISFIED_GRAMMAR_CAPABILITY_REQUIREMENTS", `Required grammar capabilities are unavailable: ${unsatisfied}.`, report);
      }
      return capabilitySource;
    }
    function buildGrammarContractValidationResult(checks = []) {
      const diagnostics = checks.filter(check => check?.ok !== true).map(check => normalizeGrammarRegistryToken(check?.diagnostic)).filter(Boolean);
      return {
        ok: diagnostics.length === 0,
        diagnostics
      };
    }
    function getClassicalVncConditionedParadigmCellProfile(frame = null) {
      const profiles = {
        "be-suppletive:preterit-as-present": {
          sourceSection: "11.5.1.c.i",
          paradigmTense: "preterit-as-present",
          semanticTenseValue: "present",
          morphologicalTense: "preterit",
          morphologicalAspect: "perfective",
          distinctionAxes: ["subject-number", "suppletive-stem-member", "number-dyad", "usage-register"],
          realizationCount: 3
        },
        "be-suppletive:distant-past-as-past": {
          sourceSection: "11.5.1.c.ii",
          paradigmTense: "distant-past-as-past",
          semanticTenseValue: "general-past",
          morphologicalTense: "distant-past",
          morphologicalAspect: "perfective",
          distinctionAxes: ["subject-number", "suppletive-stem-member", "tense-morph", "number-dyad"],
          realizationCount: 2
        }
      };
      return profiles[frame?.greatestCommonDivisor?.paradigmCellId] || null;
    }
    function isAuthorizedGrammarContractCanonical(frame = null, validatorName = "") {
      if (frame?.authorizationStatus !== "authorized") {
        return true;
      }
      return isGrammarContractCanonicalFrame(frame, validatorName);
    }
    function isGrammarContractCanonicalFrame(frame = null, validatorName = "") {
      const canonicalValidator = targetObject?.[normalizeGrammarRegistryToken(validatorName)];
      if (typeof canonicalValidator !== "function") {
        return false;
      }
      try {
        return canonicalValidator.call(targetObject, frame) === true;
      } catch (_error) {
        return false;
      }
    }
    function buildClassicalAuxiliaryGrammarContractDefinition(definition = {}) {
      const consumers = Array.isArray(definition.consumers) ? definition.consumers : ["classical-verification"];
      const requiredCapabilities = Array.isArray(definition.requiredCapabilities)
        ? definition.requiredCapabilities
        : ["classical-vnc-derivation-evaluator"];
      return Object.freeze({
        ...definition,
        version: 1,
        consumers: Object.freeze([...consumers]),
        requiredCapabilities: Object.freeze([...requiredCapabilities])
      });
    }
    const CLASSICAL_LESSON56_TYPED_CONTRACT_KINDS = Object.freeze([
      "classical-nahuatl-personal-name-inner-clause-frame",
      "classical-nahuatl-personal-name-source-frame",
      "classical-nahuatl-personal-name-operation-frame",
      "classical-nahuatl-personal-name-result",
      "classical-nahuatl-personal-name-paradigm-plan",
      "classical-nahuatl-personal-name-sentence-operation",
    ]);
    const CLASSICAL_LESSON56_TYPED_CONTRACT_DEFINITIONS = Object.freeze(
      CLASSICAL_LESSON56_TYPED_CONTRACT_KINDS.map(contractKind => Object.freeze({
        contractKind,
        version: 2,
        authorityRole: "typed-lesson56-personal-name-nnc-component",
        producer: "canonical-personal-name-nnc-engine",
        consumers: ["classical-presentation", "classical-verification"],
        description: "A sealed typed component of the Lesson 56 complete-statement downgrade and outer-NNC operation.",
        requiredCapabilities: [],
        validator: frame => buildGrammarContractValidationResult([{
          ok: frame?.kind === contractKind && frame?.version === 2,
          diagnostic: "lesson56-component-kind-or-version-invalid"
        }, {
          ok: frame?.typedFrameAuthority === true,
          diagnostic: "lesson56-component-typed-authority-missing"
        }, {
          ok: frame?.callerSuppliedFormulaAuthority !== true
            && frame?.callerSuppliedSurfaceAuthority !== true,
          diagnostic: "lesson56-component-string-authority-invalid"
        }])
      }))
    );
    const CLASSICAL_VERSIONED_COMPONENT_CONTRACT_SPECS = Object.freeze([
      Object.freeze({ contractKind: "classical-nahuatl-irregular-vnc-paradigm-plan", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-possessive-nnc-possessive-paradigm-coordinate-spec", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-nounstem-glottalized-general-use-frame", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-nounstem-lexical-selection-record", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-nounstem-subclass-source-shape-frame", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-nounstem-orthographic-boundary-frame", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-ordinary-nnc-possessor-reduplication-selection", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-ordinary-nnc-stem-operation-record", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-nonactive-vnc-active-stem-identity-frame", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-nonactive-vnc-class-c-final-i-vowel-length-rule-frame", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-nonactive-vnc-final-i-o-hua-vowel-length-rule-frame", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-nonactive-vnc-nonactive-candidate-lattice", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-nonactive-vnc-nonactive-final-shape-relation", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-nonactive-vnc-nonactive-formation-structure", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-nonactive-vnc-nonactive-option-inventory", version: 6 }),
      Object.freeze({ contractKind: "classical-nahuatl-nonactive-vnc-nonactive-stem-record", version: 4 }),
      Object.freeze({ contractKind: "classical-nahuatl-nonactive-vnc-productive-candidate-set", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-nonactive-vnc-stem-final-shape-frame", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-impersonal-vnc-inherent-impersonal-record", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-impersonal-vnc-inherent-impersonal-source-analysis", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-impersonal-vnc-tla-impersonal-source-analysis", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-impersonal-vnc-tla-impersonal-stem-record", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-multiple-object-vnc-object-cluster-frame", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-accompanying-possession-accompanying-possession-result-frame", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-accompanying-possession-accompanying-possession-supplement-frame", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-sentence-adverbial-layer-frame", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-sentence-particle-layer-frame", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-attitude-vnc-attitude-member-perfective-frame", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-attitude-vnc-attitude-operation-frame", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-attitude-vnc-attitude-vnc-source-frame", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-cardinal-vnc-adverb-operation-frame", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-cardinal-vnc-adverb-source-frame", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-nuclear-clause-nuclear-clause-machinery-frame", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-nuclear-clause-personal-pronoun-frame", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-finite-vnc-vnc-subject-tense-machinery-frame", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-transitive-vnc-transitive-vnc-object-machinery-frame", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-verbstem-verbstem-class-machinery-frame", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-nonactive-vnc-derived-vnc-machinery-frame", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-voice-object-vnc-voice-object-cluster-frame", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-late-vnc-derivation-operation-proof-frame", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-late-vnc-derivation-paradigm-frame", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-deverbal-nnc-canonical-nnc-result", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-deverbal-nnc-external-object-frame", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-deverbal-nnc-number-frame", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-deverbal-nnc-operation-frame", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-deverbal-nnc-paradigm-coordinate-frame", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-deverbal-nnc-source-frame", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-deverbal-nnc-ui-projection", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-deverbal-nnc-vacant-state-frame", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-adjectival-modification-selected-clause", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-nnc-slot-frame", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-nonactive-prerequisite-source-rule-frame", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-nonactive-voice-grammar-selection-frame", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-ordered-voice-layer-cascade-inventory", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-ordered-voice-layer-chain-frame", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-ordered-voice-layer-frame", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-ordered-voice-layer-option-inventory", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-profile-wall-frame", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-specific-projective-object-participant-frame", version: 1 }),
      Object.freeze({ contractKind: "classical-nahuatl-vnc-slot-frame", version: 1 }),
    ]);
    const CLASSICAL_VERSIONED_COMPONENT_CONTRACT_DEFINITIONS = Object.freeze(
      CLASSICAL_VERSIONED_COMPONENT_CONTRACT_SPECS.map(({ contractKind, version }) => Object.freeze({
        contractKind,
        version,
        authorityRole: "typed-versioned-classical-grammar-component",
        producer: "canonical-classical-grammar-engine",
        consumers: ["classical-application", "classical-verification"],
        description: "A legitimate versioned typed frame emitted by the canonical Classical grammar engine.",
        requiredCapabilities: [],
        validator: frame => buildGrammarContractValidationResult([{
          ok: frame?.kind === contractKind && frame?.version === version,
          diagnostic: "versioned-classical-component-kind-or-version-invalid"
        }, {
          ok: frame?.lessonMetadataAuthority !== true
            && frame?.formulaStringAuthority !== true
            && frame?.surfaceStringAuthority !== true
            && frame?.displayTextAuthority !== true,
          diagnostic: "versioned-classical-component-external-authority-forbidden"
        }, ...(contractKind === "classical-nahuatl-multiple-object-vnc-object-cluster-frame"
          ? [{
            ok: isAuthorizedGrammarContractCanonical(
              frame,
              "isClassicalNahuatlObjectClusterFrame"
            ),
            diagnostic: "lesson23-object-cluster-owner-issued-frame-required"
          }]
          : [])])
      }))
    );
    var DEFAULT_GRAMMAR_CONTRACT_DEFINITIONS = Object.freeze([
      ...CLASSICAL_LESSON56_TYPED_CONTRACT_DEFINITIONS,
      ...CLASSICAL_VERSIONED_COMPONENT_CONTRACT_DEFINITIONS,
      Object.freeze({
      contractKind: "classical-nahuatl-transcription-frame",
      version: 1,
      authorityRole: "canonical-classical-transcription-result",
      producer: "classical-nahuatl-transcription",
      consumers: ["classical-grammar-application", "classical-boundary-realization", "classical-verification"],
      description: "The owner-issued Classical transcription result consumed by the canonical orthography operation.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: isAuthorizedGrammarContractCanonical(
          frame,
          "isClassicalNahuatlTranscriptionFrame"
        ),
        diagnostic: "classical-transcription-owner-issued-frame-required"
      }, {
        ok: frame?.typedFrameAuthority === true
          && frame?.callerSuppliedAuthorityAccepted === false
          && frame?.callerSuppliedFormulaAuthority === false
          && frame?.callerSuppliedSurfaceAuthority === false
          && frame?.lessonMetadataAuthority === false
          && frame?.formulaStringAuthority === false
          && frame?.surfaceStringAuthority === false
          && frame?.displayTextAuthority === false,
        diagnostic: "classical-transcription-external-authority-forbidden"
      }])
    }), Object.freeze({
      contractKind: "classical-grammar-application-inventory",
      version: 1,
      authorityRole: "typed-semantic-application-operation-and-axis-inventory",
      producer: "classical-grammar-application",
      consumers: ["classical-presentation", "classical-verification"],
      description: "The complete semantic-operation inventory and global LCM axes exposed by the canonical Classical grammar application.",
      requiredCapabilities: [],
      validator: frame => {
        const operationIds = frame?.operationIds;
        const operations = frame?.operations;
        const invariantIds = frame?.greatestCommonDivisor?.invariantIds;
        const globalAxes = frame?.leastCommonMultiple?.axisIds;
        const axisOwners = frame?.leastCommonMultiple?.axisOwners;
        const operationAxisIds = Array.isArray(operations)
          ? operations.flatMap(operation => operation?.axisIds || [])
          : [];
        return buildGrammarContractValidationResult([{
          ok: frame?.kind === "classical-grammar-application-inventory"
            && frame?.version === 1,
          diagnostic: "classical-grammar-application-inventory-kind-or-version-invalid"
        }, {
          ok: Array.isArray(operationIds)
            && operationIds.length > 0
            && new Set(operationIds).size === operationIds.length
            && Array.isArray(operations)
            && operations.length === operationIds.length
            && operations.every(operation =>
              operation
              && operationIds.includes(operation.operationId)
              && typeof operation.capabilityName === "string"
              && operation.capabilityName.length > 0
              && Array.isArray(operation.axisIds)
              && typeof operation.capabilityInstalled === "boolean"
            )
            && new Set(operations.map(operation => operation.operationId)).size
              === operations.length
            && frame?.allCapabilitiesInstalled
              === operations.every(operation => operation.capabilityInstalled),
          diagnostic: "classical-grammar-application-inventory-operations-invalid"
        }, {
          ok: frame?.greatestCommonDivisor?.identityId
              === "typed-semantic-application-to-canonical-result"
            && Array.isArray(invariantIds)
            && invariantIds.length > 0
            && new Set(invariantIds).size === invariantIds.length,
          diagnostic: "classical-grammar-application-inventory-gcd-invalid"
        }, {
          ok: Array.isArray(globalAxes)
            && globalAxes.length > 0
            && new Set(globalAxes).size === globalAxes.length
            && frame?.leastCommonMultiple?.axisCount === globalAxes.length
            && operationAxisIds.every(axisId => globalAxes.includes(axisId)),
          diagnostic: "classical-grammar-application-inventory-lcm-invalid"
        }, {
          ok: Array.isArray(axisOwners)
            && axisOwners.length === globalAxes?.length
            && new Set(axisOwners.map(axis => axis?.axisId)).size === axisOwners.length
            && axisOwners.every(axis =>
              globalAxes.includes(axis?.axisId)
              && Array.isArray(axis?.ownerOperationIds)
              && axis.ownerOperationIds.length > 0
              && axis.ownerOperationIds.every(operationId => operationIds.includes(operationId))
              && Array.isArray(axis?.prerequisiteInvariantIds)
              && axis.prerequisiteInvariantIds.length > 0
              && axis.prerequisiteInvariantIds.every(invariantId => invariantIds.includes(invariantId))
              && axis?.licensedValueAuthority === "semantic-owner-canonical-result"
              && axis?.callerSuppliedValueAuthority === false
            )
            && globalAxes.every(axisId => axisOwners.some(axis => axis.axisId === axisId))
            && frame?.leastCommonMultiple?.allAxesOwned === true,
          diagnostic: "classical-grammar-application-inventory-axis-ownership-invalid"
        }, {
          ok: frame?.curriculumOrderAuthority === false
            && frame?.lessonMetadataAuthority === false
            && frame?.formulaStringAuthority === false
            && frame?.surfaceStringAuthority === false
            && frame?.displayTextAuthority === false,
          diagnostic: "classical-grammar-application-inventory-external-authority-forbidden"
        }]);
      }
    }),
      Object.freeze({
      contractKind: "classical-grammar-application-result",
      version: 1,
      authorityRole: "typed-semantic-application-to-canonical-result",
      producer: "classical-grammar-application",
      consumers: ["classical-presentation", "classical-verification"],
      description: "The canonical application result for one selected semantic operation and its licensed global LCM axes.",
      requiredCapabilities: [],
      validator: frame => {
        const invariantIds = frame?.greatestCommonDivisor?.invariantIds;
        const invariantProofs = frame?.greatestCommonDivisor?.invariantProofs;
        const allInvariantsProven = Array.isArray(invariantIds)
          && invariantIds.length > 0
          && new Set(invariantIds).size === invariantIds.length
          && invariantIds.every(invariantId => invariantProofs?.[invariantId] === true);
        const globalAxes = frame?.leastCommonMultiple?.axisIds;
        const selectedAxes = frame?.leastCommonMultiple?.selectedAxisIds;
        const selectedAxisOwners = frame?.leastCommonMultiple?.selectedAxisOwners;
        return buildGrammarContractValidationResult([{
          ok: frame?.kind === "classical-grammar-application-result"
            && frame?.version === 1
            && ["authorized", "blocked"].includes(frame?.authorizationStatus)
            && typeof frame?.operationId === "string"
            && frame.operationId.length > 0,
          diagnostic: "classical-grammar-application-result-kind-version-status-or-operation-invalid"
        }, {
          ok: frame?.authorizationStatus !== "authorized"
            || (
              frame?.greatestCommonDivisor?.identityId
                === "typed-semantic-application-to-canonical-result"
              && frame.greatestCommonDivisor.satisfied === true
              && allInvariantsProven
              && frame?.canonicalResult != null
            ),
          diagnostic: "classical-grammar-application-result-gcd-not-satisfied"
        }, {
          ok: frame?.authorizationStatus !== "blocked"
            || (
              frame?.greatestCommonDivisor?.satisfied === false
              && allInvariantsProven === false
            ),
          diagnostic: "classical-grammar-application-result-blocked-gcd-invalid"
        }, {
          ok: Array.isArray(globalAxes)
            && Array.isArray(selectedAxes)
            && selectedAxes.every(axisId => globalAxes.includes(axisId))
            && frame?.leastCommonMultiple?.selectedAxisCount === selectedAxes.length,
          diagnostic: "classical-grammar-application-result-selected-axes-outside-global-lcm"
        }, {
          ok: Array.isArray(selectedAxisOwners)
            && selectedAxisOwners.length === selectedAxes?.length
            && new Set(selectedAxisOwners.map(axis => axis?.axisId)).size
              === selectedAxisOwners.length
            && selectedAxisOwners.every(axis =>
              selectedAxes.includes(axis?.axisId)
              && Array.isArray(axis?.ownerOperationIds)
              && axis.ownerOperationIds.includes(frame?.operationId)
              && axis?.licensedValueAuthority === "semantic-owner-canonical-result"
              && axis?.callerSuppliedValueAuthority === false
            )
            && selectedAxes.every(axisId =>
              selectedAxisOwners.some(axis => axis.axisId === axisId)
            ),
          diagnostic: "classical-grammar-application-result-selected-axis-ownership-invalid"
        }, {
          ok: frame?.curriculumOrderAuthority === false
            && frame?.lessonMetadataAuthority === false
            && frame?.formulaStringAuthority === false
            && frame?.surfaceStringAuthority === false
            && frame?.displayTextAuthority === false,
          diagnostic: "classical-grammar-application-result-external-authority-forbidden"
        }]);
      }
    }),
      Object.freeze({
      contractKind: "classical-nahuatl-absolutive-nnc-absolutive-paradigm-contract-frame",
      version: 1,
      authorityRole: "typed-absolutive-nnc-common-identity-and-complete-distinction-inventory",
      producer: "classical-lesson12-nnc-engine",
      consumers: ["classical-nnc-selected-output", "classical-nnc-paradigm-projection", "classical-verification"],
      description: "The common absolutive-NNC identity and complete Lesson 12 distinction inventory, with the selected coordinate derived only from typed NNC slots.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: frame?.authorizationStatus === "authorized"
          && frame?.realizationPhase === "structural-formula",
        diagnostic: "lesson12-absolutive-paradigm-contract-status-invalid"
      }, {
        ok: frame?.sourceDocument === "ANDREWS_TRANSCRIPTION_CANVAS.md"
          && frame?.sourceSection === "12.1-12.7",
        diagnostic: "lesson12-absolutive-paradigm-contract-source-invalid"
      }, {
        ok: frame?.greatestCommonDivisor?.identityId === "lesson12:absolutive-state-nnc"
          && frame.greatestCommonDivisor.clauseKind === "nominal-nuclear-clause"
          && frame.greatestCommonDivisor.state === "absolutive"
          && frame.greatestCommonDivisor.stateArity === "vacant"
          && frame.greatestCommonDivisor.predicateKind === "nounstem"
          && frame.greatestCommonDivisor.formulaTemplate === "#pers1-pers2(STEM)num1-num2#"
          && frame.greatestCommonDivisor.valencePosition === "replaced-by-state"
          && frame.greatestCommonDivisor.tensePosition === "absent"
          && frame.greatestCommonDivisor.numberBelongsTo === "subject-personal-pronoun",
        diagnostic: "lesson12-absolutive-paradigm-contract-gcd-invalid"
      }, {
        ok: Array.isArray(frame?.leastCommonMultiple?.distinctionAxes)
          && frame.leastCommonMultiple.distinctionAxes.join("|")
            === "subject-person|subject-number|subject-person-morphs|absolutive-number-dyad|noun-class-conditioned-connector|animacy-reference|lexical-state-availability|predicate-function|discourse-time-reference"
          && Array.isArray(frame.leastCommonMultiple.subjectPersonInventory)
          && frame.leastCommonMultiple.subjectPersonInventory
            .map(entry => `${entry.identity}:${entry.subject}:${entry.number}`)
            .join("|")
            === "first-singular:1sg:singular|second-singular:2sg:singular|third-singular-or-common:3sg-or-common:singular-or-common|first-plural:1pl:plural|second-plural:2pl:plural|third-plural:3pl:plural"
          && Array.isArray(frame.leastCommonMultiple.numberDyadInventory)
          && frame.leastCommonMultiple.numberDyadInventory
            .map(entry => `${entry.identity}:${entry.subjectNumber}:${entry.num1}-${entry.num2}:${(entry.num1SurfaceVariants || []).join("~")}`)
            .join("|")
            === "absolutive-singular-common-tl:singular-or-common:tl-0:|absolutive-singular-common-tli-li:singular-or-common:tli-0:tli~li|absolutive-singular-common-in:singular-or-common:in-0:|absolutive-singular-common-zero:singular-or-common:0-0:|absolutive-plural-t-in:plural:t-in:|absolutive-plural-m-eh:plural:m-eh:|absolutive-plural-zero-h:plural:0-h:"
          && Array.isArray(frame.leastCommonMultiple.subjectPronounShapeInventory)
          && frame.leastCommonMultiple.subjectPronounShapeInventory.length === 21
          && new Set(frame.leastCommonMultiple.subjectPronounShapeInventory.map(entry => entry.identity)).size === 21
          && frame.leastCommonMultiple.subjectPronounShapeInventory.every(entry => (
            frame.leastCommonMultiple.subjectPersonInventory.some(subject => (
              subject.identity === entry.subjectIdentity
              && subject.subject === entry.subject
              && subject.person === entry.person
              && subject.number === entry.number
            ))
            && frame.leastCommonMultiple.numberDyadInventory.some(numberDyad => (
              numberDyad.identity === entry.numberDyadIdentity
              && numberDyad.num1 === entry.num1
              && numberDyad.num2 === entry.num2
              && (
                numberDyad.subjectNumber === "plural"
                ? entry.number === "plural"
                : entry.number !== "plural"
              )
            ))
            && entry.identity === `${entry.subjectIdentity}:${entry.numberDyadIdentity}`
          ))
          && Array.isArray(frame.leastCommonMultiple.predicateFunctionInventory)
          && frame.leastCommonMultiple.predicateFunctionInventory.join("|") === "identify|describe|locate"
          && Array.isArray(frame.leastCommonMultiple.animacyReferenceInventory)
          && frame.leastCommonMultiple.animacyReferenceInventory.join("|")
            === "animate-singular|animate-plural|nonanimate-common|metaphorical-animate"
          && Array.isArray(frame.leastCommonMultiple.selectedRealizations)
          && frame.leastCommonMultiple.selectedRealizations.length === 1,
        diagnostic: "lesson12-absolutive-paradigm-contract-lcm-invalid"
      }, {
        ok: Boolean(frame?.leastCommonMultiple?.selectedCoordinate?.coordinateId)
          && frame.leastCommonMultiple.selectedCoordinate.coordinateId
          === frame?.leastCommonMultiple?.selectedRealizations?.[0]?.coordinateId
          && frame.leastCommonMultiple.selectedCoordinate.typedSlotFrame?.kind === "classical-nahuatl-nnc-slot-frame"
          && frame.leastCommonMultiple.selectedCoordinate.typedSlotFrame?.authorizationStatus === "authorized"
          && frame.leastCommonMultiple.subjectPronounShapeInventory.some(entry => (
            entry.identity === frame.leastCommonMultiple.selectedCoordinate.subjectPronounShapeIdentity
          ))
          && Boolean(frame.leastCommonMultiple.selectedCoordinate.formulaRealization)
          && frame.leastCommonMultiple.selectedCoordinate.formulaStringAuthority === false
          && frame.leastCommonMultiple.selectedCoordinate.displayTextAuthority === false,
        diagnostic: "lesson12-absolutive-paradigm-contract-selected-realization-invalid"
      }, {
        ok: frame?.callerSuppliedAuthorityAccepted === false
          && frame?.formulaStringAuthority === false
          && frame?.displayTextAuthority === false,
        diagnostic: "lesson12-absolutive-paradigm-contract-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-possessive-nnc-possessive-paradigm-contract-frame",
      version: 1,
      authorityRole: "typed-possessive-nnc-common-identity-and-complete-distinction-inventory",
      producer: "classical-lesson13-nnc-engine",
      consumers: ["classical-nnc-selected-output", "classical-nnc-paradigm-projection", "classical-verification"],
      description: "The common possessive-NNC identity and complete Lesson 13 subject and possessor-State inventories, with the selected coordinate derived only from typed NNC slots.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: frame?.authorizationStatus === "authorized"
          && frame?.realizationPhase === "structural-formula",
        diagnostic: "lesson13-possessive-paradigm-contract-status-invalid"
      }, {
        ok: frame?.sourceDocument === "ANDREWS_TRANSCRIPTION_CANVAS.md"
          && frame?.sourceSection === "13.1-13.6",
        diagnostic: "lesson13-possessive-paradigm-contract-source-invalid"
      }, {
        ok: frame?.greatestCommonDivisor?.identityId === "lesson13:possessive-state-nnc"
          && frame.greatestCommonDivisor.clauseKind === "nominal-nuclear-clause"
          && frame.greatestCommonDivisor.state === "possessive"
          && frame.greatestCommonDivisor.statePosition === "nonvacant-prefixal-pronoun"
          && frame.greatestCommonDivisor.stateArity === "monadic-or-dyadic"
          && frame.greatestCommonDivisor.stateCategories?.join("|") === "person|number|possessive-case"
          && frame.greatestCommonDivisor.predicateKind === "nounstem"
          && frame.greatestCommonDivisor.formulaSchema === "#pers1-pers2+STATE(STEM)num1-num2#"
          && frame.greatestCommonDivisor.subjectPersonSystem === "same-as-absolutive-nnc"
          && frame.greatestCommonDivisor.valencePosition === "replaced-by-state"
          && frame.greatestCommonDivisor.tensePosition === "absent"
          && frame.greatestCommonDivisor.numberBelongsTo === "subject-personal-pronoun",
        diagnostic: "lesson13-possessive-paradigm-contract-gcd-invalid"
      }, {
        ok: frame?.leastCommonMultiple?.distinctionAxes?.join("|")
            === "formula-state-arity|subject-person|subject-number|subject-person-morphs|subject-person-boundary-conditioning|possessive-number-dyad|subject-connector-conditioning|possessor-reference-type|possessor-person|possessor-number|possessive-case-location|possessor-state-morphs|possessor-boundary-conditioning|nounstem-possessor-compatibility"
          && frame.leastCommonMultiple.formulaTemplateInventory
            ?.map(entry => `${entry.identity}:${entry.stateArity}:${entry.formulaTemplate}`)
            .join("|")
            === "possessive-monadic-state:monadic:#pers1-pers2+st(STEM)num1-num2#|possessive-dyadic-state:dyadic:#pers1-pers2+st1-st2(STEM)num1-num2#"
          && frame.leastCommonMultiple.subjectPersonInventory
            ?.map(entry => `${entry.identity}:${entry.subject}:${entry.person}:${entry.number}:${entry.pers1}-${entry.pers2}:${entry.pers1SurfaceVariants.join("~")}`)
            .join("|")
            === "first-singular:1sg:first:singular:n-0:n~ni|second-singular:2sg:second:singular:t-0:t~ti|third-singular-or-common:3sg-or-common:third:singular-or-common:0-0:0|first-plural:1pl:first:plural:t-0:t~ti|second-plural:2pl:second:plural:am-0:am~an|third-plural:3pl:third:plural:0-0:0"
          && frame.leastCommonMultiple.numberDyadInventory
            ?.map(entry => `${entry.identity}:${entry.subjectNumber}:${entry.num1}-${entry.num2}:${entry.conditioning}`)
            .join("|")
            === "possessive-singular-common-uh:singular-or-common:uh-0:after-vowel-before-silent-num2-and-morphologically-selected|possessive-singular-common-hui:singular-or-common:hui-0:after-consonant-and-rare-morphological-selection|possessive-singular-common-zero:singular-or-common:0-0:morphologically-selected|possessive-plural-hu-an:plural:hu-ān:plural-subject"
          && Array.isArray(frame.leastCommonMultiple.subjectPronounShapeInventory)
          && frame.leastCommonMultiple.subjectPronounShapeInventory.length === 12
          && new Set(frame.leastCommonMultiple.subjectPronounShapeInventory.map(entry => entry.identity)).size === 12
          && frame.leastCommonMultiple.subjectPronounShapeInventory.every(entry => (
            frame.leastCommonMultiple.subjectPersonInventory.some(subject => (
              subject.identity === entry.subjectIdentity
              && subject.subject === entry.subject
              && subject.person === entry.person
              && subject.number === entry.number
              && subject.pers1 === entry.pers1
              && subject.pers1SurfaceVariants.join("|")
                === entry.pers1SurfaceVariants?.join("|")
              && subject.pers2 === entry.pers2
            ))
            && frame.leastCommonMultiple.numberDyadInventory.some(numberDyad => (
              numberDyad.identity === entry.numberDyadIdentity
              && numberDyad.num1 === entry.num1
              && numberDyad.num2 === entry.num2
              && (
                numberDyad.subjectNumber === "plural"
                ? entry.number === "plural"
                : entry.number !== "plural"
              )
            ))
            && entry.identity === `${entry.subjectIdentity}:${entry.numberDyadIdentity}`
          )),
        diagnostic: "lesson13-possessive-paradigm-contract-subject-lcm-invalid"
      }, {
        ok: Array.isArray(frame?.leastCommonMultiple?.possessorStateShapeInventory)
          && frame.leastCommonMultiple.possessorStateShapeInventory.length === 14
          && new Set(frame.leastCommonMultiple.possessorStateShapeInventory.map(entry => entry.identity)).size === 14
          && frame.leastCommonMultiple.possessorStateShapeInventory
            .map(entry => [
              entry.identity,
              entry.stateArity,
              entry.possessor,
              entry.referenceType,
              entry.possessorPerson,
              entry.possessorNumber,
              `${entry.st}/${entry.st1}/${entry.st2}`,
              entry.possessiveCaseLocation,
              entry.conditioning
            ].join(":"))
            .join("|")
            === "monadic-reciprocal-ne:monadic:reciprocal:reciprocal:third:reciprocal:ne//:state:third-person-subject-only|monadic-nonspecific-human-te:monadic:nonspecific-human:nonspecific-human:nonspecific:nonspecific:tē//:state:unrestricted-human-reference|monadic-nonspecific-nonhuman-tla:monadic:nonspecific-nonhuman:nonspecific-nonhuman:nonspecific:nonspecific:tla//:state:relational-or-authorized-analogical-derived-nounstem|dyadic-first-singular-o:dyadic:1sg:specific:first:singular:/n/o:st2:consonant-initial-stem|dyadic-first-singular-silent:dyadic:1sg:specific:first:singular:/n/⎕:st2:vowel-initial-stem|dyadic-first-plural-o:dyadic:1pl:specific:first:plural:/t/o:st2:consonant-initial-stem|dyadic-first-plural-silent:dyadic:1pl:specific:first:plural:/t/⎕:st2:vowel-initial-stem|dyadic-second-singular-o:dyadic:2sg:specific:second:singular:/m/o:st2:consonant-initial-stem|dyadic-second-singular-silent:dyadic:2sg:specific:second:singular:/m/⎕:st2:vowel-initial-stem|dyadic-second-plural-o:dyadic:2pl:specific:second:plural:/am/o:st2:consonant-initial-stem|dyadic-second-plural-silent:dyadic:2pl:specific:second:plural:/am/⎕:st2:vowel-initial-stem|dyadic-third-singular-zero:dyadic:3sg:specific:third:singular-or-common:/ī/0:st1:third-singular-or-common-possessor|dyadic-third-plural-m:dyadic:3pl:specific:third:plural:/ī/m:st1:before-vowel-m-or-p|dyadic-third-plural-n:dyadic:3pl:specific:third:plural:/ī/n:st1:outside-m-environment",
        diagnostic: "lesson13-possessive-paradigm-contract-state-lcm-invalid"
      }, {
        ok: Boolean(frame?.leastCommonMultiple?.selectedCoordinate?.coordinateId)
          && frame.leastCommonMultiple.selectedCoordinate.coordinateId
            === frame?.leastCommonMultiple?.selectedRealizations?.[0]?.coordinateId
          && frame.leastCommonMultiple.selectedCoordinate.typedSlotFrame?.kind
            === "classical-nahuatl-nnc-slot-frame"
          && frame.leastCommonMultiple.selectedCoordinate.typedSlotFrame?.authorizationStatus
            === "authorized"
          && frame.leastCommonMultiple.formulaTemplateInventory.some(entry => (
            entry.identity === frame.leastCommonMultiple.selectedCoordinate.formulaTemplateIdentity
          ))
          && frame.leastCommonMultiple.subjectPronounShapeInventory.some(entry => (
            entry.identity === frame.leastCommonMultiple.selectedCoordinate.subjectPronounShapeIdentity
            && entry.pers1SurfaceVariants.includes(
              frame.leastCommonMultiple.selectedCoordinate.pers1
            )
            && entry.pers2 === frame.leastCommonMultiple.selectedCoordinate.pers2
          ))
          && frame.leastCommonMultiple.possessorStateShapeInventory.some(entry => (
            entry.identity === frame.leastCommonMultiple.selectedCoordinate.possessorStateShapeIdentity
            && (() => {
              const slots = Object.fromEntries(
                frame.leastCommonMultiple.selectedCoordinate.typedStateSlots
                  .map(slot => [slot.role, slot.carrier])
              );
              return entry.st === (slots.st || "")
                && (
                  entry.st1 === (slots.st1 || "")
                  || entry.st1SurfaceVariants?.includes(slots.st1 || "")
                )
                && entry.st2 === (slots.st2 || "");
            })()
          ))
          && Array.isArray(frame.leastCommonMultiple.selectedCoordinate.typedStateSlots)
          && Boolean(frame.leastCommonMultiple.selectedCoordinate.formulaRealization)
          && frame.leastCommonMultiple.selectedCoordinate.formulaStringAuthority === false
          && frame.leastCommonMultiple.selectedCoordinate.displayTextAuthority === false,
        diagnostic: "lesson13-possessive-paradigm-contract-selected-realization-invalid"
      }, {
        ok: frame?.callerSuppliedAuthorityAccepted === false
          && frame?.formulaStringAuthority === false
          && frame?.displayTextAuthority === false,
        diagnostic: "lesson13-possessive-paradigm-contract-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-possessive-nnc-possessive-paradigm-plan",
      version: 1,
      authorityRole: "typed-lesson13-possessive-full-paradigm-coordinate-plan",
      producer: "classical-lesson13-nnc-engine",
      consumers: ["classical-nnc-paradigm-projection", "classical-verification"],
      description: "A fixed-source Lesson 13 full-paradigm plan whose subject and possessor coordinates are projected from the registered GCD/LCM contract.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: frame?.authorizationStatus === "authorized"
          && frame?.sourceDocument === "ANDREWS_TRANSCRIPTION_CANVAS.md"
          && frame?.sourceSection === "13.1-13.6"
          && frame?.sourceContractKind
            === "classical-nahuatl-possessive-nnc-possessive-paradigm-contract-frame"
          && frame?.sourceContractValidationStatus === "valid"
          && frame?.greatestCommonDivisorIdentity
            === "lesson13:possessive-state-nnc",
        diagnostic: "lesson13-possessive-paradigm-plan-source-invalid"
      }, {
        ok: ["animate", "nonanimate", "metaphorical"].includes(frame?.fixedReferent)
          && Boolean(frame?.predicateStem)
          && frame?.lcmInventory?.formulaTemplateCount === 2
          && frame?.lcmInventory?.subjectPronounShapeCount === 12
          && frame?.lcmInventory?.possessorStateShapeCount === 14
          && frame?.applicablePossessorStateShapeCount === 9,
        diagnostic: "lesson13-possessive-paradigm-plan-lcm-invalid"
      }, {
        ok: Array.isArray(frame?.coordinates)
          && frame.coordinates.length
            === (frame.fixedReferent === "nonanimate" ? 9 : 50)
          && frame.coordinateCount === frame.coordinates.length
          && new Set(frame.coordinates.map(coordinate => coordinate.coordinateId)).size
            === frame.coordinates.length
          && frame.coordinates.every(coordinate => (
            coordinate?.kind
              === "classical-nahuatl-possessive-nnc-possessive-paradigm-coordinate-spec"
            && coordinate?.version === 1
            && coordinate?.greatestCommonDivisorIdentity
              === "lesson13:possessive-state-nnc"
            && coordinate?.coordinateId
              === `${coordinate.subjectIdentity}:${coordinate.possessorStateShapeIdentity}`
            && ["monadic", "dyadic"].includes(coordinate?.stateArity)
            && coordinate?.formulaTemplateIdentity
              === (coordinate.stateArity === "monadic"
                ? "possessive-monadic-state"
                : "possessive-dyadic-state")
            && Array.isArray(coordinate?.expectedStateSlots)
            && coordinate.expectedStateSlots.length
              === (coordinate.stateArity === "monadic" ? 1 : 2)
            && coordinate.requestedPossessor === ({
              reciprocal: "reciprocal",
              "nonspecific-human": "te",
              "nonspecific-nonhuman": "tla"
            }[coordinate.possessorIdentity] || coordinate.possessorIdentity)
            && (
              coordinate.possessorIdentity !== "reciprocal"
              || coordinate.subjectPerson === "third"
            )
            && (
              frame.fixedReferent === "nonanimate"
                ? coordinate.subjectIdentity === "third-singular-or-common"
                  && coordinate.subject === "3common"
                : coordinate.subject !== "3common"
            )
            && coordinate.formulaStringAuthority === false
            && coordinate.displayTextAuthority === false
          )),
        diagnostic: "lesson13-possessive-paradigm-plan-coordinates-invalid"
      }, {
        ok: frame?.callerSuppliedCoordinateAuthorityAccepted === false
          && frame?.formulaStringAuthority === false
          && frame?.displayTextAuthority === false,
        diagnostic: "lesson13-possessive-paradigm-plan-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-nounstem-nounstem-paradigm-contract-frame",
      version: 1,
      authorityRole: "typed-class-governed-nounstem-selection-common-identity-and-complete-distinction-inventory",
      producer: "classical-lesson14-nnc-engine",
      consumers: ["classical-nnc-selected-output", "classical-nnc-paradigm-projection", "classical-verification"],
      description: "The common Lesson 14 nounstem-selection operation and its complete class, use-stem, relation, state-number, connector, lexical-alternative, and constituent-analysis inventories.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: frame?.authorizationStatus === "authorized"
          && frame?.realizationPhase === "structural-formula"
          && frame?.sourceDocument === "ANDREWS_TRANSCRIPTION_CANVAS.md"
          && frame?.sourceSection === "14.1-14.8",
        diagnostic: "lesson14-nounstem-paradigm-contract-status-or-source-invalid"
      }, {
        ok: frame?.greatestCommonDivisor?.identityId
            === "lesson14:class-governed-nounstem-selection"
          && frame.greatestCommonDivisor.operationKind
            === "nounstem-selection-inside-nnc-predicate"
          && frame.greatestCommonDivisor.inputKind
            === "lexically-classified-restricted-use-nounstem"
          && frame.greatestCommonDivisor.outputKind
            === "one-selected-nounstem-in-predicate-slot"
          && frame.greatestCommonDivisor.predicateSlot === "STEM"
          && frame.greatestCommonDivisor.formulaSlotDelta === 0
          && frame.greatestCommonDivisor.connectorBelongsTo
            === "subject-personal-pronoun"
          && frame.greatestCommonDivisor.nounstemRelationIsGrammaticalNumber === false
          && frame.greatestCommonDivisor.classMembershipSource
            === "lexical-not-form-prediction"
          && frame.greatestCommonDivisor.prerequisiteOperations?.join("|")
            === "nnc-clause-shell|nnc-absolutive-state-or-possessive-state",
        diagnostic: "lesson14-nounstem-paradigm-contract-gcd-invalid"
      }, {
        ok: frame?.leastCommonMultiple?.distinctionAxes?.join("|")
            === "use-stem-kind|use-stem-shape|nounstem-class|class-subclass|stem-relation|state|subject-number|subject-reference-animacy|class-conditioned-number-dyad|lexical-alternative|constituent-analysis|orthographic-boundary-realization"
          && frame.leastCommonMultiple.useStemKindInventory
            ?.map(entry => `${entry.identity}:${entry.selectedByState}:${entry.allowedShapeIdentities.join("~")}:${entry.environment}`)
            .join("|")
            === "restricted-use:absolutive:base:absolutive-state-nnc|general-use:possessive:base~truncated:possessive-state-nnc-or-compound-embed"
          && frame.leastCommonMultiple.useStemShapeInventory
            ?.map(entry => `${entry.identity}:${entry.action}:${entry.environments.join("~")}`)
            .join("|")
            === "base:identity:restricted-use~general-use|truncated:delete-tagged-final-ephemeral-a-or-i:general-use|glottalized:replace-final-long-vowel-with-short-vowel-plus-glottal-stop:general-use-compound-embed-only",
        diagnostic: "lesson14-nounstem-paradigm-contract-use-stem-lcm-invalid"
      }, {
        ok: frame?.leastCommonMultiple?.nounClassInventory
            ?.map(entry => `${entry.identity}:${entry.stemFinalConstraint}:${entry.absolutiveSingularCommonNum1}:${(entry.num1SurfaceVariants || []).join("~")}:${entry.classMembershipSource}`)
            .join("|")
            === "tl:vowel:tl::lexical|tli:consonant:tli:tli~li:lexical|in:consonant:in::lexical|zero:vowel-or-consonant:0::lexical"
          && frame.leastCommonMultiple.classSubclassInventory
            ?.map(entry => `${entry.identity}:${entry.nounClass}:${entry.generalUseShape}:${entry.possessiveSingularCommonNum1}:${(entry.num1LexicalAlternatives || []).join("~")}:${entry.truncationAction}`)
            .join("|")
            === "tl-1a:tl:base:uh::none|tl-1b:tl:base:0::none|tl-2a:tl:truncated:0::delete-ephemeral-i-after-long-a-or-e|tl-2b:tl:truncated:0::delete-ephemeral-a-or-i-after-single-consonant|tl-2c:tl:truncated:0::delete-ephemeral-a-then-add-supportive-i|tli-1:tli:base:0::none|tli-2:tli:base:hui:⎕:none",
        diagnostic: "lesson14-nounstem-paradigm-contract-class-lcm-invalid"
      }, {
        ok: frame?.leastCommonMultiple?.stemRelationInventory
            ?.map(entry => `${entry.identity}:${entry.derivation}:${entry.grammaticalNumberValue}`)
            .join("|")
            === "plain:identity:none|affinity:long-vowel-reduplicative-prefix:none|distributive-varietal:glottal-stop-reduplicative-prefix:none"
          && frame.leastCommonMultiple.stateSubjectEnvironmentInventory
            ?.map(entry => `${entry.identity}:${entry.state}:${entry.subjectNumber}:${entry.useStemKind}`)
            .join("|")
            === "absolutive-singular-or-common:absolutive:singular-or-common:restricted-use|absolutive-plural:absolutive:plural:restricted-use|possessive-singular-or-common:possessive:singular-or-common:general-use|possessive-plural:possessive:plural:general-use"
          && frame.leastCommonMultiple.numberDyadInventory
            ?.map(entry => `${entry.identity}:${entry.state}:${entry.subjectNumber}:${entry.num1}-${entry.num2}:${(entry.num1SurfaceVariants || []).join("~")}`)
            .join("|")
            === "absolutive-singular-common-tl:absolutive:singular-or-common:tl-0:|absolutive-singular-common-tli-li:absolutive:singular-or-common:tli-0:tli~li|absolutive-singular-common-in:absolutive:singular-or-common:in-0:|absolutive-singular-common-zero:absolutive:singular-or-common:0-0:|absolutive-plural-t-in:absolutive:plural:t-in:|absolutive-plural-m-eh:absolutive:plural:m-eh:|absolutive-plural-zero-h:absolutive:plural:0-h:|possessive-singular-common-uh:possessive:singular-or-common:uh-0:|possessive-singular-common-hui:possessive:singular-or-common:hui-0:|possessive-singular-common-zero:possessive:singular-or-common:0-0:|possessive-singular-common-silent:possessive:singular-or-common:⎕-0:|possessive-plural-hu-an:possessive:plural:hu-ān:",
        diagnostic: "lesson14-nounstem-paradigm-contract-relation-and-number-lcm-invalid"
      }, {
        ok: frame?.leastCommonMultiple?.subjectReferenceAnimacyInventory
            ?.map(entry => `${entry.identity}:${entry.subjectNumbers.join("~")}:${entry.derivedCommonRelationAvailable}`)
            .join("|")
            === "animate-singular-or-plural:singular~plural:false|nonanimate-common:common:true|metaphorical-animate:singular~plural:false"
          && frame.leastCommonMultiple.lexicalAlternativeInventory
            ?.map(entry => `${entry.identity}:${entry.selectionSource}:${entry.cardinality}`)
            .join("|")
            === "alternative-class-membership:typed-lexical-record:one-or-more|supportive-initial-i-variant:typed-lexical-record:retained-or-omitted|plural-stem-formation:typed-lexical-record:one-two-or-three-with-optional-preference|plural-number-dyad:typed-lexical-record:one-two-or-three-with-optional-preference|tli-subclass2-silent-num1:typed-lexical-record:hui-only-or-hui-and-silent"
          && frame.leastCommonMultiple.constituentAmbiguityInventory
            ?.map(entry => `${entry.identity}:${entry.competingBoundary}`)
            .join("|")
            === "front-o:st2-o-or-stem-initial-o|front-m:st2-m-or-stem-initial-m|back-uh:stem-final-uh-or-num1-uh|back-tl:stem-final-tl-or-num1-tl|back-tli:stem-final-tli-or-num1-tli"
          && frame.leastCommonMultiple.orthographicBoundaryInventory
            ?.map(entry => `${entry.identity}:${entry.condition}:${entry.action}`)
            .join("|")
            === "long-o-before-uh-preserved:stem-final-long-o-plus-num1-uh:preserve-long-o-and-stress|third-possessor-i-plus-long-initial-i-preserved:third-singular-possessor-plus-stem-initial-long-i:preserve-two-long-i-vowels|third-possessor-i-shortened-before-i-glottal:third-singular-possessor-plus-stem-initial-i-glottal:shorten-possessor-i|supportive-initial-i-deleted-after-third-possessor-i:third-singular-possessor-plus-typed-supportive-initial-i:select-supportive-i-less-stem-variant",
        diagnostic: "lesson14-nounstem-paradigm-contract-alternative-lcm-invalid"
      }, {
        ok: (() => {
          const lcm = frame?.leastCommonMultiple;
          const selected = lcm?.selectedCoordinate;
          const selectedEnvironment = lcm?.stateSubjectEnvironmentInventory?.find(entry => (
            entry.identity === selected?.stateSubjectEnvironmentIdentity
          ));
          const selectedUseKind = lcm?.useStemKindInventory?.find(entry => (
            entry.identity === selected?.selectedUseStemKind
          ));
          const selectedSubclass = lcm?.classSubclassInventory?.find(entry => (
            entry.identity === selected?.classSubclassIdentity
          ));
          const subclassRequired = selected?.state === "possessive"
            && selectedEnvironment?.subjectNumber === "singular-or-common"
            && ["tl", "tli"].includes(selected?.nounClass);
          const selectedDyad = lcm?.numberDyadInventory?.find(entry => (
            entry.identity === selected?.numberDyadIdentity
          ));
          return Boolean(
            selected?.coordinateId
            && selected.coordinateId === lcm?.selectedRealizations?.[0]?.coordinateId
            && selectedEnvironment
            && selectedUseKind?.selectedByState === selected.state
            && selectedUseKind.allowedShapeIdentities.includes(selected.selectedUseStemShape)
            && lcm.useStemShapeInventory.some(entry => (
              entry.identity === selected.generalUseStemShape
            ))
            && (
              selected.state === "absolutive"
                ? selected.selectedUseStemShape === "base"
                : selected.selectedUseStemShape === selected.generalUseStemShape
            )
            && lcm.nounClassInventory.some(entry => entry.identity === selected.nounClass)
            && (
              subclassRequired
                ? selectedSubclass?.nounClass === selected.nounClass
                  && selectedSubclass.generalUseShape === selected.selectedUseStemShape
                : selected.classSubclassIdentity === "not-applicable"
            )
            && lcm.stemRelationInventory.some(entry => (
              entry.identity === selected.stemRelation
              && entry.grammaticalNumberValue === "none"
            ))
            && selectedDyad?.state === selected.state
            && selectedDyad.subjectNumber === selectedEnvironment.subjectNumber
            && selectedDyad.num2 === selected.num2
            && (
              selectedDyad.num1 === selected.num1
              || selectedDyad.num1SurfaceVariants?.includes(selected.num1)
            )
            && selected.connectorBelongsTo === "subject-personal-pronoun"
            && selected.grammaticalNumberInPredicateStem === false
            && selected.lexicalSelectionRecord?.kind
              === "classical-nahuatl-nounstem-lexical-selection-record"
            && selected.lexicalSelectionRecord?.authorizationStatus === "authorized"
            && selected.lexicalSelectionRecord?.restrictedUseStem
              === selected.restrictedUseStem
            && selected.lexicalSelectionRecord?.nounClass === selected.nounClass
            && selected.lexicalSelectionRecord?.classMembershipOptions
              ?.includes(selected.nounClass)
            && selected.lexicalSelectionRecord?.pluralStemFormationOptions
              ?.includes(selected.stemRelation)
            && ["allowed", "required"].includes(
              selected.lexicalSelectionRecord?.pluralStemFormationRequirement
            )
            && (
              !selected.lexicalSelectionRecord?.preferredPluralStemFormation
              || selected.lexicalSelectionRecord.pluralStemFormationOptions.includes(
                selected.lexicalSelectionRecord.preferredPluralStemFormation
              )
            )
            && (
              !selected.lexicalSelectionRecord?.preferredPluralConnector
              || selected.lexicalSelectionRecord.pluralConnectorOptions.includes(
                selected.lexicalSelectionRecord.preferredPluralConnector
              )
            )
            && (
              selected.lexicalSelectionRecord?.selectedInitialVariant === "retained"
                ? selected.lexicalSelectionRecord.selectedRestrictedUseStem
                  === selected.restrictedUseStem
                : selected.lexicalSelectionRecord?.selectedInitialVariant === "omitted"
                  && selected.lexicalSelectionRecord.supportiveInitialI === true
                  && selected.lexicalSelectionRecord.selectedRestrictedUseStem
                    === selected.lexicalSelectionRecord.supportiveInitialVariant
            )
            && selected.orthographicBoundaryFrame?.kind
              === "classical-nahuatl-nounstem-orthographic-boundary-frame"
            && selected.orthographicBoundaryFrame?.authorizationStatus === "authorized"
            && selected.orthographicBoundaryFrame?.vowelLengthAuthority
              === "explicit-typed-source-spelling"
            && selected.orthographicBoundaryFrame?.traditionalUnderwritingIsAuthority
              === false
            && selected.typedSlotFrame?.kind === "classical-nahuatl-nnc-slot-frame"
            && selected.typedSlotFrame?.authorizationStatus === "authorized"
            && selected.typedSlotFrame?.slots?.predicate?.stem
              === selected.selectedPredicateStem
            && Boolean(selected.formulaRealization)
            && selected.formulaStringAuthority === false
            && selected.displayTextAuthority === false
          );
        })(),
        diagnostic: "lesson14-nounstem-paradigm-contract-selected-coordinate-invalid"
      }, {
        ok: frame?.callerSuppliedAuthorityAccepted === false
          && frame?.formulaStringAuthority === false
          && frame?.displayTextAuthority === false,
        diagnostic: "lesson14-nounstem-paradigm-contract-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-ordinary-nnc-1516-analogical-restricted-use-contract-frame",
      version: 1,
      authorityRole: "typed-analogical-tla-predicate-rank-transition-and-complete-use-stem-lifecycle",
      producer: "classical-ordinary-nnc-engine",
      consumers: ["classical-nnc-selected-output", "classical-grammar-surface", "classical-verification"],
      description: "The Lesson 15.1.6 common tla-possessive-predicate reranking operation and its complete derived-stem lifecycle.",
      requiredCapabilities: [],
      validator: frame => {
        const lcm = frame?.leastCommonMultiple;
        const selected = lcm?.selectedCoordinate;
        return buildGrammarContractValidationResult([{
          ok: frame?.authorizationStatus === "authorized"
            && frame?.realizationPhase
              === "lexical-rank-transition-before-state-specific-nnc-realization"
            && frame?.sourceDocument === "ANDREWS_TRANSCRIPTION_CANVAS.md"
            && frame?.sourceSection === "15.1.6",
          diagnostic: "lesson15-1516-contract-status-or-source-invalid"
        }, {
          ok: frame?.greatestCommonDivisor?.identityId
              === "lesson15.1.6:tla-possessive-predicate-to-restricted-use-stem"
            && frame.greatestCommonDivisor.operationKind
              === "rerank-complete-tla-possessive-predicate-as-restricted-use-nounstem"
            && frame.greatestCommonDivisor.inputKind
              === "lexically-authorized-possessive-state-predicate"
            && frame.greatestCommonDivisor.sourceState === "possessive"
            && frame.greatestCommonDivisor.sourcePossessorPronoun === "tla"
            && frame.greatestCommonDivisor.sourcePredicateStemKind
              === "source-general-use-stem"
            && frame.greatestCommonDivisor.outputKind
              === "derived-restricted-use-nounstem-with-general-use-stem"
            && frame.greatestCommonDivisor.innerTlaBecomesLexicalStemMaterial
              === true
            && frame.greatestCommonDivisor.surfaceIdentityDoesNotCollapseRank
              === true
            && frame.greatestCommonDivisor.lexicalParticipationRequired === true
            && frame.greatestCommonDivisor.prerequisiteOperations?.join("|")
              === "nnc-nounstem-selection|nnc-general-use-stem-realization|nnc-possessive-state-predicate",
          diagnostic: "lesson15-1516-contract-gcd-invalid"
        }, {
          ok: lcm?.distinctionAxes?.join("|")
              === "source-possessive-predicate|rank-transition|derived-use-stem-lifecycle|target-state-reentry|source-stem-disposition"
            && lcm.sourcePredicateInventory
              ?.map(entry => `${entry.identity}:${entry.state}:${entry.possessorPronoun}:${entry.predicateStemKind}`)
              .join("|")
              === "tla-possessive-predicate:possessive:tla:source-general-use-stem"
            && lcm.rankTransitionInventory
              ?.map(entry => `${entry.identity}:${entry.inputRank}:${entry.outputRank}:${entry.surfaceIdentityDoesNotCollapseRank}`)
              .join("|")
              === "possessive-predicate-to-restricted-use-stem:possessive-state-predicate:restricted-use-stem:true"
            && lcm.derivedUseStemInventory
              ?.map(entry => `${entry.identity}:${entry.stemKind}:${entry.formation}`)
              .join("|")
              === "derived-restricted-use:restricted-use:tla-plus-source-restricted-use-stem|derived-general-use:general-use:tla-plus-source-general-use-stem",
          diagnostic: "lesson15-1516-contract-derivation-lcm-invalid"
        }, {
          ok: lcm?.targetStateInventory
              ?.map(entry => `${entry.identity}:${entry.state}:${entry.selectedUseStemKind}`)
              .join("|")
              === "absolutive-target:absolutive:restricted-use|possessive-target:possessive:general-use"
            && lcm.sourceDispositionInventory
              ?.map(entry => `${entry.identity}:${entry.sourceAbsolutiveRemainsAvailable}`)
              .join("|")
              === "coexisting-analogical-derivative:true|derived-stem-replaces-source-in-absolutive:false",
          diagnostic: "lesson15-1516-contract-state-and-source-lcm-invalid"
        }, {
          ok: Boolean(
            selected?.coordinateId
            && selected.coordinateId === lcm?.selectedRealizations?.[0]?.coordinateId
            && selected.sourceRestrictedUseStem
            && selected.sourceGeneralUseStem
            && selected.sourcePossessivePredicateStem
              === `tla-${selected.sourceGeneralUseStem}`
            && selected.sourcePossessorPronoun === "tla"
            && selected.derivedRestrictedUseStem
              === `tla-${selected.sourceRestrictedUseStem}`
            && selected.derivedGeneralUseStem
              === selected.sourcePossessivePredicateStem
            && ["absolutive", "possessive"].includes(selected.selectedState)
            && selected.selectedUseStemKind === (
              selected.selectedState === "absolutive"
                ? "restricted-use"
                : "general-use"
            )
            && selected.selectedUseStemBeforeOuterBoundary === (
              selected.selectedState === "absolutive"
                ? selected.derivedRestrictedUseStem
                : selected.derivedGeneralUseStem
            )
            && selected.selectedPredicateStemAfterOuterBoundary
            && selected.sourceStemDisposition === "lexically-undetermined"
            && selected.sourceStemDispositionAuthority === "lexical-not-generated"
            && selected.formulaRealization
            && selected.formulaStringAuthority === false
            && selected.displayTextAuthority === false
          ),
          diagnostic: "lesson15-1516-contract-selected-coordinate-invalid"
        }, {
          ok: frame?.lexicalExamplesAreRuleWhitelist === false
            && frame?.sourceDispositionIsGenerated === false
            && frame?.callerSuppliedAuthorityAccepted === false
            && frame?.formulaStringAuthority === false
            && frame?.displayTextAuthority === false,
          diagnostic: "lesson15-1516-contract-authority-boundary-invalid"
        }]);
      }
    }), Object.freeze({
      contractKind: "classical-nahuatl-ordinary-nnc-1517-reclassification-contract-frame",
      version: 1,
      authorityRole: "typed-tl-subclass-reclassification-and-complete-semantic-construction-lifecycle",
      producer: "classical-ordinary-nnc-engine",
      consumers: ["classical-nnc-selected-output", "classical-grammar-surface", "classical-verification"],
      description: "The Lesson 15.1.7 common tl 2-A to 1-A reclassification and its complete semantic, construction, and State inventory.",
      requiredCapabilities: [],
      validator: frame => {
        const lcm = frame?.leastCommonMultiple;
        const selected = lcm?.selectedCoordinate;
        return buildGrammarContractValidationResult([{
          ok: frame?.authorizationStatus === "authorized"
            && frame?.realizationPhase
              === "lexical-subclass-reclassification-before-state-specific-connector-realization"
            && frame?.sourceDocument === "ANDREWS_TRANSCRIPTION_CANVAS.md"
            && frame?.sourceSection === "15.1.7",
          diagnostic: "lesson15-1517-contract-status-or-source-invalid"
        }, {
          ok: frame?.greatestCommonDivisor?.identityId
              === "lesson15.1.7:tl-2a-to-tl-1a-reclassification"
            && frame.greatestCommonDivisor.operationKind
              === "delete-lexically-ephemeral-final-i-and-reclassify-subclass"
            && frame.greatestCommonDivisor.inputKind
              === "typed-tl-2a-nounstem-with-truncated-i-general-use-shape"
            && frame.greatestCommonDivisor.outputKind === "typed-tl-1a-nounstem"
            && frame.greatestCommonDivisor.nounClassPreserved === "tl"
            && frame.greatestCommonDivisor.sourceSubclass === "tl-2a"
            && frame.greatestCommonDivisor.targetSubclass === "tl-1a"
            && frame.greatestCommonDivisor.deletedSegment === "i"
            && frame.greatestCommonDivisor.lexicalParticipationRequired === true
            && frame.greatestCommonDivisor.connectorRecomputationRequired === true
            && frame.greatestCommonDivisor.prerequisiteOperations?.join("|")
              === "nnc-nounstem-selection|nnc-tl-2a-classification|nnc-ephemeral-i-analysis",
          diagnostic: "lesson15-1517-contract-gcd-invalid"
        }, {
          ok: lcm?.distinctionAxes?.join("|")
              === "source-analysis|ephemeral-i-loss|target-class|semantic-outcome|construction-environment|target-state-reentry"
            && lcm.sourceAnalysisInventory
              ?.map(entry => `${entry.identity}:${entry.nounClass}:${entry.subclass}:${entry.generalUseShape}:${entry.finalSegment}:${entry.finalSegmentStatus}`)
              .join("|")
              === "tl-2a-truncated-i-source:tl:tl-2a:truncated-i:i:lexically-ephemeral"
            && lcm.ephemeralILossInventory
              ?.map(entry => `${entry.identity}:${entry.inputEnding}:${entry.operation}:${entry.outputEnding}`)
              .join("|")
              === "delete-final-ephemeral-i:i:delete-final-segment:vowel-before-ephemeral-i"
            && lcm.targetClassInventory
              ?.map(entry => `${entry.identity}:${entry.nounClass}:${entry.subclass}:${entry.connectorSelection}`)
              .join("|")
              === "tl-1a-target:tl:tl-1a:recompute-from-target-class-and-state",
          diagnostic: "lesson15-1517-contract-class-lcm-invalid"
        }, {
          ok: lcm?.semanticOutcomeInventory
              ?.map(entry => `${entry.identity}:${entry.meaningRelation}`)
              .join("|")
              === "meaning-shift:new-lexical-meaning|stylistic-no-meaning-shift:same-lexical-meaning"
            && lcm.constructionEnvironmentInventory
              ?.map(entry => `${entry.identity}:${entry.position}`)
              .join("|")
              === "standalone-nounstem:predicate-nounstem|compound-constituent:inside-compound-nounstem"
            && lcm.targetStateInventory
              ?.map(entry => `${entry.identity}:${entry.state}:${entry.connectorRule}`)
              .join("|")
              === "absolutive-target:absolutive:tl-1a-absolutive|possessive-target:possessive:tl-1a-possessive",
          diagnostic: "lesson15-1517-contract-outcome-and-environment-lcm-invalid"
        }, {
          ok: Boolean(
            selected?.coordinateId
            && selected.coordinateId === lcm?.selectedRealizations?.[0]?.coordinateId
            && /i$/u.test(selected.sourceStem)
            && selected.sourceNounClass === "tl"
            && selected.sourceSubclass === "tl-2a"
            && selected.sourceGeneralUseShape === "truncated-i"
            && selected.deletedSegment === "i"
            && selected.deletedSegmentStatus === "lexically-ephemeral"
            && selected.targetStem === selected.sourceStem.slice(0, -1)
            && selected.targetNounClass === "tl"
            && selected.targetSubclass === "tl-1a"
            && selected.semanticOutcome === "lexically-undetermined"
            && selected.semanticOutcomeAuthority === "lexical-not-generated"
            && selected.constructionEnvironment
              === "not-selected-by-reclassification"
            && selected.constructionEnvironmentAuthority
              === "downstream-structure-not-generated"
            && ["absolutive", "possessive"].includes(selected.selectedState)
            && selected.selectedNumberDyad?.num1
            && selected.selectedNumberDyad?.num2
            && selected.formulaRealization
            && selected.formulaStringAuthority === false
            && selected.displayTextAuthority === false
          ),
          diagnostic: "lesson15-1517-contract-selected-coordinate-invalid"
        }, {
          ok: frame?.lexicalExamplesAreRuleWhitelist === false
            && frame?.semanticOutcomeIsGenerated === false
            && frame?.constructionEnvironmentIsGenerated === false
            && frame?.callerSuppliedAuthorityAccepted === false
            && frame?.formulaStringAuthority === false
            && frame?.displayTextAuthority === false,
          diagnostic: "lesson15-1517-contract-authority-boundary-invalid"
        }]);
      }
    }), Object.freeze({
      contractKind: "classical-nahuatl-ordinary-nnc-ordinary-nnc-contract-frame",
      version: 1,
      authorityRole: "typed-ordinary-nnc-conditions-common-identity-and-complete-distinction-inventory",
      producer: "classical-ordinary-nnc-engine",
      consumers: ["classical-nnc-selected-output", "classical-nnc-paradigm-projection", "classical-sentence-composition", "classical-verification"],
      description: "The common Lesson 15 ordinary-NNC conditioning operation and its complete possessive transformation, lexical State policy, possessor-role, and sentence-composition inventories.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: frame?.authorizationStatus === "authorized"
          && frame?.realizationPhase === "structural-formula-and-sentence-handoff"
          && frame?.sourceDocument === "ANDREWS_TRANSCRIPTION_CANVAS.md"
          && frame?.sourceSection === "15.1-15.3",
        diagnostic: "lesson15-ordinary-nnc-contract-status-or-source-invalid"
      }, {
        ok: frame?.greatestCommonDivisor?.identityId
            === "lesson15:ordinary-nnc-conditions"
          && frame.greatestCommonDivisor.operationKind
            === "apply-ordinary-nnc-conditions-to-complete-class-governed-nnc"
          && frame.greatestCommonDivisor.inputKind
            === "complete-lesson14-class-governed-nnc"
          && frame.greatestCommonDivisor.outputKind
            === "one-conditioned-ordinary-nnc-with-optional-sentence-handoff"
          && frame.greatestCommonDivisor.formulaSchemaChanged === false
          && frame.greatestCommonDivisor.predicateStemRemainsSingleSlot === true
          && frame.greatestCommonDivisor.numberBelongsTo
            === "subject-personal-pronoun"
          && frame.greatestCommonDivisor.possessorBelongsTo === "state"
          && frame.greatestCommonDivisor.basicPossessorLocation
            === "inside-nnc-nucleus"
          && frame.greatestCommonDivisor.supplementaryPossessorLocation
            === "outside-nnc-nucleus"
          && frame.greatestCommonDivisor.tensePosition === "absent"
          && frame.greatestCommonDivisor.prerequisiteOperations?.join("|")
            === "nnc-clause-shell|nnc-absolutive-state-or-possessive-state|nnc-nounstem-selection",
        diagnostic: "lesson15-ordinary-nnc-contract-gcd-invalid"
      }, {
        ok: frame?.leastCommonMultiple?.distinctionAxes?.join("|")
            === "stem-operation|possessive-plural-boundary|yo-matrix-allomorph|derived-nonanimate-relation|possessor-reduplication|secondary-possessor-carrier|analogical-source-predicate|analogical-rank-transition|analogical-use-stem-lifecycle|analogical-state-reentry|analogical-source-disposition|reclassification-source-analysis|reclassification-ephemeral-i-loss|reclassification-target-class|reclassification-semantic-outcome|reclassification-construction-environment|reclassification-state-reentry|possessor-role|natural-possession-policy|natural-possession-semantics|state-availability-and-metaphorical-override|sentence-composition-scope|sentence-predicate-kind|sentence-force|sentence-polarity|sentence-modifier|contextual-interpretation"
          && frame.leastCommonMultiple.stemOperationInventory
            ?.map(entry => `${entry.identity}:${entry.operation}:${entry.lexicalSelectionRequired}`)
            .join("|")
            === "regular:identity:false|suppletive:replace-with-lexically-selected-possessive-stem:true|yo-matrix:embed-in-l-or-y-plus-o-or-long-o-matrix:true|secondary-general-use:downgrade-inner-possessive-predicate-to-general-use-stem:true|analogical-restricted-use:downgrade-tla-possessive-predicate-to-restricted-use-stem:true|tl-2a-to-1a:delete-ephemeral-i-and-reclassify-tl-subclass:true",
        diagnostic: "lesson15-ordinary-nnc-contract-operation-lcm-invalid"
      }, {
        ok: frame?.leastCommonMultiple?.possessivePluralBoundaryInventory
            ?.map(entry => `${entry.identity}:${entry.sourceEnding}:${entry.action}:${(entry.spellingAlternatives || []).join("~")}`)
            .join("|")
            === "no-special-boundary-action:other:identity:|final-voiceless-w-before-hu-an:uh:total-assimilation-and-delete-final-voiceless-w:|final-n-before-hu-an:n:nasalize-preceding-vowel-and-delete-final-n:assimilated-without-n~retained-n"
          && frame.leastCommonMultiple.yoMatrixAllomorphInventory
            ?.map(entry => `${entry.identity}:${entry.boundary}:${entry.state}:${entry.subjectNumber}`)
            .join("|")
            === "l-ō:stem-final-l:absolutive:all|l-o:stem-final-l:possessive:singular-or-common|l-ō:stem-final-l:possessive:plural|y-ō:other-stem-final:absolutive:all|y-o:other-stem-final:possessive:singular-or-common|y-ō:other-stem-final:possessive:plural"
          && frame.leastCommonMultiple.derivedNonanimateInventory
            ?.map(entry => `${entry.identity}:${entry.subjectNumber}:${entry.interpretation}`)
            .join("|")
            === "plain:common-or-plural:ordinary-reference|affinity:common:English-plural-translation-with-common-grammar-number|distributive-varietal:common:English-plural-translation-with-common-grammar-number",
        diagnostic: "lesson15-ordinary-nnc-contract-boundary-and-relation-lcm-invalid"
      }, {
        ok: frame?.leastCommonMultiple?.possessorReduplicationInventory
            ?.map(entry => `${entry.identity}:${entry.stateArity}:${entry.grammaticalNumberValue}:${entry.environment || ""}`)
            .join("|")
            === "single-dyadic:dyadic:none:|reduplicated-dyadic:reduplicated-dyadic:none:possessive-plural-subject"
          && frame.leastCommonMultiple.secondaryPossessorCarrierInventory
            ?.map(entry => `${entry.identity}:${entry.realization}`)
            .join("|")
            === "tē:unblurred|ti:partially-blurred|t:maximally-blurred"
          && frame.leastCommonMultiple.analogicalSourcePredicateInventory
            ?.map(entry => `${entry.identity}:${entry.state}:${entry.possessorPronoun}:${entry.predicateStemKind}`)
            .join("|")
            === "tla-possessive-predicate:possessive:tla:source-general-use-stem"
          && frame.leastCommonMultiple.analogicalRankTransitionInventory
            ?.map(entry => `${entry.identity}:${entry.inputRank}:${entry.outputRank}`)
            .join("|")
            === "possessive-predicate-to-restricted-use-stem:possessive-state-predicate:restricted-use-stem"
          && frame.leastCommonMultiple.analogicalDerivedUseStemInventory
            ?.map(entry => `${entry.identity}:${entry.stemKind}`)
            .join("|")
            === "derived-restricted-use:restricted-use|derived-general-use:general-use"
          && frame.leastCommonMultiple.analogicalTargetStateInventory
            ?.map(entry => `${entry.identity}:${entry.state}:${entry.selectedUseStemKind}`)
            .join("|")
            === "absolutive-target:absolutive:restricted-use|possessive-target:possessive:general-use"
          && frame.leastCommonMultiple.analogicalSourceDispositionInventory
            ?.map(entry => `${entry.identity}:${entry.sourceAbsolutiveRemainsAvailable}`)
            .join("|")
            === "coexisting-analogical-derivative:true|derived-stem-replaces-source-in-absolutive:false"
          && frame.leastCommonMultiple.reclassificationSourceAnalysisInventory
            ?.map(entry => `${entry.identity}:${entry.nounClass}:${entry.subclass}:${entry.generalUseShape}`)
            .join("|")
            === "tl-2a-truncated-i-source:tl:tl-2a:truncated-i"
          && frame.leastCommonMultiple.reclassificationEphemeralILossInventory
            ?.map(entry => `${entry.identity}:${entry.inputEnding}:${entry.operation}`)
            .join("|")
            === "delete-final-ephemeral-i:i:delete-final-segment"
          && frame.leastCommonMultiple.reclassificationTargetClassInventory
            ?.map(entry => `${entry.identity}:${entry.nounClass}:${entry.subclass}`)
            .join("|")
            === "tl-1a-target:tl:tl-1a"
          && frame.leastCommonMultiple.reclassificationSemanticOutcomeInventory
            ?.map(entry => `${entry.identity}:${entry.meaningRelation}`)
            .join("|")
            === "meaning-shift:new-lexical-meaning|stylistic-no-meaning-shift:same-lexical-meaning"
          && frame.leastCommonMultiple.reclassificationConstructionEnvironmentInventory
            ?.map(entry => `${entry.identity}:${entry.position}`)
            .join("|")
            === "standalone-nounstem:predicate-nounstem|compound-constituent:inside-compound-nounstem"
          && frame.leastCommonMultiple.reclassificationTargetStateInventory
            ?.map(entry => `${entry.identity}:${entry.state}:${entry.connectorRule}`)
            .join("|")
            === "absolutive-target:absolutive:tl-1a-absolutive|possessive-target:possessive:tl-1a-possessive"
          && frame.leastCommonMultiple.possessorRoleInventory
            ?.map(entry => `${entry.identity}:${entry.location}`)
            .join("|")
            === "nuclear-basic-possessor:inside-nnc-state|supplementary-possessor:outside-nnc-nucleus",
        diagnostic: "lesson15-ordinary-nnc-contract-possessor-and-rank-lcm-invalid"
      }, {
        ok: frame?.leastCommonMultiple?.naturalPossessionPolicyInventory
            ?.map(entry => `${entry.identity}:${entry.stateAvailability}:${entry.metaphoricalOverrideAvailable}`)
            .join("|")
            === "ordinary:both:false|naturally-possessed:possessive-only:false|never-possessive:absolutive-only:true"
          && frame.leastCommonMultiple.naturalPossessionSemanticInventory?.join("|")
            === "property|kinship-or-human-relation|body-part|never-possessive|ordinary",
        diagnostic: "lesson15-ordinary-nnc-contract-natural-possession-lcm-invalid"
      }, {
        ok: frame?.leastCommonMultiple?.sentenceCompositionScopeInventory?.join("|")
            === "nuclear-clause-only|sentence-composition-requested"
          && frame.leastCommonMultiple.predicateKindInventory?.join("|")
            === "equative|attributive|adverbial"
          && frame.leastCommonMultiple.sentenceForceInventory?.join("|")
            === "assertion|yes-no-intonation|yes-no-cuix|emphatic|wish"
          && frame.leastCommonMultiple.polarityInventory?.join("|")
            === "positive|negative"
          && frame.leastCommonMultiple.sentenceModifierInventory?.join("|")
            === "none|zan|oc|ahzo|aya"
          && frame.leastCommonMultiple.interpretationInventory
            ?.map(entry => `${entry.identity}:${entry.predicateKind}:${entry.grammaticalHavingConstruction ?? ""}:${entry.definitenessEncoded ?? ""}`)
            .join("|")
            === "identify-or-classify:equative::|characterize:attributive::|locate-time-duration-place-or-manner:adverbial::|possessive-state-contextual-having:equative:false:|definiteness-indefiniteness-ambiguous:all::false",
        diagnostic: "lesson15-ordinary-nnc-contract-sentence-lcm-invalid"
      }, {
        ok: (() => {
          const lcm = frame?.leastCommonMultiple;
          const selected = lcm?.selectedCoordinate;
          const stemOperation = lcm?.stemOperationInventory?.find(entry => (
            entry.identity === selected?.stemOperation
          ));
          const policy = lcm?.naturalPossessionPolicyInventory?.find(entry => (
            entry.identity === selected?.naturalPossessionPolicy
          ));
          const sentenceRequested =
            selected?.sentenceCompositionScope === "sentence-composition-requested";
          const analogicalSelected =
            selected?.stemOperation === "analogical-restricted-use";
          const analogicalContract =
            lcm?.analogicalRestrictedUseContractFrame || null;
          const reclassificationSelected =
            selected?.stemOperation === "tl-2a-to-1a";
          const reclassificationContract =
            lcm?.reclassificationContractFrame || null;
          return Boolean(
            selected?.coordinateId
            && selected.coordinateId === lcm?.selectedRealizations?.[0]?.coordinateId
            && selected.sourceLesson14CoordinateId
            && stemOperation
            && selected.stemOperationRecord?.kind
              === "classical-nahuatl-ordinary-nnc-stem-operation-record"
            && selected.stemOperationRecord?.authorizationStatus === "authorized"
            && selected.stemOperationRecord?.operation === selected.stemOperation
            && selected.stemOperationRecord?.sourceStem === selected.sourceStem
            && selected.stemOperationRecord?.targetStemDerivation
            && selected.stemOperationRecord?.canvasPredicateOptionIsGrammarAuthority
              === false
            && (
              analogicalSelected
                ? (
                  analogicalContract?.kind
                    === "classical-nahuatl-ordinary-nnc-1516-analogical-restricted-use-contract-frame"
                  && analogicalContract.authorizationStatus === "authorized"
                  && selected.analogicalRestrictedUseCoordinateId
                    === analogicalContract.leastCommonMultiple
                      ?.selectedCoordinate?.coordinateId
                  && selected.analogicalRestrictedUseGcdIdentity
                    === "lesson15.1.6:tla-possessive-predicate-to-restricted-use-stem"
                )
                : (
                  analogicalContract === null
                  && selected.analogicalRestrictedUseCoordinateId === ""
                  && selected.analogicalRestrictedUseGcdIdentity === ""
                )
            )
            && (
              reclassificationSelected
                ? (
                  reclassificationContract?.kind
                    === "classical-nahuatl-ordinary-nnc-1517-reclassification-contract-frame"
                  && reclassificationContract.authorizationStatus === "authorized"
                  && selected.reclassificationCoordinateId
                    === reclassificationContract.leastCommonMultiple
                      ?.selectedCoordinate?.coordinateId
                  && selected.reclassificationGcdIdentity
                    === "lesson15.1.7:tl-2a-to-tl-1a-reclassification"
                )
                : (
                  reclassificationContract === null
                  && selected.reclassificationCoordinateId === ""
                  && selected.reclassificationGcdIdentity === ""
                )
            )
            && lcm.possessivePluralBoundaryInventory.some(entry => (
              entry.identity === selected.possessivePluralBoundaryIdentity
            ))
            && lcm.possessorReduplicationInventory.some(entry => (
              entry.identity === selected.possessorReduplicationIdentity
            ))
            && policy?.stateAvailability === selected.stateAvailability
            && (
              selected.naturalPossessionPolicy === "naturally-possessed"
                ? [
                  "natural-association-unspecified",
                  "property",
                  "kinship-or-human-relation",
                  "body-part"
                ].includes(selected.naturalPossessionSemantics)
                : selected.naturalPossessionSemantics
                  === (
                    selected.naturalPossessionPolicy === "never-possessive"
                      ? "never-possessive"
                      : "ordinary"
                  )
            )
            && (
              selected.state === "possessive"
                ? selected.possessorRole === "nuclear-basic-possessor"
                : selected.possessorRole === "not-applicable"
            )
            && lcm.sentenceCompositionScopeInventory.includes(
              selected.sentenceCompositionScope
            )
            && lcm.predicateKindInventory.includes(selected.predicateKind)
            && (
              sentenceRequested
                ? lcm.sentenceForceInventory.includes(selected.sentenceForce)
                : selected.sentenceForce === "none"
            )
            && lcm.polarityInventory.includes(selected.polarity)
            && lcm.sentenceModifierInventory.includes(selected.sentenceModifier)
            && selected.typedSlotFrame?.kind
              === "classical-nahuatl-nnc-slot-frame"
            && selected.typedSlotFrame?.authorizationStatus === "authorized"
            && selected.typedSlotFrame?.slots?.predicate?.stem
              === selected.selectedPredicateStem
            && Boolean(selected.formulaRealization)
            && selected.formulaStringAuthority === false
            && selected.displayTextAuthority === false
          );
        })(),
        diagnostic: "lesson15-ordinary-nnc-contract-selected-coordinate-invalid"
      }, {
        ok: frame?.callerSuppliedAuthorityAccepted === false
          && frame?.formulaStringAuthority === false
          && frame?.displayTextAuthority === false,
        diagnostic: "lesson15-ordinary-nnc-contract-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-nominal-nuclear-clause-grammar-surface-contract-frame",
      version: 1,
      authorityRole: "typed-cross-lesson-nnc-grammar-common-architecture-and-complete-distinction-inventory",
      producer: "classical-ordinary-nnc-engine",
      consumers: ["classical-grammar-surface", "classical-nnc-selected-output", "classical-verification"],
      description: "The common Lessons 12-15 NNC architecture and the complete lesson-qualified distinction inventory projected into one semantic Grammar surface.",
      requiredCapabilities: [],
      validator: frame => {
        const expectedLessonAxes = [{
          lesson: "12",
          sourceSection: "12.1-12.7",
          contractKind: "classical-nahuatl-absolutive-nnc-absolutive-paradigm-contract-frame",
          greatestCommonDivisorIdentity: "lesson12:absolutive-state-nnc",
          axes: "subject-person|subject-number|subject-person-morphs|absolutive-number-dyad|noun-class-conditioned-connector|animacy-reference|lexical-state-availability|predicate-function|discourse-time-reference"
        }, {
          lesson: "13",
          sourceSection: "13.1-13.6",
          contractKind: "classical-nahuatl-possessive-nnc-possessive-paradigm-contract-frame",
          greatestCommonDivisorIdentity: "lesson13:possessive-state-nnc",
          axes: "formula-state-arity|subject-person|subject-number|subject-person-morphs|subject-person-boundary-conditioning|possessive-number-dyad|subject-connector-conditioning|possessor-reference-type|possessor-person|possessor-number|possessive-case-location|possessor-state-morphs|possessor-boundary-conditioning|nounstem-possessor-compatibility"
        }, {
          lesson: "14",
          sourceSection: "14.1-14.8",
          contractKind: "classical-nahuatl-nounstem-nounstem-paradigm-contract-frame",
          greatestCommonDivisorIdentity: "lesson14:class-governed-nounstem-selection",
          axes: "use-stem-kind|use-stem-shape|nounstem-class|class-subclass|stem-relation|state|subject-number|subject-reference-animacy|class-conditioned-number-dyad|lexical-alternative|constituent-analysis|orthographic-boundary-realization"
        }, {
          lesson: "15",
          sourceSection: "15.1-15.3",
          contractKind: "classical-nahuatl-ordinary-nnc-ordinary-nnc-contract-frame",
          greatestCommonDivisorIdentity: "lesson15:ordinary-nnc-conditions",
          axes: "stem-operation|possessive-plural-boundary|yo-matrix-allomorph|derived-nonanimate-relation|possessor-reduplication|secondary-possessor-carrier|analogical-source-predicate|analogical-rank-transition|analogical-use-stem-lifecycle|analogical-state-reentry|analogical-source-disposition|reclassification-source-analysis|reclassification-ephemeral-i-loss|reclassification-target-class|reclassification-semantic-outcome|reclassification-construction-environment|reclassification-state-reentry|possessor-role|natural-possession-policy|natural-possession-semantics|state-availability-and-metaphorical-override|sentence-composition-scope|sentence-predicate-kind|sentence-force|sentence-polarity|sentence-modifier|contextual-interpretation"
        }];
        const expectedSemanticGroupAxes = {
          subject: [
            "lesson12:subject-person",
            "lesson12:subject-number",
            "lesson12:subject-person-morphs",
            "lesson12:absolutive-number-dyad",
            "lesson12:noun-class-conditioned-connector",
            "lesson12:animacy-reference",
            "lesson13:subject-person",
            "lesson13:subject-number",
            "lesson13:subject-person-morphs",
            "lesson13:subject-person-boundary-conditioning",
            "lesson13:possessive-number-dyad",
            "lesson13:subject-connector-conditioning",
            "lesson14:subject-number",
            "lesson14:subject-reference-animacy",
            "lesson14:class-conditioned-number-dyad"
          ],
          state: [
            "lesson12:lexical-state-availability",
            "lesson13:formula-state-arity",
            "lesson13:possessor-reference-type",
            "lesson13:possessor-person",
            "lesson13:possessor-number",
            "lesson13:possessive-case-location",
            "lesson13:possessor-state-morphs",
            "lesson13:possessor-boundary-conditioning",
            "lesson13:nounstem-possessor-compatibility",
            "lesson14:state",
            "lesson15:possessor-reduplication",
            "lesson15:secondary-possessor-carrier",
            "lesson15:possessor-role",
            "lesson15:natural-possession-policy",
            "lesson15:natural-possession-semantics",
            "lesson15:state-availability-and-metaphorical-override"
          ],
          nounstem: [
            "lesson12:predicate-function",
            "lesson14:use-stem-kind",
            "lesson14:use-stem-shape",
            "lesson14:nounstem-class",
            "lesson14:class-subclass",
            "lesson14:stem-relation",
            "lesson14:lexical-alternative",
            "lesson14:constituent-analysis",
            "lesson14:orthographic-boundary-realization",
            "lesson15:stem-operation",
            "lesson15:possessive-plural-boundary",
            "lesson15:yo-matrix-allomorph",
            "lesson15:derived-nonanimate-relation",
            "lesson15:analogical-source-predicate",
            "lesson15:analogical-rank-transition",
            "lesson15:analogical-use-stem-lifecycle",
            "lesson15:analogical-state-reentry",
            "lesson15:analogical-source-disposition",
            "lesson15:reclassification-source-analysis",
            "lesson15:reclassification-ephemeral-i-loss",
            "lesson15:reclassification-target-class",
            "lesson15:reclassification-semantic-outcome",
            "lesson15:reclassification-construction-environment",
            "lesson15:reclassification-state-reentry"
          ],
          sentence: [
            "lesson12:discourse-time-reference",
            "lesson15:sentence-composition-scope",
            "lesson15:sentence-predicate-kind",
            "lesson15:sentence-force",
            "lesson15:sentence-polarity",
            "lesson15:sentence-modifier",
            "lesson15:contextual-interpretation"
          ]
        };
        const expectedSemanticGroupByAxis = new Map(
          Object.entries(expectedSemanticGroupAxes).flatMap(([groupId, axisIds]) => (
            axisIds.map(axisId => [axisId, groupId])
          ))
        );
        const lcm = frame?.leastCommonMultiple;
        const selected = lcm?.selectedCoordinate;
        const activeRefs = lcm?.activeContractRefs || [];
        const stateRef = activeRefs[0];
        const expectedStateKind = selected?.activeStateBranch === "absolutive"
          ? "classical-nahuatl-absolutive-nnc-absolutive-paradigm-contract-frame"
          : selected?.activeStateBranch === "possessive"
            ? "classical-nahuatl-possessive-nnc-possessive-paradigm-contract-frame"
            : "";
        return buildGrammarContractValidationResult([{
          ok: frame?.authorizationStatus === "authorized"
            && frame?.realizationPhase === "grammar-choice-projection"
            && frame?.sourceDocument === "ANDREWS_TRANSCRIPTION_CANVAS.md"
            && frame?.sourceSections?.join("|")
              === "12.1-12.7|13.1-13.6|14.1-14.8|15.1-15.3",
          diagnostic: "lessons12-15-grammar-surface-status-or-source-invalid"
        }, {
          ok: frame?.greatestCommonDivisor?.identityId
              === "lessons12-15:ordinary-nnc-grammar-architecture"
            && frame.greatestCommonDivisor.clauseKind === "nominal-nuclear-clause"
            && frame.greatestCommonDivisor.formulaTemplate
              === "#pers1-pers2(+STATE)(STEM)num1-num2#"
            && frame.greatestCommonDivisor.subjectPredicateArchitecture === true
            && frame.greatestCommonDivisor.statePosition
              === "before-predicate-nounstem"
            && frame.greatestCommonDivisor.predicateStemCardinality === "exactly-one"
            && frame.greatestCommonDivisor.numberBelongsTo
              === "subject-personal-pronoun"
            && frame.greatestCommonDivisor.possessorBelongsTo === "state"
            && frame.greatestCommonDivisor.tensePosition === "absent"
            && frame.greatestCommonDivisor.semanticGroupOrder?.join("|")
              === "subject|state|nounstem|sentence"
            && frame.greatestCommonDivisor.sourceToResultPath?.join("|")
              === "typed-nounstem-source|typed-grammar-selections|canonical-nnc-engine|authorized-result",
          diagnostic: "lessons12-15-grammar-surface-gcd-invalid"
        }, {
          ok: lcm?.lessonAxisInventory?.length === 4
            && expectedLessonAxes.every((expected, index) => {
              const actual = lcm.lessonAxisInventory[index];
              return actual?.lesson === expected.lesson
                && actual.sourceSection === expected.sourceSection
                && actual.contractKind === expected.contractKind
                && actual.greatestCommonDivisorIdentity
                  === expected.greatestCommonDivisorIdentity
                && actual.distinctionAxes?.join("|") === expected.axes;
            }),
          diagnostic: "lessons12-15-grammar-surface-lesson-axis-inventory-invalid"
        }, {
          ok: lcm?.distinctionAxisCount === 62
            && lcm?.qualifiedAxisInventory?.length === 62
            && new Set(lcm.qualifiedAxisInventory.map(axis => axis.axisId)).size === 62
            && expectedLessonAxes.flatMap(expected => (
              expected.axes.split("|").map(axis => `lesson${expected.lesson}:${axis}`)
            )).join("|") === lcm.qualifiedAxisInventory.map(axis => axis.axisId).join("|")
            && lcm.qualifiedAxisInventory.every(axis => (
              expectedSemanticGroupByAxis.get(axis.axisId) === axis.semanticGroup
            )),
          diagnostic: "lessons12-15-grammar-surface-qualified-lcm-invalid"
        }, {
          ok: lcm?.semanticGroupInventory?.map(group => (
            `${group.groupId}:${group.axisIds.length}`
          )).join("|") === "subject:15|state:16|nounstem:24|sentence:7"
            && lcm.semanticGroupInventory.every(group => (
              group.axisIds.join("|") === expectedSemanticGroupAxes[group.groupId]?.join("|")
            )),
          diagnostic: "lessons12-15-grammar-surface-semantic-groups-invalid"
        }, {
          ok: ["absolutive", "possessive"].includes(selected?.activeStateBranch)
            && stateRef?.contractKind === expectedStateKind
            && stateRef?.selectedCoordinateId === selected.activeStateCoordinateId
            && activeRefs[1]?.contractKind
              === "classical-nahuatl-nounstem-nounstem-paradigm-contract-frame"
            && activeRefs[1]?.greatestCommonDivisorIdentity
              === "lesson14:class-governed-nounstem-selection"
            && activeRefs[1]?.selectedCoordinateId === selected.lesson14CoordinateId
            && activeRefs[2]?.contractKind
              === "classical-nahuatl-ordinary-nnc-ordinary-nnc-contract-frame"
            && activeRefs[2]?.greatestCommonDivisorIdentity
              === "lesson15:ordinary-nnc-conditions"
            && activeRefs[2]?.selectedCoordinateId === selected.lesson15CoordinateId
            && (
              selected.lesson15StemOperation === "analogical-restricted-use"
                ? (
                  selected.lesson1516AnalogicalCoordinateId
                  && selected.lesson1516AnalogicalGcdIdentity
                    === "lesson15.1.6:tla-possessive-predicate-to-restricted-use-stem"
                )
                : (
                  selected.lesson1516AnalogicalCoordinateId === ""
                  && selected.lesson1516AnalogicalGcdIdentity === ""
                )
            )
            && (
              selected.lesson15StemOperation === "tl-2a-to-1a"
                ? (
                  selected.lesson1517ReclassificationCoordinateId
                  && selected.lesson1517ReclassificationGcdIdentity
                    === "lesson15.1.7:tl-2a-to-tl-1a-reclassification"
                )
                : (
                  selected.lesson1517ReclassificationCoordinateId === ""
                  && selected.lesson1517ReclassificationGcdIdentity === ""
                )
            )
            && selected.coordinateId === activeRefs
              .map(contract => contract.selectedCoordinateId)
              .join("::")
            && selected.coordinateId === lcm.selectedRealizations?.[0]?.coordinateId
            && Boolean(selected.selectedPredicateStem)
            && Boolean(selected.formulaRealization)
            && selected.formulaStringAuthority === false
            && selected.displayTextAuthority === false,
          diagnostic: "lessons12-15-grammar-surface-selected-coordinate-invalid"
        }, {
          ok: frame?.curriculumOrderAuthority === false
            && frame?.lessonMetadataAuthority === false
            && frame?.callerSuppliedAuthorityAccepted === false
            && frame?.formulaStringAuthority === false
            && frame?.displayTextAuthority === false,
          diagnostic: "lessons12-15-grammar-surface-authority-boundary-invalid"
        }]);
      }
    }), Object.freeze({
      contractKind: "classical-nahuatl-nonactive-voice-grammar-contract",
      version: 1,
      authorityRole: "canonical-typed-nonactive-and-voice-gcd-lcm",
      producer: "classical-vnc-grammar",
      consumers: [
        "classical-vnc-evaluator",
        "classical-vnc-application",
        "classical-vnc-paradigm",
        "classical-verification"
      ],
      description: "Typed shared invariant and complete licensed distinction model for nonactive, passive, and impersonal VNC generation.",
      requiredCapabilities: [
        "buildClassicalNahuatlGrammarContract",
        "evaluateClassicalNahuatlGrammarSelection"
      ],
      validator: frame => {
        const gcd = frame?.greatestCommonDivisor;
        const lcm = frame?.leastCommonMultiple;
        const operationIds = lcm?.operationContracts?.map(
          contract => contract.operationId
        ) || [];
        const executorIds = new Set(lcm?.canonicalExecutorInventory || []);
        return buildGrammarContractValidationResult([{
          ok: frame?.kind
              === "classical-nahuatl-nonactive-voice-grammar-contract"
            && frame?.version === 1
            && frame?.authorizationStatus === "authorized"
            && gcd?.identityId === "typed-active-vnc-to-derived-voice-vnc"
            && gcd?.inputKind === "authorized-typed-active-vnc"
            && gcd?.outputKind === "authorized-typed-derived-voice-vnc"
            && gcd?.predicateInvariant
              === "exactly-one-typed-verbstem-in-predicate-slot"
            && gcd?.operationOrder?.join("|")
              === "vnc-active-source-analysis|vnc-nonactive-stem-derivation|vnc-voice-participant-transformation|vnc-class-a-finite-realization|vnc-sentence-force-composition"
            && gcd?.sourceAgentDeleted === true
            && gcd?.sourceAgentExpressible === false,
          diagnostic: "nonactive-voice-gcd-invalid"
        }, {
          ok: lcm?.distinctionSpecs?.length === 30
            && new Set(lcm.distinctionSpecs.map(spec => spec.axisId)).size === 30
            && lcm.distinctionSpecs.every(spec => (
              Array.isArray(spec.licensedValues)
              && spec.licensedValues.length > 0
              && Array.isArray(spec.canonicalExecutorIds)
              && spec.canonicalExecutorIds.length > 0
              && spec.canonicalExecutorIds.every(id => executorIds.has(id))
              && Boolean(spec.paradigmConsequence)
            )),
          diagnostic: "nonactive-voice-lcm-distinction-invalid"
        }, {
          ok: operationIds.join("|")
              === "vnc-active-source-analysis|vnc-nonactive-stem-derivation|vnc-voice-participant-transformation|vnc-class-a-finite-realization|vnc-sentence-force-composition"
            && lcm.operationContracts.every(contract => (
              contract?.kind === "grammar-operation-contract"
              && contract.authorizationStatus === "authorized"
              && contract.curriculumOrderAuthority === false
              && contract.storedExampleAuthority === false
            ))
            && lcm.restrictions?.length === 8
            && lcm.interactions?.length === 7
            && lcm.exceptionFamilies?.length === 9,
          diagnostic: "nonactive-voice-lcm-operation-interaction-invalid"
        }, {
          ok: lcm?.nonactiveFormationCoreInventory?.join("|") === "ō|lō|hua"
            && lcm?.nonactiveContinuationInventory?.join("|") === "none|hua|lō"
            && lcm?.sourceClassInventory?.join("|") === "A|B|C|D"
            && lcm?.nonactiveClassInventory?.join("|") === "A-1|A-2"
            && lcm?.voiceOperationInventory?.join("|")
              === "passive|impersonal|inherent-impersonal|tla-impersonal"
            && lcm?.objectCountInventory?.join("|") === "0|1|2|3"
            && lcm?.paradigmPolicy
              === "prepared-projection-must-be-pointwise-scalar-equivalent",
          diagnostic: "nonactive-voice-lcm-inventory-invalid"
        }, {
          ok: frame?.callerSuppliedAuthorityAccepted === false
            && frame?.sourceAuditMetadataPresent === false
            && !Object.hasOwn(frame, "sourceLineStart")
            && !Object.hasOwn(frame, "claimCount")
            && !Object.hasOwn(frame, "dispositionCounts")
            && !Object.hasOwn(frame, "claimSignature")
            && frame?.formulaStringAuthority === false
            && frame?.displayTextAuthority === false,
          diagnostic: "nonactive-voice-grammar-authority-boundary-invalid"
        }]);
      }
    }), Object.freeze({
      contractKind: "classical-nahuatl-pronominal-nnc-pronominal-grammar-contract-frame",
      version: 1,
      authorityRole: "canonical-lesson16-pronominal-gcd-lcm-contract",
      producer: "classical-nnc-engine",
      consumers: ["classical-nnc-paradigm", "classical-nnc-presentation", "classical-verification"],
      description: "The Lesson 16 shared pronominal NNC invariant and complete selected distinction coordinate.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: frame?.authorizationStatus === "authorized"
          && frame?.authority === "typed-pronominal-source-plus-canonical-nnc-slots"
          && frame?.sourceDocument === "ANDREWS_TRANSCRIPTION_CANVAS.md",
        diagnostic: "lesson16-grammar-contract-status-or-source-invalid"
      }, {
        ok: frame?.greatestCommonDivisor?.identityId === "lesson16:pronominal-absolutive-nnc"
          && frame?.greatestCommonDivisor?.formula === "#pers1-pers2(STEM)num1-num2#"
          && frame?.greatestCommonDivisor?.state === "absolutive"
          && frame?.greatestCommonDivisor?.tenseSlot === "none"
          && frame?.greatestCommonDivisor?.formulaStringAuthority === false,
        diagnostic: "lesson16-grammar-contract-gcd-invalid"
      }, {
        ok: frame?.leastCommonMultiple?.axisCount === 19
          && frame?.leastCommonMultiple?.distinctionAxes?.length === 19
          && Boolean(frame?.leastCommonMultiple?.selectedCoordinate?.coordinateId)
          && Boolean(frame?.leastCommonMultiple?.selectedCoordinate?.sourceStem)
          && Boolean(frame?.leastCommonMultiple?.selectedCoordinate?.formulaRealization),
        diagnostic: "lesson16-grammar-contract-lcm-invalid"
      }, {
        ok: frame?.sourceInventoryIsRuntimeAuthority === false
          && frame?.sourceAuditPresentation === "internal-verification-only"
          && frame?.curriculumOrderAuthority === false
          && frame?.formulaStringAuthority === false
          && frame?.displayTextAuthority === false,
        diagnostic: "lesson16-grammar-contract-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-pronominal-nnc-pronominal-paradigm-plan",
      version: 1,
      authorityRole: "canonical-lesson16-pronominal-coordinate-plan",
      producer: "classical-nnc-engine",
      consumers: ["classical-nnc-paradigm", "classical-nnc-presentation", "classical-verification"],
      description: "Engine-projected Lesson 16 scalar-equivalent full-paradigm coordinates.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: frame?.authorizationStatus === "authorized"
          && frame?.authority === "typed-engine-pronominal-coordinate-projection"
          && frame?.sourceDocument === "ANDREWS_TRANSCRIPTION_CANVAS.md"
          && frame?.coordinateCount === frame?.coordinates?.length
          && frame?.coordinateCount > 0
          && frame?.candidateCount === frame?.coordinateCount + frame?.omittedCandidateCount,
        diagnostic: "lesson16-paradigm-plan-status-or-count-invalid"
      }, {
        ok: frame?.greatestCommonDivisor?.identityId === "lesson16:pronominal-absolutive-nnc"
          && frame?.leastCommonMultiple?.axisCount === 19
          && frame?.coordinates?.every(coordinate =>
            coordinate?.kind === "classical-nahuatl-pronominal-nnc-pronominal-paradigm-coordinate"
            && Boolean(coordinate.coordinateId)
            && Boolean(coordinate.formulaRealization)
            && coordinate?.nncFrame?.kind
              === "classical-nahuatl-pronominal-nnc-pronominal-nnc-frame"
            && coordinate.nncFrame.authorizationStatus === "authorized"
            && coordinate.nncFrame.formulaRealization
              === coordinate.formulaRealization
            && coordinate.formulaStringAuthority === false
            && coordinate.displayTextAuthority === false
          ),
        diagnostic: "lesson16-paradigm-plan-coordinate-invalid"
      }, {
        ok: frame?.sourceAuditPresentation === "internal-verification-only"
          && frame?.firstCoordinateAuthority === false
          && frame?.formulaStringAuthority === false
          && frame?.displayTextAuthority === false,
        diagnostic: "lesson16-paradigm-plan-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-ordinary-nnc-noun-class-vocabulary",
      version: 1,
      authorityRole: "canonical-classical-ordinary-nnc-noun-class-vocabulary",
      producer: "ordinary-nnc-engine",
      consumers: ["ordinary-nnc-state", "ordinary-nnc-presentation", "classical-nnc-engine", "classical-url-state", "classical-verification"],
      description: "The single ordered Classical ordinary-NNC noun-class vocabulary, with typed aliases that cannot grant display text grammar authority.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: frame?.language === "classical-nahuatl"
          && frame?.values?.join("|") === "tl|tli|in|zero",
        diagnostic: "ordinary-nnc-classical-noun-class-vocabulary-invalid"
      }, {
        ok: frame?.aliases?.tl === "tl"
          && frame?.aliases?.tli === "tli"
          && frame?.aliases?.li === "tli"
          && frame?.aliases?.in === "in"
          && frame?.aliases?.zero === "zero",
        diagnostic: "ordinary-nnc-classical-noun-class-aliases-invalid"
      }, {
        ok: frame?.profiles === undefined,
        diagnostic: "ordinary-nnc-alternate-noun-class-profile-returned"
      }, {
        ok: frame?.manuallyWrittenFormulaAuthority === false,
        diagnostic: "ordinary-nnc-manual-formula-authority-boundary-required"
      }])
    }), Object.freeze({
      contractKind: "ordinary-nnc-noun-class-control-inventory-validation-frame",
      version: 1,
      authorityRole: "non-authorizing-classical-noun-class-control-parity-audit",
      producer: "ordinary-nnc-presentation",
      consumers: ["ordinary-nnc-presentation", "classical-presentation", "classical-verification"],
      description: "An exact parity audit of active Result controls and Classical shell and Canvas records against the canonical vocabulary.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "ordinary-nnc-noun-class-control-inventory-status-invalid"
      }, {
        ok: frame?.expectedValues?.join("|") === "tl|tli|in|zero"
          && Array.isArray(frame?.controlValues)
          && Array.isArray(frame?.ledgerValues),
        diagnostic: "ordinary-nnc-noun-class-control-inventory-values-required"
      }, {
        ok: frame?.authorizationStatus !== "authorized"
          || frame?.controlsMatch === true && frame?.ledgerMatches === true,
        diagnostic: "authorized-ordinary-nnc-noun-class-control-inventory-invalid"
      }, {
        ok: frame?.controlsAndLedgerAreNotGrammarAuthority === true,
        diagnostic: "ordinary-nnc-noun-class-control-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "ordinary-nnc-noun-class-selection-frame",
      version: 1,
      authorityRole: "typed-classical-ordinary-nnc-noun-class-recognition",
      producer: "ordinary-nnc-engine",
      consumers: ["ordinary-nnc-engine", "ordinary-nnc-state", "ordinary-nnc-presentation", "classical-url-state", "classical-verification"],
      description: "A typed selection that distinguishes absent, recognized, and invalid explicit class intent without granting raw formula strings authority.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked", "absent"].includes(frame?.authorizationStatus),
        diagnostic: "ordinary-nnc-noun-class-selection-status-invalid"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || frame?.recognized === true && Boolean(frame?.normalizedValue),
        diagnostic: "authorized-ordinary-nnc-noun-class-selection-invalid"
      }, {
        ok: frame?.authorizationStatus !== "blocked" || frame?.inputProvided === true && Boolean(frame?.requestedValue) && Boolean(frame?.blockReason) && frame?.normalizedValue === "",
        diagnostic: "blocked-ordinary-nnc-noun-class-selection-invalid"
      }, {
        ok: frame?.authorizationStatus !== "absent" || frame?.inputProvided === false,
        diagnostic: "absent-ordinary-nnc-noun-class-selection-invalid"
      }, {
        ok: frame?.rawFormulaStringAuthority === false,
        diagnostic: "ordinary-nnc-noun-class-selection-raw-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-vnc-conditioned-paradigm-cell-frame",
      version: 1,
      authorityRole: "typed-conditioned-paradigm-cell-identity-and-realization",
      producer: "classical-lesson11-engine",
      consumers: ["classical-vnc-application-boundary", "classical-presentation", "classical-verification"],
      description: "A typed irregular paradigm cell that preserves one common tense identity and every conditioned realization without granting formulas or display text authority.",
      requiredCapabilities: [],
      validator: frame => {
        const profile = getClassicalVncConditionedParadigmCellProfile(frame);
        return buildGrammarContractValidationResult([{
          ok: frame?.authorizationStatus === "authorized",
          diagnostic: "conditioned-paradigm-cell-status-invalid"
        }, {
          ok: ["structural", "finite"].includes(frame?.realizationPhase),
          diagnostic: "conditioned-paradigm-cell-realization-phase-invalid"
        }, {
          ok: Boolean(profile)
            && frame?.sourceDocument === "ANDREWS_TRANSCRIPTION_CANVAS.md"
            && frame?.sourceSection === profile.sourceSection,
          diagnostic: "conditioned-paradigm-cell-source-required"
        }, {
          ok: Boolean(profile)
            && frame?.greatestCommonDivisor?.paradigmTense === profile.paradigmTense
            && frame?.greatestCommonDivisor?.semanticTenseValue === profile.semanticTenseValue
            && frame?.greatestCommonDivisor?.morphologicalTense === profile.morphologicalTense
            && frame?.greatestCommonDivisor?.morphologicalAspect === profile.morphologicalAspect,
          diagnostic: "conditioned-paradigm-cell-gcd-invalid"
        }, {
          ok: Boolean(profile)
            && Array.isArray(frame?.leastCommonMultiple?.distinctionAxes)
            && frame.leastCommonMultiple.distinctionAxes.length === profile.distinctionAxes.length
            && frame.leastCommonMultiple.distinctionAxes.every((axis, index) => axis === profile.distinctionAxes[index])
            && Array.isArray(frame?.leastCommonMultiple?.realizationInventory)
            && frame.leastCommonMultiple.realizationInventory.length === profile.realizationCount
            && Array.isArray(frame?.leastCommonMultiple?.authorizedVariantIds)
            && frame.leastCommonMultiple.authorizedVariantIds.includes(frame.leastCommonMultiple.defaultVariantId)
            && Array.isArray(frame?.leastCommonMultiple?.selectedRealizations)
            && frame.leastCommonMultiple.selectedRealizations.length === frame.leastCommonMultiple.authorizedVariantIds.length
            && frame.leastCommonMultiple.selectedRealizations.every(realization => (
              frame.leastCommonMultiple.authorizedVariantIds.includes(realization.variantId)
            )),
          diagnostic: "conditioned-paradigm-cell-lcm-invalid"
        }, {
          ok: frame?.realizationPhase !== "finite"
            || frame.leastCommonMultiple.selectedRealizations.every(realization => (
              realization.typedSlotFrame?.kind === "classical-nahuatl-vnc-slot-frame"
              && realization.typedSlotFrame?.authorizationStatus === "authorized"
              && Boolean(realization.formulaRealization)
              && Boolean(realization.surfaceRealization)
              && realization.formulaStringAuthority === false
              && realization.surfaceStringAuthority === false
            )),
          diagnostic: "finite-conditioned-paradigm-cell-realizations-required"
        }, {
          ok: frame?.callerSuppliedAuthorityAccepted === false
            && frame?.formulaStringAuthority === false
            && frame?.displayTextAuthority === false,
          diagnostic: "conditioned-paradigm-cell-authority-boundary-invalid"
        }]);
      }
    }), Object.freeze({
      contractKind: "classical-nahuatl-vnc-semantic-input-vocabulary",
      version: 1,
      authorityRole: "canonical-semantic-vnc-input-vocabulary",
      producer: "classical-vnc-layer-evaluator",
      consumers: ["classical-lesson11-engine", "classical-presentation", "classical-verification"],
      description: "The Andrews-authorized semantic VNC mood and tense vocabulary, kept distinct from morphological fillers.",
      requiredCapabilities: ["classical-vnc-derivation-evaluator"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: Array.isArray(frame?.moods) && frame.moods.length > 0 && Array.isArray(frame?.tenses) && frame.tenses.length > 0,
        diagnostic: "semantic-vnc-vocabulary-moods-and-tenses-required"
      }, {
        ok: frame?.tensesByMood && frame.moods?.every(mood => Array.isArray(frame.tensesByMood[mood]) && frame.tensesByMood[mood].every(tense => frame.tenses.includes(tense))),
        diagnostic: "semantic-vnc-vocabulary-mood-mapping-invalid"
      }, {
        ok: frame?.morphologicalFillersAreSeparate === true,
        diagnostic: "semantic-vnc-vocabulary-morphological-separation-required"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-vnc-semantic-selection-frame",
      version: 1,
      authorityRole: "typed-semantic-vnc-selection-authorization",
      producer: "classical-vnc-layer-evaluator",
      consumers: ["classical-lesson11-engine", "classical-vnc-application-boundary", "classical-presentation", "classical-verification"],
      description: "A fail-closed semantic mood and tense selection validated before lexeme-specific realization.",
      requiredCapabilities: ["classical-vnc-derivation-evaluator"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "semantic-vnc-selection-status-invalid"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || Boolean(frame?.mood && frame?.semanticTense && frame?.moodTenses?.includes(frame.semanticTense) && frame?.allowedSemanticTenses?.includes(frame.semanticTense)),
        diagnostic: "authorized-semantic-vnc-selection-mood-and-tense-invalid"
      }, {
        ok: frame?.authorizationStatus !== "blocked" || Boolean(frame?.blockReason),
        diagnostic: "blocked-semantic-vnc-selection-reason-required"
      }, {
        ok: frame?.semanticTenseIsNotMorphologicalFiller === true,
        diagnostic: "semantic-vnc-selection-morphological-separation-required"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-vnc-semantic-control-inventory-validation-frame",
      version: 1,
      authorityRole: "non-authorizing-semantic-control-parity-audit",
      producer: "classical-vnc-layer-evaluator",
      consumers: ["classical-presentation", "classical-verification"],
      description: "A parity audit proving shell controls and Canvas ledger tags reproduce the canonical semantic vocabulary without becoming grammar authority.",
      requiredCapabilities: ["classical-vnc-derivation-evaluator"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "semantic-vnc-control-inventory-status-invalid"
      }, {
        ok: Array.isArray(frame?.moodValues) && Array.isArray(frame?.tenseValues) && Array.isArray(frame?.expectedMoodValues) && Array.isArray(frame?.expectedTenseValues),
        diagnostic: "semantic-vnc-control-inventory-values-required"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || frame?.moodInventoryMatches === true && frame?.tenseInventoryMatches === true && frame?.duplicateMoodValues?.length === 0 && frame?.duplicateTenseValues?.length === 0 && frame?.mismatchedAuthorityOptions?.length === 0,
        diagnostic: "authorized-semantic-vnc-control-inventory-parity-invalid"
      }, {
        ok: frame?.shellAndLedgerAreNotGrammarAuthority === true,
        diagnostic: "semantic-vnc-control-inventory-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "generation-source-transitivity-vocabulary",
      version: 1,
      authorityRole: "canonical-source-topology-vocabulary",
      producer: "generation-valency-engine",
      consumers: ["classical-lesson4", "classical-presentation", "classical-url-state", "classical-verification"],
      description: "The ordered intransitive, transitive, and bitransitive source topology with A/B/C slots and vi/vt/vb aliases, separate from Canvas Valence authority.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: Array.isArray(frame?.sourceTransitivities) && frame.sourceTransitivities.join("|") === "intransitive|transitive|bitransitive",
        diagnostic: "source-transitivity-vocabulary-invalid"
      }, {
        ok: frame?.aliases?.vi === "intransitive" && frame?.aliases?.vt === "transitive" && frame?.aliases?.vb === "bitransitive",
        diagnostic: "source-transitivity-aliases-invalid"
      }, {
        ok: frame?.sourceSlotByTransitivity?.intransitive === "a" && frame?.sourceSlotByTransitivity?.transitive === "b" && frame?.sourceSlotByTransitivity?.bitransitive === "c",
        diagnostic: "source-transitivity-slot-topology-invalid"
      }, {
        ok: frame?.structuralTopologyIsNotCanvasValenceAuthority === true,
        diagnostic: "source-transitivity-canvas-valence-boundary-required"
      }])
    }), Object.freeze({
      contractKind: "generation-source-transitivity-selection-frame",
      version: 1,
      authorityRole: "typed-source-topology-recognition",
      producer: "generation-valency-engine",
      consumers: ["classical-lesson4", "classical-presentation", "classical-url-state", "classical-verification"],
      description: "A recognition frame that distinguishes absent structural input from valid and invalid explicit source transitivity.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked", "not-applicable"].includes(frame?.authorizationStatus),
        diagnostic: "source-transitivity-selection-status-invalid"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || frame?.recognized === true && ["a", "b", "c"].includes(frame?.sourceSlotKey),
        diagnostic: "authorized-source-transitivity-selection-invalid"
      }, {
        ok: frame?.authorizationStatus !== "blocked" || frame?.explicit === true && Boolean(frame?.blockReason) && frame?.sourceTransitivity === "" && frame?.sourceSlotKey === "",
        diagnostic: "blocked-source-transitivity-selection-invalid"
      }, {
        ok: frame?.authorizationStatus !== "not-applicable" || frame?.explicit === false && frame?.sourceTransitivity === "" && frame?.sourceSlotKey === "",
        diagnostic: "absent-source-transitivity-selection-invalid"
      }, {
        ok: frame?.structuralTopologyIsNotCanvasValenceAuthority === true,
        diagnostic: "source-transitivity-selection-boundary-required"
      }])
    }), Object.freeze({
      contractKind: "generation-source-transitivity-control-inventory-validation-frame",
      version: 1,
      authorityRole: "non-authorizing-source-topology-control-parity-audit",
      producer: "classical-composer",
      consumers: ["classical-presentation", "classical-verification"],
      description: "An exact parity audit of three visible tab groups, the hidden state select, and A/B/C slot shells without granting those controls Canvas Valence authority.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked", "not-applicable"].includes(frame?.authorizationStatus),
        diagnostic: "source-transitivity-control-inventory-status-invalid"
      }, {
        ok: frame?.authorizationStatus === "not-applicable" || Array.isArray(frame?.expectedValues) && Array.isArray(frame?.visibleGroupValues) && Array.isArray(frame?.hiddenSelectValues) && Array.isArray(frame?.slotShellValues),
        diagnostic: "source-transitivity-control-inventory-values-required"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || frame?.inventoryMatches === true && frame?.hiddenSelectMatches === true && frame?.visibleGroupsMatch === true && frame?.slotShellsMatch === true,
        diagnostic: "authorized-source-transitivity-control-inventory-invalid"
      }, {
        ok: frame?.structuralControlsAreNotCanvasValenceAuthority === true,
        diagnostic: "source-transitivity-control-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-vnc-derivation-type-vocabulary",
      version: 1,
      authorityRole: "canonical-vnc-derivation-type-vocabulary",
      producer: "classical-vnc-derivation-evaluator",
      consumers: ["classical-vnc-application-boundary", "classical-presentation", "classical-url-state", "classical-verification"],
      description: "The shared Direct, Causative, and Applicative protocol vocabulary whose contextual authorization remains with the typed Andrews derivation evaluator.",
      requiredCapabilities: ["classical-vnc-derivation-evaluator"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: Array.isArray(frame?.derivationTypes) && frame.derivationTypes.length === 3 && frame.derivationTypes.includes(frame?.directType),
        diagnostic: "vnc-derivation-type-vocabulary-invalid"
      }, {
        ok: Array.isArray(frame?.derivedTypes) && frame.derivedTypes.every(type => frame.derivationTypes.includes(type) && type !== frame.directType),
        diagnostic: "vnc-derived-type-subset-invalid"
      }, {
        ok: frame?.contextualAuthorizationRemainsTyped === true,
        diagnostic: "vnc-derivation-contextual-authorization-boundary-required"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-vnc-derivation-type-selection-frame",
      version: 1,
      authorityRole: "typed-vnc-derivation-type-recognition",
      producer: "classical-vnc-derivation-evaluator",
      consumers: ["classical-vnc-application-boundary", "classical-presentation", "classical-url-state", "classical-verification"],
      description: "A fail-closed recognition frame for derivation type before typed source-specific causative or applicative authorization.",
      requiredCapabilities: ["classical-vnc-derivation-evaluator"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "vnc-derivation-type-selection-status-invalid"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || frame?.allowedDerivationTypes?.includes(frame?.derivationType),
        diagnostic: "authorized-vnc-derivation-type-selection-invalid"
      }, {
        ok: frame?.authorizationStatus !== "blocked" || Boolean(frame?.blockReason) && frame?.derivationType === "",
        diagnostic: "blocked-vnc-derivation-type-selection-invalid"
      }, {
        ok: frame?.contextualAuthorizationRemainsTyped === true,
        diagnostic: "vnc-derivation-type-selection-boundary-required"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-vnc-derivation-type-control-inventory-validation-frame",
      version: 1,
      authorityRole: "non-authorizing-vnc-derivation-control-parity-audit",
      producer: "classical-vnc-derivation-evaluator",
      consumers: ["classical-presentation", "classical-verification"],
      description: "A parity audit of canonical derivation types, shell button values, and their Canvas evidence tags without granting grammar authority to the shell or ledger.",
      requiredCapabilities: ["classical-vnc-derivation-evaluator"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "vnc-derivation-control-inventory-status-invalid"
      }, {
        ok: Array.isArray(frame?.values) && Array.isArray(frame?.expectedValues),
        diagnostic: "vnc-derivation-control-inventory-values-required"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || frame?.inventoryMatches === true && frame?.duplicateValues?.length === 0 && frame?.mismatchedAuthorityOptions?.length === 0,
        diagnostic: "authorized-vnc-derivation-control-inventory-parity-invalid"
      }, {
        ok: frame?.shellAndLedgerAreNotGrammarAuthority === true,
        diagnostic: "vnc-derivation-control-inventory-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-vnc-voice-vocabulary",
      version: 1,
      authorityRole: "canonical-vnc-voice-vocabulary",
      producer: "classical-vnc-layer-evaluator",
      consumers: ["classical-vnc-application-boundary", "classical-presentation", "classical-url-state", "classical-verification"],
      description: "The ordered target-voice inventory and intentional causative source-voice subset, separate from higher ordered voice-layer operations.",
      requiredCapabilities: ["classical-vnc-derivation-evaluator"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: Array.isArray(frame?.targetVoices) && frame.targetVoices.length === 5 && Array.isArray(frame?.causativeSourceVoices) && frame.causativeSourceVoices.length === 3,
        diagnostic: "vnc-voice-vocabulary-invalid"
      }, {
        ok: frame?.causativeSourceVoiceIsContextualSubset === true && frame.causativeSourceVoices.every(voice => frame.targetVoices.includes(voice)),
        diagnostic: "vnc-causative-source-voice-subset-invalid"
      }, {
        ok: frame?.higherVoiceLayersAreSeparate === true,
        diagnostic: "vnc-higher-voice-layer-separation-required"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-vnc-voice-selection-frame",
      version: 1,
      authorityRole: "typed-vnc-voice-recognition",
      producer: "classical-vnc-layer-evaluator",
      consumers: ["classical-vnc-application-boundary", "classical-presentation", "classical-verification"],
      description: "A fail-closed target or causative-source voice recognition frame whose contextual availability remains application-derived.",
      requiredCapabilities: ["classical-vnc-derivation-evaluator"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["target", "causative-source"].includes(frame?.role) && ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "vnc-voice-selection-role-or-status-invalid"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || frame?.allowedVoices?.includes(frame?.voice),
        diagnostic: "authorized-vnc-voice-selection-invalid"
      }, {
        ok: frame?.authorizationStatus !== "blocked" || Boolean(frame?.blockReason) && frame?.voice === "",
        diagnostic: "blocked-vnc-voice-selection-invalid"
      }, {
        ok: frame?.contextualAvailabilityRemainsApplicationDerived === true,
        diagnostic: "vnc-voice-contextual-availability-boundary-required"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-vnc-voice-control-inventory-validation-frame",
      version: 1,
      authorityRole: "non-authorizing-vnc-voice-control-parity-audit",
      producer: "classical-vnc-layer-evaluator",
      consumers: ["classical-presentation", "classical-url-state", "classical-verification"],
      description: "A parity audit of ordered target/source voice controls and Canvas evidence tags, preserving entrada v1 positional meaning without granting UI authority.",
      requiredCapabilities: ["classical-vnc-derivation-evaluator"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "vnc-voice-control-inventory-status-invalid"
      }, {
        ok: Array.isArray(frame?.targetValues) && Array.isArray(frame?.sourceValues) && Array.isArray(frame?.expectedTargetValues) && Array.isArray(frame?.expectedSourceValues),
        diagnostic: "vnc-voice-control-inventory-values-required"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || frame?.targetInventoryMatches === true && frame?.sourceInventoryMatches === true && frame?.duplicateTargetValues?.length === 0 && frame?.duplicateSourceValues?.length === 0 && frame?.mismatchedAuthorityOptions?.length === 0,
        diagnostic: "authorized-vnc-voice-control-inventory-parity-invalid"
      }, {
        ok: frame?.shellAndLedgerAreNotGrammarAuthority === true,
        diagnostic: "vnc-voice-control-inventory-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-result-output-scope-vocabulary",
      version: 1,
      authorityRole: "canonical-result-projection-vocabulary",
      producer: "classical-output-scope-contract",
      consumers: ["classical-vnc-application-boundary", "classical-presentation", "classical-url-state", "classical-verification"],
      description: "The shared ordered single/paradigm Result vocabulary whose NNC and VNC paradigm builders remain role-specific.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: Array.isArray(frame?.outputScopes)
          && frame.outputScopes.length === CLASSICAL_RESULT_OUTPUT_SCOPES.length
          && frame.outputScopes.every((scope, index) => scope === CLASSICAL_RESULT_OUTPUT_SCOPES[index]),
        diagnostic: "classical-result-output-scope-vocabulary-invalid"
      }, {
        ok: frame?.absentDefaultsToSingle === true && frame?.invalidExplicitInputBlocks === true,
        diagnostic: "classical-result-output-scope-default-or-block-boundary-invalid"
      }, {
        ok: frame?.roleSpecificParadigmBuildersRemainSeparate === true && frame?.shellCanvasAndUrlAreNotGrammarAuthority === true,
        diagnostic: "classical-result-output-scope-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-result-output-scope-selection-frame",
      version: 1,
      authorityRole: "typed-result-projection-scope-recognition",
      producer: "classical-output-scope-contract",
      consumers: ["classical-vnc-application-boundary", "classical-presentation", "classical-url-state", "classical-verification"],
      description: "A typed scope frame that defaults absent intent to single and blocks malformed explicit intent.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["nnc", "vnc", ""].includes(frame?.role) && ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "classical-result-output-scope-selection-role-or-status-invalid"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || CLASSICAL_RESULT_OUTPUT_SCOPES.includes(frame?.outputScope),
        diagnostic: "authorized-classical-result-output-scope-selection-invalid"
      }, {
        ok: frame?.authorizationStatus !== "blocked" || frame?.explicit === true && frame?.outputScope === "" && Boolean(frame?.blockReason),
        diagnostic: "blocked-classical-result-output-scope-selection-invalid"
      }, {
        ok: frame?.presentationScopeCannotAuthorizeGrammar === true && frame?.roleSpecificParadigmBuildersRemainSeparate === true,
        diagnostic: "classical-result-output-scope-selection-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-result-output-scope-control-inventory-validation-frame",
      version: 1,
      authorityRole: "non-authorizing-result-scope-control-parity-audit",
      producer: "classical-presentation",
      consumers: ["classical-verification"],
      description: "An exact ordered shell and Canvas-ledger parity audit for NNC and VNC Result scope controls.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked", "not-applicable"].includes(frame?.authorizationStatus),
        diagnostic: "classical-result-output-scope-control-inventory-status-invalid"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || frame?.shellMatches === true && frame?.ledgerMatches === true && frame?.duplicateShellKeys?.length === 0 && frame?.duplicateLedgerKeys?.length === 0,
        diagnostic: "authorized-classical-result-output-scope-control-inventory-invalid"
      }, {
        ok: frame?.shellCanvasAndUrlAreNotGrammarAuthority === true && frame?.roleSpecificParadigmBuildersRemainSeparate === true,
        diagnostic: "classical-result-output-scope-control-inventory-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-vnc-nonactive-formation-option",
      version: 1,
      authorityRole: "typed-authorized-impersonal-formation-option",
      producer: "classical-vnc-application-boundary",
      consumers: ["classical-presentation", "classical-verification"],
      description: "One Andrews-authorized inherently impersonal or tla-impersonal formation exposed under the public Impersonal voice.",
      requiredCapabilities: ["classical-vnc-application"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: Boolean(frame?.optionId && frame?.label && frame?.ruleId && frame?.ruleTagId),
        diagnostic: "nonactive-formation-option-identity-label-and-rule-required"
      }, {
        ok: frame?.publicVoice === "impersonal" && ["inherent-impersonal", "tla-impersonal"].includes(frame?.voiceOperation) && frame?.formationKind === frame?.voiceOperation,
        diagnostic: "nonactive-formation-option-public-and-internal-voice-boundary-invalid"
      }, {
        ok: frame?.typedFormationAuthority === true && frame?.callerSuppliedAuthorityAccepted === false && frame?.formulaStringAuthority === false && frame?.surfaceStringAuthority === false,
        diagnostic: "nonactive-formation-option-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-vnc-nonactive-formation-option-inventory",
      version: 1,
      authorityRole: "typed-source-and-public-voice-conditioned-formation-inventory",
      producer: "classical-vnc-application-boundary",
      consumers: ["classical-presentation", "classical-verification"],
      description: "The one canonical inventory that unifies suffixal, inherently impersonal, and tla-impersonal formations beneath a selected public nonactive voice.",
      requiredCapabilities: ["classical-vnc-application"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["active", "passive", "impersonal"].includes(frame?.publicVoice) && ["not-applicable", "authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "nonactive-formation-inventory-public-voice-and-status-invalid"
      }, {
        ok: Array.isArray(frame?.options) && frame.options.every(option => Boolean(option?.optionId) && option?.publicVoice === frame.publicVoice && typeof option?.voiceOperation === "string"),
        diagnostic: "nonactive-formation-inventory-option-continuity-invalid"
      }, {
        ok: frame?.selectorRequired === (frame?.options?.length > 1) && frame?.selectionRequired === frame?.selectorRequired && frame?.automaticOptionId === (frame?.options?.length === 1 ? frame.options[0].optionId : "") && frame?.defaultOptionId === "",
        diagnostic: "nonactive-formation-inventory-selection-policy-invalid"
      }, {
        ok: frame?.internalVoiceOperationsArePublicChoices === false && frame?.typedFormationAuthority === true && frame?.callerSuppliedAuthorityAccepted === false && frame?.formulaStringAuthority === false && frame?.surfaceStringAuthority === false,
        diagnostic: "nonactive-formation-inventory-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-late-vnc-derivation-operation-frame",
      version: 1,
      authorityRole: "canonical-typed-late-vnc-operation",
      producer: "classical-lessons27-29-33-operation-service",
      consumers: ["classical-finite-boundary", "classical-verification"],
      description: "An engine-issued Lessons 27, 28, 29, or 33 operation that consumes and returns typed VNC slots.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlOperationFrame"),
        diagnostic: "lessons27-29-33-operation-canonical-validator-required"
      }, {
        ok: frame?.callerFormulaAuthority === false
          && frame?.callerSurfaceAuthority === false,
        diagnostic: "lessons27-29-33-operation-authority-boundary-invalid"
      }, {
        ok: frame?.authorizationStatus !== "authorized"
          || Boolean(frame?.sourceTypedVncSlotFrame && frame?.targetTypedVncSlotFrame && frame?.ruleFamily),
        diagnostic: "lessons27-29-33-authorized-operation-typed-path-required"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-late-vnc-derivation-operation-machinery-frame",
      version: 1,
      authorityRole: "canonical-late-vnc-machinery",
      producer: "classical-lessons27-29-33-operation-service",
      consumers: ["classical-finite-boundary", "classical-verification"],
      description: "The canonical machinery wrapper admitted to the shared finite VNC renderer.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlMachineryFrame"),
        diagnostic: "lessons27-29-33-machinery-canonical-validator-required"
      }, {
        ok: frame?.formulaStringAuthority === false && frame?.surfaceStringAuthority === false,
        diagnostic: "lessons27-29-33-machinery-string-authority-forbidden"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-late-vnc-derivation-closure-frame",
      version: 1,
      authorityRole: "canonical-typed-late-operation-result",
      producer: "classical-lessons27-29-33-operation-service",
      consumers: ["classical-finite-boundary", "classical-verification"],
      description: "The engine-issued typed operation and canonical finite result for Lessons 27, 28, 29, and 33.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlClosureFrame"),
        diagnostic: "lessons27-29-33-closure-canonical-validator-required"
      }, {
        ok: frame?.typedFrameAuthority === true
          && frame?.formulaStringAuthority === false
          && frame?.surfaceStringAuthority === false
          && frame?.callerSuppliedAuthorityAccepted === false,
        diagnostic: "lessons27-29-33-closure-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-adjectival-modification-grammar-frame",
      version: 2,
      authorityRole: "typed-lessons40-43-gcd-lcm",
      producer: "classical-lessons40-43-grammar",
      consumers: ["classical-presentation", "classical-verification"],
      description: "The shared typed nuclear-clause/adjectival-relation invariant and complete Lessons 40-43 distinction space.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlAdjectivalModificationGrammarFrame"),
        diagnostic: "lessons40-43-grammar-frame-canonical-validator-required"
      }, {
        ok: frame?.greatestCommonDivisor?.satisfied === true
          && frame?.greatestCommonDivisor?.constituentsAreCanonicalSelectedResults === true
          && frame?.greatestCommonDivisor?.adjectivalRoleIsTyped === true
          && frame?.greatestCommonDivisor?.sharedReferentRelationIsTyped === true,
        diagnostic: "lessons40-43-gcd-must-be-satisfied"
      }, {
        ok: frame?.leastCommonMultiple?.licensedAxisSetComplete === true
          && Array.isArray(frame?.leastCommonMultiple?.axisIds)
          && frame.leastCommonMultiple.axisIds.length === 5
          && frame.leastCommonMultiple.selectedAxisIds?.join("|")
            === frame.leastCommonMultiple.axisIds.join("|"),
        diagnostic: "lessons40-43-lcm-must-be-complete"
      }, {
        ok: frame?.typedGrammarAuthority === true
          && frame?.callerSuppliedCoordinateAuthority === false
          && frame?.lessonMetadataAuthority === false
          && frame?.citationAuthority === false
          && frame?.formulaStringAuthority === false
          && frame?.surfaceStringAuthority === false,
        diagnostic: "lessons40-43-external-authority-forbidden"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-adjectival-modification-result-frame",
      version: 2,
      authorityRole: "typed-lessons40-43-selected-result",
      producer: "classical-lessons40-43-grammar",
      consumers: ["classical-presentation", "classical-verification"],
      description: "A selected multiple-nucleus adjectival-modification result with independent formula and written projections from one typed linearization.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlResultFrame"),
        diagnostic: "lessons40-43-result-frame-canonical-validator-required"
      }, {
        ok: frame?.typedFrameAuthority === true
          && frame?.callerSuppliedAuthorityAccepted === false
          && frame?.lessonMetadataAuthority === false
          && frame?.formulaStringAuthority === false
          && frame?.surfaceStringAuthority === false,
        diagnostic: "lessons40-43-result-external-authority-forbidden"
      }, {
        ok: frame?.authorizationStatus !== "authorized"
          || Boolean(frame?.selectedFormulaRecordId
            && frame?.selectedFormulaRealizationRecordId
            && frame?.selectedVariantId
            && frame?.canonicalResultFrame
            && frame?.formulaAndWrittenGeneratedIndependently === true
            && frame?.formulaProjection?.derivedFromWrittenProjection === false
            && frame?.writtenProjection?.derivedFromFormulaProjection === false),
        diagnostic: "lessons40-43-authorized-result-selection-required"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-vnc-application-request",
      version: 1,
      authorityRole: "normalized-user-intent",
      producer: "classical-vnc-application-boundary",
      consumers: ["classical-grammar-engine", "classical-presentation"],
      description: "A normalized request whose caller-provided surfaces and results are non-authoritative.",
      requiredCapabilities: ["classical-vnc-application"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: typeof frame?.sourceStem === "string",
        diagnostic: "application-request-source-stem-string-required"
      }, {
        ok: typeof frame?.voice === "string",
        diagnostic: "application-request-selected-voice-required"
      }, {
        ok: frame?.outputScopeSelectionFrame?.kind === "classical-result-output-scope-selection-frame"
          && frame?.requestedOutputScopeRecognized === (frame.outputScopeSelectionFrame.authorizationStatus === "authorized"),
        diagnostic: "application-request-output-scope-selection-frame-required"
      }, {
        ok: frame?.callerSuppliedDerivedAuthorityAllowed === false,
        diagnostic: "application-request-caller-authority-must-be-disabled"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-vnc-application-control-frame",
      version: 1,
      authorityRole: "application-control-selection",
      producer: "classical-vnc-application-boundary",
      consumers: ["classical-presentation"],
      description: "The allowed and selected voice inventory produced by the application boundary.",
      requiredCapabilities: ["classical-vnc-application"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: Array.isArray(frame?.allowedVoices) && frame.allowedVoices.length > 0,
        diagnostic: "application-control-allowed-voices-required"
      }, {
        ok: frame?.allowedVoices?.includes(frame?.selectedVoice),
        diagnostic: "application-control-selected-voice-must-be-allowed"
      }, {
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "application-control-status-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-denominal-vnc-source-frame",
      version: 1,
      authorityRole: "typed-denominal-nominal-source",
      producer: "classical-denominal-vnc-grammar",
      consumers: ["classical-denominal-vnc-grammar", "classical-verification"],
      description: "An engine-issued nominal source admitted to a Lessons 54-55 denominal operation inventory.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlDenominalVncSourceFrame"),
        diagnostic: "denominal-vnc-source-frame-canonical-validator-required"
      }, {
        ok: frame?.typedGrammarAuthority === true
          && frame?.callerSuppliedAuthorityAccepted === false
          && frame?.lessonMetadataAuthority === false
          && frame?.formulaStringAuthority === false
          && frame?.surfaceStringAuthority === false,
        diagnostic: "denominal-vnc-source-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-denominal-vnc-operation-inventory",
      version: 1,
      authorityRole: "typed-denominal-operation-inventory",
      producer: "classical-denominal-vnc-grammar",
      consumers: ["classical-denominal-vnc-grammar", "classical-presentation"],
      description: "The licensed denominal operation candidates derived from one canonical nominal source.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlDenominalVncOperationInventory"),
        diagnostic: "denominal-vnc-operation-inventory-canonical-validator-required"
      }, {
        ok: Array.isArray(frame?.options)
          && frame.options.length > 0
          && frame?.callerSuppliedAuthorityAccepted === false,
        diagnostic: "denominal-vnc-operation-inventory-invalid"
      }])
    }), Object.freeze({
      contractKind:
        "classical-nahuatl-denominal-vnc-operation-path-inventory",
      version: 1,
      authorityRole: "typed-denominal-operation-path-inventory",
      producer: "classical-denominal-vnc-grammar",
      consumers: [
        "classical-grammar-application",
        "classical-presentation"
      ],
      description:
        "Owner-issued source-specific denominal paths and required class branches.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: isAuthorizedGrammarContractCanonical(
          frame,
          "isClassicalNahuatlDenominalVncOperationPathInventory"
        ),
        diagnostic:
          "denominal-vnc-operation-path-inventory-canonical-validator-required"
      }, {
        ok: Array.isArray(frame?.operationOptions)
          && frame.operationOptions.length > 0
          && Array.isArray(frame?.pathChoices)
          && frame.pathChoices.length > 0
          && frame?.callerSuppliedAuthorityAccepted === false,
        diagnostic: "denominal-vnc-operation-path-inventory-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-denominal-vnc-operation-frame",
      version: 1,
      authorityRole: "typed-denominal-operation",
      producer: "classical-denominal-vnc-grammar",
      consumers: ["classical-vnc-application-boundary", "classical-verification"],
      description: "The selected noun-to-verb operation, target class, and participant projection.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlDenominalVncOperationFrame"),
        diagnostic: "denominal-vnc-operation-frame-canonical-validator-required"
      }, {
        ok: frame?.typedGrammarAuthority === true
          && frame?.callerSuppliedAuthorityAccepted === false
          && frame?.lessonMetadataAuthority === false
          && frame?.formulaStringAuthority === false
          && frame?.surfaceStringAuthority === false,
        diagnostic: "denominal-vnc-operation-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-denominal-vnc-grammar-frame",
      version: 1,
      authorityRole: "typed-denominal-vnc-gcd-lcm",
      producer: "classical-denominal-vnc-grammar",
      consumers: ["classical-vnc-application-boundary", "classical-presentation", "classical-verification"],
      description: "The shared denominal GCD and complete Lessons 54-55 licensed distinction space.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlDenominalVncGrammarFrame"),
        diagnostic: "denominal-vnc-grammar-frame-canonical-validator-required"
      }, {
        ok: frame?.greatestCommonDivisor?.satisfied === true,
        diagnostic: "denominal-vnc-gcd-must-be-satisfied"
      }, {
        ok: frame?.leastCommonMultiple?.licensedRouteSetComplete === true
          && frame?.leastCommonMultiple?.licensedAxisSetComplete === true
          && frame?.leastCommonMultiple?.routeCount === 41
          && frame?.leastCommonMultiple?.axisCount === 54,
        diagnostic: "denominal-vnc-lcm-must-be-complete"
      }, {
        ok: frame?.typedGrammarAuthority === true
          && frame?.callerSuppliedAuthorityAccepted === false
          && frame?.lessonMetadataAuthority === false
          && frame?.formulaStringAuthority === false
          && frame?.surfaceStringAuthority === false,
        diagnostic: "denominal-vnc-grammar-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-denominal-vnc-result-frame",
      version: 1,
      authorityRole: "canonical-denominal-finite-result",
      producer: "classical-denominal-vnc-grammar",
      consumers: ["classical-presentation", "classical-verification"],
      description: "A typed denominal operation paired with the canonical selected formula and finite VNC surface.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlDenominalVncResultFrame"),
        diagnostic: "denominal-vnc-result-frame-canonical-validator-required"
      }, {
        ok: frame?.grammarFrame?.greatestCommonDivisor?.satisfied === true
          && frame?.canonicalVncFrame?.authorizationStatus === "authorized"
          && Boolean(frame?.formulaRealization)
          && Boolean(frame?.surfaceRealization),
        diagnostic: "denominal-vnc-finite-result-required"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-denominal-vnc-paradigm-plan",
      version: 1,
      authorityRole: "prepared-denominal-vnc-plan",
      producer: "classical-denominal-vnc-grammar",
      consumers: ["classical-vnc-paradigm-projector", "classical-verification"],
      description: "A prepare-once denominal predicate plan whose coordinates are projected by the canonical VNC service.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlDenominalVncParadigmPlan"),
        diagnostic: "denominal-vnc-paradigm-plan-canonical-validator-required"
      }, {
        ok: frame?.canonicalPlan?.authorizationStatus === "authorized"
          && frame?.callerSuppliedAuthorityAccepted === false,
        diagnostic: "denominal-vnc-canonical-paradigm-plan-required"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-denominal-vnc-coordinate-frame",
      version: 1,
      authorityRole: "projected-denominal-vnc-coordinate",
      producer: "classical-denominal-vnc-grammar",
      consumers: ["classical-presentation", "classical-verification"],
      description: "One denominal paradigm coordinate projected by the canonical VNC service.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlDenominalVncCoordinateFrame"),
        diagnostic: "denominal-vnc-coordinate-frame-canonical-validator-required"
      }, {
        ok: frame?.canonicalCoordinate?.authorizationStatus === "authorized"
          && frame?.formulaStringAuthority === false
          && frame?.surfaceStringAuthority === false,
        diagnostic: "denominal-vnc-coordinate-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-denominal-vnc-ui-projection",
      version: 1,
      authorityRole: "read-only-denominal-presentation",
      producer: "classical-denominal-vnc-grammar",
      consumers: ["classical-presentation"],
      description: "A read-only projection of genuine denominal choices, derived facts, and canonical output.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlDenominalVncUiProjection"),
        diagnostic: "denominal-vnc-ui-projection-canonical-validator-required"
      }, {
        ok: frame?.grammarAuthority === false
          && frame?.displayTextAuthority === false
          && frame?.formulaStringAuthority === false
          && frame?.surfaceStringAuthority === false,
        diagnostic: "denominal-vnc-ui-projection-authority-forbidden"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-vnc-sentence-result-frame",
      version: 1,
      authorityRole: "validated-typed-sentence-result",
      producer: "classical-vnc-application-boundary",
      consumers: ["classical-sentence-composition", "classical-presentation", "classical-verification"],
      description: "The issued VNC sentence result consumed by later typed sentence operations.",
      requiredCapabilities: ["classical-vnc-application"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlVncSentenceResultFrame"),
        diagnostic: "authorized-vnc-sentence-result-canonical-validator-required"
      }, {
        ok: frame?.typedFrameAuthority === true
          && frame?.callerSuppliedAuthorityAccepted === false
          && frame?.curriculumOrderAuthority === false
          && frame?.lessonMetadataAuthority === false,
        diagnostic: "vnc-sentence-result-typed-authority-boundary-invalid"
      }, {
        ok: frame?.formulaStringAuthority === false
          && frame?.surfaceStringAuthority === false
          && frame?.displayStringsAreAuthority === false,
        diagnostic: "vnc-sentence-result-string-authority-forbidden"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-vnc-application-result-frame",
      version: 1,
      authorityRole: "validated-typed-result",
      producer: "classical-vnc-application-boundary",
      consumers: ["classical-presentation", "classical-verification"],
      description: "The typed result selected by the application boundary after grammar authorization.",
      requiredCapabilities: ["classical-vnc-application"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "application-result-status-invalid"
      }, {
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlVncApplicationResultFrame"),
        diagnostic: "authorized-application-result-canonical-validator-required"
      }, {
        ok: frame?.typedFrameAuthority === true,
        diagnostic: "application-result-typed-authority-required"
      }, {
        ok: frame?.formulaStringAuthority === false,
        diagnostic: "application-result-formula-string-authority-forbidden"
      }, {
        ok: frame?.surfaceStringAuthority === false,
        diagnostic: "application-result-surface-string-authority-forbidden"
      }, {
        ok: frame?.callerSuppliedAuthorityAccepted === false,
        diagnostic: "application-result-caller-authority-forbidden"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || Boolean(frame?.selectedMachineryFrame && frame?.finalTypedVncSlotFrame),
        diagnostic: "authorized-application-result-requires-selected-machinery-and-final-typed-slot"
      }, {
        ok: frame?.authorizationStatus !== "blocked" || frame?.formulaRealization === "" && frame?.selectedMachineryFrame == null && frame?.finalTypedVncSlotFrame == null && Array.isArray(frame?.appliedTypedFrames) && frame.appliedTypedFrames.length === 0,
        diagnostic: "blocked-application-result-authority-payload-forbidden"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-vnc-application-frame",
      version: 1,
      authorityRole: "shared-action-envelope",
      producer: "classical-vnc-application-boundary",
      consumers: ["classical-presentation", "classical-verification"],
      description: "The shared request, control, and result envelope consumed outside the grammar engine.",
      requiredCapabilities: ["classical-vnc-application"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: frame?.normalizedRequest?.kind === "classical-nahuatl-vnc-application-request",
        diagnostic: "application-frame-normalized-request-required"
      }, {
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlVncApplicationFrame"),
        diagnostic: "authorized-application-frame-canonical-validator-required"
      }, {
        ok: frame?.controlFrame?.kind === "classical-nahuatl-vnc-application-control-frame",
        diagnostic: "application-frame-control-frame-required"
      }, {
        ok: frame?.resultFrame?.kind === "classical-nahuatl-vnc-application-result-frame",
        diagnostic: "application-frame-result-frame-required"
      }, {
        ok: frame?.authorizationStatus === frame?.resultFrame?.authorizationStatus,
        diagnostic: "application-frame-result-status-mismatch"
      }, {
        ok: frame?.authorizationStatus !== "blocked" || (
          frame?.resultFrame?.authorizationStatus === "blocked"
          && frame?.resultFrame?.formulaRealization === ""
          && frame?.resultFrame?.selectedMachineryFrame == null
          && frame?.resultFrame?.finalTypedVncSlotFrame == null
          && Array.isArray(frame?.resultFrame?.appliedTypedFrames)
          && frame.resultFrame.appliedTypedFrames.length === 0
          && (frame?.controlFrame?.authorizationStatus === "blocked" || (
            frame?.blockReason === "classical-vnc-causative-object-kind-choice-required"
            && frame?.controlFrame?.authorizationStatus === "authorized"
            && frame?.controlFrame?.causativeObjectKindChoiceEligible === true
            && frame?.controlFrame?.causativeObjectKindSelectionRequired === true
            && frame?.controlFrame?.selectedCausativeObjectKind === ""
          ))
        ),
        diagnostic: "blocked-application-frame-status-and-authority-payload-mismatch"
      }, {
        ok: frame?.callerSuppliedAuthorityAccepted === false,
        diagnostic: "application-frame-caller-authority-forbidden"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-vnc-application-service",
      version: 1,
      authorityRole: "application-capability",
      producer: "classical-vnc-application-boundary",
      consumers: ["classical-presentation", "classical-verification"],
      description: "The injected service that performs the shared Lesson 20-22 application action.",
      requiredCapabilities: ["classical-vnc-application"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "application-service-status-invalid"
      }, {
        ok: typeof frame?.evaluate === "function",
        diagnostic: "application-service-evaluate-function-required"
      }, {
        ok: typeof frame?.prepareParadigm === "function" && typeof frame?.projectParadigmCoordinates === "function",
        diagnostic: "application-service-prepared-paradigm-functions-required"
      }, {
        ok: Array.isArray(frame?.requiredCapabilities),
        diagnostic: "application-service-required-capability-list-required"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-vnc-paradigm-generation-plan",
      version: 1,
      authorityRole: "service-issued-typed-source-plan",
      producer: "classical-vnc-application-boundary",
      consumers: ["classical-vnc-application-boundary", "classical-presentation", "classical-verification"],
      description: "An immutable direct-active source plan issued by the canonical VNC service for coordinate projection.",
      requiredCapabilities: ["classical-vnc-application"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlVncParadigmPlan"),
        diagnostic: "vnc-paradigm-plan-canonical-issuer-required"
      }, {
        ok: frame?.typedSourceAuthority === true && frame?.callerSuppliedAuthorityAccepted === false,
        diagnostic: "vnc-paradigm-plan-typed-source-authority-required"
      }, {
        ok: frame?.formulaStringAuthority === false && frame?.surfaceStringAuthority === false,
        diagnostic: "vnc-paradigm-plan-string-authority-forbidden"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-vnc-paradigm-coordinate-frame",
      version: 1,
      authorityRole: "canonical-compact-coordinate-result",
      producer: "classical-vnc-application-boundary",
      consumers: ["classical-presentation", "classical-verification"],
      description: "A compact pointwise VNC result projected from a service-issued source plan.",
      requiredCapabilities: ["classical-vnc-application"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlVncParadigmCoordinateFrame"),
        diagnostic: "vnc-paradigm-coordinate-canonical-issuer-required"
      }, {
        ok: frame?.typedFrameAuthority === true && frame?.callerSuppliedAuthorityAccepted === false,
        diagnostic: "vnc-paradigm-coordinate-typed-authority-required"
      }, {
        ok: frame?.formulaStringAuthority === false && frame?.surfaceStringAuthority === false,
        diagnostic: "vnc-paradigm-coordinate-string-authority-forbidden"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-vnc-derivation-source-analysis",
      version: 1,
      authorityRole: "engine-derived-source-morphology-authority",
      producer: "classical-vnc-derivation-evaluator",
      consumers: ["classical-vnc-derivation-evaluator", "classical-vnc-application-boundary", "classical-presentation", "classical-verification"],
      description: "A canonical boundary-free Lessons 24-25 analysis that binds the active formation basis to its active, passive, or impersonal participant source; editorial hyphens are observations and never authority.",
      requiredCapabilities: ["classical-vnc-derivation-evaluator"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "derivation-source-analysis-status-invalid"
      }, {
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlVncDerivationSourceAnalysisFrame"),
        diagnostic: "authorized-derivation-source-analysis-canonical-validator-required"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || Boolean(frame?.sourceSignature && frame?.sourceStem && frame?.lexicalStem && frame?.sourceMachineryFrame),
        diagnostic: "authorized-derivation-source-analysis-source-required"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || ["active", "passive", "impersonal"].includes(frame?.sourceVoice) && Boolean(frame?.formationSourceSignature && frame?.formationSourceMachineryFrame && frame?.participantSourceTypedIdentity && frame?.participantSurfaceSubject) && Array.isArray(frame?.participantSurfaceObjectRequests),
        diagnostic: "authorized-derivation-source-analysis-formation-and-participant-bases-required"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || Array.isArray(frame?.analyses) && frame?.analysisCount === frame.analyses.length,
        diagnostic: "derivation-source-analysis-array-required"
      }, {
        ok: frame?.callerSuppliedAnalysisAllowed === false && frame?.formulaArtifactAuthority === false && frame?.surfaceArtifactAuthority === false,
        diagnostic: "derivation-source-analysis-external-authority-forbidden"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-vnc-derivation-option-inventory",
      version: 1,
      authorityRole: "engine-derived-option-authority",
      producer: "classical-vnc-derivation-evaluator",
      consumers: ["classical-vnc-application-boundary", "classical-presentation", "classical-verification"],
      description: "The derivational candidates rebuilt from an authorized typed source VNC and Andrews rule evidence.",
      requiredCapabilities: ["classical-vnc-derivation-evaluator"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "derivation-option-inventory-status-invalid"
      }, {
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlVncDerivationOptionInventory"),
        diagnostic: "authorized-derivation-option-inventory-canonical-validator-required"
      }, {
        ok: ["direct", "causative", "applicative"].includes(frame?.derivationType),
        diagnostic: "derivation-option-inventory-type-invalid"
      }, {
        ok: Array.isArray(frame?.options),
        diagnostic: "derivation-option-inventory-options-array-required"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || frame.derivationType === "direct" || frame.options.length > 0,
        diagnostic: "authorized-derived-option-inventory-requires-options"
      }, {
        ok: frame?.selectorRequired === (frame?.options?.length > 1 || frame?.analysisSelectionRequired === true) && frame?.selectionRequired === frame?.selectorRequired,
        diagnostic: "derivation-option-inventory-selector-state-invalid"
      }, {
        ok: frame?.options?.length === 1 && frame?.selectorRequired !== true ? frame.automaticOptionId === frame.options[0].optionId : frame?.automaticOptionId === "",
        diagnostic: "derivation-option-inventory-automatic-selection-invalid"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || frame?.sourceAnalysisFrame?.kind === "classical-nahuatl-vnc-derivation-source-analysis" && isAuthorizedGrammarContractCanonical(frame.sourceAnalysisFrame, "isClassicalNahuatlVncDerivationSourceAnalysisFrame"),
        diagnostic: "derivation-option-inventory-canonical-source-analysis-required"
      }, {
        ok: typeof frame?.sourceSignature === "string" && (frame.authorizationStatus !== "authorized" || Boolean(frame.sourceSignature)),
        diagnostic: "derivation-option-inventory-source-signature-required"
      }, {
        ok: typeof frame?.canonicalSignature === "string" && Boolean(frame.canonicalSignature),
        diagnostic: "derivation-option-inventory-canonical-signature-required"
      }, {
        ok: frame?.callerSuppliedTargetAllowed === false && frame?.formulaArtifactAuthority === false && frame?.surfaceArtifactAuthority === false,
        diagnostic: "derivation-option-inventory-string-authority-forbidden"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-vnc-derivation-operation-frame",
      version: 1,
      authorityRole: "typed-derivation-operation-authority",
      producer: "classical-vnc-derivation-evaluator",
      consumers: ["classical-vnc-application-boundary", "classical-vnc-derived-machinery-builder", "classical-verification"],
      description: "A source-bound operation that selects an engine-generated stem candidate and derives its participant transformation.",
      requiredCapabilities: ["classical-vnc-derivation-evaluator"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "derivation-operation-status-invalid"
      }, {
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlVncDerivationOperationFrame"),
        diagnostic: "authorized-derivation-operation-canonical-validator-required"
      }, {
        ok: ["direct", "causative", "applicative"].includes(frame?.derivationType),
        diagnostic: "derivation-operation-type-invalid"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || Boolean(frame?.selectedOptionId && frame?.selectedOption && frame?.targetStem && frame?.targetClass),
        diagnostic: "authorized-derivation-operation-requires-selected-option-and-target"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || frame?.participantTransformFrame?.authorizationStatus === "authorized" && Array.isArray(frame?.targetObjectRequests) && frame.targetObjectRequests.length >= 1 && frame.targetObjectRequests.length <= 3,
        diagnostic: "authorized-derivation-operation-requires-participant-transform"
      }, {
        ok: typeof frame?.sourceSignature === "string" && typeof frame?.canonicalSignature === "string" && (frame.authorizationStatus !== "authorized" || Boolean(frame.sourceSignature && frame.canonicalSignature)),
        diagnostic: "derivation-operation-signatures-required"
      }, {
        ok: frame?.callerSuppliedTargetAllowed === false && frame?.formulaArtifactAuthority === false && frame?.surfaceArtifactAuthority === false,
        diagnostic: "derivation-operation-external-string-authority-forbidden"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-vnc-derived-machinery-frame",
      version: 1,
      authorityRole: "typed-source-operation-target-machinery",
      producer: "classical-vnc-derivation-evaluator",
      consumers: ["classical-vnc-application-boundary", "classical-canvas-layer-finalizers", "classical-verification"],
      description: "The Lesson 7 and Lesson 23 target machinery produced from a validated typed source and derivation operation.",
      requiredCapabilities: ["classical-vnc-derivation-evaluator"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "derived-vnc-machinery-status-invalid"
      }, {
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlDerivedVncMachineryFrame"),
        diagnostic: "authorized-derived-vnc-machinery-canonical-validator-required"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || Boolean(frame?.sourceMachineryFrame && frame?.derivationOperationFrame && frame?.targetTypedVncSlotFrame && frame?.proofFrame),
        diagnostic: "authorized-derived-vnc-machinery-requires-source-operation-target"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || frame?.derivationOperationFrame?.targetStem === frame?.targetStem && frame?.derivationOperationFrame?.targetClass === frame?.targetClass,
        diagnostic: "derived-vnc-machinery-operation-target-continuity-required"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || Array.isArray(frame?.targetObjectRequests) && frame.targetObjectRequests.length >= 1 && frame.targetObjectRequests.length <= 3,
        diagnostic: "authorized-derived-vnc-machinery-target-objects-required"
      }, {
        ok: frame?.typedFrameAuthority === true && frame?.formulaArtifactAuthority === false && frame?.surfaceArtifactAuthority === false && frame?.callerSuppliedAuthorityAccepted === false,
        diagnostic: "derived-vnc-machinery-typed-authority-boundary-invalid"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || typeof frame?.canonicalSignature === "string" && Boolean(frame.canonicalSignature),
        diagnostic: "authorized-derived-vnc-machinery-canonical-signature-required"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-vnc-finite-surface-frame",
      version: 1,
      authorityRole: "typed-canvas-finite-word-finalizer",
      producer: "classical-lesson25-later-layers",
      consumers: ["classical-vnc-application-boundary", "classical-presentation", "classical-verification"],
      description: "The exact finite Classical word projected from canonical typed VNC machinery after the active Lessons 24-25 Canvas layer has finalized quantity, participant order, and boundary allomorphy.",
      requiredCapabilities: ["classical-vnc-derivation-evaluator"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "classical-vnc-finite-surface-status-invalid"
      }, {
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlVncFiniteSurfaceFrame"),
        diagnostic: "authorized-classical-vnc-finite-surface-canonical-validator-required"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || Boolean(frame?.machineryFrame && frame?.typedFrame && frame?.wordRealization && frame?.canonicalSignature),
        diagnostic: "authorized-classical-vnc-finite-surface-typed-source-and-word-required"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || Array.isArray(frame?.participantPositions) && Array.isArray(frame?.orderedParticipantRoles) && frame?.participantCount === frame.participantPositions.length,
        diagnostic: "authorized-classical-vnc-finite-surface-participant-projection-invalid"
      }, {
        ok: frame?.typedFrameAuthority === true && frame?.grammarAuthority === true && frame?.formulaStringAuthority === false && frame?.surfaceStringAuthority === false && frame?.callerSuppliedAuthorityAccepted === false && frame?.catalogTargetAuthority === false,
        diagnostic: "classical-vnc-finite-surface-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-derived-vnc-canvas-citation-projection-frame",
      version: 1,
      authorityRole: "typed-canvas-citation-history-projection",
      producer: "classical-lesson25-later-layers",
      consumers: ["classical-presentation", "classical-verification"],
      description: "A canonical Canvas citation and complete source-to-target history projected from typed source, operation, participant, and target machinery.",
      requiredCapabilities: ["classical-vnc-derivation-evaluator"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "lessons24-25-canvas-citation-projection-status-invalid"
      }, {
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlCanvasCitationProjectionFrame"),
        diagnostic: "authorized-lessons24-25-canvas-citation-projection-canonical-validator-required"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || Boolean(frame?.machineryFrame && frame?.typedFrame && frame?.citationRealization && frame?.relationRealization && frame?.canonicalSignature),
        diagnostic: "authorized-lessons24-25-canvas-citation-projection-history-required"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || Array.isArray(frame?.citationStages) && frame.citationStages.length >= 1 && Array.isArray(frame?.orderedParticipantRoles),
        diagnostic: "authorized-lessons24-25-canvas-citation-projection-stages-required"
      }, {
        ok: frame?.typedFrameAuthority === true && frame?.grammarAuthority === true && frame?.formulaStringAuthority === false && frame?.surfaceStringAuthority === false && frame?.callerSuppliedAuthorityAccepted === false && frame?.catalogTargetAuthority === false,
        diagnostic: "lessons24-25-canvas-citation-projection-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-derived-vnc-canvas-citation-projection-inventory",
      version: 1,
      authorityRole: "typed-canvas-causative-option-inventory",
      producer: "classical-lesson25-later-layers",
      consumers: ["classical-presentation", "classical-verification"],
      description: "All canonical causative citation projections independently enumerated from the source inventory and typed participant choices, without consulting an expected target.",
      requiredCapabilities: ["classical-vnc-derivation-evaluator"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "lessons24-25-canvas-citation-inventory-status-invalid"
      }, {
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlCanvasCitationProjectionInventory"),
        diagnostic: "authorized-lessons24-25-canvas-citation-inventory-canonical-validator-required"
      }, {
        ok: Array.isArray(frame?.options) && frame?.optionCount === frame.options.length,
        diagnostic: "lessons24-25-canvas-citation-inventory-options-invalid"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || Boolean(frame?.sourceMachineryFrame && frame?.derivationOptionInventory && frame?.canonicalSignature) && frame.options.length > 0,
        diagnostic: "authorized-lessons24-25-canvas-citation-inventory-source-and-options-required"
      }, {
        ok: frame?.typedFrameAuthority === true && frame?.formulaStringAuthority === false && frame?.surfaceStringAuthority === false && frame?.callerSuppliedAuthorityAccepted === false && frame?.catalogTargetAuthority === false,
        diagnostic: "lessons24-25-canvas-citation-inventory-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-derived-vnc-canvas-schematic-citation-possibility-inventory",
      version: 1,
      authorityRole: "typed-canvas-schematic-citation-possibility-inventory",
      producer: "classical-lesson25-later-layers",
      consumers: ["classical-verification"],
      description: "A signed machinery-light enumeration of Canvas causative citation relations from one canonical source inventory and four engine-owned participant profiles; expected catalog targets are never inputs.",
      requiredCapabilities: ["classical-vnc-derivation-evaluator"],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "lessons24-25-canvas-schematic-citation-inventory-status-invalid"
      }, {
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlCanvasSchematicCitationPossibilityInventory"),
        diagnostic: "authorized-lessons24-25-canvas-schematic-citation-inventory-canonical-validator-required"
      }, {
        ok: Array.isArray(frame?.possibilities) && frame?.possibilityCount === frame.possibilities.length,
        diagnostic: "lessons24-25-canvas-schematic-citation-inventory-possibilities-invalid"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || Boolean(frame?.sourceMachineryFrame && frame?.derivationOptionInventory && frame?.sourceProjectionFrame && frame?.canonicalSignature) && frame.possibilities.length > 0,
        diagnostic: "authorized-lessons24-25-canvas-schematic-citation-inventory-source-and-possibilities-required"
      }, {
        ok: frame?.typedFrameAuthority === true && frame?.formulaStringAuthority === false && frame?.surfaceStringAuthority === false && frame?.callerSuppliedAuthorityAccepted === false && frame?.catalogTargetAuthority === false,
        diagnostic: "lessons24-25-canvas-schematic-citation-inventory-authority-boundary-invalid"
      }])
    }), buildClassicalAuxiliaryGrammarContractDefinition({
      contractKind: "classical-nahuatl-nonactive-vnc-nonactive-printed-surface-operation-frame",
      authorityRole: "typed-later-surface-operation",
      producer: "classical-vnc-layer-evaluator",
      consumers: ["classical-canvas-layer-finalizers", "classical-verification"],
      description: "The Lesson 24.2 operation that projects a printed finite nonactive surface from an unchanged canonical Lesson 20 stem record.",
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "lesson24-2-nonactive-surface-operation-status-invalid"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || Boolean(frame?.inputCanonicalNonactiveStem && frame?.operation && frame?.quantityChange),
        diagnostic: "authorized-lesson24-2-nonactive-surface-operation-input-and-operation-required"
      }, {
        ok: frame?.analysisBoundariesRemainInLowerRecord === true && frame?.canonicalQuantityRemainsInLowerRecord === true && frame?.callerSuppliedSurfaceAllowed === false && frame?.surfaceStringAuthority === false,
        diagnostic: "lesson24-2-nonactive-surface-operation-authority-boundary-invalid"
      }])
    }), buildClassicalAuxiliaryGrammarContractDefinition({
      contractKind: "classical-nahuatl-nonactive-vnc-nonactive-printed-surface-frame",
      authorityRole: "typed-later-nonactive-surface-finalizer",
      producer: "classical-vnc-layer-evaluator",
      consumers: ["classical-canvas-layer-finalizers", "classical-presentation", "classical-verification"],
      description: "The exact Lesson 24.2 finite nonactive surface projected from a canonical lower Lesson 20 record without mutating its stem analysis.",
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "lesson24-2-nonactive-surface-status-invalid"
      }, {
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlNonactiveSurfaceFrame"),
        diagnostic: "authorized-lesson24-2-nonactive-surface-canonical-validator-required"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || Boolean(frame?.lowerNonactiveStemRecord && frame?.canonicalNonactiveStem && frame?.printedSurfaceWord && frame?.surfaceOperationFrame),
        diagnostic: "authorized-lesson24-2-nonactive-surface-history-required"
      }, {
        ok: frame?.lowerRecordMutated === false && frame?.canonicalStemRemainsAuthoritative === true && frame?.callerSuppliedSurfaceAllowed === false && frame?.targetStringAuthority === false && frame?.surfaceStringAuthority === false,
        diagnostic: "lesson24-2-nonactive-surface-authority-boundary-invalid"
      }])
    }), buildClassicalAuxiliaryGrammarContractDefinition({
      contractKind: "classical-nahuatl-specific-shuntline-specific-shuntline-realization-rule-frame",
      authorityRole: "typed-specific-object-shuntline-rule",
      producer: "classical-vnc-layer-evaluator",
      description: "The Lesson 25.3 silent-or-sounded realization rule for an eligible retained specific object on the shuntline.",
      validator: frame => buildGrammarContractValidationResult([{
        ok: frame?.section === "25.3" && ["silent", "sounded"].includes(frame?.selectedRealization),
        diagnostic: "lesson25-3-specific-shuntline-section-and-realization-invalid"
      }, {
        ok: Boolean(frame?.specificShuntlineObjectId && frame?.causativeMainlineObjectId),
        diagnostic: "lesson25-3-specific-shuntline-object-identities-required"
      }, {
        ok: frame?.silentIsGeneralPractice === true && frame?.soundedIsDocumentedWriterVariant === true && frame?.callerSuppliedCarrierAllowed === false,
        diagnostic: "lesson25-3-specific-shuntline-authority-boundary-invalid"
      }])
    }), buildClassicalAuxiliaryGrammarContractDefinition({
      contractKind: "classical-nahuatl-vnc-exact-nonactive-bridge-frame",
      authorityRole: "signed-exact-nonactive-bridge-evidence",
      producer: "classical-vnc-derivation-evaluator",
      description: "A signed Andrews exact nonactive bridge bound to one canonical typed source analysis and one causative option.",
      validator: frame => buildGrammarContractValidationResult([{
        ok: frame?.authorizationStatus === "authorized",
        diagnostic: "exact-nonactive-bridge-must-be-authorized"
      }, {
        ok: Boolean(frame?.sourceStem && frame?.sourceSignature && frame?.sourceClass && frame?.sourceValence && frame?.nonactiveStem && frame?.suffixFamily && frame?.ruleId && frame?.andrewsSection && frame?.canonicalSignature),
        diagnostic: "exact-nonactive-bridge-source-witness-and-signature-required"
      }, {
        ok: frame?.typedFrameAuthority === true && frame?.formulaArtifactAuthority === false && frame?.surfaceArtifactAuthority === false && frame?.callerSuppliedTargetAllowed === false,
        diagnostic: "exact-nonactive-bridge-authority-boundary-invalid"
      }])
    }), buildClassicalAuxiliaryGrammarContractDefinition({
      contractKind: "classical-nahuatl-retained-source-reflexive-shuntline-rule-frame",
      authorityRole: "typed-retained-reflexive-shuntline-rule",
      producer: "classical-vnc-derivation-evaluator",
      description: "The participant rule that moves a retained source reflexive from mainline person to nonfirst-common shuntline realization.",
      validator: frame => buildGrammarContractValidationResult([{
        ok: frame?.authorizationStatus === "authorized"
          && frame?.operation
            === "replace-retained-source-mainline-reflexive-person-with-nonfirst-common-shuntline",
        diagnostic: "retained-reflexive-shuntline-rule-status-and-operation-invalid"
      }, {
        ok: Array.isArray(frame?.sourceReflexiveObjectIds) && frame.sourceReflexiveObjectIds.length > 0 && new Set(frame.sourceReflexiveObjectIds).size === frame.sourceReflexiveObjectIds.length && frame?.targetObjectPerson === "nonfirst-common",
        diagnostic: "retained-reflexive-shuntline-rule-object-contract-invalid"
      }, {
        ok: frame?.typedParticipantAuthority === true && frame?.formulaStringAuthority === false && frame?.surfaceStringAuthority === false,
        diagnostic: "retained-reflexive-shuntline-rule-authority-boundary-invalid"
      }])
    }), buildClassicalAuxiliaryGrammarContractDefinition({
      contractKind: "classical-nahuatl-vnc-derivation-operation-batch-frame",
      authorityRole: "typed-source-bound-operation-batch",
      producer: "classical-vnc-derivation-evaluator",
      consumers: ["classical-lesson25-later-layers", "classical-verification"],
      description: "A canonical batch of derivation operations generated from one signed source and one canonical option inventory before evidence matching.",
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "derivation-operation-batch-status-invalid"
      }, {
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlVncDerivationOperationBatchFrame"),
        diagnostic: "authorized-derivation-operation-batch-canonical-validator-required"
      }, {
        ok: Array.isArray(frame?.operationRequests) && Array.isArray(frame?.operationFrames) && frame?.operationCount === frame.operationRequests.length && frame.operationCount === frame.operationFrames.length,
        diagnostic: "derivation-operation-batch-count-invalid"
      }, {
        ok: frame?.typedFrameAuthority === true && frame?.formulaArtifactAuthority === false && frame?.surfaceArtifactAuthority === false && frame?.callerSuppliedTargetAllowed === false,
        diagnostic: "derivation-operation-batch-authority-boundary-invalid"
      }])
    }), buildClassicalAuxiliaryGrammarContractDefinition({
      contractKind: "classical-nahuatl-derived-vnc-canvas-citation-stage-frame",
      authorityRole: "typed-canvas-citation-stage",
      producer: "classical-lesson25-later-layers",
      description: "One typed source, bridge, or target stage in a complete Lessons 24-25 Canvas citation history.",
      validator: frame => buildGrammarContractValidationResult([{
        ok: Boolean(frame?.stageRole && frame?.predicateStem && frame?.sourceAuthority && frame?.citationRealization),
        diagnostic: "canvas-citation-stage-role-predicate-authority-and-realization-required"
      }, {
        ok: Array.isArray(frame?.participantPositions) && Array.isArray(frame?.orderedParticipantRoles) && frame?.participantCount === frame.orderedParticipantRoles.length,
        diagnostic: "canvas-citation-stage-participant-projection-invalid"
      }, {
        ok: frame?.orderedParticipantRoles.every(role => Boolean(role?.objectId && role?.objectKind && role?.surface)),
        diagnostic: "canvas-citation-stage-ordered-role-invalid"
      }])
    }), buildClassicalAuxiliaryGrammarContractDefinition({
      contractKind: "classical-nahuatl-derived-vnc-canvas-citation-projection-option",
      authorityRole: "signed-canvas-citation-projection-option",
      producer: "classical-lesson25-later-layers",
      description: "One signed citation projection generated from a canonical derivation option, operation, participant profile, and target machinery.",
      validator: frame => buildGrammarContractValidationResult([{
        ok: Boolean(frame?.optionId && frame?.derivationOptionId && frame?.canonicalSignature && frame?.relationRealization),
        diagnostic: "canvas-citation-projection-option-identities-and-signature-required"
      }, {
        ok: isGrammarContractCanonicalFrame(frame?.operationFrame, "isClassicalNahuatlVncDerivationOperationFrame") && isGrammarContractCanonicalFrame(frame?.machineryFrame, "isClassicalNahuatlDerivedVncMachineryFrame") && isGrammarContractCanonicalFrame(frame?.projectionFrame, "isClassicalNahuatlCanvasCitationProjectionFrame"),
        diagnostic: "canvas-citation-projection-option-canonical-frames-required"
      }, {
        ok: frame?.formulaStringAuthority === false && frame?.surfaceStringAuthority === false && frame?.catalogTargetAuthority === false,
        diagnostic: "canvas-citation-projection-option-string-authority-forbidden"
      }])
    }), buildClassicalAuxiliaryGrammarContractDefinition({
      contractKind: "classical-nahuatl-derived-vnc-canvas-schematic-citation-possibility",
      authorityRole: "signed-canvas-schematic-citation-possibility",
      producer: "classical-lesson25-later-layers",
      description: "One signed machinery-light source-to-target citation relation generated before any expected Canvas target is queried.",
      validator: frame => buildGrammarContractValidationResult([{
        ok: Boolean(frame?.profile && frame?.derivationOptionId && frame?.derivationOptionSignature && frame?.operationFrame && frame?.canonicalSignature),
        diagnostic: "canvas-schematic-citation-possibility-profile-option-and-signature-required"
      }, {
        ok: isGrammarContractCanonicalFrame(frame?.operationFrame, "isClassicalNahuatlVncDerivationOperationFrame"),
        diagnostic: "canvas-schematic-citation-possibility-canonical-operation-required"
      }, {
        ok: Boolean(frame?.sourceCitationRealization && frame?.sourceHistoryRealization && frame?.citationRealization && frame?.relationRealization) && Array.isArray(frame?.participantPositions) && Array.isArray(frame?.orderedParticipantRoles) && frame?.participantCount === frame.orderedParticipantRoles.length,
        diagnostic: "canvas-schematic-citation-possibility-history-and-participants-required"
      }, {
        ok: frame?.typedFrameAuthority === true && frame?.formulaStringAuthority === false && frame?.surfaceStringAuthority === false && frame?.callerSuppliedAuthorityAccepted === false && frame?.catalogTargetAuthority === false,
        diagnostic: "canvas-schematic-citation-possibility-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-canonical-source-stem-record",
      version: 1,
      authorityRole: "non-authorizing-canonical-source-selection-record",
      producer: "classical-source-stem-inventory",
      consumers: ["classical-source-ui", "classical-verification"],
      description: "One exact lexical VNC verbstem or NNC nounstem citation for Source selection without formula or grammar authority.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["vnc", "nnc"].includes(frame?.basalUnit) && typeof frame?.stem === "string" && Boolean(frame.stem) && typeof frame?.citation === "string" && Boolean(frame.citation),
        diagnostic: "canonical-source-stem-record-basal-unit-stem-and-citation-required"
      }, {
        ok: frame?.selectionAuthority === "source-only" && frame?.grammarAuthority === false && frame?.formulaStringAuthority === false,
        diagnostic: "canonical-source-stem-record-authority-boundary-invalid"
      }, {
        ok: !/[#>+=□]/u.test(String(frame?.citation || "")),
        diagnostic: "canonical-source-stem-record-formula-shaped-citation-forbidden"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-canonical-source-stem-inventory-audit",
      version: 1,
      authorityRole: "non-authorizing-source-inventory-audit",
      producer: "classical-source-stem-inventory",
      consumers: ["classical-verification"],
      description: "A structural audit of the canonical Source picker inventory, including duplicate and root-quantity conflict checks.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: Number.isInteger(frame?.recordCount) && Number.isInteger(frame?.vncCount) && Number.isInteger(frame?.nncCount) && frame.recordCount === frame.vncCount + frame.nncCount,
        diagnostic: "canonical-source-stem-inventory-audit-counts-invalid"
      }, {
        ok: frame?.invalidRecordCount === 0 && frame?.duplicateCount === 0,
        diagnostic: "canonical-source-stem-inventory-audit-record-failure-present"
      }, {
        ok: frame?.quantityConflictPresent === false && frame?.canonicalQuantityPresent === true && frame?.ok === true,
        diagnostic: "canonical-source-stem-inventory-audit-quantity-adjudication-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-place-gentilic-nnc-frame",
      version: 1,
      authorityRole: "canonical-place-gentilic-generation-result",
      producer: "place-gentilic-nnc",
      consumers: ["classical-presentation", "classical-verification"],
      description: "One typed place-name, gentilic, collectivity, profession, title, or incorporation result.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "place-gentilic-result-status-invalid"
      }, {
        ok: frame?.typedFrameAuthority === true && frame?.formulaStringAuthority === false && frame?.surfaceStringAuthority === false && frame?.lessonMetadataAuthority === false,
        diagnostic: "place-gentilic-result-authority-boundary-invalid"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || Boolean(frame?.sourceAnalysis && frame?.formationFrame && frame?.finiteFrame && frame?.formulaRealization && frame?.wordSurface),
        diagnostic: "authorized-place-gentilic-result-typed-path-required"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-place-gentilic-paradigm-plan",
      version: 1,
      authorityRole: "prepared-place-gentilic-paradigm-plan",
      producer: "place-gentilic-nnc",
      consumers: ["classical-presentation", "classical-verification"],
      description: "A prepared typed plan for scalar-equal place/gentilic NNC coordinates.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: Array.isArray(frame?.coordinates) && frame?.coordinateCount === frame.coordinates.length,
        diagnostic: "place-gentilic-paradigm-plan-coordinates-invalid"
      }, {
        ok: frame?.formulaStringAuthority === false && frame?.surfaceStringAuthority === false,
        diagnostic: "place-gentilic-paradigm-plan-authority-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-place-gentilic-paradigm-coordinate-frame",
      version: 1,
      authorityRole: "projected-place-gentilic-paradigm-coordinate",
      producer: "place-gentilic-nnc",
      consumers: ["classical-presentation", "classical-verification"],
      description: "One scalar-equal coordinate projected from a prepared place/gentilic plan.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: Boolean(frame?.coordinateId) && ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "place-gentilic-coordinate-identity-or-status-invalid"
      }, {
        ok: frame?.typedFrameAuthority === true && frame?.formulaStringAuthority === false && frame?.surfaceStringAuthority === false,
        diagnostic: "place-gentilic-coordinate-authority-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-place-gentilic-ui-projection",
      version: 1,
      authorityRole: "read-only-place-gentilic-presentation-projection",
      producer: "place-gentilic-nnc",
      consumers: ["classical-presentation", "classical-verification"],
      description: "A read-only projection of typed place/gentilic grammar and result facts.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: frame?.grammarAuthority === false && frame?.formulaStringAuthority === false && frame?.surfaceStringAuthority === false,
        diagnostic: "place-gentilic-ui-projection-authority-invalid"
      }])
    }), Object.freeze({
      contractKind:
        "classical-nahuatl-nominal-construction-source-authorization-frame",
      version: 1,
      authorityRole:
        "owner-issued-nominal-construction-source-authorization",
      producer: "classical-nominal-construction",
      consumers: [
        "classical-grammar-application",
        "classical-presentation",
        "classical-verification",
      ],
      description:
        "The owner-issued typed source authorization consumed by nominal construction.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: isAuthorizedGrammarContractCanonical(
          frame,
          "isClassicalNahuatlNominalConstructionSourceAuthorization"
        ),
        diagnostic:
          "nominal-construction-source-owner-issued-frame-required"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-nominal-construction-result-frame",
      version: 1,
      authorityRole:
        "owner-issued-nominal-embed-compound-affective-cardinal-result",
      producer: "classical-nominal-construction",
      consumers: ["classical-presentation", "classical-verification"],
      description:
        "A typed nominal construction projected through its canonical NNC or VNC evaluator.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: isAuthorizedGrammarContractCanonical(
          frame,
          "isClassicalNahuatlNominalConstructionResult"
        ),
        diagnostic:
          "nominal-construction-result-owner-issued-frame-required"
      }, {
        ok: ["nominal-embed-vnc", "compound-nnc", "affective-nnc", "cardinal-numeral-nnc"].includes(frame?.constructionKind)
          && ["authorized", "blocked"].includes(frame?.authorizationStatus)
          && frame?.lessonMetadataAuthorizesOutput === false,
        diagnostic: "nominal-construction-kind-or-status-invalid"
      }, {
        ok: frame?.authorizationStatus !== "authorized" || Boolean(frame?.sourceFrame && frame?.operationFrame && frame?.canonicalResult && frame?.canonicalTargetEvaluator),
        diagnostic: "authorized-nominal-construction-typed-path-required"
      }, {
        ok: frame?.typedFrameAuthority === true && frame?.callerSuppliedAuthorityAccepted === false && frame?.formulaStringAuthority === false && frame?.surfaceStringAuthority === false,
        diagnostic: "nominal-construction-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-nominal-construction-paradigm-plan",
      version: 1,
      authorityRole:
        "owner-issued-scalar-equivalent-nominal-construction-paradigm-plan",
      producer: "classical-nominal-construction",
      consumers: ["classical-presentation", "classical-verification"],
      description:
        "A source-bound coordinate plan whose cells use the same nominal-construction scalar evaluator.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: isAuthorizedGrammarContractCanonical(
          frame,
          "isClassicalNahuatlNominalConstructionParadigmPlan"
        ),
        diagnostic:
          "nominal-construction-paradigm-plan-owner-issued-frame-required"
      }, {
        ok: frame?.authorizationStatus === "authorized"
          && ["nominal-embed-vnc", "compound-nnc", "affective-nnc", "cardinal-numeral-nnc"].includes(frame?.constructionKind)
          && frame?.lessonMetadataAuthorizesOutput === false,
        diagnostic: "nominal-construction-paradigm-plan-status-or-construction-invalid"
      }, {
        ok: Array.isArray(frame?.coordinates) && frame?.coordinateCount === frame.coordinates.length && frame.coordinateCount > 0,
        diagnostic: "nominal-construction-paradigm-plan-coordinate-count-invalid"
      }, {
        ok: frame?.scalarEvaluatorIdentity === "evaluateClassicalNahuatlNominalConstruction" && frame?.callerSuppliedCoordinateAuthorityAccepted === false && frame?.formulaStringAuthority === false && frame?.surfaceStringAuthority === false,
        diagnostic: "nominal-construction-paradigm-plan-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind:
        "classical-nahuatl-nominal-construction-paradigm-coordinate-frame",
      version: 1,
      authorityRole:
        "owner-issued-nominal-construction-paradigm-coordinate",
      producer: "classical-nominal-construction",
      consumers: ["classical-presentation", "classical-verification"],
      description:
        "A pointwise coordinate issued by the nominal-construction scalar evaluator.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: isAuthorizedGrammarContractCanonical(
          frame,
          "isClassicalNahuatlNominalConstructionParadigmCoordinate"
        ),
        diagnostic:
          "nominal-construction-coordinate-owner-issued-frame-required"
      }])
    }), Object.freeze({
      contractKind:
        "classical-nahuatl-nominal-construction-ui-projection",
      version: 1,
      authorityRole:
        "read-only-owner-issued-nominal-construction-ui-projection",
      producer: "classical-nominal-construction",
      consumers: ["classical-presentation", "classical-verification"],
      description:
        "A read-only projection of one owner-issued nominal-construction result.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: isAuthorizedGrammarContractCanonical(
          frame,
          "isClassicalNahuatlNominalConstructionUiProjection"
        ),
        diagnostic:
          "nominal-construction-ui-owner-issued-projection-required"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-deverbal-nnc-grammar-frame",
      version: 1,
      authorityRole: "typed-lessons35-39-nominalization-and-patientive-result",
      producer: "classical-lessons35-39-closure",
      consumers: ["classical-presentation", "classical-verification"],
      description: "A typed Lessons 35-39 nominalization, deverbal, patientive, ownerhood, continuation, or vocative result projected through one canonical target evaluator.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: [
          "predicate-nominalization",
          "deverbal-action",
          "patientive",
          "ownerhood",
          "nominal-continuation",
          "verbal-continuation",
          "vocative",
          "double-nucleus-ownerhood"
        ].includes(frame?.constructionKind)
          && ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "lessons35-39-construction-kind-or-status-invalid"
      }, {
        ok: frame?.greatestCommonDivisor?.satisfied === true
          && frame?.leastCommonMultiple?.licensedAxisSetComplete === true
          && frame?.leastCommonMultiple?.axisCount === 29
          && frame?.leastCommonMultiple?.selectedAxisIds?.join("|")
            === frame?.leastCommonMultiple?.axisIds?.join("|"),
        diagnostic: "lessons35-39-gcd-or-lcm-incomplete"
      }, {
        ok: frame?.authorizationStatus !== "authorized"
          || Boolean(frame?.sourceFrame && frame?.operationFrame && frame?.canonicalTargetEvaluator),
        diagnostic: "authorized-lessons35-39-typed-path-required"
      }, {
        ok: frame?.typedFrameAuthority === true
          && frame?.callerSuppliedAuthorityAccepted === false
          && frame?.lessonMetadataAuthorizesOutput === false
          && frame?.formulaStringAuthority === false
          && frame?.surfaceStringAuthority === false,
        diagnostic: "lessons35-39-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-deverbal-nnc-paradigm-plan",
      version: 1,
      authorityRole: "scalar-equivalent-lessons35-39-paradigm-plan",
      producer: "classical-lessons35-39-closure",
      consumers: ["classical-presentation", "classical-verification"],
      description: "A source-bound Lessons 35-39 plan whose coordinates are rebuilt by the scalar grammar evaluator.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: frame?.authorizationStatus === "authorized"
          && Array.isArray(frame?.coordinates)
          && frame?.coordinateCount === frame.coordinates.length
          && frame.coordinateCount > 0,
        diagnostic: "lessons35-39-paradigm-plan-coordinates-invalid"
      }, {
        ok: frame?.greatestCommonDivisor?.satisfied === true
          && frame?.leastCommonMultiple?.licensedAxisSetComplete === true
          && frame?.leastCommonMultiple?.axisCount === 29,
        diagnostic: "lessons35-39-paradigm-gcd-or-lcm-incomplete"
      }, {
        ok: frame?.scalarEvaluatorIdentity === "evaluateClassicalNahuatlDeverbalNnc"
          && frame?.callerSuppliedCoordinateAuthorityAccepted === false
          && frame?.lessonMetadataAuthorizesOutput === false
          && frame?.formulaStringAuthority === false
          && frame?.surfaceStringAuthority === false,
        diagnostic: "lessons35-39-paradigm-plan-authority-boundary-invalid"
      }])
    }), buildClassicalAuxiliaryGrammarContractDefinition({
      contractKind: "classical-nahuatl-adverbial-potential-frame",
      authorityRole: "owner-issued-adverbial-potential-source",
      producer: "classical-adverbial-nuclear-grammar",
      consumers: ["classical-grammar-application", "classical-verification"],
      description: "A lexical Source receipt issued by the Lesson 44 adverbial-potential owner; copies and documentary records are not Sources.",
      validator: frame => buildGrammarContractValidationResult([{
        ok: isAuthorizedGrammarContractCanonical(
          frame,
          "isClassicalNahuatlAdverbialPotentialFrame"
        ),
        diagnostic: "lesson44-adverbial-potential-owner-issued-frame-required"
      }])
    }), buildClassicalAuxiliaryGrammarContractDefinition({
      contractKind: "classical-nahuatl-adverbial-nuclear-result",
      authorityRole: "owner-issued-adverbial-nuclear-result",
      producer: "classical-adverbial-nuclear-grammar",
      consumers: ["classical-grammar-application", "classical-presentation", "classical-verification"],
      description: "The canonical Lesson 44 Result with formula and written projections generated independently from one typed result.",
      validator: frame => buildGrammarContractValidationResult([{
        ok: isAuthorizedGrammarContractCanonical(
          frame,
          "isClassicalNahuatlAdverbialNuclearResult"
        ),
        diagnostic: "lesson44-adverbial-nuclear-owner-issued-result-required"
      }, {
        ok: frame?.formulaStringAuthority === false
          && frame?.surfaceStringAuthority === false
          && frame?.callerSuppliedAuthorityAccepted === false,
        diagnostic: "lesson44-adverbial-nuclear-external-authority-forbidden"
      }])
    }), buildClassicalAuxiliaryGrammarContractDefinition({
      contractKind: "classical-nahuatl-adverbial-nuclear-batch-plan",
      authorityRole: "owner-issued-adverbial-scalar-plan",
      producer: "classical-adverbial-nuclear-grammar",
      consumers: ["classical-grammar-application", "classical-presentation", "classical-verification"],
      description: "A source-bound Lesson 44 plan whose coordinates are evaluated by the scalar owner.",
      validator: frame => buildGrammarContractValidationResult([{
        ok: isAuthorizedGrammarContractCanonical(
          frame,
          "isClassicalNahuatlAdverbialNuclearBatchPlan"
        ),
        diagnostic: "lesson44-adverbial-batch-owner-issued-plan-required"
      }, {
        ok: frame?.scalarEvaluatorIdentity
          === "evaluateClassicalNahuatlAdverbialNuclear"
          && frame?.callerSuppliedCoordinateAuthorityAccepted === false
          && frame?.formulaStringAuthority === false
          && frame?.surfaceStringAuthority === false,
        diagnostic: "lesson44-adverbial-batch-plan-authority-invalid"
      }])
    }), buildClassicalAuxiliaryGrammarContractDefinition({
      contractKind: "classical-nahuatl-adverbial-nuclear-batch-coordinate",
      authorityRole: "owner-issued-adverbial-scalar-coordinate",
      producer: "classical-adverbial-nuclear-grammar",
      consumers: ["classical-grammar-application", "classical-presentation", "classical-verification"],
      description: "A Lesson 44 coordinate projected pointwise through the same scalar evaluator.",
      validator: frame => buildGrammarContractValidationResult([{
        ok: isAuthorizedGrammarContractCanonical(
          frame,
          "isClassicalNahuatlAdverbialNuclearBatchCoordinate"
        ),
        diagnostic: "lesson44-adverbial-batch-owner-issued-coordinate-required"
      }, {
        ok: frame?.scalarEquivalent === true
          && frame?.formulaStringAuthority === false
          && frame?.surfaceStringAuthority === false,
        diagnostic: "lesson44-adverbial-batch-coordinate-authority-invalid"
      }])
    }), buildClassicalAuxiliaryGrammarContractDefinition({
      contractKind: "classical-nahuatl-adverbialized-subject-operation-frame",
      authorityRole: "owner-issued-adverbial-subject-operation",
      producer: "classical-adverbial-nuclear-grammar",
      consumers: ["classical-adverbial-nuclear-grammar", "classical-verification"],
      description: "The owner-issued Lesson 44 subject-preservation, silencing, or incorporation operation.",
      validator: frame => buildGrammarContractValidationResult([{
        ok: isAuthorizedGrammarContractCanonical(
          frame,
          "isClassicalNahuatlAdverbializedSubjectOperationFrame"
        ),
        diagnostic: "lesson44-adverbial-subject-operation-owner-required"
      }])
    }), buildClassicalAuxiliaryGrammarContractDefinition({
      contractKind: "classical-nahuatl-adverbial-context-frame",
      authorityRole: "owner-issued-adverbial-context",
      producer: "classical-adverbial-nuclear-grammar",
      consumers: ["classical-adverbial-nuclear-grammar", "classical-verification"],
      description: "An owner-issued contextual realization frame for a licensed external Lesson 44 adverbial.",
      validator: frame => buildGrammarContractValidationResult([{
        ok: isAuthorizedGrammarContractCanonical(
          frame,
          "isClassicalNahuatlAdverbialContextFrame"
        ),
        diagnostic: "lesson44-adverbial-context-owner-required"
      }])
    }), buildClassicalAuxiliaryGrammarContractDefinition({
      contractKind: "classical-nahuatl-adverbial-nuclear-operation-frame",
      authorityRole: "owner-issued-adverbial-operation",
      producer: "classical-adverbial-nuclear-grammar",
      consumers: ["classical-grammar-application", "classical-verification"],
      description: "The owner-issued Lesson 44 operation over one typed potential and its contextual boundary.",
      validator: frame => buildGrammarContractValidationResult([{
        ok: isAuthorizedGrammarContractCanonical(
          frame,
          "isClassicalNahuatlAdverbialNuclearOperationFrame"
        ),
        diagnostic: "lesson44-adverbial-operation-owner-required"
      }])
    }), buildClassicalAuxiliaryGrammarContractDefinition({
      contractKind: "classical-nahuatl-adverbial-nuclear-lcm",
      authorityRole: "read-only-lesson44-distinction-inventory",
      producer: "classical-adverbial-nuclear-grammar",
      consumers: ["classical-verification"],
      description: "The owner-issued read-only distinction inventory; it never authorizes generation.",
      validator: frame => buildGrammarContractValidationResult([{
        ok: isGrammarContractCanonicalFrame(
          frame,
          "isClassicalNahuatlLcm"
        ),
        diagnostic: "lesson44-lcm-owner-issued-inventory-required"
      }, {
        ok: frame?.lessonMetadataAuthorizesOutput === false
          && frame?.formulaStringAuthority === false
          && frame?.surfaceStringAuthority === false,
        diagnostic: "lesson44-lcm-generation-authority-forbidden"
      }])
    }), buildClassicalAuxiliaryGrammarContractDefinition({
      contractKind: "classical-nahuatl-relational-nnc-predicate-source-frame",
      authorityRole: "one-nnc-nounstem-source",
      producer: "classical-relational-nnc-grammar",
      consumers: ["classical-relational-nnc-grammar", "classical-verification"],
      description: "One normalized nounstem request for an NNC predicate; relational class, embed, matrix, and connective remain internal analysis.",
      validator: frame => buildGrammarContractValidationResult([{
        ok: frame?.oneNncPredicate === true
          && frame?.sourceCategory === "nounstem"
          && frame?.lexicalClass === "relational"
          && Boolean(frame?.stemId && frame?.formation && frame?.operation)
          && frame?.callerSuppliedAuthority === false
          && frame?.internalAnalysis
          && typeof frame.internalAnalysis === "object",
        diagnostic: "relational-nnc-predicate-source-frame-invalid"
      }])
    }), buildClassicalAuxiliaryGrammarContractDefinition({
      contractKind: "classical-nahuatl-relational-nnc-predicate-stem-frame",
      authorityRole: "one-canonical-nounstem-predicate",
      producer: "classical-relational-nnc-grammar",
      consumers: ["classical-generation-engine", "classical-presentation", "classical-verification"],
      description: "The one canonical nounstem predicate, with relational class and role-sensitive construction retained only as internal analysis.",
      validator: frame => buildGrammarContractValidationResult([{
        ok: frame?.oneNncPredicate === true
          && frame?.sourceCategory === "nounstem"
          && frame?.lexicalClass === "relational"
          && Boolean(frame?.predicateStem && frame?.formation && frame?.operation)
          && frame?.typedPredicateAuthority === true
          && frame?.callerSuppliedAuthority === false
          && frame?.formulaStringAuthority === false
          && frame?.surfaceStringAuthority === false,
        diagnostic: "relational-nnc-predicate-stem-frame-invalid"
      }])
    }), buildClassicalAuxiliaryGrammarContractDefinition({
      contractKind: "classical-nahuatl-relational-nnc-relational-source-frame",
      authorityRole: "typed-relational-nnc-source",
      producer: "classical-relational-nnc-grammar",
      consumers: ["classical-relational-nnc-grammar", "classical-verification"],
      description: "A normalized Lessons 45-47 relational source whose stem, option, source kind, state, and participants are typed before realization.",
      validator: frame => buildGrammarContractValidationResult([{
        ok: frame?.typedSourceAuthority === true
          && Boolean(frame?.stemId && frame?.option && frame?.constructionKind)
          && frame?.predicateStemFrame?.kind === "classical-nahuatl-relational-nnc-predicate-source-frame"
          && frame.predicateStemFrame.oneNncPredicate === true
          && frame?.formulaStringAuthority === false
          && frame?.surfaceStringAuthority === false
          && frame?.lessonMetadataAuthority === false,
        diagnostic: "lessons45-47-relational-source-frame-invalid"
      }])
    }), buildClassicalAuxiliaryGrammarContractDefinition({
      contractKind: "classical-nahuatl-relational-nnc-relational-operation-frame",
      authorityRole: "typed-relational-nnc-operation",
      producer: "classical-relational-nnc-grammar",
      consumers: ["classical-relational-nnc-grammar", "classical-generation-engine", "classical-verification"],
      description: "A selected Lessons 45-47 relational operation and its conditioned boundary realization over one typed source frame.",
      validator: frame => buildGrammarContractValidationResult([{
        ok: frame?.typedOperationAuthority === true
          && Boolean(frame?.operationId && frame?.sourceFrame && frame?.formulaAndSurface)
          && frame?.formulaStringAuthority === false
          && frame?.surfaceStringAuthority === false
          && frame?.lessonMetadataAuthority === false,
        diagnostic: "lessons45-47-relational-operation-frame-invalid"
      }])
    }), buildClassicalAuxiliaryGrammarContractDefinition({
      contractKind: "classical-nahuatl-relational-nnc-grammar-frame",
      authorityRole: "typed-lessons45-47-relational-gcd-lcm",
      producer: "classical-relational-nnc-grammar",
      consumers: ["classical-generation-engine", "classical-presentation", "classical-verification"],
      description: "The canonical relational-NNC invariant and complete licensed distinction space shared by Lessons 45-47.",
      validator: frame => buildGrammarContractValidationResult([{
        ok: isAuthorizedGrammarContractCanonical(frame, "isClassicalNahuatlRelationalNncGrammarFrame"),
        diagnostic: "lessons45-47-grammar-frame-canonical-validator-required"
      }, {
        ok: frame?.greatestCommonDivisor?.satisfied === true,
        diagnostic: "lessons45-47-gcd-must-be-satisfied"
      }, {
        ok: frame?.leastCommonMultiple?.licensedAxisSetComplete === true
          && frame?.leastCommonMultiple?.axisCount === 55
          && Array.isArray(frame?.leastCommonMultiple?.selectedAxisIds),
        diagnostic: "lessons45-47-lcm-must-be-complete"
      }, {
        ok: frame?.typedGrammarAuthority === true
          && frame?.callerSuppliedCoordinateAuthority === false
          && frame?.lessonMetadataAuthority === false
          && frame?.formulaStringAuthority === false
          && frame?.surfaceStringAuthority === false,
        diagnostic: "lessons45-47-grammar-frame-external-authority-forbidden"
      }])
    }), buildClassicalAuxiliaryGrammarContractDefinition({
      contractKind: "classical-nahuatl-relational-nnc-relational-result",
      authorityRole: "typed-relational-nnc-result",
      producer: "classical-relational-nnc-grammar",
      consumers: ["classical-generation-engine", "classical-presentation", "classical-verification"],
      description: "A typed Lessons 45-47 relational NNC generated by the canonical relational operation.",
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus),
        diagnostic: "lessons45-47-result-status-invalid"
      }, {
        ok: frame?.authorizationStatus !== "authorized"
          || Boolean(frame?.sourceFrame && frame?.operationFrame && frame?.grammarFrame && frame?.surface && frame?.formula),
        diagnostic: "authorized-lessons45-47-result-typed-path-required"
      }, {
        ok: frame?.typedGrammarAuthority !== false
          && frame?.callerSuppliedAuthorityAccepted === false
          && frame?.lessonMetadataAuthority === false
          && frame?.formulaStringAuthority === false
          && frame?.surfaceStringAuthority === false,
        diagnostic: "lessons45-47-result-authority-boundary-invalid"
      }])
    }), buildClassicalAuxiliaryGrammarContractDefinition({
      contractKind: "classical-nahuatl-relational-nnc-prepared-plan",
      authorityRole: "scalar-equivalent-relational-nnc-prepared-plan",
      producer: "classical-relational-nnc-grammar",
      consumers: ["classical-generation-engine", "classical-verification"],
      description: "A source-bound relational plan whose coordinates are rebuilt by the scalar Lessons 45-47 evaluator.",
      validator: frame => buildGrammarContractValidationResult([{
        ok: isAuthorizedGrammarContractCanonical(
          frame,
          "isClassicalNahuatlPreparedPlan"
        ),
        diagnostic: "lessons45-47-prepared-plan-canonical-validator-required"
      }, {
        ok: frame?.authorizationStatus === "authorized"
          && Array.isArray(frame?.coordinates)
          && frame?.coordinateCount === frame.coordinates.length
          && frame.coordinateCount > 0,
        diagnostic: "lessons45-47-prepared-plan-coordinates-invalid"
      }, {
        ok: frame?.scalarEvaluatorIdentity === "evaluateClassicalNahuatlRelationalNnc"
          && frame?.callerSuppliedCoordinateAuthorityAccepted === false
          && frame?.lessonMetadataAuthority === false
          && frame?.formulaStringAuthority === false
          && frame?.surfaceStringAuthority === false,
        diagnostic: "lessons45-47-prepared-plan-authority-boundary-invalid"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-comparison-source-unit",
      version: 2,
      authorityRole: "typed-comparison-source-only-unit",
      producer: "classical-comparison",
      consumers: ["classical-comparison", "classical-presentation", "classical-verification"],
      description: "An engine-issued source unit whose content may be composed but cannot select a comparison route or result.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus)
          && typeof frame?.unitKind === "string"
          && frame?.sourceAuthority === true,
        diagnostic: "comparison-source-unit-status-kind-or-source-authority-invalid"
      }, {
        ok: frame?.grammarAuthority === false
          && frame?.routeAuthority === false
          && frame?.resultAuthority === false,
        diagnostic: "comparison-source-unit-external-authority-forbidden"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-clause-composition-grammar-contract",
      version: 1,
      authorityRole: "typed-clause-composition-common-identity-and-complete-distinction-space",
      producer: "classical-clause-composition",
      consumers: ["classical-clause-composition", "classical-presentation", "classical-verification"],
      description:
        "One signed typed-clause GCD and the complete complementation plus conjunction distinction space.",
      requiredCapabilities: [
        "buildClassicalNahuatlClauseCompositionSourceFrame",
        "evaluateClassicalNahuatlClauseComplementation",
        "evaluateClassicalNahuatlClauseConjunction"
      ],
      validator: frame => buildGrammarContractValidationResult([{
        ok: typeof targetObject.isClassicalNahuatlClauseCompositionGrammarContract === "function"
          && targetObject.isClassicalNahuatlClauseCompositionGrammarContract(frame)
          && frame?.authorizationStatus === "authorized"
          && frame?.greatestCommonDivisor?.identityId
            === "typed-clause-source-semantic-relation-reference-graph-surface-result"
          && frame?.greatestCommonDivisor?.stageOrder?.join("|")
            === "typed-clause-source|licensed-semantic-relation|rank-and-reference-graph|ordered-clause-realization|sentence-result",
        diagnostic: "clause-composition-gcd-invalid"
      }, {
        ok: frame?.leastCommonMultiple?.distinctionAxisCount === 56
          && frame?.leastCommonMultiple?.distinctionAxes?.length === 56
          && frame?.leastCommonMultiple
            ?.semanticOwnerAxisCounts?.["clause-complementation"] === 21
          && frame?.leastCommonMultiple
            ?.semanticOwnerAxisCounts?.["clause-conjunction"] === 35
          && new Set(frame.leastCommonMultiple.distinctionAxes.map(axis => axis.axisId)).size === 56
          && frame.leastCommonMultiple.distinctionAxes.every(axis => (
            [
              "clause-complementation",
              "clause-conjunction",
            ].includes(axis.semanticOwner)
            && Array.isArray(axis.licensedValues)
            && axis.licensedValues.length > 0
            && axis.canonicalExecutorIds?.length === 1
          )),
        diagnostic: "clause-composition-lcm-incomplete"
      }, {
        ok: frame?.greatestCommonDivisor?.curriculumOrderAuthority === false
          && frame?.greatestCommonDivisor?.storedExampleAuthority === false
          && frame?.greatestCommonDivisor?.formulaStringAuthority === false
          && frame?.greatestCommonDivisor?.surfaceStringAuthority === false
          && frame?.lessonMetadataAuthority === false
          && frame?.formulaStringAuthority === false
          && frame?.surfaceStringAuthority === false,
        diagnostic: "clause-composition-external-authority-forbidden"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-comparison-operation-frame",
      version: 2,
      authorityRole: "typed-comparison-semantic-operation",
      producer: "classical-comparison",
      consumers: ["classical-comparison", "classical-verification"],
      description: "One licensed semantic comparison route derived from engine-issued source units and genuine choices.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus)
          && frame?.gcdId === "typed-comparison-source-route-ast-result"
          && typeof frame?.routeId === "string",
        diagnostic: "comparison-operation-status-gcd-or-route-invalid"
      }, {
        ok: frame?.typedFrameAuthority === true
          && frame?.lessonMetadataAuthority === false
          && frame?.evidenceAuthority === false
          && frame?.formulaStringAuthority === false
          && frame?.surfaceStringAuthority === false
          && frame?.callerSuppliedAuthorityAccepted === false,
        diagnostic: "comparison-operation-external-authority-forbidden"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-comparison-ast",
      version: 2,
      authorityRole: "typed-comparison-clause-structure",
      producer: "classical-comparison",
      consumers: ["classical-comparison", "classical-presentation", "classical-verification"],
      description: "A comparison AST built only from an authorized typed comparison operation.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus)
          && frame?.gcdId === "typed-comparison-source-route-ast-result"
          && Array.isArray(frame?.nodes),
        diagnostic: "comparison-ast-status-gcd-or-nodes-invalid"
      }, {
        ok: frame?.lessonMetadataAuthority === false
          && frame?.formulaStringAuthority === false
          && frame?.surfaceStringAuthority === false,
        diagnostic: "comparison-ast-external-authority-forbidden"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-comparison-result-frame",
      version: 2,
      authorityRole: "canonical-comparison-selected-result",
      producer: "classical-comparison",
      consumers: ["classical-presentation", "classical-verification"],
      description: "The canonical surface, formula, and selected Result produced by the typed comparison AST.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus)
          && frame?.gcdId === "typed-comparison-source-route-ast-result"
          && (frame?.authorizationStatus !== "authorized"
            || Boolean(frame?.operationFrame && frame?.astFrame && frame?.surface && frame?.selectedResult === frame?.surface)),
        diagnostic: "comparison-result-status-gcd-or-selected-result-invalid"
      }, {
        ok: frame?.typedFrameAuthority === true
          && frame?.lessonMetadataAuthority === false
          && frame?.evidenceAuthority === false
          && frame?.formulaStringAuthority === false
          && frame?.surfaceStringAuthority === false
          && frame?.callerSuppliedAuthorityAccepted === false,
        diagnostic: "comparison-result-external-authority-forbidden"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-comparison-batch-result",
      version: 2,
      authorityRole: "scalar-equivalent-comparison-batch",
      producer: "classical-comparison",
      consumers: ["classical-presentation", "classical-verification"],
      description: "A pointwise scalar-equivalent batch of typed comparison results.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: ["authorized", "blocked"].includes(frame?.authorizationStatus)
          && frame?.gcdId === "typed-comparison-source-route-ast-result"
          && Array.isArray(frame?.results)
          && frame?.resultCount === frame.results.length
          && frame?.requestCount === frame.resultCount
          && frame?.pointwiseScalarEquality === true,
        diagnostic: "comparison-batch-status-count-or-scalar-parity-invalid"
      }, {
        ok: frame?.lessonMetadataAuthority === false
          && frame?.formulaStringAuthority === false
          && frame?.surfaceStringAuthority === false,
        diagnostic: "comparison-batch-external-authority-forbidden"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-comparison-gcd-frame",
      version: 2,
      authorityRole: "comparison-greatest-common-divisor",
      producer: "classical-comparison",
      consumers: ["classical-presentation", "classical-verification"],
      description: "The one ordered typed source, semantic route, operation, AST, and canonical result invariant.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: frame?.gcdId === "typed-comparison-source-route-ast-result"
          && Array.isArray(frame?.orderedStages)
          && frame.orderedStages.join("|") === "typed-source|licensed-route|typed-operation|comparison-ast|canonical-result"
          && frame?.batchEqualsScalar === true,
        diagnostic: "comparison-gcd-identity-order-or-scalar-parity-invalid"
      }, {
        ok: frame?.routeSelectedByLessonMetadata === false
          && frame?.routeSelectedByEvidence === false
          && frame?.routeSelectedByFormulaString === false
          && frame?.routeSelectedBySurfaceString === false
          && frame?.callerSuppliedResultAuthorityAccepted === false,
        diagnostic: "comparison-gcd-external-authority-forbidden"
      }])
    }), Object.freeze({
      contractKind: "classical-nahuatl-comparison-lcm-inventory",
      version: 2,
      authorityRole: "comparison-least-common-multiple",
      producer: "classical-comparison",
      consumers: ["classical-presentation", "classical-verification"],
      description: "The complete semantic route and orthogonal distinction inventory for comparison generation.",
      requiredCapabilities: [],
      validator: frame => buildGrammarContractValidationResult([{
        ok: frame?.gcdId === "typed-comparison-source-route-ast-result"
          && Array.isArray(frame?.routeIds)
          && frame?.routeCount === frame.routeIds.length
          && frame.routeCount === 23
          && Array.isArray(frame?.axes)
          && frame?.axisCount === frame.axes.length
          && frame.axisCount === 31
          && frame?.licensedDistinctionsComplete === true,
        diagnostic: "comparison-lcm-route-or-axis-inventory-incomplete"
      }, {
        ok: frame?.lessonMetadataAuthority === false
          && frame?.evidenceAuthority === false
          && frame?.formulaStringAuthority === false
          && frame?.surfaceStringAuthority === false,
        diagnostic: "comparison-lcm-external-authority-forbidden"
      }])
    })]);
    var DEFAULT_GRAMMAR_CAPABILITY_REQUIREMENTS = Object.freeze([Object.freeze({
      requirementId: "classical-vnc-application",
      capability: "evaluateClassicalNahuatlVncApplication",
      expectedType: "function",
      requiredBy: ["classical-presentation", "classical-verification"],
      reason: "Presentation and verification require the same shared Lesson 20-22 application action."
    })]);
    var DEFAULT_GRAMMAR_CONTRACT_REGISTRY = createGrammarContractRegistry({
      registryId: "default-grammar-contracts",
      definitions: DEFAULT_GRAMMAR_CONTRACT_DEFINITIONS,
      capabilityRequirements: DEFAULT_GRAMMAR_CAPABILITY_REQUIREMENTS
    });
    function getDefaultGrammarContractRegistry() {
      return DEFAULT_GRAMMAR_CONTRACT_REGISTRY;
    }
    function getGrammarContractRegistryPublicApi() {
      return {
        GRAMMAR_CONTRACT_REGISTRY_VERSION,
        GRAMMAR_CAPABILITY_EXPECTED_TYPES,
        DEFAULT_GRAMMAR_CONTRACT_DEFINITIONS,
        DEFAULT_GRAMMAR_CAPABILITY_REQUIREMENTS,
        DEFAULT_GRAMMAR_CONTRACT_REGISTRY,
        createGrammarContractRegistry,
        isGrammarContractRegistry,
        registerGrammarContractDefinition,
        getGrammarContractDefinition,
        listGrammarContractDefinitions,
        inspectRegisteredGrammarContract,
        isRegisteredGrammarContract,
        assertRegisteredGrammarContract,
        registerGrammarCapabilityRequirement,
        getGrammarCapabilityRequirement,
        listGrammarCapabilityRequirements,
        inspectGrammarCapabilityRequirements,
        assertGrammarCapabilityRequirements,
        getDefaultGrammarContractRegistry,
        installGrammarContractRegistryClassicGlobals
      };
    }
    function installGrammarContractRegistryClassicGlobals(globalTarget = globalThis) {
      if (!globalTarget || typeof globalTarget !== "object" && typeof globalTarget !== "function") {
        throw new TypeError("Grammar contract registry globals require an object target.");
      }
      const descriptors = Object.getOwnPropertyDescriptors(getGrammarContractRegistryPublicApi());
      Object.entries(descriptors).forEach(([name, descriptor]) => {
        const existing = Object.getOwnPropertyDescriptor(globalTarget, name);
        if (!existing) {
          Object.defineProperty(globalTarget, name, descriptor);
          return;
        }
        if ("value" in descriptor && existing.writable === true) {
          globalTarget[name] = descriptor.value;
        }
      });
      return globalTarget;
    }
    if (typeof targetObject.module !== "undefined" && targetObject.module.exports) {
      targetObject.module.exports = getGrammarContractRegistryPublicApi();
    }
    if (typeof targetObject.window !== "undefined") {
      installGrammarContractRegistryClassicGlobals(targetObject.window);
    }

    const api = {};
    Object.defineProperty(api, "GRAMMAR_CONTRACT_REGISTRY_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return GRAMMAR_CONTRACT_REGISTRY_VERSION; },
        set(value) { GRAMMAR_CONTRACT_REGISTRY_VERSION = value; },
    });
    Object.defineProperty(api, "GRAMMAR_CONTRACT_REGISTRY_STATE", {
        configurable: true,
        enumerable: true,
        get() { return GRAMMAR_CONTRACT_REGISTRY_STATE; },
        set(value) { GRAMMAR_CONTRACT_REGISTRY_STATE = value; },
    });
    Object.defineProperty(api, "GRAMMAR_CAPABILITY_EXPECTED_TYPES", {
        configurable: true,
        enumerable: true,
        get() { return GRAMMAR_CAPABILITY_EXPECTED_TYPES; },
        set(value) { GRAMMAR_CAPABILITY_EXPECTED_TYPES = value; },
    });
    api.normalizeGrammarRegistryToken = normalizeGrammarRegistryToken;
    api.normalizeGrammarRegistryStringList = normalizeGrammarRegistryStringList;
    api.createGrammarRegistryError = createGrammarRegistryError;
    api.getGrammarContractRegistryState = getGrammarContractRegistryState;
    api.isGrammarContractRegistry = isGrammarContractRegistry;
    api.createGrammarContractRegistry = createGrammarContractRegistry;
    api.getGrammarContractDefinitionKey = getGrammarContractDefinitionKey;
    api.normalizeGrammarContractDefinition = normalizeGrammarContractDefinition;
    api.registerGrammarContractDefinition = registerGrammarContractDefinition;
    api.getGrammarContractDefinition = getGrammarContractDefinition;
    api.listGrammarContractDefinitions = listGrammarContractDefinitions;
    api.normalizeGrammarContractValidationResult = normalizeGrammarContractValidationResult;
    api.inspectRegisteredGrammarContract = inspectRegisteredGrammarContract;
    api.isRegisteredGrammarContract = isRegisteredGrammarContract;
    api.assertRegisteredGrammarContract = assertRegisteredGrammarContract;
    api.normalizeGrammarCapabilityRequirement = normalizeGrammarCapabilityRequirement;
    api.registerGrammarCapabilityRequirement = registerGrammarCapabilityRequirement;
    api.getGrammarCapabilityRequirement = getGrammarCapabilityRequirement;
    api.listGrammarCapabilityRequirements = listGrammarCapabilityRequirements;
    api.getGrammarCapabilityValue = getGrammarCapabilityValue;
    api.getGrammarCapabilityValueType = getGrammarCapabilityValueType;
    api.inspectGrammarCapabilityRequirements = inspectGrammarCapabilityRequirements;
    api.assertGrammarCapabilityRequirements = assertGrammarCapabilityRequirements;
    api.buildGrammarContractValidationResult = buildGrammarContractValidationResult;
    Object.defineProperty(api, "DEFAULT_GRAMMAR_CONTRACT_DEFINITIONS", {
        configurable: true,
        enumerable: true,
        get() { return DEFAULT_GRAMMAR_CONTRACT_DEFINITIONS; },
        set(value) { DEFAULT_GRAMMAR_CONTRACT_DEFINITIONS = value; },
    });
    Object.defineProperty(api, "DEFAULT_GRAMMAR_CAPABILITY_REQUIREMENTS", {
        configurable: true,
        enumerable: true,
        get() { return DEFAULT_GRAMMAR_CAPABILITY_REQUIREMENTS; },
        set(value) { DEFAULT_GRAMMAR_CAPABILITY_REQUIREMENTS = value; },
    });
    Object.defineProperty(api, "DEFAULT_GRAMMAR_CONTRACT_REGISTRY", {
        configurable: true,
        enumerable: true,
        get() { return DEFAULT_GRAMMAR_CONTRACT_REGISTRY; },
        set(value) { DEFAULT_GRAMMAR_CONTRACT_REGISTRY = value; },
    });
    api.getDefaultGrammarContractRegistry = getDefaultGrammarContractRegistry;
    api.getGrammarContractRegistryPublicApi = getGrammarContractRegistryPublicApi;
    api.installGrammarContractRegistryClassicGlobals = installGrammarContractRegistryClassicGlobals;
    return api;
}

export function installGrammarContractRegistryGlobals(targetObject = globalThis) {
    const api = createGrammarContractRegistryModule(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
