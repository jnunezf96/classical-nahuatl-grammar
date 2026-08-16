// Canonical typed grammar contributions shared by Andrews Lessons 20-22.
//
// This module contains only executable grammar distinctions. Source spans,
// dispositions, audit counts, and closure receipts live under src/tests.

import {
  createGrammarOperationContractOwner,
} from "../grammar/operation_owner.mjs?v=20260728-runtime-reachability-111";

const deepFreeze = value => {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  Object.values(value).forEach(deepFreeze);
  return Object.freeze(value);
};

const GCD_OPERATION_IDS = Object.freeze([
  "vnc-active-source-analysis",
  "vnc-nonactive-stem-derivation",
  "vnc-voice-participant-transformation",
  "vnc-class-a-finite-realization",
  "vnc-sentence-force-composition",
]);

const OPERATION_CONTRACT_OWNER = createGrammarOperationContractOwner({
  ownerId: "classical-vnc-nonactive-voice",
  domain: "classical-vnc-nonactive-voice",
});
const OPERATION_CONTRACTS = Object.freeze([
  OPERATION_CONTRACT_OWNER.buildContract({
    operationId: GCD_OPERATION_IDS[0],
    domain: "classical-vnc-nonactive-voice",
    operationType: "establish",
    consumesFrameKinds: ["classical-nahuatl-verbstem-verbstem-class-machinery-frame"],
    producesFrameKind: "classical-nahuatl-active-vnc-source-analysis",
    effectScopes: ["predicate.stem", "predicate.class", "predicate.valence", "participants"],
    outputKinds: ["typed-active-vnc-source"],
    authorityRefs: ["typed-active-source-analysis"],
    description: "Analyze one authorized active VNC before any nonactive or voice operation.",
  }),
  OPERATION_CONTRACT_OWNER.buildContract({
    operationId: GCD_OPERATION_IDS[1],
    domain: "classical-vnc-nonactive-voice",
    operationType: "transform",
    consumesFrameKinds: ["classical-nahuatl-active-vnc-source-analysis"],
    producesFrameKind: "classical-nahuatl-nonactive-vnc-nonactive-stem-record",
    prerequisites: [GCD_OPERATION_IDS[0]],
    effectScopes: ["predicate.stem", "predicate.class", "predicate.aspect"],
    outputKinds: ["typed-nonactive-stem"],
    authorityRefs: ["nonactive-core-and-conditioned-stem-formation"],
    description: "Derive the licensed nonactive stem from typed source identity, class, valence, and final shape.",
  }),
  OPERATION_CONTRACT_OWNER.buildContract({
    operationId: GCD_OPERATION_IDS[2],
    domain: "classical-vnc-nonactive-voice",
    operationType: "transform",
    consumesFrameKinds: [
      "classical-nahuatl-active-vnc-source-analysis",
      "classical-nahuatl-nonactive-vnc-nonactive-stem-record",
    ],
    producesFrameKind: "classical-nahuatl-nonactive-vnc-derived-vnc-machinery-frame",
    prerequisites: [GCD_OPERATION_IDS[0]],
    effectScopes: ["participants.subject", "participants.objects", "predicate.voice", "predicate.valence"],
    outputKinds: ["typed-derived-voice-vnc"],
    authorityRefs: ["passive-and-impersonal-participant-transformation"],
    description: "Delete the source agent and apply the licensed passive or impersonal participant transformation.",
  }),
  OPERATION_CONTRACT_OWNER.buildContract({
    operationId: GCD_OPERATION_IDS[3],
    domain: "classical-vnc-nonactive-voice",
    operationType: "realize",
    consumesFrameKinds: ["classical-nahuatl-nonactive-vnc-derived-vnc-machinery-frame"],
    producesFrameKind: "classical-nahuatl-vnc-finite-surface-frame",
    prerequisites: [GCD_OPERATION_IDS[2]],
    effectScopes: ["predicate.class-a-profile", "predicate.tense", "word.boundary"],
    outputKinds: ["selected-vnc-formula"],
    authorityRefs: ["nonactive-class-a-finite-realization"],
    description: "Realize the derived predicate through its typed Class A profile and final boundary.",
  }),
  OPERATION_CONTRACT_OWNER.buildContract({
    operationId: GCD_OPERATION_IDS[4],
    domain: "classical-vnc-nonactive-voice",
    operationType: "compose",
    consumesFrameKinds: ["classical-nahuatl-vnc-finite-surface-frame"],
    producesFrameKind: "classical-nahuatl-sentence-surface-frame",
    prerequisites: [GCD_OPERATION_IDS[3]],
    effectScopes: ["sentence.force", "sentence.polarity", "sentence.boundary"],
    outputKinds: ["selected-vnc-sentence-surface"],
    authorityRefs: ["typed-sentence-force-composition"],
    description: "Compose the complete finite VNC into its selected sentence environment.",
  }),
]);

const CANONICAL_EXECUTOR_INVENTORY = Object.freeze([
  "applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame",
  "buildClassicalNahuatlVerbstemPlan",
  "buildClassicalNahuatlActiveStemIdentityFrame",
  "buildClassicalNahuatlClassCFinalIVowelLengthRuleFrame",
  "buildClassicalNahuatlFinalIOHuaVowelLengthRuleFrame",
  "buildClassicalNahuatlProductiveCandidateSet",
  "buildClassicalNahuatlStemFinalShapeFrame",
  "buildClassicalNahuatlInherentImpersonalRecord",
  "buildClassicalNahuatlTlaImpersonalStemRecord",
  "buildClassicalNahuatlObjectClusterFrame",
  "buildClassicalNahuatlVoiceObjectClusterFrame",
  "buildClassicalNahuatlParticleSentenceSurfaceFrame",
  "buildClassicalNahuatlDerivedVncFrame",
  "classical-nahuatl-active-reflexive-object-vnc",
  "classical-nahuatl-passive-vnc-passive-transformation-frame",
  "classical-nahuatl-vnc-subject-reference-frame",
  "deriveClassicalNahuatlNonactiveStemRecord",
  "deriveClassicalNahuatlOrderedVoiceLayerChain",
  "getClassicalNahuatlNonactiveFormationStructure",
  "getClassicalNahuatlNonactiveStemOptions",
  "getClassicalNahuatlInherentImpersonalSourceAnalysis",
  "getClassicalNahuatlTlaImpersonalSourceAnalysis",
  "buildClassicalNahuatlVncSubjectReferenceFrame",
  "getClassicalNahuatlVncApplicationAllowedVoices",
]);

const DISTINCTION_AXIS_CONSTRAINTS = deepFreeze({
  "voice-operation": {
    axisConstraintId: "lessons20-22-voice-operation-selected",
    licensedProbeCoordinate: "inherent-impersonal",
    unlicensedProbeCoordinate:
      "__classical-owner-axis-coordinate-unlicensed__",
    ownerCoordinatePath: ["operations", 0],
    ownerCoordinateProjectionKind: "direct",
  },
  "mood-and-sentence-force": {
    axisConstraintId: "lessons20-22-mood-selected",
    licensedProbeCoordinate: "indicative",
    unlicensedProbeCoordinate:
      "__classical-owner-axis-coordinate-unlicensed__",
    ownerCoordinatePath: [
      "baseApplicationFrame",
      "normalizedRequest",
      "mood",
    ],
    ownerCoordinateProjectionKind: "direct",
  },
  polarity: {
    axisConstraintId: "lessons20-22-polarity-selected",
    licensedProbeCoordinate: "affirmative",
    unlicensedProbeCoordinate:
      "__classical-owner-axis-coordinate-unlicensed__",
    ownerCoordinatePath: [
      "baseApplicationFrame",
      "normalizedRequest",
      "sentenceOptions",
      "negative",
    ],
    ownerCoordinateProjectionKind: "negative-boolean-to-polarity",
  },
});

const DISTINCTION_SPECS = [
  ["source-stem-identity", ["entered-allomorph", "canonical-imperfective"], ["buildClassicalNahuatlActiveStemIdentityFrame"], "preserved-across-all-cells", "lexical-fact"],
  ["source-verbstem-class", ["A", "B", "C", "D"], ["buildClassicalNahuatlProductiveCandidateSet"], "conditions-every-derived-cell", "lexical-fact"],
  ["source-valence", ["intransitive", "one-object", "multiple-object"], ["getClassicalNahuatlNonactiveStemOptions", "buildClassicalNahuatlDerivedVncFrame"], "conditions-voice-availability", "lexical-fact"],
  ["source-object-count", [0, 1, 2, 3], ["buildClassicalNahuatlObjectClusterFrame"], "project-each-licensed-object-structure", "contextual-fact"],
  ["object-kind-sequence", ["specific", "reflexive", "nonspecific-human", "nonspecific-nonhuman"], ["buildClassicalNahuatlVoiceObjectClusterFrame"], "retain-order-after-promotion", "contextual-fact"],
  ["mainline-shuntline-silent-object-status", ["mainline", "shuntline", "silent"], ["applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame"], "coordinate-independent-participant-binding", "derived-fact"],
  ["nonactive-formation-core", ["ō", "lō", "hua"], ["getClassicalNahuatlNonactiveFormationStructure"], "select-before-finite-realization", "derived-fact"],
  ["nonactive-formation-continuation", ["none", "hua", "lō"], ["getClassicalNahuatlNonactiveFormationStructure"], "select-before-finite-realization", "derived-fact"],
  ["source-final-shape", ["vowel", "ca-qui", "na-ni", "za-ci-cui", "ta-ti", "hua-hui"], ["buildClassicalNahuatlStemFinalShapeFrame"], "recompute-for-every-source", "boundary-conditioned-fact"],
  ["source-morpheme-boundaries", ["solid", "segmented", "compound-first-member"], ["buildClassicalNahuatlStemFinalShapeFrame"], "preserve-through-projection", "boundary-conditioned-fact"],
  ["lexical-exception-or-suppletion", ["regular", "obligatory-exception", "suppletive"], ["getClassicalNahuatlNonactiveStemOptions"], "fixed-before-coordinate-expansion", "lexical-fact"],
  ["licensed-formation-alternatives", ["determinate", "explicit-user-choice"], ["getClassicalNahuatlNonactiveStemOptions"], "one-selected-option-for-all-cells", "derived-fact"],
  ["nonactive-imperfective-perfective", ["imperfective", "perfective"], ["deriveClassicalNahuatlNonactiveStemRecord"], "selected-by-each-mood-tense-cell", "contextual-fact"],
  ["nonactive-class-a1-a2", ["A-1", "A-2"], ["deriveClassicalNahuatlNonactiveStemRecord"], "governs-each-finite-cell", "derived-fact"],
  ["voice-operation", ["passive", "impersonal", "inherent-impersonal", "tla-impersonal"], ["buildClassicalNahuatlDerivedVncFrame"], "one-operation-per-plan", "genuine-user-choice"],
  ["specific-object-promotion", ["promote", "block-without-specific"], ["classical-nahuatl-passive-vnc-passive-transformation-frame"], "promoted-subject-fixed-across-cells", "derived-fact"],
  ["reflexive-ne-retention", ["absent", "retained-shuntline"], ["classical-nahuatl-active-reflexive-object-vnc"], "retained-in-every-authorized-cell", "derived-fact"],
  ["nonspecific-object-retention", ["human", "nonhuman", "none"], ["buildClassicalNahuatlVoiceObjectClusterFrame"], "retained-after-voice-transform", "derived-fact"],
  ["specific-shuntline-retention", ["silent", "sounded", "absent"], ["applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame"], "retained-after-promotion", "derived-fact"],
  ["impersonal-subject-reference", ["referentially-empty-3sg", "specific-patient"], ["classical-nahuatl-vnc-subject-reference-frame"], "derived-not-user-selected", "derived-fact"],
  ["active-agent-deletion", ["deleted-unexpressible"], ["buildClassicalNahuatlDerivedVncFrame"], "invariant-across-paradigm", "derived-fact"],
  ["irregular-stem-tense-dislocation", ["regular", "semantic-morphological-split"], ["buildClassicalNahuatlVerbstemPlan"], "coordinate-specific-morphology", "contextual-fact"],
  ["mood-and-sentence-force", ["indicative", "optative", "imperative", "vetative"], ["buildClassicalNahuatlParticleSentenceSurfaceFrame"], "project-each-licensed-mood", "genuine-user-choice"],
  ["polarity", ["affirmative", "negative"], ["buildClassicalNahuatlParticleSentenceSurfaceFrame"], "project-each-licensed-polarity", "genuine-user-choice"],
  ["semantic-versus-morphological-tense", ["same", "licensed-dislocation"], ["buildClassicalNahuatlVerbstemPlan"], "preserve-both-coordinates", "contextual-fact"],
  ["scalar-versus-full-paradigm", ["single", "prepared-paradigm"], ["buildClassicalNahuatlDerivedVncFrame"], "pointwise-equivalent", "derived-fact"],
  ["lexical-inherent-impersonal-class", ["known-source-default", "user-supplied-source-analysis"], ["getClassicalNahuatlInherentImpersonalSourceAnalysis"], "fixed-before-coordinate-expansion", "lexical-fact"],
  ["tla-impersonal-source-class", ["known-source-default", "open-productive-source"], ["getClassicalNahuatlTlaImpersonalSourceAnalysis"], "fixed-before-coordinate-expansion", "lexical-fact"],
  ["conditioned-boundary-realization", ["regular", "quantity-conditioned", "consonant-conditioned"], ["buildClassicalNahuatlClassCFinalIVowelLengthRuleFrame", "buildClassicalNahuatlFinalIOHuaVowelLengthRuleFrame"], "recompute-for-every-cell", "boundary-conditioned-fact"],
  ["evidence-authority-boundary", ["typed-grammar-only"], ["getClassicalNahuatlVncApplicationAllowedVoices"], "stored-examples-never-authorize", "documentary-fact"],
].map(([axisId, licensedValues, canonicalExecutorIds, paradigmConsequence, semanticFactRole]) => deepFreeze({
  axisId,
  licensedValues,
  canonicalExecutorIds,
  paradigmConsequence,
  semanticFactRole,
  ...(DISTINCTION_AXIS_CONSTRAINTS[axisId] || {}),
}));

const RESTRICTIONS = Object.freeze([
  "nonactive-source-must-be-authorized-active-vnc",
  "passive-requires-specific-or-reflexive-object",
  "passive-agent-cannot-be-expressed",
  "impersonal-blocks-specific-projective-source",
  "inherent-impersonal-requires-intransitive-source-and-typed-lexical-analysis",
  "tla-impersonal-requires-intransitive-source",
  "caller-supplied-derived-stem-cannot-authorize",
  "stored-formula-or-surface-cannot-authorize",
]);

const INTERACTIONS = Object.freeze([
  "nonactive-formation-precedes-voice-transformation",
  "voice-transformation-precedes-class-a-finite-realization",
  "object-promotion-precedes-retained-object-reordering",
  "semantic-tense-selects-licensed-morphological-cell",
  "boundary-realization-recomputes-after-stem-selection",
  "sentence-force-consumes-a-complete-vnc",
  "prepared-paradigm-reuses-the-scalar-predicate-plan",
]);

const EXCEPTION_FAMILIES = Object.freeze([
  "root-plus-ya-deletion-and-retentive-exception",
  "class-c-final-vowel-quantity-and-long-antepenultimate-exception",
  "class-d-reduced-long-final",
  "lohua-suppletion-and-compound-first-member-attachment",
  "o-family-lexical-alternatives",
  "ohua-obligatory-and-optional-lexical-exceptions",
  "hua-transitivity-class-c-and-ci-to-xi-exceptions",
  "hualo-free-variant",
  "irregular-semantic-morphological-tense-dislocation",
]);

export const CLASSICAL_NAHUATL_LESSON22_INHERENT_IMPERSONAL_SOURCES =
  Object.freeze({
    "tōna": Object.freeze({ semanticClass: "meteorological-heat-or-sun" }),
    "quiy-a-hui": Object.freeze({ semanticClass: "meteorological-rain" }),
    "te-c-i-hui": Object.freeze({ semanticClass: "meteorological-hail" }),
    "āy-a-hui": Object.freeze({ semanticClass: "meteorological-fog" }),
    "yohua": Object.freeze({ semanticClass: "meteorological-nightfall" }),
  });

export const CLASSICAL_NAHUATL_LESSON22_TLA_IMPERSONAL_SOURCES =
  Object.freeze({
    "huā-qui": Object.freeze({ realizationRuleId: "prefix-tla", semanticClass: "inchoative", subjectDomain: "general-nonhuman", availableReadings: Object.freeze(["general-drying", "drought"]) }),
    "pol-i-hui": Object.freeze({ realizationRuleId: "prefix-tla", semanticClass: "inchoative", subjectDomain: "general-nonhuman", availableReadings: Object.freeze([]) }),
    "cel-i-ya": Object.freeze({ realizationRuleId: "prefix-tla", semanticClass: "inchoative", subjectDomain: "general-nonhuman", availableReadings: Object.freeze([]) }),
    "ihyā-ya": Object.freeze({ realizationRuleId: "prefix-tla", semanticClass: "stative", subjectDomain: "general-nonhuman", availableReadings: Object.freeze([]) }),
    "cah-ca-h": Object.freeze({ realizationRuleId: "prefix-tla", semanticClass: "stative", subjectDomain: "general-nonhuman", availableReadings: Object.freeze([]) }),
    "on-o": Object.freeze({ realizationRuleId: "prefix-tla", semanticClass: "stative", subjectDomain: "general-nonhuman", availableReadings: Object.freeze([]) }),
    "chic-ā-hua": Object.freeze({ realizationRuleId: "prefix-tla", semanticClass: "inchoative", subjectDomain: "general-nonhuman", availableReadings: Object.freeze([]) }),
    "huē-i-ya": Object.freeze({ realizationRuleId: "prefix-tla", semanticClass: "inchoative", subjectDomain: "general-nonhuman", availableReadings: Object.freeze([]) }),
    "it-hui": Object.freeze({ realizationRuleId: "prefix-tla-drop-supportive-initial-i", semanticClass: "reconstructed-inchoative", subjectDomain: "general-nonhuman", sourceAttestation: "reconstructed-source", availableReadings: Object.freeze(["general-perceptibility", "daybreak"]) }),
    "petl-ā-ni": Object.freeze({ realizationRuleId: "prefix-tla", semanticClass: "meteorological", subjectDomain: "general-nonhuman", availableReadings: Object.freeze([]) }),
    "tlatz-i-ni": Object.freeze({ realizationRuleId: "prefix-tla-lengthen-i-before-ni", semanticClass: "meteorological", subjectDomain: "general-nonhuman", availableReadings: Object.freeze([]) }),
    "poy-ā-hua": Object.freeze({ realizationRuleId: "prefix-tla", semanticClass: "meteorological", subjectDomain: "general-nonhuman", availableReadings: Object.freeze([]) }),
    "nēci": Object.freeze({ realizationRuleId: "prefix-tla", semanticClass: "meteorological", subjectDomain: "general-nonhuman", availableReadings: Object.freeze(["nonspecific-entity-brightness", "general-brightness", "dawn"]) }),
    "ce-ce-ya": Object.freeze({ realizationRuleId: "prefix-tla", semanticClass: "meteorological", subjectDomain: "general-nonhuman", availableReadings: Object.freeze([]) }),
    "yohua": Object.freeze({ realizationRuleId: "prefix-tla", semanticClass: "inherent-impersonal-layer", subjectDomain: "referentially-empty", availableReadings: Object.freeze([]) }),
    "ih-cahu-a-ca": Object.freeze({ realizationRuleId: "prefix-tla-drop-supportive-initial-i", semanticClass: "animate-generality-exception", subjectDomain: "general-human", availableReadings: Object.freeze(["general-noisy-talk", "general-hubbub", "enemy-war-cries"]) }),
    "cue-cuech-ca": Object.freeze({ realizationRuleId: "prefix-tla", semanticClass: "animate-generality-exception", subjectDomain: "general-human", availableReadings: Object.freeze([]) }),
    "izta-ya": Object.freeze({ realizationRuleId: "prefix-tla-drop-supportive-initial-i", semanticClass: "finite-contrast-inchoative", subjectDomain: "general-nonhuman", availableReadings: Object.freeze(["general-whitening", "dawn"]) }),
  });

function normalizeStem(value = "") {
  return String(value || "").trim().replace(/[()]/gu, "").replace(/\s+/gu, "");
}

function boundaryFreeKey(value = "") {
  return normalizeStem(value).replace(/-/gu, "");
}

function resolveInventoryRecord(inventory, sourceStem = "") {
  const normalized = normalizeStem(sourceStem);
  const exact = inventory[normalized];
  if (exact) return { sourceStem: normalized, record: exact };
  const key = boundaryFreeKey(normalized);
  const match = Object.entries(inventory)
    .find(([candidate]) => boundaryFreeKey(candidate) === key);
  return match ? { sourceStem: match[0], record: match[1] } : null;
}

export function deriveClassicalNahuatlTlaImpersonalTargetStem(
  sourceStem = "",
  realizationRuleId = ""
) {
  const normalized = normalizeStem(sourceStem);
  const ruleId = String(realizationRuleId || "").trim();
  if (!normalized) return "";
  if (ruleId === "prefix-tla") {
    return `tla-${normalized}`;
  }
  if (
    ruleId === "prefix-tla-drop-supportive-initial-i"
    && /^i/u.test(normalized)
  ) {
    return `tla-${normalized.slice(1)}`;
  }
  if (
    ruleId === "prefix-tla-lengthen-i-before-ni"
    && /-i-ni$/u.test(normalized)
  ) {
    return `tla-${normalized.replace(/-i(?=-ni$)/u, "-ī")}`;
  }
  return "";
}

export function getClassicalNahuatlInherentImpersonalSourceAnalysis(
  sourceStem = ""
) {
  const normalized = normalizeStem(sourceStem);
  const resolved = resolveInventoryRecord(
    CLASSICAL_NAHUATL_LESSON22_INHERENT_IMPERSONAL_SOURCES,
    normalized
  );
  return Object.freeze({
    kind: "classical-nahuatl-impersonal-vnc-inherent-impersonal-source-analysis",
    version: 1,
    authorizationStatus: normalized ? "authorized" : "blocked",
    blockReason: !normalized
      ? "lesson22-inherent-impersonal-source-stem-required"
      : "",
    enteredSourceStem: normalized,
    canonicalSourceStem: resolved?.sourceStem || normalized,
    semanticClass: resolved?.record.semanticClass || "user-supplied-inherent-impersonal",
    sourceAnalysisStatus: resolved
      ? "canvas-known-lexical-default"
      : "user-supplied-typed-lexical-analysis",
    inherentImpersonalFixedByKnownLexicon: Boolean(resolved),
    canvasExampleMatch: Boolean(resolved),
    callerSuppliedLexicalClassAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

export function getClassicalNahuatlTlaImpersonalSourceAnalysis(
  sourceStem = ""
) {
  const normalized = normalizeStem(sourceStem);
  const resolved = resolveInventoryRecord(
    CLASSICAL_NAHUATL_LESSON22_TLA_IMPERSONAL_SOURCES,
    normalized
  );
  const canonicalSourceStem = resolved?.sourceStem || normalized;
  const realizationRuleId = resolved?.record.realizationRuleId || "prefix-tla";
  const derivedTargetStem = deriveClassicalNahuatlTlaImpersonalTargetStem(
    canonicalSourceStem,
    realizationRuleId
  );
  return Object.freeze({
    kind: "classical-nahuatl-impersonal-vnc-tla-impersonal-source-analysis",
    version: 1,
    authorizationStatus: normalized && derivedTargetStem ? "authorized" : "blocked",
    blockReason: !normalized
      ? "lesson22-tla-impersonal-source-stem-required"
      : derivedTargetStem
        ? ""
        : "lesson22-tla-impersonal-realization-rule-failed",
    enteredSourceStem: normalized,
    canonicalSourceStem,
    realizationRuleId,
    derivedTargetStem,
    semanticClass: resolved?.record.semanticClass || "open-productive-source",
    subjectDomain: resolved?.record.subjectDomain || "context-supplied",
    sourceAttestation: resolved
      ? resolved.record.sourceAttestation || "attested-source"
      : "user-supplied-source",
    sourceAnalysisStatus: resolved
      ? "canvas-known-default-or-exception"
      : "open-productive-source",
    canvasExampleMatch: Boolean(resolved),
    availableReadings: resolved?.record.availableReadings || Object.freeze([]),
    readingSelectionIsUserChoice:
      (resolved?.record.availableReadings?.length || 0) > 1,
    targetDerivedByEngine: Boolean(derivedTargetStem),
    callerSuppliedTargetAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

export function buildClassicalNahuatlVncSubjectReferenceFrame({
  grammaticalVoice = "active",
  subjectMorphology = "3sg",
  subjectAnimacy = "",
  referentIdentity = "",
  supplementPresent = false,
} = {}) {
  const voice = String(grammaticalVoice || "").trim();
  const morphology = String(subjectMorphology || "").trim();
  const animacy = String(subjectAnimacy || "").trim();
  const referent = String(referentIdentity || "").trim();
  const impersonal = [
    "impersonal",
    "inherent-impersonal",
    "tla-impersonal",
  ].includes(voice);
  const nonanimate = voice === "active" && animacy === "nonanimate";
  const authorized = Boolean(
    morphology === "3sg"
    && (
      (impersonal && !referent && supplementPresent !== true)
      || (nonanimate && Boolean(referent))
    )
  );
  const blockReason = morphology !== "3sg"
    ? "lesson22-subject-reference-requires-third-singular-morphology"
    : impersonal && referent
      ? "lesson22-impersonal-subject-cannot-name-a-referent"
      : impersonal && supplementPresent === true
        ? "lesson22-impersonal-subject-cannot-be-supplemented"
        : nonanimate && !referent
          ? "lesson22-nonanimate-subject-referent-identity-required"
          : !impersonal && !nonanimate
            ? "lesson22-subject-reference-construction-not-recognized"
            : "";
  return deepFreeze({
    kind: "classical-nahuatl-vnc-subject-reference-frame",
    version: 1,
    authorizationStatus: authorized ? "authorized" : "blocked",
    blockReason,
    grammaticalVoice: authorized ? voice : "",
    subjectMorphology: authorized ? morphology : "",
    subjectKind: authorized
      ? impersonal
        ? "impersonal-nonreferential"
        : "nonanimate-referential"
      : "",
    grammaticalSubjectPresent: authorized,
    referentIdentity: authorized && nonanimate ? referent : "",
    referentStatus: authorized
      ? impersonal ? "none" : "identifiable"
      : "",
    semanticNumber: authorized
      ? impersonal ? "not-applicable" : "common"
      : "",
    supplementable: authorized && nonanimate,
    supplementPresent: authorized && nonanimate && supplementPresent === true,
    agentless: authorized && voice === "inherent-impersonal",
    facelessAgent: authorized && voice === "impersonal",
    derivedFactIsUserChoice: false,
    formulaStringAuthority: false,
    displayTextAuthority: false,
    callerSuppliedAuthorityAccepted: false,
  });
}

export function buildClassicalNahuatlGrammarContract() {
  return deepFreeze({
    kind: "classical-nahuatl-nonactive-voice-grammar-contract",
    version: 1,
    authorizationStatus: "authorized",
    blockReason: "",
    greatestCommonDivisor: {
      identityId: "typed-active-vnc-to-derived-voice-vnc",
      inputKind: "authorized-typed-active-vnc",
      outputKind: "authorized-typed-derived-voice-vnc",
      predicateInvariant: "exactly-one-typed-verbstem-in-predicate-slot",
      operationOrder: GCD_OPERATION_IDS,
      nonactiveStemRequiredWhen: ["passive", "impersonal"],
      sourceAgentDeleted: true,
      sourceAgentExpressible: false,
      curriculumOrderAuthority: false,
      formulaStringAuthority: false,
      displayTextAuthority: false,
    },
    leastCommonMultiple: {
      distinctionSpecs: DISTINCTION_SPECS,
      operationContracts: OPERATION_CONTRACTS,
      canonicalExecutorInventory: CANONICAL_EXECUTOR_INVENTORY,
      restrictions: RESTRICTIONS,
      interactions: INTERACTIONS,
      exceptionFamilies: EXCEPTION_FAMILIES,
      nonactiveFormationCoreInventory: ["ō", "lō", "hua"],
      nonactiveContinuationInventory: ["none", "hua", "lō"],
      sourceClassInventory: ["A", "B", "C", "D"],
      nonactiveClassInventory: ["A-1", "A-2"],
      voiceOperationInventory: [
        "passive",
        "impersonal",
        "inherent-impersonal",
        "tla-impersonal",
      ],
      sourceValenceInventory: [
        "intransitive",
        "specific-projective",
        "projective-human",
        "projective-nonhuman",
        "mainline-reflexive",
        "shuntline-reflexive",
        "human-reciprocal",
        "multiple-object",
      ],
      objectCountInventory: [0, 1, 2, 3],
      optionSelectionPolicy: "explicit-choice-only-when-multiple-licensed-formations",
      paradigmPolicy: "prepared-projection-must-be-pointwise-scalar-equivalent",
    },
    callerSuppliedAuthorityAccepted: false,
    sourceAuditMetadataPresent: false,
    formulaStringAuthority: false,
    displayTextAuthority: false,
  });
}

export function evaluateClassicalNahuatlGrammarSelection({
  operationId = "",
  sourceAuthorized = false,
  nonactiveRecordAuthorized = false,
  nonactiveFamilyAuthorized = false,
  generatedRuleOptionAuthorized = false,
  sourceValence = "",
  hasSpecificObject = false,
  hasReflexiveObject = false,
  hasSpecificObjectInCluster = false,
  inherentSourceAuthorized = false,
  tlaSourceAuthorized = false,
} = {}) {
  const normalizedOperationId = String(operationId || "").trim();
  const normalizedValence = String(sourceValence || "").trim();
  const passive = normalizedOperationId === "passive";
  const impersonal = normalizedOperationId === "impersonal";
  const inherent = normalizedOperationId === "inherent-impersonal";
  const tla = normalizedOperationId === "tla-impersonal";
  const nonactive = normalizedOperationId === "nonactive";
  const recognized = passive || impersonal || inherent || tla || nonactive;
  const nonspecificOrIntransitive = [
    "intransitive",
    "projective-human",
    "projective-nonhuman",
  ].includes(normalizedValence);
  const nonspecificMultipleObject =
    normalizedValence === "multiple-object"
    && !hasSpecificObject
    && !hasSpecificObjectInCluster;
  const reasons = [
    !recognized ? "nonactive-voice-operation-not-in-lcm" : "",
    !sourceAuthorized ? "authorized-typed-active-vnc-required-by-gcd" : "",
    nonactive && !nonactiveFamilyAuthorized
      ? "nonactive-formation-family-not-in-lcm"
      : "",
    nonactive && !generatedRuleOptionAuthorized
      ? "generated-nonactive-rule-option-required"
      : "",
    (passive || impersonal) && !nonactiveRecordAuthorized
      ? "typed-nonactive-record-required-before-voice"
      : "",
    passive
      && !(hasSpecificObject || hasReflexiveObject || hasSpecificObjectInCluster)
      ? "passive-requires-specific-or-reflexive-object"
      : "",
    impersonal
      && !(nonspecificOrIntransitive || nonspecificMultipleObject || hasReflexiveObject)
      ? "impersonal-blocks-specific-projective-source"
      : "",
    inherent && normalizedValence !== "intransitive"
      ? "inherent-impersonal-requires-intransitive-source"
      : "",
    inherent && !inherentSourceAuthorized
      ? "inherent-impersonal-source-not-in-lcm"
      : "",
    tla && normalizedValence !== "intransitive"
      ? "tla-impersonal-requires-intransitive-source"
      : "",
    tla && !tlaSourceAuthorized
      ? "tla-impersonal-source-not-in-lcm"
      : "",
  ].filter(Boolean);
  const appliedOperationIds = [
    GCD_OPERATION_IDS[0],
    nonactive || passive || impersonal ? GCD_OPERATION_IDS[1] : "",
    passive || impersonal || inherent || tla ? GCD_OPERATION_IDS[2] : "",
  ].filter(Boolean);
  const plan = OPERATION_CONTRACT_OWNER.evaluatePlan({
    domain: "classical-vnc-nonactive-voice",
    contracts: OPERATION_CONTRACTS,
    appliedOperationIds,
    requiredOperationIds: appliedOperationIds,
    resultOperationId: appliedOperationIds[appliedOperationIds.length - 1] || "",
    requestedOutputKind: nonactive
      ? "typed-nonactive-stem"
      : "typed-derived-voice-vnc",
    sourceAuthorized: reasons.length === 0,
    sourceBlockReason: reasons[0] || "",
  });
  return deepFreeze({
    kind: "classical-nahuatl-nonactive-voice-grammar-selection-frame",
    version: 1,
    operationId: normalizedOperationId,
    authorizationStatus: reasons.length || plan.authorizationStatus !== "authorized"
      ? "blocked"
      : "authorized",
    blockReason: reasons[0] || plan.blockReason,
    gcdOperationIds: appliedOperationIds,
    operationPlan: plan,
    sourceValence: normalizedValence,
    sourceAgentExpressible: false,
    callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false,
    displayTextAuthority: false,
  });
}
