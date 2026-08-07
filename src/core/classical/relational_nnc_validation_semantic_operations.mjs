// Non-authorizing live validation projection for canonical relational NNCs.
// Each semantic owner retains its own spec, atoms, routes, and proof address.

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
    throw new Error(`relational-validation-runtime-capability-required:${name}`);
  }
}

export function createClassicalRelationalNncValidationSemanticOperationsApi(
  targetObject = globalThis,
) {
  const inheritedTarget = targetObject && typeof targetObject === "object"
    ? targetObject
    : globalThis;
  const target = Object.create(inheritedTarget);
  Object.defineProperties(
    target,
    Object.getOwnPropertyDescriptors(
      createClassicalNahuatlNncClosureApi(target),
    ),
  );

  function typedRequest(request = {}) {
    const inventory = target.getClassicalNahuatlRelationalStemInventory();
    const stem = inventory.find(candidate => candidate.stemId === request.stemId);
    if (!stem) return request;
    const option = request.option || "option-one";
    const constructionKind = request.constructionKind || "relational-nnc";
    const sourceKind = request.sourceKind
      || (option === "option-one" ? "possessor" : stem.allowedSourceKinds[0] || "nounstem");
    const sourceEmbedStem = request.embeddedStem || "cal";
    const sourceMatrixStem = option === "option-one"
      ? stem.classicalMatrix
      : request.sourceMatrixStem || stem.classicalMatrix;
    return {
      state: request.state || (option === "option-one" ? "possessive" : "absolutive"),
      possessorId: request.possessorId
        || (request.stemId === "c-means-purpose-reason-time" ? "3common" : "1sg"),
      subjectMode: request.subjectMode || "adverbialized",
      subjectId: request.subjectId || "3common",
      sentencePosition: request.sentencePosition || "noninitial",
      adjunctorIn: request.adjunctorIn === true,
      dependentClausePresent: request.dependentClausePresent === true,
      negative: request.negative === true,
      nounstem: {
        kind: target.CLASSICAL_NAHUATL_NNC_NOUNSTEM_REQUEST_KIND,
        stemId: request.stemId,
        formation: option,
        operation: constructionKind,
        sourceKind,
        sourceFormation: request.formationId || "plain-nounstem",
        sourceVoice: request.sourceVoice || "active",
        sourceMode: constructionKind === "relational-nnc"
          ? option === "option-one" ? "whole-stem" : "embed-matrix"
          : "",
        sourceStem: option === "option-one"
          ? sourceMatrixStem
          : request.sourceStem || sourceEmbedStem,
        sourceEmbedStem: constructionKind === "relational-nnc" && option !== "option-one"
          ? sourceEmbedStem
          : "",
        sourceMatrixStem: constructionKind === "relational-nnc" ? sourceMatrixStem : "",
        downstreamTargetStem: request.targetMatrixStem || "",
        affective: request.affective || "none",
        sourceLexemeId: request.sourceLexemeId || "",
        lexicalExceptionId: request.lexicalExceptionId || "",
        relationalFunction: request.relationalFunction || "",
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
      sourceState: result?.sourceState || "",
      predicateState: result?.predicateState || "",
      relationalKind: result?.relationalKind || "",
      sourceKind: result?.sourceFrame?.sourceKind || "",
      operationId: result?.operationFrame?.operationId || "",
      operationTrace: result?.operationFrame?.operationTrace || [],
      predicateStem: result?.predicateStem || "",
      formula: result?.formula || "",
      surface: result?.surface || "",
      selectedAxisIds: result?.leastCommonMultiple?.selectedAxisIds || [],
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

  function buildClassicalRelationalNncValidationFrame() {
    for (const capability of [
      "evaluateClassicalNahuatlRelationalNnc",
      "isClassicalNahuatlRelationalResult",
      "isClassicalNahuatlRelationalNncGrammarFrame",
      "getClassicalNahuatlRelationalStemInventory",
    ]) assertRuntime(target, capability);

    const inventory = target.getClassicalNahuatlRelationalStemInventory();
    const lcm = target.CLASSICAL_NAHUATL_LESSONS45_47_LCM;
    const cases = {
      relationalCore: execute({ stemId: "pan-surface-time", option: "option-one" }),
      translationBoundary: execute({ stemId: "tloc-proximity", option: "option-one" }),
      contextRoles: execute({ stemId: "pan-surface-time", option: "option-one" }),
      supplementaryPossessor: execute({ stemId: "tloc-proximity", option: "option-one" }),
      affective: execute({
        stemId: "pan-surface-time",
        option: "option-one",
        affective: "honorific",
      }),
      optionOne: execute({ stemId: "huan-company", option: "option-one" }),
      optionTwo: execute({
        stemId: "tlan-bottom",
        option: "option-two",
        sourceKind: "nounstem",
        embeddedStem: "cal",
      }),
      optionThree: execute({
        stemId: "icpac-top",
        option: "option-three",
        sourceKind: "nounstem",
        embeddedStem: "tlāl",
      }),
      optionFour: execute({
        stemId: "huan-company",
        option: "option-four",
        constructionKind: "compound-embed",
        sourceKind: "possessor",
        targetMatrixStem: "poh",
      }),
      huan: execute({ stemId: "huan-company", option: "option-one" }),
      huanReciprocal: execute({
        stemId: "huan-company",
        option: "option-one",
        possessorId: "reciprocal",
      }),
      tloc: execute({ stemId: "tloc-proximity", option: "option-one" }),
      pal: execute({ stemId: "pal-favor", option: "option-one" }),
      ic: execute({
        stemId: "c-means-purpose-reason-time",
        option: "option-one",
        possessorId: "3common",
      }),
      icMeans: execute({
        stemId: "c-means-purpose-reason-time",
        option: "option-one",
        possessorId: "3common",
        relationalFunction: "means",
      }),
      icPurpose: execute({
        stemId: "c-means-purpose-reason-time",
        option: "option-one",
        possessorId: "3common",
        relationalFunction: "purpose",
      }),
      icReason: execute({
        stemId: "c-means-purpose-reason-time",
        option: "option-one",
        possessorId: "3common",
        relationalFunction: "reason",
      }),
      icTime: execute({
        stemId: "c-means-purpose-reason-time",
        option: "option-one",
        possessorId: "3common",
        relationalFunction: "time",
      }),
      icInitial: execute({
        stemId: "c-means-purpose-reason-time",
        option: "option-one",
        possessorId: "3common",
        relationalFunction: "time",
        sentencePosition: "initial",
      }),
      icFusedIn: execute({
        stemId: "c-means-purpose-reason-time",
        option: "option-one",
        possessorId: "3common",
        relationalFunction: "time",
        sentencePosition: "initial",
        adjunctorIn: true,
        dependentClausePresent: false,
      }),
      icSeparatedIn: execute({
        stemId: "c-means-purpose-reason-time",
        option: "option-one",
        possessorId: "3common",
        relationalFunction: "time",
        sentencePosition: "initial",
        adjunctorIn: true,
        dependentClausePresent: true,
      }),
      icNoninitial: execute({
        stemId: "c-means-purpose-reason-time",
        option: "option-one",
        possessorId: "3common",
        relationalFunction: "time",
        sentencePosition: "noninitial",
      }),
      icNegative: execute({
        stemId: "c-means-purpose-reason-time",
        option: "option-one",
        possessorId: "3common",
        relationalFunction: "time",
        sentencePosition: "initial",
        negative: true,
      }),
      icOrdinal: execute({
        stemId: "c-means-purpose-reason-time",
        option: "option-one",
        possessorId: "3common",
        relationalFunction: "ordinal",
      }),
      icAdverbial: execute({
        stemId: "c-means-purpose-reason-time",
        option: "option-one",
        possessorId: "3common",
        relationalFunction: "adverbial",
      }),
      icDegree: execute({
        stemId: "c-means-purpose-reason-time",
        option: "option-one",
        possessorId: "3common",
        relationalFunction: "degree",
      }),
      icMeasurement: execute({
        stemId: "c-means-purpose-reason-time",
        option: "option-one",
        possessorId: "3common",
        relationalFunction: "measurement",
      }),
    };

    const rawUntyped = target.evaluateClassicalNahuatlRelationalNnc({
      stemId: "huan-company",
      option: "option-one",
      sourceKind: "possessor",
      possessorId: "1sg",
    });
    const wrongOption = target.evaluateClassicalNahuatlRelationalNnc(typedRequest({
      stemId: "huan-company",
      option: "option-two",
      sourceKind: "nounstem",
      embeddedStem: "cal",
    }));
    const wrongFixedPossessor = target.evaluateClassicalNahuatlRelationalNnc(typedRequest({
      stemId: "c-means-purpose-reason-time",
      option: "option-one",
      possessorId: "1sg",
    }));
    const canonicalRequest = typedRequest({
      stemId: "tlan-bottom",
      option: "option-two",
      sourceKind: "nounstem",
      embeddedStem: "cal",
    });
    const canonical = target.evaluateClassicalNahuatlRelationalNnc(canonicalRequest);
    const hostile = target.evaluateClassicalNahuatlRelationalNnc({
      ...canonicalRequest,
      lesson: 999,
      formula: "#FORGED#",
      surface: "forged",
      result: "forged",
      translationLabel: "under",
      sourceFrame: { kind: "forged" },
      operationFrame: { kind: "forged" },
    });

    const frame = deepFreeze({
      kind: "classical-nahuatl-relational-nnc-validation-frame",
      authorizationStatus: Object.values(cases).every(item => item.canonicalResult)
        ? "authorized"
        : "blocked",
      catalog: {
        stemCount: inventory.length,
        uniqueStemCount: new Set(inventory.map(stem => stem.stemId)).size,
        optionGroups: [...new Set(inventory.map(stem => stem.optionGroup))].sort(),
        axisCount: lcm?.axes?.length || 0,
        uniqueAxisCount: new Set((lcm?.axes || []).map(axis => axis.axisId)).size,
        axisIds: (lcm?.axes || []).map(axis => axis.axisId),
        sourceCategory: lcm?.sourceCategory || "",
        derivedLexicalClasses: lcm?.derivedLexicalClasses || [],
      },
      cases,
      blockedCases: {
        rawUntyped: {
          authorizationStatus: rawUntyped.authorizationStatus,
          diagnostic: rawUntyped.diagnostics?.[0] || "",
        },
        wrongOption: {
          authorizationStatus: wrongOption.authorizationStatus,
          diagnostic: wrongOption.diagnostics?.[0] || "",
        },
        wrongFixedPossessor: {
          authorizationStatus: wrongFixedPossessor.authorizationStatus,
          diagnostic: wrongFixedPossessor.diagnostics?.[0] || "",
        },
        callerStringsIgnored: {
          canonicalMatchesHostile:
            canonical.formula === hostile.formula
            && canonical.surface === hostile.surface
            && canonical.predicateStem === hostile.predicateStem,
          callerSuppliedAuthorityAccepted: hostile.callerSuppliedAuthorityAccepted,
          formulaStringAuthority: hostile.formulaStringAuthority,
          surfaceStringAuthority: hostile.surfaceStringAuthority,
          lessonMetadataAuthority: hostile.lessonMetadataAuthority,
        },
      },
      contract: {
        sourceAndRelationalOperationsRemainSeparate: true,
        sharedProjectionOwnsGrammar: false,
        sharedProjectionOwnsAtoms: false,
        translationPrepositionAuthorizesMorphology: false,
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

  function isClassicalRelationalNncValidationFrame(frame = null) {
    return Boolean(
      ISSUED_VALIDATION_FRAMES.has(frame)
      && frame?.kind === "classical-nahuatl-relational-nnc-validation-frame"
      && frame.authorizationStatus === "authorized"
      && frame.contract?.sharedProjectionOwnsGrammar === false
      && frame.contract?.sharedProjectionOwnsAtoms === false
      && Object.isFrozen(frame)
    );
  }

  return Object.freeze({
    buildClassicalRelationalNncValidationFrame,
    isClassicalRelationalNncValidationFrame,
  });
}
