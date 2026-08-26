// Non-authorizing live validation projection for the canonical adverbial-NNC
// engine. Owner specs select assertions from this frame; this module owns no
// grammar, Canvas atom, route, or receipt.

import {
  installClassicalNahuatlAdverbialNuclearGlobals,
} from "./adverbial_nuclear_grammar.mjs?v=20260825-class-d-336";

const ISSUED_VALIDATION_FRAMES = new WeakSet();

function deepFreeze(value) {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  Object.values(value).forEach(deepFreeze);
  return Object.freeze(value);
}

function assertRuntime(target, name) {
  if (typeof target?.[name] !== "function") {
    throw new Error(`adverbial-validation-runtime-capability-required:${name}`);
  }
}

function summarize(target, record, potential, result) {
  return deepFreeze({
    authorizationStatus: result?.authorizationStatus || "blocked",
    blockReason: result?.blockReason || "",
    canonicalResult: target.isClassicalNahuatlAdverbialNuclearResult?.(result) === true,
    typedPotential: target.isClassicalNahuatlAdverbialPotentialFrame?.(potential) === true,
    typedSourceAuthority: potential?.typedSourceAuthority === true,
    lexicalAuthorization: potential?.lexicalAuthorization === true,
    lexicalEntryId: result?.lexicalEntryId || record?.id || "",
    family: record?.family || "",
    clauseKind: record?.clauseKind || "",
    degree: result?.operationFrame?.degree || "",
    scope: result?.operationFrame?.scope || result?.scope || "",
    semanticDomain: result?.operationFrame?.semanticDomain || record?.domain || "",
    sourceKind: result?.operationFrame?.sourceKind || record?.sourceKind || "",
    lexicalStatus: record?.lexicalStatus || "",
    lexicalReadings: [...(record?.lexicalReadings || [])],
    sourceAnalysis: record?.sourceAnalysis || null,
    compositionalReading: record?.compositionalReading || "",
    numberSystem: record?.numberSystem || null,
    subjectOperationId: result?.operationFrame?.subjectOperationFrame?.operationId || "",
    operationKind: result?.operationFrame?.kind || "",
    formulaRealization: result?.formulaRealization || "",
    wordSurface: result?.wordSurface || "",
    sentenceSurface: result?.sentenceSurface || "",
    context: result?.operationFrame?.contextFrame || null,
    incorporation: result?.canonicalTargetEvaluator
      ? {
        canonicalTargetEvaluator: result.canonicalTargetEvaluator,
        canonicalResult: result.canonicalResult || null,
      }
      : null,
    formulaGeneratedIndependently:
      result?.formulaProjection?.derivedIndependentlyFromWrittenProjection === true,
    writtenGeneratedIndependently:
      result?.writtenProjection?.derivedIndependentlyFromFormulaProjection === true,
    formulaStringAuthority: result?.formulaStringAuthority === false,
    surfaceStringAuthority: result?.surfaceStringAuthority === false,
    lessonMetadataAuthority: result?.lessonMetadataAuthorizesOutput === false,
    liveResult: result,
  });
}

export function createClassicalAdverbialNuclearValidationSemanticOperationsApi(
  targetObject = globalThis,
) {
  const inheritedTarget = targetObject && typeof targetObject === "object"
    ? targetObject
    : globalThis;
  const target = Object.create(inheritedTarget);
  installClassicalNahuatlAdverbialNuclearGlobals(target);

  function executeRecord(sourceId, operation = {}) {
    const records = target.listClassicalNahuatlLesson44SourceRecords();
    const record = records.find(candidate => candidate.id === sourceId) || null;
    if (!record) throw new Error(`adverbial-validation-source-required:${sourceId}`);
    const potential = target.resolveClassicalNahuatlAdverbialPotential({
      stem: record.sourceForms[0],
      clauseKind: record.clauseKind,
    });
    const context = {
      ...(record.requiredPrecedingParticles?.length
        ? { precedingParticle: record.requiredPrecedingParticles[0] }
        : {}),
      ...(operation.context || {}),
    };
    const result = target.evaluateClassicalNahuatlAdverbialNuclear({
      adverbialPotentialFrame: potential,
      ...operation,
      ...(Object.keys(context).length ? { context } : {}),
    });
    return summarize(target, record, potential, result);
  }

  function executeProductivePreterit() {
    const prerequisite = target.requestClassicalDeverbalNncResult({
      constructionKind: "predicate-nominalization",
      nominalizationKind: "preterit-agentive",
      source: {
        sourceStem: "pāc",
        sourceStage: "preterit-predicate",
        sourceVoice: "active",
        sourceValence: "intransitive",
        sourceObjectPattern: "none",
        verbClass: "A",
      },
      subject: "3sg",
      state: "absolutive",
      animacy: "animate",
    });
    const potential = target.resolveClassicalNahuatlAdverbialPotential({
      preteritAgentiveFrame: prerequisite,
    });
    const result = target.evaluateClassicalNahuatlAdverbialNuclear({
      adverbialPotentialFrame: potential,
    });
    return deepFreeze({
      ...summarize(target, null, potential, result),
      prerequisiteAuthorizationStatus: prerequisite?.authorizationStatus || "blocked",
      prerequisiteOwnerValidated:
        target.isClassicalNahuatlDeverbalNncGrammarFrame?.(prerequisite) === true,
      prerequisiteOperationId: prerequisite?.operationFrame?.operationId || "",
    });
  }

  function buildClassicalAdverbialNuclearValidationFrame() {
    for (const capability of [
      "listClassicalNahuatlLesson44SourceRecords",
      "resolveClassicalNahuatlAdverbialPotential",
      "isClassicalNahuatlAdverbialPotentialFrame",
      "evaluateClassicalNahuatlAdverbialNuclear",
      "isClassicalNahuatlAdverbialNuclearResult",
      "getClassicalNahuatlLcm",
    ]) assertRuntime(target, capability);

    const lcm = target.getClassicalNahuatlLcm();
    const records = target.listClassicalNahuatlLesson44SourceRecords();
    const cases = {
      overview: executeRecord("44.3-cencah"),
      firstDegree: executeRecord("44.4-cemilhuitl"),
      secondDegree: executeRecord("44.4-cenyohoal"),
      vncLexical: executeRecord("44.3-cencah"),
      vncCollocation: executeRecord("44.3-iyoh"),
      vncContrast: executeRecord("44.3-iuh"),
      vncIzContrast: executeRecord("44.3-iz"),
      vncObsolete: executeRecord("44.3-ihuihuih"),
      vncConjectural: executeRecord("44.3-nohmah"),
      connectiveVnc: executeRecord("44.3-motquiticah"),
      nncFirst: executeRecord("44.4-cemilhuitl"),
      nncTequitl: executeRecord("44.4-tequitl"),
      nncPossessiveFirst: executeRecord("44.4-inchān"),
      nncSecond: executeRecord("44.4-cenyohoal"),
      nncDerived: executeRecord("44.4-cecenyohual"),
      particleNel: executeRecord("44.5-nel"),
      particleHuel: executeRecord("44.5-huel", {
        context: { negativeParticle: "ah", negationScope: "adverbial-adjunct" },
      }),
      particleNen: executeRecord("44.5-nen"),
      particleMoQuestion: executeRecord("44.5-mo", {
        context: { clauseType: "question", sentencePosition: "initial" },
      }),
      particleMoNegative: executeRecord("44.5-mo", {
        context: { negativeParticle: "ca", negationScope: "adverbial-adjunct" },
      }),
      particleMoSubordinate: executeRecord("44.5-mo", {
        context: { clauseType: "subordinate" },
      }),
      particleCuel: executeRecord("44.5-cuel"),
      particleMach: executeRecord("44.5-mach", { context: { stressPartner: "eh" } }),
      particleQuenInitial: executeRecord("44.5-quen", {
        context: { sentencePosition: "initial" },
      }),
      particleQuenNoninitial: executeRecord("44.5-quen", {
        context: { sentencePosition: "noninitial" },
      }),
      otherTime: executeRecord("44.6-moztla"),
      otherPlace: executeRecord("44.6-pani"),
      otherManner: executeRecord("44.6-tlamach"),
      otherNoncuah: executeRecord("44.6-noncuah"),
      otherIxtlapal: executeRecord("44.6-ixtlapal"),
      otherTlacuauh: executeRecord("44.6-tlacuauh"),
      otherTlapic: executeRecord("44.6-tlapic"),
      stressGroup: executeRecord("44.6-moztla", { context: { stressPartner: "eh" } }),
      uncertainCollocation: executeRecord("44.6-ilhuiz", { context: { stressPartner: "eh" } }),
      preteritProductive: executeProductivePreterit(),
      preteritRegular: executeRecord("44.7-pacca"),
      preteritObsolete: executeRecord("44.7-ohhuihca"),
      preteritRootYa: executeRecord("44.7-ahhuiaca"),
      preteritFullStem: executeRecord("44.7-yocoxca"),
      preteritIrregular: executeRecord("44.7-ichtaca"),
      preteritTransitive: executeRecord("44.7-tlacemanca"),
      preteritReflexiveShuntline: executeRecord("44.7-nehmatca"),
      preteritReflexiveMainline: executeRecord("44.7-mihmatca"),
      possessiveActive: executeRecord("44.8-iyohca"),
      possessivePatientive: executeRecord("44.8-nonohmah"),
      possessiveAction: executeRecord("44.8-nonohmatca"),
      incorporation: executeRecord("44.5-nen", {
        scope: "incorporated-predicate",
        matrix: { stem: "cochi", verbClass: "B", valence: "intransitive" },
      }),
      incorporationPani: executeRecord("44.6-pani", {
        scope: "incorporated-predicate",
        matrix: { stem: "cochi", verbClass: "B", valence: "intransitive" },
      }),
      compoundNal: executeRecord("44.9-nal", {
        scope: "incorporated-predicate",
        matrix: { stem: "cochi", verbClass: "B", valence: "intransitive" },
      }),
      compoundNepan: executeRecord("44.9-nepan", {
        scope: "incorporated-predicate",
        matrix: { stem: "cochi", verbClass: "B", valence: "intransitive" },
      }),
    };

    const copiedPotential = { ...target.resolveClassicalNahuatlAdverbialPotential({
      stem: "cencah",
      clauseKind: "vnc",
    }) };
    const copiedPotentialResult = target.evaluateClassicalNahuatlAdverbialNuclear({
      adverbialPotentialFrame: copiedPotential,
    });
    const validPotential = target.resolveClassicalNahuatlAdverbialPotential({
      stem: "cencah",
      clauseKind: "vnc",
    });
    const storedSurfaceResult = target.evaluateClassicalNahuatlAdverbialNuclear({
      adverbialPotentialFrame: validPotential,
      resultSurface: "forged",
    });
    const wrongDegreePotential = target.resolveClassicalNahuatlAdverbialPotential({
      stem: "cencah",
      clauseKind: "vnc",
    });
    const wrongDegreeResult = target.evaluateClassicalNahuatlAdverbialNuclear({
      adverbialPotentialFrame: wrongDegreePotential,
      degree: "second-degree",
    });
    const compoundOnlyPotential = target.resolveClassicalNahuatlAdverbialPotential({
      stem: "nal",
      clauseKind: "nnc-absolutive",
    });
    const compoundOnlyExternal = target.evaluateClassicalNahuatlAdverbialNuclear({
      adverbialPotentialFrame: compoundOnlyPotential,
      scope: "external-clause",
    });

    const frame = deepFreeze({
      kind: "classical-nahuatl-adverbial-nuclear-validation-frame",
      authorizationStatus: Object.values(cases).every(item => item.canonicalResult)
        ? "authorized"
        : "blocked",
      catalog: {
        canonicalLcm: target.isClassicalNahuatlLcm?.(lcm) === true,
        sourceRecordCount: records.length,
        completeLicensedInventory: lcm?.completeLicensedInventory === true,
        sourceClauseKinds: lcm?.axes?.sourceClauseKinds || [],
        degrees: lcm?.axes?.adverbialDegrees || [],
        domains: lcm?.axes?.semanticDomains || [],
        families: lcm?.axes?.constructionFamilies || [],
      },
      cases,
      blockedCases: {
        copiedPotential: {
          authorizationStatus: copiedPotentialResult.authorizationStatus,
          blockReason: copiedPotentialResult.blockReason,
        },
        storedSurface: {
          authorizationStatus: storedSurfaceResult.authorizationStatus,
          blockReason: storedSurfaceResult.blockReason,
        },
        vncSecondDegree: {
          authorizationStatus: wrongDegreeResult.authorizationStatus,
          blockReason: wrongDegreeResult.blockReason,
        },
        compoundOnlyExternal: {
          authorizationStatus: compoundOnlyExternal.authorizationStatus,
          blockReason: compoundOnlyExternal.blockReason,
        },
      },
      contract: {
        sourceAndAdverbialOperationsRemainSeparate: true,
        sharedProjectionOwnsGrammar: false,
        sharedProjectionOwnsAtoms: false,
        formulaAuthority: false,
        surfaceAuthority: false,
        translationAuthority: false,
        exampleAuthority: false,
        lessonMetadataAuthority: false,
        traditionalSpellingAuthority: false,
        uncertaintyAuthorizesGrammar: false,
      },
    });
    ISSUED_VALIDATION_FRAMES.add(frame);
    return frame;
  }

  function isClassicalAdverbialNuclearValidationFrame(frame = null) {
    return Boolean(
      ISSUED_VALIDATION_FRAMES.has(frame)
      && frame?.kind === "classical-nahuatl-adverbial-nuclear-validation-frame"
      && frame.authorizationStatus === "authorized"
      && frame.contract?.sharedProjectionOwnsGrammar === false
      && frame.contract?.sharedProjectionOwnsAtoms === false
      && Object.isFrozen(frame)
    );
  }

  return Object.freeze({
    buildClassicalAdverbialNuclearValidationFrame,
    isClassicalAdverbialNuclearValidationFrame,
  });
}
