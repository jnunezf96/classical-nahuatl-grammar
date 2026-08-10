import { createHash } from "node:crypto";

const freeze = Object.freeze;

function sha256(value) {
  return `sha256:${createHash("sha256").update(String(value)).digest("hex")}`;
}

function deepEqual(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function broadCompletionExpectationMatches(projection, expected) {
  const payload = projection?.payload || {};
  const facetValue = payload.facetValue;
  if (deepEqual(facetValue, expected)) return true;
  if (payload.broadCompletionProxyRetired !== true
    || !facetValue
    || typeof facetValue !== "object"
    || Array.isArray(facetValue)) {
    return false;
  }
  const normalized = (value) => String(value || "")
    .replace(/[^a-z0-9]+/giu, "")
    .toLowerCase();
  const sourceLeaf = String(payload.sourceCanonicalPath || "").split(".").at(-1);
  const eligibleLeaves = new Set([
    normalized(payload.broadCompletionLeaf),
    normalized(sourceLeaf),
  ].filter(Boolean));
  const matchedKey = Object.keys(facetValue).find((key) =>
    eligibleLeaves.has(normalized(key)));
  return Boolean(matchedKey) && deepEqual(facetValue[matchedKey], expected);
}

function routeToken(value, fallback = "unselected") {
  const token = String(value || "")
    .normalize("NFKD")
    .replace(/[^a-z0-9._-]+/giu, "-")
    .replace(/^-+|-+$/gu, "")
    .toLowerCase();
  return token || fallback;
}

export function createRoutineSemanticOwnerOracle(config) {
  const oracleContract = freeze({
    schemaVersion: 1,
    oracleId: `${config.ownerId}.independent-canvas-oracle`,
    ownerId: config.ownerId,
    engineAccess: "forbidden",
    sourceBindingFile: `validation/oracles/${config.ownerId}.canvas-bindings.json`,
    authority: "ANDREWS_TRANSCRIPTION_CANVAS.md",
    inputContract: config.inputContract,
    allowedInputFields: freeze(["scenario", "sourceAuthority"]),
    prohibitedInputFields: freeze([
      "expected", "answer", "operationId", "selectedRuleId", "formula", "surface",
    ]),
  });

  function validateCanvasBindings({ canvasText, bindingDocument }) {
    const errors = [];
    if (bindingDocument?.schemaVersion !== 1) errors.push("binding-schema-version");
    if (bindingDocument?.ownerId !== config.ownerId) errors.push("binding-owner");
    if (bindingDocument?.authority !== "ANDREWS_TRANSCRIPTION_CANVAS.md") {
      errors.push("binding-authority");
    }
    const lines = String(canvasText || "").split(/\r?\n/u);
    const bindingDigests = Object.create(null);
    const seen = new Set();
    for (const binding of bindingDocument?.bindings || []) {
      if (!binding?.bindingId || seen.has(binding.bindingId)) {
        errors.push("binding-id-missing-or-duplicate");
        continue;
      }
      seen.add(binding.bindingId);
      const sourceText = lines.slice(binding.startLine - 1, binding.endLine).join("\n");
      const digest = sha256(sourceText);
      if (digest !== binding.sourceDigest) errors.push(`${binding.bindingId}:source-digest-mismatch`);
      if (binding.status !== "bound-current") errors.push(`${binding.bindingId}:status-not-current`);
      for (const required of binding.requiredText || []) {
        if (!sourceText.includes(required)) errors.push(`${binding.bindingId}:required-text-missing`);
      }
      bindingDigests[binding.bindingId] = digest;
    }
    for (const atomId of config.atomIds) {
      if (!seen.has(`canvas-binding:${config.ownerId}:${atomId}`)) {
        errors.push(`required-binding-missing:${atomId}`);
      }
    }
    return freeze({
      valid: errors.length === 0,
      errors: freeze(errors),
      canvasDigest: sha256(canvasText || ""),
      bindingDocumentDigest: sha256(JSON.stringify(bindingDocument || null)),
      bindingDigests: freeze(bindingDigests),
    });
  }

  function isPositive(source) {
    return source.sourceAuthority === "owner-issued-source"
      && Object.prototype.hasOwnProperty.call(config.expectedByScenario, source.scenario);
  }

  function rejectionReason(source) {
    if (source.sourceAuthority !== "owner-issued-source") {
      return `owner-issued-${config.ownerId}-source-required`;
    }
    return `${config.ownerId}-licensed-semantic-coordinate-required`;
  }

  function positiveMatch(source, execution, projection) {
    const expected = config.expectedByScenario[source.scenario];
    const final = execution?.routeSteps?.find(step =>
      step.invocationRole !== "prerequisite"
      && step.stepId === `${config.ownerId}-executed`);
    const canonical = projection?.payload?.canonicalExecution || null;
    return Boolean(expected)
      && execution?.status === "authorized"
      && execution.reason === null
      && execution.semanticOwnerId === config.ownerId
      && execution.operationId === config.operationId
      && projection?.authorizationStatus === "authorized"
      && projection.blockReason === ""
      && projection.semanticOwnerId === config.ownerId
      && projection.operationId === config.operationId
      && projection.analysisKind === expected.facet
      && projection.participantChoice === expected.participantChoice
      && projection.coordinates?.selection === expected.selection
      && projection.coordinates?.requestedFacet === expected.facet
      && projection.payload?.semanticAssertionId === expected.assertionId
      && (config.declarationSchemaVersion < 2
        || broadCompletionExpectationMatches(projection, expected.oracleExpectation))
      && (!expected.canonicalStatus
        || canonical?.authorizationStatus === expected.canonicalStatus)
      && projection.ownerExecutionCompleted === true
      && projection.generationAllowed === false
      && projection.soundedSurfaceGenerated === false
      && (expected.canonicalStatus === "blocked"
        ? projection.boundaryRewritten === false
          && projection.writtenSurfaceGenerated === false
          && projection.formulaGenerated === false
        : true)
      && final?.status === "executed"
      && final.executedRuleIds?.includes(config.operationId)
      && execution.routeSteps.some(step =>
        step.stepId === `${config.ownerId}-${routeToken(expected.facet)}-checkpoint`
        && step.status === "evaluated");
  }

  function guardMatch(source, execution, projection) {
    const reason = rejectionReason(source);
    const final = execution?.routeSteps?.find(step =>
      step.invocationRole !== "prerequisite"
      && step.stepId === `${config.ownerId}-rejected`);
    return !isPositive(source)
      && execution?.status === "rejected"
      && execution.reason === reason
      && execution.semanticOwnerId === config.ownerId
      && execution.operationId === config.operationId
      && execution.selectedRuleId === null
      && projection?.authorizationStatus === "blocked"
      && projection.blockReason === reason
      && projection.ownerExecutionCompleted === false
      && final?.status === "rejected"
      && final.reason === reason
      && final.executedRuleIds?.length === 0;
  }

  function evaluateOracle({ oracle, caseResult, bindingValidation }) {
    const source = caseResult.sourceIdentity || {};
    const execution = caseResult.execution || null;
    const projection = caseResult.projection || null;
    const bindingIds = freeze([...(oracle.canvasBindingIds || [])]);
    const canvasBindingsValid = bindingValidation?.valid === true
      && bindingIds.every(id => bindingValidation.bindingDigests?.[id]?.startsWith("sha256:"));
    const assignedScenarios = config.scenariosByAtom[oracle.atomId] || [];
    const semanticMatch = oracle.role === "semantic-output"
      ? positiveMatch(source, execution, projection)
        && assignedScenarios.includes(source.scenario)
      : oracle.role === "domain-guard" ? guardMatch(source, execution, projection) : false;
    const passed = canvasBindingsValid && semanticMatch;
    const observed = freeze({
      status: execution?.status || null,
      reason: execution?.reason ?? null,
      semanticOwnerId: execution?.semanticOwnerId || null,
      operationId: execution?.operationId || null,
      coordinates: freeze({ ...(projection?.coordinates || {}) }),
      semanticAssertionId: projection?.payload?.semanticAssertionId || null,
      facetValue: projection?.payload?.facetValue,
      canonicalExecution: freeze({ ...(projection?.payload?.canonicalExecution || {}) }),
      stages: freeze([...(execution?.stages || [])]),
    });
    const evidence = freeze({
      atomId: oracle.atomId,
      claimDigest: oracle.claimDigest,
      oracleId: oracle.oracleId,
      oracleRole: oracle.role,
      sourceAuthority: source.sourceAuthority || null,
      inputContract: config.inputContract,
      canvasBindingIds: bindingIds,
      canvasBindingDigests: freeze(Object.fromEntries(bindingIds.map(id => [
        id, bindingValidation?.bindingDigests?.[id] || null,
      ]))),
      canvasBindingDocumentDigest: bindingValidation?.bindingDocumentDigest || null,
      canvasBindingsValid,
      observed,
      passed,
    });
    return {
      passed, observed, observedIdentity: observed, evidence, evidenceIdentity: evidence,
      validateEvidence(candidate) {
        return candidate === evidence
          && candidate.atomId === oracle.atomId
          && candidate.claimDigest === oracle.claimDigest
          && candidate.canvasBindingsValid === true
          && candidate.passed === passed;
      },
    };
  }

  function evaluateMutationEvidence({ mutation, mutationObservations, bindingValidation }) {
    if (bindingValidation?.valid !== true) throw new Error(`${config.ownerId}:canvas-bindings-invalid`);
    const killedByCaseIds = mutationObservations.filter(observation =>
      isPositive(observation.sourceIdentity)
        ? !positiveMatch(observation.sourceIdentity, observation.execution, observation.projection)
        : !guardMatch(observation.sourceIdentity, observation.execution, observation.projection))
      .map(observation => observation.caseId);
    const killed = killedByCaseIds.length > 0;
    const evidence = freeze({
      mutationId: mutation.mutationId,
      category: mutation.category,
      killed,
      killedByCaseIds: freeze(killedByCaseIds),
      observationCount: mutationObservations.length,
      oracleBasis: `exact-Canvas-${config.ownerId}-coordinate-route-and-hostile-boundary`,
    });
    return {
      status: killed ? "killed" : "survived",
      independentlyReviewed: true,
      killedByCaseIds,
      evidence,
      evidenceIdentity: evidence,
      validateEvidence(candidate) {
        return candidate === evidence
          && candidate.mutationId === mutation.mutationId
          && candidate.killed === killed;
      },
    };
  }

  return freeze({
    oracleContract, validateCanvasBindings, evaluateOracle,
    evaluateMutationEvidence, sha256, deepEqual,
  });
}

export const createLesson2OwnerOracle = createRoutineSemanticOwnerOracle;
