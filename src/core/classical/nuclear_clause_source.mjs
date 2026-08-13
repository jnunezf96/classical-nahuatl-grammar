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
const NUCLEAR_CLAUSE_USE_ROLES = Object.freeze([
  "simple-sentence",
  "main-clause",
  "dependent-clause",
  "conjoined-clause",
]);

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
    || mode === "adjetivo"
    || mode === "adjective"
    || mode === "adverbio"
    || mode === "adverb"
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

function resolveUsageRole(options = {}) {
  const normalized = String(
    options.usageRole || options.clauseUse || "simple-sentence",
  ).trim().toLowerCase();
  return NUCLEAR_CLAUSE_USE_ROLES.includes(normalized) ? normalized : "";
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
    const usageRole = resolveUsageRole(options);
    if (!normalizedStem || !clauseKind || !usageRole) {
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
      usageRole,
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
      structureFrame: freeze({
        unitKind: "nuclear-clause",
        excludedFormalClass: "particle",
        requiredFunctions: freeze(["subject", "predicate"]),
        formation: "stem-with-inflectional-affixes",
        constituentOrder: "rigid",
        entitiveFunctions: freeze(["subject", "object", "possessor"]),
        entitiveExpression: "personal-pronoun-affixes-only",
        expressionScope: "basic-nuclear",
        useRoles: NUCLEAR_CLAUSE_USE_ROLES,
        activeUseRole: source.usageRole,
        nuclearClauseKinds: freeze([
          "verbal-nuclear-clause",
          "nominal-nuclear-clause",
        ]),
        predicateSourceKind: source.clauseKind === "verbal-nuclear-clause"
          ? "verbal"
          : "nominal-adjectival-or-adverbial",
        stage1Formula: "Subject + Predicate",
        stage1Diagram: freeze({
          numerator: "Subject",
          denominator: "Predicate",
        }),
        positionsRepresent: "informational-categories",
        examplePositionCategories: freeze(["person", "number", "tense"]),
        fillersRepresent: "morphemes-or-morphs",
        formulaDerivedFromTypedStructure: true,
        subjectStructure: freeze({
          kind: "discontinuous-circumfix",
          personPosition: "prefix",
          numberPosition: "suffix",
          formula: "#person+...+number#",
        }),
        predicateStructure: source.clauseKind === "verbal-nuclear-clause"
          ? freeze({
              components: freeze(["valence", "stem", "tense"]),
              coreComponents: freeze(["valence", "stem"]),
              formula: "#person+valence(STEM)tense+number#",
            })
          : freeze({
              components: freeze(["state", "stem"]),
              coreComponents: freeze(["state", "stem"]),
              formula: "#person+state(STEM)number#",
            }),
        organizationalLayers: source.clauseKind === "verbal-nuclear-clause"
          ? freeze([
              "verbstem",
              "verbcore=valence+stem",
              "predicate=verbcore+tense",
              "VNC=subject+predicate",
            ])
          : freeze([
              "nounstem",
              "nouncore=predicate=state+stem",
              "NNC=subject+predicate",
            ]),
        stemIsFoundation: true,
        positionComplexity: freeze({
          person: "dyadic",
          number: "dyadic",
          tense: source.clauseKind === "verbal-nuclear-clause" ? "monadic" : "not-applicable",
          predicatePosition: source.slotArity,
          stem: "monadic-or-polyadic",
        }),
        selectedFormulaShape: freeze({
          clauseKind: source.clauseKind,
          predicatePositionArity: source.slotArity,
          formula: projectStructuralFormula({
            clauseKind: source.clauseKind,
            slotArity: source.slotArity,
            stem: source.stem,
          }),
          selectedBy: "active-typed-grammar",
          userFormulaChoiceRequired: false,
          implicitPositionPolicy: source.slotArity === "vacant"
            ? "grammatically-present-but-not-written-as-a-position"
            : "written-position-present",
        }),
      }),
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
    const personValue = String(options.person || "").trim().toLowerCase();
    const person = personValue === "first" || personValue === "1" ? "first"
      : personValue === "second" || personValue === "2" ? "second"
        : personValue === "third" || personValue === "3" ? "third"
          : "unspecified";
    const requestedAnimacy = String(options.animacy || "").trim().toLowerCase();
    const requestedHumanness = String(options.humanness || "").trim().toLowerCase();
    const requestedNumber = String(options.number || "").trim().toLowerCase();
    const referenceContext = String(options.referenceContext || "").trim();
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
      personSystem: freeze({
        features: freeze(["first", "second", "third"]),
        firstRole: "speaker",
        secondRole: "addressee",
        thirdRole: "other",
        selected: person,
      }),
      animacySystem: freeze({
        features: freeze(["animate", "nonanimate"]),
        culturallyClassifiedByNahuatl: true,
        selected: requestedAnimacy || (person === "first" || person === "second" ? "animate" : "contextual"),
      }),
      humannessSystem: freeze({
        features: freeze(["human", "nonhuman"]),
        subcategoryOf: "animacy",
        humanImpliesAnimate: true,
        firstAndSecondInnatelyHuman: true,
        selected: requestedHumanness || (person === "first" || person === "second" ? "human" : "contextual"),
      }),
      numberSystem: freeze({
        animateFeatures: freeze(["singular", "plural"]),
        nonanimateFeatures: freeze(["common"]),
        commonMeaning: "one-or-more-indiscriminately",
        thirdSingularAndCommonSameShape: true,
        selected: requestedNumber || "contextual",
      }),
      caseSystem: freeze({
        features: freeze(["nominative", "objective", "possessive"]),
        selected: pronounCase,
        nominativeOccursIn: freeze(["verbal-nuclear-clause", "nominal-nuclear-clause"]),
        objectiveOccursIn: freeze(["verbal-nuclear-clause"]),
        possessiveOccursIn: freeze(["nominal-nuclear-clause"]),
      }),
      referenceFrame: freeze({
        variableReference: true,
        modes: freeze(["deixis", "anaphora", "cataphora"]),
        deicticCenter: "first-person-speaker",
        secondPersonCounterpart: "addressee",
        thirdPersonRequiresContext: person === "third" || person === "unspecified",
        referenceContextSupplied: Boolean(referenceContext),
        status: person === "third" || person === "unspecified"
          ? referenceContext ? "context-supplied" : "context-required"
          : "participant-anchored",
      }),
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
