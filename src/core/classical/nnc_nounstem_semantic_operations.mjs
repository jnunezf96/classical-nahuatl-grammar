// Validation projection for independently owned nounstem semantics.
//
// This module owns no Inventory atoms and defines no grammar. Recipe ids select
// typed coordinates for already-installed canonical NNC operations. The
// projection retains only runtime-emitted facts; stored Canvas examples,
// declared expectations, and rendered formulas cannot authorize an outcome.

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

function blocked(recipeId, reason) {
  return deepFreeze({
    kind: "classical-nahuatl-nounstem-validation-operation-frame",
    authorizationStatus: "blocked",
    blockReason: reason,
    recipeId: String(recipeId || ""),
  });
}

function lexicalRecord(targetObject, stem, options) {
  return targetObject.buildClassicalNahuatlLexicalSelectionRecord(stem, {
    selectionAuthority: "external-lexical-record",
    ...options,
  });
}

function classGoverned(targetObject, stem, options) {
  return targetObject.buildClassicalNahuatlClassGovernedNncFrame(stem, {
    classSelectionAuthority: "user-selection",
    ...options,
  });
}

function buildRecipe(targetObject, recipeId) {
  const base = () => classGoverned(targetObject, "cal", {
    state: "absolutive",
    subject: "3common",
    nounClass: "tli",
    animacy: "nonanimate",
  });

  if (recipeId === "use-stem-absolutive") {
    return classGoverned(targetObject, "naca", {
      state: "absolutive",
      subject: "3common",
      nounClass: "tl",
      animacy: "nonanimate",
    });
  }
  if (recipeId === "use-stem-possessive-truncated") {
    return classGoverned(targetObject, "naca", {
      state: "possessive",
      subject: "3common",
      possessor: "2sg",
      nounClass: "tl",
      generalUseShape: "truncated",
      ephemeralFinalVowel: "a",
      tlSubclass: "2B",
    });
  }
  if (recipeId === "class-guidance-vowel" || recipeId === "class-guidance-consonant") {
    const stem = recipeId.endsWith("vowel") ? "cihuā" : "cal";
    return {
      anchorFrame: base(),
      classGuidanceFrame: targetObject.getClassicalNahuatlClassFormGuidance(stem),
    };
  }
  if (recipeId === "lexical-alternatives") {
    return {
      anchorFrame: base(),
      lexicalSelectionRecord: lexicalRecord(targetObject, "tōch", {
        nounClass: "tli",
        classMembershipOptions: ["in", "tli"],
        stemFormation: "affinity",
        pluralStemFormationOptions: ["plain", "affinity"],
        pluralStemFormationRequirement: "allowed",
        preferredPluralStemFormation: "affinity",
        pluralConnector: "m-eh",
        pluralConnectorOptions: ["t-in", "m-eh"],
        preferredPluralConnector: "t-in",
        affinityConnectorExceptionAuthorized: true,
      }),
    };
  }
  if (recipeId === "supportive-initial-variant") {
    const record = lexicalRecord(targetObject, "icxi", {
      nounClass: "tl",
      stemFormation: "plain",
      supportiveInitialI: true,
      selectedInitialVariant: "omitted",
    });
    return {
      anchorFrame: base(),
      lexicalSelectionRecord: record,
      nounstemSourceFrame: targetObject.buildClassicalNahuatlNounstemSourceFrame("icxi", {
        state: "possessive",
        nounClass: "tl",
        classSelectionAuthority: "external-lexical-record",
        lesson14LexicalSelectionRecord: record,
      }),
    };
  }
  if (recipeId === "glottalized-compound-embed") {
    return {
      anchorFrame: base(),
      glottalizedGeneralUseFrame:
        targetObject.buildClassicalNahuatlGlottalizedGeneralUseFrame("teō", {
          matrixMorpheme: "calli",
          lexicallyGlottalizable: true,
        }),
    };
  }
  if ([
    "derive-affinity-tah",
    "derive-affinity-cal",
    "derive-distributive-tah",
    "derive-distributive-cal",
    "derive-distributive-te",
    "derive-distributive-ahui",
    "derive-distributive-icxi",
    "derive-distributive-izte",
    "derive-distributive-ehca",
  ].includes(recipeId)) {
    const formation = recipeId.includes("affinity") ? "affinity" : "distributive-varietal";
    const stem = recipeId.endsWith("tah") ? "tah"
      : recipeId.endsWith("ahui") ? "āhui-l"
        : recipeId.endsWith("icxi") ? "icxi"
          : recipeId.endsWith("izte") ? "izte"
            : recipeId.endsWith("ehca") ? "ehca"
              : recipeId.endsWith("te") ? "te"
                : "cal";
    return {
      anchorFrame: base(),
      stemDerivationFrame: targetObject.deriveClassicalNahuatlStem(stem, formation),
    };
  }
  if (recipeId === "absolutive-common-tli") return base();
  if (recipeId === "absolutive-common-tl") {
    return classGoverned(targetObject, "ā", {
      state: "absolutive", subject: "3common", nounClass: "tl", animacy: "nonanimate",
    });
  }
  if (recipeId === "absolutive-common-in") {
    return classGoverned(targetObject, "mich", {
      state: "absolutive", subject: "3sg", nounClass: "in", animacy: "animate",
    });
  }
  if (recipeId === "absolutive-common-zero") {
    return classGoverned(targetObject, "chichi", {
      state: "absolutive", subject: "3sg", nounClass: "zero", animacy: "animate",
    });
  }
  if (recipeId === "absolutive-common-distributive") {
    const record = lexicalRecord(targetObject, "cal", {
      nounClass: "tli",
      stemFormation: "distributive-varietal",
      pluralStemFormationOptions: ["plain", "distributive-varietal"],
    });
    return classGoverned(targetObject, "cal", {
      state: "absolutive",
      subject: "3common",
      nounClass: "tli",
      stemFormation: "distributive-varietal",
      animacy: "nonanimate",
      classSelectionAuthority: "external-lexical-record",
      lesson14LexicalSelectionRecord: record,
    });
  }
  if (recipeId === "absolutive-plural-plain") {
    const record = lexicalRecord(targetObject, "cōl", {
      nounClass: "tli",
      stemFormation: "plain",
      pluralStemFormationOptions: ["plain"],
      pluralConnector: "t-in",
      pluralConnectorOptions: ["t-in"],
    });
    return classGoverned(targetObject, "cōl", {
      state: "absolutive",
      subject: "1pl",
      nounClass: "tli",
      stemFormation: "plain",
      pluralConnector: "t-in",
      pluralSelectionAuthority: "external-lexical-record",
      animacy: "animate",
      classSelectionAuthority: "external-lexical-record",
      lesson14LexicalSelectionRecord: record,
    });
  }
  if (recipeId === "absolutive-plural-affinity") {
    const record = lexicalRecord(targetObject, "tōch", {
      nounClass: "tli",
      stemFormation: "affinity",
      pluralStemFormationOptions: ["plain", "affinity"],
      pluralStemFormationRequirement: "allowed",
      pluralConnector: "m-eh",
      pluralConnectorOptions: ["t-in", "m-eh"],
      preferredPluralStemFormation: "affinity",
      preferredPluralConnector: "t-in",
      affinityConnectorExceptionAuthorized: true,
    });
    return classGoverned(targetObject, "tōch", {
      state: "absolutive",
      subject: "3pl",
      nounClass: "tli",
      stemFormation: "affinity",
      pluralConnector: "m-eh",
      pluralSelectionAuthority: "external-lexical-record",
      animacy: "animate",
      classSelectionAuthority: "external-lexical-record",
      lesson14LexicalSelectionRecord: record,
    });
  }
  if (recipeId === "absolutive-plural-distributive") {
    const record = lexicalRecord(targetObject, "tah", {
      nounClass: "tli",
      stemFormation: "distributive-varietal",
      pluralStemFormationOptions: ["plain", "distributive-varietal"],
      pluralConnector: "t-in",
      pluralConnectorOptions: ["t-in"],
      sourcePlainPluralConnector: "t-in",
    });
    return classGoverned(targetObject, "tah", {
      state: "absolutive",
      subject: "3pl",
      nounClass: "tli",
      stemFormation: "distributive-varietal",
      pluralConnector: "t-in",
      pluralSelectionAuthority: "external-lexical-record",
      animacy: "animate",
      classSelectionAuthority: "external-lexical-record",
      lesson14LexicalSelectionRecord: record,
    });
  }
  if (recipeId === "absolutive-plural-tl-zero" || recipeId === "absolutive-plural-tl-m") {
    const connector = recipeId.endsWith("zero") ? "0-h" : "m-eh";
    const record = lexicalRecord(targetObject, "cihuā", {
      nounClass: "tl",
      stemFormation: "plain",
      pluralStemFormationOptions: ["plain"],
      pluralConnector: connector,
      pluralConnectorOptions: ["0-h", "m-eh"],
    });
    return classGoverned(targetObject, "cihuā", {
      state: "absolutive",
      subject: "3pl",
      nounClass: "tl",
      stemFormation: "plain",
      pluralConnector: connector,
      pluralSelectionAuthority: "external-lexical-record",
      animacy: "animate",
      classSelectionAuthority: "external-lexical-record",
      lesson14LexicalSelectionRecord: record,
    });
  }
  if (recipeId === "absolutive-plural-affinity-tli-default" || recipeId === "absolutive-plural-affinity-tl-zero") {
    const isTl = recipeId.endsWith("tl-zero");
    const stem = isTl ? "cihuā" : "cal";
    const nounClass = isTl ? "tl" : "tli";
    const connector = isTl ? "0-h" : "t-in";
    const record = lexicalRecord(targetObject, stem, {
      nounClass,
      stemFormation: "affinity",
      pluralStemFormationOptions: ["affinity"],
      pluralStemFormationRequirement: "required",
      pluralConnector: connector,
      pluralConnectorOptions: [connector],
    });
    return classGoverned(targetObject, stem, {
      state: "absolutive",
      subject: "3pl",
      nounClass,
      stemFormation: "affinity",
      pluralConnector: connector,
      pluralSelectionAuthority: "external-lexical-record",
      animacy: "animate",
      classSelectionAuthority: "external-lexical-record",
      lesson14LexicalSelectionRecord: record,
    });
  }
  if (recipeId === "possessive-plural-plain" || recipeId === "possessive-plural-affinity") {
    const affinity = recipeId.endsWith("affinity");
    const record = lexicalRecord(targetObject, "cal", {
      nounClass: "tli",
      stemFormation: affinity ? "affinity" : "plain",
      pluralStemFormationOptions: affinity ? ["plain", "affinity"] : ["plain"],
      possessivePluralDerivedSemanticNeed: affinity,
    });
    return classGoverned(targetObject, "cal", {
      state: "possessive",
      subject: "1pl",
      possessor: "3sg",
      nounClass: "tli",
      tliSubclass: "1",
      stemFormation: affinity ? "affinity" : "plain",
      classSelectionAuthority: "external-lexical-record",
      lesson14LexicalSelectionRecord: record,
    });
  }
  if (recipeId === "possessive-common-in") {
    return classGoverned(targetObject, "mich", {
      state: "possessive", subject: "3common", possessor: "1sg", nounClass: "in",
    });
  }
  if (recipeId === "possessive-common-zero") {
    return classGoverned(targetObject, "chichi", {
      state: "possessive", subject: "3common", possessor: "1sg", nounClass: "zero",
    });
  }
  if (recipeId === "possessive-common-tli1") {
    return classGoverned(targetObject, "cal", {
      state: "possessive", subject: "3common", possessor: "1sg", nounClass: "tli", tliSubclass: "1",
    });
  }
  if (recipeId === "possessive-common-tli2" || recipeId === "possessive-common-tli2-silent") {
    const silent = recipeId.endsWith("silent");
    const record = lexicalRecord(targetObject, "ich", {
      nounClass: "tli",
      stemFormation: "plain",
      tliSubclass2SilentNum1Authorized: silent,
    });
    return classGoverned(targetObject, "ich", {
      state: "possessive",
      subject: "3sg",
      possessor: "2pl",
      nounClass: "tli",
      tliSubclass: "2",
      singularConnector: silent ? "⎕" : "hui",
      classSelectionAuthority: "external-lexical-record",
      lesson14LexicalSelectionRecord: record,
    });
  }
  if (recipeId === "possessive-common-tl1a") {
    return classGoverned(targetObject, "teō", {
      state: "possessive", subject: "3common", possessor: "3sg", nounClass: "tl", tlSubclass: "1A",
    });
  }
  if (recipeId === "possessive-common-tl1b") {
    return classGoverned(targetObject, "te", {
      state: "possessive", subject: "3common", possessor: "1sg", nounClass: "tl", tlSubclass: "1B",
    });
  }
  if (recipeId === "possessive-common-tl2a") {
    return classGoverned(targetObject, "māi", {
      state: "possessive", subject: "3common", possessor: "3sg", nounClass: "tl",
      generalUseShape: "truncated", ephemeralFinalVowel: "i", tlSubclass: "2A",
    });
  }
  if (recipeId === "possessive-common-tl2b-a") {
    return classGoverned(targetObject, "naca", {
      state: "possessive", subject: "3common", possessor: "2sg", nounClass: "tl",
      generalUseShape: "truncated", ephemeralFinalVowel: "a", tlSubclass: "2B",
    });
  }
  if (recipeId === "possessive-common-tl2b-i") {
    return classGoverned(targetObject, "mali", {
      state: "possessive", subject: "3common", possessor: "2sg", nounClass: "tl",
      generalUseShape: "truncated", ephemeralFinalVowel: "i", tlSubclass: "2B",
    });
  }
  if (recipeId === "possessive-common-tl2c") {
    return classGoverned(targetObject, "coz-ca", {
      state: "possessive", subject: "3common", possessor: "3sg", nounClass: "tl",
      generalUseShape: "truncated", ephemeralFinalVowel: "a",
      truncationRepair: "supportive-i", tlSubclass: "2C",
    });
  }
  if (recipeId === "subclass-shapes") {
    return {
      anchorFrame: base(),
      subclassShapeFrames: [
        targetObject.validateClassicalNahuatlSubclassSourceShape("māi", {
          nounClass: "tl", generalUseShape: "truncated", tlSubclass: "2A",
        }),
        targetObject.validateClassicalNahuatlSubclassSourceShape("naca", {
          nounClass: "tl", generalUseShape: "truncated", tlSubclass: "2B",
        }),
        targetObject.validateClassicalNahuatlSubclassSourceShape("coz-ca", {
          nounClass: "tl", generalUseShape: "truncated", tlSubclass: "2C", truncationRepair: "supportive-i",
        }),
      ],
    };
  }
  if (recipeId === "tl2b-i-output-set") {
    const options = {
      state: "possessive",
      nounClass: "tl",
      classSelectionAuthority: "user-selection",
      generalUseShape: "truncated",
      ephemeralFinalVowel: "i",
      tlSubclass: "2B",
    };
    return {
      anchorFrame: base(),
      nounstemSourceFrames: ["neli", "māxi", "tehui", "tami"].map(stem =>
        targetObject.buildClassicalNahuatlNounstemSourceFrame(stem, options)),
    };
  }
  if (recipeId === "nasal-sibilant-assimilation") {
    return {
      anchorFrame: base(),
      assimilationFrame: targetObject.buildClassicalNahuatlAssimilationFrame({
        leftConsonant: "m",
        rightConsonant: "s",
        grammaticalConstruction: true,
      }),
    };
  }
  if (recipeId === "m-exposed-phone-shift") {
    return {
      anchorFrame: base(),
      consonantPhoneShiftFrame:
        targetObject.buildClassicalNahuatlConsonantPhoneShiftFrame({
          sourceConsonant: "m",
          position: "exposed",
          grammaticalConstruction: true,
        }),
    };
  }
  if (recipeId === "w-final-spelling") {
    return {
      anchorFrame: base(),
      spellingChangeFrame: targetObject.buildClassicalNahuatlSpellingChangeFrame({
        phoneme: "[w]",
        syllablePosition: "final",
        precedingVowel: "o",
      }),
    };
  }
  if (recipeId === "constituent-back-uh") {
    const analyses = [
      {
        kind: "stem-final-uh-analysis", id: "stem-final-uh",
        slots: { stem: "teuh", num1: "0" },
        vowelLengthAuthority: "explicit-typed-source-spelling",
      },
      "#0-0+n-o(te)uh-0#",
      {
        kind: "num1-uh-analysis", id: "num1-uh",
        slots: { stem: "te", num1: "uh" },
        vowelLengthAuthority: "explicit-typed-source-spelling",
      },
    ];
    return {
      anchorFrame: base(),
      constituentAnalysisFrame:
        targetObject.buildClassicalNahuatlConstituentAnalysisFrame(analyses, {
          selectedAnalysisId: "num1-uh",
          selectionAuthority: "user-selection",
        }),
    };
  }
  if (recipeId === "constituent-front-o") {
    return classGoverned(targetObject, "omi", {
      state: "possessive",
      subject: "3common",
      possessor: "1sg",
      nounClass: "zero",
      constituentAmbiguityKind: "front-o",
      constituentAlternativeStem: "mī",
      selectedConstituentAnalysisId: "alternative-typed-slots",
      constituentAnalysisSelectionAuthority: "user-selection",
    });
  }
  if (recipeId === "constituent-front-m") {
    return classGoverned(targetObject, "mā", {
      state: "possessive",
      subject: "3common",
      possessor: "3pl",
      thirdPluralPossessorNumberMorph: "m",
      nounClass: "tl",
      tlSubclass: "1A",
      constituentAmbiguityKind: "front-m",
      constituentAlternativeStem: "amā",
      selectedConstituentAnalysisId: "alternative-typed-slots",
      constituentAnalysisSelectionAuthority: "user-selection",
    });
  }
  if (recipeId === "boundary-long-o") {
    return classGoverned(targetObject, "teō", {
      state: "possessive", subject: "3common", possessor: "3sg", nounClass: "tl", tlSubclass: "1A",
    });
  }
  if (recipeId === "boundary-long-i") {
    return classGoverned(targetObject, "īx", {
      state: "possessive", subject: "3common", possessor: "3sg", nounClass: "tli", tliSubclass: "1",
    });
  }
  if (recipeId === "boundary-i-glottal") {
    return classGoverned(targetObject, "ihte", {
      state: "possessive", subject: "3common", possessor: "3sg", nounClass: "tl", tlSubclass: "1B",
    });
  }
  if (recipeId === "boundary-supportive-i") {
    const record = lexicalRecord(targetObject, "icxi", {
      nounClass: "tl", stemFormation: "plain", supportiveInitialI: true, selectedInitialVariant: "omitted",
    });
    return classGoverned(targetObject, "icxi", {
      state: "possessive", subject: "3common", possessor: "3sg", nounClass: "tl", tlSubclass: "1B",
      classSelectionAuthority: "external-lexical-record", lesson14LexicalSelectionRecord: record,
    });
  }
  return null;
}

function projectFrame(recipeId, built) {
  const main = built?.anchorFrame || built;
  if (!main || main.authorizationStatus !== "authorized") {
    return blocked(recipeId, main?.blockReason || "canonical-nounstem-operation-required");
  }
  const supplementaryFrames = [
    built?.lexicalSelectionRecord,
    built?.nounstemSourceFrame,
    built?.glottalizedGeneralUseFrame,
    built?.stemDerivationFrame,
    built?.constituentAnalysisFrame,
    built?.assimilationFrame,
    built?.consonantPhoneShiftFrame,
    built?.spellingChangeFrame,
    ...(built?.subclassShapeFrames || []),
    ...(built?.nounstemSourceFrames || []),
  ].filter(Boolean);
  const blockedSupplement = supplementaryFrames.find(
    frame => frame.authorizationStatus !== "authorized",
  );
  if (blockedSupplement) {
    return blocked(
      recipeId,
      blockedSupplement.blockReason || "canonical-nounstem-supplementary-operation-required",
    );
  }
  const contract = main.nounstemParadigmContractFrame || null;
  return deepFreeze({
    kind: "classical-nahuatl-nounstem-validation-operation-frame",
    authorizationStatus: "authorized",
    blockReason: "",
    recipeId,
    formulaRealization: main.formulaRealization || "",
    state: main.state || "",
    subject: main.subject || "",
    sourceFrame: cloneValue(main.sourceFrame || built?.nounstemSourceFrame || null),
    nounstemSourceFrame: cloneValue(built?.nounstemSourceFrame || null),
    derivedStemFrame: cloneValue(main.derivedStemFrame || built?.stemDerivationFrame || null),
    connectorSelectionFrame: cloneValue(main.connectorSelectionFrame || null),
    ambiguityFrame: cloneValue(built?.constituentAnalysisFrame || main.ambiguityFrame || null),
    orthographicBoundaryFrame: cloneValue(main.orthographicBoundaryFrame || null),
    slotFrame: cloneValue(main.nncSlotFrame || null),
    contractGreatestCommonDivisor: cloneValue(contract?.greatestCommonDivisor || null),
    contractLeastCommonMultiple: cloneValue(contract?.leastCommonMultiple || null),
    classGuidanceFrame: cloneValue(built?.classGuidanceFrame || main.sourceFrame?.classGuidanceFrame || null),
    lexicalSelectionRecord: cloneValue(built?.lexicalSelectionRecord || main.sourceFrame?.lexicalSelectionRecord || null),
    glottalizedGeneralUseFrame: cloneValue(built?.glottalizedGeneralUseFrame || null),
    subclassShapeFrames: cloneValue(built?.subclassShapeFrames || (
      main.sourceFrame?.subclassSourceShapeFrame ? [main.sourceFrame.subclassSourceShapeFrame] : []
    )),
    nounstemSourceFrames: cloneValue(built?.nounstemSourceFrames || []),
    assimilationFrame: cloneValue(built?.assimilationFrame || null),
    consonantPhoneShiftFrame: cloneValue(built?.consonantPhoneShiftFrame || null),
    spellingChangeFrame: cloneValue(built?.spellingChangeFrame || null),
    stemDerivationFrame: cloneValue(built?.stemDerivationFrame || main.derivedStemFrame || null),
    typedSlotAuthority: main.proofFrame?.conclusion?.typedSlotAuthority === true,
    formulaStringAuthority: false,
    storedExampleAuthority: false,
    curriculumMetadataAuthority: false,
  });
}

export function createClassicalNounstemValidationSemanticOperationsApi(
  targetObject = globalThis,
) {
  const issuedFrames = new WeakSet();

  function buildClassicalNahuatlNounstemValidationFrame(recipeId = "") {
    const required = [
      "buildClassicalNahuatlClassGovernedNncFrame",
      "buildClassicalNahuatlLexicalSelectionRecord",
      "buildClassicalNahuatlNounstemSourceFrame",
      "buildClassicalNahuatlGlottalizedGeneralUseFrame",
      "deriveClassicalNahuatlStem",
      "getClassicalNahuatlClassFormGuidance",
      "validateClassicalNahuatlSubclassSourceShape",
      "buildClassicalNahuatlConstituentAnalysisFrame",
      "buildClassicalNahuatlAssimilationFrame",
      "buildClassicalNahuatlConsonantPhoneShiftFrame",
      "buildClassicalNahuatlSpellingChangeFrame",
    ];
    const missing = required.find(name => typeof targetObject[name] !== "function");
    if (missing) return blocked(recipeId, `canonical-nounstem-capability-required:${missing}`);
    const built = buildRecipe(targetObject, String(recipeId || ""));
    if (!built) return blocked(recipeId, "nounstem-validation-recipe-not-recognized");
    const projected = projectFrame(String(recipeId), built);
    if (projected.authorizationStatus === "authorized") issuedFrames.add(projected);
    return projected;
  }

  function isClassicalNahuatlNounstemValidationFrame(frame = null) {
    return Boolean(
      frame
      && issuedFrames.has(frame)
      && frame.kind === "classical-nahuatl-nounstem-validation-operation-frame"
      && frame.authorizationStatus === "authorized"
      && frame.formulaStringAuthority === false
      && frame.storedExampleAuthority === false
      && frame.curriculumMetadataAuthority === false,
    );
  }

  return Object.freeze({
    buildClassicalNahuatlNounstemValidationFrame,
    isClassicalNahuatlNounstemValidationFrame,
  });
}
