// Internal owner for canonical semantic grammar-operation contracts.
// This module deliberately exposes no caller-mintable contract builder or
// runtime installer. Domain owners receive a private issuer/evaluator pair.

import {
  registerCanonicalIdentitySurface,
  resolveCanonicalIdentity,
} from "./canonical_identity_registry.mjs";

const GRAMMAR_OPERATION_CONTRACT_VERSION = 1;
const GRAMMAR_OPERATION_TYPES = Object.freeze([
  "establish",
  "select",
  "transform",
  "realize",
  "compose",
]);

const GRAMMAR_OPERATION_CONTRACT_OWNER_BY_FRAME = new WeakMap();

function normalizeGrammarOperationToken(value = "") {
  return String(value == null ? "" : value).trim();
}

function normalizeGrammarOperationList(values = []) {
  return Object.freeze(Array.from(new Set((Array.isArray(values) ? values : [])
    .map(normalizeGrammarOperationToken)
    .filter(Boolean))));
}

function hasCurriculumIdentity(value = "") {
  return /(^|[-_\s])(?:lessons?[-_\s]?|l)\d+(?:[-_\s]|$)/iu.test(normalizeGrammarOperationToken(value));
}

function buildGrammarOperationContractFrame({
  operationId = "",
  domain = "",
  operationType = "transform",
  consumesFrameKinds = [],
  producesFrameKind = "",
  prerequisites = [],
  effectScopes = [],
  outputKinds = [],
  authorityRefs = [],
  description = "",
} = {}, {
  ownerId = "",
  ownerIdentity = null,
} = {}) {
  const normalizedOperationId = normalizeGrammarOperationToken(operationId);
  const normalizedDomain = normalizeGrammarOperationToken(domain);
  const normalizedOperationType = normalizeGrammarOperationToken(operationType);
  const normalizedProducesFrameKind = normalizeGrammarOperationToken(producesFrameKind);
  const normalizedPrerequisites = normalizeGrammarOperationList(prerequisites);
  const normalizedOutputKinds = normalizeGrammarOperationList(outputKinds);
  const normalizedOwnerId = normalizeGrammarOperationToken(ownerId);
  const invalidReasons = [];

  if (!normalizedOperationId) invalidReasons.push("grammar-operation-id-required");
  if (hasCurriculumIdentity(normalizedOperationId)) invalidReasons.push("grammar-operation-id-cannot-be-a-lesson");
  if (!normalizedDomain) invalidReasons.push("grammar-operation-domain-required");
  if (!GRAMMAR_OPERATION_TYPES.includes(normalizedOperationType)) invalidReasons.push("grammar-operation-type-unrecognized");
  if (!normalizedProducesFrameKind) invalidReasons.push("grammar-operation-output-frame-required");
  if (normalizedPrerequisites.some(hasCurriculumIdentity)) invalidReasons.push("grammar-operation-prerequisite-cannot-be-a-lesson");
  if (normalizedPrerequisites.includes(normalizedOperationId)) invalidReasons.push("grammar-operation-cannot-require-itself");
  if (!normalizedOwnerId || !ownerIdentity) invalidReasons.push("grammar-operation-contract-owner-required");
  if (normalizedOwnerId && hasCurriculumIdentity(normalizedOwnerId)) invalidReasons.push("grammar-operation-contract-owner-cannot-be-a-lesson");

  const contract = Object.freeze({
    kind: "grammar-operation-contract",
    version: GRAMMAR_OPERATION_CONTRACT_VERSION,
    contractOwnerId: normalizedOwnerId,
    ownerIssued: Boolean(normalizedOwnerId && ownerIdentity),
    operationId: normalizedOperationId,
    domain: normalizedDomain,
    operationType: normalizedOperationType,
    consumesFrameKinds: normalizeGrammarOperationList(consumesFrameKinds),
    producesFrameKind: normalizedProducesFrameKind,
    prerequisites: normalizedPrerequisites,
    effectScopes: normalizeGrammarOperationList(effectScopes),
    outputKinds: normalizedOutputKinds,
    authorityRefs: normalizeGrammarOperationList(authorityRefs),
    description: normalizeGrammarOperationToken(description),
    authorizationStatus: invalidReasons.length ? "blocked" : "authorized",
    blockReason: invalidReasons[0] || "",
    invalidReasons: Object.freeze(invalidReasons),
    curriculumOrderAuthority: false,
    storedExampleAuthority: false,
  });
  if (!invalidReasons.length) {
    GRAMMAR_OPERATION_CONTRACT_OWNER_BY_FRAME.set(contract, ownerIdentity);
  }
  return contract;
}

function isGrammarOperationContract(value = null) {
  return Boolean(value
    && value.kind === "grammar-operation-contract"
    && value.version === GRAMMAR_OPERATION_CONTRACT_VERSION
    && value.ownerIssued === true
    && value.contractOwnerId
    && !hasCurriculumIdentity(value.contractOwnerId)
    && GRAMMAR_OPERATION_CONTRACT_OWNER_BY_FRAME.has(value)
    && value.authorizationStatus === "authorized"
    && value.operationId
    && value.domain
    && !hasCurriculumIdentity(value.operationId)
    && Array.isArray(value.prerequisites)
    && !value.prerequisites.some(hasCurriculumIdentity)
    && value.curriculumOrderAuthority === false
    && value.storedExampleAuthority === false);
}

function evaluateGrammarOperationPlanWithOwner({
  domain = "",
  contracts = [],
  appliedOperationIds = [],
  requiredOperationIds = [],
  resultOperationId = "",
  requestedOutputKind = "",
  sourceAuthorized = true,
  sourceBlockReason = "",
} = {}, isOwnerIssuedContract = () => false) {
  const normalizedDomain = normalizeGrammarOperationToken(domain);
  const normalizedAppliedIds = normalizeGrammarOperationList(appliedOperationIds);
  const normalizedRequiredIds = normalizeGrammarOperationList(requiredOperationIds);
  const normalizedResultOperationId = normalizeGrammarOperationToken(resultOperationId);
  const normalizedRequestedOutputKind = normalizeGrammarOperationToken(requestedOutputKind);
  const suppliedContracts = Array.isArray(contracts) ? contracts : [];
  const rejectedContracts = suppliedContracts.filter(contract => !isOwnerIssuedContract(contract));
  const rejectedContractOperationIds = rejectedContracts.map(contract => (
    normalizeGrammarOperationToken(contract?.operationId) || "unidentified-grammar-operation-contract"
  ));
  const normalizedContracts = suppliedContracts.filter(isOwnerIssuedContract);
  const contractById = new Map(normalizedContracts.map(contract => [contract.operationId, contract]));
  const duplicateContractIds = normalizedContracts
    .map(contract => contract.operationId)
    .filter((operationId, index, all) => all.indexOf(operationId) !== index);
  const unknownAppliedOperationIds = normalizedAppliedIds.filter(operationId => !contractById.has(operationId));
  const unknownRequiredOperationIds = normalizedRequiredIds.filter(operationId => !contractById.has(operationId));
  const wrongDomainOperationIds = normalizedContracts
    .filter(contract => contract.domain !== normalizedDomain)
    .map(contract => contract.operationId);
  const missingOperationIds = normalizedRequiredIds.filter(operationId => !normalizedAppliedIds.includes(operationId));
  const missingPrerequisites = [];
  const prerequisiteOrderViolations = [];

  normalizedAppliedIds.forEach((operationId, operationIndex) => {
    const contract = contractById.get(operationId);
    if (!contract) return;
    contract.prerequisites.forEach(prerequisiteId => {
      const prerequisiteIndex = normalizedAppliedIds.indexOf(prerequisiteId);
      if (prerequisiteIndex < 0) {
        missingPrerequisites.push(`${operationId}:${prerequisiteId}`);
      } else if (prerequisiteIndex >= operationIndex) {
        prerequisiteOrderViolations.push(`${operationId}:${prerequisiteId}`);
      }
    });
  });

  const resultContract = contractById.get(normalizedResultOperationId) || null;
  const resultOperationApplied = Boolean(resultContract && normalizedAppliedIds.includes(normalizedResultOperationId));
  const resultOperationIsLast = Boolean(resultOperationApplied && normalizedAppliedIds[normalizedAppliedIds.length - 1] === normalizedResultOperationId);
  const resultSupportsRequestedOutput = Boolean(resultContract
    && normalizedRequestedOutputKind
    && resultContract.outputKinds.includes(normalizedRequestedOutputKind));
  const invalidReasons = [
    !normalizedDomain ? "grammar-operation-domain-required" : "",
    rejectedContracts.length ? "grammar-operation-contract-not-owner-issued" : "",
    duplicateContractIds.length ? "duplicate-grammar-operation-contract" : "",
    wrongDomainOperationIds.length ? "grammar-operation-domain-mismatch" : "",
    unknownAppliedOperationIds.length ? "unknown-applied-grammar-operation" : "",
    unknownRequiredOperationIds.length ? "unknown-required-grammar-operation" : "",
    missingOperationIds.length ? "required-grammar-operation-not-applied" : "",
    missingPrerequisites.length ? "grammar-operation-prerequisite-missing" : "",
    prerequisiteOrderViolations.length ? "grammar-operation-prerequisite-order-invalid" : "",
    !normalizedResultOperationId ? "result-grammar-operation-required" : "",
    normalizedResultOperationId && !resultContract ? "result-grammar-operation-unregistered" : "",
    resultContract && !resultOperationApplied ? "result-grammar-operation-not-applied" : "",
    resultOperationApplied && !resultOperationIsLast ? "result-grammar-operation-not-last-applied" : "",
    !normalizedRequestedOutputKind ? "requested-output-kind-required" : "",
    resultContract && normalizedRequestedOutputKind && !resultSupportsRequestedOutput ? "result-operation-does-not-produce-requested-output" : "",
    sourceAuthorized !== true ? normalizeGrammarOperationToken(sourceBlockReason) || "grammar-operation-source-not-authorized" : "",
  ].filter(Boolean);

  return Object.freeze({
    kind: "grammar-operation-plan-evaluation-frame",
    version: GRAMMAR_OPERATION_CONTRACT_VERSION,
    domain: normalizedDomain,
    authorizationStatus: invalidReasons.length ? "blocked" : "authorized",
    blockReason: invalidReasons[0] || "",
    invalidReasons: Object.freeze(invalidReasons),
    requestedOutputKind: normalizedRequestedOutputKind,
    appliedOperationIds: normalizedAppliedIds,
    requiredOperationIds: normalizedRequiredIds,
    missingOperationIds: Object.freeze(missingOperationIds),
    unknownAppliedOperationIds: Object.freeze(unknownAppliedOperationIds),
    unknownRequiredOperationIds: Object.freeze(unknownRequiredOperationIds),
    rejectedContractOperationIds: Object.freeze(rejectedContractOperationIds),
    missingPrerequisites: Object.freeze(missingPrerequisites),
    prerequisiteOrderViolations: Object.freeze(prerequisiteOrderViolations),
    resultOperationId: normalizedResultOperationId,
    resultOperationApplied,
    resultOperationIsLast,
    resultSupportsRequestedOutput,
    contracts: Object.freeze(normalizedRequiredIds.map(operationId => contractById.get(operationId)).filter(Boolean)),
    curriculumOrderAuthority: false,
    storedExampleAuthority: false,
    operationSelectionAuthority: "semantic-grammar-prerequisites-and-requested-output",
  });
}

export function createGrammarOperationContractOwner({
  ownerId = "",
  domain = "",
} = {}) {
  const normalizedOwnerId = normalizeGrammarOperationToken(ownerId);
  const normalizedDomain = normalizeGrammarOperationToken(domain);
  const ownerIdentity = Object.freeze({});
  const ownerIdentityRecord = resolveCanonicalIdentity({
    namespace: "owner",
    semanticName: normalizedOwnerId,
    stableKey: normalizedOwnerId,
    currentLocation: "grammar-operation-owner.ownerId",
  });
  const domainIdentityRecord = resolveCanonicalIdentity({
    namespace: "domain",
    semanticName: normalizedDomain,
    stableKey: "owner-domain",
    scopeKey: ownerIdentityRecord.identityId,
    currentLocation: "grammar-operation-owner.domain",
  });
  registerCanonicalIdentitySurface(ownerIdentity, [
    ownerIdentityRecord,
    domainIdentityRecord,
  ], { source: "grammar-operation-owner" });

  function buildContract(options = {}) {
    const contract = buildGrammarOperationContractFrame({
      ...options,
      domain: normalizedDomain,
    }, {
      ownerId: normalizedOwnerId,
      ownerIdentity,
    });
    const operationIdentityRecord = resolveCanonicalIdentity({
      namespace: "operation",
      semanticName: contract.operationId,
      stableKey: "primary-operation",
      scopeKey: ownerIdentityRecord.identityId,
      currentLocation: "grammar-operation-contract.operationId",
    });
    const contractIdentityRecord = resolveCanonicalIdentity({
      namespace: "operation-contract",
      semanticName: `${normalizedOwnerId}:${contract.operationId}`,
      stableKey: "primary-operation-contract",
      scopeKey: ownerIdentityRecord.identityId,
      currentLocation: "grammar-operation-contract",
    });
    const records = [
      ownerIdentityRecord,
      domainIdentityRecord,
      operationIdentityRecord,
      contractIdentityRecord,
      ...contract.consumesFrameKinds.map((frameKind, index) =>
        resolveCanonicalIdentity({
          namespace: "frame-kind",
          semanticName: frameKind,
          stableKey: `consumes-frame-kind:${index}`,
          scopeKey: operationIdentityRecord.identityId,
          currentLocation: `grammar-operation-contract.consumesFrameKinds[${index}]`,
        })),
      resolveCanonicalIdentity({
        namespace: "result-kind",
        semanticName: contract.producesFrameKind,
        stableKey: "produces-frame-kind",
        scopeKey: operationIdentityRecord.identityId,
        currentLocation: "grammar-operation-contract.producesFrameKind",
      }),
      ...contract.prerequisites.map((operationId, index) =>
        resolveCanonicalIdentity({
          namespace: "operation",
          semanticName: operationId,
          stableKey: operationId,
          scopeKey: ownerIdentityRecord.identityId,
          currentLocation: `grammar-operation-contract.prerequisites[${index}]`,
        })),
      ...contract.effectScopes.map((scope, index) =>
        resolveCanonicalIdentity({
          namespace: "effect-scope",
          semanticName: scope,
          stableKey: scope,
          scopeKey: operationIdentityRecord.identityId,
          currentLocation: `grammar-operation-contract.effectScopes[${index}]`,
        })),
      ...contract.outputKinds.map((outputKind, index) =>
        resolveCanonicalIdentity({
          namespace: "output-kind",
          semanticName: outputKind,
          stableKey: outputKind,
          scopeKey: operationIdentityRecord.identityId,
          currentLocation: `grammar-operation-contract.outputKinds[${index}]`,
        })),
      ...contract.authorityRefs.map((authorityRef, index) =>
        resolveCanonicalIdentity({
          namespace: "authority-reference",
          semanticName: authorityRef,
          stableKey: authorityRef,
          scopeKey: operationIdentityRecord.identityId,
          currentLocation: `grammar-operation-contract.authorityRefs[${index}]`,
        })),
    ];
    registerCanonicalIdentitySurface(contract, records, {
      source: "grammar-operation-contract",
    });
    return contract;
  }

  function isContractIssued(contract = null) {
    return Boolean(
      isGrammarOperationContract(contract)
      && GRAMMAR_OPERATION_CONTRACT_OWNER_BY_FRAME.get(contract) === ownerIdentity
      && contract.contractOwnerId === normalizedOwnerId
      && contract.domain === normalizedDomain
    );
  }

  function evaluatePlan(options = {}) {
    return evaluateGrammarOperationPlanWithOwner({
      ...options,
      domain: normalizedDomain,
    }, isContractIssued);
  }

  return Object.freeze({
    ownerId: normalizedOwnerId,
    domain: normalizedDomain,
    buildContract,
    isContractIssued,
    evaluatePlan,
  });
}
