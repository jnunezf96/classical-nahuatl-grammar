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
    const sourceComposition = request.sourceComposition || null;
    const sourceEmbedStem = sourceComposition ? "" : request.embeddedStem || "";
    const sourceMatrixStem = relationalNnc
      ? sourceComposition ? "" : request.sourceMatrixStem || stem.classicalMatrix
      : "";
    const sourceStem = relationalNnc
      ? sourceComposition
        ? ""
        : option === "option-one"
          ? sourceMatrixStem
          : request.sourceStem || sourceEmbedStem
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
        sourceComposition,
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
      sourceCompositionFrame:
        result?.sourceFrame?.sourceCompositionFrame || null,
      affective: result?.sourceFrame?.affective || "none",
      sourceState: result?.sourceState || "",
      subjectMode: result?.formulaSlots?.subjectMode || "",
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

  function sourceStemNode(stem) {
    return {
      kind:
        target.CLASSICAL_NAHUATL_RELATIONAL_SOURCE_COMPOSITION_STEM_NODE_KIND,
      stem,
    };
  }

  function sourceCompoundNode(embed, matrix) {
    return {
      kind:
        target.CLASSICAL_NAHUATL_RELATIONAL_SOURCE_COMPOSITION_COMPOUND_NODE_KIND,
      embed,
      matrix,
    };
  }

  function sourceComposition(embed, matrix) {
    return {
      kind: target.CLASSICAL_NAHUATL_RELATIONAL_SOURCE_COMPOSITION_REQUEST_KIND,
      embed,
      matrix,
    };
  }

  function buildExactSourceCompositionBranch(record = {}, expected = {}) {
    const frame = record.sourceCompositionFrame;
    const exactSurface = String(frame?.surface || "").replace(/-/gu, "");
    const expectedFormula = frame?.surface
      ? `#Ø-Ø(${frame.surface})Ø-Ø#`
      : "";
    const authorized = record.authorizationStatus === "authorized"
      && record.canonicalResult === true
      && target.isClassicalNahuatlRelationalResult?.(record.liveResult) === true
      && target.isClassicalNahuatlRelationalSourceCompositionFrame?.(frame)
        === true
      && record.typedSourceAuthority === true
      && record.typedOperationAuthority === true
      && record.operationId
        === "relational-option-two-typed-source-composition"
      && record.sourceKind === expected.sourceKind
      && frame.licenseId === expected.licenseId
      && frame.branchId === expected.branchId
      && frame.compositionSignature === expected.compositionSignature
      && record.predicateSegments.length === expected.segmentCount
      && record.predicateSegments.every(segment => (
        String(segment.compositionPath || "").startsWith("root.")
        && ["embed", "matrix"].includes(segment.compositionRole)
      ))
      && record.predicateStem === exactSurface
      && record.surface === exactSurface
      && record.formula === expectedFormula;
    return deepFreeze({
      branchId: expected.branchId,
      authorizationStatus: authorized ? "authorized" : "blocked",
      blockReason: authorized
        ? ""
        : "exact-typed-recursive-source-composition-not-proven",
      compositionSignature: frame?.compositionSignature || "",
      sourceSurface: frame?.surface || "",
      resultSurface: record.surface || "",
      formula: record.formula || "",
      canonicalParentResult: authorized ? record.liveResult : null,
      canonicalParentResultKind: authorized
        ? record.liveResult?.kind || ""
        : "",
      typedSourceAuthority: authorized,
      typedOperationAuthority: authorized,
      canonicalResultAuthority: authorized,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
  }

  function buildClassicalTechEmbedPaCopaMatrixPair(candidateCases = {}) {
    const expectedBranches = [
      {
        branchId: "tech-plus-pa",
        caseId: "techPaMatrix",
        sourceKind: "relational-compound",
        licenseId: "tech-embed-pa-copa-matrices",
        compositionSignature: "(tech>pa)",
        segmentCount: 2,
      },
      {
        branchId: "tech-plus-copa",
        caseId: "techCopaMatrix",
        sourceKind: "relational-compound",
        licenseId: "tech-embed-pa-copa-matrices",
        compositionSignature: "(tech>(co>pa))",
        segmentCount: 3,
      },
    ];
    const branches = expectedBranches.map(expected => (
      buildExactSourceCompositionBranch(
        candidateCases[expected.caseId] || {},
        expected,
      )
    ));
    const authorizationStatus = branches.every(
      branch => branch.authorizationStatus === "authorized",
    ) && branches[0].compositionSignature !== branches[1].compositionSignature
      ? "authorized"
      : "blocked";
    return deepFreeze({
      kind: "classical-tech-embed-pa-copa-matrices-receipt",
      contractId: "tech-embed-pa-copa-matrices",
      authorizationStatus,
      blockReason: authorizationStatus === "authorized"
        ? ""
        : "tech-embed-pa-copa-matrix-pair-not-proven",
      typedPrerequisiteIdentity: "classical-tech-embed-pa-copa-matrices",
      branches,
      typedSourceAuthority: authorizationStatus === "authorized",
      typedOperationAuthority: authorizationStatus === "authorized",
      canonicalResultAuthority: authorizationStatus === "authorized",
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
  }

  function buildClassicalTlanNestedBodypartMatrixChoice(candidateCases = {}) {
    const expectedBranches = [
      {
        branchId: "inner-matrix-ix",
        caseId: "tlanNestedIxMatrix",
        sourceKind: "compound-nounstem",
        licenseId: "tlan-nested-bodypart-matrix-choice",
        compositionSignature: "((cal>īx)>tlan)",
        segmentCount: 3,
      },
      {
        branchId: "inner-matrix-tzin",
        caseId: "tlanNestedTzinMatrix",
        sourceKind: "compound-nounstem",
        licenseId: "tlan-nested-bodypart-matrix-choice",
        compositionSignature: "((cuauh>tzīn)>tlan)",
        segmentCount: 3,
      },
    ];
    const branches = expectedBranches.map(expected => (
      buildExactSourceCompositionBranch(
        candidateCases[expected.caseId] || {},
        expected,
      )
    ));
    const authorizationStatus = branches.every(
      branch => branch.authorizationStatus === "authorized",
    ) && branches[0].compositionSignature !== branches[1].compositionSignature
      ? "authorized"
      : "blocked";
    return deepFreeze({
      kind: "classical-tlan-nested-bodypart-matrix-choice-receipt",
      contractId: "tlan-nested-bodypart-matrix-choice",
      authorizationStatus,
      blockReason: authorizationStatus === "authorized"
        ? ""
        : "tlan-nested-bodypart-matrix-choice-not-proven",
      typedPrerequisiteIdentity:
        "classical-tlan-nested-bodypart-matrix-choice",
      branches,
      typedSourceAuthority: authorizationStatus === "authorized",
      typedOperationAuthority: authorizationStatus === "authorized",
      canonicalResultAuthority: authorizationStatus === "authorized",
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
  }

  function buildClassicalIcpacAffectiveFinalCoPair(candidateCases = {}) {
    const expected = {
      honorific: { caseId: "icpacAffective", morpheme: "tzin" },
      pejorative: {
        caseId: "icpacAffectivePejorative",
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
        ? "" : "icpac-affective-tzin-ton-final-co-pair-not-proven",
      branches,
    });
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
      icpacAffectivePejorative: execute({
        stemId: "icpac-top", option: "option-three", sourceKind: "nounstem", embeddedStem: "tlāl",
        affective: "pejorative",
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
      techPaMatrix: execute({
        stemId: "pa-direction",
        option: "option-two",
        sourceKind: "relational-compound",
        sourceComposition: sourceComposition(
          sourceStemNode("tech"),
          sourceStemNode("pa"),
        ),
      }),
      techCopaMatrix: execute({
        stemId: "pa-direction",
        option: "option-two",
        sourceKind: "relational-compound",
        sourceComposition: sourceComposition(
          sourceStemNode("tech"),
          sourceCompoundNode(sourceStemNode("co"), sourceStemNode("pa")),
        ),
      }),
      tlanPossessive: execute({ stemId: "tlan-bottom", option: "option-one" }),
      tlanIntegrated: execute({
        stemId: "tlan-bottom", option: "option-two", sourceKind: "body-part-stem", embeddedStem: "īx",
      }),
      tlanNested: execute({
        stemId: "tlan-bottom", option: "option-two", sourceKind: "compound-nounstem", embeddedStem: "īxtzin",
      }),
      tlanNestedIxMatrix: execute({
        stemId: "tlan-bottom",
        option: "option-two",
        sourceKind: "compound-nounstem",
        sourceComposition: sourceComposition(
          sourceCompoundNode(sourceStemNode("cal"), sourceStemNode("īx")),
          sourceStemNode("tlan"),
        ),
      }),
      tlanNestedTzinMatrix: execute({
        stemId: "tlan-bottom",
        option: "option-two",
        sourceKind: "compound-nounstem",
        sourceComposition: sourceComposition(
          sourceCompoundNode(
            sourceStemNode("cuauh"),
            sourceStemNode("tzīn"),
          ),
          sourceStemNode("tlan"),
        ),
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
      constraints: {
        icpacAffectiveFinalCoPair:
          buildClassicalIcpacAffectiveFinalCoPair(cases),
        techEmbedPaCopaMatrixPair:
          buildClassicalTechEmbedPaCopaMatrixPair(cases),
        tlanNestedBodypartMatrixChoice:
          buildClassicalTlanNestedBodypartMatrixChoice(cases),
      },
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
    buildClassicalIcpacAffectiveFinalCoPair,
    buildClassicalTechEmbedPaCopaMatrixPair,
    buildClassicalTlanNestedBodypartMatrixChoice,
    buildClassicalRelationalContinuationValidationFrame,
    isClassicalRelationalContinuationValidationFrame,
  });
}
