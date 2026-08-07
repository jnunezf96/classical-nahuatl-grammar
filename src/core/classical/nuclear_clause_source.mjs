// Canonical typed Source owner for Classical Nahuatl nuclear clauses.
//
// Curriculum coordinates and Canvas witnesses are deliberately absent here.
// The owner accepts only grammatical Source constituents, derives structural
// slot facts, and issues identity-bound results.  Formula and written
// projections are produced independently from the same typed result.

import {
  normalizeGenerationSourceTransitivity,
  validateGenerationSourceTransitivitySelection,
} from "../generation/valency.mjs?v=20260726-lessons2-58-one-system-094";

const SOURCE_KIND = "classical-nahuatl-nuclear-clause-source";
const RESULT_KIND = "classical-nahuatl-nuclear-clause-structure-result";
const PRONOUN_RESULT_KIND =
  "classical-nahuatl-personal-pronoun-structure-result";
const VERSION = 1;
const SOURCE_INVALID = "classical-nuclear-clause-source-invalid";
const SOURCE_AUTHORITY_INVALID =
  "classical-nuclear-clause-source-authority-invalid";
const OPERATION_INVALID =
  "classical-nuclear-clause-structure-operation-invalid";

const FORBIDDEN_AUTHORITY_KEYS = Object.freeze(new Set([
  "activeLesson",
  "canvasSpan",
  "displayFormula",
  "displaySurface",
  "exactWitness",
  "formula",
  "formulaArtifact",
  "formulaId",
  "formulaRecord",
  "formulaTemplate",
  "lesson",
  "lesson4Frame",
  "lessonMetadata",
  "lineEnd",
  "lineStart",
  "proofFrame",
  "result",
  "sourceDocument",
  "storedAnswer",
  "surface",
  "surfaceForms",
  "witness",
]));

function hasForbiddenAuthorityCarrier(value, seen = new Set()) {
  if (!value || typeof value !== "object" || seen.has(value)) {
    return false;
  }
  seen.add(value);
  for (const key of Reflect.ownKeys(value)) {
    if (
      typeof key !== "string"
      || FORBIDDEN_AUTHORITY_KEYS.has(key)
      || key.startsWith("lesson")
    ) {
      return true;
    }
    let child;
    try {
      child = value[key];
    } catch {
      return true;
    }
    if (hasForbiddenAuthorityCarrier(child, seen)) {
      return true;
    }
  }
  return false;
}

function normalizeStem(value = "") {
  return String(value == null ? "" : value)
    .trim()
    .replace(/^-+\s*/u, "")
    .replace(/^\((.*)\)$/u, "$1")
    .trim();
}

function normalizeClauseKind(value = "") {
  const normalized = String(value == null ? "" : value).trim().toLowerCase();
  if (
    normalized === "vnc"
    || normalized === "verbal"
    || normalized === "verbal-nuclear-clause"
  ) {
    return "verbal-nuclear-clause";
  }
  if (
    normalized === "nnc"
    || normalized === "nominal"
    || normalized === "nominal-nuclear-clause"
  ) {
    return "nominal-nuclear-clause";
  }
  return "";
}

function resolveClauseKind(options = {}) {
  const explicit = normalizeClauseKind(
    options.nuclearClauseKind || options.clauseKind || "",
  );
  if (explicit) {
    return explicit;
  }
  const mode = String(options.tenseMode || options.mode || "")
    .trim()
    .toLowerCase();
  const board = String(options.entryBoard || "").trim().toLowerCase();
  if (
    mode === "sustantivo"
    || mode === "noun"
    || board === "ordinary-nnc"
    || board === "pronominal-nnc"
  ) {
    return "nominal-nuclear-clause";
  }
  if (
    mode === "verbo"
    || mode === "verb"
    || Object.prototype.hasOwnProperty.call(options, "transitivity")
  ) {
    return "verbal-nuclear-clause";
  }
  return "";
}

function resolveValenceArity(options = {}, transitivity = "") {
  const explicit = String(
    options.valenceArity || options.valenceSlot || options.valencePosition || "",
  ).trim().toLowerCase();
  if (["vacant", "monadic", "dyadic"].includes(explicit)) {
    return explicit;
  }
  if (transitivity === "intransitive") {
    return "vacant";
  }
  if (transitivity === "transitive" || transitivity === "bitransitive") {
    return "dyadic";
  }
  return "";
}

function resolveStateArity(options = {}) {
  const explicit = String(
    options.stateArity || options.stateSlot || options.statePosition || "",
  ).trim().toLowerCase();
  if (["vacant", "monadic", "dyadic"].includes(explicit)) {
    return explicit;
  }
  const state = String(options.state || "").trim().toLowerCase();
  if (state === "possessive") {
    return "monadic";
  }
  if (state === "absolutive" || state === "vacant") {
    return "vacant";
  }
  return "";
}

function formulaSlotsFor(clauseKind, arity) {
  if (clauseKind === "verbal-nuclear-clause") {
    return Object.freeze([
      "pers1",
      "pers2",
      ...(arity === "dyadic"
        ? ["va1", "va2"]
        : arity === "monadic"
          ? ["va"]
          : []),
      "stem",
      "tns",
      "num1",
      "num2",
    ]);
  }
  return Object.freeze([
    "pers1",
    "pers2",
    ...(arity === "dyadic"
      ? ["st1", "st2"]
      : arity === "monadic"
        ? ["st"]
        : []),
    "stem",
    "num1",
    "num2",
  ]);
}

function projectStructuralFormula(result) {
  const subjectPrefix = "#pers1-pers2";
  const predicatePrefix = result.clauseKind === "verbal-nuclear-clause"
    ? result.slotArity === "dyadic"
      ? "+va1-va2"
      : result.slotArity === "monadic"
        ? "+va"
        : ""
    : result.slotArity === "dyadic"
      ? "+st1-st2"
      : result.slotArity === "monadic"
        ? "+st"
        : "";
  const postPredicateSlots = result.clauseKind === "verbal-nuclear-clause"
    ? "tns+num1-num2"
    : "num1-num2";
  return `${subjectPrefix}${predicatePrefix}(${result.stem})${postPredicateSlots}#`;
}

function projectStructuralWritten(result) {
  // This operation owns nuclear-clause structure, not finite inflection.
  // Its written projection is therefore the typed predicate constituent only.
  return String(result.stem);
}

function freeze(value) {
  return Object.freeze(value);
}

export function createClassicalNahuatlNuclearClauseRuntime(
  targetObject = globalThis,
) {
  const issuedSources = new WeakSet();
  const issuedResults = new WeakSet();
  const issuedPronounResults = new WeakSet();

  function buildClassicalNahuatlNuclearClauseSource(stem = "", options = {}) {
    if (
      !options
      || typeof options !== "object"
      || hasForbiddenAuthorityCarrier(options)
    ) {
      throw new Error(SOURCE_AUTHORITY_INVALID);
    }
    const normalizedStem = normalizeStem(stem);
    const clauseKind = resolveClauseKind(options);
    if (!normalizedStem || !clauseKind) {
      throw new Error(SOURCE_INVALID);
    }

    let transitivity = "";
    let slotArity = "";
    if (clauseKind === "verbal-nuclear-clause") {
      const selection = validateGenerationSourceTransitivitySelection(
        options.transitivity || "",
      );
      if (
        selection.authorizationStatus !== "authorized"
        || !selection.explicit
      ) {
        throw new Error(`${SOURCE_INVALID}:transitivity-required`);
      }
      transitivity = normalizeGenerationSourceTransitivity(
        selection.sourceTransitivity,
      );
      slotArity = resolveValenceArity(options, transitivity);
    } else {
      slotArity = resolveStateArity(options);
    }
    if (!slotArity) {
      throw new Error(`${SOURCE_INVALID}:predicate-slot-arity-required`);
    }

    const source = freeze({
      kind: SOURCE_KIND,
      version: VERSION,
      stem: normalizedStem,
      clauseKind,
      ...(transitivity ? { transitivity } : {}),
      slotArity,
    });
    issuedSources.add(source);
    return source;
  }

  function isClassicalNahuatlNuclearClauseSource(source = null) {
    return Boolean(
      source
      && issuedSources.has(source)
      && source.kind === SOURCE_KIND
      && source.version === VERSION,
    );
  }

  function evaluateClassicalNahuatlNuclearClauseStructure(source = null) {
    if (!isClassicalNahuatlNuclearClauseSource(source)) {
      throw new Error(SOURCE_AUTHORITY_INVALID);
    }
    const slots = formulaSlotsFor(source.clauseKind, source.slotArity);
    const result = {
      kind: RESULT_KIND,
      version: VERSION,
      source,
      stem: source.stem,
      clauseKind: source.clauseKind,
      selectedNuclearClauseKind: source.clauseKind,
      ...(source.transitivity ? { transitivity: source.transitivity } : {}),
      slotArity: source.slotArity,
      formulaSlots: slots,
      predicateFrame: freeze({
        kind: "classical-nahuatl-nuclear-predicate-structure",
        predicateKind: source.clauseKind === "verbal-nuclear-clause"
          ? "verbal-predicate"
          : "nominal-predicate",
        stem: source.stem,
        stemBoundaryPolicy: "predicate-stem-inside-parentheses",
        subjectConnectorBoundary: "outside-parentheses",
        stateBelongsTo: source.clauseKind === "nominal-nuclear-clause"
          ? "predicate"
          : "not-applicable",
        valenceBelongsTo: source.clauseKind === "verbal-nuclear-clause"
          ? "verbcore"
          : "not-applicable",
        tenseSlot: source.clauseKind === "verbal-nuclear-clause"
          ? "present"
          : "none",
      }),
      authorizationStatus: "authorized",
      blocksInput: false,
    };
    result.formulaTemplate = projectStructuralFormula(result);
    result.formulaRealization = projectStructuralFormula(result);
    result.formula = projectStructuralFormula(result);
    result.written = projectStructuralWritten(result);
    const frozen = freeze(result);
    issuedResults.add(frozen);
    return frozen;
  }

  function buildClassicalNahuatlNuclearClauseResult(stem = "", options = {}) {
    return evaluateClassicalNahuatlNuclearClauseStructure(
      buildClassicalNahuatlNuclearClauseSource(stem, options),
    );
  }

  function isClassicalNahuatlNuclearClauseResult(result = null) {
    return Boolean(
      result
      && issuedResults.has(result)
      && result.kind === RESULT_KIND
      && result.version === VERSION
      && isClassicalNahuatlNuclearClauseSource(result.source),
    );
  }

  function evaluateClassicalNahuatlPersonalPronounStructure(options = {}) {
    if (
      !options
      || typeof options !== "object"
      || hasForbiddenAuthorityCarrier(options)
    ) {
      throw new Error(SOURCE_AUTHORITY_INVALID);
    }
    const pronounCase = String(
      options.pronounCase || options.case || options.syntacticFunction || "",
    ).trim().toLowerCase();
    const clauseKind = normalizeClauseKind(
      options.nuclearClauseKind || options.clauseKind || "",
    );
    const positionRole = String(
      options.positionRole || options.formulaRegion || "",
    ).trim().toLowerCase();
    if (
      !["nominative", "objective", "possessive"].includes(pronounCase)
      || !clauseKind
      || !["subject", "predicate"].includes(positionRole)
      || String(options.gender || options.sex || "").trim()
    ) {
      throw new Error(OPERATION_INVALID);
    }
    const allowed = pronounCase === "nominative"
      ? positionRole === "subject"
      : positionRole === "predicate"
        && (
          pronounCase === "objective"
            ? clauseKind === "verbal-nuclear-clause"
            : clauseKind === "nominal-nuclear-clause"
        );
    if (!allowed) {
      throw new Error(OPERATION_INVALID);
    }
    const result = freeze({
      kind: PRONOUN_RESULT_KIND,
      version: VERSION,
      pronounCase,
      clauseKind,
      positionRole,
      formType: "affixal",
      featureLoci: freeze([
        "person",
        "animacy",
        "humanness",
        "number",
        "case",
      ]),
      genderFeatureAllowed: false,
      formulaPositionsOnly: true,
      formulaSlots: freeze(
        pronounCase === "nominative"
          ? ["pers1", "pers2", "num1", "num2"]
          : pronounCase === "objective"
            ? ["va1", "va2", "va"]
            : ["st1", "st2", "st"],
      ),
      authorizationStatus: "authorized",
    });
    issuedPronounResults.add(result);
    return result;
  }

  function isClassicalNahuatlPersonalPronounStructureResult(result = null) {
    return Boolean(
      result
      && issuedPronounResults.has(result)
      && result.kind === PRONOUN_RESULT_KIND
      && result.version === VERSION,
    );
  }

  const api = freeze({
    buildClassicalNahuatlNuclearClauseSource,
    isClassicalNahuatlNuclearClauseSource,
    evaluateClassicalNahuatlNuclearClauseStructure,
    buildClassicalNahuatlNuclearClauseResult,
    isClassicalNahuatlNuclearClauseResult,
    evaluateClassicalNahuatlPersonalPronounStructure,
    isClassicalNahuatlPersonalPronounStructureResult,
  });
  Object.assign(targetObject, api);
  return api;
}

export function installClassicalNahuatlNuclearClauseGlobals(
  targetObject = globalThis,
) {
  return createClassicalNahuatlNuclearClauseRuntime(targetObject);
}
