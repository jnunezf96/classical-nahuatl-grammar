// Non-authorizing validation projection for independently owned Lessons 24-25
// source-analysis, causative-formation, participant, voice, mood, and
// supplementation semantics. This module owns no Inventory atom and defines no
// grammar. Every retained fact is emitted by an installed canonical runtime
// operation; Canvas text, translations, expected answers, and lesson metadata
// are never operation inputs.

import {
  CLASSICAL_NAHUATL_LESSONS23_26_GCD,
  CLASSICAL_NAHUATL_LESSONS23_26_LCM,
} from "./vnc_lessons23_26_grammar.mjs";

function deepFreeze(value, seen = new WeakSet()) {
  if (!value || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const nested of Object.values(value)) deepFreeze(nested, seen);
  return Object.freeze(value);
}

function active(runtime, stem, {
  verbClass = "B",
  sourceValence = "intransitive",
  sourceSubject = "3sg",
  objectPerson = "",
  mood = "indicative",
  tense = "present",
} = {}) {
  return runtime.buildClassicalNahuatlVerbstemClassFrame(stem, {
    subject: sourceSubject,
    mood,
    tense,
    verbClass,
    perfectiveClass: verbClass,
    valence: sourceValence,
    requestedSourceValence: sourceValence,
    transitivity: sourceValence === "intransitive"
      ? "intransitive" : "transitive",
    objectKind: sourceValence === "intransitive"
      ? "none" : sourceValence,
    objectPerson,
    object: objectPerson,
  });
}

function compactSource(runtime, stem, options = {}) {
  const frame = active(runtime, stem, options);
  const analysis = runtime.buildClassicalNahuatlVncDerivationSourceAnalysisFrame(
    frame,
  );
  return {
    authorizationStatus: frame?.authorizationStatus || "blocked",
    blockReason: frame?.blockReason || "",
    sourceStem: frame?.sourceVerbstem || frame?.stem || "",
    classId: frame?.classId || "",
    sourceValence: frame?.classTargetValence || "",
    citationForm: frame?.citationForm || "",
    finalVowel:
      analysis?.sourceFinalShapeFrame?.finalLetter || "",
    finalVowelLength:
      analysis?.sourceFinalShapeFrame?.finalVowelLength || "",
    analysisAuthorizationStatus:
      analysis?.authorizationStatus || "blocked",
    analysisCategories: (analysis?.analyses || [])
      .map(record => record.category),
    callerSuppliedAnalysisAllowed:
      analysis?.callerSuppliedAnalysisAllowed === true,
    formulaArtifactAuthority:
      analysis?.formulaArtifactAuthority === true,
    surfaceArtifactAuthority:
      analysis?.surfaceArtifactAuthority === true,
  };
}

function compactOption(option = {}) {
  const bridge = option.typeTwoInternalBridgeFrame || null;
  const targetConstruction = option.targetConstruction || null;
  return {
    authorizationStatus: option.authorizationStatus || "authorized",
    optionId: option.optionId || "",
    sourceStem: option.sourceStem || "",
    targetStem: option.targetStem || "",
    formulaTargetStem: option.formulaTargetStem || option.targetStem || "",
    derivationType: option.derivationType || "",
    derivationSubtype: option.derivationSubtype || "",
    derivationRoute: option.derivationRoute || "",
    procedure: option.procedure || "",
    ruleId: option.ruleId || "",
    derivationLicenseId: option.derivationLicenseId || "",
    licensedSourceClass: option.licensedSourceClass || "",
    sourceAnalysisId: option.sourceAnalysisId || "",
    blocksCompetingAnalysis:
      option.targetConstruction?.blocksCompetingAnalysis || "",
    targetConstruction: targetConstruction ? {
      operation: targetConstruction.operation || "",
      preserve: targetConstruction.preserve || "",
      remove: targetConstruction.remove || "",
      add: targetConstruction.add || "",
      underlyingAdd: targetConstruction.underlyingAdd || "",
      lengtheningEnvironment:
        targetConstruction.lengtheningEnvironment || "",
      surfaceChange: targetConstruction.surfaceChange ?? null,
    } : null,
    targetClass: option.targetClass || "",
    stemRelation: option.stemRelation || "",
    formationRuleTier: option.formationRuleTier || "",
    sourceMeaning: option.sourceMeaning || "",
    additionalSourceReadings: Object.freeze(
      (option.additionalSourceReadings || []).map(reading => Object.freeze({
        meaning: reading?.meaning || "",
        relation: reading?.relation || "",
      }))
    ),
    targetMeaning: option.targetMeaning || "",
    additionalTargetReadings: Object.freeze(
      (option.additionalTargetReadings || []).map(reading => Object.freeze({
        meaning: reading?.meaning || "",
        relation: reading?.relation || "",
      }))
    ),
    typeTwoBridgeStem: option.typeTwoBridgeStem || "",
    typeTwoBridgeSuffixFamily: option.typeTwoBridgeSuffixFamily || "",
    participantRule: option.participantRule || "",
    bridge: bridge ? {
      authorizationStatus: bridge.authorizationStatus,
      sourceStem: bridge.sourceStem,
      bridgeBaseOperation: bridge.bridgeBaseOperation,
      suffixFamily: bridge.suffixFamily,
      nonactiveStem: bridge.nonactiveStem,
      internalPrerequisiteOnly: bridge.internalPrerequisiteOnly === true,
      lesson20OperationAuthority: bridge.lesson20OperationAuthority === true,
      curriculumOrderAuthority: bridge.curriculumOrderAuthority === true,
    } : null,
    formulaArtifactAuthority: option.formulaArtifactAuthority === true,
    surfaceArtifactAuthority: option.surfaceArtifactAuthority === true,
    callerSuppliedTargetAllowed: option.callerSuppliedTargetAllowed === true,
  };
}

function compactDerivation(runtime, stem, options = {}) {
  const source = active(runtime, stem, options);
  const analysis = runtime.buildClassicalNahuatlVncDerivationSourceAnalysisFrame(
    source,
  );
  const inventory = runtime.getClassicalNahuatlVncDerivationOptionInventory(
    source,
    { derivationType: "causative" },
  );
  return {
    authorizationStatus: inventory?.authorizationStatus || "blocked",
    blockReason: inventory?.blockReason || "",
    sourceStem: analysis?.sourceStem || stem,
    sourceClass: analysis?.sourceClass || "",
    sourceValence: analysis?.sourceValence || "",
    analysisCategories: (analysis?.analyses || [])
      .map(record => record.category),
    optionCount: inventory?.options?.length || 0,
    selectorRequired: inventory?.selectorRequired === true,
    selectionRequired: inventory?.selectionRequired === true,
    options: (inventory?.options || []).map(compactOption),
    callerSuppliedTargetAllowed:
      inventory?.callerSuppliedTargetAllowed === true,
    formulaArtifactAuthority:
      inventory?.formulaArtifactAuthority === true,
    surfaceArtifactAuthority:
      inventory?.surfaceArtifactAuthority === true,
  };
}

function buildSignedDestockalProbe(runtime, stem, options = {}) {
  const source = active(runtime, stem, options);
  const sourceAnalysisFrame =
    runtime.buildClassicalNahuatlVncDerivationSourceAnalysisFrame(source);
  const typeOneInventory =
    runtime.getClassicalNahuatlVncDerivationOptionInventory(
      source,
      { derivationType: "causative" },
    );
  return {
    sourceAnalysisCanonical:
      runtime.isClassicalNahuatlVncDerivationSourceAnalysisFrame(
        sourceAnalysisFrame,
      ),
    typeOneInventoryCanonical:
      runtime.isClassicalNahuatlVncDerivationOptionInventory(
        typeOneInventory,
      ),
    sourceAnalysisFrame,
    typeOneInventory,
  };
}

function buildSignedThemeProbe(runtime, stem, options = {}) {
  const source = active(runtime, stem, options);
  const sourceAnalysisFrame =
    runtime.buildClassicalNahuatlVncDerivationSourceAnalysisFrame(source);
  return {
    sourceAnalysisCanonical:
      runtime.isClassicalNahuatlVncDerivationSourceAnalysisFrame(
        sourceAnalysisFrame,
      ),
    sourceAnalysisFrame,
  };
}

function buildSignedStockVowelHarmonyProbe(runtime, stem, options = {}) {
  const source = active(runtime, stem, options);
  const sourceAnalysisFrame =
    runtime.buildClassicalNahuatlVncDerivationSourceAnalysisFrame(source);
  return {
    sourceAnalysisCanonical:
      runtime.isClassicalNahuatlVncDerivationSourceAnalysisFrame(
        sourceAnalysisFrame,
      ),
    sourceAnalysisFrame,
  };
}

function compactPerfective(runtime, stem, classId) {
  const frame = runtime.getClassicalNahuatlPerfectiveStem(
    stem,
    { classId },
  );
  return {
    imperfectiveStem: frame?.imperfectiveStem || "",
    perfectiveStem: frame?.perfectiveStem || "",
    changeRule: frame?.changeRule || "",
  };
}

function buildDestockalNonextantSourceLifecycleProjection(runtime) {
  let sourceSystem = null;
  const observations = ["po-pō-ca", "to-tō-ca"].map(sourceStem => {
    const frame = runtime.evaluateClassicalNahuatlLateVncDerivation({
      sourceStem, sourceValence: "intransitive", verbClass: "A", subject: "3sg",
      mood: "indicative", tense: "present", derivationType: "direct", voice: "active",
      lateOperation: "frequentative", lateVariant: "destockal-lexicalized",
    });
    const operation = frame?.operationFrame;
    const relation = operation?.operationFacts?.nonextantSourceLifecycleFrame;
    const historicalSource = relation?.historicalSource;
    const derivation = relation?.derivation;
    const coalescence = relation?.sourceCoalescenceFrame;
    if (!sourceSystem && relation) sourceSystem = relation.sourceLifecycleSystem;
    const exact = Boolean(relation && historicalSource && derivation && coalescence
      && runtime.isClassicalNahuatlClosureFrame(frame)
      && runtime.isClassicalNahuatlOperationFrame(operation)
      && frame.authorizationStatus === "authorized"
      && relation.authorizationStatus === "authorized"
      && relation.sourceLifecycleSystem === sourceSystem
      && sourceSystem.sources.includes(historicalSource)
      && historicalSource.independentUseStatus === "nonextant"
      && historicalSource.historicalStatus === "reconstructed-source"
      && historicalSource.stemFormative === "ni"
      && coalescence.root === historicalSource.root
      && coalescence.stockFormative === historicalSource.stockFormative
      && coalescence.underlyingStemFormative === historicalSource.stemFormative
      && derivation.operation === "destockal-intransitive-frequentative"
      && derivation.replacedStemFormative === historicalSource.stemFormative
      && derivation.targetStemFormative === "ca"
      && derivation.stockVowelPreserved === true
      && derivation.targetClass === operation.targetClass
      && derivation.targetStem === operation.targetStem
      && operation.targetTypedVncSlotFrame === frame.finalTypedVncSlotFrame
      && frame.finiteSurfaceFrame?.machineryFrame === frame.selectedMachineryFrame
      && relation.sourceAdmissionAuthority === false
      && relation.canvasExampleAuthority === false
      && relation.callerSuppliedGrammarAuthority === false
      && frame.finiteSurfaceFrame?.formulaDerivedFromWrittenProjection === false
      && frame.finiteSurfaceFrame?.writtenDerivedFromFormulaProjection === false);
    return {
      exact,
      historicalSource: historicalSource || null,
      sourceCoalescence: coalescence || null,
      derivation: derivation || null,
      targetPredicateStem: frame?.finalTypedVncSlotFrame?.slots?.predicate?.stem || "",
      formula: frame?.formulaRealization || "",
      surface: frame?.surfaceRealization || "",
    };
  });
  const observedIds = observations.map(item => item.historicalSource?.lexemeId).filter(Boolean);
  const authorized = Boolean(sourceSystem
    && sourceSystem.sourceType.rank === "intransitive-destockal-verbstem"
    && sourceSystem.sourceType.stemFormative === "ni"
    && sourceSystem.sources.length === 2
    && new Set(observedIds).size === sourceSystem.sources.length
    && sourceSystem.sources.every(source => observedIds.includes(source.lexemeId))
    && observations.every(item => item.exact));
  return deepFreeze({
    kind: "classical-nahuatl-destockal-irregular-source-validation-frame",
    authorizationStatus: authorized ? "authorized" : "blocked",
    blockReason: authorized ? "" : "destockal-nonextant-source-lifecycle-observation-incomplete",
    constraints: { destockalIrregularSourceLifecycle: {
      nonextantNiSourceLifecycle: {
        sourceLifecycleSystem: sourceSystem,
        sourceType: sourceSystem?.sourceType || null,
        entryCount: observations.length,
        entries: observations,
      },
    } },
    typedFrameAuthority: true,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    storedExampleAuthority: false,
  });
}

// Lexical examples select observations, never admissible input. Each entry
// reads an issued lexical analysis, executes its reconstructed source, and
// continues the actual contracted Source Result through its causative owner.
function buildExtantFusedNominalRootProjection(runtime, sourceSelection) {
  const blocked = blockReason => deepFreeze({
    kind: "classical-nahuatl-destockal-irregular-source-validation-frame",
    authorizationStatus: "blocked", blockReason,
  });
  if (sourceSelection !== "cehui") return blocked("recognized-nominal-root-observation-required");
  const applicationFrame = runtime.evaluateClassicalNahuatlVncApplication({
    sourceStem: "cē-hui", verbClass: "B", sourceValence: "intransitive",
    sourceSubject: "3sg", subject: "3sg", requestedDerivation: "direct",
    requestedVoice: "active", mood: "indicative", tense: "present", outputScope: "single",
  });
  const meaningFrame = runtime.buildClassicalNahuatlExtantDestockalMeaningFrame({ applicationFrame });
  const nounSource = runtime.buildClassicalNahuatlOrdinaryNncSourceFrame({
    stem: "ce", sourceClass: "tl-1-a",
  });
  // An observation coordinate, not a lexical claim about animacy or number.
  const nounOperation = runtime.buildClassicalNahuatlOrdinaryNncOperationFrame(nounSource, {
    state: "absolutive", subject: "3common", humanness: "nonhuman",
  });
  const nounResult = runtime.evaluateClassicalNahuatlOrdinaryNnc(nounSource, nounOperation);
  const nominalRootRelation = runtime.buildClassicalNahuatlExtantDestockalNounRelationFrame({
    meaningFrame, nounResult,
  });
  if (!runtime.isClassicalNahuatlExtantDestockalNounRelationFrame(nominalRootRelation)) {
    return blocked(nominalRootRelation.blockReason || "canonical-nominal-root-relation-required");
  }
  return deepFreeze({
    kind: "classical-nahuatl-destockal-irregular-source-validation-frame",
    authorizationStatus: "authorized", blockReason: "",
    requestedRelation: "extant-fused-nominal-root", sourceSelection,
    constraints: { destockalIrregularSourceLifecycle: { extantFusedSources: {
      cehui: { nominalRootRelation },
    } } },
    typedFrameAuthority: true, formulaStringAuthority: false,
    surfaceStringAuthority: false, storedExampleAuthority: false,
  });
}

function buildFusedHuaSourceCoalescenceProjection(runtime) {
  const sources = {};
  // Two observation fixtures for the existing coalescence rule, not a
  // vocabulary gate or a second reconstruction/generation implementation.
  for (const [key, sourceStem] of [["cehua", "cē-hua"], ["ehua", "ē-hua"]]) {
    const request = {
      sourceStem, verbClass: "A", sourceValence: "intransitive",
      sourceSubject: "3sg", subject: "3sg", requestedDerivation: "direct",
      requestedVoice: "active", mood: "indicative", tense: "present", outputScope: "single",
    };
    const sourceApplicationFrame = runtime.evaluateClassicalNahuatlVncApplication(request);
    const sourceAnalysisFrame = sourceApplicationFrame?.resultFrame?.sourceAnalysisFrame;
    const sourceAnalysis = sourceAnalysisFrame?.analyses?.find(analysis => (
      analysis.category === "fused-destockal-hua-exact"
      && analysis.analysisAuthority === "typed-lexical-source-analysis"
      && analysis.destockalStructureFrame?.typeId === "long-vowel-hua"
    ));
    const notationFrame = sourceAnalysis?.reconstructionNotationFrame;
    const reconstructedSourceApplicationFrame = notationFrame
      ? runtime.evaluateClassicalNahuatlVncApplication({ ...request, sourceStem: notationFrame.underlyingStem })
      : null;
    const sourceFiniteSurfaceFrame = reconstructedSourceApplicationFrame?.resultFrame?.finiteSurfaceFrame;
    const sourceCoalescenceBoundaryFrame = sourceFiniteSurfaceFrame?.neighboringBoundaries?.find(boundary => (
      boundary.coalescenceFrame?.root === sourceAnalysis?.root
      && boundary.coalescenceFrame?.stockFormative === sourceAnalysis?.stockFormative
      && boundary.coalescenceFrame?.underlyingStemFormative === sourceAnalysis?.stemFormative
    ));
    const sourceCoalescenceFrame = sourceCoalescenceBoundaryFrame?.coalescenceFrame;
    const authorized = Boolean(
      runtime.isClassicalNahuatlVncApplicationFrame(sourceApplicationFrame)
      && sourceApplicationFrame.authorizationStatus === "authorized"
      && runtime.isClassicalNahuatlVncDerivationSourceAnalysisFrame(sourceAnalysisFrame)
      && sourceAnalysis?.lexicalStatus === "lexically-licensed-source-analysis"
      && notationFrame?.destockalStructureFrame === sourceAnalysis.destockalStructureFrame
      && notationFrame?.underlyingStem === sourceAnalysis.segments.join("-")
      && notationFrame?.extantSourceStem === sourceStem
      && notationFrame?.status === "reconstructed-underlying-source-of-extant-fused-stem"
      && runtime.isClassicalNahuatlVncApplicationFrame(reconstructedSourceApplicationFrame)
      && reconstructedSourceApplicationFrame.authorizationStatus === "authorized"
      && runtime.isClassicalNahuatlVncFiniteSurfaceFrame(sourceFiniteSurfaceFrame)
      && sourceCoalescenceFrame?.authorizationStatus === "authorized"
      && sourceCoalescenceBoundaryFrame.applicableRuleFrames.includes(sourceCoalescenceFrame)
      && sourceCoalescenceFrame.realization.underlyingVowelCount === 2
      && sourceCoalescenceFrame.realization.surfaceVowelCount === 1
      && sourceCoalescenceFrame.resultStock === sourceCoalescenceBoundaryFrame.leftSurfaceAfter
      && sourceCoalescenceBoundaryFrame.rightSurfaceAfter === ""
      && sourceCoalescenceBoundaryFrame.formulaCarrierChangedByWrittenBoundary === false
      && sourceApplicationFrame.resultFrame.surfaceRealization
        === reconstructedSourceApplicationFrame.resultFrame.surfaceRealization
      && ["grammarAuthority", "sourceAdmissionAuthority", "formulaStringAuthority",
        "surfaceStringAuthority", "canvasExampleAuthority", "callerSuppliedGrammarAuthority"]
        .every(name => notationFrame[name] === false)
    );
    if (!authorized) return deepFreeze({
      kind: "classical-nahuatl-destockal-e-hua-system-validation-frame",
      authorizationStatus: "blocked", blockReason: "canonical-fused-hua-source-coalescence-required",
    });
    sources[key] = {
      sourceApplicationFrame, sourceAnalysisFrame, sourceAnalysis, notationFrame,
      reconstructedSourceApplicationFrame, sourceFiniteSurfaceFrame,
      sourceCoalescenceBoundaryFrame, sourceCoalescenceFrame,
    };
  }
  return deepFreeze({
    kind: "classical-nahuatl-destockal-e-hua-system-validation-frame",
    authorizationStatus: "authorized", blockReason: "",
    constraints: { destockalEHuaSystem: { reconstructedSourceCoalescence: { sources } } },
    typedFrameAuthority: true, formulaStringAuthority: false,
    surfaceStringAuthority: false, storedExampleAuthority: false,
  });
}

function buildExtantFusedSourceProjection(runtime, sourceSelection) {
  const sourceStem = { mini: "mī-ni", xini: "xī-ni", cehui: "cē-hui" }[sourceSelection];
  const blocked = reason => deepFreeze({
    kind: "classical-nahuatl-destockal-irregular-source-validation-frame",
    authorizationStatus: "blocked", blockReason: reason,
  });
  if (!sourceStem) return blocked("recognized-extant-fused-source-observation-required");
  const request = {
    sourceStem, verbClass: "B", sourceValence: "intransitive", sourceSubject: "3sg",
    subject: "3sg", requestedDerivation: "direct", requestedVoice: "active",
    mood: "indicative", tense: "present", outputScope: "single",
  };
  const sourceApplicationFrame = runtime.evaluateClassicalNahuatlVncApplication(request);
  const sourceResult = sourceApplicationFrame?.resultFrame;
  const sourceAnalysisFrame = sourceResult?.sourceAnalysisFrame;
  if (!runtime.isClassicalNahuatlVncApplicationFrame(sourceApplicationFrame)
    || sourceApplicationFrame.authorizationStatus !== "authorized"
    || !runtime.isClassicalNahuatlVncDerivationSourceAnalysisFrame(sourceAnalysisFrame)) {
    return blocked("canonical-extant-fused-source-required");
  }
  const sourceAnalysis = sourceAnalysisFrame.analyses.find(analysis => (
    ["fused-destockal-ni-exact", "fused-destockal-hui-exact"].includes(analysis.category)
    && analysis.analysisAuthority === "typed-lexical-source-analysis"
    && analysis.lexicalStatus === "lexically-licensed-source-analysis"
    && analysis.destockalStructureFrame?.typeId === "long-vowel-ni-or-hui"
  ));
  if (!sourceAnalysis) return blocked("exact-extant-fused-source-analysis-required");
  const reconstructedSourceStem = sourceAnalysis.segments.join("-");
  const reconstructedSourceApplicationFrame = runtime.evaluateClassicalNahuatlVncApplication({
    ...request, sourceStem: reconstructedSourceStem,
  });
  const sourceFiniteSurfaceFrame = reconstructedSourceApplicationFrame?.resultFrame?.finiteSurfaceFrame;
  const sourceCoalescenceBoundaryFrame = sourceFiniteSurfaceFrame?.neighboringBoundaries?.find(boundary => (
    boundary.coalescenceFrame?.root === sourceAnalysis.root
    && boundary.coalescenceFrame?.stockFormative === sourceAnalysis.stockFormative
    && boundary.coalescenceFrame?.underlyingStemFormative === sourceAnalysis.stemFormative
  ));
  const sourceCoalescenceFrame = sourceCoalescenceBoundaryFrame?.coalescenceFrame;
  const identity = value => String(value || "").normalize("NFC").replaceAll("-", "");
  const sourceExact = Boolean(sourceCoalescenceFrame
    && runtime.isClassicalNahuatlVncApplicationFrame(reconstructedSourceApplicationFrame)
    && reconstructedSourceApplicationFrame.authorizationStatus === "authorized"
    && runtime.isClassicalNahuatlVncFiniteSurfaceFrame(sourceFiniteSurfaceFrame)
    && sourceCoalescenceFrame.authorizationStatus === "authorized"
    && sourceCoalescenceBoundaryFrame.applicableRuleFrames.includes(sourceCoalescenceFrame)
    && sourceCoalescenceFrame.realization.underlyingVowelCount === 2
    && sourceCoalescenceFrame.realization.surfaceVowelCount === 1
    && sourceCoalescenceFrame.resultStock === sourceCoalescenceBoundaryFrame.leftSurfaceAfter
    && sourceCoalescenceBoundaryFrame.rightSurfaceAfter === ""
    && sourceCoalescenceBoundaryFrame.formulaCarrierChangedByWrittenBoundary === false
    && identity(`${sourceCoalescenceFrame.resultStock}-${sourceAnalysis.stemFormative}`) === identity(sourceAnalysisFrame.sourceStem)
    && sourceFiniteSurfaceFrame.formulaDerivedFromWrittenProjection === false
    && sourceFiniteSurfaceFrame.writtenDerivedFromFormulaProjection === false);
  if (!sourceExact) return blocked("actual-extant-fused-source-coalescence-required");
  const notationFrame = sourceAnalysis.reconstructionNotationFrame;
  if (!notationFrame
    || notationFrame.kind !== "classical-nahuatl-destockal-reconstruction-notation-frame"
    || notationFrame.notation !== "*"
    || notationFrame.notationScope !== "underlying-destockal-source"
    || notationFrame.status !== "reconstructed-underlying-source-of-extant-fused-stem"
    || notationFrame.destockalStructureFrame !== sourceAnalysis.destockalStructureFrame
    || notationFrame.underlyingStem !== reconstructedSourceStem
    || identity(notationFrame.extantSourceStem) !== identity(sourceAnalysisFrame.sourceStem)
    || ["grammarAuthority", "sourceAdmissionAuthority", "formulaStringAuthority",
      "surfaceStringAuthority", "canvasExampleAuthority", "callerSuppliedGrammarAuthority"]
      .some(key => notationFrame[key] !== false)) {
    return blocked("canonical-extant-fused-source-reconstruction-notation-required");
  }
  const derivationOptionInventory = runtime.getClassicalNahuatlVncDerivationOptionInventory(
    sourceResult.selectedMachineryFrame, { derivationType: "causative" },
  );
  if (!runtime.isClassicalNahuatlVncDerivationOptionInventory(derivationOptionInventory)) {
    return blocked("canonical-extant-fused-source-causative-inventory-required");
  }
  const selectedOption = derivationOptionInventory.options.find(option => (
    option.derivationType === "causative" && option.derivationSubtype === "type-one"
    && option.sourceAnalysisId === sourceAnalysis.analysisId
  ));
  if (!selectedOption) return blocked("exact-extant-fused-source-causative-option-required");
  const continuationSourceConstituents = runtime.getClassicalNahuatlVncContinuationSourceConstituents(sourceResult);
  if (!continuationSourceConstituents) return blocked("canonical-extant-fused-source-continuation-required");
  const causativeApplicationFrame = runtime.evaluateClassicalNahuatlVncApplication({
    sourceStem: continuationSourceConstituents.sourceStem,
    sourceLexemeId: continuationSourceConstituents.sourceLexemeId,
    sourceInitialISelection: continuationSourceConstituents.sourceInitialISelection,
    verbClass: continuationSourceConstituents.verbClass,
    sourceValence: continuationSourceConstituents.sourceValence,
    sourceSubject: continuationSourceConstituents.sourceSubject,
    sourceVoice: continuationSourceConstituents.sourceVoice,
    sourceNonactiveOptionId: continuationSourceConstituents.sourceNonactiveOptionId,
    sourceObjectRequests: continuationSourceConstituents.sourceObjectRequests,
    objectKind: continuationSourceConstituents.objectKind,
    objectPerson: continuationSourceConstituents.objectPerson,
    requestedDerivation: "causative", derivationOptionId: selectedOption.optionId,
    subject: "1sg", causativeObjectKind: "specific-projective", requestedVoice: "active",
    mood: "indicative", tense: "present", outputScope: "single",
  }, sourceResult);
  const causativeResult = causativeApplicationFrame?.resultFrame;
  const causativeOperationFrame = causativeResult?.derivationOperationFrame;
  const participantTransformFrame = causativeOperationFrame?.participantTransformFrame;
  const finiteSurfaceFrame = causativeResult?.finiteSurfaceFrame;
  const causativeExact = Boolean(causativeOperationFrame && participantTransformFrame
    && runtime.isClassicalNahuatlVncApplicationFrame(causativeApplicationFrame)
    && causativeApplicationFrame.authorizationStatus === "authorized"
    && runtime.isClassicalNahuatlVncDerivationOperationFrame(causativeOperationFrame)
    && causativeOperationFrame.authorizationStatus === "authorized"
    && runtime.isClassicalNahuatlVncFiniteSurfaceFrame(finiteSurfaceFrame)
    && causativeOperationFrame.sourceMachineryFrame === sourceResult.selectedMachineryFrame
    && causativeResult.sourceMachineryFrame === sourceResult.selectedMachineryFrame
    && causativeResult.activeMachineryFrame?.derivationOperationFrame === causativeOperationFrame
    && causativeResult.activeMachineryFrame.targetObjectRequests === causativeOperationFrame.targetObjectRequests
    && derivationOptionInventory.sourceMachineryFrame === sourceResult.selectedMachineryFrame
    && derivationOptionInventory.sourceAnalysisFrame?.canonicalSignature === sourceAnalysisFrame.canonicalSignature
    && causativeOperationFrame.sourceSignature === derivationOptionInventory.sourceSignature
    && causativeOperationFrame.selectedOption?.canonicalSignature === selectedOption.canonicalSignature
    && causativeOperationFrame.selectedOption.sourceAnalysisId === sourceAnalysis.analysisId
    && selectedOption.sourceAnalysisFrame?.canonicalSignature === sourceAnalysisFrame.canonicalSignature
    && causativeOperationFrame.targetStem === selectedOption.targetStem
    && causativeOperationFrame.targetClass === selectedOption.targetClass
    && participantTransformFrame.authorizationStatus === "authorized"
    && participantTransformFrame.sourceSubject === sourceAnalysisFrame.participantSurfaceSubject
    && participantTransformFrame.targetSubject === causativeApplicationFrame.normalizedRequest.subject
    && participantTransformFrame.sourceSubjectBecomesCausativeObject === true
    && participantTransformFrame.sourceObjectCount === 0
    && participantTransformFrame.targetObjectCount === 1
    && participantTransformFrame.addedObjectRequest?.governor === "causative"
    && participantTransformFrame.addedObjectRequest.objectKind === "specific-projective"
    && participantTransformFrame.addedObjectRequest.objectPerson === sourceAnalysisFrame.participantSurfaceSubject
    && causativeOperationFrame.targetObjectRequests === participantTransformFrame.targetObjectRequests
    && finiteSurfaceFrame.formulaDerivedFromWrittenProjection === false
    && finiteSurfaceFrame.writtenDerivedFromFormulaProjection === false);
  if (!causativeExact) return blocked("actual-extant-fused-source-causative-continuity-required");
  const sourceMeaningFrame = runtime.buildClassicalNahuatlExtantDestockalMeaningFrame({
    applicationFrame: sourceApplicationFrame,
  });
  if (!runtime.isClassicalNahuatlExtantDestockalMeaningFrame(sourceMeaningFrame)
    || sourceMeaningFrame.relationKind !== "source") {
    return blocked("canonical-extant-fused-source-meaning-required");
  }
  return deepFreeze({
    kind: "classical-nahuatl-destockal-irregular-source-validation-frame",
    authorizationStatus: "authorized", blockReason: "",
    requestedRelation: "extant-fused-source", sourceSelection,
    constraints: { destockalIrregularSourceLifecycle: { extantFusedSources: {
      [sourceSelection]: {
        sourceMeaningFrame,
        sourceReadings: sourceMeaningFrame.availableReadings,
        sourceConstitution: {
          sourceApplicationFrame, sourceAnalysisFrame, sourceAnalysis,
          reconstructedSourceStem, reconstructedSourceApplicationFrame,
          underlyingMorphology: sourceCoalescenceFrame.underlyingMorphology,
          reconstructionNotation: {
            notationFrame, sourceApplicationFrame, sourceAnalysisFrame, sourceAnalysis,
            reconstructedSourceApplicationFrame, sourceFiniteSurfaceFrame,
            sourceCoalescenceBoundaryFrame, sourceCoalescenceFrame,
          },
        },
        coalescence: {
          sourceApplicationFrame, sourceAnalysisFrame, sourceAnalysis,
          reconstructedSourceStem, reconstructedSourceApplicationFrame,
          sourceFiniteSurfaceFrame, sourceCoalescenceBoundaryFrame, sourceCoalescenceFrame,
        },
        causativeFormation: {
          sourceApplicationFrame, sourceAnalysisFrame, sourceAnalysis,
          continuationSourceConstituents, derivationOptionInventory, selectedOption,
          causativeApplicationFrame, causativeOperationFrame, participantTransformFrame,
          finiteSurfaceFrame, targetStem: causativeOperationFrame.targetStem,
          targetClass: causativeOperationFrame.targetClass,
          formula: causativeResult.formulaRealization, surface: causativeResult.surfaceRealization,
          citedNonspecificObjectObserved: false,
        },
      },
    } } },
    typedFrameAuthority: true, formulaStringAuthority: false,
    surfaceStringAuthority: false, storedExampleAuthority: false,
  });
}

// The cited tla belongs to an impersonal-source causative, not an arbitrary
// object-kind override on the active-source observation above (§24.8).
function buildExtantFusedNonspecificCauseeProjection(runtime, sourceSelection) {
  const sourceStem = { mini: "mī-ni", xini: "xī-ni", cehui: "cē-hui" }[sourceSelection];
  const blocked = reason => deepFreeze({
    kind: "classical-nahuatl-destockal-irregular-source-validation-frame",
    authorizationStatus: "blocked", blockReason: reason,
  });
  if (!sourceStem) return blocked("recognized-extant-fused-source-observation-required");
  const request = {
    sourceStem, verbClass: "B", sourceValence: "intransitive", sourceSubject: "3sg",
    subject: "1sg", objectKind: "none", objectPerson: "", sourceVoice: "impersonal",
    requestedDerivation: "causative", requestedVoice: "active",
    mood: "indicative", tense: "present", outputScope: "single",
  };
  const sourceChoicePreview = runtime.evaluateClassicalNahuatlVncApplication(request);
  // This is one explicit proof-fixture choice from the real inventory, not a
  // new default or a restriction on the user's other nonactive formations.
  const sourceNonactiveOption = sourceChoicePreview?.controlFrame
    ?.sourceNonactiveOptionInventory?.options?.find(option => option.suffixFamily === "hua");
  if (!sourceNonactiveOption) return blocked("canonical-extant-fused-impersonal-source-option-required");
  const optionPreview = runtime.evaluateClassicalNahuatlVncApplication({
    ...request, sourceNonactiveOptionId: sourceNonactiveOption.optionId,
  });
  const previewInventory = optionPreview?.controlFrame?.derivationOptionInventory;
  const previewAnalysis = previewInventory?.sourceAnalysisFrame;
  if (!runtime.isClassicalNahuatlVncDerivationOptionInventory(previewInventory)
    || !runtime.isClassicalNahuatlVncDerivationSourceAnalysisFrame(previewAnalysis)) {
    return blocked("canonical-extant-fused-impersonal-causative-inventory-required");
  }
  const exactAnalysis = previewAnalysis.analyses.find(analysis => (
    ["fused-destockal-ni-exact", "fused-destockal-hui-exact"].includes(analysis.category)
    && analysis.analysisAuthority === "typed-lexical-source-analysis"
    && analysis.lexicalStatus === "lexically-licensed-source-analysis"
  ));
  const chosenOption = previewInventory.options.find(option => (
    option.derivationType === "causative" && option.derivationSubtype === "type-one"
    && exactAnalysis && option.sourceAnalysisId === exactAnalysis.analysisId
  ));
  if (!chosenOption) return blocked("exact-extant-fused-impersonal-causative-option-required");
  const causativeApplicationFrame = runtime.evaluateClassicalNahuatlVncApplication({
    ...request, sourceNonactiveOptionId: sourceNonactiveOption.optionId,
    derivationOptionId: chosenOption.optionId,
  });
  const result = causativeApplicationFrame?.resultFrame;
  const sourceMachineryFrame = result?.sourceMachineryFrame;
  const sourceVoiceTransformationFrame = sourceMachineryFrame?.voiceTransformationFrame;
  const sourceAnalysisFrame = result?.sourceAnalysisFrame;
  const sourceAnalysis = sourceAnalysisFrame?.analyses?.find(analysis => analysis.analysisId === exactAnalysis.analysisId);
  const derivationOptionInventory = causativeApplicationFrame?.controlFrame?.derivationOptionInventory;
  const causativeOperationFrame = result?.derivationOperationFrame;
  const selectedOption = causativeOperationFrame?.selectedOption;
  const participantTransformFrame = causativeOperationFrame?.participantTransformFrame;
  const causeeObjectRequest = participantTransformFrame?.addedObjectRequest;
  const finiteSurfaceFrame = result?.finiteSurfaceFrame;
  const authorized = Boolean(sourceAnalysis && causeeObjectRequest
    && runtime.isClassicalNahuatlVncApplicationFrame(causativeApplicationFrame)
    && causativeApplicationFrame.authorizationStatus === "authorized"
    && runtime.isClassicalNahuatlVncDerivationSourceAnalysisFrame(sourceAnalysisFrame)
    && runtime.isClassicalNahuatlVncDerivationOptionInventory(derivationOptionInventory)
    && runtime.isClassicalNahuatlVncDerivationOperationFrame(causativeOperationFrame)
    && runtime.isClassicalNahuatlVncFiniteSurfaceFrame(finiteSurfaceFrame)
    && sourceMachineryFrame.voice === "impersonal"
    && sourceMachineryFrame.authorizationStatus === "authorized"
    && sourceMachineryFrame.nonactiveStemRecord?.nonactiveStem === sourceNonactiveOption.nonactiveStem
    && sourceVoiceTransformationFrame?.authorizationStatus === "authorized"
    && sourceVoiceTransformationFrame.impersonalSubjectReferent === "none"
    && sourceVoiceTransformationFrame.targetSubject === "3sg"
    && sourceVoiceTransformationFrame.sourceObjectPositionCount === 0
    && sourceAnalysisFrame.sourceMachineryFrame === sourceMachineryFrame
    && derivationOptionInventory.sourceMachineryFrame === sourceMachineryFrame
    && derivationOptionInventory.sourceAnalysisFrame === sourceAnalysisFrame
    && causativeOperationFrame.sourceMachineryFrame === sourceMachineryFrame
    && selectedOption.optionId === chosenOption.optionId
    && selectedOption.sourceAnalysisId === sourceAnalysis.analysisId
    && selectedOption.sourceAnalysisFrame?.canonicalSignature === sourceAnalysisFrame.canonicalSignature
    && causativeOperationFrame.targetStem === selectedOption.targetStem
    && causativeOperationFrame.targetClass === selectedOption.targetClass
    && participantTransformFrame.authorizationStatus === "authorized"
    && participantTransformFrame.sourceVoice === "impersonal"
    && participantTransformFrame.implicitAgentBecomesCausativeObject === true
    && participantTransformFrame.sourceSubjectBecomesCausativeObject === false
    && participantTransformFrame.referentiallyEmptySourceSubjectDiscarded === true
    && participantTransformFrame.requestedCausativeObjectKind === ""
    && participantTransformFrame.causativeObjectKindChoiceEligible === false
    && participantTransformFrame.implicitAgentObjectKind === "nonspecific-nonhuman"
    && participantTransformFrame.sourceObjectCount === 0
    && participantTransformFrame.targetObjectCount === 1
    && participantTransformFrame.targetSubject === causativeApplicationFrame.normalizedRequest.subject
    && causeeObjectRequest.governor === "causative"
    && causeeObjectRequest.objectKind === "nonspecific-nonhuman"
    && causeeObjectRequest.objectPerson === ""
    && participantTransformFrame.targetObjectRequests[0] === causeeObjectRequest
    && causativeOperationFrame.targetObjectRequests === participantTransformFrame.targetObjectRequests
    && result.activeMachineryFrame?.derivationOperationFrame === causativeOperationFrame
    && result.activeMachineryFrame.targetObjectRequests === causativeOperationFrame.targetObjectRequests
    && finiteSurfaceFrame.machineryFrame === result.activeMachineryFrame
    && finiteSurfaceFrame.formulaDerivedFromWrittenProjection === false
    && finiteSurfaceFrame.writtenDerivedFromFormulaProjection === false);
  if (!authorized) return blocked("actual-extant-fused-impersonal-causee-continuity-required");
  const meaningFrame = runtime.buildClassicalNahuatlExtantDestockalMeaningFrame({
    applicationFrame: causativeApplicationFrame,
  });
  if (!runtime.isClassicalNahuatlExtantDestockalMeaningFrame(meaningFrame)
    || meaningFrame.relationKind !== "causative") {
    return blocked("canonical-extant-fused-causee-meaning-required");
  }
  return deepFreeze({
    kind: "classical-nahuatl-destockal-irregular-source-validation-frame",
    authorizationStatus: "authorized", blockReason: "",
    requestedRelation: "extant-fused-nonspecific-causee", sourceSelection,
    constraints: { destockalIrregularSourceLifecycle: { extantFusedNonspecificCausees: {
      [sourceSelection]: {
        meaningFrame,
        availableReadings: meaningFrame.availableReadings,
        sourceNonactiveOption, sourceMachineryFrame, sourceVoiceTransformationFrame,
        sourceAnalysisFrame, sourceAnalysis, derivationOptionInventory, selectedOption,
        causativeApplicationFrame, causativeOperationFrame, participantTransformFrame,
        causeeObjectRequest, finiteSurfaceFrame,
        formula: result.formulaRealization, surface: result.surfaceRealization,
      },
    } } },
    typedFrameAuthority: true, formulaStringAuthority: false,
    surfaceStringAuthority: false, storedExampleAuthority: false,
  });
}

function buildDestockalCoalescedStockProjection(runtime) {
  const vowels = [["a", "ā"], ["e", "ē"], ["i", "ī"], ["o", "ō"]];
  let ruleContract = null;
  let rankTopology = null;
  let condition = null;
  let realization = null;
  const observations = vowels.flatMap(([rootVowel, stockVowel]) => ["ni", "hui"].map(theme => {
    const stem = `x${rootVowel}-${stockVowel}-${theme}`;
    const sourceFrame = runtime.buildClassicalNahuatlVncDerivationSourceAnalysisFrame(active(runtime, stem));
    const analysis = (sourceFrame?.analyses || []).find(item => (
      item.destockalStructureFrame?.typeId === "long-vowel-ni-or-hui"
      && item.stockFormative === stockVowel && item.stemFormative === theme
    ));
    const app = runtime.evaluateClassicalNahuatlVncApplication({
      sourceStem: stem, verbClass: "B", sourceValence: "intransitive",
      sourceSubject: "3sg", subject: "3sg", requestedDerivation: "direct",
      requestedVoice: "active", mood: "indicative", tense: "present", outputScope: "single",
    });
    const surface = app?.resultFrame?.finiteSurfaceFrame;
    const boundary = (surface?.neighboringBoundaries || []).find(item => item.coalescenceFrame);
    const relation = boundary?.coalescenceFrame;
    if (!ruleContract && relation) {
      ruleContract = relation.ruleContract;
      rankTopology = analysis?.destockalStructureFrame?.rankTopology;
      condition = relation.condition;
      realization = relation.realization;
    }
    const exact = Boolean(analysis && relation
      && runtime.isClassicalNahuatlVncDerivationSourceAnalysisFrame(sourceFrame)
      && runtime.isClassicalNahuatlVncApplicationFrame(app)
      && relation.authorizationStatus === "authorized"
      && relation.ruleContract === ruleContract
      && boundary.applicableRuleFrames.includes(relation)
      && relation.root === analysis.root
      && relation.stockFormative === analysis.stockFormative
      && relation.underlyingStemFormative === analysis.stemFormative
      && relation.condition.rootEndsInVowel === true
      && relation.condition.rootFinalVowelMatchesStockFormative === true
      && relation.condition.vowelMatchDimension === "quality-not-quantity"
      && relation.realization.underlyingVowelCount === 2
      && relation.realization.surfaceVowelCount === 1
      && relation.realization.outputConstituent === "surface-stock"
      && relation.realization.resultStock === boundary.leftSurfaceAfter
      && boundary.rightSurfaceAfter === ""
      && boundary.formulaCarrierChangedByWrittenBoundary === false
      && relation.underlyingMorphologyPreserved === true
      && relation.formulaProjectionPreserved === true
      && relation.sourceAdmissionAuthority === false
      && relation.canvasExampleAuthority === false
      && surface.formulaDerivedFromWrittenProjection === false
      && surface.writtenDerivedFromFormulaProjection === false);
    return {
      exact,
      sourceStem: sourceFrame?.sourceStem || "",
      rootFinalVowel: relation?.rootFinalVowel || "",
      stockFormative: relation?.stockFormative || "",
      stemFormative: relation?.underlyingStemFormative || "",
      underlyingMorphology: relation?.underlyingMorphology || null,
      resultStock: relation?.resultStock || "",
      formula: app?.resultFrame?.formulaRealization || "",
      surface: app?.resultFrame?.surfaceRealization || "",
    };
  }));
  const authorized = Boolean(ruleContract && rankTopology
    && ruleContract.affectedStemFormativeFamilies.join("|") === "ni|hui"
    && ruleContract.rankSequence.join("|") === "root|stock|intransitive-verbstem"
    && ruleContract.surfaceTwoStepStructureObscured === true
    && observations.length === 8 && observations.every(item => item.exact));
  return deepFreeze({
    kind: "classical-nahuatl-destockal-irregular-source-validation-frame",
    authorizationStatus: authorized ? "authorized" : "blocked",
    blockReason: authorized ? "" : "destockal-coalesced-stock-observation-incomplete",
    constraints: {
      destockalIrregularSourceLifecycle: {
        coalescedStockSystem: {
          ruleContract,
          underlyingRankTopology: rankTopology,
          condition,
          realization: realization ? {
            operation: realization.operation,
            underlyingVowelCount: realization.underlyingVowelCount,
            surfaceVowelCount: realization.surfaceVowelCount,
            outputConstituent: realization.outputConstituent,
            observations,
          } : null,
        },
      },
    },
    typedFrameAuthority: true,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    storedExampleAuthority: false,
  });
}

// A focused observation of the installed class relation and its actual options.
// This does not inherit the unrelated aggregate validation frame's status.
function buildDestockalNiHuiClassSystemProjection(runtime) {
  const probes = ["xap-ā-ni", "xap-ā-hui", "cot-ō-ni", "tlap-ī-hui"]
    .map(stem => buildSignedDestockalProbe(runtime, stem));
  let classSystem = null;
  const sourceFormatives = new Set();
  const targetSequences = { replacement: new Set(), addition: new Set() };
  const preferredProcedures = new Set();
  const observations = probes.map(probe => {
    const sourceFrame = probe.sourceAnalysisFrame || {};
    const inventory = probe.typeOneInventory || {};
    const sourceAnalysis = (sourceFrame.analyses || []).find(analysis => (
      ["destockal-ni-candidate", "destockal-hui-candidate"].includes(analysis.category)
      && analysis.destockalStructureFrame?.classSystemFrame
    ));
    const rule = sourceAnalysis?.destockalStructureFrame?.classSystemFrame;
    if (!classSystem && rule) classSystem = rule;
    const options = (inventory.options || []).filter(option => option.derivationSubtype === "type-one");
    const preferred = options.filter(option => option.derivationalPreference === "preferred");
    const optionObservations = options.map(option => {
      const relation = option.destockalClassAssignmentFrame;
      const assignment = rule?.targetAssignments?.[relation?.procedure];
      const exact = Boolean(relation && assignment
        && relation.authorizationStatus === "authorized"
        && relation.classSystemFrame === rule
        && relation.sourceAnalysisId === sourceAnalysis.analysisId
        && relation.sourceClass === sourceFrame.sourceClass
        && relation.sourceValence === sourceFrame.sourceValence
        && relation.targetClass === option.targetClass
        && relation.targetClass === assignment.classId
        && assignment.outputSequences.includes(relation.outputSequence)
        && relation.suffixOnlyInference === false
        && relation.canvasExampleAuthority === false
        && relation.callerSuppliedGrammarAuthority === false);
      if (exact) targetSequences[relation.procedure].add(relation.outputSequence);
      if (exact && option.derivationalPreference === "preferred") {
        preferredProcedures.add(relation.procedure);
      }
      return {
        exact,
        procedure: relation?.procedure || "",
        outputSequence: relation?.outputSequence || "",
        targetStem: option.targetStem,
        targetClass: option.targetClass,
        preference: option.derivationalPreference || "",
        preferenceRuleId: option.preferenceRuleId || "",
        perfective: compactPerfective(runtime, option.targetStem, option.targetClass),
      };
    });
    const exact = Boolean(probe.sourceAnalysisCanonical && probe.typeOneInventoryCanonical
      && rule && rule === classSystem && rule.authorizationStatus === "authorized"
      && rule.typeId === "long-vowel-ni-or-hui"
      && sourceFrame.sourceClass === rule.sourceAssignment.classId
      && sourceFrame.sourceValence === "intransitive"
      && rule.sourceAssignment.stemFormatives.includes(sourceAnalysis.stemFormative)
      && rule.sourceAssignment.contextualFactIsUserChoice === false
      && options.length === 2 && optionObservations.every(option => option.exact)
      && new Set(optionObservations.map(option => option.procedure)).size === 2
      && preferred.length === 1 && preferred[0].preferenceRuleId
      && inventory.selectionRequired === true
      && inventory.callerSuppliedTargetAllowed === false
      && inventory.formulaArtifactAuthority === false
      && inventory.surfaceArtifactAuthority === false);
    if (exact) sourceFormatives.add(sourceAnalysis.stemFormative);
    return {
      exact,
      sourceStem: sourceFrame.sourceStem || "",
      sourceAnalysisId: sourceAnalysis?.analysisId || "",
      stemFormative: sourceAnalysis?.stemFormative || "",
      sourceClass: sourceFrame.sourceClass || "",
      selectionRequired: inventory.selectionRequired === true,
      options: optionObservations,
    };
  });
  const coverageComplete = classSystem
    && classSystem.sourceAssignment.stemFormatives.every(formative => sourceFormatives.has(formative))
    && Object.entries(classSystem.targetAssignments).every(([procedure, assignment]) => (
      assignment.contextualFactIsUserChoice === false
      && assignment.outputSequences.every(sequence => targetSequences[procedure].has(sequence))
    ));
  const authorized = Boolean(coverageComplete && preferredProcedures.size === 2
    && observations.every(observation => observation.exact));
  return deepFreeze({
    kind: "classical-nahuatl-destockal-ni-hui-class-system-validation-frame",
    authorizationStatus: authorized ? "authorized" : "blocked",
    blockReason: authorized ? "" : "destockal-ni-hui-class-system-observation-incomplete",
    constraints: {
      destockalNiHuiClassSystem: {
        intransitiveClassAssignment: classSystem?.sourceAssignment || null,
        causativeFormationAlternation: {
          derivationSubtype: "type-one",
          procedures: Object.keys(classSystem?.targetAssignments || {}),
          selectionScope: "source-specific-licensed-options",
          preferenceAuthority: "typed-source-lexeme-or-category",
          sourceObservations: observations,
          universalFreeAlternationAsserted: false,
        },
      },
      destockalCausativeClassSystem: {
        classAssignments: classSystem?.targetAssignments || null,
      },
    },
    typedFrameAuthority: true,
    canvasExampleAuthority: false,
    callerSuppliedGrammarAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    storedExampleAuthority: false,
  });
}

export function buildClassicalNahuatlPinahuaSourceClassVariationConstraint({
  classA = {},
  classB = {},
  perfectiveByClass = {},
} = {}) {
  const expectedStem = "pīn-ā-hua";
  const classAExact = classA.authorizationStatus === "authorized"
    && classA.sourceStem === expectedStem
    && classA.classId === "A"
    && perfectiveByClass.A?.imperfectiveStem === expectedStem
    && perfectiveByClass.A?.perfectiveStem === "pīn-ā-hua";
  const classBExact = classB.authorizationStatus === "authorized"
    && classB.sourceStem === expectedStem
    && classB.classId === "B"
    && perfectiveByClass.B?.imperfectiveStem === expectedStem
    && perfectiveByClass.B?.perfectiveStem === "pīn-ā-uh";
  const authorized = classAExact && classBExact;
  return deepFreeze({
    authorizationStatus: authorized ? "authorized" : "blocked",
    blockReason: authorized
      ? "" : "pinahua-source-class-variation-coordinate-blocked",
    sourceStem: expectedStem,
    sourceClasses: ["A", "B"],
    perfectiveByClass: {
      A: perfectiveByClass.A?.perfectiveStem || "",
      B: perfectiveByClass.B?.perfectiveStem || "",
    },
    branches: {
      A: {
        authorizationStatus: classAExact ? "authorized" : "blocked",
        changeRule: perfectiveByClass.A?.changeRule || "",
      },
      B: {
        authorizationStatus: classBExact ? "authorized" : "blocked",
        changeRule: perfectiveByClass.B?.changeRule || "",
      },
    },
  });
}

export function buildClassicalNahuatlFinalAReplacementMorphologicalContrastConstraint({
  derivation = {},
  sourcePerfective = {},
  targetPerfective = {},
} = {}) {
  const typeOneOptions = (derivation.options || []).filter(
    option => option.derivationSubtype === "type-one",
  );
  const option = typeOneOptions[0] || {};
  const sourceImperfectiveStem = sourcePerfective.imperfectiveStem || "";
  const targetImperfectiveStem = targetPerfective.imperfectiveStem || "";
  const sourcePerfectiveStem = sourcePerfective.perfectiveStem || "";
  const targetPerfectiveStem = targetPerfective.perfectiveStem || "";
  const homophonousImperfectives = sourceImperfectiveStem.replaceAll("-", "")
    === targetImperfectiveStem.replaceAll("-", "");
  const morphologicallyDistinctImperfectives = sourceImperfectiveStem
    !== targetImperfectiveStem;
  const distinctPerfectives = sourcePerfectiveStem !== targetPerfectiveStem;
  const typeOneReplacementOnly = typeOneOptions.length === 1
    && option.derivationRoute
      === "type-one-final-a-morphological-replacement-exact";
  const authorized = derivation.authorizationStatus === "authorized"
    && derivation.sourceStem === "ē-hua"
    && derivation.sourceClass === "A"
    && derivation.sourceValence === "intransitive"
    && option.authorizationStatus === "authorized"
    && option.sourceStem === "ē-hua"
    && option.targetStem === "ē-hu-a"
    && option.targetClass === "B"
    && option.stemRelation === "surface-identical-morphological-replacement"
    && option.procedure
      === "replace-the-source-final-a-with-homophonous-causative-a-and-expose-the-hu-a-boundary"
    && option.ruleId === "cn-l24-2432a-ehua-e-hu-a"
    && option.callerSuppliedTargetAllowed === false
    && sourceImperfectiveStem === "ē-hua"
    && targetImperfectiveStem === "ē-hu-a"
    && sourcePerfectiveStem === "ē-hua"
    && targetPerfectiveStem === "ē-uh"
    && typeOneReplacementOnly
    && homophonousImperfectives
    && morphologicallyDistinctImperfectives
    && distinctPerfectives;
  return deepFreeze({
    authorizationStatus: authorized ? "authorized" : "blocked",
    blockReason: authorized
      ? "" : "final-a-replacement-morphological-contrast-coordinate-blocked",
    typeOneReplacementOnly,
    replacementProcedure: option.procedure || "",
    derivationRoute: option.derivationRoute || "",
    ruleId: option.ruleId || "",
    classPerfectiveContrast: {
      homophonousImperfectives,
      morphologicallyDistinctImperfectives,
      sourceClass: derivation.sourceClass || "",
      targetClass: option.targetClass || "",
      sourceImperfectiveStem,
      targetImperfectiveStem,
      sourcePerfectiveStem,
      targetPerfectiveStem,
      distinctPerfectives,
    },
    callerSuppliedTargetAllowed:
      option.callerSuppliedTargetAllowed === true,
  });
}

export function buildClassicalNahuatlRootPlusYaCausativeReplacementConstraint({
  classA = {},
  classB = {},
  sourcePerfectiveByClass = {},
  targetPerfective = {},
  exceptionDerivation = {},
  exceptionSourcePerfective = {},
  exceptionTargetPerfective = {},
  exceptionParticipant = {},
} = {}) {
  const expected = {
    sourceStem: "xoco-ya",
    sourceAnalysisCategory: "root-plus-ya",
    derivationType: "causative",
    derivationSubtype: "type-one",
    derivationRoute: "type-one-root-plus-ya-replacement",
    procedure: "delete-typed-derivational-ya-and-add-causative-a",
    ruleId: "cn-l24-2432b-root-plus-ya-a",
    targetStem: "xoco-ā",
    targetClass: "C",
    targetConstruction: {
      operation: "replace-morpheme",
      remove: "ya",
      add: "ā",
      underlyingAdd: "a",
      lengtheningEnvironment: "preceding-vowel",
    },
  };
  const expectedPerfectives = {
    A: {
      imperfectiveStem: "xoco-ya",
      perfectiveStem: "xoco-ya",
      changeRule: "class-a1-same-shape",
    },
    B: {
      imperfectiveStem: "xoco-ya",
      perfectiveStem: "xoco-x",
      changeRule: "class-b-y-to-x",
    },
    C: {
      imperfectiveStem: "xoco-ā",
      perfectiveStem: "xoco-h",
      changeRule: "class-c-final-a-replaced-by-h",
    },
  };
  const inventories = { A: classA, B: classB };
  const branches = Object.fromEntries(Object.entries(inventories).map(
    ([sourceClass, inventory]) => {
      const typeOneOptions = (inventory.options || []).filter(
        option => option.derivationSubtype === expected.derivationSubtype,
      );
      const option = typeOneOptions[0] || {};
      const construction = option.targetConstruction || {};
      const sourcePerfective = sourcePerfectiveByClass[sourceClass] || {};
      const expectedSourcePerfective = expectedPerfectives[sourceClass];
      const routeSigned = typeOneOptions.length === 1
        && option.authorizationStatus === "authorized"
        && option.derivationType === expected.derivationType
        && option.derivationRoute === expected.derivationRoute
        && option.procedure === expected.procedure
        && option.ruleId === expected.ruleId
        && option.derivationLicenseId === expected.ruleId
        && option.licensedSourceClass === sourceClass
        && option.sourceAnalysisId !== "";
      const constructionExact = option.sourceStem === expected.sourceStem
        && option.targetStem === expected.targetStem
        && option.targetClass === expected.targetClass
        && construction.operation === expected.targetConstruction.operation
        && construction.remove === expected.targetConstruction.remove
        && construction.add === expected.targetConstruction.add
        && construction.underlyingAdd
          === expected.targetConstruction.underlyingAdd
        && construction.lengtheningEnvironment
          === expected.targetConstruction.lengtheningEnvironment;
      const sourceClassExact = inventory.authorizationStatus === "authorized"
        && inventory.sourceStem === expected.sourceStem
        && inventory.sourceClass === sourceClass
        && inventory.sourceValence === "intransitive"
        && inventory.analysisCategories.length === 1
        && inventory.analysisCategories[0]
          === expected.sourceAnalysisCategory
        && inventory.callerSuppliedTargetAllowed === false
        && option.callerSuppliedTargetAllowed === false;
      const sourcePerfectiveExact = sourcePerfective.imperfectiveStem
          === expectedSourcePerfective.imperfectiveStem
        && sourcePerfective.perfectiveStem
          === expectedSourcePerfective.perfectiveStem
        && sourcePerfective.changeRule === expectedSourcePerfective.changeRule;
      const authorized = routeSigned
        && constructionExact
        && sourceClassExact
        && sourcePerfectiveExact;
      return [sourceClass, {
        authorizationStatus: authorized ? "authorized" : "blocked",
        routeSigned,
        constructionExact,
        sourceClassExact,
        sourcePerfectiveExact,
        option,
        sourcePerfective,
      }];
    },
  ));
  const targetPerfectiveExact = targetPerfective.imperfectiveStem
      === expectedPerfectives.C.imperfectiveStem
    && targetPerfective.perfectiveStem
      === expectedPerfectives.C.perfectiveStem
    && targetPerfective.changeRule === expectedPerfectives.C.changeRule;
  const normalAuthorized = Object.values(branches).every(
    branch => branch.authorizationStatus === "authorized",
  ) && targetPerfectiveExact;
  const canonicalOption = branches.A.option || {};
  const exceptionOption = (exceptionDerivation.options || []).find(
    option => option.ruleId === "cn-l24-2432b-yocoya-retains-y-a",
  ) || {};
  const exceptionConstruction = exceptionOption.targetConstruction || {};
  const exceptionObjectKind = exceptionParticipant.implicitAgentObjectKind || "";
  const exceptionTargetObject = (exceptionParticipant.targetObjectRequests || [])
    .find(request => request.objectId === "causative-object") || {};
  const exceptionPrefix = exceptionObjectKind === "nonspecific-nonhuman"
    ? "tla" : "";
  const formationProcedure = {
    normalYaReplacement: exceptionConstruction.remove === "ya",
    retainY: exceptionConstruction.preserve === "y",
    replaceFinalAWithCausativeA:
      exceptionConstruction.remove === "source-a"
      && exceptionConstruction.add === "causative-a",
  };
  const sourceLexicalFrame = {
    stem: exceptionOption.sourceStem || "",
    perfectiveStem: exceptionSourcePerfective.perfectiveStem || "",
    meaning: exceptionOption.sourceMeaning || "",
  };
  const targetFrame = {
    citationForm: exceptionPrefix && exceptionOption.targetStem
      ? `${exceptionPrefix}-(${exceptionOption.targetStem})` : "",
    perfectiveCitationForm:
      exceptionPrefix && exceptionTargetPerfective.perfectiveStem
        ? `${exceptionPrefix}-(${exceptionTargetPerfective.perfectiveStem})`
        : "",
  };
  const primaryTargetReading = {
    meaning: exceptionOption.targetMeaning || "",
    objectKind: exceptionObjectKind,
  };
  const additionalTargetReadings = (exceptionOption.additionalTargetReadings || [])
    .map(reading => ({
      meaning: reading.meaning || "",
      relation: reading.relation || "",
      objectKind: exceptionObjectKind,
    }));
  const exceptionExists = exceptionDerivation.authorizationStatus
      === "authorized"
    && exceptionDerivation.sourceStem === "yōco-ya"
    && exceptionDerivation.sourceClass === "B"
    && exceptionDerivation.sourceValence === "intransitive"
    && exceptionDerivation.analysisCategories.includes(
      "root-plus-ya-retentive-exception",
    )
    && exceptionOption.authorizationStatus === "authorized";
  const exceptionRouteSigned = exceptionExists
    && exceptionOption.derivationType === "causative"
    && exceptionOption.derivationSubtype === "type-one"
    && exceptionOption.derivationRoute
      === "type-one-root-plus-ya-retentive-exception-exact"
    && exceptionOption.procedure
      === "preserve-root-final-y-and-replace-source-a-with-causative-a"
    && exceptionOption.derivationLicenseId
      === "cn-l24-2432b-yocoya-retains-y-a"
    && exceptionOption.licensedSourceClass === "B"
    && exceptionOption.sourceAnalysisId.endsWith(
      ":root-plus-ya-retentive-exception",
    )
    && exceptionOption.targetStem === "yōco-y-a"
    && exceptionOption.targetClass === "B"
    && exceptionConstruction.operation === "morphological-replacement"
    && exceptionConstruction.surfaceChange === false
    && formationProcedure.normalYaReplacement === false
    && formationProcedure.retainY === true
    && formationProcedure.replaceFinalAWithCausativeA === true
    && exceptionOption.callerSuppliedTargetAllowed === false;
  const exceptionPerfectivesExact = exceptionSourcePerfective.imperfectiveStem
      === "yōco-ya"
    && exceptionSourcePerfective.perfectiveStem === "yōco-x"
    && exceptionSourcePerfective.changeRule === "class-b-y-to-x"
    && exceptionTargetPerfective.imperfectiveStem === "yōco-y-a"
    && exceptionTargetPerfective.perfectiveStem === "yōco-x"
    && exceptionTargetPerfective.changeRule === "class-b-y-to-x";
  const exceptionParticipantExact = exceptionParticipant.authorizationStatus
      === "authorized"
    && exceptionParticipant.sourceVoice === "impersonal"
    && exceptionParticipant.implicitAgentBecomesCausativeObject === true
    && exceptionObjectKind === "nonspecific-nonhuman"
    && exceptionTargetObject.objectKind === "nonspecific-nonhuman"
    && exceptionTargetObject.governor === "causative"
    && exceptionParticipant.machineryAuthorizationStatus === "authorized"
    && exceptionParticipant.finiteAuthorizationStatus === "authorized";
  const exceptionReadingsExact = sourceLexicalFrame.meaning
      === "become-comely-or-well-formed"
    && primaryTargetReading.meaning
      === "cause-something-to-become-well-formed"
    && additionalTargetReadings.length === 1
    && additionalTargetReadings[0].meaning
      === "form-invent-or-create-something"
    && additionalTargetReadings[0].relation === "lexical-extension";
  const exceptionCitationsExact = targetFrame.citationForm
      === "tla-(yōco-y-a)"
    && targetFrame.perfectiveCitationForm === "tla-(yōco-x)";
  const exceptionAuthorized = exceptionRouteSigned
    && exceptionPerfectivesExact
    && exceptionParticipantExact
    && exceptionReadingsExact
    && exceptionCitationsExact;
  const authorized = normalAuthorized && exceptionAuthorized;
  return deepFreeze({
    authorizationStatus: authorized ? "authorized" : "blocked",
    blockReason: authorized
      ? "" : "root-plus-ya-causative-replacement-coordinate-blocked",
    normalFormation: {
      sourceAnalysisCategory: expected.sourceAnalysisCategory,
      derivationType: canonicalOption.derivationType || "",
      derivationSubtype: canonicalOption.derivationSubtype || "",
      derivationRoute: canonicalOption.derivationRoute || "",
      procedure: canonicalOption.procedure || "",
      ruleId: canonicalOption.ruleId || "",
      targetStem: canonicalOption.targetStem || "",
      targetConstruction: {
        operation: canonicalOption.targetConstruction?.operation || "",
        remove: canonicalOption.targetConstruction?.remove || "",
        add: canonicalOption.targetConstruction?.add || "",
        underlyingAdd:
          canonicalOption.targetConstruction?.underlyingAdd || "",
        lengtheningEnvironment:
          canonicalOption.targetConstruction?.lengtheningEnvironment || "",
      },
    },
    sourceClasses: [classA.sourceClass || "", classB.sourceClass || ""],
    targetClass: canonicalOption.targetClass || "",
    classBoundPerfectives: {
      A: {
        source: branches.A.sourcePerfective,
        target: targetPerfective,
      },
      B: {
        source: branches.B.sourcePerfective,
        target: targetPerfective,
      },
    },
    routeSignedBySourceClass: {
      A: branches.A.routeSigned,
      B: branches.B.routeSigned,
    },
    targetPerfectiveExact,
    exception: {
      authorizationStatus: exceptionAuthorized ? "authorized" : "blocked",
      exists: exceptionExists,
      formationProcedure,
      sourceLexicalFrame,
      targetFrame,
      primaryTargetReading,
      additionalTargetReadings,
      routeSigned: exceptionRouteSigned,
      perfectivesExact: exceptionPerfectivesExact,
      participantExact: exceptionParticipantExact,
    },
    callerSuppliedTargetAllowed: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    storedExampleAuthority: false,
  });
}

export function buildClassicalNahuatlDestockalStockFormationSystemConstraint({
  destockalTypeProbes = [],
  rootYaProbe = {},
  verbstemYaProbe = {},
} = {}) {
  const expectedTypeIds = [
    "long-vowel-ni-or-hui",
    "long-vowel-hua",
    "short-vowel-hui",
  ];
  const expectedDefinition = {
    term: "destockal-verbstem",
    processKind: "stock-mediated-two-step-derivation",
    processStepCount: 2,
    intermediateRank: "stock",
  };
  const expectedRankTopology = {
    order: ["root", "stock", "stem"],
    finalRankSubtype: "intransitive-verbstem",
  };
  const expectedRankPrivileges = {
    rootToVerbstem: "lexically-licensed",
    stockToVerbstem: "forbidden",
    stockRequiresStemFormative: true,
  };
  const expectedStockFormation = {
    ordinal: 1,
    inputRank: "root",
    operation: "suffix-derivation",
    formativeRole: "stock-formative",
    outputRank: "stock",
  };
  const expectedStemFormation = {
    ordinal: 2,
    inputRank: "stock",
    operation: "suffix-derivation",
    formativeRoles: ["stem-formative", "theme"],
    outputRank: "intransitive-verbstem",
  };
  const expectedCausativeParticipantRule =
    "The source subject becomes the causative object and a new outer subject is imported.";
  const expectedTypeInventory = [{
    typeId: "long-vowel-ni-or-hui",
    stockFormativeQuantity: "long",
    stemFormatives: ["ni", "hui"],
  }, {
    typeId: "long-vowel-hua",
    stockFormativeQuantity: "long",
    stemFormatives: ["hua"],
  }, {
    typeId: "short-vowel-hui",
    stockFormativeQuantity: "short",
    stemFormatives: ["hui"],
  }];
  const same = (left, right) => JSON.stringify(left) === JSON.stringify(right);
  const projectStockFormation = (structure = {}) => ({
    ordinal: structure.steps?.stockFormation?.ordinal ?? null,
    inputRank: structure.steps?.stockFormation?.inputRank || "",
    operation: structure.steps?.stockFormation?.operation || "",
    formativeRole:
      structure.steps?.stockFormation?.formativeRole || "",
    outputRank: structure.steps?.stockFormation?.outputRank || "",
  });
  const projectStemFormation = (structure = {}) => ({
    ordinal: structure.steps?.stemFormation?.ordinal ?? null,
    inputRank: structure.steps?.stemFormation?.inputRank || "",
    operation: structure.steps?.stemFormation?.operation || "",
    formativeRoles: [
      ...(structure.steps?.stemFormation?.formativeRoles || []),
    ],
    outputRank: structure.steps?.stemFormation?.outputRank || "",
  });
  const typeObservations = expectedTypeIds.map(typeId => {
    const probe = destockalTypeProbes.find(
      candidate => candidate.typeId === typeId,
    ) || {};
    const analysisFrame = probe.sourceAnalysisFrame || {};
    const analysis = (analysisFrame.analyses || []).find(
      candidate => candidate.destockalStructureFrame?.typeId === typeId,
    ) || {};
    const structure = analysis.destockalStructureFrame || {};
    const inventory = probe.typeOneInventory || {};
    const typeOneOptions = (inventory.options || []).filter(option => (
      option.derivationType === "causative"
      && option.derivationSubtype === "type-one"
    ));
    const canonicalCausativeOptions = typeOneOptions.filter(option => (
      option.suffix === "a"
      && option.licensedSourceValence === "intransitive"
      && option.ruleTagId === "cn-l24-type-one-causative-a"
      && option.participantRule === expectedCausativeParticipantRule
    ));
    const structureExact = structure.authorizationStatus === "authorized"
      && same(structure.definition, expectedDefinition)
      && same(structure.rankTopology, expectedRankTopology)
      && same(structure.rankPrivileges, expectedRankPrivileges)
      && same(projectStockFormation(structure), expectedStockFormation)
      && same(projectStemFormation(structure), expectedStemFormation)
      && structure.typeId === typeId
      && same(structure.typeInventory, expectedTypeInventory)
      && structure.typedRankRestrictionOnly === true
      && structure.surfaceShapeIsNotAnAdmissionGate === true
      && structure.canvasExampleAuthority === false
      && structure.callerSuppliedGrammarAuthority === false;
    const generatedTypeOneExact =
      probe.sourceAnalysisCanonical === true
      && probe.typeOneInventoryCanonical === true
      && analysisFrame.authorizationStatus === "authorized"
      && analysisFrame.sourceValence === "intransitive"
      && analysisFrame.callerSuppliedAnalysisAllowed === false
      && inventory.authorizationStatus === "authorized"
      && typeOneOptions.length > 0
      && typeOneOptions.every(option => (
        option.callerSuppliedTargetAllowed !== true
        && option.sourceStem === analysisFrame.sourceStem
        && option.licensedSourceValence === "intransitive"
        && option.ruleTagId === "cn-l24-type-one-causative-a"
        && option.participantRule === expectedCausativeParticipantRule
      ))
      && canonicalCausativeOptions.length > 0;
    return {
      typeId,
      structure,
      structureExact,
      generatedTypeOneExact,
      causativeMorpheme: canonicalCausativeOptions[0]?.suffix || "",
      ruleTagId: canonicalCausativeOptions[0]?.ruleTagId || "",
      participantRule:
        canonicalCausativeOptions[0]?.participantRule || "",
    };
  });
  const representativeStructure = typeObservations[0]?.structure || {};
  const findTheme = (probe, hostRank) => {
    const analysisFrame = probe?.sourceAnalysisFrame || {};
    const analysis = (analysisFrame.analyses || []).find(candidate => (
      candidate.themeFrame?.formative === "ya"
      && candidate.themeFrame?.hostRank === hostRank
    )) || {};
    return {
      canonical: probe?.sourceAnalysisCanonical === true,
      frameStatus: analysisFrame.authorizationStatus || "blocked",
      callerSuppliedAnalysisAllowed:
        analysisFrame.callerSuppliedAnalysisAllowed === true,
      theme: analysis.themeFrame || {},
    };
  };
  const rootThemeObservation = findTheme(rootYaProbe, "root");
  const verbstemThemeObservation = findTheme(
    verbstemYaProbe,
    "verbstem",
  );
  const rootTheme = rootThemeObservation.theme;
  const verbstemTheme = verbstemThemeObservation.theme;
  const expectedThemeDefinition = {
    role: "stem-formative",
    terminology: {
      preferredTerm: "theme",
      exactTerm: "thematic-morpheme",
    },
    function: "attach-to-a-morphological-unit-to-create-a-stem",
    inputRank: "morphological-unit",
    possibleOutputRanks: ["verbstem", "nounstem"],
  };
  const projectThemeDefinition = (theme = {}) => ({
    role: theme.role || "",
    terminology: {
      preferredTerm: theme.terminology?.preferredTerm || "",
      exactTerm: theme.terminology?.exactTerm || "",
    },
    function: theme.function || "",
    inputRank: theme.inputRank || "",
    possibleOutputRanks: [...(theme.possibleOutputRanks || [])],
  });
  const themeDefinition = projectThemeDefinition(rootTheme);
  const normalHostRanks = [...(rootTheme.normalHostRanks || [])];
  const themesExact = [rootThemeObservation, verbstemThemeObservation]
    .every(observation => (
      observation.canonical
      && observation.frameStatus === "authorized"
      && observation.callerSuppliedAnalysisAllowed === false
      && observation.theme.authorizationStatus === "authorized"
      && observation.theme.canvasExampleAuthority === false
      && observation.theme.callerSuppliedGrammarAuthority === false
    ))
    && same(themeDefinition, expectedThemeDefinition)
    && same(
      projectThemeDefinition(verbstemTheme),
      expectedThemeDefinition,
    )
    && rootTheme.formative === "ya"
    && verbstemTheme.formative === "ya"
    && rootTheme.hostRank === "root"
    && verbstemTheme.hostRank === "verbstem"
    && same(normalHostRanks, ["root", "verbstem"])
    && same(verbstemTheme.normalHostRanks, normalHostRanks);
  const structuresExact = typeObservations.every(
    observation => observation.structureExact,
  );
  const generatedTypeOneExact = typeObservations.every(
    observation => observation.generatedTypeOneExact,
  );
  const authorized = structuresExact
    && generatedTypeOneExact
    && themesExact;
  const stockFormation = projectStockFormation(representativeStructure);
  const stemFormation = projectStemFormation(representativeStructure);
  const verifiedTypeIds = typeObservations
    .filter(observation => observation.generatedTypeOneExact)
    .map(observation => observation.typeId);
  const observedCausativeMorphemes = [...new Set(typeObservations
    .map(observation => observation.causativeMorpheme)
    .filter(Boolean))];
  const observedRuleTagIds = [...new Set(typeObservations
    .map(observation => observation.ruleTagId)
    .filter(Boolean))];
  const observedParticipantRules = [...new Set(typeObservations
    .map(observation => observation.participantRule)
    .filter(Boolean))];
  return deepFreeze({
    authorizationStatus: authorized ? "authorized" : "blocked",
    blockReason: authorized
      ? "" : "destockal-stock-formation-system-coordinate-blocked",
    definition: {
      term: representativeStructure.definition?.term || "",
      processKind: representativeStructure.definition?.processKind || "",
      processStepCount:
        representativeStructure.definition?.processStepCount ?? null,
      intermediateRank:
        representativeStructure.definition?.intermediateRank || "",
    },
    rankTopology: {
      order: [...(representativeStructure.rankTopology?.order || [])],
      finalRankSubtype:
        representativeStructure.rankTopology?.finalRankSubtype || "",
    },
    rankPrivileges: {
      rootToVerbstem:
        representativeStructure.rankPrivileges?.rootToVerbstem || "",
      stockToVerbstem:
        representativeStructure.rankPrivileges?.stockToVerbstem || "",
      stockRequiresStemFormative:
        representativeStructure.rankPrivileges
          ?.stockRequiresStemFormative === true,
    },
    stockFormation,
    stemFormation,
    orderedSteps: ["stock-formation", "stem-formation"],
    causativePairing: {
      sourceMember: "intransitive",
      targetMember: "transitive",
      targetFormation: "causative",
      causativeMorpheme:
        observedCausativeMorphemes.length === 1
          ? observedCausativeMorphemes[0] : "",
      derivationType: "causative",
      derivationSubtype: "type-one",
      ruleTagId:
        observedRuleTagIds.length === 1 ? observedRuleTagIds[0] : "",
      participantRule:
        observedParticipantRules.length === 1
          ? observedParticipantRules[0] : "",
      verifiedTypeIds,
    },
    taxonomy: {
      summary: {
        typeCount: expectedTypeInventory.length,
        discriminator: "destockal-stem-formative-or-theme",
        typeIds: expectedTypeInventory.map(type => type.typeId),
      },
      types: expectedTypeInventory,
    },
    themeDefinition,
    yaTheme: {
      formative: rootTheme.formative || "",
      role: rootTheme.role || "",
      normalHostRanks,
    },
    typedRankRestrictionOnly:
      representativeStructure.typedRankRestrictionOnly === true,
    surfaceShapeIsNotAnAdmissionGate:
      representativeStructure.surfaceShapeIsNotAnAdmissionGate === true,
    callerSuppliedGrammarAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    storedExampleAuthority: false,
  });
}

export function buildClassicalNahuatlDestockalStockVowelHarmonySystemConstraint({
  regularProbes = [],
  lexicalExceptionProbe = {},
  unlicensedMismatchProbe = {},
} = {}) {
  const expectedRegularLongStockHarmony = {
    stockFormativeQuantity: "long",
    controller: {
      rank: "root",
      vowelQuantity: "short",
    },
    realizationsByRootVowel: {
      a: { default: "ā" },
      i: { default: "ī" },
      o: { default: "ō" },
      e: { default: "ō", withHuiAlternative: "ē" },
    },
    normalRelation: "root-vowel-harmony",
  };
  const expectedProbeSpecs = [{
    probeId: "a-ni",
    rootVowel: "a",
    stockFormative: "ā",
    stemFormative: "ni",
    allowedStockFormatives: ["ā"],
  }, {
    probeId: "i-ni",
    rootVowel: "i",
    stockFormative: "ī",
    stemFormative: "ni",
    allowedStockFormatives: ["ī"],
  }, {
    probeId: "o-ni",
    rootVowel: "o",
    stockFormative: "ō",
    stemFormative: "ni",
    allowedStockFormatives: ["ō"],
  }, {
    probeId: "e-ni-default",
    rootVowel: "e",
    stockFormative: "ō",
    stemFormative: "ni",
    allowedStockFormatives: ["ō"],
  }, {
    probeId: "e-hui-default",
    rootVowel: "e",
    stockFormative: "ō",
    stemFormative: "hui",
    allowedStockFormatives: ["ō", "ē"],
  }, {
    probeId: "e-hui-alternative",
    rootVowel: "e",
    stockFormative: "ē",
    stemFormative: "hui",
    allowedStockFormatives: ["ō", "ē"],
  }];
  const same = (left, right) => JSON.stringify(left) === JSON.stringify(right);
  const projectRegularLongStockHarmony = (frame = {}) => ({
    stockFormativeQuantity: frame.stockFormativeQuantity || "",
    controller: {
      rank: frame.controller?.rank || "",
      vowelQuantity: frame.controller?.vowelQuantity || "",
    },
    realizationsByRootVowel: {
      a: { default: frame.realizationsByRootVowel?.a?.default || "" },
      i: { default: frame.realizationsByRootVowel?.i?.default || "" },
      o: { default: frame.realizationsByRootVowel?.o?.default || "" },
      e: {
        default: frame.realizationsByRootVowel?.e?.default || "",
        withHuiAlternative:
          frame.realizationsByRootVowel?.e?.withHuiAlternative || "",
      },
    },
    normalRelation: frame.normalRelation || "",
  });
  const findAnalysis = (probe = {}, predicate = () => true) => {
    const sourceAnalysisFrame = probe.sourceAnalysisFrame || {};
    const analysis = (sourceAnalysisFrame.analyses || []).find(candidate => (
      candidate.stockVowelHarmonyFrame
      && predicate(candidate)
    )) || {};
    return {
      sourceAnalysisCanonical: probe.sourceAnalysisCanonical === true,
      sourceAnalysisFrame,
      analysis,
      structure: analysis.destockalStructureFrame || {},
      harmony: analysis.stockVowelHarmonyFrame || {},
    };
  };
  const signedObservationExact = observation => (
    observation.sourceAnalysisCanonical
    && observation.sourceAnalysisFrame.authorizationStatus === "authorized"
    && observation.sourceAnalysisFrame.callerSuppliedAnalysisAllowed === false
    && observation.sourceAnalysisFrame.formulaArtifactAuthority === false
    && observation.sourceAnalysisFrame.surfaceArtifactAuthority === false
    && observation.analysis.analysisId
    && observation.structure.authorizationStatus === "authorized"
    && observation.structure.typeId === "long-vowel-ni-or-hui"
    && observation.structure.canvasExampleAuthority === false
    && observation.structure.callerSuppliedGrammarAuthority === false
    && observation.harmony.authorizationStatus === "authorized"
    && observation.harmony.rootVowelQuantity === "short"
    && observation.harmony.normalRuleApplicable === true
    && same(
      projectRegularLongStockHarmony(
        observation.harmony.regularLongStockHarmony,
      ),
      expectedRegularLongStockHarmony,
    )
    && observation.harmony.surfaceShapeExceptionAuthority === false
    && observation.harmony.canvasExampleAuthority === false
    && observation.harmony.callerSuppliedGrammarAuthority === false
  );
  const regularObservations = expectedProbeSpecs.map(expected => {
    const probe = regularProbes.find(
      candidate => candidate.probeId === expected.probeId,
    ) || {};
    const observation = findAnalysis(probe, candidate => {
      const harmony = candidate.stockVowelHarmonyFrame || {};
      return harmony.rootVowel === expected.rootVowel
        && harmony.stockFormative === expected.stockFormative
        && harmony.stemFormative === expected.stemFormative;
    });
    const expectedStockFormative =
      expectedRegularLongStockHarmony.realizationsByRootVowel[
        expected.rootVowel
      ].default;
    return {
      ...observation,
      exact: signedObservationExact(observation)
        && observation.harmony.expectedStockFormative
          === expectedStockFormative
        && same(
          observation.harmony.allowedStockFormatives,
          expected.allowedStockFormatives,
        )
        && observation.harmony.relation === "regular-root-vowel-harmony"
        && observation.harmony.regularHarmony === true
        && observation.harmony.exceptionalAnalysis === false
        && observation.harmony.lexicalExceptionLicensed === false
        && observation.harmony.exceptionAuthority === ""
        && observation.harmony.userChoiceRequired === false,
    };
  });
  const lexicalExceptionObservation = findAnalysis(
    lexicalExceptionProbe,
    candidate => (
      candidate.lexicalStatus === "lexically-licensed-source-analysis"
      && candidate.stockVowelHarmonyFrame?.exceptionalAnalysis === true
    ),
  );
  const lexicalExceptionExact =
    signedObservationExact(lexicalExceptionObservation)
    && lexicalExceptionObservation.analysis.analysisAuthority
      === "typed-lexical-source-analysis"
    && lexicalExceptionObservation.harmony.regularHarmony === false
    && lexicalExceptionObservation.harmony.exceptionalAnalysis === true
    && lexicalExceptionObservation.harmony.lexicalExceptionLicensed === true
    && lexicalExceptionObservation.harmony.exceptionAuthority
      === "typed-lexical-source-analysis"
    && lexicalExceptionObservation.harmony.userChoiceRequired === false;
  const unlicensedMismatchObservation = findAnalysis(
    unlicensedMismatchProbe,
    candidate => (
      candidate.lexicalStatus !== "lexically-licensed-source-analysis"
      && candidate.stockVowelHarmonyFrame?.exceptionalAnalysis === true
    ),
  );
  const unlicensedMismatchExact =
    signedObservationExact(unlicensedMismatchObservation)
    && unlicensedMismatchObservation.analysis.sourceAnalysisSelectionRequired
      === true
    && unlicensedMismatchObservation.harmony.regularHarmony === false
    && unlicensedMismatchObservation.harmony.exceptionalAnalysis === true
    && unlicensedMismatchObservation.harmony.lexicalExceptionLicensed === false
    && unlicensedMismatchObservation.harmony.exceptionAuthority
      === "source-analysis-selection-required"
    && unlicensedMismatchObservation.harmony.userChoiceRequired === true;
  const representativeStructure =
    regularObservations[0]?.structure || {};
  const firstType = (representativeStructure.typeInventory || []).find(
    type => type.typeId === "long-vowel-ni-or-hui",
  ) || {};
  const firstTypeThemeAlternation = {
    destockalTypeId: firstType.typeId || "",
    sourceRank:
      representativeStructure.rankTopology?.finalRankSubtype || "",
    role: (representativeStructure.steps?.stemFormation?.formativeRoles || [])
      .find(role => role === "stem-formative") || "",
    alternatives: [...(firstType.stemFormatives || [])],
  };
  const expectedFirstTypeThemeAlternation = {
    destockalTypeId: "long-vowel-ni-or-hui",
    sourceRank: "intransitive-verbstem",
    role: "stem-formative",
    alternatives: ["ni", "hui"],
  };
  const regularExact = regularObservations.length
    === expectedProbeSpecs.length
    && regularObservations.every(observation => observation.exact);
  const authorized = regularExact
    && same(
      firstTypeThemeAlternation,
      expectedFirstTypeThemeAlternation,
    )
    && lexicalExceptionExact
    && unlicensedMismatchExact;
  const observedRegularLongStockHarmony =
    projectRegularLongStockHarmony(
      regularObservations[0]?.harmony?.regularLongStockHarmony,
    );
  return deepFreeze({
    authorizationStatus: authorized ? "authorized" : "blocked",
    blockReason: authorized
      ? "" : "destockal-stock-vowel-harmony-system-coordinate-blocked",
    firstTypeThemeAlternation,
    regularLongStockHarmony: observedRegularLongStockHarmony,
    exceptionPolicy: {
      exists: lexicalExceptionExact,
      exceptionAuthority:
        lexicalExceptionObservation.harmony.exceptionAuthority || "",
      lexicalExceptionLicensed:
        lexicalExceptionObservation.harmony.lexicalExceptionLicensed === true,
      userChoiceRequired:
        lexicalExceptionObservation.harmony.userChoiceRequired === true,
      unlicensedMismatchRequiresSourceAnalysisSelection:
        unlicensedMismatchExact,
      surfaceShapeExceptionAuthority:
        lexicalExceptionObservation.harmony
          .surfaceShapeExceptionAuthority === true,
      callerSuppliedExceptionAllowed:
        lexicalExceptionObservation.harmony
          .callerSuppliedGrammarAuthority === true,
    },
    typedSourceAnalysisAuthority: true,
    surfaceShapeIsNotAnAdmissionGate: true,
    canvasExampleAuthority: false,
    callerSuppliedGrammarAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    storedExampleAuthority: false,
  });
}

export function buildClassicalNahuatlDestockalNiHuiLexicalInventoryConstraint({
  tlatziniProbe = {},
  oliniProbe = {},
} = {}) {
  const expected = {
    tlatzini: {
      probe: tlatziniProbe,
      stem: "tlatz-ī-ni",
      segments: ["tlatz", "ī", "ni"],
      stockFormative: "ī",
      rootVowel: "a",
      rootVowelQuantity: "short",
      normalRuleApplicable: true,
      expectedStockFormative: "ā",
      relation: "exceptional-stock-vowel-analysis",
      exceptionalAnalysis: true,
      lexicalExceptionLicensed: true,
      exceptionAuthority: "typed-lexical-source-analysis",
      exceptionKind: "stock-vowel-harmony-exception",
      readings: ["make-a-bursting-or-explosive-noise"],
    },
    olini: {
      probe: oliniProbe,
      stem: "ōl-ī-ni",
      segments: ["ōl", "ī", "ni"],
      stockFormative: "ī",
      rootVowel: "ō",
      rootVowelQuantity: "long",
      normalRuleApplicable: false,
      expectedStockFormative: "",
      relation: "outside-normal-short-root-domain",
      exceptionalAnalysis: false,
      lexicalExceptionLicensed: false,
      exceptionAuthority: "",
      exceptionKind: "long-root-outside-normal-short-root-domain",
      readings: ["move", "move-along-a-path", "tremble-or-quake"],
    },
  };
  const same = (left, right) => JSON.stringify(left) === JSON.stringify(right);
  const observations = Object.fromEntries(Object.entries(expected).map(
    ([key, spec]) => {
      const frame = spec.probe.sourceAnalysisFrame || {};
      const analysis = (frame.analyses || []).find(candidate => (
        candidate.category === "destockal-ni-candidate"
        && same(candidate.segments, spec.segments)
        && candidate.stockVowelHarmonyFrame
      )) || {};
      const harmony = analysis.stockVowelHarmonyFrame || {};
      const structure = analysis.destockalStructureFrame || {};
      const firstType = (structure.typeInventory || []).find(
        type => type.typeId === "long-vowel-ni-or-hui",
      ) || {};
      const harmonyExact = harmony.authorizationStatus === "authorized"
        && harmony.rootVowel === spec.rootVowel
        && harmony.rootVowelQuantity === spec.rootVowelQuantity
        && harmony.normalRuleApplicable === spec.normalRuleApplicable
        && harmony.stockFormative === spec.stockFormative
        && harmony.stemFormative === "ni"
        && harmony.expectedStockFormative === spec.expectedStockFormative
        && harmony.relation === spec.relation
        && harmony.regularHarmony === false
        && harmony.exceptionalAnalysis === spec.exceptionalAnalysis
        && harmony.lexicalExceptionLicensed === spec.lexicalExceptionLicensed
        && harmony.exceptionAuthority === spec.exceptionAuthority
        && harmony.userChoiceRequired === false
        && harmony.surfaceShapeExceptionAuthority === false
        && harmony.canvasExampleAuthority === false
        && harmony.callerSuppliedGrammarAuthority === false;
      const exact = spec.probe.sourceAnalysisCanonical === true
        && frame.authorizationStatus === "authorized"
        && frame.sourceStem === spec.stem
        && frame.callerSuppliedAnalysisAllowed === false
        && frame.formulaArtifactAuthority === false
        && frame.surfaceArtifactAuthority === false
        && analysis.analysisAuthority === "typed-lexical-source-analysis"
        && analysis.lexicalStatus === "lexically-licensed-source-analysis"
        && analysis.root === spec.segments[0]
        && analysis.stockFormative === spec.stockFormative
        && analysis.stemFormative === "ni"
        && same(analysis.lexicalReadings, spec.readings)
        && structure.authorizationStatus === "authorized"
        && structure.typeId === "long-vowel-ni-or-hui"
        && firstType.stockFormativeQuantity === "long"
        && same(firstType.stemFormatives, ["ni", "hui"])
        && harmonyExact;
      return [key, {
        exact,
        sourceFrame: {
          stem: frame.sourceStem || "",
          root: analysis.root || "",
          rootVowel: harmony.rootVowel || "",
          rootVowelQuantity: harmony.rootVowelQuantity || "",
          stockFormative: analysis.stockFormative || "",
          stemFormative: analysis.stemFormative || "",
          exceptionKind: harmonyExact ? spec.exceptionKind : "",
        },
        readings: [...(analysis.lexicalReadings || [])],
      }];
    },
  ));
  const authorized = Object.values(observations).every(item => item.exact);
  return deepFreeze({
    authorizationStatus: authorized ? "authorized" : "blocked",
    blockReason: authorized
      ? "" : "destockal-ni-hui-lexical-inventory-coordinate-blocked",
    entries: Object.fromEntries(Object.entries(observations).map(
      ([key, { sourceFrame, readings }]) => [key, { sourceFrame, readings }],
    )),
    lexicalReadingsGrammarAuthority: false,
    canvasExampleAuthority: false,
    callerSuppliedGrammarAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    storedExampleAuthority: false,
  });
}

export function buildClassicalNahuatlGoComeCausativeSuppletiveOnlyConstraint(
  derivations = {},
) {
  const expected = {
    yauh: {
      targetStem: "huīca",
      derivationRoute: "type-two-suppletive-yauh-huica",
      ruleId: "cn-l25-251-note-yauh-huica-suppletion",
    },
    huallauh: {
      targetStem: "huīca",
      derivationRoute: "type-two-suppletive-huallauh-hual-huica",
      ruleId: "cn-l25-251-note-huallauh-hual-huica-suppletion",
    },
  };
  const branches = Object.fromEntries(Object.entries(expected).map(
    ([branchId, contract]) => {
      const inventory = derivations[branchId] || {};
      const options = inventory.options || [];
      const option = options[0] || {};
      const authorized = inventory.authorizationStatus === "authorized"
        && inventory.optionCount === 1
        && options.length === 1
        && inventory.selectorRequired === false
        && inventory.selectionRequired === false
        && option.authorizationStatus === "authorized"
        && option.targetStem === contract.targetStem
        && option.derivationRoute === contract.derivationRoute
        && option.ruleId === contract.ruleId
        && option.formationRuleTier === "typed-lexical-suppletion"
        && option.callerSuppliedTargetAllowed === false;
      return [branchId, {
        authorizationStatus: authorized ? "authorized" : "blocked",
        expected: contract,
        observedOptionCount: options.length,
      }];
    },
  ));
  const authorized = Object.values(branches).every(
    branch => branch.authorizationStatus === "authorized",
  );
  return deepFreeze({
    authorizationStatus: authorized ? "authorized" : "blocked",
    blockReason: authorized
      ? "" : "go-come-causative-suppletive-only-coordinate-blocked",
    branches,
  });
}

function derive(runtime, stem, targetStem, {
  verbClass = "B",
  sourceValence = "intransitive",
  sourceSubject = "3sg",
  objectPerson = "",
  targetSubject = "1sg",
  causativeObjectKind = "specific-projective",
} = {}) {
  const source = active(runtime, stem, {
    verbClass, sourceValence, sourceSubject, objectPerson,
  });
  const inventory = runtime.getClassicalNahuatlVncDerivationOptionInventory(
    source,
    { derivationType: "causative" },
  );
  const option = (inventory?.options || [])
    .find(candidate => candidate.targetStem === targetStem);
  const operation = runtime.deriveClassicalNahuatlVncDerivationOperationFrame(
    source,
    {
      derivationType: "causative",
      optionId: option?.optionId || "missing-canonical-option",
      targetSubject,
      causativeObjectKind,
    },
  );
  const machinery = runtime.buildClassicalNahuatlDerivedVncMachineryFrame(
    source,
    operation,
    { targetSubject, mood: "indicative", tense: "present" },
  );
  const finite = runtime.buildClassicalNahuatlVncFiniteSurfaceFrame(machinery);
  return {
    source,
    machinery,
    compact: {
      authorizationStatus: operation?.authorizationStatus || "blocked",
      blockReason: operation?.blockReason || "",
      sourceStem: operation?.sourceStem || "",
      targetStem: operation?.targetStem || "",
      targetClass: operation?.targetClass || "",
      derivationSubtype: operation?.derivationSubtype || "",
      derivationRoute: operation?.derivationRoute || "",
      targetSubject: operation?.targetSubject || "",
      requestedCausativeObjectKind:
        operation?.requestedCausativeObjectKind || "",
      causativeObjectPersonBinding:
        operation?.causativeObjectPersonBinding || "",
      sourceSubjectBecomesCausativeObject:
        operation?.participantTransformFrame
          ?.sourceSubjectBecomesCausativeObject === true,
      targetObjectRequests: (operation?.targetObjectRequests || [])
        .map(request => ({
          objectId: request.objectId,
          objectKind: request.objectKind,
          objectPerson: request.objectPerson,
          governor: request.governor,
          derivationalLevel: request.derivationalLevel,
        })),
      machineryAuthorizationStatus:
        machinery?.authorizationStatus || "blocked",
      finiteAuthorizationStatus: finite?.authorizationStatus || "blocked",
      formulaRealization: finite?.formulaRealization || "",
      wordRealization: finite?.wordRealization || "",
      formulaDerivedFromWrittenProjection:
        finite?.formulaDerivedFromWrittenProjection === true,
      writtenDerivedFromFormulaProjection:
        finite?.writtenDerivedFromFormulaProjection === true,
      callerSuppliedAuthorityAccepted:
        operation?.callerSuppliedAuthorityAccepted === true,
    },
  };
}

function deriveFromIntransitiveImpersonal(
  runtime,
  stem,
  targetStem,
  { verbClass = "B", targetSubject = "1sg" } = {},
) {
  const activeSource = active(runtime, stem, {
    verbClass,
    sourceValence: "intransitive",
    sourceSubject: "3sg",
  });
  const nonactiveStemRecord =
    runtime.deriveClassicalNahuatlNonactiveStemRecord(stem, {
      verbClass,
      sourceValence: "intransitive",
    });
  const source = runtime.buildClassicalNahuatlDerivedVncFrame(activeSource, {
    voice: "impersonal",
    nonactiveStemRecord,
    sourceValence: "intransitive",
    sourceSubject: "3sg",
    mood: "indicative",
    tense: "present",
    verbClass,
  });
  const inventory = runtime.getClassicalNahuatlVncDerivationOptionInventory(
    source,
    { derivationType: "causative" },
  );
  const option = (inventory?.options || [])
    .find(candidate => candidate.targetStem === targetStem);
  const operation = runtime.deriveClassicalNahuatlVncDerivationOperationFrame(
    source,
    {
      derivationType: "causative",
      optionId: option?.optionId || "missing-canonical-option",
      targetSubject,
    },
  );
  const machinery = runtime.buildClassicalNahuatlDerivedVncMachineryFrame(
    source,
    operation,
    { targetSubject, mood: "indicative", tense: "present" },
  );
  const finite = runtime.buildClassicalNahuatlVncFiniteSurfaceFrame(machinery);
  return {
    authorizationStatus: operation?.authorizationStatus || "blocked",
    blockReason: operation?.blockReason || "",
    sourceVoice: source?.voice || "",
    sourceFormula: source?.formulaRealization || "",
    derivationSubtype: option?.derivationSubtype || "",
    sourceSubjectBecomesCausativeObject:
      operation?.participantTransformFrame
        ?.sourceSubjectBecomesCausativeObject === true,
    implicitAgentBecomesCausativeObject:
      operation?.participantTransformFrame
        ?.implicitAgentBecomesCausativeObject === true,
    implicitAgentObjectKind:
      operation?.participantTransformFrame?.implicitAgentObjectKind || "",
    targetObjectRequests: (operation?.targetObjectRequests || [])
      .map(request => ({
        objectId: request.objectId,
        objectKind: request.objectKind,
        objectPerson: request.objectPerson,
        governor: request.governor,
        derivationalLevel: request.derivationalLevel,
      })),
    machineryAuthorizationStatus: machinery?.authorizationStatus || "blocked",
    finiteAuthorizationStatus: finite?.authorizationStatus || "blocked",
    formulaRealization: finite?.formulaRealization || "",
    wordRealization: finite?.wordRealization || "",
  };
}

function attachNonspecificPerfectiveCitation(
  participant = {},
  targetPerfective = {},
) {
  const targetObject = (participant.targetObjectRequests || [])
    .find(request => request.objectId === "causative-object") || {};
  const authorized = participant.authorizationStatus === "authorized"
    && participant.machineryAuthorizationStatus === "authorized"
    && participant.finiteAuthorizationStatus === "authorized"
    && participant.implicitAgentObjectKind === "nonspecific-nonhuman"
    && targetObject.objectKind === "nonspecific-nonhuman"
    && targetObject.governor === "causative"
    && participant.formulaRealization === "#0-0+tla(ē-hu-a)0+0-0#"
    && targetPerfective.imperfectiveStem === "ē-hu-a"
    && targetPerfective.perfectiveStem === "ē-uh";
  return {
    ...participant,
    authorizationStatus: authorized ? "authorized" : "blocked",
    blockReason: authorized
      ? "" : "nonspecific-perfective-citation-coordinate-blocked",
    targetPerfectiveStem: targetPerfective.perfectiveStem || "",
    perfectiveCitationForm: authorized
      ? `tla-(${targetPerfective.perfectiveStem})` : "",
    perfectiveCitationDerivedFromCanonicalComponents: authorized,
    storedExampleAuthority: false,
  };
}

function evaluateCausative(runtime, request, targetStem, voice = "active") {
  const activePreview = runtime.evaluateClassicalNahuatlVncApplication({
    ...request,
    requestedVoice: "active",
  });
  const option = activePreview?.controlFrame?.derivationOptionInventory
    ?.options?.find(candidate => candidate.targetStem === targetStem);
  let selectedRequest = {
    ...request,
    requestedVoice: voice,
    derivationOptionId: option?.optionId || "missing-canonical-option",
  };
  if (voice !== "active") {
    const voicePreview = runtime.evaluateClassicalNahuatlVncApplication(
      selectedRequest,
    );
    selectedRequest = {
      ...selectedRequest,
      nonactiveOptionId:
        voicePreview?.controlFrame?.nonactiveOptionInventory
          ?.automaticOptionId
        || voicePreview?.controlFrame?.nonactiveOptionInventory
          ?.options?.[0]?.optionId
        || "",
    };
  }
  const result = runtime.evaluateClassicalNahuatlVncApplication(
    selectedRequest,
  );
  return {
    authorizationStatus: result?.authorizationStatus || "blocked",
    blockReason: result?.blockReason || "",
    targetStem: result?.normalizedRequest?.targetStem || "",
    selectedVoice: result?.resultFrame?.selectedVoice || "",
    formulaRealization: result?.resultFrame?.formulaRealization || "",
    wordRealization: result?.resultFrame?.surfaceRealization || "",
    sentenceType:
      result?.resultFrame?.selectedMachineryFrame?.sentenceSurfaceFrame
        ?.sentenceType || "",
    sentenceRole:
      result?.resultFrame?.selectedMachineryFrame?.sentenceSurfaceFrame
        ?.canvasSentenceRole || "",
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  };
}

const SOURCE_SPECS = Object.freeze({
  ehco: ["ehcō", { verbClass: "A" }],
  tlehcō: ["tlehcō", { verbClass: "A" }],
  ono: ["on-o", { verbClass: "A" }],
  pano: ["panō", { verbClass: "A" }],
  choca: ["chōca", { verbClass: "A" }],
  quiza: ["quīza", { verbClass: "B" }],
  itqui: ["itqui", { verbClass: "A", sourceValence: "specific-projective", objectPerson: "3sg" }],
  ihtlani: ["ih-tlani", { sourceValence: "specific-projective", objectPerson: "3sg" }],
  nemi: ["nemi", {}],
  miqui: ["miqui", {}],
  notza: ["nōtza", { verbClass: "A", sourceValence: "specific-projective", objectPerson: "3sg" }],
  chihua: ["chīhua", { verbClass: "A", sourceValence: "projective-nonhuman" }],
  piya: ["piya", { verbClass: "B", sourceValence: "specific-projective", objectPerson: "3sg" }],
  mama: ["māmā", { verbClass: "D", sourceValence: "specific-projective", objectPerson: "3sg" }],
  cualani: ["cual-ā-ni", {}],
  tlapani: ["tlap-ā-ni", {}],
  xamani: ["xam-ā-ni", {}],
  patlani: ["patl-ā-ni", {}],
  tzayani: ["tzay-ā-ni", {}],
  tlatzini: ["tlatz-ī-ni", {}],
  chipini: ["chip-ī-ni", {}],
  moyoni: ["mōy-ō-ni", {}],
  tzoyoni: ["tzoy-ō-ni", {}],
  poloni: ["pol-ō-ni", {}],
  tzoponi: ["tzop-ō-ni", {}],
  potoni: ["pot-ō-ni", {}],
  olini: ["ōl-ī-ni", {}],
  tzotlani: ["tzotl-ā-ni", {}],
  cozahui: ["cōz-ā-hui", {}],
  peyoni: ["pey-ō-ni", {}],
  cueyoni: ["cuey-ō-ni", {}],
  queyoni: ["quey-ō-ni", {}],
  teini: ["te-ī-ni", {}],
  cuetlahui: ["cuetl-ā-hui", {}],
  caxahua: ["cax-ā-hua", { verbClass: "A" }],
  chamahua: ["cham-ā-hua", { verbClass: "A" }],
  huapahua: ["huap-ā-hua", { verbClass: "A" }],
  tlacuahua: ["tlacu-ā-hua", { verbClass: "A" }],
  patzahua: ["patz-ā-hua", { verbClass: "A" }],
  chipahua: ["chip-ā-hua", { verbClass: "A" }],
  chicahua: ["chic-ā-hua", { verbClass: "A" }],
  chiyahua: ["chiy-ā-hua", { verbClass: "A" }],
  pitzahua: ["pitz-ā-hua", { verbClass: "A" }],
  pinahua: ["pīn-ā-hua", { verbClass: "A" }],
  tomahua: ["tom-ā-hua", { verbClass: "A" }],
  zotlahua: ["zotl-ā-hua", { verbClass: "A" }],
  toxahua: ["tox-ā-hua", { verbClass: "A" }],
  petlahua: ["petl-ā-hua", { verbClass: "A" }],
  tetzahua: ["tetz-ā-hua", { verbClass: "A" }],
  petzihui: ["petz-i-hui", {}],
  patzihui: ["patz-i-hui", {}],
  ihtahui: ["iht-a-hui", {}],
  tzicahui: ["tzic-a-hui", {}],
  pixahui: ["pix-a-hui", {}],
  pilihui: ["pil-i-hui", {}],
  polihui: ["pol-i-hui", {}],
  nolihui: ["nol-i-hui", {}],
  colihui: ["cōl-i-hui", {}],
});

const DERIVATION_SPECS = Object.freeze({
  tomi: ["tomi", {}],
  temi: ["tēmi", {}],
  cocoya: ["coco-ya", {}],
  xocoyaA: ["xoco-ya", { verbClass: "A" }],
  xocoyaB: ["xoco-ya", { verbClass: "B" }],
  yocoya: ["yōco-ya", {}],
  ehua: ["ē-hua", { verbClass: "A" }],
  totoca: ["to-tō-ca", { verbClass: "A" }],
  huaqui: ["huā-qui", {}],
  zahui: ["zahui", {}],
  ilpi: ["ilpi", { verbClass: "A" }],
  chipini: ["chip-ī-ni", {}],
  tlapihui: ["tlap-ī-hui", {}],
  polihui: ["pol-i-hui", {}],
  tlalihui: ["tlal-i-hui", {}],
  pixahui: ["pix-a-hui", {}],
  tlapohui: ["tlap-o-hui", {}],
  pilca: ["pil-ca", { verbClass: "A" }],
  mini: ["mī-ni", {}],
  xini: ["xī-ni", {}],
  cehui: ["cē-hui", {}],
  pinahua: ["pīn-ā-hua", { verbClass: "A" }],
  neci: ["nēci", {}],
  cualani: ["cual-ā-ni", {}],
  cua: ["cuā", { verbClass: "D" }],
  itta: ["itt-a", { verbClass: "A" }],
  mahui: ["mahui", {}],
  quiza: ["quīza", {}],
  choca: ["chōca", { verbClass: "A" }],
  mati: ["mati", {}],
  matiProjective: ["mati", { sourceValence: "specific-projective", objectPerson: "3sg" }],
  caqui: ["caqui", { sourceValence: "specific-projective", objectPerson: "3sg" }],
  quemi: ["quēmi", { sourceValence: "specific-projective", objectPerson: "3sg" }],
  piya: ["piya", { sourceValence: "specific-projective", objectPerson: "3sg" }],
  nelti: ["nel-ti", { verbClass: "A" }],
  mazati: ["mazā-ti", {}],
  ahhuiaya: ["ahhuiā-ya", {}],
  ceceya: ["ce-ce-ya", {}],
  tzacua: ["tzacu-a", { sourceValence: "specific-projective", objectPerson: "3sg" }],
  ihza: ["ihza", { verbClass: "A" }],
  imacaci: ["īmacaci", { sourceValence: "specific-projective", objectPerson: "3sg" }],
  ixtlahua: ["ix-tlā-hu-a", { sourceValence: "specific-projective", objectPerson: "3sg" }],
  itzti: ["itz-ti", { verbClass: "A" }],
  temo: ["temō", { verbClass: "A" }],
  tlehcō: ["tlehcō", { verbClass: "A" }],
  pano: ["panō", { verbClass: "A" }],
  yauh: ["ya-uh", {}],
  huallauh: ["huāl-la-uh", {}],
});

function buildProjection(runtime) {
  const sources = Object.fromEntries(Object.entries(SOURCE_SPECS)
    .map(([key, [stem, options]]) => [
      key,
      compactSource(runtime, stem, options),
    ]));
  const derivations = Object.fromEntries(Object.entries(DERIVATION_SPECS)
    .map(([key, [stem, options]]) => [
      key,
      compactDerivation(runtime, stem, options),
    ]));
  const pinahuaSourceClassVariation =
    buildClassicalNahuatlPinahuaSourceClassVariationConstraint({
      classA: sources.pinahua,
      classB: compactSource(runtime, "pīn-ā-hua", { verbClass: "B" }),
      perfectiveByClass: {
        A: compactPerfective(runtime, "pīn-ā-hua", "A"),
        B: compactPerfective(runtime, "pīn-ā-hua", "B"),
      },
    });
  const finalAReplacementMorphologicalContrast =
    buildClassicalNahuatlFinalAReplacementMorphologicalContrastConstraint({
      derivation: derivations.ehua,
      sourcePerfective: compactPerfective(runtime, "ē-hua", "A"),
      targetPerfective: compactPerfective(runtime, "ē-hu-a", "B"),
    });
  const yocoyaNonspecific = deriveFromIntransitiveImpersonal(
    runtime,
    "yōco-ya",
    "yōco-y-a",
    { verbClass: "B", targetSubject: "3sg" },
  );
  const rootPlusYaCausativeReplacement =
    buildClassicalNahuatlRootPlusYaCausativeReplacementConstraint({
      classA: derivations.xocoyaA,
      classB: derivations.xocoyaB,
      sourcePerfectiveByClass: {
        A: compactPerfective(runtime, "xoco-ya", "A"),
        B: compactPerfective(runtime, "xoco-ya", "B"),
      },
      targetPerfective: compactPerfective(runtime, "xoco-ā", "C"),
      exceptionDerivation: derivations.yocoya,
      exceptionSourcePerfective:
        compactPerfective(runtime, "yōco-ya", "B"),
      exceptionTargetPerfective:
        compactPerfective(runtime, "yōco-y-a", "B"),
      exceptionParticipant: yocoyaNonspecific,
    });
  const destockalStockFormationSystem =
    buildClassicalNahuatlDestockalStockFormationSystemConstraint({
      destockalTypeProbes: [{
        typeId: "long-vowel-ni-or-hui",
        ...buildSignedDestockalProbe(runtime, "cual-ā-ni"),
      }, {
        typeId: "long-vowel-hua",
        ...buildSignedDestockalProbe(
          runtime,
          "pīn-ā-hua",
          { verbClass: "A" },
        ),
      }, {
        typeId: "short-vowel-hui",
        ...buildSignedDestockalProbe(runtime, "pol-i-hui"),
      }],
      rootYaProbe: buildSignedThemeProbe(runtime, "coco-ya"),
      verbstemYaProbe: buildSignedThemeProbe(runtime, "te-ti-ya"),
    });
  const destockalStockVowelHarmonySystem =
    buildClassicalNahuatlDestockalStockVowelHarmonySystemConstraint({
      regularProbes: [{
        probeId: "a-ni",
        ...buildSignedStockVowelHarmonyProbe(runtime, "xac-ā-ni"),
      }, {
        probeId: "i-ni",
        ...buildSignedStockVowelHarmonyProbe(runtime, "xip-ī-ni"),
      }, {
        probeId: "o-ni",
        ...buildSignedStockVowelHarmonyProbe(runtime, "xoc-ō-ni"),
      }, {
        probeId: "e-ni-default",
        ...buildSignedStockVowelHarmonyProbe(runtime, "xep-ō-ni"),
      }, {
        probeId: "e-hui-default",
        ...buildSignedStockVowelHarmonyProbe(runtime, "xep-ō-hui"),
      }, {
        probeId: "e-hui-alternative",
        ...buildSignedStockVowelHarmonyProbe(runtime, "xep-ē-hui"),
      }],
      lexicalExceptionProbe:
        buildSignedStockVowelHarmonyProbe(runtime, "tlap-ī-hui"),
      unlicensedMismatchProbe:
        buildSignedStockVowelHarmonyProbe(runtime, "chacu-ī-ni"),
    });
  const destockalNiHuiLexicalInventory =
    buildClassicalNahuatlDestockalNiHuiLexicalInventoryConstraint({
      tlatziniProbe: buildSignedThemeProbe(runtime, "tlatz-ī-ni"),
      oliniProbe: buildSignedThemeProbe(runtime, "ōl-ī-ni"),
    });
  const goComeCausativeSuppletiveOnly =
    buildClassicalNahuatlGoComeCausativeSuppletiveOnlyConstraint(
      derivations,
    );

  const typeOneSpecific = derive(runtime, "tomi", "tom-a", {
    targetSubject: "1sg",
  });
  const typeOneReflexive = derive(runtime, "tomi", "tom-a", {
    sourceSubject: "1sg",
    targetSubject: "1sg",
    causativeObjectKind: "reflexive",
  });
  const typeOneNonspecific = deriveFromIntransitiveImpersonal(
    runtime,
    "tomi",
    "tom-a",
  );
  const zahuiReflexive = derive(runtime, "zahui", "zahu-a", {
    sourceSubject: "3sg",
    targetSubject: "3sg",
    causativeObjectKind: "reflexive",
  });
  const huaquiNonspecific = deriveFromIntransitiveImpersonal(
    runtime,
    "huā-qui",
    "huā-tz-a",
    { targetSubject: "3sg" },
  );
  const temiNonspecific = deriveFromIntransitiveImpersonal(
    runtime,
    "tēmi",
    "tēm-a",
    { targetSubject: "3sg" },
  );
  const ehuaNonspecific = attachNonspecificPerfectiveCitation(
    deriveFromIntransitiveImpersonal(
      runtime,
      "ē-hua",
      "ē-hu-a",
      { verbClass: "A", targetSubject: "3sg" },
    ),
    compactPerfective(runtime, "ē-hu-a", "B"),
  );
  const typeTwoSpecific = derive(runtime, "tomi", "tom-tiā", {
    targetSubject: "1sg",
  });
  const typeTwoReflexive = derive(runtime, "tomi", "tom-tiā", {
    sourceSubject: "1sg",
    targetSubject: "1sg",
    causativeObjectKind: "reflexive",
  });
  const typeTwoNonspecific = deriveFromIntransitiveImpersonal(
    runtime,
    "tomi",
    "tom-tiā",
  );
  const doubleSpecific = derive(runtime, "caqui", "caquī-tiā", {
    sourceValence: "specific-projective",
    sourceSubject: "2sg",
    objectPerson: "3sg",
    targetSubject: "1sg",
  });
  const recursiveInventory = runtime.getClassicalNahuatlVncDerivationOptionInventory(
    doubleSpecific.machinery,
    { derivationType: "causative" },
  );
  const recursiveOption = (recursiveInventory?.options || [])
    .find(option => option.targetStem === "caquī-ti-l-tiā");
  const recursiveOperation = runtime.deriveClassicalNahuatlVncDerivationOperationFrame(
    doubleSpecific.machinery,
    {
      derivationType: "causative",
      optionId: recursiveOption?.optionId || "missing-canonical-option",
      targetSubject: "3sg",
      causativeObjectKind: "specific-projective",
    },
  );
  const recursiveMachinery = runtime.buildClassicalNahuatlDerivedVncMachineryFrame(
    doubleSpecific.machinery,
    recursiveOperation,
    { targetSubject: "3sg", mood: "indicative", tense: "present" },
  );
  const recursiveFinite = runtime.buildClassicalNahuatlVncFiniteSurfaceFrame(
    recursiveMachinery,
  );

  const moodWish = evaluateCausative(runtime, {
    sourceStem: "chīhua",
    verbClass: "A",
    sourceValence: "projective-nonhuman",
    sourceSubject: "3sg",
    subject: "1sg",
    mood: "optative",
    tense: "nonpast",
    requestedDerivation: "causative",
    causativeObjectKind: "specific-projective",
    sentenceOptions: {
      sentenceType: "wish-sentence",
      introductoryParticle: "ma",
    },
  }, "chīhua-l-tiā");
  const passive = evaluateCausative(runtime, {
    sourceStem: "nōtza",
    verbClass: "A",
    sourceValence: "specific-projective",
    sourceSubject: "2sg",
    objectKind: "specific-projective",
    objectPerson: "3pl",
    subject: "1pl",
    mood: "indicative",
    tense: "present",
    requestedDerivation: "causative",
    causativeObjectKind: "specific-projective",
  }, "nōtza-l-tiā", "passive");
  const supplementation =
    runtime.buildClassicalNahuatlSupplementationValidationFrame();
  const nonactiveVoiceObject =
    runtime.buildClassicalNahuatlNonactiveVoiceObjectValidationFrame();

  const statusValues = [
    ...Object.values(sources).map(frame => frame.authorizationStatus),
    ...Object.values(derivations).map(frame => frame.authorizationStatus),
    typeOneSpecific.compact.authorizationStatus,
    typeOneReflexive.compact.authorizationStatus,
    typeOneNonspecific.authorizationStatus,
    zahuiReflexive.compact.authorizationStatus,
    zahuiReflexive.compact.machineryAuthorizationStatus,
    zahuiReflexive.compact.finiteAuthorizationStatus,
    huaquiNonspecific.authorizationStatus,
    huaquiNonspecific.machineryAuthorizationStatus,
    huaquiNonspecific.finiteAuthorizationStatus,
    temiNonspecific.authorizationStatus,
    temiNonspecific.machineryAuthorizationStatus,
    temiNonspecific.finiteAuthorizationStatus,
    ehuaNonspecific.authorizationStatus,
    ehuaNonspecific.machineryAuthorizationStatus,
    ehuaNonspecific.finiteAuthorizationStatus,
    yocoyaNonspecific.authorizationStatus,
    yocoyaNonspecific.machineryAuthorizationStatus,
    yocoyaNonspecific.finiteAuthorizationStatus,
    typeTwoSpecific.compact.authorizationStatus,
    typeTwoReflexive.compact.authorizationStatus,
    typeTwoNonspecific.authorizationStatus,
    doubleSpecific.compact.authorizationStatus,
    recursiveOperation?.authorizationStatus,
    recursiveMachinery?.authorizationStatus,
    recursiveFinite?.authorizationStatus,
    moodWish.authorizationStatus,
    passive.authorizationStatus,
    supplementation?.authorizationStatus,
    nonactiveVoiceObject?.authorizationStatus,
    pinahuaSourceClassVariation.authorizationStatus,
    finalAReplacementMorphologicalContrast.authorizationStatus,
    rootPlusYaCausativeReplacement.authorizationStatus,
    destockalStockFormationSystem.authorizationStatus,
    destockalStockVowelHarmonySystem.authorizationStatus,
    destockalNiHuiLexicalInventory.authorizationStatus,
    goComeCausativeSuppletiveOnly.authorizationStatus,
  ];

  return deepFreeze({
    kind: "classical-nahuatl-vnc-derivation-validation-frame",
    authorizationStatus: statusValues.every(status => status === "authorized")
      ? "authorized" : "blocked",
    blockReason: statusValues.every(status => status === "authorized")
      ? "" : "classical-vnc-derivation-validation-coordinate-blocked",
    typedFrameAuthority: true,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    storedExampleAuthority: false,
    curriculumMetadataAuthority: false,
    contract: {
      gcd: {
        identityId: CLASSICAL_NAHUATL_LESSONS23_26_GCD.identityId,
        stageOrder: [...CLASSICAL_NAHUATL_LESSONS23_26_GCD.stageOrder],
        smallestSharedInvariant:
          CLASSICAL_NAHUATL_LESSONS23_26_GCD.smallestSharedInvariant,
      },
      axes: CLASSICAL_NAHUATL_LESSONS23_26_LCM.axes
        .filter(axis => axis.axisId.startsWith("lesson24-")
          || axis.axisId.startsWith("lesson25-"))
        .map(axis => ({
          axisId: axis.axisId,
          distinctionKind: axis.distinctionKind,
          prerequisite: axis.prerequisite,
          semanticFactRole: axis.semanticFactRole,
          ownerCapabilities: [...axis.ownerCapabilities],
        })),
    },
    sources,
    derivations,
    participants: {
      typeOneSpecific: typeOneSpecific.compact,
      typeOneReflexive: typeOneReflexive.compact,
      typeOneNonspecific,
      zahuiReflexive: zahuiReflexive.compact,
      huaquiNonspecific,
      temiNonspecific,
      ehuaNonspecific,
      yocoyaNonspecific,
      typeTwoSpecific: typeTwoSpecific.compact,
      typeTwoReflexive: typeTwoReflexive.compact,
      typeTwoNonspecific,
      doubleSpecific: doubleSpecific.compact,
      tripleSpecific: {
        authorizationStatus: recursiveOperation?.authorizationStatus || "blocked",
        targetStem: recursiveOperation?.targetStem || "",
        targetObjectRequests: (recursiveOperation?.targetObjectRequests || [])
          .map(request => ({
            objectId: request.objectId,
            objectKind: request.objectKind,
            objectPerson: request.objectPerson,
            governor: request.governor,
            derivationalLevel: request.derivationalLevel,
          })),
        machineryAuthorizationStatus:
          recursiveMachinery?.authorizationStatus || "blocked",
        finiteAuthorizationStatus:
          recursiveFinite?.authorizationStatus || "blocked",
        formulaRealization: recursiveFinite?.formulaRealization || "",
        wordRealization: recursiveFinite?.wordRealization || "",
      },
      objectCombinationCount:
        nonactiveVoiceObject?.objectHistory?.combinationCount || 0,
      maximumLicensedObjectCount:
        nonactiveVoiceObject?.objectHistory?.maximumLicensedObjectCount || 0,
      specificSilencing:
        nonactiveVoiceObject?.objectHistory?.twoSpecific?.positions?.[1]
          ?.silencingRule || "",
      fixedOrderingRules: [
        ...(nonactiveVoiceObject?.objectHistory?.twoSpecific
          ?.orderingRules || []),
      ],
      objectCombinations: [
        ...(nonactiveVoiceObject?.objectHistory?.combinations || []),
      ],
    },
    interactions: {
      moodWish,
      passive,
      silentObjectSupplement: {
        authorizationStatus:
          supplementation?.ayi?.authorizationStatus || "blocked",
        headRole:
          supplementation?.ayi?.referenceFrame?.headRole || "",
        principalHeadSilent:
          supplementation?.ayi?.referenceFrame?.principalHead?.silent === true,
        silentlyPresentCarrier:
          supplementation?.extractedFrames?.ayi?.realization || "",
        silentSpecificObjectAuthorized:
          supplementation?.ayi?.principalClause
            ?.silentSpecificObjectAuthorized === true,
        operationKind:
          supplementation?.extractedFrames?.ayi?.kind || "",
      },
    },
    constraints: {
      pinahuaSourceClassVariation,
      finalAReplacementMorphologicalContrast,
      rootPlusYaCausativeReplacement,
      destockalStockFormationSystem,
      destockalStockVowelHarmonySystem,
      destockalNiHuiLexicalInventory,
      goComeCausativeSuppletiveOnly,
    },
  });
}

export function createClassicalVncDerivationValidationSemanticOperationsApi(
  targetObject = globalThis,
) {
  const issuedFrames = new WeakSet();
  let cachedProjection = null;
  const issuedClassSystemFrames = new WeakSet();
  let cachedClassSystemProjection = null;
  const issuedIrregularSourceFrames = new WeakSet();
  let cachedCoalescedStockProjection = null;
  let cachedNonextantSourceLifecycleProjection = null;
  const cachedExtantSourceProjections = new Map();
  const cachedExtantNonspecificCauseeProjections = new Map();
  const cachedExtantContextualReadingProjections = new Map();
  const cachedExtantNominalRootProjections = new Map();
  const issuedEHuaSystemFrames = new WeakSet();
  let cachedHuaSourceCoalescenceProjection = null;

  function buildClassicalNahuatlDestockalEHuaSystemValidationFrame({ requestedRelation = "" } = {}) {
    // Preserve the other historical selections without claiming their aggregate
    // proof is closed by this focused source-reconstruction observation.
    if (!requestedRelation) return buildClassicalNahuatlVncDerivationValidationFrame();
    if (requestedRelation !== "reconstructed-source-coalescence") return deepFreeze({
      kind: "classical-nahuatl-destockal-e-hua-system-validation-frame",
      authorizationStatus: "blocked", blockReason: "recognized-e-hua-system-relation-required",
    });
    if (!cachedHuaSourceCoalescenceProjection) {
      cachedHuaSourceCoalescenceProjection = buildFusedHuaSourceCoalescenceProjection(targetObject);
      if (cachedHuaSourceCoalescenceProjection.authorizationStatus === "authorized") {
        issuedEHuaSystemFrames.add(cachedHuaSourceCoalescenceProjection);
      }
    }
    return cachedHuaSourceCoalescenceProjection;
  }

  function isClassicalNahuatlDestockalEHuaSystemValidationFrame(frame = null) {
    return isClassicalNahuatlVncDerivationValidationFrame(frame)
      || Boolean(frame && issuedEHuaSystemFrames.has(frame)
        && frame.kind === "classical-nahuatl-destockal-e-hua-system-validation-frame"
        && frame.authorizationStatus === "authorized"
        && frame.typedFrameAuthority === true
        && frame.formulaStringAuthority === false
        && frame.surfaceStringAuthority === false
        && frame.storedExampleAuthority === false && Object.isFrozen(frame));
  }

  function buildClassicalNahuatlDestockalIrregularSourceValidationFrame({ requestedRelation = "coalesced-stock", sourceSelection = "" } = {}) {
    if (requestedRelation === "extant-fused-nominal-root") {
      if (!cachedExtantNominalRootProjections.has(sourceSelection)) {
        const projection = buildExtantFusedNominalRootProjection(targetObject, sourceSelection);
        if (projection.authorizationStatus === "authorized") issuedIrregularSourceFrames.add(projection);
        cachedExtantNominalRootProjections.set(sourceSelection, projection);
      }
      return cachedExtantNominalRootProjections.get(sourceSelection);
    }
    if (requestedRelation === "extant-fused-contextual-reading") {
      if (!cachedExtantContextualReadingProjections.has(sourceSelection)) {
        // These are finite proof fixtures. The interpreter, not this observation
        // map or the Canvas coordinates, owns matching and participant binding.
        const fixtures = {
          "xini-wall": ["xini", "source", "collapse-wall", ["wall"]],
          "xini-mountainside": ["xini", "source", "slide-or-collapse-mountainside", ["mountainside"]],
          "cehui-fire": ["cehui", "source", "go-out-fire", ["fire"]],
          "xini-stitches": ["xini", "causative", "rip-out-stitches", ["stitches"]],
          "cehui-flame": ["cehui", "causative", "extinguish-flame", ["fire", "candle-flame", "flame"]],
        };
        const fixture = Object.hasOwn(fixtures, sourceSelection) ? fixtures[sourceSelection] : null;
        const [lexeme, relationKind, requestedReading, referents] = fixture || [];
        const base = fixture ? buildClassicalNahuatlDestockalIrregularSourceValidationFrame({
          requestedRelation: relationKind === "source" ? "extant-fused-source" : "extant-fused-nonspecific-causee",
          sourceSelection: lexeme,
        }) : null;
        const constraints = base?.constraints?.destockalIrregularSourceLifecycle;
        let meaningFrame = relationKind === "source"
          ? constraints?.extantFusedSources?.[lexeme]?.sourceMeaningFrame
          : constraints?.extantFusedNonspecificCausees?.[lexeme]?.meaningFrame;
        if (meaningFrame && relationKind === "source") {
          // This explicit nonanimate/common-number Source is one typed witness,
          // not a restriction on all readings of the lexical source. Context
          // leaves the Source participant and its grammatical facts unchanged.
          const applicationFrame = targetObject.evaluateClassicalNahuatlVncApplication({
            sourceStem: meaningFrame.applicationFrame.normalizedRequest.sourceStem,
            verbClass: "B", sourceValence: "intransitive", sourceSubject: "3common",
            sourceSubjectAnimacy: "nonanimate", sourceSubjectHumanness: "nonhuman",
            subject: "3sg", sourceVoice: "active", requestedDerivation: "direct",
            requestedVoice: "active", mood: "indicative", tense: "present", outputScope: "single",
          });
          meaningFrame = targetObject.buildClassicalNahuatlExtantDestockalMeaningFrame({ applicationFrame });
        }
        const observations = targetObject.isClassicalNahuatlExtantDestockalMeaningFrame(meaningFrame) ? referents.map(referentKind => (
          targetObject.interpretClassicalNahuatlExtantDestockalReading({
            meaningFrame,
            context: { participantFrame: meaningFrame.participantBinding.participantFrame, referentKind },
            requestedReading,
          })
        )) : [];
        const authorized = Boolean(observations.length && observations.every(observation => (
          targetObject.isClassicalNahuatlExtantDestockalReadingFrame(observation)
          && observation.meaningFrame === meaningFrame
          && observation.selectedResolution?.reading.meaningId === requestedReading
          && observation.selectedResolution.contextStatus === "matched"
          && observation.context.participantFrame === meaningFrame.participantBinding.participantFrame
        )));
        const projection = deepFreeze({
          kind: "classical-nahuatl-destockal-irregular-source-validation-frame",
          authorizationStatus: authorized ? "authorized" : "blocked",
          blockReason: authorized ? "" : "canonical-extant-destockal-contextual-reading-required",
          requestedRelation, sourceSelection,
          constraints: { destockalIrregularSourceLifecycle: { extantFusedContextualReadings: {
            [sourceSelection]: { meaningFrame: meaningFrame || null, observations },
          } } },
          typedFrameAuthority: true, formulaStringAuthority: false,
          surfaceStringAuthority: false, storedExampleAuthority: false,
        });
        if (authorized) issuedIrregularSourceFrames.add(projection);
        cachedExtantContextualReadingProjections.set(sourceSelection, projection);
      }
      return cachedExtantContextualReadingProjections.get(sourceSelection);
    }
    if (requestedRelation === "extant-fused-nonspecific-causee") {
      if (!cachedExtantNonspecificCauseeProjections.has(sourceSelection)) {
        const projection = buildExtantFusedNonspecificCauseeProjection(targetObject, sourceSelection);
        if (projection.authorizationStatus === "authorized") issuedIrregularSourceFrames.add(projection);
        cachedExtantNonspecificCauseeProjections.set(sourceSelection, projection);
      }
      return cachedExtantNonspecificCauseeProjections.get(sourceSelection);
    }
    if (requestedRelation === "extant-fused-source") {
      if (!cachedExtantSourceProjections.has(sourceSelection)) {
        const projection = buildExtantFusedSourceProjection(targetObject, sourceSelection);
        if (projection.authorizationStatus === "authorized") issuedIrregularSourceFrames.add(projection);
        cachedExtantSourceProjections.set(sourceSelection, projection);
      }
      return cachedExtantSourceProjections.get(sourceSelection);
    }
    if (requestedRelation === "nonextant-source-lifecycle") {
      if (!cachedNonextantSourceLifecycleProjection) {
        cachedNonextantSourceLifecycleProjection = buildDestockalNonextantSourceLifecycleProjection(targetObject);
        if (cachedNonextantSourceLifecycleProjection.authorizationStatus === "authorized") {
          issuedIrregularSourceFrames.add(cachedNonextantSourceLifecycleProjection);
        }
      }
      return cachedNonextantSourceLifecycleProjection;
    }
    if (requestedRelation !== "coalesced-stock") {
      return deepFreeze({
        kind: "classical-nahuatl-destockal-irregular-source-validation-frame",
        authorizationStatus: "blocked",
        blockReason: "recognized-destockal-irregular-source-relation-required",
      });
    }
    if (!cachedCoalescedStockProjection) {
      cachedCoalescedStockProjection = buildDestockalCoalescedStockProjection(targetObject);
      if (cachedCoalescedStockProjection.authorizationStatus === "authorized") {
        issuedIrregularSourceFrames.add(cachedCoalescedStockProjection);
      }
    }
    return cachedCoalescedStockProjection;
  }

  function isClassicalNahuatlDestockalIrregularSourceValidationFrame(frame = null) {
    return Boolean(frame && issuedIrregularSourceFrames.has(frame)
      && frame.kind === "classical-nahuatl-destockal-irregular-source-validation-frame"
      && frame.authorizationStatus === "authorized"
      && frame.typedFrameAuthority === true
      && frame.formulaStringAuthority === false
      && frame.surfaceStringAuthority === false
      && frame.storedExampleAuthority === false
      && Object.isFrozen(frame));
  }

  function buildClassicalNahuatlDestockalNiHuiClassSystemValidationFrame() {
    if (!cachedClassSystemProjection) {
      cachedClassSystemProjection = buildDestockalNiHuiClassSystemProjection(targetObject);
      if (cachedClassSystemProjection.authorizationStatus === "authorized") {
        issuedClassSystemFrames.add(cachedClassSystemProjection);
      }
    }
    return cachedClassSystemProjection;
  }

  function isClassicalNahuatlDestockalNiHuiClassSystemValidationFrame(frame = null) {
    return Boolean(frame && issuedClassSystemFrames.has(frame)
      && frame.kind === "classical-nahuatl-destockal-ni-hui-class-system-validation-frame"
      && frame.authorizationStatus === "authorized"
      && frame.typedFrameAuthority === true
      && frame.canvasExampleAuthority === false
      && frame.callerSuppliedGrammarAuthority === false
      && frame.formulaStringAuthority === false
      && frame.surfaceStringAuthority === false
      && frame.storedExampleAuthority === false
      && Object.isFrozen(frame));
  }

  function buildClassicalNahuatlVncDerivationValidationFrame() {
    if (!cachedProjection) {
      cachedProjection = buildProjection(targetObject);
      if (cachedProjection.authorizationStatus === "authorized") {
        issuedFrames.add(cachedProjection);
      }
    }
    return cachedProjection;
  }

  function isClassicalNahuatlVncDerivationValidationFrame(frame = null) {
    return Boolean(
      frame
      && issuedFrames.has(frame)
      && frame.kind
        === "classical-nahuatl-vnc-derivation-validation-frame"
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
    buildClassicalNahuatlDestockalEHuaSystemValidationFrame,
    isClassicalNahuatlDestockalEHuaSystemValidationFrame,
    buildClassicalNahuatlDestockalIrregularSourceValidationFrame,
    isClassicalNahuatlDestockalIrregularSourceValidationFrame,
    buildClassicalNahuatlDestockalNiHuiClassSystemValidationFrame,
    isClassicalNahuatlDestockalNiHuiClassSystemValidationFrame,
    buildClassicalNahuatlPinahuaSourceClassVariationConstraint,
    buildClassicalNahuatlFinalAReplacementMorphologicalContrastConstraint,
    buildClassicalNahuatlRootPlusYaCausativeReplacementConstraint,
    buildClassicalNahuatlDestockalStockFormationSystemConstraint,
    buildClassicalNahuatlDestockalStockVowelHarmonySystemConstraint,
    buildClassicalNahuatlDestockalNiHuiLexicalInventoryConstraint,
    buildClassicalNahuatlGoComeCausativeSuppletiveOnlyConstraint,
    buildClassicalNahuatlVncDerivationValidationFrame,
    isClassicalNahuatlVncDerivationValidationFrame,
  });
}
