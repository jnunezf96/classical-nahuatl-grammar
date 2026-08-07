// Non-authorizing live projection for canonical clause-complement semantics.
// Every semantic owner retains independent atoms, routes, receipts,
// provenance, proof address, and migration status.

const ISSUED_VALIDATION_FRAMES = new WeakSet();

function deepFreeze(value, seen = new WeakSet()) {
  if (!value || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const child of Object.values(value)) deepFreeze(child, seen);
  return Object.freeze(value);
}

function assertRuntime(target, name) {
  if (typeof target?.[name] !== "function") {
    throw new Error(`clause-complement-validation-capability-required:${name}`);
  }
}

const PROFILE_FACTS = Object.freeze({
  "double-nucleus-complement": { complementUsesAdjoinedNucleus: true, incorporatedComplementRemainsSeparate: true },
  "complement-role-system": { complementRoleCount: 4 },
  "object-license-categories": { objectComplementRequiresLicensedPrincipalVerbstem: true, objectSemanticCategoryCount: 4 },
  "object-reflexive-contact": { reflexiveObjectComplementLicensed: true },
  "object-predicate-categories": { substantivalAndAdjectivalNncComplementsLicensed: true },
  "object-material-composition": { materialCompositionComplementLicensed: true, transformedSentenceUsesIssuedComposition: true },
  "object-designation": { designationComplementLicensed: true },
  "designation-possessor-contact": { possessiveNameUsesSpecificPossessor: true, designationChangesToPossessorComplement: true },
  "object-state": { objectStateUsesAdjectivalNnc: true },
  "subject-reference-link": { principalAndComplementSubjectsShareReference: true },
  "subject-predicate-categories": { substantivalAndAdjectivalSubjectComplementsLicensed: true },
  "subject-semantic-system": { subjectSemanticCategoryCount: 4 },
  "subject-identity": { identitySubjectComplementLicensed: true },
  "subject-composition": { compositionSubjectComplementLicensed: true },
  "subject-state": { stateSubjectComplementLicensed: true },
  "subject-state-manner-contrast": { subjectStateCentersOnPrincipalSubject: true, adverbialMannerRemainsSeparate: true },
  "subject-contact-system": { subjectContactKindCount: 4 },
  "subject-cel-possessor-contact": { celUsesEmbeddedPossessorContact: true },
  "subject-el-possessor-contact": { elUsesEmbeddedPossessorContact: true },
  "subject-iyoh-contact": { iyohUsesPreteritAgentiveSubjectContact: true },
  "passive-object-transform": { passiveObjectComplementTransformsToSubjectComplement: true },
  "adverbial-family-system": { adverbialComplementFamilyCount: 7 },
  "coverage-moca": { mocaCoverageComplementLicensed: true },
  "coverage-mo-source-analysis": { sourceCrossReferenceAuthorizesComplement: false, moSourceRetainedAsLexicalAnalysis: true },
  "coverage-present-only": { mocaPrincipalPresentRestrictionRetained: true },
  "coverage-abundant-agentive": { abundantOwnerhoodComplementLicensed: true },
  "coverage-singular-animate": { coverageComplementNormallySingular: true, animateStemDoesNotForcePlural: true },
  "beginning-neighbor-contrast": { beginningMayResemblePurposeOrConjunctionButIsNeither: true },
  "beginning-pehua": { pehuaBeginningComplementLicensed: true, principalVerbstemConditionRetained: true },
  "beginning-impersonal": { beginningImpersonalComplementLicensed: true },
  "satisfaction-pachihui": { pachihuiSatisfactionComplementLicensed: true },
  "daring-sequence": { daringSubsequentComplementLicensed: true, optativeInsecurityLicensed: true },
  "cessation-mocahua": { mocahuaCessationComplementLicensed: true },
  "tarrying-huehcahua": { huehcahuaTarryingComplementLicensed: true },
  "relational-adverbial-system": { relationalNncAdverbialComplementLicensed: true },
  "relational-lexical-pairing": { meaningCompatiblePairMustBeLexicallyLicensed: true, translationAnalogyAuthorizesPair: false },
  "relational-active-action-incorporation": { relationalComplementMayFeedActiveActionIncorporation: true, personDyadBlocksPossessorCommerce: true },
});

export function createClassicalClauseComplementValidationSemanticOperationsApi(
  targetObject = globalThis,
) {
  const target = targetObject && typeof targetObject === "object" ? targetObject : globalThis;

  function ordinary(stem, {
    subject = "3sg",
    state = "absolutive",
    possessor = "",
  } = {}) {
    if (state === "possessive") {
      return target.buildClassicalNahuatlPossessiveNncFrame(stem, {
        subject,
        possessor: possessor || "3sg",
        singularConnector: "0",
        nounstemRelationKind: "nonrelational",
        possessorCompatibility: "ordinary",
        animacy: "nonanimate",
      });
    }
    return target.buildClassicalNahuatlAbsolutiveNncFrame(stem, {
      subject,
      nounClass: "zero",
      animacy: "nonanimate",
    });
  }

  function vnc(stem, {
    subject = "3sg",
    valence = "intransitive",
    objectKind = "none",
    objectPerson = "",
    voice = "active",
    mood = "indicative",
    tense = "present",
  } = {}) {
    return target.requestClassicalVncApplicationResult({
      sourceStem: stem,
      verbClass: "A",
      sourceValence: valence,
      subject,
      objectKind,
      objectPerson,
      requestedDerivation: "direct",
      requestedVoice: voice,
      mood,
      tense,
      outputScope: "single",
    });
  }

  function clause(result, {
    referenceId = "entity",
    subjectReferenceId = referenceId,
    objectReferenceId = "",
    possessorReferenceId = "",
  } = {}) {
    return target.buildClassicalNahuatlClauseCompositionSourceFrame(result, {
      referenceId,
      subjectReferenceId,
      ...(objectReferenceId ? { objectReferenceId } : {}),
      ...(possessorReferenceId ? { possessorReferenceId } : {}),
    });
  }

  function relational(stemId, {
    option = "option-one",
    sourceKind = option === "option-one" ? "possessor" : "relational-compound",
    embeddedStem = "",
  } = {}) {
    const stem = target.getClassicalNahuatlRelationalStemInventory()
      .find(candidate => candidate.stemId === stemId);
    if (!stem) throw new Error(`clause-complement-relational-stem-required:${stemId}`);
    const matrix = stem.classicalMatrix;
    const result = target.requestClassicalRelationalNncResult({
      state: option === "option-one" ? "possessive" : "absolutive",
      possessorId: "nonspecific-human",
      subjectMode: "adverbialized",
      subjectId: "3common",
      sentencePosition: "noninitial",
      adjunctorIn: false,
      dependentClausePresent: false,
      negative: false,
      nounstem: {
        kind: "classical-nahuatl-nnc-nounstem-request",
        stemId,
        formation: option,
        operation: "relational-nnc",
        sourceKind,
        sourceFormation: "plain-nounstem",
        sourceVoice: "active",
        sourceMode: option === "option-one" ? "whole-stem" : "embed-matrix",
        sourceStem: option === "option-one" ? matrix : embeddedStem,
        sourceEmbedStem: option === "option-one" ? "" : embeddedStem,
        sourceMatrixStem: matrix,
        downstreamTargetStem: "",
        affective: "none",
        sourceLexemeId: "",
        lexicalExceptionId: "",
        relationalFunction: "",
        sourceEndsInCoOrC: false,
        pertinencySourceKind: "direct-relational",
        nounConnector: "",
        upstreamResult: null,
      },
    });
    return clause(result, { referenceId: "relational-complement" });
  }

  function objectRequest(category, {
    principalStem = category === "designation" ? "ihtoa" : category === "state" ? "teci" : "chīhua",
    complementStem = category === "state" ? "xoxōuhqui" : category === "material-composition" ? "tetl" : "tlahtoāni",
    reflexive = false,
  } = {}) {
    const entity = reflexive ? "actor" : "object";
    const principal = clause(vnc(principalStem, {
      valence: "specific-projective",
      objectKind: "specific-projective",
      objectPerson: "3sg",
    }), {
      referenceId: "actor",
      subjectReferenceId: "actor",
      objectReferenceId: entity,
    });
    const complement = clause(ordinary(complementStem), { referenceId: entity });
    return {
      operationKind: "object-complement",
      principalClause: principal,
      complementClause: complement,
      options: { semanticCategory: category },
    };
  }

  function possessiveDesignationRequest() {
    return {
      operationKind: "object-complement",
      principalClause: clause(ordinary("tōcāyō", {
        state: "possessive",
        possessor: "3sg",
      }), {
        referenceId: "named-place",
        subjectReferenceId: "named-place",
        possessorReferenceId: "name-referent",
      }),
      complementClause: clause(ordinary("Cochtocān"), {
        referenceId: "name-referent",
      }),
      options: {
        semanticCategory: "designation",
        designationStructure: "possessive-name-possessor-complement",
        linkKind: "possessor-subject",
      },
    };
  }

  function subjectRequest(category, {
    complementStem = category === "composition" ? "tetl" : category === "state" ? "chipāhuac" : "tlahtoāni",
    contactKind = "subject",
    passive = false,
  } = {}) {
    const specialPossessor = contactKind === "embedded-possessor-cel"
      || contactKind === "embedded-possessor-el";
    const complement = clause(ordinary(complementStem, specialPossessor
      ? { state: "possessive", possessor: "3sg" }
      : {}), {
      referenceId: specialPossessor ? "complement-subject" : "entity",
      subjectReferenceId: specialPossessor ? "complement-subject" : "entity",
      possessorReferenceId: specialPossessor ? "entity" : "",
    });
    return {
      operationKind: "subject-complement",
      principalClause: clause(vnc(passive ? "chīhua" : "nēci", passive ? {
        valence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
        voice: "passive",
      } : {}), { referenceId: "entity" }),
      complementClause: complement,
      options: {
        semanticCategory: category,
        contactKind,
        ...(passive ? { passiveTransform: true } : {}),
      },
    };
  }

  function adverbialRequest(category, {
    principalStem = ({
      coverage: "moca",
      beginning: "pehua",
      satisfaction: "pachihui",
      daring: "motlahpaloa",
      cessation: "mocahua",
      tarrying: "huehcahua",
    })[category] || "pehua",
    complementTense = "present",
    complementMood = "indicative",
  } = {}) {
    return {
      operationKind: "adverbial-complement",
      principalClause: clause(vnc(principalStem), { referenceId: "actor" }),
      complementClause: category === "coverage"
        ? clause(ordinary("tlācatl"), { referenceId: "coverage" })
        : clause(vnc("cuīca", { tense: complementTense, mood: complementMood }), {
          referenceId: "actor",
        }),
      options: { semanticCategory: category },
    };
  }

  function relationalRequest(pairId) {
    const configurations = {
      "te-ca+cahcayahua": ["cahcayahua", "ca-means", {}],
      "te-pan+teca": ["teca", "pan-surface-time", {}],
      "te-tech+chicotlamati": ["chicotlamati", "tech-contact", {}],
      "te-tech-pa+tlaocoya": ["tlaocoya", "pa-direction", {
        option: "option-two",
        sourceKind: "relational-compound",
        embeddedStem: "tētech",
      }],
    };
    const [principalStem, stemId, relationalOptions] = configurations[pairId];
    return {
      operationKind: "adverbial-complement",
      principalClause: clause(vnc(principalStem), { referenceId: "actor" }),
      complementClause: relational(stemId, relationalOptions),
      options: {
        semanticCategory: "relational-lexicalized",
        relationalPairId: pairId,
      },
    };
  }

  function evaluateProfile(profileId) {
    if (profileId === "designation-possessor-contact") {
      return target.evaluateClassicalNahuatlClauseComplementation(
        possessiveDesignationRequest(),
      );
    }
    if (profileId.startsWith("object-")) {
      if (profileId === "object-material-composition") {
        return target.evaluateClassicalNahuatlClauseComplementation(
          objectRequest("material-composition"),
        );
      }
      if (profileId === "object-designation") {
        return target.evaluateClassicalNahuatlClauseComplementation(
          objectRequest("designation"),
        );
      }
      if (profileId === "object-state") {
        return target.evaluateClassicalNahuatlClauseComplementation(
          objectRequest("state"),
        );
      }
      return target.evaluateClassicalNahuatlClauseComplementation(
        objectRequest("change", { reflexive: profileId === "object-reflexive-contact" }),
      );
    }
    if (profileId.startsWith("subject-") || profileId === "passive-object-transform") {
      if (profileId === "subject-composition") {
        return target.evaluateClassicalNahuatlClauseComplementation(subjectRequest("composition"));
      }
      if (profileId === "subject-state" || profileId === "subject-state-manner-contrast") {
        return target.evaluateClassicalNahuatlClauseComplementation(subjectRequest("state"));
      }
      if (profileId === "subject-cel-possessor-contact") {
        return target.evaluateClassicalNahuatlClauseComplementation(subjectRequest("state", {
          complementStem: "cēl", contactKind: "embedded-possessor-cel",
        }));
      }
      if (profileId === "subject-el-possessor-contact") {
        return target.evaluateClassicalNahuatlClauseComplementation(subjectRequest("state", {
          complementStem: "el", contactKind: "embedded-possessor-el",
        }));
      }
      if (profileId === "subject-iyoh-contact") {
        return target.evaluateClassicalNahuatlClauseComplementation(subjectRequest("state", {
          complementStem: "iyoh", contactKind: "preterit-agentive-subject-iyoh",
        }));
      }
      if (profileId === "passive-object-transform") {
        return target.evaluateClassicalNahuatlClauseComplementation(subjectRequest(
          "passive-object-complement-transform",
          { passive: true },
        ));
      }
      return target.evaluateClassicalNahuatlClauseComplementation(subjectRequest("identity"));
    }
    if (profileId.startsWith("relational-")) {
      return target.evaluateClassicalNahuatlClauseComplementation(
        relationalRequest(profileId === "relational-active-action-incorporation"
          ? "te-pan+teca" : "te-tech-pa+tlaocoya"),
      );
    }
    if (profileId.startsWith("coverage-")) {
      return target.evaluateClassicalNahuatlClauseComplementation(adverbialRequest("coverage"));
    }
    if (profileId.startsWith("beginning-")) {
      return target.evaluateClassicalNahuatlClauseComplementation(adverbialRequest("beginning"));
    }
    if (profileId.startsWith("satisfaction-")) {
      return target.evaluateClassicalNahuatlClauseComplementation(adverbialRequest("satisfaction"));
    }
    if (profileId.startsWith("daring-")) {
      return target.evaluateClassicalNahuatlClauseComplementation(adverbialRequest("daring", {
        complementMood: "optative",
        complementTense: "nonpast",
      }));
    }
    if (profileId.startsWith("cessation-")) {
      return target.evaluateClassicalNahuatlClauseComplementation(adverbialRequest("cessation"));
    }
    if (profileId.startsWith("tarrying-")) {
      return target.evaluateClassicalNahuatlClauseComplementation(adverbialRequest("tarrying"));
    }
    if (profileId === "adverbial-family-system") {
      return target.evaluateClassicalNahuatlClauseComplementation(adverbialRequest("beginning"));
    }
    return target.evaluateClassicalNahuatlClauseComplementation(objectRequest("change"));
  }

  function summarize(result) {
    return deepFreeze({
      canonicalResult: target.isClassicalNahuatlClauseComplementationResultFrame(result) === true,
      authorizationStatus: result?.authorizationStatus || "blocked",
      role: result?.relationFrame?.role || "",
      semanticCategory: result?.relationFrame?.semanticCategory || "",
      contactKind: result?.relationFrame?.contactKind || "",
      designationStructure: result?.relationFrame?.designationStructure || "",
      reflexiveObject: result?.relationFrame?.reflexiveObject === true,
      passiveTransform: result?.relationFrame?.passiveTransformOfObjectComplement === true,
      sourcePrincipalKind: result?.principalClause?.unitKind || "",
      sourceComplementKind: result?.complementClause?.unitKind || "",
      relationalSourceKind: result?.complementClause?.envelope?.sourceFrameKind || "",
      formulaIndependentOfWritten:
        result?.formulaRecord?.formula !== result?.formulaRealizationRecord?.surface,
      liveResult: result,
    });
  }

  function buildClassicalClauseComplementValidationFrame(
    profileId = "double-nucleus-complement",
  ) {
    for (const capability of [
      "buildClassicalNahuatlAbsolutiveNncFrame",
      "buildClassicalNahuatlPossessiveNncFrame",
      "requestClassicalVncApplicationResult",
      "buildClassicalNahuatlClauseCompositionSourceFrame",
      "evaluateClassicalNahuatlClauseComplementation",
      "isClassicalNahuatlClauseComplementationResultFrame",
      "getClassicalNahuatlRelationalStemInventory",
      "requestClassicalRelationalNncResult",
    ]) assertRuntime(target, capability);
    const facts = PROFILE_FACTS[profileId];
    if (!facts) throw new Error(`clause-complement-validation-profile-required:${profileId}`);
    const result = summarize(evaluateProfile(profileId));
    const raw = target.evaluateClassicalNahuatlClauseComplementation({
      operationKind: "object-complement",
      principalClause: "stored principal",
      complementClause: { surface: "stored complement" },
      options: { semanticCategory: "change" },
      lesson: 51,
      formula: "#FORGED#",
      surface: "forged surface",
    });
    const ordinaryRelationalImpostor = target.evaluateClassicalNahuatlClauseComplementation({
      operationKind: "adverbial-complement",
      principalClause: clause(vnc("tlaocoya"), { referenceId: "actor" }),
      complementClause: clause(ordinary("mich"), { referenceId: "relational-complement" }),
      options: {
        semanticCategory: "relational-lexicalized",
        relationalPairId: "te-tech-pa+tlaocoya",
      },
    });
    const frame = deepFreeze({
      kind: "classical-nahuatl-clause-complement-validation-frame",
      profileId,
      authorizationStatus: result.canonicalResult
        && result.authorizationStatus === "authorized"
        && raw?.authorizationStatus === "blocked"
        && ordinaryRelationalImpostor?.authorizationStatus === "blocked"
        ? "authorized" : "blocked",
      result,
      analysis: {
        semanticBoundary: profileId,
        ...facts,
        rawStoredAuthorityBlocked: raw?.authorizationStatus === "blocked",
        ordinaryNncCannotImpersonateRelationalComplement:
          ordinaryRelationalImpostor?.authorizationStatus === "blocked",
        lessonMetadataAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        translationAuthority: false,
        traditionalSpellingAuthority: false,
      },
      blockedRaw: {
        authorizationStatus: raw?.authorizationStatus || "blocked",
        blockReason: raw?.blockReason || "",
      },
      blockedRelationalImpostor: {
        authorizationStatus: ordinaryRelationalImpostor?.authorizationStatus || "blocked",
        blockReason: ordinaryRelationalImpostor?.blockReason || "",
      },
      ownerSeparation: {
        validationProjectionOwnsGrammar: false,
        validationProjectionOwnsAtoms: false,
        oneOwnerProofSatisfiesAnother: false,
      },
    });
    if (frame.authorizationStatus === "authorized") ISSUED_VALIDATION_FRAMES.add(frame);
    return frame;
  }

  function isClassicalClauseComplementValidationFrame(frame = null) {
    return Boolean(
      ISSUED_VALIDATION_FRAMES.has(frame)
      && frame?.kind === "classical-nahuatl-clause-complement-validation-frame"
      && frame.authorizationStatus === "authorized"
      && frame.result?.canonicalResult === true
      && frame.analysis?.rawStoredAuthorityBlocked === true
      && frame.analysis?.ordinaryNncCannotImpersonateRelationalComplement === true
      && frame.ownerSeparation?.validationProjectionOwnsAtoms === false
    );
  }

  return Object.freeze({
    buildClassicalClauseComplementValidationFrame,
    isClassicalClauseComplementValidationFrame,
  });
}

export function installClassicalClauseComplementValidationSemanticOperationsGlobals(
  targetObject = globalThis,
) {
  const api = createClassicalClauseComplementValidationSemanticOperationsApi(targetObject);
  Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
  return api;
}
