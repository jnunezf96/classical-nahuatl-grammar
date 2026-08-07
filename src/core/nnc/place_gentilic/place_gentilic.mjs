// Canonical modern ESM module.

export function createPlaceGentilicNncApi(targetObject = globalThis, installationContext = null) {
    const grammarFrameOwnerCapability = installationContext?.grammarFrameOwnerCapability || null;
    const PLACE_GENTILIC_NNC_BOUNDARY_VERSION = 1;
    const issuedPlaceGentilicNncFrames = new WeakSet();
    const issuedPlaceGentilicNncParadigmPlans = new WeakSet();
    const issuedPlaceGentilicNncParadigmCoordinates = new WeakSet();
    const PLACE_GENTILIC_NNC_KIND = Object.freeze({
      placeName: "place-name",
      gentilic: "gentilic",
      gentilicCollective: "gentilic-collective",
      professionPlaceAssociation: "profession-place-association",
      calendarName: "calendar-name",
      unknown: "unknown"
    });
    const PLACE_GENTILIC_NNC_FALSE_POSITIVE_SOURCE = Object.freeze({
      ordinaryNncFixture: "ordinary-nnc-fixture",
      ordinaryNncOpenStem: "ordinary-nnc-open-stem",
      relationalNncBoundary: "relational-nnc-boundary",
      locativeTemporalNominal: "locative-temporal-nominal",
      placeTranslation: "place-translation",
      gentilicTranslation: "gentilic-translation",
      professionTranslation: "profession-translation",
      routeLabel: "route-label",
      csvVerbSurface: "csv-verb-surface",
      calendarRoadmapText: "calendar-roadmap-text",
      roadmapText: "roadmap-text",
      unknown: "unknown"
    });
    const PLACE_GENTILIC_NNC_USAGE = Object.freeze({
      ordinary: "ordinary-nnc",
      adverbial: "adverbial-nnc",
      adjectival: "adjectival-nnc",
      unknown: "unknown"
    });
    const PLACE_GENTILIC_NNC_PLACE_GROUP = Object.freeze({
      nGroup: "n-group",
      panGroup: "pan-group",
      coCGroup: "co-c-group",
      tlahGroup: "tlah-group",
      tzalanGroup: "tzalan-group",
      titlanGroup: "ti-tlan-group",
      chanGroup: "chan-group",
      unknown: "unknown"
    });
    const PLACE_GENTILIC_NNC_GENTILIC_FORMATION = Object.freeze({
      nonlocativeAbsolutive: "nonlocative-absolutive",
      twoClauseConcatenate: "two-clause-concatenate",
      preteritAgentivePlace: "preterit-agentive-place",
      caMatrixFullPlace: "ca-matrix-full-place",
      caMatrixPanEca: "ca-matrix-pan-e-ca",
      caMatrixCanMeca: "ca-matrix-ca-n-m-e-ca",
      caMatrixSilentReplacement: "ca-matrix-silent-replacement",
      caMatrixManTlanTeca: "ca-matrix-ma-n-tla-n-te-ca",
      collectivityYo: "collectivity-yo",
      professionExtension: "profession-extension",
      incorporation: "incorporation",
      unknown: "unknown"
    });
    const PLACE_GENTILIC_NNC_SUBJECT_REFERENCE = Object.freeze({
      uniqueSocial: "unique-socially-designated-place",
      contextChosen: "context-chosen-locative-relation",
      unknown: "unknown"
    });
    const PLACE_GENTILIC_NNC_STATE = Object.freeze({
      absolutive: "absolutive",
      possessive: "possessive",
      unknown: "unknown"
    });
    const PLACE_GENTILIC_NNC_GCD = Object.freeze({
      identityId: "typed-place-gentilic-source+licensed-formation+boundary-realization+nnc-agreement+finite-result",
      stageOrder: Object.freeze([
        "source-analysis",
        "licensed-formation",
        "boundary-realization",
        "nnc-agreement",
        "finite-result"
      ]),
      formulaTemplate: "#pers1-pers2+state(STEM)num1-num2#",
      placeNameSubjectReference: "unique-socially-designated-place",
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      lessonMetadataAuthority: false
    });
    const PLACE_GENTILIC_NNC_LCM_AXIS_IDS = Object.freeze([
      "place/unique-reference",
      "place/function-use",
      "place/topographical-boundary",
      "place/translation-uncertainty",
      "place/n-imperfect-active",
      "place/n-imperfect-nonactive",
      "place/n-yan",
      "place/n-man",
      "place/n-tlan-vicinity",
      "place/n-can",
      "place/n-preterit-agentive",
      "place/n-action-noun",
      "place/pan-integrated",
      "place/pan-connective-t",
      "place/pan-watercourse",
      "place/co",
      "place/c",
      "place/co-affective-embed",
      "place/co-place-affective",
      "place/co-affective-ambiguity",
      "place/co-compound-matrix",
      "place/tlah",
      "place/tlah-pan",
      "place/tzalan",
      "place/ti-tlan",
      "place/chan-supplementation",
      "gentilic/nonlocative-absolutive",
      "gentilic/two-clause-concatenate",
      "gentilic/preterit-agentive-owner",
      "gentilic/preterit-agentive-other",
      "gentilic/ca-full-place",
      "gentilic/ca-pan-eca",
      "gentilic/ca-can-meca",
      "gentilic/ca-co-c-silent",
      "gentilic/ca-ownerhood-n-silent",
      "gentilic/ca-man-tlan-teca",
      "gentilic/alternative-route",
      "gentilic/defective-spelling-ambiguity",
      "extension/incorporation",
      "extension/adjectival-use",
      "extension/gentilic-collectivity",
      "extension/collectivity-possessive",
      "extension/profession",
      "extension/title"
    ]);
    const PLACE_GENTILIC_NNC_LCM = Object.freeze({
      kind: "place-gentilic-nnc-semantic-lcm",
      version: 1,
      identityId: "complete-place-gentilic-distinction-space",
      axes: Object.freeze(PLACE_GENTILIC_NNC_LCM_AXIS_IDS.map(axisId => Object.freeze({
        axisId,
        ownerCapability: "evaluatePlaceGentilicNnc",
        typedFrameAuthority: true
      }))),
      axisCount: PLACE_GENTILIC_NNC_LCM_AXIS_IDS.length,
      sourceDocument: "ANDREWS_TRANSCRIPTION_CANVAS.md",
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      lessonMetadataAuthority: false
    });
    const PLACE_GENTILIC_NNC_HOSTILE_AUTHORITY_KEYS = Object.freeze([
      "answer",
      "canvasAnswer",
      "derivedStem",
      "displayFormula",
      "displayText",
      "formula",
      "formulaArtifact",
      "generationAllowed",
      "lesson",
      "lessonMetadata",
      "result",
      "resultSurface",
      "surface",
      "surfaceForm",
      "targetStem",
      "translation",
      "word"
    ]);
    const PLACE_GENTILIC_NNC_PLACE_FORMATIONS = Object.freeze([
      "n-imperfect-active",
      "n-imperfect-nonactive",
      "n-yan",
      "n-man",
      "n-tlan-vicinity",
      "n-can",
      "n-preterit-agentive",
      "n-action-noun",
      "pan-integrated",
      "pan-connective-t",
      "co",
      "c",
      "co-affective-embed",
      "co-place-affective",
      "co-compound-nahuac",
      "co-compound-ixco",
      "co-compound-ticpac",
      "tlah",
      "tlah-pan",
      "tzalan",
      "ti-tlan",
      "chan-supplementation",
      "gentilic-incorporated-place",
      "gentilic-affective-co"
    ]);
    const PLACE_GENTILIC_NNC_GENTILIC_FORMATIONS = Object.freeze([
      "nonlocative-absolutive",
      "two-clause-concatenate",
      "preterit-agentive-owner",
      "preterit-agentive-other",
      "ca-full-place",
      "ca-pan-eca",
      "ca-can-meca",
      "ca-co-c-silent",
      "ca-ownerhood-n-silent",
      "ca-man-tlan-teca"
    ]);
    const PLACE_GENTILIC_NNC_PROFESSION_LEXICON = Object.freeze({
      "toltec-craftsman": Object.freeze({ sourcePlace: "Tōllān", stem: "tōl-tē-ca", reading: "craftsman" }),
      "amantec-feather-worker": Object.freeze({ sourcePlace: "Āmantlān", stem: "ā-man-tē-ca", reading: "feather-worker" }),
      "pochtec-merchant": Object.freeze({ sourcePlace: "Pōchtlān", stem: "pō-ch-tē-ca", reading: "merchant" }),
      "oztomec-vanguard-merchant": Object.freeze({ sourcePlace: "Ōztōmān", stem: "ōztō-mē-ca", reading: "vanguard-merchant" })
    });
    const PLACE_GENTILIC_NNC_TITLE_LEXICON = Object.freeze({
      tlacochcalcatl: Object.freeze({ stem: "tlacō-ch-cal-ca", sourcePlace: "tlacōchcalco", reading: "commanding-general" }),
      tlacateccatl: Object.freeze({ stem: "tlāca-tēc-ca", sourcePlace: "tlācatēcco", reading: "general" }),
      "tlillan-calqui": Object.freeze({
        stem: "",
        evidenceSurface: "Tlīllān-calqui",
        sourcePlace: "Tlīllān",
        reading: "council-official",
        generationStatus: "read-only-canvas-evidence",
        blockReason: "canvas-title-has-no-typed-nnc-formula"
      }),
      tocuiltecatl: Object.freeze({ stem: "tocuil-tē-ca", sourcePlace: "Tocuillan", reading: "council-member" }),
      atempanecatl: Object.freeze({ stem: "ā-tēm-pan-ē-ca", sourcePlace: "Ātempan", reading: "council-member" }),
      tezcacoacatl: Object.freeze({ stem: "tez-ca-cōā-ca", sourcePlace: "Tezcacoac", reading: "council-member" })
    });
    const PLACE_GENTILIC_NNC_ANTI_CONFLATION_RULES = Object.freeze(["place-name/gentilic NNC boundary metadata is not generation", "ordinary NNC fixtures are not place-name or gentilic fixture evidence", "open-stem ordinary NNC previews are not place-name or gentilic data", "locative-temporal nominal outputs are not place-name NNC evidence", "relational NNC boundary metadata is not place-name or gentilic evidence", "place, profession, or gentilic translations are not form evidence", "Canvas Lesson 48 categories authorize typed grammar structure, never caller-supplied target strings"]);
    const PLACE_GENTILIC_NNC_STRUCTURAL_QUESTIONS = Object.freeze([Object.freeze({
      field: "placeNameSource",
      asks: "Which Canvas Lesson 48 place-name formation is licensed by the typed source?"
    }), Object.freeze({
      field: "gentilicSource",
      asks: "Which Canvas Lesson 48 gentilic formation is licensed by the typed source?"
    }), Object.freeze({
      field: "placeGentilicKind",
      asks: "Is the candidate a place-name, gentilic, gentilic collective, profession/place association, calendar-name, or unknown?"
    }), Object.freeze({
      field: "associatedPlace",
      asks: "What place is associated with the gentilic, collective, profession, or name?"
    }), Object.freeze({
      field: "collectivity",
      asks: "Is collectivity licensed by Canvas structure or only by a translation/category label?"
    }), Object.freeze({
      field: "evidenceSource",
      asks: "Which Canvas source gate or structured route licenses place/gentilic status?"
    })]);
    function normalizePlaceGentilicNncEnum(value = "", allowedValues = [], fallback = "unknown") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      return allowedValues.includes(normalized) ? normalized : fallback;
    }
    function normalizePlaceGentilicNncKind(value = "") {
      return normalizePlaceGentilicNncEnum(value, Object.values(PLACE_GENTILIC_NNC_KIND), PLACE_GENTILIC_NNC_KIND.unknown);
    }
    function normalizePlaceGentilicNncFalsePositiveSource(value = "") {
      return normalizePlaceGentilicNncEnum(value, Object.values(PLACE_GENTILIC_NNC_FALSE_POSITIVE_SOURCE), PLACE_GENTILIC_NNC_FALSE_POSITIVE_SOURCE.unknown);
    }
    function normalizePlaceGentilicNncCandidateSurface(value = "") {
      const raw = String(value || "").trim();
      if (!raw || /[A-Z_]/.test(raw)) {
        return "";
      }
      const source = raw.replace(/\[[^\]]+\]/g, "").replace(/[Øø]/g, "").replace(/\b0\b/g, "").replace(/[#+(){}\s.-]/g, "").trim();
      if (!source || /[A-Z_]/.test(source)) {
        return "";
      }
      return source;
    }
    function hasPlaceGentilicNncCanvasSourceGate({
      sourceGate = "",
      structuredSource = false
    } = {}) {
      return structuredSource === true || Boolean(String(sourceGate || "").trim());
    }
    function buildPlaceGentilicNncSourceFrame({
      candidate = "",
      placeNameSource = "",
      gentilicSource = "",
      placeGentilicKind = "",
      associatedPlace = "",
      collectivity = "",
      evidenceSource = "",
      sourceGate = "",
      sourceKind = "",
      targetFormulaSlots = null,
      targetSegmentFrames = []
    } = {}) {
      const normalizedKind = normalizePlaceGentilicNncKind(placeGentilicKind);
      if (normalizedKind === PLACE_GENTILIC_NNC_KIND.unknown) {
        return null;
      }
      return Object.freeze({
        kind: "place-gentilic-nnc-source-frame",
        version: PLACE_GENTILIC_NNC_BOUNDARY_VERSION,
        routeFamily: "place-gentilic-nnc",
        placeGentilicKind: normalizedKind,
        candidate: String(candidate || ""),
        placeNameSource: String(placeNameSource || ""),
        gentilicSource: String(gentilicSource || ""),
        associatedPlace: String(associatedPlace || ""),
        collectivity: String(collectivity || ""),
        evidenceSource: String(evidenceSource || ""),
        sourceGate: String(sourceGate || ""),
        sourceKind: String(sourceKind || ""),
        suppliedTargetFormulaSlotsIgnored: targetFormulaSlots !== null,
        suppliedTargetSegmentFramesIgnored: Array.isArray(targetSegmentFrames) && targetSegmentFrames.length > 0,
        targetFormulaSlots: null,
        targetSegmentFrames: Object.freeze([]),
        targetSurface: "",
        authority: "ANDREWS_TRANSCRIPTION_CANVAS.md Lesson 48 diagnostic source frame",
        generationAllowed: false,
        retiredBy: "canonical-place-gentilic-evaluator",
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false
      });
    }
    function buildPlaceGentilicNncOperationFrame(sourceFrame = null) {
      if (!sourceFrame || sourceFrame.kind !== "place-gentilic-nnc-source-frame") {
        return null;
      }
      return Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: "retired-place-gentilic-candidate-realization",
        routeFamily: "place-gentilic-nnc",
        routeStage: "diagnostic-only",
        operationApplied: "none",
        sourceFrameKind: sourceFrame.kind,
        sourcePlaceGentilicKind: sourceFrame.placeGentilicKind,
        sourcePlaceName: sourceFrame.placeNameSource,
        sourceGentilic: sourceFrame.gentilicSource,
        sourceAssociatedPlace: sourceFrame.associatedPlace,
        targetFormulaSlots: null,
        targetSegmentFrames: Object.freeze([]),
        targetSurface: "",
        authorizationStatus: "blocked",
        blockReason: "canonical-place-gentilic-evaluator-required",
        generationAllowed: false,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false
      });
    }
    function getPlaceGentilicNncOperationFrameMismatch({
      sourceFrame = null,
      operationFrame = null
    } = {}) {
      if (!sourceFrame || sourceFrame.kind !== "place-gentilic-nnc-source-frame") {
        return "source-frame-required";
      }
      return "canonical-place-gentilic-evaluator-required";
    }
    function getPlaceGentilicNncBlockedDiagnostic({
      sourceFrame = null,
      operationFrame = null
    } = {}) {
      const mismatch = getPlaceGentilicNncOperationFrameMismatch({
        sourceFrame,
        operationFrame
      });
      return mismatch ? `place-gentilic-nnc-${mismatch}` : "";
    }
    function normalizePlaceGentilicNncUsage(value = "") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      const aliases = {
        ordinary: PLACE_GENTILIC_NNC_USAGE.ordinary,
        adverbial: PLACE_GENTILIC_NNC_USAGE.adverbial,
        adjectival: PLACE_GENTILIC_NNC_USAGE.adjectival
      };
      return aliases[normalized] || normalizePlaceGentilicNncEnum(normalized, Object.values(PLACE_GENTILIC_NNC_USAGE), PLACE_GENTILIC_NNC_USAGE.unknown);
    }
    function normalizePlaceGentilicNncPlaceGroup(value = "") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      const aliases = {
        n: PLACE_GENTILIC_NNC_PLACE_GROUP.nGroup,
        "n": PLACE_GENTILIC_NNC_PLACE_GROUP.nGroup,
        "n-tli": PLACE_GENTILIC_NNC_PLACE_GROUP.nGroup,
        pan: PLACE_GENTILIC_NNC_PLACE_GROUP.panGroup,
        "co": PLACE_GENTILIC_NNC_PLACE_GROUP.coCGroup,
        c: PLACE_GENTILIC_NNC_PLACE_GROUP.coCGroup,
        "co-c": PLACE_GENTILIC_NNC_PLACE_GROUP.coCGroup,
        tlah: PLACE_GENTILIC_NNC_PLACE_GROUP.tlahGroup,
        tzalan: PLACE_GENTILIC_NNC_PLACE_GROUP.tzalanGroup,
        titlan: PLACE_GENTILIC_NNC_PLACE_GROUP.titlanGroup,
        "ti-tlan": PLACE_GENTILIC_NNC_PLACE_GROUP.titlanGroup,
        chan: PLACE_GENTILIC_NNC_PLACE_GROUP.chanGroup
      };
      return aliases[normalized] || normalizePlaceGentilicNncEnum(normalized, Object.values(PLACE_GENTILIC_NNC_PLACE_GROUP), PLACE_GENTILIC_NNC_PLACE_GROUP.unknown);
    }
    function normalizePlaceGentilicNncGentilicFormation(value = "") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      const aliases = {
        "tribal": PLACE_GENTILIC_NNC_GENTILIC_FORMATION.nonlocativeAbsolutive,
        "nonlocative": PLACE_GENTILIC_NNC_GENTILIC_FORMATION.nonlocativeAbsolutive,
        "two-clause": PLACE_GENTILIC_NNC_GENTILIC_FORMATION.twoClauseConcatenate,
        concatenate: PLACE_GENTILIC_NNC_GENTILIC_FORMATION.twoClauseConcatenate,
        "preterit-agentive": PLACE_GENTILIC_NNC_GENTILIC_FORMATION.preteritAgentivePlace,
        "full-place": PLACE_GENTILIC_NNC_GENTILIC_FORMATION.caMatrixFullPlace,
        "pan-e-ca": PLACE_GENTILIC_NNC_GENTILIC_FORMATION.caMatrixPanEca,
        "ca-n-m-e-ca": PLACE_GENTILIC_NNC_GENTILIC_FORMATION.caMatrixCanMeca,
        "silent-replacement": PLACE_GENTILIC_NNC_GENTILIC_FORMATION.caMatrixSilentReplacement,
        "te-ca": PLACE_GENTILIC_NNC_GENTILIC_FORMATION.caMatrixManTlanTeca,
        collectivity: PLACE_GENTILIC_NNC_GENTILIC_FORMATION.collectivityYo,
        profession: PLACE_GENTILIC_NNC_GENTILIC_FORMATION.professionExtension,
        incorporation: PLACE_GENTILIC_NNC_GENTILIC_FORMATION.incorporation
      };
      return aliases[normalized] || normalizePlaceGentilicNncEnum(normalized, Object.values(PLACE_GENTILIC_NNC_GENTILIC_FORMATION), PLACE_GENTILIC_NNC_GENTILIC_FORMATION.unknown);
    }
    function normalizePlaceGentilicNncSubjectReference(value = "") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      const aliases = {
        unique: PLACE_GENTILIC_NNC_SUBJECT_REFERENCE.uniqueSocial,
        "social": PLACE_GENTILIC_NNC_SUBJECT_REFERENCE.uniqueSocial,
        "socially-designated": PLACE_GENTILIC_NNC_SUBJECT_REFERENCE.uniqueSocial,
        contextual: PLACE_GENTILIC_NNC_SUBJECT_REFERENCE.contextChosen,
        "context-chosen": PLACE_GENTILIC_NNC_SUBJECT_REFERENCE.contextChosen,
        locative: PLACE_GENTILIC_NNC_SUBJECT_REFERENCE.contextChosen
      };
      return aliases[normalized] || normalizePlaceGentilicNncEnum(normalized, Object.values(PLACE_GENTILIC_NNC_SUBJECT_REFERENCE), PLACE_GENTILIC_NNC_SUBJECT_REFERENCE.unknown);
    }
    function normalizePlaceGentilicNncState(value = "") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      const aliases = {
        absolute: PLACE_GENTILIC_NNC_STATE.absolutive,
        absolutive: PLACE_GENTILIC_NNC_STATE.absolutive,
        absolutivo: PLACE_GENTILIC_NNC_STATE.absolutive,
        possessive: PLACE_GENTILIC_NNC_STATE.possessive,
        possessed: PLACE_GENTILIC_NNC_STATE.possessive,
        posesivo: PLACE_GENTILIC_NNC_STATE.possessive
      };
      return aliases[normalized] || normalizePlaceGentilicNncEnum(normalized, Object.values(PLACE_GENTILIC_NNC_STATE), PLACE_GENTILIC_NNC_STATE.unknown);
    }
    function getPlaceGentilicNncPlaceMatrix(placeGroup = "") {
      const normalized = normalizePlaceGentilicNncPlaceGroup(placeGroup);
      const matrixByGroup = {
        [PLACE_GENTILIC_NNC_PLACE_GROUP.nGroup]: "-n",
        [PLACE_GENTILIC_NNC_PLACE_GROUP.panGroup]: "pan",
        [PLACE_GENTILIC_NNC_PLACE_GROUP.coCGroup]: "co/c",
        [PLACE_GENTILIC_NNC_PLACE_GROUP.tlahGroup]: "tlah",
        [PLACE_GENTILIC_NNC_PLACE_GROUP.tzalanGroup]: "tzalan",
        [PLACE_GENTILIC_NNC_PLACE_GROUP.titlanGroup]: "ti-tlan",
        [PLACE_GENTILIC_NNC_PLACE_GROUP.chanGroup]: "chan"
      };
      return matrixByGroup[normalized] || "";
    }
    function getPlaceGentilicNncAntiConflationRules() {
      return Array.from(PLACE_GENTILIC_NNC_ANTI_CONFLATION_RULES);
    }
    function getPlaceGentilicNncStructuralQuestions() {
      return PLACE_GENTILIC_NNC_STRUCTURAL_QUESTIONS.map(question => ({
        ...question
      }));
    }
    function attachPlaceGentilicNncGrammarContract(record = null, options = {}) {
      if (typeof targetObject.attachGrammarMetadataContract !== "function") {
        return record;
      }
      return targetObject.attachGrammarMetadataContract(record, {
        enumerable: false,
        unitKind: "place-gentilic-nnc",
        routeFamily: "place-gentilic-nnc",
        ...options
      }, grammarFrameOwnerCapability);
    }
    const LESSON48_PLACE_GENTILIC_VALIDATION_REFS = Object.freeze(["src/tests/nnc_place_gentilic.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    const LESSON48_PLACE_GENTILIC_CANVAS_REFS = Object.freeze(["Canvas Lesson 48.1", "Canvas Lesson 48.2", "Canvas Lesson 48.3", "Canvas Lesson 48.4", "Canvas Lesson 48.5", "Canvas Lesson 48.6", "Canvas Lesson 48.7", "Canvas Lesson 48.8", "Canvas Lesson 48.9", "Canvas Lesson 48.10", "Canvas Lesson 48.11", "Canvas Lesson 48.12", "Canvas Lesson 48.13"]);
    const LESSON48_PLACE_NAME_FRAME = Object.freeze({
      kind: "lesson-48-place-name-frame",
      sourceSection: "Andrews 48.1",
      placeNamesAreAdverbialNncs: true,
      adverbializedSubjectPronounRequired: true,
      uniqueSociallyDesignatedReference: true,
      contextualLocativeContrastRequired: true,
      functions: Object.freeze(["ordinary-nnc", "adverbial-nnc", "adjectival-nnc"]),
      placeReferents: Object.freeze(["settlement", "region", "province", "nation-or-state", "district-or-quarter", "building", "temple", "socially-significant-site"]),
      topographicalFeatureIsNotPlaceNameByDefault: true,
      topographicalFeatureMayEmbedInPlaceName: true,
      translationPrepositionsAreContextual: true,
      manyTranslationsConjecturalOrOpaque: true
    });
    const LESSON48_PLACE_GROUPS_FRAME = Object.freeze({
      kind: "lesson-48-place-groups-frame",
      sourceSection: "Andrews 48.2-48.8",
      groups: Object.freeze([Object.freeze({
        group: "n-group",
        sourceSection: "Andrews 48.2",
        matrixes: Object.freeze(["(-n)-tli", "(-ya-n)-tli", "(-ma-n)-0", "(-tla-n)-0", "(ca-n)-0"]),
        formationTypes: Object.freeze(["nominalized-imperfect-predicate-active-or-nonactive", "ya-n-perfective-core", "ma-n-place-of-area", "tla-n-place-in-vicinity", "ca-n-non-vnc-nounstem", "preterit-agentive-general-use", "action-noun-with-distant-past-ca"]),
        tlaNIsDistinctFromRelationalTlan: true,
        mictlanCanHaveNonadverbializedSubjectInChristianUsage: true
      }), Object.freeze({
        group: "pan-group",
        sourceSection: "Andrews 48.3",
        basedOnRelationalSection: "47.3.3",
        integratedStructure: true,
        connectiveTStructure: true,
        watercourseNamesCommon: true,
        crossingOrFordingMeaningPossible: true,
        bodyPartIxpanPossible: true
      }), Object.freeze({
        group: "co-c-group",
        sourceSection: "Andrews 48.4",
        basedOnRelationalSections: Object.freeze(["46.7", "46.8", "47.2.2"]),
        coAndCVariants: true,
        affectiveEmbedPossible: true,
        placeNamePlusAffectiveCanBeAmbiguousAfterSilentReplacement: true,
        historicalInformationMayDecideAffectiveAnalysis: true,
        soCalledCompoundMatrixSubtypeIncluded: true
      }), Object.freeze({
        group: "tlah-group",
        sourceSection: "Andrews 48.5",
        basedOnRelationalSections: Object.freeze(["46.6", "47.3.3.a"]),
        normalNounstemEmbed: true,
        panRelationalEmbedPossible: true
      }), Object.freeze({
        group: "tzalan-group",
        sourceSection: "Andrews 48.6",
        basedOnRelationalSection: "47.1.1"
      }), Object.freeze({
        group: "ti-tlan-group",
        sourceSection: "Andrews 48.7",
        basedOnRelationalSection: "47.3.2.c"
      }), Object.freeze({
        group: "chan-group",
        sourceSection: "Andrews 48.8",
        possessorSupplementationStructure: true,
        tamoanchanMeaningUncertain: true
      })])
    });
    const LESSON48_GENTILIC_FRAME = Object.freeze({
      kind: "lesson-48-gentilic-frame",
      sourceSection: "Andrews 48.9",
      gentilicSense: "human being intimately associated with a named place",
      principalFormationCount: 4,
      formations: Object.freeze([Object.freeze({
        id: "nonlocative-absolutive",
        sourceSection: "Andrews 48.9.1",
        state: "absolutive",
        limitedToTribalMemberNames: true
      }), Object.freeze({
        id: "two-clause-concatenate",
        sourceSection: "Andrews 48.9.2",
        structure: "place-name adjectival modifier plus absolutive head NNC",
        headNounstems: Object.freeze(["tlaca", "cal-ca", "cal-0-qui", "chan-eh-0"]),
        exceptionsPossible: true
      }), Object.freeze({
        id: "preterit-agentive-place",
        sourceSection: "Andrews 48.9.3",
        placeNameDerivedFromGentilic: true,
        ownerhoodAndNonOwnerhoodSubtypes: true
      }), Object.freeze({
        id: "ca-matrix-from-place-name",
        sourceSection: "Andrews 48.9.4",
        matrixStem: "(-ca)-tl",
        groupOneFullPlaceNameStem: true,
        panAddsEBeforeCa: true,
        canChangesNToMeca: true,
        groupTwoSilentReplacement: true,
        coCMatrixSilentReplacement: true,
        ownerhoodNMatrixSilentReplacementAndCaLoss: true,
        manTlanChangeToTeca: true
      })]),
      notesFrame: Object.freeze({
        alternativeFormationsPossible: true,
        defectiveTraditionalSpellingCanHideTlanVsTlah: true,
        gentilicNounstemCanResolveSomePlaceNameAmbiguity: true
      })
    });
    const LESSON48_EXTENSIONS_FRAME = Object.freeze({
      kind: "lesson-48-extensions-frame",
      sourceSection: "Andrews 48.10-48.13",
      incorporationFrame: Object.freeze({
        sourceSection: "Andrews 48.10",
        gentilicNounstemCanIncorporateIntoCompoundStem: true,
        gentilicNounstemCanEmbedInPlaceNameNounstem: true,
        associatedEntityVersusGentilicAnalysisRequiresCare: true,
        affectiveGentilicPlaceNamesPossible: true
      }),
      adjectivalUseFrame: Object.freeze({
        sourceSection: "Andrews 48.11",
        gentilicNncMayBeUsedAdjectivally: true
      }),
      collectivityFrame: Object.freeze({
        sourceSection: "Andrews 48.12",
        matrixStem: "(-yo)-tl",
        meansCollectiveBodyOrCharacteristicOfPeople: true,
        identicalFormCanBePertinencyWhenBaseIsNotPlaceName: true,
        possessiveNum1Variants: Object.freeze(["zero", "uh"]),
        adjectivalUseAllowed: true
      }),
      professionFrame: Object.freeze({
        sourceSection: "Andrews 48.13",
        famedPlaceGentilicCanExtendToProfession: true,
        states: Object.freeze(["absolutive", "possessive"]),
        pertinencyYoPossible: true,
        highRankAdministrativeOrMilitaryTitlesPossible: true
      })
    });
    const LESSON48_PLACE_GENTILIC_SUBSECTION_INVENTORY = Object.freeze([Object.freeze({
      id: "lesson48-place-name-overview",
      andrewsSection: "48.1",
      category: "place-name-nnc",
      directiveEs: "Los nombres de lugar son CNN adverbializadas con referencia social unica, no simples etiquetas locativas.",
      engineSurface: "diagnostic place-name frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson48-place-name-functions",
      andrewsSection: "48.1 ordinary-adverbial-adjectival",
      category: "place-name-functions",
      directiveEs: "Un nombre de lugar puede funcionar como CNN ordinaria, adverbial o adjetival sin cambiar a preposicion.",
      engineSurface: "diagnostic place-name frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson48-topographical-warning",
      andrewsSection: "48.1 note",
      category: "topographical-feature-warning",
      directiveEs: "Un nombre topografico no es automaticamente nombre de lugar; puede servir como embed de un nombre de lugar.",
      engineSurface: "diagnostic place-name frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson48-n-group",
      andrewsSection: "48.2",
      category: "n-place-name-group",
      directiveEs: "El grupo n hereda formaciones de 46.3-46.5 y agrega matrices ma-n y tla-n propias de nombres de lugar.",
      engineSurface: "diagnostic place-group frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson48-n-imperfect",
      andrewsSection: "48.2.1",
      category: "n-imperfect-place-name",
      directiveEs: "N puede embeder predicado imperfecto nominalizado de fuente activa o no activa.",
      engineSurface: "diagnostic place-group frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson48-n-yan",
      andrewsSection: "48.2.2",
      category: "yan-place-name",
      directiveEs: "La matriz ya-n de 46.5 puede formar nombres de lugar.",
      engineSurface: "diagnostic place-group frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson48-n-man",
      andrewsSection: "48.2.3",
      category: "man-place-area",
      directiveEs: "Ma-n significa lugar del area de y se usa solo en nombres de lugar.",
      engineSurface: "diagnostic place-group frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson48-n-tlan",
      andrewsSection: "48.2.4",
      category: "tlan-place-vicinity",
      directiveEs: "Tla-n de nombres de lugar significa lugar en la vecindad de y se distingue de tlan relacional.",
      engineSurface: "diagnostic place-group frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson48-n-can",
      andrewsSection: "48.2.5",
      category: "can-place-name",
      directiveEs: "Ca-n puede formar nombres de lugar con embed nominal que no viene de VNC nominalizada.",
      engineSurface: "diagnostic place-group frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson48-n-preterit-agentive",
      andrewsSection: "48.2.6",
      category: "preterit-agentive-place-name",
      directiveEs: "N puede embeder forma de uso general de un agentivo preterito, incluso de posesion.",
      engineSurface: "diagnostic place-group frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson48-n-action-noun",
      andrewsSection: "48.2.7",
      category: "action-noun-place-name",
      directiveEs: "N puede embeder nombre de accion; ca ante n es morfo de pasado remoto.",
      engineSurface: "diagnostic place-group frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson48-pan-group",
      andrewsSection: "48.3",
      category: "pan-place-name-group",
      directiveEs: "Pan forma nombres de lugar integrados o con conectivo t; con cursos de agua puede sugerir cruce o vado.",
      engineSurface: "diagnostic place-group frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson48-co-c-group",
      andrewsSection: "48.4",
      category: "co-c-place-name-group",
      directiveEs: "Co/c forma nombres de lugar; los afectivos y la variante silenciosa pueden crear ambiguedad que requiere historia o evidencia.",
      engineSurface: "diagnostic place-group frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson48-tlah-group",
      andrewsSection: "48.5",
      category: "tlah-place-name-group",
      directiveEs: "Tlah forma nombres de lugar con embed normal o con pan relacional.",
      engineSurface: "diagnostic place-group frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson48-tzalan-group",
      andrewsSection: "48.6",
      category: "tzalan-place-name-group",
      directiveEs: "Tzalan forma nombres de lugar de en medio o entre.",
      engineSurface: "diagnostic place-group frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson48-ti-tlan-group",
      andrewsSection: "48.7",
      category: "ti-tlan-place-name-group",
      directiveEs: "Ti-tlan forma nombres de lugar basados en la estructura relacional con conectivo t.",
      engineSurface: "diagnostic place-group frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson48-chan-group",
      andrewsSection: "48.8",
      category: "chan-place-name-group",
      directiveEs: "Chan forma nombres de lugar mediante suplementacion de poseedor; Tamoanchan queda incierto.",
      engineSurface: "diagnostic place-group frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson48-gentilic-overview",
      andrewsSection: "48.9",
      category: "gentilic-nnc",
      directiveEs: "Los gentilicios nombran humanos asociados intimamente con un lugar nombrado y tienen cuatro vias principales.",
      engineSurface: "diagnostic gentilic frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson48-gentilic-nonlocative",
      andrewsSection: "48.9.1",
      category: "nonlocative-absolutive-gentilic",
      directiveEs: "La formacion absolutiva no locativa se limita a nombres tribales.",
      engineSurface: "diagnostic gentilic frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson48-gentilic-two-clause",
      andrewsSection: "48.9.2",
      category: "two-clause-gentilic",
      directiveEs: "Una unidad gentilicia puede ser biclausal: nombre de lugar como modificador adjetival mas cabeza absolutiva.",
      engineSurface: "diagnostic gentilic frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson48-gentilic-preterit-agentive",
      andrewsSection: "48.9.3",
      category: "preterit-agentive-gentilic-place",
      directiveEs: "Algunos nombres de lugar derivan de un gentilicio agentivo preterito de posesion o no posesion.",
      engineSurface: "diagnostic gentilic frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson48-gentilic-ca-matrix",
      andrewsSection: "48.9.4",
      category: "ca-matrix-gentilic",
      directiveEs: "Los demas nombres de lugar pueden embederse en ca-tl con forma completa, e-ca, m-e-ca, variante silenciosa o te-ca.",
      engineSurface: "diagnostic gentilic frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson48-gentilic-spelling-ambiguity",
      andrewsSection: "48.9 notes",
      category: "gentilic-spelling-ambiguity",
      directiveEs: "La ortografia tradicional defectiva puede ocultar tla-n versus tlah; el gentilicio puede resolver parte de la ambiguedad.",
      engineSurface: "diagnostic gentilic frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson48-gentilic-incorporation",
      andrewsSection: "48.10",
      category: "gentilic-incorporation",
      directiveEs: "Un tronco gentilicio puede incorporarse en compuestos o embederse en nombres de lugar; debe distinguirse de entidad asociada.",
      engineSurface: "diagnostic extensions frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson48-gentilic-adjectival",
      andrewsSection: "48.11",
      category: "gentilic-adjectival-use",
      directiveEs: "Las CNN gentilicias pueden usarse adjetivalmente.",
      engineSurface: "diagnostic extensions frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson48-gentilic-collectivity",
      andrewsSection: "48.12",
      category: "gentilic-collectivity-yo",
      directiveEs: "Yo-tl crea colectividad gentilicia o caracteristica del pueblo; las formas posesivas permiten num1 cero o uh.",
      engineSurface: "diagnostic extensions frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    }), Object.freeze({
      id: "lesson48-profession-titles",
      andrewsSection: "48.13",
      category: "profession-title-extension",
      directiveEs: "Algunos gentilicios se lexicalizan como profesion o titulo; admiten absolutivo o posesivo y pueden formar pertinencia con yo-tl.",
      engineSurface: "diagnostic extensions frame",
      implementationState: "partial",
      redirectAction: "source-gated"
    })]);
    function clonePlaceGentilicNncLessonRecord(record) {
      if (!record || typeof record !== "object") {
        return record;
      }
      if (Array.isArray(record)) {
        return record.map(entry => clonePlaceGentilicNncLessonRecord(entry));
      }
      return Object.fromEntries(Object.entries(record).map(([key, value]) => [key, clonePlaceGentilicNncLessonRecord(value)]));
    }
    function getPlaceGentilicSubsectionInventory() {
      return LESSON48_PLACE_GENTILIC_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        canvasRef: `ANDREWS_TRANSCRIPTION_CANVAS.md Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-canvas-complete",
        orthographyStatus: "classical-canvas-realization",
        validationRefs: Array.from(LESSON48_PLACE_GENTILIC_VALIDATION_REFS)
      }));
    }
    function buildPlaceGentilicNncBoundaryMetadata() {
      const boundary = {
        kind: "place-gentilic-nnc-boundary",
        version: PLACE_GENTILIC_NNC_BOUNDARY_VERSION,
        lesson: 48,
        status: "complete",
        structuralSource: "ANDREWS_TRANSCRIPTION_CANVAS.md Lesson 48",
        targetAuthority: "typed Canvas Lesson 48 source and formation",
        generationAllowed: true,
        confirmedExamples: [],
        structuralQuestions: getPlaceGentilicNncStructuralQuestions(),
        boundaries: {
          hasOrdinaryNncGeneration: true,
          hasRelationalNncBoundary: true,
          hasPlaceGentilicUsageFrame: true,
          hasPlaceNameNncGeneration: true,
          hasGentilicNncGeneration: true,
          hasStaticPlaceData: false,
          hasStaticGentilicData: false,
          hasConfirmedFixtureData: false,
          changesOrdinaryNncGeneration: false,
          changesRelationalNncGeneration: false,
          changesNominalizationGeneration: false,
          changesRouteBehavior: true,
          treatsPlaceTranslationsAsEvidence: false,
          treatsProfessionLabelsAsEvidence: false
        },
        antiConflationRules: getPlaceGentilicNncAntiConflationRules()
      };
      return attachPlaceGentilicNncGrammarContract(boundary, {
        routeStage: "classify-boundary",
        morphBoundaryFrame: boundary
      });
    }
    function classifyPlaceGentilicNncCandidate({
      candidate = "",
      placeNameSource = "",
      gentilicSource = "",
      placeGentilicKind = "",
      associatedPlace = "",
      collectivity = "",
      evidenceSource = "",
      sourceGate = "",
      structuredSource = false,
      falsePositiveSource = "",
      sourceKind = "",
      sourceFrame = null,
      operationFrame = null
    } = {}) {
      const normalizedKind = normalizePlaceGentilicNncKind(placeGentilicKind);
      const normalizedFalsePositive = normalizePlaceGentilicNncFalsePositiveSource(falsePositiveSource);
      const hasEvidence = Boolean(String(evidenceSource || "").trim());
      const resolvedSourceFrame = sourceFrame && typeof sourceFrame === "object" ? sourceFrame : null;
      const requiresTypedOperation = normalizedKind !== PLACE_GENTILIC_NNC_KIND.unknown && normalizedFalsePositive === PLACE_GENTILIC_NNC_FALSE_POSITIVE_SOURCE.unknown;
      const blockedDiagnostic = requiresTypedOperation ? getPlaceGentilicNncBlockedDiagnostic({
        sourceFrame: resolvedSourceFrame,
        operationFrame
      }) : "";
      const sourceSurface = "";
      const canGenerate = false;
      const targetFormulaSlots = null;
      const targetSegmentFrames = [];
      const classification = {
        kind: "place-gentilic-nnc-candidate-classification",
        version: PLACE_GENTILIC_NNC_BOUNDARY_VERSION,
        candidate: String(candidate || ""),
        placeNameSource: String(placeNameSource || ""),
        gentilicSource: String(gentilicSource || ""),
        placeGentilicKind: normalizedKind,
        associatedPlace: String(associatedPlace || ""),
        collectivity: String(collectivity || ""),
        evidenceSource: String(evidenceSource || ""),
        sourceGate: String(sourceGate || ""),
        structuredSource: structuredSource === true,
        falsePositiveSource: normalizedFalsePositive,
        sourceKind: String(sourceKind || ""),
        ...(resolvedSourceFrame ? {
          sourceFrame: resolvedSourceFrame
        } : {}),
        ...(operationFrame ? {
          operationFrame
        } : {}),
        confirmed: canGenerate,
        supported: canGenerate,
        generationAllowed: canGenerate,
        surface: canGenerate ? sourceSurface : "",
        surfaceForms: canGenerate ? [sourceSurface] : [],
        ...(canGenerate ? {
          formulaSlots: targetFormulaSlots,
          targetSegmentFrames
        } : {}),
        diagnostics: [blockedDiagnostic || (hasEvidence ? "place-gentilic-nnc-needs-validation" : "place-gentilic-nnc-source-gate-required"), normalizedKind !== PLACE_GENTILIC_NNC_KIND.unknown ? "place-gentilic-nnc-kind-recognized" : "place-gentilic-nnc-kind-unconfirmed", normalizedFalsePositive !== PLACE_GENTILIC_NNC_FALSE_POSITIVE_SOURCE.unknown ? "place-gentilic-nnc-false-positive-source" : "place-gentilic-nnc-canonical-evaluator-required"],
        boundary: buildPlaceGentilicNncBoundaryMetadata()
      };
      return attachPlaceGentilicNncGrammarContract(classification, {
        routeStage: canGenerate ? "generate-structured-place-gentilic-nnc" : "classify-boundary",
        sourceInput: classification.candidate || classification.placeNameSource || classification.gentilicSource,
        generationAllowed: canGenerate,
        supported: canGenerate,
        evidenceSource: classification.sourceGate || classification.evidenceSource,
        surfaceForms: classification.surfaceForms,
        orthographyFrame: {
          spellingAuthority: "typed Classical Canvas realization",
          noExternalSurfaceImport: true,
          orthographyStatus: "canonical-evaluator-required",
          surface: classification.surface,
          surfaceForms: classification.surfaceForms,
          sourceFrame: resolvedSourceFrame,
          operationFrame
        },
        morphBoundaryFrame: classification.boundary,
        stemFrame: {
          stemKind: "place-gentilic-source-candidate",
          sourceStem: classification.placeNameSource || classification.gentilicSource,
          sourceKind: classification.placeGentilicKind,
          sourceGate: classification.sourceGate,
          targetStem: classification.surface,
          sourceFrame: resolvedSourceFrame,
          operationFrame
        },
        nuclearClauseFrame: canGenerate ? {
          formulaFamily: "place/gentilic NNC",
          placeGentilicKind: normalizedKind,
          associatedPlace: classification.associatedPlace,
          formulaSlots: targetFormulaSlots,
          targetSegmentFrames
        } : null,
        targetContract: {
          metadataKind: "place-gentilic-nnc-candidate-classification",
          generationAllowed: canGenerate,
          consumesRenderedInput: false,
          displayStringsAuthorizeGrammar: false
        }
      });
    }
    function buildPlaceGentilicNncUsageFrame({
      candidate = "",
      placeNameSource = "",
      gentilicSource = "",
      placeGentilicKind = "",
      usage = "",
      placeGroup = "",
      gentilicFormation = "",
      subjectReference = "",
      state = "",
      associatedPlace = "",
      collectivity = "",
      headNounstem = "",
      matrixStem = "",
      embeddedStem = "",
      sourcePlaceName = "",
      evidenceSource = "",
      sourceKind = "",
      translationLabel = ""
    } = {}) {
      const normalizedKind = normalizePlaceGentilicNncKind(placeGentilicKind);
      const normalizedUsage = normalizePlaceGentilicNncUsage(usage);
      const normalizedPlaceGroup = normalizePlaceGentilicNncPlaceGroup(placeGroup);
      const normalizedFormation = normalizePlaceGentilicNncGentilicFormation(gentilicFormation);
      const normalizedState = normalizePlaceGentilicNncState(state);
      const normalizedSubjectReference = normalizePlaceGentilicNncSubjectReference(subjectReference) || PLACE_GENTILIC_NNC_SUBJECT_REFERENCE.unknown;
      const placeMatrix = String(matrixStem || getPlaceGentilicNncPlaceMatrix(normalizedPlaceGroup));
      const diagnostics = ["place-gentilic-nnc-usage-frame-non-generative"];
      let supported = true;
      if (normalizedKind === PLACE_GENTILIC_NNC_KIND.placeName && normalizedSubjectReference === PLACE_GENTILIC_NNC_SUBJECT_REFERENCE.contextChosen) {
        supported = false;
        diagnostics.push("place-name-nnc-requires-unique-social-reference");
      }
      if (normalizedKind === PLACE_GENTILIC_NNC_KIND.gentilic && normalizedFormation === PLACE_GENTILIC_NNC_GENTILIC_FORMATION.caMatrixPanEca) {
        diagnostics.push("gentilic-pan-e-ca-distinct-from-associated-entity-pan-ca");
      }
      if (normalizedKind === PLACE_GENTILIC_NNC_KIND.gentilicCollective || normalizedFormation === PLACE_GENTILIC_NNC_GENTILIC_FORMATION.collectivityYo) {
        diagnostics.push("gentilic-collectivity-yo-matrix");
      }
      if (String(translationLabel || "").trim()) {
        diagnostics.push("place-gentilic-nnc-translation-label-is-not-morphology");
      }
      const isProfession = normalizedKind === PLACE_GENTILIC_NNC_KIND.professionPlaceAssociation || normalizedFormation === PLACE_GENTILIC_NNC_GENTILIC_FORMATION.professionExtension;
      const isCollective = normalizedKind === PLACE_GENTILIC_NNC_KIND.gentilicCollective || normalizedFormation === PLACE_GENTILIC_NNC_GENTILIC_FORMATION.collectivityYo;
      const allowedStates = isProfession || isCollective ? [PLACE_GENTILIC_NNC_STATE.absolutive, PLACE_GENTILIC_NNC_STATE.possessive] : [PLACE_GENTILIC_NNC_STATE.absolutive];
      if (normalizedState !== PLACE_GENTILIC_NNC_STATE.unknown && !allowedStates.includes(normalizedState)) {
        supported = false;
        diagnostics.push("place-gentilic-nnc-state-not-allowed-for-kind");
      }
      const placeNameContract = normalizedKind === PLACE_GENTILIC_NNC_KIND.placeName ? {
        adverbializedSubjectPronoun: true,
        uniqueReferenceRequired: true,
        subjectReference: normalizedSubjectReference === PLACE_GENTILIC_NNC_SUBJECT_REFERENCE.unknown ? PLACE_GENTILIC_NNC_SUBJECT_REFERENCE.uniqueSocial : normalizedSubjectReference,
        contextualLocativeContrast: "ordinary adverbialized locative NNC has context-chosen reference",
        topographicalFeatureIsPlaceName: false,
        topographicalFeatureMayEmbedInPlaceName: true,
        functions: [PLACE_GENTILIC_NNC_USAGE.ordinary, PLACE_GENTILIC_NNC_USAGE.adverbial, PLACE_GENTILIC_NNC_USAGE.adjectival]
      } : null;
      const gentilicContract = normalizedKind === PLACE_GENTILIC_NNC_KIND.gentilic || normalizedKind === PLACE_GENTILIC_NNC_KIND.gentilicCollective || normalizedKind === PLACE_GENTILIC_NNC_KIND.professionPlaceAssociation ? {
        semanticRole: isProfession ? "profession-associated-with-place" : isCollective ? "collective-body-or-characteristic-of-people" : "human-associated-with-place",
        formation: normalizedFormation,
        headNounstem: String(headNounstem || ""),
        clauseStructure: normalizedFormation === PLACE_GENTILIC_NNC_GENTILIC_FORMATION.twoClauseConcatenate ? "place-name-adjoined-to-absolutive-head-nnc" : "",
        matrixStem: isCollective ? "yo" : normalizedFormation === PLACE_GENTILIC_NNC_GENTILIC_FORMATION.caMatrixFullPlace || normalizedFormation === PLACE_GENTILIC_NNC_GENTILIC_FORMATION.caMatrixPanEca || normalizedFormation === PLACE_GENTILIC_NNC_GENTILIC_FORMATION.caMatrixCanMeca || normalizedFormation === PLACE_GENTILIC_NNC_GENTILIC_FORMATION.caMatrixSilentReplacement || normalizedFormation === PLACE_GENTILIC_NNC_GENTILIC_FORMATION.caMatrixManTlanTeca ? "ca" : String(matrixStem || ""),
        relationToAssociatedEntity: normalizedFormation === PLACE_GENTILIC_NNC_GENTILIC_FORMATION.caMatrixPanEca ? "gentilic pan-e-ca, not associated-entity pan-ca" : "",
        possessiveNum1Variants: isCollective ? ["zero", "uh"] : [],
        adjectivalUseAllowed: isCollective
      } : null;
      const frame = {
        kind: "place-gentilic-nnc-usage-frame",
        version: PLACE_GENTILIC_NNC_BOUNDARY_VERSION,
        lesson: 48,
        structuralSource: "ANDREWS_TRANSCRIPTION_CANVAS.md Lesson 48",
        targetAuthority: "typed Canvas Lesson 48 source and canonical realization",
        candidate: String(candidate || ""),
        placeNameSource: String(placeNameSource || ""),
        gentilicSource: String(gentilicSource || ""),
        placeGentilicKind: normalizedKind,
        usage: normalizedUsage,
        placeGroup: normalizedPlaceGroup,
        placeMatrix,
        gentilicFormation: normalizedFormation,
        state: normalizedState,
        allowedStates,
        associatedPlace: String(associatedPlace || ""),
        collectivity: String(collectivity || ""),
        embeddedStem: String(embeddedStem || ""),
        sourcePlaceName: String(sourcePlaceName || ""),
        evidenceSource: String(evidenceSource || ""),
        sourceKind: String(sourceKind || ""),
        placeNameContract,
        gentilicContract,
        supported,
        generationAllowed: false,
        generationContract: {
          frameGeneratesSurface: false,
          changesSurfaceForms: false,
          newWordGenerationAllowed: false
        },
        translationWarning: {
          labelsAreMorphology: false,
          translationLabel: String(translationLabel || ""),
          warning: "place, profession, and gentilic labels are translation-only unless typed Canvas morphology is sourced"
        },
        diagnostics,
        boundary: buildPlaceGentilicNncBoundaryMetadata()
      };
      return attachPlaceGentilicNncGrammarContract(frame, {
        routeStage: "describe-usage-frame",
        sourceInput: frame.candidate || frame.placeNameSource || frame.gentilicSource,
        supported,
        morphBoundaryFrame: frame.boundary,
        stemFrame: {
          stemKind: "place-gentilic-nounstem",
          sourceStem: frame.placeNameSource || frame.gentilicSource,
          matrix: frame.placeMatrix,
          embed: frame.embeddedStem,
          sourceKind: frame.placeGentilicKind
        },
        nuclearClauseFrame: frame
      });
    }

    function normalizePlaceGentilicNncToken(value = "") {
      return String(value ?? "").normalize("NFC").trim();
    }
    function normalizePlaceGentilicNncKey(value = "") {
      return normalizePlaceGentilicNncToken(value).toLowerCase().replace(/[\s_]+/gu, "-");
    }
    function normalizePlaceGentilicNncStem(value = "") {
      const stem = normalizePlaceGentilicNncToken(value)
        .replace(/[()[\]{}#]/gu, "")
        .replace(/\s+/gu, "")
        .replace(/^-+|-+$/gu, "");
      return stem && /^[\p{L}\p{M}Ø⎕0-]+$/u.test(stem) ? stem : "";
    }
    function realizePlaceGentilicNncCarrier(value = "") {
      return normalizePlaceGentilicNncToken(value)
        .split("-")
        .filter(part => part && !["0", "Ø", "⎕"].includes(part))
        .join("");
    }
    function findPlaceGentilicNncHostileAuthorityPath(value, path = "request") {
      if (!value || typeof value !== "object") return "";
      for (const [key, item] of Object.entries(value)) {
        const nextPath = `${path}.${key}`;
        if (PLACE_GENTILIC_NNC_HOSTILE_AUTHORITY_KEYS.includes(key)
          && item !== undefined && item !== null && item !== "") {
          return nextPath;
        }
        if (item && typeof item === "object") {
          const nested = findPlaceGentilicNncHostileAuthorityPath(item, nextPath);
          if (nested) return nested;
        }
      }
      return "";
    }
    function buildPlaceGentilicNncBlockedFrame(blockReason = "", request = {}, extra = {}) {
      const frame = Object.freeze({
        kind: "classical-nahuatl-place-gentilic-nnc-frame",
        version: 1,
        constructionKind: normalizePlaceGentilicNncKey(request.constructionKind || request.placeGentilicKind),
        formation: normalizePlaceGentilicNncKey(request.formation || request.placeFormation || request.gentilicFormation),
        authorizationStatus: "blocked",
        blockReason,
        stageOrder: PLACE_GENTILIC_NNC_GCD.stageOrder,
        gcdIdentity: PLACE_GENTILIC_NNC_GCD.identityId,
        lcmIdentity: PLACE_GENTILIC_NNC_LCM.identityId,
        typedFrameAuthority: true,
        callerSuppliedAuthorityAccepted: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        lessonMetadataAuthority: false,
        formulaRealization: "",
        wordSurface: "",
        sentenceSurface: "",
        ...extra
      });
      issuedPlaceGentilicNncFrames.add(frame);
      return frame;
    }
    function normalizePlaceGentilicNncConstructionKind(value = "") {
      const key = normalizePlaceGentilicNncKey(value);
      const aliases = {
        place: "place-name",
        "place-name-nnc": "place-name",
        gentile: "gentilic",
        collective: "gentilic-collective",
        collectivity: "gentilic-collective",
        profession: "profession-place-association",
        title: "profession-place-association"
      };
      const normalized = aliases[key] || key;
      return [
        "place-name",
        "gentilic",
        "gentilic-collective",
        "profession-place-association",
        "profession-pertinency",
        "gentilic-adjectival-use"
      ].includes(normalized) ? normalized : "";
    }
    function normalizePlaceGentilicNncFormation(value = "") {
      const key = normalizePlaceGentilicNncKey(value);
      const aliases = {
        "n-imperfect": "n-imperfect-active",
        "yan": "n-yan",
        "man": "n-man",
        "tlan": "n-tlan-vicinity",
        "can": "n-can",
        "preterit-agentive": "n-preterit-agentive",
        "action-noun": "n-action-noun",
        "pan": "pan-integrated",
        "connective-t-pan": "pan-connective-t",
        "compound-nahuac": "co-compound-nahuac",
        "compound-ixco": "co-compound-ixco",
        "compound-ticpac": "co-compound-ticpac",
        "titlan": "ti-tlan",
        "chan": "chan-supplementation",
        "tribal": "nonlocative-absolutive",
        "two-clause": "two-clause-concatenate",
        "full-place": "ca-full-place",
        "pan-e-ca": "ca-pan-eca",
        "can-meca": "ca-can-meca",
        "silent-replacement": "ca-co-c-silent",
        "ownerhood-silent": "ca-ownerhood-n-silent",
        "man-tlan-teca": "ca-man-tlan-teca"
      };
      return aliases[key] || key;
    }
    function buildPlaceGentilicNncSourceAnalysis(request = {}) {
      const constructionKind = normalizePlaceGentilicNncConstructionKind(
        request.constructionKind || request.placeGentilicKind
      );
      const formation = normalizePlaceGentilicNncFormation(
        request.formation || request.placeFormation || request.gentilicFormation
      );
      const source = request.source && typeof request.source === "object" ? request.source : {};
      const embedStem = normalizePlaceGentilicNncStem(
        source.embedStem || source.sourceStem || request.embedStem || request.sourceStem
      );
      const placeStem = normalizePlaceGentilicNncStem(source.placeStem || request.placeStem);
      const gentilicStem = normalizePlaceGentilicNncStem(source.gentilicStem || request.gentilicStem);
      const matrixStem = normalizePlaceGentilicNncStem(source.matrixStem || request.matrixStem);
      const headStem = normalizePlaceGentilicNncStem(source.headStem || request.headStem);
      const sourceVoice = normalizePlaceGentilicNncKey(source.sourceVoice || request.sourceVoice);
      const subjectReference = normalizePlaceGentilicNncSubjectReference(
        request.subjectReference || source.subjectReference || (
          constructionKind === "place-name" ? "unique" : ""
        )
      );
      const usage = normalizePlaceGentilicNncUsage(request.usage || "ordinary");
      const analysisKind = normalizePlaceGentilicNncKey(request.analysisKind || source.analysisKind);
      const placeMatrix = normalizePlaceGentilicNncKey(source.placeMatrix || request.placeMatrix);
      const state = normalizePlaceGentilicNncState(request.state || "absolutive");
      const authorized = Boolean(
        constructionKind
        && (
          constructionKind === "place-name"
            ? PLACE_GENTILIC_NNC_PLACE_FORMATIONS.includes(formation)
              && subjectReference === PLACE_GENTILIC_NNC_SUBJECT_REFERENCE.uniqueSocial
            : constructionKind === "gentilic"
              ? PLACE_GENTILIC_NNC_GENTILIC_FORMATIONS.includes(formation)
              : constructionKind === "gentilic-collective"
                ? gentilicStem
                : constructionKind === "profession-place-association"
                  ? normalizePlaceGentilicNncKey(request.lexicalId || source.lexicalId)
                  : constructionKind === "profession-pertinency"
                    ? normalizePlaceGentilicNncKey(request.lexicalId || source.lexicalId)
                  : constructionKind === "gentilic-adjectival-use"
                      ? gentilicStem
                      : false
        )
      );
      return Object.freeze({
        kind: "classical-nahuatl-place-gentilic-source-analysis",
        version: 1,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized
          ? ""
          : !constructionKind
            ? "place-gentilic-construction-kind-required"
            : constructionKind === "place-name" && subjectReference !== PLACE_GENTILIC_NNC_SUBJECT_REFERENCE.uniqueSocial
              ? "place-name-requires-unique-social-reference"
              : constructionKind === "place-name" || constructionKind === "gentilic"
                ? "recognized-place-gentilic-formation-required"
                : "typed-place-gentilic-source-required",
        constructionKind,
        formation,
        embedStem,
        placeStem,
        gentilicStem,
        matrixStem,
        headStem,
        sourceVoice,
        subjectReference,
        usage,
        analysisKind,
        placeMatrix,
        state,
        sourceStructure: normalizePlaceGentilicNncKey(source.structure || request.structure || "integrated"),
        lexicalId: normalizePlaceGentilicNncKey(request.lexicalId || source.lexicalId),
        affectiveMatrix: normalizePlaceGentilicNncKey(request.affectiveMatrix || source.affectiveMatrix),
        typedFrameAuthority: true,
        sourceStringAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false
      });
    }
    function realizePlaceGentilicNncPlaceStem(sourceFrame = null) {
      const formation = sourceFrame?.formation || "";
      const embed = sourceFrame?.embedStem || "";
      if (!sourceFrame || sourceFrame.authorizationStatus !== "authorized") {
        return { authorizationStatus: "blocked", blockReason: sourceFrame?.blockReason || "typed-place-source-required" };
      }
      if (!embed && !["gentilic-incorporated-place", "gentilic-affective-co"].includes(formation)) {
        return { authorizationStatus: "blocked", blockReason: "place-name-embed-stem-required" };
      }
      let stem = "";
      let axisId = "";
      let boundaryRule = "";
      if (formation === "n-imperfect-active" || formation === "n-imperfect-nonactive") {
        if (formation === "n-imperfect-active" && sourceFrame.sourceVoice
          && sourceFrame.sourceVoice !== "active") {
          return { authorizationStatus: "blocked", blockReason: "n-imperfect-active-requires-typed-active-source" };
        }
        if (formation === "n-imperfect-nonactive" && !["nonactive", "passive", "impersonal"].includes(sourceFrame.sourceVoice)) {
          return { authorizationStatus: "blocked", blockReason: "n-imperfect-nonactive-requires-typed-nonactive-source" };
        }
        stem = `${embed}-yā-n`;
        axisId = formation === "n-imperfect-active" ? "place/n-imperfect-active" : "place/n-imperfect-nonactive";
        boundaryRule = "append-imperfect-nominalizer-yā-n";
      } else if (formation === "n-yan") {
        stem = `${embed}-yā-n`;
        axisId = "place/n-yan";
        boundaryRule = "append-place-matrix-yā-n";
      } else if (formation === "n-man") {
        stem = `${embed}-mā-n`;
        axisId = "place/n-man";
        boundaryRule = "append-place-only-mā-n";
      } else if (formation === "n-tlan-vicinity") {
        const matrix = /l$/u.test(embed) ? "lā-n" : "tlā-n";
        stem = `${embed}-${matrix}`;
        axisId = "place/n-tlan-vicinity";
        boundaryRule = /l$/u.test(embed) ? "final-l-selects-lā-n" : "append-vicinity-tlā-n";
      } else if (formation === "n-can") {
        stem = `${embed}-cā-n`;
        axisId = "place/n-can";
        boundaryRule = "append-non-vnc-place-matrix-cā-n";
      } else if (formation === "n-preterit-agentive") {
        stem = `${embed}-cā-n`;
        axisId = "place/n-preterit-agentive";
        boundaryRule = "embed-preterit-agentive-before-cā-n";
      } else if (formation === "n-action-noun") {
        stem = `${embed}-cā-n`;
        axisId = "place/n-action-noun";
        boundaryRule = "embed-action-noun-with-distant-past-cā-before-n";
      } else if (formation === "pan-integrated") {
        stem = `${embed}-pan`;
        axisId = "place/pan-integrated";
        boundaryRule = "append-integrated-pan";
      } else if (formation === "pan-connective-t") {
        stem = `${embed}-ti-pan`;
        axisId = "place/pan-connective-t";
        boundaryRule = "insert-connective-t-before-pan";
      } else if (formation === "co" || formation === "co-affective-embed") {
        stem = `${embed}-co`;
        axisId = formation === "co" ? "place/co" : "place/co-affective-embed";
        boundaryRule = "append-co";
      } else if (formation === "c") {
        stem = `${embed}-c`;
        axisId = "place/c";
        boundaryRule = "append-c";
      } else if (formation === "co-place-affective") {
        if (!["tzin", "tōn", "ton"].includes(sourceFrame.affectiveMatrix)) {
          return { authorizationStatus: "blocked", blockReason: "place-affective-requires-tzin-or-ton" };
        }
        if (!["place-name-affective", "lexical-affective"].includes(sourceFrame.analysisKind)) {
          return { authorizationStatus: "blocked", blockReason: "place-affective-structural-analysis-required" };
        }
        const placeBase = stripPlaceGentilicNncEnding(embed, "-co")
          || stripPlaceGentilicNncEnding(embed, "co");
        if (!placeBase) {
          return { authorizationStatus: "blocked", blockReason: "place-affective-requires-co-place-source" };
        }
        const matrix = sourceFrame.affectiveMatrix === "ton" ? "tōn" : sourceFrame.affectiveMatrix;
        stem = `${placeBase}-${matrix}-co`;
        axisId = sourceFrame.analysisKind === "place-name-affective"
          ? "place/co-place-affective"
          : "place/co-affective-embed";
        boundaryRule = sourceFrame.analysisKind === "place-name-affective"
          ? "replace-inner-co-with-silence-before-affective-co"
          : "embed-affective-nounstem-in-co";
      } else if (formation === "co-compound-nahuac") {
        stem = `${embed}-nāhua-c`;
        axisId = "place/co-compound-matrix";
        boundaryRule = "append-compound-matrix-nāhua-c";
      } else if (formation === "co-compound-ixco") {
        stem = `${embed}-ix-co`;
        axisId = "place/co-compound-matrix";
        boundaryRule = "append-compound-matrix-ix-co";
      } else if (formation === "co-compound-ticpac") {
        stem = `${embed}-t-icpa-c`;
        axisId = "place/co-compound-matrix";
        boundaryRule = "append-compound-matrix-t-icpa-c";
      } else if (formation === "tlah" || formation === "tlah-pan") {
        stem = `${embed}-${formation === "tlah-pan" ? "ne-pan-tlah" : "tlah"}`;
        axisId = formation === "tlah" ? "place/tlah" : "place/tlah-pan";
        boundaryRule = formation === "tlah" ? "append-abundance-tlah" : "embed-pan-relational-before-tlah";
      } else if (formation === "tzalan") {
        stem = `${embed}-tzālan`;
        axisId = "place/tzalan";
        boundaryRule = "append-tzālan";
      } else if (formation === "ti-tlan") {
        stem = `${embed}-ti-tlan`;
        axisId = "place/ti-tlan";
        boundaryRule = "insert-connective-t-before-tlan";
      } else if (formation === "chan-supplementation") {
        stem = `${embed}-ī-chān`;
        axisId = "place/chan-supplementation";
        boundaryRule = "compose-possessor-supplement-with-chān";
      } else if (formation === "gentilic-incorporated-place") {
        if (!sourceFrame.gentilicStem) return { authorizationStatus: "blocked", blockReason: "gentilic-stem-required" };
        const matrix = sourceFrame.matrixStem || "pan";
        stem = `${sourceFrame.gentilicStem}-${matrix}`;
        axisId = "extension/incorporation";
        boundaryRule = "embed-gentilic-nounstem-in-place-matrix";
      } else if (formation === "gentilic-affective-co") {
        if (!sourceFrame.gentilicStem || !["tzin", "tōn", "ton"].includes(sourceFrame.affectiveMatrix)) {
          return { authorizationStatus: "blocked", blockReason: "gentilic-affective-place-requires-gentilic-and-affective-matrix" };
        }
        const matrix = sourceFrame.affectiveMatrix === "ton" ? "tōn" : sourceFrame.affectiveMatrix;
        stem = `${sourceFrame.gentilicStem}-${matrix}-co`;
        axisId = "extension/incorporation";
        boundaryRule = "embed-affective-gentilic-in-co";
      }
      return stem ? {
        kind: "classical-nahuatl-place-name-formation-frame",
        version: 1,
        authorizationStatus: "authorized",
        blockReason: "",
        formation,
        axisId,
        sourceStem: embed || sourceFrame.gentilicStem,
        boundaryRule,
        derivedStem: stem,
        typedFrameAuthority: true,
        targetStringAuthority: false
      } : { authorizationStatus: "blocked", blockReason: "unimplemented-place-name-formation" };
    }
    function stripPlaceGentilicNncEnding(stem = "", ending = "") {
      return stem.endsWith(ending) ? stem.slice(0, -ending.length).replace(/-$/u, "") : "";
    }
    function realizePlaceGentilicNncGentilicStem(sourceFrame = null) {
      if (!sourceFrame || sourceFrame.authorizationStatus !== "authorized") {
        return { authorizationStatus: "blocked", blockReason: sourceFrame?.blockReason || "typed-gentilic-source-required" };
      }
      const formation = sourceFrame.formation;
      const source = sourceFrame.placeStem || sourceFrame.embedStem;
      let stem = "";
      let axisId = "";
      let boundaryRule = "";
      if (formation === "nonlocative-absolutive") {
        stem = sourceFrame.gentilicStem || sourceFrame.embedStem;
        axisId = "gentilic/nonlocative-absolutive";
        boundaryRule = "retain-nonlocative-tribal-nounstem";
      } else if (formation === "preterit-agentive-owner" || formation === "preterit-agentive-other") {
        stem = sourceFrame.gentilicStem || sourceFrame.embedStem;
        axisId = formation === "preterit-agentive-owner"
          ? "gentilic/preterit-agentive-owner"
          : "gentilic/preterit-agentive-other";
        boundaryRule = "reuse-preterit-agentive-embed-as-gentilic";
      } else if (formation === "ca-full-place") {
        if (!source) return { authorizationStatus: "blocked", blockReason: "place-stem-required-for-gentilic" };
        if (!/(?:tlah|tzālan|tzalan)$/u.test(realizePlaceGentilicNncCarrier(source))) {
          return { authorizationStatus: "blocked", blockReason: "full-place-gentilic-requires-tlah-or-tzalan-source" };
        }
        stem = `${source}-ca`;
        axisId = "gentilic/ca-full-place";
        boundaryRule = "embed-full-place-stem-in-ca";
      } else if (formation === "ca-pan-eca") {
        const base = stripPlaceGentilicNncEnding(source, "-pan") || stripPlaceGentilicNncEnding(source, "pan");
        if (!base) return { authorizationStatus: "blocked", blockReason: "pan-place-stem-required-for-eca-gentilic" };
        stem = `${base}-pan-ē-ca`;
        axisId = "gentilic/ca-pan-eca";
        boundaryRule = "retain-pan-add-ē-before-ca";
      } else if (formation === "ca-can-meca") {
        const base = stripPlaceGentilicNncEnding(source, "-cā-n") || stripPlaceGentilicNncEnding(source, "cān");
        if (!base) return { authorizationStatus: "blocked", blockReason: "can-place-stem-required-for-meca-gentilic" };
        stem = `${base}-cā-m-ē-ca`;
        axisId = "gentilic/ca-can-meca";
        boundaryRule = "replace-final-n-with-m-add-ē-ca";
      } else if (formation === "ca-co-c-silent") {
        const coBase = stripPlaceGentilicNncEnding(source, "-co") || stripPlaceGentilicNncEnding(source, "co");
        const cBase = stripPlaceGentilicNncEnding(source, "-c") || stripPlaceGentilicNncEnding(source, "c");
        const base = sourceFrame.placeMatrix === "co" ? coBase : sourceFrame.placeMatrix === "c" ? cBase : "";
        if (!base) return { authorizationStatus: "blocked", blockReason: "typed-co-or-c-place-matrix-required" };
        stem = `${base}-ca`;
        axisId = "gentilic/ca-co-c-silent";
        boundaryRule = "replace-place-co-or-c-with-silence-before-ca";
      } else if (formation === "ca-ownerhood-n-silent") {
        const base = stripPlaceGentilicNncEnding(source, "-cā-n")
          || stripPlaceGentilicNncEnding(source, "cān")
          || stripPlaceGentilicNncEnding(source, "-ca-n");
        if (!base) return { authorizationStatus: "blocked", blockReason: "ownerhood-can-place-stem-required" };
        stem = `${base}-ca`;
        axisId = "gentilic/ca-ownerhood-n-silent";
        boundaryRule = "silence-final-n-and-drop-distant-past-ca-before-gentilic-ca";
      } else if (formation === "ca-man-tlan-teca") {
        const manBase = stripPlaceGentilicNncEnding(source, "-mā-n") || stripPlaceGentilicNncEnding(source, "mān");
        const tlanBase = stripPlaceGentilicNncEnding(source, "-tlā-n") || stripPlaceGentilicNncEnding(source, "tlān");
        const lanBase = stripPlaceGentilicNncEnding(source, "-lā-n") || stripPlaceGentilicNncEnding(source, "lān");
        if (manBase) {
          stem = `${manBase}-mē-ca`;
          boundaryRule = "silence-n-and-change-mā-to-mē-before-ca";
        } else if (tlanBase || lanBase) {
          stem = `${tlanBase || lanBase}-tē-ca`;
          boundaryRule = "silence-n-change-long-a-to-e-and-lateral-cluster-to-t-before-ca";
        } else {
          return { authorizationStatus: "blocked", blockReason: "man-or-tlan-place-stem-required-for-teca-gentilic" };
        }
        axisId = "gentilic/ca-man-tlan-teca";
      } else if (formation === "two-clause-concatenate") {
        if (!sourceFrame.placeStem || !sourceFrame.headStem) {
          return { authorizationStatus: "blocked", blockReason: "two-clause-gentilic-requires-place-and-head-stems" };
        }
        if (!["tlāca", "cal-ca", "cal", "chān-eh"].includes(sourceFrame.headStem)) {
          return { authorizationStatus: "blocked", blockReason: "two-clause-gentilic-head-not-licensed" };
        }
        stem = sourceFrame.headStem;
        axisId = "gentilic/two-clause-concatenate";
        boundaryRule = "retain-place-clause-as-adjectival-modifier-of-head-nnc";
      }
      return stem ? {
        kind: "classical-nahuatl-gentilic-formation-frame",
        version: 1,
        authorizationStatus: "authorized",
        blockReason: "",
        formation,
        axisId,
        sourcePlaceStem: sourceFrame.placeStem,
        boundaryRule,
        derivedStem: stem,
        typedFrameAuthority: true,
        targetStringAuthority: false
      } : { authorizationStatus: "blocked", blockReason: "unimplemented-gentilic-formation" };
    }
    function buildPlaceGentilicNncAgreementFrame(stem = "", request = {}, {
      defaultNounClass = "tl",
      forceAbsolutive = false
    } = {}) {
      const normalizedStem = normalizePlaceGentilicNncStem(stem);
      const state = forceAbsolutive
        ? "absolutive"
        : normalizePlaceGentilicNncState(request.state || "absolutive");
      const subject = normalizePlaceGentilicNncKey(request.subject || "3sg").replace(/-/gu, "");
      let lowerFrame = null;
      if (state === "absolutive" && typeof targetObject.buildClassicalNahuatlAbsolutiveNncFrame === "function") {
        lowerFrame = targetObject.buildClassicalNahuatlAbsolutiveNncFrame(normalizedStem, {
          subject,
          nounClass: request.nounClass || defaultNounClass,
          pluralConnector: request.pluralConnector || (
            String(request.nounClass || defaultNounClass) === "zero" ? "m-eh" : "0-h"
          ),
          animacy: request.animacy || "animate",
          stateAvailability: forceAbsolutive ? "absolutive-only" : "both",
          naturalPossessionPolicy: forceAbsolutive ? "never-possessive" : "ordinary"
        });
      } else if (state === "possessive" && typeof targetObject.buildClassicalNahuatlPossessiveNncFrame === "function") {
        lowerFrame = targetObject.buildClassicalNahuatlPossessiveNncFrame(normalizedStem, {
          subject,
          possessor: request.possessor || "",
          singularConnector: request.singularConnector || (
            request.collectivityPossessiveVariant === "uh" ? "uh" : "0"
          ),
          stateAvailability: "both",
          naturalPossessionPolicy: "ordinary",
          animacy: request.animacy || "animate"
        });
      }
      const slotFrame = lowerFrame?.nncSlotFrame || null;
      const authorized = lowerFrame?.authorizationStatus === "authorized"
        && slotFrame?.authorizationStatus === "authorized";
      const slots = slotFrame?.slots || {};
      const surface = authorized ? [
        slots.subject?.pers1,
        slots.subject?.pers2,
        ...(slots.state?.slots || []).map(slot => slot.carrier),
        slots.predicate?.stem,
        slots.number?.num1,
        slots.number?.num2
      ].map(realizePlaceGentilicNncCarrier).join("") : "";
      return Object.freeze({
        kind: "classical-nahuatl-place-gentilic-nnc-agreement-frame",
        version: 1,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized ? "" : lowerFrame?.blockReason || "canonical-nnc-agreement-unavailable",
        state,
        subject,
        lowerFrameKind: lowerFrame?.kind || "",
        typedSlotFrame: authorized ? slotFrame : null,
        formulaRealization: authorized ? lowerFrame.formulaRealization : "",
        wordSurface: surface,
        typedFrameAuthority: true,
        formulaStringAuthority: false,
        surfaceStringAuthority: false
      });
    }
    function getPlaceGentilicNncFormationNounClass(formationFrame = null) {
      if (formationFrame?.formation === "two-clause-concatenate"
        && formationFrame?.derivedStem === "cal") {
        return "qui";
      }
      if (["preterit-agentive-owner", "preterit-agentive-other"]
        .includes(formationFrame?.formation)) {
        return "zero";
      }
      return "tl";
    }
    function buildPlaceNameNncFiniteFrame(formationFrame = null, request = {}) {
      if (!formationFrame || formationFrame.authorizationStatus !== "authorized") {
        return Object.freeze({
          kind: "classical-nahuatl-place-name-finite-frame",
          version: 1,
          authorizationStatus: "blocked",
          blockReason: formationFrame?.blockReason || "authorized-place-formation-required",
          formulaRealization: "",
          wordSurface: ""
        });
      }
      const num1 = formationFrame.formation === "chan-supplementation" ? "Ø" : "⎕";
      const formulaStem = formationFrame.derivedStem;
      const wordSurface = realizePlaceGentilicNncCarrier(formulaStem);
      const usage = normalizePlaceGentilicNncUsage(request.usage || "adverbial");
      return Object.freeze({
        kind: "classical-nahuatl-place-name-finite-frame",
        version: 1,
        authorizationStatus: "authorized",
        blockReason: "",
        usage,
        subjectReference: PLACE_GENTILIC_NNC_SUBJECT_REFERENCE.uniqueSocial,
        typedSlotFrame: Object.freeze({
          kind: "classical-nahuatl-place-name-nnc-slot-frame",
          version: 1,
          slots: Object.freeze({
            subject: Object.freeze({ pers1: "Ø", pers2: "Ø", reference: "unique-social" }),
            state: Object.freeze({ arity: "vacant", slots: Object.freeze([]) }),
            predicate: Object.freeze({ stem: formulaStem, tenseSlot: "none" }),
            number: Object.freeze({ num1, num2: "Ø", belongsTo: "adverbialized-subject-pronoun" })
          }),
          formulaStringAuthority: false,
          surfaceStringAuthority: false
        }),
        formulaRealization: `#Ø-Ø(${formulaStem})${num1}-Ø#`,
        wordSurface,
        sentenceSurface: wordSurface ? `${wordSurface}.` : "",
        typedFrameAuthority: true,
        formulaStringAuthority: false,
        surfaceStringAuthority: false
      });
    }
    function resolvePlaceGentilicNncLexicalExtension(sourceFrame = null, request = {}) {
      const lexicon = request.extensionKind === "title"
        ? PLACE_GENTILIC_NNC_TITLE_LEXICON
        : PLACE_GENTILIC_NNC_PROFESSION_LEXICON;
      const record = lexicon[sourceFrame?.lexicalId || ""] || null;
      if (record?.generationStatus === "read-only-canvas-evidence") {
        return Object.freeze({
          kind: "classical-nahuatl-place-associated-lexical-extension-frame",
          version: 1,
          authorizationStatus: "blocked",
          blockReason: record.blockReason,
          extensionKind: "title",
          axisId: "extension/title",
          lexicalId: sourceFrame.lexicalId,
          sourcePlace: record.sourcePlace,
          reading: record.reading,
          evidenceSurface: record.evidenceSurface,
          evidenceStatus: record.generationStatus,
          stem: "",
          typedFrameAuthority: true,
          callerSuppliedLexicalizationAccepted: false
        });
      }
      return record ? Object.freeze({
        kind: "classical-nahuatl-place-associated-lexical-extension-frame",
        version: 1,
        authorizationStatus: "authorized",
        blockReason: "",
        extensionKind: request.extensionKind === "title" ? "title" : "profession",
        axisId: request.extensionKind === "title" ? "extension/title" : "extension/profession",
        lexicalId: sourceFrame.lexicalId,
        sourcePlace: record.sourcePlace,
        reading: record.reading,
        stem: record.stem,
        nounClass: record.nounClass || "tl",
        lexicalInventoryAuthority: "closed-canvas-lesson-48-inventory",
        typedFrameAuthority: true,
        callerSuppliedLexicalizationAccepted: false
      }) : Object.freeze({
        kind: "classical-nahuatl-place-associated-lexical-extension-frame",
        version: 1,
        authorizationStatus: "blocked",
        blockReason: "canvas-licensed-profession-or-title-record-required",
        extensionKind: request.extensionKind === "title" ? "title" : "profession",
        axisId: request.extensionKind === "title" ? "extension/title" : "extension/profession",
        lexicalId: sourceFrame?.lexicalId || "",
        stem: "",
        typedFrameAuthority: true,
        callerSuppliedLexicalizationAccepted: false
      });
    }
    function evaluatePlaceGentilicNnc(request = {}) {
      const hostileAuthorityPath = findPlaceGentilicNncHostileAuthorityPath(request);
      if (hostileAuthorityPath) {
        return buildPlaceGentilicNncBlockedFrame(
          "caller-supplied-formula-surface-result-or-lesson-authority-blocked",
          request,
          { hostileAuthorityPath }
        );
      }
      const sourceAnalysis = buildPlaceGentilicNncSourceAnalysis(request);
      if (sourceAnalysis.authorizationStatus !== "authorized") {
        return buildPlaceGentilicNncBlockedFrame(sourceAnalysis.blockReason, request, { sourceAnalysis });
      }
      let formationFrame = null;
      let agreementFrame = null;
      let finiteFrame = null;
      if (sourceAnalysis.constructionKind === "place-name") {
        formationFrame = realizePlaceGentilicNncPlaceStem(sourceAnalysis);
        finiteFrame = buildPlaceNameNncFiniteFrame(formationFrame, request);
      } else if (sourceAnalysis.constructionKind === "gentilic") {
        formationFrame = realizePlaceGentilicNncGentilicStem(sourceAnalysis);
        const formationNounClass = getPlaceGentilicNncFormationNounClass(formationFrame);
        agreementFrame = formationFrame.authorizationStatus === "authorized"
          ? buildPlaceGentilicNncAgreementFrame(formationFrame.derivedStem, {
            ...request,
            nounClass: formationNounClass
          }, {
            defaultNounClass: formationNounClass,
            forceAbsolutive: true
          })
          : null;
        if (agreementFrame?.authorizationStatus === "authorized"
          && formationFrame.formation === "two-clause-concatenate") {
          const placeWord = realizePlaceGentilicNncCarrier(sourceAnalysis.placeStem);
          agreementFrame = Object.freeze({
            ...agreementFrame,
            formulaRealization: `#Ø-Ø(${sourceAnalysis.placeStem})⎕-Ø# + ${agreementFrame.formulaRealization}`,
            wordSurface: `${placeWord} ${agreementFrame.wordSurface}`,
            clauseStructure: "place-name-adjoined-to-absolutive-head-nnc"
          });
        }
        finiteFrame = agreementFrame;
      } else if (sourceAnalysis.constructionKind === "gentilic-collective") {
        formationFrame = Object.freeze({
          kind: "classical-nahuatl-gentilic-collectivity-formation-frame",
          version: 1,
          authorizationStatus: "authorized",
          blockReason: "",
          axisId: request.state === "possessive"
            ? "extension/collectivity-possessive"
            : "extension/gentilic-collectivity",
          sourceGentilicStem: sourceAnalysis.gentilicStem,
          boundaryRule: "embed-gentilic-stem-in-yō",
          derivedStem: `${sourceAnalysis.gentilicStem}-yō`,
          typedFrameAuthority: true,
          targetStringAuthority: false
        });
        agreementFrame = buildPlaceGentilicNncAgreementFrame(formationFrame.derivedStem, {
          ...request,
          nounClass: "tl"
        }, {
          defaultNounClass: "tl"
        });
        finiteFrame = agreementFrame;
      } else if (sourceAnalysis.constructionKind === "profession-place-association") {
        formationFrame = resolvePlaceGentilicNncLexicalExtension(sourceAnalysis, request);
        agreementFrame = formationFrame.authorizationStatus === "authorized"
          ? buildPlaceGentilicNncAgreementFrame(formationFrame.stem, {
            ...request,
            nounClass: formationFrame.nounClass
          }, {
            defaultNounClass: formationFrame.nounClass
          })
          : null;
        finiteFrame = agreementFrame;
      } else if (sourceAnalysis.constructionKind === "profession-pertinency") {
        const professionFrame = resolvePlaceGentilicNncLexicalExtension(sourceAnalysis, {
          ...request,
          extensionKind: "profession"
        });
        formationFrame = professionFrame.authorizationStatus === "authorized"
          ? Object.freeze({
            kind: "classical-nahuatl-profession-pertinency-formation-frame",
            version: 1,
            authorizationStatus: "authorized",
            blockReason: "",
            axisId: "extension/profession",
            lexicalId: professionFrame.lexicalId,
            sourceProfessionStem: professionFrame.stem,
            boundaryRule: "embed-closed-profession-stem-in-yō",
            derivedStem: `${professionFrame.stem}-yō`,
            typedFrameAuthority: true,
            targetStringAuthority: false
          })
          : professionFrame;
        agreementFrame = formationFrame.authorizationStatus === "authorized"
          ? buildPlaceGentilicNncAgreementFrame(formationFrame.derivedStem, {
            ...request,
            nounClass: "tl"
          }, {
            defaultNounClass: "tl",
            forceAbsolutive: true
          })
          : null;
        finiteFrame = agreementFrame;
      } else if (sourceAnalysis.constructionKind === "gentilic-adjectival-use") {
        formationFrame = Object.freeze({
          kind: "classical-nahuatl-gentilic-adjectival-use-frame",
          version: 1,
          authorizationStatus: "authorized",
          blockReason: "",
          axisId: "extension/adjectival-use",
          gentilicStem: sourceAnalysis.gentilicStem,
          operation: "reuse-complete-gentilic-nnc-as-adjectival-modifier",
          changesWordSurface: false,
          typedFrameAuthority: true
        });
        agreementFrame = buildPlaceGentilicNncAgreementFrame(sourceAnalysis.gentilicStem, request, {
          defaultNounClass: request.nounClass || "tl",
          forceAbsolutive: true
        });
        finiteFrame = agreementFrame;
      }
      if (!formationFrame || formationFrame.authorizationStatus !== "authorized") {
        return buildPlaceGentilicNncBlockedFrame(
          formationFrame?.blockReason || "licensed-place-gentilic-formation-required",
          request,
          { sourceAnalysis, formationFrame }
        );
      }
      if (!finiteFrame || finiteFrame.authorizationStatus !== "authorized") {
        return buildPlaceGentilicNncBlockedFrame(
          finiteFrame?.blockReason || "canonical-place-gentilic-finite-result-required",
          request,
          { sourceAnalysis, formationFrame, agreementFrame, finiteFrame }
        );
      }
      const formulaRealization = finiteFrame.formulaRealization || "";
      const wordSurface = finiteFrame.wordSurface || "";
      const frame = {
        kind: "classical-nahuatl-place-gentilic-nnc-frame",
        version: 1,
        constructionKind: sourceAnalysis.constructionKind,
        formation: sourceAnalysis.formation,
        authorizationStatus: "authorized",
        blockReason: "",
        stageOrder: PLACE_GENTILIC_NNC_GCD.stageOrder,
        gcdIdentity: PLACE_GENTILIC_NNC_GCD.identityId,
        lcmIdentity: PLACE_GENTILIC_NNC_LCM.identityId,
        lcmAxisId: formationFrame.axisId,
        sourceAnalysis,
        formationFrame,
        agreementFrame,
        finiteFrame,
        formulaRealization,
        wordSurface,
        sentenceSurface: finiteFrame.sentenceSurface || (wordSurface ? `${wordSurface}.` : ""),
        usage: sourceAnalysis.usage,
        state: agreementFrame?.state || sourceAnalysis.state,
        subject: agreementFrame?.subject || "3sg",
        typedFrameAuthority: true,
        callerSuppliedAuthorityAccepted: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        lessonMetadataAuthority: false
      };
      const frozenFrame = Object.freeze(frame);
      issuedPlaceGentilicNncFrames.add(frozenFrame);
      return frozenFrame;
    }
    function isPlaceGentilicNncFrame(frame = null) {
      if (!frame
        || !issuedPlaceGentilicNncFrames.has(frame)
        || frame.kind !== "classical-nahuatl-place-gentilic-nnc-frame"
        || frame.version !== 1) {
        return false;
      }
      if (!["authorized", "blocked"].includes(frame.authorizationStatus)
        || frame.formulaStringAuthority !== false
        || frame.surfaceStringAuthority !== false
        || frame.lessonMetadataAuthority !== false) {
        return false;
      }
      if (frame.authorizationStatus === "blocked") {
        return !frame.formulaRealization && !frame.wordSurface;
      }
      return Boolean(
        frame.sourceAnalysis?.authorizationStatus === "authorized"
        && frame.formationFrame?.authorizationStatus === "authorized"
        && frame.finiteFrame?.authorizationStatus === "authorized"
        && frame.formulaRealization
        && frame.wordSurface
        && PLACE_GENTILIC_NNC_LCM_AXIS_IDS.includes(frame.lcmAxisId)
        && frame.stageOrder.join(">") === PLACE_GENTILIC_NNC_GCD.stageOrder.join(">")
      );
    }
    function buildPlaceGentilicNncParadigmPlan(request = {}) {
      const sourceRequest = {
        ...request,
        subject: request.subject || "3sg",
        state: request.state || "absolutive"
      };
      const sourceFrame = evaluatePlaceGentilicNnc(sourceRequest);
      const placeOnly = sourceFrame.constructionKind === "place-name";
      const states = placeOnly
        ? ["absolutive"]
        : sourceFrame.constructionKind === "gentilic"
          ? ["absolutive"]
          : Array.isArray(request.states) && request.states.length
            ? request.states.map(normalizePlaceGentilicNncState).filter(value => value !== "unknown")
            : ["absolutive", "possessive"];
      const subjects = placeOnly
        ? ["3sg"]
        : Array.isArray(request.subjects) && request.subjects.length
          ? request.subjects.map(value => normalizePlaceGentilicNncKey(value).replace(/-/gu, ""))
          : ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"];
      const coordinates = Object.freeze(states.flatMap(state => subjects.map(subject => Object.freeze({
        coordinateId: `${state}:${subject}`,
        state,
        subject
      }))));
      const plan = Object.freeze({
        kind: "classical-nahuatl-place-gentilic-paradigm-plan",
        version: 1,
        authorizationStatus: sourceFrame.authorizationStatus,
        blockReason: sourceFrame.blockReason,
        constructionKind: sourceFrame.constructionKind,
        formation: sourceFrame.formation,
        sourceRequest: Object.freeze(sourceRequest),
        coordinates,
        coordinateCount: coordinates.length,
        scalarFrame: sourceFrame,
        typedFrameAuthority: true,
        formulaStringAuthority: false,
        surfaceStringAuthority: false
      });
      issuedPlaceGentilicNncParadigmPlans.add(plan);
      return plan;
    }
    function isPlaceGentilicNncParadigmPlan(plan = null) {
      return Boolean(
        plan
        && issuedPlaceGentilicNncParadigmPlans.has(plan)
        && plan.kind
          === "classical-nahuatl-place-gentilic-paradigm-plan"
        && plan.version === 1
        && ["authorized", "blocked"].includes(plan.authorizationStatus)
        && isPlaceGentilicNncFrame(plan.scalarFrame)
        && plan.coordinateCount === plan.coordinates?.length
        && plan.typedFrameAuthority === true
        && plan.formulaStringAuthority === false
        && plan.surfaceStringAuthority === false
      );
    }
    function projectPlaceGentilicNncParadigmCoordinates(plan = null, coordinates = null) {
      if (!isPlaceGentilicNncParadigmPlan(plan)
        || plan.authorizationStatus !== "authorized") {
        return Object.freeze([]);
      }
      const selected = Array.isArray(coordinates) ? coordinates : plan.coordinates;
      return Object.freeze(selected.map(coordinate => {
        const request = {
          ...plan.sourceRequest,
          state: coordinate.state,
          subject: coordinate.subject
        };
        const frame = evaluatePlaceGentilicNnc(request);
        const coordinateFrame = Object.freeze({
          kind: "classical-nahuatl-place-gentilic-paradigm-coordinate-frame",
          version: 1,
          coordinateId: coordinate.coordinateId || `${coordinate.state}:${coordinate.subject}`,
          state: coordinate.state,
          subject: coordinate.subject,
          authorizationStatus: frame.authorizationStatus,
          blockReason: frame.blockReason,
          formulaRealization: frame.formulaRealization,
          wordSurface: frame.wordSurface,
          scalarFrame: frame,
          scalarParity: frame.authorizationStatus === "authorized",
          typedFrameAuthority: true,
          formulaStringAuthority: false,
          surfaceStringAuthority: false
        });
        issuedPlaceGentilicNncParadigmCoordinates.add(coordinateFrame);
        return coordinateFrame;
      }));
    }
    function isPlaceGentilicNncParadigmCoordinate(frame = null) {
      return Boolean(
        frame
        && issuedPlaceGentilicNncParadigmCoordinates.has(frame)
        && frame.kind
          === "classical-nahuatl-place-gentilic-paradigm-coordinate-frame"
        && frame.version === 1
        && ["authorized", "blocked"].includes(frame.authorizationStatus)
        && isPlaceGentilicNncFrame(frame.scalarFrame)
        && frame.authorizationStatus === frame.scalarFrame.authorizationStatus
        && frame.formulaRealization === frame.scalarFrame.formulaRealization
        && frame.wordSurface === frame.scalarFrame.wordSurface
        && frame.scalarParity
          === (frame.scalarFrame.authorizationStatus === "authorized")
        && frame.typedFrameAuthority === true
        && frame.formulaStringAuthority === false
        && frame.surfaceStringAuthority === false
      );
    }
    function buildPlaceGentilicNncUiProjection(frame = null) {
      if (!isPlaceGentilicNncFrame(frame)) return null;
      return Object.freeze({
        kind: "classical-nahuatl-place-gentilic-ui-projection",
        version: 1,
        authorizationStatus: frame.authorizationStatus,
        constructionKind: frame.constructionKind,
        formation: frame.formation,
        grammar: Object.freeze({
          gcd: frame.gcdIdentity,
          operation: frame.formationFrame?.boundaryRule || "",
          derivedStem: frame.formationFrame?.derivedStem || frame.formationFrame?.stem || "",
          axisId: frame.lcmAxisId
        }),
        result: Object.freeze({
          formulaRealization: frame.formulaRealization,
          wordSurface: frame.wordSurface,
          sentenceSurface: frame.sentenceSurface
        }),
        grammarAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false
      });
    }

    const api = {};
    Object.defineProperty(api, "PLACE_GENTILIC_NNC_BOUNDARY_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return PLACE_GENTILIC_NNC_BOUNDARY_VERSION; },
    });
    Object.defineProperty(api, "PLACE_GENTILIC_NNC_KIND", {
        configurable: true,
        enumerable: true,
        get() { return PLACE_GENTILIC_NNC_KIND; },
    });
    Object.defineProperty(api, "PLACE_GENTILIC_NNC_FALSE_POSITIVE_SOURCE", {
        configurable: true,
        enumerable: true,
        get() { return PLACE_GENTILIC_NNC_FALSE_POSITIVE_SOURCE; },
    });
    Object.defineProperty(api, "PLACE_GENTILIC_NNC_USAGE", {
        configurable: true,
        enumerable: true,
        get() { return PLACE_GENTILIC_NNC_USAGE; },
    });
    Object.defineProperty(api, "PLACE_GENTILIC_NNC_PLACE_GROUP", {
        configurable: true,
        enumerable: true,
        get() { return PLACE_GENTILIC_NNC_PLACE_GROUP; },
    });
    Object.defineProperty(api, "PLACE_GENTILIC_NNC_GENTILIC_FORMATION", {
        configurable: true,
        enumerable: true,
        get() { return PLACE_GENTILIC_NNC_GENTILIC_FORMATION; },
    });
    Object.defineProperty(api, "PLACE_GENTILIC_NNC_SUBJECT_REFERENCE", {
        configurable: true,
        enumerable: true,
        get() { return PLACE_GENTILIC_NNC_SUBJECT_REFERENCE; },
    });
    Object.defineProperty(api, "PLACE_GENTILIC_NNC_STATE", {
        configurable: true,
        enumerable: true,
        get() { return PLACE_GENTILIC_NNC_STATE; },
    });
    Object.defineProperty(api, "PLACE_GENTILIC_NNC_ANTI_CONFLATION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return PLACE_GENTILIC_NNC_ANTI_CONFLATION_RULES; },
    });
    Object.defineProperty(api, "PLACE_GENTILIC_NNC_STRUCTURAL_QUESTIONS", {
        configurable: true,
        enumerable: true,
        get() { return PLACE_GENTILIC_NNC_STRUCTURAL_QUESTIONS; },
    });
    Object.defineProperty(api, "PLACE_GENTILIC_NNC_GCD", {
        configurable: true,
        enumerable: true,
        get() { return PLACE_GENTILIC_NNC_GCD; },
    });
    Object.defineProperty(api, "PLACE_GENTILIC_NNC_LCM", {
        configurable: true,
        enumerable: true,
        get() { return PLACE_GENTILIC_NNC_LCM; },
    });
    Object.defineProperty(api, "PLACE_GENTILIC_NNC_PLACE_FORMATIONS", {
        configurable: true,
        enumerable: true,
        get() { return PLACE_GENTILIC_NNC_PLACE_FORMATIONS; },
    });
    Object.defineProperty(api, "PLACE_GENTILIC_NNC_GENTILIC_FORMATIONS", {
        configurable: true,
        enumerable: true,
        get() { return PLACE_GENTILIC_NNC_GENTILIC_FORMATIONS; },
    });
    Object.defineProperty(api, "PLACE_GENTILIC_NNC_PROFESSION_LEXICON", {
        configurable: true,
        enumerable: true,
        get() { return PLACE_GENTILIC_NNC_PROFESSION_LEXICON; },
    });
    Object.defineProperty(api, "PLACE_GENTILIC_NNC_TITLE_LEXICON", {
        configurable: true,
        enumerable: true,
        get() { return PLACE_GENTILIC_NNC_TITLE_LEXICON; },
    });
    api.normalizePlaceGentilicNncEnum = normalizePlaceGentilicNncEnum;
    api.normalizePlaceGentilicNncKind = normalizePlaceGentilicNncKind;
    api.normalizePlaceGentilicNncFalsePositiveSource = normalizePlaceGentilicNncFalsePositiveSource;
    api.normalizePlaceGentilicNncCandidateSurface = normalizePlaceGentilicNncCandidateSurface;
    api.hasPlaceGentilicNncCanvasSourceGate = hasPlaceGentilicNncCanvasSourceGate;
    api.buildPlaceGentilicNncSourceFrame = buildPlaceGentilicNncSourceFrame;
    api.buildPlaceGentilicNncOperationFrame = buildPlaceGentilicNncOperationFrame;
    api.getPlaceGentilicNncOperationFrameMismatch = getPlaceGentilicNncOperationFrameMismatch;
    api.getPlaceGentilicNncBlockedDiagnostic = getPlaceGentilicNncBlockedDiagnostic;
    api.normalizePlaceGentilicNncUsage = normalizePlaceGentilicNncUsage;
    api.normalizePlaceGentilicNncPlaceGroup = normalizePlaceGentilicNncPlaceGroup;
    api.normalizePlaceGentilicNncGentilicFormation = normalizePlaceGentilicNncGentilicFormation;
    api.normalizePlaceGentilicNncSubjectReference = normalizePlaceGentilicNncSubjectReference;
    api.normalizePlaceGentilicNncState = normalizePlaceGentilicNncState;
    api.getPlaceGentilicNncPlaceMatrix = getPlaceGentilicNncPlaceMatrix;
    api.getPlaceGentilicNncAntiConflationRules = getPlaceGentilicNncAntiConflationRules;
    api.getPlaceGentilicNncStructuralQuestions = getPlaceGentilicNncStructuralQuestions;
    Object.defineProperty(api, "LESSON48_PLACE_GENTILIC_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON48_PLACE_GENTILIC_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "LESSON48_PLACE_GENTILIC_CANVAS_REFS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON48_PLACE_GENTILIC_CANVAS_REFS; },
    });
    Object.defineProperty(api, "LESSON48_PLACE_NAME_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON48_PLACE_NAME_FRAME; },
    });
    Object.defineProperty(api, "LESSON48_PLACE_GROUPS_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON48_PLACE_GROUPS_FRAME; },
    });
    Object.defineProperty(api, "LESSON48_GENTILIC_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON48_GENTILIC_FRAME; },
    });
    Object.defineProperty(api, "LESSON48_EXTENSIONS_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return LESSON48_EXTENSIONS_FRAME; },
    });
    Object.defineProperty(api, "LESSON48_PLACE_GENTILIC_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return LESSON48_PLACE_GENTILIC_SUBSECTION_INVENTORY; },
    });
    api.clonePlaceGentilicNncLessonRecord = clonePlaceGentilicNncLessonRecord;
    api.getPlaceGentilicSubsectionInventory = getPlaceGentilicSubsectionInventory;
    api.buildPlaceGentilicNncBoundaryMetadata = buildPlaceGentilicNncBoundaryMetadata;
    api.classifyPlaceGentilicNncCandidate = classifyPlaceGentilicNncCandidate;
    api.buildPlaceGentilicNncUsageFrame = buildPlaceGentilicNncUsageFrame;
    api.normalizePlaceGentilicNncToken = normalizePlaceGentilicNncToken;
    api.normalizePlaceGentilicNncKey = normalizePlaceGentilicNncKey;
    api.normalizePlaceGentilicNncStem = normalizePlaceGentilicNncStem;
    api.findPlaceGentilicNncHostileAuthorityPath = findPlaceGentilicNncHostileAuthorityPath;
    api.buildPlaceGentilicNncSourceAnalysis = buildPlaceGentilicNncSourceAnalysis;
    api.realizePlaceGentilicNncPlaceStem = realizePlaceGentilicNncPlaceStem;
    api.realizePlaceGentilicNncGentilicStem = realizePlaceGentilicNncGentilicStem;
    api.buildPlaceGentilicNncAgreementFrame = buildPlaceGentilicNncAgreementFrame;
    api.evaluatePlaceGentilicNnc = evaluatePlaceGentilicNnc;
    api.isPlaceGentilicNncFrame = isPlaceGentilicNncFrame;
    api.buildPlaceGentilicNncParadigmPlan = buildPlaceGentilicNncParadigmPlan;
    api.isPlaceGentilicNncParadigmPlan = isPlaceGentilicNncParadigmPlan;
    api.projectPlaceGentilicNncParadigmCoordinates = projectPlaceGentilicNncParadigmCoordinates;
    api.isPlaceGentilicNncParadigmCoordinate = isPlaceGentilicNncParadigmCoordinate;
    api.buildPlaceGentilicNncUiProjection = buildPlaceGentilicNncUiProjection;
    return api;
}

export function installPlaceGentilicNncGlobals(targetObject = globalThis, installationContext = null) {
    const api = createPlaceGentilicNncApi(targetObject, installationContext);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
