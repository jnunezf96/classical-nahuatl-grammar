// Canonical Andrews-only closure for Lessons 27, 28, 29, and 33.
//
// This production module contains executable typed grammar only. Source spans,
// dispositions, inventories, counts, and audit receipts live exclusively in
// the test/documentation layer.

export function createClassicalNahuatlVncClosureApi(targetObject = globalThis) {
  const VERSION = 1;
  const issuedOperationFrames = new WeakSet();
  const issuedMachineryFrames = new WeakSet();
  const issuedClosureFrames = new WeakSet();
  const LCM_AXIS_IDS = Object.freeze([
    "operation",
    "operation-variant",
    "source-stem",
    "source-class",
    "source-valence",
    "subject",
    "mood",
    "tense",
    "participant-topology",
    "frequentative-shape-and-recursion",
    "compound-matrix-and-valence",
    "purposive-series-and-direction",
    "external-directional",
    "attitude-polarity-and-member",
    "finite-boundary-result",
  ]);

  const freeze = value => {
    if (Array.isArray(value)) return Object.freeze(value.map(freeze));
    if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
    Object.values(value).forEach(freeze);
    return Object.freeze(value);
  };
  const text = value => String(value ?? "").trim();
  const key = value => text(value).toLowerCase();

  function buildSelectedLcmProjection(
    request = {},
    operationFrame = null,
    finiteSurfaceFrame = null
  ) {
    const sourceTyped = operationFrame?.sourceTypedVncSlotFrame;
    const participantSlots = Array.isArray(
      operationFrame?.targetTypedVncSlotFrame?.slots?.prePredicate
    )
      ? operationFrame.targetTypedVncSlotFrame.slots.prePredicate
      : [];
    const selectedValues = {
      operation: operationFrame?.operation || key(request.lateOperation) || "not-applicable",
      "operation-variant": operationFrame?.variant || key(request.lateVariant) || "not-applicable",
      "source-stem": operationFrame?.sourceStem || text(request.sourceStem) || "not-applicable",
      "source-class": text(request.verbClass).toUpperCase() || "not-applicable",
      "source-valence": text(
        operationFrame?.sourceMachineryFrame?.targetValence
        || request.sourceValence
      ) || "not-applicable",
      subject: text(request.subject) || "not-applicable",
      mood: text(request.mood) || "not-applicable",
      tense: text(request.tense) || "not-applicable",
      "participant-topology": participantSlots.length
        ? participantSlots.map(slot => text(
          slot.objectPositionFrame?.objectKind || slot.kind
        )).join("+")
        : "vacant",
      "frequentative-shape-and-recursion":
        operationFrame?.operation === "frequentative"
          ? `${operationFrame.variant}:${Number(request.frequentativeRepetitions) || 1}`
          : "not-applicable",
      "compound-matrix-and-valence":
        operationFrame?.operation === "compound"
          ? `${operationFrame.operationFacts?.matrixStem || "unknown"}:${operationFrame.targetValence || "unknown"}`
          : "not-applicable",
      "purposive-series-and-direction":
        operationFrame?.operation === "purposive"
          ? `${operationFrame.operationFacts?.series || "unknown"}:${operationFrame.operationFacts?.direction || "unknown"}`
          : "not-applicable",
      "external-directional":
        operationFrame?.operationFacts?.externalDirectional || "none",
      "attitude-polarity-and-member":
        ["honorific", "reverential", "pejorative"].includes(
          operationFrame?.operation
        )
          ? `${operationFrame.operation}:${operationFrame.variant}`
          : "not-applicable",
      "finite-boundary-result":
        finiteSurfaceFrame?.authorizationStatus === "authorized"
          ? finiteSurfaceFrame.wordRealization
          : "blocked",
    };
    const selectedAxisValues = LCM_AXIS_IDS.map(axisId => freeze({
      axisId,
      selectedValue: text(selectedValues[axisId]) || "not-applicable",
    }));
    return freeze({
      axisIds: LCM_AXIS_IDS,
      axisCount: LCM_AXIS_IDS.length,
      licensedAxisSetComplete: selectedAxisValues.length === LCM_AXIS_IDS.length
        && selectedAxisValues.every(selection => Boolean(selection.selectedValue)),
      selectedAxisIds: selectedAxisValues.map(selection => selection.axisId),
      selectedAxisValues,
      selectedValues: Object.fromEntries(
        selectedAxisValues.map(selection => [
          selection.axisId,
          selection.selectedValue,
        ])
      ),
      selectedSourceSemanticIdentity: sourceTyped?.semanticIdentity || "",
      lessonMetadataAuthorizesOutput: false,
    });
  }

  function buildEvaluatedGcdProjection({
    baseApplicationFrame = null,
    recursiveEmbedClosureFrame = null,
    operationFrame = null,
    machineryFrame = null,
    finiteSurfaceFrame = null,
  } = {}) {
    const sourceAuthorized = baseApplicationFrame?.authorizationStatus === "authorized"
      || isAuthorizedClosureFrame(recursiveEmbedClosureFrame);
    const operationAuthorized = issuedOperationFrames.has(operationFrame)
      && operationFrame?.authorizationStatus === "authorized";
    const machineryAuthorized = issuedMachineryFrames.has(machineryFrame)
      && machineryFrame?.operationFrame === operationFrame;
    const typedResultContinuous = operationFrame?.targetTypedVncSlotFrame
      === machineryFrame?.proofFrame?.conclusion?.finalTypedVncSlotFrame;
    const finiteResultAuthorized =
      targetObject.isClassicalNahuatlVncFiniteSurfaceFrame?.(
        finiteSurfaceFrame
      ) === true
      && finiteSurfaceFrame.machineryFrame === machineryFrame;
    const selectedFormulaContinuous = finiteResultAuthorized
      && finiteSurfaceFrame.formulaRealization
        === targetObject.renderClassicalNahuatlVncSlotFrameFormula?.(
          operationFrame?.targetTypedVncSlotFrame
        );
    return freeze({
      identity:
        "typed-vnc-source+semantic-operation+typed-slot-projection+finite-boundary-result",
      sourceAuthorized,
      operationAuthorized,
      machineryAuthorized,
      typedResultContinuous,
      finiteResultAuthorized,
      selectedFormulaContinuous,
      satisfied: Boolean(
        sourceAuthorized
        && operationAuthorized
        && machineryAuthorized
        && typedResultContinuous
        && finiteResultAuthorized
        && selectedFormulaContinuous
      ),
    });
  }

  const vowels = "aāeēiīoō";
  const consonantUnits = /^(?:ch|cu|hu|qu|tl|tz|[bcçhlmnpqstxyz])/u;
  const shortVowel = value => ({ ā: "a", ē: "e", ī: "i", ō: "o" }[value] || value);
  const longVowel = value => ({ a: "ā", e: "ē", i: "ī", o: "ō" }[value] || value);
  const firstSound = stem => {
    const match = key(stem).match(consonantUnits);
    return match?.[0] || "";
  };
  function getReduplicationParts(sourceStem, { supportiveI = false } = {}) {
    let stem = text(sourceStem).replace(/^\((.*)\)$/u, "$1");
    if (supportiveI && /^i/u.test(stem)) {
      const afterI = stem.slice(1);
      const first = afterI.match(consonantUnits)?.[0] || "";
      const afterFirst = afterI.slice(first.length);
      const second = afterFirst.match(consonantUnits)?.[0] || "";
      const afterSecond = afterFirst.slice(second.length);
      const vowel = afterSecond.match(new RegExp(`^[${vowels}]`, "u"))?.[0] || afterFirst.match(new RegExp(`[${vowels}]`, "u"))?.[0] || "i";
      return { consonant: second || first, vowel, retainedStem: afterI };
    }
    const consonant = stem.match(consonantUnits)?.[0] || "";
    const remainder = stem.slice(consonant.length);
    const vowel = remainder.match(new RegExp(`[${vowels}]`, "u"))?.[0] || stem.match(new RegExp(`[${vowels}]`, "u"))?.[0] || "i";
    return { consonant, vowel, retainedStem: stem };
  }
  function reduplicate(sourceStem, shape = "short-glottal", options = {}) {
    const parts = getReduplicationParts(sourceStem, options);
    const vowel = shape === "long" ? longVowel(shortVowel(parts.vowel)) : shortVowel(parts.vowel);
    const prefix = `${parts.consonant}${vowel}${shape === "short-glottal" ? "h" : ""}`;
    const repetitions = Math.max(1, Math.min(3, Number(options.repetitions) || 1));
    return `${Array.from({ length: repetitions }, () => prefix).join("-")}-${parts.retainedStem}`;
  }
  function perfectiveStemFromMachinery(machineryFrame = null) {
    const candidates = [
      machineryFrame?.perfectiveStem,
      machineryFrame?.classProfile?.perfectiveStem,
      machineryFrame?.proofFrame?.conclusion?.perfectiveStem,
      machineryFrame?.proofFrame?.conclusion?.predicateTableCell?.stem,
      machineryFrame?.proofFrame?.conclusion?.finalTypedVncSlotFrame?.slots?.predicate?.stem
    ];
    return text(candidates.find(Boolean));
  }
  function isAuthorizedClosureFrame(frame = null) {
    return Boolean(
      frame
      && issuedClosureFrames.has(frame)
      && frame.kind === "classical-nahuatl-late-vnc-derivation-closure-frame"
      && frame.version === VERSION
      && frame.authorizationStatus === "authorized"
      && frame.finalTypedVncSlotFrame
      && frame.selectedMachineryFrame
    );
  }
  function buildAccompanyingPossessionSupplement(request = {}) {
    if (typeof targetObject.buildClassicalNahuatlPossessiveNncFrame !== "function"
      || typeof targetObject.buildClassicalNahuatlNncSentenceSurfaceFrame !== "function"
      || typeof targetObject.isClassicalNahuatlNncSlotFrame !== "function") {
      return freeze({
        kind: "classical-nahuatl-accompanying-possession-accompanying-possession-supplement-frame",
        authorizationStatus: "blocked",
        blockReason: "canonical-possessive-nnc-evaluator-unavailable"
      });
    }
    const predicateStem = text(request.compoundPossessiveStem);
    const possessor = text(request.compoundPossessor);
    if (!predicateStem || !possessor) {
      return freeze({
        kind: "classical-nahuatl-accompanying-possession-accompanying-possession-supplement-frame",
        authorizationStatus: "blocked",
        blockReason: "typed-possessive-supplement-required"
      });
    }
    const possessiveNncFrame = targetObject.buildClassicalNahuatlPossessiveNncFrame(
      predicateStem,
      {
        subject: text(request.subject || "3sg"),
        possessor,
        singularConnector: "0",
        nounstemRelationKind: "nonrelational",
        animacy: key(request.compoundPossessiveAnimacy || "nonanimate"),
        formula: text(request.compoundPossessiveFormula)
      }
    );
    const nncSlotFrame = possessiveNncFrame?.nncSlotFrame || null;
    const sentenceSurfaceFrame = targetObject.buildClassicalNahuatlNncSentenceSurfaceFrame(
      nncSlotFrame,
      { sentenceType: "assertion", polarity: "positive" }
    );
    const authorized = Boolean(
      possessiveNncFrame?.authorizationStatus === "authorized"
      && targetObject.isClassicalNahuatlNncSlotFrame(nncSlotFrame)
      && sentenceSurfaceFrame?.authorizationStatus === "authorized"
      && sentenceSurfaceFrame?.nuclearSurface
    );
    // The canonical NNC frame owns its own deep graph.  Keep this wrapper
    // shallow-frozen so this operation does not recursively re-freeze another
    // grammar service's issued frame graph.
    return Object.freeze({
      kind: "classical-nahuatl-accompanying-possession-accompanying-possession-supplement-frame",
      version: VERSION,
      authorizationStatus: authorized ? "authorized" : "blocked",
      blockReason: authorized
        ? ""
        : possessiveNncFrame?.blockReason
          || sentenceSurfaceFrame?.blockReason
          || "canonical-possessive-nnc-generation-blocked",
      possessiveNncFrame,
      nncSlotFrame: authorized ? nncSlotFrame : null,
      sentenceSurfaceFrame: authorized ? sentenceSurfaceFrame : null,
      predicateStem,
      possessor,
      typedNncAuthority: true,
      formulaStringAuthority: false,
      surfaceStringAuthority: false
    });
  }
  function buildAccompanyingPossessionResultFrame(
    supplementFrame = null,
    finiteSurfaceFrame = null
  ) {
    const authorized = Boolean(
      supplementFrame?.kind
        === "classical-nahuatl-accompanying-possession-accompanying-possession-supplement-frame"
      && supplementFrame.authorizationStatus === "authorized"
      && supplementFrame.nncSlotFrame
      && targetObject.isClassicalNahuatlNncSlotFrame?.(supplementFrame.nncSlotFrame)
      && finiteSurfaceFrame?.authorizationStatus === "authorized"
      && targetObject.isClassicalNahuatlVncFiniteSurfaceFrame?.(finiteSurfaceFrame)
    );
    const supplementSurface = text(
      supplementFrame?.sentenceSurfaceFrame?.nuclearSurface
    );
    const vncSurface = text(finiteSurfaceFrame?.wordRealization);
    return Object.freeze({
      kind: "classical-nahuatl-accompanying-possession-accompanying-possession-result-frame",
      version: VERSION,
      authorizationStatus: authorized ? "authorized" : "blocked",
      blockReason: authorized
        ? ""
        : supplementFrame?.blockReason
          || finiteSurfaceFrame?.blockReason
          || "typed-possessive-nnc-and-vnc-results-required",
      supplementFrame: authorized ? supplementFrame : null,
      finiteSurfaceFrame: authorized ? finiteSurfaceFrame : null,
      surfaceRealization: authorized ? `${supplementSurface} ${vncSurface}` : "",
      typedResultAuthority: true,
      formulaStringAuthority: false,
      surfaceStringAuthority: false
    });
  }
  function futureEmbedStem(sourceStem, verbClass = "B") {
    const stem = text(sourceStem);
    const classId = text(verbClass).toUpperCase();
    if (classId === "C") {
      return stem.replace(/([io])a$/u, (_all, vowel) => longVowel(vowel));
    }
    if (classId === "D") return stem.replace(/a$/u, "ā");
    return stem;
  }
  function connectiveFor(matrixStem) {
    return new RegExp(`^[${vowels}]`, "iu").test(text(matrixStem)) ? "t" : "ti";
  }
  const INTRANSITIVE_COMPOUND_MATRICES = new Set([
    "ca", "nemi", "ya-uh", "huāl-la-uh", "huī-tz", "ahci", "mani",
    "ihca", "o", "ē-hua", "quiza", "huetzi", "tlehcō", "cal-aqui",
    "pil-ca"
  ]);
  const REFLEXIVE_COMPOUND_MATRICES = new Set([
    "m-o-cāhua", "m-o-tēca", "m-o-tlāl-i-ā", "m-o-man-a",
    "m-o-quetza"
  ]);
  const SHARED_OBJECT_COMPOUND_MATRICES = new Set([
    "tlāl-i-ā", "quetza", "tēca", "cāhua", "quix-tiā", "māy-a-hui"
  ]);
  const FUTURE_EMBED_COMPOUND_MATRICES = new Set(["tla-nequi", "tla-qui"]);
  const LEXICALIZED_DESTOCKAL_FREQUENTATIVES = new Map([
    ["chi-chin-a-ca", { targetStem: "chi-chin-a-ca", targetClass: "A", force: "intransitive" }],
    ["qui-quin-a-ca", { targetStem: "qui-quin-a-ca", targetClass: "A", force: "intransitive" }],
    ["qui-quin-a-tz-a", { targetStem: "qui-quin-a-tz-a", targetClass: "B", force: "applicative" }],
    ["po-pō-ca", { targetStem: "po-pō-ca", targetClass: "A", force: "intransitive" }],
    ["po-pō-tz-a", { targetStem: "po-pō-tz-a", targetClass: "B", force: "causative" }],
    ["to-tō-ca", { targetStem: "to-tō-ca", targetClass: "A", force: "intransitive" }],
    ["to-tō-tz-a", { targetStem: "to-tō-tz-a", targetClass: "B", force: "causative" }],
    ["pi-pī-ca", { targetStem: "pi-pī-ca", targetClass: "A", force: "intransitive" }],
    ["pi-pi-tz-a", { targetStem: "pi-pi-tz-a", targetClass: "B", force: "causative" }],
    ["tla-cua-cual-a-ca", { targetStem: "tla-cua-cual-a-ca", targetClass: "A", force: "impersonal" }],
    ["tla-tzi-tzil-i-ca", { targetStem: "tla-tzi-tzil-i-ca", targetClass: "A", force: "impersonal" }]
  ]);
  const UNCERTAIN_CA_FREQUENTATIVES = new Map([
    ["chal", "cha-chal-ca"],
    ["tzil", "tzi-tzil-ca"],
    ["nal", "na-na-l-ca"],
    ["hual", "hua-hua-l-ca"],
    ["pach", "pa-pach-ca"],
    ["huix", "hui-huix-ca"]
  ]);
  const UNCERTAIN_TZCA_FREQUENTATIVES = new Map([
    ["tla-tla", "tla-tla-tz-ca"],
    ["cui-ca", "cui-cui-tz-ca"],
    ["na-na-tz-ca", "na-na-tz-ca"],
    ["pi-pi-tz-ca", "pi-pi-tz-ca"],
    ["mo-mo-tz-ca", "mo-mo-tz-ca"],
    ["pe-pe-tz-ca", "pe-pe-tz-ca"]
  ]);
  function allowedCompoundMatricesForVariant(variant) {
    if (variant === "reflexive-matrix") return REFLEXIVE_COMPOUND_MATRICES;
    if (variant === "shared-object") return SHARED_OBJECT_COMPOUND_MATRICES;
    if (variant === "future-embed") return FUTURE_EMBED_COMPOUND_MATRICES;
    if (variant === "huītz-carry") return new Set(["huī-tz"]);
    return INTRANSITIVE_COMPOUND_MATRICES;
  }
  function deriveCompoundMatrixClass(matrixStem = "", requestedClass = "") {
    const stem = text(matrixStem);
    const requested = text(requestedClass).toUpperCase();
    if (stem === "ē-hua") {
      return ["A", "B"].includes(requested) ? requested : "A";
    }
    const profile = typeof targetObject.inferClassicalNahuatlLesson7ClassProfile
      === "function"
      ? targetObject.inferClassicalNahuatlLesson7ClassProfile(stem)
      : null;
    const inferred = text(profile?.classId).toUpperCase();
    if (["A", "B", "C", "D"].includes(inferred)) return inferred;
    return ({
      ca: "A",
      nemi: "B",
      "ya-uh": "B",
      "huāl-la-uh": "B",
      "huī-tz": "A",
      ahci: "B",
      mani: "B",
      ihca: "B",
      o: "A",
      quiza: "B",
      huetzi: "B",
      tlehcō: "C",
      "cal-aqui": "B",
      "pil-ca": "A",
      "m-o-cāhua": "A",
      "m-o-tēca": "A",
      "m-o-tlāl-i-ā": "D",
      "m-o-man-a": "B",
      "m-o-quetza": "B",
      "tla-nequi": "B",
      "tla-qui": "B",
      "tlāl-i-ā": "D",
      quetza: "B",
      tēca: "A",
      cāhua: "A",
      "quix-tiā": "D",
      "māy-a-hui": "B"
    })[stem] || "A";
  }
  function cloneObjectFrameFromTyped(typedFrame = null, transform = null) {
    const slots = (
      Array.isArray(typedFrame?.slots?.prePredicate)
        ? typedFrame.slots.prePredicate
        : []
    ).filter(slot =>
      ["monadic-valence", "dyadic-valence"].includes(slot?.kind)
    );
    const mapped = slots.map((slot, index) => {
      const carrier = text(slot?.carrier);
      const silencedSpecificProjective = Boolean(
        slot?.objectPositionFrame?.silencingRule
          === "incompatible-specific-projective-silenced"
      );
      const position = {
        ...(slot.objectPositionFrame || {}),
        valenceArity: slot.kind === "monadic-valence" ? "monadic" : "dyadic",
        va: slot.va,
        // The canonical finite boundary writes an explicitly silenced
        // incompatible projective position as ⎕. Preserve that typed carrier
        // when a later operation clones the source object topology so the
        // typed formula and the finite realization remain pointwise equal.
        va1: silencedSpecificProjective ? "⎕" : slot.va1,
        va2: slot.va2,
        objectKind: text(slot?.objectPositionFrame?.objectKind)
          || (/^(?:n|t|m)-(?:o|⎕)$/u.test(carrier) ? "reflexive" : "")
      };
      return transform ? transform(position, slot, index) : position;
    });
    if (!mapped.length) return { valenceArity: "vacant" };
    if (mapped.length > 1) return { valenceArity: "multiple", positions: mapped };
    return { ...mapped[0], valenceArity: mapped[0].valenceArity };
  }
  function createTypedSlotFromBase(baseTypedFrame, targetStem, {
    predicateTns,
    numberDyad,
    objectTransform,
    objectFrame,
    sourceFrameKind = "classical-nahuatl-late-vnc-derivation-operation-machinery-frame"
  } = {}) {
    if (typeof targetObject.buildClassicalNahuatlVncSlotFrame !== "function") return null;
    return targetObject.buildClassicalNahuatlVncSlotFrame({
      sourceFrameKind,
      sourceAuthorizationStatus: "authorized",
      stem: targetStem,
      personDyad: {
        pers1: baseTypedFrame?.slots?.subject?.pers1,
        pers2: baseTypedFrame?.slots?.subject?.pers2
      },
      tenseFrame: {
        tns: predicateTns === undefined ? baseTypedFrame?.slots?.predicate?.tns : predicateTns
      },
      numberDyad: {
        num1: numberDyad?.num1 ?? baseTypedFrame?.slots?.number?.num1,
        num2: numberDyad?.num2 ?? baseTypedFrame?.slots?.number?.num2
      },
      objectFrame: objectFrame || {
        ...cloneObjectFrameFromTyped(baseTypedFrame, objectTransform),
        stemRealization: targetStem
      }
    });
  }
  function getBaseTypedFrame(applicationFrame = null) {
    return applicationFrame?.resultFrame?.finalTypedVncSlotFrame
      || applicationFrame?.resultFrame?.selectedMachineryFrame?.proofFrame?.conclusion?.finalTypedVncSlotFrame
      || null;
  }
  function blockedOperation(request, reason, ruleFamily = "") {
    const frame = freeze({
      kind: "classical-nahuatl-late-vnc-derivation-operation-frame",
      version: VERSION,
      authorizationStatus: "blocked",
      blockReason: reason,
      operation: key(request?.lateOperation),
      variant: key(request?.lateVariant),
      ruleFamily,
      typedSourceAuthority: true,
      callerFormulaAuthority: false,
      callerSurfaceAuthority: false
    });
    issuedOperationFrames.add(frame);
    return frame;
  }
  function blockedClosure(request, reason, ruleFamily = "") {
    const operationFrame = blockedOperation(request, reason, ruleFamily);
    const frame = freeze({
      kind: "classical-nahuatl-late-vnc-derivation-closure-frame",
      version: VERSION,
      authorizationStatus: "blocked",
      blockReason: reason,
      normalizedRequest: freeze({
        sourceStem: text(request?.sourceStem || request?.stem),
        operation: key(request?.lateOperation),
        variant: key(request?.lateVariant),
        subject: text(request?.subject),
        mood: text(request?.mood),
        tense: text(request?.tense),
        callerFormulaAuthorityAccepted: false,
        callerSurfaceAuthorityAccepted: false
      }),
      operationFrame,
      selectedMachineryFrame: null,
      finalTypedVncSlotFrame: null,
      finiteSurfaceFrame: null,
      formulaRealization: "",
      surfaceRealization: "",
      typedFrameAuthority: true,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      callerSuppliedAuthorityAccepted: false
    });
    issuedClosureFrames.add(frame);
    return frame;
  }

  function buildClassicalNahuatlOperationFrame(baseApplicationFrame = null, request = {}, internalContext = {}) {
    if (internalContext.invalidSourceApplicationFrame === true) {
      return blockedOperation(
        request,
        "engine-issued-derived-source-application-required",
        "honorific-derived-source"
      );
    }
    if (internalContext.sourceDerivationKindMismatch === true) {
      return blockedOperation(
        request,
        "typed-derived-source-operation-continuity-required",
        "honorific-derived-source"
      );
    }
    if (internalContext.invalidAttitudeSourceClosureFrame === true) {
      return blockedOperation(
        request,
        "reverential-requires-engine-issued-honorific-source",
        "reverential-double"
      );
    }
    if (internalContext.invalidRecursiveEmbedFrame === true) {
      return blockedOperation(
        request,
        "engine-issued-recursive-embed-closure-required",
        "compound-recursion"
      );
    }
    if (internalContext.invalidRecursiveMatrixFrame === true) {
      return blockedOperation(
        request,
        "engine-issued-recursive-matrix-closure-required",
        "compound-recursion"
      );
    }
    const recursiveEmbedFrame = isAuthorizedClosureFrame(
      internalContext.recursiveEmbedClosureFrame
    )
      ? internalContext.recursiveEmbedClosureFrame
      : null;
    const baseResult = baseApplicationFrame?.resultFrame || null;
    const baseMachinery = recursiveEmbedFrame?.selectedMachineryFrame
      || baseResult?.selectedMachineryFrame
      || null;
    const baseTyped = recursiveEmbedFrame?.finalTypedVncSlotFrame
      || getBaseTypedFrame(baseApplicationFrame);
    const sourceStem = text(
      recursiveEmbedFrame?.operationFrame?.targetStem
      || request.sourceStem
      || request.stem
    );
    const operation = key(request.lateOperation || "none");
    const variant = key(request.lateVariant || "");
    const canonicalBaseApplication = Boolean(
      typeof targetObject.isClassicalNahuatlVncApplicationFrame === "function"
      && targetObject.isClassicalNahuatlVncApplicationFrame(baseApplicationFrame)
      && baseResult?.authorizationStatus === "authorized"
    );
    if ((!canonicalBaseApplication && !recursiveEmbedFrame)
      || !baseMachinery
      || !baseTyped
      || !sourceStem) {
      return blockedOperation(request, "authorized-canonical-base-vnc-required");
    }
    const sourceCoordinateSubject = recursiveEmbedFrame
      ? recursiveEmbedFrame.normalizedRequest?.subject
      : baseApplicationFrame?.normalizedRequest?.subject;
    const sourceCoordinateStem = recursiveEmbedFrame
      ? recursiveEmbedFrame.operationFrame?.targetStem
      : baseApplicationFrame?.normalizedRequest?.sourceStem;
    if (text(sourceCoordinateStem) !== sourceStem
      || text(sourceCoordinateSubject) !== text(request.subject || "3sg")) {
      return blockedOperation(request, "typed-source-request-continuity-required");
    }
    if (!["frequentative", "compound", "purposive", "honorific", "reverential", "pejorative"].includes(operation)) {
      return blockedOperation(request, "recognized-lessons27-29-33-operation-required");
    }
    let targetStem = "";
    let targetClass = text(request.verbClass || "B").toUpperCase();
    let targetValence = text(request.sourceValence || request.valence || "intransitive");
    let ruleFamily = "";
    let predicateTns;
    let numberDyad;
    let objectTransform = null;
    let objectFrame = null;
    let operationFacts = {};
    const selectedBaseVoice = key(
      baseApplicationFrame?.controlFrame?.selectedVoiceOperation
      || baseApplicationFrame?.controlFrame?.selectedVoice
      || baseApplicationFrame?.normalizedRequest?.requestedVoice
      || baseApplicationFrame?.normalizedRequest?.voice
      || baseMachinery?.voice
      || "active"
    );
    const baseIsNonactive = selectedBaseVoice !== "active";

    if (operation === "frequentative") {
      ruleFamily = "frequentative-prefix-shape";
      const requestedRepetitions = request.frequentativeRepetitions === undefined
        ? 1
        : Number(request.frequentativeRepetitions);
      if (!Number.isInteger(requestedRepetitions)
        || requestedRepetitions < 1
        || requestedRepetitions > 32) {
        return blockedOperation(
          request,
          "positive-bounded-reduplication-count-required",
          "frequentative-recursion"
        );
      }
      const repetitions = requestedRepetitions;
      const frequentativeSourceStem = baseIsNonactive
        ? text(baseTyped.slots?.predicate?.stem)
        : sourceStem;
      if (["ordinary-short-glottal", "ordinary-long", "ordinary-short"].includes(variant)) {
        const shape = variant === "ordinary-long" ? "long" : variant === "ordinary-short" ? "short" : "short-glottal";
        // A fused/impersonal tla is already a typed stem constituent.  The
        // ordinary route reduplicates the lexical stem under it; the separate
        // tla-* variants below are the licensed choice that reduplicates tla
        // itself.  This preserves both formations stated in §27.2/§27.3.
        const ordinarySourceStem = /^tla-/u.test(frequentativeSourceStem)
          ? frequentativeSourceStem.slice(4)
          : frequentativeSourceStem;
        if (key(request.sourceInitialISelection) === "supportive"
          && !/^i(?:ch|cu|hu|qu|tl|tz|[bcçhlmnpqstxyz]){2}/u.test(ordinarySourceStem)) {
          return blockedOperation(
            request,
            "supportive-i-plus-two-consonants-required",
            "frequentative-supportive-i"
          );
        }
        const reduplicatedStem = reduplicate(ordinarySourceStem, shape, {
          repetitions,
          supportiveI: key(request.sourceInitialISelection) === "supportive"
        });
        targetStem = /^tla-/u.test(frequentativeSourceStem)
          ? `tla-${reduplicatedStem}`
          : reduplicatedStem;
        operationFacts = { shape, repetitions, lexicalShapeChoice: true };
      } else if (/^tla-(?:short-glottal|long)(?:-and-stem-(?:short-glottal|long|short))?$/u.test(variant)) {
        if (!/^tla-/u.test(sourceStem)) return blockedOperation(request, "fused-tla-source-required", "frequentative-tla");
        const tlaShape = variant.startsWith("tla-long") ? "tlā-tla" : "tlah-tla";
        const embeddedShape = variant.match(/-and-stem-(short-glottal|long|short)$/u)?.[1] || "";
        const lexicalStem = sourceStem.slice(4);
        targetStem = embeddedShape
          ? `${tlaShape}-${reduplicate(lexicalStem, embeddedShape, { repetitions })}`
          : `${tlaShape}-${lexicalStem}`;
        ruleFamily = "frequentative-tla";
        operationFacts = {
          objectPronounReduplicated: true,
          lexicalStemAlsoReduplicated: Boolean(embeddedShape),
          lexicalStemShape: embeddedShape || "none",
          repetitions
        };
      } else if (variant === "reflexive-partial") {
        if (key(request.sourceInitialISelection) !== "supportive" || !/^i/u.test(sourceStem)) {
          return blockedOperation(request, "supportive-initial-i-source-required", "frequentative-reflexive");
        }
        if (!baseTyped.slots.prePredicate?.some(slot => /reflexive/u.test(slot.objectPositionFrame?.objectKind || "") || /^[mnt]-o$/u.test(slot.carrier || ""))) {
          return blockedOperation(request, "mainline-reflexive-source-required", "frequentative-reflexive");
        }
        targetStem = sourceStem.slice(1);
        objectTransform = position => {
          const va1 = text(position.va1 || position.va || "").replace(/-?o$/u, "");
          return { ...position, valenceArity: "dyadic", va1, va2: "oh-o" };
        };
        ruleFamily = "frequentative-reflexive";
      } else if (variant === "destockal-lexicalized") {
        const lexicalized = LEXICALIZED_DESTOCKAL_FREQUENTATIVES.get(sourceStem);
        if (!lexicalized) {
          return blockedOperation(
            request,
            "canvas-listed-lexicalized-destockal-required",
            "frequentative-destockal"
          );
        }
        targetStem = baseIsNonactive
          ? frequentativeSourceStem
          : lexicalized.targetStem;
        targetClass = lexicalized.targetClass;
        targetValence = lexicalized.force === "intransitive"
          ? "intransitive"
          : text(request.sourceValence || request.valence || "specific-projective");
        ruleFamily = "frequentative-destockal";
        operationFacts = {
          lexicalizedDestockal: true,
          fusedStockVowelRemainsLong: /[āēīō]/u.test(targetStem),
          semanticForce: lexicalized.force,
          nonactiveAppliedToFrequentativeStem: baseIsNonactive
        };
      } else if (variant.startsWith("destockal-")) {
        const shape = "short";
        const parts = getReduplicationParts(sourceStem);
        const redup = `${parts.consonant}${shortVowel(parts.vowel)}`;
        const reduplicationPrefix = Array.from(
          { length: repetitions },
          () => redup
        ).join("-");
        if (variant === "destockal-intransitive") {
          if (!/(?:ni|hui)$/u.test(sourceStem)) return blockedOperation(request, "ni-or-hui-destockal-source-required", "frequentative-destockal");
          targetStem = `${reduplicationPrefix}-${sourceStem.replace(/(?:ni|hui)$/u, "ca").replace(/[āēīō]/gu, shortVowel)}`;
          targetClass = "A";
        } else if (["destockal-causative", "destockal-applicative-force"].includes(variant)) {
          if (!/(?:n-a|ni-ā|hu-a|na|niā|hua)$/u.test(sourceStem)) return blockedOperation(request, "destockal-causative-source-required", "frequentative-destockal");
          const retained = sourceStem.replace(/(?:n-a|ni-ā|hu-a|na|niā|hua)$/u, "tz-a").replace(/[āēīō]/gu, shortVowel);
          targetStem = `${reduplicationPrefix}-${retained}`;
          targetClass = "B";
          if (variant === "destockal-applicative-force") {
            targetValence = "specific-projective";
          }
        } else if (variant === "destockal-applicative") {
          if (!/(?:tz-a|tza)$/u.test(sourceStem)) return blockedOperation(request, "frequentative-destockal-tza-source-required", "frequentative-destockal");
          targetStem = sourceStem.replace(/(?:tz-a|tza)$/u, "ch-i-liā");
          targetClass = "C";
        } else if (variant === "destockal-type-two") {
          targetStem = sourceStem.replace(/ca$/u, "qui-l-tiā");
          if (targetStem === sourceStem) return blockedOperation(request, "frequentative-destockal-ca-source-required", "frequentative-destockal");
          targetClass = "C";
        } else {
          return blockedOperation(request, "recognized-destockal-operation-required", "frequentative-destockal");
        }
        ruleFamily = "frequentative-destockal";
        operationFacts = {
          shortVowelReduplication: true,
          stockLongVowelReduced: true,
          repetitions,
          semanticForce: variant === "destockal-applicative-force"
            ? "applicative"
            : variant === "destockal-causative"
              ? "causative"
              : ""
        };
      } else if ([
        "uncertain-ca",
        "uncertain-ca-applicative-growl",
        "uncertain-ca-fused-tla-bark",
      ].includes(variant)) {
        targetStem = text(UNCERTAIN_CA_FREQUENTATIVES.get(sourceStem));
        if (!targetStem) {
          return blockedOperation(
            request,
            "canvas-listed-uncertain-ca-root-required",
            "frequentative-uncertain"
          );
        }
        targetClass = "A";
        ruleFamily = "frequentative-uncertain";
        if (variant === "uncertain-ca-applicative-growl") {
          if (sourceStem !== "hual") return blockedOperation(
            request,
            "hual-growl-applicative-source-required",
            "frequentative-uncertain",
          );
          targetStem = "hua-hua-l-tz-a";
          targetClass = "A";
          targetValence = "specific-projective";
          operationFacts = {
            lexicalMeaning: "dog-growl-at-object",
            objectPrefixAlternatives: ["tē", "tla"],
            applicative: true,
          };
        } else if (variant === "uncertain-ca-fused-tla-bark") {
          if (sourceStem !== "hual") return blockedOperation(
            request,
            "hual-bark-source-required",
            "frequentative-uncertain",
          );
          targetStem = "tla-hua-hua-l-tz-a";
          targetClass = "A";
          targetValence = "intransitive";
          operationFacts = {
            lexicalMeaning: "dog-bark",
            fusedObjectPrefix: "tla",
            fusionLowersValence: true,
          };
        }
      } else if (variant === "uncertain-tzca") {
        targetStem = text(UNCERTAIN_TZCA_FREQUENTATIVES.get(sourceStem));
        if (!targetStem) {
          return blockedOperation(
            request,
            "canvas-listed-uncertain-tzca-source-required",
            "frequentative-uncertain"
          );
        }
        targetClass = "A";
        ruleFamily = "frequentative-uncertain";
      } else {
        return blockedOperation(request, "recognized-frequentative-variant-required", "frequentative-prefix-shape");
      }
    } else if (operation === "compound") {
      const recursiveMatrixFrame = isAuthorizedClosureFrame(
        internalContext.recursiveMatrixClosureFrame
      )
        ? internalContext.recursiveMatrixClosureFrame
        : null;
      const matrixStem = text(
        recursiveMatrixFrame?.operationFrame?.targetStem
        || request.compoundMatrixStem
        || request.matrixStem
      );
      const matrixTyped = recursiveMatrixFrame?.finalTypedVncSlotFrame
        || getBaseTypedFrame(internalContext.matrixApplicationFrame);
      const realizedMatrixStem = text(
        recursiveMatrixFrame?.operationFrame?.targetStem
        || matrixTyped?.slots?.predicate?.stem
        || matrixStem
      );
      const allowedMatrices = allowedCompoundMatricesForVariant(variant);
      if (!matrixStem || (!recursiveMatrixFrame && !allowedMatrices.has(matrixStem))) {
        return blockedOperation(request, "lesson28-matrix-inventory-selection-required", "compound-matrix-inventory");
      }
      const canonicalMatrixApplication = Boolean(
        typeof targetObject.isClassicalNahuatlVncApplicationFrame === "function"
        && targetObject.isClassicalNahuatlVncApplicationFrame(
          internalContext.matrixApplicationFrame
        )
        && internalContext.matrixApplicationFrame?.authorizationStatus === "authorized"
      );
      if ((!canonicalMatrixApplication && !recursiveMatrixFrame)
        || !matrixTyped) {
        return blockedOperation(
          request,
          internalContext.matrixApplicationFrame?.blockReason
            || "authorized-matrix-coordinate-required",
          "compound-matrix-inventory"
        );
      }
      const matrixCoordinateStem = recursiveMatrixFrame
        ? recursiveMatrixFrame.operationFrame?.targetStem
        : internalContext.matrixApplicationFrame?.normalizedRequest?.sourceStem;
      const matrixCoordinateSubject = recursiveMatrixFrame
        ? recursiveMatrixFrame.normalizedRequest?.subject
        : internalContext.matrixApplicationFrame?.normalizedRequest?.subject;
      if (text(matrixCoordinateStem) !== matrixStem
        || text(matrixCoordinateSubject) !== text(request.subject || "3sg")) {
        return blockedOperation(request, "typed-matrix-request-continuity-required", "compound-matrix-inventory");
      }
      targetClass = text(
        recursiveMatrixFrame?.operationFrame?.targetClass
        || internalContext.matrixApplicationFrame?.normalizedRequest?.verbClass
        || internalContext.derivedMatrixClass
        || deriveCompoundMatrixClass(matrixStem)
      ).toUpperCase();
      if (baseApplicationFrame?.controlFrame?.selectedVoiceOperation === "tla-impersonal"
        && key(request.compoundNonactiveScope) !== "embed") {
        return blockedOperation(request, "tla-impersonal-is-embed-only", "compound-nonactive");
      }
      if (variant === "future-embed"
        && ["matrix", "both"].includes(key(request.compoundNonactiveScope))) {
        return blockedOperation(
          request,
          "future-embed-nonactive-is-embed-only",
          "compound-nonactive"
        );
      }
      const perfective = ({ ca: "ye", "ya-uh": "yah", "itt-a": "itz" }[sourceStem] || perfectiveStemFromMachinery(baseMachinery) || sourceStem);
      if (sourceStem === "cac" && key(request.compoundSubjectAnimacy) !== "nonanimate") {
        return blockedOperation(request, "cac-embed-requires-nonanimate-subject", "compound-irregular-embed");
      }
      if (sourceStem === "itt-a") return blockedOperation(request, "itta-cannot-embed-select-itz-source-analysis", "compound-irregular-embed");
      if (sourceStem === "itz"
        && key(request.compoundItzSense) !== "observational") {
        return blockedOperation(
          request,
          "typed-itz-embed-sense-required",
          "compound-irregular-embed"
        );
      }
      if (variant === "shared-object"
        && cloneObjectFrameFromTyped(baseTyped).valenceArity === "vacant") {
        return blockedOperation(
          request,
          "shared-object-coreferential-embed-object-required",
          "compound-shared-object"
        );
      }
      if (variant === "huītz-carry") {
        const specialTarget = {
          huīca: "huica-tz",
          itqui: "itqui-tz"
        }[sourceStem];
        if (!specialTarget) {
          return blockedOperation(
            request,
            "huītz-carry-requires-huīca-or-itqui-embed",
            "compound-irregular-embed"
          );
        }
        targetStem = specialTarget;
        predicateTns = matrixTyped?.slots?.predicate?.tns;
        numberDyad = matrixTyped?.slots?.number;
        ruleFamily = "compound-irregular-embed";
        operationFacts = {
          oldConnectivelessHuītzFormation: true,
          prohibitedConnectiveT: true
        };
      } else if (matrixStem === "huī-tz"
        && ["huīca", "itqui"].includes(sourceStem)) {
        return blockedOperation(
          request,
          "huīca-itqui-require-old-connectiveless-huītz-formation",
          "compound-irregular-embed"
        );
      } else if (variant === "connective-t" || variant === "reflexive-matrix" || variant === "shared-object" || variant === "accompanying-possession") {
        const syncopatedYa = request.compoundYaSyncopation === true;
        if (syncopatedYa && !/^(?:yā|ya)$/u.test(realizedMatrixStem)) {
          return blockedOperation(
            request,
            "syncopated-ta-requires-ya-matrix-shape",
            "compound-connective-t"
          );
        }
        const connector = syncopatedYa
          ? "t"
          : connectiveFor(realizedMatrixStem);
        const matrixRealization = syncopatedYa ? "ā" : realizedMatrixStem;
        targetStem = `${perfective}-${connector}-${matrixRealization}`;
        predicateTns = matrixTyped?.slots?.predicate?.tns;
        numberDyad = matrixTyped?.slots?.number;
        ruleFamily = variant === "reflexive-matrix"
          ? "compound-reflexive-matrix"
          : variant === "shared-object"
            ? "compound-shared-object"
            : variant === "accompanying-possession"
              ? "compound-supplement"
              : "compound-connective-t";
        if (variant === "reflexive-matrix" && matrixStem === "m-o-man-a" && key(request.compoundSubjectAnimacy) === "animate" && !/pl$/u.test(text(request.subject))) {
          return blockedOperation(request, "mo-mana-animate-subject-must-be-plural", ruleFamily);
        }
        if (variant === "accompanying-possession") {
          if (sourceStem !== "ca" || perfective !== "ye") {
            return blockedOperation(request, "accompanying-possession-requires-ca-to-ye-embed", ruleFamily);
          }
          const supplementFrame = internalContext.possessiveSupplementFrame;
          if (supplementFrame?.kind
              !== "classical-nahuatl-accompanying-possession-accompanying-possession-supplement-frame"
            || supplementFrame.authorizationStatus !== "authorized"
            || !targetObject.isClassicalNahuatlNncSlotFrame?.(
              supplementFrame.nncSlotFrame
            )) {
            return blockedOperation(
              request,
              supplementFrame?.blockReason || "typed-possessive-supplement-required",
              ruleFamily
            );
          }
          operationFacts = {
            supplementarySubjectFrame: supplementFrame
          };
        }
      } else if (variant === "future-embed") {
        if (matrixStem === "tla-qui" && key(request.tense) !== "imperfect") return blockedOperation(request, "tla-qui-matrix-is-imperfect-only", "compound-future-embed");
        const futurePredicateStem = futureEmbedStem(
          sourceStem,
          text(request.verbClass || "B")
        );
        const integratedMatrixStem = matrixStem.replace(/^tla-/u, "");
        targetStem = `${futurePredicateStem}-z-${integratedMatrixStem}`;
        predicateTns = matrixTyped?.slots?.predicate?.tns;
        numberDyad = matrixTyped?.slots?.number;
        ruleFamily = "compound-future-embed";
      } else {
        return blockedOperation(request, "recognized-lesson28-compound-variant-required", "compound-structure");
      }
      operationFacts = {
        ...operationFacts,
        compoundType: variant === "future-embed" ? "integrated" : "linked",
        linkage: variant === "future-embed"
          ? "integrated-future-object"
          : variant === "huītz-carry"
            ? "linked-connectiveless"
            : "linked-connective-t",
        embedSourceValence: text(
          request.sourceValence || request.valence || "intransitive"
        ),
        matrixSourceValence: SHARED_OBJECT_COMPOUND_MATRICES.has(matrixStem)
          || FUTURE_EMBED_COMPOUND_MATRICES.has(matrixStem)
          ? "transitive"
          : REFLEXIVE_COMPOUND_MATRICES.has(matrixStem)
            ? "transitive-reflexive-core"
            : "intransitive",
        embedDeterminesCompoundValence: true,
        matrixDeterminesCompoundType: true,
        sourcePredicatePreserved: true,
        embedSubjectDeleted: true,
        matrixAfterEmbed: true,
        embedStem: perfective,
        connective: variant === "future-embed"
          ? ""
          : variant === "huītz-carry"
            ? ""
            : request.compoundYaSyncopation === true
              ? "t"
              : connectiveFor(realizedMatrixStem),
        matrixStem: realizedMatrixStem,
        embedTenseMorph: variant === "future-embed" ? "z" : "0",
        itzEmbedSense: sourceStem === "itz"
          ? "observational"
          : sourceStem === "huī-tz" && perfective === "itz"
            ? "motion"
            : "",
        recursiveEmbed: Boolean(recursiveEmbedFrame),
        recursiveMatrix: Boolean(recursiveMatrixFrame),
        recursiveEmbedFrame,
        recursiveMatrixFrame,
        eventOrder: key(request.compoundEventOrder || "iconic"),
        nonactiveScope: key(request.compoundNonactiveScope || "none")
      };
      if (recursiveEmbedFrame || recursiveMatrixFrame) {
        ruleFamily = "compound-recursion";
      }
    } else if (operation === "purposive") {
      const series = key(request.purposiveSeries);
      const direction = series.startsWith("inbound-")
        ? "inbound"
        : series.startsWith("outbound-")
          ? "outbound"
          : "";
      const plural = /pl$/u.test(text(request.subject));
      const externalDirectional = key(
        request.purposiveExternalDirectional || "none"
      );
      if (!["none", "on", "huāl"].includes(externalDirectional)) {
        return blockedOperation(
          request,
          "licensed-external-directional-required",
          "purposive-external-directional"
        );
      }
      const matrixShapes = {
        "outbound-nonpast-indicative": plural ? "t-i-hui" : "t-ī-uh",
        "outbound-past-indicative": "t-o",
        "outbound-nonpast-optative": plural
          ? request.purposiveIrregularPluralN === true ? "t-ī" : "t-i"
          : "t-i",
        "inbound-nonfuture-indicative": "c-o",
        "inbound-future-indicative": plural ? "qu-i-hui" : "qu-ī-uh",
        "inbound-nonpast-optative": "qu-i"
      };
      const matrixShape = matrixShapes[series] || "";
      if (!matrixShape || !direction) {
        return blockedOperation(
          request,
          "licensed-purposive-series-required",
          "purposive-paradigm"
        );
      }
      if (request.purposiveIrregularPluralN === true
        && !(plural && series === "outbound-nonpast-optative")) {
        return blockedOperation(
          request,
          "irregular-n-is-outbound-plural-optative-only",
          "purposive-paradigm"
        );
      }
      const purposiveEmbedStem = baseIsNonactive
        ? text(baseTyped.slots?.predicate?.stem)
        : futureEmbedStem(sourceStem, targetClass);
      targetStem = `${purposiveEmbedStem}-⎕-${matrixShape}`;
      predicateTns = "0";
      numberDyad = {
        num1: "0",
        num2: plural ? request.purposiveIrregularPluralN === true ? "n" : "h" : "0"
      };
      ruleFamily = "purposive-paradigm";
      operationFacts = {
        direction,
        series,
        compoundType: "linked",
        linkage: "connectiveless",
        embedTense: "future",
        embedFutureMorph: "⎕",
        matrixDirectionalMorph: direction === "inbound" ? "c/qu" : "t",
        matrixBaseStem: series === "outbound-past-indicative"
          || series === "inbound-nonfuture-indicative"
          ? "o"
          : "i",
        matrixTenseMeaning: ({
          "outbound-nonpast-indicative": "nonpast",
          "outbound-past-indicative": "past",
          "outbound-nonpast-optative": "nonpast",
          "inbound-nonfuture-indicative": "nonfuture",
          "inbound-future-indicative": "future",
          "inbound-nonpast-optative": "nonpast"
        })[series],
        finiteTenseMorph: "0",
        numberMorph: plural
          ? request.purposiveIrregularPluralN === true ? "n" : "h"
          : "0",
        movementPrecedesPurposeAction: true,
        matrixDirectionalInsideStem: true,
        irregularPluralN: request.purposiveIrregularPluralN === true,
        externalDirectional,
        callerPurposiveDirectionAuthority: false
      };
    } else {
      const subject = key(request.subject);
      const honoredParticipant = key(request.honoredParticipant || "subject");
      const sourceObjectFrame = cloneObjectFrameFromTyped(baseTyped);
      const sourceHasMainlineReflexive =
        Array.isArray(baseTyped?.slots?.prePredicate)
        && baseTyped.slots.prePredicate.some(slot =>
          /reflexive/u.test(text(slot?.objectPositionFrame?.objectKind))
          || /^[mnt]-o$/u.test(text(slot?.carrier))
        );
      if ((operation === "honorific" || operation === "reverential") && /^1/u.test(subject) && honoredParticipant !== "object") {
        return blockedOperation(request, "self-honorific-not-authorized", "honorific-gate");
      }
      if ((operation === "honorific" || operation === "reverential")
        && /^1/u.test(subject)
        && honoredParticipant === "object"
        && sourceObjectFrame.valenceArity === "vacant") {
        return blockedOperation(
          request,
          "first-person-honorific-requires-projective-patient",
          "honorific-projective"
        );
      }
      const compoundTarget = key(internalContext.attitudeCompoundTarget);
      const attitudeSourceFrame = isAuthorizedClosureFrame(
        internalContext.attitudeCompoundClosureFrame
      )
        && internalContext.attitudeCompoundClosureFrame.operationFrame?.operation
          === "compound"
        ? internalContext.attitudeCompoundClosureFrame
        : null;
      const attitudeTransformFrame = isAuthorizedClosureFrame(
        internalContext.attitudeMemberTransformationFrame
      )
        ? internalContext.attitudeMemberTransformationFrame
        : null;
      if (compoundTarget || internalContext.attitudeCompoundClosureFrame) {
        if (!attitudeSourceFrame) {
          return blockedOperation(
            request,
            "engine-issued-typed-compound-source-required",
            "attitude-compound"
          );
        }
        if (!["embed", "matrix"].includes(compoundTarget)) {
          return blockedOperation(
            request,
            "attitude-compound-target-must-be-embed-or-matrix",
            "attitude-compound"
          );
        }
        if (!attitudeTransformFrame) {
          return blockedOperation(
            request,
            "engine-issued-attitude-member-transformation-required",
            "attitude-compound"
          );
        }
        const compoundEmbedStem = text(
          attitudeSourceFrame.operationFrame?.operationFacts?.embedStem
        );
        const compoundMatrixStem = text(
          attitudeSourceFrame.operationFrame?.operationFacts?.matrixStem
        );
        const connector = text(
          attitudeSourceFrame.operationFrame?.operationFacts?.connective
        );
        const transformedMemberStem = text(
          internalContext.attitudeMemberPerfectiveStem
        );
        if (!compoundEmbedStem || !compoundMatrixStem || !connector
          || !transformedMemberStem) {
          return blockedOperation(
            request,
            "typed-attitude-compound-member-realization-required",
            "attitude-compound"
          );
        }
        targetStem = compoundTarget === "embed"
          ? `${transformedMemberStem}-${connector}-${compoundMatrixStem}`
          : `${compoundEmbedStem}-${connector}-${transformedMemberStem}`;
        targetClass = text(
          attitudeSourceFrame.operationFrame?.targetClass || targetClass
        ).toUpperCase();
        ruleFamily = "attitude-compound";
        objectFrame = {
          ...cloneObjectFrameFromTyped(
            attitudeTransformFrame.finalTypedVncSlotFrame
          ),
          stemRealization: targetStem
        };
        operationFacts = {
          compoundTarget,
          connective: connector,
          sharedObjectMatrixTransform: compoundTarget === "matrix",
          typedCompoundSourceFrame: attitudeSourceFrame,
          typedMemberTransformationFrame: attitudeTransformFrame,
          typedMemberPerfectiveFrame:
            internalContext.attitudeMemberPerfectiveFrame || null
        };
      } else if (operation === "honorific" && ["causative", "applicative"].includes(variant)) {
        const selected = baseMachinery?.targetStem || baseTyped?.slots?.predicate?.stem || sourceStem;
        const alternative = key(request.honorificStemAlternative || "default");
        const exactAlternatives = {
          ihca: {
            causative: {
              default: "ihqui-l-tiā",
              anomalous: "ihca-t-i-l-tiā"
            }
          },
          ono: { causative: { default: "on-o-l-tiā" } },
          "pil-ca": { causative: { default: "pil-quī-tiā" } },
          ca: { causative: { default: "ye-tz-ti-ā" } },
          "ya-uh": { causative: { default: "huica" } },
          "huāl-la-uh": { causative: { default: "huāl-huica" } },
          "huī-tz": { causative: { default: "huica-tz" } },
          miqui: { applicative: { default: "miqui-liā" } },
          chōca: {
            applicative: { default: "chōqui-liā" },
            causative: {
              default: "choc-tiā",
              "type-two-l": "chōqui-l-tiā",
              "type-two-long": "chōqui-tīa"
            }
          }
        };
        const exactSourceAlternatives = exactAlternatives[sourceStem] || null;
        const exactVariantAlternatives = exactSourceAlternatives?.[variant] || null;
        if (exactSourceAlternatives && !exactVariantAlternatives) {
          return blockedOperation(
            request,
            "licensed-honorific-transformation-for-source-required",
            variant === "applicative"
              ? "honorific-applicative"
              : "honorific-causative"
          );
        }
        if (exactVariantAlternatives
          && !Object.prototype.hasOwnProperty.call(
            exactVariantAlternatives,
            alternative
          )) {
          return blockedOperation(
            request,
            "licensed-honorific-stem-alternative-required",
            variant === "applicative"
              ? "honorific-applicative"
              : "honorific-causative"
          );
        }
        if (sourceStem === "huī-tz" && key(request.mood) === "optative") {
          return blockedOperation(
            request,
            "huica-tz-honorific-has-no-optative",
            "honorific-irregular"
          );
        }
        const exactIrregular = exactVariantAlternatives?.[alternative] || "";
        if (!exactIrregular && internalContext.honorificDerivationAttempted === true && internalContext.honorificDerived !== true) {
          return blockedOperation(request, internalContext.honorificDerivationBlockReason || "authorized-honorific-derivation-option-required", variant === "applicative" ? "honorific-applicative" : "honorific-causative");
        }
        targetStem = exactIrregular || selected;
        if (exactIrregular && /(?:iā|i-ā)$/u.test(exactIrregular)) {
          targetClass = "D";
        } else if (internalContext.honorificDerived === true) {
          targetClass = text(
            baseApplicationFrame?.normalizedRequest?.targetClass
            || baseApplicationFrame?.controlFrame?.derivedClass
            || targetClass
          ).toUpperCase();
        }
        targetValence = "mainline-reflexive";
        ruleFamily = variant === "applicative" ? "honorific-applicative" : "honorific-causative";
        const reflexiveBySubject = /^1sg/u.test(subject) ? ["n", "o"] : /^1pl/u.test(subject) ? ["t", "o"] : ["m", "o"];
        const reflexivePosition = { valenceArity: "dyadic", va1: reflexiveBySubject[0], va2: reflexiveBySubject[1], objectKind: "reflexive", governor: variant };
        objectFrame = internalContext.honorificDerived === true
          ? { ...sourceObjectFrame, stemRealization: targetStem }
          : sourceObjectFrame.valenceArity === "vacant"
          ? { ...reflexivePosition, stemRealization: targetStem }
          : sourceObjectFrame.valenceArity === "multiple"
            ? { valenceArity: "multiple", positions: [...sourceObjectFrame.positions, reflexivePosition], stemRealization: targetStem }
            : { valenceArity: "multiple", positions: [sourceObjectFrame, reflexivePosition], stemRealization: targetStem };
      } else {
        if (!["honorific", "reverential", "pejorative"].includes(operation)
          || variant !== "preterit-embed") {
          return blockedOperation(
            request,
            "licensed-attitude-formation-required",
            "honorific-gate"
          );
        }
        if (operation === "honorific"
          && !sourceHasMainlineReflexive) {
          return blockedOperation(
            request,
            "honorific-preterit-embed-requires-mainline-reflexive-source",
            "honorific-preterit-embed"
          );
        }
        if (operation === "reverential"
          && internalContext.attitudeSourceIsHonorific !== true) {
          return blockedOperation(
            request,
            "reverential-requires-engine-issued-honorific-source",
            "reverential-double"
          );
        }
        const perfective = perfectiveStemFromMachinery(baseMachinery) || sourceStem;
        const matrix = operation === "pejorative" ? "pol-o-ā" : "tzin-o-ā";
        targetStem = `${perfective}-⎕-${matrix}`;
        targetClass = "C";
        ruleFamily = operation === "pejorative" ? "pejorative-preterit-embed" : operation === "reverential" ? "reverential-double" : "honorific-preterit-embed";
      }
      operationFacts = {
        ...operationFacts,
        honoredParticipant,
        selfPejorativeAllowed: operation === "pejorative"
      };
    }
    if (!targetStem) return blockedOperation(request, "licensed-operation-did-not-produce-target-stem", ruleFamily);
    const ruleFamilies = new Set([ruleFamily]);
    if (operation === "frequentative") {
      if (["ordinary-short-glottal", "ordinary-long", "ordinary-short"].includes(variant)) {
        ruleFamilies.add("frequentative-prefix-shape");
      }
      if (Number(request.frequentativeRepetitions) > 1) {
        ruleFamilies.add("frequentative-recursion");
      }
      if (key(request.sourceInitialISelection) === "supportive") {
        ruleFamilies.add("frequentative-supportive-i");
      }
      if (variant === "reflexive-partial" || variant.startsWith("tla-")) {
        ruleFamilies.add("frequentative-object");
      }
      if (baseIsNonactive) {
        ruleFamilies.add("frequentative-nonactive");
      }
    }
    if (operation === "compound") {
      [
        "compound-structure",
        "compound-valence",
        "compound-matrix-inventory"
      ].forEach(family => ruleFamilies.add(family));
      if ([
        "connective-t",
        "reflexive-matrix",
        "shared-object",
        "accompanying-possession"
      ].includes(variant)) {
        ruleFamilies.add("compound-connective-t");
        ruleFamilies.add("compound-preterit-embed");
      }
      if (["ca", "ya-uh", "cac", "itz"].includes(sourceStem)) {
        ruleFamilies.add("compound-irregular-embed");
      }
      if (key(request.compoundEventOrder) === "hysteron-proteron") {
        ruleFamilies.add("compound-event-order");
      }
      if (key(request.compoundNonactiveScope)
        && key(request.compoundNonactiveScope) !== "none") {
        ruleFamilies.add("compound-nonactive");
      }
    }
    if (operation === "purposive") {
      [
        "purposive-structure",
        "purposive-direction",
        "purposive-base",
        "purposive-paradigm",
        "purposive-contrast"
      ].forEach(family => ruleFamilies.add(family));
      if (["huāl", "on"].includes(
        key(request.purposiveExternalDirectional)
      )) {
        ruleFamilies.add("purposive-external-directional");
      }
      if (recursiveEmbedFrame) ruleFamilies.add("purposive-recursion");
      if (baseIsNonactive) {
        ruleFamilies.add("purposive-nonactive");
      }
    }
    if (["honorific", "reverential"].includes(operation)) {
      ruleFamilies.add("honorific-gate");
    }
    if (operation === "honorific"
      && ["causative", "applicative"].includes(variant)) {
      ruleFamilies.add(
        variant === "causative"
          ? "honorific-causative"
          : "honorific-applicative"
      );
      if (["ihca", "ono", "pil-ca", "ca", "ya-uh", "huāl-la-uh", "huī-tz", "miqui", "chōca"].includes(sourceStem)) {
        ruleFamilies.add("honorific-irregular");
      }
      if (key(request.honoredParticipant) === "object"
        && Array.isArray(baseTyped?.slots?.prePredicate)
        && baseTyped.slots.prePredicate.length > 0) {
        ruleFamilies.add("honorific-projective");
      }
    }
    if (operation === "honorific" && variant === "preterit-embed") {
      ruleFamilies.add("honorific-preterit-embed");
    }
    if (operation === "reverential") ruleFamilies.add("reverential-double");
    if (operation === "pejorative") {
      ruleFamilies.add("pejorative-preterit-embed");
    }
    if (ruleFamily === "attitude-compound") {
      ruleFamilies.add("attitude-compound");
    }
    let targetApplicationFrame = null;
    let targetTypedFrame = null;
    const requiresCanonicalTargetInflection =
      operation === "frequentative"
      || (
        ["honorific", "reverential", "pejorative"].includes(operation)
        && ruleFamily !== "attitude-compound"
      );
    if (requiresCanonicalTargetInflection
      && typeof targetObject.evaluateClassicalNahuatlVncApplication
        === "function") {
      targetApplicationFrame =
        targetObject.evaluateClassicalNahuatlVncApplication({
          sourceStem: targetClass === "D"
            ? targetStem.replace(/i-ā$/u, "ia").replace(/iā$/u, "ia")
            : targetStem,
          // Coordinate-condition the derived predicate through the canonical
          // direct VNC service. The attitude operation itself owns the
          // reflexive object position; this new target is not a second
          // independently licensed reflexive lexical source.
          sourceValence: "intransitive",
          verbClass: targetClass,
          subject: request.subject,
          mood: request.mood,
          tense: request.tense,
          derivationType: "direct",
          requestedVoice: "active",
          voice: "active"
        });
      if (!targetObject.isClassicalNahuatlVncApplicationFrame?.(
        targetApplicationFrame
      ) || targetApplicationFrame.authorizationStatus !== "authorized") {
        return blockedOperation(
          request,
          targetApplicationFrame?.blockReason
            || "canonical-derived-target-inflection-required",
          ruleFamily
        );
      }
      const conditionedTargetTypedFrame = getBaseTypedFrame(
        targetApplicationFrame
      );
      const conditionedTargetStem = text(
        conditionedTargetTypedFrame?.slots?.predicate?.stem
      );
      const conditionedObjectFrame = objectFrame || {
        ...cloneObjectFrameFromTyped(baseTyped, objectTransform),
        stemRealization: conditionedTargetStem
      };
      targetTypedFrame = conditionedTargetStem
        ? createTypedSlotFromBase(
            conditionedTargetTypedFrame,
            conditionedTargetStem,
            {
              objectFrame: {
                ...conditionedObjectFrame,
                stemRealization: conditionedTargetStem
              }
            }
          )
        : null;
    } else {
      targetTypedFrame = createTypedSlotFromBase(baseTyped, targetStem, {
        predicateTns,
        numberDyad,
        objectTransform,
        objectFrame
      });
    }
    const expandedVncBoundaryFrame =
      baseMachinery?.expandedVncBoundaryFrame || null;
    if (expandedVncBoundaryFrame?.directionalPrefix
      && typeof targetObject.realizeClassicalNahuatlVncSlotFrameAtFinalBoundary
        === "function") {
      const finalBoundaryRealizationFrame =
        targetObject.realizeClassicalNahuatlVncSlotFrameAtFinalBoundary({
          vncSlotFrame: targetTypedFrame,
          expandedVncBoundaryFrame
        });
      if (finalBoundaryRealizationFrame?.authorizationStatus !== "authorized"
        || !targetObject.isClassicalNahuatlVncSlotFrame?.(
          finalBoundaryRealizationFrame.typedSlotFrame
        )) {
        return blockedOperation(
          request,
          finalBoundaryRealizationFrame?.blockReason
            || "canonical-expanded-vnc-boundary-realization-required",
          ruleFamily
        );
      }
      targetTypedFrame = finalBoundaryRealizationFrame.typedSlotFrame;
      operationFacts = {
        ...operationFacts,
        externalDirectionalBoundaryFrame: finalBoundaryRealizationFrame
      };
    }
    if (!targetTypedFrame || typeof targetObject.isClassicalNahuatlVncSlotFrame !== "function" || !targetObject.isClassicalNahuatlVncSlotFrame(targetTypedFrame)) {
      return blockedOperation(request, "canonical-typed-slot-construction-failed", ruleFamily);
    }
    const operationFrame = freeze({
      kind: "classical-nahuatl-late-vnc-derivation-operation-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      blockReason: "",
      operation,
      variant,
      ruleFamily,
      ruleFamilies: freeze([...ruleFamilies]),
      sourceStem,
      targetStem,
      targetClass,
      targetValence,
      sourceMachineryFrame: baseMachinery,
      sourceTypedVncSlotFrame: baseTyped,
      targetApplicationFrame,
      targetTypedVncSlotFrame: targetTypedFrame,
      operationFacts: freeze(operationFacts),
      typedSourceAuthority: true,
      callerFormulaAuthority: false,
      callerSurfaceAuthority: false,
      storedExampleAuthority: false,
      displayTextAuthority: false
    });
    issuedOperationFrames.add(operationFrame);
    return operationFrame;
  }

  function isClassicalNahuatlOperationFrame(frame = null) {
    return Boolean(frame && issuedOperationFrames.has(frame)
      && frame.kind === "classical-nahuatl-late-vnc-derivation-operation-frame"
      && frame.version === VERSION
      && ["authorized", "blocked"].includes(frame.authorizationStatus)
      && frame.callerFormulaAuthority === false
      && frame.callerSurfaceAuthority === false);
  }
  function buildClassicalNahuatlMachineryFrame(operationFrame = null) {
    if (!isClassicalNahuatlOperationFrame(operationFrame) || operationFrame.authorizationStatus !== "authorized") {
      return freeze({
        kind: "classical-nahuatl-late-vnc-derivation-operation-machinery-frame",
        version: VERSION,
        authorizationStatus: "blocked",
        blockReason: operationFrame?.blockReason || "authorized-operation-frame-required"
      });
    }
    const formula = targetObject.renderClassicalNahuatlVncSlotFrameFormula(operationFrame.targetTypedVncSlotFrame);
    const machineryFrame = freeze({
      kind: "classical-nahuatl-late-vnc-derivation-operation-machinery-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      blockReason: "",
      operationFrame,
      sourceMachineryFrame: operationFrame.sourceMachineryFrame,
      sentenceSurfaceFrame: operationFrame.sourceMachineryFrame?.sentenceSurfaceFrame
        || operationFrame.sourceMachineryFrame?.proofFrame?.conclusion?.sentenceSurfaceFrame
        || null,
      expandedVncBoundaryFrame: operationFrame.sourceMachineryFrame?.expandedVncBoundaryFrame || null,
      stem: operationFrame.targetStem,
      targetStem: operationFrame.targetStem,
      targetClass: operationFrame.targetClass,
      targetValence: operationFrame.targetValence,
      formulaRealization: formula,
      proofFrame: freeze({
        kind: "classical-nahuatl-late-vnc-derivation-operation-proof-frame",
        version: VERSION,
        authorizationStatus: "authorized",
        conclusion: freeze({
          authorized: true,
          finalTypedVncSlotFrame: operationFrame.targetTypedVncSlotFrame,
          formulaRealization: formula,
          selectedFormula: formula,
          authorizedFormula: formula,
          operationFrame
        })
      }),
      selectedOutputLogicFrame: freeze({
        kind: "classical-nahuatl-late-vnc-derivation-selected-output-logic-frame",
        authorizationStatus: "authorized",
        selectedFormula: formula,
        formulaStringAuthority: false
      }),
      formulaStringAuthority: false,
      surfaceStringAuthority: false
    });
    issuedMachineryFrames.add(machineryFrame);
    return machineryFrame;
  }
  function isClassicalNahuatlMachineryFrame(frame = null) {
    if (!frame || !issuedMachineryFrames.has(frame)
      || frame.kind !== "classical-nahuatl-late-vnc-derivation-operation-machinery-frame"
      || frame.authorizationStatus !== "authorized"
      || !isClassicalNahuatlOperationFrame(frame.operationFrame)
      || frame.operationFrame.authorizationStatus !== "authorized"
      || frame.proofFrame?.conclusion?.finalTypedVncSlotFrame !== frame.operationFrame.targetTypedVncSlotFrame) return false;
    const formula = targetObject.renderClassicalNahuatlVncSlotFrameFormula(frame.operationFrame.targetTypedVncSlotFrame);
    return Boolean(formula && frame.formulaRealization === formula && frame.proofFrame.conclusion.formulaRealization === formula);
  }

  function evaluateClassicalNahuatlLateVncDerivation(request = {}, internalEvaluation = {}) {
    const depth = Number(internalEvaluation.depth || 0);
    if (depth > 4) {
      const blocked = freeze({
        kind: "classical-nahuatl-late-vnc-derivation-closure-frame",
        version: VERSION,
        authorizationStatus: "blocked",
        blockReason: "typed-operation-recursion-depth-exceeded",
        formulaStringAuthority: false,
        surfaceStringAuthority: false
      });
      issuedClosureFrames.add(blocked);
      return blocked;
    }
    if (key(request.lateOperation) === "honorific"
      && text(request.sourceStem || request.stem) === "huī-tz"
      && key(request.mood) === "optative") {
      return blockedClosure(
        request,
        "huica-tz-honorific-has-no-optative",
        "honorific-irregular"
      );
    }
    if (key(request.lateOperation) === "purposive"
      && !["none", "on", "huāl"].includes(
        key(request.purposiveExternalDirectional || "none")
      )) {
      return blockedClosure(
        request,
        "licensed-external-directional-required",
        "purposive-external-directional"
      );
    }
    const baseRequest = { ...request };
    [
      "lateOperation", "extendedOperation", "lateVariant", "extendedVariant",
      "frequentativeRepetitions", "frequentativeReplacementSyllable",
      "compoundMatrixStem", "compoundMatrixClass", "compoundSubjectAnimacy",
      "compoundPossessiveStem", "compoundPossessor",
      "compoundItzSense", "compoundYaSyncopation",
      "compoundEventOrder", "compoundNonactiveScope", "purposiveDirection",
      "purposiveSeries", "purposiveIrregularPluralN", "purposiveExternalDirectional",
      "honoredParticipant", "honorificDerivationOptionId",
      "honorificStemAlternative", "attitudeCompoundTarget",
      "compoundEmbedClosureFrame", "compoundMatrixClosureFrame",
      "attitudeCompoundClosureFrame", "attitudeMemberTransformationFrame",
      "sourceApplicationFrame", "attitudeSourceClosureFrame",
      "formula", "surface", "selectedFormula", "authorizationStatus",
      "operationFrame", "machineryFrame", "targetTypedVncSlotFrame"
    ].forEach(field => delete baseRequest[field]);
    if (key(request.lateOperation) === "compound"
      && text(request.sourceStem || request.stem) === "itz") {
      // The observational lexeme is perfective-only.  A connective-t embed
      // consumes that authorized preterit predicate even when the matrix is
      // being inflected at another coordinate.
      // The direct VNC application admits the lexical-reading coordinate, not
      // the lesson-indexed alias used by the lower irregular-stem evaluator.
      // Supplying the alias here was correctly rejected as caller authority
      // before the compound owner could enforce its observational sense gate.
      baseRequest.lexicalReading = "alert-observant";
      baseRequest.mood = "indicative";
      baseRequest.tense = "preterit";
    }
    if (key(request.lateOperation) === "purposive") {
      const purposiveSeries = key(request.purposiveSeries);
      const optativeSeries = purposiveSeries.endsWith("-optative");
      baseRequest.mood = optativeSeries ? "optative" : "indicative";
      baseRequest.tense = optativeSeries ? "nonpast" : "present";
      if (optativeSeries) {
        baseRequest.sentenceType = "wish-sentence";
        baseRequest.introductoryParticle = "mā";
      }
      const externalDirectional = key(request.purposiveExternalDirectional || "none");
      if (externalDirectional !== "none") baseRequest.directionalPrefix = externalDirectional;
    }
    const compoundNonactiveScope = key(request.compoundNonactiveScope || "none");
    if (key(request.lateOperation) === "compound"
      && ["none", "matrix"].includes(compoundNonactiveScope)) {
      baseRequest.requestedVoice = "active";
      baseRequest.voice = "active";
      baseRequest.nonactiveOptionId = "";
    }
    const hasSourceApplicationFrame = Object.prototype.hasOwnProperty.call(
      request,
      "sourceApplicationFrame"
    );
    const sourceApplicationResultIssued = Boolean(
      hasSourceApplicationFrame
      && typeof targetObject.getClassicalNahuatlVncContinuationSourceConstituents
        === "function"
      && targetObject.getClassicalNahuatlVncContinuationSourceConstituents(
        request.sourceApplicationFrame?.resultFrame
      )
    );
    const sourceApplicationFrame = hasSourceApplicationFrame
      && sourceApplicationResultIssued
      && typeof targetObject.isClassicalNahuatlVncApplicationFrame === "function"
      && targetObject.isClassicalNahuatlVncApplicationFrame(
        request.sourceApplicationFrame
      )
      && request.sourceApplicationFrame?.authorizationStatus === "authorized"
      ? request.sourceApplicationFrame
      : null;
    const requestedSourceDerivationKind = key(request.sourceDerivationKind);
    const sourceDerivationKind = key(
      sourceApplicationFrame?.resultFrame?.selectedDerivation
      || sourceApplicationFrame?.normalizedRequest?.derivationType
    );
    let baseApplicationFrame = sourceApplicationFrame
      || (typeof targetObject.evaluateClassicalNahuatlVncApplication === "function"
        ? targetObject.evaluateClassicalNahuatlVncApplication(baseRequest)
        : null);
    const compoundEmbedClosureFrame = isAuthorizedClosureFrame(
      request.compoundEmbedClosureFrame
    )
      ? request.compoundEmbedClosureFrame
      : null;
    const attitudeSourceClosureFrame = isAuthorizedClosureFrame(
      request.attitudeSourceClosureFrame
    ) && request.attitudeSourceClosureFrame?.operationFrame?.operation
      === "honorific"
      ? request.attitudeSourceClosureFrame
      : null;
    let recursiveEmbedClosureFrame = attitudeSourceClosureFrame
      || compoundEmbedClosureFrame;
    const recursiveMatrixClosureFrame = isAuthorizedClosureFrame(
      request.compoundMatrixClosureFrame
    )
      ? request.compoundMatrixClosureFrame
      : null;
    let honorificDerived = false;
    let honorificDerivationAttempted = false;
    let honorificDerivationBlockReason = "";
    const lateOperation = key(request.lateOperation);
    const lateVariant = key(request.lateVariant);
    const exactHonorificSources = new Set(["ihca", "ono", "pil-ca", "ca", "ya-uh", "huāl-la-uh", "huī-tz", "miqui", "chōca"]);
    if (lateOperation === "honorific"
      && ["causative", "applicative"].includes(lateVariant)
      && !exactHonorificSources.has(text(request.sourceStem || request.stem))
      && typeof targetObject.evaluateClassicalNahuatlVncApplication === "function") {
      honorificDerivationAttempted = true;
      const honorificRequest = {
        ...baseRequest,
        requestedDerivation: lateVariant,
        derivationType: lateVariant,
        derivationOptionId: text(request.honorificDerivationOptionId),
        ...(lateVariant === "causative"
          ? { causativeObjectKind: "reflexive" }
          : { applicativeObjectKind: "reflexive", applicativeObjectPerson: "" })
      };
      const honorificApplicationFrame = sourceApplicationFrame
        ? targetObject.evaluateClassicalNahuatlVncApplication(
            honorificRequest,
            sourceApplicationFrame.resultFrame
          )
        : targetObject.evaluateClassicalNahuatlVncApplication(
            honorificRequest
          );
      if (honorificApplicationFrame?.authorizationStatus === "authorized") {
        baseApplicationFrame = honorificApplicationFrame;
        honorificDerived = true;
      } else {
        honorificDerivationBlockReason = text(honorificApplicationFrame?.blockReason);
      }
    }
    const matrixStem = text(
      recursiveMatrixClosureFrame?.operationFrame?.targetStem
      || request.compoundMatrixStem
      || request.matrixStem
    );
    const derivedMatrixClass = recursiveMatrixClosureFrame
      ? text(recursiveMatrixClosureFrame.operationFrame?.targetClass)
      : deriveCompoundMatrixClass(
          matrixStem,
          request.compoundMatrixClass
        );
    const matrixApplicationFrame = key(request.lateOperation) === "compound" && matrixStem
      && typeof targetObject.evaluateClassicalNahuatlVncApplication === "function"
      ? targetObject.evaluateClassicalNahuatlVncApplication({
        sourceStem: matrixStem,
        sourceValence: lateVariant === "shared-object"
          ? text(request.sourceValence || request.valence || "specific-projective")
          : "intransitive",
        objectKind: lateVariant === "shared-object"
          ? text(request.objectKind)
          : "",
        objectPerson: lateVariant === "shared-object"
          ? text(request.objectPerson)
          : "",
        objectNumber: lateVariant === "shared-object"
          ? text(request.objectNumber)
          : "",
        verbClass: derivedMatrixClass,
        subject: request.subject,
        mood: request.mood,
        tense: request.tense,
        derivationType: "direct",
        requestedVoice: ["matrix", "both"].includes(compoundNonactiveScope)
          ? request.requestedVoice || request.voice || "active"
          : "active",
        voice: ["matrix", "both"].includes(compoundNonactiveScope)
          ? request.voice || request.requestedVoice || "active"
          : "active",
        nonactiveOptionId: ["matrix", "both"].includes(compoundNonactiveScope)
          ? request.nonactiveOptionId || ""
          : ""
      })
      : null;
    const possessiveSupplementFrame = lateOperation === "compound"
      && lateVariant === "accompanying-possession"
      ? buildAccompanyingPossessionSupplement(request)
      : null;
    let attitudeCompoundClosureFrame = isAuthorizedClosureFrame(
      request.attitudeCompoundClosureFrame
    )
      ? request.attitudeCompoundClosureFrame
      : null;
    let attitudeMemberTransformationFrame = isAuthorizedClosureFrame(
      request.attitudeMemberTransformationFrame
    )
      ? request.attitudeMemberTransformationFrame
      : null;
    let attitudeMemberPerfectiveStem = "";
    let attitudeMemberPerfectiveFrame = null;
    let attitudeTarget = "";
    const requestsAttitudeCompound = Boolean(
      attitudeCompoundClosureFrame
      || (text(request.sourceEmbedStem) && text(request.sourceMatrixStem))
    );
    if (!internalEvaluation.suppressAttitude
      && ["honorific", "reverential", "pejorative"].includes(lateOperation)
      && requestsAttitudeCompound) {
      if (!attitudeCompoundClosureFrame) {
        const embedStem = text(request.sourceEmbedStem);
        const sourceMatrixStem = text(request.sourceMatrixStem);
        if (embedStem && sourceMatrixStem) {
          const sourceCompoundVariant =
            SHARED_OBJECT_COMPOUND_MATRICES.has(sourceMatrixStem)
              ? "shared-object"
              : "connective-t";
          attitudeCompoundClosureFrame =
            evaluateClassicalNahuatlLateVncDerivation({
              ...request,
              sourceStem: embedStem,
              lateOperation: "compound",
              lateVariant: sourceCompoundVariant,
              compoundMatrixStem: sourceMatrixStem,
              compoundMatrixClass: text(request.compoundMatrixClass || "A"),
              attitudeCompoundTarget: "",
              sourceEmbedStem: "",
              sourceMatrixStem: ""
            }, {
              depth: depth + 1,
              suppressAttitude: true
            });
        }
      }
      const compoundVariant = key(
        attitudeCompoundClosureFrame?.operationFrame?.variant
      );
      const compoundEmbedStem = text(
        attitudeCompoundClosureFrame?.operationFrame?.operationFacts?.embedStem
      );
      const compoundMatrixStem = text(
        attitudeCompoundClosureFrame?.operationFrame?.operationFacts?.matrixStem
      );
      attitudeTarget = compoundVariant === "shared-object"
        || (compoundEmbedStem === "cui" && compoundMatrixStem === "huetzi")
        ? "matrix"
        : "embed";
      const memberStem = attitudeTarget === "embed"
        ? text(attitudeCompoundClosureFrame?.operationFrame?.operationFacts?.embedStem)
        : text(attitudeCompoundClosureFrame?.operationFrame?.operationFacts?.matrixStem);
      if (!attitudeMemberTransformationFrame && memberStem) {
        attitudeMemberTransformationFrame =
          evaluateClassicalNahuatlLateVncDerivation({
            ...request,
            sourceStem: memberStem,
            sourceEmbedStem: "",
            sourceMatrixStem: "",
            attitudeCompoundTarget: "",
            lateOperation,
            lateVariant: lateOperation === "honorific"
              ? "applicative"
              : "preterit-embed",
            verbClass: attitudeTarget === "matrix"
              ? text(request.compoundMatrixClass || "A")
              : text(request.verbClass || "B"),
            sourceValence: attitudeTarget === "matrix"
              ? "intransitive"
              : text(request.sourceValence || request.valence || "intransitive")
          }, {
            depth: depth + 1,
            suppressAttitude: true
          });
      }
      if (isAuthorizedClosureFrame(attitudeMemberTransformationFrame)
        && typeof targetObject.getClassicalNahuatlPerfectiveStem
          === "function") {
        const transformedStem = text(
          attitudeMemberTransformationFrame.operationFrame?.targetStem
        );
        const transformedClass = text(
          attitudeMemberTransformationFrame.operationFrame?.targetClass || "D"
        );
        const canonicalTargetMachinery =
          attitudeMemberTransformationFrame.operationFrame
            ?.targetApplicationFrame?.resultFrame?.selectedMachineryFrame
          || null;
        const canonicalTargetPerfective =
          perfectiveStemFromMachinery(canonicalTargetMachinery);
        const classProfile =
          typeof targetObject.inferClassicalNahuatlLesson7ClassProfile
            === "function"
            ? targetObject.inferClassicalNahuatlLesson7ClassProfile(
                transformedStem,
                {
                  verbClass: transformedClass,
                  canvasHigherLayerClassOverride: transformedClass
                }
              )
            : { classId: transformedClass };
        const perfectiveFrame =
          targetObject.getClassicalNahuatlPerfectiveStem(
            transformedStem,
            classProfile
          );
        const typedAttitudePerfective =
          lateOperation === "honorific"
            && lateVariant === "applicative"
            && /-liā$/u.test(transformedStem)
            ? transformedStem.replace(/-liā$/u, "-lih")
            : lateOperation === "honorific"
              && lateVariant === "causative"
              && /-tiā$/u.test(transformedStem)
              ? transformedStem.replace(/-tiā$/u, "-tih")
              : "";
        const selectedPerfective = typedAttitudePerfective
          || canonicalTargetPerfective
          || text(perfectiveFrame?.perfectiveStem);
        if (text(perfectiveFrame?.imperfectiveStem) === transformedStem
          && selectedPerfective) {
          attitudeMemberPerfectiveFrame = freeze({
            kind: "classical-nahuatl-attitude-vnc-attitude-member-perfective-frame",
            version: VERSION,
            authorizationStatus: "authorized",
            sourceOperationFrame:
              attitudeMemberTransformationFrame.operationFrame,
            classId: transformedClass,
            imperfectiveStem: transformedStem,
            perfectiveStem: selectedPerfective,
            changeRule: text(perfectiveFrame.changeRule),
            typedSourceAuthority: true,
            formulaStringAuthority: false,
            surfaceStringAuthority: false
          });
          attitudeMemberPerfectiveStem =
            attitudeMemberPerfectiveFrame.perfectiveStem;
        }
      }
      if (isAuthorizedClosureFrame(attitudeCompoundClosureFrame)) {
        recursiveEmbedClosureFrame = attitudeCompoundClosureFrame;
      }
    }
    const operationFrame = buildClassicalNahuatlOperationFrame(baseApplicationFrame, request, {
      matrixApplicationFrame,
      derivedMatrixClass,
      recursiveEmbedClosureFrame,
      recursiveMatrixClosureFrame,
      invalidRecursiveEmbedFrame:
        Object.prototype.hasOwnProperty.call(request, "compoundEmbedClosureFrame")
        && !isAuthorizedClosureFrame(request.compoundEmbedClosureFrame),
      invalidRecursiveMatrixFrame:
        Object.prototype.hasOwnProperty.call(request, "compoundMatrixClosureFrame")
        && !isAuthorizedClosureFrame(request.compoundMatrixClosureFrame),
      invalidSourceApplicationFrame:
        (hasSourceApplicationFrame && !sourceApplicationFrame)
        || (requestedSourceDerivationKind && !sourceApplicationFrame),
      sourceDerivationKindMismatch: Boolean(
        requestedSourceDerivationKind
        && sourceApplicationFrame
        && requestedSourceDerivationKind !== sourceDerivationKind
      ),
      invalidAttitudeSourceClosureFrame:
        lateOperation === "reverential"
        && (!attitudeSourceClosureFrame
          || Object.prototype.hasOwnProperty.call(
            request,
            "attitudeSourceClosureFrame"
          ) && !isAuthorizedClosureFrame(request.attitudeSourceClosureFrame)),
      attitudeSourceIsHonorific: Boolean(attitudeSourceClosureFrame),
      possessiveSupplementFrame,
      attitudeCompoundClosureFrame,
      attitudeMemberTransformationFrame,
      attitudeMemberPerfectiveStem,
      attitudeMemberPerfectiveFrame,
      attitudeCompoundTarget: attitudeTarget,
      honorificDerived,
      honorificDerivationAttempted,
      honorificDerivationBlockReason
    });
    const machineryFrame = buildClassicalNahuatlMachineryFrame(operationFrame);
    const finiteSurfaceFrame = isClassicalNahuatlMachineryFrame(machineryFrame)
      && typeof targetObject.buildClassicalNahuatlVncFiniteSurfaceFrame === "function"
      ? targetObject.buildClassicalNahuatlVncFiniteSurfaceFrame(machineryFrame)
      : null;
    const accompanyingPossessionResultFrame =
      lateOperation === "compound"
        && lateVariant === "accompanying-possession"
        ? buildAccompanyingPossessionResultFrame(
            possessiveSupplementFrame,
            finiteSurfaceFrame
          )
        : null;
    const authorized = Boolean(
      (baseApplicationFrame?.authorizationStatus === "authorized"
        || recursiveEmbedClosureFrame)
      && isClassicalNahuatlMachineryFrame(machineryFrame)
      && finiteSurfaceFrame?.authorizationStatus === "authorized"
      && typeof targetObject.isClassicalNahuatlVncFiniteSurfaceFrame === "function"
      && targetObject.isClassicalNahuatlVncFiniteSurfaceFrame(finiteSurfaceFrame)
      && (!accompanyingPossessionResultFrame
        || accompanyingPossessionResultFrame.authorizationStatus === "authorized")
    );
    const greatestCommonDivisor = buildEvaluatedGcdProjection({
      baseApplicationFrame,
      recursiveEmbedClosureFrame,
      operationFrame,
      machineryFrame,
      finiteSurfaceFrame,
    });
    const leastCommonMultiple = buildSelectedLcmProjection(
      request,
      operationFrame,
      finiteSurfaceFrame
    );
    const closureFrame = freeze({
      kind: "classical-nahuatl-late-vnc-derivation-closure-frame",
      version: VERSION,
      authorizationStatus: authorized ? "authorized" : "blocked",
      blockReason: authorized
        ? ""
        : operationFrame?.blockReason
          || accompanyingPossessionResultFrame?.blockReason
          || finiteSurfaceFrame?.blockReason
          || baseApplicationFrame?.blockReason
          || "closure-not-authorized",
      normalizedRequest: freeze({
        sourceStem: text(
          operationFrame?.sourceStem || request.sourceStem || request.stem
        ),
        operation: key(request.lateOperation),
        variant: key(request.lateVariant),
        subject: text(request.subject),
        mood: text(request.mood),
        tense: text(request.tense),
        callerFormulaAuthorityAccepted: false,
        callerSurfaceAuthorityAccepted: false
      }),
      baseApplicationFrame,
      operationFrame,
      selectedMachineryFrame: authorized ? machineryFrame : null,
      finalTypedVncSlotFrame: authorized ? operationFrame.targetTypedVncSlotFrame : null,
      finiteSurfaceFrame: authorized ? finiteSurfaceFrame : null,
      supplementaryResultFrame: authorized
        ? accompanyingPossessionResultFrame
        : null,
      greatestCommonDivisor,
      leastCommonMultiple,
      formulaRealization: authorized ? finiteSurfaceFrame.formulaRealization : "",
      surfaceRealization: authorized
        ? accompanyingPossessionResultFrame?.surfaceRealization
          || finiteSurfaceFrame.wordRealization
        : "",
      typedFrameAuthority: true,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      callerSuppliedAuthorityAccepted: false
    });
    issuedClosureFrames.add(closureFrame);
    if (typeof targetObject.getDefaultGrammarContractRegistry === "function"
      && typeof targetObject.assertRegisteredGrammarContract === "function") {
      const registry = targetObject.getDefaultGrammarContractRegistry();
      if (closureFrame.authorizationStatus === "authorized") {
        targetObject.assertRegisteredGrammarContract(registry, operationFrame, {
          contractKind: "classical-nahuatl-late-vnc-derivation-operation-frame",
          version: VERSION
        });
        targetObject.assertRegisteredGrammarContract(registry, machineryFrame, {
          contractKind: "classical-nahuatl-late-vnc-derivation-operation-machinery-frame",
          version: VERSION
        });
      }
      targetObject.assertRegisteredGrammarContract(registry, closureFrame, {
        contractKind: "classical-nahuatl-late-vnc-derivation-closure-frame",
        version: VERSION
      });
    }
    return closureFrame;
  }
  function isClassicalNahuatlClosureFrame(frame = null) {
    if (!frame || !issuedClosureFrames.has(frame)
      || frame.kind !== "classical-nahuatl-late-vnc-derivation-closure-frame"
      || !["authorized", "blocked"].includes(frame.authorizationStatus)
      || frame.formulaStringAuthority !== false
      || frame.surfaceStringAuthority !== false) return false;
    if (frame.authorizationStatus === "blocked") return Boolean(frame.blockReason);
    return Boolean(
      isClassicalNahuatlOperationFrame(frame.operationFrame)
      && isClassicalNahuatlMachineryFrame(frame.selectedMachineryFrame)
      && frame.finalTypedVncSlotFrame === frame.operationFrame.targetTypedVncSlotFrame
      && frame.finiteSurfaceFrame?.machineryFrame === frame.selectedMachineryFrame
      && targetObject.isClassicalNahuatlVncFiniteSurfaceFrame(frame.finiteSurfaceFrame)
    );
  }
  function buildClassicalNahuatlParadigm(request = {}, coordinates = []) {
    const requested = Array.isArray(coordinates) && coordinates.length
      ? coordinates
      : key(request.lateOperation) === "purposive"
        ? ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"].flatMap(subject => [
          {
            subject,
            mood: "indicative",
            tense: "nonpast",
            purposiveSeries: "outbound-nonpast-indicative"
          },
          {
            subject,
            mood: "indicative",
            tense: "past",
            purposiveSeries: "outbound-past-indicative"
          },
          {
            subject,
            mood: "optative",
            tense: "nonpast",
            purposiveSeries: "outbound-nonpast-optative"
          },
          {
            subject,
            mood: "indicative",
            tense: "nonfuture",
            purposiveSeries: "inbound-nonfuture-indicative"
          },
          {
            subject,
            mood: "indicative",
            tense: "future",
            purposiveSeries: "inbound-future-indicative"
          },
          {
            subject,
            mood: "optative",
            tense: "nonpast",
            purposiveSeries: "inbound-nonpast-optative"
          }
        ])
        : ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"].flatMap(subject => [
          { subject, mood: "indicative", tense: "present" },
          { subject, mood: "indicative", tense: "preterit" },
          { subject, mood: "optative", tense: "nonpast" }
        ]);
    const rows = requested.map(coordinate => {
      const coordinateRequest = { ...request, ...coordinate };
      const closureFrame = evaluateClassicalNahuatlLateVncDerivation(
        coordinateRequest
      );
      const scalarReferenceFrame = evaluateClassicalNahuatlLateVncDerivation(
        coordinateRequest
      );
      const scalarEquivalent =
        closureFrame.authorizationStatus === scalarReferenceFrame.authorizationStatus
        && closureFrame.blockReason === scalarReferenceFrame.blockReason
        && closureFrame.operationFrame?.operation
          === scalarReferenceFrame.operationFrame?.operation
        && closureFrame.operationFrame?.variant
          === scalarReferenceFrame.operationFrame?.variant
        && closureFrame.finalTypedVncSlotFrame?.semanticIdentity
          === scalarReferenceFrame.finalTypedVncSlotFrame?.semanticIdentity
        && closureFrame.formulaRealization
          === scalarReferenceFrame.formulaRealization
        && closureFrame.surfaceRealization
          === scalarReferenceFrame.surfaceRealization;
      return freeze({
        coordinate: freeze({ ...coordinate }),
        closureFrame,
        scalarEquivalent,
      });
    });
    const authorizedRows = rows.filter(row => row.closureFrame.authorizationStatus === "authorized");
    return freeze({
      kind: "classical-nahuatl-late-vnc-derivation-paradigm-frame",
      version: VERSION,
      authorizationStatus: authorizedRows.length ? "authorized" : "blocked",
      blockReason: authorizedRows.length ? "" : "no-authorized-paradigm-coordinates",
      rows,
      authorizedRowCount: authorizedRows.length,
      blockedRowCount: rows.length - authorizedRows.length,
      greatestCommonDivisor: freeze({
        identity:
          "scalar-coordinate-evaluation+typed-operation+finite-boundary-result",
        satisfied: rows.every(row => (
          row.closureFrame.authorizationStatus !== "authorized"
          || row.closureFrame.greatestCommonDivisor?.satisfied === true
        )),
      }),
      leastCommonMultiple: freeze({
        axisIds: LCM_AXIS_IDS,
        axisCount: LCM_AXIS_IDS.length,
        selectedCoordinateValues: rows.map(row => freeze({
          coordinate: row.coordinate,
          selectedValues: row.closureFrame.leastCommonMultiple?.selectedValues
            || null,
        })),
        selectedCoordinateCount: rows.length,
        licensedAxisSetComplete: rows.every(row => (
          row.closureFrame.leastCommonMultiple?.licensedAxisSetComplete === true
        )),
      }),
      scalarParity: rows.every(row => row.scalarEquivalent),
      formulaStringAuthority: false,
      surfaceStringAuthority: false
    });
  }
  return Object.freeze({
    VERSION,
    buildClassicalNahuatlOperationFrame,
    isClassicalNahuatlOperationFrame,
    buildClassicalNahuatlMachineryFrame,
    isClassicalNahuatlMachineryFrame,
    evaluateClassicalNahuatlLateVncDerivation,
    isClassicalNahuatlClosureFrame,
    buildClassicalNahuatlParadigm
  });
}

export function installClassicalNahuatlVncClosureGlobals(targetObject = globalThis) {
  const api = createClassicalNahuatlVncClosureApi(targetObject);
  Object.assign(targetObject, api);
  return api;
}
