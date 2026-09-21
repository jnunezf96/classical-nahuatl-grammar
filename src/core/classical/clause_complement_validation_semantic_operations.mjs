// Non-authorizing live projection for canonical clause-complement semantics.
// Every semantic owner retains independent atoms, routes, receipts,
// provenance, proof address, and migration status.

import { observeFormulaProjectionDifference } from "./validation_projection_observations.mjs";

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
  "double-nucleus-complement": {},
  "complement-role-system": {},
  "object-license-categories": {},
  "object-reflexive-contact": {},
  "object-predicate-categories": {},
  "object-material-composition": {},
  "object-material-transformation": {},
  "object-designation": {},
  "designation-possessor-contact": {},
  "object-state": {},
  "subject-reference-link": {},
  "subject-predicate-categories": {},
  "subject-semantic-system": {},
  "subject-identity": {},
  "subject-composition": {},
  "subject-state": {},
  "subject-state-manner-contrast": {},
  "subject-contact-system": {},
  "subject-cel-possessor-contact": {},
  "subject-el-possessor-contact": {},
  "subject-iyoh-contact": {},
  "passive-object-transform": {},
  "adverbial-family-system": {},
  "coverage-moca": {},
  "coverage-mo-source-analysis": {},
  "coverage-present-only": {},
  "coverage-abundant-agentive": {},
  "coverage-singular-animate": {},
  "beginning-neighbor-contrast": {},
  "beginning-pehua": {},
  "beginning-impersonal": {},
  "satisfaction-pachihui": {},
  "daring-sequence": {},
  "cessation-mocahua": {},
  "tarrying-huehcahua": {},
  "relational-adverbial-system": {},
  "relational-lexical-pairing": {},
  "relational-active-action-incorporation": {},
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
    sourceInitialISelection = "",
  } = {}) {
    return target.requestClassicalVncApplicationResult({
      sourceStem: stem,
      ...(sourceInitialISelection ? { sourceInitialISelection } : {}),
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
      valence: reflexive ? "mainline-reflexive" : "specific-projective",
      objectKind: reflexive ? "reflexive" : "specific-projective",
      objectPerson: "3sg",
      ...(principalStem === "ihtoa" ? { sourceInitialISelection: "contextual" } : {}),
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
    voice = "active",
  } = {}) {
    return {
      operationKind: "adverbial-complement",
      principalClause: clause(vnc(principalStem, { voice }), { referenceId: "actor" }),
      complementClause: category === "coverage"
        ? clause(ordinary("tlācatl"), { referenceId: "coverage" })
        : clause(vnc("cuīca", { tense: complementTense, mood: complementMood, voice }), {
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
      if (["object-material-composition", "object-material-transformation"].includes(profileId)) {
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
      const request = adverbialRequest("coverage");
      return target.evaluateClassicalNahuatlClauseComplementation(request);
    }
    if (profileId.startsWith("beginning-")) {
      return target.evaluateClassicalNahuatlClauseComplementation(adverbialRequest("beginning", {
        voice: profileId === "beginning-impersonal" ? "impersonal" : "active",
      }));
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
      ...observeFormulaProjectionDifference(result?.formulaRecord, result?.formulaRealizationRecord),
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
    let abundantOwnerhoodSource = null;
    let abundantCoverageRequest = null;
    if (profileId === "coverage-abundant-agentive") {
      abundantOwnerhoodSource = target.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "ownerhood",
        source: { sourceStem: "te", nounClass: "zero", ownerhoodMatrix: "yō-ā" },
        subject: "3sg", state: "absolutive",
      });
      abundantCoverageRequest = adverbialRequest("coverage");
      abundantCoverageRequest.complementClause = clause(abundantOwnerhoodSource, { referenceId: "coverage" });
    }
    const singularAnimateSource = profileId === "coverage-singular-animate"
      ? target.buildClassicalNahuatlAbsolutiveNncFrame("tecp", {
        subject: "3sg", nounClass: "in", animacy: "animate",
      }) : null;
    const singularAnimateRequest = singularAnimateSource ? adverbialRequest("coverage") : null;
    if (singularAnimateRequest) singularAnimateRequest.complementClause = clause(singularAnimateSource, { referenceId: "covering-entities" });
    const result = summarize(singularAnimateRequest
      ? target.evaluateClassicalNahuatlClauseComplementation(singularAnimateRequest)
      : abundantCoverageRequest
      ? target.evaluateClassicalNahuatlClauseComplementation(abundantCoverageRequest)
      : evaluateProfile(profileId));
    const abundantCoverageObserved = profileId === "coverage-abundant-agentive"
      && target.isClassicalNahuatlDeverbalNncGrammarFrame(abundantOwnerhoodSource) === true
      && abundantOwnerhoodSource?.authorizationStatus === "authorized"
      && abundantOwnerhoodSource?.operationFrame?.ownerhoodKind === "abundant-ownerhood"
      && result.canonicalResult && result.authorizationStatus === "authorized"
      && result.role === "adverbial-complement" && result.semanticCategory === "coverage"
      && result.liveResult?.complementClause === abundantCoverageRequest.complementClause;
    let transformedSentenceWitness = null;
    if (profileId === "object-material-transformation" && result.canonicalResult
      && result.authorizationStatus === "authorized" && result.semanticCategory === "material-composition") {
      const upstreamResult = result.liveResult;
      const nonactiveResult = vnc(upstreamResult.principalClause.envelope.sourceStem, {
        valence: "projective-nonhuman", objectKind: "nonspecific-nonhuman", voice: "impersonal",
      });
      const patientiveResult = target.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "patientive", patientiveSourceFamily: "impersonal-core",
        canonicalVncResult: nonactiveResult.resultFrame,
        subject: "3common", animacy: "nonanimate", state: "absolutive",
      });
      const patientiveClause = target.buildClassicalNahuatlSupplementationClauseEnvelope(patientiveResult, {
        referenceId: upstreamResult.complementClause.subject.referenceId,
      });
      const sentenceResult = target.evaluateClassicalNahuatlSupplementationOperation({
        operationKind: "relation", principalClause: upstreamResult.complementClause.envelope,
        supplementClause: patientiveClause,
        options: { referenceMode: "shared", headRole: "subject", adjunctor: "in" },
      });
      const authorized = target.isClassicalNahuatlVncApplicationFrame(nonactiveResult)
        && nonactiveResult.authorizationStatus === "authorized"
        && target.isClassicalNahuatlDeverbalNncGrammarFrame(patientiveResult)
        && patientiveResult.authorizationStatus === "authorized"
        && patientiveResult.sourceFrame?.impersonalPatientiveVncCaptureFrame?.canonicalVncResult === nonactiveResult.resultFrame
        && target.isClassicalNahuatlSupplementationFrame(sentenceResult)
        && sentenceResult.authorizationStatus === "authorized"
        && sentenceResult.principalClause === upstreamResult.complementClause.envelope
        && sentenceResult.supplementClause === patientiveClause;
      transformedSentenceWitness = deepFreeze({
        authorizationStatus: authorized ? "authorized" : "blocked",
        upstreamResult, nonactiveResult, patientiveResult, sentenceResult,
      });
    }
    const separateNucleiObserved = result.canonicalResult && result.authorizationStatus === "authorized"
      && result.liveResult?.rank === "clause-group"
      && result.liveResult.principalClause !== result.liveResult.complementClause
      && result.liveResult.principalClause?.rank === "nuclear-clause"
      && result.liveResult.complementClause?.rank === "nuclear-clause"
      && result.liveResult.complementClause?.unitKind === "nnc"
      && result.liveResult.surfaceSequence?.length === 2
      && result.liveResult.surfaceSequence.includes(result.liveResult.principalClause.surface)
      && result.liveResult.surfaceSequence.includes(result.liveResult.complementClause.surface);
    const objectObservation = {
      "object-material-composition": ["materialCompositionComplementLicensed", "material-composition"],
      "object-designation": ["designationComplementLicensed", "designation"],
      "object-state": ["objectStateUsesAdjectivalNnc", "state"],
    }[profileId];
    const selectedObject = result.liveResult?.principalClause?.objects?.find(object =>
      object.id === result.liveResult?.relationFrame?.principalObjectId);
    const objectObservationSatisfied = objectObservation && result.canonicalResult
      && result.authorizationStatus === "authorized" && result.role === "object-complement"
      && result.semanticCategory === objectObservation[1]
      && Boolean(selectedObject?.referenceId)
      && selectedObject.referenceId === result.liveResult?.complementClause?.subject?.referenceId
      && (profileId !== "object-state" || result.liveResult?.relationFrame?.complementPredicateKind === "adjectival-nnc");
    const possessorDesignationObserved = result.canonicalResult && result.authorizationStatus === "authorized"
      && result.role === "possessor-complement" && result.semanticCategory === "designation"
      && result.designationStructure === "possessive-name-possessor-complement"
      && Boolean(result.liveResult?.principalClause?.possessor?.referenceId)
      && result.liveResult.principalClause.possessor.referenceId === result.liveResult?.complementClause?.subject?.referenceId;
    const subjectObservation = {
      "subject-reference-link": ["principalAndComplementSubjectsShareReference", "identity", "subject"],
      "subject-identity": ["identitySubjectComplementLicensed", "identity", "subject"],
      "subject-composition": ["compositionSubjectComplementLicensed", "composition", "subject"],
      "subject-state": ["stateSubjectComplementLicensed", "state", "subject"],
      "subject-cel-possessor-contact": ["celUsesEmbeddedPossessorContact", "state", "embedded-possessor-cel"],
      "subject-el-possessor-contact": ["elUsesEmbeddedPossessorContact", "state", "embedded-possessor-el"],
      "subject-iyoh-contact": ["iyohUsesPreteritAgentiveSubjectContact", "state", "preterit-agentive-subject-iyoh"],
      "passive-object-transform": ["passiveObjectComplementTransformsToSubjectComplement", "passive-object-complement-transform", "subject"],
    }[profileId];
    const subjectContactReference = subjectObservation?.[2].startsWith("embedded-possessor")
      ? result.liveResult?.complementClause?.possessor?.referenceId
      : result.liveResult?.complementClause?.subject?.referenceId;
    const subjectObservationSatisfied = subjectObservation && result.canonicalResult
      && result.authorizationStatus === "authorized" && result.role === "subject-complement"
      && result.semanticCategory === subjectObservation[1] && result.contactKind === subjectObservation[2]
      && Boolean(subjectContactReference)
      && subjectContactReference === result.liveResult?.principalClause?.subject?.referenceId
      && (profileId !== "passive-object-transform" || (result.passiveTransform
        && ["passive", "nonactive-passive"].includes(result.liveResult?.principalClause?.voice)));
    const adverbialFamilies = ["beginning", "coverage", "satisfaction", "daring", "cessation", "tarrying", "relational-lexicalized"];
    const relationalCoverageObserved = result.canonicalResult && result.authorizationStatus === "authorized"
      && result.role === "adverbial-complement" && result.semanticCategory === "relational-lexicalized"
      && result.liveResult?.complementClause?.envelope?.sourceFrameKind === "classical-nahuatl-relational-nnc-relational-result"
      && Boolean(result.liveResult?.complementClause?.relationalIdentity);
    let mismatchedRelationalPairWitness = null;
    if (profileId === "relational-lexical-pairing") {
      const request = relationalRequest("te-tech-pa+tlaocoya");
      request.principalClause = clause(vnc("teca"), { referenceId: "actor" });
      request.translationAnalogy = "meaning-compatible English paraphrase";
      mismatchedRelationalPairWitness = target.evaluateClassicalNahuatlClauseComplementation(request);
    }
    const relationalPairRejectionObserved = mismatchedRelationalPairWitness?.authorizationStatus === "blocked"
      && mismatchedRelationalPairWitness?.blockReason === "typed-relational-nnc-and-verbstem-pair-not-licensed";
    const daringWitnesses = profileId === "daring-sequence" ? [
      summarize(target.evaluateClassicalNahuatlClauseComplementation(adverbialRequest("daring", { complementTense: "future" }))),
      result,
    ] : [];
    const daringWitnessValid = witness => witness?.canonicalResult && witness.authorizationStatus === "authorized"
      && witness.role === "adverbial-complement" && witness.semanticCategory === "daring"
      && witness.liveResult?.principalClause?.subject?.referenceId === witness.liveResult?.complementClause?.subject?.referenceId;
    const daringSubsequentObserved = Boolean(daringWitnessValid(daringWitnesses[0])
      && daringWitnesses[0].liveResult.principalClause.tense === "present"
      && daringWitnesses[0].liveResult.complementClause.tense === "future"
      && daringWitnesses[0].liveResult.relationFrame.complementTensePolicy === "principal-determined-ordinarily-subsequent");
    const daringOptativeObserved = Boolean(daringWitnessValid(daringWitnesses[1])
      && daringWitnesses[1].liveResult.complementClause.mood === "optative"
      && daringWitnesses[1].liveResult.relationFrame.optativeInsecurity === true);
    const beginningNeighborWitnesses = profileId === "beginning-neighbor-contrast" ? {
      purpose: target.evaluateAdverbialAdjunction({
        principalClause: vnc("chōca"), adjoinedUnit: vnc("cuīca", { tense: "future" }),
        semanticRelation: "purpose", purposeType: "unmarked", marking: "unmarked",
        adverbializationDegree: "nonadverbialized", structureKind: "complex",
        adjoinedUnitType: "vnc", order: "modifier-head", recursion: "none",
      }),
      conjunction: target.evaluateClassicalNahuatlClauseConjunction({
        operationKind: "conjunction",
        conjuncts: [clause(vnc("chōca"), { referenceId: "actor" }), clause(vnc("cuīca"), { referenceId: "actor" })],
        options: { relation: "unmarked", coordinationType: "additive", level: "principal", polarity: "positive" },
      }),
    } : null;
    const beginningContrastObserved = Boolean(beginningNeighborWitnesses
      && result.canonicalResult && result.authorizationStatus === "authorized"
      && result.role === "adverbial-complement" && result.semanticCategory === "beginning"
      && target.isAdverbialAdjunctionResult(beginningNeighborWitnesses.purpose)
      && beginningNeighborWitnesses.purpose.ok === true && beginningNeighborWitnesses.purpose.supported === true
      && beginningNeighborWitnesses.purpose.ruleProfile?.relation === "purpose"
      && target.isClassicalNahuatlClauseConjunctionResultFrame(beginningNeighborWitnesses.conjunction)
      && beginningNeighborWitnesses.conjunction.authorizationStatus === "authorized"
      && beginningNeighborWitnesses.conjunction.operationKind === "conjunction");
    const lexicalFamilyObservation = ({
      "beginning-pehua": ["beginning", "pehuaBeginningComplementLicensed"],
      "satisfaction-pachihui": ["satisfaction", "pachihuiSatisfactionComplementLicensed"],
      "cessation-mocahua": ["cessation", "mocahuaCessationComplementLicensed"],
      "tarrying-huehcahua": ["tarrying", "huehcahuaTarryingComplementLicensed"],
    })[profileId];
    const lexicalFamilyObserved = Boolean(lexicalFamilyObservation && result.canonicalResult
      && result.authorizationStatus === "authorized" && result.role === "adverbial-complement"
      && result.semanticCategory === lexicalFamilyObservation[0]
      && result.liveResult?.principalClause?.subject?.referenceId
        === result.liveResult?.complementClause?.subject?.referenceId);
    const unlicensedBeginningWitness = profileId === "beginning-pehua"
      ? target.evaluateClassicalNahuatlClauseComplementation(adverbialRequest("beginning", { principalStem: "chōca" })) : null;
    const beginningLexicalRestrictionObserved = unlicensedBeginningWitness?.authorizationStatus === "blocked"
      && unlicensedBeginningWitness?.blockReason === "principal-verbstem-not-licensed-for-adverbial-complement-family";
    const coverageObserved = result.canonicalResult && result.authorizationStatus === "authorized"
      && result.role === "adverbial-complement" && result.semanticCategory === "coverage"
      && result.liveResult?.principalClause?.predicateStem === "moca";
    const singularAnimateCoverageObserved = coverageObserved
      && singularAnimateSource?.nncSlotFrame?.subjectAnimacy === "animate"
      && result.liveResult?.complementClause === singularAnimateRequest?.complementClause
      && result.liveResult?.complementClause?.subject?.features?.number === "singular"
      && result.liveResult?.principalClause?.subject?.referenceId
        !== result.liveResult?.complementClause?.subject?.referenceId;
    const moSourceEvidence = profileId === "coverage-mo-source-analysis" ? deepFreeze({
      kind: "documentary-source-cross-reference",
      document: "ANDREWS_TRANSCRIPTION_CANVAS.md", section: "51.4.1", relatedSection: "16.9.7",
      morph: "mo-", gloss: "full", constructions: ["mo-ca", "mo-chi"],
      authority: "source-explanation-only", runtimeMorphAnalysisProven: false,
    }) : null;
    const moCrossReferenceCounterwitness = moSourceEvidence
      ? target.evaluateClassicalNahuatlClauseComplementation({
        ...adverbialRequest("coverage", { principalStem: "chōca" }),
        sourceCrossReference: moSourceEvidence, lexicalAnalysis: moSourceEvidence,
      }) : null;
    const moCrossReferenceBlocked = moCrossReferenceCounterwitness?.authorizationStatus === "blocked"
      && moCrossReferenceCounterwitness?.blockReason === "principal-verbstem-not-licensed-for-adverbial-complement-family";
    let coverageFutureWitness = null;
    if (profileId === "coverage-present-only") {
      const futureRequest = adverbialRequest("coverage");
      futureRequest.principalClause = clause(vnc("moca", { tense: "future" }), { referenceId: "actor" });
      coverageFutureWitness = summarize(target.evaluateClassicalNahuatlClauseComplementation(futureRequest));
    }
    // Andrews' qualified source observation is not a categorical prohibition.
    // Runtime acceptance contradicts the proposed exclusion, not the source;
    // adding an owner rejection would not itself establish source attestation.
    const coveragePresentRestrictionObserved = false;

    const mannerContrastWitness = profileId === "subject-state-manner-contrast"
      ? target.evaluateAdverbialAdjunction({
        principalClause: vnc("chōca"), adjoinedUnit: vnc("cuīca"),
        semanticRelation: "manner", adverbializationDegree: "nonadverbialized",
        structureKind: "complex", adjoinedUnitType: "vnc", order: "modifier-head",
        recursion: "none", marking: "unmarked",
      }) : null;
    const subjectStateObserved = result.canonicalResult && result.authorizationStatus === "authorized"
      && result.role === "subject-complement" && result.semanticCategory === "state"
      && result.liveResult?.relationFrame?.stateRelationCentersOnPrincipalSubject === true
      && result.liveResult?.principalClause?.subject?.referenceId
        === result.liveResult?.complementClause?.subject?.referenceId;
    const mannerContrastObserved = profileId === "subject-state-manner-contrast"
      && subjectStateObserved && target.isAdverbialAdjunctionResult(mannerContrastWitness) === true
      && mannerContrastWitness?.ok === true && mannerContrastWitness?.supported === true
      && mannerContrastWitness?.ruleProfile?.relation === "manner";

    // Andrews 51.2 and 51.3: retain both issued examples, not a category
    // assertion inferred from a single successful complement.
    const predicateRole = profileId === "object-predicate-categories" ? "object-complement"
      : profileId === "subject-predicate-categories" ? "subject-complement" : null;
    const predicateRequests = predicateRole === "object-complement"
      ? [objectRequest("change"), objectRequest("state")]
      : predicateRole === "subject-complement"
        ? [subjectRequest("identity"), subjectRequest("state")] : [];
    const predicateCategoryWitnesses = predicateRequests.map(request =>
      summarize(target.evaluateClassicalNahuatlClauseComplementation(request)));
    const predicateCoverageComplete = !predicateRole || predicateCategoryWitnesses.every((witness, index) =>
      witness.canonicalResult && witness.authorizationStatus === "authorized"
      && witness.role === predicateRole
      && witness.semanticCategory === predicateRequests[index].options.semanticCategory
      && witness.liveResult?.complementClause === predicateRequests[index].complementClause
      && witness.liveResult?.principalClause === predicateRequests[index].principalClause);

    const adverbialFamilyWitnesses = profileId === "adverbial-family-system"
      ? [result, ...["coverage-moca", "satisfaction-pachihui", "daring-sequence", "cessation-mocahua", "tarrying-huehcahua", "relational-lexical-pairing"]
        .map(familyProfile => summarize(evaluateProfile(familyProfile)))] : [];
    const adverbialFamiliesObserved = adverbialFamilyWitnesses.length
      && adverbialFamilyWitnesses.every(witness => witness.canonicalResult
        && witness.authorizationStatus === "authorized" && witness.role === "adverbial-complement")
      ? [...new Set(adverbialFamilyWitnesses.map(witness => witness.semanticCategory))] : null;
    const adverbialCoverageComplete = profileId !== "adverbial-family-system"
      || (adverbialFamiliesObserved?.length === 7
        && adverbialFamilies.every(family => adverbialFamiliesObserved.includes(family)));
    const subjectContactWitnesses = profileId === "subject-contact-system"
      ? [result, ...["subject-cel-possessor-contact", "subject-el-possessor-contact", "subject-iyoh-contact"]
        .map(contactProfile => summarize(evaluateProfile(contactProfile)))] : [];
    const subjectContactsObserved = subjectContactWitnesses.length
      && subjectContactWitnesses.every(witness => witness.canonicalResult
        && witness.authorizationStatus === "authorized" && witness.role === "subject-complement")
      ? [...new Set(subjectContactWitnesses.map(witness => witness.contactKind))] : null;
    const subjectContactCoverageComplete = profileId !== "subject-contact-system"
      || (subjectContactsObserved?.length === 4
        && ["subject", "embedded-possessor-cel", "embedded-possessor-el", "preterit-agentive-subject-iyoh"]
          .every(contact => subjectContactsObserved.includes(contact)));
    const subjectCategories = ["identity", "composition", "state", "passive-object-complement-transform"];
    const subjectCategoryWitnesses = profileId === "subject-semantic-system"
      ? [result, ...subjectCategories.slice(1).map(category => summarize(
        target.evaluateClassicalNahuatlClauseComplementation(subjectRequest(category, {
          passive: category === "passive-object-complement-transform",
        }))))] : [];
    const subjectCategoriesObserved = subjectCategoryWitnesses.length
      && subjectCategoryWitnesses.every(witness => witness.canonicalResult
        && witness.authorizationStatus === "authorized" && witness.role === "subject-complement")
      ? [...new Set(subjectCategoryWitnesses.map(witness => witness.semanticCategory))] : null;
    const subjectCoverageComplete = profileId !== "subject-semantic-system"
      || (subjectCategoriesObserved?.length === 4
        && subjectCategories.every(category => subjectCategoriesObserved.includes(category))
        && subjectCategoryWitnesses[3].passiveTransform
        && ["passive", "nonactive-passive"].includes(subjectCategoryWitnesses[3].liveResult?.principalClause?.voice));
    const objectCategories = ["change", "material-composition", "designation", "state"];
    const objectCategoryWitnesses = profileId === "object-license-categories"
      ? [result, ...objectCategories.slice(1).map(category => summarize(
        target.evaluateClassicalNahuatlClauseComplementation(objectRequest(category))))] : [];
    const objectCategoriesObserved = objectCategoryWitnesses.length
      && objectCategoryWitnesses.every(witness => witness.canonicalResult
        && witness.authorizationStatus === "authorized" && witness.role === "object-complement")
      ? [...new Set(objectCategoryWitnesses.map(witness => witness.semanticCategory))] : null;
    const unlicensedObjectPrincipal = profileId === "object-license-categories"
      ? target.evaluateClassicalNahuatlClauseComplementation(objectRequest("change", { principalStem: "teci" })) : null;
    const objectLicenseRejectionObserved = unlicensedObjectPrincipal
      && unlicensedObjectPrincipal.authorizationStatus === "blocked"
      && unlicensedObjectPrincipal.blockReason === "principal-verbstem-not-licensed-for-object-complement-category";
    const objectCoverageComplete = profileId !== "object-license-categories"
      || (objectCategoriesObserved?.length === 4 && objectCategories.every(category => objectCategoriesObserved.includes(category))
        && objectLicenseRejectionObserved);
    const roleWitnesses = profileId === "complement-role-system"
      ? [result,
        summarize(target.evaluateClassicalNahuatlClauseComplementation(subjectRequest("identity"))),
        summarize(target.evaluateClassicalNahuatlClauseComplementation(adverbialRequest("beginning")))]
      : [];
    const rolesObserved = roleWitnesses.length && roleWitnesses.every(witness =>
      witness.canonicalResult && witness.authorizationStatus === "authorized")
      ? [...new Set(roleWitnesses.map(witness => witness.role))] : null;
    const roleCoverageComplete = profileId !== "complement-role-system"
      || (rolesObserved?.length === 3 && ["object-complement", "subject-complement", "adverbial-complement"]
        .every(role => rolesObserved.includes(role)));
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
        && (profileId !== "relational-adverbial-system" || relationalCoverageObserved)
        && (profileId !== "relational-lexical-pairing" || (relationalCoverageObserved && relationalPairRejectionObserved))
        && (profileId !== "daring-sequence" || (daringSubsequentObserved && daringOptativeObserved))
        && (profileId !== "beginning-neighbor-contrast" || beginningContrastObserved)
        && (!lexicalFamilyObservation || lexicalFamilyObserved)
        && (profileId !== "beginning-pehua" || beginningLexicalRestrictionObserved)
        && (profileId !== "coverage-mo-source-analysis" || (coverageObserved && moCrossReferenceBlocked))
        && (profileId !== "coverage-singular-animate" || singularAnimateCoverageObserved)
        && (profileId !== "coverage-abundant-agentive" || abundantCoverageObserved)
        && (profileId !== "coverage-moca" || coverageObserved)
        && (profileId !== "coverage-present-only" || coveragePresentRestrictionObserved)
        && (profileId !== "subject-state-manner-contrast" || mannerContrastObserved)
        && predicateCoverageComplete
        && adverbialCoverageComplete
        && subjectContactCoverageComplete
        && subjectCoverageComplete
        && objectCoverageComplete
        && roleCoverageComplete
        && profileId !== "relational-active-action-incorporation"
        && (profileId !== "object-material-transformation" || transformedSentenceWitness?.authorizationStatus === "authorized")
        && result.authorizationStatus === "authorized"
        && raw?.authorizationStatus === "blocked"
        && ordinaryRelationalImpostor?.authorizationStatus === "blocked"
        ? "authorized" : "blocked",
      ...(profileId === "relational-active-action-incorporation" ? {
        blockReason: "downstream-relational-active-action-witness-required",
      } : {}),
      ...(profileId === "object-material-transformation" && transformedSentenceWitness?.authorizationStatus !== "authorized" ? {
        blockReason: "downstream-material-transformation-witness-required",
      } : {}),
      result,
      ...(profileId === "relational-lexical-pairing" ? { mismatchedRelationalPairWitness } : {}),
      ...(profileId === "daring-sequence" ? { daringWitnesses } : {}),
      ...(beginningNeighborWitnesses ? { beginningNeighborWitnesses } : {}),
      ...(profileId === "beginning-pehua" ? { unlicensedBeginningWitness } : {}),
      ...(moSourceEvidence ? { moSourceEvidence, moCrossReferenceCounterwitness } : {}),
      ...(profileId === "coverage-singular-animate" ? { singularAnimateSource } : {}),
      ...(profileId === "coverage-abundant-agentive" ? { abundantOwnerhoodSource } : {}),
      ...(profileId === "coverage-present-only" ? {
        coverageFutureWitness,
        blockReason: "coverage-present-restriction-not-established",
      } : {}),
      ...(profileId === "subject-state-manner-contrast" ? { mannerContrastWitness } : {}),
      ...(predicateRole ? { predicateCategoryWitnesses } : {}),
      ...(profileId === "adverbial-family-system" ? { adverbialFamilyWitnesses } : {}),
      ...(profileId === "subject-contact-system" ? { subjectContactWitnesses } : {}),
      ...(profileId === "subject-semantic-system" ? { subjectCategoryWitnesses } : {}),
      ...(profileId === "object-license-categories" ? { objectCategoryWitnesses, unlicensedObjectPrincipal } : {}),
      ...(profileId === "complement-role-system" ? { roleWitnesses } : {}),
      analysis: {
        semanticBoundary: result.canonicalResult && result.authorizationStatus === "authorized"
          ? { role: result.role, semanticCategory: result.semanticCategory, contactKind: result.contactKind,
            principalSubjectReference: result.liveResult?.principalClause?.subject?.referenceId,
            complementSubjectReference: result.liveResult?.complementClause?.subject?.referenceId,
            complementPossessorReference: result.liveResult?.complementClause?.possessor?.referenceId } : null,
        ...facts,
        ...(profileId === "relational-adverbial-system" ? { relationalNncAdverbialComplementLicensed: relationalCoverageObserved === true } : {}),
        ...(profileId === "relational-lexical-pairing" ? {
          meaningCompatiblePairMustBeLexicallyLicensed: relationalCoverageObserved && relationalPairRejectionObserved,
          translationAnalogyAuthorizesPair: relationalPairRejectionObserved ? false : null,
        } : {}),
        ...(profileId === "daring-sequence" ? {
          daringSubsequentComplementLicensed: daringSubsequentObserved,
          optativeInsecurityLicensed: daringOptativeObserved,
          daringObservationScope: "present-future-and-optative-witnesses-not-exclusive-tense-rule",
        } : {}),
        ...(beginningNeighborWitnesses ? {
          beginningMayResemblePurposeOrConjunctionButIsNeither: beginningContrastObserved,
          beginningContrastObservationScope: "three-distinct-canonical-relations-not-an-english-translation-test",
        } : {}),
        ...(lexicalFamilyObservation ? { [lexicalFamilyObservation[1]]: lexicalFamilyObserved } : {}),
        ...(profileId === "beginning-pehua" ? { principalVerbstemConditionRetained: beginningLexicalRestrictionObserved } : {}),
        ...(moSourceEvidence ? {
          sourceCrossReferenceAuthorizesComplement: moCrossReferenceBlocked ? false : null,
          moSourceRetainedAsLexicalAnalysis: null,
          moSourceAnalysisStatus: "documentary-cross-reference-not-runtime-morph-analysis",
        } : {}),
        ...(profileId === "coverage-singular-animate" ? {
          coverageComplementNormallySingular: singularAnimateCoverageObserved === true,
          animateStemDoesNotForcePlural: singularAnimateCoverageObserved === true,
          coverageNumberObservationScope: "issued-singular-animate-example-not-universal-plural-prohibition",
        } : {}),
        ...(profileId === "coverage-abundant-agentive" ? {
          abundantOwnerhoodComplementLicensed: abundantCoverageObserved === true,
        } : {}),
        ...(profileId === "coverage-moca" ? { mocaCoverageComplementLicensed: coverageObserved === true } : {}),
        ...(profileId === "coverage-present-only" ? {
          mocaPrincipalPresentRestrictionRetained: null,
          presentRestrictionSourceEvidence: {
            sourceSection: "51.4.1",
            statement: "The verbstem is apparently limited to present-tense VNCs.",
            modality: "qualified-source-observation",
            runtimeAuthority: false,
          },
          presentRestrictionObservationScope: "issued-future-contradicts-categorical-runtime-exclusion-not-Andrews-qualified-observation-or-attested-usage",
          presentRestrictionWitnessStatus: coverageFutureWitness?.canonicalResult
            && coverageFutureWitness.authorizationStatus === "authorized"
            ? "contradicted-by-issued-future" : "unproven",
        } : {}),
        ...(profileId === "subject-state-manner-contrast" ? {
          subjectStateCentersOnPrincipalSubject: subjectStateObserved === true,
          adverbialMannerRemainsSeparate: mannerContrastObserved === true,
        } : {}),
        ...(predicateRole ? {
          [predicateRole === "object-complement" ? "substantivalAndAdjectivalNncComplementsLicensed"
            : "substantivalAndAdjectivalSubjectComplementsLicensed"]: predicateCoverageComplete,
          predicateCategoryCoverageStatus: predicateCoverageComplete ? "two-issued-source-examples" : "incomplete",
        } : {}),
        ...(profileId === "double-nucleus-complement" ? {
          complementUsesAdjoinedNucleus: separateNucleiObserved,
          incorporatedComplementRemainsSeparate: separateNucleiObserved
            && result.liveResult?.relationFrame?.incorporatedComplementAlternativeRemainsSeparate === true,
        } : {}),
        ...(profileId === "object-material-composition" ? {
          transformedSentenceUsesIssuedComposition: null,
          transformedSentenceWitnessStatus: "unproven-upstream-complement-only",
        } : {}),
        ...(profileId === "object-material-transformation" ? {
          transformedSentenceWitness,
          transformedSentenceUsesIssuedComposition: transformedSentenceWitness?.authorizationStatus === "authorized",
          transformedSentenceWitnessStatus: transformedSentenceWitness?.authorizationStatus || "unproven",
        } : {}),
        ...(objectObservation ? { [objectObservation[0]]: objectObservationSatisfied === true } : {}),
        ...(profileId === "designation-possessor-contact" ? {
          designationChangesToPossessorComplement: possessorDesignationObserved,
          possessiveNameUsesSpecificPossessor: possessorDesignationObserved
            // The recipe witnesses the specific third-person possessor ī-Ø
            // described in 51.2; its generic specificity field is unset.
            && result.liveResult?.principalClause?.possessor?.category === "3sg",
        } : {}),
        ...(subjectObservation ? { [subjectObservation[0]]: subjectObservationSatisfied === true } : {}),
        ...(profileId === "adverbial-family-system" ? {
          semanticBoundary: adverbialFamiliesObserved,
          adverbialComplementFamilyCount: adverbialFamiliesObserved?.length ?? null,
        } : {}),
        ...(profileId === "subject-contact-system" ? {
          semanticBoundary: subjectContactsObserved,
          subjectContactKindCount: subjectContactsObserved?.length ?? null,
        } : {}),
        ...(profileId === "subject-semantic-system" ? {
          semanticBoundary: subjectCategoriesObserved,
          subjectSemanticCategoryCount: subjectCategoriesObserved?.length ?? null,
        } : {}),
        ...(profileId === "object-license-categories" ? {
          semanticBoundary: objectCategoriesObserved,
          objectSemanticCategoryCount: objectCategoriesObserved?.length ?? null,
          objectComplementRequiresLicensedPrincipalVerbstem: objectLicenseRejectionObserved === true,
        } : {}),
        ...(profileId === "complement-role-system" ? {
          semanticBoundary: rolesObserved,
          complementRoleCount: rolesObserved?.length ?? null,
        } : {}),
        ...(profileId === "relational-active-action-incorporation" ? {
          // The existing recipe establishes complementation only. Neither
          // incorporation nor internal person separation has a witness yet.
          semanticBoundary: {
            observedRole: result.role,
            observedSemanticCategory: result.semanticCategory,
            downstreamIncorporationWitness: null,
            status: "unproven",
          },
          relationalComplementMayFeedActiveActionIncorporation: null,
          personDyadBlocksPossessorCommerce: null,
        } : {}),
        ...(profileId === "beginning-impersonal" ? {
          semanticBoundary: result.canonicalResult && result.authorizationStatus === "authorized"
            ? { role: result.role, semanticCategory: result.semanticCategory,
              principalVoice: result.liveResult?.principalClause?.voice,
              complementVoice: result.liveResult?.complementClause?.voice } : null,
          beginningImpersonalComplementLicensed: result.canonicalResult
            && result.authorizationStatus === "authorized"
            && result.semanticCategory === "beginning"
            && result.role === "adverbial-complement"
            && result.liveResult?.principalClause?.voice === "impersonal"
            && result.liveResult?.complementClause?.voice === "impersonal",
        } : {}),
        ...(profileId === "object-reflexive-contact" ? {
          semanticBoundary: result.canonicalResult && result.authorizationStatus === "authorized"
            ? {
              role: result.role,
              semanticCategory: result.semanticCategory,
              reflexiveObject: result.reflexiveObject,
              objectKinds: (result.liveResult?.principalClause?.objects || []).map(object => object.objectKind),
            } : null,
          reflexiveObjectComplementLicensed: result.canonicalResult
            && result.authorizationStatus === "authorized"
            && result.role === "object-complement"
            && result.reflexiveObject
            && (result.liveResult?.principalClause?.objects || []).some(object => object.objectKind === "reflexive"),
        } : {}),
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
