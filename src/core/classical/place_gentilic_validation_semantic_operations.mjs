// Non-authorizing live projection for canonical place-name and gentilic NNC
// semantics. The projection groups repeatable validation mechanics only; each
// semantic owner retains independent atoms, routes, receipts, and proof.

import { createPlaceGentilicNncApi } from "../nnc/place_gentilic/place_gentilic.mjs?v=20260826-relational-role-340";

const ISSUED_VALIDATION_FRAMES = new WeakSet();

function deepFreeze(value) {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  Object.values(value).forEach(deepFreeze);
  return Object.freeze(value);
}

function assertRuntime(target, name) {
  if (typeof target?.[name] !== "function") {
    throw new Error(`place-gentilic-validation-capability-required:${name}`);
  }
}

export function createClassicalPlaceGentilicValidationSemanticOperationsApi(
  targetObject = globalThis,
) {
  const target = targetObject && typeof targetObject === "object"
    ? targetObject
    : globalThis;
  // Read the canonical module's immutable GCD/LCM declarations through its API.
  // Execution remains on the installed runtime so these declarations cannot
  // create a second grammar lane or issue accepted runtime frames.
  const catalogApi = createPlaceGentilicNncApi(target);

  function summarize(result) {
    return deepFreeze({
      authorizationStatus: result?.authorizationStatus || "blocked",
      blockReason: result?.blockReason || "",
      canonicalFrame: target.isPlaceGentilicNncFrame?.(result) === true,
      constructionKind: result?.constructionKind || "",
      formation: result?.formation || "",
      lcmAxisId: result?.lcmAxisId || result?.formationFrame?.axisId || "",
      gcdIdentity: result?.gcdIdentity || "",
      stageOrder: result?.stageOrder || [],
      sourceSubjectReference: result?.sourceAnalysis?.subjectReference || "",
      sourceUsage: result?.sourceAnalysis?.usage || "",
      sourceVoice: result?.sourceAnalysis?.sourceVoice || "",
      sourcePlaceStem: result?.formationFrame?.sourcePlaceStem || "",
      boundaryRule: result?.formationFrame?.boundaryRule || "",
      derivedStem: result?.formationFrame?.derivedStem || result?.formationFrame?.stem || "",
      formula: result?.formulaRealization || "",
      surface: result?.wordSurface || "",
      clauseStructure: result?.finiteFrame?.clauseStructure || "",
      state: result?.state || "",
      typedFrameAuthority: result?.typedFrameAuthority === true,
      callerSuppliedAuthorityAccepted: result?.callerSuppliedAuthorityAccepted === true,
      formulaStringAuthority: result?.formulaStringAuthority === false,
      surfaceStringAuthority: result?.surfaceStringAuthority === false,
      lessonMetadataAuthority: result?.lessonMetadataAuthority === false,
      liveResult: result,
    });
  }

  function execute(request) {
    return summarize(target.evaluatePlaceGentilicNnc(request));
  }

  function place(formation, source, extra = {}) {
    return execute({
      constructionKind: "place-name",
      formation,
      source,
      usage: "adverbial",
      ...extra,
    });
  }

  function gentilic(formation, source, extra = {}) {
    return execute({
      constructionKind: "gentilic",
      formation,
      source,
      subject: "1sg",
      state: "absolutive",
      animacy: "animate",
      ...extra,
    });
  }

  function buildExactGentilicPair(candidateCases = {}, expected = {}) {
    const branches = Object.fromEntries(Object.entries(expected).map(
      ([branchId, contract]) => {
        const record = candidateCases[contract.caseId] || {};
        const authorized = record.authorizationStatus === "authorized"
          && record.canonicalFrame === true
          && record.typedFrameAuthority === true
          && record.callerSuppliedAuthorityAccepted === false
          && record.formation === contract.formation
          && record.lcmAxisId === contract.lcmAxisId
          && record.boundaryRule === contract.boundaryRule
          && record.derivedStem === contract.derivedStem;
        return [branchId, {
          authorizationStatus: authorized ? "authorized" : "blocked",
          formation: record.formation || "",
          lcmAxisId: record.lcmAxisId || "",
          boundaryRule: record.boundaryRule || "",
          derivedStem: record.derivedStem || "",
          formula: record.formula || "",
          surface: record.surface || "",
        }];
      },
    ));
    const authorizationStatus = Object.values(branches).every(
      branch => branch.authorizationStatus === "authorized",
    ) ? "authorized" : "blocked";
    return deepFreeze({
      authorizationStatus,
      blockReason: authorizationStatus === "authorized"
        ? "" : "exact-gentilic-pair-not-proven",
      branches,
    });
  }

  function buildClassicalPanCanGentilicPair(candidateCases = {}) {
    return buildExactGentilicPair(candidateCases, {
      pan: {
        caseId: "panEcaGentilic",
        formation: "ca-pan-eca",
        lcmAxisId: "gentilic/ca-pan-eca",
        boundaryRule: "retain-pan-add-ē-before-ca",
        derivedStem: "Izta-pan-ē-ca",
      },
      can: {
        caseId: "canMecaGentilic",
        formation: "ca-can-meca",
        lcmAxisId: "gentilic/ca-can-meca",
        boundaryRule: "replace-final-n-with-m-add-ē-ca",
        derivedStem: "Xāl-to-cā-m-ē-ca",
      },
    });
  }

  function buildClassicalManTlanGentilicPair(candidateCases = {}) {
    return buildExactGentilicPair(candidateCases, {
      man: {
        caseId: "manGentilic",
        formation: "ca-man-tlan-teca",
        lcmAxisId: "gentilic/ca-man-tlan-teca",
        boundaryRule: "silence-n-and-change-mā-to-mē-before-ca",
        derivedStem: "Ōztō-mē-ca",
      },
      tlan: {
        caseId: "tlanGentilic",
        formation: "ca-man-tlan-teca",
        lcmAxisId: "gentilic/ca-man-tlan-teca",
        boundaryRule:
          "silence-n-change-long-a-to-e-and-lateral-cluster-to-t-before-ca",
        derivedStem: "Āz-tē-ca",
      },
    });
  }

  function buildClassicalTlanLanGentilicVariantPair(candidateCases = {}) {
    const pair = buildExactGentilicPair(candidateCases, {
      tlan: {
        caseId: "tlanGentilic",
        formation: "ca-man-tlan-teca",
        lcmAxisId: "gentilic/ca-man-tlan-teca",
        boundaryRule:
          "silence-n-change-long-a-to-e-and-lateral-cluster-to-t-before-ca",
        derivedStem: "Āz-tē-ca",
      },
      lan: {
        caseId: "lanGentilic",
        formation: "ca-man-tlan-teca",
        lcmAxisId: "gentilic/ca-man-tlan-teca",
        boundaryRule:
          "silence-n-change-long-a-to-e-and-lateral-cluster-to-t-before-ca",
        derivedStem: "Āz-tē-ca",
      },
    });
    const tlan = candidateCases.tlanGentilic || {};
    const lan = candidateCases.lanGentilic || {};
    const exactVariantIdentity = pair.authorizationStatus === "authorized"
      && tlan.sourcePlaceStem === "Āz-tlā-n"
      && lan.sourcePlaceStem === "Āz-lā-n"
      && tlan.sourcePlaceStem !== lan.sourcePlaceStem
      && Boolean(tlan.formula && tlan.surface)
      && tlan.formula === lan.formula
      && tlan.surface === lan.surface;
    return deepFreeze({
      authorizationStatus: exactVariantIdentity ? "authorized" : "blocked",
      blockReason: exactVariantIdentity
        ? "" : "exact-tlan-lan-gentilic-variant-pair-not-proven",
      branches: {
        tlan: {
          ...pair.branches.tlan,
          sourcePlaceStem: tlan.sourcePlaceStem || "",
        },
        lan: {
          ...pair.branches.lan,
          sourcePlaceStem: lan.sourcePlaceStem || "",
        },
      },
      exactVariantIdentity,
      variantSourcesRemainDistinct: exactVariantIdentity,
      canonicalResultConverges: exactVariantIdentity,
    });
  }

  function buildClassicalPlaceGentilicValidationFrame() {
    for (const capability of [
      "evaluatePlaceGentilicNnc",
      "isPlaceGentilicNncFrame",
    ]) assertRuntime(target, capability);

    const cases = {
      nImperfectActive: place("n-imperfect-active", { embedStem: "chōca", sourceVoice: "active" }),
      nImperfectNonactive: place("n-imperfect-nonactive", { embedStem: "panōhua", sourceVoice: "nonactive" }),
      nYan: place("n-yan", { embedStem: "xolochauh" }),
      nMan: place("n-man", { embedStem: "Ōl" }),
      nTlan: place("n-tlan-vicinity", { embedStem: "Tōl" }),
      nCan: place("n-can", { embedStem: "Xōchiā" }),
      nPreterit: place("n-preterit-agentive", { embedStem: "Cōlhuah" }),
      nAction: place("n-action-noun", { embedStem: "on-o" }),
      panIntegrated: place("pan-integrated", { embedStem: "Izta" }),
      panLinked: place("pan-connective-t", { embedStem: "Xāl" }),
      co: place("co", { embedStem: "Tlach" }),
      c: place("c", { embedStem: "Te-cōā" }),
      coAffectiveEmbed: place("co-affective-embed", { embedStem: "Ā-tōy-a-tzin" }),
      coPlaceAffective: place("co-place-affective", {
        embedStem: "Ā-tōy-a-co",
        affectiveMatrix: "tzin",
        analysisKind: "place-name-affective",
      }),
      compoundNahuac: place("co-compound-nahuac", { embedStem: "Ā" }),
      compoundIxco: place("co-compound-ixco", { embedStem: "Xāl" }),
      compoundTicpac: place("co-compound-ticpac", { embedStem: "Tepē" }),
      tlah: place("tlah", { embedStem: "Huexō" }),
      tlahPan: place("tlah-pan", { embedStem: "Tlāl" }),
      tzalan: place("tzalan", { embedStem: "Cōā" }),
      tiTlan: place("ti-tlan", { embedStem: "Te-nōch" }),
      chan: place("chan-supplementation", { embedStem: "Cōātl" }),
      gentilicIncorporatedPlace: place("gentilic-incorporated-place", {
        gentilicStem: "Mē-xi-h-ca", matrixStem: "pan",
      }),
      gentilicAffectivePlace: place("gentilic-affective-co", {
        gentilicStem: "Mē-xi-h-ca", affectiveMatrix: "tzin",
      }),
      nonlocativeGentilic: gentilic("nonlocative-absolutive", { gentilicStem: "Nāhua" }, { nounClass: "tl" }),
      twoClauseGentilic: gentilic("two-clause-concatenate", {
        placeStem: "Ātlacuīhuayān", headStem: "tlāca",
      }, { nounClass: "tl" }),
      preteritOwnerGentilic: gentilic("preterit-agentive-owner", { gentilicStem: "Cōlhuah" }, { nounClass: "zero" }),
      preteritOtherGentilic: gentilic("preterit-agentive-other", { gentilicStem: "Tlailōtlac" }, { nounClass: "zero" }),
      fullPlaceGentilic: gentilic("ca-full-place", { placeStem: "Huexō-tlah" }, { nounClass: "tl" }),
      panEcaGentilic: gentilic("ca-pan-eca", { placeStem: "Izta-pan" }, { nounClass: "tl" }),
      canMecaGentilic: gentilic("ca-can-meca", { placeStem: "Xāl-to-cā-n" }, { nounClass: "tl" }),
      coSilentGentilic: gentilic("ca-co-c-silent", {
        placeStem: "Mē-xi-h-co", placeMatrix: "co",
      }, { nounClass: "tl" }),
      ownerhoodSilentGentilic: gentilic("ca-ownerhood-n-silent", {
        placeStem: "Cōl-huah-cā-n",
      }, { nounClass: "tl" }),
      manGentilic: gentilic("ca-man-tlan-teca", { placeStem: "Ōztō-mā-n" }, { nounClass: "tl" }),
      tlanGentilic: gentilic("ca-man-tlan-teca", { placeStem: "Āz-tlā-n" }, { nounClass: "tl" }),
      lanGentilic: gentilic("ca-man-tlan-teca", { placeStem: "Āz-lā-n" }, { nounClass: "tl" }),
      collectivity: execute({
        constructionKind: "gentilic-collective",
        source: { gentilicStem: "Mē-xi-h-ca" },
        subject: "3sg",
        state: "absolutive",
        nounClass: "tli",
      }),
      collectivityPossessiveZero: execute({
        constructionKind: "gentilic-collective",
        source: { gentilicStem: "Mē-xi-h-ca" },
        subject: "3sg",
        state: "possessive",
        possessor: "1sg",
        collectivityPossessiveVariant: "0",
        nounClass: "tli",
      }),
      collectivityPossessiveUh: execute({
        constructionKind: "gentilic-collective",
        source: { gentilicStem: "Mē-xi-h-ca" },
        subject: "3sg",
        state: "possessive",
        possessor: "1sg",
        collectivityPossessiveVariant: "uh",
        nounClass: "tli",
      }),
      collectivityAdjectival: execute({
        constructionKind: "gentilic-collective",
        source: { gentilicStem: "Mē-xi-h-ca" },
        subject: "3sg",
        state: "absolutive",
        usage: "adjectival",
        nounClass: "tli",
      }),
      adjectivalGentilic: execute({
        constructionKind: "gentilic-adjectival-use",
        source: { gentilicStem: "Cuex-tē-ca" },
        subject: "3sg",
        nounClass: "tl",
      }),
      profession: execute({
        constructionKind: "profession-place-association",
        extensionKind: "profession",
        lexicalId: "toltec-craftsman",
        subject: "3sg",
        state: "absolutive",
      }),
      professionPertinency: execute({
        constructionKind: "profession-pertinency",
        lexicalId: "amantec-feather-worker",
        subject: "3sg",
        state: "absolutive",
      }),
      professionPossessive: execute({
        constructionKind: "profession-place-association",
        extensionKind: "profession",
        lexicalId: "toltec-craftsman",
        subject: "3sg",
        state: "possessive",
        possessor: "1sg",
      }),
      title: execute({
        constructionKind: "profession-place-association",
        extensionKind: "title",
        lexicalId: "tlacochcalcatl",
        subject: "3sg",
        state: "absolutive",
      }),
    };

    const hiddenClassCanonical = target.evaluatePlaceGentilicNnc({
      constructionKind: "gentilic",
      formation: "ca-full-place",
      source: { placeStem: "Huexō-tlah" },
      subject: "1sg",
      nounClass: "tl",
      animacy: "animate",
    });
    const hiddenClassHostile = target.evaluatePlaceGentilicNnc({
      constructionKind: "gentilic",
      formation: "ca-full-place",
      source: { placeStem: "Huexō-tlah" },
      subject: "1sg",
      nounClass: "tli",
      animacy: "animate",
    });
    const ambiguousAffective = target.evaluatePlaceGentilicNnc({
      constructionKind: "place-name",
      formation: "co-place-affective",
      source: { embedStem: "Ā-tōy-a-co", affectiveMatrix: "tzin" },
    });
    const contradictoryActive = target.evaluatePlaceGentilicNnc({
      constructionKind: "place-name",
      formation: "n-imperfect-active",
      source: { embedStem: "chōca", sourceVoice: "nonactive" },
    });
    const wrongFullPlace = target.evaluatePlaceGentilicNnc({
      constructionKind: "gentilic",
      formation: "ca-full-place",
      source: { placeStem: "Mē-xi-h-co" },
      subject: "3sg",
      nounClass: "tl",
    });
    const forgedProfession = target.evaluatePlaceGentilicNnc({
      constructionKind: "profession-place-association",
      extensionKind: "profession",
      lexicalId: "invented-profession",
      subject: "3sg",
    });
    const evidenceOnlyTitle = target.evaluatePlaceGentilicNnc({
      constructionKind: "profession-place-association",
      extensionKind: "title",
      lexicalId: "tlillan-calqui",
      subject: "3sg",
    });
    const hostileStrings = target.evaluatePlaceGentilicNnc({
      constructionKind: "gentilic",
      formation: "ca-co-c-silent",
      source: { placeStem: "Mē-xi-h-co", placeMatrix: "co" },
      subject: "1sg",
      formula: "#FORGED#",
      resultSurface: "forged",
      lessonMetadata: { lesson: 48 },
    });

    const lcm = catalogApi.PLACE_GENTILIC_NNC_LCM;
    const gcd = catalogApi.PLACE_GENTILIC_NNC_GCD;
    const frame = deepFreeze({
      kind: "classical-nahuatl-place-gentilic-validation-frame",
      authorizationStatus: Object.values(cases).every(item => item.canonicalFrame)
        ? "authorized"
        : "blocked",
      catalog: {
        axisCount: lcm?.axisCount || 0,
        uniqueAxisCount: new Set((lcm?.axes || []).map(axis => axis.axisId)).size,
        axisIds: (lcm?.axes || []).map(axis => axis.axisId),
        gcdIdentity: gcd?.identityId || "",
        gcdStageOrder: gcd?.stageOrder || [],
      },
      analyses: {
        uniqueReference: {
          axisId: "place/unique-reference",
          canonicalPlaceFrame: cases.nYan.canonicalFrame,
          subjectReference: cases.nYan.sourceSubjectReference,
        },
        functionUse: {
          axisId: "place/function-use",
          canonicalAdverbialFrame: cases.nYan.canonicalFrame,
          usage: cases.nYan.sourceUsage,
          EnglishPrepositionAuthorizesMorphology: false,
        },
        topographicalBoundary: {
          axisId: "place/topographical-boundary",
          canonicalPlaceFrame: cases.nYan.canonicalFrame,
          topographicalNameIsPlaceByDefault: false,
        },
        translationUncertainty: {
          axisId: "place/translation-uncertainty",
          canonicalPlaceFrame: cases.nYan.canonicalFrame,
          translationAuthorizesMorphology: false,
          spellingGuessAuthorizesMorphology: false,
        },
        panWatercourse: {
          axisId: "place/pan-watercourse",
          canonicalIntegratedFrame: cases.panIntegrated.canonicalFrame,
          contextualReadingIsForcedOutput: false,
        },
        coAffectiveAmbiguity: {
          axisId: "place/co-affective-ambiguity",
          directCanonical: cases.coAffectiveEmbed.canonicalFrame,
          placeAffectiveCanonical: cases.coPlaceAffective.canonicalFrame,
          untypedAmbiguityBlocked: ambiguousAffective.authorizationStatus === "blocked",
        },
        coSourceHistory: {
          axisId: "place/co",
          canonicalCoFrame: cases.co.canonicalFrame,
          historicalDerivationAuthorizesOutput: false,
          erroneousSoundChangeAuthorizesOutput: false,
        },
        panFormationContrast: {
          integratedCanonical: cases.panIntegrated.canonicalFrame,
          connectiveCanonical: cases.panLinked.canonicalFrame,
          formationsRemainSeparate: true,
        },
        chanSourceHistory: {
          canonicalChanFrame: cases.chan.canonicalFrame,
          externalLanguageAttributionAuthorizesMorphology: false,
        },
        alternativeRoute: {
          axisId: "gentilic/alternative-route",
          productiveCanonical: cases.fullPlaceGentilic.canonicalFrame,
          twoClauseCanonical: cases.twoClauseGentilic.canonicalFrame,
          routesRemainSeparate: true,
        },
        defectiveSpelling: {
          axisId: "gentilic/defective-spelling-ambiguity",
          canonicalComparisonAvailable:
            cases.fullPlaceGentilic.canonicalFrame && cases.twoClauseGentilic.canonicalFrame,
          spellingSelectsFormation: false,
        },
        collectivityPertinencyBoundary: {
          canonicalCollectivityFrame: cases.collectivity.canonicalFrame,
          surfaceIdentityTransfersOwnership: false,
          usageControlsAnalysis: true,
        },
      },
      cases,
      constraints: {
        panCanGentilicPair: buildClassicalPanCanGentilicPair(cases),
        manTlanGentilicPair: buildClassicalManTlanGentilicPair(cases),
        tlanLanGentilicVariantPair:
          buildClassicalTlanLanGentilicVariantPair(cases),
      },
      blockedCases: {
        ambiguousAffective: {
          authorizationStatus: ambiguousAffective.authorizationStatus,
          blockReason: ambiguousAffective.blockReason,
        },
        contradictoryActive: {
          authorizationStatus: contradictoryActive.authorizationStatus,
          blockReason: contradictoryActive.blockReason,
        },
        wrongFullPlace: {
          authorizationStatus: wrongFullPlace.authorizationStatus,
          blockReason: wrongFullPlace.blockReason,
        },
        forgedProfession: {
          authorizationStatus: forgedProfession.authorizationStatus,
          blockReason: forgedProfession.blockReason,
        },
        evidenceOnlyTitle: {
          authorizationStatus: evidenceOnlyTitle.authorizationStatus,
          blockReason: evidenceOnlyTitle.blockReason,
          evidenceSurface: evidenceOnlyTitle.formationFrame?.evidenceSurface || "",
          formula: evidenceOnlyTitle.formulaRealization || "",
        },
        hostileStrings: {
          authorizationStatus: hostileStrings.authorizationStatus,
          blockReason: hostileStrings.blockReason,
          formula: hostileStrings.formulaRealization || "",
          surface: hostileStrings.wordSurface || "",
          callerSuppliedAuthorityAccepted: hostileStrings.callerSuppliedAuthorityAccepted === true,
        },
        hiddenNounClass: {
          canonicalUnchanged:
            hiddenClassCanonical.formulaRealization === hiddenClassHostile.formulaRealization
            && hiddenClassCanonical.wordSurface === hiddenClassHostile.wordSurface,
          canonicalFormula: hiddenClassCanonical.formulaRealization,
          hostileFormula: hiddenClassHostile.formulaRealization,
          canonicalSurface: hiddenClassCanonical.wordSurface,
          hostileSurface: hiddenClassHostile.wordSurface,
        },
      },
      contract: {
        typedFiveStagePathRequired: true,
        sharedProjectionOwnsGrammar: false,
        sharedProjectionOwnsAtoms: false,
        placeAndGentilicOwnersRemainSeparate: true,
        translationAuthorizesMorphology: false,
        historicalAnalysisAuthorizesMorphology: false,
        spellingGuessAuthorizesMorphology: false,
        hiddenNounClassAuthorizesMorphology: false,
        formulaAuthority: false,
        surfaceAuthority: false,
        lessonMetadataAuthority: false,
        groupingTransfersProof: false,
      },
    });
    ISSUED_VALIDATION_FRAMES.add(frame);
    return frame;
  }

  function isClassicalPlaceGentilicValidationFrame(frame = null) {
    return Boolean(
      ISSUED_VALIDATION_FRAMES.has(frame)
      && frame?.kind === "classical-nahuatl-place-gentilic-validation-frame"
      && frame.authorizationStatus === "authorized"
      && frame.contract?.sharedProjectionOwnsGrammar === false
      && frame.contract?.sharedProjectionOwnsAtoms === false
      && Object.isFrozen(frame)
    );
  }

  return Object.freeze({
    buildClassicalPanCanGentilicPair,
    buildClassicalManTlanGentilicPair,
    buildClassicalTlanLanGentilicVariantPair,
    buildClassicalPlaceGentilicValidationFrame,
    isClassicalPlaceGentilicValidationFrame,
  });
}
