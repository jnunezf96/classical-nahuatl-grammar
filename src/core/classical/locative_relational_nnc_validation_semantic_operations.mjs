// Non-authorizing live validation projection for locative and directional
// relational NNC semantics. The projection owns no grammar, atom, route, or
// proof; independent semantic owners select assertions from its live frame.

import {
  createClassicalNahuatlNncClosureApi,
} from "./nnc_lessons45_47_closure.mjs";

const ISSUED_VALIDATION_FRAMES = new WeakSet();

function deepFreeze(value) {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  Object.values(value).forEach(deepFreeze);
  return Object.freeze(value);
}

function assertRuntime(target, name) {
  if (typeof target?.[name] !== "function") {
    throw new Error(`locative-relational-validation-runtime-capability-required:${name}`);
  }
}

export function createClassicalLocativeRelationalNncValidationSemanticOperationsApi(
  targetObject = globalThis,
) {
  const inheritedTarget = targetObject && typeof targetObject === "object"
    ? targetObject
    : globalThis;
  const target = Object.create(inheritedTarget);
  Object.defineProperties(
    target,
    Object.getOwnPropertyDescriptors(createClassicalNahuatlNncClosureApi(target)),
  );

  function typedRequest(request = {}) {
    const inventory = target.getClassicalNahuatlRelationalStemInventory();
    const stem = inventory.find(candidate => candidate.stemId === request.stemId);
    if (!stem) return request;
    const option = request.option || "option-two";
    const sourceKind = request.sourceKind || stem.allowedSourceKinds[0] || "nounstem";
    const sourceStem = request.embeddedStem || stem.fixedEmbeddedStem || "cal";
    const sourceMatrixStem = request.sourceMatrixStem || (
      stem.stemId === "co-c-specific-location"
        ? request.sourceLexemeId === "tle-fire" || !/[aeiouāēīō]$/u.test(sourceStem)
          ? "co"
          : "c"
        : stem.classicalMatrix
    );
    return {
      state: request.state || "absolutive",
      possessorId: request.possessorId || "",
      subjectMode: request.subjectMode || "adverbialized",
      subjectId: request.subjectId || "3common",
      sentencePosition: request.sentencePosition || "noninitial",
      adjunctorIn: request.adjunctorIn === true,
      dependentClausePresent: request.dependentClausePresent === true,
      negative: request.negative === true,
      nounstem: {
        kind: target.CLASSICAL_NAHUATL_NNC_NOUNSTEM_REQUEST_KIND,
        stemId: stem.stemId,
        formation: option,
        operation: "relational-nnc",
        sourceKind,
        sourceFormation: request.formationId || "plain-nounstem",
      sourceVoice: request.upstreamResult
        ? ""
        : request.sourceVoice || "active",
        sourceMode: "embed-matrix",
        sourceStem: request.upstreamResult ? "" : sourceStem,
        sourceEmbedStem: request.upstreamResult ? "" : sourceStem,
        sourceMatrixStem,
        affective: request.affective || "none",
        sourceLexemeId: request.sourceLexemeId || "",
        lexicalExceptionId: request.lexicalExceptionId || "",
        upstreamResult: request.upstreamResult || null,
      },
    };
  }

  function summarize(result) {
    return deepFreeze({
      authorizationStatus: result?.authorizationStatus || "blocked",
      diagnostics: result?.diagnostics || [],
      canonicalResult: target.isClassicalNahuatlRelationalResult?.(result) === true,
      canonicalGrammarFrame:
        target.isClassicalNahuatlRelationalNncGrammarFrame?.(result?.grammarFrame) === true,
      stemId: result?.stemId || "",
      option: result?.option || "",
      optionGroup: result?.optionGroup || "",
      sourceKind: result?.sourceFrame?.sourceKind || "",
      sourceFormation: result?.sourceFrame?.predicateStemFrame?.sourceFormation || "",
      sourceVoice: result?.sourceFrame?.predicateStemFrame?.sourceVoice || "",
      affective: result?.sourceFrame?.affective || "none",
      sourceState: result?.sourceState || "",
      subjectMode: result?.formulaSlots?.subjectMode || "",
      possessor: result?.formulaSlots?.possessor || "",
      operationId: result?.operationFrame?.operationId || "",
      operationTrace: result?.operationFrame?.operationTrace || [],
      predicateSegments:
        result?.operationFrame?.predicateRecord?.predicateSegments || [],
      predicateStem: result?.predicateStem || "",
      formula: result?.formula || "",
      surface: result?.surface || "",
      contextualFacts: result?.contextualFacts || null,
      typedSourceAuthority: result?.sourceFrame?.typedSourceAuthority === true,
      typedOperationAuthority: result?.operationFrame?.typedOperationAuthority === true,
      formulaGeneratedIndependently: result?.formulaDerivedFromWritten === false,
      writtenGeneratedIndependently: result?.writtenDerivedFromFormula === false,
      formulaStringAuthority: result?.formulaStringAuthority === false,
      surfaceStringAuthority: result?.surfaceStringAuthority === false,
      lessonMetadataAuthority: result?.lessonMetadataAuthority === false,
      liveResult: result,
    });
  }

  function execute(request) {
    return summarize(target.evaluateClassicalNahuatlRelationalNnc(typedRequest(request)));
  }

  function buildClassicalTlahAffectiveFinalCoPair(candidateCases = {}) {
    const expected = {
      honorific: { caseId: "tlahAffective", morpheme: "tzin" },
      pejorative: {
        caseId: "tlahAffectivePejorative",
        morpheme: "tōn",
      },
    };
    const branches = Object.fromEntries(Object.entries(expected).map(
      ([branchId, branch]) => {
        const record = candidateCases[branch.caseId] || {};
        const tail = (record.predicateSegments || []).slice(-2);
        const authorized = record.authorizationStatus === "authorized"
          && record.canonicalResult === true
          && record.typedSourceAuthority === true
          && record.typedOperationAuthority === true
          && record.affective === branchId
          && tail.length === 2
          && tail[0]?.morpheme === branch.morpheme
          && tail[0]?.role === "affective"
          && tail[1]?.morpheme === "co"
          && tail[1]?.role === "adverbializer";
        return [branchId, {
          authorizationStatus: authorized ? "authorized" : "blocked",
          predicateStem: record.predicateStem || "",
          formula: record.formula || "",
          surface: record.surface || "",
          finalMorphemes: tail.map(segment => segment?.morpheme || ""),
        }];
      },
    ));
    const authorizationStatus = Object.values(branches).every(
      branch => branch.authorizationStatus === "authorized",
    ) && branches.honorific.predicateStem !== branches.pejorative.predicateStem
      ? "authorized" : "blocked";
    return deepFreeze({
      authorizationStatus,
      blockReason: authorizationStatus === "authorized"
        ? "" : "tlah-affective-tzin-ton-final-co-pair-not-proven",
      branches,
    });
  }

  function deverbalSource(formationId, sourceStem = "mich-namaca") {
    return target.requestClassicalDeverbalNncResult({
      constructionKind: "predicate-nominalization",
      nominalizationKind: formationId,
      source: {
        sourceStage: formationId === "preterit-agentive"
          ? "preterit-predicate"
          : "distant-past-predicate",
        sourceStem,
        verbClass: formationId === "preterit-agentive" ? "A" : "B",
        sourceVoice: "active",
        sourceValence: "intransitive",
        sourceObjectPattern: "none",
        sourceSubject: "3sg",
      },
      subject: "3sg",
      state: "absolutive",
    });
  }

  function vncSource(formationId, incorporated = false) {
    const byFormation = {
      "imperfect-active": {
        sourceStem: incorporated ? "nōhui-cochi" : "cochi",
        verbClass: "B",
        sourceValence: "intransitive",
        tense: "imperfect",
        requestedVoice: "active",
        ...(incorporated ? { incorporatedAdverb: "nōhui" } : {}),
      },
      "imperfect-passive": {
        sourceStem: "pōhua",
        verbClass: "A",
        sourceValence: "specific-projective",
        objectPerson: "3sg",
        tense: "imperfect",
        requestedVoice: "passive",
      },
      "imperfect-impersonal": {
        sourceStem: "cochi",
        verbClass: "B",
        sourceValence: "intransitive",
        tense: "imperfect",
        requestedVoice: "impersonal",
      },
      "present-yohua": {
        sourceStem: "yohua",
        verbClass: "A",
        sourceValence: "intransitive",
        tense: "present",
        requestedVoice: "active",
      },
      "perfective-active": {
        sourceStem: incorporated ? "ahco-nemi" : "cati",
        verbClass: "B",
        sourceValence: "intransitive",
        tense: "preterit",
        requestedVoice: "active",
        ...(incorporated ? { incorporatedAdverb: "ahco" } : {}),
      },
      "perfective-impersonal-tla": {
        sourceStem: "nēci",
        verbClass: "B",
        sourceValence: "intransitive",
        tense: "preterit",
        requestedVoice: "impersonal",
        nonactiveOptionId: "tla-impersonal",
      },
    };
    return target.requestClassicalVncApplicationResult({
      ...byFormation[formationId],
      subject: "3sg",
      mood: "indicative",
    });
  }

  function buildClassicalLocativeRelationalNncValidationFrame() {
    for (const capability of [
      "evaluateClassicalNahuatlRelationalNnc",
      "isClassicalNahuatlRelationalResult",
      "isClassicalNahuatlRelationalNncGrammarFrame",
      "getClassicalNahuatlRelationalStemInventory",
      "requestClassicalDeverbalNncResult",
      "requestClassicalVncApplicationResult",
    ]) assertRuntime(target, capability);

    const inventory = target.getClassicalNahuatlRelationalStemInventory();
    const preterit = deverbalSource("preterit-agentive");
    const activeAction = deverbalSource("active-action", "cochi");
    const imperfectActive = vncSource("imperfect-active");
    const imperfectActiveIncorporated = vncSource("imperfect-active", true);
    const imperfectPassive = vncSource("imperfect-passive");
    const imperfectImpersonal = vncSource("imperfect-impersonal");
    const presentYohua = vncSource("present-yohua");
    const perfective = vncSource("perfective-active");
    const perfectiveIncorporated = vncSource("perfective-active", true);
    const perfectiveImpersonal = vncSource("perfective-impersonal-tla");

    const cases = {
      optionTwo: execute({ stemId: "n-locative", sourceKind: "nounstem", embeddedStem: "cal" }),
      nSupportive: execute({ stemId: "n-locative", sourceKind: "nounstem", embeddedStem: "cec" }),
      nIncorporated: execute({ stemId: "n-locative", sourceKind: "nounstem", embeddedStem: "cec", subjectMode: "adverbialized" }),
      nPreterit: execute({
        stemId: "n-locative",
        formationId: "preterit-agentive",
        sourceKind: "preterit-agentive-general-use",
        upstreamResult: preterit,
      }),
      nPreteritNormal: execute({
        stemId: "n-locative",
        formationId: "preterit-agentive",
        sourceKind: "preterit-agentive-general-use",
        upstreamResult: preterit,
        subjectMode: "normal",
        subjectId: "3common",
      }),
      nActiveAction: execute({
        stemId: "n-locative",
        formationId: "active-action",
        sourceKind: "active-action",
        upstreamResult: activeAction,
        state: "possessive",
        possessorId: "1sg",
      }),
      nAffective: execute({
        stemId: "n-locative",
        sourceKind: "nounstem",
        embeddedStem: "cal",
        affective: "honorific",
      }),
      canInitial: execute({
        stemId: "n-locative",
        formationId: "can-interrogative",
        sourceKind: "interrogative-empty",
        embeddedStem: "",
        sentencePosition: "initial",
      }),
      canFused: execute({
        stemId: "n-locative",
        formationId: "can-interrogative",
        sourceKind: "interrogative-empty",
        embeddedStem: "",
        sentencePosition: "initial",
        adjunctorIn: true,
        dependentClausePresent: false,
      }),
      canSeparated: execute({
        stemId: "n-locative",
        formationId: "can-interrogative",
        sourceKind: "interrogative-empty",
        embeddedStem: "",
        sentencePosition: "initial",
        adjunctorIn: true,
        dependentClausePresent: true,
      }),
      canNoninitial: execute({
        stemId: "n-locative",
        formationId: "can-interrogative",
        sourceKind: "interrogative-empty",
        embeddedStem: "",
        sentencePosition: "noninitial",
      }),
      canNegative: execute({
        stemId: "n-locative",
        formationId: "can-interrogative",
        sourceKind: "interrogative-empty",
        embeddedStem: "",
        sentencePosition: "initial",
        negative: true,
      }),
      canModified: execute({
        stemId: "n-locative",
        formationId: "can-modified",
        sourceKind: "interrogative-modifier",
        embeddedStem: "on",
      }),
      canNumeral: execute({
        stemId: "n-locative",
        formationId: "can-modified",
        sourceKind: "interrogative-modifier",
        embeddedStem: "ōc",
      }),
      canPatientive: execute({
        stemId: "n-locative",
        formationId: "can-modified",
        sourceKind: "interrogative-modifier",
        embeddedStem: "cual",
      }),
      imperfectActive: execute({
        stemId: "n-locative",
        formationId: "imperfect-active",
        sourceKind: "imperfect-predicate",
        upstreamResult: imperfectActive,
        state: "possessive",
        possessorId: "1sg",
      }),
      imperfectActiveIncorporated: execute({
        stemId: "n-locative",
        formationId: "imperfect-active",
        sourceKind: "incorporated-adverb-imperfect-predicate",
        upstreamResult: imperfectActiveIncorporated,
      }),
      imperfectPassive: execute({
        stemId: "n-locative",
        formationId: "imperfect-passive",
        sourceKind: "imperfect-predicate",
        upstreamResult: imperfectPassive,
        state: "possessive",
        possessorId: "3pl",
      }),
      imperfectImpersonal: execute({
        stemId: "n-locative",
        formationId: "imperfect-impersonal",
        sourceKind: "imperfect-predicate",
        upstreamResult: imperfectImpersonal,
      }),
      presentYohua: execute({
        stemId: "n-locative",
        formationId: "present-yohua",
        sourceKind: "imperfect-predicate",
        upstreamResult: presentYohua,
      }),
      yanPerfective: execute({
        stemId: "yan-locative",
        formationId: "perfective-active",
        sourceKind: "perfective-core",
        upstreamResult: perfective,
        state: "possessive",
        possessorId: "1sg",
      }),
      yanIncorporated: execute({
        stemId: "yan-locative",
        formationId: "perfective-active",
        sourceKind: "incorporated-adverb-perfective-core",
        upstreamResult: perfectiveIncorporated,
      }),
      yanImpersonal: execute({
        stemId: "yan-locative",
        formationId: "perfective-impersonal-tla",
        sourceKind: "impersonal-tla-perfective-core",
        upstreamResult: perfectiveImpersonal,
      }),
      tlahAbsolutive: execute({ stemId: "tlah-abundance-place", sourceKind: "nounstem", embeddedStem: "cuauh" }),
      tlahPossessive: execute({ stemId: "tlah-abundance-place", sourceKind: "nounstem", embeddedStem: "cuauh", state: "possessive", possessorId: "1sg" }),
      tlahVarietal: execute({ stemId: "tlah-abundance-place", sourceKind: "varietal-nounstem", embeddedStem: "xoch" }),
      tlahAffective: execute({ stemId: "tlah-abundance-place", sourceKind: "nounstem", embeddedStem: "cuauh", affective: "honorific" }),
      tlahAffectivePejorative: execute({ stemId: "tlah-abundance-place", sourceKind: "nounstem", embeddedStem: "cuauh", affective: "pejorative" }),
      coConsonant: execute({ stemId: "co-c-specific-location", sourceKind: "nounstem", embeddedStem: "cal" }),
      cVowel: execute({ stemId: "co-c-specific-location", sourceKind: "nounstem", embeddedStem: "tecoma" }),
      coFire: execute({ stemId: "co-c-specific-location", sourceKind: "nounstem", embeddedStem: "tle", sourceLexemeId: "tle-fire" }),
      cTemporal: execute({ stemId: "co-c-specific-location", sourceKind: "temporal-yo-stem", embeddedStem: "mōztlayō" }),
      cBodyPart: execute({ stemId: "co-c-specific-location", sourceKind: "body-part-stem", embeddedStem: "mā" }),
      coAffective: execute({ stemId: "co-c-specific-location", sourceKind: "nounstem", embeddedStem: "teohcal", affective: "honorific" }),
      interval: execute({ stemId: "ca-interval-distance", sourceKind: "quantitive", embeddedStem: "achi" }),
      intervalHueh: execute({ stemId: "ca-interval-distance", sourceKind: "hueh", embeddedStem: "hueh" }),
      intervalLexical: execute({ stemId: "ca-interval-distance", sourceKind: "lexical", embeddedStem: "nech" }),
      direction: execute({ stemId: "pa-direction", sourceKind: "particle", embeddedStem: "nē" }),
      directionNounstem: execute({ stemId: "pa-direction", sourceKind: "nounstem", embeddedStem: "pani" }),
      directionRelational: execute({ stemId: "pa-direction", sourceKind: "relational-compound", embeddedStem: "huehca" }),
      directionCan: execute({ stemId: "pa-direction", sourceKind: "can-compound", embeddedStem: "cām" }),
      directionIcan: execute({ stemId: "pa-direction", sourceKind: "ican", embeddedStem: "īcan", state: "possessive", possessorId: "1sg" }),
      directionAffective: execute({ stemId: "pa-direction", sourceKind: "nounstem", embeddedStem: "ihtic", affective: "honorific" }),
      frequency: execute({ stemId: "pa-frequency", sourceKind: "numeral", embeddedStem: "ōm" }),
      frequencyQuantitive: execute({ stemId: "pa-frequency", sourceKind: "quantitive", embeddedStem: "miec" }),
      nal: execute({ stemId: "nal-far-bank", sourceKind: "water-stem", embeddedStem: "ā" }),
      chiGround: execute({ stemId: "chi-direction-toward", sourceKind: "ground-stem", embeddedStem: "tlāl" }),
      chiRare: execute({ stemId: "chi-direction-toward", sourceKind: "rare-nounstem", embeddedStem: "ātēn" }),
      downward: execute({ stemId: "ic-downward-direction", sourceKind: "body-part-stem", embeddedStem: "tzon" }),
      similarity: execute({ stemId: "teuh-similarity", sourceKind: "nounstem", embeddedStem: "te" }),
    };

    const rawUntyped = target.evaluateClassicalNahuatlRelationalNnc({
      stemId: "n-locative",
      option: "option-two",
      embeddedStem: "cal",
    });
    const copiedPreterit = target.evaluateClassicalNahuatlRelationalNnc(typedRequest({
      stemId: "n-locative",
      formationId: "preterit-agentive",
      sourceKind: "preterit-agentive-general-use",
      upstreamResult: { ...preterit },
    }));
    const forgedSourceClaim = target.evaluateClassicalNahuatlRelationalNnc({
      ...typedRequest({
        stemId: "n-locative",
        formationId: "preterit-agentive",
        sourceKind: "preterit-agentive-general-use",
        upstreamResult: preterit,
      }),
      nounstem: {
        ...typedRequest({
          stemId: "n-locative",
          formationId: "preterit-agentive",
          sourceKind: "preterit-agentive-general-use",
          upstreamResult: preterit,
        }).nounstem,
        sourceStem: "forged",
      },
    });
    const wrongNal = target.evaluateClassicalNahuatlRelationalNnc(typedRequest({
      stemId: "nal-far-bank",
      sourceKind: "water-stem",
      embeddedStem: "cal",
    }));
    const wrongFrequency = target.evaluateClassicalNahuatlRelationalNnc(typedRequest({
      stemId: "pa-frequency",
      sourceKind: "nounstem",
      embeddedStem: "cal",
    }));
    const canonicalRequest = typedRequest({
      stemId: "co-c-specific-location",
      sourceKind: "nounstem",
      embeddedStem: "cal",
    });
    const canonical = target.evaluateClassicalNahuatlRelationalNnc(canonicalRequest);
    const callerStrings = target.evaluateClassicalNahuatlRelationalNnc({
      ...canonicalRequest,
      lesson: 46,
      formula: "#FORGED#",
      surface: "forged",
      translationLabel: "inside",
      sourceFrame: { kind: "forged" },
      operationFrame: { kind: "forged" },
    });

    const frame = deepFreeze({
      kind: "classical-nahuatl-locative-relational-nnc-validation-frame",
      authorizationStatus: Object.values(cases).every(item => item.canonicalResult)
        ? "authorized"
        : "blocked",
      catalog: {
        stemCount: inventory.length,
        optionTwoOnlyCount: inventory.filter(stem => stem.optionGroup === "option-two-only").length,
        optionTwoOnlyStemIds: inventory
          .filter(stem => stem.optionGroup === "option-two-only")
          .map(stem => stem.stemId),
      },
      prerequisites: {
        preteritCanonical: target.isClassicalNahuatlDeverbalNncGrammarFrame?.(preterit) === true,
        activeActionCanonical: target.isClassicalNahuatlDeverbalNncGrammarFrame?.(activeAction) === true,
        imperfectActiveCanonical: target.isClassicalNahuatlVncApplicationFrame?.(imperfectActive) === true,
        imperfectPassiveCanonical: target.isClassicalNahuatlVncApplicationFrame?.(imperfectPassive) === true,
        imperfectImpersonalCanonical: target.isClassicalNahuatlVncApplicationFrame?.(imperfectImpersonal) === true,
        perfectiveCanonical: target.isClassicalNahuatlVncApplicationFrame?.(perfective) === true,
      },
      cases,
      constraints: {
        tlahAffectiveFinalCoPair:
          buildClassicalTlahAffectiveFinalCoPair(cases),
      },
      blockedCases: {
        rawUntyped: {
          authorizationStatus: rawUntyped.authorizationStatus,
          diagnostic: rawUntyped.diagnostics?.[0] || "",
        },
        copiedPreterit: {
          authorizationStatus: copiedPreterit.authorizationStatus,
          diagnostic: copiedPreterit.diagnostics?.[0] || "",
        },
        forgedSourceClaim: {
          authorizationStatus: forgedSourceClaim.authorizationStatus,
          diagnostic: forgedSourceClaim.diagnostics?.[0] || "",
        },
        wrongNal: {
          authorizationStatus: wrongNal.authorizationStatus,
          diagnostic: wrongNal.diagnostics?.[0] || "",
        },
        wrongFrequency: {
          authorizationStatus: wrongFrequency.authorizationStatus,
          diagnostic: wrongFrequency.diagnostics?.[0] || "",
        },
        callerStringsIgnored: {
          canonicalMatchesHostile:
            canonical.formula === callerStrings.formula
            && canonical.surface === callerStrings.surface
            && canonical.predicateStem === callerStrings.predicateStem,
          callerSuppliedAuthorityAccepted: callerStrings.callerSuppliedAuthorityAccepted,
          formulaStringAuthority: callerStrings.formulaStringAuthority,
          surfaceStringAuthority: callerStrings.surfaceStringAuthority,
          lessonMetadataAuthority: callerStrings.lessonMetadataAuthority,
        },
      },
      contract: {
        sourceAndRelationalOperationsRemainSeparate: true,
        sharedProjectionOwnsGrammar: false,
        sharedProjectionOwnsAtoms: false,
        translationAuthorizesMorphology: false,
        historicalAnalysisAuthorizesMorphology: false,
        formulaAuthority: false,
        surfaceAuthority: false,
        exampleAuthority: false,
        lessonMetadataAuthority: false,
        groupingTransfersProof: false,
      },
    });
    ISSUED_VALIDATION_FRAMES.add(frame);
    return frame;
  }

  function isClassicalLocativeRelationalNncValidationFrame(frame = null) {
    return Boolean(
      ISSUED_VALIDATION_FRAMES.has(frame)
      && frame?.kind === "classical-nahuatl-locative-relational-nnc-validation-frame"
      && frame.authorizationStatus === "authorized"
      && frame.contract?.sharedProjectionOwnsGrammar === false
      && frame.contract?.sharedProjectionOwnsAtoms === false
      && Object.isFrozen(frame)
    );
  }

  return Object.freeze({
    buildClassicalTlahAffectiveFinalCoPair,
    buildClassicalLocativeRelationalNncValidationFrame,
    isClassicalLocativeRelationalNncValidationFrame,
  });
}
