// Canonical modern ESM module.

export function createConjunctionClauseGlobals(targetObject = globalThis, installationContext = null) {
    const grammarFrameOwnerCapability = installationContext?.grammarFrameOwnerCapability || null;
    const CONJUNCTION_CLAUSE_BOUNDARY_VERSION = 1;
    const issuedClassicalNahuatlClauseConjunctionResults = new WeakSet();
    const CONJUNCTION_CLAUSE_RELATION = Object.freeze({
      marked: "marked",
      unmarked: "unmarked",
      correlative: "correlative",
      parallelStructure: "parallel-structure",
      lexicalInnovation: "lexical-innovation",
      unknown: "unknown"
    });
    const CONJUNCTION_CLAUSE_COORDINATION_TYPE = Object.freeze({
      additive: "additive",
      alternative: "alternative",
      adversative: "adversative",
      unknown: "unknown"
    });
    const CONJUNCTION_CLAUSE_UNIT = Object.freeze({
      word: "word",
      nnc: "nnc",
      vnc: "vnc",
      clause: "clause",
      sentence: "sentence",
      unknown: "unknown"
    });
    const CONJUNCTION_CLAUSE_LEVEL = Object.freeze({
      principal: "principal-clause-level",
      adjoined: "adjoined-clause-level",
      lexicalUnit: "lexical-unit-level",
      particleUnit: "particle-unit-level",
      unknown: "unknown"
    });
    const CONJUNCTION_CLAUSE_MARKING = Object.freeze({
      unmarked: "unmarked",
      auh: "auh",
      adverbialModifier: "adverbial-modifier",
      correlativeParticle: "correlative-particle",
      unknown: "unknown"
    });
    const CONJUNCTION_CLAUSE_PARALLELISM = Object.freeze({
      none: "none",
      rephrasive: "rephrasive",
      progressive: "progressive",
      appositive: "appositive",
      combined: "combined",
      unknown: "unknown"
    });
    const CONJUNCTION_CLAUSE_LEXICAL_INNOVATION = Object.freeze({
      none: "none",
      biclausalism: "biclausalism",
      triclausalism: "triclausalism",
      conjunctiveCompound: "conjunctive-compound",
      derivedSurvival: "derived-survival",
      unknown: "unknown"
    });
    const CONJUNCTION_CLAUSE_FALSE_POSITIVE_SOURCE = Object.freeze({
      parserSeparator: "parser-separator",
      slashVariant: "slash-variant",
      csvVariant: "csv-variant",
      particleLabel: "particle-label",
      conjunctionTranslation: "conjunction-translation",
      routeLabel: "route-label",
      singleGeneratedWord: "single-generated-word",
      roadmapText: "roadmap-text",
      unknown: "unknown"
    });
    const CONJUNCTION_CLAUSE_ANTI_CONFLATION_RULES = Object.freeze(["conjunction boundary metadata is not generation", "parser separators and slash variants are not conjunction AST evidence", "CSV alternants are not clause-level conjunction evidence", "particle or translation labels are not typed Classical conjunction evidence", "single generated words do not prove marked, unmarked, correlative, or parallel conjunction", "Andrews conjunction categories govern Classical grammar; labels do not authorize surface realization"]);
    const CONJUNCTION_CLAUSE_STRUCTURAL_QUESTIONS = Object.freeze([Object.freeze({
      field: "conjuncts",
      asks: "Which Classical words, NNCs, VNCs, clauses, or sentences are conjoined?"
    }), Object.freeze({
      field: "marker",
      asks: "What Andrews marker model or orthographic absence is evidenced?"
    }), Object.freeze({
      field: "conjunctionRelation",
      asks: "Is the relation marked, unmarked, correlative, parallel, lexicalized, or unknown?"
    }), Object.freeze({
      field: "unitType",
      asks: "Are the conjuncts words, NNCs, VNCs, clauses, sentences, or unknown?"
    }), Object.freeze({
      field: "parallelism",
      asks: "What evidence supports parallel structure or lexical innovation by conjunction?"
    }), Object.freeze({
      field: "evidenceSource",
      asks: "What Andrews source model or user-provided clause context supports conjunction?"
    })]);
    function normalizeConjunctionClauseEnum(value = "", allowedValues = [], fallback = "unknown") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      return allowedValues.includes(normalized) ? normalized : fallback;
    }
    function normalizeConjunctionClauseRelation(value = "") {
      return normalizeConjunctionClauseEnum(value, Object.values(CONJUNCTION_CLAUSE_RELATION), CONJUNCTION_CLAUSE_RELATION.unknown);
    }
    function normalizeConjunctionClauseCoordinationType(value = "") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      const aliases = {
        and: CONJUNCTION_CLAUSE_COORDINATION_TYPE.additive,
        or: CONJUNCTION_CLAUSE_COORDINATION_TYPE.alternative,
        but: CONJUNCTION_CLAUSE_COORDINATION_TYPE.adversative
      };
      return aliases[normalized] || normalizeConjunctionClauseEnum(normalized, Object.values(CONJUNCTION_CLAUSE_COORDINATION_TYPE), CONJUNCTION_CLAUSE_COORDINATION_TYPE.unknown);
    }
    function normalizeConjunctionClauseUnit(value = "") {
      return normalizeConjunctionClauseEnum(value, Object.values(CONJUNCTION_CLAUSE_UNIT), CONJUNCTION_CLAUSE_UNIT.unknown);
    }
    function normalizeConjunctionClauseLevel(value = "") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      const aliases = {
        principal: CONJUNCTION_CLAUSE_LEVEL.principal,
        adjoined: CONJUNCTION_CLAUSE_LEVEL.adjoined,
        adjunct: CONJUNCTION_CLAUSE_LEVEL.adjoined,
        lexical: CONJUNCTION_CLAUSE_LEVEL.lexicalUnit,
        "lexical-unit": CONJUNCTION_CLAUSE_LEVEL.lexicalUnit,
        particle: CONJUNCTION_CLAUSE_LEVEL.particleUnit
      };
      return aliases[normalized] || normalizeConjunctionClauseEnum(normalized, Object.values(CONJUNCTION_CLAUSE_LEVEL), CONJUNCTION_CLAUSE_LEVEL.unknown);
    }
    function normalizeConjunctionClauseMarking(value = "") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      const aliases = {
        "": CONJUNCTION_CLAUSE_MARKING.unmarked,
        none: CONJUNCTION_CLAUSE_MARKING.unmarked,
        unmarked: CONJUNCTION_CLAUSE_MARKING.unmarked,
        marked: CONJUNCTION_CLAUSE_MARKING.auh,
        auh: CONJUNCTION_CLAUSE_MARKING.auh,
        auj: CONJUNCTION_CLAUSE_MARKING.auh,
        ihuan: CONJUNCTION_CLAUSE_MARKING.adverbialModifier,
        ijuan: CONJUNCTION_CLAUSE_MARKING.adverbialModifier,
        "no": CONJUNCTION_CLAUSE_MARKING.adverbialModifier,
        oc: CONJUNCTION_CLAUSE_MARKING.adverbialModifier,
        "no-zo": CONJUNCTION_CLAUSE_MARKING.adverbialModifier,
        ahzo: CONJUNCTION_CLAUSE_MARKING.correlativeParticle,
        "ahzo-ahzo": CONJUNCTION_CLAUSE_MARKING.correlativeParticle,
        "ahmo-no": CONJUNCTION_CLAUSE_MARKING.correlativeParticle
      };
      return aliases[normalized] || normalizeConjunctionClauseEnum(normalized, Object.values(CONJUNCTION_CLAUSE_MARKING), CONJUNCTION_CLAUSE_MARKING.unknown);
    }
    function normalizeConjunctionClauseParallelism(value = "") {
      return normalizeConjunctionClauseEnum(value, Object.values(CONJUNCTION_CLAUSE_PARALLELISM), CONJUNCTION_CLAUSE_PARALLELISM.unknown);
    }
    function normalizeConjunctionClauseLexicalInnovation(value = "") {
      const normalized = String(value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");
      const aliases = {
        none: CONJUNCTION_CLAUSE_LEXICAL_INNOVATION.none,
        biclausal: CONJUNCTION_CLAUSE_LEXICAL_INNOVATION.biclausalism,
        biclausalism: CONJUNCTION_CLAUSE_LEXICAL_INNOVATION.biclausalism,
        triclausal: CONJUNCTION_CLAUSE_LEXICAL_INNOVATION.triclausalism,
        triclausalism: CONJUNCTION_CLAUSE_LEXICAL_INNOVATION.triclausalism,
        compound: CONJUNCTION_CLAUSE_LEXICAL_INNOVATION.conjunctiveCompound,
        derived: CONJUNCTION_CLAUSE_LEXICAL_INNOVATION.derivedSurvival
      };
      return aliases[normalized] || normalizeConjunctionClauseEnum(normalized, Object.values(CONJUNCTION_CLAUSE_LEXICAL_INNOVATION), CONJUNCTION_CLAUSE_LEXICAL_INNOVATION.unknown);
    }
    function normalizeConjunctionClauseFalsePositiveSource(value = "") {
      return normalizeConjunctionClauseEnum(value, Object.values(CONJUNCTION_CLAUSE_FALSE_POSITIVE_SOURCE), CONJUNCTION_CLAUSE_FALSE_POSITIVE_SOURCE.unknown);
    }
    function getConjunctionClauseAntiConflationRules() {
      return Array.from(CONJUNCTION_CLAUSE_ANTI_CONFLATION_RULES);
    }
    function getConjunctionClauseStructuralQuestions() {
      return CONJUNCTION_CLAUSE_STRUCTURAL_QUESTIONS.map(question => ({
        ...question
      }));
    }
    function attachConjunctionClauseGrammarContract(record = null, options = {}) {
      if (typeof targetObject.attachGrammarMetadataContract !== "function") {
        return record;
      }
      return targetObject.attachGrammarMetadataContract(record, {
        enumerable: false,
        unitKind: "conjunction-clause-boundary",
        routeFamily: "conjunction-clause",
        ...options
      }, grammarFrameOwnerCapability);
    }
    const CLAUSE_CONJUNCTION_VALIDATION_REFS = Object.freeze(["src/tests/classical_lessons51_52_closure.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    const CLAUSE_CONJUNCTION_CANVAS_REFS = Object.freeze(["Andrews Lesson 52.1", "Andrews Lesson 52.2", "Andrews Lesson 52.3", "Andrews Lesson 52.4", "Andrews Lesson 52.5", "Andrews Lesson 52.6", "Andrews Lesson 52.7"]);
    const CLAUSE_CONJUNCTION_ARCHITECTURE_EVIDENCE_FRAME = Object.freeze({
      kind: "clause-conjunction-architecture-evidence-frame",
      sourceSection: "Andrews 52.1",
      specialConcatenateStructure: true,
      balancedRelation: true,
      noHead: true,
      conjunctsSameSyntacticRank: true,
      usualConjunctUnits: Object.freeze(["nuclear-clause", "nuclear-clause-group"]),
      exceptionalParticleUnit: "za zan",
      levels: Object.freeze([CONJUNCTION_CLAUSE_LEVEL.principal, CONJUNCTION_CLAUSE_LEVEL.adjoined]),
      relationTypes: Object.freeze([CONJUNCTION_CLAUSE_COORDINATION_TYPE.additive, CONJUNCTION_CLAUSE_COORDINATION_TYPE.alternative, CONJUNCTION_CLAUSE_COORDINATION_TYPE.adversative]),
      markednessTypes: Object.freeze([CONJUNCTION_CLAUSE_RELATION.marked, CONJUNCTION_CLAUSE_RELATION.unmarked]),
      unmarkedPreferred: true
    });
    const CLAUSE_CONJUNCTION_UNMARKED_EVIDENCE_FRAME = Object.freeze({
      kind: "clause-conjunction-unmarked-evidence-frame",
      sourceSection: "Andrews 52.2",
      structure: "juxtaposed nuclear clauses or nuclear-clause groups",
      explicitConjunctorRequired: false,
      relationInferredFromContent: true,
      additive: Object.freeze({
        sourceSection: "Andrews 52.2.1",
        positiveAndNegativeSeries: true,
        sharedSupplementUsuallyAfterLastConjunct: true,
        canOperateAtPrincipalAndAdjoinedLevels: true,
        tightSeriesModifierMayAppearBeforeFirstConjunctOnly: true
      }),
      alternative: Object.freeze({
        sourceSection: "Andrews 52.2.2",
        juxtaposedAlternatives: true,
        adverbialParticlesMaySupportTranslation: true
      }),
      adversative: Object.freeze({
        sourceSection: "Andrews 52.2.3",
        exactlyTwoConjuncts: true,
        counterbalancedPositiveNegativeContent: true
      })
    });
    const CLAUSE_CONJUNCTION_MARKED_EVIDENCE_FRAME = Object.freeze({
      kind: "clause-conjunction-marked-evidence-frame",
      sourceSection: "Andrews 52.3",
      classicalConjunctor: "auh",
      classicalVisibleSpellingRequiresTypedBoundary: true,
      principalClauseOrSentenceLevelUsual: true,
      adjunctLevelPossibleButUnusual: true,
      sentenceInitialAuhCanClaimRightwardConjunctStatus: true,
      additive: Object.freeze({
        sourceSection: "Andrews 52.3.1",
        usesAuh: true
      }),
      alternative: Object.freeze({
        sourceSection: "Andrews 52.3.2",
        usesAuh: true
      }),
      adversative: Object.freeze({
        sourceSection: "Andrews 52.3.3",
        usesAuh: true
      })
    });
    const CLAUSE_CONJUNCTION_ADVERBIAL_MODIFIER_EVIDENCE_FRAME = Object.freeze({
      kind: "clause-conjunction-adverbial-modifier-evidence-frame",
      sourceSection: "Andrews 52.4",
      notConjunctors: true,
      mayAccompanyMarkedOrUnmarkedConjunction: true,
      additive: Object.freeze({
        sourceSection: "Andrews 52.4.1",
        rightwardModifiers: Object.freeze(["no", "oc", "oc no"]),
        ihuanIsPossessiveStateRelationalNnc: true,
        ihuanIsNotConjunctor: true,
        ihuanClassicalVisibleSpellingRequiresTypedBoundary: true,
        negativeModifiers: Object.freeze(["ahno", "ahmo no", "no zo", "no zo eh", "ma no zo", "ma no zo eh"]),
        auhCanCooccurWithAdverbialModifier: true
      }),
      alternative: Object.freeze({
        sourceSection: "Andrews 52.4.2",
        rightwardParticlesAndCollocations: Object.freeze(["ahzo", "ahzo eh", "no zo", "no zo eh", "ma no zo", "ma no zo eh", "ahno zo", "ahno zo eh"]),
        oftenPrecededByIn: true,
        markedAuhMayCooccur: true
      }),
      adversative: Object.freeze({
        sourceSection: "Andrews 52.4.3",
        rightwardModifiers: Object.freeze(["zan", "tel", "yeceh", "yeh", "neh"]),
        yehOrNehMayBeIntroducedByIn: true,
        markedAuhMayCooccur: true
      })
    });
    const CLAUSE_CONJUNCTION_CORRELATIVE_EVIDENCE_FRAME = Object.freeze({
      kind: "clause-conjunction-correlative-evidence-frame",
      sourceSection: "Andrews 52.5",
      noConjunctorForEitherOr: true,
      standardCorrelation: Object.freeze({
        sourceSection: "Andrews 52.5.1",
        pairedParticles: Object.freeze(["ahzo ... ahzo", "ahzo eh ... ahzo eh", "ahzo ... ahzo no"]),
        negativePairing: "ahmo no ... ahmo no"
      }),
      looserCorrelation: Object.freeze({
        sourceSection: "Andrews 52.5.2",
        pairedAdverbialOrPronominalNncs: true,
        contrastiveConjunctRelation: true
      })
    });
    const CLAUSE_CONJUNCTION_LEXICAL_INNOVATION_EVIDENCE_FRAME = Object.freeze({
      kind: "clause-conjunction-lexical-innovation-evidence-frame",
      sourceSection: "Andrews 52.6",
      unmarkedConjunctionCanFuseNncsForLexicalItems: true,
      combinesNuclearClausesNotStems: true,
      metaphoricalDisplacementRequired: true,
      sameReferentAcrossConjoinedSubjectPronounsRequired: true,
      canTransformIntoConjunctiveCompoundNounstem: true,
      possessiveStateCanFormOnCompoundOrOnConjoinedStems: true,
      canSurviveFurtherDerivations: true,
      inUsuallyPrecedesEachNncWhenSupplementOrModifier: true,
      inMayPrecedeOnlyLeftwardConjunct: true,
      lordAndMasterType: Object.freeze({
        sourceSection: "Andrews 52.6.1",
        synonymousOrNearlySynonymousConjuncts: true,
        combinedMeaningUsuallyOneConjunctOrImplication: true
      }),
      breadAndButterType: Object.freeze({
        sourceSection: "Andrews 52.6.2",
        situationalAssociation: true,
        biclausalismOrTriclausalism: true,
        possessiveOnlyTendencies: true,
        affectiveFormationMustAppearOnAllStems: true,
        simpleConjunctionContrastRequired: true
      })
    });
    const CLAUSE_CONJUNCTION_PARALLEL_STRUCTURE_EVIDENCE_FRAME = Object.freeze({
      kind: "clause-conjunction-parallel-structure-evidence-frame",
      sourceSection: "Andrews 52.7",
      conjunctionCreatesParallelStructure: true,
      rephrasive: Object.freeze({
        sourceSection: "Andrews 52.7 item 1",
        staticRepetitionWithSlightlyDifferentForm: true,
        grammarMayStayOrChange: true,
        recastTypes: Object.freeze(["nonspecific-object/specific-object", "active/passive", "tense-shift", "incorporated-object/supplementary-object", "intransitive/reflexive-transitive"]),
        relatedAppositiveConstructions: Object.freeze(["clarifying-appositive", "summarizing-appositive"])
      }),
      progressive: Object.freeze({
        sourceSection: "Andrews 52.7 item 2",
        similarGrammarWithChangedContent: true,
        listlikeCollectionOfStatements: true
      }),
      combined: Object.freeze({
        sourceSection: "Andrews 52.7 item 3",
        rephrasiveAndProgressiveCanCombine: true
      })
    });
    const CLAUSE_CONJUNCTION_EVIDENCE_INVENTORY = Object.freeze([Object.freeze({
      id: "lesson52-conjunction-overview",
      andrewsSection: "52.1",
      category: "conjunction-architecture",
      directiveEs: "La conjuncion es concatenacion balanceada: no tiene nucleo y sus conjuntivos cooperan en el mismo rango.",
      engineSurface: "diagnostic conjunction frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson52-unmarked-overview",
      andrewsSection: "52.2",
      category: "unmarked-conjunction",
      directiveEs: "La conjuncion no marcada se lee por yuxtaposicion; el contenido decide si es aditiva, alternativa o adversativa.",
      engineSurface: "diagnostic unmarked-conjunction frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson52-unmarked-additive",
      andrewsSection: "52.2.1",
      category: "unmarked-additive",
      directiveEs: "La serie aditiva puede compartir suplemento y operar en nivel principal o adyacente.",
      engineSurface: "diagnostic unmarked-conjunction frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson52-unmarked-alternative",
      andrewsSection: "52.2.2",
      category: "unmarked-alternative",
      directiveEs: "La alternativa no marcada depende de la yuxtaposicion y de particulas adverbiales de apoyo.",
      engineSurface: "diagnostic unmarked-conjunction frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson52-unmarked-adversative",
      andrewsSection: "52.2.3",
      category: "unmarked-adversative",
      directiveEs: "La adversativa no marcada contrapone dos conjuntivos; no se modela como serie abierta.",
      engineSurface: "diagnostic unmarked-conjunction frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson52-marked-overview",
      andrewsSection: "52.3",
      category: "marked-conjunction",
      directiveEs: "La conjuncion marcada introduce auh en la fuente Andrews; la superficie clasica requiere realizacion de limite tipada.",
      engineSurface: "diagnostic marked-conjunction frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson52-marked-additive",
      andrewsSection: "52.3.1",
      category: "marked-additive",
      directiveEs: "Auh puede marcar una relacion aditiva entre oraciones o clausulas principales.",
      engineSurface: "diagnostic marked-conjunction frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson52-marked-alternative",
      andrewsSection: "52.3.2",
      category: "marked-alternative",
      directiveEs: "Auh tambien puede aparecer con alternativas, sin convertir particulas adverbiales en conjuntores.",
      engineSurface: "diagnostic marked-conjunction frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson52-marked-adversative",
      andrewsSection: "52.3.3",
      category: "marked-adversative",
      directiveEs: "Auh puede marcar una adversativa, usualmente en nivel principal o de oracion.",
      engineSurface: "diagnostic marked-conjunction frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson52-adverbial-modifier-overview",
      andrewsSection: "52.4",
      category: "adverbial-modifiers-near-conjunction",
      directiveEs: "Varias particulas o CNN adverbializadas parecen conjuncion en traduccion, pero Andrews las trata como modificadores.",
      engineSurface: "diagnostic adverbial-modifier frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson52-adverbial-additive",
      andrewsSection: "52.4.1",
      category: "additive-adverbial-modifiers",
      directiveEs: "No, oc, oc no e ihuan apoyan lectura aditiva; ihuan no es conjunctor.",
      engineSurface: "diagnostic adverbial-modifier frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson52-adverbial-additive-positive",
      andrewsSection: "52.4.1.a",
      category: "positive-additive-adverbial-modifiers",
      directiveEs: "No, oc, oc no e ihuan y sus colocaciones forman el inventario positivo sin convertirse en conjuntores.",
      engineSurface: "typed conjunction modifier operation",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson52-adverbial-additive-negative",
      andrewsSection: "52.4.1.b",
      category: "negative-additive-adverbial-modifiers",
      directiveEs: "Ahno, ahmo no y ma no zo forman el inventario negativo sin convertirse en conjuntores.",
      engineSurface: "typed conjunction modifier operation",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson52-adverbial-alternative",
      andrewsSection: "52.4.2",
      category: "alternative-adverbial-modifiers",
      directiveEs: "Ahzo y otras colocaciones apoyan lectura alternativa donde el ingles espera or.",
      engineSurface: "diagnostic adverbial-modifier frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson52-adverbial-alternative-unmarked",
      andrewsSection: "52.4.2.a",
      category: "unmarked-alternative-adverbial-modifiers",
      directiveEs: "La alternativa no marcada acepta el inventario adverbial tipado de Andrews.",
      engineSurface: "typed conjunction modifier operation",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson52-adverbial-alternative-marked",
      andrewsSection: "52.4.2.b",
      category: "marked-alternative-adverbial-modifiers",
      directiveEs: "La alternativa marcada combina auh con el modificador sin promoverlo a conjunctor.",
      engineSurface: "typed conjunction modifier operation",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson52-adverbial-adversative",
      andrewsSection: "52.4.3",
      category: "adversative-adverbial-modifiers",
      directiveEs: "Zan, tel, yeceh, yeh y neh apoyan adversativa, pero siguen siendo modificadores.",
      engineSurface: "diagnostic adverbial-modifier frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson52-adverbial-adversative-unmarked",
      andrewsSection: "52.4.3.a",
      category: "unmarked-adversative-adverbial-modifiers",
      directiveEs: "La adversativa no marcada acepta zan, tel, yeceh, yeh o neh como modificadores tipados.",
      engineSurface: "typed conjunction modifier operation",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson52-adverbial-adversative-marked",
      andrewsSection: "52.4.3.b",
      category: "marked-adversative-adverbial-modifiers",
      directiveEs: "La adversativa marcada conserva auh como conjunctor y el elemento adverbial como modificador.",
      engineSurface: "typed conjunction modifier operation",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson52-correlative-overview",
      andrewsSection: "52.5",
      category: "correlative-conjunction",
      directiveEs: "La correlacion no usa conjunctor para either-or; usa pares de particulas o CNN adverbiales/pronominales.",
      engineSurface: "diagnostic correlative-conjunction frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson52-correlative-standard",
      andrewsSection: "52.5.1",
      category: "standard-correlation",
      directiveEs: "La correlacion estandar repite particulas como ahzo...ahzo o ahmo no...ahmo no.",
      engineSurface: "diagnostic correlative-conjunction frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson52-correlative-loose",
      andrewsSection: "52.5.2",
      category: "loose-correlation",
      directiveEs: "La correlacion suelta empareja CNN adverbiales o pronominales para contrastar conjuntivos.",
      engineSurface: "diagnostic correlative-conjunction frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson52-lexical-innovation-overview",
      andrewsSection: "52.6",
      category: "lexical-innovation-by-conjunction",
      directiveEs: "La innovacion lexica fusiona CNN por conjuncion no marcada; no es compuesto de troncos.",
      engineSurface: "diagnostic lexical-innovation frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson52-lexical-lord-master",
      andrewsSection: "52.6.1",
      category: "lord-and-master-type",
      directiveEs: "El tipo lord-and-master une conjuntivos sinonimos o casi sinonimos.",
      engineSurface: "diagnostic lexical-innovation frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson52-lexical-bread-butter",
      andrewsSection: "52.6.2",
      category: "bread-and-butter-type",
      directiveEs: "El tipo bread-and-butter une referentes asociados, exige desplazamiento metaforico y referente compartido.",
      engineSurface: "diagnostic lexical-innovation frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson52-parallel-overview",
      andrewsSection: "52.7",
      category: "parallel-structure",
      directiveEs: "La estructura paralela es creada por conjuncion y se modela como refrasiva, progresiva o combinada.",
      engineSurface: "diagnostic parallel-structure frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson52-parallel-rephrasive",
      andrewsSection: "52.7.1",
      category: "rephrasive-parallelism",
      directiveEs: "El paralelismo refrasivo repite el contenido con forma algo distinta; puede cambiar la gramatica.",
      engineSurface: "diagnostic parallel-structure frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson52-parallel-clarifying-appositive",
      andrewsSection: "52.7.1.a",
      category: "clarifying-appositive-parallelism",
      directiveEs: "La aposicion aclaratoria agrega una reexpresion tipada del mismo contenido.",
      engineSurface: "typed parallel-structure operation",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson52-parallel-summarizing-appositive",
      andrewsSection: "52.7.1.b",
      category: "summarizing-appositive-parallelism",
      directiveEs: "La aposicion sumaria recoge los conjuntivos previos en una reexpresion tipada.",
      engineSurface: "typed parallel-structure operation",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson52-parallel-progressive",
      andrewsSection: "52.7.2",
      category: "progressive-parallelism",
      directiveEs: "El paralelismo progresivo mantiene forma gramatical similar mientras cambia el contenido.",
      engineSurface: "diagnostic parallel-structure frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    }), Object.freeze({
      id: "lesson52-parallel-combined",
      andrewsSection: "52.7.3",
      category: "combined-parallelism",
      directiveEs: "Las estructuras mas complejas combinan paralelismo refrasivo y progresivo.",
      engineSurface: "diagnostic parallel-structure frame",
      implementationState: "partial",
      redirectAction: "diagnostic-only"
    })]);
    function cloneClauseConjunctionEvidenceRecord(record) {
      if (!record || typeof record !== "object") {
        return record;
      }
      if (Array.isArray(record)) {
        return record.map(entry => cloneClauseConjunctionEvidenceRecord(entry));
      }
      return Object.fromEntries(Object.entries(record).map(([key, value]) => [key, cloneClauseConjunctionEvidenceRecord(value)]));
    }
    function getClauseConjunctionEvidenceInventory() {
      return CLAUSE_CONJUNCTION_EVIDENCE_INVENTORY.map(entry => ({
        ...entry,
        implementationState: "implemented",
        redirectAction: "canonical-typed-clause-composition",
        canvasRef: `Andrews Lesson ${entry.andrewsSection}`,
        evidenceStatus: "direct-canvas-complete",
        orthographyStatus: "canonical-classical-clause-realization",
        validationRefs: Array.from(CLAUSE_CONJUNCTION_VALIDATION_REFS)
      }));
    }
    function buildConjunctionClauseBoundaryMetadata() {
      return {
        kind: "conjunction-clause-boundary",
        version: CONJUNCTION_CLAUSE_BOUNDARY_VERSION,
        lesson: 52,
        status: "complete",
        structuralSource: "Andrews Lesson 52",
        targetAuthority: "signed canonical Classical NNC/VNC clause frames and signed prior composition results",
        generationAllowed: true,
        confirmedExamples: [],
        structuralQuestions: getConjunctionClauseStructuralQuestions(),
        boundaries: {
          hasParserSeparators: true,
          hasConjunctionAst: true,
          hasConfirmedClauseExamples: false,
          hasStaticConjunctionData: false,
          changesParserBehavior: false,
          changesVncGeneration: false,
          changesNncGeneration: false,
          changesRouteBehavior: false,
          treatsParserSeparatorsAsConjunctionEvidence: false,
          treatsTranslationsAsConjunctionEvidence: false
        },
        antiConflationRules: getConjunctionClauseAntiConflationRules()
      };
    }
    function getConjunctionClauseSurface(input = "", fallback = "") {
      if (typeof input === "string") {
        return String(input || fallback || "").trim();
      }
      if (!input || typeof input !== "object") {
        return String(fallback || "").trim();
      }
      const surface = getConjunctionClauseSurfaceForms(input)[0];
      if (getConjunctionClauseResultFrame(input)?.resultFrame) {
        return String(surface || "").trim();
      }
      return String(surface || fallback || "").trim();
    }
    function splitConjunctionClauseSurfaceText(value = "") {
      return String(value || "").split(/\s*\/\s*/g).map(entry => String(entry || "").trim()).filter(entry => entry && entry !== "—");
    }
    function getConjunctionClauseCanonicalRealizationSurfaceForms(resultFrame = null) {
      if (!resultFrame || typeof resultFrame !== "object") {
        return [];
      }
      const records = Array.isArray(resultFrame.formulaRealizationRecords) && resultFrame.formulaRealizationRecords.length ? resultFrame.formulaRealizationRecords : resultFrame.formulaRealizationRecord ? [resultFrame.formulaRealizationRecord] : [];
      return records.filter(record => record && typeof record === "object" && record.kind === "grammar-formula-realization-record").flatMap(record => [...(Array.isArray(record.surfaceForms) ? record.surfaceForms : []), record.surface || ""]).map(entry => String(entry || "").trim()).filter((entry, index, list) => entry && entry !== "—" && list.indexOf(entry) === index);
    }
    function getConjunctionClauseSelectedRealizationVariant(input = null) {
      if (!input || typeof input !== "object") {
        return null;
      }
      const grammarFrame = getConjunctionClauseResultFrame(input);
      const resultFrame = grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object" ? grammarFrame.resultFrame : null;
      if (!resultFrame) {
        return null;
      }
      const records = Array.isArray(resultFrame.formulaRealizationRecords) && resultFrame.formulaRealizationRecords.length ? resultFrame.formulaRealizationRecords : resultFrame.formulaRealizationRecord ? [resultFrame.formulaRealizationRecord] : [];
      for (const record of records) {
        if (!record || typeof record !== "object" || record.kind !== "grammar-formula-realization-record") {
          continue;
        }
        const surfaces = [...(Array.isArray(record.surfaceForms) ? record.surfaceForms : []), record.surface || ""].map(entry => String(entry || "").trim()).filter((entry, index, list) => entry && entry !== "—" && list.indexOf(entry) === index);
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
    function getConjunctionClauseResultFrame(input = null) {
      return (input?.grammarFrame && typeof input.grammarFrame === "object" ? input.grammarFrame : null) || (input?.frames && typeof input.frames === "object" ? input.frames : null);
    }
    function getConjunctionClauseSurfaceForms(input = null) {
      if (typeof input === "string") {
        return splitConjunctionClauseSurfaceText(input);
      }
      if (!input || typeof input !== "object") {
        return [];
      }
      const grammarFrame = getConjunctionClauseResultFrame(input);
      const frameResult = grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object" ? grammarFrame.resultFrame : null;
      const hasResultFrame = Boolean(frameResult);
      const canonicalForms = getConjunctionClauseCanonicalRealizationSurfaceForms(frameResult);
      if (canonicalForms.length) {
        return canonicalForms;
      }
      const forms = [];
      if (Array.isArray(frameResult?.surfaceForms)) {
        forms.push(...frameResult.surfaceForms);
      }
      if (frameResult?.surface) {
        forms.push(frameResult.surface);
      }
      if (hasResultFrame) {
        return forms.map(entry => String(entry || "").trim()).filter(entry => entry && entry !== "—" && !entry.includes("/")).filter((entry, index, list) => entry && list.indexOf(entry) === index);
      }
      if (!hasResultFrame && Array.isArray(input.surfaceForms)) {
        forms.push(...input.surfaceForms);
      }
      if (!hasResultFrame && input.surface) {
        forms.push(input.surface);
      }
      if (!hasResultFrame && input.surfaceDisplay) {
        forms.push(input.surfaceDisplay);
      }
      if (!hasResultFrame && input.result) {
        forms.push(input.result);
      }
      if (!hasResultFrame && input.word) {
        forms.push(input.word);
      }
      return forms.flatMap(entry => splitConjunctionClauseSurfaceText(entry)).filter((entry, index, list) => entry && list.indexOf(entry) === index);
    }
    function buildConjunctionClauseNode(input = "", index = 0, unitType = CONJUNCTION_CLAUSE_UNIT.unknown) {
      const surface = getConjunctionClauseSurface(input);
      const selectedVariant = getConjunctionClauseSelectedRealizationVariant(input);
      return {
        kind: "conjunction-clause-node",
        index,
        surface,
        ...(selectedVariant ? {
          selectedVariant,
          selectedVariantId: selectedVariant.selectedVariantId,
          formulaRealizationRecordId: selectedVariant.formulaRealizationRecordId,
          formulaRecordId: selectedVariant.formulaRecordId
        } : {}),
        unitType: normalizeConjunctionClauseUnit(typeof input === "object" && input ? input.unitType || input.clauseKind || unitType : unitType),
        clauseKind: typeof input === "object" && input ? String(input.clauseKind || input.nuclearClauseShell?.clauseKind || input.outputKind || "unknown") : "unknown",
        preservesSurface: true
      };
    }
    function buildConjunctionSurfaceSequence(conjunctNodes = [], marker = "", marking = CONJUNCTION_CLAUSE_MARKING.unmarked) {
      const surfaces = conjunctNodes.map(node => node.surface).filter(Boolean);
      const markerText = String(marker || "").trim();
      const normalizedMarking = normalizeConjunctionClauseMarking(marking || markerText);
      if (normalizedMarking === CONJUNCTION_CLAUSE_MARKING.auh && markerText && surfaces.length >= 2) {
        return surfaces.reduce((acc, surface, index) => {
          if (index > 0) acc.push(markerText);
          acc.push(surface);
          return acc;
        }, []);
      }
      if (normalizedMarking === CONJUNCTION_CLAUSE_MARKING.adverbialModifier && markerText && surfaces.length >= 2) {
        return surfaces.reduce((acc, surface, index) => {
          if (index > 0) acc.push(markerText);
          acc.push(surface);
          return acc;
        }, []);
      }
      if (normalizedMarking === CONJUNCTION_CLAUSE_MARKING.correlativeParticle && markerText && surfaces.length >= 2) {
        const markerParts = markerText.split(/\s*\.\.\.\s*/).map(part => part.trim()).filter(Boolean);
        if (markerParts.length >= 2) {
          return surfaces.reduce((acc, surface, index) => {
            acc.push(markerParts[Math.min(index, markerParts.length - 1)]);
            acc.push(surface);
            return acc;
          }, []);
        }
        return surfaces.reduce((acc, surface) => {
          acc.push(markerText);
          acc.push(surface);
          return acc;
        }, []);
      }
      return surfaces;
    }
    function buildConjunctionClauseAst({
      conjuncts = [],
      marker = "",
      conjunctionRelation = CONJUNCTION_CLAUSE_RELATION.unknown,
      coordinationType = CONJUNCTION_CLAUSE_COORDINATION_TYPE.unknown,
      unitType = CONJUNCTION_CLAUSE_UNIT.unknown,
      level = CONJUNCTION_CLAUSE_LEVEL.principal,
      marking = "",
      parallelism = CONJUNCTION_CLAUSE_PARALLELISM.none,
      lexicalInnovation = CONJUNCTION_CLAUSE_LEXICAL_INNOVATION.none,
      sharedSupplement = "",
      sharedReferent = false,
      evidenceSource = "",
      confirmed = false
    } = {}) {
      const normalizedRelation = normalizeConjunctionClauseRelation(conjunctionRelation);
      const normalizedCoordination = normalizeConjunctionClauseCoordinationType(coordinationType);
      const normalizedUnit = normalizeConjunctionClauseUnit(unitType);
      const normalizedLevel = normalizeConjunctionClauseLevel(level);
      const normalizedMarking = normalizeConjunctionClauseMarking(marking || marker);
      const normalizedParallelism = normalizeConjunctionClauseParallelism(parallelism);
      const normalizedLexicalInnovation = normalizeConjunctionClauseLexicalInnovation(lexicalInnovation);
      const inputConjuncts = Array.isArray(conjuncts) ? conjuncts : [conjuncts];
      const conjunctNodes = inputConjuncts.map((conjunct, index) => buildConjunctionClauseNode(conjunct, index, normalizedUnit));
      const diagnostics = [];
      if (conjunctNodes.filter(node => node.surface).length < 2) {
        diagnostics.push("conjunction-clause-requires-at-least-two-conjuncts");
      }
      if (normalizedRelation === CONJUNCTION_CLAUSE_RELATION.unknown) {
        diagnostics.push("conjunction-clause-relation-unconfirmed");
      }
      if (normalizedCoordination === CONJUNCTION_CLAUSE_COORDINATION_TYPE.unknown) {
        diagnostics.push("conjunction-clause-coordination-type-unconfirmed");
      }
      if (normalizedUnit === CONJUNCTION_CLAUSE_UNIT.unknown) {
        diagnostics.push("conjunction-clause-unit-unconfirmed");
      }
      if (normalizedLevel === CONJUNCTION_CLAUSE_LEVEL.unknown) {
        diagnostics.push("conjunction-clause-level-unconfirmed");
      }
      if (normalizedRelation === CONJUNCTION_CLAUSE_RELATION.marked && normalizedMarking !== CONJUNCTION_CLAUSE_MARKING.auh) {
        diagnostics.push("marked-conjunction-requires-structural-conjunctor");
      }
      if (normalizedRelation === CONJUNCTION_CLAUSE_RELATION.unmarked && normalizedMarking !== CONJUNCTION_CLAUSE_MARKING.unmarked && normalizedMarking !== CONJUNCTION_CLAUSE_MARKING.adverbialModifier) {
        diagnostics.push("unmarked-conjunction-should-not-use-structural-conjunctor");
      }
      if (normalizedCoordination === CONJUNCTION_CLAUSE_COORDINATION_TYPE.adversative && conjunctNodes.length !== 2) {
        diagnostics.push("adversative-conjunction-requires-two-conjuncts");
      }
      if (normalizedLexicalInnovation !== CONJUNCTION_CLAUSE_LEXICAL_INNOVATION.none && normalizedLexicalInnovation !== CONJUNCTION_CLAUSE_LEXICAL_INNOVATION.unknown && sharedReferent !== true) {
        diagnostics.push("lexical-conjoined-nnc-requires-shared-referent");
      }
      if (normalizedMarking === CONJUNCTION_CLAUSE_MARKING.adverbialModifier) {
        diagnostics.push("rightward-adverbial-modifier-is-not-conjunctor");
      }
      if (!String(evidenceSource || "").trim()) {
        diagnostics.push("conjunction-clause-source-gated");
      }
      const supported = Boolean(conjunctNodes.filter(node => node.surface).length >= 2 && normalizedRelation !== CONJUNCTION_CLAUSE_RELATION.unknown && normalizedCoordination !== CONJUNCTION_CLAUSE_COORDINATION_TYPE.unknown && normalizedUnit !== CONJUNCTION_CLAUSE_UNIT.unknown && normalizedLevel !== CONJUNCTION_CLAUSE_LEVEL.unknown && !diagnostics.includes("marked-conjunction-requires-structural-conjunctor") && !diagnostics.includes("unmarked-conjunction-should-not-use-structural-conjunctor") && !diagnostics.includes("adversative-conjunction-requires-two-conjuncts") && !diagnostics.includes("lexical-conjoined-nnc-requires-shared-referent"));
      const surfaceSequence = supported ? buildConjunctionSurfaceSequence(conjunctNodes, marker, normalizedMarking) : [];
      return targetObject.attachGrammarAstContract({
        kind: "conjunction-clause-ast",
        version: CONJUNCTION_CLAUSE_BOUNDARY_VERSION,
        lesson: 52,
        structuralSource: "Andrews Lesson 52",
        targetAuthority: "Classical Andrews transcription",
        supported,
        confirmed: confirmed === true && Boolean(String(evidenceSource || "").trim()),
        conjunctionRelation: normalizedRelation,
        coordinationType: normalizedCoordination,
        unitType: normalizedUnit,
        level: normalizedLevel,
        marker: String(marker || ""),
        marking: {
          value: normalizedMarking,
          markerIsStructuralConjunctor: normalizedMarking === CONJUNCTION_CLAUSE_MARKING.auh,
          adverbialModifierNotConjunctor: normalizedMarking === CONJUNCTION_CLAUSE_MARKING.adverbialModifier,
          unmarkedPreferred: true
        },
        conjuncts: conjunctNodes,
        balanced: {
          noHead: true,
          sameSyntacticRank: true,
          subordinateRelation: false
        },
        sharedSupplement: String(sharedSupplement || ""),
        lexicalInnovation: {
          type: normalizedLexicalInnovation,
          sharedReferentRequired: normalizedLexicalInnovation !== CONJUNCTION_CLAUSE_LEXICAL_INNOVATION.none && normalizedLexicalInnovation !== CONJUNCTION_CLAUSE_LEXICAL_INNOVATION.unknown,
          sharedReferent: sharedReferent === true,
          metaphoricalDisplacement: normalizedLexicalInnovation === CONJUNCTION_CLAUSE_LEXICAL_INNOVATION.biclausalism || normalizedLexicalInnovation === CONJUNCTION_CLAUSE_LEXICAL_INNOVATION.triclausalism,
          canBecomeCompoundNounstem: normalizedLexicalInnovation === CONJUNCTION_CLAUSE_LEXICAL_INNOVATION.biclausalism || normalizedLexicalInnovation === CONJUNCTION_CLAUSE_LEXICAL_INNOVATION.conjunctiveCompound
        },
        parallelism: {
          type: normalizedParallelism,
          rephrasesContent: normalizedParallelism === CONJUNCTION_CLAUSE_PARALLELISM.rephrasive || normalizedParallelism === CONJUNCTION_CLAUSE_PARALLELISM.combined,
          progressesContent: normalizedParallelism === CONJUNCTION_CLAUSE_PARALLELISM.progressive || normalizedParallelism === CONJUNCTION_CLAUSE_PARALLELISM.combined,
          appositive: normalizedParallelism === CONJUNCTION_CLAUSE_PARALLELISM.appositive
        },
        surfaceSequence,
        surface: surfaceSequence.join(" "),
        evidenceSource: String(evidenceSource || ""),
        changesClassicalSurfaceForms: false,
        changesParserBehavior: false,
        newWordGenerationAllowed: false,
        generationAllowed: false,
        diagnostics,
        boundary: buildConjunctionClauseBoundaryMetadata()
      }, {
        astKind: "conjunction-clause-ast",
        lessons: [52],
        structuralSource: "Andrews Lesson 52"
      }, grammarFrameOwnerCapability);
    }
    const CLASSICAL_NAHUATL_CLAUSE_CONJUNCTION_LCM_AXES = Object.freeze([
      Object.freeze({ axisId: "balanced-rank", licensedValues: Object.freeze(["no-head", "same-syntactic-rank", "no-subordination"]) }),
      Object.freeze({ axisId: "conjunct-unit", licensedValues: Object.freeze(["nuclear-clause", "nuclear-clause-group", "exceptional-particle-unit-za-zan"]) }),
      Object.freeze({ axisId: "conjunction-level", licensedValues: Object.freeze(["principal", "adjoined"]) }),
      Object.freeze({ axisId: "coordination-semantics", licensedValues: Object.freeze(["additive", "alternative", "adversative"]) }),
      Object.freeze({ axisId: "markedness", licensedValues: Object.freeze(["unmarked-asyndeton", "marked-auh"]) }),
      Object.freeze({ axisId: "unmarked-additive-shape", licensedValues: Object.freeze(["pair", "series", "positive", "negative"]) }),
      Object.freeze({ axisId: "shared-supplement", licensedValues: Object.freeze(["subject", "object", "possessor", "mixed-role", "normally-after-last-conjunct"]) }),
      Object.freeze({ axisId: "adjoined-conjunction-function", licensedValues: Object.freeze(["supplementary-object", "supplementary-subject", "adverbial-adjunct", "adjectival-modifier"]) }),
      Object.freeze({ axisId: "nested-conjunction-levels", licensedValues: Object.freeze(["principal-plus-adjoined"]) }),
      Object.freeze({ axisId: "shared-modifier-scope", licensedValues: Object.freeze(["before-first-applies-to-all"]) }),
      Object.freeze({ axisId: "unmarked-alternative", licensedValues: Object.freeze(["pair", "series"]) }),
      Object.freeze({ axisId: "adversative-arity", licensedValues: Object.freeze(["exactly-two"]) }),
      Object.freeze({ axisId: "marked-auh-placement", licensedValues: Object.freeze(["between-principal-clauses", "between-sentences", "unusual-adjoined"]) }),
      Object.freeze({ axisId: "sentence-initial-auh", licensedValues: Object.freeze(["right-conjunct-with-present-left", "right-conjunct-with-absent-left"]) }),
      Object.freeze({ axisId: "adverbial-modifier-status", licensedValues: Object.freeze(["modifier-not-conjunctor", "may-accompany-marked", "may-accompany-unmarked"]) }),
      Object.freeze({ axisId: "additive-modifier-inventory", licensedValues: Object.freeze(["nō", "oc", "oc-nō", "īhuān", "oc-īhuān", "nō-īhuān", "oc-nō-īhuān"]) }),
      Object.freeze({ axisId: "ihuan-structure", licensedValues: Object.freeze(["possessive-relational-nnc", "left-state-of-affairs-antecedent", "explicit-right-head", "proxy-principal-with-silent-head"]) }),
      Object.freeze({ axisId: "negative-additive-modifier-inventory", licensedValues: Object.freeze(["ahnō", "ahmō-nō", "nō-zo", "nō-zo-eh", "mā-nō-zo", "mā-nō-zo-eh"]) }),
      Object.freeze({ axisId: "alternative-modifier-inventory", licensedValues: Object.freeze(["ahzo", "ahzo-eh", "nō-zo", "nō-zo-eh", "mā-nō-zo", "mā-nō-zo-eh", "ahnō-zo", "ahnō-zo-eh"]) }),
      Object.freeze({ axisId: "adversative-modifier-inventory", licensedValues: Object.freeze(["zan", "tēl", "yēceh", "yeh", "neh"]) }),
      Object.freeze({ axisId: "modifier-adjunctor-interaction", licensedValues: Object.freeze(["optional-in-before-alternative", "optional-in-before-yeh-or-neh", "auh-plus-modifier"]) }),
      Object.freeze({ axisId: "standard-correlation", licensedValues: Object.freeze(["ahzo-ahzo", "ahzo-eh-ahzo-eh", "ahzo-ahzo-nō", "ahmō-nō-ahmō-nō"]) }),
      Object.freeze({ axisId: "loose-correlation", licensedValues: Object.freeze(["paired-adverbial-nncs", "paired-pronominal-nncs"]) }),
      Object.freeze({ axisId: "lexical-conjunction-arity", licensedValues: Object.freeze(["biclausalism", "triclausalism"]) }),
      Object.freeze({ axisId: "lexical-conjunction-reference", licensedValues: Object.freeze(["same-subject-referent-required", "sex-different-stems-still-share-person-number"]) }),
      Object.freeze({ axisId: "lexical-conjunction-semantics", licensedValues: Object.freeze(["lord-and-master", "bread-and-butter", "metaphorical-displacement-required"]) }),
      Object.freeze({ axisId: "lexical-conjunction-state", licensedValues: Object.freeze(["possessive-on-compound", "possessive-on-conjoined-stems", "possessive-only-tendency"]) }),
      Object.freeze({ axisId: "lexical-conjunction-downstream", licensedValues: Object.freeze(["conjunctive-compound-handoff", "survives-incorporation", "survives-verbstem-derivation"]) }),
      Object.freeze({ axisId: "lexical-conjunction-adjunctor", licensedValues: Object.freeze(["in-before-each", "in-before-left-only", "none"]) }),
      Object.freeze({ axisId: "lexical-conjunction-affective", licensedValues: Object.freeze(["none", "all-members"]) }),
      Object.freeze({ axisId: "lexical-vs-literal-conjunction", licensedValues: Object.freeze(["metaphorical-lexeme", "simple-nonmetaphorical-conjunction"]) }),
      Object.freeze({ axisId: "parallel-structure-type", licensedValues: Object.freeze(["rephrasive", "progressive", "combined"]) }),
      Object.freeze({ axisId: "rephrasive-recast", licensedValues: Object.freeze(["nonspecific-specific-object", "active-passive", "tense-shift", "incorporated-supplementary-object", "intransitive-reflexive-transitive"]) }),
      Object.freeze({ axisId: "appositive-parallelism", licensedValues: Object.freeze(["clarifying", "summarizing"]) }),
      Object.freeze({ axisId: "progressive-parallelism", licensedValues: Object.freeze(["similar-grammar-changed-content", "listlike-statements"]) })
    ]);
    const CLASSICAL_NAHUATL_CLAUSE_CONJUNCTION_LCM_PROJECTION_IDENTITY =
      "classical-nahuatl-clause-conjunction-owner-selected-lcm-projection";
    const CLASSICAL_NAHUATL_CLAUSE_CONJUNCTION_PROJECTED_AXIS_IDS = Object.freeze([
      "balanced-rank",
      "markedness",
      "unmarked-additive-shape",
      "nested-conjunction-levels",
      "unmarked-alternative",
      "adversative-arity",
      "marked-auh-placement",
      "sentence-initial-auh",
      "adverbial-modifier-status",
      "ihuan-structure",
      "negative-additive-modifier-inventory",
      "modifier-adjunctor-interaction",
      "loose-correlation",
      "lexical-conjunction-reference",
      "lexical-conjunction-state",
      "lexical-vs-literal-conjunction",
      "progressive-parallelism"
    ]);
    const CLASSICAL_NAHUATL_CLAUSE_CONJUNCTION_OPERATION_OPTION_FIELDS = Object.freeze({
      conjunction: Object.freeze([
        "relation",
        "coordinationType",
        "level",
        "polarity",
        "rightwardModifier",
        "modifierAdjunctor",
        "sharedModifierScope",
        "sharedModifier",
        "leftContextAbsent",
        "markedAdjoinedException",
        "adjoinedFunction"
      ]),
      "correlative-conjunction": Object.freeze([
        "correlationType",
        "pattern",
        "level"
      ]),
      "lexical-conjunction": Object.freeze([
        "lexicalType",
        "adjunctorDistribution",
        "stateRealization"
      ]),
      "parallel-structure": Object.freeze([
        "parallelType",
        "rephraseAxis",
        "appositiveType",
        "level"
      ])
    });
    const CLASSICAL_NAHUATL_CLAUSE_CONJUNCTION_FORBIDDEN_AUTHORITY_FIELDS =
      Object.freeze([
        "answer",
        "evidenceSource",
        "formula",
        "lesson",
        "lessonId",
        "lessonNumber",
        "result",
        "selectedResult",
        "storedAnswer",
        "storedResult",
        "surface"
      ]);
    const CLASSICAL_NAHUATL_CLAUSE_CONJUNCTION_MODIFIERS = Object.freeze({
      additive: Object.freeze({
        "": "",
        no: "nō",
        oc: "oc",
        "oc-no": "oc nō",
        ihuan: "īhuān",
        "oc-ihuan": "oc īhuān",
        "no-ihuan": "nō īhuān",
        "oc-no-ihuan": "oc nō īhuān",
        ahno: "ahnō",
        "ahmo-no": "ahmō nō",
        "no-zo": "nō zo",
        "no-zo-eh": "nō zo eh",
        "ma-no-zo": "mā nō zo",
        "ma-no-zo-eh": "mā nō zo eh"
      }),
      alternative: Object.freeze({
        "": "",
        ahzo: "ahzo",
        "ahzo-eh": "ahzo eh",
        "no-zo": "nō zo",
        "no-zo-eh": "nō zo eh",
        "ma-no-zo": "mā nō zo",
        "ma-no-zo-eh": "mā nō zo eh",
        "ahno-zo": "ahnō zo",
        "ahno-zo-eh": "ahnō zo eh"
      }),
      adversative: Object.freeze({
        "": "",
        zan: "zan",
        tel: "tēl",
        yeceh: "yēceh",
        yeh: "yeh",
        neh: "neh"
      })
    });
    const CLASSICAL_NAHUATL_CLAUSE_CONJUNCTION_SHARED_MODIFIERS = Object.freeze({
      "": Object.freeze({ surface: "", formula: "" }),
      none: Object.freeze({ surface: "", formula: "" }),
      ah: Object.freeze({ surface: "ah", formula: "ah#" }),
      aic: Object.freeze({ surface: "aīc", formula: "ah + īc" })
    });
    const CLASSICAL_NAHUATL_CLAUSE_CONJUNCTION_CORRELATIVE_PATTERNS = Object.freeze({
      "ahzo-ahzo": Object.freeze(["ahzo", "ahzo"]),
      "ahzo-eh-ahzo-eh": Object.freeze(["ahzo eh", "ahzo eh"]),
      "ahzo-ahzo-no": Object.freeze(["ahzo", "ahzo nō"]),
      "ahmo-no-ahmo-no": Object.freeze(["ahmō nō", "ahmō nō"])
    });
    const CLASSICAL_NAHUATL_CLAUSE_CONJUNCTION_REPHRASE_AXES = Object.freeze([
      "nonspecific-specific-object",
      "active-passive",
      "tense-shift",
      "incorporated-supplementary-object",
      "intransitive-reflexive-transitive"
    ]);

    function freezeClassicalNahuatlClauseConjunction(value) {
      if (
        !value
        || typeof value !== "object"
        || Object.isFrozen(value)
      ) return value;
      if (Array.isArray(value)) return Object.freeze(value.map(freezeClassicalNahuatlClauseConjunction));
      return Object.freeze(Object.fromEntries(Object.entries(value).map(
        ([key, child]) => [key, freezeClassicalNahuatlClauseConjunction(child)]
      )));
    }
    function stableStringifyClassicalNahuatlClauseConjunction(value) {
      if (Array.isArray(value)) return `[${value.map(stableStringifyClassicalNahuatlClauseConjunction).join(",")}]`;
      if (value && typeof value === "object") {
        return `{${Object.keys(value).filter(key => value[key] !== undefined).sort().map(
          key => `${JSON.stringify(key)}:${stableStringifyClassicalNahuatlClauseConjunction(value[key])}`
        ).join(",")}}`;
      }
      return JSON.stringify(value);
    }
    function signClassicalNahuatlClauseConjunction(value, prefix) {
      const serialized = stableStringifyClassicalNahuatlClauseConjunction(value);
      let hash = 2166136261;
      for (let index = 0; index < serialized.length; index += 1) {
        hash ^= serialized.charCodeAt(index);
        hash = Math.imul(hash, 16777619);
      }
      return `${prefix}:${(hash >>> 0).toString(16).padStart(8, "0")}`;
    }
    function normalizeClassicalNahuatlClauseConjunctionToken(value = "") {
      return String(value || "").trim().toLowerCase().replace(/[_\s]+/gu, "-");
    }
    function normalizeClassicalNahuatlClauseConjunctionSurface(value = "") {
      return String(value || "").trim().replace(/[.?!]+$/u, "");
    }
    function realizeClassicalNahuatlClauseConjunctionSentence(sequence = []) {
      const text = sequence.map(normalizeClassicalNahuatlClauseConjunctionSurface).filter(Boolean).join(" ").trim();
      if (!text) return "";
      const initial = text.search(/\p{L}/u);
      const capitalized = initial < 0
        ? text
        : `${text.slice(0, initial)}${text[initial].toLocaleUpperCase("nah")}${text.slice(initial + 1)}`;
      return `${capitalized}.`;
    }
    function buildClassicalNahuatlClauseConjunctionSelectedLcmProjection({
      operationKind = "",
      conjuncts = [],
      relationFrame = {},
      extra = {},
    } = {}) {
      const selectedValues = {};
      const ownerSourcePaths = {};
      const select = (axisId, selectedValue, ownerSourcePath) => {
        const axis = CLASSICAL_NAHUATL_CLAUSE_CONJUNCTION_LCM_AXES.find(
          candidate => candidate.axisId === axisId
        );
        if (
          !CLASSICAL_NAHUATL_CLAUSE_CONJUNCTION_PROJECTED_AXIS_IDS.includes(axisId)
          || !axis?.licensedValues?.includes(selectedValue)
        ) return;
        selectedValues[axisId] = selectedValue;
        ownerSourcePaths[axisId] = ownerSourcePath;
      };
      select("balanced-rank", "no-head", "balancedRelation.noHead");
      if (operationKind === "conjunction") {
        select(
          "markedness",
          relationFrame.unmarkedAsyndeton
            ? "unmarked-asyndeton"
            : relationFrame.marker === "auh"
              ? "marked-auh"
              : "",
          relationFrame.unmarkedAsyndeton
            ? "relationFrame.unmarkedAsyndeton"
            : "relationFrame.marker"
        );
        if (
          relationFrame.unmarkedAsyndeton
          && relationFrame.coordinationType === "additive"
        ) {
          select(
            "unmarked-additive-shape",
            conjuncts.length === 2 ? "pair" : "series",
            "conjuncts.length"
          );
        }
        const conjunctLevels = new Set(
          conjuncts.map(node => node?.relationFrame?.level).filter(Boolean)
        );
        if (
          conjunctLevels.has("principal")
          && conjunctLevels.has("adjoined")
        ) {
          select(
            "nested-conjunction-levels",
            "principal-plus-adjoined",
            "conjuncts[].relationFrame.level"
          );
        }
        if (
          relationFrame.unmarkedAsyndeton
          && relationFrame.coordinationType === "alternative"
        ) {
          select(
            "unmarked-alternative",
            conjuncts.length === 2 ? "pair" : "series",
            "conjuncts.length"
          );
        }
        if (
          relationFrame.coordinationType === "adversative"
          && conjuncts.length === 2
        ) {
          select(
            "adversative-arity",
            "exactly-two",
            "conjuncts.length"
          );
        }
        if (relationFrame.marker === "auh") {
          select(
            "marked-auh-placement",
            relationFrame.level === "adjoined"
              ? "unusual-adjoined"
              : "between-principal-clauses",
            "relationFrame.level"
          );
          select(
            "sentence-initial-auh",
            relationFrame.leftContextAbsent
              ? "right-conjunct-with-absent-left"
              : "right-conjunct-with-present-left",
            "relationFrame.leftContextAbsent"
          );
        }
        if (relationFrame.modifierIsConjunctor === false) {
          select(
            "adverbial-modifier-status",
            "modifier-not-conjunctor",
            "relationFrame.modifierIsConjunctor"
          );
        }
        if (
          relationFrame.ihuanPossessorAntecedent
            === "leftward-state-of-affairs"
        ) {
          select(
            "ihuan-structure",
            "left-state-of-affairs-antecedent",
            "relationFrame.ihuanPossessorAntecedent"
          );
        }
        if (
          relationFrame.polarity === "negative"
          && relationFrame.rightwardModifierSurface
        ) {
          select(
            "negative-additive-modifier-inventory",
            relationFrame.rightwardModifierSurface.replaceAll(" ", "-"),
            "relationFrame.rightwardModifierSurface"
          );
        }
        if (relationFrame.modifierAdjunctor === "in") {
          select(
            "modifier-adjunctor-interaction",
            relationFrame.coordinationType === "alternative"
              ? "optional-in-before-alternative"
              : ["yeh", "neh"].includes(relationFrame.rightwardModifier)
                ? "optional-in-before-yeh-or-neh"
                : relationFrame.marker === "auh"
                  ? "auh-plus-modifier"
                  : "",
            "relationFrame.modifierAdjunctor"
          );
        }
      }
      if (
        operationKind === "correlative-conjunction"
        && relationFrame.correlationType === "loose"
        && conjuncts.every(node => node?.unitKind === "nnc")
      ) {
        select(
          "loose-correlation",
          "paired-adverbial-nncs",
          "relationFrame.correlationType"
        );
      }
      if (operationKind === "lexical-conjunction") {
        if (relationFrame.sameSubjectReferent) {
          select(
            "lexical-conjunction-reference",
            "same-subject-referent-required",
            "relationFrame.sameSubjectReferent"
          );
        }
        select(
          "lexical-conjunction-state",
          relationFrame.stateRealization === "compound-handoff"
            ? "possessive-on-compound"
            : relationFrame.stateRealization === "conjoined-stems"
              ? "possessive-on-conjoined-stems"
              : "",
          "relationFrame.stateRealization"
        );
        if (
          relationFrame.metaphoricalDisplacement
          && relationFrame.simpleLiteralConjunctionRemainsSeparate
        ) {
          select(
            "lexical-vs-literal-conjunction",
            "metaphorical-lexeme",
            "relationFrame.metaphoricalDisplacement"
          );
        }
      }
      if (
        operationKind === "parallel-structure"
        && relationFrame.changesContent
        && relationFrame.listlikeStatements
      ) {
        select(
          "progressive-parallelism",
          "listlike-statements",
          "relationFrame.listlikeStatements"
        );
      }
      const selectedAxisValues = Object.entries(selectedValues).map(
        ([axisId, selectedValue]) => ({
          axisId,
          selectedValue,
          ownerSourcePath: ownerSourcePaths[axisId]
        })
      );
      return freezeClassicalNahuatlClauseConjunction({
        projectionIdentity:
          CLASSICAL_NAHUATL_CLAUSE_CONJUNCTION_LCM_PROJECTION_IDENTITY,
        selectedValues,
        selectedAxisValues,
        selectedAxisIds: selectedAxisValues.map(selection => selection.axisId),
        ownerSourcePaths,
        selectedValuesAreTypedProjection: true
      });
    }
    function selectClassicalNahuatlClauseConjunctionOptions(operationKind, options = {}) {
      return Object.fromEntries((CLASSICAL_NAHUATL_CLAUSE_CONJUNCTION_OPERATION_OPTION_FIELDS[operationKind] || [])
        .filter(field => Object.hasOwn(options || {}, field))
        .map(field => [field, options[field]]));
    }
    function isClassicalNahuatlClauseConjunctionResultFrame(frame = null) {
      if (
        !issuedClassicalNahuatlClauseConjunctionResults.has(frame)
        || frame?.kind !== "classical-nahuatl-clause-conjunction-result-frame"
        || frame.version !== 1
        || frame.authorizationStatus !== "authorized"
        || frame.rank !== "clause-group"
        || !frame.formulaRealization
        || !frame.formulaRecord
        || !frame.formulaRealizationRecord
        || !frame.surfaceRealization
        || frame.typedFrameAuthority !== true
        || frame.lessonMetadataAuthority !== false
        || frame.formulaStringAuthority !== false
        || frame.surfaceStringAuthority !== false
        || frame.leastCommonMultiple?.projectionIdentity
          !== CLASSICAL_NAHUATL_CLAUSE_CONJUNCTION_LCM_PROJECTION_IDENTITY
        || frame.leastCommonMultiple?.selectedValuesAreTypedProjection !== true
        || !Array.isArray(frame.leastCommonMultiple?.selectedAxisValues)
        || !frame.leastCommonMultiple.selectedAxisValues.every(selection => (
          CLASSICAL_NAHUATL_CLAUSE_CONJUNCTION_PROJECTED_AXIS_IDS.includes(
            selection.axisId
          )
          && frame.leastCommonMultiple.selectedValues?.[selection.axisId]
            === selection.selectedValue
          && frame.leastCommonMultiple.ownerSourcePaths?.[selection.axisId]
            === selection.ownerSourcePath
        ))
      ) return false;
      const projection = { ...frame };
      delete projection.canonicalSignature;
      return frame.canonicalSignature === signClassicalNahuatlClauseConjunction(projection, "clause-conjunction-result");
    }
    function isClassicalNahuatlClauseCompositionNode(frame = null) {
      return Boolean(
        (typeof targetObject.isClassicalNahuatlClauseCompositionSourceFrame === "function"
          && targetObject.isClassicalNahuatlClauseCompositionSourceFrame(frame))
        || (typeof targetObject.isClassicalNahuatlClauseComplementationResultFrame === "function"
          && targetObject.isClassicalNahuatlClauseComplementationResultFrame(frame))
        || isClassicalNahuatlClauseConjunctionResultFrame(frame)
      );
    }
    function getClassicalNahuatlClauseCompositionNodeSurface(frame = null) {
      if (typeof targetObject.isClassicalNahuatlClauseCompositionSourceFrame === "function"
        && targetObject.isClassicalNahuatlClauseCompositionSourceFrame(frame)) {
        return frame.surface;
      }
      return isClassicalNahuatlClauseCompositionNode(frame)
        ? frame.surfaceRealization
        : "";
    }
    function getClassicalNahuatlClauseCompositionNodeFormula(frame = null) {
      if (typeof targetObject.isClassicalNahuatlClauseCompositionSourceFrame === "function"
        && targetObject.isClassicalNahuatlClauseCompositionSourceFrame(frame)) {
        return String(frame.formulaRealization || "").trim();
      }
      return isClassicalNahuatlClauseCompositionNode(frame)
        ? String(frame.formulaRealization || "").trim()
        : "";
    }
    function buildClassicalNahuatlClauseConjunctionOperationRequest(request = {}) {
      const operationKind = normalizeClassicalNahuatlClauseConjunctionToken(request.operationKind);
      const optionFields =
        CLASSICAL_NAHUATL_CLAUSE_CONJUNCTION_OPERATION_OPTION_FIELDS[operationKind]
        || [];
      const unknownOptionFields = Object.keys(request.options || {}).filter(
        field => !optionFields.includes(field)
      );
      const forbiddenAuthorityFields =
        CLASSICAL_NAHUATL_CLAUSE_CONJUNCTION_FORBIDDEN_AUTHORITY_FIELDS.filter(
          field => Object.hasOwn(request || {}, field)
        );
      const projection = {
        kind: "classical-nahuatl-clause-conjunction-operation-request",
        version: 1,
        operationKind,
        operationKindLicensed: Object.hasOwn(CLASSICAL_NAHUATL_CLAUSE_CONJUNCTION_OPERATION_OPTION_FIELDS, operationKind),
        operationOptionsLicensed: unknownOptionFields.length === 0,
        unknownOptionFields,
        requestAuthorityLicensed: forbiddenAuthorityFields.length === 0,
        forbiddenAuthorityFields,
        conjuncts: Array.isArray(request.conjuncts) ? request.conjuncts : [],
        sharedSupplement: request.sharedSupplement || null,
        options: selectClassicalNahuatlClauseConjunctionOptions(operationKind, request.options || {}),
        typedFrameAuthority: true,
        lessonMetadataAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        callerSuppliedSurfaceAccepted: false
      };
      return freezeClassicalNahuatlClauseConjunction({
        ...projection,
        canonicalSignature: signClassicalNahuatlClauseConjunction(projection, "clause-conjunction-operation-request")
      });
    }
    function isClassicalNahuatlClauseConjunctionOperationRequest(request = null) {
      if (
        request?.kind !== "classical-nahuatl-clause-conjunction-operation-request"
        || request.version !== 1
        || !Object.hasOwn(CLASSICAL_NAHUATL_CLAUSE_CONJUNCTION_OPERATION_OPTION_FIELDS, request.operationKind)
        || typeof request.operationOptionsLicensed !== "boolean"
        || !Array.isArray(request.unknownOptionFields)
        || request.operationOptionsLicensed
          !== (request.unknownOptionFields.length === 0)
        || typeof request.requestAuthorityLicensed !== "boolean"
        || !Array.isArray(request.forbiddenAuthorityFields)
        || request.requestAuthorityLicensed
          !== (request.forbiddenAuthorityFields.length === 0)
        || request.typedFrameAuthority !== true
        || request.lessonMetadataAuthority !== false
        || request.formulaStringAuthority !== false
        || request.surfaceStringAuthority !== false
        || request.callerSuppliedSurfaceAccepted !== false
      ) return false;
      const projection = { ...request };
      delete projection.canonicalSignature;
      return request.canonicalSignature === signClassicalNahuatlClauseConjunction(projection, "clause-conjunction-operation-request");
    }
    function buildClassicalNahuatlClauseConjunctionBlockedResultFrame(operationKind, blockReason, details = {}) {
      return freezeClassicalNahuatlClauseConjunction({
        kind: "classical-nahuatl-clause-conjunction-result-frame",
        version: 1,
        operationKind,
        authorizationStatus: "blocked",
        blockReason,
        surfaceRealization: "",
        typedFrameAuthority: true,
        lessonMetadataAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        ...details
      });
    }
    function finalizeClassicalNahuatlClauseConjunctionResultFrame(
      operationKind,
      conjuncts,
      surfaceSequence,
      relationFrame,
      extra = {},
      formulaSequence = []
    ) {
      const normalizedFormulaSequence = Array.from(formulaSequence || [])
        .map(value => String(value || "").trim())
        .filter(Boolean);
      if (
        !normalizedFormulaSequence.length
        || typeof targetObject.buildGrammarFormulaRecord !== "function"
        || typeof targetObject.buildGrammarFormulaRealizationRecord !== "function"
      ) {
        return buildClassicalNahuatlClauseConjunctionBlockedResultFrame(
          operationKind,
          "complete-source-formulas-and-formula-record-capabilities-required"
        );
      }
      const formulaRealization = normalizedFormulaSequence.join(" + ");
      const surfaceRealization =
        realizeClassicalNahuatlClauseConjunctionSentence(surfaceSequence);
      const formulaRecord = targetObject.buildGrammarFormulaRecord({
        id: `clause-conjunction:${operationKind}:${relationFrame.coordinationType || relationFrame.relation || "relation"}`,
        unit: "CLAUSE_GROUP",
        formula: formulaRealization,
        formulaSlots: {
          conjuncts: conjuncts.map(
            getClassicalNahuatlClauseCompositionNodeFormula
          ),
          sharedSupplement:
            extra.sharedSupplement
              ? getClassicalNahuatlClauseCompositionNodeFormula(
                  extra.sharedSupplement
                )
              : "",
          relation: relationFrame.relation || "",
          coordinationType: relationFrame.coordinationType || "",
        },
        operationFrames: [{
          operationId: operationKind,
          relation: relationFrame.relation || "",
          coordinationType: relationFrame.coordinationType || "",
        }],
        source: "typed-clause-composition-node-formulas",
      });
      const formulaRealizationRecord =
        targetObject.buildGrammarFormulaRealizationRecord({
          id: `${formulaRecord.id}::selected`,
          formulaRecord,
          unit: "CLAUSE_GROUP",
          segmentFrames: normalizedFormulaSequence.map(
            (formulaValue, index) => ({
              slot: `constituent-${index + 1}`,
              role: "conjunction-constituent",
              formulaValue,
              surface: surfaceSequence[index] || "",
            })
          ),
          surfaceForms: [surfaceRealization],
          source: "typed-conjunction-boundary-realization",
        });
      const projection = {
        kind: "classical-nahuatl-clause-conjunction-result-frame",
        version: 1,
        operationKind,
        authorizationStatus: "authorized",
        blockReason: "",
        rank: "clause-group",
        conjuncts,
        balancedRelation: {
          noHead: true,
          sameSyntacticRank: true,
          subordinateRelation: false
        },
        relationFrame,
        leastCommonMultiple: buildClassicalNahuatlClauseConjunctionSelectedLcmProjection({
          operationKind,
          conjuncts,
          relationFrame,
          extra
        }),
        formulaSequence: normalizedFormulaSequence,
        formulaRealization,
        formulaRecord,
        formulaRealizationRecord,
        surfaceSequence,
        surfaceRealization,
        canonicalExecutor: "evaluateClassicalNahuatlClauseConjunction",
        typedFrameAuthority: true,
        lessonMetadataAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        callerSuppliedSurfaceAccepted: false,
        ...extra
      };
      const result = freezeClassicalNahuatlClauseConjunction({
        ...projection,
        canonicalSignature: signClassicalNahuatlClauseConjunction(projection, "clause-conjunction-result")
      });
      issuedClassicalNahuatlClauseConjunctionResults.add(result);
      return result;
    }
    function buildClassicalNahuatlClauseConjunctionGeneralSequence(conjuncts, {
      relation,
      coordinationType,
      rightwardModifier,
      modifierAdjunctor,
      sharedModifier,
      sharedModifierScope,
      leftContextAbsent
    }) {
      const surfaces = conjuncts.map(getClassicalNahuatlClauseCompositionNodeSurface);
      const modifier = CLASSICAL_NAHUATL_CLAUSE_CONJUNCTION_MODIFIERS[coordinationType]?.[rightwardModifier] || "";
      const modifierPrefix = modifier
        ? `${modifierAdjunctor === "in" ? "in " : ""}${modifier}`
        : "";
      if (leftContextAbsent) {
        return ["auh", modifierPrefix, surfaces[0]].filter(Boolean);
      }
      const sharedModifierSurface =
        sharedModifierScope === "before-first-applies-to-all"
          ? CLASSICAL_NAHUATL_CLAUSE_CONJUNCTION_SHARED_MODIFIERS[sharedModifier]
              ?.surface || ""
          : "";
      return surfaces.reduce((sequence, surface, index) => {
        if (index === 0 && sharedModifierSurface) {
          sequence.push(sharedModifierSurface);
        }
        if (index > 0 && relation === "marked") sequence.push("auh");
        if (index > 0 && modifierPrefix) sequence.push(modifierPrefix);
        sequence.push(surface);
        return sequence;
      }, []);
    }
    function buildClassicalNahuatlClauseConjunctionGeneralFormulaSequence(conjuncts, {
      relation,
      coordinationType,
      rightwardModifier,
      modifierAdjunctor,
      sharedModifier,
      sharedModifierScope,
      leftContextAbsent
    }) {
      const formulas = conjuncts.map(
        getClassicalNahuatlClauseCompositionNodeFormula
      );
      const modifier =
        CLASSICAL_NAHUATL_CLAUSE_CONJUNCTION_MODIFIERS[coordinationType]?.[
          rightwardModifier
        ] || "";
      const modifierFormula = modifier
        ? [modifierAdjunctor === "in" ? "in" : "", modifier]
            .filter(Boolean)
            .join("-")
        : "";
      if (leftContextAbsent) {
        return ["auh", modifierFormula, formulas[0]].filter(Boolean);
      }
      const sharedModifierFormula =
        sharedModifierScope === "before-first-applies-to-all"
          ? CLASSICAL_NAHUATL_CLAUSE_CONJUNCTION_SHARED_MODIFIERS[sharedModifier]
              ?.formula || ""
          : "";
      return formulas.reduce((sequence, formula, index) => {
        if (index === 0 && sharedModifierFormula) {
          sequence.push(sharedModifierFormula);
        }
        if (index > 0 && relation === "marked") sequence.push("auh");
        if (index > 0 && modifierFormula) sequence.push(modifierFormula);
        sequence.push(formula);
        return sequence;
      }, []);
    }
    function evaluateClassicalNahuatlClauseConjunction(request = {}) {
      const operationRequest = isClassicalNahuatlClauseConjunctionOperationRequest(request)
        ? request
        : buildClassicalNahuatlClauseConjunctionOperationRequest(request);
      const operationKind = operationRequest.operationKind;
      if (!operationRequest.operationKindLicensed) {
        return buildClassicalNahuatlClauseConjunctionBlockedResultFrame(operationKind, "recognized-clause-conjunction-operation-required");
      }
      if (!operationRequest.requestAuthorityLicensed) {
        return buildClassicalNahuatlClauseConjunctionBlockedResultFrame(
          operationKind,
          `forbidden-clause-conjunction-request-authority:${operationRequest.forbiddenAuthorityFields[0] || ""}`
        );
      }
      if (!operationRequest.operationOptionsLicensed) {
        return buildClassicalNahuatlClauseConjunctionBlockedResultFrame(
          operationKind,
          `unrecognized-clause-conjunction-operation-option:${operationRequest.unknownOptionFields[0] || ""}`
        );
      }
      const conjuncts = operationRequest.conjuncts;
      const options = operationRequest.options || {};
      if (!conjuncts.every(isClassicalNahuatlClauseCompositionNode)) {
        return buildClassicalNahuatlClauseConjunctionBlockedResultFrame(operationKind, "every-conjunct-must-be-a-signed-canonical-clause-node");
      }
      if (operationKind === "conjunction") {
        const relation = normalizeClassicalNahuatlClauseConjunctionToken(options.relation);
        const coordinationType = normalizeClassicalNahuatlClauseConjunctionToken(options.coordinationType);
        const level = normalizeClassicalNahuatlClauseConjunctionToken(options.level || "principal");
        const polarity = normalizeClassicalNahuatlClauseConjunctionToken(options.polarity || "positive");
        const rightwardModifier = normalizeClassicalNahuatlClauseConjunctionToken(options.rightwardModifier);
        const modifierAdjunctor = normalizeClassicalNahuatlClauseConjunctionToken(options.modifierAdjunctor || "none");
        const sharedModifierScope = normalizeClassicalNahuatlClauseConjunctionToken(options.sharedModifierScope || "none");
        const sharedModifier = normalizeClassicalNahuatlClauseConjunctionToken(options.sharedModifier || "none");
        const adjoinedFunction = normalizeClassicalNahuatlClauseConjunctionToken(options.adjoinedFunction || "none");
        const leftContextAbsent = options.leftContextAbsent === true;
        if (!["marked", "unmarked"].includes(relation)
          || !["additive", "alternative", "adversative"].includes(coordinationType)
          || !["principal", "adjoined"].includes(level)
          || !["positive", "negative"].includes(polarity)) {
          return buildClassicalNahuatlClauseConjunctionBlockedResultFrame(operationKind, "complete-conjunction-relation-type-level-and-polarity-required");
        }
        if (leftContextAbsent) {
          if (relation !== "marked" || level !== "principal" || conjuncts.length !== 1) {
            return buildClassicalNahuatlClauseConjunctionBlockedResultFrame(operationKind, "sentence-initial-auh-requires-one-right-conjunct-and-absent-left-context");
          }
        } else if (conjuncts.length < 2) {
          return buildClassicalNahuatlClauseConjunctionBlockedResultFrame(operationKind, "conjunction-requires-at-least-two-conjuncts");
        }
        if (coordinationType === "adversative" && conjuncts.length !== 2) {
          return buildClassicalNahuatlClauseConjunctionBlockedResultFrame(operationKind, "adversative-conjunction-requires-exactly-two-conjuncts");
        }
        if (relation === "marked" && level === "adjoined" && options.markedAdjoinedException !== true) {
          return buildClassicalNahuatlClauseConjunctionBlockedResultFrame(operationKind, "marked-adjoined-conjunction-requires-explicit-unusual-use-selection");
        }
        if (!Object.hasOwn(CLASSICAL_NAHUATL_CLAUSE_CONJUNCTION_MODIFIERS[coordinationType], rightwardModifier)) {
          return buildClassicalNahuatlClauseConjunctionBlockedResultFrame(operationKind, "rightward-modifier-not-licensed-for-coordination-type");
        }
        if (modifierAdjunctor === "in"
          && !(coordinationType === "alternative" || ["yeh", "neh"].includes(rightwardModifier))) {
          return buildClassicalNahuatlClauseConjunctionBlockedResultFrame(operationKind, "in-modifier-adjunctor-not-licensed-in-this-conjunction");
        }
        if (!["none", "in"].includes(modifierAdjunctor)) {
          return buildClassicalNahuatlClauseConjunctionBlockedResultFrame(operationKind, "recognized-modifier-adjunctor-required");
        }
        if (!["none", "before-first-applies-to-all"].includes(sharedModifierScope)) {
          return buildClassicalNahuatlClauseConjunctionBlockedResultFrame(operationKind, "recognized-shared-modifier-scope-required");
        }
        if (!Object.hasOwn(CLASSICAL_NAHUATL_CLAUSE_CONJUNCTION_SHARED_MODIFIERS, sharedModifier)
          || (sharedModifierScope === "before-first-applies-to-all" && sharedModifier === "none")
          || (sharedModifierScope === "none" && sharedModifier !== "none")
          || (sharedModifierScope !== "none" && conjuncts.length < 2)) {
          return buildClassicalNahuatlClauseConjunctionBlockedResultFrame(
            operationKind,
            "shared-modifier-and-pre-first-scope-must-be-jointly-licensed"
          );
        }
        if (!["none", "supplementary-object", "supplementary-subject", "adverbial-adjunct", "adjectival-modifier"].includes(adjoinedFunction)
          || (level === "adjoined" && adjoinedFunction === "none")
          || (level !== "adjoined" && adjoinedFunction !== "none")) {
          return buildClassicalNahuatlClauseConjunctionBlockedResultFrame(operationKind, "licensed-adjoined-conjunction-function-requires-adjoined-level");
        }
        const sharedSupplement = operationRequest.sharedSupplement;
        if (sharedSupplement && !isClassicalNahuatlClauseCompositionNode(sharedSupplement)) {
          return buildClassicalNahuatlClauseConjunctionBlockedResultFrame(operationKind, "shared-supplement-must-be-a-signed-clause-node");
        }
        const sequence = buildClassicalNahuatlClauseConjunctionGeneralSequence(conjuncts, {
          relation,
          coordinationType,
          rightwardModifier,
          modifierAdjunctor,
          sharedModifier,
          sharedModifierScope,
          leftContextAbsent
        });
        const formulaSequence =
          buildClassicalNahuatlClauseConjunctionGeneralFormulaSequence(conjuncts, {
            relation,
            coordinationType,
            rightwardModifier,
            modifierAdjunctor,
            sharedModifier,
            sharedModifierScope,
            leftContextAbsent
          });
        if (sharedSupplement) sequence.push(getClassicalNahuatlClauseCompositionNodeSurface(sharedSupplement));
        if (sharedSupplement) {
          formulaSequence.push(
            getClassicalNahuatlClauseCompositionNodeFormula(
              sharedSupplement
            )
          );
        }
        return finalizeClassicalNahuatlClauseConjunctionResultFrame(operationKind, conjuncts, sequence, {
          relation,
          coordinationType,
          level,
          polarity,
          marker: relation === "marked" ? "auh" : "",
          unmarkedAsyndeton: relation === "unmarked",
          rightwardModifier,
          rightwardModifierSurface: CLASSICAL_NAHUATL_CLAUSE_CONJUNCTION_MODIFIERS[coordinationType][rightwardModifier],
          modifierIsConjunctor: false,
          modifierAdjunctor,
          ihuanPossessorAntecedent: rightwardModifier.includes("ihuan") ? "leftward-state-of-affairs" : "",
          sharedModifierScope,
          sharedModifier,
          sharedModifierSurface:
            CLASSICAL_NAHUATL_CLAUSE_CONJUNCTION_SHARED_MODIFIERS[sharedModifier].surface,
          syntacticRank: level === "adjoined"
            ? "adjoined-clause-group"
            : "principal-clause-group",
          balancedConjunctsWithoutHead: true,
          adjoinedFunction,
          leftContextAbsent,
          markedAdjoinedException: relation === "marked" && level === "adjoined"
        }, {
          sharedSupplement: sharedSupplement || null,
          sharedSupplementNormallyAfterLastConjunct: Boolean(sharedSupplement)
        }, formulaSequence);
      }
      if (operationKind === "correlative-conjunction") {
        const correlationType = normalizeClassicalNahuatlClauseConjunctionToken(options.correlationType);
        const pattern = normalizeClassicalNahuatlClauseConjunctionToken(options.pattern);
        if (conjuncts.length !== 2 || !["standard", "loose"].includes(correlationType)) {
          return buildClassicalNahuatlClauseConjunctionBlockedResultFrame(operationKind, "correlative-conjunction-requires-two-conjuncts-and-a-licensed-type");
        }
        if (correlationType === "standard" && !Object.hasOwn(CLASSICAL_NAHUATL_CLAUSE_CONJUNCTION_CORRELATIVE_PATTERNS, pattern)) {
          return buildClassicalNahuatlClauseConjunctionBlockedResultFrame(operationKind, "standard-correlation-requires-a-licensed-paired-particle-pattern");
        }
        if (correlationType === "loose" && pattern && pattern !== "paired-nncs") {
          return buildClassicalNahuatlClauseConjunctionBlockedResultFrame(operationKind, "loose-correlation-uses-paired-adverbial-or-pronominal-nncs");
        }
        if (correlationType === "loose" && !conjuncts.every(node => (
          typeof targetObject.isClassicalNahuatlClauseCompositionSourceFrame === "function"
          && targetObject.isClassicalNahuatlClauseCompositionSourceFrame(node)
          && node.unitKind === "nnc"
        ))) {
          return buildClassicalNahuatlClauseConjunctionBlockedResultFrame(operationKind, "loose-correlation-requires-typed-nnc-conjuncts");
        }
        const particles = correlationType === "standard"
          ? CLASSICAL_NAHUATL_CLAUSE_CONJUNCTION_CORRELATIVE_PATTERNS[pattern]
          : ["", ""];
        const sequence = conjuncts.flatMap((node, index) => [
          particles[index],
          getClassicalNahuatlClauseCompositionNodeSurface(node)
        ].filter(Boolean));
        const formulaSequence = conjuncts.flatMap((node, index) => [
          particles[index],
          getClassicalNahuatlClauseCompositionNodeFormula(node)
        ].filter(Boolean));
        return finalizeClassicalNahuatlClauseConjunctionResultFrame(operationKind, conjuncts, sequence, {
          relation: "unmarked",
          coordinationType: pattern === "ahmo-no-ahmo-no" ? "additive-negative" : "alternative-or-contrastive",
          correlationType,
          pattern,
          pairedItemsAreAdverbialModifiersNotConjunctors: true
        }, {}, formulaSequence);
      }
      if (operationKind === "lexical-conjunction") {
        const lexicalType = normalizeClassicalNahuatlClauseConjunctionToken(options.lexicalType);
        const adjunctorDistribution = normalizeClassicalNahuatlClauseConjunctionToken(options.adjunctorDistribution || "none");
        const stateRealization = normalizeClassicalNahuatlClauseConjunctionToken(options.stateRealization || "conjoined-stems");
        if (![2, 3].includes(conjuncts.length)
          || !conjuncts.every(node => (
            typeof targetObject.isClassicalNahuatlClauseCompositionSourceFrame === "function"
            && targetObject.isClassicalNahuatlClauseCompositionSourceFrame(node)
            && node.unitKind === "nnc"
          ))) {
          return buildClassicalNahuatlClauseConjunctionBlockedResultFrame(operationKind, "lexical-conjunction-requires-two-or-three-typed-nncs");
        }
        if (!["lord-and-master", "bread-and-butter"].includes(lexicalType)) {
          return buildClassicalNahuatlClauseConjunctionBlockedResultFrame(operationKind, "licensed-lexical-conjunction-semantic-type-required");
        }
        const referenceIds = new Set(conjuncts.map(node => node.subject.referenceId));
        if (referenceIds.size !== 1) {
          return buildClassicalNahuatlClauseConjunctionBlockedResultFrame(operationKind, "lexical-conjunction-requires-one-shared-subject-referent");
        }
        const affectiveMemberCount = conjuncts.filter(node => node.affectiveFormation === true).length;
        if (affectiveMemberCount > 0 && affectiveMemberCount !== conjuncts.length) {
          return buildClassicalNahuatlClauseConjunctionBlockedResultFrame(operationKind, "affective-formation-must-appear-on-every-lexical-conjunct");
        }
        const affectiveCoverage = affectiveMemberCount === conjuncts.length
          ? "all-members"
          : "none";
        if (!["none", "in-before-each", "in-before-left-only"].includes(adjunctorDistribution)
          || !["conjoined-stems", "compound-handoff"].includes(stateRealization)) {
          return buildClassicalNahuatlClauseConjunctionBlockedResultFrame(operationKind, "licensed-lexical-conjunction-realization-options-required");
        }
        if (stateRealization === "compound-handoff" && conjuncts.length !== 2) {
          return buildClassicalNahuatlClauseConjunctionBlockedResultFrame(operationKind, "conjunctive-compound-handoff-requires-a-biclausal-unit-and-compound-state-selection");
        }
        const surfaces = conjuncts.map(getClassicalNahuatlClauseCompositionNodeSurface);
        const sequence = surfaces.flatMap((surface, index) => {
          const inRequired = adjunctorDistribution === "in-before-each"
            || (adjunctorDistribution === "in-before-left-only" && index === 0);
          return [inRequired ? "in" : "", surface].filter(Boolean);
        });
        const formulaSequence = conjuncts.flatMap((node, index) => {
          const inRequired = adjunctorDistribution === "in-before-each"
            || (
              adjunctorDistribution === "in-before-left-only"
              && index === 0
            );
          return [
            inRequired ? "in" : "",
            getClassicalNahuatlClauseCompositionNodeFormula(node)
          ].filter(Boolean);
        });
        return finalizeClassicalNahuatlClauseConjunctionResultFrame(operationKind, conjuncts, sequence, {
          relation: "unmarked",
          coordinationType: "additive-lexical",
          lexicalType,
          arity: conjuncts.length === 2 ? "biclausalism" : "triclausalism",
          metaphoricalDisplacement: true,
          sameSubjectReferent: true,
          stateRealization,
          adjunctorDistribution,
          affectiveCoverage,
          affectiveFormationMustCoverAllMembers: affectiveCoverage === "all-members",
          simpleLiteralConjunctionRemainsSeparate: true,
          downstreamEligibilityIsLexicalFact: true,
          downstreamEligibility: [
            "conjunctive-compound",
            "incorporation",
            "verbstem-derivation"
          ]
        }, {
          lexicalUnit: true
        }, formulaSequence);
      }
      if (operationKind === "parallel-structure") {
        const parallelType = normalizeClassicalNahuatlClauseConjunctionToken(options.parallelType);
        const rephraseAxis = normalizeClassicalNahuatlClauseConjunctionToken(options.rephraseAxis);
        const appositiveType = normalizeClassicalNahuatlClauseConjunctionToken(options.appositiveType || "none");
        if (conjuncts.length < 2 || !["rephrasive", "progressive", "combined"].includes(parallelType)) {
          return buildClassicalNahuatlClauseConjunctionBlockedResultFrame(operationKind, "parallel-structure-requires-at-least-two-conjuncts-and-a-licensed-type");
        }
        if (["rephrasive", "combined"].includes(parallelType)
          && rephraseAxis
          && !CLASSICAL_NAHUATL_CLAUSE_CONJUNCTION_REPHRASE_AXES.includes(rephraseAxis)) {
          return buildClassicalNahuatlClauseConjunctionBlockedResultFrame(operationKind, "rephrasive-parallelism-axis-not-licensed");
        }
        if (!["none", "clarifying", "summarizing"].includes(appositiveType)) {
          return buildClassicalNahuatlClauseConjunctionBlockedResultFrame(operationKind, "recognized-appositive-parallelism-type-required");
        }
        const sequence = conjuncts.map(getClassicalNahuatlClauseCompositionNodeSurface);
        const formulaSequence = conjuncts.map(
          getClassicalNahuatlClauseCompositionNodeFormula
        );
        return finalizeClassicalNahuatlClauseConjunctionResultFrame(operationKind, conjuncts, sequence, {
          relation: "unmarked",
          coordinationType: "parallel",
          parallelType,
          rephraseAxis,
          appositiveType,
          keepsSimilarContent: ["rephrasive", "combined"].includes(parallelType),
          changesContent: ["progressive", "combined"].includes(parallelType),
          keepsOrChangesGrammar: ["rephrasive", "combined"].includes(parallelType),
          listlikeStatements: ["progressive", "combined"].includes(parallelType)
        }, {}, formulaSequence);
      }
      return buildClassicalNahuatlClauseConjunctionBlockedResultFrame(operationKind, "recognized-clause-conjunction-operation-required");
    }
    function evaluateClassicalNahuatlClauseConjunctionParadigm(requests = []) {
      const rows = (Array.isArray(requests) ? requests : []).map((request, index) => {
        const operationRequest = isClassicalNahuatlClauseConjunctionOperationRequest(request)
          ? request
          : buildClassicalNahuatlClauseConjunctionOperationRequest(request);
        const result = evaluateClassicalNahuatlClauseConjunction(operationRequest);
        return freezeClassicalNahuatlClauseConjunction({
          coordinateId: String(request?.coordinateId || `coordinate-${index + 1}`),
          operationKind: operationRequest.operationKind,
          authorizationStatus: result.authorizationStatus,
          blockReason: result.blockReason || "",
          formulaRealization: result.formulaRealization || "",
          surfaceRealization: result.surfaceRealization || "",
          result
        });
      });
      return freezeClassicalNahuatlClauseConjunction({
        kind: "classical-nahuatl-clause-conjunction-paradigm-frame",
        version: 1,
        authorizationStatus: rows.some(row => row.authorizationStatus === "authorized") ? "authorized" : "blocked",
        blockReason: rows.some(row => row.authorizationStatus === "authorized") ? "" : "no-authorized-conjunction-coordinate",
        scalarEvaluator: "evaluateClassicalNahuatlClauseConjunction",
        pointwiseScalarEquivalent: true,
        formulaProjectionPointwiseScalarEquivalent: true,
        writtenProjectionPointwiseScalarEquivalent: true,
        rows,
        typedFrameAuthority: true,
        lessonMetadataAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false
      });
    }
    function buildClassicalNahuatlClauseCompositionGrammarContract() {
      const greatestCommonDivisor = targetObject.CLASSICAL_NAHUATL_CLAUSE_COMPOSITION_GCD;
      const complementationAxes = targetObject.CLASSICAL_NAHUATL_CLAUSE_COMPLEMENTATION_LCM_AXES;
      if (!greatestCommonDivisor || !Array.isArray(complementationAxes)) {
        return freezeClassicalNahuatlClauseConjunction({
          kind: "classical-nahuatl-clause-composition-grammar-contract",
          version: 1,
          authorizationStatus: "blocked",
          blockReason: "clause-complementation-grammar-capability-required"
        });
      }
      const distinctionAxes = [
        ...complementationAxes.map(axis => ({
          ...axis,
          semanticOwner: "clause-complementation",
          canonicalExecutorIds: ["evaluateClassicalNahuatlClauseComplementation"]
        })),
        ...CLASSICAL_NAHUATL_CLAUSE_CONJUNCTION_LCM_AXES.map(axis => ({
          ...axis,
          semanticOwner: "clause-conjunction",
          canonicalExecutorIds: ["evaluateClassicalNahuatlClauseConjunction"]
        }))
      ];
      const projection = {
        kind: "classical-nahuatl-clause-composition-grammar-contract",
        version: 1,
        authorizationStatus: "authorized",
        blockReason: "",
        greatestCommonDivisor,
        leastCommonMultiple: {
          identityId: "complete-licensed-clause-composition-distinction-space",
          distinctionAxisCount: distinctionAxes.length,
          distinctionAxes,
          semanticOwnerAxisCounts: {
            "clause-complementation": complementationAxes.length,
            "clause-conjunction": CLASSICAL_NAHUATL_CLAUSE_CONJUNCTION_LCM_AXES.length
          },
          operationKinds: [
            "object-complement",
            "subject-complement",
            "adverbial-complement",
            ...Object.keys(CLASSICAL_NAHUATL_CLAUSE_CONJUNCTION_OPERATION_OPTION_FIELDS)
          ],
          scalarExecutors: [
            "evaluateClassicalNahuatlClauseComplementation",
            "evaluateClassicalNahuatlClauseConjunction"
          ],
          paradigmExecutors: [
            "evaluateClassicalNahuatlClauseComplementationParadigm",
            "evaluateClassicalNahuatlClauseConjunctionParadigm"
          ],
          paradigmPolicy: "every-coordinate-is-evaluated-by-the-same-scalar-operation"
        },
        sourceAuditMetadataPresent: false,
        callerSuppliedAuthorityAccepted: false,
        lessonMetadataAuthority: false,
        evidenceAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false
      };
      return freezeClassicalNahuatlClauseConjunction({
        ...projection,
        canonicalSignature: signClassicalNahuatlClauseConjunction(projection, "clause-composition-grammar")
      });
    }
    function isClassicalNahuatlClauseCompositionGrammarContract(frame = null) {
      if (
        frame?.kind !== "classical-nahuatl-clause-composition-grammar-contract"
        || frame.version !== 1
        || frame.authorizationStatus !== "authorized"
        || frame.greatestCommonDivisor?.identityId !== "typed-clause-source-semantic-relation-reference-graph-surface-result"
        || frame.leastCommonMultiple?.distinctionAxisCount !== frame.leastCommonMultiple?.distinctionAxes?.length
        || frame.leastCommonMultiple?.semanticOwnerAxisCounts?.["clause-complementation"]
          !== targetObject.CLASSICAL_NAHUATL_CLAUSE_COMPLEMENTATION_LCM_AXES?.length
        || frame.leastCommonMultiple?.semanticOwnerAxisCounts?.["clause-conjunction"]
          !== CLASSICAL_NAHUATL_CLAUSE_CONJUNCTION_LCM_AXES.length
        || !frame.leastCommonMultiple?.distinctionAxes?.every(axis => (
          ["clause-complementation", "clause-conjunction"].includes(axis.semanticOwner)
          && !Object.hasOwn(axis, "lesson")
        ))
        || frame.sourceAuditMetadataPresent !== false
        || frame.callerSuppliedAuthorityAccepted !== false
        || frame.lessonMetadataAuthority !== false
        || frame.evidenceAuthority !== false
        || frame.formulaStringAuthority !== false
        || frame.surfaceStringAuthority !== false
      ) return false;
      const projection = { ...frame };
      delete projection.canonicalSignature;
      return frame.canonicalSignature === signClassicalNahuatlClauseConjunction(projection, "clause-composition-grammar");
    }
    function evaluateClassicalNahuatlClauseComposition(request = {}) {
      const operationKind = normalizeClassicalNahuatlClauseConjunctionToken(request?.operationKind);
      if (["object-complement", "subject-complement", "adverbial-complement"].includes(operationKind)) {
        return typeof targetObject.evaluateClassicalNahuatlClauseComplementation === "function"
          ? targetObject.evaluateClassicalNahuatlClauseComplementation(request)
          : buildClassicalNahuatlClauseConjunctionBlockedResultFrame(operationKind, "clause-complementation-executor-required");
      }
      return evaluateClassicalNahuatlClauseConjunction(request);
    }

    const api = {};
    Object.defineProperty(api, "CONJUNCTION_CLAUSE_BOUNDARY_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return CONJUNCTION_CLAUSE_BOUNDARY_VERSION; },
    });
    Object.defineProperty(api, "CONJUNCTION_CLAUSE_RELATION", {
        configurable: true,
        enumerable: true,
        get() { return CONJUNCTION_CLAUSE_RELATION; },
    });
    Object.defineProperty(api, "CONJUNCTION_CLAUSE_COORDINATION_TYPE", {
        configurable: true,
        enumerable: true,
        get() { return CONJUNCTION_CLAUSE_COORDINATION_TYPE; },
    });
    Object.defineProperty(api, "CONJUNCTION_CLAUSE_UNIT", {
        configurable: true,
        enumerable: true,
        get() { return CONJUNCTION_CLAUSE_UNIT; },
    });
    Object.defineProperty(api, "CONJUNCTION_CLAUSE_LEVEL", {
        configurable: true,
        enumerable: true,
        get() { return CONJUNCTION_CLAUSE_LEVEL; },
    });
    Object.defineProperty(api, "CONJUNCTION_CLAUSE_MARKING", {
        configurable: true,
        enumerable: true,
        get() { return CONJUNCTION_CLAUSE_MARKING; },
    });
    Object.defineProperty(api, "CONJUNCTION_CLAUSE_PARALLELISM", {
        configurable: true,
        enumerable: true,
        get() { return CONJUNCTION_CLAUSE_PARALLELISM; },
    });
    Object.defineProperty(api, "CONJUNCTION_CLAUSE_LEXICAL_INNOVATION", {
        configurable: true,
        enumerable: true,
        get() { return CONJUNCTION_CLAUSE_LEXICAL_INNOVATION; },
    });
    Object.defineProperty(api, "CONJUNCTION_CLAUSE_FALSE_POSITIVE_SOURCE", {
        configurable: true,
        enumerable: true,
        get() { return CONJUNCTION_CLAUSE_FALSE_POSITIVE_SOURCE; },
    });
    Object.defineProperty(api, "CONJUNCTION_CLAUSE_ANTI_CONFLATION_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CONJUNCTION_CLAUSE_ANTI_CONFLATION_RULES; },
    });
    Object.defineProperty(api, "CONJUNCTION_CLAUSE_STRUCTURAL_QUESTIONS", {
        configurable: true,
        enumerable: true,
        get() { return CONJUNCTION_CLAUSE_STRUCTURAL_QUESTIONS; },
    });
    api.normalizeConjunctionClauseEnum = normalizeConjunctionClauseEnum;
    api.normalizeConjunctionClauseRelation = normalizeConjunctionClauseRelation;
    api.normalizeConjunctionClauseCoordinationType = normalizeConjunctionClauseCoordinationType;
    api.normalizeConjunctionClauseUnit = normalizeConjunctionClauseUnit;
    api.normalizeConjunctionClauseLevel = normalizeConjunctionClauseLevel;
    api.normalizeConjunctionClauseMarking = normalizeConjunctionClauseMarking;
    api.normalizeConjunctionClauseParallelism = normalizeConjunctionClauseParallelism;
    api.normalizeConjunctionClauseLexicalInnovation = normalizeConjunctionClauseLexicalInnovation;
    api.normalizeConjunctionClauseFalsePositiveSource = normalizeConjunctionClauseFalsePositiveSource;
    api.getConjunctionClauseAntiConflationRules = getConjunctionClauseAntiConflationRules;
    api.getConjunctionClauseStructuralQuestions = getConjunctionClauseStructuralQuestions;
    Object.defineProperty(api, "CLAUSE_CONJUNCTION_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return CLAUSE_CONJUNCTION_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "CLAUSE_CONJUNCTION_CANVAS_REFS", {
        configurable: true,
        enumerable: true,
        get() { return CLAUSE_CONJUNCTION_CANVAS_REFS; },
    });
    Object.defineProperty(api, "CLAUSE_CONJUNCTION_ARCHITECTURE_EVIDENCE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return CLAUSE_CONJUNCTION_ARCHITECTURE_EVIDENCE_FRAME; },
    });
    Object.defineProperty(api, "CLAUSE_CONJUNCTION_UNMARKED_EVIDENCE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return CLAUSE_CONJUNCTION_UNMARKED_EVIDENCE_FRAME; },
    });
    Object.defineProperty(api, "CLAUSE_CONJUNCTION_MARKED_EVIDENCE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return CLAUSE_CONJUNCTION_MARKED_EVIDENCE_FRAME; },
    });
    Object.defineProperty(api, "CLAUSE_CONJUNCTION_ADVERBIAL_MODIFIER_EVIDENCE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return CLAUSE_CONJUNCTION_ADVERBIAL_MODIFIER_EVIDENCE_FRAME; },
    });
    Object.defineProperty(api, "CLAUSE_CONJUNCTION_CORRELATIVE_EVIDENCE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return CLAUSE_CONJUNCTION_CORRELATIVE_EVIDENCE_FRAME; },
    });
    Object.defineProperty(api, "CLAUSE_CONJUNCTION_LEXICAL_INNOVATION_EVIDENCE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return CLAUSE_CONJUNCTION_LEXICAL_INNOVATION_EVIDENCE_FRAME; },
    });
    Object.defineProperty(api, "CLAUSE_CONJUNCTION_PARALLEL_STRUCTURE_EVIDENCE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return CLAUSE_CONJUNCTION_PARALLEL_STRUCTURE_EVIDENCE_FRAME; },
    });
    Object.defineProperty(api, "CLAUSE_CONJUNCTION_EVIDENCE_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return CLAUSE_CONJUNCTION_EVIDENCE_INVENTORY; },
    });
    api.cloneClauseConjunctionEvidenceRecord = cloneClauseConjunctionEvidenceRecord;
    api.getClauseConjunctionEvidenceInventory = getClauseConjunctionEvidenceInventory;
    api.buildConjunctionClauseBoundaryMetadata = buildConjunctionClauseBoundaryMetadata;
    Object.defineProperty(api, "CLASSICAL_NAHUATL_CLAUSE_CONJUNCTION_LCM_AXES", {
      configurable: true,
      enumerable: true,
      get() { return CLASSICAL_NAHUATL_CLAUSE_CONJUNCTION_LCM_AXES; }
    });
    api.isClassicalNahuatlClauseCompositionNode = isClassicalNahuatlClauseCompositionNode;
    api.buildClassicalNahuatlClauseConjunctionOperationRequest = buildClassicalNahuatlClauseConjunctionOperationRequest;
    api.isClassicalNahuatlClauseConjunctionOperationRequest = isClassicalNahuatlClauseConjunctionOperationRequest;
    api.evaluateClassicalNahuatlClauseConjunction = evaluateClassicalNahuatlClauseConjunction;
    api.isClassicalNahuatlClauseConjunctionResultFrame = isClassicalNahuatlClauseConjunctionResultFrame;
    api.evaluateClassicalNahuatlClauseConjunctionParadigm = evaluateClassicalNahuatlClauseConjunctionParadigm;
    api.buildClassicalNahuatlClauseCompositionGrammarContract = buildClassicalNahuatlClauseCompositionGrammarContract;
    api.isClassicalNahuatlClauseCompositionGrammarContract = isClassicalNahuatlClauseCompositionGrammarContract;
    api.evaluateClassicalNahuatlClauseComposition = evaluateClassicalNahuatlClauseComposition;
    return api;
}

export function installConjunctionClauseGlobals(targetObject = globalThis, installationContext = null) {
    const api = createConjunctionClauseGlobals(targetObject, installationContext);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
