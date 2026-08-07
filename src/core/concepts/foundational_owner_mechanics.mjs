// Shared mechanics for independently owned foundational semantic operations.
// The routing catalog and this factory own no atoms. Each supplied spec retains
// its own Source/Result identities, operation contract, semantic coordinates,
// prerequisite checks, route, and execution evidence.

import { createGrammarOperationContractOwner } from "../grammar/operation_owner.mjs";

const freeze = Object.freeze;
const VERSION = 1;
const SOURCE_KEYS = new Set([
  "analysisDomain",
  "requestedAnalysisKind",
  "prerequisites",
  "participantChoice",
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

function inspectRequest(request) {
  if (!request || typeof request !== "object" || Array.isArray(request)) {
    return "typed-foundational-owner-request-object-required";
  }
  const prototype = Object.getPrototypeOf(request);
  if (prototype !== Object.prototype && prototype !== null) {
    return "typed-foundational-owner-request-plain-object-required";
  }
  for (const key of Reflect.ownKeys(request)) {
    if (!SOURCE_KEYS.has(key)) {
      return `typed-foundational-owner-request-unrecognized-key:${String(key)}`;
    }
    const descriptor = Object.getOwnPropertyDescriptor(request, key);
    if (!descriptor || !Object.prototype.hasOwnProperty.call(descriptor, "value")) {
      return `typed-foundational-owner-request-data-property-required:${String(key)}`;
    }
  }
  return "";
}

function valueAtPath(value, path = []) {
  return path.reduce((current, key) => current?.[key], value);
}

function sameValue(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function validatePrerequisites(target, definition, prerequisites) {
  const source = prerequisites && typeof prerequisites === "object"
    ? prerequisites
    : Object.create(null);
  const snapshots = [];
  for (const requirement of definition.requiredPrerequisites || []) {
    const candidate = source[requirement.field];
    let valid = typeof target?.[requirement.validatorName] === "function"
      && target[requirement.validatorName](candidate) === true;
    for (const expectation of requirement.pathEquals || []) {
      valid = valid && sameValue(
        valueAtPath(candidate, expectation.path),
        expectation.value,
      );
    }
    snapshots.push(deepFreeze({
      field: requirement.field,
      ownerId: requirement.ownerId,
      validatorName: requirement.validatorName,
      issuedResultAccepted: valid,
      observedKind: candidate?.kind || "",
      observedSemanticOwnerId: candidate?.semanticOwnerId || "",
      observedAuthorizationStatus: candidate?.authorizationStatus || "",
    }));
    if (!valid) {
      return deepFreeze({
        valid: false,
        reason: `${requirement.ownerId}-owner-issued-prerequisite-required`,
        snapshots,
      });
    }
  }
  return deepFreeze({ valid: true, reason: "", snapshots });
}

function payloadFor(definition, prerequisites) {
  const payload = { ...(definition.payload || {}) };
  for (const projection of definition.payloadFromPrerequisites || []) {
    payload[projection.outputField] = valueAtPath(
      prerequisites?.[projection.field],
      projection.path,
    ) ?? null;
  }
  return deepFreeze(payload);
}

function createMechanism(target, spec) {
  const issuedSources = new WeakSet();
  const sourceContexts = new WeakMap();
  const issuedResults = new WeakSet();
  const resultEvidence = new WeakMap();
  const owner = createGrammarOperationContractOwner({
    ownerId: spec.ownerId,
    domain: spec.domain,
  });
  const contract = owner.buildContract({
    operationId: spec.operationId,
    operationType: spec.operationType || "establish",
    consumesFrameKinds: [`${spec.ownerId}-source`],
    producesFrameKind: `${spec.ownerId}-result`,
    effectScopes: ["typed-source-validation", "owner-specific-semantic-analysis"],
    outputKinds: ["typed-semantic-result"],
    authorityRefs: ["andrews-canvas-foundational-semantic-owner"],
    description: `Execute ${spec.ownerId} from owner-issued typed coordinates and prerequisites.`,
  });

  function buildSource(request = {}) {
    const requestReason = inspectRequest(request);
    const analysisDomain = requestReason ? "" : String(request.analysisDomain || "");
    const requestedAnalysisKind = requestReason
      ? ""
      : String(request.requestedAnalysisKind || "");
    const participantChoice = requestReason
      ? ""
      : String(request.participantChoice || "");
    const definition = spec.analyses[requestedAnalysisKind] || null;
    const domainReason = analysisDomain === spec.domain
      ? ""
      : `${spec.ownerId}-analysis-domain-required`;
    const analysisReason = definition
      ? ""
      : `${spec.ownerId}-analysis-kind-required`;
    const participantReason = !definition
      || (definition.allowedParticipantChoices || []).includes(participantChoice)
      ? ""
      : `${spec.ownerId}-typed-participant-choice-required`;
    const prerequisiteValidation = requestReason || domainReason || analysisReason
      || participantReason
      ? deepFreeze({ valid: false, reason: "", snapshots: [] })
      : validatePrerequisites(target, definition, request.prerequisites);
    const prerequisiteReason = prerequisiteValidation.valid
      ? ""
      : prerequisiteValidation.reason;
    const reason = requestReason || domainReason || analysisReason
      || participantReason || prerequisiteReason;
    const source = deepFreeze({
      kind: `${spec.ownerId}-source`,
      version: VERSION,
      analysisDomain,
      requestedAnalysisKind,
      participantChoice,
      prerequisites: request.prerequisites || null,
      authorizationStatus: reason ? "blocked" : "authorized",
      blockReason: reason,
      ...NON_AUTHORITY,
    });
    issuedSources.add(source);
    sourceContexts.set(source, deepFreeze({
      definition,
      prerequisiteValidation,
      reason,
    }));
    return source;
  }

  function isSource(source = null) {
    const context = sourceContexts.get(source) || null;
    return Boolean(
      source
      && issuedSources.has(source)
      && context?.definition
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
    const reason = !sourceIssued
      ? `owner-issued-${spec.ownerId}-source-required`
      : source.blockReason || context?.reason || "";
    const authorized = Boolean(sourceIssued && context && !reason && isSource(source));
    const definition = authorized ? context.definition : null;
    const prerequisiteOwnerIds = authorized
      ? [...new Set((definition.requiredPrerequisites || []).map((item) => item.ownerId))]
      : [];
    const inputState = deepFreeze({
      analysisDomain: source?.analysisDomain || "",
      requestedAnalysisKind: source?.requestedAnalysisKind || "",
      participantChoice: source?.participantChoice || "",
    });
    const routeSteps = [
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
        stepId: `${spec.ownerId}-semantic-owner-selected`, kind: "semantic-owner",
        actorId: spec.ownerId, status: sourceIssued ? "selected" : "rejected",
        reason: sourceIssued ? `${spec.ownerId}-jurisdiction-selected` : reason,
        branchId: `${spec.ownerId}-owner-jurisdiction`,
        decision: sourceIssued ? spec.ownerId : "no-owner",
        evaluatedRuleIds: [], executedRuleIds: [], inputState,
        outputState: { ownerId: sourceIssued ? spec.ownerId : "" },
      }),
      ...(context?.prerequisiteValidation?.snapshots || []).map((snapshot) => deepFreeze({
        stepId: `${spec.ownerId}-prerequisite-${snapshot.field}-validated`,
        kind: "guard", actorId: snapshot.ownerId, invocationRole: "prerequisite",
        status: snapshot.issuedResultAccepted ? "accepted" : "rejected",
        reason: snapshot.issuedResultAccepted
          ? "identity-bound-owner-issued-prerequisite-accepted"
          : `${snapshot.ownerId}-owner-issued-prerequisite-required`,
        branchId: `${spec.ownerId}-prerequisite-${snapshot.field}`,
        decision: snapshot.issuedResultAccepted ? "consume" : "reject",
        evaluatedRuleIds: [], executedRuleIds: [], inputState,
        outputState: snapshot,
      })),
      deepFreeze({
        stepId: definition?.checkpoint || `${spec.ownerId}-claim-not-selected`,
        kind: authorized ? "branch" : "guard", actorId: spec.ownerId,
        invocationRole: "current", status: authorized ? "evaluated" : "rejected",
        reason: authorized ? `${source.requestedAnalysisKind}-claim-retained` : reason,
        branchId: `${spec.ownerId}-${source?.requestedAnalysisKind || "unselected"}`,
        decision: authorized ? "retain" : "reject",
        evaluatedRuleIds: sourceIssued ? [spec.operationId] : [],
        executedRuleIds: [], inputState,
        outputState: { checkpointSatisfied: authorized },
      }),
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
          classification: definition?.classification || "",
        },
      }),
    ];
    const frozenSteps = deepFreeze(routeSteps);
    const execution = deepFreeze({
      status: authorized ? "authorized" : "rejected",
      reason: reason || null,
      semanticOwnerId: spec.ownerId,
      operationId: spec.operationId,
      selectedRuleId: authorized ? spec.operationId : null,
      stages: frozenSteps.map((step) => step.stepId),
      routeSteps: frozenSteps,
    });
    const evidence = deepFreeze({
      ownerId: spec.ownerId,
      evaluatedOperationId: spec.operationId,
      inputContract: spec.inputContract,
      functionIds: [`build${spec.prefix}Source`, `evaluate${spec.prefix}`],
      providedInput: inputState,
      prerequisiteSnapshots: context?.prerequisiteValidation?.snapshots || [],
      execution, routeSteps: frozenSteps,
      outcome: { status: execution.status, reason: execution.reason },
    });
    const payload = authorized
      ? payloadFor(definition, source.prerequisites)
      : deepFreeze({});
    const result = deepFreeze({
      kind: `${spec.ownerId}-result`, version: VERSION,
      authorizationStatus: authorized ? "authorized" : "blocked",
      blockReason: reason,
      semanticOwnerId: spec.ownerId, operationId: spec.operationId,
      operationContract: contract,
      classificationStatus: authorized ? `established-${spec.ownerId}` : `${spec.ownerId}-rejected`,
      analysisKind: authorized ? source.requestedAnalysisKind : "",
      participantChoice: authorized ? source.participantChoice : "",
      classification: definition?.classification || "",
      facts: [...(definition?.facts || [])],
      relations: definition ? [definition.relation] : [],
      restrictions: [
        `${spec.ownerId}-requires-an-owner-issued-typed-source`,
        "copied-results-labels-glosses-examples-formulas-and-surfaces-are-non-authorizing",
        "supporting-prerequisites-do-not-own-or-transfer-this-owner-proof",
      ],
      coordinates: authorized ? {
        analysisDomain: source.analysisDomain,
        requestedAnalysisKind: source.requestedAnalysisKind,
        participantChoice: source.participantChoice,
      } : {},
      prerequisiteOwnerIds,
      prerequisiteSnapshots: context?.prerequisiteValidation?.snapshots || [],
      payload,
      ownerExecutionCompleted: authorized,
      unitConstructed: authorized && definition?.unitConstructed === true,
      boundaryRewritten: false,
      soundedSurfaceGenerated: false,
      writtenSurfaceGenerated: false,
      formulaGenerated: false,
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
      && result.generationAllowed === false
      && result.writtenSurfaceGenerated === false
      && result.formulaGenerated === false
      && Object.isFrozen(result)
    );
  }
  function getEvidence(result = null) { return resultEvidence.get(result) || null; }
  function isEvidence(evidence = null, result = null) {
    const executed = evidence?.routeSteps?.filter((step) =>
      step.invocationRole !== "prerequisite"
      && step.executedRuleIds?.includes(spec.operationId)) || [];
    return Boolean(
      evidence && isResult(result) && resultEvidence.get(result) === evidence
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

export function createFoundationalOwnerMechanicsApi(targetObject = globalThis, ownerSpecs = []) {
  const api = Object.create(null);
  for (const spec of ownerSpecs) {
    const mechanism = createMechanism(targetObject, spec);
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
