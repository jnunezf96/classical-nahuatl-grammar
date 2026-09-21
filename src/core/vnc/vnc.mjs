// Canonical modern ESM module.

export function createVncApi(targetObject = globalThis) {
    // These inherited lesson descriptions mix source structure with adaptation
    // snapshots. They are not current owner output or current product proof.
    function freezeInheritedVncDescription(value) {
      const freezeRecord = record => Object.freeze({
        ...record,
        metadataScope: "inherited-adaptation-description",
        currentProductProof: false,
        grammarGenerationAllowed: false
      });
      return Array.isArray(value) ? Object.freeze(value.map(freezeRecord)) : freezeRecord(value);
    }
    const VNC_LESSON5_VALIDATION_REFS = Object.freeze(["src/tests/vnc.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    const VNC_LESSON5_CANVAS_REFS = Object.freeze(["Andrews Lesson 5.1", "Andrews Lesson 5.2", "Andrews Lesson 5.3", "Andrews Lesson 5.4", "Andrews Lesson 5.5"]);
    const VNC_LESSON5_INTRANSITIVE_FORMULA_FRAME = freezeInheritedVncDescription({
      kind: "lesson-5-intransitive-vnc-formula",
      sourceSection: "Andrews §5.1",
      formulaType: "VNC",
      formulaAbbreviation: "CNV",
      canvasFormula: "#pers1-pers2(STEM)tns+num1-num2#",
      visibleFormula: "#pers1-pers2(base)tiempo+núm1-núm2#",
      slotOrder: Object.freeze(["pers1", "pers2", "base", "tiempo", "num1", "num2"]),
      subjectSlots: Object.freeze(["pers1", "pers2", "num1", "num2"]),
      predicateSlots: Object.freeze(["base", "tiempo"]),
      valencePosition: "implicit-vacant-core",
      valenceRole: "intransitive",
      generationScope: "finite-intransitive-vnc-surface"
    });
    const VNC_LESSON5_SUBJECT_SLOT_FRAME = freezeInheritedVncDescription({
      kind: "lesson-5-subject-slot-frame",
      sourceSections: Object.freeze(["Andrews §5.2", "Andrews §5.3", "Andrews §5.4"]),
      caseSlot: Object.freeze({
        slot: "pers2",
        role: "nominative",
        classicalCarrier: "0"
      }),
      featureDistribution: Object.freeze({
        person: Object.freeze(["pers1"]),
        case: Object.freeze(["pers2"]),
        number: Object.freeze(["num1", "num2"]),
        animacyHumanness: "no-separate-subposition"
      }),
      historicalSurfaceAuthority: "repo-evidence-and-user-provided-forms",
      classicalCarriersAreNotFixtures: true
    });
    const VNC_LESSON5_SUBJECT_FILLER_PARADIGMS = freezeInheritedVncDescription([Object.freeze({
      id: "main-indicative-present-customary-imperfect-distant-past",
      sourceSection: "Andrews §5.4.1",
      tenseFamily: Object.freeze(["present", "customary-present", "imperfect", "distant-past"]),
      legacyAdaptationTenses: Object.freeze(["presente", "presente-habitual", "imperfecto", "pasado-remoto"]),
      singularConnector: "0-0",
      pluralConnector: "0-h",
      historicalAdaptationPluralBridge: Object.freeze({
        classicalCarrier: "h",
        adaptedCarrier: "t"
      }),
      legacyAdaptationSubjectSlots: Object.freeze([Object.freeze({
        person: "1sg",
        pers1: "ni",
        pers2: ""
      }), Object.freeze({
        person: "1pl",
        pers1: "ti",
        pers2: "t"
      }), Object.freeze({
        person: "2sg",
        pers1: "ti",
        pers2: ""
      }), Object.freeze({
        person: "2pl",
        pers1: "an",
        pers2: "t"
      }), Object.freeze({
        person: "3sg",
        pers1: "",
        pers2: ""
      }), Object.freeze({
        person: "3pl",
        pers1: "",
        pers2: "t"
      })])
    }), Object.freeze({
      id: "future-preterit-indicative",
      sourceSection: "Andrews §5.4.2",
      tenseFamily: Object.freeze(["future", "preterit"]),
      legacyAdaptationTenses: Object.freeze(["futuro", "preterito"]),
      connectorPattern: "c/qu~qui~0 plus 0/eh",
      historicalImplementationNote: "current engine realizes Classical future and preterit through tense suffix rules and preterit class logic, not Classical fixture import"
    }), Object.freeze({
      id: "nonpast-optative-admonitive-boundary",
      sourceSections: Object.freeze(["Andrews §5.4.3", "Andrews §5.4.4"]),
      tenseFamily: Object.freeze(["nonpast-optative", "nonpast-admonitive"]),
      legacyAdaptationTenses: Object.freeze(["optativo", "presente-desiderativo"]),
      historicalImplementationNote: "sentence-level optative/admonitive meanings remain Lessons 9-10; Lesson 5 only licenses finite-slot diagnostics"
    })]);
    const VNC_LESSON5_TENSE_MORPH_FRAME = freezeInheritedVncDescription({
      kind: "lesson-5-tense-morph-frame",
      sourceSection: "Andrews §5.5",
      tenseSlot: "tns",
      visibleSlot: "tiempo",
      fusedCategories: Object.freeze(["mood", "tense"]),
      stemCategories: Object.freeze(["aspect", "valence", "voice"]),
      stemDetailDeferredTo: Object.freeze(["Andrews Lesson 7", "Andrews Lesson 20", "Andrews Lesson 21", "Andrews Lesson 22"]),
      andrewsMoodTenseInventory: Object.freeze({
        indicative: Object.freeze({
          imperfectiveStem: Object.freeze(["present", "customary-present", "imperfect", "future"]),
          perfectiveStem: Object.freeze(["preterit", "distant-past"])
        }),
        optative: Object.freeze({
          imperfectiveStem: Object.freeze(["nonpast", "past"])
        }),
        admonitive: Object.freeze({
          perfectiveStem: Object.freeze(["nonpast"])
        })
      }),
      legacyAdaptationTenseInventory: Object.freeze(["presente", "presente-habitual", "presente-desiderativo", "imperfecto", "futuro", "preterito", "pasado-remoto", "condicional", "optativo", "perfecto", "pluscuamperfecto", "condicional-perfecto"]),
      tenseIsNotTime: true
    });
    const VNC_LESSON5_SUBSECTION_INVENTORY = freezeInheritedVncDescription([Object.freeze({
      id: "lesson5-intransitive-vnc-formula",
      andrewsSection: "5.1",
      category: "intransitive-vnc-formula",
      historicalDirectiveEs: "La CNV intransitiva usa #pers1-pers2(base)tiempo+núm1-núm2#; la valencia queda implícita y vacante en el núcleo.",
      historicalEngineSurface: "CNV finite surface route with empty objective slots and intransitive valence frame",
      redirectAction: "keep",
      historicalEvidenceStatus: "direct-canvas-audited",
      historicalImplementationState: "implemented-audited"
    }), Object.freeze({
      id: "lesson5-subject-positions",
      andrewsSection: "5.2",
      category: "subject-positions",
      historicalDirectiveEs: "Distribuir persona, caso y número en pers1, pers2, núm1 y núm2; animacidad y humanidad no reciben posición separada.",
      historicalEngineSurface: "pers1/pers2 subject slots plus Classical plural suffix bridge",
      redirectAction: "keep",
      historicalEvidenceStatus: "direct-canvas-audited",
      historicalImplementationState: "implemented-audited"
    }), Object.freeze({
      id: "lesson5-subject-morphic-fillers",
      andrewsSection: "5.3",
      category: "subject-morphic-fillers",
      historicalDirectiveEs: "Los rellenos de sujeto son morfos portadores de persona, caso y número; las variantes clásicas no se importan como formas classical.",
      historicalEngineSurface: "agreement slot inventory and Andrews source-gated subject prefixes/suffixes",
      redirectAction: "source-gated",
      historicalEvidenceStatus: "direct-canvas-with-classical-realization",
      historicalImplementationState: "implemented-adapted"
    }), Object.freeze({
      id: "lesson5-subject-paradigms",
      andrewsSection: "5.4",
      category: "subject-pronoun-paradigms",
      historicalDirectiveEs: "Agrupar los paradigmas de sujeto por correlación de tiempo con núm1/núm2; el sufijo plural clásico -h pasa por la ortografía classical antes de mostrarse.",
      historicalEngineSurface: "indicative and optative subject-slot identity plus tense-sensitive suffix rules",
      redirectAction: "keep",
      historicalEvidenceStatus: "direct-canvas-with-classical-realization",
      historicalImplementationState: "implemented-adapted"
    }), Object.freeze({
      id: "lesson5-predicate-tense-morphs",
      andrewsSection: "5.5",
      category: "predicate-tense-morphs",
      historicalDirectiveEs: "El predicado organiza base, voz, aspecto, valencia y tiempo; el slot tiempo fusiona modo y tiempo sin confundir tiempo gramatical con tiempo real.",
      historicalEngineSurface: "TENSE_SUFFIX_RULES, preterit class routing, active/nonactive gates, and finite CNV output",
      redirectAction: "keep",
      historicalEvidenceStatus: "direct-canvas-audited",
      historicalImplementationState: "implemented-audited"
    })]);
    const VNC_LESSON6_VALIDATION_REFS = Object.freeze(["src/tests/vnc.test.js", "src/tests/registry.test.js", "docs/GRAMMAR_SPEC.md"]);
    const VNC_LESSON6_CANVAS_REFS = Object.freeze(["Andrews Lesson 6.1", "Andrews Lesson 6.2", "Andrews Lesson 6.3", "Andrews Lesson 6.4", "Andrews Lesson 6.5", "Andrews Lesson 6.6", "Andrews Lesson 6.7"]);
    const VNC_LESSON6_TRANSITIVE_FORMULA_FRAME = freezeInheritedVncDescription({
      kind: "lesson-6-transitive-vnc-formula",
      sourceSections: Object.freeze(["Andrews §6.1", "Andrews §6.2", "Andrews §6.3"]),
      formulaType: "VNC",
      formulaAbbreviation: "CNV",
      formulas: Object.freeze({
        monadicValence: Object.freeze({
          canvasFormula: "#pers1-pers2+va(STEM)tns+num1-num2#",
          visibleFormula: "#pers1-pers2+val(base)tiempo+núm1-núm2#",
          valenceSlots: Object.freeze(["va"]),
          objectReference: "nonspecific-or-shuntline-reflexive"
        }),
        dyadicValence: Object.freeze({
          canvasFormula: "#pers1-pers2+va1-va2(STEM)tns+num1-num2#",
          visibleFormula: "#pers1-pers2+val1-val2(base)tiempo+núm1-núm2#",
          valenceSlots: Object.freeze(["va1", "va2"]),
          objectReference: "specific-mainline-projective-or-mainline-reflexive"
        })
      }),
      transitiveDifferenceFromLesson5: "valence-position-present",
      valencePositionCategories: Object.freeze(["person", "number", "animacy", "humanness", "objective-case"]),
      additionalObjectiveDistinctions: Object.freeze(["trajectory", "specificity", "prominence"])
    });
    const VNC_LESSON6_OBJECT_CATEGORY_FRAME = freezeInheritedVncDescription({
      kind: "lesson-6-object-category-frame",
      sourceSection: "Andrews §6.1",
      objectiveCaseFeature: "objective",
      trajectory: Object.freeze(["projective", "reflexive", "reciprocative"]),
      specificity: Object.freeze(["specific", "nonspecific"]),
      prominence: Object.freeze(["mainline", "shuntline"]),
      nonSpecificIsIndefinite: true,
      shuntlineProminenceDeferredTo: Object.freeze(["Andrews Lesson 21", "Andrews Lesson 22", "Andrews Lesson 23", "Andrews Lesson 24", "Andrews Lesson 25", "Andrews Lesson 26"])
    });
    const VNC_LESSON6_MONADIC_VALENCE_FILLERS = freezeInheritedVncDescription([Object.freeze({
      id: "shuntline-reflexive-reciprocative",
      sourceSection: "Andrews §6.2.1",
      classicalCarrier: "ne",
      legacyAdaptationSlotValue: "ne",
      legacyAdaptationSlotStatus: "direct-classical-generation",
      trajectory: "reflexive-reciprocative",
      prominence: "shuntline",
      specificity: "specific",
      realizationSource: "Andrews Lección 6 con forma Classical directa provista por el usuario; no se colapsa con mu de línea principal",
      historicalGenerationPolicy: "direct-classical-generation"
    }), Object.freeze({
      id: "nonspecific-human-projective",
      sourceSection: "Andrews §6.2.2a",
      classicalCarrier: "te",
      legacyAdaptationSlotValue: "te",
      trajectory: "projective",
      specificity: "nonspecific",
      humanness: "human",
      pronounClass: "indefinite"
    }), Object.freeze({
      id: "nonspecific-nonhuman-projective",
      sourceSection: "Andrews §6.2.2b",
      classicalCarrier: "tla",
      legacyAdaptationSlotValue: "ta",
      trajectory: "projective",
      specificity: "nonspecific",
      humanness: "nonhuman",
      pronounClass: "indefinite",
      classicalRealizationAuthority: "Classical Andrews transcription"
    })]);
    const VNC_LESSON6_PROJECTIVE_OBJECT_PARADIGM = freezeInheritedVncDescription([Object.freeze({
      person: "1sg",
      classicalDyad: "n-ech",
      legacyAdaptationDyad: "n-ech",
      legacyAdaptationPrefix: "nech",
      glossEs: "me"
    }), Object.freeze({
      person: "1pl",
      classicalDyad: "t-ech",
      legacyAdaptationDyad: "t-ech",
      legacyAdaptationPrefix: "tech",
      glossEs: "nos"
    }), Object.freeze({
      person: "2sg",
      classicalDyad: "m-itz",
      legacyAdaptationDyad: "m-etz",
      legacyAdaptationPrefix: "metz",
      glossEs: "te"
    }), Object.freeze({
      person: "2pl",
      classicalDyad: "am-ech",
      legacyAdaptationDyad: "m-etz-in",
      legacyAdaptationPrefix: "metzin",
      glossEs: "los/las a ustedes"
    }), Object.freeze({
      person: "3sg",
      classicalDyad: "c-0/qu-0/qui-0",
      legacyAdaptationDyad: "ki-0/k-0",
      legacyAdaptationPrefix: "ki/k",
      glossEs: "lo/la"
    }), Object.freeze({
      person: "3pl",
      classicalDyad: "qu-im",
      legacyAdaptationDyad: "k-in",
      legacyAdaptationPrefix: "kin",
      glossEs: "los/las"
    })]);
    const VNC_LESSON6_DYADIC_OBJECT_FRAME = freezeInheritedVncDescription({
      kind: "lesson-6-dyadic-object-frame",
      sourceSections: Object.freeze(["Andrews §6.3", "Andrews §6.4", "Andrews §6.5"]),
      subpositions: Object.freeze(["va1", "va2"]),
      featureDistribution: Object.freeze({
        thirdPerson: Object.freeze({
          va1: Object.freeze(["person", "objective-case"]),
          va2: Object.freeze(["number"]),
          classicalVa1Variants: Object.freeze(["c/qu", "qui"]),
          classicalVa2Variants: Object.freeze(["0", "im", "in"])
        }),
        nonThirdPerson: Object.freeze({
          va1: Object.freeze(["person", "number"]),
          va2: Object.freeze(["objective-case"]),
          classicalVa1Fillers: Object.freeze(["m", "am", "n", "t"]),
          classicalVa2Variants: Object.freeze(["ech", "itz"])
        })
      }),
      legacyAdaptationSpecificPrefixes: Object.freeze(["nech", "tech", "metz", "metzin", "ki", "k", "kin"]),
      legacyAdaptationDyadByPrefix: Object.freeze({
        nech: "n-ech",
        tech: "t-ech",
        metz: "m-etz",
        metzin: "m-etz-in",
        ki: "ki-0",
        k: "k-0",
        kin: "k-in"
      }),
      legacyAdaptationAllomorphyNotes: Object.freeze(["ki-0 is the direct Classical 3sg object dyad; k-0 is the reduced Classical dyad when the object prefix surfaces as k"])
    });
    const VNC_LESSON6_REFLEXIVE_OBJECT_FRAME = freezeInheritedVncDescription({
      kind: "lesson-6-reflexive-object-frame",
      sourceSections: Object.freeze(["Andrews §6.6", "Andrews §6.7"]),
      valencePosition: "va1-va2",
      trajectory: "mainline-reflexive-reciprocative",
      subjectAgreement: "object reflects subject person and number",
      classicalDyads: Object.freeze([Object.freeze({
        person: "1sg",
        dyad: "n-o/n-0",
        glossEs: "a mí mismo"
      }), Object.freeze({
        person: "1pl",
        dyad: "t-o/t-0",
        glossEs: "a nosotros mismos / entre nosotros"
      }), Object.freeze({
        person: "nonfirst",
        dyad: "m-o/m-0",
        legacyAdaptationDyad: "m-u/m-0",
        glossEs: "a sí mismo(s) / entre sí"
      })]),
      legacyAdaptationReflexiveSlot: "mu",
      legacyAdaptationReflexiveParadigm: "m-u/m-0",
      legacyAdaptationReflexiveCondition: "m-u cuando la alomorfía conserva mu; m-0 cuando obj1-mu-before-vowel-m reduce mu a m",
      historicalEngineBehavior: "same-person specific objects are redirected to dyadic mainline mu by reflexive slot logic",
      generationAddsNoClassicalFixtures: true
    });
    const VNC_LESSON6_SUBSECTION_INVENTORY = freezeInheritedVncDescription([Object.freeze({
      id: "lesson6-transitive-vnc-formulas",
      andrewsSection: "6.1",
      category: "transitive-vnc-formulas",
      historicalDirectiveEs: "La CNV transitiva difiere de la intransitiva por la posición de valencia, que porta pronombre objetivo.",
      historicalEngineSurface: "CNV route with occupied obj1/valence slot and valency frame",
      redirectAction: "keep",
      historicalEvidenceStatus: "direct-canvas-audited",
      historicalImplementationState: "implemented-audited"
    }), Object.freeze({
      id: "lesson6-monadic-valence",
      andrewsSection: "6.2",
      category: "monadic-valence-position",
      historicalDirectiveEs: "La valencia monádica cubre reflexivo/recíproco de línea secundaria y objetos inespecíficos humanos/no humanos.",
      historicalEngineSurface: "ne, te, and ta object-slot diagnostics with direct Classical realization",
      redirectAction: "keep",
      historicalEvidenceStatus: "direct-canvas-with-classical-realization",
      historicalImplementationState: "implemented-adapted"
    }), Object.freeze({
      id: "lesson6-dyadic-valence-formula",
      andrewsSection: "6.3",
      category: "dyadic-valence-formula",
      historicalDirectiveEs: "La valencia diádica usa val1-val2 para objetos específicos de línea principal.",
      historicalEngineSurface: "specific obj1 prefixes and valency frame",
      redirectAction: "keep",
      historicalEvidenceStatus: "direct-canvas-audited",
      historicalImplementationState: "implemented-audited"
    }), Object.freeze({
      id: "lesson6-projective-object-distribution",
      andrewsSection: "6.4",
      category: "projective-object-distribution",
      historicalDirectiveEs: "Los objetos proyectivos reparten persona, número y caso entre val1 y val2 según sean de 3a persona o no.",
      historicalEngineSurface: "specific object prefix inventory and allomorphy metadata",
      redirectAction: "keep",
      historicalEvidenceStatus: "direct-canvas-with-classical-realization",
      historicalImplementationState: "implemented-adapted"
    }), Object.freeze({
      id: "lesson6-projective-object-summary",
      andrewsSection: "6.5",
      category: "projective-object-paradigm",
      historicalDirectiveEs: "El paradigma de objeto específico se conserva como mapa de función; la fórmula visible expone subcasillas Classical directas.",
      historicalEngineSurface: "n-ech/t-ech/m-etz/m-etz-in/ki-0~k-0/k-in formula dyads plus current surface prefix set",
      redirectAction: "keep",
      historicalEvidenceStatus: "direct-canvas-with-classical-realization",
      historicalImplementationState: "implemented-adapted"
    }), Object.freeze({
      id: "lesson6-mainline-reflexive-distribution",
      andrewsSection: "6.6",
      category: "mainline-reflexive-distribution",
      historicalDirectiveEs: "El reflexivo de línea principal refleja persona y número del sujeto; no se debe duplicar información fuera del contrato de objeto.",
      historicalEngineSurface: "same-person object auto-switch to reflexive mu with diagnostics",
      redirectAction: "keep",
      historicalEvidenceStatus: "direct-canvas-with-classical-realization",
      historicalImplementationState: "implemented-adapted"
    }), Object.freeze({
      id: "lesson6-mainline-reflexive-summary",
      andrewsSection: "6.7",
      category: "mainline-reflexive-paradigm",
      historicalDirectiveEs: "Los paradigmas reflexivos/recíprocos quedan vinculados al sujeto; la fórmula visible expone m-u o m-0 según la alomorfía mu.",
      historicalEngineSurface: "reflexivo slot metadata with conditional direct Classical m-u/m-0 paradigm and unchanged finite output",
      redirectAction: "keep",
      historicalEvidenceStatus: "direct-canvas-with-classical-realization",
      historicalImplementationState: "implemented-adapted"
    })]);
    const VNC_LESSON6_SHOT_REPORT = freezeInheritedVncDescription([Object.freeze({
      andrewsRef: "Andrews Lesson 6.1",
      historicalRequirementEs: "La CNV transitiva se distingue por la posicion de valencia objetiva y por trayectoria, especificidad y prominencia.",
      historicalShotStatus: "hit-no-edit",
      historicalMissProbeEs: "La ruta renderiza un objeto, pero no distingue valencia monadica/diadica ni especifico/inespecifico/reflexivo.",
      changedFiles: Object.freeze([])
    }), Object.freeze({
      andrewsRef: "Andrews Lesson 6.2",
      historicalRequirementEs: "La formula monadica +va cubre ne de linea secundaria y objetos inespecificos te/ta.",
      historicalShotStatus: "hit-no-edit",
      historicalMissProbeEs: "ne, te o ta aparecen como val1-val2 o quedan bloqueados.",
      changedFiles: Object.freeze([])
    }), Object.freeze({
      andrewsRef: "Andrews Lesson 6.2.1",
      historicalRequirementEs: "ne es reflexivo/reciproco de linea secundaria, no mu de linea principal.",
      historicalShotStatus: "hit-no-edit",
      historicalMissProbeEs: "ne se colapsa en mu, se bloquea, o pierde la formula monadica.",
      changedFiles: Object.freeze([])
    }), Object.freeze({
      andrewsRef: "Andrews Lesson 6.2.2a",
      historicalRequirementEs: "te es proyectivo inespecifico humano.",
      historicalShotStatus: "hit-no-edit",
      historicalMissProbeEs: "te se trata como objeto personal especifico o como valencia diadica.",
      changedFiles: Object.freeze([])
    }), Object.freeze({
      andrewsRef: "Andrews Lesson 6.2.2b",
      historicalRequirementEs: "tla corresponde estructuralmente a Classical ta como proyectivo inespecifico no humano.",
      historicalShotStatus: "hit-no-edit",
      historicalMissProbeEs: "ta se importa como superficie clasica tla o se trata como objeto especifico.",
      changedFiles: Object.freeze([])
    }), Object.freeze({
      andrewsRef: "Andrews Lesson 6.3",
      historicalRequirementEs: "Los objetos especificos de linea principal usan valencia diadica val1-val2.",
      historicalShotStatus: "hit-no-edit",
      historicalMissProbeEs: "ki, kin, nech, tech, metz, metzin o mu aparecen como valencia monadica.",
      changedFiles: Object.freeze([])
    }), Object.freeze({
      andrewsRef: "Andrews Lesson 6.4",
      historicalRequirementEs: "Los objetos proyectivos personales distribuyen persona, numero y caso entre val1 y val2.",
      historicalShotStatus: "hit-no-edit",
      historicalMissProbeEs: "La superficie genera, pero la formula oculta la propiedad de subcasillas.",
      changedFiles: Object.freeze([])
    }), Object.freeze({
      andrewsRef: "Andrews Lesson 6.4.1",
      historicalRequirementEs: "val1 siempre manifiesta persona, nunca como unica informacion.",
      historicalShotStatus: "hit-no-edit",
      historicalMissProbeEs: "val1 queda como persona desnuda sin caso objetivo o numero.",
      changedFiles: Object.freeze([])
    }), Object.freeze({
      andrewsRef: "Andrews Lesson 6.4.1a",
      historicalRequirementEs: "En tercera persona, val1 combina persona y caso objetivo.",
      historicalShotStatus: "hit-no-edit",
      historicalMissProbeEs: "ki/k se presenta como monadico o como portador del numero.",
      changedFiles: Object.freeze([])
    }), Object.freeze({
      andrewsRef: "Andrews Lesson 6.4.1b",
      historicalRequirementEs: "En primera y segunda persona, val1 combina persona y numero.",
      historicalShotStatus: "hit-no-edit",
      historicalMissProbeEs: "nech, tech, metz o metzin no exponen los dyads Classical adaptados.",
      changedFiles: Object.freeze([])
    }), Object.freeze({
      andrewsRef: "Andrews Lesson 6.4.2",
      historicalRequirementEs: "val2 provee la categoria no contenida en val1.",
      historicalShotStatus: "hit-no-edit",
      historicalMissProbeEs: "val2 queda vacio o se pliega en el prefijo superficial.",
      changedFiles: Object.freeze([])
    }), Object.freeze({
      andrewsRef: "Andrews Lesson 6.4.2a",
      historicalRequirementEs: "En tercera persona, val2 manifiesta numero: cero singular e in/im plural.",
      historicalShotStatus: "hit-edit",
      historicalMissProbeEs: "nikpiya muestra ki-0 en vez de k-0, kipiya muestra k-0 en vez de ki-0, o kin no expone k-in.",
      changedFiles: Object.freeze(["docs/ANDREWS_TRAJECTORY.md", "docs/GRAMMAR_SPEC.md", "src/core/generation/engine.mjs", "src/core/generation/morphology_engine.mjs", "src/core/orthography/orthography.mjs", "src/core/vnc/vnc.mjs", "src/tests/vnc.test.js"])
    }), Object.freeze({
      andrewsRef: "Andrews Lesson 6.4.2b",
      historicalRequirementEs: "En no tercera persona, val2 expresa caso objetivo.",
      historicalShotStatus: "hit-no-edit",
      historicalMissProbeEs: "metz/metzin quedan sin division o importan itz sin adaptacion Classical.",
      changedFiles: Object.freeze([])
    }), Object.freeze({
      andrewsRef: "Andrews Lesson 6.5",
      historicalRequirementEs: "El paradigma proyectivo especifico se muestra como dyads Classical directos.",
      historicalShotStatus: "hit-edit",
      historicalMissProbeEs: "Los prefijos generan, pero faltan n-ech, t-ech, m-etz, m-etz-in, ki-0/k-0 o k-in en la formula, o nikpiya no acopla superficie k con formula k-0.",
      changedFiles: Object.freeze(["docs/ANDREWS_TRAJECTORY.md", "docs/GRAMMAR_SPEC.md", "src/core/generation/engine.mjs", "src/core/generation/morphology_engine.mjs", "src/core/orthography/orthography.mjs", "src/core/vnc/vnc.mjs", "src/tests/vnc.test.js"])
    }), Object.freeze({
      andrewsRef: "Andrews Lesson 6.6",
      historicalRequirementEs: "El reflexivo principal es diadico y refleja persona/numero del sujeto.",
      historicalShotStatus: "hit-no-edit",
      historicalMissProbeEs: "mu se duplica como mu-mu o se analiza como valencia monadica.",
      changedFiles: Object.freeze([])
    }), Object.freeze({
      andrewsRef: "Andrews Lesson 6.6.1",
      historicalRequirementEs: "En reflexivo principal, val1 es el locus de persona y numero.",
      historicalShotStatus: "hit-no-edit",
      historicalMissProbeEs: "La formula reflexiva no muestra m en val1 para no primera persona.",
      changedFiles: Object.freeze([])
    }), Object.freeze({
      andrewsRef: "Andrews Lesson 6.6.2",
      historicalRequirementEs: "En reflexivo principal, val2 expresa caso objetivo y alterna u/0 segun alomorfia.",
      historicalShotStatus: "hit-no-edit",
      historicalMissProbeEs: "m-u/m-0 se elige por atajo amplio y no por la misma regla de superficie.",
      changedFiles: Object.freeze([])
    }), Object.freeze({
      andrewsRef: "Andrews Lesson 6.7",
      historicalRequirementEs: "El paradigma reflexivo Classical visible usa m-u o m-0 acoplado a la superficie.",
      historicalShotStatus: "hit-no-edit",
      historicalMissProbeEs: "mu+ajsi no da m-u/muajsit o mu+altia no da m-0/maltiat con marco de regla.",
      changedFiles: Object.freeze([])
    })]);
    const VNC_LESSON7_VALIDATION_REFS = Object.freeze(["src/tests/vnc.test.js", "src/tests/registry.test.js", "src/tests/preterit.test.js", "docs/GRAMMAR_SPEC.md"]);
    const VNC_LESSON7_CANVAS_REFS = Object.freeze(["Andrews Lesson 7.1", "Andrews Lesson 7.2", "Andrews Lesson 7.3", "Andrews Lesson 7.4", "Andrews Lesson 7.5", "Andrews Lesson 7.6", "Andrews Lesson 7.7", "Andrews Lesson 7.8", "Andrews Lesson 7.9", "Andrews Lesson 7.10"]);
    const VNC_LESSON7_VERBSTEM_STRUCTURE_FRAME = freezeInheritedVncDescription({
      kind: "lesson-7-verbstem-structure-frame",
      sourceSection: "Andrews §7.1",
      stemRole: "lexical-meaning-locus",
      morphology: Object.freeze(["monomorphemic", "polymorphemic"]),
      internalBoundary: "-",
      stemBoundary: "()",
      internalMorphsGlossedIndividually: false,
      analysisPolicy: "stem translation stays unified even when internal morph boundaries are shown"
    });
    const VNC_LESSON7_CITATION_FORM_FRAME = freezeInheritedVncDescription({
      kind: "lesson-7-citation-form-frame",
      sourceSection: "Andrews §7.2",
      citationUnit: "verbcore",
      verbcoreFormula: "valence + stem",
      historicalDirectiveEs: "Citar el núcleo verbal con su valencia; no citar una base verbal aislada cuando la valencia decide la ruta.",
      citationObjectMarkers: Object.freeze({
        intransitive: Object.freeze({
          classical: "",
          legacyAdaptation: ""
        }),
        projectiveHuman: Object.freeze({
          classical: "te",
          legacyAdaptation: "te"
        }),
        projectiveNonhuman: Object.freeze({
          classical: "tla",
          legacyAdaptation: "ta",
          classicalRealizationAuthority: "Classical Andrews transcription"
        }),
        reflexive: Object.freeze({
          classical: "m-o/m-0",
          legacyAdaptation: "mu"
        }),
        reciprocalHuman: Object.freeze({
          classical: "t-o/t-0",
          legacyAdaptation: "mu",
          implementationBoundary: "current reflexive slot; reciprocal interpretation needs context"
        })
      }),
      classicalCitationExamplesAreFixtures: false
    });
    const VNC_LESSON7_VERBSTEM_CLASS_FRAME = freezeInheritedVncDescription({
      kind: "lesson-7-verbstem-class-frame",
      sourceSection: "Andrews §7.3",
      classBasis: "perfective-stem-shape",
      imperfectiveIsBasicShape: true,
      classes: Object.freeze({
        A: Object.freeze({
          id: "A",
          perfectiveFormation: "same carrier shape as imperfective, with A-2 long-final-vowel alternants",
          imperfectiveShapes: "one or two",
          totalShapeSummary: "A-1 one shape; A-2 two shapes",
          legacyEngineClass: "A"
        }),
        B: Object.freeze({
          id: "B",
          perfectiveFormation: "final vowel disappears or causative final vowel is silently present",
          imperfectiveShapes: "one",
          totalShapeSummary: "two shapes",
          legacyEngineClass: "B"
        }),
        C: Object.freeze({
          id: "C",
          perfectiveFormation: "final long a after o/i is replaced by glottal stop",
          imperfectiveShapes: "four",
          totalShapeSummary: "five shapes",
          legacyEngineClass: "C"
        }),
        D: Object.freeze({
          id: "D",
          perfectiveFormation: "adds glottal stop after final long a and shortens the vowel",
          imperfectiveShapes: "two",
          totalShapeSummary: "three shapes",
          legacyEngineClass: "D"
        })
      }),
      legacyEngineUsesClassLabels: Object.freeze(["A", "B", "C", "D"])
    });
    const VNC_LESSON7_CLASS_B_CHANGE_FRAME = freezeInheritedVncDescription({
      kind: "lesson-7-class-b-change-frame",
      sourceSection: "Andrews §7.4",
      trigger: "loss-or-silencing-of-final-vowel",
      changeKinds: Object.freeze(["spelling-change", "phonological-change"]),
      classicalExamples: Object.freeze([Object.freeze({
        pattern: "k spelling",
        example: "(miqui) > (mic)",
        historicalAdaptationBoundary: "Classical realization must use repo orthography, not Classical c/qu spelling"
      }), Object.freeze({
        pattern: "s spelling",
        example: "(neci) > (nez)",
        historicalAdaptationBoundary: "Classical realization must use repo orthography"
      }), Object.freeze({
        pattern: "m to n-like nasal",
        example: "(nemi) > (nen)",
        historicalAdaptationBoundary: "current preterit classes decide attested output"
      }), Object.freeze({
        pattern: "y to s/x",
        example: "(tlaoco-ya) > (tlaoco-x)",
        historicalAdaptationBoundary: "Classical h/j/x/s choices remain source-gated"
      })]),
      traditionalSpellingWarning: "oa/ia spellings can obscure w/y and mislead class assignment"
    });
    const VNC_LESSON7_VARIABLE_CLASS_FRAME = freezeInheritedVncDescription({
      kind: "lesson-7-variable-class-frame",
      sourceSection: "Andrews §7.5",
      variableMembership: true,
      typicalValence: "mostly-intransitive",
      classOptions: Object.freeze(["A", "B"]),
      historicalImplementationPolicy: "accept class alternatives only from parsed metadata, repo evidence, or user-provided forms"
    });
    const VNC_LESSON7_CLASS_GUIDELINES = freezeInheritedVncDescription([Object.freeze({
      id: "monosyllabic-long-a",
      sourceSection: "Andrews §7.6.1",
      classId: "D",
      historicalDirectiveEs: "Monosílabos con a larga final pertenecen a clase D; otros monosílabos tienden a clase A."
    }), Object.freeze({
      id: "final-vowel-after-cluster",
      sourceSection: "Andrews §7.6.2",
      classId: "A",
      historicalDirectiveEs: "Final precedido por dos consonantes o consonante larga apunta a clase A."
    }), Object.freeze({
      id: "final-ka",
      sourceSection: "Andrews §7.6.3",
      classId: "A",
      historicalDirectiveEs: "Sílabas finales ka apuntan a clase A, con excepciones source-gated."
    }), Object.freeze({
      id: "final-tla",
      sourceSection: "Andrews §7.6.4",
      classId: "A",
      historicalDirectiveEs: "Sílabas finales tla apuntan a clase A en la regla clásica; en Classical la letra visible pasa por ta."
    }), Object.freeze({
      id: "intransitive-wa-change",
      sourceSection: "Andrews §7.6.5",
      classId: "A",
      historicalDirectiveEs: "Intransitivos en wa que significan cambio apuntan a clase A."
    }), Object.freeze({
      id: "final-ya",
      sourceSection: "Andrews §7.6.6",
      classId: "B",
      historicalDirectiveEs: "Final ya apunta a clase B, con opción A frecuente en intransitivos."
    }), Object.freeze({
      id: "final-o",
      sourceSection: "Andrews §7.6.7",
      classId: "A",
      historicalDirectiveEs: "Final o corta o larga apunta a clase A."
    }), Object.freeze({
      id: "class-d-list",
      sourceSection: "Andrews §7.6.8",
      classId: "D",
      historicalDirectiveEs: "La lista cerrada de ocho troncos clase D se conserva como regla de clasificación, no como fixture Classical automática."
    })]);
    const VNC_LESSON7_PREDICATE_FORMATION_FRAME = freezeInheritedVncDescription({
      kind: "lesson-7-predicate-formation-frame",
      sourceSection: "Andrews §7.7",
      predicateConstituents: Object.freeze(["core", "tense"]),
      cooperatesWithSubjectPronounsFrom: "Andrews §5.4",
      indicativeSide: Object.freeze(["present", "customary-present", "imperfect", "future", "preterit", "distant-past"]),
      nonIndicativeSide: Object.freeze(["nonpast-optative", "past-optative", "nonpast-admonitive"]),
      legacyAdaptationImplementedTenses: Object.freeze(["presente", "presente-habitual", "imperfecto", "futuro", "preterito", "pasado-remoto", "optativo", "presente-desiderativo"]),
      legacyEngineSurfaces: "TENSE_SUFFIX_RULES plus preterit class routing and suppletive path gates"
    });
    const VNC_LESSON7_ANALYSIS_FRAME = freezeInheritedVncDescription({
      kind: "lesson-7-analysis-translation-frame",
      sourceSection: "Andrews §7.8",
      requiredDivision: "subject-plus-predicate",
      linearAnalysisOrder: Object.freeze(["morphic-carrier", "morphic-content", "translation"]),
      diagrammaticAnalysisOrder: Object.freeze(["morphic-carrier", "function-unit", "translation-equivalent"]),
      ambiguityPolicy: "ambiguous surfaces require structural analysis rather than surface-only translation",
      supportiveInitialVowelPolicy: "supportive initial i may drop after reflexive or nonspecific nonhuman object, but real initial vowels do not"
    });
    const VNC_LESSON7_OBJECT_RELATIONSHIP_FRAME = freezeInheritedVncDescription({
      kind: "lesson-7-indefinite-personal-object-frame",
      sourceSection: "Andrews §7.9",
      humanIndefinite: Object.freeze({
        classical: "te",
        legacyAdaptation: "te",
        relatesTo: Object.freeze(["reflexive", "specific projective personal objects"]),
        belongsToSection: "7.9.1",
        aboutTopic: "human-object-specified"
      }),
      nonhumanIndefinite: Object.freeze({
        classical: "tla",
        legacyAdaptation: "ta",
        relatesTo: Object.freeze(["3sg/3common", "3pl animate"]),
        belongsToSection: "7.9.2",
        aboutTopic: "nonhuman-object-specified"
      }),
      indefiniteRange: Object.freeze(["nonspecific", "vague", "total"]),
      subjectNumberDistinction: Object.freeze({
        singular: "reflexive interpretation only",
        plural: "reflexive form with an additional reciprocative interpretation"
      }),
      evidencePolicy: Object.freeze({
        examplesAuthorizeGeneration: false,
        evidenceAbsenceBlocksGeneration: false,
        typedGrammarAuthorizesUnlistedRealizations: true
      }),
      implementationBoundary: "object controls may explain relationships; they do not prove a clause relation by surface alone"
    });
    const VNC_LESSON7_TLA_FUSION_FRAME = freezeInheritedVncDescription({
      kind: "lesson-7-ta-fusion-frame",
      sourceSection: "Andrews §7.10",
      classicalName: "tla fusion",
      legacyAdaptationName: "fusión ta",
      processKind: "derivational",
      sourceStructure: "tla + transitive stem",
      targetStructure: "derived intransitive verbstem",
      objectSlotAfterFusion: "none",
      meaningMayShift: true,
      boundaryTest: "incorporated adverb before tla/ta indicates that the nonspecific object has fused into the stem",
      historicalGenerationPolicy: "treat as stem derivation evidence, not as an obj1 prefix at finite-generation time"
    });
    const VNC_LESSON7_SUBSECTION_INVENTORY = freezeInheritedVncDescription([Object.freeze({
      id: "lesson7-verbstem-structure",
      andrewsSection: "7.1",
      category: "verbstem-morphemic-structure",
      historicalDirectiveEs: "El tronco verbal porta el significado léxico y puede ser mono- o polimorfémico; sus morfos internos no se glosan como palabras separadas.",
      historicalEngineSurface: "stem frame and parser morph-boundary diagnostics",
      redirectAction: "keep",
      historicalEvidenceStatus: "direct-canvas-audited",
      historicalImplementationState: "implemented-audited"
    }), Object.freeze({
      id: "lesson7-citation-form",
      andrewsSection: "7.2",
      category: "verbcore-citation-form",
      historicalDirectiveEs: "La cita verbal debe incluir valencia: núcleo verbal = valencia + tronco.",
      historicalEngineSurface: "parseVerbInput valence metadata and object-prefix gates",
      redirectAction: "keep",
      historicalEvidenceStatus: "direct-canvas-with-classical-realization",
      historicalImplementationState: "implemented-adapted"
    }), Object.freeze({
      id: "lesson7-verbstem-classes",
      andrewsSection: "7.3",
      category: "verbstem-classes",
      historicalDirectiveEs: "Las clases A/B/C/D dependen de la forma perfectiva frente a la imperfectiva básica.",
      historicalEngineSurface: "preterit class routing and verbstem class profile metadata",
      redirectAction: "keep",
      historicalEvidenceStatus: "direct-canvas-audited",
      historicalImplementationState: "implemented-audited"
    }), Object.freeze({
      id: "lesson7-class-b-changes",
      andrewsSection: "7.4",
      category: "class-b-perfective-changes",
      historicalDirectiveEs: "La pérdida o silencio de la vocal final en clase B provoca cambios ortográficos o fonológicos; la realización Classical requiere fuente Andrews concreta y verificación ortográfica local.",
      historicalEngineSurface: "preterit class allomorphy and orthography bridge diagnostics",
      redirectAction: "source-gated",
      historicalEvidenceStatus: "direct-canvas-with-classical-realization",
      historicalImplementationState: "implemented-adapted"
    }), Object.freeze({
      id: "lesson7-variable-class",
      andrewsSection: "7.5",
      category: "variable-class-membership",
      historicalDirectiveEs: "Algunos verbos pueden pertenecer a A o B sin contraste; las alternativas se aceptan solo con metadatos o evidencia.",
      historicalEngineSurface: "variant-by-class metadata and preterit class selection",
      redirectAction: "keep",
      historicalEvidenceStatus: "direct-canvas-audited",
      historicalImplementationState: "implemented-audited"
    }), Object.freeze({
      id: "lesson7-class-guidelines",
      andrewsSection: "7.6",
      category: "class-determination-guidelines",
      historicalDirectiveEs: "Las guías de clase orientan clasificación; no sustituyen evidencia léxica Classical/Classical.",
      historicalEngineSurface: "class guessers, parsed metadata, and preterit class tests",
      redirectAction: "source-gated",
      historicalEvidenceStatus: "direct-canvas-diagnostic",
      historicalImplementationState: "implemented-diagnostic"
    }), Object.freeze({
      id: "lesson7-predicate-formation",
      andrewsSection: "7.7",
      category: "core-tense-predicate-formation",
      historicalDirectiveEs: "Las variantes de tronco cooperan con el slot tiempo para formar el predicado de la CNV.",
      historicalEngineSurface: "TENSE_SUFFIX_RULES and preterit class routing",
      redirectAction: "keep",
      historicalEvidenceStatus: "direct-canvas-audited",
      historicalImplementationState: "implemented-audited"
    }), Object.freeze({
      id: "lesson7-analysis-translation",
      andrewsSection: "7.8",
      category: "vnc-analysis-translation",
      historicalDirectiveEs: "La traducción debe respetar la división obligatoria sujeto + predicado y no depender solo de la superficie.",
      historicalEngineSurface: "nuclearClauseShell, grammarFrame, and formula echo diagnostics",
      redirectAction: "keep",
      historicalEvidenceStatus: "direct-canvas-audited",
      historicalImplementationState: "implemented-audited"
    }), Object.freeze({
      id: "lesson7-indefinite-personal-object-relationship",
      andrewsSection: "7.9",
      category: "indefinite-personal-object-relationship",
      historicalDirectiveEs: "Relacionar te/ta indefinidos con objetos personales específicos sin colapsarlos en la misma función.",
      historicalEngineSurface: "object-prefix sets and valency-frame metadata",
      redirectAction: "keep",
      historicalEvidenceStatus: "direct-canvas-with-classical-realization",
      historicalImplementationState: "implemented-adapted"
    }), Object.freeze({
      id: "lesson7-ta-fusion",
      andrewsSection: "7.10",
      category: "ta-fusion-derivation",
      historicalDirectiveEs: "La fusión ta es derivación: ta + tronco transitivo produce un tronco intransitivo nuevo, no un obj1 visible.",
      historicalEngineSurface: "ta-fusion parser metadata and intransitive derived-stem boundary",
      redirectAction: "keep",
      historicalEvidenceStatus: "direct-canvas-with-classical-realization",
      historicalImplementationState: "implemented-adapted"
    })]);

    // Shared agreement combo validation extracted to src/core/agreement/combo_validation.mjs
    // Shared morphology support extracted to src/core/generation/morphology_support.mjs
    // Shared morphology engine extracted to src/core/generation/morphology_engine.mjs

    function cloneVncLesson5Array(value) {
      return Array.isArray(value) ? value.map(entry => cloneVncLesson5Record(entry)) : value;
    }
    function cloneVncLesson5Record(value) {
      if (Array.isArray(value)) {
        return cloneVncLesson5Array(value);
      }
      if (!value || typeof value !== "object") {
        return value;
      }
      return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, cloneVncLesson5Record(entry)]));
    }
    function getVncIntransitiveFormulaFrame() {
      return cloneVncLesson5Record(VNC_LESSON5_INTRANSITIVE_FORMULA_FRAME);
    }
    function getVncSubjectSlotFrame() {
      return cloneVncLesson5Record(VNC_LESSON5_SUBJECT_SLOT_FRAME);
    }
    function getVncSubjectFillerParadigms() {
      return cloneVncLesson5Array(VNC_LESSON5_SUBJECT_FILLER_PARADIGMS);
    }
    function getVncTenseMorphFrame() {
      return cloneVncLesson5Record(VNC_LESSON5_TENSE_MORPH_FRAME);
    }
    function getFiniteVncSubsectionInventory() {
      return VNC_LESSON5_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        canvasRef: `Andrews Lesson ${entry.andrewsSection}`,
        validationRefs: Array.from(VNC_LESSON5_VALIDATION_REFS),
        historicalGenerationPolicy: "solo por rutas de cláusula verbal existentes con fuente Andrews concreta y puente ortografico; esta auditoría no crea fixtures"
      }));
    }
    function getVncTransitiveFormulaFrame() {
      return cloneVncLesson5Record(VNC_LESSON6_TRANSITIVE_FORMULA_FRAME);
    }
    function getVncObjectCategoryFrame() {
      return cloneVncLesson5Record(VNC_LESSON6_OBJECT_CATEGORY_FRAME);
    }
    function getVncMonadicValenceFillers() {
      return cloneVncLesson5Array(VNC_LESSON6_MONADIC_VALENCE_FILLERS);
    }
    function getVncDyadicObjectFrame() {
      return cloneVncLesson5Record(VNC_LESSON6_DYADIC_OBJECT_FRAME);
    }
    function getVncProjectiveObjectParadigm() {
      return cloneVncLesson5Array(VNC_LESSON6_PROJECTIVE_OBJECT_PARADIGM);
    }
    function getVncReflexiveObjectFrame() {
      return cloneVncLesson5Record(VNC_LESSON6_REFLEXIVE_OBJECT_FRAME);
    }
    function getTransitiveVncSubsectionInventory() {
      return VNC_LESSON6_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        canvasRef: `Andrews Lesson ${entry.andrewsSection}`,
        validationRefs: Array.from(VNC_LESSON6_VALIDATION_REFS),
        historicalGenerationPolicy: "solo por rutas CNV existentes con fuente Andrews concreta y puente ortografico; esta auditoría no crea fixtures"
      }));
    }
    function getVncShotReport() {
      return VNC_LESSON6_SHOT_REPORT.map(entry => ({
        ...entry,
        changedFiles: Array.from(entry.changedFiles || []),
        validationRefs: Array.from(VNC_LESSON6_VALIDATION_REFS)
      }));
    }
    function getVncVerbstemStructureFrame() {
      return cloneVncLesson5Record(VNC_LESSON7_VERBSTEM_STRUCTURE_FRAME);
    }
    function getVncCitationFormFrame() {
      return cloneVncLesson5Record(VNC_LESSON7_CITATION_FORM_FRAME);
    }
    function getVncVerbstemClassFrame() {
      return cloneVncLesson5Record(VNC_LESSON7_VERBSTEM_CLASS_FRAME);
    }
    function getVncClassBChangeFrame() {
      return cloneVncLesson5Record(VNC_LESSON7_CLASS_B_CHANGE_FRAME);
    }
    function getVncVariableClassFrame() {
      return cloneVncLesson5Record(VNC_LESSON7_VARIABLE_CLASS_FRAME);
    }
    function getVncClassGuidelines() {
      return cloneVncLesson5Array(VNC_LESSON7_CLASS_GUIDELINES);
    }
    function getVncPredicateFormationFrame() {
      return cloneVncLesson5Record(VNC_LESSON7_PREDICATE_FORMATION_FRAME);
    }
    function getVncAnalysisFrame() {
      return cloneVncLesson5Record(VNC_LESSON7_ANALYSIS_FRAME);
    }
    function getVncObjectRelationshipFrame() {
      return cloneVncLesson5Record(VNC_LESSON7_OBJECT_RELATIONSHIP_FRAME);
    }
    function getVncTlaFusionFrame() {
      return cloneVncLesson5Record(VNC_LESSON7_TLA_FUSION_FRAME);
    }
    function getVerbstemSubsectionInventory() {
      return VNC_LESSON7_SUBSECTION_INVENTORY.map(entry => ({
        ...entry,
        canvasRef: `Andrews Lesson ${entry.andrewsSection}`,
        validationRefs: Array.from(VNC_LESSON7_VALIDATION_REFS),
        historicalGenerationPolicy: "solo por rutas CNV existentes con fuente Andrews concreta y puente ortografico; esta auditoría no crea fixtures"
      }));
    }
    function generateNuclearClauseSurface(options = {}) {
      if (typeof targetObject.Event !== "undefined" && options instanceof targetObject.Event) {
        options = {};
      }
      options = targetObject.sanitizeNuclearClauseSurfaceOptions(options);
      const silent = options.silent === true;
      const renderOutputs = options.renderOutputs !== false;
      const pers1Control = targetObject.document.getElementById("subject-prefix");
      const pers2Control = targetObject.document.getElementById("subject-suffix");
      const troncoControl = targetObject.document.getElementById("verb");
      if (targetObject.getActiveTenseMode() === targetObject.TENSE_MODE.particula) {
        const candidate = String(troncoControl?.value || "").trim();
        let particleResult = null;
        if (
          candidate
          && typeof targetObject.buildClassicalNahuatlParticleSourceFrame
            === "function"
          && typeof targetObject.requestClassicalParticleResult === "function"
        ) {
          try {
            const sourceFrame =
              targetObject.buildClassicalNahuatlParticleSourceFrame(
                candidate
              );
            const requestedResult =
              targetObject.requestClassicalParticleResult(sourceFrame);
            particleResult =
              typeof targetObject
                .isClassicalNahuatlParticleResultFrame === "function"
              && targetObject.isClassicalNahuatlParticleResultFrame(
                requestedResult
              )
              && requestedResult.authorizationStatus === "authorized"
                ? requestedResult
                : null;
          } catch {
            particleResult = null;
          }
        }
        if (!silent) {
          if (troncoControl) {
            troncoControl.classList.toggle(
              "error",
              Boolean(candidate && !particleResult)
            );
          }
          targetObject.updateVerbRuleHint({
            verb: ""
          });
          targetObject.updateVerbDisambiguation("");
          if (renderOutputs) {
            targetObject.renderAllOutputs({
              verb: candidate,
              objectPrefix: ""
            });
          }
        }
        return particleResult;
      }
      const override = options.override || null;
      const troncoInputSource = targetObject.resolveVerbInputSource(troncoControl?.value || "");
      const hasExplicitFormulaPositions = options.posicionesFormula && typeof options.posicionesFormula === "object";
      const explicitEntradaGrammarObject = options.entradaGrammarObject && typeof options.entradaGrammarObject === "object" ? options.entradaGrammarObject : null;
      const posicionesFormula = targetObject.getNuclearClauseSurfacePosicionesFormula({
        override,
        posicionesFormula: options.posicionesFormula,
        pers1Control,
        pers2Control,
        troncoControl,
        troncoInputSource
      });
      return targetObject.executeNuclearClauseSurfaceRequest({
        options,
        entradaGrammarObject: explicitEntradaGrammarObject,
        posicionesFormula,
        entradaTronco: {
          tieneControlTronco: Boolean(troncoControl),
          valorTronco: troncoControl?.value || "",
          entradaGrammarObject: explicitEntradaGrammarObject || (hasExplicitFormulaPositions ? null : troncoInputSource.entradaGrammarObject || null)
        },
        uiHooks: {
          clearError: id => {
            if (silent) {
              return;
            }
            const el = targetObject.document.getElementById(id);
            if (el) {
              el.classList.remove("error");
            }
            if (id === "verb" && troncoControl) {
              troncoControl.classList.remove("error");
            }
          },
          setError: id => {
            if (silent) {
              return;
            }
            const el = targetObject.document.getElementById(id);
            if (el) {
              el.classList.add("error");
            }
            if (id === "verb" && troncoControl) {
              troncoControl.classList.add("error");
            }
          },
          onSearchQueryOnly: ({
            valorTronco: currentValue
          }) => {
            targetObject.updateVerbRuleHint({
              verb: ""
            });
            targetObject.updateVerbDisambiguation("");
            targetObject.maybeAutoScrollToConjugationRow(currentValue, {
              allowSwitch: false
            });
          },
          onValidationError: ({
            tiempo,
            obj1Base
          }) => {
            targetObject.updateVerbRuleHint({
              verb: ""
            });
            targetObject.updateVerbDisambiguation("");
            if (renderOutputs) {
              targetObject.renderAllOutputs({
                verb: targetObject.getVerbInputMeta().displayVerb,
                objectPrefix: obj1Base,
                tense: tiempo
              });
            }
          },
          onEntradaTroncoSync: ({
            siguienteValorTronco
          }) => {
            if (!troncoControl) {
              return;
            }
            troncoControl.value = siguienteValorTronco;
            troncoControl.dataset.prevValue = siguienteValorTronco;
            if (typeof targetObject.renderVerbMirror === "function") {
              targetObject.renderVerbMirror();
            }
          },
          onAnalisisTroncoResuelto: ({
            tronco,
            troncoAnalisis,
            troncoAnalisisExacto,
            obj1Morfologico,
            fuerzaTransitivaBase,
            resolvedDerivationType,
            parsedVerb,
            troncoRender
          }) => {
            targetObject.updateVerbRuleHint({
              verb: tronco,
              analysisVerb: troncoAnalisis,
              exactBaseVerb: troncoAnalisisExacto,
              objectPrefix: obj1Morfologico,
              forceTransitive: fuerzaTransitivaBase,
              ...targetObject.buildMorphologyMetaOptions(parsedVerb),
              derivationType: resolvedDerivationType
            });
            targetObject.updateVerbDisambiguation(troncoControl ? troncoControl.value : troncoRender);
          },
          onComplete: ({
            textoGenerado,
            analisisTronco,
            procedenciaTronco,
            tiempo,
            troncoRender,
            obj1Base
          }) => {
            targetObject.rememberScreenCalculatorAnsState({
              generatedText: textoGenerado,
              parsedVerb: analisisTronco,
              stemProvenance: procedenciaTronco,
              tense: tiempo
            });
            if (renderOutputs) {
              targetObject.renderAllOutputs({
                verb: troncoRender,
                objectPrefix: obj1Base,
                tense: tiempo
              });
            }
          }
        }
      });
    }
    const api = {};
    Object.defineProperty(api, "VNC_LESSON5_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return VNC_LESSON5_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "VNC_LESSON5_CANVAS_REFS", {
        configurable: true,
        enumerable: true,
        get() { return VNC_LESSON5_CANVAS_REFS; },
    });
    Object.defineProperty(api, "VNC_LESSON5_INTRANSITIVE_FORMULA_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return VNC_LESSON5_INTRANSITIVE_FORMULA_FRAME; },
    });
    Object.defineProperty(api, "VNC_LESSON5_SUBJECT_SLOT_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return VNC_LESSON5_SUBJECT_SLOT_FRAME; },
    });
    Object.defineProperty(api, "VNC_LESSON5_SUBJECT_FILLER_PARADIGMS", {
        configurable: true,
        enumerable: true,
        get() { return VNC_LESSON5_SUBJECT_FILLER_PARADIGMS; },
    });
    Object.defineProperty(api, "VNC_LESSON5_TENSE_MORPH_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return VNC_LESSON5_TENSE_MORPH_FRAME; },
    });
    Object.defineProperty(api, "VNC_LESSON5_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return VNC_LESSON5_SUBSECTION_INVENTORY; },
    });
    Object.defineProperty(api, "VNC_LESSON6_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return VNC_LESSON6_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "VNC_LESSON6_CANVAS_REFS", {
        configurable: true,
        enumerable: true,
        get() { return VNC_LESSON6_CANVAS_REFS; },
    });
    Object.defineProperty(api, "VNC_LESSON6_TRANSITIVE_FORMULA_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return VNC_LESSON6_TRANSITIVE_FORMULA_FRAME; },
    });
    Object.defineProperty(api, "VNC_LESSON6_OBJECT_CATEGORY_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return VNC_LESSON6_OBJECT_CATEGORY_FRAME; },
    });
    Object.defineProperty(api, "VNC_LESSON6_MONADIC_VALENCE_FILLERS", {
        configurable: true,
        enumerable: true,
        get() { return VNC_LESSON6_MONADIC_VALENCE_FILLERS; },
    });
    Object.defineProperty(api, "VNC_LESSON6_PROJECTIVE_OBJECT_PARADIGM", {
        configurable: true,
        enumerable: true,
        get() { return VNC_LESSON6_PROJECTIVE_OBJECT_PARADIGM; },
    });
    Object.defineProperty(api, "VNC_LESSON6_DYADIC_OBJECT_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return VNC_LESSON6_DYADIC_OBJECT_FRAME; },
    });
    Object.defineProperty(api, "VNC_LESSON6_REFLEXIVE_OBJECT_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return VNC_LESSON6_REFLEXIVE_OBJECT_FRAME; },
    });
    Object.defineProperty(api, "VNC_LESSON6_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return VNC_LESSON6_SUBSECTION_INVENTORY; },
    });
    Object.defineProperty(api, "VNC_LESSON6_SHOT_REPORT", {
        configurable: true,
        enumerable: true,
        get() { return VNC_LESSON6_SHOT_REPORT; },
    });
    Object.defineProperty(api, "VNC_LESSON7_VALIDATION_REFS", {
        configurable: true,
        enumerable: true,
        get() { return VNC_LESSON7_VALIDATION_REFS; },
    });
    Object.defineProperty(api, "VNC_LESSON7_CANVAS_REFS", {
        configurable: true,
        enumerable: true,
        get() { return VNC_LESSON7_CANVAS_REFS; },
    });
    Object.defineProperty(api, "VNC_LESSON7_VERBSTEM_STRUCTURE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return VNC_LESSON7_VERBSTEM_STRUCTURE_FRAME; },
    });
    Object.defineProperty(api, "VNC_LESSON7_CITATION_FORM_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return VNC_LESSON7_CITATION_FORM_FRAME; },
    });
    Object.defineProperty(api, "VNC_LESSON7_VERBSTEM_CLASS_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return VNC_LESSON7_VERBSTEM_CLASS_FRAME; },
    });
    Object.defineProperty(api, "VNC_LESSON7_CLASS_B_CHANGE_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return VNC_LESSON7_CLASS_B_CHANGE_FRAME; },
    });
    Object.defineProperty(api, "VNC_LESSON7_VARIABLE_CLASS_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return VNC_LESSON7_VARIABLE_CLASS_FRAME; },
    });
    Object.defineProperty(api, "VNC_LESSON7_CLASS_GUIDELINES", {
        configurable: true,
        enumerable: true,
        get() { return VNC_LESSON7_CLASS_GUIDELINES; },
    });
    Object.defineProperty(api, "VNC_LESSON7_PREDICATE_FORMATION_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return VNC_LESSON7_PREDICATE_FORMATION_FRAME; },
    });
    Object.defineProperty(api, "VNC_LESSON7_ANALYSIS_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return VNC_LESSON7_ANALYSIS_FRAME; },
    });
    Object.defineProperty(api, "VNC_LESSON7_OBJECT_RELATIONSHIP_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return VNC_LESSON7_OBJECT_RELATIONSHIP_FRAME; },
    });
    Object.defineProperty(api, "VNC_LESSON7_TLA_FUSION_FRAME", {
        configurable: true,
        enumerable: true,
        get() { return VNC_LESSON7_TLA_FUSION_FRAME; },
    });
    Object.defineProperty(api, "VNC_LESSON7_SUBSECTION_INVENTORY", {
        configurable: true,
        enumerable: true,
        get() { return VNC_LESSON7_SUBSECTION_INVENTORY; },
    });
    api.cloneVncLesson5Array = cloneVncLesson5Array;
    api.cloneVncLesson5Record = cloneVncLesson5Record;
    api.getVncIntransitiveFormulaFrame = getVncIntransitiveFormulaFrame;
    api.getVncSubjectSlotFrame = getVncSubjectSlotFrame;
    api.getVncSubjectFillerParadigms = getVncSubjectFillerParadigms;
    api.getVncTenseMorphFrame = getVncTenseMorphFrame;
    api.getFiniteVncSubsectionInventory = getFiniteVncSubsectionInventory;
    api.getVncTransitiveFormulaFrame = getVncTransitiveFormulaFrame;
    api.getVncObjectCategoryFrame = getVncObjectCategoryFrame;
    api.getVncMonadicValenceFillers = getVncMonadicValenceFillers;
    api.getVncDyadicObjectFrame = getVncDyadicObjectFrame;
    api.getVncProjectiveObjectParadigm = getVncProjectiveObjectParadigm;
    api.getVncReflexiveObjectFrame = getVncReflexiveObjectFrame;
    api.getTransitiveVncSubsectionInventory = getTransitiveVncSubsectionInventory;
    api.getVncShotReport = getVncShotReport;
    api.getVncVerbstemStructureFrame = getVncVerbstemStructureFrame;
    api.getVncCitationFormFrame = getVncCitationFormFrame;
    api.getVncVerbstemClassFrame = getVncVerbstemClassFrame;
    api.getVncClassBChangeFrame = getVncClassBChangeFrame;
    api.getVncVariableClassFrame = getVncVariableClassFrame;
    api.getVncClassGuidelines = getVncClassGuidelines;
    api.getVncPredicateFormationFrame = getVncPredicateFormationFrame;
    api.getVncAnalysisFrame = getVncAnalysisFrame;
    api.getVncObjectRelationshipFrame = getVncObjectRelationshipFrame;
    api.getVncTlaFusionFrame = getVncTlaFusionFrame;
    api.getVerbstemSubsectionInventory = getVerbstemSubsectionInventory;
    api.generateNuclearClauseSurface = generateNuclearClauseSurface;
    return api;
}

export function installVncFacadeGlobals(targetObject = globalThis) {
    const api = createVncApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
