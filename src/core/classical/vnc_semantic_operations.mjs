const freeze = (value) => Object.freeze(value);

function requireFunction(targetObject, name) {
  const value = targetObject?.[name];
  if (typeof value !== "function") throw new Error(`classical-vnc-semantic-prerequisite-missing:${name}`);
  return value;
}

function createIssuedOperation(kind, buildPayload) {
  const issued = new WeakSet();
  const build = () => {
    const payload = buildPayload();
    const result = freeze({ kind, authorizationStatus: "authorized", ...payload });
    issued.add(result);
    return result;
  };
  const validate = (value) => Boolean(value && issued.has(value) && value.kind === kind);
  return freeze({ build, validate });
}

function finalFormula(frame) {
  return frame?.proofFrame?.conclusion?.finalBoundaryRealizationFrame?.formulaRealization || "";
}

export function createClassicalVncSemanticOperationsApi(targetObject = globalThis) {
  const structure = createIssuedOperation(
    "classical-verbstem-structure-system-frame",
    () => {
      const build = requireFunction(targetObject, "buildClassicalNahuatlVerbstemStructureRuleFrame");
      const mono = build("miqui");
      const poly = build("chol-o-ā");
      return {
        lexicalMeaningLocus: mono.ruleRefs.some((rule) => rule.stemRole === "lexical-meaning-locus"),
        monomorphemicKind: mono.morphology,
        polymorphemicKind: poly.morphology,
        polymorphemicMorphs: freeze([...poly.internalMorphs]),
        internalMorphBoundary: poly.internalMorphBoundary,
        internalMorphBoundaryScope: poly.internalMorphBoundaryScope,
        internalMorphsRemainInsideVerbstem: poly.internalMorphsRemainInsideVerbstem,
        formulaSlotSplitAllowed: poly.formulaSlotSplitAllowed,
        internalMorphGlossPolicy: poly.internalMorphGlossPolicy,
        stemTranslationUnit: poly.stemTranslationUnit,
      };
    },
  );
  const citation = createIssuedOperation(
    "classical-verbcore-citation-system-frame",
    () => {
      const build = requireFunction(targetObject, "buildClassicalNahuatlCitationRuleFrame");
      const intr = build("chōca", { valence: "intransitive" });
      const human = build("nōtza", {
        valence: "projective-human",
        citationRepresentative: "human",
      });
      const nonhuman = build("chīhua", {
        valence: "projective-nonhuman",
        citationRepresentative: "nonhuman",
      });
      return {
        citationUnit: "verbcore",
        isolatedVerbstemCitationAllowed: intr.isolatedVerbstemCitationAllowed,
        intransitiveCitation: intr.citationForm,
        humanProjectiveCitation: human.citationForm,
        nonhumanProjectiveCitation: nonhuman.citationForm,
        formulaSlotCitationAllowed: human.formulaSlotCitationAllowed,
        blockedCitationMarkers: freeze([...human.blockedCitationMarkers]),
      };
    },
  );
  const classB = createIssuedOperation(
    "classical-class-b-perfective-system-frame",
    () => {
      const apply = requireFunction(targetObject, "applyClassicalNahuatlLesson7ClassBChanges");
      const samples = Object.fromEntries([
        ["miqui", apply("miqui")],
        ["nēci", apply("nēci")],
        ["cē-hui", apply("cē-hui")],
        ["tzacu-a", apply("tzacu-a")],
        ["tlaōco-ya", apply("tlaōco-ya")],
        ["cel-i-ya", apply("cel-i-ya")],
      ]);
      return {
        trigger: "final-vowel-loss-or-silencing",
        transformations: freeze(Object.fromEntries(Object.entries(samples).map(([stem, frame]) => [
          stem,
          freeze({ perfectiveStem: frame.perfectiveStem, changeRule: frame.changeRule }),
        ]))),
      };
    },
  );
  const shapes = createIssuedOperation(
    "classical-imperfective-shape-selection-system-frame",
    () => {
      const classify = requireFunction(targetObject, "buildClassicalNahuatlVerbstemClassRuleFrame");
      const select = requireFunction(targetObject, "buildClassicalNahuatlImperfectiveShapeEligibilityFrame");
      const classC = classify("chol-o-ā", { verbClass: "C" });
      const classD = classify("cuā", { verbClass: "D" });
      const cFuture = select({ stem: "chol-o-ā", classProfile: classC.classProfile, mood: "indicative", tense: "future", subject: "3sg" });
      const cOptative = select({ stem: "chol-o-ā", classProfile: classC.classProfile, mood: "optative", tense: "nonpast", subject: "3sg" });
      const dPresent = select({ stem: "cuā", classProfile: classD.classProfile, mood: "indicative", tense: "present", subject: "3sg" });
      return {
        classShapeCounts: freeze({ A: "one-or-two", B: "one", C: "four", D: "two" }),
        classCFutureShape: cFuture.selectedShape,
        classCFutureStem: cFuture.selectedStemVariant,
        classCOptativeShape: cOptative.selectedShape,
        classCUnderlyingSilentCarrier: cOptative.silentCarrier,
        classDPresentShape: dPresent.selectedShape,
        classDPresentStem: dPresent.selectedStemVariant,
        freeShapeSwitchAllowed: cFuture.freeShapeSwitchAllowed,
      };
    },
  );
  const supportiveI = createIssuedOperation(
    "classical-supportive-initial-i-system-frame",
    () => {
      const build = requireFunction(targetObject, "buildClassicalNahuatlVerbstemInitialSupportiveIFrame");
      const afterTla = build("itta", { valence: "projective-nonhuman", supportiveInitialI: true });
      const afterTe = build("itta", { valence: "projective-human", supportiveInitialI: true });
      const real = build("itta", { valence: "projective-nonhuman", initialVowelKind: "real" });
      return {
        tlaStemRealization: afterTla.stemRealization,
        tlaDropsSupportiveI: afterTla.initialSupportiveIDropped,
        teStemRealization: afterTe.stemRealization,
        teBlocksSupportiveIDrop: afterTe.humanProjectiveBlocksDrop,
        realInitialVowelRemains: real.realInitialVowelRemains,
      };
    },
  );
  const tlaFusion = createIssuedOperation(
    "classical-tla-fusion-system-frame",
    () => {
      const build = requireFunction(targetObject, "buildClassicalNahuatlTlaFusionRuleFrame");
      const frame = build("huel-mati", {
        tlaFusion: true,
        sourceSelectionKind: "embed-matrix",
        sourceEmbedStem: "huel",
        sourceMatrixStem: "mati",
        incorporatedAdverb: "huel",
        adverbPosition: "before-tla",
        valence: "projective-nonhuman",
      });
      if (frame.authorizationStatus !== "authorized") throw new Error("classical-tla-fusion-system-blocked");
      return {
        fused: frame.fused,
        sourceValence: frame.valence,
        targetValence: frame.ruleVariables.targetValence,
        sourceStem: frame.sourceStemVariant,
        derivedStem: frame.derivedStem,
        buildKind: frame.tlaFusionBuildKind,
        buildSegment: frame.tlaFusionBuildSegment,
        adverbBoundaryTestPosition: frame.adverbPosition,
      };
    },
  );
  const directional = createIssuedOperation(
    "classical-directional-prefix-system-frame",
    () => {
      const build = requireFunction(targetObject, "buildClassicalNahuatlExpandedVncBoundaryFrame");
      const on = build({ stem: "chōca", valence: "intransitive", mood: "indicative", tense: "present", directionalPrefix: "on" });
      const hual = build({ stem: "chōca", valence: "intransitive", mood: "indicative", tense: "present", directionalPrefix: "huāl" });
      return {
        prefixes: freeze([on.directionalPrefix, hual.directionalPrefix]),
        meanings: freeze([on.directionalMeaning, hual.directionalMeaning]),
        insideVncCore: on.directionalInsideVncCore,
        formulaSlotAuthorized: on.directionalFormulaSlotAuthorized,
        intransitivePlacement: on.directionalPlacement,
        internalPrefixSlots: freeze([...on.vncInternalPrefixSlots]),
      };
    },
  );
  const directionalPlacement = createIssuedOperation(
    "classical-directional-placement-system-frame",
    () => {
      const buildFull = requireFunction(targetObject, "buildClassicalNahuatlVerbstemClassFrame");
      const frame = buildFull("itta", {
        valence: "specific-projective", objectKind: "specific-projective",
        objectPerson: "3sg", subject: "1sg", mood: "indicative",
        tense: "present", verbClass: "A", directionalPrefix: "on",
      });
      if (frame.authorizationStatus !== "authorized") throw new Error("classical-directional-placement-blocked");
      const boundary = frame.proofFrame.conclusion.finalBoundaryRealizationFrame;
      return {
        placement: frame.expandedVncBoundaryFrame.directionalPlacement,
        sourceObjectSlot: boundary.selectedObjectSlotBeforeFinalBoundary,
        finalObjectSlot: boundary.finalObjectSlot,
        finalFormula: boundary.formulaRealization,
        directionalInsideVncCore: frame.expandedVncBoundaryFrame.directionalInsideVncCore,
      };
    },
  );
  const directionalSupport = createIssuedOperation(
    "classical-directional-person-support-system-frame",
    () => {
      const buildFull = requireFunction(targetObject, "buildClassicalNahuatlVerbstemClassFrame");
      const make = (subject) => buildFull("itta", {
        valence: "specific-projective", objectKind: "specific-projective",
        objectPerson: "3sg", subject, mood: "indicative", tense: "present",
        verbClass: "A", directionalPrefix: "on",
      });
      const first = make("1sg");
      const second = make("2sg");
      const optativeSecond = buildFull("itta", {
        valence: "specific-projective", objectKind: "specific-projective",
        objectPerson: "3sg", subject: "2sg", mood: "optative",
        tense: "nonpast", verbClass: "A", directionalPrefix: "on",
      });
      const firstBoundary = first.proofFrame.conclusion.finalBoundaryRealizationFrame;
      const secondBoundary = second.proofFrame.conclusion.finalBoundaryRealizationFrame;
      const optativeSecondBoundary = optativeSecond.proofFrame.conclusion.finalBoundaryRealizationFrame;
      return {
        firstPersonFormula: firstBoundary.formulaRealization,
        secondPersonFormula: secondBoundary.formulaRealization,
        firstPersonCarrier: firstBoundary.finalSubjectCarrier,
        secondPersonCarrier: secondBoundary.finalSubjectCarrier,
        optativeSecondFormula: optativeSecondBoundary.formulaRealization,
        optativeSecondCarrier: optativeSecondBoundary.finalSubjectCarrier,
        supportiveIToOApplied: firstBoundary.pers1SupportiveIToOApplied && secondBoundary.pers1SupportiveIToOApplied,
      };
    },
  );
  const ittaContraction = createIssuedOperation(
    "classical-directional-itta-contraction-system-frame",
    () => {
      const buildTransitive = requireFunction(targetObject, "buildClassicalNahuatlTransitiveVncObjectFrame");
      const relationship = requireFunction(targetObject, "buildClassicalNahuatlObjectRelationshipRuleFrame");
      const contract = requireFunction(targetObject, "buildClassicalNahuatlDirectionalIttaContractionFrame");
      const prior = buildTransitive("itta", {
        subject: "1sg", mood: "indicative", tense: "present",
        objectKind: "specific-projective", objectPerson: "3sg",
      });
      const objectFrame = relationship("itta", { valence: "specific-projective" }, prior);
      const frame = contract({
        stem: "itta", directionalPrefix: "on",
        objectRelationshipRuleFrame: objectFrame, selection: "rare-contracted",
      });
      if (frame.authorizationStatus !== "authorized") throw new Error("classical-itta-contraction-blocked");
      return {
        optional: frame.optional,
        contractionApplies: frame.contractionApplies,
        directionalPrefix: frame.selectedDirectionalPrefix,
        selectedStem: frame.selectedStem,
        deletedDirectionalSegment: frame.deletedDirectionalSegment,
        dismissedSupportiveStemSegment: frame.dismissedSupportiveStemSegment,
      };
    },
  );
  const antecessive = createIssuedOperation(
    "classical-antecessive-prefix-system-frame",
    () => {
      const build = requireFunction(targetObject, "buildClassicalNahuatlExpandedVncBoundaryFrame");
      const frame = build({
        stem: "chōca", valence: "intransitive", mood: "indicative",
        tense: "preterit", outsidePrefixes: ["ō#"],
      });
      return {
        prefix: frame.antecessivePrefix,
        outsideVnc: frame.antecessiveOutsideVnc,
        tenseAuthorized: frame.antecessiveTenseAuthorized,
        externalSlots: freeze([...frame.vncExternalPrefixSlots]),
        objectShapePreserved: frame.objectShapePreservedByOutsidePrefixes,
        objectSpellingAffected: frame.objectSpellingAffectedByOutsidePrefixes,
        optional: true,
        semanticRole: "prior-event-order",
        indicativePastTenses: freeze(["preterit", "distant-past", "imperfect"]),
        literalAlreadyTranslationRequired: false,
      };
    },
  );
  const negativePrefix = createIssuedOperation(
    "classical-negative-prefix-system-frame",
    () => {
      const build = requireFunction(targetObject, "buildClassicalNahuatlExpandedVncBoundaryFrame");
      const frame = build({
        stem: "chōca", valence: "intransitive", mood: "indicative",
        tense: "preterit", outsidePrefixes: ["ah#", "ō#"],
      });
      const caFrame = build({
        stem: "chōca", valence: "intransitive", mood: "indicative",
        tense: "preterit", outsidePrefixes: ["ca#", "ō#"],
      });
      return {
        negativePrefixes: freeze([...frame.negativePrefixes]),
        negativePrefixAlternants: freeze([...new Set([
          ...frame.negativePrefixes,
          ...caFrame.negativePrefixes,
        ])]),
        outsideVnc: frame.negativeOutsideVnc,
        attractedToAntecessive: frame.negativeAttractedToAntecessive,
        outsidePrefixesBecomeFormulaSlots: frame.outsidePrefixesBecomeFormulaSlots,
        prefixalStack: freeze(requireFunction(targetObject, "buildClassicalNahuatlSentencePrefixalStack")({
          sentenceParticles: ["ah#"], expandedVncBoundaryFrame: frame,
        })),
      };
    },
  );
  function sentenceOperation(kind, options) {
    return createIssuedOperation(kind, () => {
      const build = requireFunction(targetObject, "buildClassicalNahuatlVerbstemClassFrame");
      const frame = build("chōca", {
        sourceValence: "intransitive", valence: "intransitive", subject: "3sg",
        mood: "indicative", tense: "present", ...options,
      });
      const sentence = frame.sentenceSurfaceFrame;
      if (frame.authorizationStatus !== "authorized" || sentence?.authorizationStatus !== "authorized") {
        throw new Error(`${kind}:blocked`);
      }
      return {
        sentenceType: sentence.sentenceType,
        sentenceOperationType: sentence.sentenceOperationType,
        consumedVncStatus: sentence.consumedVncStatus,
        indicativeVncRequired: sentence.indicativeVncRequired,
        sentenceParticles: freeze([...sentence.sentenceParticles]),
        negativePrefix: sentence.negativePrefix,
        emphaticParticle: sentence.emphaticParticle,
        questionMode: sentence.questionMode,
        finalPunctuation: sentence.finalPunctuation,
        sentenceActions: freeze([...sentence.sentenceActions]),
      };
    });
  }
  const assertion = sentenceOperation("classical-affirmative-assertion-system-frame", {
    sentenceType: "affirmative-assertion",
  });
  const negativeAssertion = sentenceOperation("classical-negative-assertion-system-frame", {
    negative: true, sentenceType: "negative-assertion",
  });
  const emphaticAssertion = sentenceOperation("classical-emphatic-assertion-system-frame", {
    emphatic: true, sentenceType: "emphatic-affirmative",
  });
  const emphaticNegativeAssertion = sentenceOperation("classical-emphatic-negative-assertion-system-frame", {
    emphatic: true, negative: true, sentenceType: "emphatic-negative",
  });
  const yesNoQuestion = sentenceOperation("classical-yes-no-question-system-frame", {
    questionMode: "cuix", sentenceType: "yes-no-question",
  });

  return freeze({
    buildClassicalNahuatlVerbstemStructureSystemFrame: structure.build,
    isClassicalNahuatlVerbstemStructureSystemFrame: structure.validate,
    buildClassicalNahuatlVerbcoreCitationSystemFrame: citation.build,
    isClassicalNahuatlVerbcoreCitationSystemFrame: citation.validate,
    buildClassicalNahuatlClassBPerfectiveSystemFrame: classB.build,
    isClassicalNahuatlClassBPerfectiveSystemFrame: classB.validate,
    buildClassicalNahuatlImperfectiveShapeSelectionSystemFrame: shapes.build,
    isClassicalNahuatlImperfectiveShapeSelectionSystemFrame: shapes.validate,
    buildClassicalNahuatlSupportiveInitialISystemFrame: supportiveI.build,
    isClassicalNahuatlSupportiveInitialISystemFrame: supportiveI.validate,
    buildClassicalNahuatlTlaFusionSystemFrame: tlaFusion.build,
    isClassicalNahuatlTlaFusionSystemFrame: tlaFusion.validate,
    buildClassicalNahuatlDirectionalPrefixSystemFrame: directional.build,
    isClassicalNahuatlDirectionalPrefixSystemFrame: directional.validate,
    buildClassicalNahuatlDirectionalPlacementSystemFrame: directionalPlacement.build,
    isClassicalNahuatlDirectionalPlacementSystemFrame: directionalPlacement.validate,
    buildClassicalNahuatlDirectionalPersonSupportSystemFrame: directionalSupport.build,
    isClassicalNahuatlDirectionalPersonSupportSystemFrame: directionalSupport.validate,
    buildClassicalNahuatlDirectionalIttaContractionSystemFrame: ittaContraction.build,
    isClassicalNahuatlDirectionalIttaContractionSystemFrame: ittaContraction.validate,
    buildClassicalNahuatlAntecessivePrefixSystemFrame: antecessive.build,
    isClassicalNahuatlAntecessivePrefixSystemFrame: antecessive.validate,
    buildClassicalNahuatlNegativePrefixSystemFrame: negativePrefix.build,
    isClassicalNahuatlNegativePrefixSystemFrame: negativePrefix.validate,
    buildClassicalNahuatlAffirmativeAssertionSystemFrame: assertion.build,
    isClassicalNahuatlAffirmativeAssertionSystemFrame: assertion.validate,
    buildClassicalNahuatlNegativeAssertionSystemFrame: negativeAssertion.build,
    isClassicalNahuatlNegativeAssertionSystemFrame: negativeAssertion.validate,
    buildClassicalNahuatlEmphaticAssertionSystemFrame: emphaticAssertion.build,
    isClassicalNahuatlEmphaticAssertionSystemFrame: emphaticAssertion.validate,
    buildClassicalNahuatlEmphaticNegativeAssertionSystemFrame: emphaticNegativeAssertion.build,
    isClassicalNahuatlEmphaticNegativeAssertionSystemFrame: emphaticNegativeAssertion.validate,
    buildClassicalNahuatlYesNoQuestionSystemFrame: yesNoQuestion.build,
    isClassicalNahuatlYesNoQuestionSystemFrame: yesNoQuestion.validate,
  });
}

export function installClassicalVncSemanticOperationsGlobals(
  targetObject = globalThis,
  installationContext = null,
) {
  const semanticTarget = Object.create(targetObject);
  Object.defineProperties(
    semanticTarget,
    Object.getOwnPropertyDescriptors(
      installationContext?.moduleDependencyCapabilities || {},
    ),
  );
  const api = createClassicalVncSemanticOperationsApi(semanticTarget);
  Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
  return api;
}
