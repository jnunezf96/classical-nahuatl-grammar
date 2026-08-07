// Non-authorizing live projection for relational option, compound,
// associated-entity, and pertinency continuations. Independent semantic owners
// select atom-specific assertions from this frame; the projection owns no
// grammar, atom, route, receipt, or proof.

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
    throw new Error(`relational-continuation-validation-capability-required:${name}`);
  }
}

export function createClassicalRelationalContinuationValidationSemanticOperationsApi(
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
    const constructionKind = request.constructionKind || "relational-nnc";
    const relationalNnc = constructionKind === "relational-nnc";
    const option = request.option || (relationalNnc ? "option-one" : "");
    const sourceKind = request.sourceKind || (
      option === "option-one" ? "possessor" : stem.allowedSourceKinds[0] || "nounstem"
    );
    const sourceEmbedStem = request.embeddedStem || "";
    const sourceMatrixStem = relationalNnc
      ? request.sourceMatrixStem || stem.classicalMatrix
      : "";
    const sourceStem = relationalNnc
      ? option === "option-one" ? sourceMatrixStem : request.sourceStem || sourceEmbedStem
      : request.sourceStem || "";
    return {
      state: request.state || (option === "option-one" ? "possessive" : "absolutive"),
      possessorId: request.possessorId || "1sg",
      subjectMode: request.subjectMode || "adverbialized",
      subjectId: request.subjectId || "3common",
      nounstem: {
        kind: target.CLASSICAL_NAHUATL_NNC_NOUNSTEM_REQUEST_KIND,
        stemId: stem.stemId,
        formation: option,
        operation: constructionKind,
        sourceKind,
        sourceFormation: request.formationId || "plain-nounstem",
        sourceVoice: request.sourceVoice || "active",
        sourceMode: relationalNnc
          ? option === "option-one" ? "whole-stem" : "embed-matrix"
          : "",
        sourceStem,
        sourceEmbedStem: relationalNnc && option !== "option-one" ? sourceEmbedStem : "",
        sourceMatrixStem,
        downstreamTargetStem: request.targetMatrixStem || "",
        affective: request.affective || "none",
        sourceEndsInCoOrC: request.sourceEndsInCoOrC === true,
        pertinencySourceKind: request.pertinencySourceKind || "direct-relational",
        nounConnector: request.nounConnector || "",
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
      constructionKind: result?.constructionKind || "",
      sourceKind: result?.sourceFrame?.sourceKind || "",
      sourceState: result?.sourceState || "",
      subjectMode: result?.formulaSlots?.subjectMode || "",
      operationId: result?.operationFrame?.operationId || "",
      operationTrace: result?.operationFrame?.operationTrace || [],
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

  function buildClassicalRelationalContinuationValidationFrame() {
    for (const capability of [
      "evaluateClassicalNahuatlRelationalNnc",
      "isClassicalNahuatlRelationalResult",
      "isClassicalNahuatlRelationalNncGrammarFrame",
      "getClassicalNahuatlRelationalStemInventory",
    ]) assertRuntime(target, capability);

    const cases = {
      tzalanPossessive: execute({ stemId: "tzalan-between", option: "option-one" }),
      tzalanIntegrated: execute({
        stemId: "tzalan-between", option: "option-two", sourceKind: "nounstem", embeddedStem: "cal",
      }),
      tzalanNormal: execute({
        stemId: "tzalan-between", option: "option-two", sourceKind: "nounstem", embeddedStem: "cal",
        subjectMode: "normal", subjectId: "3common",
      }),
      tzalanAffective: execute({
        stemId: "tzalan-between", option: "option-two", sourceKind: "nounstem", embeddedStem: "cal",
        affective: "honorific",
      }),
      huicPossessive: execute({ stemId: "huic-direction", option: "option-one" }),
      huicIntegrated: execute({
        stemId: "huic-direction", option: "option-two", sourceKind: "relational-compound", embeddedStem: "huehca",
      }),
      caPossessive: execute({ stemId: "ca-means", option: "option-one" }),
      caLinked: execute({
        stemId: "ca-means", option: "option-three", sourceKind: "nounstem", embeddedStem: "tomin",
      }),
      icpacPossessive: execute({ stemId: "icpac-top", option: "option-one" }),
      icpacLinked: execute({
        stemId: "icpac-top", option: "option-three", sourceKind: "nounstem", embeddedStem: "tlāl",
      }),
      icpacNormal: execute({
        stemId: "icpac-top", option: "option-three", sourceKind: "nounstem", embeddedStem: "tlāl",
        subjectMode: "normal", subjectId: "3common",
      }),
      icpacDirection: execute({
        stemId: "pa-direction", option: "option-two", sourceKind: "relational-compound", embeddedStem: "icpac",
      }),
      icpacAffective: execute({
        stemId: "icpac-top", option: "option-three", sourceKind: "nounstem", embeddedStem: "tlāl",
        affective: "honorific",
      }),
      techPossessive: execute({ stemId: "tech-contact", option: "option-one" }),
      techIntegrated: execute({
        stemId: "tech-contact", option: "option-two", sourceKind: "nounstem", embeddedStem: "cal",
      }),
      techLinked: execute({
        stemId: "tech-contact", option: "option-three", sourceKind: "nounstem", embeddedStem: "cal",
      }),
      techAffective: execute({
        stemId: "tech-contact", option: "option-two", sourceKind: "nounstem", embeddedStem: "cal",
        affective: "honorific",
      }),
      tlanPossessive: execute({ stemId: "tlan-bottom", option: "option-one" }),
      tlanIntegrated: execute({
        stemId: "tlan-bottom", option: "option-two", sourceKind: "body-part-stem", embeddedStem: "īx",
      }),
      tlanNested: execute({
        stemId: "tlan-bottom", option: "option-two", sourceKind: "compound-nounstem", embeddedStem: "īxtzin",
      }),
      tlanLinked: execute({
        stemId: "tlan-bottom", option: "option-three", sourceKind: "nounstem", embeddedStem: "cal",
      }),
      tlanAffective: execute({
        stemId: "tlan-bottom", option: "option-two", sourceKind: "nounstem", embeddedStem: "cal",
        affective: "honorific",
      }),
      tlanDirection: execute({
        stemId: "pa-direction", option: "option-two", sourceKind: "relational-compound", embeddedStem: "tlan",
      }),
      panPossessive: execute({ stemId: "pan-surface-time", option: "option-one" }),
      panIntegrated: execute({
        stemId: "pan-surface-time", option: "option-two", sourceKind: "body-part-stem", embeddedStem: "īx",
      }),
      panNested: execute({
        stemId: "pan-surface-time", option: "option-two", sourceKind: "compound-nounstem", embeddedStem: "ne",
      }),
      panLinked: execute({
        stemId: "pan-surface-time", option: "option-three", sourceKind: "nounstem", embeddedStem: "xāl",
      }),
      panNormal: execute({
        stemId: "pan-surface-time", option: "option-two", sourceKind: "nounstem", embeddedStem: "xō",
        subjectMode: "normal", subjectId: "3common",
      }),
      panAffective: execute({
        stemId: "pan-surface-time", option: "option-two", sourceKind: "nounstem", embeddedStem: "cal",
        affective: "honorific",
      }),
      panDirection: execute({
        stemId: "pa-direction", option: "option-two", sourceKind: "relational-compound", embeddedStem: "pan",
      }),
      panVerbCompound: execute({
        stemId: "pan-surface-time", constructionKind: "compound-embed", option: "option-four",
        sourceKind: "nounstem", targetMatrixStem: "ōhua",
      }),
      associatedPlain: execute({
        stemId: "pan-surface-time", constructionKind: "associated-entity", sourceStem: "cuauhtlah",
        subjectMode: "normal", nounConnector: "tl",
      }),
      associatedCo: execute({
        stemId: "pan-surface-time", constructionKind: "associated-entity", sourceStem: "cuauhtēnco",
        subjectMode: "normal", nounConnector: "tl",
      }),
      pertinencyDirect: execute({
        stemId: "pan-surface-time", constructionKind: "pertinency", sourceStem: "huehcapan",
        pertinencySourceKind: "direct-relational", subjectMode: "normal", nounConnector: "tl",
      }),
    };
    const associatedUpstream = cases.associatedPlain.liveResult;
    cases.pertinencyAssociated = execute({
      stemId: "pan-surface-time", constructionKind: "pertinency",
      pertinencySourceKind: "associated-entity", subjectMode: "normal", nounConnector: "tl",
      upstreamResult: associatedUpstream,
    });

    const rawUntyped = target.evaluateClassicalNahuatlRelationalNnc({
      stemId: "tzalan-between", option: "option-two", embeddedStem: "cal",
    });
    const copiedAssociated = execute({
      stemId: "pan-surface-time", constructionKind: "pertinency",
      pertinencySourceKind: "associated-entity", subjectMode: "normal", nounConnector: "tl",
      upstreamResult: { ...associatedUpstream },
    });
    const wrongOption = execute({
      stemId: "tzalan-between", option: "option-three", sourceKind: "nounstem", embeddedStem: "cal",
    });
    const canonicalRequest = typedRequest({
      stemId: "pan-surface-time", constructionKind: "associated-entity", sourceStem: "cuauhtlah",
      subjectMode: "normal", nounConnector: "tl",
    });
    const canonical = target.evaluateClassicalNahuatlRelationalNnc(canonicalRequest);
    const callerStrings = target.evaluateClassicalNahuatlRelationalNnc({
      ...canonicalRequest,
      lesson: 47,
      formula: "#FORGED#",
      surface: "forged",
      result: "forged",
      translationLabel: "associated with",
      sourceFrame: { kind: "forged" },
      operationFrame: { kind: "forged" },
    });

    const frame = deepFreeze({
      kind: "classical-nahuatl-relational-continuation-validation-frame",
      authorizationStatus: Object.values(cases).every(item => item.canonicalResult)
        ? "authorized"
        : "blocked",
      catalog: {
        optionOneTwoStemIds: ["tzalan-between", "huic-direction"],
        optionOneThreeStemIds: ["ca-means", "icpac-top"],
        optionOneTwoThreeStemIds: ["tech-contact", "tlan-bottom", "pan-surface-time"],
      },
      analyses: {
        icpacSourceHistory: {
          canonicalLinkedFrame: cases.icpacLinked.canonicalResult,
          historicalAnalysisAuthorizesMorphology: false,
          lexicalContrastRequiresTypedSelection: true,
        },
        techAssimilation: {
          canonicalIntegratedFrame: cases.techIntegrated.canonicalResult,
          surfaceAssimilationAuthorizesStructure: false,
        },
        xillanSourceHistory: {
          canonicalTlanFrame: cases.tlanNested.canonicalResult,
          historicalAnalysisAuthorizesMorphology: false,
          lexicalFormationRetained: true,
        },
        panClauseAnalysis: {
          canonicalNestedFrame: cases.panNested.canonicalResult,
          canonicalNormalSubjectFrame: cases.panNormal.canonicalResult,
          translationAuthorizesClauseStructure: false,
        },
        cuitlapanAmbiguity: {
          canonicalIntegratedFrame: cases.panIntegrated.canonicalResult,
          canonicalNestedFrame: cases.panNested.canonicalResult,
          typedStructuralAnalysisRequired: true,
          translationAuthorizesMorphology: false,
        },
        panVerbalContinuation: {
          canonicalSourceFrame: cases.panIntegrated.canonicalResult,
          canonicalCompoundFrame: cases.panVerbCompound.canonicalResult,
          sourceAndContinuationOperationsRemainSeparate: true,
        },
      },
      cases,
      blockedCases: {
        rawUntyped: {
          authorizationStatus: rawUntyped.authorizationStatus,
          diagnostic: rawUntyped.diagnostics?.[0] || "",
        },
        copiedAssociated: {
          authorizationStatus: copiedAssociated.authorizationStatus,
          diagnostic: copiedAssociated.diagnostics?.[0] || "",
        },
        wrongOption: {
          authorizationStatus: wrongOption.authorizationStatus,
          diagnostic: wrongOption.diagnostics?.[0] || "",
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
        sourceAndContinuationOperationsRemainSeparate: true,
        sharedProjectionOwnsGrammar: false,
        sharedProjectionOwnsAtoms: false,
        associatedEntityIsGentilic: false,
        translationAuthorizesMorphology: false,
        historicalAnalysisAuthorizesMorphology: false,
        formulaAuthority: false,
        surfaceAuthority: false,
        lessonMetadataAuthority: false,
        groupingTransfersProof: false,
      },
    });
    ISSUED_VALIDATION_FRAMES.add(frame);
    return frame;
  }

  function isClassicalRelationalContinuationValidationFrame(frame = null) {
    return Boolean(
      ISSUED_VALIDATION_FRAMES.has(frame)
      && frame?.kind === "classical-nahuatl-relational-continuation-validation-frame"
      && frame.authorizationStatus === "authorized"
      && frame.contract?.sharedProjectionOwnsGrammar === false
      && frame.contract?.sharedProjectionOwnsAtoms === false
      && Object.isFrozen(frame)
    );
  }

  return Object.freeze({
    buildClassicalRelationalContinuationValidationFrame,
    isClassicalRelationalContinuationValidationFrame,
  });
}
