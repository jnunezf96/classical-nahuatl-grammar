const BINDING_FRAME_KIND =
  "classical-nahuatl-formation-result-binding-frame";
const BINDING_FRAME_VERSION = 1;
const BINDING_COMPLETION_FRAME_KIND =
  "classical-nahuatl-formation-result-binding-completion-frame";
const BINDING_COMPLETION_FRAME_VERSION = 1;

const FORMATION_OPERATION_IDS = Object.freeze([
  "grammar:nominal-construction",
  "nnc:deverbal-construction",
  "nnc:relational",
]);

const DEVERBAL_PREDICATE_NOMINALIZATION_KINDS = Object.freeze([
  "customary-agentive-reanalysis",
  "customary-agentive-full",
  "customary-patientive",
  "instrumentive",
  "present-agentive",
  "future-agentive",
  "passive-action",
  "active-action",
]);

const RELATIONAL_EXACT_SOURCE_PROBES = Object.freeze([
  Object.freeze({
    bindingId: "relational-source:preterit-agentive:n-locative",
    sourceFormation: "preterit-agentive",
    stemId: "n-locative",
  }),
  Object.freeze({
    bindingId: "relational-source:active-action:n-locative",
    sourceFormation: "active-action",
    stemId: "n-locative",
  }),
  Object.freeze({
    bindingId: "relational-source:imperfect-active:n-locative",
    sourceFormation: "imperfect-active",
    stemId: "n-locative",
  }),
  Object.freeze({
    bindingId: "relational-source:imperfect-passive:n-locative",
    sourceFormation: "imperfect-passive",
    stemId: "n-locative",
  }),
  Object.freeze({
    bindingId: "relational-source:imperfect-impersonal:n-locative",
    sourceFormation: "imperfect-impersonal",
    stemId: "n-locative",
  }),
  Object.freeze({
    bindingId: "relational-source:present-yohua:n-locative",
    sourceFormation: "present-yohua",
    stemId: "n-locative",
  }),
  Object.freeze({
    bindingId: "relational-source:perfective-active:yan-locative",
    sourceFormation: "perfective-active",
    stemId: "yan-locative",
  }),
  Object.freeze({
    bindingId:
      "relational-source:perfective-impersonal-tla:yan-locative",
    sourceFormation: "perfective-impersonal-tla",
    stemId: "yan-locative",
  }),
]);

function freezeArray(values = []) {
  return Object.freeze([...values]);
}

function unique(values = []) {
  return [...new Set(values.filter(Boolean))];
}

function callable(target, capabilityName) {
  const capability = target?.[capabilityName];
  return typeof capability === "function" ? capability : null;
}

function invoke(target, capabilityName, args = []) {
  const capability = callable(target, capabilityName);
  if (!capability) {
    return Object.freeze({
      installed: false,
      invoked: false,
      threw: false,
      value: null,
    });
  }
  try {
    return Object.freeze({
      installed: true,
      invoked: true,
      threw: false,
      value: Reflect.apply(capability, target, args),
    });
  } catch {
    return Object.freeze({
      installed: true,
      invoked: true,
      threw: true,
      value: null,
    });
  }
}

function validate(target, capabilityName, value) {
  const result = invoke(target, capabilityName, [value]);
  return Boolean(
    result.installed
    && result.invoked
    && !result.threw
    && result.value === true,
  );
}

function nounstemValenceFromProjection(projection = null) {
  const objectCount = Array.isArray(projection?.sourceObjectRequests)
    ? projection.sourceObjectRequests.length
    : -1;
  return ({
    0: "intransitive",
    1: "single-object",
    2: "double-object",
    3: "triple-object",
  })[objectCount] || "";
}

function ordinaryNncOwnerClassFacts(exactResult, projection = null) {
  if (projection?.canonicalResultFrame !== exactResult) return null;
  const projectedNounClass = projection?.sourceNounClass;
  const exactNounClass = exactResult?.sourceFrame?.nounClass;
  const nounClass = typeof exactNounClass === "string" && exactNounClass
    ? exactNounClass
    : typeof projectedNounClass === "string"
      ? projectedNounClass
      : "";
  const exactSourceClass = exactResult?.sourceFrame?.sourceClass;
  const sourceClass = typeof exactSourceClass === "string" && exactSourceClass
    ? exactSourceClass
    : nounClass;
  return nounClass && sourceClass
    ? Object.freeze({ nounClass, sourceClass })
    : null;
}

function exactCaptureIdentityPreserved(capture = null, exactResult = null) {
  return Boolean(
    capture
    && exactResult
    && (
      capture.canonicalVncResult === exactResult
      || capture.canonicalNncGrammarFrame === exactResult
      || capture.canonicalNncResult === exactResult
      || capture.canonicalActionNncResult === exactResult
      || capture.canonicalPatientiveNncResult === exactResult
    ),
  );
}

function makeChoice({
  bindingId,
  inputRole,
  ownerPreflightKind,
  requiredChoiceIds = [],
  requiredResultRoles = [],
}) {
  return Object.freeze({
    id: bindingId,
    inputRole,
    ownerPreflightKind,
    requiredChoiceIds: freezeArray(requiredChoiceIds),
    requiredResultRoles: freezeArray(requiredResultRoles),
    exactResultIdentityRequired: true,
    ownerAuthorizationStillRequired: true,
    grammarAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function probeNominalConstruction(target, exactResult) {
  const evaluate = callable(
    target,
    "evaluateClassicalNahuatlNominalConstruction",
  );
  const validateSourceAuthorization = callable(
    target,
    "isClassicalNahuatlNominalConstructionSourceAuthorization",
  );
  const getNncProjection = callable(
    target,
    "getClassicalNahuatlNncContinuationSourceConstituents",
  );
  const getVncProjection = callable(
    target,
    "getClassicalNahuatlVncContinuationSourceConstituents",
  );
  const capabilitiesComplete = Boolean(
    evaluate
    && validateSourceAuthorization
    && getNncProjection
    && getVncProjection,
  );
  if (!capabilitiesComplete) {
    return { choices: [], evidence: [], capabilitiesComplete: false };
  }

  const choices = [];
  const evidence = [];
  const addAuthorizedProbe = ({
    bindingId,
    inputRole,
    request,
    identityCheck,
    requiredChoiceIds,
    requiredResultRoles,
  }) => {
    const probe = invoke(target, "evaluateClassicalNahuatlNominalConstruction", [
      request,
    ]);
    const sourceAuthorization = probe.value?.sourceAuthorizationFrame || null;
    if (
      probe.threw
      || !validate(
        target,
        "isClassicalNahuatlNominalConstructionSourceAuthorization",
        sourceAuthorization,
      )
      || identityCheck(sourceAuthorization) !== true
    ) {
      return;
    }
    const choice = makeChoice({
      bindingId,
      inputRole,
      ownerPreflightKind: sourceAuthorization.kind,
      requiredChoiceIds,
      requiredResultRoles,
    });
    choices.push(choice);
    evidence.push(Object.freeze({ choice, ownerPreflight: sourceAuthorization }));
  };

  const vncProjection = invoke(
    target,
    "getClassicalNahuatlVncContinuationSourceConstituents",
    [exactResult],
  ).value;
  const matrixValence = nounstemValenceFromProjection(vncProjection);
  if (
    vncProjection
    && vncProjection.grammarAuthority === false
    && vncProjection.callerSuppliedAuthorityAccepted === false
    && vncProjection.sourceStem
    && vncProjection.verbClass
    && matrixValence
  ) {
    addAuthorizedProbe({
      bindingId: "nominal-embed:matrix-vnc-result",
      inputRole: "matrix-vnc-result",
      request: {
        constructionKind: "nominal-embed-vnc",
        source: {
          matrixStem: vncProjection.sourceStem,
          matrixValence,
          matrixVerbClass: vncProjection.verbClass,
          matrixConstituent: {
            kind: "vnc-result",
            stem: vncProjection.sourceStem,
            resultFrame: exactResult,
          },
        },
      },
      identityCheck: sourceAuthorization => Boolean(
        sourceAuthorization.lexicalFacts?.matrixResultCaptured === true
      ),
      requiredChoiceIds: [
        "nominal-embed-relation",
        "nominal-embed-route",
        "subject",
        "mood-tense",
        "voice",
      ],
      requiredResultRoles: ["nominal-embed-constituent"],
    });
  }

  const nncProjection = invoke(
    target,
    "getClassicalNahuatlNncContinuationSourceConstituents",
    [exactResult],
  ).value;
  let constituentKind = "";
  let constituentStem = "";
  let constituentClass = "";
  let constituentSourceClass = "";
  let embedOnly = false;
  if (
    validate(target, "isClassicalNahuatlOrdinaryNncResult", exactResult)
    && nncProjection?.canonicalResultFrame === exactResult
  ) {
    const classFacts = ordinaryNncOwnerClassFacts(exactResult, nncProjection);
    constituentKind = "ordinary-nnc";
    constituentStem = nncProjection.sourceIdentityStem;
    constituentClass = classFacts?.nounClass || "";
    constituentSourceClass = classFacts?.sourceClass || "";
  } else if (
    validate(
      target,
      "isClassicalNahuatlDeverbalNncGrammarFrame",
      exactResult,
    )
    && exactResult.operationFrame?.nominalizationKind
      === "preterit-agentive"
  ) {
    constituentKind = "preterit-agentive-nnc";
    constituentStem = exactResult.operationFrame?.targetStems?.generalUse || "";
    constituentClass = exactResult.operationFrame?.nounClass || "tl";
    constituentSourceClass = constituentClass;
    embedOnly = true;
  } else if (
    validate(
      target,
      "isClassicalNahuatlNominalConstructionResult",
      exactResult,
    )
    && exactResult.constructionKind === "compound-nnc"
  ) {
    constituentKind = "compound-nnc";
    constituentStem = exactResult.operationFrame?.compoundStem || "";
    constituentClass = exactResult.operationFrame?.matrixClass || "";
    constituentSourceClass = constituentClass;
  } else if (
    validate(
      target,
      "isClassicalNahuatlNominalConstructionResult",
      exactResult,
    )
    && exactResult.constructionKind === "affective-nnc"
    && exactResult.operationFrame?.affectRoute === "compound"
  ) {
    constituentKind = "affective-nnc";
    constituentStem = exactResult.operationFrame?.compoundStem || "";
    constituentClass = exactResult.operationFrame?.matrixClass || "";
    constituentSourceClass = constituentClass;
    embedOnly = true;
  }

  if (
    constituentKind
    && constituentStem
    && constituentClass
    && constituentSourceClass
  ) {
    addAuthorizedProbe({
      bindingId: "compound-nnc:embed-result",
      inputRole: "compound-embed-result",
      request: {
        constructionKind: "compound-nnc",
        source: {
          embedStem: constituentStem,
          embedClass: constituentClass,
          embedSourceClass: constituentSourceClass,
          embedConstituent: {
            kind: constituentKind,
            stem: constituentStem,
            resultFrame: exactResult,
          },
        },
      },
      identityCheck: sourceAuthorization => (
        sourceAuthorization.lexicalFacts?.capturedEmbedResult
          === exactResult
      ),
      requiredChoiceIds: [
        "compound-structure",
        "compound-bracketing",
        "state",
        "subject",
      ],
      requiredResultRoles: ["compound-matrix-constituent"],
    });
    if (!embedOnly) {
      addAuthorizedProbe({
        bindingId: "compound-nnc:matrix-result",
        inputRole: "compound-matrix-result",
        request: {
          constructionKind: "compound-nnc",
          source: {
            matrixStem: constituentStem,
            matrixClass: constituentClass,
            matrixSourceClass: constituentSourceClass,
            matrixConstituent: {
              kind: constituentKind,
              stem: constituentStem,
              resultFrame: exactResult,
            },
          },
        },
        identityCheck: sourceAuthorization => (
          sourceAuthorization.lexicalFacts?.capturedMatrixNncResult
            === exactResult
        ),
        requiredChoiceIds: [
          "compound-structure",
          "compound-bracketing",
          "state",
          "subject",
        ],
        requiredResultRoles: ["compound-embed-constituent"],
      });
    }
  }

  return { choices, evidence, capabilitiesComplete: true };
}

function probeDeverbalConstruction(
  target,
  exactResult,
  ownerSelections = {},
) {
  const choices = [];
  const evidence = [];
  const captureSpecs = [];
  const addCaptureSpec = spec => captureSpecs.push(spec);
  const selectedState = ["absolutive", "possessive"].includes(
    String(ownerSelections?.state || "").trim(),
  ) ? String(ownerSelections.state).trim() : "";
  const selectedSubject = /^(?:1|2|3)(?:sg|pl)$|^3common$/u.test(
    String(ownerSelections?.subject || "").trim(),
  ) ? String(ownerSelections.subject).trim() : "";
  const selectedChoiceValue = choiceId => ({
    "nominalization-kind": ownerSelections?.nominalizationKind,
    "action-kind": ownerSelections?.actionKind,
    "action-suffix": ownerSelections?.actionSuffix,
    "patientive-family": ownerSelections?.patientiveFamily,
    "characteristic-reading": ownerSelections?.characteristicReading,
    "continuation-kind": ownerSelections?.continuationKind,
    "continuation-relation": ownerSelections?.continuationRelation,
    state: selectedState,
    subject: selectedSubject,
  })[choiceId];
  const unresolvedChoiceIds = choiceIds => choiceIds.filter(
    choiceId => !String(selectedChoiceValue(choiceId) || "").trim(),
  );

  addCaptureSpec({
    bindingId: "predicate-nominalization:preterit-source",
    inputRole: "preterit-vnc-result",
    issuer: "captureClassicalNahuatlPreteritVncResultForNominalization",
    validator:
      "isClassicalNahuatlPreteritVncNominalizationCaptureFrame",
    args: [exactResult],
    requiredChoiceIds: ["nominalization-kind", "state", "subject"],
  });
  DEVERBAL_PREDICATE_NOMINALIZATION_KINDS.forEach(
    nominalizationKind => addCaptureSpec({
      bindingId: `predicate-nominalization:${nominalizationKind}`,
      inputRole: "predicate-vnc-result",
      issuer: "captureClassicalNahuatlVncResultForPredicateNominalization",
      validator:
        "isClassicalNahuatlPredicateNominalizationVncCaptureFrame",
      args: [exactResult, nominalizationKind, selectedState || "absolutive"],
      requiredChoiceIds: [
        ...(!selectedState ? ["state"] : []),
        "subject",
      ],
      requiredResultRoles:
        nominalizationKind === "customary-agentive-full"
          && selectedState === "possessive"
          ? ["customary-agentive-preterit-supplement-vnc"]
          : nominalizationKind === "instrumentive"
            ? ["instrumentive-companion-vnc"]
            : [],
    }),
  );
  [
    [
      "deverbal-action:future-source",
      "future-vnc-result",
      "captureClassicalNahuatlVncResultForDeverbalAction",
      "isClassicalNahuatlDeverbalActionVncCaptureFrame",
      ["action-kind", "action-suffix", "state", "subject"],
    ],
    [
      "patientive:passive-source",
      "passive-vnc-result",
      "captureClassicalNahuatlPassiveVncResultForPatientive",
      "isClassicalNahuatlPassivePatientiveVncCaptureFrame",
      ["patientive-family", "state", "subject"],
    ],
    [
      "patientive:impersonal-source",
      "impersonal-vnc-result",
      "captureClassicalNahuatlImpersonalVncResultForPatientive",
      "isClassicalNahuatlImpersonalPatientiveVncCaptureFrame",
      ["patientive-family", "state", "subject"],
    ],
    [
      "patientive:perfective-source",
      "perfective-vnc-result",
      "captureClassicalNahuatlPerfectiveVncResultForPatientive",
      "isClassicalNahuatlPerfectivePatientiveVncCaptureFrame",
      ["patientive-family", "state", "subject"],
    ],
    [
      "patientive:imperfective-source",
      "imperfective-vnc-result",
      "captureClassicalNahuatlImperfectiveVncResultForPatientive",
      "isClassicalNahuatlImperfectivePatientiveVncCaptureFrame",
      ["patientive-family", "state", "subject"],
    ],
    [
      "patientive:characteristic-property",
      "nnc-result",
      "captureClassicalNahuatlNncResultForCharacteristicPatientive",
      "isClassicalNahuatlCharacteristicPatientiveNncCaptureFrame",
      ["characteristic-reading", "state", "subject"],
    ],
    [
      "continuation:action-nnc",
      "action-nnc-result",
      "captureClassicalNahuatlActionNncResultForContinuation",
      "isClassicalNahuatlActionNncContinuationCaptureFrame",
      ["continuation-kind", "continuation-relation", "state", "subject"],
    ],
    [
      "continuation:patientive-nnc",
      "patientive-nnc-result",
      "captureClassicalNahuatlPatientiveNncResultForMatrixContinuation",
      "isClassicalNahuatlPatientiveNncContinuationCaptureFrame",
      ["continuation-kind", "continuation-relation", "state", "subject"],
    ],
  ].forEach(([
    bindingId,
    inputRole,
    issuer,
    validator,
    requiredChoiceIds,
  ]) => addCaptureSpec({
    bindingId,
    inputRole,
    issuer,
    validator,
    args: [exactResult],
    requiredChoiceIds,
  }));

  const capabilitiesComplete = captureSpecs.every(spec => (
    callable(target, spec.issuer) && callable(target, spec.validator)
  ));
  if (!capabilitiesComplete) {
    return { choices: [], evidence: [], capabilitiesComplete: false };
  }
  captureSpecs.forEach(spec => {
    const capture = invoke(target, spec.issuer, spec.args);
    if (
      capture.threw
      || !validate(target, spec.validator, capture.value)
      || !exactCaptureIdentityPreserved(capture.value, exactResult)
    ) {
      return;
    }
    const choice = makeChoice({
      bindingId: spec.bindingId,
      inputRole: spec.inputRole,
      ownerPreflightKind: capture.value.kind,
      requiredChoiceIds: unresolvedChoiceIds(spec.requiredChoiceIds),
      requiredResultRoles: spec.requiredResultRoles,
    });
    choices.push(choice);
    evidence.push(Object.freeze({ choice, ownerPreflight: capture.value }));
  });
  return { choices, evidence, capabilitiesComplete: true };
}

function probeRelationalConstruction(
  target,
  exactResult,
  ownerSelections = {},
) {
  const evaluate = callable(
    target,
    "evaluateClassicalNahuatlRelationalNnc",
  );
  const validator = callable(target, "isClassicalNahuatlRelationalResult");
  if (!evaluate || !validator) {
    return { choices: [], evidence: [], capabilitiesComplete: false };
  }
  const choices = [];
  const evidence = [];
  const selectedState = ["absolutive", "possessive"].includes(
    String(ownerSelections?.state || "").trim(),
  ) ? String(ownerSelections.state).trim() : "";
  const selectedSubject = String(
    ownerSelections?.relationalSubject
    || ownerSelections?.subject
    || "",
  ).trim();
  const selectedSubjectMode = ["adverbialized", "normal"].includes(
    String(ownerSelections?.subjectMode || "").trim(),
  ) ? String(ownerSelections.subjectMode).trim() : "adverbialized";
  const selectedPossessor = String(
    ownerSelections?.possessor || "",
  ).trim();
  const unresolvedChoiceIds = [
    ...(!selectedState ? ["state"] : []),
    ...(!selectedSubject ? ["subject"] : []),
  ];
  RELATIONAL_EXACT_SOURCE_PROBES.forEach(spec => {
    const preflight = invoke(target, "evaluateClassicalNahuatlRelationalNnc", [{
      nounstem: {
        kind: "classical-nahuatl-nnc-nounstem-request",
        stemId: spec.stemId,
        formation: "option-two",
        operation: "relational-nnc",
        sourceFormation: spec.sourceFormation,
        upstreamResult: exactResult,
      },
      state: selectedState || "absolutive",
      ...(selectedState === "possessive" && selectedPossessor
        ? { possessorId: selectedPossessor }
        : {}),
      subjectMode: selectedSubjectMode,
      subjectId: selectedSubject || "3common",
    }]);
    if (
      preflight.threw
      || !validate(
        target,
        "isClassicalNahuatlRelationalResult",
        preflight.value,
      )
      || preflight.value?.sourceFrame?.upstreamSourceCarrier?.ownerResult
        !== exactResult
    ) {
      return;
    }
    const choice = makeChoice({
      bindingId: spec.bindingId,
      inputRole: "derived-relational-source",
      ownerPreflightKind: preflight.value.kind,
      requiredChoiceIds: unresolvedChoiceIds,
    });
    choices.push(choice);
    evidence.push(Object.freeze({ choice, ownerPreflight: preflight.value }));
  });

  if (
    validate(target, "isClassicalNahuatlRelationalResult", exactResult)
    && exactResult.constructionKind === "associated-entity"
  ) {
    const preflight = invoke(target, "evaluateClassicalNahuatlRelationalNnc", [{
      nounstem: {
        kind: "classical-nahuatl-nnc-nounstem-request",
        stemId: exactResult.stemId,
        formation: "option-two",
        operation: "pertinency",
        pertinencySourceKind: "associated-entity",
        upstreamResult: exactResult,
      },
      state: selectedState || "absolutive",
      ...(selectedState === "possessive" && selectedPossessor
        ? { possessorId: selectedPossessor }
        : {}),
      subjectMode: selectedSubjectMode,
      subjectId: selectedSubject || "3common",
    }]);
    if (
      !preflight.threw
      && validate(
        target,
        "isClassicalNahuatlRelationalResult",
        preflight.value,
      )
      && preflight.value?.sourceFrame?.upstreamSourceCarrier?.ownerResult
        === exactResult
    ) {
      const choice = makeChoice({
        bindingId: "relational-source:associated-entity:pertinency",
        inputRole: "associated-entity-result",
        ownerPreflightKind: preflight.value.kind,
        requiredChoiceIds: unresolvedChoiceIds,
      });
      choices.push(choice);
      evidence.push(Object.freeze({ choice, ownerPreflight: preflight.value }));
    }
  }
  return { choices, evidence, capabilitiesComplete: true };
}

function getExactNncConstituent(target, exactResult) {
  const projection = invoke(
    target,
    "getClassicalNahuatlNncContinuationSourceConstituents",
    [exactResult],
  ).value;
  let kind = "";
  let stem = "";
  let nounClass = "";
  let sourceClass = "";
  if (
    validate(target, "isClassicalNahuatlOrdinaryNncResult", exactResult)
    && projection?.canonicalResultFrame === exactResult
  ) {
    const classFacts = ordinaryNncOwnerClassFacts(exactResult, projection);
    kind = "ordinary-nnc";
    stem = projection.sourceIdentityStem;
    nounClass = classFacts?.nounClass || "";
    sourceClass = classFacts?.sourceClass || "";
  } else if (
    validate(target, "isClassicalNahuatlDeverbalNncGrammarFrame", exactResult)
    && exactResult.operationFrame?.nominalizationKind === "preterit-agentive"
  ) {
    kind = "preterit-agentive-nnc";
    stem = exactResult.operationFrame?.targetStems?.generalUse || "";
    nounClass = exactResult.operationFrame?.nounClass || "tl";
    sourceClass = nounClass;
  } else if (
    validate(target, "isClassicalNahuatlNominalConstructionResult", exactResult)
    && exactResult.constructionKind === "compound-nnc"
  ) {
    kind = "compound-nnc";
    stem = exactResult.operationFrame?.compoundStem || "";
    nounClass = exactResult.operationFrame?.matrixClass || "";
    sourceClass = nounClass;
  } else if (
    validate(target, "isClassicalNahuatlNominalConstructionResult", exactResult)
    && exactResult.constructionKind === "affective-nnc"
    && exactResult.operationFrame?.affectRoute === "compound"
  ) {
    kind = "affective-nnc";
    stem = exactResult.operationFrame?.compoundStem || "";
    nounClass = exactResult.operationFrame?.matrixClass || "";
    sourceClass = nounClass;
  }
  return kind && stem && nounClass && sourceClass ? Object.freeze({
    kind,
    stem,
    nounClass,
    sourceClass,
    resultFrame: exactResult,
  }) : null;
}

function getExactVncConstituent(target, exactResult) {
  const projection = invoke(
    target,
    "getClassicalNahuatlVncContinuationSourceConstituents",
    [exactResult],
  ).value;
  const objectCount = Array.isArray(projection?.sourceObjectRequests)
    ? projection.sourceObjectRequests.length
    : -1;
  const valence = ({
    0: "intransitive",
    1: "single-object",
    2: "double-object",
    3: "triple-object",
  })[objectCount] || "";
  return projection?.sourceStem && projection?.verbClass && valence
    ? Object.freeze({
        kind: "vnc-result",
        stem: projection.sourceStem,
        sourceClass: projection.verbClass,
        valence,
        resultFrame: exactResult,
      })
    : null;
}

function probeNominalBindingCompletion(
  target,
  bindingId,
  primaryExactResult,
  additionalExactResult,
) {
  const primaryAccepted = bindingId === "nominal-embed:matrix-vnc-result"
    ? Boolean(getExactVncConstituent(target, primaryExactResult))
    : Boolean(getExactNncConstituent(target, primaryExactResult));
  if (!primaryAccepted || !getExactNncConstituent(
    target,
    additionalExactResult,
  )) return null;
  const complementaryBindingId = bindingId === "compound-nnc:embed-result"
    ? "compound-nnc:matrix-result"
    : "compound-nnc:embed-result";
  const additionalProbe = probeNominalConstruction(
    target,
    additionalExactResult,
  );
  const evidence = additionalProbe.evidence.find(
    item => item.choice.id === complementaryBindingId,
  ) || null;
  const ownerFrame = evidence?.ownerPreflight || null;
  const exactAdditionalIdentityAccepted = complementaryBindingId
    === "compound-nnc:matrix-result"
    ? ownerFrame?.lexicalFacts?.capturedMatrixNncResult
      === additionalExactResult
    : ownerFrame?.lexicalFacts?.capturedEmbedResult
      === additionalExactResult;
  if (!evidence || !exactAdditionalIdentityAccepted) return null;
  return Object.freeze({
    ownerFrame,
    ownerRequestPatch: Object.freeze({}),
  });
}

function probeDeverbalBindingCompletion(
  target,
  bindingId,
  requiredResultRole,
  primaryExactResult,
  additionalExactResult,
) {
  const evaluate = callable(target, "evaluateClassicalNahuatlDeverbalNnc");
  if (!evaluate) return null;
  const evaluateRequest = request => {
    const result = invoke(
      target,
      "evaluateClassicalNahuatlDeverbalNnc",
      [request],
    );
    return !result.threw
      && validate(target, "isClassicalNahuatlDeverbalNncGrammarFrame", result.value)
      ? result.value
      : null;
  };
  if (
    bindingId === "predicate-nominalization:customary-agentive-full"
    && requiredResultRole
      === "customary-agentive-preterit-supplement-vnc"
  ) {
    const ownerFrame = evaluateRequest({
      constructionKind: "predicate-nominalization",
      nominalizationKind: "customary-agentive-full",
      canonicalVncResult: primaryExactResult,
      canonicalPreteritVncResult: additionalExactResult,
      subject: "3sg",
      state: "possessive",
      possessor: "3sg",
      animacy: "animate",
    });
    const supplement = ownerFrame?.operationFrame
      ?.customaryAgentivePossessiveSupplementFrame || null;
    if (
      !ownerFrame
      || supplement?.customarySourceFrame
        ?.predicateNominalizationVncCaptureFrame?.canonicalVncResult
          !== primaryExactResult
      || supplement?.preteritAgentiveFrame?.sourceFrame
        ?.preteritVncCaptureFrame?.canonicalVncResult
          !== additionalExactResult
    ) return null;
    return Object.freeze({
      ownerFrame,
      ownerRequestPatch: Object.freeze({
        canonicalPreteritVncResult: additionalExactResult,
      }),
    });
  }
  if (
    bindingId === "predicate-nominalization:instrumentive"
    && requiredResultRole === "instrumentive-companion-vnc"
  ) {
    const pairs = [
      [primaryExactResult, additionalExactResult],
      [additionalExactResult, primaryExactResult],
    ];
    for (const [absolutiveResult, possessiveResult] of pairs) {
      const ownerFrame = evaluateRequest({
        constructionKind: "predicate-nominalization",
        nominalizationKind: "instrumentive",
        canonicalInstrumentiveAbsolutiveVncResult: absolutiveResult,
        canonicalInstrumentivePossessiveVncResult: possessiveResult,
        subject: "3sg",
        state: "absolutive",
        possessor: "3sg",
        animacy: "nonanimate",
      });
      const pair = ownerFrame?.operationFrame?.instrumentiveSourcePairFrame;
      if (
        ownerFrame
        && pair?.customaryImpersonal?.canonicalVncResult === absolutiveResult
        && pair?.imperfectActive?.canonicalVncResult === possessiveResult
      ) {
        return Object.freeze({
          ownerFrame,
          ownerRequestPatch: Object.freeze({
            canonicalInstrumentiveAbsolutiveVncResult: absolutiveResult,
            canonicalInstrumentivePossessiveVncResult: possessiveResult,
          }),
        });
      }
    }
  }
  return null;
}

export function createClassicalNahuatlFormationResultBindingApi(
  targetObject = globalThis,
  installationContext = {},
) {
  const target = targetObject && typeof targetObject === "object"
    ? targetObject
    : globalThis;
  const ownerTarget = Object.create(target);
  Object.defineProperties(
    ownerTarget,
    Object.getOwnPropertyDescriptors(
      installationContext?.moduleDependencyCapabilities || {},
    ),
  );
  const issuedFrames = new WeakSet();
  const frameContexts = new WeakMap();
  const issuedCompletionFrames = new WeakSet();
  const completionContexts = new WeakMap();

  function issueClassicalNahuatlFormationResultBindingFrame(
    operationId = "",
    currentResult = null,
    ownerSelections = {},
  ) {
    const normalizedOperationId = String(operationId || "").trim();
    const operationRecognized = FORMATION_OPERATION_IDS.includes(
      normalizedOperationId,
    );
    let probe = {
      choices: [],
      evidence: [],
      capabilitiesComplete: false,
    };
    if (operationRecognized && currentResult && typeof currentResult === "object") {
      probe = normalizedOperationId === "grammar:nominal-construction"
        ? probeNominalConstruction(ownerTarget, currentResult)
        : normalizedOperationId === "nnc:deverbal-construction"
          ? probeDeverbalConstruction(
              ownerTarget,
              currentResult,
              ownerSelections,
            )
          : probeRelationalConstruction(
              ownerTarget,
              currentResult,
              ownerSelections,
            );
    }
    const choices = freezeArray(probe.choices);
    const bindingIds = freezeArray(choices.map(choice => choice.id));
    const requiredChoiceIds = freezeArray(unique(choices.flatMap(
      choice => choice.requiredChoiceIds,
    )));
    const requiredResultRoles = freezeArray(unique(choices.flatMap(
      choice => choice.requiredResultRoles,
    )));
    const accepted = choices.length > 0;
    const rejectionProven = Boolean(
      operationRecognized
      && probe.capabilitiesComplete
      && currentResult
      && typeof currentResult === "object"
      && !accepted,
    );
    const frame = Object.freeze({
      kind: BINDING_FRAME_KIND,
      version: BINDING_FRAME_VERSION,
      authorizationStatus: accepted ? "authorized" : "blocked",
      blockReason: accepted
        ? ""
        : !operationRecognized
          ? "classical-formation-binding-operation-not-recognized"
          : !currentResult || typeof currentResult !== "object"
            ? "classical-formation-binding-exact-result-required"
            : !probe.capabilitiesComplete
              ? "classical-formation-binding-owner-preflight-unavailable"
              : "classical-formation-binding-exact-result-incompatible",
      operationId: operationRecognized ? normalizedOperationId : "",
      inputResult: currentResult && typeof currentResult === "object"
        ? currentResult
        : null,
      exactResult: accepted ? currentResult : null,
      inputRole: choices.length === 1 ? choices[0].inputRole : "select-binding",
      bindingChoices: choices,
      bindingIds,
      requiredChoiceIds,
      requiredResultRoles,
      ownerChoicesRequired: Boolean(
        choices.length > 1
        || requiredChoiceIds.length
        || requiredResultRoles.length,
      ),
      ownerPreflightCapabilitiesComplete: probe.capabilitiesComplete === true,
      ownerInputAcceptanceProven: accepted,
      ownerRejectionProven: rejectionProven,
      exactResultIdentityPreserved: accepted,
      ownerAuthorizationStillRequired: true,
      sourceStringAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      lessonMetadataAuthority: false,
      storedStateAuthority: false,
      grammarAuthority: false,
    });
    issuedFrames.add(frame);
    frameContexts.set(frame, Object.freeze({
      currentResult,
      evidence: freezeArray(probe.evidence),
    }));
    return frame;
  }

  function isClassicalNahuatlFormationResultBindingFrame(frame = null) {
    const context = frameContexts.get(frame) || null;
    if (
      !frame
      || !issuedFrames.has(frame)
      || !context
      || frame.kind !== BINDING_FRAME_KIND
      || frame.version !== BINDING_FRAME_VERSION
      || !["authorized", "blocked"].includes(frame.authorizationStatus)
      || !Array.isArray(frame.bindingChoices)
      || !Array.isArray(frame.bindingIds)
      || !Array.isArray(frame.requiredChoiceIds)
      || !Array.isArray(frame.requiredResultRoles)
      || frame.bindingIds.length !== frame.bindingChoices.length
      || frame.ownerAuthorizationStillRequired !== true
      || frame.sourceStringAuthority !== false
      || frame.formulaStringAuthority !== false
      || frame.surfaceStringAuthority !== false
      || frame.lessonMetadataAuthority !== false
      || frame.storedStateAuthority !== false
      || frame.grammarAuthority !== false
      || !Object.isFrozen(frame)
      || !Object.isFrozen(frame.bindingChoices)
      || !Object.isFrozen(frame.bindingIds)
      || !Object.isFrozen(frame.requiredChoiceIds)
      || !Object.isFrozen(frame.requiredResultRoles)
    ) {
      return false;
    }
    if (frame.authorizationStatus === "blocked") {
      return Boolean(
        frame.blockReason
        && frame.exactResult === null
        && frame.bindingChoices.length === 0
        && frame.bindingIds.length === 0
        && frame.ownerInputAcceptanceProven === false
        && frame.exactResultIdentityPreserved === false
        && (
          frame.ownerRejectionProven === true
          || frame.ownerPreflightCapabilitiesComplete === false
          || !frame.operationId
          || !frame.inputResult
        ),
      );
    }
    return Boolean(
      FORMATION_OPERATION_IDS.includes(frame.operationId)
      && frame.blockReason === ""
      && frame.inputResult === context.currentResult
      && frame.exactResult === context.currentResult
      && frame.exactResultIdentityPreserved === true
      && frame.ownerInputAcceptanceProven === true
      && frame.ownerRejectionProven === false
      && frame.ownerPreflightCapabilitiesComplete === true
      && frame.bindingChoices.length > 0
      && context.evidence.length === frame.bindingChoices.length
      && frame.bindingChoices.every((choice, index) => (
        Object.isFrozen(choice)
        && Object.isFrozen(choice.requiredChoiceIds)
        && Object.isFrozen(choice.requiredResultRoles)
        && frame.bindingIds[index] === choice.id
        && context.evidence[index]?.choice === choice
        && context.evidence[index]?.ownerPreflight
        && typeof context.evidence[index].ownerPreflight === "object"
        && choice.exactResultIdentityRequired === true
        && choice.ownerAuthorizationStillRequired === true
        && choice.grammarAuthority === false
        && choice.formulaStringAuthority === false
        && choice.surfaceStringAuthority === false
      ))
      && frame.requiredChoiceIds.every(choiceId => (
        frame.bindingChoices.some(choice => (
          choice.requiredChoiceIds.includes(choiceId)
        ))
      ))
      && frame.requiredResultRoles.every(resultRole => (
        frame.bindingChoices.some(choice => (
          choice.requiredResultRoles.includes(resultRole)
        ))
      ))
    );
  }

  function issueClassicalNahuatlFormationResultBindingCompletionFrame(
    bindingFrame = null,
    selectedBindingId = "",
    requiredResultRole = "",
    additionalResult = null,
  ) {
    const bindingValid = isClassicalNahuatlFormationResultBindingFrame(
      bindingFrame,
    ) && bindingFrame.authorizationStatus === "authorized";
    const normalizedBindingId = String(selectedBindingId || "").trim();
    const normalizedResultRole = String(requiredResultRole || "").trim();
    const bindingChoice = bindingValid
      ? bindingFrame.bindingChoices.find(
          choice => choice.id === normalizedBindingId,
        ) || null
      : null;
    const roleExpected = Boolean(
      bindingChoice?.requiredResultRoles.includes(normalizedResultRole),
    );
    const exactAdditionalResultSupplied = Boolean(
      additionalResult && typeof additionalResult === "object",
    );
    let completion = null;
    if (bindingValid && roleExpected && exactAdditionalResultSupplied) {
      completion = bindingFrame.operationId
        === "grammar:nominal-construction"
        ? probeNominalBindingCompletion(
            ownerTarget,
            normalizedBindingId,
            bindingFrame.exactResult,
            additionalResult,
          )
        : bindingFrame.operationId === "nnc:deverbal-construction"
          ? probeDeverbalBindingCompletion(
              ownerTarget,
              normalizedBindingId,
              normalizedResultRole,
              bindingFrame.exactResult,
              additionalResult,
            )
          : null;
    }
    const accepted = Boolean(completion?.ownerFrame);
    const exactResultsByRole = Object.freeze(accepted ? {
      [bindingChoice.inputRole]: bindingFrame.exactResult,
      [normalizedResultRole]: additionalResult,
    } : {});
    const frame = Object.freeze({
      kind: BINDING_COMPLETION_FRAME_KIND,
      version: BINDING_COMPLETION_FRAME_VERSION,
      authorizationStatus: accepted ? "authorized" : "blocked",
      blockReason: accepted
        ? ""
        : !bindingValid
          ? "classical-formation-binding-completion-frame-required"
          : !bindingChoice
            ? "classical-formation-binding-completion-role-selection-required"
            : !roleExpected
              ? "classical-formation-binding-completion-result-role-mismatch"
              : !exactAdditionalResultSupplied
                ? "classical-formation-binding-completion-exact-result-required"
                : "classical-formation-binding-completion-owner-rejected-result",
      operationId: bindingValid ? bindingFrame.operationId : "",
      bindingFrame: bindingValid ? bindingFrame : null,
      selectedBindingId: bindingChoice ? normalizedBindingId : "",
      requiredResultRole: roleExpected ? normalizedResultRole : "",
      primaryExactResult: bindingValid ? bindingFrame.exactResult : null,
      additionalExactResult: accepted ? additionalResult : null,
      exactResultsByRole,
      ownerCompletionFrame: accepted ? completion.ownerFrame : null,
      ownerRequestPatch: accepted
        ? completion.ownerRequestPatch
        : Object.freeze({}),
      ownerInputAcceptanceProven: accepted,
      ownerRejectionProven: false,
      exactPrimaryResultIdentityPreserved: bindingValid,
      exactAdditionalResultIdentityPreserved: accepted,
      bothExactResultIdentitiesPreserved: accepted,
      ownerAuthorizationStillRequired: true,
      sourceStringAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      storedStateAuthority: false,
      grammarAuthority: false,
    });
    issuedCompletionFrames.add(frame);
    completionContexts.set(frame, Object.freeze({
      bindingChoice,
      additionalResult,
      completion,
    }));
    return frame;
  }

  function isClassicalNahuatlFormationResultBindingCompletionFrame(
    frame = null,
  ) {
    const context = completionContexts.get(frame) || null;
    if (
      !frame
      || !issuedCompletionFrames.has(frame)
      || !context
      || frame.kind !== BINDING_COMPLETION_FRAME_KIND
      || frame.version !== BINDING_COMPLETION_FRAME_VERSION
      || !["authorized", "blocked"].includes(frame.authorizationStatus)
      || frame.ownerAuthorizationStillRequired !== true
      || frame.sourceStringAuthority !== false
      || frame.formulaStringAuthority !== false
      || frame.surfaceStringAuthority !== false
      || frame.storedStateAuthority !== false
      || frame.grammarAuthority !== false
      || !Object.isFrozen(frame)
      || !Object.isFrozen(frame.exactResultsByRole)
      || !Object.isFrozen(frame.ownerRequestPatch)
    ) return false;
    if (frame.authorizationStatus === "blocked") {
      return Boolean(
        frame.blockReason
        && frame.additionalExactResult === null
        && frame.ownerCompletionFrame === null
        && frame.ownerInputAcceptanceProven === false
        && frame.exactAdditionalResultIdentityPreserved === false
        && frame.bothExactResultIdentitiesPreserved === false
        && Object.keys(frame.exactResultsByRole).length === 0
        && Object.keys(frame.ownerRequestPatch).length === 0
      );
    }
    return Boolean(
      isClassicalNahuatlFormationResultBindingFrame(frame.bindingFrame)
      && frame.bindingFrame.authorizationStatus === "authorized"
      && context.bindingChoice
      && frame.selectedBindingId === context.bindingChoice.id
      && context.bindingChoice.requiredResultRoles.includes(
        frame.requiredResultRole,
      )
      && frame.primaryExactResult === frame.bindingFrame.exactResult
      && frame.additionalExactResult === context.additionalResult
      && context.completion?.ownerFrame === frame.ownerCompletionFrame
      && context.completion?.ownerRequestPatch === frame.ownerRequestPatch
      && frame.exactResultsByRole[context.bindingChoice.inputRole]
        === frame.primaryExactResult
      && frame.exactResultsByRole[frame.requiredResultRole]
        === frame.additionalExactResult
      && frame.blockReason === ""
      && frame.ownerInputAcceptanceProven === true
      && frame.ownerRejectionProven === false
      && frame.exactPrimaryResultIdentityPreserved === true
      && frame.exactAdditionalResultIdentityPreserved === true
      && frame.bothExactResultIdentitiesPreserved === true
    );
  }

  return {
    CLASSICAL_NAHUATL_FORMATION_RESULT_BINDING_OPERATION_IDS:
      FORMATION_OPERATION_IDS,
    issueClassicalNahuatlFormationResultBindingFrame,
    isClassicalNahuatlFormationResultBindingFrame,
    issueClassicalNahuatlFormationResultBindingCompletionFrame,
    isClassicalNahuatlFormationResultBindingCompletionFrame,
  };
}

export function installClassicalNahuatlFormationResultBindingGlobals(
  targetObject = globalThis,
  installationContext = {},
) {
  const target = targetObject && typeof targetObject === "object"
    ? targetObject
    : globalThis;
  const api = createClassicalNahuatlFormationResultBindingApi(
    target,
    installationContext,
  );
  Object.defineProperties(target, Object.getOwnPropertyDescriptors(api));
  return api;
}
