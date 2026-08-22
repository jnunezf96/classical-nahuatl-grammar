// Canonical modern ESM module.

export function createClassicalNahuatlLaterLayersRuntime(targetObject = globalThis) {
    const CLASSICAL_NAHUATL_LESSON25_LATER_LAYERS_VERSION = 1;
    const CLASSICAL_NAHUATL_LESSON25_SOURCE_DOCUMENT = "ANDREWS_TRANSCRIPTION_CANVAS.md";
    const CLASSICAL_NAHUATL_VNC_FINITE_SURFACE_KIND = "classical-nahuatl-vnc-finite-surface-frame";
    const CLASSICAL_NAHUATL_LESSONS2425_CANVAS_CITATION_PROJECTION_KIND = "classical-nahuatl-derived-vnc-canvas-citation-projection-frame";
    const CLASSICAL_NAHUATL_LESSONS2425_CANVAS_CITATION_INVENTORY_KIND = "classical-nahuatl-derived-vnc-canvas-citation-projection-inventory";
    const CLASSICAL_NAHUATL_LESSONS2425_CANVAS_SCHEMATIC_CITATION_POSSIBILITY_INVENTORY_KIND = "classical-nahuatl-derived-vnc-canvas-schematic-citation-possibility-inventory";
    const CLASSICAL_NAHUATL_LESSONS2425_CANVAS_SCHEMATIC_CAUSATIVE_PROFILES = Object.freeze([
      Object.freeze({ profileId: "specific-projective-distinct", causativeObjectKind: "specific-projective", targetSubject: "1sg", schematicCitationRole: "" }),
      Object.freeze({ profileId: "nonspecific-human", causativeObjectKind: "specific-projective", targetSubject: "1sg", schematicCitationRole: "tē" }),
      Object.freeze({ profileId: "nonspecific-nonhuman", causativeObjectKind: "specific-projective", targetSubject: "1sg", schematicCitationRole: "tla" }),
      Object.freeze({ profileId: "coreferential-reflexive", causativeObjectKind: "reflexive", targetSubject: "3sg", schematicCitationRole: "" })
    ]);
    const CLASSICAL_NAHUATL_LESSONS2425_CANVAS_SURFACE_FORBIDDEN_FIELDS = Object.freeze([
      "citationRealization",
      "expected",
      "formula",
      "result",
      "sourcePredicateQuantityFrame",
      "sourceWordRealization",
      "surface",
      "target",
      "targetCitation",
      "targetSurface",
      "targetWord",
      "word",
      "wordRealization"
    ]);

    function getClassicalNahuatlDerivedVncRuntimeTarget() {
      return typeof targetObject !== "undefined" && targetObject || (typeof globalThis !== "undefined" ? globalThis : null);
    }
    function normalizeClassicalNahuatlDerivedVncToken(value = "") {
      return String(value == null ? "" : value).trim();
    }
    function normalizeClassicalNahuatlKey(value = "") {
      return normalizeClassicalNahuatlDerivedVncToken(value).toLowerCase().replace(/[\s_]+/gu, "-");
    }
    function stableSerializeClassicalNahuatlLesson25Value(value) {
      if (value === null) {
        return "null";
      }
      if (Array.isArray(value)) {
        return `[${value.map(stableSerializeClassicalNahuatlLesson25Value).join(",")}]`;
      }
      if (typeof value === "object") {
        return `{${Object.keys(value).sort().filter(key => value[key] !== undefined).map(key => `${JSON.stringify(key)}:${stableSerializeClassicalNahuatlLesson25Value(value[key])}`).join(",")}}`;
      }
      return JSON.stringify(value);
    }
    function signClassicalNahuatlLesson25Value(value) {
      const serialized = stableSerializeClassicalNahuatlLesson25Value(value);
      let hash = 2166136261;
      for (let index = 0; index < serialized.length; index += 1) {
        hash ^= serialized.charCodeAt(index);
        hash = Math.imul(hash, 16777619);
      }
      return `v1:${(hash >>> 0).toString(16).padStart(8, "0")}`;
    }
    function areClassicalNahuatlLesson25ValuesEqual(left, right) {
      return stableSerializeClassicalNahuatlLesson25Value(left) === stableSerializeClassicalNahuatlLesson25Value(right);
    }
    function haveSameClassicalNahuatlLesson25OwnPropertyNames(left = null, right = null) {
      if (!left || !right || typeof left !== "object" || typeof right !== "object") {
        return false;
      }
      const leftNames = Object.getOwnPropertyNames(left).sort();
      const rightNames = Object.getOwnPropertyNames(right).sort();
      return areClassicalNahuatlLesson25ValuesEqual(leftNames, rightNames);
    }
    function freezeClassicalNahuatlLesson25Value(value) {
      if (!value || typeof value !== "object" || Object.isFrozen(value)) {
        return value;
      }
      Object.values(value).forEach(freezeClassicalNahuatlLesson25Value);
      return Object.freeze(value);
    }
    function getClassicalNahuatlFinalTypedVncSlotFrame(machineryFrame = null) {
      return machineryFrame?.finalTypedVncSlotFrame
        || machineryFrame?.proofFrame?.conclusion?.finalTypedVncSlotFrame
        || machineryFrame?.proofFrame?.conclusion?.finalBoundaryRealizationFrame?.typedSlotFrame
        || machineryFrame?.targetTypedVncSlotFrame
        || null;
    }
    function getClassicalNahuatlTypedCarrierSurface(carrier = "") {
      const silent = new Set(["", "0", "Ø", "⎕"]);
      return normalizeClassicalNahuatlDerivedVncToken(carrier)
        .split("-")
        .map(segment => segment.trim())
        .filter(segment => !silent.has(segment))
        .join("");
    }
    function getClassicalNahuatlVncFollowingSoundedCarrier(carriers = [], index = -1, predicateStem = "") {
      for (let nextIndex = index + 1; nextIndex < carriers.length; nextIndex += 1) {
        if (getClassicalNahuatlTypedCarrierSurface(carriers[nextIndex])) {
          return carriers[nextIndex];
        }
      }
      return predicateStem;
    }
    function buildClassicalNahuatlTypedVncBoundaryFrame(typedFrame = null) {
      const runtimeTarget = getClassicalNahuatlDerivedVncRuntimeTarget();
      if (typeof runtimeTarget?.isClassicalNahuatlVncSlotFrame !== "function" || runtimeTarget.isClassicalNahuatlVncSlotFrame(typedFrame) !== true) {
        return null;
      }
      const slots = typedFrame.slots;
      const prePredicateCarriers = slots.prePredicate.map(slot => slot.carrier);
      const participantEntries = slots.prePredicate.map((slot, index) => ({
        slotId: slot.id || `valence-${index + 1}`,
        carrier: slot.carrier,
        slot,
        position: slot.objectPositionFrame || null
      }));
      const participantSurfaces = participantEntries.map((entry, index) => realizeClassicalNahuatlLessons2425CanvasCarrier(
        entry.carrier,
        entry.position,
        getClassicalNahuatlVncFollowingSoundedCarrier(prePredicateCarriers, index, slots.predicate.stem)
      ));
      const predicateSurface = getClassicalNahuatlTypedCarrierSurface(slots.predicate.stem);
      const followingSurface = participantSurfaces.find(Boolean) || predicateSurface;
      let subjectSurface = [slots.subject.pers1, slots.subject.pers2].map(getClassicalNahuatlTypedCarrierSurface).join("");
      if (["n", "t"].includes(subjectSurface) && followingSurface && !isClassicalNahuatlCanvasVowelSound(followingSurface)) {
        subjectSurface = `${subjectSurface}i`;
      }
      const boundaryFrame = buildClassicalNahuatlVncOrderedBoundaryFrame([
        { slotRole: "subject", slotId: "subject", sourceCarrier: `${slots.subject.pers1}-${slots.subject.pers2}`, surface: subjectSurface },
        ...participantEntries.map((entry, index) => ({
          slotRole: "pre-predicate",
          slotId: entry.slotId,
          sourceCarrier: entry.carrier,
          surface: participantSurfaces[index],
          underlyingFinalConsonant: getClassicalNahuatlCanvasBoundaryPhoneme(entry)
        })),
        ...normalizeClassicalNahuatlDerivedVncToken(slots.predicate.stem).split("-").map((carrier, index) => ({
          slotRole: "predicate",
          slotId: `predicate-${index + 1}`,
          sourceCarrier: carrier,
          surface: getClassicalNahuatlTypedCarrierSurface(carrier)
        })),
        { slotRole: "tense", slotId: "tns", sourceCarrier: slots.predicate.tns, surface: getClassicalNahuatlTypedCarrierSurface(slots.predicate.tns) },
        { slotRole: "number", slotId: "num1", sourceCarrier: slots.number.num1, surface: getClassicalNahuatlTypedCarrierSurface(slots.number.num1) },
        { slotRole: "number", slotId: "num2", sourceCarrier: slots.number.num2, surface: getClassicalNahuatlTypedCarrierSurface(slots.number.num2) }
      ]);
      return boundaryFrame;
    }
    function realizeClassicalNahuatlLesson25TypedVncWord(typedFrame = null) {
      return buildClassicalNahuatlTypedVncBoundaryFrame(typedFrame)?.wordRealization || "";
    }
    function getClassicalNahuatlVncVoiceFiniteAuthorityProjection(frame = null) {
      const finalTypedFrame = getClassicalNahuatlFinalTypedVncSlotFrame(frame);
      const selectedOutputFillers = frame?.selectedOutputLogicFrame?.outputFillers || null;
      return {
        kind: frame?.kind || "",
        version: frame?.version || 0,
        authorizationStatus: frame?.authorizationStatus || "",
        blockReason: frame?.blockReason || "",
        voice: frame?.voice || "",
        stem: frame?.stem || "",
        sourceVerbstem: frame?.sourceVerbstem || "",
        sourceValence: frame?.sourceValence || "",
        valence: frame?.valence || "",
        sourceSubject: frame?.sourceSubject || "",
        subject: frame?.subject || "",
        selectedNonactiveAspect: frame?.selectedNonactiveAspect || "",
        nonactiveStemRecord: frame?.nonactiveStemRecord || null,
        sourceObjectClusterFrame: frame?.sourceObjectClusterFrame || null,
        voiceObjectClusterFrame: frame?.voiceObjectClusterFrame || null,
        voiceTransformationFrame: frame?.voiceTransformationFrame || null,
        derivedRequestedSourceValence: frame?.derivedMachineryFrame?.priorVncFrame?.requestedSourceValence || "",
        finalTypedFrame,
        formulaRealization: frame?.formulaRealization || "",
        // The finite-VNC canonical check consumes the shared typed VNC receipt.
        // Lesson-specific diagnostic frames inside the machinery may explain
        // that result, but they do not independently authorize or veto it.
        selectedOutputFillers: selectedOutputFillers ? {
          verbstem: selectedOutputFillers.verbstem || "",
          stemAsFormulaPredicate: selectedOutputFillers.stemAsFormulaPredicate || "",
          classId: selectedOutputFillers.classId || "",
          classTargetStem: selectedOutputFillers.classTargetStem || "",
          classTargetValence: selectedOutputFillers.classTargetValence || "",
          sourceVerbstem: selectedOutputFillers.sourceVerbstem || "",
          aspect: selectedOutputFillers.aspect || "",
          stemVariant: selectedOutputFillers.stemVariant || "",
          selectedObjectRelationshipKind: selectedOutputFillers.selectedObjectRelationshipKind || "",
          selectedObjectKind: selectedOutputFillers.selectedObjectKind || "",
          selectedObjectPerson: selectedOutputFillers.selectedObjectPerson || "",
          voice: selectedOutputFillers.voice || "",
          activeSourceStem: selectedOutputFillers.activeSourceStem || "",
          derivedStem: selectedOutputFillers.derivedStem || "",
          realizedDerivedStem: selectedOutputFillers.realizedDerivedStem || "",
          targetClass: selectedOutputFillers.targetClass || "",
          selectedNonactiveAspect: selectedOutputFillers.selectedNonactiveAspect || "",
          nonactiveStem: selectedOutputFillers.nonactiveStem || "",
          nonactiveSuffixFamily: selectedOutputFillers.nonactiveSuffixFamily || "",
          sourceValence: selectedOutputFillers.sourceValence || "",
          targetValence: selectedOutputFillers.targetValence || "",
          sourceSubject: selectedOutputFillers.sourceSubject || "",
          targetSubject: selectedOutputFillers.targetSubject || "",
          sourceObjectCarriers: selectedOutputFillers.sourceObjectCarriers || [],
          targetObjectCarriers: selectedOutputFillers.targetObjectCarriers || []
        } : null,
        grammarGenerationAllowed: frame?.grammarGenerationAllowed,
        formulaOutputAllowed: frame?.formulaOutputAllowed,
        surfaceGenerationAllowed: frame?.surfaceGenerationAllowed
      };
    }
    function isCanonicalClassicalNahuatlDirectVncFiniteSourceFrame(machineryFrame = null) {
      const runtimeTarget = getClassicalNahuatlDerivedVncRuntimeTarget();
      if (!machineryFrame
        || !["classical-nahuatl-verbstem-verbstem-class-machinery-frame", "classical-nahuatl-multiple-object-vnc-multiple-object-vnc-machinery-frame", "classical-nahuatl-ordered-voice-layer-vnc-machinery-frame"].includes(machineryFrame.kind)
        || machineryFrame.authorizationStatus !== "authorized"
        || machineryFrame.proofFrame?.authorizationStatus !== "authorized"
        || machineryFrame.proofFrame?.conclusion?.authorized !== true
        || typeof runtimeTarget?.isClassicalNahuatlVncSlotFrame !== "function"
        || typeof runtimeTarget?.renderClassicalNahuatlVncSlotFrameFormula !== "function") {
        return false;
      }
      const finalTypedFrame = getClassicalNahuatlFinalTypedVncSlotFrame(machineryFrame);
      if (runtimeTarget.isClassicalNahuatlVncSlotFrame(finalTypedFrame) !== true) return false;
      const canonicalFormula = normalizeClassicalNahuatlDerivedVncToken(runtimeTarget.renderClassicalNahuatlVncSlotFrameFormula(finalTypedFrame));
      if (!canonicalFormula) return false;
      const conclusion = machineryFrame.proofFrame.conclusion || {};
      const formulaProjections = [
        machineryFrame.formulaRealization,
        conclusion.formulaRealization,
        conclusion.selectedFormula,
        conclusion.authorizedFormula,
        conclusion.finalBoundaryRealizationFrame?.formulaRealization,
        machineryFrame.finalBoundaryRealizationFrame?.formulaRealization
      ].filter(value => typeof value === "string" && value.length > 0).map(normalizeClassicalNahuatlDerivedVncToken);
      return Boolean(formulaProjections.length && formulaProjections.every(formula => formula === canonicalFormula));
    }
    function isCanonicalClassicalNahuatlCanvasMachineryFrame(machineryFrame = null) {
      const runtimeTarget = getClassicalNahuatlDerivedVncRuntimeTarget();
      if (!machineryFrame || machineryFrame.authorizationStatus !== "authorized") {
        return false;
      }
      if (machineryFrame.kind === "classical-nahuatl-late-vnc-derivation-operation-machinery-frame") {
        return typeof runtimeTarget?.isClassicalNahuatlMachineryFrame === "function"
          && runtimeTarget.isClassicalNahuatlMachineryFrame(machineryFrame) === true;
      }
      if (machineryFrame.kind === "classical-nahuatl-nonactive-vnc-derived-vnc-machinery-frame") {
        const activeMachineryFrame = machineryFrame.activeMachineryFrame || null;
        const finalTypedFrame = getClassicalNahuatlFinalTypedVncSlotFrame(machineryFrame);
        const activeCanonical = isCanonicalClassicalNahuatlDirectVncFiniteSourceFrame(activeMachineryFrame)
          || typeof runtimeTarget?.isClassicalNahuatlDerivedVncMachineryFrame === "function"
          && runtimeTarget.isClassicalNahuatlDerivedVncMachineryFrame(activeMachineryFrame) === true
          || typeof runtimeTarget?.isClassicalNahuatlVncDerivationSourceMachineryFrame === "function"
          && runtimeTarget.isClassicalNahuatlVncDerivationSourceMachineryFrame(activeMachineryFrame) === true;
        const canonicalActivePriorVncFrame = activeMachineryFrame?.targetLesson7MachineryFrame?.priorVncFrame
          || activeMachineryFrame?.priorVncFrame
          || null;
        const canonicalActiveObjectRequests = activeMachineryFrame?.derivationOperationFrame?.targetObjectRequests
          || activeMachineryFrame?.targetObjectRequests
          || [];
        const canonicalActiveSpecificObject = canonicalActiveObjectRequests.find(request => request?.objectKind === "specific-projective") || null;
        const canonicalActiveRequestedSourceValence = normalizeClassicalNahuatlKey(
          machineryFrame?.sourceValence
          || activeMachineryFrame?.targetValence
          || activeMachineryFrame?.classTargetValence
          || activeMachineryFrame?.valence
          || canonicalActivePriorVncFrame?.requestedSourceValence
          || ""
        );
        const canonicalActiveObjectPerson = normalizeClassicalNahuatlKey(
          canonicalActiveSpecificObject?.objectPerson
          || (normalizeClassicalNahuatlKey(canonicalActivePriorVncFrame?.objectFrame?.objectKind) === "specific-projective"
            ? canonicalActivePriorVncFrame?.objectFrame?.objectPerson
            : "")
        );
        const canonicalActiveConclusion = activeMachineryFrame?.proofFrame?.conclusion || {};
        const canonicalActiveExpandedBoundary = activeMachineryFrame?.expandedVncBoundaryFrame
          || canonicalActiveConclusion.expandedVncBoundaryFrame
          || {};
        const canonicalVncSentenceOptions = {
          requestedSourceValence: canonicalActiveRequestedSourceValence,
          object: canonicalActiveObjectPerson,
          directionalPrefix: canonicalActiveExpandedBoundary.directionalPrefix
            || canonicalActiveConclusion.directionalPrefix
            || "",
          incorporatedAdverb: canonicalActiveConclusion.incorporatedAdverb || "",
          adverbPosition: canonicalActiveConclusion.adverbPosition || ""
        };
        const canonicalRebuildOptions = {
            voice: machineryFrame.voice,
            nonactiveStemRecord: machineryFrame.nonactiveStemRecord,
            inherentImpersonalRecord: machineryFrame.inherentImpersonalRecord,
            tlaImpersonalStemRecord: machineryFrame.tlaImpersonalStemRecord,
            sourceObjectClusterFrame: machineryFrame.sourceObjectClusterFrame,
            sourceValence: machineryFrame.sourceValence,
            sourceSubject: machineryFrame.sourceSubject,
            sourceObjectPerson: machineryFrame.voiceTransformationFrame?.sourceSpecificObject || "",
            impersonalDerivationPath:
              machineryFrame.voiceTransformationFrame
                ?.impersonalDerivationPath || "direct-active",
            mood: activeMachineryFrame?.priorVncFrame?.personDyad?.mood || activeMachineryFrame?.priorVncFrame?.mood || "indicative",
            tense: activeMachineryFrame?.priorVncFrame?.tense || "present",
            verbClass: activeMachineryFrame?.targetClass || activeMachineryFrame?.classId || "A"
          };
        const rebuiltCandidates = activeCanonical && typeof runtimeTarget?.buildClassicalNahuatlDerivedVncFrame === "function"
          ? [
            runtimeTarget.buildClassicalNahuatlDerivedVncFrame(activeMachineryFrame, canonicalRebuildOptions),
            runtimeTarget.buildClassicalNahuatlDerivedVncFrame(activeMachineryFrame, {
              ...canonicalRebuildOptions,
              sentenceOptions: canonicalVncSentenceOptions
            })
          ].filter(candidate => candidate?.authorizationStatus === "authorized")
          : [];
        const rebuilt = rebuiltCandidates.find(candidate => areClassicalNahuatlLesson25ValuesEqual(
          getClassicalNahuatlVncVoiceFiniteAuthorityProjection(machineryFrame),
          getClassicalNahuatlVncVoiceFiniteAuthorityProjection(candidate)
        )) || null;
        const sourceObjectClusterFrame = machineryFrame.sourceObjectClusterFrame;
        const voiceObjectClusterFrame = machineryFrame.voiceObjectClusterFrame;
        const hasCanonicalVoiceObjectClusterRelation = sourceObjectClusterFrame === null
          ? voiceObjectClusterFrame === null
          : sourceObjectClusterFrame?.authorizationStatus === "authorized"
            && voiceObjectClusterFrame?.authorizationStatus === "authorized";
        return Boolean(activeCanonical
          && rebuilt?.authorizationStatus === "authorized"
          && typeof runtimeTarget?.isClassicalNahuatlVncSlotFrame === "function"
          && runtimeTarget.isClassicalNahuatlVncSlotFrame(finalTypedFrame) === true
          && machineryFrame.voiceTransformationFrame?.authorizationStatus === "authorized"
          && hasCanonicalVoiceObjectClusterRelation
          && machineryFrame.proofFrame?.authorizationStatus === "authorized"
          && machineryFrame.proofFrame?.conclusion?.authorized === true
          && machineryFrame.selectedOutputLogicFrame?.authorizationStatus === "authorized"
          && machineryFrame.formulaRealization === machineryFrame.selectedOutputLogicFrame.selectedFormula
          && rebuilt);
      }
      if (machineryFrame.kind === "classical-nahuatl-vnc-derived-machinery-frame") {
        return typeof runtimeTarget?.isClassicalNahuatlDerivedVncMachineryFrame === "function"
          && runtimeTarget.isClassicalNahuatlDerivedVncMachineryFrame(machineryFrame) === true;
      }
      if (["classical-nahuatl-verbstem-verbstem-class-machinery-frame", "classical-nahuatl-multiple-object-vnc-multiple-object-vnc-machinery-frame", "classical-nahuatl-ordered-voice-layer-vnc-machinery-frame"].includes(machineryFrame.kind)) {
        return isCanonicalClassicalNahuatlDirectVncFiniteSourceFrame(machineryFrame);
      }
      return typeof runtimeTarget?.isClassicalNahuatlVncDerivationSourceMachineryFrame === "function"
        && runtimeTarget.isClassicalNahuatlVncDerivationSourceMachineryFrame(machineryFrame) === true;
    }
    function normalizeClassicalNahuatlCanvasObjectKind(value = "") {
      const normalized = normalizeClassicalNahuatlKey(value);
      return {
        "mainline-reflexive": "reflexive",
        "shuntline-reflexive": "reflexive",
        "human-reciprocal": "reflexive",
        "projective-human": "nonspecific-human",
        "projective-nonhuman": "nonspecific-nonhuman"
      }[normalized] || normalized;
    }
    function getClassicalNahuatlCanvasSyntheticObjectPosition(machineryFrame = null) {
      const objectFrame = machineryFrame?.priorVncFrame?.objectFrame || null;
      const objectKind = normalizeClassicalNahuatlCanvasObjectKind(objectFrame?.objectKind || "");
      if (!objectKind || objectFrame?.valenceArity === "vacant") {
        return null;
      }
      return Object.freeze({
        objectId: "source-object-1",
        objectKind,
        objectPerson: normalizeClassicalNahuatlKey(objectFrame?.objectPerson || ""),
        governor: "directive",
        derivationalLevel: 1,
        prominence: "mainline",
        carrier: normalizeClassicalNahuatlDerivedVncToken(objectFrame?.carrier || ""),
        sounded: true
      });
    }
    function getClassicalNahuatlCanvasParticipantPositions(machineryFrame = null, typedFrame = null) {
      const clusterCandidates = [
        machineryFrame?.targetObjectClusterFrame,
        machineryFrame?.voiceObjectClusterFrame,
        machineryFrame?.multipleObjectClusterFrame,
        machineryFrame?.sourceObjectClusterFrame
      ];
      const cluster = clusterCandidates.find(candidate => Array.isArray(candidate?.positions)) || null;
      if (cluster) {
        return Object.freeze(cluster.positions.map(position => Object.freeze({ ...position })));
      }
      const typedPositions = (typedFrame?.slots?.prePredicate || [])
        .map(slot => slot?.objectPositionFrame || null)
        .filter(Boolean);
      if (typedPositions.length) {
        return Object.freeze(typedPositions.map(position => Object.freeze({ ...position })));
      }
      const synthetic = getClassicalNahuatlCanvasSyntheticObjectPosition(machineryFrame);
      return Object.freeze(synthetic ? [synthetic] : []);
    }
    function orderClassicalNahuatlLessons2425CanvasParticipants(machineryFrame = null, values = [], getPosition = value => value) {
      const ordered = Array.isArray(values) ? values.slice() : [];
      const positions = ordered.map(value => getPosition(value)).filter(Boolean);
      const operationFrame = machineryFrame?.derivationOperationFrame || null;
      const impersonalRetainedReflexive = operationFrame?.sourceVoice === "impersonal"
        && positions.some(position => position.objectKind === "reflexive" && position.governor === "directive")
        && positions.some(position => position.objectKind === "nonspecific-human" && position.governor === "causative");
      if (!impersonalRetainedReflexive) return ordered;
      return ordered.sort((left, right) => {
        const priority = value => {
          const position = getPosition(value);
          return position?.governor === "causative" && position?.objectKind === "nonspecific-human" ? 0 : 1;
        };
        return priority(left) - priority(right);
      });
    }
    function getClassicalNahuatlCanvasParticipantEntries(machineryFrame = null, typedFrame = null) {
      const positionsById = new Map(getClassicalNahuatlCanvasParticipantPositions(machineryFrame, typedFrame)
        .map(position => [position.objectId, position]));
      const entries = (typedFrame?.slots?.prePredicate || []).map((slot, index) => {
        const position = slot?.objectPositionFrame
          || positionsById.get(slot?.objectPositionFrame?.objectId)
          || getClassicalNahuatlCanvasParticipantPositions(machineryFrame, typedFrame)[index]
          || null;
        const typedFormulaCarrier = normalizeClassicalNahuatlDerivedVncToken(
          slot?.formulaCarrier || slot?.carrier || "",
        );
        const compactFormulaCarrier = typedFormulaCarrier
          .replace(/[+\s-]/gu, "")
          .toLowerCase();
        const followingTypedCarrier = normalizeClassicalNahuatlDerivedVncToken(
          typedFrame?.slots?.prePredicate?.[index + 1]?.carrier || "",
        ).toLowerCase();
        const formulaCarrier = /^(?:quim|quin)$/u.test(compactFormulaCarrier)
          ? followingTypedCarrier === "on" ? "qu-im" : "qu-in"
          : /^(?:0im|0in|⎕im|⎕in)$/u.test(compactFormulaCarrier)
            ? "⎕-in"
            : normalizeClassicalNahuatlCanvasObjectKind(
              position?.objectKind || ""
            ) === "specific-projective"
              && position?.sounded === false
              && /^(?:00|0ø|⎕0)$/u.test(compactFormulaCarrier)
              ? "⎕-0"
              : typedFormulaCarrier;
        return {
          slotId: slot?.id || `valence-${index + 1}`,
          carrier: normalizeClassicalNahuatlDerivedVncToken(slot?.carrier || ""),
          formulaCarrier,
          slot,
          position
        };
      });
      return Object.freeze(orderClassicalNahuatlLessons2425CanvasParticipants(
        machineryFrame,
        entries,
        entry => entry.position
      ).map(entry => Object.freeze(entry)));
    }
    function isClassicalNahuatlCanvasIttaReflexiveORetention(carrier = "", position = null, followingCarrier = "") {
      const compactCarrier = normalizeClassicalNahuatlDerivedVncToken(carrier).replace(/[+\s-]/gu, "").toLowerCase();
      const followingSurface = getClassicalNahuatlTypedCarrierSurface(followingCarrier).toLowerCase();
      return normalizeClassicalNahuatlCanvasObjectKind(position?.objectKind || "") === "reflexive"
        && /^m(?:0|ø|⎕)?$/u.test(compactCarrier)
        && /^itta/u.test(followingSurface);
    }
    function realizeClassicalNahuatlLessons2425CanvasCarrier(carrier = "", position = null, followingCarrier = "") {
      const raw = normalizeClassicalNahuatlDerivedVncToken(carrier);
      const compact = raw.replace(/[+\s-]/gu, "").toLowerCase();
      if (!compact || /^(?:0|00|ø|⎕)$/u.test(compact)) {
        return "";
      }
      const objectKind = normalizeClassicalNahuatlCanvasObjectKind(position?.objectKind || "");
      if (isClassicalNahuatlCanvasIttaReflexiveORetention(raw, position, followingCarrier)) return "mo";
      if (objectKind === "reflexive" && /^(?:m|mo)$/u.test(compact)) return "mo";
      if (objectKind === "reflexive" && /^(?:n|no)$/u.test(compact)) return "no";
      if (objectKind === "reflexive" && /^(?:t|to)$/u.test(compact)) return "to";
      if (compact === "nech") return "nēch";
      if (compact === "tech") return "tēch";
      if (compact === "mech") return "mēch";
      if (compact === "te") return "tē";
      if (compact === "quim") return /^[mpb]/u.test(getClassicalNahuatlCanvasFirstSound(followingCarrier)) ? "quim" : "quin";
      if (compact === "0im" || compact === "im") return /^[mpb]/u.test(getClassicalNahuatlCanvasFirstSound(followingCarrier)) ? "im" : "in";
      if (compact === "c0") return "c";
      if (compact === "qui0") return "qui";
      return getClassicalNahuatlTypedCarrierSurface(raw);
    }
    function getClassicalNahuatlCanvasBoundaryPhoneme(entry = null) {
      const compact = normalizeClassicalNahuatlDerivedVncToken(entry?.carrier || "")
        .replace(/[+\s-]/gu, "")
        .toLowerCase();
      const objectKind = normalizeClassicalNahuatlCanvasObjectKind(entry?.position?.objectKind || "");
      const objectPerson = normalizeClassicalNahuatlKey(entry?.position?.objectPerson || "");
      if (objectKind === "specific-projective"
        && ["3sg", "third-singular", "third-person-singular"].includes(objectPerson)
        && /^(?:c0|qu0|qui0)$/u.test(compact)) {
        return "/k/";
      }
      // qu-in is the plural specific-object carrier itself.  Its final n is
      // already present in the realized carrier, so a generic /k/ identity
      // must not replace it before an n-initial predicate (quin+nōtza).
      if (objectKind === "specific-projective"
        && ["3pl", "third-plural", "third-person-plural"].includes(objectPerson)) {
        return "";
      }
      return normalizeClassicalNahuatlDerivedVncToken(
        entry?.slot?.morphIdentityFrame?.morphIdentity
        || entry?.slot?.morphIdentityFrame?.morpheme
        || ""
      );
    }
    function buildClassicalNahuatlVncOrderedBoundaryFrame(morphemes = []) {
      const runtimeTarget = getClassicalNahuatlDerivedVncRuntimeTarget();
      const orderedMorphemes = morphemes.map((morpheme, order) => ({
        order,
        slotRole: normalizeClassicalNahuatlDerivedVncToken(morpheme?.slotRole || ""),
        slotId: normalizeClassicalNahuatlDerivedVncToken(morpheme?.slotId || ""),
        sourceCarrier: normalizeClassicalNahuatlDerivedVncToken(morpheme?.sourceCarrier || ""),
        formulaCarrier: normalizeClassicalNahuatlDerivedVncToken(morpheme?.formulaCarrier || morpheme?.sourceCarrier || ""),
        surface: normalizeClassicalNahuatlDerivedVncToken(morpheme?.surface || ""),
        underlyingFinalConsonant: normalizeClassicalNahuatlDerivedVncToken(morpheme?.underlyingFinalConsonant || ""),
        sounded: Boolean(normalizeClassicalNahuatlDerivedVncToken(morpheme?.surface || ""))
      }));
      const typedFormulaMorphemes = Object.freeze(orderedMorphemes.map(morpheme => Object.freeze({
        order: morpheme.order,
        slotRole: morpheme.slotRole,
        slotId: morpheme.slotId,
        carrier: morpheme.formulaCarrier
      })));
      const identicalVowelCoalescenceProfiles = Object.freeze([
        Object.freeze({ stockFormative: "ō", stemFormative: "ni", section: "24.5.9" }),
        Object.freeze({ stockFormative: "ē", stemFormative: "hua", section: "24.6.2" })
      ]);
      const longToShortVowel = Object.freeze({ ā: "a", ē: "e", ī: "i", ō: "o" });
      const coalescenceBoundaries = [];
      for (let order = 0; order < orderedMorphemes.length - 2; order += 1) {
        const root = orderedMorphemes[order];
        const stockFormative = orderedMorphemes[order + 1];
        const stemFormative = orderedMorphemes[order + 2];
        const profile = identicalVowelCoalescenceProfiles.find(candidate => (
          candidate.stockFormative === stockFormative.surface
          && candidate.stemFormative === stemFormative.surface
        )) || null;
        const shortStockVowel = longToShortVowel[stockFormative.surface] || "";
        if (!profile
          || root.slotRole !== "predicate"
          || stockFormative.slotRole !== "predicate"
          || stemFormative.slotRole !== "predicate"
          || !shortStockVowel
          || !root.surface.endsWith(shortStockVowel)) {
          continue;
        }
        const leftSurfaceBefore = root.surface;
        const rightSurfaceBefore = stockFormative.surface;
        root.surface = `${root.surface.slice(0, -1)}${stockFormative.surface}`;
        stockFormative.surface = "";
        stockFormative.sounded = false;
        const applicableRuleFrames = Object.freeze([Object.freeze({
          ruleId: "cn-l24-identical-root-stock-vowel-coalescence",
          section: profile.section,
          operation: "coalesce-identical-root-final-and-stock-formative-vowels-in-written-projection",
          sourceMorphologyFrame: Object.freeze({
            kind: "classical-nahuatl-identical-vowel-boundary-source-frame",
            root: leftSurfaceBefore,
            stockFormative: rightSurfaceBefore,
            stemFormative: stemFormative.surface,
            outputVowel: rightSurfaceBefore
          })
        })]);
        coalescenceBoundaries.push(Object.freeze({
          boundaryOrder: coalescenceBoundaries.length,
          leftMorphemeOrder: root.order,
          rightMorphemeOrder: stockFormative.order,
          leftSlotRole: root.slotRole,
          rightSlotRole: stockFormative.slotRole,
          leftSurfaceBefore,
          rightSurfaceBefore,
          leftSurfaceAfter: root.surface,
          rightSurfaceAfter: stockFormative.surface,
          leftFormulaCarrierBefore: typedFormulaMorphemes[root.order]?.carrier || "",
          leftFormulaCarrierAfter: typedFormulaMorphemes[root.order]?.carrier || "",
          formulaCarrierChangedByWrittenBoundary: false,
          applicableRuleFrames,
          appliedRuleIds: Object.freeze(applicableRuleFrames.map(frame => frame.ruleId))
        }));
      }
      const soundedOrders = orderedMorphemes.filter(morpheme => morpheme.sounded).map(morpheme => morpheme.order);
      const boundaries = [...coalescenceBoundaries];
      for (let boundaryOrder = 0; boundaryOrder < soundedOrders.length - 1; boundaryOrder += 1) {
        const left = orderedMorphemes[soundedOrders[boundaryOrder]];
        const right = orderedMorphemes[soundedOrders[boundaryOrder + 1]];
        const leftBefore = left.surface;
        const rightBefore = right.surface;
        const applicableRuleFrames = [];
        if (left.underlyingFinalConsonant
          && typeof runtimeTarget?.buildClassicalNahuatlDerivationalBoundarySpellingFrame === "function") {
          const transcriptionFrame = runtimeTarget.buildClassicalNahuatlDerivationalBoundarySpellingFrame({
            sourceStem: left.sourceCarrier || left.surface,
            retainedStem: left.surface,
            followingMorpheme: right.surface,
            underlyingFinalConsonant: left.underlyingFinalConsonant
          });
          if (transcriptionFrame?.authorizationStatus === "authorized") {
            left.surface = transcriptionFrame.realizedRetainedStem;
            applicableRuleFrames.push(Object.freeze({
              ruleId: transcriptionFrame.spellingChangeFrame?.selectedRuleId || transcriptionFrame.operationId,
              semanticOwner: transcriptionFrame.canonicalAnalysisKind,
              operation: transcriptionFrame.changed
                ? "realize-left-morpheme-spelling-from-neighboring-right-morpheme"
                : "preserve-left-morpheme-spelling-in-neighboring-boundary",
              proofFrame: transcriptionFrame
            }));
          }
        }
        boundaries.push(Object.freeze({
          boundaryOrder: boundaries.length,
          leftMorphemeOrder: left.order,
          rightMorphemeOrder: right.order,
          leftSlotRole: left.slotRole,
          rightSlotRole: right.slotRole,
          leftSurfaceBefore: leftBefore,
          rightSurfaceBefore: rightBefore,
          leftSurfaceAfter: left.surface,
          rightSurfaceAfter: right.surface,
          leftFormulaCarrierBefore: typedFormulaMorphemes[left.order]?.carrier || "",
          leftFormulaCarrierAfter: typedFormulaMorphemes[left.order]?.carrier || "",
          formulaCarrierChangedByWrittenBoundary: false,
          applicableRuleFrames: Object.freeze(applicableRuleFrames),
          appliedRuleIds: Object.freeze(applicableRuleFrames.map(frame => frame.ruleId).filter(Boolean))
        }));
      }
      const orderedBoundaries = orderedMorphemes.slice(0, -1).map((left, boundaryOrder) => {
        const right = orderedMorphemes[boundaryOrder + 1];
        const soundedNeighborBoundary = boundaries.find(boundary => (
          boundary.leftMorphemeOrder === left.order
          && boundary.rightMorphemeOrder === right.order
        )) || null;
        const directCoalescenceBoundary = coalescenceBoundaries.find(boundary => (
          boundary.leftMorphemeOrder === left.order
          && boundary.rightMorphemeOrder === right.order
        )) || null;
        return Object.freeze({
          boundaryOrder,
          leftMorphemeOrder: left.order,
          rightMorphemeOrder: right.order,
          leftSlotRole: left.slotRole,
          rightSlotRole: right.slotRole,
          leftSounded: left.sounded,
          rightSounded: right.sounded,
          phonologicallyAdjacent: Boolean(soundedNeighborBoundary || directCoalescenceBoundary),
          appliedRuleIds: directCoalescenceBoundary?.appliedRuleIds
            || soundedNeighborBoundary?.appliedRuleIds
            || Object.freeze([])
        });
      });
      const subjectCarrier = typedFormulaMorphemes.find(morpheme => morpheme.slotRole === "subject")?.carrier || "";
      const prePredicateCarriers = typedFormulaMorphemes.filter(morpheme => morpheme.slotRole === "pre-predicate").map(morpheme => morpheme.carrier);
      const predicateCarrier = typedFormulaMorphemes.filter(morpheme => morpheme.slotRole === "predicate").map(morpheme => morpheme.carrier).join("-");
      const tenseCarrier = typedFormulaMorphemes.find(morpheme => morpheme.slotRole === "tense")?.carrier || "";
      const numberCarriers = typedFormulaMorphemes.filter(morpheme => morpheme.slotRole === "number").map(morpheme => morpheme.carrier);
      const formulaRealization = subjectCarrier && predicateCarrier && numberCarriers.length === 2
        ? `#${subjectCarrier}${prePredicateCarriers.length ? `+${prePredicateCarriers.join("+")}` : ""}(${predicateCarrier})${tenseCarrier}+${numberCarriers[0]}-${numberCarriers[1]}#`
        : "";
      const wordRealization = orderedMorphemes.map(morpheme => morpheme.surface).join("").normalize("NFC");
      return Object.freeze({
        kind: "classical-nahuatl-vnc-ordered-morpheme-boundary-frame",
        authorizationStatus: "authorized",
        typedMorphemeOrderAuthority: true,
        neighboringBoundariesEnumerated: true,
        formulaCarriersImmutableAcrossBoundaryRealization: true,
        formulaDerivedFromWrittenProjection: false,
        writtenDerivedFromFormulaProjection: false,
        orderedMorphemes: Object.freeze(orderedMorphemes.map(morpheme => Object.freeze({ ...morpheme }))),
        orderedBoundaries: Object.freeze(orderedBoundaries),
        boundaries: Object.freeze(boundaries),
        formulaProjection: Object.freeze({
          kind: "classical-nahuatl-vnc-formula-projection",
          sourceKind: "typed-ordered-morphemes",
          morphemes: typedFormulaMorphemes,
          segmentCarriers: Object.freeze(typedFormulaMorphemes.map(morpheme => morpheme.carrier)),
          result: formulaRealization,
          derivedFromWrittenProjection: false
        }),
        writtenProjection: Object.freeze({
          kind: "classical-nahuatl-vnc-written-projection",
          sourceKind: "typed-ordered-morphemes",
          segmentCarriers: Object.freeze(orderedMorphemes.map(morpheme => morpheme.surface)),
          result: wordRealization,
          derivedFromFormulaProjection: false
        }),
        formulaRealization,
        wordRealization
      });
    }
    function getClassicalNahuatlCanvasFirstSound(value = "") {
      return normalizeClassicalNahuatlDerivedVncToken(value).normalize("NFD").replace(/[\u0300-\u036f]/gu, "")[0]?.toLowerCase() || "";
    }
    function isClassicalNahuatlCanvasVowelSound(value = "") {
      return /^[aeiou]$/u.test(getClassicalNahuatlCanvasFirstSound(value));
    }
    function realizeClassicalNahuatlLessons2425CanvasPredicate(machineryFrame = null, rawPredicate = "", precedingCarrier = "") {
      const operationFrame = machineryFrame?.derivationOperationFrame || null;
      let segmented = normalizeClassicalNahuatlDerivedVncToken(rawPredicate);
      let formulaSegmented = segmented;
      const ruleFrames = [];
      const writtenActiveTargetStem = normalizeClassicalNahuatlDerivedVncToken(
        operationFrame?.targetStem || "",
      );
      const formulaActiveTargetStem = normalizeClassicalNahuatlDerivedVncToken(
        operationFrame?.formulaTargetStem
          || operationFrame?.selectedOption?.formulaTargetStem
          || writtenActiveTargetStem,
      );
      if (
        writtenActiveTargetStem
        && formulaActiveTargetStem
        && formulaActiveTargetStem !== writtenActiveTargetStem
      ) {
        if (
          formulaSegmented === writtenActiveTargetStem
          || formulaSegmented.startsWith(`${writtenActiveTargetStem}-`)
        ) {
          formulaSegmented =
            `${formulaActiveTargetStem}`
            + formulaSegmented.slice(writtenActiveTargetStem.length);
        } else {
          const writtenActiveBase = writtenActiveTargetStem.replace(
            /-tiā$/u,
            "",
          );
          const formulaActiveBase = formulaActiveTargetStem.replace(
            /-tiā$/u,
            "",
          );
          if (
            writtenActiveBase
            && formulaActiveBase
            && (
              formulaSegmented === writtenActiveBase
              || formulaSegmented.startsWith(`${writtenActiveBase}-`)
            )
          ) {
            formulaSegmented =
              `${formulaActiveBase}`
              + formulaSegmented.slice(writtenActiveBase.length);
          }
        }
      }
      const targetStem = normalizeClassicalNahuatlDerivedVncToken(machineryFrame?.targetStem);
      if (normalizeClassicalNahuatlDerivedVncToken(machineryFrame?.nonactiveStemRecord?.nonactiveStem) === "caquī-ti-lō"
        && /caquī-ti-l/u.test(segmented)) {
        segmented = segmented.replace(/caquī-ti-l/u, "caqui-tī-l");
        ruleFrames.push(Object.freeze({
          ruleId: "cn-l25-25123-caqui-ti-lo-internal-quantity",
          section: "25.12.3",
          operation: "relocate-the-long-i-to-the-causative-ti-before-nonactive-lo"
        }));
      }
      const activeCausativeTargetStem = normalizeClassicalNahuatlDerivedVncToken(machineryFrame?.activeMachineryFrame?.targetStem);
      const selectedNonactiveStem = normalizeClassicalNahuatlDerivedVncToken(machineryFrame?.nonactiveStemRecord?.nonactiveStem);
      if (activeCausativeTargetStem === "cui-tiā"
        && selectedNonactiveStem === "cui-tī-lō"
        && /^cui-tī-l(?:o|ō)(?:-|$)/u.test(segmented)) {
        segmented = segmented.replace(/^cui(?=-tī-l(?:o|ō)(?:-|$))/u, "cuī");
        ruleFrames.push(Object.freeze({
          ruleId: "cn-l25-2515-cui-passive-root-quantity-finalizer",
          section: "25.15",
          operation: "lengthen-cui-root-only-after-the-provisional-causative-enters-the-nonactive-voice-environment"
        }));
      }
      if (/-l-tiā$/u.test(activeCausativeTargetStem)
        && /-ti-lō$/u.test(selectedNonactiveStem)
        && /-ti-l(?:o|ō)/u.test(segmented)) {
        segmented = segmented.replace(/-ti-l(?=(?:o|ō)(?:-|$))/u, "-tī-l");
        ruleFrames.push(Object.freeze({
          ruleId: "cn-l25-2515-derived-causative-nonactive-ti-quantity",
          section: "25.15",
          operation: "preserve-causative-long-i-before-nonactive-lo"
        }));
      }
      const activeCausativeSourceVoice = normalizeClassicalNahuatlDerivedVncToken(
        machineryFrame?.activeMachineryFrame?.derivationOperationFrame?.sourceVoice
          || "",
      );
      if (
        machineryFrame?.voice === "impersonal"
        && activeCausativeSourceVoice === "impersonal"
        && activeCausativeTargetStem === "chīhua-l-tiā"
        && selectedNonactiveStem === "chīhua-l-tī-lō"
        && /-tī-l(?=(?:o|ō)(?:-|$))/u.test(segmented)
      ) {
        segmented = segmented.replace(/-tī-l(?=(?:o|ō)(?:-|$))/u, "-tī-");
        ruleFrames.push(Object.freeze({
          ruleId: "cn-l25-2515-double-impersonal-chihua-lo-l-suppression",
          section: "25.15",
          operation: "suppress-the-nonactive-l-at-the-written-boundary-of-the-impersonal-of-an-impersonal-chihua-causative"
        }));
      }
      let solid = getClassicalNahuatlTypedCarrierSurface(segmented);
      if (normalizeClassicalNahuatlDerivedVncToken(machineryFrame?.targetStem) === "iuc-xi-tiā" && precedingCarrier === "tla" && /^iuc/u.test(solid)) {
        segmented = segmented.replace(/^iuc/u, "uc");
        solid = getClassicalNahuatlTypedCarrierSurface(segmented);
        ruleFrames.push(Object.freeze({
          ruleId: "cn-l25-2522-iuc-xi-supportive-i-suppression",
          section: "25.2.2",
          operation: "suppress-initial-supportive-i-after-tla"
        }));
      }
      if (normalizeClassicalNahuatlDerivedVncToken(machineryFrame?.targetStem) === "quix-tiā" && /^quix/u.test(solid)) {
        segmented = segmented.replace(/^quix/u, "quīx");
        solid = getClassicalNahuatlTypedCarrierSurface(segmented);
        ruleFrames.push(Object.freeze({
          ruleId: "cn-l25-2510-quix-finite-quantity",
          section: "25.10",
          operation: "realize-the-printed-long-root-vowel-in-finite-quix-causatives"
        }));
      }
      if (/^ittī/u.test(solid) && precedingCarrier === "no") {
        segmented = segmented.replace(/^i/u, "");
        solid = getClassicalNahuatlTypedCarrierSurface(segmented);
        ruleFrames.push(Object.freeze({
          ruleId: "cn-l25-25111b-no-itta-initial-i-suppression",
          section: "25.11.1.b",
          operation: "suppress-initial-i-after-mainline-reflexive-no"
        }));
      }
      return Object.freeze({
        surface: solid.normalize("NFC"),
        segmentedSurface: segmented.normalize("NFC"),
        formulaSegmented: formulaSegmented.normalize("NFC"),
        ruleFrames: Object.freeze(ruleFrames)
      });
    }
    function getClassicalNahuatlCanvasSurfaceSignaturePayload(frame = {}) {
      return {
        kind: frame.kind,
        version: frame.version,
        lesson: frame.lesson,
        section: frame.section,
        sourceAuthority: frame.sourceAuthority,
        sourceDocument: frame.sourceDocument,
        authorizationStatus: frame.authorizationStatus,
        blockReason: frame.blockReason,
        machineryKind: frame.machineryFrame?.kind || "",
        machineryCanonicalSignature: frame.machineryFrame?.canonicalSignature || "",
        operationCanonicalSignature: frame.machineryFrame?.derivationOperationFrame?.canonicalSignature || "",
        typedSemanticIdentity: frame.typedFrame?.semanticIdentity || "",
        participantPositions: frame.participantPositions || [],
        orderedParticipantRoles: frame.orderedParticipantRoles || [],
        participantCount: frame.participantCount || 0,
        predicateStem: frame.predicateStem || "",
        citationStages: frame.citationStages || [],
        sourceHistoryRealization: frame.sourceHistoryRealization || "",
        relationRealization: frame.relationRealization || "",
        ruleFrames: frame.ruleFrames || [],
        orderedBoundaryFrame: frame.orderedBoundaryFrame || null,
        orderedMorphemes: frame.orderedMorphemes || [],
        orderedBoundaries: frame.orderedBoundaries || [],
        neighboringBoundaries: frame.neighboringBoundaries || [],
        formulaProjection: frame.formulaProjection || null,
        writtenProjection: frame.writtenProjection || null,
        formulaDerivedFromWrittenProjection: frame.formulaDerivedFromWrittenProjection,
        writtenDerivedFromFormulaProjection: frame.writtenDerivedFromFormulaProjection,
        formulaRealization: frame.formulaRealization || "",
        wordRealization: frame.wordRealization || "",
        citationRealization: frame.citationRealization || "",
        conditionedParadigmCellRealizations: frame.conditionedParadigmCellRealizations || [],
        conditionedParadigmCellFrame: frame.conditionedParadigmCellFrame || null,
        typedFrameAuthority: frame.typedFrameAuthority,
        grammarAuthority: frame.grammarAuthority,
        formulaStringAuthority: frame.formulaStringAuthority,
        surfaceStringAuthority: frame.surfaceStringAuthority,
        callerSuppliedAuthorityAccepted: frame.callerSuppliedAuthorityAccepted,
        catalogTargetAuthority: frame.catalogTargetAuthority,
        grammarGenerationAllowed: frame.grammarGenerationAllowed,
        surfaceGenerationAllowed: frame.surfaceGenerationAllowed,
        rejectedAuthorityFields: frame.rejectedAuthorityFields || []
      };
    }
    function buildBlockedClassicalNahuatlCanvasSurfaceFrame(kind = "", machineryFrame = null, blockReason = "classical-lessons24-25-canonical-machinery-required", rejectedAuthorityFields = []) {
      const genericFiniteSurface = kind === CLASSICAL_NAHUATL_VNC_FINITE_SURFACE_KIND;
      return Object.freeze({
        kind,
        version: CLASSICAL_NAHUATL_LESSON25_LATER_LAYERS_VERSION,
        lesson: genericFiniteSurface ? "Classical Nahuatl typed VNC" : "Andrews Lessons 24-25",
        section: genericFiniteSurface ? "5-26" : "24.1-25.16",
        sourceAuthority: genericFiniteSurface ? "canonical typed Classical VNC machinery with operation-aware Andrews finalizers" : "Andrews transcription and canonical typed projective roles",
        sourceDocument: CLASSICAL_NAHUATL_LESSON25_SOURCE_DOCUMENT,
        authorizationStatus: "blocked",
        blockReason,
        machineryFrame,
        typedFrame: null,
        participantPositions: Object.freeze([]),
        orderedParticipantRoles: Object.freeze([]),
        participantCount: 0,
        predicateStem: "",
        citationStages: Object.freeze([]),
        sourceHistoryRealization: "",
        relationRealization: "",
        ruleFrames: Object.freeze([]),
        orderedBoundaryFrame: null,
        orderedMorphemes: Object.freeze([]),
        orderedBoundaries: Object.freeze([]),
        neighboringBoundaries: Object.freeze([]),
        formulaRealization: "",
        wordRealization: "",
        citationRealization: "",
        typedFrameAuthority: true,
        grammarAuthority: true,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        callerSuppliedAuthorityAccepted: false,
        catalogTargetAuthority: false,
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false,
        rejectedAuthorityFields: Object.freeze([...rejectedAuthorityFields]),
        canonicalSignature: ""
      });
    }
    function getClassicalNahuatlCanvasRejectedAuthorityFields(options = {}) {
      return CLASSICAL_NAHUATL_LESSONS2425_CANVAS_SURFACE_FORBIDDEN_FIELDS.filter(field => Object.prototype.hasOwnProperty.call(options || {}, field));
    }
    function buildClassicalNahuatlVncFiniteSurfaceFrameInternal(machineryFrame = null, options = {}, trustedTypedVariantFrame = null) {
      const rejectedAuthorityFields = getClassicalNahuatlCanvasRejectedAuthorityFields(options);
      if (rejectedAuthorityFields.length) {
        return buildBlockedClassicalNahuatlCanvasSurfaceFrame(CLASSICAL_NAHUATL_VNC_FINITE_SURFACE_KIND, machineryFrame, "classical-vnc-caller-supplied-surface-authority-rejected", rejectedAuthorityFields);
      }
      const typedFrame = trustedTypedVariantFrame || getClassicalNahuatlFinalTypedVncSlotFrame(machineryFrame);
      const runtimeTarget = getClassicalNahuatlDerivedVncRuntimeTarget();
      if (!isCanonicalClassicalNahuatlCanvasMachineryFrame(machineryFrame)
        || typeof runtimeTarget?.isClassicalNahuatlVncSlotFrame !== "function"
        || runtimeTarget.isClassicalNahuatlVncSlotFrame(typedFrame) !== true) {
        return buildBlockedClassicalNahuatlCanvasSurfaceFrame(CLASSICAL_NAHUATL_VNC_FINITE_SURFACE_KIND, machineryFrame, "classical-vnc-canonical-machinery-required");
      }
      const participantEntries = getClassicalNahuatlCanvasParticipantEntries(machineryFrame, typedFrame);
      const participantCarriers = participantEntries.map(entry => entry.carrier);
      const participantSurfaces = participantEntries.map((entry, index) => realizeClassicalNahuatlLessons2425CanvasCarrier(
        entry.carrier,
        entry.position,
        getClassicalNahuatlVncFollowingSoundedCarrier(participantCarriers, index, typedFrame.slots.predicate.stem)
      ));
      const lastParticipantSurface = participantSurfaces.filter(Boolean).at(-1) || "";
      const predicate = realizeClassicalNahuatlLessons2425CanvasPredicate(machineryFrame, typedFrame.slots.predicate.stem, lastParticipantSurface);
      const followingSurface = participantSurfaces.find(Boolean) || predicate.surface;
      let subjectSurface = [typedFrame.slots.subject.pers1, typedFrame.slots.subject.pers2]
        .map(getClassicalNahuatlTypedCarrierSurface)
        .join("");
      if (["n", "t"].includes(subjectSurface) && followingSurface && !isClassicalNahuatlCanvasVowelSound(followingSurface)) {
        subjectSurface = `${subjectSurface}i`;
      }
      const tenseSurface = getClassicalNahuatlTypedCarrierSurface(typedFrame.slots.predicate.tns);
      const num1Surface = getClassicalNahuatlTypedCarrierSurface(typedFrame.slots.number.num1);
      const num2Surface = getClassicalNahuatlTypedCarrierSurface(typedFrame.slots.number.num2);
      const predicateMorphemeCarriers =
        (predicate.segmentedSurface || predicate.surface).split("-");
      const predicateFormulaMorphemeCarriers =
        (predicate.formulaSegmented
          || normalizeClassicalNahuatlDerivedVncToken(
            typedFrame.slots.predicate.stem,
          ))
          .split("-");
      // The canonical typed slot frame has already applied the subject-prefix
      // boundary alternation (n/ni, t/ti).  Re-expanding a final bare carrier
      // here would create a second realization lane and, before vowel-initial
      // predicates such as itt-a, would incorrectly restore supportive i.
      const formulaSubjectPers1 = typedFrame.slots.subject.pers1;
      if (
        predicateFormulaMorphemeCarriers.length
          !== predicateMorphemeCarriers.length
      ) {
        return buildBlockedClassicalNahuatlCanvasSurfaceFrame(
          CLASSICAL_NAHUATL_VNC_FINITE_SURFACE_KIND,
          machineryFrame,
          "classical-vnc-formula-written-predicate-boundary-mismatch",
        );
      }
      const orderedBoundaryFrame = buildClassicalNahuatlVncOrderedBoundaryFrame([
        {
          slotRole: "subject",
          slotId: "subject",
          sourceCarrier: `${typedFrame.slots.subject.pers1}-${typedFrame.slots.subject.pers2}`,
          formulaCarrier: `${formulaSubjectPers1}-${typedFrame.slots.subject.pers2}`,
          surface: subjectSurface
        },
        ...participantEntries.map((entry, index) => ({
          slotRole: "pre-predicate",
          slotId: entry.slotId || `valence-${index + 1}`,
          sourceCarrier: entry.carrier,
          formulaCarrier: entry.formulaCarrier,
          surface: participantSurfaces[index],
          underlyingFinalConsonant: getClassicalNahuatlCanvasBoundaryPhoneme(entry)
        })),
        ...predicateMorphemeCarriers.map((carrier, index) => ({
          slotRole: "predicate",
          slotId: `predicate-${index + 1}`,
          sourceCarrier: carrier,
          formulaCarrier: predicateFormulaMorphemeCarriers[index],
          surface: getClassicalNahuatlTypedCarrierSurface(carrier)
        })),
        { slotRole: "tense", slotId: "tns", sourceCarrier: typedFrame.slots.predicate.tns, formulaCarrier: typedFrame.slots.predicate.tns, surface: tenseSurface },
        { slotRole: "number", slotId: "num1", sourceCarrier: typedFrame.slots.number.num1, formulaCarrier: typedFrame.slots.number.num1, surface: num1Surface },
        { slotRole: "number", slotId: "num2", sourceCarrier: typedFrame.slots.number.num2, formulaCarrier: typedFrame.slots.number.num2, surface: num2Surface }
      ]);
      const orderingRuleFrames = machineryFrame?.derivationOperationFrame?.sourceVoice === "impersonal"
        && participantEntries[0]?.position?.governor === "causative"
        ? [Object.freeze({
          ruleId: "cn-l25-25113-impersonal-causative-object-before-retained-reciprocative",
          section: "25.11.3.b",
          operation: "place-sounded-causative-human-before-retained-reciprocative-ne"
        })]
        : [];
      const boundaryRuleFrames = participantEntries.some((entry, index) => isClassicalNahuatlCanvasIttaReflexiveORetention(
        entry.carrier,
        entry.position,
        getClassicalNahuatlVncFollowingSoundedCarrier(participantCarriers, index, typedFrame.slots.predicate.stem)
      )) ? [Object.freeze({
        ruleId: "cn-vnc-itta-reflexive-o-retention",
        section: "7.9 / 25.11.1.b",
        operation: "retain-reflexive-o-before-itta-in-the-coreferential-source"
      })] : [];
      const participantPositions = Object.freeze(participantEntries.map(entry => entry.position).filter(Boolean));
      const frame = {
        kind: CLASSICAL_NAHUATL_VNC_FINITE_SURFACE_KIND,
        version: CLASSICAL_NAHUATL_LESSON25_LATER_LAYERS_VERSION,
        lesson: "Classical Nahuatl typed VNC",
        section: machineryFrame?.derivationOperationFrame?.selectedOption?.andrewsSection || "5-26",
        sourceAuthority: "canonical typed Classical VNC machinery with operation-aware Andrews finalizers",
        sourceDocument: CLASSICAL_NAHUATL_LESSON25_SOURCE_DOCUMENT,
        authorizationStatus: "authorized",
        blockReason: "",
        machineryFrame,
        typedFrame,
        participantPositions,
        orderedParticipantRoles: Object.freeze(participantEntries.map((entry, index) => entry.position ? Object.freeze({
          objectId: entry.position.objectId || "",
          objectKind: entry.position.objectKind || "",
          objectPerson: entry.position.objectPerson || "",
          governor: entry.position.governor || "",
          derivationalLevel: entry.position.derivationalLevel || 0,
          surface: realizeClassicalNahuatlLessons2425CanvasCarrier(entry.carrier, entry.position, getClassicalNahuatlVncFollowingSoundedCarrier(participantCarriers, index, typedFrame.slots.predicate.stem))
        }) : Object.freeze({ objectId: entry.slotId, surface: realizeClassicalNahuatlLessons2425CanvasCarrier(entry.carrier, null, getClassicalNahuatlVncFollowingSoundedCarrier(participantCarriers, index, typedFrame.slots.predicate.stem)) }))),
        participantCount: participantPositions.length,
        predicateStem: typedFrame.slots.predicate.stem,
        citationStages: Object.freeze([]),
        sourceHistoryRealization: "",
        relationRealization: "",
        ruleFrames: Object.freeze([Object.freeze({
          ruleId: "cn-vnc-typed-finite-word-projection",
          section: "5-26",
          operation: "realize-canonical-typed-vnc-slots-with-operation-aware-boundary-rules"
        }), ...orderingRuleFrames, ...boundaryRuleFrames, ...predicate.ruleFrames, ...orderedBoundaryFrame.boundaries.flatMap(boundary => boundary.applicableRuleFrames)]),
        orderedBoundaryFrame,
        orderedMorphemes: orderedBoundaryFrame.orderedMorphemes,
        orderedBoundaries: orderedBoundaryFrame.orderedBoundaries,
        neighboringBoundaries: orderedBoundaryFrame.boundaries,
        formulaProjection: orderedBoundaryFrame.formulaProjection,
        writtenProjection: orderedBoundaryFrame.writtenProjection,
        formulaDerivedFromWrittenProjection: false,
        writtenDerivedFromFormulaProjection: false,
        formulaRealization: orderedBoundaryFrame.formulaRealization,
        wordRealization: orderedBoundaryFrame.wordRealization,
        citationRealization: "",
        typedFrameAuthority: true,
        grammarAuthority: true,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        callerSuppliedAuthorityAccepted: false,
        catalogTargetAuthority: false,
        grammarGenerationAllowed: true,
        surfaceGenerationAllowed: true,
        rejectedAuthorityFields: Object.freeze([])
      };
      frame.conditionedParadigmCellRealizations = trustedTypedVariantFrame
        ? Object.freeze([])
        : buildClassicalNahuatlVncConditionedFiniteRealizations(machineryFrame, frame);
      frame.conditionedParadigmCellFrame = trustedTypedVariantFrame
        ? null
        : buildClassicalNahuatlVncFiniteConditionedParadigmCellFrame(
          machineryFrame,
          frame.conditionedParadigmCellRealizations
        );
      frame.canonicalSignature = signClassicalNahuatlLesson25Value(getClassicalNahuatlCanvasSurfaceSignaturePayload(frame));
      return Object.freeze(frame);
    }
    function buildClassicalNahuatlVncConditionedFiniteRealizations(
      machineryFrame = null,
      primaryFiniteSurfaceFrame = null
    ) {
      const conditionedCellFrame = machineryFrame?.lesson11ConditionedParadigmCellFrame
        || machineryFrame?.lesson11VncApplicationFrame?.conditionedParadigmCellFrame
        || machineryFrame?.proofFrame?.conclusion?.lesson11ConditionedParadigmCellFrame
        || null;
      const selectedRealizations = conditionedCellFrame?.leastCommonMultiple?.selectedRealizations || [];
      if (!selectedRealizations.length) return Object.freeze([]);
      if (
        !isCanonicalClassicalNahuatlCanvasMachineryFrame(machineryFrame)
        || primaryFiniteSurfaceFrame?.authorizationStatus !== "authorized"
        || primaryFiniteSurfaceFrame.machineryFrame !== machineryFrame
        || !primaryFiniteSurfaceFrame.formulaRealization
        || !primaryFiniteSurfaceFrame.wordRealization
      ) {
        return Object.freeze([]);
      }
      const alternativeBoundaryFrames = machineryFrame?.lesson11AlternativeBoundaryFrames
        || machineryFrame?.proofFrame?.conclusion?.lesson11AlternativeBoundaryFrames
        || [];
      const primaryRealization = selectedRealizations[0];
      const conditionedRealizations = [{
        variantId: primaryRealization.variantId,
        typedSlotFrame: primaryFiniteSurfaceFrame.typedFrame,
        formulaRealization: primaryFiniteSurfaceFrame.formulaRealization,
        surfaceRealization: primaryFiniteSurfaceFrame.wordRealization,
        usage: primaryRealization.usage,
        preference: primaryRealization.preference,
        formulaStringAuthority: false,
        surfaceStringAuthority: false
      }, ...alternativeBoundaryFrames.map((boundaryFrame, index) => {
        const realization = selectedRealizations[index + 1] || null;
        const finiteVariant = realization && boundaryFrame?.authorizationStatus === "authorized"
          ? buildClassicalNahuatlVncFiniteSurfaceFrameInternal(machineryFrame, {}, boundaryFrame.typedSlotFrame)
          : null;
        if (!realization || finiteVariant?.authorizationStatus !== "authorized") return null;
        return {
          variantId: realization.variantId,
          typedSlotFrame: finiteVariant.typedFrame,
          formulaRealization: finiteVariant.formulaRealization,
          surfaceRealization: finiteVariant.wordRealization,
          usage: realization.usage,
          preference: realization.preference,
          formulaStringAuthority: false,
          surfaceStringAuthority: false
        };
      }).filter(Boolean)];
      return Object.freeze(conditionedRealizations.map(realization => Object.freeze(realization)));
    }
    function buildClassicalNahuatlVncFiniteConditionedParadigmCellFrame(
      machineryFrame = null,
      finiteRealizations = []
    ) {
      const conditionedCellFrame = machineryFrame?.lesson11ConditionedParadigmCellFrame
        || machineryFrame?.lesson11VncApplicationFrame?.conditionedParadigmCellFrame
        || machineryFrame?.proofFrame?.conclusion?.lesson11ConditionedParadigmCellFrame
        || null;
      const selectedRealizations = conditionedCellFrame?.leastCommonMultiple?.selectedRealizations || [];
      if (!conditionedCellFrame || !selectedRealizations.length || !finiteRealizations.length) return null;
      const finiteRealizationsById = new Map(finiteRealizations.map(realization => [realization.variantId, realization]));
      const finiteSelectedRealizations = selectedRealizations.map(realization => {
        const finiteRealization = finiteRealizationsById.get(realization.variantId);
        if (!finiteRealization?.formulaRealization || !finiteRealization?.surfaceRealization) return null;
        return Object.freeze({
          ...realization,
          typedSlotFrame: finiteRealization.typedSlotFrame,
          formulaRealization: finiteRealization.formulaRealization,
          surfaceRealization: finiteRealization.surfaceRealization,
          formulaStringAuthority: false,
          surfaceStringAuthority: false
        });
      });
      if (finiteSelectedRealizations.some(realization => !realization)) return null;
      return Object.freeze({
        ...conditionedCellFrame,
        realizationPhase: "finite",
        leastCommonMultiple: Object.freeze({
          ...conditionedCellFrame.leastCommonMultiple,
          selectedRealizations: Object.freeze(finiteSelectedRealizations)
        })
      });
    }
    function buildClassicalNahuatlVncFiniteSurfaceFrame(machineryFrame = null, options = {}) {
      return buildClassicalNahuatlVncFiniteSurfaceFrameInternal(machineryFrame, options);
    }
    function isClassicalNahuatlVncFiniteSurfaceFrame(frame = null) {
      if (!frame
        || frame.kind !== CLASSICAL_NAHUATL_VNC_FINITE_SURFACE_KIND
        || frame.version !== CLASSICAL_NAHUATL_LESSON25_LATER_LAYERS_VERSION
        || frame.authorizationStatus !== "authorized"
        || frame.typedFrameAuthority !== true
        || frame.grammarAuthority !== true
        || frame.formulaStringAuthority !== false
        || frame.surfaceStringAuthority !== false
        || frame.callerSuppliedAuthorityAccepted !== false
        || frame.catalogTargetAuthority !== false
        || frame.grammarGenerationAllowed !== true
        || frame.surfaceGenerationAllowed !== true
        || !frame.formulaRealization
        || !frame.wordRealization
        || frame.orderedBoundaryFrame?.authorizationStatus !== "authorized") {
        return false;
      }
      const rebuilt = buildClassicalNahuatlVncFiniteSurfaceFrameInternal(frame.machineryFrame);
      return Boolean(rebuilt.authorizationStatus === "authorized"
        && rebuilt.machineryFrame === frame.machineryFrame
        && haveSameClassicalNahuatlLesson25OwnPropertyNames(rebuilt, frame)
        && frame.canonicalSignature === signClassicalNahuatlLesson25Value(getClassicalNahuatlCanvasSurfaceSignaturePayload(frame))
        && rebuilt.canonicalSignature === frame.canonicalSignature
        && areClassicalNahuatlLesson25ValuesEqual(getClassicalNahuatlCanvasSurfaceSignaturePayload(rebuilt), getClassicalNahuatlCanvasSurfaceSignaturePayload(frame)));
    }
    function getClassicalNahuatlCanvasCitationPositions(machineryFrame = null, typedFrame = null) {
      const canonicalPositions = getClassicalNahuatlCanvasParticipantPositions(machineryFrame, typedFrame);
      if (canonicalPositions.length) {
        return Object.freeze(orderClassicalNahuatlLessons2425CanvasParticipants(machineryFrame, canonicalPositions));
      }
      const requests = Array.isArray(machineryFrame?.targetObjectRequests) ? machineryFrame.targetObjectRequests : [];
      const maximumLevel = requests.reduce((maximum, request) => Math.max(maximum, Number(request?.derivationalLevel) || 0), 0);
      const priority = { "specific-projective": 1, reflexive: 2, "nonspecific-human": 3, "nonspecific-nonhuman": 4 };
      const normalized = requests.map(request => Object.freeze({
        ...request,
        objectKind: normalizeClassicalNahuatlCanvasObjectKind(request.objectKind),
        prominence: Number(request.derivationalLevel) === maximumLevel ? "mainline" : "shuntline"
      })).sort((left, right) => (priority[left.objectKind] || 99) - (priority[right.objectKind] || 99) || right.derivationalLevel - left.derivationalLevel);
      return Object.freeze(orderClassicalNahuatlLessons2425CanvasParticipants(machineryFrame, normalized));
    }
    function isClassicalNahuatlCanvasRetainedReflexiveShuntline(machineryFrame = null, position = {}) {
      const retainedRuleFrame = machineryFrame?.derivationOperationFrame?.participantTransformFrame?.retainedSourceReflexiveShuntlineRuleFrame || null;
      return retainedRuleFrame?.authorizationStatus === "authorized"
        && Array.isArray(retainedRuleFrame.sourceReflexiveObjectIds)
        && retainedRuleFrame.sourceReflexiveObjectIds.includes(position.objectId);
    }
    function getClassicalNahuatlCanvasCitationRole(position = {}, initialVowelKind = "", machineryFrame = null) {
      const objectKind = normalizeClassicalNahuatlCanvasObjectKind(position.objectKind);
      if (objectKind === "nonspecific-nonhuman") return "tla";
      if (objectKind === "reflexive") {
        if (isClassicalNahuatlCanvasRetainedReflexiveShuntline(machineryFrame, position)) return "ne";
        return normalizeClassicalNahuatlKey(initialVowelKind) === "real" ? "m-Ø" : "m-o";
      }
      if (["specific-projective", "nonspecific-human"].includes(objectKind)) return "tē";
      return "";
    }
    function normalizeClassicalNahuatlCanvasCitationPredicateStem(value = "") {
      return normalizeClassicalNahuatlDerivedVncToken(value).replace(/-(?:0|⎕|Ø|ø)$/u, "");
    }
    function getClassicalNahuatlCanvasCitationPredicateStem(machineryFrame = null, typedFrame = null) {
      if (machineryFrame?.kind === "classical-nahuatl-vnc-derived-machinery-frame") {
        return normalizeClassicalNahuatlCanvasCitationPredicateStem(machineryFrame.targetStem);
      }
      const tense = normalizeClassicalNahuatlKey(
        machineryFrame?.priorVncFrame?.tense
        || machineryFrame?.priorVncFrame?.tenseFrame?.tense
        || ""
      );
      const predicateStem = tense === "preterit"
        ? machineryFrame?.classRuleFrame?.perfectiveStem
          || machineryFrame?.perfectiveStem
          || typedFrame?.slots?.predicate?.stem
        : machineryFrame?.citationRuleFrame?.stemRealization
          || machineryFrame?.citationRuleFrame?.stem
          || machineryFrame?.sourceVerbstem
          || machineryFrame?.stem
          || typedFrame?.slots?.predicate?.stem;
      return normalizeClassicalNahuatlCanvasCitationPredicateStem(predicateStem);
    }
    function buildClassicalNahuatlCanvasCitationStage({
      stageRole = "",
      predicateStem = "",
      positions = [],
      initialVowelKind = "",
      directionalPrefix = "",
      hypothetical = false,
      sourceAuthority = "canonical-typed-machinery",
      causativeCitationRole = "",
      machineryFrame = null
    } = {}) {
      const normalizedCausativeCitationRole = ["tē", "tla", "m-o", "m-Ø"].includes(causativeCitationRole)
        ? causativeCitationRole
        : "";
      const orderedParticipantRoles = Object.freeze((Array.isArray(positions) ? positions : []).map(position => Object.freeze({
        objectId: position.objectId || "",
        objectKind: normalizeClassicalNahuatlCanvasObjectKind(position.objectKind),
        objectPerson: position.objectPerson || "",
        governor: position.governor || "",
        derivationalLevel: position.derivationalLevel || 0,
        prominence: position.prominence || "",
        surface: normalizedCausativeCitationRole && position.prominence === "mainline"
          ? normalizedCausativeCitationRole
          : getClassicalNahuatlCanvasCitationRole(position, initialVowelKind, machineryFrame)
      })).filter(role => role.surface));
      const prefixes = [normalizeClassicalNahuatlDerivedVncToken(directionalPrefix), ...orderedParticipantRoles.map(role => role.surface)].filter(Boolean);
      const normalizedPredicateStem = normalizeClassicalNahuatlCanvasCitationPredicateStem(predicateStem);
      const citationCore = `${prefixes.length ? `${prefixes.join("+")}-` : ""}(${normalizedPredicateStem})`.normalize("NFC");
      return Object.freeze({
        kind: "classical-nahuatl-derived-vnc-canvas-citation-stage-frame",
        version: CLASSICAL_NAHUATL_LESSON25_LATER_LAYERS_VERSION,
        stageRole,
        predicateStem: normalizedPredicateStem,
        initialVowelKind: normalizeClassicalNahuatlKey(initialVowelKind),
        participantPositions: Object.freeze((Array.isArray(positions) ? positions : []).map(position => Object.freeze({ ...position }))),
        orderedParticipantRoles,
        participantCount: orderedParticipantRoles.length,
        directionalPrefix: normalizeClassicalNahuatlDerivedVncToken(directionalPrefix),
        hypothetical: hypothetical === true,
        sourceAuthority,
        causativeCitationRole: normalizedCausativeCitationRole,
        citationRealization: `${hypothetical ? "*" : ""}${citationCore}`
      });
    }
    function getClassicalNahuatlCanvasTypedBridgeDescriptor(derivationOption = null) {
      const bridgeRecord = derivationOption?.lesson20NonactiveStemRecord || null;
      const exactBridgeFrame = derivationOption?.exactNonactiveBridgeFrame || null;
      const stem = normalizeClassicalNahuatlDerivedVncToken(
        derivationOption?.citationBridgeStem
        || exactBridgeFrame?.nonactiveStem
        || bridgeRecord?.nonactiveStem
        || derivationOption?.licensedLesson20NonactiveStem
        || derivationOption?.lesson20NonactiveStem
        || ""
      );
      const visibility = normalizeClassicalNahuatlKey(
        derivationOption?.citationBridgeVisibility
        || exactBridgeFrame?.citationVisibility
        || "visible"
      );
      const recordAuthority = normalizeClassicalNahuatlKey(bridgeRecord?.selectedFormationAuthority || "");
      const hasExplicitHypothetical = typeof derivationOption?.citationBridgeHypothetical === "boolean";
      return Object.freeze({
        stem,
        visibility,
        hypothetical: hasExplicitHypothetical
          ? derivationOption.citationBridgeHypothetical
          : exactBridgeFrame
            ? exactBridgeFrame.hypothetical === true
            : Boolean(recordAuthority && recordAuthority !== "productive-rule" && recordAuthority !== "exact-attested-formation"),
        sourceAuthority: derivationOption?.citationBridgeAuthority
          || exactBridgeFrame?.sourceAuthority
          || bridgeRecord?.selectedFormationAuthority
          || "typed-lesson20-nonactive-bridge"
      });
    }
    function buildClassicalNahuatlCanvasSourcePrehistoryStage(derivationOption = null, {
      positions = [],
      initialVowelKind = "",
      machineryFrame = null
    } = {}) {
      const underlyingSource = normalizeClassicalNahuatlDerivedVncToken(derivationOption?.targetConstruction?.underlyingSource || "");
      if (!underlyingSource || !String(derivationOption?.derivationRoute || "").includes("fused-destockal")) return null;
      return buildClassicalNahuatlCanvasCitationStage({
        stageRole: "typed-source-prehistory",
        predicateStem: underlyingSource,
        positions,
        initialVowelKind,
        hypothetical: true,
        sourceAuthority: "signed-andrews-fused-destockal-source-analysis",
        machineryFrame
      });
    }
    function buildClassicalNahuatlCanvasCitationProjectionFrameInternal(machineryFrame = null, options = {}) {
      const rejectedAuthorityFields = getClassicalNahuatlCanvasRejectedAuthorityFields(options);
      if (rejectedAuthorityFields.length) {
        return buildBlockedClassicalNahuatlCanvasSurfaceFrame(CLASSICAL_NAHUATL_LESSONS2425_CANVAS_CITATION_PROJECTION_KIND, machineryFrame, "classical-lessons24-25-caller-supplied-surface-authority-rejected", rejectedAuthorityFields);
      }
      const typedFrame = getClassicalNahuatlFinalTypedVncSlotFrame(machineryFrame);
      const runtimeTarget = getClassicalNahuatlDerivedVncRuntimeTarget();
      if (!isCanonicalClassicalNahuatlCanvasMachineryFrame(machineryFrame)
        || typeof runtimeTarget?.isClassicalNahuatlVncSlotFrame !== "function"
        || runtimeTarget.isClassicalNahuatlVncSlotFrame(typedFrame) !== true) {
        return buildBlockedClassicalNahuatlCanvasSurfaceFrame(CLASSICAL_NAHUATL_LESSONS2425_CANVAS_CITATION_PROJECTION_KIND, machineryFrame);
      }
      const positions = getClassicalNahuatlCanvasCitationPositions(machineryFrame, typedFrame);
      const predicateStem = getClassicalNahuatlCanvasCitationPredicateStem(machineryFrame, typedFrame);
      const orderedParticipantRoles = Object.freeze(positions.map(position => Object.freeze({
        objectId: position.objectId || "",
        objectKind: normalizeClassicalNahuatlCanvasObjectKind(position.objectKind),
        objectPerson: position.objectPerson || "",
        governor: position.governor || "",
        derivationalLevel: position.derivationalLevel || 0,
        prominence: position.prominence || "",
        surface: getClassicalNahuatlCanvasCitationRole(position, machineryFrame?.citationRuleFrame?.initialVowelKind || "", machineryFrame)
      })).filter(role => role.surface));
      const directionalPrefix = normalizeClassicalNahuatlDerivedVncToken(machineryFrame?.targetEnvironment?.directionalPrefix || "");
      const operationFrame = machineryFrame?.derivationOperationFrame || null;
      const selectedOption = operationFrame?.selectedOption || null;
      const sourceMachineryFrame = operationFrame?.sourceMachineryFrame || null;
      const sourceTypedFrame = sourceMachineryFrame ? getClassicalNahuatlFinalTypedVncSlotFrame(sourceMachineryFrame) : null;
      const sourcePositions = sourceMachineryFrame && sourceTypedFrame
        ? getClassicalNahuatlCanvasCitationPositions(sourceMachineryFrame, sourceTypedFrame)
        : Object.freeze([]);
      const sourceStage = buildClassicalNahuatlCanvasCitationStage({
        stageRole: "source",
        predicateStem: operationFrame?.sourceStem || predicateStem,
        positions: operationFrame ? sourcePositions : positions,
        initialVowelKind: operationFrame ? sourceMachineryFrame?.citationRuleFrame?.initialVowelKind || "" : machineryFrame?.citationRuleFrame?.initialVowelKind || "",
        sourceAuthority: operationFrame ? "canonical-derivation-source-machinery" : "canonical-typed-machinery",
        machineryFrame: operationFrame ? sourceMachineryFrame : machineryFrame
      });
      const sourcePrehistoryStage = buildClassicalNahuatlCanvasSourcePrehistoryStage(selectedOption, {
        positions: sourcePositions,
        initialVowelKind: sourceMachineryFrame?.citationRuleFrame?.initialVowelKind || "",
        machineryFrame: sourceMachineryFrame
      });
      const bridgeDescriptor = getClassicalNahuatlCanvasTypedBridgeDescriptor(selectedOption);
      const bridgeStage = bridgeDescriptor.stem && bridgeDescriptor.visibility !== "implicit" ? buildClassicalNahuatlCanvasCitationStage({
        stageRole: "lesson20-nonactive-bridge",
        predicateStem: bridgeDescriptor.stem,
        positions: [],
        hypothetical: bridgeDescriptor.hypothetical,
        sourceAuthority: bridgeDescriptor.sourceAuthority,
        machineryFrame
      }) : null;
      const targetStage = buildClassicalNahuatlCanvasCitationStage({
        stageRole: operationFrame ? "derivation-target" : "surface",
        predicateStem,
        positions,
        initialVowelKind: machineryFrame?.citationRuleFrame?.initialVowelKind || "",
        directionalPrefix,
        sourceAuthority: operationFrame ? "canonical-derivation-operation-and-participant-transform" : "canonical-typed-machinery",
        causativeCitationRole: selectedOption?.causativeCitationRole || "",
        machineryFrame
      });
      const citationStages = Object.freeze(operationFrame
        ? [...(sourcePrehistoryStage ? [sourcePrehistoryStage] : []), sourceStage, ...(bridgeStage ? [bridgeStage] : []), targetStage]
        : [targetStage]);
      const sourceHistoryRealization = operationFrame
        ? [...(sourcePrehistoryStage ? [sourcePrehistoryStage] : []), sourceStage, ...(bridgeStage ? [bridgeStage] : [])].map(stage => stage.citationRealization).join(" > ")
        : targetStage.citationRealization;
      const frame = {
        kind: CLASSICAL_NAHUATL_LESSONS2425_CANVAS_CITATION_PROJECTION_KIND,
        version: CLASSICAL_NAHUATL_LESSON25_LATER_LAYERS_VERSION,
        lesson: "Andrews Lessons 24-25",
        section: machineryFrame?.derivationOperationFrame?.selectedOption?.andrewsSection || "24.1-25.9",
        sourceAuthority: "Andrews transcription and canonical typed projective roles",
        sourceDocument: CLASSICAL_NAHUATL_LESSON25_SOURCE_DOCUMENT,
        authorizationStatus: "authorized",
        blockReason: "",
        machineryFrame,
        typedFrame,
        participantPositions: positions,
        orderedParticipantRoles,
        participantCount: orderedParticipantRoles.length,
        predicateStem,
        citationStages,
        sourceHistoryRealization,
        relationRealization: operationFrame ? `${sourceHistoryRealization} > ${targetStage.citationRealization}` : targetStage.citationRealization,
        ruleFrames: Object.freeze([Object.freeze({
          ruleId: "cn-l24-25-citation-projective-role-order",
          section: "24.1-25.9",
          operation: "project-canonical-object-position-kinds-as-citation-level-projective-roles"
        })]),
        wordRealization: "",
        citationRealization: targetStage.citationRealization,
        typedFrameAuthority: true,
        grammarAuthority: true,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        callerSuppliedAuthorityAccepted: false,
        catalogTargetAuthority: false,
        grammarGenerationAllowed: true,
        surfaceGenerationAllowed: true,
        rejectedAuthorityFields: Object.freeze([])
      };
      frame.canonicalSignature = signClassicalNahuatlLesson25Value(getClassicalNahuatlCanvasSurfaceSignaturePayload(frame));
      return Object.freeze(frame);
    }
    function buildClassicalNahuatlCanvasCitationProjectionFrame(machineryFrame = null, options = {}) {
      return buildClassicalNahuatlCanvasCitationProjectionFrameInternal(machineryFrame, options);
    }
    function isClassicalNahuatlCanvasCitationProjectionFrame(frame = null) {
      if (!frame
        || frame.kind !== CLASSICAL_NAHUATL_LESSONS2425_CANVAS_CITATION_PROJECTION_KIND
        || frame.version !== CLASSICAL_NAHUATL_LESSON25_LATER_LAYERS_VERSION
        || frame.authorizationStatus !== "authorized"
        || frame.typedFrameAuthority !== true
        || frame.grammarAuthority !== true
        || frame.formulaStringAuthority !== false
        || frame.surfaceStringAuthority !== false
        || frame.callerSuppliedAuthorityAccepted !== false
        || frame.catalogTargetAuthority !== false
        || frame.grammarGenerationAllowed !== true
        || frame.surfaceGenerationAllowed !== true) {
        return false;
      }
      const rebuilt = buildClassicalNahuatlCanvasCitationProjectionFrameInternal(frame.machineryFrame);
      return Boolean(rebuilt.authorizationStatus === "authorized"
        && rebuilt.machineryFrame === frame.machineryFrame
        && haveSameClassicalNahuatlLesson25OwnPropertyNames(rebuilt, frame)
        && frame.canonicalSignature === signClassicalNahuatlLesson25Value(getClassicalNahuatlCanvasSurfaceSignaturePayload(frame))
        && rebuilt.canonicalSignature === frame.canonicalSignature
        && areClassicalNahuatlLesson25ValuesEqual(getClassicalNahuatlCanvasSurfaceSignaturePayload(rebuilt), getClassicalNahuatlCanvasSurfaceSignaturePayload(frame)));
    }
    function getClassicalNahuatlCanvasCitationInventorySignaturePayload(frame = {}) {
      return {
        kind: frame.kind,
        version: frame.version,
        lesson: frame.lesson,
        section: frame.section,
        sourceAuthority: frame.sourceAuthority,
        sourceDocument: frame.sourceDocument,
        authorizationStatus: frame.authorizationStatus,
        blockReason: frame.blockReason,
        sourceKind: frame.sourceMachineryFrame?.kind || "",
        sourceCanonicalSignature: frame.sourceMachineryFrame?.canonicalSignature || "",
        sourceTypedSemanticIdentity: getClassicalNahuatlFinalTypedVncSlotFrame(frame.sourceMachineryFrame)?.semanticIdentity || "",
        derivationType: frame.derivationType,
        targetSubject: frame.targetSubject,
        derivationInventorySignature: frame.derivationOptionInventory?.canonicalSignature || "",
        options: (frame.options || []).map(option => ({
          optionId: option.optionId,
          derivationOptionId: option.derivationOptionId,
          operationSignature: option.operationFrame?.canonicalSignature || "",
          machinerySignature: option.machineryFrame?.canonicalSignature || "",
          projectionSignature: option.projectionFrame?.canonicalSignature || "",
          requestedCausativeObjectKind: option.requestedCausativeObjectKind,
          causativeObjectKind: option.causativeObjectKind,
          causativeObjectPersonBinding: option.causativeObjectPersonBinding,
          causativeSpecificShuntlineRealization: option.causativeSpecificShuntlineRealization,
          relationRealization: option.relationRealization
        })),
        typedFrameAuthority: frame.typedFrameAuthority,
        formulaStringAuthority: frame.formulaStringAuthority,
        surfaceStringAuthority: frame.surfaceStringAuthority,
        callerSuppliedAuthorityAccepted: frame.callerSuppliedAuthorityAccepted,
        catalogTargetAuthority: frame.catalogTargetAuthority,
        rejectedAuthorityFields: frame.rejectedAuthorityFields || []
      };
    }
    function getClassicalNahuatlCanvasCitationInventoryOptionSignaturePayload(option = {}) {
      return {
        kind: option.kind,
        version: option.version,
        optionId: option.optionId,
        derivationOptionId: option.derivationOptionId,
        requestedCausativeObjectKind: option.requestedCausativeObjectKind,
        causativeObjectKind: option.causativeObjectKind,
        causativeObjectPersonBinding: option.causativeObjectPersonBinding,
        causativeSpecificShuntlineRealization: option.causativeSpecificShuntlineRealization,
        operationSignature: option.operationFrame?.canonicalSignature || "",
        machinerySignature: option.machineryFrame?.canonicalSignature || "",
        projectionSignature: option.projectionFrame?.canonicalSignature || "",
        relationRealization: option.relationRealization,
        formulaStringAuthority: option.formulaStringAuthority,
        surfaceStringAuthority: option.surfaceStringAuthority,
        catalogTargetAuthority: option.catalogTargetAuthority
      };
    }
    function buildBlockedClassicalNahuatlCanvasCitationProjectionInventory(sourceMachineryFrame = null, blockReason = "classical-lessons24-25-canonical-source-machinery-required", rejectedAuthorityFields = []) {
      return Object.freeze({
        kind: CLASSICAL_NAHUATL_LESSONS2425_CANVAS_CITATION_INVENTORY_KIND,
        version: CLASSICAL_NAHUATL_LESSON25_LATER_LAYERS_VERSION,
        lesson: "Andrews Lessons 24-25",
        section: "24.1-25.16",
        sourceAuthority: "Andrews transcription and canonical typed derivation-option inventory",
        sourceDocument: CLASSICAL_NAHUATL_LESSON25_SOURCE_DOCUMENT,
        authorizationStatus: "blocked",
        blockReason,
        sourceMachineryFrame,
        derivationType: "causative",
        targetSubject: "",
        derivationOptionInventory: null,
        options: Object.freeze([]),
        optionCount: 0,
        typedFrameAuthority: true,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        callerSuppliedAuthorityAccepted: false,
        catalogTargetAuthority: false,
        rejectedAuthorityFields: Object.freeze([...rejectedAuthorityFields]),
        canonicalSignature: ""
      });
    }
    function getClassicalNahuatlCanvasSourceSubject(sourceMachineryFrame = null) {
      return normalizeClassicalNahuatlKey(
        sourceMachineryFrame?.priorVncFrame?.personDyad?.subject
        || sourceMachineryFrame?.priorVncFrame?.subject
        || sourceMachineryFrame?.multipleObjectClusterFrame?.subject
        || sourceMachineryFrame?.subject
        || ""
      );
    }
    function getClassicalNahuatlCanvasCitationProjectionInventoryInternal(sourceMachineryFrame = null, options = {}) {
      const rejectedAuthorityFields = getClassicalNahuatlCanvasRejectedAuthorityFields(options);
      if (rejectedAuthorityFields.length) {
        return buildBlockedClassicalNahuatlCanvasCitationProjectionInventory(sourceMachineryFrame, "classical-lessons24-25-caller-supplied-surface-authority-rejected", rejectedAuthorityFields);
      }
      const runtimeTarget = getClassicalNahuatlDerivedVncRuntimeTarget();
      const derivationType = normalizeClassicalNahuatlKey(options.derivationType || "causative");
      const sourceSubject = getClassicalNahuatlCanvasSourceSubject(sourceMachineryFrame);
      const targetSubject = normalizeClassicalNahuatlKey(options.targetSubject || sourceSubject);
      if (!isCanonicalClassicalNahuatlCanvasMachineryFrame(sourceMachineryFrame)
        || derivationType !== "causative"
        || !["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"].includes(targetSubject)
        || typeof runtimeTarget?.getClassicalNahuatlVncDerivationOptionInventory !== "function"
        || typeof runtimeTarget?.isClassicalNahuatlVncDerivationOptionInventory !== "function"
        || typeof runtimeTarget?.deriveClassicalNahuatlVncDerivationOperationFrame !== "function"
        || typeof runtimeTarget?.isClassicalNahuatlVncDerivationOperationFrame !== "function"
        || typeof runtimeTarget?.buildClassicalNahuatlDerivedVncMachineryFrame !== "function"
        || typeof runtimeTarget?.isClassicalNahuatlDerivedVncMachineryFrame !== "function") {
        return buildBlockedClassicalNahuatlCanvasCitationProjectionInventory(sourceMachineryFrame);
      }
      const derivationOptionInventory = runtimeTarget.getClassicalNahuatlVncDerivationOptionInventory(sourceMachineryFrame, { derivationType });
      if (runtimeTarget.isClassicalNahuatlVncDerivationOptionInventory(derivationOptionInventory) !== true) {
        return buildBlockedClassicalNahuatlCanvasCitationProjectionInventory(sourceMachineryFrame, derivationOptionInventory?.blockReason || "classical-lessons24-25-canonical-derivation-option-inventory-required");
      }
      const candidates = [];
      const operationSignatures = new Set();
      const sourceVoice = normalizeClassicalNahuatlKey(derivationOptionInventory.sourceAnalysisFrame?.sourceVoice || "active");
      const causativeObjectKindChoices = sourceVoice === "active"
        ? ["specific-projective", "reflexive"]
        : [""];
      for (const derivationOption of derivationOptionInventory.options || []) {
        for (const requestedCausativeObjectKind of causativeObjectKindChoices) {
          const baseRequest = {
            derivationType,
            optionId: derivationOption.optionId,
            targetSubject,
            ...(requestedCausativeObjectKind ? { causativeObjectKind: requestedCausativeObjectKind } : {})
          };
          const preliminary = runtimeTarget.deriveClassicalNahuatlVncDerivationOperationFrame(sourceMachineryFrame, baseRequest);
          if (preliminary?.authorizationStatus !== "authorized") continue;
          const shuntlineChoices = preliminary.participantTransformFrame?.causativeSpecificShuntlineChoiceEligible === true
            ? ["silent", "sounded"]
            : [""];
          for (const causativeSpecificShuntlineRealization of shuntlineChoices) {
            const operationFrame = causativeSpecificShuntlineRealization
              ? runtimeTarget.deriveClassicalNahuatlVncDerivationOperationFrame(sourceMachineryFrame, {
                ...baseRequest,
                causativeSpecificShuntlineRealization
              })
              : preliminary;
            if (runtimeTarget.isClassicalNahuatlVncDerivationOperationFrame(operationFrame) !== true
              || operationSignatures.has(operationFrame.canonicalSignature)) continue;
            const machineryFrame = runtimeTarget.buildClassicalNahuatlDerivedVncMachineryFrame(sourceMachineryFrame, operationFrame, {
              mood: normalizeClassicalNahuatlKey(sourceMachineryFrame?.priorVncFrame?.personDyad?.mood || sourceMachineryFrame?.priorVncFrame?.mood || "indicative"),
              tense: normalizeClassicalNahuatlKey(sourceMachineryFrame?.priorVncFrame?.tense || "present"),
              targetSubject
            });
            if (runtimeTarget.isClassicalNahuatlDerivedVncMachineryFrame(machineryFrame) !== true) continue;
            const projectionFrame = buildClassicalNahuatlCanvasCitationProjectionFrameInternal(machineryFrame);
            if (!isClassicalNahuatlCanvasCitationProjectionFrame(projectionFrame)) continue;
            operationSignatures.add(operationFrame.canonicalSignature);
            const optionFrame = {
              kind: "classical-nahuatl-derived-vnc-canvas-citation-projection-option",
              version: CLASSICAL_NAHUATL_LESSON25_LATER_LAYERS_VERSION,
              optionId: `canvas-citation:${operationFrame.canonicalSignature}`,
              derivationOptionId: derivationOption.optionId,
              requestedCausativeObjectKind,
              causativeObjectKind: operationFrame.participantTransformFrame.causativeObjectKind,
              causativeObjectPersonBinding: operationFrame.participantTransformFrame.causativeObjectPersonBinding,
              causativeSpecificShuntlineRealization: operationFrame.participantTransformFrame.causativeSpecificShuntlineRealization,
              operationFrame,
              machineryFrame,
              projectionFrame,
              relationRealization: projectionFrame.relationRealization,
              formulaStringAuthority: false,
              surfaceStringAuthority: false,
              catalogTargetAuthority: false
            };
            optionFrame.canonicalSignature = signClassicalNahuatlLesson25Value(getClassicalNahuatlCanvasCitationInventoryOptionSignaturePayload(optionFrame));
            candidates.push(Object.freeze(optionFrame));
          }
        }
      }
      const frame = {
        kind: CLASSICAL_NAHUATL_LESSONS2425_CANVAS_CITATION_INVENTORY_KIND,
        version: CLASSICAL_NAHUATL_LESSON25_LATER_LAYERS_VERSION,
        lesson: "Andrews Lessons 24-25",
        section: "24.1-25.16",
        sourceAuthority: "Andrews transcription and canonical typed derivation-option inventory",
        sourceDocument: CLASSICAL_NAHUATL_LESSON25_SOURCE_DOCUMENT,
        authorizationStatus: candidates.length ? "authorized" : "blocked",
        blockReason: candidates.length ? "" : "classical-lessons24-25-no-canonical-citation-projection-options",
        sourceMachineryFrame,
        derivationType,
        targetSubject,
        derivationOptionInventory,
        options: Object.freeze(candidates),
        optionCount: candidates.length,
        typedFrameAuthority: true,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        callerSuppliedAuthorityAccepted: false,
        catalogTargetAuthority: false,
        rejectedAuthorityFields: Object.freeze([])
      };
      frame.canonicalSignature = signClassicalNahuatlLesson25Value(getClassicalNahuatlCanvasCitationInventorySignaturePayload(frame));
      return Object.freeze(frame);
    }
    function getClassicalNahuatlCanvasCitationProjectionInventory(sourceMachineryFrame = null, options = {}) {
      return getClassicalNahuatlCanvasCitationProjectionInventoryInternal(sourceMachineryFrame, options);
    }
    function isClassicalNahuatlCanvasCitationProjectionInventory(frame = null) {
      if (!frame
        || frame.kind !== CLASSICAL_NAHUATL_LESSONS2425_CANVAS_CITATION_INVENTORY_KIND
        || frame.version !== CLASSICAL_NAHUATL_LESSON25_LATER_LAYERS_VERSION
        || frame.authorizationStatus !== "authorized"
        || frame.typedFrameAuthority !== true
        || frame.formulaStringAuthority !== false
        || frame.surfaceStringAuthority !== false
        || frame.callerSuppliedAuthorityAccepted !== false
        || frame.catalogTargetAuthority !== false
        || frame.optionCount !== frame.options?.length
        || !(frame.options || []).every(option => isClassicalNahuatlCanvasCitationProjectionFrame(option.projectionFrame))) {
        return false;
      }
      const rebuilt = getClassicalNahuatlCanvasCitationProjectionInventoryInternal(frame.sourceMachineryFrame, {
        derivationType: frame.derivationType,
        targetSubject: frame.targetSubject
      });
      return Boolean(rebuilt.authorizationStatus === "authorized"
        && rebuilt.sourceMachineryFrame === frame.sourceMachineryFrame
        && haveSameClassicalNahuatlLesson25OwnPropertyNames(rebuilt, frame)
        && frame.options.every((option, index) => {
          const rebuiltOption = rebuilt.options[index];
          return Boolean(rebuiltOption
            && haveSameClassicalNahuatlLesson25OwnPropertyNames(rebuiltOption, option)
            && option.canonicalSignature === signClassicalNahuatlLesson25Value(getClassicalNahuatlCanvasCitationInventoryOptionSignaturePayload(option))
            && rebuiltOption.canonicalSignature === option.canonicalSignature
            && areClassicalNahuatlLesson25ValuesEqual(getClassicalNahuatlCanvasCitationInventoryOptionSignaturePayload(rebuiltOption), getClassicalNahuatlCanvasCitationInventoryOptionSignaturePayload(option)));
        })
        && frame.canonicalSignature === signClassicalNahuatlLesson25Value(getClassicalNahuatlCanvasCitationInventorySignaturePayload(frame))
        && rebuilt.canonicalSignature === frame.canonicalSignature
        && areClassicalNahuatlLesson25ValuesEqual(getClassicalNahuatlCanvasCitationInventorySignaturePayload(rebuilt), getClassicalNahuatlCanvasCitationInventorySignaturePayload(frame)));
    }
    function getClassicalNahuatlCanvasSchematicCitationPossibilitySignaturePayload(possibility = {}) {
      return {
        kind: possibility.kind,
        version: possibility.version,
        profile: possibility.profile,
        derivationOptionId: possibility.derivationOptionId,
        derivationOptionSignature: possibility.derivationOptionSignature,
        operationSignature: possibility.operationFrame?.canonicalSignature || "",
        section: possibility.section,
        schematicCitationRole: possibility.schematicCitationRole,
        sourceCitationRealization: possibility.sourceCitationRealization,
        sourceVoiceHistoryRealization: possibility.sourceVoiceHistoryRealization,
        sourceHistoryRealization: possibility.sourceHistoryRealization,
        citationRealization: possibility.citationRealization,
        relationRealization: possibility.relationRealization,
        participantPositions: possibility.participantPositions || [],
        orderedParticipantRoles: possibility.orderedParticipantRoles || [],
        participantCount: possibility.participantCount || 0,
        typedFrameAuthority: possibility.typedFrameAuthority,
        formulaStringAuthority: possibility.formulaStringAuthority,
        surfaceStringAuthority: possibility.surfaceStringAuthority,
        callerSuppliedAuthorityAccepted: possibility.callerSuppliedAuthorityAccepted,
        catalogTargetAuthority: possibility.catalogTargetAuthority
      };
    }
    function getClassicalNahuatlCanvasSchematicCitationInventorySignaturePayload(frame = {}) {
      return {
        kind: frame.kind,
        version: frame.version,
        lesson: frame.lesson,
        section: frame.section,
        sourceAuthority: frame.sourceAuthority,
        sourceDocument: frame.sourceDocument,
        authorizationStatus: frame.authorizationStatus,
        blockReason: frame.blockReason,
        sourceKind: frame.sourceMachineryFrame?.kind || "",
        sourceCanonicalSignature: frame.sourceMachineryFrame?.canonicalSignature || "",
        derivationInventorySignature: frame.derivationOptionInventory?.canonicalSignature || "",
        sourceProjectionSignature: frame.sourceProjectionFrame?.canonicalSignature || "",
        participantProfiles: frame.participantProfiles || [],
        possibilities: (frame.possibilities || []).map(possibility => possibility.canonicalSignature || ""),
        possibilityCount: frame.possibilityCount || 0,
        typedFrameAuthority: frame.typedFrameAuthority,
        formulaStringAuthority: frame.formulaStringAuthority,
        surfaceStringAuthority: frame.surfaceStringAuthority,
        callerSuppliedAuthorityAccepted: frame.callerSuppliedAuthorityAccepted,
        catalogTargetAuthority: frame.catalogTargetAuthority
      };
    }
    function buildBlockedClassicalNahuatlCanvasSchematicCitationPossibilityInventory(sourceMachineryFrame = null, derivationOptionInventory = null, blockReason = "classical-lessons24-25-canonical-source-and-inventory-required") {
      return Object.freeze({
        kind: CLASSICAL_NAHUATL_LESSONS2425_CANVAS_SCHEMATIC_CITATION_POSSIBILITY_INVENTORY_KIND,
        version: CLASSICAL_NAHUATL_LESSON25_LATER_LAYERS_VERSION,
        lesson: "Andrews Lessons 24-25",
        section: "24.1-25.16",
        sourceAuthority: "canonical typed source, derivation-option inventory, participant transform, and Lesson 23 ordering",
        sourceDocument: CLASSICAL_NAHUATL_LESSON25_SOURCE_DOCUMENT,
        authorizationStatus: "blocked",
        blockReason,
        sourceMachineryFrame,
        derivationOptionInventory,
        sourceProjectionFrame: null,
        participantProfiles: CLASSICAL_NAHUATL_LESSONS2425_CANVAS_SCHEMATIC_CAUSATIVE_PROFILES,
        possibilities: Object.freeze([]),
        possibilityCount: 0,
        typedFrameAuthority: true,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        callerSuppliedAuthorityAccepted: false,
        catalogTargetAuthority: false,
        canonicalSignature: ""
      });
    }
    function getClassicalNahuatlCanvasSchematicCitationPositions(runtimeTarget = null, operationFrame = null) {
      const objectRequests = Array.isArray(operationFrame?.targetObjectRequests) ? operationFrame.targetObjectRequests : [];
      if (objectRequests.length === 1) {
        return Object.freeze([Object.freeze({
          objectId: "source-object-1",
          objectKind: objectRequests[0].objectKind,
          objectPerson: objectRequests[0].objectKind === "reflexive" && /^3(?:sg|pl)$/u.test(objectRequests[0].objectPerson)
            ? "nonfirst-common"
            : objectRequests[0].objectPerson,
          governor: "directive",
          derivationalLevel: 1,
          prominence: "mainline",
          sounded: true
        })]);
      }
      if (objectRequests.length < 2
        || typeof runtimeTarget?.buildClassicalNahuatlObjectClusterFrame !== "function"
        || typeof runtimeTarget?.isClassicalNahuatlObjectClusterFrame !== "function") {
        return null;
      }
      const cluster = runtimeTarget.buildClassicalNahuatlObjectClusterFrame(operationFrame.targetStem, {
        subject: operationFrame.targetSubject,
        subjectCarrier: "",
        predicateStem: operationFrame.targetStem,
        tense: operationFrame.sourceMachineryFrame?.priorVncFrame?.tense || "present",
        objectRequests,
        causativeSpecificShuntlineRealization: operationFrame.causativeSpecificShuntlineRealization,
        rareThirdCausativeMeaningSupported:
          operationFrame.derivationType === "causative"
          && objectRequests.length === 3
          && objectRequests
            .slice()
            .sort((left, right) => left.derivationalLevel - right.derivationalLevel)
            .at(-1)?.governor === "causative",
        exceptionalSuffixOrderAuthorized:
          operationFrame.derivationType === "causative"
          && objectRequests.length === 3
          && objectRequests.some((request) => request.governor === "applicative"),
        minimumPositionCount: objectRequests.length,
        maximumPositionCount: objectRequests.length
      });
      return runtimeTarget.isClassicalNahuatlObjectClusterFrame(cluster, operationFrame.targetStem) === true
        ? Object.freeze(cluster.positions.map(position => Object.freeze({ ...position })))
        : null;
    }
    function buildClassicalNahuatlCanvasSchematicBridgeStage(derivationOption = null, operationFrame = null) {
      const bridgeDescriptor = getClassicalNahuatlCanvasTypedBridgeDescriptor(derivationOption);
      if (!bridgeDescriptor.stem || bridgeDescriptor.visibility === "implicit") return null;
      return buildClassicalNahuatlCanvasCitationStage({
        stageRole: "lesson20-nonactive-bridge",
        predicateStem: bridgeDescriptor.stem,
        positions: [],
        hypothetical: bridgeDescriptor.hypothetical,
        sourceAuthority: bridgeDescriptor.sourceAuthority,
        machineryFrame: Object.freeze({ derivationOperationFrame: operationFrame })
      });
    }
    function getClassicalNahuatlCanvasSchematicCitationPossibilityInventoryInternal(sourceMachineryFrame = null, derivationOptionInventory = null) {
      const runtimeTarget = getClassicalNahuatlDerivedVncRuntimeTarget();
      if (!isCanonicalClassicalNahuatlCanvasMachineryFrame(sourceMachineryFrame)
        || typeof runtimeTarget?.isClassicalNahuatlVncDerivationOptionInventory !== "function"
        || runtimeTarget.isClassicalNahuatlVncDerivationOptionInventory(derivationOptionInventory) !== true
        || derivationOptionInventory?.derivationType !== "causative"
        || derivationOptionInventory?.sourceMachineryFrame !== sourceMachineryFrame
        || typeof runtimeTarget?.deriveClassicalNahuatlVncDerivationOperationBatchFrame !== "function"
        || typeof runtimeTarget?.isClassicalNahuatlVncDerivationOperationBatchFrame !== "function") {
        return buildBlockedClassicalNahuatlCanvasSchematicCitationPossibilityInventory(sourceMachineryFrame, derivationOptionInventory);
      }
      const sourceProjectionFrame = buildClassicalNahuatlCanvasCitationProjectionFrameInternal(sourceMachineryFrame);
      if (!isClassicalNahuatlCanvasCitationProjectionFrame(sourceProjectionFrame)) {
        return buildBlockedClassicalNahuatlCanvasSchematicCitationPossibilityInventory(sourceMachineryFrame, derivationOptionInventory, sourceProjectionFrame?.blockReason || "classical-lessons24-25-canonical-source-citation-required");
      }
      const operationEntries = [];
      for (const derivationOption of derivationOptionInventory.options || []) {
        for (const profile of CLASSICAL_NAHUATL_LESSONS2425_CANVAS_SCHEMATIC_CAUSATIVE_PROFILES) {
          operationEntries.push(Object.freeze({
            derivationOption,
            profile,
            request: Object.freeze({
              derivationType: "causative",
              optionId: derivationOption.optionId,
              targetSubject: profile.targetSubject,
              causativeObjectKind: profile.causativeObjectKind
            })
          }));
        }
      }
      const operationBatchFrame = runtimeTarget.deriveClassicalNahuatlVncDerivationOperationBatchFrame(
        sourceMachineryFrame,
        derivationOptionInventory,
        operationEntries.map(entry => entry.request)
      );
      if (runtimeTarget.isClassicalNahuatlVncDerivationOperationBatchFrame(operationBatchFrame) !== true) {
        return buildBlockedClassicalNahuatlCanvasSchematicCitationPossibilityInventory(
          sourceMachineryFrame,
          derivationOptionInventory,
          operationBatchFrame?.blockReason || "classical-lessons24-25-canonical-operation-batch-required"
        );
      }
      const possibilities = [];
      operationEntries.forEach((entry, index) => {
          const { derivationOption, profile } = entry;
          const operationFrame = operationBatchFrame.operationFrames[index];
          if (operationFrame?.authorizationStatus !== "authorized") return;
          const participantPositions = getClassicalNahuatlCanvasSchematicCitationPositions(runtimeTarget, operationFrame);
          if (!participantPositions) return;
          const sourcePrehistoryStage = buildClassicalNahuatlCanvasSourcePrehistoryStage(derivationOption, {
            positions: sourceProjectionFrame.participantPositions,
            initialVowelKind: sourceMachineryFrame?.citationRuleFrame?.initialVowelKind || "",
            machineryFrame: sourceMachineryFrame
          });
          const bridgeStage = buildClassicalNahuatlCanvasSchematicBridgeStage(derivationOption, operationFrame);
          const sourceVoice = normalizeClassicalNahuatlKey(
            derivationOptionInventory.sourceAnalysisFrame?.sourceVoice || "active"
          );
          const lexicalSourceStage = sourceVoice === "impersonal" ? buildClassicalNahuatlCanvasCitationStage({
            stageRole: "lexical-source-before-impersonal-vnc",
            predicateStem: derivationOptionInventory.sourceAnalysisFrame?.sourceStem || operationFrame.sourceStem,
            positions: [],
            sourceAuthority: "canonical-source-analysis-before-source-voice",
            machineryFrame: sourceMachineryFrame
          }) : null;
          const schematicSourceStage = lexicalSourceStage || sourceProjectionFrame;
          const schematicCitationRole = derivationOption.causativeCitationRole
            || normalizeClassicalNahuatlKey(profile.schematicCitationRole);
          const targetStage = buildClassicalNahuatlCanvasCitationStage({
            stageRole: "derivation-target",
            predicateStem: operationFrame.targetStem,
            positions: participantPositions,
            initialVowelKind: sourceMachineryFrame?.citationRuleFrame?.initialVowelKind || "",
            directionalPrefix: operationFrame.targetEnvironment?.directionalPrefix || "",
            sourceAuthority: "canonical-derivation-operation-participant-order-and-typed-schematic-citation-role",
            causativeCitationRole: schematicCitationRole,
            machineryFrame: Object.freeze({ derivationOperationFrame: operationFrame })
          });
          const sourceHistoryRealization = [
            ...(sourcePrehistoryStage ? [sourcePrehistoryStage.citationRealization] : []),
            schematicSourceStage.citationRealization,
            ...(bridgeStage ? [bridgeStage.citationRealization] : [])
          ].join(" > ");
          const possibility = {
            kind: "classical-nahuatl-derived-vnc-canvas-schematic-citation-possibility",
            version: CLASSICAL_NAHUATL_LESSON25_LATER_LAYERS_VERSION,
            profile,
            derivationOptionId: derivationOption.optionId,
            derivationOptionSignature: derivationOption.canonicalSignature,
            operationFrame,
            section: derivationOption.andrewsSection || "24.1-25.16",
            schematicCitationRole,
            sourceCitationRealization: schematicSourceStage.citationRealization,
            sourceVoiceHistoryRealization: sourceProjectionFrame.citationRealization,
            sourceHistoryRealization,
            citationRealization: targetStage.citationRealization,
            relationRealization: `${sourceHistoryRealization} > ${targetStage.citationRealization}`,
            participantPositions,
            orderedParticipantRoles: targetStage.orderedParticipantRoles,
            participantCount: targetStage.participantCount,
            typedFrameAuthority: true,
            formulaStringAuthority: false,
            surfaceStringAuthority: false,
            callerSuppliedAuthorityAccepted: false,
            catalogTargetAuthority: false
          };
          possibility.canonicalSignature = signClassicalNahuatlLesson25Value(getClassicalNahuatlCanvasSchematicCitationPossibilitySignaturePayload(possibility));
          possibilities.push(Object.freeze(possibility));
      });
      const frame = {
        kind: CLASSICAL_NAHUATL_LESSONS2425_CANVAS_SCHEMATIC_CITATION_POSSIBILITY_INVENTORY_KIND,
        version: CLASSICAL_NAHUATL_LESSON25_LATER_LAYERS_VERSION,
        lesson: "Andrews Lessons 24-25",
        section: "24.1-25.16",
        sourceAuthority: "canonical typed source, derivation-option inventory, participant transform, and Lesson 23 ordering",
        sourceDocument: CLASSICAL_NAHUATL_LESSON25_SOURCE_DOCUMENT,
        authorizationStatus: possibilities.length ? "authorized" : "blocked",
        blockReason: possibilities.length ? "" : "classical-lessons24-25-no-canonical-schematic-citation-possibilities",
        sourceMachineryFrame,
        derivationOptionInventory,
        sourceProjectionFrame,
        participantProfiles: CLASSICAL_NAHUATL_LESSONS2425_CANVAS_SCHEMATIC_CAUSATIVE_PROFILES,
        possibilities: Object.freeze(possibilities),
        possibilityCount: possibilities.length,
        typedFrameAuthority: true,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        callerSuppliedAuthorityAccepted: false,
        catalogTargetAuthority: false
      };
      frame.canonicalSignature = signClassicalNahuatlLesson25Value(getClassicalNahuatlCanvasSchematicCitationInventorySignaturePayload(frame));
      return Object.freeze(frame);
    }
    function getClassicalNahuatlCanvasSchematicCitationPossibilityInventory(sourceMachineryFrame = null, derivationOptionInventory = null) {
      return getClassicalNahuatlCanvasSchematicCitationPossibilityInventoryInternal(sourceMachineryFrame, derivationOptionInventory);
    }
    function isClassicalNahuatlCanvasSchematicCitationPossibilityInventory(frame = null) {
      if (!frame
        || frame.kind !== CLASSICAL_NAHUATL_LESSONS2425_CANVAS_SCHEMATIC_CITATION_POSSIBILITY_INVENTORY_KIND
        || frame.version !== CLASSICAL_NAHUATL_LESSON25_LATER_LAYERS_VERSION
        || frame.authorizationStatus !== "authorized"
        || frame.typedFrameAuthority !== true
        || frame.formulaStringAuthority !== false
        || frame.surfaceStringAuthority !== false
        || frame.callerSuppliedAuthorityAccepted !== false
        || frame.catalogTargetAuthority !== false
        || frame.participantProfiles !== CLASSICAL_NAHUATL_LESSONS2425_CANVAS_SCHEMATIC_CAUSATIVE_PROFILES
        || frame.possibilityCount !== frame.possibilities?.length) {
        return false;
      }
      const rebuilt = getClassicalNahuatlCanvasSchematicCitationPossibilityInventoryInternal(frame.sourceMachineryFrame, frame.derivationOptionInventory);
      return Boolean(rebuilt.authorizationStatus === "authorized"
        && rebuilt.sourceMachineryFrame === frame.sourceMachineryFrame
        && rebuilt.derivationOptionInventory === frame.derivationOptionInventory
        && haveSameClassicalNahuatlLesson25OwnPropertyNames(rebuilt, frame)
        && frame.possibilities.every((possibility, index) => {
          const rebuiltPossibility = rebuilt.possibilities[index];
          return Boolean(rebuiltPossibility
            && haveSameClassicalNahuatlLesson25OwnPropertyNames(rebuiltPossibility, possibility)
            && possibility.operationFrame?.sourceMachineryFrame === frame.sourceMachineryFrame
            && possibility.canonicalSignature === signClassicalNahuatlLesson25Value(getClassicalNahuatlCanvasSchematicCitationPossibilitySignaturePayload(possibility))
            && rebuiltPossibility.canonicalSignature === possibility.canonicalSignature
            && areClassicalNahuatlLesson25ValuesEqual(
              getClassicalNahuatlCanvasSchematicCitationPossibilitySignaturePayload(rebuiltPossibility),
              getClassicalNahuatlCanvasSchematicCitationPossibilitySignaturePayload(possibility)
            ));
        })
        && frame.canonicalSignature === signClassicalNahuatlLesson25Value(getClassicalNahuatlCanvasSchematicCitationInventorySignaturePayload(frame))
        && rebuilt.canonicalSignature === frame.canonicalSignature
        && areClassicalNahuatlLesson25ValuesEqual(
          getClassicalNahuatlCanvasSchematicCitationInventorySignaturePayload(rebuilt),
          getClassicalNahuatlCanvasSchematicCitationInventorySignaturePayload(frame)
        ));
    }
    function installClassicalNahuatlLaterLayersClassicGlobals() {
      const runtimeTarget = getClassicalNahuatlDerivedVncRuntimeTarget();
      if (!runtimeTarget || typeof runtimeTarget !== "object") {
        return null;
      }
      Object.assign(runtimeTarget, {
        realizeClassicalNahuatlLesson25TypedVncWord,
        buildClassicalNahuatlVncFiniteSurfaceFrame,
        buildClassicalNahuatlVncConditionedFiniteRealizations,
        isClassicalNahuatlVncFiniteSurfaceFrame,
        buildClassicalNahuatlCanvasCitationProjectionFrame,
        isClassicalNahuatlCanvasCitationProjectionFrame,
        getClassicalNahuatlCanvasCitationProjectionInventory,
        isClassicalNahuatlCanvasCitationProjectionInventory,
        getClassicalNahuatlCanvasSchematicCitationPossibilityInventory,
        isClassicalNahuatlCanvasSchematicCitationPossibilityInventory
      });
      return runtimeTarget;
    }
    installClassicalNahuatlLaterLayersClassicGlobals();

    return {
      CLASSICAL_NAHUATL_LESSON25_LATER_LAYERS_VERSION,
      CLASSICAL_NAHUATL_LESSON25_SOURCE_DOCUMENT,
      CLASSICAL_NAHUATL_VNC_FINITE_SURFACE_KIND,
      CLASSICAL_NAHUATL_LESSONS2425_CANVAS_CITATION_PROJECTION_KIND,
      CLASSICAL_NAHUATL_LESSONS2425_CANVAS_CITATION_INVENTORY_KIND,
      CLASSICAL_NAHUATL_LESSONS2425_CANVAS_SCHEMATIC_CITATION_POSSIBILITY_INVENTORY_KIND,
      CLASSICAL_NAHUATL_LESSONS2425_CANVAS_SCHEMATIC_CAUSATIVE_PROFILES,
      realizeClassicalNahuatlLesson25TypedVncWord,
      buildClassicalNahuatlVncFiniteSurfaceFrame,
      buildClassicalNahuatlVncConditionedFiniteRealizations,
      isClassicalNahuatlVncFiniteSurfaceFrame,
      buildClassicalNahuatlCanvasCitationProjectionFrame,
      isClassicalNahuatlCanvasCitationProjectionFrame,
      getClassicalNahuatlCanvasCitationProjectionInventory,
      isClassicalNahuatlCanvasCitationProjectionInventory,
      getClassicalNahuatlCanvasSchematicCitationPossibilityInventory,
      isClassicalNahuatlCanvasSchematicCitationPossibilityInventory,
      installClassicalNahuatlLaterLayersClassicGlobals
    };
}

export function installClassicalNahuatlLaterLayersGlobals(targetObject = globalThis) {
    const api = createClassicalNahuatlLaterLayersRuntime(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
