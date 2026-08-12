// Canonical modern ESM module.

export function createGenerationEngineGlobals(targetObject = globalThis, installationContext = null) {
    const grammarFrameOwnerCapability = installationContext?.grammarFrameOwnerCapability || null;
    const issuedCnvFormulaSurfaceSlotSourceFrames = new WeakSet();
    const issuedCnvFormulaSurfaceSlotOperationFrames = new WeakSet();
    const NUCLEAR_CLAUSE_SURFACE_NOOP = () => {};
    const NUCLEAR_CLAUSE_SURFACE_ENGINE = Object.freeze({
      canonicalGenerateFunction: "generateNuclearClauseSurface",
      canonicalExecuteFunction: "executeNuclearClauseSurfaceRequest",
      generatedUnit: "nuclear-clause-surface"
    });
    const FUNCTION_USE_VALENCE_OBJECT_GATE_DIAGNOSTIC_ID = "function-use-valence-object-frame-unfixed";
    const FUNCTION_USE_VALENCE_OBJECT_GATE_ROUTE_STAGE = "function-use-valence-object-gate";
    const FUNCTION_USE_VALENCE_OBJECT_SLOTS = Object.freeze(["obj1", "obj2", "obj3", "reflexivo"]);
    function normalizeNuclearClauseSurfaceTenseValue(tenseValue = "") {
      return String(tenseValue || "").trim();
    }
    function resolveNuclearClauseSurfaceUiHook(uiHooks = null, key = "") {
      const hook = uiHooks && typeof uiHooks === "object" ? uiHooks[key] : null;
      return typeof hook === "function" ? hook : NUCLEAR_CLAUSE_SURFACE_NOOP;
    }
    function getNuclearClauseOwnDataPropertyValue(record = null, key = "", fallback = null) {
      if (!record || typeof record !== "object") {
        return fallback;
      }
      try {
        const descriptor = Object.getOwnPropertyDescriptor(record, key);
        return descriptor && Object.prototype.hasOwnProperty.call(descriptor, "value") ? descriptor.value : fallback;
      } catch (_error) {
        return fallback;
      }
    }
    function hasRetiredOrdinaryNncGenerationCarrier(override = null) {
      if (!override || typeof override !== "object") {
        return false;
      }
      const seen = new Set();
      try {
        let cursor = override;
        while (
          cursor
          && typeof cursor === "object"
          && !seen.has(cursor)
        ) {
          seen.add(cursor);
          if (Object.getOwnPropertyDescriptor(cursor, "ordinaryNnc")) {
            return true;
          }
          cursor = Object.getPrototypeOf(cursor);
        }
      } catch (_error) {
        return true;
      }
      return false;
    }
    function normalizeFunctionUseValenceObjectSlot(value = "") {
      const normalized = normalizeNuclearClauseSurfaceContractSurface(value);
      return normalized === "Ø" ? "" : normalized;
    }
    function getFunctionUseValenceObjectSlotValue(slot = null) {
      if (!slot) {
        return "";
      }
      if (typeof slot !== "object") {
        return normalizeFunctionUseValenceObjectSlot(slot);
      }
      const fields = ["prefix", "basePrefix", "formulaPrefix", "displayPrefix", "surface", "displaySurface", "value", "token", "marker", "morpheme", "objectPrefix", "obj1"];
      for (const field of fields) {
        const value = normalizeFunctionUseValenceObjectSlot(slot[field]);
        if (value) {
          return value;
        }
      }
      return "";
    }
    function normalizeFunctionUseValenceObjectVector(vector = null) {
      const source = vector && typeof vector === "object" ? vector : {};
      const normalized = {
        obj1: normalizeFunctionUseValenceObjectSlot(source.obj1),
        obj2: normalizeFunctionUseValenceObjectSlot(source.obj2),
        obj3: normalizeFunctionUseValenceObjectSlot(source.obj3),
        reflexivo: normalizeFunctionUseValenceObjectSlot(source.reflexivo)
      };
      if (normalized.obj1 === "mo" && !normalized.reflexivo) {
        normalized.reflexivo = "mo";
      }
      if (normalized.obj1 === "mo" && normalized.reflexivo === "mo") {
        normalized.obj1 = "";
      }
      return normalized;
    }
    function mergeFunctionUseValenceObjectVector(target = null, source = null) {
      const next = target && typeof target === "object" ? {
        ...target
      } : {
        obj1: "",
        obj2: "",
        obj3: "",
        reflexivo: ""
      };
      FUNCTION_USE_VALENCE_OBJECT_SLOTS.forEach(slot => {
        const value = normalizeFunctionUseValenceObjectSlot(source?.[slot]);
        if (value && !next[slot]) {
          next[slot] = value;
        }
      });
      return normalizeFunctionUseValenceObjectVector(next);
    }
    function getFunctionUseValenceObjectFormulaSlotId(key = "", slot = null) {
      const label = [key, slot && typeof slot === "object" ? slot.slot : "", slot && typeof slot === "object" ? slot.slotId : "", slot && typeof slot === "object" ? slot.role : ""].map(value => String(value || "").trim().toLowerCase()).join(" ");
      const compactLabel = label.replace(/[^a-z0-9]/g, "");
      if (/(obj1|objectprefix|directobject)/.test(compactLabel) || /(^|\b)(obj|object)(\b|$)/.test(label)) {
        return "obj1";
      }
      if (/(obj2|secondaryobject)/.test(compactLabel)) {
        return "obj2";
      }
      if (/(obj3|tertiaryobject)/.test(compactLabel)) {
        return "obj3";
      }
      if (/reflex|reflexivo/.test(compactLabel)) {
        return "reflexivo";
      }
      return "";
    }
    function collectFunctionUseValenceObjectVectorFromFormulaSlots(formulaSlots = null) {
      const slots = formulaSlots && typeof formulaSlots === "object" ? formulaSlots : null;
      if (!slots) {
        return null;
      }
      let vector = normalizeFunctionUseValenceObjectVector({
        obj1: getFunctionUseValenceObjectSlotValue(slots.obj1 || slots.objectPrefix),
        obj2: getFunctionUseValenceObjectSlotValue(slots.obj2),
        obj3: getFunctionUseValenceObjectSlotValue(slots.obj3),
        reflexivo: getFunctionUseValenceObjectSlotValue(slots.reflexivo || slots.reflexive)
      });
      Object.entries(slots).forEach(([key, slot]) => {
        const slotId = getFunctionUseValenceObjectFormulaSlotId(key, slot);
        const value = getFunctionUseValenceObjectSlotValue(slot);
        if (slotId && value) {
          vector = mergeFunctionUseValenceObjectVector(vector, {
            [slotId]: value
          });
        }
      });
      return vector;
    }
    function functionUseFormulaSlotsCoverValenceObjectFrame(formulaSlots = null) {
      const slots = formulaSlots && typeof formulaSlots === "object" ? formulaSlots : null;
      if (!slots) {
        return false;
      }
      return Object.entries(slots).some(([key, slot]) => Boolean(getFunctionUseValenceObjectFormulaSlotId(key, slot)));
    }
    function collectFunctionUseValenceObjectVectorFromEntradaGrammarObject(entradaGrammarObject = null) {
      if (!entradaGrammarObject || typeof entradaGrammarObject !== "object" || String(entradaGrammarObject.kind || "") !== "andrews-entrada-grammar-object") {
        return null;
      }
      const objectVector = entradaGrammarObject.objectFrame?.vector && typeof entradaGrammarObject.objectFrame.vector === "object" ? entradaGrammarObject.objectFrame.vector : null;
      const fromVector = normalizeFunctionUseValenceObjectVector(objectVector);
      const hasVectorValue = hasFunctionUseValenceObjectValues(fromVector);
      if (hasVectorValue) {
        return fromVector;
      }
      const slots = Array.isArray(entradaGrammarObject.objectFrame?.slots) ? entradaGrammarObject.objectFrame.slots : [];
      return normalizeFunctionUseValenceObjectVector({
        obj1: getFunctionUseValenceObjectSlotValue(slots.find(entry => entry?.slotId === "obj1")),
        obj2: getFunctionUseValenceObjectSlotValue(slots.find(entry => entry?.slotId === "obj2")),
        obj3: getFunctionUseValenceObjectSlotValue(slots.find(entry => entry?.slotId === "obj3")),
        reflexivo: getFunctionUseValenceObjectSlotValue(slots.find(entry => entry?.slotId === "reflexivo"))
      });
    }
    function entradaGrammarObjectHasFunctionUseFixedValenceEvidence(entradaGrammarObject = null) {
      return Boolean(
        typeof targetObject.isIssuedEntradaGrammarObject === "function"
        && targetObject.isIssuedEntradaGrammarObject(entradaGrammarObject)
        && (
          entradaGrammarObject.valenceFrame?.frameFixed === true
          || entradaGrammarObject.objectFrame?.frameFixed === true
          || entradaGrammarObject.formulaBoundaryFrame?.valenceFrameFixed === true
        )
      );
    }
    function collectFunctionUseValenceObjectVectorFromFrame(frame = null) {
      const grammarFrame = frame && typeof frame === "object" ? frame : null;
      if (!grammarFrame) {
        return null;
      }
      let vector = null;
      const participant = grammarFrame.participantFrame || null;
      if (participant) {
        vector = mergeFunctionUseValenceObjectVector(vector, {
          obj1: getFunctionUseValenceObjectSlotValue(participant.obj1),
          obj2: getFunctionUseValenceObjectSlotValue(participant.obj2),
          obj3: getFunctionUseValenceObjectSlotValue(participant.obj3),
          reflexivo: getFunctionUseValenceObjectSlotValue(participant.reflexivo)
        });
        const valenceFrame = participant.valenceFrame || null;
        if (valenceFrame) {
          vector = mergeFunctionUseValenceObjectVector(vector, {
            obj1: getFunctionUseValenceObjectSlotValue(valenceFrame.obj1),
            obj2: getFunctionUseValenceObjectSlotValue(valenceFrame.obj2),
            obj3: getFunctionUseValenceObjectSlotValue(valenceFrame.obj3),
            reflexivo: getFunctionUseValenceObjectSlotValue(valenceFrame.reflexivo)
          });
        }
      }
      [grammarFrame.remainingExternalObjectSlots, grammarFrame.sourceExternalObjectSlots, grammarFrame.objectSlotOwnership?.remainingExternalObjectSlots, grammarFrame.objectSlotOwnership?.sourceExternalObjectSlots, grammarFrame.incorporationRouteFrame?.remainingExternalObjectSlots, grammarFrame.routeFrame?.remainingExternalObjectSlots, grammarFrame.sourceRouteFrame?.remainingExternalObjectSlots, grammarFrame.participantFrame?.objectSlotOwnership?.remainingExternalObjectSlots, grammarFrame.participantFrame?.objectSlotOwnership?.sourceExternalObjectSlots, grammarFrame.participantFrame?.routeFrame?.remainingExternalObjectSlots, grammarFrame.participantFrame?.sourceRouteFrame?.remainingExternalObjectSlots, grammarFrame.routeContract?.sourceContract?.objectSlotOwnership?.remainingExternalObjectSlots, grammarFrame.routeContract?.sourceContract?.objectSlotOwnership?.sourceExternalObjectSlots, grammarFrame.routeContract?.targetContract?.objectSlotOwnership?.remainingExternalObjectSlots, grammarFrame.routeContract?.targetContract?.objectSlotOwnership?.sourceExternalObjectSlots, grammarFrame.routeContract?.sourceContract?.routeFrame?.remainingExternalObjectSlots, grammarFrame.routeContract?.targetContract?.routeFrame?.remainingExternalObjectSlots, grammarFrame.routeContract?.sourceContract?.sourceRouteFrame?.remainingExternalObjectSlots, grammarFrame.routeContract?.targetContract?.sourceRouteFrame?.remainingExternalObjectSlots, grammarFrame.sourceContract?.objectSlotOwnership?.remainingExternalObjectSlots, grammarFrame.sourceContract?.objectSlotOwnership?.sourceExternalObjectSlots, grammarFrame.targetContract?.objectSlotOwnership?.remainingExternalObjectSlots, grammarFrame.targetContract?.objectSlotOwnership?.sourceExternalObjectSlots, grammarFrame.sourceContract?.routeFrame?.remainingExternalObjectSlots, grammarFrame.targetContract?.routeFrame?.remainingExternalObjectSlots, grammarFrame.sourceContract?.sourceRouteFrame?.remainingExternalObjectSlots, grammarFrame.targetContract?.sourceRouteFrame?.remainingExternalObjectSlots].forEach(slots => {
        (Array.isArray(slots) ? slots : []).forEach(slot => {
          if (!slot || typeof slot !== "object") {
            return;
          }
          const slotId = getFunctionUseValenceObjectFormulaSlotId(slot.slotId || slot.slot || "", slot);
          const value = getFunctionUseValenceObjectSlotValue(slot);
          if (slotId && value) {
            vector = mergeFunctionUseValenceObjectVector(vector, {
              [slotId]: value
            });
          }
        });
      });
      return vector ? normalizeFunctionUseValenceObjectVector(vector) : null;
    }
    function frameHasFunctionUseFixedValenceEvidence(frame = null) {
      const source = frame && typeof frame === "object" ? frame : null;
      if (!source) {
        return false;
      }
      return Boolean(isFunctionUseFixedValenceFrame(source.participantFrame?.valenceFrame) || source.participantFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true || source.objectSlotOwnership?.matrixValenceFrameFixed === true || source.incorporationRouteFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true || source.routeFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true || source.sourceRouteFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true || String(source.kind || "") === "andrews-incorporation-route-frame" && Boolean(String(source.matrixValence || "").trim()) && source.routeFrameLicensesObjectSlotOwnership === true || isFunctionUseFixedValenceFrame(source.routeContract?.sourceContract?.valenceFrame) || isFunctionUseFixedValenceFrame(source.routeContract?.targetContract?.valenceFrame) || source.routeContract?.sourceContract?.objectSlotOwnership?.matrixValenceFrameFixed === true || source.routeContract?.targetContract?.objectSlotOwnership?.matrixValenceFrameFixed === true || source.routeContract?.sourceContract?.routeFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true || source.routeContract?.targetContract?.routeFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true || source.routeContract?.sourceContract?.sourceRouteFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true || source.routeContract?.targetContract?.sourceRouteFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true || isFunctionUseFixedValenceFrame(source.sourceContract?.valenceFrame) || isFunctionUseFixedValenceFrame(source.targetContract?.valenceFrame) || source.sourceContract?.objectSlotOwnership?.matrixValenceFrameFixed === true || source.targetContract?.objectSlotOwnership?.matrixValenceFrameFixed === true || source.sourceContract?.routeFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true || source.targetContract?.routeFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true || source.sourceContract?.sourceRouteFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true || source.targetContract?.sourceRouteFrame?.objectSlotOwnership?.matrixValenceFrameFixed === true);
    }
    function hasFunctionUseValenceObjectValues(vector = null) {
      const normalized = normalizeFunctionUseValenceObjectVector(vector);
      return FUNCTION_USE_VALENCE_OBJECT_SLOTS.some(slot => Boolean(normalized[slot]));
    }
    function getFunctionUseValenceObjectSignature(vector = null) {
      const normalized = normalizeFunctionUseValenceObjectVector(vector);
      return FUNCTION_USE_VALENCE_OBJECT_SLOTS.map(slot => `${slot}:${normalized[slot] || "Ø"}`).join("|");
    }
    function getFunctionUseValenceObjectDifferences(sourceVector = null, currentVector = null) {
      const source = normalizeFunctionUseValenceObjectVector(sourceVector);
      const current = normalizeFunctionUseValenceObjectVector(currentVector);
      return FUNCTION_USE_VALENCE_OBJECT_SLOTS.filter(slot => source[slot] !== current[slot]).map(slot => ({
        slot,
        source: source[slot] || "",
        current: current[slot] || ""
      }));
    }
    function functionUseValenceObjectVectorCovers(requiredVector = null, evidenceVector = null) {
      const required = normalizeFunctionUseValenceObjectVector(requiredVector);
      const evidence = normalizeFunctionUseValenceObjectVector(evidenceVector);
      return FUNCTION_USE_VALENCE_OBJECT_SLOTS.every(slot => !required[slot] || required[slot] === evidence[slot]);
    }
    function isFunctionUseFixedValenceFrame(frame = null) {
      if (!frame || typeof frame !== "object") {
        return false;
      }
      if (frame.frameFixed === false || frame.valenceFrameFixed === false || frame.sourceValenceFrameFixed === false) {
        return false;
      }
      return Boolean(frame.frameFixed === true || frame.valenceFrameFixed === true || frame.sourceValenceFrameFixed === true || frame.objectFrameFixed === true || frame.matrixValenceFrameFixed === true || frame.valencyFrameFixed === true);
    }
    function getFunctionUseValenceSourceKind({
      entryRouteContract = null,
      grammarFrame = null
    } = {}) {
      return String(entryRouteContract?.sourceClauseKind || entryRouteContract?.sourceCategory || grammarFrame?.routeContract?.sourceContract?.sourceClauseKind || grammarFrame?.routeContract?.sourceContract?.sourceCategory || grammarFrame?.unitFrame?.unitKind || "").trim();
    }
    function isFunctionUseValenceSourceVerbal(sourceKind = "") {
      return /verbal|vnc|cnv|verb/i.test(String(sourceKind || ""));
    }
    function buildFunctionUseValenceObjectHardGate({
      override = null,
      posicionesFormula = null,
      sourceFrame = null,
      sourceFormulaSlots = null,
      entradaGrammarObject = null,
      sourceKind = "",
      currentVector = null,
      currentVectorOwnsValenceObjectSlots = true,
      forceBlockedReason = "",
      gateContext = "function-use",
      licensedCurrentValues = null
    } = {}) {
      const entryRouteContract = override?.entryRouteContract
        && typeof override.entryRouteContract === "object"
        ? override.entryRouteContract
        : null;
      const explicitSourceFrame = sourceFrame && typeof sourceFrame === "object" ? sourceFrame : null;
      const explicitSourceFormulaSlots = sourceFormulaSlots && typeof sourceFormulaSlots === "object" ? sourceFormulaSlots : null;
      const grammarFrame = explicitSourceFrame
        || (override?.grammarFrame && typeof override.grammarFrame === "object" ? override.grammarFrame : null)
        || (override?.frames && typeof override.frames === "object" ? override.frames : null)
        || (entryRouteContract?.grammarFrame && typeof entryRouteContract.grammarFrame === "object" ? entryRouteContract.grammarFrame : null)
        || (entryRouteContract?.frames && typeof entryRouteContract.frames === "object" ? entryRouteContract.frames : null)
        || entryRouteContract;
      const entradaGrammarObjects = [
        entradaGrammarObject,
        override?.entradaGrammarObject,
        override?.sourceEntradaGrammarObject,
        entryRouteContract?.entradaGrammarObject,
        entryRouteContract?.sourceEntradaGrammarObject,
        grammarFrame?.routeContract?.sourceContract?.entradaGrammarObject
      ].filter(candidate => candidate && typeof candidate === "object" && String(candidate.kind || "") === "andrews-entrada-grammar-object");
      let sourceVector = null;
      let formulaObjectVector = null;
      let hasFormulaEvidence = false;
      let hasFormulaObjectSlotCoverage = false;
      const registerFormulaEvidence = (formulaSlots = null) => {
        if (!formulaSlots || typeof formulaSlots !== "object") {
          return;
        }
        hasFormulaEvidence = true;
        if (functionUseFormulaSlotsCoverValenceObjectFrame(formulaSlots)) {
          hasFormulaObjectSlotCoverage = true;
        }
        const next = collectFunctionUseValenceObjectVectorFromFormulaSlots(formulaSlots);
        if (next && hasFunctionUseValenceObjectValues(next)) {
          formulaObjectVector = mergeFunctionUseValenceObjectVector(formulaObjectVector, next);
        }
      };
      [
        explicitSourceFormulaSlots,
        explicitSourceFrame?.formulaSlots,
        explicitSourceFrame?.slots,
        explicitSourceFrame?.nuclearClauseFrame?.formulaSlots,
        override?.sourceFormulaSlots,
        override?.formulaSlots,
        entryRouteContract?.sourceFormulaSlots,
        grammarFrame?.morphBoundaryFrame?.formulaSlots,
        grammarFrame?.nuclearClauseFrame?.formulaSlots
      ].forEach(registerFormulaEvidence);
      entradaGrammarObjects.forEach(grammarObject => {
        const next = collectFunctionUseValenceObjectVectorFromEntradaGrammarObject(grammarObject);
        if (next) {
          sourceVector = mergeFunctionUseValenceObjectVector(sourceVector, next);
        }
      });
      const frameVector = collectFunctionUseValenceObjectVectorFromFrame(grammarFrame);
      if (frameVector) {
        sourceVector = mergeFunctionUseValenceObjectVector(sourceVector, frameVector);
      }
      const resolvedSourceKind = String(sourceKind || getFunctionUseValenceSourceKind({
        entryRouteContract,
        grammarFrame
      }) || "").trim();
      const explicitCurrentVector = currentVector && typeof currentVector === "object" ? currentVector : null;
      const normalizedCurrentVector = normalizeFunctionUseValenceObjectVector(explicitCurrentVector || {
        obj1: posicionesFormula?.obj1 || override?.posicionesFormula?.obj1 || override?.obj1 || override?.objectPrefix || "",
        obj2: posicionesFormula?.obj2 || override?.posicionesFormula?.obj2 || override?.obj2 || "",
        obj3: posicionesFormula?.obj3 || override?.posicionesFormula?.obj3 || override?.obj3 || "",
        reflexivo: posicionesFormula?.reflexivo || override?.posicionesFormula?.reflexivo || override?.reflexivo || ""
      });
      const normalizedSourceVector = normalizeFunctionUseValenceObjectVector(sourceVector);
      const hasSourceObjects = hasFunctionUseValenceObjectValues(normalizedSourceVector);
      const hasCurrentObjects = hasFunctionUseValenceObjectValues(normalizedCurrentVector);
      const currentOwnsValenceObjectSlots = currentVectorOwnsValenceObjectSlots === true;
      const hasFrameValence = frameHasFunctionUseFixedValenceEvidence(grammarFrame);
      const hasEntradaFixedValence = entradaGrammarObjects.some(grammarObject => entradaGrammarObjectHasFunctionUseFixedValenceEvidence(grammarObject));
      const formulaObjectCoverage = !hasSourceObjects || functionUseValenceObjectVectorCovers(normalizedSourceVector, formulaObjectVector);
      const formulaCoversValenceFrame = formulaObjectCoverage && (!isFunctionUseValenceSourceVerbal(resolvedSourceKind) || hasSourceObjects || hasFormulaObjectSlotCoverage);
      const hasFormulaValence = false;
      const valenceFrameFixed = hasFrameValence || hasEntradaFixedValence || !hasSourceObjects && !isFunctionUseValenceSourceVerbal(resolvedSourceKind);
      const differences = getFunctionUseValenceObjectDifferences(normalizedSourceVector, normalizedCurrentVector);
      let status = "pass";
      let reason = "function-use-does-not-claim-object-valence";
      if (!hasSourceObjects && !hasCurrentObjects && isFunctionUseValenceSourceVerbal(resolvedSourceKind) && !hasFrameValence && !hasEntradaFixedValence) {
        status = "blocked";
        reason = "function-use-source-valence-frame-unfixed";
      } else if (hasSourceObjects && !hasFrameValence && !hasEntradaFixedValence) {
        status = "blocked";
        reason = "function-use-source-valence-frame-unfixed";
      } else if (hasSourceObjects && hasCurrentObjects && differences.length) {
        status = "blocked";
        reason = "function-use-would-relocate-or-reclassify-valence-object";
      } else if (hasSourceObjects && !hasCurrentObjects && currentOwnsValenceObjectSlots) {
        status = "blocked";
        reason = "function-use-would-delete-valence-object";
      } else if (!hasSourceObjects && hasCurrentObjects) {
        status = "blocked";
        reason = isFunctionUseValenceSourceVerbal(resolvedSourceKind) || hasFrameValence || hasEntradaFixedValence ? "function-use-would-invent-valence-object" : "function-use-has-current-object-without-source-valence-frame";
      } else if (hasSourceObjects && !valenceFrameFixed) {
        status = "blocked";
        reason = "function-use-source-valence-frame-unfixed";
      } else if (hasSourceObjects) {
        reason = "function-use-preserves-fixed-source-valence-object";
      }
      if (forceBlockedReason) {
        status = "blocked";
        reason = String(forceBlockedReason || "").trim();
      }
      return {
        kind: "function-use-valence-object-hard-gate",
        version: 1,
        gateContext: String(gateContext || "function-use"),
        status,
        generationAllowed: status !== "blocked",
        routeRankingAllowed: status !== "blocked",
        diagnosticId: FUNCTION_USE_VALENCE_OBJECT_GATE_DIAGNOSTIC_ID,
        routeStage: FUNCTION_USE_VALENCE_OBJECT_GATE_ROUTE_STAGE,
        reason,
        sourceKind: resolvedSourceKind,
        licensedCurrentValues: licensedCurrentValues && typeof licensedCurrentValues === "object" ? {
          ...licensedCurrentValues
        } : null,
        sourceVector: normalizedSourceVector,
        currentVector: normalizedCurrentVector,
        sourceSignature: getFunctionUseValenceObjectSignature(normalizedSourceVector),
        currentSignature: getFunctionUseValenceObjectSignature(normalizedCurrentVector),
        differences,
        hasSourceObjects,
        hasCurrentObjects,
        hasFrameValence,
        hasEntradaFixedValence,
        hasFormulaEvidence,
        formulaEvidenceAuthorizesValence: false,
        formulaObjectCoverage,
        formulaObjectSlotCoverage: hasFormulaObjectSlotCoverage,
        formulaCoversValenceFrame,
        hasFormulaValence,
        valenceFrameFixed,
        currentVectorOwnsValenceObjectSlots: currentOwnsValenceObjectSlots,
        slotOwnership: currentOwnsValenceObjectSlots ? "current-vector-owns-valence-object-slots" : "function-use-target-does-not-own-valence-object-slots",
        sourceObjectPreservedAsMetadata: hasSourceObjects && !hasCurrentObjects && !currentOwnsValenceObjectSlots && status !== "blocked",
        boundaries: {
          functionUseCannotConsumeValenceObject: true,
          functionUseCannotDeleteValenceObject: true,
          functionUseCannotInventValenceObject: true,
          functionUseCannotRelocateValenceObject: true,
          functionUseCannotReclassifyValenceObject: true,
          functionUseMayAnnotateLicensedReadingsOnly: true,
          unresolvedValenceFrameIsHardGate: true
        }
      };
    }
    const NUCLEAR_CLAUSE_SURFACE_NO_OUTPUT_MESSAGE = "La generacion no produjo una forma.";
    const NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY = "nuclear-clause-surface";
    const NUCLEAR_CLAUSE_SURFACE_ROUTE_BLOCKED_ID = "nuclear-clause-surface-route-blocked";
    const LESSON6_DIRECT_CLASSICAL_OBJECT_DYAD_BY_PREFIX = Object.freeze({
      nēch: "n-ēch",
      tēch: "t-ēch",
      mitz: "m-itz",
      amēch: "am-ēch",
      c: "c-0",
      qu: "qu-0",
      qui: "qui-0",
      quim: "qu-im",
      quin: "qu-in"
    });
    const LESSON6_MONADIC_DIRECT_CLASSICAL_OBJECTS = Object.freeze({
      ne: Object.freeze({
        trajectory: "reflexive-reciprocative",
        specificity: "specific",
        prominence: "shuntline"
      }),
      tē: Object.freeze({
        trajectory: "projective",
        specificity: "nonspecific",
        prominence: "mainline",
        humanness: "human"
      }),
      tla: Object.freeze({
        trajectory: "projective",
        specificity: "nonspecific",
        prominence: "mainline",
        humanness: "nonhuman"
      })
    });
    const NUCLEAR_CLAUSE_SURFACE_ENGINE_INVARIANTS = Object.freeze([Object.freeze({
      id: "surface-output-not-grammar-source",
      lhs: "surface output",
      relation: "not-equal",
      rhs: "grammar source"
    }), Object.freeze({
      id: "formula-slot-not-literal-spelling",
      lhs: "formula slot",
      relation: "not-equal",
      rhs: "literal spelling"
    }), Object.freeze({
      id: "stem-not-whole-output",
      lhs: "stem",
      relation: "not-equal",
      rhs: "whole output"
    }), Object.freeze({
      id: "affix-not-stem",
      lhs: "affix",
      relation: "not-equal",
      rhs: "stem"
    }), Object.freeze({
      id: "derivation-inside-stem",
      lhs: "derivation",
      relation: "inside",
      rhs: "stem"
    }), Object.freeze({
      id: "inflection-outside-stem",
      lhs: "inflection",
      relation: "outside",
      rhs: "stem"
    }), Object.freeze({
      id: "vnc-nnc-not-word",
      lhs: "VNC/NNC",
      relation: "not-equal",
      rhs: "word"
    })]);
    function getDirectClassicalReflexiveDyadForStem(stem = "", {
      pers1 = "",
      pers2 = "",
      subjectPrefix = ""
    } = {}) {
      const normalizedStem = String(stem || "").trim().replace(/^[^\p{L}]+/u, "").replace(/[^\p{L}]+$/u, "");
      const resolvedSubjectPrefix = String(subjectPrefix || pers1 || "").trim();
      const subjectInfo = typeof targetObject.getPers1Pers2Info === "function"
        ? targetObject.getPers1Pers2Info(resolvedSubjectPrefix, pers2)
        : null;
      const reflexivePersonMorph = subjectInfo?.person === 1
        ? subjectInfo.number === "pl" ? "t" : "n"
        : "m";
      if (!normalizedStem) {
        return `${reflexivePersonMorph}-o`;
      }
      return /^[aeiouāēīō]/u.test(normalizedStem)
        ? `${reflexivePersonMorph}-0`
        : `${reflexivePersonMorph}-o`;
    }
    const LESSON6_DIRECT_CLASSICAL_DYAD_SPLIT_FRAMES = Object.freeze({
      "n-ēch": Object.freeze({
        va: "",
        va1: "n",
        va2: "ēch",
        functionalVa1: "n-0",
        functionalVa2: "ēch",
        val1Features: Object.freeze({
          person: "n",
          number: "0"
        }),
        val2Features: Object.freeze({
          objective: "ēch"
        }),
        linearPieces: Object.freeze(["n", "ēch"])
      }),
      "t-ēch": Object.freeze({
        va: "",
        va1: "t",
        va2: "ēch",
        functionalVa1: "t-0",
        functionalVa2: "ēch",
        val1Features: Object.freeze({
          person: "t",
          number: "0"
        }),
        val2Features: Object.freeze({
          objective: "ēch"
        }),
        linearPieces: Object.freeze(["t", "ēch"])
      }),
      "m-itz": Object.freeze({
        va: "",
        va1: "m",
        va2: "itz",
        functionalVa1: "m-0",
        functionalVa2: "itz",
        val1Features: Object.freeze({
          person: "m",
          number: "0"
        }),
        val2Features: Object.freeze({
          objective: "itz"
        }),
        linearPieces: Object.freeze(["m", "itz"])
      }),
      "am-ēch": Object.freeze({
        va: "",
        va1: "am",
        va2: "ēch",
        functionalVa1: "am-0",
        functionalVa2: "ēch",
        val1Features: Object.freeze({
          person: "am",
          number: "0"
        }),
        val2Features: Object.freeze({
          objective: "ēch"
        }),
        linearPieces: Object.freeze(["am", "ēch"])
      }),
      "c-0": Object.freeze({
        va: "",
        va1: "c",
        va2: "0",
        functionalVa1: "c-0",
        functionalVa2: "0",
        val1Features: Object.freeze({
          person: "c",
          objective: "0"
        }),
        val2Features: Object.freeze({
          number: "0"
        }),
        linearPieces: Object.freeze(["c", "0"])
      }),
      "qu-0": Object.freeze({
        va: "",
        va1: "qu",
        va2: "0",
        functionalVa1: "qu-0",
        functionalVa2: "0",
        val1Features: Object.freeze({
          person: "qu",
          objective: "0"
        }),
        val2Features: Object.freeze({
          number: "0"
        }),
        linearPieces: Object.freeze(["qu", "0"])
      }),
      "qui-0": Object.freeze({
        va: "",
        va1: "qui",
        va2: "0",
        functionalVa1: "qui-0",
        functionalVa2: "0",
        val1Features: Object.freeze({
          person: "qui",
          objective: "0"
        }),
        val2Features: Object.freeze({
          number: "0"
        }),
        linearPieces: Object.freeze(["qui", "0"])
      }),
      "qu-im": Object.freeze({
        va: "",
        va1: "qu",
        va2: "im",
        functionalVa1: "qu-0",
        functionalVa2: "im",
        val1Features: Object.freeze({
          person: "qu",
          objective: "0"
        }),
        val2Features: Object.freeze({
          number: "im"
        }),
        linearPieces: Object.freeze(["qu", "im"])
      }),
      "qu-in": Object.freeze({
        va: "",
        va1: "qu",
        va2: "in",
        functionalVa1: "qu-0",
        functionalVa2: "in",
        val1Features: Object.freeze({
          person: "qu",
          objective: "0"
        }),
        val2Features: Object.freeze({
          number: "in"
        }),
        linearPieces: Object.freeze(["qu", "in"])
      }),
      "n-o": Object.freeze({
        va: "",
        va1: "n",
        va2: "o",
        functionalVa1: "n",
        functionalVa2: "o"
      }),
      "t-o": Object.freeze({
        va: "",
        va1: "t",
        va2: "o",
        functionalVa1: "t",
        functionalVa2: "o"
      }),
      "m-o": Object.freeze({
        va: "",
        va1: "m",
        va2: "o",
        functionalVa1: "m",
        functionalVa2: "o"
      }),
      "n-0": Object.freeze({
        va: "",
        va1: "n",
        va2: "0",
        functionalVa1: "n",
        functionalVa2: "0"
      }),
      "t-0": Object.freeze({
        va: "",
        va1: "t",
        va2: "0",
        functionalVa1: "t",
        functionalVa2: "0"
      }),
      "m-0": Object.freeze({
        va: "",
        va1: "m",
        va2: "0",
        functionalVa1: "m",
        functionalVa2: "0"
      })
    });
    function cloneLesson6DirectClassicalDyadSplitFrame(frame = null) {
      if (!frame || typeof frame !== "object") {
        return null;
      }
      return {
        ...frame,
        val1Features: frame.val1Features ? {
          ...frame.val1Features
        } : null,
        val2Features: frame.val2Features ? {
          ...frame.val2Features
        } : null,
        linearPieces: Array.isArray(frame.linearPieces) ? Array.from(frame.linearPieces) : null
      };
    }
    function buildDirectClassicalDyadSourceFrame({
      directDyad = "",
      sourcePrefix = "",
      surfaceScopedPrefix = "",
      stem = ""
    } = {}) {
      const normalizedDirectDyad = String(directDyad || "").trim();
      const targetDyadFrame = LESSON6_DIRECT_CLASSICAL_DYAD_SPLIT_FRAMES[normalizedDirectDyad] || null;
      if (!targetDyadFrame) {
        return null;
      }
      const signature = [normalizedDirectDyad, targetDyadFrame.va1 || "", targetDyadFrame.va2 || "", targetDyadFrame.functionalVa1 || "", targetDyadFrame.functionalVa2 || "", Array.isArray(targetDyadFrame.linearPieces) ? targetDyadFrame.linearPieces.join(".") : ""].join("|");
      return Object.freeze({
        kind: "lesson-6-direct-classical-dyad-source-frame",
        version: 1,
        formulaSchemaId: "vnc-shell",
        directDyad: normalizedDirectDyad,
        sourcePrefix: String(sourcePrefix || ""),
        surfaceScopedPrefix: String(surfaceScopedPrefix || ""),
        stem: String(stem || ""),
        targetDyadFrame: Object.freeze(cloneLesson6DirectClassicalDyadSplitFrame(targetDyadFrame)),
        sourceSignature: signature,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
        grammarAuthority: "ANDREWS_TRANSCRIPTION_CANVAS.md",
        orthographyAuthority: "Classical Andrews transcription"
      });
    }
    function buildDirectClassicalDyadOperationFrame(sourceFrame = null) {
      if (!sourceFrame || sourceFrame.kind !== "lesson-6-direct-classical-dyad-source-frame") {
        return null;
      }
      return Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: "specific-projective-dyad-split",
        family: "vnc-valence",
        routeFamily: "vnc-valence",
        routeStage: "lesson-6-direct-dyad-split",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature: sourceFrame.sourceSignature || "",
        targetDyadFrame: Object.freeze(cloneLesson6DirectClassicalDyadSplitFrame(sourceFrame.targetDyadFrame)),
        operationApplied: "split-direct-classical-dyad-into-va1-va2-slots",
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false
      });
    }
    function getDirectClassicalDyadFrameMismatch({
      sourceFrame = null,
      operationFrame = null
    } = {}) {
      if (!sourceFrame || sourceFrame.kind !== "lesson-6-direct-classical-dyad-source-frame") {
        return "lesson-6-direct-dyad-source-frame-required";
      }
      if (!operationFrame || operationFrame.kind !== "andrews-typed-operation-frame" || operationFrame.operationId !== "specific-projective-dyad-split" || operationFrame.routeFamily !== "vnc-valence" || operationFrame.operationApplied !== "split-direct-classical-dyad-into-va1-va2-slots" || operationFrame.consumesRenderedInput !== false || operationFrame.displayStringsAuthorizeGrammar !== false) {
        return "lesson-6-direct-dyad-operation-frame-required";
      }
      if (String(operationFrame.sourceSignature || "") !== String(sourceFrame.sourceSignature || "")) {
        return "lesson-6-direct-dyad-contradictory-source-frame";
      }
      const sourceTarget = cloneLesson6DirectClassicalDyadSplitFrame(sourceFrame.targetDyadFrame);
      const operationTarget = cloneLesson6DirectClassicalDyadSplitFrame(operationFrame.targetDyadFrame);
      if (JSON.stringify(sourceTarget) !== JSON.stringify(operationTarget)) {
        return "lesson-6-direct-dyad-contradictory-target-frame";
      }
      return "";
    }
    function splitLesson6DirectClassicalDyad(value = "", {
      sourceFrame = null,
      operationFrame = null
    } = {}) {
      void value;
      const mismatch = getDirectClassicalDyadFrameMismatch({
        sourceFrame,
        operationFrame
      });
      if (mismatch) {
        return {
          va: "",
          va1: "",
          va2: "",
          functionalVa1: "",
          functionalVa2: "",
          blocked: true,
          generationAllowed: false,
          diagnosticId: mismatch
        };
      }
      return {
        ...cloneLesson6DirectClassicalDyadSplitFrame(operationFrame.targetDyadFrame),
        sourceFrame,
        operationFrame
      };
    }
    function getDirectClassicalObjectDyadFrame(obj1 = "", {
      stem = "",
      pers1 = "",
      pers2 = "",
      subjectPrefix = ""
    } = {}) {
      const normalized = String(obj1 || "").trim();
      if (!normalized) {
        return null;
      }
      const normalizedSubjectPrefix = String(subjectPrefix || pers1 || "").trim();
      const surfaceScopedPrefix = normalized;
      const directDyad = surfaceScopedPrefix === "mo"
        ? getDirectClassicalReflexiveDyadForStem(stem, {
          pers1: normalizedSubjectPrefix,
          pers2,
          subjectPrefix: normalizedSubjectPrefix
        })
        : surfaceScopedPrefix.includes("-")
          ? surfaceScopedPrefix
          : LESSON6_DIRECT_CLASSICAL_OBJECT_DYAD_BY_PREFIX[surfaceScopedPrefix];
      if (directDyad) {
        const dyadSourceFrame = buildDirectClassicalDyadSourceFrame({
          directDyad,
          sourcePrefix: normalized,
          surfaceScopedPrefix,
          stem
        });
        const dyadOperationFrame = buildDirectClassicalDyadOperationFrame(dyadSourceFrame);
        const dyadMismatch = getDirectClassicalDyadFrameMismatch({
          sourceFrame: dyadSourceFrame,
          operationFrame: dyadOperationFrame
        });
        if (dyadMismatch) {
          return null;
        }
        const subslots = {
          ...cloneLesson6DirectClassicalDyadSplitFrame(dyadOperationFrame.targetDyadFrame),
          sourceFrame: dyadSourceFrame,
          operationFrame: dyadOperationFrame
        };
        const governingFrame = typeof targetObject.buildClassicalValenceGoverningFrame === "function" ? targetObject.buildClassicalValenceGoverningFrame(surfaceScopedPrefix, {
          stem,
          visibleFormulaPrefix: directDyad
        }) : null;
        return {
          sourcePrefix: normalized,
          surfaceScopedPrefix,
          realizedSurfacePrefix: `${subslots.va1 || ""}${subslots.va2 || ""}`,
          visibleFormulaPrefix: directDyad,
          formulaPosition: "va1-va2",
          governingFrame,
          governingPath: governingFrame?.governingPath || "",
          governingSlotId: governingFrame?.valencePosition || "va1-va2",
          sourceSections: governingFrame?.sourceSections || [],
          predicatePositionStatus: "dyadic",
          trajectory: surfaceScopedPrefix === "mo" || /^[ntm]-(?:o|0)$/u.test(directDyad) ? "reflexive-reciprocative" : "projective",
          specificity: "specific",
          prominence: "mainline",
          va1: subslots.va1,
          va2: subslots.va2,
          functionalVa1: subslots.functionalVa1 || subslots.va1,
          functionalVa2: subslots.functionalVa2 || subslots.va2,
          surfaceVa1: subslots.surfaceVa1 || "",
          surfaceVa2: subslots.surfaceVa2 || "",
          surfaceLinearMorph: subslots.surfaceLinearMorph || "",
          val1Features: subslots.val1Features || null,
          val2Features: subslots.val2Features || null,
          linearPieces: subslots.linearPieces || null,
          sourceFrame: dyadSourceFrame,
          operationFrame: dyadOperationFrame,
          directClassicalGeneration: true
        };
      }
      const monadicFrame = LESSON6_MONADIC_DIRECT_CLASSICAL_OBJECTS[normalized];
      if (monadicFrame) {
        const governingFrame = typeof targetObject.buildClassicalValenceGoverningFrame === "function" ? targetObject.buildClassicalValenceGoverningFrame(normalized, {
          stem,
          visibleFormulaPrefix: normalized
        }) : null;
        return {
          sourcePrefix: normalized,
          visibleFormulaPrefix: normalized,
          formulaPosition: "va",
          governingFrame,
          governingPath: governingFrame?.governingPath || "",
          governingSlotId: governingFrame?.valencePosition || "va",
          sourceSections: governingFrame?.sourceSections || [],
          predicatePositionStatus: "monadic",
          va: normalized,
          ...monadicFrame,
          directClassicalGeneration: true
        };
      }
      return null;
    }
    function getDirectClassicalFormulaObjectPrefix(obj1 = "", options = {}) {
      return getDirectClassicalObjectDyadFrame(obj1, options)?.visibleFormulaPrefix || String(obj1 || "");
    }
    function getGeneratedHualDirectionalFormulaObjectPrefix(formulaObject = "") {
      return String(formulaObject || "");
    }
    function buildGeneratedHualDirectionalFormulaFrame({
      directionalChainMeta = null,
      subjectPrefix = "",
      baseObjectPrefix = "",
      formulaObjectPrefix = "",
      formulaReflexivePrefix = ""
    } = {}) {
      const meta = directionalChainMeta && typeof directionalChainMeta === "object" ? directionalChainMeta : null;
      if (!meta || meta.directionalInputPrefix !== "huāl") {
        return null;
      }
      const plan = meta.directionalPlan && typeof meta.directionalPlan === "object" ? meta.directionalPlan : targetObject.buildHualDirectionalPlan({
        directionalOutputPrefix: meta.directionalOutputPrefix || "huāl",
        pers1Base: meta.baseSubjectPrefix || subjectPrefix,
        obj1Base: meta.baseObjectPrefix || baseObjectPrefix,
        obj2: meta.indirectObjectMarker || "",
        obj3: meta.thirdObjectMarker || "",
        directionalRuleMode: meta.directionalRuleMode || "",
        hasSubjectValent: meta.hasSubjectValent !== false,
        isTlaFusion: meta.isTlaFusion === true,
        isIntransitiveVerb: meta.isIntransitiveVerb === true
      });
      const prefix = "huāl";
      const effectiveFormulaObject = getGeneratedHualDirectionalFormulaObjectPrefix(formulaObjectPrefix);
      const hasObject = Boolean(effectiveFormulaObject || formulaReflexivePrefix);
      const position = plan.placeAfterSpecificProjectiveObject === true ? "after-object" : "before-object";
      return {
        prefix,
        position,
        formulaObj1: effectiveFormulaObject,
        formulaReflexive: formulaReflexivePrefix,
        formulaPers1: subjectPrefix,
        directionFollowsObject: position === "after-object",
        hasObject,
        plan
      };
    }
    function buildGeneratedDirectionalFormulaFrame({
      directionalChainMeta = null,
      subjectPrefix = "",
      baseObjectPrefix = "",
      formulaObjectPrefix = "",
      formulaReflexivePrefix = ""
    } = {}) {
      const hualFrame = buildGeneratedHualDirectionalFormulaFrame({
        directionalChainMeta,
        subjectPrefix,
        baseObjectPrefix,
        formulaObjectPrefix,
        formulaReflexivePrefix
      });
      if (hualFrame) {
        return hualFrame;
      }
      const meta = directionalChainMeta && typeof directionalChainMeta === "object" ? directionalChainMeta : null;
      const prefix = String(meta?.directionalInputPrefix || meta?.directionalOutputPrefix || "");
      if (!prefix) {
        return null;
      }
      const hasObject = Boolean(formulaObjectPrefix || formulaReflexivePrefix);
      const formulaPers1 = /^[aeiu]/.test(prefix) && subjectPrefix === "ni" ? "n" : /^[aeiu]/.test(prefix) && subjectPrefix === "ti" ? "t" : subjectPrefix;
      return {
        prefix,
        position: "before-object",
        formulaObj1: formulaObjectPrefix,
        formulaReflexive: formulaReflexivePrefix,
        formulaPers1,
        directionFollowsObject: false,
        hasObject,
        plan: meta.directionalPlan || null
      };
    }
    function stripGeneratedDirectionalPrefixFromFormulaStem(stem = "", directionalChainMeta = null) {
      const value = String(stem || "");
      const meta = directionalChainMeta && typeof directionalChainMeta === "object" ? directionalChainMeta : null;
      const prefix = String(meta?.directionalInputPrefix || "");
      if (!value || !prefix || !value.startsWith(prefix)) {
        return value;
      }
      return value.slice(prefix.length);
    }
    function getNuclearClauseSurfaceEngineInvariants() {
      return NUCLEAR_CLAUSE_SURFACE_ENGINE_INVARIANTS.map(entry => ({
        ...entry
      }));
    }
    function buildNuclearClauseSurfaceEngineContract({
      routeFamily = "",
      routeStage = ""
    } = {}) {
      return {
        ...NUCLEAR_CLAUSE_SURFACE_ENGINE,
        routeFamily: String(routeFamily || ""),
        routeStage: String(routeStage || ""),
        invariants: getNuclearClauseSurfaceEngineInvariants(),
        surfaceOutputIsGrammarSource: false,
        formulaSlotIsLiteralSpelling: false,
        stemIsWholeOutput: false,
        affixIsStem: false,
        derivationScope: "inside-stem",
        inflectionScope: "outside-stem",
        nuclearClauseIsWord: false
      };
    }
    function normalizeNuclearClauseSurfaceContractSurface(value = "") {
      if (typeof targetObject.normalizeGrammarSurfaceValue === "function") {
        return targetObject.normalizeGrammarSurfaceValue(value);
      }
      const surface = String(value || "").trim();
      return surface === "—" ? "" : surface;
    }
    function splitNuclearClauseSurfaceContractText(value = "") {
      return String(value || "").split(/\s*\/\s*/g).map(entry => normalizeNuclearClauseSurfaceContractSurface(entry)).filter(Boolean);
    }
    function getNuclearClauseSurfaceResultFrame(result = null) {
      return (result?.grammarFrame && typeof result.grammarFrame === "object" ? result.grammarFrame : null) || (result?.frames && typeof result.frames === "object" ? result.frames : null);
    }
    function getNuclearClauseSurfaceResultFramePayload(result = null) {
      const grammarFrame = getNuclearClauseSurfaceResultFrame(result);
      return grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object" ? grammarFrame.resultFrame : null;
    }
    function resolveNuclearClauseSurfaceContractSurface(result = null) {
      const frameResult = getNuclearClauseSurfaceResultFramePayload(result);
      const hasResultFrame = Boolean(frameResult);
      const surfaceForms = normalizeGrammarFrameSurfaceForms(result);
      return normalizeNuclearClauseSurfaceContractSurface(surfaceForms[0] || frameResult?.surface || (!hasResultFrame ? result?.surface || result?.result : "") || "");
    }
    function resolveNuclearClauseSurfaceResultFrameSurface(result = null) {
      const frameResult = getNuclearClauseSurfaceResultFramePayload(result);
      if (!frameResult) {
        return "";
      }
      const canonicalForms = getNuclearClauseSurfaceCanonicalRealizationSurfaceForms(frameResult);
      if (canonicalForms.length) {
        return canonicalForms[0] || "";
      }
      const frameForms = [];
      if (Array.isArray(frameResult.surfaceForms)) {
        frameForms.push(...frameResult.surfaceForms);
      }
      if (frameResult.surface) {
        frameForms.push(frameResult.surface);
      }
      return frameForms.flatMap(entry => splitNuclearClauseSurfaceContractText(entry)).find(Boolean) || "";
    }
    function resolveNuclearClauseSurfaceNominalConnectorSurface(connector = null, fallbackSurface = "") {
      const framedSurface = resolveNuclearClauseSurfaceResultFrameSurface(connector);
      if (framedSurface) {
        return framedSurface;
      }
      if (getNuclearClauseSurfaceResultFramePayload(connector)) {
        return "";
      }
      return normalizeNuclearClauseSurfaceContractSurface(connector?.surface || fallbackSurface || "");
    }
    function resolveNuclearClauseSurfaceNominalConnectorDisplaySurface(connector = null, fallbackSurface = "") {
      const framedSurface = resolveNuclearClauseSurfaceResultFrameSurface(connector);
      if (framedSurface) {
        return framedSurface;
      }
      if (getNuclearClauseSurfaceResultFramePayload(connector)) {
        return "";
      }
      return normalizeNuclearClauseSurfaceContractSurface(connector?.displaySurface || connector?.displayConnector || connector?.surface || fallbackSurface || "");
    }
    function resolveNuclearClauseSurfaceFrameSourceInput({
      result = null,
      renderVerb = "",
      verb = ""
    } = {}) {
      const explicitRenderInput = normalizeNuclearClauseSurfaceContractSurface(renderVerb);
      if (explicitRenderInput) {
        return explicitRenderInput;
      }
      const framedSurface = resolveNuclearClauseSurfaceContractSurface(result);
      if (framedSurface) {
        return framedSurface;
      }
      if (getNuclearClauseSurfaceResultFramePayload(result)) {
        return "";
      }
      return normalizeNuclearClauseSurfaceContractSurface(result?.stem) || normalizeNuclearClauseSurfaceContractSurface(verb);
    }
    function getNuclearClauseSurfaceSoundSpellingFrameKey(frame = null) {
      if (!frame || typeof frame !== "object") {
        return "";
      }
      return [frame.ruleId || "", frame.grammarSlot || "", frame.syllablePosition || "", frame.sourceSurface || "", frame.target || "", Array.isArray(frame.targetCandidates) ? frame.targetCandidates.join("/") : "", frame.segmentRole || "", frame.sourceSegmentValue || "", frame.targetSegmentValue || ""].join(":");
    }
    function collectNuclearClauseSurfaceSoundSpellingFrames(...sources) {
      const frames = [];
      const pushFrame = (frame = null) => {
        if (!frame || typeof frame !== "object" || !frame.ruleId) {
          return;
        }
        const key = getNuclearClauseSurfaceSoundSpellingFrameKey(frame);
        if (!key || frames.some(entry => getNuclearClauseSurfaceSoundSpellingFrameKey(entry) === key)) {
          return;
        }
        frames.push({
          ...frame
        });
      };
      sources.forEach(source => {
        if (!source) {
          return;
        }
        if (Array.isArray(source)) {
          source.forEach(pushFrame);
          return;
        }
        if (typeof source === "object") {
          if (Array.isArray(source.soundSpellingFrames)) {
            source.soundSpellingFrames.forEach(pushFrame);
          }
          if (source.soundSpellingFrame && typeof source.soundSpellingFrame === "object") {
            pushFrame(source.soundSpellingFrame);
          }
          const grammarFrame = (source.grammarFrame && typeof source.grammarFrame === "object" ? source.grammarFrame : null) || (source.frames && typeof source.frames === "object" ? source.frames : null);
          if (Array.isArray(grammarFrame?.orthographyFrame?.soundSpellingFrames)) {
            grammarFrame.orthographyFrame.soundSpellingFrames.forEach(pushFrame);
          }
        }
      });
      return frames;
    }
    const CNV_FORMULA_SURFACE_SLOT_ROLES = Object.freeze({
      pers1: Object.freeze(["pers1"]),
      pers2: Object.freeze(["pers2"]),
      directional: Object.freeze(["obj1"]),
      va: Object.freeze(["obj1"]),
      va1: Object.freeze(["obj1"]),
      va2: Object.freeze(["obj1"]),
      base: Object.freeze(["tronco"]),
      tns: Object.freeze(["tronco", "pers2"]),
      num1: Object.freeze(["pers2"]),
      num2: Object.freeze(["pers2"])
    });
    const CNV_FORMULA_FINITE_SURFACE_SLOT_REALIZATION_OPERATION_ID =
      "cnv-formula-finite-surface-slot-realization";
    function normalizeCnvSurfacePathSegments(segments = []) {
      if (typeof targetObject.normalizeOutputSurfaceSegments === "function") {
        return targetObject.normalizeOutputSurfaceSegments(segments);
      }
      return (Array.isArray(segments) ? segments : []).map(segment => ({
        role: String(segment?.role || ""),
        slot: String(segment?.slot || ""),
        value: String(segment?.value || ""),
        soundSpellingFrames: Array.isArray(segment?.soundSpellingFrames) ? segment.soundSpellingFrames.map(frame => ({
          ...frame
        })) : []
      })).filter(segment => segment.role || segment.slot || segment.value);
    }
    function getCnvSurfacePathSegmentValue(segments = [], role = "") {
      const normalizedRole = String(role || "");
      const match = normalizeCnvSurfacePathSegments(segments).find(segment => segment.role === normalizedRole || segment.slot === normalizedRole);
      return String(match?.value || "");
    }
    function splitGeneratedPreteritCnvFoldedConnector(value = "", sourceSubjectSuffix = "") {
      const text = String(value || "");
      if (!text) {
        return null;
      }
      const candidates = String(sourceSubjectSuffix || "") === "t" ? [{
        suffix: "queh",
        connector: "qu-eh",
        num1: "qu",
        num2: "eh"
      }, {
        suffix: "eh",
        connector: "0-eh",
        num1: "0",
        num2: "eh"
      }] : [{
        suffix: "qui",
        connector: "qui-0",
        num1: "qui",
        num2: ""
      }, {
        suffix: "c",
        connector: "c-0",
        num1: "c",
        num2: ""
      }];
      const match = candidates.find(candidate => text.length > candidate.suffix.length && text.endsWith(candidate.suffix));
      if (!match) {
        return null;
      }
      return {
        base: text.slice(0, -match.suffix.length),
        connector: match.connector,
        num1: match.num1,
        num2: match.num2,
        suffix: match.suffix
      };
    }
    function buildGeneratedPreteritCnvConnectorProfile({
      tense = "",
      primaryVerb = "",
      alternateForms = [],
      sourceSubjectSuffix = ""
    } = {}) {
      if (String(tense || "") !== "preterito") {
        return null;
      }
      const entries = [];
      const addEntry = (verb = "") => {
        const split = splitGeneratedPreteritCnvFoldedConnector(verb, sourceSubjectSuffix);
        if (!split || !split.base) {
          return;
        }
        if (!entries.some(entry => entry.base === split.base && entry.connector === split.connector)) {
          entries.push(split);
        }
      };
      addEntry(primaryVerb);
      (Array.isArray(alternateForms) ? alternateForms : []).forEach(form => {
        addEntry(form?.verb || "");
      });
      if (!entries.length) {
        return null;
      }
      return {
        entries,
        primaryConnector: entries[0]?.connector || "",
        baseRealizations: entries.map(entry => entry.base).filter((entry, index, list) => entry && list.indexOf(entry) === index),
        connectorRealizations: entries.map(entry => entry.connector).filter((entry, index, list) => entry && list.indexOf(entry) === index)
      };
    }
    function getGeneratedPreteritFoldedObjectPrefix(obj1 = "", subjectPrefix = "") {
      void subjectPrefix;
      return String(obj1 || "").trim();
    }
    function isGeneratedClassPerfectiveFormulaTense(tense = "") {
      const normalizedTense = String(tense || "");
      if (typeof targetObject.PRETERITO_CLASS_TENSES !== "undefined" && targetObject.PRETERITO_CLASS_TENSES && typeof targetObject.PRETERITO_CLASS_TENSES.has === "function") {
        return targetObject.PRETERITO_CLASS_TENSES.has(normalizedTense);
      }
      return ["preterito", "perfecto", "pasado-remoto"].includes(normalizedTense);
    }
    function getGeneratedClassPerfectiveFormulaBaseCandidates(stem = "") {
      const normalizedStem = String(stem || "").trim().replace(/^\((.*)\)$/, "$1");
      const candidates = [];
      const addCandidate = (candidate = "") => {
        const value = String(candidate || "").trim();
        if (value && !candidates.includes(value)) {
          candidates.push(value);
        }
      };
      getCnvFormulaSourceStemVariants(stem).filter(variant => variant.relation !== "source-final-vowel-removed").forEach(variant => addCandidate(variant.value));
      if (!candidates.length) {
        addCandidate(normalizedStem);
      }
      return candidates;
    }
    function getGeneratedClassPerfectiveSurfaceCore(surface = "", tense = "", sourceSubjectSuffix = "") {
      const strippedTense = typeof stripGeneratedVncFormulaTenseSuffix === "function" ? stripGeneratedVncFormulaTenseSuffix(surface, tense, sourceSubjectSuffix) : String(surface || "");
      if (String(tense || "") !== "preterito") {
        return strippedTense;
      }
      const split = splitGeneratedPreteritCnvFoldedConnector(strippedTense, sourceSubjectSuffix) || splitGeneratedPreteritCnvFoldedConnector(strippedTense, "");
      return split?.base || strippedTense;
    }
    function getGeneratedClassPerfectiveFormulaObjectCandidates(obj1 = "", base = "", subjectPrefix = "") {
      const normalizedObj1 = String(obj1 || "").trim();
      const candidates = [];
      const addCandidate = (candidate = "") => {
        const value = String(candidate || "").trim();
        if (value && !candidates.includes(value)) {
          candidates.push(value);
        }
      };
      addCandidate(getGeneratedPreteritFoldedObjectPrefix(normalizedObj1, subjectPrefix));
      addCandidate(normalizedObj1);
      return candidates;
    }
    function getGeneratedClassPerfectiveFormulaSourceSignature({
      tense = "",
      subjectPrefix = "",
      objectPrefix = "",
      sourceSubjectSuffix = "",
      sourceStem = ""
    } = {}) {
      return [String(tense || ""), String(subjectPrefix || ""), String(objectPrefix || ""), String(sourceSubjectSuffix || ""), String(sourceStem || "")].join("|");
    }
    function buildGeneratedClassPerfectiveFormulaSourceFrame({
      tense = "",
      subjectPrefix = "",
      objectPrefix = "",
      sourceSubjectSuffix = "",
      sourceStem = ""
    } = {}) {
      if (!isGeneratedClassPerfectiveFormulaTense(tense) || !objectPrefix || !sourceStem) {
        return null;
      }
      const baseCandidateEntries = getCnvFormulaSourceStemVariants(sourceStem).filter(variant => variant.relation !== "source-final-vowel-removed");
      const baseCandidates = baseCandidateEntries.map(variant => variant.value);
      const preferredVariant = String(objectPrefix || "").trim() && String(sourceStem || "").trim().startsWith("i") ? baseCandidateEntries.find(variant => variant.relation === "source-final-a-perfective-j") : null;
      const base = preferredVariant?.value || baseCandidates[0] || "";
      if (!base) {
        return null;
      }
      const objectCandidate = getGeneratedClassPerfectiveFormulaObjectCandidates(objectPrefix, base, subjectPrefix)[0] || "";
      const formulaObject = getDirectClassicalFormulaObjectPrefix(objectCandidate, {
        stem: base,
        pers1: subjectPrefix,
        pers2: sourceSubjectSuffix
      });
      const objectSurface = normalizeCnvFormulaMorphForSurface(formulaObject || objectCandidate);
      const sourceSignature = getGeneratedClassPerfectiveFormulaSourceSignature({
        tense,
        subjectPrefix,
        objectPrefix,
        sourceSubjectSuffix,
        sourceStem
      });
      return Object.freeze({
        kind: "generated-class-perfective-formula-source-frame",
        version: 1,
        formulaSchemaId: "vnc-shell",
        tense: String(tense || ""),
        subjectPrefix: String(subjectPrefix || ""),
        objectPrefix: String(objectPrefix || ""),
        sourceSubjectSuffix: String(sourceSubjectSuffix || ""),
        sourceStem: String(sourceStem || ""),
        baseCandidates: Object.freeze(Array.from(baseCandidates)),
        targetProfile: Object.freeze({
          base,
          objectPrefix: objectCandidate,
          formulaObject,
          objectSurface,
          matches: Object.freeze([Object.freeze({
            subjectPrefix: String(subjectPrefix || ""),
            objectPrefix: objectCandidate,
            formulaObject,
            objectSurface,
            base
          })])
        }),
        sourceSignature,
        consumesRenderedInput: false,
        consumesGeneratedBoundaryResult: true,
        generatedBoundaryResultAuthorizesFormula: false,
        generatedBoundaryResultAuthorizesSurface: false,
        displayStringsAuthorizeGrammar: false,
        grammarAuthority: "ANDREWS_TRANSCRIPTION_CANVAS.md",
        orthographyAuthority: "Classical Andrews transcription"
      });
    }
    function buildGeneratedClassPerfectiveFormulaOperationFrame(sourceFrame = null) {
      if (!sourceFrame || sourceFrame.kind !== "generated-class-perfective-formula-source-frame") {
        return null;
      }
      return Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: "generated-class-perfective-formula-profile-realization",
        family: "vnc-formula",
        routeFamily: "vnc-formula",
        routeStage: "class-perfective-formula-profile",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature: sourceFrame.sourceSignature || "",
        targetProfile: sourceFrame.targetProfile,
        operationApplied: "derive-class-perfective-formula-profile-from-source-frame",
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false
      });
    }
    function getGeneratedClassPerfectiveFormulaFrameMismatch({
      sourceFrame = null,
      operationFrame = null
    } = {}) {
      if (!sourceFrame || sourceFrame.kind !== "generated-class-perfective-formula-source-frame") {
        return "generated-class-perfective-formula-source-frame-required";
      }
      if (!operationFrame || operationFrame.kind !== "andrews-typed-operation-frame" || operationFrame.operationId !== "generated-class-perfective-formula-profile-realization" || operationFrame.routeFamily !== "vnc-formula" || operationFrame.operationApplied !== "derive-class-perfective-formula-profile-from-source-frame" || operationFrame.consumesRenderedInput !== false || operationFrame.displayStringsAuthorizeGrammar !== false) {
        return "generated-class-perfective-formula-operation-frame-required";
      }
      if (String(operationFrame.sourceSignature || "") !== String(sourceFrame.sourceSignature || "")) {
        return "generated-class-perfective-formula-contradictory-source-frame";
      }
      if (JSON.stringify(operationFrame.targetProfile || null) !== JSON.stringify(sourceFrame.targetProfile || null)) {
        return "generated-class-perfective-formula-contradictory-target-frame";
      }
      return "";
    }
    function buildGeneratedClassPerfectiveFormulaProfile({
      tense = "",
      surfaceForms = [],
      subjectPrefix = "",
      objectPrefix = "",
      sourceSubjectSuffix = "",
      sourceStem = "",
      sourceFrame = null,
      operationFrame = null
    } = {}) {
      void tense;
      void surfaceForms;
      void subjectPrefix;
      void objectPrefix;
      void sourceSubjectSuffix;
      void sourceStem;
      const mismatch = getGeneratedClassPerfectiveFormulaFrameMismatch({
        sourceFrame,
        operationFrame
      });
      if (mismatch) {
        return null;
      }
      return {
        ...(operationFrame.targetProfile || {}),
        sourceFrame,
        operationFrame
      };
    }
    function stripCnvFormulaSurfacePrefix(base = "", prefix = "") {
      const normalizedBase = String(base || "");
      const prefixParts = String(prefix || "").split("-").map(part => String(part || "").trim()).filter(part => part && part !== "Ø" && part !== "0" && part !== "∅");
      const normalizedPrefix = prefixParts.join("");
      if (!normalizedBase || !normalizedPrefix) {
        return normalizedBase;
      }
      return normalizedBase.startsWith(normalizedPrefix) ? normalizedBase.slice(normalizedPrefix.length) : normalizedBase;
    }
    function stripCnvFormulaSurfacePrefixWithTrace(base = "", prefix = "") {
      const normalizedBase = String(base || "");
      const prefixParts = String(prefix || "").split("-").map(part => String(part || "").trim()).filter(part => part && part !== "Ø" && part !== "0" && part !== "∅");
      const candidates = [prefixParts.join(""), prefixParts[0] || ""].filter((candidate, index, list) => candidate && list.indexOf(candidate) === index);
      const matched = candidates.find(candidate => normalizedBase.startsWith(candidate)) || "";
      if (!normalizedBase || !matched) {
        return {
          base: normalizedBase,
          strippedPrefix: "",
          formulaPrefix: String(prefix || "")
        };
      }
      return {
        base: normalizedBase.slice(matched.length),
        strippedPrefix: matched,
        formulaPrefix: String(prefix || "")
      };
    }
    function getCnvFormulaFoldableBasePrefixes(formulaSlots = null) {
      return getCnvFormulaFoldableBasePrefixEntries(formulaSlots).map(entry => entry.prefix);
    }
    function getCnvFormulaFoldableBasePrefixEntries(formulaSlots = null) {
      const slots = formulaSlots && typeof formulaSlots === "object" ? formulaSlots : {};
      const subjectPrefix = slots.pers1Pers2?.displayPrefix || slots.pers1Pers2?.prefix || "";
      const predicateStem = String(slots.predicateStem?.displayStem || slots.predicateStem?.stem || "");
      const hasValencePrefix = [slots.obj1?.displayPrefix || slots.obj1?.prefix || "", slots.obj2?.displayPrefix || slots.obj2?.prefix || "", slots.obj3?.displayPrefix || slots.obj3?.prefix || "", slots.reflexivo?.displayPrefix || slots.reflexivo?.prefix || ""].some(prefix => {
        const normalized = String(prefix || "").trim();
        return normalized && normalized !== "Ø" && normalized !== "0";
      });
      const subjectEntries = [];
      if (!hasValencePrefix && predicateStem.startsWith("i") && subjectPrefix === "ni") {
        subjectEntries.push({
          sourceSlot: "pers1",
          prefix: "n",
          formulaPrefix: "ni"
        });
      } else if (!hasValencePrefix && predicateStem.startsWith("i") && subjectPrefix === "ti") {
        subjectEntries.push({
          sourceSlot: "pers1",
          prefix: "t",
          formulaPrefix: "ti"
        });
      } else {
        subjectEntries.push({
          sourceSlot: "pers1",
          prefix: subjectPrefix
        });
      }
      return [...subjectEntries, {
        sourceSlot: "val1-val2",
        prefix: slots.obj1?.displayPrefix || slots.obj1?.prefix || ""
      }, {
        sourceSlot: "val1-val2",
        prefix: slots.obj2?.displayPrefix || slots.obj2?.prefix || ""
      }, {
        sourceSlot: "val1-val2",
        prefix: slots.obj3?.displayPrefix || slots.obj3?.prefix || ""
      }, {
        sourceSlot: "val1-val2",
        prefix: slots.reflexivo?.displayPrefix || slots.reflexivo?.prefix || ""
      }];
    }
    function stripCnvFormulaPreteritFoldedBasePrefixesWithTrace(base = "", formulaSlots = null) {
      return getCnvFormulaFoldableBasePrefixEntries(formulaSlots).reduce((state, entry) => {
        const stripped = stripCnvFormulaSurfacePrefixWithTrace(state.base, entry.prefix);
        if (stripped.strippedPrefix) {
          state.strippedPrefixes.push({
            sourceSlot: entry.sourceSlot || "val1-val2",
            targetSlot: "base",
            relation: "copied-into-base",
            formulaPrefix: entry.formulaPrefix || stripped.formulaPrefix,
            surfacePrefix: stripped.strippedPrefix
          });
        }
        state.base = stripped.base;
        return state;
      }, {
        base: String(base || ""),
        strippedPrefixes: []
      });
    }
    function stripCnvFormulaPreteritFoldedBasePrefixes(base = "", formulaSlots = null) {
      return stripCnvFormulaPreteritFoldedBasePrefixesWithTrace(base, formulaSlots).base;
    }
    function buildCnvFormulaAspectSurfaceSlots({
      formulaSlots = null,
      base = undefined,
      tns = undefined,
      num1 = undefined,
      num2 = undefined,
      baseCopyRelations = []
    } = {}) {
      const slots = formulaSlots && typeof formulaSlots === "object" ? formulaSlots : {};
      const surfaceSlots = {};
      const pers1 = String(slots.pers1Pers2?.displayPrefix || slots.pers1Pers2?.prefix || "");
      if (pers1 && pers1 !== "Ø") {
        surfaceSlots.pers1 = pers1;
      }
      const directional = String(slots.directional?.displayPrefix || slots.directional?.prefix || "");
      if (directional && directional !== "Ø") {
        surfaceSlots.directional = directional;
      }
      if (base !== undefined) {
        surfaceSlots.base = String(base || "Ø");
      }
      if (tns !== undefined) {
        surfaceSlots.tns = String(tns || "");
      }
      if (num1 !== undefined) {
        surfaceSlots.num1 = String(num1 || "0");
      }
      if (num2 !== undefined) {
        surfaceSlots.num2 = String(num2 || "0");
      }
      if (Array.isArray(baseCopyRelations) && baseCopyRelations.length) {
        surfaceSlots.baseCopyRelations = baseCopyRelations.map(relation => ({
          ...relation
        }));
      }
      const objectMorph = getCnvFormulaObjectMorph(slots);
      if (!objectMorph || objectMorph === "Ø") {
        return surfaceSlots;
      }
      const objectFunctionalSubslots = getCnvFormulaObjectFunctionalSubslots(slots);
      if (!objectMorph.includes("-")) {
        surfaceSlots.va = objectMorph;
        return surfaceSlots;
      }
      const [linearVa1, linearVa2] = splitCnvFormulaSubslots(objectMorph);
      const va1 = objectFunctionalSubslots?.va1 || linearVa1;
      const va2 = objectFunctionalSubslots?.va2 || linearVa2;
      const surfaceVa1 = objectFunctionalSubslots?.surfaceVa1 || va1;
      const surfaceVa2 = objectFunctionalSubslots?.surfaceVa2 || va2;
      surfaceSlots.va = "";
      surfaceSlots.va1 = surfaceVa1 === "Ø" || surfaceVa1 === "0" ? "" : surfaceVa1;
      surfaceSlots.va2 = surfaceVa2 === "Ø" || surfaceVa2 === "0" ? "" : surfaceVa2;
      return surfaceSlots;
    }
    function stripCnvFormulaSurfaceSuffixWithTrace(surface = "", suffix = "") {
      const normalizedSurface = String(surface || "");
      const normalizedSuffix = normalizeCnvFormulaMorphForSurface(suffix);
      if (!normalizedSurface || !normalizedSuffix || !normalizedSurface.endsWith(normalizedSuffix)) {
        return {
          surface: normalizedSurface,
          strippedSuffix: ""
        };
      }
      return {
        surface: normalizedSurface.slice(0, -normalizedSuffix.length),
        strippedSuffix: normalizedSuffix
      };
    }
    function splitCnvFormulaPreteritConnectorSuffix(value = "", sourceSubjectSuffix = "") {
      const text = String(value || "");
      if (!text) {
        return null;
      }
      const candidates = String(sourceSubjectSuffix || "") === "t" ? [{
        suffix: "queh",
        connector: "qu-eh",
        num1: "qu",
        num2: "eh"
      }, {
        suffix: "eh",
        connector: "0-eh",
        num1: "0",
        num2: "eh"
      }] : [{
        suffix: "qui",
        connector: "qui-0",
        num1: "qui",
        num2: "0"
      }, {
        suffix: "c",
        connector: "c-0",
        num1: "c",
        num2: "0"
      }];
      const match = candidates.find(candidate => text === candidate.suffix || text.length > candidate.suffix.length && text.endsWith(candidate.suffix));
      if (!match) {
        return null;
      }
      return {
        base: text === match.suffix ? "" : text.slice(0, -match.suffix.length),
        connector: match.connector,
        num1: match.num1,
        num2: match.num2,
        suffix: match.suffix
      };
    }
    function getCnvFormulaSourceStemVariants(sourceStem = "") {
      const normalizedStem = String(sourceStem || "").trim().replace(/^\((.*)\)$/, "$1");
      const variants = [];
      const addVariant = (variant = "", relation = "") => {
        const value = String(variant || "").trim();
        if (!value || variants.some(entry => entry.value === value)) {
          return;
        }
        variants.push({
          value,
          relation
        });
      };
      addVariant(normalizedStem, "source-stem");
      if (/[aeiou]$/i.test(normalizedStem)) {
        const finalVowelRemoved = normalizedStem.slice(0, -1);
        addVariant(finalVowelRemoved, "source-final-vowel-removed");
        if (/m$/i.test(finalVowelRemoved)) {
          addVariant(`${finalVowelRemoved.slice(0, -1)}n`, "source-final-vowel-removed-m-coda-n");
        }
      }
      if (/ya$/i.test(normalizedStem)) {
        addVariant(`${normalizedStem.slice(0, -2)}sh`, "source-final-y-coda-sh");
      }
      if (/a$/i.test(normalizedStem)) {
        addVariant(`${normalizedStem.slice(0, -1)}j`, "source-final-a-perfective-j");
      }
      return variants;
    }
    function scoreCnvFormulaSourceStemVariant(base = "", sourceStem = "") {
      const normalizedBase = String(base || "");
      if (!normalizedBase) {
        return 0;
      }
      const variants = getCnvFormulaSourceStemVariants(sourceStem);
      const exactIndex = variants.findIndex(variant => variant.value === normalizedBase);
      if (exactIndex >= 0) {
        return 100 - exactIndex;
      }
      const source = String(sourceStem || "");
      if (source && source.startsWith(normalizedBase)) {
        return Math.max(1, 60 - (source.length - normalizedBase.length));
      }
      if (source && normalizedBase.startsWith(source)) {
        return Math.max(1, 40 - (normalizedBase.length - source.length));
      }
      return 0;
    }
    function getCnvFormulaSourceStemVariantRelation(base = "", sourceStem = "") {
      const normalizedBase = String(base || "");
      if (!normalizedBase) {
        return "";
      }
      const variant = getCnvFormulaSourceStemVariants(sourceStem).find(entry => entry.value === normalizedBase);
      return variant?.relation || "";
    }
    function hasCnvFormulaValencePrefix(slots = null) {
      const source = slots && typeof slots === "object" ? slots : {};
      return [source.obj1?.displayPrefix || source.obj1?.prefix || "", source.obj2?.displayPrefix || source.obj2?.prefix || "", source.obj3?.displayPrefix || source.obj3?.prefix || "", source.reflexivo?.displayPrefix || source.reflexivo?.prefix || ""].some(prefix => {
        const value = String(prefix || "").trim();
        return value && value !== "Ø" && value !== "0";
      });
    }
    function resolveCnvFormulaPreteritPredicateCore({
      core = "",
      slots = null,
      sourcePredicateStem = "",
      sourceConnector = "",
      sourceSubjectSuffix = ""
    } = {}) {
      const formulaStem = String(
        slots?.predicateStem?.displayStem
        || slots?.predicateStem?.stem
        || ""
      );
      const sourceStems = Array.from(new Set(
        [formulaStem, String(sourcePredicateStem || "")]
          .map(stem => String(stem || "").trim())
          .filter(Boolean)
      ));
      const scoreSourceStemVariant = (base = "") =>
        Math.max(0, ...sourceStems.map(stem => scoreCnvFormulaSourceStemVariant(base, stem)));
      const getSourceStemVariantRelation = (base = "") => {
        const scored = sourceStems.map(stem => ({
          relation: getCnvFormulaSourceStemVariantRelation(base, stem),
          score: scoreCnvFormulaSourceStemVariant(base, stem)
        })).sort((left, right) => right.score - left.score);
        return scored[0]?.relation || "";
      };
      const candidates = [];
      const addCandidate = ({
        base = "",
        num1 = "",
        num2 = "",
        relation = "",
        connectorMatchesSource = false
      } = {}) => {
        const normalizedBase = String(base || "");
        const key = `${normalizedBase}|${num1 || "0"}|${num2 || "0"}`;
        if (!normalizedBase || candidates.some(candidate => candidate.key === key)) {
          return;
        }
        const strippedBase = stripCnvFormulaPreteritFoldedBasePrefixesWithTrace(normalizedBase, slots).base;
        const sourceScore = scoreSourceStemVariant(strippedBase);
        const sourceStemRelation = getSourceStemVariantRelation(strippedBase);
        const finalVowelRemovedStemOwnsFinalConsonant = relation === "source-connector-with-stem-variant" && sourceStemRelation === "source-final-vowel-removed";
        const connectorScore = finalVowelRemovedStemOwnsFinalConsonant ? -10 : connectorMatchesSource ? 20 : 0;
        candidates.push({
          key,
          base: normalizedBase,
          num1: num1 || "0",
          num2: num2 || "0",
          relation,
          score: sourceScore + connectorScore + (relation === "surface-connector-suffix" ? 5 : 0)
        });
      };
      const split = splitCnvFormulaPreteritConnectorSuffix(core, sourceSubjectSuffix) || splitCnvFormulaPreteritConnectorSuffix(core, "");
      if (split) {
        addCandidate({
          base: split.base,
          num1: split.num1,
          num2: split.num2,
          relation: "surface-connector-suffix",
          connectorMatchesSource: !sourceConnector || sourceConnector === split.connector
        });
      }
      if (hasCnvFormulaValencePrefix(slots) && (sourceConnector === "c-0" || sourceConnector === "qu-0" || sourceConnector === "qui-0")) {
        const [sourceNum1, sourceNum2] = splitCnvFormulaSubslots(sourceConnector);
        addCandidate({
          base: core,
          num1: sourceNum1 || "0",
          num2: sourceNum2 || "0",
          relation: "source-connector-with-stem-variant",
          connectorMatchesSource: true
        });
      }
      const useFormulaZeroFallback = !sourceConnector || sourceConnector === "Ø-Ø";
      const strippedFallbackBase = stripCnvFormulaPreteritFoldedBasePrefixesWithTrace(core, slots).base;
      const fallbackUsesSurfaceZero = useFormulaZeroFallback && formulaStem && strippedFallbackBase && strippedFallbackBase !== formulaStem && scoreCnvFormulaSourceStemVariant(strippedFallbackBase, formulaStem) > 0;
      addCandidate({
        base: core,
        num1: useFormulaZeroFallback && !fallbackUsesSurfaceZero ? "Ø" : "0",
        num2: useFormulaZeroFallback && !fallbackUsesSurfaceZero ? "Ø" : "0",
        relation: "zero-connector-fallback",
        connectorMatchesSource: !sourceConnector || sourceConnector === "Ø-Ø"
      });
      return candidates.sort((left, right) => right.score - left.score)[0] || {
        base: core
      };
    }
    function getCnvFormulaSurfaceSlotsSourceSignature({
      formulaSlots = null,
      sourcePredicateStem = "",
      targetSurfaceSlots = null,
      surfacePathIndex = 0
    } = {}) {
      return JSON.stringify({
        formulaSlots,
        sourcePredicateStem,
        targetSurfaceSlots,
        surfacePathIndex
      });
    }
    function buildCnvFormulaSurfaceSlotsFromStructuredSegments({
      formulaSlots = null,
      sourcePredicateStem = "",
      surface = "",
      segments = []
    } = {}) {
      const slots = formulaSlots && typeof formulaSlots === "object" ? formulaSlots : {};
      const normalizedSegments = normalizeCnvSurfacePathSegments(segments);
      const tenseValue = String(slots.tensePosition?.tenseValue || slots.tensePosition?.compatibilityLabel || "");
      const tenseMorph = String(slots.tensePosition?.displayMorph || slots.tensePosition?.morph || "");
      const tenseSurface = normalizeCnvFormulaMorphForSurface(tenseMorph);
      const connectorMorph = getCnvFormulaSlotDisplayMorph("num1Num2", slots.num1Num2 || {});
      const [num1, num2] = splitCnvFormulaSubslots(connectorMorph);
      const num1Surface = normalizeCnvFormulaMorphForSurface(num1 || "");
      const num2Surface = normalizeCnvFormulaMorphForSurface(num2 || "");
      const sourceConnector = String(slots.num1Num2?.displayConnector || slots.num1Num2?.connector || "");
      const sourceSubjectSuffix = sourceConnector === "qu-eh" || sourceConnector === "0-eh" ? "t" : "";
      const particlePrefix = getCnvSurfacePathSegmentValue(normalizedSegments, "particulaPrepuesta");
      const surfacePers1 = getCnvSurfacePathSegmentValue(normalizedSegments, "pers1");
      const tronco = getCnvSurfacePathSegmentValue(normalizedSegments, "tronco");
      const surfacePers2 = getCnvSurfacePathSegmentValue(normalizedSegments, "pers2");
      const objectMorph = getCnvFormulaObjectMorph(slots);
      const directionalMorph = String(slots.directional?.displayPrefix || slots.directional?.prefix || "");
      const directionalSurface = normalizeCnvFormulaMorphForSurface(directionalMorph);
      const objectSegment = getCnvSurfacePathSegmentValue(normalizedSegments, "obj1");
      const hasQuinObjectSurface = objectMorph === "qu-in" && (normalizeCnvFormulaMorphForSurface(objectSegment) === "quin" || String(surface || "").includes("quin"));
      const reflexiveMorph = String(slots.reflexivo?.displayPrefix || slots.reflexivo?.prefix || "");
      const objectSlotKey = reflexiveMorph && reflexiveMorph !== "Ø" ? "reflexivo" : "obj1";
      const getQuinObjectFormulaSlotOverride = () => {
        if (!hasQuinObjectSurface) {
          return {};
        }
        const sourceSlot = slots[objectSlotKey] || {};
        return {
          [objectSlotKey]: {
            ...sourceSlot,
            lesson6DirectClassicalDyad: {
              ...(sourceSlot.lesson6DirectClassicalDyad || {}),
              surfaceVa2: "in",
              surfaceLinearMorph: "qu-in"
            }
          }
        };
      };
      const readExternalSuffix = (suffix = "") => {
        const value = String(suffix || "");
        if (!value) {
          return null;
        }
        if (tenseValue === "preterito") {
          const split = splitCnvFormulaPreteritConnectorSuffix(value, sourceSubjectSuffix) || splitCnvFormulaPreteritConnectorSuffix(value, "");
          if (split && !split.base) {
            return {
              num1: split.num1,
              num2: split.num2
            };
          }
        }
        const expectedSuffix = `${tenseSurface}${num1Surface}${num2Surface}`;
        if (!expectedSuffix || !value.endsWith(expectedSuffix)) {
          return null;
        }
        return {
          ...(tenseSurface ? {
            tns: tenseSurface
          } : {}),
          ...(num1Surface ? {
            num1: num1Surface
          } : {}),
          ...(num2Surface ? {
            num2: num2Surface
          } : {})
        };
      };
      const readPredicateCore = (coreSurface = "") => {
        let core = String(coreSurface || "");
        const suffixSlots = readExternalSuffix(surfacePers2);
        if (tenseValue === "preterito" && !suffixSlots) {
          return resolveCnvFormulaPreteritPredicateCore({
            core,
            slots,
            sourcePredicateStem,
            sourceConnector,
            sourceSubjectSuffix
          });
        }
        const num2Strip = !suffixSlots?.num2 ? stripCnvFormulaSurfaceSuffixWithTrace(core, num2 || "") : {
          surface: core,
          strippedSuffix: ""
        };
        core = num2Strip.surface;
        const num1Strip = !suffixSlots?.num1 ? stripCnvFormulaSurfaceSuffixWithTrace(core, num1 || "") : {
          surface: core,
          strippedSuffix: ""
        };
        core = num1Strip.surface;
        let strippedTense = "";
        if (!suffixSlots?.tns && tenseSurface && core.endsWith(tenseSurface)) {
          core = core.slice(0, -tenseSurface.length);
          strippedTense = tenseSurface;
        } else if (!suffixSlots?.tns && tenseSurface === "ka" && core.endsWith("a")) {
          core = core.slice(0, -1);
          strippedTense = "a";
        }
        return {
          base: core,
          ...(suffixSlots || {}),
          ...(strippedTense ? {
            tns: strippedTense
          } : {}),
          ...(num1Strip.strippedSuffix ? {
            num1: num1Strip.strippedSuffix
          } : {}),
          ...(num2Strip.strippedSuffix ? {
            num2: num2Strip.strippedSuffix
          } : {})
        };
      };
      const buildFromCore = (
        coreSurface = "",
        formulaSlotOverrides = {},
        initialBaseCopyRelations = []
      ) => {
        let coreForPredicate = String(coreSurface || "");
        if (directionalSurface && coreForPredicate.startsWith(directionalSurface)) {
          coreForPredicate = coreForPredicate.slice(directionalSurface.length);
        }
        const predicate = readPredicateCore(coreForPredicate);
        const shouldStripFoldedBasePrefixes = tenseValue && tenseValue !== "presente";
        const strippedBase = shouldStripFoldedBasePrefixes ? stripCnvFormulaPreteritFoldedBasePrefixesWithTrace(predicate.base, slots) : {
          base: predicate.base,
          strippedPrefixes: []
        };
        const baseCopyRelations = [
          ...(Array.isArray(initialBaseCopyRelations) ? initialBaseCopyRelations : []),
          ...strippedBase.strippedPrefixes
        ];
        const copiedSubjectPrefix = baseCopyRelations.find(relation => relation.sourceSlot === "pers1")?.surfacePrefix || "";
        return buildCnvFormulaAspectSurfaceSlots({
          formulaSlots: {
            ...slots,
            ...formulaSlotOverrides,
            pers1Pers2: {
              ...(slots.pers1Pers2 || {}),
              ...(formulaSlotOverrides.pers1Pers2 || {}),
              ...(copiedSubjectPrefix ? {
                displayPrefix: copiedSubjectPrefix
              } : {})
            }
          },
          base: strippedBase.base || "Ø",
          baseCopyRelations,
          ...(predicate.tns !== undefined ? {
            tns: predicate.tns
          } : {}),
          ...(predicate.num1 !== undefined ? {
            num1: predicate.num1
          } : {}),
          ...(predicate.num2 !== undefined ? {
            num2: predicate.num2
          } : {})
        });
      };
      const formulaPers1Surface = normalizeCnvFormulaMorphForSurface(
        slots.pers1Pers2?.displayPrefix || slots.pers1Pers2?.prefix || ""
      );
      const typedPrefixIsFoldedIntoTronco =
        Boolean(formulaPers1Surface && !surfacePers1)
        || Boolean((directionalSurface || normalizeCnvFormulaMorphForSurface(objectMorph)) && !objectSegment);
      if (tronco && !typedPrefixIsFoldedIntoTronco) {
        if (hasQuinObjectSurface) {
          return buildFromCore(tronco.startsWith("h") ? tronco.slice(1) : tronco, getQuinObjectFormulaSlotOverride());
        }
        return buildFromCore(tronco);
      }
      let text = String(surface || "");
      if (particlePrefix && text.startsWith(particlePrefix)) {
        text = text.slice(particlePrefix.length);
      }
      text = text.trimStart();
      if (!text) {
        return null;
      }
      const pers1Morph = String(slots.pers1Pers2?.displayPrefix || slots.pers1Pers2?.prefix || "");
      const pers1Surface = normalizeCnvFormulaMorphForSurface(pers1Morph);
      let core = text;
      const formulaSlotOverrides = {};
      const initialBaseCopyRelations = [];
      if (pers1Surface && core.startsWith(pers1Surface)) {
        formulaSlotOverrides.pers1Pers2 = {
          ...(slots.pers1Pers2 || {}),
          displayPrefix: pers1Surface
        };
        core = core.slice(pers1Surface.length);
        initialBaseCopyRelations.push({
          sourceSlot: "pers1",
          targetSlot: "base",
          relation: "copied-into-base",
          formulaPrefix: pers1Morph,
          surfacePrefix: pers1Surface
        });
      } else if (pers1Morph && pers1Morph !== "Ø") {
        formulaSlotOverrides.pers1Pers2 = {
          ...(slots.pers1Pers2 || {}),
          displayPrefix: ""
        };
      }
      if (objectMorph && objectMorph !== "Ø") {
        const objectSurface = normalizeCnvFormulaMorphForSurface(objectMorph);
        if (hasQuinObjectSurface && core.startsWith("quin")) {
          Object.assign(formulaSlotOverrides, getQuinObjectFormulaSlotOverride());
          core = core.slice("quin".length);
          initialBaseCopyRelations.push({
            sourceSlot: "val1-val2",
            targetSlot: "base",
            relation: "copied-into-base",
            formulaPrefix: objectMorph,
            surfacePrefix: "quin"
          });
        } else if (objectSurface && core.startsWith(objectSurface)) {
          core = core.slice(objectSurface.length);
          initialBaseCopyRelations.push({
            sourceSlot: "val1-val2",
            targetSlot: "base",
            relation: "copied-into-base",
            formulaPrefix: objectMorph,
            surfacePrefix: objectSurface
          });
        }
      }
      return buildFromCore(core, formulaSlotOverrides, initialBaseCopyRelations);
    }
    function buildCnvFormulaSurfaceSlotsSourceFrame({
      formulaSlots = null,
      sourcePredicateStem = "",
      surface = "",
      segments = [],
      surfacePathIndex = 0
    } = {}) {
      const slots = formulaSlots && typeof formulaSlots === "object" ? formulaSlots : null;
      if (!slots) {
        return null;
      }
      const targetSurfaceSlots = buildCnvFormulaSurfaceSlotsFromStructuredSegments({
        formulaSlots: slots,
        sourcePredicateStem,
        surface,
        segments
      });
      if (!targetSurfaceSlots) {
        return null;
      }
      const sourceSignature = getCnvFormulaSurfaceSlotsSourceSignature({
        formulaSlots: slots,
        sourcePredicateStem,
        targetSurfaceSlots,
        surfacePathIndex
      });
      const frame = Object.freeze({
        kind: "cnv-formula-lesson-7-surface-slots-source-frame",
        version: 1,
        formulaSchemaId: "vnc-shell",
        routeFamily: "vnc-formula",
        routeStage: "lesson-7-surface-slot-realization",
        formulaSlots: slots,
        sourcePredicateStem: String(sourcePredicateStem || ""),
        targetSurfaceSlots: Object.freeze({
          ...targetSurfaceSlots
        }),
        surfacePathIndex,
        sourceSignature,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
        grammarAuthority: "ANDREWS_TRANSCRIPTION_CANVAS.md",
        orthographyAuthority: "Classical Andrews transcription"
      });
      issuedCnvFormulaSurfaceSlotSourceFrames.add(frame);
      return frame;
    }
    function buildCnvFormulaSurfaceSlotsOperationFrame(sourceFrame = null) {
      if (!sourceFrame
        || !issuedCnvFormulaSurfaceSlotSourceFrames.has(sourceFrame)
        || sourceFrame.kind !== "cnv-formula-lesson-7-surface-slots-source-frame") {
        return null;
      }
      const frame = Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: CNV_FORMULA_FINITE_SURFACE_SLOT_REALIZATION_OPERATION_ID,
        family: "vnc-formula",
        routeFamily: "vnc-formula",
        routeStage: "lesson-7-surface-slot-realization",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature: sourceFrame.sourceSignature || "",
        targetSurfaceSlots: Object.freeze({
          ...(sourceFrame.targetSurfaceSlots || {})
        }),
        operationApplied: "realize-cnv-lesson-7-surface-slots-from-source-frame",
        consumesRenderedInput: false,
        consumesGeneratedBoundaryResult: true,
        generatedBoundaryResultAuthorizesFormula: false,
        generatedBoundaryResultAuthorizesSurface: false,
        displayStringsAuthorizeGrammar: false
      });
      issuedCnvFormulaSurfaceSlotOperationFrames.add(frame);
      return frame;
    }
    function getCnvFormulaSurfaceSlotsFrameMismatch({
      sourceFrame = null,
      operationFrame = null
    } = {}) {
      if (!sourceFrame
        || !issuedCnvFormulaSurfaceSlotSourceFrames.has(sourceFrame)
        || sourceFrame.kind !== "cnv-formula-lesson-7-surface-slots-source-frame") {
        return "cnv-formula-lesson-7-surface-slots-source-frame-required";
      }
      if (!operationFrame
        || !issuedCnvFormulaSurfaceSlotOperationFrames.has(operationFrame)
        || operationFrame.kind !== "andrews-typed-operation-frame"
        || operationFrame.operationId !== CNV_FORMULA_FINITE_SURFACE_SLOT_REALIZATION_OPERATION_ID
        || operationFrame.routeFamily !== "vnc-formula"
        || operationFrame.operationApplied !== "realize-cnv-lesson-7-surface-slots-from-source-frame"
        || operationFrame.consumesRenderedInput !== false
        || operationFrame.consumesGeneratedBoundaryResult !== true
        || operationFrame.generatedBoundaryResultAuthorizesFormula !== false
        || operationFrame.generatedBoundaryResultAuthorizesSurface !== false
        || operationFrame.displayStringsAuthorizeGrammar !== false) {
        return "cnv-formula-lesson-7-surface-slots-operation-frame-required";
      }
      if (String(operationFrame.sourceSignature || "") !== String(sourceFrame.sourceSignature || "")) {
        return "cnv-formula-lesson-7-surface-slots-contradictory-source-frame";
      }
      if (JSON.stringify(operationFrame.targetSurfaceSlots || null) !== JSON.stringify(sourceFrame.targetSurfaceSlots || null)) {
        return "cnv-formula-lesson-7-surface-slots-contradictory-target-frame";
      }
      return "";
    }
    function getCnvFormulaSurfaceSlots(formulaSlots = null, surface = "", segments = [], options = {}) {
      void formulaSlots;
      void surface;
      void segments;
      const sourceFrame = options?.sourceFrame || null;
      const operationFrame = options?.operationFrame || null;
      const mismatch = getCnvFormulaSurfaceSlotsFrameMismatch({
        sourceFrame,
        operationFrame
      });
      if (mismatch) {
        return null;
      }
      return {
        ...(operationFrame.targetSurfaceSlots || {})
      };
    }
    function normalizeCnvFormulaMorphForSurface(value = "") {
      return String(value || "").split("-").map(part => String(part || "").trim()).filter(part => part && part !== "Ø" && part !== "0" && part !== "∅").join("");
    }
    function getCnvFormulaSlotDisplayMorph(slotKey = "", slot = null) {
      const node = slot && typeof slot === "object" ? slot : {};
      switch (slotKey) {
        case "pers1Pers2":
          return `${String(node.displayPrefix || node.prefix || "Ø") || "Ø"}-${String(node.displayCase || node.case || node.pers2 || "Ø") || "Ø"}`;
        case "predicateStem":
          return String(node.displayStem || node.stem || "∅") || "∅";
        case "tensePosition":
          return String(node.displayMorph || node.morph || node.tenseMorph || "Ø") || "Ø";
        case "num1Num2":
          return String(node.displayConnector || node.connector || node.surface || "Ø-Ø") || "Ø-Ø";
        default:
          return String(node.displayPrefix || node.prefix || "Ø") || "Ø";
      }
    }
    function splitCnvFormulaSubslots(value = "") {
      const normalized = String(value || "").trim();
      if (!normalized) {
        return ["", ""];
      }
      if (!normalized.includes("-")) {
        return ["", normalized];
      }
      const parts = normalized.split("-");
      return [parts[0] || "", parts.slice(1).join("-") || ""];
    }
    function getCnvFormulaObjectMorph(formulaSlots = null) {
      const slots = formulaSlots && typeof formulaSlots === "object" ? formulaSlots : {};
      const reflexive = slots.reflexivo || {};
      const object = slots.obj1 || {};
      const reflexiveDisplay = String(reflexive.displayPrefix || reflexive.prefix || "");
      if (reflexiveDisplay && reflexiveDisplay !== "Ø") {
        return reflexiveDisplay;
      }
      return String(object.displayPrefix || object.prefix || "");
    }
    function getCnvFormulaObjectFunctionalSubslots(formulaSlots = null) {
      const slots = formulaSlots && typeof formulaSlots === "object" ? formulaSlots : {};
      const reflexive = slots.reflexivo || {};
      const object = slots.obj1 || {};
      const source = reflexive.lesson6DirectClassicalDyad && String(reflexive.displayPrefix || reflexive.prefix || "") !== "Ø" ? reflexive.lesson6DirectClassicalDyad : object.lesson6DirectClassicalDyad;
      if (!source || typeof source !== "object" || source.formulaPosition !== "va1-va2") {
        return null;
      }
      const va1 = String(source.functionalVa1 || source.va1 || "");
      const va2 = String(source.functionalVa2 || source.va2 || "");
      if (!va1 && !va2) {
        return null;
      }
      return {
        va1,
        va2,
        val1Features: source.val1Features || null,
        val2Features: source.val2Features || null,
        visibleFormulaPrefix: String(source.visibleFormulaPrefix || ""),
        surfaceVa1: String(source.surfaceVa1 || ""),
        surfaceVa2: String(source.surfaceVa2 || ""),
        surfaceLinearMorph: String(source.surfaceLinearMorph || ""),
        linearPieces: Array.isArray(source.linearPieces) ? source.linearPieces.slice() : []
      };
    }
    function buildCnvFormulaAndrewsPathSlots(formulaSlots = null) {
      const slots = formulaSlots && typeof formulaSlots === "object" ? formulaSlots : {};
      const subject = slots.pers1Pers2 || {};
      const directional = slots.directional || {};
      const predicate = slots.predicateStem || {};
      const tense = slots.tensePosition || {};
      const connector = slots.num1Num2 || {};
      const objectMorph = getCnvFormulaObjectMorph(slots);
      const objectFunctionalSubslots = getCnvFormulaObjectFunctionalSubslots(slots);
      const connectorMorph = getCnvFormulaSlotDisplayMorph("num1Num2", connector);
      const [num1, num2] = splitCnvFormulaSubslots(connectorMorph);
      const connectorOptions = Array.isArray(connector.connectorOptions) ? connector.connectorOptions.slice() : [];
      const num1Options = Array.isArray(connector.num1Options) ? connector.num1Options.slice() : [];
      const num2Options = Array.isArray(connector.num2Options) ? connector.num2Options.slice() : [];
      const pathSlots = [{
        formulaSlotKey: "pers1",
        formulaSlot: "pers1",
        formulaRole: "subject",
        formulaMorph: String(subject.displayPrefix || subject.prefix || "Ø") || "Ø"
      }, {
        formulaSlotKey: "pers2",
        formulaSlot: "pers2",
        formulaRole: "subject",
        formulaMorph: String(subject.displayCase || subject.case || subject.pers2 || "Ø") || "Ø"
      }];
      const directionalMorph = String(directional.displayPrefix || directional.prefix || "");
      if (directionalMorph && directionalMorph !== "Ø") {
        pathSlots.push({
          formulaSlotKey: "directional",
          formulaSlot: "directional",
          formulaRole: "directional-prefix",
          formulaMorph: directionalMorph
        });
      }
      if (objectMorph && objectMorph !== "Ø") {
        if (objectMorph.includes("-")) {
          const [va1, va2] = splitCnvFormulaSubslots(objectMorph);
          pathSlots.push({
            formulaSlotKey: "va1",
            formulaSlot: "va1",
            formulaRole: "valence",
            formulaMorph: objectFunctionalSubslots?.va1 || va1 || "Ø",
            surfaceValueOverride: objectFunctionalSubslots?.va1 || "",
            formulaFeatures: objectFunctionalSubslots?.val1Features || null,
            visibleLinearMorph: objectFunctionalSubslots?.visibleFormulaPrefix || objectMorph,
            linearPieces: objectFunctionalSubslots?.linearPieces || []
          }, {
            formulaSlotKey: "va2",
            formulaSlot: "va2",
            formulaRole: "valence",
            formulaMorph: objectFunctionalSubslots?.va2 || va2 || "Ø",
            surfaceValueOverride: objectFunctionalSubslots?.va2 === "0" ? "" : objectFunctionalSubslots?.va2 || "",
            formulaFeatures: objectFunctionalSubslots?.val2Features || null,
            visibleLinearMorph: objectFunctionalSubslots?.visibleFormulaPrefix || objectMorph,
            linearPieces: objectFunctionalSubslots?.linearPieces || []
          });
        } else {
          pathSlots.push({
            formulaSlotKey: "va",
            formulaSlot: "va",
            formulaRole: "valence",
            formulaMorph: objectMorph
          });
        }
      }
      pathSlots.push({
        formulaSlotKey: "base",
        formulaSlot: "base",
        formulaRole: "predicate",
        formulaMorph: getCnvFormulaSlotDisplayMorph("predicateStem", predicate)
      }, {
        formulaSlotKey: "tns",
        formulaSlot: "tns",
        formulaRole: "tense-mood",
        formulaMorph: getCnvFormulaSlotDisplayMorph("tensePosition", tense)
      }, {
        formulaSlotKey: "num1",
        formulaSlot: "num1",
        formulaRole: "subject-number",
        formulaMorph: num1 || "Ø",
        formulaOptions: num1Options,
        formulaDyadOptions: connectorOptions
      }, {
        formulaSlotKey: "num2",
        formulaSlot: "num2",
        formulaRole: "subject-number",
        formulaMorph: num2 || "Ø",
        formulaOptions: num2Options,
        formulaDyadOptions: connectorOptions
      });
      return pathSlots;
    }
    function getCnvFormulaSurfacePathFrames(soundSpellingFrames = [], roles = []) {
      const roleSet = new Set((Array.isArray(roles) ? roles : []).map(role => String(role || "")));
      return (Array.isArray(soundSpellingFrames) ? soundSpellingFrames : []).filter(frame => {
        const segmentRole = String(frame?.segmentRole || frame?.grammarSlot || "");
        return roleSet.has(segmentRole);
      }).map(frame => ({
        ...frame
      }));
    }
    function getCnvFormulaSurfacePathRecordKey(record = null) {
      const surface = String(record?.surface || "");
      const segments = normalizeCnvSurfacePathSegments(record?.segments || []);
      return `${surface}|${segments.map(segment => `${segment.role || segment.slot}:${segment.value}`).join("|")}`;
    }
    function buildCnvFormulaSurfacePathRecord({
      nuclearClauseShell = null,
      sourcePredicateStem = "",
      surfaceRecord = null,
      soundSpellingFrames = [],
      surfaceRealizationsBySlot = {},
      surfacePathIndex = 0,
      surfaceSlotsSourceFrame = null,
      surfaceSlotsOperationFrame = null
    } = {}) {
      const formulaSlots = nuclearClauseShell?.formulaSlots && typeof nuclearClauseShell.formulaSlots === "object" ? nuclearClauseShell.formulaSlots : null;
      if (!formulaSlots) {
        return null;
      }
      const segments = normalizeCnvSurfacePathSegments(surfaceRecord?.segments || []);
      const surface = String(surfaceRecord?.surface || "");
      const resolvedSourceFrame = surfaceSlotsSourceFrame || buildCnvFormulaSurfaceSlotsSourceFrame({
        formulaSlots,
        sourcePredicateStem,
        surface,
        segments,
        surfacePathIndex
      });
      const resolvedOperationFrame = surfaceSlotsOperationFrame || buildCnvFormulaSurfaceSlotsOperationFrame(resolvedSourceFrame);
      const surfaceFormulaSlots = getCnvFormulaSurfaceSlots(formulaSlots, surface, segments, {
        sourceFrame: resolvedSourceFrame,
        operationFrame: resolvedOperationFrame
      });
      const paths = buildCnvFormulaAndrewsPathSlots(formulaSlots).map(pathSlot => {
        const slotKey = pathSlot.formulaSlotKey;
        const formulaMorph = pathSlot.formulaMorph;
        const surfaceRoles = CNV_FORMULA_SURFACE_SLOT_ROLES[slotKey] || [];
        const expectedSurfaceMorph = normalizeCnvFormulaMorphForSurface(formulaMorph);
        const activeSurfaceRoles = expectedSurfaceMorph ? surfaceRoles : [];
        const surfaceValuesByRole = activeSurfaceRoles.reduce((acc, role) => {
          acc[role] = getCnvSurfacePathSegmentValue(segments, role);
          return acc;
        }, {});
        const foldedSurfaceValue = surfaceFormulaSlots && Object.prototype.hasOwnProperty.call(surfaceFormulaSlots, slotKey) ? surfaceFormulaSlots[slotKey] : null;
        const hasSurfaceFormulaValue = surfaceFormulaSlots && Object.prototype.hasOwnProperty.call(surfaceFormulaSlots, slotKey);
        const surfaceValue = foldedSurfaceValue !== null ? String(foldedSurfaceValue || "") : pathSlot.surfaceValueOverride !== undefined && pathSlot.surfaceValueOverride !== null ? String(pathSlot.surfaceValueOverride || "") : activeSurfaceRoles.map(role => surfaceValuesByRole[role] || "").join("");
        const status = (() => {
          if (!expectedSurfaceMorph && !surfaceValue) {
            return "matched-zero";
          }
          if (!expectedSurfaceMorph) {
            return "surface-carried-by-other-slot";
          }
          const normalizedSurfaceValue = normalizeCnvFormulaMorphForSurface(surfaceValue);
          if (surfaceValue === expectedSurfaceMorph || surfaceValue.includes(expectedSurfaceMorph) || normalizedSurfaceValue === expectedSurfaceMorph || normalizedSurfaceValue.includes(expectedSurfaceMorph)) {
            return "matched";
          }
          if (expectedSurfaceMorph && !surfaceValue) {
            return hasSurfaceFormulaValue ? "surface-rule-required" : "formula-only";
          }
          return "surface-rule-required";
        })();
        return {
          formulaSlotKey: slotKey,
          formulaSlot: String(pathSlot.formulaSlot || slotKey),
          formulaRole: String(pathSlot.formulaRole || ""),
          formulaMorph,
          formulaFeatures: pathSlot.formulaFeatures || null,
          formulaOptions: Array.isArray(pathSlot.formulaOptions) ? pathSlot.formulaOptions.slice() : [],
          formulaDyadOptions: Array.isArray(pathSlot.formulaDyadOptions) ? pathSlot.formulaDyadOptions.slice() : [],
          visibleLinearMorph: String(pathSlot.visibleLinearMorph || ""),
          linearPieces: Array.isArray(pathSlot.linearPieces) ? pathSlot.linearPieces.slice() : [],
          expectedSurfaceMorph,
          surfaceRoles: activeSurfaceRoles,
          surfaceValuesByRole,
          surfaceValue,
          status,
          surfaceRealizations: Array.isArray(surfaceRealizationsBySlot[slotKey]) ? surfaceRealizationsBySlot[slotKey].slice() : [],
          surfaceCopyRelations: slotKey === "base" && Array.isArray(surfaceFormulaSlots?.baseCopyRelations) ? surfaceFormulaSlots.baseCopyRelations.map(relation => ({
            ...relation
          })) : [],
          soundSpellingFrames: getCnvFormulaSurfacePathFrames(soundSpellingFrames, surfaceRoles)
        };
      });
      return {
        surface,
        segments,
        paths,
        allSlotsConnected: paths.every(path => path.status !== "formula-only")
      };
    }
    function getCnvFormulaSurfacePathSlot(paths = [], slotKey = "") {
      return (Array.isArray(paths) ? paths : []).find(path => String(path?.formulaSlotKey || "") === slotKey) || null;
    }
    function buildCnvSourceFormulaEchoFromStem(sourceStem = "") {
      const stem = String(sourceStem || "").trim();
      if (!stem) {
        return "";
      }
      if (/^[A-Z]+\(.*\)$/.test(stem) || /^#.*#$/.test(stem)) {
        return stem;
      }
      const unwrapped = stem.replace(/^\((.*)\)$/u, "$1").trim();
      return unwrapped ? `CNV(${unwrapped})` : "";
    }
    function getCnvFormulaPathSegmentLetters(path = null) {
      if (!path || typeof path !== "object") {
        return "";
      }
      const slotKey = String(path.formulaSlotKey || "").trim();
      const features = path.formulaFeatures && typeof path.formulaFeatures === "object" ? path.formulaFeatures : {};
      const pieces = [];
      if (slotKey === "va1") {
        pieces.push(features.person, features.objective);
      } else if (slotKey === "va2") {
        pieces.push(features.number);
      } else if (Array.isArray(path.linearPieces) && path.linearPieces.length) {
        pieces.push(...path.linearPieces);
      } else {
        pieces.push(path.surfaceValue || path.formulaMorph || "");
      }
      return pieces.map(piece => String(piece ?? "").trim()).filter(piece => piece && piece !== "0" && piece !== "Ø").join("");
    }
    function buildCnvFormulaRealizationSegmentFrames(paths = []) {
      const orderedSlots = ["pers1", "pers2", "directional", "va", "va1", "va2", "base", "tns", "num1", "num2"];
      return orderedSlots.map(slot => getCnvFormulaSurfacePathSlot(paths, slot)).filter(Boolean).map(path => ({
        slot: path.formulaSlotKey || path.formulaSlot || "",
        role: path.formulaRole || "",
        formulaValue: path.formulaMorph || "",
        surface: getCnvFormulaPathSegmentLetters(path),
        classicalRealizationAuthority: "Classical Andrews transcription",
        operationId: path.status || ""
      }));
    }
    function isCnvFormulaSurfacePathCollapsedDirectional(paths = []) {
      const pathList = Array.isArray(paths) ? paths : [];
      const hasDirectionalSlot = pathList.some(path => String(path?.formulaSlotKey || "") === "directional");
      if (hasDirectionalSlot) {
        return false;
      }
      const basePath = getCnvFormulaSurfacePathSlot(pathList, "base");
      const base = String(basePath?.surfaceValue || basePath?.formulaMorph || "").trim();
      return /^(?:huāl|on)[\p{L}]/iu.test(String(base || ""));
    }
    function buildCnvFormulaSurfacePairs({
      nuclearClauseShell = null,
      pathRecords = [],
      sourceFormulaEcho = ""
    } = {}) {
      // Surface paths describe GCD realization only. LCM remains the formula
      // already issued from the typed nuclear-clause slots.
      const canonicalTargetFormulaEcho = String(nuclearClauseShell?.formulaEcho || "").trim();
      return Object.freeze((Array.isArray(pathRecords) ? pathRecords : []).map((pathRecord, pathIndex) => {
        const surface = String(pathRecord?.surface || "").trim();
        if (isCnvFormulaSurfacePathCollapsedDirectional(pathRecord?.paths)) {
          return null;
        }
        const targetFormulaEcho = canonicalTargetFormulaEcho;
        if (!surface || !targetFormulaEcho) {
          return null;
        }
        const resolvedSourceFormulaEcho = String(sourceFormulaEcho || pathRecord?.sourceFormulaEcho || "").trim() || `CNV(${String(getCnvFormulaSurfacePathSlot(pathRecord.paths, "base")?.formulaMorph || "STEM").trim() || "STEM"})`;
        const segmentFrames = buildCnvFormulaRealizationSegmentFrames(pathRecord.paths);
        const segmentDerivedSurface = segmentFrames.map(segment => String(segment?.surface || "").trim()).join("");
        const formulaRecord = typeof targetObject.buildGrammarFormulaRecord === "function" ? targetObject.buildGrammarFormulaRecord({
          id: `cnv:${targetFormulaEcho}`,
          unit: "CNV",
          formula: targetFormulaEcho,
          formulaSlots: nuclearClauseShell?.formulaSlots || null,
          sourceFrame: {
            label: resolvedSourceFormulaEcho,
            formula: resolvedSourceFormulaEcho
          },
          source: "cnv-formula-surface-path-slots"
        }) : null;
        const formulaRealizationRecord = typeof targetObject.buildGrammarFormulaRealizationRecord === "function" ? targetObject.buildGrammarFormulaRealizationRecord({
          id: `cnv:${targetFormulaEcho}:path-${pathIndex}`,
          formulaRecord,
          unit: "CNV",
          segmentFrames,
          surfaceForms: [surface],
          deriveSurfaceFromSegments: segmentDerivedSurface === surface,
          source: "cnv-formula-surface-path-segments"
        }) : null;
        const pair = {
          surface,
          sourceFormulaEcho: resolvedSourceFormulaEcho,
          andrewsFormulaEcho: resolvedSourceFormulaEcho,
          targetFormulaEcho,
          conjugatorFormulaEcho: targetFormulaEcho,
          sourceToTargetFormulaEcho: `${resolvedSourceFormulaEcho} -> ${targetFormulaEcho}`,
          andrewsToConjugatorFormulaEcho: `${resolvedSourceFormulaEcho} -> ${targetFormulaEcho}`
        };
        Object.defineProperties(pair, {
          formulaRecord: {
            enumerable: false,
            value: formulaRecord
          },
          formulaRealizationRecord: {
            enumerable: false,
            value: formulaRealizationRecord
          },
          segmentFrames: {
            enumerable: false,
            value: segmentFrames
          }
        });
        return Object.freeze(pair);
      }).filter(Boolean));
    }
    function buildGeneratedCnvFormulaSurfacePath({
      nuclearClauseShell = null,
      sourcePredicateStem = "",
      surfaceRecord = null,
      surfaceRecords = [],
      soundSpellingFrames = [],
      sourceFormulaEcho = ""
    } = {}) {
      const formulaSlots = nuclearClauseShell?.formulaSlots && typeof nuclearClauseShell.formulaSlots === "object" ? nuclearClauseShell.formulaSlots : null;
      if (!formulaSlots) {
        return null;
      }
      const orderedRecords = [];
      [surfaceRecord, ...(Array.isArray(surfaceRecords) ? surfaceRecords : [])].forEach(record => {
        if (!record || typeof record !== "object") {
          return;
        }
        const key = getCnvFormulaSurfacePathRecordKey(record);
        if (!key || orderedRecords.some(entry => getCnvFormulaSurfacePathRecordKey(entry) === key)) {
          return;
        }
        orderedRecords.push(record);
      });
      const pathRecordsWithoutAlternatives = orderedRecords.map((record, index) => buildCnvFormulaSurfacePathRecord({
        nuclearClauseShell,
        sourcePredicateStem,
        surfaceRecord: record,
        soundSpellingFrames,
        surfaceRealizationsBySlot: {},
        surfacePathIndex: index
      })).filter(Boolean);
      const surfaceRealizationsBySlot = pathRecordsWithoutAlternatives.reduce((acc, record) => {
        (record.paths || []).forEach(path => {
          const slotKey = String(path.formulaSlotKey || "");
          const value = String(path.surfaceValue || "");
          if (!slotKey || !value) {
            return;
          }
          if (!acc[slotKey]) {
            acc[slotKey] = [];
          }
          if (!acc[slotKey].includes(value)) {
            acc[slotKey].push(value);
          }
        });
        return acc;
      }, {});
      const pathRecords = orderedRecords.map((record, index) => buildCnvFormulaSurfacePathRecord({
        nuclearClauseShell,
        sourcePredicateStem,
        surfaceRecord: record,
        soundSpellingFrames,
        surfaceRealizationsBySlot,
        surfacePathIndex: index
      })).filter(Boolean);
      const primaryPath = pathRecords[0] || buildCnvFormulaSurfacePathRecord({
        nuclearClauseShell,
        sourcePredicateStem,
        surfaceRecord,
        soundSpellingFrames,
        surfaceRealizationsBySlot,
        surfacePathIndex: 0
      });
      if (!primaryPath) {
        return null;
      }
      const surfaceNumberConnectorRealizations = pathRecords.map(record => {
        const bySlot = Object.fromEntries((Array.isArray(record.paths) ? record.paths : []).map(entry => [entry.formulaSlotKey, entry]));
        const num1 = String(bySlot.num1?.surfaceValue || "");
        const num2 = String(bySlot.num2?.surfaceValue || "");
        if (!num1 && !num2) {
          return "";
        }
        return `${num1 || "0"}-${num2 || "0"}`;
      }).filter((entry, index, list) => entry && list.indexOf(entry) === index);
      const formulaSurfacePairs = buildCnvFormulaSurfacePairs({
        nuclearClauseShell,
        pathRecords,
        sourceFormulaEcho
      });
      return {
        unit: "CNV",
        formulaEcho: String(nuclearClauseShell?.formulaEcho || ""),
        formulaSurfacePairs,
        sourceFormulaEcho: formulaSurfacePairs.map(entry => entry.sourceFormulaEcho).filter(Boolean)[0] || "",
        sourceFormulaEchoes: Array.from(new Set(formulaSurfacePairs.map(entry => entry.sourceFormulaEcho).filter(Boolean))),
        andrewsFormulaEcho: formulaSurfacePairs.map(entry => entry.andrewsFormulaEcho).filter(Boolean)[0] || "",
        andrewsFormulaEchoes: Array.from(new Set(formulaSurfacePairs.map(entry => entry.andrewsFormulaEcho).filter(Boolean))),
        targetFormulaEchoes: formulaSurfacePairs.map(entry => entry.targetFormulaEcho),
        conjugatorFormulaEcho: formulaSurfacePairs.map(entry => entry.conjugatorFormulaEcho).filter(Boolean)[0] || "",
        conjugatorFormulaEchoes: Array.from(new Set(formulaSurfacePairs.map(entry => entry.conjugatorFormulaEcho).filter(Boolean))),
        sourceToTargetFormulaEcho: formulaSurfacePairs.map(entry => entry.sourceToTargetFormulaEcho).join(" | "),
        andrewsToConjugatorFormulaEcho: formulaSurfacePairs.map(entry => entry.andrewsToConjugatorFormulaEcho).filter(Boolean).join(" | "),
        ...primaryPath,
        surfaceStemRealizations: Array.isArray(surfaceRealizationsBySlot.base) ? surfaceRealizationsBySlot.base.slice() : [],
        surfaceNumberConnectorRealizations,
        pathsBySurface: pathRecords
      };
    }
    function alignNuclearClauseSurfaceSlotNameBridgeToCnvFormulaSurfacePath(slotNameBridge = null, cnvFormulaSurfacePath = null) {
      if (!slotNameBridge || typeof slotNameBridge !== "object" || !cnvFormulaSurfacePath) {
        return slotNameBridge;
      }
      const primaryPaths = Array.isArray(cnvFormulaSurfacePath.paths) ? cnvFormulaSurfacePath.paths : [];
      if (!primaryPaths.length) {
        return slotNameBridge;
      }
      const buildSlotsForPathRecord = (paths = []) => {
        const bySlot = Object.fromEntries((Array.isArray(paths) ? paths : []).map(path => [String(path?.formulaSlotKey || ""), path]));
        return (Array.isArray(slotNameBridge.slots) ? slotNameBridge.slots : []).map(slot => ({
          ...slot,
          value: resolveValueFromPathMap(bySlot, slot.surfaceSlot, slot.value),
          formulaSurfacePathStatus: bySlot[String(slot.surfaceSlot || "")]?.status || ""
        }));
      };
      const resolveValueFromPathMap = (bySlot = {}, surfaceSlot = "", fallbackValue = "") => {
        const path = bySlot[surfaceSlot];
        if (!path) {
          return fallbackValue;
        }
        if (surfaceSlot === "base") {
          return String(path.surfaceValue || path.formulaMorph || fallbackValue || "");
        }
        if (surfaceSlot === "tns") {
          return String(path.formulaMorph || path.surfaceValue || fallbackValue || "Ø");
        }
        if (surfaceSlot === "num1" || surfaceSlot === "num2") {
          return String(path.surfaceValue || path.formulaMorph || fallbackValue || "Ø");
        }
        if (surfaceSlot === "va2" && !path.surfaceValue && String(path.formulaMorph || "") === "0") {
          return "0";
        }
        return String(path.surfaceValue || path.formulaMorph || fallbackValue || "");
      };
      const primarySlots = buildSlotsForPathRecord(primaryPaths);
      return {
        ...slotNameBridge,
        slots: primarySlots,
        pathsBySurface: (Array.isArray(cnvFormulaSurfacePath.pathsBySurface) ? cnvFormulaSurfacePath.pathsBySurface : []).map(record => ({
          surface: String(record?.surface || ""),
          slots: buildSlotsForPathRecord(record?.paths || [])
        }))
      };
    }
    function buildNuclearClauseSurfaceDiagnosticEntry({
      id = NUCLEAR_CLAUSE_SURFACE_ROUTE_BLOCKED_ID,
      message = NUCLEAR_CLAUSE_SURFACE_NO_OUTPUT_MESSAGE,
      severity = "error",
      failedLayer = "route",
      contractLayer = "routeContract",
      routeFamily = NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
      routeStage = ""
    } = {}) {
      const normalizedId = String(id || NUCLEAR_CLAUSE_SURFACE_ROUTE_BLOCKED_ID).trim();
      return {
        id: normalizedId,
        code: normalizedId.toUpperCase().replace(/-/g, "_"),
        severity: String(severity || "error"),
        message: String(message || NUCLEAR_CLAUSE_SURFACE_NO_OUTPUT_MESSAGE).trim(),
        failedLayer: String(failedLayer || "route").trim(),
        contractLayer: String(contractLayer || "routeContract").trim(),
        routeFamily: String(routeFamily || NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY).trim(),
        routeStage: String(routeStage || "").trim()
      };
    }
    function getNuclearClauseSurfaceFailedLayerContract(routeStage = "") {
      const stage = String(routeStage || "").trim();
      if (/morphology|stem/i.test(stage)) {
        return {
          failedLayer: "stem",
          contractLayer: "stemFrame"
        };
      }
      if (/orthography|spelling/i.test(stage)) {
        return {
          failedLayer: "orthography",
          contractLayer: "orthographyFrame"
        };
      }
      if (/agreement|participant|subject|object|possess/i.test(stage)) {
        return {
          failedLayer: "agreement",
          contractLayer: "participantFrame"
        };
      }
      if (/output|result|surface|no-output/i.test(stage)) {
        return {
          failedLayer: "output",
          contractLayer: "resultFrame"
        };
      }
      return {
        failedLayer: "route",
        contractLayer: "routeContract"
      };
    }
    function normalizeNuclearClauseSurfaceDiagnosticEntries(diagnostics = [], fallbackDiagnostic = null) {
      const entries = Array.isArray(diagnostics) ? diagnostics : [];
      const normalized = entries.map(entry => {
        if (typeof targetObject.normalizeGrammarDiagnosticContractEntry === "function") {
          return targetObject.normalizeGrammarDiagnosticContractEntry(entry);
        }
        if (typeof entry === "string") {
          const id = entry.trim();
          return id ? {
            id,
            severity: "diagnostic",
            message: ""
          } : null;
        }
        return entry && typeof entry === "object" ? entry : null;
      }).filter(Boolean);
      if (!normalized.length && fallbackDiagnostic) {
        normalized.push(fallbackDiagnostic);
      }
      return normalized.filter((entry, index, list) => {
        const key = `${entry.id || entry.code || ""}|${entry.severity || ""}|${entry.message || ""}`;
        return list.findIndex(candidate => `${candidate.id || candidate.code || ""}|${candidate.severity || ""}|${candidate.message || ""}` === key) === index;
      });
    }
    function resolveNuclearClauseSurfaceUnitKind(resolvedTenseMode = "", tense = "") {
      if (resolvedTenseMode === targetObject.TENSE_MODE.sustantivo) {
        return "nominal-nuclear-clause";
      }
      if (resolvedTenseMode === targetObject.TENSE_MODE.adverbio) {
        return "verbal-nuclear-clause";
      }
      if (resolvedTenseMode === targetObject.TENSE_MODE.adjetivo) {
        const formalMode = typeof targetObject.getFormalTenseModeForFunctionTense === "function"
          ? targetObject.getFormalTenseModeForFunctionTense(tense)
          : "";
        if (formalMode === targetObject.TENSE_MODE.verbo || formalMode === "verbo") {
          return "verbal-nuclear-clause";
        }
        return "nominal-nuclear-clause";
      }
      return "verbal-nuclear-clause";
    }
    function getNuclearClauseSurfaceCanonicalRealizationSurfaceForms(resultFrame = null) {
      if (!resultFrame || typeof resultFrame !== "object") {
        return [];
      }
      const records = Array.isArray(resultFrame.formulaRealizationRecords) && resultFrame.formulaRealizationRecords.length ? resultFrame.formulaRealizationRecords : resultFrame.formulaRealizationRecord ? [resultFrame.formulaRealizationRecord] : [];
      return records.filter(record => record && typeof record === "object" && record.kind === "grammar-formula-realization-record").flatMap(record => [...(Array.isArray(record.surfaceForms) ? record.surfaceForms : []), record.surface || ""]).map(entry => normalizeNuclearClauseSurfaceContractSurface(entry)).filter((entry, index, list) => entry && list.indexOf(entry) === index);
    }
    function normalizeGrammarFrameSurfaceForms(result = null) {
      const frameResult = getNuclearClauseSurfaceResultFramePayload(result);
      const hasResultFrame = Boolean(frameResult);
      const canonicalForms = getNuclearClauseSurfaceCanonicalRealizationSurfaceForms(frameResult);
      if (canonicalForms.length) {
        return canonicalForms;
      }
      const surfaceForms = [];
      if (Array.isArray(frameResult?.surfaceForms)) {
        surfaceForms.push(...frameResult.surfaceForms);
      }
      if (frameResult?.surface) {
        surfaceForms.push(frameResult.surface);
      }
      if (hasResultFrame) {
        return surfaceForms.flatMap(entry => splitNuclearClauseSurfaceContractText(entry)).filter((entry, index, list) => entry && list.indexOf(entry) === index);
      }
      if (!hasResultFrame && Array.isArray(result?.surfaceForms)) {
        surfaceForms.push(...result.surfaceForms);
      }
      if (!hasResultFrame && result?.surface) {
        surfaceForms.push(result.surface);
      }
      if (!hasResultFrame && result?.result) {
        surfaceForms.push(result.result);
      }
      return surfaceForms.flatMap(entry => splitNuclearClauseSurfaceContractText(entry)).filter((entry, index, list) => entry && list.indexOf(entry) === index);
    }
    function collectGrammarFrameRefsFromObject(source = null, refs = []) {
      if (!source || typeof source !== "object") {
        return refs;
      }
      [source.lessonRef, source.curriculumRef, source.range, source.andrewsRef, source.authorityRef].forEach(entry => {
        const value = String(entry || "").trim();
        if (value) {
          refs.push(value);
        }
      });
      if (Array.isArray(source.lessonRefs)) {
        source.lessonRefs.forEach(entry => {
          const value = String(entry || "").trim();
          if (value) {
            refs.push(value);
          }
        });
      }
      if (Array.isArray(source.authorityRefs)) {
        source.authorityRefs.forEach(entry => {
          const value = String(entry || "").trim();
          if (value) {
            refs.push(value);
          }
        });
      }
      if (Array.isArray(source.andrewsRefs)) {
        source.andrewsRefs.forEach(entry => {
          const value = String(entry || "").trim();
          if (value) {
            refs.push(value);
          }
        });
      }
      return refs;
    }
    function isNuclearClauseSurfaceGrammarFrameCandidate(value = null) {
      return Boolean(
        value
        && typeof targetObject.isIssuedGrammarFrame === "function"
        && targetObject.isIssuedGrammarFrame(value)
      );
    }
    function getNuclearClauseSurfaceOverrideSourceGrammarFrame(override = null) {
      return [override?.grammarFrame, override?.frames].find(candidate => isNuclearClauseSurfaceGrammarFrameCandidate(candidate)) || null;
    }
    function getNuclearClauseSurfaceSourceEvidenceBoundaries(value = null) {
      return value?.boundaries && typeof value.boundaries === "object" ? value.boundaries : {};
    }
    function mergeNuclearClauseSurfaceSourceEvidence(primary = null, fallback = null) {
      const primaryEvidence = primary && typeof primary === "object" ? primary : null;
      const fallbackEvidence = fallback && typeof fallback === "object" ? fallback : null;
      if (!primaryEvidence) {
        return fallbackEvidence;
      }
      if (!fallbackEvidence) {
        return primaryEvidence;
      }
      const merged = {
        ...fallbackEvidence,
        ...primaryEvidence,
        kind: String(primaryEvidence.kind || primaryEvidence.sourceKind || primaryEvidence.type || fallbackEvidence.kind || fallbackEvidence.sourceKind || fallbackEvidence.type || "").trim(),
        status: String(primaryEvidence.status || primaryEvidence.evidenceStatus || primaryEvidence.validationStatus || fallbackEvidence.status || fallbackEvidence.evidenceStatus || fallbackEvidence.validationStatus || "").trim(),
        targetAuthority: String(primaryEvidence.targetAuthority || fallbackEvidence.targetAuthority || "").trim(),
        evidenceSource: String(primaryEvidence.evidenceSource || fallbackEvidence.evidenceSource || "").trim(),
        boundaries: {
          ...getNuclearClauseSurfaceSourceEvidenceBoundaries(fallbackEvidence),
          ...getNuclearClauseSurfaceSourceEvidenceBoundaries(primaryEvidence)
        }
      };
      if (merged.status && !merged.evidenceStatus) {
        merged.evidenceStatus = merged.status;
      }
      return merged;
    }
    function buildNuclearClauseSurfaceOverrideSourceEvidence(override = null) {
      const sourceFrame = getNuclearClauseSurfaceOverrideSourceGrammarFrame(override);
      if (!sourceFrame) {
        return null;
      }
      const authorityFrame = sourceFrame?.authorityFrame && typeof sourceFrame.authorityFrame === "object" ? sourceFrame.authorityFrame : {};
      const routeContract = sourceFrame?.routeContract && typeof sourceFrame.routeContract === "object" ? sourceFrame.routeContract : {};
      const sourceContract = routeContract.sourceContract && typeof routeContract.sourceContract === "object" ? routeContract.sourceContract : {};
      const targetContract = routeContract.targetContract && typeof routeContract.targetContract === "object" ? routeContract.targetContract : {};
      const resultFrame = sourceFrame?.resultFrame && typeof sourceFrame.resultFrame === "object" ? sourceFrame.resultFrame : null;
      const sourceSurface = normalizeNuclearClauseSurfaceContractSurface((Array.isArray(resultFrame?.surfaceForms) ? resultFrame.surfaceForms[0] : "") || resultFrame?.surface || "");
      const sourceGenerated = resultFrame?.ok === true || routeContract.generationAllowed === true;
      const status = String(sourceGenerated ? "source-evidence-satisfied" : authorityFrame.evidenceStatus || "").trim();
      const sourceRouteFamily = String(routeContract.routeFamily || "").trim();
      const sourceRouteStage = String(routeContract.routeStage || "").trim();
      return {
        kind: "canonical-generated-source",
        status,
        evidenceStatus: status,
        targetAuthority: String(authorityFrame.grammarAuthority || "Andrews").trim(),
        evidenceSource: "owner-issued grammar frame",
        sourceRouteFamily,
        sourceRouteStage,
        sourceOutputKind: String(resultFrame?.outputKind || targetContract.outputKind || "").trim(),
        sourceUnitKind: String(sourceFrame?.unitFrame?.unitKind || sourceContract.unitKind || "").trim(),
        sourceSurface,
        sourceCategory: String(sourceContract.sourceCategory || "").trim(),
        boundaries: {
          sourceEvidenceFromAndrewsContractRoute: Boolean(sourceRouteFamily),
          sourceEvidenceFromSelectedGeneratedStage: Boolean(sourceSurface && sourceGenerated),
          sourceEvidenceFromOwnerIssuedGrammarFrame: true
        }
      };
    }
    function collectGrammarFrameAndrewsRefs(result = null, override = null) {
      const refs = [];
      const sourceFrame = getNuclearClauseSurfaceOverrideSourceGrammarFrame(override);
      [result, result?.grammarFrame?.authorityFrame, result?.frames?.authorityFrame, result?.denominalCompoundSourceFrame, result?.nominalizationProfile, result?.denominalFamilyProfile, result?.patientiveSourceStageFrame, result?.formationFrame, result?.placeGentilicNncBoundaryFrame, result?.adverbialAdjunctionBoundaryFrame, sourceFrame?.authorityFrame].forEach(entry => {
        collectGrammarFrameRefsFromObject(entry, refs);
      });
      return refs.filter((entry, index, list) => entry && list.indexOf(entry) === index);
    }
    function resolveGrammarFrameSourceEvidence(result = null, override = null) {
      const outputSourceEvidence = result?.sourceEvidence || result?.denominalFamilyProfile?.sourceEvidence || result?.formationFrame?.sourceEvidence || result?.patientiveSourceStageFrame?.sourceEvidence || null;
      return mergeNuclearClauseSurfaceSourceEvidence(outputSourceEvidence, buildNuclearClauseSurfaceOverrideSourceEvidence(override));
    }
    function resolveGrammarFrameAstFrame(result = null) {
      return result?.astFrame || result?.modificationAst || result?.adverbialAdjunctionAst || result?.complementClauseAst || result?.conjunctionClauseAst || result?.comparisonAst || result?.compoundFrame || null;
    }
    function cloneNuclearClauseSurfaceRouteFrame(frame = null) {
      if (!frame || typeof frame !== "object" || Array.isArray(frame)) {
        return null;
      }
      return {
        ...frame
      };
    }
    function resolveNuclearClauseSurfaceSourceRouteFrame(result = null) {
      const output = result && typeof result === "object" ? result : {};
      const inheritedGrammarFrame = output.grammarFrame && typeof output.grammarFrame === "object" ? output.grammarFrame : output.frames && typeof output.frames === "object" ? output.frames : null;
      const candidates = [
        output.incorporationRouteFrame,
        output.compoundRouteFrame,
        output.routeFrame,
        output.compoundFrame?.incorporationRouteFrame,
        output.compoundFrame?.compoundRouteFrame,
        output.compoundFrame?.routeFrame,
        output.patientiveCompoundSourceFrame?.incorporationRouteFrame,
        output.patientiveCompoundSourceFrame?.compoundRouteFrame,
        output.patientiveCompoundSourceFrame?.routeFrame,
        output.patientiveCompoundSourceFrame?.sourceCompoundFrame?.incorporationRouteFrame,
        output.patientiveCompoundSourceFrame?.sourceCompoundFrame?.compoundRouteFrame,
        output.patientiveCompoundSourceFrame?.sourceCompoundFrame?.routeFrame,
        output.denominalCompoundSourceFrame?.incorporationRouteFrame,
        output.denominalCompoundSourceFrame?.compoundRouteFrame,
        output.denominalCompoundSourceFrame?.routeFrame,
        output.denominalFamilyProfile?.sourceRouteFrame,
        output.denominalFamilyProfile?.routeFrame,
        inheritedGrammarFrame?.routeContract?.sourceContract?.sourceRouteFrame,
        inheritedGrammarFrame?.routeContract?.sourceContract?.routeFrame,
        inheritedGrammarFrame?.routeContract?.sourceContract?.incorporationRouteFrame,
        inheritedGrammarFrame?.routeContract?.targetContract?.sourceRouteFrame,
        inheritedGrammarFrame?.routeContract?.targetContract?.routeFrame,
        inheritedGrammarFrame?.routeContract?.targetContract?.incorporationRouteFrame,
        inheritedGrammarFrame?.participantFrame?.sourceRouteFrame,
        inheritedGrammarFrame?.participantFrame?.routeFrame,
        inheritedGrammarFrame?.participantFrame?.incorporationRouteFrame,
        inheritedGrammarFrame?.stemFrame?.sourceRouteFrame,
        inheritedGrammarFrame?.stemFrame?.routeFrame,
        inheritedGrammarFrame?.stemFrame?.incorporationRouteFrame,
        inheritedGrammarFrame?.morphBoundaryFrame?.sourceRouteFrame,
        inheritedGrammarFrame?.morphBoundaryFrame?.routeFrame,
        inheritedGrammarFrame?.morphBoundaryFrame?.incorporationRouteFrame
      ];
      return cloneNuclearClauseSurfaceRouteFrame(candidates.find(candidate => candidate && typeof candidate === "object") || null);
    }
    function buildNuclearClauseSurfaceGrammarFrame({
      result = null,
      override = null,
      resolvedTenseMode = "",
      tense = "",
      routeFamily = "",
      routeStage = "execute",
      unitKind = "",
      pers1 = "",
      pers2 = "",
      obj1 = "",
      poseedor = "",
      posicionesFormula = null,
      verb = "",
      renderVerb = "",
      entradaGrammarObject = null,
      nuclearClauseShell = null,
      cnvFormulaSurfacePath = null,
      vncValencyFrame = null,
      resolvedDerivationMode = "",
      resolvedDerivationType = "",
      resolvedVoiceMode = ""
    } = {}) {
      if (typeof targetObject.buildGrammarFrame !== "function") {
        return null;
      }
      const output = result && typeof result === "object" ? result : {};
      const surface = resolveNuclearClauseSurfaceContractSurface(output);
      const surfaceForms = normalizeGrammarFrameSurfaceForms(output);
      const diagnostics = Array.isArray(output.diagnostics) ? output.diagnostics : [];
      const ok = Boolean(surface) && output.error !== true && output.supported !== false;
      const evidenceStatus = ok ? "generated" : diagnostics.length ? "blocked" : "pending";
      const activeRouteFamily = routeFamily || output.generationRoute || output.outputKind || "";
      const surfaceEngineContract = buildNuclearClauseSurfaceEngineContract({
        routeFamily: activeRouteFamily,
        routeStage
      });
      const sourceEvidence = resolveGrammarFrameSourceEvidence(output, override);
      const activeNuclearShell = nuclearClauseShell || output.nuclearClauseShell || null;
      const activeCnvFormulaSurfacePath = cnvFormulaSurfacePath || output.cnvFormulaSurfacePath || null;
      const activeSlotNameBridge = output.slotNameBridge || (typeof targetObject.buildNuclearClauseSurfaceSlotNameBridge === "function" ? targetObject.buildNuclearClauseSurfaceSlotNameBridge(posicionesFormula) : null);
      const formulaSlots = activeNuclearShell?.formulaSlots || output.formulaSlots || null;
      const formulaEcho = activeNuclearShell?.formulaEcho || output.formulaEcho || "";
      const outputOrthographyFrame = output.orthographyFrame && typeof output.orthographyFrame === "object" ? output.orthographyFrame : null;
      const functionUseValenceGate = output.functionUseValenceGate && typeof output.functionUseValenceGate === "object" ? output.functionUseValenceGate : null;
      const soundSpellingFrames = collectNuclearClauseSurfaceSoundSpellingFrames(output.soundSpellingFrames, outputOrthographyFrame, output.targetContract);
      const frameSourceInput = resolveNuclearClauseSurfaceFrameSourceInput({
        result: output,
        renderVerb,
        verb
      });
      const activeEntradaGrammarObject = entradaGrammarObject && typeof entradaGrammarObject === "object" ? entradaGrammarObject : output.entradaGrammarObject && typeof output.entradaGrammarObject === "object" ? output.entradaGrammarObject : null;
      const sourceRouteFrame = resolveNuclearClauseSurfaceSourceRouteFrame(output);
      const sourceRouteObjectSlotOwnership = sourceRouteFrame?.objectSlotOwnership && typeof sourceRouteFrame.objectSlotOwnership === "object" ? sourceRouteFrame.objectSlotOwnership : null;
      const activeFormulaSurfacePairs = Array.isArray(output.formulaSurfacePairs) && output.formulaSurfacePairs.length ? output.formulaSurfacePairs : Array.isArray(activeCnvFormulaSurfacePath?.formulaSurfacePairs) ? activeCnvFormulaSurfacePath.formulaSurfacePairs : [];
      const outputResultFrame = output.grammarFrame?.resultFrame && typeof output.grammarFrame.resultFrame === "object" ? output.grammarFrame.resultFrame : output.frames?.resultFrame && typeof output.frames.resultFrame === "object" ? output.frames.resultFrame : null;
      const activeTargetFormulaEchoes = activeFormulaSurfacePairs.map(entry => String(entry?.targetFormulaEcho || "").trim()).filter(Boolean);
      const activeSourceFormulaEchoes = Array.from(new Set(activeFormulaSurfacePairs.map(entry => String(entry?.sourceFormulaEcho || "").trim()).filter(Boolean)));
      const activeAndrewsFormulaEchoes = Array.from(new Set(activeFormulaSurfacePairs.map(entry => String(entry?.andrewsFormulaEcho || entry?.sourceFormulaEcho || "").trim()).filter(Boolean)));
      const activeConjugatorFormulaEchoes = Array.from(new Set(activeFormulaSurfacePairs.map(entry => String(entry?.conjugatorFormulaEcho || entry?.targetFormulaEcho || "").trim()).filter(Boolean)));
      const activeSourceToTargetFormulaEcho = activeFormulaSurfacePairs.map(entry => String(entry?.sourceToTargetFormulaEcho || "").trim()).filter(Boolean).join(" | ");
      const activeAndrewsToConjugatorFormulaEcho = activeFormulaSurfacePairs.map(entry => String(entry?.andrewsToConjugatorFormulaEcho || entry?.sourceToTargetFormulaEcho || "").trim()).filter(Boolean).join(" | ");
      const outputFormulaRecords = Array.isArray(outputResultFrame?.formulaRecords) && outputResultFrame.formulaRecords.length ? outputResultFrame.formulaRecords : outputResultFrame?.formulaRecord ? [outputResultFrame.formulaRecord] : [];
      const activeFormulaRecords = activeFormulaSurfacePairs.map(entry => entry?.formulaRecord).filter(Boolean).length ? activeFormulaSurfacePairs.map(entry => entry?.formulaRecord).filter(Boolean) : outputFormulaRecords;
      const outputFormulaRealizationRecords = Array.isArray(outputResultFrame?.formulaRealizationRecords) && outputResultFrame.formulaRealizationRecords.length ? outputResultFrame.formulaRealizationRecords : outputResultFrame?.formulaRealizationRecord ? [outputResultFrame.formulaRealizationRecord] : [];
      const activeFormulaRealizationRecords = activeFormulaSurfacePairs.map(entry => entry?.formulaRealizationRecord).filter(Boolean).length ? activeFormulaSurfacePairs.map(entry => entry?.formulaRealizationRecord).filter(Boolean) : outputFormulaRealizationRecords;
      const routeContract = typeof targetObject.buildGrammarRouteContractFrame === "function" ? targetObject.buildGrammarRouteContractFrame({
        routeFamily: activeRouteFamily,
        routeStage,
        sourceContract: {
          unitKind,
          tenseMode: resolvedTenseMode,
          tense,
          sourceEvidence,
          sourceRouteFamily: sourceEvidence?.sourceRouteFamily || "",
          sourceRouteStage: sourceEvidence?.sourceRouteStage || "",
          sourceOutputKind: sourceEvidence?.sourceOutputKind || "",
          sourceSurface: sourceEvidence?.sourceSurface || "",
          sourceCategory: output.sourceCategory || "",
          sourceClauseKind: output.clauseKind || "",
          sourceVerb: output.sourceVerb || "",
          sourceTenseValue: output.sourceTenseValue || "",
          sourceCombinedMode: output.sourceCombinedMode || "",
          sourceVoiceMode: output.sourceVoiceMode || "",
          functionUseValenceGate,
          entradaGrammarObject: activeEntradaGrammarObject,
          sourceRouteFrame,
          routeFrame: sourceRouteFrame
        },
        targetContract: {
          outputKind: output.outputKind || "",
          generationRoute: output.generationRoute || activeRouteFamily,
          surfaceEngineContract,
          functionUseValenceGate,
          sourceRouteFrame,
          routeFrame: sourceRouteFrame
        },
        generationAllowed: ok,
        blockingDiagnostics: ok ? [] : diagnostics
      }) : null;
      const resultFrame = typeof targetObject.buildGrammarResultFrame === "function" ? {
        ...targetObject.buildGrammarResultFrame({
          ok,
          surface,
          surfaceForms,
          outputKind: output.outputKind || "",
          generationRoute: output.generationRoute || activeRouteFamily,
          sourceInput: frameSourceInput,
          provenance: output.stemProvenance || output.provenance || null,
          continuation: output.continuation || null,
          formulaRecords: activeFormulaRecords,
          formulaRealizationRecords: activeFormulaRealizationRecords
        }),
        surfaceOutputIsGrammarSource: false,
        nuclearClauseIsWord: false,
        formulaSurfacePairs: activeFormulaSurfacePairs,
        sourceFormulaEcho: activeSourceFormulaEchoes[0] || "",
        sourceFormulaEchoes: activeSourceFormulaEchoes,
        andrewsFormulaEcho: activeAndrewsFormulaEchoes[0] || "",
        andrewsFormulaEchoes: activeAndrewsFormulaEchoes,
        targetFormulaEchoes: activeTargetFormulaEchoes,
        conjugatorFormulaEcho: activeConjugatorFormulaEchoes[0] || "",
        conjugatorFormulaEchoes: activeConjugatorFormulaEchoes,
        sourceToTargetFormulaEcho: activeSourceToTargetFormulaEcho,
        andrewsToConjugatorFormulaEcho: activeAndrewsToConjugatorFormulaEcho
      } : null;
      const diagnosticFrame = typeof targetObject.buildGrammarDiagnosticFrame === "function" ? targetObject.buildGrammarDiagnosticFrame({
        status: ok ? "generated" : evidenceStatus,
        diagnostics,
        blockers: ok ? [] : diagnostics
      }) : null;
      const authorityFrame = typeof targetObject.buildGrammarAuthorityFrame === "function" ? targetObject.buildGrammarAuthorityFrame({
        sourceEvidence,
        evidenceStatus,
        andrewsRefs: collectGrammarFrameAndrewsRefs(output, override),
        supported: ok
      }) : null;
      return targetObject.buildGrammarFrame({
        authorityFrame,
        unitFrame: {
          unitKind,
          tenseMode: resolvedTenseMode,
          outputKind: output.outputKind || "",
          generationRoute: output.generationRoute || activeRouteFamily
        },
        orthographyFrame: {
          surface,
          surfaceForms,
          soundSpellingFrames,
          spellingAuthority: "Classical Andrews transcription",
          noClassicalSurfaceImport: true
        },
        morphBoundaryFrame: {
          formulaSlots,
          formulaEcho: String(formulaEcho || ""),
          formulaSurfacePairs: activeFormulaSurfacePairs,
          sourceFormulaEcho: activeSourceFormulaEchoes[0] || "",
          sourceFormulaEchoes: activeSourceFormulaEchoes,
          andrewsFormulaEcho: activeAndrewsFormulaEchoes[0] || "",
          andrewsFormulaEchoes: activeAndrewsFormulaEchoes,
          targetFormulaEchoes: activeTargetFormulaEchoes,
          conjugatorFormulaEcho: activeConjugatorFormulaEchoes[0] || "",
          conjugatorFormulaEchoes: activeConjugatorFormulaEchoes,
          sourceToTargetFormulaEcho: activeSourceToTargetFormulaEcho,
          andrewsToConjugatorFormulaEcho: activeAndrewsToConjugatorFormulaEcho,
          cnvFormulaSurfacePath: activeCnvFormulaSurfacePath,
          sourceRouteFrame,
          routeFrame: sourceRouteFrame,
          formulaSlotIsLiteralSpelling: false,
          invariants: surfaceEngineContract.invariants
        },
        stemFrame: {
          stem: normalizeNuclearClauseSurfaceContractSurface(output.stem) || frameSourceInput,
          sourceStem: String(output.sourceStem || output.stemProvenance?.sourceStem || ""),
          stemProvenance: output.stemProvenance || null,
          verbstemClassProfile: output.verbstemClassProfile || output.stemProvenance?.verbstemClassProfile || null,
          stemIsWholeOutput: false,
          affixIsStem: false,
          derivationScope: surfaceEngineContract.derivationScope,
          sourceRouteFrame,
          routeFrame: sourceRouteFrame
        },
        nuclearClauseFrame: activeNuclearShell,
        participantFrame: {
          posicionesFormula: posicionesFormula && typeof posicionesFormula === "object" ? {
            ...posicionesFormula
          } : null,
          slotNameBridge: activeSlotNameBridge,
          pers1Pers2: {
            prefix: String(pers1 || ""),
            suffix: String(pers2 || "")
          },
          obj1: {
            prefix: String(obj1 || "")
          },
          poseedor: {
            prefix: String(poseedor || "")
          },
          valenceFrame: vncValencyFrame || output.vncValencyFrame || null,
          sourceRouteFrame,
          routeFrame: sourceRouteFrame,
          objectSlotOwnership: sourceRouteObjectSlotOwnership,
          routeFrameLicensesObjectSlotOwnership: sourceRouteFrame?.routeFrameLicensesObjectSlotOwnership === true,
          finalFormulaShapeDoesNotLicenseObjectSlots: sourceRouteFrame?.finalFormulaShapeDoesNotLicenseObjectSlots === true,
          functionUseDoesNotLicenseObjectSlots: sourceRouteFrame?.functionUseDoesNotLicenseObjectSlots === true
        },
        inflectionFrame: {
          tenseMode: resolvedTenseMode,
          tiempo: tense,
          tense,
          derivationMode: resolvedDerivationMode,
          derivationType: resolvedDerivationType,
          voiceMode: resolvedVoiceMode,
          state: output.state || "",
          inflectionScope: surfaceEngineContract.inflectionScope,
          inflectionInsideStem: false
        },
        routeContract,
        astFrame: resolveGrammarFrameAstFrame(output),
        resultFrame,
        diagnosticFrame
      }, grammarFrameOwnerCapability);
    }
    function buildNuclearClauseSurfaceResultContract(resultPayload = null, grammarFrame = null) {
      if (typeof targetObject.buildGrammarResultContract === "function") {
        return targetObject.buildGrammarResultContract({
          result: resultPayload,
          grammarFrame
        });
      }
      const surface = resolveNuclearClauseSurfaceContractSurface(resultPayload);
      return {
        ok: Boolean(surface) && resultPayload?.error !== true && resultPayload?.supported !== false,
        surface,
        frames: grammarFrame,
        diagnostics: Array.isArray(resultPayload?.diagnostics) ? resultPayload.diagnostics : []
      };
    }
    function getGeneratedTypedStemCandidateCarrier(stemCandidate = null, fallbackStem = "") {
      if (stemCandidate && typeof stemCandidate === "object" && stemCandidate.kind) {
        if (typeof targetObject.realizeMorphStemSpec !== "function") {
          return "";
        }
        return String(targetObject.realizeMorphStemSpec(stemCandidate, fallbackStem) || "");
      }
      return String(stemCandidate || fallbackStem || "");
    }
    function buildGeneratedTypedMorphResultFrame({
      subjectPrefix = "",
      objectPrefix = "",
      subjectSuffix = "",
      predicateStem = "",
      stemCandidate = null,
      morphologyInput = null
    } = {}) {
      const typedPredicateStem = getGeneratedTypedStemCandidateCarrier(stemCandidate, predicateStem);
      if (!typedPredicateStem) {
        return null;
      }
      const semanticSlots = Object.freeze({
        subjectPrefix: String(subjectPrefix || ""),
        objectPrefix: String(objectPrefix || ""),
        subjectSuffix: String(subjectSuffix || ""),
        predicateStem: typedPredicateStem
      });
      return Object.freeze({
        kind: "generated-typed-morph-result-frame",
        version: 1,
        semanticIdentity: [
          semanticSlots.subjectPrefix,
          semanticSlots.objectPrefix,
          semanticSlots.predicateStem,
          semanticSlots.subjectSuffix
        ].join("|"),
        semanticSlots,
        sourceStemCandidate: stemCandidate,
        formulaProjectionInput: Object.freeze({
          kind: "generated-formula-projection-input",
          ...semanticSlots,
          sourceKind: "typed-morph-result",
          derivedFromWrittenProjection: false
        }),
        writtenProjectionInput: Object.freeze({
          kind: "generated-written-projection-input",
          morphologyInput,
          sourceKind: "typed-morph-result",
          derivedFromFormulaProjection: false
        }),
        formulaDerivedFromWrittenProjection: false,
        writtenDerivedFromFormulaProjection: false,
        writtenCarrierParsingAllowedForFormula: false,
        callerSuppliedFormulaAuthority: false,
        callerSuppliedSurfaceAuthority: false
      });
    }
    function buildGeneratedCanonicalNonactiveStemFrame({
      sourceStem = "",
      isNonactive = false,
      resolvedTenseMode = "",
      resolvedDerivationType = "",
      sourceValency = null,
      tense = "",
      subjectPrefix = "",
      subjectSuffix = ""
    } = {}) {
      if (
        !isNonactive
        || resolvedTenseMode !== targetObject.TENSE_MODE.verbo
        || resolvedDerivationType !== targetObject.DERIVATION_TYPE.direct
      ) {
        return null;
      }
      const normalizedSourceStem = String(sourceStem || "").trim();
      const sourceValence = sourceValency === 1
        ? "intransitive"
        : sourceValency === 2
          ? "one-object"
          : sourceValency > 2
            ? "multiple-object"
            : "";
      const requiredCapabilities = [
        "getClassicalNahuatlNonactiveStemOptions",
        "deriveClassicalNahuatlNonactiveStemRecord",
        "isClassicalNahuatlNonactiveStemRecord",
        "evaluateClassicalNahuatlVncApplication",
        "isClassicalNahuatlVncApplicationFrame",
        "isClassicalNahuatlVncFiniteSurfaceFrame"
      ];
      const missingCapabilities = requiredCapabilities.filter(
        capabilityName => typeof targetObject[capabilityName] !== "function"
      );
      if (missingCapabilities.length) {
        return Object.freeze({
          kind: "generated-canonical-nonactive-stem-frame",
          version: 1,
          authorizationStatus: "blocked",
          blockReason: "generated-canonical-nonactive-owner-capability-missing",
          sourceStem: normalizedSourceStem,
          sourceValence,
          missingCapabilities: Object.freeze(missingCapabilities),
          formulaArtifactAuthority: false,
          surfaceArtifactAuthority: false
        });
      }
      const inventory =
        targetObject.getClassicalNahuatlNonactiveStemOptions(
          normalizedSourceStem,
          { sourceValence }
        );
      const selectedOption = Array.isArray(inventory?.options)
        ? inventory.options.find(
          option => (
            option?.ruleId === "cn-l20-5-intransitive-final-qui"
            && option?.sourceFinalShapeFrame?.orthographicTail?.three === "qui"
            && normalizedSourceStem.endsWith("qui")
          )
        ) || null
        : null;
      if (!selectedOption) {
        return null;
      }
      const record =
        targetObject.deriveClassicalNahuatlNonactiveStemRecord(
          normalizedSourceStem,
          {
            sourceValence,
            optionId: selectedOption.optionId
          }
        );
      const recordAuthorized = Boolean(
        record?.authorizationStatus === "authorized"
        && record.selectedRuleId === "cn-l20-5-intransitive-final-qui"
        && record.selectedOptionId === selectedOption.optionId
        && targetObject.isClassicalNahuatlNonactiveStemRecord(
          record,
          normalizedSourceStem
        )
      );
      if (!recordAuthorized) {
        return Object.freeze({
          kind: "generated-canonical-nonactive-stem-frame",
          version: 1,
          authorizationStatus: "blocked",
          blockReason:
            record?.blockReason
            || "generated-canonical-nonactive-owner-record-invalid",
          sourceStem: normalizedSourceStem,
          sourceValence,
          optionInventory: inventory || null,
          nonactiveStemRecord: record || null,
          formulaArtifactAuthority: false,
          surfaceArtifactAuthority: false
        });
      }
      const formulaStem = String(
        targetObject.isPerfectiveTense(tense)
          ? record.perfectiveNonactiveStem
          : record.imperfectiveNonactiveStem
      ).trim();
      const writtenStem = formulaStem.replace(/[-+\s]/gu, "");
      const subjectInfo =
        typeof targetObject.getPers1Pers2Info === "function"
          ? targetObject.getPers1Pers2Info(
            subjectPrefix,
            subjectSuffix,
            { tense }
          )
          : null;
      const subject = subjectInfo
        ? `${subjectInfo.person}${subjectInfo.number}`
        : "";
      const canonicalMood = tense === "optativo"
        ? "optative"
        : tense === "admonitivo"
          ? "admonitive"
          : "indicative";
      const normalizedTense = String(tense || "").trim().toLowerCase();
      const canonicalTense = {
        presente: "present",
        habitual: "customary-present",
        imperfecto: "imperfect",
        futuro: "future",
        preterito: "preterit",
        "pretérito": "preterit",
        remoto: "distant-past",
        pasado: "past",
        optativo: "nonpast",
        admonitivo: "nonpast",
      }[normalizedTense] || normalizedTense;
      const canonicalApplication =
        targetObject.evaluateClassicalNahuatlVncApplication({
          sourceStem: normalizedSourceStem,
          verbClass: record.sourceIdentityFrame?.verbClass || "",
          sourceValence,
          subject,
          mood: canonicalMood,
          tense: canonicalTense,
          requestedDerivation: "direct",
          requestedVoice: "impersonal",
          nonactiveOptionId: record.selectedOptionId,
          outputScope: "single"
        });
      const finiteSurfaceFrame =
        canonicalApplication?.resultFrame?.finiteSurfaceFrame || null;
      const canonicalApplicationAuthorized = Boolean(
        subject
        && targetObject.isClassicalNahuatlVncApplicationFrame(
          canonicalApplication
        )
        && canonicalApplication.authorizationStatus === "authorized"
        && canonicalApplication.controlFrame?.selectedNonactiveOptionId
          === record.selectedOptionId
        && canonicalApplication.resultFrame?.selectedMachineryFrame
          ?.nonactiveStemRecord?.selectedRuleId
          === record.selectedRuleId
        && targetObject.isClassicalNahuatlVncFiniteSurfaceFrame(
          finiteSurfaceFrame
        )
        && finiteSurfaceFrame.formulaDerivedFromWrittenProjection === false
        && finiteSurfaceFrame.writtenDerivedFromFormulaProjection === false
      );
      const authorized = Boolean(
        formulaStem
        && writtenStem
        && canonicalApplicationAuthorized
      );
      return Object.freeze({
        kind: "generated-canonical-nonactive-stem-frame",
        version: 1,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized
          ? ""
          : "generated-canonical-nonactive-stem-projections-required",
        sourceStem: normalizedSourceStem,
        sourceValence,
        selectedRuleId: record.selectedRuleId,
        selectedOptionId: record.selectedOptionId,
        nonactiveStemRecord: record,
        formulaStem: authorized ? formulaStem : "",
        writtenStem: authorized ? writtenStem : "",
        canonicalApplication: authorized ? canonicalApplication : null,
        finiteSurfaceFrame: authorized ? finiteSurfaceFrame : null,
        formulaRealization: authorized
          ? finiteSurfaceFrame.formulaRealization
          : "",
        wordRealization: authorized
          ? finiteSurfaceFrame.wordRealization
          : "",
        formulaProjectionSource: "owner-issued-lesson20-nonactive-record",
        writtenProjectionSource: "owner-issued-lesson20-nonactive-record",
        formulaDerivedFromWrittenProjection: false,
        writtenDerivedFromFormulaProjection: false,
        callerSuppliedDerivedStemAllowed: false,
        formulaArtifactAuthority: false,
        surfaceArtifactAuthority: false
      });
    }
    function stripGeneratedVncFormulaTenseSuffix(stem = "", tense = "", sourceSubjectSuffix = "") {
      const value = String(stem || "");
      if (!value) {
        return "";
      }
      const suffixes = [];
      const rules = typeof targetObject.TENSE_SUFFIX_RULES === "object" && targetObject.TENSE_SUFFIX_RULES ? targetObject.TENSE_SUFFIX_RULES[String(tense || "")] : null;
      const sourceSuffix = String(sourceSubjectSuffix || "");
      if (rules && Object.prototype.hasOwnProperty.call(rules, sourceSuffix)) {
        suffixes.push(String(rules[sourceSuffix] || ""));
      }
      if (String(tense || "") === "preterito") {
        suffixes.push(sourceSuffix === "t" ? "ket" : "k");
        suffixes.push("k");
      }
      const suffix = suffixes.filter(Boolean).sort((left, right) => right.length - left.length).find(candidate => value.length > candidate.length && value.endsWith(candidate));
      return suffix ? value.slice(0, -suffix.length) : value;
    }
    function resolveGeneratedVncFormulaPers1BeforeInflection({
      tense = "",
      inputPers1 = "",
      appliedMorphology = null,
      formulaStem = "",
      hasFormulaValenceBeforeStem = false
    } = {}) {
      const pers1 = String(inputPers1 || "");
      if (String(tense || "") === "optativo" && (pers1 === "ti" || pers1 === "an") && (appliedMorphology?.pers1 === "shi" || appliedMorphology?.subjectPrefix === "shi")) {
        return "shi";
      }
      if (!hasFormulaValenceBeforeStem && String(formulaStem || "").startsWith("i")) {
        if (pers1 === "ni") {
          return "n";
        }
        if (pers1 === "ti") {
          return "t";
        }
      }
      if (!hasFormulaValenceBeforeStem && targetObject.VOWEL_START_RE.test(String(formulaStem || "")) && pers1.endsWith("n") && !pers1.endsWith("nh") && pers1.length >= 2 && targetObject.VOWEL_RE.test(pers1[pers1.length - 2] || "")) {
        return `${pers1}h`;
      }
      return pers1;
    }
    function attachNuclearClauseSurfaceContractProperties(resultPayload = null, resultContract = null, grammarFrame = null, {
      enumerable = false
    } = {}) {
      if (!resultPayload || typeof resultPayload !== "object") {
        return resultPayload;
      }
      const contract = resultContract || buildNuclearClauseSurfaceResultContract(resultPayload, grammarFrame);
      const surfaceEngineContract = grammarFrame?.routeContract?.targetContract?.surfaceEngineContract || buildNuclearClauseSurfaceEngineContract();
      Object.defineProperties(resultPayload, {
        surfaceEngineContract: {
          configurable: true,
          enumerable,
          writable: true,
          value: surfaceEngineContract
        },
        grammarFrame: {
          configurable: true,
          enumerable,
          writable: true,
          value: grammarFrame
        },
        ok: {
          configurable: true,
          enumerable,
          writable: true,
          value: contract.ok
        },
        surface: {
          configurable: true,
          enumerable,
          writable: true,
          value: contract.surface
        },
        frames: {
          configurable: true,
          enumerable,
          writable: true,
          value: contract.frames
        }
      });
      if (!Object.prototype.hasOwnProperty.call(resultPayload, "diagnostics")) {
        Object.defineProperty(resultPayload, "diagnostics", {
          configurable: true,
          enumerable,
          writable: true,
          value: contract.diagnostics
        });
      }
      return resultPayload;
    }
    function buildNuclearClauseSurfaceBlockedResult({
      result = null,
      message = NUCLEAR_CLAUSE_SURFACE_NO_OUTPUT_MESSAGE,
      diagnosticId = NUCLEAR_CLAUSE_SURFACE_ROUTE_BLOCKED_ID,
      routeFamily = NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
      routeStage = "validate",
      resultMarker = "—",
      override = null,
      resolvedTenseMode = "",
      tense = "",
      pers1 = "",
      pers2 = "",
      obj1 = "",
      poseedor = "",
      posicionesFormula = null,
      verb = "",
      renderVerb = "",
      entradaGrammarObject = null,
      isReflexive = false,
      resolvedDerivationMode = "",
      resolvedDerivationType = "",
      resolvedVoiceMode = "",
      nuclearClauseShell = null,
      vncValencyFrame = null,
      enumerableContract = false
    } = {}) {
      const resultPayload = result && typeof result === "object" ? result : {};
      if (resultMarker !== null && !Object.prototype.hasOwnProperty.call(resultPayload, "result")) {
        resultPayload.result = resultMarker;
      }
      if (resultMarker !== null && !Object.prototype.hasOwnProperty.call(resultPayload, "surfaceForms")) {
        resultPayload.surfaceForms = [];
      }
      if (!Object.prototype.hasOwnProperty.call(resultPayload, "error")) {
        resultPayload.error = true;
      }
      if (!Object.prototype.hasOwnProperty.call(resultPayload, "isReflexive")) {
        resultPayload.isReflexive = isReflexive;
      }
      if (!Object.prototype.hasOwnProperty.call(resultPayload, "posicionesFormula")) {
        resultPayload.posicionesFormula = posicionesFormula && typeof posicionesFormula === "object" ? {
          ...posicionesFormula
        } : null;
      }
      if (entradaGrammarObject && !Object.prototype.hasOwnProperty.call(resultPayload, "entradaGrammarObject")) {
        resultPayload.entradaGrammarObject = entradaGrammarObject;
      }
      const failedLayerContract = getNuclearClauseSurfaceFailedLayerContract(routeStage);
      const fallbackDiagnostic = buildNuclearClauseSurfaceDiagnosticEntry({
        id: diagnosticId,
        message,
        ...failedLayerContract,
        routeFamily,
        routeStage
      });
      resultPayload.diagnostics = normalizeNuclearClauseSurfaceDiagnosticEntries(resultPayload.diagnostics, fallbackDiagnostic);
      const grammarFrame = buildNuclearClauseSurfaceGrammarFrame({
        result: resultPayload,
        override,
        resolvedTenseMode,
        tense,
        routeFamily,
        routeStage,
        unitKind: resolveNuclearClauseSurfaceUnitKind(resolvedTenseMode, tense),
        pers1,
        pers2,
        obj1,
        poseedor,
        posicionesFormula,
        verb,
        renderVerb,
        entradaGrammarObject,
        nuclearClauseShell,
        vncValencyFrame,
        resolvedDerivationMode,
        resolvedDerivationType,
        resolvedVoiceMode
      });
      const resultContract = buildNuclearClauseSurfaceResultContract(resultPayload, grammarFrame);
      return attachNuclearClauseSurfaceContractProperties(resultPayload, resultContract, grammarFrame, {
        enumerable: enumerableContract
      });
    }
    function buildGeneratedNuclearClauseShellMetadata({
      resolvedTenseMode = "",
      tense = "",
      pers1 = "",
      pers2 = "",
      obj1 = "",
      obj2 = "",
      obj3 = "",
      isReflexive = false,
      verb = "",
      renderVerb = "",
      formulaPers1 = null,
      formulaPers2 = null,
      formulaObj1 = null,
      formulaObj2 = null,
      formulaObj3 = null,
      formulaReflexive = null,
      formulaDirectional = null,
      formulaVerb = "",
      formulaSubjectSuffix = "",
      formulaNumberConnector = null,
      nominalClauseMetadata = null,
      typedMorphResultFrame = null
    } = {}) {
      if (typeof targetObject.buildNuclearClauseShellMetadata !== "function") {
        return null;
      }
      const formalUnitKind = resolveNuclearClauseSurfaceUnitKind(resolvedTenseMode, tense);
      const isNominalShell = Boolean(nominalClauseMetadata?.nominalClauseFrame) || formalUnitKind === "nominal-nuclear-clause";
      if (isNominalShell) {
        const numberConnector = nominalClauseMetadata?.num1Num2 || nominalClauseMetadata?.nominalClauseFrame?.subject?.numberConnector || null;
        const connectorSurface = numberConnector ? resolveNuclearClauseSurfaceNominalConnectorSurface(numberConnector, pers2) : normalizeNuclearClauseSurfaceContractSurface(pers2);
        const connectorDisplaySurface = numberConnector ? resolveNuclearClauseSurfaceNominalConnectorDisplaySurface(numberConnector, pers2) : normalizeNuclearClauseSurfaceContractSurface(pers2);
        const formulaPredicateStem = (() => {
          const stem = String(formulaVerb || "");
          const formulaObjectPrefix = String(formulaObj1 === null || formulaObj1 === undefined ? obj1 : formulaObj1);
          if (!stem || !formulaObjectPrefix) {
            return stem;
          }
          const formulaObjectSurface = normalizeCnvFormulaMorphForSurface(formulaObjectPrefix);
          if (stem.startsWith(formulaObjectPrefix) || formulaObjectSurface && stem.startsWith(formulaObjectSurface)) {
            return stem;
          }
          return joinGeneratedNominalStemFormulaPieces({
            objectPrefix: formulaObjectPrefix,
            stemCore: stem
          });
        })();
        const nominalPredicateStem = (() => {
          const stem = String(formulaPredicateStem || formulaVerb || verb || renderVerb || "");
          const insideObjectPrefix = String(obj1 || "");
          const formulaObjectPrefix = String(formulaObj1 === null || formulaObj1 === undefined ? "" : formulaObj1);
          if (formulaPredicateStem || formulaObjectPrefix || !insideObjectPrefix || stem.startsWith(insideObjectPrefix)) {
            return stem;
          }
          return typeof targetObject.buildOutputPrefixedChain === "function" ? targetObject.buildOutputPrefixedChain({
            obj1: insideObjectPrefix,
            tronco: stem
          }) : `${insideObjectPrefix}${stem}`;
        })();
        const nominalFormulaDisplayStem = String(nominalClauseMetadata?.formulaDisplayStem || "");
        const nominalFormulaEcho = (() => {
          if (String(tense || "") !== "agentivo-preterito") {
            return "";
          }
          const possessorPrefix = String(nominalClauseMetadata?.nominalClauseFrame?.predicate?.stateSlot?.possessorPrefix || "");
          const subjectPrefix = String(pers1 || "Ø") || "Ø";
          const subjectCase = "Ø";
          const statePrefix = possessorPrefix ? `+${possessorPrefix}` : "";
          return `#${subjectPrefix}-${subjectCase}${statePrefix}(${nominalFormulaDisplayStem || nominalPredicateStem || "STEM"})${connectorDisplaySurface || "Ø"}#`;
        })();
        const nominalShell = targetObject.buildNuclearClauseShellMetadata({
          clauseKind: "nominal-nuclear-clause",
          formulaEcho: nominalFormulaEcho,
          formulaSlots: {
            pers1Pers2: {
              slot: "pers1-pers2",
              prefix: pers1,
              suffix: ""
            },
            predicateStem: {
              slot: "STEM",
              stem: nominalPredicateStem,
              formulaDisplayStem: nominalFormulaDisplayStem,
              state: nominalClauseMetadata?.nominalClauseFrame?.predicate?.state || "derived-nominal",
              stateSlot: nominalClauseMetadata?.nominalClauseFrame?.predicate?.stateSlot || null
            },
            num1Num2: {
              slot: "num1-num2",
              connector: connectorSurface,
              displayConnector: connectorDisplaySurface || "Ø",
              nounClass: numberConnector?.nounClass || "",
              compactDisplay: numberConnector?.compactDisplay,
              compactSurface: numberConnector?.compactSurface,
              num1: numberConnector?.num1,
              num2: numberConnector?.num2,
              displayNum1: numberConnector?.displayNum1,
              displayNum2: numberConnector?.displayNum2,
              displayDyad: numberConnector?.displayDyad,
              dyadSource: numberConnector?.dyadSource
            }
          },
          predicateState: nominalClauseMetadata?.nominalClauseFrame?.predicate?.state || "derived-nominal"
        });
        return {
          ...nominalShell,
          typedMorphResultFrame,
          formulaProjection: Object.freeze({
            kind: "generated-nuclear-clause-formula-projection",
            sourceKind: "generated-typed-morph-result-frame",
            sourceSemanticIdentity: typedMorphResultFrame?.semanticIdentity || "",
            result: nominalShell?.formulaEcho || "",
            derivedFromWrittenProjection: false
          }),
          formulaDerivedFromWrittenProjection: false,
          writtenDerivedFromFormulaProjection: false
        };
      }
      const verbalFormulaPers1 = formulaPers1 === null || formulaPers1 === undefined ? pers1 : formulaPers1;
      const verbalFormulaPers2 = formulaPers2 === null || formulaPers2 === undefined ? formulaSubjectSuffix : formulaPers2;
      const verbalFormulaNumberConnector = formulaNumberConnector === null || formulaNumberConnector === undefined ? pers2 : formulaNumberConnector;
      const verbalFormulaObj1 = formulaObj1 === null || formulaObj1 === undefined ? obj1 : formulaObj1;
      const verbalFormulaObj2 = formulaObj2 === null || formulaObj2 === undefined ? obj2 : formulaObj2;
      const verbalFormulaObj3 = formulaObj3 === null || formulaObj3 === undefined ? obj3 : formulaObj3;
      const verbalFormulaReflexive = formulaReflexive === null || formulaReflexive === undefined ? isReflexive ? "mo" : "" : formulaReflexive;
      const verbalFormulaObjectPrefix = String(verbalFormulaObj1 || "");
      const verbalFormulaReflexivePrefix = String(verbalFormulaReflexive || "");
      const shellFormulaObj1 = verbalFormulaObjectPrefix && verbalFormulaObjectPrefix === verbalFormulaReflexivePrefix ? "" : verbalFormulaObj1;
      const shell = targetObject.buildNuclearClauseShellMetadata({
        clauseKind: "verbal-nuclear-clause",
        subject: {
          prefix: verbalFormulaPers1,
          suffix: verbalFormulaPers2,
          numberConnector: verbalFormulaNumberConnector
        },
        object: {
          prefix: shellFormulaObj1,
          obj2: verbalFormulaObj2,
          obj3: verbalFormulaObj3,
          reflexivo: verbalFormulaReflexive
        },
        directional: formulaDirectional,
        predicate: {
          stem: formulaVerb || renderVerb || verb
        },
        tenseValue: tense,
        tenseLabel: tense
      });
      const shellStem = String(formulaVerb || renderVerb || verb || "");
      const enrichLesson6Slot = (slotKey = "", prefix = "") => {
        const dyadFrame = getDirectClassicalObjectDyadFrame(prefix, {
          stem: shellStem,
          pers1: verbalFormulaPers1,
          pers2: verbalFormulaPers2
        });
        if (!dyadFrame || !shell?.formulaSlots?.[slotKey]) {
          return;
        }
        shell.formulaSlots[slotKey].lesson6DirectClassicalDyad = dyadFrame;
        shell.formulaSlots[slotKey].functionalSubslots = dyadFrame.formulaPosition === "va1-va2" ? {
          va1: dyadFrame.functionalVa1 || dyadFrame.va1 || "",
          va2: dyadFrame.functionalVa2 || dyadFrame.va2 || "",
          val1Features: dyadFrame.val1Features || null,
          val2Features: dyadFrame.val2Features || null,
          visibleLinearMorph: dyadFrame.visibleFormulaPrefix || ""
        } : null;
      };
      enrichLesson6Slot("obj1", shellFormulaObj1);
      enrichLesson6Slot("obj2", verbalFormulaObj2);
      enrichLesson6Slot("obj3", verbalFormulaObj3);
      enrichLesson6Slot("reflexivo", verbalFormulaReflexive);
      return {
        ...shell,
        typedMorphResultFrame,
        formulaProjection: Object.freeze({
          kind: "generated-nuclear-clause-formula-projection",
          sourceKind: "generated-typed-morph-result-frame",
          sourceSemanticIdentity: typedMorphResultFrame?.semanticIdentity || "",
          result: shell?.formulaEcho || "",
          derivedFromWrittenProjection: false
        }),
        formulaDerivedFromWrittenProjection: false,
        writtenDerivedFromFormulaProjection: false
      };
    }
    function buildGeneratedVncValencyFrameMetadata({
      resolvedTenseMode = "",
      pers1 = "",
      pers2 = "",
      obj1 = "",
      obj1Base = "",
      obj2 = "",
      obj3 = "",
      parsedVerb = null,
      valencySummary = null,
      targetValency = null,
      isPassiveImpersonalMode = false,
      nuclearClauseShell = null
    } = {}) {
      if (resolvedTenseMode !== targetObject.TENSE_MODE.verbo) {
        return null;
      }
      const normalizedObj1 = String(obj1 || "");
      const normalizedObj1Base = String(obj1Base || normalizedObj1 || "");
      const normalizedObj2 = String(obj2 || "");
      const normalizedObj3 = String(obj3 || "");
      const selectedObjectMarkers = [normalizedObj1, normalizedObj2, normalizedObj3].filter(Boolean);
      const baseObjectSlots = Number.isFinite(valencySummary?.baseObjectSlots) ? valencySummary.baseObjectSlots : typeof targetObject.getBaseObjectSlots === "function" ? targetObject.getBaseObjectSlots(parsedVerb) : selectedObjectMarkers.length;
      const availableObjectSlots = Number.isFinite(valencySummary?.availableObjectSlots) ? valencySummary.availableObjectSlots : Math.max(0, baseObjectSlots);
      const resolvedTargetValency = Number.isFinite(targetValency) ? targetValency : Math.max(1, baseObjectSlots + 1);
      const subjectInfo = typeof targetObject.getPers1Pers2Info === "function" ? targetObject.getPers1Pers2Info(pers1, pers2) : null;
      const objectInfo = typeof targetObject.getObj1PersonInfo === "function" ? targetObject.getObj1PersonInfo(normalizedObj1) : null;
      const lesson6StemForDyad = String(nuclearClauseShell?.formulaSlots?.predicateStem?.stem || nuclearClauseShell?.formulaSlots?.predicateStem?.displayStem || parsedVerb?.verb || parsedVerb?.displayVerb || "");
      const lesson6ObjectDyadFrame = getDirectClassicalObjectDyadFrame(normalizedObj1Base || normalizedObj1, {
        stem: lesson6StemForDyad,
        pers1,
        pers2
      });
      const lesson6ShellFormulaObjectPrefix = String(nuclearClauseShell?.formulaSlots?.reflexivo?.displayPrefix && nuclearClauseShell.formulaSlots.reflexivo.displayPrefix !== "Ø" ? nuclearClauseShell.formulaSlots.reflexivo.displayPrefix : nuclearClauseShell?.formulaSlots?.obj1?.displayPrefix && nuclearClauseShell.formulaSlots.obj1.displayPrefix !== "Ø" ? nuclearClauseShell.formulaSlots.obj1.displayPrefix : "");
      const lesson6ResolvedObjectDyadFrame = lesson6ObjectDyadFrame ? {
        ...lesson6ObjectDyadFrame,
        visibleFormulaPrefix: lesson6ShellFormulaObjectPrefix || lesson6ObjectDyadFrame.visibleFormulaPrefix
      } : null;
      const selectedValency = Math.max(1, 1 + selectedObjectMarkers.length);
      const isTransitiveFrame = baseObjectSlots > 0 || selectedObjectMarkers.length > 0 || resolvedTargetValency > 1;
      const pers1Pers2Slot = {
        slot: "pers1-pers2",
        functionRole: "subject",
        prefix: String(pers1 || ""),
        suffix: String(pers2 || ""),
        displayPrefix: String(pers1 || "") || "Ø",
        displaySuffix: String(pers2 || "") || "Ø",
        person: subjectInfo?.person ?? null,
        number: subjectInfo?.number || ""
      };
      const obj1Slot = {
        slot: "obj1",
        functionRole: "mainline-object",
        prefix: normalizedObj1,
        basePrefix: normalizedObj1Base,
        displayPrefix: normalizedObj1 || "Ø",
        displayBasePrefix: normalizedObj1Base || "Ø",
        person: objectInfo?.person ?? null,
        number: objectInfo?.number || "",
        isPresent: Boolean(normalizedObj1),
        lesson6DirectClassicalDyad: lesson6ResolvedObjectDyadFrame,
        formulaPrefix: lesson6ResolvedObjectDyadFrame?.visibleFormulaPrefix || normalizedObj1,
        formulaPosition: lesson6ResolvedObjectDyadFrame?.formulaPosition || "",
        predicatePositionStatus: lesson6ResolvedObjectDyadFrame?.predicatePositionStatus || "",
        trajectory: lesson6ResolvedObjectDyadFrame?.trajectory || "",
        specificity: lesson6ResolvedObjectDyadFrame?.specificity || "",
        prominence: lesson6ResolvedObjectDyadFrame?.prominence || ""
      };
      const obj2Slot = {
        slot: "obj2",
        functionRole: "secondary-object",
        prefix: normalizedObj2,
        displayPrefix: normalizedObj2 || "Ø",
        isPresent: Boolean(normalizedObj2)
      };
      const obj3Slot = {
        slot: "obj3",
        functionRole: "tertiary-object",
        prefix: normalizedObj3,
        displayPrefix: normalizedObj3 || "Ø",
        isPresent: Boolean(normalizedObj3)
      };
      return {
        kind: "vnc-valency-frame",
        version: 1,
        lessonRange: "5-6",
        source: NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
        sourceLayer: "valence-frame",
        diagnosticOnly: true,
        doesNotGenerateForms: true,
        frameFixed: true,
        valenceFrameFixed: true,
        objectFrameFixed: true,
        fixedBy: "generated-nuclear-clause-surface",
        valency: isTransitiveFrame ? "transitive" : "intransitive",
        valencyLabel: isTransitiveFrame ? "transitiva" : "intransitiva",
        baseObjectSlots,
        availableObjectSlots,
        selectedObjectSlots: selectedObjectMarkers.length,
        selectedValency,
        targetValency: resolvedTargetValency,
        isPassiveImpersonalMode: Boolean(isPassiveImpersonalMode),
        pers1Pers2: pers1Pers2Slot,
        obj1: obj1Slot,
        obj2: obj2Slot,
        obj3: obj3Slot,
        objectSlotSequence: [obj1Slot, obj2Slot, obj3Slot],
        lesson6DirectClassicalObject: lesson6ResolvedObjectDyadFrame,
        lesson6VisibleFormulaObjectPrefix: lesson6ResolvedObjectDyadFrame?.visibleFormulaPrefix || normalizedObj1 || "",
        lesson6ValencePosition: lesson6ResolvedObjectDyadFrame?.formulaPosition || "",
        nuclearClauseFormulaSlots: nuclearClauseShell?.formulaSlots || null,
        boundaries: {
          isSentenceEngine: false,
          isGenerationRule: false,
          changesSurfaceForms: false,
          objectLabelsAreNotEvidenceForSentenceObjects: true
        }
      };
    }
    function buildGeneratedDerivedVoiceFrameMetadata({
      resolvedTenseMode = "",
      resolvedDerivationMode = "",
      resolvedVoiceMode = "",
      isNonactive = false,
      isPassiveImpersonalMode = false,
      sourceValency = null,
      targetValency = null,
      valencySummary = null,
      parsedVerb = null,
      verb = "",
      analysisVerb = "",
      pers1 = "",
      pers2 = "",
      obj1 = "",
      obj1Base = "",
      hasPromotableObject = false,
      preserveSubjectForPassive = false,
      allowPassiveObject = false
    } = {}) {
      if (resolvedTenseMode !== targetObject.TENSE_MODE.verbo) {
        return null;
      }
      const hasImpersonalPrefix = parsedVerb?.hasImpersonalTlaPrefix === true;
      if (!isNonactive && !isPassiveImpersonalMode && !hasImpersonalPrefix) {
        return null;
      }
      const normalizedObj1 = String(obj1 || "");
      const normalizedObj1Base = String(obj1Base || normalizedObj1 || "");
      const normalizedSourceValency = Number.isFinite(sourceValency) ? sourceValency : Math.max(1, (Number.isFinite(valencySummary?.baseObjectSlots) ? valencySummary.baseObjectSlots : 0) + 1);
      const normalizedTargetValency = Number.isFinite(targetValency) ? targetValency : normalizedSourceValency;
      const isImpersonalFrame = hasImpersonalPrefix || isPassiveImpersonalMode && !hasPromotableObject;
      const voiceLabel = hasImpersonalPrefix ? "impersonal ta-" : isPassiveImpersonalMode ? "pasivo/impersonal" : "no activo";
      return {
        kind: "derived-voice-frame",
        version: 1,
        lessonRange: "20-23",
        source: NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
        diagnosticOnly: true,
        doesNotGenerateForms: true,
        derivation: {
          mode: String(resolvedDerivationMode || ""),
          isNonactive: Boolean(isNonactive),
          label: isNonactive ? "no activo" : "activo",
          finalStem: String(verb || ""),
          analysisStem: String(analysisVerb || verb || "")
        },
        voice: {
          mode: String(resolvedVoiceMode || ""),
          label: voiceLabel,
          isPassiveImpersonalMode: Boolean(isPassiveImpersonalMode),
          isImpersonalFrame,
          hasImpersonalTlaPrefix: hasImpersonalPrefix,
          hasPromotableObject: Boolean(hasPromotableObject),
          preserveSubjectForPassive: Boolean(preserveSubjectForPassive),
          allowPassiveObject: Boolean(allowPassiveObject)
        },
        valency: {
          sourceValency: normalizedSourceValency,
          targetValency: normalizedTargetValency,
          baseObjectSlots: Number.isFinite(valencySummary?.baseObjectSlots) ? valencySummary.baseObjectSlots : null,
          fusionObjectSlots: Number.isFinite(valencySummary?.fusionObjectSlots) ? valencySummary.fusionObjectSlots : null,
          availableObjectSlots: Number.isFinite(valencySummary?.availableObjectSlots) ? valencySummary.availableObjectSlots : null,
          selectedObj1: normalizedObj1,
          baseObj1: normalizedObj1Base,
          obj1ClearedByVoice: Boolean(normalizedObj1Base && !normalizedObj1 && isPassiveImpersonalMode)
        },
        pers1Pers2: {
          slot: "pers1-pers2",
          prefix: String(pers1 || ""),
          suffix: String(pers2 || ""),
          displayPrefix: String(pers1 || "") || "Ø",
          displaySuffix: String(pers2 || "") || "Ø"
        },
        boundaries: {
          isSentenceEngine: false,
          isGenerationRule: false,
          changesSurfaceForms: false,
          noNewVoiceBehavior: true
        }
      };
    }
    function getGeneratedForwardDerivationLabel(derivationType = "") {
      if (derivationType === targetObject.DERIVATION_TYPE.causative) {
        return "causativa";
      }
      if (derivationType === targetObject.DERIVATION_TYPE.applicative) {
        return "aplicativa";
      }
      return String(derivationType || "");
    }
    function resolveForwardDerivationMetadataStemSurface(record = null) {
      if (!record || typeof record !== "object") {
        return "";
      }
      if (typeof targetObject.getProvenancePrimaryStemSurface === "function") {
        const framedSurface = targetObject.getProvenancePrimaryStemSurface(record);
        if (framedSurface) {
          return framedSurface;
        }
      }
      const grammarFrame = (record.grammarFrame && typeof record.grammarFrame === "object" ? record.grammarFrame : null) || (record.frames && typeof record.frames === "object" ? record.frames : null);
      if (grammarFrame?.resultFrame && typeof grammarFrame.resultFrame === "object") {
        return "";
      }
      return targetObject.normalizeDerivationStemValue(record.surfaceStem || (record.stemSpec ? targetObject.realizeMorphStemSpec(record.stemSpec, record.stem || "") : "") || record.stem || "");
    }
    function buildGeneratedForwardDerivationFrameMetadata({
      resolvedTenseMode = "",
      resolvedDerivationType = "",
      derivationValencyDelta = 0,
      sourceValency = null,
      forwardDerivations = null,
      forwardStemProvenance = null,
      causativeAllStems = null,
      applicativeAllStems = null,
      renderVerb = "",
      verb = "",
      analysisVerb = ""
    } = {}) {
      if (resolvedTenseMode !== targetObject.TENSE_MODE.verbo) {
        return null;
      }
      const config = typeof targetObject.getForwardDerivationConfig === "function" ? targetObject.getForwardDerivationConfig(resolvedDerivationType) : null;
      if (!config) {
        return null;
      }
      const selectedMeta = resolvedDerivationType === targetObject.DERIVATION_TYPE.causative ? forwardDerivations?.causativeSelectionMeta : forwardDerivations?.applicativeSelectionMeta;
      const candidateStems = resolvedDerivationType === targetObject.DERIVATION_TYPE.causative ? causativeAllStems : applicativeAllStems;
      const normalizedCandidateStems = Array.isArray(candidateStems) ? candidateStems.map(stem => String(stem || "")).filter(Boolean) : [];
      const sourceStemForComparison = targetObject.normalizeDerivationStemValue(renderVerb || "");
      const derivedCandidateStem = normalizedCandidateStems.find(stem => targetObject.normalizeDerivationStemValue(stem) !== sourceStemForComparison) || normalizedCandidateStems[0] || "";
      const selectedStemCandidate = targetObject.normalizeDerivationStemValue(resolveForwardDerivationMetadataStemSurface(selectedMeta) || resolveForwardDerivationMetadataStemSurface(forwardStemProvenance) || "");
      const selectedStem = targetObject.normalizeDerivationStemValue(selectedStemCandidate && selectedStemCandidate !== sourceStemForComparison ? selectedStemCandidate : derivedCandidateStem || selectedStemCandidate || analysisVerb || verb || "");
      const delta = Number.isFinite(derivationValencyDelta) ? derivationValencyDelta : 0;
      const derivedValency = Number.isFinite(sourceValency) ? sourceValency : null;
      const baseValency = Number.isFinite(derivedValency) ? Math.max(1, derivedValency - delta) : null;
      const lessonRange = resolvedDerivationType === targetObject.DERIVATION_TYPE.causative ? "24-25" : "26";
      return {
        kind: "forward-derivation-frame",
        version: 1,
        lessonRange,
        source: NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
        diagnosticOnly: true,
        doesNotGenerateForms: true,
        derivation: {
          type: resolvedDerivationType,
          label: getGeneratedForwardDerivationLabel(resolvedDerivationType),
          valencyDelta: delta,
          rule: String(selectedMeta?.rule || forwardStemProvenance?.rule || ""),
          patternType: String(selectedMeta?.patternType || forwardStemProvenance?.patternType || ""),
          guidanceRouteText: String(selectedMeta?.guidanceRoute?.text || forwardStemProvenance?.guidanceRoute?.text || "")
        },
        stem: {
          sourceVerb: String(renderVerb || ""),
          selectedStem,
          finalStem: String(verb || ""),
          analysisStem: String(analysisVerb || verb || ""),
          candidateStems: normalizedCandidateStems
        },
        valency: {
          sourceValency: baseValency,
          derivedValency,
          delta
        },
        boundaries: {
          isSentenceEngine: false,
          isGenerationRule: false,
          changesSurfaceForms: false,
          noNewDerivationBehavior: true
        }
      };
    }
    function buildGeneratedCompoundFrameMetadata({
      resolvedTenseMode = "",
      parsedVerb = null,
      nuclearClauseShell = null
    } = {}) {
      const compoundAst = parsedVerb?.compoundAst || null;
      const allowsCompoundFrame = resolvedTenseMode === targetObject.TENSE_MODE.verbo || resolvedTenseMode === targetObject.TENSE_MODE.sustantivo || resolvedTenseMode === targetObject.TENSE_MODE.adjetivo;
      if (!allowsCompoundFrame || !compoundAst || compoundAst.kind !== "compound") {
        return null;
      }
      const embeds = Array.isArray(compoundAst.embeds) ? compoundAst.embeds.map(entry => ({
        role: String(entry?.role || ""),
        kind: String(entry?.kind || ""),
        value: String(entry?.value || ""),
        source: String(entry?.source || ""),
        explicit: entry?.explicit === true
      })) : [];
      if (!embeds.length) {
        return null;
      }
      const compoundRouteFrame = buildGeneratedCompoundRouteFrameMetadata({
        resolvedTenseMode,
        compoundAst,
        embeds,
        nuclearClauseShell
      });
      return {
        kind: "compound-frame",
        version: 1,
        lessonRange: "28,30",
        source: "parse-compoundAst",
        diagnosticOnly: true,
        doesNotGenerateForms: true,
        compoundRouteFrame,
        routeFrame: compoundRouteFrame,
        matrix: {
          role: "matrix",
          stem: String(compoundAst.matrix?.stem || ""),
          ruleBase: String(compoundAst.matrix?.ruleBase || "")
        },
        embeds,
        sourceInput: {
          rawInput: String(compoundAst.source?.rawInput || ""),
          displayVerb: String(compoundAst.source?.displayVerb || ""),
          displayCore: String(compoundAst.source?.displayCore || ""),
          verb: String(compoundAst.source?.verb || ""),
          analysisVerb: String(compoundAst.source?.analysisVerb || "")
        },
        valency: compoundAst.valency && typeof compoundAst.valency === "object" ? {
          ...compoundAst.valency
        } : null,
        flags: compoundAst.flags && typeof compoundAst.flags === "object" ? {
          ...compoundAst.flags
        } : {},
        boundaries: {
          isSentenceEngine: false,
          isGenerationRule: false,
          changesSurfaceForms: false,
          notCompoundNncGeneration: true
        }
      };
    }
    function getGeneratedCompoundFinalFormulaShape(sourceInput = "", compoundAst = null) {
      const raw = String(sourceInput || "").trim();
      if (/^-?\([^()/]+\/[^()/]+\)$/.test(raw)) {
        return "compound-vnc-embed-before-matrix";
      }
      if (/^\([^()]+\)-\([^()]+\)$/.test(raw)) {
        return "compound-verbstem-adjacent-embed-before-matrix";
      }
      if (compoundAst?.flags?.hasCompoundMarker === true) {
        return "compound-verbstem-marked-boundary";
      }
      return raw ? "compound-verbstem-route-specific-shape" : "";
    }
    function getGeneratedCompoundExternalObjectSlots(nuclearClauseShell = null, compoundAst = null) {
      const formulaSlots = nuclearClauseShell?.slots && typeof nuclearClauseShell.slots === "object" ? nuclearClauseShell.slots : {};
      const formulaSlotObjects = ["obj1", "obj2", "obj3", "reflexivo"].map(slotId => {
        const prefix = getFunctionUseValenceObjectSlotValue(formulaSlots[slotId]);
        return prefix ? {
          slotId,
          prefix,
          owner: "formula",
          sourceLayer: "nuclear-clause-formula"
        } : null;
      }).filter(Boolean);
      if (formulaSlotObjects.length) {
        return formulaSlotObjects;
      }
      const tokens = Array.isArray(compoundAst?.valency?.tokens) ? compoundAst.valency.tokens : [];
      return tokens.map((token, index) => {
        const prefix = normalizeFunctionUseValenceObjectSlot(token);
        return prefix ? {
          slotId: `obj${index + 1}`,
          prefix,
          owner: "compound-valency",
          sourceLayer: "compound-ast-valency"
        } : null;
      }).filter(Boolean);
    }
    function buildGeneratedCompoundObjectSlotOwnershipFrame({
      embedRole = "",
      matrixValence = "",
      sourceExternalObjectSlots = [],
      remainingExternalObjectSlots = []
    } = {}) {
      const sourceSlots = Array.isArray(sourceExternalObjectSlots) ? sourceExternalObjectSlots : [];
      const remainingSlots = Array.isArray(remainingExternalObjectSlots) ? remainingExternalObjectSlots : [];
      const resolvedMatrixValence = String(matrixValence || "").trim();
      const matrixValenceFrameFixed = Boolean(resolvedMatrixValence);
      return {
        kind: "generated-compound-object-slot-ownership-frame",
        version: 1,
        embedRole: String(embedRole || "").trim(),
        matrixValence: resolvedMatrixValence,
        matrixValenceFrameFixed,
        consumedObjectSlot: "",
        consumedObjectSlotOwnedBy: "none",
        sourceExternalObjectSlots: sourceSlots.map(slot => ({
          ...slot
        })),
        remainingExternalObjectSlots: remainingSlots.map(slot => ({
          ...slot
        })),
        sourceExternalObjectSlotsOwnedBy: sourceSlots.length ? "source-compound-route-frame" : "none",
        remainingExternalObjectSlotsOwnedBy: remainingSlots.length ? "matrix-route-frame" : "none",
        embeddedRoleLicensedBy: embedRole ? "generated-compound-route-frame" : "none",
        routeFrameOwnsObjectSlotLicensing: matrixValenceFrameFixed,
        functionUseOwnsObjectSlots: false,
        finalFormulaShapeOwnsObjectSlots: false,
        functionUseMayAnnotateLicensedReadingsOnly: true,
        matrixValenceFrameMustBeFixedBeforeObjectSlotOwnership: true,
        objectSlotLicensingOrder: ["source-principal-vnc", "compound-ast-route-frame", "matrix-valence-frame", "route-frame", "function-use-annotation"]
      };
    }
    function buildGeneratedCompoundRouteFrameMetadata({
      resolvedTenseMode = "",
      compoundAst = null,
      embeds = [],
      nuclearClauseShell = null
    } = {}) {
      if (!compoundAst || compoundAst.kind !== "compound") {
        return null;
      }
      const sourceInput = String(compoundAst.source?.rawInput || compoundAst.source?.displayVerb || "").trim();
      const normalizedEmbeds = Array.isArray(embeds) ? embeds : [];
      const sourceAdjunctNncs = normalizedEmbeds.map(entry => ({
        surface: String(entry?.value || ""),
        stem: String(entry?.value || ""),
        kind: String(entry?.kind || ""),
        role: String(entry?.role || ""),
        sourceLayer: String(entry?.source || "")
      }));
      const remainingExternalObjectSlots = getGeneratedCompoundExternalObjectSlots(nuclearClauseShell, compoundAst);
      const formulaSlots = nuclearClauseShell?.slots && typeof nuclearClauseShell.slots === "object" ? {
        ...nuclearClauseShell.slots
      } : null;
      const embedRole = normalizedEmbeds.length === 1 ? String(normalizedEmbeds[0]?.role || "") : normalizedEmbeds.length ? "multiple-embed-roles" : "";
      const embeddedRoot = normalizedEmbeds.length === 1 ? String(normalizedEmbeds[0]?.value || "") : "";
      const matrixValence = String(compoundAst.valency?.transitivity || "");
      const objectSlotOwnership = buildGeneratedCompoundObjectSlotOwnershipFrame({
        embedRole,
        matrixValence,
        sourceExternalObjectSlots: remainingExternalObjectSlots,
        remainingExternalObjectSlots
      });
      const matrixValenceFrameFixed = objectSlotOwnership.matrixValenceFrameFixed === true;
      return {
        kind: "generated-compound-route-frame",
        version: 1,
        sourcePrincipalVnc: {
          surface: sourceInput,
          formulaSlots,
          formulaEcho: String(nuclearClauseShell?.formulaEcho || "")
        },
        sourceAdjunctNnc: sourceAdjunctNncs[0] || null,
        sourceAdjunctNncs,
        matrix: {
          role: "matrix",
          root: String(compoundAst.matrix?.stem || ""),
          ruleBase: String(compoundAst.matrix?.ruleBase || "")
        },
        matrixValence,
        embedRole,
        embeddedRoot,
        embeddedRoots: normalizedEmbeds.map(entry => String(entry?.value || "")).filter(Boolean),
        consumedObjectSlot: "",
        sourceExternalObjectSlots: remainingExternalObjectSlots,
        remainingExternalObjectSlots,
        remainingExternalObjectSlotIds: remainingExternalObjectSlots.map(slot => slot.slotId),
        objectSlotOwnership,
        valenceDelta: 0,
        valenceEffects: {
          sourceExternalObjectSlotCount: remainingExternalObjectSlots.length,
          remainingExternalObjectSlotCount: remainingExternalObjectSlots.length,
          externalObjectSlotDelta: 0,
          stemInternalObjectSlotDelta: 0,
          compoundRoleStillRequiresAndrewsRouteFrame: true
        },
        andrewsSection: "Andrews 28",
        andrewsRefs: ["Andrews 28", "Andrews 30"],
        generationStatus: "generated-output-carried-diagnostic-route-frame",
        generationAllowed: false,
        routeStage: "parse-compound-ast",
        resolvedTenseMode: String(resolvedTenseMode || ""),
        finalFormulaShape: getGeneratedCompoundFinalFormulaShape(sourceInput, compoundAst),
        routeFrameLicensesEmbedRole: true,
        routeFrameLicensesObjectSlotOwnership: matrixValenceFrameFixed,
        finalFormulaShapeDoesNotLicenseRole: true,
        finalFormulaShapeDoesNotLicenseObjectSlots: true,
        functionUseDoesNotLicenseRole: true,
        functionUseDoesNotLicenseObjectSlots: true,
        sourceRouteFrameRequired: true,
        boundaries: {
          matrixValenceFrameMustBeFixedBeforeObjectSlotOwnership: true,
          routeFrameOwnsEmbedRoleLicensing: true,
          finalFormulaShapeDoesNotLicenseRole: true,
          functionUseDoesNotLicenseRole: true
        }
      };
    }
    function buildGeneratedPatientiveCompoundSourceFrameMetadata({
      resolvedTenseMode = "",
      compoundFrame = null,
      nominalizationProfile = null,
      nuclearClauseShell = null,
      surfaceForms = []
    } = {}) {
      const patientiveFamilyProfile = nominalizationProfile?.patientiveFamilyProfile || null;
      if (resolvedTenseMode !== targetObject.TENSE_MODE.sustantivo || !compoundFrame || compoundFrame.kind !== "compound-frame" || nominalizationProfile?.nominalKind !== "patientivo" || !patientiveFamilyProfile) {
        return null;
      }
      const forms = Array.isArray(surfaceForms) ? surfaceForms.map(form => String(form || "")).filter(Boolean) : [];
      const family = String(patientiveFamilyProfile.family || "");
      const compoundRouteFrame = cloneNuclearClauseSurfaceRouteFrame(compoundFrame.compoundRouteFrame || compoundFrame.routeFrame || null);
      return {
        kind: "patientive-compound-source-frame",
        version: 1,
        lessonRef: "Andrews 41.2.3",
        relatedLessonRefs: ["Andrews 39.6", "Andrews 39.7", "Andrews 39.8"],
        outputKind: "patientive-nnc-compound-source",
        sourceCategory: "compound-verbstem",
        nominalizationKind: "patientive",
        patientiveFamily: family,
        sourcePattern: String(patientiveFamilyProfile.sourcePattern || ""),
        sourceFamilyIds: Array.isArray(patientiveFamilyProfile.sourceFamilyIds) ? Array.from(patientiveFamilyProfile.sourceFamilyIds) : [],
        generatedSurfacePreserved: true,
        surfaceForms: forms,
        sourceFormulaEcho: String(nuclearClauseShell?.formulaEcho || ""),
        sourceFormulaSlots: nuclearClauseShell?.slots && typeof nuclearClauseShell.slots === "object" ? {
          ...nuclearClauseShell.slots
        } : null,
        compoundRouteFrame,
        routeFrame: compoundRouteFrame ? {
          ...compoundRouteFrame
        } : null,
        sourceCompoundFrame: {
          kind: compoundFrame.kind,
          lessonRange: compoundFrame.lessonRange,
          matrix: compoundFrame.matrix && typeof compoundFrame.matrix === "object" ? {
            ...compoundFrame.matrix
          } : null,
          embeds: Array.isArray(compoundFrame.embeds) ? compoundFrame.embeds.map(entry => ({
            ...entry
          })) : [],
          sourceInput: compoundFrame.sourceInput && typeof compoundFrame.sourceInput === "object" ? {
            ...compoundFrame.sourceInput
          } : null,
          valency: compoundFrame.valency && typeof compoundFrame.valency === "object" ? {
            ...compoundFrame.valency
          } : null,
          compoundRouteFrame: compoundFrame.compoundRouteFrame && typeof compoundFrame.compoundRouteFrame === "object" ? {
            ...compoundFrame.compoundRouteFrame
          } : null,
          routeFrame: compoundFrame.routeFrame && typeof compoundFrame.routeFrame === "object" ? {
            ...compoundFrame.routeFrame
          } : null,
          flags: compoundFrame.flags && typeof compoundFrame.flags === "object" ? {
            ...compoundFrame.flags
          } : {}
        },
        compoundPatientiveSource: {
          relation: family ? `${family}-patientive-from-compound-source` : "patientive-from-compound-source",
          evidence: "patientiveFamilyProfile + compoundAst",
          sourceRoleClass: family === "passive" ? "passive-patientive-compound-source" : family === "impersonal" ? "impersonal-patientive-compound-source" : "patientive-compound-source"
        },
        cannotInferFromSurfaceAlone: true,
        spellingAuthority: "Classical Andrews transcription",
        grammarAuthority: "ANDREWS_TRANSCRIPTION_CANVAS.md",
        boundaries: {
          isSentenceEngine: false,
          isGenerationRule: false,
          changesSurfaceForms: false,
          noNewSurfaceForms: true,
          noFixtureEvidence: true,
          doesNotResolveAllCompoundSemantics: true
        }
      };
    }
    function getAdverbialNuclearRouteFrameObjectSlots(vector = null) {
      const source = vector && typeof vector === "object" ? vector : {};
      return ["obj1", "obj2", "obj3", "reflexivo"].map(slotId => ({
        slotId,
        prefix: String(source[slotId] || ""),
        owner: "source-valence-frame"
      })).filter(slot => slot.prefix);
    }
    function buildAdverbialNuclearFunctionRouteFrame({
      sourceStem = "",
      finalStem = "",
      analysisStem = "",
      sourceValency = "",
      tense = "",
      functionUseValenceGate = null
    } = {}) {
      const gate = functionUseValenceGate && typeof functionUseValenceGate === "object" ? functionUseValenceGate : null;
      const sourceExternalObjectSlots = getAdverbialNuclearRouteFrameObjectSlots(gate?.sourceVector);
      const remainingExternalObjectSlots = getAdverbialNuclearRouteFrameObjectSlots(gate?.currentVector);
      const matrixValenceFrameFixed = gate?.generationAllowed === true;
      return {
        kind: "adverbial-nuclear-function-route-frame",
        version: 1,
        sourceFormula: "CNV predicate -> adverbial function reading",
        finalFormulaShape: "configured-adverbio-surface",
        andrewsSection: "Andrews Lesson 44",
        generationStatus: matrixValenceFrameFixed ? "generated-after-fixed-valence-frame" : "blocked-until-fixed-valence-frame",
        sourcePrincipalVnc: {
          role: "source-vnc",
          stem: String(sourceStem || ""),
          finalStem: String(finalStem || ""),
          analysisStem: String(analysisStem || ""),
          tense,
          valence: String(sourceValency || ""),
          externalObjectSlots: sourceExternalObjectSlots.map(slot => ({
            ...slot
          }))
        },
        sourceAdjunctNnc: null,
        embedRole: "none",
        consumedObjectSlot: "",
        consumedObjectSlotOwnedBy: "none",
        matrixValence: String(sourceValency || ""),
        matrixValenceFrameFixed,
        valenceDelta: {
          sourceExternalObjectSlotCount: sourceExternalObjectSlots.length,
          consumedObjectSlotCount: 0,
          remainingExternalObjectSlotCount: remainingExternalObjectSlots.length
        },
        sourceExternalObjectSlots,
        remainingExternalObjectSlots,
        routeFrameLicensesEmbedRole: false,
        routeFrameLicensesObjectSlotOwnership: matrixValenceFrameFixed,
        finalFormulaShapeDoesNotLicenseRole: true,
        finalFormulaShapeDoesNotLicenseObjectSlots: true,
        functionUseDoesNotLicenseObjectSlots: true,
        functionUseValenceGate: gate,
        objectSlotOwnership: {
          kind: "adverbial-nuclear-function-object-slot-ownership-frame",
          matrixValence: String(sourceValency || ""),
          matrixValenceFrameFixed,
          matrixValenceFrameMustBeFixedBeforeObjectSlotOwnership: true,
          routeFrameOwnsObjectSlotLicensing: matrixValenceFrameFixed,
          routeFrameLicensesObjectSlotOwnership: matrixValenceFrameFixed,
          sourceExternalObjectSlots: sourceExternalObjectSlots.map(slot => ({
            ...slot
          })),
          remainingExternalObjectSlots: remainingExternalObjectSlots.map(slot => ({
            ...slot
          })),
          consumedObjectSlot: "",
          consumedObjectSlotOwnedBy: "none",
          sourceExternalObjectSlotsOwnedBy: sourceExternalObjectSlots.length ? "source-valence-frame" : "none",
          remainingExternalObjectSlotsOwnedBy: remainingExternalObjectSlots.length ? "matrix-route-frame" : "none",
          functionUseOwnsObjectSlots: false,
          finalFormulaShapeOwnsObjectSlots: false,
          functionUseMayAnnotateLicensedReadingsOnly: true
        }
      };
    }
    function buildGeneratedPlaceGentilicNncBoundaryFrameMetadata({
      nominalKind = "",
      renderVerb = "",
      verb = "",
      analysisVerb = "",
      nominalizationProfile = null
    } = {}) {
      if (nominalKind !== "locativo-temporal") {
        return null;
      }
      const sourceStem = String(analysisVerb || verb || renderVerb || "");
      const sourceTense = String(nominalizationProfile?.source?.sourceTense || "imperfecto");
      const classification = typeof targetObject.classifyPlaceGentilicNncCandidate === "function" ? targetObject.classifyPlaceGentilicNncCandidate({
        candidate: String(renderVerb || verb || ""),
        placeNameSource: "",
        gentilicSource: "",
        placeGentilicKind: "place-name",
        associatedPlace: "",
        collectivity: "",
        falsePositiveSource: "locative-temporal-nominal",
        sourceKind: "generated-verb-derived-nominal"
      }) : null;
      return {
        kind: "place-gentilic-nnc-boundary-frame",
        version: 1,
        lesson: 48,
        source: NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
        diagnosticOnly: true,
        doesNotGenerateForms: true,
        statusLabel: "no confirmado",
        candidate: {
          nominalKind,
          kindLabel: "locativo-temporal generado",
          placeGentilicKind: "place-name",
          sourceVnc: sourceStem,
          sourceTense,
          sourceKind: "generated-verb-derived-nominal"
        },
        classification: classification ? {
          kind: classification.kind,
          placeGentilicKind: classification.placeGentilicKind,
          falsePositiveSource: classification.falsePositiveSource,
          confirmed: classification.confirmed === true,
          generationAllowed: classification.generationAllowed === true,
          diagnostics: Array.isArray(classification.diagnostics) ? Array.from(classification.diagnostics) : []
        } : null,
        boundaries: {
          isGenerationRule: false,
          changesSurfaceForms: false,
          noPlaceNameNncGeneration: true,
          noGentilicNncGeneration: true,
          locativeTemporalNominalIsEvidence: false,
          noStaticPlaceOrGentilicFixture: true
        }
      };
    }
    function buildGeneratedAdverbialAdjunctionBoundaryFrameMetadata({
      resolvedTenseMode = "",
      tense = "",
      nominalKind = "",
      renderVerb = "",
      verb = "",
      analysisVerb = "",
      sourceTense = ""
    } = {}) {
      const isConfiguredAdverbio = resolvedTenseMode === targetObject.TENSE_MODE.adverbio && tense === "pasado-remoto-adverbio-activo";
      const isLocativoTemporal = nominalKind === "locativo-temporal";
      if (!isConfiguredAdverbio && !isLocativoTemporal) {
        return null;
      }
      const sourceStem = String(analysisVerb || verb || renderVerb || "");
      const semanticRelation = isConfiguredAdverbio ? "manner" : "place";
      const adjoinedUnitType = isConfiguredAdverbio ? "vnc" : "nnc";
      const falsePositiveSource = isConfiguredAdverbio ? "configured-adverbio-surface" : "single-generated-word";
      const candidateLabel = isConfiguredAdverbio ? "adverbio heredado" : "locativo-temporal generado";
      const classification = typeof targetObject.classifyAdverbialAdjunctionCandidate === "function" ? targetObject.classifyAdverbialAdjunctionCandidate({
        principalClause: "",
        adjoinedUnit: candidateLabel,
        candidate: String(renderVerb || verb || ""),
        semanticRelation,
        adjoinedUnitType,
        marking: "",
        falsePositiveSource
      }) : null;
      return {
        kind: "adverbial-adjunction-boundary-frame",
        version: 1,
        lessonRange: "49-50",
        source: NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
        diagnosticOnly: true,
        doesNotGenerateForms: true,
        statusLabel: "no confirmada",
        candidate: {
          label: candidateLabel,
          sourceVnc: sourceStem,
          sourceTense: String(sourceTense || tense || ""),
          semanticRelation,
          adjoinedUnitType,
          falsePositiveSource
        },
        classification: classification ? {
          kind: classification.kind,
          semanticRelation: classification.semanticRelation,
          adjoinedUnitType: classification.adjoinedUnitType,
          falsePositiveSource: classification.falsePositiveSource,
          confirmed: classification.confirmed === true,
          generationAllowed: classification.generationAllowed === true,
          diagnostics: Array.isArray(classification.diagnostics) ? Array.from(classification.diagnostics) : []
        } : null,
        boundaries: {
          isGenerationRule: false,
          changesSurfaceForms: false,
          noClauseAdjunctionAst: true,
          singleGeneratedWordIsEvidence: false,
          noStaticAdjunctionData: true
        }
      };
    }
    function buildGeneratedNominalNum1Num2Metadata({
      subjectSuffix = "",
      nominalKind = "",
      possessivePrefix = "",
      source = NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
      sourceTense = "",
      sourceCombinedMode = "",
      actionNounStemUse = "",
      patientivoSource = "",
      patientiveSourceStageFrame = null,
      patientiveMultipleDerivationContract = null,
      renderVerb = "",
      verb = "",
      analysisVerb = "",
      sourceStem = "",
      subjectPrefix = "",
      sourceSubjectPrefix = "",
      sourceSubjectSuffix = "",
      formulaDisplayStem = "",
      instrumentivoImperfectActiveAbsolutiveException = null
    } = {}) {
      const resolvedFormulaDisplayStem = String(formulaDisplayStem || "") || buildGeneratedPreteritAgentiveFormulaDisplayStem({
        nominalKind,
        stem: verb || renderVerb || analysisVerb || sourceStem || "",
        possessivePrefix
      });
      const connector = typeof targetObject.buildNominalNum1Num2 === "function" ? targetObject.buildNominalNum1Num2({
        subjectSuffix,
        nominalKind,
        predicateState: "derived-nominal",
        source
      }) : {
        version: 1,
        role: "subject-number-connector",
        slot: "subject.num1-num2",
        belongsTo: "subject",
        surface: String(subjectSuffix || ""),
        displaySurface: String(subjectSuffix || "") || "Ø",
        nominalKind: String(nominalKind || ""),
        predicateState: "derived-nominal",
        source,
        notNounSuffix: true,
        notStatePosition: true
      };
      const hasPossessor = Boolean(possessivePrefix);
      const predicateStateSlot = {
        role: "predicate-state",
        slot: "predicate.state",
        state: hasPossessor ? "possessive" : "absolutive",
        statePosition: hasPossessor ? "possessor" : "vacant",
        isVacant: !hasPossessor,
        hasPossessor,
        participantRole: hasPossessor ? "possessor" : "",
        possessorPrefix: possessivePrefix || "",
        notSubjectConnector: true,
        notTense: true
      };
      const nominalizationProfile = typeof targetObject.buildVerbDerivedNominalizationProfile === "function" ? targetObject.buildVerbDerivedNominalizationProfile({
        nominalKind,
        sourceTense,
        sourceModel: sourceCombinedMode || actionNounStemUse ? {
          matrixBase: analysisVerb || verb || renderVerb || "",
          sourceRawVerb: renderVerb || verb || analysisVerb || "",
          analysisVerb: analysisVerb || verb || "",
          combinedMode: sourceCombinedMode,
          actionNounStemUse,
          sourceSubjectPrefix: sourceSubjectPrefix || subjectPrefix,
          sourceSubjectSuffix
        } : null,
        predicateStateSlot,
        num1Num2: connector,
        patientivoSource,
        patientiveSourceStageFrame,
        patientiveMultipleDerivationContract,
        sourceStem: sourceStem || analysisVerb || verb || renderVerb || resolvedFormulaDisplayStem || ""
      }) : null;
      return {
        num1Num2: connector,
        nominalizationProfile,
        placeGentilicNncBoundaryFrame: buildGeneratedPlaceGentilicNncBoundaryFrameMetadata({
          nominalKind,
          renderVerb,
          verb,
          analysisVerb,
          nominalizationProfile
        }),
        adverbialAdjunctionBoundaryFrame: buildGeneratedAdverbialAdjunctionBoundaryFrameMetadata({
          nominalKind,
          renderVerb,
          verb,
          analysisVerb,
          sourceTense
        }),
        formulaDisplayStem: resolvedFormulaDisplayStem,
        nominalClauseFrame: {
          version: 1,
          clauseKind: "nominal-nuclear-clause",
          predicateKind: String(nominalKind || ""),
          hasTensePosition: false,
          tense: null,
          subject: {
            numberConnector: connector,
            numberConnectors: [connector]
          },
          predicate: {
            kind: String(nominalKind || ""),
            state: predicateStateSlot.state,
            stateSlot: predicateStateSlot
          },
          stateSlot: predicateStateSlot
        },
        instrumentivoImperfectActiveAbsolutiveException
      };
    }
    function enrichGeneratedNominalClauseMetadataWithAndrewsRendering({
      nominalClauseMetadata = null,
      nuclearClauseShell = null,
      surfaceForms = [],
      cnvFormulaSurfacePath = null,
      andrewsSourceFormulaEcho = ""
    } = {}) {
      const profile = nominalClauseMetadata?.nominalizationProfile || null;
      const frame = profile?.operationalSuboperationFrame || null;
      if (!nominalClauseMetadata || !profile || !frame || typeof frame !== "object") {
        return nominalClauseMetadata;
      }
      const targetFormulaEcho = String(nuclearClauseShell?.formulaEcho || "").trim();
      if (!targetFormulaEcho) {
        return nominalClauseMetadata;
      }
      const surfaces = Array.isArray(surfaceForms) ? surfaceForms.map(entry => String(entry || "").trim()).filter(Boolean) : [];
      const sourceStem = String(frame.source?.stem || frame.sourceStem || "").trim();
      const formulaSurfacePairs = buildGeneratedNominalFormulaSurfacePairs({
        frame,
        nuclearClauseShell,
        cnvFormulaSurfacePath,
        surfaceForms: surfaces,
        sourceFormulaEcho: andrewsSourceFormulaEcho
      });
      const sourceFormulaEcho = formulaSurfacePairs[0]?.sourceFormulaEcho || frame.sourceFormulaEcho || `CNV(${sourceStem || "SOURCE_CORE"})`;
      const sourceToTargetFormulaEcho = formulaSurfacePairs.length ? formulaSurfacePairs.map(entry => entry.sourceToTargetFormulaEcho).join(" | ") : `${sourceFormulaEcho} -> ${targetFormulaEcho}`;
      const renderedFrame = Object.freeze({
        ...frame,
        sourceFormulaEcho,
        targetFormulaEcho,
        targetFormulaEchoes: formulaSurfacePairs.map(entry => entry.targetFormulaEcho),
        renderedFormulaEcho: targetFormulaEcho,
        sourceToTargetFormulaEcho,
        routeFormulaEcho: sourceToTargetFormulaEcho,
        formulaEcho: sourceToTargetFormulaEcho,
        surface: surfaces[0] || frame.surface || "",
        surfaceForms: surfaces.length ? surfaces : Array.isArray(frame.surfaceForms) ? frame.surfaceForms.slice() : [],
        formulaSurfacePairs
      });
      return {
        ...nominalClauseMetadata,
        nominalizationProfile: Object.freeze({
          ...profile,
          operationalSuboperationFrame: renderedFrame
        })
      };
    }
    function buildGeneratedPreteritAgentiveFormulaStem(stem = "", {
      generalUse = false
    } = {}) {
      const value = String(stem || "").trim();
      if (!value) {
        return "";
      }
      if (/-0(?:-|$)/.test(value)) {
        return value;
      }
      if (generalUse && value.endsWith("ka")) {
        return joinGeneratedNominalStemFormulaPieces({
          stemCore: value.slice(0, -2),
          stemSuffixes: ["0", "ka"]
        });
      }
      return joinGeneratedNominalStemFormulaPieces({
        stemCore: value,
        stemSuffixes: ["0"]
      });
    }
    function buildGeneratedPreteritAgentiveFormulaDisplayStem({
      nominalKind = "",
      stem = "",
      possessivePrefix = ""
    } = {}) {
      if (String(nominalKind || "") !== "agentivo-preterito") {
        return "";
      }
      return buildGeneratedPreteritAgentiveFormulaStem(stem, {
        generalUse: Boolean(possessivePrefix)
      });
    }
    function joinGeneratedNominalStemFormulaPieces({
      objectPrefix = "",
      stemCore = "",
      stemSuffixes = []
    } = {}) {
      const core = String(stemCore || "").trim();
      const object = String(objectPrefix || "").trim();
      const base = object && core ? `${object}-${core}` : object || core;
      return [base, ...(Array.isArray(stemSuffixes) ? stemSuffixes : [])].map(piece => String(piece || "").trim()).filter(Boolean).join("-");
    }
    function buildGeneratedNominalMorphFormulaFrame({
      tense = "",
      sourcePredicateStem = "",
      parsedVerb = null,
      existingFormulaDisplayStem = "",
      sourceSubjectSuffix = ""
    } = {}) {
      const existingStem = String(existingFormulaDisplayStem || "").trim();
      if (existingStem) {
        return Object.freeze({
          kind: "generated-nominal-morph-formula-frame",
          version: 1,
          authorizationStatus: "authorized",
          blockReason: "",
          operation: String(tense || ""),
          sourcePredicateStem: String(sourcePredicateStem || "").trim(),
          predicateFormulaStem: existingStem,
          numberConnector: "",
          connectorOverrideRequired: false,
          formulaProjectionSource: "typed-nominal-morphology-metadata",
          formulaDerivedFromWrittenProjection: false,
          writtenDerivedFromFormulaProjection: false,
          writtenCarrierParsingAllowed: false
        });
      }
      const compoundAst = parsedVerb?.compoundAst;
      const typedCompoundParts =
        compoundAst?.kind === "compound"
          ? [
            ...(Array.isArray(compoundAst.embeds)
              ? compoundAst.embeds.map(
                embed => String(embed?.value || "").trim()
              )
              : []),
            String(compoundAst.matrix?.stem || "").trim()
          ].filter(Boolean)
          : [];
      const typedSourceStem = typedCompoundParts.length
        ? typedCompoundParts.join("-")
        : String(sourcePredicateStem || "").trim();
      const normalizedTense = String(tense || "");
      const customaryAgentive = normalizedTense === "agentivo";
      const preteritAdjectival = normalizedTense === "adjetivo-preterito";
      if (!typedSourceStem || (!customaryAgentive && !preteritAdjectival)) {
        return null;
      }
      const predicateFormulaStem = customaryAgentive
        ? joinGeneratedNominalStemFormulaPieces({
          stemCore: typedSourceStem,
          stemSuffixes: ["ni"]
        })
        : joinGeneratedNominalStemFormulaPieces({
          stemCore: typedSourceStem,
          stemSuffixes: ["Ø"]
        });
      const pluralSubject = ["h", "eh"].includes(
        String(sourceSubjectSuffix || "")
      );
      const numberConnector = customaryAgentive
        ? "Ø-Ø"
        : pluralSubject
          ? "qu-eh"
          : "c-Ø";
      return Object.freeze({
        kind: "generated-nominal-morph-formula-frame",
        version: 1,
        authorizationStatus: "authorized",
        blockReason: "",
        operation: normalizedTense,
        sourcePredicateStem: typedSourceStem,
        sourceCompoundParts: Object.freeze(typedCompoundParts),
        predicateFormulaStem,
        numberConnector,
        connectorOverrideRequired: true,
        formulaProjectionSource:
          "typed-source-plus-licensed-nominal-morphology-operation",
        formulaDerivedFromWrittenProjection: false,
        writtenDerivedFromFormulaProjection: false,
        writtenCarrierParsingAllowed: false
      });
    }
    function normalizeGeneratedNominalFormulaPathSource(pathRecord = null, {
      frame = null,
      nuclearClauseShell = null
    } = {}) {
      void pathRecord;
      if (!nuclearClauseShell || typeof nuclearClauseShell !== "object") {
        return null;
      }
      const formulaSlots = nuclearClauseShell?.formulaSlots && typeof nuclearClauseShell.formulaSlots === "object" ? nuclearClauseShell.formulaSlots : {};
      const subject = formulaSlots.pers1Pers2 || {};
      const predicate = formulaSlots.predicateStem || {};
      const connector = formulaSlots.num1Num2 || {};
      const canonicalFormula = String(nuclearClauseShell.formulaEcho || "").trim();
      const subjectPrefix = String(subject.displayPrefix || subject.prefix || "Ø") || "Ø";
      const subjectCase = String(subject.displaySuffix || subject.suffix || "Ø") || "Ø";
      const predicateStem = String(
        predicate.formulaDisplayStem
        || predicate.displayStem
        || predicate.stem
        || ""
      );
      const numberConnector = String(
        connector.displayConnector
        || connector.displayDyad
        || connector.connector
        || "Ø"
      ) || "Ø";
      const possessorPrefix = String(predicate.stateSlot?.possessorPrefix || "");
      const operationId = String(frame?.operationId || "");
      const family = String(frame?.family || "");
      const nominalKind = String(frame?.nominalKind || "");
      if (!canonicalFormula || !predicateStem) {
        return null;
      }
      return {
        formulaSlots,
        canonicalFormula,
        subjectPrefix,
        subjectCase,
        predicateStem,
        numberConnector,
        possessorPrefix,
        operationId,
        family,
        nominalKind,
        preteritAgentiveNominalFrame: family === "preterit-agentive" && nominalKind === "agentivo-preterito",
        typedMorphResultFrame: nuclearClauseShell.typedMorphResultFrame || null,
        formulaProjectionSource: "typed-nuclear-clause-shell",
        formulaDerivedFromSurfacePath: false,
        writtenCarrierParsingAllowed: false
      };
    }
    function getGeneratedNominalFormulaSourceSignature(source = null) {
      if (!source || typeof source !== "object") {
        return "";
      }
      return JSON.stringify({
        canonicalFormula: source.canonicalFormula || "",
        formulaSlots: source.formulaSlots || {},
        subjectPrefix: source.subjectPrefix || "",
        subjectCase: source.subjectCase || "",
        predicateStem: source.predicateStem || "",
        numberConnector: source.numberConnector || "",
        possessorPrefix: source.possessorPrefix || "",
        operationId: source.operationId || "",
        family: source.family || "",
        nominalKind: source.nominalKind || "",
        preteritAgentiveNominalFrame: source.preteritAgentiveNominalFrame === true,
        typedMorphSemanticIdentity: source.typedMorphResultFrame?.semanticIdentity || "",
        formulaProjectionSource: source.formulaProjectionSource || "",
        formulaDerivedFromSurfacePath: source.formulaDerivedFromSurfacePath === true,
        writtenCarrierParsingAllowed: source.writtenCarrierParsingAllowed === true
      });
    }
    function buildGeneratedNominalFormulaSourceFrame(pathRecord = null, {
      frame = null,
      nuclearClauseShell = null
    } = {}) {
      const source = normalizeGeneratedNominalFormulaPathSource(pathRecord, {
        frame,
        nuclearClauseShell
      });
      if (!source) {
        return null;
      }
      const sourceSignature = getGeneratedNominalFormulaSourceSignature(source);
      return Object.freeze({
        kind: "generated-nominal-formula-source-frame",
        routeId: "generated-nominal-formula-render",
        formulaSchemaId: "nominal-nuclear-clause",
        formulaSlots: source.formulaSlots,
        canonicalFormula: source.canonicalFormula,
        subjectPrefix: source.subjectPrefix,
        subjectCase: source.subjectCase,
        predicateStem: source.predicateStem,
        numberConnector: source.numberConnector,
        possessorPrefix: source.possessorPrefix,
        operationId: source.operationId,
        family: source.family,
        nominalKind: source.nominalKind,
        preteritAgentiveNominalFrame: source.preteritAgentiveNominalFrame,
        typedMorphResultFrame: source.typedMorphResultFrame,
        formulaProjectionSource: source.formulaProjectionSource,
        formulaDerivedFromSurfacePath: false,
        writtenCarrierParsingAllowed: false,
        sourceSignature,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
        displayOnlyFieldsExcluded: Object.freeze(["formulaEcho", "result", "surface", "surfaceForms"])
      });
    }
    function buildGeneratedNominalFormulaOperationFrame(sourceFrame = null) {
      if (!sourceFrame || sourceFrame.kind !== "generated-nominal-formula-source-frame") {
        return null;
      }
      const subjectPrefix = String(sourceFrame.subjectPrefix || "Ø") || "Ø";
      const subjectCase = String(sourceFrame.subjectCase || "Ø") || "Ø";
      const targetFormulaEcho = String(sourceFrame.canonicalFormula || "");
      const targetStem = String(sourceFrame.predicateStem || "");
      const connector = String(sourceFrame.numberConnector || "Ø") || "Ø";
      const statePrefix = sourceFrame.possessorPrefix ? `+${sourceFrame.possessorPrefix}` : "";
      const branch = sourceFrame.preteritAgentiveNominalFrame === true
        ? "preterit-agentive-nominal-formula"
        : "generated-nominal-formula";
      if (!targetFormulaEcho || !targetStem) {
        return null;
      }
      return Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: "generated-nominal-formula-render",
        routeId: "generated-nominal-formula-render",
        branch,
        sourceFrameKind: sourceFrame.kind,
        sourceSignature: sourceFrame.sourceSignature || "",
        targetFrame: Object.freeze({
          kind: "generated-nominal-formula-target-frame",
          formula: targetFormulaEcho,
          subjectPrefix,
          subjectCase,
          statePrefix,
          targetStem,
          connector,
          projectionSource: "typed-nuclear-clause-shell",
          derivedFromSurfacePath: false
        }),
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
        formulaDerivedFromSurfacePath: false,
        writtenCarrierParsingAllowed: false,
        displayOnlyFieldsExcluded: Object.freeze(["formulaEcho", "result", "surface", "surfaceForms"])
      });
    }
    function getGeneratedNominalFormulaFrameMismatch({
      pathRecord = null,
      frame = null,
      nuclearClauseShell = null,
      sourceFrame = null,
      operationFrame = null
    } = {}) {
      const rebuiltSourceFrame = buildGeneratedNominalFormulaSourceFrame(pathRecord, {
        frame,
        nuclearClauseShell
      });
      if (!rebuiltSourceFrame || !sourceFrame || sourceFrame.kind !== "generated-nominal-formula-source-frame") {
        return "generated-nominal-formula-source-frame-required";
      }
      if (String(rebuiltSourceFrame.sourceSignature || "") !== String(sourceFrame.sourceSignature || "")) {
        return "generated-nominal-formula-contradictory-source-frame";
      }
      if (!operationFrame || operationFrame.kind !== "andrews-typed-operation-frame" || operationFrame.operationId !== "generated-nominal-formula-render" || operationFrame.consumesRenderedInput !== false || operationFrame.displayStringsAuthorizeGrammar !== false || operationFrame.formulaDerivedFromSurfacePath !== false || operationFrame.writtenCarrierParsingAllowed !== false || String(operationFrame.sourceSignature || "") !== String(sourceFrame.sourceSignature || "")) {
        return "generated-nominal-formula-operation-frame-required";
      }
      const rebuiltOperationFrame = buildGeneratedNominalFormulaOperationFrame(sourceFrame);
      if (!operationFrame.targetFrame || !rebuiltOperationFrame?.targetFrame) {
        return "generated-nominal-formula-target-frame-required";
      }
      if (JSON.stringify(operationFrame.targetFrame) !== JSON.stringify(rebuiltOperationFrame.targetFrame)) {
        return "generated-nominal-formula-contradictory-target-frame";
      }
      return "";
    }
    function buildGeneratedNominalFormulaFromSurfacePath(pathRecord = null, {
      frame = null,
      nuclearClauseShell = null,
      sourceFrame = null,
      operationFrame = null
    } = {}) {
      const mismatch = getGeneratedNominalFormulaFrameMismatch({
        pathRecord,
        frame,
        nuclearClauseShell,
        sourceFrame,
        operationFrame
      });
      if (mismatch) {
        return "";
      }
      return String(operationFrame?.targetFrame?.formula || "");
    }
    function buildGeneratedNominalFormulaFromSource(pathRecord = null, {
      frame = null,
      nuclearClauseShell = null
    } = {}) {
      const sourceFrame = buildGeneratedNominalFormulaSourceFrame(pathRecord, {
        frame,
        nuclearClauseShell
      });
      const operationFrame = buildGeneratedNominalFormulaOperationFrame(sourceFrame);
      return buildGeneratedNominalFormulaFromSurfacePath(pathRecord, {
        frame,
        nuclearClauseShell,
        sourceFrame,
        operationFrame
      });
    }
    function buildGeneratedNominalFormulaSurfacePairs({
      frame = null,
      nuclearClauseShell = null,
      cnvFormulaSurfacePath = null,
      surfaceForms = [],
      sourceFormulaEcho = ""
    } = {}) {
      const sourceStem = String(frame?.source?.stem || frame?.sourceStem || "").trim() || "SOURCE_CORE";
      const resolvedSourceFormulaEcho = String(sourceFormulaEcho || frame?.sourceFormulaEcho || "").trim() || `CNV(${sourceStem})`;
      const records = Array.isArray(cnvFormulaSurfacePath?.pathsBySurface) ? cnvFormulaSurfacePath.pathsBySurface : [];
      const pairs = records.map(record => {
        const surface = String(record?.surface || "").trim();
        const nominalFormulaSourceFrame = buildGeneratedNominalFormulaSourceFrame(record, {
          frame,
          nuclearClauseShell
        });
        const nominalFormulaOperationFrame = buildGeneratedNominalFormulaOperationFrame(nominalFormulaSourceFrame);
        const targetFormulaEcho = buildGeneratedNominalFormulaFromSurfacePath(record, {
          frame,
          nuclearClauseShell,
          sourceFrame: nominalFormulaSourceFrame,
          operationFrame: nominalFormulaOperationFrame
        });
        if (!surface || !targetFormulaEcho) {
          return null;
        }
        const pair = {
          surface,
          sourceFormulaEcho: resolvedSourceFormulaEcho,
          andrewsFormulaEcho: resolvedSourceFormulaEcho,
          targetFormulaEcho,
          conjugatorFormulaEcho: targetFormulaEcho,
          sourceToTargetFormulaEcho: `${resolvedSourceFormulaEcho} -> ${targetFormulaEcho}`,
          andrewsToConjugatorFormulaEcho: `${resolvedSourceFormulaEcho} -> ${targetFormulaEcho}`
        };
        Object.defineProperties(pair, {
          nominalFormulaSourceFrame: {
            enumerable: false,
            value: nominalFormulaSourceFrame
          },
          nominalFormulaOperationFrame: {
            enumerable: false,
            value: nominalFormulaOperationFrame
          }
        });
        return Object.freeze(pair);
      }).filter(Boolean);
      if (pairs.length) {
        return Object.freeze(pairs);
      }
      const fallbackTargetFormulaEcho = String(nuclearClauseShell?.formulaEcho || "").trim();
      return Object.freeze((Array.isArray(surfaceForms) ? surfaceForms : []).map(surface => String(surface || "").trim()).filter(Boolean).map(surface => Object.freeze({
        surface,
        sourceFormulaEcho: resolvedSourceFormulaEcho,
        andrewsFormulaEcho: resolvedSourceFormulaEcho,
        targetFormulaEcho: fallbackTargetFormulaEcho,
        conjugatorFormulaEcho: fallbackTargetFormulaEcho,
        sourceToTargetFormulaEcho: `${resolvedSourceFormulaEcho} -> ${fallbackTargetFormulaEcho}`,
        andrewsToConjugatorFormulaEcho: `${resolvedSourceFormulaEcho} -> ${fallbackTargetFormulaEcho}`
      })));
    }
    function normalizeGeneratedOutputResultTextRecords(records = []) {
      return (Array.isArray(records) ? records : []).map((record, index) => ({
        kind: "generated-output-result-text-record-frame",
        index,
        surface: String(record?.surface || "").trim(),
        segmentFrames: normalizeCnvSurfacePathSegments(record?.segments || []).map((segment, segmentIndex) => ({
          kind: "generated-output-result-text-segment-frame",
          index: segmentIndex,
          role: String(segment?.role || ""),
          slot: String(segment?.slot || ""),
          value: String(segment?.value || "")
        }))
      })).filter(record => record.surface);
    }
    function getGeneratedOutputResultTextSourceSignature(sourceFrame = null) {
      if (!sourceFrame || typeof sourceFrame !== "object") {
        return "";
      }
      return JSON.stringify({
        sourceForms: Array.isArray(sourceFrame.sourceForms) ? sourceFrame.sourceForms : [],
        outputSurfaceRecordFrames: (Array.isArray(sourceFrame.outputSurfaceRecordFrames) ? sourceFrame.outputSurfaceRecordFrames : []).map(record => ({
          surface: record.surface || "",
          segmentFrames: record.segmentFrames || []
        }))
      });
    }
    function buildGeneratedOutputResultTextSourceFrame({
      surfaceForms = [],
      outputSurfaceRecords = []
    } = {}) {
      const sourceForms = (Array.isArray(surfaceForms) ? surfaceForms : []).map(form => String(form || "").trim()).filter(Boolean);
      const outputSurfaceRecordFrames = normalizeGeneratedOutputResultTextRecords(outputSurfaceRecords);
      const targetSurfaceForms = outputSurfaceRecordFrames.map(record => record.surface).filter((surface, index, list) => surface && list.indexOf(surface) === index);
      const sourceFormsMatchRecords = sourceForms.length === targetSurfaceForms.length && sourceForms.every((form, index) => form === targetSurfaceForms[index]);
      const diagnostics = [];
      if (!sourceForms.length) {
        diagnostics.push("missing-generated-output-surface-forms");
      }
      if (!outputSurfaceRecordFrames.length) {
        diagnostics.push("missing-generated-output-surface-records");
      }
      if (sourceForms.length && outputSurfaceRecordFrames.length && !sourceFormsMatchRecords) {
        diagnostics.push("generated-output-surface-record-mismatch");
      }
      const sourceFrame = {
        kind: "generated-output-result-text-source-frame",
        routeId: "generated-output-result-text-render",
        sourceForms,
        outputSurfaceRecordFrames,
        supported: sourceForms.length > 0 && outputSurfaceRecordFrames.length > 0 && sourceFormsMatchRecords,
        diagnostics,
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
        displayOnlyFieldsExcluded: ["formulaEcho", "result", "surface", "surfaceForms"]
      };
      return Object.freeze({
        ...sourceFrame,
        sourceSignature: getGeneratedOutputResultTextSourceSignature(sourceFrame)
      });
    }
    function buildGeneratedOutputResultTextOperationFrame(sourceFrame = null) {
      if (!sourceFrame || sourceFrame.kind !== "generated-output-result-text-source-frame") {
        return null;
      }
      const targetSurfaceForms = (Array.isArray(sourceFrame.outputSurfaceRecordFrames) ? sourceFrame.outputSurfaceRecordFrames : []).map(record => String(record?.surface || "").trim()).filter(Boolean);
      const targetFrame = {
        kind: "generated-output-result-text-target-frame",
        surfaceForms: targetSurfaceForms,
        resultText: targetSurfaceForms.join(" / ")
      };
      return Object.freeze({
        kind: "andrews-typed-operation-frame",
        operationId: "generated-output-result-text-render",
        routeId: "generated-output-result-text-render",
        sourceFrameKind: sourceFrame.kind,
        sourceSignature: sourceFrame.sourceSignature || "",
        targetFrame: Object.freeze(targetFrame),
        supported: sourceFrame.supported === true && targetSurfaceForms.length > 0,
        diagnostics: sourceFrame.supported === true ? [] : ["unsupported-generated-output-result-text-source-frame"],
        consumesRenderedInput: false,
        displayStringsAuthorizeGrammar: false,
        displayOnlyFieldsExcluded: Object.freeze(["formulaEcho", "result", "surface", "surfaceForms"])
      });
    }
    function validateGeneratedOutputResultTextOperationFrame({
      surfaceForms = [],
      outputSurfaceRecords = [],
      sourceFrame = null,
      operationFrame = null
    } = {}) {
      const rebuiltSourceFrame = buildGeneratedOutputResultTextSourceFrame({
        surfaceForms,
        outputSurfaceRecords
      });
      if (!sourceFrame || sourceFrame.kind !== "generated-output-result-text-source-frame" || String(sourceFrame.sourceSignature || "") !== String(rebuiltSourceFrame.sourceSignature || "") || !operationFrame || operationFrame.kind !== "andrews-typed-operation-frame" || operationFrame.operationId !== "generated-output-result-text-render" || operationFrame.supported !== true || operationFrame.consumesRenderedInput !== false || operationFrame.displayStringsAuthorizeGrammar !== false || String(operationFrame.sourceSignature || "") !== String(sourceFrame.sourceSignature || "")) {
        return null;
      }
      const rebuiltOperationFrame = buildGeneratedOutputResultTextOperationFrame(sourceFrame);
      if (!operationFrame.targetFrame || !rebuiltOperationFrame?.targetFrame || JSON.stringify(operationFrame.targetFrame) !== JSON.stringify(rebuiltOperationFrame.targetFrame)) {
        return null;
      }
      return operationFrame.targetFrame;
    }
    function buildGeneratedOutputResultText(surfaceForms = [], options = {}) {
      const targetFrame = validateGeneratedOutputResultTextOperationFrame({
        surfaceForms,
        outputSurfaceRecords: options?.outputSurfaceRecords || [],
        sourceFrame: options?.sourceFrame || null,
        operationFrame: options?.operationFrame || null
      });
      return targetFrame ? String(targetFrame.resultText || "") : "";
    }
    function executeNuclearClauseSurfaceRequest(request = {}) {
      let options = request?.options || {};
      if (typeof targetObject.Event !== "undefined" && options instanceof targetObject.Event) {
        options = {};
      }
      options = targetObject.sanitizeNuclearClauseSurfaceOptions(options);
      const silent = options.silent === true;
      const skipValidation = options.skipValidation === true;
      const override = options.override || null;
      const resolvedTenseMode = Object.values(targetObject.TENSE_MODE).includes(override?.tenseMode) ? override.tenseMode : targetObject.getActiveTenseMode();
      const resolvedDerivationMode = Object.values(targetObject.DERIVATION_MODE).includes(override?.derivationMode) ? override.derivationMode : targetObject.getActiveDerivationMode();
      const resolvedDerivationType = Object.values(targetObject.DERIVATION_TYPE).includes(override?.derivationType) ? override.derivationType : targetObject.getActiveDerivationType();
      const derivationValencyDelta = targetObject.getDerivationValencyDelta(resolvedDerivationType);
      const resolvedVoiceMode = Object.values(targetObject.VOICE_MODE).includes(override?.voiceMode) ? override.voiceMode : targetObject.getActiveVoiceMode();
      const preservePassiveSubject = override?.preservePassiveSubject === true;
      const allowPassiveObject = options.allowPassiveObject === true || override?.allowPassiveObject === true;
      let posicionesFormula = typeof targetObject.normalizeNuclearClauseSurfaceFormulaPositions === "function" ? targetObject.normalizeNuclearClauseSurfaceFormulaPositions(request?.posicionesFormula || override?.posicionesFormula || null, {}, {
        override
      }) : null;
      const entradasInternas = typeof targetObject.buildNuclearClauseSurfaceEntradasInternasFromPosicionesFormula === "function" ? targetObject.buildNuclearClauseSurfaceEntradasInternasFromPosicionesFormula(posicionesFormula) : {};
      let pers1 = entradasInternas.pers1 || "";
      let obj1 = entradasInternas.obj1 || "";
      let tronco = entradasInternas.tronco || "";
      let pers2 = entradasInternas.pers2 || entradasInternas.num2 || "";
      let poseedor = entradasInternas.poseedor || "";
      let pers1Slot = pers1;
      let obj1Slot = obj1;
      let troncoSlot = tronco;
      let pers2Slot = pers2;
      let poseedorSlot = poseedor;
      const inputPers1 = pers1;
      const inputPers2 = pers2;
      const entradaTronco = request?.entradaTronco && typeof request.entradaTronco === "object" ? request.entradaTronco : {};
      const tieneControlTronco = entradaTronco.tieneControlTronco === true;
      const valorTronco = String(entradaTronco.valorTronco || "");
      let entradaGrammarObject = (request?.entradaGrammarObject && typeof request.entradaGrammarObject === "object" ? request.entradaGrammarObject : null) || (entradaTronco.entradaGrammarObject && typeof entradaTronco.entradaGrammarObject === "object" ? entradaTronco.entradaGrammarObject : null) || (override?.entradaGrammarObject && typeof override.entradaGrammarObject === "object" ? override.entradaGrammarObject : null);
      const explicitEntradaGrammarObject = entradaGrammarObject;
      if (!entradaGrammarObject && typeof targetObject.buildCurrentRegexParseOperationFrameFromRawInput === "function" && typeof targetObject.buildEntradaGrammarObjectFromCurrentRegexParseOperationFrame === "function") {
        const entradaRawValue = String(valorTronco || troncoSlot || tronco || "");
        const entradaParseOperationFrame = targetObject.buildCurrentRegexParseOperationFrameFromRawInput(entradaRawValue);
        entradaGrammarObject = targetObject.buildEntradaGrammarObjectFromCurrentRegexParseOperationFrame(entradaRawValue, entradaParseOperationFrame);
      }
      const clearError = resolveNuclearClauseSurfaceUiHook(request?.uiHooks, "clearError");
      const setError = resolveNuclearClauseSurfaceUiHook(request?.uiHooks, "setError");
      const onSearchQueryOnly = resolveNuclearClauseSurfaceUiHook(request?.uiHooks, "onSearchQueryOnly");
      const onValidationError = resolveNuclearClauseSurfaceUiHook(request?.uiHooks, "onValidationError");
      const onEntradaTroncoSync = resolveNuclearClauseSurfaceUiHook(request?.uiHooks, "onEntradaTroncoSync");
      const onAnalisisTroncoResuelto = resolveNuclearClauseSurfaceUiHook(request?.uiHooks, "onAnalisisTroncoResuelto");
      const onComplete = resolveNuclearClauseSurfaceUiHook(request?.uiHooks, "onComplete");
      const patientivoOwnership = override?.patientivoOwnership ?? targetObject.DEFAULT_PATIENTIVO_OWNERSHIP;
      const patientivoSource = override?.patientivoSource ?? "";
      const patientivoNominalSuffix = override?.patientivoNominalSuffix ?? null;
      const actionNounStemUse = String(override?.actionNounStemUse || "");
      const predicateNominalSourceTense = String(override?.predicateNominalSourceTense || "");
      let searchQuery = "";
      let hasSearchQuery = false;
      let hasSearchSeparator = false;
      if (!override?.tronco && tieneControlTronco) {
        const searchParts = targetObject.getSearchParts(troncoSlot);
        searchQuery = searchParts.query;
        hasSearchQuery = searchParts.trimmedQuery.length > 0;
        hasSearchSeparator = searchParts.hasQuery;
        const baseValue = targetObject.rememberNonSearchValue(searchParts);
        if (baseValue) {
          troncoSlot = searchParts.base;
        } else if (hasSearchQuery && targetObject.VerbInputState.lastNonSearchValue) {
          troncoSlot = targetObject.VerbInputState.lastNonSearchValue;
        }
        if (hasSearchQuery && !troncoSlot) {
          if (!silent) {
            onSearchQueryOnly({
              valorTronco
            });
          }
          return null;
        }
      }
      let tiempo = posicionesFormula?.tiempo || override?.tiempo || "";
      if (!tiempo) {
        const selectionState = targetObject.getCurrentResolvedConjugationSelectionState();
        tiempo = selectionState.group === targetObject.CONJUGATION_GROUPS.universal ? selectionState.universalTenseValue : selectionState.tenseValue;
      }
      let tense = normalizeNuclearClauseSurfaceTenseValue(tiempo);
      if (hasRetiredOrdinaryNncGenerationCarrier(override)) {
        return buildNuclearClauseSurfaceBlockedResult({
          result: {
            outputKind: "nominal-nuclear-clause",
            clauseKind: "nominal-nuclear-clause",
            supported: false,
            authorizationStatus: "blocked",
            blockReason:
              "retired-ordinary-nnc-generation-carrier-forbidden",
            callerSuppliedAuthorityAccepted: false,
            formulaStringAuthority: false,
            surfaceStringAuthority: false,
          },
          diagnosticId:
            "retired-ordinary-nnc-generation-carrier-forbidden",
          message:
            "Ordinary NNC generation requires the canonical typed NNC application.",
          routeFamily: "ordinary-nnc",
          routeStage: "retired-authority",
          override,
          verb: troncoSlot,
          pers1: pers1Slot,
          pers2: pers2Slot,
          poseedor: poseedorSlot,
          posicionesFormula,
          entradaGrammarObject,
          resolvedTenseMode,
          tense,
          resolvedDerivationMode,
          resolvedDerivationType,
          resolvedVoiceMode,
        });
      }
      const isTroncoNajActiveWrapperTense = targetObject.isPotencialTroncoNajActiveTense(tense);
      const isPatientivoAdjectiveProfile = targetObject.isPatientivoAdjectiveTense(tense);
      const isNominalOutputProfile = targetObject.isNominalMorphProfileTense(tense);
      const isPresentAgentivoNominalProfile = tense === "agentivo-presente";
      const isPreteritAgentivoNominalProfile = tense === "agentivo-preterito";
      const isFutureAgentivoNominalProfile = tense === "agentivo-futuro";
      if (targetObject.isPotencialProfileTense(tense) && tense !== "potencial") {
        poseedorSlot = "";
      }
      const overrideInstrumentivoMode = override?.instrumentivoMode === targetObject.INSTRUMENTIVO_MODE.posesivo ? targetObject.INSTRUMENTIVO_MODE.posesivo : override?.instrumentivoMode === targetObject.INSTRUMENTIVO_MODE.absolutivo ? targetObject.INSTRUMENTIVO_MODE.absolutivo : override?.instrumentivoMode === targetObject.INSTRUMENTIVO_MODE.absolutivoImperfectoActivo ? targetObject.INSTRUMENTIVO_MODE.absolutivoImperfectoActivo : "";
      if (tense === "instrumentivo" && overrideInstrumentivoMode === targetObject.INSTRUMENTIVO_MODE.posesivo && !poseedorSlot && typeof targetObject.resolveInstrumentivoPossessorPrefixFromSourceSubject === "function") {
        poseedorSlot = targetObject.resolveInstrumentivoPossessorPrefixFromSourceSubject(pers1Slot, pers2Slot);
      }
      if (tense === "calificativo-instrumentivo" && actionNounStemUse === "general-use" && !poseedorSlot && typeof targetObject.resolveClassicalPossessorPrefixFromSourceSubject === "function") {
        poseedorSlot = targetObject.resolveClassicalPossessorPrefixFromSourceSubject(pers1Slot, pers2Slot);
      }
      if (isPresentAgentivoNominalProfile) {
        poseedorSlot = "";
      }
      if (isPatientivoAdjectiveProfile) {
        poseedorSlot = "";
      }
      let baseObj1Slot = obj1Slot;
      let isReflexive = obj1Slot === "mo";
      let primaryFormSpec = null;
      let troncoRender = "";
      const returnGenerationValencyObjectSlotGateBlockedResult = (valencyObjectSlotGate, {
        routeFamily = "generation-valency",
        resultMarker = "—",
        verb = troncoSlot,
        renderVerb = troncoRender
      } = {}) => buildNuclearClauseSurfaceBlockedResult({
        result: {
          result: resultMarker,
          surfaceForms: [],
          generationAllowed: false,
          routeRankingAllowed: false,
          valencyObjectSlotGate
        },
        message: NUCLEAR_CLAUSE_SURFACE_NO_OUTPUT_MESSAGE,
        diagnosticId: valencyObjectSlotGate?.diagnosticId || "generation-valency-object-slot-frame-unfixed",
        routeFamily,
        routeStage: valencyObjectSlotGate?.routeStage || "generation-valency-object-slot-gate",
        resultMarker,
        override,
        resolvedTenseMode,
        tense,
        pers1: pers1Slot,
        pers2: pers2Slot,
        obj1: obj1Slot,
        poseedor: poseedorSlot,
        posicionesFormula,
        verb,
        renderVerb,
        entradaGrammarObject,
        isReflexive,
        resolvedDerivationMode,
        resolvedDerivationType,
        resolvedVoiceMode,
        enumerableContract: false
      });
      if (isTroncoNajActiveWrapperTense) {
        const troncoNajActiveWrapperSlotGate = typeof targetObject.buildGenerationValencyObjectSlotMutationGate === "function" ? targetObject.buildGenerationValencyObjectSlotMutationGate({
          operation: "apply-tronco-naj-active-wrapper-slot-clearing",
          mutationKind: "delete-object-slots",
          sourceObj1: obj1Slot,
          sourceBaseObj1: baseObj1Slot,
          sourceObj2: "",
          sourceObj3: "",
          targetObj1: "",
          targetBaseObj1: "",
          targetObj2: "",
          targetObj3: "",
          options: {
            entradaGrammarObject,
            requireFixedValenceFrame: true
          }
        }) : null;
        if (troncoNajActiveWrapperSlotGate?.status === "blocked") {
          return returnGenerationValencyObjectSlotGateBlockedResult(troncoNajActiveWrapperSlotGate);
        }
        obj1Slot = "";
      }
      baseObj1Slot = obj1Slot;
      isReflexive = obj1Slot === "mo";
      const returnError = (message, errorTargets = []) => {
        if (skipValidation) {
          return null;
        }
        errorTargets.forEach(target => setError(target));
        if (!silent) {
          onValidationError({
            tiempo: tense,
            obj1Base: baseObj1Slot
          });
        }
        return buildNuclearClauseSurfaceBlockedResult({
          result: {
            error: message
          },
          message,
          diagnosticId: "nuclear-clause-surface-validation-error",
          routeFamily: NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
          routeStage: "validate",
          resultMarker: null,
          override,
          resolvedTenseMode,
          tense,
          pers1: pers1Slot,
          pers2: pers2Slot,
          obj1: baseObj1Slot,
          poseedor: poseedorSlot,
          posicionesFormula,
          verb: troncoSlot,
          renderVerb: troncoRender,
          isReflexive,
          resolvedDerivationMode,
          resolvedDerivationType,
          resolvedVoiceMode,
          enumerableContract: false
        });
      };
      const returnIfError = (message, errorTargets = []) => {
        const error = returnError(message, errorTargets);
        return error || null;
      };
      if (resolvedTenseMode === targetObject.TENSE_MODE.verbo && !isNominalOutputProfile) {
        const hasCanonicalTenseAuthorityCapability =
          typeof targetObject.getAndrewsCnvTenseLogicAuthorityFrame === "function"
          && typeof targetObject.getAndrewsCnvTenseLogicGenerationGateFrame === "function";
        const andrewsCnvTenseLogicAuthorityFrame = hasCanonicalTenseAuthorityCapability
          ? targetObject.getAndrewsCnvTenseLogicAuthorityFrame(tense)
          : null;
        const andrewsCnvTenseLogicGenerationGate = hasCanonicalTenseAuthorityCapability
          ? targetObject.getAndrewsCnvTenseLogicGenerationGateFrame(tense)
          : null;
        if (andrewsCnvTenseLogicGenerationGate?.generationGate !== "andrews-licensed-generation") {
          const diagnosticId = hasCanonicalTenseAuthorityCapability
            ? andrewsCnvTenseLogicGenerationGate?.generationGate || "not-andrews-grammar-gate"
            : "canonical-cnv-tense-authority-capability-missing";
          const diagnosticMessage = "CNV finite output is blocked until Andrews licenses the tense slot as grammar logic; Classical/Classical surface evidence cannot authorize the gate.";
          return buildNuclearClauseSurfaceBlockedResult({
            result: {
              outputKind: "vnc",
              generationRoute: "vnc",
              clauseKind: "verbal-nuclear-clause",
              result: "—",
              surfaceForms: [],
              generationAllowed: false,
              routeRankingAllowed: false,
              andrewsCnvTenseLogicAuthorityFrame,
              andrewsCnvTenseLogicGenerationGate,
              diagnostics: [{
                id: diagnosticId,
                severity: "blocked",
                message: diagnosticMessage,
                tense,
                authority: andrewsCnvTenseLogicAuthorityFrame?.scope || "unknown",
                generationGate: diagnosticId
              }]
            },
            message: diagnosticMessage,
            diagnosticId,
            routeFamily: "vnc",
            routeStage: "andrews-cnv-tense-logic-gate",
            resultMarker: "—",
            override,
            resolvedTenseMode,
            tense,
            pers1: pers1Slot,
            pers2: pers2Slot,
            obj1: baseObj1Slot,
            poseedor: poseedorSlot,
            posicionesFormula,
            verb: troncoSlot,
            renderVerb: troncoRender,
            entradaGrammarObject,
            isReflexive,
            resolvedDerivationMode,
            resolvedDerivationType,
            resolvedVoiceMode,
            enumerableContract: false
          });
        }
      }
      if (tense === "patientivo" && !targetObject.normalizeVerbDerivedPatientiveFamily(patientivoSource)) {
        return buildNuclearClauseSurfaceBlockedResult({
          result: {
            result: "—",
            error: true,
            surfaceForms: [],
            generationAllowed: false,
            routeRankingAllowed: false,
            patientivoSourceRequired: true
          },
          message: "Patientivo requiere fuente explícita: pasivo, impersonal, perfectivo, imperfectivo o tronco verbal.",
          diagnosticId: "nuclear-clause-surface-patientivo-source-required",
          routeFamily: NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
          routeStage: "patientivo-source-gate",
          resultMarker: "—",
          override,
          resolvedTenseMode,
          tense,
          pers1: pers1Slot,
          pers2: pers2Slot,
          obj1: baseObj1Slot,
          poseedor: poseedorSlot,
          posicionesFormula,
          verb: troncoSlot,
          renderVerb: troncoRender,
          isReflexive,
          resolvedDerivationMode,
          resolvedDerivationType,
          resolvedVoiceMode,
          enumerableContract: false
        });
      }
      const buildActiveNuclearClauseSurfaceResult = ({
        pers1Slot: pers1SlotValue = "",
        obj1Slot: obj1SlotValue = "",
        pers2Slot: pers2SlotValue = "",
        troncoSlot: troncoSlotValue = "",
        verb: compatibilityVerbValue = "",
        trailingSuffix = "",
        directionalChainMeta = null,
        surfaceRuleMeta = null
      } = {}) => {
        const resolvedTroncoSlot = troncoSlotValue || compatibilityVerbValue;
        const usePossessivePrefix = tense === "sustantivo-verbal" || targetObject.isPotencialProfileTense(tense) || tense === "agentivo" || tense === "agentivo-presente" || tense === "agentivo-preterito" || tense === "agentivo-futuro" || tense === "patientivo" || tense === "instrumentivo" || targetObject.isPredicateNominalTense(tense) || tense === "calificativo-instrumentivo" || tense === "locativo-temporal";
        const preposedParticle = tense === "optativo" ? targetObject.getPers1Pers2Info(pers1SlotValue, pers2SlotValue)?.person === 2 ? "" : "ma " : "";
        const outputTextOptions = {
          particulaPrepuesta: preposedParticle,
          pers1: pers1SlotValue,
          poseedor: usePossessivePrefix ? poseedorSlot : "",
          obj1: obj1SlotValue,
          tronco: resolvedTroncoSlot,
          pers2: pers2SlotValue,
          hasOptionalSupportiveI: parsedVerb.hasOptionalSupportiveI === true,
          optionalSupportiveLetter: parsedVerb.optionalSupportiveLetter || "",
          directionalChainMeta,
          surfaceRuleMeta
        };
        const outputSurfaceResult = isNominalOutputProfile ? targetObject.buildNominalOutputResult({
          ...outputTextOptions,
          sufijoNominal: trailingSuffix
        }) : targetObject.buildOutputWordResult(outputTextOptions);
        collectGeneratedSurfaceSoundSpellingFrames(outputSurfaceResult);
        collectGeneratedOutputSurfaceRecord(outputSurfaceResult);
        return outputSurfaceResult;
      };
      const buildActiveNuclearClauseSurfaceText = (input = {}) => {
        const outputSurfaceResult = buildActiveNuclearClauseSurfaceResult(input);
        return outputSurfaceResult?.surface || "";
      };
      let appliedMorphology = null;
      const mergeSurfaceRuleMeta = (...metas) => {
        const merged = {};
        let hasMeta = false;
        metas.forEach(meta => {
          if (!meta || typeof meta !== "object") {
            return;
          }
          Object.assign(merged, meta);
          hasMeta = true;
        });
        return hasMeta ? merged : null;
      };
      const getCurrentSurfaceRuleMeta = () => mergeSurfaceRuleMeta(appliedMorphology?.surfaceRuleMeta);
      const generatedSurfaceSoundSpellingFrames = [];
      const generatedOutputSurfaceRecords = [];
      const getGeneratedSurfaceTextVariants = (surfaceSource = "") => {
        const surfaceRecord = surfaceSource && typeof surfaceSource === "object" ? surfaceSource : null;
        const sourceSegmentFrames = surfaceRecord ? normalizeCnvSurfacePathSegments(surfaceRecord.segments || []) : [];
        const normalizedSurface = String(surfaceRecord && sourceSegmentFrames.length ? sourceSegmentFrames.map(segment => String(segment?.value || "")).join("") : surfaceRecord ? surfaceRecord.surface || "" : surfaceSource || "").trim();
        if (!normalizedSurface) {
          return [];
        }
        let variants = [normalizedSurface];
        if (typeof targetObject.expandOptionalParentheticalForms === "function" && typeof targetObject.buildOptionalParentheticalFormsSourceFrame === "function" && typeof targetObject.buildOptionalParentheticalFormsOperationFrame === "function") {
          const optionalParentheticalSourceFrame = targetObject.buildOptionalParentheticalFormsSourceFrame([normalizedSurface], {
            sourceKind: surfaceRecord ? "generated-output-surface-segment-record" : "generated-output-surface-text",
            sourceSegmentFrames
          });
          const optionalParentheticalOperationFrame = targetObject.buildOptionalParentheticalFormsOperationFrame(optionalParentheticalSourceFrame);
          variants = targetObject.expandOptionalParentheticalForms([normalizedSurface], {
            sourceFrame: optionalParentheticalSourceFrame,
            operationFrame: optionalParentheticalOperationFrame
          });
        } else if (typeof targetObject.expandOptionalParentheticalForms === "function" && !/\([^()]+\)/.test(normalizedSurface)) {
          variants = targetObject.expandOptionalParentheticalForms([normalizedSurface]);
        } else if (/\([^()]+\)/.test(normalizedSurface)) {
          variants = [];
        }
        return variants.map(variant => String(variant || "").trim()).filter((variant, index, list) => variant && list.indexOf(variant) === index);
      };
      const pushGeneratedSurfaceForm = (surface = "") => {
        getGeneratedSurfaceTextVariants(surface).forEach(variant => {
          if (!forms.includes(variant)) {
            forms.push(variant);
          }
        });
      };
      const collectGeneratedSurfaceSoundSpellingFrames = (...sources) => {
        collectNuclearClauseSurfaceSoundSpellingFrames(...sources).forEach(frame => {
          const key = getNuclearClauseSurfaceSoundSpellingFrameKey(frame);
          if (!key || generatedSurfaceSoundSpellingFrames.some(entry => getNuclearClauseSurfaceSoundSpellingFrameKey(entry) === key)) {
            return;
          }
          generatedSurfaceSoundSpellingFrames.push(frame);
        });
      };
      const collectGeneratedOutputSurfaceRecord = (record = null) => {
        if (!record || typeof record !== "object") {
          return;
        }
        const segments = normalizeCnvSurfacePathSegments(record.segments || []);
        const surface = String(record.surface || "");
        if (!surface && !segments.length) {
          return;
        }
        const surfaceVariants = getGeneratedSurfaceTextVariants({
          surface,
          segments
        });
        const troncoSegmentIndex = segments.findIndex(segment => segment?.role === "tronco" || segment?.slot === "tronco");
        const troncoVariants = troncoSegmentIndex >= 0 ? getGeneratedSurfaceTextVariants({
          surface: segments[troncoSegmentIndex]?.value || "",
          segments: [segments[troncoSegmentIndex]]
        }) : [];
        (surfaceVariants.length ? surfaceVariants : [surface]).forEach((surfaceVariant, variantIndex) => {
          if (generatedOutputSurfaceRecords.some(entry => entry.surface === surfaceVariant)) {
            return;
          }
          const variantSegments = segments.map((segment, segmentIndex) => {
            if (segmentIndex === troncoSegmentIndex && troncoVariants.length === surfaceVariants.length && troncoVariants[variantIndex]) {
              return {
                ...segment,
                value: troncoVariants[variantIndex]
              };
            }
            return {
              ...segment
            };
          });
          generatedOutputSurfaceRecords.push({
            surface: surfaceVariant,
            segments: variantSegments
          });
        });
      };
      const buildSurfaceFromCurrentSlots = (overrideTronco = troncoSlot, overrideSuffix = pers2Slot) => {
        const realizedNominal = isNominalOutputProfile ? targetObject.realizeNominalFormSpec(primaryFormSpec, {
          verb: overrideTronco,
          subjectSuffix: overrideSuffix
        }) : null;
        return buildActiveNuclearClauseSurfaceResult({
          pers1Slot: pers1Slot,
          obj1Slot: obj1Slot,
          pers2Slot: realizedNominal ? realizedNominal.subjectSuffix : overrideSuffix,
          troncoSlot: realizedNominal ? realizedNominal.verb : overrideTronco,
          trailingSuffix: appliedMorphology?.trailingSuffix || "",
          directionalChainMeta: appliedMorphology?.directionalChainMeta || null,
          surfaceRuleMeta: getCurrentSurfaceRuleMeta()
        });
      };
      const buildSurfaceFromSlotParts = ({
        pers1Slot: pers1SlotValue,
        obj1Slot: obj1SlotValue,
        pers2Slot: pers2SlotValue,
        troncoSlot: troncoSlotValue = "",
        verb: compatibilityVerbValue = "",
        formSpec = null,
        trailingSuffix = "",
        directionalChainMeta = null,
        surfaceRuleMeta = null
      }) => {
        const resolvedTroncoSlot = troncoSlotValue || compatibilityVerbValue;
        const realizedNominal = isNominalOutputProfile ? targetObject.realizeNominalFormSpec(formSpec, {
          verb: resolvedTroncoSlot,
          subjectSuffix: pers2SlotValue
        }) : null;
        return buildActiveNuclearClauseSurfaceResult({
          pers1Slot: pers1SlotValue,
          obj1Slot: obj1SlotValue,
          pers2Slot: realizedNominal ? realizedNominal.subjectSuffix : pers2SlotValue,
          troncoSlot: realizedNominal ? realizedNominal.verb : resolvedTroncoSlot,
          trailingSuffix,
          directionalChainMeta,
          surfaceRuleMeta
        });
      };
      clearError("subject-prefix");
      clearError("object-prefix");
      clearError("subject-suffix");
      const typedCompoundOperationFrame = override?.typedCompoundOperationFrame && typeof override.typedCompoundOperationFrame === "object" ? override.typedCompoundOperationFrame : null;
      const typedCompoundTargetStem = String(typedCompoundOperationFrame?.targetFrame?.stem || "").trim();
      if (typedCompoundOperationFrame) {
        const typedCompoundExpectedTargetStem = [typedCompoundOperationFrame.sourceFrame?.root, typedCompoundOperationFrame.matrixFrame?.root].map(entry => String(entry || "").trim()).join("");
        const typedCompoundFrameMissing = typedCompoundOperationFrame.operationFrame?.kind !== "andrews-typed-operation-frame" || !typedCompoundOperationFrame.sourceFrame?.root || !typedCompoundOperationFrame.matrixFrame?.root || !typedCompoundTargetStem;
        const typedCompoundFrameContradiction = Boolean(!typedCompoundFrameMissing && typedCompoundExpectedTargetStem && typedCompoundTargetStem !== typedCompoundExpectedTargetStem);
        if (typedCompoundFrameMissing || typedCompoundFrameContradiction) {
          const diagnosticId = typedCompoundFrameContradiction ? "compound-continuation-contradictory-typed-operation-frame" : "compound-continuation-missing-typed-operation-frame";
          return buildNuclearClauseSurfaceBlockedResult({
            result: {
              result: "—",
              surfaceForms: [],
              generationAllowed: false,
              routeRankingAllowed: false,
              typedCompoundOperationFrame,
              typedCompoundExpectedTargetStem
            },
            message: typedCompoundFrameContradiction ? "Compound continuation generation rejected a contradictory Andrews typed operation frame." : "Compound continuation generation requires a complete Andrews typed operation frame.",
            diagnosticId,
            routeFamily: "compound-continuation",
            routeStage: "typed-operation-frame-gate",
            resultMarker: "—",
            override,
            resolvedTenseMode,
            tense,
            pers1: pers1Slot,
            pers2: pers2Slot,
            obj1: baseObj1Slot,
            poseedor: poseedorSlot,
            posicionesFormula,
            verb: troncoSlot,
            renderVerb: troncoRender,
            entradaGrammarObject,
            isReflexive,
            resolvedDerivationMode,
            resolvedDerivationType,
            resolvedVoiceMode,
            enumerableContract: false
          });
        }
        troncoSlot = typedCompoundTargetStem;
        tronco = typedCompoundTargetStem;
        posicionesFormula = {
          ...(posicionesFormula || {}),
          tronco: typedCompoundTargetStem
        };
        const typedObjectPrefix = String(typedCompoundOperationFrame.targetFrame?.objectPrefix || "").trim();
        if (typedObjectPrefix && !obj1Slot) {
          obj1Slot = typedObjectPrefix;
          baseObj1Slot = typedObjectPrefix;
        }
      }
      const rawVerb = String(troncoSlot || "");
      const parseInputVerb = rawVerb;
      const rawVerbTiMetadata = targetObject.getRawInputTiCausativeMetadata(parseInputVerb);
      const invalidCharacters = targetObject.getInvalidVerbCharacters(parseInputVerb);
      const invalidLetters = targetObject.getInvalidVerbLetters(parseInputVerb);
      const invalidStructure = targetObject.getInvalidVerbStructure(parseInputVerb, {
        expectRegexEnvelope: false
      });
      if (invalidCharacters.length || invalidLetters.length || invalidStructure) {
        const invalidList = Array.from(new Set([...invalidCharacters, ...invalidLetters])).join(", ");
        const message = invalidStructure ? targetObject.getInvalidVerbStructureMessage(invalidStructure, {
          expectRegexEnvelope: false
        }) : invalidList ? `El verbo contiene letras invalidas: ${invalidList}` : "El verbo contiene letras invalidas.";
        const error = returnIfError(message, ["verb"]);
        if (error) return error;
      }
      const preParsedVerb = override?.parsedVerb;
      const shouldReusePreParsed = targetObject.canReusePreParsedVerb({
        parsedVerb: preParsedVerb,
        rawVerb: parseInputVerb
      });
      const parsedVerb = shouldReusePreParsed ? {
        ...preParsedVerb
      } : targetObject.parseVerbInput(parseInputVerb);
      parsedVerb.derivationType = resolvedDerivationType;
      parsedVerb.derivationValencyDelta = derivationValencyDelta;
      parsedVerb.tiCausativeClass = parsedVerb.tiCausativeClass || rawVerbTiMetadata.tiCausativeClass || targetObject.normalizeTiCausativeClass(targetObject.getComposerActiveTiCausativeClass()) || "";
      troncoSlot = parsedVerb.verb;
      troncoRender = parsedVerb.displayVerb;
      let analysisVerb = parsedVerb.analysisVerb;
      const analysisExactVerb = parsedVerb.exactBaseVerb || parsedVerb.analysisVerb || parsedVerb.verb;
      let indirectObjectMarker = posicionesFormula?.obj2 || parsedVerb.indirectObjectMarker;
      let thirdObjectMarker = posicionesFormula?.obj3 || "";
      const sourceSelectedProjectiveObjectPrefix = obj1Slot;
      const sourceSelectedProjectiveMarkers = [obj1Slot, indirectObjectMarker, thirdObjectMarker].filter(marker => marker === "tla" || marker === "tē");
      const passivePatientivoSelectedProjectiveObjectPrefix = tense === "patientivo" && targetObject.normalizeVerbDerivedPatientiveFamily(patientivoSource) === "passive" && sourceSelectedProjectiveMarkers.length > 1 && (sourceSelectedProjectiveObjectPrefix === "tla" || sourceSelectedProjectiveObjectPrefix === "tē") ? sourceSelectedProjectiveObjectPrefix : "";
      const customaryPresentPatientiveSelectedProjectiveObjectPrefix = sourceSelectedProjectiveMarkers.length > 1 && (sourceSelectedProjectiveObjectPrefix === "tla" || sourceSelectedProjectiveObjectPrefix === "tē") ? sourceSelectedProjectiveObjectPrefix : "";
      const boundMarkerSlotOverrides = targetObject.applyBoundMarkerSlotOverrides(parsedVerb, obj1Slot, baseObj1Slot, {
        preserveOccupiedSourceObjectPrefix: isNominalOutputProfile,
        entradaGrammarObject
      });
      if (boundMarkerSlotOverrides.blocked === true) {
        return buildNuclearClauseSurfaceBlockedResult({
          result: {
            result: "—",
            surfaceForms: [],
            generationAllowed: false,
            routeRankingAllowed: false,
            valencyObjectSlotGate: boundMarkerSlotOverrides.valencyObjectSlotGate || null
          },
          message: NUCLEAR_CLAUSE_SURFACE_NO_OUTPUT_MESSAGE,
          diagnosticId: boundMarkerSlotOverrides.diagnosticId || "generation-valency-object-slot-frame-unfixed",
          routeFamily: "generation-valency",
          routeStage: boundMarkerSlotOverrides.routeStage || "generation-valency-object-slot-gate",
          resultMarker: "—",
          override,
          resolvedTenseMode,
          tense,
          pers1: pers1Slot,
          pers2: pers2Slot,
          obj1: obj1Slot,
          poseedor: poseedorSlot,
          posicionesFormula,
          verb: troncoSlot,
          renderVerb: troncoRender,
          entradaGrammarObject,
          isReflexive,
          resolvedDerivationMode,
          resolvedDerivationType,
          resolvedVoiceMode,
          enumerableContract: false
        });
      }
      ({
        obj1: obj1Slot,
        baseObj1: baseObj1Slot
      } = boundMarkerSlotOverrides);
      if (parsedVerb.hasImpersonalTlaPrefix) {
        const impersonalTaPrefixSlotGate = typeof targetObject.buildGenerationValencyObjectSlotMutationGate === "function" ? targetObject.buildGenerationValencyObjectSlotMutationGate({
          operation: "apply-impersonal-ta-prefix-slot-clearing",
          mutationKind: "delete-object-slots",
          sourceObj1: obj1Slot,
          sourceBaseObj1: baseObj1Slot,
          sourceObj2: indirectObjectMarker,
          sourceObj3: thirdObjectMarker,
          targetObj1: "",
          targetBaseObj1: "",
          targetObj2: "",
          targetObj3: "",
          options: {
            entradaGrammarObject
          }
        }) : null;
        if (impersonalTaPrefixSlotGate?.status === "blocked") {
          return buildNuclearClauseSurfaceBlockedResult({
            result: {
              result: "—",
              surfaceForms: [],
              generationAllowed: false,
              routeRankingAllowed: false,
              valencyObjectSlotGate: impersonalTaPrefixSlotGate
            },
            message: NUCLEAR_CLAUSE_SURFACE_NO_OUTPUT_MESSAGE,
            diagnosticId: impersonalTaPrefixSlotGate.diagnosticId || "generation-valency-object-slot-frame-unfixed",
            routeFamily: "generation-valency",
            routeStage: impersonalTaPrefixSlotGate.routeStage || "generation-valency-object-slot-gate",
            resultMarker: "—",
            override,
            resolvedTenseMode,
            tense,
            pers1: pers1Slot,
            pers2: pers2Slot,
            obj1: obj1Slot,
            poseedor: poseedorSlot,
            posicionesFormula,
            verb: troncoSlot,
            renderVerb: troncoRender,
            entradaGrammarObject,
            isReflexive,
            resolvedDerivationMode,
            resolvedDerivationType,
            resolvedVoiceMode,
            enumerableContract: false
          });
        }
        obj1Slot = "";
        baseObj1Slot = "";
        indirectObjectMarker = "";
        thirdObjectMarker = "";
      }
      ({
        obj1: obj1Slot,
        obj2: indirectObjectMarker
      } = targetObject.resolveObj1Obj2Positions({
        obj1: obj1Slot,
        obj2: indirectObjectMarker,
        derivationType: resolvedDerivationType
      }));
      if (isTroncoNajActiveWrapperTense) {
        const troncoNajResolvedSlotGate = typeof targetObject.buildGenerationValencyObjectSlotMutationGate === "function" ? targetObject.buildGenerationValencyObjectSlotMutationGate({
          operation: "apply-tronco-naj-active-wrapper-resolved-slot-clearing",
          mutationKind: "delete-object-slots",
          sourceObj1: obj1Slot,
          sourceBaseObj1: baseObj1Slot,
          sourceObj2: indirectObjectMarker,
          sourceObj3: thirdObjectMarker,
          targetObj1: "",
          targetBaseObj1: "",
          targetObj2: "",
          targetObj3: "",
          options: {
            entradaGrammarObject,
            requireFixedValenceFrame: true
          }
        }) : null;
        if (troncoNajResolvedSlotGate?.status === "blocked") {
          return returnGenerationValencyObjectSlotGateBlockedResult(troncoNajResolvedSlotGate);
        }
        obj1Slot = "";
        indirectObjectMarker = "";
        thirdObjectMarker = "";
      }
      baseObj1Slot = obj1Slot;
      const sourceValency = targetObject.getActiveVerbValency(parsedVerb);
      const fusionPrefixes = Array.isArray(parsedVerb.fusionPrefixes) ? parsedVerb.fusionPrefixes : [];
      const validationVerb = troncoSlot;
      isReflexive = obj1Slot === "mo";
      const directionalPrefix = parsedVerb.directionalPrefix;
      const isPotencialHabitualNominalProfile = targetObject.isPotencialHabitualTense(tense) && resolvedTenseMode === targetObject.TENSE_MODE.adjetivo && resolvedDerivationMode === targetObject.DERIVATION_MODE.nonactive;
      const isPotencialHabitualNominalNonactive = isPotencialHabitualNominalProfile;
      const isSustantivoVerbalImpersonalActionProfile = tense === "sustantivo-verbal" && resolvedTenseMode === targetObject.TENSE_MODE.sustantivo && resolvedDerivationMode === targetObject.DERIVATION_MODE.nonactive;
      const isCalificativoInstrumentivoPassiveActionProfile = tense === "calificativo-instrumentivo" && resolvedTenseMode === targetObject.TENSE_MODE.sustantivo && resolvedDerivationMode === targetObject.DERIVATION_MODE.nonactive;
      const isPredicateNominalPassivePredicateProfile = targetObject.isPredicateNominalTense(tense) && resolvedTenseMode === targetObject.TENSE_MODE.sustantivo && resolvedDerivationMode === targetObject.DERIVATION_MODE.nonactive;
      const isPassiveImpersonalMode = resolvedTenseMode === targetObject.TENSE_MODE.verbo && resolvedVoiceMode === targetObject.VOICE_MODE.passive || isPotencialHabitualNominalNonactive || isSustantivoVerbalImpersonalActionProfile || isCalificativoInstrumentivoPassiveActionProfile || isPredicateNominalPassivePredicateProfile;
      const targetValency = isPassiveImpersonalMode ? Math.max(0, sourceValency - 1) : sourceValency;
      let preserveSubjectForPassive = preservePassiveSubject;
      const valencySummary = targetObject.getVerbValencySummary(parsedVerb);
      const hasOpenObjectSlot = valencySummary.baseObjectSlots > valencySummary.fusionObjectSlots;
      const hasPromotableObject = targetObject.PASSIVE_IMPERSONAL_DIRECT_OBJECTS.has(obj1Slot) || fusionPrefixes.some(prefix => targetObject.PASSIVE_IMPERSONAL_DIRECT_OBJECTS.has(prefix)) || hasOpenObjectSlot;
      const hasSubjectValent = !isPassiveImpersonalMode || targetValency > 0 && hasPromotableObject;
      const shouldDelayPretAllomorphy = targetObject.shouldDelaySlashSupportiveIAllomorphyForPret({
        parsedVerb,
        tense,
        obj1Slot: obj1Slot,
        indirectObjectMarker,
        thirdObjectMarker
      });
      const allomorphyResult = shouldDelayPretAllomorphy ? {
        verb: troncoSlot,
        analysisVerb,
        morphologyObj1: obj1Slot,
        soundSpellingFrames: []
      } : targetObject.applyObj1Allomorphy({
        verb: troncoSlot,
        analysisVerb,
        pers1: pers1Slot,
        pers2: pers2Slot,
        obj1: obj1Slot,
        obj2: indirectObjectMarker,
        obj3: thirdObjectMarker,
        isPassiveImpersonalMode,
        ...targetObject.buildObjectAllomorphyMetaOptions(parsedVerb)
      });
      troncoSlot = allomorphyResult.verb;
      analysisVerb = allomorphyResult.analysisVerb;
      let morphologyObj1Slot = allomorphyResult.morphologyObj1;
      let allomorphySoundSpellingFrames = collectNuclearClauseSurfaceSoundSpellingFrames(allomorphyResult.soundSpellingFrames);
      if (!silent) {
        const resolvedComposerDisplayValue = targetObject.isVerbInputModeComposer() ? targetObject.resolveVerbInputSource(valorTronco || rawVerb, {
          mode: targetObject.VERB_INPUT_MODE.composer
        }).displayValue : "";
        const siguienteValorTronco = targetObject.isVerbInputModeComposer() ? resolvedComposerDisplayValue || rawVerb : targetObject.serializeRegexInputValue(parseInputVerb) || parseInputVerb;
        onEntradaTroncoSync({
          siguienteValorTronco
        });
      }
      const isNonactive = resolvedTenseMode === targetObject.TENSE_MODE.verbo && resolvedDerivationMode === targetObject.DERIVATION_MODE.nonactive || isPotencialHabitualNominalNonactive || isSustantivoVerbalImpersonalActionProfile || isCalificativoInstrumentivoPassiveActionProfile || isPredicateNominalPassivePredicateProfile;
      if (isNonactive && targetObject.PRETERITO_UNIVERSAL_ORDER.includes(tense)) {
        tense = targetObject.getCurrentResolvedConjugationSelectionState({
          tenseMode: resolvedTenseMode
        }).tenseValue;
      }
      const resolvedDirectionalRuleMode = targetObject.resolveDirectionalRuleMode(parsedVerb, {
        isNonactive,
        derivationType: resolvedDerivationType
      });
      const getCurrentDerivationOptions = (overrides = {}) => {
        const optionVerb = overrides.verb ?? troncoSlot;
        const optionAnalysisVerb = overrides.analysisVerb ?? analysisVerb;
        const reducedPotencialHabitualSource = targetObject.resolvePotencialHabitualReducedNonactiveSource({
          parsedVerb,
          verb: optionVerb,
          analysisVerb: optionAnalysisVerb,
          obj1Slot: obj1Slot,
          tense,
          tenseMode: resolvedTenseMode,
          derivationMode: resolvedDerivationMode
        });
        return targetObject.buildNonactiveDerivationOptions({
          verb: optionVerb,
          analysisVerb: optionAnalysisVerb,
          obj1Slot: obj1Slot,
          parsedVerb,
          directionalPrefix,
          tense,
          tenseMode: resolvedTenseMode,
          derivationMode: resolvedDerivationMode,
          preferredNonactiveBaseVerb: reducedPotencialHabitualSource?.preferredNonactiveBaseVerb || "",
          preferredNonactiveSourceMeta: reducedPotencialHabitualSource?.preferredNonactiveSourceMeta || null,
          preferredNonactiveSourcePrefix: reducedPotencialHabitualSource?.preferredNonactiveSourcePrefix || ""
        });
      };
      const forwardDerivations = targetObject.applyGenerateForwardDerivations({
        resolvedDerivationType,
        buildDerivationOptions: ({
          verb,
          analysisVerb
        }) => ({
          ...getCurrentDerivationOptions({
            verb,
            analysisVerb
          }),
          causativeSubtype: targetObject.getActiveCausativeSubtype()
        }),
        silent,
        renderVerb: troncoRender,
        obj1Base: baseObj1Slot,
        tense,
        isReflexive,
        initialState: {
          verb: troncoSlot,
          analysisVerb
        }
      });
      if (forwardDerivations.noStemMask) {
        return buildNuclearClauseSurfaceBlockedResult({
          result: forwardDerivations.noStemMask,
          message: NUCLEAR_CLAUSE_SURFACE_NO_OUTPUT_MESSAGE,
          diagnosticId: "nuclear-clause-surface-forward-derivation-no-stem",
          routeFamily: "forward-derivation",
          routeStage: "no-stem-mask",
          resultMarker: "—",
          override,
          resolvedTenseMode,
          tense,
          pers1: pers1Slot,
          pers2: pers2Slot,
          obj1: baseObj1Slot,
          poseedor: poseedorSlot,
          verb: troncoSlot,
          renderVerb: troncoRender,
          isReflexive,
          resolvedDerivationMode,
          resolvedDerivationType,
          resolvedVoiceMode,
          enumerableContract: false
        });
      }
      ({
        verb: troncoSlot,
        analysisVerb
      } = forwardDerivations);
      let causativeAllStems = forwardDerivations.causativeAllStems;
      let applicativeAllStems = forwardDerivations.applicativeAllStems;
      let causativeAllStemSpecs = forwardDerivations.causativeAllStemSpecs || null;
      let applicativeAllStemSpecs = forwardDerivations.applicativeAllStemSpecs || null;
      const canonicalNonactiveStemFrame =
        buildGeneratedCanonicalNonactiveStemFrame({
          sourceStem: troncoSlot,
          isNonactive,
          resolvedTenseMode,
          resolvedDerivationType,
          sourceValency,
          tense,
          subjectPrefix: inputPers1,
          subjectSuffix: inputPers2
        });
      if (canonicalNonactiveStemFrame?.authorizationStatus === "blocked") {
        return buildNuclearClauseSurfaceBlockedResult({
          result: {
            result: "—",
            surfaceForms: [],
            generationAllowed: false,
            routeRankingAllowed: false,
            canonicalNonactiveStemFrame
          },
          message: NUCLEAR_CLAUSE_SURFACE_NO_OUTPUT_MESSAGE,
          diagnosticId: canonicalNonactiveStemFrame.blockReason,
          routeFamily: "canonical-nonactive-derivation",
          routeStage: "lesson20-owner-record",
          resultMarker: "—",
          override,
          resolvedTenseMode,
          tense,
          pers1: pers1Slot,
          pers2: pers2Slot,
          obj1: baseObj1Slot,
          poseedor: poseedorSlot,
          verb: troncoSlot,
          renderVerb: troncoRender,
          isReflexive,
          resolvedDerivationMode,
          resolvedDerivationType,
          resolvedVoiceMode,
          enumerableContract: false
        });
      }
      const forwardStemProvenance = !isNonactive && resolvedDerivationType === targetObject.DERIVATION_TYPE.causative && forwardDerivations.causativeSelectionMeta ? targetObject.buildForwardDerivationProvenance({
        sourceVerb: troncoRender,
        analysisTarget: analysisVerb,
        tense,
        derivationType: resolvedDerivationType,
        isTransitive: targetObject.getBaseObjectSlots(parsedVerb) > 0,
        selectedMeta: forwardDerivations.causativeSelectionMeta
      }) : null;
      const nonactiveDerivation = targetObject.applyNonactiveDerivationFromOptions({
        isNonactive,
        derivationType: resolvedDerivationType,
        causativeAllStems,
        applicativeAllStems,
        derivationOptions: getCurrentDerivationOptions()
      });
      ({
        verb: troncoSlot,
        analysisVerb
      } = targetObject.extractForwardDerivationState(nonactiveDerivation, {
        verb: troncoSlot,
        analysisVerb
      }));
      let nonactiveAllStems = nonactiveDerivation.nonactiveAllStems;
      let nonactiveAllStemSpecs = Array.isArray(nonactiveDerivation.nonactiveAllStemSpecs) ? nonactiveDerivation.nonactiveAllStemSpecs : null;
      if (canonicalNonactiveStemFrame?.authorizationStatus === "authorized") {
        troncoSlot = canonicalNonactiveStemFrame.writtenStem;
        analysisVerb = canonicalNonactiveStemFrame.writtenStem;
        nonactiveAllStems = null;
        nonactiveAllStemSpecs = null;
      }
      ({
        obj1: obj1Slot,
        morphologyObj1: morphologyObj1Slot,
        obj1Base: baseObj1Slot,
        obj2: indirectObjectMarker,
        obj3: thirdObjectMarker,
        isReflexive
      } = targetObject.applyNonactiveGenerateOverrides({
        nonactiveDerivation,
        obj1: obj1Slot,
        morphologyObj1: morphologyObj1Slot,
        obj1Base: baseObj1Slot,
        obj2: indirectObjectMarker,
        obj3: thirdObjectMarker,
        isReflexive
      }));
      const passiveValencyAdjustments = targetObject.applyPassiveImpersonalSlotAdjustments({
        isPassiveImpersonalMode,
        verb: troncoSlot,
        analysisVerb,
        fusionPrefixes,
        hasLeadingDash: parsedVerb.hasLeadingDash,
        targetValency,
        pers1: pers1Slot,
        pers2: pers2Slot,
        obj1: obj1Slot,
        obj2: indirectObjectMarker,
        obj3: thirdObjectMarker,
        preserveSubjectForPassive,
        allowPassiveObject,
        morphologyObj1: morphologyObj1Slot,
        hasPromotableObject,
        entradaGrammarObject: explicitEntradaGrammarObject
      });
      if (passiveValencyAdjustments.blocked === true) {
        return buildNuclearClauseSurfaceBlockedResult({
          result: {
            result: "—",
            surfaceForms: [],
            generationAllowed: false,
            routeRankingAllowed: false,
            valencyObjectSlotGate: passiveValencyAdjustments.valencyObjectSlotGate || null
          },
          message: NUCLEAR_CLAUSE_SURFACE_NO_OUTPUT_MESSAGE,
          diagnosticId: passiveValencyAdjustments.diagnosticId || "generation-valency-object-slot-frame-unfixed",
          routeFamily: "generation-valency",
          routeStage: passiveValencyAdjustments.routeStage || "generation-valency-object-slot-gate",
          resultMarker: "—",
          override,
          resolvedTenseMode,
          tense,
          pers1: pers1Slot,
          pers2: pers2Slot,
          obj1: obj1Slot,
          poseedor: poseedorSlot,
          posicionesFormula,
          verb: troncoSlot,
          renderVerb: troncoRender,
          entradaGrammarObject,
          isReflexive,
          resolvedDerivationMode,
          resolvedDerivationType,
          resolvedVoiceMode,
          enumerableContract: false
        });
      }
      troncoSlot = passiveValencyAdjustments.verb;
      analysisVerb = passiveValencyAdjustments.analysisVerb;
      pers1Slot = passiveValencyAdjustments.pers1;
      pers2Slot = passiveValencyAdjustments.pers2;
      obj1Slot = passiveValencyAdjustments.obj1;
      indirectObjectMarker = passiveValencyAdjustments.obj2;
      thirdObjectMarker = passiveValencyAdjustments.obj3;
      preserveSubjectForPassive = passiveValencyAdjustments.preserveSubjectForPassive;
      morphologyObj1Slot = passiveValencyAdjustments.morphologyObj1;
      const shouldApplyDerivedAllomorphy = !!targetObject.getForwardDerivationConfig(resolvedDerivationType);
      if (shouldApplyDerivedAllomorphy) {
        const derivedAllomorphy = targetObject.applyObj1Allomorphy({
          verb: troncoSlot,
          analysisVerb,
          pers1: pers1Slot,
          pers2: pers2Slot,
          obj1: morphologyObj1Slot,
          obj2: indirectObjectMarker,
          obj3: thirdObjectMarker,
          isPassiveImpersonalMode,
          ...targetObject.buildObjectAllomorphyMetaOptions(parsedVerb)
        });
        troncoSlot = derivedAllomorphy.verb;
        analysisVerb = derivedAllomorphy.analysisVerb;
        morphologyObj1Slot = derivedAllomorphy.morphologyObj1;
        allomorphySoundSpellingFrames = collectNuclearClauseSurfaceSoundSpellingFrames(allomorphySoundSpellingFrames, derivedAllomorphy.soundSpellingFrames);
      }
      if (validationVerb === "") {
        const message = "El verbo no puede estar vacío. Ingrese verbo.";
        const error = returnIfError(message, ["verb"]);
        if (error) return error;
      } else {
        clearError("verb");
      }
      if (!targetObject.VOWEL_RE.test(validationVerb)) {
        const message = "El verbo no está escrito correctamente.";
        const error = returnIfError(message, ["verb"]);
        if (error) return error;
      } else {
        clearError("verb");
      }
      const authoritativeDerivationalRawInputSource = targetObject.getAuthoritativeDerivationalSourceForRawInputGate({
        tense,
        patientivoSource
      });
      const shouldBypassGenericRawInputGates = Boolean(authoritativeDerivationalRawInputSource);
      if (!targetObject.VOWEL_END_RE.test(validationVerb) && !shouldBypassGenericRawInputGates) {
        if (skipValidation) {
          return buildNuclearClauseSurfaceBlockedResult({
            result: {
              result: "—",
              error: true,
              surfaceForms: [],
              isReflexive
            },
            message: "El verbo debe terminar en vocal.",
            diagnosticId: "nuclear-clause-surface-final-vowel-gate-blocked",
            routeFamily: NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
            routeStage: "raw-input-final-vowel-gate",
            resultMarker: "—",
            override,
            resolvedTenseMode,
            tense,
            pers1: pers1Slot,
            pers2: pers2Slot,
            obj1: baseObj1Slot,
            poseedor: poseedorSlot,
            verb: troncoSlot,
            renderVerb: troncoRender,
            isReflexive,
            resolvedDerivationMode,
            resolvedDerivationType,
            resolvedVoiceMode,
            enumerableContract: false
          });
        }
        const message = "El verbo debe terminar en vocal.";
        const error = returnIfError(message, ["verb"]);
        if (error) return error;
      } else {
        clearError("verb");
      }
      const stemGate = targetObject.evaluateVerbStemInputGate(rawVerb, parsedVerb);
      if (!stemGate.isValid && !shouldBypassGenericRawInputGates) {
        if (skipValidation) {
          return buildNuclearClauseSurfaceBlockedResult({
            result: {
              result: "—",
              error: true,
              surfaceForms: [],
              isReflexive
            },
            message: "El segmento final del verbo no cumple un patrón silábico válido.",
            diagnosticId: "nuclear-clause-surface-stem-syllable-gate-blocked",
            routeFamily: NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
            routeStage: "raw-input-stem-syllable-gate",
            resultMarker: "—",
            override,
            resolvedTenseMode,
            tense,
            pers1: pers1Slot,
            pers2: pers2Slot,
            obj1: baseObj1Slot,
            poseedor: poseedorSlot,
            verb: troncoSlot,
            renderVerb: troncoRender,
            isReflexive,
            resolvedDerivationMode,
            resolvedDerivationType,
            resolvedVoiceMode,
            enumerableContract: false
          });
        }
        const message = "El segmento final del verbo no cumple un patrón silábico válido.";
        const error = returnIfError(message, ["verb"]);
        if (error) return error;
      } else {
        clearError("verb");
      }
      const resetSubjectOverride = {
        ...(override && typeof override === "object" ? override : {})
      };
      if (posicionesFormula && Object.prototype.hasOwnProperty.call(posicionesFormula, "pers1")) {
        resetSubjectOverride.pers1 = pers1Slot;
      }
      if (posicionesFormula && (Object.prototype.hasOwnProperty.call(posicionesFormula, "pers2") || Object.prototype.hasOwnProperty.call(posicionesFormula, "num2"))) {
        resetSubjectOverride.pers2 = pers2Slot;
      }
      ({
        pers1: pers1Slot,
        pers2: pers2Slot
      } = targetObject.resetPers1Pers2ForNominalTiempos({
        tiempo: tense,
        override: resetSubjectOverride,
        pers1: pers1Slot,
        pers2: pers2Slot
      }));
      const isPassiveImpersonal = isPassiveImpersonalMode;
      if (isPassiveImpersonal) {
        const passiveOverrides = targetObject.applyPassiveImpersonalSlotOverrides({
          pers1: pers1Slot,
          pers2: pers2Slot,
          obj1: obj1Slot,
          analysisVerb,
          preserveSubjectForPassive,
          allowPassiveObject,
          entradaGrammarObject: explicitEntradaGrammarObject
        });
        if (passiveOverrides.blocked === true) {
          return buildNuclearClauseSurfaceBlockedResult({
            result: {
              result: "—",
              surfaceForms: [],
              generationAllowed: false,
              routeRankingAllowed: false,
              valencyObjectSlotGate: passiveOverrides.valencyObjectSlotGate || null
            },
            message: NUCLEAR_CLAUSE_SURFACE_NO_OUTPUT_MESSAGE,
            diagnosticId: passiveOverrides.diagnosticId || "generation-valency-object-slot-frame-unfixed",
            routeFamily: "generation-valency",
            routeStage: passiveOverrides.routeStage || "generation-valency-object-slot-gate",
            resultMarker: "—",
            override,
            resolvedTenseMode,
            tense,
            pers1: pers1Slot,
            pers2: pers2Slot,
            obj1: obj1Slot,
            poseedor: poseedorSlot,
            posicionesFormula,
            verb: troncoSlot,
            renderVerb: troncoRender,
            entradaGrammarObject,
            isReflexive,
            resolvedDerivationMode,
            resolvedDerivationType,
            resolvedVoiceMode,
            enumerableContract: false
          });
        }
        pers1Slot = passiveOverrides.pers1;
        pers2Slot = passiveOverrides.pers2;
        obj1Slot = passiveOverrides.obj1;
        morphologyObj1Slot = passiveOverrides.morphologyObj1;
      }
      const allowReflexiveAutoSwitch = !indirectObjectMarker && !thirdObjectMarker || resolvedDerivationType === targetObject.DERIVATION_TYPE.applicative;
      const reflexiveUpdate = allowReflexiveAutoSwitch ? targetObject.applyReflexivoAutoSwitch({
        pers1: pers1Slot,
        pers2: pers2Slot,
        obj1: obj1Slot,
        isPassiveImpersonal,
        entradaGrammarObject,
        clearError
      }) : {
        obj1Slot: obj1Slot,
        isReflexive: obj1Slot === "mo"
      };
      if (reflexiveUpdate.blocked === true) {
        return buildNuclearClauseSurfaceBlockedResult({
          result: {
            result: "—",
            surfaceForms: [],
            generationAllowed: false,
            routeRankingAllowed: false,
            valencyObjectSlotGate: reflexiveUpdate.valencyObjectSlotGate || null
          },
          message: NUCLEAR_CLAUSE_SURFACE_NO_OUTPUT_MESSAGE,
          diagnosticId: reflexiveUpdate.diagnosticId || "generation-valency-object-slot-frame-unfixed",
          routeFamily: "generation-valency",
          routeStage: reflexiveUpdate.routeStage || "generation-valency-object-slot-gate",
          resultMarker: "—",
          override,
          resolvedTenseMode,
          tense,
          pers1: pers1Slot,
          pers2: pers2Slot,
          obj1: obj1Slot,
          poseedor: poseedorSlot,
          posicionesFormula,
          verb: troncoSlot,
          renderVerb: troncoRender,
          entradaGrammarObject,
          isReflexive,
          resolvedDerivationMode,
          resolvedDerivationType,
          resolvedVoiceMode,
          enumerableContract: false
        });
      }
      obj1Slot = reflexiveUpdate.obj1 ?? reflexiveUpdate.obj1Slot;
      isReflexive = reflexiveUpdate.isReflexive;
      const isCalificativoInstrumentivo = tense === "calificativo-instrumentivo";
      const isNounTense = targetObject.isNonanimateNounTense(tense) || targetObject.isPotencialProfileTense(tense) || isPatientivoAdjectiveProfile || tense === "agentivo" || isPresentAgentivoNominalProfile || isPreteritAgentivoNominalProfile || isFutureAgentivoNominalProfile || tense === "patientivo" || tense === "instrumentivo" || targetObject.isPredicateNominalTense(tense) || tense === "calificativo-instrumentivo" || tense === "locativo-temporal";
      const invalidComboObjectPrefix = targetObject.resolveComboValidationObj1({
        obj1: obj1Slot,
        obj2: indirectObjectMarker,
        derivationType: resolvedDerivationType
      });
      if (!skipValidation && !isNounTense && targetObject.INVALID_COMBINATION_KEYS.has(targetObject.getPers1Obj1Pers2Key(pers1Slot, invalidComboObjectPrefix, pers2Slot))) {
        const message = "Combinacion inválida";
        const error = returnIfError(message, ["subject-prefix", "object-prefix", "subject-suffix"]);
        if (error) return error;
      }
      clearError("object-prefix");
      if (isNounTense) {
        const sourceSubjectMapsToPossessor = tense === "calificativo-instrumentivo" && actionNounStemUse === "general-use";
        if (targetObject.isNonanimateNounTense(tense) && !sourceSubjectMapsToPossessor && !targetObject.isNonanimatePers1Pers2(pers1Slot, pers2Slot)) {
          const message = tense === "sustantivo-verbal" ? "Sustantivo verbal solo con 3a persona no animada común." : "Solo 3a persona no animada (singular o plural).";
          const error = returnIfError(message, ["subject-prefix", "subject-suffix"]);
          if (error) return error;
        }
        const isTransitiveVerb = targetObject.getBaseObjectSlots(parsedVerb) > 0;
        if ((tense === "patientivo" && patientivoSource === "tronco-verbal" || isPatientivoAdjectiveProfile && targetObject.getPatientivoAdjectiveSourceForTense(tense) === "tronco-verbal") && isTransitiveVerb && !obj1Slot) {
          obj1Slot = "tla";
          morphologyObj1Slot = "tla";
        }
        if (resolvedTenseMode === targetObject.TENSE_MODE.adjetivo && targetObject.isIntransitiveOnlyActiveAdjectiveTense(tense) && isTransitiveVerb) {
          if (skipValidation) {
            return buildNuclearClauseSurfaceBlockedResult({
              result: {
                result: "—",
                error: true,
                surfaceForms: [],
                isReflexive
              },
              message: "Adjetivo activo solo para verbos intransitivos.",
              diagnosticId: "nuclear-clause-surface-active-adjective-transitive-blocked",
              routeFamily: NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
              routeStage: "adjective-active-valency-gate",
              resultMarker: "—",
              override,
              resolvedTenseMode,
              tense,
              pers1: pers1Slot,
              pers2: pers2Slot,
              obj1: obj1Slot,
              poseedor: poseedorSlot,
              verb: troncoSlot,
              renderVerb: troncoRender,
              isReflexive,
              resolvedDerivationMode,
              resolvedDerivationType,
              resolvedVoiceMode,
              enumerableContract: false
            });
          }
          const error = returnIfError("Adjetivo activo solo para verbos intransitivos.", ["verb"]);
          if (error) return error;
        }
        const nounCombinedMode = resolvedDerivationMode === targetObject.DERIVATION_MODE.nonactive ? targetObject.COMBINED_MODE.nonactive : targetObject.COMBINED_MODE.active;
        const slotPlanBundle = targetObject.getNounObjectSlotPlansFromMeta(parsedVerb, tense, {
          combinedMode: nounCombinedMode
        });
        const slotPlans = slotPlanBundle.slotPlans;
        const selectedBySlot = {
          object: obj1Slot || "",
          object2: indirectObjectMarker || "",
          object3: thirdObjectMarker || ""
        };
        const hasDerivedValencyIncrease = targetObject.getDerivationValencyDelta(resolvedDerivationType) > 0;
        const derivationLabel = targetObject.getDerivationTypeDisplayLabel(resolvedDerivationType, false).toLowerCase();
        const derivedSlots = slotPlans.filter(slotPlan => slotPlan.isAddedSlot);
        const allowCollapsedDerivedSlot = targetObject.allowsCollapsedDerivedNounSlot({
          tenseValue: tense,
          combinedMode: nounCombinedMode,
          slotPlanBundle,
          derivationType: resolvedDerivationType
        });
        if (hasDerivedValencyIncrease && !derivedSlots.length && !allowCollapsedDerivedSlot) {
          const error = returnIfError(`La derivación ${derivationLabel} no tiene espacio para prefijo no específico (ta/te/mu).`, ["object-prefix"]);
          if (error) return error;
        }
        const overflowedSlot = targetObject.NOUN_OBJECT_SLOT_SCHEMA.slice(slotPlans.length).find(slotMeta => Boolean(selectedBySlot[slotMeta.id]));
        if (overflowedSlot) {
          const derivationLabel = targetObject.getDerivationTypeDisplayLabel(resolvedDerivationType, false).toLowerCase();
          const error = returnIfError(`La derivación ${derivationLabel} no tiene espacio para marcadores de valencia adicionales.`, ["object-prefix"]);
          if (error) return error;
        }
        const invalidSlotPlan = slotPlans.find(slotPlan => !slotPlan.toggleValues.includes(selectedBySlot[slotPlan.id] || ""));
        if (invalidSlotPlan) {
          if (invalidSlotPlan.id !== "object") {
            const slotNumber = Number.isFinite(invalidSlotPlan.index) ? invalidSlotPlan.index + 1 : 2;
            const error = returnIfError(`Derivación ${derivationLabel} nominal requiere ta/te/mu en objeto ${slotNumber}.`, ["object-prefix"]);
            if (error) return error;
          }
          if (isCalificativoInstrumentivo) {
            if (isTransitiveVerb && slotPlans.length > 0) {
              const error = returnIfError("Calificativo transitivo solo con ta/te/mu.", ["object-prefix"]);
              if (error) return error;
            } else {
              const error = returnIfError("Calificativo intransitivo va sin prefijo.", ["object-prefix"]);
              if (error) return error;
            }
          }
          const primaryUsesDerivedSlot = slotPlans[0]?.isAddedSlot === true;
          const transitiveMessage = (() => {
            if (hasDerivedValencyIncrease && primaryUsesDerivedSlot) {
              return `Derivación ${derivationLabel} nominal transitiva solo con ta/te/mu.`;
            }
            switch (tense) {
              case "agentivo":
                return "Agentivo transitivo solo con ta/te/mu.";
              case "patientivo":
                return "Patientivo transitivo solo con ta/te/mu o Ø.";
              case "instrumentivo":
                return "Instrumentivo transitivo solo con ta/te/mu o Ø.";
              case "potencial":
                return "Potencial transitivo solo con Ø.";
              case "adjetivo-preterito":
              case "adjetivo-perfecto":
              case "adjetivo-preterito-tik":
              case "adjetivo-perfecto-tik":
              case "adjetivo-preterito-naj":
              case "adjetivo-perfecto-naj":
                return "Adjetivo activo solo para verbos intransitivos.";
              case "adjetivo-patientivo-no-activo":
              case "adjetivo-patientivo-perfectivo":
                return "Adjetivo patientivo transitivo solo con ta/te/mu o Ø.";
              case "potencial-habitual":
                return "Adjetivo no activo transitivo solo con ta/te/mu.";
              case "pasado-remoto-adverbio-activo":
                return "Adverbio activo transitivo solo con ta/te/mu.";
              case "sustantivo-verbal":
                return "Sustantivo verbal transitivo solo con ta/te/mu.";
              default:
                return "Sustantivo verbal transitivo solo con ta/te/mu.";
            }
          })();
          const intransitiveMessage = (() => {
            switch (tense) {
              case "agentivo":
                return "Agentivo intransitivo va sin prefijo.";
              case "patientivo":
                return "Patientivo intransitivo va sin prefijo.";
              case "instrumentivo":
                return "Instrumentivo intransitivo va sin prefijo.";
              case "potencial":
                return "Potencial intransitivo va sin prefijo.";
              case "adjetivo-preterito":
              case "adjetivo-perfecto":
              case "adjetivo-preterito-tik":
              case "adjetivo-perfecto-tik":
              case "adjetivo-preterito-naj":
              case "adjetivo-perfecto-naj":
                return "Adjetivo activo solo para verbos intransitivos.";
              case "adjetivo-patientivo-no-activo":
              case "adjetivo-patientivo-perfectivo":
                return "Adjetivo patientivo intransitivo va sin prefijo.";
              case "potencial-habitual":
                return "Adjetivo no activo intransitivo va sin prefijo.";
              case "pasado-remoto-adverbio-activo":
                return "Adverbio activo intransitivo va sin prefijo.";
              default:
                return "Sustantivo verbal intransitivo va sin prefijo.";
            }
          })();
          if (tense === "pasado-remoto-adverbio-activo" && skipValidation) {
            const blockedSlotKey = invalidSlotPlan.id === "object2" ? "obj2" : invalidSlotPlan.id === "object3" ? "obj3" : "obj1";
            const functionUseValenceGate = buildFunctionUseValenceObjectHardGate({
              override,
              posicionesFormula,
              sourceKind: "verbal-nuclear-clause",
              currentVector: {
                obj1: obj1Slot,
                obj2: indirectObjectMarker,
                obj3: thirdObjectMarker,
                reflexivo: isReflexive ? "mo" : ""
              },
              forceBlockedReason: isTransitiveVerb && slotPlans.length > 0 ? "function-use-would-relocate-or-reclassify-valence-object" : "function-use-would-invent-valence-object",
              currentVectorOwnsValenceObjectSlots: true,
              gateContext: "adverbial-nuclear-function-use",
              licensedCurrentValues: {
                [blockedSlotKey]: (Array.isArray(invalidSlotPlan.toggleValues) ? invalidSlotPlan.toggleValues : []).filter(Boolean)
              }
            });
            return buildNuclearClauseSurfaceBlockedResult({
              result: {
                outputKind: "adverbial-nuclear-function",
                generationRoute: "adverbio",
                clauseKind: "verbal-nuclear-clause",
                result: "—",
                error: true,
                supported: false,
                surfaceForms: [],
                isReflexive,
                functionUseValenceGate
              },
              message: isTransitiveVerb && slotPlans.length > 0 ? transitiveMessage : intransitiveMessage,
              diagnosticId: functionUseValenceGate.diagnosticId,
              routeFamily: "adverbial-nuclear-function",
              routeStage: functionUseValenceGate.routeStage,
              resultMarker: "—",
              override,
              resolvedTenseMode,
              tense,
              pers1: pers1Slot,
              pers2: pers2Slot,
              obj1: obj1Slot,
              poseedor: poseedorSlot,
              posicionesFormula,
              verb: troncoSlot,
              renderVerb: troncoRender,
              isReflexive,
              resolvedDerivationMode,
              resolvedDerivationType,
              resolvedVoiceMode,
              enumerableContract: false
            });
          }
          if (isTransitiveVerb && slotPlans.length > 0) {
            const error = returnIfError(transitiveMessage, ["object-prefix"]);
            if (error) return error;
          }
          const error = returnIfError(intransitiveMessage, ["object-prefix"]);
          if (error) return error;
        }
        if (slotPlans.length >= 3 && !targetObject.isValidObj1Obj2Obj3Combo({
          obj1: obj1Slot,
          obj2: indirectObjectMarker,
          obj3: thirdObjectMarker
        })) {
          const error = returnIfError("Combinación de objetos no permitida para valencia nominal 4.", ["object-prefix"]);
          if (error) return error;
        }
        if (!slotPlans.length) {
          const hasUnexpectedObjectMarker = Boolean(selectedBySlot.object || selectedBySlot.object2 || selectedBySlot.object3);
          if (hasUnexpectedObjectMarker) {
            const intransitiveMessage = (() => {
              switch (tense) {
                case "agentivo":
                  return "Agentivo intransitivo va sin prefijo.";
                case "patientivo":
                  return "Patientivo intransitivo va sin prefijo.";
                case "instrumentivo":
                  return "Instrumentivo intransitivo va sin prefijo.";
                case "potencial":
                  return "Potencial intransitivo va sin prefijo.";
                case "adjetivo-preterito":
                case "adjetivo-perfecto":
                case "adjetivo-preterito-tik":
                case "adjetivo-perfecto-tik":
                case "adjetivo-preterito-naj":
                case "adjetivo-perfecto-naj":
                  return "Adjetivo activo solo para verbos intransitivos.";
                case "adjetivo-patientivo-no-activo":
                case "adjetivo-patientivo-perfectivo":
                  return "Adjetivo patientivo intransitivo va sin prefijo.";
                case "potencial-habitual":
                  return "Adjetivo no activo intransitivo va sin prefijo.";
                case "pasado-remoto-adverbio-activo":
                  return "Adverbio activo intransitivo va sin prefijo.";
                default:
                  return "Sustantivo verbal intransitivo va sin prefijo.";
              }
            })();
            const error = returnIfError(intransitiveMessage, ["object-prefix"]);
            if (error) return error;
          }
        }
      }
      if (isPotencialHabitualNominalProfile && sourceSelectedProjectiveObjectPrefix === "mo") {
        morphologyObj1Slot = "ne";
      }
      const isUnderlyingTransitive = !isNonactive ? resolvedDerivationType === targetObject.DERIVATION_TYPE.causative || parsedVerb.isMarkedTransitive || parsedVerb.isTlaFusion : Boolean(morphologyObj1Slot || indirectObjectMarker || thirdObjectMarker || parsedVerb.isTlaFusion);
      const forceTransitiveBase = parsedVerb.isTlaFusion || isUnderlyingTransitive;
      if (!silent) {
        onAnalisisTroncoResuelto({
          tronco: troncoSlot,
          troncoAnalisis: analysisVerb,
          troncoAnalisisExacto: analysisExactVerb,
          obj1Morfologico: morphologyObj1Slot,
          fuerzaTransitivaBase: forceTransitiveBase,
          resolvedDerivationType,
          parsedVerb,
          troncoRender: troncoRender
        });
      }
      const formulaStemBeforeInflection =
        canonicalNonactiveStemFrame?.authorizationStatus === "authorized"
          ? canonicalNonactiveStemFrame.formulaStem
          : troncoSlot;
      const baseMorphologyInput = {
        pers1: pers1Slot,
        obj1: morphologyObj1Slot,
        pers2: pers2Slot,
        subjectPrefix: pers1Slot,
        objectPrefix: morphologyObj1Slot,
        subjectSuffix: pers2Slot,
        pers1Slot: pers1Slot,
        obj1Slot: morphologyObj1Slot,
        pers2Slot: pers2Slot,
        verb: troncoSlot,
        tense,
        analysisVerb,
        rawAnalysisVerb: parsedVerb.rawAnalysisVerb,
        rawVerb,
        sourceRawVerb: parsedVerb.sourceRawVerb,
        analysisExactVerb,
        verbMeta: parsedVerb,
        directionalPrefix,
        directionalRuleMode: resolvedDirectionalRuleMode,
        ...targetObject.buildMorphologyMetaOptions(parsedVerb, {
          hasDoubleDash: parsedVerb.hasDoubleDash,
          indirectObjectMarker,
          isUnderlyingTransitive
        }),
        thirdObjectMarker,
        hasSubjectValent,
        boundPrefix: parsedVerb.hasBoundMarker ? parsedVerb.sourcePrefix || parsedVerb.canonical?.sourcePrefix || (parsedVerb.boundPrefixes || []).join("") : "",
        embeddedPrefix: targetObject.getEmbeddedVerbPrefix(parsedVerb),
        boundPrefixes: Array.isArray(parsedVerb.boundPrefixes) ? parsedVerb.boundPrefixes.slice() : [],
        boundExplicitFlags: Array.isArray(parsedVerb.boundExplicitFlags) ? parsedVerb.boundExplicitFlags.slice() : [],
        directionalPrefixFromSlash: parsedVerb.directionalPrefixFromSlash || parsedVerb.canonical?.directionalPrefixFromSlash || "",
        sourceSplitPrefix: parsedVerb.hasBoundMarker ? parsedVerb.sourcePrefix || parsedVerb.canonical?.sourcePrefix || "" : "",
        sourceCompositeBase: parsedVerb.canonical?.slashCompositeRuleBase || "",
        verbSegment: parsedVerb.verbSegment || "",
        patientivoOwnership: override?.patientivoOwnership ?? targetObject.DEFAULT_PATIENTIVO_OWNERSHIP,
        patientivoSource,
        patientivoNominalSuffix,
        passivePatientivoSelectedProjectiveObjectPrefix,
        possessivePrefix: poseedorSlot,
        poseedorSlot: poseedorSlot,
        actionNounStemUse,
        predicateNominalSourceTense,
        combinedMode: isNonactive ? targetObject.COMBINED_MODE.nonactive : targetObject.COMBINED_MODE.active,
        customaryPresentPatientiveNnc: isPotencialHabitualNominalProfile,
        customaryPresentPatientivePlural: isPotencialHabitualNominalProfile && inputPers2 === "t",
        customaryPresentPatientiveSelectedProjectiveObjectPrefix,
        instrumentivoMode: overrideInstrumentivoMode || (poseedorSlot === "" ? targetObject.INSTRUMENTIVO_MODE.absolutivo : targetObject.INSTRUMENTIVO_MODE.posesivo),
        derivationType: resolvedDerivationType,
        isNonactiveMode: isNonactive,
        stemProvenanceSeed: forwardStemProvenance,
        entradaGrammarObject
      };
      const typedMorphResultFrame = buildGeneratedTypedMorphResultFrame({
        subjectPrefix: inputPers1,
        objectPrefix: morphologyObj1Slot,
        subjectSuffix: inputPers2,
        predicateStem: formulaStemBeforeInflection,
        morphologyInput: baseMorphologyInput
      });
      let selectedTypedMorphResultFrame = typedMorphResultFrame;
      appliedMorphology = targetObject.applyMorphologyRules(
        typedMorphResultFrame?.writtenProjectionInput?.morphologyInput || baseMorphologyInput
      );
      if (!appliedMorphology?.error && allomorphySoundSpellingFrames.length) {
        appliedMorphology = {
          ...appliedMorphology,
          soundSpellingFrames: collectNuclearClauseSurfaceSoundSpellingFrames(allomorphySoundSpellingFrames, appliedMorphology?.soundSpellingFrames)
        };
      }
      if (appliedMorphology?.error) {
        return buildNuclearClauseSurfaceBlockedResult({
          result: {
            ...appliedMorphology,
            error: true
          },
          message: NUCLEAR_CLAUSE_SURFACE_NO_OUTPUT_MESSAGE,
          diagnosticId: appliedMorphology.valencyObjectSlotGate?.diagnosticId || "nuclear-clause-surface-morphology-application-blocked",
          routeFamily: NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
          routeStage: appliedMorphology.valencyObjectSlotGate?.routeStage || "morphology-application",
          resultMarker: null,
          override,
          resolvedTenseMode,
          tense,
          pers1: pers1Slot,
          pers2: pers2Slot,
          obj1: morphologyObj1Slot,
          poseedor: poseedorSlot,
          verb: troncoSlot,
          renderVerb: troncoRender,
          isReflexive,
          resolvedDerivationMode,
          resolvedDerivationType,
          resolvedVoiceMode,
          enumerableContract: false
        });
      }
      const classPerfectiveFormulaSourceFrame = buildGeneratedClassPerfectiveFormulaSourceFrame({
        tense,
        subjectPrefix: inputPers1,
        objectPrefix: morphologyObj1Slot,
        sourceSubjectSuffix: inputPers2,
        sourceStem: typedMorphResultFrame?.formulaProjectionInput?.predicateStem || formulaStemBeforeInflection
      });
      const classPerfectiveFormulaOperationFrame = buildGeneratedClassPerfectiveFormulaOperationFrame(classPerfectiveFormulaSourceFrame);
      const classPerfectiveFormulaProfile = buildGeneratedClassPerfectiveFormulaProfile({
        tense,
        surfaceForms: [appliedMorphology?.verb || "", ...(Array.isArray(appliedMorphology?.alternateForms) ? appliedMorphology.alternateForms.map(form => form?.verb || "") : [])],
        subjectPrefix: inputPers1,
        objectPrefix: morphologyObj1Slot,
        sourceSubjectSuffix: inputPers2,
        sourceStem: typedMorphResultFrame?.formulaProjectionInput?.predicateStem || formulaStemBeforeInflection,
        sourceFrame: classPerfectiveFormulaSourceFrame,
        operationFrame: classPerfectiveFormulaOperationFrame
      });
      const formulaStemForSlots = classPerfectiveFormulaProfile?.base || formulaStemBeforeInflection;
      const formulaStemContext = {
        stem: formulaStemForSlots,
        pers1: inputPers1,
        pers2: inputPers2
      };
      const realizedFormulaObj1Slot = String(isReflexive ? "mo" : classPerfectiveFormulaProfile?.objectPrefix || appliedMorphology?.objectPrefix || morphologyObj1Slot);
      const foldedPreteritFormulaObj1Slot = !isReflexive && !realizedFormulaObj1Slot && morphologyObj1Slot && tense === "preterito" ? getGeneratedPreteritFoldedObjectPrefix(morphologyObj1Slot, inputPers1) : realizedFormulaObj1Slot;
      let formulaReflexiveBeforeInflection = isReflexive ? getDirectClassicalFormulaObjectPrefix("mo", formulaStemContext) : "";
      let formulaObj1BeforeInflection = isReflexive ? formulaReflexiveBeforeInflection : classPerfectiveFormulaProfile?.formulaObject || getDirectClassicalFormulaObjectPrefix(foldedPreteritFormulaObj1Slot, formulaStemContext);
      const formulaObj2BeforeInflection = getDirectClassicalFormulaObjectPrefix(indirectObjectMarker, formulaStemContext);
      const formulaObj3BeforeInflection = getDirectClassicalFormulaObjectPrefix(thirdObjectMarker, formulaStemContext);
      if (isPotencialHabitualNominalProfile) {
        const customaryPresentSubjectSuffix = String(appliedMorphology.subjectSuffix || "");
        const customaryPresentPluralSuffix = inputPers2 === "t" ? "met" : "";
        const keepSelectedProjectiveInPatientiveStem = (stem = "") => {
          const normalizedStem = String(stem || "");
          if (!customaryPresentPatientiveSelectedProjectiveObjectPrefix || !normalizedStem) {
            return normalizedStem;
          }
          return normalizedStem.startsWith(customaryPresentPatientiveSelectedProjectiveObjectPrefix) ? normalizedStem : `${customaryPresentPatientiveSelectedProjectiveObjectPrefix}${normalizedStem}`;
        };
        const shouldMoveCustomaryPresentNi = customaryPresentSubjectSuffix === "ni" || customaryPresentSubjectSuffix === "nit";
        const customaryPresentVerb = keepSelectedProjectiveInPatientiveStem(shouldMoveCustomaryPresentNi ? `${appliedMorphology.verb || ""}ni` : appliedMorphology.verb);
        const customaryPresentConnector = shouldMoveCustomaryPresentNi ? customaryPresentPluralSuffix : customaryPresentSubjectSuffix;
        appliedMorphology = {
          ...appliedMorphology,
          verb: customaryPresentVerb,
          subjectSuffix: customaryPresentConnector,
          formSpec: isNominalOutputProfile ? targetObject.buildLiteralNominalFormSpec(customaryPresentVerb, customaryPresentConnector) : appliedMorphology.formSpec,
          alternateForms: (appliedMorphology.alternateForms || []).map(form => {
            const formSubjectSuffix = String(form.subjectSuffix || "");
            const moveFormNi = formSubjectSuffix === "ni" || formSubjectSuffix === "nit";
            const formVerb = keepSelectedProjectiveInPatientiveStem(moveFormNi ? `${form.verb || ""}ni` : form.verb);
            const formConnector = moveFormNi ? customaryPresentPluralSuffix : formSubjectSuffix;
            return {
              ...form,
              verb: formVerb,
              subjectSuffix: formConnector,
              formSpec: isNominalOutputProfile ? targetObject.buildLiteralNominalFormSpec(formVerb, formConnector) : form.formSpec
            };
          })
        };
      }
      ({
        subjectPrefix: pers1Slot,
        objectPrefix: obj1Slot,
        subjectSuffix: pers2Slot,
        verb: troncoSlot
      } = appliedMorphology);
      const isPatientivoPossessed = tense === "patientivo" && Boolean(poseedorSlot);
      if (isPatientivoPossessed) {
        pers2Slot = targetObject.adjustPatientivoPossessiveSuffix(pers2Slot, true, patientivoOwnership, {
          stem: troncoSlot
        });
        if (pers2Slot === null) {
          return buildNuclearClauseSurfaceBlockedResult({
            result: {
              error: true
            },
            message: NUCLEAR_CLAUSE_SURFACE_NO_OUTPUT_MESSAGE,
            diagnosticId: "nuclear-clause-surface-patientivo-possessive-suffix-blocked",
            routeFamily: NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY,
            routeStage: "patientivo-possessive-suffix",
            resultMarker: null,
            override,
            resolvedTenseMode,
            tense,
            pers1: pers1Slot,
            pers2: "",
            obj1: obj1Slot,
            poseedor: poseedorSlot,
            verb: troncoSlot,
            renderVerb: troncoRender,
            isReflexive,
            resolvedDerivationMode,
            resolvedDerivationType,
            resolvedVoiceMode,
            enumerableContract: false
          });
        }
      }
      primaryFormSpec = appliedMorphology.formSpec || (isNominalOutputProfile ? targetObject.buildLiteralNominalFormSpec(troncoSlot, pers2Slot) : null);
      let formulaShellVerb = stripGeneratedVncFormulaTenseSuffix(formulaStemForSlots, tense, inputPers2);
      let formulaShellSubjectSuffix = "";
      const directionalFormulaFrame = buildGeneratedDirectionalFormulaFrame({
        directionalChainMeta: appliedMorphology?.directionalChainMeta || null,
        subjectPrefix: inputPers1,
        baseObjectPrefix: morphologyObj1Slot,
        formulaObjectPrefix: formulaObj1BeforeInflection,
        formulaReflexivePrefix: formulaReflexiveBeforeInflection
      });
      if (directionalFormulaFrame) {
        formulaShellVerb = stripGeneratedDirectionalPrefixFromFormulaStem(formulaShellVerb, appliedMorphology?.directionalChainMeta || null);
        formulaObj1BeforeInflection = isReflexive ? "" : directionalFormulaFrame.formulaObj1;
        formulaReflexiveBeforeInflection = isReflexive ? directionalFormulaFrame.formulaReflexive || formulaReflexiveBeforeInflection : formulaReflexiveBeforeInflection;
      }
      let formulaShellCapturedFromStemCandidate = false;
      if (isNominalOutputProfile && isPatientivoPossessed) {
        primaryFormSpec = targetObject.withNominalFormSpecSuffix(primaryFormSpec, pers2Slot, {
          verb: troncoSlot,
          subjectSuffix: pers2Slot
        });
      }
      const alternateForms = (appliedMorphology.alternateForms || []).map(form => {
        if (!form) {
          return form;
        }
        if (!isPatientivoPossessed) {
          return isNominalOutputProfile ? targetObject.normalizeNominalFormEntry(form, {
            subjectSuffix: pers2Slot
          }) : form;
        }
        const adjustedSubjectSuffix = targetObject.adjustPatientivoPossessiveSuffix(form.subjectSuffix ?? pers2Slot, true, patientivoOwnership, {
          stem: form.verb
        });
        return {
          ...form,
          subjectSuffix: adjustedSubjectSuffix,
          formSpec: isNominalOutputProfile ? targetObject.withNominalFormSpecSuffix(form.formSpec || null, adjustedSubjectSuffix, {
            verb: form.verb,
            subjectSuffix: adjustedSubjectSuffix
          }) : form.formSpec
        };
      }).filter(form => form && form.subjectSuffix !== null);
      const preteritCnvConnectorProfile = buildGeneratedPreteritCnvConnectorProfile({
        tense,
        primaryVerb: appliedMorphology?.verb || "",
        alternateForms,
        sourceSubjectSuffix: inputPers2
      });
      let stemProvenance = appliedMorphology.stemProvenance || null;
      const verbstemClassProfile = stemProvenance?.verbstemClassProfile || (typeof targetObject.buildVncVerbstemClassProfileFromProvenance === "function" ? targetObject.buildVncVerbstemClassProfileFromProvenance(stemProvenance) : null);
      if (stemProvenance && verbstemClassProfile && !stemProvenance.verbstemClassProfile) {
        stemProvenance = {
          ...stemProvenance,
          verbstemClassProfile
        };
      }
      let forms = [];
      const embeddedPrefix = targetObject.getEmbeddedVerbPrefix(parsedVerb);
      const stemMorphologyArgs = {
        baseMorphologyInput,
        directionalPrefix,
        embeddedPrefix,
        shouldApplyDerivedAllomorphy,
        isPassiveImpersonalMode,
        parsedVerb,
        obj2: indirectObjectMarker,
        obj3: thirdObjectMarker,
        isNominalOutputProfile,
        tense,
        poseedor: poseedorSlot,
        patientivoOwnership
      };
      const stemCollectionPool = targetObject.resolveStemCollectionPool({
        isNonactive,
        nonactiveAllStems,
        nonactiveAllStemSpecs,
        resolvedDerivationType,
        causativeAllStems,
        applicativeAllStems,
        causativeAllStemSpecs,
        applicativeAllStemSpecs
      });
      if (
        canonicalNonactiveStemFrame?.authorizationStatus === "authorized"
        && canonicalNonactiveStemFrame.wordRealization
      ) {
        const canonicalSurfaceRecord = {
          surface: canonicalNonactiveStemFrame.wordRealization,
          segments: (
            canonicalNonactiveStemFrame.finiteSurfaceFrame
              ?.orderedMorphemes || []
          ).filter(
            morpheme => Boolean(morpheme?.surface)
          ).map(
            morpheme => ({
              role: morpheme.slotRole || morpheme.slotId || "morph",
              slot: morpheme.slotId || morpheme.slotRole || "morph",
              value: morpheme.surface
            })
          )
        };
        collectGeneratedOutputSurfaceRecord(canonicalSurfaceRecord);
        pushGeneratedSurfaceForm(canonicalSurfaceRecord);
      } else if (Array.isArray(stemCollectionPool) && stemCollectionPool.length > 1) {
        stemCollectionPool.forEach(stemCandidate => {
          const candidateTypedMorphResultFrame = buildGeneratedTypedMorphResultFrame({
            subjectPrefix: inputPers1,
            objectPrefix: morphologyObj1Slot,
            subjectSuffix: inputPers2,
            predicateStem: formulaStemForSlots,
            stemCandidate,
            morphologyInput: baseMorphologyInput
          });
          const morphResult = targetObject.resolveStemCandidateMorphologyResult({
            stemCandidate,
            ...stemMorphologyArgs
          });
          if (!morphResult) {
            return;
          }
          if (!formulaShellCapturedFromStemCandidate) {
            formulaShellVerb = candidateTypedMorphResultFrame?.formulaProjectionInput?.predicateStem
              || formulaShellVerb;
            if (directionalFormulaFrame) {
              formulaShellVerb = stripGeneratedDirectionalPrefixFromFormulaStem(
                formulaShellVerb,
                morphResult.directionalChainMeta || appliedMorphology?.directionalChainMeta || null
              );
            }
            formulaShellSubjectSuffix = "";
            formulaShellCapturedFromStemCandidate = true;
            selectedTypedMorphResultFrame = candidateTypedMorphResultFrame || selectedTypedMorphResultFrame;
          }
          const baseText = buildSurfaceFromSlotParts({
            pers1Slot: morphResult.pers1,
            obj1Slot: morphResult.obj1,
            pers2Slot: morphResult.pers2,
            troncoSlot: morphResult.verb,
            formSpec: morphResult.formSpec,
            trailingSuffix: morphResult.trailingSuffix || "",
            directionalChainMeta: morphResult.directionalChainMeta,
            surfaceRuleMeta: mergeSurfaceRuleMeta(morphResult.surfaceRuleMeta)
          });
          pushGeneratedSurfaceForm(baseText);
          morphResult.alternateForms.forEach(form => {
            if (!form || !form.verb) {
              return;
            }
            const altText = buildSurfaceFromSlotParts({
              pers1Slot: morphResult.pers1,
              obj1Slot: form.surfaceObjectPrefix ?? morphResult.obj1,
              pers2Slot: form.subjectSuffix,
              troncoSlot: form.verb,
              formSpec: form.formSpec,
              trailingSuffix: form.trailingSuffix || "",
              directionalChainMeta: morphResult.directionalChainMeta,
              surfaceRuleMeta: mergeSurfaceRuleMeta(morphResult.surfaceRuleMeta, form.surfaceRuleMeta)
            });
            pushGeneratedSurfaceForm(altText);
          });
        });
      } else {
        const baseText = buildSurfaceFromCurrentSlots();
        pushGeneratedSurfaceForm(baseText);
        alternateForms.forEach(form => {
          if (!form || !form.verb) {
            return;
          }
          const altText = buildSurfaceFromSlotParts({
            pers1Slot: pers1Slot,
            obj1Slot: form.surfaceObjectPrefix ?? obj1Slot,
            pers2Slot: form.subjectSuffix ?? pers2Slot,
            troncoSlot: form.verb,
            formSpec: form.formSpec || null,
            trailingSuffix: form.trailingSuffix || "",
            directionalChainMeta: appliedMorphology?.directionalChainMeta || null,
            surfaceRuleMeta: mergeSurfaceRuleMeta(appliedMorphology?.surfaceRuleMeta, form.surfaceRuleMeta)
          });
          pushGeneratedSurfaceForm(altText);
        });
      }
      const generatedOutputResultTextSourceFrame = buildGeneratedOutputResultTextSourceFrame({
        surfaceForms: forms,
        outputSurfaceRecords: generatedOutputSurfaceRecords
      });
      const generatedOutputResultTextOperationFrame = buildGeneratedOutputResultTextOperationFrame(generatedOutputResultTextSourceFrame);
      const generatedText = buildGeneratedOutputResultText(forms, {
        outputSurfaceRecords: generatedOutputSurfaceRecords,
        sourceFrame: generatedOutputResultTextSourceFrame,
        operationFrame: generatedOutputResultTextOperationFrame
      });
      const generatedSoundSpellingFrames = collectNuclearClauseSurfaceSoundSpellingFrames(generatedSurfaceSoundSpellingFrames, appliedMorphology?.soundSpellingFrames, appliedMorphology?.surfaceRuleMeta);
      if (!silent) {
        onComplete({
          textoGenerado: generatedText,
          analisisTronco: parsedVerb,
          procedenciaTronco: stemProvenance,
          tiempo: tense,
          troncoRender: troncoRender,
          obj1Base: baseObj1Slot
        });
      }
      let nominalClauseMetadata = isNominalOutputProfile ? buildGeneratedNominalNum1Num2Metadata({
        subjectSuffix: pers2Slot,
        nominalKind: tense,
        possessivePrefix: poseedorSlot,
        patientivoSource,
        sourceTense: appliedMorphology?.surfaceRuleMeta?.verbDerivedNominalResultMetadata?.nominalizationProfile?.source?.sourceTense || "",
        sourceCombinedMode: isNonactive ? targetObject.COMBINED_MODE.nonactive : "",
        actionNounStemUse,
        renderVerb: troncoRender,
        verb: troncoSlot,
        analysisVerb,
        sourceStem: parsedVerb?.analysisVerb || parsedVerb?.verb || "",
        patientiveSourceStageFrame: appliedMorphology?.surfaceRuleMeta?.patientivoSourceStageFrame || null,
        patientiveMultipleDerivationContract: appliedMorphology?.surfaceRuleMeta?.patientivoMultipleDerivationContract || null,
        sourceSubjectPrefix: inputPers1,
        sourceSubjectSuffix: inputPers2,
        formulaDisplayStem: appliedMorphology?.surfaceRuleMeta?.verbDerivedNominalResultMetadata?.formulaDisplayStem || "",
        instrumentivoImperfectActiveAbsolutiveException: appliedMorphology?.surfaceRuleMeta?.verbDerivedNominalResultMetadata?.instrumentivoImperfectActiveAbsolutiveException || null
      }) : {};
      const nominalMorphFormulaFrame = isNominalOutputProfile
        ? buildGeneratedNominalMorphFormulaFrame({
          tense,
          sourcePredicateStem: formulaShellVerb || formulaStemForSlots,
          parsedVerb,
          existingFormulaDisplayStem:
            nominalClauseMetadata?.formulaDisplayStem || "",
          sourceSubjectSuffix: inputPers2
        })
        : null;
      if (
        nominalMorphFormulaFrame?.authorizationStatus === "authorized"
        && nominalMorphFormulaFrame.predicateFormulaStem
      ) {
        const connector = String(
          nominalMorphFormulaFrame.numberConnector || ""
        );
        const [displayNum1 = "", displayNum2 = ""] =
          connector ? connector.split("-") : [];
        nominalClauseMetadata = {
          ...nominalClauseMetadata,
          formulaDisplayStem:
            nominalMorphFormulaFrame.predicateFormulaStem,
          nominalMorphFormulaFrame,
          ...(nominalMorphFormulaFrame.connectorOverrideRequired
            ? {
              num1Num2: {
                ...(nominalClauseMetadata?.num1Num2 || {}),
                displaySurface: connector,
                displayConnector: connector,
                displayDyad: connector,
                compactDisplay: connector,
                num1: displayNum1,
                num2: displayNum2,
                displayNum1,
                displayNum2,
                dyadSource:
                  "typed-nominal-morph-formula-frame"
              }
            }
            : {})
        };
        selectedTypedMorphResultFrame =
          buildGeneratedTypedMorphResultFrame({
            subjectPrefix: inputPers1,
            objectPrefix: morphologyObj1Slot,
            subjectSuffix: inputPers2,
            predicateStem:
              nominalMorphFormulaFrame.predicateFormulaStem,
            morphologyInput: baseMorphologyInput
          }) || selectedTypedMorphResultFrame;
      }
      const formulaPers1BeforeInflection = resolveGeneratedVncFormulaPers1BeforeInflection({
        tense,
        inputPers1,
        appliedMorphology,
        formulaStem: formulaShellVerb || formulaStemForSlots,
        hasFormulaValenceBeforeStem: Boolean(formulaObj1BeforeInflection || formulaObj2BeforeInflection || formulaObj3BeforeInflection || formulaReflexiveBeforeInflection)
      });
      let nuclearClauseShell = buildGeneratedNuclearClauseShellMetadata({
        resolvedTenseMode,
        tense,
        pers1: pers1Slot,
        pers2: pers2Slot,
        obj1: obj1Slot,
        obj2: indirectObjectMarker,
        obj3: thirdObjectMarker,
        isReflexive,
        verb: troncoSlot,
        renderVerb: troncoRender,
        formulaPers1: directionalFormulaFrame?.formulaPers1 ?? formulaPers1BeforeInflection,
        formulaPers2: "",
        formulaObj1: formulaObj1BeforeInflection,
        formulaObj2: formulaObj2BeforeInflection,
        formulaObj3: formulaObj3BeforeInflection,
        formulaReflexive: formulaReflexiveBeforeInflection,
        formulaDirectional: directionalFormulaFrame ? {
          prefix: directionalFormulaFrame.prefix,
          position: directionalFormulaFrame.position,
          allomorphy: {
            source: "huāl",
            surface: directionalFormulaFrame.prefix,
            directionFollowsObject: directionalFormulaFrame.directionFollowsObject === true
          }
        } : null,
        formulaVerb: formulaShellVerb,
        formulaSubjectSuffix: formulaShellSubjectSuffix,
        formulaNumberConnector: preteritCnvConnectorProfile?.primaryConnector || inputPers2,
        nominalClauseMetadata,
        typedMorphResultFrame: selectedTypedMorphResultFrame
      });
      if (
        canonicalNonactiveStemFrame?.authorizationStatus === "authorized"
        && canonicalNonactiveStemFrame.formulaRealization
      ) {
        nuclearClauseShell = {
          ...nuclearClauseShell,
          formulaEcho: canonicalNonactiveStemFrame.formulaRealization,
          canonicalTypedVncSlotFrame:
            canonicalNonactiveStemFrame.finiteSurfaceFrame?.typedFrame || null,
          formulaProjection: Object.freeze({
            kind: "generated-nuclear-clause-formula-projection",
            sourceKind: "classical-nahuatl-vnc-slot-frame",
            sourceSemanticIdentity:
              canonicalNonactiveStemFrame.finiteSurfaceFrame
                ?.typedFrame?.semanticIdentity || "",
            result: canonicalNonactiveStemFrame.formulaRealization,
            derivedFromWrittenProjection: false
          }),
          formulaDerivedFromWrittenProjection: false,
          writtenDerivedFromFormulaProjection: false
        };
      }
      const primaryOutputSurfaceRecord = generatedOutputSurfaceRecords.find(record => record.surface === forms[0]) || generatedOutputSurfaceRecords[0] || null;
      const generatedAndrewsSourceStem = String(parsedVerb?.analysisVerb || parsedVerb?.verb || analysisVerb || targetObject.verb || targetObject.renderVerb || formulaStemForSlots || troncoRender || troncoSlot || "").trim();
      const generatedAndrewsSourceFormulaEcho = buildCnvSourceFormulaEchoFromStem(generatedAndrewsSourceStem);
      const cnvFormulaSurfacePath = buildGeneratedCnvFormulaSurfacePath({
        nuclearClauseShell,
        sourcePredicateStem: generatedAndrewsSourceStem,
        surfaceRecord: primaryOutputSurfaceRecord,
        surfaceRecords: generatedOutputSurfaceRecords,
        soundSpellingFrames: generatedSoundSpellingFrames,
        sourceFormulaEcho: generatedAndrewsSourceFormulaEcho
      });
      nominalClauseMetadata = enrichGeneratedNominalClauseMetadataWithAndrewsRendering({
        nominalClauseMetadata,
        nuclearClauseShell,
        surfaceForms: forms,
        cnvFormulaSurfacePath,
        andrewsSourceFormulaEcho: generatedAndrewsSourceFormulaEcho
      });
      const generatedFormulaSurfacePairs = Array.isArray(nominalClauseMetadata?.nominalizationProfile?.operationalSuboperationFrame?.formulaSurfacePairs) && nominalClauseMetadata.nominalizationProfile.operationalSuboperationFrame.formulaSurfacePairs.length ? nominalClauseMetadata.nominalizationProfile.operationalSuboperationFrame.formulaSurfacePairs : Array.isArray(cnvFormulaSurfacePath?.formulaSurfacePairs) ? cnvFormulaSurfacePath.formulaSurfacePairs : [];
      const generatedTargetFormulaEchoes = generatedFormulaSurfacePairs.map(entry => String(entry?.targetFormulaEcho || "").trim()).filter(Boolean);
      const generatedSourceFormulaEchoes = generatedFormulaSurfacePairs.map(entry => String(entry?.sourceFormulaEcho || "").trim()).filter(Boolean);
      const generatedAndrewsFormulaEchoes = generatedFormulaSurfacePairs.map(entry => String(entry?.andrewsFormulaEcho || entry?.sourceFormulaEcho || "").trim()).filter(Boolean);
      const generatedConjugatorFormulaEchoes = generatedFormulaSurfacePairs.map(entry => String(entry?.conjugatorFormulaEcho || entry?.targetFormulaEcho || "").trim()).filter(Boolean);
      const generatedSourceToTargetFormulaEcho = generatedFormulaSurfacePairs.map(entry => String(entry?.sourceToTargetFormulaEcho || "").trim()).filter(Boolean).join(" | ");
      const generatedAndrewsToConjugatorFormulaEcho = generatedFormulaSurfacePairs.map(entry => String(entry?.andrewsToConjugatorFormulaEcho || entry?.sourceToTargetFormulaEcho || "").trim()).filter(Boolean).join(" | ");
      const rawSlotNameBridge = typeof targetObject.buildNuclearClauseSurfaceSlotNameBridge === "function" ? targetObject.buildNuclearClauseSurfaceSlotNameBridge(posicionesFormula) : null;
      const slotNameBridge = alignNuclearClauseSurfaceSlotNameBridgeToCnvFormulaSurfacePath(rawSlotNameBridge, cnvFormulaSurfacePath);
      const vncValencyFrame = buildGeneratedVncValencyFrameMetadata({
        resolvedTenseMode,
        pers1: pers1Slot,
        pers2: pers2Slot,
        obj1: obj1Slot,
        obj1Base: baseObj1Slot,
        obj2: indirectObjectMarker,
        obj3: thirdObjectMarker,
        parsedVerb,
        valencySummary,
        targetValency,
        isPassiveImpersonalMode,
        nuclearClauseShell
      });
      const adverbialFunctionSourceFormulaSlots = resolvedTenseMode === targetObject.TENSE_MODE.adverbio ? {
        obj1: {
          slot: "obj1",
          prefix: baseObj1Slot || obj1Slot,
          basePrefix: baseObj1Slot || obj1Slot,
          displayPrefix: baseObj1Slot || obj1Slot || "Ø"
        },
        obj2: {
          slot: "obj2",
          prefix: indirectObjectMarker,
          displayPrefix: indirectObjectMarker || "Ø"
        },
        obj3: {
          slot: "obj3",
          prefix: thirdObjectMarker,
          displayPrefix: thirdObjectMarker || "Ø"
        },
        reflexivo: {
          slot: "reflexivo",
          prefix: isReflexive ? "mo" : "",
          displayPrefix: isReflexive ? "mo" : "Ø"
        }
      } : null;
      const functionUseValenceGate = resolvedTenseMode === targetObject.TENSE_MODE.adverbio ? buildFunctionUseValenceObjectHardGate({
        override,
        posicionesFormula,
        sourceFrame: nuclearClauseShell,
        sourceFormulaSlots: adverbialFunctionSourceFormulaSlots || nuclearClauseShell?.formulaSlots || null,
        entradaGrammarObject,
        sourceKind: "verbal-nuclear-clause",
        currentVector: {
          obj1: baseObj1Slot || obj1Slot,
          obj2: indirectObjectMarker,
          obj3: thirdObjectMarker,
          reflexivo: isReflexive ? "mo" : ""
        },
        currentVectorOwnsValenceObjectSlots: true,
        gateContext: "adverbial-nuclear-function-use"
      }) : null;
      if (functionUseValenceGate?.status === "blocked") {
        return buildNuclearClauseSurfaceBlockedResult({
          result: {
            outputKind: "adverbial-nuclear-function",
            generationRoute: "adverbio",
            clauseKind: "verbal-nuclear-clause",
            result: "—",
            error: true,
            supported: false,
            surfaceForms: [],
            isReflexive,
            functionUseValenceGate,
            entradaGrammarObject
          },
          message: "La función no puede consumir, crear, mover ni reclasificar objeto/valencia antes de fijar el marco de valencia.",
          diagnosticId: functionUseValenceGate.diagnosticId,
          routeFamily: "adverbial-nuclear-function",
          routeStage: functionUseValenceGate.routeStage,
          resultMarker: "—",
          override,
          resolvedTenseMode,
          tense,
          pers1: pers1Slot,
          pers2: pers2Slot,
          obj1: obj1Slot,
          poseedor: poseedorSlot,
          posicionesFormula,
          verb: troncoSlot,
          renderVerb: troncoRender,
          entradaGrammarObject,
          isReflexive,
          resolvedDerivationMode,
          resolvedDerivationType,
          resolvedVoiceMode,
          nuclearClauseShell,
          vncValencyFrame,
          enumerableContract: false
        });
      }
      const derivedVoiceFrame = buildGeneratedDerivedVoiceFrameMetadata({
        resolvedTenseMode,
        resolvedDerivationMode,
        resolvedVoiceMode,
        isNonactive,
        isPassiveImpersonalMode,
        sourceValency,
        targetValency,
        valencySummary,
        parsedVerb,
        verb: troncoSlot,
        analysisVerb,
        pers1: pers1Slot,
        pers2: pers2Slot,
        obj1: obj1Slot,
        obj1Base: baseObj1Slot,
        hasPromotableObject,
        preserveSubjectForPassive,
        allowPassiveObject
      });
      const forwardDerivationFrame = buildGeneratedForwardDerivationFrameMetadata({
        resolvedTenseMode,
        resolvedDerivationType,
        derivationValencyDelta,
        sourceValency,
        forwardDerivations,
        forwardStemProvenance,
        causativeAllStems,
        applicativeAllStems,
        renderVerb: troncoRender,
        verb: troncoSlot,
        analysisVerb
      });
      const compoundFrame = buildGeneratedCompoundFrameMetadata({
        resolvedTenseMode,
        parsedVerb,
        nuclearClauseShell
      });
      const patientiveCompoundSourceFrame = buildGeneratedPatientiveCompoundSourceFrameMetadata({
        resolvedTenseMode,
        compoundFrame,
        nominalizationProfile: nominalClauseMetadata?.nominalizationProfile || null,
        nuclearClauseShell,
        surfaceForms: forms
      });
      const generatedAdverbialAdjunctionBoundaryFrame = buildGeneratedAdverbialAdjunctionBoundaryFrameMetadata({
        resolvedTenseMode,
        tense,
        renderVerb: troncoRender,
        verb: troncoSlot,
        analysisVerb
      });
      const formulaProjection = Object.freeze({
        kind: "generated-formula-projection",
        sourceKind: "generated-typed-morph-result-frame",
        sourceSemanticIdentity: selectedTypedMorphResultFrame?.semanticIdentity || "",
        result: String(nuclearClauseShell?.formulaEcho || ""),
        derivedFromWrittenProjection: false
      });
      const writtenProjection = Object.freeze({
        kind: "generated-written-projection",
        sourceKind: "generated-typed-morph-result-frame",
        sourceSemanticIdentity: selectedTypedMorphResultFrame?.semanticIdentity || "",
        result: generatedText,
        surfaceForms: Object.freeze(forms.slice()),
        derivedFromFormulaProjection: false
      });
      const resultPayload = {
        result: generatedText,
        surfaceForms: forms,
        isReflexive,
        stemProvenance,
        verbstemClassProfile,
        ...nominalClauseMetadata,
        nuclearClauseShell,
        typedMorphResultFrame: selectedTypedMorphResultFrame,
        canonicalNonactiveStemFrame,
        nominalMorphFormulaFrame,
        formulaProjection,
        writtenProjection,
        formulaDerivedFromWrittenProjection: false,
        writtenDerivedFromFormulaProjection: false,
        writtenCarrierParsingAllowedForFormula: false,
        vncValencyFrame,
        derivedVoiceFrame,
        forwardDerivationFrame,
        compoundFrame,
        patientiveCompoundSourceFrame,
        adverbialAdjunctionBoundaryFrame: generatedAdverbialAdjunctionBoundaryFrame || nominalClauseMetadata?.adverbialAdjunctionBoundaryFrame || null,
        functionUseValenceGate,
        cnvFormulaSurfacePath,
        formulaSurfacePairs: generatedFormulaSurfacePairs,
        sourceFormulaEcho: generatedSourceFormulaEchoes[0] || "",
        sourceFormulaEchoes: generatedSourceFormulaEchoes,
        andrewsFormulaEcho: generatedAndrewsFormulaEchoes[0] || "",
        andrewsFormulaEchoes: generatedAndrewsFormulaEchoes,
        targetFormulaEchoes: generatedTargetFormulaEchoes,
        conjugatorFormulaEcho: generatedConjugatorFormulaEchoes[0] || "",
        conjugatorFormulaEchoes: generatedConjugatorFormulaEchoes,
        sourceToTargetFormulaEcho: generatedSourceToTargetFormulaEcho,
        andrewsToConjugatorFormulaEcho: generatedAndrewsToConjugatorFormulaEcho,
        slotNameBridge,
        soundSpellingFrames: generatedSoundSpellingFrames,
        orthographyFrame: {
          soundSpellingFrames: generatedSoundSpellingFrames
        },
        entradaGrammarObject,
        generatedOutputResultTextSourceFrame,
        generatedOutputResultTextOperationFrame,
        posicionesFormula
      };
      const formalUnitKind = resolveNuclearClauseSurfaceUnitKind(resolvedTenseMode, tense);
      const grammarFrame = buildNuclearClauseSurfaceGrammarFrame({
        result: resultPayload,
        override,
        resolvedTenseMode,
        tense,
        routeFamily: resultPayload.generationRoute || nominalClauseMetadata?.nominalizationProfile?.role?.nominalizationKind || (resolvedTenseMode === targetObject.TENSE_MODE.verbo ? "vnc" : resolvedTenseMode),
        routeStage: "execute",
        unitKind: formalUnitKind,
        pers1: pers1Slot,
        pers2: pers2Slot,
        obj1: obj1Slot,
        poseedor: poseedorSlot,
        posicionesFormula,
        verb: troncoSlot,
        renderVerb: troncoRender,
        entradaGrammarObject,
        nuclearClauseShell,
        cnvFormulaSurfacePath,
        vncValencyFrame,
        resolvedDerivationMode,
        resolvedDerivationType,
        resolvedVoiceMode
      });
      const resultContract = buildNuclearClauseSurfaceResultContract(resultPayload, grammarFrame);
      const surfaceEngineContract = grammarFrame?.routeContract?.targetContract?.surfaceEngineContract || null;
      return {
        ...resultPayload,
        surfaceEngineContract,
        grammarFrame,
        ...resultContract
      };
    }
    const api = {};
    Object.defineProperty(api, "NUCLEAR_CLAUSE_SURFACE_NOOP", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_SURFACE_NOOP; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_SURFACE_ENGINE", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_SURFACE_ENGINE; },
    });
    Object.defineProperty(api, "FUNCTION_USE_VALENCE_OBJECT_GATE_DIAGNOSTIC_ID", {
        configurable: true,
        enumerable: true,
        get() { return FUNCTION_USE_VALENCE_OBJECT_GATE_DIAGNOSTIC_ID; },
    });
    Object.defineProperty(api, "FUNCTION_USE_VALENCE_OBJECT_GATE_ROUTE_STAGE", {
        configurable: true,
        enumerable: true,
        get() { return FUNCTION_USE_VALENCE_OBJECT_GATE_ROUTE_STAGE; },
    });
    Object.defineProperty(api, "FUNCTION_USE_VALENCE_OBJECT_SLOTS", {
        configurable: true,
        enumerable: true,
        get() { return FUNCTION_USE_VALENCE_OBJECT_SLOTS; },
    });
    api.normalizeNuclearClauseSurfaceTenseValue = normalizeNuclearClauseSurfaceTenseValue;
    api.resolveNuclearClauseSurfaceUiHook = resolveNuclearClauseSurfaceUiHook;
    api.normalizeFunctionUseValenceObjectSlot = normalizeFunctionUseValenceObjectSlot;
    api.getFunctionUseValenceObjectSlotValue = getFunctionUseValenceObjectSlotValue;
    api.normalizeFunctionUseValenceObjectVector = normalizeFunctionUseValenceObjectVector;
    api.mergeFunctionUseValenceObjectVector = mergeFunctionUseValenceObjectVector;
    api.getFunctionUseValenceObjectFormulaSlotId = getFunctionUseValenceObjectFormulaSlotId;
    api.collectFunctionUseValenceObjectVectorFromFormulaSlots = collectFunctionUseValenceObjectVectorFromFormulaSlots;
    api.functionUseFormulaSlotsCoverValenceObjectFrame = functionUseFormulaSlotsCoverValenceObjectFrame;
    api.collectFunctionUseValenceObjectVectorFromEntradaGrammarObject = collectFunctionUseValenceObjectVectorFromEntradaGrammarObject;
    api.entradaGrammarObjectHasFunctionUseFixedValenceEvidence = entradaGrammarObjectHasFunctionUseFixedValenceEvidence;
    api.collectFunctionUseValenceObjectVectorFromFrame = collectFunctionUseValenceObjectVectorFromFrame;
    api.frameHasFunctionUseFixedValenceEvidence = frameHasFunctionUseFixedValenceEvidence;
    api.hasFunctionUseValenceObjectValues = hasFunctionUseValenceObjectValues;
    api.getFunctionUseValenceObjectSignature = getFunctionUseValenceObjectSignature;
    api.getFunctionUseValenceObjectDifferences = getFunctionUseValenceObjectDifferences;
    api.functionUseValenceObjectVectorCovers = functionUseValenceObjectVectorCovers;
    api.isFunctionUseFixedValenceFrame = isFunctionUseFixedValenceFrame;
    api.getFunctionUseValenceSourceKind = getFunctionUseValenceSourceKind;
    api.isFunctionUseValenceSourceVerbal = isFunctionUseValenceSourceVerbal;
    api.buildFunctionUseValenceObjectHardGate = buildFunctionUseValenceObjectHardGate;
    Object.defineProperty(api, "NUCLEAR_CLAUSE_SURFACE_NO_OUTPUT_MESSAGE", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_SURFACE_NO_OUTPUT_MESSAGE; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_SURFACE_ROUTE_FAMILY; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_SURFACE_ROUTE_BLOCKED_ID", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_SURFACE_ROUTE_BLOCKED_ID; },
    });
    Object.defineProperty(api, "LESSON6_DIRECT_CLASSICAL_OBJECT_DYAD_BY_PREFIX", {
        configurable: true,
        enumerable: true,
        get() { return LESSON6_DIRECT_CLASSICAL_OBJECT_DYAD_BY_PREFIX; },
    });
    Object.defineProperty(api, "LESSON6_MONADIC_DIRECT_CLASSICAL_OBJECTS", {
        configurable: true,
        enumerable: true,
        get() { return LESSON6_MONADIC_DIRECT_CLASSICAL_OBJECTS; },
    });
    Object.defineProperty(api, "NUCLEAR_CLAUSE_SURFACE_ENGINE_INVARIANTS", {
        configurable: true,
        enumerable: true,
        get() { return NUCLEAR_CLAUSE_SURFACE_ENGINE_INVARIANTS; },
    });
    api.getDirectClassicalReflexiveDyadForStem = getDirectClassicalReflexiveDyadForStem;
    Object.defineProperty(api, "LESSON6_DIRECT_CLASSICAL_DYAD_SPLIT_FRAMES", {
        configurable: true,
        enumerable: true,
        get() { return LESSON6_DIRECT_CLASSICAL_DYAD_SPLIT_FRAMES; },
    });
    api.cloneLesson6DirectClassicalDyadSplitFrame = cloneLesson6DirectClassicalDyadSplitFrame;
    api.buildDirectClassicalDyadSourceFrame = buildDirectClassicalDyadSourceFrame;
    api.buildDirectClassicalDyadOperationFrame = buildDirectClassicalDyadOperationFrame;
    api.getDirectClassicalDyadFrameMismatch = getDirectClassicalDyadFrameMismatch;
    api.splitLesson6DirectClassicalDyad = splitLesson6DirectClassicalDyad;
    api.getDirectClassicalObjectDyadFrame = getDirectClassicalObjectDyadFrame;
    api.getDirectClassicalFormulaObjectPrefix = getDirectClassicalFormulaObjectPrefix;
    api.getGeneratedHualDirectionalFormulaObjectPrefix = getGeneratedHualDirectionalFormulaObjectPrefix;
    api.buildGeneratedHualDirectionalFormulaFrame = buildGeneratedHualDirectionalFormulaFrame;
    api.buildGeneratedDirectionalFormulaFrame = buildGeneratedDirectionalFormulaFrame;
    api.stripGeneratedDirectionalPrefixFromFormulaStem = stripGeneratedDirectionalPrefixFromFormulaStem;
    api.getNuclearClauseSurfaceEngineInvariants = getNuclearClauseSurfaceEngineInvariants;
    api.buildNuclearClauseSurfaceEngineContract = buildNuclearClauseSurfaceEngineContract;
    api.normalizeNuclearClauseSurfaceContractSurface = normalizeNuclearClauseSurfaceContractSurface;
    api.splitNuclearClauseSurfaceContractText = splitNuclearClauseSurfaceContractText;
    api.getNuclearClauseSurfaceResultFrame = getNuclearClauseSurfaceResultFrame;
    api.getNuclearClauseSurfaceResultFramePayload = getNuclearClauseSurfaceResultFramePayload;
    api.resolveNuclearClauseSurfaceContractSurface = resolveNuclearClauseSurfaceContractSurface;
    api.resolveNuclearClauseSurfaceResultFrameSurface = resolveNuclearClauseSurfaceResultFrameSurface;
    api.resolveNuclearClauseSurfaceNominalConnectorSurface = resolveNuclearClauseSurfaceNominalConnectorSurface;
    api.resolveNuclearClauseSurfaceNominalConnectorDisplaySurface = resolveNuclearClauseSurfaceNominalConnectorDisplaySurface;
    api.resolveNuclearClauseSurfaceFrameSourceInput = resolveNuclearClauseSurfaceFrameSourceInput;
    api.getNuclearClauseSurfaceSoundSpellingFrameKey = getNuclearClauseSurfaceSoundSpellingFrameKey;
    api.collectNuclearClauseSurfaceSoundSpellingFrames = collectNuclearClauseSurfaceSoundSpellingFrames;
    Object.defineProperty(api, "CNV_FORMULA_SURFACE_SLOT_ROLES", {
        configurable: true,
        enumerable: true,
        get() { return CNV_FORMULA_SURFACE_SLOT_ROLES; },
    });
    api.normalizeCnvSurfacePathSegments = normalizeCnvSurfacePathSegments;
    api.getCnvSurfacePathSegmentValue = getCnvSurfacePathSegmentValue;
    api.splitGeneratedPreteritCnvFoldedConnector = splitGeneratedPreteritCnvFoldedConnector;
    api.buildGeneratedPreteritCnvConnectorProfile = buildGeneratedPreteritCnvConnectorProfile;
    api.getGeneratedPreteritFoldedObjectPrefix = getGeneratedPreteritFoldedObjectPrefix;
    api.isGeneratedClassPerfectiveFormulaTense = isGeneratedClassPerfectiveFormulaTense;
    api.getGeneratedClassPerfectiveFormulaBaseCandidates = getGeneratedClassPerfectiveFormulaBaseCandidates;
    api.getGeneratedClassPerfectiveSurfaceCore = getGeneratedClassPerfectiveSurfaceCore;
    api.getGeneratedClassPerfectiveFormulaObjectCandidates = getGeneratedClassPerfectiveFormulaObjectCandidates;
    api.getGeneratedClassPerfectiveFormulaSourceSignature = getGeneratedClassPerfectiveFormulaSourceSignature;
    api.buildGeneratedClassPerfectiveFormulaSourceFrame = buildGeneratedClassPerfectiveFormulaSourceFrame;
    api.buildGeneratedClassPerfectiveFormulaOperationFrame = buildGeneratedClassPerfectiveFormulaOperationFrame;
    api.getGeneratedClassPerfectiveFormulaFrameMismatch = getGeneratedClassPerfectiveFormulaFrameMismatch;
    api.buildGeneratedClassPerfectiveFormulaProfile = buildGeneratedClassPerfectiveFormulaProfile;
    api.stripCnvFormulaSurfacePrefix = stripCnvFormulaSurfacePrefix;
    api.stripCnvFormulaSurfacePrefixWithTrace = stripCnvFormulaSurfacePrefixWithTrace;
    api.getCnvFormulaFoldableBasePrefixes = getCnvFormulaFoldableBasePrefixes;
    api.getCnvFormulaFoldableBasePrefixEntries = getCnvFormulaFoldableBasePrefixEntries;
    api.stripCnvFormulaPreteritFoldedBasePrefixesWithTrace = stripCnvFormulaPreteritFoldedBasePrefixesWithTrace;
    api.stripCnvFormulaPreteritFoldedBasePrefixes = stripCnvFormulaPreteritFoldedBasePrefixes;
    api.buildCnvFormulaAspectSurfaceSlots = buildCnvFormulaAspectSurfaceSlots;
    api.stripCnvFormulaSurfaceSuffixWithTrace = stripCnvFormulaSurfaceSuffixWithTrace;
    api.splitCnvFormulaPreteritConnectorSuffix = splitCnvFormulaPreteritConnectorSuffix;
    api.getCnvFormulaSourceStemVariants = getCnvFormulaSourceStemVariants;
    api.scoreCnvFormulaSourceStemVariant = scoreCnvFormulaSourceStemVariant;
    api.getCnvFormulaSourceStemVariantRelation = getCnvFormulaSourceStemVariantRelation;
    api.hasCnvFormulaValencePrefix = hasCnvFormulaValencePrefix;
    api.resolveCnvFormulaPreteritPredicateCore = resolveCnvFormulaPreteritPredicateCore;
    api.normalizeCnvFormulaMorphForSurface = normalizeCnvFormulaMorphForSurface;
    api.getCnvFormulaSlotDisplayMorph = getCnvFormulaSlotDisplayMorph;
    api.splitCnvFormulaSubslots = splitCnvFormulaSubslots;
    api.getCnvFormulaObjectMorph = getCnvFormulaObjectMorph;
    api.getCnvFormulaObjectFunctionalSubslots = getCnvFormulaObjectFunctionalSubslots;
    api.buildCnvFormulaAndrewsPathSlots = buildCnvFormulaAndrewsPathSlots;
    api.getCnvFormulaSurfacePathFrames = getCnvFormulaSurfacePathFrames;
    api.getCnvFormulaSurfacePathRecordKey = getCnvFormulaSurfacePathRecordKey;
    api.getCnvFormulaSurfacePathSlot = getCnvFormulaSurfacePathSlot;
    api.buildCnvSourceFormulaEchoFromStem = buildCnvSourceFormulaEchoFromStem;
    api.getCnvFormulaPathSegmentLetters = getCnvFormulaPathSegmentLetters;
    api.buildCnvFormulaRealizationSegmentFrames = buildCnvFormulaRealizationSegmentFrames;
    api.isCnvFormulaSurfacePathCollapsedDirectional = isCnvFormulaSurfacePathCollapsedDirectional;
    api.buildCnvFormulaSurfacePairs = buildCnvFormulaSurfacePairs;
    api.buildGeneratedCnvFormulaSurfacePath = buildGeneratedCnvFormulaSurfacePath;
    api.alignNuclearClauseSurfaceSlotNameBridgeToCnvFormulaSurfacePath = alignNuclearClauseSurfaceSlotNameBridgeToCnvFormulaSurfacePath;
    api.buildNuclearClauseSurfaceDiagnosticEntry = buildNuclearClauseSurfaceDiagnosticEntry;
    api.getNuclearClauseSurfaceFailedLayerContract = getNuclearClauseSurfaceFailedLayerContract;
    api.normalizeNuclearClauseSurfaceDiagnosticEntries = normalizeNuclearClauseSurfaceDiagnosticEntries;
    api.resolveNuclearClauseSurfaceUnitKind = resolveNuclearClauseSurfaceUnitKind;
    api.getNuclearClauseSurfaceCanonicalRealizationSurfaceForms = getNuclearClauseSurfaceCanonicalRealizationSurfaceForms;
    api.normalizeGrammarFrameSurfaceForms = normalizeGrammarFrameSurfaceForms;
    api.collectGrammarFrameRefsFromObject = collectGrammarFrameRefsFromObject;
    api.getNuclearClauseSurfaceSourceEvidenceBoundaries = getNuclearClauseSurfaceSourceEvidenceBoundaries;
    api.mergeNuclearClauseSurfaceSourceEvidence = mergeNuclearClauseSurfaceSourceEvidence;
    api.buildNuclearClauseSurfaceOverrideSourceEvidence = buildNuclearClauseSurfaceOverrideSourceEvidence;
    api.collectGrammarFrameAndrewsRefs = collectGrammarFrameAndrewsRefs;
    api.resolveGrammarFrameSourceEvidence = resolveGrammarFrameSourceEvidence;
    api.resolveGrammarFrameAstFrame = resolveGrammarFrameAstFrame;
    api.cloneNuclearClauseSurfaceRouteFrame = cloneNuclearClauseSurfaceRouteFrame;
    api.resolveNuclearClauseSurfaceSourceRouteFrame = resolveNuclearClauseSurfaceSourceRouteFrame;
    api.buildNuclearClauseSurfaceGrammarFrame = buildNuclearClauseSurfaceGrammarFrame;
    api.buildNuclearClauseSurfaceResultContract = buildNuclearClauseSurfaceResultContract;
    api.getGeneratedTypedStemCandidateCarrier = getGeneratedTypedStemCandidateCarrier;
    api.buildGeneratedTypedMorphResultFrame = buildGeneratedTypedMorphResultFrame;
    api.stripGeneratedVncFormulaTenseSuffix = stripGeneratedVncFormulaTenseSuffix;
    api.resolveGeneratedVncFormulaPers1BeforeInflection = resolveGeneratedVncFormulaPers1BeforeInflection;
    api.buildNuclearClauseSurfaceBlockedResult = buildNuclearClauseSurfaceBlockedResult;
    api.buildGeneratedNuclearClauseShellMetadata = buildGeneratedNuclearClauseShellMetadata;
    api.buildGeneratedVncValencyFrameMetadata = buildGeneratedVncValencyFrameMetadata;
    api.buildGeneratedDerivedVoiceFrameMetadata = buildGeneratedDerivedVoiceFrameMetadata;
    api.getGeneratedForwardDerivationLabel = getGeneratedForwardDerivationLabel;
    api.resolveForwardDerivationMetadataStemSurface = resolveForwardDerivationMetadataStemSurface;
    api.buildGeneratedForwardDerivationFrameMetadata = buildGeneratedForwardDerivationFrameMetadata;
    api.buildGeneratedCompoundFrameMetadata = buildGeneratedCompoundFrameMetadata;
    api.getGeneratedCompoundFinalFormulaShape = getGeneratedCompoundFinalFormulaShape;
    api.getGeneratedCompoundExternalObjectSlots = getGeneratedCompoundExternalObjectSlots;
    api.buildGeneratedCompoundObjectSlotOwnershipFrame = buildGeneratedCompoundObjectSlotOwnershipFrame;
    api.buildGeneratedCompoundRouteFrameMetadata = buildGeneratedCompoundRouteFrameMetadata;
    api.buildGeneratedPatientiveCompoundSourceFrameMetadata = buildGeneratedPatientiveCompoundSourceFrameMetadata;
    api.getAdverbialNuclearRouteFrameObjectSlots = getAdverbialNuclearRouteFrameObjectSlots;
    api.buildAdverbialNuclearFunctionRouteFrame = buildAdverbialNuclearFunctionRouteFrame;
    api.buildGeneratedPlaceGentilicNncBoundaryFrameMetadata = buildGeneratedPlaceGentilicNncBoundaryFrameMetadata;
    api.buildGeneratedAdverbialAdjunctionBoundaryFrameMetadata = buildGeneratedAdverbialAdjunctionBoundaryFrameMetadata;
     api.buildGeneratedNominalNum1Num2Metadata = buildGeneratedNominalNum1Num2Metadata;
    api.enrichGeneratedNominalClauseMetadataWithAndrewsRendering = enrichGeneratedNominalClauseMetadataWithAndrewsRendering;
    api.buildGeneratedPreteritAgentiveFormulaStem = buildGeneratedPreteritAgentiveFormulaStem;
    api.buildGeneratedPreteritAgentiveFormulaDisplayStem = buildGeneratedPreteritAgentiveFormulaDisplayStem;
    api.joinGeneratedNominalStemFormulaPieces = joinGeneratedNominalStemFormulaPieces;
    api.normalizeGeneratedNominalFormulaPathSource = normalizeGeneratedNominalFormulaPathSource;
    api.getGeneratedNominalFormulaSourceSignature = getGeneratedNominalFormulaSourceSignature;
    api.buildGeneratedNominalFormulaSourceFrame = buildGeneratedNominalFormulaSourceFrame;
    api.buildGeneratedNominalFormulaOperationFrame = buildGeneratedNominalFormulaOperationFrame;
    api.getGeneratedNominalFormulaFrameMismatch = getGeneratedNominalFormulaFrameMismatch;
    api.buildGeneratedNominalFormulaFromSurfacePath = buildGeneratedNominalFormulaFromSurfacePath;
    api.buildGeneratedNominalFormulaFromSource = buildGeneratedNominalFormulaFromSource;
    api.buildGeneratedNominalFormulaSurfacePairs = buildGeneratedNominalFormulaSurfacePairs;
    api.normalizeGeneratedOutputResultTextRecords = normalizeGeneratedOutputResultTextRecords;
    api.getGeneratedOutputResultTextSourceSignature = getGeneratedOutputResultTextSourceSignature;
    api.buildGeneratedOutputResultTextSourceFrame = buildGeneratedOutputResultTextSourceFrame;
    api.buildGeneratedOutputResultTextOperationFrame = buildGeneratedOutputResultTextOperationFrame;
    api.validateGeneratedOutputResultTextOperationFrame = validateGeneratedOutputResultTextOperationFrame;
    api.buildGeneratedOutputResultText = buildGeneratedOutputResultText;
    api.executeNuclearClauseSurfaceRequest = executeNuclearClauseSurfaceRequest;
    return api;
}

export function installGenerationEngineGlobals(targetObject = globalThis, installationContext = null) {
    const api = createGenerationEngineGlobals(targetObject, installationContext);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
