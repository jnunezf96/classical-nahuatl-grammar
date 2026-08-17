// Non-authorizing validation projection for the independently owned sentence-
// supplementation semantics. This module owns no Inventory atoms and defines
// no grammar. It selects typed coordinates, invokes the installed canonical
// runtime, and retains only runtime-emitted frames. Canvas examples, stored
// answers, curriculum metadata, and oracle declarations are never inputs.

import {
  createClassicalNahuatlSupplementationApi,
} from "./supplementation.mjs";

function cloneValue(value, seen = new WeakMap()) {
  if (!value || typeof value !== "object") return value;
  if (seen.has(value)) return seen.get(value);
  const clone = Array.isArray(value) ? [] : {};
  seen.set(value, clone);
  for (const [key, nested] of Object.entries(value)) {
    clone[key] = cloneValue(nested, seen);
  }
  return clone;
}

function deepFreeze(value, seen = new WeakSet()) {
  if (!value || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const nested of Object.values(value)) deepFreeze(nested, seen);
  return Object.freeze(value);
}

function frameOfKind(frame, kind) {
  return (frame?.operationFrames || []).find(candidate => candidate?.kind === kind) || null;
}

export function createClassicalSupplementationValidationSemanticOperationsApi(
  targetObject = globalThis,
) {
  const issuedFrames = new WeakSet();
  const supplementation = createClassicalNahuatlSupplementationApi(targetObject);
  let cachedSystemProjection = null;

  function buildVnc(stem, {
    subject = "3sg",
    mood = "indicative",
    valence = "intransitive",
    objectPerson = "",
    tense = "present",
    directionalPrefix = "",
    negative = false,
    antecessive = false,
    sentenceType = "assertion",
    verbClass = "A",
    objectRequests = [],
    construction = "",
    silentSpecificObject = false,
  } = {}) {
    return targetObject.evaluateClassicalNahuatlVncApplication({
      sourceStem: stem,
      verbClass,
      sourceValence: valence,
      sourceSubject: subject,
      subject,
      mood,
      tense,
      requestedDerivation: "direct",
      objectKind: valence === "specific-projective"
        ? "specific-projective"
        : valence === "intransitive" ? "" : "nonspecific-human",
      objectPerson,
      requestedVoice: "active",
      silentSpecificObject,
      ...(objectRequests.length ? { objectRequests } : {}),
      sentenceOptions: {
        directionalPrefix,
        negative,
        antecessive,
        sentenceAntecessive: antecessive,
        sentenceType,
        construction,
        outsidePrefixes: antecessive ? ["ō#"] : [],
      },
    });
  }

  function buildNnc(stem, {
    subject = "3sg",
    nounClass = "zero",
    animacy = "animate",
    pluralConnector = "",
  } = {}) {
    return targetObject.buildClassicalNahuatlAbsolutiveNncFrame(stem, {
      subject,
      nounClass,
      animacy,
      ...(pluralConnector ? { pluralConnector } : {}),
    });
  }

  function envelope(frame, options = {}) {
    return supplementation.buildClassicalNahuatlSupplementationClauseEnvelope(frame, options);
  }

  function relation(principalClause, supplementClause, options = {}) {
    return supplementation.evaluateClassicalNahuatlSupplementationOperation({
      operationKind: "relation",
      principalClause,
      supplementClause,
      options,
    });
  }

  function discourse(options = {}) {
    return supplementation.buildClassicalNahuatlDiscourseSourceContextFrame(options);
  }

  function context(kind, referenceId, options = {}) {
    return supplementation.buildClassicalNahuatlSupplementationContextRecord({
      kind,
      referenceId,
      ...options,
    });
  }

  function buildSystemProjection() {
    const principal = envelope(buildVnc("cuīca", { subject: "1sg" }), {
      referenceId: "speaker",
      subjectReferenceId: "speaker",
      sourceStem: "cuīca",
      mood: "indicative",
      tense: "present",
    });
    const personalSupplement = envelope(buildNnc("Petoloh", { subject: "1sg" }), {
      referenceId: "speaker",
      subjectReferenceId: "speaker",
      sourceStem: "Petoloh",
    });
    const shared = relation(principal, personalSupplement, {
      referenceMode: "shared",
      headRole: "subject",
      supplementContactRole: "subject",
      order: "principal-first",
    });
    const topic = relation(principal, personalSupplement, {
      referenceMode: "shared",
      headRole: "subject",
      supplementContactRole: "subject",
      order: "supplement-first",
      adjunctor: "in",
      commentEmphaticCa: true,
    });

    const objectPrincipal = envelope(buildVnc("itta", {
      subject: "3sg",
      valence: "specific-projective",
      objectPerson: "1sg",
    }), {
      referenceId: "viewer",
      subjectReferenceId: "viewer",
      objectReferenceId: "speaker",
      sourceStem: "itta",
    });
    const object = relation(objectPrincipal, personalSupplement, {
      referenceMode: "shared",
      headRole: "object",
      supplementContactRole: "subject",
    });
    const possessiveClause = targetObject.buildClassicalNahuatlPossessiveNncFrame("cal", {
      subject: "3sg",
      possessor: "1sg",
      singularConnector: "0",
      nounstemRelationKind: "nonrelational",
      animacy: "nonanimate",
    });
    const possessivePrincipal = envelope(possessiveClause, {
      referenceId: "house",
      possessorReferenceId: "speaker",
      sourceStem: "cal",
    });
    const possessor = relation(possessivePrincipal, personalSupplement, {
      referenceMode: "shared",
      headRole: "possessor",
      supplementContactRole: "subject",
    });
    const locativeHavePrincipal = envelope(buildVnc("ca-h", {
      subject: "3sg",
      directionalPrefix: "on",
    }), { referenceId: "owner" });
    const locativeHaveSupplement = envelope(possessiveClause, {
      referenceId: "owner",
      subjectReferenceId: "owner",
      possessorReferenceId: "speaker",
      sourceStem: "cal",
    });
    const locativeHave = relation(locativeHavePrincipal, locativeHaveSupplement, {
      referenceMode: "shared",
      headRole: "subject",
      supplementContactRole: "subject",
    });
    const accompanyingPossessionCompound =
      targetObject.evaluateClassicalNahuatlLateVncDerivation({
        sourceStem: "ca",
        sourceValence: "intransitive",
        verbClass: "A",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        lateOperation: "compound",
        lateVariant: "connective-t",
        compoundMatrixStem: "nemi",
      });
    const accompanyingPossessionPrincipal = envelope(
      accompanyingPossessionCompound,
      {
        referenceId: "shield",
        subjectReferenceId: "shield",
      },
    );
    const accompanyingPossessionNnc =
      targetObject.buildClassicalNahuatlPossessiveNncFrame("chīmal", {
        subject: "3sg",
        possessor: "1sg",
        singularConnector: "0",
        nounstemRelationKind: "nonrelational",
        animacy: "nonanimate",
      });
    const accompanyingPossessionSupplement = envelope(
      accompanyingPossessionNnc,
      {
        referenceId: "shield",
        subjectReferenceId: "shield",
        possessorReferenceId: "speaker",
      },
    );
    const accompanyingPossession = relation(
      accompanyingPossessionPrincipal,
      accompanyingPossessionSupplement,
      {
        referenceMode: "shared",
        headRole: "subject",
        supplementContactRole: "subject",
        order: "supplement-first",
      },
    );

    const ambiguousPrincipal = envelope(buildVnc("itta", {
      subject: "3sg",
      valence: "specific-projective",
      objectPerson: "3sg",
    }), {
      referenceId: "third",
      subjectReferenceId: "third",
      objectReferenceId: "third",
      sourceStem: "itta",
    });
    const ambiguousSupplement = envelope(buildNnc("Petoloh", { subject: "3sg" }), {
      referenceId: "third",
    });
    const contactAmbiguity = relation(ambiguousPrincipal, ambiguousSupplement, {
      referenceMode: "shared",
      headRole: "subject",
      supplementContactRole: "subject",
      retainContactAlternatives: true,
    });

    const shortPronominalClause = envelope(
      targetObject.buildClassicalNahuatlPronominalNncFrame({
        subtype: "personal-simple",
        subject: "1sg",
      }),
      { referenceId: "speaker" },
    );
    const shortPronominal = relation(principal, shortPronominalClause, {
      referenceMode: "shared",
      headRole: "subject",
      supplementContactRole: "subject",
    });

    const friend = envelope(buildNnc("icnīuh", { subject: "1sg" }), {
      referenceId: "speaker",
    });
    const nested = relation(friend, personalSupplement, {
      referenceMode: "shared",
      headRole: "subject",
    });
    const recursive = relation(principal, friend, {
      referenceMode: "shared",
      headRole: "subject",
      supplementContinuationFrames: [nested],
    });
    const discontinuous = relation(principal, personalSupplement, {
      referenceMode: "shared",
      headRole: "subject",
      order: "discontinuous",
      interveningClauses: [friend],
    });

    const integratedPrincipal = envelope(buildVnc("cuīca", {
      subject: "1sg",
      tense: "preterit",
      antecessive: true,
    }), { referenceId: "speaker", sourceStem: "cuīca" });
    const integrated = relation(integratedPrincipal, personalSupplement, {
      referenceMode: "shared",
      headRole: "subject",
      order: "supplement-first",
      integratedAntecessive: true,
    });
    const who = envelope(targetObject.buildClassicalNahuatlPronominalNncFrame({
      subtype: "interrogative",
      interrogativeKind: "āc",
      subject: "3sg",
    }), { referenceId: "third" });
    const dies = envelope(buildVnc("miqui", { subject: "3sg" }), {
      referenceId: "third",
    });
    const informationQuestion = relation(dies, who, {
      referenceMode: "shared",
      headRole: "subject",
      order: "supplement-first",
      informationQuestion: true,
    });
    const demonstrative = envelope(targetObject.buildClassicalNahuatlPronominalNncFrame({
      subtype: "demonstrative",
      demonstrative: "īn",
      subject: "3sg",
    }), { referenceId: "third" });
    const demonstrativeSupplement = relation(dies, demonstrative, {
      referenceMode: "shared",
      headRole: "subject",
      adjunctor: "in",
      fuseDemonstrativeAdjunctor: true,
    });

    const pluralPrincipal = envelope(buildVnc("miqui", { subject: "3pl" }), {
      referenceId: "group",
    });
    const collectiveClause = envelope(buildNnc("mochi", { subject: "3sg" }), {
      referenceId: "group",
    });
    const collective = relation(pluralPrincipal, collectiveClause, {
      referenceMode: "shared",
      headRole: "subject",
      agreementException: "collective",
    });
    const partnerContext = discourse({ namedPartnerKnownParticipant: "speaker" });
    const partnerClause = envelope(buildNnc("icnīuh", { subject: "3sg" }), {
      referenceId: "named-third",
      contextRecords: [context("named-partner", "group", {
        discourseSourceContextFrame: partnerContext,
        groupReferenceId: "group",
        namedPartnerReferenceId: "named-third",
        speakerOrAddresseeReferenceId: "speaker",
      })],
    });
    const namedPartner = relation(pluralPrincipal, partnerClause, {
      referenceMode: "shared",
      headRole: "subject",
      agreementException: "named-partner",
    });
    const menClause = envelope(buildNnc("oquich", {
      subject: "1pl",
      nounClass: "tli",
      pluralConnector: "t-in",
    }), {
      referenceId: "group",
      contextRecords: [context("male-bonding", "group", {
        discourseSourceContextFrame: discourse({
          speakerGender: "male",
          speakerGroupMembership: "member",
        }),
      })],
    });
    const maleBonding = relation(pluralPrincipal, menClause, {
      referenceMode: "shared",
      headRole: "subject",
      agreementException: "male-bonding",
    });

    const ayiClause = envelope(buildVnc("āyi", {
      subject: "3sg",
      valence: "specific-projective",
      objectPerson: "3sg",
      silentSpecificObject: true,
      tense: "preterit",
      verbClass: "B",
    }), {
      referenceId: "agent",
      subjectReferenceId: "agent",
      objectReferenceId: "patient",
      sourceStem: "āyi",
      silentObjectKind: "ayi-specific-object",
      tense: "preterit",
    });
    const patient = envelope(buildNnc("Petoloh", { subject: "3sg" }), {
      referenceId: "patient",
    });
    const ayi = relation(ayiClause, patient, {
      referenceMode: "shared",
      headRole: "object",
      supplementContactRole: "subject",
    });
    const ayiEvidence = relation(
      ayiClause,
      envelope(buildNnc("tlācatl", { subject: "3sg" }), {
        referenceId: "agent",
      }),
      {
        referenceMode: "shared",
        headRole: "subject",
        supplementContactRole: "subject",
      },
    );

    const optativePrincipal = envelope(buildVnc("cāhua", {
      subject: "2sg",
      mood: "optative",
      tense: "nonpast",
    }), { referenceId: "addressee" });
    const secondPersonSubject = envelope(buildNnc("pil", {
      subject: "2sg",
      nounClass: "tli",
    }), { referenceId: "addressee" });
    const commandSubject = relation(optativePrincipal, secondPersonSubject, {
      referenceMode: "shared",
      headRole: "subject",
    });
    const maleContext = discourse({ speakerGender: "male" });
    const femaleContext = discourse({ speakerGender: "female" });
    const pilli = envelope(buildNnc("pil", { subject: "3sg", nounClass: "tli" }), {
      referenceId: "addressee",
    });
    const vocativeMale = supplementation.evaluateClassicalNahuatlSupplementationOperation({
      operationKind: "vocative",
      nncClause: pilli,
      options: { discourseSourceContextFrame: maleContext },
    });
    const vocativeFemale = supplementation.evaluateClassicalNahuatlSupplementationOperation({
      operationKind: "vocative",
      nncClause: pilli,
      options: { discourseSourceContextFrame: femaleContext },
    });
    const pluralVocativeClause = envelope(buildNnc("pil", {
      subject: "3pl",
      nounClass: "tli",
      pluralConnector: "t-in",
    }), { referenceId: "addressees" });
    const vocativePlural = supplementation.evaluateClassicalNahuatlSupplementationOperation({
      operationKind: "vocative",
      nncClause: pluralVocativeClause,
      options: { discourseSourceContextFrame: maleContext, silentPluralIn: true },
    });

    const vncSupplementClause = envelope(buildVnc("miqui", { subject: "1sg" }), {
      referenceId: "speaker",
    });
    const vncSupplement = relation(principal, vncSupplementClause, {
      referenceMode: "shared",
      headRole: "subject",
      adjunctor: "in",
    });
    const vncObjectSupplement = relation(objectPrincipal, vncSupplementClause, {
      referenceMode: "shared",
      headRole: "object",
      supplementContactRole: "subject",
      adjunctor: "in",
    });
    const vncPossessorSupplement = relation(possessivePrincipal, vncSupplementClause, {
      referenceMode: "shared",
      headRole: "possessor",
      supplementContactRole: "subject",
      adjunctor: "in",
    });

    const demonstrativePluralClause = envelope(targetObject.buildClassicalNahuatlPronominalNncFrame({
      subtype: "demonstrative",
      demonstrative: "īn",
      subject: "3pl",
    }), { referenceId: "group" });
    const demonstrativePluralPrincipal = envelope(buildVnc("i-ā", {
      subject: "3pl",
      verbClass: "C",
      construction: "pronominal-nnc",
    }), { referenceId: "group" });
    const demonstrativePlural = relation(
      demonstrativePluralPrincipal,
      demonstrativePluralClause,
      { referenceMode: "shared", headRole: "subject" },
    );
    const demonstrativePluralCooperation = frameOfKind(
      demonstrativePlural,
      "classical-nahuatl-supplementation-pronominal-plural-frame",
    );
    const acClause = envelope(targetObject.buildClassicalNahuatlPronominalNncFrame({
      subtype: "interrogative",
      interrogativeKind: "āc",
      subject: "3sg",
    }), { referenceId: "group" });
    const acPrincipal = envelope(buildVnc("i-ā", {
      subject: "1pl",
      verbClass: "C",
      construction: "pronominal-nnc",
    }), { referenceId: "group" });
    const acPlural = relation(acPrincipal, acClause, {
      referenceMode: "shared",
      headRole: "subject",
    });
    const acCooperation = frameOfKind(
      acPlural,
      "classical-nahuatl-supplementation-pronominal-plural-frame",
    );
    const compoundVncs = [
      ["ā-qu-0-i-h", "2pl"],
      ["tl-e-0-i-h", "1pl"],
      ["cā-tl-e-0-i-h", "3pl"],
      ["cā-tl-0-i-h", "2sg"],
    ].map(([stem, subject]) => buildVnc(stem, {
      subject,
      tense: "preterit",
      verbClass: "C",
    }));

    const wishPrincipal = envelope(buildVnc("nequi", {
      subject: "3sg",
      valence: "specific-projective",
      objectPerson: "3sg",
    }), {
      referenceId: "wisher",
      objectReferenceId: "proposition",
    });
    const futureWish = envelope(buildVnc("yā", { subject: "1pl", tense: "future" }), {
      referenceId: "proposition",
      sentenceKind: "assertion",
    });
    const includedWish = relation(wishPrincipal, futureWish, {
      referenceMode: "included",
      headRole: "object",
      wishRealizability: "realizable",
      adjunctor: "in",
    });
    const truth = envelope(buildNnc("nelli", { subject: "3sg" }), {
      referenceId: "event",
    });
    const occurred = envelope(buildVnc("cuil-tonoh", {
      subject: "1pl",
      tense: "preterit",
      antecessive: true,
    }), { referenceId: "event", subjectReferenceId: "group" });
    const includedAntecessive = relation(truth, occurred, {
      referenceMode: "included",
      headRole: "subject",
      includedAntecessiveJump: true,
    });

    const semanticPrincipal = (stem, { headRole = "object", subject = "3sg" } = {}) => envelope(
      buildVnc(stem, {
        subject,
        valence: headRole === "object" ? "specific-projective" : "intransitive",
        objectPerson: headRole === "object" ? "3sg" : "",
      }),
      {
        referenceId: headRole === "subject" ? "proposition" : "speaker",
        subjectReferenceId: headRole === "subject" ? "proposition" : "speaker",
        objectReferenceId: "proposition",
      },
    );
    const presentProposition = envelope(buildVnc("huītz", { subject: "3sg" }), {
      referenceId: "proposition",
      sentenceKind: "assertion",
    });
    const questionProposition = envelope(buildVnc("huītz", {
      subject: "3sg",
      sentenceType: "yes-no-question",
    }), { referenceId: "proposition", sentenceKind: "question" });
    const speech = relation(semanticPrincipal("ihtoa"), presentProposition, {
      referenceMode: "included",
      headRole: "object",
      speechDirectness: "direct",
    });
    const perception = relation(semanticPrincipal("itta"), presentProposition, {
      referenceMode: "included",
      headRole: "object",
    });
    const cognition = relation(semanticPrincipal("mati"), questionProposition, {
      referenceMode: "included",
      headRole: "object",
    });
    const affect = relation(semanticPrincipal("pactia", { headRole: "subject" }), presentProposition, {
      referenceMode: "included",
      headRole: "subject",
    });

    const principalWithObject = stem => envelope(buildVnc(stem, {
      subject: "1sg",
      valence: "specific-projective",
      objectPerson: "3sg",
    }), {
      referenceId: "speaker",
      subjectReferenceId: "speaker",
      objectReferenceId: "event",
    });
    const futureCoreferential = envelope(buildVnc("yā", {
      subject: "1sg",
      tense: "future",
    }), {
      referenceId: "event",
      subjectReferenceId: "speaker",
      sentenceKind: "assertion",
    });
    const coreferentialFuture = relation(principalWithObject("mati"), futureCoreferential, {
      referenceMode: "included",
      headRole: "object",
    });
    const nequiBoundary = relation(principalWithObject("nequi"), futureCoreferential, {
      referenceMode: "included",
      headRole: "object",
      wishRealizability: "realizable",
    });
    const causing = relation(principalWithObject("chihua"), envelope(buildVnc("yā", {
      subject: "1sg",
      tense: "future",
      sentenceType: "command",
    }), {
      referenceId: "event",
      subjectReferenceId: "speaker",
      sentenceKind: "command",
    }), { referenceMode: "included", headRole: "object" });
    const requesting = relation(principalWithObject("ihtlani"), envelope(buildVnc("yā", {
      subject: "1sg",
      tense: "future",
      sentenceType: "wish",
    }), {
      referenceId: "event",
      subjectReferenceId: "speaker",
      sentenceKind: "wish",
    }), { referenceMode: "included", headRole: "object" });

    const reported = envelope(buildVnc("yā", { subject: "3pl", tense: "preterit" }), {
      referenceId: "reported-event",
      sentenceKind: "assertion",
    });
    const reporter = envelope(buildVnc("il", {
      subject: "3sg",
      tense: "preterit",
      valence: "specific-projective",
      objectPerson: "3sg",
    }), {
      referenceId: "rumor-speaker",
      subjectReferenceId: "rumor-speaker",
      objectReferenceId: "reported-event",
    });
    const rumoredReport = supplementation.evaluateClassicalNahuatlSupplementationOperation({
      operationKind: "rumored-report",
      principalClause: reporter,
      supplementClause: reported,
      options: { mach: true, fuseQuilMach: true },
    });

    const deletedCah = envelope(buildVnc("ca-h", { subject: "3sg" }), {
      referenceId: "home",
    });
    const home = envelope(buildNnc("chān", { subject: "3sg" }), {
      referenceId: "home",
    });
    const placeClause = envelope(buildNnc("cāmpa", { subject: "3sg" }), {
      referenceId: "place",
    });
    const placeModifier = supplementation.buildClassicalNahuatlSupplementationAdverbialModifierFrame(
      placeClause,
      { adverbialRole: "place" },
    );
    const deletedCahPrincipal = supplementation.evaluateClassicalNahuatlSupplementationOperation({
      operationKind: "deleted-principal",
      visiblePrincipalClause: placeModifier,
      deletedPrincipalClause: deletedCah,
      supplementClause: home,
      options: { deletionKind: "cah-proxy" },
    });

    const saying = envelope(buildVnc("ilhuia", {
      subject: "1sg",
      valence: "multiple-object",
      objectRequests: [{
        objectId: "reported-supplement",
        objectKind: "specific-projective",
        objectPerson: "3sg",
        governor: "directive",
        derivationalLevel: 1,
      }, {
        objectId: "addressees",
        objectKind: "specific-projective",
        objectPerson: "3pl",
        governor: "applicative",
        derivationalLevel: 2,
      }],
    }), {
      referenceId: "speaker",
      subjectReferenceId: "speaker",
      objectReferenceIds: {
        "reported-supplement": "reported-event",
        addressees: "addressees",
      },
    });
    const deletedSupplementation = relation(saying, reported, {
      referenceMode: "included",
      headRole: "object",
      principalObjectId: "reported-supplement",
      speechDirectness: "direct",
    });
    const answer = envelope(buildVnc("nānquilia", {
      subject: "1sg",
      valence: "specific-projective",
      objectPerson: "3pl",
    }), {
      referenceId: "speaker",
      subjectReferenceId: "speaker",
      objectReferenceId: "addressees",
    });
    const deletedSaying = supplementation.evaluateClassicalNahuatlSupplementationOperation({
      operationKind: "deleted-principal",
      visiblePrincipalClause: answer,
      deletedPrincipalClause: saying,
      supplementClause: reported,
      options: {
        deletionKind: "saying",
        speechDirectness: "direct",
        deletedSupplementationFrame: deletedSupplementation,
      },
    });

    const operationRequest = supplementation.buildClassicalNahuatlSupplementationOperationRequest({
      operationKind: "relation",
      principalClause: principal,
      supplementClause: personalSupplement,
      options: { referenceMode: "shared", headRole: "subject" },
    });
    const paradigm = supplementation.evaluateClassicalNahuatlSupplementationOperationParadigm([
      {
        coordinateId: "shared",
        operationKind: "relation",
        principalClause: principal,
        supplementClause: personalSupplement,
        options: { referenceMode: "shared", headRole: "subject" },
      },
      {
        coordinateId: "included",
        operationKind: "relation",
        principalClause: wishPrincipal,
        supplementClause: futureWish,
        options: {
          referenceMode: "included",
          headRole: "object",
          wishRealizability: "realizable",
        },
      },
    ]);

    // Retain only the typed coordinates needed by the independent owner
    // declarations.  The canonical frames above remain the source of every
    // value, but copying their complete VNC/NNc machinery graphs into every
    // proof result would turn a small semantic assertion into a many-megabyte
    // stored result and would make proof aggregation scale with implementation
    // detail rather than with atom obligations.
    const compactClause = clause => ({
      kind: clause?.kind,
      authorizationStatus: clause?.authorizationStatus,
      unitKind: clause?.unitKind,
      sourceStem: clause?.sourceStem,
      antecessiveOrder: clause?.antecessiveOrder,
      silentSpecificObjectAuthorized: clause?.silentSpecificObjectAuthorized,
      demonstrativeKind: clause?.demonstrativeKind,
      subject: clause?.subject ? { category: clause.subject.category } : null,
    });
    const compactRelation = frame => ({
      kind: frame?.kind,
      authorizationStatus: frame?.authorizationStatus,
      formulaStringAuthority: frame?.formulaStringAuthority,
      principalClause: compactClause(frame?.principalClause),
      supplementClause: compactClause(frame?.supplementClause),
      referenceFrame: cloneValue(frame?.referenceFrame),
      operationFrames: cloneValue(frame?.operationFrames),
      supplementContinuationFrames: (frame?.supplementContinuationFrames || [])
        .map(compactClause),
    });
    const compactVocative = frame => ({
      kind: frame?.kind,
      authorizationStatus: frame?.authorizationStatus,
      speakerGender: frame?.speakerGender,
      prosody: frame?.prosody,
      operations: [...(frame?.operations || [])],
      surfaceRealization: frame?.surfaceRealization,
    });

    const projection = deepFreeze({
      kind: "classical-nahuatl-supplementation-validation-frame",
      authorizationStatus: shared.authorizationStatus === "authorized"
        ? "authorized"
        : "blocked",
      blockReason: shared.authorizationStatus === "authorized"
        ? ""
        : shared.blockReason,
      typedFrameAuthority: true,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      storedExampleAuthority: false,
      curriculumMetadataAuthority: false,
      operationRequest: { operationKind: operationRequest.operationKind },
      paradigm: { scalarBuilder: paradigm.scalarBuilder },
      shared: compactRelation(shared),
      topic: compactRelation(topic),
      object: compactRelation(object),
      possessor: compactRelation(possessor),
      locativeHave: compactRelation(locativeHave),
      accompanyingPossession: compactRelation(accompanyingPossession),
      contactAmbiguity: compactRelation(contactAmbiguity),
      shortPronominal: compactRelation(shortPronominal),
      recursive: compactRelation(recursive),
      discontinuous: compactRelation(discontinuous),
      integrated: compactRelation(integrated),
      informationQuestion: compactRelation(informationQuestion),
      demonstrativeSupplement: compactRelation(demonstrativeSupplement),
      collective: compactRelation(collective),
      namedPartner: compactRelation(namedPartner),
      maleBonding: compactRelation(maleBonding),
      ayi: compactRelation(ayi),
      ayiEvidence: compactRelation(ayiEvidence),
      commandSubject: compactRelation(commandSubject),
      vocativeMale: compactVocative(vocativeMale),
      vocativeFemale: compactVocative(vocativeFemale),
      vocativePlural: compactVocative(vocativePlural),
      vncSupplement: compactRelation(vncSupplement),
      vncObjectSupplement: compactRelation(vncObjectSupplement),
      vncPossessorSupplement: compactRelation(vncPossessorSupplement),
      demonstrativePluralCooperation: cloneValue(demonstrativePluralCooperation),
      demonstrativePlural: compactRelation(demonstrativePlural),
      acCooperation: cloneValue(acCooperation),
      acPlural: compactRelation(acPlural),
      compoundVncs: compoundVncs.map(frame => ({
        authorizationStatus: frame?.authorizationStatus,
        normalizedRequest: { sourceStem: frame?.normalizedRequest?.sourceStem },
      })),
      includedWish: compactRelation(includedWish),
      includedAntecessive: compactRelation(includedAntecessive),
      speech: compactRelation(speech),
      perception: compactRelation(perception),
      cognition: compactRelation(cognition),
      affect: compactRelation(affect),
      coreferentialFuture: compactRelation(coreferentialFuture),
      nequiBoundary: compactRelation(nequiBoundary),
      causing: compactRelation(causing),
      requesting: compactRelation(requesting),
      rumoredReport: {
        kind: rumoredReport?.kind,
        authorizationStatus: rumoredReport?.authorizationStatus,
        formulaStringAuthority: rumoredReport?.formulaStringAuthority,
        principalClause: compactClause(rumoredReport?.principalClause),
        supplementClause: compactClause(rumoredReport?.supplementClause),
      },
      deletedCahPrincipal: {
        deletionKind: deletedCahPrincipal?.deletionKind,
        authorizationStatus: deletedCahPrincipal?.authorizationStatus,
        deletedPrincipalClause: compactClause(deletedCahPrincipal?.deletedPrincipalClause),
      },
      deletedSaying: {
        deletionKind: deletedSaying?.deletionKind,
        authorizationStatus: deletedSaying?.authorizationStatus,
      },
      semanticFacts: {
        sharedReferenceModes: ["shared", "included"],
        headRoles: ["subject", "object", "possessor"],
        clauseKinds: ["nnc", "vnc"],
        shortPronominalStandaloneAllowed: false,
        constituentOrderIsCurriculumAuthority: false,
        completeClauseStatusPreserved: true,
        sourceExamplesAreRuntimeAuthority: false,
      },
      extractedFrames: {
        recursiveGraph: cloneValue(frameOfKind(
          recursive,
          "classical-nahuatl-supplementation-recursive-clause-graph-frame",
        )),
        topicOrder: cloneValue(frameOfKind(
          topic,
          "classical-nahuatl-supplementation-order-frame",
        )),
        topicAdjunctor: cloneValue(frameOfKind(
          topic,
          "classical-nahuatl-supplementation-adjunctor-frame",
        )),
        demonstrativeAdjunctor: cloneValue(frameOfKind(
          demonstrativeSupplement,
          "classical-nahuatl-supplementation-adjunctor-frame",
        )),
        integratedAntecessive: cloneValue(frameOfKind(
          integrated,
          "classical-nahuatl-supplementation-integrated-antecessive-frame",
        )),
        question: cloneValue(frameOfKind(
          informationQuestion,
          "classical-nahuatl-supplementation-information-question-frame",
        )),
        commandSubject: cloneValue(frameOfKind(
          commandSubject,
          "classical-nahuatl-supplementation-command-subject-frame",
        )),
        ayi: cloneValue(frameOfKind(
          ayiEvidence,
          "classical-nahuatl-ayi-silent-object-frame",
        )),
        have: cloneValue(frameOfKind(
          locativeHave,
          "classical-nahuatl-supplementation-have-frame",
        )),
        accompanyingPossession: cloneValue(frameOfKind(
          accompanyingPossession,
          "classical-nahuatl-accompanying-possession-frame",
        )),
        contactAlternatives: cloneValue(frameOfKind(
          contactAmbiguity,
          "classical-nahuatl-supplementation-contact-alternatives-frame",
        )),
        shortPronominal: cloneValue(frameOfKind(
          shortPronominal,
          "classical-nahuatl-short-pronominal-boundary-frame",
        )),
        includedAntecessive: cloneValue(frameOfKind(
          includedAntecessive,
          "classical-nahuatl-supplementation-included-antecessive-jump-frame",
        )),
        wishPolicy: cloneValue(frameOfKind(
          includedWish,
          "classical-nahuatl-supplementation-complement-policy-frame",
        )),
        speechPolicy: cloneValue(frameOfKind(
          speech,
          "classical-nahuatl-supplementation-complement-policy-frame",
        )),
        perceptionPolicy: cloneValue(frameOfKind(
          perception,
          "classical-nahuatl-supplementation-complement-policy-frame",
        )),
        cognitionPolicy: cloneValue(frameOfKind(
          cognition,
          "classical-nahuatl-supplementation-complement-policy-frame",
        )),
        affectPolicy: cloneValue(frameOfKind(
          affect,
          "classical-nahuatl-supplementation-complement-policy-frame",
        )),
        causingPolicy: cloneValue(frameOfKind(
          causing,
          "classical-nahuatl-supplementation-complement-policy-frame",
        )),
        requestingPolicy: cloneValue(frameOfKind(
          requesting,
          "classical-nahuatl-supplementation-complement-policy-frame",
        )),
        coreferentialFuture: cloneValue(frameOfKind(
          coreferentialFuture,
          "classical-nahuatl-supplementation-coreferential-future-frame",
        )),
        nequiBoundary: cloneValue(frameOfKind(
          nequiBoundary,
          "classical-nahuatl-supplementation-coreferential-future-frame",
        )),
      },
    });
    issuedFrames.add(projection);
    return projection;
  }

  function buildClassicalNahuatlSupplementationValidationFrame() {
    if (!cachedSystemProjection) cachedSystemProjection = buildSystemProjection();
    return cachedSystemProjection;
  }

  function isClassicalNahuatlSupplementationValidationFrame(frame = null) {
    return Boolean(
      frame
      && issuedFrames.has(frame)
      && frame.kind === "classical-nahuatl-supplementation-validation-frame"
      && frame.authorizationStatus === "authorized"
      && frame.typedFrameAuthority === true
      && frame.formulaStringAuthority === false
      && frame.surfaceStringAuthority === false
      && frame.storedExampleAuthority === false
      && frame.curriculumMetadataAuthority === false
      && Object.isFrozen(frame)
    );
  }

  return Object.freeze({
    buildClassicalNahuatlSupplementationValidationFrame,
    isClassicalNahuatlSupplementationValidationFrame,
  });
}
