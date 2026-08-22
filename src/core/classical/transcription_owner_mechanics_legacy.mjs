// Shared mechanics for independently owned routine semantic operations.
// This factory and its routing catalog own no atoms and authorize no rule by
// themselves. Each exact owner spec limits the canonical facts or operation
// family that its issued Source may inspect or execute.

import { createGrammarOperationContractOwner } from "../grammar/operation_owner.mjs";
import {
  getRoutineSemanticExecutionCacheKey,
  registerRoutineSemanticFamilyMetricProvider,
} from "./routine_semantic_family_registry.mjs";

const freeze = Object.freeze;
const VERSION = 1;
const SOURCE_KEYS = new Set([
  "analysisDomain",
  "selection",
  "requestedFacet",
  "participantChoice",
]);
const DOCUMENTARY_KEYS = new Set([
  "exactWitness",
  "lesson",
  "section",
  "sourceAuthority",
  "sourceDocument",
  "sourceExcerpt",
  "transcriptionLineStart",
  "transcriptionLineEnd",
  "examples",
  "example",
  "blockedExample",
  "outputExample",
]);
const FAMILY_KERNELS_BY_TARGET = new WeakMap();
const NON_SEMANTIC_PROOF_KEYS = new Set([
  "authorizationStatus",
  "finiteAuthorizationStatus",
  "inventoryAuthorizationStatus",
  "gcdSatisfied",
  "lcmComplete",
  "ownerExecutionCompleted",
  "blocksInput",
  "formulaOutputAllowed",
  "classificationStatus",
  "kind",
  "version",
]);

const NON_AUTHORITY = freeze({
  lessonMetadataAuthority: false,
  storedExampleAuthority: false,
  storedAnswerAuthority: false,
  labelAuthority: false,
  formulaStringAuthority: false,
  surfaceStringAuthority: false,
  generationAllowed: false,
});

function deepFreeze(value, seen = new WeakSet()) {
  if (!value || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor && Object.prototype.hasOwnProperty.call(descriptor, "value")) {
      deepFreeze(descriptor.value, seen);
    }
  }
  return freeze(value);
}

function sanitize(value, seen = new WeakMap()) {
  if (!value || typeof value !== "object") return value;
  if (seen.has(value)) return seen.get(value);
  const copy = Array.isArray(value) ? [] : {};
  seen.set(value, copy);
  for (const key of Reflect.ownKeys(value)) {
    if (typeof key === "string" && DOCUMENTARY_KEYS.has(key)) continue;
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (!descriptor || descriptor.get || descriptor.set
      || !Object.prototype.hasOwnProperty.call(descriptor, "value")) continue;
    copy[key] = sanitize(descriptor.value, seen);
  }
  return deepFreeze(copy);
}

function inspectRequest(request) {
  if (!request || typeof request !== "object" || Array.isArray(request)) {
    return "typed-transcription-owner-request-object-required";
  }
  const prototype = Object.getPrototypeOf(request);
  if (prototype !== Object.prototype && prototype !== null) {
    return "typed-transcription-owner-request-plain-object-required";
  }
  for (const key of Reflect.ownKeys(request)) {
    if (!SOURCE_KEYS.has(key)) {
      return `typed-transcription-owner-request-unrecognized-key:${String(key)}`;
    }
    const descriptor = Object.getOwnPropertyDescriptor(request, key);
    if (!descriptor || !Object.prototype.hasOwnProperty.call(descriptor, "value")) {
      return `typed-transcription-owner-request-data-property-required:${String(key)}`;
    }
  }
  return "";
}

function argsFor(spec, selection) {
  const selected = spec.executionArgsBySelection?.[selection]
    ?? spec.defaultExecutionArgs
    ?? [];
  return Array.isArray(selected) ? selected : [selected];
}

function coordinateFor(spec, selection, facet) {
  return spec.coordinates?.[`${selection}::${facet}`] || null;
}

function routeToken(value, fallback = "unselected") {
  const token = String(value || "")
    .normalize("NFKD")
    .replace(/[^a-z0-9._-]+/giu, "-")
    .replace(/^-+|-+$/gu, "")
    .toLowerCase();
  return token || fallback;
}

function valueAtPath(value, path = "") {
  if (!path) return value;
  return String(path).split(".").reduce((current, key) => {
    if (current == null) return undefined;
    return current[key];
  }, value);
}

function canonicalBranchStatus(value, path = "") {
  const segments = String(path || "").split(".").filter(Boolean);
  for (let size = segments.length; size >= 0; size -= 1) {
    const candidate = valueAtPath(value, segments.slice(0, size).join("."));
    if (!candidate || typeof candidate !== "object") continue;
    const status = candidate.authorizationStatus
      || (candidate.blocksInput === false
        || candidate.proofFrame?.conclusion?.authorized === true
        || candidate.formulaOutputAllowed === true
        ? "authorized"
        : "");
    if (status) return status;
  }
  return "";
}

function hasMeaningfulCanonicalWitness(value, key = "", seen = new WeakSet()) {
  if (value == null) return false;
  if (typeof value !== "object") {
    if (NON_SEMANTIC_PROOF_KEYS.has(key)) return false;
    if (/authority$/iu.test(key)) return false;
    if (typeof value === "string") return value.trim() !== "";
    return true;
  }
  if (seen.has(value)) return false;
  seen.add(value);
  if (Array.isArray(value)) {
    return value.some(item => hasMeaningfulCanonicalWitness(item, key, seen));
  }
  return Reflect.ownKeys(value).some((childKey) => {
    if (typeof childKey !== "string") return false;
    if (DOCUMENTARY_KEYS.has(childKey)) return false;
    if (NON_SEMANTIC_PROOF_KEYS.has(childKey)) return false;
    if (/authority$/iu.test(childKey)) return false;
    const descriptor = Object.getOwnPropertyDescriptor(value, childKey);
    if (!descriptor || !Object.prototype.hasOwnProperty.call(descriptor, "value")) {
      return false;
    }
    return hasMeaningfulCanonicalWitness(
      descriptor.value,
      childKey,
      seen,
    );
  });
}

function recordFor(target, spec, selection) {
  if (spec.mode === "canonical-fact") {
    if (selection === "system") return target?.[spec.systemCapabilityName] || null;
    const groupedSelections = spec.selectionRecords?.[selection];
    if (Array.isArray(groupedSelections)) {
      const collection = target?.[spec.collectionCapabilityName] || {};
      const records = groupedSelections.map((item) => collection[item]).filter(Boolean);
      return records.length === groupedSelections.length ? records : null;
    }
    return target?.[spec.collectionCapabilityName]?.[selection] || null;
  }
  if (spec.mode === "canonical-rule" || spec.mode === "canonical-rule-analysis") {
    const getter = target?.[spec.ruleGetterName];
    if (typeof getter !== "function") return null;
    return getter().find((record) => record?.id === selection) || null;
  }
  return null;
}

function executeCanonicalSelection(target, spec, selection, familyKernel = null, coordinate = null) {
  const invoke = (phase, callback) => familyKernel?.invoke
    ? familyKernel.invoke(spec, selection, phase, callback)
    : callback();
  if (spec.mode === "owner-typed-assertion") {
    const semanticAssertion = coordinate?.semanticAssertion || null;
    const authorized = Boolean(
      semanticAssertion
      && semanticAssertion.assertionOwnerId === spec.ownerId
      && semanticAssertion.grammaticalForce === "productive-canonical-grammar"
    );
    return deepFreeze({
      authorized,
      reason: authorized ? "" : `${spec.ownerId}-typed-semantic-assertion-required`,
      definition: authorized ? { semanticAssertion } : null,
      canonicalFrame: null,
      payload: authorized ? { definition: sanitize({ semanticAssertion }) } : {},
    });
  }
  if (spec.mode === "canonical-operation") {
    const executor = target?.[spec.executionFunctionName];
    const validator = target?.[spec.executionValidatorName];
    if (typeof executor !== "function" || typeof validator !== "function") {
      return deepFreeze({
        authorized: false,
        reason: `${spec.ownerId}-canonical-executor-required`,
        definition: null,
        canonicalFrame: null,
        payload: {},
      });
    }
    const operationResult = invoke(
      "canonical-operation-result",
      () => executor(...argsFor(spec, selection)),
    );
    const expectedStatus = spec.expectedCanonicalStatusBySelection?.[selection]
      || "authorized";
    const observedStatus = operationResult?.authorizationStatus
      || (operationResult?.blocksInput === false
        || operationResult?.proofFrame?.conclusion?.authorized === true
        || operationResult?.formulaOutputAllowed === true
        ? "authorized"
        : "");
    const wholeFrameAuthorized = validator(operationResult) === true
      && observedStatus === expectedStatus;
    const selectedWitness = coordinate?.canonicalPath
      ? valueAtPath(operationResult, coordinate.canonicalPath)
      : undefined;
    const selectedBranchAuthorized = Boolean(
      expectedStatus === "authorized"
      && coordinate?.canonicalPath
      && canonicalBranchStatus(
        operationResult,
        coordinate.canonicalPath
      ) === expectedStatus
      && hasMeaningfulCanonicalWitness(
        selectedWitness,
        String(coordinate.canonicalPath).split(".").at(-1) || ""
      )
      && Object.isFrozen(operationResult)
    );
    const authorized = wholeFrameAuthorized || selectedBranchAuthorized;
    const canonicalFrame = deepFreeze({
      kind: "classical-canonical-semantic-operation-frame",
      canonicalAnalysisKind: spec.canonicalAnalysisKind || "typed-semantic-operation",
      authorizationStatus: authorized ? "authorized" : "blocked",
      blockReason: authorized ? "" : `${spec.ownerId}-canonical-operation-required`,
      selectedRuleId: selection,
      evaluatedRuleIds: [spec.executionFunctionName],
      appliedRuleIds: authorized ? [spec.executionFunctionName] : [],
      surface: operationResult?.written || "",
      formula: operationResult?.formula || operationResult?.formulaRealization || "",
      operationResult,
    });
    return deepFreeze({
      authorized,
      reason: authorized ? "" : canonicalFrame.blockReason,
      definition: operationResult,
      canonicalFrame,
      payload: {
        definition: sanitize(operationResult),
        canonicalExecution: sanitize(canonicalFrame),
      },
    });
  }
  if (spec.mode === "canonical-particle-operation") {
    const sourceBuilder = target?.[spec.sourceBuilderName];
    const executor = target?.[spec.executionFunctionName];
    const validator = target?.[spec.executionValidatorName];
    const sourceArgs = spec.executionArgsBySelection?.[selection] || [];
    if (typeof sourceBuilder !== "function" || typeof executor !== "function"
      || typeof validator !== "function" || !sourceArgs.length) {
      return deepFreeze({
        authorized: false,
        reason: `${spec.ownerId}-canonical-executor-required`,
        definition: null,
        canonicalFrame: null,
        payload: {},
      });
    }
    const operationResult = invoke(
      "canonical-particle-operation-result",
      () => {
        const canonicalSource = sourceBuilder(...sourceArgs);
        return executor(canonicalSource);
      },
    );
    const authorized = validator(operationResult) === true
      && operationResult?.authorizationStatus === "authorized";
    const canonicalFrame = deepFreeze({
      kind: "classical-particle-owner-operation-frame",
      canonicalAnalysisKind: "typed-particle-operation",
      authorizationStatus: authorized ? "authorized" : "blocked",
      blockReason: authorized ? "" : `${spec.ownerId}-canonical-particle-operation-required`,
      selectedRuleId: selection,
      evaluatedRuleIds: [operationResult?.operationId || spec.operationId],
      appliedRuleIds: authorized
        ? [operationResult?.operationId || spec.operationId] : [],
      surface: operationResult?.surface || "",
      formula: operationResult?.formula || "",
      operationResult,
    });
    return deepFreeze({
      authorized,
      reason: authorized ? "" : canonicalFrame.blockReason,
      definition: operationResult,
      canonicalFrame,
      payload: {
        definition: sanitize(operationResult),
        canonicalExecution: sanitize(canonicalFrame),
      },
    });
  }
  if (spec.mode === "canonical-particle-result") {
    const particleIds = spec.selectionRecords?.[selection] || [selection];
    const getter = target?.[spec.ruleGetterName];
    const sourceBuilder = target?.[spec.sourceBuilderName];
    const executor = target?.[spec.executionFunctionName];
    const validator = target?.[spec.executionValidatorName];
    const inventory = typeof getter === "function" ? getter() : [];
    const definitions = particleIds.map((particleId) =>
      inventory.find((record) => record?.id === particleId) || null);
    if (!definitions.length || definitions.some((record) => !record)) {
      return deepFreeze({
        authorized: false,
        reason: `${spec.ownerId}-canonical-selection-required`,
        definition: null,
        canonicalFrame: null,
        payload: {},
      });
    }
    if (typeof sourceBuilder !== "function" || typeof executor !== "function"
      || typeof validator !== "function") {
      return deepFreeze({
        authorized: false,
        reason: `${spec.ownerId}-canonical-executor-required`,
        definition: definitions,
        canonicalFrame: null,
        payload: {},
      });
    }
    const resultFrames = invoke(
      "canonical-particle-result-frames",
      () => deepFreeze(particleIds.map((particleId) => {
        const sourceFrame = sourceBuilder(particleId);
        return executor(sourceFrame);
      })),
    );
    const authorized = resultFrames.every((frame) =>
      validator(frame) === true && frame?.authorizationStatus === "authorized");
    const canonicalFrame = deepFreeze({
      kind: "classical-particle-owner-execution-frame",
      canonicalAnalysisKind: "typed-particle-result-set",
      authorizationStatus: authorized ? "authorized" : "blocked",
      blockReason: authorized ? "" : `${spec.ownerId}-canonical-particle-result-required`,
      selectedRuleId: selection,
      evaluatedRuleIds: [...particleIds],
      appliedRuleIds: authorized ? [...particleIds] : [],
      surfaces: resultFrames.map((frame) => frame?.surface || ""),
      formulas: resultFrames.map((frame) => frame?.formula || ""),
      resultFrames,
    });
    return deepFreeze({
      authorized,
      reason: authorized ? "" : canonicalFrame.blockReason,
      definition: definitions,
      canonicalFrame,
      payload: {
        definition: sanitize(definitions),
        canonicalExecution: sanitize(canonicalFrame),
      },
    });
  }
  const definition = recordFor(target, spec, selection);
  if (!definition) {
    return deepFreeze({
      authorized: false,
      reason: `${spec.ownerId}-canonical-selection-required`,
      definition: null,
      canonicalFrame: null,
      payload: {},
    });
  }
  if (spec.mode === "canonical-fact" || spec.mode === "canonical-rule-analysis") {
    return deepFreeze({
      authorized: true,
      reason: "",
      definition,
      canonicalFrame: null,
      payload: { definition: sanitize(definition) },
    });
  }
  const executor = target?.[spec.executionFunctionName];
  if (typeof executor !== "function") {
    return deepFreeze({
      authorized: false,
      reason: `${spec.ownerId}-canonical-executor-required`,
      definition,
      canonicalFrame: null,
      payload: {},
    });
  }
  const canonicalFrame = invoke(
    "canonical-rule-frame",
    () => executor(...argsFor(spec, selection)),
  );
  const validator = target?.[spec.executionValidatorName];
  const expectedStatus = spec.expectedCanonicalStatusBySelection?.[selection]
    || "authorized";
  const canonical = typeof validator === "function"
    && validator(canonicalFrame) === true
    && canonicalFrame?.authorizationStatus === expectedStatus;
  const selectedRuleMatches = spec.requireSelectedRuleMatch !== true
    || canonicalFrame?.selectedRuleId === selection
    || canonicalFrame?.evaluatedRuleIds?.includes(selection)
    || canonicalFrame?.appliedRuleIds?.includes(selection);
  if (!canonical || !selectedRuleMatches) {
    return deepFreeze({
      authorized: false,
      reason: !canonical
      ? `${spec.ownerId}-canonical-execution-status-required:${expectedStatus}`
        : `${spec.ownerId}-selected-rule-mismatch`,
      definition,
      canonicalFrame,
      payload: {},
    });
  }
  return deepFreeze({
    authorized: true,
    reason: "",
    definition,
    canonicalFrame,
    payload: {
      definition: sanitize(definition),
      canonicalExecution: sanitize({
        kind: canonicalFrame.kind,
        canonicalAnalysisKind: canonicalFrame.canonicalAnalysisKind,
        sharedOperationId: canonicalFrame.sharedOperationId,
        authorizationStatus: canonicalFrame.authorizationStatus,
        blockReason: canonicalFrame.blockReason,
        selectedRuleId: canonicalFrame.selectedRuleId || "",
        evaluatedRuleIds: canonicalFrame.evaluatedRuleIds || [],
        appliedRuleIds: canonicalFrame.appliedRuleIds || [],
        outputSound: canonicalFrame.outputSound || "",
        outputSpelling: canonicalFrame.outputSpelling || "",
        outputForm: canonicalFrame.outputForm || "",
        outputMorphType: canonicalFrame.outputMorphType || "",
        surface: canonicalFrame.surface || "",
        formula: canonicalFrame.formula || "",
        conclusion: canonicalFrame.conclusion || null,
      }),
    },
  });
}

function createMechanism(target, spec, familyKernel = null) {
  const issuedSources = new WeakSet();
  const sourceContexts = new WeakMap();
  const issuedResults = new WeakSet();
  const resultEvidence = new WeakMap();
  const owner = createGrammarOperationContractOwner({
    ownerId: spec.ownerId,
    domain: spec.domain,
  });
  const realizesCanonicalOutput = spec.mode === "canonical-rule"
    || spec.mode === "canonical-operation"
    || spec.mode === "canonical-particle-result"
    || spec.mode === "canonical-particle-operation";
  const contract = owner.buildContract({
    operationId: spec.operationId,
    operationType: realizesCanonicalOutput ? "realize" : "establish",
    consumesFrameKinds: [`${spec.ownerId}-source`],
    producesFrameKind: `${spec.ownerId}-result`,
    effectScopes: realizesCanonicalOutput
      ? ["typed-source-validation", "canonical-semantic-operation"]
      : ["typed-source-validation", "read-only-repertory-analysis"],
    outputKinds: ["typed-semantic-result"],
    authorityRefs: ["andrews-canvas-semantic-owner"],
    description: `Execute ${spec.ownerId} through its exact canonical semantic scope.`,
  });

  function buildSource(request = {}) {
    const requestReason = inspectRequest(request);
    const analysisDomain = requestReason ? "" : String(request.analysisDomain || "");
    const selection = requestReason ? "" : String(request.selection || "");
    const requestedFacet = requestReason ? "" : String(request.requestedFacet || "");
    const participantChoice = requestReason ? "" : String(request.participantChoice || "");
    const domainReason = analysisDomain === spec.domain
      ? ""
      : `${spec.ownerId}-analysis-domain-required`;
    const selectionReason = spec.selections.includes(selection)
      ? ""
      : `${spec.ownerId}-canonical-selection-required`;
    const coordinate = coordinateFor(spec, selection, requestedFacet);
    const facetReason = coordinate
      ? ""
      : `${spec.ownerId}-licensed-semantic-coordinate-required`;
    const participantReason = participantChoice === `${selection}:${requestedFacet}`
      ? ""
      : `${spec.ownerId}-typed-participant-choice-required`;
    const reason = requestReason || domainReason || selectionReason
      || facetReason || participantReason;
    const source = deepFreeze({
      kind: `${spec.ownerId}-source`,
      version: VERSION,
      analysisDomain,
      selection,
      requestedFacet,
      participantChoice,
      authorizationStatus: reason ? "blocked" : "authorized",
      blockReason: reason,
      ...NON_AUTHORITY,
    });
    issuedSources.add(source);
    sourceContexts.set(source, deepFreeze({ reason, coordinate }));
    return source;
  }

  function isSource(source = null) {
    const context = sourceContexts.get(source) || null;
    return Boolean(
      source
      && issuedSources.has(source)
      && context
      && !context.reason
      && source.kind === `${spec.ownerId}-source`
      && source.authorizationStatus === "authorized"
      && source.blockReason === ""
      && Object.isFrozen(source)
    );
  }

  function evaluate(source = null) {
    const sourceIssued = issuedSources.has(source);
    const context = sourceContexts.get(source) || null;
    const sourceReason = !sourceIssued
      ? `owner-issued-${spec.ownerId}-source-required`
      : source?.blockReason || context?.reason || "";
    const sourceAuthorized = Boolean(sourceIssued && context && !sourceReason && isSource(source));
    const canonical = sourceAuthorized
      ? executeCanonicalSelection(
        target,
        spec,
        source.selection,
        familyKernel,
        context.coordinate,
      )
      : deepFreeze({ authorized: false, reason: sourceReason, payload: {}, canonicalFrame: null });
    const reason = sourceReason || canonical.reason || "";
    const authorized = sourceAuthorized && canonical.authorized === true && !reason;
    const inputState = deepFreeze({
      analysisDomain: source?.analysisDomain || "",
      selection: source?.selection || "",
      requestedFacet: source?.requestedFacet || "",
      participantChoice: source?.participantChoice || "",
    });
    const canonicalRuleIds = [...new Set([
      canonical.canonicalFrame?.selectedRuleId,
      ...(canonical.canonicalFrame?.evaluatedRuleIds || []),
      ...(canonical.canonicalFrame?.appliedRuleIds || []),
    ].filter(Boolean))];
    const canonicalActorId = spec.canonicalActorId || "orthography:transcription";
    const canonicalActorToken = routeToken(canonicalActorId, "semantic-prerequisite");
    const routeSteps = deepFreeze([
      deepFreeze({
        stepId: `${spec.ownerId}-source-admitted`, kind: "source",
        actorId: spec.ownerId, status: sourceIssued ? "accepted" : "rejected",
        reason: sourceIssued ? `owner-issued-${spec.ownerId}-source` : reason,
        branchId: `${spec.ownerId}-source-authority`,
        decision: sourceIssued ? "admit" : "reject",
        evaluatedRuleIds: [], executedRuleIds: [], inputState,
        outputState: { sourceIssued },
      }),
      deepFreeze({
        stepId: `${spec.ownerId}-${routeToken(source?.requestedFacet)}-checkpoint`,
        kind: authorized ? "branch" : "guard", actorId: spec.ownerId,
        invocationRole: "current", status: authorized ? "evaluated" : "rejected",
        reason: authorized ? `${source.requestedFacet}-facet-retained` : reason,
        branchId: `${spec.ownerId}-${routeToken(source?.selection)}-${routeToken(source?.requestedFacet)}`,
        decision: authorized ? "retain" : "reject",
        evaluatedRuleIds: sourceIssued ? [spec.operationId, ...canonicalRuleIds] : [],
        executedRuleIds: [], inputState,
        outputState: { canonicalSelection: authorized ? source.selection : "", facet: authorized ? source.requestedFacet : "" },
      }),
      ...(canonical.canonicalFrame ? [deepFreeze({
        stepId: `${spec.ownerId}-canonical-${canonicalActorToken}-executed`,
        kind: "operation", actorId: canonicalActorId,
        invocationRole: "prerequisite", status: authorized ? "executed" : "rejected",
        reason: authorized ? "canonical-semantic-frame-accepted" : reason,
        branchId: `${spec.ownerId}-canonical-${canonicalActorToken}`,
        decision: authorized ? "consume" : "reject",
        evaluatedRuleIds: canonicalRuleIds,
        executedRuleIds: authorized ? canonicalRuleIds : [],
        inputState,
        outputState: {
          canonicalAnalysisKind: canonical.canonicalFrame.canonicalAnalysisKind || "",
          selectedRuleId: canonical.canonicalFrame.selectedRuleId || "",
          authorizationStatus: canonical.canonicalFrame.authorizationStatus || "",
        },
      })] : []),
      deepFreeze({
        stepId: authorized ? `${spec.ownerId}-executed` : `${spec.ownerId}-rejected`,
        kind: authorized ? "operation" : "guard", actorId: spec.ownerId,
        invocationRole: "current", status: authorized ? "executed" : "rejected",
        reason: authorized ? `${spec.ownerId}-executed` : reason,
        branchId: `${spec.ownerId}-outcome`, decision: authorized ? "establish" : "reject",
        evaluatedRuleIds: sourceIssued ? [spec.operationId] : [],
        executedRuleIds: authorized ? [spec.operationId] : [], inputState,
        outputState: {
          classificationStatus: authorized ? `established-${spec.ownerId}` : `${spec.ownerId}-rejected`,
          selection: authorized ? source.selection : "",
          facet: authorized ? source.requestedFacet : "",
        },
      }),
    ]);
    const execution = deepFreeze({
      status: authorized ? "authorized" : "rejected",
      reason: reason || null,
      semanticOwnerId: spec.ownerId,
      operationId: spec.operationId,
      selectedRuleId: authorized ? spec.operationId : null,
      stages: routeSteps.map((step) => step.stepId),
      routeSteps,
    });
    const evidence = deepFreeze({
      ownerId: spec.ownerId,
      evaluatedOperationId: spec.operationId,
      inputContract: spec.inputContract,
      functionIds: [`build${spec.prefix}Source`, `evaluate${spec.prefix}`],
      providedInput: inputState,
      execution,
      routeSteps,
      outcome: { status: execution.status, reason: execution.reason },
    });
    const facetValue = authorized
      ? sanitize(
        context.coordinate.semanticAssertion
        ?? valueAtPath(
          canonical.definition,
          context.coordinate.canonicalPath || "",
        )
      )
      : undefined;
    const proofObservationStatus = !authorized
      ? "blocked"
      : context.coordinate.broadCompletionProxyRetired === true
        ? hasMeaningfulCanonicalWitness(facetValue)
          ? "observed"
          : "unresolved"
        : "direct";
    const result = deepFreeze({
      kind: `${spec.ownerId}-result`, version: VERSION,
      authorizationStatus: authorized ? "authorized" : "blocked",
      blockReason: reason,
      semanticOwnerId: spec.ownerId,
      operationId: spec.operationId,
      operationContract: contract,
      classificationStatus: authorized ? `established-${spec.ownerId}` : `${spec.ownerId}-rejected`,
      analysisKind: authorized ? source.requestedFacet : "",
      participantChoice: authorized ? source.participantChoice : "",
      classification: authorized ? `${spec.ownerId}:${source.requestedFacet}` : "",
      facts: authorized ? [`${spec.ownerId}:${source.selection}:${source.requestedFacet}`] : [],
      relations: authorized ? [`${source.selection}:${source.requestedFacet}:retained-by:${spec.ownerId}`] : [],
      restrictions: [
        `${spec.ownerId}-requires-an-owner-issued-typed-source`,
        "copied-results-labels-examples-formulas-surfaces-and-validation-configurations-are-non-authorizing",
        "routing-catalogs-and-shared-mechanics-own-no-atoms-or-proof",
      ],
      coordinates: authorized ? {
        analysisDomain: source.analysisDomain,
        selection: source.selection,
        requestedFacet: source.requestedFacet,
        participantChoice: source.participantChoice,
      } : {},
      prerequisiteOwnerIds: canonical.canonicalFrame ? [canonicalActorId] : [],
      prerequisiteSnapshots: canonical.canonicalFrame ? [{
        ownerId: canonicalActorId,
        issuedResultAccepted: authorized,
        observedKind: canonical.canonicalFrame.kind || "",
        observedAuthorizationStatus: canonical.canonicalFrame.authorizationStatus || "",
      }] : [],
      payload: authorized ? {
        ...canonical.payload,
        semanticAssertionId: context.coordinate.assertionId,
        facetValue,
        proofObservationKind:
          context.coordinate.proofObservationKind
          || "direct-canonical-result-observation",
        proofObservationStatus,
        effectiveCanonicalPath:
          context.coordinate.canonicalPath || "",
        sourceCanonicalPath:
          context.coordinate.sourceCanonicalPath
          || context.coordinate.canonicalPath
          || "",
        legacyCanonicalPath:
          context.coordinate.legacyCanonicalPath || "",
        legacyProofAddressId:
          context.coordinate.legacyProofAddressId || "",
        legacyProofSemanticName:
          context.coordinate.legacyProofSemanticName || "",
        broadCompletionLeaf:
          context.coordinate.broadCompletionLeaf || "",
        broadCompletionProxyRetired:
          context.coordinate.broadCompletionProxyRetired === true,
      } : {},
      ownerExecutionCompleted: authorized,
      grammaticalForce: authorized ? "productive-canonical-grammar" : "",
      evidencePolicy: deepFreeze({
        evidenceAuthorizesGrammar: false,
        evidenceAbsenceBlocksResult: false,
        examplesWhitelistRealization: false,
        inventoryAuthorizesGrammar: false,
      }),
      unitConstructed: false,
      boundaryRewritten: authorized && realizesCanonicalOutput
        && canonical.canonicalFrame?.authorizationStatus === "authorized",
      soundedSurfaceGenerated: false,
      writtenSurfaceGenerated: authorized && realizesCanonicalOutput
        && canonical.canonicalFrame?.authorizationStatus === "authorized"
        && Boolean(canonical.canonicalFrame?.surface
          || canonical.canonicalFrame?.surfaces?.some(Boolean)),
      formulaGenerated: authorized && realizesCanonicalOutput
        && canonical.canonicalFrame?.authorizationStatus === "authorized"
        && Boolean(canonical.canonicalFrame?.formula
          || canonical.canonicalFrame?.formulas?.some(Boolean)),
      ...NON_AUTHORITY,
    });
    issuedResults.add(result);
    resultEvidence.set(result, evidence);
    return result;
  }

  function isResult(result = null) {
    return Boolean(
      result
      && issuedResults.has(result)
      && result.semanticOwnerId === spec.ownerId
      && result.operationId === spec.operationId
      && owner.isContractIssued(result.operationContract)
      && Object.isFrozen(result)
    );
  }
  function getEvidence(result = null) { return resultEvidence.get(result) || null; }
  function isEvidence(evidence = null, result = null) {
    const executed = evidence?.routeSteps?.filter((step) =>
      step.invocationRole !== "prerequisite"
      && step.executedRuleIds?.includes(spec.operationId)) || [];
    return Boolean(
      evidence
      && isResult(result)
      && resultEvidence.get(result) === evidence
      && evidence.ownerId === spec.ownerId
      && evidence.evaluatedOperationId === spec.operationId
      && evidence.execution?.routeSteps === evidence.routeSteps
      && (result.authorizationStatus === "authorized"
        ? executed.length === 1 && executed[0].stepId === `${spec.ownerId}-executed`
        : executed.length === 0)
      && Object.isFrozen(evidence)
    );
  }
  return deepFreeze({ spec, buildSource, isSource, evaluate, isResult, getEvidence, isEvidence });
}

function publicNames(prefix) {
  return freeze({
    build: `build${prefix}Source`,
    isSource: `is${prefix}Source`,
    evaluate: `evaluate${prefix}`,
    isResult: `is${prefix}Result`,
    getEvidence: `get${prefix}ExecutionEvidence`,
    isEvidence: `is${prefix}ExecutionEvidence`,
  });
}

function createFamilyKernel(familyBinding = null) {
  const cache = new Map();
  let invocationCount = 0;
  let cacheHitCount = 0;
  let cacheMissCount = 0;

  function invoke(spec, selection, phase, callback) {
    invocationCount += 1;
    const cacheKey = getRoutineSemanticExecutionCacheKey(
      spec,
      selection,
      phase,
    );
    if (cache.has(cacheKey)) {
      cacheHitCount += 1;
      return cache.get(cacheKey);
    }
    cacheMissCount += 1;
    const result = callback();
    cache.set(cacheKey, result);
    return result;
  }

  const metrics = () => freeze({
    invocationCount,
    cacheHitCount,
    cacheMissCount,
    cacheEntryCount: cache.size,
  });
  if (familyBinding?.familyIdentityId) {
    registerRoutineSemanticFamilyMetricProvider(
      familyBinding.familyIdentityId,
      metrics,
    );
  }
  return freeze({ invoke, metrics });
}

function getFamilyKernel(targetObject, familyBinding, fallbackKey) {
  let familyKernels = FAMILY_KERNELS_BY_TARGET.get(targetObject) || null;
  if (!familyKernels) {
    familyKernels = new Map();
    FAMILY_KERNELS_BY_TARGET.set(targetObject, familyKernels);
  }
  const familyKey = familyBinding?.familyIdentityId || fallbackKey;
  if (!familyKernels.has(familyKey)) {
    familyKernels.set(familyKey, createFamilyKernel(familyBinding || null));
  }
  return familyKernels.get(familyKey);
}

export function createRoutineSemanticOwnerMechanicsApi(targetObject = globalThis, ownerSpecs = []) {
  const api = Object.create(null);
  for (const spec of ownerSpecs) {
    const familyKernel = getFamilyKernel(
      targetObject,
      spec.routineFamily || null,
      spec.ownerId,
    );
    const mechanism = createMechanism(
      targetObject,
      spec,
      familyKernel,
    );
    const names = publicNames(spec.prefix);
    api[names.build] = mechanism.buildSource;
    api[names.isSource] = mechanism.isSource;
    api[names.evaluate] = mechanism.evaluate;
    api[names.isResult] = mechanism.isResult;
    api[names.getEvidence] = mechanism.getEvidence;
    api[names.isEvidence] = mechanism.isEvidence;
  }
  return freeze(api);
}

export const createClassicalTranscriptionOwnerMechanicsApi =
  createRoutineSemanticOwnerMechanicsApi;
