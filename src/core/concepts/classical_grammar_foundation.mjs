// Shared Classical Nahuatl grammar foundation.
//
// Lesson 1 defines distinctions used by later grammar operations. This module
// keeps them in one reusable code model without carrying Canvas text, atom IDs,
// examples, lesson routes, or stored Results into runtime grammar.

function deepFreeze(value, seen = new WeakSet()) {
  if (!value || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor && Object.prototype.hasOwnProperty.call(descriptor, "value")) {
      deepFreeze(descriptor.value, seen);
    }
  }
  return Object.freeze(value);
}

export const CLASSICAL_GRAMMAR_FOUNDATION = deepFreeze({
  kind: "classical-nahuatl-grammar-foundation",
  version: 1,
  languageId: "classical-nahuatl",
  scopeRules: {
    preliminaryScopeBounded: true,
    preliminaryFoundationIsCompleteGrammar: false,
    generalPrerequisitesOnly: true,
    laterLessonSpecificOwnersRequired: true,
    laterConceptsMayExtendFoundation: true,
    foundationMayNotReplaceSpecificOwner: true,
  },
  languageBoundary: {
    foreignGrammarTransferAllowed: false,
    foreignCategoryTransferAllowed: false,
    translationMayAuthorizeGrammar: false,
    languageSpecificOwnerRequired: true,
  },
  grammarDefinition: {
    elements: "typed-linguistic-elements",
    relationships: "owner-executed-grammatical-relationships",
    rules: "language-specific-canonical-operations",
  },
  communicationSourceParts: [
    "speaker",
    "addressee",
    "information",
    "carrier-medium",
    "content",
    "shared-rules",
  ],
  analysisLevels: ["type", "token", "instance"],
  elementMatrix: {
    type: ["phoneme", "grapheme", "sigeme", "sememe", "morpheme"],
    token: ["phone", "graph", "sig", "seme", "morph"],
    instance: ["sound", "letter", "meaning", "form"],
  },
  carrierSubsystems: ["phonological", "sigological", "graphological"],
  contentSystem: "semantic",
  morphemeCarrierKinds: ["phoneme-unit", "sigeme"],
  morphemeKinds: [
    "connective-or-housekeeping",
    "ordinary",
    "mute-or-silently-present",
  ],
  meaningfulRanks: [
    "morpheme-or-morph",
    "root",
    "stock",
    "stem",
    "nuclear-clause-or-particle",
    "group",
    "sentence",
  ],
  structurePrinciples: [
    "constituents-enter-as-units",
    "combination-results-in-one-unit",
    "recursive-composition",
    "concatenation",
    "interaction",
    "adjunctive-governance",
    "conjunctive-governance",
  ],
  conceptualPlanes: [
    "grammatical-function",
    "form-class",
    "lexical-item",
    "participant-role",
  ],
  boundaryRules: {
    derivational: "inside-stem",
    inflectional: "outside-stem",
  },
  authorityRules: {
    languageSpecificGrammar: true,
    lessonMetadataAuthority: false,
    curriculumOrderAuthority: false,
    translationAuthority: false,
    glossAuthority: false,
    exampleAuthority: false,
    evidenceAuthority: false,
    citationAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    displayTextAuthority: false,
  },
});

const FORBIDDEN_AUTHORITY_KEYS = Object.freeze(new Set([
  "lesson",
  "lessonid",
  "lessonnumber",
  "lessonmetadata",
  "highestactivelesson",
  "curriculum",
  "curriculumorder",
  "formula",
  "formulastring",
  "formularecord",
  "formularecords",
  "surface",
  "surfaceform",
  "surfaceforms",
  "targetsurface",
  "selectedresult",
  "result",
  "answer",
  "storedanswer",
  "canvasanswer",
  "example",
  "evidence",
  "citation",
  "sourcetext",
  "translation",
  "display",
  "displaytext",
  "label",
  "storedlabel",
  "glossary",
  "restoredstate",
  "uistate",
  "urlstate",
]));

export function normalizeClassicalGrammarFoundationKey(value = "") {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/gu, "");
}

export function isForbiddenClassicalGrammarAuthorityKey(value = "") {
  const key = normalizeClassicalGrammarFoundationKey(value);
  if (FORBIDDEN_AUTHORITY_KEYS.has(key)) return true;
  return /(formula|surface|answer|translation|display|label|glossary|curriculum|lesson|canvas|example|evidence|citation|sourcetext|restoredstate|uistate|urlstate)/u
    .test(key);
}

export function validateClassicalGrammarLanguageIdentity(value = undefined) {
  const supplied = value !== undefined && value !== null && value !== "";
  const languageId = supplied
    ? String(value).trim().toLowerCase()
    : CLASSICAL_GRAMMAR_FOUNDATION.languageId;
  const valid = languageId === CLASSICAL_GRAMMAR_FOUNDATION.languageId;
  return Object.freeze({
    valid,
    supplied,
    languageId,
    expectedLanguageId: CLASSICAL_GRAMMAR_FOUNDATION.languageId,
    foreignGrammarTransferAllowed:
      CLASSICAL_GRAMMAR_FOUNDATION.languageBoundary
        .foreignGrammarTransferAllowed,
    error: valid ? "" : `foreign-language-grammar-forbidden:${languageId}`,
  });
}

export function isClassicalGrammarReadOnlyAuthorityDeclaration(
  propertyName = "",
  value = undefined,
) {
  const normalizedPropertyName = normalizeClassicalGrammarFoundationKey(
    propertyName,
  );
  if (!/(authority|authorizing|accepted)$/u.test(normalizedPropertyName)) {
    return false;
  }
  if (value === false) return true;
  return [
    "display-only-not-authority",
    "not-authority",
    "non-authoritative",
    "read-only-not-authority",
  ].includes(String(value || "").trim().toLowerCase());
}

export function hasClassicalGrammarReadOnlyArtifactDeclaration(
  owner,
  propertyName = "",
) {
  const normalizedPropertyName = normalizeClassicalGrammarFoundationKey(
    propertyName,
  );
  const family = normalizedPropertyName.includes("formula")
    ? "formula"
    : normalizedPropertyName.includes("surface")
      ? "surface"
      : "";
  if (!family || !owner || typeof owner !== "object") return false;
  const authorityKeys = family === "formula"
    ? ["formulaArtifactAuthority", "formulaStringAuthority"]
    : ["surfaceArtifactAuthority", "surfaceStringAuthority"];
  return authorityKeys.some((authorityKey) => {
    let descriptor = null;
    try {
      descriptor = Object.getOwnPropertyDescriptor(owner, authorityKey);
    } catch {
      descriptor = null;
    }
    return Boolean(
      descriptor
      && Object.prototype.hasOwnProperty.call(descriptor, "value")
      && isClassicalGrammarReadOnlyAuthorityDeclaration(
        authorityKey,
        descriptor.value,
      )
    );
  });
}

export function validateClassicalGrammarFoundationRoute({
  operationId = "",
  capabilityName = "",
  axisIds = [],
} = {}) {
  const normalizedOperationId = String(operationId || "").trim();
  const normalizedCapabilityName = String(capabilityName || "").trim();
  const normalizedAxisIds = Array.isArray(axisIds)
    ? axisIds.map((axisId) => String(axisId || "").trim())
    : [];
  const errors = [];
  if (!normalizedOperationId) errors.push("operation-id-required");
  if (!normalizedCapabilityName) errors.push("capability-name-required");
  if (!normalizedAxisIds.length || normalizedAxisIds.some((axisId) => !axisId)) {
    errors.push("typed-axis-ids-required");
  }
  if (new Set(normalizedAxisIds).size !== normalizedAxisIds.length) {
    errors.push("duplicate-axis-id");
  }
  if (/(lesson|curriculum|translation|example|evidence|display)/iu.test(
    normalizedOperationId,
  )) {
    errors.push("non-grammatical-operation-identity");
  }
  return Object.freeze({
    valid: errors.length === 0,
    languageId: CLASSICAL_GRAMMAR_FOUNDATION.languageId,
    foundationRole: "required-prerequisite-not-complete-grammar",
    laterLessonSpecificOwnersRequired:
      CLASSICAL_GRAMMAR_FOUNDATION.scopeRules
        .laterLessonSpecificOwnersRequired,
    operationId: normalizedOperationId,
    capabilityName: normalizedCapabilityName,
    axisIds: Object.freeze(normalizedAxisIds),
    errors: Object.freeze(errors),
  });
}
