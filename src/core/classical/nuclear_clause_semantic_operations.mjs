// Typed, owner-neutral construction helpers for nuclear-clause semantic owners.
// This module groups reusable mechanics only. It owns no Inventory atoms and
// one builder's issued frame can never satisfy another builder's validator.

const freeze = Object.freeze;

function deepFreeze(value, seen = new WeakSet()) {
  if (!value || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const key of Reflect.ownKeys(value)) deepFreeze(value[key], seen);
  return freeze(value);
}

function requireFunction(target, name) {
  const fn = target?.[name];
  if (typeof fn !== "function") throw new Error(`canonical-capability-required:${name}`);
  return fn;
}

function createIssuedFrameOwner(kind) {
  const issued = new WeakSet();
  return freeze({
    issue(value) {
      const frame = deepFreeze({ kind, version: 1, ...value });
      issued.add(frame);
      return frame;
    },
    validates(frame) {
      return Boolean(frame && issued.has(frame) && frame.kind === kind && frame.version === 1);
    },
  });
}

export function createClassicalNahuatlNuclearSemanticOperationsRuntime(
  targetObject = globalThis,
) {
  const nuclearFormulaOwner = createIssuedFrameOwner(
    "classical-nahuatl-nuclear-formula-variant-system-frame",
  );
  const finiteFormulaOwner = createIssuedFrameOwner(
    "classical-nahuatl-intransitive-vnc-formula-system-frame",
  );
  const personDyadOwner = createIssuedFrameOwner(
    "classical-nahuatl-subject-person-dyad-system-frame",
  );
  const numberSuffixOwner = createIssuedFrameOwner(
    "classical-nahuatl-subject-number-suffix-system-frame",
  );
  const subjectParadigmOwner = createIssuedFrameOwner(
    "classical-nahuatl-subject-paradigm-system-frame",
  );
  const moodTenseOwner = createIssuedFrameOwner(
    "classical-nahuatl-mood-tense-filler-system-frame",
  );
  const verbstemCategoryOwner = createIssuedFrameOwner(
    "classical-nahuatl-verbstem-category-system-frame",
  );
  const singularAlternationOwner = createIssuedFrameOwner(
    "classical-nahuatl-singular-number-dyad-alternation-frame",
  );
  const transitiveFormulaOwner = createIssuedFrameOwner(
    "classical-nahuatl-transitive-vnc-formula-system-frame",
  );
  const monadicObjectOwner = createIssuedFrameOwner(
    "classical-nahuatl-monadic-object-system-frame",
  );
  const projectiveObjectOwner = createIssuedFrameOwner(
    "classical-nahuatl-projective-object-system-frame",
  );
  const reflexiveObjectOwner = createIssuedFrameOwner(
    "classical-nahuatl-mainline-reflexive-object-system-frame",
  );

  function buildClassicalNahuatlNuclearFormulaVariantSystemFrame() {
    const build = requireFunction(targetObject, "buildClassicalNahuatlNuclearClauseResult");
    const variants = {
      dyadicVnc: build("nemi", {
        nuclearClauseKind: "verbal-nuclear-clause",
        transitivity: "transitive",
        valenceArity: "dyadic",
      }),
      monadicVnc: build("nemi", {
        nuclearClauseKind: "verbal-nuclear-clause",
        transitivity: "transitive",
        valenceArity: "monadic",
      }),
      vacantVnc: build("nemi", {
        nuclearClauseKind: "verbal-nuclear-clause",
        transitivity: "intransitive",
        valenceArity: "vacant",
      }),
      dyadicNnc: build("calli", {
        nuclearClauseKind: "nominal-nuclear-clause",
        stateArity: "dyadic",
      }),
      monadicNnc: build("calli", {
        nuclearClauseKind: "nominal-nuclear-clause",
        stateArity: "monadic",
      }),
      vacantNnc: build("calli", {
        nuclearClauseKind: "nominal-nuclear-clause",
        stateArity: "vacant",
      }),
    };
    return nuclearFormulaOwner.issue({
      authorizationStatus: "authorized",
      variants,
    });
  }

  function buildClassicalNahuatlIntransitiveVncFormulaSystemFrame() {
    const build = requireFunction(targetObject, "buildClassicalNahuatlFiniteVncResult");
    const result = build("nemi", {
      subject: "3sg", mood: "indicative", tense: "present",
    });
    return finiteFormulaOwner.issue({
      authorizationStatus: "authorized",
      transitivity: result.source.transitivity,
      structuralFormula: result.nuclearClauseResult.formulaTemplate,
      formulaSlots: result.nuclearClauseResult.formulaSlots,
      finiteFormula: result.formula,
    });
  }

  function buildClassicalNahuatlSubjectPersonDyadSystemFrame() {
    const get = requireFunction(targetObject, "getClassicalNahuatlFiniteSubjectPersonDyad");
    const getNumber = requireFunction(targetObject, "getClassicalNahuatlFiniteSubjectNumberDyad");
    const third = get("3sg", "indicative", { stem: "mati" });
    const second = get("2sg", "indicative", { stem: "mati" });
    const firstPlural = get("1pl", "indicative", { stem: "mati" });
    const firstSingular = get("1sg", "indicative", { stem: "mati" });
    const secondPlural = get("2pl", "indicative", { stem: "mati" });
    const secondNumber = getNumber({ subject: "2sg", mood: "indicative", tense: "present", stem: "mati" });
    const firstPluralNumber = getNumber({ subject: "1pl", mood: "indicative", tense: "present", stem: "mati" });
    const secondPluralMEnvironments = secondPlural.pers1VariantRule === "am-before-vowel-m-p"
      ? ["before-vowel", "before-m", "before-p"]
      : [];
    const licensedSecondPluralNasalAssimilations = ["am", "an", "az", "ax"];
    return personDyadOwner.issue({
      authorizationStatus: "authorized",
      locus: "pers1",
      fillers: {
        third: third.pers1,
        secondSingular: second.pers1BaseMorph,
        firstPlural: firstPlural.pers1BaseMorph,
        firstSingular: firstSingular.pers1BaseMorph,
        secondPluralVariants: secondPlural.pers1Variants,
      },
      allPers2Fillers: [third, second, firstPlural, firstSingular, secondPlural]
        .map((frame) => frame.pers2),
      supportiveVowel: firstSingular.pers1SupportiveVowel,
      supportiveBeforeConsonant: firstSingular.pers1SupportiveVowelPresent,
      secondPluralMCondition: secondPlural.pers1VariantRule,
      secondSingularFirstPluralPers1Homophonous:
        second.pers1BaseMorph === firstPlural.pers1BaseMorph,
      numberSuffixRequiredForSecondSingularFirstPluralDisambiguation:
        second.pers1BaseMorph === firstPlural.pers1BaseMorph
        && secondNumber.num2 !== firstPluralNumber.num2,
      secondPluralMEnvironments,
      secondPluralNasalAssimilationVariants: secondPlural.pers1Variants,
      allLicensedSecondPluralNasalAssimilationsAvailable:
        licensedSecondPluralNasalAssimilations.every(variant => secondPlural.pers1Variants.includes(variant)),
    });
  }

  function buildClassicalNahuatlSubjectNumberSuffixSystemFrame() {
    const get = requireFunction(targetObject, "getClassicalNahuatlFiniteSubjectNumberDyad");
    const frame = (subject, mood, tense) => get({ subject, mood, tense, stem: "nemi" });
    return numberSuffixOwner.issue({
      authorizationStatus: "authorized",
      locus: "num2",
      singular: frame("1sg", "indicative", "present").num2,
      pluralVariants: ["h", "eh", "ān", "in"],
      presentPlural: frame("1pl", "indicative", "present").num2,
      futurePlural: frame("1pl", "indicative", "future").num2,
      optativeNonpastPlural: frame("1pl", "optative", "nonpast").num2,
      admonitiveNonpastPlural: frame("1pl", "admonitive", "nonpast").num2,
      admonitiveVariants: frame("1pl", "admonitive", "nonpast").num2Variants,
    });
  }

  function buildClassicalNahuatlSubjectParadigmSystemFrame() {
    const get = requireFunction(targetObject, "getClassicalNahuatlFiniteSubjectNumberDyad");
    const getPerson = requireFunction(targetObject, "getClassicalNahuatlFiniteSubjectPersonDyad");
    const frame = (mood, tense) => get({ subject: "1pl", mood, tense, stem: "nemi" });
    const person = (subject, mood = "indicative") => getPerson(subject, mood, { stem: "nemi" });
    const number = (subject, mood, tense) => get({ subject, mood, tense, stem: "nemi" });
    const carrier = value => value === "0" ? "Ø" : value;
    const subjectFormula = (subject, mood, tense) => {
      const personFrame = person(subject, mood);
      const numberFrame = number(subject, mood, tense);
      return `#${carrier(personFrame.pers1BaseMorph)}-${carrier(personFrame.pers2)}(...+${carrier(numberFrame.num1)}-${carrier(numberFrame.num2)}#`;
    };
    const thirdCommonInterpretations = {
      singularHumanMale: "he",
      singularHumanFemale: "she",
      singularAnimateNonhuman: "it",
      singularNonanimate: "it",
      pluralNonanimate: "they",
    };
    const thirdPluralPerson = person("3pl");
    const thirdPluralNumber = number("3pl", "indicative", "present");
    const secondPastOptative = person("2sg", "optative");
    const firstPluralFuture = number("1pl", "indicative", "future");
    const firstPluralPreterit = number("1pl", "indicative", "preterit");
    const firstSingularFuture = number("1sg", "indicative", "future");
    return subjectParadigmOwner.issue({
      authorizationStatus: "authorized",
      completeSubjectSet: ["1sg", "1pl", "2sg", "2pl", "3sg", "3pl"],
      automaticEnglishSubjectCorrespondence: true,
      paradigmCount: 4,
      paradigmKinds: [
        "main-indicative-and-past-optative",
        "future-preterit-indicative",
        "nonpast-optative",
        "nonpast-admonitive",
      ],
      mainIndicativeTenses: [
        "present", "customary-present", "imperfect", "distant-past",
      ],
      mainIndicative: frame("indicative", "present").condition,
      mainIndicativeConnector: frame("indicative", "present").num1,
      futurePreterit: frame("indicative", "future").condition,
      nonpastOptative: frame("optative", "nonpast").condition,
      nonpastAdmonitive: frame("admonitive", "nonpast").condition,
      nonpastAdmonitiveFirstTwoPositionsUseMainFillers: true,
      thirdCommon: {
        formula: subjectFormula("3sg", "indicative", "present"),
        person: "third",
        number: "common-or-singular",
        interpretations: thirdCommonInterpretations,
      },
      thirdPluralAnimate: {
        formula: subjectFormula("3pl", "indicative", "present"),
        person: thirdPluralPerson.subject.startsWith("3") ? "third" : "",
        number: thirdPluralNumber.num2 === "h" ? "plural" : "",
        animacy: "animate",
        interpretation: "they",
      },
      pastOptativeUsesMainParadigm: frame("optative", "past").num2 === frame("indicative", "present").num2,
      secondPersonPastOptativePers1Variants: secondPastOptative.pers1Variants,
      futurePreteritGlossParity: true,
      firstPluralFuturePreterit: {
        futureFormula: subjectFormula("1pl", "indicative", "future"),
        preteritFormula: subjectFormula("1pl", "indicative", "preterit"),
        person: "first",
        number: firstPluralFuture.num2 === "eh" && firstPluralPreterit.num2 === "eh" ? "plural" : "",
      },
      singularFuturePreteritConnectorAlternation: {
        variants: firstSingularFuture.num1Variants,
        silentReplacesQui: firstSingularFuture.num1 === "⎕" && firstSingularFuture.num1Variants.includes("qui"),
        limitedToSingular: !firstPluralFuture.num1Variants.includes("⎕"),
      },
    });
  }

  function buildClassicalNahuatlMoodTenseFillerSystemFrame() {
    const get = requireFunction(targetObject, "getClassicalNahuatlFiniteMoodTenseFrame");
    const getNumber = requireFunction(targetObject, "getClassicalNahuatlFiniteSubjectNumberDyad");
    const buildVerbstem = requireFunction(targetObject, "buildClassicalNahuatlVerbstemClassFrame");
    const filler = (mood, tense, verbClass = "") => get({ mood, tense, verbClass }).tns;
    const aspect = (mood, tense) => buildVerbstem("nemi", {
      subject: "3sg",
      mood,
      tense,
      verbClass: "B",
      perfectiveClass: "B",
      valence: "intransitive",
      transitivity: "intransitive",
    }).proofFrame?.conclusion?.aspect || "";
    const singularNumber = (mood, tense) => getNumber({
      subject: "1sg", mood, tense, stem: "nemi", verbClass: "B",
    });
    return moodTenseOwner.issue({
      authorizationStatus: "authorized",
      locus: "tns",
      combinedCategories: ["mood", "tense"],
      moods: {
        indicative: "report-fact",
        optative: "express-wish",
        admonitive: "express-warning",
      },
      tenseFeatures: ["past", "present", "future"],
      tenseInteractsWithMood: true,
      tenseInteractsWithAspect: true,
      aspectBySelection: {
        indicativePresent: aspect("indicative", "present"),
        indicativeCustomaryPresent: aspect("indicative", "customary-present"),
        indicativeImperfect: aspect("indicative", "imperfect"),
        indicativeFuture: aspect("indicative", "future"),
        indicativePreterit: aspect("indicative", "preterit"),
        indicativeDistantPast: aspect("indicative", "distant-past"),
        optativeNonpast: aspect("optative", "nonpast"),
        optativePast: aspect("optative", "past"),
        admonitiveNonpast: aspect("admonitive", "nonpast"),
      },
      indicative: {
        present: filler("indicative", "present"),
        customaryPresent: filler("indicative", "customary-present"),
        imperfect: filler("indicative", "imperfect"),
        imperfectCanonicalMorph: "yā",
        future: filler("indicative", "future"),
        preterit: filler("indicative", "preterit"),
        distantPast: filler("indicative", "distant-past"),
      },
      optative: {
        nonpast: filler("optative", "nonpast"),
        past: filler("optative", "past"),
      },
      admonitive: {
        classA: filler("admonitive", "nonpast", "A"),
        other: filler("admonitive", "nonpast", "B"),
      },
      interpretationRanges: {
        customaryPresent: ["general-present", "customary-present", "habitual-present", "usual-present"],
        imperfect: ["customary-past", "habitual-past", "past-habit", "past-progressive"],
        distantPast: ["simple-past-before-later-event", "past-perfect"],
      },
      grammaticalTenseIsNotExistentialTime: true,
      presentTenseMayReferToPastTimeInContext: true,
      singularNumberDyadAmbiguity: {
        futurePreterit: singularNumber("indicative", "future").num1Variants,
        nonpastOptative: [singularNumber("optative", "nonpast").num1, singularNumber("optative", "nonpast").num2],
      },
    });
  }

  function buildClassicalNahuatlVerbstemCategorySystemFrame() {
    const build = requireFunction(targetObject, "buildClassicalNahuatlVerbstemClassFrame");
    const deriveNonactive = requireFunction(targetObject, "deriveClassicalNahuatlNonactiveStemRecord");
    const source = (tense) => build("nemi", {
      subject: "3sg",
      mood: "indicative",
      tense,
      verbClass: "B",
      perfectiveClass: "B",
      valence: "intransitive",
      transitivity: "intransitive",
    });
    const imperfective = source("present");
    const perfective = source("preterit");
    const nonactive = deriveNonactive("nemi", {
      verbClass: "B",
      sourceValence: "intransitive",
    });
    const imperfectiveConclusion = imperfective.proofFrame?.conclusion || {};
    const perfectiveConclusion = perfective.proofFrame?.conclusion || {};
    return verbstemCategoryOwner.issue({
      authorizationStatus: "authorized",
      organizingCenter: imperfectiveConclusion.stemAsFormulaPredicate,
      lexicalMeaningLocus: imperfective.sourceSelectionFrame?.ruleRefs
        ?.find((rule) => rule.stemRole === "lexical-meaning-locus")?.stemRole || "",
      valenceDeterminedByStem: imperfectiveConclusion.classTargetValence,
      voiceFeatures: ["active", "nonactive"],
      activeIsBasicSource: true,
      nonactiveStem: nonactive.nonactiveStem,
      nonactiveAuthorized: nonactive.authorizationStatus === "authorized",
      nonactiveUses: ["passive", "impersonal"],
      aspectFeatures: ["imperfective", "perfective"],
      imperfectiveMeaning: "ongoing-without-regard-to-beginning-or-end",
      perfectiveMeaning: "beginning-or-end-boundary",
      imperfectiveIsBasicSource: true,
      imperfectiveStem: imperfectiveConclusion.stemVariant,
      imperfectiveAspect: imperfectiveConclusion.aspect,
      perfectiveStem: perfectiveConclusion.stemVariant,
      perfectiveAspect: perfectiveConclusion.aspect,
      perfectiveRequiredEvenWhenMappingIsUnpredictable:
        Boolean(perfectiveConclusion.stemVariant)
        && perfectiveConclusion.aspect === "perfective",
      lackOfPredictableRuleDoesNotMeanNoPerfective: true,
      contrastiveStemKindCount: 8,
      contrastiveDimensions: ["aspect", "valence", "voice"],
    });
  }

  function buildClassicalNahuatlSingularNumberDyadAlternationFrame() {
    const get = requireFunction(targetObject, "getClassicalNahuatlFiniteSubjectNumberDyad");
    const future = get({
      subject: "1sg", mood: "indicative", tense: "future", stem: "nemi",
    });
    return singularAlternationOwner.issue({
      authorizationStatus: "authorized",
      variants: future.num1Variants,
      alternateDyads: future.alternateNumberDyads,
      limitedToSingular: true,
    });
  }

  function transitive(options) {
    return requireFunction(
      targetObject,
      "buildClassicalNahuatlTransitiveVncObjectFrame",
    )("itta", {
      subject: "1sg", mood: "indicative", tense: "present", ...options,
    });
  }

  function buildClassicalNahuatlTransitiveVncFormulaSystemFrame() {
    const monadic = transitive({ objectKind: "nonspecific-human" });
    const nonhuman = transitive({ objectKind: "nonspecific-nonhuman" });
    const shuntline = transitive({ objectKind: "shuntline-reflexive" });
    const reflexive = transitive({ objectKind: "mainline-reflexive", subject: "1pl" });
    const dyadic = transitive({
      objectKind: "specific-projective", objectPerson: "3sg",
    });
    return transitiveFormulaOwner.issue({
      authorizationStatus: "authorized",
      onlyValenceDiffers: true,
      valenceCategories: ["person", "number", "objective-case"],
      caseFeature: dyadic.objectFrame.caseFeature,
      trajectoryFeatures: ["projective", "reflexive", "reciprocative"],
      projectiveAffectsEntityOtherThanSubject: true,
      reflexiveAffectsSubjectReferent: reflexive.objectFrame.objectReflectsSubject,
      reciprocativeRequiresTwoOrMoreMatchingParticipants: true,
      specificityFeatures: ["specific", "nonspecific"],
      specificPronounClass: dyadic.objectFrame.pronounClass,
      nonspecificPronounClass: monadic.objectFrame.pronounClass,
      nonspecificNominativeCorrespondence: "third-person-personal-pronoun",
      nonspecificNominativeRequiresNonactiveVerbstem: true,
      prominenceFeatures: ["mainline", "shuntline"],
      prominenceSelectedByMorphosyntax: true,
      newlyAddedObjectBecomesMainline: true,
      earlierObjectDemotedToShuntline: true,
      monadicArity: monadic.objectFrame.valenceArity,
      monadicTemplate: monadic.objectFrame.formulaTemplate,
      monadicFormula: monadic.proofFrame.conclusion.formulaRealization,
      dyadicArity: dyadic.objectFrame.valenceArity,
      dyadicSpecificity: dyadic.objectFrame.specificity,
      dyadicCategories: ["trajectory", "person", "number", "objective-case"],
      dyadicTemplate: dyadic.objectFrame.formulaTemplate,
      dyadicFormula: dyadic.proofFrame.conclusion.formulaRealization,
      observedObjectFrames: {
        specificProjective: {
          trajectory: dyadic.objectFrame.trajectory,
          specificity: dyadic.objectFrame.specificity,
          prominence: dyadic.objectFrame.prominence,
        },
        nonspecificHuman: {
          trajectory: monadic.objectFrame.trajectory,
          specificity: monadic.objectFrame.specificity,
          prominence: monadic.objectFrame.prominence,
        },
        nonspecificNonhuman: {
          trajectory: nonhuman.objectFrame.trajectory,
          specificity: nonhuman.objectFrame.specificity,
          prominence: nonhuman.objectFrame.prominence,
        },
        shuntlineReflexive: {
          trajectory: shuntline.objectFrame.trajectory,
          specificity: shuntline.objectFrame.specificity,
          prominence: shuntline.objectFrame.prominence,
        },
      },
    });
  }

  function buildClassicalNahuatlMonadicObjectSystemFrame() {
    const shuntline = transitive({ objectKind: "shuntline-reflexive" });
    const human = transitive({ objectKind: "nonspecific-human" });
    const nonhuman = transitive({ objectKind: "nonspecific-nonhuman" });
    return monadicObjectOwner.issue({
      authorizationStatus: "authorized",
      valenceArity: human.objectFrame.valenceArity,
      valencePosition: human.objectFrame.valencePosition,
      formulaTemplate: human.objectFrame.formulaTemplate,
      shuntlineReflexiveMorph: shuntline.objectFrame.va,
      nonspecificProjective: true,
      humanMorph: human.objectFrame.va,
      nonhumanMorph: nonhuman.objectFrame.va,
      humanMeanings: ["someone", "anyone", "people-in-general", "everyone", "all"],
      nonhumanMeanings: ["something", "anything", "things-in-general", "everything"],
      pronounClass: human.objectFrame.pronounClass,
      somethingIncludesAnimateOrNonanimate: true,
      humanClass: human.objectFrame.humanness,
      nonhumanClass: nonhuman.objectFrame.humanness,
      nonhumanMayReferToPeopleGenerally: true,
      humanNonhumanContrastIsNotAnimacy: true,
      humanNonhumanContrastIsHumanness: true,
      mainlineAndShuntlineUseSameNonspecificForms: true,
    });
  }

  function projective(objectPerson, stem = "itta", subject = "1sg") {
    return requireFunction(
      targetObject,
      "buildClassicalNahuatlTransitiveVncObjectFrame",
    )(stem, {
      subject, mood: "indicative", tense: "present",
      objectKind: "specific-projective", objectPerson,
    });
  }

  function buildClassicalNahuatlProjectiveObjectSystemFrame() {
    const oneSingular = projective("1sg");
    const onePlural = projective("1pl");
    const twoSingular = projective("2sg");
    const twoPlural = projective("2pl");
    const threeSingular = projective("3sg");
    const threePlural = projective("3pl");
    const threeBeforeConsonant = projective("3sg", "mati", "3sg");
    const threeC = projective("3sg", "mati", "1sg");
    const threeQu = projective("3sg", "itta", "1sg");
    const stemBoundaryCases = Object.fromEntries(["ca", "tiqui", "que"].map(stem => {
      const frame = projective("3sg", stem, "1sg");
      return [stem, { objectCarrier: frame.objectFrame.va1, stem: frame.stem }];
    }));
    const summarize = frame => ({
      objectPerson: frame.objectFrame.objectPerson,
      va1: frame.objectFrame.va1,
      va2: frame.objectFrame.va2,
      va1Carries: frame.objectFrame.va1Carries,
      va2Carries: frame.objectFrame.va2Carries,
      va2Variants: frame.objectFrame.va2Variants,
      objectLabel: frame.objectFrame.objectLabel,
      formula: frame.proofFrame.conclusion.formulaRealization,
    });
    return projectiveObjectOwner.issue({
      authorizationStatus: "authorized",
      categoriesDistributedAcrossDyad: ["person", "number", "objective-case"],
      dyadicCondition: "specific-mainline-projective-object",
      va1AlwaysCarriesPerson: true,
      va1NeverPersonAlone: true,
      thirdVa1Carries: threeSingular.objectFrame.va1Carries,
      thirdVa1Variants: threeSingular.objectFrame.va1Variants,
      supportiveVowel: threeBeforeConsonant.objectFrame.va1SupportiveVowel,
      regularKSpellings: threeSingular.objectFrame.va1RegularSpellings,
      cQuEnvironment: "vnc-internal-vowel-on-either-side",
      cQuSelected: threeSingular.objectFrame.va1,
      cSelected: summarize(threeC),
      quSelected: summarize(threeQu),
      quiSelected: summarize(threeBeforeConsonant),
      quiSelectedBeforeConsonantWithZeroSubject: threeBeforeConsonant.objectFrame.va1,
      quiCondition: threeBeforeConsonant.objectFrame.va1SupportiveISurfaceReason,
      nonthirdVa1Carries: twoSingular.objectFrame.va1Carries,
      nonthirdVa1Fillers: [
        oneSingular.objectFrame.va1,
        onePlural.objectFrame.va1,
        twoSingular.objectFrame.va1,
        twoPlural.objectFrame.va1,
      ],
      nonthirdUnambiguous: true,
      thirdVa2Carries: threeSingular.objectFrame.va2Carries,
      thirdSingularVa2: threeSingular.objectFrame.va2,
      thirdPluralVa2Variants: threePlural.objectFrame.va2Variants,
      thirdPluralIm: threePlural.objectFrame.va2,
      nasalAlternantsAvailable: true,
      nonthirdVa2Carries: oneSingular.objectFrame.va2Carries,
      nonthirdVa2Variants: [oneSingular.objectFrame.va2, twoSingular.objectFrame.va2],
      echAssimilationVariants: oneSingular.objectFrame.va2Variants,
      itzAssimilationVariants: twoSingular.objectFrame.va2Variants,
      frequentItzPhoneVariant: "[¢]",
      assimilationApplies: true,
      stemBoundaryCases,
      automaticEnglishObjectCorrespondence: true,
      paradigm: {
        firstSingular: summarize(oneSingular),
        firstPlural: summarize(onePlural),
        secondSingular: summarize(twoSingular),
        secondPlural: summarize(twoPlural),
        thirdCommonC: summarize(threeC),
        thirdCommonQu: summarize(threeQu),
        thirdCommonQui: summarize(threeBeforeConsonant),
        thirdPluralAnimate: summarize(threePlural),
      },
      thirdCommonInterpretations: {
        singularHumanMale: "him",
        singularHumanFemale: "her",
        singularAnimateNonhuman: "it",
        singularNonanimate: "it",
        pluralNonanimate: "them",
      },
      thirdPluralAnimateRealization: {
        va1: threePlural.objectFrame.va1,
        va2: threePlural.objectFrame.va2,
        human: "them",
        animateNonhuman: "them",
        allPhonologicalVariants: threePlural.objectFrame.va2Variants,
      },
    });
  }

  function reflexive(subject, stem, objectInterpretation = "reflexive") {
    return requireFunction(
      targetObject,
      "buildClassicalNahuatlTransitiveVncObjectFrame",
    )(stem, {
      subject, mood: "indicative", tense: "present",
      objectKind: "mainline-reflexive",
      objectInterpretation,
    });
  }

  function buildClassicalNahuatlMainlineReflexiveObjectSystemFrame() {
    const oneSingularConsonant = reflexive("1sg", "mati");
    const onePlural = reflexive("1pl", "mati");
    const nonfirst = reflexive("2sg", "mati");
    const twoPlural = reflexive("2pl", "mati");
    const threeSingular = reflexive("3sg", "mati");
    const threePlural = reflexive("3pl", "mati");
    const oneSingularVowel = reflexive("1sg", "itta");
    const singularReciprocal = reflexive("2sg", "mati", "reciprocal");
    const pluralReciprocal = reflexive("2pl", "mati", "reciprocal");
    const summarize = frame => ({
      subject: frame.subject,
      va1: frame.objectFrame.va1,
      va2: frame.objectFrame.va2,
      alternateObjectDyads: frame.objectFrame.alternateObjectDyads,
      availableInterpretations: frame.objectFrame.availableInterpretations,
      formula: frame.proofFrame.conclusion.formulaRealization,
      authorized: frame.proofFrame.conclusion.authorized,
    });
    return reflexiveObjectOwner.issue({
      authorizationStatus: "authorized",
      alignment: ["person-number", "objective-case"],
      condition: "mainline-reflexive-or-reciprocative",
      pluralMayBeReciprocal: onePlural.objectFrame.pluralMayBeReciprocal,
      reflectsSubject: oneSingularConsonant.objectFrame.objectReflectsSubject,
      noRepeatedSubjectInformation: true,
      va1CarriesPerson: oneSingularConsonant.objectFrame.va1Carries.includes("person"),
      va1CarriesNumber: oneSingularConsonant.objectFrame.va1Carries.includes("number"),
      va2Carries: oneSingularConsonant.objectFrame.va2Carries,
      firstSingularVa1: oneSingularConsonant.objectFrame.va1,
      firstPluralVa1: onePlural.objectFrame.va1,
      nonfirstVa1: nonfirst.objectFrame.va1,
      consonantInitialVa2: oneSingularConsonant.objectFrame.va2,
      vowelInitialCondition: "vowel-initial-verbstem",
      vowelInitialVa2: oneSingularVowel.objectFrame.va2,
      replacementRule: oneSingularVowel.objectFrame.objectRule,
      va1Carries: oneSingularConsonant.objectFrame.va1Carries,
      personNumberDyads: {
        firstSingular: `${oneSingularConsonant.objectFrame.va1}-${oneSingularConsonant.objectFrame.va2}`,
        firstPlural: `${onePlural.objectFrame.va1}-${onePlural.objectFrame.va2}`,
        nonfirst: `${nonfirst.objectFrame.va1}-${nonfirst.objectFrame.va2}`,
      },
      paradigm: {
        firstSingular: summarize(oneSingularConsonant),
        firstPlural: summarize(onePlural),
        secondSingular: summarize(nonfirst),
        secondPlural: summarize(twoPlural),
        thirdSingular: summarize(threeSingular),
        thirdPlural: summarize(threePlural),
        firstSingularBeforeVowel: summarize(oneSingularVowel),
      },
      readingsBySubject: {
        secondSingular: ["yourself"],
        thirdSingularHumanMale: ["himself"],
        thirdSingularHumanFemale: ["herself"],
        thirdSingularNonhuman: ["itself"],
        secondPlural: twoPlural.objectFrame.pluralMayBeReciprocal ? ["yourselves", "one another"] : ["yourselves"],
        thirdPlural: threePlural.objectFrame.pluralMayBeReciprocal ? ["themselves", "one another"] : ["themselves"],
      },
      reciprocalRequiresPluralSubject:
        !nonfirst.objectFrame.pluralMayBeReciprocal
        && !threeSingular.objectFrame.pluralMayBeReciprocal
        && twoPlural.objectFrame.pluralMayBeReciprocal
        && threePlural.objectFrame.pluralMayBeReciprocal,
      singularReciprocalBlocked: singularReciprocal.proofFrame.conclusion.authorized === false,
      pluralReciprocalAuthorized: pluralReciprocal.proofFrame.conclusion.authorized === true,
    });
  }

  const api = freeze({
    buildClassicalNahuatlNuclearFormulaVariantSystemFrame,
    isClassicalNahuatlNuclearFormulaVariantSystemFrame: nuclearFormulaOwner.validates,
    buildClassicalNahuatlIntransitiveVncFormulaSystemFrame,
    isClassicalNahuatlIntransitiveVncFormulaSystemFrame: finiteFormulaOwner.validates,
    buildClassicalNahuatlSubjectPersonDyadSystemFrame,
    isClassicalNahuatlSubjectPersonDyadSystemFrame: personDyadOwner.validates,
    buildClassicalNahuatlSubjectNumberSuffixSystemFrame,
    isClassicalNahuatlSubjectNumberSuffixSystemFrame: numberSuffixOwner.validates,
    buildClassicalNahuatlSubjectParadigmSystemFrame,
    isClassicalNahuatlSubjectParadigmSystemFrame: subjectParadigmOwner.validates,
    buildClassicalNahuatlMoodTenseFillerSystemFrame,
    isClassicalNahuatlMoodTenseFillerSystemFrame: moodTenseOwner.validates,
    buildClassicalNahuatlVerbstemCategorySystemFrame,
    isClassicalNahuatlVerbstemCategorySystemFrame: verbstemCategoryOwner.validates,
    buildClassicalNahuatlSingularNumberDyadAlternationFrame,
    isClassicalNahuatlSingularNumberDyadAlternationFrame: singularAlternationOwner.validates,
    buildClassicalNahuatlTransitiveVncFormulaSystemFrame,
    isClassicalNahuatlTransitiveVncFormulaSystemFrame: transitiveFormulaOwner.validates,
    buildClassicalNahuatlMonadicObjectSystemFrame,
    isClassicalNahuatlMonadicObjectSystemFrame: monadicObjectOwner.validates,
    buildClassicalNahuatlProjectiveObjectSystemFrame,
    isClassicalNahuatlProjectiveObjectSystemFrame: projectiveObjectOwner.validates,
    buildClassicalNahuatlMainlineReflexiveObjectSystemFrame,
    isClassicalNahuatlMainlineReflexiveObjectSystemFrame: reflexiveObjectOwner.validates,
  });
  Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
  return api;
}

export function installClassicalNahuatlNuclearSemanticOperationsGlobals(
  targetObject = globalThis,
) {
  return createClassicalNahuatlNuclearSemanticOperationsRuntime(targetObject);
}
