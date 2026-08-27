// Non-authorizing live validation projection for canonical personal-name NNC
// semantics. Isolated owner specs retain all grammar and atom ownership.

import { createPersonalNameNncApi } from "../nnc/names/names.mjs?v=20260826-relational-role-340";

const ISSUED_VALIDATION_FRAMES = new WeakSet();

function deepFreeze(value, seen = new WeakSet()) {
  if (!value || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor && Object.hasOwn(descriptor, "value")) {
      deepFreeze(descriptor.value, seen);
    }
  }
  return Object.freeze(value);
}

function assertRuntime(target, name) {
  if (typeof target?.[name] !== "function") {
    throw new Error(`personal-name-validation-capability-required:${name}`);
  }
}

export function createClassicalPersonalNameNncValidationSemanticOperationsApi(
  targetObject = globalThis,
) {
  const target = targetObject && typeof targetObject === "object"
    ? targetObject : globalThis;
  const personal = createPersonalNameNncApi(target);

  function buildSource(sourceFamily, variant = "default") {
    const family = personal.getPersonalNameNncLcm().sourceFamilies
      .find(candidate => candidate.id === sourceFamily);
    if (!family) {
      throw new Error(`personal-name-validation-source-family-required:${sourceFamily}`);
    }
    const defaults =
      personal.getPersonalNameNncInnerClauseFunctionalSlotDefaults(sourceFamily);
    const predicateMorphs = variant === "customary"
      ? ["cui", "liā", "n"]
      : variant === "calendar"
        ? ["ce", "acatl"]
        : ["temō", "Ø"];
    const clauses = Array.from({ length: family.minClauses }, () => (
      personal.buildPersonalNameInnerClauseFrame({
        sourceFamily,
        subjectPrefix: defaults.subjectPrefix,
        subjectConnector: defaults.subjectConnector,
        predicateMorphs,
        numberPrefix: defaults.numberPrefix,
        numberSuffix: defaults.numberSuffix,
        subjectReference: sourceFamily === "impersonal-preterit-agentive"
          ? "nonspecific"
          : variant === "nonanimate"
            ? "nonanimate"
            : defaults.subjectReference,
      })
    ));
    const referentKind = variant === "god"
      ? "god"
      : sourceFamily === "calendar-personalizing-thing"
        ? "thing"
        : "person";
    return personal.buildPersonalNameNncSourceFrame({
      sourceFamily,
      clauses,
      referentKind,
      modificationAmbiguity:
        sourceFamily === "adjectival-modification"
        && variant === "ambiguous"
          ? "also-subject-supplementation"
          : "unambiguous",
    });
  }

  function buildClassicalPersonalNameNncValidationFrame(
    profileId = "two-tier-personal-name",
    sourceFamily = "preterit-agentive",
    variant = "default",
    sentenceOperation = "",
  ) {
    for (const capability of [
      "getPersonalNameNncLcm",
      "getPersonalNameNncInnerClauseFunctionalSlotDefaults",
      "buildPersonalNameInnerClauseFrame",
      "buildPersonalNameNncSourceFrame",
      "evaluatePersonalNameNnc",
      "preparePersonalNameNncParadigmPlan",
      "projectPersonalNameNncParadigmCoordinates",
      "evaluatePersonalNameSentenceOperation",
      "isPersonalNameNncResult",
      "isPersonalNameSentenceOperation",
    ]) assertRuntime(personal, capability);

    const sourceVariant = sentenceOperation.startsWith("god-name-")
      ? "god" : variant;
    const sourceFrame = buildSource(sourceFamily, sourceVariant);
    const affective = {
      "outer-affective": { affectiveScope: "outer-name", affectiveMatrix: "tzin" },
      "inner-affective": { affectiveScope: "inner-source", affectiveMatrix: "tzin" },
      "general-use-affective": { affectiveScope: "general-use-agentive", affectiveMatrix: "tzin" },
    }[variant] || {};
    const request = {
      sourceFrame,
      outerSubject: "2sg",
      ...affective,
    };
    const canonical = personal.evaluatePersonalNameNnc(request);
    if (!personal.isPersonalNameNncResult(canonical)) {
      throw new Error(`personal-name-validation-canonical-result-required:${profileId}:${sourceFamily}`);
    }
    const sentenceResult = sentenceOperation
      ? personal.evaluatePersonalNameSentenceOperation({
        personalNameResult: canonical,
        operation: sentenceOperation,
        locativeMatrix: sentenceOperation === "god-name-to-place-name-embed"
          ? "tlā-n" : "",
        ordinaryNncSubject: sentenceOperation === "god-name-to-normal-nnc"
          ? "3pl" : "",
      })
      : null;
    if (sentenceOperation && !personal.isPersonalNameSentenceOperation(sentenceResult)) {
      throw new Error(`personal-name-validation-sentence-result-required:${profileId}:${sentenceOperation}`);
    }

    const plan = personal.preparePersonalNameNncParadigmPlan({
      sourceFrame,
      ...affective,
    });
    const coordinates = personal.projectPersonalNameNncParadigmCoordinates(
      plan,
      [{ outerSubject: "2sg" }],
    );
    const scalarParadigmEquivalent = coordinates.length === 1
      && coordinates[0].authorizationStatus === "authorized"
      && coordinates[0].formulaRealization === canonical.formulaRealization
      && coordinates[0].surfaceRealization === canonical.surfaceRealization;
    let storedAuthorityBlocked = false;
    try {
      const storedAuthority = personal.evaluatePersonalNameNnc({
        ...request,
        formula: "#stored-answer-cannot-authorize#",
      });
      storedAuthorityBlocked = storedAuthority == null
        || storedAuthority.authorizationStatus === "blocked";
    } catch (error) {
      storedAuthorityBlocked = String(error?.message || error)
        .includes("forbidden-authority:formula");
    }
    const copiedSource = personal.evaluatePersonalNameNnc({
      ...request,
      sourceFrame: { ...sourceFrame },
    });
    const frame = deepFreeze({
      kind: "classical-personal-name-nnc-validation-frame",
      version: 1,
      authorizationStatus: "authorized",
      profileId,
      result: {
        canonicalResult: true,
        operationId: canonical.operationId,
        sourceFamily: canonical.sourceFamily,
        sourceUnitKind: canonical.sourceUnitKind,
        outerNumberDyad: canonical.outerNumberDyad,
        innerSubjectBarrier: canonical.innerSubjectBarrier,
        affectiveScope: canonical.affectiveScope,
        sentenceOperation: sentenceResult?.operation || "",
        sentenceOutputKind: sentenceResult?.outputKind || "",
        formulaRealization: canonical.formulaRealization,
        surfaceRealization: canonical.surfaceRealization,
      },
      analysis: {
        semanticBoundary: profileId,
        typedPersonalNameExecutionRequired: true,
        scalarParadigmEquivalent,
        storedAuthorityBlocked,
        copiedSourceBlocked:
          copiedSource == null
          || copiedSource.authorizationStatus === "blocked",
        translationAuthority: false,
        traditionalSpellingAuthority: false,
        curriculumCoordinateAuthority: false,
        sharedProjectionOwnsGrammar: false,
        sharedProjectionOwnsAtoms: false,
        separateOwnerProofRequired: true,
      },
    });
    ISSUED_VALIDATION_FRAMES.add(frame);
    return frame;
  }

  function isClassicalPersonalNameNncValidationFrame(frame = null) {
    return Boolean(
      frame
      && ISSUED_VALIDATION_FRAMES.has(frame)
      && frame.kind === "classical-personal-name-nnc-validation-frame"
      && frame.version === 1
      && frame.authorizationStatus === "authorized"
      && frame.result?.canonicalResult === true
      && frame.result?.innerSubjectBarrier === true
      && frame.analysis?.scalarParadigmEquivalent === true
      && frame.analysis?.storedAuthorityBlocked === true
      && frame.analysis?.copiedSourceBlocked === true
      && frame.analysis?.sharedProjectionOwnsAtoms === false
      && frame.analysis?.separateOwnerProofRequired === true
      && Object.isFrozen(frame)
    );
  }

  return Object.freeze({
    buildClassicalPersonalNameNncValidationFrame,
    isClassicalPersonalNameNncValidationFrame,
  });
}

export function installClassicalPersonalNameNncValidationSemanticOperationsGlobals(
  targetObject = globalThis,
) {
  const api = createClassicalPersonalNameNncValidationSemanticOperationsApi(
    targetObject,
  );
  Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
  return api;
}
