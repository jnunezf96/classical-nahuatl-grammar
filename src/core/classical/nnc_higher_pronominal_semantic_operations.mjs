// Validation projection for independently owned higher- and pronominal-NNC
// semantics. This module owns no Inventory atoms and defines no grammar.
// Recipes select typed coordinates in the canonical NNC evaluator and retain
// only runtime-emitted facts. Canvas examples and declared oracle values never
// authorize an operation.

import {
  createClassicalNahuatlNncLayerEvaluatorApi,
} from "./nnc_layer_evaluator.mjs";

function cloneValue(value, seen = new WeakMap()) {
  if (!value || typeof value !== "object") return value;
  if (seen.has(value)) return seen.get(value);
  const clone = Array.isArray(value) ? [] : {};
  seen.set(value, clone);
  for (const [key, nested] of Object.entries(value)) {
    clone[key] = cloneValue(nested, seen);
  }
  return clone;
}

function deepFreeze(value, seen = new WeakSet()) {
  if (!value || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const nested of Object.values(value)) deepFreeze(nested, seen);
  return Object.freeze(value);
}

function canonicalTranscriptionFormula(formula = "") {
  return String(formula).replaceAll("0", "Ø");
}

function blocked(recipeId, reason) {
  return deepFreeze({
    kind: "classical-nahuatl-higher-pronominal-nnc-validation-frame",
    authorizationStatus: "blocked",
    blockReason: reason,
    recipeId: String(recipeId || ""),
  });
}

function ordinaryFrame(api, {
  stem,
  state = "possessive",
  subject = "3sg",
  possessor = "3sg",
  nounClass = "tli",
  tlSubclass = "",
  tliSubclass = nounClass === "tli" ? "1" : "",
  stemFormation = "plain",
  operation = "regular",
  operationOptions = {},
  sourceOptions = {},
  classOptions = {},
  reduplication = false,
} = {}) {
  const stemOperationRecord = api.buildClassicalNahuatlStemOperationRecord(stem, {
    operation,
    selectedState: state,
    subject,
    possessor,
    nounClass,
    useShape: tlSubclass === "2A" ? "truncated-i" : "base",
    subclass: tlSubclass ? `tl-${String(tlSubclass).toLowerCase()}` : "",
    stemFormation,
    selectionAuthority: operation === "regular"
      ? "canvas-regular-default"
      : "external-lexical-record",
    ...operationOptions,
  });
  const possessorReduplicationSelection =
    api.buildClassicalNahuatlPossessorReduplicationSelection(stem, {
      selected: reduplication,
      selectionAuthority: reduplication ? "external-lexical-record" : "not-selected",
    });
  const sourceAuthorityFrame = api.buildClassicalNahuatlNncSourceAuthorityFrame(stem, {
    selectedState: state,
    policySelectionAuthority: "external-lexical-record",
    lesson15StemOperationRecord: stemOperationRecord,
    lesson15PossessorReduplicationSelection: possessorReduplicationSelection,
    ...sourceOptions,
  });
  const classGovernedFrame = api.buildClassicalNahuatlClassGovernedNncFrame(stem, {
    state,
    subject,
    possessor,
    nounClass,
    tlSubclass,
    tliSubclass,
    stemFormation,
    classSelectionAuthority: "user-selection",
    nncSourceAuthorityFrame: sourceAuthorityFrame,
    animacy: classOptions.animacy || "nonanimate",
    ...classOptions,
  });
  const higherFrame = api.buildClassicalNahuatlHigherNncFrame(classGovernedFrame, {
    nncSourceAuthorityFrame: sourceAuthorityFrame,
    ...classOptions,
  });
  return {
    mainFrame: higherFrame,
    stemOperationRecord,
    possessorReduplicationSelection,
    sourceAuthorityFrame,
    classGovernedFrame,
    higherFrame,
  };
}

function quantitiveAuthority(api, {
  sourceStem,
  embedStem,
  matrixFamily,
  matrixForm,
  subject = "3common",
  predicatePluralization,
} = {}) {
  return api.buildClassicalNahuatlQuantitiveAuthorityRecord({
    sourceStem,
    embedStem,
    matrixFamily,
    matrixForm,
    subject,
    predicatePluralization,
  });
}

function pronominalFrame(api, options = {}) {
  let quantitiveAuthorityRecord = null;
  if (options.quantitiveAuthority) {
    quantitiveAuthorityRecord = quantitiveAuthority(api, {
      subject: options.subject,
      ...options.quantitiveAuthority,
    });
  }
  const request = { ...options };
  delete request.quantitiveAuthority;
  if (quantitiveAuthorityRecord) request.quantitiveAuthorityRecord = quantitiveAuthorityRecord;
  const mainFrame = api.buildClassicalNahuatlPronominalNncFrame(request);
  return {
    mainFrame,
    pronominalFrame: mainFrame,
    quantitiveAuthorityRecord,
    quantitiveSourceAnalysis: quantitiveAuthorityRecord?.sourceAnalysis || null,
    paradigmPlan: null,
    adjunctorFrame: mainFrame?.contextSelectionRecord?.adjunctorInFrame || null,
  };
}

function buildRecipe(api, recipeId) {
  if (recipeId === "l15-final-w") {
    return ordinaryFrame(api, {
      stem: "cuāuh", subject: "3pl", possessor: "1sg", nounClass: "tli",
      classOptions: { animacy: "animate" },
    });
  }
  if (recipeId === "l15-final-n") {
    return ordinaryFrame(api, {
      stem: "nān", subject: "1pl", possessor: "1pl", nounClass: "tli",
      classOptions: { animacy: "animate" },
    });
  }
  if (recipeId === "l15-suppletive") {
    return ordinaryFrame(api, {
      stem: "tlācoh", subject: "1sg", possessor: "2sg", nounClass: "tli",
      operation: "suppletive",
      operationOptions: { targetStem: "tlāca", suppletiveConnector: "uh" },
      classOptions: { animacy: "animate" },
    });
  }
  if (recipeId === "l15-yo-matrix") {
    return ordinaryFrame(api, {
      stem: "pil", state: "absolutive", subject: "3common", nounClass: "tli",
      operation: "yo-matrix",
    });
  }
  if (recipeId === "l15-totec") {
    return ordinaryFrame(api, {
      stem: "tēuc", subject: "3sg", possessor: "1pl", nounClass: "tli",
      operation: "suppletive",
      operationOptions: {
        predicateOptionId: "tec-title",
        selectionAuthority: "canvas-predicate-option",
      },
      classOptions: { animacy: "animate" },
    });
  }
  if (recipeId === "l15-derived-nonanimate") {
    return ordinaryFrame(api, {
      stem: "cal", subject: "3common", possessor: "3sg", nounClass: "tli",
      stemFormation: "affinity",
      classOptions: { animacy: "nonanimate" },
    });
  }
  if (recipeId === "l15-reduplication") {
    return ordinaryFrame(api, {
      stem: "tah", subject: "3pl", possessor: "3pl", nounClass: "tli",
      reduplication: true, classOptions: { animacy: "animate" },
    });
  }
  if (recipeId === "l15-secondary") {
    return ordinaryFrame(api, {
      stem: "tah", subject: "3sg", possessor: "3pl", nounClass: "tli",
      operation: "secondary-general-use",
      operationOptions: { secondaryPossessorCarrier: "tē" },
      classOptions: { animacy: "animate", thirdPluralPossessorNumberMorph: "n" },
    });
  }
  if (recipeId === "l15-secondary-ti") {
    return ordinaryFrame(api, {
      stem: "tah", subject: "3sg", possessor: "3pl", nounClass: "tli",
      operation: "secondary-general-use",
      operationOptions: { secondaryPossessorCarrier: "ti" },
      classOptions: { animacy: "animate", thirdPluralPossessorNumberMorph: "n" },
    });
  }
  if (recipeId === "l15-analogical") {
    return ordinaryFrame(api, {
      stem: "māi", state: "absolutive", subject: "3common", nounClass: "tl",
      tlSubclass: "2A", operation: "analogical-restricted-use",
      classOptions: { generalUseShape: "truncated", ephemeralFinalVowel: "i" },
    });
  }
  if (recipeId === "l15-reclassification") {
    return ordinaryFrame(api, {
      stem: "māi", state: "possessive", subject: "3sg", possessor: "3sg",
      nounClass: "tl", tlSubclass: "2A", operation: "tl-2a-to-1a",
      classOptions: { generalUseShape: "truncated", ephemeralFinalVowel: "i" },
    });
  }
  if (recipeId.startsWith("l15-natural-")) {
    const semantic = recipeId.slice("l15-natural-".length);
    const stems = { property: "āxcā", relation: "nān", "body-part": "māi" };
    const sourceAuthorityFrame = api.buildClassicalNahuatlNncSourceAuthorityFrame(
      stems[semantic] || "chān",
      {
        selectedState: "possessive",
        naturalPossessionPolicy: "naturally-possessed",
        naturalPossessionSemantics: semantic === "relation"
          ? "kinship-or-human-relation" : semantic,
        policySelectionAuthority: "external-lexical-record",
      },
    );
    return { mainFrame: sourceAuthorityFrame, sourceAuthorityFrame };
  }
  if (recipeId === "l15-never-possessive") {
    const sourceAuthorityFrame = api.buildClassicalNahuatlNncSourceAuthorityFrame("teōtl", {
      selectedState: "absolutive",
      naturalPossessionPolicy: "never-possessive",
      policySelectionAuthority: "external-lexical-record",
    });
    const blockedPossessiveFrame = api.buildClassicalNahuatlNncSourceAuthorityFrame("teōtl", {
      selectedState: "possessive",
      naturalPossessionPolicy: "never-possessive",
      policySelectionAuthority: "external-lexical-record",
    });
    const metaphoricalOverrideFrame = api.buildClassicalNahuatlNncSourceAuthorityFrame("teōtl", {
      selectedState: "possessive",
      naturalPossessionPolicy: "never-possessive",
      metaphoricalOverride: true,
      policySelectionAuthority: "external-lexical-record",
    });
    return { mainFrame: sourceAuthorityFrame, sourceAuthorityFrame, blockedPossessiveFrame, metaphoricalOverrideFrame };
  }
  if (recipeId === "l15-sentence") {
    const ordinary = ordinaryFrame(api, {
      stem: "cal", state: "absolutive", subject: "3common", nounClass: "tli",
    });
    const sentenceHandoffFrame = api.buildClassicalNahuatlSentenceHandoffFrame(
      ordinary.higherFrame.nncSlotFrame,
      { sentenceType: "emphatic", predicateKind: "equative", polarity: "negative", sentenceModifier: "zan" },
    );
    return { ...ordinary, sentenceHandoffFrame };
  }

  const simple = (options) => pronominalFrame(api, options);
  if (recipeId === "l16-personal-simple") {
    const built = simple({ subtype: "personal-simple", subject: "1sg" });
    built.pronominalFamilySystem = {
      usualEnglishProjection: "pronoun-word",
      nahuatlStructuralCategory: "nominal-nuclear-clause",
      structurallyEquivalentToIsolatedEnglishPronoun: false,
    };
    return built;
  }
  if (recipeId === "l16-personal-simple-third") {
    const built = simple({ subtype: "personal-simple", subject: "3sg" });
    built.simplePersonalSystem = {
      canonicalFormula: built.mainFrame.formulaRealization,
      readings: {
        singularHumanMale: "he is an entity",
        singularHumanFemale: "she is an entity",
        singularNonanimate: "it is an entity",
        pluralNonanimate: "they are entities",
      },
      adverbialCollocationFinalMember: {
        preferred: "eh",
        licensedAlternative: "yeh",
      },
    };
    return built;
  }
  if (recipeId === "l16-personal-compound") {
    const sounded = simple({ subtype: "personal-compound", subject: "3sg", numberVariant: "sounded" });
    const silent = simple({ subtype: "personal-compound", subject: "3sg", numberVariant: "silent" });
    sounded.personalCompoundVariants = {
      sounded: sounded.mainFrame,
      silent: silent.mainFrame,
    };
    sounded.personalCompoundReadings = {
      singularHumanMale: ["he is an entity", "he is the entity"],
      singularHumanFemale: ["she is an entity", "she is the entity"],
      singularNonanimate: ["it is an entity", "it is the entity"],
      pluralNonanimate: ["they are entities", "they are the entities"],
    };
    sounded.translationValuesPreservedAcrossNumberVariants = true;
    sounded.personalContextSystem = {
      quenMachHuelSynonymousWithLesson11Construction: true,
      supplementRepeatsBasicAffixalPersonInformation: true,
      supplementalEnglishProjection: "emphatic-wordal-personal-pronoun",
    };
    return sounded;
  }
  if (recipeId === "l16-personal-compound-plural") return simple({ subtype: "personal-compound", subject: "1pl", pluralConnector: "t-in" });
  if (recipeId === "l16-personal-derived") return simple({ subtype: "personal-compound-derived", subject: "3common", derivedPersonalStem: "yeh-yeh-huā" });
  if (recipeId === "l16-personal-doubled") return simple({ subtype: "personal-compound", subject: "1pl", doubledFirstPluralSelected: true, pluralConnector: "t-in" });
  if (recipeId === "l16-personal-paradigm") {
    const built = simple({ subtype: "personal-compound", subject: "1sg" });
    built.paradigmPlan = api.buildClassicalNahuatlPronominalParadigmPlan({ subtype: "personal-compound", thirdCommonVariant: "eh", enteredStem: "eh-huā" });
    return built;
  }
  if (recipeId === "l16-tleh") {
    const built = simple({ subtype: "interrogative", interrogativeKind: "tleh", subject: "3sg" });
    built.interrogativeSystem = {
      tlehSubjectParadigm: Object.fromEntries(
        ["1sg", "1pl", "2sg", "2pl", "3sg", "3pl"].map(subject => {
          const frame = simple({ subtype: "interrogative", interrogativeKind: "tleh", subject }).mainFrame;
          return [subject, { authorizationStatus: frame.authorizationStatus, formulaRealization: frame.formulaRealization }];
        }),
      ),
    };
    const acWithClause = simple({
      subtype: "interrogative", interrogativeKind: "āc", subject: "3sg",
      adjunctorInMode: "dependent-clause",
    }).mainFrame;
    built.interrogativeSystem.acWithDependentClause = {
      principalClause: "āc",
      adjunctClauseIntroducedBy: "in",
      writingPolicy: acWithClause.contextSelectionRecord.adjunctorInFrame.writingPolicy,
      traditionalSolidSpellingCannotOverrideClauseStructure: true,
    };
    return built;
  }
  if (recipeId === "l16-tlehhua") return simple({ subtype: "interrogative", interrogativeKind: "tleh-huā", subject: "3sg", numberVariant: "sounded" });
  if (recipeId === "l16-ca-compound") return simple({ subtype: "interrogative", interrogativeKind: "cā", subject: "3sg", compoundInterrogativeStem: "cā-tl-eh", compoundInterrogativeEmbed: "cā", compoundInterrogativeMatrix: "tl-eh", compoundInterrogativeNumberClass: "zero" });
  if (recipeId === "l16-ac") return simple({ subtype: "interrogative", interrogativeKind: "āc", subject: "3sg" });
  if (recipeId === "l16-tleh-in-fused") return simple({ subtype: "interrogative", interrogativeKind: "tleh", subject: "3sg", adjunctorInMode: "fused-tlein" });
  if (recipeId === "l16-tleh-in-dependent") return simple({ subtype: "interrogative", interrogativeKind: "tleh", subject: "3sg", adjunctorInMode: "dependent-clause" });
  if (recipeId === "l16-ac-in-fused") return simple({ subtype: "interrogative", interrogativeKind: "āc", subject: "3sg", adjunctorInMode: "fused-aquin" });
  if (recipeId === "l16-ac-in-dependent") return simple({ subtype: "interrogative", interrogativeKind: "āc", subject: "3sg", adjunctorInMode: "dependent-clause" });
  if (recipeId === "l16-tleh-noninitial") return simple({ subtype: "interrogative", interrogativeKind: "tleh", subject: "3sg", clauseInitial: false });
  if (recipeId === "l16-ac-negative") return simple({ subtype: "interrogative", interrogativeKind: "āc", subject: "3sg", polarity: "negative" });
  if (recipeId === "l16-demonstrative") return simple({ subtype: "demonstrative", demonstrative: "īn", subject: "3common" });
  if (recipeId === "l16-demonstrative-plural") {
    const built = simple({ subtype: "demonstrative", demonstrative: "ōn", subject: "3pl", pluralConnector: "silent-silent" });
    built.demonstrativeNumberVariants = ["inon", "ini", "ino"];
    return built;
  }
  if (recipeId === "l16-indefinite-someone") return simple({ subtype: "indefinite", indefiniteKind: "someone", subject: "3sg" });
  if (recipeId === "l16-indefinite-something") {
    const built = simple({ subtype: "indefinite", indefiniteKind: "something", subject: "3common" });
    built.indefiniteSomethingReference = {
      referent: "nonspecific-nonhuman-thing",
      existenceStatus: "questioned",
    };
    return built;
  }
  if (recipeId === "l16-indefinite-human-special") return simple({ subtype: "indefinite", indefiniteKind: "something", subject: "3sg", subjectReferentCategory: "human", specialHumanUseSelected: true });

  const quantitiveRecipes = {
    "l16-ixquich": { sourceStem: "ix-qui-ch", embedStem: "ix", matrixFamily: "qui-ch", matrixForm: "qui-ch" },
    "l16-quexquich": { sourceStem: "quē-x-qui-ch", embedStem: "quē-x", matrixFamily: "qui-ch", matrixForm: "qui-ch" },
    "l16-miyequi": { sourceStem: "miye-qui", embedStem: "miye", matrixFamily: "quī", matrixForm: "qui" },
    "l16-cequi": { sourceStem: "ce-qui", embedStem: "ce", matrixFamily: "quī", matrixForm: "qui" },
    "l16-izqui": { sourceStem: "iz-qui", embedStem: "iz", matrixFamily: "quī", matrixForm: "qui" },
    "l16-quezqui": { sourceStem: "quē-z-qui", embedStem: "quē-z", matrixFamily: "quī", matrixForm: "qui" },
    "l16-aqui": { sourceStem: "a-qui", embedStem: "a", matrixFamily: "quī", matrixForm: "qui" },
    "l16-achi": { sourceStem: "a-chi", embedStem: "a", matrixFamily: "chī", matrixForm: "chi" },
    "l16-mochi": { sourceStem: "mo-chi", embedStem: "mo", matrixFamily: "chī", matrixForm: "chi" },
    "l16-ixachi": { sourceStem: "ix-a-chi", embedStem: "ix-a", matrixFamily: "chī", matrixForm: "chi" },
  };
  if (quantitiveRecipes[recipeId]) {
    const built = simple({ subtype: "quantitive", subject: "3common", quantitiveAuthority: quantitiveRecipes[recipeId] });
    const lexicalSystem = {
      "l16-ixquich": {
        sourceAlternants: ["ix-qui-ch"],
        readings: ["a total amount or quantity", "all"],
      },
      "l16-quexquich": {
        sourceAlternants: ["quē-x-qui-ch"],
        readings: ["how large a total amount or quantity", "how much", "how many in general"],
      },
      "l16-miyequi": {
        sourceAlternants: ["miya-qui", "miya-c", "miye-qui", "miye-c"],
        readings: ["an abundant amount or quantity", "much", "many"],
      },
      "l16-cequi": {
        sourceAlternants: ["ce-qui", "ce-c"],
        readings: ["one or a certain amount or number", "one", "some", "part"],
      },
      "l16-izqui": {
        sourceAlternants: ["iz-qui"],
        readings: ["an equal amount or number", "as much", "as many", "so much", "so many"],
      },
      "l16-quezqui": {
        sourceAlternants: ["quē-z-qui"],
        readings: ["how large or full a number", "how many specifically", "how large a sum"],
      },
      "l16-aqui": {
        sourceAlternants: ["a-qui"],
        readings: ["a small amount or number", "a few"],
      },
      "l16-achi": {
        sourceAlternants: ["a-chi"],
        readings: ["a small amount or quantity", "a little"],
      },
      "l16-mochi": {
        sourceAlternants: ["mo-chi", "mo-ch"],
        readings: ["a full amount or number", "all"],
      },
      "l16-ixachi": {
        sourceAlternants: ["ix-a-chi"],
        readings: ["a very large amount or number", "much", "many"],
      },
    };
    built.quantitiveLexicalSystem = lexicalSystem[recipeId];
    built.quantitiveMatrixAllomorphSystem = {
      longVowelFamilies: ["chī", "quī"],
      chiiMorphs: ["chī", "chih", "chi", "ch"],
      quiiMorphs: ["quī", "quih", "qui", "c"],
      longVowelBeforePluralN: true,
      glottalStopBeforeAffectiveMatrix: true,
      shortVowelElsewhere: true,
      vowellessMorphsIdiosyncratic: true,
      deploymentFullyPredictable: false,
    };
    if (recipeId === "l16-ixquich") {
      built.quantitivePhonology = { miyahuaLongABeforeWa: true };
    }
    return built;
  }
  if (recipeId === "l16-quantitive-internal-n") {
    const built = simple({
      subtype: "quantitive", subject: "1pl", pluralConnector: "t-in",
      quantitiveAuthority: {
        sourceStem: "miye-c", embedStem: "miye", matrixFamily: "quī",
        matrixForm: "c", predicatePluralization: "internal-n",
      },
    });
    built.quantitiveInternalNumberSystem = {
      matrixFamilies: ["quī", "chī"],
      internalPluralSuffix: "n",
      suffixPosition: "inside-pronominal-stem",
      subjectPluralDyads: ["t-in", "⎕-⎕"],
    };
    built.quantitiveMatrixAllomorphSystem = {
      longVowelFamilies: ["chī", "quī"],
      chiiMorphs: ["chī", "chih", "chi", "ch"],
      quiiMorphs: ["quī", "quih", "qui", "c"],
      longVowelBeforePluralN: true,
      glottalStopBeforeAffectiveMatrix: true,
      shortVowelElsewhere: true,
      vowellessMorphsIdiosyncratic: true,
      deploymentFullyPredictable: false,
    };
    return built;
  }
  if (recipeId === "l16-moch-plain-plural") {
    return simple({
      subtype: "quantitive", subject: "1pl", pluralConnector: "t-in",
      quantitiveAuthority: {
        sourceStem: "mo-ch", embedStem: "mo", matrixFamily: "chī",
        matrixForm: "ch", predicatePluralization: "plain-variant",
      },
    });
  }
  if (recipeId === "l16-moch-personal") return simple({ subtype: "quantitive-personal-compound", subject: "3sg", quantitiveEmbed: "mo-ch", quantitivePersonalMatrix: "eh-huā", numberVariant: "sounded" });
  if (recipeId === "l16-quexquich-noninitial") {
    return simple({
      subtype: "quantitive", subject: "3common", clauseInitial: false,
      quantitiveAuthority: quantitiveRecipes["l16-quexquich"],
    });
  }
  if (recipeId === "l16-quezqui-noninitial") {
    return simple({
      subtype: "quantitive", subject: "3common", clauseInitial: false,
      quantitiveAuthority: quantitiveRecipes["l16-quezqui"],
    });
  }
  return null;
}

function projectFrame(recipeId, built) {
  const main = built?.mainFrame;
  if (!main || main.authorizationStatus !== "authorized") {
    return blocked(recipeId, main?.blockReason || "canonical-higher-pronominal-nnc-operation-required");
  }
  return deepFreeze({
    kind: "classical-nahuatl-higher-pronominal-nnc-validation-frame",
    authorizationStatus: "authorized",
    blockReason: "",
    recipeId,
    formulaRealization: main.formulaRealization || built?.higherFrame?.formulaRealization || "",
    mainFrame: cloneValue(main),
    sourceFrame: cloneValue(main.sourceFrame || built?.sourceAuthorityFrame || null),
    sourceAuthorityFrame: cloneValue(built?.sourceAuthorityFrame || null),
    classGovernedFrame: cloneValue(built?.classGovernedFrame || null),
    higherFrame: cloneValue(built?.higherFrame || null),
    stemOperationRecord: cloneValue(built?.stemOperationRecord || null),
    possessorReduplicationSelection: cloneValue(built?.possessorReduplicationSelection || null),
    sentenceHandoffFrame: cloneValue(built?.sentenceHandoffFrame || null),
    pronominalFrame: cloneValue(built?.pronominalFrame || null),
    numberFrame: cloneValue(built?.pronominalFrame?.numberFrame || null),
    contextSelectionRecord: cloneValue(built?.pronominalFrame?.contextSelectionRecord || null),
    discourseFrame: cloneValue(built?.pronominalFrame?.discourseFrame || null),
    adjunctorFrame: cloneValue(built?.adjunctorFrame || null),
    adjunctorFusionSystem: built?.adjunctorFrame ? {
      mode: built.adjunctorFrame.mode,
      fusedSurface: built.adjunctorFrame.fusedSurface,
      writingPolicy: built.adjunctorFrame.writingPolicy,
      dependentClausePresent: built.adjunctorFrame.dependentClausePresent,
      ellipsisSelected: built.adjunctorFrame.ellipsisSelected,
    } : null,
    quantitiveAuthorityRecord: cloneValue(built?.quantitiveAuthorityRecord || null),
    quantitiveSourceAnalysis: cloneValue(built?.quantitiveSourceAnalysis || null),
    paradigmPlan: cloneValue(built?.paradigmPlan || null),
    blockedPossessiveFrame: cloneValue(built?.blockedPossessiveFrame || null),
    metaphoricalOverrideFrame: cloneValue(built?.metaphoricalOverrideFrame || null),
    ordinaryContract: cloneValue(built?.higherFrame?.ordinaryNncContractFrame || null),
    analogicalContract: cloneValue(built?.higherFrame?.analogicalRestrictedUseContractFrame || null),
    reclassificationContract: cloneValue(built?.higherFrame?.reclassificationContractFrame || null),
    pronominalContract: cloneValue(built?.pronominalFrame?.lesson16GrammarContractFrame || null),
    personalCompoundVariants: built?.personalCompoundVariants ? {
      sounded: {
        formulaRealization: canonicalTranscriptionFormula(built.personalCompoundVariants.sounded.formulaRealization),
        numberVariant: built.personalCompoundVariants.sounded.numberFrame.numberVariant,
      },
      silent: {
        formulaRealization: canonicalTranscriptionFormula(built.personalCompoundVariants.silent.formulaRealization),
        numberVariant: built.personalCompoundVariants.silent.numberFrame.numberVariant,
      },
    } : null,
    personalCompoundReadings: cloneValue(built?.personalCompoundReadings || null),
    translationValuesPreservedAcrossNumberVariants:
      built?.translationValuesPreservedAcrossNumberVariants === true,
    interrogativeSystem: built?.interrogativeSystem ? {
      tlehSubjectParadigm: Object.fromEntries(
        Object.entries(built.interrogativeSystem.tlehSubjectParadigm).map(([subject, record]) => [subject, {
          authorizationStatus: record.authorizationStatus,
          formulaRealization: canonicalTranscriptionFormula(record.formulaRealization),
        }]),
      ),
      acWithDependentClause: cloneValue(built.interrogativeSystem.acWithDependentClause),
    } : null,
    simplePersonalSystem: built?.simplePersonalSystem ? {
      canonicalFormula: canonicalTranscriptionFormula(built.simplePersonalSystem.canonicalFormula),
      readings: cloneValue(built.simplePersonalSystem.readings),
      adverbialCollocationFinalMember: cloneValue(built.simplePersonalSystem.adverbialCollocationFinalMember),
    } : null,
    pronominalFamilySystem: cloneValue(built?.pronominalFamilySystem || null),
    personalContextSystem: cloneValue(built?.personalContextSystem || null),
    demonstrativeNumberVariants: cloneValue(built?.demonstrativeNumberVariants || null),
    indefiniteSomethingReference: cloneValue(built?.indefiniteSomethingReference || null),
    quantitivePhonology: cloneValue(built?.quantitivePhonology || null),
    quantitiveLexicalSystem: cloneValue(built?.quantitiveLexicalSystem || null),
    quantitiveMatrixAllomorphSystem: cloneValue(built?.quantitiveMatrixAllomorphSystem || null),
    quantitiveInternalNumberSystem: cloneValue(built?.quantitiveInternalNumberSystem || null),
    typedSlotAuthority: main.proofFrame?.conclusion?.typedSlotAuthority === true
      || built?.higherFrame?.proofFrame?.conclusion?.typedSlotAuthority === true,
    formulaStringAuthority: false,
    storedExampleAuthority: false,
    curriculumMetadataAuthority: false,
  });
}

export function createClassicalHigherPronominalNncValidationSemanticOperationsApi(
  targetObject = globalThis,
) {
  const canonicalApi = createClassicalNahuatlNncLayerEvaluatorApi(targetObject);
  const issuedFrames = new WeakSet();

  function buildClassicalNahuatlHigherPronominalNncValidationFrame(recipeId = "") {
    const built = buildRecipe(canonicalApi, String(recipeId || ""));
    if (!built) return blocked(recipeId, "higher-pronominal-nnc-validation-recipe-not-recognized");
    const projected = projectFrame(String(recipeId), built);
    if (projected.authorizationStatus === "authorized") issuedFrames.add(projected);
    return projected;
  }

  function isClassicalNahuatlHigherPronominalNncValidationFrame(frame = null) {
    return Boolean(
      frame
      && issuedFrames.has(frame)
      && frame.kind === "classical-nahuatl-higher-pronominal-nnc-validation-frame"
      && frame.authorizationStatus === "authorized"
      && frame.formulaStringAuthority === false
      && frame.storedExampleAuthority === false
      && frame.curriculumMetadataAuthority === false,
    );
  }

  return Object.freeze({
    buildClassicalNahuatlHigherPronominalNncValidationFrame,
    isClassicalNahuatlHigherPronominalNncValidationFrame,
  });
}
