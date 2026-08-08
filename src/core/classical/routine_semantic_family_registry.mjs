import {
  listCanonicalIdentityRecords,
  resolveCanonicalIdentity,
} from "../grammar/canonical_identity_registry.mjs";

const freeze = Object.freeze;
const VERSION = 1;
const FAMILY_SCOPE = "canonical-grammar-family";
const PRETERIT_AGENTIVE_PATTERN = /(?:^|-)preterit-agentive(?:-|$)/u;
const PARTICLE_OWNER_IDS = new Set([
  "classical-negative-particle-distribution",
  "classical-negative-particle-lexicon",
  "classical-particle-collocation-lexicon",
  "classical-particle-collocation-structure",
  "classical-particle-distribution-analysis",
  "classical-particle-honorific-formation",
  "classical-particle-honorific-structure",
  "classical-particle-lexicon",
  "classical-particle-structure-analysis",
]);

const FOUNDATIONAL_OWNER_IDS = new Set([
  "classical-graphological-representation",
  "classical-nominal-number",
  "classical-nounstem-lexicon",
  "classical-object-embed-distinction",
  "classical-particle-lexicon",
  "classical-phonological-distinction",
  "classical-place-nnc-formation",
  "classical-segmental-phoneme-inventory",
  "classical-stem-composition",
  "classical-verbstem-lexicon",
  "conceptual-plane-separation",
  "participant-role-analysis",
]);
const CARRIER_OWNER_IDS = new Set([
  "carrier-phonotactic-surface-constraints",
  "carrier-rank-formation",
  "carrier-vocable-prosody",
  "carrier-vocable-structure",
  "classical-syllable-structure",
  "meaningless-carrier-unit-classification",
  "nahuatl-group-composition",
  "nahuatl-structure-level-distribution",
  "nahuatl-syntax-domain-onset",
  "nuclear-clause-morphosyntax-domain",
  "structural-unit-hierarchy",
]);
const MORPHEME_OWNER_IDS = new Set([
  "morpheme-combinatorial-type-classification",
  "affix-linear-position-classification",
  "affix-functional-type-classification",
  "inflectional-paradigm-definition",
  "inflectional-affix-dyad-analysis",
  "meaningful-structural-rank-hierarchy",
  "nahuatl-post-stem-unit-classification",
  "inflectional-affix-stem-internal-demotion",
  "meaningful-rank-source-and-upgrade-admissibility",
  "root-major-morpheme-definition",
  "stock-mediated-stem-formation",
  "compound-stem-formation",
  "lexeme-bearing-unit-classification",
  "stem-lexical-item-classification",
  "root-meaning-rank-upgrade",
  "stem-inflection-transition-zone",
  "meaningful-morpheme-unit-classification",
]);
const LINGUISTIC_OWNER_IDS = new Set([
  "word-sentence-fragment-analysis",
  "linguistic-structure-principles-analysis",
  "governance-type-taxonomy",
  "adjunctive-governance-analysis",
  "conjunctive-governance-analysis",
]);
const CONCEPTUAL_OWNER_IDS = new Set([
  "carrier-rank-taxonomy",
  "classical-linguistic-concept-owner",
  "discontinuous-unit-admissibility",
  "linguistic-structure-recursion",
  "linguistic-unit-composition",
  "morpheme-syllable-separation",
  "silent-morph-contrast-validation",
]);
const TECHNICAL_OWNER_IDS = new Set([
  "classical-nahuatl-deverbal-nnc-runtime",
]);

const NUCLEAR_OWNER_IDS = new Set([
  "classical-vnc",
  "classical-nnc",
  "classical-vnc-nonactive-voice",
]);

const BINDING_BY_OWNER_ID = new Map();
const FAMILY_STATE_BY_ID = new Map();
const METRIC_PROVIDERS_BY_ID = new Map();
let canonicalOwnerSweepComplete = false;

function normalize(value = "") {
  return String(value == null ? "" : value).normalize("NFC").trim();
}

function slug(value = "", fallback = "unspecified") {
  const token = normalize(value)
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/giu, "-")
    .replace(/^-+|-+$/gu, "")
    .toLowerCase();
  return token || fallback;
}

function stableValue(value) {
  if (Array.isArray(value)) return value.map(stableValue);
  if (!value || typeof value !== "object") return value ?? null;
  return Object.fromEntries(
    Object.keys(value).sort().map(key => [key, stableValue(value[key])]),
  );
}

function stableJson(value) {
  return JSON.stringify(stableValue(value));
}

function selectedArgs(spec, selection) {
  const selected = spec.executionArgsBySelection?.[selection]
    ?? spec.defaultExecutionArgs
    ?? [];
  return Array.isArray(selected) ? selected : [selected];
}

export function getRoutineSemanticExecutionLaneDescriptor(spec = {}) {
  return freeze({
    mode: normalize(spec.mode),
    canonicalActorId: normalize(spec.canonicalActorId),
    executionFunctionName: normalize(spec.executionFunctionName),
    executionValidatorName: normalize(spec.executionValidatorName),
    sourceBuilderName: normalize(spec.sourceBuilderName),
    ruleGetterName: normalize(spec.ruleGetterName),
    collectionCapabilityName: normalize(spec.collectionCapabilityName),
    systemCapabilityName: normalize(spec.systemCapabilityName),
    analysisFunctionName: normalize(spec.analysisFunctionName),
    canonicalAnalysisKind: normalize(spec.canonicalAnalysisKind),
  });
}

export function getRoutineSemanticExecutionLaneKey(spec = {}) {
  return stableJson(getRoutineSemanticExecutionLaneDescriptor(spec));
}

function familyDefinition({
  familyOwnerId,
  familyKind,
  familyStableKey,
  consolidationPolicy,
}) {
  return freeze({
    familyOwnerId,
    familyKind,
    familyStableKey,
    consolidationPolicy,
  });
}

function explicitRoutineFamily(spec) {
  const ownerId = normalize(spec.ownerId);
  if (PRETERIT_AGENTIVE_PATTERN.test(ownerId)) {
    return familyDefinition({
      familyOwnerId: "classical-preterit-agentive-family",
      familyKind: "grammatical-family",
      familyStableKey: "classical-preterit-agentive-family:v1",
      consolidationPolicy: "explicit-grammatical-jurisdiction",
    });
  }
  if (PARTICLE_OWNER_IDS.has(ownerId)) {
    return familyDefinition({
      familyOwnerId: "classical-particle-family",
      familyKind: "grammatical-family",
      familyStableKey: "classical-particle-family:v1",
      consolidationPolicy: "shared-particle-jurisdiction",
    });
  }
  return null;
}

function automaticRoutineFamily(spec) {
  const descriptor = getRoutineSemanticExecutionLaneDescriptor(spec);
  const identityParts = [
    descriptor.mode,
    descriptor.canonicalActorId,
    descriptor.executionFunctionName,
    descriptor.executionValidatorName,
    descriptor.sourceBuilderName,
    descriptor.ruleGetterName,
    descriptor.collectionCapabilityName,
    descriptor.systemCapabilityName,
    descriptor.analysisFunctionName,
    descriptor.canonicalAnalysisKind,
  ].filter(Boolean);
  const readableParts = [
    descriptor.canonicalActorId,
    descriptor.executionFunctionName,
    descriptor.collectionCapabilityName,
    descriptor.ruleGetterName,
    descriptor.systemCapabilityName,
    descriptor.mode,
  ].filter(Boolean).map(value => slug(value));
  return familyDefinition({
    familyOwnerId: `routine-family-${readableParts.join("-")}`,
    familyKind: "canonical-execution-family",
    familyStableKey: `routine-semantic-family:v1:${stableJson(identityParts)}`,
    consolidationPolicy: "shared-canonical-execution-contract",
  });
}

function explicitCanonicalOwnerFamily(ownerId) {
  if (FOUNDATIONAL_OWNER_IDS.has(ownerId)) {
    if (ownerId === "classical-particle-lexicon") {
      return {
        family: familyDefinition({
          familyOwnerId: "classical-particle-family",
          familyKind: "grammatical-family",
          familyStableKey: "classical-particle-family:v1",
          consolidationPolicy: "shared-particle-jurisdiction",
        }),
        systemKind: "foundational",
      };
    }
    return {
      family: familyDefinition({
        familyOwnerId: "classical-foundational-grammar-family",
        familyKind: "grammatical-foundation-family",
        familyStableKey: "classical-foundational-grammar-family:v1",
        consolidationPolicy: "shared-foundational-semantic-mechanics",
      }),
      systemKind: "foundational",
    };
  }
  if (CARRIER_OWNER_IDS.has(ownerId)) {
    return {
      family: familyDefinition({
        familyOwnerId: "classical-carrier-structure-family",
        familyKind: "grammatical-family",
        familyStableKey: "classical-carrier-structure-family:v1",
        consolidationPolicy: "shared-carrier-structure-mechanics",
      }),
      systemKind: "carrier-structure",
    };
  }
  if (MORPHEME_OWNER_IDS.has(ownerId)) {
    return {
      family: familyDefinition({
        familyOwnerId: "classical-morpheme-structure-family",
        familyKind: "grammatical-family",
        familyStableKey: "classical-morpheme-structure-family:v1",
        consolidationPolicy: "shared-morpheme-structure-mechanics",
      }),
      systemKind: "morpheme-structure",
    };
  }
  if (LINGUISTIC_OWNER_IDS.has(ownerId)) {
    return {
      family: familyDefinition({
        familyOwnerId: "classical-linguistic-structure-family",
        familyKind: "grammatical-family",
        familyStableKey: "classical-linguistic-structure-family:v1",
        consolidationPolicy: "shared-linguistic-analysis-mechanics",
      }),
      systemKind: "linguistic-structure",
    };
  }
  if (CONCEPTUAL_OWNER_IDS.has(ownerId)) {
    return {
      family: familyDefinition({
        familyOwnerId: "classical-conceptual-structure-family",
        familyKind: "grammatical-family",
        familyStableKey: "classical-conceptual-structure-family:v1",
        consolidationPolicy: "shared-conceptual-structure-boundary",
      }),
      systemKind: "conceptual-structure",
    };
  }
  if (NUCLEAR_OWNER_IDS.has(ownerId)) {
    return {
      family: familyDefinition({
        familyOwnerId: "classical-nuclear-grammar-family",
        familyKind: "grammatical-family",
        familyStableKey: "classical-nuclear-grammar-family:v1",
        consolidationPolicy: "shared-nuclear-grammar-boundary",
      }),
      systemKind: "nuclear-grammar",
    };
  }
  return {
    family: familyDefinition({
      familyOwnerId: `canonical-family-${slug(ownerId)}`,
      familyKind: "conservative-singleton-family",
      familyStableKey: `canonical-singleton-family:v1:${ownerId}`,
      consolidationPolicy: "unclassified-owner-kept-separate",
    }),
    systemKind: "bespoke-singleton",
  };
}

function familyState(binding) {
  let state = FAMILY_STATE_BY_ID.get(binding.familyIdentityId) || null;
  if (!state) {
    state = {
      binding,
      memberOwnerIds: new Set(),
      executionLaneKeys: new Set(),
      canonicalActorIds: new Set(),
      modes: new Set(),
      systemKinds: new Set(),
    };
    FAMILY_STATE_BY_ID.set(binding.familyIdentityId, state);
  }
  return state;
}

export function registerCanonicalGrammarFamilyBinding({
  ownerId = "",
  familyOwnerId = "",
  familyKind = "grammatical-family",
  familyStableKey = "",
  consolidationPolicy = "explicit-grammatical-jurisdiction",
  canonicalActorId = "",
  executionLaneKey = "",
  systemKind = "bespoke",
  adapterRole = "compatibility-owner-adapter",
} = {}) {
  const normalizedOwnerId = normalize(ownerId);
  const normalizedFamilyOwnerId = normalize(familyOwnerId);
  if (!normalizedOwnerId || !normalizedFamilyOwnerId) {
    throw new Error("canonical-grammar-family-owner-and-family-required");
  }
  const existing = BINDING_BY_OWNER_ID.get(normalizedOwnerId) || null;
  if (existing) {
    if (existing.familyOwnerId !== normalizedFamilyOwnerId) {
      throw new Error(
        `canonical-grammar-family-owner-conflict:${normalizedOwnerId}`,
      );
    }
    familyState(existing).systemKinds.add(normalize(systemKind));
    return existing;
  }

  const identity = resolveCanonicalIdentity({
    namespace: "owner",
    semanticName: normalizedFamilyOwnerId,
    stableKey: normalize(familyStableKey) || normalizedFamilyOwnerId,
    scopeKey: FAMILY_SCOPE,
    currentLocation: "canonical-grammar-family-registry",
    metadata: {
      role: "grammatical-family-owner",
      familyKind: normalize(familyKind),
      consolidationPolicy: normalize(consolidationPolicy),
    },
  });
  const binding = freeze({
    kind: "canonical-grammar-family-binding",
    version: VERSION,
    familyOwnerId: normalizedFamilyOwnerId,
    familyIdentityId: identity.identityId,
    familyKind: normalize(familyKind),
    familyStableKey: normalize(familyStableKey),
    consolidationPolicy: normalize(consolidationPolicy),
    proofAdapterOwnerId: normalizedOwnerId,
    proofAdapterRole: normalize(adapterRole),
    canonicalActorId: normalize(canonicalActorId),
    executionLaneKey: normalize(executionLaneKey),
    systemKind: normalize(systemKind),
    familyGrammarAuthority: false,
    proofAdapterGrammarAuthority: false,
  });
  BINDING_BY_OWNER_ID.set(normalizedOwnerId, binding);
  const state = familyState(binding);
  state.memberOwnerIds.add(normalizedOwnerId);
  if (binding.executionLaneKey) {
    state.executionLaneKeys.add(binding.executionLaneKey);
  }
  if (binding.canonicalActorId) {
    state.canonicalActorIds.add(binding.canonicalActorId);
  }
  state.systemKinds.add(binding.systemKind);
  return binding;
}

export function registerRoutineSemanticFamilyBinding(spec = {}) {
  const ownerId = normalize(spec.ownerId);
  if (!ownerId) {
    throw new Error("routine-semantic-family-owner-id-required");
  }
  const existing = BINDING_BY_OWNER_ID.get(ownerId) || null;
  if (existing) return existing;
  const family = explicitRoutineFamily(spec) || automaticRoutineFamily(spec);
  const binding = registerCanonicalGrammarFamilyBinding({
    ownerId,
    ...family,
    canonicalActorId: normalize(spec.canonicalActorId),
    executionLaneKey: getRoutineSemanticExecutionLaneKey(spec),
    systemKind: "routine",
    adapterRole: "compatibility-proof-adapter",
  });
  const state = familyState(binding);
  if (spec.mode) state.modes.add(normalize(spec.mode));
  return binding;
}

function registerUnboundCanonicalOwners() {
  if (canonicalOwnerSweepComplete) return;
  const owners = listCanonicalIdentityRecords().filter(record => (
    record.namespace === "owner"
    && record.scopeKey === ""
  ));
  for (const record of owners) {
    const ownerId = normalize(record.semanticName);
    if (
      !ownerId
      || TECHNICAL_OWNER_IDS.has(ownerId)
      || BINDING_BY_OWNER_ID.has(ownerId)
    ) continue;
    const classified = explicitCanonicalOwnerFamily(ownerId);
    registerCanonicalGrammarFamilyBinding({
      ownerId,
      ...classified.family,
      canonicalActorId: ownerId,
      executionLaneKey: `bespoke:${ownerId}`,
      systemKind: classified.systemKind,
      adapterRole: "identity-preserving-owner-adapter",
    });
  }
  canonicalOwnerSweepComplete = true;
}

export function registerRoutineSemanticFamilyMetricProvider(
  familyIdentityId = "",
  provider = null,
) {
  const id = normalize(familyIdentityId);
  if (!id || typeof provider !== "function") return false;
  let providers = METRIC_PROVIDERS_BY_ID.get(id) || null;
  if (!providers) {
    providers = new Set();
    METRIC_PROVIDERS_BY_ID.set(id, providers);
  }
  providers.add(provider);
  return true;
}

function aggregateMetrics(familyIdentityId) {
  const metrics = {
    kernelCount: 0,
    invocationCount: 0,
    cacheHitCount: 0,
    cacheMissCount: 0,
    cacheEntryCount: 0,
  };
  for (const provider of METRIC_PROVIDERS_BY_ID.get(familyIdentityId) || []) {
    const snapshot = provider() || {};
    metrics.kernelCount += 1;
    metrics.invocationCount += Number(snapshot.invocationCount || 0);
    metrics.cacheHitCount += Number(snapshot.cacheHitCount || 0);
    metrics.cacheMissCount += Number(snapshot.cacheMissCount || 0);
    metrics.cacheEntryCount += Number(snapshot.cacheEntryCount || 0);
  }
  return freeze(metrics);
}

function snapshotForState(state) {
  const binding = state.binding;
  return freeze({
    kind: "canonical-grammar-family-record",
    version: VERSION,
    familyOwnerId: binding.familyOwnerId,
    familyIdentityId: binding.familyIdentityId,
    familyKind: binding.familyKind,
    consolidationPolicy: binding.consolidationPolicy,
    memberOwnerIds: freeze([...state.memberOwnerIds].sort()),
    memberOwnerCount: state.memberOwnerIds.size,
    executionLaneKeys: freeze([...state.executionLaneKeys].sort()),
    executionLaneCount: state.executionLaneKeys.size,
    canonicalActorIds: freeze([...state.canonicalActorIds].sort()),
    modes: freeze([...state.modes].sort()),
    systemKinds: freeze([...state.systemKinds].filter(Boolean).sort()),
    metrics: aggregateMetrics(binding.familyIdentityId),
    grammarAuthority: false,
    identityAuthority: false,
  });
}

export function listCanonicalGrammarFamilies() {
  registerUnboundCanonicalOwners();
  return freeze(
    [...FAMILY_STATE_BY_ID.values()]
      .map(snapshotForState)
      .sort((left, right) => left.familyOwnerId.localeCompare(
        right.familyOwnerId,
      )),
  );
}

export function getCanonicalGrammarFamilyForOwner(ownerId = "") {
  registerUnboundCanonicalOwners();
  const binding = BINDING_BY_OWNER_ID.get(normalize(ownerId)) || null;
  if (!binding) return null;
  const state = FAMILY_STATE_BY_ID.get(binding.familyIdentityId) || null;
  return state ? snapshotForState(state) : null;
}

export function getCanonicalGrammarFamilyMetrics(value = "") {
  registerUnboundCanonicalOwners();
  const token = normalize(value);
  const binding = BINDING_BY_OWNER_ID.get(token) || null;
  if (binding) return aggregateMetrics(binding.familyIdentityId);
  const state = [...FAMILY_STATE_BY_ID.values()].find(item => (
    item.binding.familyIdentityId === token
    || item.binding.familyOwnerId === token
  )) || null;
  return state ? aggregateMetrics(state.binding.familyIdentityId) : null;
}

export function isCanonicalGrammarFamilyRecord(value = null) {
  return Boolean(
    value
    && value.kind === "canonical-grammar-family-record"
    && value.version === VERSION
    && value.familyOwnerId
    && value.familyIdentityId
    && Array.isArray(value.memberOwnerIds)
    && value.memberOwnerCount === value.memberOwnerIds.length
    && value.grammarAuthority === false
    && value.identityAuthority === false
    && Object.isFrozen(value)
  );
}

export function listRoutineSemanticFamilies() {
  return freeze(listCanonicalGrammarFamilies().filter(
    family => family.systemKinds.includes("routine"),
  ));
}

export function getRoutineSemanticFamilyForOwner(ownerId = "") {
  const family = getCanonicalGrammarFamilyForOwner(ownerId);
  return family?.systemKinds.includes("routine") ? family : null;
}

export const getRoutineSemanticFamilyMetrics =
  getCanonicalGrammarFamilyMetrics;
export const isRoutineSemanticFamilyRecord =
  isCanonicalGrammarFamilyRecord;

export function getRoutineSemanticExecutionCacheKey(
  spec = {},
  selection = "",
  phase = "canonical-execution",
) {
  const selected = normalize(selection);
  return stableJson({
    phase: normalize(phase),
    lane: getRoutineSemanticExecutionLaneDescriptor(spec),
    selectionDependency:
      spec.mode === "canonical-particle-result" ? selected : "",
    args: selectedArgs(spec, selected),
    sourceArgs: spec.executionArgsBySelection?.[selected] ?? null,
    selectionRecords: spec.selectionRecords?.[selected] ?? null,
    expectedStatus:
      spec.expectedCanonicalStatusBySelection?.[selected] || "authorized",
    requireSelectedRuleMatch: spec.requireSelectedRuleMatch === true,
  });
}
