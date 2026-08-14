// Canonical modern ESM module.

import {
  CLASSICAL_NAHUATL_VNC_DERIVATION_TYPES,
  normalizeClassicalNahuatlVncDerivationType,
  validateClassicalNahuatlVncDerivationTypeSelection,
} from "../../core/classical/vnc_derivation_evaluator.mjs?v=20260726-lessons2-58-one-system-094";
import {
  CLASSICAL_NAHUATL_VNC_CAUSATIVE_SOURCE_VOICES,
  CLASSICAL_NAHUATL_VNC_TARGET_VOICES,
  validateClassicalNahuatlVncVoiceSelection,
} from "../../core/classical/vnc_layer_evaluator.mjs?v=20260726-lessons2-58-one-system-094";
import {
  buildClassicalResultOutputScopeSelectionFrame,
} from "../../core/output/scope.mjs?v=20260726-lessons2-58-one-system-094";

export function createClassicalNahuatlVncApplicationModule(targetObject = globalThis) {
    const CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION = 1;
    const CLASSICAL_NAHUATL_VNC_APPLICATION_REQUIRED_CAPABILITIES = Object.freeze(["resolveClassicalNahuatlCanonicalSourceStemRecord", "isClassicalNahuatlCanonicalSourceStemRecord", "buildClassicalNahuatlCanonicalSourceSelectionFrame", "isClassicalNahuatlCanonicalSourceSelectionFrame", "buildClassicalNahuatlVerbstemClassFrame", "isClassicalNahuatlVerbstemClassFrame", "buildClassicalNahuatlMultipleObjectVncFrame", "isClassicalNahuatlMultipleObjectVncFrame", "getClassicalNahuatlNonactiveStemOptions", "deriveClassicalNahuatlNonactiveStemRecord", "buildClassicalNahuatlGrammarContract", "evaluateClassicalNahuatlGrammarSelection", "getClassicalNahuatlInherentImpersonalSourceAnalysis", "getClassicalNahuatlTlaImpersonalSourceAnalysis", "buildClassicalNahuatlInherentImpersonalRecord", "buildClassicalNahuatlTlaImpersonalStemRecord", "buildClassicalNahuatlDerivedVncFrame", "isClassicalNahuatlVncDerivationSourceMachineryFrame", "buildClassicalNahuatlVncDerivationSourceAnalysisFrame", "isClassicalNahuatlVncDerivationSourceAnalysisFrame", "getClassicalNahuatlVncDerivationOptionInventory", "isClassicalNahuatlVncDerivationOptionInventory", "deriveClassicalNahuatlVncDerivationOperationBatchFrame", "isClassicalNahuatlVncDerivationOperationBatchFrame", "deriveClassicalNahuatlVncDerivationOperationFrame", "isClassicalNahuatlVncDerivationOperationFrame", "buildClassicalNahuatlDerivedVncMachineryFrame", "isClassicalNahuatlDerivedVncMachineryFrame", "buildClassicalNahuatlVncFiniteSurfaceFrame", "isClassicalNahuatlVncFiniteSurfaceFrame", "isClassicalNahuatlVncSlotFrame", "renderClassicalNahuatlVncSlotFrameFormula", "getDefaultGrammarContractRegistry", "assertRegisteredGrammarContract"]);
    const CLASSICAL_NAHUATL_VNC_APPLICATION_VOICES = CLASSICAL_NAHUATL_VNC_TARGET_VOICES;
    const CLASSICAL_NAHUATL_VNC_APPLICATION_INTERNAL_IMPERSONAL_OPERATIONS = Object.freeze([
      "inherent-impersonal",
      "tla-impersonal"
    ]);
    const CLASSICAL_NAHUATL_VNC_APPLICATION_SOURCE_VOICES = CLASSICAL_NAHUATL_VNC_CAUSATIVE_SOURCE_VOICES;
    const CLASSICAL_NAHUATL_VNC_APPLICATION_DERIVATIONS = CLASSICAL_NAHUATL_VNC_DERIVATION_TYPES;
    const CLASSICAL_NAHUATL_VNC_APPLICATION_CAUSATIVE_OBJECT_KINDS = Object.freeze(["specific-projective", "reflexive"]);
    const CLASSICAL_NAHUATL_VNC_APPLICATION_CAUSATIVE_SPECIFIC_SHUNTLINE_REALIZATIONS = Object.freeze(["silent", "sounded"]);
    let classicalNahuatlVncApplicationValidationTransaction = null;
    const classicalNahuatlVncApplicationBuiltResultFrames = new WeakSet();
    const classicalNahuatlVncApplicationBuiltFrames = new WeakSet();
    const classicalNahuatlVncApplicationPersistentCanonicalResultFrames = new WeakSet();
    const classicalNahuatlVncApplicationPersistentCanonicalFrames = new WeakSet();
    const classicalNahuatlVncApplicationBuiltParadigmPlans = new WeakSet();
    const classicalNahuatlVncApplicationBuiltParadigmCoordinates = new WeakSet();
    const classicalNahuatlVncApplicationIssuedSentenceResultFrames = new WeakSet();
    const classicalNahuatlWidowhoodInterpretationSources = new WeakSet();
    const classicalNahuatlWidowhoodInterpretationResults = new WeakSet();
    const classicalNahuatlOrderedVoiceVncApplicationFrames = new WeakSet();
    const classicalNahuatlContextualTimeFrames = new WeakSet();
    const classicalNahuatlContextualTimeBatchFrames = new WeakSet();
    const classicalNahuatlVncContinuationSourceByApplicationFrame =
      new WeakMap();
    const classicalNahuatlVncContinuationSourceByResultFrame =
      new WeakMap();
    const CLASSICAL_NAHUATL_ORDERED_VOICE_VNC_APPLICATION_KIND =
      "classical-nahuatl-ordered-voice-vnc-application-frame";
    const CLASSICAL_NAHUATL_ORDERED_VOICE_CALLER_AUTHORITY_FIELDS = Object.freeze([
      "routeId",
      "targetStem",
      "layers",
      "formula",
      "selectedFormula",
      "formulaArtifact",
      "surface",
      "surfaceArtifact",
      "result",
      "selectedResult",
      "resultFrame",
      "machineryFrame",
      "selectedMachineryFrame",
      "voiceLayerChainFrame",
      "state",
      "restoredState",
      "urlState",
      "lesson",
      "lessonId",
      "display",
    ]);
    let classicalNahuatlVncApplicationSharedService = null;
    function deepFreezeClassicalNahuatlVncApplicationValue(value, seen = new WeakSet()) {
      if (!value || typeof value !== "object" || seen.has(value)) {
        return value;
      }
      seen.add(value);
      Object.values(value).forEach(entry => deepFreezeClassicalNahuatlVncApplicationValue(entry, seen));
      return Object.freeze(value);
    }
    function cloneClassicalNahuatlVncApplicationCompactValue(value) {
      if (Array.isArray(value)) {
        return value.map(cloneClassicalNahuatlVncApplicationCompactValue);
      }
      if (!value || typeof value !== "object") {
        return value;
      }
      return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, cloneClassicalNahuatlVncApplicationCompactValue(entry)]));
    }
    function isClassicalNahuatlVncParadigmPlan(frame = null) {
      return Boolean(frame
        && classicalNahuatlVncApplicationBuiltParadigmPlans.has(frame)
        && frame.kind === "classical-nahuatl-vnc-paradigm-generation-plan"
        && frame.version === 1
        && frame.authorizationStatus === "authorized"
        && CLASSICAL_NAHUATL_VNC_APPLICATION_DERIVATIONS.includes(frame.derivationType)
        && CLASSICAL_NAHUATL_VNC_APPLICATION_VOICES.includes(frame.voice)
        && frame.conjugatablePredicateKind === "classical-nahuatl-vnc-conjugatable-predicate"
        && Boolean(frame.predicateSignature)
        && Boolean(frame.sourceOperationSignature)
        && frame.sourceOperationSignature
          === buildClassicalNahuatlVncApplicationSourceOperationSignature(frame)
        && frame.selectedDerivation === frame.derivationType
        && frame.selectedVoice === frame.voice
        && frame.outputScope === "paradigm"
        && frame.typedSourceAuthority === true
        && frame.callerSuppliedAuthorityAccepted === false
        && frame.curriculumOrderAuthority === false
        && frame.lessonMetadataAuthority === false
        && frame.formulaStringAuthority === false
        && frame.surfaceStringAuthority === false
        && Object.isFrozen(frame));
    }
    function isClassicalNahuatlVncParadigmCoordinateFrame(frame = null) {
      const scalarApplicationFrame = frame?.scalarApplicationFrame || null;
      const scalarResultFrame = scalarApplicationFrame?.resultFrame || null;
      const paradigmPlan = frame?.paradigmPlan || null;
      const scalarAuthorized =
        scalarApplicationFrame?.authorizationStatus === "authorized";
      const scalarRequestedOperationIdentity = Boolean(
        scalarApplicationFrame?.normalizedRequest?.derivationType
          === paradigmPlan?.selectedDerivation
        && scalarApplicationFrame?.normalizedRequest?.derivationOptionId
          === paradigmPlan?.selectedDerivationOptionId
        && scalarApplicationFrame?.normalizedRequest?.sourceVoice
          === paradigmPlan?.selectedSourceVoice
        && scalarApplicationFrame?.normalizedRequest?.sourceNonactiveOptionId
          === paradigmPlan?.selectedSourceNonactiveOptionId
        && scalarApplicationFrame?.normalizedRequest?.voice
          === paradigmPlan?.selectedVoice
        && scalarApplicationFrame?.normalizedRequest?.nonactiveOptionId
          === paradigmPlan?.selectedNonactiveOptionId
      );
      const scalarSelectedOperationIdentity = Boolean(
        scalarApplicationFrame?.controlFrame?.derivationType
          === frame?.derivationType
        && scalarApplicationFrame?.controlFrame?.selectedDerivationOptionId
          === frame?.selectedDerivationOptionId
        && scalarApplicationFrame?.controlFrame?.selectedSourceVoice
          === frame?.selectedSourceVoice
        && scalarApplicationFrame?.controlFrame
          ?.selectedSourceNonactiveOptionId
          === frame?.selectedSourceNonactiveOptionId
        && scalarApplicationFrame?.controlFrame?.selectedVoice
          === frame?.selectedVoice
        && scalarApplicationFrame?.controlFrame?.selectedVoiceOperation
          === frame?.selectedVoiceOperation
        && scalarApplicationFrame?.controlFrame?.selectedNonactiveOptionId
          === frame?.selectedNonactiveOptionId
        && scalarApplicationFrame?.normalizedRequest?.targetStem
          === frame?.targetStem
        && scalarApplicationFrame?.normalizedRequest?.targetValence
          === frame?.targetValence
      );
      const scalarFrameIdentity = Boolean(
        paradigmPlan
        && classicalNahuatlVncApplicationBuiltParadigmPlans.has(paradigmPlan)
        && isClassicalNahuatlVncParadigmPlan(paradigmPlan)
        && frame?.sourceOperationSignature
          === paradigmPlan.sourceOperationSignature
        && frame?.predicateSignature === paradigmPlan.predicateSignature
        && scalarApplicationFrame
        && classicalNahuatlVncApplicationBuiltFrames.has(
          scalarApplicationFrame,
        )
        && scalarApplicationFrame.authorizationStatus
          === frame?.authorizationStatus
        && scalarApplicationFrame.blockReason === frame?.blockReason
        && scalarApplicationFrame.normalizedRequest?.sourceStem
          === frame?.sourceStem
        && scalarApplicationFrame.normalizedRequest?.sourceLexemeId
          === frame?.sourceLexemeId
        && scalarApplicationFrame.normalizedRequest?.verbClass
          === frame?.sourceClass
        && scalarApplicationFrame.normalizedRequest?.sourceValence
          === frame?.sourceValence
        && scalarRequestedOperationIdentity
        && (!scalarAuthorized || scalarSelectedOperationIdentity)
        && frame?.derivationType === paradigmPlan.selectedDerivation
        && frame?.selectedDerivationOptionId
          === paradigmPlan.selectedDerivationOptionId
        && frame?.selectedSourceVoice === paradigmPlan.selectedSourceVoice
        && frame?.selectedSourceNonactiveOptionId
          === paradigmPlan.selectedSourceNonactiveOptionId
        && frame?.selectedVoice === paradigmPlan.selectedVoice
        && frame?.selectedVoiceOperation
          === paradigmPlan.selectedVoiceOperation
        && frame?.selectedNonactiveOptionId
          === paradigmPlan.selectedNonactiveOptionId
      );
      const canonicalScalarProjection = frame?.authorizationStatus !== "authorized"
        ? Boolean(
          scalarFrameIdentity
          && frame?.scalarEquivalent === true
          && frame?.formulaRealization === ""
          && frame?.surfaceRealization === ""
        )
        : Boolean(
          scalarFrameIdentity
          && isClassicalNahuatlVncApplicationFrame(scalarApplicationFrame)
          && frame?.scalarEquivalent === true
          && frame?.typedSlotFrame
            === scalarResultFrame?.finalTypedVncSlotFrame
          && frame?.formulaRealization
            === scalarResultFrame?.formulaRealization
          && frame?.surfaceRealization
            === scalarResultFrame?.surfaceRealization
        );
      const canonicalSentenceProjection = frame?.authorizationStatus !== "authorized"
        || (
          Boolean(frame.sentenceFormulaDisplay)
          && Boolean(frame.sentenceSurfaceDisplay)
          && frame.sentenceFormulaDisplay
            === buildClassicalNahuatlVncSentenceFormulaRealization(
              frame.sentenceSurfaceFrame,
              frame.formulaRealization
            )
          && frame.sentenceSurfaceDisplay
            === buildClassicalNahuatlVncSentenceSurfaceRealization(
              frame.sentenceSurfaceFrame,
              frame.surfaceRealization
            )
          && frame.sentenceFormulaAttachment
            === getClassicalNahuatlVncSentenceFormulaAttachment(
              frame.sentenceSurfaceFrame
            )
          && Array.isArray(frame.conditionedSentenceRealizations)
          && (
            frame.conditionedParadigmCellFrame
              ?.leastCommonMultiple?.selectedRealizations
            || []
          ).length === frame.conditionedSentenceRealizations.length
          && (
            frame.conditionedParadigmCellFrame
              ?.leastCommonMultiple?.selectedRealizations
            || []
          ).every((realization, index) => {
            const sentenceRealization =
              frame.conditionedSentenceRealizations[index];
            return sentenceRealization?.variantId
                === (realization?.variantId || "")
              && sentenceRealization?.formulaRealization
                === (realization?.formulaRealization || "")
              && sentenceRealization?.surfaceRealization
                === (realization?.surfaceRealization || "")
              && sentenceRealization?.sentenceFormulaDisplay
                === buildClassicalNahuatlVncSentenceFormulaRealization(
                  frame.sentenceSurfaceFrame,
                  realization?.formulaRealization || ""
                )
              && sentenceRealization?.sentenceSurfaceDisplay
                === buildClassicalNahuatlVncSentenceSurfaceRealization(
                  frame.sentenceSurfaceFrame,
                  realization?.surfaceRealization || ""
                );
          })
        );
      return Boolean(frame
        && classicalNahuatlVncApplicationBuiltParadigmCoordinates.has(frame)
        && frame.kind === "classical-nahuatl-vnc-paradigm-coordinate-frame"
        && frame.version === 1
        && ["authorized", "blocked"].includes(frame.authorizationStatus)
        && frame.typedFrameAuthority === true
        && frame.callerSuppliedAuthorityAccepted === false
        && frame.curriculumOrderAuthority === false
        && frame.lessonMetadataAuthority === false
        && frame.formulaStringAuthority === false
        && frame.surfaceStringAuthority === false
        && (frame.authorizationStatus !== "authorized" || Boolean(frame.typedSlotFrame && frame.formulaRealization && frame.surfaceRealization))
        && canonicalScalarProjection
        && canonicalSentenceProjection
        && Object.isFrozen(frame));
    }
    function finalizeBuiltClassicalNahuatlVncApplicationFrame(frame = null) {
      if (!frame || typeof frame !== "object") {
        return frame;
      }
      deepFreezeClassicalNahuatlVncApplicationValue(frame);
      if (frame.resultFrame && typeof frame.resultFrame === "object") {
        classicalNahuatlVncApplicationBuiltResultFrames.add(frame.resultFrame);
        if (frame.authorizationStatus === "blocked"
          && frame.resultFrame.authorizationStatus === "blocked") {
          classicalNahuatlVncApplicationPersistentCanonicalResultFrames.add(
            frame.resultFrame
          );
        }
      }
      classicalNahuatlVncApplicationBuiltFrames.add(frame);
      if (frame.kind === "classical-nahuatl-vnc-application-frame"
        && frame.authorizationStatus === "blocked") {
        classicalNahuatlVncApplicationPersistentCanonicalFrames.add(frame);
      }
      return frame;
    }
    function createClassicalNahuatlVncApplicationValidationTransaction() {
      return {
        resultFrames: new WeakSet(),
        applicationFrames: new WeakSet(),
        activeMachineryFrames: new WeakSet(),
        sourceMachineryFrames: new WeakSet(),
        sourceAnalysisFrames: new WeakSet(),
        derivationInventories: new WeakSet(),
        derivationOperationFrames: new WeakSet()
      };
    }
    function runClassicalNahuatlVncApplicationValidationTransaction(callback) {
      if (classicalNahuatlVncApplicationValidationTransaction) {
        return callback();
      }
      classicalNahuatlVncApplicationValidationTransaction = createClassicalNahuatlVncApplicationValidationTransaction();
      try {
        return callback();
      } finally {
        classicalNahuatlVncApplicationValidationTransaction = null;
      }
    }
    const CLASSICAL_NAHUATL_VNC_APPLICATION_CALLER_AUTHORITY_FIELDS = Object.freeze(["targetStem", "derivedStem", "derivedClass", "nonactiveStem", "perfectiveNonactiveStem", "impersonalStem", "suffixFamily", "selectionAuthority", "semanticSelection", "authorizationStatus", "sourceAuthority", "formula", "selectedFormula", "formulaArtifact", "formulaRealization", "formulaProjection", "surface", "surfaceArtifact", "surfaceRealization", "wordRealization", "writtenProjection", "sentenceRealization", "sentenceProjection", "targetWord", "result", "resultFrame", "canonicalResult", "canonicalSignature", "storedAnswer", "canvasAnswer", "example", "lesson", "lessonId", "lessonNumber", "lessonMetadata", "curriculumOrder", "display", "displayText", "canonicalSourceSelectionFrame", "nonactiveStemRecord", "inherentImpersonalRecord", "tlaImpersonalStemRecord", "pronominalNncCooperationFrame", "sourceVoiceMachineryFrame", "formationSourceMachineryFrame", "sourceMachineryFrame", "sourceAnalysisFrame", "derivationOptionInventory", "derivationOption", "derivedStemOption", "derivationOperationFrame", "participantTransformFrame", "reverseSourceAnalyses", "derivedMachineryFrame", "voiceLayerChainFrame", "sourceObjectClusterFrame", "objectClusterFrame", "activeMachineryFrame", "machineryFrame", "selectedMachineryFrame", "typedVncSlotFrame", "lessons2326GrammarFrame", "derivationExplanationProjection", "derivationExplanationFrame", "initialVowelKind", "supportiveInitialI", "sourceInitialIAnalysis", "hostileVoiceLayerTarget", "hostileVoiceLayers", "hostileFormulaArtifact", "hostileSurfaceArtifact"]);
    const CLASSICAL_NAHUATL_VNC_APPLICATION_FUTURE_INTENT_FIELDS = Object.freeze(["voiceLayer2", "voiceLayer3", "voiceLayer2Operation", "voiceLayer3Operation", "voiceLayerOperations", "orderedVoiceOperations", "voiceLayerRouteId"]);
    const CLASSICAL_NAHUATL_VNC_APPLICATION_DERIVATION_REFERENCE_DIMENSIONS = Object.freeze(["formation alternatives", "active / passive / impersonal source", "one / two / three objects", "mainline / shuntline / silent", "coreference", "source ambiguity", "supplemented silent object", "mood / sentence force"]);
    const CLASSICAL_NAHUATL_VNC_APPLICATION_SOURCE_INITIAL_I_KINDS = Object.freeze(["real", "supportive", "contextual"]);
    function normalizeClassicalNahuatlVncApplicationToken(value = "") {
      return String(value == null ? "" : value).trim();
    }
    function normalizeClassicalNahuatlVncApplicationStem(value = "") {
      const normalized = normalizeClassicalNahuatlVncApplicationToken(value)
        .replace(/^\((.*)\)$/u, "$1")
        .trim()
        .normalize("NFC");
      return normalized === "_" ? "" : normalized;
    }
    function writeClassicalNahuatlVncSourcePartsThroughLesson2(
      sourceStem = "",
      sourceEmbedStem = "",
      sourceMatrixStem = "",
    ) {
      const fallbackStem = normalizeClassicalNahuatlVncApplicationStem(sourceStem);
      const embedStem = normalizeClassicalNahuatlVncApplicationStem(sourceEmbedStem);
      const matrixStem = normalizeClassicalNahuatlVncApplicationStem(sourceMatrixStem);
      if (!embedStem || !matrixStem
        || typeof targetObject.issueClassicalNahuatlLesson2WritingSource !== "function"
        || typeof targetObject.writeClassicalNahuatlLesson2Result !== "function"
        || typeof targetObject.isClassicalNahuatlLesson2WrittenResult !== "function") {
        return fallbackStem;
      }
      const writingSource = targetObject.issueClassicalNahuatlLesson2WritingSource({
        parts: [
          { role: "embed", value: embedStem },
          { role: "matrix", value: matrixStem },
        ],
        boundaryKind: "compound",
      });
      const writtenResult = targetObject.writeClassicalNahuatlLesson2Result(
        writingSource,
      );
      return targetObject.isClassicalNahuatlLesson2WrittenResult(writtenResult)
        && writtenResult.authorizationStatus === "authorized"
        ? writtenResult.surface
        : fallbackStem;
    }
    function getClassicalNahuatlVncApplicationCausativeParticipantChoiceControls(operationFrame = null, normalizedRequest = {}) {
      const participantTransformFrame = operationFrame?.participantTransformFrame || null;
      const causativeObjectKindChoiceEligible = participantTransformFrame?.causativeObjectKindChoiceEligible === true;
      const causativeSpecificShuntlineChoiceEligible = participantTransformFrame?.causativeSpecificShuntlineChoiceEligible === true;
      const selectedCausativeObjectKind = causativeObjectKindChoiceEligible
        && CLASSICAL_NAHUATL_VNC_APPLICATION_CAUSATIVE_OBJECT_KINDS.includes(normalizedRequest.causativeObjectKind)
        ? normalizedRequest.causativeObjectKind
        : participantTransformFrame?.causativeObjectKind || "";
      const selectedCausativeSpecificShuntlineRealization = causativeSpecificShuntlineChoiceEligible
        && CLASSICAL_NAHUATL_VNC_APPLICATION_CAUSATIVE_SPECIFIC_SHUNTLINE_REALIZATIONS.includes(normalizedRequest.causativeSpecificShuntlineRealization)
        ? normalizedRequest.causativeSpecificShuntlineRealization
        : "";
      return Object.freeze({
        causativeObjectKindChoiceEligible,
        allowedCausativeObjectKinds: causativeObjectKindChoiceEligible
          ? participantTransformFrame.allowedCausativeObjectKinds || CLASSICAL_NAHUATL_VNC_APPLICATION_CAUSATIVE_OBJECT_KINDS
          : Object.freeze([]),
        causativeObjectKindSelectionRequired: causativeObjectKindChoiceEligible
          && participantTransformFrame?.causativeObjectKindSelectionRequired === true,
        selectedCausativeObjectKind,
        causativeSpecificShuntlineChoiceEligible,
        allowedCausativeSpecificShuntlineRealizations: causativeSpecificShuntlineChoiceEligible ? CLASSICAL_NAHUATL_VNC_APPLICATION_CAUSATIVE_SPECIFIC_SHUNTLINE_REALIZATIONS : Object.freeze([]),
        causativeSpecificShuntlineSelectionRequired: false,
        selectedCausativeSpecificShuntlineRealization
      });
    }
    function hasClassicalNahuatlVncApplicationValue(value) {
      if (value == null || value === false) {
        return false;
      }
      if (typeof value === "string") {
        return value.trim().length > 0;
      }
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      if (typeof value === "object") {
        return true;
      }
      return true;
    }
    function getClassicalNahuatlVncApplicationPresentFields(request = {}, fieldNames = []) {
      if (!request || typeof request !== "object") {
        return Object.freeze([]);
      }
      return Object.freeze(fieldNames.filter(field => Object.prototype.hasOwnProperty.call(request, field) && hasClassicalNahuatlVncApplicationValue(request[field])));
    }
    function getClassicalNahuatlVncApplicationCurriculumCarrierFields(
      request = {},
    ) {
      if (!request || typeof request !== "object") {
        return Object.freeze([]);
      }
      const fields = [];
      const visited = new Set();
      let owner = request;
      while (
        owner
        && owner !== Object.prototype
        && owner !== Array.prototype
        && !visited.has(owner)
      ) {
        visited.add(owner);
        let keys = [];
        try {
          keys = Reflect.ownKeys(owner);
        } catch {
          return Object.freeze(["uninspectable-curriculum-carrier"]);
        }
        for (const key of keys) {
          if (typeof key !== "string") continue;
          const normalized = key.toLowerCase().replace(/[^a-z0-9]/gu, "");
          const semanticallyOwnedLegacyField = new Set([
            "lesson9prefaceparticle",
            "lesson9introductorymodifier",
          ]).has(normalized);
          let fieldHasValue = true;
          try {
            const descriptor = Object.getOwnPropertyDescriptor(owner, key);
            fieldHasValue = descriptor && "value" in descriptor
              ? hasClassicalNahuatlVncApplicationValue(descriptor.value)
              : true;
          } catch {
            return Object.freeze([
              ...fields,
              "uninspectable-curriculum-carrier",
            ]);
          }
          const curriculumCarrier = normalized.startsWith("lesson")
            || normalized.startsWith("curriculum")
            || (
              normalized.startsWith("highest")
              && normalized.endsWith("lesson")
            );
          if (
            curriculumCarrier
            && fieldHasValue
            && !semanticallyOwnedLegacyField
            && !fields.includes(key)
          ) {
            fields.push(key);
          }
        }
        try {
          owner = Object.getPrototypeOf(owner);
        } catch {
          return Object.freeze([
            ...fields,
            "uninspectable-curriculum-carrier",
          ]);
        }
      }
      return Object.freeze(fields);
    }
    function getClassicalNahuatlVncApplicationRuntimeTarget(explicitTarget = null) {
      if (explicitTarget && typeof explicitTarget === "object") {
        return explicitTarget;
      }
      if (typeof targetObject !== "undefined" && targetObject && typeof targetObject === "object") {
        return targetObject;
      }
      if (typeof globalThis !== "undefined" && globalThis && typeof globalThis === "object") {
        return globalThis;
      }
      return null;
    }
    function getClassicalNahuatlVncApplicationMissingCapabilities(dependencies = {}) {
      return Object.freeze(CLASSICAL_NAHUATL_VNC_APPLICATION_REQUIRED_CAPABILITIES.filter(capability => typeof dependencies?.[capability] !== "function"));
    }
    function getClassicalNahuatlVncApplicationObjectKind(sourceValence = "", requestedObjectKind = "") {
      const normalizedValence = normalizeClassicalNahuatlVncApplicationToken(sourceValence);
      return {
        "shuntline-reflexive": "shuntline-reflexive",
        "projective-human": "nonspecific-human",
        "projective-nonhuman": "nonspecific-nonhuman",
        "specific-projective": "specific-projective",
        "mainline-reflexive": "mainline-reflexive",
        "human-reciprocal": "mainline-reflexive"
      }[normalizedValence] || normalizeClassicalNahuatlVncApplicationToken(requestedObjectKind) || "specific-projective";
    }
    function normalizeClassicalNahuatlVncApplicationDerivation(value = "direct") {
      return normalizeClassicalNahuatlVncDerivationType(value || "direct") || "direct";
    }
    function normalizeClassicalNahuatlVncApplicationObjectRequest(request = {}, index = 0) {
      const objectKind = normalizeClassicalNahuatlVncApplicationToken(request?.objectKind);
      const objectPerson = normalizeClassicalNahuatlVncApplicationToken(request?.objectPerson || request?.object);
      const governor = normalizeClassicalNahuatlVncApplicationToken(request?.governor || "directive");
      const derivationalLevel = Number(request?.derivationalLevel || index + 1);
      return Object.freeze({
        objectId: normalizeClassicalNahuatlVncApplicationToken(request?.objectId || `source-object-${index + 1}`),
        objectKind,
        objectPerson,
        governor,
        derivationalLevel
      });
    }
    function getClassicalNahuatlVncApplicationSourceObjectRequests(request = {}, sourceValence = "") {
      const supplied = Array.isArray(request.sourceObjectRequests) ? request.sourceObjectRequests : Array.isArray(request.objectRequests) ? request.objectRequests : null;
      if (supplied) {
        return Object.freeze(supplied.map(normalizeClassicalNahuatlVncApplicationObjectRequest));
      }
      const normalizedValence = normalizeClassicalNahuatlVncApplicationToken(sourceValence);
      if (!normalizedValence || normalizedValence === "intransitive") {
        return Object.freeze([]);
      }
      const objectKind = getClassicalNahuatlVncApplicationObjectKind(normalizedValence, request.objectKind);
      return Object.freeze([normalizeClassicalNahuatlVncApplicationObjectRequest({
        objectId: "source-object-1",
        objectKind: objectKind === "mainline-reflexive" || objectKind === "shuntline-reflexive" ? "reflexive" : objectKind,
        objectPerson: objectKind === "specific-projective" ? request.objectPerson || request.object || "" : "",
        governor: "directive",
        derivationalLevel: 1
      })]);
    }
    function getClassicalNahuatlVncApplicationSpecificCoreferenceBlockReason({
      subject = "",
      derivationType = "direct",
      objectRequests = []
    } = {}) {
      const normalizedSubject = normalizeClassicalNahuatlVncApplicationToken(subject);
      if (!["1sg", "2sg", "1pl", "2pl"].includes(normalizedSubject)) {
        return "";
      }
      const coreferentialObject = (Array.isArray(objectRequests) ? objectRequests : []).find(request => (
        request?.objectKind === "specific-projective"
        && normalizeClassicalNahuatlVncApplicationToken(request.objectPerson) === normalizedSubject
      ));
      if (!coreferentialObject) {
        return "";
      }
      const governor = normalizeClassicalNahuatlVncApplicationToken(
        coreferentialObject.governor || derivationType
      );
      if (governor === "applicative" || derivationType === "applicative") {
        return "classical-vnc-applicative-coreferential-specific-object-must-be-reflexive";
      }
      if (governor === "causative" || derivationType === "causative") {
        return "classical-vnc-causative-coreferential-specific-object-must-be-reflexive";
      }
      return "classical-vnc-coreferential-specific-object-must-be-reflexive";
    }
    function getClassicalNahuatlVncApplicationValenceForObject(objectKind = "") {
      return {
        reflexive: "mainline-reflexive",
        "nonspecific-human": "projective-human",
        "nonspecific-nonhuman": "projective-nonhuman",
        "specific-projective": "specific-projective"
      }[normalizeClassicalNahuatlVncApplicationToken(objectKind)] || "specific-projective";
    }
    function getClassicalNahuatlVncApplicationRequestValue(request = {}, key = "") {
      if (Object.prototype.hasOwnProperty.call(request, key)) {
        return request[key];
      }
      if (request.sentenceOptions && typeof request.sentenceOptions === "object" && Object.prototype.hasOwnProperty.call(request.sentenceOptions, key)) {
        return request.sentenceOptions[key];
      }
      return undefined;
    }
    function buildClassicalNahuatlVncApplicationSentenceOptions(request = {}) {
      const getToken = key => normalizeClassicalNahuatlVncApplicationToken(getClassicalNahuatlVncApplicationRequestValue(request, key));
      const outsidePrefixesValue = getClassicalNahuatlVncApplicationRequestValue(request, "outsidePrefixes");
      const outsidePrefixes = Array.isArray(outsidePrefixesValue) ? outsidePrefixesValue.map(normalizeClassicalNahuatlVncApplicationToken).filter(Boolean) : [];
      const sentenceAntecessive = getClassicalNahuatlVncApplicationRequestValue(request, "sentenceAntecessive") === true || getClassicalNahuatlVncApplicationRequestValue(request, "antecessive") === true;
      return Object.freeze({
        directionalPrefix: getToken("directionalPrefix") || getToken("directional") || getToken("directionalLocativePrefix"),
        directionalIttaContraction: getToken("directionalIttaContraction") || getToken("onIttaContraction") || getToken("rareDirectionalContraction"),
        incorporatedAdverb: getToken("incorporatedAdverb"),
        adverbPosition: getToken("adverbPosition"),
        sentenceType: getToken("sentenceType"),
        negative: getClassicalNahuatlVncApplicationRequestValue(request, "negative") === true,
        questionMode: getToken("questionMode"),
        introductoryParticle: getToken("introductoryParticle"),
        prefaceParticle: getToken("prefaceParticle"),
        lesson9PrefaceParticle: getToken("lesson9PrefaceParticle") || getToken("prefaceParticle"),
        introductoryModifier: getToken("introductoryModifier"),
        lesson9IntroductoryModifier: getToken("lesson9IntroductoryModifier") || getToken("introductoryModifier"),
        admonitiveTranslationReading: getToken("admonitiveTranslationReading"),
        translationReading: getToken("translationReading"),
        requestedTranslationReading: getToken("requestedTranslationReading"),
        admonitiveContrastReading: getToken("admonitiveContrastReading"),
        contrastReading: getToken("contrastReading"),
        requestedContrastReading: getToken("requestedContrastReading"),
        sentenceAntecessive,
        antecessive: sentenceAntecessive,
        requestedNegativePrefix: getToken("requestedNegativePrefix"),
        negativePrefix: getToken("negativePrefix"),
        outsidePrefixes: Object.freeze(outsidePrefixes),
        construction: getToken("construction"),
        lexicalReading: getToken("lexicalReading"),
        predicateReferentKind: getToken("predicateReferentKind") || getToken("referentKind"),
        irregularStemChoice: getToken("irregularStemChoice") || getToken("irregularAlternativeStem")
      });
    }
    function buildClassicalNahuatlVncApplicationPronominalCooperationFrame(
      normalizedRequest = {},
    ) {
      const sourceStem = normalizeClassicalNahuatlVncApplicationStem(
        normalizedRequest.sourceStem,
      ).replace(/[-\s]/gu, "");
      const construction = normalizeClassicalNahuatlVncApplicationToken(
        normalizedRequest.sentenceOptions?.construction,
      ).toLowerCase();
      if (sourceStem !== "iā" || construction !== "pronominal-nnc") {
        return null;
      }
      const requiredCapabilities = [
        "buildClassicalNahuatlPronominalNncSourceFrame",
        "isClassicalNahuatlPronominalNncSourceFrame",
        "buildClassicalNahuatlPronominalNncOperationFrame",
        "isClassicalNahuatlPronominalNncOperationFrame",
        "evaluateClassicalNahuatlPronominalNnc",
        "isClassicalNahuatlPronominalNncResult",
      ];
      if (requiredCapabilities.some(
        capabilityName => typeof targetObject[capabilityName] !== "function",
      )) {
        return null;
      }
      const subject = normalizeClassicalNahuatlVncApplicationToken(
        normalizedRequest.subject,
      );
      const pronominalStem = ["1sg", "2sg", "1pl", "2pl"].includes(subject)
        ? "eh"
        : "yeh";
      const sourceFrame =
        targetObject.buildClassicalNahuatlPronominalNncSourceFrame({
          stem: pronominalStem,
        });
      if (!targetObject.isClassicalNahuatlPronominalNncSourceFrame(sourceFrame)) {
        return null;
      }
      const operationFrame =
        targetObject.buildClassicalNahuatlPronominalNncOperationFrame(
          sourceFrame,
          {
            subject,
            clausePosition: "initial",
            adjunctorInMode: "none",
            sentenceType: "statement",
            polarity: "positive",
          },
        );
      if (!targetObject.isClassicalNahuatlPronominalNncOperationFrame(
        operationFrame,
      )) {
        return null;
      }
      const resultFrame = targetObject.evaluateClassicalNahuatlPronominalNnc(
        sourceFrame,
        operationFrame,
      );
      return targetObject.isClassicalNahuatlPronominalNncResult(resultFrame)
        ? resultFrame.cooperationFrame || null
        : null;
    }
    function buildClassicalNahuatlVncApplicationParadigmCoordinateSentenceOptions(baseOptions = {}, coordinate = {}) {
      const semanticMood = normalizeClassicalNahuatlVncApplicationToken(coordinate.mood || "indicative");
      const semanticTense = normalizeClassicalNahuatlVncApplicationToken(coordinate.tense || "present");
      const inheritedOptions = baseOptions && typeof baseOptions === "object" ? baseOptions : {};
      if (semanticMood !== "optative") return inheritedOptions;
      const borrowedPreteritOptative = semanticTense === "preterit";
      const inheritedParticle = normalizeClassicalNahuatlVncApplicationToken(inheritedOptions.introductoryParticle);
      const inheritedSentenceType = normalizeClassicalNahuatlVncApplicationToken(inheritedOptions.sentenceType);
      const inheritedPrefixes = Array.isArray(inheritedOptions.outsidePrefixes) ? inheritedOptions.outsidePrefixes : [];
      return Object.freeze({
        ...inheritedOptions,
        // A paradigm projects sentence-ready optative uses.  Their mā/tlā
        // introducer is derived by the mood coordinate, never copied from
        // the single indicative source cell used to prepare the predicate.
        sentenceType: ["wish-sentence", "command-sentence", "exhortation-sentence"].includes(inheritedSentenceType)
          ? inheritedSentenceType
          : "wish-sentence",
        introductoryParticle: ["mā", "tlā"].includes(inheritedParticle) ? inheritedParticle : "mā",
        sentenceAntecessive: borrowedPreteritOptative || inheritedOptions.sentenceAntecessive === true,
        antecessive: borrowedPreteritOptative || inheritedOptions.antecessive === true,
        outsidePrefixes: Object.freeze(borrowedPreteritOptative
          ? Array.from(new Set([...inheritedPrefixes, "ō#"]))
          : [...inheritedPrefixes])
      });
    }
    function buildClassicalNahuatlVncApplicationScalarCoordinateRequest(
      scalarBasisFrame = null,
      coordinate = {},
      sentenceOptions = {},
    ) {
      const normalizedRequest = scalarBasisFrame?.normalizedRequest || {};
      const controlFrame = scalarBasisFrame?.controlFrame || {};
      const canonicalSourceStem =
        scalarBasisFrame?.resultFrame?.sourceAnalysisFrame?.sourceStem
        || scalarBasisFrame?.resultFrame?.sourceMachineryFrame?.stem
        || normalizedRequest.sourceStem
        || "";
      const coordinateObject = coordinate && typeof coordinate === "object"
        ? coordinate
        : {};
      return Object.freeze({
        // Re-enter the one scalar evaluator through the original Source and
        // selected semantic operations. A paradigm coordinate may vary only
        // agreement, mood, tense, and their derived sentence realization.
        sourceStem: canonicalSourceStem,
        sourceLexemeId: normalizedRequest.sourceLexemeId || "",
        sourceInitialISelection:
          normalizedRequest.sourceInitialISelection || "",
        verbClass: normalizedRequest.verbClass || "",
        sourceValence: normalizedRequest.sourceValence || "",
        sourceObjectRequests: Object.freeze(
          (normalizedRequest.sourceObjectRequests || []).map(
            cloneClassicalNahuatlVncApplicationCompactValue,
          ),
        ),
        objectKind: normalizedRequest.objectKind || "",
        objectPerson: normalizedRequest.objectPerson || "",
        subject: coordinateObject.subject || normalizedRequest.subject || "",
        sourceSubject: normalizedRequest.sourceSubject || "",
        mood: coordinateObject.mood || normalizedRequest.mood || "",
        tense: coordinateObject.tense || normalizedRequest.tense || "",
        requestedDerivation:
          controlFrame.derivationType
          || normalizedRequest.derivationType
          || "direct",
        derivationOptionId:
          controlFrame.selectedDerivationOptionId
          || normalizedRequest.derivationOptionId
          || "",
        causativeObjectKind:
          controlFrame.selectedCausativeObjectKind
          || normalizedRequest.causativeObjectKind
          || "",
        causativeSpecificShuntlineRealization:
          controlFrame.selectedCausativeSpecificShuntlineRealization
          || normalizedRequest.causativeSpecificShuntlineRealization
          || "",
        applicativeObjectKind: normalizedRequest.applicativeObjectKind || "",
        applicativeObjectPerson:
          normalizedRequest.applicativeObjectPerson || "",
        silentSpecificObject: normalizedRequest.silentSpecificObject === true,
        requestedSourceVoice:
          controlFrame.selectedSourceVoice
          || normalizedRequest.sourceVoice
          || "active",
        sourceNonactiveOptionId:
          controlFrame.selectedSourceNonactiveOptionId
          || normalizedRequest.sourceNonactiveOptionId
          || "",
        requestedVoice:
          controlFrame.selectedVoice
          || normalizedRequest.voice
          || "active",
        nonactiveOptionId:
          controlFrame.selectedNonactiveOptionId
          || normalizedRequest.nonactiveOptionId
          || "",
        outputScope: "single",
        tlaFusion: normalizedRequest.tlaFusion === true,
        sourceEmbedStem: normalizedRequest.sourceEmbedStem || "",
        sourceMatrixStem: normalizedRequest.sourceMatrixStem || "",
        sentenceOptions,
      });
    }
    function buildClassicalNahuatlVncApplicationSourceOperationSignature({
      sourceStem = "",
      sourceLexemeId = "",
      sourceClass = "",
      sourceValence = "",
      sourceObjectRequests = [],
      requestedDerivation = "",
      selectedDerivation = "",
      selectedDerivationOptionId = "",
      requestedSourceVoice = "",
      selectedSourceVoice = "",
      selectedSourceNonactiveOptionId = "",
      requestedVoice = "",
      selectedVoice = "",
      selectedVoiceOperation = "",
      selectedNonactiveOptionId = "",
    } = {}) {
      return JSON.stringify({
        sourceStem,
        sourceLexemeId,
        sourceClass,
        sourceValence,
        sourceObjectRequests,
        requestedDerivation,
        selectedDerivation,
        selectedDerivationOptionId,
        requestedSourceVoice,
        selectedSourceVoice,
        selectedSourceNonactiveOptionId,
        requestedVoice,
        selectedVoice,
        selectedVoiceOperation,
        selectedNonactiveOptionId,
      });
    }
    function getClassicalNahuatlVncApplicationCanonicalSourceRecord(sourceStem = "", sourceValence = "") {
      const valence = normalizeClassicalNahuatlVncApplicationToken(sourceValence) === "intransitive"
        ? "intransitive"
        : "transitive";
      if (
        typeof targetObject.resolveClassicalNahuatlCanonicalSourceStemRecord
          !== "function"
        || typeof targetObject.isClassicalNahuatlCanonicalSourceStemRecord
          !== "function"
      ) {
        return null;
      }
      const record = targetObject.resolveClassicalNahuatlCanonicalSourceStemRecord({
        enteredStem: normalizeClassicalNahuatlVncApplicationStem(sourceStem),
        basalUnit: "vnc",
        valence,
      });
      return targetObject.isClassicalNahuatlCanonicalSourceStemRecord(record)
        ? record
        : null;
    }
    function buildClassicalNahuatlVncApplicationCanonicalSourceSelection(
      sourceStem = "",
      sourceValence = "",
      sourceLexemeId = "",
      verbClass = "",
    ) {
      if (
        typeof targetObject
          .buildClassicalNahuatlCanonicalSourceSelectionFrame !== "function"
        || typeof targetObject
          .isClassicalNahuatlCanonicalSourceSelectionFrame !== "function"
      ) {
        return null;
      }
      const frame =
        targetObject.buildClassicalNahuatlCanonicalSourceSelectionFrame({
          enteredStem: sourceStem,
          basalUnit: "vnc",
          valence:
            normalizeClassicalNahuatlVncApplicationToken(sourceValence)
              === "intransitive"
              ? "intransitive"
              : "transitive",
          sourceLexemeId:
            normalizeClassicalNahuatlVncApplicationToken(
              sourceLexemeId,
            ).toLowerCase(),
          verbClass:
            normalizeClassicalNahuatlVncApplicationToken(
              verbClass,
            ).toUpperCase(),
        });
      return targetObject
        .isClassicalNahuatlCanonicalSourceSelectionFrame(frame)
        ? frame
        : null;
    }
    function getClassicalNahuatlVncApplicationSourceInitialIAnalysis(sourceStem = "", sourceValence = "", options = {}) {
      const stem = normalizeClassicalNahuatlVncApplicationStem(sourceStem);
      const requestedKind = normalizeClassicalNahuatlVncApplicationToken(options.sourceInitialISelection || options.sourceInitialIKind || "").toLowerCase();
      const effectiveValence = normalizeClassicalNahuatlVncApplicationToken(options.effectiveValence || sourceValence);
      if (!/^[iī]/iu.test(stem)) {
        return Object.freeze({
          kind: "not-applicable",
          resolvedKind: "",
          sourceRecord: null,
          sourceAuthority: "not-initial-i",
          selectionRequired: false,
          requestedKind,
          selectionSource: "not-applicable"
        });
      }
      const sourceRecord =
        getClassicalNahuatlVncApplicationCanonicalSourceRecord(
          stem,
          sourceValence,
        );
      const sourceAnalysis = sourceRecord?.initialIAnalysis || null;
      const kind = ["real", "supportive", "contextual"].includes(sourceAnalysis?.kind) ? sourceAnalysis.kind : "unresolved";
      const resolvedKind = kind === "contextual"
        ? sourceAnalysis?.resolvedKindsByValence?.[effectiveValence] || sourceAnalysis?.defaultResolvedKind || ""
        : kind;
      if (sourceAnalysis) {
        return Object.freeze({
          kind,
          resolvedKind: ["real", "supportive"].includes(resolvedKind) ? resolvedKind : "",
          sourceRecord,
          sourceAuthority: sourceAnalysis.sourceAuthority || "canonical-source-initial-i-analysis-required",
          ruleId: sourceAnalysis.ruleId || "",
          exactWitness: sourceAnalysis.exactWitness || "",
          selectionRequired: false,
          requestedKind,
          selectionSource: "canonical-source-record",
          userSelectionAccepted: false
        });
      }
      const selectedKind = CLASSICAL_NAHUATL_VNC_APPLICATION_SOURCE_INITIAL_I_KINDS.includes(requestedKind)
        ? requestedKind
        : "real";
      const defaultedToReal = !requestedKind;
      const resolvedUserKind = selectedKind === "contextual"
        ? ["projective-nonhuman", "mainline-reflexive", "human-reciprocal"].includes(effectiveValence)
          ? "supportive"
          : "real"
        : selectedKind;
      return Object.freeze({
        kind: selectedKind,
        resolvedKind: resolvedUserKind,
        sourceRecord: null,
        sourceAuthority: defaultedToReal ? "default-real-initial-i-source" : "user-declared-source-initial-i",
        ruleId: selectedKind === "contextual"
          ? "cn-l2-26-context-sensitive-initial-i-source-selection"
          : defaultedToReal
            ? "cn-l7-78-real-initial-vowel-source-default"
            : "cn-source-initial-i-user-declaration",
        exactWitness: selectedKind === "contextual"
          ? "The user declares a context-sensitive source i; licensed support-dropping environments resolve it as supportive, and other environments as real."
          : defaultedToReal
            ? "An unlisted initial-i Source VNC defaults to a real i unless the user selects a different typed source analysis."
            : "The user declares the initial-i status of an unlisted Source VNC.",
        selectionRequired: false,
        requestedKind: selectedKind,
        selectionSource: defaultedToReal ? "unlisted-source-default" : "unlisted-source",
        defaultedToReal,
        userSelectionAccepted: !defaultedToReal
      });
    }
    function normalizeClassicalNahuatlVncApplicationRequest(request = {}) {
      const sourceEmbedStem = normalizeClassicalNahuatlVncApplicationStem(
        request.sourceEmbedStem || request.embedStem,
      );
      const sourceMatrixStem = normalizeClassicalNahuatlVncApplicationStem(
        request.sourceMatrixStem || request.matrixStem,
      );
      const sourceStem = writeClassicalNahuatlVncSourcePartsThroughLesson2(
        request.sourceStem || request.stem,
        sourceEmbedStem,
        sourceMatrixStem,
      );
      const sourceLexemeId = normalizeClassicalNahuatlVncApplicationToken(
        request.sourceLexemeId,
      ).toLowerCase();
      const sourceValence = normalizeClassicalNahuatlVncApplicationToken(request.sourceValence || request.valence || "intransitive");
      const sourceInitialISelection = normalizeClassicalNahuatlVncApplicationToken(request.sourceInitialISelection || request.sourceInitialIKind || "").toLowerCase();
      const sourceInitialIAnalysis = getClassicalNahuatlVncApplicationSourceInitialIAnalysis(sourceStem, sourceValence, {
        sourceInitialISelection,
        effectiveValence: request.tlaFusion === true ? "projective-nonhuman" : sourceValence
      });
      const requestedDerivation = normalizeClassicalNahuatlVncApplicationToken(request.requestedDerivation || request.derivationType || request.derivation || "direct").toLowerCase();
      const derivationTypeSelectionFrame = validateClassicalNahuatlVncDerivationTypeSelection(requestedDerivation);
      const derivationType = derivationTypeSelectionFrame.derivationType || "direct";
      const requestedVoice = normalizeClassicalNahuatlVncApplicationToken(request.requestedVoice || request.vncVoice || request.voice || "active");
      const targetVoiceSelectionFrame = validateClassicalNahuatlVncVoiceSelection(requestedVoice, "target");
      const normalizedRequestedVoice = targetVoiceSelectionFrame.voice || "active";
      const requestedSourceVoice = normalizeClassicalNahuatlVncApplicationToken(request.requestedSourceVoice || request.sourceVoice || "active").toLowerCase();
      const sourceVoiceSelectionFrame = validateClassicalNahuatlVncVoiceSelection(requestedSourceVoice, "causative-source");
      const sourceVoice = sourceVoiceSelectionFrame.voice || "active";
      const verbClassValue = normalizeClassicalNahuatlVncApplicationToken(request.verbClass || request.perfectiveClass || "B").toUpperCase();
      const verbClass = ["A", "B", "C", "D"].includes(verbClassValue) ? verbClassValue : "B";
      const retainedOutputScopeSelectionFrame = request.outputScopeSelectionFrame?.kind === "classical-result-output-scope-selection-frame"
        ? request.outputScopeSelectionFrame
        : null;
      const hasExplicitOutputScope = retainedOutputScopeSelectionFrame
        ? retainedOutputScopeSelectionFrame.explicit === true
        : Object.prototype.hasOwnProperty.call(request, "outputScope")
          || Object.prototype.hasOwnProperty.call(request, "vncOutputScope");
      const requestedOutputScope = retainedOutputScopeSelectionFrame?.requestedValue
        ?? normalizeClassicalNahuatlVncApplicationToken(Object.prototype.hasOwnProperty.call(request, "outputScope") ? request.outputScope : request.vncOutputScope);
      const outputScopeSelectionFrame = buildClassicalResultOutputScopeSelectionFrame(requestedOutputScope, {
        role: "vnc",
        explicit: hasExplicitOutputScope,
        provenance: retainedOutputScopeSelectionFrame?.provenance || "classical-vnc-application-request"
      });
      const outputScope = outputScopeSelectionFrame.outputScope;
      const sentenceOptions = buildClassicalNahuatlVncApplicationSentenceOptions(request);
      const sourceObjectRequests = getClassicalNahuatlVncApplicationSourceObjectRequests(request, sourceValence);
      const specificSourceObjectRequest = sourceObjectRequests.find(objectRequest => objectRequest?.objectKind === "specific-projective") || null;
      const applicativeObjectKindValue = normalizeClassicalNahuatlVncApplicationToken(request.applicativeObjectKind || request.addedObjectKind || "specific-projective");
      const applicativeObjectKind = ["specific-projective", "reflexive", "nonspecific-human", "nonspecific-nonhuman"].includes(applicativeObjectKindValue) ? applicativeObjectKindValue : "specific-projective";
      const causativeObjectKind = normalizeClassicalNahuatlVncApplicationToken(request.causativeObjectKind);
      const subject = normalizeClassicalNahuatlVncApplicationToken(request.subject || "3sg");
      const sourceSubjectExplicit =
        Object.prototype.hasOwnProperty.call(request, "sourceSubject")
        || Object.prototype.hasOwnProperty.call(
          request,
          "embeddedSubject",
        );
      const requestedSourceSubject = normalizeClassicalNahuatlVncApplicationToken(request.sourceSubject || request.embeddedSubject || "3sg");
      const sourceSubject = derivationType === "causative" && causativeObjectKind === "reflexive"
        ? subject
        : requestedSourceSubject;
      const requestedCausativeSpecificShuntlineRealization =
        normalizeClassicalNahuatlVncApplicationToken(
          request.causativeSpecificShuntlineRealization,
        );
      const requestedCausativeSpecificShuntlineRealizationRecognized =
        !requestedCausativeSpecificShuntlineRealization
        || CLASSICAL_NAHUATL_VNC_APPLICATION_CAUSATIVE_SPECIFIC_SHUNTLINE_REALIZATIONS.includes(
          requestedCausativeSpecificShuntlineRealization,
        );
      const causativeSpecificShuntlineRealization =
        requestedCausativeSpecificShuntlineRealizationRecognized
          ? requestedCausativeSpecificShuntlineRealization
          : "";
      return Object.freeze({
        kind: "classical-nahuatl-vnc-application-request",
        version: CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,
        sourceStem,
        sourceLexemeId,
        sourceInitialISelection,
        sourceInitialIAnalysis,
        subject,
        sourceSubject,
        sourceSubjectExplicit,
        mood: normalizeClassicalNahuatlVncApplicationToken(request.mood || "indicative"),
        tense: normalizeClassicalNahuatlVncApplicationToken(request.tense || "present"),
        verbClass,
        sourceValence,
        objectKind: getClassicalNahuatlVncApplicationObjectKind(sourceValence, request.objectKind),
        objectPerson: specificSourceObjectRequest
          ? normalizeClassicalNahuatlVncApplicationToken(specificSourceObjectRequest.objectPerson || request.objectPerson || request.object || "")
          : "",
        objectInterpretation: normalizeClassicalNahuatlVncApplicationToken(request.objectInterpretation || "reflexive"),
        sourceObjectRequests,
        requestedDerivation,
        derivationType,
        requestedDerivationRecognized: derivationTypeSelectionFrame.authorizationStatus === "authorized",
        derivationTypeSelectionFrame,
        derivationOptionId: normalizeClassicalNahuatlVncApplicationToken(request.derivationOptionId || request.selectedDerivationOptionId || ""),
        causativeObjectKind,
        requestedCausativeSpecificShuntlineRealization,
        requestedCausativeSpecificShuntlineRealizationRecognized,
        causativeSpecificShuntlineRealization,
        applicativeObjectKind,
        applicativeObjectPerson: normalizeClassicalNahuatlVncApplicationToken(request.applicativeObjectPerson || request.addedObjectPerson || ""),
        silentSpecificObject: request.silentSpecificObject === true,
        requestedSourceVoice,
        sourceVoice,
        requestedSourceVoiceRecognized: sourceVoiceSelectionFrame.authorizationStatus === "authorized",
        sourceVoiceSelectionFrame,
        sourceNonactiveOptionId: normalizeClassicalNahuatlVncApplicationToken(request.sourceNonactiveOptionId || request.selectedSourceNonactiveOptionId || ""),
        requestedVoice,
        voice: normalizedRequestedVoice,
        requestedVoiceRecognized: targetVoiceSelectionFrame.authorizationStatus === "authorized",
        targetVoiceSelectionFrame,
        nonactiveOptionId: normalizeClassicalNahuatlVncApplicationToken(request.nonactiveOptionId || request.selectedNonactiveOptionId || ""),
        requestedOutputScope,
        outputScope,
        requestedOutputScopeRecognized: outputScopeSelectionFrame.authorizationStatus === "authorized",
        outputScopeSelectionFrame,
        tlaFusion: request.tlaFusion === true,
        directionalIttaContraction: sentenceOptions.directionalIttaContraction,
        incorporatedAdverb: sentenceOptions.incorporatedAdverb,
        adverbPosition: sentenceOptions.adverbPosition,
        sourceEmbedStem,
        sourceMatrixStem,
        sentenceOptions,
        callerSuppliedDerivedAuthorityAllowed: false
      });
    }
    function buildClassicalNahuatlVncApplicationDerivationOperationRequest(normalizedRequest = {}) {
      const derivationType = normalizeClassicalNahuatlVncApplicationDerivation(normalizedRequest.derivationType);
      const request = {
        derivationType,
        optionId: normalizedRequest.derivationOptionId,
        targetSubject: normalizedRequest.subject
      };
      if (derivationType === "causative") {
        if (normalizedRequest.sourceVoice === "active") {
          request.causativeObjectKind = normalizedRequest.causativeObjectKind;
        }
        if (normalizedRequest.causativeSpecificShuntlineRealization) {
          request.causativeSpecificShuntlineRealization = normalizedRequest.causativeSpecificShuntlineRealization;
        }
      } else if (derivationType === "applicative") {
        request.applicativeObjectKind = normalizedRequest.applicativeObjectKind;
        request.applicativeObjectPerson = normalizedRequest.applicativeObjectPerson;
      }
      return request;
    }
    function deriveClassicalNahuatlVncApplicationOperationFromCanonicalInventory(dependencySource = {}, sourceMachineryFrame = null, derivationOptionInventory = null, operationRequest = {}) {
      const requestedOptionId = normalizeClassicalNahuatlVncApplicationToken(operationRequest.optionId || operationRequest.derivationOptionId);
      const selectedOptionId = requestedOptionId || derivationOptionInventory?.automaticOptionId || "";
      if (!derivationOptionInventory?.options?.some(
        option => option.optionId === selectedOptionId
          || option.optionAliases?.includes(selectedOptionId),
      )) return null;
      return dependencySource.deriveClassicalNahuatlVncDerivationOperationFrame(sourceMachineryFrame, operationRequest);
    }
    function getClassicalNahuatlVncApplicationAllowedVoices({
      sourceStem = "",
      sourceValence = "",
      nonactiveOptionInventory = null,
      objectRequests = [],
      inherentImpersonalSourceAnalysis = null,
      tlaImpersonalSourceAnalysis = null
    } = {}) {
      if (!sourceStem) {
        return Object.freeze(["active"]);
      }
      const runtimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget();
      const canonicalInherentAnalysis = inherentImpersonalSourceAnalysis
        || runtimeTarget?.getClassicalNahuatlInherentImpersonalSourceAnalysis?.(
          sourceStem
        )
        || null;
      const canonicalTlaAnalysis = tlaImpersonalSourceAnalysis
        || runtimeTarget?.getClassicalNahuatlTlaImpersonalSourceAnalysis?.(
          sourceStem
        )
        || null;
      const voices = ["active"];
      const nonactiveAvailable = nonactiveOptionInventory?.authorizationStatus === "authorized" && Array.isArray(nonactiveOptionInventory.options) && nonactiveOptionInventory.options.length > 0;
      const normalizedObjectRequests = Array.isArray(objectRequests) ? objectRequests : [];
      if (normalizedObjectRequests.length > 1) {
        const hasSpecific = normalizedObjectRequests.some(request => request?.objectKind === "specific-projective");
        if (nonactiveAvailable && hasSpecific) {
          voices.push("passive");
        }
        if (nonactiveAvailable && !hasSpecific) {
          voices.push("impersonal");
        }
        return Object.freeze(voices);
      }
      const reflexiveSource = ["mainline-reflexive", "shuntline-reflexive", "human-reciprocal"].includes(sourceValence);
      if (nonactiveAvailable && (sourceValence === "specific-projective" || reflexiveSource)) {
        voices.push("passive");
      }
      if (nonactiveAvailable && (["intransitive", "projective-human", "projective-nonhuman"].includes(sourceValence) || reflexiveSource)) {
        voices.push("impersonal");
      }
      if (sourceValence === "intransitive") {
        if (canonicalInherentAnalysis?.authorizationStatus === "authorized") {
          voices.push("inherent-impersonal");
        }
        if (canonicalTlaAnalysis?.authorizationStatus === "authorized") {
          voices.push("tla-impersonal");
        }
      }
      return Object.freeze(voices);
    }
    function getClassicalNahuatlVncApplicationPublicVoiceForOperation(voiceOperation = "") {
      const normalized = normalizeClassicalNahuatlVncApplicationToken(voiceOperation);
      return CLASSICAL_NAHUATL_VNC_APPLICATION_INTERNAL_IMPERSONAL_OPERATIONS.includes(normalized)
        ? "impersonal"
        : CLASSICAL_NAHUATL_VNC_APPLICATION_VOICES.includes(normalized) ? normalized : "";
    }
    function getClassicalNahuatlVncApplicationPublicAllowedVoices(voiceOperations = []) {
      return Object.freeze(Array.from(new Set((Array.isArray(voiceOperations) ? voiceOperations : [])
        .map(getClassicalNahuatlVncApplicationPublicVoiceForOperation)
        .filter(Boolean))));
    }
    function buildClassicalNahuatlVncApplicationNonactiveFormationInventory({
      publicVoice = "active",
      allowedVoiceOperations = [],
      lesson20OptionInventory = null
    } = {}) {
      const normalizedPublicVoice = CLASSICAL_NAHUATL_VNC_APPLICATION_VOICES.includes(publicVoice) ? publicVoice : "active";
      const allowedOperationSet = new Set(Array.isArray(allowedVoiceOperations) ? allowedVoiceOperations : []);
      const options = [];
      if (["passive", "impersonal"].includes(normalizedPublicVoice) && allowedOperationSet.has(normalizedPublicVoice)) {
        for (const option of lesson20OptionInventory?.options || []) {
          options.push(Object.freeze({
            ...option,
            publicVoice: normalizedPublicVoice,
            voiceOperation: normalizedPublicVoice,
            formationKind: "lesson20-nonactive-stem",
            lesson20OptionId: option.optionId,
            ruleTagId: `cn-option-nonactive-derived-${option.variantIndex}`,
            typedFormationAuthority: true,
            callerSuppliedAuthorityAccepted: false,
            formulaStringAuthority: false,
            surfaceStringAuthority: false
          }));
        }
      }
      if (normalizedPublicVoice === "impersonal" && allowedOperationSet.has("inherent-impersonal")) {
        options.push(Object.freeze({
          kind: "classical-nahuatl-vnc-nonactive-formation-option",
          version: 1,
          optionId: "inherent-impersonal",
          label: "lexically impersonal · keep the stem",
          publicVoice: "impersonal",
          voiceOperation: "inherent-impersonal",
          formationKind: "inherent-impersonal",
          lesson20OptionId: "",
          ruleId: "cn-l22-inherent-impersonal",
          ruleTagId: "cn-option-nonactive-inherent-impersonal",
          formationAuthority: "andrews-conditioned-lexical-formation",
          variantStatus: "andrews-licensed-user-option",
          typedFormationAuthority: true,
          callerSuppliedAuthorityAccepted: false,
          formulaStringAuthority: false,
          surfaceStringAuthority: false
        }));
      }
      if (normalizedPublicVoice === "impersonal" && allowedOperationSet.has("tla-impersonal")) {
        options.push(Object.freeze({
          kind: "classical-nahuatl-vnc-nonactive-formation-option",
          version: 1,
          optionId: "tla-impersonal",
          label: "tla-impersonal · add tla- to the stem",
          publicVoice: "impersonal",
          voiceOperation: "tla-impersonal",
          formationKind: "tla-impersonal",
          lesson20OptionId: "",
          ruleId: "cn-l22-tla-impersonal",
          ruleTagId: "cn-option-nonactive-tla-impersonal",
          formationAuthority: "andrews-productive-impersonal-formation",
          variantStatus: "andrews-licensed-user-option",
          typedFormationAuthority: true,
          callerSuppliedAuthorityAccepted: false,
          formulaStringAuthority: false,
          surfaceStringAuthority: false
        }));
      }
      const selectorRequired = options.length > 1;
      const nonactiveVoice = normalizedPublicVoice === "passive" || normalizedPublicVoice === "impersonal";
      return Object.freeze({
        kind: "classical-nahuatl-vnc-nonactive-formation-option-inventory",
        version: 1,
        publicVoice: normalizedPublicVoice,
        authorizationStatus: !nonactiveVoice ? "not-applicable" : options.length ? "authorized" : "blocked",
        blockReason: !nonactiveVoice || options.length ? "" : lesson20OptionInventory?.blockReason || "classical-vnc-no-authorized-nonactive-formation",
        options: Object.freeze(options),
        selectorRequired,
        selectionRequired: selectorRequired,
        automaticOptionId: options.length === 1 ? options[0].optionId : "",
        defaultOptionId: "",
        alternativeSelectionPolicy: "explicit-user-choice-required-no-default",
        singleSelectionPolicy: "one-authorized-formation-is-automatic-and-not-a-user-decision",
        internalVoiceOperationsArePublicChoices: false,
        typedFormationAuthority: true,
        callerSuppliedAuthorityAccepted: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false
      });
    }
    function buildClassicalNahuatlVncApplicationOptions(normalizedRequest = {}) {
      const sentenceOptions = normalizedRequest.sentenceOptions || {};
      const useSourceParts = normalizedRequest.tlaFusion === true || Boolean(normalizedRequest.sourceEmbedStem);
      const effectiveValence = normalizedRequest.tlaFusion === true ? "projective-nonhuman" : normalizedRequest.sourceValence;
      const sourceInitialIKind = normalizedRequest.sourceInitialIAnalysis?.resolvedKind || normalizedRequest.sourceInitialIAnalysis?.kind;
      const initialVowelKind = /^[iī]/iu.test(normalizeClassicalNahuatlVncApplicationStem(normalizedRequest.sourceStem))
        && ["real", "supportive"].includes(sourceInitialIKind)
        ? sourceInitialIKind
        : "";
      return {
        tenseMode: "verbo",
        subject: normalizedRequest.subject,
        mood: normalizedRequest.mood,
        tense: normalizedRequest.tense,
        verbClass: normalizedRequest.verbClass,
        perfectiveClass: normalizedRequest.verbClass,
        requestedSourceValence: normalizedRequest.sourceValence,
        transitivity: effectiveValence === "intransitive" ? "intransitive" : "transitive",
        valence: effectiveValence,
        objectKind: getClassicalNahuatlVncApplicationObjectKind(effectiveValence, normalizedRequest.objectKind),
        objectPerson: normalizedRequest.objectPerson,
        object: normalizedRequest.objectPerson,
        objectInterpretation: normalizedRequest.objectInterpretation,
        initialVowelKind,
        silentSpecificObject: normalizedRequest.silentSpecificObject,
        tlaFusion: normalizedRequest.tlaFusion,
        incorporatedAdverb: normalizedRequest.incorporatedAdverb,
        adverbPosition: normalizedRequest.adverbPosition,
        directionalPrefix: sentenceOptions.directionalPrefix,
        directionalIttaContraction: sentenceOptions.directionalIttaContraction,
        embedStem: useSourceParts ? normalizedRequest.sourceEmbedStem : "",
        matrixStem: useSourceParts ? normalizedRequest.sourceMatrixStem : "",
        sourceEmbedStem: useSourceParts ? normalizedRequest.sourceEmbedStem : "",
        sourceMatrixStem: useSourceParts ? normalizedRequest.sourceMatrixStem : "",
        sentenceType: sentenceOptions.sentenceType,
        negative: sentenceOptions.negative,
        questionMode: sentenceOptions.questionMode,
        introductoryParticle: sentenceOptions.introductoryParticle,
        prefaceParticle: sentenceOptions.prefaceParticle,
        lesson9PrefaceParticle: sentenceOptions.lesson9PrefaceParticle,
        introductoryModifier: sentenceOptions.introductoryModifier,
        lesson9IntroductoryModifier: sentenceOptions.lesson9IntroductoryModifier,
        admonitiveTranslationReading: sentenceOptions.admonitiveTranslationReading || sentenceOptions.translationReading || sentenceOptions.requestedTranslationReading,
        translationReading: sentenceOptions.translationReading || sentenceOptions.admonitiveTranslationReading || sentenceOptions.requestedTranslationReading,
        requestedTranslationReading: sentenceOptions.requestedTranslationReading || sentenceOptions.admonitiveTranslationReading || sentenceOptions.translationReading,
        admonitiveContrastReading: sentenceOptions.admonitiveContrastReading || sentenceOptions.contrastReading || sentenceOptions.requestedContrastReading,
        contrastReading: sentenceOptions.contrastReading || sentenceOptions.admonitiveContrastReading || sentenceOptions.requestedContrastReading,
        requestedContrastReading: sentenceOptions.requestedContrastReading || sentenceOptions.admonitiveContrastReading || sentenceOptions.contrastReading,
        sentenceAntecessive: sentenceOptions.sentenceAntecessive,
        antecessive: sentenceOptions.antecessive,
        requestedNegativePrefix: sentenceOptions.requestedNegativePrefix || sentenceOptions.negativePrefix,
        negativePrefix: sentenceOptions.negativePrefix || sentenceOptions.requestedNegativePrefix,
        outsidePrefixes: [...(sentenceOptions.outsidePrefixes || [])],
        construction: sentenceOptions.construction,
        lexicalReading: sentenceOptions.lexicalReading,
        predicateReferentKind: sentenceOptions.predicateReferentKind,
        referentKind: sentenceOptions.predicateReferentKind,
        irregularStemChoice: sentenceOptions.irregularStemChoice,
        pronominalNncCooperationFrame:
          buildClassicalNahuatlVncApplicationPronominalCooperationFrame(
            normalizedRequest,
          )
      };
    }
    function buildClassicalNahuatlVncApplicationDerivationSourceRequest(normalizedRequest = {}) {
      if (normalizedRequest.derivationType === "direct") {
        return normalizedRequest;
      }
      return Object.freeze({
        ...normalizedRequest,
        // Derivation selects a predicate stem before that predicate receives
        // the target coordinate's finite mood/tense and sentence realization.
        // Keep actual Source constituents (including incorporation and source
        // predicate structure), but do not let a later finite coordinate decide
        // whether the derivational Source itself exists.
        mood: "indicative",
        tense: "present",
        directionalIttaContraction: "",
        sentenceOptions:
          buildClassicalNahuatlVncApplicationSentenceOptions({}),
      });
    }
    function buildClassicalNahuatlVncApplicationSourceMachinery(dependencySource = {}, normalizedRequest = {}) {
      const sourceObjectRequests = Array.isArray(normalizedRequest.sourceObjectRequests) ? normalizedRequest.sourceObjectRequests : [];
      const sourceSubject = normalizedRequest.derivationType === "causative"
        || normalizedRequest.sourceSubjectExplicit === true
          && normalizedRequest.voice !== "active"
        ? normalizedRequest.sourceSubject
        : normalizedRequest.subject;
      const firstSourceObject = sourceObjectRequests[0] || null;
      const sourceValence = sourceObjectRequests.length > 1
        ? getClassicalNahuatlVncApplicationValenceForObject(firstSourceObject.objectKind)
        : normalizedRequest.sourceValence;
      const requiresMultipleObjectBase = sourceObjectRequests.length > 1;
      const requiresDistinctSourceSubject =
        normalizedRequest.derivationType === "direct"
        && sourceSubject !== normalizedRequest.subject;
      const canonicalSourceSelectionFrame =
        normalizedRequest.derivationType === "direct"
          ? null
          : buildClassicalNahuatlVncApplicationCanonicalSourceSelection(
            normalizedRequest.sourceStem,
            normalizedRequest.sourceValence,
            normalizedRequest.sourceLexemeId,
            normalizedRequest.verbClass,
          );
      if (
        normalizedRequest.derivationType !== "direct"
        && !canonicalSourceSelectionFrame
      ) {
        return null;
      }
      const sourceStem = canonicalSourceSelectionFrame?.canonicalStem
        || normalizedRequest.sourceStem;
      if (!sourceStem) {
        return null;
      }
      const sourceRequest =
        normalizedRequest.derivationType === "direct"
        && !requiresMultipleObjectBase
        && !requiresDistinctSourceSubject
          ? normalizedRequest
          : Object.freeze({
          ...normalizedRequest,
          sourceStem,
          subject: sourceSubject,
          sourceValence,
          objectKind: firstSourceObject?.objectKind || normalizedRequest.objectKind || "none",
          objectPerson: firstSourceObject?.objectPerson || normalizedRequest.objectPerson || "",
          tlaFusion: normalizedRequest.derivationType === "direct" ? normalizedRequest.tlaFusion === true : false
          });
      const sourceOptions = {
        ...buildClassicalNahuatlVncApplicationOptions(sourceRequest),
        ...(canonicalSourceSelectionFrame
          ? { canonicalSourceSelectionFrame }
          : {})
      };
      let sourceMachineryFrame = dependencySource.buildClassicalNahuatlVerbstemClassFrame(sourceRequest.sourceStem, sourceOptions);
      if (sourceObjectRequests.length > 1 && isClassicalNahuatlVncApplicationActiveFrameAuthorized(sourceMachineryFrame)) {
        sourceMachineryFrame = dependencySource.buildClassicalNahuatlMultipleObjectVncFrame(sourceMachineryFrame, {
          objectRequests: sourceObjectRequests
        });
      }
      return sourceMachineryFrame;
    }
    function buildClassicalNahuatlVncApplicationSourceVoiceMachinery(dependencySource = {}, activeSourceMachineryFrame = null, normalizedRequest = {}, {
      sourceVoice = "active",
      sourceNonactiveOptionInventory = null
    } = {}) {
      const normalizedSourceVoice = CLASSICAL_NAHUATL_VNC_APPLICATION_SOURCE_VOICES.includes(sourceVoice) ? sourceVoice : "active";
      if (normalizedSourceVoice === "active") {
        return Object.freeze({
          sourceVoice: "active",
          selectedSourceNonactiveOptionId: "",
          sourceNonactiveStemRecord: null,
          sourceMachineryFrame: activeSourceMachineryFrame
        });
      }
      const canonicalSourceDescriptor = getClassicalNahuatlVncApplicationCanonicalActivePredicateDescriptor(activeSourceMachineryFrame, {
        stem: normalizedRequest.sourceStem,
        verbClass: normalizedRequest.verbClass,
        sourceValence: normalizedRequest.sourceValence,
        objectRequests: normalizedRequest.sourceObjectRequests
      });
      const selectedSourceNonactiveOptionId = normalizeClassicalNahuatlVncApplicationToken(normalizedRequest.sourceNonactiveOptionId || sourceNonactiveOptionInventory?.automaticOptionId || "");
      const sourceNonactiveStemRecord = dependencySource.deriveClassicalNahuatlNonactiveStemRecord(canonicalSourceDescriptor.stem, {
        verbClass: canonicalSourceDescriptor.verbClass || normalizedRequest.verbClass,
        sourceValence: canonicalSourceDescriptor.sourceValence || normalizedRequest.sourceValence,
        optionId: selectedSourceNonactiveOptionId
      });
      const firstSpecificObject = (normalizedRequest.sourceObjectRequests || []).find(request => request.objectKind === "specific-projective") || null;
      const sourceMachineryFrame = dependencySource.buildClassicalNahuatlDerivedVncFrame(activeSourceMachineryFrame, {
        voice: normalizedSourceVoice,
        nonactiveStemRecord: sourceNonactiveStemRecord,
        sourceObjectClusterFrame: activeSourceMachineryFrame?.multipleObjectClusterFrame || null,
        sourceValence: canonicalSourceDescriptor.sourceValence || normalizedRequest.sourceValence,
        sourceSubject: normalizedRequest.sourceSubject,
        sourceObjectPerson: firstSpecificObject?.objectPerson || normalizedRequest.objectPerson || "",
        mood: normalizedRequest.mood,
        tense: normalizedRequest.tense,
        verbClass: canonicalSourceDescriptor.verbClass || normalizedRequest.verbClass,
        sentenceOptions: buildClassicalNahuatlVncApplicationSentenceOptions(normalizedRequest)
      });
      return Object.freeze({
        sourceVoice: normalizedSourceVoice,
        selectedSourceNonactiveOptionId: sourceNonactiveStemRecord?.selectedOptionId || "",
        sourceNonactiveStemRecord,
        sourceMachineryFrame
      });
    }
    function getClassicalNahuatlVncApplicationOperationObjectRequests(operationFrame = null) {
      const candidates = [operationFrame?.participantTransformFrame?.targetObjectRequests, operationFrame?.participantFrame?.targetObjectRequests, operationFrame?.targetObjectRequests, operationFrame?.objectRequests];
      return candidates.find(Array.isArray) || [];
    }
    function getClassicalNahuatlVncApplicationOperationTargetStem(operationFrame = null) {
      return normalizeClassicalNahuatlVncApplicationStem(operationFrame?.targetStem || operationFrame?.selectedOption?.targetStem || operationFrame?.derivedStemOption?.targetStem || "");
    }
    function getClassicalNahuatlVncApplicationOperationTargetClass(operationFrame = null, fallback = "B") {
      const targetClass = normalizeClassicalNahuatlVncApplicationToken(operationFrame?.targetClass || operationFrame?.selectedOption?.targetClass || operationFrame?.derivedStemOption?.targetClass || fallback).toUpperCase();
      return ["A", "B", "C", "D"].includes(targetClass) ? targetClass : fallback;
    }
    function getClassicalNahuatlVncApplicationTargetValence(operationFrame = null, fallback = "intransitive") {
      const objectRequests = getClassicalNahuatlVncApplicationOperationObjectRequests(operationFrame);
      if (objectRequests.length > 1) {
        return "multiple-object";
      }
      if (objectRequests.length === 1) {
        return getClassicalNahuatlVncApplicationValenceForObject(objectRequests[0].objectKind);
      }
      return normalizeClassicalNahuatlVncApplicationToken(fallback || "intransitive");
    }
    function getClassicalNahuatlVncApplicationFinalTypedFrame(machineryFrame = null) {
      return machineryFrame?.proofFrame?.conclusion?.finalTypedVncSlotFrame || machineryFrame?.proofFrame?.conclusion?.finalBoundaryRealizationFrame?.typedSlotFrame || machineryFrame?.finalBoundaryRealizationFrame?.typedSlotFrame || null;
    }
    function getClassicalNahuatlVncApplicationCanonicalActivePredicateDescriptor(activeMachineryFrame = null, fallback = {}) {
      const typedFrame = getClassicalNahuatlVncApplicationFinalTypedFrame(activeMachineryFrame);
      const proofConclusion = activeMachineryFrame?.proofFrame?.conclusion || {};
      const fallbackObjectRequests = Array.isArray(fallback?.objectRequests) ? fallback.objectRequests : [];
      const activeObjectRequests = Array.isArray(activeMachineryFrame?.targetObjectRequests)
        ? activeMachineryFrame.targetObjectRequests
        : fallbackObjectRequests;
      const requestedClass = normalizeClassicalNahuatlVncApplicationToken(
        proofConclusion.classId
        || activeMachineryFrame?.classId
        || fallback?.verbClass
      ).toUpperCase();
      const requestedValence = normalizeClassicalNahuatlVncApplicationToken(
        activeMachineryFrame?.kind === "classical-nahuatl-vnc-derived-machinery-frame"
          ? activeMachineryFrame?.valence || fallback?.sourceValence
          : proofConclusion.classTargetValence
        || activeMachineryFrame?.classTargetValence
        || activeMachineryFrame?.citationRuleFrame?.valence
        || fallback?.sourceValence
      );
      return Object.freeze({
        stem: normalizeClassicalNahuatlVncApplicationStem(
          activeMachineryFrame?.targetStem
          || proofConclusion.classTargetStem
          || activeMachineryFrame?.classTargetStem
          || proofConclusion.sourceVerbstem
          || activeMachineryFrame?.sourceVerbstem
          || activeMachineryFrame?.stem
          || fallback?.stem
          || typedFrame?.slots?.predicate?.stem
        ),
        verbClass: ["A", "B", "C", "D"].includes(requestedClass)
          ? requestedClass
          : normalizeClassicalNahuatlVncApplicationToken(fallback?.verbClass || ""),
        sourceValence: requestedValence,
        objectRequests: Object.freeze(activeObjectRequests.map(cloneClassicalNahuatlVncApplicationCompactValue))
      });
    }
    function getClassicalNahuatlVncContinuationSourceDescriptor(
      sourceMachineryFrame = null,
      runtimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget(),
    ) {
      const sourceAnalysisFrame =
        typeof runtimeTarget
          ?.buildClassicalNahuatlVncDerivationSourceAnalysisFrame
          === "function"
          ? runtimeTarget
            .buildClassicalNahuatlVncDerivationSourceAnalysisFrame(
              sourceMachineryFrame,
            )
          : null;
      if (
        !isCanonicalClassicalNahuatlVncApplicationSourceAnalysisFrame(
          sourceAnalysisFrame,
          runtimeTarget,
        )
        || sourceAnalysisFrame.sourceMachineryFrame
          !== sourceMachineryFrame
      ) {
        return Object.freeze({});
      }
      const formationSourceMachineryFrame =
        sourceAnalysisFrame.formationSourceMachineryFrame || null;
      const sourceVoice =
        CLASSICAL_NAHUATL_VNC_APPLICATION_SOURCE_VOICES.includes(
          sourceAnalysisFrame.sourceVoice,
        )
          ? sourceAnalysisFrame.sourceVoice
          : "active";
      const sourceNonactiveOptionId = sourceVoice === "active"
        ? ""
        : normalizeClassicalNahuatlVncApplicationToken(
          sourceMachineryFrame?.nonactiveStemRecord?.selectedOptionId,
        );
      const analysisFormationObjectRequests = [
        ...(sourceAnalysisFrame.promotedSourceObjectRequest
          ? [sourceAnalysisFrame.promotedSourceObjectRequest]
          : []),
        ...(Array.isArray(
          sourceAnalysisFrame.participantSurfaceObjectRequests,
        )
          ? sourceAnalysisFrame.participantSurfaceObjectRequests
          : []),
      ]
        .filter((request, index, requests) => (
          requests.findIndex(candidate => (
            candidate?.objectId === request?.objectId
          )) === index
        ))
        .sort((left, right) => (
          Number(left?.derivationalLevel || 0)
          - Number(right?.derivationalLevel || 0)
        ));
      const descriptor =
        getClassicalNahuatlVncApplicationCanonicalActivePredicateDescriptor(
          formationSourceMachineryFrame,
          {
            stem: sourceAnalysisFrame.sourceStem,
            verbClass: sourceAnalysisFrame.sourceClass,
            sourceValence: sourceAnalysisFrame.sourceValence,
            objectRequests: analysisFormationObjectRequests,
          },
        );
      const sourceObjectRequests = Object.freeze(
        (descriptor.objectRequests || []).map(
          cloneClassicalNahuatlVncApplicationCompactValue,
        ),
      );
      const sourceValence = sourceObjectRequests.length > 1
        ? "multiple-object"
        : descriptor.sourceValence || (
          sourceObjectRequests.length === 1
            ? getClassicalNahuatlVncApplicationValenceForObject(
              sourceObjectRequests[0].objectKind,
            )
            : "intransitive"
        );
      const firstSpecificObject = sourceObjectRequests.find(
        request => request.objectKind === "specific-projective",
      ) || null;
      const sourceSubject =
        normalizeClassicalNahuatlVncApplicationToken(
          sourceAnalysisFrame.participantSurfaceSubject
          || formationSourceMachineryFrame?.targetSubject
          || formationSourceMachineryFrame?.priorVncFrame
            ?.personDyad?.subject
          || formationSourceMachineryFrame?.priorVncFrame?.subject,
        );
      return Object.freeze({
        sourceStem: descriptor.stem,
        sourceLexemeId: sourceAnalysisFrame.sourceLexemeId || "",
        sourceInitialISelection: "",
        verbClass: descriptor.verbClass,
        sourceValence,
        sourceSubject,
        sourceObjectRequests,
        sourceVoice,
        sourceNonactiveOptionId,
        objectKind: sourceObjectRequests.length > 1
          ? "multiple-object"
          : sourceObjectRequests[0]?.objectKind || "none",
        objectPerson: firstSpecificObject?.objectPerson || "",
        sourceAnalysisFrame,
        formationSourceMachineryFrame,
      });
    }
    function buildClassicalNahuatlVncContinuationRequest(
      request = {},
      sourceDescriptor = null,
    ) {
      if (!sourceDescriptor) return null;
      const requestObject = request && typeof request === "object"
        && !Array.isArray(request)
        ? request
        : {};
      const requestedSourceStem =
        normalizeClassicalNahuatlVncApplicationStem(
          requestObject.sourceStem || requestObject.stem,
        );
      const requestedSourceLexemeId =
        normalizeClassicalNahuatlVncApplicationToken(
          requestObject.sourceLexemeId,
        ).toLowerCase();
      const requestedInitialISelection =
        normalizeClassicalNahuatlVncApplicationToken(
          requestObject.sourceInitialISelection
          || requestObject.sourceInitialIKind,
        ).toLowerCase();
      const requestedVerbClass =
        normalizeClassicalNahuatlVncApplicationToken(
          requestObject.verbClass || requestObject.perfectiveClass,
        ).toUpperCase();
      const requestedSourceValence =
        normalizeClassicalNahuatlVncApplicationToken(
          requestObject.sourceValence || requestObject.valence,
        );
      const requestedSourceSubject =
        normalizeClassicalNahuatlVncApplicationToken(
          requestObject.sourceSubject || requestObject.embeddedSubject,
        );
      const requestedSourceVoice =
        normalizeClassicalNahuatlVncApplicationToken(
          requestObject.requestedSourceVoice
          || requestObject.sourceVoice
          || "active",
        ).toLowerCase();
      const requestedSourceNonactiveOptionId =
        normalizeClassicalNahuatlVncApplicationToken(
          requestObject.sourceNonactiveOptionId
          || requestObject.selectedSourceNonactiveOptionId,
        );
      const requestedObjectKind =
        normalizeClassicalNahuatlVncApplicationToken(
          requestObject.objectKind,
        );
      const requestedObjectPerson =
        normalizeClassicalNahuatlVncApplicationToken(
          requestObject.objectPerson || requestObject.object,
        );
      const explicitSourceObjectRequests =
        Object.prototype.hasOwnProperty.call(
          requestObject,
          "sourceObjectRequests",
        );
      const normalizedExplicitSourceObjectRequests =
        explicitSourceObjectRequests
          && Array.isArray(requestObject.sourceObjectRequests)
          ? requestObject.sourceObjectRequests.map(
            normalizeClassicalNahuatlVncApplicationObjectRequest,
          )
          : null;
      const explicitSourceObjectsMatch = !explicitSourceObjectRequests
        || Boolean(
          normalizedExplicitSourceObjectRequests
          && areClassicalNahuatlVncApplicationCanonicalValuesEqual(
            normalizedExplicitSourceObjectRequests,
            sourceDescriptor.sourceObjectRequests,
          )
        );
      if (
        requestedSourceStem !== sourceDescriptor.sourceStem
        || requestedSourceLexemeId !== sourceDescriptor.sourceLexemeId
        || requestedInitialISelection
          !== sourceDescriptor.sourceInitialISelection
        || requestedVerbClass !== sourceDescriptor.verbClass
        || requestedSourceValence !== sourceDescriptor.sourceValence
        || requestedSourceSubject !== sourceDescriptor.sourceSubject
        || requestedSourceVoice !== sourceDescriptor.sourceVoice
        || requestedSourceNonactiveOptionId
          !== sourceDescriptor.sourceNonactiveOptionId
        || requestedObjectKind !== sourceDescriptor.objectKind
        || requestedObjectPerson !== sourceDescriptor.objectPerson
        || !explicitSourceObjectsMatch
      ) {
        return null;
      }
      return Object.freeze({
        ...requestObject,
        sourceStem: sourceDescriptor.sourceStem,
        sourceLexemeId: sourceDescriptor.sourceLexemeId,
        sourceInitialISelection:
          sourceDescriptor.sourceInitialISelection,
        verbClass: sourceDescriptor.verbClass,
        sourceValence: sourceDescriptor.sourceValence,
        sourceSubject: sourceDescriptor.sourceSubject,
        sourceObjectRequests: sourceDescriptor.sourceObjectRequests,
        sourceVoice: sourceDescriptor.sourceVoice,
        sourceNonactiveOptionId:
          sourceDescriptor.sourceNonactiveOptionId,
        objectKind: sourceDescriptor.objectKind,
        objectPerson: sourceDescriptor.objectPerson,
      });
    }
    function areClassicalNahuatlVncApplicationCanonicalValuesEqual(left = null, right = null) {
      try {
        if (left === right) {
          return true;
        }
        if (!left || !right) {
          return false;
        }
        if (Array.isArray(left) || Array.isArray(right)) {
        if (!Array.isArray(left) || !Array.isArray(right) || left.length !== right.length) {
          return false;
        }
        for (let index = 0; index < left.length; index += 1) {
          const leftDescriptor = Object.getOwnPropertyDescriptor(left, String(index));
          const rightDescriptor = Object.getOwnPropertyDescriptor(right, String(index));
          if (Boolean(leftDescriptor) !== Boolean(rightDescriptor)) {
            return false;
          }
          if (!leftDescriptor) {
            continue;
          }
          if (!Object.prototype.hasOwnProperty.call(leftDescriptor, "value")
            || !Object.prototype.hasOwnProperty.call(rightDescriptor, "value")
            || !areClassicalNahuatlVncApplicationCanonicalValuesEqual(leftDescriptor.value, rightDescriptor.value)) {
            return false;
          }
        }
        return true;
        }
        if ((left && typeof left === "object") || (right && typeof right === "object")) {
        if (!left || !right || typeof left !== "object" || typeof right !== "object") {
          return false;
        }
        const leftKeys = Object.keys(left).sort();
        const rightKeys = Object.keys(right).sort();
        return leftKeys.length === rightKeys.length
          && leftKeys.every((key, index) => {
            if (key !== rightKeys[index]) {
              return false;
            }
            const leftDescriptor = Object.getOwnPropertyDescriptor(left, key);
            const rightDescriptor = Object.getOwnPropertyDescriptor(right, key);
            return Boolean(leftDescriptor && rightDescriptor)
              && Object.prototype.hasOwnProperty.call(leftDescriptor, "value")
              && Object.prototype.hasOwnProperty.call(rightDescriptor, "value")
              && areClassicalNahuatlVncApplicationCanonicalValuesEqual(leftDescriptor.value, rightDescriptor.value);
          });
        }
        return JSON.stringify(left === undefined ? null : left) === JSON.stringify(right === undefined ? null : right);
      } catch (_error) {
        return false;
      }
    }
    function areClassicalNahuatlVncApplicationDenseArrayValuesIdentical(actual = null, expected = null) {
      if (!Array.isArray(actual) || !Array.isArray(expected) || actual.length !== expected.length) {
        return false;
      }
      for (let index = 0; index < expected.length; index += 1) {
        const actualDescriptor = Object.getOwnPropertyDescriptor(actual, String(index));
        const expectedDescriptor = Object.getOwnPropertyDescriptor(expected, String(index));
        if (!actualDescriptor || !expectedDescriptor
          || !Object.prototype.hasOwnProperty.call(actualDescriptor, "value")
          || !Object.prototype.hasOwnProperty.call(expectedDescriptor, "value")
          || actualDescriptor.value !== expectedDescriptor.value) {
          return false;
        }
      }
      return true;
    }
    function getClassicalNahuatlVncApplicationTypedIdentity(frame = null) {
      return normalizeClassicalNahuatlVncApplicationToken(frame?.semanticIdentity);
    }
    function areClassicalNahuatlVncApplicationTypedFramesEqual(left = null, right = null) {
      const runtimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget();
      return Boolean(left && right
        && typeof runtimeTarget?.isClassicalNahuatlVncSlotFrame === "function"
        && runtimeTarget.isClassicalNahuatlVncSlotFrame(left)
        && runtimeTarget.isClassicalNahuatlVncSlotFrame(right)
        && getClassicalNahuatlVncApplicationTypedIdentity(left)
        && getClassicalNahuatlVncApplicationTypedIdentity(left) === getClassicalNahuatlVncApplicationTypedIdentity(right)
        && areClassicalNahuatlVncApplicationCanonicalValuesEqual(left, right));
    }
    function getClassicalNahuatlVncApplicationCanonicalFormula(typedFrame = null) {
      const runtimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget();
      if (!(typeof runtimeTarget?.isClassicalNahuatlVncSlotFrame === "function" && runtimeTarget.isClassicalNahuatlVncSlotFrame(typedFrame) && typeof runtimeTarget?.renderClassicalNahuatlVncSlotFrameFormula === "function")) {
        return "";
      }
      return normalizeClassicalNahuatlVncApplicationToken(runtimeTarget.renderClassicalNahuatlVncSlotFrameFormula(typedFrame));
    }
    function areClassicalNahuatlVncApplicationFormulaProjectionsCanonical(machineryFrame = null, canonicalFormula = "") {
      if (!canonicalFormula) {
        return false;
      }
      const conclusion = machineryFrame?.proofFrame?.conclusion || {};
      const projections = [
        machineryFrame?.formulaRealization,
        conclusion.formulaRealization,
        conclusion.selectedFormula,
        conclusion.authorizedFormula,
        conclusion.finalBoundaryRealizationFrame?.formulaRealization,
        machineryFrame?.finalBoundaryRealizationFrame?.formulaRealization
      ].filter(value => typeof value === "string" && value.length > 0).map(normalizeClassicalNahuatlVncApplicationToken);
      return Boolean(projections.length && projections.every(value => value === canonicalFormula));
    }
    function isClassicalNahuatlVncApplicationCanonicalActiveMachineryFrame(machineryFrame = null) {
      if (machineryFrame && typeof machineryFrame === "object" && classicalNahuatlVncApplicationValidationTransaction?.activeMachineryFrames.has(machineryFrame)) {
        return true;
      }
      const runtimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget();
      if (!machineryFrame || machineryFrame.authorizationStatus !== "authorized") {
        return false;
      }
      if (machineryFrame.kind === "classical-nahuatl-vnc-derived-machinery-frame") {
        const canonical = Boolean(typeof runtimeTarget?.isClassicalNahuatlDerivedVncMachineryFrame === "function" && runtimeTarget.isClassicalNahuatlDerivedVncMachineryFrame(machineryFrame));
        if (canonical) {
          classicalNahuatlVncApplicationValidationTransaction?.activeMachineryFrames.add(machineryFrame);
        }
        return canonical;
      }
      if (!["classical-nahuatl-verbstem-verbstem-class-machinery-frame", "classical-nahuatl-multiple-object-vnc-multiple-object-vnc-machinery-frame"].includes(machineryFrame.kind)) {
        return false;
      }
      const typedFrame = getClassicalNahuatlVncApplicationFinalTypedFrame(machineryFrame);
      const formula = getClassicalNahuatlVncApplicationCanonicalFormula(typedFrame);
      const canonical = Boolean(machineryFrame.proofFrame?.authorizationStatus === "authorized"
        && machineryFrame.proofFrame?.conclusion?.authorized === true
        && formula
        && areClassicalNahuatlVncApplicationFormulaProjectionsCanonical(machineryFrame, formula));
      if (canonical) {
        classicalNahuatlVncApplicationValidationTransaction?.activeMachineryFrames.add(machineryFrame);
      }
      return canonical;
    }
    function getClassicalNahuatlVncApplicationCanonicalSentenceOptions(machineryFrame = null) {
      const conclusion = machineryFrame?.proofFrame?.conclusion || {};
      const expandedBoundary = machineryFrame?.expandedVncBoundaryFrame || conclusion.expandedVncBoundaryFrame || {};
      const sentenceFrame = machineryFrame?.sentenceSurfaceFrame || conclusion.sentenceSurfaceFrame || {};
      const sentenceAntecessive = conclusion.antecessiveOutsideVnc === true || sentenceFrame.sentenceAntecessive === true || sentenceFrame.antecessive === true;
      const negative = sentenceFrame.lesson9NegativeRequested === true || sentenceFrame.lesson10NegativeRequested === true || sentenceFrame.sentenceType === "negative-assertion" || Boolean(sentenceFrame.negativePrefix);
      return buildClassicalNahuatlVncApplicationSentenceOptions({
        directionalPrefix: expandedBoundary.directionalPrefix || conclusion.directionalPrefix || "",
        directionalIttaContraction: expandedBoundary.directionalIttaContractionFrame?.requestedSelection || "",
        incorporatedAdverb: conclusion.incorporatedAdverb || "",
        adverbPosition: conclusion.adverbPosition || "",
        sentenceType: sentenceFrame.sentenceType || "",
        negative,
        questionMode: sentenceFrame.questionMode || "",
        introductoryParticle: sentenceFrame.introductoryParticle || "",
        prefaceParticle: sentenceFrame.prefaceParticle || "",
        lesson9PrefaceParticle: sentenceFrame.requestedPrefaceParticle || sentenceFrame.prefaceParticle || "",
        introductoryModifier: sentenceFrame.introductoryModifier || "",
        lesson9IntroductoryModifier: sentenceFrame.requestedIntroductoryModifier || sentenceFrame.introductoryModifier || "",
        admonitiveTranslationReading: sentenceFrame.admonitiveRequestedTranslationReading || "",
        translationReading: sentenceFrame.admonitiveRequestedTranslationReading || "",
        requestedTranslationReading: sentenceFrame.admonitiveRequestedTranslationReading || "",
        admonitiveContrastReading: sentenceFrame.admonitiveRequestedContrastReading || "",
        contrastReading: sentenceFrame.admonitiveRequestedContrastReading || "",
        requestedContrastReading: sentenceFrame.admonitiveRequestedContrastReading || "",
        sentenceAntecessive,
        antecessive: sentenceAntecessive,
        requestedNegativePrefix: sentenceFrame.negativePrefix || "",
        negativePrefix: sentenceFrame.negativePrefix || "",
        outsidePrefixes: Array.isArray(conclusion.outsidePrefixes) ? [...conclusion.outsidePrefixes] : [],
        construction: sentenceFrame.lesson11Construction || "",
        lexicalReading: machineryFrame?.lesson11VncApplicationFrame?.selectedLexicalReading || ""
      });
    }
    function rebuildClassicalNahuatlVncApplicationVoiceMachineryFrame(machineryFrame = null) {
      const runtimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget();
      const activeMachineryFrame = machineryFrame?.activeMachineryFrame || null;
      if (machineryFrame?.kind !== "classical-nahuatl-nonactive-vnc-derived-vnc-machinery-frame" || !isClassicalNahuatlVncApplicationCanonicalActiveMachineryFrame(activeMachineryFrame) || typeof runtimeTarget?.buildClassicalNahuatlDerivedVncFrame !== "function") {
        return null;
      }
      const firstSpecificObject = (activeMachineryFrame.targetObjectRequests || []).find(request => request?.objectKind === "specific-projective") || (activeMachineryFrame.targetObjectRequests || [])[0] || null;
      return runtimeTarget.buildClassicalNahuatlDerivedVncFrame(activeMachineryFrame, {
        voice: machineryFrame.voice,
        nonactiveStemRecord: machineryFrame.nonactiveStemRecord,
        inherentImpersonalRecord: machineryFrame.inherentImpersonalRecord,
        tlaImpersonalStemRecord: machineryFrame.tlaImpersonalStemRecord,
        sourceObjectClusterFrame: machineryFrame.sourceObjectClusterFrame,
        sourceValence: machineryFrame.sourceValence,
        sourceSubject: machineryFrame.sourceSubject,
        sourceObjectPerson: firstSpecificObject?.objectPerson || activeMachineryFrame.priorVncFrame?.objectFrame?.objectPerson || "",
        mood: activeMachineryFrame.priorVncFrame?.personDyad?.mood || activeMachineryFrame.priorVncFrame?.mood || "indicative",
        tense: activeMachineryFrame.priorVncFrame?.tense || "present",
        verbClass: activeMachineryFrame.targetClass || activeMachineryFrame.classId || "A",
        sentenceOptions: getClassicalNahuatlVncApplicationCanonicalSentenceOptions(activeMachineryFrame)
      });
    }
    function isClassicalNahuatlVncApplicationCanonicalSelectedMachineryFrame(machineryFrame = null) {
      if (isClassicalNahuatlVncApplicationCanonicalActiveMachineryFrame(machineryFrame)) {
        const typedFrame = getClassicalNahuatlVncApplicationFinalTypedFrame(machineryFrame);
        const formula = getClassicalNahuatlVncApplicationCanonicalFormula(typedFrame);
        return areClassicalNahuatlVncApplicationFormulaProjectionsCanonical(machineryFrame, formula);
      }
      const rebuilt = rebuildClassicalNahuatlVncApplicationVoiceMachineryFrame(machineryFrame);
      const typedFrame = getClassicalNahuatlVncApplicationFinalTypedFrame(machineryFrame);
      const rebuiltTypedFrame = getClassicalNahuatlVncApplicationFinalTypedFrame(rebuilt);
      const formula = getClassicalNahuatlVncApplicationCanonicalFormula(typedFrame);
      const rebuiltFormula = getClassicalNahuatlVncApplicationCanonicalFormula(rebuiltTypedFrame);
      return Boolean(rebuilt?.authorizationStatus === "authorized" && machineryFrame?.authorizationStatus === "authorized" && machineryFrame.voice === rebuilt.voice && formula && formula === rebuiltFormula && areClassicalNahuatlVncApplicationTypedFramesEqual(typedFrame, rebuiltTypedFrame) && areClassicalNahuatlVncApplicationFormulaProjectionsCanonical(machineryFrame, formula) && areClassicalNahuatlVncApplicationCanonicalValuesEqual(machineryFrame.voiceTransformationFrame || null, rebuilt.voiceTransformationFrame || null));
    }
    function getClassicalNahuatlVncApplicationExpectedAppliedTypedFrames(frame = null) {
      const sourceAnalysisFrame = frame?.sourceAnalysisFrame || null;
      const sourceMachineryFrame = frame?.sourceMachineryFrame || null;
      const operationFrame = frame?.derivationOperationFrame || null;
      const selectedMachineryFrame = frame?.selectedMachineryFrame || null;
      return [
        sourceMachineryFrame?.nonactiveStemRecord,
        sourceMachineryFrame?.voiceTransformationFrame,
        sourceAnalysisFrame,
        operationFrame,
        operationFrame?.participantTransformFrame,
        selectedMachineryFrame?.nonactiveStemRecord,
        selectedMachineryFrame?.inherentImpersonalRecord,
        selectedMachineryFrame?.tlaImpersonalStemRecord,
        selectedMachineryFrame?.voiceTransformationFrame
      ].filter(Boolean);
    }
    function isCanonicalClassicalNahuatlVncApplicationDerivationSourceMachineryFrame(frame = null, runtimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget()) {
      if (frame && typeof frame === "object" && classicalNahuatlVncApplicationValidationTransaction?.sourceMachineryFrames.has(frame)) {
        return true;
      }
      const canonical = Boolean(typeof runtimeTarget?.isClassicalNahuatlVncDerivationSourceMachineryFrame === "function"
        && runtimeTarget.isClassicalNahuatlVncDerivationSourceMachineryFrame(frame));
      if (canonical) {
        classicalNahuatlVncApplicationValidationTransaction?.sourceMachineryFrames.add(frame);
      }
      return canonical;
    }
    function isCanonicalClassicalNahuatlVncApplicationSourceAnalysisFrame(frame = null, runtimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget()) {
      if (frame && typeof frame === "object" && classicalNahuatlVncApplicationValidationTransaction?.sourceAnalysisFrames.has(frame)) {
        return true;
      }
      const canonical = Boolean(typeof runtimeTarget?.isClassicalNahuatlVncDerivationSourceAnalysisFrame === "function"
        && runtimeTarget.isClassicalNahuatlVncDerivationSourceAnalysisFrame(frame));
      if (canonical) {
        classicalNahuatlVncApplicationValidationTransaction?.sourceAnalysisFrames.add(frame);
      }
      return canonical;
    }
    function isCanonicalClassicalNahuatlVncApplicationDerivationInventory(frame = null, runtimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget()) {
      if (frame && typeof frame === "object" && classicalNahuatlVncApplicationValidationTransaction?.derivationInventories.has(frame)) {
        return true;
      }
      const canonical = Boolean(typeof runtimeTarget?.isClassicalNahuatlVncDerivationOptionInventory === "function"
        && runtimeTarget.isClassicalNahuatlVncDerivationOptionInventory(frame));
      if (canonical) {
        classicalNahuatlVncApplicationValidationTransaction?.derivationInventories.add(frame);
      }
      return canonical;
    }
    function isCanonicalClassicalNahuatlVncApplicationDerivationOperation(frame = null, runtimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget()) {
      if (frame && typeof frame === "object" && classicalNahuatlVncApplicationValidationTransaction?.derivationOperationFrames.has(frame)) {
        return true;
      }
      const canonical = Boolean(typeof runtimeTarget?.isClassicalNahuatlVncDerivationOperationFrame === "function"
        && runtimeTarget.isClassicalNahuatlVncDerivationOperationFrame(frame));
      if (canonical) {
        classicalNahuatlVncApplicationValidationTransaction?.derivationOperationFrames.add(frame);
      }
      return canonical;
    }
    function isClassicalNahuatlVncApplicationResultFrameInternal(frame = null) {
      if (frame && typeof frame === "object" && (classicalNahuatlVncApplicationPersistentCanonicalResultFrames.has(frame) || classicalNahuatlVncApplicationValidationTransaction?.resultFrames.has(frame))) {
        return true;
      }
      if (!frame || frame.kind !== "classical-nahuatl-vnc-application-result-frame" || frame.version !== CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION || frame.authorizationStatus !== "authorized" || frame.typedFrameAuthority !== true || frame.formulaStringAuthority !== false || frame.surfaceStringAuthority !== false || frame.callerSuppliedAuthorityAccepted !== false) {
        return false;
      }
      const runtimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget();
      const derivationDirect = frame.selectedDerivation === "direct";
      const formationSourceCanonical = isClassicalNahuatlVncApplicationCanonicalActiveMachineryFrame(frame.formationSourceMachineryFrame);
      const sourceCanonical = derivationDirect
        ? isClassicalNahuatlVncApplicationCanonicalActiveMachineryFrame(frame.sourceMachineryFrame)
        : isCanonicalClassicalNahuatlVncApplicationDerivationSourceMachineryFrame(frame.sourceMachineryFrame, runtimeTarget);
      const sourceFormationContinuity = frame.selectedSourceVoice === "active"
        ? frame.formationSourceMachineryFrame === frame.sourceMachineryFrame
        : frame.sourceMachineryFrame?.kind === "classical-nahuatl-nonactive-vnc-derived-vnc-machinery-frame"
          && frame.sourceMachineryFrame?.voice === frame.selectedSourceVoice
          && frame.sourceMachineryFrame.activeMachineryFrame === frame.formationSourceMachineryFrame;
      const activeCanonical = isClassicalNahuatlVncApplicationCanonicalActiveMachineryFrame(frame.activeMachineryFrame);
      const selectedCanonical = isClassicalNahuatlVncApplicationCanonicalSelectedMachineryFrame(frame.selectedMachineryFrame);
      const selectedTypedFrame = getClassicalNahuatlVncApplicationFinalTypedFrame(frame.selectedMachineryFrame);
      const sourceAnalysisCanonical = frame.sourceAnalysisFrame == null
        ? derivationDirect
        : isCanonicalClassicalNahuatlVncApplicationSourceAnalysisFrame(frame.sourceAnalysisFrame, runtimeTarget);
      const sourceAnalysisContinuity = frame.sourceAnalysisFrame == null
        ? derivationDirect
        : sourceAnalysisCanonical && frame.sourceAnalysisFrame.sourceMachineryFrame === frame.sourceMachineryFrame;
      const derivationRecognized = CLASSICAL_NAHUATL_VNC_APPLICATION_DERIVATIONS.includes(frame.selectedDerivation);
      const continuationSource =
        classicalNahuatlVncContinuationSourceByResultFrame.get(frame)
        || null;
      const continuationSourceResultFrame =
        continuationSource?.sourceResultFrame || null;
      const continuationSourceMachineryFrame =
        continuationSource?.sourceMachineryFrame || null;
      const continuationFormationSourceMachineryFrame =
        continuationSource?.formationSourceMachineryFrame || null;
      const continuationDirectSourceCanonical = Boolean(
        continuationSource
        && frame.sourceMachineryFrame
          === continuationSourceMachineryFrame
        && continuationSourceMachineryFrame
          === continuationSourceResultFrame?.selectedMachineryFrame
        && classicalNahuatlVncApplicationBuiltResultFrames.has(
          continuationSourceResultFrame,
        )
        && isClassicalNahuatlVncApplicationResultFrameInternal(
          continuationSourceResultFrame,
        )
        && isCanonicalClassicalNahuatlVncApplicationDerivationSourceMachineryFrame(
          continuationSourceMachineryFrame,
          runtimeTarget,
        )
      );
      const directSourceKind = [
        "classical-nahuatl-verbstem-verbstem-class-machinery-frame",
        "classical-nahuatl-multiple-object-vnc-multiple-object-vnc-machinery-frame"
      ].includes(frame.sourceMachineryFrame?.kind)
        || continuationDirectSourceCanonical;
      const operationCanonical = derivationDirect
        ? frame.derivationOperationFrame == null && directSourceKind
        : Boolean(isCanonicalClassicalNahuatlVncApplicationDerivationOperation(frame.derivationOperationFrame, runtimeTarget)
          && frame.selectedDerivation === frame.derivationOperationFrame.derivationType
          && frame.activeMachineryFrame?.derivationOperationFrame === frame.derivationOperationFrame);
      const sourceTypedFrame = getClassicalNahuatlVncApplicationFinalTypedFrame(frame.sourceMachineryFrame);
      const sourceFormula = getClassicalNahuatlVncApplicationCanonicalFormula(sourceTypedFrame);
      const sourceFormulaCanonical = areClassicalNahuatlVncApplicationFormulaProjectionsCanonical(frame.sourceMachineryFrame, sourceFormula);
      const sourceActiveContinuity = derivationDirect
        ? frame.sourceMachineryFrame === frame.activeMachineryFrame
        : frame.activeMachineryFrame?.kind === "classical-nahuatl-vnc-derived-machinery-frame"
          && frame.sourceMachineryFrame === frame.activeMachineryFrame.sourceMachineryFrame;
      const activeTypedFrame = getClassicalNahuatlVncApplicationFinalTypedFrame(frame.activeMachineryFrame);
      const selectedVoiceOperation = normalizeClassicalNahuatlVncApplicationToken(frame.selectedVoiceOperation || "active");
      const selectedPublicVoice = getClassicalNahuatlVncApplicationPublicVoiceForOperation(selectedVoiceOperation);
      const selectedVoiceContinuity = frame.selectedVoice === "active"
        ? areClassicalNahuatlVncApplicationTypedFramesEqual(selectedTypedFrame, activeTypedFrame) && frame.selectedMachineryFrame === frame.activeMachineryFrame
        : frame.selectedMachineryFrame?.kind === "classical-nahuatl-nonactive-vnc-derived-vnc-machinery-frame"
          && selectedPublicVoice === frame.selectedVoice
          && frame.selectedMachineryFrame?.voice === selectedVoiceOperation
          && frame.selectedMachineryFrame.activeMachineryFrame === frame.activeMachineryFrame;
      const expectedAppliedTypedFrames = getClassicalNahuatlVncApplicationExpectedAppliedTypedFrames(frame);
      const appliedTypedFramesCanonical = areClassicalNahuatlVncApplicationDenseArrayValuesIdentical(frame.appliedTypedFrames, expectedAppliedTypedFrames);
      const finiteSurfaceCanonical = Boolean(
        typeof runtimeTarget?.isClassicalNahuatlVncFiniteSurfaceFrame === "function"
        && runtimeTarget.isClassicalNahuatlVncFiniteSurfaceFrame(frame.finiteSurfaceFrame) === true
        && frame.finiteSurfaceFrame.machineryFrame === frame.selectedMachineryFrame
        && Boolean(frame.finiteSurfaceFrame.formulaRealization)
        && frame.surfaceRealization === frame.finiteSurfaceFrame.wordRealization
      );
      const canonicalFormula = normalizeClassicalNahuatlVncApplicationToken(frame.finiteSurfaceFrame?.formulaRealization || "");
      const canonical = Boolean(derivationRecognized && formationSourceCanonical && sourceCanonical && sourceFormationContinuity && sourceAnalysisCanonical && sourceAnalysisContinuity && sourceFormulaCanonical && activeCanonical && selectedCanonical && operationCanonical && sourceActiveContinuity && selectedVoiceContinuity && appliedTypedFramesCanonical && finiteSurfaceCanonical && canonicalFormula && normalizeClassicalNahuatlVncApplicationToken(frame.formulaRealization) === canonicalFormula && areClassicalNahuatlVncApplicationTypedFramesEqual(frame.finalTypedVncSlotFrame, selectedTypedFrame));
      if (canonical) {
        classicalNahuatlVncApplicationValidationTransaction?.resultFrames.add(frame);
        if (classicalNahuatlVncApplicationBuiltResultFrames.has(frame)) {
          classicalNahuatlVncApplicationPersistentCanonicalResultFrames.add(frame);
        }
      }
      return canonical;
    }
    function isClassicalNahuatlVncApplicationResultFrame(frame = null) {
      return runClassicalNahuatlVncApplicationValidationTransaction(() => isClassicalNahuatlVncApplicationResultFrameInternal(frame));
    }
    function interpretClassicalNahuatlVncContextualTime(
      vncApplicationFrame = null,
      context = {}
    ) {
      const contextObject = context && typeof context === "object"
        && !Array.isArray(context)
        ? context
        : {};
      const allowedKeys = new Set([
        "referenceTime",
        "eventRelation",
        "relationScope",
        "yeParticleResult",
      ]);
      const forbiddenKey = Reflect.ownKeys(contextObject).find(
        key => typeof key !== "string" || !allowedKeys.has(key)
      );
      const applicationAuthorized =
        isClassicalNahuatlVncApplicationFrame(vncApplicationFrame);
      const resultFrame = applicationAuthorized
        ? vncApplicationFrame.resultFrame
        : null;
      const finiteTense = applicationAuthorized
        ? normalizeClassicalNahuatlVncApplicationToken(
          vncApplicationFrame.normalizedRequest?.tense
        ).toLowerCase()
        : "";
      const referenceTime =
        normalizeClassicalNahuatlVncApplicationToken(
          contextObject.referenceTime
        ).toLowerCase();
      const eventRelation =
        normalizeClassicalNahuatlVncApplicationToken(
          contextObject.eventRelation
        ).toLowerCase();
      const relationScope =
        normalizeClassicalNahuatlVncApplicationToken(
          contextObject.relationScope
        ).toLowerCase();
      const readingByContext = {
        "present|past|same": "historical-past",
        "present|past|prior": "pluperfect",
        "present|past|subsequent": "future-in-past",
        "present|past|concomitant": "past-progressive",
        "preterit|present|prior": "priority-to-present",
        "preterit|past|prior": "priority-to-past",
        "preterit|future|prior": "priority-to-future",
        "future|past|subsequent": "posteriority-to-past",
        "future|present|immediately-prior": "imminent",
        "future|future|immediately-prior": "imminent",
      };
      const timeReading = readingByContext[
        `${finiteTense}|${referenceTime}|${eventRelation}`
      ] || "";
      const imminent = timeReading === "imminent";
      const runtimeTarget =
        getClassicalNahuatlVncApplicationRuntimeTarget();
      const yeParticleResult = contextObject.yeParticleResult || null;
      const yeAuthorized = !imminent || Boolean(
        typeof runtimeTarget?.isClassicalNahuatlParticleResultFrame
          === "function"
        && runtimeTarget.isClassicalNahuatlParticleResultFrame(
          yeParticleResult
        )
        && yeParticleResult.particleId === "l3-ye"
      );
      const scopeAuthorized = [
        "concatenation",
        "neighboring-vnc",
        "cross-sentence",
        "discourse",
      ].includes(relationScope);
      const authorized = Boolean(
        !forbiddenKey
        && applicationAuthorized
        && isClassicalNahuatlVncApplicationResultFrame(resultFrame)
        && timeReading
        && scopeAuthorized
        && yeAuthorized
      );
      const blockReason = forbiddenKey
        ? "contextual-time-accepts-context-facts-only"
        : !applicationAuthorized
          ? "owner-issued-finite-vnc-result-required"
          : !timeReading
            ? "contextual-time-relation-not-licensed-for-finite-tense"
            : !scopeAuthorized
              ? "contextual-time-relation-scope-required"
              : !yeAuthorized
                ? "future-imminence-requires-owner-issued-ye-particle"
                : "";
      const frame = deepFreezeClassicalNahuatlVncApplicationValue({
        kind: "classical-nahuatl-vnc-contextual-time-frame",
        version: CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason,
        finiteVncResult: authorized ? vncApplicationFrame : null,
        finiteTense,
        referenceTime,
        eventRelation,
        relationScope,
        timeReading: authorized ? timeReading : "",
        imminenceParticleResult:
          authorized && imminent ? yeParticleResult : null,
        finiteTensePreserved: authorized,
        changesFiniteMorphology: false,
        formulaRealization: authorized
          ? resultFrame.formulaRealization
          : "",
        surfaceRealization: authorized
          ? resultFrame.surfaceRealization
          : "",
        formulaProjectionSource:
          "owner-issued-vnc-typed-slot-result",
        writtenProjectionSource:
          "owner-issued-vnc-boundary-realization-result",
        contextualFactIsUserChoice: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        lessonMetadataAuthority: false,
        callerSuppliedAuthorityAccepted: false,
      });
      if (authorized) classicalNahuatlContextualTimeFrames.add(frame);
      return frame;
    }
    function isClassicalNahuatlVncContextualTimeFrame(frame = null) {
      return Boolean(
        classicalNahuatlContextualTimeFrames.has(frame)
        && frame?.kind === "classical-nahuatl-vnc-contextual-time-frame"
        && frame.version === CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION
        && frame.authorizationStatus === "authorized"
        && isClassicalNahuatlVncApplicationFrame(frame.finiteVncResult)
        && frame.formulaRealization
          === frame.finiteVncResult.resultFrame.formulaRealization
        && frame.surfaceRealization
          === frame.finiteVncResult.resultFrame.surfaceRealization
        && frame.finiteTensePreserved === true
        && frame.changesFiniteMorphology === false
        && frame.contextualFactIsUserChoice === false
        && frame.formulaStringAuthority === false
        && frame.surfaceStringAuthority === false
        && frame.lessonMetadataAuthority === false
        && frame.callerSuppliedAuthorityAccepted === false
        && Object.isFrozen(frame)
      );
    }
    function interpretClassicalNahuatlVncContextualTimeBatch(entries = []) {
      const sourceEntries = Array.isArray(entries) ? entries : [];
      const results = sourceEntries.map(entry => (
        interpretClassicalNahuatlVncContextualTime(
          entry?.finiteVncResult || null,
          entry?.context || {}
        )
      ));
      const authorized = Boolean(
        sourceEntries.length
        && results.every(isClassicalNahuatlVncContextualTimeFrame)
      );
      const frame = deepFreezeClassicalNahuatlVncApplicationValue({
        kind: "classical-nahuatl-vnc-contextual-time-batch",
        version: CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized
          ? ""
          : "contextual-time-batch-requires-authorized-scalar-entries",
        results: authorized ? results : [],
        requestCount: sourceEntries.length,
        pointwiseScalarEquality: authorized,
        scalarEvaluatorIdentity:
          "interpretClassicalNahuatlVncContextualTime",
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        callerSuppliedAuthorityAccepted: false,
      });
      if (authorized) classicalNahuatlContextualTimeBatchFrames.add(frame);
      return frame;
    }
    function isClassicalNahuatlVncContextualTimeBatch(frame = null) {
      return Boolean(
        classicalNahuatlContextualTimeBatchFrames.has(frame)
        && frame?.kind === "classical-nahuatl-vnc-contextual-time-batch"
        && frame.version === CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION
        && frame.authorizationStatus === "authorized"
        && frame.requestCount === frame.results.length
        && frame.results.every(isClassicalNahuatlVncContextualTimeFrame)
        && frame.pointwiseScalarEquality === true
        && frame.scalarEvaluatorIdentity
          === "interpretClassicalNahuatlVncContextualTime"
        && frame.formulaStringAuthority === false
        && frame.surfaceStringAuthority === false
        && frame.callerSuppliedAuthorityAccepted === false
        && Object.isFrozen(frame)
      );
    }
    function isClassicalNahuatlVncApplicationFrameInternal(frame = null) {
      if (frame && typeof frame === "object" && (classicalNahuatlVncApplicationPersistentCanonicalFrames.has(frame) || classicalNahuatlVncApplicationValidationTransaction?.applicationFrames.has(frame))) {
        return true;
      }
      if (!frame || frame.kind !== "classical-nahuatl-vnc-application-frame" || frame.version !== CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION || frame.authorizationStatus !== "authorized" || frame.controlFrame?.authorizationStatus !== "authorized" || frame.resultFrame?.authorizationStatus !== "authorized" || !isClassicalNahuatlVncApplicationResultFrame(frame.resultFrame) || frame.normalizedRequest?.kind !== "classical-nahuatl-vnc-application-request" || frame.controlFrame?.kind !== "classical-nahuatl-vnc-application-control-frame" || frame.resultFrame.selectedSourceVoice !== frame.controlFrame.selectedSourceVoice || frame.normalizedRequest.sourceVoice !== frame.controlFrame.selectedSourceVoice || frame.resultFrame.selectedVoice !== frame.controlFrame.selectedVoice || frame.resultFrame.selectedVoiceOperation !== frame.controlFrame.selectedVoiceOperation || frame.resultFrame.selectedNonactiveOptionId !== frame.controlFrame.selectedNonactiveOptionId || frame.normalizedRequest.targetVoiceOperation !== frame.controlFrame.selectedVoiceOperation || frame.resultFrame.selectedDerivation !== frame.controlFrame.derivationType || frame.normalizedRequest.voice !== frame.controlFrame.selectedVoice || frame.normalizedRequest.derivationType !== frame.controlFrame.derivationType || frame.callerSuppliedAuthorityAccepted !== false || frame.formulaStringAuthority !== false || frame.surfaceStringAuthority !== false) {
        return false;
      }
      const runtimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget();
      const directDerivation = frame.controlFrame.derivationType === "direct";
      const continuationSource =
        classicalNahuatlVncContinuationSourceByApplicationFrame.get(frame)
        || classicalNahuatlVncContinuationSourceByResultFrame.get(
          frame.resultFrame,
        )
        || null;
      const continuationSourceMachineryFrame =
        continuationSource?.sourceMachineryFrame || null;
      const continuationFormationSourceMachineryFrame =
        continuationSource?.formationSourceMachineryFrame || null;
      const continuationSourceResultFrame =
        continuationSource?.sourceResultFrame || null;
      const continuationSourceDescriptor =
        continuationSource?.sourceDescriptor || null;
      const continuationSourceCanonical = Boolean(
        continuationSource
        && continuationSourceMachineryFrame
          === continuationSourceResultFrame?.selectedMachineryFrame
        && continuationFormationSourceMachineryFrame
          === continuationSourceDescriptor
            ?.formationSourceMachineryFrame
        && (
          continuationSourceDescriptor?.sourceVoice === "active"
            ? continuationSourceMachineryFrame
              === continuationFormationSourceMachineryFrame
            : continuationSourceMachineryFrame?.activeMachineryFrame
              === continuationFormationSourceMachineryFrame
        )
        && classicalNahuatlVncApplicationBuiltResultFrames.has(
          continuationSourceResultFrame,
        )
        && continuationSourceResultFrame.authorizationStatus === "authorized"
        && isCanonicalClassicalNahuatlVncApplicationDerivationSourceMachineryFrame(
          continuationSourceMachineryFrame,
          runtimeTarget,
        )
        && buildClassicalNahuatlVncContinuationRequest(
          frame.normalizedRequest,
          continuationSourceDescriptor,
        ),
      );
      const rebuiltDerivationSourceRequest =
        buildClassicalNahuatlVncApplicationDerivationSourceRequest(
          frame.normalizedRequest,
        );
      const rebuiltFormationSourceMachineryFrame =
        continuationSourceCanonical
          ? continuationFormationSourceMachineryFrame
          : buildClassicalNahuatlVncApplicationSourceMachinery(
            runtimeTarget,
            rebuiltDerivationSourceRequest,
          );
      const rebuiltCanonicalFormationSourceDescriptor = getClassicalNahuatlVncApplicationCanonicalActivePredicateDescriptor(rebuiltFormationSourceMachineryFrame, {
        stem: frame.normalizedRequest.sourceStem,
        verbClass: frame.normalizedRequest.verbClass,
        sourceValence: frame.normalizedRequest.sourceValence,
        objectRequests: frame.normalizedRequest.sourceObjectRequests
      });
      const rebuiltSourceNonactiveOptionInventory = runtimeTarget.getClassicalNahuatlNonactiveStemOptions(rebuiltCanonicalFormationSourceDescriptor.stem, {
        verbClass: rebuiltCanonicalFormationSourceDescriptor.verbClass || frame.normalizedRequest.verbClass,
        sourceValence: rebuiltCanonicalFormationSourceDescriptor.sourceValence || frame.normalizedRequest.sourceValence
      });
      let rebuiltAllowedSourceVoices = frame.normalizedRequest.derivationType === "causative"
        && isClassicalNahuatlVncApplicationCanonicalActiveMachineryFrame(rebuiltFormationSourceMachineryFrame)
        ? Object.freeze(getClassicalNahuatlVncApplicationAllowedVoices({
          sourceStem: rebuiltCanonicalFormationSourceDescriptor.stem,
          sourceValence: rebuiltCanonicalFormationSourceDescriptor.sourceValence || frame.normalizedRequest.sourceValence,
          outputScope: "single",
          nonactiveOptionInventory: rebuiltSourceNonactiveOptionInventory,
          objectRequests: rebuiltCanonicalFormationSourceDescriptor.objectRequests
        }).filter(voice => CLASSICAL_NAHUATL_VNC_APPLICATION_SOURCE_VOICES.includes(voice)))
        : Object.freeze(["active"]);
      if (!rebuiltAllowedSourceVoices.length) {
        rebuiltAllowedSourceVoices = Object.freeze(["active"]);
      }
      const normalizedRequestedSourceVoice = CLASSICAL_NAHUATL_VNC_APPLICATION_SOURCE_VOICES.includes(frame.normalizedRequest.requestedSourceVoice)
        ? frame.normalizedRequest.requestedSourceVoice
        : "active";
      const rebuiltSelectedSourceVoice = rebuiltAllowedSourceVoices.includes(normalizedRequestedSourceVoice)
        ? normalizedRequestedSourceVoice
        : "active";
      let rebuiltSourceVoiceNormalizationReason = "";
      if (!frame.normalizedRequest.requestedSourceVoiceRecognized) {
        rebuiltSourceVoiceNormalizationReason = "unknown-source-voice-normalized-to-active";
      } else if (frame.normalizedRequest.derivationType !== "causative" && normalizedRequestedSourceVoice !== "active") {
        rebuiltSourceVoiceNormalizationReason = "source-voice-applies-only-before-causative-derivation";
      } else if (rebuiltSelectedSourceVoice !== normalizedRequestedSourceVoice) {
        rebuiltSourceVoiceNormalizationReason = "requested-source-voice-not-authorized-for-source";
      }
      const continuationSourceVoiceMatches = Boolean(
        continuationSourceCanonical
        && rebuiltSelectedSourceVoice
          === continuationSourceDescriptor.sourceVoice
        && frame.normalizedRequest.sourceNonactiveOptionId
          === continuationSourceDescriptor.sourceNonactiveOptionId
      );
      const rebuiltSourceVoiceBundle =
        continuationSourceVoiceMatches
          ? Object.freeze({
            sourceVoice: continuationSourceDescriptor.sourceVoice,
            selectedSourceNonactiveOptionId:
              continuationSourceDescriptor.sourceNonactiveOptionId,
            sourceNonactiveStemRecord:
              continuationSourceMachineryFrame?.nonactiveStemRecord || null,
            sourceMachineryFrame: continuationSourceMachineryFrame,
          })
          : buildClassicalNahuatlVncApplicationSourceVoiceMachinery(
            runtimeTarget,
            rebuiltFormationSourceMachineryFrame,
            {
              ...rebuiltDerivationSourceRequest,
              sourceVoice: rebuiltSelectedSourceVoice,
              sourceNonactiveOptionId:
                frame.normalizedRequest.sourceNonactiveOptionId,
            },
            {
              sourceVoice: rebuiltSelectedSourceVoice,
              sourceNonactiveOptionInventory:
                rebuiltSourceNonactiveOptionInventory,
            },
          );
      const rebuiltSourceMachineryFrame = rebuiltSourceVoiceBundle.sourceMachineryFrame;
      const formationSourceRequestContinuity =
        continuationSourceCanonical
          ? rebuiltFormationSourceMachineryFrame
            === frame.resultFrame.formationSourceMachineryFrame
          : areClassicalNahuatlVncApplicationCanonicalValuesEqual(
            rebuiltFormationSourceMachineryFrame,
            frame.resultFrame.formationSourceMachineryFrame,
          );
      const selectedSourceRequestContinuity =
        continuationSourceCanonical
          ? rebuiltSourceMachineryFrame
            === frame.resultFrame.sourceMachineryFrame
          : areClassicalNahuatlVncApplicationCanonicalValuesEqual(
            rebuiltSourceMachineryFrame,
            frame.resultFrame.sourceMachineryFrame,
          );
      const sourceRequestContinuity = (
        continuationSource == null || continuationSourceCanonical
      )
        && isClassicalNahuatlVncApplicationCanonicalActiveMachineryFrame(rebuiltFormationSourceMachineryFrame)
        && formationSourceRequestContinuity
        && (directDerivation
          ? isClassicalNahuatlVncApplicationCanonicalActiveMachineryFrame(rebuiltSourceMachineryFrame)
          : isCanonicalClassicalNahuatlVncApplicationDerivationSourceMachineryFrame(rebuiltSourceMachineryFrame, runtimeTarget))
        && selectedSourceRequestContinuity;
      const rebuiltSourceAnalysisCandidate = sourceRequestContinuity && typeof runtimeTarget?.buildClassicalNahuatlVncDerivationSourceAnalysisFrame === "function"
        ? runtimeTarget.buildClassicalNahuatlVncDerivationSourceAnalysisFrame(rebuiltSourceMachineryFrame)
        : null;
      const rebuiltSourceAnalysisFrame = isCanonicalClassicalNahuatlVncApplicationSourceAnalysisFrame(rebuiltSourceAnalysisCandidate, runtimeTarget)
        ? rebuiltSourceAnalysisCandidate
        : null;
      const expectedAndResultAnalysisMatch = rebuiltSourceAnalysisFrame == null && frame.resultFrame.sourceAnalysisFrame == null
        || areClassicalNahuatlVncApplicationCanonicalValuesEqual(rebuiltSourceAnalysisFrame, frame.resultFrame.sourceAnalysisFrame);
      const controlAndResultAnalysisMatch = frame.controlFrame.sourceAnalysisFrame === frame.resultFrame.sourceAnalysisFrame;
      const sourceAnalysisContinuity = expectedAndResultAnalysisMatch && controlAndResultAnalysisMatch;
      const operationFrame = frame.resultFrame.derivationOperationFrame;
      const rebuiltDerivationOperationFrame = directDerivation || !sourceRequestContinuity
        ? null
        : runtimeTarget.deriveClassicalNahuatlVncDerivationOperationFrame(
          rebuiltSourceMachineryFrame,
          buildClassicalNahuatlVncApplicationDerivationOperationRequest(frame.normalizedRequest)
        );
      const operationParticipantRequestContinuity = directDerivation
        ? operationFrame == null
        : Boolean(
          operationFrame
          && runtimeTarget.isClassicalNahuatlVncDerivationOperationFrame(rebuiltDerivationOperationFrame) === true
          && rebuiltDerivationOperationFrame.canonicalSignature === operationFrame.canonicalSignature
          && rebuiltDerivationOperationFrame.selectedOptionId === operationFrame.selectedOptionId
          && rebuiltDerivationOperationFrame.participantTransformFrame?.canonicalSignature === operationFrame.participantTransformFrame?.canonicalSignature
          && operationFrame.participantTransformFrame?.sourceVoice === frame.normalizedRequest.sourceVoice
          && operationFrame.participantTransformFrame?.targetSubject === frame.normalizedRequest.subject
          && operationFrame.participantTransformFrame?.requestedCausativeObjectKind === (
            frame.normalizedRequest.derivationType === "causative" && frame.normalizedRequest.sourceVoice === "active"
              ? frame.normalizedRequest.causativeObjectKind
              : ""
          )
          && operationFrame.participantTransformFrame?.causativeSpecificShuntlineRealization === (
            frame.normalizedRequest.derivationType === "causative"
              && operationFrame.participantTransformFrame?.causativeSpecificShuntlineChoiceEligible === true
              ? frame.normalizedRequest.causativeSpecificShuntlineRealization || "silent"
              : ""
          )
        );
      const rebuiltCausativeParticipantChoiceControls = getClassicalNahuatlVncApplicationCausativeParticipantChoiceControls(operationFrame, frame.normalizedRequest);
      const sourceObjectRequests = Array.isArray(frame.normalizedRequest.sourceObjectRequests) ? frame.normalizedRequest.sourceObjectRequests : [];
      const effectiveSourceValence = frame.normalizedRequest.effectiveSourceValence || frame.normalizedRequest.sourceValence;
      const expectedTargetValence = directDerivation
        ? sourceObjectRequests.length > 1 ? "multiple-object" : effectiveSourceValence
        : getClassicalNahuatlVncApplicationTargetValence(operationFrame, effectiveSourceValence);
      const expectedTargetObjectRequests = directDerivation
        ? sourceObjectRequests
        : getClassicalNahuatlVncApplicationOperationObjectRequests(operationFrame);
      const rebuiltCanonicalActiveDescriptor = getClassicalNahuatlVncApplicationCanonicalActivePredicateDescriptor(frame.resultFrame.activeMachineryFrame, {
        stem: frame.normalizedRequest.targetStem,
        verbClass: frame.normalizedRequest.targetClass,
        sourceValence: expectedTargetValence,
        objectRequests: expectedTargetObjectRequests
      });
      const rebuiltVoiceTargetStem = directDerivation
        ? rebuiltCanonicalActiveDescriptor.stem
        : frame.normalizedRequest.targetStem;
      const rebuiltVoiceTargetClass = directDerivation
        ? rebuiltCanonicalActiveDescriptor.verbClass || frame.normalizedRequest.targetClass
        : frame.normalizedRequest.targetClass;
      const rebuiltVoiceTargetValence = directDerivation
        ? rebuiltCanonicalActiveDescriptor.sourceValence || expectedTargetValence
        : expectedTargetValence;
      const rebuiltVoiceObjectRequests = directDerivation
        ? rebuiltCanonicalActiveDescriptor.objectRequests
        : expectedTargetObjectRequests;
      const rebuiltLesson20NonactiveOptionInventory = runtimeTarget.getClassicalNahuatlNonactiveStemOptions(rebuiltVoiceTargetStem, {
        verbClass: rebuiltVoiceTargetClass,
        sourceValence: rebuiltVoiceTargetValence
      });
      const rebuiltAllowedVoiceOperations = getClassicalNahuatlVncApplicationAllowedVoices({
        sourceStem: rebuiltVoiceTargetStem,
        sourceValence: rebuiltVoiceTargetValence,
        outputScope: frame.normalizedRequest.outputScope,
        nonactiveOptionInventory: rebuiltLesson20NonactiveOptionInventory,
        objectRequests: rebuiltVoiceObjectRequests
      });
      const rebuiltAllowedVoices = getClassicalNahuatlVncApplicationPublicAllowedVoices(rebuiltAllowedVoiceOperations);
      const normalizedRequestedVoice = CLASSICAL_NAHUATL_VNC_APPLICATION_VOICES.includes(frame.normalizedRequest.requestedVoice)
        ? frame.normalizedRequest.requestedVoice
        : "active";
      const rebuiltSelectedVoice = rebuiltAllowedVoices.includes(normalizedRequestedVoice)
        ? normalizedRequestedVoice
        : "active";
      let rebuiltVoiceNormalizationReason = "";
      if (!frame.normalizedRequest.requestedVoiceRecognized) {
        rebuiltVoiceNormalizationReason = "unknown-voice-normalized-to-active";
      } else if (!frame.normalizedRequest.targetStem && normalizedRequestedVoice !== "active") {
        rebuiltVoiceNormalizationReason = "source-stem-required-before-derived-voice";
      } else if (rebuiltSelectedVoice !== normalizedRequestedVoice) {
        rebuiltVoiceNormalizationReason = "requested-voice-not-authorized-for-source";
      }
      const rebuiltNonactiveOptionInventory = buildClassicalNahuatlVncApplicationNonactiveFormationInventory({
        publicVoice: rebuiltSelectedVoice,
        allowedVoiceOperations: rebuiltAllowedVoiceOperations,
        lesson20OptionInventory: rebuiltLesson20NonactiveOptionInventory
      });
      const rebuiltSelectedNonactiveOptionId = rebuiltSelectedVoice === "active"
        ? ""
        : normalizeClassicalNahuatlVncApplicationToken(frame.normalizedRequest.nonactiveOptionId || rebuiltNonactiveOptionInventory.automaticOptionId || "");
      const rebuiltSelectedNonactiveOption = rebuiltSelectedNonactiveOptionId
        ? rebuiltNonactiveOptionInventory.options.find(option => option.optionId === rebuiltSelectedNonactiveOptionId) || null
        : null;
      const rebuiltSelectedVoiceOperation = rebuiltSelectedVoice === "active"
        ? "active"
        : rebuiltSelectedNonactiveOption?.voiceOperation || rebuiltSelectedVoice;
      const derivationSelectionContinuity = frame.controlFrame.derivationType === "direct"
        ? operationFrame == null
          && frame.controlFrame.derivationOptionInventory == null
          && frame.controlFrame.selectedDerivationOptionId === ""
          && frame.controlFrame.derivedStem === ""
          && frame.controlFrame.derivedClass === ""
          && frame.controlFrame.targetObjectCount === sourceObjectRequests.length
          && frame.normalizedRequest.targetStem === frame.normalizedRequest.sourceStem
          && frame.normalizedRequest.targetClass === rebuiltVoiceTargetClass
          && frame.normalizedRequest.targetValence === rebuiltVoiceTargetValence
        : Boolean(operationFrame
          && operationFrame.derivationType === frame.controlFrame.derivationType
          && isCanonicalClassicalNahuatlVncApplicationDerivationInventory(frame.controlFrame.derivationOptionInventory, runtimeTarget)
          && frame.controlFrame.derivationOptionInventory.sourceMachineryFrame === frame.resultFrame.sourceMachineryFrame
          && frame.controlFrame.derivationOptionInventory.sourceAnalysisFrame === frame.resultFrame.sourceAnalysisFrame
          && frame.controlFrame.selectedDerivationOptionId === operationFrame.selectedOptionId
          && frame.controlFrame.derivedStem === operationFrame.targetStem
          && frame.controlFrame.derivedClass === operationFrame.targetClass
          && frame.controlFrame.targetObjectCount === operationFrame.targetObjectRequests?.length
          && frame.normalizedRequest.targetStem === operationFrame.targetStem
          && frame.normalizedRequest.targetClass === operationFrame.targetClass
          && frame.normalizedRequest.targetValence === expectedTargetValence);
      const requestedDerivationAccepted = frame.normalizedRequest.requestedDerivationRecognized === true;
      const requestControlContinuity = frame.controlFrame.requestedDerivation === frame.normalizedRequest.requestedDerivation
        && frame.controlFrame.requestedDerivationAccepted === requestedDerivationAccepted
        && frame.controlFrame.requestedSourceVoice === frame.normalizedRequest.requestedSourceVoice
        && frame.controlFrame.sourceVoice === frame.normalizedRequest.sourceVoice
        && frame.controlFrame.selectedSourceVoice === frame.normalizedRequest.sourceVoice
        && frame.controlFrame.selectedSourceVoice === rebuiltSelectedSourceVoice
        && frame.controlFrame.requestedSourceVoiceAccepted === (frame.controlFrame.selectedSourceVoice === frame.controlFrame.requestedSourceVoice)
        && Array.isArray(frame.controlFrame.allowedSourceVoices)
        && areClassicalNahuatlVncApplicationCanonicalValuesEqual(frame.controlFrame.allowedSourceVoices, rebuiltAllowedSourceVoices)
        && areClassicalNahuatlVncApplicationCanonicalValuesEqual(frame.controlFrame.sourceNonactiveOptionInventory, rebuiltSourceNonactiveOptionInventory)
        && frame.controlFrame.sourceNonactiveSelectorRequired === (rebuiltSelectedSourceVoice !== "active" && rebuiltSourceNonactiveOptionInventory?.selectorRequired === true)
        && frame.controlFrame.selectedSourceNonactiveOptionId === rebuiltSourceVoiceBundle.selectedSourceNonactiveOptionId
        && frame.controlFrame.sourceVoiceNormalizationReason === rebuiltSourceVoiceNormalizationReason
        && frame.controlFrame.causativeObjectKindChoiceEligible === rebuiltCausativeParticipantChoiceControls.causativeObjectKindChoiceEligible
        && areClassicalNahuatlVncApplicationCanonicalValuesEqual(frame.controlFrame.allowedCausativeObjectKinds, rebuiltCausativeParticipantChoiceControls.allowedCausativeObjectKinds)
        && frame.controlFrame.causativeObjectKindSelectionRequired === rebuiltCausativeParticipantChoiceControls.causativeObjectKindSelectionRequired
        && frame.controlFrame.selectedCausativeObjectKind === rebuiltCausativeParticipantChoiceControls.selectedCausativeObjectKind
        && frame.controlFrame.causativeSpecificShuntlineChoiceEligible === rebuiltCausativeParticipantChoiceControls.causativeSpecificShuntlineChoiceEligible
        && areClassicalNahuatlVncApplicationCanonicalValuesEqual(frame.controlFrame.allowedCausativeSpecificShuntlineRealizations, rebuiltCausativeParticipantChoiceControls.allowedCausativeSpecificShuntlineRealizations)
        && frame.controlFrame.causativeSpecificShuntlineSelectionRequired === rebuiltCausativeParticipantChoiceControls.causativeSpecificShuntlineSelectionRequired
        && frame.controlFrame.selectedCausativeSpecificShuntlineRealization === rebuiltCausativeParticipantChoiceControls.selectedCausativeSpecificShuntlineRealization
        && frame.controlFrame.requestedVoice === frame.normalizedRequest.requestedVoice
        && frame.controlFrame.requestedVoiceAccepted === (frame.controlFrame.selectedVoice === frame.controlFrame.requestedVoice)
        && Array.isArray(frame.controlFrame.allowedDerivations)
        && areClassicalNahuatlVncApplicationCanonicalValuesEqual(frame.controlFrame.allowedDerivations, CLASSICAL_NAHUATL_VNC_APPLICATION_DERIVATIONS)
        && Array.isArray(frame.controlFrame.allowedVoices)
        && areClassicalNahuatlVncApplicationCanonicalValuesEqual(frame.controlFrame.allowedVoices, rebuiltAllowedVoices)
        && Array.isArray(frame.controlFrame.allowedVoiceOperations)
        && areClassicalNahuatlVncApplicationCanonicalValuesEqual(frame.controlFrame.allowedVoiceOperations, rebuiltAllowedVoiceOperations)
        && frame.controlFrame.selectedVoice === rebuiltSelectedVoice
        && frame.controlFrame.selectedVoiceOperation === rebuiltSelectedVoiceOperation
        && frame.normalizedRequest.targetVoiceOperation === rebuiltSelectedVoiceOperation
        && areClassicalNahuatlVncApplicationCanonicalValuesEqual(frame.controlFrame.nonactiveOptionInventory, rebuiltNonactiveOptionInventory)
        && frame.controlFrame.nonactiveSelectorRequired === ((rebuiltSelectedVoice === "passive" || rebuiltSelectedVoice === "impersonal") && rebuiltNonactiveOptionInventory?.selectorRequired === true)
        && frame.controlFrame.voiceNormalizationReason === rebuiltVoiceNormalizationReason;
      const selectedLesson20OptionId = frame.resultFrame.selectedMachineryFrame?.nonactiveStemRecord?.selectedOptionId || "";
      const selectedSourceNonactiveOptionId = frame.resultFrame.sourceMachineryFrame?.nonactiveStemRecord?.selectedOptionId || "";
      const selectedTargetFormationContinuity = frame.controlFrame.selectedNonactiveOptionId === rebuiltSelectedNonactiveOptionId
        && frame.resultFrame.selectedNonactiveOptionId === rebuiltSelectedNonactiveOptionId
        && (rebuiltSelectedNonactiveOption?.formationKind !== "lesson20-nonactive-stem"
          || selectedLesson20OptionId === rebuiltSelectedNonactiveOption.lesson20OptionId);
      const nonactiveSelectionContinuity = selectedTargetFormationContinuity
        && frame.controlFrame.selectedSourceNonactiveOptionId === selectedSourceNonactiveOptionId
        && frame.normalizedRequest.sourceNonactiveOptionId === selectedSourceNonactiveOptionId;
      const baseFrameCanonical = Boolean(sourceRequestContinuity && sourceAnalysisContinuity && operationParticipantRequestContinuity && derivationSelectionContinuity && requestControlContinuity && nonactiveSelectionContinuity);
      if (!baseFrameCanonical) {
        return false;
      }
      if (!Object.prototype.hasOwnProperty.call(frame, "derivationExplanationProjection")) {
        classicalNahuatlVncApplicationValidationTransaction?.applicationFrames.add(frame);
        if (classicalNahuatlVncApplicationBuiltFrames.has(frame)) {
          classicalNahuatlVncApplicationPersistentCanonicalFrames.add(frame);
        }
        return true;
      }
      const canonical = areClassicalNahuatlVncApplicationCanonicalValuesEqual(
        frame.derivationExplanationProjection,
        projectCanonicalClassicalNahuatlVncDerivationExplanation(frame, runtimeTarget)
      );
      if (canonical) {
        classicalNahuatlVncApplicationValidationTransaction?.applicationFrames.add(frame);
        if (classicalNahuatlVncApplicationBuiltFrames.has(frame)) {
          classicalNahuatlVncApplicationPersistentCanonicalFrames.add(frame);
        }
      }
      return canonical;
    }
    function isClassicalNahuatlVncApplicationFrame(frame = null) {
      return runClassicalNahuatlVncApplicationValidationTransaction(() => isClassicalNahuatlVncApplicationFrameInternal(frame));
    }
    function buildBlockedClassicalNahuatlOrderedVoiceVncApplicationFrame({
      blockReason = "classical-ordered-voice-vnc-application-not-authorized",
      operations = [],
      rejectedAuthorityFields = [],
    } = {}) {
      return deepFreezeClassicalNahuatlVncApplicationValue({
        kind: CLASSICAL_NAHUATL_ORDERED_VOICE_VNC_APPLICATION_KIND,
        version: CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,
        authorizationStatus: "blocked",
        blockReason,
        operations: Array.isArray(operations) ? operations : [],
        rejectedAuthorityFields: Array.isArray(rejectedAuthorityFields)
          ? rejectedAuthorityFields
          : [],
        baseApplicationFrame: null,
        voiceLayerChainFrame: null,
        selectedMachineryFrame: null,
        finalTypedVncSlotFrame: null,
        finiteSurfaceFrame: null,
        formulaRealization: "",
        surfaceRealization: "",
        typedFrameAuthority: true,
        callerSuppliedAuthorityAccepted: false,
        curriculumOrderAuthority: false,
        lessonMetadataAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        displayTextAuthority: false,
      });
    }
    function buildClassicalNahuatlOrderedVoiceVncApplicationFrame(
      baseApplicationFrame = null,
      request = {},
    ) {
      const requestObject = request && typeof request === "object" && !Array.isArray(request)
        ? request
        : {};
      const rejectedAuthorityFields = getClassicalNahuatlVncApplicationPresentFields(
        requestObject,
        CLASSICAL_NAHUATL_ORDERED_VOICE_CALLER_AUTHORITY_FIELDS,
      );
      const operationValues = Array.isArray(requestObject.operations)
        ? requestObject.operations
        : [];
      const operationsAreTyped = operationValues.length > 0
        && operationValues.every(operation => (
          typeof operation === "string"
          && Boolean(normalizeClassicalNahuatlVncApplicationToken(operation))
        ));
      const operations = Object.freeze(
        operationsAreTyped
          ? operationValues.map(normalizeClassicalNahuatlVncApplicationToken)
          : [],
      );
      if (rejectedAuthorityFields.length) {
        return buildBlockedClassicalNahuatlOrderedVoiceVncApplicationFrame({
          blockReason: "classical-ordered-voice-caller-authority-rejected",
          operations,
          rejectedAuthorityFields,
        });
      }
      if (
        !classicalNahuatlVncApplicationBuiltFrames.has(baseApplicationFrame)
        || !isClassicalNahuatlVncApplicationFrame(baseApplicationFrame)
      ) {
        return buildBlockedClassicalNahuatlOrderedVoiceVncApplicationFrame({
          blockReason: "canonical-issued-vnc-application-frame-required",
          operations,
        });
      }
      if (!operationsAreTyped) {
        return buildBlockedClassicalNahuatlOrderedVoiceVncApplicationFrame({
          blockReason: "classical-ordered-voice-operation-selection-required",
        });
      }
      const runtimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget();
      if (
        typeof runtimeTarget?.deriveClassicalNahuatlOrderedVoiceLayerChain !== "function"
        || typeof runtimeTarget?.isClassicalNahuatlOrderedVoiceLayerChain !== "function"
        || typeof runtimeTarget?.buildClassicalNahuatlVerbstemClassFrame !== "function"
        || typeof runtimeTarget?.buildClassicalNahuatlVncFiniteSurfaceFrame !== "function"
        || typeof runtimeTarget?.isClassicalNahuatlVncFiniteSurfaceFrame !== "function"
      ) {
        return buildBlockedClassicalNahuatlOrderedVoiceVncApplicationFrame({
          blockReason: "classical-ordered-voice-required-capabilities-unavailable",
          operations,
        });
      }
      const normalizedRequest = baseApplicationFrame.normalizedRequest;
      const sourceStem = normalizeClassicalNahuatlVncApplicationStem(
        normalizedRequest.sourceStem,
      );
      const baseVoiceOperation = normalizeClassicalNahuatlVncApplicationToken(
        baseApplicationFrame.resultFrame?.selectedVoiceOperation || "active",
      );
      if (
        baseVoiceOperation !== "active"
        && operations[0] !== baseVoiceOperation
      ) {
        return buildBlockedClassicalNahuatlOrderedVoiceVncApplicationFrame({
          blockReason: "classical-ordered-voice-base-operation-continuity-required",
          operations,
        });
      }
      const voiceLayerChainFrame =
        runtimeTarget.deriveClassicalNahuatlOrderedVoiceLayerChain(
          sourceStem,
          { operations },
        );
      if (
        !runtimeTarget.isClassicalNahuatlOrderedVoiceLayerChain(
          voiceLayerChainFrame,
          sourceStem,
        )
        || voiceLayerChainFrame.operations.length !== operations.length
        || voiceLayerChainFrame.operations.some(
          (operation, index) => operation !== operations[index],
        )
      ) {
        return buildBlockedClassicalNahuatlOrderedVoiceVncApplicationFrame({
          blockReason: voiceLayerChainFrame?.blockReason
            || "classical-ordered-voice-chain-not-authorized",
          operations,
        });
      }
      const finalVoiceOperation = normalizeClassicalNahuatlVncApplicationToken(
        voiceLayerChainFrame.finalLayerFrame?.operationId,
      );
      const derivedVerbClass = /(?:nonactive|passive)/u.test(finalVoiceOperation)
        ? "A"
        : normalizedRequest.verbClass;
      const targetRequest = Object.freeze({
        ...normalizedRequest,
        sourceStem: voiceLayerChainFrame.targetStem,
        subject: "3sg",
        verbClass: derivedVerbClass,
        sourceValence: "intransitive",
        objectKind: "none",
        objectPerson: "",
        sourceObjectRequests: Object.freeze([]),
        tlaFusion: false,
        sourceEmbedStem: "",
        sourceMatrixStem: "",
      });
      const targetMachineryFrame =
        runtimeTarget.buildClassicalNahuatlVerbstemClassFrame(
          voiceLayerChainFrame.targetStem,
          {
            ...buildClassicalNahuatlVncApplicationOptions(targetRequest),
            subject: "3sg",
            verbClass: derivedVerbClass,
            perfectiveClass: derivedVerbClass,
            requestedSourceValence: "intransitive",
            transitivity: "intransitive",
            valence: "intransitive",
            objectKind: "none",
            objectPerson: "",
            object: "",
            tlaFusion: false,
            embedStem: "",
            matrixStem: "",
            sourceEmbedStem: "",
            sourceMatrixStem: "",
          },
        );
      if (!isClassicalNahuatlVncApplicationActiveFrameAuthorized(targetMachineryFrame)) {
        return buildBlockedClassicalNahuatlOrderedVoiceVncApplicationFrame({
          blockReason: getClassicalNahuatlVncApplicationBlockReason(
            targetMachineryFrame,
            "classical-ordered-voice-target-machinery-not-authorized",
          ),
          operations,
        });
      }
      const selectedMachineryFrame =
        deepFreezeClassicalNahuatlVncApplicationValue({
          ...targetMachineryFrame,
          kind: "classical-nahuatl-ordered-voice-layer-vnc-machinery-frame",
          sourceStem,
          stem: voiceLayerChainFrame.targetStem,
          targetVoice: voiceLayerChainFrame.targetVoice,
          impersonalDepth: voiceLayerChainFrame.impersonalDepth,
          priorVncFrame:
            baseApplicationFrame.resultFrame?.activeMachineryFrame || null,
          voiceLayerChainFrame,
          typedFrameAuthority: true,
          callerSuppliedAuthorityAccepted: false,
          curriculumOrderAuthority: false,
          lessonMetadataAuthority: false,
          formulaStringAuthority: false,
          surfaceStringAuthority: false,
        });
      const finiteSurfaceFrame =
        runtimeTarget.buildClassicalNahuatlVncFiniteSurfaceFrame(
          selectedMachineryFrame,
        );
      if (
        runtimeTarget.isClassicalNahuatlVncFiniteSurfaceFrame(finiteSurfaceFrame)
          !== true
        || finiteSurfaceFrame.machineryFrame !== selectedMachineryFrame
        || !finiteSurfaceFrame.formulaRealization
        || !finiteSurfaceFrame.wordRealization
      ) {
        return buildBlockedClassicalNahuatlOrderedVoiceVncApplicationFrame({
          blockReason: "classical-ordered-voice-finite-surface-not-authorized",
          operations,
        });
      }
      const frame = deepFreezeClassicalNahuatlVncApplicationValue({
        kind: CLASSICAL_NAHUATL_ORDERED_VOICE_VNC_APPLICATION_KIND,
        version: CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,
        authorizationStatus: "authorized",
        blockReason: "",
        operations,
        rejectedAuthorityFields: Object.freeze([]),
        baseApplicationFrame,
        voiceLayerChainFrame,
        selectedMachineryFrame,
        finalTypedVncSlotFrame:
          getClassicalNahuatlVncApplicationFinalTypedFrame(
            selectedMachineryFrame,
          ),
        finiteSurfaceFrame,
        formulaRealization: finiteSurfaceFrame.formulaRealization,
        surfaceRealization: finiteSurfaceFrame.wordRealization,
        typedFrameAuthority: true,
        callerSuppliedAuthorityAccepted: false,
        curriculumOrderAuthority: false,
        lessonMetadataAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        displayTextAuthority: false,
      });
      classicalNahuatlOrderedVoiceVncApplicationFrames.add(frame);
      return frame;
    }
    function isClassicalNahuatlOrderedVoiceVncApplicationFrame(frame = null) {
      return Boolean(
        frame
        && classicalNahuatlOrderedVoiceVncApplicationFrames.has(frame)
        && frame.kind === CLASSICAL_NAHUATL_ORDERED_VOICE_VNC_APPLICATION_KIND
        && frame.version === CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION
        && frame.authorizationStatus === "authorized"
        && frame.blockReason === ""
        && classicalNahuatlVncApplicationBuiltFrames.has(
          frame.baseApplicationFrame,
        )
        && isClassicalNahuatlVncApplicationFrame(frame.baseApplicationFrame)
        && Array.isArray(frame.operations)
        && frame.operations.length > 0
        && typeof getClassicalNahuatlVncApplicationRuntimeTarget()
          ?.isClassicalNahuatlOrderedVoiceLayerChain === "function"
        && getClassicalNahuatlVncApplicationRuntimeTarget()
          .isClassicalNahuatlOrderedVoiceLayerChain(
            frame.voiceLayerChainFrame,
            frame.baseApplicationFrame.normalizedRequest.sourceStem,
          )
        && frame.operations.length === frame.voiceLayerChainFrame.operations.length
        && frame.operations.every(
          (operation, index) =>
            operation === frame.voiceLayerChainFrame.operations[index],
        )
        && frame.finiteSurfaceFrame?.machineryFrame
          === frame.selectedMachineryFrame
        && frame.formulaRealization
          === frame.finiteSurfaceFrame?.formulaRealization
        && frame.surfaceRealization
          === frame.finiteSurfaceFrame?.wordRealization
        && frame.finalTypedVncSlotFrame
          === getClassicalNahuatlVncApplicationFinalTypedFrame(
            frame.selectedMachineryFrame,
          )
        && frame.typedFrameAuthority === true
        && frame.callerSuppliedAuthorityAccepted === false
        && frame.curriculumOrderAuthority === false
        && frame.lessonMetadataAuthority === false
        && frame.formulaStringAuthority === false
        && frame.surfaceStringAuthority === false
        && frame.displayTextAuthority === false
        && Object.isFrozen(frame)
      );
    }
    function getClassicalNahuatlVncSentenceParticleDisplayText(particle = "") {
      const normalized = normalizeClassicalNahuatlVncApplicationToken(particle);
      return ({
        "ye-cuēl": "ye cuēl",
        "cuēl-eh": "cuēl eh",
        "ye-cuēl-eh": "ye cuēl eh",
        "nēn": "nēn"
      })[normalized] || normalized;
    }
    function orderClassicalNahuatlVncSentencePrefixalStack(prefixes = []) {
      const normalized = Array.isArray(prefixes)
        ? prefixes.map(normalizeClassicalNahuatlVncApplicationToken).filter(Boolean)
        : [];
      return [
        normalized.includes("ca#") ? "ca#" : normalized.includes("ay#") ? "ay#" : normalized.includes("ah#") ? "ah#" : "",
        normalized.includes("ō#") ? "ō#" : ""
      ].filter(Boolean);
    }
    function getClassicalNahuatlVncSentenceFormulaAttachment(
      sentenceSurfaceFrame = null
    ) {
      if (sentenceSurfaceFrame?.sentenceSurfaceApplies !== true) return "";
      const particles = Array.isArray(sentenceSurfaceFrame.sentenceParticles)
        ? sentenceSurfaceFrame.sentenceParticles
          .map(normalizeClassicalNahuatlVncApplicationToken)
          .filter(Boolean)
        : [];
      const prefixalStack = orderClassicalNahuatlVncSentencePrefixalStack(
        sentenceSurfaceFrame.sentencePrefixalStack
      );
      if (
        prefixalStack.includes("ō#")
        && prefixalStack.some(
          particle => particle === "ah#" || particle === "ay#" || particle === "ca#"
        )
      ) {
        return "prefixal-negative-plus-antecessive-stack-attached-at-left-edge";
      }
      if (prefixalStack.includes("ō#")) {
        return "antecessive-prefix-attached-at-left-edge";
      }
      if (
        prefixalStack.some(
          particle => particle === "ah#" || particle === "ay#" || particle === "ca#"
        )
        || particles.some(
          particle => particle === "ah#" || particle === "ay#" || particle === "ca#"
        )
      ) {
        return "prefixal-negative-attached-at-left-edge";
      }
      if (particles.length) {
        return "sentence-left-particles-space-separated";
      }
      return "single-vnc-formula-as-sentence";
    }
    function buildClassicalNahuatlVncSentenceFormulaRealization(sentenceSurfaceFrame = null, nuclearFormula = "") {
      const baseFormula = normalizeClassicalNahuatlVncApplicationToken(nuclearFormula);
      if (!baseFormula) return "";
      if (sentenceSurfaceFrame?.sentenceSurfaceApplies !== true) return baseFormula;
      const particles = Array.isArray(sentenceSurfaceFrame.sentenceParticles)
        ? sentenceSurfaceFrame.sentenceParticles.map(normalizeClassicalNahuatlVncApplicationToken).filter(Boolean)
        : [];
      const explicitPrefixalStack = orderClassicalNahuatlVncSentencePrefixalStack(
        sentenceSurfaceFrame.sentencePrefixalStack
      );
      const prefixalStack = explicitPrefixalStack.length
        ? explicitPrefixalStack
        : orderClassicalNahuatlVncSentencePrefixalStack(particles);
      const sentenceLeftParticles = particles.filter(
        particle => !["ah#", "ay#", "ca#", "ō#"].includes(particle)
      );
      const formulaWithPrefixalStack = prefixalStack.length
        ? `${prefixalStack.join("")}${baseFormula.startsWith("#") ? baseFormula.slice(1) : baseFormula}`
        : baseFormula;
      const sentenceLeft = sentenceLeftParticles.length
        ? `${sentenceLeftParticles.map(getClassicalNahuatlVncSentenceParticleDisplayText).join(" ")} `
        : "";
      const punctuation = normalizeClassicalNahuatlVncApplicationToken(
        sentenceSurfaceFrame.finalPunctuation
      );
      return `${sentenceLeft}${formulaWithPrefixalStack}${punctuation}`;
    }
    function buildClassicalNahuatlVncSentenceSurfaceRealization(sentenceSurfaceFrame = null, nuclearSurface = "") {
      const baseSurface = normalizeClassicalNahuatlVncApplicationToken(nuclearSurface);
      if (!baseSurface) return "";
      if (sentenceSurfaceFrame?.sentenceSurfaceApplies !== true) return baseSurface;
      const baseSurfaceLower = `${baseSurface.charAt(0).toLowerCase()}${baseSurface.slice(1)}`;
      const particles = Array.isArray(sentenceSurfaceFrame.sentenceParticles)
        ? sentenceSurfaceFrame.sentenceParticles.map(normalizeClassicalNahuatlVncApplicationToken).filter(Boolean)
        : [];
      const explicitPrefixalStack = orderClassicalNahuatlVncSentencePrefixalStack(
        sentenceSurfaceFrame.sentencePrefixalStack
      );
      const punctuation = normalizeClassicalNahuatlVncApplicationToken(
        sentenceSurfaceFrame.finalPunctuation
      );
      const capitalize = value => value
        ? `${value.charAt(0).toUpperCase()}${value.slice(1)}`
        : "";
      const prefixalSurface = explicitPrefixalStack.map(particle => ({
        "ō#": "ō",
        "ca#": "ca",
        "ah#": "ah",
        "ay#": "ay"
      })[particle] || "").join("");
      if (!particles.length) {
        return `${capitalize(`${prefixalSurface}${baseSurfaceLower}`)}${punctuation}`;
      }
      const prefixWords = [];
      let attachedPrefixes = prefixalSurface;
      particles.forEach(particle => {
        if (particle === "cuix" || particle === "cuix?") {
          prefixWords.push("cuix");
        } else if (particle === "ca") {
          prefixWords.push("ca");
        } else if (particle === "mā" || particle === "ma") {
          prefixWords.push("mā");
        } else if (particle === "tlā" || particle === "tla") {
          prefixWords.push("tlā");
        } else if (particle === "quēn" || particle === "mach") {
          prefixWords.push(particle);
        } else if (particle === "ihyo" || particle === "ye") {
          prefixWords.push(particle);
        } else if (["cuēl", "ye-cuēl", "cuēl-eh", "ye-cuēl-eh", "tēl", "quin"].includes(particle)) {
          prefixWords.push(getClassicalNahuatlVncSentenceParticleDisplayText(particle));
        } else if (particle === "nēn" || particle === "nen") {
          prefixWords.push("nēn");
        } else if (!explicitPrefixalStack.length && ["ah#", "ay#", "ca#"].includes(particle)) {
          attachedPrefixes = particle === "ca#" ? "ca" : particle === "ay#" ? "ay" : "ah";
        }
      });
      const nuclearWithAttachedPrefixes = attachedPrefixes
        ? `${attachedPrefixes}${baseSurfaceLower}`
        : baseSurfaceLower;
      const sentence = prefixWords.length
        ? `${prefixWords.join(" ")} ${nuclearWithAttachedPrefixes}`
        : nuclearWithAttachedPrefixes;
      return `${capitalize(sentence)}${punctuation}`;
    }
    function getClassicalNahuatlVncSentenceSurfaceFrameFromMachinery(
      machineryFrame = null
    ) {
      return machineryFrame?.sentenceSurfaceFrame
        || machineryFrame?.proofFrame?.conclusion?.sentenceSurfaceFrame
        || null;
    }
    function getClassicalNahuatlVncSentenceResultSource(sourceFrame = null) {
      if (isClassicalNahuatlOrderedVoiceVncApplicationFrame(sourceFrame)) {
        return {
          sourceKind: CLASSICAL_NAHUATL_ORDERED_VOICE_VNC_APPLICATION_KIND,
          canonicalSourceFrame: sourceFrame,
          canonicalResultFrame: sourceFrame,
          vncApplicationFrame: null,
          vncApplicationResultFrame: null,
          orderedVoiceApplicationFrame: sourceFrame,
          lateOperationClosureFrame: null,
          selectedMachineryFrame: sourceFrame.selectedMachineryFrame,
          nuclearFormula: normalizeClassicalNahuatlVncApplicationToken(
            sourceFrame.formulaRealization
          ),
          nuclearSurface: normalizeClassicalNahuatlVncApplicationToken(
            sourceFrame.surfaceRealization
          )
        };
      }
      if (isClassicalNahuatlVncApplicationFrame(sourceFrame)) {
        return {
          sourceKind: "classical-nahuatl-vnc-application-frame",
          canonicalSourceFrame: sourceFrame,
          canonicalResultFrame: sourceFrame.resultFrame,
          vncApplicationFrame: sourceFrame,
          vncApplicationResultFrame: sourceFrame.resultFrame,
          orderedVoiceApplicationFrame: null,
          lateOperationClosureFrame: null,
          selectedMachineryFrame: sourceFrame.resultFrame?.selectedMachineryFrame || null,
          nuclearFormula: normalizeClassicalNahuatlVncApplicationToken(
            sourceFrame.resultFrame?.formulaRealization
          ),
          nuclearSurface: normalizeClassicalNahuatlVncApplicationToken(
            sourceFrame.resultFrame?.surfaceRealization
          )
        };
      }
      const runtimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget();
      if (
        sourceFrame?.authorizationStatus === "authorized"
        && typeof runtimeTarget?.isClassicalNahuatlClosureFrame
          === "function"
        && runtimeTarget.isClassicalNahuatlClosureFrame(
          sourceFrame
        )
      ) {
        return {
          sourceKind: "classical-nahuatl-late-vnc-derivation-closure-frame",
          canonicalSourceFrame: sourceFrame,
          canonicalResultFrame: sourceFrame,
          vncApplicationFrame: null,
          vncApplicationResultFrame: null,
          orderedVoiceApplicationFrame: null,
          lateOperationClosureFrame: sourceFrame,
          selectedMachineryFrame: sourceFrame.selectedMachineryFrame || null,
          nuclearFormula: normalizeClassicalNahuatlVncApplicationToken(
            sourceFrame.formulaRealization
          ),
          nuclearSurface: normalizeClassicalNahuatlVncApplicationToken(
            sourceFrame.surfaceRealization
          )
        };
      }
      return null;
    }
    function buildClassicalNahuatlVncSentenceResultFrame(sourceFrame = null) {
      const canonicalSource = getClassicalNahuatlVncSentenceResultSource(
        sourceFrame
      );
      const sentenceSurfaceFrame = canonicalSource
        ? getClassicalNahuatlVncSentenceSurfaceFrameFromMachinery(
          canonicalSource.selectedMachineryFrame
        )
        : null;
      const sentenceRequested = sentenceSurfaceFrame?.sentenceSurfaceApplies === true;
      const sentenceAuthorized = !sentenceRequested
        || sentenceSurfaceFrame?.authorizationStatus === "authorized";
      const nuclearFormula = canonicalSource?.nuclearFormula || "";
      const nuclearSurface = canonicalSource?.nuclearSurface || "";
      const sentenceFormulaDisplay = canonicalSource && sentenceAuthorized
        ? buildClassicalNahuatlVncSentenceFormulaRealization(sentenceSurfaceFrame, nuclearFormula)
        : "";
      const sentenceSurfaceDisplay = canonicalSource && sentenceAuthorized
        ? buildClassicalNahuatlVncSentenceSurfaceRealization(sentenceSurfaceFrame, nuclearSurface)
        : "";
      const authorizationStatus = canonicalSource
        && sentenceAuthorized
        && Boolean(nuclearFormula)
        && Boolean(nuclearSurface)
        && Boolean(sentenceFormulaDisplay)
        && Boolean(sentenceSurfaceDisplay)
        ? "authorized"
        : "blocked";
      const frame = Object.freeze({
        kind: "classical-nahuatl-vnc-sentence-result-frame",
        version: CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,
        authorizationStatus,
        blockReason: authorizationStatus === "authorized"
          ? ""
          : !canonicalSource
            ? "canonical-vnc-application-frame-required"
            : !sentenceAuthorized
              ? sentenceSurfaceFrame?.blockReason || "canonical-vnc-sentence-surface-frame-not-authorized"
              : "canonical-vnc-finite-sentence-result-required",
        nuclearClauseKind: "vnc",
        canonicalSourceKind: authorizationStatus === "authorized"
          ? canonicalSource.sourceKind
          : "",
        canonicalSourceFrame: authorizationStatus === "authorized"
          ? canonicalSource.canonicalSourceFrame
          : null,
        canonicalResultFrame: authorizationStatus === "authorized"
          ? canonicalSource.canonicalResultFrame
          : null,
        vncApplicationFrame: authorizationStatus === "authorized"
          ? canonicalSource.vncApplicationFrame
          : null,
        vncApplicationResultFrame: authorizationStatus === "authorized"
          ? canonicalSource.vncApplicationResultFrame
          : null,
        orderedVoiceApplicationFrame: authorizationStatus === "authorized"
          ? canonicalSource.orderedVoiceApplicationFrame
          : null,
        lateOperationClosureFrame: authorizationStatus === "authorized"
          ? canonicalSource.lateOperationClosureFrame
          : null,
        sentenceSurfaceFrame: authorizationStatus === "authorized" ? sentenceSurfaceFrame : null,
        consumedNuclearFormula: authorizationStatus === "authorized" ? nuclearFormula : "",
        consumedNuclearSurface: authorizationStatus === "authorized" ? nuclearSurface : "",
        sentenceFormulaDisplay: authorizationStatus === "authorized" ? sentenceFormulaDisplay : "",
        sentenceSurfaceDisplay: authorizationStatus === "authorized" ? sentenceSurfaceDisplay : "",
        sentenceFormulaAttachment: authorizationStatus === "authorized"
          ? getClassicalNahuatlVncSentenceFormulaAttachment(
            sentenceSurfaceFrame
          )
          : "",
        sentenceFormulaInitialCapitalization: sentenceRequested
          ? "syntactic-sentence-initial"
          : "preserve",
        sentenceSurfaceInitialCapitalization: sentenceRequested
          ? "syntactic-sentence-initial"
          : "preserve",
        typedFrameAuthority: true,
        callerSuppliedAuthorityAccepted: false,
        curriculumOrderAuthority: false,
        lessonMetadataAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        displayStringsAreAuthority: false
      });
      if (authorizationStatus === "authorized") {
        classicalNahuatlVncApplicationIssuedSentenceResultFrames.add(frame);
      }
      return frame;
    }
    function isClassicalNahuatlVncSentenceResultFrame(frame = null) {
      const canonicalSource = frame
        ? getClassicalNahuatlVncSentenceResultSource(frame.canonicalSourceFrame)
        : null;
      if (!frame
        || !classicalNahuatlVncApplicationIssuedSentenceResultFrames.has(frame)
        || frame.kind !== "classical-nahuatl-vnc-sentence-result-frame"
        || frame.version !== CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION
        || frame.authorizationStatus !== "authorized"
        || frame.typedFrameAuthority !== true
        || frame.callerSuppliedAuthorityAccepted !== false
        || frame.curriculumOrderAuthority !== false
        || frame.lessonMetadataAuthority !== false
        || frame.formulaStringAuthority !== false
        || frame.surfaceStringAuthority !== false
        || frame.displayStringsAreAuthority !== false
        || !canonicalSource
        || frame.canonicalSourceKind !== canonicalSource.sourceKind
        || frame.canonicalSourceFrame !== canonicalSource.canonicalSourceFrame
        || frame.canonicalResultFrame !== canonicalSource.canonicalResultFrame
        || frame.vncApplicationFrame !== canonicalSource.vncApplicationFrame
        || frame.vncApplicationResultFrame
          !== canonicalSource.vncApplicationResultFrame
        || frame.orderedVoiceApplicationFrame
          !== canonicalSource.orderedVoiceApplicationFrame
        || frame.lateOperationClosureFrame
          !== canonicalSource.lateOperationClosureFrame
        || frame.sentenceSurfaceFrame
          !== getClassicalNahuatlVncSentenceSurfaceFrameFromMachinery(
            canonicalSource.selectedMachineryFrame
          )) {
        return false;
      }
      return frame.consumedNuclearFormula === canonicalSource.nuclearFormula
        && frame.consumedNuclearSurface === canonicalSource.nuclearSurface
        && frame.sentenceFormulaDisplay === buildClassicalNahuatlVncSentenceFormulaRealization(
          frame.sentenceSurfaceFrame,
          frame.consumedNuclearFormula
        )
        && frame.sentenceSurfaceDisplay === buildClassicalNahuatlVncSentenceSurfaceRealization(
          frame.sentenceSurfaceFrame,
          frame.consumedNuclearSurface
        )
        && frame.sentenceFormulaAttachment
          === getClassicalNahuatlVncSentenceFormulaAttachment(
            frame.sentenceSurfaceFrame
          );
    }
    function getClassicalNahuatlWidowhoodCompoundContext(sentenceResult = null) {
      if (!isClassicalNahuatlVncSentenceResultFrame(sentenceResult)) return null;
      const request = sentenceResult.vncApplicationFrame?.normalizedRequest || {};
      const sourceStem = normalizeClassicalNahuatlVncApplicationStem(
        request.sourceStem,
      ).replace(/[-\s]/gu, "");
      const canonicalRealization = normalizeClassicalNahuatlVncApplicationToken(
        sentenceResult.sentenceSurfaceDisplay,
      ).replace(/[.!?]+$/u, "").replace(/^./u, value => value.toLowerCase());
      const prefixalStack = sentenceResult.sentenceSurfaceFrame?.sentencePrefixalStack || [];
      return {
        request,
        sourceStem,
        canonicalRealization,
        prefixalStack,
        valid: sourceStem === "cihuāmiqui"
          && request.subject === "1sg"
          && request.mood === "indicative"
          && request.tense === "preterit"
          && prefixalStack.includes("ō#")
          && canonicalRealization === "ōnicihuāmic",
      };
    }
    function buildClassicalNahuatlWidowhoodCompoundInterpretationSource(
      sentenceResult = null,
    ) {
      const context = getClassicalNahuatlWidowhoodCompoundContext(sentenceResult);
      const source = Object.freeze({
        kind: "classical-nahuatl-widowhood-compound-interpretation-source",
        version: 1,
        authorizationStatus: context?.valid ? "authorized" : "blocked",
        blockReason: context?.valid ? "" : "canonical-onicihuamic-sentence-result-required",
        sentenceResult: context?.valid ? sentenceResult : null,
        sourceStem: context?.valid ? context.sourceStem : "",
        canonicalRealization: context?.valid ? context.canonicalRealization : "",
        subject: context?.valid ? context.request.subject : "",
        tense: context?.valid ? context.request.tense : "",
        translationAuthority: false,
        surfaceStringAuthority: false,
        callerSuppliedAuthorityAccepted: false,
      });
      classicalNahuatlWidowhoodInterpretationSources.add(source);
      return source;
    }
    function isClassicalNahuatlWidowhoodCompoundInterpretationSource(source = null) {
      const context = source?.sentenceResult
        ? getClassicalNahuatlWidowhoodCompoundContext(source.sentenceResult)
        : null;
      return Boolean(
        source
        && classicalNahuatlWidowhoodInterpretationSources.has(source)
        && source.kind === "classical-nahuatl-widowhood-compound-interpretation-source"
        && source.version === 1
        && source.authorizationStatus === "authorized"
        && source.blockReason === ""
        && context?.valid
        && source.sourceStem === context.sourceStem
        && source.canonicalRealization === context.canonicalRealization
        && source.subject === "1sg"
        && source.tense === "preterit"
        && source.translationAuthority === false
        && source.surfaceStringAuthority === false
        && source.callerSuppliedAuthorityAccepted === false
        && Object.isFrozen(source)
      );
    }
    function evaluateClassicalNahuatlWidowhoodCompoundInterpretation(source = null) {
      const authorized = isClassicalNahuatlWidowhoodCompoundInterpretationSource(source);
      const result = Object.freeze({
        kind: "classical-nahuatl-widowhood-compound-interpretation-result",
        version: 1,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized ? "" : "owner-issued-widowhood-compound-source-required",
        semanticOwnerId: "classical-incorporated-adverb-supplement-subject",
        operationId: "classical.vnc.compound.widowhood.interpret",
        canonicalRealization: authorized ? source.canonicalRealization : "",
        lexicalMeaning: authorized ? "become-a-widower" : "",
        literalStructure: authorized ? Object.freeze([
          "already",
          "first-person-singular-human-male-subject",
          "wife-or-woman",
          "die-perfective",
        ]) : Object.freeze([]),
        subjectInterpretation: authorized ? Object.freeze({
          person: "first",
          number: "singular",
          humanness: "human",
          sex: "male",
          role: "widower-experiencer",
          subjectPrefix: "ni-",
        }) : Object.freeze({}),
        explanatoryParaphrases: authorized ? Object.freeze([
          "die-in-the-form-of-my-wife",
          "die-in-regard-to-my-wife",
          "die-by-means-of-my-wife",
          "die-because-of-my-wife",
          "die-in-relation-to-my-wife",
        ]) : Object.freeze([]),
        paraphraseAuthority: false,
        paraphrasesExhaustive: false,
        englishAnalogueAuthority: false,
        grammarSourceSections: authorized ? Object.freeze(["1.13", "30.14.1"]) : Object.freeze([]),
        ownerExecutionCompleted: authorized,
        grammarGenerationAllowed: false,
        surfaceGenerationAllowed: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        translationAuthority: false,
        callerSuppliedAuthorityAccepted: false,
      });
      if (authorized) classicalNahuatlWidowhoodInterpretationResults.add(result);
      return result;
    }
    function isClassicalNahuatlWidowhoodCompoundInterpretationResult(result = null) {
      return Boolean(
        result
        && classicalNahuatlWidowhoodInterpretationResults.has(result)
        && result.kind === "classical-nahuatl-widowhood-compound-interpretation-result"
        && result.version === 1
        && result.authorizationStatus === "authorized"
        && result.semanticOwnerId === "classical-incorporated-adverb-supplement-subject"
        && result.operationId === "classical.vnc.compound.widowhood.interpret"
        && result.canonicalRealization === "ōnicihuāmic"
        && result.lexicalMeaning === "become-a-widower"
        && result.subjectInterpretation?.subjectPrefix === "ni-"
        && result.paraphraseAuthority === false
        && result.paraphrasesExhaustive === false
        && result.englishAnalogueAuthority === false
        && result.ownerExecutionCompleted === true
        && result.translationAuthority === false
        && result.callerSuppliedAuthorityAccepted === false
        && Object.isFrozen(result)
      );
    }
    function freezeClassicalNahuatlVncApplicationProjectionValue(value) {
      if (Array.isArray(value)) {
        return Object.freeze(value.map(freezeClassicalNahuatlVncApplicationProjectionValue));
      }
      if (!value || typeof value !== "object") {
        return value;
      }
      return Object.freeze(Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, freezeClassicalNahuatlVncApplicationProjectionValue(entry)])));
    }
    function getClassicalNahuatlVncApplicationSubjectCarrier(typedFrame = null) {
      const subject = typedFrame?.slots?.subject || {};
      const number = typedFrame?.slots?.number || {};
      const pers1 = normalizeClassicalNahuatlVncApplicationToken(subject.pers1 || "0");
      const pers2 = normalizeClassicalNahuatlVncApplicationToken(subject.pers2 || "0");
      const num1 = normalizeClassicalNahuatlVncApplicationToken(number.num1 || "0");
      const num2 = normalizeClassicalNahuatlVncApplicationToken(number.num2 || "0");
      return `${pers1 || "0"}-${pers2 || "0"}…${num1 || "0"}-${num2 || "0"}`;
    }
    function describeClassicalNahuatlVncApplicationObject(request = {}) {
      const objectKind = normalizeClassicalNahuatlVncApplicationToken(request.objectKind);
      const objectPerson = normalizeClassicalNahuatlVncApplicationToken(request.objectPerson);
      if (objectKind === "specific-projective") {
        return `${objectPerson || "unspecified"} specific object`;
      }
      return {
        reflexive: "reflexive object",
        "nonspecific-human": "nonspecific human object",
        "nonspecific-nonhuman": "nonspecific nonhuman object"
      }[objectKind] || "typed object";
    }
    function buildClassicalNahuatlVncDerivationProcedureProjection(selectedOption = {}, derivationType = "") {
      const construction = selectedOption.targetConstruction || {};
      const operation = normalizeClassicalNahuatlVncApplicationToken(construction.baseOperation || construction.operation || selectedOption.procedure || "");
      const preferredProcedure = normalizeClassicalNahuatlVncApplicationToken(selectedOption.preferredProcedure || "");
      const subtype = normalizeClassicalNahuatlVncApplicationToken(selectedOption.derivationSubtype || "");
      const stemRelation = normalizeClassicalNahuatlVncApplicationToken(selectedOption.stemRelation || "");
      let procedureType = "typed-formation";
      let label = "Typed formation";
      let explanation = "The selected Andrews formation supplies the typed source-to-target operation.";
      if (stemRelation === "surface-identical-morphological-replacement") {
        procedureType = stemRelation;
        label = "Morphological replacement · stem unchanged";
        explanation = "The signed causative operation replaces the source-final formative even though the resulting stem has the same surface spelling.";
      } else if (stemRelation === "surface-identical-valence-addition") {
        procedureType = stemRelation;
        label = "Valence addition · stem unchanged";
        explanation = "The signed applicative operation adds a participant and changes Valence without changing the stem spelling.";
      } else if (preferredProcedure === "addition") {
        procedureType = "addition";
        label = "Addition";
        explanation = "The derivational material is added while the selected source base is retained.";
      } else if (preferredProcedure === "replacement") {
        procedureType = "replacement";
        label = "Replacement";
        explanation = "Part of the selected source base is replaced by the derivational material.";
      } else if (operation.includes("supplet")) {
        procedureType = "suppletion";
        label = "Suppletion";
        explanation = "A separately licensed base replaces the ordinary source base before the derivation is completed.";
      } else if (operation === "identity-stem-with-valence-increase") {
        procedureType = "valence-addition-without-stem-change";
        label = "Valence addition · stem unchanged";
        explanation = "The applicative participant is added without replacing or suffixing the source stem.";
      } else if (operation === "defuse-tla-and-increase-valence") {
        procedureType = "valence-addition-with-tla-defusion";
        label = "Valence addition · tla defusion";
        explanation = "The applicative participant is added while fused tla is restored as an object carrier outside the stem.";
      } else if (operation.includes("nonactive") || operation === "typed-nonactive-bridge") {
        procedureType = operation.includes("replace") ? "nonactive-base-replacement" : "nonactive-base-formation";
        label = operation.includes("replace") ? "Nonactive-base replacement" : "Nonactive-base formation";
        explanation = operation.includes("replace")
          ? "A typed nonactive base supplies the formation base, and its ending is replaced by the derivational material."
          : "A typed nonactive base supplies the formation base used by the derivational suffix.";
      } else if (operation.includes("recover") && operation.includes("append")) {
        procedureType = "base-recovery-and-addition";
        label = "Base recovery + addition";
        explanation = "The licensed underlying base is recovered and the derivational material is then added.";
      } else if (operation === "typed-o-a-to-huia") {
        procedureType = "replacement";
        label = "Replacement";
        explanation = "The inherited o-a ending is replaced by the applicative huiā formation.";
      } else if (operation.includes("replace") && (operation.includes("append") || derivationType === "applicative" && subtype === "type-one")) {
        procedureType = "replacement-and-addition";
        label = "Replacement + addition";
        explanation = "A replacive base is formed first, then the derivational suffix is added to that base.";
      } else if (operation.includes("append") || operation.includes("add")) {
        procedureType = "addition";
        label = "Addition";
        explanation = "The derivational material is added while the selected source base is retained.";
      } else if (operation.includes("replace") || operation.includes("replacive")) {
        procedureType = "replacement";
        label = "Replacement";
        explanation = "Part of the selected source base is replaced by the derivational material.";
      } else if (operation.includes("recover") && construction.add) {
        procedureType = "base-recovery-and-addition";
        label = "Base recovery + addition";
        explanation = "The licensed underlying base is recovered and the derivational material is then added.";
      } else if (operation.includes("consume-prior")) {
        procedureType = "history-based-replacement";
        label = "History-based replacement";
        explanation = "The prior Andrews formation history identifies the ending replaced by the new derivational material.";
      } else if (operation.includes("recover")) {
        procedureType = "history-based-formation";
        label = "History-based formation";
        explanation = "The selected Andrews history determines the base used for the derived stem.";
      } else if (construction.remove && construction.add) {
        procedureType = "replacement";
        label = "Replacement";
        explanation = "Part of the selected source base is replaced by the derivational material.";
      } else if (construction.add) {
        procedureType = "addition";
        label = "Addition";
        explanation = "The derivational material is added while the selected source base is retained.";
      }
      return {
        frameRole: "classical-nahuatl-vnc-derivation-procedure-projection",
        procedureType,
        stemRelation,
        label,
        explanation,
        source: "Andrews English formation description",
        grammarAuthority: false
      };
    }
    function buildClassicalNahuatlVncSourceAnalysisDisplayProjection(analysis = {}) {
      const category = normalizeClassicalNahuatlVncApplicationToken(analysis.category || "");
      const destockal = category.includes("destockal");
      const rootPlusYa = category.includes("root-plus-ya");
      const denominalTi = category === "denominal-ti-candidate";
      const hiddenNonactive = category.includes("hidden-nonactive");
      const suppletive = category.includes("suppletive");
      const labels = {
        "destockal-i-a-o-hui": "Destockal vowel + hui analysis",
        "destockal-long-vowel-hua": "Destockal long-vowel + hua analysis",
        "destockal-ni-candidate": "Destockal ni analysis",
        "destockal-hui-candidate": "Destockal hui analysis",
        "fused-destockal-ni-exact": "Fused destockal ni analysis",
        "fused-destockal-hui-exact": "Fused destockal hui analysis",
        "fused-destockal-final-i": "Fused final-i analysis",
        "root-plus-ya": "Root + ya analysis",
        "root-plus-ya-retentive-exception": "Root + ya documented exception",
        "denominal-ti-candidate": "Nominal base + ti analysis",
        "hidden-nonactive-o-hua": "Hidden o-hua nonactive base",
        "hidden-nonactive-lo": "Hidden lō nonactive base",
        "type-one-consonant-alternation": "Type 1 consonant alternation",
        "type-two-consonant-alternation": "Type 2 consonant alternation",
        "suppletive-causative-source": "Suppletive causative source",
        "directional-suppletive-causative-source": "Directional suppletive source"
      };
      const formationEffects = {
        "destockal-i-a-o-hui": "Makes the Andrews destockal replacement routes available.",
        "destockal-long-vowel-hua": "Makes the Andrews destockal replacement route available while preserving the licensed vowel quantity.",
        "destockal-ni-candidate": "Makes the Andrews destockal replacement or addition procedures available.",
        "destockal-hui-candidate": "Makes the Andrews destockal replacement or addition procedures available.",
        "fused-destockal-ni-exact": "Recovers the witnessed root, stock formative, and ni theme before replacement or addition.",
        "fused-destockal-hui-exact": "Recovers the witnessed root, stock formative, and hui theme before addition.",
        "fused-destockal-final-i": "Identifies the final-i base used by the available Type 1 formation.",
        "root-plus-ya": "Allows Andrews to replace ya, or remove it before adding liā.",
        "root-plus-ya-retentive-exception": "Selects the documented exception that retains y and replaces the source-final a.",
        "denominal-ti-candidate": "Allows liā to be added to the complete denominal ti stem.",
        "hidden-nonactive-o-hua": "Supplies the hidden o-hua base whose ending is replaced by tiā.",
        "hidden-nonactive-lo": "Supplies the hidden lō base whose ending is replaced by tiā.",
        "type-one-consonant-alternation": "Allows the documented consonant replacement before causative a.",
        "type-two-consonant-alternation": "Allows the documented consonant alternation before tiā.",
        "suppletive-causative-source": "Requires the separately licensed suppletive causative base.",
        "directional-suppletive-causative-source": "Preserves the licensed directional element in the suppletive causative formation."
      };
      const segments = Array.isArray(analysis.segments) ? analysis.segments : [];
      const parts = segments.map((segment, index) => {
        let role = index === 0 ? "source base" : "source segment";
        if (destockal) {
          role = index === 0 ? "root" : index === segments.length - 1 ? "stem formative" : "stock formative";
        } else if (rootPlusYa) {
          role = index === 0 ? "root" : "ya stem formative";
        } else if (denominalTi) {
          role = index === 0 ? "nominal base" : "denominal ti formative";
        } else if (hiddenNonactive) {
          role = index === 0 ? "active base" : "source-final segment";
        } else if (suppletive) {
          role = index === 0 ? "suppletive source base" : "suppletive source segment";
        } else if (index === segments.length - 1 && analysis.stemFormative) {
          role = "stem-final formative";
        }
        return { segment, role };
      });
      return {
        label: labels[category] || "Andrews source analysis",
        parts,
        formationEffect: formationEffects[category] || "Identifies the source structure required by the selected Andrews formation."
      };
    }
    function groupClassicalNahuatlVncSourceAnalysisDisplayRows(rows = []) {
      const groups = new Map();
      rows.forEach(row => {
        const key = JSON.stringify((row.segments || []).map(segment => normalizeClassicalNahuatlVncApplicationStem(segment)));
        const existing = groups.get(key);
        if (!existing) {
          groups.set(key, {
            parts: row.display?.parts || [],
            readings: [row.display?.label || "Andrews source analysis"],
            formationEffects: [row.display?.formationEffect || ""].filter(Boolean),
            andrewsSections: [...(row.andrewsSections || [])],
            selectedForFormation: row.selectedForFormation === true
          });
          return;
        }
        if (row.selectedForFormation === true) existing.selectedForFormation = true;
        if (!existing.readings.includes(row.display?.label)) existing.readings.push(row.display?.label || "Andrews source analysis");
        if (row.display?.formationEffect && !existing.formationEffects.includes(row.display.formationEffect)) existing.formationEffects.push(row.display.formationEffect);
        (row.andrewsSections || []).forEach(section => {
          if (!existing.andrewsSections.includes(section)) existing.andrewsSections.push(section);
        });
      });
      return [...groups.values()];
    }
    function buildClassicalNahuatlVncCompactSourceAnalysisDisplayProjection(groups = []) {
      const group = groups.find(candidate => candidate.selectedForFormation === true) || groups[0] || null;
      if (!group || !Array.isArray(group.parts) || !group.parts.length) return null;
      const sections = Array.from(new Set(group.andrewsSections || []));
      return {
        label: "Andrews source-stem analysis",
        parts: group.parts.map(part => ({ segment: part.segment, role: part.role })),
        process: "The internal roles come from the typed Andrews source; entered hyphens only help reading.",
        source: sections.length ? `Andrews §§${sections.join(", ")}` : "Andrews source morphology",
        grammarAuthority: false
      };
    }
    function buildClassicalNahuatlVncSourceConstitutionProjection(request = {}, dependencies = null) {
      const dependencySource = dependencies && typeof dependencies === "object" ? dependencies : getClassicalNahuatlVncApplicationRuntimeTarget();
      const normalizedRequest = normalizeClassicalNahuatlVncApplicationRequest(request);
      if (!normalizedRequest.sourceStem
        || typeof dependencySource?.buildClassicalNahuatlVerbstemClassFrame !== "function"
        || typeof dependencySource?.buildClassicalNahuatlVncDerivationSourceAnalysisFrame !== "function"
        || typeof dependencySource?.isClassicalNahuatlVncDerivationSourceAnalysisFrame !== "function") {
        return null;
      }
      const sourceMachineryFrame =
        buildClassicalNahuatlVncApplicationSourceMachinery(
          dependencySource,
          buildClassicalNahuatlVncApplicationDerivationSourceRequest(
            normalizedRequest,
          ),
        );
      const sourceAnalysisFrame = dependencySource.buildClassicalNahuatlVncDerivationSourceAnalysisFrame(sourceMachineryFrame);
      if (!dependencySource.isClassicalNahuatlVncDerivationSourceAnalysisFrame(sourceAnalysisFrame)) {
        return null;
      }
      const rows = (sourceAnalysisFrame.analyses || []).map(analysis => ({
        segments: analysis.segments || [],
        andrewsSections: analysis.andrewsSections || [],
        selectedForFormation: false,
        display: buildClassicalNahuatlVncSourceAnalysisDisplayProjection(analysis)
      }));
      const compactDisplay = buildClassicalNahuatlVncCompactSourceAnalysisDisplayProjection(
        groupClassicalNahuatlVncSourceAnalysisDisplayRows(rows)
      );
      if (!compactDisplay) return null;
      return deepFreezeClassicalNahuatlVncApplicationValue({
        frameRole: "classical-nahuatl-vnc-source-constitution-projection",
        authorizationStatus: "authorized",
        sourceStem: sourceAnalysisFrame.sourceStem,
        sourceLexemeId: sourceAnalysisFrame.sourceLexemeId || "",
        sourceClass: sourceAnalysisFrame.sourceClass,
        sourceValence: sourceAnalysisFrame.sourceValence,
        label: compactDisplay.label,
        parts: compactDisplay.parts,
        process: compactDisplay.process,
        source: compactDisplay.source,
        grammarAuthority: false
      });
    }
    function buildClassicalNahuatlVncDerivedStemAnalysisDisplayProjection({
      selectedOption = {},
      derivationType = "",
      sourceAnalysisDisplayGroups = [],
      bridgeRecord = null,
      targetStem = ""
    } = {}) {
      const normalizedDerivationType = normalizeClassicalNahuatlVncApplicationToken(derivationType);
      if (!["causative", "applicative"].includes(normalizedDerivationType)) {
        return null;
      }
      const construction = selectedOption.targetConstruction || {};
      const subtype = normalizeClassicalNahuatlVncApplicationToken(selectedOption.derivationSubtype || selectedOption.subtype || "");
      const addition = normalizeClassicalNahuatlVncApplicationStem(selectedOption.suffix || construction.add || "");
      const normalizedTarget = normalizeClassicalNahuatlVncApplicationStem(targetStem || selectedOption.targetStem || "");
      const selectedSourceGroup = sourceAnalysisDisplayGroups.find(group => group.selectedForFormation === true)
        || sourceAnalysisDisplayGroups[0]
        || null;
      const sourceParts = Array.isArray(selectedSourceGroup?.parts) ? selectedSourceGroup.parts : [];
      const fold = value => normalizeClassicalNahuatlVncApplicationStem(value).replace(/-/gu, "");
      const sourcePartsFolded = fold(sourceParts.map(part => part.segment).join(""));
      const removeTypedAddition = value => {
        if (!addition || !value.endsWith(addition)) return "";
        return value.slice(0, -addition.length).replace(/-+$/gu, "");
      };
      const targetBase = removeTypedAddition(normalizedTarget);
      const copySourcePartsWhenExact = expectedBase => (
        sourceParts.length && sourcePartsFolded === fold(expectedBase)
          ? sourceParts.map(part => ({ segment: part.segment, role: part.role }))
          : [{ segment: expectedBase, role: "typed source base" }]
      );
      const copySourcePartsAfterFinalIRemoval = expectedBase => {
        const finalPart = sourceParts.at(-1) || null;
        const finalSegment = normalizeClassicalNahuatlVncApplicationStem(finalPart?.segment || "");
        const retainedFinal = finalSegment.endsWith("i") ? finalSegment.slice(0, -1) : "";
        const sourceAfterRemoval = [
          ...sourceParts.slice(0, -1).map(part => part.segment),
          retainedFinal
        ].join("");
        if (!retainedFinal || fold(sourceAfterRemoval) !== fold(expectedBase)) {
          return copySourcePartsWhenExact(expectedBase);
        }
        return [
          ...sourceParts.slice(0, -1).map(part => ({ segment: part.segment, role: part.role })),
          { segment: retainedFinal, role: "retained stem-formative consonant" }
        ];
      };
      const sections = Array.from(new Set((selectedOption.evidenceSections || [selectedOption.andrewsSection]).filter(Boolean)));
      const suffixFamily = normalizeClassicalNahuatlVncApplicationToken(
        selectedOption.typeTwoBridgeSuffixFamily
        || selectedOption.licensedLesson20SuffixFamily
        || selectedOption.lesson20SuffixFamily
        || bridgeRecord?.suffixFamily
        || ""
      );
      if (normalizedDerivationType === "applicative" && subtype.startsWith("type-one") && fold(addition) === "iā" && targetBase) {
        return {
          label: "Andrews derived-stem analysis",
          parts: [
            ...copySourcePartsWhenExact(targetBase),
            { segment: "iā", role: "applicative formative" }
          ],
          process: "The first-type route adds applicative iā to the typed replacive imperfective base.",
          andrewsSections: sections,
          source: "Andrews §26.2",
          grammarAuthority: false
        };
      }
      if (normalizedDerivationType === "applicative" && subtype.startsWith("type-two") && /liā$/u.test(fold(addition)) && targetBase) {
        const prefix = addition.replace(/-?liā$/u, "");
        return {
          label: "Andrews derived-stem analysis",
          parts: [
            ...copySourcePartsWhenExact(targetBase),
            ...prefix.split("-").filter(Boolean).map(segment => ({ segment, role: "replacive formation material" })),
            { segment: "l", role: "empty connective" },
            { segment: "iā", role: "applicative formative" }
          ],
          process: "The typed route forms the applicative base, then adds empty connective l plus applicative iā.",
          andrewsSections: sections,
          source: "Andrews §§26.3–26.8",
          grammarAuthority: false
        };
      }
      if (normalizedDerivationType === "applicative" && subtype.startsWith("type-two") && /huiā$/u.test(fold(addition)) && targetBase) {
        const prefix = addition.replace(/-?huiā$/u, "");
        return {
          label: "Andrews derived-stem analysis",
          parts: [
            ...copySourcePartsWhenExact(targetBase),
            ...prefix.split("-").filter(Boolean).map(segment => ({ segment, role: "replacive formation material" })),
            { segment: "hu", role: "empty connective /w/" },
            { segment: "iā", role: "applicative formative" }
          ],
          process: "The typed route forms the applicative base, then adds empty connective /w/ (written hu) plus applicative iā.",
          andrewsSections: sections,
          source: "Andrews §§26.3, 26.9–26.10",
          grammarAuthority: false
        };
      }
      if (normalizedDerivationType === "applicative" && fold(addition) === "tiā" && targetBase) {
        return {
          label: "Andrews derived-stem analysis",
          parts: [
            ...copySourcePartsWhenExact(targetBase),
            { segment: "tiā", role: "exceptional applicative formative" }
          ],
          process: "The selected exceptional route uses tiā applicatively; its function comes from the typed Lesson 26 rule, not its surface resemblance to a causative.",
          andrewsSections: sections,
          source: "Andrews §26.11",
          grammarAuthority: false
        };
      }
      if (normalizedDerivationType === "applicative") return null;
      if (subtype === "type-two" && fold(addition) === "tiā" && targetBase) {
        if (suffixFamily === "lō" && /l$/u.test(targetBase)) {
          const sourceBase = targetBase.replace(/-?l$/u, "");
          return {
            label: "Andrews derived-stem analysis",
            parts: [
              ...copySourcePartsWhenExact(sourceBase),
              { segment: "l", role: "retained nonactive formative" },
              { segment: "ti", role: "empty connective" },
              { segment: "ā", role: "causative formative" }
            ],
            process: "The lō nonactive base loses ō; l remains before tiā. The tiā unit is connective ti plus causative ā.",
            andrewsSections: sections,
            source: "Andrews §§25.1, 25.4",
            grammarAuthority: false
          };
        }
        return {
          label: "Andrews derived-stem analysis",
          parts: [
            ...copySourcePartsAfterFinalIRemoval(targetBase),
            { segment: "ti", role: "empty connective" },
            { segment: "ā", role: "causative formative" }
          ],
          process: "The typed nonactive ending is removed before tiā. The tiā unit is connective ti plus causative ā.",
          andrewsSections: sections,
          source: "Andrews §§25.1–25.4",
          grammarAuthority: false
        };
      }
      if (subtype === "type-two" && ["liā", "huiā"].includes(fold(addition)) && targetBase) {
        return {
          label: "Andrews derived-stem analysis",
          parts: [
            ...copySourcePartsWhenExact(targetBase),
            { segment: addition, role: "type-two causative formative" }
          ],
          process: `${addition} is the exceptional type-two causative unit selected by the typed Andrews route.`,
          andrewsSections: sections,
          source: addition === "liā" ? "Andrews §25.5" : "Andrews §25.6",
          grammarAuthority: false
        };
      }
      if (subtype === "type-one" && addition && targetBase) {
        const additionParts = addition.split("-").filter(Boolean);
        const causativeSegment = additionParts.at(-1) || addition;
        return {
          label: "Andrews derived-stem analysis",
          parts: [
            ...copySourcePartsWhenExact(targetBase),
            ...additionParts.slice(0, -1).map(segment => ({ segment, role: "replacive formation material" })),
            { segment: causativeSegment, role: "causative formative" }
          ],
          process: "The typed Lesson 24 operation supplies the retained or replacive base before the causative formative.",
          andrewsSections: sections,
          source: "Andrews Lesson 24",
          grammarAuthority: false
        };
      }
      return null;
    }
    function getClassicalNahuatlVncApplicationObjectSlotCarrier(typedFrame = null, request = {}, fallbackIndex = 0) {
      const slots = Array.isArray(typedFrame?.slots?.prePredicate) ? typedFrame.slots.prePredicate : [];
      const matchingSlot = slots.find(slot => slot?.objectPositionFrame?.objectId === request.objectId);
      return normalizeClassicalNahuatlVncApplicationToken(matchingSlot?.carrier || slots[fallbackIndex]?.carrier || "");
    }
    function buildBlockedClassicalNahuatlVncDerivationExplanationProjection(blockReason = "classical-vnc-derivation-explanation-canonical-application-required") {
      return freezeClassicalNahuatlVncApplicationProjectionValue({
        frameRole: "classical-nahuatl-vnc-derivation-explanation-projection",
        authorizationStatus: "blocked",
        blockReason,
        sourceDocument: "ANDREWS_TRANSCRIPTION_CANVAS.md",
        derivationType: "",
        derivationProcedure: null,
        sourceVoice: "",
        selectedVoice: "",
        sourceProfile: null,
        targetProfile: null,
        formationSteps: [],
        participantRows: [],
        reverseSourceAnalyses: [],
        scope: null,
        higherLayers: [],
        evidence: null,
        referenceDimensions: [],
        grammarAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        displayTextAuthority: false
      });
    }
    function projectCanonicalClassicalNahuatlVncDerivationExplanation(applicationFrame = null, runtimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget()) {
      const resultFrame = applicationFrame.resultFrame;
      const operationFrame = resultFrame.derivationOperationFrame;
      const activeMachineryFrame = resultFrame.activeMachineryFrame;
      const derivationType = normalizeClassicalNahuatlVncApplicationToken(resultFrame.selectedDerivation);
      if (derivationType === "direct" || !operationFrame) {
        return buildBlockedClassicalNahuatlVncDerivationExplanationProjection("classical-vnc-derivation-explanation-derived-result-required");
      }
      const operationAuthorized = isCanonicalClassicalNahuatlVncApplicationDerivationOperation(operationFrame, runtimeTarget);
      const activeAuthorized = typeof runtimeTarget?.isClassicalNahuatlDerivedVncMachineryFrame === "function" && runtimeTarget.isClassicalNahuatlDerivedVncMachineryFrame(activeMachineryFrame);
      const sourceAnalysisFrame = resultFrame.sourceAnalysisFrame || null;
      const sourceAnalysisAuthorized = isCanonicalClassicalNahuatlVncApplicationSourceAnalysisFrame(sourceAnalysisFrame, runtimeTarget);
      if (!operationAuthorized || !activeAuthorized || !sourceAnalysisAuthorized) {
        return buildBlockedClassicalNahuatlVncDerivationExplanationProjection();
      }
      const selectedOption = operationFrame.selectedOption || {};
      const sourceVoice = normalizeClassicalNahuatlVncApplicationToken(operationFrame.sourceVoice || operationFrame.participantTransformFrame?.sourceVoice || "active");
      const sourceAnalysisRows = (sourceAnalysisFrame.analyses || []).map(analysis => ({
        analysisId: analysis.analysisId,
        category: analysis.category,
        segments: [...analysis.segments],
        root: analysis.root,
        stockFormative: analysis.stockFormative,
        stemFormative: analysis.stemFormative,
        analysisAuthority: analysis.analysisAuthority,
        lexicalStatus: analysis.lexicalStatus,
        andrewsSections: [...analysis.andrewsSections],
        selectedForFormation: Boolean(selectedOption.sourceAnalysisId && analysis.analysisId === selectedOption.sourceAnalysisId),
        userAuthoredBoundaryRequired: false,
        display: buildClassicalNahuatlVncSourceAnalysisDisplayProjection(analysis)
      }));
      const sourceAnalysisDisplayGroups = groupClassicalNahuatlVncSourceAnalysisDisplayRows(sourceAnalysisRows);
      const compactSourceAnalysis = buildClassicalNahuatlVncCompactSourceAnalysisDisplayProjection(sourceAnalysisDisplayGroups);
      const sourceAnalysisCategories = Array.from(new Set(sourceAnalysisRows.map(analysis => analysis.category)));
      const participantFrame = operationFrame.participantTransformFrame || {};
      const sourceTypedFrame = operationFrame.sourceTypedVncSlotFrame;
      const formationSourceTypedFrame = operationFrame.formationSourceTypedVncSlotFrame || sourceTypedFrame;
      const activeTypedFrame = getClassicalNahuatlVncApplicationFinalTypedFrame(activeMachineryFrame);
      const finalTypedFrame = resultFrame.finalTypedVncSlotFrame;
      const sourceFormula = getClassicalNahuatlVncApplicationCanonicalFormula(sourceTypedFrame);
      const formationSourceFormula = getClassicalNahuatlVncApplicationCanonicalFormula(formationSourceTypedFrame);
      const activeFormula = getClassicalNahuatlVncApplicationCanonicalFormula(activeTypedFrame);
      const finalFormula = getClassicalNahuatlVncApplicationCanonicalFormula(finalTypedFrame);
      if (!sourceFormula || !formationSourceFormula || !activeFormula || !finalFormula) {
        return buildBlockedClassicalNahuatlVncDerivationExplanationProjection("classical-vnc-derivation-explanation-typed-formula-projection-required");
      }
      const sourceObjectRequests = Array.isArray(participantFrame.sourceObjectRequests) ? participantFrame.sourceObjectRequests : [];
      const targetObjectRequests = Array.isArray(participantFrame.targetObjectRequests) ? participantFrame.targetObjectRequests : [];
      const addedObjectRequest = participantFrame.addedObjectRequest || null;
      const clusterFrame = activeMachineryFrame.targetObjectClusterFrame || activeMachineryFrame.multipleObjectClusterFrame || null;
      const clusterPositions = Array.isArray(clusterFrame?.positions) ? clusterFrame.positions : [];
      const clusterLinearOrder = Array.isArray(clusterFrame?.linearOrder) ? clusterFrame.linearOrder : [];
      const targetTypedSlots = Array.isArray(activeTypedFrame?.slots?.prePredicate) ? activeTypedFrame.slots.prePredicate : [];
      const sourceSubjectCarrier = getClassicalNahuatlVncApplicationSubjectCarrier(sourceTypedFrame);
      const targetSubjectCarrier = getClassicalNahuatlVncApplicationSubjectCarrier(activeTypedFrame);
      const targetPositions = targetObjectRequests.map((request, requestIndex) => {
        const clusterPosition = clusterPositions.find(position => position.objectId === request.objectId) || null;
        const typedSlot = targetTypedSlots.find(slot => slot?.objectPositionFrame?.objectId === request.objectId) || targetTypedSlots[requestIndex] || null;
        const typedPosition = typedSlot?.objectPositionFrame || null;
        const position = clusterPosition || typedPosition;
        const linearOrderIndex = clusterLinearOrder.indexOf(request.objectId);
        const carrier = normalizeClassicalNahuatlVncApplicationToken(position?.carrier || typedSlot?.carrier || "");
        return {
          objectId: request.objectId,
          objectKind: request.objectKind,
          objectPerson: request.objectPerson,
          governor: request.governor,
          derivationalLevel: request.derivationalLevel,
          prominence: normalizeClassicalNahuatlVncApplicationToken(position?.prominence || (targetObjectRequests.length === 1 ? "mainline" : "")),
          carrier,
          sounded: position ? position.sounded === true : Boolean(carrier),
          silencingRule: normalizeClassicalNahuatlVncApplicationToken(position?.silencingRule || ""),
          carrierAuthority: normalizeClassicalNahuatlVncApplicationToken(position?.carrierAuthority || (targetObjectRequests.length === 1 ? "typed single-object VNC slot" : "")),
          linearOrder: linearOrderIndex >= 0 ? linearOrderIndex + 1 : requestIndex + 1
        };
      });
      const targetPositionById = new Map(targetPositions.map(position => [position.objectId, position]));
      const participantRows = [];
      participantRows.push({
        participantId: derivationType === "causative" ? "imported-matrix-subject" : "preserved-source-subject",
        sourceRole: derivationType === "causative" ? `${participantFrame.targetSubject} new matrix subject` : `${participantFrame.sourceSubject} source subject`,
        sourceCarrier: derivationType === "causative" ? "" : sourceSubjectCarrier,
        sourceCarrierKind: derivationType === "causative" ? "" : "subject",
        transformation: derivationType === "causative" ? "imported as outer subject" : "preserved as outer subject",
        targetRole: "outer subject",
        targetCarrier: targetSubjectCarrier,
        targetCarrierKind: "subject",
        governor: "subject",
        derivationalLevel: 0,
        prominence: "subject",
        sounded: true,
        silencingRule: ""
      });
      targetObjectRequests.slice().sort((left, right) => {
        const leftPosition = targetPositionById.get(left.objectId);
        const rightPosition = targetPositionById.get(right.objectId);
        return (leftPosition?.linearOrder || 99) - (rightPosition?.linearOrder || 99) || left.derivationalLevel - right.derivationalLevel;
      }).forEach(request => {
        const position = targetPositionById.get(request.objectId) || {};
        const sourceRequestIndex = sourceObjectRequests.findIndex(sourceRequest => sourceRequest.objectId === request.objectId);
        const isAddedObject = Boolean(addedObjectRequest && addedObjectRequest.objectId === request.objectId);
        let sourceRole = `${describeClassicalNahuatlVncApplicationObject(request)} in the source VNC`;
        let sourceCarrier = sourceRequestIndex >= 0 ? getClassicalNahuatlVncApplicationObjectSlotCarrier(sourceTypedFrame, request, sourceRequestIndex) : "";
        let transformation = "retained from the source VNC";
        let sourceCarrierKind = sourceCarrier ? "object" : "";
        if (isAddedObject && derivationType === "causative") {
          sourceRole = sourceVoice === "active" ? `${participantFrame.sourceSubject} source subject` : `implicit agent of the ${sourceVoice} source`;
          sourceCarrier = sourceVoice === "active" ? sourceSubjectCarrier : "";
          sourceCarrierKind = sourceVoice === "active" ? "subject" : "";
          transformation = sourceVoice === "active" ? "becomes the causative object" : "becomes the nonspecific causative object";
        } else if (isAddedObject && derivationType === "applicative") {
          sourceRole = `new ${describeClassicalNahuatlVncApplicationObject(request)}`;
          sourceCarrier = "";
          sourceCarrierKind = "";
          transformation = "is imported by the applicative";
        } else if (sourceVoice === "passive" && participantFrame.promotedSourceObjectRequest?.objectId === request.objectId) {
          sourceRole = `${participantFrame.participantSurfaceSubject} promoted passive subject`;
          sourceCarrier = sourceSubjectCarrier;
          sourceCarrierKind = "subject";
          transformation = request.objectKind === "reflexive" ? "returns as a coreferential reflexive shuntline object" : "returns as a shuntline source object";
        }
        participantRows.push({
          participantId: request.objectId,
          sourceRole,
          sourceCarrier,
          sourceCarrierKind,
          transformation,
          targetRole: `${position.prominence || "typed"} ${request.governor} object`,
          targetCarrier: position.carrier || "",
          targetCarrierKind: "object",
          governor: request.governor,
          derivationalLevel: request.derivationalLevel,
          prominence: position.prominence || "",
          sounded: position.sounded === true,
          silencingRule: position.silencingRule || "",
          carrierAuthority: position.carrierAuthority || "",
          linearOrder: position.linearOrder || 0
        });
      });
      const bridgeRecord = selectedOption.lesson20NonactiveStemRecord || null;
      const derivedStemAnalysis = buildClassicalNahuatlVncDerivedStemAnalysisDisplayProjection({
        selectedOption,
        derivationType,
        sourceAnalysisDisplayGroups,
        bridgeRecord,
        targetStem: operationFrame.targetStem
      });
      const selectedVoice = normalizeClassicalNahuatlVncApplicationToken(resultFrame.selectedVoice || "active");
      const selectedMachineryFrame = resultFrame.selectedMachineryFrame || null;
      const laterVoiceNonactiveRecord = selectedVoice === "passive" || selectedVoice === "impersonal"
        ? selectedMachineryFrame?.nonactiveStemRecord || null
        : null;
      const finalStem = normalizeClassicalNahuatlVncApplicationStem(selectedMachineryFrame?.voiceTransformationFrame?.targetStem || selectedMachineryFrame?.nonactiveStemRecord?.nonactiveStem || finalTypedFrame?.slots?.predicate?.stem || operationFrame.targetStem);
      const buildParticipantFormulaSegments = (formula = "", typedFrame = null, carrierSide = "target") => {
        const text = String(formula || "");
        const slots = typedFrame?.slots || {};
        const subject = slots.subject || {};
        const predicate = slots.predicate || {};
        const number = slots.number || {};
        const prePredicate = Array.isArray(slots.prePredicate) ? slots.prePredicate : [];
        const carrierKindKey = carrierSide === "source" ? "sourceCarrierKind" : "targetCarrierKind";
        const carrierKey = carrierSide === "source" ? "sourceCarrier" : "targetCarrier";
        const subjectRow = participantRows.find(row => row?.[carrierKindKey] === "subject") || null;
        const participantRowById = new Map(participantRows.map((row, participantIndex) => [row.participantId, { row, participantIndex }]));
        const objectEntries = participantRows
          .map((row, participantIndex) => ({ row, participantIndex }))
          .filter(entry => entry.row?.[carrierKindKey] === "object" && entry.row?.[carrierKey]);
        const linkedObjectIds = new Set();
        const segments = [];
        const appendSegment = (segmentText = "", participantEntry = null) => {
          if (!segmentText) return;
          if (!participantEntry) {
            segments.push({ text: segmentText });
            return;
          }
          segments.push({
            text: segmentText,
            participantId: participantEntry.row.participantId,
            participantIndex: participantEntry.participantIndex,
            carrierSide
          });
        };
        const subjectEntry = subjectRow ? participantRowById.get(subjectRow.participantId) || null : null;
        appendSegment("#");
        appendSegment(`${subject.pers1 || ""}-${subject.pers2 || ""}`, subjectEntry);
        prePredicate.forEach(slot => {
          appendSegment("+");
          const typedObjectId = slot?.objectPositionFrame?.objectId || "";
          let objectEntry = typedObjectId ? participantRowById.get(typedObjectId) || null : null;
          if (!objectEntry || objectEntry.row?.[carrierKindKey] !== "object") {
            objectEntry = objectEntries.find(entry => !linkedObjectIds.has(entry.row.participantId) && entry.row[carrierKey] === slot?.carrier) || null;
          }
          if (objectEntry) linkedObjectIds.add(objectEntry.row.participantId);
          appendSegment(slot?.formulaCarrier || slot?.carrier || "", objectEntry);
        });
        appendSegment(`(${predicate.stem || ""})${predicate.tns || ""}+`);
        appendSegment(`${number.num1 || ""}-${number.num2 || ""}`, subjectEntry);
        appendSegment("#");
        return segments.map(segment => segment.text).join("") === text ? segments : [{ text }];
      };
      const formationSteps = [{
        stage: "source",
        label: sourceVoice === "active" ? "Identified source VNC" : "Active formation basis",
        stem: operationFrame.sourceStem,
        verbClass: applicationFrame.normalizedRequest.verbClass,
        formula: formationSourceFormula,
        status: sourceVoice === "active" ? "authorized typed source" : "authorized active lexical basis",
        provisional: true
      }];
      if (sourceVoice !== "active") {
        formationSteps.push({
          stage: "source-voice",
          label: `${sourceVoice} source VNC`,
          stem: normalizeClassicalNahuatlVncApplicationStem(resultFrame.sourceMachineryFrame?.stem || operationFrame.sourceStem),
          verbClass: resultFrame.sourceMachineryFrame?.nonactiveTargetClass || applicationFrame.normalizedRequest.verbClass,
          formula: sourceFormula,
          status: "canonical participant source before causative transformation",
          provisional: true,
          sourceNonactiveOptionId: resultFrame.sourceMachineryFrame?.nonactiveStemRecord?.selectedOptionId || ""
        });
      }
      formationSteps.push({
        stage: "source-analysis",
        label: "Lessons 24–25 boundary-free source analysis",
        stem: sourceAnalysisFrame.sourceStem,
        verbClass: sourceAnalysisFrame.sourceClass,
        formula: "",
        status: "canonical engine-derived morphology",
        provisional: true,
        analysisCategories: sourceAnalysisCategories,
        analyses: sourceAnalysisRows,
        analysisDisplayGroups: sourceAnalysisDisplayGroups,
        compactDisplay: compactSourceAnalysis,
        selectedFormation: {
          targetStem: operationFrame.targetStem,
          procedureLabel: buildClassicalNahuatlVncDerivationProcedureProjection(selectedOption, derivationType).label
        },
        explicitBoundaryObserved: sourceAnalysisFrame.explicitBoundaryObserved === true,
        boundaryObservation: sourceAnalysisFrame.explicitBoundaryObserved === true
          ? "Editorial morpheme boundaries were observed in the entered spelling."
          : "No editorial morpheme boundaries were required in the entered spelling.",
        userHyphensAuthority: false,
        authorityStatement: "User-authored hyphens are observations only; they never authorize source analysis."
      });
      if (bridgeRecord) {
        formationSteps.push({
          stage: "nonactive-bridge",
          label: "Lesson 20 nonactive bridge",
          stem: bridgeRecord.nonactiveStem,
          verbClass: bridgeRecord.targetClass || applicationFrame.normalizedRequest.verbClass,
          formula: "",
          status: "required lower formation",
          provisional: true,
          ruleId: bridgeRecord.selectedRuleId
        });
      }
      formationSteps.push({
        stage: "completed-active-derivation",
        label: `Lesson ${selectedOption.formationLesson} ${derivationType}`,
        stem: operationFrame.targetStem,
        verbClass: operationFrame.targetClass,
        formula: activeFormula,
        status: selectedVoice === "active" ? "completed selected derivation" : "completed before later voice",
        provisional: selectedVoice !== "active",
        ruleId: selectedOption.ruleId,
        derivedStemAnalysis
      });
      if (selectedVoice !== "active") {
        formationSteps.push({
          stage: "later-voice",
          label: `Later ${selectedVoice} formation`,
          stem: finalStem,
          verbClass: operationFrame.targetClass,
          formula: finalFormula,
          status: "selected final voice",
          provisional: false,
          sourceStem: operationFrame.targetStem
        });
      }
      const sourceProfile = {
        label: "Identified source",
        stem: operationFrame.sourceStem,
        sourceLexemeId:
          sourceAnalysisFrame.sourceLexemeId
          || applicationFrame.normalizedRequest.sourceLexemeId
          || "",
        sourceVoice,
        verbClass: applicationFrame.normalizedRequest.verbClass,
        valence: applicationFrame.normalizedRequest.effectiveSourceValence || applicationFrame.normalizedRequest.sourceValence,
        subject: participantFrame.participantSurfaceSubject || participantFrame.sourceSubject,
        objectCount: sourceObjectRequests.length,
        formula: sourceFormula,
        participantFormulaSegments: buildParticipantFormulaSegments(sourceFormula, sourceTypedFrame, "source"),
        typedFrameKind: sourceTypedFrame.kind
      };
      const targetProfile = {
        label: "Derived active VNC",
        stem: operationFrame.targetStem,
        verbClass: operationFrame.targetClass,
        valence: activeMachineryFrame.valence,
        subject: participantFrame.targetSubject,
        objectCount: targetObjectRequests.length,
        formula: activeFormula,
        participantFormulaSegments: buildParticipantFormulaSegments(activeFormula, activeTypedFrame, "target"),
        typedFrameKind: activeTypedFrame.kind
      };
      const scopeObject = addedObjectRequest ? describeClassicalNahuatlVncApplicationObject(addedObjectRequest) : "typed object";
      const scopeDiagram = derivationType === "causative"
        ? sourceVoice === "active"
          ? `[${participantFrame.sourceSubject} source subject + ${operationFrame.sourceStem} source core] → object of CAUSE`
          : `[implicit source agent + ${sourceVoice} ${operationFrame.sourceStem} source core] → nonspecific object of CAUSE`
        : `${operationFrame.sourceStem} source core + [${scopeObject} ↔ applicative suffix]`;
      const higherLayers = [{
        order: 1,
        label: "Completed active derivation",
        value: operationFrame.targetStem,
        status: "complete"
      }, {
        order: 2,
        label: "Later voice",
        value: selectedVoice === "active" ? "not selected" : `${selectedVoice} → ${finalStem}`,
        status: selectedVoice === "active" ? "available after derivation" : "applied after derivation"
      }, {
        order: 3,
        label: "Final typed VNC",
        value: finalFormula,
        status: "final selected formula"
      }];
      const clusterAuthorities = Array.from(new Set(clusterPositions.map(position => normalizeClassicalNahuatlVncApplicationToken(position.carrierAuthority)).filter(Boolean)));
      const participantEvidenceSection = normalizeClassicalNahuatlVncApplicationToken(
        participantFrame.participantEvidenceSection
      );
      const participantEvidenceUmbrella = participantEvidenceSection
        ? participantEvidenceSection.replace(/\.\d+$/u, "")
        : "";
      const evidenceSections = Array.from(new Set(
        (selectedOption.evidenceSections || []).map(section => (
          participantEvidenceUmbrella && section === participantEvidenceUmbrella
            ? participantEvidenceSection
            : section
        ))
      ));
      return freezeClassicalNahuatlVncApplicationProjectionValue({
        frameRole: "classical-nahuatl-vnc-derivation-explanation-projection",
        authorizationStatus: "authorized",
        blockReason: "",
        sourceDocument: operationFrame.sourceDocument,
        derivationType,
        derivationSubtype: selectedOption.derivationSubtype,
        derivationRoute: selectedOption.derivationRoute,
        stemRelation: selectedOption.stemRelation || "surface-changing",
        derivationProcedure: buildClassicalNahuatlVncDerivationProcedureProjection(selectedOption, derivationType),
        sourceVoice,
        selectedVoice,
        sourceProfile,
        targetProfile,
        depthLabel: `${sourceObjectRequests.length} ${sourceObjectRequests.length === 1 ? "object" : "objects"} → ${targetObjectRequests.length} ${targetObjectRequests.length === 1 ? "object" : "objects"}`,
        formationSteps,
        participantRows,
        reverseSourceAnalyses: (operationFrame.reverseSourceAnalyses || []).map(analysis => ({
          ...analysis,
          grammarAuthority: false,
          displayOnly: true
        })),
        scope: {
          model: selectedOption.scopeModel,
          section: selectedOption.scopeSection,
          rule: selectedOption.scopeRule,
          participantRule: selectedOption.participantRule,
          diagram: scopeDiagram
        },
        higherLayers,
        evidence: {
          lesson: selectedOption.formationLesson,
          sections: evidenceSections,
          sourceAnalysis: {
            sourceVoice: sourceAnalysisFrame.sourceVoice || "active",
            formationSourceSignature: sourceAnalysisFrame.formationSourceSignature || "",
            sourceStem: sourceAnalysisFrame.sourceStem,
            sourceLexemeId: sourceAnalysisFrame.sourceLexemeId || "",
            lexicalStem: sourceAnalysisFrame.lexicalStem,
            sourceClass: sourceAnalysisFrame.sourceClass,
            sourceValence: sourceAnalysisFrame.sourceValence,
            analysisCategories: sourceAnalysisCategories,
            analyses: sourceAnalysisRows,
            selectedAnalysisId: selectedOption.sourceAnalysisId || "",
            explicitBoundaryObserved: sourceAnalysisFrame.explicitBoundaryObserved === true,
            boundaryAuthority: sourceAnalysisFrame.boundaryAuthority,
            userHyphensAuthority: false,
            authorityStatement: "User-authored hyphens are observations only; they never authorize source analysis."
          },
          ruleId: selectedOption.ruleId,
          ruleTagId: selectedOption.ruleTagId,
          optionId: operationFrame.selectedOptionId,
          derivationLicenseId: selectedOption.derivationLicenseId,
          licenseStatus: selectedOption.authorityStatus,
          exactWitness: selectedOption.exactWitness === true,
          formationRuleTier: selectedOption.formationRuleTier,
          productivityStatus: selectedOption.productivityStatus,
          lexicalChoiceRequired: selectedOption.lexicalChoiceRequired === true,
          lexicalAttestations: selectedOption.lexicalEvidenceMatches || [],
          targetConstruction: selectedOption.targetConstruction,
          scopeSection: selectedOption.scopeSection,
          lesson20Bridge: bridgeRecord ? {
            sourceStem: bridgeRecord.sourceStem,
            nonactiveStem: bridgeRecord.nonactiveStem,
            suffixFamily: bridgeRecord.suffixFamily,
            ruleId: bridgeRecord.selectedRuleId,
            lexicalAttestations: bridgeRecord.lexicalEvidenceMatches || []
          } : null,
          laterVoiceNonactive: laterVoiceNonactiveRecord ? {
            sourceStem: laterVoiceNonactiveRecord.sourceStem,
            nonactiveStem: laterVoiceNonactiveRecord.nonactiveStem,
            suffixFamily: laterVoiceNonactiveRecord.suffixFamily,
            ruleId: laterVoiceNonactiveRecord.selectedRuleId,
            lexicalAttestations: laterVoiceNonactiveRecord.lexicalEvidenceMatches || []
          } : null,
          lesson23ObjectRouting: clusterFrame ? {
            section: clusterFrame.section,
            linearOrder: clusterFrame.linearOrder,
            linearCarriers: clusterFrame.linearCarriers,
            carrierAuthorities: clusterAuthorities
          } : null,
          appliedFrameKinds: resultFrame.appliedTypedFrames.map(frame => frame.kind || frame.frameRole || "typed-frame"),
          controlBoundary: "Only typed options generated for this canonical source can execute.",
          receiptBoundary: "Formula, labels, and Canvas citations explain the result; they do not authorize it."
        },
        referenceDimensions: CLASSICAL_NAHUATL_VNC_APPLICATION_DERIVATION_REFERENCE_DIMENSIONS,
        grammarAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        displayTextAuthority: false
      });
    }
    function buildClassicalNahuatlVncDerivationExplanationProjection(applicationFrame = null) {
      if (!isClassicalNahuatlVncApplicationFrame(applicationFrame)) {
        return buildBlockedClassicalNahuatlVncDerivationExplanationProjection();
      }
      return projectCanonicalClassicalNahuatlVncDerivationExplanation(applicationFrame);
    }
    function attachClassicalNahuatlVncDerivationExplanationProjection(applicationFrame = null, runtimeTarget = null) {
      if (applicationFrame?.authorizationStatus !== "authorized") {
        return applicationFrame;
      }
      const continuationSource =
        classicalNahuatlVncContinuationSourceByApplicationFrame.get(
          applicationFrame,
        ) || null;
      const derivationExplanationProjection = projectCanonicalClassicalNahuatlVncDerivationExplanation(applicationFrame, runtimeTarget || getClassicalNahuatlVncApplicationRuntimeTarget());
      const projectedApplicationFrame =
        finalizeBuiltClassicalNahuatlVncApplicationFrame({
        ...applicationFrame,
        derivationExplanationProjection
      });
      if (continuationSource) {
        classicalNahuatlVncContinuationSourceByApplicationFrame.set(
          projectedApplicationFrame,
          continuationSource,
        );
        classicalNahuatlVncContinuationSourceByResultFrame.set(
          projectedApplicationFrame.resultFrame,
          continuationSource,
        );
      }
      return projectedApplicationFrame;
    }
    function isClassicalNahuatlVncApplicationActiveFrameAuthorized(activeMachineryFrame = null) {
      return Boolean(activeMachineryFrame && activeMachineryFrame.proofFrame?.authorizationStatus === "authorized" && getClassicalNahuatlVncApplicationFinalTypedFrame(activeMachineryFrame));
    }
    function getClassicalNahuatlVncApplicationBlockReason(machineryFrame = null, fallback = "") {
      return normalizeClassicalNahuatlVncApplicationToken(machineryFrame?.blockReason || machineryFrame?.proofFrame?.blockReason || machineryFrame?.proofFrame?.conclusion?.blockReason || fallback);
    }
    function buildClassicalNahuatlVncApplicationFrame({
      normalizedRequest,
      controlFrame,
      formationSourceMachineryFrame = null,
      sourceMachineryFrame = null,
      sourceAnalysisFrame = null,
      activeMachineryFrame = null,
      derivationOperationFrame = null,
      selectedMachineryFrame = null,
      appliedTypedFrames = [],
      missingCapabilities = [],
      rejectedAuthorityFields = [],
      unsupportedIntentFields = [],
      forcedBlockReason = "",
      continuationSource = null,
      runtimeTarget = null
    } = {}) {
      const selectedAuthorizationStatus = normalizeClassicalNahuatlVncApplicationToken(selectedMachineryFrame?.authorizationStatus || selectedMachineryFrame?.proofFrame?.authorizationStatus);
      const authorizationStatus = forcedBlockReason ? "blocked" : selectedAuthorizationStatus === "authorized" ? "authorized" : "blocked";
      const blockReason = authorizationStatus === "authorized" ? "" : forcedBlockReason || getClassicalNahuatlVncApplicationBlockReason(selectedMachineryFrame, "classical-vnc-application-result-not-authorized");
      const finalTypedVncSlotFrame = authorizationStatus === "authorized" ? getClassicalNahuatlVncApplicationFinalTypedFrame(selectedMachineryFrame) : null;
      const applicationRuntimeTarget = runtimeTarget && typeof runtimeTarget === "object"
        ? runtimeTarget
        : getClassicalNahuatlVncApplicationRuntimeTarget();
      const finiteSurfaceFrame = authorizationStatus === "authorized"
        && typeof applicationRuntimeTarget?.buildClassicalNahuatlVncFiniteSurfaceFrame === "function"
        ? applicationRuntimeTarget.buildClassicalNahuatlVncFiniteSurfaceFrame(selectedMachineryFrame)
        : null;
      const surfaceRealization = finiteSurfaceFrame?.authorizationStatus === "authorized"
        ? normalizeClassicalNahuatlVncApplicationToken(finiteSurfaceFrame.wordRealization)
        : "";
      const formulaRealization = finiteSurfaceFrame?.authorizationStatus === "authorized"
        ? normalizeClassicalNahuatlVncApplicationToken(finiteSurfaceFrame.formulaRealization)
        : "";
      const resultFrame = {
        kind: "classical-nahuatl-vnc-application-result-frame",
        version: CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,
        authorizationStatus,
        blockReason,
        selectedSourceVoice: controlFrame?.selectedSourceVoice || normalizedRequest?.sourceVoice || "active",
        selectedVoice: controlFrame?.selectedVoice || normalizedRequest?.voice || "active",
        selectedVoiceOperation: controlFrame?.selectedVoiceOperation || normalizedRequest?.targetVoiceOperation || "active",
        selectedNonactiveOptionId: controlFrame?.selectedNonactiveOptionId || "",
        selectedDerivation: controlFrame?.derivationType || normalizedRequest?.derivationType || "direct",
        formationSourceMachineryFrame,
        sourceMachineryFrame,
        sourceAnalysisFrame: authorizationStatus === "authorized" ? sourceAnalysisFrame : null,
        activeMachineryFrame,
        derivationOperationFrame,
        selectedMachineryFrame: authorizationStatus === "authorized" ? selectedMachineryFrame : null,
        finalTypedVncSlotFrame,
        formulaRealization,
        finiteSurfaceFrame: authorizationStatus === "authorized" ? finiteSurfaceFrame : null,
        surfaceRealization,
        appliedTypedFrames: Object.freeze(authorizationStatus === "authorized" ? appliedTypedFrames.filter(Boolean) : []),
        typedFrameAuthority: true,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        callerSuppliedAuthorityAccepted: false
      };
      const applicationFrame = {
        kind: "classical-nahuatl-vnc-application-frame",
        version: CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,
        authorizationStatus,
        blockReason,
        normalizedRequest,
        controlFrame,
        resultFrame,
        requiredCapabilities: CLASSICAL_NAHUATL_VNC_APPLICATION_REQUIRED_CAPABILITIES,
        missingCapabilities: Object.freeze([...missingCapabilities]),
        rejectedAuthorityFields: Object.freeze([...rejectedAuthorityFields]),
        unsupportedIntentFields: Object.freeze([...unsupportedIntentFields]),
        callerSuppliedAuthorityAccepted: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false
      };
      if (continuationSource) {
        classicalNahuatlVncContinuationSourceByApplicationFrame.set(
          applicationFrame,
          continuationSource,
        );
        classicalNahuatlVncContinuationSourceByResultFrame.set(
          resultFrame,
          continuationSource,
        );
      }
      return finalizeBuiltClassicalNahuatlVncApplicationFrame(
        applicationFrame,
      );
    }
    function createClassicalNahuatlVncApplication(dependencies = {}) {
      const dependencySource = dependencies && typeof dependencies === "object" ? dependencies : {};
      const missingCapabilities = getClassicalNahuatlVncApplicationMissingCapabilities(dependencySource);
      const serviceStatus = missingCapabilities.length ? "blocked" : "authorized";
      const buildApplicationFrame = options => buildClassicalNahuatlVncApplicationFrame({
        ...options,
        runtimeTarget: dependencySource
      });
      const issuedParadigmPlans = new WeakSet();
      const paradigmPlanInternals = new WeakMap();
      const issuedApplicationResultFrames = new WeakSet();
      const validateSharedApplicationFrame = applicationFrame => {
        const previousValidationTransaction = classicalNahuatlVncApplicationValidationTransaction;
        // Evaluation has already admitted source, analysis, and inventory frames
        // through this private transaction. Reusing those identity-bound canonical
        // results keeps the final shared-contract audit synchronous enough for a
        // live control change without weakening validation of hostile copies,
        // which always enter through a fresh public transaction.
        classicalNahuatlVncApplicationValidationTransaction = previousValidationTransaction || createClassicalNahuatlVncApplicationValidationTransaction();
        try {
        const registry = dependencySource.getDefaultGrammarContractRegistry();
        dependencySource.assertRegisteredGrammarContract(registry, applicationFrame.normalizedRequest, {
          contractKind: "classical-nahuatl-vnc-application-request",
          version: 1
        });
        dependencySource.assertRegisteredGrammarContract(registry, applicationFrame.controlFrame, {
          contractKind: "classical-nahuatl-vnc-application-control-frame",
          version: 1
        });
        dependencySource.assertRegisteredGrammarContract(registry, applicationFrame.resultFrame, {
          contractKind: "classical-nahuatl-vnc-application-result-frame",
          version: 1
        });
        const validatedApplicationFrame = dependencySource.assertRegisteredGrammarContract(registry, applicationFrame, {
          contractKind: "classical-nahuatl-vnc-application-frame",
          version: 1
        });
        const projectedApplicationFrame = attachClassicalNahuatlVncDerivationExplanationProjection(validatedApplicationFrame, dependencySource);
        return dependencySource.assertRegisteredGrammarContract(registry, projectedApplicationFrame, {
          contractKind: "classical-nahuatl-vnc-application-frame",
          version: 1
        });
        } finally {
          classicalNahuatlVncApplicationValidationTransaction = previousValidationTransaction;
        }
      };
      const evaluateWithContinuationSource = (
        request = {},
        continuationSource = null,
      ) => runClassicalNahuatlVncApplicationValidationTransaction(() => {
        const requestObject = request && typeof request === "object" ? request : {};
        const rejectedAuthorityFields = Object.freeze(Array.from(new Set([
          ...getClassicalNahuatlVncApplicationPresentFields(requestObject, CLASSICAL_NAHUATL_VNC_APPLICATION_CALLER_AUTHORITY_FIELDS),
          ...getClassicalNahuatlVncApplicationCurriculumCarrierFields(requestObject),
          ...getClassicalNahuatlVncApplicationPresentFields(requestObject.sentenceOptions, CLASSICAL_NAHUATL_VNC_APPLICATION_CALLER_AUTHORITY_FIELDS).map(field => `sentenceOptions.${field}`),
          ...getClassicalNahuatlVncApplicationCurriculumCarrierFields(requestObject.sentenceOptions).map(field => `sentenceOptions.${field}`),
        ])));
        const unsupportedIntentFields = Object.freeze([...getClassicalNahuatlVncApplicationPresentFields(requestObject, CLASSICAL_NAHUATL_VNC_APPLICATION_FUTURE_INTENT_FIELDS), ...getClassicalNahuatlVncApplicationPresentFields(requestObject.sentenceOptions, CLASSICAL_NAHUATL_VNC_APPLICATION_FUTURE_INTENT_FIELDS).map(field => `sentenceOptions.${field}`)]);
        const normalizedBaseRequest = normalizeClassicalNahuatlVncApplicationRequest(requestObject);
        const buildEvaluationApplicationFrame = options =>
          buildApplicationFrame({
            ...options,
            continuationSource,
          });
        if (missingCapabilities.length) {
          const normalizedRequest = Object.freeze({
            ...normalizedBaseRequest,
            derivationType: "direct",
            sourceVoice: "active",
            sourceNonactiveOptionId: "",
            voice: "active"
          });
          const controlFrame = Object.freeze({
            kind: "classical-nahuatl-vnc-application-control-frame",
            version: CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,
            authorizationStatus: "blocked",
            blockReason: "classical-vnc-application-required-capabilities-unavailable",
            requestedDerivation: normalizedBaseRequest.requestedDerivation,
            derivationType: "direct",
            allowedDerivations: Object.freeze(["direct"]),
            requestedDerivationAccepted: normalizedBaseRequest.requestedDerivation === "direct",
            derivationNormalizationReason: "required-grammar-capabilities-unavailable",
            requestedSourceVoice: normalizedBaseRequest.requestedSourceVoice,
            sourceVoice: "active",
            selectedSourceVoice: "active",
            allowedSourceVoices: Object.freeze(["active"]),
            requestedSourceVoiceAccepted: normalizedBaseRequest.requestedSourceVoice === "active",
            sourceVoiceNormalizationReason: "required-grammar-capabilities-unavailable",
            sourceNonactiveOptionInventory: null,
            sourceNonactiveSelectorRequired: false,
            selectedSourceNonactiveOptionId: "",
            sourceAnalysisFrame: null,
            derivationOptionInventory: null,
            derivationSelectorRequired: false,
            selectedDerivationOptionId: "",
            derivedStem: "",
            derivedClass: "",
            targetObjectCount: 0,
            causativeObjectKindChoiceEligible: false,
            allowedCausativeObjectKinds: Object.freeze([]),
            causativeObjectKindSelectionRequired: false,
            selectedCausativeObjectKind: "",
            causativeSpecificShuntlineChoiceEligible: false,
            allowedCausativeSpecificShuntlineRealizations: Object.freeze([]),
            causativeSpecificShuntlineSelectionRequired: false,
            selectedCausativeSpecificShuntlineRealization: "",
            requestedVoice: normalizedBaseRequest.requestedVoice,
            selectedVoice: "active",
            allowedVoices: Object.freeze(["active"]),
            requestedVoiceAccepted: normalizedBaseRequest.requestedVoice === "active",
            voiceNormalizationReason: "required-grammar-capabilities-unavailable",
            nonactiveOptionInventory: null,
            nonactiveSelectorRequired: false,
            selectedNonactiveOptionId: ""
          });
          return attachClassicalNahuatlVncDerivationExplanationProjection(buildEvaluationApplicationFrame({
            normalizedRequest,
            controlFrame,
            missingCapabilities,
            rejectedAuthorityFields,
            unsupportedIntentFields,
            forcedBlockReason: "classical-vnc-application-required-capabilities-unavailable"
          }), dependencySource);
        }
        const derivationSourceRequest =
          buildClassicalNahuatlVncApplicationDerivationSourceRequest(
            normalizedBaseRequest,
          );
        const formationSourceMachineryFrame =
          continuationSource?.formationSourceMachineryFrame
            || buildClassicalNahuatlVncApplicationSourceMachinery(
              dependencySource,
              derivationSourceRequest,
            );
        const formationSourceAuthorized = isClassicalNahuatlVncApplicationActiveFrameAuthorized(formationSourceMachineryFrame);
        const canonicalFormationSourceDescriptor = getClassicalNahuatlVncApplicationCanonicalActivePredicateDescriptor(formationSourceMachineryFrame, {
          stem: normalizedBaseRequest.sourceStem,
          verbClass: normalizedBaseRequest.verbClass,
          sourceValence: normalizedBaseRequest.sourceValence,
          objectRequests: normalizedBaseRequest.sourceObjectRequests
        });
        const sourceNonactiveOptionInventory = dependencySource.getClassicalNahuatlNonactiveStemOptions(canonicalFormationSourceDescriptor.stem, {
          verbClass: canonicalFormationSourceDescriptor.verbClass || normalizedBaseRequest.verbClass,
          sourceValence: canonicalFormationSourceDescriptor.sourceValence || normalizedBaseRequest.sourceValence
        });
        let allowedSourceVoices = normalizedBaseRequest.derivationType === "causative" && formationSourceAuthorized
          ? Object.freeze(getClassicalNahuatlVncApplicationAllowedVoices({
            sourceStem: canonicalFormationSourceDescriptor.stem,
            sourceValence: canonicalFormationSourceDescriptor.sourceValence || normalizedBaseRequest.sourceValence,
            outputScope: "single",
            nonactiveOptionInventory: sourceNonactiveOptionInventory,
            objectRequests: canonicalFormationSourceDescriptor.objectRequests
          }).filter(voice => CLASSICAL_NAHUATL_VNC_APPLICATION_SOURCE_VOICES.includes(voice)))
          : Object.freeze(["active"]);
        if (!allowedSourceVoices.length) {
          allowedSourceVoices = Object.freeze(["active"]);
        }
        const selectedSourceVoice = allowedSourceVoices.includes(normalizedBaseRequest.sourceVoice) ? normalizedBaseRequest.sourceVoice : "active";
        let sourceVoiceNormalizationReason = "";
        if (!normalizedBaseRequest.requestedSourceVoiceRecognized) {
          sourceVoiceNormalizationReason = "unknown-source-voice-normalized-to-active";
        } else if (normalizedBaseRequest.derivationType !== "causative" && normalizedBaseRequest.sourceVoice !== "active") {
          sourceVoiceNormalizationReason = "source-voice-applies-only-before-causative-derivation";
        } else if (selectedSourceVoice !== normalizedBaseRequest.sourceVoice) {
          sourceVoiceNormalizationReason = "requested-source-voice-not-authorized-for-source";
        }
        const selectedSourceNonactiveOptionId = selectedSourceVoice === "active"
          ? ""
          : normalizeClassicalNahuatlVncApplicationToken(normalizedBaseRequest.sourceNonactiveOptionId || sourceNonactiveOptionInventory?.automaticOptionId || "");
        const continuationSourceVoiceMatches = Boolean(
          continuationSource
          && selectedSourceVoice
            === continuationSource.sourceDescriptor?.sourceVoice
          && selectedSourceNonactiveOptionId
            === continuationSource.sourceDescriptor
              ?.sourceNonactiveOptionId
        );
        const sourceVoiceBundle = continuationSourceVoiceMatches
          ? Object.freeze({
            sourceVoice: selectedSourceVoice,
            selectedSourceNonactiveOptionId,
            sourceNonactiveStemRecord:
              continuationSource.sourceMachineryFrame
                ?.nonactiveStemRecord || null,
            sourceMachineryFrame:
              continuationSource.sourceMachineryFrame,
          })
          : buildClassicalNahuatlVncApplicationSourceVoiceMachinery(
            dependencySource,
            formationSourceMachineryFrame,
            {
              ...derivationSourceRequest,
              sourceVoice: selectedSourceVoice,
              sourceNonactiveOptionId:
                selectedSourceNonactiveOptionId,
            },
            {
              sourceVoice: selectedSourceVoice,
              sourceNonactiveOptionInventory,
            },
          );
        const sourceMachineryFrame = sourceVoiceBundle.sourceMachineryFrame;
        const sourceAuthorized = formationSourceAuthorized
          && isCanonicalClassicalNahuatlVncApplicationDerivationSourceMachineryFrame(sourceMachineryFrame, dependencySource);
        const sourceAnalysisCandidate = sourceAuthorized
          ? dependencySource.buildClassicalNahuatlVncDerivationSourceAnalysisFrame(sourceMachineryFrame)
          : null;
        const sourceAnalysisAuthorized = Boolean(sourceAnalysisCandidate
          && isCanonicalClassicalNahuatlVncApplicationSourceAnalysisFrame(sourceAnalysisCandidate, dependencySource)
          && sourceAnalysisCandidate.sourceMachineryFrame === sourceMachineryFrame);
        let sourceAnalysisFrame = sourceAnalysisAuthorized ? sourceAnalysisCandidate : null;
        const requestedDerivation = normalizedBaseRequest.derivationType;
        let derivationOptionInventory = null;
        let derivationOperationFrame = null;
        let participantChoicePreviewOperationFrame = null;
        let activeMachineryFrame = sourceMachineryFrame;
        if (
          requestedDerivation !== "direct"
          && sourceAnalysisAuthorized
          && normalizedBaseRequest
            .requestedCausativeSpecificShuntlineRealizationRecognized
        ) {
          derivationOptionInventory = dependencySource.getClassicalNahuatlVncDerivationOptionInventory(sourceMachineryFrame, {
            derivationType: requestedDerivation,
            sourceValence: normalizedBaseRequest.sourceValence,
            verbClass: normalizedBaseRequest.verbClass
          });
          const inventorySourceAnalysisCanonical = derivationOptionInventory?.authorizationStatus === "authorized"
            && Boolean(derivationOptionInventory.canonicalSignature)
            && isCanonicalClassicalNahuatlVncApplicationDerivationInventory(derivationOptionInventory, dependencySource)
            && derivationOptionInventory.sourceSignature === sourceAnalysisFrame.sourceSignature
            && derivationOptionInventory.sourceMachineryFrame === sourceMachineryFrame
            && isCanonicalClassicalNahuatlVncApplicationSourceAnalysisFrame(derivationOptionInventory.sourceAnalysisFrame, dependencySource)
            && derivationOptionInventory.sourceAnalysisFrame.sourceSignature === sourceAnalysisFrame.sourceSignature
            && areClassicalNahuatlVncApplicationCanonicalValuesEqual(derivationOptionInventory.sourceAnalysisFrame, sourceAnalysisFrame);
          if (inventorySourceAnalysisCanonical) {
            sourceAnalysisFrame = derivationOptionInventory.sourceAnalysisFrame;
          }
          const derivationOperationRequest = buildClassicalNahuatlVncApplicationDerivationOperationRequest({
            ...normalizedBaseRequest,
            sourceVoice: selectedSourceVoice
          });
          // A sounded/silent specific shuntline is downstream from the typed
          // participant transform. Build the operation without that intent
          // first, then apply it only when the canonical transform says that
          // this choice exists. This keeps stale UI state out of grammar input
          // without making the renderer probe or reconstruct the rule.
          delete derivationOperationRequest.causativeSpecificShuntlineRealization;
          const participantChoicePreviewRequest = derivationOperationRequest;
          delete participantChoicePreviewRequest.causativeSpecificShuntlineRealization;
          participantChoicePreviewOperationFrame = inventorySourceAnalysisCanonical
            ? deriveClassicalNahuatlVncApplicationOperationFromCanonicalInventory(dependencySource, sourceMachineryFrame, derivationOptionInventory, participantChoicePreviewRequest)
            : null;
          if (participantChoicePreviewOperationFrame?.participantTransformFrame?.causativeSpecificShuntlineChoiceEligible === true
            && CLASSICAL_NAHUATL_VNC_APPLICATION_CAUSATIVE_SPECIFIC_SHUNTLINE_REALIZATIONS.includes(normalizedBaseRequest.causativeSpecificShuntlineRealization)) {
            participantChoicePreviewOperationFrame = deriveClassicalNahuatlVncApplicationOperationFromCanonicalInventory(dependencySource, sourceMachineryFrame, derivationOptionInventory, {
              ...participantChoicePreviewRequest,
              causativeSpecificShuntlineRealization: normalizedBaseRequest.causativeSpecificShuntlineRealization
            });
          }
          derivationOperationFrame = participantChoicePreviewOperationFrame;
          activeMachineryFrame = derivationOperationFrame?.authorizationStatus === "authorized" ? dependencySource.buildClassicalNahuatlDerivedVncMachineryFrame(sourceMachineryFrame, derivationOperationFrame, {
            mood: normalizedBaseRequest.mood,
            tense: normalizedBaseRequest.tense,
            targetSubject: normalizedBaseRequest.subject,
            sentenceOptions: buildClassicalNahuatlVncApplicationOptions(normalizedBaseRequest)
          }) : null;
        }
        const derivationOperationAuthorized = requestedDerivation === "direct" || Boolean(
          derivationOperationFrame?.authorizationStatus === "authorized"
          && Boolean(derivationOperationFrame.canonicalSignature)
          && derivationOptionInventory?.sourceAnalysisFrame === sourceAnalysisFrame
        );
        const activeAuthorized = isClassicalNahuatlVncApplicationActiveFrameAuthorized(activeMachineryFrame);
        const effectiveSourceValence = normalizedBaseRequest.tlaFusion === true ? "projective-nonhuman" : normalizedBaseRequest.sourceValence;
        const fallbackDirectTargetValence = targetObjectRequests => targetObjectRequests.length > 1 ? "multiple-object" : effectiveSourceValence;
        const targetStem = requestedDerivation === "direct"
          ? normalizedBaseRequest.sourceStem
          : getClassicalNahuatlVncApplicationOperationTargetStem(derivationOperationFrame);
        const targetObjectRequests = requestedDerivation === "direct"
          ? normalizedBaseRequest.sourceObjectRequests
          : getClassicalNahuatlVncApplicationOperationObjectRequests(derivationOperationFrame);
        const canonicalActiveDescriptor = getClassicalNahuatlVncApplicationCanonicalActivePredicateDescriptor(activeMachineryFrame, {
          stem: targetStem,
          verbClass: requestedDerivation === "direct"
            ? normalizedBaseRequest.verbClass
            : getClassicalNahuatlVncApplicationOperationTargetClass(derivationOperationFrame, normalizedBaseRequest.verbClass),
          sourceValence: requestedDerivation === "direct"
            ? fallbackDirectTargetValence(targetObjectRequests)
            : getClassicalNahuatlVncApplicationTargetValence(derivationOperationFrame, effectiveSourceValence),
          objectRequests: targetObjectRequests
        });
        const targetClass = requestedDerivation === "direct"
          ? canonicalActiveDescriptor.verbClass || normalizedBaseRequest.verbClass
          : getClassicalNahuatlVncApplicationOperationTargetClass(derivationOperationFrame, normalizedBaseRequest.verbClass);
        const targetValence = requestedDerivation === "direct"
          ? canonicalActiveDescriptor.sourceValence || fallbackDirectTargetValence(targetObjectRequests)
          : getClassicalNahuatlVncApplicationTargetValence(derivationOperationFrame, effectiveSourceValence);
        const nonactiveSourceStem = activeAuthorized ? canonicalActiveDescriptor.stem : targetStem;
        const nonactiveSourceClass = activeAuthorized ? canonicalActiveDescriptor.verbClass || targetClass : targetClass;
        const nonactiveSourceValence = activeAuthorized ? canonicalActiveDescriptor.sourceValence || targetValence : targetValence;
        const nonactiveSourceObjectRequests = activeAuthorized ? canonicalActiveDescriptor.objectRequests : targetObjectRequests;
        const lesson20NonactiveOptionInventory = dependencySource.getClassicalNahuatlNonactiveStemOptions(nonactiveSourceStem, {
          verbClass: nonactiveSourceClass,
          sourceValence: nonactiveSourceValence
        });
        const inherentImpersonalSourceAnalysis =
          dependencySource.getClassicalNahuatlInherentImpersonalSourceAnalysis(
            nonactiveSourceStem
          );
        const tlaImpersonalSourceAnalysis =
          dependencySource.getClassicalNahuatlTlaImpersonalSourceAnalysis(
            nonactiveSourceStem
          );
        let allowedVoiceOperations = getClassicalNahuatlVncApplicationAllowedVoices({
          sourceStem: activeAuthorized && (requestedDerivation === "direct" || sourceAnalysisAuthorized) ? nonactiveSourceStem : "",
          sourceValence: nonactiveSourceValence,
          outputScope: normalizedBaseRequest.outputScope,
          nonactiveOptionInventory: lesson20NonactiveOptionInventory,
          objectRequests: nonactiveSourceObjectRequests,
          inherentImpersonalSourceAnalysis,
          tlaImpersonalSourceAnalysis
        });
        let allowedVoices = getClassicalNahuatlVncApplicationPublicAllowedVoices(allowedVoiceOperations);
        let selectedVoice = allowedVoices.includes(normalizedBaseRequest.voice) ? normalizedBaseRequest.voice : "active";
        let voiceNormalizationReason = "";
        if (!normalizedBaseRequest.requestedVoiceRecognized) {
          voiceNormalizationReason = "unknown-voice-normalized-to-active";
        } else if (!targetStem && normalizedBaseRequest.voice !== "active") {
          voiceNormalizationReason = "source-stem-required-before-derived-voice";
        } else if (selectedVoice !== normalizedBaseRequest.voice) {
          voiceNormalizationReason = "requested-voice-not-authorized-for-source";
        }
        if ((!activeAuthorized || requestedDerivation !== "direct" && !sourceAnalysisAuthorized) && selectedVoice !== "active") {
          allowedVoiceOperations = Object.freeze(["active"]);
          allowedVoices = Object.freeze(["active"]);
          selectedVoice = "active";
          voiceNormalizationReason = requestedDerivation === "direct" ? "active-source-analysis-must-authorize-before-derived-voice" : "completed-active-derivation-must-authorize-before-derived-voice";
        }
        const nonactiveOptionInventory = buildClassicalNahuatlVncApplicationNonactiveFormationInventory({
          publicVoice: selectedVoice,
          allowedVoiceOperations,
          lesson20OptionInventory: lesson20NonactiveOptionInventory
        });
        const selectedNonactiveOptionId = selectedVoice === "active"
          ? ""
          : normalizeClassicalNahuatlVncApplicationToken(normalizedBaseRequest.nonactiveOptionId || nonactiveOptionInventory.automaticOptionId || "");
        const selectedNonactiveOption = selectedNonactiveOptionId
          ? nonactiveOptionInventory.options.find(option => option.optionId === selectedNonactiveOptionId) || null
          : null;
        const selectedVoiceOperation = selectedVoice === "active"
          ? "active"
          : selectedNonactiveOption?.voiceOperation || selectedVoice;
        const selectedDerivationOptionId = (derivationOperationFrame || participantChoicePreviewOperationFrame)?.selectedOptionId || (derivationOperationFrame || participantChoicePreviewOperationFrame)?.selectedOption?.optionId || "";
        const causativeParticipantChoiceControls = getClassicalNahuatlVncApplicationCausativeParticipantChoiceControls(derivationOperationFrame || participantChoicePreviewOperationFrame, normalizedBaseRequest);
        const derivationNormalizationReason = !normalizedBaseRequest.requestedDerivationRecognized ? "unknown-derivation-normalized-to-direct" : "";
        const normalizedRequest = Object.freeze({
          ...normalizedBaseRequest,
          sourceVoice: selectedSourceVoice,
          sourceNonactiveOptionId: sourceVoiceBundle.selectedSourceNonactiveOptionId || "",
          causativeSpecificShuntlineRealization: causativeParticipantChoiceControls.selectedCausativeSpecificShuntlineRealization || "",
          voice: selectedVoice,
          targetVoiceOperation: selectedVoiceOperation,
          effectiveSourceValence,
          targetStem,
          targetClass,
          targetValence
        });
        const controlFrameBase = {
          kind: "classical-nahuatl-vnc-application-control-frame",
          version: CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,
          authorizationStatus: "authorized",
          blockReason: "",
          requestedDerivation: normalizedBaseRequest.requestedDerivation,
          derivationType: requestedDerivation,
          allowedDerivations: CLASSICAL_NAHUATL_VNC_APPLICATION_DERIVATIONS,
          requestedDerivationAccepted: normalizedBaseRequest.requestedDerivationRecognized
            && (requestedDerivation === "direct" || sourceAnalysisAuthorized)
            && derivationOperationAuthorized,
          derivationNormalizationReason,
          requestedSourceVoice: normalizedBaseRequest.requestedSourceVoice,
          sourceVoice: selectedSourceVoice,
          selectedSourceVoice,
          allowedSourceVoices,
          requestedSourceVoiceAccepted: selectedSourceVoice === normalizedBaseRequest.requestedSourceVoice,
          sourceVoiceNormalizationReason,
          sourceNonactiveOptionInventory,
          sourceNonactiveSelectorRequired: selectedSourceVoice !== "active" && sourceNonactiveOptionInventory?.selectorRequired === true,
          selectedSourceNonactiveOptionId: sourceVoiceBundle.selectedSourceNonactiveOptionId || "",
          sourceAnalysisFrame,
          derivationOptionInventory,
          derivationSelectorRequired: requestedDerivation !== "direct" && derivationOptionInventory?.selectorRequired === true,
          selectedDerivationOptionId,
          derivedStem: requestedDerivation === "direct" ? "" : targetStem,
          derivedClass: requestedDerivation === "direct" ? "" : targetClass,
          targetObjectCount: targetObjectRequests.length,
          ...causativeParticipantChoiceControls,
          requestedVoice: normalizedBaseRequest.requestedVoice,
          selectedVoice,
          allowedVoices,
          allowedVoiceOperations,
          selectedVoiceOperation,
          inherentImpersonalSourceAnalysis,
          tlaImpersonalSourceAnalysis,
          requestedVoiceAccepted: selectedVoice === normalizedBaseRequest.requestedVoice,
          voiceNormalizationReason,
          requestedOutputScope: normalizedBaseRequest.requestedOutputScope,
          selectedOutputScope: normalizedBaseRequest.outputScope,
          requestedOutputScopeAccepted: normalizedBaseRequest.requestedOutputScopeRecognized,
          nonactiveOptionInventory,
          nonactiveSelectorRequired: (selectedVoice === "passive" || selectedVoice === "impersonal") && nonactiveOptionInventory?.selectorRequired === true,
          selectedNonactiveOptionId: selectedNonactiveOption?.optionId || "",
          sourceInitialIAnalysis: normalizedBaseRequest.sourceInitialIAnalysis,
          sourceInitialISelectionRequired: normalizedBaseRequest.sourceInitialIAnalysis?.selectionRequired === true
        };
        if (rejectedAuthorityFields.length) {
          const controlFrame = Object.freeze({
            ...controlFrameBase,
            authorizationStatus: "blocked",
            blockReason: "classical-vnc-application-caller-authority-rejected"
          });
          return validateSharedApplicationFrame(buildEvaluationApplicationFrame({
            normalizedRequest,
            controlFrame,
            appliedTypedFrames: [],
            missingCapabilities,
            rejectedAuthorityFields,
            unsupportedIntentFields,
            forcedBlockReason: "classical-vnc-application-caller-authority-rejected"
          }));
        }
        if (
          !normalizedBaseRequest
            .requestedCausativeSpecificShuntlineRealizationRecognized
        ) {
          const blockReason =
            "classical-vnc-causative-specific-shuntline-realization-not-recognized";
          const controlFrame = Object.freeze({
            ...controlFrameBase,
            authorizationStatus: "blocked",
            blockReason,
          });
          return validateSharedApplicationFrame(
            buildEvaluationApplicationFrame({
              normalizedRequest,
              controlFrame,
              formationSourceMachineryFrame,
              sourceMachineryFrame,
              sourceAnalysisFrame,
              activeMachineryFrame,
              derivationOperationFrame: null,
              selectedMachineryFrame: activeMachineryFrame,
              appliedTypedFrames: [
                sourceMachineryFrame?.nonactiveStemRecord,
                sourceMachineryFrame?.voiceTransformationFrame,
                sourceAnalysisFrame,
              ],
              missingCapabilities,
              rejectedAuthorityFields,
              unsupportedIntentFields,
              forcedBlockReason: blockReason,
            }),
          );
        }
        const causativeSpecificShuntlineApplicationBlockReason = (
          normalizedBaseRequest
            .causativeSpecificShuntlineRealization
          && participantChoicePreviewOperationFrame
            ?.participantTransformFrame
          && causativeParticipantChoiceControls
            .causativeSpecificShuntlineChoiceEligible !== true
        )
          ? "classical-vnc-causative-specific-shuntline-realization-not-applicable"
          : "";
        if (causativeSpecificShuntlineApplicationBlockReason) {
          const controlFrame = Object.freeze({
            ...controlFrameBase,
            authorizationStatus: "blocked",
            blockReason:
              causativeSpecificShuntlineApplicationBlockReason,
          });
          return validateSharedApplicationFrame(
            buildEvaluationApplicationFrame({
              normalizedRequest,
              controlFrame,
              formationSourceMachineryFrame,
              sourceMachineryFrame,
              sourceAnalysisFrame,
              activeMachineryFrame,
              derivationOperationFrame: null,
              selectedMachineryFrame: activeMachineryFrame,
              appliedTypedFrames: [
                sourceMachineryFrame?.nonactiveStemRecord,
                sourceMachineryFrame?.voiceTransformationFrame,
                sourceAnalysisFrame,
                participantChoicePreviewOperationFrame,
                participantChoicePreviewOperationFrame
                  ?.participantTransformFrame,
              ],
              missingCapabilities,
              rejectedAuthorityFields,
              unsupportedIntentFields,
              forcedBlockReason:
                causativeSpecificShuntlineApplicationBlockReason,
            }),
          );
        }
        const specificCoreferenceBlockReason =
          getClassicalNahuatlVncApplicationSpecificCoreferenceBlockReason({
            subject:
              requestedDerivation === "direct"
              && selectedVoice !== "active"
              && normalizedRequest.sourceSubjectExplicit === true
                ? normalizedRequest.sourceSubject
                : normalizedRequest.subject,
            derivationType: requestedDerivation,
            objectRequests: targetObjectRequests
          });
        if (specificCoreferenceBlockReason) {
          const controlFrame = Object.freeze({
            ...controlFrameBase,
            authorizationStatus: "blocked",
            blockReason: specificCoreferenceBlockReason
          });
          return validateSharedApplicationFrame(buildEvaluationApplicationFrame({
            normalizedRequest,
            controlFrame,
            formationSourceMachineryFrame,
            sourceMachineryFrame,
            sourceAnalysisFrame,
            activeMachineryFrame,
            derivationOperationFrame,
            selectedMachineryFrame: activeMachineryFrame,
            appliedTypedFrames: [
              sourceMachineryFrame?.nonactiveStemRecord,
              sourceMachineryFrame?.voiceTransformationFrame,
              sourceAnalysisFrame,
              derivationOperationFrame,
              derivationOperationFrame?.participantTransformFrame
            ],
            missingCapabilities,
            rejectedAuthorityFields,
            unsupportedIntentFields,
            forcedBlockReason: specificCoreferenceBlockReason
          }));
        }
        const sourceInitialISelectionBlockReason = normalizedBaseRequest.sourceInitialIAnalysis?.selectionRequired === true
          ? "classical-vnc-source-initial-i-selection-required"
          : "";
        if (sourceInitialISelectionBlockReason) {
          const controlFrame = Object.freeze({
            ...controlFrameBase,
            authorizationStatus: "blocked",
            blockReason: sourceInitialISelectionBlockReason
          });
          return validateSharedApplicationFrame(buildEvaluationApplicationFrame({
            normalizedRequest,
            controlFrame,
            formationSourceMachineryFrame,
            sourceMachineryFrame,
            sourceAnalysisFrame,
            activeMachineryFrame,
            derivationOperationFrame,
            selectedMachineryFrame: activeMachineryFrame,
            missingCapabilities,
            rejectedAuthorityFields,
            unsupportedIntentFields,
            forcedBlockReason: sourceInitialISelectionBlockReason
          }));
        }
        if (!normalizedBaseRequest.requestedDerivationRecognized) {
          const derivationBlockReason = normalizedBaseRequest.derivationTypeSelectionFrame?.blockReason || "classical-vnc-derivation-type-not-recognized";
          const controlFrame = Object.freeze({
            ...controlFrameBase,
            authorizationStatus: "blocked",
            blockReason: derivationBlockReason
          });
          return validateSharedApplicationFrame(buildEvaluationApplicationFrame({
            normalizedRequest,
            controlFrame,
            formationSourceMachineryFrame,
            sourceMachineryFrame,
            sourceAnalysisFrame,
            activeMachineryFrame,
            derivationOperationFrame,
            selectedMachineryFrame: activeMachineryFrame,
            missingCapabilities,
            rejectedAuthorityFields,
            unsupportedIntentFields,
            forcedBlockReason: derivationBlockReason
          }));
        }
        const voiceSelectionBlockReason = !normalizedBaseRequest.requestedVoiceRecognized
          ? normalizedBaseRequest.targetVoiceSelectionFrame?.blockReason || "classical-vnc-target-voice-not-recognized"
          : !normalizedBaseRequest.requestedSourceVoiceRecognized
            ? normalizedBaseRequest.sourceVoiceSelectionFrame?.blockReason || "classical-vnc-causative-source-voice-not-recognized"
            : selectedSourceVoice !== normalizedBaseRequest.requestedSourceVoice
              ? "classical-vnc-causative-source-voice-not-authorized-for-source"
              : selectedVoice !== normalizedBaseRequest.requestedVoice
                ? "classical-vnc-target-voice-not-authorized-for-source"
                : "";
        if (voiceSelectionBlockReason) {
          const controlFrame = Object.freeze({
            ...controlFrameBase,
            authorizationStatus: "blocked",
            blockReason: voiceSelectionBlockReason
          });
          return validateSharedApplicationFrame(buildEvaluationApplicationFrame({
            normalizedRequest,
            controlFrame,
            formationSourceMachineryFrame,
            sourceMachineryFrame,
            sourceAnalysisFrame,
            activeMachineryFrame,
            derivationOperationFrame,
            selectedMachineryFrame: activeMachineryFrame,
            missingCapabilities,
            rejectedAuthorityFields,
            unsupportedIntentFields,
            forcedBlockReason: voiceSelectionBlockReason
          }));
        }
        const nonactiveFormationChoiceBlockReason = (selectedVoice === "passive" || selectedVoice === "impersonal")
          ? nonactiveOptionInventory.authorizationStatus !== "authorized"
            ? nonactiveOptionInventory.blockReason || "classical-vnc-no-authorized-nonactive-formation"
            : nonactiveOptionInventory.selectorRequired === true && !normalizedBaseRequest.nonactiveOptionId
              ? "classical-vnc-nonactive-formation-option-selection-required"
              : normalizedBaseRequest.nonactiveOptionId && !selectedNonactiveOption
                ? "classical-vnc-nonactive-formation-option-not-authorized"
                : ""
          : "";
        if (nonactiveFormationChoiceBlockReason) {
          const controlFrame = Object.freeze({
            ...controlFrameBase,
            authorizationStatus: "blocked",
            blockReason: nonactiveFormationChoiceBlockReason
          });
          return validateSharedApplicationFrame(buildEvaluationApplicationFrame({
            normalizedRequest,
            controlFrame,
            formationSourceMachineryFrame,
            sourceMachineryFrame,
            sourceAnalysisFrame,
            activeMachineryFrame,
            derivationOperationFrame,
            selectedMachineryFrame: activeMachineryFrame,
            appliedTypedFrames: [sourceMachineryFrame?.nonactiveStemRecord, sourceMachineryFrame?.voiceTransformationFrame, sourceAnalysisFrame, derivationOperationFrame, derivationOperationFrame?.participantTransformFrame],
            missingCapabilities,
            rejectedAuthorityFields,
            unsupportedIntentFields,
            forcedBlockReason: nonactiveFormationChoiceBlockReason
          }));
        }
        if (unsupportedIntentFields.length) {
          const controlFrame = Object.freeze({
            ...controlFrameBase,
            authorizationStatus: "blocked",
            blockReason: "classical-vnc-application-intent-outside-derivation-and-single-voice-scope"
          });
          return validateSharedApplicationFrame(buildEvaluationApplicationFrame({
            normalizedRequest,
            controlFrame,
            formationSourceMachineryFrame,
            sourceMachineryFrame,
            sourceAnalysisFrame,
            activeMachineryFrame,
            derivationOperationFrame,
            selectedMachineryFrame: activeMachineryFrame,
            missingCapabilities,
            rejectedAuthorityFields,
            unsupportedIntentFields,
            forcedBlockReason: "classical-vnc-application-intent-outside-derivation-and-single-voice-scope"
          }));
        }
        if (requestedDerivation !== "direct" && (!sourceAuthorized || !sourceAnalysisAuthorized || !derivationOperationAuthorized || !activeAuthorized)) {
          const derivationBlockReason = !sourceAuthorized
            ? getClassicalNahuatlVncApplicationBlockReason(sourceMachineryFrame, "classical-vnc-derivation-authorized-source-required")
            : !sourceAnalysisAuthorized
              ? "classical-vnc-derivation-source-analysis-not-authorized"
            : !derivationOperationAuthorized
              ? derivationOptionInventory?.selectionRequired === true
                && !normalizedBaseRequest.derivationOptionId
                ? "classical-vnc-derivation-option-selection-required"
                : normalizeClassicalNahuatlVncApplicationToken(derivationOperationFrame?.blockReason || derivationOptionInventory?.blockReason || "classical-vnc-derivation-operation-not-authorized")
              : getClassicalNahuatlVncApplicationBlockReason(activeMachineryFrame, "classical-vnc-derived-machinery-not-authorized");
          const controlFrame = Object.freeze({
            ...controlFrameBase,
            authorizationStatus: "blocked",
            blockReason: derivationBlockReason
          });
          return validateSharedApplicationFrame(buildEvaluationApplicationFrame({
            normalizedRequest,
            controlFrame,
            formationSourceMachineryFrame,
            sourceMachineryFrame,
            sourceAnalysisFrame,
            activeMachineryFrame,
            derivationOperationFrame,
            selectedMachineryFrame: activeMachineryFrame,
            appliedTypedFrames: [sourceMachineryFrame?.nonactiveStemRecord, sourceMachineryFrame?.voiceTransformationFrame, sourceAnalysisFrame, derivationOperationFrame, derivationOperationFrame?.participantTransformFrame],
            missingCapabilities,
            rejectedAuthorityFields,
            unsupportedIntentFields,
            forcedBlockReason: derivationBlockReason
          }));
        }
        let selectedMachineryFrame = activeMachineryFrame;
        let nonactiveStemRecord = null;
        let inherentImpersonalRecord = null;
        let tlaImpersonalStemRecord = null;
        if (activeAuthorized && (selectedVoiceOperation === "passive" || selectedVoiceOperation === "impersonal")) {
          nonactiveStemRecord = dependencySource.deriveClassicalNahuatlNonactiveStemRecord(nonactiveSourceStem, {
            verbClass: nonactiveSourceClass,
            sourceValence: nonactiveSourceValence,
            optionId: selectedNonactiveOption?.lesson20OptionId || ""
          });
        }
        if (activeAuthorized && selectedVoiceOperation === "inherent-impersonal") {
          inherentImpersonalRecord = dependencySource.buildClassicalNahuatlInherentImpersonalRecord(targetStem, {
            selectionAuthority: "andrews-lesson22-voice-selection"
          });
        }
        if (activeAuthorized && selectedVoiceOperation === "tla-impersonal") {
          tlaImpersonalStemRecord = dependencySource.buildClassicalNahuatlTlaImpersonalStemRecord(targetStem, {
            selectionAuthority: "andrews-lesson22-rule-derivation"
          });
        }
        if (activeAuthorized && selectedVoiceOperation !== "active") {
          const firstSpecificObject = targetObjectRequests.find(objectRequest => objectRequest?.objectKind === "specific-projective") || targetObjectRequests[0] || null;
          selectedMachineryFrame = dependencySource.buildClassicalNahuatlDerivedVncFrame(activeMachineryFrame, {
            voice: selectedVoiceOperation,
            nonactiveStemRecord,
            inherentImpersonalRecord,
            tlaImpersonalStemRecord,
            sourceObjectClusterFrame: activeMachineryFrame?.targetObjectClusterFrame || activeMachineryFrame?.multipleObjectClusterFrame || null,
            sourceValence: targetValence,
            sourceSubject:
              requestedDerivation === "direct"
              && selectedVoice !== "active"
              && normalizedRequest.sourceSubjectExplicit === true
                ? normalizedRequest.sourceSubject
                : normalizedRequest.subject,
            sourceObjectPerson: firstSpecificObject?.objectPerson || activeMachineryFrame?.priorVncFrame?.objectFrame?.objectPerson || "",
            mood: normalizedRequest.mood,
            tense: normalizedRequest.tense,
            verbClass: targetClass,
            sentenceOptions:
              getClassicalNahuatlVncApplicationCanonicalSentenceOptions(
                activeMachineryFrame,
              ),
          });
        }
        const selectedMachineryAuthorized = (requestedDerivation === "direct" || sourceAnalysisAuthorized)
          && isClassicalNahuatlVncApplicationActiveFrameAuthorized(selectedMachineryFrame);
        const controlFrame = Object.freeze({
          ...controlFrameBase,
          authorizationStatus: selectedMachineryAuthorized ? "authorized" : "blocked",
          blockReason: selectedMachineryAuthorized ? "" : getClassicalNahuatlVncApplicationBlockReason(selectedMachineryFrame, "classical-vnc-application-result-not-authorized"),
          selectedNonactiveOptionId: selectedNonactiveOption?.optionId || ""
        });
        return validateSharedApplicationFrame(buildEvaluationApplicationFrame({
          normalizedRequest,
          controlFrame,
          formationSourceMachineryFrame,
          sourceMachineryFrame,
          sourceAnalysisFrame,
          activeMachineryFrame,
          derivationOperationFrame,
          selectedMachineryFrame,
          appliedTypedFrames: [sourceMachineryFrame?.nonactiveStemRecord, sourceMachineryFrame?.voiceTransformationFrame, sourceAnalysisFrame, derivationOperationFrame, derivationOperationFrame?.participantTransformFrame, nonactiveStemRecord, inherentImpersonalRecord, tlaImpersonalStemRecord, selectedMachineryFrame?.voiceTransformationFrame],
          missingCapabilities,
          rejectedAuthorityFields,
          unsupportedIntentFields
        }));
      });
      const issueApplicationResult = applicationFrame => {
        if (
          applicationFrame?.authorizationStatus === "authorized"
          && applicationFrame.resultFrame?.authorizationStatus
            === "authorized"
          && isClassicalNahuatlVncApplicationFrame(applicationFrame)
        ) {
          issuedApplicationResultFrames.add(applicationFrame.resultFrame);
        }
        return applicationFrame;
      };
      const evaluate = (request = {}) => issueApplicationResult(
        evaluateWithContinuationSource(request),
      );
      const getContinuationSourceForResult = (
        sourceResultFrame = null,
      ) => {
        const applicationResultAuthorized = Boolean(
          issuedApplicationResultFrames.has(sourceResultFrame)
          && classicalNahuatlVncApplicationBuiltResultFrames.has(
            sourceResultFrame,
          )
          && isClassicalNahuatlVncApplicationResultFrame(
            sourceResultFrame,
          ),
        );
        const orderedVoiceResultAuthorized =
          isClassicalNahuatlOrderedVoiceVncApplicationFrame(
            sourceResultFrame,
          );
        const currentRuntimeTarget =
          getClassicalNahuatlVncApplicationRuntimeTarget();
        const lateClosureValidator =
          typeof currentRuntimeTarget?.isClassicalNahuatlClosureFrame
            === "function"
            ? currentRuntimeTarget.isClassicalNahuatlClosureFrame
            : dependencySource?.isClassicalNahuatlClosureFrame;
        const lateOperationResultAuthorized = Boolean(
          sourceResultFrame?.authorizationStatus === "authorized"
          && typeof lateClosureValidator === "function"
          && lateClosureValidator(
            sourceResultFrame,
          ) === true,
        );
        if (
          !applicationResultAuthorized
          && !orderedVoiceResultAuthorized
          && !lateOperationResultAuthorized
        ) {
          return null;
        }
        const canonicalContinuationResultFrame = lateOperationResultAuthorized
          ? sourceResultFrame.operationFrame
            ?.targetApplicationFrame?.resultFrame || null
          : sourceResultFrame;
        const sourceMachineryFrame =
          canonicalContinuationResultFrame?.selectedMachineryFrame || null;
        if (
          !isCanonicalClassicalNahuatlVncApplicationDerivationSourceMachineryFrame(
            sourceMachineryFrame,
            dependencySource,
          )
        ) {
          return null;
        }
        const sourceDescriptor =
          getClassicalNahuatlVncContinuationSourceDescriptor(
            sourceMachineryFrame,
            dependencySource,
          );
        return sourceDescriptor.sourceStem
          && sourceDescriptor.verbClass
          && sourceDescriptor.sourceValence
          ? Object.freeze({
            sourceResultFrame: canonicalContinuationResultFrame,
            sourceMachineryFrame,
            formationSourceMachineryFrame:
              sourceDescriptor.formationSourceMachineryFrame,
            sourceDescriptor,
          })
          : null;
      };
      const getContinuationSourceConstituents = (
        sourceResultFrame = null,
      ) => {
        const continuationSource =
          getContinuationSourceForResult(sourceResultFrame);
        if (!continuationSource) return null;
        const sourceDescriptor = continuationSource.sourceDescriptor;
        return Object.freeze({
          kind:
            "classical-nahuatl-vnc-result-source-constituent-projection",
          version: CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,
          sourceStem: sourceDescriptor.sourceStem,
          sourceLexemeId: sourceDescriptor.sourceLexemeId,
          sourceInitialISelection:
            sourceDescriptor.sourceInitialISelection,
          verbClass: sourceDescriptor.verbClass,
          sourceValence: sourceDescriptor.sourceValence,
          sourceSubject: sourceDescriptor.sourceSubject,
          sourceVoice: sourceDescriptor.sourceVoice,
          sourceNonactiveOptionId:
            sourceDescriptor.sourceNonactiveOptionId,
          sourceObjectRequests: Object.freeze(
            sourceDescriptor.sourceObjectRequests.map(
              cloneClassicalNahuatlVncApplicationCompactValue,
            ),
          ),
          objectKind: sourceDescriptor.objectKind,
          objectPerson: sourceDescriptor.objectPerson,
          projectionRole: "read-only-source-constituents",
          grammarAuthority: false,
          callerSuppliedAuthorityAccepted: false,
        });
      };
      const continueFromResult = (
        sourceResultFrame = null,
        request = {},
      ) => {
        const continuationSource =
          getContinuationSourceForResult(sourceResultFrame);
        const continuationRequest =
          buildClassicalNahuatlVncContinuationRequest(
            request,
            continuationSource?.sourceDescriptor || null,
          );
        if (!continuationSource || !continuationRequest) {
          return null;
        }
        return issueApplicationResult(
          evaluateWithContinuationSource(
            continuationRequest,
            continuationSource,
          ),
        );
      };
      const prepareParadigmWithContinuationSource = (
        request = {},
        continuationSourceResultFrame = null,
      ) => runClassicalNahuatlVncApplicationValidationTransaction(() => {
        const requestObject = request && typeof request === "object" ? request : {};
        const rejectedAuthorityFields = Object.freeze(Array.from(new Set([
          ...getClassicalNahuatlVncApplicationPresentFields(requestObject, CLASSICAL_NAHUATL_VNC_APPLICATION_CALLER_AUTHORITY_FIELDS),
          ...getClassicalNahuatlVncApplicationCurriculumCarrierFields(requestObject),
          ...getClassicalNahuatlVncApplicationPresentFields(requestObject.sentenceOptions, CLASSICAL_NAHUATL_VNC_APPLICATION_CALLER_AUTHORITY_FIELDS).map(field => `sentenceOptions.${field}`),
          ...getClassicalNahuatlVncApplicationCurriculumCarrierFields(requestObject.sentenceOptions).map(field => `sentenceOptions.${field}`),
        ])));
        const scalarSeedRequest = Object.freeze({
          ...requestObject,
          outputScopeSelectionFrame: undefined,
          // Grammar always completes the same predicate. Result scope is not
          // an input to derivation, Valence, participant, or voice selection.
          outputScope: "single",
          requestedVoice: requestObject.requestedVoice || requestObject.voice || "active",
          voice: requestObject.voice || "active"
        });
        const blockReason = missingCapabilities.length
          ? "classical-vnc-application-required-capabilities-unavailable"
          : rejectedAuthorityFields.length
            ? "classical-vnc-paradigm-plan-caller-authority-rejected"
            : "";
        if (blockReason) {
          return Object.freeze({
            kind: "classical-nahuatl-vnc-paradigm-generation-plan",
            version: 1,
            authorizationStatus: "blocked",
            blockReason,
            rejectedAuthorityFields,
            typedSourceAuthority: false,
            callerSuppliedAuthorityAccepted: false,
            curriculumOrderAuthority: false,
            lessonMetadataAuthority: false,
            formulaStringAuthority: false,
            surfaceStringAuthority: false
          });
        }
        const completedApplicationFrame = continuationSourceResultFrame
          ? continueFromResult(
            continuationSourceResultFrame,
            scalarSeedRequest,
          )
          : evaluate(scalarSeedRequest);
        const normalizedRequest = completedApplicationFrame?.normalizedRequest
          || normalizeClassicalNahuatlVncApplicationRequest(
            scalarSeedRequest,
          );
        const directPlan = normalizedRequest.derivationType === "direct";
        const sourceMachineryFrame =
          completedApplicationFrame?.resultFrame?.sourceMachineryFrame || null;
        const directSourceMachineryAuthorized = directPlan
          && isClassicalNahuatlVncApplicationActiveFrameAuthorized(
            sourceMachineryFrame
          );
        const sourceAnalysisFrame =
          completedApplicationFrame?.resultFrame?.sourceAnalysisFrame || null;
        const derivedApplicationFrame = directPlan
          ? null
          : completedApplicationFrame;
        const derivedApplicationAuthorized = Boolean(derivedApplicationFrame
          && derivedApplicationFrame.authorizationStatus === "authorized"
          && derivedApplicationFrame.resultFrame?.authorizationStatus === "authorized");
        const completedApplicationAuthorized = Boolean(completedApplicationFrame
          && completedApplicationFrame.authorizationStatus === "authorized"
          && completedApplicationFrame.resultFrame?.authorizationStatus === "authorized"
          && isClassicalNahuatlVncApplicationFrame(completedApplicationFrame));
        if (
          directPlan
            ? !directSourceMachineryAuthorized
              || !completedApplicationAuthorized
            : !derivedApplicationAuthorized
              || !completedApplicationAuthorized
        ) {
          return Object.freeze({
            kind: "classical-nahuatl-vnc-paradigm-generation-plan",
            version: 1,
            authorizationStatus: "blocked",
            blockReason: directPlan
              ? !directSourceMachineryAuthorized
                ? getClassicalNahuatlVncApplicationBlockReason(sourceMachineryFrame, "classical-vnc-paradigm-plan-source-not-authorized")
                : getClassicalNahuatlVncApplicationBlockReason(completedApplicationFrame, "classical-vnc-paradigm-plan-application-not-authorized")
              : getClassicalNahuatlVncApplicationBlockReason(derivedApplicationFrame, "classical-vnc-paradigm-plan-derived-application-not-authorized"),
            typedSourceAuthority: false,
            callerSuppliedAuthorityAccepted: false,
            curriculumOrderAuthority: false,
            lessonMetadataAuthority: false,
            formulaStringAuthority: false,
            surfaceStringAuthority: false
          });
        }
        const canonicalCompletedDescriptor = directPlan
          ? getClassicalNahuatlVncApplicationCanonicalActivePredicateDescriptor(sourceMachineryFrame, {
            stem: normalizedRequest.sourceStem,
            verbClass: normalizedRequest.verbClass,
            sourceValence: normalizedRequest.sourceObjectRequests.length > 1 ? "multiple-object" : normalizedRequest.sourceValence,
            objectRequests: normalizedRequest.sourceObjectRequests
          })
          : null;
        const canonicalSourceStem = directPlan
          ? canonicalCompletedDescriptor?.stem
            || sourceMachineryFrame?.stem
            || normalizedRequest.sourceStem
          : sourceAnalysisFrame?.sourceStem
            || derivedApplicationFrame.resultFrame?.derivationOperationFrame
              ?.sourceStem
            || normalizedRequest.sourceStem;
        const derivedTargetStem = directPlan
          ? canonicalCompletedDescriptor?.stem || canonicalSourceStem
          : derivedApplicationFrame.normalizedRequest?.targetStem
            || derivedApplicationFrame.controlFrame?.derivedStem
            || "";
        const derivedTargetClass = directPlan
          ? canonicalCompletedDescriptor?.verbClass || normalizedRequest.verbClass
          : derivedApplicationFrame.normalizedRequest?.targetClass || derivedApplicationFrame.controlFrame?.derivedClass || normalizedRequest.verbClass;
        const derivedTargetValence = directPlan
          ? canonicalCompletedDescriptor?.sourceValence || (normalizedRequest.sourceObjectRequests.length > 1 ? "multiple-object" : normalizedRequest.sourceValence)
          : derivedApplicationFrame.normalizedRequest?.targetValence || normalizedRequest.sourceValence;
        const targetObjectRequests = Object.freeze((directPlan
          ? normalizedRequest.sourceObjectRequests
          : getClassicalNahuatlVncApplicationOperationObjectRequests(derivedApplicationFrame.resultFrame?.derivationOperationFrame)
        ).map(cloneClassicalNahuatlVncApplicationCompactValue));
        const selectedVoice = completedApplicationFrame.controlFrame?.selectedVoice || normalizedRequest.voice;
        const selectedVoiceOperation = completedApplicationFrame.controlFrame?.selectedVoiceOperation || selectedVoice;
        const selectedNonactiveOptionId = completedApplicationFrame.controlFrame?.selectedNonactiveOptionId || "";
        const selectedDerivation =
          completedApplicationFrame.controlFrame?.derivationType
          || normalizedRequest.derivationType;
        const selectedDerivationOptionId =
          completedApplicationFrame.controlFrame?.selectedDerivationOptionId
          || "";
        const selectedSourceVoice =
          completedApplicationFrame.controlFrame?.selectedSourceVoice
          || normalizedRequest.sourceVoice;
        const selectedSourceNonactiveOptionId =
          completedApplicationFrame.controlFrame
            ?.selectedSourceNonactiveOptionId
          || "";
        const participantBindings = Object.freeze(targetObjectRequests.map(objectRequest => Object.freeze({
          objectId: objectRequest.objectId || "",
          objectKind: objectRequest.objectKind || "",
          binding: objectRequest.objectKind === "reflexive" ? "subject-coordinate" : "fixed-participant",
          objectPerson: objectRequest.objectKind === "specific-projective" ? objectRequest.objectPerson || "" : ""
        })));
        const predicateSignature = JSON.stringify({
          sourceStem: canonicalSourceStem,
          sourceLexemeId: normalizedRequest.sourceLexemeId,
          sourceClass: normalizedRequest.verbClass,
          sourceValence: normalizedRequest.sourceValence,
          sourceObjectRequests: normalizedRequest.sourceObjectRequests,
          derivationType: selectedDerivation,
          selectedDerivationOptionId,
          targetStem: derivedTargetStem,
          targetClass: derivedTargetClass,
          targetValence: derivedTargetValence,
          targetObjectRequests,
          participantBindings,
          voice: selectedVoice,
          selectedVoiceOperation,
          selectedNonactiveOptionId
        });
        const sourceOperationFields = {
          sourceStem: canonicalSourceStem,
          sourceLexemeId: normalizedRequest.sourceLexemeId,
          sourceClass: normalizedRequest.verbClass,
          sourceValence: normalizedRequest.sourceValence,
          sourceObjectRequests: normalizedRequest.sourceObjectRequests,
          requestedDerivation: normalizedRequest.requestedDerivation,
          selectedDerivation,
          selectedDerivationOptionId,
          requestedSourceVoice: normalizedRequest.requestedSourceVoice,
          selectedSourceVoice,
          selectedSourceNonactiveOptionId,
          requestedVoice: normalizedRequest.requestedVoice,
          selectedVoice,
          selectedVoiceOperation,
          selectedNonactiveOptionId,
        };
        const sourceOperationSignature =
          buildClassicalNahuatlVncApplicationSourceOperationSignature(
            sourceOperationFields,
          );
        const plan = Object.freeze({
          kind: "classical-nahuatl-vnc-paradigm-generation-plan",
          version: 1,
          authorizationStatus: "authorized",
          blockReason: "",
          generationEpoch: `classical-vnc-application-${CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION}`,
          sourceStem: canonicalSourceStem,
          sourceLexemeId: normalizedRequest.sourceLexemeId,
          sourceClass: normalizedRequest.verbClass,
          sourceValence: normalizedRequest.sourceValence,
          sourceObjectRequests: normalizedRequest.sourceObjectRequests,
          sourceAnalysisSignature: directPlan
            ? sourceAnalysisFrame?.canonicalSignature
              || sourceAnalysisFrame?.sourceSignature
              || getClassicalNahuatlVncApplicationTypedIdentity(
                completedApplicationFrame.resultFrame?.finalTypedVncSlotFrame
              )
              || ""
            : derivedApplicationFrame.resultFrame?.sourceAnalysisFrame?.canonicalSignature || derivedApplicationFrame.resultFrame?.sourceAnalysisFrame?.sourceSignature || "",
          requestedDerivation: normalizedRequest.requestedDerivation,
          selectedDerivation,
          derivationType: selectedDerivation,
          selectedDerivationOptionId,
          requestedSourceVoice: normalizedRequest.requestedSourceVoice,
          selectedSourceVoice,
          selectedSourceNonactiveOptionId,
          requestedVoice: normalizedRequest.requestedVoice,
          targetStem: derivedTargetStem,
          targetClass: derivedTargetClass,
          targetValence: derivedTargetValence,
          targetObjectRequests,
          participantBindings,
          conjugatablePredicateKind: "classical-nahuatl-vnc-conjugatable-predicate",
          predicateSignature,
          sourceOperationSignature,
          voice: selectedVoice,
          selectedVoice,
          selectedVoiceOperation,
          selectedNonactiveOptionId,
          outputScope: "paradigm",
          normalizedBaseRequest: normalizedRequest,
          coordinateFields: Object.freeze(["subject", "mood", "tense"]),
          typedSourceAuthority: true,
          callerSuppliedAuthorityAccepted: false,
          curriculumOrderAuthority: false,
          lessonMetadataAuthority: false,
          formulaStringAuthority: false,
          surfaceStringAuthority: false
        });
        issuedParadigmPlans.add(plan);
        paradigmPlanInternals.set(plan, Object.freeze({
          scalarBasisFrame: completedApplicationFrame,
          continuationSourceResultFrame,
        }));
        classicalNahuatlVncApplicationBuiltParadigmPlans.add(plan);
        return plan;
      });
      const prepareParadigm = (request = {}) =>
        prepareParadigmWithContinuationSource(request);
      const prepareParadigmFromResult = (
        sourceResultFrame = null,
        request = {},
      ) => {
        if (!getContinuationSourceForResult(sourceResultFrame)) {
          return null;
        }
        return prepareParadigmWithContinuationSource(
          request,
          sourceResultFrame,
        );
      };
      const projectParadigmCoordinates = (plan = null, coordinates = []) => runClassicalNahuatlVncApplicationValidationTransaction(() => {
        if (!issuedParadigmPlans.has(plan) || !isClassicalNahuatlVncParadigmPlan(plan)) {
          return Object.freeze([Object.freeze({
            kind: "classical-nahuatl-vnc-paradigm-coordinate-frame",
            version: 1,
            authorizationStatus: "blocked",
            blockReason: "classical-vnc-paradigm-plan-not-issued-by-service",
            typedFrameAuthority: true,
            callerSuppliedAuthorityAccepted: false,
            curriculumOrderAuthority: false,
            lessonMetadataAuthority: false,
            formulaStringAuthority: false,
            surfaceStringAuthority: false
          })]);
        }
        if (!Array.isArray(coordinates)) return Object.freeze([]);
        const allowedCoordinateFields = new Set(plan.coordinateFields);
        const planInternals = paradigmPlanInternals.get(plan) || {};
        return Object.freeze(coordinates.map((coordinate, coordinateIndex) => {
          const coordinateObject = coordinate && typeof coordinate === "object" ? coordinate : {};
          const rejectedFields = Object.keys(coordinateObject).filter(field => !allowedCoordinateFields.has(field));
          const rejectedAuthorityFields = Object.freeze(Array.from(new Set([
            ...getClassicalNahuatlVncApplicationPresentFields(coordinateObject, CLASSICAL_NAHUATL_VNC_APPLICATION_CALLER_AUTHORITY_FIELDS),
            ...getClassicalNahuatlVncApplicationCurriculumCarrierFields(coordinateObject),
          ])));
          if (rejectedFields.length || rejectedAuthorityFields.length) {
            const blockedCoordinate = Object.freeze({
              kind: "classical-nahuatl-vnc-paradigm-coordinate-frame",
              version: 1,
              authorizationStatus: "blocked",
              blockReason: "classical-vnc-paradigm-coordinate-fields-rejected",
              coordinateIndex,
              rejectedFields: Object.freeze(Array.from(new Set([...rejectedFields, ...rejectedAuthorityFields]))),
              typedFrameAuthority: true,
              callerSuppliedAuthorityAccepted: false,
              curriculumOrderAuthority: false,
              lessonMetadataAuthority: false,
              formulaStringAuthority: false,
              surfaceStringAuthority: false
            });
            classicalNahuatlVncApplicationBuiltParadigmCoordinates.add(blockedCoordinate);
            return blockedCoordinate;
          }
          const coordinateSentenceOptions = buildClassicalNahuatlVncApplicationParadigmCoordinateSentenceOptions(
            plan.normalizedBaseRequest.sentenceOptions,
            coordinateObject
          );
          const scalarCoordinateRequest =
            buildClassicalNahuatlVncApplicationScalarCoordinateRequest(
              planInternals.scalarBasisFrame,
              coordinateObject,
              coordinateSentenceOptions,
            );
          const scalarApplicationFrame =
            planInternals.continuationSourceResultFrame
              ? continueFromResult(
                planInternals.continuationSourceResultFrame,
                scalarCoordinateRequest,
              )
              : evaluate(scalarCoordinateRequest);
          const normalizedCoordinateRequest = scalarApplicationFrame?.normalizedRequest
            || normalizeClassicalNahuatlVncApplicationRequest({});
          const scalarResultFrame = scalarApplicationFrame?.resultFrame || null;
          // Every table row is the presentation projection of the same scalar
          // evaluator used for the selected result. A coordinate cannot rebuild
          // morphology, voice, derivation, or boundary realization locally.
          const machineryFrame = scalarResultFrame?.selectedMachineryFrame || null;
          const typedSlotFrame = scalarResultFrame?.finalTypedVncSlotFrame || null;
          const lesson11ParadigmPlan = machineryFrame?.lesson11ParadigmPlan || null;
          const finiteSurfaceFrame = scalarResultFrame?.finiteSurfaceFrame || null;
          const authorizationStatus = scalarApplicationFrame?.authorizationStatus === "authorized"
            && scalarResultFrame?.authorizationStatus === "authorized"
            && finiteSurfaceFrame
            && dependencySource.isClassicalNahuatlVncFiniteSurfaceFrame(finiteSurfaceFrame) === true
            ? "authorized"
            : "blocked";
          const paradigmTense = lesson11ParadigmPlan?.paradigmTense || normalizedCoordinateRequest.tense;
          const semanticTenseValue = lesson11ParadigmPlan?.semanticTenseValue
            || lesson11ParadigmPlan?.requestedSemanticTense
            || normalizedCoordinateRequest.tense;
          const conditionedParadigmCellFrame = authorizationStatus === "authorized"
            ? finiteSurfaceFrame.conditionedParadigmCellFrame || null
            : null;
          const validatedConditionedParadigmCellFrame = conditionedParadigmCellFrame
            ? dependencySource.assertRegisteredGrammarContract(
              dependencySource.getDefaultGrammarContractRegistry(),
              conditionedParadigmCellFrame,
              {
                contractKind: "classical-nahuatl-vnc-conditioned-paradigm-cell-frame",
                version: 1
              }
            )
            : null;
          const coordinateSentenceSurfaceFrame = authorizationStatus === "authorized"
            ? getClassicalNahuatlVncSentenceSurfaceFrameFromMachinery(
              machineryFrame
            )
            : null;
          const coordinateFormulaRealization = authorizationStatus === "authorized"
            ? scalarResultFrame.formulaRealization
            : "";
          const coordinateSurfaceRealization = authorizationStatus === "authorized"
            ? scalarResultFrame.surfaceRealization
            : "";
          const coordinateSentenceFormulaDisplay = authorizationStatus === "authorized"
            ? buildClassicalNahuatlVncSentenceFormulaRealization(
              coordinateSentenceSurfaceFrame,
              coordinateFormulaRealization
            )
            : "";
          const coordinateSentenceSurfaceDisplay = authorizationStatus === "authorized"
            ? buildClassicalNahuatlVncSentenceSurfaceRealization(
              coordinateSentenceSurfaceFrame,
              coordinateSurfaceRealization
            )
            : "";
          const coordinateSentenceFormulaAttachment =
            authorizationStatus === "authorized"
              ? getClassicalNahuatlVncSentenceFormulaAttachment(
                coordinateSentenceSurfaceFrame
              )
              : "";
          const conditionedSentenceRealizations = authorizationStatus === "authorized"
            ? (
              validatedConditionedParadigmCellFrame
                ?.leastCommonMultiple?.selectedRealizations
              || []
            ).map(realization => ({
              variantId: realization.variantId || "",
              formulaRealization: realization.formulaRealization || "",
              surfaceRealization: realization.surfaceRealization || "",
              sentenceFormulaDisplay:
                buildClassicalNahuatlVncSentenceFormulaRealization(
                  coordinateSentenceSurfaceFrame,
                  realization.formulaRealization || ""
                ),
              sentenceSurfaceDisplay:
                buildClassicalNahuatlVncSentenceSurfaceRealization(
                  coordinateSentenceSurfaceFrame,
                  realization.surfaceRealization || ""
                )
            }))
            : [];
          const coordinateFrame = {
            kind: "classical-nahuatl-vnc-paradigm-coordinate-frame",
            version: 1,
            authorizationStatus,
            blockReason: authorizationStatus === "authorized"
              ? ""
              : scalarApplicationFrame?.blockReason
                || scalarResultFrame?.blockReason
                || getClassicalNahuatlVncApplicationBlockReason(
                  machineryFrame,
                  finiteSurfaceFrame?.blockReason
                    || "classical-vnc-paradigm-coordinate-not-authorized"
                ),
            coordinateIndex,
            generationEpoch: plan.generationEpoch,
            paradigmPlan: plan,
            sourceAnalysisSignature: plan.sourceAnalysisSignature,
            sourceOperationSignature: plan.sourceOperationSignature,
            predicateSignature: plan.predicateSignature,
            sourceStem: normalizedCoordinateRequest.sourceStem,
            sourceLexemeId: normalizedCoordinateRequest.sourceLexemeId,
            sourceClass: normalizedCoordinateRequest.verbClass,
            sourceValence: normalizedCoordinateRequest.sourceValence,
            subject: normalizedCoordinateRequest.subject,
            mood: normalizedCoordinateRequest.mood,
            requestedTense: normalizedCoordinateRequest.tense,
            tense: paradigmTense,
            paradigmTense,
            semanticTenseValue,
            morphologicalMood: lesson11ParadigmPlan?.morphologicalMood || normalizedCoordinateRequest.mood,
            morphologicalTense: lesson11ParadigmPlan?.morphologicalTense || normalizedCoordinateRequest.tense,
            conditionedParadigmCellFrame: authorizationStatus === "authorized"
              ? validatedConditionedParadigmCellFrame
              : null,
            objectKind: plan.targetObjectRequests?.[0]?.objectKind || normalizedCoordinateRequest.objectKind,
            objectPerson: plan.targetObjectRequests?.find(request => request.objectKind === "specific-projective")?.objectPerson || "",
            requestedDerivation: plan.requestedDerivation,
            derivationType: plan.selectedDerivation,
            selectedDerivationOptionId: plan.selectedDerivationOptionId,
            requestedSourceVoice: plan.requestedSourceVoice,
            selectedSourceVoice: plan.selectedSourceVoice,
            selectedSourceNonactiveOptionId:
              plan.selectedSourceNonactiveOptionId,
            requestedVoice: plan.requestedVoice,
            selectedVoice: plan.selectedVoice,
            selectedVoiceOperation: plan.selectedVoiceOperation,
            selectedNonactiveOptionId: plan.selectedNonactiveOptionId,
            // A row is the projection of the live scalar coordinate, whose
            // source normalization can select the canonical allomorph.  Keep
            // that executed target rather than the plan's entered spelling so
            // the row validates against the scalar result it actually records.
            targetStem: normalizedCoordinateRequest.targetStem,
            targetValence: plan.targetValence,
            typedSlotFrame: authorizationStatus === "authorized"
              ? typedSlotFrame
              : null,
            typedSlotFrameKind: authorizationStatus === "authorized" ? typedSlotFrame?.kind || "" : "",
            scalarApplicationFrame,
            scalarEquivalent: true,
            formulaRealization: coordinateFormulaRealization,
            surfaceRealization: coordinateSurfaceRealization,
            sentenceFormulaDisplay: coordinateSentenceFormulaDisplay,
            sentenceSurfaceDisplay: coordinateSentenceSurfaceDisplay,
            sentenceFormulaAttachment:
              coordinateSentenceFormulaAttachment,
            sentenceSurfaceFrame: authorizationStatus === "authorized"
              ? coordinateSentenceSurfaceFrame
              : null,
            conditionedSentenceRealizations,
            typedFrameAuthority: true,
            callerSuppliedAuthorityAccepted: false,
            curriculumOrderAuthority: false,
            lessonMetadataAuthority: false,
            formulaStringAuthority: false,
            surfaceStringAuthority: false
          };
          deepFreezeClassicalNahuatlVncApplicationValue(coordinateFrame);
          classicalNahuatlVncApplicationBuiltParadigmCoordinates.add(coordinateFrame);
          return coordinateFrame;
        }));
      });
      const service = Object.freeze({
        kind: "classical-nahuatl-vnc-application-service",
        version: CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,
        authorizationStatus: serviceStatus,
        blockReason: missingCapabilities.length ? "classical-vnc-application-required-capabilities-unavailable" : "",
        requiredCapabilities: CLASSICAL_NAHUATL_VNC_APPLICATION_REQUIRED_CAPABILITIES,
        missingCapabilities,
        evaluate,
        continueFromResult,
        getContinuationSourceConstituents,
        prepareParadigm,
        prepareParadigmFromResult,
        projectParadigmCoordinates,
        inflectPredicateCoordinate: (plan = null, coordinate = {}) => projectParadigmCoordinates(plan, [coordinate])[0] || null
      });
      if (missingCapabilities.length) {
        return service;
      }
      return dependencySource.assertRegisteredGrammarContract(dependencySource.getDefaultGrammarContractRegistry(), service, {
        contractKind: "classical-nahuatl-vnc-application-service",
        version: 1
      });
    }
    function evaluateClassicalNahuatlVncApplication(
      request = {},
      continuationSourceResultOrDependencies = null,
    ) {
      if (
        isClassicalNahuatlVncApplicationResultFrame(
          continuationSourceResultOrDependencies,
        )
      ) {
        return getClassicalNahuatlVncApplicationSharedService()
          .continueFromResult(
            continuationSourceResultOrDependencies,
            request,
          );
      }
      if (!continuationSourceResultOrDependencies) {
        return getClassicalNahuatlVncApplicationSharedService()
          .evaluate(request);
      }
      const dependencySource =
        continuationSourceResultOrDependencies
        && typeof continuationSourceResultOrDependencies === "object"
          ? continuationSourceResultOrDependencies
          : getClassicalNahuatlVncApplicationRuntimeTarget();
      return createClassicalNahuatlVncApplication(
        dependencySource || {},
      ).evaluate(request);
    }
    function getClassicalNahuatlVncApplicationSharedService() {
      if (!classicalNahuatlVncApplicationSharedService) {
        classicalNahuatlVncApplicationSharedService = createClassicalNahuatlVncApplication(getClassicalNahuatlVncApplicationRuntimeTarget() || {});
      }
      return classicalNahuatlVncApplicationSharedService;
    }
    function getClassicalNahuatlVncContinuationSourceConstituents(
      sourceResultFrame = null,
    ) {
      return getClassicalNahuatlVncApplicationSharedService()
        .getContinuationSourceConstituents(sourceResultFrame);
    }
    function prepareClassicalNahuatlVncParadigmPlan(
      request = {},
      continuationSourceResultFrame = null,
    ) {
      const service = getClassicalNahuatlVncApplicationSharedService();
      return continuationSourceResultFrame
        ? service.prepareParadigmFromResult(
          continuationSourceResultFrame,
          request,
        )
        : service.prepareParadigm(request);
    }
    function projectClassicalNahuatlVncParadigmCoordinates(plan = null, coordinates = []) {
      return getClassicalNahuatlVncApplicationSharedService().projectParadigmCoordinates(plan, coordinates);
    }
    function inflectClassicalNahuatlVncPredicateCoordinate(plan = null, coordinate = {}) {
      return getClassicalNahuatlVncApplicationSharedService().inflectPredicateCoordinate(plan, coordinate);
    }
    function installClassicalNahuatlVncApplicationClassicGlobals(explicitTarget = null) {
      const globalTarget = getClassicalNahuatlVncApplicationRuntimeTarget(explicitTarget);
      if (!globalTarget) {
        return null;
      }
      const service = getClassicalNahuatlVncApplicationSharedService();
      Object.assign(globalTarget, {
        CLASSICAL_NAHUATL_VNC_APPLICATION_SOURCE_VOICES,
        createClassicalNahuatlVncApplication,
        evaluateClassicalNahuatlVncApplication: service.evaluate,
        getClassicalNahuatlVncContinuationSourceConstituents,
        prepareClassicalNahuatlVncParadigmPlan,
        projectClassicalNahuatlVncParadigmCoordinates,
        inflectClassicalNahuatlVncPredicateCoordinate,
        isClassicalNahuatlVncApplicationResultFrame,
        isClassicalNahuatlVncApplicationFrame,
        interpretClassicalNahuatlVncContextualTime,
        isClassicalNahuatlVncContextualTimeFrame,
        interpretClassicalNahuatlVncContextualTimeBatch,
        isClassicalNahuatlVncContextualTimeBatch,
        buildClassicalNahuatlOrderedVoiceVncApplicationFrame,
        isClassicalNahuatlOrderedVoiceVncApplicationFrame,
        buildClassicalNahuatlVncSentenceFormulaRealization,
        buildClassicalNahuatlVncSentenceSurfaceRealization,
        getClassicalNahuatlVncSentenceFormulaAttachment,
        buildClassicalNahuatlVncSentenceResultFrame,
        isClassicalNahuatlVncSentenceResultFrame,
        isClassicalNahuatlVncParadigmPlan,
        isClassicalNahuatlVncParadigmCoordinateFrame,
        buildClassicalNahuatlVncDerivationExplanationProjection,
        buildClassicalNahuatlVncSourceConstitutionProjection,
        getClassicalNahuatlVncApplicationAllowedVoices,
        getClassicalNahuatlVncApplicationPublicAllowedVoices,
        buildClassicalNahuatlVncApplicationNonactiveFormationInventory,
        normalizeClassicalNahuatlVncApplicationRequest,
        buildClassicalNahuatlVncApplicationSourceVoiceMachinery,
        classicalNahuatlVncApplication: service
      });
      return globalTarget;
    }
    if (typeof targetObject.module !== "undefined" && targetObject.module.exports) {
      targetObject.module.exports = {
        CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,
        CLASSICAL_NAHUATL_VNC_APPLICATION_REQUIRED_CAPABILITIES,
        CLASSICAL_NAHUATL_VNC_APPLICATION_VOICES,
        CLASSICAL_NAHUATL_VNC_APPLICATION_SOURCE_VOICES,
        CLASSICAL_NAHUATL_VNC_APPLICATION_DERIVATIONS,
        CLASSICAL_NAHUATL_VNC_APPLICATION_CALLER_AUTHORITY_FIELDS,
        CLASSICAL_NAHUATL_VNC_APPLICATION_DERIVATION_REFERENCE_DIMENSIONS,
        normalizeClassicalNahuatlVncApplicationRequest,
        getClassicalNahuatlVncApplicationAllowedVoices,
        getClassicalNahuatlVncApplicationPublicAllowedVoices,
        buildClassicalNahuatlVncApplicationNonactiveFormationInventory,
        buildClassicalNahuatlVncApplicationSourceVoiceMachinery,
        getClassicalNahuatlVncApplicationMissingCapabilities,
        createClassicalNahuatlVncApplication,
        evaluateClassicalNahuatlVncApplication,
        getClassicalNahuatlVncContinuationSourceConstituents,
        prepareClassicalNahuatlVncParadigmPlan,
        projectClassicalNahuatlVncParadigmCoordinates,
        isClassicalNahuatlVncParadigmPlan,
        isClassicalNahuatlVncParadigmCoordinateFrame,
        isClassicalNahuatlVncApplicationResultFrame,
        isClassicalNahuatlVncApplicationFrame,
        interpretClassicalNahuatlVncContextualTime,
        isClassicalNahuatlVncContextualTimeFrame,
        interpretClassicalNahuatlVncContextualTimeBatch,
        isClassicalNahuatlVncContextualTimeBatch,
        buildClassicalNahuatlOrderedVoiceVncApplicationFrame,
        isClassicalNahuatlOrderedVoiceVncApplicationFrame,
        buildClassicalNahuatlVncSentenceResultFrame,
        isClassicalNahuatlVncSentenceResultFrame,
        buildClassicalNahuatlVncDerivationExplanationProjection,
        buildClassicalNahuatlVncSourceConstitutionProjection,
        installClassicalNahuatlVncApplicationClassicGlobals
      };
    }
    if (typeof targetObject.window !== "undefined") {
      installClassicalNahuatlVncApplicationClassicGlobals();
    }

    const api = {};
    Object.defineProperty(api, "CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_VNC_APPLICATION_REQUIRED_CAPABILITIES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_VNC_APPLICATION_REQUIRED_CAPABILITIES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_VNC_APPLICATION_VOICES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_VNC_APPLICATION_VOICES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_VNC_APPLICATION_SOURCE_VOICES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_VNC_APPLICATION_SOURCE_VOICES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_VNC_APPLICATION_DERIVATIONS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_VNC_APPLICATION_DERIVATIONS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_VNC_APPLICATION_CALLER_AUTHORITY_FIELDS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_VNC_APPLICATION_CALLER_AUTHORITY_FIELDS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_VNC_APPLICATION_FUTURE_INTENT_FIELDS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_VNC_APPLICATION_FUTURE_INTENT_FIELDS; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_VNC_APPLICATION_DERIVATION_REFERENCE_DIMENSIONS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_VNC_APPLICATION_DERIVATION_REFERENCE_DIMENSIONS; },
    });
    api.normalizeClassicalNahuatlVncApplicationToken = normalizeClassicalNahuatlVncApplicationToken;
    api.normalizeClassicalNahuatlVncApplicationStem = normalizeClassicalNahuatlVncApplicationStem;
    api.hasClassicalNahuatlVncApplicationValue = hasClassicalNahuatlVncApplicationValue;
    api.getClassicalNahuatlVncApplicationPresentFields = getClassicalNahuatlVncApplicationPresentFields;
    api.getClassicalNahuatlVncApplicationRuntimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget;
    api.getClassicalNahuatlVncApplicationMissingCapabilities = getClassicalNahuatlVncApplicationMissingCapabilities;
    api.getClassicalNahuatlVncApplicationObjectKind = getClassicalNahuatlVncApplicationObjectKind;
    api.normalizeClassicalNahuatlVncApplicationDerivation = normalizeClassicalNahuatlVncApplicationDerivation;
    api.normalizeClassicalNahuatlVncApplicationObjectRequest = normalizeClassicalNahuatlVncApplicationObjectRequest;
    api.getClassicalNahuatlVncApplicationSourceObjectRequests = getClassicalNahuatlVncApplicationSourceObjectRequests;
    api.getClassicalNahuatlVncApplicationValenceForObject = getClassicalNahuatlVncApplicationValenceForObject;
    api.getClassicalNahuatlVncApplicationRequestValue = getClassicalNahuatlVncApplicationRequestValue;
    api.buildClassicalNahuatlVncApplicationSentenceOptions = buildClassicalNahuatlVncApplicationSentenceOptions;
    api.normalizeClassicalNahuatlVncApplicationRequest = normalizeClassicalNahuatlVncApplicationRequest;
    api.getClassicalNahuatlVncApplicationAllowedVoices = getClassicalNahuatlVncApplicationAllowedVoices;
    api.getClassicalNahuatlVncApplicationPublicAllowedVoices = getClassicalNahuatlVncApplicationPublicAllowedVoices;
    api.buildClassicalNahuatlVncApplicationNonactiveFormationInventory = buildClassicalNahuatlVncApplicationNonactiveFormationInventory;
    api.buildClassicalNahuatlVncApplicationOptions = buildClassicalNahuatlVncApplicationOptions;
    api.buildClassicalNahuatlVncApplicationSourceMachinery = buildClassicalNahuatlVncApplicationSourceMachinery;
    api.buildClassicalNahuatlVncApplicationSourceVoiceMachinery = buildClassicalNahuatlVncApplicationSourceVoiceMachinery;
    api.getClassicalNahuatlVncApplicationOperationObjectRequests = getClassicalNahuatlVncApplicationOperationObjectRequests;
    api.getClassicalNahuatlVncApplicationOperationTargetStem = getClassicalNahuatlVncApplicationOperationTargetStem;
    api.getClassicalNahuatlVncApplicationOperationTargetClass = getClassicalNahuatlVncApplicationOperationTargetClass;
    api.getClassicalNahuatlVncApplicationTargetValence = getClassicalNahuatlVncApplicationTargetValence;
    api.getClassicalNahuatlVncApplicationFinalTypedFrame = getClassicalNahuatlVncApplicationFinalTypedFrame;
    api.isClassicalNahuatlVncApplicationResultFrame = isClassicalNahuatlVncApplicationResultFrame;
    api.isClassicalNahuatlVncApplicationFrame = isClassicalNahuatlVncApplicationFrame;
    api.interpretClassicalNahuatlVncContextualTime =
      interpretClassicalNahuatlVncContextualTime;
    api.isClassicalNahuatlVncContextualTimeFrame =
      isClassicalNahuatlVncContextualTimeFrame;
    api.interpretClassicalNahuatlVncContextualTimeBatch =
      interpretClassicalNahuatlVncContextualTimeBatch;
    api.isClassicalNahuatlVncContextualTimeBatch =
      isClassicalNahuatlVncContextualTimeBatch;
    api.buildClassicalNahuatlOrderedVoiceVncApplicationFrame =
      buildClassicalNahuatlOrderedVoiceVncApplicationFrame;
    api.isClassicalNahuatlOrderedVoiceVncApplicationFrame =
      isClassicalNahuatlOrderedVoiceVncApplicationFrame;
    api.buildClassicalNahuatlVncSentenceFormulaRealization = buildClassicalNahuatlVncSentenceFormulaRealization;
    api.buildClassicalNahuatlVncSentenceSurfaceRealization = buildClassicalNahuatlVncSentenceSurfaceRealization;
    api.getClassicalNahuatlVncSentenceFormulaAttachment = getClassicalNahuatlVncSentenceFormulaAttachment;
    api.buildClassicalNahuatlVncSentenceResultFrame = buildClassicalNahuatlVncSentenceResultFrame;
    api.isClassicalNahuatlVncSentenceResultFrame = isClassicalNahuatlVncSentenceResultFrame;
    api.buildClassicalNahuatlWidowhoodCompoundInterpretationSource = buildClassicalNahuatlWidowhoodCompoundInterpretationSource;
    api.isClassicalNahuatlWidowhoodCompoundInterpretationSource = isClassicalNahuatlWidowhoodCompoundInterpretationSource;
    api.evaluateClassicalNahuatlWidowhoodCompoundInterpretation = evaluateClassicalNahuatlWidowhoodCompoundInterpretation;
    api.isClassicalNahuatlWidowhoodCompoundInterpretationResult = isClassicalNahuatlWidowhoodCompoundInterpretationResult;
    api.isClassicalNahuatlVncParadigmPlan = isClassicalNahuatlVncParadigmPlan;
    api.isClassicalNahuatlVncParadigmCoordinateFrame = isClassicalNahuatlVncParadigmCoordinateFrame;
    api.buildClassicalNahuatlVncDerivationExplanationProjection = buildClassicalNahuatlVncDerivationExplanationProjection;
    api.buildClassicalNahuatlVncSourceConstitutionProjection = buildClassicalNahuatlVncSourceConstitutionProjection;
    api.isClassicalNahuatlVncApplicationActiveFrameAuthorized = isClassicalNahuatlVncApplicationActiveFrameAuthorized;
    api.getClassicalNahuatlVncApplicationBlockReason = getClassicalNahuatlVncApplicationBlockReason;
    api.buildClassicalNahuatlVncApplicationFrame = buildClassicalNahuatlVncApplicationFrame;
    api.createClassicalNahuatlVncApplication = createClassicalNahuatlVncApplication;
    api.evaluateClassicalNahuatlVncApplication = evaluateClassicalNahuatlVncApplication;
    api.getClassicalNahuatlVncContinuationSourceConstituents =
      getClassicalNahuatlVncContinuationSourceConstituents;
    api.prepareClassicalNahuatlVncParadigmPlan = prepareClassicalNahuatlVncParadigmPlan;
    api.projectClassicalNahuatlVncParadigmCoordinates = projectClassicalNahuatlVncParadigmCoordinates;
    api.inflectClassicalNahuatlVncPredicateCoordinate = inflectClassicalNahuatlVncPredicateCoordinate;
    api.installClassicalNahuatlVncApplicationClassicGlobals = installClassicalNahuatlVncApplicationClassicGlobals;
    return api;
}

export function installClassicalNahuatlVncApplicationGlobals(
    targetObject = globalThis,
    installationContext = {},
) {
    const applicationTarget = Object.create(targetObject);
    Object.defineProperties(
      applicationTarget,
      Object.getOwnPropertyDescriptors(
        installationContext?.moduleDependencyCapabilities || {},
      ),
    );
    const api = createClassicalNahuatlVncApplicationModule(applicationTarget);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
