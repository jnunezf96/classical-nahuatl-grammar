// Non-authorizing live validation projection for canonical relational NNCs.
// Each semantic owner retains its own spec, atoms, routes, and proof address.

import {
  createClassicalNahuatlNncClosureApi,
} from "./nnc_lessons45_47_closure.mjs?v=20260902-construction-precision-370";

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
      state: Object.hasOwn(request, "state")
        ? request.state
        : option === "option-one" ? "possessive" : "absolutive",
      possessorId: Object.hasOwn(request, "possessorId")
        ? request.possessorId
        : request.stemId === "c-means-purpose-reason-time"
          ? "3common"
          : "1sg",
      subjectMode: request.subjectMode || "adverbialized",
      subjectId: request.subjectId || "3common",
      sentencePosition: request.sentencePosition || "noninitial",
      adjunctorIn: request.adjunctorIn === true,
      dependentClausePresent: request.dependentClausePresent === true,
      negative: request.negative === true,
      numberConnector: request.numberConnector || "",
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
      subjectMode: result?.sourceFrame?.subjectMode || "",
      subjectId: result?.sourceFrame?.subjectId || "",
      possessorId: result?.sourceFrame?.possessorId || "",
      typedPrerequisiteIdentity:
        result?.sourceFrame?.typedPrerequisiteIdentity || "",
      numberBranchId: result?.sourceFrame?.numberBranchId || "",
      lesson12NumberFrame: result?.sourceFrame?.lesson12NumberFrame || null,
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

  function buildClassicalHuanYolquiAbsolutiveLexicalizationConstraint(
    candidateCases = {},
  ) {
    const expected = {
      singular: {
        subjectId: "3sg",
        subjectNumber: "singular",
        num1: "li",
        num2: "0",
        numberBranchId: "absolutive-singular",
        surface: "nohuānyōlli",
        formula: "#Ø-Ø(no-huān-yōl)li-Ø#",
      },
      plural: {
        subjectId: "2pl",
        subjectNumber: "plural",
        num1: "t",
        num2: "in",
        numberBranchId: "absolutive-plural-t-in",
        surface: "annohuānyōltin",
        formula: "#an-Ø(no-huān-yōl)t-in#",
      },
    };
    const branches = Object.fromEntries(Object.entries(expected).map(
      ([branchId, branch]) => {
        const record = candidateCases[branchId] || {};
        const result = record.liveResult || null;
        const sourceFrame = result?.sourceFrame || null;
        const numberFrame = sourceFrame?.lesson12NumberFrame || null;
        const authorized =
          target.isClassicalNahuatlRelationalResult?.(result) === true
          && record.canonicalResult === true
          && record.authorizationStatus === "authorized"
          && result.operationFrame?.operationId
            === "relational-huan-yolqui-absolutive-lexicalization"
          && sourceFrame?.typedPrerequisiteIdentity
            === "classical-huan-yolqui-absolutive-lexicalization"
          && sourceFrame?.sourceKind
            === "typed-relational-plus-nounstem-compound-source"
          && sourceFrame?.state === "absolutive"
          && sourceFrame?.subjectMode === "normal"
          && sourceFrame?.subjectId === branch.subjectId
          && sourceFrame?.possessorId === "1sg"
          && sourceFrame?.innerPossessorId === "1sg"
          && sourceFrame?.numberBranchId === branch.numberBranchId
          && numberFrame?.authorizationStatus === "authorized"
          && numberFrame?.subject === branch.subjectId
          && numberFrame?.subjectNumber === branch.subjectNumber
          && numberFrame?.nounClass === "tli"
          && numberFrame?.stem === "yōl"
          && numberFrame?.num1 === branch.num1
          && numberFrame?.num2 === branch.num2
          && numberFrame?.numberBelongsTo === "subject-personal-pronoun"
          && numberFrame?.numberIsNounInflection === false
          && result.surface === branch.surface
          && result.formula === branch.formula
          && result.formulaDerivedFromWritten === false
          && result.writtenDerivedFromFormula === false;
        return [branchId, {
          authorizationStatus: authorized ? "authorized" : "blocked",
          blockReason: authorized
            ? ""
            : `huan-yolqui-${branchId}-branch-not-proven`,
          subjectId: sourceFrame?.subjectId || "",
          innerPossessorId: sourceFrame?.innerPossessorId || "",
          numberBranchId: sourceFrame?.numberBranchId || "",
          numberDyad: numberFrame
            ? [numberFrame.num1 || "", numberFrame.num2 || ""]
            : [],
          operationId: result?.operationFrame?.operationId || "",
          surface: result?.surface || "",
          formula: result?.formula || "",
          canonicalResult: result,
        }];
      },
    ));
    const authorizationStatus = Object.values(branches).every(
      branch => branch.authorizationStatus === "authorized",
    )
      && branches.singular.canonicalResult
        !== branches.plural.canonicalResult
      && branches.singular.surface !== branches.plural.surface
      && branches.singular.formula !== branches.plural.formula
      ? "authorized"
      : "blocked";
    return deepFreeze({
      kind: "classical-huan-yolqui-absolutive-lexicalization-receipt",
      contractId: "huan-yolqui-absolutive-lexicalization",
      typedPrerequisiteIdentity:
        "classical-huan-yolqui-absolutive-lexicalization",
      authorizationStatus,
      blockReason: authorizationStatus === "authorized"
        ? ""
        : "huan-yolqui-singular-plural-branch-pair-not-proven",
      authority: {
        typedSourceAuthority: true,
        typedOperationAuthority: true,
        canonicalResultAuthority: true,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        lessonMetadataAuthority: false,
      },
      requiredBranchIds: ["singular", "plural"],
      branches,
    });
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
      huanYolquiAbsolutiveSingular: execute({
        stemId: "huan-company",
        option: "option-four",
        constructionKind: "compound-embed",
        sourceKind: "typed-relational-plus-nounstem-compound-source",
        sourceStem: "huān",
        targetMatrixStem: "yōlqui",
        state: "absolutive",
        possessorId: "1sg",
        subjectMode: "normal",
        subjectId: "3sg",
      }),
      huanYolquiAbsolutivePlural: execute({
        stemId: "huan-company",
        option: "option-four",
        constructionKind: "compound-embed",
        sourceKind: "typed-relational-plus-nounstem-compound-source",
        sourceStem: "huān",
        targetMatrixStem: "yōlqui",
        state: "absolutive",
        possessorId: "1sg",
        subjectMode: "normal",
        subjectId: "2pl",
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
    const huanYolquiBase = {
      stemId: "huan-company",
      option: "option-four",
      constructionKind: "compound-embed",
      sourceKind: "typed-relational-plus-nounstem-compound-source",
      sourceStem: "huān",
      targetMatrixStem: "yōlqui",
      state: "absolutive",
      possessorId: "1sg",
      subjectMode: "normal",
      subjectId: "3sg",
    };
    const huanYolquiWrongTarget = target.evaluateClassicalNahuatlRelationalNnc(
      typedRequest({ ...huanYolquiBase, targetMatrixStem: "poh" }),
    );
    const huanYolquiWrongEmbed = target.evaluateClassicalNahuatlRelationalNnc(
      typedRequest({ ...huanYolquiBase, sourceStem: "cal" }),
    );
    const huanYolquiWrongSourceKind =
      target.evaluateClassicalNahuatlRelationalNnc(typedRequest({
        ...huanYolquiBase,
        sourceKind: "possessor",
      }));
    const huanYolquiMissingState =
      target.evaluateClassicalNahuatlRelationalNnc(typedRequest({
        ...huanYolquiBase,
        state: "",
      }));
    const huanYolquiMissingPossessor =
      target.evaluateClassicalNahuatlRelationalNnc(typedRequest({
        ...huanYolquiBase,
        possessorId: "",
      }));
    const huanYolquiPossessiveState =
      target.evaluateClassicalNahuatlRelationalNnc(typedRequest({
        ...huanYolquiBase,
        state: "possessive",
      }));
    const huanYolquiAdverbializedSubject =
      target.evaluateClassicalNahuatlRelationalNnc(typedRequest({
        ...huanYolquiBase,
        subjectMode: "adverbialized",
      }));
    const huanYolquiCallerConnector =
      target.evaluateClassicalNahuatlRelationalNnc(typedRequest({
        ...huanYolquiBase,
        numberConnector: "m-eh",
      }));
    const huanYolquiAbsolutiveLexicalization =
      buildClassicalHuanYolquiAbsolutiveLexicalizationConstraint({
        singular: cases.huanYolquiAbsolutiveSingular,
        plural: cases.huanYolquiAbsolutivePlural,
      });
    const relabeledSimpleHuan =
      buildClassicalHuanYolquiAbsolutiveLexicalizationConstraint({
        singular: cases.huan,
        plural: cases.huan,
      });
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
        && huanYolquiAbsolutiveLexicalization.authorizationStatus
          === "authorized"
        && [
          huanYolquiWrongTarget,
          huanYolquiWrongEmbed,
          huanYolquiWrongSourceKind,
          huanYolquiMissingState,
          huanYolquiMissingPossessor,
          huanYolquiPossessiveState,
          huanYolquiAdverbializedSubject,
          huanYolquiCallerConnector,
        ].every(result => result.authorizationStatus === "blocked")
        && relabeledSimpleHuan.authorizationStatus === "blocked"
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
      constraints: {
        huanYolquiAbsolutiveLexicalization,
      },
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
        huanYolquiWrongTarget: {
          authorizationStatus: huanYolquiWrongTarget.authorizationStatus,
          diagnostic: huanYolquiWrongTarget.diagnostics?.[0] || "",
        },
        huanYolquiWrongEmbed: {
          authorizationStatus: huanYolquiWrongEmbed.authorizationStatus,
          diagnostic: huanYolquiWrongEmbed.diagnostics?.[0] || "",
        },
        huanYolquiWrongSourceKind: {
          authorizationStatus: huanYolquiWrongSourceKind.authorizationStatus,
          diagnostic: huanYolquiWrongSourceKind.diagnostics?.[0] || "",
        },
        huanYolquiMissingState: {
          authorizationStatus: huanYolquiMissingState.authorizationStatus,
          diagnostic: huanYolquiMissingState.diagnostics?.[0] || "",
        },
        huanYolquiMissingPossessor: {
          authorizationStatus: huanYolquiMissingPossessor.authorizationStatus,
          diagnostic: huanYolquiMissingPossessor.diagnostics?.[0] || "",
        },
        huanYolquiPossessiveState: {
          authorizationStatus: huanYolquiPossessiveState.authorizationStatus,
          diagnostic: huanYolquiPossessiveState.diagnostics?.[0] || "",
        },
        huanYolquiAdverbializedSubject: {
          authorizationStatus:
            huanYolquiAdverbializedSubject.authorizationStatus,
          diagnostic:
            huanYolquiAdverbializedSubject.diagnostics?.[0] || "",
        },
        huanYolquiCallerConnector: {
          authorizationStatus: huanYolquiCallerConnector.authorizationStatus,
          diagnostic: huanYolquiCallerConnector.diagnostics?.[0] || "",
        },
        relabeledSimpleHuan: {
          authorizationStatus: relabeledSimpleHuan.authorizationStatus,
          diagnostic: relabeledSimpleHuan.blockReason,
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
    buildClassicalHuanYolquiAbsolutiveLexicalizationConstraint,
    isClassicalRelationalNncValidationFrame,
  });
}
