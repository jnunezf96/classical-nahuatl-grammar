// Canonical Andrews-only closure for Lessons 27, 28, 29, and 33.
//
// This production module contains executable typed grammar only. Source spans,
// dispositions, inventories, counts, and audit receipts live exclusively in
// the test/documentation layer.

import {
  buildClassicalNahuatlTypedRootStockVowelCoalescenceRelation,
} from "./root_stock_vowel_coalescence.mjs";
import { getFrequentativeDestockalConstitution } from "./frequentative_destockal_structure.mjs";
import { getReduplicationParts, reduplicate } from "./reduplicative_realization.mjs";
import { isClassicalNahuatlParticipantFrame } from "./participant_frame.mjs?v=20260823-passive-formation-continuity-238";

export function createClassicalNahuatlVncClosureApi(targetObject = globalThis) {
  const VERSION = 1;
  const issuedOperationFrames = new WeakSet();
  const finalACausativeApplicationsByOperation = new WeakMap();
  let parentValidationTransaction = null;
  // Only issued-frame validators join this synchronous scope. Evaluation of
  // caller requests/getters never shares cached permission. Every new entry
  // consults the current owners again; no answer survives the call.
  function withParentValidationTransaction(callback) {
    if (parentValidationTransaction) return callback();
    parentValidationTransaction = new WeakMap();
    try { return callback(); } finally { parentValidationTransaction = null; }
  }
  const issuedMachineryFrames = new WeakSet();
  const issuedClosureFrames = new WeakSet();
  const issuedClosureRequests = new WeakMap();
  const issuedSourceAgreementFrames = new WeakSet();
  const issuedCompoundPredicateSources = new WeakSet();
  const compoundPredicateBindingRequests = new WeakMap();
  const LCM_AXIS_IDS = Object.freeze([
    "operation",
    "operation-variant",
    "source-stem",
    "source-class",
    "source-valence",
    "subject",
    "mood",
    "tense",
    "participant-topology",
    "frequentative-shape-and-recursion",
    "compound-matrix-and-valence",
    "purposive-series-and-direction",
    "external-directional",
    "attitude-polarity-and-member",
    "finite-boundary-result",
  ]);

  const freeze = value => {
    if (Array.isArray(value)) return Object.freeze(value.map(freeze));
    if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
    // Arrays return a frozen copy; retain that copy on the owned parent.
    // The original caller array remains outside the issued Result.
    Object.entries(value).forEach(([field, child]) => { value[field] = freeze(child); });
    return Object.freeze(value);
  };
  const text = value => String(value ?? "").trim();
  const key = value => text(value).toLowerCase();
  const PO_NONEXTANT_DESTOCKAL_SOURCE = freeze({
    lexemeId: "cn-l24-po-o-ni-nonextant-source",
    root: "po",
    stockFormative: "ō",
    stemFormative: "ni",
    independentUseStatus: "nonextant",
    historicalStatus: "reconstructed-source",
  });
  const TO_NONEXTANT_DESTOCKAL_SOURCE = freeze({
    lexemeId: "cn-l24-to-o-ni-nonextant-source",
    root: "to",
    stockFormative: "ō",
    stemFormative: "ni",
    independentUseStatus: "nonextant",
    historicalStatus: "reconstructed-source",
  });
  const NONEXTANT_DESTOCKAL_SOURCE_LIFECYCLE_SYSTEM = freeze({
    kind: "classical-nahuatl-nonextant-destockal-source-system",
    sourceType: {
      rank: "intransitive-destockal-verbstem",
      stemFormative: "ni",
    },
    sources: [
      PO_NONEXTANT_DESTOCKAL_SOURCE,
      TO_NONEXTANT_DESTOCKAL_SOURCE,
    ],
  });
  const NONEXTANT_DESTOCKAL_FREQUENTATIVE_LEXICAL_LICENSES = freeze({
    "po-pō-ca": {
      lexicalIdentityId: "cn-l27-po-po-ca-surviving-frequentative",
      historicalSource: PO_NONEXTANT_DESTOCKAL_SOURCE,
    },
    "to-tō-ca": {
      lexicalIdentityId: "cn-l27-to-to-ca-surviving-frequentative",
      historicalSource: TO_NONEXTANT_DESTOCKAL_SOURCE,
    },
  });
  const FUSED_STOCK_FREQUENTATIVE_RULE_CONTRACT = freeze({
    kind: "classical-nahuatl-fused-stock-frequentative-rule-contract",
    version: VERSION,
    authorizationStatus: "authorized",
    formationScope: {
      formationKind: "irregular-fused-source-frequentative",
      sourceAnalysisKind: "destockal-root-stock-vowel-coalescence",
      outputFamilies: [
        { kind: "intransitive-frequentative", formative: "ca" },
        { kind: "causative-frequentative", formative: "tz-a" },
      ],
    },
    longVowelRetention: {
      inputUnit: "fused-root-stock-vowel",
      inputQuantity: "long",
      normalOutputQuantity: "long",
      outputFamilies: ["intransitive-ca", "causative-tz-a"],
      exceptionAuthority: "exact-signed-lexical-analysis",
    },
    sourceAdmissionAuthority: false,
    callerSuppliedGrammarAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    canvasExampleAuthority: false,
    contextualFactIsUserChoice: false,
  });
  const LEXICAL_FREQUENTATIVE_CAUSATIVE_MEANING_LICENSES = freeze({
    "popōtza": {
      lexicalIdentityId:
        "cn-l27-po-po-tza-fused-frequentative-causative",
      availableReadings: [{
        readingId: "cn-l27-po-po-tza-cause-emit-smoke",
        meaningId: "cause-something-to-emit-smoke",
        meaning: "cause-something-to-emit-smoke",
        relation: "lexical-frequentative-causative-reading",
        documentedCitationRoles: ["tla"],
      }],
    },
    "totōtza": {
      lexicalIdentityId:
        "cn-l27-to-to-tza-fused-frequentative-causative",
      availableReadings: [{
        readingId: "cn-l27-to-to-tza-spur-on",
        meaningId: "spur-someone-or-something-on",
        meaning: "spur-someone-or-something-on",
        relation: "lexical-frequentative-causative-reading",
        documentedCitationRoles: ["tē", "tla"],
      }],
    },
    "pipītza": {
      lexicalIdentityId:
        "cn-l27-pi-pi-tza-fused-frequentative-causative",
      availableReadings: [{
        readingId: "cn-l27-pi-pi-tza-cause-dribble",
        meaningId: "cause-something-to-dribble",
        meaning: "cause-something-to-dribble",
        relation: "lexical-frequentative-causative-reading",
        documentedCitationRoles: ["tla"],
      }],
    },
  });
  const HONORIFIC_PRODUCTIVE_FORMATIONS = Object.freeze([
    "causative",
    "applicative",
  ]);
  const HONORIFIC_DOCUMENTED_LEXICAL_REALIZATIONS = Object.freeze({
    ihca: Object.freeze({
      causative: Object.freeze({
        default: Object.freeze({
          targetStem: "ihqui-l-tiā",
          realizationKind: "irregular",
        }),
        anomalous: Object.freeze({
          targetStem: "ihca-t-i-l-tiā",
          realizationKind: "documented-alternative",
        }),
      }),
    }),
    ono: Object.freeze({
      causative: Object.freeze({
        default: Object.freeze({
          targetStem: "on-o-l-tiā",
          realizationKind: "connective-t-preferred",
        }),
      }),
    }),
    "pil-ca": Object.freeze({
      causative: Object.freeze({
        default: Object.freeze({
          targetStem: "pil-quī-tiā",
          realizationKind: "irregular",
          compoundPerfectiveAllomorph: "pil-qui-tih",
        }),
      }),
    }),
    ca: Object.freeze({
      causative: Object.freeze({
        default: Object.freeze({
          targetStem: "ye-tz-ti-ā",
          realizationKind: "suppletive",
        }),
      }),
    }),
    "ya-uh": Object.freeze({
      causative: Object.freeze({
        default: Object.freeze({
          targetStem: "huīca",
          targetClass: "A",
          realizationKind: "suppletive",
        }),
      }),
    }),
    "huāl-la-uh": Object.freeze({
      causative: Object.freeze({
        default: Object.freeze({
          targetStem: "huīca",
          targetClass: "A",
          directionalPrefix: "huāl",
          realizationKind: "suppletive",
        }),
      }),
    }),
    "huī-tz": Object.freeze({
      causative: Object.freeze({
        default: Object.freeze({
          targetStem: "huīca-tz",
          targetClass: "A",
          realizationKind: "suppletive",
          moodRestriction: "no-optative",
        }),
      }),
    }),
    miqui: Object.freeze({
      applicative: Object.freeze({
        default: Object.freeze({
          targetStem: "miqui-liā",
          realizationKind: "honorific-only-applicative",
          honorificOnly: true,
        }),
      }),
    }),
    chōca: Object.freeze({
      applicative: Object.freeze({
        default: Object.freeze({
          targetStem: "chōqui-liā",
          realizationKind: "preferred-applicative",
          derivationRoute: "type-two-final-ca-to-qui-lia",
        }),
      }),
      causative: Object.freeze({
        default: Object.freeze({
          targetStem: "chōc-tiā",
          realizationKind: "type-two",
          derivationRoute: "type-two-tia-from-o-hua-nonactive",
        }),
        "type-two-l": Object.freeze({
          targetStem: "chōqui-l-tiā",
          realizationKind: "type-two-l",
          derivationRoute: "type-two-tia-from-choqui-lo-internal-base",
        }),
        "type-two-long": Object.freeze({
          targetStem: "chōqui-tiā",
          realizationKind: "type-two-long",
        }),
      }),
    }),
    caqui: Object.freeze({
      causative: Object.freeze({
        default: Object.freeze({
          targetStem: "caquī-tiā",
          realizationKind: "documented-honorific-causative",
          derivationRoute: "type-two-tia-from-caqui-hua-internal-base",
        }),
        "l-causative": Object.freeze({
          targetStem: "caqui-l-tiā",
          realizationKind: "documented-honorific-alternative",
          derivationRoute: "type-two-tia-from-caqui-lo-internal-base",
        }),
      }),
    }),
    nequi: Object.freeze({
      causative: Object.freeze({
        default: Object.freeze({
          targetStem: "nequi-l-tiā",
          realizationKind: "documented-honorific-causative",
          derivationRoute: "type-two-tia-from-exact-nequi-lo-license",
        }),
      }),
    }),
    cuepa: Object.freeze({
      applicative: Object.freeze({
        default: Object.freeze({
          targetStem: "cuep-i-liā",
          realizationKind: "documented-honorific-applicative",
          derivationRoute: "type-two-consonant-final-a-to-i-lia",
        }),
      }),
      causative: Object.freeze({
        default: Object.freeze({
          targetStem: "cuep-i-l-tiā",
          realizationKind: "documented-honorific-causative",
          derivationRoute: "type-two-tia-from-cuepi-lo-internal-base",
        }),
      }),
    }),
  });

  function normalizeHonorificFormationAlternatives(
    alternatives = null,
    formation = "",
  ) {
    const records = Array.isArray(alternatives?.[formation])
      ? alternatives[formation]
      : [];
    const normalized = records.map((record) => freeze({
      optionId: key(record?.optionId || record?.id || "default"),
      targetStem: text(record?.targetStem),
      realizationKind: key(record?.realizationKind || "typed-lexical"),
      moodRestriction: key(record?.moodRestriction),
      honorificOnly: record?.honorificOnly === true,
    }));
    const ids = normalized.map(record => record.optionId);
    return normalized.length
      && normalized.every(record => record.optionId && record.targetStem)
      && new Set(ids).size === ids.length
      ? normalized
      : records.length
        ? null
        : [];
  }

  function buildHonorificFormationAnalysisFrame(
    request = {}, sourceStem = "", sourceApplicationFrame = null,
  ) {
    const normalizedSourceStem = text(sourceStem);
    const selectedFormation = key(request.lateVariant);
    const supplied = request.honorificFormationAnalysis;
    const hasSuppliedAnalysis = Boolean(
      supplied && typeof supplied === "object" && !Array.isArray(supplied)
    );
    const suppliedFormations = hasSuppliedAnalysis
      ? [...new Set(
          (Array.isArray(supplied.availableFormations)
            ? supplied.availableFormations
            : [])
            .map(key)
            .filter(Boolean),
        )]
      : [];
    const preferredFormation = key(supplied?.preferredFormation);
    const suppliedSourceStem = text(supplied?.sourceStem);
    const suppliedAlternatives = Object.fromEntries(
      HONORIFIC_PRODUCTIVE_FORMATIONS.map(formation => [
        formation,
        normalizeHonorificFormationAlternatives(
          supplied?.formationAlternatives,
          formation,
        ),
      ]),
    );
    const invalid = hasSuppliedAnalysis && (
      key(supplied.lexicalStatus) !== "honorific-formation-analysis"
      || suppliedSourceStem !== normalizedSourceStem
      || suppliedFormations.length < 1
      || suppliedFormations.some(formation => (
        !HONORIFIC_PRODUCTIVE_FORMATIONS.includes(formation)
      ))
      || (preferredFormation && !suppliedFormations.includes(preferredFormation))
      || Object.values(suppliedAlternatives).some(value => value === null)
    );
    if (invalid) {
      return freeze({
        kind: "classical-nahuatl-honorific-formation-analysis-frame",
        authorizationStatus: "blocked",
        blockReason: "valid-matching-honorific-formation-analysis-required",
        sourceStem: normalizedSourceStem,
        availableFormations: freeze([]),
        selectedFormation,
        typedSourceAuthority: true,
        canvasExampleAuthority: false,
      });
    }
    const availableFormations = hasSuppliedAnalysis
      ? suppliedFormations
      : selectedFormation
        ? [selectedFormation]
        : [];
    // The being paradigm has several genuine stem members. Its existing
    // suppletive honorific belongs to that lexeme, not to a substituted Source.
    const sourcePlan = sourceApplicationFrame?.resultFrame
      ?.selectedMachineryFrame?.lesson11ParadigmPlan;
    const documentedBeSource = sourceApplicationFrame?.authorizationStatus === "authorized"
      && targetObject.isClassicalNahuatlVncApplicationFrame?.(sourceApplicationFrame) === true
      && text(sourceApplicationFrame.normalizedRequest?.sourceStem) === normalizedSourceStem
      && sourcePlan?.authorizationStatus === "authorized"
      && sourcePlan.applies === true
      && sourcePlan.identity?.lexemeId === "be-suppletive";
    const documented = HONORIFIC_DOCUMENTED_LEXICAL_REALIZATIONS[
      documentedBeSource ? "ca" : normalizedSourceStem
    ] || HONORIFIC_DOCUMENTED_LEXICAL_REALIZATIONS[
      normalizedSourceStem.replaceAll("-", "")
    ] || null;
    const documentedOptions = documented?.[selectedFormation] || null;
    const typedOptions = suppliedAlternatives[selectedFormation] || [];
    const options = typedOptions.length
      ? typedOptions
      : Object.entries(documentedOptions || {}).map(([optionId, record]) => (
          freeze({ optionId, ...record })
        ));
    const selectedOptionId = key(request.honorificStemAlternative || "default");
    const selectedOption = options.find(option => (
      option.optionId === selectedOptionId
    )) || null;
    const selectionLicensed = !options.length || Boolean(selectedOption);
    const selectedFormationLicensed = availableFormations.includes(
      selectedFormation,
    );
    return freeze({
      kind: "classical-nahuatl-honorific-formation-analysis-frame",
      authorizationStatus: "authorized",
      blockReason: "",
      lexicalStatus: hasSuppliedAnalysis
        ? "honorific-formation-analysis"
        : "legacy-selected-formation-compatibility",
      sourceStem: normalizedSourceStem,
      availableFormations: freeze(availableFormations),
      selectedFormation,
      selectedFormationLicensed,
      preferredFormation,
      routeChoiceRequired: availableFormations.length > 1,
      formationAutomaticallySelected: availableFormations.length === 1,
      analysisSupplied: hasSuppliedAnalysis,
      selectionSource: hasSuppliedAnalysis
        ? "typed-source-analysis"
        : "selected-route-backward-compatibility",
      formationOptions: freeze(options),
      selectedOptionId,
      selectedOption,
      alternativeChoiceRequired: options.length > 1,
      selectionLicensed,
      honorificOnlyApplicative: Boolean(
        supplied?.honorificOnlyApplicative === true
        || selectedOption?.honorificOnly === true
      ),
      moodRestriction: key(
        selectedOption?.moodRestriction || supplied?.moodRestriction,
      ),
      documentedLexicalRealizationUsed: Boolean(
        selectedOption && !typedOptions.length
      ),
      documentedRealizationLexemeId: documentedBeSource ? "be-suppletive" : "",
      documentedRealizationSourceApplicationFrame: documentedBeSource
        ? sourceApplicationFrame : null,
      typedSourceAuthority: true,
      canonicalDerivationAuthority: !selectedOption || Boolean(selectedOption.derivationRoute),
      canvasExampleAuthority: false,
      callerFormulaAuthority: false,
      callerSurfaceAuthority: false,
    });
  }

  // These are attested route facts, separate from the realization inventory.
  // A documented single route does not claim that unattested alternatives are
  // impossible; ordinary sources receive the general rule from their valence.
  const HONORIFIC_DOCUMENTED_ROUTE_FACTS = freeze({
    miqui: { availableFormations: ["applicative"], defaultFormation: "applicative" },
    chōca: { availableFormations: ["causative", "applicative"],
      defaultFormation: "applicative", preferredFormation: "applicative",
      explicitAlternatives: true },
    caqui: { availableFormations: ["causative"], defaultFormation: "causative" },
    nequi: { availableFormations: ["causative"], defaultFormation: "causative" },
    cuepa: { availableFormations: ["causative", "applicative"],
      explicitAlternatives: true },
  });

  function getClassicalNahuatlHonorificSourceFacts(
    request = {}, exactSourceApplicationFrame = null,
  ) {
    const exactSource = exactSourceApplicationFrame || request.sourceApplicationFrame || null;
    const issuedSource = exactSource
      && targetObject.isClassicalNahuatlVncApplicationFrame?.(exactSource) === true
      && exactSource.authorizationStatus === "authorized";
    const sourceRequest = issuedSource ? exactSource.normalizedRequest || {} : request;
    const sourceProjection = issuedSource
      ? targetObject.getClassicalNahuatlVncContinuationSourceConstituents?.(exactSource) : null;
    const sourceStem = text(sourceProjection?.sourceStem || sourceRequest.targetStem
      || sourceRequest.sourceStem || sourceRequest.stem
      || request.sourceStem || request.stem);
    const sourceValence = key(sourceProjection?.sourceValence || sourceRequest.targetValence || sourceRequest.sourceValence
      || sourceRequest.valence || request.sourceValence || request.valence);
    const blocked = blockReason => freeze({
      kind: "classical-nahuatl-honorific-source-facts", authorizationStatus: "blocked",
      blockReason, sourceStem, sourceValence, availableFormations: [],
      formationAlternatives: {}, honorificFormationAnalysis: null, factsReadOnly: true,
    });
    if (exactSource && !issuedSource) return blocked("issued-authorized-honorific-source-required");
    if (issuedSource && text(request.sourceStem || request.stem)
      && text(request.sourceStem || request.stem) !== sourceStem) {
      return blocked("honorific-source-facts-parent-identity-mismatch");
    }
    if (!sourceStem || !sourceValence) return blocked("honorific-source-stem-and-valence-required");
    if (sourceValence === "mainline-reflexive") {
      return freeze({
        kind: "classical-nahuatl-honorific-source-facts", authorizationStatus: "authorized",
        blockReason: "", sourceStem, sourceValence, availableFormations: ["preterit-embed"],
        defaultFormation: "preterit-embed", preferredFormation: "",
        formationChoiceRequired: false, formationAlternatives: {},
        honorificFormationAnalysis: null, availabilityCoverage: "source-topology",
        alternateAvailability: "not-applicable", factsReadOnly: true,
      });
    }
    const savedAnalysis = sourceRequest.honorificFormationAnalysis;
    const supplied = request.honorificFormationAnalysis
      || (text(savedAnalysis?.sourceStem) === sourceStem ? savedAnalysis : null);
    const lexical = HONORIFIC_DOCUMENTED_ROUTE_FACTS[sourceStem.replaceAll("-", "")];
    const generalFormation = sourceValence === "intransitive" ? "causative" : "applicative";
    const analysis = supplied || {
      lexicalStatus: "honorific-formation-analysis", sourceStem,
      availableFormations: lexical?.availableFormations || [generalFormation],
      preferredFormation: lexical?.preferredFormation || "",
    };
    const availableFormations = Array.isArray(analysis.availableFormations)
      ? analysis.availableFormations.map(key) : [];
    const preferredFormation = key(analysis.preferredFormation);
    const defaultFormation = preferredFormation || lexical?.defaultFormation
      || (availableFormations.includes(generalFormation) ? generalFormation : availableFormations[0])
      || "";
    const selectedFormation = availableFormations.includes(key(request.lateVariant))
      ? key(request.lateVariant) : defaultFormation;
    const selection = buildHonorificFormationAnalysisFrame({
      ...request, lateVariant: selectedFormation, honorificFormationAnalysis: analysis,
    }, sourceStem, issuedSource ? exactSource : null);
    if (selection.authorizationStatus !== "authorized") return blocked(selection.blockReason);
    const formationAlternatives = Object.fromEntries(availableFormations.map(formation => [
      formation, buildHonorificFormationAnalysisFrame({
        ...request, lateVariant: formation, honorificFormationAnalysis: analysis,
      }, sourceStem, issuedSource ? exactSource : null).formationOptions,
    ]));
    return freeze({
      kind: "classical-nahuatl-honorific-source-facts", authorizationStatus: "authorized",
      blockReason: "", sourceStem, sourceValence, availableFormations,
      defaultFormation, preferredFormation, formationChoiceRequired: availableFormations.length > 1,
      formationAlternatives, honorificFormationAnalysis: analysis,
      availabilityCoverage: supplied ? "typed-source-analysis"
        : lexical?.explicitAlternatives ? "documented-alternatives" : "known-routes-only",
      alternateAvailability: supplied || lexical?.explicitAlternatives ? "documented" : "unclaimed",
      factsReadOnly: true,
    });
  }

  function buildCompoundLexicalizationAnalysisFrame(
    request = {},
    sourceEmbedStem = "",
    sourceMatrixStem = "",
  ) {
    const embedStem = text(sourceEmbedStem);
    const matrixStem = text(sourceMatrixStem);
    const supplied = request.compoundLexicalizationAnalysis;
    const hasSuppliedAnalysis = Boolean(
      supplied && typeof supplied === "object" && !Array.isArray(supplied)
    );
    if (!hasSuppliedAnalysis) {
      return freeze({
        kind: "classical-nahuatl-compound-verbstem-lexicalization-analysis-frame",
        version: VERSION,
        authorizationStatus: "authorized",
        blockReason: "",
        sourceEmbedStem: embedStem,
        sourceMatrixStem: matrixStem,
        availableStructures: freeze(["compositional"]),
        selectedStructure: "compositional",
        structureChoiceRequired: false,
        structureAutomaticallySelected: true,
        analysisSupplied: false,
        lexicalMeaningTyped: false,
        exactExampleIdentityAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
      });
    }
    const availableStructures = [...new Set(
      (Array.isArray(supplied.availableStructures)
        ? supplied.availableStructures
        : [supplied.selectedStructure]
      ).map(key).filter(Boolean)
    )];
    const selectedStructure = key(
      supplied.selectedStructure
      || (availableStructures.length === 1 ? availableStructures[0] : "")
    );
    const invalid = key(supplied.lexicalStatus)
        !== "compound-verbstem-lexicalization-analysis"
      || text(supplied.sourceEmbedStem) !== embedStem
      || text(supplied.sourceMatrixStem) !== matrixStem
      || availableStructures.length < 1
      || availableStructures.some(structure => ![
        "compositional", "lexicalized"
      ].includes(structure))
      || (selectedStructure
        && !availableStructures.includes(selectedStructure));
    if (invalid) {
      return freeze({
        kind: "classical-nahuatl-compound-verbstem-lexicalization-analysis-frame",
        version: VERSION,
        authorizationStatus: "blocked",
        blockReason: "valid-matching-compound-lexicalization-analysis-required",
        sourceEmbedStem: embedStem,
        sourceMatrixStem: matrixStem,
        availableStructures: freeze([]),
        selectedStructure: "",
        typedSourceAuthority: true,
        exactExampleIdentityAuthority: false,
      });
    }
    if (availableStructures.length > 1 && !selectedStructure) {
      return freeze({
        kind: "classical-nahuatl-compound-verbstem-lexicalization-analysis-frame",
        version: VERSION,
        authorizationStatus: "blocked",
        blockReason: "compound-lexicalization-analysis-choice-required",
        sourceEmbedStem: embedStem,
        sourceMatrixStem: matrixStem,
        availableStructures: freeze(availableStructures),
        selectedStructure: "",
        structureChoiceRequired: true,
        typedSourceAuthority: true,
        exactExampleIdentityAuthority: false,
      });
    }
    return freeze({
      kind: "classical-nahuatl-compound-verbstem-lexicalization-analysis-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      blockReason: "",
      sourceEmbedStem: embedStem,
      sourceMatrixStem: matrixStem,
      availableStructures: freeze(availableStructures),
      selectedStructure,
      structureChoiceRequired: availableStructures.length > 1,
      structureAutomaticallySelected: availableStructures.length === 1,
      analysisSupplied: true,
      lexicalMeaningTyped: selectedStructure === "lexicalized",
      lexicalMeaningId: text(supplied.lexicalMeaningId),
      exactExampleIdentityAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
  }

  function buildClassicalNahuatlLateSourceAgreementFrame(
    sourceStem = "",
    { verbClass = "", sourceValence = "" } = {}
  ) {
    const normalizedStem = text(sourceStem);
    const normalizedClass = text(verbClass).toUpperCase();
    const normalizedValence = text(sourceValence);
    const sourceIdentityFrame =
      typeof targetObject.buildClassicalNahuatlActiveStemIdentityFrame
        === "function"
        ? targetObject.buildClassicalNahuatlActiveStemIdentityFrame(
            normalizedStem,
            {
              verbClass: normalizedClass,
              sourceValence: normalizedValence,
            }
          )
        : null;
    const morphemicSourceProfile =
      sourceIdentityFrame?.internalMorphology?.morphemicSourceProfile || null;
    const authorized = Boolean(
      sourceIdentityFrame?.authorizationStatus === "authorized"
      && sourceIdentityFrame.enteredStem === normalizedStem
      && morphemicSourceProfile?.authorizationStatus === "authorized"
      && morphemicSourceProfile.sourceStem === normalizedStem
      && morphemicSourceProfile.sourceClass === normalizedClass
      && morphemicSourceProfile.sourceValence === normalizedValence
    );
    const frame = freeze({
      kind: "classical-nahuatl-late-vnc-source-agreement-frame",
      version: VERSION,
      authorizationStatus: authorized ? "authorized" : "blocked",
      blockReason: authorized
        ? ""
        : "typed-morphemic-source-profile-disagrees-with-late-source",
      sourceStem: normalizedStem,
      sourceClass: normalizedClass,
      sourceValence: normalizedValence,
      sourceIdentityFrame: authorized ? sourceIdentityFrame : null,
      morphemicSourceProfile: authorized ? morphemicSourceProfile : null,
      canvasExampleAuthority: false,
      callerFormulaAuthority: false,
      callerSurfaceAuthority: false,
    });
    issuedSourceAgreementFrames.add(frame);
    return frame;
  }

  function isClassicalNahuatlLateSourceAgreementFrame(frame = null) {
    if (!frame || !issuedSourceAgreementFrames.has(frame)) return false;
    if (frame.authorizationStatus === "blocked") {
      return Boolean(frame.blockReason);
    }
    return Boolean(
      frame.kind === "classical-nahuatl-late-vnc-source-agreement-frame"
      && frame.version === VERSION
      && frame.authorizationStatus === "authorized"
      && frame.morphemicSourceProfile?.sourceStem === frame.sourceStem
      && frame.morphemicSourceProfile?.sourceClass === frame.sourceClass
      && frame.morphemicSourceProfile?.sourceValence === frame.sourceValence
      && frame.sourceIdentityFrame?.internalMorphology
        ?.morphemicSourceProfile === frame.morphemicSourceProfile
      && frame.canvasExampleAuthority === false
    );
  }

  function analyzeRecursiveCompoundHierarchy(
    embedClosureFrame = null,
    matrixClosureFrame = null
  ) {
    const seen = new Set();
    const active = new Set();
    let maximumDepth = 0;
    let circular = false;
    let reused = false;
    function visit(frame, depth = 1) {
      if (!frame) return;
      maximumDepth = Math.max(maximumDepth, depth);
      if (active.has(frame)) {
        circular = true;
        return;
      }
      if (seen.has(frame)) {
        reused = true;
        return;
      }
      seen.add(frame);
      active.add(frame);
      const facts = frame.operationFrame?.operationFacts || {};
      visit(facts.recursiveEmbedFrame, depth + 1);
      visit(facts.recursiveMatrixFrame, depth + 1);
      active.delete(frame);
    }
    visit(embedClosureFrame);
    visit(matrixClosureFrame);
    return freeze({
      authorizationStatus: circular || reused ? "blocked" : "authorized",
      blockReason: circular
        ? "recursive-compound-hierarchy-must-be-acyclic"
        : reused
          ? "recursive-compound-requires-distinct-embed-and-matrix-results"
          : "",
      acyclic: !circular,
      distinctConstituents: !reused,
      maximumDepth,
      capturedResultCount: seen.size,
    });
  }

  function buildSelectedLcmProjection(
    request = {},
    operationFrame = null,
    finiteSurfaceFrame = null
  ) {
    const sourceTyped = operationFrame?.sourceTypedVncSlotFrame;
    const participantSlots = Array.isArray(
      operationFrame?.targetTypedVncSlotFrame?.slots?.prePredicate
    )
      ? operationFrame.targetTypedVncSlotFrame.slots.prePredicate
      : [];
    const selectedValues = {
      operation: operationFrame?.operation || key(request.lateOperation) || "not-applicable",
      "operation-variant": operationFrame?.variant || key(request.lateVariant) || "not-applicable",
      "source-stem": operationFrame?.sourceStem || text(request.sourceStem) || "not-applicable",
      "source-class": text(request.verbClass).toUpperCase() || "not-applicable",
      "source-valence": text(
        operationFrame?.sourceMachineryFrame?.targetValence
        || request.sourceValence
      ) || "not-applicable",
      subject: text(request.subject) || "not-applicable",
      mood: text(request.mood) || "not-applicable",
      tense: text(request.tense) || "not-applicable",
      "participant-topology": participantSlots.length
        ? participantSlots.map(slot => text(
          slot.objectPositionFrame?.objectKind || slot.kind
        )).join("+")
        : "vacant",
      "frequentative-shape-and-recursion":
        operationFrame?.operation === "frequentative"
          ? `${operationFrame.variant}:${Number(request.frequentativeRepetitions) || 1}`
          : "not-applicable",
      "compound-matrix-and-valence":
        operationFrame?.operation === "compound"
          ? `${operationFrame.operationFacts?.matrixStem || "unknown"}:${operationFrame.targetValence || "unknown"}`
          : "not-applicable",
      "purposive-series-and-direction":
        operationFrame?.operation === "purposive"
          ? `${operationFrame.operationFacts?.series || "unknown"}:${operationFrame.operationFacts?.direction || "unknown"}`
          : "not-applicable",
      "external-directional":
        operationFrame?.operationFacts?.externalDirectional || "none",
      "attitude-polarity-and-member":
        ["honorific", "reverential", "pejorative"].includes(
          operationFrame?.operation
        )
          ? `${operationFrame.operation}:${operationFrame.variant}`
          : "not-applicable",
      "finite-boundary-result":
        finiteSurfaceFrame?.authorizationStatus === "authorized"
          ? finiteSurfaceFrame.wordRealization
          : "blocked",
    };
    const selectedAxisValues = LCM_AXIS_IDS.map(axisId => freeze({
      axisId,
      selectedValue: text(selectedValues[axisId]) || "not-applicable",
    }));
    return freeze({
      axisIds: LCM_AXIS_IDS,
      axisCount: LCM_AXIS_IDS.length,
      licensedAxisSetComplete: selectedAxisValues.length === LCM_AXIS_IDS.length
        && selectedAxisValues.every(selection => Boolean(selection.selectedValue)),
      selectedAxisIds: selectedAxisValues.map(selection => selection.axisId),
      selectedAxisValues,
      selectedValues: Object.fromEntries(
        selectedAxisValues.map(selection => [
          selection.axisId,
          selection.selectedValue,
        ])
      ),
      selectedSourceSemanticIdentity: sourceTyped?.semanticIdentity || "",
      lessonMetadataAuthorizesOutput: false,
    });
  }

  // Cac is a lexical perfective predicate with no independent finite use.
  // Its zero carriers are an embedding projection, not a simple VNC Result.
  function buildClassicalNahuatlCompoundPredicateSourceFrame(request = {}) {
    const hasNncParent = Object.hasOwn(request, "canonicalNncResult");
    const parent = request.canonicalNncResult;
    const fixedOwnerhood = hasNncParent
      && targetObject.isClassicalNahuatlDeverbalNncGrammarFrame?.(parent) === true
      && parent.authorizationStatus === "authorized"
      && parent.operationFrame?.constructionKind === "ownerhood"
      && ["ē", "huā", "yō-ā"].includes(parent.operationFrame.ownerhoodMatrix)
      && parent.operationFrame.ownerhoodBoundaryFrame?.preteritOnly === true
      && parent.operationFrame.connectorProfile === "preterit-agentive";
    const derivedPerfective = fixedOwnerhood
      ? text(parent.operationFrame.targetStems?.restrictedUse).replace(/-0$/u, "") : "";
    const sourceStem = hasNncParent ? derivedPerfective : text(request.sourceStem || request.stem);
    const declaredStemMatches = !hasNncParent || !request.sourceStem
      || text(request.sourceStem) === sourceStem;
    const vacant = key(request.sourceValence || request.valence || "intransitive") === "intransitive"
      && (!request.objectKind || key(request.objectKind) === "none")
      && (!Array.isArray(request.sourceObjectRequests) || !request.sourceObjectRequests.length);
    const active = key(request.requestedVoice || request.voice || "active") === "active"
      && [request.derivationType, request.requestedDerivation].every(value => !value || key(value) === "direct");
    const embeddingSlotFrame = ((!hasNncParent && sourceStem === "cac") || fixedOwnerhood)
      && declaredStemMatches && vacant && active
      ? targetObject.buildClassicalNahuatlVncSlotFrame?.({
          sourceFrameKind: "classical-nahuatl-compound-predicate-source-frame",
          sourceAuthorizationStatus: "authorized",
          stem: sourceStem,
          personDyad: { pers1: "0", pers2: "0" },
          tenseFrame: { tns: "0" },
          numberDyad: { num1: "0", num2: "0" },
          objectFrame: { valenceArity: "vacant" },
        })
      : null;
    const authorized = targetObject.isClassicalNahuatlVncSlotFrame?.(embeddingSlotFrame) === true;
    const frame = freeze({
      kind: "classical-nahuatl-compound-predicate-source-frame",
      version: VERSION,
      authorizationStatus: authorized ? "authorized" : "blocked",
      blockReason: authorized ? "" : "compound-only-perfective-vacant-source-required",
      lexicalIdentity: fixedOwnerhood ? "ownerhood-fixed-preterit-matrix" : "cac-compound-only-perfective",
      canonicalNncResult: fixedOwnerhood ? parent : null,
      sourceStem,
      sourceValence: "intransitive",
      sourceCategory: "perfective-predicate",
      permittedOperation: "compound",
      permittedVariant: "connective-t",
      requiredSubjectAnimacy: fixedOwnerhood ? "" : "nonanimate",
      independentFiniteUse: false,
      independentSubjectRealization: false,
      embeddingSlotFrame: authorized ? embeddingSlotFrame : null,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
    issuedCompoundPredicateSources.add(frame);
    return frame;
  }
  function isClassicalNahuatlCompoundPredicateSourceFrame(frame = null) {
    return Boolean(frame && issuedCompoundPredicateSources.has(frame)
      && frame.authorizationStatus === "authorized"
      && (frame.lexicalIdentity === "cac-compound-only-perfective"
        ? frame.sourceStem === "cac" && !frame.canonicalNncResult
        : frame.lexicalIdentity === "ownerhood-fixed-preterit-matrix"
          && targetObject.isClassicalNahuatlDeverbalNncGrammarFrame?.(frame.canonicalNncResult) === true
          && frame.canonicalNncResult.authorizationStatus === "authorized"
          && frame.canonicalNncResult.operationFrame?.constructionKind === "ownerhood"
          && ["ē", "huā", "yō-ā"].includes(frame.canonicalNncResult.operationFrame.ownerhoodMatrix)
          && frame.sourceStem === text(frame.canonicalNncResult.operationFrame.targetStems.restrictedUse).replace(/-0$/u, ""))
      && frame.sourceCategory === "perfective-predicate"
      && frame.independentFiniteUse === false
      && frame.independentSubjectRealization === false
      && targetObject.isClassicalNahuatlVncSlotFrame?.(frame.embeddingSlotFrame)
      && frame.embeddingSlotFrame.slots.predicate.stem === frame.sourceStem
      && frame.embeddingSlotFrame.slots.predicate.tns === "0"
      && frame.embeddingSlotFrame.slots.prePredicate.length === 0);
  }

  function issueClassicalNahuatlCompoundPredicateBindingFrame(exactSourceFrame = null, callerSelections = {}) {
    const accepted = isClassicalNahuatlCompoundPredicateSourceFrame(exactSourceFrame);
    const forbidden = ["sourceStem", "stem", "sourceValence", "sourceApplicationFrame", "compoundPredicateSourceFrame", "authorizationStatus", "surface", "formula"].some(field => Object.hasOwn(callerSelections, field));
    const ownerRequest = accepted && !forbidden ? {
      ...callerSelections,
      sourceStem: exactSourceFrame.sourceStem,
      sourceValence: exactSourceFrame.sourceValence,
      objectKind: "none",
      compoundPredicateSourceFrame: exactSourceFrame,
      lateOperation: callerSelections.lateOperation || "compound",
      lateVariant: callerSelections.lateVariant || "connective-t",
      subject: callerSelections.subject || "3sg",
      mood: callerSelections.mood || "indicative",
      tense: callerSelections.tense || "present",
      requestedVoice: callerSelections.requestedVoice || "active",
      compoundSubjectAnimacy: callerSelections.compoundSubjectAnimacy || exactSourceFrame.requiredSubjectAnimacy || "animate",
    } : null;
    const ownerPreflightResult = ownerRequest ? evaluateClassicalNahuatlLateVncDerivation(ownerRequest) : null;
    const reason = !accepted ? "issued-compound-predicate-source-required" : forbidden
      ? "compound-predicate-source-caller-authority-rejected" : ownerPreflightResult?.blockReason || "";
    const requiredChoiceIds = reason === "typed-compound-matrix-required" ? ["compoundMatrixStem"]
      : reason === "classical-vnc-source-initial-i-selection-required" ? ["compoundMatrixInitialISelection"] : [];
    const ready = ownerPreflightResult?.authorizationStatus === "authorized";
    const frame = freeze({
      kind: "classical-nahuatl-compound-predicate-binding-frame",
      version: VERSION,
      authorizationStatus: ready || requiredChoiceIds.length ? "authorized" : "blocked",
      bindingStatus: ready ? "ready" : requiredChoiceIds.length ? "choices-required" : "rejected",
      blockReason: reason,
      operationId: "vnc:derivational-operation",
      exactSourceFrame: accepted ? exactSourceFrame : null,
      callerSelections: { ...callerSelections },
      effectiveSelections: ownerRequest,
      ownerRequest,
      ownerPreflightResult,
      requiredChoiceIds,
      choiceOptionProjection: {},
      ownerChoicesRequired: requiredChoiceIds.length > 0,
      ownerInputAcceptanceProven: accepted && !forbidden,
      executionArgs: ready ? [ownerRequest] : [],
      sourceStringAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      grammarAuthority: false,
    });
    compoundPredicateBindingRequests.set(frame, ownerRequest);
    return frame;
  }
  function isClassicalNahuatlCompoundPredicateBindingFrame(frame = null) {
    return Boolean(frame && compoundPredicateBindingRequests.has(frame)
      && frame.kind === "classical-nahuatl-compound-predicate-binding-frame"
      && frame.ownerRequest === compoundPredicateBindingRequests.get(frame)
      && (!frame.exactSourceFrame || isClassicalNahuatlCompoundPredicateSourceFrame(frame.exactSourceFrame)));
  }

  function buildEvaluatedGcdProjection({
    baseApplicationFrame = null,
    compoundPredicateSourceFrame = null,
    recursiveEmbedClosureFrame = null,
    operationFrame = null,
    machineryFrame = null,
    finiteSurfaceFrame = null,
  } = {}) {
    const sourceAuthorized = baseApplicationFrame?.authorizationStatus === "authorized"
      || isClassicalNahuatlCompoundPredicateSourceFrame(compoundPredicateSourceFrame)
      || isAuthorizedClosureFrame(recursiveEmbedClosureFrame);
    const operationAuthorized = issuedOperationFrames.has(operationFrame)
      && operationFrame?.authorizationStatus === "authorized";
    const machineryAuthorized = issuedMachineryFrames.has(machineryFrame)
      && machineryFrame?.operationFrame === operationFrame;
    const typedResultContinuous = operationFrame?.targetTypedVncSlotFrame
      === machineryFrame?.proofFrame?.conclusion?.finalTypedVncSlotFrame;
    const finiteResultAuthorized =
      targetObject.isClassicalNahuatlVncFiniteSurfaceFrame?.(
        finiteSurfaceFrame
      ) === true
      && finiteSurfaceFrame.machineryFrame === machineryFrame;
    const selectedFormulaContinuous = finiteResultAuthorized
      && finiteSurfaceFrame.formulaRealization
        === targetObject.renderClassicalNahuatlVncSlotFrameFormula?.(
          operationFrame?.targetTypedVncSlotFrame
        );
    return freeze({
      identity:
        "typed-vnc-source+semantic-operation+typed-slot-projection+finite-boundary-result",
      sourceAuthorized,
      operationAuthorized,
      machineryAuthorized,
      typedResultContinuous,
      finiteResultAuthorized,
      selectedFormulaContinuous,
      satisfied: Boolean(
        sourceAuthorized
        && operationAuthorized
        && machineryAuthorized
        && typedResultContinuous
        && finiteResultAuthorized
        && selectedFormulaContinuous
      ),
    });
  }

  const vowels = "aāeēiīoō";
  const FREQUENTATIVE_SCOPES = Object.freeze([
    "open",
    "action",
    "agent",
    "patient",
    "occasion",
    "place",
  ]);
  const FREQUENTATIVE_TARGETS = Object.freeze([
    "lexical-stem",
    "fused-tla",
    "fused-tla-and-lexical-stem",
    "mainline-reflexive",
  ]);
  const consonantUnits = /^(?:ch|cu|hu|qu|tl|tz|[bcçhlmnpqstxyz])/u;
  const shortVowel = value => ({ ā: "a", ē: "e", ī: "i", ō: "o" }[value] || value);
  const longVowel = value => ({ a: "ā", e: "ē", i: "ī", o: "ō" }[value] || value);
  const firstSound = stem => {
    const match = key(stem).match(consonantUnits);
    return match?.[0] || "";
  };
  function parseIntransitiveDestockal(sourceStem = "") {
    const match = text(sourceStem).match(
      /^(.*?)([aāeēiīoō])(-?)(ni|hui)$/u,
    );
    if (!match) return null;
    const [, beforeStockVowel, stockVowel, boundary, sourceSuffix] = match;
    const reducedStockVowel = shortVowel(stockVowel);
    return freeze({
      sourceSuffix,
      root: beforeStockVowel.replace(/-+$/gu, ""),
      stockVowel,
      reducedStockVowel,
      targetSuffix: "ca",
      targetCore: `${beforeStockVowel}${reducedStockVowel}${boundary}ca`,
    });
  }
  function parseCausativeDestockal(sourceStem = "") {
    const match = text(sourceStem).match(
      /^(.*?)([aāeēiīoō])(-?)(n-a|na|ni-ā|niā|hu-a|hua)$/u,
    );
    if (!match) return null;
    const [, beforeStockVowel, stockVowel, boundary, sourceSuffix] = match;
    const reducedStockVowel = shortVowel(stockVowel);
    const root = beforeStockVowel.replace(/-+$/gu, "");
    const underlyingStemFormative = /^(?:hu-a|hua)$/u.test(sourceSuffix)
      ? "hui"
      : "ni";
    return freeze({
      root,
      sourceSuffix,
      underlyingStemFormative,
      stockVowel,
      reducedStockVowel,
      retainedCausativeVowel: "a",
      targetSuffix: "tz-a",
      targetCore: `${beforeStockVowel}${reducedStockVowel}${boundary}tz-a`,
    });
  }
  function parseCompletedLexicalizedDestockal(sourceStem = "") {
    const stem = text(sourceStem).replace(/^\((.*)\)$/u, "$1");
    const causativeMatch = stem.match(/(?:tz-a|tza)$/u);
    const intransitiveMatch = stem.match(/ca$/u);
    if (!causativeMatch && !intransitiveMatch) return null;
    return freeze({
      targetStem: stem,
      targetClass: causativeMatch ? "B" : "A",
      structuralForce: causativeMatch ? "causative-or-applicative" : "intransitive",
      tzAUnit: causativeMatch?.[0] || "",
      fusedLongVowel: stem.match(/[āēīō]/u)?.[0] || "",
    });
  }
  function getTypedPredicateMorpheme(morphIdentity = "") {
    return {
      slotRole: "predicate",
      morphIdentity,
    };
  }
  function buildTypedRootStockCoalescence(
    root = "",
    stockFormative = "",
    stemFormative = "",
  ) {
    return buildClassicalNahuatlTypedRootStockVowelCoalescenceRelation(
      getTypedPredicateMorpheme(root),
      getTypedPredicateMorpheme(stockFormative),
      getTypedPredicateMorpheme(stemFormative),
    );
  }
  function resolveFusedStockSourceAnalysis(
    sourceAnalysisFrame = null,
    parsedSource = null,
  ) {
    if (
      !sourceAnalysisFrame
      || typeof targetObject.isClassicalNahuatlVncDerivationSourceAnalysisFrame
        !== "function"
      || !targetObject.isClassicalNahuatlVncDerivationSourceAnalysisFrame(
        sourceAnalysisFrame,
      )
      || !parsedSource
    ) {
      return null;
    }
    const candidates = (sourceAnalysisFrame.analyses || [])
      .filter(analysis => (
        analysis?.destockalStructureFrame?.typeId
          === "long-vowel-ni-or-hui"
        && analysis.stockFormative === parsedSource.stockVowel
        && analysis.stemFormative === parsedSource.sourceSuffix
      ))
      .map(analysis => ({
        analysis,
        sourceCoalescenceFrame: buildTypedRootStockCoalescence(
          analysis.root,
          analysis.stockFormative,
          analysis.stemFormative,
        ),
      }))
      .filter(candidate => candidate.sourceCoalescenceFrame)
      .sort((left, right) => (
        Number(
          right.analysis.lexicalStatus
            === "lexically-licensed-source-analysis",
        )
        - Number(
          left.analysis.lexicalStatus
            === "lexically-licensed-source-analysis",
        )
      ));
    return candidates[0] || null;
  }
  function doesCausativeMorphemicProfileMatch(
    sourceAgreementFrame = null,
    parsedSource = null,
  ) {
    if (
      !isClassicalNahuatlLateSourceAgreementFrame(sourceAgreementFrame)
      || sourceAgreementFrame.authorizationStatus !== "authorized"
      || !parsedSource?.root
      || !parsedSource.stockVowel
      || !parsedSource.sourceSuffix
    ) {
      return false;
    }
    const signedBoundaryFreeSource = text(
      sourceAgreementFrame.morphemicSourceProfile?.sourceStem,
    ).normalize("NFC").replace(/-/gu, "");
    const reconstructedBoundaryFreeSource = [
      parsedSource.root,
      parsedSource.stockVowel,
      parsedSource.sourceSuffix,
    ].join("").normalize("NFC").replace(/-/gu, "");
    return Boolean(
      signedBoundaryFreeSource
      && signedBoundaryFreeSource === reconstructedBoundaryFreeSource
    );
  }
  function doesRecoveredCausativeConstructionMatch(
    parsedSource = null,
    sourceAnalysis = null,
    option = null,
  ) {
    const suffix = text(parsedSource?.sourceSuffix).replace(/-/gu, "");
    const operation = key(option?.targetConstruction?.operation);
    if (
      !parsedSource
      || !sourceAnalysis
      || option?.derivationType !== "causative"
      || option.sourceAnalysisId !== sourceAnalysis.analysisId
      || sourceAnalysis.stemFormative
        !== parsedSource.underlyingStemFormative
    ) {
      return false;
    }
    if (suffix === "na") {
      return sourceAnalysis.stemFormative === "ni"
        && ["replace-final", "recover-fused-stock-and-replace"]
          .includes(operation);
    }
    if (suffix === "niā") {
      return sourceAnalysis.stemFormative === "ni"
        && ["append", "recover-fused-stock-and-append"]
          .includes(operation)
        && option.targetConstruction?.add === "ā";
    }
    if (suffix === "hua") {
      return sourceAnalysis.stemFormative === "hui"
        && ["replace-final", "replace-morpheme"]
          .includes(operation);
    }
    return false;
  }
  function resolveContractedCausativeSourceAncestry(
    sourceAgreementFrame = null,
    parsedSource = null,
  ) {
    if (
      !isClassicalNahuatlLateSourceAgreementFrame(sourceAgreementFrame)
      || sourceAgreementFrame.authorizationStatus !== "authorized"
      || !parsedSource?.root
      || !/[āēīō]/u.test(parsedSource.stockVowel)
      || new RegExp(`[${vowels}]$`, "u").test(parsedSource.root)
      || !["ni", "hui"].includes(parsedSource.underlyingStemFormative)
      || typeof targetObject.buildClassicalNahuatlVerbstemClassFrame
        !== "function"
      || typeof targetObject.isClassicalNahuatlVerbstemClassFrame
        !== "function"
      || typeof targetObject.getClassicalNahuatlVncDerivationOptionInventory
        !== "function"
      || typeof targetObject.isClassicalNahuatlVncDerivationOptionInventory
        !== "function"
      || typeof targetObject.isClassicalNahuatlVncDerivationSourceAnalysisFrame
        !== "function"
    ) {
      return null;
    }
    const recoveredSourceStem = `${parsedSource.root}${
      parsedSource.stockVowel
    }-${parsedSource.underlyingStemFormative}`;
    const sourceMachineryFrame =
      targetObject.buildClassicalNahuatlVerbstemClassFrame(
        recoveredSourceStem,
        {
          subject: "3sg",
          mood: "indicative",
          tense: "present",
          verbClass: "B",
          stemClass: "B",
          valence: "intransitive",
          sourceValence: "intransitive",
          transitivity: "intransitive",
          objectKind: "none",
        },
      );
    if (!targetObject.isClassicalNahuatlVerbstemClassFrame(
      sourceMachineryFrame,
    )) {
      return null;
    }
    const derivationOptionInventory =
      targetObject.getClassicalNahuatlVncDerivationOptionInventory(
        sourceMachineryFrame,
        {
          derivationType: "causative",
          verbClass: "B",
          sourceValence: "intransitive",
        },
      );
    if (
      !targetObject.isClassicalNahuatlVncDerivationOptionInventory(
        derivationOptionInventory,
      )
      || derivationOptionInventory.authorizationStatus !== "authorized"
      || derivationOptionInventory.sourceMachineryFrame
        !== sourceMachineryFrame
    ) {
      return null;
    }
    const actualCausativeSourceStem =
      sourceAgreementFrame.morphemicSourceProfile?.sourceStem || "";
    const actualCausativeSourceClass =
      sourceAgreementFrame.morphemicSourceProfile?.sourceClass || "";
    const actualTargetIdentity = normalizeLexicalFrequentativeMeaningIdentity(
      actualCausativeSourceStem,
    );
    const selectedOption = (derivationOptionInventory.options || [])
      .find(option => (
        option?.derivationType === "causative"
        && option.targetClass === actualCausativeSourceClass
        && normalizeLexicalFrequentativeMeaningIdentity(option.targetStem)
          === actualTargetIdentity
      )) || null;
    const sourceAnalysisFrame =
      derivationOptionInventory.sourceAnalysisFrame || null;
    const optionSourceAnalysisFrame =
      selectedOption?.sourceAnalysisFrame || null;
    if (
      !selectedOption
      || !(derivationOptionInventory.options || []).includes(selectedOption)
      || !targetObject.isClassicalNahuatlVncDerivationSourceAnalysisFrame(
        sourceAnalysisFrame,
      )
      || !targetObject.isClassicalNahuatlVncDerivationSourceAnalysisFrame(
        optionSourceAnalysisFrame,
      )
      || sourceAnalysisFrame.sourceMachineryFrame !== sourceMachineryFrame
      || optionSourceAnalysisFrame.sourceMachineryFrame
        !== sourceMachineryFrame
      || optionSourceAnalysisFrame.canonicalSignature
        !== sourceAnalysisFrame.canonicalSignature
      || sourceAnalysisFrame.sourceClass !== "B"
      || sourceAnalysisFrame.sourceValence !== "intransitive"
    ) {
      return null;
    }
    const sourceAnalysis = (sourceAnalysisFrame.analyses || [])
      .find(analysis => (
        analysis.analysisId === selectedOption.sourceAnalysisId
        && analysis.lexicalStatus === "lexically-licensed-source-analysis"
        && analysis.destockalStructureFrame?.typeId
          === "long-vowel-ni-or-hui"
        && analysis.stockFormative === parsedSource.stockVowel
        && analysis.stemFormative
          === parsedSource.underlyingStemFormative
      )) || null;
    if (!doesRecoveredCausativeConstructionMatch(
      parsedSource,
      sourceAnalysis,
      selectedOption,
    )) {
      return null;
    }
    const sourceCoalescenceFrame = buildTypedRootStockCoalescence(
      sourceAnalysis.root,
      sourceAnalysis.stockFormative,
      sourceAnalysis.stemFormative,
    );
    if (
      sourceCoalescenceFrame?.authorizationStatus !== "authorized"
      || normalizeLexicalFrequentativeMeaningIdentity(recoveredSourceStem)
        !== normalizeLexicalFrequentativeMeaningIdentity([
          sourceCoalescenceFrame.resultStock,
          sourceAnalysis.stemFormative,
        ].join("-"))
    ) {
      return null;
    }
    return freeze({
      kind:
        "classical-nahuatl-contracted-causative-source-ancestry-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      sourceAgreementFrame,
      recoveredSourceStem,
      sourceMachineryFrame,
      sourceAnalysisFrame,
      sourceAnalysisId: sourceAnalysis.analysisId,
      sourceAnalysis,
      derivationOptionInventory,
      selectedOption,
      sourceCoalescenceFrame,
      actualCausativeSourceStem,
      actualCausativeSourceClass,
      forwardTargetIdentityMatches: true,
      interpretation: "available-source-analysis",
      sourceAdmissionAuthority: false,
      callerSuppliedGrammarAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      canvasExampleAuthority: false,
      contextualFactIsUserChoice: false,
    });
  }
  function buildFusedStockFrequentativeFrame({
    sourceAgreementFrame = null,
    sourceAnalysisFrame = null,
    sourceAnalysis = null,
    sourceCoalescenceFrame = null,
    causativeSourceAncestryFrame = null,
    formationFamily = "",
    replacedSuffix = "",
    targetSuffix = "",
    reduplicativePrefix = "",
    targetClass = "",
  } = {}) {
    if (
      !isClassicalNahuatlLateSourceAgreementFrame(sourceAgreementFrame)
      || sourceAgreementFrame.authorizationStatus !== "authorized"
      || sourceCoalescenceFrame?.authorizationStatus !== "authorized"
      || sourceCoalescenceFrame.ruleContract?.ruleId
        !== "cn-l24-identical-root-stock-vowel-coalescence"
      || !["intransitive-ca", "causative-tz-a"].includes(formationFamily)
      || !replacedSuffix
      || !targetSuffix
      || !reduplicativePrefix
      || !targetClass
    ) {
      return null;
    }
    const targetStem = [
      reduplicativePrefix,
      sourceCoalescenceFrame.resultStock,
      targetSuffix,
    ].join("-");
    return freeze({
      kind: "classical-nahuatl-fused-stock-frequentative-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      ruleContract: FUSED_STOCK_FREQUENTATIVE_RULE_CONTRACT,
      sourceAgreementFrame,
      sourceAnalysisFrame,
      sourceAnalysisId: sourceAnalysis?.analysisId || "",
      sourceCoalescenceFrame,
      causativeSourceAncestryFrame,
      formation: {
        family: formationFamily,
        replacedSuffix,
        targetSuffix,
        retainedStock: sourceCoalescenceFrame.resultStock,
        stockQuantity: "long",
        reduplicativePrefix,
        targetStem,
        targetClass,
      },
      sourceAdmissionAuthority: false,
      callerSuppliedGrammarAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      canvasExampleAuthority: false,
      contextualFactIsUserChoice: false,
    });
  }
  function normalizeLexicalFrequentativeMeaningIdentity(stem = "") {
    return text(stem)
      .normalize("NFC")
      .toLowerCase()
      .replace(/[\p{Dash_Punctuation}\s]+/gu, "");
  }
  function buildLexicalFrequentativeMeaningFrame({
    variant = "",
    sourceStem = "",
    sourceApplicationFrame = null,
    targetApplicationFrame = null,
    targetStem = "",
    targetTypedVncSlotFrame = null,
    operationFacts = null,
  } = {}) {
    const targetIdentity = normalizeLexicalFrequentativeMeaningIdentity(
      targetStem,
    );
    const lexicalLicense = Object.hasOwn(
      LEXICAL_FREQUENTATIVE_CAUSATIVE_MEANING_LICENSES,
      targetIdentity,
    )
      ? LEXICAL_FREQUENTATIVE_CAUSATIVE_MEANING_LICENSES[targetIdentity]
      : null;
    const fusedStockFrequentativeFrame =
      operationFacts?.fusedStockFrequentativeFrame || null;
    const completedLexicalized = variant === "destockal-lexicalized"
      && operationFacts?.lexicalizedDestockal === true;
    const generatedFromFusedStock = variant === "destockal-causative"
      && fusedStockFrequentativeFrame?.authorizationStatus === "authorized"
      && fusedStockFrequentativeFrame.formation?.targetStem === targetStem;
    const sourceApplicationCanonical = Boolean(
      typeof targetObject.isClassicalNahuatlVncApplicationFrame === "function"
      && targetObject.isClassicalNahuatlVncApplicationFrame(
        sourceApplicationFrame,
      )
      && sourceApplicationFrame.authorizationStatus === "authorized"
      && sourceApplicationFrame.normalizedRequest?.sourceStem === sourceStem
    );
    const targetApplicationCanonical = Boolean(
      typeof targetObject.isClassicalNahuatlVncApplicationFrame === "function"
      && targetObject.isClassicalNahuatlVncApplicationFrame(
        targetApplicationFrame,
      )
      && targetApplicationFrame.authorizationStatus === "authorized"
      && normalizeLexicalFrequentativeMeaningIdentity(
        targetApplicationFrame.normalizedRequest?.sourceStem,
      ) === targetIdentity
    );
    const conditionedTargetTypedVncSlotFrame = targetApplicationCanonical
      ? getBaseTypedFrame(targetApplicationFrame)
      : null;
    const conditionedPredicateSlot =
      conditionedTargetTypedVncSlotFrame?.slots?.predicate || null;
    const targetSourceAnalysisFrame = targetApplicationCanonical
      ? targetApplicationFrame.resultFrame?.sourceAnalysisFrame || null
      : null;
    const predicateSlot = targetTypedVncSlotFrame?.slots?.predicate || null;
    const subjectSlot = targetTypedVncSlotFrame?.slots?.subject || null;
    const objectSlots = (Array.isArray(
      targetTypedVncSlotFrame?.slots?.prePredicate,
    )
      ? targetTypedVncSlotFrame.slots.prePredicate
      : []).filter(slot => (
        slot?.kind === "monadic-valence"
        || slot?.kind === "dyadic-valence"
      ));
    const objectRequests = sourceApplicationCanonical
      && Array.isArray(
        sourceApplicationFrame.normalizedRequest?.sourceObjectRequests,
      )
      ? sourceApplicationFrame.normalizedRequest.sourceObjectRequests
      : [];
    const objectBindings = objectSlots.map((slot, index) => ({
      slot,
      objectRequest: objectRequests[index] || null,
    }));
    if (
      !lexicalLicense
      || (!completedLexicalized && !generatedFromFusedStock)
      || !sourceApplicationCanonical
      || !targetApplicationCanonical
      || !targetSourceAnalysisFrame
      || !predicateSlot?.stem
      || predicateSlot.stem !== conditionedPredicateSlot?.stem
      || !subjectSlot
      || !objectSlots.length
      || objectRequests.length !== objectSlots.length
      || objectBindings.some(binding => !binding.objectRequest)
    ) {
      return null;
    }
    return freeze({
      kind: "classical-nahuatl-lexical-frequentative-meaning-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      lexicalIdentityFrame: {
        lexicalIdentityId: lexicalLicense.lexicalIdentityId,
        targetIdentity,
        targetStem,
        boundarySensitivity: "editorial-hyphens-ignored",
        vowelQuantitySensitivity: "phonemic-and-preserved",
      },
      availableReadings: lexicalLicense.availableReadings,
      meaningAssertionStatus: "available-not-asserted",
      lexicalIdentityMatchDoesNotForceReading: true,
      typedTargetBinding: {
        sourceApplicationFrame,
        targetApplicationFrame,
        targetSourceAnalysisFrame,
        conditionedTargetTypedVncSlotFrame,
        conditionedPredicateSlot,
        targetTypedVncSlotFrame,
        predicateSlot,
        lexicalTargetStem: targetStem,
        conditionedPredicateStem: predicateSlot.stem,
        subjectSlot,
        objectSlots,
        objectRequests,
        objectBindings,
        objectSlotCount: objectSlots.length,
        objectRequestCount: objectRequests.length,
        subjectSemanticRole: "causer",
        objectSemanticRole: "affected-participant",
        participantKindsRestrictedByLexicalReading: false,
        sourceApplicationIdentityContinuous: true,
        targetApplicationIdentityContinuous: true,
        conditionedPredicateContinuous: true,
      },
      routeEvidence: {
        variant,
        completedLexicalized,
        generatedFromFusedStock,
        fusedStockFrequentativeFrame: generatedFromFusedStock
          ? fusedStockFrequentativeFrame
          : null,
      },
      citationRolesRestrictActualParticipants: false,
      sourceAdmissionAuthority: false,
      shapeAdmissionAuthority: false,
      callerSuppliedGrammarAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      canvasExampleAuthority: false,
      contextualFactIsUserChoice: false,
    });
  }
  function buildNonextantDestockalSourceLifecycleFrame(sourceStem = "") {
    const lexicalIdentity = text(sourceStem).normalize("NFC");
    const lexicalLicense = Object.hasOwn(
      NONEXTANT_DESTOCKAL_FREQUENTATIVE_LEXICAL_LICENSES,
      lexicalIdentity,
    )
      ? NONEXTANT_DESTOCKAL_FREQUENTATIVE_LEXICAL_LICENSES[lexicalIdentity]
      : null;
    if (!lexicalLicense) return null;
    const historicalSource = lexicalLicense.historicalSource;
    const typedPredicateMorpheme = morphIdentity => ({
      slotRole: "predicate",
      morphIdentity,
    });
    const sourceCoalescenceFrame =
      buildClassicalNahuatlTypedRootStockVowelCoalescenceRelation(
        typedPredicateMorpheme(historicalSource.root),
        typedPredicateMorpheme(historicalSource.stockFormative),
        typedPredicateMorpheme(historicalSource.stemFormative),
      );
    if (!sourceCoalescenceFrame) return null;
    const reduplicationParts = getReduplicationParts(historicalSource.root);
    const reduplicativePrefix = `${reduplicationParts.consonant}${shortVowel(
      reduplicationParts.vowel,
    )}`;
    const targetStemFormative = "ca";
    const targetStem = `${reduplicativePrefix}-${
      sourceCoalescenceFrame.resultStock
    }-${targetStemFormative}`;
    return freeze({
      kind: "classical-nahuatl-nonextant-destockal-source-lifecycle-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      lexicalIdentityId: lexicalLicense.lexicalIdentityId,
      sourceLifecycleSystem: NONEXTANT_DESTOCKAL_SOURCE_LIFECYCLE_SYSTEM,
      historicalSource,
      sourceCoalescenceFrame,
      derivation: {
        operation: "destockal-intransitive-frequentative",
        reduplicativePrefix,
        replacedStemFormative: historicalSource.stemFormative,
        targetStemFormative,
        targetClass: "A",
        targetStem,
        stockVowelPreserved: true,
      },
      ownerConstructed: true,
      sourceAdmissionAuthority: false,
      canvasExampleAuthority: false,
      callerSuppliedGrammarAuthority: false,
    });
  }
  function deriveUncertainCaStem(sourceRoot = "", role = "intransitive") {
    const source = text(sourceRoot).replace(/^\((.*)\)$/u, "$1");
    if (!source.endsWith("ca")) return null;
    const core = source.slice(0, -2).replace(/-$/u, "");
    const parts = getReduplicationParts(core);
    if (!parts.vowel) return null;
    const copiedPrefix = `${parts.consonant}${shortVowel(parts.vowel)}`;
    const flat = core.replaceAll("-", "");
    const root = flat.startsWith(copiedPrefix) ? flat.slice(copiedPrefix.length) : "";
    const rootParts = getReduplicationParts(root);
    if (!rootParts.vowel || `${rootParts.consonant}${shortVowel(rootParts.vowel)}` !== copiedPrefix) return null;
    const suffix = role === "intransitive" ? "ca" : "tz-a";
    return freeze({
      root,
      copiedPrefix,
      targetStem: role === "intransitive" ? source : `${core}-${suffix}`,
      suffix,
    });
  }
  function deriveUncertainTzcaStem(sourceStem = "") {
    const stem = text(sourceStem).replace(/^\((.*)\)$/u, "$1");
    if (!stem || /(?:^|-)tz-ca$/u.test(stem)) return null;
    const vowelMatches = [...stem.matchAll(new RegExp(`[${vowels}]`, "gu"))];
    if (vowelMatches.length < 2) return null;
    const finalVowelIndex = vowelMatches.at(-1)?.index;
    const previousVowelIndex = vowelMatches.at(-2)?.index;
    if (!Number.isInteger(finalVowelIndex)
      || !Number.isInteger(previousVowelIndex)) return null;
    const between = stem.slice(previousVowelIndex + 1, finalVowelIndex);
    const boundaryOffset = between.lastIndexOf("-");
    const finalSyllableStart = boundaryOffset >= 0
      ? previousVowelIndex + 2 + boundaryOffset
      : previousVowelIndex + 1;
    const retainedSource = stem.slice(0, finalSyllableStart).replace(/-+$/u, "");
    // The singing lexeme has an attested short-i operand in this special
    // formation. This does not shorten ordinary stems or other long-i roots.
    const licensedRetainedSource = stem.replaceAll("-", "") === "cuīca"
      ? retainedSource.replace(/ī$/u, "i") : retainedSource;
    const replacedSyllable = stem.slice(finalSyllableStart).replace(/^-+/u, "");
    if (!retainedSource || !replacedSyllable) return null;
    const copied = getReduplicationParts(retainedSource);
    if (!copied.vowel) return null;
    const copiedPrefix = `${copied.consonant}${shortVowel(copied.vowel)}`;
    return freeze({
      sourceStem: stem,
      retainedSource,
      replacedSyllable,
      copiedPrefix,
      replacement: "tz-ca",
      targetStem: `${copiedPrefix}-${licensedRetainedSource}-tz-ca`,
    });
  }
  function perfectiveStemFromMachinery(machineryFrame = null) {
    const candidates = [
      machineryFrame?.perfectiveStem,
      machineryFrame?.classProfile?.perfectiveStem,
      machineryFrame?.proofFrame?.conclusion?.perfectiveStem,
      machineryFrame?.proofFrame?.conclusion?.predicateTableCell?.stem,
      machineryFrame?.proofFrame?.conclusion?.finalTypedVncSlotFrame?.slots?.predicate?.stem
    ];
    return text(candidates.find(Boolean));
  }
  function isAuthorizedClosureFrame(frame = null) {
    return Boolean(
      frame
      && issuedClosureFrames.has(frame)
      && frame.kind === "classical-nahuatl-late-vnc-derivation-closure-frame"
      && frame.version === VERSION
      && frame.authorizationStatus === "authorized"
      && frame.finalTypedVncSlotFrame
      && frame.selectedMachineryFrame
    );
  }
  function buildAccompanyingPossessionSupplement(request = {}) {
    if (typeof targetObject.buildClassicalNahuatlPossessiveNncFrame !== "function"
      || typeof targetObject.buildClassicalNahuatlNncSentenceSurfaceFrame !== "function"
      || typeof targetObject.isClassicalNahuatlNncSlotFrame !== "function") {
      return freeze({
        kind: "classical-nahuatl-accompanying-possession-accompanying-possession-supplement-frame",
        authorizationStatus: "blocked",
        blockReason: "canonical-possessive-nnc-evaluator-unavailable"
      });
    }
    const predicateStem = text(request.compoundPossessiveStem);
    const possessor = text(request.compoundPossessor);
    if (!predicateStem || !possessor) {
      return freeze({
        kind: "classical-nahuatl-accompanying-possession-accompanying-possession-supplement-frame",
        authorizationStatus: "blocked",
        blockReason: "typed-possessive-supplement-required"
      });
    }
    const possessiveNncFrame = targetObject.buildClassicalNahuatlPossessiveNncFrame(
      predicateStem,
      {
        subject: text(request.subject || "3sg"),
        possessor,
        singularConnector: "0",
        nounstemRelationKind: "nonrelational",
        animacy: key(request.compoundPossessiveAnimacy || "nonanimate"),
        formula: text(request.compoundPossessiveFormula)
      }
    );
    const nncSlotFrame = possessiveNncFrame?.nncSlotFrame || null;
    const sentenceSurfaceFrame = targetObject.buildClassicalNahuatlNncSentenceSurfaceFrame(
      nncSlotFrame,
      { sentenceType: "assertion", polarity: "positive" }
    );
    const authorized = Boolean(
      possessiveNncFrame?.authorizationStatus === "authorized"
      && targetObject.isClassicalNahuatlNncSlotFrame(nncSlotFrame)
      && sentenceSurfaceFrame?.authorizationStatus === "authorized"
      && sentenceSurfaceFrame?.nuclearSurface
    );
    // The canonical NNC frame owns its own deep graph.  Keep this wrapper
    // shallow-frozen so this operation does not recursively re-freeze another
    // grammar service's issued frame graph.
    return Object.freeze({
      kind: "classical-nahuatl-accompanying-possession-accompanying-possession-supplement-frame",
      version: VERSION,
      authorizationStatus: authorized ? "authorized" : "blocked",
      blockReason: authorized
        ? ""
        : possessiveNncFrame?.blockReason
          || sentenceSurfaceFrame?.blockReason
          || "canonical-possessive-nnc-generation-blocked",
      possessiveNncFrame,
      nncSlotFrame: authorized ? nncSlotFrame : null,
      sentenceSurfaceFrame: authorized ? sentenceSurfaceFrame : null,
      predicateStem,
      possessor,
      typedNncAuthority: true,
      formulaStringAuthority: false,
      surfaceStringAuthority: false
    });
  }
  function buildAccompanyingPossessionResultFrame(
    supplementFrame = null,
    finiteSurfaceFrame = null
  ) {
    const authorized = Boolean(
      supplementFrame?.kind
        === "classical-nahuatl-accompanying-possession-accompanying-possession-supplement-frame"
      && supplementFrame.authorizationStatus === "authorized"
      && supplementFrame.nncSlotFrame
      && targetObject.isClassicalNahuatlNncSlotFrame?.(supplementFrame.nncSlotFrame)
      && finiteSurfaceFrame?.authorizationStatus === "authorized"
      && targetObject.isClassicalNahuatlVncFiniteSurfaceFrame?.(finiteSurfaceFrame)
    );
    const supplementSurface = text(
      supplementFrame?.sentenceSurfaceFrame?.nuclearSurface
    );
    const vncSurface = text(finiteSurfaceFrame?.wordRealization);
    return Object.freeze({
      kind: "classical-nahuatl-accompanying-possession-accompanying-possession-result-frame",
      version: VERSION,
      authorizationStatus: authorized ? "authorized" : "blocked",
      blockReason: authorized
        ? ""
        : supplementFrame?.blockReason
          || finiteSurfaceFrame?.blockReason
          || "typed-possessive-nnc-and-vnc-results-required",
      supplementFrame: authorized ? supplementFrame : null,
      finiteSurfaceFrame: authorized ? finiteSurfaceFrame : null,
      surfaceRealization: authorized ? `${supplementSurface} ${vncSurface}` : "",
      typedResultAuthority: true,
      formulaStringAuthority: false,
      surfaceStringAuthority: false
    });
  }
  function futureEmbedShapeFrame(
    sourceStem,
    verbClass = "B",
    subject = "3sg",
  ) {
    const stem = text(sourceStem);
    const classId = text(verbClass).toUpperCase();
    const sharedFrame =
      targetObject.buildClassicalNahuatlImperfectiveShapeEligibilityFrame?.({
        stem,
        classProfile: { classId },
        mood: "indicative",
        tense: "future",
        subject: text(subject) || "3sg",
        aspect: "imperfective",
      });
    if (sharedFrame?.kind
      === "classical-nahuatl-verbstem-imperfective-shape-eligibility-frame"
      && sharedFrame.authorizationStatus === "authorized"
      && sharedFrame.selectedStemVariant) {
      return sharedFrame;
    }
    return Object.freeze({
      selectedStemVariant: stem,
      underlyingStemVariant: stem,
      selectedShape: "unresolved-future-imperfective-shape",
      selectedShapeReason: "shared-lesson7-shape-owner-unavailable",
      silentCarrier: "",
    });
  }
  function futureEmbedStem(sourceStem, verbClass = "B", subject = "3sg") {
    return text(
      futureEmbedShapeFrame(sourceStem, verbClass, subject)
        ?.selectedStemVariant,
    );
  }
  function connectiveFor(matrixStem) {
    return new RegExp(`^[${vowels}]`, "iu").test(text(matrixStem)) ? "t" : "ti";
  }
  function carryEmbedStemForHuītz(sourceStem = "", sourceInitialIKind = "") {
    const stem = text(sourceStem);
    if (!stem) return "";
    // The old construction preserves the carry predicate's vowel quantity.
    // Delete initial i only when the retained Source identifies it as imaginary.
    return key(sourceInitialIKind) === "supportive"
      ? stem.replace(/^i/u, "")
      : stem;
  }
  const INTRANSITIVE_COMPOUND_MATRICES = new Set([
    "ca", "nemi", "ya-uh", "huāl-la-uh", "huī-tz", "ahci", "mani",
    "ihca", "o", "ē-hua", "quiza", "quīza", "huetzi", "tlehcō", "cal-aqui",
    "pil-ca"
  ]);
  const REFLEXIVE_COMPOUND_MATRICES = new Set([
    "m-o-cāhua", "m-o-tēca", "m-o-tlāl-i-ā", "m-o-man-a",
    "m-o-quetza"
  ]);
  const REFLEXIVE_MATRIX_READINGS = Object.freeze({
    "m-o-cāhua": Object.freeze([
      "stop-doing", "leave-in-a-condition", "remain-in-a-state"
    ]),
    "m-o-tēca": Object.freeze([
      "settle-down-to-doing", "begin-doing", "become-a-condition",
      "lie-stretched-out-in-a-state"
    ]),
    "m-o-tlāl-i-ā": Object.freeze([
      "sit-in-a-state", "settle-down-to-doing", "become-a-condition",
      "begin-doing"
    ]),
    "m-o-man-a": Object.freeze([
      "do-gradually", "become-gradually", "begin-doing",
      "stand-in-position-to-do"
    ]),
    "m-o-quetza": Object.freeze([
      "do-gradually", "become-gradually"
    ])
  });
  function normalizeReflexiveMatrixAnalysis(matrixStem = "") {
    const suppliedStem = text(matrixStem);
    const coreStem = suppliedStem.replace(/^(?:[ntm]-o-)+/u, "");
    return freeze({
      suppliedStem,
      coreStem,
      canonicalStem: coreStem ? `m-o-${coreStem}` : "",
      fusedReflexiveCarrier: "m-o",
      suppliedCarrierReplaced: Boolean(
        coreStem && suppliedStem !== coreStem && !suppliedStem.startsWith("m-o-")
      )
    });
  }
  const SHARED_OBJECT_COMPOUND_MATRICES = new Set([
    "tlāl-i-ā", "quetza", "tēca", "cāhua", "quix-tiā", "māy-a-hui"
  ]);
  const SHARED_OBJECT_MATRIX_READINGS = Object.freeze({
    "tlāl-i-ā": Object.freeze([
      "place-shared-object-sitting", "set-shared-object-in-a-condition"
    ]),
    quetza: Object.freeze([
      "place-shared-object-standing", "set-shared-object-in-a-condition"
    ]),
    tēca: Object.freeze([
      "stretch-shared-object-out", "place-shared-object-recumbent"
    ]),
    cāhua: Object.freeze([
      "leave-shared-object-in-a-condition", "leave-shared-object-behind"
    ]),
    "quix-tiā": Object.freeze([
      "cause-shared-object-to-exit-in-a-condition",
      "cause-shared-object-to-end-up-in-a-manner"
    ]),
    "māy-a-hui": Object.freeze([
      "push-shared-object-down-in-a-condition",
      "knock-shared-object-flat"
    ])
  });
  const FUTURE_EMBED_COMPOUND_MATRICES = new Set(["tla-nequi", "tla-qui"]);
  function analyzeFutureEmbedMatrix(matrixStem = "") {
    const suppliedStem = text(matrixStem);
    const lexicalStem = suppliedStem.replace(/^tla-/u, "");
    if (!FUTURE_EMBED_COMPOUND_MATRICES.has(`tla-${lexicalStem}`)) return null;
    return freeze({
      suppliedStem,
      canonicalConstructionStem: `tla-${lexicalStem}`,
      lexicalStem,
      analysisId: lexicalStem === "qui"
        ? "qui-volition-imperfect"
        : "nequi-desire",
      reading: lexicalStem === "qui"
        ? "volition-or-conditional-result"
        : "want-desire-or-hope",
    });
  }
  function deriveCompoundMatrixClass(matrixStem = "", requestedClass = "") {
    const stem = text(matrixStem);
    const requested = text(requestedClass).toUpperCase();
    if (stem === "ē-hua") {
      return ["A", "B"].includes(requested) ? requested : "A";
    }
    const knownMatrixClass = ({
      quiza: "B",
      quīza: "B",
      huetzi: "B",
      "cal-aqui": "B"
    })[stem];
    if (knownMatrixClass) return knownMatrixClass;
    const profile = typeof targetObject.inferClassicalNahuatlLesson7ClassProfile
      === "function"
      ? targetObject.inferClassicalNahuatlLesson7ClassProfile(stem)
      : null;
    const inferred = text(profile?.classId).toUpperCase();
    if (["A", "B", "C", "D"].includes(inferred)) return inferred;
    // An unresolved matrix follows the same typed class choice as a basal
    // stem. Fixed Lesson 7 facts above cannot be replaced by that choice.
    const eligibleClasses = profile?.classClaimAllowedClassIds || [];
    if (eligibleClasses.includes(requested)) return requested;
    return "A";
  }
  function cloneObjectFrameFromTyped(typedFrame = null, transform = null) {
    const slots = (
      Array.isArray(typedFrame?.slots?.prePredicate)
        ? typedFrame.slots.prePredicate
        : []
    ).filter(slot =>
      ["monadic-valence", "dyadic-valence"].includes(slot?.kind)
    );
    const mapped = slots.map((slot, index) => {
      const carrier = text(slot?.carrier);
      const silencedSpecificProjective = Boolean(
        slot?.objectPositionFrame?.silencingRule
          === "incompatible-specific-projective-silenced"
      );
      const position = {
        ...(slot.objectPositionFrame || {}),
        valenceArity: slot.kind === "monadic-valence" ? "monadic" : "dyadic",
        va: slot.va,
        // The canonical finite boundary writes an explicitly silenced
        // incompatible projective position as ⎕. Preserve that typed carrier
        // when a later operation clones the source object topology so the
        // typed formula and the finite realization remain pointwise equal.
        va1: silencedSpecificProjective ? "⎕" : slot.va1,
        va2: slot.va2,
        objectKind: text(slot?.objectPositionFrame?.objectKind)
          || (/^(?:n|t|m)-(?:o|⎕)$/u.test(carrier) ? "reflexive"
            : slot.kind === "monadic-valence" && slot.va === "tla"
              ? "nonspecific-nonhuman"
              : slot.kind === "monadic-valence" && slot.va === "tē"
                ? "nonspecific-human" : ""),
        objectPerson: text(
          slot?.morphIdentityFrame?.objectPerson
          || slot?.objectPositionFrame?.objectPerson
        ),
        objectNumber: text(
          slot?.morphIdentityFrame?.objectNumber
          || slot?.objectPositionFrame?.objectNumber
        )
      };
      return transform ? transform(position, slot, index) : position;
    });
    if (!mapped.length) return { valenceArity: "vacant" };
    if (mapped.length > 1) return { valenceArity: "multiple", positions: mapped };
    return { ...mapped[0], valenceArity: mapped[0].valenceArity };
  }
  function objectFramePositions(frame = null) {
    if (!frame || frame.valenceArity === "vacant") return [];
    if (frame.valenceArity === "multiple") return [...(frame.positions || [])];
    return [{ ...frame }];
  }
  function isProjectiveHonorificObjectPosition(position = null) {
    return [
      "specific-projective",
      "nonspecific-human",
      "nonspecific-nonhuman",
      "projective-human",
      "projective-nonhuman",
    ].includes(key(position?.objectKind));
  }
  function objectFrameReferentSignature(frame = null) {
    return JSON.stringify(objectFramePositions(frame).map(position => ({
      valenceArity: text(position.valenceArity),
      objectKind: text(position.objectKind),
      person: text(position.objectPerson),
      number: text(position.objectNumber)
    })));
  }
  function combineObjectFrames(...frames) {
    const positions = frames.flatMap(objectFramePositions);
    if (!positions.length) return { valenceArity: "vacant" };
    if (positions.length === 1) return { ...positions[0] };
    return { valenceArity: "multiple", positions };
  }
  function buildDerivedParticipantCluster(baseTyped, addedObjectFrame, request, targetStem) {
    const retained = objectFramePositions(cloneObjectFrameFromTyped(baseTyped));
    const added = objectFramePositions(addedObjectFrame);
    const positions = [...retained, ...added];
    const objectRequests = positions.map((position, index) => ({
      ...position,
      objectId: position.objectId || `derived-object-${index + 1}`,
      objectKind: position.objectKind || (position.va === "tē"
        ? "nonspecific-human" : position.va === "tla"
          ? "nonspecific-nonhuman" : "specific-projective"),
      governor: position.governor || "lexical",
      derivationalLevel: position.derivationalLevel || index + 1,
    }));
    const cluster = targetObject.buildClassicalNahuatlObjectClusterFrame?.(request.sourceStem, {
      subject: request.subject,
      subjectCarrier: baseTyped.slots.subject.carrier,
      predicateStem: targetStem, tense: request.tense,
      objectRequests, minimumPositionCount: 1,
    });
    return cluster?.authorizationStatus === "authorized" ? cluster : null;
  }
  function buildCanonicalAddedObjectFrame({
    stem,
    verbClass,
    subject,
    mood,
    tense,
    objectKind,
    objectPerson,
    governor,
    derivationalLevel,
  } = {}) {
    if (typeof targetObject.evaluateClassicalNahuatlVncApplication !== "function") {
      return null;
    }
    const participantApplication = targetObject.evaluateClassicalNahuatlVncApplication({
      sourceStem: stem,
      sourceValence: objectKind === "nonspecific-human"
        ? "projective-human"
        : objectKind === "nonspecific-nonhuman"
          ? "projective-nonhuman"
          : "specific-projective",
      objectKind,
      objectPerson,
      verbClass,
      subject,
      mood,
      tense,
      derivationType: "direct",
      requestedVoice: "active",
      voice: "active",
    });
    if (participantApplication?.authorizationStatus !== "authorized") return null;
    const participantFrame = cloneObjectFrameFromTyped(
      getBaseTypedFrame(participantApplication),
      position => ({
        ...position,
        objectKind,
        objectPerson,
        governor,
        derivationalLevel,
      }),
    );
    return participantFrame.valenceArity === "vacant" ? null : participantFrame;
  }
  function createTypedSlotFromBase(baseTypedFrame, targetStem, {
    predicateTns,
    numberDyad,
    personDyad,
    objectTransform,
    objectFrame,
    sourceFrameKind = "classical-nahuatl-late-vnc-derivation-operation-machinery-frame"
  } = {}) {
    if (typeof targetObject.buildClassicalNahuatlVncSlotFrame !== "function") return null;
    return targetObject.buildClassicalNahuatlVncSlotFrame({
      sourceFrameKind,
      sourceAuthorizationStatus: "authorized",
      stem: targetStem,
      personDyad: {
        pers1: personDyad?.pers1 ?? baseTypedFrame?.slots?.subject?.pers1,
        pers2: personDyad?.pers2 ?? baseTypedFrame?.slots?.subject?.pers2
      },
      tenseFrame: {
        tns: predicateTns === undefined ? baseTypedFrame?.slots?.predicate?.tns : predicateTns
      },
      numberDyad: {
        num1: numberDyad?.num1 ?? baseTypedFrame?.slots?.number?.num1,
        num2: numberDyad?.num2 ?? baseTypedFrame?.slots?.number?.num2
      },
      objectFrame: objectFrame || {
        ...cloneObjectFrameFromTyped(baseTypedFrame, objectTransform),
        stemRealization: targetStem
      }
    });
  }
  function getBaseTypedFrame(applicationFrame = null) {
    return applicationFrame?.resultFrame?.finalTypedVncSlotFrame
      || applicationFrame?.resultFrame?.selectedMachineryFrame?.proofFrame?.conclusion?.finalTypedVncSlotFrame
      || null;
  }
  function blockedOperation(request, reason, ruleFamily = "") {
    const frame = freeze({
      kind: "classical-nahuatl-late-vnc-derivation-operation-frame",
      version: VERSION,
      authorizationStatus: "blocked",
      blockReason: reason,
      operation: key(request?.lateOperation),
      variant: key(request?.lateVariant),
      ruleFamily,
      typedSourceAuthority: true,
      callerFormulaAuthority: false,
      callerSurfaceAuthority: false
    });
    issuedOperationFrames.add(frame);
    return frame;
  }
  function blockedClosure(request, reason, ruleFamily = "") {
    const operationFrame = blockedOperation(request, reason, ruleFamily);
    const frame = freeze({
      kind: "classical-nahuatl-late-vnc-derivation-closure-frame",
      version: VERSION,
      authorizationStatus: "blocked",
      blockReason: reason,
      normalizedRequest: freeze({
        sourceStem: text(request?.sourceStem || request?.stem),
        operation: key(request?.lateOperation),
        variant: key(request?.lateVariant),
        subject: text(request?.subject),
        mood: text(request?.mood),
        tense: text(request?.tense),
        callerFormulaAuthorityAccepted: false,
        callerSurfaceAuthorityAccepted: false
      }),
      operationFrame,
      selectedMachineryFrame: null,
      finalTypedVncSlotFrame: null,
      finiteSurfaceFrame: null,
      formulaRealization: "",
      surfaceRealization: "",
      typedFrameAuthority: true,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      callerSuppliedAuthorityAccepted: false
    });
    issuedClosureFrames.add(frame);
    return frame;
  }

  function buildClassicalNahuatlOperationFrame(baseApplicationFrame = null, request = {}, internalContext = {}) {
    const compoundPredicateSourceFrame = isClassicalNahuatlCompoundPredicateSourceFrame(
      internalContext.compoundPredicateSourceFrame
    ) ? internalContext.compoundPredicateSourceFrame : null;
    if (internalContext.invalidCompoundPredicateSourceFrame === true) {
      return blockedOperation(request, "issued-compound-predicate-source-required", "compound-irregular-embed");
    }
    if (compoundPredicateSourceFrame && (
      key(request.lateOperation) !== compoundPredicateSourceFrame.permittedOperation
      || key(request.lateVariant) !== compoundPredicateSourceFrame.permittedVariant
      || text(request.sourceStem || request.stem) !== compoundPredicateSourceFrame.sourceStem
      || key(request.sourceValence || request.valence || "intransitive") !== "intransitive"
      || (request.objectKind && key(request.objectKind) !== "none")
      || request.sourceObjectRequests?.length
      || key(request.requestedVoice || request.voice || "active") !== "active"
      || [request.derivationType, request.requestedDerivation].some(value => value && key(value) !== "direct")
    )) {
      return blockedOperation(request, "compound-predicate-source-consumption-required", "compound-irregular-embed");
    }
    if (compoundPredicateSourceFrame?.requiredSubjectAnimacy === "nonanimate" && (
      key(request.compoundSubjectAnimacy || "nonanimate") !== "nonanimate"
      || /^[12]/u.test(text(request.subject))
    )) {
      return blockedOperation(request, "cac-embed-requires-nonanimate-subject", "compound-irregular-embed");
    }
    if (internalContext.invalidSourceApplicationFrame === true) {
      return blockedOperation(
        request,
        "engine-issued-derived-source-application-required",
        "honorific-derived-source"
      );
    }
    if (internalContext.sourceDerivationKindMismatch === true) {
      return blockedOperation(
        request,
        "typed-derived-source-operation-continuity-required",
        "honorific-derived-source"
      );
    }
    if (internalContext.invalidAttitudeSourceClosureFrame === true) {
      return blockedOperation(
        request,
        "reverential-requires-engine-issued-honorific-source",
        "reverential-double"
      );
    }
    if (internalContext.invalidRecursiveEmbedFrame === true) {
      return blockedOperation(
        request,
        "engine-issued-recursive-embed-closure-required",
        "compound-recursion"
      );
    }
    if (internalContext.invalidRecursiveMatrixFrame === true) {
      return blockedOperation(
        request,
        "engine-issued-recursive-matrix-closure-required",
        "compound-recursion"
      );
    }
    const recursiveEmbedFrame = isAuthorizedClosureFrame(
      internalContext.recursiveEmbedClosureFrame
    )
      ? internalContext.recursiveEmbedClosureFrame
      : null;
    const baseResult = baseApplicationFrame?.resultFrame || null;
    const baseMachinery = recursiveEmbedFrame?.selectedMachineryFrame
      || baseResult?.selectedMachineryFrame
      || null;
    const baseTyped = recursiveEmbedFrame?.finalTypedVncSlotFrame
      || compoundPredicateSourceFrame?.embeddingSlotFrame
      || getBaseTypedFrame(baseApplicationFrame);
    const requestedSourceStem = text(
      recursiveEmbedFrame?.operationFrame?.targetStem
      || request.sourceStem
      || request.stem
    );
    const sourceAgreementFrame = buildClassicalNahuatlLateSourceAgreementFrame(
      requestedSourceStem,
      {
        verbClass:
          recursiveEmbedFrame?.operationFrame?.targetClass
          || request.verbClass
          || "B",
        sourceValence:
          recursiveEmbedFrame?.operationFrame?.targetValence
          || request.sourceValence
          || request.valence
          || "intransitive",
      }
    );
    const sourceStem = sourceAgreementFrame.morphemicSourceProfile?.sourceStem
      || requestedSourceStem;
    const operation = key(request.lateOperation || "none");
    const variant = key(request.lateVariant || "");
    const canonicalBaseApplication = Boolean(
      typeof targetObject.isClassicalNahuatlVncApplicationFrame === "function"
      && targetObject.isClassicalNahuatlVncApplicationFrame(baseApplicationFrame)
      && baseResult?.authorizationStatus === "authorized"
    );
    if ((!canonicalBaseApplication && !recursiveEmbedFrame && !compoundPredicateSourceFrame)
      || (!baseMachinery && !compoundPredicateSourceFrame)
      || !baseTyped
      || !sourceStem) {
      return blockedOperation(request, "authorized-canonical-base-vnc-required");
    }
    if (!compoundPredicateSourceFrame && (!isClassicalNahuatlLateSourceAgreementFrame(sourceAgreementFrame)
      || sourceAgreementFrame.authorizationStatus !== "authorized")) {
      return blockedOperation(
        request,
        sourceAgreementFrame.blockReason
          || "typed-morphemic-source-profile-required",
        "source-structure"
      );
    }
    const sourceCoordinateSubject = recursiveEmbedFrame
      ? recursiveEmbedFrame.normalizedRequest?.subject
      : baseApplicationFrame?.normalizedRequest?.subject;
    const baseSourceAnalysis = canonicalBaseApplication
      ? targetObject.buildClassicalNahuatlVncDerivationSourceAnalysisFrame?.(baseMachinery) : null;
    const issuedFusion = baseMachinery?.tlaFusionRuleFrame
      || baseMachinery?.operationFrame?.operationFacts?.tlaFusionRuleFrame;
    const authenticatedFusedSource = Boolean(
      targetObject.isClassicalNahuatlVncDerivationSourceAnalysisFrame?.(baseSourceAnalysis)
      && baseSourceAnalysis.sourceMachineryFrame === baseMachinery
      && issuedFusion?.authorizationStatus === "authorized" && issuedFusion.fused === true
      && issuedFusion.derivedStem === baseSourceAnalysis.sourceStem
      && issuedFusion.sourceStemVariant === baseApplicationFrame?.normalizedRequest?.sourceStem
      && baseSourceAnalysis.sourceValence === baseMachinery.targetValence
      && baseSourceAnalysis.sourceClass === text(request.verbClass).toUpperCase()
      && baseSourceAnalysis.participantSurfaceObjectRequests?.length === baseMachinery.targetObjectRequests?.length
      && baseTyped.slots?.prePredicate?.length === baseMachinery.targetObjectRequests?.length
      && text(request.sourceValence || request.valence) === baseMachinery.targetValence
    );
    const sourceCoordinateStem = recursiveEmbedFrame
      ? recursiveEmbedFrame.operationFrame?.targetStem
      : compoundPredicateSourceFrame ? compoundPredicateSourceFrame.sourceStem
      : authenticatedFusedSource ? baseSourceAnalysis.sourceStem
      : internalContext.shuntlineApplicativeHonorPreservesStem
        && targetObject.isClassicalNahuatlVncDerivationSourceAnalysisFrame?.(baseSourceAnalysis)
        && baseSourceAnalysis.sourceMachineryFrame === baseMachinery
        ? baseSourceAnalysis.sourceStem
        : baseApplicationFrame?.normalizedRequest?.sourceStem;
    const compoundItzMotionSource = operation === "compound"
      && sourceStem === "itz"
      && key(request.compoundItzSense) === "motion"
      && text(sourceCoordinateStem) === "huī-tz";
    const sourceSubjectChanged = text(sourceCoordinateSubject)
      !== text(request.subject || "3sg");
    if (operation === "purposive" && sourceSubjectChanged
      && (objectFramePositions(cloneObjectFrameFromTyped(baseTyped)).some(
        position => /reflexive|reciprocal/u.test(key(position.objectKind)),
      ) || /impersonal/u.test(key(baseResult.selectedVoiceOperation)))) {
      // An exact retained reflexive or faceless Source cannot acquire a
      // different referential subject while keeping its old participants.
      return blockedOperation(
        request,
        "purposive-retained-participant-subject-required",
        "purposive-base",
      );
    }
    if ((!compoundItzMotionSource && text(sourceCoordinateStem) !== sourceStem)
      || (!["compound", "purposive"].includes(operation)
        && sourceSubjectChanged)) {
      return blockedOperation(request, "typed-source-request-continuity-required");
    }
    if (!["frequentative", "compound", "purposive", "honorific", "reverential", "pejorative"].includes(operation)) {
      return blockedOperation(request, "recognized-lessons27-29-33-operation-required");
    }
    let targetStem = "";
    let targetClass = text(request.verbClass || "B").toUpperCase();
    let targetValence = text(request.sourceValence || request.valence || "intransitive");
    let ruleFamily = "";
    let predicateTns;
    let numberDyad;
    let personDyad;
    let objectTransform = null;
    let objectFrame = null;
    let operationFacts = {};
    let inheritedIrregularPrefixCoordinate = false;
    let inheritedClassDPrefixCoordinate = false;
    let inheritedCompoundPrefixCoordinate = false;
    let conditionedPrefixTargetStem = "";
    let derivedTargetInitialISelection = request.sourceInitialISelection;
    const baseIrregularPlan = baseMachinery?.proofFrame?.conclusion
      ?.inheritedLesson11ApplicationFrame?.coordinatePlan
      || baseMachinery?.lesson11ParadigmPlan
      || baseMachinery?.activeMachineryFrame?.lesson11ParadigmPlan;
    const baseHasIrregularCoordinate = baseIrregularPlan?.applies === true
      && baseIrregularPlan.authorizationStatus === "authorized";
    const baseHasClassDCoordinate = text(
      baseMachinery?.classId || baseMachinery?.targetClass
    ).toUpperCase() === "D";
    const selectedBaseVoice = key(
      recursiveEmbedFrame?.normalizedRequest?.requestedVoice
      || baseApplicationFrame?.controlFrame?.selectedVoiceOperation
      || baseApplicationFrame?.controlFrame?.selectedVoice
      || baseApplicationFrame?.normalizedRequest?.requestedVoice
      || baseApplicationFrame?.normalizedRequest?.voice
      || baseMachinery?.voice
      || "active"
    );
    const baseIsNonactive = selectedBaseVoice !== "active";

    if (operation === "frequentative") {
      ruleFamily = "frequentative-prefix-shape";
      const requestedRepetitions = request.frequentativeRepetitions === undefined
        ? 1
        : Number(request.frequentativeRepetitions);
      if (!Number.isInteger(requestedRepetitions)
        || requestedRepetitions < 1
        || requestedRepetitions > 32) {
        return blockedOperation(
          request,
          "positive-bounded-reduplication-count-required",
          "frequentative-recursion"
        );
      }
      const repetitions = requestedRepetitions;
      const frequentativeSourceStem = baseIsNonactive || baseHasIrregularCoordinate
        ? text(baseTyped.slots?.predicate?.stem)
        : sourceStem;
      const legacyTargetByVariant = {
        "tla-short-glottal": "fused-tla",
        "tla-long": "fused-tla",
        "tla-short-glottal-and-stem-short-glottal": "fused-tla-and-lexical-stem",
        "tla-long-and-stem-long": "fused-tla-and-lexical-stem",
        "reflexive-partial": "mainline-reflexive",
      };
      const legacyShapeByVariant = {
        "tla-short-glottal": "short-glottal",
        "tla-long": "long",
        "tla-short-glottal-and-stem-short-glottal": "short-glottal",
        "tla-long-and-stem-long": "long",
        "reflexive-partial": "short-glottal",
      };
      const requestedTarget = key(
        request.frequentativeTarget
        || legacyTargetByVariant[variant]
        || "lexical-stem",
      );
      if (!FREQUENTATIVE_TARGETS.includes(requestedTarget)) {
        return blockedOperation(
          request,
          "licensed-frequentative-target-required",
          "frequentative-object",
        );
      }
      if (key(request.frequentativeInitialITreatment || "ordinary") !== "ordinary"
        && (["mainline-reflexive", "fused-tla"].includes(requestedTarget) || !["ordinary-short-glottal", "ordinary-long", "ordinary-short"].includes(variant))) {
        return blockedOperation(request, "exceptional-i-copy-requires-ordinary-stem-prefix", "frequentative-supportive-i");
      }
      const ordinaryVariant = [
        "ordinary-short-glottal",
        "ordinary-long",
        "ordinary-short",
      ].includes(variant);
      const legacyObjectVariant = Object.hasOwn(
        legacyTargetByVariant,
        variant,
      );
      if (ordinaryVariant || legacyObjectVariant) {
        const shape = legacyShapeByVariant[variant]
          || (variant === "ordinary-long"
            ? "long"
            : variant === "ordinary-short"
              ? "short"
              : "short-glottal");
        const requestedScope = key(request.frequentativeScope || "open");
        if (!FREQUENTATIVE_SCOPES.includes(requestedScope)) {
          return blockedOperation(
            request,
            "licensed-frequentative-scope-required",
            "frequentative-prefix-shape"
          );
        }
        if (shape !== "short-glottal" && requestedScope !== "open") {
          return blockedOperation(
            request,
            "frequentative-scope-requires-short-glottal-formation",
            "frequentative-prefix-shape"
          );
        }
        const sourceHasPatient = Array.isArray(baseTyped.slots?.prePredicate)
          && baseTyped.slots.prePredicate.some(slot => (
            ["monadic-valence", "dyadic-valence"].includes(slot?.kind)
          ));
        if (requestedScope === "patient" && !sourceHasPatient) {
          return blockedOperation(
            request,
            "patient-scope-requires-typed-source-object",
            "frequentative-prefix-shape"
          );
        }
        if (requestedTarget === "mainline-reflexive") {
          if (shape !== "short-glottal") {
            return blockedOperation(
              request,
              "partial-reflexive-requires-short-glottal-formation",
              "frequentative-reflexive",
            );
          }
          if (key(baseApplicationFrame?.normalizedRequest?.sourceInitialIAnalysis?.resolvedKind
              || request.sourceInitialISelection) !== "supportive"
            || !/^i/u.test(sourceStem)) {
            return blockedOperation(
              request,
              "supportive-initial-i-source-required",
              "frequentative-reflexive",
            );
          }
          const objectSlots = baseTyped.slots.prePredicate.filter(slot => (
            ["monadic-valence", "dyadic-valence"].includes(slot.kind)
          ));
          const reflexiveSlot = objectSlots.find(slot => (
            slot.kind === "dyadic-valence"
            && /^[mnt]-o$/u.test(slot.carrier || "")
            && (slot.objectPositionFrame
              ? slot.objectPositionFrame.objectKind === "reflexive"
                && slot.objectPositionFrame.prominence === "mainline"
              : objectSlots.length === 1)
          ));
          if (!reflexiveSlot) {
            return blockedOperation(
              request,
              "mainline-reflexive-source-required",
              "frequentative-reflexive",
            );
          }
          targetStem = sourceStem.slice(1);
          objectTransform = (position, slot) => {
            if (slot !== reflexiveSlot) return position;
            const va1 = text(position.va1 || position.va || "")
              .replace(/-?o$/u, "");
            return { ...position, valenceArity: "dyadic", va1, va2: "oh-o" };
          };
          ruleFamily = "frequentative-reflexive";
          operationFacts = {
            reduplicationTarget: requestedTarget,
            shape,
            shapeFormula: "mainline reflexive carrier + short vowel + h",
            reflexiveCarrier: text(reflexiveSlot.carrier),
            partialReflexiveCarrier: `${text(reflexiveSlot.carrier).replace(/-?o$/u, "")}-oh-o`,
            initialIAnalysis: "supportive",
            supportiveIDeleted: true,
            sourceStemAfterSupportiveIDeletion: targetStem,
            participantStructurePreserved: true,
            repetitions: 1,
          };
        } else {
        // A fused/impersonal tla is already a typed stem constituent. The
        // target choice determines whether reduplication applies to tla, the
        // lexical stem beneath it, or both; copied material remains derived.
        const fusedTlaSelected = requestedTarget !== "lexical-stem";
        if (fusedTlaSelected && !/^tla-/u.test(frequentativeSourceStem)) {
          return blockedOperation(
            request,
            "fused-tla-source-required",
            "frequentative-tla",
          );
        }
        if (fusedTlaSelected && shape === "short") {
          return blockedOperation(
            request,
            "fused-tla-reduplication-requires-glottal-or-long-shape",
            "frequentative-tla",
          );
        }
        const ordinarySourceStem = /^tla-/u.test(frequentativeSourceStem)
          ? frequentativeSourceStem.slice(4)
          : frequentativeSourceStem;
        const sourceInitialISelection = /^i/u.test(ordinarySourceStem) ? key(
          baseApplicationFrame?.normalizedRequest?.sourceInitialIAnalysis?.resolvedKind
          || recursiveEmbedFrame?.operationFrame?.targetApplicationFrame
            ?.normalizedRequest?.sourceInitialIAnalysis?.resolvedKind
          || request.sourceInitialISelection
        ) : "";
        const copiedInitialITreatment = key(request.frequentativeInitialITreatment || "ordinary");
        if (!["ordinary", "copy-as-real"].includes(copiedInitialITreatment)) {
          return blockedOperation(request, "licensed-frequentative-initial-i-treatment-required", "frequentative-supportive-i");
        }
        const copySupportiveIAsReal = copiedInitialITreatment === "copy-as-real";
        if (copySupportiveIAsReal && sourceInitialISelection !== "supportive") {
          return blockedOperation(request, "supportive-source-required-for-exceptional-i-copy", "frequentative-supportive-i");
        }
        const deleteSupportiveI = sourceInitialISelection === "supportive" && !copySupportiveIAsReal;
        if (sourceInitialISelection === "supportive"
          && !/^i(?:ch|cu|hu|qu|tl|tz|[bcçhlmnpqstxyz]){2}/u.test(ordinarySourceStem)) {
          return blockedOperation(
            request,
            "supportive-i-plus-two-consonants-required",
            "frequentative-supportive-i"
          );
        }
        const reduplicatedStem = reduplicate(ordinarySourceStem, shape, {
          repetitions,
          supportiveI: deleteSupportiveI
        });
        const reduplicationParts = getReduplicationParts(ordinarySourceStem, {
          supportiveI: deleteSupportiveI
        });
        derivedTargetInitialISelection = copySupportiveIAsReal ? "real" : sourceInitialISelection;
        const copiedVowel = shape === "long"
          ? longVowel(shortVowel(reduplicationParts.vowel))
          : shortVowel(reduplicationParts.vowel);
        const copiedPrefix = `${reduplicationParts.consonant}${copiedVowel}${shape === "short-glottal" ? "h" : ""}`;
        const tlaPrefix = shape === "long" ? "tlā-tla" : "tlah-tla";
        targetStem = fusedTlaSelected
          ? requestedTarget === "fused-tla-and-lexical-stem"
            ? `${tlaPrefix}-${reduplicatedStem}`
            : `${tlaPrefix}-${ordinarySourceStem}`
          : /^tla-/u.test(frequentativeSourceStem)
            ? `tla-${reduplicatedStem}`
            : reduplicatedStem;
        ruleFamily = fusedTlaSelected
          ? "frequentative-tla"
          : "frequentative-prefix-shape";
        // Prefixing changes the issued predicate, not the already selected
        // irregular cell. Re-entering it as a fresh regular Source loses
        // suppletion, tense and number (ca-h / ca-t / ye, for example).
        inheritedIrregularPrefixCoordinate = baseHasIrregularCoordinate;
        inheritedClassDPrefixCoordinate = baseHasClassDCoordinate;
        inheritedCompoundPrefixCoordinate = recursiveEmbedFrame?.operationFrame?.operation === "compound"
          && recursiveEmbedFrame.operationFrame.variant === "connective-t";
        if (inheritedCompoundPrefixCoordinate) {
          operationFacts.compoundCoordinateInherited = true;
        }
        if (inheritedClassDPrefixCoordinate) {
          // Prefixing an issued Class D predicate preserves its selected
          // short/long final vowel and perfective h. A new lexical admission
          // of the reduplicated spelling cannot supply that coordinate.
          const coordinateSourceStem = baseIsNonactive
            ? frequentativeSourceStem : sourceStem;
          conditionedPrefixTargetStem = targetStem.endsWith(coordinateSourceStem)
            ? targetStem.slice(0, -coordinateSourceStem.length)
              + text(baseTyped.slots?.predicate?.stem)
            : targetStem;
        }
        operationFacts = {
          reduplicationTarget: requestedTarget,
          shape,
          shapeFormula: shape === "short-glottal"
            ? "(C)+short vowel+h"
            : shape === "long"
              ? "(C)+long vowel"
              : "(C)+short vowel",
          copiedConsonant: reduplicationParts.consonant,
          copiedVowel,
          copiedPrefix,
          repetitions,
          lexicalShapeChoice: true,
          ...(inheritedCompoundPrefixCoordinate ? {
            compoundCoordinateInherited: true,
            sourceVoice: selectedBaseVoice,
            compoundSourceClosureFrame: recursiveEmbedFrame,
            inheritedCompoundPredicateSourceFrame: recursiveEmbedFrame.compoundPredicateSourceFrame,
          } : {}),
          ...(inheritedClassDPrefixCoordinate ? {
            classDCoordinateInherited: true,
            coordinateSelectedPredicateStem: conditionedPrefixTargetStem,
          } : {}),
          semanticScope: requestedScope,
          availableSemanticScopes: FREQUENTATIVE_SCOPES,
          patientScopeAvailable: sourceHasPatient,
          initialIAnalysis: sourceInitialISelection || "not-applicable",
          copiedInitialITreatment,
          supportiveIDeleted: deleteSupportiveI,
          sourceStemAfterSupportiveIDeletion: reduplicationParts.retainedStem,
          objectPronounReduplicated: fusedTlaSelected,
          lexicalStemAlsoReduplicated:
            requestedTarget === "fused-tla-and-lexical-stem",
          objectScope: fusedTlaSelected ? "nonspecific-nonhuman objects" : "unchanged",
          eventScope: requestedTarget === "fused-tla"
            ? "unchanged"
            : "frequentative event",
          independentObjectAndEventScopes:
            requestedTarget === "fused-tla-and-lexical-stem",
          ...(inheritedIrregularPrefixCoordinate ? {
            irregularCoordinateInherited: true,
            coordinateSelectedSourceStem: frequentativeSourceStem,
            sourceIrregularParadigmPlan: baseIrregularPlan,
            operationSequence: baseIsNonactive
              ? [selectedBaseVoice, "frequentative-prefix"]
              : ["irregular-finite-coordinate", "frequentative-prefix"],
          } : {}),
        };
        }
      } else if (variant === "destockal-lexicalized") {
        const lexicalized = parseCompletedLexicalizedDestockal(sourceStem);
        if (!lexicalized) {
          return blockedOperation(
            request,
            "completed-ca-or-tza-destockal-shape-required",
            "frequentative-destockal"
          );
        }
        const nonextantSourceLifecycleFrame =
          buildNonextantDestockalSourceLifecycleFrame(
            lexicalized.targetStem,
          );
        targetStem = baseIsNonactive
          ? frequentativeSourceStem
          : nonextantSourceLifecycleFrame?.derivation?.targetStem
            || lexicalized.targetStem;
        targetClass = nonextantSourceLifecycleFrame?.derivation?.targetClass
          || lexicalized.targetClass;
        targetValence = lexicalized.structuralForce === "intransitive"
          ? "intransitive"
          : text(request.sourceValence || request.valence || "specific-projective");
        ruleFamily = "frequentative-destockal";
        operationFacts = {
          lexicalizedDestockal: true,
          sourceHistory: nonextantSourceLifecycleFrame
            ? "nonextant-reconstructed-destockal-source"
            : "",
          nonextantSourceLifecycleFrame,
          openSourceShape: true,
          fusedStockVowelRemainsLong: Boolean(lexicalized.fusedLongVowel),
          fusedLongVowel: lexicalized.fusedLongVowel,
          tzAUnit: lexicalized.tzAUnit,
          semanticForce: lexicalized.structuralForce,
          licensedSemanticForces: lexicalized.tzAUnit
            ? ["causative", "applicative"]
            : ["intransitive"],
          contextualRoleSelection: Boolean(lexicalized.tzAUnit),
          nonactiveAppliedToFrequentativeStem: baseIsNonactive,
          canvasExamplesAreEvidenceOnly: true,
        };
      } else if (variant.startsWith("destockal-")) {
        const shape = "short";
        const parts = getReduplicationParts(sourceStem);
        const redup = `${parts.consonant}${shortVowel(parts.vowel)}`;
        const reduplicationPrefix = Array.from(
          { length: repetitions },
          () => redup
        ).join("-");
        if (variant === "destockal-intransitive") {
          const parsed = parseIntransitiveDestockal(sourceStem);
          if (!parsed) return blockedOperation(request, "ni-or-hui-destockal-source-required", "frequentative-destockal");
          const sourceAnalysisFrame = baseResult?.sourceAnalysisFrame || null;
          const fusedSourceAnalysis = resolveFusedStockSourceAnalysis(
            sourceAnalysisFrame,
            parsed,
          );
          const fusedReduplicationParts = fusedSourceAnalysis
            ? getReduplicationParts(fusedSourceAnalysis.analysis.root)
            : null;
          const fusedCopiedPrefix = fusedReduplicationParts
            ? `${fusedReduplicationParts.consonant}${shortVowel(
                fusedReduplicationParts.vowel,
              )}`
            : "";
          const fusedReduplicationPrefix = fusedCopiedPrefix
            ? Array.from(
                { length: repetitions },
                () => fusedCopiedPrefix,
              ).join("-")
            : "";
          const fusedStockFrequentativeFrame = fusedSourceAnalysis
            ? buildFusedStockFrequentativeFrame({
                sourceAgreementFrame,
                sourceAnalysisFrame,
                sourceAnalysis: fusedSourceAnalysis.analysis,
                sourceCoalescenceFrame:
                  fusedSourceAnalysis.sourceCoalescenceFrame,
                formationFamily: "intransitive-ca",
                replacedSuffix: fusedSourceAnalysis.analysis.stemFormative,
                targetSuffix: parsed.targetSuffix,
                reduplicativePrefix: fusedReduplicationPrefix,
                targetClass: "A",
              })
            : null;
          const activeFrequentativeStem =
            fusedStockFrequentativeFrame?.formation?.targetStem
            || `${reduplicationPrefix}-${parsed.targetCore}`;
          const selectedVoiceOperation = key(
            baseApplicationFrame?.controlFrame?.selectedVoiceOperation,
          );
          const selectedNonactiveOptionId = text(
            baseApplicationFrame?.controlFrame?.selectedNonactiveOptionId
            || request.nonactiveOptionId,
          );
          let nonactiveFormation = "active";
          if (baseIsNonactive) {
            if (selectedVoiceOperation === "tla-impersonal") {
              targetStem = `tla-${activeFrequentativeStem}`;
              nonactiveFormation = "tla-impersonal";
            } else if (/^o-hua:/u.test(selectedNonactiveOptionId)) {
              targetStem = activeFrequentativeStem.replace(/ca$/u, "c-o-hua");
              nonactiveFormation = "ca-to-c-o-hua";
            } else if (/^hua:/u.test(selectedNonactiveOptionId)) {
              targetStem = activeFrequentativeStem.replace(/ca$/u, "c-ō");
              nonactiveFormation = "ca-to-c-ō";
            } else if (selectedVoiceOperation === "inherent-impersonal") {
              targetStem = activeFrequentativeStem;
              nonactiveFormation = "inherent-impersonal";
            } else {
              return blockedOperation(
                request,
                "licensed-destockal-impersonal-formation-required",
                "frequentative-nonactive",
              );
            }
          } else {
            targetStem = activeFrequentativeStem;
          }
          targetClass = "A";
          targetValence = "intransitive";
          operationFacts = {
            shape,
            shapeFormula: "(C)+short vowel",
            reduplicationTarget: "lexical-stem",
            copiedConsonant: fusedReduplicationParts?.consonant
              || parts.consonant,
            copiedVowel: fusedReduplicationParts
              ? shortVowel(fusedReduplicationParts.vowel)
              : shortVowel(parts.vowel),
            copiedPrefix: fusedCopiedPrefix || redup,
            shortVowelReduplication: true,
            sourceDestockalSuffix: parsed.sourceSuffix,
            targetDestockalSuffix: parsed.targetSuffix,
            stockVowel: fusedSourceAnalysis?.analysis?.stockFormative
              || parsed.stockVowel,
            reducedStockVowel: fusedStockFrequentativeFrame
              ? fusedSourceAnalysis.analysis.stockFormative
              : parsed.reducedStockVowel,
            stockLongVowelReduced: fusedStockFrequentativeFrame
              ? false
              : parsed.stockVowel !== parsed.reducedStockVowel,
            fusedStockFrequentativeFrame,
            activeFrequentativeStem,
            nonactiveFormation,
            impersonalOnlyWhenNonactive: baseIsNonactive,
            targetClass: "A",
            perfectiveKeepsFinalA: true,
            repetitions,
            openSourceShape: true,
          };
        } else if ([
          "destockal-causative",
          "destockal-causative-force",
          "destockal-applicative-force",
        ].includes(variant)) {
          const completed = variant !== "destockal-causative"
            ? parseCompletedLexicalizedDestockal(sourceStem)
            : null;
          const completedTzA = completed?.tzAUnit ? completed : null;
          const parsed = completedTzA ? null : parseCausativeDestockal(sourceStem);
          if (!completedTzA && !parsed) return blockedOperation(
            request,
            variant === "destockal-causative"
              ? "destockal-causative-source-required"
              : "destockal-causative-or-completed-tza-source-required",
            "frequentative-destockal",
          );
          const fusedSourceCoalescenceFrame = parsed
            && doesCausativeMorphemicProfileMatch(
              sourceAgreementFrame,
              parsed,
            )
            ? buildTypedRootStockCoalescence(
                parsed.root,
                parsed.stockVowel,
                parsed.underlyingStemFormative,
              )
            : null;
          const causativeSourceAncestryFrame = parsed
            && !fusedSourceCoalescenceFrame
            ? resolveContractedCausativeSourceAncestry(
                sourceAgreementFrame,
                parsed,
              )
            : null;
          const effectiveFusedSourceCoalescenceFrame =
            fusedSourceCoalescenceFrame
            || causativeSourceAncestryFrame?.sourceCoalescenceFrame
            || null;
          const effectiveFusedRoot =
            causativeSourceAncestryFrame?.sourceAnalysis?.root
            || parsed?.root
            || "";
          const fusedReduplicationParts =
            effectiveFusedSourceCoalescenceFrame
            ? getReduplicationParts(effectiveFusedRoot)
            : null;
          const fusedCopiedPrefix = fusedReduplicationParts
            ? `${fusedReduplicationParts.consonant}${shortVowel(
                fusedReduplicationParts.vowel,
              )}`
            : "";
          const fusedReduplicationPrefix = fusedCopiedPrefix
            ? Array.from(
                { length: repetitions },
                () => fusedCopiedPrefix,
              ).join("-")
            : "";
          const fusedStockFrequentativeFrame =
            effectiveFusedSourceCoalescenceFrame
            ? buildFusedStockFrequentativeFrame({
                sourceAgreementFrame,
                sourceAnalysisFrame:
                  causativeSourceAncestryFrame?.sourceAnalysisFrame || null,
                sourceAnalysis:
                  causativeSourceAncestryFrame?.sourceAnalysis || null,
                sourceCoalescenceFrame:
                  effectiveFusedSourceCoalescenceFrame,
                causativeSourceAncestryFrame,
                formationFamily: "causative-tz-a",
                replacedSuffix: parsed.sourceSuffix,
                targetSuffix: parsed.targetSuffix,
                reduplicativePrefix: fusedReduplicationPrefix,
                targetClass: "B",
              })
            : null;
          targetStem = completedTzA
            ? completedTzA.targetStem
            : fusedStockFrequentativeFrame?.formation?.targetStem
              || `${reduplicationPrefix}-${parsed.targetCore}`;
          targetClass = "B";
          if (variant === "destockal-applicative-force") {
            targetValence = "specific-projective";
          }
          operationFacts = {
            shape,
            shapeFormula: "(C)+short vowel",
            reduplicationTarget: "lexical-stem",
            copiedConsonant: fusedReduplicationParts?.consonant
              || parts.consonant,
            copiedVowel: fusedReduplicationParts
              ? shortVowel(fusedReduplicationParts.vowel)
              : shortVowel(parts.vowel),
            copiedPrefix: fusedCopiedPrefix || redup,
            shortVowelReduplication: true,
            sourceDestockalSuffix: parsed?.sourceSuffix || "completed-tz-a",
            targetDestockalSuffix: parsed?.targetSuffix || completedTzA.tzAUnit,
            stockVowel: parsed?.stockVowel || completedTzA.fusedLongVowel,
            reducedStockVowel: fusedStockFrequentativeFrame
              ? parsed.stockVowel
              : parsed?.reducedStockVowel || completedTzA.fusedLongVowel,
            stockLongVowelReduced: fusedStockFrequentativeFrame
              ? false
              : parsed
                ? parsed.stockVowel !== parsed.reducedStockVowel
              : false,
            fusedStockFrequentativeFrame,
            activeFrequentativeStem: targetStem,
            retainedCausativeVowel: parsed?.retainedCausativeVowel || "a",
            semanticForce: variant === "destockal-applicative-force"
              ? "applicative"
              : "causative",
            contextualRoleSelected: completedTzA
              ? variant === "destockal-applicative-force"
                ? "applicative"
                : "causative"
              : "not-applicable",
            completedTzASource: Boolean(completedTzA),
            participantStructurePreserved: true,
            targetClass: "B",
            perfectiveDropsFinalA: true,
            repetitions,
            openSourceShape: true,
          };
        } else if (variant === "destockal-applicative") {
          if (!/(?:tz-a|tza)$/u.test(sourceStem)) return blockedOperation(request, "frequentative-destockal-tza-source-required", "frequentative-destockal");
          if (request.tlaFusion === true) return blockedOperation(request,
            "frequentative-destockal-applicative-tla-fusion-not-licensed", "frequentative-destockal");
          targetStem = sourceStem.replace(/(?:tz-a|tza)$/u, "ch-i-liā");
          targetClass = "C";
          targetValence = "specific-projective";
          const addedObjectKind = text(
            request.applicativeObjectKind || "nonspecific-human",
          );
          const addedObjectPerson = text(request.applicativeObjectPerson);
          const addedObjectFrame = buildCanonicalAddedObjectFrame({
            stem: targetStem,
            verbClass: targetClass,
            subject: request.subject,
            mood: request.mood,
            tense: request.tense,
            objectKind: addedObjectKind,
            objectPerson: addedObjectPerson,
            governor: "applicative",
            derivationalLevel: objectFramePositions(
              cloneObjectFrameFromTyped(baseTyped),
            ).length + 1,
          });
          if (!addedObjectFrame) return blockedOperation(
            request,
            "canonical-applicative-participant-required",
            "frequentative-destockal",
          );
          objectFrame = buildDerivedParticipantCluster(baseTyped, addedObjectFrame, request, targetStem);
          if (!objectFrame) return blockedOperation(request,
            "canonical-applicative-participant-history-required", "frequentative-destockal");
          operationFacts = {
            recursiveResultSource: true,
            sourceSuffix: sourceStem.match(/(?:tz-a|tza)$/u)?.[0] || "tz-a",
            replacementSuffix: "ch-i",
            addedApplicativeSuffix: "liā",
            derivationRole: "applicative",
            addedParticipant: {
              objectKind: addedObjectKind,
              objectPerson: addedObjectPerson,
            },
            priorObjectsPreserved: true,
            unsupportedTlaFusionRejected: true,
            targetClass: "C",
          };
        } else if (variant === "destockal-type-two") {
          const constitution = getFrequentativeDestockalConstitution(sourceStem);
          if (!constitution || targetClass !== "A" || objectFramePositions(cloneObjectFrameFromTyped(baseTyped)).length) {
            return blockedOperation(request, "frequentative-intransitive-destockal-constitution-required", "frequentative-destockal");
          }
          targetStem = sourceStem.replace(/ca$/u, "qui-l-tiā");
          if (targetStem === sourceStem) return blockedOperation(request, "frequentative-destockal-ca-source-required", "frequentative-destockal");
          targetClass = "C";
          targetValence = "specific-projective";
          const addedObjectKind = text(
            request.causativeObjectKind || "specific-projective",
          );
          const addedObjectPerson = text(
            request.causativeObjectPerson || "3sg",
          );
          const addedObjectFrame = buildCanonicalAddedObjectFrame({
            stem: targetStem,
            verbClass: targetClass,
            subject: request.subject,
            mood: request.mood,
            tense: request.tense,
            objectKind: addedObjectKind,
            objectPerson: addedObjectPerson,
            governor: "causative",
            derivationalLevel: objectFramePositions(
              cloneObjectFrameFromTyped(baseTyped),
            ).length + 1,
          });
          if (!addedObjectFrame) return blockedOperation(
            request,
            "canonical-causee-participant-required",
            "frequentative-destockal",
          );
          objectFrame = buildDerivedParticipantCluster(baseTyped, addedObjectFrame, request, targetStem);
          if (!objectFrame) return blockedOperation(request,
            "canonical-causee-participant-history-required", "frequentative-destockal");
          operationFacts = {
            recursiveResultSource: true,
            sourceSuffix: "ca",
            replacementSuffix: "qui-l-tiā",
            derivationRole: "rare-type-two-causative",
            lexicalLicenseSuppliedBySelectedAnalysis: true,
            frequentativeDestockalConstitution: constitution,
            addedParticipant: {
              objectKind: addedObjectKind,
              objectPerson: addedObjectPerson,
            },
            priorObjectsPreserved: true,
            targetClass: "C",
          };
        } else {
          return blockedOperation(request, "recognized-destockal-operation-required", "frequentative-destockal");
        }
        ruleFamily = "frequentative-destockal";
        operationFacts = Object.keys(operationFacts).length
          ? operationFacts
          : {
            shortVowelReduplication: true,
            stockLongVowelReduced: true,
            repetitions,
            semanticForce: "",
          };
      } else if ([
        "uncertain-ca",
        "uncertain-ca-causative",
        "uncertain-ca-applicative",
        "uncertain-ca-fused-tla",
        "uncertain-ca-applicative-growl",
        "uncertain-ca-fused-tla-bark",
      ].includes(variant)) {
        const requestedRole = variant === "uncertain-ca"
          ? "intransitive"
          : variant === "uncertain-ca-causative"
            ? "causative"
            : "applicative";
        const uncertain = deriveUncertainCaStem(sourceStem, requestedRole);
        const sourceHasObject = baseTyped.slots.prePredicate.some(slot =>
          ["monadic-valence", "dyadic-valence"].includes(slot.kind));
        if (!uncertain || sourceHasObject) {
          return blockedOperation(
            request,
            "open-uncertain-ca-root-shape-required",
            "frequentative-uncertain"
          );
        }
        targetStem = uncertain.targetStem;
        targetClass = text(targetObject.inferClassicalNahuatlLesson7ClassProfile?.(targetStem)?.classId) || "A";
        ruleFamily = "frequentative-uncertain";
        if (["uncertain-ca-applicative", "uncertain-ca-applicative-growl"].includes(variant)) {
          targetValence = "specific-projective";
          const addedObjectKind = text(
            request.applicativeObjectKind || request.objectKind || "specific-projective",
          );
          const addedObjectPerson = text(
            request.applicativeObjectPerson || request.objectPerson,
          );
          objectFrame = buildCanonicalAddedObjectFrame({
            stem: targetStem,
            verbClass: targetClass,
            subject: request.subject,
            mood: request.mood,
            tense: request.tense,
            objectKind: addedObjectKind,
            objectPerson: addedObjectPerson,
            governor: "applicative",
            derivationalLevel: 1,
          });
          objectFrame = objectFrame && buildDerivedParticipantCluster(baseTyped, objectFrame, request, targetStem);
          if (!objectFrame) return blockedOperation(
            request,
            "canonical-applicative-participant-required",
            "frequentative-uncertain",
          );
          operationFacts = {
            sourceAnalysis: "uncertain-ca",
            sourceRoot: uncertain.root,
            copiedPrefix: uncertain.copiedPrefix,
            targetSuffix: uncertain.suffix,
            derivationRole: "applicative",
            addedParticipant: {
              objectKind: addedObjectKind,
              objectPerson: addedObjectPerson,
            },
            openSourceShape: true,
            lexicalMeaningInferred: false,
          };
        } else if (["uncertain-ca-fused-tla", "uncertain-ca-fused-tla-bark"].includes(variant)) {
          if (request.applicativeObjectKind && request.applicativeObjectKind !== "nonspecific-nonhuman") {
            return blockedOperation(request, "tla-fusion-requires-nonspecific-nonhuman-object", "frequentative-uncertain");
          }
          const applicativeApplication = targetObject.evaluateClassicalNahuatlVncApplication({
            sourceStem: uncertain.targetStem, verbClass: targetClass,
            sourceValence: "projective-nonhuman", objectKind: "nonspecific-nonhuman",
            subject: request.subject, mood: request.mood, tense: request.tense,
            requestedVoice: "active",
          });
          const fusedMachinery = applicativeApplication?.authorizationStatus === "authorized"
            ? buildClassicalNahuatlVncTlaFusionContinuationMachinery(applicativeApplication.resultFrame.selectedMachineryFrame, { subject: request.subject, mood: request.mood, tense: request.tense })
            : null;
          if (!fusedMachinery) return blockedOperation(request,
            "canonical-uncertain-applicative-tla-fusion-required", "frequentative-uncertain");
          targetStem = fusedMachinery.operationFrame.operationFacts.tlaFusionRuleFrame.derivedStem;
          targetValence = "intransitive";
          objectFrame = { valenceArity: "vacant" };
          operationFacts = {
            sourceAnalysis: "uncertain-ca",
            sourceRoot: uncertain.root,
            copiedPrefix: uncertain.copiedPrefix,
            targetSuffix: uncertain.suffix,
            derivationRole: "applicative",
            fusedObjectPrefix: "tla",
            fusionLowersValence: true,
            tlaFusionRuleFrame: fusedMachinery.operationFrame.operationFacts.tlaFusionRuleFrame,
            consumedObject: fusedMachinery.operationFrame.operationFacts.consumedObject,
            openSourceShape: true,
            lexicalMeaningInferred: false,
          };
        } else {
          if (variant === "uncertain-ca-causative") {
            targetValence = "specific-projective";
            const addedObjectKind = text(
              request.causativeObjectKind || request.objectKind || "specific-projective",
            );
            const addedObjectPerson = text(
              request.causativeObjectPerson || request.objectPerson || "3sg",
            );
            objectFrame = buildCanonicalAddedObjectFrame({
              stem: targetStem,
              verbClass: targetClass,
              subject: request.subject,
              mood: request.mood,
              tense: request.tense,
              objectKind: addedObjectKind,
              objectPerson: addedObjectPerson,
              governor: "causative",
              derivationalLevel: 1,
            });
            objectFrame = objectFrame && buildDerivedParticipantCluster(baseTyped, objectFrame, request, targetStem);
            if (!objectFrame) return blockedOperation(
              request,
              "canonical-causee-participant-required",
              "frequentative-uncertain",
            );
          }
          operationFacts = {
            sourceAnalysis: "uncertain-ca",
            sourceRoot: uncertain.root,
            copiedPrefix: uncertain.copiedPrefix,
            targetSuffix: uncertain.suffix,
            derivationRole: requestedRole,
            openSourceShape: true,
            uncertainHistoryPreserved: true,
            lexicalMeaningInferred: false,
            canvasExamplesAreEvidenceOnly: true,
            assimilationAvailableFromStructure: /ch-tz-a$/u.test(targetStem),
          };
        }
      } else if (variant === "uncertain-tzca") {
        const sourceHasObject = Array.isArray(baseTyped.slots?.prePredicate)
          && baseTyped.slots.prePredicate.some(slot => (
            ["monadic-valence", "dyadic-valence"].includes(slot?.kind)
          ));
        const uncertainTzca = deriveUncertainTzcaStem(sourceStem);
        if (!uncertainTzca || sourceHasObject) {
          return blockedOperation(
            request,
            sourceHasObject
              ? "intransitive-uncertain-tzca-source-required"
              : "replaceable-final-source-syllable-required",
            "frequentative-uncertain"
          );
        }
        targetStem = uncertainTzca.targetStem;
        targetClass = "A";
        targetValence = "intransitive";
        ruleFamily = "frequentative-uncertain";
        operationFacts = {
          sourceAnalysis: "uncertain-tzca-frequentative",
          openSourceShape: true,
          retainedSource: uncertainTzca.retainedSource,
          replacedSourceSyllable: uncertainTzca.replacedSyllable,
          replacement: uncertainTzca.replacement,
          copiedPrefix: uncertainTzca.copiedPrefix,
          uncertainHistoryPreserved: true,
          completedTzcaResultAvailableForContinuation: true,
          unreduplicatedTzcaIsDifferentSourceAnalysis: true,
          transitiveTzcaIsDifferentFormation: true,
          lexicalMeaningInferred: false,
          canvasExamplesAreEvidenceOnly: true,
        };
      } else {
        return blockedOperation(request, "recognized-frequentative-variant-required", "frequentative-prefix-shape");
      }
    } else if (operation === "compound") {
      const recursiveMatrixFrame = isAuthorizedClosureFrame(
        internalContext.recursiveMatrixClosureFrame
      )
        ? internalContext.recursiveMatrixClosureFrame
        : null;
      const recursiveHierarchy = analyzeRecursiveCompoundHierarchy(
        recursiveEmbedFrame,
        recursiveMatrixFrame
      );
      if (recursiveHierarchy.authorizationStatus !== "authorized") {
        return blockedOperation(
          request,
          recursiveHierarchy.blockReason,
          "compound-recursion"
        );
      }
      const requestedMatrixStem = text(
        recursiveMatrixFrame?.operationFrame?.targetStem
        || internalContext.nominalMatrixProjection?.sourceStem
        || request.compoundMatrixStem
        || request.matrixStem
      );
      const reflexiveMatrixAnalysis = variant === "reflexive-matrix"
        ? normalizeReflexiveMatrixAnalysis(requestedMatrixStem)
        : null;
      const matrixStem = reflexiveMatrixAnalysis?.canonicalStem
        || requestedMatrixStem;
      const futureMatrixAnalysis = variant === "future-embed"
        ? analyzeFutureEmbedMatrix(matrixStem)
        : null;
      if (variant === "future-embed" && !futureMatrixAnalysis) {
        return blockedOperation(
          request,
          "future-embed-matrix-analysis-must-be-nequi-or-qui",
          "compound-future-embed",
        );
      }
      const reflexiveMatrixSubject = text(request.subject || "3sg");
      const reflexiveMatrixSubjectAnimacy = /^[12]/u.test(
        reflexiveMatrixSubject
      )
        ? "animate"
        : key(request.compoundSubjectAnimacy || "nonanimate");
      const matrixTyped = recursiveMatrixFrame?.finalTypedVncSlotFrame
        || getBaseTypedFrame(internalContext.matrixApplicationFrame);
      const matrixPredicateStem = text(
        recursiveMatrixFrame?.operationFrame?.targetStem
        || matrixTyped?.slots?.predicate?.stem
        || matrixStem
      );
      const realizedMatrixStem = matrixStem === "ya-uh"
        && matrixPredicateStem === "ya-uh"
        ? "uh"
        : matrixStem === "o"
          ? matrixPredicateStem.replace(/^on-/u, "")
          : matrixPredicateStem;
      if (!matrixStem) {
        return blockedOperation(request, "typed-compound-matrix-required", "compound-matrix-analysis");
      }
      // The embedded Source keeps its predicate and object positions.
      // Its subject is deleted; the finite compound uses the matrix dyad (§28.2).
      personDyad = matrixTyped?.slots?.subject;
      const selectedEventOrder = key(request.compoundEventOrder || "iconic");
      if (!["iconic", "hysteron-proteron"].includes(selectedEventOrder)) {
        return blockedOperation(
          request,
          "licensed-compound-event-order-required",
          "compound-event-order"
        );
      }
      const selectedItzSense = key(request.compoundItzSense);
      const reversedEventOrderLicensed = selectedEventOrder === "hysteron-proteron"
        || matrixStem === "huetzi"
        || matrixStem === "ahci"
        || (
          matrixStem === "ē-hua"
          && sourceStem === "itz"
          && selectedItzSense === "motion"
        );
      if (matrixStem === "ē-hua"
        && request.compoundMatrixClass
        && !["A", "B"].includes(text(request.compoundMatrixClass).toUpperCase())) {
        return blockedOperation(
          request,
          "e-hua-matrix-requires-licensed-a-or-b-class-history",
          "compound-matrix-analysis"
        );
      }
      if (key(request.compoundNonactiveScope) === "matrix"
        && ["passive", "impersonal", "tla-impersonal"].includes(key(
          baseApplicationFrame?.controlFrame?.selectedVoiceOperation
        ))) {
        return blockedOperation(request,
          "compound-matrix-only-cannot-remove-retained-nonactive-embed",
          "compound-nonactive");
      }
      const canonicalMatrixApplication = Boolean(
        typeof targetObject.isClassicalNahuatlVncApplicationFrame === "function"
        && targetObject.isClassicalNahuatlVncApplicationFrame(
          internalContext.matrixApplicationFrame
        )
        && internalContext.matrixApplicationFrame?.authorizationStatus === "authorized"
      );
      if ((!canonicalMatrixApplication && !recursiveMatrixFrame)
        || !matrixTyped) {
        return blockedOperation(
          request,
          internalContext.matrixApplicationFrame?.blockReason === "classical-vnc-nonactive-formation-option-selection-required"
            ? "compound-matrix-nonactive-formation-option-selection-required"
            : internalContext.matrixApplicationFrame?.blockReason
              || "authorized-matrix-coordinate-required",
          "compound-matrix-analysis"
        );
      }
      if (["matrix", "both"].includes(key(request.compoundNonactiveScope))
        && internalContext.matrixApplicationFrame?.controlFrame?.selectedVoiceOperation === "tla-impersonal") {
        return blockedOperation(request, "compound-tla-impersonal-must-be-on-embed", "compound-nonactive");
      }
      const matrixCoordinateStem = recursiveMatrixFrame
        ? recursiveMatrixFrame.operationFrame?.targetStem
        : internalContext.matrixApplicationFrame?.normalizedRequest?.sourceStem;
      const matrixCoordinateSubject = recursiveMatrixFrame
        ? recursiveMatrixFrame.normalizedRequest?.subject
        : internalContext.matrixApplicationFrame?.normalizedRequest?.subject;
      const expectedMatrixCoordinateStem = variant === "future-embed"
        ? futureMatrixAnalysis.lexicalStem
        : matrixStem === "ca"
          ? "ye"
          : matrixStem === "o"
            ? "on-o"
            : matrixStem;
      if (text(matrixCoordinateStem) !== expectedMatrixCoordinateStem
        || text(matrixCoordinateSubject) !== text(request.subject || "3sg")) {
        return blockedOperation(request, "typed-matrix-request-continuity-required", "compound-matrix-analysis");
      }
      targetClass = text(
        recursiveMatrixFrame?.operationFrame?.targetClass
        // The finite owner resolves lexical/suppletive class facts before
        // the compound inherits them; a raw request may retain its default.
        || internalContext.matrixApplicationFrame?.normalizedRequest?.targetClass
        || internalContext.matrixApplicationFrame?.normalizedRequest?.verbClass
        || internalContext.derivedMatrixClass
        || deriveCompoundMatrixClass(matrixStem)
      ).toUpperCase();
      const requestedNonactiveScope = key(
        request.compoundNonactiveScope || "none"
      );
      const requestedCompoundVoice = key(
        request.requestedVoice || request.voice || "active"
      );
      const selectedEmbedVoiceOperation = key(
        baseApplicationFrame?.controlFrame?.selectedVoiceOperation
        || baseApplicationFrame?.controlFrame?.selectedVoice
        || request.nonactiveOptionId
        || requestedCompoundVoice
      );
      if (requestedCompoundVoice === "active"
        && requestedNonactiveScope !== "none") {
        return blockedOperation(
          request,
          "compound-nonactive-scope-requires-nonactive-voice",
          "compound-nonactive"
        );
      }
      if (requestedCompoundVoice === "passive"
        && !["embed", "both"].includes(requestedNonactiveScope)) {
        return blockedOperation(
          request,
          "compound-passive-scope-must-be-embed-or-both",
          "compound-nonactive"
        );
      }
      if (requestedCompoundVoice === "impersonal"
        && !["embed", "matrix", "both"].includes(requestedNonactiveScope)) {
        return blockedOperation(
          request,
          "compound-impersonal-scope-must-be-embed-matrix-or-both",
          "compound-nonactive"
        );
      }
      if (baseApplicationFrame?.controlFrame?.selectedVoiceOperation === "tla-impersonal"
        && !["embed", "both"].includes(requestedNonactiveScope)) {
        return blockedOperation(request, "tla-impersonal-must-remain-on-embed", "compound-nonactive");
      }
      if (variant === "future-embed"
        && ["matrix", "both"].includes(key(request.compoundNonactiveScope))) {
        return blockedOperation(
          request,
          "future-embed-nonactive-is-embed-only",
          "compound-nonactive"
        );
      }
      const caSuppletiveEmbed = baseHasIrregularCoordinate
        && baseIrregularPlan.identity?.lexemeId === "be-suppletive";
      const ordinaryPerfective = caSuppletiveEmbed ? "ye" : ({
        ca: "ye",
        "ya-uh": "yah",
        "itt-a": "itz",
        itz: "itz"
      }[sourceStem] || perfectiveStemFromMachinery(baseMachinery) || sourceStem);
      let compoundEmbedAllomorphFrame = null;
      if (request.compoundEmbedAllomorphSourceClosureFrame) {
        const lexicalSource = request.compoundEmbedAllomorphSourceClosureFrame;
        const lexicalOperation = lexicalSource.operationFrame;
        const lexicalAnalysis = lexicalOperation?.operationFacts?.honorificFormationAnalysisFrame;
        const record = HONORIFIC_DOCUMENTED_LEXICAL_REALIZATIONS[lexicalOperation?.sourceStem]
          ?.[lexicalOperation?.variant]?.[lexicalAnalysis?.selectedOptionId];
        if (!isClassicalNahuatlClosureFrame(lexicalSource)
          || lexicalSource.authorizationStatus !== "authorized"
          || lexicalOperation.operation !== "honorific"
          || lexicalOperation.variant !== "causative"
          || lexicalAnalysis?.documentedLexicalRealizationUsed !== true
          || !record?.compoundPerfectiveAllomorph
          || record.targetStem !== lexicalOperation.targetStem
          || sourceStem !== lexicalOperation.targetStem
          || baseResult?.sourceMachineryFrame !== lexicalSource.selectedMachineryFrame
          || variant !== "connective-t") {
          return blockedOperation(request, "exact-documented-compound-embed-allomorph-source-required", "compound-irregular-embed");
        }
        compoundEmbedAllomorphFrame = freeze({
          kind: "classical-nahuatl-compound-embed-lexical-perfective-allomorph-frame",
          authorizationStatus: "authorized",
          sourceClosureFrame: lexicalSource,
          sourceMachineryFrame: lexicalSource.selectedMachineryFrame,
          imperfectiveStem: record.targetStem,
          ordinaryPerfectiveStem: ordinaryPerfective,
          selectedPerfectiveStem: record.compoundPerfectiveAllomorph,
          realizationKind: "documented-irregular-compound-perfective",
          productiveShorteningRule: false,
          formulaStringAuthority: false,
          surfaceStringAuthority: false,
        });
      }
      const perfective = compoundEmbedAllomorphFrame?.selectedPerfectiveStem || ordinaryPerfective;
      const sharedEmbedObjectFrame = variant === "shared-object"
        ? cloneObjectFrameFromTyped(baseTyped)
        : null;
      const sharedMatrixObjectFrame = variant === "shared-object"
        ? cloneObjectFrameFromTyped(matrixTyped)
        : null;
      const sharedObjectCoreferenceVerified = variant === "shared-object"
        && sharedEmbedObjectFrame?.valenceArity !== "vacant"
        && sharedMatrixObjectFrame?.valenceArity !== "vacant"
        && objectFrameReferentSignature(sharedEmbedObjectFrame)
          === objectFrameReferentSignature(sharedMatrixObjectFrame);
      if (sourceStem === "cac"
        && request.compoundSubjectAnimacy
        && key(request.compoundSubjectAnimacy) !== "nonanimate") {
        return blockedOperation(request, "cac-embed-requires-nonanimate-subject", "compound-irregular-embed");
      }
      if (sourceStem === "itz"
        && !["observational", "motion"].includes(selectedItzSense)) {
        return blockedOperation(
          request,
          "typed-itz-embed-sense-required",
          "compound-irregular-embed"
        );
      }
      if (variant === "shared-object"
        && sharedEmbedObjectFrame.valenceArity === "vacant") {
        return blockedOperation(
          request,
          "shared-object-coreferential-embed-object-required",
          "compound-shared-object"
        );
      }
      if (variant === "shared-object" && !sharedObjectCoreferenceVerified) {
        return blockedOperation(
          request,
          "shared-object-embed-matrix-coreference-required",
          "compound-shared-object"
        );
      }
      const compoundEmbedObjects = cloneObjectFrameFromTyped(baseTyped);
      const carryingEmbedRequiresOldHuītz = sourceStem === "itqui"
        && compoundEmbedObjects.valenceArity !== "vacant"
        || sourceStem === "huīca" && objectFramePositions(compoundEmbedObjects).some(
          position => ["nonspecific-nonhuman", "projective-nonhuman"].includes(
            key(position.objectKind)
          ) || text(position.va) === "tla"
        );
      if (variant === "connective-t" && matrixStem === "huī-tz"
        && carryingEmbedRequiresOldHuītz) {
        return blockedOperation(
          request,
          "carrying-embed-requires-connectiveless-huītz",
          "compound-irregular-embed"
        );
      }
      if (variant === "huītz-carry") {
        if (matrixStem !== "huī-tz") {
          return blockedOperation(
            request,
            "huītz-carry-requires-typed-huītz-matrix-analysis",
            "compound-irregular-embed"
          );
        }
        const carryObjectFrame = cloneObjectFrameFromTyped(baseTyped);
        if (carryObjectFrame.valenceArity === "vacant") {
          return blockedOperation(
            request,
            "huītz-carry-requires-typed-carry-object",
            "compound-irregular-embed"
          );
        }
        const carryEmbedStem = carryEmbedStemForHuītz(
          sourceStem,
          baseApplicationFrame?.normalizedRequest?.sourceInitialIAnalysis?.resolvedKind
            || request.sourceInitialISelection
        );
        if (!carryEmbedStem) {
          return blockedOperation(
            request,
            "typed-carry-source-required",
            "compound-irregular-embed"
          );
        }
        targetStem = `${carryEmbedStem}-tz`;
        predicateTns = matrixTyped?.slots?.predicate?.tns;
        numberDyad = matrixTyped?.slots?.number;
        ruleFamily = "compound-irregular-embed";
        operationFacts = {
          oldConnectivelessHuītzFormation: true,
          prohibitedConnectiveT: true,
          carryLexicalAnalysisSelected: true,
          carrySourceStem: sourceStem,
          carryEmbedStem,
          carryMatrixPerfectiveStem: "itz",
          carryVisibleMatrixShape: "tz",
          carryObjectKind: text(request.sourceValence || request.valence),
          carryObjectPerson: text(request.objectPerson),
          openTypedCarrySourceAdmission: true,
          carrySourceStemWhitelistUsed: false,
          specialCarryStemDerivedFromShape: true
        };
      } else if (variant === "connective-t" || variant === "reflexive-matrix" || variant === "shared-object" || variant === "accompanying-possession") {
        const syncopatedYa = request.compoundYaSyncopation === true;
        if (syncopatedYa && !/^(?:yā|ya|yah)$/u.test(realizedMatrixStem)) {
          return blockedOperation(
            request,
            "syncopated-ta-requires-ya-matrix-shape",
            "compound-connective-t"
          );
        }
        const connector = syncopatedYa
          ? "t"
          : connectiveFor(realizedMatrixStem);
        const matrixRealization = syncopatedYa
          ? realizedMatrixStem === "yah" ? "ah" : "ā"
          : realizedMatrixStem;
        targetStem = `${perfective}-${connector}-${matrixRealization}`;
        predicateTns = matrixTyped?.slots?.predicate?.tns;
        numberDyad = matrixTyped?.slots?.number;
        ruleFamily = variant === "reflexive-matrix"
          ? "compound-reflexive-matrix"
          : variant === "shared-object"
            ? "compound-shared-object"
            : variant === "accompanying-possession"
              ? "compound-supplement"
              : "compound-connective-t";
        if (variant === "reflexive-matrix"
          && matrixStem === "m-o-man-a"
          && reflexiveMatrixSubjectAnimacy === "animate"
          && !/pl$/u.test(reflexiveMatrixSubject)) {
          return blockedOperation(request, "mo-mana-animate-subject-must-be-plural", ruleFamily);
        }
        if (variant === "accompanying-possession") {
          if (!caSuppletiveEmbed || perfective !== "ye") {
            return blockedOperation(request, "accompanying-possession-requires-ca-to-ye-embed", ruleFamily);
          }
          const supplementFrame = internalContext.possessiveSupplementFrame;
          if (supplementFrame?.kind
              !== "classical-nahuatl-accompanying-possession-accompanying-possession-supplement-frame"
            || supplementFrame.authorizationStatus !== "authorized"
            || !targetObject.isClassicalNahuatlNncSlotFrame?.(
              supplementFrame.nncSlotFrame
            )) {
            return blockedOperation(
              request,
              supplementFrame?.blockReason || "typed-possessive-supplement-required",
              ruleFamily
            );
          }
          operationFacts = {
            supplementarySubjectFrame: supplementFrame
          };
        }
      } else if (variant === "future-embed") {
        const futureSupplementationFrame =
          internalContext.futureSupplementationFrame || null;
        const futureSupplementationAuthorized = Boolean(
          targetObject.isClassicalNahuatlSupplementationFrame?.(
            futureSupplementationFrame,
          )
          && futureSupplementationFrame.authorizationStatus === "authorized"
          && futureSupplementationFrame.referenceFrame?.referenceMode
            === "included"
          && futureSupplementationFrame.referenceFrame?.headRole === "object"
          && futureSupplementationFrame.supplementClause?.unitKind === "vnc"
          && futureSupplementationFrame.supplementClause?.tense === "future"
          && futureSupplementationFrame.operationFrames?.some?.(
            frame => frame.kind
              === "classical-nahuatl-supplementation-coreferential-future-frame"
              && frame.authorizationStatus === "authorized",
          )
        );
        if (!futureSupplementationAuthorized) {
          return blockedOperation(
            request,
            futureSupplementationFrame?.blockReason
              || "owner-issued-future-supplementary-object-required",
            "compound-future-embed",
          );
        }
        if (futureMatrixAnalysis.lexicalStem === "qui"
          && key(request.tense) !== "imperfect") {
          return blockedOperation(
            request,
            "tla-qui-matrix-is-imperfect-only",
            "compound-future-embed",
          );
        }
        const typedFuturePredicateStem = text(
          baseTyped?.slots?.predicate?.stem || sourceStem,
        );
        const futurePredicateStem = futureEmbedStem(
          typedFuturePredicateStem,
          text(
            baseApplicationFrame?.normalizedRequest?.verbClass
            || request.verbClass
            || "B",
          ),
          request.subject,
        );
        const integratedMatrixStem = futureMatrixAnalysis.lexicalStem;
        targetStem = `${futurePredicateStem}-z-${integratedMatrixStem}`;
        predicateTns = matrixTyped?.slots?.predicate?.tns;
        numberDyad = matrixTyped?.slots?.number;
        ruleFamily = "compound-future-embed";
        operationFacts = {
          futureSupplementationFrame,
          futureSupplementationAuthorized,
          futureSupplementSourceKind: "owner-issued-future-vnc-result",
          futureSupplementFunctionsAsObject: true,
          matrixObjectReplacedByFuturePredicate: true,
          matrixObjectCarrierSuppressed: true,
          futureEmbedPredicateStem: futurePredicateStem,
          futureEmbedTense: "future",
          futureEmbedTenseMorph: "z",
          futureEmbedValence: text(
            request.sourceValence || request.valence || "intransitive",
          ),
          futureEmbedMayBeIntransitiveOrTransitive: true,
          futureEmbedActionAfterMatrixAction: true,
          futureMatrixAnalysisId: futureMatrixAnalysis.analysisId,
          futureMatrixLexicalStem: futureMatrixAnalysis.lexicalStem,
          futureMatrixConstructionStem:
            futureMatrixAnalysis.canonicalConstructionStem,
          futureMatrixReading: futureMatrixAnalysis.reading,
          futureMatrixAnalysisIsUserChoice: true,
          futureMatrixInventoryIsConstructionalNotSourceWhitelist: true,
          futureMatrixStemWhitelistUsed: false,
          quiMatrixAnomalous: futureMatrixAnalysis.lexicalStem === "qui",
          quiMatrixImperfectOnly: futureMatrixAnalysis.lexicalStem === "qui",
          traditionalConditionalIsReadingNotTense:
            futureMatrixAnalysis.lexicalStem === "qui",
          principalAndSupplementSubjectsCoreferential:
            futureSupplementationFrame.principalClause?.subject?.referenceId
              === futureSupplementationFrame.supplementClause?.subject
                ?.referenceId,
          includedReferentSupplementationAvailable:
            futureMatrixAnalysis.lexicalStem === "qui",
          antecessiveOrderAvailable:
            futureMatrixAnalysis.lexicalStem === "qui"
            && key(request.tense) === "imperfect",
          antecessiveOrderRequested: Boolean(
            request.sentenceAntecessive === true
            || request.antecessive === true
            || request.requestedPrefixStackMode === "antecessive"
            || request.prefixStackMode === "antecessive",
          ),
          antecessiveScopesFiniteMatrixTense: true,
        };
      } else {
        return blockedOperation(request, "recognized-lesson28-compound-variant-required", "compound-structure");
      }
      operationFacts = {
        ...operationFacts,
        compoundType: variant === "future-embed" ? "integrated" : "linked",
        linkage: variant === "future-embed"
          ? "integrated-future-object"
          : variant === "huītz-carry"
            ? "linked-connectiveless"
            : "linked-connective-t",
        embedSourceValence: text(
          request.sourceValence || request.valence || "intransitive"
        ),
        matrixSourceValence: variant === "shared-object"
          || variant === "future-embed"
          ? "transitive"
          : variant === "reflexive-matrix"
            ? "transitive-reflexive-core"
            : text(
              recursiveMatrixFrame?.operationFrame?.targetValence
              || internalContext.matrixApplicationFrame?.normalizedRequest?.sourceValence
              || "intransitive"
            ),
        matrixFiniteApplicationValence: text(
          recursiveMatrixFrame?.operationFrame?.targetValence
          || internalContext.matrixApplicationFrame?.normalizedRequest?.sourceValence
          || "intransitive"
        ),
        nominalMatrixResultFrame: internalContext.nominalMatrixResult || null,
        nominalMatrixSourceProjection: internalContext.nominalMatrixProjection || null,
        matrixApplicationFrame: internalContext.matrixApplicationFrame || null,
        constructionEmbedClassFrame: internalContext.constructionEmbedClassFrame || null,
        binaryConstituentCount: 2,
        binaryCompoundStructure: true,
        sourceClauseRelationshipsPreserved: true,
        syntaxDowngradedToMorphology: true,
        principalSubjectFromMatrix: true,
        embedSubjectReferencePreserved: true,
        embedNeverFunctionsAsSubject: true,
        licensedEmbedFunctions: freeze([
          "incorporated-object",
          "incorporated-possessor",
          "incorporated-modifier",
          "incorporated-complement"
        ]),
        compoundOutputCategory: "VNC",
        typedMatrixAnalysisRequired: true,
        openTypedMatrixAdmission: true,
        canvasExamplesAreEvidenceOnly: true,
        supportedEmbedMatrixValencePatterns: freeze([
          "intransitive+intransitive",
          "transitive+intransitive",
          "intransitive+transitive",
          "transitive+transitive"
        ]),
        embedDeterminesCompoundValence: true,
        matrixDeterminesCompoundType: true,
        sourcePredicatePreserved: true,
        embedSubjectDeleted: true,
        matrixAfterEmbed: true,
        embedStem: variant === "future-embed"
          ? operationFacts.futureEmbedPredicateStem
          : perfective,
        connective: variant === "future-embed"
          ? ""
          : variant === "huītz-carry"
            ? ""
            : request.compoundYaSyncopation === true
              ? "t"
              : connectiveFor(realizedMatrixStem),
        matrixStem: realizedMatrixStem,
        matrixSelectionStem: matrixStem,
        matrixSuppliedStem: requestedMatrixStem,
        reflexiveMatrixCore: reflexiveMatrixAnalysis?.coreStem || "",
        typedReflexiveMatrixRole:
          variant === "reflexive-matrix" ? "reflexive-matrix-core" : "",
        fixedReflexiveCarrier:
          reflexiveMatrixAnalysis?.fusedReflexiveCarrier || "",
        fixedReflexiveCarrierDerived:
          variant === "reflexive-matrix",
        fixedReflexiveCarrierRegardlessOfSubject:
          variant === "reflexive-matrix",
        suppliedPersonMarkedReflexiveCarrierReplaced:
          reflexiveMatrixAnalysis?.suppliedCarrierReplaced === true,
        matrixTransitivityDischargedOntoFusedReflexive:
          variant === "reflexive-matrix",
        reflexiveCoreStructurallyIntransitiveInCompound:
          variant === "reflexive-matrix",
        reflexiveMatrixIntroducesNoNewParticipant:
          variant === "reflexive-matrix",
        reflexiveMatrixSubjectCoreference:
          variant === "reflexive-matrix",
        reflexiveMatrixExamplesNonexhaustive:
          variant === "reflexive-matrix",
        reflexiveMatrixStemWhitelistUsed: false,
        reflexiveMatrixSubjectAnimacy:
          variant === "reflexive-matrix"
            ? reflexiveMatrixSubjectAnimacy
            : "",
        moManaAnimateSubjectMustBePlural:
          variant === "reflexive-matrix" && matrixStem === "m-o-man-a",
        moManaSubjectNumberDerivedFromFiniteSubject:
          variant === "reflexive-matrix" && matrixStem === "m-o-man-a",
        matrixFiniteStem: variant === "huītz-carry"
          ? "tz"
          : realizedMatrixStem,
        matrixFiniteMood: key(request.mood || "indicative"),
        matrixFiniteTense: key(request.tense || "present"),
        matrixFiniteSubject: text(request.subject || "3sg"),
        matrixFiniteNumberMorph: text(matrixTyped?.slots?.number?.num2),
        matrixConstruction: variant === "future-embed"
          ? operationFacts.futureMatrixAnalysisId
          : ({
          ca: "progressive-or-continuative-ca",
          nemi: "continuative-nemi",
          "ya-uh": "departure-ya-uh",
          "huāl-la-uh": "hither-coming-huāl-la-uh",
          "huī-tz": variant === "huītz-carry"
            ? "typed-carry-connectiveless-huītz"
            : "coming-huī-tz",
          ahci: "arrival-ahci",
          mani: "area-or-group-stance-mani",
          ihca: "standing-state-ihca",
          o: "recumbent-state-o",
          "ē-hua": "beginning-or-rapid-departure-ē-hua",
          quiza: "rapid-or-abrupt-quiza",
          huetzi: "falling-or-rapid-abrupt-huetzi",
          tlehcō: "ascending-tlehcō",
          "cal-aqui": "entering-cal-aqui",
          "pil-ca": "suspended-state-pil-ca",
          "m-o-cāhua": "reflexive-stop-or-result-state-cāhua",
          "m-o-tēca": "reflexive-settle-begin-or-recumbent-tēca",
          "m-o-tlāl-i-ā": "reflexive-sit-settle-or-begin-tlāl-i-ā",
          "m-o-man-a": "reflexive-gradual-or-standing-man-a",
          "m-o-quetza": "reflexive-gradual-quetza"
        })[matrixStem === "quīza" ? "quiza" : matrixStem] || "open-typed-intransitive-matrix",
        matrixReadingOptions: freeze(
          variant === "shared-object"
            ? SHARED_OBJECT_MATRIX_READINGS[matrixStem] || []
            : REFLEXIVE_MATRIX_READINGS[matrixStem] || ({
          ca: ["be-in-the-act-of", "remain-engaged-in-begun-event"],
          nemi: ["go-along-doing", "spend-time-doing", "continue-doing"],
          "ya-uh": ["go-away-doing", "go-doing", "do-and-leave"],
          "huāl-la-uh": ["come-while-doing", "come-along-doing"],
          "huī-tz": variant === "huītz-carry"
            ? ["come-carrying", "go-carrying"]
            : ["come-doing", "come-in-a-state"],
          ahci: ["arrive-doing", "arrive-in-a-state"],
          mani: [
            "go-along-happening", "happen-all-around-an-area",
            "extend-over-an-area-in-a-state", "stand-as-a-group-doing"
          ],
          ihca: ["stand-doing", "stand-in-a-state", "result-state-standing"],
          o: [
            "lie-stretched-out-doing", "lie-stretched-out-in-a-state",
            "lie-broken", "be-recumbent"
          ],
          "ē-hua": [
            "move-or-start-into-action", "begin-doing", "do-quickly",
            "get-up-and-go-away", "leave-and-depart"
          ],
          quiza: [
            "do-quickly", "do-abruptly", "burst-forth",
            "leave-abruptly", "snatch"
          ],
          huetzi: [
            "do-quickly", "do-abruptly", "fall", "plunge",
            "snatch", "die-and-fall", "fall-and-then-die",
            "die-from-a-fall", "die-suddenly"
          ],
          tlehcō: ["ascend", "climb-up-at-a-run"],
          "cal-aqui": [
            "house-enter", "enter", "enter-at-a-run", "enter-swiftly"
          ],
          "pil-ca": [
            "hang", "be-suspended", "sleep-with-head-hanging-down"
          ]
        })[matrixStem === "quīza" ? "quiza" : matrixStem] || []),
        sharedObjectCompositionSelected: variant === "shared-object",
        sharedObjectEmbedAndMatrixTransitive: variant === "shared-object",
        sharedObjectCoreferenceVerified,
        sharedObjectKind: variant === "shared-object"
          ? text(request.objectKind || request.sourceValence)
          : "",
        sharedObjectPerson: variant === "shared-object"
          ? text(request.objectPerson)
          : "",
        sharedObjectNumber: variant === "shared-object"
          ? text(request.objectNumber)
          : "",
        sharedObjectManifestationCount: variant === "shared-object" ? 1 : 0,
        sharedObjectCarrierSite: variant === "shared-object" ? "embed" : "",
        matrixSharedObjectCarrierSuppressed: variant === "shared-object",
        sharedObjectReflexiveOrProjectivePreserved:
          variant === "shared-object",
        sharedObjectOtherParticipantsRemainDistinct:
          variant === "shared-object",
        sharedObjectReferentChoiceRequired: variant === "shared-object"
          && objectFramePositions(sharedEmbedObjectFrame).length > 1,
        sharedObjectReferentResolvedByTypedSource: variant === "shared-object"
          && objectFramePositions(sharedEmbedObjectFrame).length === 1,
        sharedObjectExamplesNonexhaustive: variant === "shared-object",
        sharedObjectMatrixStemWhitelistUsed: false,
        sharedObjectEHuaClassAEmbedAutomatic: variant === "shared-object"
          && sourceStem === "ē-hua",
        sharedObjectEmbedClass: variant === "shared-object"
          && sourceStem === "ē-hua"
          ? text(baseApplicationFrame?.normalizedRequest?.verbClass).toUpperCase()
          : "",
        sharedObjectPluralAllowsDistributiveReading: variant === "shared-object"
          && /pl$/u.test(text(request.objectPerson || request.objectNumber)),
        matrixSemanticDomain: ({
          "huāl-la-uh": "directed-coming",
          "huī-tz": variant === "huītz-carry"
            ? "typed-carry-motion"
            : "coming",
          ahci: "arrival",
          mani: "area-or-group-stance",
          ihca: "standing-state",
          o: "recumbent-state",
          "ē-hua": "beginning-or-rapid-departure",
          quiza: "rapid-or-abrupt-motion",
          huetzi: "falling-or-sudden-motion",
          tlehcō: "ascent",
          "cal-aqui": "entering",
          "pil-ca": "suspended-state",
          "m-o-cāhua": "stopping-or-result-state",
          "m-o-tēca": "settling-beginning-or-recumbent-state",
          "m-o-tlāl-i-ā": "sitting-settling-or-beginning",
          "m-o-man-a": "gradual-change-or-standing-position",
          "m-o-quetza": "gradual-development"
        })[matrixStem === "quīza" ? "quiza" : matrixStem] || "",
        oLocativeOnOmitted: matrixStem === "o",
        omittedMatrixLocative: matrixStem === "o" ? "on" : "",
        matrixLocativeRealization: matrixStem === "o" ? "" : "not-applicable",
        eHuaClassHistoryChoiceAvailable: matrixStem === "ē-hua",
        eHuaLicensedMatrixClasses: matrixStem === "ē-hua"
          ? freeze(["A", "B"])
          : freeze([]),
        eHuaSelectedMatrixClass: matrixStem === "ē-hua" ? targetClass : "",
        eHuaPerfectiveClassAlternants: matrixStem === "ē-hua"
          ? freeze(["ē-hua", "e-uh"])
          : freeze([]),
        rapidOrAbruptReadingIsCueOnly:
          ["ē-hua", "quiza", "quīza", "huetzi", "cal-aqui"].includes(matrixStem),
        huetziBasicFallReadingAvailable: matrixStem === "huetzi",
        huetziRapidAbruptReadingAvailable: matrixStem === "huetzi",
        huetziReversedEventReadingAvailable: matrixStem === "huetzi",
        huetziCausalFallReadingAvailable: matrixStem === "huetzi",
        hualDirectionalRetained: matrixStem === "huāl-la-uh"
          && /huāl/u.test(realizedMatrixStem),
        retainedMatrixDirectional: matrixStem === "huāl-la-uh"
          ? "huāl"
          : "",
        ordinaryHuītzConnectiveSelected: matrixStem === "huī-tz"
          && variant !== "huītz-carry",
        carryAnalysisSelected: variant === "huītz-carry",
        selectedMatrixAnalysis: variant === "future-embed"
          ? operationFacts.futureMatrixAnalysisId
          : variant === "huītz-carry"
            ? "special-carry-connectiveless"
            : "ordinary-connective-t",
        ordinaryVersusCarryAnalysisIsTypedChoice: matrixStem === "huī-tz",
        matrixAnalysisDoesNotWhitelistSourceStem: true,
        embedFiniteCoordinate: variant === "future-embed"
          ? "indicative-future"
          : "indicative-preterit-zero",
        matrixSuppliesFiniteMoodAndTense: true,
        embedFiniteCoordinateDecoupled:
          internalContext.compoundEmbedFiniteCoordinateDecoupled === true,
        caSuppletiveFiniteStemDerived: matrixStem === "ca"
          ? realizedMatrixStem
          : "",
        yaPresentSingularUh: matrixStem === "ya-uh"
          && key(request.mood || "indicative") === "indicative"
          && key(request.tense || "present") === "present"
          && !/pl$/u.test(text(request.subject || "3sg"))
          && realizedMatrixStem === "uh",
        yaPresentPluralHui: matrixStem === "ya-uh"
          && key(request.mood || "indicative") === "indicative"
          && key(request.tense || "present") === "present"
          && /pl$/u.test(text(request.subject || "3sg"))
          && realizedMatrixStem === "hui",
        yaSyncopationAvailable: matrixStem === "ya-uh"
          && /^(?:yā|ya|yah)$/u.test(matrixPredicateStem),
        yaSyncopationSelected: matrixStem === "ya-uh"
          && request.compoundYaSyncopation === true,
        yaUnsyncopatedSequence: matrixStem === "ya-uh"
          && /^(?:yā|ya|yah)$/u.test(matrixPredicateStem)
          ? `ti-${matrixPredicateStem}`
          : "",
        yaSyncopatedSequence: matrixStem === "ya-uh"
          && /^(?:yā|ya|yah)$/u.test(matrixPredicateStem)
          ? matrixPredicateStem === "yah" ? "t-ah" : "t-ā"
          : "",
        connectiveCausativeStructurallyDistinct: true,
        traditionalSpellingMayNeutralizeDistinction: matrixStem === "ya-uh",
        traditionalSpellingAnalysisChoices: matrixStem === "ya-uh"
          ? freeze(["connective-t", "causative"])
          : freeze([]),
        eHuaCaIdiomaticReadingAvailable: sourceStem === "ē-hua"
          && matrixStem === "ca",
        embedTenseMorph: variant === "future-embed" ? "z" : "0",
        embedPerfectiveRequired: variant !== "future-embed",
        connectiveAllomorph: variant === "future-embed" || variant === "huītz-carry"
          ? ""
          : request.compoundYaSyncopation === true
            ? "t"
            : connectiveFor(realizedMatrixStem),
        connectiveCondition: variant === "future-embed" || variant === "huītz-carry"
          ? "not-applicable"
          : request.compoundYaSyncopation === true
            ? "optional-ti-ya-syncopation"
          : new RegExp(`^[${vowels}]`, "iu").test(realizedMatrixStem)
            ? "t-before-vowel"
            : "ti-before-consonant",
        connectiveSupportiveI: variant !== "future-embed"
          && variant !== "huītz-carry"
          && request.compoundYaSyncopation !== true
          && connectiveFor(realizedMatrixStem) === "ti",
        linkedCompartmentalization: variant !== "future-embed",
        availableEventTimeReadings: variant === "future-embed"
          ? freeze(["future-embed-action-after-matrix-action"])
          : freeze([
            "embed-completed-before-matrix",
            "embed-begun-before-and-continuing-with-matrix"
          ]),
        translationDoesNotAuthorizeGrammar: true,
        specialPerfectiveEmbedDerived:
          caSuppletiveEmbed || ["ca", "ya-uh", "itt-a", "itz"].includes(sourceStem),
        specialPerfectiveEmbedSource: sourceStem,
        specialPerfectiveEmbedResult: perfective,
        compoundEmbedAllomorphFrame,
        caToYeEmbedAlternation: caSuppletiveEmbed && perfective === "ye",
        yauhToYahEmbedAlternation:
          sourceStem === "ya-uh" && perfective === "yah",
        ittaToItzEmbedAlternation:
          sourceStem === "itt-a" && perfective === "itz",
        itzEmbedSense: sourceStem === "itz"
          ? selectedItzSense
          : sourceStem === "itt-a"
            ? "observational"
            : sourceStem === "huī-tz" && perfective === "itz"
              ? "motion"
              : "",
        itzSourceAnalysis: sourceStem === "itz"
          ? selectedItzSense === "motion"
            ? "compound-only-motion-itz"
            : "observational-itz"
          : sourceStem === "itt-a"
            ? "transitive-itta-observational"
            : "",
        itzHomophonesRemainDistinct: sourceStem === "itz"
          || sourceStem === "itt-a",
        itzSourceAnalysisIsUserChoice: sourceStem === "itz",
        cacNonanimateReferenceRequired: sourceStem === "cac",
        cacSubjectAnimacy: sourceStem === "cac" ? "nonanimate" : "",
        cacAnimacyConsequenceAutomatic: sourceStem === "cac",
        cacReadingOptions: sourceStem === "cac"
          ? freeze([
            "be-quiet", "be-calm", "be-alone", "be-deserted",
            "stand-abandoned", "lie-silent", "fall-silent",
            "become-fair-weather"
          ])
          : freeze([]),
        recursiveEmbed: Boolean(recursiveEmbedFrame),
        recursiveMatrix: Boolean(recursiveMatrixFrame),
        recursiveEmbedFrame,
        recursiveMatrixFrame,
        recursiveCompoundAuthorized:
          Boolean(recursiveEmbedFrame || recursiveMatrixFrame),
        recursiveResultRole: recursiveEmbedFrame
          ? "embed"
          : recursiveMatrixFrame
            ? "matrix"
            : "",
        recursiveRoleIsUserChoice:
          Boolean(recursiveEmbedFrame || recursiveMatrixFrame),
        recursiveBinaryConstituentCount:
          recursiveEmbedFrame || recursiveMatrixFrame ? 2 : 0,
        recursiveHierarchyAcyclic: recursiveHierarchy.acyclic,
        recursiveHierarchyValidated:
          Boolean(recursiveEmbedFrame || recursiveMatrixFrame),
        recursiveConstituentsDistinct:
          recursiveHierarchy.distinctConstituents,
        recursiveDepth: recursiveEmbedFrame || recursiveMatrixFrame
          ? recursiveHierarchy.maximumDepth + 1
          : 0,
        recursiveSourceLinksPreserved:
          Boolean(recursiveEmbedFrame || recursiveMatrixFrame),
        recursiveLocalRulesIndependent:
          Boolean(recursiveEmbedFrame || recursiveMatrixFrame),
        recursiveLocalConnectiveDerived:
          Boolean(recursiveEmbedFrame || recursiveMatrixFrame),
        recursiveValenceInheritedFromOuterEmbed:
          Boolean(recursiveEmbedFrame || recursiveMatrixFrame),
        recursiveParticipantsPreserved:
          Boolean(recursiveEmbedFrame || recursiveMatrixFrame),
        recursiveFiniteBoundaryOutsideCompletedCompound:
          Boolean(recursiveEmbedFrame || recursiveMatrixFrame),
        recursiveContinuationAvailable:
          Boolean(recursiveEmbedFrame || recursiveMatrixFrame),
        recursiveExampleStemWhitelistUsed: false,
        recursiveManualDepthControlRequired: false,
        recursiveManualConnectiveControlRequired: false,
        recursiveManualParticipantCopyingRequired: false,
        eventOrder: selectedEventOrder,
        reversedEventOrderLicensed,
        reversedEventOrderMatrices: freeze(["huetzi", "ahci"]),
        motionItzEHuaReversalLicensed:
          matrixStem === "ē-hua"
          && sourceStem === "itz"
          && selectedItzSense === "motion",
        reversedEventOrderSelected:
          selectedEventOrder === "hysteron-proteron",
        interpretedFirstEvent: selectedEventOrder === "hysteron-proteron"
          ? "matrix"
          : "embed",
        interpretedSecondEvent: selectedEventOrder === "hysteron-proteron"
          ? "embed"
          : "matrix",
        surfaceConstituentOrder: "embed-before-matrix",
        eventOrderChoiceChangesInterpretationOnly: true,
        compoundVoice: requestedCompoundVoice,
        nonactiveScope: requestedNonactiveScope,
        passiveScopeOptions: freeze(["embed", "both"]),
        impersonalScopeOptions: freeze(["embed", "matrix", "both"]),
        embedNonactiveApplied: ["embed", "both"].includes(
          requestedNonactiveScope
        ),
        matrixNonactiveApplied: ["matrix", "both"].includes(
          requestedNonactiveScope
        ),
        embedNonactiveOperation: ["embed", "both"].includes(
          requestedNonactiveScope
        ) ? selectedEmbedVoiceOperation : "active",
        matrixNonactiveOperation: ["matrix", "both"].includes(
          requestedNonactiveScope
        ) ? key(
          internalContext.matrixApplicationFrame?.controlFrame
            ?.selectedVoiceOperation
          || internalContext.matrixApplicationFrame?.controlFrame
            ?.selectedVoice
          || "impersonal"
        ) : "active",
        nonactiveScopeChangesParticipantTopology: requestedNonactiveScope
          !== "none",
        nonactiveResultValence: targetValence,
        stativeMatrixPrefersEmbedOnly: [
          "ca", "mani", "ihca", "o", "pil-ca"
        ].includes(matrixStem),
        stativeMatrixPreferenceIsNotAbsolute: [
          "ca", "mani", "ihca", "o", "pil-ca"
        ].includes(matrixStem),
        tlaImpersonalMustRemainOnEmbed:
          selectedEmbedVoiceOperation === "tla-impersonal",
        tlaImpersonalCarrier: selectedEmbedVoiceOperation === "tla-impersonal"
          ? "embed"
          : "",
        nonactiveSuffixesDerivedAutomatically: requestedNonactiveScope
          !== "none"
      };
      if (recursiveEmbedFrame || recursiveMatrixFrame) {
        ruleFamily = "compound-recursion";
      }
    } else if (operation === "purposive") {
      const purposiveRecursiveHierarchy = analyzeRecursiveCompoundHierarchy(
        recursiveEmbedFrame,
        null
      );
      if (purposiveRecursiveHierarchy.authorizationStatus !== "authorized") {
        return blockedOperation(
          request,
          purposiveRecursiveHierarchy.blockReason,
          "purposive-recursion"
        );
      }
      const series = key(request.purposiveSeries);
      const direction = series.startsWith("inbound-")
        ? "inbound"
        : series.startsWith("outbound-")
          ? "outbound"
          : "";
      const plural = /pl$/u.test(text(request.subject));
      const externalDirectional = key(
        request.purposiveExternalDirectional || "none"
      );
      if (!["none", "on", "huāl"].includes(externalDirectional)) {
        return blockedOperation(
          request,
          "licensed-external-directional-required",
          "purposive-external-directional"
        );
      }
      const matrixShapes = {
        "outbound-nonpast-indicative": plural ? "t-ī-hui" : "t-ī-uh",
        "outbound-past-indicative": "t-o",
        "outbound-nonpast-optative": plural
          ? request.purposiveIrregularPluralN === true ? "t-ī" : "t-i"
          : "t-i",
        "inbound-nonfuture-indicative": "c-o",
        "inbound-future-indicative": plural ? "qu-ī-hui" : "qu-ī-uh",
        "inbound-nonpast-optative": "qu-i"
      };
      const matrixShape = matrixShapes[series] || "";
      if (!matrixShape || !direction) {
        return blockedOperation(
          request,
          "licensed-purposive-series-required",
          "purposive-paradigm"
        );
      }
      if (request.purposiveIrregularPluralN === true
        && !(plural && series === "outbound-nonpast-optative")) {
        return blockedOperation(
          request,
          "irregular-n-is-outbound-plural-optative-only",
          "purposive-paradigm"
        );
      }
      const earlySingularGlottal =
        request.purposiveEarlySingularGlottal === true;
      if (earlySingularGlottal
        && (plural || series !== "outbound-nonpast-optative")) {
        return blockedOperation(
          request,
          "early-singular-glottal-is-outbound-singular-optative-only",
          "purposive-paradigm"
        );
      }
      // The retained finite Source may shorten nonactive ō before its silent
      // boundary. Future embedding instead inflects the authenticated underlying
      // voice stem; it does not apply a second nonactive formation.
      const purposiveFutureSourceStem = baseIsNonactive
        ? text(baseMachinery?.voiceTransformationFrame?.targetStem
          || baseMachinery?.nonactiveStemRecord?.imperfectiveNonactiveStem
          || baseTyped.slots?.predicate?.stem)
        : sourceStem;
      const purposiveFutureEmbedShapeFrame = futureEmbedShapeFrame(
        purposiveFutureSourceStem,
        baseIsNonactive ? "A" : targetClass,
        request.subject,
      );
      const purposiveEmbedStem = text(
        purposiveFutureEmbedShapeFrame?.selectedStemVariant,
      );
      const soundedFutureMorph = request.purposiveSoundedFutureMorph === true;
      const embedFutureMorph = soundedFutureMorph ? "z" : "⎕";
      targetStem = earlySingularGlottal
        ? `${purposiveEmbedStem}-${embedFutureMorph}-h`
        : `${purposiveEmbedStem}-${embedFutureMorph}-${matrixShape}`;
      const firstObjectCarrier = text(baseTyped.slots.prePredicate?.[0]?.carrier);
      const followingMaterial = firstObjectCarrier
        && !/^[0⎕□-]+$/u.test(firstObjectCarrier)
        ? firstObjectCarrier : targetStem;
      try {
        personDyad = targetObject.getClassicalNahuatlFiniteSubjectPersonDyad?.(
          request.subject || "3sg",
          series.endsWith("-optative") ? "optative" : "indicative",
          { followingMaterial },
        );
      } catch {
        personDyad = null;
      }
      if (!targetObject.isClassicalNahuatlFiniteSubjectPersonDyad?.(personDyad)) {
        return blockedOperation(
          request,
          "canonical-purposive-person-dyad-required",
          "purposive-paradigm",
        );
      }
      predicateTns = "0";
      numberDyad = {
        num1: "0",
        num2: plural ? request.purposiveIrregularPluralN === true ? "n" : "h" : "0"
      };
      ruleFamily = "purposive-paradigm";
      operationFacts = {
        direction,
        series,
        compoundType: "linked",
        linkage: "connectiveless",
        embedTense: "future",
        embedFutureMorph,
        ordinaryEmbedFutureMorph: "⎕",
        soundedFutureMorph: "z",
        soundedFutureMorphSelected: soundedFutureMorph,
        soundedFutureMorphMarkedRare: true,
        soundedFutureMorphStyleStatus: "rare-nonpreferred-textual-variant",
        futureEmbedClassShapePreserved: true,
        futureEmbedSourceStem: sourceStem,
        futureEmbedPredicateStem: purposiveEmbedStem,
        futureEmbedSelectedShape:
          text(purposiveFutureEmbedShapeFrame?.selectedShape),
        futureEmbedSelectedShapeReason:
          text(purposiveFutureEmbedShapeFrame?.selectedShapeReason),
        futureEmbedUnderlyingStem:
          text(purposiveFutureEmbedShapeFrame?.underlyingStemVariant),
        futureEmbedSilentClassCarrier:
          text(purposiveFutureEmbedShapeFrame?.silentCarrier),
        futureEmbedUsesSharedLesson7ShapeOwner:
          purposiveFutureEmbedShapeFrame?.kind
            === "classical-nahuatl-verbstem-imperfective-shape-eligibility-frame"
          && purposiveFutureEmbedShapeFrame.authorizationStatus
            === "authorized",
        matrixValence: "intransitive",
        matrixDirectionalMorpheme: direction === "inbound" ? "/k/" : "t",
        matrixDirectionalSpellings: direction === "inbound" ? ["c", "qu"] : ["t"],
        matrixDirectionalSpellingDerived: true,
        directionalChoiceComesFromSeries: true,
        duplicateDirectionControlRequired: false,
        futureMorphPrecedesInternalDirectional: true,
        internalDirectionalNotConnective: true,
        internalDirectionalNotExternal: true,
        archaicDirectionalPurposiveOnly: true,
        matrixDirectionalMorph: direction === "inbound" ? "c/qu" : "t",
        matrixBaseStem: series === "outbound-past-indicative"
          || series === "inbound-nonfuture-indicative"
          ? "o"
          : "i",
        purposeMotionBaseMeaning: "move-purposefully",
        imperfectiveNumberPartner: plural ? "hui" : "uh",
        perfectiveBaseDistinctFromOnO: true,
        licensedPurposiveSeries: Object.keys(matrixShapes),
        seriesIsSingleUserChoice: true,
        noStemWhitelist: true,
        matrixTenseMeaning: ({
          "outbound-nonpast-indicative": "nonpast",
          "outbound-past-indicative": "past",
          "outbound-nonpast-optative": "nonpast",
          "inbound-nonfuture-indicative": "nonfuture",
          "inbound-future-indicative": "future",
          "inbound-nonpast-optative": "nonpast"
        })[series],
        licensedReadingRange: ({
          "outbound-nonpast-indicative": ["present", "future"],
          "outbound-past-indicative": ["simple-past", "habitual-past", "anterior-past"],
          "outbound-nonpast-optative": ["command", "exhortation", "wish", "self-encouragement", "self-suggestion"],
          "inbound-nonfuture-indicative": [
            "present", "preterit", "imperfect", "distant-past"
          ],
          "inbound-future-indicative": ["future"],
          "inbound-nonpast-optative": [
            "command", "exhortation", "wish", "self-encouragement", "self-suggestion"
          ]
        })[series],
        readingRangeIsContextualNotAnotherFormChoice: true,
        finiteTenseMorph: "0",
        numberMorph: plural
          ? request.purposiveIrregularPluralN === true ? "n" : "h"
          : "0",
        movementPrecedesPurposeAction: true,
        purposeActionBeginsAfterMovement: true,
        progressiveActionOverlapsMovement: false,
        progressiveContrast: series === "outbound-nonpast-indicative"
          ? {
            purposiveInternalDirectional: "t",
            progressiveExternalConnective: "ti",
            purposiveEmbedTense: "future",
            progressiveEmbedTense: "preterit",
            traditionalUnmarkedTextMayBeAmbiguous:
              ["A", "C", "D"].includes(targetClass),
            classBShapeRemainsDistinct: targetClass === "B",
            analysisChoiceRequiredOnlyWhenTypedTextIsUnderspecified: true,
            spellingAloneHasGrammarAuthority: false
          }
          : null,
        ordinaryAntecessiveAvailable:
          series === "outbound-past-indicative"
          || series === "inbound-nonfuture-indicative",
        ordinaryAntecessiveSelected:
          (series === "outbound-past-indicative"
          || series === "inbound-nonfuture-indicative")
          && Boolean(
            request.sentenceAntecessive === true
            || request.antecessive === true
            || request.requestedPrefixStackMode === "antecessive"
            || request.prefixStackMode === "antecessive"
          ),
        inboundInternalHitherDirectional:
          direction === "inbound" ? "/k/" : "",
        inboundInternalHitherDistinctFromExternalHual:
          direction === "inbound",
        inboundNonfutureAntecessiveScope:
          series === "inbound-nonfuture-indicative"
            ? "past-act-of-purposing-not-intended-action"
            : "",
        inboundNonfutureAntecessiveMayAccompanyPresentReading:
          series === "inbound-nonfuture-indicative",
        inboundFutureNumberShape:
          series === "inbound-future-indicative" ? matrixShape : "",
        inboundFutureNumberShapeDerived:
          series === "inbound-future-indicative",
        pastPurposiveNeverIntroducedByMa:
          series === "outbound-past-indicative",
        pastPurposiveHomographContrast:
          series === "outbound-past-indicative"
            ? "connective-t-plus-on-o-optative"
            : "",
        pastPurposiveAnalysisUsesTypedStructureAndMaContext:
          series === "outbound-past-indicative",
        optativeLetReadingIsPermissive: false,
        optativeMayExpressSelfEncouragement:
          series === "outbound-nonpast-optative"
          || series === "inbound-nonpast-optative",
        optativeMayExpressSelfSuggestion:
          series === "outbound-nonpast-optative"
          || series === "inbound-nonpast-optative",
        secondPersonPers1DerivedByFiniteGrammar:
          series === "outbound-nonpast-optative",
        purposiveOptativeDistinctFromAdmonitive:
          series === "outbound-nonpast-optative",
        purposiveOptativeMatrixEnding:
          series === "outbound-nonpast-optative"
            ? request.purposiveIrregularPluralN === true ? "t-ī+0-n" : "t-i+0-h/0"
            : "",
        admonitiveContrastEnding:
          series === "outbound-nonpast-optative" ? "perfective+h/0+t-ih/t-in" : "",
        traditionalUnmarkedOptativeMayBeAmbiguous:
          series === "outbound-nonpast-optative",
        optativeAnalysisChoiceRequiredOnlyWhenTypedTextIsUnderspecified:
          series === "outbound-nonpast-optative",
        earlySingularGlottalSelected: earlySingularGlottal,
        earlySingularGlottalMorph: earlySingularGlottal ? "h" : "",
        earlySingularGlottalMarkedAberrant: true,
        earlySingularGlottalReplacesTi: earlySingularGlottal,
        ordinarySingularTiRemainsPreferred: true,
        nonactiveEmbedAuthorized: baseIsNonactive,
        nonactiveEmbedVoice: baseIsNonactive ? selectedBaseVoice : "",
        nonactiveEmbedStem: baseIsNonactive ? purposiveEmbedStem : "",
        nonactiveEmbedVoices: freeze(["passive", "impersonal"]),
        nonactiveEmbedVoicePreserved: baseIsNonactive,
        nonactiveEmbedParticipantTopologyPreserved: baseIsNonactive,
        nonactiveEmbedValencePreserved: baseIsNonactive,
        nonactiveEmbedFutureBoundaryOutsideStem: baseIsNonactive,
        nonactiveEmbedUsesSharedFutureEmbedPath: baseIsNonactive,
        nonactiveEmbedNegativeParticlesRemainSentenceExternal: baseIsNonactive,
        nonactiveEmbedExampleWhitelistUsed: false,
        recursiveEmbedAuthorized: Boolean(recursiveEmbedFrame),
        recursiveEmbedFrame,
        recursiveEmbedSourceOperation:
          recursiveEmbedFrame?.operationFrame?.operation || "",
        recursiveEmbedStem: recursiveEmbedFrame
          ? purposiveEmbedStem
          : "",
        recursiveEmbedFramePreserved: Boolean(recursiveEmbedFrame),
        recursiveEmbedInternalStructurePreserved:
          Boolean(recursiveEmbedFrame),
        recursiveEmbedParticipantsPreserved: Boolean(recursiveEmbedFrame),
        recursiveEmbedValencePreserved: Boolean(recursiveEmbedFrame),
        recursiveEmbedVoicePreserved: Boolean(recursiveEmbedFrame),
        recursiveEmbedEventRelationPreserved: Boolean(recursiveEmbedFrame),
        recursivePurposiveBoundaryOutsideCompletedResult:
          Boolean(recursiveEmbedFrame),
        recursiveCompoundEmbedAuthorized: Boolean(
          recursiveEmbedFrame?.operationFrame?.operation === "compound"
        ),
        recursiveCompoundEmbedStem:
          recursiveEmbedFrame?.operationFrame?.operation === "compound"
            ? purposiveEmbedStem
            : "",
        recursiveCompoundEmbedFramePreserved: Boolean(
          recursiveEmbedFrame?.operationFrame?.operation === "compound"
        ),
        recursiveCompoundInternalStructurePreserved: Boolean(
          recursiveEmbedFrame?.operationFrame?.operation === "compound"
        ),
        recursiveCompoundParticipantsPreserved: Boolean(
          recursiveEmbedFrame?.operationFrame?.operation === "compound"
        ),
        recursiveCompoundValencePreserved: Boolean(
          recursiveEmbedFrame?.operationFrame?.operation === "compound"
        ),
        recursiveCompoundVoicePreserved: Boolean(
          recursiveEmbedFrame?.operationFrame?.operation === "compound"
        ),
        recursiveCompoundEventRelationPreserved: Boolean(
          recursiveEmbedFrame?.operationFrame?.operation === "compound"
        ),
        recursivePurposiveBoundaryOutsideCompletedCompound: Boolean(
          recursiveEmbedFrame?.operationFrame?.operation === "compound"
        ),
        recursivePurposiveHierarchyAcyclic:
          purposiveRecursiveHierarchy.acyclic,
        recursivePurposiveContinuationAvailable: Boolean(recursiveEmbedFrame),
        recursivePurposiveExampleTemplateUsed: false,
        matrixDirectionalInsideStem: true,
        irregularPluralN: request.purposiveIrregularPluralN === true,
        externalDirectional,
        externalDirectionalSelected: externalDirectional !== "none",
        externalDirectionalMeaning: externalDirectional === "on"
          ? "away-thither-there"
          : externalDirectional === "huāl"
            ? "hither"
            : "",
        externalDirectionalOutsideCompletedPurposive:
          externalDirectional !== "none",
        externalDirectionalIndependentFromInternal:
          externalDirectional !== "none",
        externalDirectionalRelation: externalDirectional === "none"
          ? "none"
          : (externalDirectional === "on" && direction === "outbound")
            || (externalDirectional === "huāl" && direction === "inbound")
            ? "matching"
            : "mismatching",
        externalDirectionalMayContinueOrIntensifyMovement:
          externalDirectional !== "none",
        embedAndMatrixActionsRemainSeparate: true,
        ordinaryExternalDirectionalCanCarryPurposiveReading: true,
        ordinaryExternalDirectionalPathRemainsDistinct: true,
        formalPurposiveCounterpartAvailable: true,
        fulfilledPurposeReadingAvailable: true,
        metaphoricalMovementReadingAvailable: true,
        mutedIntentionReadingAvailable: true,
        purposiveInterpretationReadings: freeze([
          "intended-purpose", "fulfilled-purpose",
          "metaphorical-movement", "muted-intention"
        ]),
        interpretationIsContextualNotFormChoice: true,
        translationHasGrammarAuthority: false,
        callerPurposiveDirectionAuthority: false
      };
    } else {
      const subject = key(request.subject);
      const requestedHonoredParticipant = key(
        request.honoredParticipant || "subject"
      );
      const honorificSourceTypedFrame =
        internalContext.attitudeSourceClosureFrame?.finalTypedVncSlotFrame
        || getBaseTypedFrame(internalContext.honorificSourceApplicationFrame);
      const sourceTypedObjectFrame = cloneObjectFrameFromTyped(
        honorificSourceTypedFrame || baseTyped
      );
      const canonicalSourceObjectRequests = Array.isArray(
        internalContext.attitudeSourceClosureFrame
          ?.normalizedRequest?.sourceObjectRequests
      )
        ? internalContext.attitudeSourceClosureFrame
          .normalizedRequest.sourceObjectRequests
        : Array.isArray(internalContext.honorificSourceApplicationFrame
          ?.normalizedRequest?.sourceObjectRequests
        ) ? internalContext.honorificSourceApplicationFrame
          .normalizedRequest.sourceObjectRequests
          : [];
      const requestedSourceObjectNumbers = Array.isArray(
        request.sourceObjectRequests
      )
        ? request.sourceObjectRequests
        : [];
      const sourceObjectPositions = objectFramePositions(
        sourceTypedObjectFrame
      ).map((position, index) => {
        const canonicalRequest = canonicalSourceObjectRequests[index] || {};
        const numberedRequest = requestedSourceObjectNumbers.find(candidate => (
          text(candidate?.objectId) === text(canonicalRequest.objectId)
        )) || requestedSourceObjectNumbers[index] || {};
        return {
          ...position,
          objectId: text(position.objectId || canonicalRequest.objectId),
          objectKind: text(
            position.objectKind || canonicalRequest.objectKind
          ),
          objectPerson: text(
            position.objectPerson || canonicalRequest.objectPerson
          ),
          objectNumber: text(
            position.objectNumber
            || numberedRequest.objectNumber
            || request.objectNumber
          ),
          governor: text(position.governor || canonicalRequest.governor),
          derivationalLevel: Number(
            position.derivationalLevel
            || canonicalRequest.derivationalLevel
            || index + 1
          ),
        };
      });
      const sourceObjectFrame = sourceObjectPositions.length > 1
        ? {
            ...sourceTypedObjectFrame,
            valenceArity: "multiple",
            positions: sourceObjectPositions,
          }
        : sourceObjectPositions.length === 1
          ? {
              ...sourceTypedObjectFrame,
              ...sourceObjectPositions[0],
            }
          : sourceTypedObjectFrame;
      const sourceProjectiveObjectPositions = objectFramePositions(
        sourceObjectFrame
      ).filter(isProjectiveHonorificObjectPosition);
      const honorEligibleObjectPositions = sourceProjectiveObjectPositions
        .filter(position => !/^1/u.test(text(position.objectPerson)));
      const sourceHasProjectivePatient =
        sourceProjectiveObjectPositions.length > 0;
      const sourceHasHonorEligibleObject =
        honorEligibleObjectPositions.length > 0;
      const firstPersonSubject = /^1/u.test(subject);
      const possibleHonoredParticipants = [
        ...(!firstPersonSubject ? ["subject"] : []),
        ...(sourceHasHonorEligibleObject ? ["object"] : []),
      ];
      const possibleDisparagedParticipants = [
        "subject",
        ...(sourceHasProjectivePatient ? ["object"] : []),
      ];
      let honoredParticipant = operation === "pejorative"
        ? requestedHonoredParticipant
        : firstPersonSubject && sourceHasHonorEligibleObject
          ? "object"
          : requestedHonoredParticipant;
      const inheritedReverentialParticipant = key(
        internalContext.attitudeSourceClosureFrame?.operationFrame
          ?.operationFacts?.honoredParticipant
      );
      if (operation === "reverential"
        && inheritedReverentialParticipant
        && requestedHonoredParticipant !== inheritedReverentialParticipant) {
        return blockedOperation(
          request,
          "reverential-participant-must-match-honorific-source",
          "reverential-double"
        );
      }
      if (operation === "reverential"
        && inheritedReverentialParticipant) {
        honoredParticipant = inheritedReverentialParticipant;
      }
      const selectedHonoredObjectPosition = honoredParticipant === "object"
        && honorEligibleObjectPositions.length === 1
        ? honorEligibleObjectPositions[0]
        : null;
      const ownerIssuedDerivedSourceApplicationFrame =
        internalContext.ownerIssuedDerivedSourceApplicationFrame || null;
      const derivedSourceKind = key(internalContext.sourceDerivationKind);
      const derivedSourceHonorific = Boolean(
        ownerIssuedDerivedSourceApplicationFrame
        && ["causative", "applicative"].includes(derivedSourceKind)
        && operation === "honorific"
        && variant === "applicative"
      );
      // Mainline reflexivity is a typed dyadic position, including m-⎕
      // before a vowel. The shuntline ne position is monadic and does not
      // license §33.7's incorporated perfective route.
      const sourceHasMainlineReflexive = sourceObjectPositions.some(position =>
        ["reflexive", "mainline-reflexive"].includes(key(position.objectKind))
        && position.valenceArity === "dyadic"
      );
      if ((operation === "honorific" || operation === "reverential")
        && firstPersonSubject
        && !sourceHasHonorEligibleObject
        && honoredParticipant !== "object") {
        return blockedOperation(request, "self-honorific-not-authorized", "honorific-gate");
      }
      if ((operation === "honorific" || operation === "reverential")
        && honoredParticipant === "object"
        && !sourceHasHonorEligibleObject) {
        return blockedOperation(
          request,
          "first-person-honorific-requires-projective-patient",
          "honorific-projective"
        );
      }
      if ((operation === "honorific" || operation === "reverential")
        && !possibleHonoredParticipants.includes(honoredParticipant)) {
        return blockedOperation(
          request,
          "honorific-participant-not-present-in-source",
          "honorific-gate"
        );
      }
      if (operation === "pejorative"
        && !possibleDisparagedParticipants.includes(honoredParticipant)) {
        return blockedOperation(
          request,
          "pejorative-participant-not-present-in-source",
          "pejorative-preterit-embed"
        );
      }
      const compoundTarget = key(internalContext.attitudeCompoundTarget);
      const compoundScopeBasis = key(
        internalContext.attitudeCompoundScopeBasis,
      );
      const compoundLexicalizationAnalysisFrame =
        internalContext.compoundLexicalizationAnalysisFrame || null;
      const attitudeSourceFrame = isAuthorizedClosureFrame(
        internalContext.attitudeCompoundClosureFrame
      )
        && internalContext.attitudeCompoundClosureFrame.operationFrame?.operation
          === "compound"
        ? internalContext.attitudeCompoundClosureFrame
        : null;
      const attitudeTransformFrame = isAuthorizedClosureFrame(
        internalContext.attitudeMemberTransformationFrame
      )
        ? internalContext.attitudeMemberTransformationFrame
        : null;
      if (compoundTarget || internalContext.attitudeCompoundClosureFrame) {
        if (!attitudeSourceFrame) {
          return blockedOperation(
            request,
            "engine-issued-typed-compound-source-required",
            "attitude-compound"
          );
        }
        if (!["embed", "matrix"].includes(compoundTarget)) {
          return blockedOperation(
            request,
            "attitude-compound-target-must-be-embed-or-matrix",
            "attitude-compound"
          );
        }
        if (!attitudeTransformFrame) {
          return blockedOperation(
            request,
            "engine-issued-attitude-member-transformation-required",
            "attitude-compound"
          );
        }
        if (compoundLexicalizationAnalysisFrame?.authorizationStatus
          !== "authorized") {
          return blockedOperation(
            request,
            compoundLexicalizationAnalysisFrame?.blockReason
              || "authorized-compound-lexicalization-analysis-required",
            "attitude-compound",
          );
        }
        const compoundEmbedStem = text(
          attitudeSourceFrame.operationFrame?.operationFacts?.embedStem
        );
        const compoundMatrixStem = text(
          attitudeSourceFrame.operationFrame?.operationFacts?.matrixStem
        );
        const connector = text(
          attitudeSourceFrame.operationFrame?.operationFacts?.connective
        );
        const transformedMemberStem = text(
          internalContext.attitudeMemberPerfectiveStem
        );
        if (!compoundEmbedStem || !compoundMatrixStem || !connector
          || !transformedMemberStem) {
          return blockedOperation(
            request,
            "typed-attitude-compound-member-realization-required",
            "attitude-compound"
          );
        }
        targetStem = compoundTarget === "embed"
          ? `${transformedMemberStem}-${connector}-${compoundMatrixStem}`
          : `${compoundEmbedStem}-${connector}-${attitudeTransformFrame.operationFrame.targetStem}`;
        targetClass = text(compoundTarget === "matrix"
          ? attitudeTransformFrame.operationFrame.targetClass
          : attitudeSourceFrame.operationFrame?.targetClass || targetClass
        ).toUpperCase();
        ruleFamily = "attitude-compound";
        derivedTargetInitialISelection = attitudeSourceFrame.baseApplicationFrame
          ?.normalizedRequest?.sourceInitialIAnalysis?.resolvedKind || "";
        const transformedMemberObjectFrame = cloneObjectFrameFromTyped(
          attitudeTransformFrame.finalTypedVncSlotFrame,
        );
        const sourceCompoundObjectFrame =
          internalContext.attitudeSourceObjectFrame
          || cloneObjectFrameFromTyped(
            attitudeSourceFrame.finalTypedVncSlotFrame,
          );
        objectFrame = {
          ...transformedMemberObjectFrame,
          stemRealization: targetStem
        };
        operationFacts = {
          compoundTarget,
          compoundScopeBasis,
          scopeDerivedAutomatically: true,
          directScopeChoiceExposed: false,
          connective: connector,
          compoundVariant: key(
            attitudeSourceFrame.operationFrame?.variant,
          ),
          sharedObjectMatrixTransform:
            compoundScopeBasis === "shared-object-compound",
          selectedCompoundStructure:
            compoundLexicalizationAnalysisFrame.selectedStructure,
          compoundStructureChoiceRequired:
            compoundLexicalizationAnalysisFrame.structureChoiceRequired,
          compoundStructureAutomaticallySelected:
            compoundLexicalizationAnalysisFrame.structureAutomaticallySelected,
          compoundLexicalMeaningId:
            compoundLexicalizationAnalysisFrame.lexicalMeaningId || "",
          compoundLexicalizationAnalysisFrame,
          sourceCompoundObjectFrame: freeze(sourceCompoundObjectFrame),
          transformedMemberObjectFrame: freeze(transformedMemberObjectFrame),
          completedCompoundObjectFrame: freeze({ ...objectFrame }),
          compoundObjectsPreserved:
            objectFramePositions(sourceCompoundObjectFrame).length
              <= objectFramePositions(objectFrame).length,
          typedCompoundSourceFrame: attitudeSourceFrame,
          typedMemberTransformationFrame: attitudeTransformFrame,
          memberSourceContext: getClassicalNahuatlCompoundAttitudeMemberContext(attitudeSourceFrame, request),
          typedMemberPerfectiveFrame:
            internalContext.attitudeMemberPerfectiveFrame || null,
          typedCompoundSourcePreserved: true,
          typedInternalBoundariesPreserved: true,
          outerSubjectPreserved: true,
          outerMoodPreserved: true,
          outerTensePreserved: true,
          exactExampleIdentityAuthority: false,
          callerAttitudeScopeAuthorityAccepted: false,
          callerFormulaAuthorityAccepted: false,
          callerSurfaceAuthorityAccepted: false,
        };
      } else if (operation === "honorific" && ["causative", "applicative"].includes(variant)) {
        const selected = baseMachinery?.targetStem || baseTyped?.slots?.predicate?.stem || sourceStem;
        const honorificAnalysis = internalContext
          .honorificFormationAnalysisFrame
          || buildHonorificFormationAnalysisFrame(request, sourceStem);
        if (
          honorificAnalysis?.authorizationStatus !== "authorized"
          || honorificAnalysis.selectedFormationLicensed !== true
        ) {
          return blockedOperation(
            request,
            honorificAnalysis?.blockReason
              || "honorific-formation-not-licensed-by-typed-source-analysis",
            variant === "applicative"
              ? "honorific-applicative"
              : "honorific-causative"
          );
        }
        if (honorificAnalysis.selectionLicensed !== true) {
          return blockedOperation(
            request,
            "licensed-honorific-stem-alternative-required",
            variant === "applicative"
              ? "honorific-applicative"
              : "honorific-causative"
          );
        }
        if (honorificAnalysis.moodRestriction === "no-optative"
          && key(request.mood) === "optative") {
          return blockedOperation(
            request,
            "huica-tz-honorific-has-no-optative",
            "honorific-irregular"
          );
        }
        const lexicalRealization = honorificAnalysis.selectedOption?.derivationRoute
          ? ""
          : text(honorificAnalysis.selectedOption?.targetStem);
        if (!lexicalRealization && internalContext.honorificDerivationAttempted === true && internalContext.honorificDerived !== true) {
          return blockedOperation(request, internalContext.honorificDerivationBlockReason || "authorized-honorific-derivation-option-required", variant === "applicative" ? "honorific-applicative" : "honorific-causative");
        }
        targetStem = internalContext.shuntlineApplicativeHonorPreservesStem
          ? text(ownerIssuedDerivedSourceApplicationFrame.resultFrame.derivationOperationFrame.targetStem)
          : lexicalRealization || selected;
        if (internalContext.shuntlineApplicativeHonorPreservesStem) {
          targetClass = text(ownerIssuedDerivedSourceApplicationFrame.resultFrame.derivationOperationFrame.targetClass);
        } else if (lexicalRealization
          && variant === "applicative"
          && /(?:iā|i-ā)$/u.test(lexicalRealization)) {
          // Applicative i + ā is a derived Class C suffix, not a Class D
          // long-ā root. Keep its quantity for the ordinary finite owner.
          targetClass = "C";
        } else if (lexicalRealization && variant === "causative") {
          targetClass = honorificAnalysis.selectedOption.targetClass || "C";
        } else if (internalContext.honorificDerived === true) {
          targetClass = text(
            baseApplicationFrame?.normalizedRequest?.targetClass
            || baseApplicationFrame?.controlFrame?.derivedClass
            || targetClass
          ).toUpperCase();
        }
        targetValence = "mainline-reflexive";
        ruleFamily = variant === "applicative" ? "honorific-applicative" : "honorific-causative";
        const reflexiveBySubject = /^1sg/u.test(subject) ? ["n", "o"] : /^1pl/u.test(subject) ? ["t", "o"] : ["m", "o"];
        const reflexivePosition = { valenceArity: "dyadic", va1: reflexiveBySubject[0], va2: reflexiveBySubject[1], objectKind: "reflexive", governor: variant };
        const canonicalDerivedObjectFrameBase =
          internalContext.honorificDerived === true
          ? {
              ...cloneObjectFrameFromTyped(
                getBaseTypedFrame(baseApplicationFrame),
                (position, slot, index) => ({
                  ...position,
                  ...baseApplicationFrame.resultFrame.derivationOperationFrame
                    ?.participantTransformFrame?.targetObjectRequests?.[index],
                }),
              ),
              stemRealization: targetStem,
            }
          : sourceObjectFrame.valenceArity === "vacant"
          ? { ...reflexivePosition, stemRealization: targetStem }
          : sourceObjectFrame.valenceArity === "multiple"
            ? { valenceArity: "multiple", positions: [...sourceObjectFrame.positions, reflexivePosition], stemRealization: targetStem }
            : { valenceArity: "multiple", positions: [sourceObjectFrame, reflexivePosition], stemRealization: targetStem };
        const canonicalDerivedPositions = objectFramePositions(
          canonicalDerivedObjectFrameBase
        ).map(position => {
          if (!isProjectiveHonorificObjectPosition(position)) return position;
          const sourcePosition = sourceProjectiveObjectPositions.find(
            candidate => text(candidate.objectId) === text(position.objectId)
          ) || sourceProjectiveObjectPositions.find(candidate => (
            key(candidate.objectKind) === key(position.objectKind)
            && key(candidate.objectPerson) === key(position.objectPerson)
          ));
          return sourcePosition
            ? {
                ...position,
                objectNumber: sourcePosition.objectNumber,
              }
            : position;
        });
        const canonicalDerivedObjectFrame =
          canonicalDerivedPositions.length > 1
            ? {
                ...canonicalDerivedObjectFrameBase,
                valenceArity: "multiple",
                positions: canonicalDerivedPositions,
              }
            : canonicalDerivedObjectFrameBase;
        objectFrame = canonicalDerivedObjectFrame;
        if (honorificAnalysis.selectedOption?.directionalPrefix) {
          operationFacts = {...operationFacts,
            suppletiveDirectionalPrefix: honorificAnalysis.selectedOption.directionalPrefix};
        }
        const derivedObjectPositions = objectFramePositions(
          canonicalDerivedObjectFrame
        );
        const retainedProjectiveObjectPositions = derivedObjectPositions
          .filter(isProjectiveHonorificObjectPosition);
        const retainedDerivedSourceObjectPositions = derivedObjectPositions
          .filter(position => sourceObjectPositions.some(sourcePosition => (
            text(sourcePosition.objectId) === text(position.objectId)
          )));
        const derivedSourceLowerAgentPositions = sourceObjectPositions.filter(
          position => ["causative", "applicative"].includes(
            key(position.governor)
          )
        );
        const derivedSourceThemePositions = sourceObjectPositions.filter(
          position => key(position.governor) === "directive"
        );
        const derivedSourceNonspecificThemePositions =
          derivedSourceThemePositions.filter(position => [
            "nonspecific-human", "nonspecific-nonhuman",
            "projective-human", "projective-nonhuman",
          ].includes(key(position.objectKind)));
        const reflexiveBeneficiaryPosition = derivedObjectPositions.find(
          position => key(position?.objectKind) === "reflexive"
            && key(position?.governor) === "applicative"
        ) || null;
        const projectiveApplicativeHonorific = variant === "applicative"
          && sourceHasProjectivePatient;
        const projectiveCausativeHonorific = variant === "causative"
          && sourceHasProjectivePatient;
        const causativeReflexiveAgentPosition = derivedObjectPositions.find(
          position => key(position?.objectKind) === "reflexive"
            && key(position?.governor) === "causative"
        ) || null;
        operationFacts = {
          ...operationFacts,
          honorificFormationAnalysisFrame: honorificAnalysis,
          neutralSourcePreserved: true,
          sourceAgreementFrame,
          sourceMorphemicProfile: sourceAgreementFrame.morphemicSourceProfile,
          availableFormations: honorificAnalysis.availableFormations,
          selectedFormation: variant,
          preferredFormation: honorificAnalysis.preferredFormation,
          routeChoiceRequired: honorificAnalysis.routeChoiceRequired,
          formationAutomaticallySelected:
            honorificAnalysis.formationAutomaticallySelected,
          reflexiveRelationAutomatic: true,
          reflexiveCoreference: "result-subject",
          ownInterestReading: variant === "applicative",
          autonomousAgentCausativeReading: variant === "causative",
          honorificOnlyApplicative:
            honorificAnalysis.honorificOnlyApplicative,
          lexicalRealizationKind: text(
            honorificAnalysis.selectedOption?.realizationKind
          ),
          lexicalAlternativeChoiceRequired:
            honorificAnalysis.alternativeChoiceRequired,
          selectedLexicalAlternative:
            honorificAnalysis.selectedOptionId,
          documentedLexicalRealizationUsed:
            honorificAnalysis.documentedLexicalRealizationUsed,
          canvasExamplesAuthorizeRoute: false,
          englishHonorificMarkerIsReadingEvidenceOnly: true,
          projectiveApplicativeHonorific,
          projectiveCausativeHonorific,
          sourceHasProjectivePatient,
          sourceProjectiveObjectPositions,
          honorEligibleObjectPositions,
          retainedProjectiveObjectPositions,
          projectiveObjectsPreserved:
            projectiveApplicativeHonorific
            && retainedProjectiveObjectPositions.length
              === sourceProjectiveObjectPositions.length,
          projectiveObjectNumberAndRolesPreserved:
            projectiveApplicativeHonorific,
          projectiveCausativePatientPreserved:
            projectiveCausativeHonorific
            && retainedProjectiveObjectPositions.length
              === sourceProjectiveObjectPositions.length,
          projectiveCausativePatientNumberAndRolePreserved:
            projectiveCausativeHonorific
            && retainedProjectiveObjectPositions.every(position => (
              sourceProjectiveObjectPositions.some(sourcePosition => (
                text(sourcePosition.objectId) === text(position.objectId)
                && text(sourcePosition.objectKind)
                  === text(position.objectKind)
                && text(sourcePosition.objectPerson)
                  === text(position.objectPerson)
                && text(sourcePosition.objectNumber)
                  === text(position.objectNumber)
                && text(sourcePosition.governor)
                  === text(position.governor)
              ))
            )),
          causativeReflexiveAgentPosition,
          causativeReflexiveAgentAddedAutomatically:
            projectiveCausativeHonorific
            && Boolean(causativeReflexiveAgentPosition),
          causativeReflexiveAgentCoreferentialWithResultSubject:
            projectiveCausativeHonorific
            && Boolean(causativeReflexiveAgentPosition),
          literalSelfCausationReading: projectiveCausativeHonorific,
          agentOrPatientHonorificAmbiguity:
            projectiveCausativeHonorific
            && possibleHonoredParticipants.length > 1,
          typedHonorificFormationAnalysisSupplied:
            honorificAnalysis.analysisSupplied === true,
          routeMembershipWhitelistUsed: false,
          exactExampleStemRouteAuthority: false,
          reflexiveBeneficiaryPosition,
          reflexiveBeneficiaryAddedAutomatically:
            projectiveApplicativeHonorific
            && Boolean(reflexiveBeneficiaryPosition),
          literalOwnBenefitReading:
            projectiveApplicativeHonorific,
          possibleHonoredParticipants,
          selectedHonoredObjectPosition,
          honoredObjectChoiceRequired:
            honoredParticipant === "object"
            && honorEligibleObjectPositions.length > 1,
          honoredParticipantChoiceRequired:
            possibleHonoredParticipants.length > 1,
          honoredParticipantAutomaticallySelected:
            possibleHonoredParticipants.length === 1
              ? honoredParticipant
              : "",
          participantAmbiguityPreserved:
            possibleHonoredParticipants.length > 1,
          firstPersonSubjectForcesObjectHonorification:
            firstPersonSubject && sourceHasHonorEligibleObject,
          englishHonorificPlacementSelectsParticipant: false,
          derivedSourceHonorific,
          shuntlineApplicativeHonorPreservesStem:
            internalContext.shuntlineApplicativeHonorPreservesStem === true,
          existingApplicativeSuffixRetained:
            internalContext.shuntlineApplicativeHonorPreservesStem === true,
          addedHonorificReflexiveRelationHasNewSuffix:
            internalContext.shuntlineApplicativeHonorPreservesStem !== true,
          derivedSourceKind: derivedSourceHonorific ? derivedSourceKind : "",
          ownerIssuedDerivedSourceRequired: derivedSourceHonorific,
          ownerIssuedDerivedSourceRetained: derivedSourceHonorific,
          derivedSourceApplicationFrame: derivedSourceHonorific
            ? ownerIssuedDerivedSourceApplicationFrame
            : null,
          derivedSourceResultFrame: derivedSourceHonorific
            ? ownerIssuedDerivedSourceApplicationFrame.resultFrame
            : null,
          innerDerivationOperationFrame: derivedSourceHonorific
            ? ownerIssuedDerivedSourceApplicationFrame.resultFrame
              ?.derivationOperationFrame || null
            : null,
          innerDerivedSourceStem: derivedSourceHonorific
            ? text(honorificSourceTypedFrame?.slots?.predicate?.stem)
            : "",
          derivedSourceHigherAgent: derivedSourceHonorific
            ? subject
            : "",
          derivedSourceLowerAgentPositions: derivedSourceHonorific
            ? derivedSourceLowerAgentPositions
            : freeze([]),
          derivedSourceThemePositions: derivedSourceHonorific
            ? derivedSourceThemePositions
            : freeze([]),
          derivedSourceNonspecificThemePositions: derivedSourceHonorific
            ? derivedSourceNonspecificThemePositions
            : freeze([]),
          derivedSourceNonspecificThemeAllowsSingularOrPluralReading:
            derivedSourceHonorific
            && derivedSourceNonspecificThemePositions.length > 0,
          retainedDerivedSourceObjectPositions: derivedSourceHonorific
            ? retainedDerivedSourceObjectPositions
            : freeze([]),
          derivedSourceObjectsPreserved: derivedSourceHonorific
            && retainedDerivedSourceObjectPositions.length
              === sourceObjectPositions.length,
          derivedSourceBoundariesPreserved: derivedSourceHonorific
            && Boolean(
              ownerIssuedDerivedSourceApplicationFrame.resultFrame
                ?.derivationOperationFrame
            ),
          derivedSourceRebuiltFromFormula: false,
          derivedSourceFormulaAuthorityAccepted: false,
          derivedSourceSurfaceAuthorityAccepted: false,
          derivedSourceCanvasExampleAuthority: false,
        };
      } else {
        if (!["honorific", "reverential", "pejorative"].includes(operation)
          || variant !== "preterit-embed") {
          return blockedOperation(
            request,
            "licensed-attitude-formation-required",
            "honorific-gate"
          );
        }
        if (operation === "honorific"
          && !sourceHasMainlineReflexive) {
          return blockedOperation(
            request,
            "honorific-preterit-embed-requires-mainline-reflexive-source",
            "honorific-preterit-embed"
          );
        }
        if (operation === "reverential"
          && internalContext.attitudeSourceIsHonorific !== true) {
          return blockedOperation(
            request,
            "reverential-requires-engine-issued-honorific-source",
            "reverential-double"
          );
        }
        // A retained honorific closure carries its present typed predicate.
        // Derive its perfective from the issued target stem and class rather
        // than treating that present predicate as an already perfective stem.
        const honorificSourceOperation = operation === "reverential"
          ? internalContext.attitudeSourceClosureFrame?.operationFrame : null;
        const honorificSourceStem = text(honorificSourceOperation?.targetStem);
        const honorificSourceClass = text(honorificSourceOperation?.targetClass);
        const honorificPerfectiveFrame = honorificSourceOperation
          ? targetObject.getClassicalNahuatlPerfectiveStem?.(
              honorificSourceStem,
              targetObject.inferClassicalNahuatlLesson7ClassProfile?.(
                honorificSourceStem,
                { verbClass: honorificSourceClass,
                  canvasHigherLayerClassOverride: honorificSourceClass },
              ) || { classId: honorificSourceClass },
            ) : null;
        if (honorificSourceOperation
          && (honorificPerfectiveFrame?.imperfectiveStem !== honorificSourceStem
            || !honorificPerfectiveFrame?.perfectiveStem)) {
          return blockedOperation(request, "issued-honorific-perfective-required",
            "reverential-double");
        }
        const perfective = honorificPerfectiveFrame?.perfectiveStem
          || perfectiveStemFromMachinery(baseMachinery) || sourceStem;
        const matrix = operation === "pejorative" ? "pōl-o-ā" : "tzin-o-ā";
        targetStem = `${perfective}-0-${matrix}`;
        targetClass = "C";
        ruleFamily = operation === "pejorative" ? "pejorative-preterit-embed" : operation === "reverential" ? "reverential-double" : "honorific-preterit-embed";
        if (operation === "honorific") {
          objectFrame = {
            ...cloneObjectFrameFromTyped(baseTyped),
            stemRealization: targetStem,
          };
          const retainedSourceObjects = objectFramePositions(objectFrame);
          operationFacts = {
            ...operationFacts,
            mainlineReflexivePreteritEmbedHonorific: true,
            sourceReflexiveTopology: "mainline-reflexive",
            mainlineReflexiveTopologySelectsRouteAutomatically: true,
            attitudeRouteChoiceRequired: false,
            userSelectsMatrix: false,
            userSelectsPerfectiveClassForm: false,
            userSelectsObjectReplacement: false,
            userSelectsCompoundBracketing: false,
            integratedCompoundPattern: true,
            futureEmbedParallel: true,
            embeddedPredicateAspect: "perfective",
            embeddedPredicateStem: perfective,
            embeddedPredicateVerbClass: text(
              baseApplicationFrame?.normalizedRequest?.verbClass
              || request.verbClass
            ).toUpperCase(),
            embeddedTense: "preterit",
            embeddedPreteritMorph: "0",
            embeddedPreteritMorphHasSurface: false,
            fixedAffectiveMatrix: "tla-(tzin-o-ā)",
            matrixStem: matrix,
            matrixSourceNounstem: "(tzin)-tli-",
            matrixFormationOwner: "§55.6",
            incorporatedPredicateReplacesMatrixSpecificObject: true,
            sourceObjectFrame,
            retainedSourceObjectPositions: retainedSourceObjects,
            sourceObjectPronounsPreserved:
              retainedSourceObjects.length === sourceObjectPositions.length,
            sourceParticipantsPreserved:
              retainedSourceObjects.length === sourceObjectPositions.length,
            ownerIssuedSourceApplicationFrame: baseApplicationFrame,
            ownerIssuedSourceResultFrame: baseResult,
            ownerIssuedSourceRetained: true,
            shuntlineReflexiveUsesPreteritEmbed: false,
            sourceShapeDeterminesPerfectiveThroughCanonicalOwner: true,
            exampleStemWhitelistUsed: false,
            canvasExampleAuthority: false,
            callerFormulaAuthorityAccepted: false,
            callerSurfaceAuthorityAccepted: false,
          };
        } else if (operation === "reverential") {
          const innerHonorificFrame =
            internalContext.attitudeSourceClosureFrame;
          const innerOperationFrame = innerHonorificFrame?.operationFrame;
          const innerFacts = innerOperationFrame?.operationFacts || {};
          objectFrame = {
            ...cloneObjectFrameFromTyped(baseTyped),
            stemRealization: targetStem,
          };
          const retainedSourceObjects = objectFramePositions(objectFrame);
          operationFacts = {
            ...operationFacts,
            reverentialSubtypeOfHonorific: true,
            doubledHonorificConstruction: true,
            reverentialIntensitySelectedByUser: true,
            secondHonorificLayerAutomatic: true,
            ownerIssuedHonorificSourceRequired: true,
            ownerIssuedHonorificSourceFrame: innerHonorificFrame,
            ownerIssuedHonorificSourceRetained: true,
            innerHonorificOperationFrame: innerOperationFrame,
            neutralSourceStem: text(innerOperationFrame?.sourceStem),
            honorificSourceStem: text(innerOperationFrame?.targetStem),
            reverentialTargetStem: targetStem,
            neutralHonorificReverentialHierarchy: freeze([
              text(innerOperationFrame?.sourceStem),
              text(innerOperationFrame?.targetStem),
              targetStem,
            ]),
            hierarchyDepth: 3,
            innerHonoredParticipant:
              text(innerFacts.honoredParticipant),
            outerHonoredParticipant: honoredParticipant,
            inheritedHonoredParticipantPreserved:
              text(innerFacts.honoredParticipant) === honoredParticipant,
            inheritedPossibleHonoredParticipants: freeze([
              ...(innerFacts.possibleHonoredParticipants || []),
            ]),
            inheritedParticipantAmbiguity:
              (innerFacts.possibleHonoredParticipants || []).length > 1,
            inheritedParticipantChoiceWasReal:
              innerFacts.honoredParticipantChoiceRequired === true,
            outerIntroducesFreshParticipantChoice: false,
            innerHonorificAnalysisPreserved: true,
            embeddedHonorificPredicateAspect: "perfective",
            embeddedHonorificPerfectiveStem: perfective,
            embeddedPreteritMorph: "0",
            embeddedPreteritMorphHasSurface: false,
            incorporatedHonorificPredicateIsOuterObject: true,
            fixedOuterMatrix: "tla-(tzin-o-ā)",
            outerMatrixStem: matrix,
            retainedSourceObjectPositions: retainedSourceObjects,
            sourceObjectPronounsPreserved:
              retainedSourceObjects.length === sourceObjectPositions.length,
            sourceParticipantsPreserved:
              retainedSourceObjects.length === sourceObjectPositions.length,
            innerAndOuterBoundariesPreserved: true,
            rawStemReentryAllowed: false,
            copiedHonorificSpellingAuthority: false,
            callerFormulaAuthorityAccepted: false,
            callerSurfaceAuthorityAccepted: false,
            canvasExampleAuthority: false,
          };
        } else if (operation === "pejorative") {
          objectFrame = {
            ...sourceObjectFrame,
            stemRealization: targetStem,
          };
          const retainedSourceObjects = objectFramePositions(objectFrame);
          const sourceHasReflexiveObject = retainedSourceObjects.some(
            position => /reflexive/u.test(key(position.objectKind))
          );
          const sourceTopology = sourceHasReflexiveObject
            ? "reflexive-object"
            : sourceHasProjectivePatient
              ? "projective-object"
              : "intransitive";
          const selectedDisparagedObjectPosition =
            honoredParticipant === "object"
            && sourceProjectiveObjectPositions.length === 1
              ? sourceProjectiveObjectPositions[0]
              : null;
          operationFacts = {
            ...operationFacts,
            pejorativePreteritEmbed: true,
            pejorativeAttitudeSelectedByUser: true,
            sourceTopology,
            intransitiveSourceAccepted: sourceTopology === "intransitive",
            projectiveObjectSourceAccepted:
              sourceTopology === "projective-object",
            reflexiveObjectSourceAccepted:
              sourceTopology === "reflexive-object",
            sourceTopologySelectsSharedPreteritEmbedAutomatically: true,
            attitudeRouteChoiceRequired: false,
            userSelectsMatrix: false,
            userSelectsPerfectiveClassForm: false,
            userSelectsObjectReplacement: false,
            userSelectsCompoundBracketing: false,
            embeddedPredicateAspect: "perfective",
            embeddedPredicateStem: perfective,
            embeddedPredicateVerbClass: text(
              baseApplicationFrame?.normalizedRequest?.verbClass
              || request.verbClass
            ).toUpperCase(),
            embeddedTense: "preterit",
            embeddedPreteritMorph: "0",
            embeddedPreteritMorphHasSurface: false,
            fixedAffectiveMatrix: "tla-(pōl-o-ā)",
            matrixStem: matrix,
            matrixSourceNounstem: "(-pōl)-Ø-",
            matrixFormationOwner: "§54.10",
            matrixRestrictedToPejorativeConstruction: true,
            incorporatedPredicateReplacesMatrixSpecificObject: true,
            sourceObjectFrame,
            retainedSourceObjectPositions: retainedSourceObjects,
            sourceObjectPronounsPreserved:
              retainedSourceObjects.length === sourceObjectPositions.length,
            sourceObjectNumberAndRolesPreserved:
              retainedSourceObjects.length === sourceObjectPositions.length
              && retainedSourceObjects.every(position => (
                sourceObjectPositions.some(sourcePosition => (
                  text(sourcePosition.objectId) === text(position.objectId)
                  && text(sourcePosition.objectKind)
                    === text(position.objectKind)
                  && text(sourcePosition.objectPerson)
                    === text(position.objectPerson)
                  && text(sourcePosition.objectNumber)
                    === text(position.objectNumber)
                  && text(sourcePosition.governor)
                    === text(position.governor)
                ))
              )),
            sourceParticipantsPreserved:
              retainedSourceObjects.length === sourceObjectPositions.length,
            possibleDisparagedParticipants,
            disparagedParticipant: honoredParticipant,
            selectedDisparagedObjectPosition,
            disparagedParticipantChoiceRequired:
              possibleDisparagedParticipants.length > 1,
            disparagedParticipantAutomaticallySelected:
              possibleDisparagedParticipants.length === 1
                ? honoredParticipant
                : "",
            subjectObjectDisparagementAmbiguityPreserved:
              possibleDisparagedParticipants.length > 1,
            firstPersonSubjectMayBeDisparaged: firstPersonSubject,
            selfDisparagementAllowed: true,
            selfHonorificationRestrictionDoesNotApply: true,
            ownerIssuedSourceApplicationFrame: baseApplicationFrame,
            ownerIssuedSourceResultFrame: baseResult,
            ownerIssuedSourceRetained: true,
            sourceShapeDeterminesPerfectiveThroughCanonicalOwner: true,
            exampleStemWhitelistUsed: false,
            canvasExampleAuthority: false,
            callerFormulaAuthorityAccepted: false,
            callerSurfaceAuthorityAccepted: false,
          };
        }
      }
      operationFacts = {
        ...operationFacts,
        ...(operation === "pejorative"
          ? {
              disparagedParticipant: honoredParticipant,
              selfPejorativeAllowed: true,
            }
          : { honoredParticipant, selfPejorativeAllowed: false })
      };
    }
    if (!targetStem) return blockedOperation(request, "licensed-operation-did-not-produce-target-stem", ruleFamily);
    if (operation === "frequentative" && baseIsNonactive) {
      const participantTopology = (baseTyped.slots?.prePredicate || []).map(
        slot => ({
          kind: slot.kind,
          carrier: slot.carrier,
          objectKind: slot.objectPositionFrame?.objectKind || "",
        }),
      );
      operationFacts = {
        ...operationFacts,
        nonactiveSourceRecaptured: true,
        sourceVoice: selectedBaseVoice,
        impersonalGroupReading: true,
        separateIndividualActsWithinCollectiveAction: true,
        participantTopologyPreserved: true,
        sourceParticipantTopology: participantTopology,
        finiteMood: text(request.mood),
        finiteTense: text(request.tense),
      };
    }
    const ruleFamilies = new Set([ruleFamily]);
    if (operation === "frequentative") {
      if (["ordinary-short-glottal", "ordinary-long", "ordinary-short"].includes(variant)) {
        ruleFamilies.add("frequentative-prefix-shape");
      }
      if (Number(request.frequentativeRepetitions) > 1) {
        ruleFamilies.add("frequentative-recursion");
      }
      if (key(request.sourceInitialISelection) === "supportive") {
        ruleFamilies.add("frequentative-supportive-i");
      }
      if (
        variant === "reflexive-partial"
        || variant.startsWith("tla-")
        || key(request.frequentativeTarget) !== ""
          && key(request.frequentativeTarget) !== "lexical-stem"
      ) {
        ruleFamilies.add("frequentative-object");
      }
      if (baseIsNonactive) {
        ruleFamilies.add("frequentative-nonactive");
      }
    }
    if (operation === "compound") {
      [
        "compound-structure",
        "compound-valence",
        "compound-matrix-inventory"
      ].forEach(family => ruleFamilies.add(family));
      if ([
        "connective-t",
        "reflexive-matrix",
        "shared-object",
        "accompanying-possession"
      ].includes(variant)) {
        ruleFamilies.add("compound-connective-t");
        ruleFamilies.add("compound-preterit-embed");
      }
      if (["ca", "ya-uh", "cac", "itz"].includes(sourceStem)
        || baseHasIrregularCoordinate
          && baseIrregularPlan.identity?.lexemeId === "be-suppletive") {
        ruleFamilies.add("compound-irregular-embed");
      }
      if (key(request.compoundEventOrder) === "hysteron-proteron") {
        ruleFamilies.add("compound-event-order");
      }
      if (key(request.compoundNonactiveScope)
        && key(request.compoundNonactiveScope) !== "none") {
        ruleFamilies.add("compound-nonactive");
      }
    }
    if (operation === "purposive") {
      [
        "purposive-structure",
        "purposive-direction",
        "purposive-base",
        "purposive-paradigm",
        "purposive-contrast"
      ].forEach(family => ruleFamilies.add(family));
      if (["huāl", "on"].includes(
        key(request.purposiveExternalDirectional)
      )) {
        ruleFamilies.add("purposive-external-directional");
      }
      if (recursiveEmbedFrame) ruleFamilies.add("purposive-recursion");
      if (baseIsNonactive) {
        ruleFamilies.add("purposive-nonactive");
      }
    }
    if (["honorific", "reverential"].includes(operation)) {
      ruleFamilies.add("honorific-gate");
    }
    if (operation === "honorific"
      && ["causative", "applicative"].includes(variant)) {
      ruleFamilies.add(
        variant === "causative"
          ? "honorific-causative"
          : "honorific-applicative"
      );
      if (operationFacts.documentedLexicalRealizationUsed === true) {
        ruleFamilies.add("honorific-irregular");
      }
      if (operationFacts.projectiveApplicativeHonorific === true) {
        ruleFamilies.add("honorific-projective");
        ruleFamilies.add("honorific-projective-applicative");
      }
      if (operationFacts.projectiveCausativeHonorific === true) {
        ruleFamilies.add("honorific-projective");
        ruleFamilies.add("honorific-projective-causative");
      }
      if (operationFacts.derivedSourceHonorific === true) {
        ruleFamilies.add("honorific-derived-source");
      }
    }
    if (operation === "honorific" && variant === "preterit-embed") {
      ruleFamilies.add("honorific-preterit-embed");
    }
    if (operation === "reverential") ruleFamilies.add("reverential-double");
    if (operation === "pejorative") {
      ruleFamilies.add("pejorative-preterit-embed");
    }
    if (ruleFamily === "attitude-compound") {
      ruleFamilies.add("attitude-compound");
    }
    if (operation === "purposive") {
      // Keep the semantic /k/ object identity when the new directional
      // neighbor changes its c/qu/qui spelling at the final boundary.
      objectFrame = cloneObjectFrameFromTyped(baseTyped, (position, slot) => ({
        ...position,
        va1MorphIdentityFrame: slot.morphIdentityFrame || null,
      }));
    }
    let targetApplicationFrame = null;
    let retainedFinalACausativeApplication = null;
    let targetTypedFrame = null;
    const requiresCanonicalTargetInflection =
      (operation === "frequentative"
        && !inheritedIrregularPrefixCoordinate
        && !inheritedClassDPrefixCoordinate
        && !inheritedCompoundPrefixCoordinate)
      || (
        ["honorific", "reverential", "pejorative"].includes(operation)
        && (ruleFamily !== "attitude-compound"
          || operationFacts.compoundTarget === "matrix")
      );
    if (requiresCanonicalTargetInflection
      && typeof targetObject.evaluateClassicalNahuatlVncApplication
        === "function") {
      const causativeOperation = baseApplicationFrame?.resultFrame?.derivationOperationFrame;
      // This exact finite causative already establishes both its target Class B
      // and its requested coordinate. Reopening it as a lexical stem would lose
      // the homophonous causative /a/ after a consonant cluster (§24.3.2.a).
      const issuedFinalACausative = operation === "honorific" && variant === "causative"
        && targetObject.isClassicalNahuatlVncApplicationFrame?.(baseApplicationFrame) === true
        && baseApplicationFrame.authorizationStatus === "authorized"
        && baseApplicationFrame.normalizedRequest.requestedVoice === "active"
        && baseApplicationFrame.normalizedRequest.sourceVoice === "active"
        && baseApplicationFrame.resultFrame.selectedMachineryFrame === baseApplicationFrame.resultFrame.activeMachineryFrame
        && targetObject.isClassicalNahuatlVncDerivationOperationFrame?.(causativeOperation) === true
        && causativeOperation.selectedOption?.derivationRoute === "type-one-final-a-morphological-replacement"
        && causativeOperation.targetStem === targetStem && causativeOperation.targetClass === targetClass
        && baseApplicationFrame.normalizedRequest.subject === request.subject
        && baseApplicationFrame.normalizedRequest.mood === request.mood
        && baseApplicationFrame.normalizedRequest.tense === request.tense;
      retainedFinalACausativeApplication = issuedFinalACausative ? baseApplicationFrame : null;
      targetApplicationFrame = issuedFinalACausative ? baseApplicationFrame
        : targetObject.evaluateClassicalNahuatlVncApplication({
          sourceStem: targetClass === "D"
            ? targetStem.replace(/i-ā$/u, "ia").replace(/iā$/u, "ia")
            : targetStem,
          // Coordinate-condition the derived predicate through the canonical
          // direct VNC service. The attitude operation itself owns the
          // reflexive object position; this new target is not a second
          // independently licensed reflexive lexical source.
          sourceValence: "intransitive",
          // The late operation transforms an already typed Source. Preserve
          // its initial-i analysis when the derived target is sent back
          // through the canonical finite service; do not make that service
          // guess again from the target spelling.
          sourceInitialISelection: derivedTargetInitialISelection,
          verbClass: targetClass,
          subject: request.subject,
          mood: request.mood,
          tense: ["C", "D"].includes(targetClass)
            && ["preterit-as-present", "distant-past-as-past"].includes(key(request.tense))
            ? (key(request.tense) === "preterit-as-present" ? "present" : "distant-past")
            : request.tense,
          derivationType: "direct",
          requestedVoice: "active",
          voice: "active"
        });
      if (!targetObject.isClassicalNahuatlVncApplicationFrame?.(
        targetApplicationFrame
      ) || targetApplicationFrame.authorizationStatus !== "authorized") {
        return blockedOperation(
          request,
          targetApplicationFrame?.blockReason
            || "canonical-derived-target-inflection-required",
          ruleFamily
        );
      }
      const conditionedTargetTypedFrame = getBaseTypedFrame(
        targetApplicationFrame
      );
      const conditionedTargetStem = text(
        conditionedTargetTypedFrame?.slots?.predicate?.stem
      );
      const conditionedObjectFrame = objectFrame || {
        ...cloneObjectFrameFromTyped(baseTyped, objectTransform),
        stemRealization: conditionedTargetStem
      };
      let completedObjectFrame = conditionedObjectFrame;
      if (operation === "honorific" && ["causative", "applicative"].includes(variant)) {
        const positions = objectFramePositions(conditionedObjectFrame);
        const cluster = targetObject.buildClassicalNahuatlObjectClusterFrame?.(targetStem, {
          subject: request.subject,
          subjectCarrier: conditionedTargetTypedFrame?.slots?.subject?.pers1,
          predicateStem: conditionedTargetStem,
          tense: request.tense,
          objectRequests: positions.map((position, index) => ({
            ...position,
            objectId: position.objectId || `attitude-object-${index + 1}`,
            governor: position.governor || "directive",
            derivationalLevel: position.derivationalLevel || index + 1,
          })),
          minimumPositionCount: 1,
        });
        if (!targetObject.isClassicalNahuatlObjectClusterFrame?.(cluster)
          || cluster.authorizationStatus !== "authorized") {
          return blockedOperation(request, cluster?.blockReason || "canonical-attitude-object-topology-required", ruleFamily);
        }
        completedObjectFrame = {valenceArity: "multiple", positions: cluster.positions};
        operationFacts = {...operationFacts, completedObjectClusterFrame: cluster};
      }
      targetTypedFrame = conditionedTargetStem
        ? createTypedSlotFromBase(
            conditionedTargetTypedFrame,
            conditionedTargetStem,
            {
              objectFrame: {
                ...completedObjectFrame,
                stemRealization: conditionedTargetStem
              }
            }
          )
        : null;
    } else {
      targetTypedFrame = createTypedSlotFromBase(baseTyped, conditionedPrefixTargetStem || targetStem, {
        predicateTns,
        numberDyad,
        personDyad,
        objectTransform,
        objectFrame
      });
    }
    const inheritedExpandedBoundary = baseMachinery?.expandedVncBoundaryFrame || null;
    const expandedVncBoundaryFrame = operationFacts.suppletiveDirectionalPrefix
      ? targetObject.buildClassicalNahuatlExpandedVncBoundaryFrame?.({
        stem: targetStem, valence: targetValence,
        mood: request.mood, tense: request.tense,
        directionalPrefix: operationFacts.suppletiveDirectionalPrefix,
      }) || null
      : operation === "purposive"
      && ["on", "huāl"].includes(key(request.purposiveExternalDirectional))
      ? targetObject.buildClassicalNahuatlExpandedVncBoundaryFrame?.({
        stem: targetStem,
        valence: baseMachinery?.objectRelationshipRuleFrame?.valence || targetValence,
        mood: request.mood,
        tense: request.tense,
        objectRelationshipRuleFrame: baseMachinery?.objectRelationshipRuleFrame,
        directionalPrefix: request.purposiveExternalDirectional,
        outsidePrefixes: inheritedExpandedBoundary?.outsidePrefixes || [],
      }) || null
      : inheritedExpandedBoundary;
    // A late operation can rebuild the predicate through an intransitive
    // coordinate and then restore the source object positions.  Final
    // boundary realization therefore belongs after that restoration, even
    // when there is no directional prefix: pers1 supportive i and object
    // spelling depend on the completed neighboring slot order.
    if (typeof targetObject.realizeClassicalNahuatlVncSlotFrameAtFinalBoundary
      === "function") {
      const finalBoundaryRealizationFrame =
        targetObject.realizeClassicalNahuatlVncSlotFrameAtFinalBoundary({
          vncSlotFrame: targetTypedFrame,
          expandedVncBoundaryFrame,
          initialVowelKind: operation === "compound"
            ? baseApplicationFrame?.normalizedRequest?.sourceInitialIAnalysis?.resolvedKind
              || baseMachinery?.citationRuleFrame?.initialVowelKind || ""
            : targetApplicationFrame?.normalizedRequest?.sourceInitialIAnalysis?.resolvedKind
              || derivedTargetInitialISelection
              || (/^[aāeēoō]/u.test(targetStem) ? "real" : "")
        });
      if (finalBoundaryRealizationFrame?.authorizationStatus !== "authorized"
        || !targetObject.isClassicalNahuatlVncSlotFrame?.(
          finalBoundaryRealizationFrame.typedSlotFrame
        )) {
        return blockedOperation(
          request,
          finalBoundaryRealizationFrame?.blockReason
            || "canonical-expanded-vnc-boundary-realization-required",
          ruleFamily
        );
      }
      targetTypedFrame = finalBoundaryRealizationFrame.typedSlotFrame;
      operationFacts = {
        ...operationFacts,
        finalBoundaryRealizationFrame,
        ...(expandedVncBoundaryFrame?.directionalPrefix
          ? {
            externalDirectionalBoundaryFrame:
              finalBoundaryRealizationFrame
          }
          : {})
      };
    }
    if (!targetTypedFrame || typeof targetObject.isClassicalNahuatlVncSlotFrame !== "function" || !targetObject.isClassicalNahuatlVncSlotFrame(targetTypedFrame)) {
      return blockedOperation(request, "canonical-typed-slot-construction-failed", ruleFamily);
    }
    if (operation === "frequentative") {
      operationFacts = {
        ...operationFacts,
        lexicalFrequentativeMeaningFrame:
          buildLexicalFrequentativeMeaningFrame({
            variant,
            sourceStem,
            sourceApplicationFrame: baseApplicationFrame,
            targetApplicationFrame,
            targetStem,
            targetTypedVncSlotFrame: targetTypedFrame,
            operationFacts,
          }),
      };
    }
    const operationFrame = freeze({
      kind: "classical-nahuatl-late-vnc-derivation-operation-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      blockReason: "",
      operation,
      variant,
      ruleFamily,
      ruleFamilies: freeze([...ruleFamilies]),
      sourceStem,
      targetStem,
      targetClass,
      targetValence,
      sourceMachineryFrame: baseMachinery,
      compoundPredicateSourceFrame,
      sentenceMachineryFrame: compoundPredicateSourceFrame || operation === "compound" && variant === "future-embed"
        ? internalContext.matrixApplicationFrame?.resultFrame?.selectedMachineryFrame
        : baseMachinery,
      sourceTypedVncSlotFrame: baseTyped,
      targetApplicationFrame,
      targetTypedVncSlotFrame: targetTypedFrame,
      targetCoordinate: freeze({
        subject: text(request.subject),
        mood: text(targetApplicationFrame?.normalizedRequest?.mood || request.mood),
        tense: text(targetApplicationFrame?.normalizedRequest?.tense || request.tense),
      }),
      operationFacts: freeze(operationFacts),
      typedSourceAuthority: true,
      callerFormulaAuthority: false,
      callerSurfaceAuthority: false,
      storedExampleAuthority: false,
      displayTextAuthority: false
    });
    issuedOperationFrames.add(operationFrame);
    if (retainedFinalACausativeApplication) {
      finalACausativeApplicationsByOperation.set(operationFrame, retainedFinalACausativeApplication);
    }
    return operationFrame;
  }

  function isClassicalNahuatlOperationFrame(frame = null) {
    const parent = frame && finalACausativeApplicationsByOperation.get(frame);
    if (parent) {
      if (frame.targetApplicationFrame !== parent) return false;
      const applicationOwner = targetObject.isClassicalNahuatlVncApplicationFrame;
      const operationOwner = targetObject.isClassicalNahuatlVncDerivationOperationFrame;
      const checked = parentValidationTransaction?.get(parent);
      if (!checked || checked.applicationOwner !== applicationOwner || checked.operationOwner !== operationOwner) {
        if (applicationOwner?.call(targetObject, parent) !== true
          || operationOwner?.call(targetObject, parent.resultFrame?.derivationOperationFrame) !== true
          || applicationOwner !== targetObject.isClassicalNahuatlVncApplicationFrame
          || operationOwner !== targetObject.isClassicalNahuatlVncDerivationOperationFrame) return false;
        parentValidationTransaction?.set(parent, {applicationOwner, operationOwner});
      }
    }
    return Boolean(frame && issuedOperationFrames.has(frame)
      && frame.kind === "classical-nahuatl-late-vnc-derivation-operation-frame"
      && frame.version === VERSION
      && ["authorized", "blocked"].includes(frame.authorizationStatus)
      && frame.callerFormulaAuthority === false
      && frame.callerSurfaceAuthority === false);
  }
  // Internal continuation operation: consume an issued external tla, rather
  // than readmitting the already derived predicate as a new lexical Source.
  function buildClassicalNahuatlVncTlaFusionContinuationMachinery(sourceMachineryFrame, choices = {}) {
    if (targetObject.isClassicalNahuatlVncDerivationSourceMachineryFrame?.(sourceMachineryFrame) !== true) return null;
    const analysis = targetObject.buildClassicalNahuatlVncDerivationSourceAnalysisFrame(sourceMachineryFrame);
    if (targetObject.isClassicalNahuatlVncDerivationSourceAnalysisFrame?.(analysis) !== true
      || analysis.sourceMachineryFrame !== sourceMachineryFrame
      || analysis.sourceVoice !== "active") return null;
    const objects = analysis.participantSurfaceObjectRequests || [];
    const sourceTyped = sourceMachineryFrame.proofFrame?.conclusion?.finalTypedVncSlotFrame;
    // A retained finite Source can have directional slots and conditioned
    // object allomorphs (huāl + tla writes huāl-la). The issued analysis owns
    // the object's identity; its former surface carrier is not a new object.
    const slots = (sourceTyped?.slots?.prePredicate || []).filter(slot =>
      ["monadic-valence", "dyadic-valence"].includes(slot.kind));
    const eligible = objects.filter(object => object.objectKind === "nonspecific-nonhuman"
      && slots.some(slot => slot.objectPositionFrame?.objectId === object.objectId
        || (objects.length === 1 && slots.length === 1
          && slot.kind === "monadic-valence" && !slot.objectPositionFrame)));
    if (eligible.length !== 1 || slots.length !== objects.length) return null;
    const consumedObject = eligible[0];
    const consumedSlot = slots.find(slot => slot.objectPositionFrame?.objectId === consumedObject.objectId
      || (objects.length === 1 && slots.length === 1
        && slot.kind === "monadic-valence" && !slot.objectPositionFrame));
    const retainedObjects = objects.filter(object => object !== consumedObject);
    const targetValence = retainedObjects.length > 1 ? "multiple-object"
      : retainedObjects.length === 0 ? "intransitive"
      : retainedObjects[0].objectKind === "nonspecific-human" ? "projective-human"
      : retainedObjects[0].objectKind === "nonspecific-nonhuman" ? "projective-nonhuman"
      : /reflexive|reciprocal/u.test(retainedObjects[0].objectKind) ? "mainline-reflexive"
      : "specific-projective";
    const sourceStem = analysis.sourceStem;
    const sourceClass = analysis.sourceClass;
    const initialVowelKind = sourceMachineryFrame.citationRuleFrame?.initialVowelKind
      || sourceMachineryFrame.operationFrame?.targetApplicationFrame
        ?.resultFrame?.selectedMachineryFrame?.citationRuleFrame?.initialVowelKind;
    if (/^[iī]/u.test(sourceStem) && !["real", "supportive"].includes(initialVowelKind)) return null;
    const fusion = targetObject.buildClassicalNahuatlTlaFusionRuleFrame(sourceStem, {
      tlaFusion: true, valence: "projective-nonhuman",
      objectKind: consumedObject.objectKind,
      initialVowelKind,
    });
    if (fusion.authorizationStatus !== "authorized" || fusion.fused !== true
      || fusion.sourceStemVariant !== sourceStem
      || fusion.ruleVariables?.targetValence !== "intransitive") return null;
    const targetCoordinate = {subject: choices.subject, mood: choices.mood, tense: choices.tense};
    const lower = targetObject.buildClassicalNahuatlVerbstemClassFrame(fusion.derivedStem, {
      ...choices.sentenceOptions, ...targetCoordinate,
      verbClass: sourceClass, valence: targetValence,
      objectKind: retainedObjects[0]?.objectKind || "none",
      objectPerson: retainedObjects[0]?.objectPerson || "",
      tlaFusion: false, fused: false,
    });
    // These lower frames supply finite construction, not lexical admission.
    // Only the independently inherited Class D admission may be absent; every
    // other upper condition must pass. No blocked class frame is adopted.
    const inheritedClassD = sourceClass === "D"
      && lower.classRuleFrame?.classId === "D"
      && lower.classRuleFrame?.blockReason === "explicit-class-not-authorized-by-canvas-guideline-witness"
      && lower.proofFrame?.premises?.some(p => p.layer === "verbstem-class" && !p.passed)
      && lower.proofFrame.premises.every(p => p.passed || p.layer === "verbstem-class");
    const prior = lower.priorVncFrame;
    const finiteTyped = prior?.vncSlotFrame;
    const retainedPositions = objectFramePositions(cloneObjectFrameFromTyped(sourceTyped))
      .filter((position, index) => slots[index] !== consumedSlot);
    // The positions lane retains the issued governor/identity even for one
    // remaining object; the plain monadic lane carries only its morph.
    const retainedObjectFrame = retainedPositions.length
      ? {valenceArity: "multiple", positions: retainedPositions}
      : {valenceArity: "vacant"};
    const targetTyped = finiteTyped && createTypedSlotFromBase(finiteTyped,
      lower.predicateFormationRuleFrame.stemVariant, {objectFrame: retainedObjectFrame});
    if ((!inheritedClassD && lower.authorizationStatus !== "authorized")
      || lower.predicateFormationRuleFrame?.authorizationStatus !== "authorized"
      || lower.predicateFormationRuleFrame.classId !== sourceClass
      || !(prior?.authorizationStatus === "authorized"
        || (prior?.proofFrame?.authorizationStatus === "authorized"
          && prior.proofFrame.conclusion?.authorized === true && prior.blocksInput === false))
      || targetObject.isClassicalNahuatlVncSlotFrame?.(targetTyped) !== true
      || targetTyped.slots.prePredicate.length !== retainedObjects.length
      || targetTyped.slots.predicate.stem !== lower.predicateFormationRuleFrame.stemVariant
      || prior.subject !== choices.subject) return null;
    const operation = freeze({
      kind: "classical-nahuatl-late-vnc-derivation-operation-frame", version: VERSION,
      authorizationStatus: "authorized", blockReason: "",
      operation: "tla-fusion", variant: "exact-result", ruleFamily: "tla-fusion",
      sourceStem, targetStem: fusion.derivedStem,
      targetClass: sourceClass, targetValence,
      sourceMachineryFrame, sourceTypedVncSlotFrame: sourceTyped,
      sentenceMachineryFrame: {sentenceSurfaceFrame: lower.sentenceSurfaceFrame}, targetTypedVncSlotFrame: targetTyped,
      targetApplicationFrame: null, targetCoordinate,
      targetObjectRequests: retainedObjects,
      operationFacts: {
        tlaFusionRuleFrame: fusion, consumedObject,
        inheritedClass: sourceClass, classDCoordinateInherited: inheritedClassD,
        predicateFormationRuleFrame: lower.predicateFormationRuleFrame,
        priorVncFrame: prior, operationSequence: ["retained-result", "tla-fusion"],
      },
      typedSourceAuthority: true, callerFormulaAuthority: false, callerSurfaceAuthority: false,
    });
    issuedOperationFrames.add(operation);
    return buildClassicalNahuatlMachineryFrame(operation);
  }
  function buildClassicalNahuatlMachineryFrame(operationFrame = null) {
    if (!isClassicalNahuatlOperationFrame(operationFrame) || operationFrame.authorizationStatus !== "authorized") {
      return freeze({
        kind: "classical-nahuatl-late-vnc-derivation-operation-machinery-frame",
        version: VERSION,
        authorizationStatus: "blocked",
        blockReason: operationFrame?.blockReason || "authorized-operation-frame-required"
      });
    }
    const formula = targetObject.renderClassicalNahuatlVncSlotFrameFormula(operationFrame.targetTypedVncSlotFrame);
    const frequentativeObjects = operationFrame.operation === "frequentative"
      ? objectFramePositions(cloneObjectFrameFromTyped(operationFrame.targetTypedVncSlotFrame)) : [];
    const frequentativeCluster = frequentativeObjects.length > 1
      ? targetObject.buildClassicalNahuatlObjectClusterFrame?.(operationFrame.targetStem, {
        subject: operationFrame.targetCoordinate.subject,
        subjectCarrier: operationFrame.targetTypedVncSlotFrame.slots.subject.pers1,
        predicateStem: operationFrame.targetTypedVncSlotFrame.slots.predicate.stem,
        tense: operationFrame.targetCoordinate.tense,
        objectRequests: frequentativeObjects,
        minimumPositionCount: 2,
      }) : null;
    if (frequentativeObjects.length > 1
      && !targetObject.isClassicalNahuatlObjectClusterFrame?.(frequentativeCluster, operationFrame.targetStem)) {
      return freeze({kind: "classical-nahuatl-late-vnc-derivation-operation-machinery-frame",
        version: VERSION, authorizationStatus: "blocked",
        blockReason: frequentativeCluster?.blockReason || "canonical-frequentative-object-cluster-required"});
    }
    const nominalCluster = operationFrame.operation === "nominal-prefix"
      ? operationFrame.operationFacts.nominalObjectClusterFrame || null : null;
    if (nominalCluster
      && !targetObject.isClassicalNahuatlObjectClusterFrame?.(nominalCluster, operationFrame.targetStem)) {
      return freeze({kind: "classical-nahuatl-late-vnc-derivation-operation-machinery-frame",
        version: VERSION, authorizationStatus: "blocked",
        blockReason: "canonical-nominal-prefix-object-cluster-required"});
    }
    const machineryFrame = freeze({
      kind: "classical-nahuatl-late-vnc-derivation-operation-machinery-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      blockReason: "",
      operationFrame,
      sourceMachineryFrame: operationFrame.sourceMachineryFrame,
      lesson11ParadigmPlan: operationFrame.operationFacts.irregularCoordinateInherited
        ? operationFrame.operationFacts.sourceIrregularParadigmPlan
        : null,
      sentenceSurfaceFrame: operationFrame.sentenceMachineryFrame?.sentenceSurfaceFrame
        || operationFrame.sentenceMachineryFrame?.proofFrame?.conclusion?.sentenceSurfaceFrame
        || null,
      expandedVncBoundaryFrame: operationFrame.sourceMachineryFrame?.expandedVncBoundaryFrame || null,
      stem: operationFrame.targetStem,
      targetStem: operationFrame.targetStem,
      targetClass: operationFrame.targetClass,
      targetValence: operationFrame.targetValence,
      ...(frequentativeCluster || nominalCluster
        ? {targetObjectClusterFrame: frequentativeCluster || nominalCluster} : {}),
      ...(["tla-fusion", "nominal-prefix"].includes(operationFrame.operation)
        && operationFrame.targetObjectRequests
        ? {targetObjectRequests: operationFrame.targetObjectRequests} : {}),
      formulaRealization: formula,
      proofFrame: freeze({
        kind: "classical-nahuatl-late-vnc-derivation-operation-proof-frame",
        version: VERSION,
        authorizationStatus: "authorized",
        conclusion: freeze({
          authorized: true,
          finalTypedVncSlotFrame: operationFrame.targetTypedVncSlotFrame,
          formulaRealization: formula,
          selectedFormula: formula,
          authorizedFormula: formula,
          operationFrame
        })
      }),
      selectedOutputLogicFrame: freeze({
        kind: "classical-nahuatl-late-vnc-derivation-selected-output-logic-frame",
        authorizationStatus: "authorized",
        selectedFormula: formula,
        formulaStringAuthority: false
      }),
      formulaStringAuthority: false,
      surfaceStringAuthority: false
    });
    issuedMachineryFrames.add(machineryFrame);
    return machineryFrame;
  }
  function isClassicalNahuatlMachineryFrame(frame = null) {
    if (!frame || !issuedMachineryFrames.has(frame)
      || frame.kind !== "classical-nahuatl-late-vnc-derivation-operation-machinery-frame"
      || frame.authorizationStatus !== "authorized"
      || !isClassicalNahuatlOperationFrame(frame.operationFrame)
      || frame.operationFrame.authorizationStatus !== "authorized"
      || frame.proofFrame?.conclusion?.finalTypedVncSlotFrame !== frame.operationFrame.targetTypedVncSlotFrame) return false;
    const formula = targetObject.renderClassicalNahuatlVncSlotFrameFormula(frame.operationFrame.targetTypedVncSlotFrame);
    return Boolean(formula && frame.formulaRealization === formula && frame.proofFrame.conclusion.formulaRealization === formula);
  }

  function getClassicalNahuatlCompoundAttitudeMemberContext(compound, choices = {}) {
    if (!isAuthorizedClosureFrame(compound)
      || compound.operationFrame.operation !== "compound"
      || !["connective-t", "shared-object"].includes(compound.operationFrame.variant)
      || !issuedClosureRequests.has(compound)) return null;
    const facts = compound.operationFrame.operationFacts;
    const original = issuedClosureRequests.get(compound);
    const embedStem = text(facts.specialPerfectiveEmbedSource || original.sourceStem);
    const matrixStem = text(facts.matrixSuppliedStem || facts.matrixSelectionStem || original.compoundMatrixStem);
    const analysis = buildCompoundLexicalizationAnalysisFrame(choices, embedStem, matrixStem);
    if (analysis.authorizationStatus !== "authorized") return null;
    const scope = compound.operationFrame.variant === "shared-object"
      || analysis.selectedStructure === "lexicalized" ? "matrix" : "embed";
    const memberApplication = scope === "embed"
      ? compound.baseApplicationFrame : compound.matrixApplicationFrame;
    const hypotheticalCausative = scope === "embed"
      && key(choices.lateOperation) === "honorific"
      && key(choices.lateVariant) === "applicative"
      && facts.itzSourceAnalysis === "observational-itz"
      && facts.itzEmbedSense === "observational";
    const perfective = text(facts.embedStem);
    // The seeing lexeme's declared hypothetical causative (§33.10) uses
    // its perfective operand, ō, then ordinary ō→tiā. It is not itz-ti.
    const hypotheticalCausativeFrame = hypotheticalCausative ? freeze({
      kind: "classical-nahuatl-compound-hypothetical-causative-frame",
      sourceCompoundFrame: compound, sourceApplicationFrame: memberApplication,
      perfectiveOperand: perfective, hypotheticalNonactiveStem: `${perfective}-ō`,
      replacedSuffix: "ō", targetSuffix: "tiā", targetStem: `${perfective}-tiā`,
      targetClass: "C", independentFiniteAttestationClaimed: false,
      sourceRule: "33.10", surfaceStringAuthority: false,
    }) : null;
    const sourceRequest = freeze({
      sourceStem: hypotheticalCausativeFrame?.targetStem || (scope === "embed" ? embedStem : matrixStem),
      verbClass: hypotheticalCausativeFrame?.targetClass || text(memberApplication?.normalizedRequest?.verbClass || original.verbClass),
      sourceInitialISelection: scope === "embed"
        ? compound.baseApplicationFrame.normalizedRequest.sourceInitialISelection || "" : "",
      sourceValence: original.sourceValence || original.valence || "intransitive",
      objectKind: original.objectKind || "none", objectPerson: original.objectPerson || "",
      ...(original.sourceObjectRequests?.length ? {sourceObjectRequests: original.sourceObjectRequests} : {}),
      subject: compound.normalizedRequest.subject, mood: "indicative", tense: "present",
      derivationType: "direct", requestedVoice: "active",
    });
    const sourceApplicationFrame = targetObject.evaluateClassicalNahuatlVncApplication(sourceRequest);
    return freeze({kind: "classical-nahuatl-compound-attitude-member-context-frame",
      sourceCompoundFrame: compound, scope, sourceRequest, sourceApplicationFrame,
      hypotheticalCausativeFrame, lexicalizationAnalysisFrame: analysis,
      surfaceStringAuthority: false});
  }

  function reissueClassicalNahuatlCompoundCoordinate(source, choices = {}) {
    if (!isAuthorizedClosureFrame(source)
      || source.operationFrame.operation !== "compound"
      || source.operationFrame.variant !== "connective-t"
      || !issuedClosureRequests.has(source)) return null;
    const original = issuedClosureRequests.get(source);
    const sourceVoice = key(original.requestedVoice || original.voice || "active");
    if ([choices.requestedVoice, choices.voice].some(value => value && key(value) !== sourceVoice))
      return blockedClosure(choices, "compound-prefix-preserves-source-voice", "frequentative-prefix-shape");
    const coordinate = {};
    for (const field of ["subject", "mood", "tense"])
      if (choices[field] !== undefined) coordinate[field] = choices[field];
    // Re-enter the original semantic operation, never its perfective spelling.
    return evaluateClassicalNahuatlLateVncDerivation({ ...original, ...coordinate });
  }

  // Preserve the signed compound cell when a nominal manner modifier is
  // prefixed; its suppletive stem is not an independently finite lexeme.
  // §30.13: ih occupies the nominal embed; stock+ca/tz-a is
  // frequentative-like, without a copied root. Reuse the destockal owner's
  // stock extraction and coalescence rather than entering a completed stem.
  function buildClassicalNahuatlNominalIhStockFormation(sourceAuthorization) {
    if (targetObject.isClassicalNahuatlNominalConstructionSourceAuthorization?.(sourceAuthorization) !== true
      || sourceAuthorization.authorizationStatus !== "authorized"
      || sourceAuthorization.constructionKind !== "nominal-embed-vnc"
      || sourceAuthorization.nominalEmbedSelections?.relation !== "adverb"
      || sourceAuthorization.nominalEmbedSelections?.route !== "direct-adverb"
      || sourceAuthorization.lexicalFacts?.uniqueEmbedAnalysisFrame?.sourceStem !== "ih") return null;
    const selected = sourceAuthorization.nominalEmbedSelections.matrixFormation;
    const matrix = sourceAuthorization.sourceConstituents;
    if (!matrix) return null;
    const sourceStem = text(matrix.matrixStem);
    const sourceClass = text(matrix.matrixVerbClass).toUpperCase();
    const sourceValence = ({"specific-projective": "single-object", "projective-human": "single-object",
      "projective-nonhuman": "single-object", "mainline-reflexive": "single-object"})[key(matrix.matrixValence)]
      || key(matrix.matrixValence);
    const caSource = sourceClass === "B" && sourceValence === "intransitive"
      ? parseIntransitiveDestockal(sourceStem) : null;
    const tzSource = ["A", "B", "C"].includes(sourceClass)
      && ["single-object", "double-object", "triple-object"].includes(sourceValence)
      ? parseCausativeDestockal(sourceStem) : null;
    const optionIds = ["ordinary", ...(caSource ? ["destockal-ca"] : []), ...(tzSource ? ["destockal-tz-a"] : [])];
    if (selected === "ordinary") return freeze({kind: "classical-nahuatl-nominal-ih-stock-selection-frame",
      optionIds, sourceAuthorization, grammaticalOutputAuthority: false});
    if (!optionIds.includes(selected)) return null;
    const intransitive = selected === "destockal-ca";
    const parsed = intransitive ? caSource : tzSource;
    const underlyingSuffix = intransitive ? parsed.sourceSuffix : parsed.underlyingStemFormative;
    const explicitCoalescence = buildTypedRootStockCoalescence(parsed.root, parsed.stockVowel, underlyingSuffix);
    const retainedMatrix = sourceAuthorization.lexicalFacts.capturedMatrixVncResult;
    const retainedAnalysis = retainedMatrix?.sourceAnalysisFrame;
    const recovered = intransitive ? resolveFusedStockSourceAnalysis(retainedAnalysis, parsed) : null;
    const sourceCoalescenceFrame = recovered?.sourceCoalescenceFrame || explicitCoalescence;
    const targetStem = sourceCoalescenceFrame
      ? `${sourceCoalescenceFrame.resultStock}-${parsed.targetSuffix}` : parsed.targetCore;
    return freeze({
      kind: "classical-nahuatl-nominal-ih-stock-formation-frame", version: VERSION,
      authorizationStatus: "authorized", sourceAuthorization, optionIds,
      sourceStem, sourceClass, sourceValence, selectedFormation: selected,
      replacedStemFormative: parsed.sourceSuffix, targetStemFormative: parsed.targetSuffix,
      sourceStockVowel: parsed.stockVowel,
      reducedStockVowel: sourceCoalescenceFrame ? parsed.stockVowel : parsed.reducedStockVowel,
      stockLongVowelReduced: !sourceCoalescenceFrame && parsed.stockVowel !== parsed.reducedStockVowel,
      sourceCoalescenceFrame, targetStem, targetClass: intransitive ? "A" : "B",
      shortMatrixReduplicatedStem: reduplicate(targetStem, "short"),
      copiedRoot: false, reduplicativePrefix: "", nominalEmbedIsReduplication: false,
      sourceAttestationCertified: false,
      sourceFiniteResultRequired: false,
      sourceMatrixResult: retainedMatrix || null,
      formulaStringAuthority: false, surfaceStringAuthority: false,
    });
  }
  function buildClassicalNahuatlNominalVncMatrixCoordinateResult(frame) {
    if (targetObject.isClassicalNahuatlNominalVncMatrixCoordinateFrame?.(frame) !== true
      || targetObject.isClassicalNahuatlVncApplicationFrame?.(frame.matrixCoordinate) !== true
      || frame.matrixCoordinate.authorizationStatus !== "authorized") return null;
    const coordinate = frame.matrixCoordinate;
    const sourceTyped = getBaseTypedFrame(coordinate);
    const canonicalSourceStem = text(frame.canonicalVncSourceStem);
    if (!sourceTyped || !frame.embedStem || !canonicalSourceStem) return null;
    const realizedStem = `${frame.embedStem}-${text(sourceTyped.slots.predicate.stem)}`;
    // Nonactive promotion already belongs to the exact matrix coordinate.
    // Inheriting its issued slots must not restore an active object prefix.
    const incorporatedImpersonalObject = frame.coordinate.voice === "impersonal"
      && frame.operationFrame.relation === "object"
      && frame.targetObjectRequests.length === 0;
    const objectFrame = incorporatedImpersonalObject ? {valenceArity: "vacant"}
      : frame.coordinate.voice !== "active" ? null
      : frame.targetObjectRequests.length
      ? targetObject.buildClassicalNahuatlObjectClusterFrame?.(canonicalSourceStem, {
        subject: frame.coordinate.subject, subjectCarrier: sourceTyped.slots.subject.pers1,
        predicateStem: realizedStem, tense: frame.coordinate.tense,
        objectRequests: frame.targetObjectRequests, minimumPositionCount: 1,
      }) : {valenceArity: "vacant"};
    if (frame.coordinate.voice === "active" && frame.targetObjectRequests.length
      && objectFrame?.authorizationStatus !== "authorized") return null;
    const ordinaryMatrixParticipant = coordinate.resultFrame.participantProjection?.targetSubject;
    const ordinaryInherentMatrix = targetObject.isClassicalNahuatlVncApplicationIssuedFrame?.(coordinate) === true
      && coordinate.normalizedRequest.derivationType === "direct"
      && coordinate.normalizedRequest.sourceValence === "intransitive"
      && coordinate.normalizedRequest.sourceObjectRequests.length === 0
      && coordinate.resultFrame.selectedVoiceOperation === "inherent-impersonal"
      && coordinate.resultFrame.selectedVoice === "impersonal"
      && coordinate.resultFrame.selectedNonactiveOptionId === "inherent-impersonal"
      && frame.coordinate.voice === "impersonal"
      && frame.targetValence === "intransitive" && frame.targetObjectRequests.length === 0
      && coordinate.resultFrame.selectedMachineryFrame.voiceTransformationFrame.agentExpressible === false
      && coordinate.normalizedRequest.sourceSubjectFrame === ordinaryMatrixParticipant
      && isClassicalNahuatlParticipantFrame(ordinaryMatrixParticipant) && Object.isFrozen(ordinaryMatrixParticipant)
      && ordinaryMatrixParticipant.role === "subject" && ordinaryMatrixParticipant.person === "3"
      && ordinaryMatrixParticipant.number === "singular" && ordinaryMatrixParticipant.impersonal === true;
    const matrixParticipant = ordinaryInherentMatrix ? ordinaryMatrixParticipant : coordinate.resultFrame.subjectParticipantFrame;
    const inheritedNoRefParticipant = (ordinaryInherentMatrix
      || targetObject.isClassicalNahuatlImperfectiveVncApplicationFrame?.(coordinate) === true
        && targetObject.isClassicalNahuatlImperfectiveVncSourceFrame?.(coordinate.canonicalImperfectiveSourceFrame) === true
        && coordinate.canonicalImperfectiveSourceFrame.sourceAnalysis.sourceVoice === "inherent-impersonal")
      && matrixParticipant?.hasReferent === false && matrixParticipant.category === "impersonal"
      && matrixParticipant.morphologicalAgreement === frame.coordinate.subject
      ? matrixParticipant : null;
    const typed = createTypedSlotFromBase(sourceTyped, realizedStem, {objectFrame});
    if(inheritedNoRefParticipant)typed.slots.subject.participantFrame=inheritedNoRefParticipant;
    const boundary = targetObject.realizeClassicalNahuatlVncSlotFrameAtFinalBoundary?.({
      vncSlotFrame: typed, expandedVncBoundaryFrame: coordinate.resultFrame.selectedMachineryFrame.expandedVncBoundaryFrame,
      initialVowelKind: frame.initialVowelKind || "",
    });
    if (boundary?.authorizationStatus !== "authorized") return null;
    if(inheritedNoRefParticipant)boundary.typedSlotFrame.slots.subject.participantFrame=inheritedNoRefParticipant;
    const operation = freeze({
      kind: "classical-nahuatl-late-vnc-derivation-operation-frame", version: VERSION,
      authorizationStatus: "authorized", blockReason: "", operation: "nominal-prefix",
      variant: frame.operationFrame.route, ruleFamily: "incorporated-adverb/authenticated-matrix-coordinate",
      sourceStem: coordinate.normalizedRequest.sourceStem, targetStem: canonicalSourceStem,
      targetClass: frame.targetClass, targetValence: frame.targetValence,
      targetObjectRequests: frame.targetObjectRequests,
      sourceMachineryFrame: coordinate.resultFrame.selectedMachineryFrame,
      sourceTypedVncSlotFrame: sourceTyped, targetTypedVncSlotFrame: boundary.typedSlotFrame,
      targetCoordinate: frame.coordinate, sentenceMachineryFrame: coordinate.resultFrame.selectedMachineryFrame,
      operationFacts: {sourceVoice: frame.coordinate.voice, nominalMatrixCoordinateFrame: frame,
        nominalSourceAuthorizationFrame: frame.sourceAuthorizationFrame,
        nominalEmbedResult: frame.exactNounResult, sourceMatrixResult: frame.exactMatrixResult,
        matrixApplicationFrame: coordinate, finalBoundaryRealizationFrame: boundary,
        nominalObjectClusterFrame: targetObject.isClassicalNahuatlObjectClusterFrame?.(objectFrame, canonicalSourceStem) === true
          ? objectFrame : null,
        matrixCoordinateInherited: true},
      typedSourceAuthority: true, callerFormulaAuthority: false, callerSurfaceAuthority: false,
    });
    issuedOperationFrames.add(operation);
    const machinery = buildClassicalNahuatlMachineryFrame(operation);
    const finite = targetObject.buildClassicalNahuatlVncFiniteSurfaceFrame(machinery);
    if (!targetObject.isClassicalNahuatlVncFiniteSurfaceFrame?.(finite)
      || finite.authorizationStatus !== "authorized") return null;
    const result = freeze({
      kind: "classical-nahuatl-late-vnc-derivation-closure-frame", version: VERSION,
      authorizationStatus: "authorized", blockReason: "", normalizedRequest: frame.coordinate,
      selectedVoice: coordinate.resultFrame.selectedVoice,
      selectedVoiceOperation: coordinate.resultFrame.selectedVoiceOperation,
      selectedNonactiveOptionId: coordinate.resultFrame.selectedNonactiveOptionId,
      sourceAnalysisFrame: coordinate.resultFrame.sourceAnalysisFrame,
      operationFrame: operation, selectedMachineryFrame: machinery,
      finalTypedVncSlotFrame: boundary.typedSlotFrame, finiteSurfaceFrame: finite,
      greatestCommonDivisor: buildEvaluatedGcdProjection({baseApplicationFrame: coordinate,
        operationFrame: operation, machineryFrame: machinery, finiteSurfaceFrame: finite}),
      leastCommonMultiple: buildSelectedLcmProjection({lateOperation: "nominal-prefix", ...frame.coordinate}, operation, finite),
      formulaRealization: finite.formulaRealization, surfaceRealization: finite.wordRealization,
      typedFrameAuthority: true, formulaStringAuthority: false, surfaceStringAuthority: false,
      callerSuppliedAuthorityAccepted: false,
    });
    issuedClosureFrames.add(result);
    return result;
  }
  function prefixClassicalNahuatlCompoundWithNominal(sourceAuthorization, choices = {}) {
    if (targetObject.isClassicalNahuatlNominalConstructionSourceAuthorization?.(sourceAuthorization) !== true
      || sourceAuthorization.constructionKind !== "nominal-embed-vnc"
      || sourceAuthorization.authorizationStatus !== "authorized") return null;
    const facts = sourceAuthorization.lexicalFacts;
    const source = facts.capturedMatrixVncResult;
    const selections = sourceAuthorization.nominalEmbedSelections;
    const predicate = facts.capturedExactOrdinaryNncPredicateFrame;
    const noun = predicate?.canonicalResultFrame;
    const nounProjection = targetObject.getClassicalNahuatlNncContinuationSourceConstituents?.(noun);
    const prefix = text(predicate?.realizedStem);
    if (!prefix || !isAuthorizedClosureFrame(source)
      || selections?.relation !== "adverb"
      || selections.route !== "direct-adverb"
      || selections.adverbRole !== "manner"
      || selections.shapeVariant !== "ordinary"
      || targetObject.isClassicalNahuatlOrdinaryNncResult?.(noun) !== true
      || nounProjection?.canonicalResultFrame !== noun
      || nounProjection.predicateStem !== predicate.predicateStem
      || source.operationFrame.operation !== "compound"
      || source.operationFrame.variant !== "connective-t") return null;
    const original = issuedClosureRequests.get(source);
    if (!original) return null;
    const requestedTense = key(choices.tense || original.tense);
    const beMatrix = source.matrixApplicationFrame?.resultFrame?.selectedMachineryFrame
      ?.lesson11ParadigmPlan?.identity?.lexemeId === "be-suppletive";
    const tense = beMatrix && requestedTense === "distant-past" ? "general-past" : requestedTense;
    const coordinate = reissueClassicalNahuatlCompoundCoordinate(source, {
      subject: choices.subject, mood: choices.mood, tense, voice: choices.voice,
    });
    if (!isAuthorizedClosureFrame(coordinate)
      || coordinate.authorizationStatus !== "authorized") return coordinate;
    const sourceTyped = coordinate.finalTypedVncSlotFrame;
    const targetStem = `${prefix}-${text(coordinate.operationFrame.targetStem)}`;
    const typed = createTypedSlotFromBase(sourceTyped, targetStem);
    const boundary = targetObject.realizeClassicalNahuatlVncSlotFrameAtFinalBoundary?.({
      vncSlotFrame: typed, expandedVncBoundaryFrame: coordinate.selectedMachineryFrame.expandedVncBoundaryFrame,
    });
    if (boundary?.authorizationStatus !== "authorized") return null;
    const operation = freeze({
      kind: "classical-nahuatl-late-vnc-derivation-operation-frame", version: VERSION,
      authorizationStatus: "authorized", blockReason: "", operation: "nominal-prefix",
      variant: "manner", ruleFamily: "incorporated-adverb/manner",
      sourceStem: source.operationFrame.targetStem, targetStem,
      targetClass: coordinate.operationFrame.targetClass,
      targetValence: coordinate.operationFrame.targetValence,
      sourceMachineryFrame: coordinate.selectedMachineryFrame,
      sourceTypedVncSlotFrame: sourceTyped, targetTypedVncSlotFrame: boundary.typedSlotFrame,
      targetCoordinate: coordinate.operationFrame.targetCoordinate,
      sentenceMachineryFrame: coordinate.selectedMachineryFrame,
      operationFacts: {sourceVoice: choices.voice || "active", compoundSourceClosureFrame: source,
        reissuedCompoundCoordinate: coordinate, nominalSourceAuthorizationFrame: sourceAuthorization,
        nominalEmbedResult: facts.capturedEmbedResult, compoundCoordinateInherited: true,
        finalBoundaryRealizationFrame: boundary},
      typedSourceAuthority: true, callerFormulaAuthority: false, callerSurfaceAuthority: false,
    });
    issuedOperationFrames.add(operation);
    const machinery = buildClassicalNahuatlMachineryFrame(operation);
    const finite = targetObject.buildClassicalNahuatlVncFiniteSurfaceFrame(machinery);
    if (!targetObject.isClassicalNahuatlVncFiniteSurfaceFrame?.(finite)
      || finite.authorizationStatus !== "authorized") return null;
    const result = freeze({
      kind: "classical-nahuatl-late-vnc-derivation-closure-frame", version: VERSION,
      authorizationStatus: "authorized", blockReason: "", normalizedRequest: operation.targetCoordinate,
      operationFrame: operation, selectedMachineryFrame: machinery,
      finalTypedVncSlotFrame: operation.targetTypedVncSlotFrame, finiteSurfaceFrame: finite,
      greatestCommonDivisor: buildEvaluatedGcdProjection({recursiveEmbedClosureFrame: coordinate,
        operationFrame: operation, machineryFrame: machinery, finiteSurfaceFrame: finite}),
      leastCommonMultiple: buildSelectedLcmProjection({lateOperation: "nominal-prefix", ...choices}, operation, finite),
      formulaRealization: finite.formulaRealization, surfaceRealization: finite.wordRealization,
      typedFrameAuthority: true, formulaStringAuthority: false, surfaceStringAuthority: false,
      callerSuppliedAuthorityAccepted: false,
    });
    issuedClosureFrames.add(result);
    return result;
  }
  function evaluateClassicalNahuatlLateVncDerivation(request = {}, internalEvaluation = {}) {
    if (targetObject.isClassicalNahuatlImperfectiveVncApplicationFrame?.(request.sourceApplicationFrame) === true)
      return blockedClosure(request,"independent-perfective-class-required-for-derived-source");
    if (isClassicalNahuatlCompoundPredicateBindingFrame(request)) {
      if (request.bindingStatus !== "ready") return blockedClosure({}, request.blockReason || "compound-predicate-choices-required");
      request = compoundPredicateBindingRequests.get(request);
    }
    const requestHasAttitudeCompoundSource = Boolean(
      isAuthorizedClosureFrame(request.attitudeCompoundClosureFrame)
      || (text(request.sourceEmbedStem) && text(request.sourceMatrixStem))
    );
    const requestedSourceValence = key(
      request.sourceValence
      || request.valence
      || request.sourceApplicationFrame?.normalizedRequest?.sourceValence
      || request.sourceApplicationFrame?.normalizedRequest?.targetValence
    );
    if (key(request.lateOperation) === "honorific"
      && !key(request.lateVariant)
      && requestedSourceValence === "mainline-reflexive") {
      // §33.7 makes the preterit-embed route a consequence of typed object
      // topology. The user does not choose this matrix or its bracketing.
      request = { ...request, lateVariant: "preterit-embed" };
    }
    const depth = Number(internalEvaluation.depth || 0);
    if (depth > 4) {
      const blocked = freeze({
        kind: "classical-nahuatl-late-vnc-derivation-closure-frame",
        version: VERSION,
        authorizationStatus: "blocked",
        blockReason: "typed-operation-recursion-depth-exceeded",
        formulaStringAuthority: false,
        surfaceStringAuthority: false
      });
      issuedClosureFrames.add(blocked);
      return blocked;
    }
    if (
      key(request.lateOperation) === "honorific"
      && HONORIFIC_PRODUCTIVE_FORMATIONS.includes(key(request.lateVariant))
      && !requestHasAttitudeCompoundSource
    ) {
      const earlyHonorificAnalysis = buildHonorificFormationAnalysisFrame(
        request,
        text(request.sourceStem || request.stem),
      );
      if (
        earlyHonorificAnalysis.authorizationStatus === "authorized"
        && earlyHonorificAnalysis.moodRestriction === "no-optative"
        && key(request.mood) === "optative"
      ) {
        return blockedClosure(
          request,
          "huica-tz-honorific-has-no-optative",
          "honorific-irregular",
        );
      }
    }
    if (key(request.lateOperation) === "purposive"
      && !["none", "on", "huāl"].includes(
        key(request.purposiveExternalDirectional || "none")
      )) {
      return blockedClosure(
        request,
        "licensed-external-directional-required",
        "purposive-external-directional"
      );
    }
    const baseRequest = { ...request };
    [
      "lateOperation", "extendedOperation", "lateVariant", "extendedVariant",
      "frequentativeRepetitions", "frequentativeScope", "frequentativeTarget",
      "frequentativeReplacementSyllable", "frequentativeInitialITreatment",
      "compoundMatrixStem", "compoundMatrixClass",
      "compoundMatrixInitialISelection", "compoundMatrixNonactiveOptionId", "compoundSubjectAnimacy",
      "compoundPossessiveStem", "compoundPossessor",
      "compoundItzSense", "compoundYaSyncopation",
      "compoundEventOrder", "compoundNonactiveScope", "purposiveDirection",
      "purposiveSeries", "purposiveIrregularPluralN", "purposiveExternalDirectional",
      "purposiveSoundedFutureMorph", "purposiveEarlySingularGlottal",
      "honoredParticipant", "honorificDerivationOptionId",
      "honorificStemAlternative", "honorificFormationAnalysis",
      "compoundLexicalizationAnalysis",
      "attitudeCompoundTarget",
      "recursiveEmbedClosureFrame", "compoundEmbedClosureFrame",
      "compoundMatrixClosureFrame", "compoundMatrixVncResultFrame",
      "attitudeCompoundClosureFrame", "attitudeMemberTransformationFrame",
      "sourceApplicationFrame", "compoundPredicateSourceFrame", "attitudeSourceClosureFrame",
      "compoundEmbedAllomorphSourceClosureFrame",
      "formula", "surface", "selectedFormula", "authorizationStatus",
      "operationFrame", "machineryFrame", "targetTypedVncSlotFrame"
    ].forEach(field => delete baseRequest[field]);
    if (key(request.lateOperation) === "compound"
      && text(request.sourceStem || request.stem) === "itz") {
      const itzSense = key(request.compoundItzSense);
      if (itzSense === "motion") {
        // Motion itz is a compound-only perfective member of the huītz
        // paradigm.  Recapture that typed lexeme instead of pretending that
        // it is an independently finite simple stem.
        baseRequest.sourceStem = "huī-tz";
        baseRequest.lexicalReading = "";
        baseRequest.mood = "indicative";
        baseRequest.tense = "preterit-as-present";
      } else {
        // The observational lexeme is perfective-only.  A connective-t embed
        // consumes that authorized preterit predicate even when the matrix is
        // being inflected at another coordinate.
        baseRequest.lexicalReading = "alert-observant";
        baseRequest.mood = "indicative";
        baseRequest.tense = "preterit";
      }
    }
    if (key(request.lateOperation) === "compound"
      && key(request.lateVariant) === "shared-object"
      && text(request.sourceStem || request.stem) === "ē-hua") {
      // In the shared-object construction ēhua supplies its Class A
      // perfective automatically.  The Canvas fact is a construction rule,
      // not a lexical picker or a whitelist entry.
      baseRequest.verbClass = "A";
    }
    if (key(request.lateOperation) === "compound"
      && key(request.lateVariant) === "future-embed") {
      // The Source member of this construction is always an owner-issued
      // future VNC supplement. The user's ordinary Mood and Tense selections
      // belong to the matrix and are restored on the completed compound.
      baseRequest.mood = "indicative";
      baseRequest.tense = "future";
      baseRequest.sentenceType = "statement";
      baseRequest.introductoryParticle = "none";
      // Antecessive belongs to the finite matrix. Leaving it on the future
      // supplement would ask the ordinary VNC owner for an impossible
      // antecessive-future cell and would erase the owner-issued supplement.
      delete baseRequest.sentenceAntecessive;
      delete baseRequest.antecessive;
      delete baseRequest.requestedPrefixStackMode;
      delete baseRequest.prefixStackMode;
      if (Array.isArray(baseRequest.outsidePrefixes)) {
        baseRequest.outsidePrefixes = baseRequest.outsidePrefixes.filter(
          prefix => prefix !== "ō#",
        );
      }
    }
    if (key(request.lateOperation) === "purposive") {
      const purposiveSeries = key(request.purposiveSeries);
      const optativeSeries = purposiveSeries.endsWith("-optative");
      baseRequest.mood = optativeSeries ? "optative" : "indicative";
      baseRequest.tense = optativeSeries ? "nonpast" : "present";
      if (optativeSeries) {
        baseRequest.sentenceType = "wish-sentence";
        baseRequest.introductoryParticle = "mā";
      }
      // Antecessive belongs to the completed outbound-past Purposive, not to
      // the present finite Source used to construct its future embed.
      delete baseRequest.sentenceAntecessive;
      delete baseRequest.antecessive;
      delete baseRequest.requestedPrefixStackMode;
      delete baseRequest.prefixStackMode;
      const externalDirectional = key(request.purposiveExternalDirectional || "none");
      if (externalDirectional !== "none") baseRequest.directionalPrefix = externalDirectional;
    }
    const compoundNonactiveScope = key(request.compoundNonactiveScope || "none");
    if (key(request.lateOperation) === "compound"
      && ["none", "matrix"].includes(compoundNonactiveScope)) {
      baseRequest.requestedVoice = "active";
      baseRequest.voice = "active";
      baseRequest.nonactiveOptionId = "";
    }
    const hasSourceApplicationFrame = Object.prototype.hasOwnProperty.call(
      request,
      "sourceApplicationFrame"
    );
    const sourceApplicationFrame = hasSourceApplicationFrame
      && typeof targetObject.isClassicalNahuatlVncApplicationFrame === "function"
      && targetObject.isClassicalNahuatlVncApplicationFrame(
        request.sourceApplicationFrame
      )
      && request.sourceApplicationFrame?.authorizationStatus === "authorized"
      ? request.sourceApplicationFrame
      : null;
    const requestedSourceDerivationKind = key(request.sourceDerivationKind);
    const sourceDerivationKind = key(
      sourceApplicationFrame?.resultFrame?.selectedDerivation
      || sourceApplicationFrame?.normalizedRequest?.derivationType
    );
    const hasCompoundPredicateSource = Object.prototype.hasOwnProperty.call(request, "compoundPredicateSourceFrame");
    const compoundPredicateSourceFrame = hasCompoundPredicateSource
      ? isClassicalNahuatlCompoundPredicateSourceFrame(request.compoundPredicateSourceFrame)
        ? request.compoundPredicateSourceFrame : null
      : key(request.lateOperation) === "compound" && text(request.sourceStem || request.stem) === "cac"
        ? buildClassicalNahuatlCompoundPredicateSourceFrame(request) : null;
    let baseApplicationFrame = compoundPredicateSourceFrame ? null : sourceApplicationFrame
      || (typeof targetObject.evaluateClassicalNahuatlVncApplication === "function"
        ? targetObject.evaluateClassicalNahuatlVncApplication(baseRequest)
        : null);
    let constructionEmbedClassFrame = null;
    if (sourceApplicationFrame
      && key(request.lateOperation) === "compound"
      && key(request.lateVariant) === "shared-object"
      && text(request.sourceStem || request.stem) === "ē-hua"
      && sourceApplicationFrame.normalizedRequest?.sourceStem === "ē-hua"
      && sourceApplicationFrame.normalizedRequest?.verbClass === "B"
      && ["specific-projective", "projective-human", "projective-nonhuman"]
        .includes(sourceApplicationFrame.normalizedRequest?.sourceValence)
      && key(sourceApplicationFrame.resultFrame?.selectedDerivation) === "direct"
      && key(sourceApplicationFrame.controlFrame?.selectedVoiceOperation || "active") === "active") {
      // §28.10 gives this transitive embed a Class A perfective. Issue its
      // construction operand without relabeling the retained ordinary B Source.
      const embedApplicationFrame = targetObject.evaluateClassicalNahuatlVncApplication({
        ...sourceApplicationFrame.normalizedRequest.sentenceOptions,
        sourceLexemeId: sourceApplicationFrame.normalizedRequest.sourceLexemeId,
        sourceStem: sourceApplicationFrame.normalizedRequest.sourceStem,
        sourceInitialISelection: sourceApplicationFrame.normalizedRequest.sourceInitialISelection,
        verbClass: "A",
        subject: sourceApplicationFrame.normalizedRequest.subject,
        ...(sourceApplicationFrame.normalizedRequest.sourceSubjectExplicit ? {
          sourceSubject: sourceApplicationFrame.normalizedRequest.sourceSubject,
          sourceSubjectPerson: sourceApplicationFrame.normalizedRequest.sourceSubjectPerson,
          sourceSubjectNumber: sourceApplicationFrame.normalizedRequest.sourceSubjectNumber,
          sourceSubjectAnimacy: sourceApplicationFrame.normalizedRequest.sourceSubjectAnimacy,
          sourceSubjectHumanness: sourceApplicationFrame.normalizedRequest.sourceSubjectHumanness,
        } : {}),
        sourceValence: sourceApplicationFrame.normalizedRequest.sourceValence,
        sourceObjectRequests: sourceApplicationFrame.normalizedRequest.sourceObjectRequests.map(
          ({ participantFrame, ...position }) => position,
        ),
        mood: sourceApplicationFrame.normalizedRequest.mood,
        tense: sourceApplicationFrame.normalizedRequest.tense,
        derivationType: "direct",
        requestedVoice: "active",
      });
      if (embedApplicationFrame?.authorizationStatus !== "authorized") {
        return blockedClosure(request, "canonical-shared-object-embed-class-required", "compound-shared-object");
      }
      constructionEmbedClassFrame = freeze({
        kind: "construction-embed-class-frame",
        ruleFamily: "shared-object-ēhua-class-a-perfective",
        sourceApplicationFrame,
        sourceClass: "B",
        embedClass: "A",
        embedApplicationFrame,
      });
      baseApplicationFrame = embedApplicationFrame;
    }
    const honorificSourceApplicationFrame = baseApplicationFrame;
    let compoundEmbedFiniteCoordinateDecoupled = Boolean(
      key(request.lateOperation) === "compound"
      && key(request.lateVariant) === "future-embed"
      && baseApplicationFrame?.authorizationStatus === "authorized"
      && key(baseApplicationFrame?.normalizedRequest?.tense) === "future"
      && key(request.tense || "present") !== "future"
    );
    if (key(request.lateOperation) === "compound"
      && !compoundPredicateSourceFrame
      && !sourceApplicationFrame
      && baseApplicationFrame?.authorizationStatus !== "authorized"
      && typeof targetObject.evaluateClassicalNahuatlVncApplication === "function") {
      // A connective compound embeds the Source perfective with zero preterit.
      // Its matrix, not that embedded Source, bears the requested finite
      // coordinate.  Retry only the embedded Source at its own canonical
      // perfective coordinate when a matrix-only tense is unavailable to it.
      baseApplicationFrame = targetObject.evaluateClassicalNahuatlVncApplication({
        ...baseRequest,
        mood: "indicative",
        tense: "preterit",
        sentenceType: "statement",
        introductoryParticle: "none",
      });
      compoundEmbedFiniteCoordinateDecoupled =
        baseApplicationFrame?.authorizationStatus === "authorized";
    }
    const genericRecursiveEmbedClosureFrame = isAuthorizedClosureFrame(
      request.recursiveEmbedClosureFrame
    )
      ? request.recursiveEmbedClosureFrame
      : null;
    const compoundEmbedClosureFrame = isAuthorizedClosureFrame(
      request.compoundEmbedClosureFrame
    )
      ? request.compoundEmbedClosureFrame
      : null;
    const attitudeSourceClosureFrame = isAuthorizedClosureFrame(
      request.attitudeSourceClosureFrame
    ) && request.attitudeSourceClosureFrame?.operationFrame?.operation
      === "honorific"
      ? request.attitudeSourceClosureFrame
      : null;
    let recursiveEmbedClosureFrame = genericRecursiveEmbedClosureFrame
      || attitudeSourceClosureFrame
      || compoundEmbedClosureFrame;
    const recursiveMatrixClosureFrame = isAuthorizedClosureFrame(
      request.compoundMatrixClosureFrame
    )
      ? request.compoundMatrixClosureFrame
      : null;
    // A nominally composed matrix is an exact parent Result, not a closure
    // alias or a new lexical input. Its authenticated child supplies coordinates.
    const nominalMatrixResult = request.compoundMatrixVncResultFrame || null;
    const nominalMatrixChild = nominalMatrixResult?.canonicalResult?.resultFrame;
    const nominalMatrixProjection = nominalMatrixResult
      && targetObject.isClassicalNahuatlNominalConstructionResult?.(nominalMatrixResult) === true
      && nominalMatrixResult.authorizationStatus === "authorized"
      && nominalMatrixResult.constructionKind === "nominal-embed-vnc"
      ? targetObject.getClassicalNahuatlVncContinuationSourceConstituents?.(nominalMatrixChild)
      : null;
    if (nominalMatrixResult && (!nominalMatrixProjection
      || request.compoundMatrixClosureFrame
      || key(request.lateOperation) !== "compound")) {
      return blockedClosure(request, "exact-nominal-compound-matrix-required", "compound-matrix-analysis");
    }
    if (nominalMatrixProjection && (
      text(request.compoundMatrixStem || request.matrixStem)
        && text(request.compoundMatrixStem || request.matrixStem) !== nominalMatrixProjection.sourceStem
      || text(request.compoundMatrixClass)
        && text(request.compoundMatrixClass).toUpperCase() !== nominalMatrixProjection.verbClass
      || text(request.compoundMatrixInitialISelection)
        && text(request.compoundMatrixInitialISelection) !== nominalMatrixProjection.sourceInitialISelection
    )) {
      return blockedClosure(request, "typed-matrix-request-continuity-required", "compound-matrix-analysis");
    }
    // §33.7 contrasts an applicative made from a mainline-reflexive
    // Source (now shunt ne + mainline tē) with a nonreflexive derived Source.
    // Its honor relation retains the actual applicative stem; it does not
    // add another liā. Admission follows the issued inner operation, not
    // the identity or spelling of its example.
    const innerApplicative = sourceApplicationFrame?.resultFrame?.derivationOperationFrame;
    const innerParticipants = innerApplicative?.participantTransformFrame;
    const shuntlineApplicativeHonorPreservesStem = key(request.lateOperation) === "honorific"
      && key(request.lateVariant) === "applicative"
      && innerApplicative?.derivationType === "applicative"
      && innerParticipants?.sourceVoice === "active"
      && innerParticipants.sourceObjectRequests?.length === 1
      && innerParticipants.sourceObjectRequests[0].objectKind === "reflexive"
      && innerApplicative.sourceTypedVncSlotFrame?.valenceArity === "dyadic"
      && innerParticipants.retainedTargetObjectRequests?.length === 1
      && innerParticipants.retainedTargetObjectRequests[0].objectKind === "reflexive"
      && innerParticipants.retainedTargetObjectRequests[0].objectPerson === "nonfirst-common"
      && innerParticipants.addedObjectRequest?.objectKind === "nonspecific-human";
    let honorificDerived = false;
    let honorificDerivationAttempted = false;
    let honorificDerivationBlockReason = "";
    const lateOperation = key(request.lateOperation);
    const lateVariant = key(request.lateVariant);
    const honorificFormationAnalysisFrame =
      lateOperation === "honorific"
        && HONORIFIC_PRODUCTIVE_FORMATIONS.includes(lateVariant)
        && !requestHasAttitudeCompoundSource
        ? buildHonorificFormationAnalysisFrame(
            request,
            text(request.sourceStem || request.stem),
            honorificSourceApplicationFrame,
          )
        : null;
    if (
      honorificFormationAnalysisFrame
      && honorificFormationAnalysisFrame.authorizationStatus !== "authorized"
    ) {
      return blockedClosure(
        request,
        honorificFormationAnalysisFrame.blockReason,
        "honorific-gate",
      );
    }
    if (
      honorificFormationAnalysisFrame
      && honorificFormationAnalysisFrame.selectedFormationLicensed !== true
    ) {
      return blockedClosure(
        request,
        "honorific-formation-not-licensed-by-typed-source-analysis",
        "honorific-gate",
      );
    }
    if (lateOperation === "honorific"
      && ["causative", "applicative"].includes(lateVariant)
      && !shuntlineApplicativeHonorPreservesStem
      && (!honorificFormationAnalysisFrame?.selectedOption
        || honorificFormationAnalysisFrame.selectedOption.derivationRoute)
      && typeof targetObject.evaluateClassicalNahuatlVncApplication === "function") {
      honorificDerivationAttempted = true;
      const honorificRequest = {
        ...baseRequest,
        requestedDerivation: lateVariant,
        derivationType: lateVariant,
        derivationOptionId: text(request.honorificDerivationOptionId),
        ...(lateVariant === "causative"
          ? { causativeObjectKind: "reflexive" }
          : { applicativeObjectKind: "reflexive", applicativeObjectPerson: "" })
      };
      // A documented choice may select an ordinary formation recipe. The
      // ordinary owner constructs it; the evidence's target is not a substitute.
      const formationRoute = honorificFormationAnalysisFrame?.selectedOption?.derivationRoute;
      if (formationRoute) {
        const preview = targetObject.evaluateClassicalNahuatlVncApplication(honorificRequest);
        const option = preview.controlFrame?.derivationOptionInventory?.options
          ?.find(candidate => candidate.derivationRoute === formationRoute);
        if (!option) return blockedClosure(
          request, "licensed-honorific-derivation-route-required", "honorific-gate"
        );
        honorificRequest.derivationOptionId = option.optionId;
      }
      const honorificApplicationFrame = sourceApplicationFrame
        ? targetObject.evaluateClassicalNahuatlVncApplication(
            honorificRequest,
            sourceApplicationFrame.resultFrame
          )
        : targetObject.evaluateClassicalNahuatlVncApplication(
            honorificRequest
          );
      if (honorificApplicationFrame?.authorizationStatus === "authorized") {
        baseApplicationFrame = honorificApplicationFrame;
        honorificDerived = true;
      } else {
        honorificDerivationBlockReason = text(honorificApplicationFrame?.blockReason);
      }
    }
    const requestedMatrixStem = text(
      recursiveMatrixClosureFrame?.operationFrame?.targetStem
      || nominalMatrixProjection?.sourceStem
      || request.compoundMatrixStem
      || request.matrixStem
    );
    const reflexiveMatrixAnalysis = lateVariant === "reflexive-matrix"
      ? normalizeReflexiveMatrixAnalysis(requestedMatrixStem)
      : null;
    const matrixStem = reflexiveMatrixAnalysis?.canonicalStem
      || requestedMatrixStem;
    const derivedMatrixClass = recursiveMatrixClosureFrame
      ? text(recursiveMatrixClosureFrame.operationFrame?.targetClass)
      : nominalMatrixProjection?.verbClass || deriveCompoundMatrixClass(
          reflexiveMatrixAnalysis?.coreStem || matrixStem,
          request.compoundMatrixClass
        );
    const futureMatrixAnalysis = lateVariant === "future-embed"
      ? analyzeFutureEmbedMatrix(matrixStem)
      : null;
    const matrixApplicationSourceStem = lateVariant === "future-embed"
      ? futureMatrixAnalysis?.lexicalStem || matrixStem
      : matrixStem === "ca"
      ? "ye"
      : matrixStem === "o"
        ? "on-o"
        : matrixStem;
    const matrixNeedsNonactive = ["matrix", "both"].includes(
      compoundNonactiveScope
    );
    const matrixApplicationRequest = {
        ...(lateVariant === "future-embed" ? {
          sentenceOptions: { ...request.sentenceOptions, ...request }
        } : {}),
        sourceStem: matrixApplicationSourceStem,
        sourceValence: lateVariant === "shared-object"
          ? text(request.sourceValence || request.valence || "specific-projective")
          : lateVariant === "future-embed"
            ? "specific-projective"
          : "intransitive",
        objectKind: lateVariant === "shared-object"
          ? text(request.objectKind)
          : lateVariant === "future-embed"
            ? "specific-projective"
          : "",
        objectPerson: lateVariant === "shared-object"
          ? text(request.objectPerson)
          : lateVariant === "future-embed"
            ? "3sg"
          : "",
        objectNumber: lateVariant === "shared-object"
          ? text(request.objectNumber)
          : "",
        verbClass: derivedMatrixClass,
        sourceInitialISelection: text(
          request.compoundMatrixInitialISelection
        ),
        subject: request.subject,
        mood: request.mood,
        tense: request.tense,
        derivationType: "direct",
        // A matrix in the nonactive stem is structurally impersonal even when
        // the compound as a whole has passive force through its embed.
        requestedVoice: matrixNeedsNonactive ? "impersonal" : "active",
        voice: matrixNeedsNonactive ? "impersonal" : "active",
        nonactiveOptionId: matrixNeedsNonactive
          ? text(request.compoundMatrixNonactiveOptionId) : ""
    };
    let matrixApplicationFrame = null;
    let inheritedMatrixRequest = null;
    if (key(request.lateOperation) === "compound" && matrixStem
      && typeof targetObject.evaluateClassicalNahuatlVncApplication === "function") {
      if (nominalMatrixProjection) {
        inheritedMatrixRequest = Object.fromEntries([
          "sourceStem", "sourceLexemeId", "sourceInitialISelection", "verbClass",
          "sourceValence", "sourceSubject", "sourceObjectRequests", "sourceVoice",
          "sourceNonactiveOptionId", "objectKind", "objectPerson",
        ].map(field => [field, nominalMatrixProjection[field]]));
        matrixApplicationFrame = targetObject.evaluateClassicalNahuatlVncApplication({
          ...inheritedMatrixRequest,
          subject: request.subject, mood: request.mood, tense: request.tense,
          requestedDerivation: "direct", requestedVoice: matrixApplicationRequest.requestedVoice,
          voice: matrixApplicationRequest.voice,
          nonactiveOptionId: matrixApplicationRequest.nonactiveOptionId,
        }, nominalMatrixChild);
      } else {
        matrixApplicationFrame = targetObject.evaluateClassicalNahuatlVncApplication(
          matrixApplicationRequest
        );
      }
      if (matrixNeedsNonactive
        && !text(request.compoundMatrixNonactiveOptionId)
        && matrixApplicationFrame?.authorizationStatus !== "authorized") {
        const matrixNonactiveInventory = matrixApplicationFrame?.controlFrame
          ?.nonactiveOptionInventory;
        const matrixNonactiveOptionId = text(
          matrixNonactiveInventory?.selectionRequired ? "" : (
          matrixNonactiveInventory?.automaticOptionId
          || (
            matrixNonactiveInventory?.options?.length === 1
              ? matrixNonactiveInventory.options[0]?.optionId
              : ""
          )
          || matrixNonactiveInventory?.options?.find?.(
            option => option.operationId === "inherent-impersonal"
          )?.optionId
          )
        );
        if (matrixNonactiveOptionId) {
          matrixApplicationFrame = targetObject.evaluateClassicalNahuatlVncApplication({
            ...(inheritedMatrixRequest || matrixApplicationRequest),
            subject: request.subject, mood: request.mood, tense: request.tense,
            requestedDerivation: "direct",
            requestedVoice: matrixApplicationRequest.requestedVoice,
            voice: matrixApplicationRequest.voice,
            nonactiveOptionId: matrixNonactiveOptionId
          }, nominalMatrixProjection ? nominalMatrixChild : null);
        }
      }
    }
    let futureSupplementationFrame = null;
    if (lateOperation === "compound"
      && lateVariant === "future-embed"
      && baseApplicationFrame?.authorizationStatus === "authorized"
      && matrixApplicationFrame?.authorizationStatus === "authorized"
      && typeof targetObject
        .buildClassicalNahuatlSupplementationClauseEnvelope === "function"
      && typeof targetObject.evaluateClassicalNahuatlSupplementationOperation
        === "function") {
      const sharedSubjectReferenceId = `future-embed-subject:${text(
        request.subject || "3sg",
      )}`;
      const supplementReferenceId = "future-embed-supplement-vnc";
      const principalClause = targetObject
        .buildClassicalNahuatlSupplementationClauseEnvelope(
          matrixApplicationFrame,
          {
            referenceId: "future-embed-principal-vnc",
            subjectReferenceId: sharedSubjectReferenceId,
            objectReferenceId: supplementReferenceId,
          },
        );
      const supplementClause = targetObject
        .buildClassicalNahuatlSupplementationClauseEnvelope(
          baseApplicationFrame,
          {
            referenceId: supplementReferenceId,
            subjectReferenceId: sharedSubjectReferenceId,
            objectReferenceId: "future-embed-internal-object",
          },
        );
      futureSupplementationFrame = targetObject
        .evaluateClassicalNahuatlSupplementationOperation({
          operationKind: "relation",
          principalClause,
          supplementClause,
          options: {
            referenceMode: "included",
            headRole: "object",
            supplementContactRole: "subject",
            order: "principal-first",
            wishRealizability: "realizable",
          },
        });
    }
    const possessiveSupplementFrame = lateOperation === "compound"
      && lateVariant === "accompanying-possession"
      ? buildAccompanyingPossessionSupplement(request)
      : null;
    let attitudeCompoundClosureFrame = isAuthorizedClosureFrame(
      request.attitudeCompoundClosureFrame
    )
      ? request.attitudeCompoundClosureFrame
      : null;
    let attitudeMemberTransformationFrame = isAuthorizedClosureFrame(
      request.attitudeMemberTransformationFrame
    )
      ? request.attitudeMemberTransformationFrame
      : null;
    let attitudeMemberPerfectiveStem = "";
    let attitudeMemberPerfectiveFrame = null;
    let attitudeTarget = "";
    let attitudeScopeBasis = "";
    let compoundLexicalizationAnalysisFrame = null;
    let attitudeSourceObjectFrame = null;
    const requestsAttitudeCompound = Boolean(
      attitudeCompoundClosureFrame
      || (text(request.sourceEmbedStem) && text(request.sourceMatrixStem))
    );
    if (!internalEvaluation.suppressAttitude
      && ["honorific", "reverential", "pejorative"].includes(lateOperation)
      && requestsAttitudeCompound) {
      if (!attitudeCompoundClosureFrame) {
        const embedStem = text(request.sourceEmbedStem);
        const sourceMatrixStem = text(request.sourceMatrixStem);
        if (embedStem && sourceMatrixStem) {
          const sourceCompoundVariant =
            SHARED_OBJECT_COMPOUND_MATRICES.has(sourceMatrixStem)
              ? "shared-object"
              : "connective-t";
          attitudeCompoundClosureFrame =
            evaluateClassicalNahuatlLateVncDerivation({
              ...request,
              sourceStem: embedStem,
              lateOperation: "compound",
              lateVariant: sourceCompoundVariant,
              compoundMatrixStem: sourceMatrixStem,
              compoundMatrixClass: text(request.compoundMatrixClass || "A"),
              attitudeCompoundTarget: "",
              sourceEmbedStem: "",
              sourceMatrixStem: ""
            }, {
              depth: depth + 1,
              suppressAttitude: true
            });
        }
      }
      const compoundVariant = key(
        attitudeCompoundClosureFrame?.operationFrame?.variant
      );
      const compoundEmbedStem = text(
        attitudeCompoundClosureFrame?.operationFrame?.operationFacts?.embedStem
      );
      const compoundMatrixStem = text(
        attitudeCompoundClosureFrame?.operationFrame?.operationFacts?.matrixStem
      );
      const compoundSourceEmbedStem = text(
        attitudeCompoundClosureFrame?.operationFrame?.operationFacts
          ?.specialPerfectiveEmbedSource
        || compoundEmbedStem,
      );
      const compoundSourceMatrixStem = text(
        attitudeCompoundClosureFrame?.operationFrame?.operationFacts
          ?.matrixSuppliedStem
        || attitudeCompoundClosureFrame?.operationFrame?.operationFacts
          ?.matrixSelectionStem
        || compoundMatrixStem,
      );
      compoundLexicalizationAnalysisFrame =
        buildCompoundLexicalizationAnalysisFrame(
          request,
          compoundSourceEmbedStem,
          compoundSourceMatrixStem,
        );
      if (compoundLexicalizationAnalysisFrame.authorizationStatus !== "authorized") {
        return blockedClosure(
          request,
          compoundLexicalizationAnalysisFrame.blockReason,
          "attitude-compound",
        );
      }
      attitudeSourceObjectFrame = cloneObjectFrameFromTyped(
        attitudeCompoundClosureFrame?.finalTypedVncSlotFrame,
      );
      const selectedCompoundStructure = key(
        compoundLexicalizationAnalysisFrame.selectedStructure,
      );
      attitudeTarget = compoundVariant === "shared-object"
        || selectedCompoundStructure === "lexicalized"
        ? "matrix"
        : "embed";
      attitudeScopeBasis = compoundVariant === "shared-object"
        ? "shared-object-compound"
        : selectedCompoundStructure === "lexicalized"
          ? "typed-lexicalized-unity"
          : "compositional-intransitive-matrix";
      const memberStem = attitudeTarget === "embed"
        ? compoundSourceEmbedStem
        : compoundSourceMatrixStem;
      if (!attitudeMemberTransformationFrame && memberStem) {
        const memberContext = getClassicalNahuatlCompoundAttitudeMemberContext(attitudeCompoundClosureFrame, request);
        const memberSourceRequest = memberContext?.sourceRequest || {};
        attitudeMemberTransformationFrame =
          evaluateClassicalNahuatlLateVncDerivation({
            ...memberSourceRequest,
            honorificDerivationOptionId: request.honorificDerivationOptionId || "",
            honorificStemAlternative: request.honorificStemAlternative || "default",
            honoredParticipant: request.honoredParticipant || "subject",
            sourceEmbedStem: "",
            sourceMatrixStem: "",
            attitudeCompoundTarget: "",
            attitudeCompoundClosureFrame: null,
            attitudeMemberTransformationFrame: null,
            compoundLexicalizationAnalysis: undefined,
            lateOperation,
            lateVariant: lateOperation === "honorific"
              ? ["applicative", "causative"].includes(lateVariant)
                ? lateVariant
                : "applicative"
              : "preterit-embed",
            sourceValence: memberSourceRequest.sourceValence,
          }, {
            depth: depth + 1,
            suppressAttitude: true
          });
      }
      if (isAuthorizedClosureFrame(attitudeMemberTransformationFrame)
        && typeof targetObject.getClassicalNahuatlPerfectiveStem
          === "function") {
        const transformedStem = text(
          attitudeMemberTransformationFrame.operationFrame?.targetStem
        );
        const transformedClass = text(
          attitudeMemberTransformationFrame.operationFrame?.targetClass || "D"
        );
        const canonicalTargetMachinery =
          attitudeMemberTransformationFrame.operationFrame
            ?.targetApplicationFrame?.resultFrame?.selectedMachineryFrame
          || null;
        const canonicalTargetPerfective =
          perfectiveStemFromMachinery(canonicalTargetMachinery);
        const classProfile =
          typeof targetObject.inferClassicalNahuatlLesson7ClassProfile
            === "function"
            ? targetObject.inferClassicalNahuatlLesson7ClassProfile(
                transformedStem,
                {
                  verbClass: transformedClass,
                  canvasHigherLayerClassOverride: transformedClass
                }
              )
            : { classId: transformedClass };
        const perfectiveFrame =
          targetObject.getClassicalNahuatlPerfectiveStem(
            transformedStem,
            classProfile
          );
        const typedAttitudePerfective =
          lateOperation === "honorific"
            && lateVariant === "applicative"
            && /-liā$/u.test(transformedStem)
            ? transformedStem.replace(/-liā$/u, "-lih")
            : lateOperation === "honorific"
              && lateVariant === "causative"
              && /-tiā$/u.test(transformedStem)
              ? transformedStem.replace(/-tiā$/u, "-tih")
              : "";
        const selectedPerfective = typedAttitudePerfective
          || canonicalTargetPerfective
          || text(perfectiveFrame?.perfectiveStem);
        if (text(perfectiveFrame?.imperfectiveStem) === transformedStem
          && selectedPerfective) {
          attitudeMemberPerfectiveFrame = freeze({
            kind: "classical-nahuatl-attitude-vnc-attitude-member-perfective-frame",
            version: VERSION,
            authorizationStatus: "authorized",
            sourceOperationFrame:
              attitudeMemberTransformationFrame.operationFrame,
            classId: transformedClass,
            imperfectiveStem: transformedStem,
            perfectiveStem: selectedPerfective,
            changeRule: text(perfectiveFrame.changeRule),
            typedSourceAuthority: true,
            formulaStringAuthority: false,
            surfaceStringAuthority: false
          });
          attitudeMemberPerfectiveStem =
            attitudeMemberPerfectiveFrame.perfectiveStem;
        }
      }
      if (isAuthorizedClosureFrame(attitudeCompoundClosureFrame)) {
        recursiveEmbedClosureFrame = attitudeCompoundClosureFrame;
      }
    }
    const operationFrame = buildClassicalNahuatlOperationFrame(baseApplicationFrame, request, {
      compoundPredicateSourceFrame,
      constructionEmbedClassFrame,
      invalidCompoundPredicateSourceFrame: hasCompoundPredicateSource && !compoundPredicateSourceFrame,
      matrixApplicationFrame,
      nominalMatrixResult,
      nominalMatrixProjection,
      derivedMatrixClass,
      futureSupplementationFrame,
      recursiveEmbedClosureFrame,
      recursiveMatrixClosureFrame,
      invalidRecursiveEmbedFrame:
        Object.prototype.hasOwnProperty.call(
          request,
          "recursiveEmbedClosureFrame"
        )
          ? !isAuthorizedClosureFrame(request.recursiveEmbedClosureFrame)
          : Object.prototype.hasOwnProperty.call(
            request,
            "compoundEmbedClosureFrame"
          )
            && !isAuthorizedClosureFrame(request.compoundEmbedClosureFrame),
      invalidRecursiveMatrixFrame:
        Object.prototype.hasOwnProperty.call(request, "compoundMatrixClosureFrame")
        && !isAuthorizedClosureFrame(request.compoundMatrixClosureFrame),
      invalidSourceApplicationFrame:
        (hasSourceApplicationFrame && !sourceApplicationFrame)
        || (requestedSourceDerivationKind && !sourceApplicationFrame),
      sourceDerivationKindMismatch: Boolean(
        requestedSourceDerivationKind
        && sourceApplicationFrame
        && requestedSourceDerivationKind !== sourceDerivationKind
      ),
      invalidAttitudeSourceClosureFrame:
        lateOperation === "reverential"
        && (!attitudeSourceClosureFrame
          || Object.prototype.hasOwnProperty.call(
            request,
            "attitudeSourceClosureFrame"
          ) && !isAuthorizedClosureFrame(request.attitudeSourceClosureFrame)),
      attitudeSourceIsHonorific: Boolean(attitudeSourceClosureFrame),
      attitudeSourceClosureFrame,
      possessiveSupplementFrame,
      attitudeCompoundClosureFrame,
      attitudeMemberTransformationFrame,
      attitudeMemberPerfectiveStem,
      attitudeMemberPerfectiveFrame,
      attitudeCompoundTarget: attitudeTarget,
      attitudeCompoundScopeBasis: attitudeScopeBasis,
      compoundLexicalizationAnalysisFrame,
      attitudeSourceObjectFrame,
      honorificDerived,
      shuntlineApplicativeHonorPreservesStem,
      honorificDerivationAttempted,
      honorificDerivationBlockReason,
      honorificFormationAnalysisFrame,
      honorificSourceApplicationFrame,
      ownerIssuedDerivedSourceApplicationFrame: sourceApplicationFrame,
      sourceDerivationKind,
      compoundEmbedFiniteCoordinateDecoupled
    });
    const machineryFrame = buildClassicalNahuatlMachineryFrame(operationFrame);
    const finiteSurfaceFrame = isClassicalNahuatlMachineryFrame(machineryFrame)
      && typeof targetObject.buildClassicalNahuatlVncFiniteSurfaceFrame === "function"
      ? targetObject.buildClassicalNahuatlVncFiniteSurfaceFrame(machineryFrame)
      : null;
    const accompanyingPossessionResultFrame =
      lateOperation === "compound"
        && lateVariant === "accompanying-possession"
        ? buildAccompanyingPossessionResultFrame(
            possessiveSupplementFrame,
            finiteSurfaceFrame
          )
        : null;
    const authorized = Boolean(
      (baseApplicationFrame?.authorizationStatus === "authorized"
        || recursiveEmbedClosureFrame
        || isClassicalNahuatlCompoundPredicateSourceFrame(compoundPredicateSourceFrame))
      && isClassicalNahuatlMachineryFrame(machineryFrame)
      && finiteSurfaceFrame?.authorizationStatus === "authorized"
      && typeof targetObject.isClassicalNahuatlVncFiniteSurfaceFrame === "function"
      && targetObject.isClassicalNahuatlVncFiniteSurfaceFrame(finiteSurfaceFrame)
      && (!accompanyingPossessionResultFrame
        || accompanyingPossessionResultFrame.authorizationStatus === "authorized")
    );
    const greatestCommonDivisor = buildEvaluatedGcdProjection({
      baseApplicationFrame,
      compoundPredicateSourceFrame,
      recursiveEmbedClosureFrame,
      operationFrame,
      machineryFrame,
      finiteSurfaceFrame,
    });
    const leastCommonMultiple = buildSelectedLcmProjection(
      request,
      operationFrame,
      finiteSurfaceFrame
    );
    const closureFrame = freeze({
      kind: "classical-nahuatl-late-vnc-derivation-closure-frame",
      version: VERSION,
      authorizationStatus: authorized ? "authorized" : "blocked",
      blockReason: authorized
        ? ""
        : operationFrame?.blockReason
          || accompanyingPossessionResultFrame?.blockReason
          || finiteSurfaceFrame?.blockReason
          || baseApplicationFrame?.blockReason
          || "closure-not-authorized",
      normalizedRequest: freeze({
        sourceStem: text(
          operationFrame?.sourceStem || request.sourceStem || request.stem
        ),
        operation: key(request.lateOperation),
        variant: key(request.lateVariant),
        requestedVoice: key(request.requestedVoice || request.voice || "active"),
        subject: text(request.subject),
        mood: text(request.mood),
        tense: text(request.tense),
        callerFormulaAuthorityAccepted: false,
        callerSurfaceAuthorityAccepted: false
      }),
      baseApplicationFrame,
      compoundPredicateSourceFrame,
      matrixApplicationFrame,
      operationFrame,
      selectedMachineryFrame: authorized ? machineryFrame : null,
      finalTypedVncSlotFrame: authorized ? operationFrame.targetTypedVncSlotFrame : null,
      finiteSurfaceFrame: authorized ? finiteSurfaceFrame : null,
      supplementaryResultFrame: authorized
        ? accompanyingPossessionResultFrame
        : null,
      greatestCommonDivisor,
      leastCommonMultiple,
      formulaRealization: authorized ? finiteSurfaceFrame.formulaRealization : "",
      surfaceRealization: authorized
        ? accompanyingPossessionResultFrame?.surfaceRealization
          || finiteSurfaceFrame.wordRealization
        : "",
      typedFrameAuthority: true,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      callerSuppliedAuthorityAccepted: false
    });
    issuedClosureFrames.add(closureFrame);
    if (authorized) issuedClosureRequests.set(closureFrame, freeze({ ...request }));
    if (typeof targetObject.getDefaultGrammarContractRegistry === "function"
      && typeof targetObject.assertRegisteredGrammarContract === "function") {
      const registry = targetObject.getDefaultGrammarContractRegistry();
      if (closureFrame.authorizationStatus === "authorized") {
        targetObject.assertRegisteredGrammarContract(registry, operationFrame, {
          contractKind: "classical-nahuatl-late-vnc-derivation-operation-frame",
          version: VERSION
        });
        targetObject.assertRegisteredGrammarContract(registry, machineryFrame, {
          contractKind: "classical-nahuatl-late-vnc-derivation-operation-machinery-frame",
          version: VERSION
        });
      }
      targetObject.assertRegisteredGrammarContract(registry, closureFrame, {
        contractKind: "classical-nahuatl-late-vnc-derivation-closure-frame",
        version: VERSION
      });
    }
    return closureFrame;
  }
  function isClassicalNahuatlClosureFrame(frame = null) {
    if (!frame || !issuedClosureFrames.has(frame)
      || frame.kind !== "classical-nahuatl-late-vnc-derivation-closure-frame"
      || !["authorized", "blocked"].includes(frame.authorizationStatus)
      || frame.formulaStringAuthority !== false
      || frame.surfaceStringAuthority !== false) return false;
    if (frame.authorizationStatus === "blocked") return Boolean(frame.blockReason);
    return Boolean(
      isClassicalNahuatlOperationFrame(frame.operationFrame)
      && isClassicalNahuatlMachineryFrame(frame.selectedMachineryFrame)
      && frame.finalTypedVncSlotFrame === frame.operationFrame.targetTypedVncSlotFrame
      && frame.finiteSurfaceFrame?.machineryFrame === frame.selectedMachineryFrame
      && targetObject.isClassicalNahuatlVncFiniteSurfaceFrame(frame.finiteSurfaceFrame)
    );
  }
  function buildClassicalNahuatlParadigm(request = {}, coordinates = []) {
    const requested = Array.isArray(coordinates) && coordinates.length
      ? coordinates
      : key(request.lateOperation) === "purposive"
        ? ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"].flatMap(subject => [
          {
            subject,
            mood: "indicative",
            tense: "nonpast",
            purposiveSeries: "outbound-nonpast-indicative"
          },
          {
            subject,
            mood: "indicative",
            tense: "past",
            purposiveSeries: "outbound-past-indicative"
          },
          {
            subject,
            mood: "optative",
            tense: "nonpast",
            purposiveSeries: "outbound-nonpast-optative"
          },
          {
            subject,
            mood: "indicative",
            tense: "nonfuture",
            purposiveSeries: "inbound-nonfuture-indicative"
          },
          {
            subject,
            mood: "indicative",
            tense: "future",
            purposiveSeries: "inbound-future-indicative"
          },
          {
            subject,
            mood: "optative",
            tense: "nonpast",
            purposiveSeries: "inbound-nonpast-optative"
          }
        ])
        : ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"].flatMap(subject => [
          { subject, mood: "indicative", tense: "present" },
          { subject, mood: "indicative", tense: "preterit" },
          { subject, mood: "optative", tense: "nonpast" }
        ]);
    const rows = requested.map(coordinate => {
      const coordinateRequest = { ...request, ...coordinate };
      const closureFrame = evaluateClassicalNahuatlLateVncDerivation(
        coordinateRequest
      );
      const scalarReferenceFrame = evaluateClassicalNahuatlLateVncDerivation(
        coordinateRequest
      );
      const scalarEquivalent =
        closureFrame.authorizationStatus === scalarReferenceFrame.authorizationStatus
        && closureFrame.blockReason === scalarReferenceFrame.blockReason
        && closureFrame.operationFrame?.operation
          === scalarReferenceFrame.operationFrame?.operation
        && closureFrame.operationFrame?.variant
          === scalarReferenceFrame.operationFrame?.variant
        && closureFrame.finalTypedVncSlotFrame?.semanticIdentity
          === scalarReferenceFrame.finalTypedVncSlotFrame?.semanticIdentity
        && closureFrame.formulaRealization
          === scalarReferenceFrame.formulaRealization
        && closureFrame.surfaceRealization
          === scalarReferenceFrame.surfaceRealization;
      return freeze({
        coordinate: freeze({ ...coordinate }),
        closureFrame,
        scalarEquivalent,
      });
    });
    const authorizedRows = rows.filter(row => row.closureFrame.authorizationStatus === "authorized");
    return freeze({
      kind: "classical-nahuatl-late-vnc-derivation-paradigm-frame",
      version: VERSION,
      authorizationStatus: authorizedRows.length ? "authorized" : "blocked",
      blockReason: authorizedRows.length ? "" : "no-authorized-paradigm-coordinates",
      rows,
      authorizedRowCount: authorizedRows.length,
      blockedRowCount: rows.length - authorizedRows.length,
      greatestCommonDivisor: freeze({
        identity:
          "scalar-coordinate-evaluation+typed-operation+finite-boundary-result",
        satisfied: rows.every(row => (
          row.closureFrame.authorizationStatus !== "authorized"
          || row.closureFrame.greatestCommonDivisor?.satisfied === true
        )),
      }),
      leastCommonMultiple: freeze({
        axisIds: LCM_AXIS_IDS,
        axisCount: LCM_AXIS_IDS.length,
        selectedCoordinateValues: rows.map(row => freeze({
          coordinate: row.coordinate,
          selectedValues: row.closureFrame.leastCommonMultiple?.selectedValues
            || null,
        })),
        selectedCoordinateCount: rows.length,
        licensedAxisSetComplete: rows.every(row => (
          row.closureFrame.leastCommonMultiple?.licensedAxisSetComplete === true
        )),
      }),
      scalarParity: rows.every(row => row.scalarEquivalent),
      formulaStringAuthority: false,
      surfaceStringAuthority: false
    });
  }
  return Object.freeze({
    VERSION,
    reissueClassicalNahuatlCompoundCoordinate,
    getClassicalNahuatlCompoundAttitudeMemberContext,
    prefixClassicalNahuatlCompoundWithNominal,
    buildClassicalNahuatlNominalIhStockFormation,
    buildClassicalNahuatlNominalVncMatrixCoordinateResult,
    buildClassicalNahuatlCompoundPredicateSourceFrame,
    isClassicalNahuatlCompoundPredicateSourceFrame,
    issueClassicalNahuatlCompoundPredicateBindingFrame,
    isClassicalNahuatlCompoundPredicateBindingFrame,
    buildClassicalNahuatlLateSourceAgreementFrame,
    isClassicalNahuatlLateSourceAgreementFrame,
    buildHonorificFormationAnalysisFrame,
    getClassicalNahuatlHonorificSourceFacts,
    buildClassicalNahuatlOperationFrame,
    isClassicalNahuatlOperationFrame: frame => withParentValidationTransaction(() => isClassicalNahuatlOperationFrame(frame)),
    buildClassicalNahuatlMachineryFrame,
    buildClassicalNahuatlVncTlaFusionContinuationMachinery,
    isClassicalNahuatlMachineryFrame: frame => withParentValidationTransaction(() => isClassicalNahuatlMachineryFrame(frame)),
    evaluateClassicalNahuatlLateVncDerivation,
    isClassicalNahuatlClosureFrame: frame => withParentValidationTransaction(() => isClassicalNahuatlClosureFrame(frame)),
    buildClassicalNahuatlParadigm
  });
}

export function installClassicalNahuatlVncClosureGlobals(targetObject = globalThis) {
  const api = createClassicalNahuatlVncClosureApi(targetObject);
  Object.assign(targetObject, api);
  return api;
}
