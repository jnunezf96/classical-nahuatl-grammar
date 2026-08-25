// Canonical Andrews Lesson 56 personal-name NNC grammar.
//
// Runtime authority is an issued typed source unit, not a lesson number,
// displayed formula, stored example, spelling, capitalization, or translation.

export function createPersonalNameNncApi(targetObject = globalThis, installationContext = null) {
  const grammarFrameOwnerCapability = installationContext?.grammarFrameOwnerCapability || null;
  const VERSION = 2;
  const issuedClauses = new WeakSet();
  const issuedSources = new WeakSet();
  const issuedOperations = new WeakSet();
  const issuedResults = new WeakSet();
  const issuedSentenceResults = new WeakSet();
  const issuedPlans = new WeakSet();
  const issuedExactSourceResolutions = new WeakSet();

  const freeze = value => {
    if (Array.isArray(value)) return Object.freeze(value.map(freeze));
    if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
    Object.values(value).forEach(freeze);
    return Object.freeze(value);
  };
  const text = value => String(value ?? "").normalize("NFC").trim();
  const key = value => text(value).toLowerCase().replace(/[\s_]+/gu, "-");
  const zero = value => ["", "0", "ø", "Ø", "⎕"].includes(text(value)) ? "Ø" : text(value);
  const HOSTILE_AUTHORITY_KEYS = freeze([
    "answer", "canvasAnswer", "displayFormula", "displayText", "formula",
    "formulaArtifact", "generationAllowed", "lesson", "lessonMetadata",
    "resultSurface", "surface", "targetFormula", "targetSegments", "targetStem",
  ]);

  const PERSONAL_NAME_NNC_KIND = freeze({
    personalNameNnc: "personal-name-nnc",
    singleClauseName: "single-clause-name",
    adjunctionDerivedName: "adjunction-derived-name",
    conjunctionDerivedName: "conjunction-derived-name",
    calendarName: "calendar-name",
    unknown: "unknown",
  });
  const PERSONAL_NAME_NNC_FALSE_POSITIVE_SOURCE = freeze({
    ordinaryNncFixture: "ordinary-nnc-fixture",
    ordinaryNncOpenStem: "ordinary-nnc-open-stem",
    pronounLabel: "pronoun-label",
    capitalizationLabel: "capitalization-label",
    placeGentilicBoundary: "place-gentilic-boundary",
    adverbialAdjunctionBoundary: "adverbial-adjunction-boundary",
    conjunctionBoundary: "conjunction-boundary",
    calendarRoadmapText: "calendar-roadmap-text",
    properNameTranslation: "proper-name-translation",
    singleGeneratedWord: "single-generated-word",
    roadmapText: "roadmap-text",
    titleLabel: "title-label",
    vocativeLabel: "vocative-label",
    unknown: "unknown",
  });
  const INNER_SUBJECT_PREFIX_MORPHS = freeze([
    "Ø", "ni", "n", "ti", "t", "an", "am",
  ]);
  const INNER_SUBJECT_CONNECTOR_MORPHS = freeze(["Ø"]);
  const INNER_NUMBER_PREFIX_MORPHS = freeze([
    "Ø", "⎕", "c", "qu", "qui", "h", "que", "li", "tl", "tli",
    "meh", "tin",
  ]);
  const INNER_NUMBER_SUFFIX_MORPHS = freeze([
    "Ø", "h", "que", "meh", "tin",
  ]);

  const SOURCE_FAMILY_SPECS = freeze([
    { id: "preterit-agentive", section: "56.2.1.a", unitKind: "single-clause", innerKind: "nominalized-vnc", nominalization: "preterit-agentive", minClauses: 1, maxClauses: 1 },
    { id: "preterit-as-present-agentive", section: "56.2.1.a", unitKind: "single-clause", innerKind: "nominalized-vnc", nominalization: "preterit-as-present-agentive", minClauses: 1, maxClauses: 1 },
    { id: "present-agentive", section: "56.2.1.b", unitKind: "single-clause", innerKind: "nominalized-vnc", nominalization: "present-agentive", minClauses: 1, maxClauses: 1 },
    { id: "customary-present-agentive", section: "56.2.1.c", unitKind: "single-clause", innerKind: "nominalized-vnc", nominalization: "customary-present-agentive", minClauses: 1, maxClauses: 1 },
    { id: "purposive-past-agentive", section: "56.2.1.d", unitKind: "single-clause", innerKind: "nominalized-vnc", nominalization: "past-agentive", sourceVoice: "purposive", minClauses: 1, maxClauses: 1 },
    { id: "reflexive-preterit-agentive", section: "56.2.1.e", unitKind: "single-clause", innerKind: "nominalized-vnc", nominalization: "preterit-agentive", reflexiveController: "inner-subject", minClauses: 1, maxClauses: 1 },
    { id: "passive-preterit-patientive", section: "56.2.1.f", unitKind: "single-clause", innerKind: "nominalized-vnc", nominalization: "preterit-patientive", sourceVoice: "passive", minClauses: 1, maxClauses: 1 },
    { id: "impersonal-preterit-agentive", section: "56.2.1.g", unitKind: "single-clause", innerKind: "nominalized-vnc", nominalization: "preterit-agentive", sourceVoice: "impersonal", minClauses: 1, maxClauses: 1 },
    { id: "absolutive-state-nnc", section: "56.2.2.a", unitKind: "single-clause", innerKind: "absolutive-state-nnc", sourceState: "absolutive", minClauses: 1, maxClauses: 1 },
    { id: "absolutive-state-truncated-inner-number", section: "56.2.2.a", unitKind: "single-clause", innerKind: "absolutive-state-nnc", sourceState: "absolutive", innerNumberMode: "truncated", minClauses: 1, maxClauses: 1 },
    { id: "possessive-state-nnc", section: "56.2.2.b", unitKind: "single-clause", innerKind: "possessive-state-nnc", sourceState: "possessive", minClauses: 1, maxClauses: 1 },
    { id: "subject-supplementation", section: "56.3.1", unitKind: "adjunction", innerKind: "multiple-clause", relationKind: "subject-supplementation", minClauses: 2 },
    { id: "possessor-supplementation", section: "56.3.2", unitKind: "adjunction", innerKind: "multiple-clause", relationKind: "possessor-supplementation", minClauses: 2 },
    { id: "adjectival-modification", section: "56.3.3", unitKind: "adjunction", innerKind: "multiple-clause", relationKind: "adjectival-modification", minClauses: 2 },
    { id: "adverbial-modification", section: "56.3.4", unitKind: "adjunction", innerKind: "multiple-clause", relationKind: "adverbial-modification", minClauses: 2 },
    { id: "calendar-double-nucleus", section: "56.3.5", unitKind: "calendar", innerKind: "calendar-name", calendarShape: "double-nucleus", minClauses: 2, maxClauses: 2 },
    { id: "calendar-single-nucleus", section: "56.3.5", unitKind: "calendar", innerKind: "calendar-name", calendarShape: "single-nucleus", minClauses: 1, maxClauses: 1 },
    { id: "calendar-day-sign", section: "56.3.5", unitKind: "calendar", innerKind: "calendar-name", calendarShape: "day-sign", minClauses: 1, maxClauses: 1 },
    { id: "calendar-personalizing-thing", section: "56.3.5", unitKind: "calendar", innerKind: "calendar-name", calendarShape: "personalizing-thing", minClauses: 1, maxClauses: 2 },
    { id: "conjunctorless-personal-name-unit", section: "56.4", unitKind: "conjunction", innerKind: "conjoined-personal-name-unit", relationKind: "conjunctorless-conjunction", minClauses: 2 },
  ]);
  const SOURCE_FAMILY_BY_ID = new Map(SOURCE_FAMILY_SPECS.map(spec => [spec.id, spec]));

  const SENTENCE_OPERATION_SPECS = freeze([
    { id: "sentence-name-use", section: "56.5", outputKind: "sentence-name-node" },
    { id: "title-contrast", section: "56.5", outputKind: "name-title-contrast-node" },
    { id: "vocative-collocation", section: "56.5", outputKind: "vocative-name-node" },
    { id: "adjunctor-before-each-conjunct", section: "56.5", outputKind: "adjunctor-scope-node" },
    { id: "adjunctor-before-whole-unit", section: "56.5", outputKind: "adjunctor-scope-node" },
    { id: "adjunctor-absent", section: "56.5", outputKind: "adjunctor-scope-node" },
    { id: "god-name-to-normal-nnc", section: "56.5-note-1", outputKind: "ordinary-nnc-source" },
    { id: "god-name-to-place-name-embed", section: "56.5-note-2", outputKind: "place-name-embed-source" },
  ]);
  const SENTENCE_OPERATION_BY_ID = new Map(SENTENCE_OPERATION_SPECS.map(spec => [spec.id, spec]));

  const LCM_AXES = freeze([
    { id: "source-unit-kind", values: ["single-clause", "adjunction", "calendar", "conjunction"] },
    { id: "inner-source-kind", values: ["nominalized-vnc", "absolutive-state-nnc", "possessive-state-nnc", "multiple-clause", "calendar-name", "conjoined-personal-name-unit"] },
    { id: "nominalization", values: ["preterit-agentive", "preterit-as-present-agentive", "present-agentive", "customary-present-agentive", "past-agentive", "preterit-patientive", "none"] },
    { id: "source-voice", values: ["active", "passive", "impersonal", "purposive", "not-applicable"] },
    { id: "inner-subject-reference", values: ["specific", "nonspecific", "nonanimate", "animate", "independent-of-outer"] },
    { id: "inner-number-mode", values: ["overt", "zero", "truncated", "outer-affective-forced-zero"] },
    { id: "inner-reflexive-controller", values: ["inner-subject", "none"] },
    { id: "source-relation", values: ["none", "subject-supplementation", "possessor-supplementation", "adjectival-modification", "adverbial-modification", "conjunctorless-conjunction"] },
    { id: "modification-ambiguity", values: ["unambiguous", "also-subject-supplementation"] },
    { id: "calendar-shape", values: ["none", "double-nucleus", "single-nucleus", "day-sign", "personalizing-thing"] },
    { id: "affective-scope", values: ["none", "inner-source", "outer-name", "general-use-agentive"] },
    { id: "affective-matrix", values: ["none", "tzin", "tz", "ton"] },
    { id: "outer-subject", values: ["1sg", "2sg", "3sg"] },
    { id: "outer-number", values: ["zero-zero"] },
    { id: "translation-register", values: ["strict-called-quoted-clause", "foreign-bracket-paraphrase-diagnostic-only"] },
    { id: "conjunction-analysis", values: ["two-tier-conjoined-name-unit", "distinct-conjunctive-compound-alternative"] },
    { id: "sentence-use", values: SENTENCE_OPERATION_SPECS.map(spec => spec.id) },
    { id: "title-status", values: ["personal-name-nnc", "ordinary-title-nnc"] },
    { id: "adjunctor-scope", values: ["each-conjunct", "whole-unit", "absent"] },
    { id: "god-name-reranking", values: ["personal-name", "normal-nnc-with-plural-rights", "place-name-embed"] },
  ]);
  const LCM_PROJECTION_IDENTITY =
    "classical-nahuatl-personal-name-nnc-owner-selected-lcm-projection";
  const PROJECTED_AXIS_IDS = freeze([
    "affective-scope",
    "affective-matrix",
    "outer-subject",
    "outer-number",
    "translation-register",
    "conjunction-analysis",
    "adjunctor-scope",
    "god-name-reranking",
  ]);
  const GCD_STAGES = freeze([
    "validated-typed-source-clause-or-clause-unit",
    "preserve-each-inner-predicate-subject-and-number-dyad",
    "downgrade-the-complete-source-statement-to-nounstem-rank",
    "apply-inner-or-outer-affective-scope-at-the-typed-boundary",
    "place-the-downgraded-source-as-predicate-of-an-absolutive-state-nnc",
    "apply-an-independent-outer-subject-with-fixed-zero-zero-number",
    "realize-classical-transcription-at-typed-boundaries",
    "return-formula-and-finite-surface-from-the-same-typed-slots",
  ]);
  const FIXED_OUTER_NUMBER_DYAD = freeze({
    prefix: "Ø",
    suffix: "Ø",
  });
  const PERSONAL_NAME_NNC_ANTI_CONFLATION_RULES = freeze([
    "a personal name is a two-tier NNC, not a flat word",
    "the outer subject never controls the inner predicate, possessor, or reflexive",
    "the outer number dyad is always zero-zero",
    "an incorporated inner embed is not the subject or matrix",
    "a bracketed name-like translation is not structural authority",
    "capitalization, spelling, a title, a vocative, a formula, and a displayed result do not authorize personal-name grammar",
    "adjunction and conjunction preserve their complete inner clause structures",
    "a conjoined personal-name unit and its conjunctive-compound alternative are distinct analyses",
    "a god name reranked as an ordinary NNC is no longer generated as a personal-name shell",
    "Classical source morphs remain in Andrews transcription and are realized only by the Classical boundary rules",
  ]);
  const LESSON56_PERSONAL_NAME_NNC_CANVAS_REFS = freeze([
    "ANDREWS_TRANSCRIPTION_CANVAS.md:24065-24704",
    "Lesson 56.1", "Lesson 56.2", "Lesson 56.3", "Lesson 56.4", "Lesson 56.5",
  ]);
  const LESSON56_PERSONAL_NAME_NNC_VALIDATION_REFS = freeze([
    "src/tests/fixtures/classical_lesson56_source_ledger.js",
    "src/tests/nnc_names.test.js",
  ]);

  function findHostileAuthorityPath(value, path = "request") {
    if (!value || typeof value !== "object") return "";
    for (const [field, item] of Object.entries(value)) {
      const next = `${path}.${field}`;
      if (HOSTILE_AUTHORITY_KEYS.includes(field) && item !== undefined && item !== null && item !== "") return next;
      if (item && typeof item === "object") {
        const nested = findHostileAuthorityPath(item, next);
        if (nested) return nested;
      }
    }
    return "";
  }
  function normalizePersonalNameNncEnum(value = "", allowedValues = [], fallback = "unknown") {
    const normalized = key(value);
    return allowedValues.includes(normalized) ? normalized : fallback;
  }
  function normalizePersonalNameNncKind(value = "") {
    return normalizePersonalNameNncEnum(value, Object.values(PERSONAL_NAME_NNC_KIND), PERSONAL_NAME_NNC_KIND.unknown);
  }
  function normalizePersonalNameNncFalsePositiveSource(value = "") {
    return normalizePersonalNameNncEnum(value, Object.values(PERSONAL_NAME_NNC_FALSE_POSITIVE_SOURCE), PERSONAL_NAME_NNC_FALSE_POSITIVE_SOURCE.unknown);
  }
  function normalizeMorph(value = "") {
    const morph = zero(value).replace(/^\((.*)\)$/u, "$1");
    if (morph === "Ø") return morph;
    return /^[\p{L}\p{M}⎕-]+$/u.test(morph) ? morph : "";
  }
  function realizeClassicalMorph(value = "") {
    const morph = normalizeMorph(value);
    if (!morph || morph === "Ø") return "";
    return text(morph.replace(/-/gu, ""));
  }
  function normalizeOuterSubject(value = "") {
    const normalized = key(value).replace(/-/gu, "");
    return ({ "1sg": "1sg", "2sg": "2sg", "3sg": "3sg" })[normalized] || "";
  }
  function buildPersonalNameSelectedLcmProjection(selectedCoordinates = {}) {
    const selectedValues = {};
    const ownerSourcePaths = {};
    Object.entries(selectedCoordinates).forEach(
      ([axisId, coordinate]) => {
        const axis = LCM_AXES.find(candidate => candidate.id === axisId);
        const selectedValue = key(coordinate?.selectedValue);
        if (
          !PROJECTED_AXIS_IDS.includes(axisId)
          || !axis?.values?.includes(selectedValue)
        ) return;
        selectedValues[axisId] = selectedValue;
        ownerSourcePaths[axisId] = coordinate.ownerSourcePath;
      }
    );
    const selectedAxisValues = Object.entries(selectedValues).map(
      ([axisId, selectedValue]) => freeze({
        axisId,
        selectedValue,
        ownerSourcePath: ownerSourcePaths[axisId],
      })
    );
    return freeze({
      projectionIdentity: LCM_PROJECTION_IDENTITY,
      selectedValues,
      selectedAxisValues,
      selectedAxisIds: selectedAxisValues.map(selection => selection.axisId),
      ownerSourcePaths,
      selectedValuesAreTypedProjection: true,
    });
  }

  function hasValidPersonalNameSelectedLcmProjection(frame = null) {
    const projection = frame?.leastCommonMultiple;
    return Boolean(
      projection?.projectionIdentity === LCM_PROJECTION_IDENTITY
      && projection.selectedValuesAreTypedProjection === true
      && Array.isArray(projection.selectedAxisValues)
      && projection.selectedAxisValues.every(selection => (
        PROJECTED_AXIS_IDS.includes(selection.axisId)
        && projection.selectedValues?.[selection.axisId]
          === selection.selectedValue
        && projection.ownerSourcePaths?.[selection.axisId]
          === selection.ownerSourcePath
      ))
    );
  }
  function outerSubjectFormula(subject = "") {
    return ({ "1sg": ["ni", "Ø"], "2sg": ["ti", "Ø"], "3sg": ["Ø", "Ø"] })[subject] || [];
  }
  function outerSubjectSurface(subject = "", following = "") {
    const prefix = ({ "1sg": "ni", "2sg": "ti", "3sg": "" })[subject] ?? "";
    if (!prefix) return "";
    const beginsWithVowel = /^[aeiouāēīōū]/iu.test(following);
    return beginsWithVowel ? prefix.slice(0, 1) : prefix;
  }
  function renderFormulaMorph(value = "") {
    return normalizeMorph(value) || "Ø";
  }
  function sourceFamilySpec(value = "") {
    return SOURCE_FAMILY_BY_ID.get(key(value)) || null;
  }
  function getPersonalNameNncSourceFamilyStructure(value = "") {
    const spec = sourceFamilySpec(value);
    if (!spec) return null;
    const allowedAffectiveScopes = [
      "none",
      "outer-name",
      ...([
        "preterit-agentive",
        "preterit-as-present-agentive",
      ].includes(spec.id)
        ? ["general-use-agentive"]
        : []),
      ...([
        "absolutive-state-nnc",
        "absolutive-state-truncated-inner-number",
        "possessive-state-nnc",
      ].includes(spec.id)
        ? ["inner-source"]
        : []),
    ];
    return freeze({
      sourceFamily: spec.id,
      sourceUnitKind: spec.unitKind,
      innerKind: spec.innerKind,
      minimumClauseCount: spec.minClauses,
      maximumClauseCount: spec.maxClauses || null,
      nominalization: key(spec.nominalization || "none"),
      sourceVoice: key(
        spec.sourceVoice
        || (spec.innerKind === "nominalized-vnc"
          ? "active"
          : "not-applicable"),
      ),
      sourceState: key(spec.sourceState || "not-applicable"),
      reflexiveController: key(spec.reflexiveController || "none"),
      relationKind: key(spec.relationKind || "none"),
      calendarShape: key(spec.calendarShape || "none"),
      allowedAffectiveScopes,
      readOnlyDerivedFacts: true,
      generationAuthority: false,
    });
  }
  function clauseSurfaceFromSlots({ subjectPrefix, subjectConnector, predicateMorphs, numberPrefix, numberSuffix }) {
    return [
      subjectPrefix, subjectConnector, ...predicateMorphs, numberPrefix, numberSuffix,
    ].map(realizeClassicalMorph).join("");
  }
  function getPersonalNameNncInnerClauseFunctionalSlotDefaults(
    sourceFamily = "",
  ) {
    const spec = sourceFamilySpec(sourceFamily);
    if (!spec) return null;
    const vncSource = spec.innerKind === "nominalized-vnc";
    const truncatedNumber =
      spec.innerNumberMode === "truncated";
    return freeze({
      subjectPrefix: "Ø",
      subjectConnector: "Ø",
      subjectReference: "independent-of-outer",
      numberPrefix:
        truncatedNumber ? "Ø" : vncSource ? "c" : "Ø",
      numberSuffix: "Ø",
      functionalMorphsAreDerived: true,
      functionalMorphsAreUserSelectable: false,
      sourceFamily: spec.id,
    });
  }
  function buildPersonalNameInnerClauseFrame(request = {}) {
    const allowedFields = new Set([
      "sourceFamily",
      "subjectPrefix",
      "subjectConnector",
      "predicateMorphs",
      "numberPrefix",
      "numberSuffix",
      "subjectReference",
      "semanticRoles",
    ]);
    if (
      !request
      || typeof request !== "object"
      || Array.isArray(request)
      || Object.keys(request).some(field => !allowedFields.has(field))
    ) return null;
    const {
      sourceFamily = "",
      subjectPrefix = "Ø",
      subjectConnector = "Ø",
      predicateMorphs = [],
      numberPrefix = "Ø",
      numberSuffix = "Ø",
      subjectReference = "independent-of-outer",
      semanticRoles = [],
    } = request;
    const spec = sourceFamilySpec(sourceFamily);
    const morphs = Array.isArray(predicateMorphs) ? predicateMorphs.map(normalizeMorph) : [];
    const normalizedSubjectPrefix = renderFormulaMorph(subjectPrefix);
    const normalizedSubjectConnector =
      renderFormulaMorph(subjectConnector);
    const normalizedNumberPrefix = renderFormulaMorph(numberPrefix);
    const normalizedNumberSuffix = renderFormulaMorph(numberSuffix);
    if (
      !spec
      || !morphs.length
      || morphs.some(value => !value)
      || !INNER_SUBJECT_PREFIX_MORPHS.includes(normalizedSubjectPrefix)
      || !INNER_SUBJECT_CONNECTOR_MORPHS.includes(
        normalizedSubjectConnector,
      )
      || !INNER_NUMBER_PREFIX_MORPHS.includes(normalizedNumberPrefix)
      || !INNER_NUMBER_SUFFIX_MORPHS.includes(normalizedNumberSuffix)
    ) return null;
    const expectedNominalization = key(spec.nominalization || "none");
    const expectedSourceVoice = key(
      spec.sourceVoice
      || (spec.innerKind === "nominalized-vnc" ? "active" : "not-applicable"),
    );
    const expectedSourceState = key(spec.sourceState || "not-applicable");
    const expectedReflexiveController = key(
      spec.reflexiveController || "none",
    );
    const selectedSubjectReference = normalizePersonalNameNncEnum(
      subjectReference,
      ["specific", "nonspecific", "nonanimate", "animate", "independent-of-outer"],
      "",
    );
    if (
      !selectedSubjectReference
    ) return null;
    const slots = freeze({
      innerSubject: {
        prefix: normalizedSubjectPrefix,
        connector: normalizedSubjectConnector,
        reference: selectedSubjectReference,
      },
      predicate: { morphs },
      innerNumber: {
        prefix: normalizedNumberPrefix,
        suffix: normalizedNumberSuffix,
        mode: spec.innerNumberMode
          || (
            normalizedNumberPrefix === "Ø"
            && normalizedNumberSuffix === "Ø"
              ? "zero"
              : "overt"
          ),
      },
    });
    const frame = freeze({
      kind: "classical-nahuatl-personal-name-inner-clause-frame",
      version: VERSION,
      sourceFamily: spec.id,
      section: spec.section,
      sourceUnitKind: spec.unitKind,
      innerKind: spec.innerKind,
      nominalization: expectedNominalization,
      sourceVoice: expectedSourceVoice,
      sourceState: expectedSourceState,
      reflexiveController: expectedReflexiveController,
      semanticRoles: freeze(Array.isArray(semanticRoles) ? semanticRoles.map(key).filter(Boolean) : []),
      slots,
      functionalMorphInventoryAuthority:
        "closed-andrews-person-number-morph-inventory",
      functionalMorphsUserSelectable: false,
      typedFrameAuthority: true,
      callerSuppliedFormulaAuthority: false,
      callerSuppliedSurfaceAuthority: false,
    });
    issuedClauses.add(frame);
    return frame;
  }

  function buildPersonalNameNncSourceFrame(request = {}) {
    const allowedFields = new Set([
      "sourceFamily",
      "clauses",
      "modificationAmbiguity",
      "referentKind",
    ]);
    if (
      !request
      || typeof request !== "object"
      || Array.isArray(request)
      || Object.keys(request).some(field => !allowedFields.has(field))
    ) return null;
    const {
      sourceFamily = "",
      clauses = [],
      modificationAmbiguity = "unambiguous",
      referentKind = "",
    } = request;
    const spec = sourceFamilySpec(sourceFamily);
    const sourceClauses = Array.isArray(clauses) ? clauses : [];
    if (!spec || sourceClauses.some(clause => !issuedClauses.has(clause))) return null;
    if (sourceClauses.length < spec.minClauses || (spec.maxClauses && sourceClauses.length > spec.maxClauses)) return null;
    if (sourceClauses.some(clause => clause.sourceFamily !== spec.id)) return null;
    const normalizedRelation = key(spec.relationKind || "none");
    const normalizedCalendarShape = key(spec.calendarShape || "none");
    const normalizedAmbiguity = normalizePersonalNameNncEnum(
      modificationAmbiguity,
      ["unambiguous", "also-subject-supplementation"],
      "",
    );
    const normalizedReferentKind = normalizePersonalNameNncEnum(
      referentKind
        || (spec.id === "calendar-personalizing-thing"
          ? "thing"
          : "person"),
      ["person", "god", "thing"],
      "",
    );
    if (
      !normalizedAmbiguity
      || !normalizedReferentKind
    ) return null;
    if (
      normalizedAmbiguity === "also-subject-supplementation"
      && spec.id !== "adjectival-modification"
    ) return null;
    if (
      normalizedReferentKind === "thing"
      && spec.id !== "calendar-personalizing-thing"
    ) return null;
    const frame = freeze({
      kind: "classical-nahuatl-personal-name-source-frame",
      version: VERSION,
      routeFamily: "personal-name-nnc",
      sourceFamily: spec.id,
      section: spec.section,
      sourceUnitKind: spec.unitKind,
      innerKind: spec.innerKind,
      relationKind: normalizedRelation,
      modificationAmbiguity: normalizedAmbiguity,
      calendarShape: normalizedCalendarShape,
      referentKind: normalizedReferentKind,
      clauses: freeze(sourceClauses),
      typedFrameAuthority: true,
      callerSuppliedFormulaAuthority: false,
      callerSuppliedSurfaceAuthority: false,
    });
    issuedSources.add(frame);
    return frame;
  }

  function isPersonalNameInnerClauseFrame(frame = null) {
    return Boolean(
      frame
      && issuedClauses.has(frame)
      && frame.kind ===
        "classical-nahuatl-personal-name-inner-clause-frame"
      && frame.version === VERSION
      && frame.typedFrameAuthority === true
      && frame.callerSuppliedFormulaAuthority === false
      && frame.callerSuppliedSurfaceAuthority === false
      && Object.isFrozen(frame)
    );
  }

  function isPersonalNameNncSourceFrame(frame = null) {
    return Boolean(
      frame
      && issuedSources.has(frame)
      && frame.kind === "classical-nahuatl-personal-name-source-frame"
      && frame.version === VERSION
      && frame.routeFamily === "personal-name-nnc"
      && Array.isArray(frame.clauses)
      && frame.clauses.every(isPersonalNameInnerClauseFrame)
      && frame.typedFrameAuthority === true
      && frame.callerSuppliedFormulaAuthority === false
      && frame.callerSuppliedSurfaceAuthority === false
      && Object.isFrozen(frame)
      && Object.isFrozen(frame.clauses)
    );
  }

  function hasPersonalNameExactSourceResultField(request = {}) {
    return Boolean(
      request
      && typeof request === "object"
      && Object.prototype.hasOwnProperty.call(
        request,
        "canonicalSourceResult",
      )
    );
  }

  function getPersonalNameExactRawSourceField(request = {}) {
    if (!request || typeof request !== "object") return "";
    return [
      "sourceFrame",
      "source",
      "clauses",
      "predicateMorphs",
      "stem",
      "clauseKind",
    ].find(field => (
      Object.prototype.hasOwnProperty.call(request, field)
      && request[field] !== undefined
      && request[field] !== null
      && request[field] !== ""
    )) || "";
  }

  function getPersonalNameExactNncSlotFrame(result = null) {
    if (
      typeof targetObject.isClassicalNahuatlIssuedNncSentenceSurfaceFrame
        === "function"
      && targetObject.isClassicalNahuatlIssuedNncSentenceSurfaceFrame(
        result,
      )
    ) {
      return result.sourceNncSlotFrame || null;
    }
    return [
      result?.typedSlotFrame,
      result?.nncSlotFrame,
      result?.canonicalResult?.nncSlotFrame,
      result?.canonicalResult?.typedSlotFrame,
      result?.resultFrame?.typedSlotFrame,
    ].find(frame => (
      typeof targetObject.isClassicalNahuatlNncSlotFrame === "function"
      && targetObject.isClassicalNahuatlNncSlotFrame(frame)
    )) || null;
  }

  function getPersonalNameExactVncSource(result = null) {
    return (
      typeof targetObject.isClassicalNahuatlVncSentenceResultFrame
        === "function"
      && targetObject.isClassicalNahuatlVncSentenceResultFrame(result)
    )
      ? result.canonicalSourceFrame || result.canonicalResultFrame || null
      : result;
  }

  function getPersonalNameExactVncSlotFrame(result = null) {
    const source = getPersonalNameExactVncSource(result);
    return [
      source?.finalTypedVncSlotFrame,
      source?.targetTypedVncSlotFrame,
      source?.selectedMachineryFrame?.finalTypedVncSlotFrame,
      source?.selectedMachineryFrame?.targetTypedVncSlotFrame,
      source?.resultFrame?.finalTypedVncSlotFrame,
      source?.resultFrame?.targetTypedVncSlotFrame,
      source?.resultFrame?.selectedMachineryFrame?.finalTypedVncSlotFrame,
      source?.resultFrame?.selectedMachineryFrame?.targetTypedVncSlotFrame,
      source?.proofFrame?.conclusion?.finalTypedVncSlotFrame,
      source?.proofFrame?.conclusion?.finalBoundaryRealizationFrame
        ?.typedSlotFrame,
      source?.resultFrame?.proofFrame?.conclusion?.finalTypedVncSlotFrame,
      source?.resultFrame?.proofFrame?.conclusion
        ?.finalBoundaryRealizationFrame?.typedSlotFrame,
    ].find(frame => (
      typeof targetObject.isClassicalNahuatlVncSlotFrame === "function"
      && targetObject.isClassicalNahuatlVncSlotFrame(frame)
    )) || null;
  }

  function isPersonalNameExactNncResult(result = null) {
    return [
      "isClassicalNahuatlOrdinaryNncResult",
      "isClassicalNahuatlPronominalNncResult",
      "isClassicalNahuatlNominalConstructionResult",
      "isClassicalNahuatlDeverbalNncGrammarFrame",
      "isClassicalNahuatlRelationalResult",
      "isClassicalNahuatlAdverbialNuclearResult",
      "isClassicalNahuatlIssuedNncSentenceSurfaceFrame",
    ].some(name => (
      typeof targetObject[name] === "function"
      && targetObject[name](result) === true
    ));
  }

  function isPersonalNameExactVncResult(result = null) {
    const exactApplicationCapture = (
      typeof targetObject.captureClassicalGrammarApplicationResult
        === "function"
      && typeof targetObject.isClassicalGrammarApplicationResultCapture
        === "function"
    )
      ? targetObject.captureClassicalGrammarApplicationResult(
        result,
        "personal-name-exact-vnc-source",
      )
      : null;
    const applicationExact = Boolean(
      exactApplicationCapture
      && targetObject.isClassicalGrammarApplicationResultCapture(
        exactApplicationCapture,
        "personal-name-exact-vnc-source",
      )
      && exactApplicationCapture.canonicalResult === result
    );
    return applicationExact || [
      "isClassicalNahuatlVncApplicationIssuedResultFrame",
      "isClassicalNahuatlOrderedVoiceVncApplicationFrame",
      "isClassicalNahuatlClosureFrame",
      "isClassicalNahuatlDenominalVncResultFrame",
      "isClassicalNahuatlVncSentenceResultFrame",
    ].some(name => (
      typeof targetObject[name] === "function"
      && targetObject[name](result) === true
    ));
  }

  function getPersonalNameExactVncFeature(result = null, fields = []) {
    const source = getPersonalNameExactVncSource(result);
    const frames = [
      source,
      source?.normalizedRequest,
      source?.operationFrame,
      source?.resultFrame,
      source?.resultFrame?.normalizedRequest,
      source?.selectedMachineryFrame,
      source?.selectedMachineryFrame?.lesson11ParadigmPlan,
      source?.selectedMachineryFrame?.proofFrame?.conclusion,
      source?.resultFrame?.selectedMachineryFrame,
      source?.resultFrame?.selectedMachineryFrame?.lesson11ParadigmPlan,
      source?.resultFrame?.selectedMachineryFrame?.proofFrame?.conclusion,
      source?.proofFrame?.conclusion,
      source?.proofFrame?.conclusion?.lesson11ParadigmPlan,
      source?.resultFrame?.proofFrame?.conclusion,
      source?.resultFrame?.proofFrame?.conclusion?.lesson11ParadigmPlan,
    ].filter(Boolean);
    for (const frame of frames) {
      for (const field of fields) {
        if (
          frame[field] !== undefined
          && frame[field] !== null
          && frame[field] !== ""
        ) return key(frame[field]);
      }
    }
    return "";
  }

  function getPersonalNameExactSourceFamilyIds({
    result = null,
    sourceType = "",
    slotFrame = null,
  } = {}) {
    if (sourceType === "nnc") {
      const nominalization = key(
        result?.operationFrame?.nominalizationKind
        || result?.nominalizationKind
        || "",
      );
      const nominalizationFamily = ({
        "preterit-agentive": "preterit-agentive",
        "preterit-as-present-agentive":
          "preterit-as-present-agentive",
        "present-agentive": "present-agentive",
        "customary-present-agentive": "customary-present-agentive",
        "past-agentive": "purposive-past-agentive",
        "preterit-patientive": "passive-preterit-patientive",
      })[nominalization] || "";
      if (nominalizationFamily) return [nominalizationFamily];
      return slotFrame?.slots?.state?.arity === "vacant"
        ? ["absolutive-state-nnc"]
        : ["possessive-state-nnc"];
    }
    const voice = getPersonalNameExactVncFeature(result, [
      "selectedVoiceOperation",
      "sourceVoice",
      "selectedVoice",
      "requestedVoice",
      "voice",
    ]);
    const tense = getPersonalNameExactVncFeature(result, [
      "semanticTenseValue",
      "requestedSemanticTense",
      "tense",
    ]);
    const mood = getPersonalNameExactVncFeature(result, [
      "requestedSemanticMood",
      "semanticMood",
      "mood",
    ]);
    if (voice.includes("passive")) {
      return ["passive-preterit-patientive"];
    }
    if (voice.includes("impersonal")) {
      return ["impersonal-preterit-agentive"];
    }
    if (voice.includes("purposive") || mood === "purposive") {
      return ["purposive-past-agentive"];
    }
    if (tense === "preterit") {
      return ["preterit-agentive", "preterit-as-present-agentive"];
    }
    if (!tense) {
      return [
        "preterit-agentive",
        "preterit-as-present-agentive",
        "present-agentive",
        "customary-present-agentive",
      ];
    }
    return ["present-agentive", "customary-present-agentive"];
  }

  function buildPersonalNameExactInnerClause(
    sourceFamily = "",
    sourceType = "",
    slotFrame = null,
  ) {
    if (!slotFrame) return null;
    const subject = slotFrame.slots?.subject || {};
    const number = slotFrame.slots?.number || {};
    const predicate = slotFrame.slots?.predicate || {};
    const predicateMorphs = sourceType === "vnc"
      ? [
        ...(slotFrame.slots?.prePredicate || []).map(
          slot => slot?.carrier,
        ),
        predicate.stem,
        predicate.tns,
      ]
      : [
        ...(slotFrame.slots?.participant?.slots || []).map(
          slot => slot?.carrier,
        ),
        ...(slotFrame.slots?.state?.slots || []).map(
          slot => slot?.carrier,
        ),
        predicate.stem,
      ];
    return buildPersonalNameInnerClauseFrame({
      sourceFamily,
      subjectPrefix: subject.pers1,
      subjectConnector: subject.pers2,
      predicateMorphs,
      numberPrefix: number.num1,
      numberSuffix: number.num2,
      subjectReference: "independent-of-outer",
    });
  }

  function resolvePersonalNameNncExactSource(request = {}) {
    const canonicalSourceResult = request?.canonicalSourceResult || null;
    const rawField = getPersonalNameExactRawSourceField(request);
    let blockReason = "";
    let sourceType = "";
    let sourceUnitKind = "";
    let slotFrame = null;
    if (!hasPersonalNameExactSourceResultField(request)) {
      blockReason = "canonical-source-result-required";
    } else if (rawField) {
      blockReason =
        "canonical-source-result-and-raw-source-are-mutually-exclusive";
    } else if (isPersonalNameExactNncResult(canonicalSourceResult)) {
      sourceType = "nnc";
      sourceUnitKind = (
        typeof targetObject.isClassicalNahuatlIssuedNncSentenceSurfaceFrame
          === "function"
        && targetObject.isClassicalNahuatlIssuedNncSentenceSurfaceFrame(
          canonicalSourceResult,
        )
      ) ? "clause-result" : "nnc-result";
      slotFrame = getPersonalNameExactNncSlotFrame(canonicalSourceResult);
    } else if (isPersonalNameExactVncResult(canonicalSourceResult)) {
      sourceType = "vnc";
      sourceUnitKind = (
        typeof targetObject.isClassicalNahuatlVncSentenceResultFrame
          === "function"
        && targetObject.isClassicalNahuatlVncSentenceResultFrame(
          canonicalSourceResult,
        )
      ) ? "clause-result" : "vnc-result";
      slotFrame = getPersonalNameExactVncSlotFrame(canonicalSourceResult);
    } else {
      blockReason = "exact-owner-issued-vnc-nnc-or-clause-result-required";
    }
    if (!blockReason && !slotFrame) {
      blockReason = "exact-source-result-typed-nuclear-slots-unavailable";
    }
    const compatibleSourceFamilyIds = !blockReason
      ? getPersonalNameExactSourceFamilyIds({
        result: canonicalSourceResult,
        sourceType,
        slotFrame,
      })
      : [];
    const selectedSourceFamily = key(request?.sourceFamily);
    if (
      !blockReason
      && selectedSourceFamily
      && !compatibleSourceFamilyIds.includes(selectedSourceFamily)
    ) {
      blockReason =
        "selected-personal-name-source-family-incompatible-with-exact-result";
    }
    const sourceFamily = !blockReason
      ? selectedSourceFamily
        || (compatibleSourceFamilyIds.length === 1
          ? compatibleSourceFamilyIds[0]
          : "")
      : "";
    const innerClauseFrame = sourceFamily
      ? buildPersonalNameExactInnerClause(
        sourceFamily,
        sourceType,
        slotFrame,
      )
      : null;
    const sourceFrame = innerClauseFrame
      ? buildPersonalNameNncSourceFrame({
        sourceFamily,
        clauses: [innerClauseFrame],
        modificationAmbiguity:
          request.modificationAmbiguity || "unambiguous",
        referentKind: request.referentKind || "person",
      })
      : null;
    if (!blockReason && sourceFamily && !sourceFrame) {
      blockReason =
        "exact-source-result-cannot-fill-selected-personal-name-family";
    }
    const requiredChoiceIds = !blockReason ? [
      ...(!sourceFamily ? ["source-family"] : []),
      ...(!normalizeOuterSubject(request.outerSubject)
        ? ["outer-subject"]
        : []),
    ] : [];
    const frame = freeze({
      kind: "classical-nahuatl-personal-name-exact-source-resolution",
      version: VERSION,
      authorizationStatus: blockReason ? "blocked" : "authorized",
      blockReason,
      readinessStatus: blockReason
        ? "blocked"
        : requiredChoiceIds.length
          ? "needs-choices"
          : "ready",
      canonicalSourceResult: blockReason
        && !canonicalSourceResult?.authorizationStatus
        ? null
        : canonicalSourceResult,
      canonicalTypedSlotFrame: blockReason ? null : slotFrame,
      sourceType,
      sourceUnitKind,
      compatibleSourceFamilyIds,
      selectedSourceFamily: sourceFamily,
      requiredChoiceIds,
      innerClauseFrame: blockReason ? null : innerClauseFrame,
      sourceFrame: blockReason ? null : sourceFrame,
      exactSourceResultIdentityPreserved: !blockReason,
      callerSuppliedSourceStringsAccepted: false,
      typedFrameAuthority: true,
      callerSuppliedFormulaAuthority: false,
      callerSuppliedSurfaceAuthority: false,
    });
    issuedExactSourceResolutions.add(frame);
    return frame;
  }

  function isPersonalNameNncExactSourceResolution(frame = null) {
    return Boolean(
      issuedExactSourceResolutions.has(frame)
      && frame?.kind
        === "classical-nahuatl-personal-name-exact-source-resolution"
      && ["authorized", "blocked"].includes(frame.authorizationStatus)
      && frame.typedFrameAuthority === true
      && frame.callerSuppliedFormulaAuthority === false
      && frame.callerSuppliedSurfaceAuthority === false
      && (
        frame.authorizationStatus === "blocked"
          ? Boolean(frame.blockReason)
          : frame.exactSourceResultIdentityPreserved === true
            && Boolean(frame.canonicalSourceResult)
            && Boolean(frame.canonicalTypedSlotFrame)
            && (
              frame.selectedSourceFamily
                ? isPersonalNameNncSourceFrame(frame.sourceFrame)
                  && isPersonalNameInnerClauseFrame(frame.innerClauseFrame)
                : frame.sourceFrame === null
                  && frame.innerClauseFrame === null
            )
      )
    );
  }

  function buildPersonalNameNncOperationFrame(
    sourceFrame = null,
    selections = {},
  ) {
    if (!issuedSources.has(sourceFrame)) return null;
    const allowedFields = new Set(["affectiveScope", "affectiveMatrix"]);
    if (
      !selections
      || typeof selections !== "object"
      || Array.isArray(selections)
      || Object.keys(selections).some(field => !allowedFields.has(field))
    ) return null;
    const affectiveScope = normalizePersonalNameNncEnum(
      selections.affectiveScope || "none",
      ["none", "inner-source", "outer-name", "general-use-agentive"],
      "",
    );
    const affectiveMatrix = normalizePersonalNameNncEnum(
      selections.affectiveMatrix || "none",
      ["none", "tzin", "tz", "ton"],
      "",
    );
    if (
      !affectiveScope
      || !affectiveMatrix
      || ((affectiveScope === "none") !== (affectiveMatrix === "none"))
      || (
        affectiveScope === "general-use-agentive"
        && ![
          "preterit-agentive",
          "preterit-as-present-agentive",
        ].includes(sourceFrame.sourceFamily)
      )
      || (
        affectiveScope === "inner-source"
        && ![
          "absolutive-state-nnc",
          "absolutive-state-truncated-inner-number",
          "possessive-state-nnc",
        ].includes(sourceFrame.sourceFamily)
      )
    ) return null;
    const outerAffectiveZeroClauseIndexes = affectiveScope === "outer-name"
      ? (
        [
          "absolutive-state-nnc",
          "absolutive-state-truncated-inner-number",
        ].includes(sourceFrame.sourceFamily)
          ? [0]
          : sourceFrame.sourceFamily === "adjectival-modification"
            ? [sourceFrame.clauses.length - 1]
            : []
      )
      : [];
    const frame = freeze({
      kind: "classical-nahuatl-personal-name-operation-frame",
      version: VERSION,
      operationId: "downgrade-complete-statement-to-personal-name-predicate",
      sourceFrame,
      sourceFamily: sourceFrame.sourceFamily,
      affectiveScope,
      affectiveMatrix,
      innerNumberAdjustment:
        outerAffectiveZeroClauseIndexes.length
          ? "outer-affective-forced-zero"
          : "none",
      innerNumberAdjustmentClauseIndexes:
        freeze(outerAffectiveZeroClauseIndexes),
      gcdStages: GCD_STAGES,
      typedFrameAuthority: true,
      callerSuppliedFormulaAuthority: false,
      callerSuppliedSurfaceAuthority: false,
    });
    issuedOperations.add(frame);
    return frame;
  }

  function makeBlockedPersonalNameResult(blockReason = "") {
    return freeze({
      kind: "classical-nahuatl-personal-name-result",
      version: VERSION,
      authorizationStatus: "blocked",
      blockReason,
      formulaRealization: "",
      surfaceRealization: "",
      formulaProjection: null,
      writtenProjection: null,
      formulaDerivedFromWritten: false,
      writtenDerivedFromFormula: false,
      typedFrameAuthority: true,
      callerSuppliedFormulaAuthority: false,
      callerSuppliedSurfaceAuthority: false,
    });
  }

  function buildPersonalNameFormulaProjection(
    operationFrame,
    subject,
    formulaSubject,
  ) {
    const source = operationFrame.sourceFrame;
    const outerMatrix = operationFrame.affectiveScope === "outer-name"
      ? `+${operationFrame.affectiveMatrix}`
      : "";
    const projectClause = (clause, clauseIndex) => {
      const slots = clause.slots;
      const predicateMorphs =
        operationFrame.affectiveScope === "general-use-agentive"
        ? [...slots.predicate.morphs, "cā", operationFrame.affectiveMatrix]
        : operationFrame.affectiveScope === "inner-source"
          ? [...slots.predicate.morphs, operationFrame.affectiveMatrix]
        : slots.predicate.morphs;
      const number = operationFrame.affectiveScope === "general-use-agentive"
        || operationFrame.innerNumberAdjustmentClauseIndexes.includes(
          clauseIndex,
        )
        ? { prefix: "Ø", suffix: "Ø" }
        : slots.innerNumber;
      const innerFormula = [
        slots.innerSubject.prefix,
        slots.innerSubject.connector,
        ...predicateMorphs,
        number.prefix,
        number.suffix,
      ].join("-");
      return freeze({
        innerFormula,
        result:
          `#${formulaSubject[0]}-${formulaSubject[1]}(${innerFormula}${outerMatrix})Ø-Ø#`,
      });
    };
    const clauseProjections = source.clauses.map(projectClause);
    const coordinateFormulas = source.sourceUnitKind === "conjunction"
      ? clauseProjections.map(projection => projection.result)
      : [
        `#${formulaSubject[0]}-${formulaSubject[1]}(${
          clauseProjections.map(projection => projection.innerFormula).join("+")
        }${outerMatrix})Ø-Ø#`,
      ];
    return freeze({
      kind: "classical-nahuatl-personal-name-formula-projection",
      version: VERSION,
      sourceKind: "typed-personal-name-slots",
      outerSubject: subject,
      clauseProjections,
      coordinateFormulas,
      result: coordinateFormulas.join(" "),
      derivedFromWrittenProjection: false,
    });
  }

  function buildPersonalNameWrittenProjection(operationFrame, subject) {
    const source = operationFrame.sourceFrame;
    const outerMatrix = operationFrame.affectiveScope === "outer-name"
      ? realizeClassicalMorph(operationFrame.affectiveMatrix)
      : "";
    const projectClause = (clause, clauseIndex) => {
      const slots = clause.slots;
      const predicateMorphs =
        operationFrame.affectiveScope === "general-use-agentive"
        ? [...slots.predicate.morphs, "cā", operationFrame.affectiveMatrix]
        : operationFrame.affectiveScope === "inner-source"
          ? [...slots.predicate.morphs, operationFrame.affectiveMatrix]
        : slots.predicate.morphs;
      const number = operationFrame.affectiveScope === "general-use-agentive"
        || operationFrame.innerNumberAdjustmentClauseIndexes.includes(
          clauseIndex,
        )
        ? { prefix: "Ø", suffix: "Ø" }
        : slots.innerNumber;
      return freeze({
        result: clauseSurfaceFromSlots({
          subjectPrefix: slots.innerSubject.prefix,
          subjectConnector: slots.innerSubject.connector,
          predicateMorphs,
          numberPrefix: number.prefix,
          numberSuffix: number.suffix,
        }),
      });
    };
    const clauseProjections = source.clauses.map(projectClause);
    const coordinateSurfaces = source.sourceUnitKind === "conjunction"
      ? clauseProjections.map(projection => (
        `${outerSubjectSurface(subject, projection.result)}${
          projection.result
        }${outerMatrix}`
      ))
      : [(() => {
        const innerSurface = clauseProjections
          .map(projection => projection.result)
          .join("");
        return `${outerSubjectSurface(subject, innerSurface)}${
          innerSurface
        }${outerMatrix}`;
      })()];
    return freeze({
      kind: "classical-nahuatl-personal-name-written-projection",
      version: VERSION,
      sourceKind: "typed-personal-name-slots",
      outerSubject: subject,
      clauseProjections,
      coordinateSurfaces,
      result: coordinateSurfaces.join(
        source.sourceUnitKind === "conjunction" ? " " : "",
      ),
      derivedFromFormulaProjection: false,
    });
  }

  function realizePersonalNameNncCoordinate(
    operationFrame = null,
    outerSubject = "",
    exactSourceResolution = null,
  ) {
    const subject = normalizeOuterSubject(outerSubject);
    if (!issuedOperations.has(operationFrame) || !subject) {
      return makeBlockedPersonalNameResult(
        !subject ? "outer-subject-required" : "issued-operation-required",
      );
    }
    const source = operationFrame.sourceFrame;
    const formulaSubject = outerSubjectFormula(subject);
    const formulaProjection =
      buildPersonalNameFormulaProjection(
        operationFrame,
        subject,
        formulaSubject,
      );
    const writtenProjection =
      buildPersonalNameWrittenProjection(operationFrame, subject);
    const coordinateParts = freeze(
      formulaProjection.coordinateFormulas.map((formula, index) => freeze({
        formula,
        surface: writtenProjection.coordinateSurfaces[index] || "",
      })),
    );
    const result = freeze({
      kind: "classical-nahuatl-personal-name-result",
      version: VERSION,
      authorizationStatus: "authorized",
      blockReason: "",
      operationId: operationFrame.operationId,
      sourceFamily: source.sourceFamily,
      sourceUnitKind: source.sourceUnitKind,
      affectiveScope: operationFrame.affectiveScope,
      affectiveMatrix: operationFrame.affectiveMatrix,
      innerNumberAdjustment: operationFrame.innerNumberAdjustment,
      innerNumberAdjustmentClauseIndexes:
        operationFrame.innerNumberAdjustmentClauseIndexes,
      outerSubject: subject,
      outerNumberDyad: FIXED_OUTER_NUMBER_DYAD,
      innerSubjectBarrier: true,
      quotedPredicate: true,
      formulaRealization: formulaProjection.result,
      surfaceRealization: writtenProjection.result,
      formulaProjection,
      writtenProjection,
      formulaDerivedFromWritten: false,
      writtenDerivedFromFormula: false,
      coordinateParts,
      sourceInputMode: exactSourceResolution
        ? "exact-owner-issued-vnc-nnc-or-clause-result"
        : "typed-personal-name-source-frame",
      exactSourceResolution,
      canonicalSourceResult:
        exactSourceResolution?.canonicalSourceResult || null,
      canonicalTypedSlotFrame:
        exactSourceResolution?.canonicalTypedSlotFrame || null,
      exactSourceResultIdentityPreserved: Boolean(exactSourceResolution),
      typedSlotFrame: freeze({
        outerSubject: { person: subject, formulaPrefix: formulaSubject[0], connector: formulaSubject[1] },
        downgradedSource: source,
        grammarOperation: operationFrame,
        outerNumber: FIXED_OUTER_NUMBER_DYAD,
      }),
      leastCommonMultiple: buildPersonalNameSelectedLcmProjection({
        "affective-scope": {
          selectedValue: operationFrame.affectiveScope,
          ownerSourcePath: "typedSlotFrame.grammarOperation.affectiveScope",
        },
        "affective-matrix": {
          selectedValue: operationFrame.affectiveMatrix,
          ownerSourcePath: "typedSlotFrame.grammarOperation.affectiveMatrix",
        },
        "outer-subject": {
          selectedValue: subject,
          ownerSourcePath: "typedSlotFrame.outerSubject.person",
        },
        "outer-number": {
          selectedValue:
            FIXED_OUTER_NUMBER_DYAD.prefix === "Ø"
            && FIXED_OUTER_NUMBER_DYAD.suffix === "Ø"
              ? "zero-zero"
              : "",
          ownerSourcePath: "typedSlotFrame.outerNumber",
        },
        "translation-register": {
          selectedValue:
            "strict-called-quoted-clause",
          ownerSourcePath: "quotedPredicate",
        },
        "conjunction-analysis": {
          selectedValue: source.sourceUnitKind === "conjunction"
            ? "two-tier-conjoined-name-unit"
            : "",
          ownerSourcePath: "typedSlotFrame.downgradedSource.sourceUnitKind",
        },
      }),
      typedFrameAuthority: true,
      callerSuppliedFormulaAuthority: false,
      callerSuppliedSurfaceAuthority: false,
    });
    issuedResults.add(result);
    return result;
  }

  function isPersonalNameNncResult(frame = null) {
    const exactSourceIdentityValid = frame?.sourceInputMode
      !== "exact-owner-issued-vnc-nnc-or-clause-result"
      || Boolean(
        isPersonalNameNncExactSourceResolution(
          frame.exactSourceResolution,
        )
        && frame.exactSourceResolution.authorizationStatus === "authorized"
        && frame.exactSourceResolution.sourceFrame
          === frame.typedSlotFrame?.downgradedSource
        && frame.canonicalSourceResult
          === frame.exactSourceResolution.canonicalSourceResult
        && frame.canonicalTypedSlotFrame
          === frame.exactSourceResolution.canonicalTypedSlotFrame
        && frame.exactSourceResultIdentityPreserved === true
      );
    return Boolean(
      issuedResults.has(frame)
      && frame?.kind === "classical-nahuatl-personal-name-result"
      && frame.authorizationStatus === "authorized"
      && hasValidPersonalNameSelectedLcmProjection(frame)
      && exactSourceIdentityValid
    );
  }

  function evaluatePersonalNameNnc(request = {}) {
    const exactSourceRequested = hasPersonalNameExactSourceResultField(
      request,
    );
    const exactSourceResolution = exactSourceRequested
      ? resolvePersonalNameNncExactSource(request)
      : null;
    const allowedRequest = {
      sourceFrame: exactSourceRequested
        ? exactSourceResolution?.sourceFrame
        : request?.sourceFrame,
      ...(exactSourceRequested ? {
        canonicalSourceResult: request?.canonicalSourceResult,
        sourceFamily: request?.sourceFamily,
        modificationAmbiguity: request?.modificationAmbiguity,
        referentKind: request?.referentKind,
      } : {}),
      outerSubject: request?.outerSubject,
      affectiveScope: request?.affectiveScope,
      affectiveMatrix: request?.affectiveMatrix,
      outputKind: request?.outputKind,
    };
    const extras = Object.fromEntries(Object.entries(request || {}).filter(([field]) => !Object.hasOwn(allowedRequest, field)));
    const hostilePath = findHostileAuthorityPath(extras);
    const unsupportedField = Object.keys(extras)[0] || "";
    if (hostilePath || unsupportedField) {
      return makeBlockedPersonalNameResult(
        hostilePath
          ? `caller-authority-rejected:${hostilePath}`
          : `unsupported-request-field:request.${unsupportedField}`,
      );
    }
    if (
      exactSourceResolution
      && exactSourceResolution.authorizationStatus !== "authorized"
    ) {
      return makeBlockedPersonalNameResult(
        exactSourceResolution.blockReason,
      );
    }
    if (
      exactSourceResolution
      && exactSourceResolution.requiredChoiceIds.includes("source-family")
    ) {
      return makeBlockedPersonalNameResult(
        "personal-name-exact-source-choice-required:source-family",
      );
    }
    const operation = buildPersonalNameNncOperationFrame(
      allowedRequest.sourceFrame,
      {
        affectiveScope: allowedRequest.affectiveScope,
        affectiveMatrix: allowedRequest.affectiveMatrix,
      },
    );
    return realizePersonalNameNncCoordinate(
      operation,
      allowedRequest.outerSubject,
      exactSourceResolution,
    );
  }

  function preparePersonalNameNncParadigmPlan(request = {}) {
    const sourceFrame = request?.sourceFrame || null;
    const affectiveScope = request?.affectiveScope;
    const affectiveMatrix = request?.affectiveMatrix;
    const extras = Object.fromEntries(
      Object.entries(request || {}).filter(
        ([field]) => ![
          "sourceFrame",
          "affectiveScope",
          "affectiveMatrix",
        ].includes(field),
      ),
    );
    const hostilePath = findHostileAuthorityPath(extras, "request");
    const unsupportedField = Object.keys(extras)[0] || "";
    const operationFrame = buildPersonalNameNncOperationFrame(
      sourceFrame,
      { affectiveScope, affectiveMatrix },
    );
    const plan = freeze({
      kind: "classical-nahuatl-personal-name-paradigm-plan",
      version: VERSION,
      authorizationStatus:
        operationFrame && !hostilePath && !unsupportedField
          ? "authorized"
          : "blocked",
      blockReason: hostilePath
        ? `caller-authority-rejected:${hostilePath}`
        : unsupportedField
          ? `unsupported-request-field:request.${unsupportedField}`
        : operationFrame
          ? ""
          : "issued-source-required",
      operationFrame:
        hostilePath || unsupportedField ? null : operationFrame,
      coordinates: freeze(["1sg", "2sg", "3sg"].map(outerSubject => ({ outerSubject }))),
      preparedOnce: true,
      typedFrameAuthority: true,
    });
    issuedPlans.add(plan);
    return plan;
  }
  function isPersonalNameNncParadigmPlan(plan = null) {
    return Boolean(
      issuedPlans.has(plan)
      && plan?.kind
        === "classical-nahuatl-personal-name-paradigm-plan"
      && plan.authorizationStatus === "authorized"
      && issuedOperations.has(plan.operationFrame)
      && issuedSources.has(plan.operationFrame.sourceFrame)
      && Array.isArray(plan.coordinates)
      && plan.coordinates.length === 3
      && plan.coordinates.every(
        coordinate => Boolean(normalizeOuterSubject(coordinate?.outerSubject)),
      )
      && plan.preparedOnce === true
      && plan.typedFrameAuthority === true
      && Object.isFrozen(plan)
    );
  }
  function projectPersonalNameNncParadigmCoordinates(plan = null, coordinates = []) {
    if (!issuedPlans.has(plan) || plan.authorizationStatus !== "authorized") return freeze([]);
    const requested = Array.isArray(coordinates) && coordinates.length ? coordinates : plan.coordinates;
    return freeze(requested.map(coordinate => {
      const extras = Object.fromEntries(
        Object.entries(coordinate || {}).filter(
          ([field]) => field !== "outerSubject",
        ),
      );
      const hostilePath = findHostileAuthorityPath(extras, "coordinate");
      const unsupportedField = Object.keys(extras)[0] || "";
      return hostilePath || unsupportedField
        ? makeBlockedPersonalNameResult(
          hostilePath
            ? `caller-authority-rejected:${hostilePath}`
            : `unsupported-coordinate-field:coordinate.${unsupportedField}`,
        )
        : realizePersonalNameNncCoordinate(
          plan.operationFrame,
          coordinate?.outerSubject,
        );
    }));
  }

  function evaluatePersonalNameSentenceOperation({ personalNameResult = null, operation = "", contextUnits = [], locativeMatrix = "", ordinaryNncSubject = "" } = {}) {
    const spec = SENTENCE_OPERATION_BY_ID.get(key(operation));
    if (!issuedResults.has(personalNameResult) || personalNameResult.authorizationStatus !== "authorized" || !spec) {
      return freeze({ kind: "classical-nahuatl-personal-name-sentence-operation", version: VERSION, authorizationStatus: "blocked", blockReason: !spec ? "sentence-operation-unrecognized" : "issued-personal-name-result-required", typedFrameAuthority: true, callerSuppliedFormulaAuthority: false, callerSuppliedSurfaceAuthority: false });
    }
    const sourceFrame = personalNameResult.typedSlotFrame.downgradedSource;
    if (spec.id.startsWith("god-name-") && sourceFrame.referentKind !== "god") {
      return freeze({ kind: "classical-nahuatl-personal-name-sentence-operation", version: VERSION, authorizationStatus: "blocked", blockReason: "god-name-source-required", typedFrameAuthority: true, callerSuppliedFormulaAuthority: false, callerSuppliedSurfaceAuthority: false });
    }
    if (spec.id === "god-name-to-place-name-embed" && !normalizeMorph(locativeMatrix)) {
      return freeze({ kind: "classical-nahuatl-personal-name-sentence-operation", version: VERSION, authorizationStatus: "blocked", blockReason: "locative-matrix-required", typedFrameAuthority: true, callerSuppliedFormulaAuthority: false, callerSuppliedSurfaceAuthority: false });
    }
    const sentenceResult = freeze({
      kind: "classical-nahuatl-personal-name-sentence-operation",
      version: VERSION,
      authorizationStatus: "authorized",
      blockReason: "",
      operation: spec.id,
      section: spec.section,
      outputKind: spec.outputKind,
      personalNameResult,
      contextUnits: freeze(Array.isArray(contextUnits) ? contextUnits : []),
      locativeMatrix: normalizeMorph(locativeMatrix),
      ordinaryNncSubject: key(ordinaryNncSubject),
      permitsPluralOrdinaryNncSubject: spec.id === "god-name-to-normal-nnc",
      personalNameShellRetained: !spec.id.startsWith("god-name-"),
      leastCommonMultiple: buildPersonalNameSelectedLcmProjection({
        "adjunctor-scope": {
          selectedValue: ({
            "adjunctor-before-each-conjunct": "each-conjunct",
            "adjunctor-before-whole-unit": "whole-unit",
            "adjunctor-absent": "absent",
          })[spec.id] || "",
          ownerSourcePath: "operation",
        },
        "god-name-reranking": {
          selectedValue: spec.id === "god-name-to-normal-nnc"
            ? "normal-nnc-with-plural-rights"
            : spec.id === "god-name-to-place-name-embed"
              ? "place-name-embed"
              : "personal-name",
          ownerSourcePath: spec.id.startsWith("god-name-")
            ? "operation"
            : "personalNameShellRetained",
        },
      }),
      typedFrameAuthority: true,
      callerSuppliedFormulaAuthority: false,
      callerSuppliedSurfaceAuthority: false,
    });
    issuedSentenceResults.add(sentenceResult);
    return sentenceResult;
  }

  function isPersonalNameSentenceOperation(frame = null) {
    return Boolean(
      issuedSentenceResults.has(frame)
      && frame?.kind === "classical-nahuatl-personal-name-sentence-operation"
      && frame.authorizationStatus === "authorized"
      && hasValidPersonalNameSelectedLcmProjection(frame)
    );
  }

  function getPersonalNameNncOperationFrameMismatch({ sourceFrame = null, operationFrame = null } = {}) {
    if (!issuedSources.has(sourceFrame)) return "source-frame-required";
    if (!issuedOperations.has(operationFrame)) return "operation-frame-required";
    if (operationFrame.sourceFrame !== sourceFrame) return "contradictory-source-frame";
    return "";
  }
  function getPersonalNameNncBlockedDiagnostic(input = {}) {
    const mismatch = getPersonalNameNncOperationFrameMismatch(input);
    return mismatch ? `personal-name-nnc-${mismatch}` : "";
  }
  function hasPersonalNameNncAndrewsSourceGate({ sourceFrame = null } = {}) {
    return issuedSources.has(sourceFrame);
  }
  function getPersonalNameNncAntiConflationRules() {
    return Array.from(PERSONAL_NAME_NNC_ANTI_CONFLATION_RULES);
  }
  function getPersonalNameNncStructuralQuestions() {
    return [
      "Which complete typed clause or clause unit is downgraded?",
      "Which source family and relation own that unit?",
      "Which subject, predicate, possessor, reflexive, and number slots remain inside?",
      "Which independent singular outer subject is selected?",
      "Does an affective matrix embed the inner source or the whole outer name predicate?",
      "Is the requested sentence operation still a personal name, or a licensed reranking?",
    ].map((asks, index) => ({ field: `lesson56-structural-question-${index + 1}`, asks }));
  }
  function getPersonalNameNncSubsectionInventory() {
    return [
      { range: "56.1", role: "two-tier-gcd", sourceKinds: ["complete-statement", "downgraded-nounstem", "outer-absolutive-nnc"] },
      { range: "56.2", role: "single-clause-lcm", sourceKinds: SOURCE_FAMILY_SPECS.filter(spec => spec.unitKind === "single-clause").map(spec => spec.id) },
      { range: "56.3", role: "adjunction-and-calendar-lcm", sourceKinds: SOURCE_FAMILY_SPECS.filter(spec => ["adjunction", "calendar"].includes(spec.unitKind)).map(spec => spec.id) },
      { range: "56.4", role: "conjunction-lcm", sourceKinds: SOURCE_FAMILY_SPECS.filter(spec => spec.unitKind === "conjunction").map(spec => spec.id) },
      { range: "56.5", role: "sentence-and-reranking-lcm", sourceKinds: SENTENCE_OPERATION_SPECS.map(spec => spec.id) },
    ].map(entry => ({ ...entry, blockers: [] }));
  }
  function getPersonalNameNncGcd() {
    return { id: "classical-nahuatl-personal-name-nnc-personal-name-nnc-gcd", version: VERSION, stages: Array.from(GCD_STAGES), fixedOuterNumber: "Ø-Ø", innerSubjectBarrier: true };
  }
  function getPersonalNameNncLcm() {
    return {
      id: "classical-nahuatl-personal-name-nnc-personal-name-nnc-lcm",
      version: VERSION,
      sourceFamilies: SOURCE_FAMILY_SPECS.map(spec => ({ ...spec })),
      sentenceOperations: SENTENCE_OPERATION_SPECS.map(spec => ({ ...spec })),
      axes: LCM_AXES.map(axis => ({ ...axis, values: Array.from(axis.values) })),
    };
  }
  function attachPersonalNameNncGrammarContract(record = null, options = {}) {
    if (typeof targetObject.attachGrammarMetadataContract !== "function") return record;
    return targetObject.attachGrammarMetadataContract(
      record,
      { enumerable: false, unitKind: "personal-name-nnc", routeFamily: "personal-name-nnc", ...options },
      grammarFrameOwnerCapability,
    );
  }
  function buildPersonalNameNncBoundaryMetadata() {
    return attachPersonalNameNncGrammarContract({
      kind: "personal-name-nnc-boundary",
      version: VERSION,
      lesson: 56,
      status: "complete-typed-grammar",
      structuralSource: "ANDREWS_TRANSCRIPTION_CANVAS.md Lesson 56 only",
      canvasRefs: Array.from(LESSON56_PERSONAL_NAME_NNC_CANVAS_REFS),
      targetAuthority: "typed Lesson 56 source structure plus Classical boundary realization",
      generationAllowed: true,
      generationGate: "issued-source-clause+issued-source-unit+issued-operation",
      gcd: getPersonalNameNncGcd(),
      lcm: getPersonalNameNncLcm(),
      boundaries: {
        hasPersonalNameNncGeneration: true,
        hasCalendarNameGeneration: true,
        hasAdjunctionGeneration: true,
        hasConjunctionGeneration: true,
        hasSentenceOperationAst: true,
        hasGodNameReranking: true,
        hasPlaceNameEmbedRouting: true,
        hasStaticNameData: false,
        treatsCapitalizationAsNameEvidence: false,
        treatsTranslationsAsNameEvidence: false,
      },
      antiConflationRules: getPersonalNameNncAntiConflationRules(),
    }, { routeStage: "typed-lesson56-boundary" });
  }
  const api = {
    PERSONAL_NAME_NNC_BOUNDARY_VERSION: VERSION,
    PERSONAL_NAME_NNC_KIND,
    PERSONAL_NAME_NNC_FALSE_POSITIVE_SOURCE,
    PERSONAL_NAME_NNC_ANTI_CONFLATION_RULES,
    PERSONAL_NAME_NNC_STRUCTURAL_QUESTIONS: freeze(getPersonalNameNncStructuralQuestions()),
    LESSON56_PERSONAL_NAME_NNC_CANVAS_REFS,
    LESSON56_PERSONAL_NAME_NNC_VALIDATION_REFS,
    LESSON56_PERSONAL_NAME_NNC_SOURCE_FAMILIES: SOURCE_FAMILY_SPECS,
    LESSON56_PERSONAL_NAME_NNC_SENTENCE_OPERATIONS: SENTENCE_OPERATION_SPECS,
    LESSON56_PERSONAL_NAME_NNC_LCM_AXES: LCM_AXES,
    normalizePersonalNameNncEnum,
    normalizePersonalNameNncKind,
    normalizePersonalNameNncFalsePositiveSource,
    getPersonalNameNncSourceFamilyStructure,
    getPersonalNameNncInnerClauseFunctionalSlotDefaults,
    hasPersonalNameNncAndrewsSourceGate,
    buildPersonalNameInnerClauseFrame,
    isPersonalNameInnerClauseFrame,
    buildPersonalNameNncSourceFrame,
    isPersonalNameNncSourceFrame,
    resolvePersonalNameNncExactSource,
    isPersonalNameNncExactSourceResolution,
    buildPersonalNameNncOperationFrame,
    getPersonalNameNncOperationFrameMismatch,
    getPersonalNameNncBlockedDiagnostic,
    evaluatePersonalNameNnc,
    isPersonalNameNncResult,
    preparePersonalNameNncParadigmPlan,
    isPersonalNameNncParadigmPlan,
    projectPersonalNameNncParadigmCoordinates,
    evaluatePersonalNameSentenceOperation,
    isPersonalNameSentenceOperation,
    getPersonalNameNncAntiConflationRules,
    getPersonalNameNncStructuralQuestions,
    getPersonalNameNncSubsectionInventory,
    getPersonalNameNncGcd,
    getPersonalNameNncLcm,
    buildPersonalNameNncBoundaryMetadata,
  };
  return api;
}

export function installPersonalNameNncGlobals(targetObject = globalThis, installationContext = null) {
  const api = createPersonalNameNncApi(targetObject, installationContext);
  Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
  return api;
}
