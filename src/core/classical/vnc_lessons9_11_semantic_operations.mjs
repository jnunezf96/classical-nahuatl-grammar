// Compact validation projections for Lessons 9-11. These functions do not
// implement grammar: they execute the already-installed canonical VNC/irregular
// operations and retain only the typed facts needed by owner-scoped proof.

function freezeValue(value) {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  for (const nested of Object.values(value)) freezeValue(nested);
  return Object.freeze(value);
}

const OPTATIVE_RECIPES = Object.freeze({
  "nonpast-class-b": ["(cochi)", { valence: "intransitive", subject: "1sg", mood: "optative", tense: "nonpast", verbClass: "B", sentenceType: "wish-sentence", introductoryParticle: "mā" }],
  "past-class-a": ["(pāqui)", { valence: "intransitive", subject: "2sg", mood: "optative", tense: "past", verbClass: "A", sentenceType: "wish-sentence", introductoryParticle: "mā" }],
  "preterit-optative": ["(cochi)", { valence: "intransitive", subject: "1sg", mood: "optative", tense: "preterit", verbClass: "B", sentenceType: "wish-sentence", introductoryParticle: "mā", antecessive: true }],
  "class-c-nonpast": ["(chol-o-a)", { valence: "intransitive", subject: "3pl", mood: "optative", tense: "nonpast", verbClass: "C", sentenceType: "wish-sentence", introductoryParticle: "mā" }],
  "class-d-nonpast": ["(cua)", { valence: "intransitive", subject: "3sg", mood: "optative", tense: "nonpast", verbClass: "D", sentenceType: "wish-sentence", introductoryParticle: "mā" }],
  "wish-ma": ["(cochi)", { valence: "intransitive", subject: "1sg", mood: "optative", tense: "nonpast", verbClass: "B", sentenceType: "wish-sentence", introductoryParticle: "mā" }],
  "wish-tla": ["(cochi)", { valence: "intransitive", subject: "1sg", mood: "optative", tense: "nonpast", verbClass: "B", sentenceType: "wish-sentence", introductoryParticle: "tlā" }],
  "wish-past": ["(pāqui)", { valence: "intransitive", subject: "2sg", mood: "optative", tense: "past", verbClass: "A", sentenceType: "wish-sentence", introductoryParticle: "mā" }],
  "wish-antecessive": ["(pāqui)", { valence: "intransitive", subject: "1sg", mood: "optative", tense: "past", verbClass: "A", sentenceType: "wish-sentence", introductoryParticle: "mā", antecessive: true }],
  "wish-urgent": ["(cochi)", { valence: "intransitive", subject: "1sg", mood: "optative", tense: "nonpast", verbClass: "B", sentenceType: "wish-sentence", introductoryParticle: "mā", introductoryModifier: "ye-cuēl", prefaceParticle: "ihyo" }],
  "negative-wish": ["(cochi)", { valence: "intransitive", subject: "3pl", mood: "optative", tense: "nonpast", verbClass: "B", sentenceType: "wish-sentence", introductoryParticle: "mā", negative: true }],
  "direct-command": ["(ihcihui)", { valence: "intransitive", subject: "2sg", mood: "optative", tense: "nonpast", verbClass: "B", sentenceType: "command-sentence" }],
  "indirect-command": ["(cochi)", { valence: "intransitive", subject: "3sg", mood: "optative", tense: "nonpast", verbClass: "B", sentenceType: "command-sentence", introductoryParticle: "mā" }],
  "exhortation": ["(cochi)", { valence: "intransitive", subject: "1sg", mood: "optative", tense: "nonpast", verbClass: "B", sentenceType: "exhortation-sentence", introductoryParticle: "mā" }],
  "courteous-command": ["(ihcihui)", { valence: "intransitive", subject: "2sg", mood: "optative", tense: "nonpast", verbClass: "B", sentenceType: "command-sentence", introductoryParticle: "tlā", introductoryModifier: "tēl" }],
  "future-command": ["(tequi-ti)", { valence: "intransitive", subject: "2sg", mood: "optative", tense: "future", verbClass: "A", sentenceType: "command-sentence", introductoryParticle: "mā" }],
  "negative-command": ["(chīhua)", { valence: "intransitive", subject: "2sg", mood: "optative", tense: "nonpast", verbClass: "A", sentenceType: "command-sentence", negative: true }],
  "future-negative-command": ["(chīhua)", { valence: "intransitive", subject: "2sg", mood: "optative", tense: "future", verbClass: "A", sentenceType: "command-sentence", introductoryParticle: "mā", negative: true }],
});

const ADMONITIVE_RECIPES = Object.freeze({
  "class-a-singular": ["(tzahtzi)", { valence: "intransitive", subject: "1sg", mood: "admonitive", tense: "nonpast", verbClass: "A", introductoryParticle: "mā" }],
  "class-b-singular": ["(huetz)", { valence: "intransitive", subject: "2sg", mood: "admonitive", tense: "nonpast", verbClass: "B", introductoryParticle: "mā" }],
  "class-b-plural": ["(huetz)", { valence: "intransitive", subject: "1pl", mood: "admonitive", tense: "nonpast", verbClass: "B", introductoryParticle: "mā" }],
  "direct-warning": ["(huetz)", { valence: "intransitive", subject: "2sg", mood: "admonitive", tense: "nonpast", verbClass: "B", introductoryParticle: "mā", translationReading: "warning-sense" }],
  "indirect-warning": ["(chol-o-a)", { valence: "intransitive", subject: "3sg", mood: "admonitive", tense: "nonpast", verbClass: "C", introductoryParticle: "mā", translationReading: "warning-sense" }],
  "exhortative-warning": ["(tzahtzi)", { valence: "intransitive", subject: "1sg", mood: "admonitive", tense: "nonpast", verbClass: "A", introductoryParticle: "mā", translationReading: "warning-sense" }],
  "strengthened-warning": ["(tzahtzi)", { valence: "intransitive", subject: "1sg", mood: "admonitive", tense: "nonpast", verbClass: "A", introductoryParticle: "mā", introductoryModifier: "nēn", translationReading: "warning-sense" }],
  "negative-admonition": ["(temō)", { valence: "intransitive", subject: "1sg", mood: "admonitive", tense: "nonpast", verbClass: "A", introductoryParticle: "mā", negative: true, translationReading: "reject-caution-sense" }],
  "class-c-contrast": ["(chol-o-a)", { valence: "intransitive", subject: "1sg", mood: "admonitive", tense: "nonpast", verbClass: "C", introductoryParticle: "mā" }],
  "class-d-contrast": ["(cua)", { valence: "intransitive", subject: "1sg", mood: "admonitive", tense: "nonpast", verbClass: "D", introductoryParticle: "mā" }],
});

const IRREGULAR_RECIPES = Object.freeze({
  "ti-ca-singular": ["(ca-ti)", { valence: "intransitive", subject: "1sg", mood: "indicative", tense: "preterit", verbClass: "B" }],
  "ti-ca-plural": ["(ca-ti)", { valence: "intransitive", subject: "1pl", mood: "indicative", tense: "preterit", verbClass: "B" }],
  "ti-huehue": ["(huē-huē-ti)", { valence: "intransitive", subject: "1sg", mood: "indicative", tense: "preterit", verbClass: "B" }],
  "ti-ilama": ["(ilama-ti)", { valence: "intransitive", subject: "1sg", mood: "indicative", tense: "preterit", verbClass: "B" }],
  "ihca-present": ["(ih-ca)", { valence: "intransitive", subject: "1sg", mood: "indicative", tense: "present", verbClass: "A" }],
  "ihca-past": ["(ih-ca)", { valence: "intransitive", subject: "1sg", mood: "indicative", tense: "general-past", verbClass: "A" }],
  "ono-present": ["(on-o)", { valence: "intransitive", subject: "1sg", mood: "indicative", tense: "present", verbClass: "A" }],
  "pilca-present": ["(pil-ca)", { valence: "intransitive", subject: "3sg", mood: "indicative", tense: "present", verbClass: "A" }],
  "a-present": ["(ā)", { valence: "intransitive", subject: "1sg", mood: "indicative", tense: "present", verbClass: "A", polarity: "positive" }],
  "a-negative": ["(ā)", { valence: "intransitive", subject: "1sg", mood: "indicative", tense: "present", verbClass: "A", polarity: "negative", negative: true }],
  "huitz-singular": ["(hui-tz)", { valence: "intransitive", subject: "1sg", mood: "indicative", tense: "present" }],
  "huitz-plural": ["(hui-tz)", { valence: "intransitive", subject: "1pl", mood: "indicative", tense: "present" }],
  "huitz-past": ["(hui-tz)", { valence: "intransitive", subject: "2sg", mood: "indicative", tense: "general-past" }],
  "amia-quen": ["(am-i-ā)", { valence: "intransitive", subject: "3sg", mood: "indicative", tense: "present", verbClass: "C", construction: "quēn" }],
  "amia-quen-mach": ["(am-i-ā)", { valence: "intransitive", subject: "3sg", mood: "indicative", tense: "present", verbClass: "C", construction: "quēn-mach" }],
  "zero-ia": ["(0-i-ā)", { valence: "intransitive", subject: "3pl", mood: "indicative", tense: "present", verbClass: "C", zeroRoot: true }],
  "mani-present": ["(mani)", { valence: "intransitive", subject: "3sg", mood: "indicative", tense: "present", verbClass: "B", referentClass: "mass-or-crowd" }],
  "mani-preterit": ["(mani)", { valence: "intransitive", subject: "3sg", mood: "indicative", tense: "preterit", verbClass: "B" }],
  "mani-past": ["(mani)", { valence: "intransitive", subject: "3sg", mood: "indicative", tense: "general-past", verbClass: "B" }],
  "nemi-past": ["(nemi)", { valence: "intransitive", subject: "3sg", mood: "indicative", tense: "general-past", verbClass: "A" }],
  "ye-present-singular": ["(ye)", { valence: "intransitive", subject: "1sg", mood: "indicative", tense: "present", verbClass: "A" }],
  "ye-present-plural": ["(ye)", { valence: "intransitive", subject: "1pl", mood: "indicative", tense: "present", verbClass: "A" }],
  "ye-general-past": ["(ye)", { valence: "intransitive", subject: "1sg", mood: "indicative", tense: "general-past", verbClass: "A" }],
  "ye-customary": ["(ye)", { valence: "intransitive", subject: "2sg", mood: "indicative", tense: "customary-present", verbClass: "A" }],
  "ye-imperfect": ["(ye)", { valence: "intransitive", subject: "3sg", mood: "indicative", tense: "imperfect", verbClass: "A" }],
  "ye-future": ["(ye)", { valence: "intransitive", subject: "2pl", mood: "indicative", tense: "future", verbClass: "A" }],
  "ye-optative": ["(ye)", { valence: "intransitive", subject: "3pl", mood: "optative", tense: "nonpast", verbClass: "A" }],
  "ye-past-optative": ["(ye)", { valence: "intransitive", subject: "1pl", mood: "optative", tense: "past", verbClass: "A" }],
  "ye-admonitive": ["(ye)", { valence: "intransitive", subject: "2sg", mood: "admonitive", tense: "nonpast", verbClass: "A", introductoryParticle: "mā" }],
  "ya-present-singular": ["(yā)", { valence: "intransitive", subject: "1sg", mood: "indicative", tense: "present", verbClass: "D" }],
  "ya-present-plural": ["(yā)", { valence: "intransitive", subject: "1pl", mood: "indicative", tense: "present", verbClass: "D" }],
  "ya-optative-singular": ["(yā)", { valence: "intransitive", subject: "2sg", mood: "optative", tense: "nonpast", verbClass: "D" }],
  "ya-optative-plural": ["(yā)", { valence: "intransitive", subject: "2pl", mood: "optative", tense: "nonpast", verbClass: "D" }],
  "ya-general-past": ["(yā)", { valence: "intransitive", subject: "1sg", mood: "indicative", tense: "general-past", verbClass: "D" }],
  "ya-customary": ["(yā)", { valence: "intransitive", subject: "1sg", mood: "indicative", tense: "customary-present", verbClass: "D" }],
  "ya-imperfect": ["(yā)", { valence: "intransitive", subject: "2sg", mood: "indicative", tense: "imperfect", verbClass: "D" }],
  "ya-future": ["(yā)", { valence: "intransitive", subject: "1sg", mood: "indicative", tense: "future", verbClass: "D" }],
  "ya-preterit": ["(yā)", { valence: "intransitive", subject: "1sg", mood: "indicative", tense: "preterit", verbClass: "D" }],
  "ya-distant-past": ["(yā)", { valence: "intransitive", subject: "2sg", mood: "indicative", tense: "distant-past", verbClass: "D" }],
  "ya-admonitive": ["(yā)", { valence: "intransitive", subject: "2sg", mood: "admonitive", tense: "nonpast", verbClass: "D", introductoryParticle: "mā" }],
  "hual-present": ["(huāl-lā)", { valence: "intransitive", subject: "2sg", mood: "indicative", tense: "present", verbClass: "D" }],
  "hual-present-plural": ["(huāl-lā)", { valence: "intransitive", subject: "2pl", mood: "indicative", tense: "present", verbClass: "D" }],
  "hual-preterit": ["(huāl-lā)", { valence: "intransitive", subject: "1pl", mood: "indicative", tense: "preterit", verbClass: "D" }],
  "hual-admonitive": ["(huāl-lā)", { valence: "intransitive", subject: "2sg", mood: "admonitive", tense: "nonpast", verbClass: "D", introductoryParticle: "mā" }],
});

function compactSentence(frame) {
  const sentence = frame?.sentenceSurfaceFrame || {};
  return {
    authorizationStatus: sentence.authorizationStatus || "not-applicable",
    sentenceType: sentence.sentenceType || "",
    canvasSentenceRole: sentence.canvasSentenceRole || "",
    sentenceParticles: sentence.sentenceParticles || [],
    sentencePrefixalStack: sentence.sentencePrefixalStack || [],
    introductoryParticle: sentence.introductoryParticle || "",
    introductoryParticleRequired: sentence.introductoryParticleRequired === true,
    introductoryParticleOmissionAllowed: sentence.introductoryParticleOmissionAllowed === true,
    prefaceParticle: sentence.prefaceParticle || "",
    introductoryModifier: sentence.introductoryModifier || "",
    negativePrefix: sentence.negativePrefix || "",
    lesson9NegativeTransformation: sentence.lesson9NegativeTransformation || "",
    futureIndicativeAsOptative: sentence.futureIndicativeAsOptative === true,
    consumedVncStatus: sentence.consumedVncStatus || "",
    sentenceParticlesBecomeFormulaSlots: sentence.sentenceParticlesBecomeFormulaSlots === true,
    admonitiveOnlyNonpastTense: sentence.admonitiveOnlyNonpastTense === true,
    admonitiveStemAspect: sentence.admonitiveStemAspect || "",
    admonitiveTenseMorph: sentence.admonitiveTenseMorph || "",
    admonitiveNumberDyad: sentence.admonitiveNumberDyad || {},
    admonitiveSingularNumberDyad: sentence.admonitiveSingularNumberDyad || "",
    admonitivePluralNumberDyads: sentence.admonitivePluralNumberDyads || [],
    admonitiveForce: sentence.admonitiveForce || "",
    admonitiveMoodPolarity: sentence.admonitiveMoodPolarity || "",
    admonitiveNenRequired: sentence.admonitiveNenRequired === true,
    admonitiveNenOptional: sentence.admonitiveNenOptional === true,
    admonitiveMaNenCollocation: sentence.admonitiveMaNenCollocation || "",
    lesson10NegativeTransformation: sentence.lesson10NegativeTransformation || "",
    admonitiveNegativeForceDefinition: sentence.admonitiveNegativeForceDefinition || "",
    admonitiveRequestedTranslationReadingAuthorized: sentence.admonitiveRequestedTranslationReadingAuthorized === true,
    admonitiveSecondPersonOptativeDistinction: sentence.admonitiveSecondPersonOptativeDistinction || "",
    admonitivePluralSubjectsAlwaysDistinctive: sentence.admonitivePluralSubjectsAlwaysDistinctive === true,
    admonitiveGlottalStopAmbiguityWarning: sentence.admonitiveGlottalStopAmbiguityWarning === true,
    admonitiveHMorphRoleContrast: sentence.admonitiveHMorphRoleContrast || "",
    admonitiveAntecessivePrefixAllowed: sentence.admonitiveAntecessivePrefixAllowed === true,
    admonitiveContrastSet: sentence.admonitiveContrastSet || [],
    lesson11Construction: sentence.lesson11Construction || "",
    lesson11ConstructionParticles: sentence.lesson11ConstructionParticles || [],
  };
}

function compactLesson11TenseMapping(plan = {}, selectedStem = "") {
  const semanticTenseValue = plan.semanticTenseValue || "";
  const morphologicalTense = plan.morphologicalTense || "";
  const interpretation = plan.paradigmTense || semanticTenseValue;
  return {
    lexemeId: plan.lexemeId || "",
    selectedStem,
    morphologicalTense,
    semanticTenseValue,
    interpretation,
    remapped: Boolean(
      morphologicalTense
      && semanticTenseValue
      && (
        morphologicalTense !== semanticTenseValue
        || interpretation !== semanticTenseValue
      )
    ),
    relation: plan.paradigmRelationFrame?.relationDisplay || "",
  };
}

function compactCanonicalFrame(frame, recipeId) {
  const logic = frame?.selectedOutputLogicFrame?.outputFillers || {};
  const plan = frame?.lesson11ParadigmPlan || {};
  return freezeValue({
    kind: "classical-nahuatl-lessons9-11-validation-operation-frame",
    authorizationStatus: frame?.authorizationStatus || "blocked",
    blockReason: frame?.blockReason || "",
    recipeId,
    formulaRealization: frame?.formulaRealization || "",
    classId: frame?.classId || "",
    predicateStem: logic.predicateStem || logic.stem || frame?.predicateFormationRuleFrame?.stemVariant || "",
    tenseMorph: logic.tns || logic.tenseMorph || frame?.priorVncFrame?.tenseMorph || "",
    personDyad: logic.personDyad || frame?.priorVncFrame?.personDyad || {},
    numberDyad: logic.numberDyad || frame?.priorVncFrame?.numberDyad || {},
    sentence: compactSentence(frame),
    lesson11: {
      applies: plan.applies === true,
      lexemeId: plan.lexemeId || "",
      irregularityKind: plan.irregularityKind || "",
      paradigmTense: plan.paradigmTense || "",
      semanticTenseValue: plan.semanticTenseValue || "",
      morphologicalTense: plan.morphologicalTense || "",
      selectedStem: frame?.lesson11VncApplicationFrame?.selectedPredicateStem || "",
      tenseMapping: compactLesson11TenseMapping(
        plan,
        frame?.lesson11VncApplicationFrame?.selectedPredicateStem || "",
      ),
      alternatives: plan.alternatives || [],
      authorizedAlternatives: plan.authorizedAlternatives || [],
      rejectedVariants: plan.rejectedVariants || [],
      actions: plan.actions || [],
      contextualInterpretation: plan.contextualInterpretation || "",
      usageStatus: plan.usageStatus || "",
      relation: plan.paradigmRelationFrame?.relationDisplay || "",
      zeroRootPreserved: plan.zeroRootPreserved === true,
      requiredCooperatingLayer: plan.requiredCooperatingLayer || "",
    },
  });
}

export function createClassicalVncValidationSemanticOperationsApi(targetObject = globalThis) {
  const issuedOptative = new WeakSet();
  const issuedAdmonitive = new WeakSet();
  const issuedIrregular = new WeakSet();

  function executeRecipe(recipes, recipeId) {
    const recipe = recipes[String(recipeId || "")];
    if (!recipe || typeof targetObject?.buildClassicalNahuatlVerbstemClassFrame !== "function") {
      return freezeValue({
        kind: "classical-nahuatl-lessons9-11-validation-operation-frame",
        authorizationStatus: "blocked",
        blockReason: recipe ? "canonical-verbstem-builder-unavailable" : "validation-recipe-not-recognized",
        recipeId: String(recipeId || ""),
      });
    }
    const [stem, sourceOptions] = recipe;
    const options = { ...sourceOptions };
    if (recipeId === "zero-ia") {
      const nnc = targetObject.buildClassicalNahuatlPronominalNncFrame?.({
        subtype: "personal-simple",
        subject: options.subject,
      });
      options.pronominalNncCooperationFrame = nnc?.lesson11CooperationFrame || null;
    }
    return compactCanonicalFrame(
      targetObject.buildClassicalNahuatlVerbstemClassFrame(stem, options),
      recipeId,
    );
  }

  function executeIrregularRecipe(recipeId) {
    const recipe = IRREGULAR_RECIPES[String(recipeId || "")];
    if (!recipe
      || typeof targetObject?.buildClassicalNahuatlIrregularVncParadigmPlan !== "function"
      || typeof targetObject?.buildClassicalNahuatlFiniteVncResult !== "function"
      || typeof targetObject?.applyClassicalNahuatlLesson11PlanToVncSlotFrame !== "function"
      || typeof targetObject?.realizeClassicalNahuatlVncSlotFrameAtFinalBoundary !== "function") {
      return freezeValue({
        kind: "classical-nahuatl-lessons9-11-validation-operation-frame",
        authorizationStatus: "blocked",
        blockReason: recipe ? "canonical-irregular-vnc-dependency-unavailable" : "validation-recipe-not-recognized",
        recipeId: String(recipeId || ""),
      });
    }
    const [sourceStem, sourceOptions] = recipe;
    const options = { ...sourceOptions };
    if (recipeId === "zero-ia") {
      const nnc = targetObject.buildClassicalNahuatlPronominalNncFrame?.({
        subtype: "personal-simple",
        subject: options.subject,
      });
      options.pronominalNncCooperationFrame = nnc?.lesson11CooperationFrame || null;
    }
    const canonicalFrame = targetObject.buildClassicalNahuatlVerbstemClassFrame?.(
      sourceStem,
      options,
    );
    if (canonicalFrame?.authorizationStatus === "authorized") {
      return compactCanonicalFrame(canonicalFrame, recipeId);
    }
    const stem = String(sourceStem).replace(/^\(|\)$/gu, "");
    const plan = targetObject.buildClassicalNahuatlIrregularVncParadigmPlan(stem, {
      ...options,
      requestedMood: options.mood,
      requestedSemanticTense: options.tense,
    });
    if (plan?.authorizationStatus !== "authorized") {
      return freezeValue({
        kind: "classical-nahuatl-lessons9-11-validation-operation-frame",
        authorizationStatus: "blocked",
        blockReason: plan?.blockReason || "canonical-irregular-vnc-plan-blocked",
        recipeId,
      });
    }
    const typedBase = targetObject.buildClassicalNahuatlFiniteVncResult(
      plan.canonicalSourceStem || stem,
      {
        subject: options.subject,
        mood: plan.morphologicalMood,
        tense: plan.morphologicalTense,
        verbClass: plan.selectedClassOverride || options.verbClass,
      },
    );
    const application = targetObject.applyClassicalNahuatlLesson11PlanToVncSlotFrame(
      plan,
      typedBase?.vncSlotFrame,
    );
    const boundary = targetObject.realizeClassicalNahuatlVncSlotFrameAtFinalBoundary({
      vncSlotFrame: application?.typedVncSlotFrame,
    });
    return freezeValue({
      kind: "classical-nahuatl-lessons9-11-validation-operation-frame",
      authorizationStatus: boundary?.authorizationStatus || application?.authorizationStatus || "blocked",
      blockReason: boundary?.blockReason || application?.blockReason || "",
      recipeId,
      formulaRealization: boundary?.formulaRealization || "",
      classId: plan.selectedClassOverride || options.verbClass || "",
      predicateStem: application?.selectedPredicateStem || "",
      tenseMorph: application?.selectedTns || "",
      personDyad: typedBase?.personDyad || {},
      numberDyad: {
        num1: application?.typedVncSlotFrame?.slots?.number?.num1 || "",
        num2: application?.typedVncSlotFrame?.slots?.number?.num2 || "",
      },
      sentence: {},
      lesson11: {
        applies: plan.applies === true,
        lexemeId: plan.lexemeId || "",
        irregularityKind: plan.irregularityKind || "",
        paradigmTense: plan.paradigmTense || "",
        semanticTenseValue: plan.semanticTenseValue || "",
        morphologicalTense: plan.morphologicalTense || "",
        selectedStem: application?.selectedPredicateStem || "",
        tenseMapping: compactLesson11TenseMapping(
          plan,
          application?.selectedPredicateStem || "",
        ),
        alternatives: plan.alternatives || [],
        authorizedAlternatives: plan.authorizedAlternatives || [],
        rejectedVariants: plan.rejectedVariants || [],
        actions: plan.actions || [],
        contextualInterpretation: plan.contextualInterpretation || "",
        usageStatus: plan.usageStatus || "",
        relation: plan.paradigmRelationFrame?.relationDisplay || "",
        zeroRootPreserved: plan.zeroRootPreserved === true,
        requiredCooperatingLayer: plan.requiredCooperatingLayer || "",
      },
    });
  }

  function buildClassicalNahuatlOptativeValidationFrame(recipeId = "") {
    const frame = executeRecipe(OPTATIVE_RECIPES, recipeId);
    if (frame.authorizationStatus === "authorized") issuedOptative.add(frame);
    return frame;
  }
  function isClassicalNahuatlOptativeValidationFrame(frame = null) {
    return Boolean(issuedOptative.has(frame) && frame.authorizationStatus === "authorized" && Object.isFrozen(frame));
  }
  function buildClassicalNahuatlAdmonitiveValidationFrame(recipeId = "") {
    const frame = executeRecipe(ADMONITIVE_RECIPES, recipeId);
    if (frame.authorizationStatus === "authorized") issuedAdmonitive.add(frame);
    return frame;
  }
  function isClassicalNahuatlAdmonitiveValidationFrame(frame = null) {
    return Boolean(issuedAdmonitive.has(frame) && frame.authorizationStatus === "authorized" && Object.isFrozen(frame));
  }
  function buildClassicalNahuatlIrregularValidationFrame(recipeId = "") {
    if (String(recipeId).startsWith("idiom:")) {
      const idiom = targetObject.buildClassicalNahuatlIdiomFrame?.(String(recipeId).slice(6));
      const frame = freezeValue({
        kind: "classical-nahuatl-lessons9-11-validation-operation-frame",
        authorizationStatus: idiom?.authorizationStatus || "blocked",
        blockReason: idiom?.blockReason || "",
        recipeId,
        idiom: {
          idiomId: idiom?.idiomId || "",
          witnessed: idiom?.witnessed === true,
          phraseRequiresItsOwnConstructionFrame: idiom?.phraseRequiresItsOwnConstructionFrame === true,
          ordinaryVncGenerationAffected: idiom?.ordinaryVncGenerationAffected === true,
        },
      });
      if (frame.authorizationStatus === "authorized") issuedIrregular.add(frame);
      return frame;
    }
    const frame = executeIrregularRecipe(recipeId);
    if (frame.authorizationStatus === "authorized") issuedIrregular.add(frame);
    return frame;
  }
  function isClassicalNahuatlIrregularValidationFrame(frame = null) {
    return Boolean(issuedIrregular.has(frame) && frame.authorizationStatus === "authorized" && Object.isFrozen(frame));
  }
  return Object.freeze({
    buildClassicalNahuatlOptativeValidationFrame,
    isClassicalNahuatlOptativeValidationFrame,
    buildClassicalNahuatlAdmonitiveValidationFrame,
    isClassicalNahuatlAdmonitiveValidationFrame,
    buildClassicalNahuatlIrregularValidationFrame,
    isClassicalNahuatlIrregularValidationFrame,
  });
}
