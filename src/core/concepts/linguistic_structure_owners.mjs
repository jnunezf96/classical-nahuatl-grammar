// Independent read-only owners for comparative word rank and general structure.
// This catalog shares mechanics only: each definition creates a distinct Source,
// Result, operation contract, identity store, route, and evidence boundary.

import { createGrammarOperationContractOwner } from "../grammar/operation_owner.mjs";

const VERSION = 1;
const freeze = Object.freeze;
const NON_AUTHORITY = freeze({
  lessonMetadataAuthority: false,
  storedExampleAuthority: false,
  storedAnswerAuthority: false,
  labelAuthority: false,
  formulaStringAuthority: false,
  surfaceStringAuthority: false,
  alternateLanguageRuntimeInstalled: false,
  generationAllowed: false,
});

function definition(classification, facts, relation, checkpoint) {
  return freeze({
    classification,
    facts: freeze(facts),
    relation,
    checkpoint,
  });
}

const OWNER_SPECS = freeze({
  wordFragment: freeze({
    ownerId: "word-sentence-fragment-analysis",
    operationId: "concept.word.sentence-fragment.analyze",
    prefix: "ComparativeWordSentenceFragmentAnalysis",
    sourceKind: "comparative-word-sentence-fragment-analysis-source",
    resultKind: "comparative-word-sentence-fragment-analysis-result",
    inputContract: "complete-typed-word-rank-analysis-source",
    analysisDomain: "english-spanish-word-rank-comparison",
    successStepId: "word-sentence-fragment-analysis-executed",
    rejectionStepId: "word-sentence-fragment-analysis-rejected",
    restrictions: freeze([
      "the-comparative-word-rank-domain-and-analysis-question-are-typed-coordinates",
      "one-word-utterances-and-reconstructed-unspoken-words-are-evidence-only",
      "the-simple-word-sentence-case-is-an-exception-not-a-general-sentence-generator",
      "Nahuatl-particle-nuclear-clause-syntax-and-group-owners-remain-separate",
      "analysis-installs-no-English-or-Spanish-lexicon-spelling-profile-or-runtime",
    ]),
    analyses: freeze({
      "general-sentence-fragment": definition(
        "word-rank-sentence-fragment",
        ["words-are-sentence-fragments"],
        "word-rank-remains-below-complete-sentence-rank",
        "general-word-sentence-fragment-checkpoint",
      ),
      "simple-word-sentence-exception": definition(
        "delimited-simple-word-sentence-exception",
        [
          "a-simple-word-can-occasionally-occur-as-a-sentence",
          "simple-word-sentence-occurrence-is-an-exception-not-the-general-rule",
        ],
        "exception-adds-to-without-replacing-general-sentence-fragment-constraint",
        "simple-word-sentence-exception-checkpoint",
      ),
    }),
  }),
  structurePrinciples: freeze({
    ownerId: "linguistic-structure-principles-analysis",
    operationId: "concept.structure.principles.analyze",
    prefix: "LinguisticStructurePrinciplesAnalysis",
    sourceKind: "linguistic-structure-principles-analysis-source",
    resultKind: "linguistic-structure-principles-analysis-result",
    inputContract: "complete-typed-linguistic-structure-principles-source",
    analysisDomain: "linguistic-structure-principles",
    successStepId: "linguistic-structure-principles-analysis-executed",
    rejectionStepId: "linguistic-structure-principles-analysis-rejected",
    restrictions: freeze([
      "the-analysis-question-selects-one-structural-principle-not-a-stored-answer",
      "static-dynamic-concatenation-and-interaction-checkpoints-remain-distinct",
      "English-combinations-are-evidence-only-and-cannot-supply-constituents",
      "analysis-does-not-compose-a-unit-or-authorize-language-specific-grammar",
      "governance-adjunction-conjunction-and-participant-role-owners-remain-separate",
    ]),
    analyses: freeze({
      "static-dynamic-facets": definition(
        "static-and-dynamic-structure-facets",
        [
          "static-structure-is-a-complex-unit-composed-from-less-complex-or-lower-ranked-units",
          "dynamic-structure-is-a-complex-unit-resulting-from-interaction-and-interrelation-of-parts",
        ],
        "static-and-dynamic-facets-describe-one-structure-without-merging",
        "static-dynamic-structure-facets-checkpoint",
      ),
      "cooperative-principles": definition(
        "concatenation-and-interaction-cooperation",
        ["linguistic-structure-requires-cooperation-of-concatenation-and-interaction"],
        "concatenation-and-interaction-remain-distinct-cooperating-principles",
        "cooperative-structuring-principles-checkpoint",
      ),
      "concatenation-additive": definition(
        "additive-concatenation-principle",
        ["concatenation-meaningfully-combines-two-or-more-constituents-additively"],
        "concatenation-precedes-governance-analysis-of-the-resulting-unity",
        "additive-concatenation-principle-checkpoint",
      ),
      "concatenation-unit-closure": definition(
        "one-plus-one-yields-one-structural-unity",
        ["concatenation-retains-the-one-plus-one-equals-one-structural-principle"],
        "multiple-constituents-form-one-structured-unit",
        "concatenation-unit-closure-checkpoint",
      ),
      "interaction-justification": definition(
        "interaction-justifies-concatenated-unity",
        ["interaction-and-interassociation-justify-mere-linear-succession"],
        "interaction-evaluation-follows-recognition-of-concatenated-unity",
        "interaction-justification-checkpoint",
      ),
    }),
  }),
  governanceTaxonomy: freeze({
    ownerId: "governance-type-taxonomy",
    operationId: "concept.structure.governance-taxonomy.analyze",
    prefix: "GovernanceTypeTaxonomy",
    sourceKind: "governance-type-taxonomy-source",
    resultKind: "governance-type-taxonomy-result",
    inputContract: "complete-typed-governance-type-taxonomy-source",
    analysisDomain: "linguistic-governance-taxonomy",
    successStepId: "governance-type-taxonomy-analysis-executed",
    rejectionStepId: "governance-type-taxonomy-analysis-rejected",
    restrictions: freeze([
      "the-governance-analysis-question-is-typed-and-cannot-supply-its-classification",
      "adjunctive-and-conjunctive-types-remain-distinct",
      "function-unit-coupling-individuates-subtypes-without-selecting-a-language-form",
      "adjunctive-and-conjunctive-execution-remain-separate-owners",
      "taxonomy-does-not-compose-order-or-realize-a-structure",
    ]),
    analyses: freeze({
      "general-governance-types": definition(
        "adjunctive-and-conjunctive-governance-types",
        ["governance-establishes-exactly-adjunctive-and-conjunctive-general-types"],
        "general-governance-types-remain-disjoint",
        "general-governance-types-checkpoint",
      ),
      "function-unit-subtypes": definition(
        "function-unit-coupled-governance-subtypes",
        ["specific-governance-subtypes-are-determined-by-coupling-distinctive-function-units"],
        "function-unit-coupling-individuates-general-governance-types",
        "function-unit-governance-subtypes-checkpoint",
      ),
    }),
  }),
  adjunctiveGovernance: freeze({
    ownerId: "adjunctive-governance-analysis",
    operationId: "concept.structure.adjunctive-governance.analyze",
    prefix: "AdjunctiveGovernanceAnalysis",
    sourceKind: "adjunctive-governance-analysis-source",
    resultKind: "adjunctive-governance-analysis-result",
    inputContract: "complete-typed-adjunctive-governance-analysis-source",
    analysisDomain: "adjunctive-governance",
    successStepId: "adjunctive-governance-analysis-executed",
    rejectionStepId: "adjunctive-governance-analysis-rejected",
    restrictions: freeze([
      "the-adjunctive-analysis-question-is-typed-and-answer-free",
      "governor-and-subordinate-function-units-remain-asymmetric",
      "form-class-fillers-and-structural-fillers-do-not-become-function-units",
      "English-examples-and-later-section-references-are-evidence-only",
      "analysis-does-not-compose-an-adjunct-or-install-language-specific-order",
    ]),
    analyses: freeze({
      "asymmetric-governance": definition(
        "asymmetric-governor-and-adjunct-relation",
        ["one-function-unit-governs-the-subordinate-adjunctive-function-unit"],
        "governor-and-adjunct-roles-are-not-interchangeable",
        "adjunctive-asymmetric-governance-checkpoint",
      ),
      "modification-head-modifier": definition(
        "head-governs-modifier",
        ["in-modification-structure-the-head-governs-the-modifier"],
        "head-and-modifier-are-distinct-function-unit-roles",
        "modification-head-modifier-checkpoint",
      ),
      "function-unit-fillers": definition(
        "function-unit-position-filler-admissibility",
        ["function-unit-positions-can-be-filled-by-form-class-items-or-other-structures"],
        "function-unit-role-remains-distinct-from-its-filler",
        "function-unit-filler-admissibility-checkpoint",
      ),
      "optional-adjunctor": definition(
        "adjunct-may-be-introduced-by-adjunctor",
        ["a-subordinate-adjunctive-function-unit-can-be-introduced-by-an-adjunctor"],
        "adjunctor-introduction-does-not-create-the-adjunctive-governance-relation",
        "optional-adjunctor-checkpoint",
      ),
    }),
  }),
  conjunctiveGovernance: freeze({
    ownerId: "conjunctive-governance-analysis",
    operationId: "concept.structure.conjunctive-governance.analyze",
    prefix: "ConjunctiveGovernanceAnalysis",
    sourceKind: "conjunctive-governance-analysis-source",
    resultKind: "conjunctive-governance-analysis-result",
    inputContract: "complete-typed-conjunctive-governance-analysis-source",
    analysisDomain: "conjunctive-governance",
    successStepId: "conjunctive-governance-analysis-executed",
    rejectionStepId: "conjunctive-governance-analysis-rejected",
    restrictions: freeze([
      "the-conjunctive-analysis-question-is-typed-and-answer-free",
      "conjuncts-interact-as-equals-without-governor-subordinate-transfer",
      "form-class-membership-does-not-authorize-a-conjunction-instance",
      "English-and-Spanish-tendencies-are-comparative-evidence-only",
      "analysis-does-not-compose-conjuncts-or-generate-a-conjunctor-or-surface",
    ]),
    analyses: freeze({
      "equal-governance": definition(
        "equal-conjunct-function-unit-relation",
        ["two-or-more-conjunct-function-units-interact-as-equals-with-none-governing-another"],
        "conjunctive-equality-excludes-adjunctive-subordination",
        "equal-conjunct-governance-checkpoint",
      ),
      "conjunct-form-class": definition(
        "conjunct-form-class-alignment",
        ["conjunct-function-units-can-be-filled-by-items-of-the-same-form-class"],
        "function-unit-equality-remains-distinct-from-form-class-sameness",
        "conjunct-form-class-alignment-checkpoint",
      ),
    }),
  }),
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

function requestFailure(request, spec) {
  if (!request || typeof request !== "object" || Array.isArray(request)) {
    return `${spec.ownerId}-source-object-required`;
  }
  const prototype = Object.getPrototypeOf(request);
  if (prototype !== Object.prototype && prototype !== null) {
    return `${spec.ownerId}-source-plain-object-required`;
  }
  for (const key of Reflect.ownKeys(request)) {
    if (!["analysisDomain", "requestedAnalysisKind"].includes(key)) {
      return `${spec.ownerId}-source-unrecognized-constituent:${String(key)}`;
    }
    const descriptor = Object.getOwnPropertyDescriptor(request, key);
    if (!descriptor || !Object.prototype.hasOwnProperty.call(descriptor, "value")) {
      return `${spec.ownerId}-source-data-constituent-required:${String(key)}`;
    }
  }
  return "";
}

function analyzeRequest(request, spec) {
  const malformed = requestFailure(request, spec);
  const analysisDomain = malformed ? "" : String(request.analysisDomain || "");
  const analysisKind = malformed ? "" : String(request.requestedAnalysisKind || "");
  const domainValid = analysisDomain === spec.analysisDomain;
  const selected = spec.analyses[analysisKind] || null;
  const reason = malformed
    || (!domainValid ? `${spec.ownerId}-analysis-domain-required` : "")
    || (!selected ? `${spec.ownerId}-analysis-kind-required` : "");
  return deepFreeze({
    reason,
    analysisDomain,
    analysisKind,
    selected,
    requestDigestInput: `${analysisDomain}:${analysisKind}`,
  });
}

function createMechanism(spec) {
  const issuedSources = new WeakSet();
  const sourceContexts = new WeakMap();
  const issuedResults = new WeakSet();
  const resultEvidence = new WeakMap();
  const operationOwner = createGrammarOperationContractOwner({
    ownerId: spec.ownerId,
    domain: spec.ownerId,
  });
  const operationContract = operationOwner.buildContract({
    operationId: spec.operationId,
    operationType: "establish",
    consumesFrameKinds: [spec.sourceKind],
    producesFrameKind: spec.resultKind,
    effectScopes: ["read-only-classification", "typed-source-validation"],
    outputKinds: ["read-only-result"],
    authorityRefs: ["andrews-linguistic-structure-analysis"],
    description: `Execute ${spec.ownerId} without generating a formula or surface.`,
  });

  function buildSource(request = {}) {
    const context = analyzeRequest(request, spec);
    const source = deepFreeze({
      kind: spec.sourceKind,
      version: VERSION,
      analysisDomain: context.analysisDomain,
      requestedAnalysisKind: context.analysisKind,
      authorizationStatus: context.reason ? "blocked" : "authorized",
      blockReason: context.reason,
      requestDigestInput: context.requestDigestInput,
      ...NON_AUTHORITY,
    });
    issuedSources.add(source);
    sourceContexts.set(source, context);
    return source;
  }

  function isSource(source = null) {
    const context = sourceContexts.get(source) || null;
    return Boolean(
      source
      && issuedSources.has(source)
      && context
      && source.kind === spec.sourceKind
      && source.version === VERSION
      && source.authorizationStatus === "authorized"
      && source.blockReason === ""
      && context.reason === ""
      && Object.entries(NON_AUTHORITY).every(([key, value]) => source[key] === value)
      && freeze(source) === source
    );
  }

  function issueResult(source = null) {
    const sourceIssued = issuedSources.has(source);
    const context = sourceContexts.get(source) || null;
    const reason = !sourceIssued
      ? `owner-issued-${spec.ownerId}-source-required`
      : source?.blockReason || context?.reason || "";
    const authorized = sourceIssued && context && !reason && isSource(source);
    const selected = authorized ? context.selected : null;
    const providedInput = deepFreeze({
      analysisDomain: source?.analysisDomain || "",
      requestedAnalysisKind: source?.requestedAnalysisKind || "",
    });
    const routeSteps = [
      deepFreeze({
        stepId: `${spec.ownerId}-source-admitted`,
        kind: "source",
        actorId: spec.ownerId,
        status: sourceIssued ? "accepted" : "rejected",
        reason: sourceIssued ? `owner-issued-${spec.ownerId}-source` : reason,
        branchId: `${spec.ownerId}-source-authority`,
        decision: sourceIssued ? "admit" : "reject",
        evaluatedRuleIds: [],
        executedRuleIds: [],
        inputState: providedInput,
        outputState: deepFreeze({ sourceIssued }),
      }),
      deepFreeze({
        stepId: `${spec.ownerId}-semantic-owner-selected`,
        kind: "semantic-owner",
        actorId: spec.ownerId,
        status: sourceIssued ? "selected" : "rejected",
        reason: sourceIssued ? `${spec.ownerId}-jurisdiction-selected` : reason,
        branchId: `${spec.ownerId}-owner-jurisdiction`,
        decision: sourceIssued ? spec.ownerId : "no-owner",
        evaluatedRuleIds: [],
        executedRuleIds: [],
        inputState: deepFreeze({ sourceKind: source?.kind || "" }),
        outputState: deepFreeze({ ownerId: sourceIssued ? spec.ownerId : "" }),
      }),
      deepFreeze({
        stepId: `${spec.ownerId}-analysis-coordinates-validated`,
        kind: "guard",
        actorId: spec.ownerId,
        status: authorized ? "accepted" : sourceIssued ? "rejected" : "skipped",
        reason: authorized ? "typed-analysis-domain-and-question-recognized" : reason,
        branchId: `${spec.ownerId}-analysis-coordinates`,
        decision: authorized ? "accept" : sourceIssued ? "reject" : "skip",
        evaluatedRuleIds: sourceIssued ? [spec.operationId] : [],
        executedRuleIds: [],
        inputState: providedInput,
        outputState: deepFreeze({ analysisCoordinatesValid: authorized }),
      }),
    ];
    for (const [analysisKind, candidate] of Object.entries(spec.analyses)) {
      const applicable = authorized && context.analysisKind === analysisKind;
      routeSteps.push(deepFreeze({
        stepId: candidate.checkpoint,
        kind: "branch",
        actorId: spec.ownerId,
        status: applicable ? "evaluated" : "not-applicable",
        reason: applicable ? `${analysisKind}-claim-retained` : `${analysisKind}-not-requested`,
        branchId: `${spec.ownerId}-${analysisKind}`,
        decision: applicable ? "retain" : "not-applicable",
        evaluatedRuleIds: authorized ? [spec.operationId] : [],
        executedRuleIds: [],
        inputState: providedInput,
        outputState: deepFreeze({ checkpointSatisfied: applicable }),
      }));
    }
    routeSteps.push(deepFreeze({
      stepId: authorized ? spec.successStepId : spec.rejectionStepId,
      kind: authorized ? "operation" : "guard",
      actorId: spec.ownerId,
      status: authorized ? "executed" : "rejected",
      reason: authorized ? `${spec.ownerId}-executed` : reason,
      branchId: `${spec.ownerId}-outcome`,
      decision: authorized ? "analyze" : "reject",
      evaluatedRuleIds: sourceIssued ? [spec.operationId] : [],
      executedRuleIds: authorized ? [spec.operationId] : [],
      inputState: providedInput,
      outputState: deepFreeze({
        classificationStatus: authorized
          ? `analyzed-${spec.ownerId}`
          : `${spec.ownerId}-rejected`,
      }),
    }));
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
      functionIds: deepFreeze([`build${spec.prefix}Source`, `evaluate${spec.prefix}`]),
      providedInput,
      execution,
      routeSteps: frozenSteps,
      outcome: deepFreeze({ status: execution.status, reason: execution.reason }),
    });
    const result = deepFreeze({
      kind: spec.resultKind,
      version: VERSION,
      authorizationStatus: authorized ? "authorized" : "blocked",
      blockReason: reason,
      semanticOwnerId: spec.ownerId,
      operationId: spec.operationId,
      operationContract,
      classificationStatus: authorized ? `analyzed-${spec.ownerId}` : `${spec.ownerId}-rejected`,
      analysisKind: authorized ? context.analysisKind : "",
      classification: selected?.classification || "",
      facts: deepFreeze([...(selected?.facts || [])]),
      relations: deepFreeze(selected ? [selected.relation] : []),
      restrictions: spec.restrictions,
      coordinates: deepFreeze(authorized ? {
        analysisDomain: context.analysisDomain,
        requestedAnalysisKind: context.analysisKind,
      } : {}),
      prerequisiteOwnerIds: deepFreeze([]),
      ownerExecutionCompleted: Boolean(authorized),
      ...NON_AUTHORITY,
      unitConstructed: false,
      boundaryRewritten: false,
      soundedSurfaceGenerated: false,
      writtenSurfaceGenerated: false,
      formulaGenerated: false,
    });
    issuedResults.add(result);
    resultEvidence.set(result, evidence);
    return result;
  }

  function isResult(result = null) {
    return Boolean(
      result
      && issuedResults.has(result)
      && result.kind === spec.resultKind
      && result.version === VERSION
      && result.semanticOwnerId === spec.ownerId
      && result.operationId === spec.operationId
      && operationOwner.isContractIssued(result.operationContract)
      && result.generationAllowed === false
      && result.unitConstructed === false
      && result.writtenSurfaceGenerated === false
      && result.formulaGenerated === false
      && freeze(result) === result
    );
  }

  function getEvidence(result = null) {
    return resultEvidence.get(result) || null;
  }

  function isEvidence(evidence = null, result = null) {
    const currentSteps = evidence?.routeSteps?.filter((step) =>
      step.executedRuleIds?.includes(spec.operationId)) || [];
    return Boolean(
      evidence
      && result
      && issuedResults.has(result)
      && resultEvidence.get(result) === evidence
      && evidence.ownerId === spec.ownerId
      && evidence.evaluatedOperationId === spec.operationId
      && evidence.execution?.routeSteps === evidence.routeSteps
      && evidence.outcome?.status === evidence.execution?.status
      && evidence.outcome?.reason === evidence.execution?.reason
      && (result.authorizationStatus === "authorized"
        ? currentSteps.length === 1 && currentSteps[0].stepId === spec.successStepId
        : currentSteps.length === 0)
      && freeze(evidence) === evidence
    );
  }

  return deepFreeze({
    buildSource,
    isSource,
    evaluate: issueResult,
    isResult,
    isOperationContract: (contract = null) => operationOwner.isContractIssued(contract),
    getEvidence,
    isEvidence,
  });
}

function publicNames(prefix) {
  return freeze({
    build: `build${prefix}Source`,
    isSource: `is${prefix}Source`,
    evaluate: `evaluate${prefix}`,
    isResult: `is${prefix}Result`,
    isContract: `is${prefix}OperationContract`,
    getEvidence: `get${prefix}ExecutionEvidence`,
    isEvidence: `is${prefix}ExecutionEvidence`,
  });
}

export function createLinguisticStructureOwnersApi() {
  const api = Object.create(null);
  for (const spec of Object.values(OWNER_SPECS)) {
    const names = publicNames(spec.prefix);
    const mechanism = createMechanism(spec);
    api[names.build] = mechanism.buildSource;
    api[names.isSource] = mechanism.isSource;
    api[names.evaluate] = mechanism.evaluate;
    api[names.isResult] = mechanism.isResult;
    api[names.isContract] = mechanism.isOperationContract;
    api[names.getEvidence] = mechanism.getEvidence;
    api[names.isEvidence] = mechanism.isEvidence;
  }
  return freeze(api);
}

export function installLinguisticStructureOwnersGlobals(targetObject = globalThis) {
  const api = createLinguisticStructureOwnersApi(targetObject);
  Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
  return api;
}
