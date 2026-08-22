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
  const issuedSourceAgreementFrames = new WeakSet();
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
  const HONORIFIC_PRODUCTIVE_FORMATIONS = Object.freeze([
    "causative",
    "applicative",
  ]);
  const HONORIFIC_DOCUMENTED_LEXICAL_REALIZATIONS = Object.freeze({
    ihca: Object.freeze({
      causative: Object.freeze({
        default: Object.freeze({
          targetStem: "ihqui-l-tiā",
          realizationKind: "irregular",
        }),
        anomalous: Object.freeze({
          targetStem: "ihca-t-i-l-tiā",
          realizationKind: "documented-alternative",
        }),
      }),
    }),
    ono: Object.freeze({
      causative: Object.freeze({
        default: Object.freeze({
          targetStem: "on-o-l-tiā",
          realizationKind: "connective-t-preferred",
        }),
      }),
    }),
    "pil-ca": Object.freeze({
      causative: Object.freeze({
        default: Object.freeze({
          targetStem: "pil-quī-tiā",
          realizationKind: "irregular",
        }),
      }),
    }),
    ca: Object.freeze({
      causative: Object.freeze({
        default: Object.freeze({
          targetStem: "ye-tz-ti-ā",
          realizationKind: "suppletive",
        }),
      }),
    }),
    "ya-uh": Object.freeze({
      causative: Object.freeze({
        default: Object.freeze({
          targetStem: "huica",
          realizationKind: "suppletive",
        }),
      }),
    }),
    "huāl-la-uh": Object.freeze({
      causative: Object.freeze({
        default: Object.freeze({
          targetStem: "huāl-huica",
          realizationKind: "suppletive",
        }),
      }),
    }),
    "huī-tz": Object.freeze({
      causative: Object.freeze({
        default: Object.freeze({
          targetStem: "huica-tz",
          realizationKind: "suppletive",
          moodRestriction: "no-optative",
        }),
      }),
    }),
    miqui: Object.freeze({
      applicative: Object.freeze({
        default: Object.freeze({
          targetStem: "miqui-liā",
          realizationKind: "honorific-only-applicative",
          honorificOnly: true,
        }),
      }),
    }),
    chōca: Object.freeze({
      applicative: Object.freeze({
        default: Object.freeze({
          targetStem: "chōqui-liā",
          realizationKind: "preferred-applicative",
        }),
      }),
      causative: Object.freeze({
        default: Object.freeze({
          targetStem: "choc-tiā",
          realizationKind: "type-one",
        }),
        "type-two-l": Object.freeze({
          targetStem: "chōqui-l-tiā",
          realizationKind: "type-two-l",
        }),
        "type-two-long": Object.freeze({
          targetStem: "chōqui-tīa",
          realizationKind: "type-two-long",
        }),
      }),
    }),
    caqui: Object.freeze({
      causative: Object.freeze({
        default: Object.freeze({
          targetStem: "caqui-tīā",
          realizationKind: "documented-honorific-causative",
        }),
        "l-causative": Object.freeze({
          targetStem: "caqui-l-tiā",
          realizationKind: "documented-honorific-alternative",
        }),
      }),
    }),
    nequi: Object.freeze({
      causative: Object.freeze({
        default: Object.freeze({
          targetStem: "nequi-l-tiā",
          realizationKind: "documented-honorific-causative",
        }),
      }),
    }),
    cuepa: Object.freeze({
      applicative: Object.freeze({
        default: Object.freeze({
          targetStem: "cuep-i-liā",
          realizationKind: "documented-honorific-applicative",
        }),
      }),
      causative: Object.freeze({
        default: Object.freeze({
          targetStem: "cuep-i-l-tiā",
          realizationKind: "documented-honorific-causative",
        }),
      }),
    }),
  });

  function normalizeHonorificFormationAlternatives(
    alternatives = null,
    formation = "",
  ) {
    const records = Array.isArray(alternatives?.[formation])
      ? alternatives[formation]
      : [];
    const normalized = records.map((record) => freeze({
      optionId: key(record?.optionId || record?.id || "default"),
      targetStem: text(record?.targetStem),
      realizationKind: key(record?.realizationKind || "typed-lexical"),
      moodRestriction: key(record?.moodRestriction),
      honorificOnly: record?.honorificOnly === true,
    }));
    const ids = normalized.map(record => record.optionId);
    return normalized.length
      && normalized.every(record => record.optionId && record.targetStem)
      && new Set(ids).size === ids.length
      ? normalized
      : records.length
        ? null
        : [];
  }

  function buildHonorificFormationAnalysisFrame(request = {}, sourceStem = "") {
    const normalizedSourceStem = text(sourceStem);
    const selectedFormation = key(request.lateVariant);
    const supplied = request.honorificFormationAnalysis;
    const hasSuppliedAnalysis = Boolean(
      supplied && typeof supplied === "object" && !Array.isArray(supplied)
    );
    const suppliedFormations = hasSuppliedAnalysis
      ? [...new Set(
          (Array.isArray(supplied.availableFormations)
            ? supplied.availableFormations
            : [])
            .map(key)
            .filter(Boolean),
        )]
      : [];
    const preferredFormation = key(supplied?.preferredFormation);
    const suppliedSourceStem = text(supplied?.sourceStem);
    const suppliedAlternatives = Object.fromEntries(
      HONORIFIC_PRODUCTIVE_FORMATIONS.map(formation => [
        formation,
        normalizeHonorificFormationAlternatives(
          supplied?.formationAlternatives,
          formation,
        ),
      ]),
    );
    const invalid = hasSuppliedAnalysis && (
      key(supplied.lexicalStatus) !== "honorific-formation-analysis"
      || suppliedSourceStem !== normalizedSourceStem
      || suppliedFormations.length < 1
      || suppliedFormations.some(formation => (
        !HONORIFIC_PRODUCTIVE_FORMATIONS.includes(formation)
      ))
      || (preferredFormation && !suppliedFormations.includes(preferredFormation))
      || Object.values(suppliedAlternatives).some(value => value === null)
    );
    if (invalid) {
      return freeze({
        kind: "classical-nahuatl-honorific-formation-analysis-frame",
        authorizationStatus: "blocked",
        blockReason: "valid-matching-honorific-formation-analysis-required",
        sourceStem: normalizedSourceStem,
        availableFormations: freeze([]),
        selectedFormation,
        typedSourceAuthority: true,
        canvasExampleAuthority: false,
      });
    }
    const availableFormations = hasSuppliedAnalysis
      ? suppliedFormations
      : selectedFormation
        ? [selectedFormation]
        : [];
    const documented = HONORIFIC_DOCUMENTED_LEXICAL_REALIZATIONS[
      normalizedSourceStem
    ] || null;
    const documentedOptions = documented?.[selectedFormation] || null;
    const typedOptions = suppliedAlternatives[selectedFormation] || [];
    const options = typedOptions.length
      ? typedOptions
      : Object.entries(documentedOptions || {}).map(([optionId, record]) => (
          freeze({ optionId, ...record })
        ));
    const selectedOptionId = key(request.honorificStemAlternative || "default");
    const selectedOption = options.find(option => (
      option.optionId === selectedOptionId
    )) || null;
    const selectionLicensed = !options.length || Boolean(selectedOption);
    const selectedFormationLicensed = availableFormations.includes(
      selectedFormation,
    );
    return freeze({
      kind: "classical-nahuatl-honorific-formation-analysis-frame",
      authorizationStatus: "authorized",
      blockReason: "",
      lexicalStatus: hasSuppliedAnalysis
        ? "honorific-formation-analysis"
        : "legacy-selected-formation-compatibility",
      sourceStem: normalizedSourceStem,
      availableFormations: freeze(availableFormations),
      selectedFormation,
      selectedFormationLicensed,
      preferredFormation,
      routeChoiceRequired: availableFormations.length > 1,
      formationAutomaticallySelected: availableFormations.length === 1,
      analysisSupplied: hasSuppliedAnalysis,
      selectionSource: hasSuppliedAnalysis
        ? "typed-source-analysis"
        : "selected-route-backward-compatibility",
      formationOptions: freeze(options),
      selectedOptionId,
      selectedOption,
      alternativeChoiceRequired: options.length > 1,
      selectionLicensed,
      honorificOnlyApplicative: Boolean(
        supplied?.honorificOnlyApplicative === true
        || selectedOption?.honorificOnly === true
      ),
      moodRestriction: key(
        selectedOption?.moodRestriction || supplied?.moodRestriction,
      ),
      documentedLexicalRealizationUsed: Boolean(
        selectedOption && !typedOptions.length
      ),
      typedSourceAuthority: true,
      canonicalDerivationAuthority: !selectedOption,
      canvasExampleAuthority: false,
      callerFormulaAuthority: false,
      callerSurfaceAuthority: false,
    });
  }

  function buildCompoundLexicalizationAnalysisFrame(
    request = {},
    sourceEmbedStem = "",
    sourceMatrixStem = "",
  ) {
    const embedStem = text(sourceEmbedStem);
    const matrixStem = text(sourceMatrixStem);
    const supplied = request.compoundLexicalizationAnalysis;
    const hasSuppliedAnalysis = Boolean(
      supplied && typeof supplied === "object" && !Array.isArray(supplied)
    );
    if (!hasSuppliedAnalysis) {
      return freeze({
        kind: "classical-nahuatl-compound-verbstem-lexicalization-analysis-frame",
        version: VERSION,
        authorizationStatus: "authorized",
        blockReason: "",
        sourceEmbedStem: embedStem,
        sourceMatrixStem: matrixStem,
        availableStructures: freeze(["compositional"]),
        selectedStructure: "compositional",
        structureChoiceRequired: false,
        structureAutomaticallySelected: true,
        analysisSupplied: false,
        lexicalMeaningTyped: false,
        exactExampleIdentityAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
      });
    }
    const availableStructures = [...new Set(
      (Array.isArray(supplied.availableStructures)
        ? supplied.availableStructures
        : [supplied.selectedStructure]
      ).map(key).filter(Boolean)
    )];
    const selectedStructure = key(
      supplied.selectedStructure
      || (availableStructures.length === 1 ? availableStructures[0] : "")
    );
    const invalid = key(supplied.lexicalStatus)
        !== "compound-verbstem-lexicalization-analysis"
      || text(supplied.sourceEmbedStem) !== embedStem
      || text(supplied.sourceMatrixStem) !== matrixStem
      || availableStructures.length < 1
      || availableStructures.some(structure => ![
        "compositional", "lexicalized"
      ].includes(structure))
      || (selectedStructure
        && !availableStructures.includes(selectedStructure));
    if (invalid) {
      return freeze({
        kind: "classical-nahuatl-compound-verbstem-lexicalization-analysis-frame",
        version: VERSION,
        authorizationStatus: "blocked",
        blockReason: "valid-matching-compound-lexicalization-analysis-required",
        sourceEmbedStem: embedStem,
        sourceMatrixStem: matrixStem,
        availableStructures: freeze([]),
        selectedStructure: "",
        typedSourceAuthority: true,
        exactExampleIdentityAuthority: false,
      });
    }
    if (availableStructures.length > 1 && !selectedStructure) {
      return freeze({
        kind: "classical-nahuatl-compound-verbstem-lexicalization-analysis-frame",
        version: VERSION,
        authorizationStatus: "blocked",
        blockReason: "compound-lexicalization-analysis-choice-required",
        sourceEmbedStem: embedStem,
        sourceMatrixStem: matrixStem,
        availableStructures: freeze(availableStructures),
        selectedStructure: "",
        structureChoiceRequired: true,
        typedSourceAuthority: true,
        exactExampleIdentityAuthority: false,
      });
    }
    return freeze({
      kind: "classical-nahuatl-compound-verbstem-lexicalization-analysis-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      blockReason: "",
      sourceEmbedStem: embedStem,
      sourceMatrixStem: matrixStem,
      availableStructures: freeze(availableStructures),
      selectedStructure,
      structureChoiceRequired: availableStructures.length > 1,
      structureAutomaticallySelected: availableStructures.length === 1,
      analysisSupplied: true,
      lexicalMeaningTyped: selectedStructure === "lexicalized",
      lexicalMeaningId: text(supplied.lexicalMeaningId),
      exactExampleIdentityAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
  }

  function buildClassicalNahuatlLateSourceAgreementFrame(
    sourceStem = "",
    { verbClass = "", sourceValence = "" } = {}
  ) {
    const normalizedStem = text(sourceStem);
    const normalizedClass = text(verbClass).toUpperCase();
    const normalizedValence = text(sourceValence);
    const sourceIdentityFrame =
      typeof targetObject.buildClassicalNahuatlActiveStemIdentityFrame
        === "function"
        ? targetObject.buildClassicalNahuatlActiveStemIdentityFrame(
            normalizedStem,
            {
              verbClass: normalizedClass,
              sourceValence: normalizedValence,
            }
          )
        : null;
    const morphemicSourceProfile =
      sourceIdentityFrame?.internalMorphology?.morphemicSourceProfile || null;
    const authorized = Boolean(
      sourceIdentityFrame?.authorizationStatus === "authorized"
      && sourceIdentityFrame.enteredStem === normalizedStem
      && morphemicSourceProfile?.authorizationStatus === "authorized"
      && morphemicSourceProfile.sourceStem === normalizedStem
      && morphemicSourceProfile.sourceClass === normalizedClass
      && morphemicSourceProfile.sourceValence === normalizedValence
    );
    const frame = freeze({
      kind: "classical-nahuatl-late-vnc-source-agreement-frame",
      version: VERSION,
      authorizationStatus: authorized ? "authorized" : "blocked",
      blockReason: authorized
        ? ""
        : "typed-morphemic-source-profile-disagrees-with-late-source",
      sourceStem: normalizedStem,
      sourceClass: normalizedClass,
      sourceValence: normalizedValence,
      sourceIdentityFrame: authorized ? sourceIdentityFrame : null,
      morphemicSourceProfile: authorized ? morphemicSourceProfile : null,
      canvasExampleAuthority: false,
      callerFormulaAuthority: false,
      callerSurfaceAuthority: false,
    });
    issuedSourceAgreementFrames.add(frame);
    return frame;
  }

  function isClassicalNahuatlLateSourceAgreementFrame(frame = null) {
    if (!frame || !issuedSourceAgreementFrames.has(frame)) return false;
    if (frame.authorizationStatus === "blocked") {
      return Boolean(frame.blockReason);
    }
    return Boolean(
      frame.kind === "classical-nahuatl-late-vnc-source-agreement-frame"
      && frame.version === VERSION
      && frame.authorizationStatus === "authorized"
      && frame.morphemicSourceProfile?.sourceStem === frame.sourceStem
      && frame.morphemicSourceProfile?.sourceClass === frame.sourceClass
      && frame.morphemicSourceProfile?.sourceValence === frame.sourceValence
      && frame.sourceIdentityFrame?.internalMorphology
        ?.morphemicSourceProfile === frame.morphemicSourceProfile
      && frame.canvasExampleAuthority === false
    );
  }

  function analyzeRecursiveCompoundHierarchy(
    embedClosureFrame = null,
    matrixClosureFrame = null
  ) {
    const seen = new Set();
    const active = new Set();
    let maximumDepth = 0;
    let circular = false;
    let reused = false;
    function visit(frame, depth = 1) {
      if (!frame) return;
      maximumDepth = Math.max(maximumDepth, depth);
      if (active.has(frame)) {
        circular = true;
        return;
      }
      if (seen.has(frame)) {
        reused = true;
        return;
      }
      seen.add(frame);
      active.add(frame);
      const facts = frame.operationFrame?.operationFacts || {};
      visit(facts.recursiveEmbedFrame, depth + 1);
      visit(facts.recursiveMatrixFrame, depth + 1);
      active.delete(frame);
    }
    visit(embedClosureFrame);
    visit(matrixClosureFrame);
    return freeze({
      authorizationStatus: circular || reused ? "blocked" : "authorized",
      blockReason: circular
        ? "recursive-compound-hierarchy-must-be-acyclic"
        : reused
          ? "recursive-compound-requires-distinct-embed-and-matrix-results"
          : "",
      acyclic: !circular,
      distinctConstituents: !reused,
      maximumDepth,
      capturedResultCount: seen.size,
    });
  }

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
  const FREQUENTATIVE_SCOPES = Object.freeze([
    "open",
    "action",
    "agent",
    "patient",
    "occasion",
    "place",
  ]);
  const FREQUENTATIVE_TARGETS = Object.freeze([
    "lexical-stem",
    "fused-tla",
    "fused-tla-and-lexical-stem",
    "mainline-reflexive",
  ]);
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
  function parseIntransitiveDestockal(sourceStem = "") {
    const match = text(sourceStem).match(
      /^(.*?)([aāeēiīoō])(-?)(ni|hui)$/u,
    );
    if (!match) return null;
    const [, beforeStockVowel, stockVowel, boundary, sourceSuffix] = match;
    const reducedStockVowel = shortVowel(stockVowel);
    return freeze({
      sourceSuffix,
      stockVowel,
      reducedStockVowel,
      targetSuffix: "ca",
      targetCore: `${beforeStockVowel}${reducedStockVowel}${boundary}ca`,
    });
  }
  function parseCausativeDestockal(sourceStem = "") {
    const match = text(sourceStem).match(
      /^(.*?)([aāeēiīoō])(-?)(n-a|na|ni-ā|niā|hu-a|hua)$/u,
    );
    if (!match) return null;
    const [, beforeStockVowel, stockVowel, boundary, sourceSuffix] = match;
    const reducedStockVowel = shortVowel(stockVowel);
    return freeze({
      sourceSuffix,
      stockVowel,
      reducedStockVowel,
      retainedCausativeVowel: "a",
      targetSuffix: "tz-a",
      targetCore: `${beforeStockVowel}${reducedStockVowel}${boundary}tz-a`,
    });
  }
  function parseCompletedLexicalizedDestockal(sourceStem = "") {
    const stem = text(sourceStem).replace(/^\((.*)\)$/u, "$1");
    const causativeMatch = stem.match(/(?:tz-a|tza)$/u);
    const intransitiveMatch = stem.match(/ca$/u);
    if (!causativeMatch && !intransitiveMatch) return null;
    return freeze({
      targetStem: stem,
      targetClass: causativeMatch ? "B" : "A",
      structuralForce: causativeMatch ? "causative-or-applicative" : "intransitive",
      tzAUnit: causativeMatch?.[0] || "",
      fusedLongVowel: stem.match(/[āēīō]/u)?.[0] || "",
    });
  }
  function deriveUncertainCaStem(sourceRoot = "", role = "intransitive") {
    const root = text(sourceRoot).replace(/^\((.*)\)$/u, "$1");
    if (!root || !new RegExp(`[${vowels}]`, "u").test(root)) return null;
    const parts = getReduplicationParts(root);
    if (!parts.vowel) return null;
    const copiedPrefix = `${parts.consonant}${shortVowel(parts.vowel)}`;
    const suffix = role === "intransitive" ? "ca" : "tz-a";
    return freeze({
      root,
      copiedPrefix,
      targetStem: `${copiedPrefix}-${root}-${suffix}`,
      suffix,
    });
  }
  function deriveUncertainTzcaStem(sourceStem = "") {
    const stem = text(sourceStem).replace(/^\((.*)\)$/u, "$1");
    if (!stem || /(?:^|-)tz-ca$/u.test(stem)) return null;
    const vowelMatches = [...stem.matchAll(new RegExp(`[${vowels}]`, "gu"))];
    if (vowelMatches.length < 2) return null;
    const finalVowelIndex = vowelMatches.at(-1)?.index;
    const previousVowelIndex = vowelMatches.at(-2)?.index;
    if (!Number.isInteger(finalVowelIndex)
      || !Number.isInteger(previousVowelIndex)) return null;
    const between = stem.slice(previousVowelIndex + 1, finalVowelIndex);
    const boundaryOffset = between.lastIndexOf("-");
    const finalSyllableStart = boundaryOffset >= 0
      ? previousVowelIndex + 2 + boundaryOffset
      : previousVowelIndex + 1;
    const retainedSource = stem.slice(0, finalSyllableStart).replace(/-+$/u, "");
    const replacedSyllable = stem.slice(finalSyllableStart).replace(/^-+/u, "");
    if (!retainedSource || !replacedSyllable) return null;
    const copied = getReduplicationParts(retainedSource);
    if (!copied.vowel) return null;
    const copiedPrefix = `${copied.consonant}${shortVowel(copied.vowel)}`;
    return freeze({
      sourceStem: stem,
      retainedSource,
      replacedSyllable,
      copiedPrefix,
      replacement: "tz-ca",
      targetStem: `${copiedPrefix}-${retainedSource}-tz-ca`,
    });
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
  function futureEmbedShapeFrame(
    sourceStem,
    verbClass = "B",
    subject = "3sg",
  ) {
    const stem = text(sourceStem);
    const classId = text(verbClass).toUpperCase();
    const sharedFrame =
      targetObject.buildClassicalNahuatlImperfectiveShapeEligibilityFrame?.({
        stem,
        classProfile: { classId },
        mood: "indicative",
        tense: "future",
        subject: text(subject) || "3sg",
        aspect: "imperfective",
      });
    if (sharedFrame?.kind
      === "classical-nahuatl-verbstem-imperfective-shape-eligibility-frame"
      && sharedFrame.authorizationStatus === "authorized"
      && sharedFrame.selectedStemVariant) {
      return sharedFrame;
    }
    return Object.freeze({
      selectedStemVariant: stem,
      underlyingStemVariant: stem,
      selectedShape: "unresolved-future-imperfective-shape",
      selectedShapeReason: "shared-lesson7-shape-owner-unavailable",
      silentCarrier: "",
    });
  }
  function futureEmbedStem(sourceStem, verbClass = "B", subject = "3sg") {
    return text(
      futureEmbedShapeFrame(sourceStem, verbClass, subject)
        ?.selectedStemVariant,
    );
  }
  function connectiveFor(matrixStem) {
    return new RegExp(`^[${vowels}]`, "iu").test(text(matrixStem)) ? "t" : "ti";
  }
  function carryEmbedStemForHuītz(sourceStem = "") {
    const stem = text(sourceStem);
    if (!stem) return "";
    // The old carry construction keeps the typed carry predicate but applies
    // the witnessed shortening before final -tz.  This is a shape rule, not a
    // list of admitted lexical stems: any fully typed carry Source can use it.
    return stem
      .replace(/^i(?=[^aeiouāēīō])/u, "")
      .replace(/ī(?=ca$)/u, "i");
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
  const REFLEXIVE_MATRIX_READINGS = Object.freeze({
    "m-o-cāhua": Object.freeze([
      "stop-doing", "leave-in-a-condition", "remain-in-a-state"
    ]),
    "m-o-tēca": Object.freeze([
      "settle-down-to-doing", "begin-doing", "become-a-condition",
      "lie-stretched-out-in-a-state"
    ]),
    "m-o-tlāl-i-ā": Object.freeze([
      "sit-in-a-state", "settle-down-to-doing", "become-a-condition",
      "begin-doing"
    ]),
    "m-o-man-a": Object.freeze([
      "do-gradually", "become-gradually", "begin-doing",
      "stand-in-position-to-do"
    ]),
    "m-o-quetza": Object.freeze([
      "do-gradually", "become-gradually"
    ])
  });
  function normalizeReflexiveMatrixAnalysis(matrixStem = "") {
    const suppliedStem = text(matrixStem);
    const coreStem = suppliedStem.replace(/^(?:[ntm]-o-)+/u, "");
    return freeze({
      suppliedStem,
      coreStem,
      canonicalStem: coreStem ? `m-o-${coreStem}` : "",
      fusedReflexiveCarrier: "m-o",
      suppliedCarrierReplaced: Boolean(
        coreStem && suppliedStem !== coreStem && !suppliedStem.startsWith("m-o-")
      )
    });
  }
  const SHARED_OBJECT_COMPOUND_MATRICES = new Set([
    "tlāl-i-ā", "quetza", "tēca", "cāhua", "quix-tiā", "māy-a-hui"
  ]);
  const SHARED_OBJECT_MATRIX_READINGS = Object.freeze({
    "tlāl-i-ā": Object.freeze([
      "place-shared-object-sitting", "set-shared-object-in-a-condition"
    ]),
    quetza: Object.freeze([
      "place-shared-object-standing", "set-shared-object-in-a-condition"
    ]),
    tēca: Object.freeze([
      "stretch-shared-object-out", "place-shared-object-recumbent"
    ]),
    cāhua: Object.freeze([
      "leave-shared-object-in-a-condition", "leave-shared-object-behind"
    ]),
    "quix-tiā": Object.freeze([
      "cause-shared-object-to-exit-in-a-condition",
      "cause-shared-object-to-end-up-in-a-manner"
    ]),
    "māy-a-hui": Object.freeze([
      "push-shared-object-down-in-a-condition",
      "knock-shared-object-flat"
    ])
  });
  const FUTURE_EMBED_COMPOUND_MATRICES = new Set(["tla-nequi", "tla-qui"]);
  function analyzeFutureEmbedMatrix(matrixStem = "") {
    const suppliedStem = text(matrixStem);
    const lexicalStem = suppliedStem.replace(/^tla-/u, "");
    if (!FUTURE_EMBED_COMPOUND_MATRICES.has(`tla-${lexicalStem}`)) return null;
    return freeze({
      suppliedStem,
      canonicalConstructionStem: `tla-${lexicalStem}`,
      lexicalStem,
      analysisId: lexicalStem === "qui"
        ? "qui-volition-imperfect"
        : "nequi-desire",
      reading: lexicalStem === "qui"
        ? "volition-or-conditional-result"
        : "want-desire-or-hope",
    });
  }
  function deriveCompoundMatrixClass(matrixStem = "", requestedClass = "") {
    const stem = text(matrixStem);
    const requested = text(requestedClass).toUpperCase();
    if (stem === "ē-hua") {
      return ["A", "B"].includes(requested) ? requested : "A";
    }
    const knownMatrixClass = ({
      quiza: "B",
      huetzi: "B",
      "cal-aqui": "B"
    })[stem];
    if (knownMatrixClass) return knownMatrixClass;
    const profile = typeof targetObject.inferClassicalNahuatlLesson7ClassProfile
      === "function"
      ? targetObject.inferClassicalNahuatlLesson7ClassProfile(stem)
      : null;
    const inferred = text(profile?.classId).toUpperCase();
    if (["A", "B", "C", "D"].includes(inferred)) return inferred;
    return "A";
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
          || (/^(?:n|t|m)-(?:o|⎕)$/u.test(carrier) ? "reflexive" : ""),
        objectPerson: text(
          slot?.morphIdentityFrame?.objectPerson
          || slot?.objectPositionFrame?.objectPerson
        ),
        objectNumber: text(
          slot?.morphIdentityFrame?.objectNumber
          || slot?.objectPositionFrame?.objectNumber
        )
      };
      return transform ? transform(position, slot, index) : position;
    });
    if (!mapped.length) return { valenceArity: "vacant" };
    if (mapped.length > 1) return { valenceArity: "multiple", positions: mapped };
    return { ...mapped[0], valenceArity: mapped[0].valenceArity };
  }
  function objectFramePositions(frame = null) {
    if (!frame || frame.valenceArity === "vacant") return [];
    if (frame.valenceArity === "multiple") return [...(frame.positions || [])];
    return [{ ...frame }];
  }
  function isProjectiveHonorificObjectPosition(position = null) {
    return [
      "specific-projective",
      "nonspecific-human",
      "nonspecific-nonhuman",
      "projective-human",
      "projective-nonhuman",
    ].includes(key(position?.objectKind));
  }
  function objectFrameReferentSignature(frame = null) {
    return JSON.stringify(objectFramePositions(frame).map(position => ({
      valenceArity: text(position.valenceArity),
      objectKind: text(position.objectKind),
      person: text(position.objectPerson),
      number: text(position.objectNumber)
    })));
  }
  function combineObjectFrames(...frames) {
    const positions = frames.flatMap(objectFramePositions);
    if (!positions.length) return { valenceArity: "vacant" };
    if (positions.length === 1) return { ...positions[0] };
    return { valenceArity: "multiple", positions };
  }
  function buildCanonicalAddedObjectFrame({
    stem,
    verbClass,
    subject,
    mood,
    tense,
    objectKind,
    objectPerson,
    governor,
    derivationalLevel,
  } = {}) {
    if (typeof targetObject.evaluateClassicalNahuatlVncApplication !== "function") {
      return null;
    }
    const participantApplication = targetObject.evaluateClassicalNahuatlVncApplication({
      sourceStem: stem,
      sourceValence: objectKind === "nonspecific-human"
        ? "projective-human"
        : objectKind === "nonspecific-nonhuman"
          ? "projective-nonhuman"
          : "specific-projective",
      objectKind,
      objectPerson,
      verbClass,
      subject,
      mood,
      tense,
      derivationType: "direct",
      requestedVoice: "active",
      voice: "active",
    });
    if (participantApplication?.authorizationStatus !== "authorized") return null;
    const participantFrame = cloneObjectFrameFromTyped(
      getBaseTypedFrame(participantApplication),
      position => ({
        ...position,
        objectKind,
        objectPerson,
        governor,
        derivationalLevel,
      }),
    );
    return participantFrame.valenceArity === "vacant" ? null : participantFrame;
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
    const requestedSourceStem = text(
      recursiveEmbedFrame?.operationFrame?.targetStem
      || request.sourceStem
      || request.stem
    );
    const sourceAgreementFrame = buildClassicalNahuatlLateSourceAgreementFrame(
      requestedSourceStem,
      {
        verbClass:
          recursiveEmbedFrame?.operationFrame?.targetClass
          || request.verbClass
          || "B",
        sourceValence:
          recursiveEmbedFrame?.operationFrame?.targetValence
          || request.sourceValence
          || request.valence
          || "intransitive",
      }
    );
    const sourceStem = sourceAgreementFrame.morphemicSourceProfile?.sourceStem
      || requestedSourceStem;
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
    if (!isClassicalNahuatlLateSourceAgreementFrame(sourceAgreementFrame)
      || sourceAgreementFrame.authorizationStatus !== "authorized") {
      return blockedOperation(
        request,
        sourceAgreementFrame.blockReason
          || "typed-morphemic-source-profile-required",
        "source-structure"
      );
    }
    const sourceCoordinateSubject = recursiveEmbedFrame
      ? recursiveEmbedFrame.normalizedRequest?.subject
      : baseApplicationFrame?.normalizedRequest?.subject;
    const sourceCoordinateStem = recursiveEmbedFrame
      ? recursiveEmbedFrame.operationFrame?.targetStem
      : baseApplicationFrame?.normalizedRequest?.sourceStem;
    const compoundItzMotionSource = operation === "compound"
      && sourceStem === "itz"
      && key(request.compoundItzSense) === "motion"
      && text(sourceCoordinateStem) === "huī-tz";
    if ((!compoundItzMotionSource && text(sourceCoordinateStem) !== sourceStem)
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
      const legacyTargetByVariant = {
        "tla-short-glottal": "fused-tla",
        "tla-long": "fused-tla",
        "tla-short-glottal-and-stem-short-glottal": "fused-tla-and-lexical-stem",
        "tla-long-and-stem-long": "fused-tla-and-lexical-stem",
        "reflexive-partial": "mainline-reflexive",
      };
      const legacyShapeByVariant = {
        "tla-short-glottal": "short-glottal",
        "tla-long": "long",
        "tla-short-glottal-and-stem-short-glottal": "short-glottal",
        "tla-long-and-stem-long": "long",
        "reflexive-partial": "short-glottal",
      };
      const requestedTarget = key(
        request.frequentativeTarget
        || legacyTargetByVariant[variant]
        || "lexical-stem",
      );
      if (!FREQUENTATIVE_TARGETS.includes(requestedTarget)) {
        return blockedOperation(
          request,
          "licensed-frequentative-target-required",
          "frequentative-object",
        );
      }
      const ordinaryVariant = [
        "ordinary-short-glottal",
        "ordinary-long",
        "ordinary-short",
      ].includes(variant);
      const legacyObjectVariant = Object.hasOwn(
        legacyTargetByVariant,
        variant,
      );
      if (ordinaryVariant || legacyObjectVariant) {
        const shape = legacyShapeByVariant[variant]
          || (variant === "ordinary-long"
            ? "long"
            : variant === "ordinary-short"
              ? "short"
              : "short-glottal");
        const requestedScope = key(request.frequentativeScope || "open");
        if (!FREQUENTATIVE_SCOPES.includes(requestedScope)) {
          return blockedOperation(
            request,
            "licensed-frequentative-scope-required",
            "frequentative-prefix-shape"
          );
        }
        if (shape !== "short-glottal" && requestedScope !== "open") {
          return blockedOperation(
            request,
            "frequentative-scope-requires-short-glottal-formation",
            "frequentative-prefix-shape"
          );
        }
        const sourceHasPatient = Array.isArray(baseTyped.slots?.prePredicate)
          && baseTyped.slots.prePredicate.some(slot => (
            ["monadic-valence", "dyadic-valence"].includes(slot?.kind)
          ));
        if (requestedScope === "patient" && !sourceHasPatient) {
          return blockedOperation(
            request,
            "patient-scope-requires-typed-source-object",
            "frequentative-prefix-shape"
          );
        }
        if (requestedTarget === "mainline-reflexive") {
          if (shape !== "short-glottal") {
            return blockedOperation(
              request,
              "partial-reflexive-requires-short-glottal-formation",
              "frequentative-reflexive",
            );
          }
          if (key(request.sourceInitialISelection) !== "supportive"
            || !/^i/u.test(sourceStem)) {
            return blockedOperation(
              request,
              "supportive-initial-i-source-required",
              "frequentative-reflexive",
            );
          }
          const reflexiveSlot = baseTyped.slots.prePredicate?.find(slot => (
            /reflexive/u.test(slot.objectPositionFrame?.objectKind || "")
            || /^[mnt]-o$/u.test(slot.carrier || "")
          ));
          if (!reflexiveSlot) {
            return blockedOperation(
              request,
              "mainline-reflexive-source-required",
              "frequentative-reflexive",
            );
          }
          targetStem = sourceStem.slice(1);
          objectTransform = position => {
            const va1 = text(position.va1 || position.va || "")
              .replace(/-?o$/u, "");
            return { ...position, valenceArity: "dyadic", va1, va2: "oh-o" };
          };
          ruleFamily = "frequentative-reflexive";
          operationFacts = {
            reduplicationTarget: requestedTarget,
            shape,
            shapeFormula: "mainline reflexive carrier + short vowel + h",
            reflexiveCarrier: text(reflexiveSlot.carrier),
            partialReflexiveCarrier: `${text(reflexiveSlot.carrier).replace(/-?o$/u, "")}-oh-o`,
            initialIAnalysis: "supportive",
            supportiveIDeleted: true,
            sourceStemAfterSupportiveIDeletion: targetStem,
            participantStructurePreserved: true,
            repetitions: 1,
          };
        } else {
        // A fused/impersonal tla is already a typed stem constituent. The
        // target choice determines whether reduplication applies to tla, the
        // lexical stem beneath it, or both; copied material remains derived.
        const fusedTlaSelected = requestedTarget !== "lexical-stem";
        if (fusedTlaSelected && !/^tla-/u.test(frequentativeSourceStem)) {
          return blockedOperation(
            request,
            "fused-tla-source-required",
            "frequentative-tla",
          );
        }
        if (fusedTlaSelected && shape === "short") {
          return blockedOperation(
            request,
            "fused-tla-reduplication-requires-glottal-or-long-shape",
            "frequentative-tla",
          );
        }
        const ordinarySourceStem = /^tla-/u.test(frequentativeSourceStem)
          ? frequentativeSourceStem.slice(4)
          : frequentativeSourceStem;
        const sourceInitialISelection = key(request.sourceInitialISelection);
        if (sourceInitialISelection === "supportive"
          && !/^i(?:ch|cu|hu|qu|tl|tz|[bcçhlmnpqstxyz]){2}/u.test(ordinarySourceStem)) {
          return blockedOperation(
            request,
            "supportive-i-plus-two-consonants-required",
            "frequentative-supportive-i"
          );
        }
        const reduplicatedStem = reduplicate(ordinarySourceStem, shape, {
          repetitions,
          supportiveI: sourceInitialISelection === "supportive"
        });
        const reduplicationParts = getReduplicationParts(ordinarySourceStem, {
          supportiveI: sourceInitialISelection === "supportive"
        });
        const copiedVowel = shape === "long"
          ? longVowel(shortVowel(reduplicationParts.vowel))
          : shortVowel(reduplicationParts.vowel);
        const copiedPrefix = `${reduplicationParts.consonant}${copiedVowel}${shape === "short-glottal" ? "h" : ""}`;
        const tlaPrefix = shape === "long" ? "tlā-tla" : "tlah-tla";
        targetStem = fusedTlaSelected
          ? requestedTarget === "fused-tla-and-lexical-stem"
            ? `${tlaPrefix}-${reduplicatedStem}`
            : `${tlaPrefix}-${ordinarySourceStem}`
          : /^tla-/u.test(frequentativeSourceStem)
            ? `tla-${reduplicatedStem}`
            : reduplicatedStem;
        ruleFamily = fusedTlaSelected
          ? "frequentative-tla"
          : "frequentative-prefix-shape";
        operationFacts = {
          reduplicationTarget: requestedTarget,
          shape,
          shapeFormula: shape === "short-glottal"
            ? "(C)+short vowel+h"
            : shape === "long"
              ? "(C)+long vowel"
              : "(C)+short vowel",
          copiedConsonant: reduplicationParts.consonant,
          copiedVowel,
          copiedPrefix,
          repetitions,
          lexicalShapeChoice: true,
          semanticScope: requestedScope,
          availableSemanticScopes: FREQUENTATIVE_SCOPES,
          patientScopeAvailable: sourceHasPatient,
          initialIAnalysis: sourceInitialISelection || "not-applicable",
          supportiveIDeleted: sourceInitialISelection === "supportive",
          sourceStemAfterSupportiveIDeletion: reduplicationParts.retainedStem,
          objectPronounReduplicated: fusedTlaSelected,
          lexicalStemAlsoReduplicated:
            requestedTarget === "fused-tla-and-lexical-stem",
          objectScope: fusedTlaSelected ? "nonspecific-nonhuman objects" : "unchanged",
          eventScope: requestedTarget === "fused-tla"
            ? "unchanged"
            : "frequentative event",
          independentObjectAndEventScopes:
            requestedTarget === "fused-tla-and-lexical-stem",
        };
        }
      } else if (variant === "destockal-lexicalized") {
        const lexicalized = parseCompletedLexicalizedDestockal(sourceStem);
        if (!lexicalized) {
          return blockedOperation(
            request,
            "completed-ca-or-tza-destockal-shape-required",
            "frequentative-destockal"
          );
        }
        targetStem = baseIsNonactive
          ? frequentativeSourceStem
          : lexicalized.targetStem;
        targetClass = lexicalized.targetClass;
        targetValence = lexicalized.structuralForce === "intransitive"
          ? "intransitive"
          : text(request.sourceValence || request.valence || "specific-projective");
        ruleFamily = "frequentative-destockal";
        operationFacts = {
          lexicalizedDestockal: true,
          sourceHistory: "extinct-or-fused-destockal",
          openSourceShape: true,
          fusedStockVowelRemainsLong: Boolean(lexicalized.fusedLongVowel),
          fusedLongVowel: lexicalized.fusedLongVowel,
          tzAUnit: lexicalized.tzAUnit,
          semanticForce: lexicalized.structuralForce,
          licensedSemanticForces: lexicalized.tzAUnit
            ? ["causative", "applicative"]
            : ["intransitive"],
          contextualRoleSelection: Boolean(lexicalized.tzAUnit),
          nonactiveAppliedToFrequentativeStem: baseIsNonactive,
          canvasExamplesAreEvidenceOnly: true,
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
          const parsed = parseIntransitiveDestockal(sourceStem);
          if (!parsed) return blockedOperation(request, "ni-or-hui-destockal-source-required", "frequentative-destockal");
          const activeFrequentativeStem = `${reduplicationPrefix}-${parsed.targetCore}`;
          const selectedVoiceOperation = key(
            baseApplicationFrame?.controlFrame?.selectedVoiceOperation,
          );
          const selectedNonactiveOptionId = text(
            baseApplicationFrame?.controlFrame?.selectedNonactiveOptionId
            || request.nonactiveOptionId,
          );
          let nonactiveFormation = "active";
          if (baseIsNonactive) {
            if (selectedVoiceOperation === "tla-impersonal") {
              targetStem = `tla-${activeFrequentativeStem}`;
              nonactiveFormation = "tla-impersonal";
            } else if (/^o-hua:/u.test(selectedNonactiveOptionId)) {
              targetStem = activeFrequentativeStem.replace(/ca$/u, "c-o-hua");
              nonactiveFormation = "ca-to-c-o-hua";
            } else if (/^hua:/u.test(selectedNonactiveOptionId)) {
              targetStem = activeFrequentativeStem.replace(/ca$/u, "c-ō");
              nonactiveFormation = "ca-to-c-ō";
            } else if (selectedVoiceOperation === "inherent-impersonal") {
              targetStem = activeFrequentativeStem;
              nonactiveFormation = "inherent-impersonal";
            } else {
              return blockedOperation(
                request,
                "licensed-destockal-impersonal-formation-required",
                "frequentative-nonactive",
              );
            }
          } else {
            targetStem = activeFrequentativeStem;
          }
          targetClass = "A";
          targetValence = "intransitive";
          operationFacts = {
            shape,
            shapeFormula: "(C)+short vowel",
            reduplicationTarget: "lexical-stem",
            copiedConsonant: parts.consonant,
            copiedVowel: shortVowel(parts.vowel),
            copiedPrefix: redup,
            shortVowelReduplication: true,
            sourceDestockalSuffix: parsed.sourceSuffix,
            targetDestockalSuffix: parsed.targetSuffix,
            stockVowel: parsed.stockVowel,
            reducedStockVowel: parsed.reducedStockVowel,
            stockLongVowelReduced: parsed.stockVowel !== parsed.reducedStockVowel,
            activeFrequentativeStem,
            nonactiveFormation,
            impersonalOnlyWhenNonactive: baseIsNonactive,
            targetClass: "A",
            perfectiveKeepsFinalA: true,
            repetitions,
            openSourceShape: true,
          };
        } else if ([
          "destockal-causative",
          "destockal-causative-force",
          "destockal-applicative-force",
        ].includes(variant)) {
          const completed = variant !== "destockal-causative"
            ? parseCompletedLexicalizedDestockal(sourceStem)
            : null;
          const completedTzA = completed?.tzAUnit ? completed : null;
          const parsed = completedTzA ? null : parseCausativeDestockal(sourceStem);
          if (!completedTzA && !parsed) return blockedOperation(
            request,
            variant === "destockal-causative"
              ? "destockal-causative-source-required"
              : "destockal-causative-or-completed-tza-source-required",
            "frequentative-destockal",
          );
          targetStem = completedTzA
            ? completedTzA.targetStem
            : `${reduplicationPrefix}-${parsed.targetCore}`;
          targetClass = "B";
          if (variant === "destockal-applicative-force") {
            targetValence = "specific-projective";
          }
          operationFacts = {
            shape,
            shapeFormula: "(C)+short vowel",
            reduplicationTarget: "lexical-stem",
            copiedConsonant: parts.consonant,
            copiedVowel: shortVowel(parts.vowel),
            copiedPrefix: redup,
            shortVowelReduplication: true,
            sourceDestockalSuffix: parsed?.sourceSuffix || "completed-tz-a",
            targetDestockalSuffix: parsed?.targetSuffix || completedTzA.tzAUnit,
            stockVowel: parsed?.stockVowel || completedTzA.fusedLongVowel,
            reducedStockVowel: parsed?.reducedStockVowel || completedTzA.fusedLongVowel,
            stockLongVowelReduced: parsed
              ? parsed.stockVowel !== parsed.reducedStockVowel
              : false,
            retainedCausativeVowel: parsed?.retainedCausativeVowel || "a",
            semanticForce: variant === "destockal-applicative-force"
              ? "applicative"
              : "causative",
            contextualRoleSelected: completedTzA
              ? variant === "destockal-applicative-force"
                ? "applicative"
                : "causative"
              : "not-applicable",
            completedTzASource: Boolean(completedTzA),
            participantStructurePreserved: true,
            targetClass: "B",
            perfectiveDropsFinalA: true,
            repetitions,
            openSourceShape: true,
          };
        } else if (variant === "destockal-applicative") {
          if (!/(?:tz-a|tza)$/u.test(sourceStem)) return blockedOperation(request, "frequentative-destockal-tza-source-required", "frequentative-destockal");
          targetStem = sourceStem.replace(/(?:tz-a|tza)$/u, "ch-i-liā");
          targetClass = "C";
          targetValence = "specific-projective";
          const addedObjectKind = text(
            request.applicativeObjectKind || "nonspecific-human",
          );
          const addedObjectPerson = text(request.applicativeObjectPerson);
          const addedObjectFrame = buildCanonicalAddedObjectFrame({
            stem: targetStem,
            verbClass: targetClass,
            subject: request.subject,
            mood: request.mood,
            tense: request.tense,
            objectKind: addedObjectKind,
            objectPerson: addedObjectPerson,
            governor: "applicative",
            derivationalLevel: objectFramePositions(
              cloneObjectFrameFromTyped(baseTyped),
            ).length + 1,
          });
          if (!addedObjectFrame) return blockedOperation(
            request,
            "canonical-applicative-participant-required",
            "frequentative-destockal",
          );
          objectFrame = combineObjectFrames(
            cloneObjectFrameFromTyped(baseTyped),
            addedObjectFrame,
          );
          operationFacts = {
            recursiveResultSource: true,
            sourceSuffix: sourceStem.match(/(?:tz-a|tza)$/u)?.[0] || "tz-a",
            replacementSuffix: "ch-i",
            addedApplicativeSuffix: "liā",
            derivationRole: "applicative",
            addedParticipant: {
              objectKind: addedObjectKind,
              objectPerson: addedObjectPerson,
            },
            priorObjectsPreserved: true,
            unsupportedTlaFusionRejected: true,
            targetClass: "C",
          };
        } else if (variant === "destockal-type-two") {
          targetStem = sourceStem.replace(/ca$/u, "qui-l-tiā");
          if (targetStem === sourceStem) return blockedOperation(request, "frequentative-destockal-ca-source-required", "frequentative-destockal");
          targetClass = "C";
          targetValence = "specific-projective";
          const addedObjectKind = text(
            request.causativeObjectKind || "specific-projective",
          );
          const addedObjectPerson = text(
            request.causativeObjectPerson || "3sg",
          );
          const addedObjectFrame = buildCanonicalAddedObjectFrame({
            stem: targetStem,
            verbClass: targetClass,
            subject: request.subject,
            mood: request.mood,
            tense: request.tense,
            objectKind: addedObjectKind,
            objectPerson: addedObjectPerson,
            governor: "causative",
            derivationalLevel: objectFramePositions(
              cloneObjectFrameFromTyped(baseTyped),
            ).length + 1,
          });
          if (!addedObjectFrame) return blockedOperation(
            request,
            "canonical-causee-participant-required",
            "frequentative-destockal",
          );
          objectFrame = combineObjectFrames(
            cloneObjectFrameFromTyped(baseTyped),
            addedObjectFrame,
          );
          operationFacts = {
            recursiveResultSource: true,
            sourceSuffix: "ca",
            replacementSuffix: "qui-l-tiā",
            derivationRole: "rare-type-two-causative",
            lexicalLicenseSuppliedBySelectedAnalysis: true,
            addedParticipant: {
              objectKind: addedObjectKind,
              objectPerson: addedObjectPerson,
            },
            priorObjectsPreserved: true,
            targetClass: "C",
          };
        } else {
          return blockedOperation(request, "recognized-destockal-operation-required", "frequentative-destockal");
        }
        ruleFamily = "frequentative-destockal";
        operationFacts = Object.keys(operationFacts).length
          ? operationFacts
          : {
            shortVowelReduplication: true,
            stockLongVowelReduced: true,
            repetitions,
            semanticForce: "",
          };
      } else if ([
        "uncertain-ca",
        "uncertain-ca-causative",
        "uncertain-ca-applicative",
        "uncertain-ca-fused-tla",
        "uncertain-ca-applicative-growl",
        "uncertain-ca-fused-tla-bark",
      ].includes(variant)) {
        const requestedRole = variant === "uncertain-ca"
          ? "intransitive"
          : variant === "uncertain-ca-causative"
            ? "causative"
            : "applicative";
        const uncertain = deriveUncertainCaStem(sourceStem, requestedRole);
        if (!uncertain) {
          return blockedOperation(
            request,
            "open-uncertain-ca-root-shape-required",
            "frequentative-uncertain"
          );
        }
        targetStem = uncertain.targetStem;
        targetClass = "A";
        ruleFamily = "frequentative-uncertain";
        if (["uncertain-ca-applicative", "uncertain-ca-applicative-growl"].includes(variant)) {
          targetValence = "specific-projective";
          const addedObjectKind = text(
            request.applicativeObjectKind || request.objectKind || "specific-projective",
          );
          const addedObjectPerson = text(
            request.applicativeObjectPerson || request.objectPerson,
          );
          objectFrame = buildCanonicalAddedObjectFrame({
            stem: targetStem,
            verbClass: targetClass,
            subject: request.subject,
            mood: request.mood,
            tense: request.tense,
            objectKind: addedObjectKind,
            objectPerson: addedObjectPerson,
            governor: "applicative",
            derivationalLevel: 1,
          });
          if (!objectFrame) return blockedOperation(
            request,
            "canonical-applicative-participant-required",
            "frequentative-uncertain",
          );
          operationFacts = {
            sourceAnalysis: "uncertain-ca",
            sourceRoot: uncertain.root,
            copiedPrefix: uncertain.copiedPrefix,
            targetSuffix: uncertain.suffix,
            derivationRole: "applicative",
            addedParticipant: {
              objectKind: addedObjectKind,
              objectPerson: addedObjectPerson,
            },
            openSourceShape: true,
            lexicalMeaningInferred: false,
          };
        } else if (["uncertain-ca-fused-tla", "uncertain-ca-fused-tla-bark"].includes(variant)) {
          targetStem = `tla-${uncertain.targetStem}`;
          targetValence = "intransitive";
          operationFacts = {
            sourceAnalysis: "uncertain-ca",
            sourceRoot: uncertain.root,
            copiedPrefix: uncertain.copiedPrefix,
            targetSuffix: uncertain.suffix,
            derivationRole: "applicative",
            fusedObjectPrefix: "tla",
            fusionLowersValence: true,
            openSourceShape: true,
            lexicalMeaningInferred: false,
          };
        } else {
          if (variant === "uncertain-ca-causative") {
            targetValence = "specific-projective";
            const addedObjectKind = text(
              request.causativeObjectKind || request.objectKind || "specific-projective",
            );
            const addedObjectPerson = text(
              request.causativeObjectPerson || request.objectPerson || "3sg",
            );
            objectFrame = buildCanonicalAddedObjectFrame({
              stem: targetStem,
              verbClass: targetClass,
              subject: request.subject,
              mood: request.mood,
              tense: request.tense,
              objectKind: addedObjectKind,
              objectPerson: addedObjectPerson,
              governor: "causative",
              derivationalLevel: 1,
            });
            if (!objectFrame) return blockedOperation(
              request,
              "canonical-causee-participant-required",
              "frequentative-uncertain",
            );
          }
          operationFacts = {
            sourceAnalysis: "uncertain-ca",
            sourceRoot: uncertain.root,
            copiedPrefix: uncertain.copiedPrefix,
            targetSuffix: uncertain.suffix,
            derivationRole: requestedRole,
            openSourceShape: true,
            uncertainHistoryPreserved: true,
            lexicalMeaningInferred: false,
            canvasExamplesAreEvidenceOnly: true,
            assimilationAvailableFromStructure: /ch-tz-a$/u.test(targetStem),
          };
        }
      } else if (variant === "uncertain-tzca") {
        const sourceHasObject = Array.isArray(baseTyped.slots?.prePredicate)
          && baseTyped.slots.prePredicate.some(slot => (
            ["monadic-valence", "dyadic-valence"].includes(slot?.kind)
          ));
        const uncertainTzca = deriveUncertainTzcaStem(sourceStem);
        if (!uncertainTzca || sourceHasObject) {
          return blockedOperation(
            request,
            sourceHasObject
              ? "intransitive-uncertain-tzca-source-required"
              : "replaceable-final-source-syllable-required",
            "frequentative-uncertain"
          );
        }
        targetStem = uncertainTzca.targetStem;
        targetClass = "A";
        targetValence = "intransitive";
        ruleFamily = "frequentative-uncertain";
        operationFacts = {
          sourceAnalysis: "uncertain-tzca-frequentative",
          openSourceShape: true,
          retainedSource: uncertainTzca.retainedSource,
          replacedSourceSyllable: uncertainTzca.replacedSyllable,
          replacement: uncertainTzca.replacement,
          copiedPrefix: uncertainTzca.copiedPrefix,
          uncertainHistoryPreserved: true,
          completedTzcaResultAvailableForContinuation: true,
          unreduplicatedTzcaIsDifferentSourceAnalysis: true,
          transitiveTzcaIsDifferentFormation: true,
          lexicalMeaningInferred: false,
          canvasExamplesAreEvidenceOnly: true,
        };
      } else {
        return blockedOperation(request, "recognized-frequentative-variant-required", "frequentative-prefix-shape");
      }
    } else if (operation === "compound") {
      const recursiveMatrixFrame = isAuthorizedClosureFrame(
        internalContext.recursiveMatrixClosureFrame
      )
        ? internalContext.recursiveMatrixClosureFrame
        : null;
      const recursiveHierarchy = analyzeRecursiveCompoundHierarchy(
        recursiveEmbedFrame,
        recursiveMatrixFrame
      );
      if (recursiveHierarchy.authorizationStatus !== "authorized") {
        return blockedOperation(
          request,
          recursiveHierarchy.blockReason,
          "compound-recursion"
        );
      }
      const requestedMatrixStem = text(
        recursiveMatrixFrame?.operationFrame?.targetStem
        || request.compoundMatrixStem
        || request.matrixStem
      );
      const reflexiveMatrixAnalysis = variant === "reflexive-matrix"
        ? normalizeReflexiveMatrixAnalysis(requestedMatrixStem)
        : null;
      const matrixStem = reflexiveMatrixAnalysis?.canonicalStem
        || requestedMatrixStem;
      const futureMatrixAnalysis = variant === "future-embed"
        ? analyzeFutureEmbedMatrix(matrixStem)
        : null;
      if (variant === "future-embed" && !futureMatrixAnalysis) {
        return blockedOperation(
          request,
          "future-embed-matrix-analysis-must-be-nequi-or-qui",
          "compound-future-embed",
        );
      }
      const reflexiveMatrixSubject = text(request.subject || "3sg");
      const reflexiveMatrixSubjectAnimacy = /^[12]/u.test(
        reflexiveMatrixSubject
      )
        ? "animate"
        : key(request.compoundSubjectAnimacy || "nonanimate");
      const matrixTyped = recursiveMatrixFrame?.finalTypedVncSlotFrame
        || getBaseTypedFrame(internalContext.matrixApplicationFrame);
      const matrixPredicateStem = text(
        recursiveMatrixFrame?.operationFrame?.targetStem
        || matrixTyped?.slots?.predicate?.stem
        || matrixStem
      );
      const realizedMatrixStem = matrixStem === "ya-uh"
        && matrixPredicateStem === "ya-uh"
        ? "uh"
        : matrixStem === "o"
          ? matrixPredicateStem.replace(/^on-/u, "")
          : matrixPredicateStem;
      if (!matrixStem) {
        return blockedOperation(request, "typed-compound-matrix-required", "compound-matrix-analysis");
      }
      const selectedEventOrder = key(request.compoundEventOrder || "iconic");
      if (!["iconic", "hysteron-proteron"].includes(selectedEventOrder)) {
        return blockedOperation(
          request,
          "licensed-compound-event-order-required",
          "compound-event-order"
        );
      }
      const selectedItzSense = key(request.compoundItzSense);
      const reversedEventOrderLicensed = selectedEventOrder === "hysteron-proteron"
        || matrixStem === "huetzi"
        || matrixStem === "ahci"
        || (
          matrixStem === "ē-hua"
          && sourceStem === "itz"
          && selectedItzSense === "motion"
        );
      if (matrixStem === "ē-hua"
        && request.compoundMatrixClass
        && !["A", "B"].includes(text(request.compoundMatrixClass).toUpperCase())) {
        return blockedOperation(
          request,
          "e-hua-matrix-requires-licensed-a-or-b-class-history",
          "compound-matrix-analysis"
        );
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
          "compound-matrix-analysis"
        );
      }
      const matrixCoordinateStem = recursiveMatrixFrame
        ? recursiveMatrixFrame.operationFrame?.targetStem
        : internalContext.matrixApplicationFrame?.normalizedRequest?.sourceStem;
      const matrixCoordinateSubject = recursiveMatrixFrame
        ? recursiveMatrixFrame.normalizedRequest?.subject
        : internalContext.matrixApplicationFrame?.normalizedRequest?.subject;
      const expectedMatrixCoordinateStem = variant === "future-embed"
        ? futureMatrixAnalysis.lexicalStem
        : matrixStem === "ca"
          ? "ye"
          : matrixStem === "o"
            ? "on-o"
            : matrixStem;
      if (text(matrixCoordinateStem) !== expectedMatrixCoordinateStem
        || text(matrixCoordinateSubject) !== text(request.subject || "3sg")) {
        return blockedOperation(request, "typed-matrix-request-continuity-required", "compound-matrix-analysis");
      }
      targetClass = text(
        recursiveMatrixFrame?.operationFrame?.targetClass
        || internalContext.matrixApplicationFrame?.normalizedRequest?.verbClass
        || internalContext.derivedMatrixClass
        || deriveCompoundMatrixClass(matrixStem)
      ).toUpperCase();
      const requestedNonactiveScope = key(
        request.compoundNonactiveScope || "none"
      );
      const requestedCompoundVoice = key(
        request.requestedVoice || request.voice || "active"
      );
      const selectedEmbedVoiceOperation = key(
        baseApplicationFrame?.controlFrame?.selectedVoiceOperation
        || baseApplicationFrame?.controlFrame?.selectedVoice
        || request.nonactiveOptionId
        || requestedCompoundVoice
      );
      if (requestedCompoundVoice === "active"
        && requestedNonactiveScope !== "none") {
        return blockedOperation(
          request,
          "compound-nonactive-scope-requires-nonactive-voice",
          "compound-nonactive"
        );
      }
      if (requestedCompoundVoice === "passive"
        && !["embed", "both"].includes(requestedNonactiveScope)) {
        return blockedOperation(
          request,
          "compound-passive-scope-must-be-embed-or-both",
          "compound-nonactive"
        );
      }
      if (requestedCompoundVoice === "impersonal"
        && !["embed", "matrix", "both"].includes(requestedNonactiveScope)) {
        return blockedOperation(
          request,
          "compound-impersonal-scope-must-be-embed-matrix-or-both",
          "compound-nonactive"
        );
      }
      if (baseApplicationFrame?.controlFrame?.selectedVoiceOperation === "tla-impersonal"
        && requestedNonactiveScope !== "embed") {
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
      const perfective = ({
        ca: "ye",
        "ya-uh": "yah",
        "itt-a": "itz",
        itz: "itz"
      }[sourceStem] || perfectiveStemFromMachinery(baseMachinery) || sourceStem);
      const sharedEmbedObjectFrame = variant === "shared-object"
        ? cloneObjectFrameFromTyped(baseTyped)
        : null;
      const sharedMatrixObjectFrame = variant === "shared-object"
        ? cloneObjectFrameFromTyped(matrixTyped)
        : null;
      const sharedObjectCoreferenceVerified = variant === "shared-object"
        && sharedEmbedObjectFrame?.valenceArity !== "vacant"
        && sharedMatrixObjectFrame?.valenceArity !== "vacant"
        && objectFrameReferentSignature(sharedEmbedObjectFrame)
          === objectFrameReferentSignature(sharedMatrixObjectFrame);
      if (sourceStem === "cac"
        && request.compoundSubjectAnimacy
        && key(request.compoundSubjectAnimacy) !== "nonanimate") {
        return blockedOperation(request, "cac-embed-requires-nonanimate-subject", "compound-irregular-embed");
      }
      if (sourceStem === "itz"
        && !["observational", "motion"].includes(selectedItzSense)) {
        return blockedOperation(
          request,
          "typed-itz-embed-sense-required",
          "compound-irregular-embed"
        );
      }
      if (variant === "shared-object"
        && sharedEmbedObjectFrame.valenceArity === "vacant") {
        return blockedOperation(
          request,
          "shared-object-coreferential-embed-object-required",
          "compound-shared-object"
        );
      }
      if (variant === "shared-object" && !sharedObjectCoreferenceVerified) {
        return blockedOperation(
          request,
          "shared-object-embed-matrix-coreference-required",
          "compound-shared-object"
        );
      }
      if (variant === "huītz-carry") {
        if (matrixStem !== "huī-tz") {
          return blockedOperation(
            request,
            "huītz-carry-requires-typed-huītz-matrix-analysis",
            "compound-irregular-embed"
          );
        }
        const carryObjectFrame = cloneObjectFrameFromTyped(baseTyped);
        if (carryObjectFrame.valenceArity === "vacant") {
          return blockedOperation(
            request,
            "huītz-carry-requires-typed-carry-object",
            "compound-irregular-embed"
          );
        }
        const carryEmbedStem = carryEmbedStemForHuītz(sourceStem);
        if (!carryEmbedStem) {
          return blockedOperation(
            request,
            "typed-carry-source-required",
            "compound-irregular-embed"
          );
        }
        targetStem = `${carryEmbedStem}-tz`;
        predicateTns = matrixTyped?.slots?.predicate?.tns;
        numberDyad = matrixTyped?.slots?.number;
        ruleFamily = "compound-irregular-embed";
        operationFacts = {
          oldConnectivelessHuītzFormation: true,
          prohibitedConnectiveT: true,
          carryLexicalAnalysisSelected: true,
          carrySourceStem: sourceStem,
          carryEmbedStem,
          carryMatrixPerfectiveStem: "itz",
          carryVisibleMatrixShape: "tz",
          carryObjectKind: text(request.sourceValence || request.valence),
          carryObjectPerson: text(request.objectPerson),
          openTypedCarrySourceAdmission: true,
          carrySourceStemWhitelistUsed: false,
          specialCarryStemDerivedFromShape: true
        };
      } else if (variant === "connective-t" || variant === "reflexive-matrix" || variant === "shared-object" || variant === "accompanying-possession") {
        const syncopatedYa = request.compoundYaSyncopation === true;
        if (syncopatedYa && !/^(?:yā|ya|yah)$/u.test(realizedMatrixStem)) {
          return blockedOperation(
            request,
            "syncopated-ta-requires-ya-matrix-shape",
            "compound-connective-t"
          );
        }
        const connector = syncopatedYa
          ? "t"
          : connectiveFor(realizedMatrixStem);
        const matrixRealization = syncopatedYa
          ? realizedMatrixStem === "yah" ? "ah" : "ā"
          : realizedMatrixStem;
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
        if (variant === "reflexive-matrix"
          && matrixStem === "m-o-man-a"
          && reflexiveMatrixSubjectAnimacy === "animate"
          && !/pl$/u.test(reflexiveMatrixSubject)) {
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
        const futureSupplementationFrame =
          internalContext.futureSupplementationFrame || null;
        const futureSupplementationAuthorized = Boolean(
          targetObject.isClassicalNahuatlSupplementationFrame?.(
            futureSupplementationFrame,
          )
          && futureSupplementationFrame.authorizationStatus === "authorized"
          && futureSupplementationFrame.referenceFrame?.referenceMode
            === "included"
          && futureSupplementationFrame.referenceFrame?.headRole === "object"
          && futureSupplementationFrame.supplementClause?.unitKind === "vnc"
          && futureSupplementationFrame.supplementClause?.tense === "future"
          && futureSupplementationFrame.operationFrames?.some?.(
            frame => frame.kind
              === "classical-nahuatl-supplementation-coreferential-future-frame"
              && frame.authorizationStatus === "authorized",
          )
        );
        if (!futureSupplementationAuthorized) {
          return blockedOperation(
            request,
            futureSupplementationFrame?.blockReason
              || "owner-issued-future-supplementary-object-required",
            "compound-future-embed",
          );
        }
        if (futureMatrixAnalysis.lexicalStem === "qui"
          && key(request.tense) !== "imperfect") {
          return blockedOperation(
            request,
            "tla-qui-matrix-is-imperfect-only",
            "compound-future-embed",
          );
        }
        const typedFuturePredicateStem = text(
          baseTyped?.slots?.predicate?.stem || sourceStem,
        );
        const futurePredicateStem = futureEmbedStem(
          typedFuturePredicateStem,
          text(
            baseApplicationFrame?.normalizedRequest?.verbClass
            || request.verbClass
            || "B",
          ),
          request.subject,
        );
        const integratedMatrixStem = futureMatrixAnalysis.lexicalStem;
        targetStem = `${futurePredicateStem}-z-${integratedMatrixStem}`;
        predicateTns = matrixTyped?.slots?.predicate?.tns;
        numberDyad = matrixTyped?.slots?.number;
        ruleFamily = "compound-future-embed";
        operationFacts = {
          futureSupplementationFrame,
          futureSupplementationAuthorized,
          futureSupplementSourceKind: "owner-issued-future-vnc-result",
          futureSupplementFunctionsAsObject: true,
          matrixObjectReplacedByFuturePredicate: true,
          matrixObjectCarrierSuppressed: true,
          futureEmbedPredicateStem: futurePredicateStem,
          futureEmbedTense: "future",
          futureEmbedTenseMorph: "z",
          futureEmbedValence: text(
            request.sourceValence || request.valence || "intransitive",
          ),
          futureEmbedMayBeIntransitiveOrTransitive: true,
          futureEmbedActionAfterMatrixAction: true,
          futureMatrixAnalysisId: futureMatrixAnalysis.analysisId,
          futureMatrixLexicalStem: futureMatrixAnalysis.lexicalStem,
          futureMatrixConstructionStem:
            futureMatrixAnalysis.canonicalConstructionStem,
          futureMatrixReading: futureMatrixAnalysis.reading,
          futureMatrixAnalysisIsUserChoice: true,
          futureMatrixInventoryIsConstructionalNotSourceWhitelist: true,
          futureMatrixStemWhitelistUsed: false,
          quiMatrixAnomalous: futureMatrixAnalysis.lexicalStem === "qui",
          quiMatrixImperfectOnly: futureMatrixAnalysis.lexicalStem === "qui",
          traditionalConditionalIsReadingNotTense:
            futureMatrixAnalysis.lexicalStem === "qui",
          principalAndSupplementSubjectsCoreferential:
            futureSupplementationFrame.principalClause?.subject?.referenceId
              === futureSupplementationFrame.supplementClause?.subject
                ?.referenceId,
          includedReferentSupplementationAvailable:
            futureMatrixAnalysis.lexicalStem === "qui",
          antecessiveOrderAvailable:
            futureMatrixAnalysis.lexicalStem === "qui"
            && key(request.tense) === "imperfect",
          antecessiveOrderRequested: Boolean(
            request.sentenceAntecessive === true
            || request.antecessive === true
            || request.requestedPrefixStackMode === "antecessive"
            || request.prefixStackMode === "antecessive",
          ),
          antecessiveScopesFiniteMatrixTense: true,
        };
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
        matrixSourceValence: variant === "shared-object"
          || variant === "future-embed"
          ? "transitive"
          : variant === "reflexive-matrix"
            ? "transitive-reflexive-core"
            : text(
              recursiveMatrixFrame?.operationFrame?.targetValence
              || internalContext.matrixApplicationFrame?.normalizedRequest?.sourceValence
              || "intransitive"
            ),
        matrixFiniteApplicationValence: text(
          recursiveMatrixFrame?.operationFrame?.targetValence
          || internalContext.matrixApplicationFrame?.normalizedRequest?.sourceValence
          || "intransitive"
        ),
        binaryConstituentCount: 2,
        binaryCompoundStructure: true,
        sourceClauseRelationshipsPreserved: true,
        syntaxDowngradedToMorphology: true,
        principalSubjectFromMatrix: true,
        embedSubjectReferencePreserved: true,
        embedNeverFunctionsAsSubject: true,
        licensedEmbedFunctions: freeze([
          "incorporated-object",
          "incorporated-possessor",
          "incorporated-modifier",
          "incorporated-complement"
        ]),
        compoundOutputCategory: "VNC",
        typedMatrixAnalysisRequired: true,
        openTypedMatrixAdmission: true,
        canvasExamplesAreEvidenceOnly: true,
        supportedEmbedMatrixValencePatterns: freeze([
          "intransitive+intransitive",
          "transitive+intransitive",
          "intransitive+transitive",
          "transitive+transitive"
        ]),
        embedDeterminesCompoundValence: true,
        matrixDeterminesCompoundType: true,
        sourcePredicatePreserved: true,
        embedSubjectDeleted: true,
        matrixAfterEmbed: true,
        embedStem: variant === "future-embed"
          ? operationFacts.futureEmbedPredicateStem
          : perfective,
        connective: variant === "future-embed"
          ? ""
          : variant === "huītz-carry"
            ? ""
            : request.compoundYaSyncopation === true
              ? "t"
              : connectiveFor(realizedMatrixStem),
        matrixStem: realizedMatrixStem,
        matrixSelectionStem: matrixStem,
        matrixSuppliedStem: requestedMatrixStem,
        reflexiveMatrixCore: reflexiveMatrixAnalysis?.coreStem || "",
        typedReflexiveMatrixRole:
          variant === "reflexive-matrix" ? "reflexive-matrix-core" : "",
        fixedReflexiveCarrier:
          reflexiveMatrixAnalysis?.fusedReflexiveCarrier || "",
        fixedReflexiveCarrierDerived:
          variant === "reflexive-matrix",
        fixedReflexiveCarrierRegardlessOfSubject:
          variant === "reflexive-matrix",
        suppliedPersonMarkedReflexiveCarrierReplaced:
          reflexiveMatrixAnalysis?.suppliedCarrierReplaced === true,
        matrixTransitivityDischargedOntoFusedReflexive:
          variant === "reflexive-matrix",
        reflexiveCoreStructurallyIntransitiveInCompound:
          variant === "reflexive-matrix",
        reflexiveMatrixIntroducesNoNewParticipant:
          variant === "reflexive-matrix",
        reflexiveMatrixSubjectCoreference:
          variant === "reflexive-matrix",
        reflexiveMatrixExamplesNonexhaustive:
          variant === "reflexive-matrix",
        reflexiveMatrixStemWhitelistUsed: false,
        reflexiveMatrixSubjectAnimacy:
          variant === "reflexive-matrix"
            ? reflexiveMatrixSubjectAnimacy
            : "",
        moManaAnimateSubjectMustBePlural:
          variant === "reflexive-matrix" && matrixStem === "m-o-man-a",
        moManaSubjectNumberDerivedFromFiniteSubject:
          variant === "reflexive-matrix" && matrixStem === "m-o-man-a",
        matrixFiniteStem: variant === "huītz-carry"
          ? "tz"
          : realizedMatrixStem,
        matrixFiniteMood: key(request.mood || "indicative"),
        matrixFiniteTense: key(request.tense || "present"),
        matrixFiniteSubject: text(request.subject || "3sg"),
        matrixFiniteNumberMorph: text(matrixTyped?.slots?.number?.num2),
        matrixConstruction: variant === "future-embed"
          ? operationFacts.futureMatrixAnalysisId
          : ({
          ca: "progressive-or-continuative-ca",
          nemi: "continuative-nemi",
          "ya-uh": "departure-ya-uh",
          "huāl-la-uh": "hither-coming-huāl-la-uh",
          "huī-tz": variant === "huītz-carry"
            ? "typed-carry-connectiveless-huītz"
            : "coming-huī-tz",
          ahci: "arrival-ahci",
          mani: "area-or-group-stance-mani",
          ihca: "standing-state-ihca",
          o: "recumbent-state-o",
          "ē-hua": "beginning-or-rapid-departure-ē-hua",
          quiza: "rapid-or-abrupt-quiza",
          huetzi: "falling-or-rapid-abrupt-huetzi",
          tlehcō: "ascending-tlehcō",
          "cal-aqui": "entering-cal-aqui",
          "pil-ca": "suspended-state-pil-ca",
          "m-o-cāhua": "reflexive-stop-or-result-state-cāhua",
          "m-o-tēca": "reflexive-settle-begin-or-recumbent-tēca",
          "m-o-tlāl-i-ā": "reflexive-sit-settle-or-begin-tlāl-i-ā",
          "m-o-man-a": "reflexive-gradual-or-standing-man-a",
          "m-o-quetza": "reflexive-gradual-quetza"
        })[matrixStem] || "open-typed-intransitive-matrix",
        matrixReadingOptions: freeze(
          variant === "shared-object"
            ? SHARED_OBJECT_MATRIX_READINGS[matrixStem] || []
            : REFLEXIVE_MATRIX_READINGS[matrixStem] || ({
          ca: ["be-in-the-act-of", "remain-engaged-in-begun-event"],
          nemi: ["go-along-doing", "spend-time-doing", "continue-doing"],
          "ya-uh": ["go-away-doing", "go-doing", "do-and-leave"],
          "huāl-la-uh": ["come-while-doing", "come-along-doing"],
          "huī-tz": variant === "huītz-carry"
            ? ["come-carrying", "go-carrying"]
            : ["come-doing", "come-in-a-state"],
          ahci: ["arrive-doing", "arrive-in-a-state"],
          mani: [
            "go-along-happening", "happen-all-around-an-area",
            "extend-over-an-area-in-a-state", "stand-as-a-group-doing"
          ],
          ihca: ["stand-doing", "stand-in-a-state", "result-state-standing"],
          o: [
            "lie-stretched-out-doing", "lie-stretched-out-in-a-state",
            "lie-broken", "be-recumbent"
          ],
          "ē-hua": [
            "move-or-start-into-action", "begin-doing", "do-quickly",
            "get-up-and-go-away", "leave-and-depart"
          ],
          quiza: [
            "do-quickly", "do-abruptly", "burst-forth",
            "leave-abruptly", "snatch"
          ],
          huetzi: [
            "do-quickly", "do-abruptly", "fall", "plunge",
            "snatch", "die-and-fall", "fall-and-then-die",
            "die-from-a-fall", "die-suddenly"
          ],
          tlehcō: ["ascend", "climb-up-at-a-run"],
          "cal-aqui": [
            "house-enter", "enter", "enter-at-a-run", "enter-swiftly"
          ],
          "pil-ca": [
            "hang", "be-suspended", "sleep-with-head-hanging-down"
          ]
        })[matrixStem] || []),
        sharedObjectCompositionSelected: variant === "shared-object",
        sharedObjectEmbedAndMatrixTransitive: variant === "shared-object",
        sharedObjectCoreferenceVerified,
        sharedObjectKind: variant === "shared-object"
          ? text(request.objectKind || request.sourceValence)
          : "",
        sharedObjectPerson: variant === "shared-object"
          ? text(request.objectPerson)
          : "",
        sharedObjectNumber: variant === "shared-object"
          ? text(request.objectNumber)
          : "",
        sharedObjectManifestationCount: variant === "shared-object" ? 1 : 0,
        sharedObjectCarrierSite: variant === "shared-object" ? "embed" : "",
        matrixSharedObjectCarrierSuppressed: variant === "shared-object",
        sharedObjectReflexiveOrProjectivePreserved:
          variant === "shared-object",
        sharedObjectOtherParticipantsRemainDistinct:
          variant === "shared-object",
        sharedObjectReferentChoiceRequired: variant === "shared-object"
          && objectFramePositions(sharedEmbedObjectFrame).length > 1,
        sharedObjectReferentResolvedByTypedSource: variant === "shared-object"
          && objectFramePositions(sharedEmbedObjectFrame).length === 1,
        sharedObjectExamplesNonexhaustive: variant === "shared-object",
        sharedObjectMatrixStemWhitelistUsed: false,
        sharedObjectEHuaClassAEmbedAutomatic: variant === "shared-object"
          && sourceStem === "ē-hua",
        sharedObjectEmbedClass: variant === "shared-object"
          && sourceStem === "ē-hua"
          ? text(baseApplicationFrame?.normalizedRequest?.verbClass).toUpperCase()
          : "",
        sharedObjectPluralAllowsDistributiveReading: variant === "shared-object"
          && /pl$/u.test(text(request.objectPerson || request.objectNumber)),
        matrixSemanticDomain: ({
          "huāl-la-uh": "directed-coming",
          "huī-tz": variant === "huītz-carry"
            ? "typed-carry-motion"
            : "coming",
          ahci: "arrival",
          mani: "area-or-group-stance",
          ihca: "standing-state",
          o: "recumbent-state",
          "ē-hua": "beginning-or-rapid-departure",
          quiza: "rapid-or-abrupt-motion",
          huetzi: "falling-or-sudden-motion",
          tlehcō: "ascent",
          "cal-aqui": "entering",
          "pil-ca": "suspended-state",
          "m-o-cāhua": "stopping-or-result-state",
          "m-o-tēca": "settling-beginning-or-recumbent-state",
          "m-o-tlāl-i-ā": "sitting-settling-or-beginning",
          "m-o-man-a": "gradual-change-or-standing-position",
          "m-o-quetza": "gradual-development"
        })[matrixStem] || "",
        oLocativeOnOmitted: matrixStem === "o",
        omittedMatrixLocative: matrixStem === "o" ? "on" : "",
        matrixLocativeRealization: matrixStem === "o" ? "" : "not-applicable",
        eHuaClassHistoryChoiceAvailable: matrixStem === "ē-hua",
        eHuaLicensedMatrixClasses: matrixStem === "ē-hua"
          ? freeze(["A", "B"])
          : freeze([]),
        eHuaSelectedMatrixClass: matrixStem === "ē-hua" ? targetClass : "",
        eHuaPerfectiveClassAlternants: matrixStem === "ē-hua"
          ? freeze(["ē-hua", "e-uh"])
          : freeze([]),
        rapidOrAbruptReadingIsCueOnly:
          ["ē-hua", "quiza", "huetzi", "cal-aqui"].includes(matrixStem),
        huetziBasicFallReadingAvailable: matrixStem === "huetzi",
        huetziRapidAbruptReadingAvailable: matrixStem === "huetzi",
        huetziReversedEventReadingAvailable: matrixStem === "huetzi",
        huetziCausalFallReadingAvailable: matrixStem === "huetzi",
        hualDirectionalRetained: matrixStem === "huāl-la-uh"
          && /huāl/u.test(realizedMatrixStem),
        retainedMatrixDirectional: matrixStem === "huāl-la-uh"
          ? "huāl"
          : "",
        ordinaryHuītzConnectiveSelected: matrixStem === "huī-tz"
          && variant !== "huītz-carry",
        carryAnalysisSelected: variant === "huītz-carry",
        selectedMatrixAnalysis: variant === "future-embed"
          ? operationFacts.futureMatrixAnalysisId
          : variant === "huītz-carry"
            ? "special-carry-connectiveless"
            : "ordinary-connective-t",
        ordinaryVersusCarryAnalysisIsTypedChoice: matrixStem === "huī-tz",
        matrixAnalysisDoesNotWhitelistSourceStem: true,
        embedFiniteCoordinate: variant === "future-embed"
          ? "indicative-future"
          : "indicative-preterit-zero",
        matrixSuppliesFiniteMoodAndTense: true,
        embedFiniteCoordinateDecoupled:
          internalContext.compoundEmbedFiniteCoordinateDecoupled === true,
        caSuppletiveFiniteStemDerived: matrixStem === "ca"
          ? realizedMatrixStem
          : "",
        yaPresentSingularUh: matrixStem === "ya-uh"
          && key(request.mood || "indicative") === "indicative"
          && key(request.tense || "present") === "present"
          && !/pl$/u.test(text(request.subject || "3sg"))
          && realizedMatrixStem === "uh",
        yaPresentPluralHui: matrixStem === "ya-uh"
          && key(request.mood || "indicative") === "indicative"
          && key(request.tense || "present") === "present"
          && /pl$/u.test(text(request.subject || "3sg"))
          && realizedMatrixStem === "hui",
        yaSyncopationAvailable: matrixStem === "ya-uh"
          && /^(?:yā|ya|yah)$/u.test(matrixPredicateStem),
        yaSyncopationSelected: matrixStem === "ya-uh"
          && request.compoundYaSyncopation === true,
        yaUnsyncopatedSequence: matrixStem === "ya-uh"
          && /^(?:yā|ya|yah)$/u.test(matrixPredicateStem)
          ? `ti-${matrixPredicateStem}`
          : "",
        yaSyncopatedSequence: matrixStem === "ya-uh"
          && /^(?:yā|ya|yah)$/u.test(matrixPredicateStem)
          ? matrixPredicateStem === "yah" ? "t-ah" : "t-ā"
          : "",
        connectiveCausativeStructurallyDistinct: true,
        traditionalSpellingMayNeutralizeDistinction: matrixStem === "ya-uh",
        traditionalSpellingAnalysisChoices: matrixStem === "ya-uh"
          ? freeze(["connective-t", "causative"])
          : freeze([]),
        eHuaCaIdiomaticReadingAvailable: sourceStem === "ē-hua"
          && matrixStem === "ca",
        embedTenseMorph: variant === "future-embed" ? "z" : "0",
        embedPerfectiveRequired: variant !== "future-embed",
        connectiveAllomorph: variant === "future-embed" || variant === "huītz-carry"
          ? ""
          : request.compoundYaSyncopation === true
            ? "t"
            : connectiveFor(realizedMatrixStem),
        connectiveCondition: variant === "future-embed" || variant === "huītz-carry"
          ? "not-applicable"
          : request.compoundYaSyncopation === true
            ? "optional-ti-ya-syncopation"
          : new RegExp(`^[${vowels}]`, "iu").test(realizedMatrixStem)
            ? "t-before-vowel"
            : "ti-before-consonant",
        connectiveSupportiveI: variant !== "future-embed"
          && variant !== "huītz-carry"
          && request.compoundYaSyncopation !== true
          && connectiveFor(realizedMatrixStem) === "ti",
        linkedCompartmentalization: variant !== "future-embed",
        availableEventTimeReadings: variant === "future-embed"
          ? freeze(["future-embed-action-after-matrix-action"])
          : freeze([
            "embed-completed-before-matrix",
            "embed-begun-before-and-continuing-with-matrix"
          ]),
        translationDoesNotAuthorizeGrammar: true,
        specialPerfectiveEmbedDerived:
          ["ca", "ya-uh", "itt-a", "itz"].includes(sourceStem),
        specialPerfectiveEmbedSource: sourceStem,
        specialPerfectiveEmbedResult: perfective,
        caToYeEmbedAlternation: sourceStem === "ca" && perfective === "ye",
        yauhToYahEmbedAlternation:
          sourceStem === "ya-uh" && perfective === "yah",
        ittaToItzEmbedAlternation:
          sourceStem === "itt-a" && perfective === "itz",
        itzEmbedSense: sourceStem === "itz"
          ? selectedItzSense
          : sourceStem === "itt-a"
            ? "observational"
            : sourceStem === "huī-tz" && perfective === "itz"
              ? "motion"
              : "",
        itzSourceAnalysis: sourceStem === "itz"
          ? selectedItzSense === "motion"
            ? "compound-only-motion-itz"
            : "observational-itz"
          : sourceStem === "itt-a"
            ? "transitive-itta-observational"
            : "",
        itzHomophonesRemainDistinct: sourceStem === "itz"
          || sourceStem === "itt-a",
        itzSourceAnalysisIsUserChoice: sourceStem === "itz",
        cacNonanimateReferenceRequired: sourceStem === "cac",
        cacSubjectAnimacy: sourceStem === "cac" ? "nonanimate" : "",
        cacAnimacyConsequenceAutomatic: sourceStem === "cac",
        cacReadingOptions: sourceStem === "cac"
          ? freeze([
            "be-quiet", "be-calm", "be-alone", "be-deserted",
            "stand-abandoned", "lie-silent", "fall-silent",
            "become-fair-weather"
          ])
          : freeze([]),
        recursiveEmbed: Boolean(recursiveEmbedFrame),
        recursiveMatrix: Boolean(recursiveMatrixFrame),
        recursiveEmbedFrame,
        recursiveMatrixFrame,
        recursiveCompoundAuthorized:
          Boolean(recursiveEmbedFrame || recursiveMatrixFrame),
        recursiveResultRole: recursiveEmbedFrame
          ? "embed"
          : recursiveMatrixFrame
            ? "matrix"
            : "",
        recursiveRoleIsUserChoice:
          Boolean(recursiveEmbedFrame || recursiveMatrixFrame),
        recursiveBinaryConstituentCount:
          recursiveEmbedFrame || recursiveMatrixFrame ? 2 : 0,
        recursiveHierarchyAcyclic: recursiveHierarchy.acyclic,
        recursiveHierarchyValidated:
          Boolean(recursiveEmbedFrame || recursiveMatrixFrame),
        recursiveConstituentsDistinct:
          recursiveHierarchy.distinctConstituents,
        recursiveDepth: recursiveEmbedFrame || recursiveMatrixFrame
          ? recursiveHierarchy.maximumDepth + 1
          : 0,
        recursiveSourceLinksPreserved:
          Boolean(recursiveEmbedFrame || recursiveMatrixFrame),
        recursiveLocalRulesIndependent:
          Boolean(recursiveEmbedFrame || recursiveMatrixFrame),
        recursiveLocalConnectiveDerived:
          Boolean(recursiveEmbedFrame || recursiveMatrixFrame),
        recursiveValenceInheritedFromOuterEmbed:
          Boolean(recursiveEmbedFrame || recursiveMatrixFrame),
        recursiveParticipantsPreserved:
          Boolean(recursiveEmbedFrame || recursiveMatrixFrame),
        recursiveFiniteBoundaryOutsideCompletedCompound:
          Boolean(recursiveEmbedFrame || recursiveMatrixFrame),
        recursiveContinuationAvailable:
          Boolean(recursiveEmbedFrame || recursiveMatrixFrame),
        recursiveExampleStemWhitelistUsed: false,
        recursiveManualDepthControlRequired: false,
        recursiveManualConnectiveControlRequired: false,
        recursiveManualParticipantCopyingRequired: false,
        eventOrder: selectedEventOrder,
        reversedEventOrderLicensed,
        reversedEventOrderMatrices: freeze(["huetzi", "ahci"]),
        motionItzEHuaReversalLicensed:
          matrixStem === "ē-hua"
          && sourceStem === "itz"
          && selectedItzSense === "motion",
        reversedEventOrderSelected:
          selectedEventOrder === "hysteron-proteron",
        interpretedFirstEvent: selectedEventOrder === "hysteron-proteron"
          ? "matrix"
          : "embed",
        interpretedSecondEvent: selectedEventOrder === "hysteron-proteron"
          ? "embed"
          : "matrix",
        surfaceConstituentOrder: "embed-before-matrix",
        eventOrderChoiceChangesInterpretationOnly: true,
        compoundVoice: requestedCompoundVoice,
        nonactiveScope: requestedNonactiveScope,
        passiveScopeOptions: freeze(["embed", "both"]),
        impersonalScopeOptions: freeze(["embed", "matrix", "both"]),
        embedNonactiveApplied: ["embed", "both"].includes(
          requestedNonactiveScope
        ),
        matrixNonactiveApplied: ["matrix", "both"].includes(
          requestedNonactiveScope
        ),
        embedNonactiveOperation: ["embed", "both"].includes(
          requestedNonactiveScope
        ) ? selectedEmbedVoiceOperation : "active",
        matrixNonactiveOperation: ["matrix", "both"].includes(
          requestedNonactiveScope
        ) ? key(
          internalContext.matrixApplicationFrame?.controlFrame
            ?.selectedVoiceOperation
          || internalContext.matrixApplicationFrame?.controlFrame
            ?.selectedVoice
          || "impersonal"
        ) : "active",
        nonactiveScopeChangesParticipantTopology: requestedNonactiveScope
          !== "none",
        nonactiveResultValence: targetValence,
        stativeMatrixPrefersEmbedOnly: [
          "ca", "mani", "ihca", "o", "pil-ca"
        ].includes(matrixStem),
        stativeMatrixPreferenceIsNotAbsolute: [
          "ca", "mani", "ihca", "o", "pil-ca"
        ].includes(matrixStem),
        tlaImpersonalMustRemainOnEmbed:
          selectedEmbedVoiceOperation === "tla-impersonal",
        tlaImpersonalCarrier: selectedEmbedVoiceOperation === "tla-impersonal"
          ? "embed"
          : "",
        nonactiveSuffixesDerivedAutomatically: requestedNonactiveScope
          !== "none"
      };
      if (recursiveEmbedFrame || recursiveMatrixFrame) {
        ruleFamily = "compound-recursion";
      }
    } else if (operation === "purposive") {
      const purposiveRecursiveHierarchy = analyzeRecursiveCompoundHierarchy(
        recursiveEmbedFrame,
        null
      );
      if (purposiveRecursiveHierarchy.authorizationStatus !== "authorized") {
        return blockedOperation(
          request,
          purposiveRecursiveHierarchy.blockReason,
          "purposive-recursion"
        );
      }
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
        "outbound-nonpast-indicative": plural ? "t-ī-hui" : "t-ī-uh",
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
      const earlySingularGlottal =
        request.purposiveEarlySingularGlottal === true;
      if (earlySingularGlottal
        && (plural || series !== "outbound-nonpast-optative")) {
        return blockedOperation(
          request,
          "early-singular-glottal-is-outbound-singular-optative-only",
          "purposive-paradigm"
        );
      }
      const purposiveFutureEmbedShapeFrame = baseIsNonactive
        ? null
        : futureEmbedShapeFrame(sourceStem, targetClass, request.subject);
      const purposiveEmbedStem = baseIsNonactive
        ? text(baseTyped.slots?.predicate?.stem)
        : text(purposiveFutureEmbedShapeFrame?.selectedStemVariant);
      const soundedFutureMorph = request.purposiveSoundedFutureMorph === true;
      const embedFutureMorph = soundedFutureMorph ? "z" : "⎕";
      targetStem = earlySingularGlottal
        ? `${purposiveEmbedStem}-${embedFutureMorph}-h`
        : `${purposiveEmbedStem}-${embedFutureMorph}-${matrixShape}`;
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
        embedFutureMorph,
        ordinaryEmbedFutureMorph: "⎕",
        soundedFutureMorph: "z",
        soundedFutureMorphSelected: soundedFutureMorph,
        soundedFutureMorphMarkedRare: true,
        soundedFutureMorphStyleStatus: "rare-nonpreferred-textual-variant",
        futureEmbedClassShapePreserved: true,
        futureEmbedSourceStem: sourceStem,
        futureEmbedPredicateStem: purposiveEmbedStem,
        futureEmbedSelectedShape:
          text(purposiveFutureEmbedShapeFrame?.selectedShape),
        futureEmbedSelectedShapeReason:
          text(purposiveFutureEmbedShapeFrame?.selectedShapeReason),
        futureEmbedUnderlyingStem:
          text(purposiveFutureEmbedShapeFrame?.underlyingStemVariant),
        futureEmbedSilentClassCarrier:
          text(purposiveFutureEmbedShapeFrame?.silentCarrier),
        futureEmbedUsesSharedLesson7ShapeOwner:
          purposiveFutureEmbedShapeFrame?.kind
            === "classical-nahuatl-verbstem-imperfective-shape-eligibility-frame"
          && purposiveFutureEmbedShapeFrame.authorizationStatus
            === "authorized",
        matrixValence: "intransitive",
        matrixDirectionalMorpheme: direction === "inbound" ? "/k/" : "t",
        matrixDirectionalSpellings: direction === "inbound" ? ["c", "qu"] : ["t"],
        matrixDirectionalSpellingDerived: true,
        directionalChoiceComesFromSeries: true,
        duplicateDirectionControlRequired: false,
        futureMorphPrecedesInternalDirectional: true,
        internalDirectionalNotConnective: true,
        internalDirectionalNotExternal: true,
        archaicDirectionalPurposiveOnly: true,
        matrixDirectionalMorph: direction === "inbound" ? "c/qu" : "t",
        matrixBaseStem: series === "outbound-past-indicative"
          || series === "inbound-nonfuture-indicative"
          ? "o"
          : "i",
        purposeMotionBaseMeaning: "move-purposefully",
        imperfectiveNumberPartner: plural ? "hui" : "uh",
        perfectiveBaseDistinctFromOnO: true,
        licensedPurposiveSeries: Object.keys(matrixShapes),
        seriesIsSingleUserChoice: true,
        noStemWhitelist: true,
        matrixTenseMeaning: ({
          "outbound-nonpast-indicative": "nonpast",
          "outbound-past-indicative": "past",
          "outbound-nonpast-optative": "nonpast",
          "inbound-nonfuture-indicative": "nonfuture",
          "inbound-future-indicative": "future",
          "inbound-nonpast-optative": "nonpast"
        })[series],
        licensedReadingRange: ({
          "outbound-nonpast-indicative": ["present", "future"],
          "outbound-past-indicative": ["simple-past", "habitual-past", "anterior-past"],
          "outbound-nonpast-optative": ["command", "exhortation", "wish", "self-encouragement", "self-suggestion"],
          "inbound-nonfuture-indicative": [
            "present", "preterit", "imperfect", "distant-past"
          ],
          "inbound-future-indicative": ["future"],
          "inbound-nonpast-optative": [
            "command", "exhortation", "wish", "self-encouragement", "self-suggestion"
          ]
        })[series],
        readingRangeIsContextualNotAnotherFormChoice: true,
        finiteTenseMorph: "0",
        numberMorph: plural
          ? request.purposiveIrregularPluralN === true ? "n" : "h"
          : "0",
        movementPrecedesPurposeAction: true,
        purposeActionBeginsAfterMovement: true,
        progressiveActionOverlapsMovement: false,
        progressiveContrast: series === "outbound-nonpast-indicative"
          ? {
            purposiveInternalDirectional: "t",
            progressiveExternalConnective: "ti",
            purposiveEmbedTense: "future",
            progressiveEmbedTense: "preterit",
            traditionalUnmarkedTextMayBeAmbiguous:
              ["A", "C", "D"].includes(targetClass),
            classBShapeRemainsDistinct: targetClass === "B",
            analysisChoiceRequiredOnlyWhenTypedTextIsUnderspecified: true,
            spellingAloneHasGrammarAuthority: false
          }
          : null,
        ordinaryAntecessiveAvailable:
          series === "outbound-past-indicative"
          || series === "inbound-nonfuture-indicative",
        ordinaryAntecessiveSelected:
          (series === "outbound-past-indicative"
          || series === "inbound-nonfuture-indicative")
          && Boolean(
            request.sentenceAntecessive === true
            || request.antecessive === true
            || request.requestedPrefixStackMode === "antecessive"
            || request.prefixStackMode === "antecessive"
          ),
        inboundInternalHitherDirectional:
          direction === "inbound" ? "/k/" : "",
        inboundInternalHitherDistinctFromExternalHual:
          direction === "inbound",
        inboundNonfutureAntecessiveScope:
          series === "inbound-nonfuture-indicative"
            ? "past-act-of-purposing-not-intended-action"
            : "",
        inboundNonfutureAntecessiveMayAccompanyPresentReading:
          series === "inbound-nonfuture-indicative",
        inboundFutureNumberShape:
          series === "inbound-future-indicative" ? matrixShape : "",
        inboundFutureNumberShapeDerived:
          series === "inbound-future-indicative",
        pastPurposiveNeverIntroducedByMa:
          series === "outbound-past-indicative",
        pastPurposiveHomographContrast:
          series === "outbound-past-indicative"
            ? "connective-t-plus-on-o-optative"
            : "",
        pastPurposiveAnalysisUsesTypedStructureAndMaContext:
          series === "outbound-past-indicative",
        optativeLetReadingIsPermissive: false,
        optativeMayExpressSelfEncouragement:
          series === "outbound-nonpast-optative"
          || series === "inbound-nonpast-optative",
        optativeMayExpressSelfSuggestion:
          series === "outbound-nonpast-optative"
          || series === "inbound-nonpast-optative",
        secondPersonPers1DerivedByFiniteGrammar:
          series === "outbound-nonpast-optative",
        purposiveOptativeDistinctFromAdmonitive:
          series === "outbound-nonpast-optative",
        purposiveOptativeMatrixEnding:
          series === "outbound-nonpast-optative"
            ? request.purposiveIrregularPluralN === true ? "t-ī+0-n" : "t-i+0-h/0"
            : "",
        admonitiveContrastEnding:
          series === "outbound-nonpast-optative" ? "perfective+h/0+t-ih/t-in" : "",
        traditionalUnmarkedOptativeMayBeAmbiguous:
          series === "outbound-nonpast-optative",
        optativeAnalysisChoiceRequiredOnlyWhenTypedTextIsUnderspecified:
          series === "outbound-nonpast-optative",
        earlySingularGlottalSelected: earlySingularGlottal,
        earlySingularGlottalMorph: earlySingularGlottal ? "h" : "",
        earlySingularGlottalMarkedAberrant: true,
        earlySingularGlottalReplacesTi: earlySingularGlottal,
        ordinarySingularTiRemainsPreferred: true,
        nonactiveEmbedAuthorized: baseIsNonactive,
        nonactiveEmbedVoice: baseIsNonactive ? selectedBaseVoice : "",
        nonactiveEmbedStem: baseIsNonactive ? purposiveEmbedStem : "",
        nonactiveEmbedVoices: freeze(["passive", "impersonal"]),
        nonactiveEmbedVoicePreserved: baseIsNonactive,
        nonactiveEmbedParticipantTopologyPreserved: baseIsNonactive,
        nonactiveEmbedValencePreserved: baseIsNonactive,
        nonactiveEmbedFutureBoundaryOutsideStem: baseIsNonactive,
        nonactiveEmbedUsesSharedFutureEmbedPath: baseIsNonactive,
        nonactiveEmbedNegativeParticlesRemainSentenceExternal: baseIsNonactive,
        nonactiveEmbedExampleWhitelistUsed: false,
        recursiveEmbedAuthorized: Boolean(recursiveEmbedFrame),
        recursiveEmbedFrame,
        recursiveEmbedSourceOperation:
          recursiveEmbedFrame?.operationFrame?.operation || "",
        recursiveEmbedStem: recursiveEmbedFrame
          ? purposiveEmbedStem
          : "",
        recursiveEmbedFramePreserved: Boolean(recursiveEmbedFrame),
        recursiveEmbedInternalStructurePreserved:
          Boolean(recursiveEmbedFrame),
        recursiveEmbedParticipantsPreserved: Boolean(recursiveEmbedFrame),
        recursiveEmbedValencePreserved: Boolean(recursiveEmbedFrame),
        recursiveEmbedVoicePreserved: Boolean(recursiveEmbedFrame),
        recursiveEmbedEventRelationPreserved: Boolean(recursiveEmbedFrame),
        recursivePurposiveBoundaryOutsideCompletedResult:
          Boolean(recursiveEmbedFrame),
        recursiveCompoundEmbedAuthorized: Boolean(
          recursiveEmbedFrame?.operationFrame?.operation === "compound"
        ),
        recursiveCompoundEmbedStem:
          recursiveEmbedFrame?.operationFrame?.operation === "compound"
            ? purposiveEmbedStem
            : "",
        recursiveCompoundEmbedFramePreserved: Boolean(
          recursiveEmbedFrame?.operationFrame?.operation === "compound"
        ),
        recursiveCompoundInternalStructurePreserved: Boolean(
          recursiveEmbedFrame?.operationFrame?.operation === "compound"
        ),
        recursiveCompoundParticipantsPreserved: Boolean(
          recursiveEmbedFrame?.operationFrame?.operation === "compound"
        ),
        recursiveCompoundValencePreserved: Boolean(
          recursiveEmbedFrame?.operationFrame?.operation === "compound"
        ),
        recursiveCompoundVoicePreserved: Boolean(
          recursiveEmbedFrame?.operationFrame?.operation === "compound"
        ),
        recursiveCompoundEventRelationPreserved: Boolean(
          recursiveEmbedFrame?.operationFrame?.operation === "compound"
        ),
        recursivePurposiveBoundaryOutsideCompletedCompound: Boolean(
          recursiveEmbedFrame?.operationFrame?.operation === "compound"
        ),
        recursivePurposiveHierarchyAcyclic:
          purposiveRecursiveHierarchy.acyclic,
        recursivePurposiveContinuationAvailable: Boolean(recursiveEmbedFrame),
        recursivePurposiveExampleTemplateUsed: false,
        matrixDirectionalInsideStem: true,
        irregularPluralN: request.purposiveIrregularPluralN === true,
        externalDirectional,
        externalDirectionalSelected: externalDirectional !== "none",
        externalDirectionalMeaning: externalDirectional === "on"
          ? "away-thither-there"
          : externalDirectional === "huāl"
            ? "hither"
            : "",
        externalDirectionalOutsideCompletedPurposive:
          externalDirectional !== "none",
        externalDirectionalIndependentFromInternal:
          externalDirectional !== "none",
        externalDirectionalRelation: externalDirectional === "none"
          ? "none"
          : (externalDirectional === "on" && direction === "outbound")
            || (externalDirectional === "huāl" && direction === "inbound")
            ? "matching"
            : "mismatching",
        externalDirectionalMayContinueOrIntensifyMovement:
          externalDirectional !== "none",
        embedAndMatrixActionsRemainSeparate: true,
        ordinaryExternalDirectionalCanCarryPurposiveReading: true,
        ordinaryExternalDirectionalPathRemainsDistinct: true,
        formalPurposiveCounterpartAvailable: true,
        fulfilledPurposeReadingAvailable: true,
        metaphoricalMovementReadingAvailable: true,
        mutedIntentionReadingAvailable: true,
        purposiveInterpretationReadings: freeze([
          "intended-purpose", "fulfilled-purpose",
          "metaphorical-movement", "muted-intention"
        ]),
        interpretationIsContextualNotFormChoice: true,
        translationHasGrammarAuthority: false,
        callerPurposiveDirectionAuthority: false
      };
    } else {
      const subject = key(request.subject);
      const requestedHonoredParticipant = key(
        request.honoredParticipant || "subject"
      );
      const honorificSourceTypedFrame =
        internalContext.attitudeSourceClosureFrame?.finalTypedVncSlotFrame
        || getBaseTypedFrame(internalContext.honorificSourceApplicationFrame);
      const sourceTypedObjectFrame = cloneObjectFrameFromTyped(
        honorificSourceTypedFrame || baseTyped
      );
      const canonicalSourceObjectRequests = Array.isArray(
        internalContext.attitudeSourceClosureFrame
          ?.normalizedRequest?.sourceObjectRequests
      )
        ? internalContext.attitudeSourceClosureFrame
          .normalizedRequest.sourceObjectRequests
        : Array.isArray(internalContext.honorificSourceApplicationFrame
          ?.normalizedRequest?.sourceObjectRequests
        ) ? internalContext.honorificSourceApplicationFrame
          .normalizedRequest.sourceObjectRequests
          : [];
      const requestedSourceObjectNumbers = Array.isArray(
        request.sourceObjectRequests
      )
        ? request.sourceObjectRequests
        : [];
      const sourceObjectPositions = objectFramePositions(
        sourceTypedObjectFrame
      ).map((position, index) => {
        const canonicalRequest = canonicalSourceObjectRequests[index] || {};
        const numberedRequest = requestedSourceObjectNumbers.find(candidate => (
          text(candidate?.objectId) === text(canonicalRequest.objectId)
        )) || requestedSourceObjectNumbers[index] || {};
        return {
          ...position,
          objectId: text(position.objectId || canonicalRequest.objectId),
          objectKind: text(
            position.objectKind || canonicalRequest.objectKind
          ),
          objectPerson: text(
            position.objectPerson || canonicalRequest.objectPerson
          ),
          objectNumber: text(
            position.objectNumber
            || numberedRequest.objectNumber
            || request.objectNumber
          ),
          governor: text(position.governor || canonicalRequest.governor),
          derivationalLevel: Number(
            position.derivationalLevel
            || canonicalRequest.derivationalLevel
            || index + 1
          ),
        };
      });
      const sourceObjectFrame = sourceObjectPositions.length > 1
        ? {
            ...sourceTypedObjectFrame,
            valenceArity: "multiple",
            positions: sourceObjectPositions,
          }
        : sourceObjectPositions.length === 1
          ? {
              ...sourceTypedObjectFrame,
              ...sourceObjectPositions[0],
            }
          : sourceTypedObjectFrame;
      const sourceProjectiveObjectPositions = objectFramePositions(
        sourceObjectFrame
      ).filter(isProjectiveHonorificObjectPosition);
      const honorEligibleObjectPositions = sourceProjectiveObjectPositions
        .filter(position => !/^1/u.test(text(position.objectPerson)));
      const sourceHasProjectivePatient =
        sourceProjectiveObjectPositions.length > 0;
      const sourceHasHonorEligibleObject =
        honorEligibleObjectPositions.length > 0;
      const firstPersonSubject = /^1/u.test(subject);
      const possibleHonoredParticipants = [
        ...(!firstPersonSubject ? ["subject"] : []),
        ...(sourceHasHonorEligibleObject ? ["object"] : []),
      ];
      const possibleDisparagedParticipants = [
        "subject",
        ...(sourceHasProjectivePatient ? ["object"] : []),
      ];
      let honoredParticipant = operation === "pejorative"
        ? requestedHonoredParticipant
        : firstPersonSubject && sourceHasHonorEligibleObject
          ? "object"
          : requestedHonoredParticipant;
      const inheritedReverentialParticipant = key(
        internalContext.attitudeSourceClosureFrame?.operationFrame
          ?.operationFacts?.honoredParticipant
      );
      if (operation === "reverential"
        && inheritedReverentialParticipant
        && requestedHonoredParticipant !== inheritedReverentialParticipant) {
        return blockedOperation(
          request,
          "reverential-participant-must-match-honorific-source",
          "reverential-double"
        );
      }
      if (operation === "reverential"
        && inheritedReverentialParticipant) {
        honoredParticipant = inheritedReverentialParticipant;
      }
      const selectedHonoredObjectPosition = honoredParticipant === "object"
        && honorEligibleObjectPositions.length === 1
        ? honorEligibleObjectPositions[0]
        : null;
      const ownerIssuedDerivedSourceApplicationFrame =
        internalContext.ownerIssuedDerivedSourceApplicationFrame || null;
      const derivedSourceKind = key(internalContext.sourceDerivationKind);
      const derivedSourceHonorific = Boolean(
        ownerIssuedDerivedSourceApplicationFrame
        && ["causative", "applicative"].includes(derivedSourceKind)
        && operation === "honorific"
        && variant === "applicative"
      );
      const sourceHasMainlineReflexive =
        Array.isArray(baseTyped?.slots?.prePredicate)
        && baseTyped.slots.prePredicate.some(slot =>
          /reflexive/u.test(text(slot?.objectPositionFrame?.objectKind))
          || /^[mnt]-o$/u.test(text(slot?.carrier))
        );
      if ((operation === "honorific" || operation === "reverential")
        && firstPersonSubject
        && !sourceHasHonorEligibleObject
        && honoredParticipant !== "object") {
        return blockedOperation(request, "self-honorific-not-authorized", "honorific-gate");
      }
      if ((operation === "honorific" || operation === "reverential")
        && honoredParticipant === "object"
        && !sourceHasHonorEligibleObject) {
        return blockedOperation(
          request,
          "first-person-honorific-requires-projective-patient",
          "honorific-projective"
        );
      }
      if ((operation === "honorific" || operation === "reverential")
        && !possibleHonoredParticipants.includes(honoredParticipant)) {
        return blockedOperation(
          request,
          "honorific-participant-not-present-in-source",
          "honorific-gate"
        );
      }
      if (operation === "pejorative"
        && !possibleDisparagedParticipants.includes(honoredParticipant)) {
        return blockedOperation(
          request,
          "pejorative-participant-not-present-in-source",
          "pejorative-preterit-embed"
        );
      }
      const compoundTarget = key(internalContext.attitudeCompoundTarget);
      const compoundScopeBasis = key(
        internalContext.attitudeCompoundScopeBasis,
      );
      const compoundLexicalizationAnalysisFrame =
        internalContext.compoundLexicalizationAnalysisFrame || null;
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
        if (compoundLexicalizationAnalysisFrame?.authorizationStatus
          !== "authorized") {
          return blockedOperation(
            request,
            compoundLexicalizationAnalysisFrame?.blockReason
              || "authorized-compound-lexicalization-analysis-required",
            "attitude-compound",
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
        const transformedMemberObjectFrame = cloneObjectFrameFromTyped(
          attitudeTransformFrame.finalTypedVncSlotFrame,
        );
        const sourceCompoundObjectFrame =
          internalContext.attitudeSourceObjectFrame
          || cloneObjectFrameFromTyped(
            attitudeSourceFrame.finalTypedVncSlotFrame,
          );
        objectFrame = {
          ...(compoundTarget === "matrix"
            ? combineObjectFrames(
                sourceCompoundObjectFrame,
                transformedMemberObjectFrame,
              )
            : transformedMemberObjectFrame),
          stemRealization: targetStem
        };
        operationFacts = {
          compoundTarget,
          compoundScopeBasis,
          scopeDerivedAutomatically: true,
          directScopeChoiceExposed: false,
          connective: connector,
          compoundVariant: key(
            attitudeSourceFrame.operationFrame?.variant,
          ),
          sharedObjectMatrixTransform:
            compoundScopeBasis === "shared-object-compound",
          selectedCompoundStructure:
            compoundLexicalizationAnalysisFrame.selectedStructure,
          compoundStructureChoiceRequired:
            compoundLexicalizationAnalysisFrame.structureChoiceRequired,
          compoundStructureAutomaticallySelected:
            compoundLexicalizationAnalysisFrame.structureAutomaticallySelected,
          compoundLexicalMeaningId:
            compoundLexicalizationAnalysisFrame.lexicalMeaningId || "",
          compoundLexicalizationAnalysisFrame,
          sourceCompoundObjectFrame: freeze(sourceCompoundObjectFrame),
          transformedMemberObjectFrame: freeze(transformedMemberObjectFrame),
          completedCompoundObjectFrame: freeze({ ...objectFrame }),
          compoundObjectsPreserved:
            objectFramePositions(sourceCompoundObjectFrame).length
              <= objectFramePositions(objectFrame).length,
          typedCompoundSourceFrame: attitudeSourceFrame,
          typedMemberTransformationFrame: attitudeTransformFrame,
          typedMemberPerfectiveFrame:
            internalContext.attitudeMemberPerfectiveFrame || null,
          typedCompoundSourcePreserved: true,
          typedInternalBoundariesPreserved: true,
          outerSubjectPreserved: true,
          outerMoodPreserved: true,
          outerTensePreserved: true,
          exactExampleIdentityAuthority: false,
          callerAttitudeScopeAuthorityAccepted: false,
          callerFormulaAuthorityAccepted: false,
          callerSurfaceAuthorityAccepted: false,
        };
      } else if (operation === "honorific" && ["causative", "applicative"].includes(variant)) {
        const selected = baseMachinery?.targetStem || baseTyped?.slots?.predicate?.stem || sourceStem;
        const honorificAnalysis = internalContext
          .honorificFormationAnalysisFrame
          || buildHonorificFormationAnalysisFrame(request, sourceStem);
        if (
          honorificAnalysis?.authorizationStatus !== "authorized"
          || honorificAnalysis.selectedFormationLicensed !== true
        ) {
          return blockedOperation(
            request,
            honorificAnalysis?.blockReason
              || "honorific-formation-not-licensed-by-typed-source-analysis",
            variant === "applicative"
              ? "honorific-applicative"
              : "honorific-causative"
          );
        }
        if (honorificAnalysis.selectionLicensed !== true) {
          return blockedOperation(
            request,
            "licensed-honorific-stem-alternative-required",
            variant === "applicative"
              ? "honorific-applicative"
              : "honorific-causative"
          );
        }
        if (honorificAnalysis.moodRestriction === "no-optative"
          && key(request.mood) === "optative") {
          return blockedOperation(
            request,
            "huica-tz-honorific-has-no-optative",
            "honorific-irregular"
          );
        }
        const lexicalRealization = text(
          honorificAnalysis.selectedOption?.targetStem
        );
        if (!lexicalRealization && internalContext.honorificDerivationAttempted === true && internalContext.honorificDerived !== true) {
          return blockedOperation(request, internalContext.honorificDerivationBlockReason || "authorized-honorific-derivation-option-required", variant === "applicative" ? "honorific-applicative" : "honorific-causative");
        }
        targetStem = lexicalRealization || selected;
        if (lexicalRealization
          && variant === "applicative"
          && /(?:iā|i-ā)$/u.test(lexicalRealization)) {
          targetClass = "D";
        } else if (lexicalRealization && variant === "causative") {
          targetClass = "C";
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
        const canonicalDerivedObjectFrameBase =
          internalContext.honorificDerived === true
          ? {
              ...cloneObjectFrameFromTyped(
                getBaseTypedFrame(baseApplicationFrame)
              ),
              stemRealization: targetStem,
            }
          : sourceObjectFrame.valenceArity === "vacant"
          ? { ...reflexivePosition, stemRealization: targetStem }
          : sourceObjectFrame.valenceArity === "multiple"
            ? { valenceArity: "multiple", positions: [...sourceObjectFrame.positions, reflexivePosition], stemRealization: targetStem }
            : { valenceArity: "multiple", positions: [sourceObjectFrame, reflexivePosition], stemRealization: targetStem };
        const canonicalDerivedPositions = objectFramePositions(
          canonicalDerivedObjectFrameBase
        ).map(position => {
          if (!isProjectiveHonorificObjectPosition(position)) return position;
          const sourcePosition = sourceProjectiveObjectPositions.find(
            candidate => text(candidate.objectId) === text(position.objectId)
          ) || sourceProjectiveObjectPositions.find(candidate => (
            key(candidate.objectKind) === key(position.objectKind)
            && key(candidate.objectPerson) === key(position.objectPerson)
          ));
          return sourcePosition
            ? {
                ...position,
                objectNumber: sourcePosition.objectNumber,
              }
            : position;
        });
        const canonicalDerivedObjectFrame =
          canonicalDerivedPositions.length > 1
            ? {
                ...canonicalDerivedObjectFrameBase,
                valenceArity: "multiple",
                positions: canonicalDerivedPositions,
              }
            : canonicalDerivedObjectFrameBase;
        objectFrame = canonicalDerivedObjectFrame;
        const derivedObjectPositions = objectFramePositions(
          canonicalDerivedObjectFrame
        );
        const retainedProjectiveObjectPositions = derivedObjectPositions
          .filter(isProjectiveHonorificObjectPosition);
        const retainedDerivedSourceObjectPositions = derivedObjectPositions
          .filter(position => sourceObjectPositions.some(sourcePosition => (
            text(sourcePosition.objectId) === text(position.objectId)
          )));
        const derivedSourceLowerAgentPositions = sourceObjectPositions.filter(
          position => ["causative", "applicative"].includes(
            key(position.governor)
          )
        );
        const derivedSourceThemePositions = sourceObjectPositions.filter(
          position => key(position.governor) === "directive"
        );
        const derivedSourceNonspecificThemePositions =
          derivedSourceThemePositions.filter(position => [
            "nonspecific-human", "nonspecific-nonhuman",
            "projective-human", "projective-nonhuman",
          ].includes(key(position.objectKind)));
        const reflexiveBeneficiaryPosition = derivedObjectPositions.find(
          position => key(position?.objectKind) === "reflexive"
            && key(position?.governor) === "applicative"
        ) || null;
        const projectiveApplicativeHonorific = variant === "applicative"
          && sourceHasProjectivePatient;
        const projectiveCausativeHonorific = variant === "causative"
          && sourceHasProjectivePatient;
        const causativeReflexiveAgentPosition = derivedObjectPositions.find(
          position => key(position?.objectKind) === "reflexive"
            && key(position?.governor) === "causative"
        ) || null;
        operationFacts = {
          ...operationFacts,
          honorificFormationAnalysisFrame: honorificAnalysis,
          neutralSourcePreserved: true,
          sourceAgreementFrame,
          sourceMorphemicProfile: sourceAgreementFrame.morphemicSourceProfile,
          availableFormations: honorificAnalysis.availableFormations,
          selectedFormation: variant,
          preferredFormation: honorificAnalysis.preferredFormation,
          routeChoiceRequired: honorificAnalysis.routeChoiceRequired,
          formationAutomaticallySelected:
            honorificAnalysis.formationAutomaticallySelected,
          reflexiveRelationAutomatic: true,
          reflexiveCoreference: "result-subject",
          ownInterestReading: variant === "applicative",
          autonomousAgentCausativeReading: variant === "causative",
          honorificOnlyApplicative:
            honorificAnalysis.honorificOnlyApplicative,
          lexicalRealizationKind: text(
            honorificAnalysis.selectedOption?.realizationKind
          ),
          lexicalAlternativeChoiceRequired:
            honorificAnalysis.alternativeChoiceRequired,
          selectedLexicalAlternative:
            honorificAnalysis.selectedOptionId,
          documentedLexicalRealizationUsed:
            honorificAnalysis.documentedLexicalRealizationUsed,
          canvasExamplesAuthorizeRoute: false,
          englishHonorificMarkerIsReadingEvidenceOnly: true,
          projectiveApplicativeHonorific,
          projectiveCausativeHonorific,
          sourceHasProjectivePatient,
          sourceProjectiveObjectPositions,
          honorEligibleObjectPositions,
          retainedProjectiveObjectPositions,
          projectiveObjectsPreserved:
            projectiveApplicativeHonorific
            && retainedProjectiveObjectPositions.length
              === sourceProjectiveObjectPositions.length,
          projectiveObjectNumberAndRolesPreserved:
            projectiveApplicativeHonorific,
          projectiveCausativePatientPreserved:
            projectiveCausativeHonorific
            && retainedProjectiveObjectPositions.length
              === sourceProjectiveObjectPositions.length,
          projectiveCausativePatientNumberAndRolePreserved:
            projectiveCausativeHonorific
            && retainedProjectiveObjectPositions.every(position => (
              sourceProjectiveObjectPositions.some(sourcePosition => (
                text(sourcePosition.objectId) === text(position.objectId)
                && text(sourcePosition.objectKind)
                  === text(position.objectKind)
                && text(sourcePosition.objectPerson)
                  === text(position.objectPerson)
                && text(sourcePosition.objectNumber)
                  === text(position.objectNumber)
                && text(sourcePosition.governor)
                  === text(position.governor)
              ))
            )),
          causativeReflexiveAgentPosition,
          causativeReflexiveAgentAddedAutomatically:
            projectiveCausativeHonorific
            && Boolean(causativeReflexiveAgentPosition),
          causativeReflexiveAgentCoreferentialWithResultSubject:
            projectiveCausativeHonorific
            && Boolean(causativeReflexiveAgentPosition),
          literalSelfCausationReading: projectiveCausativeHonorific,
          agentOrPatientHonorificAmbiguity:
            projectiveCausativeHonorific
            && possibleHonoredParticipants.length > 1,
          typedHonorificFormationAnalysisSupplied:
            honorificAnalysis.analysisSupplied === true,
          routeMembershipWhitelistUsed: false,
          exactExampleStemRouteAuthority: false,
          reflexiveBeneficiaryPosition,
          reflexiveBeneficiaryAddedAutomatically:
            projectiveApplicativeHonorific
            && Boolean(reflexiveBeneficiaryPosition),
          literalOwnBenefitReading:
            projectiveApplicativeHonorific,
          possibleHonoredParticipants,
          selectedHonoredObjectPosition,
          honoredObjectChoiceRequired:
            honoredParticipant === "object"
            && honorEligibleObjectPositions.length > 1,
          honoredParticipantChoiceRequired:
            possibleHonoredParticipants.length > 1,
          honoredParticipantAutomaticallySelected:
            possibleHonoredParticipants.length === 1
              ? honoredParticipant
              : "",
          participantAmbiguityPreserved:
            possibleHonoredParticipants.length > 1,
          firstPersonSubjectForcesObjectHonorification:
            firstPersonSubject && sourceHasHonorEligibleObject,
          englishHonorificPlacementSelectsParticipant: false,
          derivedSourceHonorific,
          derivedSourceKind: derivedSourceHonorific ? derivedSourceKind : "",
          ownerIssuedDerivedSourceRequired: derivedSourceHonorific,
          ownerIssuedDerivedSourceRetained: derivedSourceHonorific,
          derivedSourceApplicationFrame: derivedSourceHonorific
            ? ownerIssuedDerivedSourceApplicationFrame
            : null,
          derivedSourceResultFrame: derivedSourceHonorific
            ? ownerIssuedDerivedSourceApplicationFrame.resultFrame
            : null,
          innerDerivationOperationFrame: derivedSourceHonorific
            ? ownerIssuedDerivedSourceApplicationFrame.resultFrame
              ?.derivationOperationFrame || null
            : null,
          innerDerivedSourceStem: derivedSourceHonorific
            ? text(honorificSourceTypedFrame?.slots?.predicate?.stem)
            : "",
          derivedSourceHigherAgent: derivedSourceHonorific
            ? subject
            : "",
          derivedSourceLowerAgentPositions: derivedSourceHonorific
            ? derivedSourceLowerAgentPositions
            : freeze([]),
          derivedSourceThemePositions: derivedSourceHonorific
            ? derivedSourceThemePositions
            : freeze([]),
          derivedSourceNonspecificThemePositions: derivedSourceHonorific
            ? derivedSourceNonspecificThemePositions
            : freeze([]),
          derivedSourceNonspecificThemeAllowsSingularOrPluralReading:
            derivedSourceHonorific
            && derivedSourceNonspecificThemePositions.length > 0,
          retainedDerivedSourceObjectPositions: derivedSourceHonorific
            ? retainedDerivedSourceObjectPositions
            : freeze([]),
          derivedSourceObjectsPreserved: derivedSourceHonorific
            && retainedDerivedSourceObjectPositions.length
              === sourceObjectPositions.length,
          derivedSourceBoundariesPreserved: derivedSourceHonorific
            && Boolean(
              ownerIssuedDerivedSourceApplicationFrame.resultFrame
                ?.derivationOperationFrame
            ),
          derivedSourceRebuiltFromFormula: false,
          derivedSourceFormulaAuthorityAccepted: false,
          derivedSourceSurfaceAuthorityAccepted: false,
          derivedSourceCanvasExampleAuthority: false,
        };
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
        const matrix = operation === "pejorative" ? "pōl-o-ā" : "tzin-o-ā";
        targetStem = `${perfective}-0-${matrix}`;
        targetClass = "C";
        ruleFamily = operation === "pejorative" ? "pejorative-preterit-embed" : operation === "reverential" ? "reverential-double" : "honorific-preterit-embed";
        if (operation === "honorific") {
          objectFrame = {
            ...cloneObjectFrameFromTyped(baseTyped),
            stemRealization: targetStem,
          };
          const retainedSourceObjects = objectFramePositions(objectFrame);
          operationFacts = {
            ...operationFacts,
            mainlineReflexivePreteritEmbedHonorific: true,
            sourceReflexiveTopology: "mainline-reflexive",
            mainlineReflexiveTopologySelectsRouteAutomatically: true,
            attitudeRouteChoiceRequired: false,
            userSelectsMatrix: false,
            userSelectsPerfectiveClassForm: false,
            userSelectsObjectReplacement: false,
            userSelectsCompoundBracketing: false,
            integratedCompoundPattern: true,
            futureEmbedParallel: true,
            embeddedPredicateAspect: "perfective",
            embeddedPredicateStem: perfective,
            embeddedPredicateVerbClass: text(
              baseApplicationFrame?.normalizedRequest?.verbClass
              || request.verbClass
            ).toUpperCase(),
            embeddedTense: "preterit",
            embeddedPreteritMorph: "0",
            embeddedPreteritMorphHasSurface: false,
            fixedAffectiveMatrix: "tla-(tzin-o-ā)",
            matrixStem: matrix,
            matrixSourceNounstem: "(tzin)-tli-",
            matrixFormationOwner: "§55.6",
            incorporatedPredicateReplacesMatrixSpecificObject: true,
            sourceObjectFrame,
            retainedSourceObjectPositions: retainedSourceObjects,
            sourceObjectPronounsPreserved:
              retainedSourceObjects.length === sourceObjectPositions.length,
            sourceParticipantsPreserved:
              retainedSourceObjects.length === sourceObjectPositions.length,
            ownerIssuedSourceApplicationFrame: baseApplicationFrame,
            ownerIssuedSourceResultFrame: baseResult,
            ownerIssuedSourceRetained: true,
            shuntlineReflexiveUsesPreteritEmbed: false,
            sourceShapeDeterminesPerfectiveThroughCanonicalOwner: true,
            exampleStemWhitelistUsed: false,
            canvasExampleAuthority: false,
            callerFormulaAuthorityAccepted: false,
            callerSurfaceAuthorityAccepted: false,
          };
        } else if (operation === "reverential") {
          const innerHonorificFrame =
            internalContext.attitudeSourceClosureFrame;
          const innerOperationFrame = innerHonorificFrame?.operationFrame;
          const innerFacts = innerOperationFrame?.operationFacts || {};
          objectFrame = {
            ...cloneObjectFrameFromTyped(baseTyped),
            stemRealization: targetStem,
          };
          const retainedSourceObjects = objectFramePositions(objectFrame);
          operationFacts = {
            ...operationFacts,
            reverentialSubtypeOfHonorific: true,
            doubledHonorificConstruction: true,
            reverentialIntensitySelectedByUser: true,
            secondHonorificLayerAutomatic: true,
            ownerIssuedHonorificSourceRequired: true,
            ownerIssuedHonorificSourceFrame: innerHonorificFrame,
            ownerIssuedHonorificSourceRetained: true,
            innerHonorificOperationFrame: innerOperationFrame,
            neutralSourceStem: text(innerOperationFrame?.sourceStem),
            honorificSourceStem: text(innerOperationFrame?.targetStem),
            reverentialTargetStem: targetStem,
            neutralHonorificReverentialHierarchy: freeze([
              text(innerOperationFrame?.sourceStem),
              text(innerOperationFrame?.targetStem),
              targetStem,
            ]),
            hierarchyDepth: 3,
            innerHonoredParticipant:
              text(innerFacts.honoredParticipant),
            outerHonoredParticipant: honoredParticipant,
            inheritedHonoredParticipantPreserved:
              text(innerFacts.honoredParticipant) === honoredParticipant,
            inheritedPossibleHonoredParticipants: freeze([
              ...(innerFacts.possibleHonoredParticipants || []),
            ]),
            inheritedParticipantAmbiguity:
              (innerFacts.possibleHonoredParticipants || []).length > 1,
            inheritedParticipantChoiceWasReal:
              innerFacts.honoredParticipantChoiceRequired === true,
            outerIntroducesFreshParticipantChoice: false,
            innerHonorificAnalysisPreserved: true,
            embeddedHonorificPredicateAspect: "perfective",
            embeddedHonorificPerfectiveStem: perfective,
            embeddedPreteritMorph: "0",
            embeddedPreteritMorphHasSurface: false,
            incorporatedHonorificPredicateIsOuterObject: true,
            fixedOuterMatrix: "tla-(tzin-o-ā)",
            outerMatrixStem: matrix,
            retainedSourceObjectPositions: retainedSourceObjects,
            sourceObjectPronounsPreserved:
              retainedSourceObjects.length === sourceObjectPositions.length,
            sourceParticipantsPreserved:
              retainedSourceObjects.length === sourceObjectPositions.length,
            innerAndOuterBoundariesPreserved: true,
            rawStemReentryAllowed: false,
            copiedHonorificSpellingAuthority: false,
            callerFormulaAuthorityAccepted: false,
            callerSurfaceAuthorityAccepted: false,
            canvasExampleAuthority: false,
          };
        } else if (operation === "pejorative") {
          objectFrame = {
            ...sourceObjectFrame,
            stemRealization: targetStem,
          };
          const retainedSourceObjects = objectFramePositions(objectFrame);
          const sourceHasReflexiveObject = retainedSourceObjects.some(
            position => /reflexive/u.test(key(position.objectKind))
          );
          const sourceTopology = sourceHasReflexiveObject
            ? "reflexive-object"
            : sourceHasProjectivePatient
              ? "projective-object"
              : "intransitive";
          const selectedDisparagedObjectPosition =
            honoredParticipant === "object"
            && sourceProjectiveObjectPositions.length === 1
              ? sourceProjectiveObjectPositions[0]
              : null;
          operationFacts = {
            ...operationFacts,
            pejorativePreteritEmbed: true,
            pejorativeAttitudeSelectedByUser: true,
            sourceTopology,
            intransitiveSourceAccepted: sourceTopology === "intransitive",
            projectiveObjectSourceAccepted:
              sourceTopology === "projective-object",
            reflexiveObjectSourceAccepted:
              sourceTopology === "reflexive-object",
            sourceTopologySelectsSharedPreteritEmbedAutomatically: true,
            attitudeRouteChoiceRequired: false,
            userSelectsMatrix: false,
            userSelectsPerfectiveClassForm: false,
            userSelectsObjectReplacement: false,
            userSelectsCompoundBracketing: false,
            embeddedPredicateAspect: "perfective",
            embeddedPredicateStem: perfective,
            embeddedPredicateVerbClass: text(
              baseApplicationFrame?.normalizedRequest?.verbClass
              || request.verbClass
            ).toUpperCase(),
            embeddedTense: "preterit",
            embeddedPreteritMorph: "0",
            embeddedPreteritMorphHasSurface: false,
            fixedAffectiveMatrix: "tla-(pōl-o-ā)",
            matrixStem: matrix,
            matrixSourceNounstem: "(-pōl)-Ø-",
            matrixFormationOwner: "§54.10",
            matrixRestrictedToPejorativeConstruction: true,
            incorporatedPredicateReplacesMatrixSpecificObject: true,
            sourceObjectFrame,
            retainedSourceObjectPositions: retainedSourceObjects,
            sourceObjectPronounsPreserved:
              retainedSourceObjects.length === sourceObjectPositions.length,
            sourceObjectNumberAndRolesPreserved:
              retainedSourceObjects.length === sourceObjectPositions.length
              && retainedSourceObjects.every(position => (
                sourceObjectPositions.some(sourcePosition => (
                  text(sourcePosition.objectId) === text(position.objectId)
                  && text(sourcePosition.objectKind)
                    === text(position.objectKind)
                  && text(sourcePosition.objectPerson)
                    === text(position.objectPerson)
                  && text(sourcePosition.objectNumber)
                    === text(position.objectNumber)
                  && text(sourcePosition.governor)
                    === text(position.governor)
                ))
              )),
            sourceParticipantsPreserved:
              retainedSourceObjects.length === sourceObjectPositions.length,
            possibleDisparagedParticipants,
            disparagedParticipant: honoredParticipant,
            selectedDisparagedObjectPosition,
            disparagedParticipantChoiceRequired:
              possibleDisparagedParticipants.length > 1,
            disparagedParticipantAutomaticallySelected:
              possibleDisparagedParticipants.length === 1
                ? honoredParticipant
                : "",
            subjectObjectDisparagementAmbiguityPreserved:
              possibleDisparagedParticipants.length > 1,
            firstPersonSubjectMayBeDisparaged: firstPersonSubject,
            selfDisparagementAllowed: true,
            selfHonorificationRestrictionDoesNotApply: true,
            ownerIssuedSourceApplicationFrame: baseApplicationFrame,
            ownerIssuedSourceResultFrame: baseResult,
            ownerIssuedSourceRetained: true,
            sourceShapeDeterminesPerfectiveThroughCanonicalOwner: true,
            exampleStemWhitelistUsed: false,
            canvasExampleAuthority: false,
            callerFormulaAuthorityAccepted: false,
            callerSurfaceAuthorityAccepted: false,
          };
        }
      }
      operationFacts = {
        ...operationFacts,
        ...(operation === "pejorative"
          ? {
              disparagedParticipant: honoredParticipant,
              selfPejorativeAllowed: true,
            }
          : { honoredParticipant, selfPejorativeAllowed: false })
      };
    }
    if (!targetStem) return blockedOperation(request, "licensed-operation-did-not-produce-target-stem", ruleFamily);
    if (operation === "frequentative" && baseIsNonactive) {
      const participantTopology = (baseTyped.slots?.prePredicate || []).map(
        slot => ({
          kind: slot.kind,
          carrier: slot.carrier,
          objectKind: slot.objectPositionFrame?.objectKind || "",
        }),
      );
      operationFacts = {
        ...operationFacts,
        nonactiveSourceRecaptured: true,
        sourceVoice: selectedBaseVoice,
        impersonalGroupReading: true,
        separateIndividualActsWithinCollectiveAction: true,
        participantTopologyPreserved: true,
        sourceParticipantTopology: participantTopology,
        finiteMood: text(request.mood),
        finiteTense: text(request.tense),
      };
    }
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
      if (
        variant === "reflexive-partial"
        || variant.startsWith("tla-")
        || key(request.frequentativeTarget) !== ""
          && key(request.frequentativeTarget) !== "lexical-stem"
      ) {
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
      if (operationFacts.documentedLexicalRealizationUsed === true) {
        ruleFamilies.add("honorific-irregular");
      }
      if (operationFacts.projectiveApplicativeHonorific === true) {
        ruleFamilies.add("honorific-projective");
        ruleFamilies.add("honorific-projective-applicative");
      }
      if (operationFacts.projectiveCausativeHonorific === true) {
        ruleFamilies.add("honorific-projective");
        ruleFamilies.add("honorific-projective-causative");
      }
      if (operationFacts.derivedSourceHonorific === true) {
        ruleFamilies.add("honorific-derived-source");
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
          // The late operation transforms an already typed Source. Preserve
          // its initial-i analysis when the derived target is sent back
          // through the canonical finite service; do not make that service
          // guess again from the target spelling.
          sourceInitialISelection: request.sourceInitialISelection,
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
    const requestHasAttitudeCompoundSource = Boolean(
      isAuthorizedClosureFrame(request.attitudeCompoundClosureFrame)
      || (text(request.sourceEmbedStem) && text(request.sourceMatrixStem))
    );
    const requestedSourceValence = key(
      request.sourceValence
      || request.valence
      || request.sourceApplicationFrame?.normalizedRequest?.sourceValence
      || request.sourceApplicationFrame?.normalizedRequest?.targetValence
    );
    if (key(request.lateOperation) === "honorific"
      && !key(request.lateVariant)
      && requestedSourceValence === "mainline-reflexive") {
      // §33.7 makes the preterit-embed route a consequence of typed object
      // topology. The user does not choose this matrix or its bracketing.
      request = { ...request, lateVariant: "preterit-embed" };
    }
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
    if (
      key(request.lateOperation) === "honorific"
      && HONORIFIC_PRODUCTIVE_FORMATIONS.includes(key(request.lateVariant))
      && !requestHasAttitudeCompoundSource
    ) {
      const earlyHonorificAnalysis = buildHonorificFormationAnalysisFrame(
        request,
        text(request.sourceStem || request.stem),
      );
      if (
        earlyHonorificAnalysis.authorizationStatus === "authorized"
        && earlyHonorificAnalysis.moodRestriction === "no-optative"
        && key(request.mood) === "optative"
      ) {
        return blockedClosure(
          request,
          "huica-tz-honorific-has-no-optative",
          "honorific-irregular",
        );
      }
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
      "frequentativeRepetitions", "frequentativeScope", "frequentativeTarget",
      "frequentativeReplacementSyllable",
      "compoundMatrixStem", "compoundMatrixClass",
      "compoundMatrixInitialISelection", "compoundSubjectAnimacy",
      "compoundPossessiveStem", "compoundPossessor",
      "compoundItzSense", "compoundYaSyncopation",
      "compoundEventOrder", "compoundNonactiveScope", "purposiveDirection",
      "purposiveSeries", "purposiveIrregularPluralN", "purposiveExternalDirectional",
      "purposiveSoundedFutureMorph", "purposiveEarlySingularGlottal",
      "honoredParticipant", "honorificDerivationOptionId",
      "honorificStemAlternative", "honorificFormationAnalysis",
      "compoundLexicalizationAnalysis",
      "attitudeCompoundTarget",
      "recursiveEmbedClosureFrame", "compoundEmbedClosureFrame",
      "compoundMatrixClosureFrame",
      "attitudeCompoundClosureFrame", "attitudeMemberTransformationFrame",
      "sourceApplicationFrame", "attitudeSourceClosureFrame",
      "formula", "surface", "selectedFormula", "authorizationStatus",
      "operationFrame", "machineryFrame", "targetTypedVncSlotFrame"
    ].forEach(field => delete baseRequest[field]);
    if (key(request.lateOperation) === "compound"
      && text(request.sourceStem || request.stem) === "itz") {
      const itzSense = key(request.compoundItzSense);
      if (itzSense === "motion") {
        // Motion itz is a compound-only perfective member of the huītz
        // paradigm.  Recapture that typed lexeme instead of pretending that
        // it is an independently finite simple stem.
        baseRequest.sourceStem = "huī-tz";
        baseRequest.lexicalReading = "";
        baseRequest.mood = "indicative";
        baseRequest.tense = "preterit-as-present";
      } else {
        // The observational lexeme is perfective-only.  A connective-t embed
        // consumes that authorized preterit predicate even when the matrix is
        // being inflected at another coordinate.
        baseRequest.lexicalReading = "alert-observant";
        baseRequest.mood = "indicative";
        baseRequest.tense = "preterit";
      }
    }
    if (key(request.lateOperation) === "compound"
      && key(request.lateVariant) === "shared-object"
      && text(request.sourceStem || request.stem) === "ē-hua") {
      // In the shared-object construction ēhua supplies its Class A
      // perfective automatically.  The Canvas fact is a construction rule,
      // not a lexical picker or a whitelist entry.
      baseRequest.verbClass = "A";
    }
    if (key(request.lateOperation) === "compound"
      && key(request.lateVariant) === "future-embed") {
      // The Source member of this construction is always an owner-issued
      // future VNC supplement. The user's ordinary Mood and Tense selections
      // belong to the matrix and are restored on the completed compound.
      baseRequest.mood = "indicative";
      baseRequest.tense = "future";
      baseRequest.sentenceType = "statement";
      baseRequest.introductoryParticle = "none";
      // Antecessive belongs to the finite matrix. Leaving it on the future
      // supplement would ask the ordinary VNC owner for an impossible
      // antecessive-future cell and would erase the owner-issued supplement.
      delete baseRequest.sentenceAntecessive;
      delete baseRequest.antecessive;
      delete baseRequest.requestedPrefixStackMode;
      delete baseRequest.prefixStackMode;
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
      // Antecessive belongs to the completed outbound-past Purposive, not to
      // the present finite Source used to construct its future embed.
      delete baseRequest.sentenceAntecessive;
      delete baseRequest.antecessive;
      delete baseRequest.requestedPrefixStackMode;
      delete baseRequest.prefixStackMode;
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
    const honorificSourceApplicationFrame = baseApplicationFrame;
    let compoundEmbedFiniteCoordinateDecoupled = Boolean(
      key(request.lateOperation) === "compound"
      && key(request.lateVariant) === "future-embed"
      && baseApplicationFrame?.authorizationStatus === "authorized"
      && key(baseApplicationFrame?.normalizedRequest?.tense) === "future"
      && key(request.tense || "present") !== "future"
    );
    if (key(request.lateOperation) === "compound"
      && !sourceApplicationFrame
      && baseApplicationFrame?.authorizationStatus !== "authorized"
      && typeof targetObject.evaluateClassicalNahuatlVncApplication === "function") {
      // A connective compound embeds the Source perfective with zero preterit.
      // Its matrix, not that embedded Source, bears the requested finite
      // coordinate.  Retry only the embedded Source at its own canonical
      // perfective coordinate when a matrix-only tense is unavailable to it.
      baseApplicationFrame = targetObject.evaluateClassicalNahuatlVncApplication({
        ...baseRequest,
        mood: "indicative",
        tense: "preterit",
        sentenceType: "statement",
        introductoryParticle: "none",
      });
      compoundEmbedFiniteCoordinateDecoupled =
        baseApplicationFrame?.authorizationStatus === "authorized";
    }
    const genericRecursiveEmbedClosureFrame = isAuthorizedClosureFrame(
      request.recursiveEmbedClosureFrame
    )
      ? request.recursiveEmbedClosureFrame
      : null;
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
    let recursiveEmbedClosureFrame = genericRecursiveEmbedClosureFrame
      || attitudeSourceClosureFrame
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
    const honorificFormationAnalysisFrame =
      lateOperation === "honorific"
        && HONORIFIC_PRODUCTIVE_FORMATIONS.includes(lateVariant)
        && !requestHasAttitudeCompoundSource
        ? buildHonorificFormationAnalysisFrame(
            request,
            text(request.sourceStem || request.stem),
          )
        : null;
    if (
      honorificFormationAnalysisFrame
      && honorificFormationAnalysisFrame.authorizationStatus !== "authorized"
    ) {
      return blockedClosure(
        request,
        honorificFormationAnalysisFrame.blockReason,
        "honorific-gate",
      );
    }
    if (
      honorificFormationAnalysisFrame
      && honorificFormationAnalysisFrame.selectedFormationLicensed !== true
    ) {
      return blockedClosure(
        request,
        "honorific-formation-not-licensed-by-typed-source-analysis",
        "honorific-gate",
      );
    }
    if (lateOperation === "honorific"
      && ["causative", "applicative"].includes(lateVariant)
      && !honorificFormationAnalysisFrame?.selectedOption
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
    const requestedMatrixStem = text(
      recursiveMatrixClosureFrame?.operationFrame?.targetStem
      || request.compoundMatrixStem
      || request.matrixStem
    );
    const reflexiveMatrixAnalysis = lateVariant === "reflexive-matrix"
      ? normalizeReflexiveMatrixAnalysis(requestedMatrixStem)
      : null;
    const matrixStem = reflexiveMatrixAnalysis?.canonicalStem
      || requestedMatrixStem;
    const derivedMatrixClass = recursiveMatrixClosureFrame
      ? text(recursiveMatrixClosureFrame.operationFrame?.targetClass)
      : deriveCompoundMatrixClass(
          reflexiveMatrixAnalysis?.coreStem || matrixStem,
          request.compoundMatrixClass
        );
    const futureMatrixAnalysis = lateVariant === "future-embed"
      ? analyzeFutureEmbedMatrix(matrixStem)
      : null;
    const matrixApplicationSourceStem = lateVariant === "future-embed"
      ? futureMatrixAnalysis?.lexicalStem || matrixStem
      : matrixStem === "ca"
      ? "ye"
      : matrixStem === "o"
        ? "on-o"
        : matrixStem;
    const matrixNeedsNonactive = ["matrix", "both"].includes(
      compoundNonactiveScope
    );
    const matrixApplicationRequest = {
        sourceStem: matrixApplicationSourceStem,
        sourceValence: lateVariant === "shared-object"
          ? text(request.sourceValence || request.valence || "specific-projective")
          : lateVariant === "future-embed"
            ? "specific-projective"
          : "intransitive",
        objectKind: lateVariant === "shared-object"
          ? text(request.objectKind)
          : lateVariant === "future-embed"
            ? "specific-projective"
          : "",
        objectPerson: lateVariant === "shared-object"
          ? text(request.objectPerson)
          : lateVariant === "future-embed"
            ? "3sg"
          : "",
        objectNumber: lateVariant === "shared-object"
          ? text(request.objectNumber)
          : "",
        verbClass: derivedMatrixClass,
        sourceInitialISelection: text(
          request.compoundMatrixInitialISelection
        ),
        subject: request.subject,
        mood: request.mood,
        tense: request.tense,
        derivationType: "direct",
        // A matrix in the nonactive stem is structurally impersonal even when
        // the compound as a whole has passive force through its embed.
        requestedVoice: matrixNeedsNonactive ? "impersonal" : "active",
        voice: matrixNeedsNonactive ? "impersonal" : "active",
        nonactiveOptionId: ""
    };
    let matrixApplicationFrame = null;
    if (key(request.lateOperation) === "compound" && matrixStem
      && typeof targetObject.evaluateClassicalNahuatlVncApplication === "function") {
      matrixApplicationFrame = targetObject.evaluateClassicalNahuatlVncApplication(
        matrixApplicationRequest
      );
      if (matrixNeedsNonactive
        && matrixApplicationFrame?.authorizationStatus !== "authorized") {
        const matrixNonactiveInventory = matrixApplicationFrame?.controlFrame
          ?.nonactiveOptionInventory;
        const matrixNonactiveOptionId = text(
          matrixNonactiveInventory?.automaticOptionId
          || (
            matrixNonactiveInventory?.options?.length === 1
              ? matrixNonactiveInventory.options[0]?.optionId
              : ""
          )
          || matrixNonactiveInventory?.options?.find?.(
            option => option.operationId === "inherent-impersonal"
          )?.optionId
          || matrixNonactiveInventory?.options?.[0]?.optionId
        );
        if (matrixNonactiveOptionId) {
          matrixApplicationFrame = targetObject.evaluateClassicalNahuatlVncApplication({
            ...matrixApplicationRequest,
            nonactiveOptionId: matrixNonactiveOptionId
          });
        }
      }
    }
    let futureSupplementationFrame = null;
    if (lateOperation === "compound"
      && lateVariant === "future-embed"
      && baseApplicationFrame?.authorizationStatus === "authorized"
      && matrixApplicationFrame?.authorizationStatus === "authorized"
      && typeof targetObject
        .buildClassicalNahuatlSupplementationClauseEnvelope === "function"
      && typeof targetObject.evaluateClassicalNahuatlSupplementationOperation
        === "function") {
      const sharedSubjectReferenceId = `future-embed-subject:${text(
        request.subject || "3sg",
      )}`;
      const supplementReferenceId = "future-embed-supplement-vnc";
      const principalClause = targetObject
        .buildClassicalNahuatlSupplementationClauseEnvelope(
          matrixApplicationFrame,
          {
            referenceId: "future-embed-principal-vnc",
            subjectReferenceId: sharedSubjectReferenceId,
            objectReferenceId: supplementReferenceId,
          },
        );
      const supplementClause = targetObject
        .buildClassicalNahuatlSupplementationClauseEnvelope(
          baseApplicationFrame,
          {
            referenceId: supplementReferenceId,
            subjectReferenceId: sharedSubjectReferenceId,
            objectReferenceId: "future-embed-internal-object",
          },
        );
      futureSupplementationFrame = targetObject
        .evaluateClassicalNahuatlSupplementationOperation({
          operationKind: "relation",
          principalClause,
          supplementClause,
          options: {
            referenceMode: "included",
            headRole: "object",
            supplementContactRole: "subject",
            order: "principal-first",
            wishRealizability: "realizable",
          },
        });
    }
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
    let attitudeScopeBasis = "";
    let compoundLexicalizationAnalysisFrame = null;
    let attitudeSourceObjectFrame = null;
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
      const compoundSourceEmbedStem = text(
        attitudeCompoundClosureFrame?.operationFrame?.operationFacts
          ?.specialPerfectiveEmbedSource
        || compoundEmbedStem,
      );
      const compoundSourceMatrixStem = text(
        attitudeCompoundClosureFrame?.operationFrame?.operationFacts
          ?.matrixSuppliedStem
        || attitudeCompoundClosureFrame?.operationFrame?.operationFacts
          ?.matrixSelectionStem
        || compoundMatrixStem,
      );
      compoundLexicalizationAnalysisFrame =
        buildCompoundLexicalizationAnalysisFrame(
          request,
          compoundSourceEmbedStem,
          compoundSourceMatrixStem,
        );
      if (compoundLexicalizationAnalysisFrame.authorizationStatus !== "authorized") {
        return blockedClosure(
          request,
          compoundLexicalizationAnalysisFrame.blockReason,
          "attitude-compound",
        );
      }
      attitudeSourceObjectFrame = cloneObjectFrameFromTyped(
        attitudeCompoundClosureFrame?.finalTypedVncSlotFrame,
      );
      const selectedCompoundStructure = key(
        compoundLexicalizationAnalysisFrame.selectedStructure,
      );
      attitudeTarget = compoundVariant === "shared-object"
        || selectedCompoundStructure === "lexicalized"
        ? "matrix"
        : "embed";
      attitudeScopeBasis = compoundVariant === "shared-object"
        ? "shared-object-compound"
        : selectedCompoundStructure === "lexicalized"
          ? "typed-lexicalized-unity"
          : "compositional-intransitive-matrix";
      const memberStem = attitudeTarget === "embed"
        ? compoundSourceEmbedStem
        : compoundSourceMatrixStem;
      if (!attitudeMemberTransformationFrame && memberStem) {
        attitudeMemberTransformationFrame =
          evaluateClassicalNahuatlLateVncDerivation({
            ...request,
            sourceStem: memberStem,
            sourceEmbedStem: "",
            sourceMatrixStem: "",
            attitudeCompoundTarget: "",
            attitudeCompoundClosureFrame: null,
            attitudeMemberTransformationFrame: null,
            compoundLexicalizationAnalysis: undefined,
            lateOperation,
            lateVariant: lateOperation === "honorific"
              ? ["applicative", "causative"].includes(lateVariant)
                ? lateVariant
                : "applicative"
              : "preterit-embed",
            verbClass: attitudeTarget === "matrix"
              ? text(
                  attitudeCompoundClosureFrame?.operationFrame?.targetClass
                  || request.compoundMatrixClass
                  || "A",
                )
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
      futureSupplementationFrame,
      recursiveEmbedClosureFrame,
      recursiveMatrixClosureFrame,
      invalidRecursiveEmbedFrame:
        Object.prototype.hasOwnProperty.call(
          request,
          "recursiveEmbedClosureFrame"
        )
          ? !isAuthorizedClosureFrame(request.recursiveEmbedClosureFrame)
          : Object.prototype.hasOwnProperty.call(
            request,
            "compoundEmbedClosureFrame"
          )
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
      attitudeSourceClosureFrame,
      possessiveSupplementFrame,
      attitudeCompoundClosureFrame,
      attitudeMemberTransformationFrame,
      attitudeMemberPerfectiveStem,
      attitudeMemberPerfectiveFrame,
      attitudeCompoundTarget: attitudeTarget,
      attitudeCompoundScopeBasis: attitudeScopeBasis,
      compoundLexicalizationAnalysisFrame,
      attitudeSourceObjectFrame,
      honorificDerived,
      honorificDerivationAttempted,
      honorificDerivationBlockReason,
      honorificFormationAnalysisFrame,
      honorificSourceApplicationFrame,
      ownerIssuedDerivedSourceApplicationFrame: sourceApplicationFrame,
      sourceDerivationKind,
      compoundEmbedFiniteCoordinateDecoupled
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
    buildClassicalNahuatlLateSourceAgreementFrame,
    isClassicalNahuatlLateSourceAgreementFrame,
    buildHonorificFormationAnalysisFrame,
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
