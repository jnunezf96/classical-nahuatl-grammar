// Canonical modern ESM module.

export function createClauseModule(targetObject = globalThis, installationContext = null) {
    const grammarFrameOwnerCapability = installationContext?.grammarFrameOwnerCapability || null;
    const NUCLEAR_CLAUSE_SHELL_VERSION = 1;
    const NUCLEAR_CLAUSE_KIND = Object.freeze({
      verbal: "verbal-nuclear-clause",
      nominal: "nominal-nuclear-clause",
      unknown: "unknown-nuclear-clause"
    });
    const NUCLEAR_CLAUSE_FORMULA_TYPE = Object.freeze({
      vnc: "VNC",
      nnc: "NNC",
      unknown: "unknown"
    });
    const NUCLEAR_CLAUSE_TERMINOLOGY_FALLBACK = Object.freeze({
      nc: Object.freeze({
        abbreviation: "CN",
        english: "nuclear clause",
        spanish: "cláusula nuclear",
        conceptId: "nuclear-clause"
      }),
      vnc: Object.freeze({
        abbreviation: "CNV",
        english: "verbal nuclear clause",
        spanish: "cláusula nuclear verbal",
        conceptId: "vnc",
        legacyFormulaType: NUCLEAR_CLAUSE_FORMULA_TYPE.vnc
      }),
      nnc: Object.freeze({
        abbreviation: "CNN",
        english: "nominal nuclear clause",
        spanish: "cláusula nuclear nominal",
        conceptId: "nnc",
        legacyFormulaType: NUCLEAR_CLAUSE_FORMULA_TYPE.nnc
      })
    });
    const ANDREWS_NUCLEAR_SLOT = Object.freeze({
      pers1Pers2: "pers1-pers2",
      valence: "va",
      valence1Valence2: "va1-va2",
      object1: "obj1",
      object2: "obj2",
      object3: "obj3",
      reflexive: "reflexivo",
      state: "st",
      state1State2: "st1-st2",
      predicateStem: "STEM",
      tensePosition: "tns",
      numberConnector: "num1-num2"
    });
    const VERBAL_NUCLEAR_CLAUSE_EXPANDED_COMPAT_FORMULA = "#pers1-pers2+obj1-obj2-obj3-reflexivo(STEM)tiempo+num1-num2#";
    const NOMINAL_NUCLEAR_CLAUSE_EXPANDED_COMPAT_FORMULA = "#pers1-pers2(STEM)num1-num2#";
    const NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS = Object.freeze({
      dyadic: "dyadic",
      monadic: "monadic",
      vacant: "vacant",
      unknown: "unknown"
    });
    const NUCLEAR_CLAUSE_LESSON4_USAGE_ROLE = Object.freeze({
      unspecified: "unspecified",
      simpleSentence: "simple-sentence",
      mainClause: "main-clause",
      dependentClause: "dependent-clause",
      conjoinedClause: "conjoined-clause"
    });
    const NUCLEAR_CLAUSE_LESSON4_USAGE_OPTIONS = Object.freeze([Object.freeze({
      role: NUCLEAR_CLAUSE_LESSON4_USAGE_ROLE.simpleSentence,
      labelEs: "oración simple completa",
      sourceSection: "Andrews §4.1"
    }), Object.freeze({
      role: NUCLEAR_CLAUSE_LESSON4_USAGE_ROLE.mainClause,
      labelEs: "cláusula principal",
      sourceSection: "Andrews §4.1"
    }), Object.freeze({
      role: NUCLEAR_CLAUSE_LESSON4_USAGE_ROLE.dependentClause,
      labelEs: "cláusula dependiente",
      sourceSection: "Andrews §4.1"
    }), Object.freeze({
      role: NUCLEAR_CLAUSE_LESSON4_USAGE_ROLE.conjoinedClause,
      labelEs: "cláusula coordinada",
      sourceSection: "Andrews §4.1"
    })]);
    const NUCLEAR_CLAUSE_LESSON4_STAGE_1_FORMULA = "Subject + Predicate";
    const NUCLEAR_CLAUSE_LESSON4_STAGE_2_FORMULAS = Object.freeze({
      [NUCLEAR_CLAUSE_FORMULA_TYPE.vnc]: "#person+valence(STEM)tense+number#",
      [NUCLEAR_CLAUSE_FORMULA_TYPE.nnc]: "#person+state(STEM)number#"
    });
    const NUCLEAR_CLAUSE_LESSON4_STAGE_3_FORMULAS = Object.freeze({
      [NUCLEAR_CLAUSE_FORMULA_TYPE.vnc]: Object.freeze({
        [NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.dyadic]: "#pers1-pers2+va1-va2(STEM)tns+num1-num2#",
        [NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.monadic]: "#pers1-pers2+va(STEM)tns+num1-num2#",
        [NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.vacant]: "#pers1-pers2(STEM)tns+num1-num2#"
      }),
      [NUCLEAR_CLAUSE_FORMULA_TYPE.nnc]: Object.freeze({
        [NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.dyadic]: "#pers1-pers2+st1-st2(STEM)num1-num2#",
        [NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.monadic]: "#pers1-pers2+st(STEM)num1-num2#",
        [NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.vacant]: "#pers1-pers2(STEM)num1-num2#"
      })
    });
    const NUCLEAR_CLAUSE_LESSON4_VOCABLE_SCOPE_FRAME = Object.freeze({
      sourceSection: "Andrews §4.1",
      appliesTo: "all-non-particle-vocables",
      excludedFormalClass: "particle",
      unitKind: "nuclear-clause",
      requiredFunctions: Object.freeze(["subject", "predicate"]),
      isMorphologicalWord: false,
      rejectsSentenceWordLabel: true,
      useRoles: Object.freeze([NUCLEAR_CLAUSE_LESSON4_USAGE_ROLE.simpleSentence, NUCLEAR_CLAUSE_LESSON4_USAGE_ROLE.mainClause, NUCLEAR_CLAUSE_LESSON4_USAGE_ROLE.dependentClause, NUCLEAR_CLAUSE_LESSON4_USAGE_ROLE.conjoinedClause])
    });
    const NUCLEAR_CLAUSE_LESSON4_FORMULA_BOUNDARY_FRAME = Object.freeze({
      sourceSections: Object.freeze(["Andrews §4.3", "Andrews §4.4", "Andrews §4.5"]),
      foreAftBoundary: "#",
      positionBoundary: "+",
      subpositionBoundary: "-",
      stemBoundary: "()",
      vacantPositionSymbol: "absence",
      formulaRepresentsSlotCategories: true,
      formulaRepresentsMorphicFillers: true,
      formulaIsEngineContract: true,
      surfaceGenerationAuthority: false,
      orthographyCannotChangeSlotOrder: true,
      stemDimensionsExplicit: true
    });
    const LESSON5_FUTURE_PRETERIT_CONNECTOR_OPTIONS = Object.freeze(["0-0", "c-0", "qui-0", "qu-eh"]);
    const LESSON5_FUTURE_PRETERIT_NUM1_OPTIONS = Object.freeze(["0", "c", "qui", "qu"]);
    const LESSON5_FUTURE_PRETERIT_NUM2_OPTIONS = Object.freeze(["0", "eh"]);
    const LESSON5_MAIN_INDICATIVE_CONNECTOR_OPTIONS = Object.freeze(["0-0", "0-h"]);
    const LESSON5_MAIN_INDICATIVE_NUM1_OPTIONS = Object.freeze(["0"]);
    const LESSON5_MAIN_INDICATIVE_NUM2_OPTIONS = Object.freeze(["0", "h"]);
    const LESSON5_NONPAST_OPTATIVE_CONNECTOR_OPTIONS = Object.freeze(["0-0", "c-ān"]);
    const LESSON5_NONPAST_OPTATIVE_NUM1_OPTIONS = Object.freeze(["0", "c"]);
    const LESSON5_NONPAST_OPTATIVE_NUM2_OPTIONS = Object.freeze(["0", "ān"]);
    const NUCLEAR_CLAUSE_LESSON4_SUBJECT_FRAME = Object.freeze({
      sourceSection: "Andrews §4.4",
      role: "subject",
      structure: "discontinuous-circumfix",
      prefixPosition: "person",
      suffixPosition: "number",
      genericFormula: "#person+...+number#",
      occursIn: Object.freeze([NUCLEAR_CLAUSE_FORMULA_TYPE.vnc, NUCLEAR_CLAUSE_FORMULA_TYPE.nnc])
    });
    const NUCLEAR_CLAUSE_LESSON4_POSITION_COMPLEXITY_FRAME = Object.freeze({
      sourceSection: "Andrews §4.5",
      positions: Object.freeze({
        person: Object.freeze({
          complexity: "dyadic",
          subpositions: Object.freeze(["pers1", "pers2"])
        }),
        number: Object.freeze({
          complexity: "dyadic",
          subpositions: Object.freeze(["num1", "num2"])
        }),
        tense: Object.freeze({
          complexity: "monadic",
          slot: "tns",
          occursIn: Object.freeze([NUCLEAR_CLAUSE_FORMULA_TYPE.vnc])
        }),
        valence: Object.freeze({
          complexityOptions: Object.freeze(["dyadic", "monadic", "vacant"]),
          slotsByStatus: Object.freeze({
            dyadic: "va1-va2",
            monadic: "va",
            vacant: "Ø"
          }),
          occursIn: Object.freeze([NUCLEAR_CLAUSE_FORMULA_TYPE.vnc])
        }),
        state: Object.freeze({
          complexityOptions: Object.freeze(["dyadic", "monadic", "vacant"]),
          slotsByStatus: Object.freeze({
            dyadic: "st1-st2",
            monadic: "st",
            vacant: "Ø"
          }),
          occursIn: Object.freeze([NUCLEAR_CLAUSE_FORMULA_TYPE.nnc])
        }),
        stem: Object.freeze({
          complexityOptions: Object.freeze(["monadic", "polyadic"]),
          lessonsDeferredTo: Object.freeze(["Lesson 7", "Lesson 14"])
        })
      })
    });
    const NUCLEAR_CLAUSE_LESSON4_LAYER_PROFILES = Object.freeze({
      [NUCLEAR_CLAUSE_FORMULA_TYPE.vnc]: Object.freeze([Object.freeze({
        level: 1,
        key: "verbstem",
        label: "verbstem",
        labelEs: "tronco verbal",
        role: "foundation"
      }), Object.freeze({
        level: 2,
        key: "verbcore",
        label: "verbcore = valence + stem",
        labelEs: "núcleo verbal = valencia + base",
        role: "core"
      }), Object.freeze({
        level: 3,
        key: "predicate",
        label: "predicate = verbcore + tense",
        labelEs: "predicado = núcleo verbal + tiempo",
        role: "predicate"
      }), Object.freeze({
        level: 4,
        key: "vnc",
        label: "VNC = subject + predicate",
        labelEs: "CNV = sujeto + predicado",
        role: "nuclear-clause"
      })]),
      [NUCLEAR_CLAUSE_FORMULA_TYPE.nnc]: Object.freeze([Object.freeze({
        level: 1,
        key: "nounstem",
        label: "nounstem",
        labelEs: "tronco nominal",
        role: "foundation"
      }), Object.freeze({
        level: 2,
        key: "nouncore",
        label: "nouncore = predicate = state + stem",
        labelEs: "núcleo nominal = predicado = estado + base",
        role: "predicate"
      }), Object.freeze({
        level: 3,
        key: "nnc",
        label: "NNC = subject + predicate",
        labelEs: "CNN = sujeto + predicado",
        role: "nuclear-clause"
      })])
    });
    const NUCLEAR_CLAUSE_PERSONAL_PRONOUN_FRAME = Object.freeze({
      kind: "lesson-4-personal-pronoun-frame",
      form: "affixal-only",
      location: "nuclear-clause-formula-positions",
      minimumMorphemeCount: 2,
      onlyReferringElements: true,
      categories: Object.freeze(["person", "animacy", "humanness", "number", "case"]),
      categoryFeatures: Object.freeze({
        person: Object.freeze(["first", "second", "third"]),
        animacy: Object.freeze(["animate", "nonanimate"]),
        humanness: Object.freeze(["human", "nonhuman"]),
        number: Object.freeze({
          animate: Object.freeze(["singular", "plural"]),
          nonanimate: Object.freeze(["common"])
        }),
        case: Object.freeze(["nominative", "objective", "possessive"])
      }),
      noGender: true,
      cases: Object.freeze({
        nominative: Object.freeze({
          functionRole: "subject",
          occursIn: Object.freeze([NUCLEAR_CLAUSE_FORMULA_TYPE.vnc, NUCLEAR_CLAUSE_FORMULA_TYPE.nnc])
        }),
        objective: Object.freeze({
          functionRole: "verb-object",
          occursIn: Object.freeze([NUCLEAR_CLAUSE_FORMULA_TYPE.vnc])
        }),
        possessive: Object.freeze({
          functionRole: "possessor",
          occursIn: Object.freeze([NUCLEAR_CLAUSE_FORMULA_TYPE.nnc])
        })
      }),
      referenceMode: "deictic-anaphoric-cataphoric"
    });
    const NUCLEAR_CLAUSE_LESSON4_VALIDATION_REFS = Object.freeze(["src/tests/clause.test.js", "docs/GRAMMAR_SPEC.md"]);
    const NUCLEAR_CLAUSE_LESSON4_SUBSECTION_INVENTORY = Object.freeze([Object.freeze({
      id: "lesson4-nuclear-clause-scope",
      andrewsSection: "4.1",
      category: "nuclear-clause-scope",
      directiveEs: "Todo vocablo no partícula se trata como cláusula nuclear con sujeto y predicado obligatorios.",
      engineSurface: "vocable scope frame, subject+predicate boundary, non-word anti-conflation rules, and use roles",
      redirectAction: "reframe-metadata",
      evidenceStatus: "direct-canvas-diagnostic",
      implementationState: "diagnostic-implemented"
    }), Object.freeze({
      id: "lesson4-nuclear-clause-kinds",
      andrewsSection: "4.2",
      category: "vnc-nnc-kinds",
      directiveEs: "Separar CNV/VNC y CNN/NNC por clase de predicado, no por traducción inglesa o palabra visible.",
      engineSurface: "predicate function profiles for verbal and nominal nuclear clauses",
      redirectAction: "reframe-metadata",
      evidenceStatus: "direct-canvas-diagnostic",
      implementationState: "diagnostic-implemented"
    }), Object.freeze({
      id: "lesson4-formula-stage-1",
      andrewsSection: "4.3",
      category: "formula-stage-1",
      directiveEs: "La fórmula comienza como sujeto + predicado; los símbolos son arquitectura de posiciones y rellenos.",
      engineSurface: "stage-1 formula inventory and formula-boundary frame",
      redirectAction: "keep",
      evidenceStatus: "direct-canvas-diagnostic",
      implementationState: "diagnostic-implemented"
    }), Object.freeze({
      id: "lesson4-formula-stage-2",
      andrewsSection: "4.4",
      category: "formula-stage-2",
      directiveEs: "El sujeto es circunfijo de persona y número; la CNN usa estado+base y la CNV valencia+base+tiempo.",
      engineSurface: "stage-2 formula inventory, subject frame, and CNV/CNN organizational layers",
      redirectAction: "keep",
      evidenceStatus: "direct-canvas-diagnostic",
      implementationState: "diagnostic-implemented"
    }), Object.freeze({
      id: "lesson4-formula-stage-3",
      andrewsSection: "4.5",
      category: "formula-stage-3",
      directiveEs: "Las seis fórmulas distinguen posiciones diádicas, monádicas y vacantes; la complejidad del tallo queda diferida.",
      engineSurface: "six formula records, predicate-position controls, and stem-complexity deferral to Lessons 7 and 14",
      redirectAction: "keep",
      evidenceStatus: "direct-canvas-diagnostic",
      implementationState: "diagnostic-implemented"
    }), Object.freeze({
      id: "lesson4-personal-pronouns",
      andrewsSection: "4.6",
      category: "personal-pronouns",
      directiveEs: "Los pronombres personales son afijales, son los únicos referentes, no marcan género y requieren contexto para 3a persona.",
      engineSurface: "personal pronoun frame and slot-filler resolution diagnostics",
      redirectAction: "diagnostic-only",
      evidenceStatus: "context-required",
      implementationState: "partial"
    })]);
    const NUCLEAR_CLAUSE_POSSESSIVE_PREFIX_FEATURES = Object.freeze({
      "": Object.freeze({
        person: 0,
        number: "none"
      }),
      no: Object.freeze({
        person: 1,
        number: "sg"
      }),
      mo: Object.freeze({
        person: 2,
        number: "sg"
      }),
      ī: Object.freeze({
        person: 3,
        number: "sg"
      }),
      to: Object.freeze({
        person: 1,
        number: "pl"
      }),
      amo: Object.freeze({
        person: 2,
        number: "pl"
      }),
      in: Object.freeze({
        person: 3,
        number: "pl"
      })
    });
    const NUCLEAR_CLAUSE_ANTI_CONFLATION_RULES = Object.freeze(["nuclear clause shell is not generation", "VNC/NNC surface output is not a complete sentence model", "CNV/CNN are the visible Andrews-derived names for the legacy VNC/NNC generator categories", "Lesson 4 formulas are shell architecture, not generated Classical Nahuatl surfaces", "tense position belongs to VNC, not ordinary NNC", "objective personal pronouns belong only in VNC predicates", "possessive personal pronouns belong only in NNC predicates", "topic and supplementation are clause-level relations, not noun classes", "Andrews slot order is architecture, not a post-generation spelling bridge", "Andrews formulas are engine contracts, not optional metadata"]);
    const LESSON5_VNC_TENSE_PROFILE_BY_TENSE = Object.freeze({
      presente: Object.freeze({
        morph: "Ø",
        labelEs: "indicativo presente",
        mood: "indicative",
        tense: "present",
        pluralConnector: "0-h",
        connectorOptions: LESSON5_MAIN_INDICATIVE_CONNECTOR_OPTIONS,
        num1Options: LESSON5_MAIN_INDICATIVE_NUM1_OPTIONS,
        num2Options: LESSON5_MAIN_INDICATIVE_NUM2_OPTIONS,
        connectorPattern: "0 + 0/h",
        sourceSection: "Andrews §5.4.1/§5.5"
      }),
      "presente-habitual": Object.freeze({
        morph: "ni",
        labelEs: "indicativo presente habitual",
        mood: "indicative",
        tense: "customary-present",
        pluralConnector: "0-h",
        connectorOptions: LESSON5_MAIN_INDICATIVE_CONNECTOR_OPTIONS,
        num1Options: LESSON5_MAIN_INDICATIVE_NUM1_OPTIONS,
        num2Options: LESSON5_MAIN_INDICATIVE_NUM2_OPTIONS,
        connectorPattern: "0 + 0/h",
        sourceSection: "Andrews §5.4.1/§5.5"
      }),
      imperfecto: Object.freeze({
        morph: "yā",
        labelEs: "indicativo imperfecto",
        mood: "indicative",
        tense: "imperfect",
        pluralConnector: "0-h",
        connectorOptions: LESSON5_MAIN_INDICATIVE_CONNECTOR_OPTIONS,
        num1Options: LESSON5_MAIN_INDICATIVE_NUM1_OPTIONS,
        num2Options: LESSON5_MAIN_INDICATIVE_NUM2_OPTIONS,
        connectorPattern: "0 + 0/h",
        sourceSection: "Andrews §5.4.1/§5.5"
      }),
      futuro: Object.freeze({
        morph: "z",
        labelEs: "indicativo futuro",
        mood: "indicative",
        tense: "future",
        pluralConnector: "qu-eh",
        connectorOptions: LESSON5_FUTURE_PRETERIT_CONNECTOR_OPTIONS,
        num1Options: LESSON5_FUTURE_PRETERIT_NUM1_OPTIONS,
        num2Options: LESSON5_FUTURE_PRETERIT_NUM2_OPTIONS,
        connectorPattern: "c/qu/qui/0 + 0/eh",
        sourceSection: "Andrews §5.4.2/§5.5"
      }),
      preterito: Object.freeze({
        morph: "Ø",
        labelEs: "indicativo pretérito",
        mood: "indicative",
        tense: "preterit",
        pluralConnector: "qu-eh",
        connectorOptions: LESSON5_FUTURE_PRETERIT_CONNECTOR_OPTIONS,
        num1Options: LESSON5_FUTURE_PRETERIT_NUM1_OPTIONS,
        num2Options: LESSON5_FUTURE_PRETERIT_NUM2_OPTIONS,
        connectorPattern: "c/qu/qui/0 + 0/eh",
        sourceSection: "Andrews §5.4.2/§5.5"
      }),
      "pasado-remoto": Object.freeze({
        morph: "cā",
        labelEs: "indicativo pasado remoto",
        mood: "indicative",
        tense: "distant-past",
        pluralConnector: "0-h",
        connectorOptions: LESSON5_MAIN_INDICATIVE_CONNECTOR_OPTIONS,
        num1Options: LESSON5_MAIN_INDICATIVE_NUM1_OPTIONS,
        num2Options: LESSON5_MAIN_INDICATIVE_NUM2_OPTIONS,
        connectorPattern: "0 + 0/h",
        sourceSection: "Andrews §5.4.1/§5.5"
      }),
      optativo: Object.freeze({
        morph: "Ø",
        labelEs: "optativo no pasado",
        mood: "optative",
        tense: "nonpast",
        pluralConnector: "c-ān",
        connectorOptions: LESSON5_NONPAST_OPTATIVE_CONNECTOR_OPTIONS,
        num1Options: LESSON5_NONPAST_OPTATIVE_NUM1_OPTIONS,
        num2Options: LESSON5_NONPAST_OPTATIVE_NUM2_OPTIONS,
        connectorPattern: "0-0 / c-ān",
        sourceSection: "Andrews §5.4.3/§5.5"
      })
    });
    function attachNuclearClauseGrammarContract(record = null, options = {}) {
      if (typeof targetObject.attachGrammarMetadataContract !== "function") {
        return record;
      }
      return targetObject.attachGrammarMetadataContract(record, {
        enumerable: false,
        unitKind: "nuclear-clause-shell",
        routeFamily: "nuclear-clause-shell",
        structuralSource: "Andrews Lesson 4",
        andrewsRefs: ["Andrews Lesson 4"],
        ...options
      }, grammarFrameOwnerCapability);
    }
    function getVncTenseProfile(tenseValue = "", tenseLabel = "") {
      const keys = [String(tenseValue || "").trim(), String(tenseLabel || "").trim()].filter(Boolean);
      for (const key of keys) {
        if (Object.prototype.hasOwnProperty.call(LESSON5_VNC_TENSE_PROFILE_BY_TENSE, key)) {
          return LESSON5_VNC_TENSE_PROFILE_BY_TENSE[key];
        }
      }
      return null;
    }
    function hasLesson5VncPluralConnector(connector = "") {
      const normalized = String(connector || "").trim();
      return Boolean(normalized) && normalized !== "Ø" && normalized !== "0" && normalized !== "Ø-Ø" && normalized !== "0-0";
    }
    function getVncTenseMorph(profile = null, numberConnectorFrame = null) {
      if (!profile) {
        return "";
      }
      if (hasLesson5VncPluralConnector(numberConnectorFrame?.displayConnector || numberConnectorFrame?.connector || "") && profile.pluralMorph) {
        return profile.pluralMorph;
      }
      return profile.morph || "";
    }
    function resolveLesson5VncProfileConnector(profile = null, rawConnector = "") {
      const raw = String(rawConnector || "").trim();
      if (!profile?.connectorOptions) {
        return "";
      }
      if (profile.connectorOptions.includes(raw)) {
        return raw;
      }
      if (raw === "c" || raw === "c0") return "c-0";
      if (raw === "qui" || raw === "qui0") return "qui-0";
      if (raw === "qu" || raw === "queh") return "qu-eh";
      if (raw === "h") return "0-h";
      if (raw === "ān") return "c-ān";
      return "";
    }
    function buildVncNumberConnectorSlot({
      subjectNumberConnector = "",
      subjectPrefix = "",
      tenseValue = "",
      tenseLabel = ""
    } = {}) {
      const rawConnector = String(subjectNumberConnector || "").trim();
      const profile = getVncTenseProfile(tenseValue, tenseLabel);
      const hasPluralConnector = hasLesson5VncPluralConnector(rawConnector);
      const selectedProfileConnector = resolveLesson5VncProfileConnector(profile, rawConnector);
      if (hasPluralConnector && profile?.pluralConnector) {
        const selectedConnector = selectedProfileConnector || profile.pluralConnector;
        const [num1, num2] = selectedConnector.includes("-") ? selectedConnector.split("-", 2) : ["", selectedConnector];
        return {
          connector: selectedConnector,
          displayConnector: selectedConnector,
          num1: num1 === "Ø" ? "" : String(num1 || ""),
          num2: num2 === "Ø" ? "" : String(num2 || ""),
          connectorOptions: profile.connectorOptions ? [...profile.connectorOptions] : undefined,
          num1Options: profile.num1Options ? [...profile.num1Options] : undefined,
          num2Options: profile.num2Options ? [...profile.num2Options] : undefined,
          connectorPattern: profile.connectorPattern || "",
          andrewsSource: profile.sourceSection || "Andrews §5.4"
        };
      }
      const [num1, num2] = rawConnector.includes("-") ? rawConnector.split("-", 2) : ["", rawConnector];
      return {
        connector: rawConnector,
        displayConnector: rawConnector ? rawConnector.includes("-") ? rawConnector : `Ø-${rawConnector}` : "Ø-Ø",
        num1: num1 === "Ø" ? "" : String(num1 || ""),
        num2: num2 === "Ø" ? "" : String(num2 || "")
      };
    }
    function getNuclearClauseFormulaSlot(formulaSlots = null, canonicalKey = "") {
      if (!formulaSlots || typeof formulaSlots !== "object") {
        return null;
      }
      if (formulaSlots[canonicalKey] && typeof formulaSlots[canonicalKey] === "object") {
        return formulaSlots[canonicalKey];
      }
      return null;
    }
    function normalizeNuclearClauseKind(value = "") {
      const normalized = String(value || "").trim().toLowerCase();
      if (["vnc", "verbal", "verb", "verbo", NUCLEAR_CLAUSE_KIND.verbal].includes(normalized)) {
        return NUCLEAR_CLAUSE_KIND.verbal;
      }
      if (["nnc", "nominal", "noun", "sustantivo", "adjetivo", NUCLEAR_CLAUSE_KIND.nominal].includes(normalized)) {
        return NUCLEAR_CLAUSE_KIND.nominal;
      }
      return NUCLEAR_CLAUSE_KIND.unknown;
    }
    function getNuclearClauseFormulaType(clauseKind = "") {
      const normalizedKind = normalizeNuclearClauseKind(clauseKind);
      if (normalizedKind === NUCLEAR_CLAUSE_KIND.verbal) {
        return NUCLEAR_CLAUSE_FORMULA_TYPE.vnc;
      }
      if (normalizedKind === NUCLEAR_CLAUSE_KIND.nominal) {
        return NUCLEAR_CLAUSE_FORMULA_TYPE.nnc;
      }
      return NUCLEAR_CLAUSE_FORMULA_TYPE.unknown;
    }
    function getNuclearClauseTerminologyForFormulaType(formulaType = "") {
      const normalizedFormulaType = String(formulaType || "").trim().toUpperCase();
      const terminology = typeof targetObject.getNuclearClauseTerminology === "function" ? targetObject.getNuclearClauseTerminology() : NUCLEAR_CLAUSE_TERMINOLOGY_FALLBACK;
      const fallback = normalizedFormulaType === NUCLEAR_CLAUSE_FORMULA_TYPE.vnc ? NUCLEAR_CLAUSE_TERMINOLOGY_FALLBACK.vnc : normalizedFormulaType === NUCLEAR_CLAUSE_FORMULA_TYPE.nnc ? NUCLEAR_CLAUSE_TERMINOLOGY_FALLBACK.nnc : NUCLEAR_CLAUSE_TERMINOLOGY_FALLBACK.nc;
      const source = normalizedFormulaType === NUCLEAR_CLAUSE_FORMULA_TYPE.vnc ? terminology?.vnc : normalizedFormulaType === NUCLEAR_CLAUSE_FORMULA_TYPE.nnc ? terminology?.nnc : terminology?.nc;
      return {
        ...fallback,
        ...(source && typeof source === "object" ? source : {}),
        legacyFormulaType: normalizedFormulaType === NUCLEAR_CLAUSE_FORMULA_TYPE.vnc || normalizedFormulaType === NUCLEAR_CLAUSE_FORMULA_TYPE.nnc ? normalizedFormulaType : ""
      };
    }
    function getNuclearClauseFormulaAbbreviation(formulaType = "") {
      return getNuclearClauseTerminologyForFormulaType(formulaType).abbreviation || "CN";
    }
    function getNuclearClauseFormulaLabel(formulaType = "") {
      return `Fórmula ${getNuclearClauseFormulaAbbreviation(formulaType)}`;
    }
    function getNuclearClauseDisplayLabel(formulaType = "") {
      const term = getNuclearClauseTerminologyForFormulaType(formulaType);
      const abbreviation = term.abbreviation || "CN";
      return `${term.spanish || "cláusula nuclear"} (${abbreviation})`;
    }
    function normalizeNuclearClauseFormulaType(value = "") {
      const normalized = String(value || "").trim().toUpperCase();
      if (normalized === NUCLEAR_CLAUSE_FORMULA_TYPE.vnc) {
        return NUCLEAR_CLAUSE_FORMULA_TYPE.vnc;
      }
      if (normalized === NUCLEAR_CLAUSE_FORMULA_TYPE.nnc) {
        return NUCLEAR_CLAUSE_FORMULA_TYPE.nnc;
      }
      return NUCLEAR_CLAUSE_FORMULA_TYPE.unknown;
    }
    function normalizeNuclearClausePredicatePositionStatus(value = "") {
      const normalized = String(value || "").trim().toLowerCase();
      if ([NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.dyadic, "diadic", "diadica", "diádica", "va1-va2", "st1-st2"].includes(normalized)) {
        return NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.dyadic;
      }
      if ([NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.monadic, "monadica", "monádica", "va", "st"].includes(normalized)) {
        return NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.monadic;
      }
      if ([NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.vacant, "empty", "absent", "none", "vacante", "ø"].includes(normalized)) {
        return NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.vacant;
      }
      return NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.unknown;
    }
    function getNuclearClausePredicatePositionLabel(formulaType = "") {
      const normalizedFormulaType = normalizeNuclearClauseFormulaType(formulaType);
      if (normalizedFormulaType === NUCLEAR_CLAUSE_FORMULA_TYPE.vnc) {
        return "valencia";
      }
      if (normalizedFormulaType === NUCLEAR_CLAUSE_FORMULA_TYPE.nnc) {
        return "estado";
      }
      return "posición predicativa";
    }
    function getNuclearClausePredicatePositionStatusLabel(status = "") {
      const normalized = normalizeNuclearClausePredicatePositionStatus(status);
      if (normalized === NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.dyadic) {
        return "diádica";
      }
      if (normalized === NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.monadic) {
        return "monádica";
      }
      if (normalized === NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.vacant) {
        return "vacante";
      }
      return "sin clasificar";
    }
    function getNuclearClausePredicatePositionSlotLabel(formulaType = "", status = "") {
      const normalizedFormulaType = normalizeNuclearClauseFormulaType(formulaType);
      const normalizedStatus = normalizeNuclearClausePredicatePositionStatus(status);
      if (normalizedFormulaType === NUCLEAR_CLAUSE_FORMULA_TYPE.vnc) {
        if (normalizedStatus === NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.dyadic) {
          return ANDREWS_NUCLEAR_SLOT.valence1Valence2;
        }
        if (normalizedStatus === NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.monadic) {
          return ANDREWS_NUCLEAR_SLOT.valence;
        }
        return "Ø";
      }
      if (normalizedFormulaType === NUCLEAR_CLAUSE_FORMULA_TYPE.nnc) {
        if (normalizedStatus === NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.dyadic) {
          return ANDREWS_NUCLEAR_SLOT.state1State2;
        }
        if (normalizedStatus === NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.monadic) {
          return ANDREWS_NUCLEAR_SLOT.state;
        }
        return "Ø";
      }
      return "Ø";
    }
    function normalizeNuclearClauseUsageRole(value = "") {
      const normalized = String(value || "").trim().toLowerCase();
      if ([NUCLEAR_CLAUSE_LESSON4_USAGE_ROLE.simpleSentence, "sentence", "oracion-simple", "oración-simple", "oracion simple", "oración simple"].includes(normalized)) {
        return NUCLEAR_CLAUSE_LESSON4_USAGE_ROLE.simpleSentence;
      }
      if ([NUCLEAR_CLAUSE_LESSON4_USAGE_ROLE.mainClause, "principal", "clausula-principal", "cláusula-principal", "clausula principal", "cláusula principal"].includes(normalized)) {
        return NUCLEAR_CLAUSE_LESSON4_USAGE_ROLE.mainClause;
      }
      if ([NUCLEAR_CLAUSE_LESSON4_USAGE_ROLE.dependentClause, "dependent", "subordinate", "dependiente", "subordinada", "clausula-dependiente", "cláusula-dependiente", "clausula dependiente", "cláusula dependiente"].includes(normalized)) {
        return NUCLEAR_CLAUSE_LESSON4_USAGE_ROLE.dependentClause;
      }
      if ([NUCLEAR_CLAUSE_LESSON4_USAGE_ROLE.conjoinedClause, "conjoined", "coordinated", "coordinada", "clausula-coordinada", "cláusula-coordinada", "clausula coordinada", "cláusula coordinada"].includes(normalized)) {
        return NUCLEAR_CLAUSE_LESSON4_USAGE_ROLE.conjoinedClause;
      }
      return NUCLEAR_CLAUSE_LESSON4_USAGE_ROLE.unspecified;
    }
    function getNuclearClauseUsageOptionLabel(role = "") {
      const normalizedRole = normalizeNuclearClauseUsageRole(role);
      return NUCLEAR_CLAUSE_LESSON4_USAGE_OPTIONS.find(entry => entry.role === normalizedRole)?.labelEs || "sin uso sintáctico fijado";
    }
    function buildNuclearClauseFormulaRecord({
      formulaType = "",
      predicatePositionStatus = ""
    } = {}) {
      const normalizedFormulaType = normalizeNuclearClauseFormulaType(formulaType);
      const normalizedStatus = normalizeNuclearClausePredicatePositionStatus(predicatePositionStatus);
      const stage3Formula = NUCLEAR_CLAUSE_LESSON4_STAGE_3_FORMULAS[normalizedFormulaType]?.[normalizedStatus] || "";
      return {
        stage: 3,
        sourceSection: "Andrews §4.5",
        formulaType: normalizedFormulaType,
        formulaAbbreviation: getNuclearClauseFormulaAbbreviation(normalizedFormulaType),
        predicatePosition: normalizedFormulaType === NUCLEAR_CLAUSE_FORMULA_TYPE.vnc ? "valence" : "state",
        predicatePositionLabel: getNuclearClausePredicatePositionLabel(normalizedFormulaType),
        predicatePositionStatus: normalizedStatus,
        predicatePositionStatusLabel: getNuclearClausePredicatePositionStatusLabel(normalizedStatus),
        predicatePositionSlot: getNuclearClausePredicatePositionSlotLabel(normalizedFormulaType, normalizedStatus),
        formula: stage3Formula,
        generationAllowed: false
      };
    }
    function getNuclearClauseFormulaInventory() {
      const buildSet = formulaType => [NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.dyadic, NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.monadic, NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.vacant].map(predicatePositionStatus => buildNuclearClauseFormulaRecord({
        formulaType,
        predicatePositionStatus
      }));
      return {
        kind: "lesson-4-nuclear-clause-formula-inventory",
        structuralSource: "Andrews Lesson 4",
        formulaBoundaryFrame: {
          ...NUCLEAR_CLAUSE_LESSON4_FORMULA_BOUNDARY_FRAME,
          sourceSections: Array.from(NUCLEAR_CLAUSE_LESSON4_FORMULA_BOUNDARY_FRAME.sourceSections)
        },
        subjectFrame: {
          ...NUCLEAR_CLAUSE_LESSON4_SUBJECT_FRAME,
          occursIn: Array.from(NUCLEAR_CLAUSE_LESSON4_SUBJECT_FRAME.occursIn)
        },
        positionComplexityFrame: cloneNuclearClausePositionComplexityFrame(),
        stage1: {
          stage: 1,
          sourceSection: "Andrews §4.3",
          formula: NUCLEAR_CLAUSE_LESSON4_STAGE_1_FORMULA,
          role: "general nuclear-clause relation"
        },
        stage2: {
          stage: 2,
          sourceSection: "Andrews §4.4",
          formulas: {
            VNC: NUCLEAR_CLAUSE_LESSON4_STAGE_2_FORMULAS[NUCLEAR_CLAUSE_FORMULA_TYPE.vnc],
            NNC: NUCLEAR_CLAUSE_LESSON4_STAGE_2_FORMULAS[NUCLEAR_CLAUSE_FORMULA_TYPE.nnc]
          }
        },
        stage3: {
          stage: 3,
          sourceSection: "Andrews §4.5",
          VNC: buildSet(NUCLEAR_CLAUSE_FORMULA_TYPE.vnc),
          NNC: buildSet(NUCLEAR_CLAUSE_FORMULA_TYPE.nnc)
        },
        generationAllowed: false
      };
    }
    function getNuclearClauseOrganizationalLayers(formulaType = "") {
      const normalizedFormulaType = normalizeNuclearClauseFormulaType(formulaType);
      return (NUCLEAR_CLAUSE_LESSON4_LAYER_PROFILES[normalizedFormulaType] || []).map(entry => ({
        ...entry
      }));
    }
    function cloneNuclearClausePositionComplexityFrame() {
      const positions = {};
      Object.entries(NUCLEAR_CLAUSE_LESSON4_POSITION_COMPLEXITY_FRAME.positions).forEach(([key, value]) => {
        positions[key] = {
          ...value,
          subpositions: value.subpositions ? Array.from(value.subpositions) : undefined,
          occursIn: value.occursIn ? Array.from(value.occursIn) : undefined,
          complexityOptions: value.complexityOptions ? Array.from(value.complexityOptions) : undefined,
          lessonsDeferredTo: value.lessonsDeferredTo ? Array.from(value.lessonsDeferredTo) : undefined,
          slotsByStatus: value.slotsByStatus ? {
            ...value.slotsByStatus
          } : undefined
        };
        Object.keys(positions[key]).forEach(field => {
          if (positions[key][field] === undefined) {
            delete positions[key][field];
          }
        });
      });
      return {
        ...NUCLEAR_CLAUSE_LESSON4_POSITION_COMPLEXITY_FRAME,
        positions
      };
    }
    function cloneNuclearClauseCategoryFeatures() {
      const source = NUCLEAR_CLAUSE_PERSONAL_PRONOUN_FRAME.categoryFeatures;
      return {
        person: Array.from(source.person),
        animacy: Array.from(source.animacy),
        humanness: Array.from(source.humanness),
        number: {
          animate: Array.from(source.number.animate),
          nonanimate: Array.from(source.number.nonanimate)
        },
        case: Array.from(source.case)
      };
    }
    function getNuclearClausePersonalPronounFrame() {
      return {
        ...NUCLEAR_CLAUSE_PERSONAL_PRONOUN_FRAME,
        categories: Array.from(NUCLEAR_CLAUSE_PERSONAL_PRONOUN_FRAME.categories),
        categoryFeatures: cloneNuclearClauseCategoryFeatures(),
        cases: Object.fromEntries(Object.entries(NUCLEAR_CLAUSE_PERSONAL_PRONOUN_FRAME.cases).map(([key, value]) => [key, {
          ...value,
          occursIn: Array.from(value.occursIn)
        }]))
      };
    }
    function getNuclearClauseSubsectionInventory() {
      return NUCLEAR_CLAUSE_LESSON4_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        canvasRef: `Andrews Lesson ${entry.andrewsSection}`,
        validationRefs: Array.from(NUCLEAR_CLAUSE_LESSON4_VALIDATION_REFS),
        generationAllowed: false
      }));
    }
    function getNuclearClausePredicateFunctionProfile(formulaType = "") {
      const normalizedFormulaType = normalizeNuclearClauseFormulaType(formulaType);
      if (normalizedFormulaType === NUCLEAR_CLAUSE_FORMULA_TYPE.vnc) {
        return {
          kind: "lesson-4-predicate-function-profile",
          formulaType: normalizedFormulaType,
          sourceSection: "Andrews §4.2",
          labelEs: "CNV: predicado verbal",
          predicateRoleEs: "predicado verbal",
          functionalContrastEs: "La CNV funciona como predicado verbal; su predicador puede ser intransitivo o transitivo.",
          predicatorValuesEs: ["verbo intransitivo", "verbo transitivo"],
          copularLike: false,
          hasTensePosition: true
        };
      }
      if (normalizedFormulaType === NUCLEAR_CLAUSE_FORMULA_TYPE.nnc) {
        return {
          kind: "lesson-4-predicate-function-profile",
          formulaType: normalizedFormulaType,
          sourceSection: "Andrews §4.2",
          labelEs: "CNN: predicado nominal",
          predicateRoleEs: "predicado nominal de valor copulativo",
          functionalContrastEs: "La CNN corresponde a un predicado con valor sustantivo, adjetivo o adverbial; no tiene posición de tiempo.",
          predicatorValuesEs: ["sustantivo", "adjetivo", "adverbial"],
          copularLike: true,
          hasTensePosition: false
        };
      }
      return {
        kind: "lesson-4-predicate-function-profile",
        formulaType: normalizedFormulaType,
        sourceSection: "Andrews §4.2",
        labelEs: "CN: predicado sin clasificar",
        predicateRoleEs: "predicado sin clasificar",
        functionalContrastEs: "La clase CNV/CNN todavía no está fijada.",
        predicatorValuesEs: [],
        copularLike: null,
        hasTensePosition: null
      };
    }
    function buildNuclearClauseUseFrame({
      usageRole = ""
    } = {}) {
      const activeRole = normalizeNuclearClauseUsageRole(usageRole);
      return {
        kind: "lesson-4-nuclear-clause-use-frame",
        sourceSection: "Andrews §4.1",
        activeRole,
        activeRoleLabelEs: getNuclearClauseUsageOptionLabel(activeRole),
        options: NUCLEAR_CLAUSE_LESSON4_USAGE_OPTIONS.map(entry => ({
          ...entry,
          isActive: entry.role === activeRole
        })),
        diagnosticStatus: activeRole === NUCLEAR_CLAUSE_LESSON4_USAGE_ROLE.unspecified ? "context-required" : "classified",
        diagnosticId: activeRole === NUCLEAR_CLAUSE_LESSON4_USAGE_ROLE.unspecified ? "lesson4-nuclear-clause-use-unspecified" : "lesson4-nuclear-clause-use-classified",
        reminderEs: "La unidad visible es una cláusula nuclear, no una palabra aislada."
      };
    }
    function buildNuclearClausePredicatePositionControlFrame({
      formulaType = "",
      predicatePositionStatus = "",
      statusSource = ""
    } = {}) {
      const normalizedFormulaType = normalizeNuclearClauseFormulaType(formulaType);
      const activeStatus = normalizeNuclearClausePredicatePositionStatus(predicatePositionStatus);
      const entries = (NUCLEAR_CLAUSE_LESSON4_STAGE_3_FORMULAS[normalizedFormulaType] ? [NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.dyadic, NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.monadic, NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.vacant] : []).map(status => {
        const record = buildNuclearClauseFormulaRecord({
          formulaType: normalizedFormulaType,
          predicatePositionStatus: status
        });
        const roleLabel = normalizedFormulaType === NUCLEAR_CLAUSE_FORMULA_TYPE.vnc ? status === NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.dyadic ? "valencia doble" : status === NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.monadic ? "valencia simple" : "sin valencia explícita" : status === NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.dyadic ? "estado doble" : status === NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.monadic ? "estado simple" : "sin estado explícito";
        return {
          ...record,
          roleLabelEs: roleLabel,
          labelEs: `${roleLabel} · ${record.predicatePositionSlot}`,
          isActive: status === activeStatus,
          diagnosticId: `${normalizedFormulaType.toLowerCase()}-${record.predicatePositionSlot === "Ø" ? "vacant" : record.predicatePositionSlot}-position`
        };
      });
      return {
        kind: "lesson-4-predicate-position-control-frame",
        sourceSection: "Andrews §4.5",
        formulaType: normalizedFormulaType,
        predicatePositionLabel: getNuclearClausePredicatePositionLabel(normalizedFormulaType),
        activeStatus,
        activeSlot: getNuclearClausePredicatePositionSlotLabel(normalizedFormulaType, activeStatus),
        activeFormula: entries.find(entry => entry.isActive) || null,
        statusSource: statusSource || "diagnostic-inference",
        diagnosticStatus: statusSource === "explicit" ? "explicit" : "diagnostic-only",
        diagnosticId: statusSource === "explicit" ? "lesson4-predicate-position-explicit" : "lesson4-predicate-position-inferred",
        options: entries
      };
    }
    function buildNuclearClauseDiagramTree({
      formulaType = "",
      predicatePositionStatus = ""
    } = {}) {
      const normalizedFormulaType = normalizeNuclearClauseFormulaType(formulaType);
      const activeSlot = getNuclearClausePredicatePositionSlotLabel(normalizedFormulaType, predicatePositionStatus);
      const predicateChildren = normalizedFormulaType === NUCLEAR_CLAUSE_FORMULA_TYPE.vnc ? [{
        key: "verbcore",
        labelEs: "Núcleo verbal",
        role: "core",
        children: [{
          key: "valence",
          labelEs: "Valencia",
          slot: activeSlot,
          role: "predicate-position"
        }, {
          key: "stem",
          labelEs: "Base (STEM)",
          role: "foundation"
        }]
      }, {
        key: "tense",
        labelEs: "Tiempo",
        slot: ANDREWS_NUCLEAR_SLOT.tensePosition,
        role: "tense-position"
      }] : [{
        key: "state",
        labelEs: "Estado",
        slot: activeSlot,
        role: "predicate-position"
      }, {
        key: "stem",
        labelEs: "Base (STEM)",
        role: "foundation"
      }];
      return {
        kind: "lesson-4-subject-predicate-tree",
        sourceSections: ["Andrews §4.3", "Andrews §4.4", "Andrews §4.5"],
        formulaType: normalizedFormulaType,
        labelEs: `${getNuclearClauseFormulaAbbreviation(normalizedFormulaType)} = Sujeto + Predicado`,
        root: {
          key: "nuclear-clause",
          labelEs: getNuclearClauseDisplayLabel(normalizedFormulaType),
          role: "nuclear-clause",
          children: [{
            key: "subject",
            labelEs: "Sujeto",
            role: "subject",
            structure: "discontinuous-circumfix",
            children: [{
              key: "person",
              labelEs: "Persona",
              slot: ANDREWS_NUCLEAR_SLOT.pers1Pers2,
              role: "subject-position"
            }, {
              key: "number",
              labelEs: "Número",
              slot: ANDREWS_NUCLEAR_SLOT.numberConnector,
              role: "subject-position"
            }]
          }, {
            key: "predicate",
            labelEs: "Predicado",
            role: "predicate",
            children: predicateChildren
          }]
        },
        foundationKey: "stem"
      };
    }
    function normalizeNuclearClausePronounNumber(value = "") {
      const normalized = String(value || "").trim().toLowerCase();
      if (["sg", "singular", "s"].includes(normalized)) {
        return "sg";
      }
      if (["pl", "plural", "p"].includes(normalized)) {
        return "pl";
      }
      if (["none", "ninguno", "absent"].includes(normalized)) {
        return "none";
      }
      return normalized || "unknown";
    }
    function getNuclearClausePronounPersonLabel(person = null) {
      if (person === 1 || String(person) === "1") {
        return "1a persona";
      }
      if (person === 2 || String(person) === "2") {
        return "2a persona";
      }
      if (person === 3 || String(person) === "3") {
        return "3a persona";
      }
      return "persona sin resolver";
    }
    function getNuclearClausePronounNumberLabel(number = "") {
      const normalized = normalizeNuclearClausePronounNumber(number);
      if (normalized === "sg") {
        return "singular";
      }
      if (normalized === "pl") {
        return "plural";
      }
      if (normalized === "none") {
        return "sin número";
      }
      return "número sin resolver";
    }
    function getNuclearClauseSubjectPronounFeatures(slot = null) {
      const prefix = String(slot?.prefix || "");
      const suffix = String(slot?.suffix || "");
      const info = typeof targetObject.getPers1Pers2Info === "function" ? targetObject.getPers1Pers2Info(prefix, suffix) : null;
      if (info) {
        return {
          person: info.person,
          number: normalizeNuclearClausePronounNumber(info.number),
          source: "agreement-map"
        };
      }
      if (!prefix && !suffix) {
        return {
          person: 3,
          number: "sg",
          source: "zero-third-person-candidate"
        };
      }
      return null;
    }
    function getNuclearClauseObjectPronounFeatures(slot = null) {
      const prefix = String(slot?.prefix || "");
      if (!prefix) {
        return null;
      }
      const info = typeof targetObject.getObj1PersonInfo === "function" ? targetObject.getObj1PersonInfo(prefix) : null;
      return info ? {
        person: info.person,
        number: normalizeNuclearClausePronounNumber(info.number),
        source: "agreement-map"
      } : null;
    }
    function getNuclearClausePossessivePronounFeatures(prefix = "") {
      const normalizedPrefix = String(prefix || "");
      const sourceEntry = NUCLEAR_CLAUSE_POSSESSIVE_PREFIX_FEATURES[normalizedPrefix];
      return sourceEntry ? {
        person: sourceEntry.person,
        number: normalizeNuclearClausePronounNumber(sourceEntry.number),
        source: "classical-possessive-prefix-inventory"
      } : null;
    }
    function getNuclearClausePossessivePrefixFromSlot(predicateSlot = null) {
      const stateSlot = predicateSlot?.stateSlot && typeof predicateSlot.stateSlot === "object" ? predicateSlot.stateSlot : null;
      return String(stateSlot?.possessorPrefix || stateSlot?.possessor || stateSlot?.prefix || stateSlot?.possessivePrefix || predicateSlot?.possessorPrefix || predicateSlot?.possessor || "");
    }
    function buildNuclearClausePersonalPronounFillerRecord({
      caseKey = "",
      slot = null,
      role = "",
      prefix = "",
      suffix = "",
      features = null
    } = {}) {
      const displayPrefix = String(prefix || "") || "Ø";
      const displaySuffix = String(suffix || "") || "Ø";
      const isThirdPerson = features?.person === 3;
      const isCommonNumberCandidate = isThirdPerson && normalizeNuclearClausePronounNumber(features?.number) === "sg";
      const diagnostics = [];
      if (!features) {
        diagnostics.push({
          id: `lesson4-${caseKey}-pronoun-unresolved`,
          severity: "diagnostic",
          messageEs: "Relleno pronominal sin persona/número resuelto."
        });
      }
      if (isThirdPerson) {
        diagnostics.push({
          id: `lesson4-${caseKey}-third-person-reference-context`,
          severity: "diagnostic",
          messageEs: "La 3a persona requiere contexto para deixis, anáfora o catáfora."
        });
      }
      if (isCommonNumberCandidate) {
        diagnostics.push({
          id: `lesson4-${caseKey}-common-number-context`,
          severity: "diagnostic",
          messageEs: "La lectura singular/común se resuelve por contexto."
        });
      }
      return {
        caseKey,
        caseLabelEs: caseKey === "nominative" ? "nominativo" : caseKey === "objective" ? "objetivo" : "posesivo",
        slot: String(slot || ""),
        role: String(role || ""),
        prefix: String(prefix || ""),
        suffix: String(suffix || ""),
        display: suffix ? `${displayPrefix}-${displaySuffix}` : displayPrefix,
        isPresent: Boolean(prefix || suffix || caseKey === "nominative"),
        features: features ? {
          person: features.person,
          personLabelEs: getNuclearClausePronounPersonLabel(features.person),
          number: normalizeNuclearClausePronounNumber(features.number),
          numberLabelEs: getNuclearClausePronounNumberLabel(features.number),
          case: caseKey,
          animacy: features.person === 3 ? "contextual" : "speaker/addressee",
          humanness: features.person === 3 ? "contextual" : "human",
          commonNumberAmbiguous: isCommonNumberCandidate,
          source: features.source || "unknown"
        } : null,
        referenceResolution: {
          modes: ["deixis", "anáfora", "catáfora"],
          status: isThirdPerson ? "context-required" : "participant-anchored"
        },
        diagnostics
      };
    }
    function buildNuclearClausePersonalPronounResolutionFrame({
      formulaType = "",
      slots = null
    } = {}) {
      const normalizedFormulaType = normalizeNuclearClauseFormulaType(formulaType);
      const sourceSlots = slots && typeof slots === "object" ? slots : {};
      const fillers = [];
      const subjectSlot = sourceSlots.pers1Pers2 || null;
      if (subjectSlot) {
        fillers.push(buildNuclearClausePersonalPronounFillerRecord({
          caseKey: "nominative",
          slot: subjectSlot.slot || ANDREWS_NUCLEAR_SLOT.pers1Pers2,
          role: "sujeto",
          prefix: subjectSlot.prefix || "",
          suffix: subjectSlot.suffix || "",
          features: getNuclearClauseSubjectPronounFeatures(subjectSlot)
        }));
      }
      if (normalizedFormulaType === NUCLEAR_CLAUSE_FORMULA_TYPE.vnc) {
        ["obj1", "obj2", "obj3", "reflexivo"].forEach(slotKey => {
          const slot = sourceSlots[slotKey] || null;
          const prefix = String(slot?.prefix || "");
          if (!prefix) {
            return;
          }
          fillers.push(buildNuclearClausePersonalPronounFillerRecord({
            caseKey: "objective",
            slot: slot.slot || slotKey,
            role: slot.role || "objeto",
            prefix,
            features: getNuclearClauseObjectPronounFeatures(slot)
          }));
        });
      }
      if (normalizedFormulaType === NUCLEAR_CLAUSE_FORMULA_TYPE.nnc) {
        const predicateSlot = sourceSlots.predicateStem || null;
        const possessorPrefix = getNuclearClausePossessivePrefixFromSlot(predicateSlot);
        if (possessorPrefix) {
          fillers.push(buildNuclearClausePersonalPronounFillerRecord({
            caseKey: "possessive",
            slot: "poseedor",
            role: "poseedor",
            prefix: possessorPrefix,
            features: getNuclearClausePossessivePronounFeatures(possessorPrefix)
          }));
        }
      }
      const diagnostics = fillers.flatMap(entry => entry.diagnostics || []);
      const hasThirdPersonContext = fillers.some(entry => entry.features?.person === 3);
      const hasCommonNumberAmbiguity = fillers.some(entry => entry.features?.commonNumberAmbiguous);
      return {
        ...getNuclearClausePersonalPronounFrame(),
        resolutionKind: "lesson-4-personal-pronoun-resolution",
        sourceSection: "Andrews §4.6",
        formulaType: normalizedFormulaType,
        fillers,
        referenceResolution: {
          modes: ["deixis", "anáfora", "catáfora"],
          status: hasThirdPersonContext ? "context-required" : "participant-anchored"
        },
        animacyHumannessResolution: {
          status: hasThirdPersonContext ? "context-required" : "participant-anchored",
          noteEs: hasThirdPersonContext ? "La animacidad/humanidad de la 3a persona no sale de la forma sola." : "1a/2a persona se ancla en participantes del habla."
        },
        commonNumberResolution: {
          ambiguous: hasCommonNumberAmbiguity,
          status: hasCommonNumberAmbiguity ? "context-required" : "resolved-or-not-applicable"
        },
        diagnostics
      };
    }
    function getNuclearClauseStatusSourceLabel(statusSource = "") {
      const normalized = String(statusSource || "").trim();
      if (normalized === "explicit") {
        return "explícito";
      }
      if (normalized === "inferred-from-visible-fillers") {
        return "inferido por rellenos visibles";
      }
      return "diagnóstico";
    }
    function buildNuclearClauseFrame({
      formulaType = "",
      predicatePositionStatus = "",
      predicatePositionStatusSource = "",
      usageRole = "",
      slots = null
    } = {}) {
      const normalizedFormulaType = normalizeNuclearClauseFormulaType(formulaType);
      const activeFormula = buildNuclearClauseFormulaRecord({
        formulaType: normalizedFormulaType,
        predicatePositionStatus
      });
      const useFrame = buildNuclearClauseUseFrame({
        usageRole
      });
      const predicateFunctionProfile = getNuclearClausePredicateFunctionProfile(normalizedFormulaType);
      const predicatePositionControl = buildNuclearClausePredicatePositionControlFrame({
        formulaType: normalizedFormulaType,
        predicatePositionStatus,
        statusSource: predicatePositionStatusSource
      });
      const diagramTree = buildNuclearClauseDiagramTree({
        formulaType: normalizedFormulaType,
        predicatePositionStatus
      });
      const pronounFrame = buildNuclearClausePersonalPronounResolutionFrame({
        formulaType: normalizedFormulaType,
        slots
      });
      const subsectionInventory = getNuclearClauseSubsectionInventory();
      return {
        kind: "nuclear-clause-lesson-4-frame",
        structuralSource: "Andrews Lesson 4",
        sections: ["4.1", "4.2", "4.3", "4.4", "4.5", "4.6"],
        canvasRefs: subsectionInventory.map(entry => entry.canvasRef),
        subsectionInventory,
        isGeneration: false,
        nuclearClauseIsWord: false,
        particlesAreExcluded: true,
        vocableScopeFrame: {
          ...NUCLEAR_CLAUSE_LESSON4_VOCABLE_SCOPE_FRAME,
          requiredFunctions: Array.from(NUCLEAR_CLAUSE_LESSON4_VOCABLE_SCOPE_FRAME.requiredFunctions),
          useRoles: Array.from(NUCLEAR_CLAUSE_LESSON4_VOCABLE_SCOPE_FRAME.useRoles)
        },
        formulaBoundaryFrame: {
          ...NUCLEAR_CLAUSE_LESSON4_FORMULA_BOUNDARY_FRAME,
          sourceSections: Array.from(NUCLEAR_CLAUSE_LESSON4_FORMULA_BOUNDARY_FRAME.sourceSections)
        },
        subjectFrame: {
          ...NUCLEAR_CLAUSE_LESSON4_SUBJECT_FRAME,
          occursIn: Array.from(NUCLEAR_CLAUSE_LESSON4_SUBJECT_FRAME.occursIn)
        },
        positionComplexityFrame: cloneNuclearClausePositionComplexityFrame(),
        useFrame,
        predicateFunctionProfile,
        activeFormula,
        formulaStages: [{
          stage: 1,
          sourceSection: "Andrews §4.3",
          formula: NUCLEAR_CLAUSE_LESSON4_STAGE_1_FORMULA,
          role: "sujeto + predicado"
        }, {
          stage: 2,
          sourceSection: "Andrews §4.4",
          formula: NUCLEAR_CLAUSE_LESSON4_STAGE_2_FORMULAS[normalizedFormulaType] || "",
          role: normalizedFormulaType === NUCLEAR_CLAUSE_FORMULA_TYPE.vnc ? "predicado = valencia + base + tiempo" : "predicado = estado + base"
        }, activeFormula],
        organizationalLayers: getNuclearClauseOrganizationalLayers(normalizedFormulaType),
        diagramTree,
        predicatePositionControl,
        personalPronounFrame: pronounFrame,
        inventory: getNuclearClauseFormulaInventory(),
        boundaries: {
          formulaInventoryIsNotGeneration: true,
          subjectAndPredicateRequired: true,
          stemIsFoundation: true,
          personalPronounsAreAffixalOnly: true,
          objectiveCaseOnlyInVncPredicate: true,
          possessiveCaseOnlyInNncPredicate: true
        },
        diagnostics: [{
          id: useFrame.diagnosticId,
          severity: useFrame.diagnosticStatus === "classified" ? "info" : "diagnostic",
          messageEs: useFrame.diagnosticStatus === "classified" ? `Uso de CN: ${useFrame.activeRoleLabelEs}.` : "Uso de CN pendiente: oración simple, cláusula principal, dependiente o coordinada."
        }, {
          id: predicatePositionControl.diagnosticId,
          severity: predicatePositionControl.diagnosticStatus === "explicit" ? "info" : "diagnostic",
          messageEs: `${predicatePositionControl.predicatePositionLabel}: ${activeFormula.predicatePositionStatusLabel} (${getNuclearClauseStatusSourceLabel(predicatePositionStatusSource)}).`
        }, ...pronounFrame.diagnostics]
      };
    }
    function inferVerbalPredicatePositionStatus({
      object = null,
      object2 = null,
      object3 = null,
      reflexive = null,
      predicate = null
    } = {}) {
      const explicitStatus = normalizeNuclearClausePredicatePositionStatus(predicate?.valenceStructure || predicate?.valenceStatus || predicate?.predicatePositionStatus || object?.valenceStructure || object?.predicatePositionStatus || "");
      if (explicitStatus !== NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.unknown) {
        return explicitStatus;
      }
      const hasSecondaryValence = Boolean(object2?.prefix || object2?.obj2 || object?.obj2 || object3?.prefix || object3?.obj3 || object?.obj3);
      if (hasSecondaryValence) {
        return NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.dyadic;
      }
      const objectPrefix = String(object?.prefix || object?.objectPrefix || "");
      const reflexivePrefix = String(reflexive?.prefix || reflexive?.reflexivo || object?.reflexivo || "");
      const lesson6ObjectStatus = getVerbalObjectPositionStatus(objectPrefix, reflexivePrefix);
      if (lesson6ObjectStatus !== NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.unknown) {
        return lesson6ObjectStatus;
      }
      const hasValence = Boolean(object?.prefix || object?.objectPrefix || reflexive?.prefix || reflexive?.reflexivo || object?.reflexivo);
      return hasValence ? NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.monadic : NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.vacant;
    }
    const LESSON6_SPECIFIC_PROJECTIVE_OBJECT_PREFIXES = Object.freeze(["nēch", "tēch", "mitz", "amēch", "c", "qu", "qui", "quim", "quin", "n-ēch", "t-ēch", "m-itz", "am-ēch", "c-0", "qu-0", "qui-0", "qu-im", "qu-in"]);
    const LESSON6_NONSPECIFIC_PROJECTIVE_OBJECT_PREFIXES = Object.freeze(["tē", "tla"]);
    const LESSON6_MONADIC_OBJECT_PREFIXES = Object.freeze(["ne", ...LESSON6_NONSPECIFIC_PROJECTIVE_OBJECT_PREFIXES]);
    const LESSON6_MAINLINE_REFLEXIVE_OBJECT_PREFIXES = Object.freeze(["mo", "m-o", "m-0"]);
    const LESSON6_CLASSICAL_VALENCE_GOVERNING_INVENTORY = Object.freeze({
      kind: "andrews-lesson-6-classical-valence-governing-frame",
      version: 1,
      sourceLesson: "Andrews Lesson 6",
      sourceSections: Object.freeze(["Andrews §6.2", "Andrews §6.3", "Andrews §6.4", "Andrews §6.5", "Andrews §6.6"]),
      governs: "CNV objective valence morphs before formula/function-use interpretation",
      monadic: Object.freeze({
        sourceSection: "Andrews §6.2",
        formula: "#pers1-pers2+va(STEM)tns+num1-num2#",
        valencePosition: "va",
        predicatePositionStatus: "monadic",
        slot: Object.freeze({
          slotId: "va",
          carries: Object.freeze(["object-function"]),
          possibleMorphs: Object.freeze(["ne", "tē", "tla"])
        }),
        classicalMorphs: Object.freeze([Object.freeze({
          surfaceMorph: "ne",
          formulaMorph: "ne",
          trajectory: "reflexive-reciprocative",
          specificity: "specific",
          prominence: "shuntline"
        }), Object.freeze({
          surfaceMorph: "tē",
          formulaMorph: "tē",
          trajectory: "projective",
          specificity: "nonspecific",
          humanness: "human",
          prominence: "mainline"
        }), Object.freeze({
          classicalMorph: "tla",
          surfaceMorph: "tla",
          formulaMorph: "tla",
          trajectory: "projective",
          specificity: "nonspecific",
          humanness: "nonhuman",
          prominence: "mainline"
        })])
      }),
      dyadicSpecificProjective: Object.freeze({
        sourceSections: Object.freeze(["Andrews §6.3", "Andrews §6.4", "Andrews §6.5"]),
        formula: "#pers1-pers2+va1-va2(STEM)tns+num1-num2#",
        valencePosition: "va1-va2",
        predicatePositionStatus: "dyadic",
        appliesWhen: Object.freeze({
          case: "objective",
          prominence: "mainline",
          specificity: "specific",
          trajectory: "projective"
        }),
        va1: Object.freeze({
          thirdPersonCarries: Object.freeze(["person", "objective-case"]),
          nonThirdPersonCarries: Object.freeze(["person", "number"])
        }),
        va2: Object.freeze({
          thirdPersonCarries: Object.freeze(["number"]),
          nonThirdPersonCarries: Object.freeze(["objective-case"])
        }),
        classicalDyads: Object.freeze([Object.freeze({
          surfaceMorph: "nēch",
          classicalDyad: "n-ēch"
        }), Object.freeze({
          surfaceMorph: "tēch",
          classicalDyad: "t-ēch"
        }), Object.freeze({
          surfaceMorph: "mitz",
          classicalDyad: "m-itz"
        }), Object.freeze({
          surfaceMorph: "amēch",
          classicalDyad: "am-ēch"
        }), Object.freeze({
          surfaceMorph: "qui",
          classicalDyad: "qui-0"
        }), Object.freeze({
          surfaceMorph: "c",
          classicalDyad: "c-0"
        }), Object.freeze({
          surfaceMorph: "quim",
          surfaceMorphs: Object.freeze(["quim", "quin"]),
          classicalDyad: "qu-im",
          classicalDyadAllomorphs: Object.freeze(["qu-im", "qu-in"])
        })])
      }),
      dyadicMainlineReflexive: Object.freeze({
        sourceSection: "Andrews §6.6",
        formula: "#pers1-pers2+va1-va2(STEM)tns+num1-num2#",
        valencePosition: "va1-va2",
        predicatePositionStatus: "dyadic",
        appliesWhen: Object.freeze({
          case: "objective",
          prominence: "mainline",
          trajectory: "reflexive-reciprocative"
        }),
        subjectPersonNumberReflected: true,
        objectRepeatsSubjectInformationOnlyForFirstPerson: true,
        pluralMayBeReciprocal: true,
        va1: Object.freeze({
          carries: Object.freeze(["person", "number"]),
          classicalMorphs: Object.freeze(["n", "t", "m"]),
          realizedMorphs: Object.freeze(["n", "t", "m"])
        }),
        va2: Object.freeze({
          carries: Object.freeze(["objective-case"]),
          classicalMorph: "o",
          vowelInitialStemAllomorph: "0",
          classicalMorphs: Object.freeze(["o", "0"])
        }),
        classicalDyads: Object.freeze([Object.freeze({
          surfaceMorph: "mo",
          classicalDyad: "m-o"
        }), Object.freeze({
          surfaceMorph: "m",
          classicalDyad: "m-0"
        })])
      })
    });
    const LESSON6_CLASSICAL_VALENCE_GOVERNING_SURFACE_FRAMES = Object.freeze({
      ne: Object.freeze({
        governingPath: "monadic-shuntline-reflexive-reciprocative",
        sourceSections: Object.freeze(["Andrews §6.2"]),
        formula: LESSON6_CLASSICAL_VALENCE_GOVERNING_INVENTORY.monadic.formula,
        valencePosition: "va",
        predicatePositionStatus: "monadic",
        surfaceMorph: "ne",
        formulaMorph: "ne",
        trajectory: "reflexive-reciprocative",
        specificity: "specific",
        prominence: "shuntline",
        va: Object.freeze({
          morph: "ne",
          carries: Object.freeze(["shuntline-reflexive-reciprocative-object"])
        })
      }),
      tē: Object.freeze({
        governingPath: "monadic-nonspecific-projective-human",
        sourceSections: Object.freeze(["Andrews §6.2"]),
        formula: LESSON6_CLASSICAL_VALENCE_GOVERNING_INVENTORY.monadic.formula,
        valencePosition: "va",
        predicatePositionStatus: "monadic",
        surfaceMorph: "tē",
        formulaMorph: "tē",
        trajectory: "projective",
        specificity: "nonspecific",
        humanness: "human",
        prominence: "mainline",
        va: Object.freeze({
          morph: "tē",
          carries: Object.freeze(["nonspecific-projective-object", "human"])
        })
      }),
      tla: Object.freeze({
        governingPath: "monadic-nonspecific-projective-nonhuman",
        sourceSections: Object.freeze(["Andrews §6.2"]),
        formula: LESSON6_CLASSICAL_VALENCE_GOVERNING_INVENTORY.monadic.formula,
        valencePosition: "va",
        predicatePositionStatus: "monadic",
        classicalMorph: "tla",
        surfaceMorph: "tla",
        formulaMorph: "tla",
        trajectory: "projective",
        specificity: "nonspecific",
        humanness: "nonhuman",
        prominence: "mainline",
        va: Object.freeze({
          morph: "tla",
          classicalMorph: "tla",
          carries: Object.freeze(["nonspecific-projective-object", "nonhuman"])
        })
      }),
      nēch: Object.freeze({
        governingPath: "dyadic-specific-projective-non-third",
        sourceSections: Object.freeze(["Andrews §6.3", "Andrews §6.4", "Andrews §6.5"]),
        formula: LESSON6_CLASSICAL_VALENCE_GOVERNING_INVENTORY.dyadicSpecificProjective.formula,
        valencePosition: "va1-va2",
        predicatePositionStatus: "dyadic",
        classicalDyad: "n-ēch",
        surfaceMorph: "nēch",
        formulaMorph: "n-ēch",
        trajectory: "projective",
        specificity: "specific",
        prominence: "mainline",
        va1: Object.freeze({
          morph: "n",
          carries: Object.freeze(["person", "number"]),
          features: Object.freeze({
            person: "first",
            number: "singular"
          })
        }),
        va2: Object.freeze({
          morph: "ēch",
          carries: Object.freeze(["objective-case"]),
          classicalMorpheme: "/e:c/"
        })
      }),
      tēch: Object.freeze({
        governingPath: "dyadic-specific-projective-non-third",
        sourceSections: Object.freeze(["Andrews §6.3", "Andrews §6.4", "Andrews §6.5"]),
        formula: LESSON6_CLASSICAL_VALENCE_GOVERNING_INVENTORY.dyadicSpecificProjective.formula,
        valencePosition: "va1-va2",
        predicatePositionStatus: "dyadic",
        classicalDyad: "t-ēch",
        surfaceMorph: "tēch",
        formulaMorph: "t-ēch",
        trajectory: "projective",
        specificity: "specific",
        prominence: "mainline",
        va1: Object.freeze({
          morph: "t",
          carries: Object.freeze(["person", "number"]),
          features: Object.freeze({
            person: "first",
            number: "plural"
          })
        }),
        va2: Object.freeze({
          morph: "ēch",
          carries: Object.freeze(["objective-case"]),
          classicalMorpheme: "/e:c/"
        })
      }),
      mitz: Object.freeze({
        governingPath: "dyadic-specific-projective-non-third",
        sourceSections: Object.freeze(["Andrews §6.3", "Andrews §6.4", "Andrews §6.5"]),
        formula: LESSON6_CLASSICAL_VALENCE_GOVERNING_INVENTORY.dyadicSpecificProjective.formula,
        valencePosition: "va1-va2",
        predicatePositionStatus: "dyadic",
        classicalDyad: "m-itz",
        surfaceMorph: "mitz",
        formulaMorph: "m-itz",
        trajectory: "projective",
        specificity: "specific",
        prominence: "mainline",
        va1: Object.freeze({
          morph: "m",
          carries: Object.freeze(["person", "number"]),
          features: Object.freeze({
            person: "second",
            number: "singular"
          })
        }),
        va2: Object.freeze({
          classicalMorph: "itz",
          morph: "itz",
          carries: Object.freeze(["objective-case"]),
          classicalMorpheme: "/e:c/"
        })
      }),
      amēch: Object.freeze({
        governingPath: "dyadic-specific-projective-non-third",
        sourceSections: Object.freeze(["Andrews §6.3", "Andrews §6.4", "Andrews §6.5"]),
        formula: LESSON6_CLASSICAL_VALENCE_GOVERNING_INVENTORY.dyadicSpecificProjective.formula,
        valencePosition: "va1-va2",
        predicatePositionStatus: "dyadic",
        classicalDyad: "am-ēch",
        surfaceMorph: "amēch",
        formulaMorph: "am-ēch",
        trajectory: "projective",
        specificity: "specific",
        prominence: "mainline",
        va1: Object.freeze({
          classicalMorph: "am",
          morph: "am",
          carries: Object.freeze(["person", "number"]),
          features: Object.freeze({
            person: "second",
            number: "plural"
          })
        }),
        va2: Object.freeze({
          classicalMorph: "ēch",
          morph: "ēch",
          carries: Object.freeze(["objective-case"]),
          classicalMorpheme: "/e:c/"
        })
      }),
      qui: Object.freeze({
        governingPath: "dyadic-specific-projective-third",
        sourceSections: Object.freeze(["Andrews §6.3", "Andrews §6.4", "Andrews §6.5"]),
        formula: LESSON6_CLASSICAL_VALENCE_GOVERNING_INVENTORY.dyadicSpecificProjective.formula,
        valencePosition: "va1-va2",
        predicatePositionStatus: "dyadic",
        classicalDyad: "qui-0",
        surfaceMorph: "qui",
        formulaMorph: "qui-0",
        trajectory: "projective",
        specificity: "specific",
        prominence: "mainline",
        va1: Object.freeze({
          classicalMorphs: Object.freeze(["c", "qu", "qui"]),
          morph: "qui",
          carries: Object.freeze(["person", "objective-case"]),
          features: Object.freeze({
            person: "third"
          })
        }),
        va2: Object.freeze({
          morph: "0",
          carries: Object.freeze(["number"]),
          features: Object.freeze({
            number: "singular"
          })
        })
      }),
      c: Object.freeze({
        governingPath: "dyadic-specific-projective-third",
        sourceSections: Object.freeze(["Andrews §6.3", "Andrews §6.4", "Andrews §6.5"]),
        formula: LESSON6_CLASSICAL_VALENCE_GOVERNING_INVENTORY.dyadicSpecificProjective.formula,
        valencePosition: "va1-va2",
        predicatePositionStatus: "dyadic",
        classicalDyad: "c-0",
        surfaceMorph: "c",
        formulaMorph: "c-0",
        trajectory: "projective",
        specificity: "specific",
        prominence: "mainline",
        va1: Object.freeze({
          classicalMorphs: Object.freeze(["c", "qu"]),
          morph: "c",
          carries: Object.freeze(["person", "objective-case"]),
          features: Object.freeze({
            person: "third"
          })
        }),
        va2: Object.freeze({
          morph: "0",
          carries: Object.freeze(["number"]),
          features: Object.freeze({
            number: "singular"
          })
        })
      }),
      quim: Object.freeze({
        governingPath: "dyadic-specific-projective-third",
        sourceSections: Object.freeze(["Andrews §6.3", "Andrews §6.4", "Andrews §6.5"]),
        formula: LESSON6_CLASSICAL_VALENCE_GOVERNING_INVENTORY.dyadicSpecificProjective.formula,
        valencePosition: "va1-va2",
        predicatePositionStatus: "dyadic",
        classicalDyad: "qu-im",
        surfaceMorph: "quim",
        surfaceMorphs: Object.freeze(["quim", "quin"]),
        formulaMorph: "qu-im",
        trajectory: "projective",
        specificity: "specific",
        prominence: "mainline",
        va1: Object.freeze({
          classicalMorphs: Object.freeze(["qu"]),
          morph: "qu",
          carries: Object.freeze(["person", "objective-case"]),
          features: Object.freeze({
            person: "third"
          })
        }),
        va2: Object.freeze({
          classicalMorph: "im",
          morph: "in",
          surfaceAllomorphs: Object.freeze(["in", "inh"]),
          carries: Object.freeze(["number"]),
          features: Object.freeze({
            number: "plural"
          })
        })
      })
    });
    function cloneLesson6Frame(frame = null) {
      return frame && typeof frame === "object" ? JSON.parse(JSON.stringify(frame)) : null;
    }
    function getClassicalValenceGoverningInventory() {
      return cloneLesson6Frame(LESSON6_CLASSICAL_VALENCE_GOVERNING_INVENTORY);
    }
    function buildClassicalReflexiveGoverningFrame(value = "", {
      stem = "",
      visibleFormulaPrefix = ""
    } = {}) {
      const normalizedValue = String(value || "").trim();
      const visible = String(visibleFormulaPrefix || "").trim();
      const isReflexiveValue = ["mo", "m", "m-o", "m-0"].includes(normalizedValue);
      const isReflexiveFormula = /^[ntm]-(?:o|0)$/u.test(visible);
      if (!isReflexiveValue && !isReflexiveFormula) {
        return null;
      }
      const dyad = visible || (normalizedValue === "m-0" || normalizedValue === "m" ? "m-0" : "m-o");
      const va2 = dyad.endsWith("-0") ? "0" : "o";
      const va1 = /^[ntm]-/u.test(dyad) ? dyad.slice(0, 1) : "m";
      const frame = {
        kind: "andrews-lesson-6-classical-valence-governing-selection",
        governingPath: "dyadic-mainline-reflexive-reciprocative",
        sourceSections: ["Andrews §6.6"],
        formula: LESSON6_CLASSICAL_VALENCE_GOVERNING_INVENTORY.dyadicMainlineReflexive.formula,
        valencePosition: "va1-va2",
        governingSlotId: "va1-va2",
        predicatePositionStatus: "dyadic",
        classicalDyad: dyad,
        visibleFormulaPrefix: dyad,
        surfaceMorph: `${va1}${va2 === "0" ? "" : va2}`,
        formulaMorph: dyad,
        trajectory: "reflexive-reciprocative",
        specificity: "specific",
        prominence: "mainline",
        subjectPersonNumberReflected: true,
        objectRepeatsSubjectInformationOnlyForFirstPerson: true,
        pluralMayBeReciprocal: true,
        stemCondition: va2 === "0" ? "vowel-initial-stem-allomorph" : "consonant-initial-stem",
        stem: String(stem || ""),
        va1: {
          classicalMorph: va1,
          morph: va1,
          carries: ["person", "number"],
          features: {
            person: va1 === "n" || va1 === "t" ? "first" : "nonfirst",
            number: va1 === "n" ? "singular" : va1 === "t" ? "plural" : "common"
          }
        },
        va2: {
          classicalMorph: va2 === "0" ? "0" : "o",
          morph: va2,
          carries: ["objective-case"]
        }
      };
      return frame;
    }
    function buildClassicalValenceGoverningFrame(value = "", options = {}) {
      const normalized = String(value || "").trim();
      if (!normalized) {
        return null;
      }
      const visibleFormulaPrefix = String(options?.visibleFormulaPrefix || "").trim();
      const directSurface = {
        "n-ēch": "nēch",
        "t-ēch": "tēch",
        "m-itz": "mitz",
        "am-ēch": "amēch",
        "qui-0": "qui",
        "c-0": "c",
        "qu-0": "c",
        "qu": "c",
        "qu-im": "quim",
        "qu-in": "quim",
        "quin": "quim"
      }[normalized] || normalized;
      const baseFrame = LESSON6_CLASSICAL_VALENCE_GOVERNING_SURFACE_FRAMES[directSurface];
      if (baseFrame) {
        const frame = cloneLesson6Frame(baseFrame);
        const allomorphicVisibleFormulaPrefix = normalized === "qu-in" || normalized === "quin" ? "qu-in" : "";
        return {
          kind: "andrews-lesson-6-classical-valence-governing-selection",
          ...frame,
          governingSlotId: frame?.valencePosition || "",
          visibleFormulaPrefix: visibleFormulaPrefix || allomorphicVisibleFormulaPrefix || frame?.formulaMorph || normalized,
          surfaceMorph: normalized === "quin" ? "quin" : frame?.surfaceMorph,
          stem: String(options?.stem || "")
        };
      }
      return buildClassicalReflexiveGoverningFrame(normalized, options);
    }
    function getVerbalObjectPositionStatus(objectPrefix = "", reflexivePrefix = "") {
      const objectValue = String(objectPrefix || "").trim();
      const reflexiveValue = String(reflexivePrefix || "").trim();
      if (reflexiveValue || LESSON6_MAINLINE_REFLEXIVE_OBJECT_PREFIXES.includes(objectValue) || buildClassicalReflexiveGoverningFrame(objectValue)) {
        return NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.dyadic;
      }
      if (LESSON6_SPECIFIC_PROJECTIVE_OBJECT_PREFIXES.includes(objectValue)) {
        return NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.dyadic;
      }
      if (LESSON6_MONADIC_OBJECT_PREFIXES.includes(objectValue)) {
        return NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.monadic;
      }
      return NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.unknown;
    }
    function getVerbalPredicatePositionStatusSource({
      object = null,
      predicate = null
    } = {}) {
      const explicitStatus = normalizeNuclearClausePredicatePositionStatus(predicate?.valenceStructure || predicate?.valenceStatus || predicate?.predicatePositionStatus || object?.valenceStructure || object?.predicatePositionStatus || "");
      return explicitStatus !== NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.unknown ? "explicit" : "inferred-from-visible-fillers";
    }
    function inferNominalPredicatePositionStatus({
      predicate = null,
      formulaSlots = null,
      predicateState = ""
    } = {}) {
      const predicateSource = getNuclearClauseFormulaSlot(formulaSlots, "predicateStem") || predicate || {};
      const stateSlot = predicateSource.stateSlot || null;
      const explicitStatus = normalizeNuclearClausePredicatePositionStatus(predicateSource.stateStructure || predicateSource.stateStatus || predicateSource.predicatePositionStatus || stateSlot?.stateStructure || stateSlot?.predicatePositionStatus || "");
      if (explicitStatus !== NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.unknown) {
        return explicitStatus;
      }
      if (stateSlot?.isDyadic === true || stateSlot?.statePosition === "dyadic") {
        return NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.dyadic;
      }
      if (stateSlot?.isVacant === false || stateSlot?.hasPossessor || stateSlot?.statePosition === "possessor" || String(predicateSource.state || predicateState || "").trim().toLowerCase() === "possessive") {
        return NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.monadic;
      }
      return NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.vacant;
    }
    function getNominalPredicatePositionStatusSource({
      predicate = null,
      formulaSlots = null
    } = {}) {
      const predicateSource = getNuclearClauseFormulaSlot(formulaSlots, "predicateStem") || predicate || {};
      const stateSlot = predicateSource.stateSlot || null;
      const explicitStatus = normalizeNuclearClausePredicatePositionStatus(predicateSource.stateStructure || predicateSource.stateStatus || predicateSource.predicatePositionStatus || stateSlot?.stateStructure || stateSlot?.predicatePositionStatus || "");
      return explicitStatus !== NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS.unknown ? "explicit" : "inferred-from-visible-fillers";
    }
    function buildClauseParticipantSlot({
      slot = "",
      prefix = "",
      suffix = "",
      role = "",
      label = ""
    } = {}) {
      return {
        slot: String(slot || ""),
        role: String(role || slot || ""),
        prefix: String(prefix || ""),
        suffix: String(suffix || ""),
        displayPrefix: String(prefix || "") || "Ø",
        displaySuffix: String(suffix || "") || "Ø",
        label: String(label || "")
      };
    }
    function getNuclearClauseShellResultFrame(input = null) {
      if (!input || typeof input !== "object") {
        return null;
      }
      const grammarFrame = input.grammarFrame && typeof input.grammarFrame === "object" ? input.grammarFrame : input.frames && typeof input.frames === "object" ? input.frames : null;
      return grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object" ? grammarFrame.resultFrame : null;
    }
    function normalizeNuclearClauseShellSurface(value = "") {
      const surface = String(value || "").trim();
      return surface === "—" ? "" : surface;
    }
    function splitNuclearClauseShellSurfaceText(value = "") {
      return String(value || "").split(/\s*\/\s*/g).map(entry => normalizeNuclearClauseShellSurface(entry)).filter(Boolean);
    }
    function getNuclearClauseShellCanonicalRealizationSurfaceForms(resultFrame = null) {
      if (!resultFrame || typeof resultFrame !== "object") {
        return [];
      }
      const records = Array.isArray(resultFrame.formulaRealizationRecords) && resultFrame.formulaRealizationRecords.length ? resultFrame.formulaRealizationRecords : resultFrame.formulaRealizationRecord ? [resultFrame.formulaRealizationRecord] : [];
      return records.filter(record => record && typeof record === "object" && record.kind === "grammar-formula-realization-record").flatMap(record => [...(Array.isArray(record.surfaceForms) ? record.surfaceForms : []), record.surface || ""]).map(entry => normalizeNuclearClauseShellSurface(entry)).filter((entry, index, list) => entry && list.indexOf(entry) === index);
    }
    function getNuclearClauseShellSelectedRealizationVariant(input = null) {
      const resultFrame = getNuclearClauseShellResultFrame(input);
      if (!resultFrame) {
        return null;
      }
      const records = Array.isArray(resultFrame.formulaRealizationRecords) && resultFrame.formulaRealizationRecords.length ? resultFrame.formulaRealizationRecords : resultFrame.formulaRealizationRecord ? [resultFrame.formulaRealizationRecord] : [];
      for (const record of records) {
        if (!record || typeof record !== "object" || record.kind !== "grammar-formula-realization-record") {
          continue;
        }
        const surfaces = [...(Array.isArray(record.surfaceForms) ? record.surfaceForms : []), record.surface || ""].map(entry => normalizeNuclearClauseShellSurface(entry)).filter((entry, index, list) => entry && list.indexOf(entry) === index);
        if (!surfaces.length) {
          continue;
        }
        const formulaRealizationRecordId = String(record.id || "");
        const formulaRecordId = String(record.formulaRecordId || resultFrame.formulaRecord?.id || "");
        const selectedVariantIndex = 0;
        return {
          kind: "grammar-formula-realization-selected-variant",
          selectedVariantId: `${formulaRealizationRecordId || formulaRecordId || "realization"}::surface-${selectedVariantIndex}`,
          selectedVariantIndex,
          formulaRealizationRecordId,
          formulaRecordId,
          unit: String(record.unit || resultFrame.formulaRecord?.unit || "")
        };
      }
      return null;
    }
    function getNuclearClauseShellFramedSurface(input = null) {
      const resultFrame = getNuclearClauseShellResultFrame(input);
      if (!resultFrame) {
        return null;
      }
      const canonicalForms = getNuclearClauseShellCanonicalRealizationSurfaceForms(resultFrame);
      if (canonicalForms.length) {
        return canonicalForms[0] || "";
      }
      const forms = [];
      if (Array.isArray(resultFrame.surfaceForms)) {
        forms.push(...resultFrame.surfaceForms);
      }
      if (resultFrame.surface) {
        forms.push(resultFrame.surface);
      }
      return forms.map(entry => normalizeNuclearClauseShellSurface(entry)).filter(entry => entry && !entry.includes("/"))[0] || "";
    }
    function resolveNuclearClauseShellText(input = null, fields = [], fallback = "") {
      const framedSurface = getNuclearClauseShellFramedSurface(input);
      if (framedSurface !== null) {
        return framedSurface;
      }
      const source = input && typeof input === "object" ? input : {};
      for (const field of fields) {
        const value = normalizeNuclearClauseShellSurface(source[field]);
        if (value) {
          return value;
        }
      }
      return normalizeNuclearClauseShellSurface(fallback);
    }
    function buildVerbalNuclearClauseFormulaEchoFromSlots(formulaSlots = null) {
      if (!formulaSlots || typeof formulaSlots !== "object") {
        return "";
      }
      const subject = getNuclearClauseFormulaSlot(formulaSlots, "pers1Pers2") || {};
      const object = getNuclearClauseFormulaSlot(formulaSlots, "obj1") || {};
      const object2 = getNuclearClauseFormulaSlot(formulaSlots, "obj2") || {};
      const object3 = getNuclearClauseFormulaSlot(formulaSlots, "obj3") || {};
      const reflexive = getNuclearClauseFormulaSlot(formulaSlots, "reflexivo") || {};
      const directional = getNuclearClauseFormulaSlot(formulaSlots, "directional") || {};
      const predicate = getNuclearClauseFormulaSlot(formulaSlots, "predicateStem") || {};
      const tense = getNuclearClauseFormulaSlot(formulaSlots, "tensePosition") || {};
      const numberConnector = getNuclearClauseFormulaSlot(formulaSlots, "num1Num2") || {};
      const subjectDisplay = String(subject.displayPrefix || subject.prefix || "Ø") || "Ø";
      const subjectCaseDisplay = String(subject.displayCase || subject.case || subject.pers2 || "Ø") || "Ø";
      const objectDisplay = String(object.displayPrefix || object.prefix || "Ø") || "Ø";
      const object2Display = String(object2.displayPrefix || object2.prefix || "");
      const object3Display = String(object3.displayPrefix || object3.prefix || "");
      const reflexiveDisplay = String(reflexive.displayPrefix || reflexive.prefix || "");
      const directionalDisplay = String(directional.displayPrefix || directional.prefix || "");
      const rawPredicateDisplay = String(predicate.displayStem || predicate.stem || "∅") || "∅";
      const normalizedPredicateDisplay = rawPredicateDisplay.trim() || "∅";
      const predicateDisplay = normalizedPredicateDisplay.includes("(") && normalizedPredicateDisplay.includes(")") ? normalizedPredicateDisplay : `(${normalizedPredicateDisplay})`;
      const tenseDisplay = String(tense.displayMorph || tense.morph || tense.tenseMorph || tense.label || tense.tenseValue || "Ø") || "Ø";
      const rawNumberConnector = String(numberConnector.displayConnector || numberConnector.displaySurface || numberConnector.connector || numberConnector.surface || subject.suffix || "").trim();
      const numberConnectorDisplay = rawNumberConnector ? rawNumberConnector.includes("-") ? rawNumberConnector : `Ø-${rawNumberConnector}` : "Ø-Ø";
      const objectChain = [];
      if (object.prefix || object.displayPrefix && object.displayPrefix !== "Ø") {
        objectChain.push(objectDisplay);
      }
      if (object2.prefix || object2Display && object2Display !== "Ø") {
        objectChain.push(object2Display);
      }
      if (object3.prefix || object3Display && object3Display !== "Ø") {
        objectChain.push(object3Display);
      }
      if ((reflexive.prefix || reflexiveDisplay) && reflexiveDisplay !== "Ø" && reflexiveDisplay !== objectDisplay) {
        objectChain.push(reflexiveDisplay);
      }
      const prePredicateParts = [];
      const objectText = objectChain.join("-");
      const directionalText = directionalDisplay && directionalDisplay !== "Ø" ? directionalDisplay : "";
      if (directionalText && directional.position === "after-object" && objectText) {
        prePredicateParts.push(objectText, directionalText);
      } else {
        if (directionalText) {
          prePredicateParts.push(directionalText);
        }
        if (objectText) {
          prePredicateParts.push(objectText);
        }
      }
      const objectPart = prePredicateParts.length ? `+${prePredicateParts.join("+")}` : "";
      return `#${subjectDisplay}-${subjectCaseDisplay}${objectPart}${predicateDisplay}${tenseDisplay}+${numberConnectorDisplay}#`;
    }
    function buildVerbalNuclearClauseShell({
      subject = null,
      object = null,
      object2 = null,
      object3 = null,
      reflexive = null,
      directional = null,
      predicate = null,
      tenseValue = "",
      tenseLabel = "",
      usageRole = ""
    } = {}) {
      const subjectSlot = buildClauseParticipantSlot({
        slot: ANDREWS_NUCLEAR_SLOT.pers1Pers2,
        role: "subject",
        prefix: subject?.prefix ?? subject?.subjectPrefix ?? "",
        suffix: subject?.suffix ?? subject?.subjectSuffix ?? "",
        label: subject?.label || ""
      });
      const subjectNumberConnector = subject?.numberConnector ?? subject?.num1Num2 ?? subject?.suffix ?? subject?.subjectSuffix ?? "";
      const numberConnectorFrame = buildVncNumberConnectorSlot({
        subjectNumberConnector,
        subjectPrefix: subjectSlot.prefix,
        tenseValue,
        tenseLabel
      });
      const numberConnectorSlot = {
        slot: ANDREWS_NUCLEAR_SLOT.numberConnector,
        role: "subject-number-connector",
        connector: numberConnectorFrame.connector,
        displayConnector: numberConnectorFrame.displayConnector,
        num1: numberConnectorFrame.num1,
        num2: numberConnectorFrame.num2,
        belongsTo: "subject",
        notTense: true,
        andrewsSource: numberConnectorFrame.andrewsSource || "Andrews §5.4",
        connectorPattern: numberConnectorFrame.connectorPattern || ""
      };
      if (Array.isArray(numberConnectorFrame.connectorOptions) && numberConnectorFrame.connectorOptions.length) {
        numberConnectorSlot.connectorOptions = numberConnectorFrame.connectorOptions.slice();
      }
      if (Array.isArray(numberConnectorFrame.num1Options) && numberConnectorFrame.num1Options.length) {
        numberConnectorSlot.num1Options = numberConnectorFrame.num1Options.slice();
      }
      if (Array.isArray(numberConnectorFrame.num2Options) && numberConnectorFrame.num2Options.length) {
        numberConnectorSlot.num2Options = numberConnectorFrame.num2Options.slice();
      }
      if (numberConnectorFrame.connectorPattern) {
        numberConnectorSlot.connectorPattern = numberConnectorFrame.connectorPattern;
      }
      const objectPrefix = object?.prefix ?? object?.objectPrefix ?? "";
      const objectSlot = {
        slot: ANDREWS_NUCLEAR_SLOT.object1,
        role: "mainline-object",
        prefix: String(objectPrefix || ""),
        displayPrefix: String(objectPrefix || "") || "Ø",
        isPresent: Boolean(objectPrefix),
        label: object?.label || ""
      };
      const object2Prefix = object2?.prefix ?? object2?.obj2 ?? object?.obj2 ?? object?.indirectObjectMarker ?? "";
      const object2Slot = {
        slot: ANDREWS_NUCLEAR_SLOT.object2,
        role: "secondary-object",
        prefix: String(object2Prefix || ""),
        displayPrefix: String(object2Prefix || "") || "Ø",
        isPresent: Boolean(object2Prefix),
        label: object2?.label || ""
      };
      const object3Prefix = object3?.prefix ?? object3?.obj3 ?? object?.obj3 ?? object?.thirdObjectMarker ?? "";
      const object3Slot = {
        slot: ANDREWS_NUCLEAR_SLOT.object3,
        role: "tertiary-object",
        prefix: String(object3Prefix || ""),
        displayPrefix: String(object3Prefix || "") || "Ø",
        isPresent: Boolean(object3Prefix),
        label: object3?.label || ""
      };
      const reflexivePrefix = reflexive?.prefix ?? reflexive?.reflexivo ?? object?.reflexivo ?? "";
      const reflexiveSlot = {
        slot: ANDREWS_NUCLEAR_SLOT.reflexive,
        role: "reflexive-object",
        prefix: String(reflexivePrefix || ""),
        displayPrefix: String(reflexivePrefix || "") || "Ø",
        isPresent: Boolean(reflexivePrefix),
        label: reflexive?.label || ""
      };
      const directionalPrefix = directional?.prefix ?? directional?.directionalPrefix ?? "";
      const directionalSlot = {
        slot: "directional",
        role: "directional-prefix",
        prefix: String(directionalPrefix || ""),
        displayPrefix: String(directionalPrefix || "") || "Ø",
        isPresent: Boolean(directionalPrefix),
        position: String(directional?.position || "before-object"),
        sourceLesson: "Andrews Lesson 8",
        allomorphy: directional?.allomorphy || null,
        label: directional?.label || ""
      };
      const predicateStem = predicate?.stem ?? predicate?.verb ?? "";
      const predicateSlot = {
        slot: ANDREWS_NUCLEAR_SLOT.predicateStem,
        role: "verbal-predicate",
        stem: String(predicateStem || ""),
        displayStem: String(predicateStem || "") || "∅",
        valency: predicate?.valency || ""
      };
      const tenseProfile = getVncTenseProfile(tenseValue, tenseLabel);
      const tenseMorph = getVncTenseMorph(tenseProfile, numberConnectorFrame);
      const compatibilityTenseLabel = String(tenseLabel || tenseValue || "");
      const tenseSlot = {
        slot: ANDREWS_NUCLEAR_SLOT.tensePosition,
        role: "tense-position",
        tenseValue: String(tenseValue || ""),
        label: tenseProfile?.labelEs || compatibilityTenseLabel,
        compatibilityLabel: compatibilityTenseLabel,
        morph: tenseMorph,
        displayMorph: tenseMorph || compatibilityTenseLabel,
        mood: tenseProfile?.mood || "",
        andrewsTense: tenseProfile?.tense || "",
        isPresent: Boolean(tenseValue || tenseLabel),
        notAvailableInOrdinaryNnc: true,
        andrewsSource: tenseProfile?.sourceSection || "",
        compatibilityRoute: ""
      };
      const formulaSlots = {
        pers1Pers2: {
          ...subjectSlot,
          slot: ANDREWS_NUCLEAR_SLOT.pers1Pers2
        },
        obj1: {
          ...objectSlot,
          slot: ANDREWS_NUCLEAR_SLOT.object1
        },
        obj2: {
          ...object2Slot,
          slot: ANDREWS_NUCLEAR_SLOT.object2
        },
        obj3: {
          ...object3Slot,
          slot: ANDREWS_NUCLEAR_SLOT.object3
        },
        reflexivo: {
          ...reflexiveSlot,
          slot: ANDREWS_NUCLEAR_SLOT.reflexive
        },
        ...(directionalSlot.isPresent ? {
          directional: directionalSlot
        } : {}),
        predicateStem: {
          ...predicateSlot,
          slot: ANDREWS_NUCLEAR_SLOT.predicateStem
        },
        tensePosition: tenseSlot,
        num1Num2: numberConnectorSlot
      };
      const terminology = getNuclearClauseTerminologyForFormulaType(NUCLEAR_CLAUSE_FORMULA_TYPE.vnc);
      const predicatePositionStatus = inferVerbalPredicatePositionStatus({
        object,
        object2,
        object3,
        reflexive,
        predicate
      });
      const predicatePositionStatusSource = getVerbalPredicatePositionStatusSource({
        object,
        predicate
      });
      const lesson4 = buildNuclearClauseFrame({
        formulaType: NUCLEAR_CLAUSE_FORMULA_TYPE.vnc,
        predicatePositionStatus,
        predicatePositionStatusSource,
        usageRole,
        slots: formulaSlots
      });
      const formulaSchema = typeof targetObject.getAndrewsFormulaSlotSchema === "function" ? targetObject.getAndrewsFormulaSlotSchema("vnc-shell") : null;
      const formulaSlotTokenOverrides = predicatePositionStatus === "monadic" ? {
        valence: "va"
      } : {};
      return {
        formulaType: NUCLEAR_CLAUSE_FORMULA_TYPE.vnc,
        formulaAbbreviation: terminology.abbreviation,
        formulaLabel: getNuclearClauseFormulaLabel(NUCLEAR_CLAUSE_FORMULA_TYPE.vnc),
        terminology,
        formulaSchemaId: formulaSchema?.id || "vnc-shell",
        formulaSchemaVersion: formulaSchema?.version || 1,
        formulaSlotSource: "andrews-formula-slot-schema",
        formula: typeof targetObject.renderAndrewsFormulaTemplate === "function" ? targetObject.renderAndrewsFormulaTemplate(formulaSchema || "vnc-shell", {
          slotTokens: formulaSlotTokenOverrides
        }) : lesson4.activeFormula.formula,
        expandedFormula: VERBAL_NUCLEAR_CLAUSE_EXPANDED_COMPAT_FORMULA,
        formulaSlots,
        formulaEcho: buildVerbalNuclearClauseFormulaEchoFromSlots(formulaSlots),
        lesson4,
        predicatePositionStatus,
        predicatePositionStatusSource,
        predicateFunctionProfile: lesson4.predicateFunctionProfile,
        clauseUseFrame: lesson4.useFrame,
        diagramTree: lesson4.diagramTree,
        predicatePositionControl: lesson4.predicatePositionControl,
        organizationalLayers: lesson4.organizationalLayers,
        personalPronounFrame: lesson4.personalPronounFrame,
        hasTensePosition: true,
        slots: {
          pers1Pers2: subjectSlot,
          obj1: objectSlot,
          obj2: object2Slot,
          obj3: object3Slot,
          reflexivo: reflexiveSlot,
          ...(directionalSlot.isPresent ? {
            directional: directionalSlot
          } : {}),
          predicateStem: predicateSlot,
          tensePosition: tenseSlot,
          num1Num2: numberConnectorSlot
        }
      };
    }
    function buildNominalNuclearClauseShell({
      subject = null,
      predicate = null,
      formulaSlots = null,
      formulaEcho = "",
      predicateState = "",
      usageRole = ""
    } = {}) {
      const subjectSource = getNuclearClauseFormulaSlot(formulaSlots, "pers1Pers2") || subject || {};
      const predicateSource = getNuclearClauseFormulaSlot(formulaSlots, "predicateStem") || predicate || {};
      const connectorSource = getNuclearClauseFormulaSlot(formulaSlots, "num1Num2") || {};
      const resolvedPredicateState = String(predicateSource.state || predicate?.state || predicateState || "");
      const formulaSchemaId = resolvedPredicateState === "possessive" ? "possessive-state-nnc" : "ordinary-nnc-shell";
      const formulaSchema = typeof targetObject.getAndrewsFormulaSlotSchema === "function" ? targetObject.getAndrewsFormulaSlotSchema(formulaSchemaId) : null;
      const connectorDefinition = typeof targetObject.getAndrewsFormulaSlotDefinition === "function" ? targetObject.getAndrewsFormulaSlotDefinition(formulaSchemaId, "num1-num2") : null;
      const subjectSlot = buildClauseParticipantSlot({
        slot: subjectSource.slot || ANDREWS_NUCLEAR_SLOT.pers1Pers2,
        role: "subject",
        prefix: subjectSource.prefix || subjectSource.subjectPrefix || "",
        suffix: subjectSource.suffix || subjectSource.subjectSuffix || "",
        label: subjectSource.label || ""
      });
      const predicateStem = resolveNuclearClauseShellText(predicateSource, ["stem", "surface"], predicate?.stem || "");
      const predicateFormulaDisplayStem = resolveNuclearClauseShellText(predicateSource, ["formulaDisplayStem"], "");
      const predicateSlot = {
        slot: predicateSource.slot || ANDREWS_NUCLEAR_SLOT.predicateStem,
        role: "nominal-predicate",
        stem: String(predicateStem || ""),
        displayStem: String(predicateFormulaDisplayStem || predicateStem || "") || "∅",
        state: predicateSource.state || predicateState || "unknown",
        stateSlot: predicateSource.stateSlot || null
      };
      const connectorSlot = {
        slot: connectorSource.slot || ANDREWS_NUCLEAR_SLOT.numberConnector,
        role: "subject-number-connector",
        formulaSchemaId: formulaSchema?.id || "ordinary-nnc-shell",
        formulaSlot: connectorDefinition?.id || "num1-num2",
        slotPath: connectorDefinition?.path || "subject.num1-num2",
        connector: resolveNuclearClauseShellText(connectorSource, ["connector", "surface"], ""),
        displayConnector: resolveNuclearClauseShellText(connectorSource, ["displayConnector", "displaySurface", "connector"], "Ø") || "Ø",
        nounClass: connectorSource.nounClass || "",
        compactDisplay: connectorSource.compactDisplay,
        compactSurface: connectorSource.compactSurface,
        num1: connectorSource.num1,
        num2: connectorSource.num2,
        displayNum1: connectorSource.displayNum1,
        displayNum2: connectorSource.displayNum2,
        displayDyad: connectorSource.displayDyad,
        dyadSource: connectorSource.dyadSource,
        blockedInterpretations: Array.isArray(connectorDefinition?.blockedInterpretations) ? Array.from(connectorDefinition.blockedInterpretations) : ["tense", "stem-suffix", "nounstem", "predicate-state"],
        notLexicalSuffix: true,
        notStemSuffix: true,
        notTense: true
      };
      const compactEcho = formulaEcho || (typeof targetObject.renderAndrewsFormulaEchoFromSchema === "function" ? targetObject.renderAndrewsFormulaEchoFromSchema("ordinary-nnc-shell", {
        pers1Pers2: subjectSlot,
        predicateStem: predicateSlot,
        num1Num2: connectorSlot
      }) : `#${subjectSlot.displayPrefix}-${subjectSlot.displaySuffix}(${predicateSlot.displayStem})${connectorSlot.displayConnector}#`);
      const fullEcho = connectorSlot.displayDyad && typeof targetObject.renderAndrewsFormulaEchoFromSchema === "function" ? targetObject.renderAndrewsFormulaEchoFromSchema("ordinary-nnc-shell", {
        pers1Pers2: subjectSlot,
        predicateStem: predicateSlot,
        num1Num2: {
          ...connectorSlot,
          displayConnector: connectorSlot.displayConnector,
          displayDyad: connectorSlot.displayDyad
        }
      }) : compactEcho;
      const terminology = getNuclearClauseTerminologyForFormulaType(NUCLEAR_CLAUSE_FORMULA_TYPE.nnc);
      const predicatePositionStatus = inferNominalPredicatePositionStatus({
        predicate,
        formulaSlots,
        predicateState
      });
      const predicatePositionStatusSource = getNominalPredicatePositionStatusSource({
        predicate,
        formulaSlots
      });
      const lesson4Slots = {
        pers1Pers2: subjectSlot,
        predicateStem: predicateSlot,
        num1Num2: connectorSlot
      };
      const lesson4 = buildNuclearClauseFrame({
        formulaType: NUCLEAR_CLAUSE_FORMULA_TYPE.nnc,
        predicatePositionStatus,
        predicatePositionStatusSource,
        usageRole,
        slots: lesson4Slots
      });
      const formulaSlotTokenOverrides = formulaSchemaId === "possessive-state-nnc" && String(predicateSlot.stateSlot?.predicatePositionStatus || predicatePositionStatus || "") === "monadic" ? {
        possessiveState: "st"
      } : {};
      return {
        formulaType: NUCLEAR_CLAUSE_FORMULA_TYPE.nnc,
        formulaAbbreviation: terminology.abbreviation,
        formulaLabel: getNuclearClauseFormulaLabel(NUCLEAR_CLAUSE_FORMULA_TYPE.nnc),
        terminology,
        formulaSchemaId: formulaSchema?.id || formulaSchemaId,
        formulaSchemaVersion: formulaSchema?.version || 1,
        formulaSlotSource: "andrews-formula-slot-schema",
        formula: typeof targetObject.renderAndrewsFormulaTemplate === "function" ? targetObject.renderAndrewsFormulaTemplate(formulaSchema || formulaSchemaId, {
          slotTokens: formulaSlotTokenOverrides
        }) : lesson4.activeFormula.formula,
        expandedFormula: NOMINAL_NUCLEAR_CLAUSE_EXPANDED_COMPAT_FORMULA,
        formulaSlots: lesson4Slots,
        formulaEcho: compactEcho,
        fullFormulaEcho: fullEcho,
        compactFormulaEcho: compactEcho,
        lesson4,
        predicatePositionStatus,
        predicatePositionStatusSource,
        predicateFunctionProfile: lesson4.predicateFunctionProfile,
        clauseUseFrame: lesson4.useFrame,
        diagramTree: lesson4.diagramTree,
        predicatePositionControl: lesson4.predicatePositionControl,
        organizationalLayers: lesson4.organizationalLayers,
        personalPronounFrame: lesson4.personalPronounFrame,
        hasTensePosition: false,
        slots: lesson4Slots
      };
    }
    function buildNuclearClauseShellMetadata(options = {}) {
      const clauseKind = normalizeNuclearClauseKind(options.clauseKind || options.kind || options.tenseMode || "");
      const formulaType = getNuclearClauseFormulaType(clauseKind);
      const terminology = getNuclearClauseTerminologyForFormulaType(formulaType);
      const formulaAbbreviation = terminology.abbreviation || "CN";
      const payload = clauseKind === NUCLEAR_CLAUSE_KIND.verbal ? buildVerbalNuclearClauseShell(options) : clauseKind === NUCLEAR_CLAUSE_KIND.nominal ? buildNominalNuclearClauseShell(options) : {
        formulaType,
        formulaAbbreviation,
        formulaLabel: getNuclearClauseFormulaLabel(formulaType),
        terminology,
        formula: "",
        formulaEcho: "",
        lesson4: null,
        predicateFunctionProfile: getNuclearClausePredicateFunctionProfile(formulaType),
        clauseUseFrame: buildNuclearClauseUseFrame({
          usageRole: options.usageRole || ""
        }),
        diagramTree: null,
        predicatePositionControl: null,
        organizationalLayers: [],
        personalPronounFrame: getNuclearClausePersonalPronounFrame(),
        hasTensePosition: null,
        slots: {}
      };
      const shell = {
        kind: "nuclear-clause-shell",
        version: NUCLEAR_CLAUSE_SHELL_VERSION,
        source: "Andrews Lesson 4 structural analogy",
        targetAuthority: "typed Andrews source model plus Classical boundary realization",
        clauseKind,
        terminology,
        formulaAbbreviation,
        formulaLabel: getNuclearClauseFormulaLabel(formulaType),
        displayLabel: formulaType === NUCLEAR_CLAUSE_FORMULA_TYPE.unknown ? getNuclearClauseDisplayLabel(formulaType) : getNuclearClauseDisplayLabel(formulaType),
        generationAllowed: false,
        ...payload,
        antiConflationRules: Array.from(NUCLEAR_CLAUSE_ANTI_CONFLATION_RULES)
      };
      return attachNuclearClauseGrammarContract(shell, {
        metadataKind: "nuclear-clause-shell",
        routeStage: "classify-shell",
        sourceInput: shell.formulaEcho || shell.formula || shell.clauseKind,
        supported: formulaType !== NUCLEAR_CLAUSE_FORMULA_TYPE.unknown,
        nuclearClauseFrame: {
          clauseKind,
          formulaType,
          formulaAbbreviation,
          formulaLabel: getNuclearClauseFormulaLabel(formulaType),
          terminology,
          displayLabel: shell.displayLabel,
          formulaSchemaId: shell.formulaSchemaId || "",
          formulaSchemaVersion: shell.formulaSchemaVersion || null,
          formulaSlotSource: shell.formulaSlotSource || "",
          formula: shell.formula,
          expandedFormula: shell.expandedFormula || "",
          formulaEcho: shell.formulaEcho,
          fullFormulaEcho: shell.fullFormulaEcho || "",
          compactFormulaEcho: shell.compactFormulaEcho || "",
          lesson4: shell.lesson4 || null,
          predicatePositionStatus: shell.predicatePositionStatus || "",
          predicatePositionStatusSource: shell.predicatePositionStatusSource || "",
          predicateFunctionProfile: shell.predicateFunctionProfile || null,
          clauseUseFrame: shell.clauseUseFrame || null,
          diagramTree: shell.diagramTree || null,
          predicatePositionControl: shell.predicatePositionControl || null,
          organizationalLayers: shell.organizationalLayers || [],
          personalPronounFrame: shell.personalPronounFrame || null,
          hasTensePosition: shell.hasTensePosition,
          slots: shell.slots
        },
        participantFrame: {
          subject: shell.slots?.pers1Pers2 || null,
          object: shell.slots?.obj1 || null
        },
        inflectionFrame: {
          tense: shell.slots?.tensePosition || null,
          hasTensePosition: shell.hasTensePosition
        },
        targetContract: {
          metadataKind: "nuclear-clause-shell",
          generationAllowed: false,
          formulaType,
          clauseKind
        }
      });
    }

    const api = {};
    Object.defineProperty(api, "NUCLEAR_CLAUSE_SHELL_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_SHELL_VERSION; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_KIND", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_KIND; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_FORMULA_TYPE", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_FORMULA_TYPE; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_TERMINOLOGY_FALLBACK", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_TERMINOLOGY_FALLBACK; },
    });
    Object.defineProperty(api, "ANDREWS_NUCLEAR_SLOT", {
        configurable: true,
        enumerable: true,
        get() { return ANDREWS_NUCLEAR_SLOT; },
    });
    Object.defineProperty(api, "VERBAL_NUCLEAR_CLAUSE_EXPANDED_COMPAT_FORMULA", {
        configurable: true,
        enumerable: true,
        get() { return VERBAL_NUCLEAR_CLAUSE_EXPANDED_COMPAT_FORMULA; },
    });
    Object.defineProperty(api, "NOMINAL_NUCLEAR_CLAUSE_EXPANDED_COMPAT_FORMULA", {
        configurable: true,
        enumerable: true,
        get() { return NOMINAL_NUCLEAR_CLAUSE_EXPANDED_COMPAT_FORMULA; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_PREDICATE_POSITION_STATUS; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_LESSON4_USAGE_ROLE", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_LESSON4_USAGE_ROLE; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_LESSON4_USAGE_OPTIONS", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_LESSON4_USAGE_OPTIONS; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_LESSON4_STAGE_1_FORMULA", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_LESSON4_STAGE_1_FORMULA; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_LESSON4_STAGE_2_FORMULAS", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_LESSON4_STAGE_2_FORMULAS; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_LESSON4_STAGE_3_FORMULAS", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_LESSON4_STAGE_3_FORMULAS; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_LESSON4_VOCABLE_SCOPE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_LESSON4_VOCABLE_SCOPE_FRAME; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_LESSON4_FORMULA_BOUNDARY_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_LESSON4_FORMULA_BOUNDARY_FRAME; },
    });
    Object.defineProperty(api, "LESSON5_FUTURE_PRETERIT_CONNECTOR_OPTIONS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON5_FUTURE_PRETERIT_CONNECTOR_OPTIONS; },
    });
    Object.defineProperty(api, "LESSON5_FUTURE_PRETERIT_NUM1_OPTIONS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON5_FUTURE_PRETERIT_NUM1_OPTIONS; },
    });
    Object.defineProperty(api, "LESSON5_FUTURE_PRETERIT_NUM2_OPTIONS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON5_FUTURE_PRETERIT_NUM2_OPTIONS; },
    });
    Object.defineProperty(api, "LESSON5_MAIN_INDICATIVE_CONNECTOR_OPTIONS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON5_MAIN_INDICATIVE_CONNECTOR_OPTIONS; },
    });
    Object.defineProperty(api, "LESSON5_MAIN_INDICATIVE_NUM1_OPTIONS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON5_MAIN_INDICATIVE_NUM1_OPTIONS; },
    });
    Object.defineProperty(api, "LESSON5_MAIN_INDICATIVE_NUM2_OPTIONS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON5_MAIN_INDICATIVE_NUM2_OPTIONS; },
    });
    Object.defineProperty(api, "LESSON5_NONPAST_OPTATIVE_CONNECTOR_OPTIONS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON5_NONPAST_OPTATIVE_CONNECTOR_OPTIONS; },
    });
    Object.defineProperty(api, "LESSON5_NONPAST_OPTATIVE_NUM1_OPTIONS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON5_NONPAST_OPTATIVE_NUM1_OPTIONS; },
    });
    Object.defineProperty(api, "LESSON5_NONPAST_OPTATIVE_NUM2_OPTIONS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON5_NONPAST_OPTATIVE_NUM2_OPTIONS; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_LESSON4_SUBJECT_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_LESSON4_SUBJECT_FRAME; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_LESSON4_POSITION_COMPLEXITY_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_LESSON4_POSITION_COMPLEXITY_FRAME; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_LESSON4_LAYER_PROFILES", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_LESSON4_LAYER_PROFILES; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_PERSONAL_PRONOUN_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_PERSONAL_PRONOUN_FRAME; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_LESSON4_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_LESSON4_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_LESSON4_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_LESSON4_SUBSECTION_INVENTORY; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_POSSESSIVE_PREFIX_FEATURES", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_POSSESSIVE_PREFIX_FEATURES; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_ANTI_CONFLATION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_ANTI_CONFLATION_RULES; },
    });
    Object.defineProperty(api, "LESSON5_VNC_TENSE_PROFILE_BY_TENSE", {
        configurable: true,
        enumerable: true,
        get() { return LESSON5_VNC_TENSE_PROFILE_BY_TENSE; },
    });
    api.getVncTenseProfile = getVncTenseProfile;
    api.hasLesson5VncPluralConnector = hasLesson5VncPluralConnector;
    api.getVncTenseMorph = getVncTenseMorph;
    api.resolveLesson5VncProfileConnector = resolveLesson5VncProfileConnector;
    api.buildVncNumberConnectorSlot = buildVncNumberConnectorSlot;
    api.getNuclearClauseFormulaSlot = getNuclearClauseFormulaSlot;
    api.normalizeNuclearClauseKind = normalizeNuclearClauseKind;
    api.getNuclearClauseFormulaType = getNuclearClauseFormulaType;
    api.getNuclearClauseTerminologyForFormulaType = getNuclearClauseTerminologyForFormulaType;
    api.getNuclearClauseFormulaAbbreviation = getNuclearClauseFormulaAbbreviation;
    api.getNuclearClauseFormulaLabel = getNuclearClauseFormulaLabel;
    api.getNuclearClauseDisplayLabel = getNuclearClauseDisplayLabel;
    api.normalizeNuclearClauseFormulaType = normalizeNuclearClauseFormulaType;
    api.normalizeNuclearClausePredicatePositionStatus = normalizeNuclearClausePredicatePositionStatus;
    api.getNuclearClausePredicatePositionLabel = getNuclearClausePredicatePositionLabel;
    api.getNuclearClausePredicatePositionStatusLabel = getNuclearClausePredicatePositionStatusLabel;
    api.getNuclearClausePredicatePositionSlotLabel = getNuclearClausePredicatePositionSlotLabel;
    api.normalizeNuclearClauseUsageRole = normalizeNuclearClauseUsageRole;
    api.getNuclearClauseUsageOptionLabel = getNuclearClauseUsageOptionLabel;
    api.buildNuclearClauseFormulaRecord = buildNuclearClauseFormulaRecord;
    api.getNuclearClauseFormulaInventory = getNuclearClauseFormulaInventory;
    api.getNuclearClauseOrganizationalLayers = getNuclearClauseOrganizationalLayers;
    api.cloneNuclearClausePositionComplexityFrame = cloneNuclearClausePositionComplexityFrame;
    api.cloneNuclearClauseCategoryFeatures = cloneNuclearClauseCategoryFeatures;
    api.getNuclearClausePersonalPronounFrame = getNuclearClausePersonalPronounFrame;
    api.getNuclearClauseSubsectionInventory = getNuclearClauseSubsectionInventory;
    api.getNuclearClausePredicateFunctionProfile = getNuclearClausePredicateFunctionProfile;
    api.buildNuclearClauseUseFrame = buildNuclearClauseUseFrame;
    api.buildNuclearClausePredicatePositionControlFrame = buildNuclearClausePredicatePositionControlFrame;
    api.buildNuclearClauseDiagramTree = buildNuclearClauseDiagramTree;
    api.normalizeNuclearClausePronounNumber = normalizeNuclearClausePronounNumber;
    api.getNuclearClausePronounPersonLabel = getNuclearClausePronounPersonLabel;
    api.getNuclearClausePronounNumberLabel = getNuclearClausePronounNumberLabel;
    api.getNuclearClauseSubjectPronounFeatures = getNuclearClauseSubjectPronounFeatures;
    api.getNuclearClauseObjectPronounFeatures = getNuclearClauseObjectPronounFeatures;
    api.getNuclearClausePossessivePronounFeatures = getNuclearClausePossessivePronounFeatures;
    api.getNuclearClausePossessivePrefixFromSlot = getNuclearClausePossessivePrefixFromSlot;
    api.buildNuclearClausePersonalPronounFillerRecord = buildNuclearClausePersonalPronounFillerRecord;
    api.buildNuclearClausePersonalPronounResolutionFrame = buildNuclearClausePersonalPronounResolutionFrame;
    api.getNuclearClauseStatusSourceLabel = getNuclearClauseStatusSourceLabel;
    api.buildNuclearClauseFrame = buildNuclearClauseFrame;
    api.inferVerbalPredicatePositionStatus = inferVerbalPredicatePositionStatus;
    Object.defineProperty(api, "LESSON6_SPECIFIC_PROJECTIVE_OBJECT_PREFIXES", {
        configurable: true,
        enumerable: true,
        get() { return LESSON6_SPECIFIC_PROJECTIVE_OBJECT_PREFIXES; },
    });
    Object.defineProperty(api, "LESSON6_NONSPECIFIC_PROJECTIVE_OBJECT_PREFIXES", {
        configurable: true,
        enumerable: true,
        get() { return LESSON6_NONSPECIFIC_PROJECTIVE_OBJECT_PREFIXES; },
    });
    Object.defineProperty(api, "LESSON6_MONADIC_OBJECT_PREFIXES", {
        configurable: true,
        enumerable: true,
        get() { return LESSON6_MONADIC_OBJECT_PREFIXES; },
    });
    Object.defineProperty(api, "LESSON6_MAINLINE_REFLEXIVE_OBJECT_PREFIXES", {
        configurable: true,
        enumerable: true,
        get() { return LESSON6_MAINLINE_REFLEXIVE_OBJECT_PREFIXES; },
    });
    Object.defineProperty(api, "LESSON6_CLASSICAL_VALENCE_GOVERNING_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return LESSON6_CLASSICAL_VALENCE_GOVERNING_INVENTORY; },
    });
    Object.defineProperty(api, "LESSON6_CLASSICAL_VALENCE_GOVERNING_SURFACE_FRAMES", {
        configurable: true,
        enumerable: true,
        get() { return LESSON6_CLASSICAL_VALENCE_GOVERNING_SURFACE_FRAMES; },
    });
    api.cloneLesson6Frame = cloneLesson6Frame;
    api.getClassicalValenceGoverningInventory = getClassicalValenceGoverningInventory;
    api.buildClassicalReflexiveGoverningFrame = buildClassicalReflexiveGoverningFrame;
    api.buildClassicalValenceGoverningFrame = buildClassicalValenceGoverningFrame;
    api.getVerbalObjectPositionStatus = getVerbalObjectPositionStatus;
    api.getVerbalPredicatePositionStatusSource = getVerbalPredicatePositionStatusSource;
    api.inferNominalPredicatePositionStatus = inferNominalPredicatePositionStatus;
    api.getNominalPredicatePositionStatusSource = getNominalPredicatePositionStatusSource;
    api.buildClauseParticipantSlot = buildClauseParticipantSlot;
    api.getNuclearClauseShellResultFrame = getNuclearClauseShellResultFrame;
    api.normalizeNuclearClauseShellSurface = normalizeNuclearClauseShellSurface;
    api.splitNuclearClauseShellSurfaceText = splitNuclearClauseShellSurfaceText;
    api.getNuclearClauseShellCanonicalRealizationSurfaceForms = getNuclearClauseShellCanonicalRealizationSurfaceForms;
    api.getNuclearClauseShellSelectedRealizationVariant = getNuclearClauseShellSelectedRealizationVariant;
    api.getNuclearClauseShellFramedSurface = getNuclearClauseShellFramedSurface;
    api.resolveNuclearClauseShellText = resolveNuclearClauseShellText;
    api.buildVerbalNuclearClauseFormulaEchoFromSlots = buildVerbalNuclearClauseFormulaEchoFromSlots;
    api.buildVerbalNuclearClauseShell = buildVerbalNuclearClauseShell;
    api.buildNominalNuclearClauseShell = buildNominalNuclearClauseShell;
    api.buildNuclearClauseShellMetadata = buildNuclearClauseShellMetadata;
    return api;
}

export function installClauseGlobals(targetObject = globalThis, installationContext = null) {
    const api = createClauseModule(targetObject, installationContext);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
