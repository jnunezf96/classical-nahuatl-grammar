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
  "instrumentive-full",
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

function createOwnerPreflightProbe(target) {
  let completed = true;
  const invokePreflight = (capabilityName, args = []) => {
    const result = invoke(target, capabilityName, args);
    if (result.threw) completed = false;
    return result;
  };
  return {
    invoke: invokePreflight,
    validate: (capabilityName, value) => {
      const result = invokePreflight(capabilityName, [value]);
      return result.invoked && !result.threw && result.value === true;
    },
    get completed() { return completed; },
  };
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
  compoundEmbedStemOptions = [],
  adjectivalSourceOptions = null, primitiveEmbedSourceFrame = null, primitiveEmbedSource = null,
  compoundEmbedUseSourceAllowed = false, compoundEmbedUseSourceAuthorization = null,
  compoundEmbedUseSource = null,
  primitiveMatrixSourceFrame = null, primitiveMatrixSource = null,
  lexicalConjunctionSource = null,
  fixedSequenceAnalysisAllowed = false,
  derivedRelationalSourceStem = "",
  derivedRelationalSourceState = "",
  derivedRelationalSourcePossessor = "",
  derivedRelationalSourcePossessorFixed = false,
  preteritSourceAnalysisOptions = [],
}) {
  return Object.freeze({
    id: bindingId,
    inputRole,
    ownerPreflightKind,
    requiredChoiceIds: freezeArray(requiredChoiceIds),
    requiredResultRoles: freezeArray(requiredResultRoles),
    compoundEmbedStemOptions: freezeArray(compoundEmbedStemOptions),
    ...(adjectivalSourceOptions ? {adjectivalSourceOptions} : {}),
    ...(fixedSequenceAnalysisAllowed ? {fixedSequenceAnalysisAllowed:true} : {}),
    ...(derivedRelationalSourceStem ? {derivedRelationalSourceStem} : {}),
    ...(derivedRelationalSourceState ? {derivedRelationalSourceState} : {}),
    ...(derivedRelationalSourcePossessor ? {derivedRelationalSourcePossessor} : {}),
    ...(derivedRelationalSourcePossessorFixed ? {derivedRelationalSourcePossessorFixed: true} : {}),
    ...(preteritSourceAnalysisOptions.length
      ? {preteritSourceAnalysisOptions: freezeArray(preteritSourceAnalysisOptions)} : {}),
    ...(primitiveEmbedSourceFrame ? {primitiveEmbedSourceFrame, primitiveEmbedSource,
      primitiveEmbedSourceAvailable:true} : {}),
    compoundEmbedUseSourceAllowed,
    ...(compoundEmbedUseSourceAuthorization ? {compoundEmbedUseSourceAuthorization,
      compoundEmbedUseSource, compoundEmbedUseSourceAvailable:true} : {}),
    ...(primitiveMatrixSourceFrame ? {primitiveMatrixSourceFrame, primitiveMatrixSource,
      primitiveMatrixSourceAvailable:true} : {}),
    ...(lexicalConjunctionSource ? {lexicalConjunctionSource,
      derivedCompoundStructure:"conjunctive"} : {}),
    exactResultIdentityRequired: true,
    ownerAuthorizationStillRequired: true,
    grammarAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

// Resolve only the existing nominal embed operand of an authenticated whole
// continuation. The caller's constituent still carries the whole Result.
function getExactCompoundNncEmbedResult(target, exactResult) {
  if (validate(target, "isClassicalNahuatlNominalConstructionResult", exactResult)
    && exactResult.constructionKind === "compound-nnc") return exactResult;
  if (!validate(target, "isClassicalNahuatlDeverbalNncGrammarFrame", exactResult)
    || exactResult.constructionKind !== "patientive-embed-continuation"
    || exactResult.canonicalTargetEvaluator !== "evaluateClassicalNahuatlNominalConstruction") return null;
  const inner = exactResult.canonicalResult;
  const link = exactResult.operationFrame?.patientiveEmbedCompoundFrame;
  const stem = inner?.operationFrame?.compoundStem;
  return validate(target, "isClassicalNahuatlNominalConstructionResult", inner)
    && inner.constructionKind === "compound-nnc" && stem
    && link?.compoundTargetKind === "nnc" && link.compoundStem === stem
    && exactResult.operationFrame?.targetStems?.generalUse === stem
    && exactResult.operationFrame?.targetStems?.restrictedUse === stem
    ? inner : null;
}

function probeNominalConstruction(
  target,
  exactResult,
  ownerSelections = {},
) {
  const ownerPreflight = createOwnerPreflightProbe(target);
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
  let vncProjection = null;
  const selectedChoiceValue = choiceId => ({
    "nominal-embed-relation": ownerSelections?.nominalEmbedRelation,
    "nominal-embed-route": ownerSelections?.nominalEmbedRoute,
    incorporatedObjectId: vncProjection?.sourceObjectRequests?.some(o => o.objectId === ownerSelections?.incorporatedObjectId) ? ownerSelections.incorporatedObjectId : "",
    subject: ownerSelections?.subject,
    "mood-tense": ownerSelections?.mood && ownerSelections?.tense
      ? `${ownerSelections.mood}:${ownerSelections.tense}`
      : "",
    voice: ownerSelections?.voice,
    "compound-structure": ownerSelections?.compoundStructure,
    "compound-bracketing": ownerSelections?.compoundBracketing,
    state: ownerSelections?.state,
    "adjectival-operation": ownerSelections?.adjectivalOperation,
    "adjectival-source-use": ownerSelections?.adjectivalSourceUse,
    "adjectival-source-spelling": ownerSelections?.adjectivalSourceSpelling,
    "calendar-boundary": ownerSelections?.calendarBoundary,
    "fixed-sequence-analysis": ownerSelections?.fixedSequenceAnalysis === "lexicalized-concatenate" ? ownerSelections.fixedSequenceAnalysis : "",
  })[choiceId];
  const unresolvedChoiceIds = choiceIds => choiceIds.filter(
    choiceId => !String(selectedChoiceValue(choiceId) || "").trim(),
  );
  let matrixOnly = false;
  const addAuthorizedProbe = ({
    bindingId,
    inputRole,
    request,
    identityCheck,
    requiredChoiceIds,
    requiredResultRoles,
    adjectivalSourceOptions,
    fixedSequenceAnalysisAllowed = false,
    lexicalConjunctionSource = null,
  }) => {
    if (matrixOnly && bindingId !== "compound-nnc:matrix-result") return;
    // A primitive particle is a staged grammatical operand, not an invented
    // additional noun Result. Only the existing owner can establish its use.
    const primitiveEmbedStem = bindingId === "compound-nnc:matrix-result"
      && ownerSelections?.compoundEmbedStem !== "compound-form"
      ? String(ownerSelections?.compoundEmbedStem || "").trim() : "";
    const compoundUse = bindingId === "compound-nnc:matrix-result"
      ? ownerSelections?.compoundEmbedUseSource : null;
    const primitive = ["compound-nnc:matrix-result", "nominal-embed:matrix-vnc-result"].includes(bindingId)
      && ownerSelections?.primitiveNominalSource;
    const primitiveMatrix = bindingId === "compound-nnc:embed-result"
      ? ownerSelections?.primitiveNominalMatrixSource : null;
    let candidateRequest = primitive?.stem && primitive?.sourceClass ? {
      ...request, source:{...request.source,embedStem:primitive.stem,
        embedClass:primitive.sourceClass,embedSourceClass:primitive.sourceClass},
    } : primitiveEmbedStem ? {
      ...request,
      source: { ...request.source, embedStem: primitiveEmbedStem },
    } : request;
    if (compoundUse?.sourceStem && compoundUse?.compoundUseStem) {
      const source = {...request.source, embedStem:compoundUse.sourceStem,
        compoundEmbedUseSource:compoundUse};
      for (const key of ["embedClass", "embedSourceClass", "embedConstituent"]) delete source[key];
      candidateRequest = {...request, source};
    }
    if (primitiveMatrix?.stem && primitiveMatrix?.sourceClass) {
      candidateRequest = {...candidateRequest, source:{...candidateRequest.source,
        matrixStem:primitiveMatrix.stem, matrixClass:"",
        matrixSourceClass:primitiveMatrix.sourceClass}};
    }
    const probe = ownerPreflight.invoke("evaluateClassicalNahuatlNominalConstruction", [
      candidateRequest,
    ]);
    const sourceAuthorization = probe.value?.sourceAuthorizationFrame || null;
    if (
      probe.threw
      || !ownerPreflight.validate(
        "isClassicalNahuatlNominalConstructionSourceAuthorization",
        sourceAuthorization,
      )
      || identityCheck(sourceAuthorization) !== true
    ) {
      return;
    }
    const primitiveSourceAccepted = Boolean(primitive?.stem
      && (bindingId === "nominal-embed:matrix-vnc-result"
        ? sourceAuthorization.lexicalFacts?.capturedMatrixVncResult === exactResult
        : sourceAuthorization.lexicalFacts?.capturedMatrixNncResult === exactResult)
      && sourceAuthorization.lexicalFacts?.embedSourceClassFrame?.sourceClass === primitive.sourceClass);
    const compoundUseFrame = sourceAuthorization.lexicalFacts?.compoundEmbedUseSourceFrame;
    const compoundUseAccepted = Boolean(compoundUseFrame
      && sourceAuthorization.lexicalFacts?.capturedMatrixNncResult === exactResult
      && compoundUseFrame.sourceStem === compoundUse?.sourceStem
      && compoundUseFrame.compoundUseStem === compoundUse?.compoundUseStem
      && compoundUseFrame.classClaimed === false
      && sourceAuthorization.lexicalFacts.embedSourceClassFrame === null);
    const matrixClassFrame = sourceAuthorization.lexicalFacts?.matrixSourceClassFrame;
    const primitiveMatrixAccepted = Boolean(primitiveMatrix?.stem && primitiveMatrix?.sourceClass
      && sourceAuthorization.authorizationStatus === "authorized"
      && sourceAuthorization.lexicalFacts?.capturedEmbedResult === exactResult
      && sourceAuthorization.lexicalFacts.capturedMatrixNncResult === null
      && sourceAuthorization.sourceConstituents?.matrixStem === primitiveMatrix.stem
      && sourceAuthorization.sourceConstituents.matrixSourceClass === primitiveMatrix.sourceClass
      && matrixClassFrame?.authorizationStatus === "authorized"
      && matrixClassFrame.sourceClass === primitiveMatrix.sourceClass);
    let compoundEmbedStemOptions = [];
    if (bindingId === "compound-nnc:matrix-result") {
      // Availability projects the same owner's particle facts without selecting
      // that operand or discharging the unselected Result requirement.
      const availability = primitiveEmbedStem ? probe : ownerPreflight.invoke(
        "evaluateClassicalNahuatlNominalConstruction", [{
          ...request, source: { ...request.source, embedStem: "ah" },
        }],
      );
      const authorization = availability.value?.sourceAuthorizationFrame;
      if (!availability.threw && ownerPreflight.validate(
        "isClassicalNahuatlNominalConstructionSourceAuthorization", authorization,
      ) && authorization.lexicalFacts?.capturedMatrixNncResult === exactResult) {
        compoundEmbedStemOptions = authorization.lexicalFacts
          ?.negativeParticleSourceFrame?.availableForms || [];
      }
    }
    const choice = makeChoice({
      bindingId,
      inputRole,
      ownerPreflightKind: sourceAuthorization.kind,
      compoundEmbedStemOptions, adjectivalSourceOptions, fixedSequenceAnalysisAllowed,
      compoundEmbedUseSourceAllowed: sourceAuthorization.lexicalFacts?.compoundEmbedUseSourceAllowed === true,
      ...(compoundUseAccepted ? {compoundEmbedUseSourceAuthorization:sourceAuthorization,
        compoundEmbedUseSource:Object.freeze({sourceStem:compoundUseFrame.sourceStem,
          compoundUseStem:compoundUseFrame.compoundUseStem})} : {}),
      ...(primitiveSourceAccepted
        ? {primitiveEmbedSourceFrame:sourceAuthorization,
          primitiveEmbedSource:Object.freeze({stem:primitive.stem,sourceClass:primitive.sourceClass,
            nounClass:sourceAuthorization.lexicalFacts.embedSourceClassFrame.nounClass,
            subclass:sourceAuthorization.lexicalFacts.embedSourceClassFrame.subclass,
            subclassClaimed:Boolean(sourceAuthorization.lexicalFacts.embedSourceClassFrame.subclass)})} : {}),
      ...(primitiveMatrixAccepted ? {primitiveMatrixSourceFrame:sourceAuthorization,
        primitiveMatrixSource:Object.freeze({stem:primitiveMatrix.stem, sourceClass:primitiveMatrix.sourceClass,
          nounClass:matrixClassFrame.nounClass, subclass:matrixClassFrame.subclass,
          subclassClaimed:Boolean(matrixClassFrame.subclass)})} : {}),
      requiredChoiceIds: unresolvedChoiceIds(requiredChoiceIds),
      requiredResultRoles: primitiveMatrixAccepted
        ? requiredResultRoles.filter(role => role !== "compound-matrix-constituent") : compoundUseAccepted
        ? requiredResultRoles.filter(role => role !== "compound-embed-constituent") : primitiveSourceAccepted
        ? requiredResultRoles.filter(role => role !== (bindingId === "nominal-embed:matrix-vnc-result"
          ? "nominal-embed-constituent" : "compound-embed-constituent")) : primitiveEmbedStem
        && sourceAuthorization.lexicalFacts?.negativeParticleSourceFrame
          ?.sourceStem === primitiveEmbedStem
        && sourceAuthorization.lexicalFacts?.capturedMatrixNncResult
          === exactResult
        ? requiredResultRoles.filter(role => role !== "compound-embed-constituent")
        : requiredResultRoles,
      lexicalConjunctionSource,
    });
    if (!choices.some(existing => existing.id === choice.id)) {
      choices.push(choice);
      evidence.push(Object.freeze({ choice, ownerPreflight: sourceAuthorization }));
    }
  };

  for (const [bindingId, inputRole, field, otherRole] of [
    ["calendar-date:numeral-result", "calendar-numeral-result", "numeralResult", "calendar-day-sign-result"],
    ["calendar-date:day-sign-result", "calendar-day-sign-result", "daySignResult", "calendar-numeral-result"],
  ]) addAuthorizedProbe({bindingId, inputRole,
    request: {constructionKind: "calendar-date-nnc", source: {[field]: exactResult}},
    identityCheck: authorization => authorization.lexicalFacts?.[field === "numeralResult"
      ? "capturedNumeralResult" : "capturedDaySignResult"] === exactResult,
    requiredChoiceIds: ["calendar-boundary"], requiredResultRoles: [otherRole]});

  addAuthorizedProbe({bindingId:"adjectival-nnc:source-result",inputRole:"adjectival-source-result",
    request:{constructionKind:"adjectival-nnc",source:{canonicalNncResult:exactResult},
      adjectivalOperation:ownerSelections.adjectivalOperation || "quality-intensification",operationScope:"whole"},
    identityCheck:authorization => authorization.lexicalFacts?.capturedAdjectivalNncResult === exactResult,
    requiredChoiceIds:["adjectival-operation"], requiredResultRoles:[]});
  const adjectivalSource = invoke(target,"getClassicalNahuatlAdjectivalNncSourceConstituent",[exactResult,{
    useShape:ownerSelections.adjectivalSourceUse || "general-use",
    sourceSpelling:ownerSelections.adjectivalSourceSpelling || "productive"}]).value;
  if (adjectivalSource && validate(target,"isClassicalNahuatlAdjectivalNncSourceConstituentFrame",adjectivalSource.bridgeFrame)) {
    const source = {embedStem:adjectivalSource.stem,embedClass:adjectivalSource.nounClass,
      embedSourceClass:adjectivalSource.sourceClass,embedConstituent:{kind:adjectivalSource.kind,
        stem:adjectivalSource.stem,resultFrame:exactResult,bridgeFrame:adjectivalSource.bridgeFrame}};
    const options = Object.freeze({availableUseShapes:adjectivalSource.availableUseShapes,
      availableSourceSpellings:adjectivalSource.availableSourceSpellings,
      selectedUseShape:adjectivalSource.useShape,selectedSourceSpelling:adjectivalSource.sourceSpelling});
    for (const family of ["compound",...(adjectivalSource.useShape === "general-use" ? ["affective"] : [])])
      addAuthorizedProbe({bindingId:`${family}-nnc:embed-result`,inputRole:`${family}-embed-result`,
        request:{constructionKind:`${family}-nnc`,source,...(family === "affective" ? {affectiveMatrix:"tzin"} : {})},
        identityCheck:authorization => authorization.lexicalFacts?.capturedEmbedResult === exactResult,
        requiredChoiceIds:["state","subject"],requiredResultRoles:family === "compound" ? ["compound-matrix-constituent"] : [],
        adjectivalSourceOptions:options});
  }
  // Availability verifies this exact whole through the owner, while the
  // explicit Source declaration remains an unresolved user choice.
  const fixedWhole = getExactFixedModificationConstituent(target, exactResult);
  if (validate(target, "isClassicalNahuatlClauseConjunctionResultFrame", exactResult)
    && exactResult.operationKind === "lexical-conjunction"
    && exactResult.relationFrame?.stateRealization === "compound-handoff"
    && exactResult.conjuncts?.length === 2) {
    const members = exactResult.conjuncts.map(node => invoke(target,
      "getClassicalNahuatlSupplementationClauseSourceFrame", [node.envelope]).value);
    const [embed, matrix] = members.map(member => getExactNncConstituent(target, member));
    if (embed && matrix) {
      const source = Object.freeze({canonicalLexicalConjunctionResult:exactResult,
        embedStem:embed.stem, embedClass:embed.nounClass, embedSourceClass:embed.sourceClass,
        embedConstituent:Object.freeze({kind:embed.kind,stem:embed.stem,resultFrame:members[0],
          ...(embed.bridgeFrame ? {bridgeFrame:embed.bridgeFrame} : {})}),
        matrixStem:matrix.stem, matrixClass:matrix.nounClass, matrixSourceClass:matrix.sourceClass,
        matrixConstituent:Object.freeze({kind:matrix.kind,stem:matrix.stem,resultFrame:members[1],
          ...(matrix.bridgeFrame ? {bridgeFrame:matrix.bridgeFrame} : {})})});
      addAuthorizedProbe({bindingId:"compound-nnc:lexical-conjunction", inputRole:"lexical-conjunction-result",
        request:{constructionKind:"compound-nnc",structure:"conjunctive",source},
        identityCheck:authorization => authorization.lexicalFacts?.capturedLexicalConjunctionResult === exactResult
          && authorization.lexicalFacts.capturedEmbedResult === members[0]
          && authorization.lexicalFacts.capturedMatrixNncResult === members[1]
          && authorization.lexicalFacts.lexicalConjunctionHandoffFrame?.independentConjunctiveSourceValidated === true,
        requiredChoiceIds:["state","subject"],requiredResultRoles:[], lexicalConjunctionSource:source});
    }
  }
  const nounFirst = getExactNncConstituent(target, exactResult, ownerSelections);
  if (nounFirst) addAuthorizedProbe({
    bindingId:"nominal-embed:embed-nnc-result", inputRole:"nominal-embed-result",
    request:{constructionKind:"nominal-embed-vnc",
      ...(exactResult.sourceFrame?.restrictedUseOnly === true
        && exactResult.sourceFrame?.attestedGeneralUseStem === nounFirst.stem
        ? {relation:"object",route:"direct-object"} : {}),
      source:{embedStem:nounFirst.stem,
      embedClass:nounFirst.nounClass || nounFirst.sourceClass,
      embedSourceClass:nounFirst.sourceClass || nounFirst.nounClass,
      embedConstituent:{kind:nounFirst.kind,stem:nounFirst.stem,resultFrame:exactResult,
        ...(nounFirst.bridgeFrame ? {bridgeFrame:nounFirst.bridgeFrame} : {})}}},
    identityCheck:authorization => authorization.lexicalFacts?.capturedEmbedResult === exactResult,
    requiredChoiceIds:[...(fixedWhole ? ["fixed-sequence-analysis"] : []),
      "nominal-embed-relation","nominal-embed-route","subject","mood-tense","voice"],
    requiredResultRoles:["nominal-matrix-vnc-result"],fixedSequenceAnalysisAllowed:Boolean(fixedWhole)});
  if (fixedWhole) {
    addAuthorizedProbe({bindingId:"compound-nnc:embed-result", inputRole:"compound-embed-result",
      request:{constructionKind:"compound-nnc",source:{embedStem:fixedWhole.stem,
        embedClass:"zero",embedConstituent:{kind:fixedWhole.kind,stem:fixedWhole.stem,resultFrame:exactResult,bridgeFrame:fixedWhole.bridgeFrame}}},
      identityCheck:authorization => authorization.lexicalFacts?.capturedEmbedResult === exactResult,
      requiredChoiceIds:["fixed-sequence-analysis","compound-structure","compound-bracketing","state","subject"],
      requiredResultRoles:["compound-matrix-constituent"], fixedSequenceAnalysisAllowed:true});
    const head = fixedWhole.bridgeFrame.headPart.clause.sourceResult;
    const matrix = getExactNncConstituent(target, head);
    if (matrix?.kind === "ordinary-nnc") addAuthorizedProbe({
      bindingId:"compound-nnc:lexicalized-modification", inputRole:"fixed-expression-result",
      request:{constructionKind:"compound-nnc",structure:"integrated",embedRole:"association",
        state:ownerSelections.state || "absolutive",subject:ownerSelections.subject || "3common",
        source:{embedStem:fixedWhole.bridgeFrame.modifierPart.stem,embedClass:"zero",
          embedConstituent:{kind:"adjectival-modification-modifier-part",stem:fixedWhole.bridgeFrame.modifierPart.stem,resultFrame:exactResult,bridgeFrame:fixedWhole.bridgeFrame},
          matrixStem:matrix.stem,matrixClass:matrix.nounClass,matrixSourceClass:matrix.sourceClass,
          matrixConstituent:{kind:matrix.kind,stem:matrix.stem,resultFrame:matrix.resultFrame}}},
      identityCheck:authorization => authorization.lexicalFacts?.capturedEmbedResult === exactResult
        && authorization.lexicalFacts?.capturedMatrixNncResult === head,
      requiredChoiceIds:["fixed-sequence-analysis","state","subject"],
      requiredResultRoles:[],fixedSequenceAnalysisAllowed:true});
  }
  vncProjection = ownerPreflight.invoke(
    "getClassicalNahuatlVncContinuationSourceConstituents",
    [exactResult],
  ).value;
  const matrixValence = nounstemValenceFromProjection(vncProjection);
  if (
    vncProjection
    && vncProjection.grammarAuthority === false
    && vncProjection.callerSuppliedAuthorityAccepted === false
    && vncProjection.sourceStem
    && getExactVncConstituent(target, exactResult)
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
        ...(ownerSelections.nominalEmbedRelation === "object"
          && vncProjection.sourceObjectRequests.length > 1 ? ["incorporatedObjectId"] : []),
        "subject",
        "mood-tense",
        "voice",
      ],
      requiredResultRoles: ["nominal-embed-constituent"],
    });
  }

  const nncProjection = ownerPreflight.invoke(
    "getClassicalNahuatlNncContinuationSourceConstituents",
    [exactResult],
  ).value;
  const compoundNncEmbedResult = getExactCompoundNncEmbedResult(target, exactResult);
  let constituentKind = "";
  let constituentStem = "";
  let constituentClass = "";
  let constituentSourceClass = "";
  let embedOnly = false;
  let affectiveOnly = false;
  if (
    ownerPreflight.validate("isClassicalNahuatlOrdinaryNncResult", exactResult)
    && nncProjection?.canonicalResultFrame === exactResult
    && exactResult.stemOperation?.predicateFormation !== "secondary-general-use"
  ) {
    const classFacts = ordinaryNncOwnerClassFacts(exactResult, nncProjection);
    constituentKind = "ordinary-nnc";
    const includedCitation = exactResult.sourceFrame?.adjectivalProfile?.kind === "possessor-included"
      ? ownerPreflight.invoke("getClassicalNahuatlNncRestrictedUseCitationProjection", [exactResult]).value : null;
    constituentStem = exactResult.sourceFrame?.adjectivalProfile?.kind === "possessor-included"
      ? ownerPreflight.validate("isClassicalNahuatlNncRestrictedUseCitationProjection", includedCitation)
        && includedCitation.canonicalResultFrame === exactResult ? includedCitation.stem : ""
      : nncProjection.sourceIdentityStem;
    constituentClass = classFacts?.nounClass || "";
    constituentSourceClass = classFacts?.sourceClass || "";
  } else if (ownerPreflight.invoke(
    "getClassicalNahuatlObsoleteGeneralUseAdverbialConstituent", [exactResult]
  ).value) {
    const generalUse = ownerPreflight.invoke(
      "getClassicalNahuatlObsoleteGeneralUseAdverbialConstituent", [exactResult]
    ).value;
    constituentKind = generalUse.kind;
    constituentStem = generalUse.stem;
    constituentClass = generalUse.nounClass;
    constituentSourceClass = generalUse.sourceClass;
    embedOnly = true;
  } else if (
    ownerPreflight.validate("isClassicalNahuatlDeverbalNncGrammarFrame", exactResult)
    && exactResult.operationFrame?.constructionKind === "deverbal-action"
    && ["active-action", "potential-patient"].includes(exactResult.operationFrame?.actionKind)
    && exactResult.canonicalResult?.state === "absolutive"
  ) {
    const actionCapture = ownerPreflight.invoke(
      "captureClassicalNahuatlActionNncResultForContinuation", [exactResult]
    ).value;
    if (ownerPreflight.validate("isClassicalNahuatlActionNncContinuationCaptureFrame", actionCapture)) {
      constituentKind = "action-nnc";
      constituentStem = actionCapture.sourceStem;
      constituentClass = "tli";
      matrixOnly = actionCapture.actionKind === "potential-patient";
      constituentSourceClass = matrixOnly ? "tli" : "tli-1";
    }
  } else if (
    ownerPreflight.validate("isClassicalNahuatlPronominalNncResult", exactResult)
    && exactResult.sourceFrame?.familyId === "quantitive"
    && ["qui", "chi"].includes(exactResult.sourceFrame?.matrixFamily)
    && exactResult.operationFrame?.subject === "3common"
    && /-(?:qui|quī|chi|chī)$/u.test(exactResult.typedSlotFrame?.slots?.predicate?.stem || "")
  ) {
    constituentKind = "quantitive-pronominal-nnc";
    constituentStem = exactResult.typedSlotFrame?.slots?.predicate?.stem || "";
    constituentClass = "zero";
    constituentSourceClass = "zero";
    affectiveOnly = true;
  } else if (
    ownerPreflight.validate(
      "isClassicalNahuatlDeverbalNncGrammarFrame",
      exactResult,
    )
    && ["preterit-agentive", "preterit-patientive"].includes(exactResult.operationFrame?.nominalizationKind)
  ) {
    constituentKind = exactResult.operationFrame.nominalizationKind === "preterit-patientive"
      ? "preterit-patientive-nnc" : "preterit-agentive-nnc";
    constituentStem = exactResult.operationFrame?.targetStems?.generalUse || "";
    // The nominal owner projects general-use agentives as tl 1-A;
    // operation nounClass describes the restricted nominal predicate.
    constituentClass = "tl";
    constituentSourceClass = "tl-1-a";
    embedOnly = true;
  } else if (
    ownerPreflight.validate("isClassicalNahuatlDeverbalNncGrammarFrame", exactResult)
    && ["customary-agentive-full", "future-agentive"].includes(exactResult.operationFrame?.nominalizationKind)
    && (exactResult.operationFrame?.nominalizationKind === "future-agentive"
      || exactResult.operationFrame?.nounClass === "tl")
  ) {
    constituentKind = exactResult.operationFrame.nominalizationKind === "future-agentive"
      ? "future-agentive-nnc" : "customary-agentive-nnc";
    constituentStem = exactResult.operationFrame?.targetStems?.generalUse || "";
    constituentClass = "tl";
    constituentSourceClass = "tl-1-a";
    embedOnly = true;
  } else if (
    ownerPreflight.validate("isClassicalNahuatlDeverbalNncGrammarFrame", exactResult)
    && exactResult.operationFrame?.nominalizationKind === "customary-agentive-reanalysis"
    && exactResult.operationFrame?.nounClass === "zero"
    && exactResult.operationFrame?.connectorProfile === "vnc-reanalysis"
    && exactResult.canonicalResult?.nncSlotFrame?.slots?.state?.arity === "vacant"
    && exactResult.canonicalResult.nncSlotFrame.slots.predicate.stem
      === exactResult.operationFrame.targetStems.restrictedUse
  ) {
    constituentKind = "customary-agentive-reanalysis-nnc";
    constituentStem = exactResult.canonicalResult.nncSlotFrame.slots.predicate.stem;
    constituentClass = "zero";
    constituentSourceClass = "zero";
    matrixOnly = true;
  } else if (validate(target,"isClassicalNahuatlNominalConstructionResult",exactResult)
    && exactResult.constructionKind === "adjectival-nnc") {
    constituentKind="adjectival-quality-nnc";
    constituentStem=exactResult.typedSlotFrame.slots.predicate.stem;
    constituentClass=exactResult.operationFrame.nounClass;constituentSourceClass=constituentClass;embedOnly=true;
  } else if (compoundNncEmbedResult) {
    constituentKind = "compound-nnc";
    constituentStem = compoundNncEmbedResult.operationFrame?.compoundStem || "";
    constituentClass = compoundNncEmbedResult.operationFrame?.matrixClass || "";
    constituentSourceClass = compoundNncEmbedResult.operationFrame
      ?.resultSourceClassFrame?.sourceClass || constituentClass;
    embedOnly = compoundNncEmbedResult !== exactResult;
  } else if (
    ownerPreflight.validate(
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
    // An issued compound affective nounstem can fill either noun position.
  }

  if (
    constituentKind
    && constituentStem
    && constituentClass
    && constituentSourceClass
  ) {
    addAuthorizedProbe({
      bindingId: "affective-nnc:embed-result",
      inputRole: "affective-embed-result",
      request: {
        constructionKind: "affective-nnc",
        affectiveMatrix: "tzin",
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
        sourceAuthorization.lexicalFacts?.capturedEmbedResult === exactResult
      ),
      requiredChoiceIds: ["state", "subject"],
      requiredResultRoles: [],
    });
    if (affectiveOnly) {
      return { choices, evidence, capabilitiesComplete: true,
        preflightCompleted: ownerPreflight.completed };
    }
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
          ...(exactResult.sourceFrame?.restrictedUseOnly === true ? {
            state: ownerSelections.state || "absolutive",
            subject: ownerSelections.subject || "3sg",
          } : {}),
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

  const patientiveMatrix = getExactPatientiveMatrixConstituent(target, exactResult);
  const patientiveEmbed = getExactPatientiveMatrixConstituent(target, exactResult, "embed");
  if (patientiveEmbed) addAuthorizedProbe({
    bindingId: "compound-nnc:embed-result", inputRole: "compound-embed-result",
    request: {constructionKind: "compound-nnc", source: {
      embedStem: patientiveEmbed.stem, embedClass: patientiveEmbed.nounClass,
      embedSourceClass: patientiveEmbed.sourceClass,
      embedConstituent: {kind: patientiveEmbed.kind, stem: patientiveEmbed.stem,
        resultFrame: exactResult, bridgeFrame: patientiveEmbed.bridgeFrame},
    }},
    identityCheck: authorization => authorization.lexicalFacts?.capturedEmbedResult === exactResult,
    requiredChoiceIds: ["compound-structure", "compound-bracketing", "state", "subject"],
    requiredResultRoles: ["compound-matrix-constituent"],
  });
  if (patientiveMatrix) addAuthorizedProbe({
    bindingId: "affective-nnc:embed-result", inputRole: "affective-embed-result",
    request: {constructionKind: "affective-nnc", affectiveMatrix: "tzin", source: {
      embedStem: patientiveMatrix.stem, embedClass: patientiveMatrix.nounClass,
      embedSourceClass: patientiveMatrix.sourceClass,
      embedConstituent: {kind: patientiveMatrix.kind, stem: patientiveMatrix.stem,
        resultFrame: exactResult, bridgeFrame: patientiveMatrix.bridgeFrame},
    }},
    identityCheck: authorization => authorization.lexicalFacts?.capturedEmbedResult === exactResult,
    requiredChoiceIds: ["state", "subject"], requiredResultRoles: [],
  });
  if (patientiveMatrix) addAuthorizedProbe({
    bindingId: "compound-nnc:matrix-result", inputRole: "compound-matrix-result",
    request: {constructionKind: "compound-nnc", source: {
      matrixStem: patientiveMatrix.stem, matrixClass: patientiveMatrix.nounClass,
      matrixSourceClass: patientiveMatrix.sourceClass,
      matrixConstituent: {kind: patientiveMatrix.kind, stem: patientiveMatrix.stem,
        resultFrame: exactResult, bridgeFrame: patientiveMatrix.bridgeFrame},
    }},
    identityCheck: authorization => authorization.lexicalFacts?.capturedMatrixNncResult === exactResult,
    requiredChoiceIds: ["compound-structure", "compound-bracketing", "state", "subject"],
    requiredResultRoles: ["compound-embed-constituent"],
  });

  const restricted = ownerPreflight.invoke(
    "captureClassicalNahuatlFutureAgentiveRestrictedEmbed", [exactResult]).value;
  if (restricted && ownerPreflight.validate(
    "isClassicalNahuatlFutureAgentiveRestrictedEmbedReceipt", restricted)) {
    const source = {
      embedStem: restricted.stem, embedClass: restricted.nounClass,
      embedSourceClass: restricted.sourceClass,
      embedConstituent: {kind: "future-agentive-lexicalized-nnc", stem: restricted.stem,
        resultFrame: exactResult, bridgeFrame: restricted},
    };
    for (const construction of ["affective", "compound"]) addAuthorizedProbe({
      bindingId: `${construction}-nnc:embed-result:restricted`,
      inputRole: `${construction}-embed-result`,
      request: {constructionKind: `${construction}-nnc`, source,
        ...(construction === "affective" ? {affectiveMatrix: "tzin"} : {})},
      identityCheck: authorization => authorization.lexicalFacts?.capturedEmbedResult === exactResult,
      requiredChoiceIds: construction === "affective" ? ["state", "subject"]
        : ["compound-structure", "compound-bracketing", "state", "subject"],
      requiredResultRoles: construction === "affective" ? [] : ["compound-matrix-constituent"],
    });
  }

  if (ownerPreflight.validate("isClassicalNahuatlDeverbalNncGrammarFrame", exactResult)
    && exactResult.operationFrame?.nominalizationKind === "preterit-agentive"
    || ownerPreflight.validate("isClassicalNahuatlOrdinaryNncResult", exactResult)
      && exactResult.stemOperation?.predicateFormation === "secondary-general-use") {
    const secondary = exactResult.stemOperation?.predicateFormation === "secondary-general-use";
    const stem = secondary ? exactResult.stemOperation.targetStem
      : exactResult.operationFrame.targetStems.restrictedUse;
    const nounClass = secondary ? exactResult.sourceFrame.nounClass : "zero";
    addAuthorizedProbe({bindingId: "compound-nnc:matrix-result", inputRole: "compound-matrix-result",
      request: {constructionKind: "compound-nnc", source: {
        matrixStem: stem, matrixClass: nounClass,
        matrixSourceClass: secondary ? exactResult.sourceFrame.sourceClass : "zero",
        matrixConstituent: {kind: secondary ? "ordinary-nnc-secondary-general-use" : "preterit-agentive-nnc", stem, resultFrame: exactResult},
      }}, identityCheck: authorization => authorization.lexicalFacts?.capturedMatrixNncResult === exactResult,
      requiredChoiceIds: ["compound-structure", "compound-bracketing", "state", "subject"],
      requiredResultRoles: ["compound-embed-constituent"],
    });
  }

  return { choices, evidence, capabilitiesComplete: true,
    preflightCompleted: ownerPreflight.completed };
}

function probeDeverbalConstruction(
  target,
  exactResult,
  ownerSelections = {},
) {
  const ownerPreflight = createOwnerPreflightProbe(target);
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
    "fixed-sequence-analysis": ownerSelections?.fixedSequenceAnalysis === "lexicalized-concatenate" ? ownerSelections.fixedSequenceAnalysis : "",
    "ownerhood-matrix": ownerSelections?.ownerhoodMatrix,
    "ownerhood-patientive-reading": ownerSelections?.ownerhoodPatientiveReading,
    "nominalization-kind": ownerSelections?.nominalizationKind,
    "action-kind": ownerSelections?.actionKind,
    "action-suffix": ownerSelections?.actionSuffix,
    "patientive-family": ownerSelections?.patientiveFamily,
    "root-stock-allomorph": ownerSelections?.rootStockAllomorph,
    "root-stock-source-analysis": ownerSelections?.rootStockSourceAnalysis,
    "root-stock-noun-class": ownerSelections?.rootStockNounClass,
    "characteristic-reading": ownerSelections?.characteristicReading,
    "continuation-kind": ownerSelections?.continuationKind,
    "continuation-relation": ownerSelections?.continuationRelation,
    "continuation-matrix-stem": ownerSelections?.continuationMatrixStem,
    "continuation-matrix-noun-class": ownerSelections?.continuationMatrixNounClass,
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
    fallbackArgs: [exactResult, "obsolete-root"],
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
      fallbackArgs: nominalizationKind === "instrumentive" && !selectedState
        ? [exactResult, nominalizationKind, "possessive"] : null,
      requiredChoiceIds: [
        ...(!selectedState ? ["state"] : []),
        "subject",
      ],
      requiredResultRoles:
        nominalizationKind === "instrumentive"
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
      "patientive:reconstructed-nonactive-source",
      "reconstructed-nonactive-vnc-source",
      "captureClassicalNahuatlTypeTwoReconstructedNonactiveSourceForPatientive",
      "isClassicalNahuatlTypeTwoReconstructedNonactivePatientiveCaptureFrame",
      ["state", "subject"],
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
      "patientive:root-stock-source",
      "root-stock-vnc-result",
      "captureClassicalNahuatlVncResultForRootStockPatientive",
      "isClassicalNahuatlRootStockPatientiveVncCaptureFrame",
      ["state", "subject"],
    ],
    [
      "ownerhood:nnc-source",
      "ownerhood-nnc-source",
      "captureClassicalNahuatlNncSourceForOwnerhood",
      "isClassicalNahuatlOwnerhoodNncSourceCaptureFrame",
      ["ownerhood-matrix", "state", "subject"],
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
      ["continuation-kind", "continuation-relation", "state", "subject",
        ...(ownerSelections?.continuationKind === "nominal-continuation"
          ? ["continuation-matrix-stem", "continuation-matrix-noun-class"] : [])],
    ],
    [
      "continuation:instrumentive-citation",
      "instrumentive-nnc-result",
      "captureClassicalNahuatlInstrumentiveNncForCitation",
      "isClassicalNahuatlInstrumentiveCitationCaptureFrame",
      ["state", "subject"],
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

  const fixedWhole = getExactFixedModificationConstituent(target, exactResult);
  if (fixedWhole) {
    const ownerhood = captureSpecs.find(spec => spec.bindingId === "ownerhood:nnc-source");
    ownerhood.args = [exactResult, fixedWhole.bridgeFrame.incorporationAnalysis];
    ownerhood.requiredChoiceIds = ["fixed-sequence-analysis",...ownerhood.requiredChoiceIds];
    ownerhood.fixedSequenceAnalysisAllowed = true;
  }
  const capabilitiesComplete = captureSpecs.every(spec => (
    callable(target, spec.issuer) && callable(target, spec.validator)
  ));
  if (!capabilitiesComplete) {
    return { choices: [], evidence: [], capabilitiesComplete: false };
  }
  let predicateBatchCaptures;
  const predicateBatchCapture = (spec, fallback = false) => {
    if (spec.issuer !== "captureClassicalNahuatlVncResultForPredicateNominalization") return null;
    if (predicateBatchCaptures === undefined) {
      predicateBatchCaptures = null;
      const issuer = "captureClassicalNahuatlVncResultForPredicateNominalizationBatch";
      const validator = "isClassicalNahuatlPredicateNominalizationVncCaptureBatchFrame";
      if (callable(target, issuer) && callable(target, validator)) {
        const specifications = [];
        const indices = new Map();
        captureSpecs.filter(candidate => candidate.issuer === spec.issuer)
          .forEach(candidate => {
            const primary = specifications.push({nominalizationKind: candidate.args[1],
              state: candidate.args[2]}) - 1;
            const fallbackIndex = candidate.fallbackArgs
              ? specifications.push({nominalizationKind: candidate.fallbackArgs[1],
                state: candidate.fallbackArgs[2]}) - 1 : null;
            indices.set(candidate, {primary, fallback: fallbackIndex});
          });
        // This optional acceleration cannot make the existing single-owner
        // preflight unavailable. An absent, throwing or invalid batch falls back.
        const batch = invoke(target, issuer, [exactResult, specifications]);
        const authenticated = !batch.threw
          && invoke(target, validator, [batch.value, exactResult, specifications]).value === true
          && batch.value?.canonicalVncResult === exactResult
          && Array.isArray(batch.value.captures)
          && batch.value.captures.length === specifications.length
          && batch.value.captures.every(capture => capture?.authorizationStatus === "blocked"
            || capture?.authorizationStatus === "authorized"
              && validate(target, spec.validator, capture)
              && exactCaptureIdentityPreserved(capture, exactResult));
        if (authenticated) predicateBatchCaptures = {indices, captures: batch.value.captures};
      }
    }
    const index = predicateBatchCaptures?.indices.get(spec)?.[fallback ? "fallback" : "primary"];
    return Number.isInteger(index) ? Object.freeze({installed: true, invoked: true,
      threw: false, value: predicateBatchCaptures.captures[index]}) : null;
  };
  captureSpecs.forEach(spec => {
    let capture = predicateBatchCapture(spec)
      || ownerPreflight.invoke(spec.issuer, spec.args);
    if (spec.fallbackArgs && !capture.threw
      && !ownerPreflight.validate(spec.validator, capture.value)) {
      capture = predicateBatchCapture(spec, true)
        || ownerPreflight.invoke(spec.issuer, spec.fallbackArgs);
    }
    if (
      capture.threw
      || !ownerPreflight.validate(spec.validator, capture.value)
      || !exactCaptureIdentityPreserved(capture.value, exactResult)
    ) {
      return;
    }
    if (spec.bindingId === "patientive:root-stock-source") {
      const stock = capture.value.rootStockAuthorization;
      const suffix = ownerSelections.rootStockAllomorph || stock.defaultAllomorph;
      const defaultClass = stock.nounClassByAllomorph?.[suffix] || stock.nounClass;
      const classes = stock.nounClassOptionsByAllomorph?.[suffix]
        || (stock.nounClassOptions?.length ? stock.nounClassOptions : [defaultClass]);
      const requestedClass = String(ownerSelections.rootStockNounClass || "").trim();
      if (requestedClass && !classes.includes(requestedClass)) return;
    }
    const preteritSourceAnalysisOptions = spec.bindingId === "predicate-nominalization:preterit-source"
      ? ["ordinary", "obsolete-root"].filter(analysis => {
          const candidate = ownerPreflight.invoke(spec.issuer, [exactResult, analysis]);
          return !candidate.threw
            && ownerPreflight.validate(spec.validator, candidate.value)
            && exactCaptureIdentityPreserved(candidate.value, exactResult);
        }) : [];
    const choice = makeChoice({
      bindingId: spec.bindingId,
      preteritSourceAnalysisOptions,
      fixedSequenceAnalysisAllowed: spec.fixedSequenceAnalysisAllowed === true,
      inputRole: capture.value.canonicalOwnerhoodNncResult
        ? "ownerhood-perfective-nnc-source" : spec.inputRole,
      ownerPreflightKind: capture.value.kind,
      requiredChoiceIds: unresolvedChoiceIds([
        ...spec.requiredChoiceIds,
        ...(capture.value.ownerhoodPerfectiveSourceFrame?.contextualReadingRequired === true
          && !capture.value.ownerhoodPerfectiveSourceFrame.readingOptions.includes(
            ownerSelections.ownerhoodPatientiveReading)
          ? ["ownerhood-patientive-reading"] : []),
        ...(capture.value.rootStockAuthorization?.allomorphChoiceRequired === true
          ? ["root-stock-allomorph"] : []),
        ...((capture.value.rootStockAuthorization?.sourceAnalysisOptionsByAllomorph?.[
          ownerSelections.rootStockAllomorph || capture.value.rootStockAuthorization.defaultAllomorph
        ] || []).length > 1
          && !capture.value.rootStockAuthorization?.sourceAnalysisDefaultByAllomorph?.[
            ownerSelections.rootStockAllomorph || capture.value.rootStockAuthorization.defaultAllomorph
          ] ? ["root-stock-source-analysis"] : []),
      ]),
      requiredResultRoles: spec.requiredResultRoles,
    });
    choices.push(choice);
    evidence.push(Object.freeze({ choice, ownerPreflight: capture.value }));
  });
  return { choices, evidence, capabilitiesComplete: true,
    preflightCompleted: ownerPreflight.completed };
}

function probeRelationalConstruction(
  target,
  exactResult,
  ownerSelections = {},
) {
  const ownerPreflight = createOwnerPreflightProbe(target);
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
  if (ownerPreflight.validate("isClassicalNahuatlRelationalResult", exactResult)) {
    const source = exactResult.sourceFrame;
    const preflight = ownerPreflight.invoke("evaluateClassicalNahuatlRelationalNnc", [{
      state: source.state,
      possessorId: source.possessorId,
      subjectMode: source.subjectMode,
      subjectId: source.subjectId,
      sentencePosition: source.sentencePosition,
      nounstem: {
        kind: "classical-nahuatl-nnc-nounstem-request",
        stemId: "pa-direction", operation: "relational-nnc", formation: "option-two",
        sourceFormation: "relational-nnc-predicate", upstreamResult: exactResult,
      },
    }]);
    if (!preflight.threw && ownerPreflight.validate("isClassicalNahuatlRelationalResult", preflight.value)
      && preflight.value?.sourceFrame?.upstreamSourceCarrier?.ownerResult === exactResult) {
      const choice = makeChoice({bindingId: "relational-source:relational-nnc-predicate:pa-direction",
        inputRole: "derived-relational-source", ownerPreflightKind: preflight.value.kind,
        derivedRelationalSourceStem: preflight.value.sourceFrame.upstreamSourceCarrier.sourceStem,
        requiredChoiceIds: []});
      choices.push(choice);
      evidence.push(Object.freeze({choice, ownerPreflight: preflight.value}));
    }
  }
  if (ownerPreflight.validate("isClassicalNahuatlOrdinaryNncResult", exactResult)) {
    const nominal = invoke(target, "getClassicalNahuatlNncContinuationSourceConstituents", [exactResult]).value;
    const characteristic = ownerPreflight.invoke("evaluateClassicalNahuatlRelationalNnc", [{
      nounstem: {kind: "classical-nahuatl-nnc-nounstem-request", stemId: "n-locative",
        operation: "relational-nnc", formation: "option-two", sourceFormation: "can-modified", upstreamResult: exactResult},
      subjectMode: "adverbialized", subjectId: "3common",
    }]);
    if (!characteristic.threw && ownerPreflight.validate("isClassicalNahuatlRelationalResult", characteristic.value)
      && characteristic.value.sourceFrame.upstreamSourceCarrier?.ownerResult === exactResult) {
      const choice = makeChoice({bindingId: "relational-source:can-modified:n-locative",
        inputRole: "characteristic-yo-nominal-source", ownerPreflightKind: characteristic.value.kind,
        derivedRelationalSourceStem: characteristic.value.sourceFrame.upstreamSourceCarrier.sourceStem,
        derivedRelationalSourceState: nominal.state,
        derivedRelationalSourcePossessor: nominal.possessor,
        requiredChoiceIds: []});
      choices.push(choice);evidence.push(Object.freeze({choice, ownerPreflight: characteristic.value}));
    }
    const preflight = ownerPreflight.invoke("evaluateClassicalNahuatlRelationalNnc", [{
      nounstem: {
        kind: "classical-nahuatl-nnc-nounstem-request", stemId: "ca-means",
        operation: "relational-nnc", formation: "option-three",
        sourceFormation: "ordinary-nnc-general-use", sourceKind: "nounstem",
        sourceMode: "embed-matrix", sourceMatrixStem: "ca", upstreamResult: exactResult,
      },
      state: selectedState || "absolutive",
      ...(selectedState === "possessive" && selectedPossessor ? {possessorId: selectedPossessor} : {}),
      subjectMode: selectedSubjectMode, subjectId: selectedSubject || "3common",
    }]);
    if (!preflight.threw && ownerPreflight.validate("isClassicalNahuatlRelationalResult", preflight.value)
      && preflight.value?.sourceFrame?.upstreamSourceCarrier?.ownerResult === exactResult) {
      const choice = makeChoice({bindingId: "relational-source:ordinary-nnc-general-use:ca-means",
        inputRole: "ordinary-nnc-general-use", ownerPreflightKind: preflight.value.kind,
        requiredChoiceIds: unresolvedChoiceIds});
      choices.push(choice);
      evidence.push(Object.freeze({choice, ownerPreflight: preflight.value}));
    }
  }
  RELATIONAL_EXACT_SOURCE_PROBES.forEach(spec => {
    const sourceSubjectPossessor = spec.stemId === "yan-locative"
      && spec.sourceFormation === "perfective-active";
    const preflight = ownerPreflight.invoke("evaluateClassicalNahuatlRelationalNnc", [{
      nounstem: {
        kind: "classical-nahuatl-nnc-nounstem-request",
        stemId: spec.stemId,
        formation: "option-two",
        operation: "relational-nnc",
        sourceFormation: spec.sourceFormation,
        upstreamResult: exactResult,
      },
      state: selectedState || "absolutive",
      ...(selectedState === "possessive" && selectedPossessor && !sourceSubjectPossessor
        ? { possessorId: selectedPossessor }
        : {}),
      subjectMode: selectedSubjectMode,
      subjectId: selectedSubject || "3common",
    }]);
    if (
      preflight.threw
      || !ownerPreflight.validate(
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
      derivedRelationalSourceStem: preflight.value.sourceFrame.upstreamSourceCarrier.sourceStem,
      derivedRelationalSourceState: preflight.value.sourceFrame.state,
      derivedRelationalSourcePossessor: sourceSubjectPossessor
        ? preflight.value.sourceFrame.upstreamSourceCarrier.sourcePossessor || "" : "",
      derivedRelationalSourcePossessorFixed: sourceSubjectPossessor
        && Boolean(preflight.value.sourceFrame.upstreamSourceCarrier.sourcePossessor),
      requiredChoiceIds: unresolvedChoiceIds.filter(id => id !== "state"),
    });
    choices.push(choice);
    evidence.push(Object.freeze({ choice, ownerPreflight: preflight.value }));
  });

  if (
    ownerPreflight.validate("isClassicalNahuatlRelationalResult", exactResult)
    && exactResult.constructionKind === "associated-entity"
  ) {
    const preflight = ownerPreflight.invoke("evaluateClassicalNahuatlRelationalNnc", [{
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
      && ownerPreflight.validate(
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
  return { choices, evidence, capabilitiesComplete: true,
    preflightCompleted: ownerPreflight.completed };
}

function getExactPatientiveMatrixConstituent(target, exactResult, use = "matrix") {
  const capture = invoke(target,
    "captureClassicalNahuatlPatientiveNncResultForMatrixContinuation",
    [exactResult]).value;
  if (!validate(target, "isClassicalNahuatlPatientiveNncContinuationCaptureFrame", capture)) return null;
  const bridge = invoke(target,
    use === "embed" ? "issueClassicalNahuatlPatientiveEmbedConstituentFrame"
      : "issueClassicalNahuatlPatientiveMatrixConstituentFrame", [capture]).value;
  if (!validate(target, use === "embed" ? "isClassicalNahuatlPatientiveEmbedConstituentFrame"
      : "isClassicalNahuatlPatientiveMatrixConstituentFrame", bridge)
    || !(bridge.canonicalPatientiveNncResult === exactResult
      || capture.canonicalNncGrammarFrame === exactResult
        && exactResult.canonicalResult === bridge.canonicalPatientiveNncResult)) return null;
  return Object.freeze({kind: "patientive-nnc", stem: capture.sourceStem,
    nounClass: capture.sourceNounClass, sourceClass: capture.sourceCompoundClass,
    resultFrame: exactResult, bridgeFrame: bridge});
}

function getExactFixedModificationConstituent(target, exactResult) {
  const analysis = invoke(target, "buildClassicalNahuatlAdjectivalModificationIncorporationAnalysis",
    [{sequenceStatus:"lexicalized-concatenate"}]).value;
  const bridge = invoke(target, "projectClassicalNahuatlAdjectivalModificationForIncorporation",
    [exactResult, analysis]).value;
  return validate(target,"isClassicalNahuatlAdjectivalModificationIncorporationAnalysis",analysis)
    && validate(target,"isClassicalNahuatlAdjectivalModificationIncorporationFrame",bridge)
    && bridge.canonicalAdjectivalModificationResult === exactResult
    && bridge.incorporationAnalysis === analysis
    ? Object.freeze({kind:"adjectival-modification",stem:bridge.incorporatedStem,
      nounClass:"zero",sourceClass:"zero",resultFrame:exactResult,bridgeFrame:bridge}) : null;
}

function getExactNncConstituent(target, exactResult, ownerSelections = {}) {
  const fixedWhole = getExactFixedModificationConstituent(target, exactResult);
  if (fixedWhole) return fixedWhole;
  const adjectival=invoke(target,"getClassicalNahuatlAdjectivalNncSourceConstituent",[exactResult,{
    useShape:ownerSelections.adjectivalSourceUse || "general-use",
    sourceSpelling:ownerSelections.adjectivalSourceSpelling || "productive"}]).value;
  if (adjectival && validate(target,"isClassicalNahuatlAdjectivalNncSourceConstituentFrame",adjectival.bridgeFrame)) return adjectival;
  if (validate(target,"isClassicalNahuatlNominalConstructionResult",exactResult)
    && exactResult.constructionKind === "adjectival-nnc") return Object.freeze({kind:"adjectival-quality-nnc",
      stem:exactResult.typedSlotFrame.slots.predicate.stem,nounClass:exactResult.operationFrame.nounClass,
      sourceClass:exactResult.operationFrame.nounClass,resultFrame:exactResult});
  const compoundNncEmbedResult = getExactCompoundNncEmbedResult(target, exactResult);
  const patientiveMatrix = getExactPatientiveMatrixConstituent(target, exactResult, "embed");
  if (patientiveMatrix) return patientiveMatrix;
  const obsoleteGeneralUse = invoke(
    target, "getClassicalNahuatlObsoleteGeneralUseAdverbialConstituent", [exactResult],
  ).value;
  if (obsoleteGeneralUse?.canonicalResultFrame === exactResult) return Object.freeze({
    kind: obsoleteGeneralUse.kind, stem: obsoleteGeneralUse.stem,
    nounClass: obsoleteGeneralUse.nounClass, sourceClass: obsoleteGeneralUse.sourceClass,
    resultFrame: exactResult,
  });
  const projection = invoke(
    target,
    "getClassicalNahuatlNncContinuationSourceConstituents",
    [exactResult],
  ).value;
  let kind = "";
  let stem = "";
  let nounClass = "";
  let sourceClass = "";
  const negative = invoke(target, "getClassicalNahuatlPreteritNncNegativeEmbedProjection", [exactResult]).value;
  if (negative) {
    kind = "preterit-agentive-nnc"; stem = negative.stem;
    nounClass = "tl"; sourceClass = "tl-1-a";
  } else if (
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
    && exactResult.operationFrame?.constructionKind === "deverbal-action"
    && exactResult.operationFrame?.actionKind === "active-action"
    && exactResult.canonicalResult?.state === "absolutive"
  ) {
    const actionCapture = invoke(target,
      "captureClassicalNahuatlActionNncResultForContinuation", [exactResult]).value;
    if (validate(target, "isClassicalNahuatlActionNncContinuationCaptureFrame", actionCapture)) {
      kind = "action-nnc"; stem = actionCapture.sourceStem;
      nounClass = "tli"; sourceClass = "tli-1";
    }
  } else if (invoke(target, "getClassicalNahuatlBasicNumeralEmbedCitation", [exactResult]).value) {
    const numeral = invoke(target, "getClassicalNahuatlBasicNumeralEmbedCitation", [exactResult]).value;
    kind = "cardinal-nnc"; stem = numeral.stem; nounClass = "zero"; sourceClass = "zero";
  } else if (
    validate(target, "isClassicalNahuatlDeverbalNncGrammarFrame", exactResult)
    && ["preterit-agentive", "preterit-patientive"].includes(exactResult.operationFrame?.nominalizationKind)
  ) {
    kind = exactResult.operationFrame.nominalizationKind === "preterit-patientive"
      ? "preterit-patientive-nnc" : "preterit-agentive-nnc";
    stem = exactResult.operationFrame?.targetStems?.generalUse || "";
    // Match the authenticated general-use projection, preserving the
    // Result's separate restricted-use zero-class predicate.
    nounClass = "tl";
    sourceClass = "tl-1-a";
  } else if (
    validate(target, "isClassicalNahuatlDeverbalNncGrammarFrame", exactResult)
    && ["customary-agentive-full", "future-agentive"].includes(exactResult.operationFrame?.nominalizationKind)
    && (exactResult.operationFrame?.nominalizationKind === "future-agentive"
      || exactResult.operationFrame?.nounClass === "tl")
  ) {
    kind = exactResult.operationFrame.nominalizationKind === "future-agentive"
      ? "future-agentive-nnc" : "customary-agentive-nnc";
    stem = exactResult.operationFrame?.targetStems?.generalUse || "";
    nounClass = "tl";
    sourceClass = "tl-1-a";
  } else if (compoundNncEmbedResult) {
    kind = "compound-nnc";
    stem = compoundNncEmbedResult.operationFrame?.compoundStem || "";
    nounClass = compoundNncEmbedResult.operationFrame?.matrixClass || "";
    sourceClass = compoundNncEmbedResult.operationFrame?.resultSourceClassFrame
      ?.sourceClass || nounClass;
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
  const application = projection?.canonicalApplicationFrame;
  const source = projection?.canonicalImperfectiveSourceFrame;
  const privateFullImperfective = !projection?.verbClass
    && validate(target, "isClassicalNahuatlVncApplicationFrame", application)
    && application.authorizationStatus === "authorized"
    && (exactResult === application || exactResult === application.resultFrame)
    && projection.canonicalResultFrame === application.resultFrame
    && validate(target, "isClassicalNahuatlImperfectiveVncSourceFrame", source)
    && source === application.canonicalImperfectiveSourceFrame
    && source === application.resultFrame?.sourceMachineryFrame
    && source === projection.canonicalSourceFrame
    && source.sourceStem === projection.sourceStem;
  return projection?.sourceStem && (projection?.verbClass || privateFullImperfective) && valence
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
  ownerSelections = {},
) {
  if (bindingId === "nominal-embed:embed-nnc-result") {
    const embed = getExactNncConstituent(target, primaryExactResult, ownerSelections);
    const matrix = getExactVncConstituent(target, additionalExactResult);
    if (!embed || !matrix) return null;
    const probe = invoke(target, "evaluateClassicalNahuatlNominalConstruction", [{
      constructionKind:"nominal-embed-vnc",
      ...(primaryExactResult.sourceFrame?.restrictedUseOnly === true
        && primaryExactResult.sourceFrame?.attestedGeneralUseStem === embed.stem
        ? {relation:ownerSelections.nominalEmbedRelation || "object",route:ownerSelections.nominalEmbedRoute || "direct-object"} : {}),
      source:{
        embedStem:embed.stem,embedClass:embed.nounClass || embed.sourceClass,
        embedSourceClass:embed.sourceClass || embed.nounClass,
        embedConstituent:{kind:embed.kind,stem:embed.stem,resultFrame:primaryExactResult,
          ...(embed.bridgeFrame ? {bridgeFrame:embed.bridgeFrame} : {})},
        matrixStem:matrix.stem,matrixVerbClass:matrix.sourceClass,matrixValence:matrix.valence,
        matrixConstituent:{kind:matrix.kind,stem:matrix.stem,resultFrame:additionalExactResult}},
    }]);
    const ownerFrame=probe.value?.sourceAuthorizationFrame;
    return !probe.threw && validate(target,"isClassicalNahuatlNominalConstructionSourceAuthorization",ownerFrame)
      && ownerFrame.lexicalFacts?.capturedEmbedResult === primaryExactResult
      && ownerFrame.lexicalFacts?.capturedMatrixVncResult === additionalExactResult
      ? Object.freeze({ownerFrame,ownerRequestPatch:Object.freeze({})}) : null;
  }
  if (bindingId.startsWith("calendar-date:")) {
    const source = bindingId === "calendar-date:numeral-result"
      ? {numeralResult: primaryExactResult, daySignResult: additionalExactResult}
      : {numeralResult: additionalExactResult, daySignResult: primaryExactResult};
    const probe = invoke(target, "evaluateClassicalNahuatlNominalConstruction", [{
      constructionKind: "calendar-date-nnc", calendarBoundary: ownerSelections.calendarBoundary || "double-nucleus", source,
    }]);
    const ownerFrame = probe.value?.sourceAuthorizationFrame;
    return !probe.threw && probe.value?.authorizationStatus === "authorized"
      && validate(target, "isClassicalNahuatlNominalConstructionSourceAuthorization", ownerFrame)
      && ownerFrame.lexicalFacts.capturedNumeralResult === source.numeralResult
      && ownerFrame.lexicalFacts.capturedDaySignResult === source.daySignResult
      ? Object.freeze({ownerFrame, ownerRequestPatch: Object.freeze({})}) : null;
  }
  const primaryAccepted = bindingId === "nominal-embed:matrix-vnc-result"
    ? Boolean(getExactVncConstituent(target, primaryExactResult))
    : Boolean(getExactNncConstituent(target, primaryExactResult));
  if (!primaryAccepted || !getExactNncConstituent(
    target,
    additionalExactResult,
  )) return null;
  if (bindingId === "nominal-embed:matrix-vnc-result") {
    const numeral = getExactNncConstituent(target, additionalExactResult);
    const matrix = getExactVncConstituent(target, primaryExactResult);
    const negative = invoke(target, "getClassicalNahuatlPreteritNncNegativeEmbedProjection", [additionalExactResult]).value;
    const attestedObjectStem = additionalExactResult.sourceFrame?.restrictedUseOnly === true
      && additionalExactResult.sourceFrame?.attestedGeneralUseStem === numeral?.stem;
    const predicateUse = additionalExactResult.sourceFrame?.attestedPredicateEmbedUse;
    const exactPredicateProjection = predicateUse
      && validate(target, "isClassicalNahuatlOrdinaryNncResult", additionalExactResult)
      ? invoke(target, "getClassicalNahuatlNncContinuationSourceConstituents", [additionalExactResult]).value : null;
    const attestedPredicateUse = Boolean(exactPredicateProjection
      && exactPredicateProjection.canonicalResultFrame === additionalExactResult
      && exactPredicateProjection.canonicalSourceFrame === additionalExactResult.sourceFrame
      && exactPredicateProjection.predicateStem === numeral?.stem);
    // A class-free matrix can be admitted only by this same canonical
    // nominal Source authorization with the actual additional operand.
    const fullImperfectiveMatrix = Boolean(matrix && !matrix.sourceClass);
    if (numeral?.kind === "cardinal-nnc" || negative || attestedObjectStem || attestedPredicateUse || fullImperfectiveMatrix) {
      const probe = invoke(target, "evaluateClassicalNahuatlNominalConstruction", [{
        constructionKind: "nominal-embed-vnc",
        ...(attestedObjectStem ? {relation:ownerSelections.nominalEmbedRelation || "object",route:ownerSelections.nominalEmbedRoute || "direct-object"} : {}),
        source: {embedStem: numeral.stem, embedClass: numeral.nounClass,
          matrixStem: matrix.stem, matrixVerbClass: matrix.sourceClass, matrixValence: matrix.valence,
          embedConstituent: {kind: attestedPredicateUse ? "ordinary-nnc-predicate" : numeral.kind,
            stem: numeral.stem, resultFrame: additionalExactResult,
            ...(numeral.bridgeFrame ? {bridgeFrame: numeral.bridgeFrame} : {})},
          matrixConstituent: {kind: matrix.kind, stem: matrix.stem, resultFrame: primaryExactResult}},
      }]);
      const ownerFrame = probe.value?.sourceAuthorizationFrame;
      return !probe.threw && validate(target, "isClassicalNahuatlNominalConstructionSourceAuthorization", ownerFrame)
        && (ownerFrame.lexicalFacts?.capturedEmbedResult === additionalExactResult
          || ownerFrame.lexicalFacts?.capturedEmbedNegativeProjection?.canonicalSentenceResult === additionalExactResult)
        && ownerFrame.lexicalFacts?.capturedMatrixVncResult === primaryExactResult
        ? Object.freeze({ownerFrame, ownerRequestPatch: Object.freeze({})}) : null;
    }
  }
  const complementaryBindingId = bindingId.startsWith("compound-nnc:embed-result")
    ? "compound-nnc:matrix-result"
    : "compound-nnc:embed-result";
  const additionalProbe = probeNominalConstruction(
    target,
    additionalExactResult,
    ownerSelections,
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
        ? probeNominalConstruction(
            ownerTarget,
            currentResult,
            ownerSelections,
          )
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
      && probe.preflightCompleted
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
            : !probe.capabilitiesComplete || !probe.preflightCompleted
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
      ownerPreflightCompleted: probe.preflightCompleted === true,
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
      ownerSelections:Object.freeze({...ownerSelections}),
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
          || frame.ownerPreflightCompleted === false
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
        && Object.isFrozen(choice.compoundEmbedStemOptions)
        && choice.compoundEmbedStemOptions.every(value => typeof value === "string")
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
            frameContexts.get(bindingFrame)?.ownerSelections || {},
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
