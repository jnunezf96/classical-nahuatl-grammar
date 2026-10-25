// Canonical modern ESM module.
import { getFrequentativeDestockalConstitution } from "./frequentative_destockal_structure.mjs";

import {
  getClassicalNahuatlKarttunen1992DerivationEvidenceMatches,
  getClassicalNahuatlKarttunen1992EvidenceSignature,
  isClassicalNahuatlKarttunen1992EvidenceMatchSet,
} from "./karttunen_1992_derivation_evidence.mjs?v=20260726-lessons2-58-one-system-094";
import {
  createGrammarOperationContractOwner,
} from "../grammar/operation_owner.mjs?v=20260728-runtime-reachability-111";
import {
  buildClassicalNahuatlVncSubjectReferenceFrame,
  buildClassicalNahuatlGrammarContract,
  deriveClassicalNahuatlTlaImpersonalTargetStem,
  evaluateClassicalNahuatlGrammarSelection,
  getClassicalNahuatlInherentImpersonalSourceAnalysis,
  getClassicalNahuatlTlaImpersonalSourceAnalysis,
} from "./vnc_lessons20_22_grammar.mjs?v=20261001-reader-26-4-optional-weather-2";
import {
  buildClassicalNahuatlParticipantRoleTransitionFrame,
  buildClassicalNahuatlParticipantFrame,
  isClassicalNahuatlParticipantFrame,
} from "./participant_frame.mjs?v=20260823-passive-formation-continuity-238";

export const CLASSICAL_NAHUATL_VNC_TARGET_VOICES = Object.freeze([
  "active",
  "passive",
  "impersonal",
]);
export const CLASSICAL_NAHUATL_VNC_TARGET_VOICE_OPERATIONS = Object.freeze([
  ...CLASSICAL_NAHUATL_VNC_TARGET_VOICES,
  "inherent-impersonal",
  "tla-impersonal",
]);
export const CLASSICAL_NAHUATL_VNC_CAUSATIVE_SOURCE_VOICES = Object.freeze([
  "active",
  "passive",
  "impersonal",
]);

export function normalizeClassicalNahuatlVncVoice(value = "", role = "target") {
  const normalized = String(value == null ? "" : value).trim().toLowerCase();
  const vocabulary = role === "causative-source"
    ? CLASSICAL_NAHUATL_VNC_CAUSATIVE_SOURCE_VOICES
    : CLASSICAL_NAHUATL_VNC_TARGET_VOICES;
  return vocabulary.includes(normalized) ? normalized : "";
}

export function getClassicalNahuatlVncVoiceVocabulary() {
  return {
    kind: "classical-nahuatl-vnc-voice-vocabulary",
    version: 1,
    targetVoices: [...CLASSICAL_NAHUATL_VNC_TARGET_VOICES],
    targetVoiceOperations: [...CLASSICAL_NAHUATL_VNC_TARGET_VOICE_OPERATIONS],
    causativeSourceVoices: [...CLASSICAL_NAHUATL_VNC_CAUSATIVE_SOURCE_VOICES],
    causativeSourceVoiceIsContextualSubset: CLASSICAL_NAHUATL_VNC_CAUSATIVE_SOURCE_VOICES.every(voice => CLASSICAL_NAHUATL_VNC_TARGET_VOICES.includes(voice)),
    higherVoiceLayersAreSeparate: true,
    authority: "Andrews Lessons 20-22 and Lesson 25 Canvas voice operations",
  };
}

export function validateClassicalNahuatlVncVoiceSelection(value = "", role = "target") {
  const normalizedRole = role === "causative-source" ? "causative-source" : "target";
  const requestedVoice = String(value == null ? "" : value).trim().toLowerCase();
  const voice = normalizeClassicalNahuatlVncVoice(requestedVoice, normalizedRole);
  return {
    kind: "classical-nahuatl-vnc-voice-selection-frame",
    version: 1,
    role: normalizedRole,
    requestedVoice,
    voice,
    allowedVoices: [...(normalizedRole === "causative-source" ? CLASSICAL_NAHUATL_VNC_CAUSATIVE_SOURCE_VOICES : CLASSICAL_NAHUATL_VNC_TARGET_VOICES)],
    authorizationStatus: voice ? "authorized" : "blocked",
    blockReason: voice ? "" : normalizedRole === "causative-source" ? "classical-vnc-causative-source-voice-not-recognized" : "classical-vnc-target-voice-not-recognized",
    contextualAvailabilityRemainsApplicationDerived: true,
  };
}

export function validateClassicalNahuatlVncVoiceControlInventory({
  targetVoiceOptions = [],
  causativeSourceVoiceOptions = [],
  authorityOptionTags = [],
} = {}) {
  const normalizeOption = option => typeof option === "string"
    ? { value: String(option), tagId: "" }
    : { value: String(option?.value || ""), tagId: String(option?.tagId || "") };
  const targetOptions = Array.isArray(targetVoiceOptions) ? targetVoiceOptions.map(normalizeOption) : [];
  const sourceOptions = Array.isArray(causativeSourceVoiceOptions) ? causativeSourceVoiceOptions.map(normalizeOption) : [];
  const targetValues = targetOptions.map(option => option.value);
  const sourceValues = sourceOptions.map(option => option.value);
  const expectedTargetValues = [...CLASSICAL_NAHUATL_VNC_TARGET_VOICES];
  const expectedSourceValues = [...CLASSICAL_NAHUATL_VNC_CAUSATIVE_SOURCE_VOICES];
  const records = Array.isArray(authorityOptionTags) ? authorityOptionTags : [];
  const taggedOptions = [
    ...targetOptions.map(option => ({ ...option, controlId: "classical-rule-logic-vnc-voice" })),
    ...sourceOptions.map(option => ({ ...option, controlId: "classical-rule-logic-causative-source-voice" })),
  ];
  const mismatchedAuthorityOptions = taggedOptions.filter(option => {
    const record = records.find(candidate => String(candidate?.tagId || "") === option.tagId);
    return !record || String(record.controlId || "") !== option.controlId || String(record.value || "") !== option.value;
  }).map(option => `${option.controlId}:${option.value}:${option.tagId || "<untagged>"}`);
  const duplicateTargetValues = targetValues.filter((value, index, all) => all.indexOf(value) !== index);
  const duplicateSourceValues = sourceValues.filter((value, index, all) => all.indexOf(value) !== index);
  const targetInventoryMatches = targetValues.length === expectedTargetValues.length && targetValues.every((value, index) => value === expectedTargetValues[index]);
  const sourceInventoryMatches = sourceValues.length === expectedSourceValues.length && sourceValues.every((value, index) => value === expectedSourceValues[index]);
  const authorized = targetInventoryMatches && sourceInventoryMatches && !duplicateTargetValues.length && !duplicateSourceValues.length && !mismatchedAuthorityOptions.length;
  return {
    kind: "classical-nahuatl-vnc-voice-control-inventory-validation-frame",
    version: 1,
    authorizationStatus: authorized ? "authorized" : "blocked",
    blockReason: authorized ? "" : "classical-vnc-voice-control-inventory-mismatch",
    targetValues,
    sourceValues,
    expectedTargetValues,
    expectedSourceValues,
    targetInventoryMatches,
    sourceInventoryMatches,
    duplicateTargetValues: Array.from(new Set(duplicateTargetValues)),
    duplicateSourceValues: Array.from(new Set(duplicateSourceValues)),
    mismatchedAuthorityOptions,
    shellAndLedgerAreNotGrammarAuthority: true,
  };
}

export const CLASSICAL_NAHUATL_VNC_SEMANTIC_MOODS = Object.freeze([
  "indicative",
  "optative",
  "admonitive",
]);
export const CLASSICAL_NAHUATL_VNC_SEMANTIC_TENSES_BY_MOOD = Object.freeze({
  indicative: Object.freeze(["present", "preterit", "future", "distant-past", "general-past", "customary-present", "imperfect"]),
  optative: Object.freeze(["nonpast", "past", "future", "preterit"]),
  admonitive: Object.freeze(["nonpast"]),
});
export const CLASSICAL_NAHUATL_VNC_SEMANTIC_TENSES = Object.freeze([
  "present",
  "preterit",
  "future",
  "distant-past",
  "general-past",
  "customary-present",
  "imperfect",
  "nonpast",
  "past",
]);
export const CLASSICAL_NAHUATL_VNC_PARADIGM_TENSES_BY_MOOD = Object.freeze({
  indicative: Object.freeze([
    "present",
    "preterit-as-present",
    "preterit",
    "future",
    "distant-past",
    "distant-past-as-past",
    "customary-present",
    "imperfect",
  ]),
  optative: Object.freeze(["nonpast", "past", "future", "preterit"]),
  admonitive: Object.freeze(["nonpast"]),
});
export const CLASSICAL_NAHUATL_VNC_PARADIGM_TENSES = Object.freeze(
  Array.from(new Set(Object.values(CLASSICAL_NAHUATL_VNC_PARADIGM_TENSES_BY_MOOD).flat())),
);
export const CLASSICAL_NAHUATL_VNC_SEMANTIC_VALUE_BY_PARADIGM_TENSE = Object.freeze({
  "preterit-as-present": "present",
  "distant-past-as-past": "general-past",
});

export function normalizeClassicalNahuatlVncSemanticInputToken(value = "") {
  return String(value || "").trim().toLowerCase().replace(/[\s_]/gu, "-");
}

export function normalizeClassicalNahuatlVncSemanticMood(value = "") {
  const normalized = normalizeClassicalNahuatlVncSemanticInputToken(value);
  return CLASSICAL_NAHUATL_VNC_SEMANTIC_MOODS.includes(normalized) ? normalized : "";
}

export function normalizeClassicalNahuatlVncSemanticTense(value = "") {
  const normalized = normalizeClassicalNahuatlVncSemanticInputToken(value);
  const semanticValue = CLASSICAL_NAHUATL_VNC_SEMANTIC_VALUE_BY_PARADIGM_TENSE[normalized] || normalized;
  return CLASSICAL_NAHUATL_VNC_SEMANTIC_TENSES.includes(semanticValue) ? semanticValue : "";
}

export function normalizeClassicalNahuatlVncParadigmTense(value = "") {
  const normalized = normalizeClassicalNahuatlVncSemanticInputToken(value);
  const canonical = normalized === "general-past" ? "distant-past-as-past" : normalized;
  return CLASSICAL_NAHUATL_VNC_PARADIGM_TENSES.includes(canonical) ? canonical : "";
}

export function getClassicalNahuatlVncSemanticValueForParadigmTense(value = "") {
  const paradigmTense = normalizeClassicalNahuatlVncParadigmTense(value);
  return paradigmTense
    ? CLASSICAL_NAHUATL_VNC_SEMANTIC_VALUE_BY_PARADIGM_TENSE[paradigmTense] || paradigmTense
    : "";
}

export function getClassicalNahuatlVncSemanticTensesForMood(mood = "") {
  const normalizedMood = normalizeClassicalNahuatlVncSemanticMood(mood);
  return [...(CLASSICAL_NAHUATL_VNC_SEMANTIC_TENSES_BY_MOOD[normalizedMood] || [])];
}

export function getClassicalNahuatlVncParadigmTensesForMood(mood = "") {
  const normalizedMood = normalizeClassicalNahuatlVncSemanticMood(mood);
  return [...(CLASSICAL_NAHUATL_VNC_PARADIGM_TENSES_BY_MOOD[normalizedMood] || [])];
}

export function getClassicalNahuatlVncSemanticInputVocabulary() {
  return {
    kind: "classical-nahuatl-vnc-semantic-input-vocabulary",
    version: 2,
    moods: [...CLASSICAL_NAHUATL_VNC_SEMANTIC_MOODS],
    tenses: [...CLASSICAL_NAHUATL_VNC_PARADIGM_TENSES],
    paradigmTenses: [...CLASSICAL_NAHUATL_VNC_PARADIGM_TENSES],
    semanticTenseValues: [...CLASSICAL_NAHUATL_VNC_SEMANTIC_TENSES],
    tensesByMood: Object.fromEntries(CLASSICAL_NAHUATL_VNC_SEMANTIC_MOODS.map(mood => [mood, getClassicalNahuatlVncSemanticTensesForMood(mood)])),
    paradigmTensesByMood: Object.fromEntries(CLASSICAL_NAHUATL_VNC_SEMANTIC_MOODS.map(mood => [mood, getClassicalNahuatlVncParadigmTensesForMood(mood)])),
    authority: "Andrews Canvas semantic VNC categories",
    morphologicalFillersAreSeparate: true,
    paradigmTenseIdentityIsSeparate: true,
  };
}

export function validateClassicalNahuatlVncSemanticSelection({
  mood = "",
  tense = "",
  allowedSemanticTenses = null,
  enforceMoodCompatibility = true,
} = {}) {
  const requestedMood = normalizeClassicalNahuatlVncSemanticInputToken(mood);
  const requestedParadigmTense = normalizeClassicalNahuatlVncSemanticInputToken(tense);
  const requestedSemanticTense = normalizeClassicalNahuatlVncSemanticTense(requestedParadigmTense)
    || requestedParadigmTense;
  const normalizedMood = normalizeClassicalNahuatlVncSemanticMood(requestedMood);
  const normalizedParadigmTense = normalizeClassicalNahuatlVncParadigmTense(requestedParadigmTense);
  const normalizedSemanticTense = normalizeClassicalNahuatlVncSemanticTense(requestedSemanticTense);
  const moodTenses = getClassicalNahuatlVncSemanticTensesForMood(normalizedMood);
  const moodParadigmTenses = getClassicalNahuatlVncParadigmTensesForMood(normalizedMood);
  const contextualTenses = Array.isArray(allowedSemanticTenses)
    ? Array.from(new Set(allowedSemanticTenses.map(normalizeClassicalNahuatlVncSemanticTense).filter(Boolean)))
    : moodTenses;
  let blockReason = "";
  if (!normalizedMood) {
    blockReason = "vnc-semantic-mood-not-recognized";
  } else if (!normalizedParadigmTense || !normalizedSemanticTense) {
    blockReason = "vnc-semantic-tense-not-recognized";
  } else if (enforceMoodCompatibility && !moodParadigmTenses.includes(normalizedParadigmTense)) {
    blockReason = "vnc-semantic-tense-not-authorized-for-mood";
  } else if (Array.isArray(allowedSemanticTenses) && !contextualTenses.includes(normalizedSemanticTense)) {
    blockReason = "vnc-semantic-tense-not-authorized-for-selected-verbstem";
  }
  return {
    kind: "classical-nahuatl-vnc-semantic-selection-frame",
    version: 1,
    requestedMood,
    requestedSemanticTense,
    requestedParadigmTense,
    mood: normalizedMood,
    semanticTense: normalizedSemanticTense,
    semanticTenseValue: normalizedSemanticTense,
    paradigmTense: normalizedParadigmTense,
    moodTenses,
    moodParadigmTenses,
    allowedSemanticTenses: contextualTenses,
    moodCompatibilityEnforced: enforceMoodCompatibility === true,
    authorizationStatus: blockReason ? "blocked" : "authorized",
    blockReason,
    semanticTenseIsNotMorphologicalFiller: true,
  };
}

export function validateClassicalNahuatlVncSemanticControlInventory({
  moodOptions = [],
  tenseOptions = [],
  authorityOptionTags = [],
} = {}) {
  const normalizeOption = option => typeof option === "string"
    ? { value: String(option), tagId: "" }
    : { value: String(option?.value || ""), tagId: String(option?.tagId || "") };
  const normalizedMoodOptions = Array.isArray(moodOptions) ? moodOptions.map(normalizeOption) : [];
  const normalizedTenseOptions = Array.isArray(tenseOptions) ? tenseOptions.map(normalizeOption) : [];
  const moodValues = normalizedMoodOptions.map(option => option.value);
  const tenseValues = normalizedTenseOptions.map(option => option.value);
  const expectedMoodValues = [...CLASSICAL_NAHUATL_VNC_SEMANTIC_MOODS];
  const expectedTenseValues = [...CLASSICAL_NAHUATL_VNC_PARADIGM_TENSES];
  const records = Array.isArray(authorityOptionTags) ? authorityOptionTags : [];
  const mismatchedAuthorityOptions = [...normalizedMoodOptions.map(option => ({ ...option, controlId: "classical-rule-logic-mood" })), ...normalizedTenseOptions.map(option => ({ ...option, controlId: "classical-rule-logic-tense" }))]
    .filter(option => {
      const record = records.find(candidate => String(candidate?.tagId || "") === option.tagId);
      return !record || String(record.controlId || "") !== option.controlId || String(record.value || "") !== option.value;
    })
    .map(option => `${option.controlId}:${option.value}:${option.tagId || "<untagged>"}`);
  const moodInventoryMatches = moodValues.length === expectedMoodValues.length && moodValues.every((value, index) => value === expectedMoodValues[index]);
  const tenseInventoryMatches = tenseValues.length === expectedTenseValues.length && tenseValues.every((value, index) => value === expectedTenseValues[index]);
  const duplicateMoodValues = moodValues.filter((value, index, all) => all.indexOf(value) !== index);
  const duplicateTenseValues = tenseValues.filter((value, index, all) => all.indexOf(value) !== index);
  const authorized = moodInventoryMatches && tenseInventoryMatches && !duplicateMoodValues.length && !duplicateTenseValues.length && !mismatchedAuthorityOptions.length;
  return {
    kind: "classical-nahuatl-vnc-semantic-control-inventory-validation-frame",
    version: 1,
    authorizationStatus: authorized ? "authorized" : "blocked",
    blockReason: authorized ? "" : "vnc-semantic-control-inventory-does-not-match-canonical-contract",
    moodValues,
    tenseValues,
    expectedMoodValues,
    expectedTenseValues,
    moodInventoryMatches,
    tenseInventoryMatches,
    duplicateMoodValues: Array.from(new Set(duplicateMoodValues)),
    duplicateTenseValues: Array.from(new Set(duplicateTenseValues)),
    mismatchedAuthorityOptions,
    shellAndLedgerAreNotGrammarAuthority: true,
  };
}

export function createClassicalNahuatlVncLayerEvaluatorApi(targetObject = globalThis) {
    const CLASSICAL_NAHUATL_VNC_SLOT_FRAME_VERSION = 1;
    const CLASSICAL_NAHUATL_VNC_SLOT_SOURCE_DOCUMENT = "ANDREWS_TRANSCRIPTION_CANVAS.md";
    const CLASSICAL_NAHUATL_VNC_SLOT_SQUARE_ZERO = "\u2395";
    const CLASSICAL_NAHUATL_LESSON20_ISSUED_NONACTIVE_RECORDS = new WeakSet();
    const classicalNahuatlNonactiveCoreVoiceChainReceipts = new WeakMap();
    const CLASSICAL_NAHUATL_ISSUED_NONACTIVE_SOURCE_IDENTITIES = new WeakSet();
    const CLASSICAL_NAHUATL_ISSUED_NONACTIVE_LEXICAL_LICENSES = new WeakSet();
    const CLASSICAL_NAHUATL_ISSUED_CONTEXTUAL_FORMULA_CARRIER_PROJECTIONS = new WeakSet();
    const CLASSICAL_NAHUATL_LESSON23_ISSUED_OBJECT_CLUSTER_FRAMES = new WeakSet();
    const classicalNahuatlObjectClusterParticipantReceipts = new WeakMap();
    const classicalNahuatlRetainedObjectParticipants = new WeakSet();
    const CLASSICAL_NAHUATL_LESSON23_ISSUED_OBJECT_ROLE_AMBIGUITY_FRAMES = new WeakSet();
    const CLASSICAL_NAHUATL_LESSON23_ISSUED_MULTIPLE_OBJECT_VNC_FRAMES = new WeakSet();
    const classicalNahuatlMultipleObjectFormulaSources = new WeakMap();
    const classicalNahuatlIssuedVncDiagrammaticFrames = new WeakSet();
    function cloneClassicalNahuatlVncSlotValue(value, seen = new WeakMap()) {
      if (!value || typeof value !== "object") return value;
      // Accepted canonical Participants are immutable semantic operands. Slot
      // realization copies morphology, while retaining those exact referents.
      if (classicalNahuatlRetainedObjectParticipants.has(value)) return value;
      if (seen.has(value)) return seen.get(value);
      const cloned = Array.isArray(value) ? [] : {};
      seen.set(value, cloned);
      const entries = Array.isArray(value)
        ? Array.from({ length: value.length }, (_, index) => index)
          .filter(index => index in value).map(index => [String(index), value[index]])
        : Object.entries(value);
      entries.forEach(([key, entry]) => {
        Object.defineProperty(cloned, key, {
          value: cloneClassicalNahuatlVncSlotValue(entry, seen),
          enumerable: true, writable: true, configurable: true,
        });
      });
      if (Array.isArray(value)) cloned.length = value.length;
      return cloned;
    }
    function normalizeClassicalNahuatlVncSlotCarrier(value = "") {
      return String(value == null ? "" : value).trim();
    }
    function normalizeClassicalNahuatlVncSlotStem(value = "") {
      return normalizeClassicalNahuatlVncSlotCarrier(value).replace(/^\((.*)\)$/u, "$1").normalize("NFC").trim();
    }
    function getClassicalNahuatlBoundaryFreeLexicalKey(value = "") {
      // Editorial morpheme boundaries are observations, not part of lexical
      // identity.  Do not fold vowel quantity (or any other spelling contrast)
      // while comparing a user-entered source with an Andrews inventory key.
      return normalizeClassicalNahuatlVncSlotStem(value).replace(/-/gu, "");
    }
    function resolveClassicalNahuatlLesson20InventoryEntry(inventory = null, sourceStem = "") {
      const lexicalIdentityKey = getClassicalNahuatlBoundaryFreeLexicalKey(sourceStem);
      const entry = lexicalIdentityKey && inventory && typeof inventory === "object"
        ? Object.entries(inventory).find(([candidateSourceStem]) => getClassicalNahuatlBoundaryFreeLexicalKey(candidateSourceStem) === lexicalIdentityKey) || null
        : null;
      return Object.freeze({
        lexicalIdentityKey,
        inventorySourceStem: entry?.[0] || "",
        formations: entry?.[1] || Object.freeze([]),
        boundaryInsensitiveMatch: Boolean(entry && entry[0] !== normalizeClassicalNahuatlVncSlotStem(sourceStem)),
        vowelQuantityFolded: false
      });
    }
    function getClassicalNahuatlVncSlotFirstSound(value = "") {
      const normalized = normalizeClassicalNahuatlVncSlotCarrier(value).normalize("NFD").replace(/[\u0300-\u036f]/gu, "").toLowerCase();
      const match = normalized.match(/[a-z]/u);
      return match ? match[0] : "";
    }
    function getClassicalNahuatlVncSlotLastSound(value = "") {
      const normalized = normalizeClassicalNahuatlVncSlotCarrier(value).normalize("NFD").replace(/[\u0300-\u036f]/gu, "").toLowerCase();
      const matches = normalized.match(/[a-z]/gu);
      return matches?.length ? matches[matches.length - 1] : "";
    }
    function isClassicalNahuatlVncSlotVowelSound(value = "") {
      return /^[aeio]$/u.test(String(value || "").toLowerCase());
    }
    function getClassicalNahuatlVncSubjectCarrierFamily(carrier = "") {
      const normalized = normalizeClassicalNahuatlVncSlotCarrier(carrier);
      if (["n", "ni", "no"].includes(normalized)) {
        return {
          bare: "n",
          supportive: "ni",
          onSupportive: "no"
        };
      }
      if (["t", "ti", "to"].includes(normalized)) {
        return {
          bare: "t",
          supportive: "ti",
          onSupportive: "to"
        };
      }
      if (["x", "xi", "xo"].includes(normalized)) {
        return {
          bare: "x",
          supportive: "xi",
          onSupportive: "xo"
        };
      }
      return null;
    }
    function getClassicalNahuatlVncDirectionalSubjectCarrierRealization(typedSlotFrame = null, carrier = "") {
      const prePredicate = Array.isArray(typedSlotFrame?.slots?.prePredicate)
        ? typedSlotFrame.slots.prePredicate
        : [];
      const slotIsSilent = slot => normalizeClassicalNahuatlVncSlotCarrier(
        slot?.carrier,
      ).split("-").every(isClassicalNahuatlVncSilentCarrier);
      const firstSoundedIndex = prePredicate.findIndex(
        slot => !slotIsSilent(slot),
      );
      const firstSlot = firstSoundedIndex >= 0
        ? prePredicate[firstSoundedIndex]
        : null;
      const secondSlot = firstSoundedIndex >= 0
        ? prePredicate.slice(firstSoundedIndex + 1).find(
          slot => !slotIsSilent(slot),
        ) || null
        : null;
      const family = getClassicalNahuatlVncSubjectCarrierFamily(carrier);
      return family && firstSlot?.kind === "dyadic-valence" && firstSlot.va1 === "c" && firstSlot.va2 === "0" && ["on", "o"].includes(secondSlot?.carrier)
        ? family.onSupportive
        : "";
    }
    function issueClassicalNahuatlContextualFormulaCarrierProjection(ownerTypedObjectPosition = null, {
      voice = "",
      tense = "",
      sourceObjectClusterFrame = null,
      nonactiveStemRecord = null,
      promotedPosition = null
    } = {}) {
      const normalizedVoice = normalizeClassicalNahuatlVncSlotCarrier(voice);
      const normalizedTense = normalizeClassicalNahuatlVncSlotCarrier(tense);
      const sourceCarrier = normalizeClassicalNahuatlVncSlotCarrier(ownerTypedObjectPosition?.carrier);
      const sourceVa = normalizeClassicalNahuatlVncSlotCarrier(ownerTypedObjectPosition?.va);
      if (normalizedVoice !== "passive"
        || normalizedTense !== "future"
        || normalizeClassicalNahuatlVncSlotStem(sourceObjectClusterFrame?.sourceStem) !== "maca"
        || normalizeClassicalNahuatlVncSlotCarrier(sourceObjectClusterFrame?.subject) !== "3sg"
        || sourceObjectClusterFrame?.positions?.length !== 2
        || normalizeClassicalNahuatlVncSlotStem(nonactiveStemRecord?.sourceStem) !== "maca"
        || normalizeClassicalNahuatlVncSlotStem(nonactiveStemRecord?.nonactiveStem) !== "mac-ō"
        || nonactiveStemRecord?.suffixFamily !== "ō"
        || promotedPosition?.objectKind !== "specific-projective"
        || normalizeClassicalNahuatlVncSlotCarrier(promotedPosition?.objectPerson) !== "3sg"
        || promotedPosition?.governor !== "directive"
        || ownerTypedObjectPosition?.objectKind !== "nonspecific-human"
        || ownerTypedObjectPosition?.governor !== "applicative"
        || sourceCarrier !== "tē"
        || sourceVa !== "tē") {
        return null;
      }
      const projection = Object.freeze({
        kind: "classical-nahuatl-contextual-formula-carrier-projection-frame",
        version: 1,
        sourceAuthority: "Andrews §21.2.5 contextual formula transcription",
        sourceDocument: CLASSICAL_NAHUATL_VNC_SLOT_SOURCE_DOCUMENT,
        authorizationStatus: "authorized",
        blockReason: "",
        section: "21.2.5",
        voice: normalizedVoice,
        tense: normalizedTense,
        sourceStem: "maca",
        sourceNonactiveStem: "mac-ō",
        sourceSubject: "3sg",
        promotedObjectId: normalizeClassicalNahuatlVncSlotCarrier(promotedPosition.objectId),
        promotedObjectPerson: "3sg",
        objectId: normalizeClassicalNahuatlVncSlotCarrier(ownerTypedObjectPosition.objectId),
        objectKind: ownerTypedObjectPosition.objectKind,
        ownerTypedObjectPosition,
        sourceCarrier,
        formulaCarrier: "te",
        surfaceCarrier: sourceCarrier,
        operation: "project-passive-formula-short-e-without-changing-the-participant",
        participantTransformation: false,
        voiceTransformation: false,
        formulaOnly: true,
        formulaStringAuthority: false,
        surfaceStringAuthority: false
      });
      CLASSICAL_NAHUATL_ISSUED_CONTEXTUAL_FORMULA_CARRIER_PROJECTIONS.add(projection);
      return projection;
    }
    function isClassicalNahuatlContextualFormulaCarrierProjection(frame = null, ownerTypedObjectPosition = null) {
      return Boolean(frame
        && CLASSICAL_NAHUATL_ISSUED_CONTEXTUAL_FORMULA_CARRIER_PROJECTIONS.has(frame)
        && frame.kind === "classical-nahuatl-contextual-formula-carrier-projection-frame"
        && frame.version === 1
        && frame.authorizationStatus === "authorized"
        && frame.section === "21.2.5"
        && frame.voice === "passive"
        && frame.tense === "future"
        && frame.sourceStem === "maca"
        && frame.sourceNonactiveStem === "mac-ō"
        && frame.sourceSubject === "3sg"
        && frame.promotedObjectId
        && frame.promotedObjectPerson === "3sg"
        && frame.ownerTypedObjectPosition === ownerTypedObjectPosition
        && frame.objectId === normalizeClassicalNahuatlVncSlotCarrier(ownerTypedObjectPosition?.objectId)
        && frame.objectKind === "nonspecific-human"
        && ownerTypedObjectPosition?.objectKind === "nonspecific-human"
        && frame.sourceCarrier === "tē"
        && ownerTypedObjectPosition?.carrier === "tē"
        && ownerTypedObjectPosition?.va === "tē"
        && frame.formulaCarrier === "te"
        && frame.surfaceCarrier === "tē"
        && frame.participantTransformation === false
        && frame.voiceTransformation === false
        && frame.formulaOnly === true
        && frame.formulaStringAuthority === false
        && frame.surfaceStringAuthority === false);
    }
    function getClassicalNahuatlContextualFormulaCarrierProjection(objectFrame = null, ownerTypedObjectPosition = null) {
      return (Array.isArray(objectFrame?.formulaCarrierProjectionFrames)
        ? objectFrame.formulaCarrierProjectionFrames
        : []
      ).find(frame => isClassicalNahuatlContextualFormulaCarrierProjection(frame, ownerTypedObjectPosition)) || null;
    }
    function getClassicalNahuatlVncSlotFormulaCarrier(
      position = null,
      surfaceCarrier = "",
      projectionEnvironment = "lesson23-multiple-object"
    ) {
      const normalizedSurfaceCarrier =
        normalizeClassicalNahuatlVncSlotCarrier(surfaceCarrier);
      // A Lesson 23 multiple-object position retains the typed dyad printed by
      // Andrews: incompatible third singular is 0-0 and shuntline third plural
      // is 0-im/qu-im. Later derivational owners may project those same typed
      // participants as square-zero or qu-in in their own environments; that
      // later projection must not rewrite the lower owner here.
      if (
        position?.objectKind === "specific-projective"
        && [
          "incompatible-specific-projective-silenced",
          "shuntline-third-plural-keeps-number"
        ].includes(position?.silencingRule)
        && projectionEnvironment === "lesson23-multiple-object"
      ) {
        return normalizedSurfaceCarrier;
      }
      // Outside the exact multiple-object shuntline environment, square-zero
      // remains the formula realization of an owner-typed, contextually silent
      // specific-object position. It is neither missing data nor selectable
      // spelling, and written realization suppresses it independently.
      if (
        position?.objectKind === "specific-projective"
        && position?.sounded === false
      ) {
        if (normalizedSurfaceCarrier === "0-im") {
          return `${CLASSICAL_NAHUATL_VNC_SLOT_SQUARE_ZERO}-in`;
        }
        return (position?.morphologicalObjectPerson || position?.objectPerson) === "3sg"
          ? `${CLASSICAL_NAHUATL_VNC_SLOT_SQUARE_ZERO}-0`
          : `${CLASSICAL_NAHUATL_VNC_SLOT_SQUARE_ZERO}-${CLASSICAL_NAHUATL_VNC_SLOT_SQUARE_ZERO}`;
      }
      if (
        position?.objectKind === "specific-projective"
        && position?.objectPerson === "3pl"
        && ["qu-im", "qu-in"].includes(normalizedSurfaceCarrier)
      ) {
        return "qu-in";
      }
      return position ? normalizedSurfaceCarrier : "";
    }
    function buildClassicalNahuatlVncSlotFrame({
      sourceFrameKind = "",
      sourceAuthorizationStatus = "",
      stem = "",
      personDyad = null,
      tenseFrame = null,
      numberDyad = null,
      objectFrame = null,
      internalStateFrame = null,
      formulaArtifact = ""
    } = {}) {
      const pers1 = normalizeClassicalNahuatlVncSlotCarrier(personDyad?.pers1);
      const pers2 = normalizeClassicalNahuatlVncSlotCarrier(personDyad?.pers2);
      const predicateStem = normalizeClassicalNahuatlVncSlotStem(objectFrame?.stemRealization || stem);
      const tns = normalizeClassicalNahuatlVncSlotCarrier(tenseFrame?.tns);
      const num1 = normalizeClassicalNahuatlVncSlotCarrier(numberDyad?.num1);
      const num2 = normalizeClassicalNahuatlVncSlotCarrier(numberDyad?.num2);
      const valenceArity = objectFrame?.valenceArity === "multiple" ? "multiple" : objectFrame?.valenceArity === "monadic" ? "monadic" : objectFrame?.valenceArity === "dyadic" ? "dyadic" : "vacant";
      const internalStateSlots =
        internalStateFrame?.authorizationStatus === "authorized"
        && Array.isArray(internalStateFrame.slots)
          ? internalStateFrame.slots
              .map((slot, index) => ({
                id: `state-${index + 1}`,
                role: slot?.role || `state-${index + 1}`,
                kind: "vnc-internal-state",
                carrier: normalizeClassicalNahuatlVncSlotCarrier(
                  slot?.carrier
                ),
              }))
              .filter(slot => slot.carrier)
          : [];
      const internalStateAuthorized = !internalStateFrame
        || (
          internalStateFrame.authorizationStatus === "authorized"
          && internalStateSlots.length
            === (Array.isArray(internalStateFrame.slots)
              ? internalStateFrame.slots.length
              : 0)
        );
      const prePredicateSlots = [...internalStateSlots];
      if (valenceArity === "multiple") {
        (Array.isArray(objectFrame?.positions) ? objectFrame.positions : []).forEach((position, index) => {
          const positionArity = position?.valenceArity === "monadic" ? "monadic" : "dyadic";
          if (positionArity === "monadic") {
            const formulaCarrierProjectionFrame = getClassicalNahuatlContextualFormulaCarrierProjection(objectFrame, position);
            const underlyingCarrier = normalizeClassicalNahuatlVncSlotCarrier(position?.va);
            const va = normalizeClassicalNahuatlVncSlotCarrier(formulaCarrierProjectionFrame?.formulaCarrier || underlyingCarrier);
            const formulaCarrier =
              getClassicalNahuatlVncSlotFormulaCarrier(
                position,
                va,
                objectFrame?.formulaProjectionEnvironment
                  || "lesson23-multiple-object"
              );
            prePredicateSlots.push({
              id: `valence-${index + 1}`,
              role: `va-${index + 1}`,
              kind: "monadic-valence",
              carrier: va,
              formulaCarrier,
              va,
              underlyingCarrier,
              carrierProjectionRole: formulaCarrierProjectionFrame ? "contextual-formula-only" : "identity",
              contextualFormulaCarrierProjectionFrame: cloneClassicalNahuatlVncSlotValue(formulaCarrierProjectionFrame),
              objectPositionFrame: cloneClassicalNahuatlVncSlotValue(position)
            });
          } else {
            const va1 = normalizeClassicalNahuatlVncSlotCarrier(position?.va1);
            const va2 = normalizeClassicalNahuatlVncSlotCarrier(position?.va2);
            const carrier = `${va1}-${va2}`;
            prePredicateSlots.push({
              id: `valence-${index + 1}`,
              role: `va1-va2-${index + 1}`,
              kind: "dyadic-valence",
              carrier,
              formulaCarrier:
                getClassicalNahuatlVncSlotFormulaCarrier(
                  position,
                  carrier,
                  objectFrame?.formulaProjectionEnvironment
                    || "lesson23-multiple-object"
                ),
              va1,
              va2,
              objectPositionFrame: cloneClassicalNahuatlVncSlotValue(position)
            });
          }
        });
      } else if (valenceArity === "monadic") {
        const va = normalizeClassicalNahuatlVncSlotCarrier(objectFrame?.va);
        prePredicateSlots.push({
          id: "valence",
          role: "va",
          kind: "monadic-valence",
          carrier: va,
          va
        });
      } else if (valenceArity === "dyadic") {
        const va1 = normalizeClassicalNahuatlVncSlotCarrier(objectFrame?.va1);
        const va2 = normalizeClassicalNahuatlVncSlotCarrier(objectFrame?.va2);
        prePredicateSlots.push({
          id: "valence",
          role: "va1-va2",
          kind: "dyadic-valence",
          carrier: `${va1}-${va2}`,
          va1,
          va2,
          morphIdentityFrame: cloneClassicalNahuatlVncSlotValue(objectFrame?.va1MorphIdentityFrame || null)
        });
      }
      const valenceComplete = valenceArity === "vacant" || valenceArity === "multiple" && prePredicateSlots.length >= 1 && prePredicateSlots.every(slot => slot.kind === "monadic-valence" ? Boolean(slot.va) : Boolean(slot.va1 && slot.va2)) || valenceArity === "monadic" && Boolean(prePredicateSlots[0]?.va) || valenceArity === "dyadic" && Boolean(prePredicateSlots[0]?.va1 && prePredicateSlots[0]?.va2);
      const complete = Boolean(sourceAuthorizationStatus === "authorized" && pers1 && pers2 && predicateStem && tns && num1 && num2 && valenceComplete && internalStateAuthorized);
      const semanticIdentity = [pers1, pers2, ...prePredicateSlots.map(slot => slot.carrier), predicateStem, tns, num1, num2].join("|");
      return {
        kind: "classical-nahuatl-vnc-slot-frame",
        version: CLASSICAL_NAHUATL_VNC_SLOT_FRAME_VERSION,
        frameRole: "typed-vnc-authority",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_VNC_SLOT_SOURCE_DOCUMENT,
        sourceFrameKind: normalizeClassicalNahuatlVncSlotCarrier(sourceFrameKind),
        sourceAuthorizationStatus,
        authorizationStatus: complete ? "authorized" : "blocked",
        blockReason: complete ? "" : "incomplete-or-unauthorized-typed-vnc-slots",
        semanticIdentity,
        slotOrder: ["pers1", "pers2", ...prePredicateSlots.map(slot => slot.role), "stem", "tns", "num1", "num2"],
        slots: {
          subject: {
            pers1,
            pers2,
            baseMorph: normalizeClassicalNahuatlVncSlotCarrier(personDyad?.pers1BaseMorph || pers1),
            supportivePolicy: personDyad?.pers1SupportiveISurfacePolicy || "",
            variantRule: personDyad?.pers1VariantRule || ""
          },
          prePredicate: prePredicateSlots,
          predicate: {
            stem: predicateStem,
            tns
          },
          number: {
            num1,
            num2,
            finiteSingularConnector: numberDyad?.finiteSingularConnector || "",
            ...(numberDyad?.rule ? {rule: numberDyad.rule} : {}),
            variantRule: numberDyad?.num1VariantRule || "",
            condition: numberDyad?.condition || "",
            supportiveRuleRefs: cloneClassicalNahuatlVncSlotValue(numberDyad?.num1SupportiveVowelFrame?.ruleRefs || [])
          }
        },
        valenceArity,
        objectProfile: objectFrame ? {
          objectKind: objectFrame.objectKind || "",
          objectPerson: objectFrame.objectPerson || "",
          objectRule: objectFrame.objectRule || "",
          objectReflectsSubject: objectFrame.objectReflectsSubject === true,
          trajectory: objectFrame.trajectory || "",
          caseFeature: objectFrame.caseFeature || ""
        } : null,
        objectMorphIdentityFrame: cloneClassicalNahuatlVncSlotValue(objectFrame?.va1MorphIdentityFrame || null),
        sourceFormulaArtifact: normalizeClassicalNahuatlVncSlotCarrier(formulaArtifact),
        formulaArtifactAuthority: "display-only-not-authority",
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false
      };
    }
    function isClassicalNahuatlVncSlotFrame(frame = null) {
      if (!frame || frame.kind !== "classical-nahuatl-vnc-slot-frame" || frame.authorizationStatus !== "authorized") {
        return false;
      }
      const subject = frame.slots?.subject || {};
      const predicate = frame.slots?.predicate || {};
      const number = frame.slots?.number || {};
      const prePredicate = Array.isArray(frame.slots?.prePredicate) ? frame.slots.prePredicate : null;
      if (!subject.pers1 || !subject.pers2 || !predicate.stem || !predicate.tns || !number.num1 || !number.num2 || !prePredicate) {
        return false;
      }
      const unknownSlots = prePredicate.filter(slot => !["monadic-valence", "dyadic-valence", "vnc-internal-directional", "vnc-internal-state"].includes(slot?.kind));
      const valenceSlots = prePredicate.filter(slot => /^valence(?:-|$)/u.test(slot?.id || ""));
      const directionalSlots = prePredicate.filter(slot => slot?.kind === "vnc-internal-directional");
      if (unknownSlots.length || directionalSlots.length > 1 || directionalSlots.some(slot => !slot.carrier)) {
        return false;
      }
      if (frame.valenceArity === "monadic") {
        return valenceSlots.length === 1 && valenceSlots[0]?.kind === "monadic-valence" && Boolean(valenceSlots[0]?.va);
      }
      if (frame.valenceArity === "dyadic") {
        return valenceSlots.length === 1 && valenceSlots[0]?.kind === "dyadic-valence" && Boolean(valenceSlots[0]?.va1 && valenceSlots[0]?.va2);
      }
      if (frame.valenceArity === "multiple") {
        return valenceSlots.length >= 1 && valenceSlots.length <= 3 && valenceSlots.every(slot => slot?.kind === "monadic-valence" && Boolean(slot?.va) || slot?.kind === "dyadic-valence" && Boolean(slot?.va1 && slot?.va2));
      }
      return frame.valenceArity === "vacant" && valenceSlots.length === 0;
    }
    function renderClassicalNahuatlVncSlotFrameFormula(frame = null) {
      if (!isClassicalNahuatlVncSlotFrame(frame)) {
        return "";
      }
      const subject = frame.slots.subject;
      const predicate = frame.slots.predicate;
      const number = frame.slots.number;
      const prePredicate = frame.slots.prePredicate;
      const prePredicateFormula = prePredicate.length
        ? `+${prePredicate.map(
            slot => slot.formulaCarrier || slot.carrier
          ).join("+")}`
        : "";
      return `#${subject.pers1}-${subject.pers2}${prePredicateFormula}(${predicate.stem})${predicate.tns}+${number.num1}-${number.num2}#`;
    }
    function getClassicalNahuatlVncGeneralFormulaProjection(slotFrameOrValenceArity = "vacant") {
      const slotFrame = isClassicalNahuatlVncSlotFrame(slotFrameOrValenceArity) ? slotFrameOrValenceArity : null;
      const valenceArity = slotFrame?.valenceArity || slotFrameOrValenceArity;
      const generalPrePredicate = slotFrame ? slotFrame.slots.prePredicate.map(slot => {
        if (slot.kind === "monadic-valence") {
          return "+va";
        }
        if (slot.kind === "dyadic-valence") {
          return "+va¹-va²";
        }
        // Andrews §8.1 writes the selected directional/locative core constituent as ±D.
        return slot.kind === "vnc-internal-directional" ? "±D" : "";
      }).join("") : "";
      const coreExpression = slotFrame ? `${generalPrePredicate}(STEM)` : valenceArity === "multiple" ? "+va+va...(STEM)" : valenceArity === "monadic" ? "+va(STEM)" : valenceArity === "dyadic" ? "+va¹-va²(STEM)" : "(STEM)";
      const linearFormula = slotFrame ? `#pers¹-pers²${generalPrePredicate}(STEM)tns+num¹-num²#` : valenceArity === "monadic" ? "#pers¹-pers²+va(STEM)tns+num¹-num²#" : valenceArity === "dyadic" ? "#pers¹-pers²+va¹-va²(STEM)tns+num¹-num²#" : valenceArity === "multiple" ? "#pers¹-pers²+va+va...(STEM)tns+num¹-num²#" : "#pers¹-pers²(STEM)tns+num¹-num²#";
      return {
        linearFormula,
        rows: [{
          role: "Subject",
          expression: "#pers¹-pers²+ ... +num¹-num²#",
          hierarchyLevel: 4,
          discontinuousConstituent: true
        }, {
          role: "Core",
          expression: coreExpression,
          hierarchyLevel: 2,
          foundation: "STEM",
          predicateMember: true
        }, {
          role: "Tense",
          expression: ")tns+",
          hierarchyLevel: 3,
          predicateMember: true
        }]
      };
    }
    function buildClassicalNahuatlVncDiagrammaticFrame(frame = null) {
      if (!isClassicalNahuatlVncSlotFrame(frame)) {
        const blockedFrame = {
          kind: "classical-nahuatl-vnc-diagrammatic-frame",
          sourceAuthority: "Andrews transcription",
          sourceDocument: CLASSICAL_NAHUATL_VNC_SLOT_SOURCE_DOCUMENT,
          authorizationStatus: "blocked",
          blockReason: "authorized-typed-vnc-slot-frame-required",
          projectionAuthority: "typed-vnc-slots",
          formulaStringAuthority: false,
          valenceRows: [],
          derivationMetadataAvailable: false,
          rows: []
        };
        classicalNahuatlIssuedVncDiagrammaticFrames.add(blockedFrame);
        return blockedFrame;
      }
      const subject = frame.slots.subject;
      const predicate = frame.slots.predicate;
      const number = frame.slots.number;
      const prePredicate = frame.slots.prePredicate;
      const prePredicateCarriers = prePredicate.map(
        slot => slot.formulaCarrier || slot.carrier
      );
      const corePrefix = prePredicateCarriers.length ? `+${prePredicateCarriers.join("+")}` : "";
      const subjectExpression = `#${subject.pers1}-${subject.pers2}+ ... +${number.num1}-${number.num2}#`;
      const coreExpression = `${corePrefix}(${predicate.stem})`;
      const tenseExpression = `)${predicate.tns}+`;
      const generalProjection = getClassicalNahuatlVncGeneralFormulaProjection(frame);
      // Prefix order comes from the typed slots. Derivational level comes from
      // the participant owner; Andrews §23.3.4 explicitly distinguishes them.
      // Compact single-object slots do not supply a derivational history.
      const valenceRows = prePredicate.flatMap((slot, index) => {
        if (!["monadic-valence", "dyadic-valence"].includes(slot.kind)) return [];
        const position = slot.objectPositionFrame || null;
        const formulaCarrier = slot.formulaCarrier || slot.carrier;
        return [{
          slotId: slot.id,
          prefixOrder: index + 1,
          valenceArity: slot.kind === "monadic-valence" ? "monadic" : "dyadic",
          formulaCarrier,
          expression: `+${formulaCarrier}`,
          objectId: position?.objectId || "",
          governor: position?.governor || "",
          derivationalLevel: Number.isInteger(position?.derivationalLevel)
            ? position.derivationalLevel : null,
          prominence: position?.prominence || "",
          sounded: typeof position?.sounded === "boolean" ? position.sounded : null,
          silencingRule: position?.silencingRule || ""
        }];
      });
      const derivationMetadataAvailable = valenceRows.length > 0
        && valenceRows.every(row => row.objectId && row.governor
          && row.derivationalLevel > 0 && row.prominence);
      const multipleValence = frame.valenceArity === "multiple";
      const section = multipleValence ? "23.4" : frame.valenceArity === "vacant" ? "5.1" : frame.valenceArity === "monadic" ? "6.2" : "6.3";
      const lineStart = multipleValence ? 7562 : frame.valenceArity === "vacant" ? 2449 : frame.valenceArity === "monadic" ? 2716 : 2744;
      const lineEnd = multipleValence ? 7580 : frame.valenceArity === "vacant" ? 2456 : frame.valenceArity === "monadic" ? 2723 : 2757;
      const diagrammaticFrame = {
        kind: "classical-nahuatl-vnc-diagrammatic-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_VNC_SLOT_SOURCE_DOCUMENT,
        authorizationStatus: "authorized",
        blockReason: "",
        projectionAuthority: "typed-vnc-slots",
        formulaStringAuthority: false,
        linearFormula: renderClassicalNahuatlVncSlotFrameFormula(frame),
        generalLinearFormula: generalProjection.linearFormula,
        generalRows: generalProjection.rows,
        valenceArity: frame.valenceArity,
        valenceRows,
        derivationMetadataAvailable,
        prePredicateCarriers,
        predicateStem: predicate.stem,
        tenseCarrier: predicate.tns,
        hierarchy: ["verbstem", "core", "predicate", "VNC"],
        predicateGroup: {
          role: "Predicate",
          memberRoles: ["Core", "Tense"],
          hierarchyLevel: 3
        },
        rows: [{
          role: "Subject",
          expression: subjectExpression,
          hierarchyLevel: 4,
          discontinuousConstituent: true
        }, {
          role: "Core",
          expression: coreExpression,
          hierarchyLevel: 2,
          foundation: predicate.stem,
          predicateMember: true
        }, {
          role: "Tense",
          expression: tenseExpression,
          hierarchyLevel: 3,
          predicateMember: true
        }],
        ruleRefs: [{
          section: "4.4",
          transcriptionLineStart: 2310,
          transcriptionLineEnd: 2321,
          exactWitness: "The VNC diagram separates Subject from a Predicate composed of Core and Tense."
        }, {
          section: "4.4 note",
          transcriptionLineStart: 2326,
          transcriptionLineEnd: 2339,
          exactWitness: "The VNC hierarchy is verbstem, verbcore, predicate, and VNC, with the stem as foundation."
        }, {
          section,
          transcriptionLineStart: lineStart,
          transcriptionLineEnd: lineEnd,
          exactWitness: multipleValence ? "The multiple-valence formula retains every complete Valence position, including silent shuntline positions, within the Core." : frame.valenceArity === "vacant" ? "The intransitive VNC has an implicitly present vacant Valence position in its Core." : frame.valenceArity === "monadic" ? "The monadic transitive VNC diagram places +va(STEM) in the Core and tns in Tense." : "The dyadic transitive VNC diagram places +va1-va2(STEM) in the Core and tns in Tense."
        }, ...(multipleValence ? [{
          section: "23.5",
          transcriptionLineStart: 7583,
          transcriptionLineEnd: 7596,
          exactWitness: "Object-pronoun sequence follows carrier ordering priorities and does not reflect the history of derivational suffixes."
        }] : [])]
      };
      classicalNahuatlIssuedVncDiagrammaticFrames.add(diagrammaticFrame);
      return diagrammaticFrame;
    }
    function isClassicalNahuatlVncDiagrammaticFrame(frame = null) {
      return Boolean(
        frame
        && classicalNahuatlIssuedVncDiagrammaticFrames.has(frame)
        && frame.kind === "classical-nahuatl-vnc-diagrammatic-frame"
      );
    }
    function getClassicalNahuatlVncNextCarrierAfterSubject(frame = null) {
      const firstPrePredicate = (frame?.slots?.prePredicate || []).find(slot => {
        const carrier = normalizeClassicalNahuatlVncSlotCarrier(slot?.carrier);
        const carrierParts = carrier.split("-").filter(Boolean);
        return carrier
          && carrierParts.some(part => !isClassicalNahuatlVncSilentCarrier(part));
      })?.carrier || "";
      return firstPrePredicate || frame?.slots?.predicate?.stem || "";
    }
    function getClassicalNahuatlVncCarrierBeforeSlot(frame = null, slotIndex = 0) {
      if (slotIndex <= 0) {
        return frame?.slots?.subject?.pers1 || "";
      }
      return frame?.slots?.prePredicate?.[slotIndex - 1]?.carrier || "";
    }
    function getClassicalNahuatlVncCarrierAfterSlot(frame = null, slotIndex = 0) {
      return frame?.slots?.prePredicate?.[slotIndex + 1]?.carrier || frame?.slots?.predicate?.stem || "";
    }
    function isClassicalNahuatlVncSilentCarrier(value = "") {
      const normalized = normalizeClassicalNahuatlVncSlotCarrier(value);
      return !normalized || normalized === "0" || normalized === "\u00d8" || normalized === CLASSICAL_NAHUATL_VNC_SLOT_SQUARE_ZERO;
    }
    function isClassicalNahuatlVncNum1KContext(number = {}) {
      const rule = String(number.variantRule || "").toLowerCase();
      const condition = String(number.condition || "").toLowerCase();
      if (condition === "future-preterit-indicative" || rule.includes("future") || rule.includes("preterit") || rule.includes("qui-after") || rule.includes("square-zero-replaces-obsolescent")) {
        return true;
      }
      if (rule.includes("optative") || rule.includes("admonitive")) {
        return false;
      }
      return number.num2 === "eh" && number.num1 === "qu";
    }
    function applyClassicalNahuatlDirectionalStemOperationAtFinalBoundary({
      frame = null,
      expandedVncBoundaryFrame = null,
      objectRelationshipRuleFrame = null
    } = {}) {
      const predicate = frame?.slots?.predicate || null;
      const sourceStem = normalizeClassicalNahuatlVncSlotStem(predicate?.stem || "");
      const sourceDirectionalPrefix = normalizeClassicalNahuatlVncSlotCarrier(
        expandedVncBoundaryFrame?.directionalPrefix
      );
      const operationFrame =
        expandedVncBoundaryFrame?.directionalStemOperationFrame || null;
      const legacyOperationFrame =
        expandedVncBoundaryFrame?.directionalIttaContractionFrame || null;
      const operationRequested = Boolean(
        operationFrame?.requested === true
        || operationFrame?.contractionApplies === true
        || legacyOperationFrame?.requested === true
        || legacyOperationFrame?.contractionApplies === true
      );
      if (!operationRequested) {
        const directionalPrefixAuthorized =
          !sourceDirectionalPrefix
          || ["on", "huāl"].includes(sourceDirectionalPrefix);
        return {
          kind: "classical-nahuatl-directional-stem-operation-evaluation-frame",
          operationId: "",
          authorizationStatus: directionalPrefixAuthorized
            ? "not-applicable"
            : "blocked",
          blockReason: directionalPrefixAuthorized
            ? ""
            : "unissued-directional-prefix-cannot-authorize-final-boundary",
          operationRequested: false,
          operationApplied: false,
          sourceStem,
          selectedStem: sourceStem,
          sourceDirectionalPrefix,
          selectedDirectionalPrefix: sourceDirectionalPrefix,
          operationFrame: null,
          issuedTypedOperationFrameRequired: true,
          copiedOrForgedOperationFrameAccepted: false,
          formulaStringAuthority: false,
          surfaceStringAuthority: false
        };
      }
      const valenceSlot = Array.isArray(frame?.slots?.prePredicate)
        ? frame.slots.prePredicate.find(slot => slot?.id === "valence") || null
        : null;
      const typedObjectSlot = normalizeClassicalNahuatlVncSlotCarrier(
        valenceSlot?.carrier
      );
      const relationshipObjectSlot = normalizeClassicalNahuatlVncSlotCarrier(
        objectRelationshipRuleFrame?.selectedObjectSlot
      );
      const operationSourceStem = normalizeClassicalNahuatlVncSlotStem(
        operationFrame?.sourceStem
      );
      const operationSourceDirectionalPrefix =
        normalizeClassicalNahuatlVncSlotCarrier(
          operationFrame?.sourceDirectionalPrefix
        );
      const operationSourceObjectSlot =
        normalizeClassicalNahuatlVncSlotCarrier(
          operationFrame?.sourceObjectSlot
        );
      const selectedStem = normalizeClassicalNahuatlVncSlotStem(
        operationFrame?.selectedStem
      );
      const selectedDirectionalPrefix =
        normalizeClassicalNahuatlVncSlotCarrier(
          operationFrame?.selectedDirectionalPrefix
        );
      const selectedOperationId =
        "optional-on-itta-directional-contraction";
      const requestedSelection = normalizeClassicalNahuatlVncSlotCarrier(
        operationFrame?.requestedSelection
      );
      const contractionApplies = operationFrame?.contractionApplies === true;
      const expectedSelectedStem = contractionApplies
        && operationSourceStem === "itt-a"
        ? operationSourceStem.slice(1)
        : operationSourceStem;
      const expectedSelectedDirectionalPrefix = contractionApplies
        && operationSourceDirectionalPrefix === "on"
        ? operationSourceDirectionalPrefix.slice(0, -1)
        : operationSourceDirectionalPrefix;
      const commonFrameAuthorized = Boolean(
        expandedVncBoundaryFrame?.kind
          === "classical-nahuatl-vnc-sentence-expanded-vnc-boundary-frame"
        && expandedVncBoundaryFrame?.authorizationStatus === "authorized"
        && expandedVncBoundaryFrame?.boundaryApplies === true
        && operationFrame
        && operationFrame === legacyOperationFrame
        && Object.isFrozen(operationFrame)
        && operationFrame.kind
          === "classical-nahuatl-directional-itta-contraction-frame"
        && operationFrame.operationId === selectedOperationId
        && operationFrame.authorizationStatus === "authorized"
        && operationFrame.requested === true
        && operationFrame.contextAuthorized === true
        && operationFrame.formulaStringAuthority === false
        && operationFrame.surfaceStringAuthority === false
        && operationFrame.callerSuppliedFormulaSurfaceIgnored === true
        && operationSourceStem === sourceStem
        && operationSourceStem
          === normalizeClassicalNahuatlVncSlotStem(
            expandedVncBoundaryFrame?.stem
          )
        && operationSourceDirectionalPrefix === sourceDirectionalPrefix
        && operationSourceObjectSlot === typedObjectSlot
        && (!relationshipObjectSlot
          || operationSourceObjectSlot === relationshipObjectSlot)
        && selectedStem === expectedSelectedStem
        && selectedDirectionalPrefix
          === expectedSelectedDirectionalPrefix
        && normalizeClassicalNahuatlVncSlotStem(
          expandedVncBoundaryFrame?.selectedDirectionalStem
        ) === selectedStem
        && normalizeClassicalNahuatlVncSlotCarrier(
          expandedVncBoundaryFrame?.selectedDirectionalPrefix
        ) === selectedDirectionalPrefix
        && Array.isArray(operationFrame.ruleRefs)
        && operationFrame.ruleRefs.some(
          rule => rule?.tagId
            === "cn-l8-811-optional-on-itta-contraction"
        )
      );
      const ordinaryAuthorized = Boolean(
        commonFrameAuthorized
        && requestedSelection === "ordinary"
        && contractionApplies === false
        && selectedStem === sourceStem
        && selectedDirectionalPrefix === sourceDirectionalPrefix
        && !operationFrame.deletedDirectionalSegment
        && !operationFrame.dismissedSupportiveStemSegment
      );
      const contractionAuthorized = Boolean(
        commonFrameAuthorized
        && requestedSelection === "rare-contracted"
        && contractionApplies
        && sourceStem === "itt-a"
        && sourceDirectionalPrefix === "on"
        && selectedStem === "tt-a"
        && selectedDirectionalPrefix === "o"
        && operationFrame.deletedDirectionalSegment === "n"
        && operationFrame.dismissedSupportiveStemSegment === "i"
        && operationFrame.supportiveInitialIAction === "dismiss"
        && Array.isArray(operationFrame.operationActions)
        && operationFrame.operationActions.includes(
          "apply-optional-on-itta-directional-contraction"
        )
      );
      const authorized = ordinaryAuthorized || contractionAuthorized;
      if (authorized && contractionAuthorized && predicate) {
        predicate.stem = selectedStem;
      }
      return {
        kind: "classical-nahuatl-directional-stem-operation-evaluation-frame",
        operationId: selectedOperationId,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized
          ? ""
          : "issued-directional-stem-operation-frame-required",
        operationRequested: true,
        operationApplied: contractionAuthorized,
        sourceStem,
        selectedStem: authorized ? selectedStem : "",
        sourceDirectionalPrefix,
        selectedDirectionalPrefix: authorized
          ? selectedDirectionalPrefix
          : "",
        sourceObjectSlot: operationSourceObjectSlot,
        typedObjectSlot,
        operationFrame: authorized ? operationFrame : null,
        issuedTypedOperationFrameRequired: true,
        copiedOrForgedOperationFrameAccepted: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false
      };
    }
    function insertClassicalNahuatlDirectionalSlot(
      frame = null,
      expandedVncBoundaryFrame = null,
      directionalStemOperationEvaluationFrame = null
    ) {
      const directionalPrefix = normalizeClassicalNahuatlVncSlotCarrier(
        directionalStemOperationEvaluationFrame?.authorizationStatus
          === "authorized"
          ? directionalStemOperationEvaluationFrame
            .selectedDirectionalPrefix
          : expandedVncBoundaryFrame?.directionalPrefix
      );
      const placement = normalizeClassicalNahuatlVncSlotCarrier(expandedVncBoundaryFrame?.directionalPlacement);
      if (!directionalPrefix) {
        return {
          directionalPrefix,
          placement,
          inserted: false
        };
      }
      const directionalSlot = {
        id: "directional",
        role: "directional-locative",
        kind: "vnc-internal-directional",
        carrier: directionalPrefix
      };
      if (placement === "before-monadic-valence" || placement === "before-reflexive-reciprocal-valence") {
        frame.slots.prePredicate.unshift(directionalSlot);
      } else if (placement === "after-specific-projective-valence") {
        const lastSpecificIndex = frame.slots.prePredicate.reduce((result, slot, index) => (
          slot?.objectPositionFrame?.objectKind === "specific-projective"
          || (slot?.id === "valence" && slot?.kind === "dyadic-valence")
            ? index
            : result
        ), -1);
        frame.slots.prePredicate.splice(lastSpecificIndex + 1, 0, directionalSlot);
      } else {
        frame.slots.prePredicate.push(directionalSlot);
      }
      return {
        directionalPrefix,
        placement,
        inserted: true
      };
    }
    function getClassicalNahuatlVncLayerRuntimeTarget() {
      return typeof targetObject !== "undefined" && targetObject || (typeof globalThis !== "undefined" ? globalThis : null);
    }
    function applyClassicalNahuatlDirectionalProgressiveAssimilation(frame = null, directional = {}) {
      const predicate = frame?.slots?.predicate || null;
      const prePredicate = frame?.slots?.prePredicate || [];
      const directionalIndex = prePredicate.findIndex(slot => slot.kind === "vnc-internal-directional");
      const adjacentSlot = directionalIndex >= 0
        ? prePredicate.slice(directionalIndex + 1).find(slot => !isClassicalNahuatlVncSilentCarrier(slot.carrier)) || predicate
        : null;
      const sourceStem = normalizeClassicalNahuatlVncSlotStem(adjacentSlot === predicate ? predicate?.stem || "" : adjacentSlot?.carrier || "");
      const directionalPrefix = normalizeClassicalNahuatlVncSlotCarrier(directional?.directionalPrefix || "");
      const lesson210BoundaryRequired = directionalPrefix === "huāl" && /^(?:tl|y)/u.test(sourceStem);
      if (!lesson210BoundaryRequired) {
        return {
          required: false,
          applied: false,
          authorizationStatus: "not-applicable",
          sourcePredicateStem: sourceStem,
          realizedPredicateStem: sourceStem,
          operationFrame: null
        };
      }
      const runtimeTarget = getClassicalNahuatlVncLayerRuntimeTarget();
      if (typeof runtimeTarget?.buildClassicalNahuatlProgressiveAssimilationFrame !== "function") {
        return {
          required: true,
          applied: false,
          authorizationStatus: "blocked",
          blockReason: "lesson2-10-boundary-authority-unavailable",
          sourcePredicateStem: sourceStem,
          realizedPredicateStem: "",
          operationFrame: null
        };
      }
      const operationFrame = runtimeTarget.buildClassicalNahuatlProgressiveAssimilationFrame(`${directionalPrefix}-${sourceStem}`);
      const realizedPredicateStem = Array.isArray(operationFrame.realizedMorphs) ? operationFrame.realizedMorphs.slice(1).join("-") : "";
      const authorized = operationFrame.authorizationStatus === "authorized" && operationFrame.transformationApplied === true && Boolean(realizedPredicateStem);
      if (authorized && adjacentSlot) {
        if (adjacentSlot === predicate) {
          predicate.stem = realizedPredicateStem;
        } else {
          adjacentSlot.carrier = realizedPredicateStem;
          if (adjacentSlot.kind === "monadic-valence") adjacentSlot.va = realizedPredicateStem;
        }
      }
      return {
        required: true,
        applied: authorized,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized ? "" : operationFrame.blockReason || "lesson2-10-directional-boundary-not-realized",
        sourcePredicateStem: sourceStem,
        realizedPredicateStem: authorized ? realizedPredicateStem : "",
        selectedRuleIds: operationFrame.appliedRuleIds || [],
        operationFrame
      };
    }
    function realizeClassicalNahuatlVncSlotFrameAtFinalBoundary({
      vncSlotFrame = null,
      expandedVncBoundaryFrame = null,
      objectRelationshipRuleFrame = null,
      initialVowelKind = "",
      imperfectiveSourceFrame = null
    } = {}) {
      if (!isClassicalNahuatlVncSlotFrame(vncSlotFrame)) {
        return {
          kind: "classical-nahuatl-vnc-sentence-final-boundary-realization-frame",
          authorizationStatus: "blocked",
          blockReason: "missing-or-contradictory-typed-vnc-slot-frame",
          typedSlotAuthority: true,
          formulaStringAuthority: false,
          formulaRealization: "",
          actions: []
        };
      }
      const realizedFrame = cloneClassicalNahuatlVncSlotValue(vncSlotFrame);
      const runtimeTarget = getClassicalNahuatlVncLayerRuntimeTarget();
      if (imperfectiveSourceFrame && (!runtimeTarget.isClassicalNahuatlImperfectiveVncSourceFrame?.(imperfectiveSourceFrame)
        || imperfectiveSourceFrame.sourceAnalysis?.finalImperfectiveVowelRealization!=="ordinary-long-vowel"
        || imperfectiveSourceFrame.sourceAnalysis?.sourceForm!=="full-imperfective"
        || imperfectiveSourceFrame.sourceStem!==vncSlotFrame.slots.predicate.stem)) {
        return {kind:"classical-nahuatl-vnc-sentence-final-boundary-realization-frame",authorizationStatus:"blocked",
          blockReason:"issued-full-imperfective-quantity-source-required",typedSlotAuthority:true,formulaStringAuthority:false,formulaRealization:"",actions:[]};
      }
      realizedFrame.phase = "final-boundary-realization";
      realizedFrame.sourceSemanticIdentity = vncSlotFrame.semanticIdentity;
      const actions = ["assemble-slot-order-before-final-boundary-realization", "realize-final-formula-boundaries-after-slot-order"];
      const directionalStemOperationEvaluationFrame =
        applyClassicalNahuatlDirectionalStemOperationAtFinalBoundary({
          frame: realizedFrame,
          expandedVncBoundaryFrame,
          objectRelationshipRuleFrame
        });
      if (
        directionalStemOperationEvaluationFrame.authorizationStatus
        === "blocked"
      ) {
        return {
          kind: "classical-nahuatl-vnc-sentence-final-boundary-realization-frame",
          lesson: "Andrews Lesson 8",
          layerRole: "typed-final-boundary-realization",
          sourceAuthority: "Andrews transcription",
          sourceDocument: CLASSICAL_NAHUATL_VNC_SLOT_SOURCE_DOCUMENT,
          authorizationStatus: "blocked",
          blockReason:
            directionalStemOperationEvaluationFrame.blockReason,
          typedSlotAuthority: true,
          formulaStringAuthority: false,
          formulaRealization: "",
          directionalStemOperationEvaluationFrame,
          directionalStemOperationApplied: false,
          actions
        };
      }
      if (directionalStemOperationEvaluationFrame.operationApplied) {
        actions.push(
          "apply-issued-optional-on-itta-directional-contraction-before-final-boundary"
        );
      }
      const directional = insertClassicalNahuatlDirectionalSlot(
        realizedFrame,
        expandedVncBoundaryFrame,
        directionalStemOperationEvaluationFrame
      );
      const directionalProgressiveAssimilation = applyClassicalNahuatlDirectionalProgressiveAssimilation(realizedFrame, directional);
      if (directionalProgressiveAssimilation.applied) {
        actions.push("realize-lesson2-10-progressive-assimilation-at-directional-predicate-boundary");
      }
      if (directionalProgressiveAssimilation.authorizationStatus === "blocked") {
        return {
          kind: "classical-nahuatl-vnc-sentence-final-boundary-realization-frame",
          lesson: "Andrews Lesson 8",
          layerRole: "typed-final-boundary-realization",
          sourceAuthority: "Andrews transcription",
          sourceDocument: CLASSICAL_NAHUATL_VNC_SLOT_SOURCE_DOCUMENT,
          authorizationStatus: "blocked",
          blockReason: directionalProgressiveAssimilation.blockReason,
          typedSlotAuthority: true,
          formulaStringAuthority: false,
          formulaRealization: "",
          directionalProgressiveAssimilation,
          actions
        };
      }
      const subject = realizedFrame.slots.subject;
      const subjectBefore = subject.pers1;
      const subjectFamily = getClassicalNahuatlVncSubjectCarrierFamily(subject.pers1);
      const nextCarrier = getClassicalNahuatlVncNextCarrierAfterSubject(realizedFrame);
      const nextSound = getClassicalNahuatlVncSlotFirstSound(nextCarrier);
      const nextNeedsSupport = Boolean(nextSound && !isClassicalNahuatlVncSlotVowelSound(nextSound));
      const secondPluralSubject = ["am", "an", "az", "ax"].includes(subject.pers1);
      let subjectNasalAssimilation = null;
      if (secondPluralSubject) {
        // Andrews §2.11.1 permits the nasal source spelling even when its
        // pronunciation assimilates. Keep the typed subject morph; the sound
        // owner still supplies the sibilant pronunciation (§30.12 an+xōchi).
        if (["z", "x"].includes(nextSound)) {
          subjectNasalAssimilation = getClassicalNahuatlVncLayerRuntimeTarget()
            ?.buildClassicalNahuatlAssimilationFrame?.({
              leftConsonant: "n", rightConsonant: nextSound,
              sourceLeftMorpheme: "an", sourceRightMorpheme: nextCarrier,
              grammaticalConstruction: true, spellingStyle: "source-preserving",
            });
          if (subjectNasalAssimilation?.authorizationStatus !== "authorized") {
            return {
              kind: "classical-nahuatl-vnc-sentence-final-boundary-realization-frame",
              authorizationStatus: "blocked",
              blockReason: "lesson2-11-subject-nasal-boundary-not-realized",
              subjectNasalAssimilation,
            };
          }
          subject.pers1 = subjectNasalAssimilation.realizedLeftMorpheme;
          actions.push("preserve-second-plural-subject-source-spelling-with-issued-sibilant-pronunciation");
        } else {
          subject.pers1 = isClassicalNahuatlVncSlotVowelSound(nextSound)
            || nextSound === "m" || nextSound === "p" ? "am" : "an";
        }
        if (subject.pers1 !== subjectBefore) {
          actions.push("realize-second-plural-subject-nasal-after-slot-order");
        }
      } else if (subjectFamily) {
        subject.pers1 = nextNeedsSupport ? subjectFamily.supportive : subjectFamily.bare;
        if (subject.pers1 !== subjectBefore) {
          actions.push("realize-pers1-supportive-vowel-after-slot-order");
        }
      }
      const prePredicate = realizedFrame.slots.prePredicate;
      // The final multiple-object order can place a mainline reflexive
      // immediately before a real stem vowel (Andrews 2.6, 7.8 note 1).
      // Keep the issued participant position; realize only its vowel morph.
      const finalObject = prePredicate.at(-1);
      const finalObjectKind = finalObject?.objectPositionFrame?.objectKind
        || (prePredicate.filter(slot => /^valence(?:-|$)/u.test(slot?.id || "")).length === 1
          ? realizedFrame.objectProfile?.objectKind : "");
      if (initialVowelKind === "supportive"
        && ["monadic-valence", "dyadic-valence"].includes(finalObject?.kind)) {
        const initialBoundary = targetObject.buildClassicalNahuatlVerbstemInitialSupportiveIFrame?.(
          realizedFrame.slots.predicate.stem,
          { valence: finalObjectKind === "nonspecific-nonhuman"
              ? "projective-nonhuman" : finalObjectKind,
            initialVowelKind }
        );
        if (initialBoundary?.initialSupportiveIDropped) {
          realizedFrame.slots.predicate.stem = initialBoundary.stemRealization;
          actions.push("drop-imaginary-initial-i-after-restored-object-boundary");
        }
      }
      if (initialVowelKind === "real"
        && isClassicalNahuatlVncSlotVowelSound(
          getClassicalNahuatlVncSlotFirstSound(realizedFrame.slots.predicate.stem),
        )
        && finalObject?.kind === "dyadic-valence"
        && ["reflexive", "mainline-reflexive"].includes(finalObjectKind)
        && finalObject.va2 === "o") {
        finalObject.va2 = CLASSICAL_NAHUATL_VNC_SLOT_SQUARE_ZERO;
        finalObject.carrier = `${finalObject.va1}-${finalObject.va2}`;
        finalObject.formulaCarrier = finalObject.carrier;
        actions.push("dismiss-mainline-reflexive-o-before-real-initial-vowel");
      }
      // Restored object clusters can follow a newly completed subject carrier.
      // Realize /k/ against its actual neighbors, including a following
      // reflexive, rather than retaining the earlier stem-only spelling.
      prePredicate.forEach((slot, index) => {
        const position = slot.objectPositionFrame;
        if (slot.kind !== "dyadic-valence"
          || position?.objectKind !== "specific-projective"
          || position.objectPerson !== "3sg"
          || !["c", "qu", "qui"].includes(slot.va1)) return;
        const dyad = getClassicalNahuatlSpecificDyad("3sg", {
          sounded: true,
          leftCarrier: getClassicalNahuatlVncCarrierBeforeSlot(realizedFrame, index),
          rightCarrier: getClassicalNahuatlVncCarrierAfterSlot(realizedFrame, index),
        });
        if (slot.va1 !== dyad.va1) {
          actions.push("realize-cluster-third-singular-k-object-after-slot-order");
          slot.va1 = dyad.va1;
          slot.carrier = `${slot.va1}-${slot.va2}`;
          slot.formulaCarrier = slot.carrier;
        }
      });
      const valenceIndex = prePredicate.findIndex(slot => slot.id === "valence");
      const valenceSlot = valenceIndex >= 0 ? prePredicate[valenceIndex] : null;
      const objectMorphIdentityFrame = cloneClassicalNahuatlVncSlotValue(valenceSlot?.morphIdentityFrame || realizedFrame.objectMorphIdentityFrame || null);
      const selectedObjectSlotBefore = objectRelationshipRuleFrame?.selectedObjectSlot || valenceSlot?.carrier || "";
      let spellingSelectedAfterSlotOrder = "";
      let pluralObjectVa2BeforeFinalBoundary = "";
      let finalPluralObjectVa2 = "";
      if (valenceSlot?.kind === "dyadic-valence" && objectMorphIdentityFrame?.morphIdentity === "/k/") {
        const leftCarrier = getClassicalNahuatlVncCarrierBeforeSlot(realizedFrame, valenceIndex);
        const rightCarrier = getClassicalNahuatlVncCarrierAfterSlot(realizedFrame, valenceIndex);
        const leftSound = getClassicalNahuatlVncSlotLastSound(leftCarrier);
        const rightSound = getClassicalNahuatlVncSlotFirstSound(rightCarrier);
        if (String(objectMorphIdentityFrame.va2 || "") === "im" || ["im", "in"].includes(valenceSlot.va2)) {
          pluralObjectVa2BeforeFinalBoundary = valenceSlot.va2;
          valenceSlot.va1 = "qu";
          if (rightCarrier === "on") {
            valenceSlot.va2 = "im";
          } else if (rightCarrier === "hu\u0101l") {
            valenceSlot.va2 = "in";
          }
          finalPluralObjectVa2 = valenceSlot.va2;
          spellingSelectedAfterSlotOrder = "qu";
          if (finalPluralObjectVa2 !== pluralObjectVa2BeforeFinalBoundary) {
            actions.push("realize-third-plural-object-number-before-directional-neighbor");
          }
        } else {
          if (rightCarrier === "on") {
            valenceSlot.va1 = "c";
            actions.push("realize-third-singular-k-object-as-c-before-on");
          } else if (rightCarrier === "hu\u0101l") {
            valenceSlot.va1 = isClassicalNahuatlVncSlotVowelSound(leftSound) ? "c" : "qui";
          } else if (isClassicalNahuatlVncSlotVowelSound(leftSound) || isClassicalNahuatlVncSlotVowelSound(rightSound)) {
            valenceSlot.va1 = rightSound === "e" || rightSound === "i" ? "qu" : "c";
          } else {
            valenceSlot.va1 = "qui";
          }
          spellingSelectedAfterSlotOrder = valenceSlot.va1;
          actions.push("realize-third-singular-k-object-after-directional-neighbor");
        }
        valenceSlot.carrier = `${valenceSlot.va1}-${valenceSlot.va2}`;
      }
      let pers1SupportiveIToOApplied = false;
      const directionalSubjectCarrier = getClassicalNahuatlVncDirectionalSubjectCarrierRealization(realizedFrame, subject.pers1);
      if (directionalSubjectCarrier) {
        const beforeO = subject.pers1;
        subject.pers1 = directionalSubjectCarrier;
        pers1SupportiveIToOApplied = subject.pers1 !== beforeO;
        if (pers1SupportiveIToOApplied) {
          actions.push("replace-pers1-supportive-i-with-o-before-c-on");
        }
      }
      const directionalSlotIndex = prePredicate.findIndex(slot => slot.kind === "vnc-internal-directional");
      const directionalSlot = prePredicate[directionalSlotIndex];
      const followingSlot = directionalSlotIndex >= 0
        ? prePredicate.slice(directionalSlotIndex + 1).find(slot => !isClassicalNahuatlVncSilentCarrier(slot.carrier))
        : null;
      const followingCarrier = followingSlot?.carrier || realizedFrame.slots.predicate.stem;
      let directionalNasalAssimilation = null;
      if (directionalSlot?.carrier === "on" && /^[mp]/u.test(followingCarrier)) {
        directionalNasalAssimilation = getClassicalNahuatlVncLayerRuntimeTarget()?.buildClassicalNahuatlAssimilationFrame?.({
          leftConsonant: "n",
          rightConsonant: followingCarrier[0],
          sourceLeftMorpheme: directionalSlot.carrier,
          sourceRightMorpheme: followingCarrier,
        });
        if (directionalNasalAssimilation?.authorizationStatus !== "authorized") {
          return {
            kind: "classical-nahuatl-vnc-sentence-final-boundary-realization-frame",
            authorizationStatus: "blocked",
            blockReason: "lesson2-11-directional-nasal-boundary-not-realized",
            directionalNasalAssimilation,
          };
        }
        directionalSlot.carrier = directionalNasalAssimilation.realizedLeftMorpheme;
        actions.push("realize-lesson2-11-directional-nasal-before-adjacent-bilabial");
      }
      const number = realizedFrame.slots.number;
      const num1Before = number.num1;
      const num1LeftCarrierSource = !isClassicalNahuatlVncSilentCarrier(realizedFrame.slots.predicate.tns) ? "tns" : "stem";
      const num1LeftCarrier = num1LeftCarrierSource === "tns" ? realizedFrame.slots.predicate.tns : realizedFrame.slots.predicate.stem;
      const num1LeftSound = getClassicalNahuatlVncSlotLastSound(num1LeftCarrier);
      const num1KContext = !number.rule && isClassicalNahuatlVncNum1KContext(number);
      const lesson11Num1Override = String(realizedFrame.lesson11Alternative?.num1Override || realizedFrame.lesson11Plan?.num1Override || "");
      const lesson11DeletesPostStemK = realizedFrame.lesson11Alternative?.deletePostStemK === true || realizedFrame.lesson11Plan?.deletePostStemK === true || realizedFrame.lesson11Plan?.kDeletionAfterStem === true;
      let num1SupportiveVowelAction = "not-supportive";
      let num1SquareZeroReplacesQui = false;
      if (lesson11Num1Override || lesson11DeletesPostStemK && num1KContext) {
        number.num1 = lesson11Num1Override || CLASSICAL_NAHUATL_VNC_SLOT_SQUARE_ZERO;
        num1SupportiveVowelAction = lesson11Num1Override ? "lesson11-paradigm-cell-finalizes-num1" : "lesson11-deletes-post-stem-k-with-silent-num1-carrier";
        num1SquareZeroReplacesQui = number.num1 === CLASSICAL_NAHUATL_VNC_SLOT_SQUARE_ZERO;
        actions.push(lesson11Num1Override ? "preserve-lesson11-num1-override-at-final-boundary" : "preserve-lesson11-post-stem-k-deletion-at-final-boundary");
      } else if (num1KContext) {
        if (number.num2 === "eh") {
          number.num1 = "qu";
          num1SupportiveVowelAction = "not-needed-before-plural-eh";
        } else if (number.num2 === "0") {
          if (isClassicalNahuatlVncSlotVowelSound(num1LeftSound)) {
            number.num1 = "c";
            num1SupportiveVowelAction = "not-needed-after-vowel";
          } else {
            number.num1 = number.finiteSingularConnector === "qui" ? "qui" : CLASSICAL_NAHUATL_VNC_SLOT_SQUARE_ZERO;
            num1SupportiveVowelAction = number.num1 === "qui" ? "retain-selected-archaic-supportive-qui" : "suppress-supportive-qui-with-square-zero";
            num1SquareZeroReplacesQui = number.num1 !== "qui";
          }
        }
        actions.push("realize-num1-k-connector-after-final-predicate");
      }
      // A long full-imperfective citation remains the Source. Only its written
      // terminal phone changes (§2.2); a following tense consonant preserves it.
      let imperfectiveFinalVowelRealizationFrame = null;
      const finalLongVowel = imperfectiveSourceFrame && /[āēīō]$/u.exec(realizedFrame.slots.predicate.stem)?.[0];
      const followers = [realizedFrame.slots.predicate.tns,number.num1,number.num2].filter(c=>!isClassicalNahuatlVncSilentCarrier(c)).join("");
      if (finalLongVowel && (!followers || followers==="h")) {
        const shortVowel = {ā:"a",ē:"e",ī:"i",ō:"o"}[finalLongVowel];
        imperfectiveFinalVowelRealizationFrame = runtimeTarget.buildClassicalNahuatlSegmentRealizationFrame({
          segment:finalLongVowel,phone:followers?shortVowel:shortVowel+"·",
          position:followers?"vocable-medial":"vocable-final",environment:followers?"before-glottal-stop":"vocable-final",
          realizationClass:followers?"regular":"reduced-long"});
        if (imperfectiveFinalVowelRealizationFrame.authorizationStatus!=="authorized"
          || !runtimeTarget.isClassicalNahuatlTranscriptionAnalysisFrame(imperfectiveFinalVowelRealizationFrame)) {
          return {kind:"classical-nahuatl-vnc-sentence-final-boundary-realization-frame",authorizationStatus:"blocked",
            blockReason:"full-imperfective-final-vowel-realization-required",formulaRealization:"",actions};
        }
        realizedFrame.slots.predicate.stem=realizedFrame.slots.predicate.stem.slice(0,-1)+imperfectiveFinalVowelRealizationFrame.outputSpelling;
        actions.push(followers?"shorten-imperfective-final-long-vowel-before-grammatical-h":"write-reduced-long-imperfective-final-vowel-without-macron");
      }
      realizedFrame.semanticIdentity = [subject.pers1, subject.pers2, ...prePredicate.map(slot => slot.carrier), realizedFrame.slots.predicate.stem, realizedFrame.slots.predicate.tns, number.num1, number.num2].join("|");
      const formulaRealization = renderClassicalNahuatlVncSlotFrameFormula(realizedFrame);
      return {
        kind: "classical-nahuatl-vnc-sentence-final-boundary-realization-frame",
        lesson: "Andrews Lesson 8",
        layerRole: "typed-final-boundary-realization",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_VNC_SLOT_SOURCE_DOCUMENT,
        authorizationStatus: formulaRealization ? "authorized" : "blocked",
        blockReason: formulaRealization ? "" : "typed-vnc-slot-render-failed",
        typedSlotAuthority: true,
        formulaStringAuthority: false,
        inputFormula: vncSlotFrame.sourceFormulaArtifact || "",
        inputFormulaRole: "display-artifact-not-authority",
        formulaRealization,
        typedSlotFrame: realizedFrame,
        imperfectiveSourceFrame,
        imperfectiveFinalVowelRealizationFrame,
        sourceTypedSlotFrame: cloneClassicalNahuatlVncSlotValue(vncSlotFrame),
        sourceSemanticIdentity: vncSlotFrame.semanticIdentity,
        finalSemanticIdentity: realizedFrame.semanticIdentity,
        directionalPrefix: directional.directionalPrefix,
        sourceDirectionalPrefix:
          directionalStemOperationEvaluationFrame
            .sourceDirectionalPrefix,
        directionalPlacement: directional.placement,
        directionalStemOperationEvaluationFrame,
        directionalStemOperationFrame:
          directionalStemOperationEvaluationFrame.operationFrame,
        directionalStemOperationApplied:
          directionalStemOperationEvaluationFrame.operationApplied,
        predicateStemBeforeDirectionalStemOperation:
          directionalStemOperationEvaluationFrame.sourceStem,
        predicateStemAfterDirectionalStemOperation:
          directionalStemOperationEvaluationFrame.selectedStem,
        directionalProgressiveAssimilation,
        directionalNasalAssimilation,
        subjectNasalAssimilation,
        directionalProgressiveAssimilationApplied: directionalProgressiveAssimilation.applied === true,
        directionalProgressiveAssimilationRuleIds: directionalProgressiveAssimilation.selectedRuleIds || [],
        predicateStemBeforeDirectionalAssimilation: directionalProgressiveAssimilation.sourcePredicateStem || "",
        predicateStemAfterDirectionalAssimilation: directionalProgressiveAssimilation.realizedPredicateStem || realizedFrame.slots.predicate.stem,
        finalBoundaryRealizationApplies: true,
        actions,
        objectMorphIdentityFrame,
        objectMorphIdentity: objectMorphIdentityFrame?.morphIdentity || "",
        objectMorphIdentityKind: objectMorphIdentityFrame?.morphIdentityKind || "",
        objectRegularSpellings: objectMorphIdentityFrame?.regularSpellings || [],
        objectSupportiveSpelling: objectMorphIdentityFrame?.supportiveSpelling || "",
        selectedObjectSlotBeforeFinalBoundary: selectedObjectSlotBefore,
        finalObjectSlot: valenceSlot?.carrier || selectedObjectSlotBefore,
        spellingSelectedAfterSlotOrder,
        thirdSingularKObjectBeforeOn: Boolean(objectMorphIdentityFrame?.morphIdentity === "/k/" && valenceSlot?.va1 === "c" && prePredicate[valenceIndex + 1]?.carrier === "on"),
        pluralObjectVa2BeforeFinalBoundary,
        finalPluralObjectVa2,
        subjectCarrierBeforeFinalBoundary: subjectBefore,
        finalSubjectCarrier: subject.pers1,
        subjectSupportiveVowelAction: nextNeedsSupport ? "surface-i-before-following-consonant" : "drop-i-before-following-vowel",
        nextCarrierAfterSubject: nextCarrier,
        nextSoundAfterSubject: nextSound,
        pers1SupportiveIToOApplied,
        finalNum1RuleRefs: number.supportiveRuleRefs || [],
        num1BeforeFinalBoundary: num1Before,
        finalNum1: number.num1,
        finalNum2: number.num2,
        finalNum1LeftCarrierSource: num1LeftCarrierSource,
        finalNum1LeftSound: num1LeftSound,
        finalNum1RealizationApplies: num1KContext,
        finalNum1SupportiveVowelAction: num1SupportiveVowelAction,
        finalNum1SquareZeroReplacesQui: num1SquareZeroReplacesQui,
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false
      };
    }
    const CLASSICAL_NAHUATL_NONACTIVE_SUFFIX_FAMILIES = Object.freeze(["lō", "ō", "o", "hua", "o-hua", "lo-hua", "hua-lō"]);
    const CLASSICAL_NAHUATL_NONACTIVE_FORMATION_CORES = Object.freeze(["o", "lo", "hua"]);
    const CLASSICAL_NAHUATL_NONACTIVE_FORMATION_STRUCTURES = Object.freeze({
      "o": Object.freeze({
        formationCore: "o",
        continuation: "terminal",
        sequence: Object.freeze(["o"])
      }),
      "ō": Object.freeze({
        formationCore: "o",
        continuation: "terminal",
        sequence: Object.freeze(["o"])
      }),
      "o-hua": Object.freeze({
        formationCore: "o",
        continuation: "hua",
        sequence: Object.freeze(["o", "hua"])
      }),
      "lō": Object.freeze({
        formationCore: "lo",
        continuation: "terminal",
        sequence: Object.freeze(["lo"])
      }),
      "lo-hua": Object.freeze({
        formationCore: "lo",
        continuation: "hua",
        sequence: Object.freeze(["lo", "hua"])
      }),
      "hua": Object.freeze({
        formationCore: "hua",
        continuation: "terminal",
        sequence: Object.freeze(["hua"])
      }),
      "hua-lō": Object.freeze({
        formationCore: "hua",
        continuation: "lo",
        sequence: Object.freeze(["hua", "lo"])
      })
    });

    // Final /e/ is not a fourth productive imperfective ending. Andrews identifies
    // the few e-final stems as lexical variants of a-final stems (§24.1), so their
    // identity must be known before Lesson 20 can license a nonactive formation.
    // A recognized active allomorph with no attested nonactive output remains
    // explicitly unresolved; it must not fall through to an invented generic rule.
    const CLASSICAL_NAHUATL_LESSON20_ACTIVE_STEM_IDENTITIES = Object.freeze([Object.freeze({
      identityId: "chihua-chihua-quantity-allomorphy",
      canonicalImperfectiveStem: "chīhua",
      allowedAllomorphs: Object.freeze(["chīhua", "chihua"]),
      // §20.2 identifies the active source as B; §20.8 assigns A
      // to the derived nonactive, independently of its active source.
      verbClasses: Object.freeze(["B"]),
      sourceValenceModes: Object.freeze(["transitive"]),
      allomorphy: "source-long-i-preserved",
      identityRuleId: "cn-l20-2-chihua-quantity-allomorphy",
      andrewsSections: Object.freeze(["20.2"]),
      nonactiveBasePolicy:
        "preserve-long-i-in-both-nonactive-aspects",
    }), Object.freeze({
      identityId: "chiya-chiye-wait",
      canonicalImperfectiveStem: "chiya",
      allowedAllomorphs: Object.freeze(["chiya", "chiye"]),
      verbClasses: Object.freeze(["B"]),
      sourceValenceModes: Object.freeze(["transitive"]),
      allomorphy: "final-a-e-variant-with-intervocalic-y",
      identityRuleId: "cn-l7-74-chiya-chiye-active-allomorphs",
      andrewsSections: Object.freeze(["7.4", "24.1"]),
      nonactiveBasePolicy: "licensed-active-allomorph-is-imperfective-base"
    }), Object.freeze({
      identityId: "piya-piye-guard",
      canonicalImperfectiveStem: "piya",
      allowedAllomorphs: Object.freeze(["piya", "piye"]),
      verbClasses: Object.freeze(["B"]),
      sourceValenceModes: Object.freeze(["transitive"]),
      allomorphy: "final-a-e-lexical-variant",
      identityRuleId: "cn-l24-1-piya-piye-active-allomorphs",
      andrewsSections: Object.freeze(["24.1", "37.9.1.a"]),
      nonactiveBasePolicy: "licensed-active-allomorph-is-imperfective-base"
    }), Object.freeze({
      identityId: "mama-meme-carry-on-back",
      canonicalImperfectiveStem: "māmā",
      allowedAllomorphs: Object.freeze(["māmā", "mēmē"]),
      verbClasses: Object.freeze(["D"]),
      sourceValenceModes: Object.freeze(["transitive"]),
      allomorphy: "long-final-a-e-lexical-variant",
      identityRuleId: "cn-l24-1-mama-meme-active-allomorphs",
      andrewsSections: Object.freeze(["7.6", "20.2", "24.1"]),
      nonactiveBasePolicy: "licensed-active-allomorph-is-imperfective-base",
      unresolvedAllomorphs: Object.freeze({
        mēmē: "canvas-identifies-the-active-allomorph-but-does-not-license-an-exact-nonactive-stem"
      })
    })]);

    // This is an override/alternative inventory, never a whitelist. Any well-shaped
    // stem absent here continues through the productive Lesson 20 ending rules.
    const CLASSICAL_NAHUATL_LESSON20_FIXED_FORMATIONS = Object.freeze({
      // §38.1 documents optional nonactive operands outside the ordinary
      // ending rules. These license the verb operation, never a noun output.
      "cochi": Object.freeze([Object.freeze({
        finalShapeReplacement: Object.freeze({ ending: "i", replacement: "-ō" }),
        suffixFamily: "ō", ruleId: "cn-l38-1-cochi-o-variant",
        formationAuthority: "optional-variant", sourceValenceMode: "intransitive"
      })]),
      "ī": Object.freeze([Object.freeze({
        nonactiveStem: "ī-lō", suffixFamily: "lō",
        ruleId: "cn-l38-1-drink-lo-variant",
        formationAuthority: "optional-variant", sourceValenceMode: "transitive"
      })]),
      "pix-ca": Object.freeze([Object.freeze({
        finalShapeReplacement: Object.freeze({ ending: "ca", replacement: "quī-hua" }),
        suffixFamily: "hua", ruleId: "cn-l38-1-pixca-replacive-hua",
        formationAuthority: "optional-variant", sourceValenceMode: "intransitive"
      })]),
      "chihcha": Object.freeze([Object.freeze({
        finalShapeReplacement: Object.freeze({ ending: "a", replacement: "ī-hua" }),
        suffixFamily: "hua", ruleId: "cn-l38-1-chihcha-replacive-hua",
        formationAuthority: "optional-variant", sourceValenceMode: "intransitive"
      })]),
      "xō-tla": Object.freeze([Object.freeze({
        finalShapeReplacement: Object.freeze({ ending: "tla", replacement: "chī-hua" }),
        suffixFamily: "hua", ruleId: "cn-l38-1-xotla-replacive-hua",
        formationAuthority: "optional-variant", sourceValenceMode: "intransitive"
      })]),
      "nemi": Object.freeze([Object.freeze({
        finalShapeReplacement: Object.freeze({ ending: "i", replacement: "-o" }),
        suffixFamily: "o",
        ruleId: "cn-l28-7-6-nemi-o-variant",
        andrewsSection: "28.7.6",
        formationAuthority: "optional-variant",
        allowedSourceValences: Object.freeze(["intransitive"]),
        allowedVerbClasses: Object.freeze(["B"])
      })]),
      "ahci": Object.freeze([Object.freeze({
        nonactiveStem: "ahxī-hua",
        suffixFamily: "hua",
        ruleId: "cn-l20-6-ahci",
        formationAuthority: "obligatory-exception"
      })]),
      "cuīca": Object.freeze([Object.freeze({
        nonactiveStem: "cuīc-ō",
        suffixFamily: "ō",
        ruleId: "cn-l20-5-cuica-exception",
        formationAuthority: "obligatory-exception"
      })]),
      "huica": Object.freeze([Object.freeze({
        nonactiveStem: "huica-lō",
        suffixFamily: "lō",
        ruleId: "cn-l38-1-4-huica-lo-human-source",
        formationAuthority: "optional-variant",
        allowedSourceValences: Object.freeze(["projective-human"])
      })]),
      "ilpi-ā": Object.freeze([Object.freeze({
        nonactiveStem: "ilpī-lō",
        suffixFamily: "lō",
        ruleId: "cn-l38-1-4-ilpia-lo-human-source",
        formationAuthority: "optional-variant",
        allowedSourceValences: Object.freeze(["projective-human"])
      })]),
      "ca-h": Object.freeze([Object.freeze({
        nonactiveStem: "ye-lo-hua",
        suffixFamily: "lo-hua",
        ruleId: "cn-l20-3-cah-suppletive",
        formationAuthority: "suppletive-lexical-rule"
      })]),
      "chihua": Object.freeze([Object.freeze({
        nonactiveStem: "chīhua-lō",
        perfectiveNonactiveStem: "chīhua-lō",
        suffixFamily: "lō",
        ruleId: "cn-l20-2-chihua",
        formationAuthority: "productive-lexical-class-rule",
        andrewsSection: "20.2"
      })]),
      "choca": Object.freeze([Object.freeze({
        nonactiveStem: "chōc-o-hua",
        suffixFamily: "o-hua",
        ruleId: "cn-l20-5-choca",
        vowelLengthRuleId: "cn-l20-5-choca-lexical-o-lengthening",
        formationAuthority: "obligatory-exception"
      })]),
      "coco-ya": Object.freeze([Object.freeze({
        nonactiveStem: "coco-lō",
        suffixFamily: "lō",
        ruleId: "cn-l20-2-class-b-root-plus-ya-cocoya",
        formationAuthority: "productive-lexical-class-rule"
      })]),
      "yocoya": Object.freeze([Object.freeze({
        nonactiveStem: "yōco-lō",
        suffixFamily: "lō",
        ruleId: "cn-l20-2-yocoya-canonical-yoco-base",
        formationAuthority: "productive-lexical-class-rule"
      })]),
      "cui": Object.freeze([Object.freeze({
        nonactiveStem: "cuī-hua",
        suffixFamily: "hua",
        ruleId: "cn-l20-6-cui",
        formationAuthority: "productive-rule"
      }), Object.freeze({
        nonactiveStem: "cuī-hua-lō",
        suffixFamily: "hua-lō",
        ruleId: "cn-l20-7-cui-hua-lo-variant",
        formationAuthority: "optional-variant"
      })]),
      "hui-tz": Object.freeze([Object.freeze({
        nonactiveStem: "huī-lo-hua-tz",
        suffixFamily: "lo-hua",
        ruleId: "cn-l20-3-huitz",
        formationAuthority: "suppletive-lexical-rule",
        attachmentSite: "first-compound-member"
      })]),
      "huī-tz": Object.freeze([Object.freeze({
        nonactiveStem: "huī-lo-hua-tz",
        suffixFamily: "lo-hua",
        ruleId: "cn-l20-3-huitz",
        vowelLengthRuleId: "cn-l20-3-huitz-preserve-source-long-i",
        formationAuthority: "suppletive-lexical-rule",
        attachmentSite: "first-compound-member"
      })]),
      "hue-tz-ca": Object.freeze([Object.freeze({
        nonactiveStem: "hue-tz-c-ō",
        suffixFamily: "ō",
        ruleId: "cn-l20-4-huetzca",
        formationAuthority: "obligatory-exception"
      })]),
      "huāl-la-uh": Object.freeze([Object.freeze({
        nonactiveStem: "huāl-hui-lo-hua",
        suffixFamily: "lo-hua",
        ruleId: "cn-l20-3-huallauh",
        formationAuthority: "suppletive-lexical-rule"
      })]),
      "huīca-tz": Object.freeze([Object.freeze({
        nonactiveStem: "huīca-lo-hua-tz",
        suffixFamily: "lo-hua",
        ruleId: "cn-l20-3-huicatz",
        formationAuthority: "suppletive-lexical-rule",
        attachmentSite: "first-compound-member"
      }), Object.freeze({
        nonactiveStem: "huīc-o-hua-tz",
        suffixFamily: "o-hua",
        ruleId: "cn-l20-3-huicatz-variant",
        formationAuthority: "optional-variant"
      })]),
      "ihcali": Object.freeze([Object.freeze({
        nonactiveStem: "ihcali-lō",
        suffixFamily: "lō",
        ruleId: "cn-l20-6-ihcali-variant",
        formationAuthority: "optional-variant"
      })]),
      "ihcuani-ā": Object.freeze([Object.freeze({
        nonactiveStem: "ihcuanī-hua",
        suffixFamily: "hua",
        ruleId: "cn-l20-6-ihcuania-hua-variant",
        formationAuthority: "optional-variant"
      })]),
      "ihnecui": Object.freeze([Object.freeze({
        nonactiveStem: "ihnec-ō",
        suffixFamily: "ō",
        ruleId: "cn-l20-4-ihnecui",
        formationAuthority: "productive-lexical-class-rule"
      }), Object.freeze({
        nonactiveStem: "ihnecu-ō",
        suffixFamily: "ō",
        ruleId: "cn-l20-4-ihnecui-variant",
        formationAuthority: "optional-variant"
      })]),
      "il-hui": Object.freeze([Object.freeze({
        nonactiveStem: "il-huī-lō",
        suffixFamily: "lō",
        ruleId: "cn-l21-4-ilhui-multiple-object-nonactive",
        formationAuthority: "productive-lexical-class-rule",
        andrewsSection: "21.4",
        allowedSourceValences: Object.freeze(["specific-projective"])
      })]),
      "ilō-ti": Object.freeze([Object.freeze({
        nonactiveStem: "īlō-ch-ō",
        suffixFamily: "ō",
        ruleId: "cn-l20-4-iloti",
        formationAuthority: "obligatory-exception"
      })]),
      "itt-a": Object.freeze([Object.freeze({
        nonactiveStem: "itt-ō",
        suffixFamily: "ō",
        ruleId: "cn-l20-4-itta",
        formationAuthority: "productive-lexical-class-rule",
        andrewsSection: "20.4"
      }), Object.freeze({
        nonactiveStem: "itt-a-lō",
        suffixFamily: "lō",
        ruleId: "cn-l20-4-itta-lo-variant",
        formationAuthority: "optional-variant",
        andrewsSection: "20.4"
      })]),
      "itqui-tz": Object.freeze([Object.freeze({
        nonactiveStem: "itqui-lo-hua-tz",
        suffixFamily: "lo-hua",
        ruleId: "cn-l20-3-itquitz",
        formationAuthority: "suppletive-lexical-rule",
        attachmentSite: "first-compound-member"
      })]),
      "itqui": Object.freeze([Object.freeze({
        nonactiveStem: "itc-ō",
        suffixFamily: "ō",
        ruleId: "cn-l20-4-itqui",
        formationAuthority: "productive-rule"
      }), Object.freeze({
        nonactiveStem: "itquī-hua",
        suffixFamily: "hua",
        ruleId: "cn-l20-4-itqui-variant",
        formationAuthority: "optional-variant"
      })]),
      "mani": Object.freeze([Object.freeze({
        nonactiveStem: "man-o-hua",
        suffixFamily: "o-hua",
        ruleId: "cn-l20-5-mani",
        formationAuthority: "productive-rule"
      }), Object.freeze({
        nonactiveStem: "manī-hua",
        suffixFamily: "hua",
        ruleId: "cn-l20-5-mani-variant",
        formationAuthority: "optional-variant"
      })]),
      "mamali": Object.freeze([Object.freeze({
        nonactiveStem: "mamali-o-hua",
        suffixFamily: "o-hua",
        ruleId: "cn-l20-5-mamali-transitive",
        formationAuthority: "productive-lexical-class-rule",
        preserveProductiveDecisionCategories: Object.freeze(["general-final-i-o"])
      }), Object.freeze({
        nonactiveStem: "mamalī-hua-lō",
        suffixFamily: "hua-lō",
        ruleId: "cn-l20-7-mamali-hua-lo-variant",
        formationAuthority: "optional-variant"
      })]),
      "mati": Object.freeze([Object.freeze({
        nonactiveStem: "mach-ō",
        suffixFamily: "ō",
        ruleId: "cn-l20-4-mati",
        formationAuthority: "obligatory-exception"
      })]),
      "panō": Object.freeze([Object.freeze({
        nonactiveStem: "panō-lō",
        suffixFamily: "lō",
        ruleId: "cn-l20-6-pano-variant",
        formationAuthority: "optional-variant"
      })]),
      "pīn-ā-hua": Object.freeze([Object.freeze({
        nonactiveStem: "pīn-ā-hua-lō",
        suffixFamily: "hua-lō",
        ruleId: "cn-l20-5-pinahua-exception",
        formationAuthority: "obligatory-exception"
      })]),
      "pā-tz-ca": Object.freeze([Object.freeze({
        nonactiveStem: "pā-tz-ca-lō",
        preserveProductiveDecisionCategories: Object.freeze(["projective-final-a-hua"]),
        suffixFamily: "lō",
        ruleId: "cn-l20-2-class-a-patzca",
        formationAuthority: "productive-lexical-class-rule"
      })]),
      "piya": Object.freeze([Object.freeze({
        imperfectiveBaseSuffix: "lō",
        suffixFamily: "lō",
        ruleId: "cn-l20-2-class-b-piya-full-stem",
        formationAuthority: "productive-lexical-class-rule"
      })]),
      "pitza": Object.freeze([Object.freeze({
        nonactiveStem: "pitza-lō",
        suffixFamily: "lō",
        ruleId: "cn-l20-2-class-b-pitza",
        formationAuthority: "productive-lexical-class-rule"
      })]),
      "quetza": Object.freeze([Object.freeze({
        nonactiveStem: "quetza-lō",
        suffixFamily: "lō",
        ruleId: "cn-l20-2-class-b-quetza",
        formationAuthority: "productive-lexical-class-rule"
      }), Object.freeze({
        nonactiveStem: "quech-ō",
        suffixFamily: "ō",
        ruleId: "cn-l37-9-quetza-quecho-passive-allomorph",
        andrewsSection: "37.9.1.b",
        formationAuthority: "optional-variant",
        sourceValenceMode: "transitive",
        allowedVerbClasses: Object.freeze(["B"])
      })]),
      // §37.9.1.c explicitly identifies these unexpected nonactive stems.
      // They license the nonactive operand, never the finished patientive.
      "ic-za": Object.freeze([Object.freeze({
        finalShapeReplacement: Object.freeze({ ending: "za", replacement: "xī-hua" }),
        suffixFamily: "hua",
        ruleId: "cn-l37-9-icza-icxihua-passive-allomorph",
        andrewsSection: "37.9.1.c",
        formationAuthority: "optional-variant",
        sourceValenceMode: "transitive",
        allowedVerbClasses: Object.freeze(["A"])
      })]),
      "ohza": Object.freeze([Object.freeze({
        finalShapeReplacement: Object.freeze({ ending: "za", replacement: "xī-hua" }),
        suffixFamily: "hua",
        ruleId: "cn-l37-9-ohza-ohxihua-passive-allomorph",
        andrewsSection: "37.9.1.c",
        formationAuthority: "optional-variant",
        sourceValenceMode: "transitive",
        allowedVerbClasses: Object.freeze(["A"])
      })]),
      "mōtla": Object.freeze([Object.freeze({
        finalShapeReplacement: Object.freeze({ ending: "tla", replacement: "chī-hua" }),
        suffixFamily: "hua",
        ruleId: "cn-l37-9-motla-mochihua-passive-allomorph",
        andrewsSection: "37.9.1.c",
        formationAuthority: "optional-variant",
        sourceValenceMode: "transitive",
        allowedVerbClasses: Object.freeze(["A"])
      })]),
      "teci": Object.freeze([Object.freeze({
        nonactiveStem: "tecī-hua",
        suffixFamily: "hua",
        ruleId: "cn-l20-5-teci",
        vowelLengthRuleId: "cn-l20-5-teci-lexical-final-i-lengthening",
        formationAuthority: "obligatory-exception",
        sourceValenceMode: "intransitive"
      }), Object.freeze({
        nonactiveStem: "tex-ō",
        suffixFamily: "ō",
        ruleId: "cn-l24-2-teci-transitive-o",
        formationAuthority: "productive-lexical-class-rule",
        andrewsSection: "24.2",
        attestationStatus: "valence-neutral-transitive-nonactive",
        sourceValenceMode: "transitive"
      }), Object.freeze({
        nonactiveStem: "tex-o-hua",
        suffixFamily: "o-hua",
        ruleId: "cn-l24-2-teci-transitive-ohua",
        formationAuthority: "optional-variant",
        andrewsSection: "24.2",
        attestationStatus: "valence-neutral-transitive-nonactive",
        sourceValenceMode: "transitive",
        userSelectable: true
      })]),
      "tequi-tī": Object.freeze([Object.freeze({
        nonactiveStem: "tequi-tī-lō",
        suffixFamily: "lō",
        ruleId: "cn-l22-4-3-transitive-tequiti-lo",
        formationAuthority: "obligatory-exception",
        andrewsSection: "22.4.3",
        sourceValenceMode: "transitive"
      })]),
      "teo-hci-hui": Object.freeze([Object.freeze({
        nonactiveStem: "teo-hci-ō-hua",
        suffixFamily: "o-hua",
        ruleId: "cn-l20-5-teohcihui",
        formationAuthority: "obligatory-exception",
        andrewsSection: "20.5",
        sourceValenceMode: "intransitive"
      })]),
      "ciya-hui": Object.freeze([Object.freeze({
        nonactiveStem: "ciya-ō-hua",
        suffixFamily: "o-hua",
        ruleId: "cn-l20-5-ciyahui",
        formationAuthority: "obligatory-exception",
        andrewsSection: "20.5",
        sourceValenceMode: "intransitive"
      })]),
      "tēmi": Object.freeze([Object.freeze({
        nonactiveStem: "tēmī-hua",
        suffixFamily: "hua",
        ruleId: "cn-l20-5-temi",
        vowelLengthRuleId: "cn-l20-5-temi-final-i-lengthening",
        formationAuthority: "obligatory-exception",
        andrewsSection: "20.5"
      })]),
      "tiāmiqui": Object.freeze([Object.freeze({
        nonactiveStem: "tiāmic-ō",
        suffixFamily: "ō",
        ruleId: "cn-l20-5-tiamique-exception",
        vowelLengthRuleId: "cn-l20-5-tiamiqui-preserve-source-long-a",
        formationAuthority: "obligatory-exception"
      })]),
      "tzahtzi": Object.freeze([Object.freeze({
        nonactiveStem: "tzahtzī-hua",
        suffixFamily: "hua",
        ruleId: "cn-l20-5-tzahtzi",
        vowelLengthRuleId: "cn-l20-5-tzahtzi-lexical-final-i-lengthening",
        formationAuthority: "obligatory-exception"
      })]),
      "ya-uh": Object.freeze([Object.freeze({
        nonactiveStem: "huī-lo-hua",
        suffixFamily: "lo-hua",
        ruleId: "cn-l20-3-yauh",
        formationAuthority: "suppletive-lexical-rule"
      })]),
      "ye": Object.freeze([Object.freeze({
        nonactiveStem: "ye-lo-hua",
        suffixFamily: "lo-hua",
        ruleId: "cn-l20-3-ye",
        formationAuthority: "suppletive-lexical-rule"
      })]),
      "mahui": Object.freeze([Object.freeze({
        nonactiveStem: "ma-ō-hua",
        suffixFamily: "o-hua",
        ruleId: "cn-l20-5-mahui",
        formationAuthority: "productive-lexical-class-rule",
        allowedSourceValences: Object.freeze(["intransitive"]),
        preserveProductiveDecisionCategories: Object.freeze(["general-final-i-o"])
      })]),
      "zō": Object.freeze([Object.freeze({
        nonactiveStem: "zō-hua",
        suffixFamily: "hua",
        ruleId: "cn-l20-6-zo",
        formationAuthority: "productive-rule"
      }), Object.freeze({
        nonactiveStem: "zō-lō",
        suffixFamily: "lō",
        ruleId: "cn-l20-6-zo-variant",
        formationAuthority: "optional-variant"
      })])
    });

    function buildClassicalNahuatlLexicalFormationLicenseFrame(sourceStem = "", rawOptions = {}) {
      const optionRead = readClassicalNahuatlNonactiveDataOptions(rawOptions, [
        "verbClass",
        "sourceValence"
      ]);
      const sourceIdentityFrame = buildClassicalNahuatlActiveStemIdentityFrame(
        typeof sourceStem === "string" ? sourceStem : "",
        optionRead.values
      );
      const resolution = resolveClassicalNahuatlLesson20InventoryEntry(
        CLASSICAL_NAHUATL_LESSON20_FIXED_FORMATIONS,
        sourceIdentityFrame.canonicalImperfectiveStem
      );
      const formations = optionRead.authorizationStatus === "authorized"
        && isClassicalNahuatlActiveStemIdentityFrame(
          sourceIdentityFrame,
          sourceIdentityFrame.enteredStem
        )
        ? filterClassicalNahuatlLesson20FormationsForContext(
          resolution.formations,
          { sourceValence: sourceIdentityFrame.sourceValence,
            verbClass: sourceIdentityFrame.verbClass }
        ).map(formation => formation.imperfectiveBaseSuffix
          && sourceIdentityFrame.nonactiveBasePolicy === "licensed-active-allomorph-is-imperfective-base"
          ? { ...formation, nonactiveStem: `${sourceIdentityFrame.enteredStem}-${formation.imperfectiveBaseSuffix}` }
          : formation.finalShapeReplacement
          ? { ...formation, nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(
              sourceIdentityFrame.sourceFinalShapeFrame,
              formation.finalShapeReplacement.ending,
              formation.finalShapeReplacement.replacement
            ) }
          : formation)
        : [];
      const authorized = Boolean(formations.length);
      const frame = Object.freeze({
        kind: "classical-nahuatl-nonactive-lexical-formation-license-frame",
        version: 1,
        semanticOwner: "classical-nahuatl-nonactive-lexical-source",
        authorizationStatus: authorized ? "authorized" : "not-applicable",
        blockReason: authorized
          ? ""
          : optionRead.blockReason || "no-licensed-nonactive-lexical-formation",
        sourceIdentityFrame,
        sourceStem: sourceIdentityFrame.enteredStem,
        lexicalIdentityId: resolution.inventorySourceStem
          ? `cn-nonactive-lexical-source:${resolution.inventorySourceStem}`
          : "",
        sourceLexicalIdentityId: sourceIdentityFrame.lexicalIdentityId,
        lexicalIdentityKey: resolution.lexicalIdentityKey,
        inventorySourceStem: resolution.inventorySourceStem,
        boundaryInsensitiveMatch: resolution.boundaryInsensitiveMatch,
        formations: Object.freeze(formations.map(formation => Object.freeze({
          ...formation
        }))),
        documentaryExampleAuthority: false,
        callerSuppliedFormationAuthority: false
      });
      CLASSICAL_NAHUATL_ISSUED_NONACTIVE_LEXICAL_LICENSES.add(frame);
      return frame;
    }
    function isClassicalNahuatlLexicalFormationLicenseFrame(frame = null, sourceStem = "") {
      return Boolean(
        frame
        && CLASSICAL_NAHUATL_ISSUED_NONACTIVE_LEXICAL_LICENSES.has(frame)
        && frame.kind === "classical-nahuatl-nonactive-lexical-formation-license-frame"
        && frame.version === 1
        && frame.semanticOwner === "classical-nahuatl-nonactive-lexical-source"
        && frame.authorizationStatus === "authorized"
        && isClassicalNahuatlActiveStemIdentityFrame(
          frame.sourceIdentityFrame,
          sourceStem
        )
        && frame.sourceStem === frame.sourceIdentityFrame.enteredStem
        && frame.lexicalIdentityId
          === `cn-nonactive-lexical-source:${frame.inventorySourceStem}`
        && frame.sourceLexicalIdentityId
          === frame.sourceIdentityFrame.lexicalIdentityId
        && frame.documentaryExampleAuthority === false
        && frame.callerSuppliedFormationAuthority === false
        && Array.isArray(frame.formations)
        && frame.formations.length > 0
      );
    }
    // Short terminal o is a licensed lexical variant, never a productive
    // shortening of the ordinary terminal ō formation.
    function hasClassicalNahuatlLicensedShortTerminalO(option = null, sourceStem = "") {
      return Boolean(option?.suffixFamily === "o"
        && isClassicalNahuatlLexicalFormationLicenseFrame(option.lexicalFormationLicenseFrame, sourceStem)
        && option.lexicalFormationLicenseFrame.formations.some(formation =>
          formation.suffixFamily === "o"
          && formation.nonactiveStem === option.nonactiveStem
          && formation.ruleId === option.ruleId
          && formation.formationAuthority === "optional-variant"));
    }
    function getClassicalNahuatlNonactiveFormationAuthorityLabel(formationAuthority = "") {
      return {
        "optional-variant": "optional variant",
        "obligatory-exception": "obligatory exception",
        "suppletive-lexical-rule": "suppletive rule",
        "productive-lexical-class-rule": "lexically classified rule",
        "shape-licensed-possibility": "shape-licensed possibility"
      }[formationAuthority] || "rule";
    }
    function getClassicalNahuatlNonactiveTargetClass(suffixFamily = "", nonactiveStem = "") {
      const normalizedFamily = normalizeClassicalNahuatlVncSlotCarrier(suffixFamily);
      const normalizedStem = normalizeClassicalNahuatlVncSlotStem(nonactiveStem);
      if (["hua", "o-hua", "lo-hua"].includes(normalizedFamily) && /hua$/u.test(normalizedStem)) {
        return "A-1";
      }
      if (["lō", "ō", "hua-lō"].includes(normalizedFamily)) {
        return "A-2";
      }
      return "A";
    }
    function isClassicalNahuatlPerfectiveEnvironment({
      mood = "",
      tense = ""
    } = {}) {
      const normalizedMood = normalizeClassicalNahuatlVncSlotCarrier(mood).toLowerCase();
      const normalizedTense = normalizeClassicalNahuatlVncSlotCarrier(tense).toLowerCase();
      if (normalizedMood === "admonitive") {
        return true;
      }
      if (normalizedMood === "optative" && ["past", "preterit"].includes(normalizedTense)) {
        return true;
      }
      return ["preterit", "distant-past", "general-past", "past"].includes(normalizedTense);
    }
    function getClassicalNahuatlFinalShapeTail(units = [], size = 1) {
      return units.slice(Math.max(0, units.length - size)).join("");
    }
    function getClassicalNahuatlFinalShapeSound(value = "") {
      return normalizeClassicalNahuatlVncSlotCarrier(value).normalize("NFD").replace(/[\u0300-\u036f]/gu, "").toLowerCase();
    }
    function getClassicalNahuatlMorphemicBoundaryFamilies(morphemes = []) {
      const normalizedMorphemes = Array.isArray(morphemes)
        ? morphemes.map(normalizeClassicalNahuatlVncSlotStem).filter(Boolean)
        : [];
      const families = [];
      const addFamily = (familyId, applies) => {
        if (applies && !families.includes(familyId)) {
          families.push(familyId);
        }
      };
      const finalOne = normalizedMorphemes.at(-1) || "";
      const finalTwo = normalizedMorphemes.slice(-2).join("-");
      const finalThree = normalizedMorphemes.slice(-3).join("-");
      ["ti", "hui", "ya", "ā", "hua", "tla", "liā", "iā", "huiā", "lō", "ō"]
        .forEach(ending => addFamily(`X-${ending}`, finalOne === ending));
      ["ti-ya", "hui-ya", "i-ā", "o-ā", "ti-ā", "l-tiā", "hu-iā", "l-huiā", "hua-lō"]
        .forEach(ending => addFamily(`X-${ending}`, finalTwo === ending));
      addFamily("X-tiā", finalOne === "tiā" && finalTwo !== "ti-ā");
      const destockalStockVowel = ["a", "ā", "e", "ē", "i", "ī", "o", "ō"];
      ["ni", "hui", "hua"].forEach(formative => {
        const stockVowel = normalizedMorphemes.at(-2) || "";
        addFamily(`X-V-${formative}`, finalOne === formative && destockalStockVowel.includes(stockVowel));
      });
      addFamily("X-ti-ya", finalThree.endsWith("ti-ya"));
      addFamily("X-hui-ya", finalThree.endsWith("hui-ya"));
      return Object.freeze(families);
    }
    function buildClassicalNahuatlMorphemicSourceProfile(sourceFinalShapeFrame = null, {
      sourceClass = "",
      sourceValence = "",
      hiddenIntervocalicY = false,
      finalTiLexicalAnalysis = null
    } = {}) {
      const shape = sourceFinalShapeFrame?.authorizationStatus === "authorized"
        ? sourceFinalShapeFrame
        : null;
      const morphemes = shape ? [...shape.morphemes] : [];
      const boundaryFamilies = getClassicalNahuatlMorphemicBoundaryFamilies(morphemes);
      const vowelNuclei = shape?.stem.match(/[aāeēiīoō]/gu) || [];
      const explicitBoundaries = morphemes.slice(0, -1).map((leftMorpheme, index) => Object.freeze({
        boundaryIndex: index + 1,
        leftMorpheme,
        rightMorpheme: morphemes[index + 1]
      }));
      const edgeStructure = Object.freeze({
        orthographicTail: shape?.orthographicTail || Object.freeze({ one: "", two: "", three: "" }),
        letterTail: shape?.letterTail || Object.freeze({ one: "", two: "", three: "" }),
        soundTail: shape?.soundTail || Object.freeze({ one: "", two: "", three: "" }),
        morphemeTail: shape?.morphemeTail || Object.freeze({ one: "", two: "", three: "" }),
        rightEdgeMorpheme: shape?.rightEdgeMorpheme || "",
        precedingMorpheme: shape?.precedingMorpheme || "",
        initialMorpheme: shape?.initialMorpheme || "",
        hasMorphemeBoundary: shape?.hasMorphemeBoundary === true,
        finalThreeContainsBoundary: shape?.finalThreeContainsBoundary === true,
        finalThreeContainsMacron: shape?.finalThreeContainsMacron === true
      });
      return Object.freeze({
        kind: "classical-nahuatl-vnc-morphemic-source-profile",
        version: 1,
        authorizationStatus: shape ? "authorized" : "blocked",
        blockReason: shape ? "" : "typed-source-final-shape-required",
        sourceStem: shape?.stem || "",
        morphemicComplexity: morphemes.length > 1 ? "polymorphemic" : "monomorphemic",
        explicitMorphemes: Object.freeze(morphemes),
        explicitBoundaries: Object.freeze(explicitBoundaries),
        boundaryFamilies,
        recursiveBoundaryStructure: boundaryFamilies.length > 1,
        edgeStructure,
        phonologicalShape: Object.freeze({
          vowelNuclei: Object.freeze([...vowelNuclei]),
          finalLetter: shape?.finalLetter || "",
          precedingLetter: shape?.precedingLetter || "",
          finalSound: shape?.finalSound || "",
          precedingSound: shape?.precedingSound || "",
          finalVowelLength: shape?.finalVowelLength || "not-vowel"
        }),
        sourceClass: normalizeClassicalNahuatlVncSlotCarrier(sourceClass).toUpperCase(),
        sourceValence: normalizeClassicalNahuatlVncSlotCarrier(sourceValence),
        lexicalAnalyses: Object.freeze([
          ...(hiddenIntervocalicY ? [Object.freeze({
            analysisId: "hidden-intervocalic-y",
            analysisKind: "lexical-allomorphy"
          })] : []),
          ...(finalTiLexicalAnalysis ? [Object.freeze({ ...finalTiLexicalAnalysis })] : [])
        ]),
        canvasExampleAuthority: false,
        routeAuthorizationByExampleIdentity: false,
        formulaArtifactAuthority: false,
        surfaceArtifactAuthority: false
      });
    }
    function buildClassicalNahuatlStemFinalShapeFrame(stem = "") {
      const normalizedStem = normalizeClassicalNahuatlVncSlotStem(stem);
      const orthographicUnits = Array.from(normalizedStem);
      const letterUnits = orthographicUnits.filter(unit => unit !== "-");
      const morphemes = normalizedStem ? normalizedStem.split("-") : [];
      const rightEdgeMorpheme = morphemes[morphemes.length - 1] || "";
      const precedingMorpheme = morphemes[morphemes.length - 2] || "";
      const finalLetter = letterUnits[letterUnits.length - 1] || "";
      const precedingLetter = letterUnits[letterUnits.length - 2] || "";
      const longVowels = new Set(["ā", "ē", "ī", "ō"]);
      const orthographicTail = Object.freeze({
        one: getClassicalNahuatlFinalShapeTail(orthographicUnits, 1),
        two: getClassicalNahuatlFinalShapeTail(orthographicUnits, 2),
        three: getClassicalNahuatlFinalShapeTail(orthographicUnits, 3)
      });
      const letterTail = Object.freeze({
        one: getClassicalNahuatlFinalShapeTail(letterUnits, 1),
        two: getClassicalNahuatlFinalShapeTail(letterUnits, 2),
        three: getClassicalNahuatlFinalShapeTail(letterUnits, 3)
      });
      const soundTail = Object.freeze({
        one: getClassicalNahuatlFinalShapeSound(letterTail.one),
        two: getClassicalNahuatlFinalShapeSound(letterTail.two),
        three: getClassicalNahuatlFinalShapeSound(letterTail.three)
      });
      const morphemeTail = Object.freeze({
        one: morphemes.slice(-1).join("-"),
        two: morphemes.slice(-2).join("-"),
        three: morphemes.slice(-3).join("-")
      });
      return Object.freeze({
        kind: "classical-nahuatl-nonactive-vnc-stem-final-shape-frame",
        version: 1,
        sourceAuthority: "derived-from-active-stem-orthography",
        authorizationStatus: normalizedStem ? "authorized" : "blocked",
        blockReason: normalizedStem ? "" : "lesson20-final-shape-source-stem-required",
        stem: normalizedStem,
        unitLimit: 3,
        orthographicTail,
        letterTail,
        soundTail,
        morphemeTail,
        morphemes: Object.freeze([...morphemes]),
        morphemeCount: morphemes.length,
        rightEdgeMorpheme,
        precedingMorpheme,
        finalLetter,
        precedingLetter,
        finalSound: getClassicalNahuatlFinalShapeSound(finalLetter),
        precedingSound: getClassicalNahuatlFinalShapeSound(precedingLetter),
        finalVowelLength: longVowels.has(finalLetter) ? "long" : /^[aeio]$/u.test(finalLetter) ? "short" : "not-vowel",
        finalLetterHasMacron: longVowels.has(finalLetter),
        finalThreeContainsMacron: /[āēīō]/u.test(letterTail.three),
        hasMorphemeBoundary: morphemes.length > 1,
        finalThreeContainsBoundary: orthographicTail.three.includes("-"),
        initialMorpheme: morphemes[0] || ""
      });
    }
    function isClassicalNahuatlTransitiveValence(sourceValence = "") {
      const normalizedValence = normalizeClassicalNahuatlVncSlotCarrier(sourceValence);
      return Boolean(normalizedValence && normalizedValence !== "intransitive");
    }
    function readClassicalNahuatlNonactiveDataOptions(rawOptions = {}, allowedKeys = []) {
      const options = rawOptions == null ? {} : rawOptions;
      if (!options || typeof options !== "object") {
        return Object.freeze({
          authorizationStatus: "blocked",
          blockReason: "nonactive-options-must-be-a-plain-data-object",
          values: Object.freeze({})
        });
      }
      let prototype = null;
      let descriptors = null;
      let ownKeys = null;
      try {
        prototype = Object.getPrototypeOf(options);
        descriptors = Object.getOwnPropertyDescriptors(options);
        ownKeys = Reflect.ownKeys(options);
      } catch (_error) {
        return Object.freeze({
          authorizationStatus: "blocked",
          blockReason: "nonactive-options-contain-hidden-accessor-or-unknown-authority",
          values: Object.freeze({})
        });
      }
      if (![Object.prototype, null].includes(prototype)) {
        return Object.freeze({
          authorizationStatus: "blocked",
          blockReason: "nonactive-options-must-be-a-plain-data-object",
          values: Object.freeze({})
        });
      }
      const allowed = new Set(allowedKeys);
      const invalidKey = ownKeys.find(key => (
        typeof key !== "string"
        || !allowed.has(key)
        || !descriptors[key]
        || !Object.prototype.hasOwnProperty.call(descriptors[key], "value")
        || typeof descriptors[key].value !== "string"
      ));
      if (invalidKey !== undefined) {
        return Object.freeze({
          authorizationStatus: "blocked",
          blockReason: "nonactive-options-contain-hidden-accessor-or-unknown-authority",
          values: Object.freeze({})
        });
      }
      return Object.freeze({
        authorizationStatus: "authorized",
        blockReason: "",
        values: Object.freeze(Object.fromEntries(
          ownKeys.map(key => [key, descriptors[key].value])
        ))
      });
    }
    function buildClassicalNahuatlActiveStemIdentityFrame(sourceStem = "", rawOptions = {}) {
      const sourceStemIsTyped = typeof sourceStem === "string";
      const optionRead = readClassicalNahuatlNonactiveDataOptions(rawOptions, [
        "verbClass",
        "sourceValence"
      ]);
      const verbClass = optionRead.values.verbClass || "";
      const sourceValence = optionRead.values.sourceValence || "";
      const enteredStem = sourceStemIsTyped
        ? normalizeClassicalNahuatlVncSlotStem(sourceStem)
        : "";
      const normalizedClass = normalizeClassicalNahuatlVncSlotCarrier(verbClass).toUpperCase();
      const normalizedValence = normalizeClassicalNahuatlVncSlotCarrier(sourceValence);
      const sourceFinalShapeFrame = buildClassicalNahuatlStemFinalShapeFrame(enteredStem);
      const enteredLexicalIdentityKey = getClassicalNahuatlBoundaryFreeLexicalKey(enteredStem);
      const identity = CLASSICAL_NAHUATL_LESSON20_ACTIVE_STEM_IDENTITIES.find(candidate => candidate.allowedAllomorphs.some(allomorph => getClassicalNahuatlBoundaryFreeLexicalKey(allomorph) === enteredLexicalIdentityKey)) || null;
      const fixedLexicalSourceResolution =
        resolveClassicalNahuatlLesson20InventoryEntry(
          CLASSICAL_NAHUATL_LESSON20_FIXED_FORMATIONS,
          enteredStem
        );
      const fixedLexicalSourceAuthorized = Boolean(
        fixedLexicalSourceResolution.formations.length
      );
      const canonicalEnteredAllomorph = identity?.allowedAllomorphs.find(allomorph => getClassicalNahuatlBoundaryFreeLexicalKey(allomorph) === enteredLexicalIdentityKey) || enteredStem;
      const transitiveSource = isClassicalNahuatlTransitiveValence(normalizedValence);
      const requestedValenceMode = transitiveSource ? "transitive" : "intransitive";
      const classCompatible = !identity || !normalizedClass || identity.verbClasses.includes(normalizedClass);
      const valenceCompatible = !identity || !normalizedValence || identity.sourceValenceModes.includes(requestedValenceMode);
      const rootPlusYaAnalysisAuthorized = ["A", "B"].includes(normalizedClass) && sourceFinalShapeFrame.letterTail.two === "ya";
      const explicitRootPlusYaBoundary = rootPlusYaAnalysisAuthorized && sourceFinalShapeFrame.orthographicTail.three === "-ya";
      const hiddenIntervocalicY = Boolean(identity && /intervocalic-y/u.test(identity.allomorphy));
      const allomorphLicenseAuthorized = Boolean(
        identity
        && classCompatible
        && valenceCompatible
      );
      const exactNonactiveLicenseStatus = identity?.unresolvedAllomorphs?.[canonicalEnteredAllomorph]
        ? "documented-unresolved"
        : identity && !allomorphLicenseAuthorized
          ? "context-mismatch"
          : allomorphLicenseAuthorized || fixedLexicalSourceAuthorized
            ? "lexical-source-licensed"
            : "none";
      const finalTiLexicalAnalysis =
        CLASSICAL_NAHUATL_LESSON20_FINAL_TI_LEXICAL_ANALYSES[
          canonicalEnteredAllomorph
        ] || null;
      const morphemicSourceProfile =
        buildClassicalNahuatlMorphemicSourceProfile(
          sourceFinalShapeFrame,
          {
            sourceClass: normalizedClass,
            sourceValence: normalizedValence,
            hiddenIntervocalicY,
            finalTiLexicalAnalysis
          }
        );
      const authorized = Boolean(sourceStemIsTyped && enteredStem && optionRead.authorizationStatus === "authorized");
      const frame = Object.freeze({
        kind: "classical-nahuatl-nonactive-vnc-active-stem-identity-frame",
        version: 1,
        sourceAuthority: identity
          ? "Andrews active-stem identity and allomorph evidence"
          : fixedLexicalSourceAuthorized
            ? "Andrews nonactive lexical-source identity"
            : "active imperfective stem shape supplied to the engine",
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized
          ? ""
          : optionRead.blockReason || "lesson20-typed-active-source-stem-required",
        enteredStem,
        enteredAllomorph: enteredStem,
        canonicalEnteredAllomorph,
        boundaryFreeLexicalIdentityKey: enteredLexicalIdentityKey,
        canonicalImperfectiveStem: identity?.canonicalImperfectiveStem || enteredStem,
        lexicalIdentityId: identity?.identityId
          || (
            fixedLexicalSourceAuthorized
              ? `cn-nonactive-lexical-source:${fixedLexicalSourceResolution.inventorySourceStem}`
              : ""
          ),
        identityResolution: identity
          ? "licensed-active-identity"
          : fixedLexicalSourceAuthorized
            ? "licensed-nonactive-lexical-source"
            : "shape-only-unlisted-identity",
        identityRuleId: identity?.identityRuleId || "",
        allowedAllomorphs: Object.freeze([...(identity?.allowedAllomorphs || [enteredStem].filter(Boolean))]),
        allomorphy: identity?.allomorphy || "none-recorded",
        nonactiveBasePolicy: identity?.nonactiveBasePolicy || "",
        andrewsSections: Object.freeze([
          ...(
            identity?.andrewsSections
            || Array.from(new Set(
              fixedLexicalSourceResolution.formations
                .map(formation => formation.andrewsSection)
                .filter(Boolean)
            ))
          )
        ]),
        verbClass: normalizedClass,
        sourceValence: normalizedValence,
        classCompatible,
        valenceCompatible,
        allomorphLicenseAuthorized,
        exactNonactiveLicenseStatus,
        exactNonactiveFormationCount: 0,
        documentedUnresolvedReason: identity?.unresolvedAllomorphs?.[canonicalEnteredAllomorph] || "",
        sourceFinalShapeFrame,
        internalMorphology: Object.freeze({
          morphemes: sourceFinalShapeFrame.morphemes,
          hasExplicitBoundary: sourceFinalShapeFrame.hasMorphemeBoundary,
          explicitRootPlusYaBoundary,
          rootPlusYaAnalysisAuthorized,
          rootPlusYaBoundaryStatus: explicitRootPlusYaBoundary ? "explicit-boundary-observed" : rootPlusYaAnalysisAuthorized ? "boundary-free-final-ya-analysis" : "not-a-root-plus-ya-analysis",
          rootPlusYaBoundaryAuthority: false,
          hiddenIntervocalicY,
          finalTiLexicalAnalysis,
          morphemicSourceProfile,
          finalVowelAllomorph: identity && /final-a-e/u.test(identity.allomorphy) ? sourceFinalShapeFrame.finalLetter : ""
        }),
        exactNonactiveFormations: Object.freeze([]),
        storedTargetFormationAuthority: false,
        callerSuppliedIdentityAllowed: false
      });
      CLASSICAL_NAHUATL_ISSUED_NONACTIVE_SOURCE_IDENTITIES.add(frame);
      return frame;
    }
    function isClassicalNahuatlActiveStemIdentityFrame(frame = null, sourceStem = "") {
      const normalizedSourceStem = typeof sourceStem === "string"
        ? normalizeClassicalNahuatlVncSlotStem(sourceStem)
        : "";
      return Boolean(
        frame
        && CLASSICAL_NAHUATL_ISSUED_NONACTIVE_SOURCE_IDENTITIES.has(frame)
        && frame.kind === "classical-nahuatl-nonactive-vnc-active-stem-identity-frame"
        && frame.version === 1
        && frame.authorizationStatus === "authorized"
        && frame.enteredStem === normalizedSourceStem
        && frame.sourceFinalShapeFrame?.stem === normalizedSourceStem
        && frame.storedTargetFormationAuthority === false
        && frame.callerSuppliedIdentityAllowed === false
      );
    }
    function replaceClassicalNahuatlLesson20FinalShape(shapeFrame = null, ending = "", replacement = "") {
      const normalizedEnding = normalizeClassicalNahuatlVncSlotStem(ending);
      const sourceUnits = Array.from(shapeFrame?.stem || "");
      const endingUnits = Array.from(normalizedEnding);
      if (!shapeFrame || shapeFrame.authorizationStatus !== "authorized" || !endingUnits.length) {
        return "";
      }
      const currentEnding = sourceUnits.slice(-endingUnits.length).join("");
      if (currentEnding !== normalizedEnding) {
        return "";
      }
      let retainedSource = sourceUnits.slice(0, -endingUnits.length).join("");
      let realizedReplacement = normalizeClassicalNahuatlVncSlotStem(replacement);
      // If a user happens to expose the boundary immediately before the
      // replaced ending, do not let that observation create a dangling or
      // doubled boundary in the engine-generated target.
      if (retainedSource.endsWith("-") && realizedReplacement.startsWith("-")) {
        realizedReplacement = realizedReplacement.slice(1);
      } else if (retainedSource.endsWith("-") && !realizedReplacement) {
        retainedSource = retainedSource.slice(0, -1);
      }
      return `${retainedSource}${realizedReplacement}`;
    }
    function buildClassicalNahuatlNonactiveFinalShapeRelation(sourceStem = "", nonactiveStem = "", {
      suffixFamily = "",
      ruleId = ""
    } = {}) {
      const sourceFinalShapeFrame = buildClassicalNahuatlStemFinalShapeFrame(sourceStem);
      const nonactiveFinalShapeFrame = buildClassicalNahuatlStemFinalShapeFrame(nonactiveStem);
      const sourceUnits = Array.from(sourceFinalShapeFrame.stem);
      const targetUnits = Array.from(nonactiveFinalShapeFrame.stem);
      let commonUnitCount = 0;
      while (commonUnitCount < sourceUnits.length && commonUnitCount < targetUnits.length && sourceUnits[commonUnitCount] === targetUnits[commonUnitCount]) {
        commonUnitCount += 1;
      }
      const retainedStem = sourceUnits.slice(0, commonUnitCount).join("");
      const removedFinalShape = sourceUnits.slice(commonUnitCount).join("");
      const addedFinalShape = targetUnits.slice(commonUnitCount).join("");
      const authorized = Boolean(sourceFinalShapeFrame.authorizationStatus === "authorized" && nonactiveFinalShapeFrame.authorizationStatus === "authorized" && sourceFinalShapeFrame.stem !== nonactiveFinalShapeFrame.stem && normalizeClassicalNahuatlVncSlotCarrier(suffixFamily) && normalizeClassicalNahuatlVncSlotCarrier(ruleId));
      return Object.freeze({
        kind: "classical-nahuatl-nonactive-vnc-nonactive-final-shape-relation",
        version: 1,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized ? "" : "lesson20-complete-source-target-final-shape-relation-required",
        sourceFinalShapeFrame,
        nonactiveFinalShapeFrame,
        suffixFamily: normalizeClassicalNahuatlVncSlotCarrier(suffixFamily),
        ruleId: normalizeClassicalNahuatlVncSlotCarrier(ruleId),
        retainedStem,
        removedFinalShape,
        addedFinalShape,
        replacementShape: `${removedFinalShape || "∅"} > ${addedFinalShape || "∅"}`,
        macronChange: sourceFinalShapeFrame.letterTail.three !== nonactiveFinalShapeFrame.letterTail.three && (sourceFinalShapeFrame.finalThreeContainsMacron || nonactiveFinalShapeFrame.finalThreeContainsMacron),
        boundaryChange: sourceFinalShapeFrame.hasMorphemeBoundary !== nonactiveFinalShapeFrame.hasMorphemeBoundary || removedFinalShape.includes("-") || addedFinalShape.includes("-"),
        shapeAuthority: "computed-from-generated-source-and-target-stems",
        callerSuppliedShapeAllowed: false
      });
    }
    function getClassicalNahuatlNonactiveFormationStructure(suffixFamily = "", nonactiveFinalShapeFrame = null) {
      const surfaceFamily = normalizeClassicalNahuatlVncSlotCarrier(suffixFamily);
      const specification = CLASSICAL_NAHUATL_NONACTIVE_FORMATION_STRUCTURES[surfaceFamily] || null;
      if (!specification) {
        return Object.freeze({
          kind: "classical-nahuatl-nonactive-vnc-nonactive-formation-structure",
          version: 1,
          authorizationStatus: "blocked",
          blockReason: "lesson20-unknown-nonactive-formation-family",
          surfaceFamily,
          formationCore: "",
          continuation: "",
          sequence: Object.freeze([]),
          surfaceAllomorph: ""
        });
      }
      const targetShape = nonactiveFinalShapeFrame?.authorizationStatus === "authorized" ? nonactiveFinalShapeFrame : null;
      const finalMorpheme = targetShape?.morphemeTail?.one || "";
      const familyMorphemes = finalMorpheme === "tz" ? (targetShape?.morphemes || []).slice(-3, -1) : (targetShape?.morphemes || []).slice(-2);
      const extendedCoreSurface = familyMorphemes[0] || "";
      const surfaceAllomorph = surfaceFamily === "o-hua" && /ō$/u.test(extendedCoreSurface) ? "ō-hua" : surfaceFamily;
      return Object.freeze({
        kind: "classical-nahuatl-nonactive-vnc-nonactive-formation-structure",
        version: 1,
        sourceAuthority: "Andrews Lesson 20 three-core nonactive system",
        authorizationStatus: "authorized",
        blockReason: "",
        surfaceFamily,
        formationCore: specification.formationCore,
        continuation: specification.continuation,
        sequence: specification.sequence,
        isExtended: specification.continuation !== "terminal",
        surfaceAllomorph,
        terminalCore: specification.sequence[specification.sequence.length - 1],
        familyIsSurfaceRealizationNotIndependentCore: true
      });
    }
    function doesClassicalNahuatlLesson20FinalShapeMatchSuffixFamily(shapeFrame = null, suffixFamily = "") {
      if (!shapeFrame || shapeFrame.authorizationStatus !== "authorized") {
        return false;
      }
      const formationStructure = getClassicalNahuatlNonactiveFormationStructure(suffixFamily, shapeFrame);
      if (formationStructure.authorizationStatus !== "authorized") {
        return false;
      }
      const formationCore = formationStructure.formationCore;
      const continuation = formationStructure.continuation;
      const finalMorpheme = shapeFrame.morphemeTail.one;
      const finalTwoMorphemes = shapeFrame.morphemeTail.two;
      if (formationCore === "lo" && continuation === "terminal") {
        return finalMorpheme === "lō" || shapeFrame.letterTail.two === "lō";
      }
      if (formationCore === "o" && continuation === "terminal") {
        return shapeFrame.finalLetter === (suffixFamily === "o" ? "o" : "ō");
      }
      if (formationCore === "hua" && continuation === "terminal") {
        return shapeFrame.letterTail.three === "hua";
      }
      if (formationCore === "o" && continuation === "hua") {
        const familyMorphemes = finalMorpheme === "tz" ? shapeFrame.morphemes.slice(-3, -1) : shapeFrame.morphemes.slice(-2);
        const familyOnset = familyMorphemes[0] || "";
        return familyMorphemes[1] === "hua" && /[oō]$/u.test(familyOnset);
      }
      if (formationCore === "lo" && continuation === "hua") {
        const familyMorphemes = finalMorpheme === "tz" ? shapeFrame.morphemes.slice(-3, -1) : shapeFrame.morphemes.slice(-2);
        return familyMorphemes[1] === "hua" && /lo$/u.test(familyMorphemes[0] || "");
      }
      if (formationCore === "hua" && continuation === "lo") {
        return finalTwoMorphemes === "hua-lō";
      }
      return false;
    }

    // These are Canvas observations, not an authorization inventory. Andrews
    // §20.2 lengthens Class C base-final i productively. Its exceptional
    // short-vowel examples do not make a long antepenult a sufficient condition:
    // §43.3 nequēntīlo explicitly contrasts with that generalization.
    const CLASSICAL_NAHUATL_LESSON20_CLASS_C_FINAL_I_LENGTH_CLASSES = Object.freeze({
      "ce-liā": "lengthen-final-i",
      "ihcuani-ā": "lengthen-final-i",
      "cui-tiā": "lengthen-final-i",
      "nōtza-l-tiā": "lengthen-final-i",
      "chihua-l-tiā": "lengthen-final-i",
      "chīhua-l-tiā": "lengthen-final-i",
      "tequi-ti-ā": "lengthen-final-i",
      "tla-ti-ā": "lengthen-final-i",
      "icn-ēl-iā": "preserve-short-final-i",
      "tlā-ti-ā": "preserve-short-final-i"
    });
    // §20.2's printed image gives burn tla-ti-ā → tla-tī-lō.
    // Its internal causative structure does not license a short-i exception.
    const CLASSICAL_NAHUATL_LESSON20_CLASS_C_FINAL_I_LEXICAL_ANALYSES =
      Object.freeze({
        "icn-ēl-iā": Object.freeze({
          analysisId: "lesson20-explicit-short-i-nonactive-exception",
          lengthClass: "preserve-short-final-i"
        }),
        "tlā-ti-ā": Object.freeze({
          analysisId: "lesson20-explicit-short-i-nonactive-exception",
          lengthClass: "preserve-short-final-i"
        }),
        "tlāuh-ti-ā": Object.freeze({
          analysisId: "lesson38-explicit-short-i-nonactive-variant",
          lengthClass: "preserve-short-final-i"
        }),
        // §54.5.2 supplies this lexical causative Source; §40.7 prints its
        // short-i nonactive under §20.2's exceptional environment. This does
        // not license shortening every Source with a long antepenultimate.
        "teō-ti-ā": Object.freeze({
          analysisId: "lesson40-documented-deific-short-i-nonactive-exception",
          lengthClass: "preserve-short-final-i"
        }),
        // §40.8/Original414 supplies this long-ē lexical causative and its
        // short-i nonactive. Historical cehuiā is a distinct Source; this
        // does not make antepenultimate length a productive shortening rule.
        "cē-hui-ā": Object.freeze({
          analysisId: "lesson40-documented-chilled-short-i-nonactive-exception",
          lengthClass: "preserve-short-final-i"
        })
      });

    // Retained only as a compatibility/evidence export. Route authorization
    // reads the typed lexical analysis below, not membership in this list.
    const CLASSICAL_NAHUATL_LESSON20_POSTVOCALIC_TI_CHO_EXCLUSIONS = Object.freeze(["tequi-ti"]);
    // Andrews §54.4 explicitly analyzes tequi-ti as a denominal ti-of-
    // possession stem built from tequi-tl. Its final ti therefore is not the
    // ordinary postvocalic-ti input to the §20.4 ch-ō possibility. Exact
    // identity is legitimate here because Canvas makes the internal analysis
    // lexical; an unlisted stem of the same sound shape remains productive.
    const CLASSICAL_NAHUATL_LESSON20_FINAL_TI_LEXICAL_ANALYSES = Object.freeze({
      "tequi-ti": Object.freeze({
        analysisId: "denominal-ti-of-possession-from-tequi-tl",
        finalTiRole: "denominal-possession-formative",
        postvocalicTiChoRouteStatus: "blocked",
        huaRouteStatus: "authorized"
      })
    });
    // These nonactive-looking intermediates are licensed only inside the
    // type-two causative operation. Generic final-a shape cannot promote them
    // to independent nonactive choices.
    const CLASSICAL_NAHUATL_INDEPENDENT_NONACTIVE_RESTRICTIONS =
      Object.freeze([Object.freeze({
        sourceStem: "ix-tlā-hu-a",
        sourceClass: "B",
        sourceValenceMode: "transitive",
        blockedNonactiveStems: Object.freeze(["ix-tlā-hu-a-lō"])
      }), Object.freeze({
        sourceStem: "āhui-ya",
        sourceClass: "A",
        sourceValenceMode: "intransitive",
        blockedNonactiveStems: Object.freeze(["āhui-ya-lō"])
      })]);
    function isClassicalNahuatlIndependentNonactiveCandidateLicensed({
      sourceStem = "",
      sourceClass = "",
      sourceValence = "",
      nonactiveStem = ""
    } = {}) {
      const sourceLexicalKey =
        getClassicalNahuatlBoundaryFreeLexicalKey(sourceStem);
      const transitiveSource =
        isClassicalNahuatlTransitiveValence(sourceValence);
      const sourceValenceMode = transitiveSource
        ? "transitive"
        : "intransitive";
      const restriction =
        CLASSICAL_NAHUATL_INDEPENDENT_NONACTIVE_RESTRICTIONS.find(
          candidate => (
            getClassicalNahuatlBoundaryFreeLexicalKey(
              candidate.sourceStem
            ) === sourceLexicalKey
            && candidate.sourceClass === sourceClass
            && candidate.sourceValenceMode === sourceValenceMode
          )
        ) || null;
      return !restriction?.blockedNonactiveStems.includes(
        normalizeClassicalNahuatlVncSlotStem(nonactiveStem)
      );
    }
    function buildClassicalNahuatlClassCFinalIVowelLengthRuleFrame(sourceStem = "") {
      const sourceFinalShapeFrame = buildClassicalNahuatlStemFinalShapeFrame(sourceStem);
      const normalizedSourceStem = sourceFinalShapeFrame.stem;
      const sourceEnding = sourceFinalShapeFrame.orthographicTail.three === "i-ā" ? "i-ā" : sourceFinalShapeFrame.letterTail.two === "iā" ? "iā" : "";
      const sourceVowelNuclei = normalizedSourceStem.match(/[aāeēiīoō]/gu) || [];
      const antepenultimateVowel = sourceVowelNuclei.at(-3) || "";
      const antepenultimateVowelIsLong = /^[āēīō]$/u.test(antepenultimateVowel);
      const lexicalAnalysis =
        CLASSICAL_NAHUATL_LESSON20_CLASS_C_FINAL_I_LEXICAL_ANALYSES[
          normalizedSourceStem
        ] || Object.entries(CLASSICAL_NAHUATL_LESSON20_CLASS_C_FINAL_I_LEXICAL_ANALYSES)
          .find(([stem]) => getClassicalNahuatlBoundaryFreeLexicalKey(stem)
            === getClassicalNahuatlBoundaryFreeLexicalKey(normalizedSourceStem))?.[1] || null;
      const lengthClass = lexicalAnalysis?.lengthClass || "lengthen-final-i";
      const realizedBaseFinalVowel = lengthClass === "lengthen-final-i" ? "ī" : "i";
      const authorized = Boolean(normalizedSourceStem && sourceEnding);
      return Object.freeze({
        kind: "classical-nahuatl-nonactive-vnc-class-c-final-i-vowel-length-rule-frame",
        version: 1,
        sourceAuthority: "Andrews §20.2 productive Class C final-i rule and typed Source environment; §§54.5.1.a and 55.2 lexical analysis where applicable",
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized ? "" : "lesson20-class-c-final-i-a-shape-required",
        sourceStem: normalizedSourceStem,
        sourceEnding,
        sourceVowelNuclei: Object.freeze([...sourceVowelNuclei]),
        antepenultimateVowel,
        antepenultimateVowelIsLong,
        lexicalAnalysis,
        sourceLengthBasis: lexicalAnalysis
          ? "typed-lexical-internal-structure"
          : "productive-final-i-lengthening",
        sourceLengthClass: lengthClass,
        operation: lengthClass === "lengthen-final-i" ? "replace-final-i-plus-a-with-long-i-plus-lo" : "replace-final-i-plus-a-with-short-i-plus-lo",
        realizedBaseFinalVowel,
        realizedEnding: `${realizedBaseFinalVowel}-lō`,
        ruleId: lengthClass === "lengthen-final-i" ? "cn-l20-2-class-c-final-i-lengthening" : "cn-l20-2-class-c-final-i-short",
        directSurfaceStringAuthority: false
      });
    }
    function buildClassicalNahuatlFinalIOHuaVowelLengthRuleFrame(sourceStem = "") {
      const sourceFinalShapeFrame = buildClassicalNahuatlStemFinalShapeFrame(sourceStem);
      const sourceFinalVowel = sourceFinalShapeFrame.finalLetter;
      const authorized = ["i", "ī", "o", "ō"].includes(sourceFinalVowel);
      const lengthensShortI = sourceFinalVowel === "i";
      return Object.freeze({
        kind: "classical-nahuatl-nonactive-vnc-final-i-o-hua-vowel-length-rule-frame",
        version: 1,
        sourceAuthority: "Andrews §20.6 visually verified final-i/o + hua rule",
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized ? "" : "lesson20-final-i-o-shape-required",
        sourceStem: sourceFinalShapeFrame.stem,
        sourceFinalVowel,
        operation: lengthensShortI ? "lengthen-short-final-i-before-hua" : "preserve-source-final-vowel-before-hua",
        realizedFinalVowel: lengthensShortI ? "ī" : sourceFinalVowel,
        ruleId: lengthensShortI ? "cn-l20-6-short-final-i-lengthening-before-hua" : "cn-l20-6-preserve-final-long-i-or-o-before-hua",
        directSurfaceStringAuthority: false
      });
    }
    function buildClassicalNahuatlProductiveCandidateSet(sourceStem = "", rawOptions = {}) {
      const optionRead = readClassicalNahuatlNonactiveDataOptions(rawOptions, [
        "verbClass",
        "sourceValence"
      ]);
      const verbClass = optionRead.values.verbClass || "";
      const sourceValence = optionRead.values.sourceValence || "";
      const sourceIdentityFrame = buildClassicalNahuatlActiveStemIdentityFrame(
        typeof sourceStem === "string" ? sourceStem : "",
        optionRead.values
      );
      const sourceFinalShapeFrame = sourceIdentityFrame.sourceFinalShapeFrame;
      const morphemicSourceProfile =
        sourceIdentityFrame.internalMorphology?.morphemicSourceProfile || null;
      const sourceShapeAgreement = Boolean(
        morphemicSourceProfile?.authorizationStatus === "authorized"
        && morphemicSourceProfile.sourceStem === sourceFinalShapeFrame.stem
        && morphemicSourceProfile.sourceClass
          === normalizeClassicalNahuatlVncSlotCarrier(verbClass).toUpperCase()
        && morphemicSourceProfile.sourceValence
          === normalizeClassicalNahuatlVncSlotCarrier(sourceValence)
      );
      if (!sourceShapeAgreement) {
        return Object.freeze({
          sourceIdentityFrame,
          sourceFinalShapeFrame,
          morphemicSourceProfile,
          sourceShapeAgreement: false,
          options: Object.freeze([]),
          resolvedOptions: Object.freeze([]),
          routeEvaluations: Object.freeze([]),
          authorizationStatus: "blocked",
          blockReason: "typed-morphemic-source-profile-disagrees-with-source",
          formulaArtifactAuthority: false,
          surfaceArtifactAuthority: false
        });
      }
      const normalizedSourceStem = morphemicSourceProfile.sourceStem;
      const normalizedClass = normalizeClassicalNahuatlVncSlotCarrier(verbClass).toUpperCase();
      const normalizedValence = normalizeClassicalNahuatlVncSlotCarrier(sourceValence);
      const finalLetters = morphemicSourceProfile.edgeStructure.letterTail;
      const finalOrthography = morphemicSourceProfile.edgeStructure.orthographicTail;
      const transitiveSource = isClassicalNahuatlTransitiveValence(normalizedValence);
      const orderedVoiceLayerIntermediate = isClassicalNahuatlOrderedVoiceLayerIntermediateStem(normalizedSourceStem);
      const routeEvaluations = [];
      const ruleRelationships = Object.freeze({
        "licensed-final-e-allomorph": Object.freeze({ effect: "add", replaces: Object.freeze([]) }),
        "class-b-root-plus-ya": Object.freeze({ effect: "replace", replaces: Object.freeze(["general-final-a"]) }),
        "transitive-final-cui": Object.freeze({ effect: "replace", replaces: Object.freeze(["general-final-i-o"]) }),
        "transitive-final-ta": Object.freeze({ effect: "replace", replaces: Object.freeze(["general-final-a"]) }),
        "transitive-postvocalic-ti": Object.freeze({ effect: "replace", replaces: Object.freeze(["general-final-i-o"]) }),
        "transitive-final-ka": Object.freeze({ effect: "replace", replaces: Object.freeze(["general-final-a"]) }),
        "transitive-final-na": Object.freeze({ effect: "replace", replaces: Object.freeze(["general-final-a"]) }),
        "transitive-final-sa": Object.freeze({ effect: "replace", replaces: Object.freeze(["general-final-a"]) }),
        "transitive-final-qui": Object.freeze({ effect: "replace", replaces: Object.freeze(["general-final-i-o"]) }),
        "transitive-final-ni": Object.freeze({ effect: "replace", replaces: Object.freeze(["general-final-i-o"]) }),
        "transitive-final-si": Object.freeze({ effect: "replace", replaces: Object.freeze(["general-final-i-o"]) }),
        "class-c-final-o-a": Object.freeze({ effect: "replace", replaces: Object.freeze(["general-final-a"]) }),
        "class-c-final-ia": Object.freeze({ effect: "replace", replaces: Object.freeze(["general-final-a"]) }),
        "class-d-reduced-long-a": Object.freeze({ effect: "replace", replaces: Object.freeze(["general-final-a"]) }),
        "intransitive-final-ka": Object.freeze({ effect: "replace", replaces: Object.freeze(["general-final-a"]) }),
        "intransitive-final-qui": Object.freeze({ effect: "replace", replaces: Object.freeze(["general-final-i-o"]) }),
        "intransitive-final-mi": Object.freeze({ effect: "replace", replaces: Object.freeze(["general-final-i-o"]) }),
        "intransitive-final-tza": Object.freeze({ effect: "replace", replaces: Object.freeze(["general-final-a"]) }),
        "intransitive-final-sa": Object.freeze({ effect: "replace", replaces: Object.freeze(["general-final-a"]) }),
        "intransitive-final-tzi": Object.freeze({ effect: "replace", replaces: Object.freeze(["intransitive-final-si", "general-final-i-o"]) }),
        "intransitive-final-si": Object.freeze({ effect: "replace", replaces: Object.freeze(["general-final-i-o"]) }),
        "intransitive-final-w": Object.freeze({ effect: "add", replaces: Object.freeze([]) }),
        "intransitive-postvocalic-ti": Object.freeze({ effect: "replace", replaces: Object.freeze(["general-final-i-o"]) }),
        "intransitive-final-ni": Object.freeze({ effect: "replace", replaces: Object.freeze(["general-final-i-o"]) }),
        "projective-final-a-hua": Object.freeze({ effect: "add", replaces: Object.freeze([]) }),
        "general-final-a": Object.freeze({ effect: "add", replaces: Object.freeze([]) }),
        "general-final-i-o": Object.freeze({ effect: "add", replaces: Object.freeze([]) })
      });
      const addRoute = (applies, decisionCategory, priority, options = [], relationshipOverride = null) => {
        if (!applies || orderedVoiceLayerIntermediate) {
          return;
        }
        const candidates = options
          .filter(option => (
            option?.nonactiveStem
            && option?.suffixFamily
            && option?.ruleId
            && isClassicalNahuatlIndependentNonactiveCandidateLicensed({
              sourceStem: normalizedSourceStem,
              sourceClass: normalizedClass,
              sourceValence: normalizedValence,
              nonactiveStem: option.nonactiveStem
            })
          ))
          .map(option => ({
            ...option,
            candidateSource: "productive-final-shape",
            productiveSourceAuthority: "typed-morphemic-source-profile",
            morphemicSourceProfile,
            decisionCategory,
            candidatePriority: priority
          }));
        if (candidates.length) {
          const relationship = relationshipOverride || ruleRelationships[decisionCategory]
            || (decisionCategory.startsWith("causative-prerequisite-")
              ? Object.freeze({ effect: "compose", replaces: Object.freeze([]) })
              : Object.freeze({ effect: "add", replaces: Object.freeze([]) }));
          routeEvaluations.push({
            decisionCategory,
            priority,
            relationship,
            candidates
          });
        }
      };
      const licensedFinalEAllomorph = Boolean(
        isClassicalNahuatlActiveStemIdentityFrame(
          sourceIdentityFrame,
          normalizedSourceStem
        )
        && sourceIdentityFrame.allomorphLicenseAuthorized
        && sourceIdentityFrame.nonactiveBasePolicy
          === "licensed-active-allomorph-is-imperfective-base"
        && sourceIdentityFrame.canonicalEnteredAllomorph === normalizedSourceStem
        && ["e", "ē"].includes(sourceFinalShapeFrame.finalLetter)
        && normalizedClass === "B"
        && transitiveSource
      );
      addRoute(licensedFinalEAllomorph, "licensed-final-e-allomorph", 610, [{
        nonactiveStem: `${normalizedSourceStem}-lō`,
        suffixFamily: "lō",
        ruleId: "cn-nonactive-class-b-licensed-final-e-allomorph",
        formationAuthority: "productive-lexical-class-rule",
        lexicalSourceIdentityFrame: sourceIdentityFrame
      }]);
      // Letter-tail ya alone does not establish a detachable formative:
      // §20.2 contrasts whole tla-chīya with segmented coco-ya/yōco-ya.
      const classBRootPlusYaAnalysis = Boolean(normalizedSourceStem && normalizedClass === "B" && finalOrthography.three === "-ya");
      const rootPlusYaSourceEnding = finalOrthography.three === "-ya" ? "-ya" : "ya";
      addRoute(classBRootPlusYaAnalysis, "class-b-root-plus-ya", 600, [{
        nonactiveStem: `${replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, rootPlusYaSourceEnding, "")}-lō`,
        suffixFamily: "lō",
        ruleId: "cn-l20-2-class-b-root-plus-ya-deletion",
        formationAuthority: "productive-rule",
        vowelLengthRuleFrame: Object.freeze({
          kind: "classical-nahuatl-nonactive-vnc-root-vowel-preservation-rule-frame",
          authorizationStatus: "authorized",
          operation: "delete-final-ya-and-preserve-root-vowel-length",
          sourceStem: normalizedSourceStem,
          explicitBoundaryObserved: finalOrthography.three === "-ya",
          boundaryObservationAuthority: false,
          ruleId: "cn-l20-2-class-b-preserve-root-vowel-length",
          directSurfaceStringAuthority: false
        })
      }]);
      if (normalizedSourceStem && transitiveSource) {
        addRoute(finalLetters.three === "cui", "transitive-final-cui", 520, [{
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, "cui", "c-ō"),
          suffixFamily: "ō",
          ruleId: "cn-l20-4-final-cui",
          formationAuthority: "productive-rule"
        }]);
        addRoute(finalLetters.two === "ta", "transitive-final-ta", 510, [{
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, "a", "-ō"),
          suffixFamily: "ō",
          ruleId: "cn-l20-4-final-ta",
          formationAuthority: "productive-rule"
        }]);
        addRoute(/^[aeioāēīō]ti$/u.test(finalLetters.three), "transitive-postvocalic-ti", 500, [{
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, "ti", "ch-ō"),
          suffixFamily: "ō",
          ruleId: "cn-l20-4-postvocalic-ti",
          formationAuthority: "productive-rule"
        }]);
        addRoute(["ca", "ka", "cā", "kā"].includes(finalLetters.two), "transitive-final-ka", 490, [{
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, sourceFinalShapeFrame.finalLetter, "-ō"),
          suffixFamily: "ō",
          ruleId: "cn-l20-4-final-ka",
          formationAuthority: "productive-rule"
        }]);
        addRoute(finalLetters.two === "na", "transitive-final-na", 480, [{
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, "a", "-ō"),
          suffixFamily: "ō",
          ruleId: "cn-l20-4-final-na",
          formationAuthority: "productive-rule"
        }, {
          nonactiveStem: `${normalizedSourceStem}-lō`,
          suffixFamily: "lō",
          ruleId: "cn-l20-4-final-na-lo-variant",
          formationAuthority: "optional-variant"
        }]);
        addRoute(["za", "sa"].includes(finalLetters.two), "transitive-final-sa", 480, [{
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, finalLetters.two, "x-ō"),
          suffixFamily: "ō",
          ruleId: "cn-l20-4-final-sa",
          formationAuthority: "productive-rule"
        }, {
          nonactiveStem: `${normalizedSourceStem}-lō`,
          suffixFamily: "lō",
          ruleId: "cn-l20-4-final-sa-lo-variant",
          formationAuthority: "optional-variant"
        }]);
        const transitiveQuiEnding = finalLetters.three === "qui" ? "qui" : finalLetters.two === "ki" ? "ki" : "";
        addRoute(Boolean(transitiveQuiEnding), "transitive-final-qui", 480, [{
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, transitiveQuiEnding, transitiveQuiEnding === "qui" ? "c-ō" : "k-ō"),
          suffixFamily: "ō",
          ruleId: "cn-l20-4-final-qui",
          formationAuthority: "productive-rule"
        }]);
        addRoute(finalLetters.two === "ni", "transitive-final-ni", 480, [{
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, "i", "-ō"),
          suffixFamily: "ō",
          ruleId: "cn-l20-4-final-ni",
          formationAuthority: "productive-rule"
        }, {
          nonactiveStem: `${normalizedSourceStem}-lō`,
          suffixFamily: "lō",
          ruleId: "cn-l20-4-final-ni-lo-variant",
          formationAuthority: "optional-variant"
        }]);
        addRoute(["ci", "zi", "si"].includes(finalLetters.two), "transitive-final-si", 480, [{
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, finalLetters.two, "x-ō"),
          suffixFamily: "ō",
          ruleId: "cn-l20-4-final-si",
          formationAuthority: "productive-rule"
        }]);
      }
      if (normalizedSourceStem && normalizedClass === "C") {
        addRoute(finalOrthography.three === "o-ā", "class-c-final-o-a", 450, [{
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, "o-ā", "ō-lō"),
          suffixFamily: "lō",
          ruleId: "cn-l20-2-class-c-o-a",
          formationAuthority: "productive-rule"
        }]);
        const classCFinalIa = finalOrthography.three === "i-ā" || finalLetters.two === "iā";
        const classCVowelLengthRuleFrame = buildClassicalNahuatlClassCFinalIVowelLengthRuleFrame(normalizedSourceStem);
        addRoute(classCFinalIa, "class-c-final-ia", 450, [{
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, classCVowelLengthRuleFrame.sourceEnding, classCVowelLengthRuleFrame.realizedEnding),
          suffixFamily: "lō",
          ruleId: classCVowelLengthRuleFrame.ruleId,
          formationAuthority: "productive-rule",
          vowelLengthRuleFrame: classCVowelLengthRuleFrame
        }]);
      }
      addRoute(normalizedSourceStem && normalizedClass === "D" && sourceFinalShapeFrame.finalLetter === "ā", "class-d-reduced-long-a", 450, [{
        nonactiveStem: `${replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, "ā", "a")}-lō`,
        suffixFamily: "lō",
        ruleId: "cn-l20-2-class-d-reduced-long-before-lo",
        formationAuthority: "productive-rule"
      }]);
      if (normalizedSourceStem && !transitiveSource) {
        addRoute(normalizedClass === "A" && Boolean(getFrequentativeDestockalConstitution(normalizedSourceStem)), "frequentative-destockal-ca", 410, [{
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, "a", "-ō"),
          suffixFamily: "ō", ruleId: "cn-l27-4-frequentative-destockal-ca-co",
          formationAuthority: "productive-rule", andrewsSection: "27.4.1",
        }]);
        addRoute(["ca", "ka"].includes(finalLetters.two), "intransitive-final-ka", 400, [{
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, "a", "-o-hua"),
          suffixFamily: "o-hua",
          ruleId: "cn-l20-5-intransitive-final-ca",
          formationAuthority: "productive-rule"
        }]);
        const intransitiveQuiEnding = finalLetters.three === "qui" ? "qui" : finalLetters.two === "ki" ? "ki" : "";
        addRoute(Boolean(intransitiveQuiEnding), "intransitive-final-qui", 400, [{
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, intransitiveQuiEnding, intransitiveQuiEnding === "qui" ? "c-o-hua" : "k-o-hua"),
          suffixFamily: "o-hua",
          ruleId: "cn-l20-5-intransitive-final-qui",
          formationAuthority: "productive-rule"
        }]);
        addRoute(finalLetters.two === "mi", "intransitive-final-mi", 400, [{
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, "mi", "m-o-hua"),
          suffixFamily: "o-hua",
          ruleId: "cn-l20-5-intransitive-final-mi",
          formationAuthority: "productive-rule"
        }]);
        addRoute(finalLetters.three === "tza", "intransitive-final-tza", 410, [{
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, "a", "-o-hua"),
          suffixFamily: "o-hua",
          ruleId: "cn-l20-5-intransitive-final-tza",
          formationAuthority: "productive-rule"
        }]);
        addRoute(["za", "sa"].includes(finalLetters.two) && finalLetters.three !== "tza", "intransitive-final-sa", 400, [{
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, finalLetters.two, "x-o-hua"),
          suffixFamily: "o-hua",
          ruleId: "cn-l20-5-intransitive-final-za",
          formationAuthority: "productive-rule"
        }]);
        addRoute(finalLetters.three === "tzi", "intransitive-final-tzi", 410, [{
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, "tzi", "ch-o-hua"),
          suffixFamily: "o-hua",
          ruleId: "cn-l20-5-intransitive-final-tzi",
          formationAuthority: "productive-rule"
        }]);
        addRoute(["ci", "zi", "si"].includes(finalLetters.two), "intransitive-final-si", 400, [{
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, finalLetters.two, "x-o-hua"),
          suffixFamily: "o-hua",
          ruleId: "cn-l20-5-intransitive-final-ci",
          formationAuthority: "productive-rule"
        }]);
        const intransitiveWEnding = ["hua", "hui"].includes(finalLetters.three) ? finalLetters.three : ["wa", "wi"].includes(finalLetters.two) ? finalLetters.two : "";
        const finalWReplacementWouldCreateAdjacentO = Boolean(intransitiveWEnding && /[oō]-?(?:hua|hui)$/u.test(normalizedSourceStem));
        addRoute(Boolean(intransitiveWEnding) && !finalWReplacementWouldCreateAdjacentO, "intransitive-final-w", 400, [{
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, intransitiveWEnding, "ō-hua"),
          suffixFamily: "o-hua",
          ruleId: "cn-l20-5-intransitive-final-w",
          formationAuthority: "productive-rule"
        }], ["hui", "wi"].includes(intransitiveWEnding)
          ? Object.freeze({ effect: "add", replaces: Object.freeze([]) })
          : Object.freeze({ effect: "replace", replaces: Object.freeze(["general-final-a"]) }));
        const finalTiLexicalAnalysis =
          sourceIdentityFrame.internalMorphology.finalTiLexicalAnalysis;
        const intransitivePostvocalicTi = /^[aeioāēīō]ti$/u.test(finalLetters.three)
          && finalTiLexicalAnalysis?.postvocalicTiChoRouteStatus !== "blocked";
        addRoute(intransitivePostvocalicTi, "intransitive-postvocalic-ti", 420, [{
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, "i", "ī-hua"),
          suffixFamily: "hua",
          ruleId: "cn-l20-6-intransitive-postvocalic-ti-hua",
          formationAuthority: "productive-rule"
        }, {
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, "ti", "ch-ō"),
          suffixFamily: "ō",
          ruleId: "cn-l20-4-intransitive-postvocalic-ti-cho-possibility",
          formationAuthority: "shape-licensed-possibility",
          userSelectable: true
        }]);
        addRoute(finalLetters.two === "ni", "intransitive-final-ni", 400, [{
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, "i", "ī-hua"),
          suffixFamily: "hua",
          ruleId: "cn-l20-6-intransitive-final-ni-hua",
          formationAuthority: "productive-rule"
        }, {
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, "ni", "n-o-hua"),
          suffixFamily: "o-hua",
          ruleId: "cn-l20-5-intransitive-final-ni-ohua-possibility",
          formationAuthority: "shape-licensed-possibility",
          userSelectable: true
        }]);
      }
      addRoute(
        normalizedSourceStem
          && ["projective-nonhuman", "specific-projective"].includes(normalizedValence)
          && sourceFinalShapeFrame.finalLetter === "a",
        "projective-final-a-hua",
        200,
        [{
          nonactiveStem: replaceClassicalNahuatlLesson20FinalShape(
            sourceFinalShapeFrame,
            finalLetters.two === "ca" ? "ca" : "a",
            finalLetters.two === "ca" ? "quī-hua" : "ī-hua"
          ),
          suffixFamily: "hua",
          ruleId: "cn-l38-1-3c-projective-final-a-hua",
          formationAuthority: "productive-rule",
          vowelLengthRuleFrame: Object.freeze({
            kind:
              "classical-nahuatl-projective-final-a-hua-vowel-rule-frame",
            version: 1,
            authorizationStatus: "authorized",
            sourceAuthority:
              "Andrews §§38.1.3.c and 38.2.1 typed projective Source and final-a environment",
            sourceFinalVowel: "a",
            operation: "replace-active-final-a-with-long-i-before-hua",
            patientiveOperation:
              "remove-hua-and-realize-derived-i-as-short",
            ruleId: "cn-l38-1-3c-projective-final-a-hua",
            directSurfaceStringAuthority: false
          })
        }]
      );
      // §20.2's final-a preference is not exclusive. §20.6 contrasts
      // ihcali-lō with hua, and §38.2 retains cui-l in a compound patientive.
      // Keep this compatible transitive short-i choice beside ordinary hua.
      addRoute(normalizedSourceStem && normalizedClass === "A"
        && transitiveSource && sourceFinalShapeFrame.finalLetter === "i",
        "compatible-transitive-short-i-lo", 50, [{
          nonactiveStem: `${normalizedSourceStem}-lō`,
          suffixFamily: "lō",
          ruleId: "cn-l20-2-compatible-transitive-class-a-short-i-lo",
          formationAuthority: "shape-licensed-possibility",
          userSelectable: true,
        }]);
      addRoute(normalizedSourceStem && ["a", "ā"].includes(sourceFinalShapeFrame.finalLetter), "general-final-a", 100, [{
        nonactiveStem: `${sourceFinalShapeFrame.finalLetter === "ā" ? replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, "ā", "a") : normalizedSourceStem}-lō`,
        suffixFamily: "lō",
        ruleId: "cn-l20-2-final-a",
        formationAuthority: "productive-rule"
      }]);
      // §20.2's "mainly" and "among" describe frequency, not an exclusive
      // class/valence gate. A competing ending route does not delete this
      // compatible lō alternative. Named independent restrictions still apply.
      addRoute(normalizedSourceStem && ["A", "B"].includes(normalizedClass)
        && sourceFinalShapeFrame.finalLetter === "a", "final-a-lo-alternative", 50, [{
        nonactiveStem: `${normalizedSourceStem}-lō`, suffixFamily: "lō",
        ruleId: "cn-l20-2-compatible-final-a-lo-alternative",
        formationAuthority: "shape-licensed-possibility", userSelectable: true
      }]);
      const finalIOHuaVowelLengthRuleFrame = buildClassicalNahuatlFinalIOHuaVowelLengthRuleFrame(normalizedSourceStem);
      addRoute(normalizedSourceStem && finalIOHuaVowelLengthRuleFrame.authorizationStatus === "authorized", "general-final-i-o", 100, [{
        nonactiveStem: finalIOHuaVowelLengthRuleFrame.operation === "lengthen-short-final-i-before-hua" ? replaceClassicalNahuatlLesson20FinalShape(sourceFinalShapeFrame, "i", "ī-hua") : `${normalizedSourceStem}-hua`,
        suffixFamily: "hua",
        ruleId: "cn-l20-6-final-i-o",
        formationAuthority: "productive-rule",
        vowelLengthRuleFrame: finalIOHuaVowelLengthRuleFrame
      }, {
        nonactiveStem: `${normalizedSourceStem}-hua-lō`,
        suffixFamily: "hua-lō",
        ruleId: "cn-l20-7-final-i-o-hua-lo-possibility",
        formationAuthority: "shape-licensed-possibility",
        userSelectable: true
      }]);
      const replacedDecisionCategories = new Set(routeEvaluations.flatMap(evaluation => evaluation.relationship.replaces));
      const selectedRouteEvaluations = routeEvaluations
        .filter(evaluation => !replacedDecisionCategories.has(evaluation.decisionCategory))
        .sort((left, right) => right.priority - left.priority);
      const resolvedOptions = [];
      selectedRouteEvaluations.forEach(evaluation => evaluation.candidates.forEach(candidate => {
        const resolvedCandidate = {
          ...candidate,
          ruleRelationship: evaluation.relationship.effect,
          replacesDecisionCategories: evaluation.relationship.replaces
        };
        const existingIndex = resolvedOptions.findIndex(existing => existing.nonactiveStem === resolvedCandidate.nonactiveStem && existing.suffixFamily === resolvedCandidate.suffixFamily);
        if (existingIndex < 0) {
          resolvedOptions.push(resolvedCandidate);
          return;
        }
        const existing = resolvedOptions[existingIndex];
        resolvedOptions[existingIndex] = {
          ...existing,
          candidateRoutes: Object.freeze([...(existing.candidateRoutes || [existing.decisionCategory]), resolvedCandidate.decisionCategory].filter(Boolean)),
          supportingProductiveRuleId: resolvedCandidate.ruleId,
          supportingProductiveFormationAuthority: resolvedCandidate.formationAuthority,
          ruleRelationship: [existing.ruleRelationship, resolvedCandidate.ruleRelationship].includes("compose") ? "compose" : existing.ruleRelationship
        };
      }));
      const typedRouteEvaluations = routeEvaluations.map(evaluation => Object.freeze({
        decisionCategory: evaluation.decisionCategory,
        priority: evaluation.priority,
        ruleRelationship: evaluation.relationship.effect,
        replacesDecisionCategories: evaluation.relationship.replaces,
        resolution: replacedDecisionCategories.has(evaluation.decisionCategory) ? "replaced-by-named-rule" : "selected",
        candidateCount: evaluation.candidates.length,
        candidates: Object.freeze(evaluation.candidates.map(candidate => Object.freeze({
          ...candidate
        })))
      }));
      return Object.freeze({
        kind: "classical-nahuatl-nonactive-vnc-productive-candidate-set",
        version: 1,
        sourceStem: normalizedSourceStem,
        sourceIdentityFrame,
        sourceIdentityAuthorized: isClassicalNahuatlActiveStemIdentityFrame(
          sourceIdentityFrame,
          normalizedSourceStem
        ),
        optionReadStatus: optionRead.authorizationStatus,
        verbClass: normalizedClass,
        sourceValence: normalizedValence,
        sourceFinalShapeFrame,
        morphemicSourceProfile,
        sourceShapeAgreement: true,
        orderedVoiceLayerIntermediate,
        candidateResolutionPolicy: "collect-all-applicable-routes-then-apply-explicit-add-replace-block-compose-relationships",
        routeEvaluations: Object.freeze(typedRouteEvaluations),
        highestPriority: selectedRouteEvaluations.reduce((current, evaluation) => Math.max(current, evaluation.priority), 0),
        resolvedOptions: Object.freeze(resolvedOptions.map(option => Object.freeze({
          ...option
        })))
      });
    }
    function buildClassicalNahuatlProductiveOptions(sourceStem = "", options = {}) {
      return buildClassicalNahuatlProductiveCandidateSet(sourceStem, options).resolvedOptions;
    }
    function filterClassicalNahuatlLesson20FormationsForContext(formations = [], {
      sourceValence = "", verbClass = ""
    } = {}) {
      const normalizedValence = normalizeClassicalNahuatlVncSlotCarrier(sourceValence);
      const transitiveSource = isClassicalNahuatlTransitiveValence(normalizedValence);
      return formations.filter(option => !normalizedValence || option.sourceValenceMode !== "intransitive" || !transitiveSource).filter(option => !normalizedValence || option.sourceValenceMode !== "transitive" || transitiveSource).filter(option => !option.allowedSourceValences?.length || option.allowedSourceValences.includes(normalizedValence)).filter(option => !option.allowedVerbClasses?.length || option.allowedVerbClasses.includes(String(verbClass).toUpperCase()));
    }
    function getClassicalNahuatlNonactiveUnresolvedReason(identityFrame = null) {
      if (identityFrame?.exactNonactiveLicenseStatus === "documented-unresolved") {
        return "lesson20-active-allomorph-nonactive-formation-documented-unresolved";
      }
      if (identityFrame?.exactNonactiveLicenseStatus === "context-mismatch") {
        return "lesson20-active-allomorph-context-mismatch";
      }
      if (["e", "ē"].includes(identityFrame?.sourceFinalShapeFrame?.finalLetter)) {
        return "lesson20-final-e-requires-owner-issued-licensed-active-allomorph";
      }
      if (identityFrame?.sourceFinalShapeFrame?.finalVowelLength === "not-vowel") {
        return "lesson20-consonant-final-source-requires-lexical-or-suppletive-license";
      }
      return "lesson20-no-rule-derived-nonactive-formation";
    }
    function buildClassicalNahuatlNonactiveCandidateLattice(sourceStem = "", rawOptions = {}) {
      const optionRead = readClassicalNahuatlNonactiveDataOptions(rawOptions, [
        "verbClass",
        "sourceValence"
      ]);
      const verbClass = optionRead.values.verbClass || "";
      const sourceValence = optionRead.values.sourceValence || "";
      const normalizedSourceStem = typeof sourceStem === "string"
        ? normalizeClassicalNahuatlVncSlotStem(sourceStem)
        : "";
      const normalizedClass = normalizeClassicalNahuatlVncSlotCarrier(verbClass).toUpperCase();
      const normalizedValence = normalizeClassicalNahuatlVncSlotCarrier(sourceValence);
      const sourceIdentityFrame = buildClassicalNahuatlActiveStemIdentityFrame(normalizedSourceStem, {
        verbClass: normalizedClass,
        sourceValence: normalizedValence
      });
      const sourceFinalShapeFrame = sourceIdentityFrame.sourceFinalShapeFrame;
      const lexicalFormationLicenseFrame =
        buildClassicalNahuatlLexicalFormationLicenseFrame(
          normalizedSourceStem,
          { verbClass: normalizedClass, sourceValence: normalizedValence }
        );
      const contextualFixedFormations =
        isClassicalNahuatlLexicalFormationLicenseFrame(
          lexicalFormationLicenseFrame,
          normalizedSourceStem
        )
          ? lexicalFormationLicenseFrame.formations
          : [];
      const fixedCandidates = contextualFixedFormations.filter(option => option.formationAuthority !== "optional-variant").map(option => ({
        ...option,
        candidateSource: "exact-lesson20-formation",
        decisionCategory: "exact-fixed-formation",
        candidatePriority: 1000,
        inventorySourceStem: lexicalFormationLicenseFrame.inventorySourceStem,
        sourceBoundaryFreeLexicalIdentityKey: lexicalFormationLicenseFrame.lexicalIdentityKey,
        boundaryInsensitiveSourceMatch: lexicalFormationLicenseFrame.boundaryInsensitiveMatch,
        lexicalFormationLicenseFrame
      }));
      const lesson20AlternativeCandidates = contextualFixedFormations.filter(option => option.formationAuthority === "optional-variant").map(option => ({
        ...option,
        candidateSource: "lesson20-licensed-alternative",
        decisionCategory: "lesson20-licensed-alternative",
        candidatePriority: 800,
        inventorySourceStem: lexicalFormationLicenseFrame.inventorySourceStem,
        sourceBoundaryFreeLexicalIdentityKey: lexicalFormationLicenseFrame.lexicalIdentityKey,
        boundaryInsensitiveSourceMatch: lexicalFormationLicenseFrame.boundaryInsensitiveMatch,
        lexicalFormationLicenseFrame,
        userSelectable: true
      }));
      const productiveCandidateSet = buildClassicalNahuatlProductiveCandidateSet(normalizedSourceStem, {
        verbClass: normalizedClass,
        sourceValence: normalizedValence
      });
      let baseResolutionSource = "productive-final-shape";
      let baseCandidates = [...productiveCandidateSet.resolvedOptions];
      const overlayNamedSourceCandidates = (currentCandidates, sourceCandidates) => {
        if (!sourceCandidates.length) {
          return currentCandidates;
        }
        const preservedDecisionCategories = new Set(sourceCandidates.flatMap(candidate => candidate.preserveProductiveDecisionCategories || []));
        const compatibleShortILo = sourceCandidates.every(candidate =>
          !["obligatory-exception", "suppletive-lexical-rule"].includes(candidate.formationAuthority))
          ? currentCandidates.filter(candidate =>
            candidate.decisionCategory === "compatible-transitive-short-i-lo"
            && !preservedDecisionCategories.has(candidate.decisionCategory)) : [];
        return [
          ...currentCandidates.filter(candidate => preservedDecisionCategories.has(candidate.decisionCategory) || candidate.ruleRelationship === "compose"),
          ...sourceCandidates,
          ...compatibleShortILo,
        ];
      };
      if (fixedCandidates.length) {
        baseResolutionSource = baseCandidates.length ? "productive-plus-exact-lesson20-formation" : "exact-lesson20-formation";
        baseCandidates = overlayNamedSourceCandidates(baseCandidates, fixedCandidates);
      }
      const supplementalCandidates = baseCandidates.length
        ? lesson20AlternativeCandidates
        : [];
      const resolvedCandidates = [...baseCandidates];
      supplementalCandidates.forEach(option => {
        const existingIndex = resolvedCandidates.findIndex(candidate => candidate.nonactiveStem === option.nonactiveStem && candidate.suffixFamily === option.suffixFamily);
        if (existingIndex < 0) {
          resolvedCandidates.push(option);
          return;
        }
        const baseCandidate = resolvedCandidates[existingIndex];
        const preserveLesson20Alternative = baseCandidate.candidateSource === "lesson20-licensed-alternative";
        resolvedCandidates[existingIndex] = {
          ...(preserveLesson20Alternative ? option : baseCandidate),
          ...(preserveLesson20Alternative ? baseCandidate : option),
          candidateSource: "base-plus-lexical-alternative",
          candidateRoutes: Object.freeze([baseCandidate.candidateSource, option.candidateSource]),
          supportingProductiveRuleId: baseCandidate.ruleId,
          supportingProductiveFormationAuthority: baseCandidate.formationAuthority,
          userSelectable: option.userSelectable === true || baseCandidate.userSelectable === true
        };
      });
      const resolutionStatus = resolvedCandidates.length > 1 ? "selectable-alternatives" : resolvedCandidates.length === 1 ? "determinate" : "documented-unresolved";
      const unresolvedReason = optionRead.authorizationStatus !== "authorized"
        ? optionRead.blockReason
        : !isClassicalNahuatlActiveStemIdentityFrame(
          sourceIdentityFrame,
          normalizedSourceStem
        )
          ? sourceIdentityFrame.blockReason
          : resolvedCandidates.length
            ? ""
            : getClassicalNahuatlNonactiveUnresolvedReason(sourceIdentityFrame);
      const candidateChannels = Object.freeze([Object.freeze({
        channel: "exact-lesson20-formation",
        candidateCount: fixedCandidates.length,
        resolution: fixedCandidates.length ? "selected-with-same-family-replacement" : "not-selected"
      }), Object.freeze({
        channel: "lesson20-licensed-alternative",
        candidateCount: lesson20AlternativeCandidates.length,
        resolution: baseCandidates.length && lesson20AlternativeCandidates.length ? "merged-as-user-options" : "not-applicable"
      }), Object.freeze({
        channel: "productive-final-shape",
        candidateCount: productiveCandidateSet.resolvedOptions.length,
        resolution: productiveCandidateSet.resolvedOptions.length ? "selected-except-same-family-exact-replacements" : "not-applicable"
      })]);
      return Object.freeze({
        kind: "classical-nahuatl-nonactive-vnc-nonactive-candidate-lattice",
        version: 1,
        sourceAuthority: "Andrews active identity, class, valence, internal morphology, and final shape",
        sourceStem: normalizedSourceStem,
        verbClass: normalizedClass,
        sourceValence: normalizedValence,
        sourceIdentityFrame,
        sourceFinalShapeFrame,
        sourceBoundaryFreeLexicalIdentityKey: lexicalFormationLicenseFrame.lexicalIdentityKey,
        lexicalFormationLicenseFrame,
        productiveCandidateSet,
        candidateChannels,
        baseResolutionSource,
        resolutionStatus,
        unresolvedReason,
        authorizationStatus: optionRead.authorizationStatus === "authorized"
          && isClassicalNahuatlActiveStemIdentityFrame(
            sourceIdentityFrame,
            normalizedSourceStem
          )
          && resolvedCandidates.length
            ? "authorized"
            : "blocked",
        resolvedCandidateCount: resolvedCandidates.length,
        resolvedCandidates: Object.freeze(resolvedCandidates.map(candidate => Object.freeze({
          ...candidate
        }))),
        userSuppliedCandidateAllowed: false
      });
    }
    function getClassicalNahuatlNonactiveStemOptions(sourceStem = "", rawOptions = {}) {
      const optionRead = readClassicalNahuatlNonactiveDataOptions(rawOptions, [
        "verbClass",
        "sourceValence"
      ]);
      const verbClass = optionRead.values.verbClass || "";
      const sourceValence = optionRead.values.sourceValence || "";
      const normalizedSourceStem = typeof sourceStem === "string"
        ? normalizeClassicalNahuatlVncSlotStem(sourceStem)
        : "";
      const normalizedClass = normalizeClassicalNahuatlVncSlotCarrier(verbClass).toUpperCase();
      const normalizedValence = normalizeClassicalNahuatlVncSlotCarrier(sourceValence);
      const candidateLattice = buildClassicalNahuatlNonactiveCandidateLattice(
        typeof sourceStem === "string" ? sourceStem : sourceStem,
        rawOptions
      );
      const sourceIdentityFrame = candidateLattice.sourceIdentityFrame;
      const sourceFinalShapeFrame = candidateLattice.sourceFinalShapeFrame;
      const derivedOptions = candidateLattice.authorizationStatus === "authorized"
        ? [...candidateLattice.resolvedCandidates]
        : [];
      const selectorRequired = derivedOptions.length > 1;
      const options = derivedOptions.map((option, index) => {
        const resolvedNonactiveStem = option.nonactiveStem;
        const finalShapeRelation = buildClassicalNahuatlNonactiveFinalShapeRelation(normalizedSourceStem, resolvedNonactiveStem, {
          suffixFamily: option.suffixFamily,
          ruleId: option.ruleId
        });
        const formationStructure = getClassicalNahuatlNonactiveFormationStructure(option.suffixFamily, finalShapeRelation.nonactiveFinalShapeFrame);
        const lexicalEvidenceMatches = getClassicalNahuatlKarttunen1992DerivationEvidenceMatches({
          operation: "nonactive",
          sourceStem: normalizedSourceStem,
          targetStem: resolvedNonactiveStem
        });
        return Object.freeze({
          kind: "classical-nahuatl-nonactive-vnc-nonactive-option",
          optionId: `${option.suffixFamily}:${resolvedNonactiveStem}`,
          label: `${resolvedNonactiveStem} (${option.suffixFamily} · ${getClassicalNahuatlNonactiveFormationAuthorityLabel(option.formationAuthority)})`,
          nonactiveStem: resolvedNonactiveStem,
          suffixFamily: option.suffixFamily,
          ruleId: option.ruleId,
          formationAuthority: option.formationAuthority || "productive-rule",
          ruleRelationship: option.ruleRelationship || "add",
          replacesDecisionCategories: option.replacesDecisionCategories || Object.freeze([]),
          candidateSource: option.candidateSource || "productive-final-shape",
          candidateRoutes: option.candidateRoutes || Object.freeze([option.candidateSource || "productive-final-shape"]),
          decisionCategory: option.decisionCategory || "licensed-nonactive-formation",
          candidatePriority: option.candidatePriority || 0,
          inventorySourceStem: option.inventorySourceStem || "",
          sourceBoundaryFreeLexicalIdentityKey: option.sourceBoundaryFreeLexicalIdentityKey || sourceIdentityFrame.boundaryFreeLexicalIdentityKey,
          boundaryInsensitiveSourceMatch: option.boundaryInsensitiveSourceMatch === true,
          identityRuleId: option.identityRuleId || sourceIdentityFrame.identityRuleId,
          supportingProductiveRuleId: option.supportingProductiveRuleId || "",
          supportingProductiveFormationAuthority: option.supportingProductiveFormationAuthority || "",
          vowelLengthRuleId: option.vowelLengthRuleId || option.vowelLengthRuleFrame?.ruleId || "",
          vowelLengthRuleFrame: option.vowelLengthRuleFrame || null,
          attachmentSite: option.attachmentSite || "whole-stem-right-edge",
          andrewsSection: option.andrewsSection || "20",
          attestationStatus: option.attestationStatus || "lesson20-licensed-formation",
          citationBridgeVisibility: option.citationBridgeVisibility || "",
          citationBridgeHypothetical: typeof option.citationBridgeHypothetical === "boolean" ? option.citationBridgeHypothetical : null,
          imperfectiveNonactiveStem: option.imperfectiveNonactiveStem || resolvedNonactiveStem,
          perfectiveNonactiveStem: option.perfectiveNonactiveStem || resolvedNonactiveStem,
          targetClass: option.targetClass || getClassicalNahuatlNonactiveTargetClass(option.suffixFamily, resolvedNonactiveStem),
          sourceFinalShapeFrame: finalShapeRelation.sourceFinalShapeFrame,
          sourceIdentityFrame,
          lexicalSourceIdentityFrame: option.lexicalSourceIdentityFrame || null,
          lexicalFormationLicenseFrame: option.lexicalFormationLicenseFrame || null,
          lexicalFormationLicenseRequired: Boolean(option.lexicalFormationLicenseFrame),
          sourceInternalMorphology: sourceIdentityFrame.internalMorphology,
          nonactiveFinalShapeFrame: finalShapeRelation.nonactiveFinalShapeFrame,
          finalShapeRelation,
          formationStructure,
          formationCore: formationStructure.formationCore,
          formationContinuation: formationStructure.continuation,
          formationSequence: formationStructure.sequence,
          lexicalEvidenceMatches,
          lexicalEvidenceSignature: getClassicalNahuatlKarttunen1992EvidenceSignature(lexicalEvidenceMatches),
          surfaceFamilyIsRealization: true,
          optionRole: selectorRequired ? "user-choice" : "determinate",
          optionalForUser: selectorRequired,
          isDefault: false,
          variantIndex: index,
          variantStatus: selectorRequired ? "andrews-licensed-user-option" : option.formationAuthority === "obligatory-exception" ? "obligatory-exception" : "single-rule-derived-formation"
        });
      });
      return {
        kind: "classical-nahuatl-nonactive-vnc-nonactive-option-inventory",
        version: 6,
        semanticOwner: "classical-nahuatl-nonactive-formation",
        sourceAuthority: "Andrews transcription",
        sourceStem: normalizedSourceStem,
        sourceIdentityFrame,
        sourceFinalShapeFrame,
        candidateLattice,
        candidateResolutionStatus: candidateLattice.resolutionStatus,
        candidateResolutionSource: candidateLattice.baseResolutionSource,
        finalShapeDecisionAuthority: "typed-active-identity-internal-morphology-final-shape-class-valence-and-licensed-exceptions",
        formationCoreAuthority: "andrews-three-core-system-with-six-surface-realizations",
        formationCores: CLASSICAL_NAHUATL_NONACTIVE_FORMATION_CORES,
        finalShapeUnitLimit: 3,
        macronAndHyphenPreserved: true,
        sourceValence: normalizedValence,
        verbClass: normalizedClass,
        authorizationStatus: options.length ? "authorized" : "blocked",
        blockReason: options.length ? "" : candidateLattice.unresolvedReason,
        options,
        defaultOptionId: "",
        automaticOptionId: selectorRequired ? "" : options[0]?.optionId || "",
        selectorRequired,
        selectionRequired: selectorRequired,
        alternativeSelectionPolicy: "explicit-user-choice-required-no-default",
        exceptionSelectionPolicy: "only-owner-issued-lesson20-lexical-alternatives-are-user-selectable",
        crossLessonExampleAuthority: false,
        userSuppliedDerivedStemAllowed: false
      };
    }
    function deriveClassicalNahuatlNonactiveStemRecord(sourceStem = "", rawOptions = {}) {
      const optionRead = readClassicalNahuatlNonactiveDataOptions(rawOptions, [
        "verbClass",
        "sourceValence",
        "optionId"
      ]);
      const verbClass = optionRead.values.verbClass || "";
      const sourceValence = optionRead.values.sourceValence || "";
      const optionId = optionRead.values.optionId || "";
      const typedSourceStem = typeof sourceStem === "string" ? sourceStem : "";
      const inventory = getClassicalNahuatlNonactiveStemOptions(typedSourceStem, {
        verbClass,
        sourceValence
      });
      const normalizedOptionId = normalizeClassicalNahuatlVncSlotCarrier(optionId);
      const generatedOptionRequested = Boolean(normalizedOptionId);
      const selectedOption = normalizedOptionId ? inventory.options.find(option => option.optionId === normalizedOptionId) || null : inventory.selectionRequired ? null : inventory.options[0] || null;
      const record = finalizeClassicalNahuatlLesson20NonactiveStemRecord(typedSourceStem, {
        selectedOption
      });
      const issuedRecord = {
        ...record,
        authorizationStatus: optionRead.authorizationStatus === "authorized"
          && typeof sourceStem === "string"
          ? record.authorizationStatus
          : "blocked",
        blockReason: optionRead.authorizationStatus !== "authorized"
          ? optionRead.blockReason
          : typeof sourceStem !== "string"
            ? "lesson20-typed-active-source-stem-required"
            : inventory.authorizationStatus === "blocked" ? inventory.blockReason : inventory.selectionRequired && !normalizedOptionId ? "lesson20-nonactive-option-selection-required" : generatedOptionRequested && !selectedOption ? "lesson20-selected-option-was-not-generated" : record.blockReason,
        optionInventory: inventory,
        selectedOptionId: selectedOption?.optionId || "",
        selectedRuleId: selectedOption?.ruleId || "",
        selectedFormationAuthority: selectedOption?.formationAuthority || "",
        selectedOptionRole: selectedOption?.optionRole || "",
        selectedOptionWasUserOptional: selectedOption?.optionalForUser === true,
        selectorRequired: inventory.selectorRequired,
        selectionRequired: inventory.selectionRequired
      };
      if (issuedRecord.authorizationStatus === "authorized" && !issuedRecord.blockReason
        && normalizeClassicalNahuatlVncSlotStem(typedSourceStem) === issuedRecord.sourceStem) {
        CLASSICAL_NAHUATL_LESSON20_ISSUED_NONACTIVE_RECORDS.add(issuedRecord);
      }
      return issuedRecord;
    }
    function finalizeClassicalNahuatlLesson20NonactiveStemRecord(sourceStem = "", {
      selectedOption = null,
      formulaArtifact = "",
      surfaceArtifact = ""
    } = {}) {
      const normalizedSourceStem = normalizeClassicalNahuatlVncSlotStem(sourceStem);
      const sourceIdentityFrame = selectedOption?.sourceIdentityFrame || buildClassicalNahuatlActiveStemIdentityFrame(normalizedSourceStem);
      const normalizedNonactiveStem = normalizeClassicalNahuatlVncSlotStem(selectedOption?.nonactiveStem);
      const normalizedImperfectiveNonactiveStem = normalizeClassicalNahuatlVncSlotStem(selectedOption?.imperfectiveNonactiveStem) || normalizedNonactiveStem;
      const normalizedPerfectiveNonactiveStem = normalizeClassicalNahuatlVncSlotStem(selectedOption?.perfectiveNonactiveStem) || normalizedNonactiveStem;
      const normalizedSuffixFamily = normalizeClassicalNahuatlVncSlotCarrier(selectedOption?.suffixFamily);
      const lexicalEvidenceMatches = getClassicalNahuatlKarttunen1992DerivationEvidenceMatches({
        operation: "nonactive",
        sourceStem: normalizedSourceStem,
        targetStem: normalizedNonactiveStem
      });
      const lexicalEvidenceSignature = getClassicalNahuatlKarttunen1992EvidenceSignature(lexicalEvidenceMatches);
      const finalShapeRelation = buildClassicalNahuatlNonactiveFinalShapeRelation(normalizedSourceStem, normalizedNonactiveStem, {
        suffixFamily: normalizedSuffixFamily,
        ruleId: selectedOption?.ruleId || ""
      });
      const formationStructure = getClassicalNahuatlNonactiveFormationStructure(normalizedSuffixFamily, finalShapeRelation.nonactiveFinalShapeFrame);
      const familyAuthorized = Boolean(CLASSICAL_NAHUATL_NONACTIVE_SUFFIX_FAMILIES.includes(normalizedSuffixFamily) && CLASSICAL_NAHUATL_NONACTIVE_FORMATION_CORES.includes(formationStructure.formationCore) && formationStructure.authorizationStatus === "authorized");
      const lexicalFormationAuthorized = Boolean(
        !selectedOption?.lexicalFormationLicenseRequired
        || isClassicalNahuatlLexicalFormationLicenseFrame(
          selectedOption.lexicalFormationLicenseFrame,
          normalizedSourceStem
        )
      );
      const lexicalAllomorphAuthorized = Boolean(
        selectedOption?.decisionCategory !== "licensed-final-e-allomorph"
        || (
          isClassicalNahuatlActiveStemIdentityFrame(
            selectedOption.lexicalSourceIdentityFrame,
            normalizedSourceStem
          )
          && selectedOption.lexicalSourceIdentityFrame.allomorphLicenseAuthorized
          && selectedOption.lexicalSourceIdentityFrame.nonactiveBasePolicy
            === "licensed-active-allomorph-is-imperfective-base"
        )
      );
      const ruleOptionAuthorized = Boolean((normalizedSuffixFamily !== "o" || hasClassicalNahuatlLicensedShortTerminalO(selectedOption, normalizedSourceStem)) && selectedOption && selectedOption.kind === "classical-nahuatl-nonactive-vnc-nonactive-option" && selectedOption.optionId === `${normalizedSuffixFamily}:${normalizedNonactiveStem}` && selectedOption.ruleId && selectedOption.formationAuthority && finalShapeRelation.authorizationStatus === "authorized" && selectedOption.finalShapeRelation?.authorizationStatus === "authorized" && selectedOption.finalShapeRelation.sourceFinalShapeFrame?.stem === normalizedSourceStem && selectedOption.finalShapeRelation.nonactiveFinalShapeFrame?.stem === normalizedNonactiveStem && selectedOption.finalShapeRelation.suffixFamily === normalizedSuffixFamily && selectedOption.finalShapeRelation.ruleId === selectedOption.ruleId && selectedOption.formationStructure?.authorizationStatus === "authorized" && selectedOption.formationCore === formationStructure.formationCore && selectedOption.formationContinuation === formationStructure.continuation && selectedOption.formationSequence?.length === formationStructure.sequence.length && selectedOption.formationSequence.every((core, index) => core === formationStructure.sequence[index]) && isClassicalNahuatlActiveStemIdentityFrame(selectedOption.sourceIdentityFrame, normalizedSourceStem) && selectedOption.sourceInternalMorphology === selectedOption.sourceIdentityFrame.internalMorphology && lexicalFormationAuthorized && lexicalAllomorphAuthorized);
      // Lesson 20.5 names the family o-hua, while final -hua/-hui sources
      // realize its first member as long ō. Compounds may add final -tz.
      // The typed morpheme tail retains both the macron and those boundaries.
      const suffixShapeAuthorized = doesClassicalNahuatlLesson20FinalShapeMatchSuffixFamily(finalShapeRelation.nonactiveFinalShapeFrame, normalizedSuffixFamily);
      const grammarSelectionFrame =
        evaluateClassicalNahuatlGrammarSelection({
          operationId: "nonactive",
          sourceAuthorized: sourceIdentityFrame.authorizationStatus === "authorized"
            && sourceIdentityFrame.enteredStem === normalizedSourceStem,
          nonactiveFamilyAuthorized: familyAuthorized && suffixShapeAuthorized,
          generatedRuleOptionAuthorized: ruleOptionAuthorized,
          sourceValence: selectedOption?.sourceValence || "",
        });
      const authorized = Boolean(normalizedSourceStem && normalizedNonactiveStem && normalizedSourceStem !== normalizedNonactiveStem && sourceIdentityFrame.authorizationStatus === "authorized" && sourceIdentityFrame.enteredStem === normalizedSourceStem && familyAuthorized && ruleOptionAuthorized && suffixShapeAuthorized && grammarSelectionFrame.authorizationStatus === "authorized");
      const blockReason = authorized ? "" : !normalizedSourceStem ? "lesson20-active-source-stem-required" : !normalizedNonactiveStem ? "lesson20-exact-nonactive-stem-required" : normalizedSourceStem === normalizedNonactiveStem ? "lesson20-nonactive-stem-must-differ-from-active-source" : !familyAuthorized ? "lesson20-nonactive-suffix-family-not-authorized" : !ruleOptionAuthorized ? "lesson20-generated-rule-option-required" : !suffixShapeAuthorized ? "lesson20-nonactive-stem-does-not-match-selected-suffix-family" : grammarSelectionFrame.blockReason;
      return {
        kind: "classical-nahuatl-nonactive-vnc-nonactive-stem-record",
        version: 4,
        lesson: "Andrews Lesson 20",
        sourceAuthority: "Andrews Lesson 20 rule derivation",
        sourceDocument: CLASSICAL_NAHUATL_VNC_SLOT_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason,
        sourceStem: normalizedSourceStem,
        sourceIdentityFrame,
        sourceInternalMorphology: sourceIdentityFrame.internalMorphology,
        lexicalIdentityId: sourceIdentityFrame.lexicalIdentityId,
        enteredAllomorph: sourceIdentityFrame.enteredAllomorph,
        canonicalImperfectiveStem: sourceIdentityFrame.canonicalImperfectiveStem,
        nonactiveStem: authorized ? normalizedNonactiveStem : "",
        requestedNonactiveStem: normalizedNonactiveStem,
        suffixFamily: normalizedSuffixFamily,
        imperfectiveNonactiveStem: authorized ? normalizedImperfectiveNonactiveStem : "",
        perfectiveNonactiveStem: authorized ? normalizedPerfectiveNonactiveStem : "",
        targetClass: authorized ? getClassicalNahuatlNonactiveTargetClass(normalizedSuffixFamily, normalizedNonactiveStem) : "",
        selectedOptionId: authorized ? selectedOption.optionId : "",
        selectedRuleId: authorized ? selectedOption.ruleId : "",
        selectedFormationAuthority: authorized ? selectedOption.formationAuthority : "",
        citationBridgeVisibility: authorized ? selectedOption.citationBridgeVisibility : "",
        citationBridgeHypothetical: authorized && typeof selectedOption.citationBridgeHypothetical === "boolean" ? selectedOption.citationBridgeHypothetical : null,
        attachmentSite: authorized ? selectedOption.attachmentSite : "",
        sourceFinalShapeFrame: finalShapeRelation.sourceFinalShapeFrame,
        nonactiveFinalShapeFrame: authorized ? finalShapeRelation.nonactiveFinalShapeFrame : null,
        finalShapeRelation: authorized ? finalShapeRelation : null,
        finalShapeAuthority: authorized ? "computed-generated-option-relation" : "",
        grammarSelectionFrame,
        formationStructure: authorized ? formationStructure : null,
        formationCore: authorized ? formationStructure.formationCore : "",
        formationContinuation: authorized ? formationStructure.continuation : "",
        formationSequence: authorized ? formationStructure.sequence : Object.freeze([]),
        lexicalEvidenceMatches,
        lexicalEvidenceSignature,
        surfaceFamilyIsRealization: true,
        finalShapeUnitLimit: 3,
        macronAndHyphenPreserved: true,
        sourceIsImperfectiveActiveStem: true,
        nonactiveStemRemainsPredicateInternal: true,
        selectionAuthority: authorized ? "andrews-lesson20-rule-derivation" : "",
        candidateSource: authorized ? selectedOption.candidateSource : "",
        decisionCategory: authorized ? selectedOption.decisionCategory : "",
        formulaArtifact: normalizeClassicalNahuatlVncSlotCarrier(formulaArtifact),
        surfaceArtifact: normalizeClassicalNahuatlVncSlotCarrier(surfaceArtifact),
        formulaArtifactAuthority: false,
        surfaceArtifactAuthority: false,
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false
      };
    }

    function buildClassicalNahuatlNonactiveStemRecord(sourceStem = "", rawOptions = {}) {
      return deriveClassicalNahuatlNonactiveStemRecord(
        sourceStem,
        rawOptions
      );
    }
    function isClassicalNahuatlNonactiveStemRecord(record = null, sourceStem = "") {
      if (!record
        || !CLASSICAL_NAHUATL_LESSON20_ISSUED_NONACTIVE_RECORDS.has(record)
        || typeof sourceStem !== "string") {
        return false;
      }
      const normalizedSourceStem = normalizeClassicalNahuatlVncSlotStem(sourceStem || record.sourceStem);
      const generatedOption = normalizedSourceStem && record?.selectedOptionId
        ? getClassicalNahuatlNonactiveStemOptions(normalizedSourceStem, {
          verbClass: record.sourceIdentityFrame?.verbClass || "",
          sourceValence: record.sourceIdentityFrame?.sourceValence || ""
        }).options.find(option => option.optionId === record.selectedOptionId) || null
        : null;
      const recomputedFormationStructure = getClassicalNahuatlNonactiveFormationStructure(record?.suffixFamily, record?.nonactiveFinalShapeFrame);
      const evidenceQuery = {
        operation: "nonactive",
        sourceStem: normalizedSourceStem,
        targetStem: record?.nonactiveStem || ""
      };
      const expectedEvidenceMatches = getClassicalNahuatlKarttunen1992DerivationEvidenceMatches(evidenceQuery);
      const lexicalEvidenceCanonical = Boolean(
        Array.isArray(record?.lexicalEvidenceMatches)
        && isClassicalNahuatlKarttunen1992EvidenceMatchSet(record.lexicalEvidenceMatches, evidenceQuery)
        && record.lexicalEvidenceSignature === getClassicalNahuatlKarttunen1992EvidenceSignature(expectedEvidenceMatches)
      );
      return Boolean(record.kind === "classical-nahuatl-nonactive-vnc-nonactive-stem-record" && record.authorizationStatus === "authorized" && record.selectionAuthority === "andrews-lesson20-rule-derivation" && generatedOption && (record.suffixFamily !== "o" || hasClassicalNahuatlLicensedShortTerminalO(generatedOption, normalizedSourceStem)) && record.selectedOptionId === generatedOption.optionId && record.selectedRuleId === generatedOption.ruleId && record.sourceStem === normalizedSourceStem && isClassicalNahuatlActiveStemIdentityFrame(record.sourceIdentityFrame, normalizedSourceStem) && record.sourceInternalMorphology === record.sourceIdentityFrame.internalMorphology && record.nonactiveStem === generatedOption.nonactiveStem && record.imperfectiveNonactiveStem === generatedOption.imperfectiveNonactiveStem && record.perfectiveNonactiveStem === generatedOption.perfectiveNonactiveStem && record.finalShapeAuthority === "computed-generated-option-relation" && record.finalShapeRelation?.authorizationStatus === "authorized" && record.finalShapeRelation.sourceFinalShapeFrame?.stem === normalizedSourceStem && record.finalShapeRelation.nonactiveFinalShapeFrame?.stem === record.nonactiveStem && record.formationStructure?.authorizationStatus === "authorized" && record.formationCore === recomputedFormationStructure.formationCore && record.formationContinuation === recomputedFormationStructure.continuation && record.formationSequence?.length === recomputedFormationStructure.sequence.length && record.formationSequence.every((core, index) => core === recomputedFormationStructure.sequence[index]) && doesClassicalNahuatlLesson20FinalShapeMatchSuffixFamily(record.nonactiveFinalShapeFrame, record.suffixFamily) && lexicalEvidenceCanonical && record.formulaArtifactAuthority === false && record.surfaceArtifactAuthority === false);
    }
    function buildClassicalNahuatlInherentImpersonalRecord(sourceStem = "", {
      selectionAuthority = "",
      formulaArtifact = "",
      surfaceArtifact = ""
    } = {}) {
      const normalizedSourceStem = normalizeClassicalNahuatlVncSlotStem(sourceStem);
      const sourceAnalysis = getClassicalNahuatlInherentImpersonalSourceAnalysis(
        normalizedSourceStem
      );
      const authorized = Boolean(
        normalizedSourceStem
        && selectionAuthority === "andrews-lesson22-voice-selection"
        && sourceAnalysis.authorizationStatus === "authorized"
      );
      return {
        kind: "classical-nahuatl-impersonal-vnc-inherent-impersonal-record",
        version: 1,
        lesson: "Andrews Lesson 22.1",
        sourceAuthority: "typed inherent-impersonal Source analysis; Canvas examples are defaults, not gates",
        sourceDocument: CLASSICAL_NAHUATL_VNC_SLOT_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized
          ? ""
          : !normalizedSourceStem
            ? "lesson22-inherent-impersonal-source-stem-required"
            : selectionAuthority !== "andrews-lesson22-voice-selection"
              ? "lesson22-inherent-impersonal-typed-voice-selection-required"
              : sourceAnalysis.blockReason,
        sourceStem: normalizedSourceStem,
        inherentImpersonalStem: authorized ? normalizedSourceStem : "",
        sourceAnalysis,
        selectionAuthority,
        formulaArtifact: normalizeClassicalNahuatlVncSlotCarrier(formulaArtifact),
        surfaceArtifact: normalizeClassicalNahuatlVncSlotCarrier(surfaceArtifact),
        formulaArtifactAuthority: false,
        surfaceArtifactAuthority: false,
        callerSuppliedLexicalClassAuthority: false,
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false
      };
    }
    function isClassicalNahuatlInherentImpersonalRecord(record = null, sourceStem = "") {
      const normalizedSourceStem = normalizeClassicalNahuatlVncSlotStem(sourceStem);
      const rebuilt = buildClassicalNahuatlInherentImpersonalRecord(
        normalizedSourceStem,
        { selectionAuthority: "andrews-lesson22-voice-selection" }
      );
      return Boolean(
        record
        && record.kind === "classical-nahuatl-impersonal-vnc-inherent-impersonal-record"
        && record.authorizationStatus === "authorized"
        && record.selectionAuthority === "andrews-lesson22-voice-selection"
        && record.sourceStem === normalizedSourceStem
        && record.inherentImpersonalStem === normalizedSourceStem
        && record.sourceAnalysis?.authorizationStatus === "authorized"
        && JSON.stringify(record.sourceAnalysis) === JSON.stringify(rebuilt.sourceAnalysis)
        && record.formulaArtifactAuthority === false
        && record.surfaceArtifactAuthority === false
        && record.callerSuppliedLexicalClassAuthority === false
      );
    }
    const restrictedContainingSources = new WeakMap();
    const restrictedContainingSourceContexts = new WeakMap();
    const restrictedContainingTargets = new WeakMap();
    function resolveClassicalNahuatlRestrictedContainingVncSourceFrame(request = {}) {
      if (!request || typeof request !== "object" || Array.isArray(request)
        || Object.keys(request).some(k => !["enteredStem", "valence", "sourceLexemeId"].includes(k))) return null;
      const record = targetObject.resolveClassicalNahuatlCanonicalSourceStemRecord?.({enteredStem:request.enteredStem,
        basalUnit:"vnc",valence:request.valence,sourceLexemeId:request.sourceLexemeId || ""});
      const analysis = record?.canonicalRestrictedContainingSourceAnalysis;
      if (targetObject.isClassicalNahuatlCanonicalSourceStemRecord?.(record) !== true || !analysis
        || analysis.requiredSourceLexemeId && request.sourceLexemeId !== analysis.requiredSourceLexemeId) return null;
      if (restrictedContainingSources.has(record)) return restrictedContainingSources.get(record);
      const source = Object.freeze({kind:"classical-nahuatl-restricted-containing-vnc-source-frame",version:1,
        sourceStem:record.stem,sourceValence:record.defaultSourceValence,sourceRank:analysis.sourceRank,sourceClass:analysis.sourceClass,
        canonicalSourceStemRecord:record,sourceAnalysis:analysis,sourceLexemeId:request.sourceLexemeId || "",
        independentFiniteUseLicensed:false,grammarAuthority:false,formulaStringAuthority:false,surfaceStringAuthority:false});
      restrictedContainingSources.set(record,source);restrictedContainingSourceContexts.set(source,Object.freeze({record,analysis}));return source;
    }
    function isClassicalNahuatlRestrictedContainingVncSourceFrame(source = null) {
      const c=source && restrictedContainingSourceContexts.get(source);
      return Boolean(c && Object.isFrozen(source) && targetObject.isClassicalNahuatlCanonicalSourceStemRecord?.(c.record) === true
        && source.canonicalSourceStemRecord===c.record && c.record.canonicalRestrictedContainingSourceAnalysis===c.analysis
        && source.sourceAnalysis===c.analysis && source.sourceStem===c.record.stem && source.sourceClass===c.analysis.sourceClass
        && source.independentFiniteUseLicensed===false);
    }
    // A containing formation authenticates morphological operands; it never
    // asserts a finite event for the unattested/defective matrix alone.
    function buildClassicalNahuatlRestrictedContainingTargetFrame(source = null, selection = {}) {
      const analysis=source?.sourceAnalysis;
      const blocked = reason => Object.freeze({kind:"classical-nahuatl-restricted-containing-target-frame",authorizationStatus:"blocked",blockReason:reason});
      if (!isClassicalNahuatlRestrictedContainingVncSourceFrame(source)) return blocked("exact-restricted-containing-source-required");
      if (!selection || typeof selection!=="object" || Object.keys(selection).some(k=>!["reading","embedStem"].includes(k))) return blocked("restricted-containing-selection-not-supported");
      let record=null,targetStem="",targetClass=source.sourceClass;
      if(analysis.containingFamily==="tla-impersonal") {
        if(selection.embedStem || !selection.reading)return blocked("tla-impersonal-reading-required");
        record=buildClassicalNahuatlTlaImpersonalStemRecord(source.sourceStem,{selectionAuthority:"andrews-lesson22-rule-derivation"});
        if(!isClassicalNahuatlTlaImpersonalStemRecord(record,source.sourceStem)
          || record.sourceAnalysis?.sourceAttestation!==analysis.requiredSourceAttestation
          || !record.sourceAnalysis?.availableReadings?.includes(selection.reading))return blocked("tla-impersonal-owned-reading-required");
        targetStem=record.impersonalStem;
      } else if(analysis.containingFamily==="archaic-motion-matrix") {
        if(selection.reading || !analysis.attestedEmbedStems.includes(selection.embedStem))return blocked("attested-archaic-motion-embed-required");
        // §11.4.5 prints hui + itz as the lexical compound allomorph huī-tz.
        // Its quantity belongs to the irregular owner, not a general deletion
        // or coalescence rule inferred from the constituent spellings.
        const compoundAlias=[selection.embedStem,source.sourceStem.replace(/^i/u,"")].join("-");
        const plan=targetObject.buildClassicalNahuatlIrregularVncParadigmPlan?.(compoundAlias,{subject:"1sg",mood:"indicative",tense:"present",requestedSemanticTense:"present"});
        if(plan?.authorizationStatus!=="authorized" || !plan.applies || plan.selectedClassOverride!==targetClass)return blocked("existing-archaic-compound-plan-required");
        targetStem=plan.canonicalSourceStem || compoundAlias;
        record=Object.freeze({kind:"classical-nahuatl-archaic-motion-compound-formation",embedStem:selection.embedStem,
          matrixSourceFrame:source,matrixStem:source.sourceStem,matrixRank:source.sourceRank,
          ...(plan.identity?.canonicalStemRuleId
            ? {attestedCompoundAllomorph:targetStem,compoundAllomorphRuleId:plan.identity.canonicalStemRuleId,
              simpleMatrixInitialIDeletionClaimed:false}
            : {matrixInitialIDeletion:true}),
          compoundStem:targetStem,connective:"none",sourceFiniteEventAsserted:false});
      } else return blocked("containing-family-requires-its-constituent-owner");
      freezeClassicalNahuatlNonactiveCarrierFiniteValue(record);
      const frame=Object.freeze({kind:"classical-nahuatl-restricted-containing-target-frame",authorizationStatus:"authorized",blockReason:"",
        canonicalRestrictedContainingSourceFrame:source,containingFamily:analysis.containingFamily,formationRecord:record,
        targetStem,targetClass,reading:selection.reading || "",embedStem:selection.embedStem || "",sourceFiniteEventAsserted:false});
      restrictedContainingTargets.set(frame,Object.freeze({source,record,targetStem,targetClass}));return frame;
    }
    function isClassicalNahuatlRestrictedContainingTargetFrame(frame=null) {
      const c=frame && restrictedContainingTargets.get(frame);
      return Boolean(c && Object.isFrozen(frame) && isClassicalNahuatlRestrictedContainingVncSourceFrame(c.source)
        && frame.canonicalRestrictedContainingSourceFrame===c.source && frame.formationRecord===c.record
        && frame.targetStem===c.targetStem && frame.targetClass===c.targetClass && frame.sourceFiniteEventAsserted===false);
    }
    function buildClassicalNahuatlTlaImpersonalStemRecord(sourceStem = "", {
      impersonalStem = "",
      selectionAuthority = "",
      formulaArtifact = "",
      surfaceArtifact = ""
    } = {}) {
      const normalizedSourceStem = normalizeClassicalNahuatlVncSlotStem(sourceStem);
      const callerSuppliedTarget = normalizeClassicalNahuatlVncSlotStem(
        impersonalStem
      );
      const sourceAnalysis =
        getClassicalNahuatlTlaImpersonalSourceAnalysis(
          normalizedSourceStem
        );
      const derivedImpersonalStem =
        deriveClassicalNahuatlTlaImpersonalTargetStem(
          sourceAnalysis.canonicalSourceStem,
          sourceAnalysis.realizationRuleId
        );
      const authorized = Boolean(
        normalizedSourceStem
        && !callerSuppliedTarget
        && selectionAuthority === "andrews-lesson22-rule-derivation"
        && sourceAnalysis.authorizationStatus === "authorized"
        && derivedImpersonalStem
      );
      const blockReason = authorized
        ? ""
        : !normalizedSourceStem
          ? "lesson22-tla-impersonal-source-stem-required"
          : callerSuppliedTarget
            ? "lesson22-tla-impersonal-caller-supplied-target-not-authorized"
            : selectionAuthority !== "andrews-lesson22-rule-derivation"
              ? "lesson22-tla-impersonal-typed-voice-selection-required"
              : sourceAnalysis.blockReason;
      return {
        kind: "classical-nahuatl-impersonal-vnc-tla-impersonal-stem-record",
        version: 1,
        lesson: "Andrews Lesson 22.6",
        sourceAuthority: "productive typed Source rule; Canvas examples provide defaults and exceptions, not gates",
        sourceDocument: CLASSICAL_NAHUATL_VNC_SLOT_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason,
        sourceStem: normalizedSourceStem,
        impersonalStem: authorized ? derivedImpersonalStem : "",
        requestedImpersonalStem: callerSuppliedTarget,
        sourceAnalysis,
        realizationRuleId: sourceAnalysis.realizationRuleId,
        selectionAuthority,
        formulaArtifact: normalizeClassicalNahuatlVncSlotCarrier(formulaArtifact),
        surfaceArtifact: normalizeClassicalNahuatlVncSlotCarrier(surfaceArtifact),
        formulaArtifactAuthority: false,
        surfaceArtifactAuthority: false,
        callerSuppliedTargetAuthority: false,
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false
      };
    }
    function isClassicalNahuatlTlaImpersonalStemRecord(record = null, sourceStem = "") {
      const normalizedSourceStem = normalizeClassicalNahuatlVncSlotStem(sourceStem);
      const rebuilt = buildClassicalNahuatlTlaImpersonalStemRecord(
        normalizedSourceStem,
        { selectionAuthority: "andrews-lesson22-rule-derivation" }
      );
      return Boolean(
        record
        && record.kind === "classical-nahuatl-impersonal-vnc-tla-impersonal-stem-record"
        && record.authorizationStatus === "authorized"
        && record.selectionAuthority === "andrews-lesson22-rule-derivation"
        && record.sourceStem === normalizedSourceStem
        && record.requestedImpersonalStem === ""
        && record.impersonalStem === rebuilt.impersonalStem
        && record.realizationRuleId === rebuilt.realizationRuleId
        && record.sourceAnalysis?.authorizationStatus === "authorized"
        && JSON.stringify(record.sourceAnalysis) === JSON.stringify(rebuilt.sourceAnalysis)
        && record.formulaArtifactAuthority === false
        && record.surfaceArtifactAuthority === false
        && record.callerSuppliedTargetAuthority === false
      );
    }
    const CLASSICAL_NAHUATL_ORDERED_VOICE_LAYER_ROUTE_SPECS = Object.freeze([Object.freeze({
      routeId: "cn-l38-yohua-doubly-impersonal",
      label: "inherent impersonal → nonactive lō",
      sourceStem: "yohua",
      sourceVoice: "lexical-source",
      sourceImpersonalDepth: 0,
      sourceValence: "intransitive",
      andrewsSection: "38.1.1.a",
      steps: Object.freeze([Object.freeze({
        operationId: "inherent-impersonal",
        targetStem: "yohua",
        targetVoice: "inherent-impersonal",
        impersonalDepth: 1
      }), Object.freeze({
        operationId: "nonactive-lō",
        targetStem: "yohua-lō",
        targetVoice: "impersonal",
        impersonalDepth: 2,
        suffixFamily: "lō",
        ruleId: "cn-l38-1-yohua-lo-source"
      })])
    }), Object.freeze({
      routeId: "cn-l38-yohua-triply-impersonal",
      label: "inherent impersonal → tla-impersonal → nonactive lō",
      sourceStem: "yohua",
      sourceVoice: "lexical-source",
      sourceImpersonalDepth: 0,
      sourceValence: "intransitive",
      andrewsSection: "38.1.1.a",
      steps: Object.freeze([Object.freeze({
        operationId: "inherent-impersonal",
        targetStem: "yohua",
        targetVoice: "inherent-impersonal",
        impersonalDepth: 1
      }), Object.freeze({
        operationId: "tla-impersonal",
        targetStem: "tla-yohua",
        targetVoice: "tla-impersonal",
        impersonalDepth: 2
      }), Object.freeze({
        operationId: "nonactive-lō",
        targetStem: "tla-yohua-lō",
        targetVoice: "impersonal",
        impersonalDepth: 3,
        suffixFamily: "lō",
        ruleId: "cn-l38-1-tla-yohua-lo-source"
      })])
    }), Object.freeze({
      routeId: "cn-l38-tla-hyaya-doubly-impersonal",
      label: "tla-impersonal → nonactive lō",
      sourceStem: "ihyā-ya",
      sourceVoice: "active",
      sourceImpersonalDepth: 0,
      sourceValence: "intransitive",
      andrewsSection: "38.1.1.a",
      steps: Object.freeze([Object.freeze({
        operationId: "tla-impersonal",
        targetStem: "tla-hyā-ya",
        targetVoice: "tla-impersonal",
        impersonalDepth: 1
      }), Object.freeze({
        operationId: "nonactive-lō",
        targetStem: "tla-hyā-lō",
        targetVoice: "impersonal",
        impersonalDepth: 2,
        suffixFamily: "lō",
        ruleId: "cn-l38-1-tla-hyaya-lo-source"
      })])
    }), Object.freeze({
      routeId: "cn-l38-tla-coloti-doubly-impersonal",
      label: "typed tla-impersonal source → nonactive ō",
      sourceStem: "tla-cōl-ō-ti",
      sourceVoice: "tla-impersonal",
      sourceImpersonalDepth: 1,
      sourceValence: "intransitive",
      andrewsSection: "38.1.1.b",
      steps: Object.freeze([Object.freeze({
        operationId: "nonactive-ō",
        targetStem: "tla-cōl-ō-ch-ō",
        targetVoice: "impersonal",
        impersonalDepth: 2,
        suffixFamily: "ō",
        ruleId: "cn-l38-1-tla-coloti-cho-source"
      })])
    }), Object.freeze({
      routeId: "cn-l38-tla-neci-doubly-impersonal",
      label: "tla-impersonal → nonactive ō",
      sourceStem: "nēci",
      sourceVoice: "active",
      sourceImpersonalDepth: 0,
      sourceValence: "intransitive",
      andrewsSection: "38.1.1.b",
      steps: Object.freeze([Object.freeze({
        operationId: "tla-impersonal",
        targetStem: "tla-nēci",
        targetVoice: "tla-impersonal",
        impersonalDepth: 1
      }), Object.freeze({
        operationId: "nonactive-ō",
        targetStem: "tla-nēx-ō",
        targetVoice: "impersonal",
        impersonalDepth: 2,
        suffixFamily: "ō",
        ruleId: "cn-l38-1-tla-neci-nexo-source"
      })])
    }), Object.freeze({
      routeId: "cn-l38-pachoia-impersonalized-passive",
      label: "passive → impersonalized passive",
      sourceStem: "pach-o-ā",
      sourceVoice: "active",
      sourceImpersonalDepth: 0,
      sourceValence: "specific-projective",
      andrewsSection: "38.1.4.a",
      steps: Object.freeze([Object.freeze({
        operationId: "passive-lō",
        targetStem: "pach-ō-lō",
        targetVoice: "passive",
        impersonalDepth: 0,
        suffixFamily: "lō",
        ruleId: "cn-l38-1-pachoia-passive-lo-source"
      }), Object.freeze({
        operationId: "impersonalize-passive",
        targetStem: "tla-pach-ō-lō",
        targetVoice: "impersonalized-passive",
        impersonalDepth: 1
      })])
    }), Object.freeze({
      routeId: "cn-l38-titlani-impersonalized-passive",
      label: "passive → impersonalized passive",
      sourceStem: "tītlani",
      sourceVoice: "active",
      sourceImpersonalDepth: 0,
      sourceValence: "specific-projective",
      andrewsSection: "38.1.4.b",
      steps: Object.freeze([Object.freeze({
        operationId: "passive-ō",
        targetStem: "tītlan-ō",
        targetVoice: "passive",
        impersonalDepth: 0,
        suffixFamily: "ō",
        ruleId: "cn-l37-9-titlani-o-source"
      }), Object.freeze({
        operationId: "impersonalize-passive",
        targetStem: "tla-tītlan-ō",
        targetVoice: "impersonalized-passive",
        impersonalDepth: 1
      })])
    }), Object.freeze({
      routeId: "cn-l38-ahci-impersonalized-passive",
      label: "passive → impersonalized passive",
      sourceStem: "ahci",
      sourceVoice: "active",
      sourceImpersonalDepth: 0,
      sourceValence: "specific-projective",
      andrewsSection: "38.1.4.c",
      steps: Object.freeze([Object.freeze({
        operationId: "passive-hua",
        targetStem: "ahxī-hua",
        targetVoice: "passive",
        impersonalDepth: 0,
        suffixFamily: "hua",
        ruleId: "cn-l20-6-ahci"
      }), Object.freeze({
        operationId: "impersonalize-passive",
        targetStem: "tla-ahxi-hua",
        targetVoice: "impersonalized-passive",
        impersonalDepth: 1
      })])
    })]);
    function isClassicalNahuatlOrderedVoiceLayerIntermediateStem(sourceStem = "") {
      const normalizedSourceStem = normalizeClassicalNahuatlVncSlotStem(sourceStem);
      if (!normalizedSourceStem) {
        return false;
      }
      return CLASSICAL_NAHUATL_ORDERED_VOICE_LAYER_ROUTE_SPECS.some(route => route.sourceStem === normalizedSourceStem && !["active", "lexical-source"].includes(route.sourceVoice) || route.steps.some((step, index) => index + 1 < route.steps.length && step.targetStem === normalizedSourceStem && step.targetStem !== route.sourceStem));
    }
    function getClassicalNahuatlOrderedVoiceLayerOptions(sourceStem = "") {
      const normalizedSourceStem = normalizeClassicalNahuatlVncSlotStem(sourceStem);
      const options = CLASSICAL_NAHUATL_ORDERED_VOICE_LAYER_ROUTE_SPECS.filter(route => route.sourceStem === normalizedSourceStem).map(route => Object.freeze({
        kind: "classical-nahuatl-ordered-voice-layer-option",
        routeId: route.routeId,
        label: route.label,
        sourceStem: route.sourceStem,
        targetStem: route.steps[route.steps.length - 1]?.targetStem || route.sourceStem,
        layerCount: route.steps.length,
        operations: Object.freeze(route.steps.map(step => step.operationId)),
        andrewsSection: route.andrewsSection,
        selectionAuthority: "engine-owned-andrews-route-id",
        callerSuppliedTargetAllowed: false
      }));
      return Object.freeze({
        kind: "classical-nahuatl-ordered-voice-layer-option-inventory",
        version: 1,
        sourceAuthority: "Andrews Lessons 22 and 38 ordered voice derivations",
        sourceDocument: CLASSICAL_NAHUATL_VNC_SLOT_SOURCE_DOCUMENT,
        sourceStem: normalizedSourceStem,
        authorizationStatus: normalizedSourceStem && options.length ? "authorized" : "blocked",
        blockReason: !normalizedSourceStem ? "ordered-voice-layer-source-stem-required" : options.length ? "" : "ordered-voice-layer-route-not-attested",
        options: Object.freeze(options),
        selectorRequired: options.length > 1,
        callerSuppliedTargetAllowed: false
      });
    }
    function getClassicalNahuatlOrderedVoiceLayerCascadeOptions(sourceStem = "", appliedOperations = [], canonicalPassiveApplicationFrame = undefined) {
      const normalizedSourceStem = normalizeClassicalNahuatlVncSlotStem(sourceStem);
      const normalizedOperations = Array.isArray(appliedOperations) ? appliedOperations.map(operation => normalizeClassicalNahuatlVncSlotCarrier(operation)).filter(Boolean) : [];
      const matchingRoutes = CLASSICAL_NAHUATL_ORDERED_VOICE_LAYER_ROUTE_SPECS.filter(route => route.sourceStem === normalizedSourceStem && normalizedOperations.every((operation, index) => route.steps[index]?.operationId === operation));
      if (canonicalPassiveApplicationFrame !== undefined) {
        const record = canonicalPassiveApplicationFrame?.resultFrame?.selectedMachineryFrame?.nonactiveStemRecord;
        const operations = [`passive-${record?.suffixFamily || ""}`, "impersonalize-passive"];
        const chain = deriveClassicalNahuatlOrderedVoiceLayerChain(normalizedSourceStem, {
          operations, canonicalPassiveApplicationFrame,
        });
        const prefixValid = Array.isArray(appliedOperations)
          && appliedOperations.length === normalizedOperations.length
          && normalizedOperations.length > 0 && normalizedOperations.length <= operations.length
          && normalizedOperations.every((operation, index) => operation === operations[index]);
        if (!isClassicalNahuatlOrderedVoiceLayerChain(chain, normalizedSourceStem) || !prefixValid) {
          return Object.freeze({kind: "classical-nahuatl-ordered-voice-layer-cascade-inventory", version: 1,
            sourceStem: normalizedSourceStem, appliedOperations: Object.freeze(normalizedOperations),
            authorizationStatus: "blocked", blockReason: "exact-passive-application-and-compatible-operation-prefix-required",
            options: Object.freeze([]), completeRouteIds: Object.freeze([]), mayStopAtCurrentLayer: false,
            callerSuppliedTargetAllowed: false});
        }
        if (!matchingRoutes.length) {
          const next = chain.layers[normalizedOperations.length];
          const options = next ? [Object.freeze({kind: "classical-nahuatl-ordered-voice-layer-cascade-option",
            operationId: next.operationId, sourceStem: next.sourceStem, targetStem: next.targetStem,
            targetVoice: next.targetVoice, impersonalDepth: next.impersonalDepth,
            suffixFamily: next.suffixFamily, selectionAuthority: "owner-issued-passive-continuation",
            callerSuppliedTargetAllowed: false})] : [];
          return Object.freeze({kind: "classical-nahuatl-ordered-voice-layer-cascade-inventory", version: 1,
            sourceStem: normalizedSourceStem, appliedOperations: Object.freeze(normalizedOperations),
            authorizationStatus: "authorized", blockReason: "", canonicalVncResult: canonicalPassiveApplicationFrame,
            currentStem: chain.layers[normalizedOperations.length - 1].targetStem,
            options: Object.freeze(options), completeRouteIds: Object.freeze(next ? [] : [chain.routeId]),
            mayStopAtCurrentLayer: true, callerSuppliedTargetAllowed: false});
        }
      }
      const currentStepIndex = normalizedOperations.length - 1;
      const currentStems = Array.from(new Set(matchingRoutes.map(route => currentStepIndex >= 0 ? route.steps[currentStepIndex]?.targetStem : route.sourceStem).filter(Boolean)));
      const nextOptionsByKey = new Map();
      matchingRoutes.forEach(route => {
        const step = route.steps[normalizedOperations.length];
        if (!step) {
          return;
        }
        const key = `${step.operationId}::${step.targetStem}`;
        if (!nextOptionsByKey.has(key)) {
          nextOptionsByKey.set(key, Object.freeze({
            kind: "classical-nahuatl-ordered-voice-layer-cascade-option",
            operationId: step.operationId,
            sourceStem: currentStems[0] || normalizedSourceStem,
            targetStem: step.targetStem,
            targetVoice: step.targetVoice,
            impersonalDepth: step.impersonalDepth,
            suffixFamily: step.suffixFamily || "",
            selectionAuthority: "engine-owned-andrews-next-operation",
            callerSuppliedTargetAllowed: false
          }));
        }
      });
      const completeRouteIds = matchingRoutes.filter(route => route.steps.length === normalizedOperations.length).map(route => route.routeId);
      return Object.freeze({
        kind: "classical-nahuatl-ordered-voice-layer-cascade-inventory",
        version: 1,
        sourceAuthority: "Andrews ordered voice-layer derivation",
        sourceDocument: CLASSICAL_NAHUATL_VNC_SLOT_SOURCE_DOCUMENT,
        sourceStem: normalizedSourceStem,
        appliedOperations: Object.freeze(normalizedOperations),
        currentStem: currentStems.length === 1 ? currentStems[0] : "",
        authorizationStatus: normalizedSourceStem && matchingRoutes.length ? "authorized" : "blocked",
        blockReason: !normalizedSourceStem ? "ordered-voice-layer-source-stem-required" : matchingRoutes.length ? "" : "ordered-voice-layer-operation-prefix-not-authorized",
        options: Object.freeze(Array.from(nextOptionsByKey.values())),
        completeRouteIds: Object.freeze(completeRouteIds),
        mayStopAtCurrentLayer: normalizedOperations.length > 0,
        callerSuppliedTargetAllowed: false
      });
    }
    function getClassicalNahuatlOrderedVoiceLayerSignature(frame = null) {
      return JSON.stringify({
        kind: frame?.kind || "",
        routeId: frame?.routeId || "",
        sourceStem: frame?.sourceStem || "",
        targetStem: frame?.targetStem || "",
        operations: Array.isArray(frame?.operations) ? frame.operations : [],
        completeRoute: frame?.completeRoute === true,
        layerCount: frame?.layerCount || 0,
        layers: (Array.isArray(frame?.layers) ? frame.layers : []).map(layer => ({
          layerIndex: layer.layerIndex,
          operationId: layer.operationId,
          sourceStem: layer.sourceStem,
          targetStem: layer.targetStem,
          sourceFrameKind: layer.sourceFrameKind,
          sourceFrameTargetStem: layer.sourceFrame?.targetStem,
          impersonalDepth: layer.impersonalDepth
        }))
      });
    }
    function deriveClassicalNahuatlNonactiveCoreVoiceLayerChain(sourceStem, record, operations, artifactsRequested, passiveApplication = null) {
      const expectedOperations = [`passive-${record?.suffixFamily || ""}`, "impersonalize-passive"];
      const authorized = isClassicalNahuatlNonactiveStemRecord(record, sourceStem)
        && (passiveApplication || record.sourceIdentityFrame.sourceValence === "projective-human")
        && operations.length === expectedOperations.length
        && operations.every((operation, index) => operation === expectedOperations[index])
        && !artifactsRequested;
      if (!authorized) return Object.freeze({
        kind: "classical-nahuatl-ordered-voice-layer-chain-frame",
        version: 1, authorizationStatus: "blocked",
        blockReason: "issued-human-nonactive-core-and-complete-passive-chain-required",
        sourceStem, targetStem: "", sourceCapability: "nonactive-core",
        finiteVncSourceEligible: false, completeRoute: false,
        operations: Object.freeze(operations), layers: Object.freeze([]),
        callerSuppliedTargetAllowed: false, callerSuppliedLayersAllowed: false,
        formulaArtifactAuthority: false, surfaceArtifactAuthority: false
      });
      // §38.1.4 distinguishes the ultimate tē pattern from the specific
      // human object of the abstract active core feeding the passive. No
      // finite person/reference is asserted; Lesson 20 owns the morphology.
      const seed = Object.freeze({
        kind: "classical-nahuatl-ordered-voice-layer-seed-frame",
        authorizationStatus: "authorized", sourceStem, targetStem: sourceStem,
        voice: "active", sourceValence: "specific-projective", impersonalDepth: 0,
        sourceObjectKind: "specific-projective", sourceObjectHumanness: passiveApplication ? "unclaimed" : "human",
        sourceObjectPerson: "", sourceObjectReferent: "",
        ultimateSourceValence: passiveApplication ? record.sourceIdentityFrame.sourceValence : "projective-human",
        canonicalNonactiveStemRecord: record, specificObjectPassivePrerequisite: true,
        finiteSubjectAsserted: false, participantReferenceAsserted: false,
        sourceAuthority: "Andrews 38.1.4 typed core relation"
      });
      const passive = Object.freeze({
        kind: "classical-nahuatl-ordered-voice-layer-frame", version: 1,
        authorizationStatus: "authorized", layerIndex: 1,
        operationId: expectedOperations[0], sourceFrame: seed, sourceFrameKind: seed.kind,
        sourceStem, targetStem: record.nonactiveStem, targetVoice: "passive",
        suffixFamily: record.suffixFamily, ruleId: record.selectedRuleId,
        canonicalNonactiveStemRecord: record, impersonalDepth: 0,
        consumesPreviousTypedOutput: true,
        sourceAuthority: "Andrews 20 and 38.1.4 owner-issued nonactive core",
        callerSuppliedTargetAllowed: false, formulaArtifactAuthority: false,
        surfaceArtifactAuthority: false
      });
      const impersonal = Object.freeze({
        kind: "classical-nahuatl-ordered-voice-layer-frame", version: 1,
        authorizationStatus: "authorized", layerIndex: 2,
        operationId: expectedOperations[1], sourceFrame: passive, sourceFrameKind: passive.kind,
        sourceStem: passive.targetStem, targetStem: `tla-${passive.targetStem}`,
        targetVoice: "impersonalized-passive", suffixFamily: "", ruleId: "cn-l38-1-4-impersonalize-passive-core",
        impersonalDepth: 1, consumesPreviousTypedOutput: true,
        sourceAuthority: "Andrews 38.1.4 human impersonalized passive core",
        callerSuppliedTargetAllowed: false, formulaArtifactAuthority: false,
        surfaceArtifactAuthority: false
      });
      const chain = {
        kind: "classical-nahuatl-ordered-voice-layer-chain-frame", version: 1,
        authorizationStatus: "authorized", blockReason: "",
        routeId: "cn-l38-productive-human-impersonalized-passive-core",
        routeFamilyIds: Object.freeze([]), andrewsSection: "38.1.4",
        sourceAuthority: "Andrews typed nonactive core and ordered voice derivation",
        sourceDocument: CLASSICAL_NAHUATL_VNC_SLOT_SOURCE_DOCUMENT,
        sourceStem, targetStem: impersonal.targetStem, sourceVoice: "active",
        targetVoice: "impersonalized-passive", sourceValence: "specific-projective",
        sourceObjectKind: "specific-projective", sourceObjectHumanness: passiveApplication ? "unclaimed" : "human",
        sourceObjectPerson: "", sourceObjectReferent: "",
        ultimateSourceValence: passiveApplication ? record.sourceIdentityFrame.sourceValence : "projective-human",
        sourceCapability: passiveApplication ? "passive-application" : "nonactive-core", finiteVncSourceEligible: Boolean(passiveApplication),
        canonicalNonactiveStemRecord: record, canonicalVncResult: passiveApplication,
        specificObjectPassivePrerequisite: true,
        finiteSubjectAsserted: false, participantReferenceAsserted: false,
        label: expectedOperations.join(" → "), operations: Object.freeze(expectedOperations),
        layerCount: 2, impersonalDepth: 1, completeRoute: true,
        layers: Object.freeze([passive, impersonal]), finalLayerFrame: impersonal,
        sourceTargetContinuity: true, requestedArtifactsDiscarded: false,
        callerSuppliedTargetAllowed: false, callerSuppliedLayersAllowed: false,
        formulaArtifactAuthority: false, surfaceArtifactAuthority: false
      };
      chain.canonicalSignature = getClassicalNahuatlOrderedVoiceLayerSignature(chain);
      Object.freeze(chain);
      classicalNahuatlNonactiveCoreVoiceChainReceipts.set(chain, Object.freeze({
        record, seed, passive, impersonal, passiveApplication, signature: chain.canonicalSignature
      }));
      return chain;
    }
    function deriveClassicalNahuatlOrderedVoiceLayerChain(sourceStem = "", {
      routeId = "",
      operations = null,
      targetStem = "",
      layers = null,
      formulaArtifact = "",
      surfaceArtifact = "",
      canonicalNonactiveStemRecord = undefined,
      canonicalPassiveApplicationFrame = undefined
    } = {}) {
      const normalizedSourceStem = normalizeClassicalNahuatlVncSlotStem(sourceStem);
      const normalizedRouteId = normalizeClassicalNahuatlVncSlotCarrier(routeId);
      const normalizedOperations = Array.isArray(operations) ? operations.map(operation => normalizeClassicalNahuatlVncSlotCarrier(operation)).filter(Boolean) : [];
      if (canonicalPassiveApplicationFrame !== undefined) {
        const parent = canonicalPassiveApplicationFrame;
        const runtime = getClassicalNahuatlVncLayerRuntimeTarget();
        const record = parent?.resultFrame?.selectedMachineryFrame?.nonactiveStemRecord;
        const exactPassive = runtime?.isClassicalNahuatlVncApplicationFrame?.(parent) === true
          && parent.authorizationStatus === "authorized"
          && parent.normalizedRequest?.sourceStem === normalizedSourceStem
          && parent.resultFrame?.selectedVoiceOperation === "passive"
          && isClassicalNahuatlNonactiveStemRecord(record, normalizedSourceStem)
          && (canonicalNonactiveStemRecord === undefined || canonicalNonactiveStemRecord === record);
        return deriveClassicalNahuatlNonactiveCoreVoiceLayerChain(
          normalizedSourceStem, exactPassive ? record : null, normalizedOperations,
          !exactPassive || Boolean(routeId || targetStem || layers !== null || formulaArtifact || surfaceArtifact)
            || !Array.isArray(operations) || operations.length !== normalizedOperations.length,
          exactPassive ? parent : null,
        );
      }
      if (canonicalNonactiveStemRecord !== undefined) {
        return deriveClassicalNahuatlNonactiveCoreVoiceLayerChain(
          normalizedSourceStem, canonicalNonactiveStemRecord, normalizedOperations,
          Boolean(routeId || targetStem || layers !== null || formulaArtifact || surfaceArtifact)
            || !Array.isArray(operations) || operations.length !== normalizedOperations.length
        );
      }
      const route = normalizedRouteId ? CLASSICAL_NAHUATL_ORDERED_VOICE_LAYER_ROUTE_SPECS.find(candidate => candidate.sourceStem === normalizedSourceStem && candidate.routeId === normalizedRouteId) || null : CLASSICAL_NAHUATL_ORDERED_VOICE_LAYER_ROUTE_SPECS.find(candidate => candidate.sourceStem === normalizedSourceStem && normalizedOperations.length > 0 && normalizedOperations.every((operation, index) => candidate.steps[index]?.operationId === operation)) || null;
      const selectedSteps = route ? normalizedRouteId ? route.steps : route.steps.slice(0, normalizedOperations.length) : [];
      if (!route || !selectedSteps.length) {
        return Object.freeze({
          kind: "classical-nahuatl-ordered-voice-layer-chain-frame",
          version: 1,
          authorizationStatus: "blocked",
          blockReason: !normalizedSourceStem ? "ordered-voice-layer-source-stem-required" : "ordered-voice-layer-engine-route-required",
          routeId: normalizedRouteId,
          sourceStem: normalizedSourceStem,
          targetStem: "",
          operations: Object.freeze(normalizedOperations),
          completeRoute: false,
          layers: Object.freeze([]),
          callerSuppliedTargetAllowed: false,
          callerSuppliedLayersAllowed: false,
          formulaArtifactAuthority: false,
          surfaceArtifactAuthority: false
        });
      }
      let previousFrame = Object.freeze({
        kind: "classical-nahuatl-ordered-voice-layer-seed-frame",
        authorizationStatus: "authorized",
        sourceStem: normalizedSourceStem,
        targetStem: normalizedSourceStem,
        voice: route.sourceVoice,
        impersonalDepth: route.sourceImpersonalDepth,
        sourceValence: route.sourceValence,
        sourceAuthority: "Andrews typed source frame"
      });
      const derivedLayers = selectedSteps.map((step, index) => {
        const sourceFrame = previousFrame;
        const layer = Object.freeze({
          kind: "classical-nahuatl-ordered-voice-layer-frame",
          version: 1,
          authorizationStatus: "authorized",
          routeId: route.routeId,
          layerIndex: index + 1,
          operationId: step.operationId,
          sourceFrame,
          sourceFrameKind: sourceFrame.kind,
          sourceStem: sourceFrame.targetStem,
          targetStem: step.targetStem,
          targetVoice: step.targetVoice,
          suffixFamily: step.suffixFamily || "",
          ruleId: step.ruleId || "",
          impersonalDepth: step.impersonalDepth,
          consumesPreviousTypedOutput: sourceFrame.authorizationStatus === "authorized" && Boolean(sourceFrame.targetStem),
          sourceAuthority: `Andrews ${route.andrewsSection}`,
          callerSuppliedTargetAllowed: false,
          formulaArtifactAuthority: false,
          surfaceArtifactAuthority: false
        });
        previousFrame = layer;
        return layer;
      });
      const chain = {
        kind: "classical-nahuatl-ordered-voice-layer-chain-frame",
        version: 1,
        sourceAuthority: "Andrews ordered voice-layer derivation",
        sourceDocument: CLASSICAL_NAHUATL_VNC_SLOT_SOURCE_DOCUMENT,
        authorizationStatus: "authorized",
        blockReason: "",
        routeId: selectedSteps.length === route.steps.length ? route.routeId : "",
        routeFamilyIds: Object.freeze(CLASSICAL_NAHUATL_ORDERED_VOICE_LAYER_ROUTE_SPECS.filter(candidate => candidate.sourceStem === normalizedSourceStem && selectedSteps.every((step, index) => candidate.steps[index]?.operationId === step.operationId)).map(candidate => candidate.routeId)),
        label: selectedSteps.map(step => step.operationId).join(" → "),
        andrewsSection: route.andrewsSection,
        sourceStem: normalizedSourceStem,
        targetStem: previousFrame.targetStem,
        sourceVoice: route.sourceVoice,
        targetVoice: previousFrame.targetVoice,
        sourceValence: route.sourceValence,
        operations: Object.freeze(derivedLayers.map(layer => layer.operationId)),
        layerCount: derivedLayers.length,
        impersonalDepth: previousFrame.impersonalDepth,
        completeRoute: selectedSteps.length === route.steps.length,
        layers: Object.freeze(derivedLayers),
        finalLayerFrame: previousFrame,
        sourceTargetContinuity: derivedLayers.every((layer, index) => layer.sourceStem === (index === 0 ? normalizedSourceStem : derivedLayers[index - 1].targetStem) && layer.sourceFrame === (index === 0 ? derivedLayers[0].sourceFrame : derivedLayers[index - 1])),
        requestedArtifactsDiscarded: Boolean(normalizeClassicalNahuatlVncSlotCarrier(formulaArtifact) || normalizeClassicalNahuatlVncSlotCarrier(surfaceArtifact) || normalizeClassicalNahuatlVncSlotStem(targetStem) || Array.isArray(layers)),
        callerSuppliedTargetAllowed: false,
        callerSuppliedLayersAllowed: false,
        formulaArtifactAuthority: false,
        surfaceArtifactAuthority: false
      };
      chain.canonicalSignature = getClassicalNahuatlOrderedVoiceLayerSignature(chain);
      return Object.freeze(chain);
    }
    function isClassicalNahuatlOrderedVoiceLayerChain(frame = null, sourceStem = "") {
      const normalizedSourceStem = normalizeClassicalNahuatlVncSlotStem(sourceStem || frame?.sourceStem || "");
      if (!frame || frame.authorizationStatus !== "authorized" || frame.sourceStem !== normalizedSourceStem) {
        return false;
      }
      if (frame.sourceCapability === "nonactive-core" || frame.canonicalNonactiveStemRecord) {
        const receipt = classicalNahuatlNonactiveCoreVoiceChainReceipts.get(frame);
        return Boolean(receipt && Object.isFrozen(frame)
          && isClassicalNahuatlNonactiveStemRecord(receipt.record, normalizedSourceStem)
          && (receipt.passiveApplication
            ? getClassicalNahuatlVncLayerRuntimeTarget()?.isClassicalNahuatlVncApplicationFrame?.(receipt.passiveApplication) === true
              && receipt.passiveApplication.authorizationStatus === "authorized"
              && receipt.passiveApplication.normalizedRequest?.sourceStem === normalizedSourceStem
              && receipt.passiveApplication.resultFrame?.selectedVoiceOperation === "passive"
              && receipt.passiveApplication.resultFrame.selectedMachineryFrame.nonactiveStemRecord === receipt.record
            : receipt.record.sourceIdentityFrame.sourceValence === "projective-human")
          && frame.canonicalNonactiveStemRecord === receipt.record
          && frame.layers[0] === receipt.passive && frame.layers[1] === receipt.impersonal
          && frame.layers.length === 2 && frame.finalLayerFrame === receipt.impersonal
          && receipt.passive.sourceFrame === receipt.seed
          && receipt.seed.canonicalNonactiveStemRecord === receipt.record
          && [receipt.seed, frame].every(source =>
            source.sourceValence === "specific-projective"
            && source.sourceObjectKind === "specific-projective"
            && source.sourceObjectHumanness === (receipt.passiveApplication ? "unclaimed" : "human")
            && source.sourceObjectPerson === "" && source.sourceObjectReferent === ""
            && source.ultimateSourceValence === (receipt.passiveApplication ? receipt.record.sourceIdentityFrame.sourceValence : "projective-human"))
          && receipt.passive.canonicalNonactiveStemRecord === receipt.record
          && receipt.passive.targetStem === receipt.record.nonactiveStem
          && receipt.passive.suffixFamily === receipt.record.suffixFamily
          && receipt.impersonal.sourceFrame === receipt.passive
          && receipt.impersonal.targetStem === `tla-${receipt.record.nonactiveStem}`
          && frame.canonicalSignature === receipt.signature
          && getClassicalNahuatlOrderedVoiceLayerSignature(frame) === receipt.signature
          && frame.completeRoute === true && frame.sourceTargetContinuity === true
          && frame.sourceCapability === (receipt.passiveApplication ? "passive-application" : "nonactive-core")
          && frame.finiteVncSourceEligible === Boolean(receipt.passiveApplication)
          && frame.canonicalVncResult === receipt.passiveApplication && frame.finiteSubjectAsserted === false
          && frame.participantReferenceAsserted === false
          && frame.formulaArtifactAuthority === false && frame.surfaceArtifactAuthority === false);
      }
      const rebuilt = deriveClassicalNahuatlOrderedVoiceLayerChain(normalizedSourceStem, frame.completeRoute === true ? {
        routeId: frame.routeId
      } : {
        operations: frame.operations
      });
      return Boolean(rebuilt.authorizationStatus === "authorized" && frame.canonicalSignature === rebuilt.canonicalSignature && getClassicalNahuatlOrderedVoiceLayerSignature(frame) === rebuilt.canonicalSignature && frame.sourceTargetContinuity === true && frame.formulaArtifactAuthority === false && frame.surfaceArtifactAuthority === false);
    }
    const CLASSICAL_NAHUATL_LESSON23_OBJECT_SEQUENCE_PRIORITY = Object.freeze({
      "specific-projective": 1,
      reflexive: 2,
      "nonspecific-human": 3,
      "nonspecific-nonhuman": 4
    });
    const CLASSICAL_NAHUATL_LESSON23_OBJECT_GOVERNORS = Object.freeze(["directive", "causative", "applicative", "lexical"]);
    const CLASSICAL_NAHUATL_LESSON23_MULTIPLE_OBJECT_VNC_FRAME_KINDS = Object.freeze([
      "classical-nahuatl-multiple-object-vnc-multiple-object-vnc-machinery-frame",
      "classical-nahuatl-voice-object-vnc-derived-multiple-object-vnc-machinery-frame",
      "classical-nahuatl-vnc-derived-machinery-frame"
    ]);
    function getClassicalNahuatlReflexiveVa1(subject = "") {
      const normalizedSubject = normalizeClassicalNahuatlVncSlotCarrier(subject);
      if (normalizedSubject === "1sg") {
        return "n";
      }
      if (normalizedSubject === "1pl") {
        return "t";
      }
      return "m";
    }
    function getClassicalNahuatlSpecificDyad(objectPerson = "", {
      sounded = true,
      soundedSpecificPerson = "",
      leftCarrier = "",
      rightCarrier = ""
    } = {}) {
      const normalizedPerson = normalizeClassicalNahuatlVncSlotCarrier(objectPerson);
      if (!sounded) {
        return normalizedPerson === "3pl" && soundedSpecificPerson !== "3pl" ? {
          va1: "0",
          va2: "im",
          carrier: "0-im",
          silencingRule: "shuntline-third-plural-keeps-number"
        } : {
          va1: "0",
          va2: "0",
          carrier: "0-0",
          silencingRule: "incompatible-specific-projective-silenced"
        };
      }
      const fixed = {
        "1sg": ["n", "ēch"],
        "1pl": ["t", "ēch"],
        "2sg": ["m", "itz"],
        "2pl": ["am", "ēch"],
        "3pl": ["qu", "im"]
      }[normalizedPerson];
      if (fixed) {
        return {
          va1: fixed[0],
          va2: fixed[1],
          carrier: `${fixed[0]}-${fixed[1]}`,
          silencingRule: ""
        };
      }
      const leftSound = getClassicalNahuatlVncSlotLastSound(leftCarrier);
      const rightSound = getClassicalNahuatlVncSlotFirstSound(rightCarrier);
      const va1 = rightSound === "e" || rightSound === "i" ? "qu" : isClassicalNahuatlVncSlotVowelSound(leftSound) || isClassicalNahuatlVncSlotVowelSound(rightSound) ? "c" : "qui";
      return {
        va1,
        va2: "0",
        carrier: `${va1}-0`,
        silencingRule: ""
      };
    }
    function getClassicalNahuatlPositionPreviewCarrier(position = {}, subject = "") {
      if (
        position.objectKind === "specific-projective"
        && position.silentSpecificObject === true
      ) {
        return "⎕-0";
      }
      if (position.objectKind === "reflexive") {
        return position.prominence === "mainline" || normalizeClassicalNahuatlVncSlotCarrier(position.objectPerson) === normalizeClassicalNahuatlVncSlotCarrier(subject) ? `${getClassicalNahuatlReflexiveVa1(subject)}-o` : "ne";
      }
      if (position.objectKind === "nonspecific-human") {
        return "tē";
      }
      if (position.objectKind === "nonspecific-nonhuman") {
        return "tla";
      }
      const morphologicalPerson = position.morphologicalObjectPerson || position.objectPerson;
      if (morphologicalPerson === "3sg") {
        return "c-0";
      }
      return getClassicalNahuatlSpecificDyad(morphologicalPerson).carrier;
    }
    function buildClassicalNahuatlObjectGovernorUnitFrame(request = {}, {
      prominence = ""
    } = {}) {
      const objectId = normalizeClassicalNahuatlVncSlotCarrier(request?.objectId);
      const objectKind = normalizeClassicalNahuatlVncSlotCarrier(request?.objectKind);
      const governor = normalizeClassicalNahuatlVncSlotCarrier(request?.governor);
      const derivationalLevel = Number(request?.derivationalLevel);
      const normalizedProminence = normalizeClassicalNahuatlVncSlotCarrier(prominence);
      const governorRecognized = CLASSICAL_NAHUATL_LESSON23_OBJECT_GOVERNORS.includes(governor);
      const authorized = Boolean(objectId
        && Object.prototype.hasOwnProperty.call(CLASSICAL_NAHUATL_LESSON23_OBJECT_SEQUENCE_PRIORITY, objectKind)
        && governorRecognized
        && Number.isInteger(derivationalLevel)
        && derivationalLevel >= 1
        && derivationalLevel <= 3
        && ["mainline", "shuntline"].includes(normalizedProminence));
      return {
        kind: "classical-nahuatl-multiple-object-vnc-object-governor-unit-frame",
        version: 1,
        sourceAuthority: "ANDREWS_TRANSCRIPTION_CANVAS.md §§23.1, 26.23",
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized ? "" : "lesson23-object-governor-unit-incomplete",
        objectId,
        objectKind,
        objectFunction: governor === "directive" ? "direct" : governor,
        governor,
        requiredStemOperation: governor === "lexical"
          ? "lexical-source-object-binding"
          : governor === "directive"
          ? "lexical-directive-stem"
          : `${governor}-derivational-suffix`,
        derivationalLevel,
        prominence: normalizedProminence,
        discontinuousUnit: governor !== "directive" && governor !== "lexical",
        objectCarrierAuthority: false,
        formulaArtifactAuthority: false,
        surfaceArtifactAuthority: false,
        callerSuppliedGovernorAllowed: false,
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false
      };
    }
    function isClassicalNahuatlObjectGovernorUnitFrame(frame = null) {
      if (!frame
        || frame.kind !== "classical-nahuatl-multiple-object-vnc-object-governor-unit-frame"
        || frame.authorizationStatus !== "authorized"
        || frame.objectCarrierAuthority !== false
        || frame.formulaArtifactAuthority !== false
        || frame.surfaceArtifactAuthority !== false
        || frame.callerSuppliedGovernorAllowed !== false
        || frame.grammarGenerationAllowed !== false
        || frame.surfaceGenerationAllowed !== false) {
        return false;
      }
      const rebuilt = buildClassicalNahuatlObjectGovernorUnitFrame({
        objectId: frame.objectId,
        objectKind: frame.objectKind,
        governor: frame.governor,
        derivationalLevel: frame.derivationalLevel
      }, {
        prominence: frame.prominence
      });
      return JSON.stringify(rebuilt) === JSON.stringify(frame);
    }
    function normalizeClassicalNahuatlObjectClusterParticipant(request = {}) {
      request = request && typeof request === "object" ? request : {};
      const objectPerson = normalizeClassicalNahuatlVncSlotCarrier(request.objectPerson);
      const hasParticipantInput = request.participantFrame != null
        || objectPerson === "3common"
        || ["person", "number", "animacy", "humanness", "referenceId"].some(key =>
          normalizeClassicalNahuatlVncSlotCarrier(request[key]));
      if (!hasParticipantInput) return { authorized: true, fields: {} };
      const suppliedParticipant = request.participantFrame;
      const participant = suppliedParticipant || buildClassicalNahuatlParticipantFrame({
        role: request.governor === "causative" ? "causee" : "object",
        agreement: objectPerson,
        person: request.person,
        number: request.number,
        animacy: request.animacy,
        humanness: request.humanness,
        referenceId: request.referenceId,
      });
      const authorized = isClassicalNahuatlParticipantFrame(participant)
        && Object.isFrozen(participant)
        && ["object", "causee"].includes(participant.role)
        && (!objectPerson || [participant.category, participant.requestedAgreement].includes(objectPerson))
        && (!normalizeClassicalNahuatlVncSlotCarrier(request.morphologicalObjectPerson)
          || request.morphologicalObjectPerson === participant.morphologicalAgreement)
        && ["person", "number", "animacy", "humanness", "referenceId"].every(key =>
          !normalizeClassicalNahuatlVncSlotCarrier(request[key])
          || normalizeClassicalNahuatlVncSlotCarrier(request[key]) === participant[key]);
      if (!authorized) return { authorized: false, fields: {} };
      return { authorized: true, fields: {
        participantFrame: participant,
        referenceId: participant.referenceId,
        person: participant.person,
        number: participant.number,
        animacy: participant.animacy,
        humanness: participant.humanness,
        morphologicalObjectPerson: participant.morphologicalAgreement,
      } };
    }
    function buildClassicalNahuatlObjectClusterFrame(sourceStem = "", {
      subject = "",
      subjectCarrier = "",
      predicateStem = "",
      tense = "",
      objectRequests = [],
      causativeSpecificShuntlineRealization = "",
      rareThirdCausativeMeaningSupported = false,
      exceptionalSuffixOrderAuthorized = false,
      minimumPositionCount = 2,
      maximumPositionCount = 3,
      formulaArtifact = "",
      surfaceArtifact = ""
    } = {}) {
      const normalizedSourceStem = normalizeClassicalNahuatlVncSlotStem(sourceStem);
      const normalizedSubject = normalizeClassicalNahuatlVncSlotCarrier(subject);
      const normalizedPredicateStem = normalizeClassicalNahuatlVncSlotStem(predicateStem || sourceStem);
      const normalizedTense = normalizeClassicalNahuatlVncSlotCarrier(tense);
      const sourceRequests = Array.isArray(objectRequests) ? objectRequests : [];
      const participantInputs = sourceRequests.map(normalizeClassicalNahuatlObjectClusterParticipant);
      const normalizedRequests = sourceRequests.map((request, index) => ({
        objectId: normalizeClassicalNahuatlVncSlotCarrier(request?.objectId || `object-${index + 1}`),
        objectKind: normalizeClassicalNahuatlVncSlotCarrier(request?.objectKind),
        objectPerson: normalizeClassicalNahuatlVncSlotCarrier(request?.objectPerson),
        ...participantInputs[index].fields,
        ...(request?.silentSpecificObject === true
          ? { silentSpecificObject: true }
          : {}),
        ...(request?.objectKind === "reflexive" && request?.shuntlineReflexivePosition === "late"
          ? { shuntlineReflexivePosition: "late" } : {}),
        ...(request?.objectKind === "reflexive" && request?.shuntlineReflexiveBoundaryVariant === "ihyana-contracted"
          ? { shuntlineReflexiveBoundaryVariant: "ihyana-contracted" } : {}),
        ...(request?.mainlineLinearPriority === true
          ? { mainlineLinearPriority: true }
          : {}),
        governor: normalizeClassicalNahuatlVncSlotCarrier(request?.governor),
        derivationalLevel: Number(request?.derivationalLevel)
      }));
      const levels = normalizedRequests.map(request => request.derivationalLevel);
      const objectIds = normalizedRequests.map(request => request.objectId);
      const directiveRequests = normalizedRequests.filter(request => request.governor === "directive");
      const maximumLevel = levels.length ? Math.max(...levels) : 0;
      const expectedLevels = Array.from({ length: normalizedRequests.length }, (_entry, index) => index + 1);
      const levelsAreContiguous = expectedLevels.every(level => levels.includes(level));
      const directiveHistoryAuthorized = directiveRequests.length <= 1
        && directiveRequests.every(request => request.derivationalLevel === 1);
      const orderedHistory = normalizedRequests.slice().sort((left, right) => (
        left.derivationalLevel - right.derivationalLevel
      ));
      const suffixHistory = orderedHistory.filter(request => (
        request.governor !== "directive" && request.governor !== "lexical"
      )).map(request => request.governor);
      const firstApplicativeIndex = suffixHistory.indexOf("applicative");
      const causativeAfterApplicative = firstApplicativeIndex >= 0
        && suffixHistory.slice(firstApplicativeIndex + 1).includes("causative");
      const standardSuffixOrder = !causativeAfterApplicative;
      const suffixHistoryAuthorized = standardSuffixOrder
        || exceptionalSuffixOrderAuthorized === true;
      const newestHistoryPosition = orderedHistory[orderedHistory.length - 1] || null;
      const rareThirdCausativeHistory = orderedHistory.length === 3
        && newestHistoryPosition?.governor === "causative";
      const rareThirdCausativeAuthorized = !rareThirdCausativeHistory
        || rareThirdCausativeMeaningSupported === true;
      const requestShapeAuthorized = participantInputs.every(input => input.authorized) && normalizedRequests.length >= minimumPositionCount && normalizedRequests.length <= maximumPositionCount && normalizedRequests.every(request => request.objectId && Object.prototype.hasOwnProperty.call(CLASSICAL_NAHUATL_LESSON23_OBJECT_SEQUENCE_PRIORITY, request.objectKind) && CLASSICAL_NAHUATL_LESSON23_OBJECT_GOVERNORS.includes(request.governor) && Number.isInteger(request.derivationalLevel) && request.derivationalLevel >= 1 && request.derivationalLevel <= 3 && (request.objectKind !== "specific-projective" || ["1sg", "2sg", "3sg", "3common", "1pl", "2pl", "3pl"].includes(request.objectPerson)) && (request.silentSpecificObject !== true || request.objectKind === "specific-projective" && (request.morphologicalObjectPerson || request.objectPerson) === "3sg") && (request.objectKind !== "reflexive" || !request.objectPerson || request.objectPerson === normalizedSubject || request.objectPerson === "nonfirst-common")) && new Set(objectIds).size === objectIds.length && new Set(levels).size === levels.length && levelsAreContiguous && directiveHistoryAuthorized;
      const contractedNeAuthorized = normalizedRequests.every(request =>
        request.shuntlineReflexiveBoundaryVariant !== "ihyana-contracted"
        || request.objectKind === "reflexive"
          && request.derivationalLevel !== maximumLevel
          && request.shuntlineReflexivePosition === "late"
          && ["ihyāna", "ihyāniliā"].includes(normalizedSourceStem.replaceAll("-", ""))
          && /^i/u.test(normalizedPredicateStem)
      );
      const rankedPositions = normalizedRequests.map(request => ({
        ...request,
        prominence: request.derivationalLevel === maximumLevel ? "mainline" : "shuntline",
        sequencePriority: request.objectKind === "reflexive"
          && request.derivationalLevel !== maximumLevel
          && request.shuntlineReflexivePosition === "late"
          ? (CLASSICAL_NAHUATL_LESSON23_OBJECT_SEQUENCE_PRIORITY["nonspecific-human"]
            + CLASSICAL_NAHUATL_LESSON23_OBJECT_SEQUENCE_PRIORITY["nonspecific-nonhuman"]) / 2
          : CLASSICAL_NAHUATL_LESSON23_OBJECT_SEQUENCE_PRIORITY[request.objectKind] || 99
      })).sort((left, right) => {
        const leftHasMainlinePriority = left.prominence === "mainline"
          && left.mainlineLinearPriority === true;
        const rightHasMainlinePriority = right.prominence === "mainline"
          && right.mainlineLinearPriority === true;
        if (leftHasMainlinePriority !== rightHasMainlinePriority) {
          return leftHasMainlinePriority ? -1 : 1;
        }
        return left.sequencePriority - right.sequencePriority
          || right.derivationalLevel - left.derivationalLevel;
      });
      const specificPositions = rankedPositions.filter(position => position.objectKind === "specific-projective");
      const normalizedSpecificShuntlineRealization = normalizeClassicalNahuatlVncSlotCarrier(causativeSpecificShuntlineRealization);
      const causativeMainline = rankedPositions.find(position => (
        position.prominence === "mainline"
        && position.governor === "causative"
      )) || null;
      const specificShuntlinePositions = specificPositions.filter(
        position => position.prominence === "shuntline"
      );
      const specificShuntlinePosition =
        specificShuntlinePositions.length === 1
          ? specificShuntlinePositions[0]
          : null;
      const specificShuntlineChoiceEligible = Boolean(
        causativeMainline && specificShuntlinePosition
      );
      const specificShuntlineChoiceRecognized = !normalizedSpecificShuntlineRealization
        || ["silent", "sounded"].includes(normalizedSpecificShuntlineRealization);
      const specificShuntlineChoiceApplies = !normalizedSpecificShuntlineRealization || specificShuntlineChoiceEligible;
      const defaultSoundedSpecific = specificPositions
        .filter((position) => position.silentSpecificObject !== true)
        .slice()
        .sort((left, right) => right.derivationalLevel - left.derivationalLevel)[0] || null;
      const soundedSpecific = specificShuntlineChoiceEligible && normalizedSpecificShuntlineRealization === "silent"
        ? null
        : defaultSoundedSpecific;
      const positions = rankedPositions.map((position, index) => {
        const previousCarrier = index === 0 ? normalizeClassicalNahuatlVncSlotCarrier(subjectCarrier) : getClassicalNahuatlPositionPreviewCarrier(rankedPositions[index - 1], normalizedSubject);
        const nextCarrier = index + 1 < rankedPositions.length ? getClassicalNahuatlPositionPreviewCarrier(rankedPositions[index + 1], normalizedSubject) : normalizedPredicateStem;
        if (position.objectKind === "specific-projective") {
          const lesson253SpecificShuntlineChoice = specificShuntlineChoiceEligible
            && position.objectId === specificShuntlinePosition?.objectId
            && Boolean(normalizedSpecificShuntlineRealization);
          const sourceLexicallySilent = position.silentSpecificObject === true;
          const dyad = sourceLexicallySilent
            ? {
              va1: "⎕",
              va2: "0",
              carrier: "⎕-0",
              silencingRule: "lesson18.8-ayi-silent-specific-object-retained",
            }
            : getClassicalNahuatlSpecificDyad(position.morphologicalObjectPerson || position.objectPerson, {
              sounded: position.objectId === soundedSpecific?.objectId,
              soundedSpecificPerson: soundedSpecific?.morphologicalObjectPerson || soundedSpecific?.objectPerson || "",
              leftCarrier: previousCarrier,
              rightCarrier: nextCarrier
            });
          const governorUnitFrame = buildClassicalNahuatlObjectGovernorUnitFrame(position, {
            prominence: position.prominence
          });
          return {
            ...position,
            kind: "classical-nahuatl-multiple-object-vnc-object-position-frame",
            valenceArity: "dyadic",
            va1: dyad.va1,
            va2: dyad.va2,
            carrier: dyad.carrier,
            sounded: !sourceLexicallySilent
              && position.objectId === soundedSpecific?.objectId,
            silencingRule: sourceLexicallySilent
              ? dyad.silencingRule
              : lesson253SpecificShuntlineChoice && normalizedSpecificShuntlineRealization === "silent"
              ? "lesson25.3-nonspecific-causative-silences-specific-shuntline"
              : dyad.silencingRule,
            carrierAuthority: sourceLexicallySilent
              ? "Andrews Lessons 18.8 and 26.4 retained āyi silent object"
              : lesson253SpecificShuntlineChoice
              ? normalizedSpecificShuntlineRealization === "silent"
                ? "Andrews Lesson 25.3 general silent-specific-shuntline practice"
                : "Andrews Lesson 25.3 sounded-specific-shuntline writer variant"
              : "Andrews Lesson 23.4",
            governorUnitFrame
          };
        }
        if (position.objectKind === "reflexive" && (position.prominence === "mainline" || position.objectPerson === normalizedSubject)) {
          const va1 = getClassicalNahuatlReflexiveVa1(normalizedSubject);
          const governorUnitFrame = buildClassicalNahuatlObjectGovernorUnitFrame(position, {
            prominence: position.prominence
          });
          return {
            ...position,
            kind: "classical-nahuatl-multiple-object-vnc-object-position-frame",
            valenceArity: "dyadic",
            va1,
            va2: "o",
            carrier: `${va1}-o`,
            sounded: true,
            carrierAuthority: position.prominence === "mainline" ? "Andrews Lesson 23.3.2" : "Andrews Lessons 25.11 and 26.16 retained-source subject coreference exceptions",
            governorUnitFrame
          };
        }
        const contractedNe = position.objectKind === "reflexive"
          && position.shuntlineReflexiveBoundaryVariant === "ihyana-contracted"
          && contractedNeAuthorized;
        const va = position.objectKind === "reflexive" ? (contractedNe ? "n" : "ne") : position.objectKind === "nonspecific-human" ? "tē" : "tla";
        const governorUnitFrame = buildClassicalNahuatlObjectGovernorUnitFrame(position, {
          prominence: position.prominence
        });
        return {
          ...position,
          kind: "classical-nahuatl-multiple-object-vnc-object-position-frame",
          valenceArity: "monadic",
          va,
          carrier: va,
          sounded: true,
          carrierAuthority: contractedNe ? "Andrews §33.7 attested contracted shunt ne before real i" : position.objectKind === "reflexive" ? "Andrews Lesson 23.4 shuntline reflexive" : "Andrews Lesson 23.5 ordering priorities",
          governorUnitFrame
        };
      });
      const mainlineCount = positions.filter(position => position.prominence === "mainline").length;
      const futureSpecificCooccurrenceUsesZeroNumber = normalizedTense === "future" && normalizedSubject === "3sg" && positions.filter(position => position.objectKind === "specific-projective").length > 1;
      const authorized = Boolean(normalizedSourceStem && normalizedSubject && normalizedPredicateStem && requestShapeAuthorized && contractedNeAuthorized && suffixHistoryAuthorized && rareThirdCausativeAuthorized && specificShuntlineChoiceRecognized && specificShuntlineChoiceApplies && mainlineCount === 1 && positions.every(position => position.carrier && isClassicalNahuatlObjectGovernorUnitFrame(position.governorUnitFrame)));
      const blockReason = authorized ? "" : !normalizedSourceStem ? "lesson23-source-stem-required" : !normalizedSubject ? "lesson23-source-subject-required" : !requestShapeAuthorized ? "lesson23-typed-object-request-inventory-invalid" : !contractedNeAuthorized ? "attested-shunt-ne-boundary-required" : !suffixHistoryAuthorized ? "lesson23-exceptional-suffix-order-support-required" : !rareThirdCausativeAuthorized ? "lesson23-rare-third-causative-meaning-support-required" : !specificShuntlineChoiceRecognized ? "lesson23-causative-specific-shuntline-realization-not-recognized" : !specificShuntlineChoiceApplies ? "lesson23-causative-specific-shuntline-realization-not-applicable" : "lesson23-object-position-realization-incomplete";
      const frame = {
        kind: "classical-nahuatl-multiple-object-vnc-object-cluster-frame",
        version: 1,
        lesson: "Andrews Lesson 23",
        section: "23.1-23.5",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_VNC_SLOT_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason,
        sourceStem: normalizedSourceStem,
        predicateStem: normalizedPredicateStem,
        subject: normalizedSubject,
        subjectCarrier: normalizeClassicalNahuatlVncSlotCarrier(subjectCarrier),
        tense: normalizedTense,
        objectRequests: normalizedRequests,
        positions,
        positionCount: positions.length,
        valenceArity: "multiple",
        soundedSpecificObjectId: soundedSpecific?.objectId || "",
        causativeSpecificShuntlineRealization: normalizedSpecificShuntlineRealization,
        causativeSpecificShuntlineChoiceEligible: specificShuntlineChoiceEligible,
        causativeSpecificShuntlineObjectId: specificShuntlinePosition?.objectId || "",
        causativeSpecificShuntlineRuleFrame: specificShuntlineChoiceEligible ? {
          kind: "classical-nahuatl-specific-shuntline-specific-shuntline-realization-rule-frame",
          version: 1,
          sourceAuthority: "Andrews transcription",
          sourceDocument: CLASSICAL_NAHUATL_VNC_SLOT_SOURCE_DOCUMENT,
          section: causativeMainline?.objectKind === "specific-projective"
            ? "39.7.2.b"
            : "25.3",
          selectedRealization: normalizedSpecificShuntlineRealization,
          specificShuntlineObjectId: specificShuntlinePosition?.objectId || "",
          causativeMainlineObjectId: causativeMainline?.objectId || "",
          silentIsGeneralPractice: true,
          soundedIsDocumentedWriterVariant: true,
          callerSuppliedCarrierAllowed: false
        } : null,
        linearOrder: positions.map(position => position.objectId),
        linearCarriers: positions.map(position => position.carrier),
        numberDyadOverride: futureSpecificCooccurrenceUsesZeroNumber ? {
          num1: "0",
          num2: "0",
          rule: "lesson23-canvas-future-specific-cooccurrence-zero-number"
        } : null,
        orderingRules: ["specific-projective-before-reflexive", "specific-projective-before-nonspecific-projective", "reflexive-before-nonspecific-projective", "human-before-nonhuman"],
        derivationalLevelsContiguous: levelsAreContiguous,
        directiveHistoryAuthorized,
        suffixHistory: Object.freeze(suffixHistory),
        standardSuffixOrder,
        exceptionalSuffixOrderAuthorized: exceptionalSuffixOrderAuthorized === true,
        rareThirdCausativeHistory,
        rareThirdCausativeMeaningSupported: rareThirdCausativeMeaningSupported === true,
        historyAuthorizationStatus: suffixHistoryAuthorized && rareThirdCausativeAuthorized
          ? "authorized"
          : "blocked",
        formulaArtifact: normalizeClassicalNahuatlVncSlotCarrier(formulaArtifact),
        surfaceArtifact: normalizeClassicalNahuatlVncSlotCarrier(surfaceArtifact),
        formulaArtifactAuthority: false,
        surfaceArtifactAuthority: false,
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false
      };
      if (frame.authorizationStatus === "authorized" && !frame.blockReason) {
        CLASSICAL_NAHUATL_LESSON23_ISSUED_OBJECT_CLUSTER_FRAMES.add(frame);
        normalizedRequests.forEach(request => {
          if (request.participantFrame) classicalNahuatlRetainedObjectParticipants.add(request.participantFrame);
        });
        classicalNahuatlObjectClusterParticipantReceipts.set(frame, Object.freeze(
          normalizedRequests.map(request => Object.freeze({
            objectId: request.objectId,
            participantFrame: request.participantFrame,
          }))
        ));
      }
      return frame;
    }
    function isClassicalNahuatlObjectClusterFrame(frame = null, sourceStem = "") {
      const normalizedSourceStem = normalizeClassicalNahuatlVncSlotStem(sourceStem || frame?.sourceStem);
      if (!frame
        || !CLASSICAL_NAHUATL_LESSON23_ISSUED_OBJECT_CLUSTER_FRAMES.has(frame)
        || frame.kind !== "classical-nahuatl-multiple-object-vnc-object-cluster-frame"
        || frame.authorizationStatus !== "authorized"
        || frame.sourceStem !== normalizedSourceStem
        || frame.formulaArtifactAuthority !== false
        || frame.surfaceArtifactAuthority !== false) {
        return false;
      }
      const participantReceipt = classicalNahuatlObjectClusterParticipantReceipts.get(frame);
      if (!participantReceipt
        || !Array.isArray(frame.objectRequests) || !Array.isArray(frame.positions)
        || frame.objectRequests.length !== participantReceipt.length
        || frame.positions.length !== participantReceipt.length
        || participantReceipt.some((receipt, index) =>
          frame.objectRequests[index]?.objectId !== receipt.objectId
          || frame.objectRequests[index]?.participantFrame !== receipt.participantFrame
          || frame.positions.find(position => position.objectId === receipt.objectId)?.participantFrame !== receipt.participantFrame
        )) return false;
      const rebuilt = buildClassicalNahuatlObjectClusterFrame(frame.sourceStem, {
        subject: frame.subject,
        subjectCarrier: frame.subjectCarrier,
        predicateStem: frame.predicateStem,
        tense: frame.tense,
        objectRequests: frame.objectRequests,
        causativeSpecificShuntlineRealization: frame.causativeSpecificShuntlineRealization,
        rareThirdCausativeMeaningSupported: frame.rareThirdCausativeMeaningSupported,
        exceptionalSuffixOrderAuthorized: frame.exceptionalSuffixOrderAuthorized,
        minimumPositionCount: frame.positionCount,
        maximumPositionCount: frame.positionCount,
        formulaArtifact: frame.formulaArtifact,
        surfaceArtifact: frame.surfaceArtifact
      });
      return rebuilt.authorizationStatus === "authorized"
        && JSON.stringify(rebuilt) === JSON.stringify(frame);
    }
    function getClassicalNahuatlObjectRoleMapping(frame = null) {
      return (Array.isArray(frame?.positions) ? frame.positions : []).map(position => ({
        objectId: position.objectId,
        carrier: position.carrier,
        sounded: position.sounded,
        governor: position.governor,
        objectFunction: position.governorUnitFrame?.objectFunction || position.governor,
        derivationalLevel: position.derivationalLevel,
        prominence: position.prominence
      }));
    }
    function getClassicalNahuatlObjectRequestPermutations(requests = []) {
      if (requests.length < 2) {
        return [requests.slice()];
      }
      return requests.flatMap((request, index) => (
        getClassicalNahuatlObjectRequestPermutations([
          ...requests.slice(0, index),
          ...requests.slice(index + 1)
        ]).map(rest => [request, ...rest])
      ));
    }
    function buildClassicalNahuatlObjectRoleAmbiguityFrame(objectClusterFrame = null) {
      const sourceAuthorized = isClassicalNahuatlObjectClusterFrame(objectClusterFrame);
      if (!sourceAuthorized) {
        return {
          kind: "classical-nahuatl-multiple-object-vnc-object-role-ambiguity-frame",
          version: 1,
          lesson: "Andrews Lesson 23",
          section: "23.5.4",
          authorizationStatus: "blocked",
          blockReason: "lesson23-authorized-object-cluster-required",
          sourceObjectClusterFrame: objectClusterFrame,
          selectedRoleMapping: [],
          alternativeRoleMappings: [],
          roleMappingCount: 0,
          genuinelyAmbiguous: false,
          userChoiceAvailable: false,
          selectionRequired: false,
          formulaArtifactAuthority: false,
          surfaceArtifactAuthority: false
        };
      }
      const historySlots = objectClusterFrame.objectRequests.slice().sort((left, right) => (
        left.derivationalLevel - right.derivationalLevel
      )).map(request => ({
        governor: request.governor,
        derivationalLevel: request.derivationalLevel
      }));
      const selectedParticipantOrder = objectClusterFrame.objectRequests.slice().sort((left, right) => (
        left.derivationalLevel - right.derivationalLevel
      ));
      const swappableIndexes = historySlots.map((slot, index) => (
        slot.governor === "directive" ? -1 : index
      )).filter(index => index >= 0);
      const swappableParticipants = swappableIndexes.map(index => selectedParticipantOrder[index]);
      const selectedSignature = swappableParticipants.map(request => request.objectId).join("|");
      const surfaceSignature = objectClusterFrame.linearCarriers.join("+");
      const alternativeFrames = [];
      const seenMappings = new Set();
      for (const swappableOrder of getClassicalNahuatlObjectRequestPermutations(swappableParticipants)) {
        if (swappableOrder.map(request => request.objectId).join("|") === selectedSignature) {
          continue;
        }
        const participantOrder = selectedParticipantOrder.slice();
        swappableIndexes.forEach((historyIndex, permutationIndex) => {
          participantOrder[historyIndex] = swappableOrder[permutationIndex];
        });
        const objectRequests = participantOrder.map((participant, index) => ({
          objectId: participant.objectId,
          objectKind: participant.objectKind,
          objectPerson: participant.objectPerson,
          governor: historySlots[index].governor,
          derivationalLevel: historySlots[index].derivationalLevel
        }));
        const candidate = buildClassicalNahuatlObjectClusterFrame(objectClusterFrame.sourceStem, {
          subject: objectClusterFrame.subject,
          subjectCarrier: objectClusterFrame.subjectCarrier,
          predicateStem: objectClusterFrame.predicateStem,
          tense: objectClusterFrame.tense,
          objectRequests,
          causativeSpecificShuntlineRealization: objectClusterFrame.causativeSpecificShuntlineRealization,
          rareThirdCausativeMeaningSupported: objectClusterFrame.rareThirdCausativeMeaningSupported,
          exceptionalSuffixOrderAuthorized: objectClusterFrame.exceptionalSuffixOrderAuthorized,
          minimumPositionCount: objectClusterFrame.positionCount,
          maximumPositionCount: objectClusterFrame.positionCount
        });
        const mapping = getClassicalNahuatlObjectRoleMapping(candidate);
        const mappingSignature = mapping.map(position => (
          `${position.objectId}:${position.governor}:${position.derivationalLevel}`
        )).join("|");
        if (isClassicalNahuatlObjectClusterFrame(candidate)
          && candidate.linearCarriers.join("+") === surfaceSignature
          && !seenMappings.has(mappingSignature)) {
          seenMappings.add(mappingSignature);
          alternativeFrames.push(candidate);
        }
      }
      const frame = {
        kind: "classical-nahuatl-multiple-object-vnc-object-role-ambiguity-frame",
        version: 1,
        lesson: "Andrews Lesson 23",
        section: "23.5.4",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_VNC_SLOT_SOURCE_DOCUMENT,
        authorizationStatus: "authorized",
        blockReason: "",
        sourceObjectClusterFrame: objectClusterFrame,
        surfaceCarriers: objectClusterFrame.linearCarriers.slice(),
        selectedRoleMapping: getClassicalNahuatlObjectRoleMapping(objectClusterFrame),
        alternativeRoleMappings: alternativeFrames.map(getClassicalNahuatlObjectRoleMapping),
        alternativeObjectClusterFrames: alternativeFrames,
        roleMappingCount: 1 + alternativeFrames.length,
        genuinelyAmbiguous: alternativeFrames.length > 0,
        userChoiceAvailable: alternativeFrames.length > 0,
        selectionRequired: false,
        selectedMappingDerivedFromTypedComposition: true,
        contextMayResolveOpenReading: true,
        carrierOrderAuthority: "form-not-object-function",
        formulaArtifactAuthority: false,
        surfaceArtifactAuthority: false
      };
      CLASSICAL_NAHUATL_LESSON23_ISSUED_OBJECT_ROLE_AMBIGUITY_FRAMES.add(frame);
      return frame;
    }
    function isClassicalNahuatlObjectRoleAmbiguityFrame(frame = null) {
      if (!frame
        || !CLASSICAL_NAHUATL_LESSON23_ISSUED_OBJECT_ROLE_AMBIGUITY_FRAMES.has(frame)
        || frame.kind !== "classical-nahuatl-multiple-object-vnc-object-role-ambiguity-frame"
        || frame.authorizationStatus !== "authorized"
        || !isClassicalNahuatlObjectClusterFrame(frame.sourceObjectClusterFrame)
        || frame.formulaArtifactAuthority !== false
        || frame.surfaceArtifactAuthority !== false) {
        return false;
      }
      const rebuilt = buildClassicalNahuatlObjectRoleAmbiguityFrame(
        frame.sourceObjectClusterFrame,
      );
      return JSON.stringify(rebuilt) === JSON.stringify(frame);
    }
    function isClassicalNahuatlVoiceClusterSourceMachineryFrame(sourceMachineryFrame = null, sourceObjectClusterFrame = null) {
      const sourceTypedFrame = sourceMachineryFrame?.proofFrame?.conclusion?.finalTypedVncSlotFrame;
      const lowerTypedFrame = sourceMachineryFrame?.proofFrame?.conclusion?.finalBoundaryRealizationFrame?.lowerTypedVncSlotFrame;
      const embeddedObjectClusterFrame = sourceMachineryFrame?.multipleObjectClusterFrame;
      const normalizedSourceStem = normalizeClassicalNahuatlVncSlotStem(sourceMachineryFrame?.sourceVerbstem || sourceMachineryFrame?.stem);
      const sourcePositions = Array.isArray(sourceTypedFrame?.slots?.prePredicate) ? sourceTypedFrame.slots.prePredicate.map(slot => slot?.objectPositionFrame).filter(Boolean) : [];
      const renderedFormula = isClassicalNahuatlVncSlotFrame(sourceTypedFrame) ? renderClassicalNahuatlVncSlotFrameFormula(sourceTypedFrame) : "";
      // These issued late operations preserve the object's roles at their
      // new stem, with a late-owner proof rather than the lower proof shape.
      if (targetObject?.isClassicalNahuatlMachineryFrame?.(sourceMachineryFrame) === true
        && ["frequentative", "nominal-prefix"].includes(sourceMachineryFrame.operationFrame.operation)) {
        return Boolean(sourceMachineryFrame.targetObjectClusterFrame === sourceObjectClusterFrame
          && isClassicalNahuatlObjectClusterFrame(sourceObjectClusterFrame, normalizedSourceStem)
          && isClassicalNahuatlVncSlotFrame(sourceTypedFrame)
          && JSON.stringify(sourcePositions.map(position => ({...position, objectNumber: position.objectNumber || ""})))
            === JSON.stringify(sourceObjectClusterFrame.positions.map(position => ({...position, objectNumber: position.objectNumber || ""})))
          && normalizeClassicalNahuatlVncSlotStem(sourceObjectClusterFrame.predicateStem)
            === normalizeClassicalNahuatlVncSlotStem(sourceTypedFrame.slots.predicate.stem)
          && normalizeClassicalNahuatlVncSlotCarrier(sourceObjectClusterFrame.subjectCarrier)
            === normalizeClassicalNahuatlVncSlotCarrier(sourceTypedFrame.slots.subject.pers1)
          && renderedFormula && sourceMachineryFrame.formulaRealization === renderedFormula);
      }
      const derivedSource = sourceMachineryFrame?.kind === "classical-nahuatl-vnc-derived-machinery-frame";
      const sourceKindAuthorized = isClassicalNahuatlMultipleObjectVncFrame(sourceMachineryFrame)
        || derivedSource && typeof targetObject?.isClassicalNahuatlDerivedVncMachineryFrame === "function" && targetObject.isClassicalNahuatlDerivedVncMachineryFrame(sourceMachineryFrame);
      return Boolean(sourceMachineryFrame
        && sourceKindAuthorized
        && sourceMachineryFrame.authorizationStatus === "authorized"
        && sourceMachineryFrame.proofFrame?.authorizationStatus === "authorized"
        && sourceMachineryFrame.formulaOutputAllowed === true
        && sourceMachineryFrame.grammarGenerationAllowed === false
        && sourceMachineryFrame.surfaceGenerationAllowed === false
        && isClassicalNahuatlVncSlotFrame(sourceTypedFrame)
        && isClassicalNahuatlVncSlotFrame(lowerTypedFrame)
        && isClassicalNahuatlObjectClusterFrame(embeddedObjectClusterFrame, normalizedSourceStem)
        && isClassicalNahuatlObjectClusterFrame(sourceObjectClusterFrame, normalizedSourceStem)
        && JSON.stringify(embeddedObjectClusterFrame) === JSON.stringify(sourceObjectClusterFrame)
        && normalizeClassicalNahuatlVncSlotStem(sourceObjectClusterFrame.predicateStem) === normalizeClassicalNahuatlVncSlotStem(lowerTypedFrame.slots.predicate.stem)
        && normalizeClassicalNahuatlVncSlotCarrier(sourceObjectClusterFrame.subjectCarrier) === normalizeClassicalNahuatlVncSlotCarrier(sourceTypedFrame.slots.subject.pers1)
        && JSON.stringify(sourcePositions) === JSON.stringify(sourceObjectClusterFrame.positions)
        && sourceMachineryFrame.proofFrame.conclusion.finalTypedVncSemanticIdentity === sourceTypedFrame.semanticIdentity
        && sourceMachineryFrame.proofFrame.conclusion.objectClusterFrame
        && JSON.stringify(sourceMachineryFrame.proofFrame.conclusion.objectClusterFrame) === JSON.stringify(sourceObjectClusterFrame)
        && renderedFormula
        && sourceMachineryFrame.formulaRealization === renderedFormula
        && sourceMachineryFrame.proofFrame.conclusion.selectedFormula === renderedFormula);
    }
    function buildClassicalNahuatlVoiceObjectClusterFrame(sourceObjectClusterFrame = null, {
      voice = "passive",
      tense = "",
      sourceMachineryFrame = null,
      nonactiveStemRecord = null
    } = {}) {
      const normalizedVoice = normalizeClassicalNahuatlVncSlotCarrier(voice);
      const normalizedTense = normalizeClassicalNahuatlVncSlotCarrier(tense || sourceObjectClusterFrame?.tense);
      const sourceClusterAuthorized = isClassicalNahuatlObjectClusterFrame(sourceObjectClusterFrame);
      const sourceMachineryAuthorized = sourceClusterAuthorized && isClassicalNahuatlVoiceClusterSourceMachineryFrame(sourceMachineryFrame, sourceObjectClusterFrame);
      const sourceNonactiveRecordAuthorized = sourceClusterAuthorized && isClassicalNahuatlNonactiveStemRecord(nonactiveStemRecord, sourceObjectClusterFrame.sourceStem);
      const sourceAuthorized = sourceClusterAuthorized && sourceMachineryAuthorized && sourceNonactiveRecordAuthorized;
      const specificPositions = sourceAuthorized ? sourceObjectClusterFrame.positions.filter(position => position.objectKind === "specific-projective") : [];
      const promotedPosition = specificPositions.slice().sort((left, right) => right.derivationalLevel - left.derivationalLevel)[0] || null;
      const passive = normalizedVoice === "passive";
      const impersonal = normalizedVoice === "impersonal";
      const voiceAuthorized = sourceAuthorized && (passive && Boolean(promotedPosition) || impersonal && specificPositions.length === 0);
      const transformedPositions = voiceAuthorized ? sourceObjectClusterFrame.positions.filter(position => !passive || position.objectId !== promotedPosition.objectId).map(position => {
        if (position.objectKind === "reflexive") {
          return {
            ...cloneClassicalNahuatlVncSlotValue(position),
            prominence: "shuntline",
            valenceArity: "monadic",
            va: "ne",
            va1: "",
            va2: "",
            carrier: "ne",
            voiceTransformation: "retain-reflexivity-as-shuntline-ne"
          };
        }
        if (passive && position.objectKind === "specific-projective" && position.carrier === "0-im") {
          return {
            ...cloneClassicalNahuatlVncSlotValue(position),
            valenceArity: "dyadic",
            va1: "qu",
            va2: "im",
            carrier: "qu-im",
            sounded: true,
            voiceTransformation: "restore-third-plural-k-in-passive-transform"
          };
        }
        if (passive && position.objectKind === "nonspecific-human") {
          return {
            ...cloneClassicalNahuatlVncSlotValue(position),
            valenceArity: "monadic",
            va: "tē",
            carrier: "tē",
            voiceTransformation: "retain-human-nonspecific-object-unchanged"
          };
        }
        return {
          ...cloneClassicalNahuatlVncSlotValue(position),
          voiceTransformation: "retain-object-position"
        };
      }) : [];
      const formulaCarrierProjectionFrames = voiceAuthorized ? transformedPositions
        .map(position => issueClassicalNahuatlContextualFormulaCarrierProjection(position, {
          voice: normalizedVoice,
          tense: normalizedTense,
          sourceObjectClusterFrame,
          nonactiveStemRecord,
          promotedPosition
        }))
        .filter(Boolean) : [];
      const blockReason = voiceAuthorized ? "" : !sourceClusterAuthorized ? "lesson23-authorized-source-object-cluster-required" : !sourceMachineryAuthorized ? "lesson23-validated-source-machinery-context-required" : !sourceNonactiveRecordAuthorized ? "lesson20-authorized-source-nonactive-record-context-required" : passive ? "lesson21-passive-requires-specific-projective-object-in-cluster" : impersonal ? "lesson22-impersonal-blocks-specific-projective-object-cluster" : "lesson23-unknown-derived-voice";
      const frame = {
        kind: "classical-nahuatl-voice-object-vnc-voice-object-cluster-frame",
        version: 1,
        lesson: passive ? "Andrews Lessons 21 and 23" : "Andrews Lessons 22 and 23",
        authorizationStatus: voiceAuthorized ? "authorized" : "blocked",
        blockReason,
        voice: normalizedVoice,
        tense: normalizedTense,
        sourceObjectClusterFrame,
        // Keep the validated typed source by identity. A deep copy would sever
        // signed source/operation links on a Lessons 24-26 derived source.
        sourceMachineryFrame: sourceMachineryAuthorized ? sourceMachineryFrame : null,
        // The canonical Lesson 20 record intentionally shares its internal
        // morphology object with its source identity. Preserve that typed
        // identity here; deep-cloning it would turn a valid record into an
        // invalid lookalike before the voice cluster reaches its consumer.
        nonactiveStemRecord: sourceNonactiveRecordAuthorized ? nonactiveStemRecord : null,
        sourceObjectClusterIdentity: sourceAuthorized ? sourceObjectClusterFrame.positions.map(position => `${position.objectId}:${position.carrier}`).join("|") : "",
        promotedObjectId: passive ? promotedPosition?.objectId || "" : "",
        promotedObjectPerson: passive ? promotedPosition?.objectPerson || "" : "",
        positions: transformedPositions,
        formulaProjectionEnvironment:
          sourceMachineryFrame?.derivationOperationFrame?.authorizationStatus
            === "authorized"
            ? "later-derived-vnc"
            : "lesson23-multiple-object",
        formulaCarrierProjectionFrames: Object.freeze(formulaCarrierProjectionFrames),
        retainedObjectIds: transformedPositions.map(position => position.objectId),
        retainedCarriers: transformedPositions.map(position => position.carrier),
        numberDyadOverride: passive && normalizedTense === "future" && transformedPositions.length > 0 && !String(promotedPosition?.objectPerson || "").endsWith("pl") ? {
          num1: "0",
          num2: "0",
          rule: "lesson21-transitive-passive-future-singular-number"
        } : null,
        sourceSubjectDeleted: voiceAuthorized,
        formulaArtifactAuthority: false,
        surfaceArtifactAuthority: false,
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false
      };
      if (frame.authorizationStatus === "authorized" && !frame.blockReason) {
        CLASSICAL_NAHUATL_LESSON23_ISSUED_OBJECT_CLUSTER_FRAMES.add(frame);
      }
      return frame;
    }
    function isClassicalNahuatlVoiceObjectClusterFrame(frame = null) {
      if (!frame
        || !CLASSICAL_NAHUATL_LESSON23_ISSUED_OBJECT_CLUSTER_FRAMES.has(frame)
        || frame.kind !== "classical-nahuatl-voice-object-vnc-voice-object-cluster-frame"
        || frame.version !== 1
        || frame.authorizationStatus !== "authorized"
        || frame.formulaArtifactAuthority !== false
        || frame.surfaceArtifactAuthority !== false
        || !isClassicalNahuatlObjectClusterFrame(frame.sourceObjectClusterFrame)
        || !isClassicalNahuatlVoiceClusterSourceMachineryFrame(frame.sourceMachineryFrame, frame.sourceObjectClusterFrame)
        || !isClassicalNahuatlNonactiveStemRecord(frame.nonactiveStemRecord, frame.sourceObjectClusterFrame.sourceStem)) {
        return false;
      }
      const rebuilt = buildClassicalNahuatlVoiceObjectClusterFrame(frame.sourceObjectClusterFrame, {
        voice: frame.voice,
        tense: frame.tense,
        sourceMachineryFrame: frame.sourceMachineryFrame,
        nonactiveStemRecord: frame.nonactiveStemRecord
      });
      const getComparableVoiceCluster = cluster => Object.fromEntries(Object.entries(cluster || {}).filter(([key]) => ![
        "sourceMachineryFrame",
        "sourceObjectClusterFrame",
        "nonactiveStemRecord"
      ].includes(key)));
      return rebuilt.authorizationStatus === "authorized"
        && rebuilt.sourceMachineryFrame === frame.sourceMachineryFrame
        && rebuilt.sourceObjectClusterFrame === frame.sourceObjectClusterFrame
        && rebuilt.nonactiveStemRecord === frame.nonactiveStemRecord
        && JSON.stringify(getComparableVoiceCluster(rebuilt)) === JSON.stringify(getComparableVoiceCluster(frame));
    }
    function doesClassicalNahuatlLesson23VoiceClusterMatchNonactiveTargetFrame(frame = null, targetMachineryFrame = null) {
      const targetTypedFrame = targetMachineryFrame?.proofFrame?.conclusion?.finalTypedVncSlotFrame || targetMachineryFrame?.proofFrame?.conclusion?.finalBoundaryRealizationFrame?.typedSlotFrame;
      const targetStem = targetTypedFrame?.slots?.predicate?.stem;
      const normalizedTargetStem = normalizeClassicalNahuatlVncSlotStem(targetStem);
      const record = frame?.nonactiveStemRecord;
      if (!isClassicalNahuatlVncSlotFrame(targetTypedFrame) || !normalizedTargetStem || !frame || !isClassicalNahuatlNonactiveStemRecord(record, frame.sourceObjectClusterFrame?.sourceStem)) {
        return false;
      }
      const licensedTargetStems = new Set([record.nonactiveStem, record.imperfectiveNonactiveStem, record.perfectiveNonactiveStem].map(normalizeClassicalNahuatlVncSlotStem).filter(Boolean));
      const runtimeTarget = getClassicalNahuatlVncLayerRuntimeTarget();
      if (
        typeof runtimeTarget?.buildClassicalNahuatlProgressiveAssimilationFrame
          === "function"
      ) {
        [...licensedTargetStems].forEach(stem => {
          const assimilation =
            runtimeTarget.buildClassicalNahuatlProgressiveAssimilationFrame(
              stem
            );
          if (assimilation?.authorizationStatus === "authorized") {
            [assimilation.realizedAnalyzedStem,
              assimilation.realizedSolidStem]
              .map(normalizeClassicalNahuatlVncSlotStem)
              .filter(Boolean)
              .forEach(realized => licensedTargetStems.add(realized));
          }
        });
      }
      // The Class A voice builder may expose its regular short-o imperfective
      // allomorph before the quantity-realization operation restores the exact
      // printed quantity. Admit that typed allomorph here without using
      // it to decide the final formula or finite surface.
      const licensesMultipleObjectNonactiveShortO = ["passive", "impersonal"].includes(frame.voice)
        && ["ō", "lō"].includes(record.suffixFamily)
        && frame.positions.length > 0;
      if (licensesMultipleObjectNonactiveShortO) {
        [...licensedTargetStems].filter(stem => /ō$/u.test(stem)).forEach(stem => licensedTargetStems.add(stem.replace(/ō$/u, "o")));
      }
      const normalizedTargetSubject = normalizeClassicalNahuatlVncSlotCarrier(targetMachineryFrame?.priorVncFrame?.subject || targetMachineryFrame?.subject);
      const expectedTargetSubject = frame.voice === "passive" ? normalizeClassicalNahuatlVncSlotCarrier(frame.promotedObjectPerson) : "3sg";
      const normalizedTargetTense = normalizeClassicalNahuatlVncSlotCarrier(targetMachineryFrame?.priorVncFrame?.tense || targetMachineryFrame?.tense);
      return Boolean(licensedTargetStems.has(normalizedTargetStem)
        && normalizedTargetSubject
        && normalizedTargetSubject === expectedTargetSubject
        && normalizedTargetTense
        && normalizedTargetTense === frame.tense);
    }
    function isCanonicalClassicalNahuatlLesson23LowerMachineryFrame(frame = null) {
      const runtimeTarget = getClassicalNahuatlVncLayerRuntimeTarget();
      // A valid object cluster cannot authenticate independently supplied lower
      // predicate/tense/number slots. Qualify their enclosing owner Result first.
      return typeof runtimeTarget?.isClassicalNahuatlVncDerivationBaseSourceMachineryFrame === "function"
        && runtimeTarget.isClassicalNahuatlVncDerivationBaseSourceMachineryFrame(frame) === true;
    }
    function applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame(lowerMachineryFrame = null, objectClusterFrame = null, options = {}) {
      if (!isCanonicalClassicalNahuatlLesson23LowerMachineryFrame(lowerMachineryFrame)) {
        return null;
      }
      return applyClassicalNahuatlLesson23ObjectClusterToQualifiedMachineryFrame(lowerMachineryFrame, objectClusterFrame, options);
    }
    function doesClassicalNahuatlDerivedFormulaSourceMatch(source, lower, requests) {
      const runtime=getClassicalNahuatlVncLayerRuntimeTarget();
      if(runtime?.isClassicalNahuatlDerivedVncMachineryFrame?.(source)!==true)return false;
      const operation=source.derivationOperationFrame;
      const expected=operation?.targetObjectRequests;
      if(normalizeClassicalNahuatlVncSlotStem(operation?.targetStem)!==normalizeClassicalNahuatlVncSlotStem(lower?.sourceVerbstem || lower?.stem)
        ||operation.targetClass!==lower?.classId||!Array.isArray(expected)||!Array.isArray(requests)||expected.length!==requests.length)return false;
      const keys=["objectId","objectKind","objectPerson","governor","derivationalLevel"];
      return expected.every(old=>{
        const current=requests.find(q=>q.objectId===old.objectId);
        if(!current||keys.some(key=>current[key]!==old[key]))return false;
        // A recapture can reissue the same Participant, but cannot replace its
        // reference or facts. Some old operations supply the added PF later.
        const participant=old.participantFrame;
        return !participant || (isClassicalNahuatlParticipantFrame(current.participantFrame)
          &&["referenceId","category","role","case","animacy","humanness","number","specificity"]
            .every(key=>current.participantFrame[key]===participant[key]));
      });
    }
    function applyClassicalNahuatlLesson23ObjectClusterToQualifiedMachineryFrame(lowerMachineryFrame = null, objectClusterFrame = null, {
      sourceFrameKind = "classical-nahuatl-multiple-object-vnc-multiple-object-vnc-machinery-frame",
      formulaProjectionSourceFrame = null
    } = {}) {
      const normalizedSourceFrameKind = normalizeClassicalNahuatlVncSlotCarrier(sourceFrameKind);
      const sourceFrameKindAuthorized = CLASSICAL_NAHUATL_LESSON23_MULTIPLE_OBJECT_VNC_FRAME_KINDS.includes(normalizedSourceFrameKind);
      const lowerTypedFrame = lowerMachineryFrame?.proofFrame?.conclusion?.finalTypedVncSlotFrame || lowerMachineryFrame?.proofFrame?.conclusion?.finalBoundaryRealizationFrame?.typedSlotFrame;
      const lowerSourceStem = normalizeClassicalNahuatlVncSlotStem(lowerMachineryFrame?.sourceVerbstem || lowerMachineryFrame?.targetStem || lowerMachineryFrame?.stem || lowerTypedFrame?.slots?.predicate?.stem);
      const lowerSemanticSubject = normalizeClassicalNahuatlVncSlotCarrier(lowerMachineryFrame?.priorVncFrame?.subject || lowerMachineryFrame?.subject);
      const lowerSemanticTense = normalizeClassicalNahuatlVncSlotCarrier(lowerMachineryFrame?.priorVncFrame?.tense || lowerMachineryFrame?.tense);
      const directClusterAuthorized = isClassicalNahuatlObjectClusterFrame(objectClusterFrame, lowerSourceStem)
        && normalizeClassicalNahuatlVncSlotStem(objectClusterFrame?.predicateStem) === normalizeClassicalNahuatlVncSlotStem(lowerTypedFrame?.slots?.predicate?.stem)
        && normalizeClassicalNahuatlVncSlotCarrier(objectClusterFrame?.subjectCarrier) === normalizeClassicalNahuatlVncSlotCarrier(lowerTypedFrame?.slots?.subject?.pers1)
        && Boolean(lowerSemanticSubject)
        && normalizeClassicalNahuatlVncSlotCarrier(objectClusterFrame?.subject) === lowerSemanticSubject
        && Boolean(lowerSemanticTense)
        && normalizeClassicalNahuatlVncSlotCarrier(objectClusterFrame?.tense) === lowerSemanticTense;
      const voiceClusterAuthorized = isClassicalNahuatlVoiceObjectClusterFrame(objectClusterFrame)
        && doesClassicalNahuatlLesson23VoiceClusterMatchNonactiveTargetFrame(objectClusterFrame, lowerMachineryFrame);
      const clusterAuthorized = directClusterAuthorized || voiceClusterAuthorized;
      const retainedDerivedFormulaSource=formulaProjectionSourceFrame
        &&doesClassicalNahuatlDerivedFormulaSourceMatch(formulaProjectionSourceFrame,lowerMachineryFrame,objectClusterFrame?.objectRequests);
      if (!sourceFrameKindAuthorized || !isClassicalNahuatlVncSlotFrame(lowerTypedFrame) || !clusterAuthorized
        ||(formulaProjectionSourceFrame&&!retainedDerivedFormulaSource)) {
        return null;
      }
      const objectRoleAmbiguityFrame = directClusterAuthorized
        ? buildClassicalNahuatlObjectRoleAmbiguityFrame(objectClusterFrame)
        : null;
      const personDyad = cloneClassicalNahuatlVncSlotValue(lowerTypedFrame.slots.subject);
      const firstObjectCarrier = objectClusterFrame.positions.find(
        position => position?.sounded !== false
      )?.carrier || lowerTypedFrame.slots.predicate.stem || "";
      const subjectCarrierFamily = getClassicalNahuatlVncSubjectCarrierFamily(personDyad.pers1);
      if (subjectCarrierFamily) {
        const nextSound = getClassicalNahuatlVncSlotFirstSound(firstObjectCarrier);
        personDyad.pers1 = nextSound ? !isClassicalNahuatlVncSlotVowelSound(nextSound) ? subjectCarrierFamily.supportive : subjectCarrierFamily.bare : subjectCarrierFamily.bare === "n" ? subjectCarrierFamily.supportive : subjectCarrierFamily.bare;
      }
      const numberDyad = {
        ...cloneClassicalNahuatlVncSlotValue(lowerTypedFrame.slots.number),
        ...(cloneClassicalNahuatlVncSlotValue(objectClusterFrame.numberDyadOverride) || {})
      };
      const assembledTypedSlotFrame = buildClassicalNahuatlVncSlotFrame({
        sourceFrameKind: normalizedSourceFrameKind,
        sourceAuthorizationStatus: "authorized",
        stem: lowerTypedFrame.slots.predicate.stem,
        personDyad,
        tenseFrame: cloneClassicalNahuatlVncSlotValue(lowerTypedFrame.slots.predicate),
        numberDyad,
        objectFrame: {
          valenceArity: "multiple",
          // Preserve the owner-typed participant positions by identity while
          // the signed §21.2.5 frame controls only their printed formula slot.
          positions: objectClusterFrame.positions,
          formulaCarrierProjectionFrames: objectClusterFrame.formulaCarrierProjectionFrames,
          formulaProjectionEnvironment:
            retainedDerivedFormulaSource ? "later-derived-vnc" : normalizedSourceFrameKind
              === "classical-nahuatl-vnc-derived-machinery-frame"
              ? "later-derived-vnc"
              : objectClusterFrame?.formulaProjectionEnvironment
                || (lowerMachineryFrame?.derivationOperationFrame?.authorizationStatus
              === "authorized"
                  ? "later-derived-vnc"
                  : "lesson23-multiple-object"),
          stemRealization: lowerTypedFrame.slots.predicate.stem
        },
        formulaArtifact: objectClusterFrame.formulaArtifact || ""
      });
      if (!isClassicalNahuatlVncSlotFrame(assembledTypedSlotFrame)) {
        return null;
      }
      const lesson23ExpandedVncBoundaryFrame = cloneClassicalNahuatlVncSlotValue(
        lowerMachineryFrame.expandedVncBoundaryFrame
          || lowerMachineryFrame.proofFrame?.conclusion?.expandedVncBoundaryFrame
          || null,
      );
      if (lesson23ExpandedVncBoundaryFrame?.directionalPrefix) {
        lesson23ExpandedVncBoundaryFrame.directionalPlacement = objectClusterFrame.positions.some(position => (
          position.objectKind === "specific-projective"
        ))
          ? "after-specific-projective-valence"
          : objectClusterFrame.positions.some(position => position.objectKind === "reflexive")
            ? "before-reflexive-reciprocal-valence"
            : "before-monadic-valence";
      }
      const finalBoundaryRealizationFrame = realizeClassicalNahuatlVncSlotFrameAtFinalBoundary({
        vncSlotFrame: assembledTypedSlotFrame,
        expandedVncBoundaryFrame: lesson23ExpandedVncBoundaryFrame,
        objectRelationshipRuleFrame: lowerMachineryFrame.objectRelationshipRuleFrame || null,
        initialVowelKind: lowerMachineryFrame.citationRuleFrame?.initialVowelKind || ""
      });
      const typedSlotFrame = finalBoundaryRealizationFrame.authorizationStatus === "authorized"
        ? finalBoundaryRealizationFrame.typedSlotFrame
        : null;
      if (!isClassicalNahuatlVncSlotFrame(typedSlotFrame)) {
        return null;
      }
      const formula = renderClassicalNahuatlVncSlotFrameFormula(typedSlotFrame);
      const lowerSentenceSurfaceFrame = cloneClassicalNahuatlVncSlotValue(lowerMachineryFrame.sentenceSurfaceFrame);
      const sentenceSurfaceFrame = lowerSentenceSurfaceFrame?.sentenceSurfaceApplies === true ? {
        ...lowerSentenceSurfaceFrame,
        baseVncFormula: formula,
        lowerLayerBaseVncFormula: lowerSentenceSurfaceFrame.baseVncFormula || "",
        compositionInputRole: "complete-multiple-object-vnc-slot-frame",
        compositionInputTypedVncSlotFrame: typedSlotFrame,
        compositionConsumesCompleteTypedVnc: true,
        formulaStringAuthority: false,
        surfaceStringAuthority: false
      } : lowerSentenceSurfaceFrame;
      const objectClusterCarrier = objectClusterFrame.positions.map(position => position.carrier).join("+");
      const proofFrame = cloneClassicalNahuatlVncSlotValue(lowerMachineryFrame.proofFrame);
      proofFrame.kind = "classical-nahuatl-multiple-object-vnc-multiple-object-vnc-proof-frame";
      proofFrame.authorizationStatus = formula ? "authorized" : "blocked";
      proofFrame.formulaStringAuthority = false;
      proofFrame.surfaceStringAuthority = false;
      proofFrame.conclusion = {
        ...proofFrame.conclusion,
        authorized: Boolean(formula),
        selectedFormula: formula,
        selectedFormulaWithoutExpandedVncBoundary: formula,
        authorizedFormula: formula,
        formulaRealization: formula,
        finalTypedVncSlotFrame: typedSlotFrame,
        finalTypedVncSemanticIdentity: typedSlotFrame.semanticIdentity,
        finalBoundaryInputFormula: formula,
        finalBoundaryObjectMorphIdentity: "",
        finalBoundaryObjectMorphIdentityKind: "multiple-object-cluster",
        finalBoundaryObjectSupportiveSpelling: "",
        finalBoundarySelectedObjectSlotBeforeRealization: objectClusterCarrier,
        finalBoundaryFinalObjectSlot: objectClusterCarrier,
        selectedObjectRelationshipKind: "multiple-object-cluster",
        selectedObjectRelationshipGroup: "multiple-object",
        selectedObjectKind: "multiple-object-cluster",
        selectedObjectPerson: "",
        selectedObjectValenceArity: "multiple",
        selectedObjectSlot: objectClusterCarrier,
        sentenceBaseVncFormula: sentenceSurfaceFrame?.baseVncFormula || "",
        sentenceSurfaceFrame,
        finalBoundaryRealizationFrame: {
          ...finalBoundaryRealizationFrame,
          kind: "classical-nahuatl-multiple-object-vnc-multiple-object-final-boundary-frame",
          authorizationStatus: formula ? "authorized" : "blocked",
          lowerTypedVncSlotFrame: assembledTypedSlotFrame,
          typedSlotFrame,
          formulaRealization: formula,
          typedSlotAuthority: true,
          formulaStringAuthority: false
        },
        objectClusterFrame,
        objectRoleAmbiguityFrame
      };
      const selectedOutputLogicFrame = {
        ...cloneClassicalNahuatlVncSlotValue(lowerMachineryFrame.selectedOutputLogicFrame),
        kind: "classical-nahuatl-multiple-object-vnc-multiple-object-selected-output-logic-frame",
        authorizationStatus: formula ? "authorized" : "blocked",
        selectedFormula: formula,
        formulaStringAuthority: false,
        outputFillers: {
          ...(cloneClassicalNahuatlVncSlotValue(lowerMachineryFrame.selectedOutputLogicFrame?.outputFillers) || {}),
          objectPositionCount: objectClusterFrame.positions.length,
          objectCarriers: objectClusterFrame.positions.map(position => position.carrier),
          selectedObjectRelationshipKind: "multiple-object-cluster",
          selectedObjectRelationshipGroup: "multiple-object",
          selectedObjectKind: "multiple-object-cluster",
          selectedObjectPerson: "",
          selectedObjectValenceArity: "multiple",
          selectedObjectSlot: objectClusterCarrier,
          sentenceBaseVncFormula: sentenceSurfaceFrame?.baseVncFormula || "",
          sentenceCompositionInputRole: sentenceSurfaceFrame?.compositionInputRole || "",
          sentenceCompositionConsumesCompleteTypedVnc: sentenceSurfaceFrame?.compositionConsumesCompleteTypedVnc === true
        },
        objectRoleAmbiguityFrame
      };
      const frame = {
        ...cloneClassicalNahuatlVncSlotValue(lowerMachineryFrame),
        kind: normalizedSourceFrameKind,
        lesson: "Andrews Lesson 23",
        lessonTitle: "Multiple-Valence VNC Object Positions",
        authorizationStatus: formula ? "authorized" : "blocked",
        blockReason: formula ? "" : "lesson23-typed-slot-realization-failed",
        valence: "multiple-object",
        // Canonical Source selection is owner-issued identity, not serializable
        // data.  Lesson 23 adds Valence positions to the same Source and must
        // retain that receipt by identity; cloning it would create a
        // shape-authorized parallel Source that the derivation owner must
        // reject.
        canonicalSourceSelectionFrame:
          lowerMachineryFrame.canonicalSourceSelectionFrame || null,
        formulaProjectionSourceFrame,
        multipleObjectClusterFrame: objectClusterFrame,
        objectRoleAmbiguityFrame,
        expandedVncBoundaryFrame: lesson23ExpandedVncBoundaryFrame,
        sentenceSurfaceFrame,
        proofFrame,
        selectedOutputLogicFrame,
        formulaRealization: formula,
        ruleLogicFrames: [objectClusterFrame, ...(objectRoleAmbiguityFrame ? [objectRoleAmbiguityFrame] : []), ...(Array.isArray(lowerMachineryFrame.ruleLogicFrames) ? cloneClassicalNahuatlVncSlotValue(lowerMachineryFrame.ruleLogicFrames) : [])],
        formulaOutputAllowed: true,
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false
      };
      if (frame.authorizationStatus === "authorized" && !frame.blockReason) {
        CLASSICAL_NAHUATL_LESSON23_ISSUED_MULTIPLE_OBJECT_VNC_FRAMES.add(frame);
        classicalNahuatlMultipleObjectFormulaSources.set(frame,formulaProjectionSourceFrame);
      }
      return frame;
    }
    function isClassicalNahuatlMultipleObjectVncFrame(frame = null) {
      if (!frame
        || !CLASSICAL_NAHUATL_LESSON23_ISSUED_MULTIPLE_OBJECT_VNC_FRAMES.has(frame)
        || !CLASSICAL_NAHUATL_LESSON23_MULTIPLE_OBJECT_VNC_FRAME_KINDS.includes(frame.kind)
        || frame.authorizationStatus !== "authorized"
        || frame.blockReason
        || frame.valence !== "multiple-object"
        || frame.formulaOutputAllowed !== true
        || frame.grammarGenerationAllowed !== false
        || frame.surfaceGenerationAllowed !== false) {
        return false;
      }
      const objectClusterFrame = frame.multipleObjectClusterFrame;
      const retainedFormulaSource=classicalNahuatlMultipleObjectFormulaSources.get(frame);
      if((frame.formulaProjectionSourceFrame || null)!==(retainedFormulaSource || null))return false;
      const objectClusterAuthorized = isClassicalNahuatlObjectClusterFrame(objectClusterFrame)
        || isClassicalNahuatlVoiceObjectClusterFrame(objectClusterFrame);
      const typedSlotFrame = frame.proofFrame?.conclusion?.finalTypedVncSlotFrame;
      const formula = isClassicalNahuatlVncSlotFrame(typedSlotFrame)
        ? renderClassicalNahuatlVncSlotFrameFormula(typedSlotFrame)
        : "";
      return Boolean(objectClusterAuthorized
        && frame.ruleLogicFrames?.[0] === objectClusterFrame
        && frame.proofFrame?.authorizationStatus === "authorized"
        && frame.proofFrame?.conclusion?.objectClusterFrame === objectClusterFrame
        && frame.proofFrame?.conclusion?.finalTypedVncSemanticIdentity === typedSlotFrame?.semanticIdentity
        && frame.selectedOutputLogicFrame?.authorizationStatus === "authorized"
        && formula
        && frame.formulaRealization === formula
        && frame.proofFrame.conclusion.selectedFormula === formula
        && frame.selectedOutputLogicFrame.selectedFormula === formula);
    }
    function buildClassicalNahuatlMultipleObjectVncFrame(lowerActiveMachineryFrame = null, {
      objectRequests = [],
      rareThirdCausativeMeaningSupported = false,
      exceptionalSuffixOrderAuthorized = false,
      formulaArtifact = "",
      surfaceArtifact = "",
      formulaProjectionSourceFrame = null
    } = {}) {
      const lowerTypedFrame = lowerActiveMachineryFrame?.proofFrame?.conclusion?.finalTypedVncSlotFrame || lowerActiveMachineryFrame?.proofFrame?.conclusion?.finalBoundaryRealizationFrame?.typedSlotFrame;
      const sourceStem = normalizeClassicalNahuatlVncSlotStem(lowerActiveMachineryFrame?.sourceVerbstem || lowerActiveMachineryFrame?.stem);
      if (!isCanonicalClassicalNahuatlLesson23LowerMachineryFrame(lowerActiveMachineryFrame)
        || !isClassicalNahuatlVncSlotFrame(lowerTypedFrame)) {
        return buildClassicalNahuatlBlockedFrame({
          voice: "active",
          blockReason: "lesson23-authorized-lower-active-vnc-required",
          activeMachineryFrame: lowerActiveMachineryFrame,
          sourceValence: "multiple-object"
        });
      }
      const objectClusterFrame = buildClassicalNahuatlObjectClusterFrame(sourceStem, {
        subject: lowerActiveMachineryFrame?.priorVncFrame?.subject || lowerActiveMachineryFrame?.subject || "",
        subjectCarrier: lowerTypedFrame.slots.subject.pers1,
        predicateStem: lowerTypedFrame.slots.predicate.stem,
        tense: lowerActiveMachineryFrame?.priorVncFrame?.tense || lowerActiveMachineryFrame?.tense || "",
        objectRequests,
        rareThirdCausativeMeaningSupported,
        exceptionalSuffixOrderAuthorized,
        minimumPositionCount: 2,
        maximumPositionCount: 3,
        formulaArtifact,
        surfaceArtifact
      });
      if (!isClassicalNahuatlObjectClusterFrame(objectClusterFrame, sourceStem)) {
        return buildClassicalNahuatlBlockedFrame({
          voice: "active",
          blockReason: objectClusterFrame.blockReason || "lesson23-authorized-object-cluster-required",
          activeMachineryFrame: lowerActiveMachineryFrame,
          sourceValence: "multiple-object"
        });
      }
      return applyClassicalNahuatlLesson23ObjectClusterToQualifiedMachineryFrame(lowerActiveMachineryFrame, objectClusterFrame,{formulaProjectionSourceFrame}) || buildClassicalNahuatlBlockedFrame({
        voice: "active",
        blockReason: "lesson23-multiple-object-slot-application-failed",
        activeMachineryFrame: lowerActiveMachineryFrame,
        sourceValence: "multiple-object"
      });
    }
    function getClassicalNahuatlVoiceRuleRefs() {
      return [{
        id: "cn-l23-multiple-valence-object-sequence",
        tagId: "cn-l23-multiple-valence-object-sequence",
        lesson: "Andrews Lesson 23",
        lineStart: 7513,
        lineEnd: 7687,
        rule: "Two or three typed Valence positions are ordered by object form: specific before reflexive, specific before nonspecific, reflexive before nonspecific, and human before nonhuman; incompatible specific projectives retain only one sounded representative."
      }, {
        id: "cn-l20-nonactive-stem",
        tagId: "cn-l20-nonactive-stem",
        lesson: "Andrews Lesson 20",
        lineStart: 6841,
        lineEnd: 7020,
        rule: "The nonactive stem is a typed derived predicate stem and belongs to Class A-2."
      }, {
        id: "cn-l21-passive-specific-object",
        tagId: "cn-l21-passive-specific-object",
        lesson: "Andrews Lesson 21",
        lineStart: 7026,
        lineEnd: 7092,
        rule: "Passive deletes the active subject, substitutes the nonactive stem, and promotes one specific projective or reflexive object to subject."
      }, {
        id: "cn-l22-impersonal-complement",
        tagId: "cn-l22-impersonal-complement",
        lesson: "Andrews Lesson 22",
        lineStart: 7265,
        lineEnd: 7365,
        rule: "Impersonal replaces the active subject with an external third-singular impersonal subject and preserves only Canvas-compatible valence."
      }, {
        id: "cn-l22-inherent-impersonal",
        tagId: "cn-l22-inherent-impersonal",
        lesson: "Andrews Lesson 22.1",
        lineStart: 7225,
        lineEnd: 7264,
        rule: "An inherently impersonal lexical VNC has only an external referentially empty third-singular subject."
      }, {
        id: "cn-l22-tla-impersonal",
        tagId: "cn-l22-tla-impersonal",
        lesson: "Andrews Lesson 22.6",
        lineStart: 7386,
        lineEnd: 7445,
        rule: "A typed tla-impersonal derivation is a new intransitive impersonal stem, not an object-prefix substitution."
      }];
    }
    function buildClassicalNahuatlBlockedFrame({
      voice = "",
      blockReason = "classical-lessons20-22-authority-blocked",
      activeMachineryFrame = null,
      nonactiveStemRecord = null,
      inherentImpersonalRecord = null,
      tlaImpersonalStemRecord = null,
      sourceObjectClusterFrame = null,
      sourceValence = ""
    } = {}) {
      const proofFrame = {
        kind: "classical-nahuatl-nonactive-vnc-voice-proof-frame",
        authorizationStatus: "blocked",
        blockReason,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        conclusion: {
          authorized: false,
          blockReason,
          selectedFormula: "",
          authorizedFormula: "",
          finalBoundaryRealizationFrame: null,
          finalTypedVncSlotFrame: null
        }
      };
      return {
        kind: "classical-nahuatl-nonactive-vnc-derived-vnc-machinery-frame",
        version: 1,
        lesson: "Andrews Lessons 20-22",
        lessonTitle: "Nonactive, passive, and impersonal VNCs",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_VNC_SLOT_SOURCE_DOCUMENT,
        authorizationStatus: "blocked",
        blockReason,
        voice,
        sourceValence,
        activeMachineryFrame,
        nonactiveStemRecord,
        inherentImpersonalRecord,
        tlaImpersonalStemRecord,
        sourceObjectClusterFrame,
        proofFrame,
        selectedOutputLogicFrame: {
          kind: "classical-nahuatl-nonactive-vnc-selected-output-logic-frame",
          authorizationStatus: "blocked",
          blockReason,
          selectedFormula: "",
          formulaStringAuthority: false
        },
        ruleRefs: getClassicalNahuatlVoiceRuleRefs(),
        ruleLogicFrames: [nonactiveStemRecord, inherentImpersonalRecord, tlaImpersonalStemRecord, sourceObjectClusterFrame].filter(Boolean),
        ruleLogicFrameKinds: [nonactiveStemRecord?.kind, inherentImpersonalRecord?.kind, tlaImpersonalStemRecord?.kind, sourceObjectClusterFrame?.kind].filter(Boolean),
        grammarGenerationAllowed: false,
        formulaOutputAllowed: false,
        surfaceGenerationAllowed: false,
        blocksInput: true
      };
    }
    function isCanonicalClassicalNahuatlNonactiveActiveMachineryFrame(frame = null) {
      const runtimeTarget = getClassicalNahuatlVncLayerRuntimeTarget();
      // Qualify the active Result before a voice operation consumes it. This
      // does not constrain the requested target environment or admit another
      // derivation, and includes already-derived active predicates.
      if (frame?.kind === "classical-nahuatl-vnc-derived-machinery-frame") {
        return typeof runtimeTarget?.isClassicalNahuatlDerivedVncMachineryFrame === "function"
          && runtimeTarget.isClassicalNahuatlDerivedVncMachineryFrame(frame) === true;
      }
      // An issued late operation (e.g. frequentative) is an active operand
      // with its own canonical slots. Authenticate it through that owner.
      if (typeof runtimeTarget?.isClassicalNahuatlMachineryFrame === "function"
        && runtimeTarget.isClassicalNahuatlMachineryFrame(frame) === true
        && (frame.operationFrame.operationFacts.sourceVoice
          || frame.operationFrame.sourceMachineryFrame?.voice || "active") === "active") return true;
      return typeof runtimeTarget?.isClassicalNahuatlVncDerivationBaseSourceMachineryFrame === "function"
        && runtimeTarget.isClassicalNahuatlVncDerivationBaseSourceMachineryFrame(frame) === true;
    }
    const nonactiveCarrierFiniteFrames = new WeakMap();
    function freezeClassicalNahuatlNonactiveCarrierFiniteValue(value, seen = new WeakSet()) {
      if (!value || typeof value !== "object" || seen.has(value)) return value;
      seen.add(value);
      Object.values(value).forEach(entry => freezeClassicalNahuatlNonactiveCarrierFiniteValue(entry, seen));
      return Object.freeze(value);
    }
    function isClassicalNahuatlNonactiveCarrierSourceFrame(record = null) {
      return Boolean(record && isClassicalNahuatlNonactiveStemRecord(record, record.sourceStem)
        && record.sourceIdentityFrame.sourceValence === "specific-projective"
        && record.sourceIsImperfectiveActiveStem === true);
    }
    function buildClassicalNahuatlNonactiveTargetMachinery(stem, options) {
      const builder = getClassicalNahuatlVncLayerRuntimeTarget()?.buildClassicalNahuatlVerbstemClassFrame;
      return typeof builder === "function" ? builder(stem, options) : null;
    }
    function buildClassicalNahuatlNonactiveCarrierFiniteFrame(record = null, options = {}) {
      const block = blockReason => Object.freeze({kind:"classical-nahuatl-nonactive-carrier-finite-frame",authorizationStatus:"blocked",blockReason});
      const allowed = new Set(["subject","subjectAnimacy","subjectHumanness","patientReferenceId","mood","tense","requestedVoice","requestedDerivation","sentenceOptions"]);
      if (!isClassicalNahuatlNonactiveCarrierSourceFrame(record)) return block("issued-specific-projective-nonactive-source-required");
      if (!options || typeof options !== "object" || Object.keys(options).some(key=>!allowed.has(key))) return block("nonactive-carrier-finite-selection-not-recognized");
      if (options.requestedVoice !== "passive" || (options.requestedDerivation && options.requestedDerivation !== "direct")) return block("nonactive-carrier-personal-passive-required");
      if (!["1sg","2sg","3sg","1pl","2pl","3pl","3common"].includes(options.subject)
        || !["animate","nonanimate"].includes(options.subjectAnimacy)
        || !["human","nonhuman"].includes(options.subjectHumanness)
        || typeof options.patientReferenceId !== "string" || !options.patientReferenceId.trim()) return block("explicit-specific-passive-patient-required");
      const patient = buildClassicalNahuatlParticipantFrame({role:"subject",case:"nominative",agreement:options.subject,
        animacy:options.subjectAnimacy,humanness:options.subjectHumanness,specificity:"specific",referenceId:options.patientReferenceId});
      if (!isClassicalNahuatlParticipantFrame(patient) || patient.category !== options.subject
        || patient.animacy !== options.subjectAnimacy || patient.humanness !== options.subjectHumanness) return block("passive-patient-context-mismatch");
      const sourceObject = buildClassicalNahuatlParticipantFrame({role:"object",case:"accusative",agreement:options.subject,
        animacy:patient.animacy,humanness:patient.humanness,specificity:"specific",referenceId:patient.referenceId});
      const perfective = isClassicalNahuatlPerfectiveEnvironment({mood:options.mood,tense:options.tense});
      const stem = perfective ? record.perfectiveNonactiveStem : record.imperfectiveNonactiveStem;
      const target = buildClassicalNahuatlNonactiveTargetMachinery(stem, {...options.sentenceOptions,
        subject:patient.morphologicalAgreement,mood:options.mood,tense:options.tense,
        verbClass:"A",perfectiveClass:"A",valence:"intransitive",transitivity:"intransitive",objectKind:"none",objectPerson:"",tlaFusion:false});
      const lower = target?.proofFrame?.conclusion?.finalTypedVncSlotFrame;
      if (target?.proofFrame?.authorizationStatus !== "authorized" || !isClassicalNahuatlVncSlotFrame(lower)) return block(target?.blockReason || "nonactive-carrier-target-finite-not-authorized");
      const typed = cloneClassicalNahuatlVncSlotValue(lower);
      typed.slots.subject.participantFrame = patient;
      typed.slots.subject.subjectCategory = patient.category;
      const promotion = Object.freeze({kind:"classical-nahuatl-passive-patient-promotion-frame",authorizationStatus:"authorized",
        canonicalNonactiveStemRecord:record,sourceObjectParticipantFrame:sourceObject,targetSubjectParticipantFrame:patient,
        sourceSubjectFrame:null,sourceSubjectDeleted:true,promotedObjectBecomesSubject:true,agentExpressible:false,
        sourceValence:"specific-projective",targetValence:"intransitive",voice:"passive"});
      // This exact issued finite owns its cloned slots and target machinery.
      // Freeze their full graph before attaching the private receipt: no later
      // caller can change a predicate or patient while retaining that receipt.
      const frame = freezeClassicalNahuatlNonactiveCarrierFiniteValue({...target,kind:"classical-nahuatl-nonactive-carrier-finite-frame",authorizationStatus:"authorized",blockReason:"",
        canonicalNonactiveStemRecord:record,derivedMachineryFrame:target,subject:patient.morphologicalAgreement,
        subjectParticipantFrame:patient,voice:"passive",voiceTransformationFrame:promotion,
        targetClass:record.targetClass,sourceMachineryFrame:record,sourceSubjectFrame:null,
        proofFrame:Object.freeze({...target.proofFrame,conclusion:Object.freeze({...target.proofFrame.conclusion,finalTypedVncSlotFrame:typed})})});
      nonactiveCarrierFiniteFrames.set(frame,Object.freeze({record,target,typed,patient,promotion}));
      return frame;
    }
    function isClassicalNahuatlNonactiveCarrierFiniteFrame(frame = null) {
      const c = frame && nonactiveCarrierFiniteFrames.get(frame);
      return Boolean(c && frame.authorizationStatus === "authorized" && isClassicalNahuatlNonactiveCarrierSourceFrame(c.record)
        && frame.canonicalNonactiveStemRecord === c.record && frame.derivedMachineryFrame === c.target
        && frame.voiceTransformationFrame === c.promotion && frame.subjectParticipantFrame === c.patient
        && frame.proofFrame.conclusion.finalTypedVncSlotFrame === c.typed && c.typed.slots.subject.participantFrame === c.patient
        && c.promotion.sourceObjectParticipantFrame.referenceId === c.patient.referenceId && Object.isFrozen(frame));
    }
    function buildClassicalNahuatlDerivedVncFrame(activeMachineryFrame = null, {
      voice = "active",
      nonactiveStemRecord = null,
      inherentImpersonalRecord = null,
      tlaImpersonalStemRecord = null,
      sourceObjectClusterFrame = null,
      sourceValence = "",
      sourceSubject = "",
      sourceObjectPerson = "",
      impersonalDerivationPath = "direct-active",
      mood = "indicative",
      tense = "present",
      verbClass = "A",
      sentenceOptions = {}
    } = {}) {
      const normalizedVoice = normalizeClassicalNahuatlVncSlotCarrier(voice);
      if (normalizedVoice === "active") {
        return activeMachineryFrame;
      }
      const activeAuthorized = isCanonicalClassicalNahuatlNonactiveActiveMachineryFrame(activeMachineryFrame)
        && activeMachineryFrame?.proofFrame?.authorizationStatus === "authorized"
        && isClassicalNahuatlVncSlotFrame(activeMachineryFrame?.proofFrame?.conclusion?.finalTypedVncSlotFrame || activeMachineryFrame?.proofFrame?.conclusion?.finalBoundaryRealizationFrame?.typedSlotFrame);
      const normalizedSourceStem = normalizeClassicalNahuatlVncSlotStem(activeMachineryFrame?.sourceVerbstem || activeMachineryFrame?.stem);
      const normalizedSourceValence = normalizeClassicalNahuatlVncSlotCarrier(sourceValence || activeMachineryFrame?.valence);
      const normalizedSourceSubject = normalizeClassicalNahuatlVncSlotCarrier(sourceSubject || activeMachineryFrame?.priorVncFrame?.subject);
      const normalizedObjectPerson = normalizeClassicalNahuatlVncSlotCarrier(sourceObjectPerson || activeMachineryFrame?.priorVncFrame?.objectFrame?.objectPerson);
      const requestedSourceObjectClusterFrame = sourceObjectClusterFrame || activeMachineryFrame?.multipleObjectClusterFrame || null;
      const multipleObjectSource = isClassicalNahuatlObjectClusterFrame(requestedSourceObjectClusterFrame, normalizedSourceStem);
      const typedSourceObjectClusterFrame = multipleObjectSource ? requestedSourceObjectClusterFrame : null;
      const sourceClusterPositions = multipleObjectSource ? typedSourceObjectClusterFrame.positions : [];
      const sourceClusterSpecificPositions = sourceClusterPositions.filter(position => position.objectKind === "specific-projective");
      const passive = normalizedVoice === "passive";
      const impersonal = normalizedVoice === "impersonal";
      const normalizedImpersonalDerivationPath =
        normalizeClassicalNahuatlVncSlotCarrier(impersonalDerivationPath)
        || "direct-active";
      const recognizedImpersonalDerivationPath = [
        "direct-active",
        "passive-then-impersonal",
      ].includes(normalizedImpersonalDerivationPath);
      const inherentImpersonal = normalizedVoice === "inherent-impersonal";
      const tlaImpersonal = normalizedVoice === "tla-impersonal";
      const humanProjectiveImpersonalizedPassive = Boolean(
        impersonal
        && normalizedSourceValence === "projective-human"
        && !multipleObjectSource
        && normalizedImpersonalDerivationPath === "passive-then-impersonal"
      );
      if (!activeAuthorized) {
        return buildClassicalNahuatlBlockedFrame({
          voice: normalizedVoice,
          blockReason: "lessons20-22-authorized-active-vnc-source-required",
          activeMachineryFrame,
          nonactiveStemRecord,
          inherentImpersonalRecord,
          tlaImpersonalStemRecord,
          sourceObjectClusterFrame: typedSourceObjectClusterFrame,
          sourceValence: normalizedSourceValence
        });
      }
      if (!passive && !impersonal && !inherentImpersonal && !tlaImpersonal) {
        return buildClassicalNahuatlBlockedFrame({
          voice: normalizedVoice,
          blockReason: "lessons20-22-unknown-derived-voice",
          activeMachineryFrame,
          nonactiveStemRecord,
          inherentImpersonalRecord,
          tlaImpersonalStemRecord,
          sourceObjectClusterFrame: typedSourceObjectClusterFrame,
          sourceValence: normalizedSourceValence
        });
      }
      if (impersonal && !recognizedImpersonalDerivationPath) {
        return buildClassicalNahuatlBlockedFrame({
          voice: normalizedVoice,
          blockReason: "lesson22-impersonal-derivation-path-not-recognized",
          activeMachineryFrame,
          nonactiveStemRecord,
          sourceObjectClusterFrame: typedSourceObjectClusterFrame,
          sourceValence: normalizedSourceValence
        });
      }
      if (
        normalizedImpersonalDerivationPath === "passive-then-impersonal"
        && (!impersonal
          || normalizedSourceValence !== "projective-human"
          || multipleObjectSource)
      ) {
        return buildClassicalNahuatlBlockedFrame({
          voice: normalizedVoice,
          blockReason: "lesson38-impersonalized-passive-requires-single-human-projective-source",
          activeMachineryFrame,
          nonactiveStemRecord,
          sourceObjectClusterFrame: typedSourceObjectClusterFrame,
          sourceValence: normalizedSourceValence
        });
      }
      if ((passive || impersonal) && !isClassicalNahuatlNonactiveStemRecord(nonactiveStemRecord, normalizedSourceStem)) {
        return buildClassicalNahuatlBlockedFrame({
          voice: normalizedVoice,
          blockReason: nonactiveStemRecord?.blockReason || "lesson20-authorized-typed-nonactive-stem-record-required",
          activeMachineryFrame,
          nonactiveStemRecord,
          inherentImpersonalRecord,
          tlaImpersonalStemRecord,
          sourceObjectClusterFrame: typedSourceObjectClusterFrame,
          sourceValence: normalizedSourceValence
        });
      }
      if (inherentImpersonal && !isClassicalNahuatlInherentImpersonalRecord(inherentImpersonalRecord, normalizedSourceStem)) {
        return buildClassicalNahuatlBlockedFrame({
          voice: normalizedVoice,
          blockReason: inherentImpersonalRecord?.blockReason || "lesson22-authorized-inherent-impersonal-record-required",
          activeMachineryFrame,
          inherentImpersonalRecord,
          sourceObjectClusterFrame: typedSourceObjectClusterFrame,
          sourceValence: normalizedSourceValence
        });
      }
      if (tlaImpersonal && !isClassicalNahuatlTlaImpersonalStemRecord(tlaImpersonalStemRecord, normalizedSourceStem)) {
        return buildClassicalNahuatlBlockedFrame({
          voice: normalizedVoice,
          blockReason: tlaImpersonalStemRecord?.blockReason || "lesson22-authorized-tla-impersonal-stem-record-required",
          activeMachineryFrame,
          tlaImpersonalStemRecord,
          sourceObjectClusterFrame: typedSourceObjectClusterFrame,
          sourceValence: normalizedSourceValence
        });
      }
      const reflexiveSource = ["mainline-reflexive", "shuntline-reflexive", "human-reciprocal"].includes(normalizedSourceValence) || sourceClusterPositions.some(position => position.objectKind === "reflexive");
      const specificProjectiveSource = normalizedSourceValence === "specific-projective" || sourceClusterSpecificPositions.length > 0;
      const nonspecificOrIntransitiveSource = ["intransitive", "projective-human", "projective-nonhuman"].includes(normalizedSourceValence);
      const grammarSelectionFrame =
        evaluateClassicalNahuatlGrammarSelection({
          operationId: normalizedVoice,
          sourceAuthorized: activeAuthorized,
          nonactiveRecordAuthorized:
            isClassicalNahuatlNonactiveStemRecord(
              nonactiveStemRecord,
              normalizedSourceStem
            ),
          sourceValence: normalizedSourceValence,
          hasSpecificObject: specificProjectiveSource,
          hasReflexiveObject: reflexiveSource,
          hasSpecificObjectInCluster: sourceClusterSpecificPositions.length > 0,
          inherentSourceAuthorized:
            isClassicalNahuatlInherentImpersonalRecord(
              inherentImpersonalRecord,
              normalizedSourceStem
            ),
          tlaSourceAuthorized:
            isClassicalNahuatlTlaImpersonalStemRecord(
              tlaImpersonalStemRecord,
              normalizedSourceStem
            ),
        });
      if (grammarSelectionFrame.authorizationStatus !== "authorized") {
        return buildClassicalNahuatlBlockedFrame({
          voice: normalizedVoice,
          blockReason: grammarSelectionFrame.blockReason,
          activeMachineryFrame,
          nonactiveStemRecord,
          inherentImpersonalRecord,
          tlaImpersonalStemRecord,
          sourceObjectClusterFrame: typedSourceObjectClusterFrame,
          sourceValence: normalizedSourceValence
        });
      }
      if (passive && multipleObjectSource && sourceClusterSpecificPositions.length === 0) {
        return buildClassicalNahuatlBlockedFrame({
          voice: normalizedVoice,
          blockReason: "lesson21-passive-requires-specific-projective-object-in-cluster",
          activeMachineryFrame,
          nonactiveStemRecord,
          sourceObjectClusterFrame: typedSourceObjectClusterFrame,
          sourceValence: normalizedSourceValence
        });
      }
      if (passive && !multipleObjectSource && !specificProjectiveSource && !reflexiveSource) {
        return buildClassicalNahuatlBlockedFrame({
          voice: normalizedVoice,
          blockReason: "lesson21-passive-requires-specific-projective-or-reflexive-object",
          activeMachineryFrame,
          nonactiveStemRecord,
          inherentImpersonalRecord,
          tlaImpersonalStemRecord,
          sourceObjectClusterFrame: typedSourceObjectClusterFrame,
          sourceValence: normalizedSourceValence
        });
      }
      if (impersonal && multipleObjectSource && sourceClusterSpecificPositions.length > 0) {
        return buildClassicalNahuatlBlockedFrame({
          voice: normalizedVoice,
          blockReason: "lesson22-impersonal-blocks-specific-projective-object-cluster",
          activeMachineryFrame,
          nonactiveStemRecord,
          sourceObjectClusterFrame: typedSourceObjectClusterFrame,
          sourceValence: normalizedSourceValence
        });
      }
      if (impersonal && !multipleObjectSource && !nonspecificOrIntransitiveSource && !reflexiveSource) {
        return buildClassicalNahuatlBlockedFrame({
          voice: normalizedVoice,
          blockReason: "lesson22-impersonal-blocks-specific-projective-object-source",
          activeMachineryFrame,
          nonactiveStemRecord,
          inherentImpersonalRecord,
          tlaImpersonalStemRecord,
          sourceObjectClusterFrame: typedSourceObjectClusterFrame,
          sourceValence: normalizedSourceValence
        });
      }
      if ((inherentImpersonal || tlaImpersonal) && normalizedSourceValence !== "intransitive") {
        return buildClassicalNahuatlBlockedFrame({
          voice: normalizedVoice,
          blockReason: inherentImpersonal ? "lesson22-inherent-impersonal-requires-lexical-intransitive-source" : "lesson22-tla-impersonal-requires-intransitive-source",
          activeMachineryFrame,
          inherentImpersonalRecord,
          tlaImpersonalStemRecord,
          sourceObjectClusterFrame: typedSourceObjectClusterFrame,
          sourceValence: normalizedSourceValence
        });
      }
      const sourceLesson11Plan = activeMachineryFrame?.lesson11ParadigmPlan;
      const inheritedIrregularEnvironment = sourceLesson11Plan?.applies === true && sourceLesson11Plan.authorizationStatus === "authorized";
      const inheritedTenseOnlyEnvironment = Boolean(
        inheritedIrregularEnvironment
        && sourceLesson11Plan.tnsOverride
        && !sourceLesson11Plan.selectedStemOverride
        && !sourceLesson11Plan.num1Override
      );
      const targetTense = inheritedIrregularEnvironment ? sourceLesson11Plan.morphologicalTense || tense : tense;
      const voiceObjectClusterFrame = multipleObjectSource && (passive || impersonal) ? buildClassicalNahuatlVoiceObjectClusterFrame(typedSourceObjectClusterFrame, {
        voice: normalizedVoice,
        tense: targetTense,
        sourceMachineryFrame: activeMachineryFrame,
        nonactiveStemRecord
      }) : null;
      if (voiceObjectClusterFrame && voiceObjectClusterFrame.authorizationStatus !== "authorized") {
        return buildClassicalNahuatlBlockedFrame({
          voice: normalizedVoice,
          blockReason: voiceObjectClusterFrame.blockReason,
          activeMachineryFrame,
          nonactiveStemRecord,
          sourceObjectClusterFrame: typedSourceObjectClusterFrame,
          sourceValence: normalizedSourceValence
        });
      }
      const targetSubject = passive ? multipleObjectSource ? voiceObjectClusterFrame.promotedObjectPerson : specificProjectiveSource ? normalizedObjectPerson : normalizedSourceSubject : "3sg";
      if (!targetSubject) {
        return buildClassicalNahuatlBlockedFrame({
          voice: normalizedVoice,
          blockReason: "lesson21-promoted-specific-object-subject-required",
          activeMachineryFrame,
          nonactiveStemRecord,
          inherentImpersonalRecord,
          tlaImpersonalStemRecord,
          sourceObjectClusterFrame: typedSourceObjectClusterFrame,
          sourceValence: normalizedSourceValence
        });
      }
      const retainedObjectPositions = voiceObjectClusterFrame?.positions || [];
      const getSingleTargetValence = (position = null) => {
        if (!position) {
          return "intransitive";
        }
        return {
          reflexive: "shuntline-reflexive",
          "nonspecific-human": "projective-human",
          "nonspecific-nonhuman": "projective-nonhuman",
          "specific-projective": "specific-projective"
        }[position.objectKind] || "intransitive";
      };
      const targetValence = multipleObjectSource ? retainedObjectPositions.length > 1 ? "multiple-object" : getSingleTargetValence(retainedObjectPositions[0]) : passive ? specificProjectiveSource ? "intransitive" : "shuntline-reflexive" : inherentImpersonal || tlaImpersonal || humanProjectiveImpersonalizedPassive ? "intransitive" : reflexiveSource ? "shuntline-reflexive" : normalizedSourceValence;
      const targetBuilderValence = targetValence === "multiple-object" ? getSingleTargetValence(retainedObjectPositions[0]) : targetValence;
      const selectedNonactiveAspect = isClassicalNahuatlPerfectiveEnvironment({
        mood,
        tense: targetTense
      }) ? "perfective" : "imperfective";
      let targetStem = passive || impersonal ? selectedNonactiveAspect === "perfective" ? nonactiveStemRecord.perfectiveNonactiveStem || nonactiveStemRecord.nonactiveStem : nonactiveStemRecord.imperfectiveNonactiveStem || nonactiveStemRecord.nonactiveStem : inherentImpersonal ? inherentImpersonalRecord.inherentImpersonalStem : tlaImpersonalStemRecord.impersonalStem;
      const nonactiveFormulaTargetStem = targetStem;
      let formulaTargetStem = humanProjectiveImpersonalizedPassive
        ? `tla-${nonactiveFormulaTargetStem}`
        : nonactiveFormulaTargetStem;
      const targetClass = passive || impersonal ? "A" : verbClass;
      const targetClassProfile = passive || impersonal ? nonactiveStemRecord.targetClass || "A" : verbClass;
      const lexicalDerivationRecord = nonactiveStemRecord || inherentImpersonalRecord || tlaImpersonalStemRecord;
      const targetObjectKind = {
        "shuntline-reflexive": "shuntline-reflexive",
        "projective-human": "nonspecific-human",
        "projective-nonhuman": "nonspecific-nonhuman",
        "mainline-reflexive": "mainline-reflexive",
        "human-reciprocal": "mainline-reflexive",
        "specific-projective": "specific-projective"
      }[targetBuilderValence] || "specific-projective";
      const runtimeTarget = getClassicalNahuatlVncLayerRuntimeTarget();
      const derivedBuilder = runtimeTarget?.buildClassicalNahuatlVerbstemClassFrame;
      if (typeof derivedBuilder !== "function") {
        return buildClassicalNahuatlBlockedFrame({
          voice: normalizedVoice,
          blockReason: "lessons20-22-derived-vnc-builder-unavailable",
          activeMachineryFrame,
          nonactiveStemRecord,
          inherentImpersonalRecord,
          tlaImpersonalStemRecord,
          sourceValence: normalizedSourceValence
        });
      }
      // Internal tla deletes the source subject before selecting the finite
      // irregular cell. Prefix the canonical 3sg member (ye / ca-h, etc.),
      // rather than treating the entered member as an invariant regular stem.
      const inheritedTlaCoordinateEnvironment = tlaImpersonal
        && inheritedIrregularEnvironment;
      const tlaCoordinateSourceMachineryFrame = inheritedTlaCoordinateEnvironment
        ? derivedBuilder(normalizedSourceStem, {
          ...cloneClassicalNahuatlVncSlotValue(sentenceOptions),
          subject: targetSubject,
          mood: sourceLesson11Plan.requestedMood || mood,
          tense: sourceLesson11Plan.requestedParadigmTense || tense,
          irregularStemChoice: sourceLesson11Plan.selectedAlternativeStem
            || sourceLesson11Plan.requestedAlternativeStem || "",
          lexicalReading: sourceLesson11Plan.identity?.lexicalReading
            || sentenceOptions.lexicalReading || "",
          verbClass,
          perfectiveClass: verbClass, valence: "intransitive",
          transitivity: "intransitive", tlaFusion: false,
        })
        : null;
      const tlaCoordinateSourceTypedFrame = tlaCoordinateSourceMachineryFrame
        ?.proofFrame?.conclusion?.finalTypedVncSlotFrame;
      const coordinateTlaImpersonalStemRecord = inheritedTlaCoordinateEnvironment
        && tlaCoordinateSourceMachineryFrame?.proofFrame?.authorizationStatus === "authorized"
        && isClassicalNahuatlVncSlotFrame(tlaCoordinateSourceTypedFrame)
        ? buildClassicalNahuatlTlaImpersonalStemRecord(
          tlaCoordinateSourceTypedFrame.slots.predicate.stem,
          {selectionAuthority: "andrews-lesson22-rule-derivation"},
        )
        : null;
      if (inheritedTlaCoordinateEnvironment) {
        if (coordinateTlaImpersonalStemRecord?.authorizationStatus !== "authorized") {
          return buildClassicalNahuatlBlockedFrame({
            voice: normalizedVoice,
            blockReason: "lesson22-tla-impersonal-irregular-coordinate-required",
            activeMachineryFrame, tlaImpersonalStemRecord,
            sourceValence: normalizedSourceValence,
          });
        }
        targetStem = coordinateTlaImpersonalStemRecord.impersonalStem;
        formulaTargetStem = targetStem;
      }
      const sourceInitialVowelKind = activeMachineryFrame
        ?.citationRuleFrame?.initialVowelKind || "";
      const retainedInitialBase = normalizedSourceStem.split("-")[0];
      const endingRelation = nonactiveStemRecord?.finalShapeRelation;
      const initialEdgeRetainedByEndingOperation = Boolean(
        endingRelation?.authorizationStatus === "authorized"
        && nonactiveStemRecord.selectedFormationAuthority !== "suppletive-lexical-rule"
        && endingRelation.sourceFinalShapeFrame?.stem === normalizedSourceStem
        && endingRelation.nonactiveFinalShapeFrame?.stem === nonactiveStemRecord.nonactiveStem
        && endingRelation.ruleId === nonactiveStemRecord.selectedRuleId
        && Array.from(endingRelation.retainedStem || "").length > 1
        && normalizedSourceStem.startsWith(endingRelation.retainedStem)
        && formulaTargetStem.startsWith(endingRelation.retainedStem)
      );
      const inheritedInitialVowelKind = (passive || impersonal)
        && /^[iī]/u.test(retainedInitialBase)
        && (retainedInitialBase === formulaTargetStem.split("-")[0]
          || initialEdgeRetainedByEndingOperation)
        && ["real", "supportive"].includes(sourceInitialVowelKind)
        ? sourceInitialVowelKind
        : "";
      let derivedMachineryFrame = buildClassicalNahuatlNonactiveTargetMachinery(formulaTargetStem, {
        ...cloneClassicalNahuatlVncSlotValue(sentenceOptions),
        // Source number is retired by voice. Its plural admonitive ending
        // remains a choice only when the promoted target is also plural.
        ...(mood === "admonitive" && !targetSubject.endsWith("pl")
          ? {admonitivePluralEnding: ""} : {}),
        // Transfer the validated Source analysis only when suffixation
        // preserves its initial base, including licensed final truncation;
        // a suppletive target's matching letters do not establish continuity.
        initialVowelKind: inheritedInitialVowelKind,
        // A common-number patient has third-singular finite morphology. Keep
        // its semantic category in the voice transformation, not in the
        // lower finite carrier menu.
        subject: buildClassicalNahuatlParticipantFrame({
          role: "subject", agreement: targetSubject,
        }).morphologicalAgreement,
        mood,
        tense: targetTense,
        verbClass: targetClass,
        perfectiveClass: targetClass,
        valence: targetBuilderValence,
        transitivity: targetBuilderValence === "intransitive" ? "intransitive" : "transitive",
        objectKind: targetObjectKind,
        objectPerson: targetBuilderValence === "specific-projective" ? retainedObjectPositions[0]?.objectPerson || normalizedObjectPerson : "",
        tlaFusion: false
      });
      if (voiceObjectClusterFrame?.positions?.length) {
        derivedMachineryFrame = applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame(derivedMachineryFrame, voiceObjectClusterFrame, {
          sourceFrameKind: "classical-nahuatl-voice-object-vnc-derived-multiple-object-vnc-machinery-frame"
        });
      }
      const lowerDerivedTypedVncSlotFrame =
        derivedMachineryFrame?.proofFrame?.conclusion?.finalTypedVncSlotFrame
        || derivedMachineryFrame?.proofFrame?.conclusion?.finalBoundaryRealizationFrame?.typedSlotFrame
        || null;
      // A lexical boundary fact is read from its genuine canonical Source. It
      // is neither the generic contextual-i chooser nor an arbitrary ih rule.
      const initialContextSourceRecord = runtimeTarget?.resolveClassicalNahuatlCanonicalSourceStemRecord?.({
        enteredStem:normalizedSourceStem,basalUnit:"vnc",valence:"transitive"});
      const initialContextProfile = runtimeTarget?.isClassicalNahuatlCanonicalSourceStemRecord?.(initialContextSourceRecord)
        && initialContextSourceRecord.stem === normalizedSourceStem
        ? initialContextSourceRecord.initialIAnalysis?.nonactiveBoundaryProfile : null;
      const contextualInitialBoundaryApplies = Boolean(impersonal
        && initialContextProfile?.context === "impersonal-shuntline-ne"
        && initialContextProfile.sourceValence === normalizedSourceValence
        && initialContextProfile.targetValence === targetBuilderValence
        && initialContextProfile.tenses.includes(tense)
        && initialContextProfile.sourceInitialVowelKind === sourceInitialVowelKind
        && initialContextProfile.targetInitialVowelKind === "supportive"
        && isClassicalNahuatlNonactiveStemRecord(nonactiveStemRecord,normalizedSourceStem)
        && initialEdgeRetainedByEndingOperation
        && isClassicalNahuatlVncSlotFrame(lowerDerivedTypedVncSlotFrame)
        && lowerDerivedTypedVncSlotFrame.slots.prePredicate.at(-1)?.carrier === "ne"
        && lowerDerivedTypedVncSlotFrame.slots.predicate.stem === formulaTargetStem
        && /^i[^iī]/u.test(formulaTargetStem));
      const initialIContextBoundaryFrame = contextualInitialBoundaryApplies ? (() => {
        const typed = cloneClassicalNahuatlVncSlotValue(lowerDerivedTypedVncSlotFrame);
        // This is the owned supportive-vowel boundary operation on the typed
        // predicate, before formula generation or Lesson2 writing.
        typed.slots.predicate.stem = typed.slots.predicate.stem.slice(1);
        const {subject,prePredicate,predicate,number}=typed.slots;
        typed.semanticIdentity=[subject.pers1,subject.pers2,...prePredicate.map(x=>x.carrier),
          predicate.stem,predicate.tns,number.num1,number.num2].join("|");
        const boundary=runtimeTarget.realizeClassicalNahuatlVncSlotFrameAtFinalBoundary({vncSlotFrame:typed});
        return {kind:"classical-nahuatl-lexical-initial-i-context-boundary-frame",
          authorizationStatus:boundary.authorizationStatus,context:initialContextProfile.context,
          canonicalSourceStemRecord:initialContextSourceRecord,canonicalNonactiveStemRecord:nonactiveStemRecord,
          sourceStem:normalizedSourceStem,sourceInitialVowelKind,targetInitialVowelKind:"supportive",
          sourceTypedVncSlotFrame:lowerDerivedTypedVncSlotFrame,typedVncSlotFrame:typed,
          finalBoundaryRealizationFrame:boundary,callerSuppliedProfileAccepted:false};
      })() : null;
      // The validated voice operation owns this transfer to its freshly built
      // target. It is not a license to apply a source irregular plan to any
      // unrelated slot through the public Lesson 11 application API.
      const inheritedCoordinateEnvironment = inheritedTenseOnlyEnvironment
        || inheritedTlaCoordinateEnvironment;
      const inheritedLesson11ApplicationFrame = inheritedCoordinateEnvironment
        && derivedMachineryFrame?.proofFrame?.authorizationStatus === "authorized"
        && lowerDerivedTypedVncSlotFrame?.slots?.predicate
        ? (() => {
          const frame = cloneClassicalNahuatlVncSlotValue(lowerDerivedTypedVncSlotFrame);
          frame.slots.predicate.tns = inheritedTlaCoordinateEnvironment
            ? tlaCoordinateSourceTypedFrame.slots.predicate.tns
            : sourceLesson11Plan.tnsOverride;
          if (inheritedTlaCoordinateEnvironment) {
            frame.slots.predicate.stem = targetStem;
            frame.slots.number = cloneClassicalNahuatlVncSlotValue(
              tlaCoordinateSourceTypedFrame.slots.number,
            );
          }
          frame.lesson11Plan = cloneClassicalNahuatlVncSlotValue(
            inheritedTlaCoordinateEnvironment
              ? tlaCoordinateSourceMachineryFrame.lesson11ParadigmPlan
              : sourceLesson11Plan,
          );
          frame.phase = inheritedTlaCoordinateEnvironment
            ? "lesson11-irregular-coordinate-inherited-by-tla-impersonal"
            : "lesson11-irregular-tense-inherited-by-nonactive";
          const { subject, prePredicate, predicate, number } = frame.slots;
          frame.semanticIdentity = [subject?.pers1 || "", subject?.pers2 || "",
            ...(prePredicate || []).map(slot => slot.carrier), predicate.stem,
            predicate.tns, number.num1, number.num2].join("|");
          return {
            kind: "classical-nahuatl-irregular-vnc-vnc-application-frame",
            authorizationStatus: "authorized",
            operation: inheritedTlaCoordinateEnvironment
              ? "tla-impersonal-conditioned-coordinate-inheritance"
              : "nonactive-conditioned-tense-inheritance",
            plan: sourceLesson11Plan,
            coordinatePlan: tlaCoordinateSourceMachineryFrame?.lesson11ParadigmPlan || null,
            coordinateSourceMachineryFrame: tlaCoordinateSourceMachineryFrame,
            coordinateTlaImpersonalStemRecord,
            sourceTypedVncSlotFrame: cloneClassicalNahuatlVncSlotValue(lowerDerivedTypedVncSlotFrame),
            typedVncSlotFrame: frame
          };
        })()
        : null;
      const inheritedLesson11BoundaryFrame = inheritedLesson11ApplicationFrame?.authorizationStatus === "authorized"
        && typeof runtimeTarget?.realizeClassicalNahuatlVncSlotFrameAtFinalBoundary === "function"
        ? runtimeTarget.realizeClassicalNahuatlVncSlotFrameAtFinalBoundary({
          vncSlotFrame: inheritedLesson11ApplicationFrame.typedVncSlotFrame
        })
        : null;
      const inheritedTenseAuthorized = !inheritedCoordinateEnvironment
        || Boolean(
          inheritedLesson11ApplicationFrame?.authorizationStatus === "authorized"
          && inheritedLesson11BoundaryFrame?.authorizationStatus === "authorized"
          && typeof runtimeTarget?.isClassicalNahuatlVncSlotFrame === "function"
          && runtimeTarget.isClassicalNahuatlVncSlotFrame(
            inheritedLesson11BoundaryFrame.typedSlotFrame
          )
        );
      const derivedAuthorized = derivedMachineryFrame?.proofFrame?.authorizationStatus === "authorized"
        && inheritedTenseAuthorized;
      if (!derivedAuthorized) {
        return buildClassicalNahuatlBlockedFrame({
          voice: normalizedVoice,
          blockReason: inheritedCoordinateEnvironment && !inheritedTenseAuthorized
            ? inheritedLesson11BoundaryFrame?.blockReason
              || inheritedLesson11ApplicationFrame?.blockReason
              || "lessons20-22-inherited-irregular-tense-operation-not-authorized"
            : derivedMachineryFrame?.blockReason
              || derivedMachineryFrame?.proofFrame?.conclusion?.blockReason
              || "lessons20-22-derived-vnc-not-authorized",
          activeMachineryFrame,
          nonactiveStemRecord,
          inherentImpersonalRecord,
          tlaImpersonalStemRecord,
          sourceObjectClusterFrame: typedSourceObjectClusterFrame,
          sourceValence: normalizedSourceValence
        });
      }
      let derivedProofConclusion = cloneClassicalNahuatlVncSlotValue(derivedMachineryFrame.proofFrame.conclusion);
      if (inheritedCoordinateEnvironment) {
        const inheritedFormula = inheritedLesson11BoundaryFrame.formulaRealization;
        derivedProofConclusion = {
          ...derivedProofConclusion,
          selectedFormula: inheritedFormula,
          authorizedFormula: inheritedFormula,
          formulaRealization: inheritedFormula,
          finalTypedVncSlotFrame: cloneClassicalNahuatlVncSlotValue(
            inheritedLesson11BoundaryFrame.typedSlotFrame
          ),
          finalTypedVncSemanticIdentity:
            inheritedLesson11BoundaryFrame.typedSlotFrame.semanticIdentity,
          finalBoundaryRealizationFrame: cloneClassicalNahuatlVncSlotValue(
            inheritedLesson11BoundaryFrame
          ),
          inheritedLesson11ApplicationFrame: cloneClassicalNahuatlVncSlotValue(
            inheritedLesson11ApplicationFrame
          )
        };
      }
      if (initialIContextBoundaryFrame?.authorizationStatus === "authorized") {
        const boundary=initialIContextBoundaryFrame.finalBoundaryRealizationFrame;
        derivedProofConclusion={...derivedProofConclusion,selectedFormula:boundary.formulaRealization,
          authorizedFormula:boundary.formulaRealization,formulaRealization:boundary.formulaRealization,
          finalTypedVncSlotFrame:cloneClassicalNahuatlVncSlotValue(boundary.typedSlotFrame),
          finalTypedVncSemanticIdentity:boundary.typedSlotFrame.semanticIdentity,
          finalBoundaryRealizationFrame:boundary,initialIContextBoundaryFrame};
      }
      const formula = derivedProofConclusion.selectedFormula || derivedProofConclusion.authorizedFormula || "";
      const participantRoleTransitionFrame =
        buildClassicalNahuatlParticipantRoleTransitionFrame({
          operationId: `voice:${normalizedVoice}`,
          sourceRoles: [
            "source-subject",
            ...(sourceClusterPositions.length ? ["source-object"] : []),
          ],
          targetRoles: [
            "target-subject",
            ...(retainedObjectPositions.length ? ["target-object"] : []),
          ],
          retiredSourceRoles: [
            "source-subject-controller",
            ...(passive ? ["promoted-source-object-as-object"] : []),
          ],
          activatedTargetRoles: [
            passive
              ? "promoted-object-as-target-subject"
              : "impersonal-target-subject",
          ],
          preservedParticipantFacts: [
            "typed-source-history",
            ...(passive
              ? ["promoted-object-participant-identity"]
              : []),
          ],
        });
      const voiceTransformationFrame = {
        kind: `classical-nahuatl-${passive ? "passive-vnc-passive" : `impersonal-vnc-${normalizedVoice}`}-transformation-frame`,
        authorizationStatus: "authorized",
        voice: normalizedVoice,
        sourceStem: normalizedSourceStem,
        targetStem,
        ...(initialIContextBoundaryFrame ? {initialIContextBoundaryFrame} : {}),
        realizedTargetStem: formulaTargetStem,
        sourceSubject: normalizedSourceSubject,
        sourceSubjectDeleted: true,
        sourceValence: normalizedSourceValence,
        targetValence,
        sourceSpecificObject: normalizedObjectPerson,
        sourceObjectClusterFrame: typedSourceObjectClusterFrame,
        sourceObjectPositionCount: sourceClusterPositions.length,
        sourceObjectCarriers: sourceClusterPositions.map(position => position.carrier),
        targetObjectClusterFrame: voiceObjectClusterFrame,
        retainedObjectCarriers: retainedObjectPositions.map(position => position.carrier),
        targetSubject,
        targetClass: targetClassProfile,
        selectedNonactiveAspect,
        promotedObjectBecomesSubject: passive,
        participantRoleTransitionFrame,
        humanProjectiveImpersonalizedPassive,
        impersonalDerivationPath: normalizedImpersonalDerivationPath,
        voiceOperationSequence: humanProjectiveImpersonalizedPassive
          ? ["active", "passive", "impersonalized-passive"]
          : ["active", normalizedVoice],
        activeHumanObjectCarrier: humanProjectiveImpersonalizedPassive
          ? "tē"
          : "",
        passivePatientPromotionApplied:
          humanProjectiveImpersonalizedPassive,
        passivePatientSubjectThenDeletedByImpersonalization:
          humanProjectiveImpersonalizedPassive,
        directImpersonalizationOfActiveBlocked:
          humanProjectiveImpersonalizedPassive,
        impersonalCarrier: humanProjectiveImpersonalizedPassive
          ? "tla"
          : "",
        impersonalizedPassiveStem: humanProjectiveImpersonalizedPassive
          ? formulaTargetStem
          : "",
        impersonalSubjectImportedFromOutsideSource: impersonal || inherentImpersonal || tlaImpersonal,
        impersonalSubjectReferent: passive ? "specific-patient" : "none",
        agentExpressible: false,
        grammarSelectionFrame,
        lexicalDerivationRecordKind: lexicalDerivationRecord.kind,
        nonactiveStemRecordKind: nonactiveStemRecord?.kind || "",
        formulaStringAuthority: false,
        surfaceStringAuthority: false
      };
      const proofFrame = {
        ...cloneClassicalNahuatlVncSlotValue(derivedMachineryFrame.proofFrame),
        kind: "classical-nahuatl-nonactive-vnc-voice-proof-frame",
        lesson: passive ? "Andrews Lesson 21" : "Andrews Lesson 22",
        authorizationStatus: "authorized",
        blockReason: "",
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        premises: [{
          lesson: passive || impersonal ? "Andrews Lesson 20" : "Andrews Lesson 22",
          passed: true,
          rule: passive || impersonal ? "One typed nonactive option supplies its aspect stem and routes through its Andrews Class A-1 or A-2 profile." : inherentImpersonal ? "A typed lexical classification authorizes this stem as inherently impersonal." : "One exact typed tla-impersonal stem replaces the intransitive source stem.",
          sourceStem: normalizedSourceStem,
          targetStem,
          suffixFamily: nonactiveStemRecord?.suffixFamily || ""
        }, {
          lesson: passive ? "Andrews Lesson 21" : "Andrews Lesson 22",
          passed: true,
          rule: passive ? "A specific patient becomes the subject; the active agent is deleted and cannot be expressed." : tlaImpersonal ? "The exact tla-impersonal derivation is intransitive and carries a referentially empty third-singular subject." : "The source has a referentially empty third-singular impersonal subject; specific projective objects are forbidden.",
          sourceValence: normalizedSourceValence,
          targetValence,
          targetSubject,
          sourceObjectClusterFrameKind: typedSourceObjectClusterFrame?.kind || "",
          targetObjectClusterFrameKind: voiceObjectClusterFrame?.kind || ""
        }, {
          lesson: "Andrews Lesson 11",
          passed: inheritedTenseAuthorized,
          rule: inheritedTlaCoordinateEnvironment
            ? "Internal tla prefixes the issued irregular third-singular predicate and retains its conditioned tense and number."
            : inheritedTenseOnlyEnvironment
              ? "The issued irregular paradigm operation carries its conditioned tense morph into the derived voice result before final boundary realization."
              : "No inherited irregular operation applies to this derived voice result.",
          operationApplies: inheritedCoordinateEnvironment,
          sourceTns: inheritedLesson11ApplicationFrame?.sourceTns || "",
          selectedTns: inheritedLesson11ApplicationFrame?.selectedTns || ""
        }],
        conclusion: {
          ...derivedProofConclusion,
          authorized: true,
          blockReason: "",
          selectedFormula: formula,
          authorizedFormula: formula,
          voiceTransformationFrame,
          nonactiveStemRecord,
          inherentImpersonalRecord,
          tlaImpersonalStemRecord,
          sourceObjectClusterFrame: typedSourceObjectClusterFrame,
          voiceObjectClusterFrame
        }
      };
      const selectedOutputLogicFrame = {
        ...cloneClassicalNahuatlVncSlotValue(derivedMachineryFrame.selectedOutputLogicFrame),
        kind: "classical-nahuatl-nonactive-vnc-selected-output-logic-frame",
        authorizationStatus: "authorized",
        selectedFormula: formula,
        formulaStringAuthority: false,
        outputFillers: {
          ...(cloneClassicalNahuatlVncSlotValue(derivedMachineryFrame.selectedOutputLogicFrame?.outputFillers) || {}),
          voice: normalizedVoice,
          activeSourceStem: normalizedSourceStem,
          derivedStem: targetStem,
          realizedDerivedStem: formulaTargetStem,
          targetClass: targetClassProfile,
          selectedNonactiveAspect,
          nonactiveStem: nonactiveStemRecord?.nonactiveStem || "",
          nonactiveSuffixFamily: nonactiveStemRecord?.suffixFamily || "",
          sourceValence: normalizedSourceValence,
          targetValence,
          sourceSubject: normalizedSourceSubject,
          targetSubject,
          sourceObjectCarriers: sourceClusterPositions.map(position => position.carrier),
          targetObjectCarriers: retainedObjectPositions.map(position => position.carrier)
        }
      };
      const ruleRefs = [...getClassicalNahuatlVoiceRuleRefs(), ...(Array.isArray(derivedMachineryFrame.ruleRefs) ? cloneClassicalNahuatlVncSlotValue(derivedMachineryFrame.ruleRefs) : [])];
      const ruleLogicFrames = [lexicalDerivationRecord, grammarSelectionFrame, typedSourceObjectClusterFrame, voiceObjectClusterFrame, inheritedLesson11ApplicationFrame, inheritedLesson11BoundaryFrame, voiceTransformationFrame, ...(Array.isArray(derivedMachineryFrame.ruleLogicFrames) ? cloneClassicalNahuatlVncSlotValue(derivedMachineryFrame.ruleLogicFrames) : [])].filter(Boolean);
      return {
        ...cloneClassicalNahuatlVncSlotValue(derivedMachineryFrame),
        kind: "classical-nahuatl-nonactive-vnc-derived-vnc-machinery-frame",
        version: 1,
        lesson: passive ? "Andrews Lesson 21" : "Andrews Lesson 22",
        lessonTitle: passive ? "The Passive-Voice VNC" : "Impersonal VNCs",
        machineryScope: passive || impersonal ? "typed-active-source-to-nonactive-derived-voice-vnc" : "typed-source-to-lexically-authorized-impersonal-vnc",
        authorizationStatus: "authorized",
        blockReason: "",
        voice: normalizedVoice,
        stem: targetStem,
        nonactiveTargetClass: targetClassProfile,
        selectedNonactiveAspect,
        sourceVerbstem: normalizedSourceStem,
        sourceValence: normalizedSourceValence,
        valence: targetValence,
        subject: targetSubject,
        sourceSubject: normalizedSourceSubject,
        activeMachineryFrame,
        derivedMachineryFrame,
        nonactiveStemRecord,
        inherentImpersonalRecord,
        tlaImpersonalStemRecord,
        sourceObjectClusterFrame: typedSourceObjectClusterFrame,
        voiceObjectClusterFrame,
        voiceTransformationFrame,
        proofFrame,
        selectedOutputLogicFrame,
        formulaRealization: formula,
        ruleRefs,
        ruleLogicFrames,
        ruleLogicFrameKinds: ruleLogicFrames.map(frame => frame?.kind).filter(Boolean),
        grammarGenerationAllowed: false,
        formulaOutputAllowed: true,
        surfaceGenerationAllowed: false,
        blocksInput: false
      };
    }
    const CLASSICAL_NAHUATL_LESSON242_NONACTIVE_PRINTED_SURFACES = Object.freeze({
      "tecī-hua": Object.freeze({
        printedSurfaceWord: "tecīhua",
        surfaceOperation: "remove-analysis-boundaries",
        quantityChange: "none"
      }),
      "tex-ō": Object.freeze({
        printedSurfaceWord: "texo",
        surfaceOperation: "remove-analysis-boundary-and-realize-printed-short-o",
        quantityChange: "ō-to-o"
      }),
      "tex-o-hua": Object.freeze({
        printedSurfaceWord: "texohua",
        surfaceOperation: "remove-analysis-boundaries",
        quantityChange: "none"
      })
    });
    function buildClassicalNahuatlNonactiveSurfaceFrame(sourceStem = "", {
      verbClass = "",
      sourceValence = "",
      optionId = ""
    } = {}) {
      const normalizedSourceStem = normalizeClassicalNahuatlVncSlotStem(sourceStem);
      const normalizedClass = normalizeClassicalNahuatlVncSlotCarrier(verbClass).toUpperCase();
      const normalizedValence = normalizeClassicalNahuatlVncSlotCarrier(sourceValence);
      const lowerNonactiveStemRecord = deriveClassicalNahuatlNonactiveStemRecord(normalizedSourceStem, {
        verbClass: normalizedClass,
        sourceValence: normalizedValence,
        optionId
      });
      const lowerRecordAuthorized = isClassicalNahuatlNonactiveStemRecord(lowerNonactiveStemRecord, normalizedSourceStem);
      const printedProfile = lowerRecordAuthorized
        ? CLASSICAL_NAHUATL_LESSON242_NONACTIVE_PRINTED_SURFACES[lowerNonactiveStemRecord.nonactiveStem] || null
        : null;
      const sourceValenceTyped = normalizedValence === "intransitive"
        || isClassicalNahuatlTransitiveValence(normalizedValence);
      const sourceValenceAuthorized = lowerNonactiveStemRecord.nonactiveStem === "tecī-hua"
        ? normalizedValence === "intransitive"
        : ["tex-ō", "tex-o-hua"].includes(lowerNonactiveStemRecord.nonactiveStem)
          && isClassicalNahuatlTransitiveValence(normalizedValence);
      const sourceContextAuthorized = normalizedSourceStem === "teci" && normalizedClass === "B" && sourceValenceAuthorized;
      const authorized = Boolean(sourceContextAuthorized && lowerRecordAuthorized && printedProfile);
      const blockReason = authorized ? ""
        : normalizedSourceStem !== "teci" ? "lesson24.2-exact-teci-source-required"
          : normalizedClass !== "B" ? "lesson24.2-class-b-source-analysis-required"
            : !sourceValenceTyped ? "lesson24.2-typed-source-valence-required"
              : !lowerRecordAuthorized ? lowerNonactiveStemRecord.blockReason || "lesson24.2-authorized-lesson20-nonactive-record-required"
                : !sourceValenceAuthorized ? "lesson24.2-typed-source-valence-required"
              : "lesson24.2-canonical-nonactive-stem-has-no-printed-surface-projection";
      const surfaceOperationFrame = Object.freeze({
        kind: "classical-nahuatl-nonactive-vnc-nonactive-printed-surface-operation-frame",
        version: 1,
        sourceAuthority: "Andrews Lesson 24.2 printed finite nonactive forms",
        sourceDocument: CLASSICAL_NAHUATL_VNC_SLOT_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason,
        inputCanonicalNonactiveStem: authorized ? lowerNonactiveStemRecord.nonactiveStem : "",
        operation: authorized ? printedProfile.surfaceOperation : "",
        quantityChange: authorized ? printedProfile.quantityChange : "",
        analysisBoundariesRemainInLowerRecord: true,
        canonicalQuantityRemainsInLowerRecord: true,
        callerSuppliedSurfaceAllowed: false,
        surfaceStringAuthority: false
      });
      return Object.freeze({
        kind: "classical-nahuatl-nonactive-vnc-nonactive-printed-surface-frame",
        version: 1,
        lesson: "Andrews Lesson 24",
        andrewsSection: "24.2",
        sourceAuthority: "Andrews Lesson 24.2 printed finite nonactive forms over the canonical Lesson 20 analysis",
        sourceDocument: CLASSICAL_NAHUATL_VNC_SLOT_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason,
        sourceStem: normalizedSourceStem,
        verbClass: normalizedClass,
        sourceValence: normalizedValence,
        selectedOptionId: lowerNonactiveStemRecord.selectedOptionId || "",
        lowerLayerFrameKind: "classical-nahuatl-nonactive-vnc-nonactive-stem-record",
        lowerLayerStatus: authorized ? "canonical-and-provisional-for-lesson24.2-printed-surface" : "blocked",
        lowerNonactiveStemRecord,
        canonicalNonactiveStem: authorized ? lowerNonactiveStemRecord.nonactiveStem : "",
        printedSurfaceWord: authorized ? printedProfile.printedSurfaceWord : "",
        surfaceOperationFrame,
        outputGeneratedFromCanonicalLowerRecord: authorized,
        lowerRecordMutated: false,
        canonicalStemRemainsAuthoritative: true,
        callerSuppliedSurfaceAllowed: false,
        targetStringAuthority: false,
        surfaceStringAuthority: false,
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: authorized
      });
    }
    function isClassicalNahuatlNonactiveSurfaceFrame(frame = null, sourceStem = "") {
      const normalizedSourceStem = normalizeClassicalNahuatlVncSlotStem(sourceStem || frame?.sourceStem);
      if (!frame || frame.kind !== "classical-nahuatl-nonactive-vnc-nonactive-printed-surface-frame" || frame.authorizationStatus !== "authorized" || frame.sourceStem !== normalizedSourceStem) {
        return false;
      }
      const rebuilt = buildClassicalNahuatlNonactiveSurfaceFrame(normalizedSourceStem, {
        verbClass: frame.verbClass,
        sourceValence: frame.sourceValence,
        optionId: frame.selectedOptionId
      });
      return rebuilt.authorizationStatus === "authorized"
        && JSON.stringify(rebuilt) === JSON.stringify(frame);
    }
    const CLASSICAL_NAHUATL_VNC_OPERATION_CONTRACT_OWNER = createGrammarOperationContractOwner({
      ownerId: "classical-vnc",
      domain: "classical-vnc",
    });
    const CLASSICAL_NAHUATL_VNC_OPERATION_CONTRACTS = Object.freeze([
      CLASSICAL_NAHUATL_VNC_OPERATION_CONTRACT_OWNER.buildContract({
        operationId: "vnc-clause-shell",
        domain: "classical-vnc",
        operationType: "establish",
        consumesFrameKinds: ["classical-nahuatl-nuclear-clause-nuclear-clause-frame"],
        producesFrameKind: "classical-nahuatl-vnc-slot-frame",
        effectScopes: ["nuclear-clause", "subject", "predicate", "tense", "number"],
        authorityRefs: ["cn-l5-intransitive-vnc-formula", "cn-l5-subject-positions", "cn-l5-num1-num2-variants", "cn-l5-predicate-tense-position"],
        description: "Establish the shared typed VNC shell."
      }),
      CLASSICAL_NAHUATL_VNC_OPERATION_CONTRACT_OWNER.buildContract({
        operationId: "vnc-object-valence",
        domain: "classical-vnc",
        operationType: "select",
        consumesFrameKinds: ["classical-nahuatl-vnc-slot-frame"],
        producesFrameKind: "classical-nahuatl-vnc-slot-frame",
        prerequisites: ["vnc-clause-shell"],
        effectScopes: ["predicate.valence", "predicate.object"],
        authorityRefs: ["cn-l6-transitive-vnc-formulas", "cn-l6-object-pronoun-categories", "cn-l6-projective-object-fillers"],
        description: "Select typed object-valence slots when the requested VNC has an object."
      }),
      CLASSICAL_NAHUATL_VNC_OPERATION_CONTRACT_OWNER.buildContract({
        operationId: "vnc-multiple-object-valence",
        domain: "classical-vnc",
        operationType: "transform",
        consumesFrameKinds: ["classical-nahuatl-vnc-slot-frame"],
        producesFrameKind: "classical-nahuatl-vnc-slot-frame",
        prerequisites: ["vnc-object-valence"],
        effectScopes: ["predicate.valence", "predicate.object-order"],
        authorityRefs: ["cn-l23-multiple-valence-object-sequence"],
        description: "Order multiple typed object-valence positions."
      }),
      CLASSICAL_NAHUATL_VNC_OPERATION_CONTRACT_OWNER.buildContract({
        operationId: "vnc-predicate-stem",
        domain: "classical-vnc",
        operationType: "transform",
        consumesFrameKinds: ["classical-nahuatl-vnc-slot-frame"],
        producesFrameKind: "classical-nahuatl-vnc-slot-frame",
        prerequisites: ["vnc-clause-shell"],
        effectScopes: ["predicate.stem", "predicate.tense"],
        authorityRefs: ["cn-l7-verbstem-classes", "cn-l7-core-tense-predicate-formation"],
        description: "Select the predicate stem and its tense-conditioned form."
      }),
      CLASSICAL_NAHUATL_VNC_OPERATION_CONTRACT_OWNER.buildContract({
        operationId: "vnc-boundary-realization",
        domain: "classical-vnc",
        operationType: "realize",
        consumesFrameKinds: ["classical-nahuatl-vnc-slot-frame"],
        producesFrameKind: "classical-nahuatl-vnc-sentence-final-boundary-realization-frame",
        prerequisites: ["vnc-predicate-stem"],
        effectScopes: ["word.boundary", "word.spelling"],
        outputKinds: ["selected-vnc-formula"],
        authorityRefs: ["cn-l8-81-expanded-vnc-boundary"],
        description: "Realize the complete VNC at its word boundary."
      }),
      CLASSICAL_NAHUATL_VNC_OPERATION_CONTRACT_OWNER.buildContract({
        operationId: "vnc-sentence-composition",
        domain: "classical-vnc",
        operationType: "compose",
        consumesFrameKinds: ["classical-nahuatl-vnc-sentence-final-boundary-realization-frame"],
        producesFrameKind: "classical-nahuatl-sentence-surface-frame",
        prerequisites: ["vnc-boundary-realization"],
        effectScopes: ["sentence.force", "sentence.polarity", "sentence.boundary"],
        outputKinds: ["selected-vnc-sentence-surface"],
        authorityRefs: ["cn-l8-82-86-sentence-surface", "cn-l9-95-99-optative-wish-command-sentence-layer", "cn-l10-101-105-admonitive-sentence-layer"],
        description: "Compose a complete VNC into a sentence without making the VNC provisional."
      })
    ]);
    function getClassicalNahuatlVncOperationContracts() {
      return CLASSICAL_NAHUATL_VNC_OPERATION_CONTRACTS.map(contract => cloneClassicalNahuatlVncSlotValue(contract));
    }
    function buildClassicalNahuatlVncOperationEvaluationFrame({
      priorVncFrame = null,
      finalBoundaryFrame = null,
      sentenceSurfaceFrame = null,
      appliedOperationIds = null,
      requiredOperationIds = null,
      resultOperationId = "",
      requestedOutputKind = ""
    } = {}) {
      const typedVncFrame = priorVncFrame?.vncSlotFrame || priorVncFrame;
      const typedVncAuthorized = isClassicalNahuatlVncSlotFrame(typedVncFrame);
      const finalBoundaryAuthorized = finalBoundaryFrame?.kind === "classical-nahuatl-vnc-sentence-final-boundary-realization-frame" && finalBoundaryFrame?.authorizationStatus === "authorized" && finalBoundaryFrame?.typedSlotAuthority === true && finalBoundaryFrame?.formulaStringAuthority === false;
      const sentenceRequested = Boolean(sentenceSurfaceFrame);
      const sentenceAuthorized = !sentenceRequested || sentenceSurfaceFrame?.authorizationStatus === "authorized";
      const inferredOperationIds = [
        typedVncAuthorized ? "vnc-clause-shell" : "",
        typedVncAuthorized && typedVncFrame.valenceArity !== "vacant" ? "vnc-object-valence" : "",
        typedVncAuthorized && typedVncFrame.valenceArity === "multiple" ? "vnc-multiple-object-valence" : "",
        finalBoundaryAuthorized ? "vnc-predicate-stem" : "",
        finalBoundaryAuthorized ? "vnc-boundary-realization" : "",
        sentenceRequested && sentenceAuthorized ? "vnc-sentence-composition" : ""
      ].filter(Boolean);
      const selectedAppliedOperationIds = Array.isArray(appliedOperationIds) ? appliedOperationIds : inferredOperationIds;
      const selectedRequiredOperationIds = Array.isArray(requiredOperationIds) ? requiredOperationIds : selectedAppliedOperationIds;
      const selectedResultOperationId = normalizeClassicalNahuatlVncSlotCarrier(resultOperationId || (sentenceRequested ? "vnc-sentence-composition" : "vnc-boundary-realization"));
      const selectedOutputKind = normalizeClassicalNahuatlVncSlotCarrier(requestedOutputKind || (sentenceRequested ? "selected-vnc-sentence-surface" : "selected-vnc-formula"));
      const sourceAuthorized = typedVncAuthorized && finalBoundaryAuthorized && sentenceAuthorized;
      const sourceBlockReason = !typedVncAuthorized ? "missing-or-contradictory-typed-vnc-input" : !finalBoundaryAuthorized ? "typed-vnc-final-boundary-not-authorized" : "sentence-composition-not-authorized";
      const plan = CLASSICAL_NAHUATL_VNC_OPERATION_CONTRACT_OWNER.evaluatePlan({
        domain: "classical-vnc",
        contracts: CLASSICAL_NAHUATL_VNC_OPERATION_CONTRACTS,
        appliedOperationIds: selectedAppliedOperationIds,
        requiredOperationIds: selectedRequiredOperationIds,
        resultOperationId: selectedResultOperationId,
        requestedOutputKind: selectedOutputKind,
        sourceAuthorized,
        sourceBlockReason
      });
      return {
        ...plan,
        kind: "classical-nahuatl-vnc-operation-evaluation-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_VNC_SLOT_SOURCE_DOCUMENT,
        resultSurfaceKind: sentenceRequested ? "sentence-surface" : "selected-vnc-formula",
        consumedVncStatus: finalBoundaryAuthorized ? "complete" : "unavailable",
        completeVncIsProvisional: false,
        typedSlotAuthority: true,
        formulaStringAuthority: false
      };
    }
    function getClassicalNahuatlAuthorityCapabilityFrame(surfaceFrame = null) {
      const basalUnit = normalizeClassicalNahuatlVncSlotCarrier(surfaceFrame?.basalUnit);
      const machinery = surfaceFrame?.machineryFrame || {};
      const applicationFrame = surfaceFrame?.vncApplicationFrame || machinery.vncApplicationFrame || null;
      const applicationResultFrame = applicationFrame?.resultFrame || null;
      const selectedDerivation = String(
        applicationFrame?.normalizedRequest?.derivationType
        || applicationFrame?.selectedDerivation
        || applicationFrame?.controlFrame?.derivationType
        || ""
      ).trim();
      const derivedApplication = ["causative", "applicative"].includes(selectedDerivation);
      const applicationSourceMachinery = applicationResultFrame?.sourceMachineryFrame || null;
      const canonicalApplicationSourceMachinery = derivedApplication
        && applicationSourceMachinery?.authorizationStatus === "authorized"
        && typeof targetObject.isClassicalNahuatlVncDerivationSourceMachineryFrame === "function"
        && targetObject.isClassicalNahuatlVncDerivationSourceMachineryFrame(applicationSourceMachinery) === true
        ? applicationSourceMachinery
        : null;
      const pendingDerivationSourceMachinery = applicationResultFrame?.authorizationStatus === "blocked"
        ? canonicalApplicationSourceMachinery
        : null;
      const completedDerivationSourceMachinery = applicationResultFrame?.authorizationStatus === "authorized"
        ? canonicalApplicationSourceMachinery
        : null;
      // A later VNC derivation is additive. Preserve the capabilities of its
      // exact owner-issued Source chain; narrow Canvas exceptions are applied
      // separately instead of being inferred from missing outer-frame fields.
      const canonicalLateSourceMachineries = [];
      const seenLateMachineries = new Set();
      let lateMachineryCursor = machinery;
      while (
        lateMachineryCursor
        && !seenLateMachineries.has(lateMachineryCursor)
        && typeof targetObject.isClassicalNahuatlMachineryFrame === "function"
        && targetObject.isClassicalNahuatlMachineryFrame(lateMachineryCursor) === true
      ) {
        seenLateMachineries.add(lateMachineryCursor);
        const sourceMachinery = lateMachineryCursor.sourceMachineryFrame || null;
        if (!sourceMachinery || sourceMachinery.authorizationStatus !== "authorized") {
          break;
        }
        canonicalLateSourceMachineries.push(sourceMachinery);
        lateMachineryCursor = sourceMachinery;
      }
      const capabilityMachineries = [
        machinery,
        canonicalApplicationSourceMachinery,
        ...canonicalLateSourceMachineries
      ].filter(Boolean);
      const frameKinds = new Set([
        ...capabilityMachineries.flatMap(candidate => [
          ...(Array.isArray(candidate.ruleLogicFrameKinds) ? candidate.ruleLogicFrameKinds : []),
          candidate.kind,
          candidate.priorVncFrame?.kind,
          candidate.expandedVncBoundaryFrame?.kind,
          candidate.sentenceSurfaceFrame?.kind
        ]),
        surfaceFrame?.selectedOutputLogicFrame?.kind
      ].filter(Boolean));
      const isVnc = basalUnit === "vnc";
      const isNnc = basalUnit === "nnc";
      const hasTypedNnc = isNnc && Boolean(machinery.nncSlotFrame?.kind === "classical-nahuatl-nnc-slot-frame" || machinery.selectedOutputLogicFrame?.selectedNncSlotFrame?.kind === "classical-nahuatl-nnc-slot-frame");
      const hasLesson5 = isVnc && (frameKinds.has("classical-nahuatl-finite-vnc-vnc-subject-tense-frame") || frameKinds.has("classical-nahuatl-transitive-vnc-transitive-vnc-object-frame") || frameKinds.has("classical-nahuatl-verbstem-verbstem-class-machinery-frame") || frameKinds.has("classical-nahuatl-nonactive-vnc-derived-vnc-machinery-frame"));
      const hasLesson7 = isVnc && (frameKinds.has("classical-nahuatl-verbstem-verbstem-class-machinery-frame") || frameKinds.has("classical-nahuatl-nonactive-vnc-derived-vnc-machinery-frame") || capabilityMachineries.some(candidate => Boolean(candidate.classRuleFrame && candidate.predicateFormationRuleFrame)));
      const hasExpandedVnc = hasLesson7 && Boolean(capabilityMachineries.some(candidate => candidate.expandedVncBoundaryFrame) || frameKinds.has("classical-nahuatl-vnc-sentence-expanded-vnc-boundary-frame"));
      const hasSentenceSurface = hasLesson7 && Boolean(capabilityMachineries.some(candidate => candidate.sentenceSurfaceFrame) || frameKinds.has("classical-nahuatl-vnc-sentence-sentence-surface-frame"));
      return {
        kind: "classical-nahuatl-authority-capability-frame",
        authorizationStatus: isVnc || hasTypedNnc ? "authorized" : "not-applicable",
        basalUnit,
        frameKinds: Array.from(frameKinds),
        capabilities: {
          subject: isVnc || hasTypedNnc,
          mood: hasLesson5,
          tense: hasLesson5,
          verbstemClass: hasLesson7,
          valence: hasLesson7,
          object: hasLesson7,
          voice: hasLesson7,
          nonactiveStem: hasLesson7,
          tlaFusion: hasLesson7,
          directionalLocative: hasExpandedVnc,
          outsidePrefixStack: hasExpandedVnc,
          polarity: hasSentenceSurface || hasTypedNnc,
          sentenceSurface: hasSentenceSurface || hasTypedNnc,
          introductoryParticle: hasSentenceSurface,
          prefaceParticle: hasSentenceSurface,
          introductoryModifier: hasSentenceSurface
        },
        capabilityBasis: pendingDerivationSourceMachinery
          ? "authorized-source-machinery-while-derived-result-pending"
          : completedDerivationSourceMachinery
            ? "authorized-source-machinery-for-derived-vnc"
            : canonicalLateSourceMachineries.length
              ? "authorized-source-machinery-for-late-vnc-derivation"
            : "selected-machinery",
        capabilityAuthority: "derived-from-authorized-machine-frames",
        lessonNumberAuthority: false
      };
    }
    function validateClassicalNahuatlAuthorityOptionLedger({
      authorityOptionTags = [],
      visibleOptionTagIds = [],
      transcriptionLineCount = 0
    } = {}) {
      const requiredFields = ["tagId", "controlId", "value", "canvasStatus", "applicability", "outputBehavior", "transcriptionLineStart", "transcriptionLineEnd", "exactWitness"];
      const allowedStatuses = new Set(["required", "optional", "conditioned-optional", "authorized", "required-choice-prompt", "not-applicable", "blocked", "not-implemented-yet"]);
      const records = Array.isArray(authorityOptionTags) ? authorityOptionTags : [];
      const visibleIds = Array.isArray(visibleOptionTagIds) ? visibleOptionTagIds.map(tagId => normalizeClassicalNahuatlVncSlotCarrier(tagId)).filter(Boolean) : [];
      const duplicateTagIds = records.map(record => normalizeClassicalNahuatlVncSlotCarrier(record?.tagId)).filter((tagId, index, all) => tagId && all.indexOf(tagId) !== index);
      const duplicateControlValues = records.map(record => `${normalizeClassicalNahuatlVncSlotCarrier(record?.controlId)}::${normalizeClassicalNahuatlVncSlotCarrier(record?.value)}`).filter((key, index, all) => key !== "::" && all.indexOf(key) !== index);
      const incompleteRecords = records.filter(record => requiredFields.some(field => {
        const value = record?.[field];
        if (field === "value" && (record?.canvasStatus === "required-choice-prompt" || record?.allowEmptyValue === true) && value === "") {
          return false;
        }
        return value === undefined || value === null || String(value).trim() === "";
      })).map(record => record?.tagId || "<untagged>");
      const invalidStatuses = records.filter(record => !allowedStatuses.has(String(record?.canvasStatus || ""))).map(record => record?.tagId || "<untagged>");
      const invalidWitnessRanges = records.filter(record => {
        const start = Number(record?.transcriptionLineStart) || 0;
        const end = Number(record?.transcriptionLineEnd) || 0;
        return start < 1 || end < start || transcriptionLineCount > 0 && end > transcriptionLineCount;
      }).map(record => record?.tagId || "<untagged>");
      const recordIds = new Set(records.map(record => String(record?.tagId || "")).filter(Boolean));
      const missingVisibleTags = visibleIds.filter(tagId => !recordIds.has(tagId));
      const duplicateVisibleTags = visibleIds.filter((tagId, index, all) => all.indexOf(tagId) !== index);
      const authorized = Boolean(records.length && visibleIds.length && !duplicateTagIds.length && !duplicateControlValues.length && !incompleteRecords.length && !invalidStatuses.length && !invalidWitnessRanges.length && !missingVisibleTags.length && !duplicateVisibleTags.length);
      return {
        kind: "classical-nahuatl-authority-option-ledger-validation-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_VNC_SLOT_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        recordCount: records.length,
        visibleOptionCount: visibleIds.length,
        requiredFields,
        duplicateTagIds: Array.from(new Set(duplicateTagIds)),
        duplicateControlValues: Array.from(new Set(duplicateControlValues)),
        incompleteRecords,
        invalidStatuses,
        invalidWitnessRanges,
        missingVisibleTags,
        duplicateVisibleTags: Array.from(new Set(duplicateVisibleTags)),
        futureOptionPolicy: "a-visible-authority-option-without-a-complete-canvas-tag-fails-validation"
      };
    }
    function installClassicalNahuatlVncLayerEvaluatorClassicGlobals() {
      const globalTarget = typeof targetObject !== "undefined" && targetObject || (typeof globalThis !== "undefined" ? globalThis : null);
      if (!globalTarget || typeof globalTarget !== "object") {
        return null;
      }
      Object.assign(globalTarget, {
        CLASSICAL_NAHUATL_VNC_TARGET_VOICES,
        CLASSICAL_NAHUATL_VNC_TARGET_VOICE_OPERATIONS,
        CLASSICAL_NAHUATL_VNC_CAUSATIVE_SOURCE_VOICES,
        normalizeClassicalNahuatlVncVoice,
        getClassicalNahuatlVncVoiceVocabulary,
        validateClassicalNahuatlVncVoiceSelection,
        validateClassicalNahuatlVncVoiceControlInventory,
        CLASSICAL_NAHUATL_VNC_SEMANTIC_MOODS,
        CLASSICAL_NAHUATL_VNC_SEMANTIC_TENSES,
        CLASSICAL_NAHUATL_VNC_SEMANTIC_TENSES_BY_MOOD,
        CLASSICAL_NAHUATL_VNC_PARADIGM_TENSES,
        CLASSICAL_NAHUATL_VNC_PARADIGM_TENSES_BY_MOOD,
        CLASSICAL_NAHUATL_VNC_SEMANTIC_VALUE_BY_PARADIGM_TENSE,
        normalizeClassicalNahuatlVncSemanticMood,
        normalizeClassicalNahuatlVncSemanticTense,
        normalizeClassicalNahuatlVncParadigmTense,
        getClassicalNahuatlVncSemanticTensesForMood,
        getClassicalNahuatlVncParadigmTensesForMood,
        getClassicalNahuatlVncSemanticValueForParadigmTense,
        getClassicalNahuatlVncSemanticInputVocabulary,
        validateClassicalNahuatlVncSemanticSelection,
        validateClassicalNahuatlVncSemanticControlInventory,
        buildClassicalNahuatlVncSlotFrame,
        isClassicalNahuatlVncSlotFrame,
        renderClassicalNahuatlVncSlotFrameFormula,
        buildClassicalNahuatlVncDiagrammaticFrame,
        isClassicalNahuatlVncDiagrammaticFrame,
        applyClassicalNahuatlDirectionalStemOperationAtFinalBoundary,
        applyClassicalNahuatlDirectionalProgressiveAssimilation,
        realizeClassicalNahuatlVncSlotFrameAtFinalBoundary,
        buildClassicalNahuatlStemFinalShapeFrame,
        buildClassicalNahuatlActiveStemIdentityFrame,
        buildClassicalNahuatlNonactiveFinalShapeRelation,
        getClassicalNahuatlNonactiveFormationStructure,
        doesClassicalNahuatlLesson20FinalShapeMatchSuffixFamily,
        buildClassicalNahuatlClassCFinalIVowelLengthRuleFrame,
        buildClassicalNahuatlFinalIOHuaVowelLengthRuleFrame,
        buildClassicalNahuatlProductiveCandidateSet,
        buildClassicalNahuatlNonactiveCandidateLattice,
        getClassicalNahuatlNonactiveStemOptions,
        deriveClassicalNahuatlNonactiveStemRecord,
        buildClassicalNahuatlNonactiveStemRecord,
        isClassicalNahuatlNonactiveStemRecord,
        buildClassicalNahuatlGrammarContract,
        buildClassicalNahuatlVncSubjectReferenceFrame,
        deriveClassicalNahuatlTlaImpersonalTargetStem,
        evaluateClassicalNahuatlGrammarSelection,
        getClassicalNahuatlInherentImpersonalSourceAnalysis,
        getClassicalNahuatlTlaImpersonalSourceAnalysis,
        buildClassicalNahuatlInherentImpersonalRecord,
        isClassicalNahuatlInherentImpersonalRecord,
        buildClassicalNahuatlTlaImpersonalStemRecord,
        isClassicalNahuatlTlaImpersonalStemRecord,
        getClassicalNahuatlOrderedVoiceLayerOptions,
        getClassicalNahuatlOrderedVoiceLayerCascadeOptions,
        deriveClassicalNahuatlOrderedVoiceLayerChain,
        isClassicalNahuatlOrderedVoiceLayerChain,
        buildClassicalNahuatlObjectClusterFrame,
        isClassicalNahuatlObjectClusterFrame,
        buildClassicalNahuatlObjectRoleAmbiguityFrame,
        isClassicalNahuatlObjectRoleAmbiguityFrame,
        buildClassicalNahuatlVoiceObjectClusterFrame,
        applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame,
        buildClassicalNahuatlMultipleObjectVncFrame,
        isClassicalNahuatlMultipleObjectVncFrame,
        getClassicalNahuatlVoiceRuleRefs,
        buildClassicalNahuatlDerivedVncFrame,
        isClassicalNahuatlNonactiveCarrierSourceFrame,
        buildClassicalNahuatlNonactiveCarrierFiniteFrame,
        isClassicalNahuatlNonactiveCarrierFiniteFrame,
        buildClassicalNahuatlNonactiveSurfaceFrame,
        isClassicalNahuatlNonactiveSurfaceFrame,
        getClassicalNahuatlVncOperationContracts,
        buildClassicalNahuatlVncOperationEvaluationFrame,
        getClassicalNahuatlAuthorityCapabilityFrame,
        validateClassicalNahuatlAuthorityOptionLedger
      });
      return globalTarget;
    }
    if (typeof targetObject.module !== "undefined" && targetObject.module.exports) {
      targetObject.module.exports = {
        buildClassicalNahuatlVncSlotFrame,
        isClassicalNahuatlVncSlotFrame,
        renderClassicalNahuatlVncSlotFrameFormula,
        buildClassicalNahuatlVncDiagrammaticFrame,
        isClassicalNahuatlVncDiagrammaticFrame,
        applyClassicalNahuatlDirectionalStemOperationAtFinalBoundary,
        applyClassicalNahuatlDirectionalProgressiveAssimilation,
        realizeClassicalNahuatlVncSlotFrameAtFinalBoundary,
        buildClassicalNahuatlStemFinalShapeFrame,
        buildClassicalNahuatlActiveStemIdentityFrame,
        buildClassicalNahuatlNonactiveFinalShapeRelation,
        getClassicalNahuatlNonactiveFormationStructure,
        doesClassicalNahuatlLesson20FinalShapeMatchSuffixFamily,
        buildClassicalNahuatlClassCFinalIVowelLengthRuleFrame,
        buildClassicalNahuatlFinalIOHuaVowelLengthRuleFrame,
        buildClassicalNahuatlProductiveCandidateSet,
        buildClassicalNahuatlNonactiveCandidateLattice,
        getClassicalNahuatlNonactiveStemOptions,
        deriveClassicalNahuatlNonactiveStemRecord,
        buildClassicalNahuatlNonactiveStemRecord,
        isClassicalNahuatlNonactiveStemRecord,
        buildClassicalNahuatlGrammarContract,
        buildClassicalNahuatlVncSubjectReferenceFrame,
        deriveClassicalNahuatlTlaImpersonalTargetStem,
        evaluateClassicalNahuatlGrammarSelection,
        getClassicalNahuatlInherentImpersonalSourceAnalysis,
        getClassicalNahuatlTlaImpersonalSourceAnalysis,
        buildClassicalNahuatlInherentImpersonalRecord,
        isClassicalNahuatlInherentImpersonalRecord,
        buildClassicalNahuatlTlaImpersonalStemRecord,
        isClassicalNahuatlTlaImpersonalStemRecord,
        getClassicalNahuatlOrderedVoiceLayerOptions,
        getClassicalNahuatlOrderedVoiceLayerCascadeOptions,
        deriveClassicalNahuatlOrderedVoiceLayerChain,
        isClassicalNahuatlOrderedVoiceLayerChain,
        buildClassicalNahuatlObjectClusterFrame,
        isClassicalNahuatlObjectClusterFrame,
        buildClassicalNahuatlObjectRoleAmbiguityFrame,
        isClassicalNahuatlObjectRoleAmbiguityFrame,
        buildClassicalNahuatlVoiceObjectClusterFrame,
        applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame,
        buildClassicalNahuatlMultipleObjectVncFrame,
        isClassicalNahuatlMultipleObjectVncFrame,
        getClassicalNahuatlVoiceRuleRefs,
        buildClassicalNahuatlDerivedVncFrame,
        isClassicalNahuatlNonactiveCarrierSourceFrame,
        buildClassicalNahuatlNonactiveCarrierFiniteFrame,
        isClassicalNahuatlNonactiveCarrierFiniteFrame,
        buildClassicalNahuatlNonactiveSurfaceFrame,
        isClassicalNahuatlNonactiveSurfaceFrame,
        getClassicalNahuatlVncOperationContracts,
        buildClassicalNahuatlVncOperationEvaluationFrame,
        getClassicalNahuatlAuthorityCapabilityFrame,
        validateClassicalNahuatlAuthorityOptionLedger,
        installClassicalNahuatlVncLayerEvaluatorClassicGlobals
      };
    }
    if (typeof targetObject.window !== "undefined") {
      installClassicalNahuatlVncLayerEvaluatorClassicGlobals();
    }

    const api = {};
    Object.defineProperty(api, "CLASSICAL_NAHUATL_VNC_SLOT_FRAME_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_VNC_SLOT_FRAME_VERSION; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_VNC_SLOT_SOURCE_DOCUMENT", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_VNC_SLOT_SOURCE_DOCUMENT; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_VNC_SLOT_SQUARE_ZERO", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_VNC_SLOT_SQUARE_ZERO; },
    });
    api.cloneClassicalNahuatlVncSlotValue = cloneClassicalNahuatlVncSlotValue;
    api.normalizeClassicalNahuatlVncSlotCarrier = normalizeClassicalNahuatlVncSlotCarrier;
    api.normalizeClassicalNahuatlVncSlotStem = normalizeClassicalNahuatlVncSlotStem;
    api.getClassicalNahuatlVncSlotFirstSound = getClassicalNahuatlVncSlotFirstSound;
    api.getClassicalNahuatlVncSlotLastSound = getClassicalNahuatlVncSlotLastSound;
    api.isClassicalNahuatlVncSlotVowelSound = isClassicalNahuatlVncSlotVowelSound;
    api.getClassicalNahuatlVncSubjectCarrierFamily = getClassicalNahuatlVncSubjectCarrierFamily;
    api.buildClassicalNahuatlVncSlotFrame = buildClassicalNahuatlVncSlotFrame;
    api.isClassicalNahuatlVncSlotFrame = isClassicalNahuatlVncSlotFrame;
    api.renderClassicalNahuatlVncSlotFrameFormula = renderClassicalNahuatlVncSlotFrameFormula;
    api.getClassicalNahuatlVncGeneralFormulaProjection = getClassicalNahuatlVncGeneralFormulaProjection;
    api.buildClassicalNahuatlVncDiagrammaticFrame = buildClassicalNahuatlVncDiagrammaticFrame;
    api.isClassicalNahuatlVncDiagrammaticFrame = isClassicalNahuatlVncDiagrammaticFrame;
    api.getClassicalNahuatlVncNextCarrierAfterSubject = getClassicalNahuatlVncNextCarrierAfterSubject;
    api.getClassicalNahuatlVncCarrierBeforeSlot = getClassicalNahuatlVncCarrierBeforeSlot;
    api.getClassicalNahuatlVncCarrierAfterSlot = getClassicalNahuatlVncCarrierAfterSlot;
    api.isClassicalNahuatlVncSilentCarrier = isClassicalNahuatlVncSilentCarrier;
    api.isClassicalNahuatlVncNum1KContext = isClassicalNahuatlVncNum1KContext;
    api.applyClassicalNahuatlDirectionalStemOperationAtFinalBoundary = applyClassicalNahuatlDirectionalStemOperationAtFinalBoundary;
    api.insertClassicalNahuatlDirectionalSlot = insertClassicalNahuatlDirectionalSlot;
    api.getClassicalNahuatlVncLayerRuntimeTarget = getClassicalNahuatlVncLayerRuntimeTarget;
    api.applyClassicalNahuatlDirectionalProgressiveAssimilation = applyClassicalNahuatlDirectionalProgressiveAssimilation;
    api.realizeClassicalNahuatlVncSlotFrameAtFinalBoundary = realizeClassicalNahuatlVncSlotFrameAtFinalBoundary;
    Object.defineProperty(api, "CLASSICAL_NAHUATL_NONACTIVE_SUFFIX_FAMILIES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_NONACTIVE_SUFFIX_FAMILIES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_NONACTIVE_FORMATION_CORES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_NONACTIVE_FORMATION_CORES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_NONACTIVE_FORMATION_STRUCTURES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_NONACTIVE_FORMATION_STRUCTURES; },
    });
    api.getClassicalNahuatlNonactiveFormationAuthorityLabel = getClassicalNahuatlNonactiveFormationAuthorityLabel;
    api.getClassicalNahuatlNonactiveTargetClass = getClassicalNahuatlNonactiveTargetClass;
    api.isClassicalNahuatlPerfectiveEnvironment = isClassicalNahuatlPerfectiveEnvironment;
    api.getClassicalNahuatlFinalShapeTail = getClassicalNahuatlFinalShapeTail;
    api.getClassicalNahuatlFinalShapeSound = getClassicalNahuatlFinalShapeSound;
    api.buildClassicalNahuatlStemFinalShapeFrame = buildClassicalNahuatlStemFinalShapeFrame;
    api.isClassicalNahuatlTransitiveValence = isClassicalNahuatlTransitiveValence;
    api.buildClassicalNahuatlActiveStemIdentityFrame = buildClassicalNahuatlActiveStemIdentityFrame;
    api.isClassicalNahuatlActiveStemIdentityFrame = isClassicalNahuatlActiveStemIdentityFrame;
    api.buildClassicalNahuatlLexicalFormationLicenseFrame = buildClassicalNahuatlLexicalFormationLicenseFrame;
    api.isClassicalNahuatlLexicalFormationLicenseFrame = isClassicalNahuatlLexicalFormationLicenseFrame;
    api.replaceClassicalNahuatlLesson20FinalShape = replaceClassicalNahuatlLesson20FinalShape;
    api.buildClassicalNahuatlNonactiveFinalShapeRelation = buildClassicalNahuatlNonactiveFinalShapeRelation;
    api.getClassicalNahuatlNonactiveFormationStructure = getClassicalNahuatlNonactiveFormationStructure;
    api.doesClassicalNahuatlLesson20FinalShapeMatchSuffixFamily = doesClassicalNahuatlLesson20FinalShapeMatchSuffixFamily;
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON20_CLASS_C_FINAL_I_LENGTH_CLASSES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON20_CLASS_C_FINAL_I_LENGTH_CLASSES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON20_POSTVOCALIC_TI_CHO_EXCLUSIONS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON20_POSTVOCALIC_TI_CHO_EXCLUSIONS; },
    });
    api.buildClassicalNahuatlClassCFinalIVowelLengthRuleFrame = buildClassicalNahuatlClassCFinalIVowelLengthRuleFrame;
    api.buildClassicalNahuatlFinalIOHuaVowelLengthRuleFrame = buildClassicalNahuatlFinalIOHuaVowelLengthRuleFrame;
    api.buildClassicalNahuatlProductiveCandidateSet = buildClassicalNahuatlProductiveCandidateSet;
    api.buildClassicalNahuatlProductiveOptions = buildClassicalNahuatlProductiveOptions;
    api.filterClassicalNahuatlLesson20FormationsForContext = filterClassicalNahuatlLesson20FormationsForContext;
    api.getClassicalNahuatlNonactiveUnresolvedReason = getClassicalNahuatlNonactiveUnresolvedReason;
    api.buildClassicalNahuatlNonactiveCandidateLattice = buildClassicalNahuatlNonactiveCandidateLattice;
    api.getClassicalNahuatlNonactiveStemOptions = getClassicalNahuatlNonactiveStemOptions;
    api.deriveClassicalNahuatlNonactiveStemRecord = deriveClassicalNahuatlNonactiveStemRecord;
    api.finalizeClassicalNahuatlLesson20NonactiveStemRecord = finalizeClassicalNahuatlLesson20NonactiveStemRecord;
    api.buildClassicalNahuatlNonactiveStemRecord = buildClassicalNahuatlNonactiveStemRecord;
    api.isClassicalNahuatlNonactiveStemRecord = isClassicalNahuatlNonactiveStemRecord;
    api.buildClassicalNahuatlGrammarContract =
      buildClassicalNahuatlGrammarContract;
    api.buildClassicalNahuatlVncSubjectReferenceFrame =
      buildClassicalNahuatlVncSubjectReferenceFrame;
    api.deriveClassicalNahuatlTlaImpersonalTargetStem =
      deriveClassicalNahuatlTlaImpersonalTargetStem;
    api.evaluateClassicalNahuatlGrammarSelection =
      evaluateClassicalNahuatlGrammarSelection;
    api.getClassicalNahuatlInherentImpersonalSourceAnalysis =
      getClassicalNahuatlInherentImpersonalSourceAnalysis;
    api.getClassicalNahuatlTlaImpersonalSourceAnalysis =
      getClassicalNahuatlTlaImpersonalSourceAnalysis;
    api.buildClassicalNahuatlInherentImpersonalRecord = buildClassicalNahuatlInherentImpersonalRecord;
    api.isClassicalNahuatlInherentImpersonalRecord = isClassicalNahuatlInherentImpersonalRecord;
    api.buildClassicalNahuatlTlaImpersonalStemRecord = buildClassicalNahuatlTlaImpersonalStemRecord;
    api.isClassicalNahuatlTlaImpersonalStemRecord = isClassicalNahuatlTlaImpersonalStemRecord;
    Object.defineProperty(api, "CLASSICAL_NAHUATL_ORDERED_VOICE_LAYER_ROUTE_SPECS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_ORDERED_VOICE_LAYER_ROUTE_SPECS; },
    });
    api.isClassicalNahuatlOrderedVoiceLayerIntermediateStem = isClassicalNahuatlOrderedVoiceLayerIntermediateStem;
    api.getClassicalNahuatlOrderedVoiceLayerOptions = getClassicalNahuatlOrderedVoiceLayerOptions;
    api.getClassicalNahuatlOrderedVoiceLayerCascadeOptions = getClassicalNahuatlOrderedVoiceLayerCascadeOptions;
    api.getClassicalNahuatlOrderedVoiceLayerSignature = getClassicalNahuatlOrderedVoiceLayerSignature;
    api.deriveClassicalNahuatlOrderedVoiceLayerChain = deriveClassicalNahuatlOrderedVoiceLayerChain;
    api.isClassicalNahuatlOrderedVoiceLayerChain = isClassicalNahuatlOrderedVoiceLayerChain;
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON23_OBJECT_GOVERNORS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON23_OBJECT_GOVERNORS; },
    });
    api.getClassicalNahuatlReflexiveVa1 = getClassicalNahuatlReflexiveVa1;
    api.getClassicalNahuatlPositionPreviewCarrier = getClassicalNahuatlPositionPreviewCarrier;
    api.buildClassicalNahuatlObjectClusterFrame = buildClassicalNahuatlObjectClusterFrame;
    api.isClassicalNahuatlObjectClusterFrame = isClassicalNahuatlObjectClusterFrame;
    api.buildClassicalNahuatlObjectRoleAmbiguityFrame = buildClassicalNahuatlObjectRoleAmbiguityFrame;
    api.isClassicalNahuatlObjectRoleAmbiguityFrame = isClassicalNahuatlObjectRoleAmbiguityFrame;
    api.buildClassicalNahuatlVoiceObjectClusterFrame = buildClassicalNahuatlVoiceObjectClusterFrame;
    api.applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame = applyClassicalNahuatlLesson23ObjectClusterToMachineryFrame;
    api.buildClassicalNahuatlMultipleObjectVncFrame = buildClassicalNahuatlMultipleObjectVncFrame;
    api.isClassicalNahuatlMultipleObjectVncFrame = isClassicalNahuatlMultipleObjectVncFrame;
    api.getClassicalNahuatlVoiceRuleRefs = getClassicalNahuatlVoiceRuleRefs;
    api.buildClassicalNahuatlBlockedFrame = buildClassicalNahuatlBlockedFrame;
    api.resolveClassicalNahuatlRestrictedContainingVncSourceFrame = resolveClassicalNahuatlRestrictedContainingVncSourceFrame;
    api.isClassicalNahuatlRestrictedContainingVncSourceFrame = isClassicalNahuatlRestrictedContainingVncSourceFrame;
    api.buildClassicalNahuatlRestrictedContainingTargetFrame = buildClassicalNahuatlRestrictedContainingTargetFrame;
    api.isClassicalNahuatlRestrictedContainingTargetFrame = isClassicalNahuatlRestrictedContainingTargetFrame;
    api.isClassicalNahuatlNonactiveCarrierSourceFrame = isClassicalNahuatlNonactiveCarrierSourceFrame;
    api.buildClassicalNahuatlNonactiveCarrierFiniteFrame = buildClassicalNahuatlNonactiveCarrierFiniteFrame;
    api.isClassicalNahuatlNonactiveCarrierFiniteFrame = isClassicalNahuatlNonactiveCarrierFiniteFrame;
    api.buildClassicalNahuatlDerivedVncFrame = buildClassicalNahuatlDerivedVncFrame;
    api.buildClassicalNahuatlNonactiveSurfaceFrame = buildClassicalNahuatlNonactiveSurfaceFrame;
    api.isClassicalNahuatlNonactiveSurfaceFrame = isClassicalNahuatlNonactiveSurfaceFrame;
    Object.defineProperty(api, "CLASSICAL_NAHUATL_VNC_OPERATION_CONTRACTS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_VNC_OPERATION_CONTRACTS; },
    });
    api.getClassicalNahuatlVncOperationContracts = getClassicalNahuatlVncOperationContracts;
    api.getClassicalNahuatlVncSubjectCarrierFamily = getClassicalNahuatlVncSubjectCarrierFamily;
    api.getClassicalNahuatlVncDirectionalSubjectCarrierRealization = getClassicalNahuatlVncDirectionalSubjectCarrierRealization;
    api.buildClassicalNahuatlVncOperationEvaluationFrame = buildClassicalNahuatlVncOperationEvaluationFrame;
    api.getClassicalNahuatlAuthorityCapabilityFrame = getClassicalNahuatlAuthorityCapabilityFrame;
    api.validateClassicalNahuatlAuthorityOptionLedger = validateClassicalNahuatlAuthorityOptionLedger;
    Object.defineProperty(api, "CLASSICAL_NAHUATL_VNC_TARGET_VOICES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_VNC_TARGET_VOICES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_VNC_TARGET_VOICE_OPERATIONS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_VNC_TARGET_VOICE_OPERATIONS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_VNC_CAUSATIVE_SOURCE_VOICES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_VNC_CAUSATIVE_SOURCE_VOICES; },
    });
    api.normalizeClassicalNahuatlVncVoice = normalizeClassicalNahuatlVncVoice;
    api.getClassicalNahuatlVncVoiceVocabulary = getClassicalNahuatlVncVoiceVocabulary;
    api.validateClassicalNahuatlVncVoiceSelection = validateClassicalNahuatlVncVoiceSelection;
    api.validateClassicalNahuatlVncVoiceControlInventory = validateClassicalNahuatlVncVoiceControlInventory;
    Object.defineProperty(api, "CLASSICAL_NAHUATL_VNC_SEMANTIC_MOODS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_VNC_SEMANTIC_MOODS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_VNC_SEMANTIC_TENSES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_VNC_SEMANTIC_TENSES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_VNC_SEMANTIC_TENSES_BY_MOOD", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_VNC_SEMANTIC_TENSES_BY_MOOD; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_VNC_PARADIGM_TENSES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_VNC_PARADIGM_TENSES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_VNC_PARADIGM_TENSES_BY_MOOD", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_VNC_PARADIGM_TENSES_BY_MOOD; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_VNC_SEMANTIC_VALUE_BY_PARADIGM_TENSE", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_VNC_SEMANTIC_VALUE_BY_PARADIGM_TENSE; },
    });
    api.normalizeClassicalNahuatlVncSemanticMood = normalizeClassicalNahuatlVncSemanticMood;
    api.normalizeClassicalNahuatlVncSemanticTense = normalizeClassicalNahuatlVncSemanticTense;
    api.normalizeClassicalNahuatlVncParadigmTense = normalizeClassicalNahuatlVncParadigmTense;
    api.getClassicalNahuatlVncSemanticTensesForMood = getClassicalNahuatlVncSemanticTensesForMood;
    api.getClassicalNahuatlVncParadigmTensesForMood = getClassicalNahuatlVncParadigmTensesForMood;
    api.getClassicalNahuatlVncSemanticValueForParadigmTense = getClassicalNahuatlVncSemanticValueForParadigmTense;
    api.getClassicalNahuatlVncSemanticInputVocabulary = getClassicalNahuatlVncSemanticInputVocabulary;
    api.validateClassicalNahuatlVncSemanticSelection = validateClassicalNahuatlVncSemanticSelection;
    api.validateClassicalNahuatlVncSemanticControlInventory = validateClassicalNahuatlVncSemanticControlInventory;
    api.installClassicalNahuatlVncLayerEvaluatorClassicGlobals = installClassicalNahuatlVncLayerEvaluatorClassicGlobals;
    return api;
}

export function installClassicalNahuatlVncLayerEvaluatorGlobals(targetObject = globalThis) {
    const api = createClassicalNahuatlVncLayerEvaluatorApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
