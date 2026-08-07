// Non-authorizing live validation projection for the separately owned
// adjectival-source, adjectival-function, and multiple-nucleus modification
// mechanisms indexed by Andrews Lessons 40-43. It owns no Inventory atom and
// stores no Canvas answer. Every positive and negative grammatical witness is
// emitted by the installed canonical typed runtime.

function deepFreeze(value, seen = new WeakSet()) {
  if (!value || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const nested of Object.values(value)) deepFreeze(nested, seen);
  return Object.freeze(value);
}

function compactModification(runtime, frame) {
  return {
    authorizationStatus: frame?.authorizationStatus || "blocked",
    blockReason: frame?.blockReason || "",
    canonicalResult: runtime.isClassicalNahuatlResultFrame?.(frame) === true,
    operationKind: frame?.operationKind || "",
    topology: frame?.selection?.topology || "",
    order: frame?.selection?.order || "",
    adjunctor: frame?.selection?.adjunctor || "",
    linkRole: frame?.selection?.linkRole || "",
    modifierLinkRoles: frame?.modifierLinkRoles || [],
    compoundHeadTarget: frame?.selection?.compoundHeadTarget || "",
    modifierClauseType: frame?.derived?.modifierClauseType || "",
    headClauseType: frame?.derived?.headClauseType || "",
    compositionScope: frame?.derived?.compositionScope || "",
    ambiguityType: frame?.derived?.ambiguityType || "",
    exceptionProfile: frame?.derived?.exceptionProfile || "",
    recursionDepth: frame?.derived?.recursionDepth || "",
    headRank: frame?.derived?.headRank || "",
    modifierRank: frame?.derived?.modifierRank || "",
    compoundHead: frame?.derived?.compoundHead === true,
    discourseSourceContextPresent:
      frame?.derived?.discourseSourceContextPresent === true,
    formulaGeneratedIndependently:
      frame?.formulaProjection?.derivedFromWrittenProjection === false,
    writtenGeneratedIndependently:
      frame?.writtenProjection?.derivedFromFormulaProjection === false,
    scalarEvaluatorIdentity: frame?.scalarEvaluatorIdentity || "",
    callerSuppliedAuthorityAccepted:
      frame?.callerSuppliedAuthorityAccepted === true,
  };
}

function issueNnc(runtime, stem, subject = "3sg", options = {}) {
  const frame = runtime.buildClassicalNahuatlAbsolutiveNncFrame(stem, {
    subject,
    nounClass: options.nounClass || "zero",
    animacy: options.animacy || "animate",
    ...(options.pluralConnector
      ? { pluralConnector: options.pluralConnector } : {}),
  });
  const receipt = runtime.executeClassicalGrammarApplicationRequest({
    operationId: "nnc:sentence-surface",
    outputKind: "scalar",
    args: [frame.nncSlotFrame, {
      sentenceType: "assertion",
      polarity: "positive",
    }],
  });
  return receipt?.canonicalResult || receipt;
}

function issuePronominal(runtime, stem, subject = "3sg", sourceParts = {}) {
  const source = runtime.buildClassicalNahuatlPronominalNncSourceFrame({
    stem,
    ...sourceParts,
  });
  const operation = runtime.buildClassicalNahuatlPronominalNncOperationFrame(
    source,
    {
      subject,
      clausePosition: "initial",
      adjunctorInMode: "none",
      sentenceType: "statement",
      polarity: "positive",
    },
  );
  return runtime.requestClassicalPronominalNncResult(source, operation);
}

function issueQuantitive(runtime, subject = "1pl") {
  const source = runtime.buildClassicalNahuatlPronominalNncSourceFrame({
    stem: "miye-c",
    embedStem: "miye",
    matrixStem: "c",
  });
  const operation = runtime.buildClassicalNahuatlPronominalNncOperationFrame(
    source,
    {
      subject,
      clausePosition: "initial",
      adjunctorInMode: "none",
      sentenceType: "statement",
      polarity: "positive",
    },
  );
  return runtime.requestClassicalPronominalNncResult(source, operation);
}

function issueCardinal(runtime, overrides = {}) {
  return runtime.requestClassicalNominalConstructionResult({
    constructionKind: "cardinal-numeral-nnc",
    value: 1,
    classifier: "basic",
    countKind: "ordinary",
    subject: "3common",
    state: "absolutive",
    animacy: "nonanimate",
    ...overrides,
  });
}

function issueMeasure(runtime) {
  return runtime.requestClassicalNominalConstructionResult({
    constructionKind: "cardinal-numeral-nnc",
    value: 1,
    classifier: "measure",
    countKind: "ordinary",
    measureComposition: "measure-only",
    source: {
      measureStem: "tla-māma-l",
      measureClass: "tli",
    },
    subject: "3sg",
    state: "absolutive",
    animacy: "nonanimate",
  });
}

function issueVnc(runtime, overrides = {}) {
  const receipt = runtime.executeClassicalGrammarApplicationRequest({
    operationId: "vnc:application",
    outputKind: "scalar",
    args: [{
      sourceStem: "chihua",
      verbClass: "A",
      sourceValence: "specific-projective",
      subject: "1sg",
      objectKind: "specific-projective",
      objectPerson: "3sg",
      requestedDerivation: "direct",
      requestedVoice: "active",
      mood: "indicative",
      tense: "present",
      outputScope: "single",
      ...overrides,
    }],
  });
  return receipt?.canonicalResult || receipt;
}

function issueDeverbal(runtime, nominalizationKind, overrides = {}) {
  const passive = ["preterit-patientive", "customary-patientive"]
    .includes(nominalizationKind);
  const sourceStage = nominalizationKind.startsWith("customary-")
    ? "customary-present-predicate" : "preterit-predicate";
  return runtime.requestClassicalDeverbalNncResult({
    constructionKind: "predicate-nominalization",
    nominalizationKind,
    source: {
      sourceStage,
      sourceStem: nominalizationKind === "preterit-agentive"
        ? "pix-ca" : "mach-ti",
      verbClass: "A",
      sourceVoice: passive ? "passive" : "active",
      sourceValence: passive ? "single-object" : "intransitive",
      sourceObjectPattern: "none",
      sourceSubject: "3sg",
      ...(overrides.source || {}),
    },
    subject: "3sg",
    state: "absolutive",
    ...Object.fromEntries(
      Object.entries(overrides).filter(([key]) => key !== "source"),
    ),
  });
}

function issuePatientive(runtime, family = "passive-core") {
  const profile = family === "root-or-stock"
    ? {
      sourceStage: "root-or-stock",
      sourceStem: "cual-ā-ni",
      sourceVoice: "active",
      sourceValence: "intransitive",
    }
    : {
      sourceStage: "nonactive-core",
      sourceStem: "cua-lō",
      sourceVoice: "passive",
      sourceValence: "single-object",
      nonactiveSuffix: "lō",
    };
  return runtime.requestClassicalDeverbalNncResult({
    constructionKind: "patientive",
    patientiveSourceFamily: family,
    patientiveAnalogy: "impersonal",
    source: {
      ...profile,
      verbClass: "A",
      sourceObjectPattern: "none",
      sourceSubject: "3sg",
    },
    subject: "3sg",
    state: "absolutive",
  });
}

function issueCompoundNnc(runtime) {
  return runtime.requestClassicalNominalConstructionResult({
    constructionKind: "compound-nnc",
    source: {
      embedStem: "ā",
      embedClass: "tl",
      matrixStem: "cal",
      matrixClass: "tli",
    },
    structure: "integrated",
    embedRole: "association",
    possessorOrientation: "matrix",
    subject: "3sg",
    state: "absolutive",
    animacy: "animate",
  });
}

function issuePersonalName(runtime, outerSubject = "3sg") {
  const clause = runtime.buildPersonalNameInnerClauseFrame({
    sourceFamily: "preterit-agentive",
    subjectPrefix: "Ø",
    subjectConnector: "Ø",
    predicateMorphs: ["temō", "Ø"],
    numberPrefix: "c",
    numberSuffix: "Ø",
  });
  const source = runtime.buildPersonalNameNncSourceFrame({
    sourceFamily: "preterit-agentive",
    clauses: [clause],
  });
  return runtime.requestClassicalPersonalNameNncResult({
    sourceFrame: source,
    outerSubject,
  });
}

function issueSupplementation(runtime) {
  const principal = runtime.buildClassicalNahuatlSupplementationClauseEnvelope(
    issueVnc(runtime, {
      sourceStem: "cuīca",
      sourceValence: "intransitive",
      subject: "3sg",
      objectKind: "",
      objectPerson: "",
    }),
    {
      referenceId: "third",
      subjectReferenceId: "third",
      sourceStem: "cuīca",
    },
  );
  const supplement = runtime.buildClassicalNahuatlSupplementationClauseEnvelope(
    runtime.buildClassicalNahuatlAbsolutiveNncFrame("tlācatl", {
      subject: "3sg",
      nounClass: "zero",
      animacy: "animate",
    }),
    {
      referenceId: "third",
      subjectReferenceId: "third",
      sourceStem: "tlācatl",
    },
  );
  const receipt = runtime.executeClassicalGrammarApplicationRequest({
    operationId: "sentence:supplementation",
    outputKind: "scalar",
    args: [{
      operationKind: "relation",
      principalClause: principal,
      supplementClause: supplement,
      options: {
        referenceMode: "shared",
        headRole: "subject",
        supplementContactRole: "subject",
        order: "principal-first",
      },
    }],
  });
  return receipt?.canonicalResult || receipt;
}

function modify(runtime, head, modifier, choices = {}) {
  return runtime.evaluateClassicalNahuatlAdjectivalModification({
    operationKind: "adjectival-modification",
    topology: "ordinary",
    order: "head-modifier",
    adjunctor: "none",
    head,
    modifier,
    ...choices,
  });
}

function buildProjection(runtime) {
  const head = issueNnc(runtime, "cueitl");
  const modifier = issueNnc(runtime, "canahuac");
  const additional = issueNnc(runtime, "tlazohtli");
  const ordinary = modify(runtime, head, modifier);
  const cases = {
    ordinary: compactModification(runtime, ordinary),
    marked: compactModification(runtime, modify(runtime, head, modifier, {
      adjunctor: "in",
    })),
    preposed: compactModification(runtime, modify(runtime, head, modifier, {
      order: "modifier-head-preposed",
    })),
    markedPreposed: compactModification(
      runtime,
      modify(runtime, head, modifier, {
        order: "modifier-head-preposed",
        adjunctor: "in",
      }),
    ),
    cooperating: compactModification(runtime, modify(runtime, head, modifier, {
      topology: "cooperating-preposed-nonpreposed",
      order: "cooperating-preposed-nonpreposed",
      adjunctor: "nonpreposed-in",
      additionalModifiers: [additional],
    })),
    discontinuous: compactModification(runtime, modify(runtime, head, modifier, {
      topology: "discontinuous",
      order: "discontinuous-modifier-first",
      interveningClauses: [additional],
    })),
    recursive: compactModification(runtime, modify(
      runtime,
      ordinary,
      additional,
    )),
    pronominalHead: compactModification(runtime, modify(
      runtime,
      issuePronominal(runtime, "yeh"),
      issueNnc(runtime, "mich"),
    )),
    interrogativeHead: compactModification(runtime, modify(
      runtime,
      issuePronominal(runtime, "tl-eh", "3sg", {
        embedStem: "tl",
        matrixStem: "eh",
      }),
      issueNnc(runtime, "miqui"),
      { adjunctor: "in" },
    )),
    cardinalHead: compactModification(runtime, modify(
      runtime,
      issueCardinal(runtime),
      issueNnc(runtime, "mich"),
      { adjunctor: "in" },
    )),
    cardinalModifier: compactModification(runtime, modify(
      runtime,
      issueNnc(runtime, "xihuitl", "3common"),
      issueCardinal(runtime),
    )),
    quantitiveHead: compactModification(runtime, modify(
      runtime,
      issueQuantitive(runtime),
      issueNnc(runtime, "tlācatl", "1pl", { pluralConnector: "0-h" }),
    )),
    vncObjectContact: compactModification(runtime, modify(
      runtime,
      head,
      issueVnc(runtime),
      { linkRole: "vnc-object" },
    )),
    customaryAgentive: compactModification(runtime, modify(
      runtime,
      head,
      issueDeverbal(runtime, "customary-agentive-reanalysis"),
    )),
    customaryPatientive: compactModification(runtime, modify(
      runtime,
      head,
      issueDeverbal(runtime, "customary-patientive"),
    )),
    preteritAgentive: compactModification(runtime, modify(
      runtime,
      head,
      issueDeverbal(runtime, "preterit-agentive"),
    )),
    patientive: compactModification(runtime, modify(
      runtime,
      head,
      issuePatientive(runtime),
    )),
    rootStockPatientive: compactModification(runtime, modify(
      runtime,
      head,
      issuePatientive(runtime, "root-or-stock"),
    )),
    compoundMatrix: compactModification(runtime, modify(
      runtime,
      issueCompoundNnc(runtime),
      modifier,
      { compoundHeadTarget: "compound-matrix" },
    )),
    compoundWhole: compactModification(runtime, modify(
      runtime,
      issueCompoundNnc(runtime),
      modifier,
      { compoundHeadTarget: "compound-whole" },
    )),
    supplementationModifier: compactModification(runtime, modify(
      runtime,
      head,
      issueSupplementation(runtime),
    )),
    oneOf: compactModification(runtime, modify(
      runtime,
      issueNnc(runtime, "cem", "3pl", { pluralConnector: "0-h" }),
      issueNnc(runtime, "tehhuantin", "1pl", { pluralConnector: "0-h" }),
    )),
    maleBonding: compactModification(runtime, modify(
      runtime,
      issueNnc(runtime, "oquich", "1pl", {
        nounClass: "tli",
        pluralConnector: "t-in",
      }),
      issueNnc(runtime, "cualli", "3sg"),
      {
        discourseSourceContextFrame:
          runtime.buildClassicalNahuatlDiscourseSourceContextFrame({
            speakerGender: "male",
            speakerGroupMembership: "member",
            namedPartnerKnownParticipant: "none",
          }),
      },
    )),
    namedPartner: compactModification(runtime, modify(
      runtime,
      issueNnc(runtime, "tehhuantin", "1pl", { pluralConnector: "0-h" }),
      issuePersonalName(runtime),
      {
        discourseSourceContextFrame:
          runtime.buildClassicalNahuatlDiscourseSourceContextFrame({
            speakerGender: "unspecified",
            speakerGroupMembership: "unspecified",
            namedPartnerKnownParticipant: "speaker",
          }),
      },
    )),
  };
  const blockedCases = {
    vncSubjectMismatch: compactModification(runtime, modify(
      runtime,
      head,
      issueVnc(runtime),
      { linkRole: "vnc-subject" },
    )),
    copiedHead: compactModification(runtime,
      modify(runtime, JSON.parse(JSON.stringify(head)), modifier)),
    callerPoison: compactModification(
      runtime,
      runtime.evaluateClassicalNahuatlAdjectivalModification({
        operationKind: "adjectival-modification",
        topology: "ordinary",
        order: "head-modifier",
        adjunctor: "none",
        head,
        modifier,
        resultSurface: "forged",
      }),
    ),
  };
  const sources = {
    deverbal: runtime.buildClassicalNahuatlDeverbalNncValidationFrame(),
    patientive:
      runtime.buildClassicalNahuatlDeverbalPatientiveValidationFrame(),
    compoundNnc: runtime.buildClassicalNahuatlCompoundNncValidationFrame(),
    affectiveNnc: runtime.buildClassicalNahuatlAffectiveNncValidationFrame(),
    cardinal: runtime.buildClassicalNahuatlCardinalNumeralValidationFrame(),
    nominalEmbed: runtime.buildClassicalNahuatlNominalEmbedValidationFrame(),
    higherPronominal:
      runtime.buildClassicalNahuatlHigherPronominalNncValidationFrame(
        "l16-ac",
      ),
    supplementation:
      runtime.buildClassicalNahuatlSupplementationValidationFrame(),
  };
  const positiveCasesValid = Object.values(cases).every(record => (
    record.authorizationStatus === "authorized"
    && record.canonicalResult === true
    && record.callerSuppliedAuthorityAccepted === false
  ));
  const sourceFramesValid = Boolean(
    runtime.isClassicalNahuatlDeverbalNncValidationFrame(sources.deverbal)
    && runtime.isClassicalNahuatlDeverbalPatientiveValidationFrame(
      sources.patientive,
    )
    && runtime.isClassicalNahuatlCompoundNncValidationFrame(
      sources.compoundNnc,
    )
    && runtime.isClassicalNahuatlAffectiveNncValidationFrame(
      sources.affectiveNnc,
    )
    && runtime.isClassicalNahuatlCardinalNumeralValidationFrame(
      sources.cardinal,
    )
    && runtime.isClassicalNahuatlNominalEmbedValidationFrame(
      sources.nominalEmbed,
    )
    && runtime.isClassicalNahuatlHigherPronominalNncValidationFrame(
      sources.higherPronominal,
    )
    && runtime.isClassicalNahuatlSupplementationValidationFrame(
      sources.supplementation,
    )
  );
  const blockedCasesValid = Boolean(
    blockedCases.copiedHead.authorizationStatus === "blocked"
    && blockedCases.copiedHead.blockReason
      === "lessons40-43-canonical-head-result-required"
    && blockedCases.callerPoison.authorizationStatus === "blocked"
    && blockedCases.callerPoison.blockReason
      === "lessons40-43-caller-authority-forbidden"
    && blockedCases.vncSubjectMismatch.authorizationStatus === "blocked"
    && blockedCases.vncSubjectMismatch.blockReason
      === "lessons40-43-shared-referent-restriction-not-satisfied"
  );
  const authorized = positiveCasesValid && sourceFramesValid
    && blockedCasesValid;
  return deepFreeze({
    kind: "classical-nahuatl-adjectival-modification-validation-frame",
    authorizationStatus: authorized ? "authorized" : "blocked",
    blockReason: authorized
      ? "" : "classical-adjectival-modification-validation-coordinate-blocked",
    typedFrameAuthority: true,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    storedExampleAuthority: false,
    translationAuthority: false,
    curriculumMetadataAuthority: false,
    documentarySpellingAuthority: false,
    contract: {
      separateOwnerProofRequired: true,
      sourceResultRequired: true,
      sourceAndModificationOperationsRemainSeparate: true,
      lessonMetadataAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      storedExampleAuthority: false,
      translationAuthority: false,
      documentarySpellingAuthority: false,
    },
    sources,
    cases,
    blockedCases,
  });
}

export function createClassicalAdjectivalModificationValidationSemanticOperationsApi(
  targetObject = globalThis,
) {
  const issuedFrames = new WeakSet();
  let cachedProjection = null;
  function buildClassicalNahuatlAdjectivalModificationValidationFrame() {
    if (!cachedProjection) {
      cachedProjection = buildProjection(targetObject);
      if (cachedProjection.authorizationStatus === "authorized") {
        issuedFrames.add(cachedProjection);
      }
    }
    return cachedProjection;
  }
  function isClassicalNahuatlAdjectivalModificationValidationFrame(
    frame = null,
  ) {
    return Boolean(
      frame
      && issuedFrames.has(frame)
      && frame.kind
        === "classical-nahuatl-adjectival-modification-validation-frame"
      && frame.authorizationStatus === "authorized"
      && frame.typedFrameAuthority === true
      && frame.formulaStringAuthority === false
      && frame.surfaceStringAuthority === false
      && frame.storedExampleAuthority === false
      && frame.translationAuthority === false
      && frame.curriculumMetadataAuthority === false
      && frame.documentarySpellingAuthority === false
      && Object.isFrozen(frame)
    );
  }
  return Object.freeze({
    buildClassicalNahuatlAdjectivalModificationValidationFrame,
    isClassicalNahuatlAdjectivalModificationValidationFrame,
  });
}
