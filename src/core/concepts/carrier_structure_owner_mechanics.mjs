// Canonical typed carrier-structure chain. Shared code is mechanical only:
// every semantic owner below retains its own contract, Source/Result identity,
// execution evidence, and atom-bound validation route.

import { createGrammarOperationContractOwner } from "../grammar/operation_owner.mjs";

const freeze = Object.freeze;
const VERSION = 1;
const SOURCE_KEYS = new Set([
  "analysisDomain",
  "requestedAnalysisKind",
  "prerequisites",
  "participantChoice",
]);
const SEGMENT_SOURCE_KEYS = new Set([
  "carrierKind",
  "segmentClass",
  "classificationResult",
]);
const NON_AUTHORITY = freeze({
  lessonMetadataAuthority: false,
  storedExampleAuthority: false,
  storedAnswerAuthority: false,
  labelAuthority: false,
  hierarchyTableAuthority: false,
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

function definition(classification, facts, relation, checkpoint, unitConstructed = false) {
  return freeze({
    classification,
    facts: freeze(facts),
    relation,
    checkpoint,
    unitConstructed,
  });
}

function inspectRequest(request) {
  if (!request || typeof request !== "object" || Array.isArray(request)) {
    return "typed-owner-request-object-required";
  }
  const prototype = Object.getPrototypeOf(request);
  if (prototype !== Object.prototype && prototype !== null) {
    return "typed-owner-request-plain-object-required";
  }
  for (const key of Reflect.ownKeys(request)) {
    if (!SOURCE_KEYS.has(key)) return `typed-owner-request-unrecognized-key:${String(key)}`;
    const descriptor = Object.getOwnPropertyDescriptor(request, key);
    if (!descriptor || !Object.prototype.hasOwnProperty.call(descriptor, "value")) {
      return `typed-owner-request-data-property-required:${String(key)}`;
    }
  }
  return "";
}

function inspectSegmentRequest(request) {
  if (!request || typeof request !== "object" || Array.isArray(request)) {
    return "typed-carrier-segment-instance-request-object-required";
  }
  const prototype = Object.getPrototypeOf(request);
  if (prototype !== Object.prototype && prototype !== null) {
    return "typed-carrier-segment-instance-request-plain-object-required";
  }
  for (const key of Reflect.ownKeys(request)) {
    if (!SEGMENT_SOURCE_KEYS.has(key)) return `typed-carrier-segment-instance-request-unrecognized-key:${String(key)}`;
    const descriptor = Object.getOwnPropertyDescriptor(request, key);
    if (!descriptor || !Object.prototype.hasOwnProperty.call(descriptor, "value")) {
      return `typed-carrier-segment-instance-request-data-property-required:${String(key)}`;
    }
  }
  return "";
}

function existingResult(target, validatorName, value) {
  return typeof target?.[validatorName] === "function"
    && target[validatorName](value) === true
    && value?.authorizationStatus === "authorized";
}

function prerequisiteFailure(spec, analysisKind, prerequisites, participantChoice, support) {
  const fail = () => `${spec.ownerId}-owner-issued-prerequisites-required`;
  const p = prerequisites && typeof prerequisites === "object" ? prerequisites : {};
  if (spec.ownerId === "classical-syllable-structure") {
    const center = support.segmentDetails(p.centerSegmentResult);
    const fore = Array.isArray(p.foreMarginSegmentResults) ? p.foreMarginSegmentResults : [];
    const aft = Array.isArray(p.aftMarginSegmentResults) ? p.aftMarginSegmentResults : [];
    const margins = [...fore, ...aft].map(support.segmentDetails);
    if (!center || center.segmentClass !== "vowel" || margins.some((item) => !item || item.segmentClass !== "consonant")) return fail();
    if (!existingResult(support.target, "isClassicalCarrierRankTaxonomyResult", p.lowestRankResult)
      || p.lowestRankResult.rankTier !== "lowest"
      || !existingResult(support.target, "isClassicalCarrierRankTaxonomyResult", p.syllableRankResult)
      || p.syllableRankResult.rankTier !== "syllable") return fail();
    return "";
  }
  if (spec.ownerId === "carrier-vocable-structure") {
    const syllables = Array.isArray(p.syllableResults) ? p.syllableResults : [];
    if (!syllables.length || syllables.some((value) => !support.isOwnerResult("classical-syllable-structure", value))) return fail();
    if (!existingResult(support.target, "isClassicalCarrierRankTaxonomyResult", p.vocableRankResult)
      || p.vocableRankResult.rankTier !== "vocable") return fail();
    return "";
  }
  if (spec.ownerId === "carrier-rank-formation") {
    const source = support.unitDetails(p.sourceUnitResult);
    const target = support.unitDetails(p.targetUnitResult);
    if (!source || !target || source.rankOrdinal >= target.rankOrdinal) return fail();
    if (analysisKind === "single-unit-rank-upgrade" && target.constituentCount !== 1) return fail();
    return "";
  }
  if (spec.ownerId === "structural-unit-hierarchy") {
    if (analysisKind === "lower-to-higher-potential") {
      return support.isOwnerResult("carrier-rank-formation", p.rankFormationResult) ? "" : fail();
    }
    return existingResult(support.target, "isClassicalMeaninglessCarrierUnitClassificationResult", p.meaninglessFamilyResult)
      && existingResult(support.target, "isClassicalMeaningfulMorphemeUnitClassificationResult", p.meaningfulFamilyResult)
      ? "" : fail();
  }
  if (spec.ownerId === "carrier-vocable-prosody") {
    const details = support.unitDetails(p.vocableResult);
    return support.isOwnerResult("carrier-vocable-structure", p.vocableResult)
      && details?.constituentCount > 1
      && Number.isInteger(participantChoice)
      && participantChoice >= 0
      && participantChoice < details.constituentCount ? "" : fail();
  }
  if (spec.ownerId === "carrier-phonotactic-surface-constraints") {
    return support.isOwnerResult("classical-syllable-structure", p.carrierStructureResult)
      || support.isOwnerResult("carrier-vocable-structure", p.carrierStructureResult) ? "" : fail();
  }
  if (spec.ownerId === "nuclear-clause-morphosyntax-domain") {
    return existingResult(support.target, "isClassicalNahuatlNuclearClauseResult", p.nuclearClauseResult)
      && p.nuclearClauseResult?.predicateFrame?.predicateKind
      && p.nuclearClauseResult?.predicateFrame?.stateBelongsTo === "predicate"
      && ["pers1", "pers2", "stem"].every((slot) => p.nuclearClauseResult?.formulaSlots?.includes(slot)) ? "" : fail();
  }
  if (spec.ownerId === "nahuatl-group-composition") {
    const particles = Array.isArray(p.particleResults) ? p.particleResults : [];
    const clauses = Array.isArray(p.nuclearClauseResults) ? p.nuclearClauseResults : [];
    const particleOk = particles.every((value) => existingResult(support.target, "isClassicalNahuatlParticleResultFrame", value));
    const clauseOk = clauses.every((value) => existingResult(support.target, "isClassicalNahuatlNuclearClauseResult", value));
    const inventoryOk = analysisKind === "particles-only" ? particles.length > 0 && clauses.length === 0
      : analysisKind === "particles-and-nuclear-clause" ? particles.length > 0 && clauses.length === 1
        : particles.length === 0 && clauses.length > 1;
    return particleOk && clauseOk && inventoryOk ? "" : fail();
  }
  if (spec.ownerId === "nahuatl-syntax-domain-onset") {
    return support.isOwnerResult("nahuatl-group-composition", p.groupResult) ? "" : fail();
  }
  if (spec.ownerId === "nahuatl-structure-level-distribution") {
    return existingResult(support.target, "isClassicalStockMediatedStemFormationResult", p.morphologicalStructureResult)
      && support.isOwnerResult("nuclear-clause-morphosyntax-domain", p.morphosyntacticalStructureResult)
      && support.isOwnerResult("nahuatl-group-composition", p.syntacticalStructureResult) ? "" : fail();
  }
  return fail();
}

function prerequisiteOwnerIds(spec, analysisKind, prerequisites, support) {
  const p = prerequisites || {};
  if (spec.ownerId === "classical-syllable-structure") {
    const segments = [p.centerSegmentResult, ...(p.foreMarginSegmentResults || []), ...(p.aftMarginSegmentResults || [])]
      .map(support.segmentDetails).filter(Boolean);
    return [...new Set([
      ...segments.map((item) => item.carrierKind === "phone" ? "phone-repertory-analysis" : "carrier-phoneme-classification"),
      "carrier-rank-taxonomy",
    ])];
  }
  if (spec.ownerId === "carrier-vocable-structure") return ["classical-syllable-structure", "carrier-rank-taxonomy"];
  if (spec.ownerId === "carrier-rank-formation") return [support.ownerIdFor(p.sourceUnitResult), support.ownerIdFor(p.targetUnitResult)].filter(Boolean);
  if (spec.ownerId === "structural-unit-hierarchy") return analysisKind === "lower-to-higher-potential"
    ? ["carrier-rank-formation"] : ["meaningless-carrier-unit-classification", "meaningful-morpheme-unit-classification"];
  if (spec.ownerId === "carrier-vocable-prosody") return ["carrier-vocable-structure"];
  if (spec.ownerId === "carrier-phonotactic-surface-constraints") return [support.ownerIdFor(p.carrierStructureResult)].filter(Boolean);
  if (spec.ownerId === "nuclear-clause-morphosyntax-domain") return ["classical-nuclear-clause-structure"];
  if (spec.ownerId === "nahuatl-group-composition") return [
    ...(p.particleResults?.length ? ["classical-particle-lexicon"] : []),
    ...(p.nuclearClauseResults?.length ? ["classical-nuclear-clause-structure"] : []),
  ];
  if (spec.ownerId === "nahuatl-syntax-domain-onset") return ["nahuatl-group-composition"];
  if (spec.ownerId === "nahuatl-structure-level-distribution") return ["stock-mediated-stem-formation", "nuclear-clause-morphosyntax-domain", "nahuatl-group-composition"];
  return [];
}

function unitPayload(spec, analysisKind, prerequisites, participantChoice, support) {
  const p = prerequisites || {};
  if (spec.ownerId === "classical-syllable-structure") {
    const marginCount = (p.foreMarginSegmentResults?.length || 0) + (p.aftMarginSegmentResults?.length || 0);
    return { unitKind: "carrier-syllable-unit", unitRank: "syllable", rankOrdinal: 2, constituentCount: 1 + marginCount, hierarchyFamily: "meaningless" };
  }
  if (spec.ownerId === "carrier-vocable-structure") {
    return { unitKind: "carrier-vocable-unit", unitRank: "vocable", rankOrdinal: 3, constituentCount: p.syllableResults?.length || 0, hierarchyFamily: "meaningless" };
  }
  if (spec.ownerId === "nahuatl-group-composition") {
    return { unitKind: "nahuatl-group-unit", unitRank: "group", rankOrdinal: 6, constituentCount: (p.particleResults?.length || 0) + (p.nuclearClauseResults?.length || 0), hierarchyFamily: "meaningful" };
  }
  if (spec.ownerId === "carrier-vocable-prosody") return { stressedSyllableIndex: participantChoice };
  return {};
}

function createMechanism(spec, support) {
  const issuedSources = new WeakSet();
  const sourceContexts = new WeakMap();
  const issuedResults = new WeakSet();
  const resultContexts = new WeakMap();
  const resultEvidence = new WeakMap();
  const owner = createGrammarOperationContractOwner({ ownerId: spec.ownerId, domain: spec.ownerId });
  const contract = owner.buildContract({
    operationId: spec.operationId,
    operationType: "establish",
    consumesFrameKinds: [`${spec.ownerId}-source`],
    producesFrameKind: `${spec.ownerId}-result`,
    effectScopes: ["typed-prerequisite-validation", "owner-specific-structure"],
    outputKinds: ["typed-result"],
    authorityRefs: ["andrews-carrier-structure-chain"],
    description: `Execute ${spec.ownerId} from owner-issued typed prerequisites.`,
  });

  function buildSource(request = {}) {
    const requestReason = inspectRequest(request);
    const analysisDomain = requestReason ? "" : String(request.analysisDomain || "");
    const analysisKind = requestReason ? "" : String(request.requestedAnalysisKind || "");
    const definitionValue = spec.analyses[analysisKind] || null;
    const domainReason = analysisDomain === spec.domain ? "" : `${spec.ownerId}-analysis-domain-required`;
    const analysisReason = definitionValue ? "" : `${spec.ownerId}-analysis-kind-required`;
    const prerequisiteReason = requestReason || domainReason || analysisReason ? "" : prerequisiteFailure(
      spec, analysisKind, request.prerequisites, request.participantChoice, support,
    );
    const reason = requestReason || domainReason || analysisReason || prerequisiteReason;
    const source = deepFreeze({
      kind: `${spec.ownerId}-source`,
      version: VERSION,
      analysisDomain,
      requestedAnalysisKind: analysisKind,
      prerequisites: request.prerequisites || null,
      participantChoice: request.participantChoice ?? null,
      authorizationStatus: reason ? "blocked" : "authorized",
      blockReason: reason,
      ...NON_AUTHORITY,
    });
    issuedSources.add(source);
    sourceContexts.set(source, deepFreeze({ definitionValue, reason }));
    return source;
  }

  function isSource(source = null) {
    const context = sourceContexts.get(source) || null;
    return Boolean(source && issuedSources.has(source) && context && !context.reason
      && source.kind === `${spec.ownerId}-source` && source.authorizationStatus === "authorized"
      && source.blockReason === "" && Object.isFrozen(source));
  }

  function evaluate(source = null) {
    const sourceIssued = issuedSources.has(source);
    const context = sourceContexts.get(source) || null;
    const reason = !sourceIssued ? `owner-issued-${spec.ownerId}-source-required` : source.blockReason || context?.reason || "";
    const prerequisitesValid = !reason;
    const authorized = sourceIssued && context && prerequisitesValid && isSource(source);
    const value = authorized ? context.definitionValue : null;
    const prerequisiteIds = authorized ? prerequisiteOwnerIds(spec, source.requestedAnalysisKind, source.prerequisites, support) : [];
    const inputState = deepFreeze({ analysisDomain: source?.analysisDomain || "", requestedAnalysisKind: source?.requestedAnalysisKind || "" });
    const routeSteps = [
      deepFreeze({ stepId: `${spec.ownerId}-source-admitted`, kind: "source", actorId: spec.ownerId, status: sourceIssued ? "accepted" : "rejected", reason: sourceIssued ? `owner-issued-${spec.ownerId}-source` : reason, branchId: `${spec.ownerId}-source-authority`, decision: sourceIssued ? "admit" : "reject", evaluatedRuleIds: [], executedRuleIds: [], inputState, outputState: { sourceIssued } }),
      deepFreeze({ stepId: `${spec.ownerId}-semantic-owner-selected`, kind: "semantic-owner", actorId: spec.ownerId, status: sourceIssued ? "selected" : "rejected", reason: sourceIssued ? `${spec.ownerId}-jurisdiction-selected` : reason, branchId: `${spec.ownerId}-owner-jurisdiction`, decision: sourceIssued ? spec.ownerId : "no-owner", evaluatedRuleIds: [], executedRuleIds: [], inputState, outputState: { ownerId: sourceIssued ? spec.ownerId : "" } }),
      deepFreeze({ stepId: `${spec.ownerId}-typed-prerequisites-validated`, kind: "guard", actorId: spec.ownerId, invocationRole: "current", status: authorized ? "accepted" : sourceIssued ? "rejected" : "skipped", reason: authorized ? "identity-bound-prerequisites-accepted" : reason, branchId: `${spec.ownerId}-prerequisites`, decision: authorized ? "consume" : sourceIssued ? "reject" : "skip", evaluatedRuleIds: sourceIssued ? [spec.operationId] : [], executedRuleIds: [], inputState, outputState: { prerequisiteOwnerIds: prerequisiteIds } }),
    ];
    for (const [analysisKind, candidate] of Object.entries(spec.analyses)) {
      const applicable = authorized && source.requestedAnalysisKind === analysisKind;
      routeSteps.push(deepFreeze({ stepId: candidate.checkpoint, kind: "branch", actorId: spec.ownerId, invocationRole: "current", status: applicable ? "evaluated" : "not-applicable", reason: applicable ? `${analysisKind}-claim-retained` : `${analysisKind}-not-requested`, branchId: `${spec.ownerId}-${analysisKind}`, decision: applicable ? "retain" : "not-applicable", evaluatedRuleIds: authorized ? [spec.operationId] : [], executedRuleIds: [], inputState, outputState: { checkpointSatisfied: applicable } }));
    }
    const finalStepId = authorized ? `${spec.ownerId}-executed` : `${spec.ownerId}-rejected`;
    routeSteps.push(deepFreeze({ stepId: finalStepId, kind: authorized ? "operation" : "guard", actorId: spec.ownerId, invocationRole: "current", status: authorized ? "executed" : "rejected", reason: authorized ? `${spec.ownerId}-executed` : reason, branchId: `${spec.ownerId}-outcome`, decision: authorized ? "establish" : "reject", evaluatedRuleIds: sourceIssued ? [spec.operationId] : [], executedRuleIds: authorized ? [spec.operationId] : [], inputState, outputState: { classificationStatus: authorized ? `established-${spec.ownerId}` : `${spec.ownerId}-rejected` } }));
    const frozenSteps = deepFreeze(routeSteps);
    const execution = deepFreeze({ status: authorized ? "authorized" : "rejected", reason: reason || null, semanticOwnerId: spec.ownerId, operationId: spec.operationId, selectedRuleId: authorized ? spec.operationId : null, stages: frozenSteps.map((step) => step.stepId), routeSteps: frozenSteps });
    const evidence = deepFreeze({ ownerId: spec.ownerId, evaluatedOperationId: spec.operationId, inputContract: spec.inputContract, functionIds: [`build${spec.prefix}Source`, `evaluate${spec.prefix}`], providedInput: inputState, execution, routeSteps: frozenSteps, outcome: { status: execution.status, reason: execution.reason } });
    const payload = authorized ? unitPayload(spec, source.requestedAnalysisKind, source.prerequisites, source.participantChoice, support) : {};
    const result = deepFreeze({
      kind: `${spec.ownerId}-result`, version: VERSION, authorizationStatus: authorized ? "authorized" : "blocked", blockReason: reason,
      semanticOwnerId: spec.ownerId, operationId: spec.operationId, operationContract: contract,
      classificationStatus: authorized ? `established-${spec.ownerId}` : `${spec.ownerId}-rejected`,
      analysisKind: authorized ? source.requestedAnalysisKind : "", classification: value?.classification || "",
      facts: [...(value?.facts || [])], relations: value ? [value.relation] : [],
      restrictions: [`${spec.ownerId}-requires-owner-issued-typed-prerequisites`, "copied-results-labels-tables-examples-formulas-and-surfaces-are-non-authorizing", "supporting-prerequisites-do-not-own-or-transfer-this-owner-proof"],
      coordinates: authorized ? { analysisDomain: source.analysisDomain, requestedAnalysisKind: source.requestedAnalysisKind } : {},
      prerequisiteOwnerIds: prerequisiteIds, ownerExecutionCompleted: authorized,
      unitConstructed: authorized && value?.unitConstructed === true, boundaryRewritten: false, soundedSurfaceGenerated: false, writtenSurfaceGenerated: false, formulaGenerated: false,
      ...NON_AUTHORITY, ...payload,
    });
    issuedResults.add(result);
    resultContexts.set(result, deepFreeze({ source, payload }));
    resultEvidence.set(result, evidence);
    return result;
  }

  function isResult(result = null) {
    return Boolean(result && issuedResults.has(result) && result.semanticOwnerId === spec.ownerId
      && result.operationId === spec.operationId && owner.isContractIssued(result.operationContract)
      && result.generationAllowed === false && result.writtenSurfaceGenerated === false
      && result.formulaGenerated === false && Object.isFrozen(result));
  }
  function getEvidence(result = null) { return resultEvidence.get(result) || null; }
  function isEvidence(evidence = null, result = null) {
    const executed = evidence?.routeSteps?.filter((step) => step.invocationRole !== "prerequisite" && step.executedRuleIds?.includes(spec.operationId)) || [];
    return Boolean(evidence && isResult(result) && resultEvidence.get(result) === evidence
      && evidence.ownerId === spec.ownerId && evidence.evaluatedOperationId === spec.operationId
      && evidence.execution?.routeSteps === evidence.routeSteps
      && (result.authorizationStatus === "authorized" ? executed.length === 1 && executed[0].stepId === `${spec.ownerId}-executed` : executed.length === 0)
      && Object.isFrozen(evidence));
  }
  function isContract(contractValue = null) {
    return owner.isContractIssued(contractValue);
  }
  return deepFreeze({ spec, buildSource, isSource, evaluate, isResult, isContract, getEvidence, isEvidence, internal(result) { return resultContexts.get(result) || null; } });
}

function publicNames(prefix) {
  return freeze({ build: `build${prefix}Source`, isSource: `is${prefix}Source`, evaluate: `evaluate${prefix}`, isResult: `is${prefix}Result`, isContract: `is${prefix}OperationContract`, getEvidence: `get${prefix}ExecutionEvidence`, isEvidence: `is${prefix}ExecutionEvidence` });
}

export function createCarrierStructureOwnerMechanicsApi(targetObject = globalThis, ownerSpecs = []) {
  const mechanisms = new Map();
  const segmentSources = new WeakSet();
  const segmentSourceContexts = new WeakMap();
  const segmentResults = new WeakSet();
  const segmentResultContexts = new WeakMap();
  const segmentOwner = createGrammarOperationContractOwner({ ownerId: "classical-syllable-structure", domain: "classical-syllable-structure" });
  const segmentContract = segmentOwner.buildContract({ operationId: "classical.carrier.segment.instance.issue", operationType: "establish", consumesFrameKinds: ["carrier-type-classification-result"], producesFrameKind: "typed-carrier-segment-instance-result", effectScopes: ["typed-instance-admission"], outputKinds: ["typed-instance-result"], authorityRefs: ["andrews-carrier-segment-instance-prerequisite"], description: "Issue a phoneme or phone instance for syllable composition without generating a surface." });

  const support = {
    target: targetObject,
    isOwnerResult(ownerId, result) {
      return mechanisms.get(ownerId)?.isResult(result) === true
        && result?.authorizationStatus === "authorized"
        && result?.ownerExecutionCompleted === true;
    },
    ownerIdFor(result) {
      if (segmentResults.has(result)) return "classical-syllable-structure";
      for (const [ownerId, mechanism] of mechanisms) if (mechanism.isResult(result)) return ownerId;
      return result?.semanticOwnerId || "";
    },
    segmentDetails(result) { return segmentResultContexts.get(result) || null; },
    unitDetails(result) {
      const segment = segmentResultContexts.get(result);
      if (segment) return { rankOrdinal: 1, unitRank: "lowest", constituentCount: 1 };
      for (const mechanism of mechanisms.values()) {
        const context = mechanism.internal(result);
        if (context) return context.payload;
      }
      return null;
    },
  };
  for (const spec of ownerSpecs) mechanisms.set(spec.ownerId, createMechanism(spec, support));

  function buildClassicalCarrierSegmentInstanceSource(request = {}) {
    const requestReason = inspectSegmentRequest(request);
    const carrierKind = String(request?.carrierKind || "");
    const segmentClass = String(request?.segmentClass || "");
    const classificationResult = request?.classificationResult || null;
    const classificationValid = existingResult(targetObject, "isClassicalGrammarConceptResult", classificationResult)
      && ((carrierKind === "phoneme" && classificationResult.semanticOwnerId === "carrier-phoneme-classification" && classificationResult.selection === "phoneme")
        || (carrierKind === "phone" && classificationResult.semanticOwnerId === "phone-repertory-analysis" && classificationResult.selection === "phone-definition"));
    const reason = requestReason || (!["phoneme", "phone"].includes(carrierKind) || !["vowel", "consonant"].includes(segmentClass) || !classificationValid
      ? "owner-issued-phoneme-or-phone-classification-result-required" : "");
    const source = deepFreeze({ kind: "classical-carrier-segment-instance-source", version: VERSION, carrierKind, segmentClass, classificationResult, authorizationStatus: reason ? "blocked" : "authorized", blockReason: reason, ...NON_AUTHORITY });
    segmentSources.add(source);
    segmentSourceContexts.set(source, deepFreeze({ reason }));
    return source;
  }
  function evaluateClassicalCarrierSegmentInstance(source = null) {
    const issued = segmentSources.has(source);
    const reason = !issued ? "owner-issued-carrier-segment-instance-source-required" : source.blockReason || segmentSourceContexts.get(source)?.reason || "";
    const authorized = issued && !reason;
    const result = deepFreeze({ kind: "classical-carrier-segment-instance-result", version: VERSION, authorizationStatus: authorized ? "authorized" : "blocked", blockReason: reason, semanticOwnerId: "classical-syllable-structure", operationId: "classical.carrier.segment.instance.issue", operationContract: segmentContract, carrierKind: authorized ? source.carrierKind : "", segmentClass: authorized ? source.segmentClass : "", unitKind: authorized ? `${source.segmentClass}-${source.carrierKind}-instance` : "", unitRank: authorized ? "lowest" : "", rankOrdinal: authorized ? 1 : 0, hierarchyFamily: authorized ? "meaningless" : "", unitConstructed: authorized, supportingPrerequisiteOnly: true, ...NON_AUTHORITY, soundedSurfaceGenerated: false, writtenSurfaceGenerated: false, formulaGenerated: false });
    segmentResults.add(result);
    segmentResultContexts.set(result, authorized ? deepFreeze({ carrierKind: source.carrierKind, segmentClass: source.segmentClass }) : null);
    return result;
  }
  function isClassicalCarrierSegmentInstanceResult(result = null) {
    return Boolean(result && segmentResults.has(result) && result.semanticOwnerId === "classical-syllable-structure" && segmentOwner.isContractIssued(result.operationContract) && result.supportingPrerequisiteOnly === true && Object.isFrozen(result));
  }

  const api = Object.create(null);
  Object.assign(api, { buildClassicalCarrierSegmentInstanceSource, evaluateClassicalCarrierSegmentInstance, isClassicalCarrierSegmentInstanceResult });
  for (const mechanism of mechanisms.values()) {
    const names = publicNames(mechanism.spec.prefix);
    api[names.build] = mechanism.buildSource;
    api[names.isSource] = mechanism.isSource;
    api[names.evaluate] = mechanism.evaluate;
    api[names.isResult] = mechanism.isResult;
    api[names.isContract] = mechanism.isContract;
    api[names.getEvidence] = mechanism.getEvidence;
    api[names.isEvidence] = mechanism.isEvidence;
  }
  return freeze(api);
}
