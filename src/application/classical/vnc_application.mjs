// Canonical modern ESM module.
import { isForbiddenClassicalGrammarAuthorityKey } from "../../core/concepts/classical_grammar_foundation.mjs?v=20260811-lesson1-multigroup-024";

import {
  CLASSICAL_NAHUATL_VNC_DERIVATION_TYPES,
  normalizeClassicalNahuatlVncDerivationType,
  validateClassicalNahuatlVncDerivationTypeSelection,
} from "../../core/classical/vnc_derivation_evaluator.mjs?v=20261008-reader-40-9-190&andrewsRelease=20261024-1";
import {
  CLASSICAL_NAHUATL_VNC_CAUSATIVE_SOURCE_VOICES,
  CLASSICAL_NAHUATL_VNC_TARGET_VOICES,
  validateClassicalNahuatlVncVoiceSelection,
} from "../../core/classical/vnc_layer_evaluator.mjs?v=20261001-reader-26-4-optional-weather-2&andrewsRelease=20261024-1";
import {
  buildClassicalResultOutputScopeSelectionFrame,
} from "../../core/output/scope.mjs?v=20260726-lessons2-58-one-system-094";
import {
  buildClassicalNahuatlParticipantFrame,
  isClassicalNahuatlParticipantFrame,
  doesClassicalNahuatlParticipantTransitionRetireSourceRole,
} from "../../core/classical/participant_frame.mjs?v=20260823-passive-formation-continuity-238";
import {resolveReflexiveInterpretationChoice} from "./reflexive_choice_coordination.mjs";

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
    const CLASSICAL_NAHUATL_VNC_APPLICATION_CAUSATIVE_OBJECT_KINDS = Object.freeze(["specific-projective", "reflexive", "nonspecific-human", "nonspecific-nonhuman"]);
    const CLASSICAL_NAHUATL_VNC_APPLICATION_CAUSATIVE_SPECIFIC_SHUNTLINE_REALIZATIONS = Object.freeze(["silent", "sounded"]);
    let classicalNahuatlVncApplicationValidationTransaction = null;
    const classicalNahuatlVncApplicationBuiltResultFrames = new WeakSet();
    const classicalNahuatlVncApplicationBuiltFrames = new WeakSet();
    const classicalNahuatlVncInherentSubjectRoleContextByApplicationFrame = new WeakMap();
    const classicalNahuatlVncInherentSourceRoleByMachinery = new WeakMap();
    const classicalNahuatlVncApplicationPersistentCanonicalResultFrames = new WeakSet();
    const classicalNahuatlVncApplicationPersistentCanonicalFrames = new WeakSet();
    const classicalNahuatlVncApplicationBuiltParadigmPlans = new WeakSet();
    const classicalNahuatlVncApplicationBuiltParadigmCoordinates = new WeakSet();
    const classicalNahuatlVncApplicationIssuedSentenceResultFrames = new WeakSet();
    const classicalNahuatlVncSentenceEnvelopeReceipts = new WeakMap();
    const classicalNahuatlVncSentenceValidationReceipts = new WeakMap();
    const classicalNahuatlVncSentenceImmutableDataGraphs = new WeakSet();
    const classicalNahuatlWidowhoodInterpretationSources = new WeakSet();
    const classicalNahuatlWidowhoodInterpretationResults = new WeakMap();
    const classicalNahuatlOrderedVoiceVncApplicationFrames = new WeakSet();
    const classicalNahuatlOrderedVoiceVncMachineryFrames = new WeakSet();
    const classicalNahuatlContextualTimeFrames = new WeakSet();
    const classicalNahuatlContextualTimeBatchFrames = new WeakSet();
    const classicalNahuatlActiveReflexiveContextualPassiveReadingFrames = new WeakSet();
    const classicalNahuatlImpersonalResultReadingFrames = new WeakSet();
    const classicalNahuatlExtantDestockalMeaningFrames = new WeakSet();
    const classicalNahuatlExtantDestockalReadingFrames = new WeakSet();
    const classicalNahuatlVncMeaningPresentationFrames = new WeakSet();
    const classicalNahuatlExtantDestockalNounRelationFrames = new WeakSet();
    const classicalNahuatlVncContinuationSourceByApplicationFrame =
      new WeakMap();
    const classicalNahuatlVncContinuationSourceByResultFrame =
      new WeakMap();
    const classicalNahuatlVncApplicationFrameByResultFrame =
      new WeakMap();
    const classicalNahuatlVncDirectActiveRecoordinateByResultFrame =
      new WeakMap();
    const classicalNahuatlDenominalCausativeOperationByMachinery = new WeakMap();
    const CLASSICAL_NAHUATL_VNC_TYPED_SOURCE_APPLICATION_BINDING_FRAME_KIND =
      "classical-nahuatl-vnc-typed-source-application-binding-frame";
    const CLASSICAL_NAHUATL_VNC_TYPED_SOURCE_APPLICATION_BINDING_STATUSES =
      Object.freeze(["choices-required", "ready", "rejected"]);
    const CLASSICAL_NAHUATL_VNC_TYPED_SOURCE_APPLICATION_SELECTION_FIELDS =
      Object.freeze([
        "subject",
        "subjectAnimacy",
        "subjectHumanness",
        "mood",
        "tense",
        "admonitivePluralEnding",
        "finiteSingularConnector",
        "requestedDerivation",
        "derivationOptionId",
        "causativeObjectKind",
        "causativeSpecificShuntlineRealization",
        "applicativeObjectKind",
        "applicativeObjectPerson",
        "requestedVoice",
        "requestedImpersonalDerivationPath",
        "nonactiveOptionId",
        "objectInterpretation",
        "silentSpecificObject",
        "tlaFusion",
        "sentenceOptions",
        "directionalIttaContraction",
        "incorporatedAdverb",
        "adverbPosition",
        "rareThirdCausativeMeaningSupported",
        "exceptionalSuffixOrderAuthorized",
      ]);
    const classicalNahuatlVncTypedSourceApplicationBindingFrames =
      new WeakSet();
    const classicalNahuatlVncTypedSourceApplicationBindingContexts =
      new WeakMap();
    const classicalNahuatlVncTypedSourceApplicationExecutedBindings =
      new WeakSet();
    const classicalNahuatlVncTypedSourceApplicationProvenanceBySource =
      new WeakMap();
    const classicalNahuatlVncParticipantProvenanceByMachinery = new WeakMap();
    const classicalNahuatlVncPromotedObjectByVoiceMachinery = new WeakMap();
    const classicalNahuatlHonorificParticipantProvenanceByResult = new WeakMap();
    const classicalNahuatlLateParticipantProvenanceByResult = new WeakMap();
    const CLASSICAL_NAHUATL_VNC_CONTINUATION_BINDING_FRAME_KIND =
      "classical-nahuatl-vnc-continuation-binding-frame";
    const CLASSICAL_NAHUATL_VNC_CONTINUATION_BINDING_OPERATION_IDS =
      Object.freeze([
        "vnc:application",
        "vnc:sentence-result",
        "vnc:ordered-voice-application",
        "vnc:derivational-operation",
      ]);
    const CLASSICAL_NAHUATL_VNC_CONTINUATION_BINDING_STATUSES =
      Object.freeze([
        "ready",
        "choices-required",
        "additional-result-required",
        "rejected",
      ]);
    const classicalNahuatlVncContinuationBindingFrames = new WeakSet();
    const CLASSICAL_NAHUATL_ORDERED_VOICE_VNC_APPLICATION_KIND =
      "classical-nahuatl-ordered-voice-vnc-application-frame";
    const CLASSICAL_NAHUATL_VNC_MEANING_PRESENTATION_FRAME_KIND =
      "classical-nahuatl-vnc-meaning-presentation-frame";
    const CLASSICAL_NAHUATL_ORDERED_VOICE_CALLER_AUTHORITY_FIELDS = Object.freeze([
      "canonicalNonactiveStemRecord",
      "canonicalPassiveApplicationFrame",
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
    const CLASSICAL_NAHUATL_EXTANT_DESTOCKAL_MEANING_LICENSES =
      deepFreezeClassicalNahuatlVncApplicationValue({
        "cn-l24-2459-mini-fused-destockal:fused-destockal-ni-exact": {
          lexemeId: "cn-l24-2459-mini",
          sourceStem: "mī-ni",
          sourceSegments: ["mi", "ī", "ni"],
          targetStem: "mī-n-a",
          targetClass: "B",
          sourceReadings: [{ meaningId: "arrow-pierced" }],
          causativeReadings: [{ meaningId: "pierce-with-arrow" }],
        },
        "cn-l24-2459-xini-fused-destockal:fused-destockal-ni-exact": {
          lexemeId: "cn-l24-2459-xini",
          sourceStem: "xī-ni",
          sourceSegments: ["xi", "ī", "ni"],
          targetStem: "xī-ni-ā",
          targetClass: "C",
          sourceReadings: [
            { meaningId: "collapse-wall", requiredReferentKind: "wall" },
            {
              meaningId: "slide-or-collapse-mountainside",
              requiredReferentKind: "mountainside",
            },
          ],
          causativeReadings: [
            { meaningId: "ravel" },
            {
              meaningId: "rip-out-stitches",
              requiredReferentKind: "stitches",
            },
          ],
        },
        "cn-l24-2459-cehui-fused-destockal:fused-destockal-hui-exact": {
          lexemeId: "cn-l24-2459-cehui",
          sourceStem: "cē-hui",
          sourceSegments: ["ce", "ē", "hui"],
          nounRelation: {
            stem: "ce", nounClass: "tl", readings: ["ice", "icicle"],
          },
          targetStem: "cē-hui-ā",
          targetClass: "C",
          sourceReadings: [
            { meaningId: "become-cold" },
            { meaningId: "go-out-fire", requiredReferentKind: "fire" },
          ],
          causativeReadings: [
            { meaningId: "cause-to-become-cold" },
            { meaningId: "chill" },
            {
              meaningId: "extinguish-flame",
              requiredReferentKind: "fire-or-flame",
            },
          ],
        },
      });
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
    const CLASSICAL_NAHUATL_VNC_APPLICATION_CALLER_AUTHORITY_FIELDS = Object.freeze(["targetStem", "derivedStem", "derivedClass", "nonactiveStem", "perfectiveNonactiveStem", "impersonalStem", "suffixFamily", "selectionAuthority", "semanticSelection", "authorizationStatus", "sourceAuthority", "formula", "selectedFormula", "formulaArtifact", "formulaRealization", "formulaProjection", "surface", "surfaceArtifact", "surfaceRealization", "wordRealization", "writtenProjection", "sentenceRealization", "sentenceProjection", "targetWord", "result", "resultFrame", "canonicalResult", "canonicalSignature", "storedAnswer", "canvasAnswer", "example", "lesson", "lessonId", "lessonNumber", "lessonMetadata", "curriculumOrder", "display", "displayText", "canonicalSourceSelectionFrame", "nonactiveStemRecord", "inherentImpersonalRecord", "tlaImpersonalStemRecord", "pronominalNncCooperationFrame", "sourceVoiceMachineryFrame", "formationSourceMachineryFrame", "sourceMachineryFrame", "sourceAnalysisFrame", "derivationOptionInventory", "derivationOption", "derivedStemOption", "derivationOperationFrame", "participantTransformFrame", "participantRoleTransitionFrame", "reverseSourceAnalyses", "derivedMachineryFrame", "voiceLayerChainFrame", "sourceObjectClusterFrame", "objectClusterFrame", "activeMachineryFrame", "machineryFrame", "selectedMachineryFrame", "typedVncSlotFrame", "lessons2326GrammarFrame", "derivationExplanationProjection", "derivationExplanationFrame", "initialVowelKind", "supportiveInitialI", "sourceInitialIAnalysis", "hostileVoiceLayerTarget", "hostileVoiceLayers", "hostileFormulaArtifact", "hostileSurfaceArtifact", "sourceAttestationFrame", "sourceAttestedObjectFact", "formallyUnjustifiedObject", "sourceObjectCount"]);
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
        // Source is grammatical structure; compound surface writing occurs
        // only after the embed and matrix have been analyzed by their owners.
        ? `${embedStem}-${matrixStem}`
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
      const objectId = normalizeClassicalNahuatlVncApplicationToken(request?.objectId || `source-object-${index + 1}`);
      const nonspecificHuman = objectKind === "nonspecific-human";
      const nonspecificNonhuman = objectKind === "nonspecific-nonhuman";
      return Object.freeze({
        objectId,
        objectKind,
        objectPerson,
        governor,
        derivationalLevel,
        ...(request?.silentSpecificObject === true
          ? { silentSpecificObject: true }
          : {}),
        ...(objectKind === "reflexive" && request?.shuntlineReflexivePosition === "late"
          ? { shuntlineReflexivePosition: "late" } : {}),
        ...(objectKind === "reflexive" && request?.shuntlineReflexiveBoundaryVariant === "ihyana-contracted"
          ? { shuntlineReflexiveBoundaryVariant: "ihyana-contracted" } : {}),
        ...(request?.mainlineLinearPriority === true
          ? { mainlineLinearPriority: true }
          : {}),
        participantFrame: buildClassicalNahuatlParticipantFrame({
          role: governor === "causative" ? "causee" : "object",
          agreement: objectPerson,
          person: request?.person || request?.participantFrame?.person,
          animacy: request?.animacy || request?.participantFrame?.animacy || (nonspecificHuman ? "animate" : "unspecified"),
          humanness: request?.humanness || request?.participantFrame?.humanness || (nonspecificHuman ? "human" : nonspecificNonhuman ? "nonhuman" : "unspecified"),
          number: request?.number || request?.participantFrame?.number,
          specificity: nonspecificHuman || nonspecificNonhuman ? "nonspecific" : "specific",
          referenceId: request?.referenceId || request?.participantFrame?.referenceId || objectId,
        }),
      });
    }
    function getClassicalNahuatlVncApplicationSourceObjectRequests(request = {}, sourceValence = "") {
      const supplied = Array.isArray(request.sourceObjectRequests) ? request.sourceObjectRequests : Array.isArray(request.objectRequests) ? request.objectRequests : null;
      const lexicalSilentSource = normalizeClassicalNahuatlVncApplicationStem(request.sourceStem || request.stem).replaceAll("-", "") === "āyi"
        && !request.sourceEmbedStem && !request.sourceMatrixStem && request.tlaFusion !== true;
      const retainSourceSilence = (object, index) => normalizeClassicalNahuatlVncApplicationObjectRequest({
        ...object,
        ...(lexicalSilentSource && object.objectKind === "specific-projective"
          && (object.objectPerson || object.object) === "3sg" && (object.governor || "directive") === "directive"
          ? { silentSpecificObject: true } : {}),
      }, index);
      if (supplied) {
        return Object.freeze(supplied.map(retainSourceSilence));
      }
      const normalizedValence = normalizeClassicalNahuatlVncApplicationToken(sourceValence);
      if (!normalizedValence || normalizedValence === "intransitive") {
        return Object.freeze([]);
      }
      const objectKind = getClassicalNahuatlVncApplicationObjectKind(normalizedValence, request.objectKind);
      return Object.freeze([retainSourceSilence({
        objectId: "source-object-1",
        objectKind: objectKind === "mainline-reflexive" || objectKind === "shuntline-reflexive" ? "reflexive" : objectKind,
        objectPerson: objectKind === "specific-projective" ? request.objectPerson || request.object || "" : "",
        governor: "directive",
        derivationalLevel: 1,
        silentSpecificObject: request.silentSpecificObject === true,
      }, 0)]);
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
        punctuationMode: getToken("punctuationMode"),
        admonitivePluralEnding: getToken("admonitivePluralEnding"),
        finiteSingularConnector: getToken("finiteSingularConnector"),
        defectiveANegativeVariant: getToken("defectiveANegativeVariant"),
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
    function buildClassicalNahuatlVncSentenceEnvelopeSelections(request = {}) {
      return Object.freeze(Object.fromEntries(
        Object.entries(buildClassicalNahuatlVncApplicationSentenceOptions(request))
          .filter(([key, value]) => !isForbiddenClassicalGrammarAuthorityKey(key)
            && (getClassicalNahuatlVncApplicationRequestValue(request, key) !== undefined
              || value === true || typeof value === "string" && Boolean(value)
              || Array.isArray(value) && value.length > 0)),
      ));
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
        introductoryParticle: ["mā", "tlā", "in-tlā"].includes(inheritedParticle) ? inheritedParticle : "mā",
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
        rareThirdCausativeMeaningSupported:
          normalizedRequest.rareThirdCausativeMeaningSupported === true,
        exceptionalSuffixOrderAuthorized:
          normalizedRequest.exceptionalSuffixOrderAuthorized === true,
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
      rareThirdCausativeMeaningSupported = false,
      exceptionalSuffixOrderAuthorized = false,
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
        rareThirdCausativeMeaningSupported:
          rareThirdCausativeMeaningSupported === true,
        exceptionalSuffixOrderAuthorized:
          exceptionalSuffixOrderAuthorized === true,
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
      const sourceRecordStem = normalizeClassicalNahuatlVncApplicationStem(
        sourceRecord?.stem || "",
      );
      // Quantity-neutral inventory lookup is a source-entry convenience, not
      // authority to overwrite the initial-i analysis of a differently typed
      // Source. Exact catalogued shapes keep their owner fact; an open typed
      // quantity variant keeps its explicit Source analysis.
      const sourceAnalysis = sourceRecordStem === stem
        ? sourceRecord?.initialIAnalysis || null
        : null;
      const kind = ["real", "supportive", "contextual"].includes(sourceAnalysis?.kind) ? sourceAnalysis.kind : "unresolved";
      const resolvedKind = kind === "contextual"
        ? sourceAnalysis?.resolvedKindsByValence?.[effectiveValence] || sourceAnalysis?.defaultResolvedKind || ""
        : kind;
      if (sourceAnalysis) {
        const genericDefault = sourceAnalysis.ruleId === "cn-l7-78-real-initial-vowel-source-default"
          && sourceRecord.lexicalFactsReadOnly !== true;
        const allowedResolvedKinds = genericDefault
          ? CLASSICAL_NAHUATL_VNC_APPLICATION_SOURCE_INITIAL_I_KINDS
          : sourceAnalysis.allowedResolvedKindsByValence?.[effectiveValence] || [];
        const userSelectionAccepted = allowedResolvedKinds.includes(requestedKind);
        const declaredKind = requestedKind === "contextual"
          ? ["projective-nonhuman", "mainline-reflexive", "human-reciprocal"].includes(effectiveValence)
            ? "supportive" : "real"
          : requestedKind;
        return Object.freeze({
          kind: genericDefault && userSelectionAccepted ? requestedKind : kind,
          resolvedKind: userSelectionAccepted ? declaredKind
            : ["real", "supportive"].includes(resolvedKind) ? resolvedKind : "",
          sourceRecord,
          sourceAuthority: sourceAnalysis.sourceAuthority || "canonical-source-initial-i-analysis-required",
          ruleId: sourceAnalysis.ruleId || "",
          exactWitness: sourceAnalysis.exactWitness || "",
          selectionRequired: false,
          requestedKind,
          selectionSource: genericDefault && userSelectionAccepted ? "user-declared-source" : "canonical-source-record",
          allowedResolvedKinds: Object.freeze([...allowedResolvedKinds]),
          userSelectionAccepted
        });
      }
      const selectedKind =
        CLASSICAL_NAHUATL_VNC_APPLICATION_SOURCE_INITIAL_I_KINDS.includes(
          requestedKind,
        )
          ? requestedKind
          : "";
      const resolvedUserKind = selectedKind === "contextual"
        ? ["projective-nonhuman", "mainline-reflexive", "human-reciprocal"].includes(effectiveValence)
          ? "supportive"
          : "real"
        : selectedKind;
      return Object.freeze({
        kind: selectedKind || "unresolved",
        resolvedKind: resolvedUserKind,
        sourceRecord: null,
        sourceAuthority: selectedKind
          ? "user-declared-source-initial-i"
          : "typed-source-initial-i-analysis-required",
        ruleId: selectedKind === "contextual"
          ? "cn-l2-26-context-sensitive-initial-i-source-selection"
          : selectedKind
            ? "cn-source-initial-i-user-declaration"
            : "cn-source-initial-i-analysis-required",
        exactWitness: selectedKind === "contextual"
          ? "The user declares a context-sensitive source i; licensed support-dropping environments resolve it as supportive, and other environments as real."
          : selectedKind
            ? "The user declares the initial-i status of an unlisted Source VNC."
            : "An unlisted initial-i Source VNC requires a typed initial-i analysis before Grammar can apply.",
        selectionRequired: !selectedKind,
        requestedKind,
        selectionSource: selectedKind
          ? "unlisted-source"
          : "unlisted-source-unresolved",
        defaultedToReal: false,
        userSelectionAccepted: Boolean(selectedKind)
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
      const requestedImpersonalDerivationPath =
        normalizeClassicalNahuatlVncApplicationToken(
          request.requestedImpersonalDerivationPath
          || request.impersonalDerivationPath
          || "direct-active",
        ).toLowerCase();
      const impersonalDerivationPath = [
        "direct-active",
        "passive-then-impersonal",
      ].includes(requestedImpersonalDerivationPath)
        ? requestedImpersonalDerivationPath
        : "";
      const requestedSourceVoice = normalizeClassicalNahuatlVncApplicationToken(request.requestedSourceVoice || request.sourceVoice || "active").toLowerCase();
      const sourceVoiceSelectionFrame = validateClassicalNahuatlVncVoiceSelection(requestedSourceVoice, "causative-source");
      const sourceVoice = sourceVoiceSelectionFrame.voice || "active";
      const verbClassValue = normalizeClassicalNahuatlVncApplicationToken(
        request.verbClass || request.perfectiveClass || "",
      ).toUpperCase();
      const verbClass = ["A", "B", "C", "D"].includes(verbClassValue)
        ? verbClassValue
        : "";
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
      // A direct active finite has no distinct pre-existing Source actor.
      // Default its omitted Source role to the actual authored subject, while
      // preserving every explicit scalar, reference axis and compound coordinate.
      const implicitDirectActiveSourceSubject = derivationType === "direct"
        && normalizedRequestedVoice === "active" && sourceVoice === "active"
        && !sourceSubjectExplicit && !sourceEmbedStem && !sourceMatrixStem
        && !["sourceSubjectPerson", "sourceSubjectAnimacy", "sourceSubjectHumanness",
          "sourceSubjectNumber", "sourceSubjectFrame"].some(field =>
          Object.prototype.hasOwnProperty.call(request, field));
      const requestedSourceSubject = normalizeClassicalNahuatlVncApplicationToken(
        request.sourceSubject || request.embeddedSubject
        || (implicitDirectActiveSourceSubject ? subject : "3sg"));
      const requestedSourceSubjectCategory = derivationType === "causative" && causativeObjectKind === "reflexive"
        ? subject
        : requestedSourceSubject;
      const sourceSubjectAgreementMatch = /^(1|2|3)(sg|pl|common)$/u.exec(requestedSourceSubjectCategory);
      const requestedSourceSubjectPerson = normalizeClassicalNahuatlVncApplicationToken(
        request.sourceSubjectPerson || sourceSubjectAgreementMatch?.[1] || "3",
      );
      const requestedSourceSubjectAnimacy = normalizeClassicalNahuatlVncApplicationToken(
        request.sourceSubjectAnimacy || "animate",
      );
      const requestedSourceSubjectHumanness = normalizeClassicalNahuatlVncApplicationToken(
        request.sourceSubjectHumanness
          || (sourceSubjectAgreementMatch?.[1] === "3" ? "unspecified" : "human"),
      );
      const requestedSourceSubjectNumber = normalizeClassicalNahuatlVncApplicationToken(
        request.sourceSubjectNumber
          || (sourceSubjectAgreementMatch?.[2] === "pl" ? "plural" : "singular"),
      );
      const sourceSubjectFrame = buildClassicalNahuatlParticipantFrame({
        role: "subject",
        agreement: requestedSourceSubjectCategory,
        person: requestedSourceSubjectPerson,
        animacy: requestedSourceSubjectAnimacy,
        humanness: requestedSourceSubjectHumanness,
        number: requestedSourceSubjectNumber,
        hasReferent: true,
        impersonal: false,
      });
      const sourceSubjectPerson = sourceSubjectFrame.person;
      const sourceSubjectAnimacy = sourceSubjectFrame.animacy;
      const sourceSubjectHumanness = sourceSubjectFrame.humanness;
      const sourceSubjectNumber = sourceSubjectFrame.number;
      const sourceSubject = sourceSubjectFrame.morphologicalAgreement;
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
        ...(request.subjectAnimacy || request.subjectHumanness ? {
          subjectAnimacy: normalizeClassicalNahuatlVncApplicationToken(request.subjectAnimacy),
          subjectHumanness: normalizeClassicalNahuatlVncApplicationToken(request.subjectHumanness),
        } : {}),
        sourceSubject,
        sourceSubjectPerson,
        sourceSubjectAnimacy,
        sourceSubjectHumanness,
        sourceSubjectNumber,
        sourceSubjectFrame,
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
        rareThirdCausativeMeaningSupported:
          request.rareThirdCausativeMeaningSupported === true,
        exceptionalSuffixOrderAuthorized:
          request.exceptionalSuffixOrderAuthorized === true,
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
        silentSpecificObject: request.silentSpecificObject === true
          || sourceObjectRequests.some(object => object.silentSpecificObject === true),
        requestedSourceVoice,
        sourceVoice,
        requestedSourceVoiceRecognized: sourceVoiceSelectionFrame.authorizationStatus === "authorized",
        sourceVoiceSelectionFrame,
        sourceNonactiveOptionId: normalizeClassicalNahuatlVncApplicationToken(request.sourceNonactiveOptionId || request.selectedSourceNonactiveOptionId || ""),
        requestedVoice,
        voice: normalizedRequestedVoice,
        requestedImpersonalDerivationPath,
        impersonalDerivationPath,
        requestedImpersonalDerivationPathRecognized:
          Boolean(impersonalDerivationPath),
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
        if (["active", "impersonal"].includes(normalizedRequest.sourceVoice)) {
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
      const voices = canonicalInherentAnalysis?.inherentImpersonalFixedByKnownLexicon === true
        ? []
        : ["active"];
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
      lesson20OptionInventory = null,
      automaticOperationId = ""
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
      const ordinaryOptions = options.filter(option => (
        option.formationKind === "lesson20-nonactive-stem"
      ));
      const automaticOption = options.find(option => (
        option.optionId === automaticOperationId
      )) || (ordinaryOptions.length === 1
        ? ordinaryOptions[0]
        : options.length === 1 ? options[0] : null);
      const selectionRequired = selectorRequired && !automaticOption;
      const nonactiveVoice = normalizedPublicVoice === "passive" || normalizedPublicVoice === "impersonal";
      return Object.freeze({
        kind: "classical-nahuatl-vnc-nonactive-formation-option-inventory",
        version: 1,
        publicVoice: normalizedPublicVoice,
        authorizationStatus: !nonactiveVoice ? "not-applicable" : options.length ? "authorized" : "blocked",
        blockReason: !nonactiveVoice || options.length ? "" : lesson20OptionInventory?.blockReason || "classical-vnc-no-authorized-nonactive-formation",
        options: Object.freeze(options),
        selectorRequired,
        selectionRequired,
        automaticOptionId: automaticOption?.optionId || "",
        defaultOptionId: automaticOption?.optionId || "",
        alternativeSelectionPolicy: automaticOption
          ? "canonical-default-with-user-selectable-alternatives"
          : "explicit-user-choice-required-no-default",
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
        subject: normalizedRequest.derivationType === "direct" && normalizedRequest.sourceVoice === "active"
          && normalizedRequest.subject === normalizedRequest.sourceSubjectFrame?.category
          ? normalizedRequest.sourceSubjectFrame.morphologicalAgreement : normalizedRequest.subject,
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
        punctuationMode: sentenceOptions.punctuationMode,
        admonitivePluralEnding: sentenceOptions.admonitivePluralEnding,
        finiteSingularConnector: sentenceOptions.finiteSingularConnector,
        defectiveANegativeVariant: sentenceOptions.defectiveANegativeVariant,
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
    function buildClassicalNahuatlVncApplicationSourceMachinery(dependencySource = {}, normalizedRequest = {}, { canonicalSelectionForConstitution = false, denominalCausativeOperationFrame = null, formulaProjectionSourceFrame = null } = {}) {
      const sourceObjectRequests = Array.isArray(normalizedRequest.sourceObjectRequests) ? normalizedRequest.sourceObjectRequests : [];
      const sourceAttestation = getClassicalNahuatlVncApplicationCanonicalSourceRecord(
        normalizedRequest.sourceStem, "intransitive")?.sourceAttestedObjectFact;
      if (sourceAttestation && (normalizedRequest.sourceValence !== sourceAttestation.ordinarySourceValence
        || normalizedRequest.verbClass !== sourceAttestation.ordinarySourceClass
        || sourceObjectRequests.length !== sourceAttestation.ordinarySourceObjectCount)) return null;
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
        && !canonicalSelectionForConstitution
        && !normalizedRequest.sourceLexemeId
        && !sourceAttestation
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
        && sourceStem === normalizedRequest.sourceStem
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
        ...(denominalCausativeOperationFrame ? {denominalCausativeOperationFrame} : {}),
        ...(canonicalSourceSelectionFrame
          ? { canonicalSourceSelectionFrame }
          : {})
      };
      let sourceMachineryFrame = dependencySource.buildClassicalNahuatlVerbstemClassFrame(sourceRequest.sourceStem, sourceOptions);
      if (denominalCausativeOperationFrame
        && dependencySource.isClassicalNahuatlDenominalVncOperationFrame?.(denominalCausativeOperationFrame) === true
        && sourceMachineryFrame?.denominalCausativeOperationFrame === denominalCausativeOperationFrame
        && dependencySource.isClassicalNahuatlVerbstemClassFrame?.(sourceMachineryFrame) === true) {
        classicalNahuatlDenominalCausativeOperationByMachinery.set(sourceMachineryFrame, denominalCausativeOperationFrame);
      }
      if (sourceObjectRequests.length > 1 && isClassicalNahuatlVncApplicationActiveFrameAuthorized(sourceMachineryFrame)) {
        sourceMachineryFrame = dependencySource.buildClassicalNahuatlMultipleObjectVncFrame(sourceMachineryFrame, {
          objectRequests: sourceObjectRequests,
          ...(formulaProjectionSourceFrame ? {formulaProjectionSourceFrame} : {}),
          rareThirdCausativeMeaningSupported:
            normalizedRequest.rareThirdCausativeMeaningSupported,
          exceptionalSuffixOrderAuthorized:
            normalizedRequest.exceptionalSuffixOrderAuthorized
        });
      }
      // A monadic finite carrier records third-singular morphology even when
      // its authored object has common number. Bind the existing private Source
      // metadata before any derivation analysis/signature observes this frame.
      const sourceObject = sourceObjectRequests.length === 1 ? sourceObjectRequests[0] : null;
      const lowerObject = sourceMachineryFrame?.priorVncFrame?.objectFrame;
      const participant = sourceObject?.participantFrame;
      if (sourceObject?.objectKind === "specific-projective"
        && sourceObject.objectId === "source-object-1"
        && sourceObject.governor === "directive" && sourceObject.derivationalLevel === 1
        && isClassicalNahuatlVncApplicationActiveFrameAuthorized(sourceMachineryFrame)
        && lowerObject?.objectKind === sourceObject.objectKind
        && isClassicalNahuatlParticipantFrame(participant) && Object.isFrozen(participant)
        && participant.role === "object"
        && [participant.category, participant.requestedAgreement].includes(sourceObject.objectPerson)
        && participant.morphologicalAgreement === lowerObject.objectPerson
        && !classicalNahuatlVncParticipantProvenanceByMachinery.has(sourceMachineryFrame)) {
        // The readonly provenance API admits only frozen machinery. Make the
        // binding visible before derivation signs this Source, rather than
        // changing its participant projection when the Result later freezes it.
        Object.freeze(sourceMachineryFrame);
        classicalNahuatlVncParticipantProvenanceByMachinery.set(sourceMachineryFrame, Object.freeze({
          subjectFrame: normalizedRequest.sourceSubjectFrame,
          objectRequests: Object.freeze([sourceObject]),
        }));
      }
      // The Source subject is also the future causee. Seal its privately
      // issued reference before a derivation signs the lower finite carrier.
      const sourceParticipant = normalizedRequest.sourceSubjectFrame;
      if (isClassicalNahuatlVncApplicationActiveFrameAuthorized(sourceMachineryFrame)
        && isClassicalNahuatlParticipantFrame(sourceParticipant)
        && Object.isFrozen(sourceParticipant)
        && sourceParticipant.role === "subject"
        && sourceParticipant.morphologicalAgreement === sourceRequest.subject
        && !classicalNahuatlVncParticipantProvenanceByMachinery.has(sourceMachineryFrame)) {
        Object.freeze(sourceMachineryFrame);
        classicalNahuatlVncParticipantProvenanceByMachinery.set(sourceMachineryFrame, Object.freeze({
          subjectFrame: sourceParticipant,
          objectRequests: Object.freeze([...sourceObjectRequests]),
        }));
      }
      return sourceMachineryFrame;
    }
    function getClassicalNahuatlVncMachineryParticipantProvenance(frame = null) {
      // Readonly identity lookup. A copied machinery or a shared lower child
      // cannot acquire another Source's privately bound Participant metadata.
      return frame && Object.isFrozen(frame)
        ? classicalNahuatlVncParticipantProvenanceByMachinery.get(frame) || null : null;
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
        impersonalDerivationPath: normalizedRequest.impersonalDerivationPath,
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
        activeMachineryFrame?.targetValence ||
        ((activeMachineryFrame?.kind === "classical-nahuatl-vnc-derived-machinery-frame"
          || activeMachineryFrame?.multipleObjectClusterFrame)
          ? activeMachineryFrame?.valence || fallback?.sourceValence
          : proofConclusion.classTargetValence
        || activeMachineryFrame?.classTargetValence
        || activeMachineryFrame?.citationRuleFrame?.valence
        || fallback?.sourceValence)
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
        sourceValence: activeObjectRequests.length > 1
          ? "multiple-object"
          : requestedValence,
        objectRequests: Object.freeze(activeObjectRequests.map(cloneClassicalNahuatlVncApplicationCompactValue))
      });
    }
    function normalizedFusionContinuationIsCanonical(source, request, target, descriptor) {
      const operation = target?.operationFrame;
      const rule = operation?.operationFacts?.tlaFusionRuleFrame;
      const objects = source?.sourceDescriptor?.sourceObjectRequests || [];
      return Boolean(request?.tlaFusion === true
        && operation?.operation === "tla-fusion"
        && operation.sourceMachineryFrame === source?.sourceMachineryFrame
        && operation.sourceStem === source.sourceDescriptor.sourceStem
        && objects.filter(object => object.objectKind === "nonspecific-nonhuman").length === 1
        && areClassicalNahuatlVncApplicationCanonicalValuesEqual(
          normalizeClassicalNahuatlVncApplicationObjectRequest(operation.operationFacts.consumedObject),
          normalizeClassicalNahuatlVncApplicationObjectRequest(objects.find(object => object.objectKind === "nonspecific-nonhuman")),
        )
        && areClassicalNahuatlVncApplicationCanonicalValuesEqual(
          descriptor.objectRequests,
          objects.filter(object => object.objectId !== operation.operationFacts.consumedObject.objectId),
        )
        && rule?.authorizationStatus === "authorized" && rule.fused === true
        && rule.sourceStemVariant === operation.sourceStem
        && rule.derivedStem === operation.targetStem
        && descriptor?.stem === rule.derivedStem
        && descriptor.verbClass === source.sourceDescriptor.verbClass
        && descriptor.sourceValence === operation.targetValence
        && descriptor.objectRequests.length === objects.length - 1);
    }
    function isClassicalNahuatlSameImpersonalCoordinateContinuation(source, request) {
      // This carrier comes only from the private authenticated Result lookup.
      // Recoordinate the existing voice; do not authorize a raw nonactive Source.
      const machinery = source?.sourceMachineryFrame;
      const descriptor = source?.sourceDescriptor;
      return Boolean(request?.derivationType === "direct"
        && request.requestedVoice === "impersonal"
        && descriptor?.sourceVoice === "impersonal"
        && request.sourceVoice === descriptor.sourceVoice
        && machinery?.voice === "impersonal"
        && machinery.activeMachineryFrame === source.formationSourceMachineryFrame
        && request.sourceNonactiveOptionId === descriptor.sourceNonactiveOptionId
        && (request.nonactiveOptionId || descriptor.sourceNonactiveOptionId) === descriptor.sourceNonactiveOptionId);
    }
    function getClassicalNahuatlHonorificParticipantProvenance(
      whole = null,
      runtimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget(),
    ) {
      if (runtimeTarget?.isClassicalNahuatlClosureFrame?.(whole) !== true) return null;
      const retained = classicalNahuatlHonorificParticipantProvenanceByResult.get(whole);
      if (retained) return retained;
      const operation = whole.operationFrame;
      const base = whole.baseApplicationFrame;
      const facts = operation?.operationFacts;
      if (operation?.operation !== "honorific"
        || !["causative", "applicative"].includes(operation.variant)
        || facts?.neutralSourcePreserved !== true
        || facts.reflexiveCoreference !== "result-subject"
        || !classicalNahuatlVncApplicationBuiltFrames.has(base)
        || !isClassicalNahuatlVncApplicationFrame(base)
        || whole.selectedMachineryFrame?.operationFrame !== operation
        || whole.finiteSurfaceFrame?.machineryFrame !== whole.selectedMachineryFrame
        || whole.finalTypedVncSlotFrame !== operation.targetTypedVncSlotFrame
        || operation.sourceTypedVncSlotFrame !== base.resultFrame.finalTypedVncSlotFrame) return null;
      // Honorific self-causation/own-benefit keeps the pre-honorific subject.
      // The ordinary derivation's new-agent projection is a different role.
      const sourceSubject = base.resultFrame.participantProjection?.sourceSubject;
      if (sourceSubject !== base.normalizedRequest.sourceSubjectFrame
        || !isClassicalNahuatlParticipantFrame(sourceSubject)
        || sourceSubject.agreement !== operation.targetCoordinate.subject
        || base.normalizedRequest.sourceSubject !== operation.targetCoordinate.subject) return null;
      const requests = getClassicalNahuatlVncApplicationOperationObjectRequests(
        base.resultFrame.derivationOperationFrame,
      );
      const participants = base.resultFrame.participantProjection.targetObjects;
      const positions = (whole.finalTypedVncSlotFrame.slots.prePredicate || [])
        .filter(slot => ["monadic-valence", "dyadic-valence"].includes(slot.kind))
        .map(slot => slot.objectPositionFrame);
      if (!positions.length || positions.length !== requests.length
        || participants?.length !== requests.length
        || !positions.some(position => position?.objectKind === "reflexive"
          && position.governor === operation.variant)) return null;
      const objects = [];
      for (const position of positions) {
        const index = requests.findIndex(request => position
          && position.objectId === request.objectId
          && position.objectKind === request.objectKind
          && position.objectPerson === request.objectPerson
          && position.governor === request.governor
          && position.derivationalLevel === request.derivationalLevel);
        const participantFrame = participants[index];
        if (index < 0 || !isClassicalNahuatlParticipantFrame(participantFrame)) return null;
        objects.push(Object.freeze({...requests[index], participantFrame}));
      }
      // Key the complete provenance by the actual whole Result. A later
      // recapture may share machinery, but cannot revise this Result's roles.
      const provenance = Object.freeze({subjectFrame: sourceSubject, objectRequests: Object.freeze(objects)});
      classicalNahuatlHonorificParticipantProvenanceByResult.set(whole, provenance);
      return provenance;
    }
    function getClassicalNahuatlLateParticipantProvenance(
      whole = null,
      runtimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget(),
    ) {
      const honorific = getClassicalNahuatlHonorificParticipantProvenance(whole, runtimeTarget);
      if (honorific) return honorific;
      if (runtimeTarget?.isClassicalNahuatlClosureFrame?.(whole) !== true) return null;
      const retained = classicalNahuatlLateParticipantProvenanceByResult.get(whole);
      if (retained) return retained;
      const operation = whole.operationFrame;
      const base = whole.baseApplicationFrame;
      if (!classicalNahuatlVncApplicationBuiltFrames.has(base)
        || !isClassicalNahuatlVncApplicationFrame(base)
        || whole.finalTypedVncSlotFrame !== operation.targetTypedVncSlotFrame) return null;
      const baseSubject = base.resultFrame.participantProjection?.targetSubject;
      const target = operation.targetApplicationFrame;
      const targetSubject = classicalNahuatlVncApplicationBuiltFrames.has(target)
        && isClassicalNahuatlVncApplicationFrame(target)
        ? target.resultFrame.participantProjection?.targetSubject : null;
      const subjectFrame = [baseSubject, targetSubject].find(subject =>
        isClassicalNahuatlParticipantFrame(subject)
        && (subject.category === operation.targetCoordinate.subject
          || subject.agreement === operation.targetCoordinate.subject));
      if (!subjectFrame) return null;
      const baseRequests = base.resultFrame.selectedDerivation === "direct"
        ? base.normalizedRequest.sourceObjectRequests
        : getClassicalNahuatlVncApplicationOperationObjectRequests(base.resultFrame.derivationOperationFrame);
      const baseParticipants = base.resultFrame.participantProjection?.targetObjects || [];
      // Some ordinary monadic slots carry only their actual tla/tē morph;
      // the canonical machinery analyzer owns their typed object requests.
      // An explicit empty provenance avoids consulting the later recapture cache.
      const targetDescriptor = getClassicalNahuatlVncContinuationSourceDescriptor(
        whole.selectedMachineryFrame, runtimeTarget, Object.freeze({}),
      );
      if (!targetDescriptor.sourceStem) return null;
      const objects = [];
      for (const position of targetDescriptor.sourceObjectRequests) {
        const index = baseRequests.findIndex(request => position
          && ["objectId", "objectKind", "objectPerson", "governor", "derivationalLevel"]
            .every(field => position[field] === request[field]));
        const participantFrame = baseParticipants[index];
        if (index < 0 || !isClassicalNahuatlParticipantFrame(participantFrame)) return null;
        objects.push(Object.freeze({...baseRequests[index], participantFrame}));
      }
      // Establish complete role facts from the exact issued whole before any
      // sibling preflight can recapture its machinery and populate shared caches.
      // Unchanged roles retain actual Participants; no category supplies defaults.
      const provenance = Object.freeze({subjectFrame, objectRequests: Object.freeze(objects)});
      classicalNahuatlLateParticipantProvenanceByResult.set(whole, provenance);
      return provenance;
    }
    function getClassicalNahuatlVncContinuationSourceDescriptor(
      sourceMachineryFrame = null,
      runtimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget(),
      exactResultParticipantProvenance = null,
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
      const participantProvenance = exactResultParticipantProvenance
        || classicalNahuatlVncParticipantProvenanceByMachinery.get(sourceMachineryFrame);
      const sourceObjectRequests = Object.freeze(
        (descriptor.objectRequests || []).map(request => {
          const retained = participantProvenance?.objectRequests?.find(candidate =>
            candidate.objectId === request.objectId
            && candidate.objectKind === request.objectKind
            && (candidate.objectPerson === request.objectPerson
              // A common nonanimate object has the third-singular morphology
              // of the class analysis. Keep its issued reference, not a new
              // reference inferred from that morphological shape.
              || (candidate.objectKind === "specific-projective"
                && candidate.objectPerson === "3common"
                && request.objectPerson === "3sg"
                && candidate.governor === request.governor
                && candidate.derivationalLevel === request.derivationalLevel
                && candidate.participantFrame?.category === "3common"
                && candidate.participantFrame?.person === "3"
                && candidate.participantFrame?.animacy === "nonanimate"
                && candidate.participantFrame?.humanness === "nonhuman"
                && candidate.participantFrame?.number === "common"
                && candidate.participantFrame?.morphologicalAgreement === "3sg")));
          return cloneClassicalNahuatlVncApplicationCompactValue(retained || request);
        }),
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
        sourceInitialISelection: /^[iī]/u.test(descriptor.stem)
          ? sourceAnalysisFrame.sourceInitialIKind
            || formationSourceMachineryFrame?.citationRuleFrame?.initialVowelKind || ""
          : "",
        verbClass: descriptor.verbClass,
        sourceValence,
        sourceSubject,
        ...(participantProvenance?.subjectFrame ? {
          sourceSubjectPerson: participantProvenance.subjectFrame.person,
          sourceSubjectAnimacy: participantProvenance.subjectFrame.animacy,
          sourceSubjectHumanness: participantProvenance.subjectFrame.humanness,
          sourceSubjectNumber: participantProvenance.subjectFrame.number,
        } : {}),
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
      const normalizedCanonicalSourceObjectRequests =
        sourceDescriptor.sourceObjectRequests.map(
          normalizeClassicalNahuatlVncApplicationObjectRequest,
        );
      const explicitSourceObjectsMatch = !explicitSourceObjectRequests
        || Boolean(
          normalizedExplicitSourceObjectRequests
          && areClassicalNahuatlVncApplicationCanonicalValuesEqual(
            normalizedExplicitSourceObjectRequests,
            normalizedCanonicalSourceObjectRequests,
          )
        );
      const sourceReferenceFields = ["sourceSubjectPerson", "sourceSubjectAnimacy", "sourceSubjectHumanness", "sourceSubjectNumber"];
      const sourceReferenceMatches = sourceReferenceFields.every(field =>
        !Object.prototype.hasOwnProperty.call(requestObject, field)
        || !Object.prototype.hasOwnProperty.call(sourceDescriptor, field)
        || requestObject[field] === sourceDescriptor[field]);
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
        || !(requestedObjectKind === sourceDescriptor.objectKind
          || sourceDescriptor.objectKind === "reflexive"
            && requestedObjectKind === getClassicalNahuatlVncApplicationObjectKind(
              sourceDescriptor.sourceValence, sourceDescriptor.objectKind
            ))
        || requestedObjectPerson !== sourceDescriptor.objectPerson
        || !explicitSourceObjectsMatch
        || !sourceReferenceMatches
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
        ...Object.fromEntries(sourceReferenceFields.filter(field => sourceDescriptor[field]).map(field => [field, sourceDescriptor[field]])),
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
      if (machineryFrame.kind === "classical-nahuatl-late-vnc-derivation-operation-machinery-frame") {
        return runtimeTarget?.isClassicalNahuatlMachineryFrame?.(machineryFrame) === true
          && runtimeTarget?.isClassicalNahuatlVncDerivationSourceMachineryFrame?.(machineryFrame) === true;
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
        punctuationMode: sentenceFrame.punctuationMode || "",
        admonitivePluralEnding: sentenceFrame.admonitivePluralEnding || "",
        finiteSingularConnector: sentenceFrame.finiteSingularConnector || "",
        defectiveANegativeVariant: sentenceFrame.defectiveANegativeVariant || "",
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
    function getClassicalNahuatlNominalPrefixSpecificSourceObject(activeMachineryFrame, runtimeTarget) {
      const cluster = activeMachineryFrame?.targetObjectClusterFrame;
      return activeMachineryFrame?.operationFrame?.operation === "nominal-prefix"
        && runtimeTarget?.isClassicalNahuatlMachineryFrame?.(activeMachineryFrame) === true
        && runtimeTarget?.isClassicalNahuatlObjectClusterFrame?.(cluster, activeMachineryFrame.stem) === true
        ? cluster.positions.find(position => position.objectKind === "specific-projective") || null
        : null;
    }
    function bindClassicalNahuatlVncPassivePatient(machineryFrame, objectRequest) {
      const patient = objectRequest?.participantFrame;
      const typed = getClassicalNahuatlVncApplicationFinalTypedFrame(machineryFrame);
      if (machineryFrame?.authorizationStatus !== "authorized"
        || machineryFrame.voice !== "passive"
        || machineryFrame.voiceTransformationFrame?.promotedObjectBecomesSubject !== true
        || objectRequest?.objectKind !== "specific-projective"
        || !isClassicalNahuatlParticipantFrame(patient)
        || ![patient.category, patient.morphologicalAgreement]
          .includes(machineryFrame.voiceTransformationFrame.targetSubject)
        || !typed) return machineryFrame;
      const targetSubject = buildClassicalNahuatlParticipantFrame({
        ...patient, role: "subject", case: "nominative", agreement: patient.category,
      });
      // This new voice Result owns the promoted subject projection. Its exact
      // active Source and lower finite machinery remain unchanged.
      const typedValue = cloneClassicalNahuatlVncApplicationCompactValue(typed);
      typedValue.slots.subject.participantFrame = targetSubject;
      typedValue.slots.subject.subjectCategory = targetSubject.category;
      const targetTyped = deepFreezeClassicalNahuatlVncApplicationValue(typedValue);
      const result = {...machineryFrame, proofFrame: {...machineryFrame.proofFrame,
        conclusion: {...machineryFrame.proofFrame.conclusion,
          finalTypedVncSlotFrame: targetTyped}}};
      classicalNahuatlVncPromotedObjectByVoiceMachinery.set(result, Object.freeze({
        objectRequest, targetSubject,
        canonicalVoiceMachineryFrame: deepFreezeClassicalNahuatlVncApplicationValue(machineryFrame),
        sourceTypedSlotFrame: typed, targetTypedSlotFrame: targetTyped,
      }));
      return result;
    }
    function getClassicalNahuatlVncPassivePatientMachineryProjection(frame = null) {
      const receipt = frame && classicalNahuatlVncPromotedObjectByVoiceMachinery.get(frame);
      if (!receipt) return null;
      const original = receipt.canonicalVoiceMachineryFrame;
      const referencesExcept = (actual, expected, except) => {
        const keys = Object.keys(expected || {});
        return actual && Object.keys(actual).length === keys.length
          && keys.every(key => key === except || actual[key] === expected[key]);
      };
      if (!referencesExcept(frame, original, "proofFrame")
        || !referencesExcept(frame.proofFrame, original.proofFrame, "conclusion")
        || !referencesExcept(frame.proofFrame.conclusion, original.proofFrame.conclusion, "finalTypedVncSlotFrame")
        || getClassicalNahuatlVncApplicationFinalTypedFrame(frame) !== receipt.targetTypedSlotFrame
        || receipt.targetTypedSlotFrame.slots.subject.participantFrame !== receipt.targetSubject
        || receipt.targetTypedSlotFrame.slots.subject.subjectCategory !== receipt.targetSubject.category
        || !Object.isFrozen(receipt.targetTypedSlotFrame)
        || !isClassicalNahuatlParticipantFrame(receipt.objectRequest.participantFrame)
        || !isClassicalNahuatlParticipantFrame(receipt.targetSubject)) return null;
      return Object.freeze({
        kind: "classical-nahuatl-private-passive-patient-machinery-projection",
        canonicalVoiceMachineryFrame: original,
        sourceObjectParticipantFrame: receipt.objectRequest.participantFrame,
        targetSubjectParticipantFrame: receipt.targetSubject,
        sourceTypedSlotFrame: receipt.sourceTypedSlotFrame,
        targetTypedSlotFrame: receipt.targetTypedSlotFrame,
      });
    }
    function rebuildClassicalNahuatlVncApplicationVoiceMachineryFrame(machineryFrame = null) {
      const runtimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget();
      const activeMachineryFrame = machineryFrame?.activeMachineryFrame || null;
      if (machineryFrame?.kind !== "classical-nahuatl-nonactive-vnc-derived-vnc-machinery-frame" || !isClassicalNahuatlVncApplicationCanonicalActiveMachineryFrame(activeMachineryFrame) || typeof runtimeTarget?.buildClassicalNahuatlDerivedVncFrame !== "function") {
        return null;
      }
      const targetPriorVncFrame = machineryFrame
        ?.derivedMachineryFrame?.targetLesson7MachineryFrame?.priorVncFrame
        || machineryFrame?.derivedMachineryFrame?.priorVncFrame
        || machineryFrame?.targetLesson7MachineryFrame?.priorVncFrame
        || machineryFrame?.priorVncFrame
        || activeMachineryFrame?.targetLesson7MachineryFrame?.priorVncFrame
        || activeMachineryFrame?.priorVncFrame
        || null;
      const retainedPatient = classicalNahuatlVncPromotedObjectByVoiceMachinery.get(machineryFrame);
      // Promotion owns the target Subject; original Source-object metadata
      // still comes from the canonical active Source's own object ordering.
      const firstSpecificObject = getClassicalNahuatlNominalPrefixSpecificSourceObject(activeMachineryFrame, runtimeTarget)
        || (activeMachineryFrame.targetObjectRequests || []).find(request => request?.objectKind === "specific-projective")
        || (machineryFrame.sourceObjectClusterFrame?.objectRequests || []).find(request => request?.objectKind === "specific-projective")
        || (activeMachineryFrame.targetObjectRequests || [])[0]
        || (machineryFrame.sourceObjectClusterFrame?.objectRequests || [])[0]
        || null;
      // Preserve the exact lower owner's source-object coordinate. Its
      // morphological alias can be 3sg for a semantic 3common patient;
      // the promoted patient may also differ from the first source object.
      const sourceObjectPerson = retainedPatient?.canonicalVoiceMachineryFrame
        ?.voiceTransformationFrame?.sourceSpecificObject
        || firstSpecificObject?.objectPerson
        || activeMachineryFrame.priorVncFrame?.objectFrame?.objectPerson || "";
      // Late operations keep their participants in the issued Source analysis,
      // rather than the ordinary machinery's direct object aliases.
      const lateSourceDescriptor = !sourceObjectPerson
        && activeMachineryFrame.kind
          === "classical-nahuatl-late-vnc-derivation-operation-machinery-frame"
        && runtimeTarget?.isClassicalNahuatlMachineryFrame?.(activeMachineryFrame) === true
          ? getClassicalNahuatlVncContinuationSourceDescriptor(activeMachineryFrame, runtimeTarget)
          : null;
      const rebuilt = runtimeTarget.buildClassicalNahuatlDerivedVncFrame(activeMachineryFrame, {
        voice: machineryFrame.voice,
        nonactiveStemRecord: machineryFrame.nonactiveStemRecord,
        inherentImpersonalRecord: machineryFrame.inherentImpersonalRecord,
        tlaImpersonalStemRecord: machineryFrame.tlaImpersonalStemRecord,
        sourceObjectClusterFrame: machineryFrame.sourceObjectClusterFrame,
        sourceValence: machineryFrame.sourceValence,
        sourceSubject: machineryFrame.sourceSubject,
        sourceObjectPerson: sourceObjectPerson || lateSourceDescriptor?.objectPerson || "",
        impersonalDerivationPath:
          machineryFrame.voiceTransformationFrame
            ?.impersonalDerivationPath || "direct-active",
        mood: targetPriorVncFrame?.personDyad?.mood
          || targetPriorVncFrame?.mood
          || "indicative",
        tense: targetPriorVncFrame?.tense || "present",
        verbClass: activeMachineryFrame.targetClass || activeMachineryFrame.classId || "A",
        sentenceOptions: getClassicalNahuatlVncApplicationCanonicalSentenceOptions(activeMachineryFrame)
      });
      return retainedPatient
        ? bindClassicalNahuatlVncPassivePatient(rebuilt, retainedPatient.objectRequest)
        : rebuilt;
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
    function getClassicalNahuatlSubjectSupplementedVncPrincipal(frame = null) {
      const owner = getClassicalNahuatlVncApplicationRuntimeTarget();
      if (owner?.isClassicalNahuatlSupplementationFrame?.(frame) !== true
        || frame.referenceFrame?.referenceMode !== "shared"
        || frame.referenceFrame?.headRole !== "subject"
        || frame.referenceFrame?.supplementContactRole !== "subject"
        || frame.principalClause?.unitKind !== "vnc"
        || frame.interveningClauses?.length
        || frame.principalContinuationFrames?.length
        || frame.supplementContinuationFrames?.length) return null;
      const principal = owner.getClassicalNahuatlSupplementationClauseSourceFrame?.(frame.principalClause);
      const nucleus = isClassicalNahuatlVncSentenceResultFrame(principal)
        ? principal.canonicalResultFrame : principal;
      const application = isClassicalNahuatlVncApplicationFrame(nucleus)
        ? nucleus : classicalNahuatlVncApplicationFrameByResultFrame.get(nucleus);
      return isClassicalNahuatlVncApplicationFrame(application)
        && application.resultFrame.selectedVoice === "active"
        ? application.resultFrame : null;
    }
    function getClassicalNahuatlVncContinuationSelectedMachinery(frame = null) {
      const owner = getClassicalNahuatlVncApplicationRuntimeTarget();
      // Keep the exact denominal Result as parent while consuming its issued
      // finite operand. A copied outer wrapper cannot acquire this adapter.
      return owner?.isClassicalNahuatlDenominalVncResultFrame?.(frame) === true
        ? frame.canonicalVncFrame.resultFrame.selectedMachineryFrame
        : getClassicalNahuatlSubjectSupplementedVncPrincipal(frame)?.selectedMachineryFrame
          || frame?.selectedMachineryFrame;
    }
    function isCanonicalClassicalNahuatlVncContinuationResult(frame = null) {
      const runtimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget();
      return (classicalNahuatlVncApplicationBuiltResultFrames.has(frame)
        && isClassicalNahuatlVncApplicationResultFrameInternal(frame))
        || runtimeTarget?.isClassicalNahuatlClosureFrame?.(frame) === true
        || runtimeTarget?.isClassicalNahuatlDenominalVncResultFrame?.(frame) === true
        || Boolean(getClassicalNahuatlSubjectSupplementedVncPrincipal(frame));
    }
    function isClassicalNahuatlVncApplicationResultFrameInternal(frame = null) {
      if (imperfectiveApplicativeApplications.has(frame)) return isImperfectiveApplicativeApplication(frame);
      if (restrictedContainingApplications.has(frame)) return isRestrictedContainingApplication(frame);
      if (analyticalVncApplications.has(frame)) return isAnalyticalVncApplication(frame);
      if (imperfectiveApplications.has(frame)) return isClassicalNahuatlImperfectiveVncApplicationFrame(frame);
      if (preformedVncApplications.has(frame)) return isPreformedVncApplication(frame);
      if (nonactiveCarrierApplications.has(frame)) return isNonactiveCarrierApplication(frame);
      if (frame && typeof frame === "object" && (classicalNahuatlVncApplicationPersistentCanonicalResultFrames.has(frame) || classicalNahuatlVncApplicationValidationTransaction?.resultFrames.has(frame))) {
        return true;
      }
      if (!frame || frame.kind !== "classical-nahuatl-vnc-application-result-frame" || frame.version !== CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION || frame.authorizationStatus !== "authorized" || frame.typedFrameAuthority !== true || frame.formulaStringAuthority !== false || frame.surfaceStringAuthority !== false || frame.callerSuppliedAuthorityAccepted !== false) {
        return false;
      }
      const runtimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget();
      const derivationDirect = frame.selectedDerivation === "direct";
      const formationSourceCanonical = isClassicalNahuatlVncApplicationCanonicalActiveMachineryFrame(frame.formationSourceMachineryFrame);
      const retainedSource = classicalNahuatlVncContinuationSourceByResultFrame.get(frame);
      const sameImpersonalCoordinate = isClassicalNahuatlSameImpersonalCoordinateContinuation(retainedSource, {
        derivationType: frame.selectedDerivation, requestedVoice: frame.selectedVoice,
        sourceVoice: frame.selectedSourceVoice,
        sourceNonactiveOptionId: frame.sourceMachineryFrame?.nonactiveStemRecord?.selectedOptionId,
        nonactiveOptionId: frame.selectedNonactiveOptionId,
      });
      const inherentContinuationSourceCanonical = Boolean(
        derivationDirect
        && classicalNahuatlVncContinuationSourceByResultFrame.get(frame)
          ?.sourceMachineryFrame === frame.sourceMachineryFrame
        && (frame.sourceMachineryFrame?.voice === "inherent-impersonal" || sameImpersonalCoordinate)
        && frame.sourceMachineryFrame.activeMachineryFrame === frame.formationSourceMachineryFrame
        && frame.selectedVoiceOperation === (sameImpersonalCoordinate ? "impersonal" : "inherent-impersonal")
        && isCanonicalClassicalNahuatlVncApplicationDerivationSourceMachineryFrame(
          frame.sourceMachineryFrame, runtimeTarget,
        )
      );
      const sourceCanonical = derivationDirect
        ? isClassicalNahuatlVncApplicationCanonicalActiveMachineryFrame(frame.sourceMachineryFrame)
          || inherentContinuationSourceCanonical
        : isCanonicalClassicalNahuatlVncApplicationDerivationSourceMachineryFrame(frame.sourceMachineryFrame, runtimeTarget);
      const sourceFormationContinuity = frame.selectedSourceVoice === "active"
        ? frame.formationSourceMachineryFrame === frame.sourceMachineryFrame
          // An inherently impersonal Source is automatically wrapped by its
          // own voice owner, even though no derived Source voice was chosen.
          || (sourceCanonical
            && frame.sourceMachineryFrame?.voice === "inherent-impersonal"
            && frame.sourceMachineryFrame.activeMachineryFrame === frame.formationSourceMachineryFrame)
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
          === getClassicalNahuatlVncContinuationSelectedMachinery(continuationSourceResultFrame)
        && isCanonicalClassicalNahuatlVncContinuationResult(continuationSourceResultFrame)
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
      const directActiveRecoordinate =
        classicalNahuatlVncDirectActiveRecoordinateByResultFrame.get(frame)
        || null;
      const rebuiltDirectActiveMachineryFrame = directActiveRecoordinate
        ? directActiveRecoordinate.transitionKind === "tla-fusion"
          ? targetObject.buildClassicalNahuatlVncTlaFusionContinuationMachinery?.(
            directActiveRecoordinate.sourceMachineryFrame,
            directActiveRecoordinate.targetRequest,
          )
          : buildClassicalNahuatlVncApplicationSourceMachinery(
          runtimeTarget,
          directActiveRecoordinate.targetRequest,
          {denominalCausativeOperationFrame: classicalNahuatlDenominalCausativeOperationByMachinery.get(directActiveRecoordinate.sourceMachineryFrame),
            formulaProjectionSourceFrame: directActiveRecoordinate.sourceMachineryFrame?.derivationOperationFrame
              ? directActiveRecoordinate.sourceMachineryFrame : null},
        )
        : null;
      const expectedDirectActiveTargetRequest = directActiveRecoordinate
        ? directActiveRecoordinate.normalizedRequest
        : null;
      const rebuiltDirectActiveTypedFrame =
        getClassicalNahuatlVncApplicationFinalTypedFrame(
          rebuiltDirectActiveMachineryFrame,
        );
      const activeTypedFrame = getClassicalNahuatlVncApplicationFinalTypedFrame(frame.activeMachineryFrame);
      const rebuiltDirectActiveDescriptor = directActiveRecoordinate
        ? getClassicalNahuatlVncApplicationCanonicalActivePredicateDescriptor(
          rebuiltDirectActiveMachineryFrame,
          {
            stem: directActiveRecoordinate.normalizedRequest.sourceStem,
            verbClass:
              directActiveRecoordinate.normalizedRequest.verbClass,
            sourceValence:
              directActiveRecoordinate.normalizedRequest.sourceValence,
            objectRequests:
              directActiveRecoordinate.normalizedRequest
                .sourceObjectRequests,
          },
        )
        : null;
      const directActiveRecoordinateCanonical = Boolean(
        directActiveRecoordinate
        && derivationDirect
        && continuationDirectSourceCanonical
        && directActiveRecoordinate.continuationSource
          === continuationSource
        && directActiveRecoordinate.sourceMachineryFrame
          === frame.sourceMachineryFrame
        && directActiveRecoordinate.activeMachineryFrame
          === frame.activeMachineryFrame
        && directActiveRecoordinate.sourceDescriptor
          === continuationSource?.sourceDescriptor
        && areClassicalNahuatlVncApplicationCanonicalValuesEqual(
          directActiveRecoordinate.targetRequest,
          expectedDirectActiveTargetRequest,
        )
        && directActiveRecoordinate.normalizedRequest.derivationType
          === "direct"
        && directActiveRecoordinate.normalizedRequest.sourceVoice
          === "active"
        && directActiveRecoordinate.normalizedRequest.voice === "active"
        && frame.selectedSourceVoice === "active"
        && frame.selectedVoice === "active"
        && frame.selectedVoiceOperation === "active"
        && frame.selectedMachineryFrame === frame.activeMachineryFrame
        && isClassicalNahuatlVncApplicationActiveFrameAuthorized(
          rebuiltDirectActiveMachineryFrame,
        )
        && (directActiveRecoordinate.transitionKind === "tla-fusion"
          ? normalizedFusionContinuationIsCanonical(
            continuationSource, directActiveRecoordinate.normalizedRequest,
            rebuiltDirectActiveMachineryFrame, rebuiltDirectActiveDescriptor,
          )
          : rebuiltDirectActiveDescriptor?.stem
          === continuationSource?.sourceDescriptor?.sourceStem
        && rebuiltDirectActiveDescriptor?.verbClass
          === continuationSource?.sourceDescriptor?.verbClass
        && rebuiltDirectActiveDescriptor?.sourceValence
          === continuationSource?.sourceDescriptor?.sourceValence
        && areClassicalNahuatlVncApplicationCanonicalValuesEqual(
          (rebuiltDirectActiveDescriptor?.objectRequests || []).map(normalizeClassicalNahuatlVncApplicationObjectRequest),
          (continuationSource?.sourceDescriptor?.sourceObjectRequests || []).map(normalizeClassicalNahuatlVncApplicationObjectRequest),
        ))
        && areClassicalNahuatlVncApplicationTypedFramesEqual(
          rebuiltDirectActiveTypedFrame,
          activeTypedFrame,
        )
        && (!areClassicalNahuatlVncApplicationTypedFramesEqual(
          sourceTypedFrame,
          activeTypedFrame,
        ) || !areClassicalNahuatlVncApplicationCanonicalValuesEqual(
          getClassicalNahuatlVncSentenceSurfaceFrameFromMachinery(frame.sourceMachineryFrame),
          getClassicalNahuatlVncSentenceSurfaceFrameFromMachinery(frame.activeMachineryFrame),
        ))
      );
      const sourceActiveContinuity = derivationDirect
        ? frame.sourceMachineryFrame === frame.activeMachineryFrame
          || directActiveRecoordinateCanonical
          || (continuationDirectSourceCanonical
            && (frame.sourceMachineryFrame?.voice === "inherent-impersonal" || sameImpersonalCoordinate)
            && frame.sourceMachineryFrame.activeMachineryFrame === frame.formationSourceMachineryFrame
            && frame.activeMachineryFrame === frame.formationSourceMachineryFrame
            && frame.selectedVoiceOperation === (sameImpersonalCoordinate ? "impersonal" : "inherent-impersonal"))
        : frame.activeMachineryFrame?.kind === "classical-nahuatl-vnc-derived-machinery-frame"
          && frame.sourceMachineryFrame === frame.activeMachineryFrame.sourceMachineryFrame;
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
    function isClassicalNahuatlVncApplicationIssuedResultFrame(
      frame = null,
    ) {
      return Boolean(
        classicalNahuatlVncApplicationBuiltResultFrames.has(frame)
        && isClassicalNahuatlVncApplicationResultFrame(frame)
      );
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
    function interpretClassicalNahuatlActiveReflexiveContextualPassiveReading(
      vncApplicationFrame = null,
      context = {},
    ) {
      const contextObject = context && typeof context === "object"
        && !Array.isArray(context)
        ? context
        : {};
      const allowedKeys = new Set([
        "subjectAnimacy",
        "subjectReference",
        "requestedReading",
      ]);
      const forbiddenKey = Reflect.ownKeys(contextObject).find(
        key => typeof key !== "string" || !allowedKeys.has(key),
      );
      const applicationAuthorized =
        isClassicalNahuatlVncApplicationFrame(vncApplicationFrame);
      const normalizedRequest = applicationAuthorized
        ? vncApplicationFrame.normalizedRequest
        : null;
      const resultFrame = applicationAuthorized
        ? vncApplicationFrame.resultFrame
        : null;
      const sourceObjectRequests = Array.isArray(
        normalizedRequest?.sourceObjectRequests,
      )
        ? normalizedRequest.sourceObjectRequests
        : [];
      const reflexiveSource = Boolean(
        normalizedRequest?.derivationType === "direct"
        && normalizedRequest?.voice === "active"
        && normalizedRequest?.objectInterpretation !== "reciprocal"
        && sourceObjectRequests.length === 1
        && sourceObjectRequests[0]?.objectKind === "reflexive",
      );
      const subject = normalizeClassicalNahuatlVncApplicationToken(
        normalizedRequest?.subject,
      ).toLowerCase();
      const thirdPersonSubject = ["3sg", "3pl"].includes(subject);
      const subjectAnimacy = normalizeClassicalNahuatlVncApplicationToken(
        contextObject.subjectAnimacy || "nonanimate",
      ).toLowerCase();
      const subjectReference = normalizeClassicalNahuatlVncApplicationToken(
        contextObject.subjectReference || "specific",
      ).toLowerCase();
      const requestedReading = normalizeClassicalNahuatlVncApplicationToken(
        contextObject.requestedReading,
      ).toLowerCase();
      const availableReadings = Object.freeze([
        "literal-reflexive",
        "contextual-passive",
      ]);
      const recognizedAnimacy = ["nonanimate", "animate"].includes(
        subjectAnimacy,
      );
      const recognizedReference = ["specific", "generic"].includes(
        subjectReference,
      );
      const readingRecognized = !requestedReading
        || availableReadings.includes(requestedReading);
      const authorized = Boolean(
        !forbiddenKey
        && applicationAuthorized
        && isClassicalNahuatlVncApplicationResultFrame(resultFrame)
        && reflexiveSource
        && thirdPersonSubject
        && recognizedAnimacy
        && recognizedReference
        && readingRecognized,
      );
      const blockReason = forbiddenKey
        ? "active-reflexive-contextual-reading-accepts-typed-context-only"
        : !applicationAuthorized
          ? "owner-issued-active-vnc-result-required"
          : !reflexiveSource
            ? "contextual-passive-reading-requires-active-reflexive-vnc"
            : !thirdPersonSubject
              ? "contextual-passive-reading-requires-third-person-patient"
              : !recognizedAnimacy
                ? "contextual-passive-reading-requires-subject-animacy"
                : !recognizedReference
                  ? "contextual-passive-reading-requires-specific-or-generic-reference"
                  : !readingRecognized
                    ? "contextual-passive-reading-not-licensed"
                    : "";
      const selectedReading = authorized ? requestedReading : "";
      const contextualPassiveSelected = selectedReading === "contextual-passive";
      const frame = deepFreezeClassicalNahuatlVncApplicationValue({
        kind: "classical-nahuatl-active-reflexive-contextual-passive-reading-frame",
        version: CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason,
        finiteVncResult: authorized ? vncApplicationFrame : null,
        grammaticalVoice: authorized ? "active" : "",
        reflexiveMorphologyPreserved: authorized,
        subject,
        subjectAnimacy: authorized ? subjectAnimacy : "",
        subjectReference: authorized ? subjectReference : "",
        subjectSemanticRole: authorized
          ? contextualPassiveSelected ? "patient" : selectedReading ? "agent-and-patient" : "unresolved-until-reading-selection"
          : "",
        availableReadings: authorized ? availableReadings : Object.freeze([]),
        selectedReading,
        readingSelectionRequired: authorized && !selectedReading,
        readingSelectionIsUserChoice: authorized,
        animacyFactIsUserChoice: false,
        animatePatientWarning: authorized && subjectAnimacy === "animate"
          ? "animate subject is interpreted as patient, not agent"
          : "",
        changesFiniteMorphology: false,
        formulaRealization: authorized
          ? resultFrame.formulaRealization
          : "",
        surfaceRealization: authorized
          ? resultFrame.surfaceRealization
          : "",
        formulaProjectionSource: "owner-issued-active-reflexive-vnc-result",
        writtenProjectionSource: "owner-issued-active-reflexive-vnc-result",
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        lessonMetadataAuthority: false,
        callerSuppliedAuthorityAccepted: false,
      });
      if (authorized) {
        classicalNahuatlActiveReflexiveContextualPassiveReadingFrames.add(
          frame,
        );
      }
      return frame;
    }
    function isClassicalNahuatlActiveReflexiveContextualPassiveReadingFrame(
      frame = null,
    ) {
      return Boolean(
        classicalNahuatlActiveReflexiveContextualPassiveReadingFrames.has(
          frame,
        )
        && frame?.kind === "classical-nahuatl-active-reflexive-contextual-passive-reading-frame"
        && frame.version === CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION
        && frame.authorizationStatus === "authorized"
        && isClassicalNahuatlVncApplicationFrame(frame.finiteVncResult)
        && frame.grammaticalVoice === "active"
        && frame.reflexiveMorphologyPreserved === true
        && frame.availableReadings.length === 2
        && frame.readingSelectionIsUserChoice === true
        && frame.animacyFactIsUserChoice === false
        && frame.changesFiniteMorphology === false
        && frame.formulaRealization
          === frame.finiteVncResult.resultFrame.formulaRealization
        && frame.surfaceRealization
          === frame.finiteVncResult.resultFrame.surfaceRealization
        && frame.formulaStringAuthority === false
        && frame.surfaceStringAuthority === false
        && frame.lessonMetadataAuthority === false
        && frame.callerSuppliedAuthorityAccepted === false
        && Object.isFrozen(frame)
      );
    }
    function interpretClassicalNahuatlImpersonalResultReading(
      vncApplicationFrame = null,
      context = {},
    ) {
      const contextObject = context && typeof context === "object"
        && !Array.isArray(context)
        ? context
        : {};
      const allowedKeys = new Set(["requestedReading"]);
      const forbiddenKey = Reflect.ownKeys(contextObject).find(
        key => typeof key !== "string" || !allowedKeys.has(key),
      );
      const applicationAuthorized =
        isClassicalNahuatlVncApplicationFrame(vncApplicationFrame);
      const normalizedRequest = applicationAuthorized
        ? vncApplicationFrame.normalizedRequest
        : null;
      const resultFrame = applicationAuthorized
        ? vncApplicationFrame.resultFrame
        : null;
      const voiceTransformationFrame = resultFrame?.selectedMachineryFrame
        ?.voiceTransformationFrame || null;
      const tlaImpersonalStemRecord = resultFrame?.selectedMachineryFrame
        ?.tlaImpersonalStemRecord || null;
      const tlaImpersonalSourceAnalysis =
        tlaImpersonalStemRecord?.sourceAnalysis || null;
      const tlaImpersonal = Boolean(
        voiceTransformationFrame?.voice === "tla-impersonal"
        && tlaImpersonalStemRecord?.authorizationStatus === "authorized"
        && tlaImpersonalSourceAnalysis?.authorizationStatus === "authorized"
      );
      const sourceObjectRequests = Array.isArray(
        normalizedRequest?.sourceObjectRequests,
      )
        ? normalizedRequest.sourceObjectRequests
        : [];
      const nonspecificKinds = sourceObjectRequests
        .map(objectRequest => objectRequest?.objectKind || "")
        .filter(objectKind => (
          objectKind === "nonspecific-human"
          || objectKind === "nonspecific-nonhuman"
        ));
      const hasHumanObject = nonspecificKinds.includes("nonspecific-human");
      const hasNonhumanObject = nonspecificKinds.includes(
        "nonspecific-nonhuman",
      );
      const hasReflexiveObject = sourceObjectRequests.some(
        objectRequest => objectRequest?.objectKind === "reflexive",
      );
      const availableReadings = Object.freeze(
        tlaImpersonal
          ? [...(tlaImpersonalSourceAnalysis.availableReadings || [])]
          : hasHumanObject && hasNonhumanObject
          ? [
            "generalized-active",
            "patient-human",
            "patient-nonhuman",
            "patient-human-plural-theme",
          ]
          : hasHumanObject
            ? [
              "generalized-active",
              "distributive",
              "maximally-generalized",
              "patient-human",
            ]
            : hasNonhumanObject
              ? [
                "generalized-active",
                "distributive",
                "patient-nonhuman-singular",
                "patient-nonhuman-plural",
              ]
              : [],
      );
      const requestedReading = normalizeClassicalNahuatlVncApplicationToken(
        contextObject.requestedReading,
      ).toLowerCase();
      const readingRecognized = !requestedReading
        || availableReadings.includes(requestedReading);
      const retainedCarriers = Object.freeze(nonspecificKinds.map(
        objectKind => objectKind === "nonspecific-human" ? "tē" : "tla",
      ));
      const retainedObjectSlots = resultFrame?.finalTypedVncSlotFrame
        ?.slots?.prePredicate || [];
      // Carrier identity comes from the canonical typed slots, including the
      // underlying carrier when a multiple-object slot has a formula projection.
      const nonspecificObjectsRetained = retainedCarriers.every(carrier => (
        retainedObjectSlots.some(slot => (
          slot.kind === "monadic-valence"
          && (slot.underlyingCarrier || slot.va) === carrier
        ))
      ));
      const authorized = Boolean(
        !forbiddenKey
        && applicationAuthorized
        && isClassicalNahuatlVncApplicationResultFrame(resultFrame)
        && voiceTransformationFrame?.authorizationStatus === "authorized"
        && (
          voiceTransformationFrame.voice === "impersonal"
          || tlaImpersonal
        )
        && availableReadings.length > 1
        && (tlaImpersonal || !hasReflexiveObject)
        && (
          tlaImpersonal
          || nonspecificObjectsRetained
        )
        && readingRecognized,
      );
      const blockReason = forbiddenKey
        ? "impersonal-result-reading-accepts-requested-reading-only"
        : !applicationAuthorized
          ? "owner-issued-impersonal-vnc-result-required"
          : !["impersonal", "tla-impersonal"].includes(
            voiceTransformationFrame?.voice,
          )
            ? "impersonal-result-reading-requires-impersonal-result"
            : hasReflexiveObject
              ? "impersonal-reflexive-ne-reading-is-derived-from-the-source"
              : availableReadings.length < 2
                ? tlaImpersonal
                  ? "tla-impersonal-result-has-no-genuine-reading-choice"
                  : "impersonal-result-reading-requires-retained-nonspecific-object"
                : !tlaImpersonal && !nonspecificObjectsRetained
                  ? "impersonal-result-reading-requires-retained-nonspecific-object"
                  : !readingRecognized
                    ? "impersonal-result-reading-not-licensed"
                    : "";
      const selectedReading = authorized ? requestedReading : "";
      const frame = deepFreezeClassicalNahuatlVncApplicationValue({
        kind: "classical-nahuatl-impersonal-result-reading-frame",
        version: CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason,
        finiteVncResult: authorized ? vncApplicationFrame : null,
        grammaticalVoice: authorized
          ? voiceTransformationFrame.voice
          : "",
        derivationalTla: authorized && tlaImpersonal,
        tlaImpersonalSourceStem: authorized && tlaImpersonal
          ? tlaImpersonalStemRecord.sourceStem
          : "",
        tlaImpersonalTargetStem: authorized && tlaImpersonal
          ? tlaImpersonalStemRecord.impersonalStem
          : "",
        semanticClass: authorized && tlaImpersonal
          ? tlaImpersonalSourceAnalysis.semanticClass
          : "",
        subjectDomain: authorized && tlaImpersonal
          ? tlaImpersonalSourceAnalysis.subjectDomain
          : "",
        sourceAttestation: authorized && tlaImpersonal
          ? tlaImpersonalSourceAnalysis.sourceAttestation
          : "",
        sourceObjectKinds: authorized ? nonspecificKinds : Object.freeze([]),
        retainedCarriers: authorized ? retainedCarriers : Object.freeze([]),
        availableReadings: authorized ? availableReadings : Object.freeze([]),
        selectedReading,
        readingSelectionRequired: authorized && !selectedReading,
        readingSelectionIsUserChoice: authorized,
        retainedObjectChoice: false,
        impersonalSubjectChoice: false,
        changesFiniteMorphology: false,
        formulaRealization: authorized
          ? resultFrame.formulaRealization
          : "",
        surfaceRealization: authorized
          ? resultFrame.surfaceRealization
          : "",
        formulaProjectionSource: tlaImpersonal
          ? "owner-issued-tla-impersonal-vnc-result"
          : "owner-issued-impersonal-vnc-result",
        writtenProjectionSource: tlaImpersonal
          ? "owner-issued-tla-impersonal-vnc-result"
          : "owner-issued-impersonal-vnc-result",
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        lessonMetadataAuthority: false,
        callerSuppliedAuthorityAccepted: false,
      });
      if (authorized) {
        classicalNahuatlImpersonalResultReadingFrames.add(frame);
      }
      return frame;
    }
    function isClassicalNahuatlImpersonalResultReadingFrame(frame = null) {
      return Boolean(
        classicalNahuatlImpersonalResultReadingFrames.has(frame)
        && frame?.kind === "classical-nahuatl-impersonal-result-reading-frame"
        && frame.version === CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION
        && frame.authorizationStatus === "authorized"
        && isClassicalNahuatlVncApplicationFrame(frame.finiteVncResult)
        && ["impersonal", "tla-impersonal"].includes(
          frame.grammaticalVoice,
        )
        && frame.availableReadings.length > 1
        && (
          frame.grammaticalVoice === "tla-impersonal"
            ? frame.derivationalTla === true
              && frame.retainedCarriers.length === 0
              && frame.tlaImpersonalSourceStem
              && frame.tlaImpersonalTargetStem.startsWith("tla-")
            : frame.derivationalTla === false
              && frame.retainedCarriers.length > 0
        )
        && frame.readingSelectionIsUserChoice === true
        && frame.retainedObjectChoice === false
        && frame.impersonalSubjectChoice === false
        && frame.changesFiniteMorphology === false
        && frame.formulaRealization
          === frame.finiteVncResult.resultFrame.formulaRealization
        && frame.surfaceRealization
          === frame.finiteVncResult.resultFrame.surfaceRealization
        && frame.formulaStringAuthority === false
        && frame.surfaceStringAuthority === false
        && frame.lessonMetadataAuthority === false
        && frame.callerSuppliedAuthorityAccepted === false
        && Object.isFrozen(frame)
      );
    }
    function normalizeClassicalNahuatlExtantDestockalMeaningIdentity(
      value = "",
    ) {
      return normalizeClassicalNahuatlVncApplicationStem(value)
        .toLowerCase()
        .replace(/[\p{Dash_Punctuation}\s]+/gu, "");
    }
    function buildBlockedClassicalNahuatlExtantDestockalMeaningFrame(
      blockReason = "owner-issued-extant-destockal-application-required",
    ) {
      return deepFreezeClassicalNahuatlVncApplicationValue({
        kind: "classical-nahuatl-extant-destockal-meaning-frame",
        version: CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,
        authorizationStatus: "blocked",
        blockReason,
        relationKind: "",
        applicationFrame: null,
        resultFrame: null,
        sourceAnalysisFrame: null,
        sourceAnalysis: null,
        derivationOperationFrame: null,
        participantTransformFrame: null,
        lexicalIdentityFrame: null,
        participantBinding: null,
        sourceReadings: Object.freeze([]),
        availableReadings: Object.freeze([]),
        meaningAssertionStatus: "unavailable",
        selectedReading: "",
        readingSelectionRequired: false,
        changesFiniteMorphology: false,
        sourceAdmissionAuthority: false,
        grammarGenerationAuthority: false,
        callerSuppliedAuthorityAccepted: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        canvasExampleAuthority: false,
        lessonMetadataAuthority: false,
        contextualFactIsUserChoice: false,
      });
    }
    function getClassicalNahuatlExtantDestockalMeaningLicense(
      sourceAnalysisFrame = null,
    ) {
      const analyses = Array.isArray(sourceAnalysisFrame?.analyses)
        ? sourceAnalysisFrame.analyses
        : [];
      for (const sourceAnalysis of analyses) {
        const license = CLASSICAL_NAHUATL_EXTANT_DESTOCKAL_MEANING_LICENSES[
          sourceAnalysis?.analysisId
        ] || null;
        if (!license) continue;
        const sourceSegments = Array.isArray(sourceAnalysis.segments)
          ? sourceAnalysis.segments
          : [];
        if (
          sourceAnalysis.analysisAuthority === "typed-lexical-source-analysis"
          && sourceAnalysis.lexicalStatus
            === "lexically-licensed-source-analysis"
          && [
            "fused-destockal-ni-exact",
            "fused-destockal-hui-exact",
          ].includes(sourceAnalysis.category)
          && sourceAnalysis.destockalStructureFrame?.typeId
            === "long-vowel-ni-or-hui"
          && JSON.stringify(sourceSegments)
            === JSON.stringify(license.sourceSegments)
        ) {
          return { license, sourceAnalysis };
        }
      }
      return null;
    }
    function buildClassicalNahuatlExtantDestockalReading(
      license = null,
      readingSpec = null,
      relation = "source-lexical-reading",
      participantBinding = null,
    ) {
      const meaningId = normalizeClassicalNahuatlVncApplicationToken(
        readingSpec?.meaningId,
      );
      const requiredReferentKind =
        normalizeClassicalNahuatlVncApplicationToken(
          readingSpec?.requiredReferentKind,
        );
      return {
        kind: "classical-nahuatl-extant-destockal-reading",
        readingId: `${license.lexemeId}-${meaningId}`,
        meaningId,
        meaning: meaningId,
        relation,
        availabilityStatus: "available-not-asserted",
        participantBinding,
        contextCondition: {
          kind: "classical-nahuatl-lexical-reading-context-condition",
          required: Boolean(requiredReferentKind),
          requiredReferentKind,
          resolutionStatus: requiredReferentKind
            ? "unmet-or-unknown"
            : "not-required",
          participantRole: participantBinding.bindingRole,
        },
      };
    }
    // A lexical relationship between two already issued sources, not an NNC
    // admission rule, a productive denominal operation, or a clause translation.
    function buildClassicalNahuatlExtantDestockalNounRelationFrame(input = {}) {
      const blocked = blockReason => deepFreezeClassicalNahuatlVncApplicationValue({
        kind: "classical-nahuatl-extant-destockal-noun-relation-frame",
        version: CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,
        authorizationStatus: "blocked", blockReason,
      });
      if (!input || typeof input !== "object" || Array.isArray(input)
        || Reflect.ownKeys(input).some(key => (
          !["meaningFrame", "nounResult"].includes(key)
          || !Object.hasOwn(Object.getOwnPropertyDescriptor(input, key), "value")
        ))) return blocked("extant-destockal-noun-relation-accepts-issued-inputs-only");
      const meaningFrame = Object.getOwnPropertyDescriptor(input, "meaningFrame")?.value;
      const nounResult = Object.getOwnPropertyDescriptor(input, "nounResult")?.value;
      if (!isClassicalNahuatlExtantDestockalMeaningFrame(meaningFrame)
        || meaningFrame.relationKind !== "source") {
        return blocked("canonical-extant-destockal-source-meaning-required");
      }
      const license = CLASSICAL_NAHUATL_EXTANT_DESTOCKAL_MEANING_LICENSES[
        meaningFrame.sourceAnalysis.analysisId
      ]?.nounRelation;
      const runtime = getClassicalNahuatlVncApplicationRuntimeTarget();
      if (!license) return blocked("exact-destockal-noun-relation-not-licensed");
      if (typeof runtime.isClassicalNahuatlOrdinaryNncResult !== "function"
        || !runtime.isClassicalNahuatlOrdinaryNncResult(nounResult)) {
        return blocked("canonical-ordinary-nnc-result-required");
      }
      const nounSourceFrame = nounResult.sourceFrame;
      const sourceAnalysis = meaningFrame.sourceAnalysis;
      if (nounSourceFrame.stem !== license.stem
        || nounSourceFrame.nounClass !== license.nounClass
        || nounSourceFrame.compoundSource
        || sourceAnalysis.root !== nounSourceFrame.stem) {
        return blocked("exact-shared-root-and-noun-class-required");
      }
      const frame = deepFreezeClassicalNahuatlVncApplicationValue({
        kind: "classical-nahuatl-extant-destockal-noun-relation-frame",
        version: CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,
        authorizationStatus: "authorized", blockReason: "",
        relationKind: "shared-lexical-root",
        meaningFrame,
        sourceAnalysisFrame: meaningFrame.sourceAnalysisFrame,
        sourceAnalysis,
        nounResult, nounSourceFrame, nounOperationFrame: nounResult.operationFrame,
        root: sourceAnalysis.root,
        availableReadings: license.readings.map(meaningId => ({
          meaningId, meaning: meaningId,
          availabilityStatus: "available-not-asserted",
          nounSourceFrame, nounResult,
        })),
        selectedReading: "",
        productiveDerivation: false,
        changesMorphology: false,
        infersGrammaticalAnimacy: false,
        infersNumber: false,
        sourceAdmissionAuthority: false,
        grammarGenerationAuthority: false,
        callerSuppliedAuthorityAccepted: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        canvasExampleAuthority: false,
      });
      classicalNahuatlExtantDestockalNounRelationFrames.add(frame);
      return frame;
    }
    function isClassicalNahuatlExtantDestockalNounRelationFrame(frame = null) {
      if (!frame || !classicalNahuatlExtantDestockalNounRelationFrames.has(frame)
        || frame.kind !== "classical-nahuatl-extant-destockal-noun-relation-frame"
        || frame.version !== CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION
        || frame.authorizationStatus !== "authorized" || frame.blockReason !== ""
        || frame.relationKind !== "shared-lexical-root"
        || !isClassicalNahuatlExtantDestockalMeaningFrame(frame.meaningFrame)
        || frame.meaningFrame.relationKind !== "source"
        || frame.sourceAnalysisFrame !== frame.meaningFrame.sourceAnalysisFrame
        || frame.sourceAnalysis !== frame.meaningFrame.sourceAnalysis) return false;
      const runtime = getClassicalNahuatlVncApplicationRuntimeTarget();
      const license = CLASSICAL_NAHUATL_EXTANT_DESTOCKAL_MEANING_LICENSES[
        frame.sourceAnalysis.analysisId
      ]?.nounRelation;
      return Boolean(license
        && typeof runtime.isClassicalNahuatlOrdinaryNncResult === "function"
        && runtime.isClassicalNahuatlOrdinaryNncResult(frame.nounResult)
        && frame.nounSourceFrame === frame.nounResult.sourceFrame
        && frame.nounOperationFrame === frame.nounResult.operationFrame
        && frame.nounSourceFrame.stem === license.stem
        && frame.nounSourceFrame.nounClass === license.nounClass
        && frame.nounSourceFrame.compoundSource === false
        && frame.root === frame.sourceAnalysis.root
        && frame.root === frame.nounSourceFrame.stem
        && frame.availableReadings.length === license.readings.length
        && frame.availableReadings.every((reading, index) => (
          reading.meaningId === license.readings[index]
          && reading.meaning === reading.meaningId
          && reading.availabilityStatus === "available-not-asserted"
          && reading.nounSourceFrame === frame.nounSourceFrame
          && reading.nounResult === frame.nounResult
        ))
        && frame.selectedReading === ""
        && ["productiveDerivation", "changesMorphology", "infersGrammaticalAnimacy",
          "infersNumber", "sourceAdmissionAuthority", "grammarGenerationAuthority",
          "callerSuppliedAuthorityAccepted", "formulaStringAuthority",
          "surfaceStringAuthority", "canvasExampleAuthority"].every(key => frame[key] === false)
        && Object.isFrozen(frame));
    }
    function buildClassicalNahuatlExtantDestockalMeaningFrame(input = {}) {
      const request = input && typeof input === "object"
        && !Array.isArray(input)
        ? input
        : {};
      const unexpectedKey = Reflect.ownKeys(request).find(key => (
        typeof key !== "string" || key !== "applicationFrame"
      ));
      if (unexpectedKey) {
        return buildBlockedClassicalNahuatlExtantDestockalMeaningFrame(
          "extant-destockal-meaning-accepts-issued-application-only",
        );
      }
      const applicationFrame = request.applicationFrame || null;
      if (
        !isClassicalNahuatlVncApplicationFrame(applicationFrame)
        || applicationFrame.authorizationStatus !== "authorized"
      ) {
        return buildBlockedClassicalNahuatlExtantDestockalMeaningFrame();
      }
      const resultFrame = applicationFrame.resultFrame;
      const sourceAnalysisFrame = resultFrame?.sourceAnalysisFrame || null;
      const licensedAnalysis =
        getClassicalNahuatlExtantDestockalMeaningLicense(
          sourceAnalysisFrame,
        );
      if (!licensedAnalysis) {
        return buildBlockedClassicalNahuatlExtantDestockalMeaningFrame(
          "exact-extant-destockal-source-analysis-required",
        );
      }
      const { license, sourceAnalysis } = licensedAnalysis;
      const derivationType = applicationFrame.normalizedRequest
        ?.derivationType || "";
      const relationKind = derivationType === "direct"
        ? "source"
        : derivationType === "causative"
          ? "causative"
          : "";
      if (!relationKind) {
        return buildBlockedClassicalNahuatlExtantDestockalMeaningFrame(
          "extant-destockal-source-or-causative-relation-required",
        );
      }
      const derivationOperationFrame = relationKind === "causative"
        ? resultFrame.derivationOperationFrame || null
        : null;
      const participantTransformFrame =
        derivationOperationFrame?.participantTransformFrame || null;
      const participantProjection = resultFrame.participantProjection || null;
      const sourceSubjectFrame =
        applicationFrame.normalizedRequest?.sourceSubjectFrame || null;
      let participantBinding = null;
      if (relationKind === "source") {
        const sourceBindingExact = Boolean(
          applicationFrame.normalizedRequest?.sourceVoice === "active"
          && resultFrame.selectedVoice === "active"
          && resultFrame.derivationOperationFrame == null
          && sourceSubjectFrame
          && participantProjection?.sourceSubject === sourceSubjectFrame
        );
        if (!sourceBindingExact) {
          return buildBlockedClassicalNahuatlExtantDestockalMeaningFrame(
            "actual-extant-destockal-source-subject-binding-required",
          );
        }
        participantBinding = {
          kind:
            "classical-nahuatl-extant-destockal-meaning-participant-binding",
          authorizationStatus: "authorized",
          bindingRole: "source-subject",
          transitionKind: "source-subject",
          participantProjection,
          sourceSubjectFrame,
          participantFrame: sourceSubjectFrame,
          targetObjectRequest: null,
          targetParticipantFrame: null,
          sourceSubjectBecomesCausativeObject: false,
          implicitAgentBecomesCausativeObject: false,
          referentiallyEmptySourceSubjectDiscarded: false,
          referentKind: "",
          referentResolutionStatus: "unresolved",
          agreementDoesNotResolveReferent: true,
          objectKindDoesNotResolveReferent: true,
        };
      } else {
        const runtimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget();
        const targetObjectRequest =
          participantTransformFrame?.addedObjectRequest || null;
        const targetParticipantFrame = (
          participantProjection?.targetObjects || []
        ).find(participant => (
          participant?.referenceId === targetObjectRequest?.objectId
        )) || null;
        const targetIdentity =
          normalizeClassicalNahuatlExtantDestockalMeaningIdentity(
            derivationOperationFrame?.targetStem,
          );
        const licensedTargetIdentity =
          normalizeClassicalNahuatlExtantDestockalMeaningIdentity(
            license.targetStem,
          );
        const causativeBindingExact = Boolean(
          typeof runtimeTarget?.isClassicalNahuatlVncDerivationOperationFrame
            === "function"
          && runtimeTarget.isClassicalNahuatlVncDerivationOperationFrame(
            derivationOperationFrame,
          )
          && derivationOperationFrame.authorizationStatus === "authorized"
          && derivationOperationFrame.sourceMachineryFrame
            === resultFrame.sourceMachineryFrame
          && derivationOperationFrame.selectedOption?.derivationSubtype
            === "type-one"
          && derivationOperationFrame.selectedOption?.sourceAnalysisId
            === sourceAnalysis.analysisId
          && derivationOperationFrame.targetClass === license.targetClass
          && targetIdentity === licensedTargetIdentity
          && participantTransformFrame?.authorizationStatus === "authorized"
          && targetObjectRequest
          && targetObjectRequest.governor === "causative"
          && participantTransformFrame.targetObjectRequests?.includes(
            targetObjectRequest,
          )
          && derivationOperationFrame.targetObjectRequests
            === participantTransformFrame.targetObjectRequests
          && (
            participantTransformFrame.sourceSubjectBecomesCausativeObject
              === true
            || participantTransformFrame.implicitAgentBecomesCausativeObject
              === true
          )
          && targetParticipantFrame
        );
        if (!causativeBindingExact) {
          return buildBlockedClassicalNahuatlExtantDestockalMeaningFrame(
            "actual-extant-destockal-transformed-causee-binding-required",
          );
        }
        participantBinding = {
          kind:
            "classical-nahuatl-extant-destockal-meaning-participant-binding",
          authorizationStatus: "authorized",
          bindingRole: "transformed-causee",
          transitionKind:
            participantTransformFrame.implicitAgentBecomesCausativeObject
              === true
              ? "implicit-agent-to-causee"
              : "source-subject-to-causee",
          participantProjection,
          sourceSubjectFrame,
          participantFrame: targetParticipantFrame,
          targetObjectRequest,
          targetParticipantFrame,
          sourceSubjectBecomesCausativeObject:
            participantTransformFrame.sourceSubjectBecomesCausativeObject
              === true,
          implicitAgentBecomesCausativeObject:
            participantTransformFrame.implicitAgentBecomesCausativeObject
              === true,
          referentiallyEmptySourceSubjectDiscarded:
            participantTransformFrame.referentiallyEmptySourceSubjectDiscarded
              === true,
          referentKind: "",
          referentResolutionStatus: "unresolved",
          agreementDoesNotResolveReferent: true,
          objectKindDoesNotResolveReferent: true,
        };
      }
      const sourceReadings = relationKind === "source"
        ? license.sourceReadings.map(readingSpec => (
          buildClassicalNahuatlExtantDestockalReading(
            license,
            readingSpec,
            "source-lexical-reading",
            participantBinding,
          )
        ))
        : [];
      const availableReadings = relationKind === "source"
        ? sourceReadings
        : license.causativeReadings.map(readingSpec => (
          buildClassicalNahuatlExtantDestockalReading(
            license,
            readingSpec,
            "causative-lexical-reading",
            participantBinding,
          )
        ));
      const frame = deepFreezeClassicalNahuatlVncApplicationValue({
        kind: "classical-nahuatl-extant-destockal-meaning-frame",
        version: CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,
        authorizationStatus: "authorized",
        blockReason: "",
        relationKind,
        applicationFrame,
        resultFrame,
        sourceAnalysisFrame,
        sourceAnalysis,
        derivationOperationFrame,
        participantTransformFrame,
        lexicalIdentityFrame: {
          lexemeId: license.lexemeId,
          sourceAnalysisId: sourceAnalysis.analysisId,
          sourceStem: license.sourceStem,
          enteredSourceStem: applicationFrame.normalizedRequest.sourceStem,
          sourceSegments: sourceAnalysis.segments,
          targetStem: relationKind === "causative"
            ? derivationOperationFrame.targetStem
            : "",
          targetClass: relationKind === "causative"
            ? derivationOperationFrame.targetClass
            : "",
          boundarySensitivity: "editorial-hyphens-ignored",
          vowelQuantitySensitivity: "phonemic-and-preserved",
          lexicalIdentityAuthority: "typed-lexical-source-analysis",
        },
        participantBinding,
        sourceReadings,
        availableReadings,
        meaningAssertionStatus: "available-not-asserted",
        lexicalIdentityMatchDoesNotForceReading: true,
        selectedReading: "",
        readingSelectionRequired: false,
        contextualFactsSupplied: false,
        unresolvedContextConditionCount: availableReadings.filter(
          reading => reading.contextCondition.required,
        ).length,
        changesFiniteMorphology: false,
        formulaRealization: resultFrame.formulaRealization,
        surfaceRealization: resultFrame.surfaceRealization,
        formulaProjectionSource: "owner-issued-vnc-typed-slot-result",
        writtenProjectionSource:
          "owner-issued-vnc-boundary-realization-result",
        sourceAdmissionAuthority: false,
        grammarGenerationAuthority: false,
        callerSuppliedAuthorityAccepted: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        canvasExampleAuthority: false,
        lessonMetadataAuthority: false,
        contextualFactIsUserChoice: false,
      });
      classicalNahuatlExtantDestockalMeaningFrames.add(frame);
      return frame;
    }
    function isClassicalNahuatlExtantDestockalMeaningFrame(frame = null) {
      if (
        !frame
        || !classicalNahuatlExtantDestockalMeaningFrames.has(frame)
        || frame.kind
          !== "classical-nahuatl-extant-destockal-meaning-frame"
        || frame.version !== CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION
        || frame.authorizationStatus !== "authorized"
        || frame.blockReason !== ""
        || !["source", "causative"].includes(frame.relationKind)
        || !isClassicalNahuatlVncApplicationFrame(frame.applicationFrame)
        || frame.applicationFrame.resultFrame !== frame.resultFrame
        || frame.resultFrame.sourceAnalysisFrame !== frame.sourceAnalysisFrame
        || !frame.sourceAnalysisFrame.analyses.includes(frame.sourceAnalysis)
      ) {
        return false;
      }
      const license = CLASSICAL_NAHUATL_EXTANT_DESTOCKAL_MEANING_LICENSES[
        frame.sourceAnalysis.analysisId
      ] || null;
      const participantBinding = frame.participantBinding;
      if (
        !license
        || frame.lexicalIdentityFrame?.lexemeId !== license.lexemeId
        || frame.lexicalIdentityFrame?.sourceAnalysisId
          !== frame.sourceAnalysis.analysisId
        || frame.lexicalIdentityFrame?.sourceStem !== license.sourceStem
        || frame.lexicalIdentityFrame?.sourceSegments
          !== frame.sourceAnalysis.segments
        || frame.lexicalIdentityFrame?.boundarySensitivity
          !== "editorial-hyphens-ignored"
        || frame.lexicalIdentityFrame?.vowelQuantitySensitivity
          !== "phonemic-and-preserved"
        || frame.lexicalIdentityFrame?.lexicalIdentityAuthority
          !== "typed-lexical-source-analysis"
        || participantBinding?.authorizationStatus !== "authorized"
        || participantBinding.participantProjection
          !== frame.resultFrame.participantProjection
        || participantBinding.sourceSubjectFrame
          !== frame.applicationFrame.normalizedRequest.sourceSubjectFrame
        || participantBinding.referentKind !== ""
        || participantBinding.referentResolutionStatus !== "unresolved"
        || participantBinding.agreementDoesNotResolveReferent !== true
        || participantBinding.objectKindDoesNotResolveReferent !== true
      ) {
        return false;
      }
      const validateReadings = (readings, specs, relation) => (
        Array.isArray(readings)
        && readings.length === specs.length
        && readings.every((reading, index) => {
          const spec = specs[index];
          const requiredReferentKind = spec.requiredReferentKind || "";
          return reading.kind
              === "classical-nahuatl-extant-destockal-reading"
            && reading.readingId
              === `${license.lexemeId}-${spec.meaningId}`
            && reading.meaningId === spec.meaningId
            && reading.meaning === spec.meaningId
            && reading.relation === relation
            && reading.availabilityStatus === "available-not-asserted"
            && reading.participantBinding === participantBinding
            && reading.contextCondition?.kind
              === "classical-nahuatl-lexical-reading-context-condition"
            && reading.contextCondition.required
              === Boolean(requiredReferentKind)
            && reading.contextCondition.requiredReferentKind
              === requiredReferentKind
            && reading.contextCondition.resolutionStatus
              === (requiredReferentKind
                ? "unmet-or-unknown"
                : "not-required")
            && reading.contextCondition.participantRole
              === participantBinding.bindingRole;
        })
      );
      const sourceReadingsValid = frame.relationKind === "source"
        ? validateReadings(
          frame.sourceReadings,
          license.sourceReadings,
          "source-lexical-reading",
        )
        : Array.isArray(frame.sourceReadings)
          && frame.sourceReadings.length === 0;
      const availableReadingsValid = frame.relationKind === "source"
        ? frame.availableReadings === frame.sourceReadings
          && sourceReadingsValid
        : validateReadings(
          frame.availableReadings,
          license.causativeReadings,
          "causative-lexical-reading",
        );
      const commonValid = Boolean(
        sourceReadingsValid
        && availableReadingsValid
        && frame.meaningAssertionStatus === "available-not-asserted"
        && frame.lexicalIdentityMatchDoesNotForceReading === true
        && frame.selectedReading === ""
        && frame.readingSelectionRequired === false
        && frame.contextualFactsSupplied === false
        && frame.unresolvedContextConditionCount
          === frame.availableReadings.filter(
            reading => reading.contextCondition.required,
          ).length
        && frame.changesFiniteMorphology === false
        && frame.formulaRealization === frame.resultFrame.formulaRealization
        && frame.surfaceRealization === frame.resultFrame.surfaceRealization
        && frame.sourceAdmissionAuthority === false
        && frame.grammarGenerationAuthority === false
        && frame.callerSuppliedAuthorityAccepted === false
        && frame.formulaStringAuthority === false
        && frame.surfaceStringAuthority === false
        && frame.canvasExampleAuthority === false
        && frame.lessonMetadataAuthority === false
        && frame.contextualFactIsUserChoice === false
        && Object.isFrozen(frame)
      );
      if (!commonValid) return false;
      if (frame.relationKind === "source") {
        return Boolean(
          frame.applicationFrame.normalizedRequest.derivationType === "direct"
          && frame.derivationOperationFrame == null
          && frame.participantTransformFrame == null
          && participantBinding.bindingRole === "source-subject"
          && participantBinding.transitionKind === "source-subject"
          && participantBinding.participantFrame
            === participantBinding.sourceSubjectFrame
          && participantBinding.participantFrame
            === participantBinding.participantProjection.sourceSubject
          && participantBinding.targetObjectRequest == null
          && participantBinding.targetParticipantFrame == null
          && frame.lexicalIdentityFrame.targetStem === ""
          && frame.lexicalIdentityFrame.targetClass === ""
        );
      }
      const runtimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget();
      const operation = frame.derivationOperationFrame;
      const transform = frame.participantTransformFrame;
      return Boolean(
        frame.applicationFrame.normalizedRequest.derivationType === "causative"
        && runtimeTarget?.isClassicalNahuatlVncDerivationOperationFrame?.(
          operation,
        ) === true
        && operation === frame.resultFrame.derivationOperationFrame
        && transform === operation.participantTransformFrame
        && operation.selectedOption?.derivationSubtype === "type-one"
        && operation.selectedOption?.sourceAnalysisId
          === frame.sourceAnalysis.analysisId
        && normalizeClassicalNahuatlExtantDestockalMeaningIdentity(
          operation.targetStem,
        ) === normalizeClassicalNahuatlExtantDestockalMeaningIdentity(
          license.targetStem,
        )
        && operation.targetClass === license.targetClass
        && participantBinding.bindingRole === "transformed-causee"
        && participantBinding.participantFrame
          === participantBinding.targetParticipantFrame
        && participantBinding.targetObjectRequest
          === transform.addedObjectRequest
        && transform.targetObjectRequests.includes(
          participantBinding.targetObjectRequest,
        )
        && participantBinding.targetParticipantFrame.referenceId
          === participantBinding.targetObjectRequest.objectId
        && participantBinding.sourceSubjectBecomesCausativeObject
          === (transform.sourceSubjectBecomesCausativeObject === true)
        && participantBinding.implicitAgentBecomesCausativeObject
          === (transform.implicitAgentBecomesCausativeObject === true)
        && participantBinding.referentiallyEmptySourceSubjectDiscarded
          === (transform.referentiallyEmptySourceSubjectDiscarded === true)
        && frame.lexicalIdentityFrame.targetStem === operation.targetStem
        && frame.lexicalIdentityFrame.targetClass === operation.targetClass
      );
    }
    // Interpretation consumes an issued lexical relation and separately supplied
    // context. It never edits that relation, participants, or finite morphology.
    function interpretClassicalNahuatlExtantDestockalReading(input = {}) {
      const request = input && typeof input === "object" && !Array.isArray(input)
        ? input : {};
      const allowedKeys = new Set(["meaningFrame", "context", "requestedReading"]);
      const forbiddenKey = Reflect.ownKeys(request).some(key => !allowedKeys.has(key));
      const meaningFrame = request.meaningFrame || null;
      const meaningCanonical = isClassicalNahuatlExtantDestockalMeaningFrame(meaningFrame);
      const binding = meaningCanonical ? meaningFrame.participantBinding : null;
      const contextSupplied = Object.hasOwn(request, "context");
      const context = request.context;
      const contextShapeValid = !contextSupplied || Boolean(context
        && typeof context === "object" && !Array.isArray(context)
        && Reflect.ownKeys(context).every(key => ["participantFrame", "referentKind"].includes(key))
        && typeof context.referentKind === "string" && context.referentKind.trim());
      const referentKind = contextShapeValid && contextSupplied
        ? context.referentKind.trim().toLowerCase().normalize("NFC") : "";
      const participantMatches = !contextSupplied || Boolean(binding
        && context?.participantFrame === binding.participantFrame);
      // The cited referents are nonhuman. Do not infer an additional grammatical
      // animacy category from physical referents, or grammatical plural from the
      // English word "stitches". Existing participant facts remain unchanged.
      const literalNonhuman = ["wall", "mountainside", "fire", "stitches",
        "flame", "candle-flame", "fire-or-flame"].includes(referentKind);
      const participantConflict = Boolean(literalNonhuman && binding
        && (binding.participantFrame.humanness === "human"
          || binding.participantFrame.hasReferent === false));
      const selectionShapeValid = !Object.hasOwn(request, "requestedReading")
        || typeof request.requestedReading === "string";
      const requestedReading = selectionShapeValid
        ? (request.requestedReading || "").trim() : "";
      const contextAccepted = Boolean(meaningCanonical && contextSupplied
        && contextShapeValid && participantMatches && !participantConflict);
      const resolvedReadings = meaningCanonical ? meaningFrame.availableReadings.map(reading => {
        const requirement = reading.contextCondition.requiredReferentKind;
        const contextStatus = !reading.contextCondition.required ? "not-required"
          : !contextAccepted ? "unresolved"
            : requirement === referentKind || (requirement === "fire-or-flame"
              && ["fire", "flame", "candle-flame", "fire-or-flame"].includes(referentKind))
              ? "matched" : "not-matched";
        return {
          reading,
          participantBinding: binding,
          contextStatus,
          supported: ["matched", "not-required"].includes(contextStatus),
        };
      }) : [];
      const selectedResolution = requestedReading
        ? resolvedReadings.find(item => item.reading.meaningId === requestedReading) || null : null;
      const blockReason = forbiddenKey ? "extant-destockal-reading-accepts-typed-context-and-selection-only"
        : !meaningCanonical ? "owner-issued-extant-destockal-meaning-required"
          : !contextShapeValid ? "extant-destockal-reading-context-shape-invalid"
            : !participantMatches ? "extant-destockal-reading-exact-participant-required"
              : participantConflict ? "extant-destockal-reading-context-conflicts-with-participant"
                : !selectionShapeValid ? "extant-destockal-reading-selection-must-be-text"
                  : requestedReading && !selectedResolution ? "extant-destockal-reading-not-licensed"
                    : selectedResolution && !selectedResolution.supported
                      ? "extant-destockal-reading-required-context-not-supported" : "";
      const authorized = !blockReason;
      const frame = deepFreezeClassicalNahuatlVncApplicationValue({
        kind: "classical-nahuatl-extant-destockal-contextual-reading-frame",
        version: CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason,
        meaningFrame: meaningCanonical ? meaningFrame : null,
        participantBinding: binding,
        context: contextAccepted ? {
          participantFrame: binding.participantFrame,
          referentKind,
          evidenceSource: "caller-supplied-context-not-independent-world-evidence",
        } : null,
        resolvedReadings,
        supportedReadings: resolvedReadings.filter(item => item.supported).map(item => item.reading),
        selectedReading: authorized ? requestedReading : "",
        selectedResolution: authorized ? selectedResolution : null,
        meaningAssertionStatus: authorized && requestedReading
          ? "selected-not-truth-asserted" : "available-not-asserted",
        contextAloneSelectsReading: false,
        contextChangesParticipantFacts: false,
        changesFiniteMorphology: false,
        sourceAdmissionAuthority: false,
        grammarGenerationAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        formulaRealization: meaningCanonical ? meaningFrame.formulaRealization : "",
        surfaceRealization: meaningCanonical ? meaningFrame.surfaceRealization : "",
      });
      if (authorized) classicalNahuatlExtantDestockalReadingFrames.add(frame);
      return frame;
    }
    function isClassicalNahuatlExtantDestockalReadingFrame(frame = null) {
      return Boolean(frame && classicalNahuatlExtantDestockalReadingFrames.has(frame)
        && frame.kind === "classical-nahuatl-extant-destockal-contextual-reading-frame"
        && frame.authorizationStatus === "authorized"
        && isClassicalNahuatlExtantDestockalMeaningFrame(frame.meaningFrame)
        && frame.participantBinding === frame.meaningFrame.participantBinding
        && (!frame.context || frame.context.participantFrame === frame.participantBinding.participantFrame)
        && frame.resolvedReadings.every(item => item.participantBinding === frame.participantBinding
          && frame.meaningFrame.availableReadings.includes(item.reading))
        && (!frame.selectedReading || (frame.selectedResolution?.supported === true
          && frame.selectedResolution.reading.meaningId === frame.selectedReading))
        && frame.formulaRealization === frame.meaningFrame.formulaRealization
        && frame.surfaceRealization === frame.meaningFrame.surfaceRealization
        && frame.contextAloneSelectsReading === false
        && frame.changesFiniteMorphology === false && Object.isFrozen(frame));
    }
    function buildClassicalNahuatlVncMeaningPresentationContextRequirements(
      meaningFrame = null,
      readingFrame = null,
    ) {
      if (!isClassicalNahuatlExtantDestockalMeaningFrame(meaningFrame)) {
        return Object.freeze([]);
      }
      return Object.freeze(meaningFrame.availableReadings.flatMap(reading => {
        const contextCondition = reading.contextCondition || null;
        if (contextCondition?.required !== true) return [];
        const resolution = readingFrame?.resolvedReadings?.find(
          item => item.reading === reading,
        ) || null;
        return [Object.freeze({
          kind: "classical-nahuatl-vnc-meaning-presentation-context-requirement",
          reading,
          readingId: reading.readingId,
          meaningId: reading.meaningId,
          participantBinding: meaningFrame.participantBinding,
          participantFrame: meaningFrame.participantBinding.participantFrame,
          contextCondition,
          requiredReferentKind: contextCondition.requiredReferentKind,
          contextStatus: resolution?.contextStatus || "unresolved",
          supported: resolution?.supported === true,
        })];
      }));
    }
    function buildBlockedClassicalNahuatlVncMeaningPresentationFrame({
      blockReason = "owner-issued-extant-destockal-meaning-required",
      applicationFrame = null,
      meaningFrame = null,
    } = {}) {
      const exactApplicationFrame = isClassicalNahuatlVncApplicationFrame(
        applicationFrame,
      ) ? applicationFrame : null;
      const exactMeaningFrame = isClassicalNahuatlExtantDestockalMeaningFrame(
        meaningFrame,
      ) ? meaningFrame : null;
      const availableReadings = exactMeaningFrame?.availableReadings
        || Object.freeze([]);
      const sourceReadings = exactMeaningFrame?.sourceReadings
        || Object.freeze([]);
      return deepFreezeClassicalNahuatlVncApplicationValue({
        kind: CLASSICAL_NAHUATL_VNC_MEANING_PRESENTATION_FRAME_KIND,
        version: CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,
        authorizationStatus: "blocked",
        blockReason,
        applicationFrame: exactApplicationFrame,
        resultFrame: exactApplicationFrame?.resultFrame || null,
        meaningFrame: exactMeaningFrame,
        readingFrame: null,
        relationKind: exactMeaningFrame?.relationKind || "",
        sourceAnalysisFrame: exactMeaningFrame?.sourceAnalysisFrame || null,
        sourceAnalysis: exactMeaningFrame?.sourceAnalysis || null,
        derivationOperationFrame:
          exactMeaningFrame?.derivationOperationFrame || null,
        lexicalIdentityFrame: exactMeaningFrame?.lexicalIdentityFrame || null,
        participantBinding: exactMeaningFrame?.participantBinding || null,
        sourceReadings,
        availableReadings,
        possibleMeanings: availableReadings,
        readingChoices: availableReadings.length > 1
          ? availableReadings
          : Object.freeze([]),
        contextRequirements:
          buildClassicalNahuatlVncMeaningPresentationContextRequirements(
            exactMeaningFrame,
          ),
        supportedReadings: Object.freeze([]),
        selectedReading: "",
        selectedResolution: null,
        context: null,
        meaningAssertionStatus: exactMeaningFrame
          ? "available-not-asserted"
          : "unavailable",
        presentationRole: "read-only-owner-issued-interpretation",
        contextualFactsSupplied: false,
        contextSelectionIsPresentationOnly: true,
        readingSelectionIsPresentationOnly: true,
        presentationBlocksGeneration: false,
        applicationAuthorizationUnaffected: true,
        changesFiniteMorphology: false,
        sourceAdmissionAuthority: false,
        grammarGenerationAuthority: false,
        callerSuppliedAuthorityAccepted: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        formulaRealization: exactMeaningFrame?.formulaRealization || "",
        surfaceRealization: exactMeaningFrame?.surfaceRealization || "",
      });
    }
    // This is a read-only bridge from an issued application to its existing
    // lexical/contextual owners. Presentation choices never re-enter generation.
    function buildClassicalNahuatlVncMeaningPresentationFrame(input = {}) {
      const request = input && typeof input === "object" && !Array.isArray(input)
        ? input
        : null;
      const allowedKeys = new Set([
        "applicationFrame",
        "context",
        "requestedReading",
      ]);
      const inputShapeValid = Boolean(request && Reflect.ownKeys(request).every(
        key => {
          const descriptor = Object.getOwnPropertyDescriptor(request, key);
          return typeof key === "string"
            && allowedKeys.has(key)
            && Boolean(descriptor)
            && Object.prototype.hasOwnProperty.call(descriptor, "value");
        },
      ));
      if (!inputShapeValid) {
        return buildBlockedClassicalNahuatlVncMeaningPresentationFrame({
          blockReason:
            "vnc-meaning-presentation-accepts-issued-application-and-presentation-input-only",
        });
      }
      const applicationFrame = Object.getOwnPropertyDescriptor(
        request,
        "applicationFrame",
      )?.value || null;
      if (
        !isClassicalNahuatlVncApplicationFrame(applicationFrame)
        || applicationFrame.authorizationStatus !== "authorized"
      ) {
        return buildBlockedClassicalNahuatlVncMeaningPresentationFrame({
          blockReason: "owner-issued-authorized-vnc-application-required",
        });
      }
      const meaningFrame = buildClassicalNahuatlExtantDestockalMeaningFrame({
        applicationFrame,
      });
      if (!isClassicalNahuatlExtantDestockalMeaningFrame(meaningFrame)) {
        return buildBlockedClassicalNahuatlVncMeaningPresentationFrame({
          blockReason: meaningFrame?.blockReason
            || "owner-issued-extant-destockal-meaning-required",
          applicationFrame,
        });
      }
      const readingRequest = { meaningFrame };
      if (Object.prototype.hasOwnProperty.call(request, "context")) {
        readingRequest.context = Object.getOwnPropertyDescriptor(
          request,
          "context",
        )?.value;
      }
      if (Object.prototype.hasOwnProperty.call(request, "requestedReading")) {
        readingRequest.requestedReading = Object.getOwnPropertyDescriptor(
          request,
          "requestedReading",
        )?.value;
      }
      const readingFrame = interpretClassicalNahuatlExtantDestockalReading(
        readingRequest,
      );
      if (!isClassicalNahuatlExtantDestockalReadingFrame(readingFrame)) {
        return buildBlockedClassicalNahuatlVncMeaningPresentationFrame({
          blockReason: readingFrame?.blockReason
            || "owner-issued-extant-destockal-reading-required",
          applicationFrame,
          meaningFrame,
        });
      }
      const availableReadings = meaningFrame.availableReadings;
      const frame = deepFreezeClassicalNahuatlVncApplicationValue({
        kind: CLASSICAL_NAHUATL_VNC_MEANING_PRESENTATION_FRAME_KIND,
        version: CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,
        authorizationStatus: "authorized",
        blockReason: "",
        applicationFrame,
        resultFrame: applicationFrame.resultFrame,
        meaningFrame,
        readingFrame,
        relationKind: meaningFrame.relationKind,
        sourceAnalysisFrame: meaningFrame.sourceAnalysisFrame,
        sourceAnalysis: meaningFrame.sourceAnalysis,
        derivationOperationFrame: meaningFrame.derivationOperationFrame,
        lexicalIdentityFrame: meaningFrame.lexicalIdentityFrame,
        participantBinding: meaningFrame.participantBinding,
        sourceReadings: meaningFrame.sourceReadings,
        availableReadings,
        possibleMeanings: availableReadings,
        readingChoices: availableReadings.length > 1
          ? availableReadings
          : Object.freeze([]),
        contextRequirements:
          buildClassicalNahuatlVncMeaningPresentationContextRequirements(
            meaningFrame,
            readingFrame,
          ),
        supportedReadings: readingFrame.supportedReadings,
        selectedReading: readingFrame.selectedReading,
        selectedResolution: readingFrame.selectedResolution,
        context: readingFrame.context,
        meaningAssertionStatus: readingFrame.meaningAssertionStatus,
        presentationRole: "read-only-owner-issued-interpretation",
        contextualFactsSupplied: Boolean(readingFrame.context),
        contextSelectionIsPresentationOnly: true,
        readingSelectionIsPresentationOnly: true,
        presentationBlocksGeneration: false,
        applicationAuthorizationUnaffected: true,
        changesFiniteMorphology: false,
        sourceAdmissionAuthority: false,
        grammarGenerationAuthority: false,
        callerSuppliedAuthorityAccepted: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        formulaRealization: meaningFrame.formulaRealization,
        surfaceRealization: meaningFrame.surfaceRealization,
      });
      classicalNahuatlVncMeaningPresentationFrames.add(frame);
      return frame;
    }
    function isClassicalNahuatlVncMeaningPresentationFrame(frame = null) {
      if (
        !frame
        || !classicalNahuatlVncMeaningPresentationFrames.has(frame)
        || frame.kind !== CLASSICAL_NAHUATL_VNC_MEANING_PRESENTATION_FRAME_KIND
        || frame.version !== CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION
        || frame.authorizationStatus !== "authorized"
        || frame.blockReason !== ""
        || !isClassicalNahuatlVncApplicationFrame(frame.applicationFrame)
        || frame.resultFrame !== frame.applicationFrame.resultFrame
        || !isClassicalNahuatlExtantDestockalMeaningFrame(frame.meaningFrame)
        || frame.meaningFrame.applicationFrame !== frame.applicationFrame
        || !isClassicalNahuatlExtantDestockalReadingFrame(frame.readingFrame)
        || frame.readingFrame.meaningFrame !== frame.meaningFrame
        || frame.relationKind !== frame.meaningFrame.relationKind
        || frame.sourceAnalysisFrame !== frame.meaningFrame.sourceAnalysisFrame
        || frame.sourceAnalysis !== frame.meaningFrame.sourceAnalysis
        || frame.derivationOperationFrame
          !== frame.meaningFrame.derivationOperationFrame
        || frame.lexicalIdentityFrame !== frame.meaningFrame.lexicalIdentityFrame
        || frame.participantBinding !== frame.meaningFrame.participantBinding
        || frame.sourceReadings !== frame.meaningFrame.sourceReadings
        || frame.availableReadings !== frame.meaningFrame.availableReadings
        || frame.possibleMeanings !== frame.availableReadings
        || frame.supportedReadings !== frame.readingFrame.supportedReadings
        || frame.selectedReading !== frame.readingFrame.selectedReading
        || frame.selectedResolution !== frame.readingFrame.selectedResolution
        || frame.context !== frame.readingFrame.context
        || frame.meaningAssertionStatus
          !== frame.readingFrame.meaningAssertionStatus
      ) {
        return false;
      }
      const expectedChoices = frame.availableReadings.length > 1
        ? frame.availableReadings
        : [];
      const choicesExact = Array.isArray(frame.readingChoices)
        && frame.readingChoices.length === expectedChoices.length
        && frame.readingChoices.every(
          (reading, index) => reading === expectedChoices[index],
        );
      const expectedRequirementReadings = frame.availableReadings.filter(
        reading => reading.contextCondition?.required === true,
      );
      const requirementsExact = Array.isArray(frame.contextRequirements)
        && frame.contextRequirements.length === expectedRequirementReadings.length
        && frame.contextRequirements.every((requirement, index) => {
          const reading = expectedRequirementReadings[index];
          const resolution = frame.readingFrame.resolvedReadings.find(
            item => item.reading === reading,
          ) || null;
          return requirement.kind
              === "classical-nahuatl-vnc-meaning-presentation-context-requirement"
            && requirement.reading === reading
            && requirement.readingId === reading.readingId
            && requirement.meaningId === reading.meaningId
            && requirement.participantBinding === frame.participantBinding
            && requirement.participantFrame
              === frame.participantBinding.participantFrame
            && requirement.contextCondition === reading.contextCondition
            && requirement.requiredReferentKind
              === reading.contextCondition.requiredReferentKind
            && requirement.contextStatus
              === (resolution?.contextStatus || "unresolved")
            && requirement.supported === (resolution?.supported === true)
            && Object.isFrozen(requirement);
        });
      return Boolean(
        choicesExact
        && requirementsExact
        && frame.presentationRole === "read-only-owner-issued-interpretation"
        && frame.contextualFactsSupplied === Boolean(frame.readingFrame.context)
        && frame.contextSelectionIsPresentationOnly === true
        && frame.readingSelectionIsPresentationOnly === true
        && frame.presentationBlocksGeneration === false
        && frame.applicationAuthorizationUnaffected === true
        && frame.changesFiniteMorphology === false
        && frame.sourceAdmissionAuthority === false
        && frame.grammarGenerationAuthority === false
        && frame.callerSuppliedAuthorityAccepted === false
        && frame.formulaStringAuthority === false
        && frame.surfaceStringAuthority === false
        && frame.formulaRealization === frame.meaningFrame.formulaRealization
        && frame.formulaRealization === frame.resultFrame.formulaRealization
        && frame.surfaceRealization === frame.meaningFrame.surfaceRealization
        && frame.surfaceRealization === frame.resultFrame.surfaceRealization
        && Object.isFrozen(frame)
      );
    }
    function isClassicalNahuatlVncApplicationFrameInternal(frame = null) {
      if (imperfectiveApplicativeApplications.has(frame)) return isImperfectiveApplicativeApplication(frame);
      if (restrictedContainingApplications.has(frame)) return isRestrictedContainingApplication(frame);
      if (analyticalVncApplications.has(frame)) return isAnalyticalVncApplication(frame);
      if (imperfectiveApplications.has(frame)) return isClassicalNahuatlImperfectiveVncApplicationFrame(frame);
      if (preformedVncApplications.has(frame)) return isPreformedVncApplication(frame);
      if (nonactiveCarrierApplications.has(frame)) return isNonactiveCarrierApplication(frame);
      if (frame && typeof frame === "object" && (classicalNahuatlVncApplicationPersistentCanonicalFrames.has(frame) || classicalNahuatlVncApplicationValidationTransaction?.applicationFrames.has(frame))) {
        return true;
      }
      if (!frame || frame.kind !== "classical-nahuatl-vnc-application-frame" || frame.version !== CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION || frame.authorizationStatus !== "authorized" || frame.controlFrame?.authorizationStatus !== "authorized" || frame.resultFrame?.authorizationStatus !== "authorized" || !isClassicalNahuatlVncApplicationResultFrame(frame.resultFrame) || frame.normalizedRequest?.kind !== "classical-nahuatl-vnc-application-request" || frame.controlFrame?.kind !== "classical-nahuatl-vnc-application-control-frame" || frame.resultFrame.selectedSourceVoice !== frame.controlFrame.selectedSourceVoice || frame.normalizedRequest.sourceVoice !== frame.controlFrame.selectedSourceVoice || frame.resultFrame.selectedVoice !== frame.controlFrame.selectedVoice || frame.resultFrame.selectedVoiceOperation !== frame.controlFrame.selectedVoiceOperation || frame.resultFrame.selectedNonactiveOptionId !== frame.controlFrame.selectedNonactiveOptionId || frame.normalizedRequest.targetVoiceOperation !== frame.controlFrame.selectedVoiceOperation || frame.resultFrame.selectedDerivation !== frame.controlFrame.derivationType || frame.normalizedRequest.voice !== frame.controlFrame.selectedVoice || frame.normalizedRequest.derivationType !== frame.controlFrame.derivationType || frame.callerSuppliedAuthorityAccepted !== false || frame.formulaStringAuthority !== false || frame.surfaceStringAuthority !== false) {
        return false;
      }
      const runtimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget();
      const directDerivation = frame.controlFrame.derivationType === "direct";
      const inherentRoleContext =
        classicalNahuatlVncInherentSubjectRoleContextByApplicationFrame.get(frame);
      // Only this issued application can retain morphology-only formation
      // coordinates. Public provenance or a copied application cannot do so.
      const formationRequestForValidation = directDerivation
        && classicalNahuatlVncApplicationBuiltFrames.has(frame)
        && inherentRoleContext?.normalizedRequest === frame.normalizedRequest
        && inherentRoleContext.sourceMachineryFrame === frame.resultFrame.sourceMachineryFrame
        && inherentRoleContext.selectedMachineryFrame === frame.resultFrame.selectedMachineryFrame
          ? inherentRoleContext.formationRequest
          : frame.normalizedRequest;
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
          === getClassicalNahuatlVncContinuationSelectedMachinery(continuationSourceResultFrame)
        && continuationFormationSourceMachineryFrame
          === continuationSourceDescriptor
            ?.formationSourceMachineryFrame
        && (
          continuationSourceDescriptor?.sourceVoice === "active"
            ? continuationSourceMachineryFrame
              === continuationFormationSourceMachineryFrame
              || (continuationSourceMachineryFrame?.voice === "inherent-impersonal"
                && continuationSourceMachineryFrame.activeMachineryFrame === continuationFormationSourceMachineryFrame)
            : continuationSourceMachineryFrame?.activeMachineryFrame
              === continuationFormationSourceMachineryFrame
        )
        && isCanonicalClassicalNahuatlVncContinuationResult(continuationSourceResultFrame)
        && continuationSourceResultFrame.authorizationStatus === "authorized"
        && isCanonicalClassicalNahuatlVncApplicationDerivationSourceMachineryFrame(
          continuationSourceMachineryFrame,
          runtimeTarget,
        )
        && buildClassicalNahuatlVncContinuationRequest(
          formationRequestForValidation,
          continuationSourceDescriptor,
        ),
      );
      const committedTypedSourceProvenance = continuationSource
        ? null
        : classicalNahuatlVncTypedSourceApplicationProvenanceBySource.get(
          frame.resultFrame.sourceMachineryFrame,
        ) || null;
      const committedTypedSourceDescriptor =
        committedTypedSourceProvenance?.sourceDescriptor || null;
      const committedTypedSourceCanonical = Boolean(
        committedTypedSourceProvenance
        && classicalNahuatlVncApplicationBuiltFrames.has(frame)
        && committedTypedSourceProvenance.exactSourceMachineryFrame
          === frame.resultFrame.sourceMachineryFrame
        && committedTypedSourceDescriptor?.sourceAnalysisFrame
          ?.sourceMachineryFrame === frame.resultFrame.sourceMachineryFrame
        && committedTypedSourceDescriptor.formationSourceMachineryFrame
          === frame.resultFrame.formationSourceMachineryFrame
      );
      const ownerSourceDescriptor = continuationSourceCanonical
        ? continuationSourceDescriptor
        : committedTypedSourceCanonical
          ? committedTypedSourceDescriptor
          : null;
      const ownerSourceMachineryFrame = continuationSourceCanonical
        ? continuationSourceMachineryFrame
        : committedTypedSourceCanonical
          ? frame.resultFrame.sourceMachineryFrame
          : null;
      const ownerFormationSourceMachineryFrame = continuationSourceCanonical
        ? continuationFormationSourceMachineryFrame
        : committedTypedSourceCanonical
          ? frame.resultFrame.formationSourceMachineryFrame
          : null;
      const rebuiltDerivationSourceRequest =
        buildClassicalNahuatlVncApplicationDerivationSourceRequest(
          formationRequestForValidation,
        );
      const rebuiltFormationSourceMachineryFrame =
        ownerFormationSourceMachineryFrame
          ? ownerFormationSourceMachineryFrame
          : classicalNahuatlVncApplicationBuiltFrames.has(frame)
            && runtimeTarget.isClassicalNahuatlVerbstemClassFrame?.(frame.resultFrame.formationSourceMachineryFrame) === true
            && frame.resultFrame.formationSourceMachineryFrame.obsoleteRootSourceMachineryFrame
              ? runtimeTarget.buildClassicalNahuatlObsoleteRootVerbstemFrame?.(
                frame.resultFrame.formationSourceMachineryFrame.obsoleteRootSourceMachineryFrame)
              : buildClassicalNahuatlVncApplicationSourceMachinery(
                runtimeTarget, rebuiltDerivationSourceRequest,
                {denominalCausativeOperationFrame: classicalNahuatlDenominalCausativeOperationByMachinery.get(frame.resultFrame.formationSourceMachineryFrame)},
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
      const sameImpersonalCoordinate = continuationSourceCanonical
        && isClassicalNahuatlSameImpersonalCoordinateContinuation(continuationSource, frame.normalizedRequest);
      let rebuiltAllowedSourceVoices = sameImpersonalCoordinate ? Object.freeze(["impersonal"])
        : frame.normalizedRequest.derivationType === "causative"
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
      } else if (!sameImpersonalCoordinate && frame.normalizedRequest.derivationType !== "causative" && normalizedRequestedSourceVoice !== "active") {
        rebuiltSourceVoiceNormalizationReason = "source-voice-applies-only-before-causative-derivation";
      } else if (rebuiltSelectedSourceVoice !== normalizedRequestedSourceVoice) {
        rebuiltSourceVoiceNormalizationReason = "requested-source-voice-not-authorized-for-source";
      }
      const ownerSourceVoiceMatches = Boolean(
        ownerSourceDescriptor
        && rebuiltSelectedSourceVoice
          === ownerSourceDescriptor.sourceVoice
        && frame.normalizedRequest.sourceNonactiveOptionId
          === ownerSourceDescriptor.sourceNonactiveOptionId
      );
      const rebuiltSourceVoiceBundle =
        ownerSourceVoiceMatches
          ? Object.freeze({
            sourceVoice: ownerSourceDescriptor.sourceVoice,
            selectedSourceNonactiveOptionId:
              ownerSourceDescriptor.sourceNonactiveOptionId,
            sourceNonactiveStemRecord:
              ownerSourceMachineryFrame?.nonactiveStemRecord || null,
            sourceMachineryFrame: ownerSourceMachineryFrame,
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
        continuationSourceCanonical || committedTypedSourceCanonical
          ? rebuiltFormationSourceMachineryFrame
            === frame.resultFrame.formationSourceMachineryFrame
          : areClassicalNahuatlVncApplicationCanonicalValuesEqual(
            rebuiltFormationSourceMachineryFrame,
            frame.resultFrame.formationSourceMachineryFrame,
          );
      const selectedSourceRequestContinuity =
        continuationSourceCanonical || committedTypedSourceCanonical
          ? rebuiltSourceMachineryFrame
            === frame.resultFrame.sourceMachineryFrame
          : areClassicalNahuatlVncApplicationCanonicalValuesEqual(
            rebuiltSourceMachineryFrame,
            frame.resultFrame.sourceMachineryFrame,
          );
      const sourceRequestContinuity = (
        continuationSource == null || continuationSourceCanonical
      )
        && (
          committedTypedSourceProvenance == null
          || committedTypedSourceCanonical
        )
        && isClassicalNahuatlVncApplicationCanonicalActiveMachineryFrame(rebuiltFormationSourceMachineryFrame)
        && formationSourceRequestContinuity
        && (directDerivation
          ? isClassicalNahuatlVncApplicationCanonicalActiveMachineryFrame(rebuiltSourceMachineryFrame)
            || (continuationSourceCanonical
              && (rebuiltSourceMachineryFrame?.voice === "inherent-impersonal" || sameImpersonalCoordinate)
              && rebuiltSourceMachineryFrame.activeMachineryFrame === rebuiltFormationSourceMachineryFrame
              && frame.resultFrame.activeMachineryFrame === rebuiltFormationSourceMachineryFrame
              && frame.resultFrame.selectedVoiceOperation === (sameImpersonalCoordinate ? "impersonal" : "inherent-impersonal")
              && isCanonicalClassicalNahuatlVncApplicationDerivationSourceMachineryFrame(
                rebuiltSourceMachineryFrame, runtimeTarget,
              ))
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
          && operationFrame.participantTransformFrame?.sourceVoice === (
            rebuiltSourceMachineryFrame?.voice === "inherent-impersonal"
              ? "inherent-impersonal"
              : frame.normalizedRequest.sourceVoice
          )
          && operationFrame.participantTransformFrame?.targetSubject === frame.normalizedRequest.subject
          && operationFrame.participantTransformFrame?.requestedCausativeObjectKind === (
            frame.normalizedRequest.derivationType === "causative" && ["active", "impersonal"].includes(frame.normalizedRequest.sourceVoice)
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
      const directFusionTransition = classicalNahuatlVncDirectActiveRecoordinateByResultFrame.get(frame.resultFrame)?.transitionKind === "tla-fusion";
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
      const rebuiltNonactiveSourceStem = directDerivation
        ? (directFusionTransition ? rebuiltCanonicalActiveDescriptor.stem : "") || rebuiltSourceMachineryFrame?.sourceVerbstem
          || rebuiltSourceAnalysisFrame?.sourceStem
          || rebuiltCanonicalActiveDescriptor.stem
          || rebuiltVoiceTargetStem
        : rebuiltCanonicalActiveDescriptor.stem || rebuiltVoiceTargetStem;
      const rebuiltLesson20NonactiveOptionInventory = runtimeTarget.getClassicalNahuatlNonactiveStemOptions(rebuiltNonactiveSourceStem, {
        verbClass: rebuiltVoiceTargetClass,
        sourceValence: rebuiltVoiceTargetValence
      });
      const rebuiltAllowedVoiceOperations = getClassicalNahuatlVncApplicationAllowedVoices({
        sourceStem: rebuiltNonactiveSourceStem,
        sourceValence: rebuiltVoiceTargetValence,
        outputScope: frame.normalizedRequest.outputScope,
        nonactiveOptionInventory: rebuiltLesson20NonactiveOptionInventory,
        objectRequests: rebuiltVoiceObjectRequests
      });
      const rebuiltAllowedVoices = getClassicalNahuatlVncApplicationPublicAllowedVoices(rebuiltAllowedVoiceOperations);
      const normalizedRequestedVoice = CLASSICAL_NAHUATL_VNC_APPLICATION_VOICES.includes(frame.normalizedRequest.requestedVoice)
        ? frame.normalizedRequest.requestedVoice
        : "active";
      const rebuiltAutomaticInherentImpersonalVoice =
        rebuiltAllowedVoices.length === 1
        && rebuiltAllowedVoices[0] === "impersonal";
      const rebuiltSelectedVoice = rebuiltAllowedVoices.includes(normalizedRequestedVoice)
        ? normalizedRequestedVoice
        : rebuiltAutomaticInherentImpersonalVoice ? "impersonal" : "active";
      let rebuiltVoiceNormalizationReason = "";
      if (!frame.normalizedRequest.requestedVoiceRecognized) {
        rebuiltVoiceNormalizationReason = "unknown-voice-normalized-to-active";
      } else if (!frame.normalizedRequest.targetStem && normalizedRequestedVoice !== "active") {
        rebuiltVoiceNormalizationReason = "source-stem-required-before-derived-voice";
      } else if (rebuiltAutomaticInherentImpersonalVoice) {
        rebuiltVoiceNormalizationReason = "inherent-impersonal-source-fixes-public-voice";
      } else if (rebuiltSelectedVoice !== normalizedRequestedVoice) {
        rebuiltVoiceNormalizationReason = "requested-voice-not-authorized-for-source";
      }
      const rebuiltNonactiveOptionInventory = buildClassicalNahuatlVncApplicationNonactiveFormationInventory({
        publicVoice: rebuiltSelectedVoice,
        allowedVoiceOperations: rebuiltAllowedVoiceOperations,
        lesson20OptionInventory: rebuiltLesson20NonactiveOptionInventory,
        automaticOperationId: rebuiltAutomaticInherentImpersonalVoice
          ? "inherent-impersonal"
          : ""
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
          && frame.controlFrame.targetObjectCount === (directFusionTransition ? rebuiltCanonicalActiveDescriptor.objectRequests.length : sourceObjectRequests.length)
          && frame.normalizedRequest.targetStem === (directFusionTransition ? rebuiltCanonicalActiveDescriptor.stem : frame.normalizedRequest.sourceStem)
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
      const directActiveRecoordinate =
        classicalNahuatlVncDirectActiveRecoordinateByResultFrame.get(
          frame.resultFrame,
        ) || null;
      const directActiveRecoordinateRequestContinuity = Boolean(
        !directActiveRecoordinate
        || directActiveRecoordinate.normalizedRequest
          === frame.normalizedRequest
      );
      const baseFrameCanonical = Boolean(sourceRequestContinuity && sourceAnalysisContinuity && operationParticipantRequestContinuity && derivationSelectionContinuity && requestControlContinuity && nonactiveSelectionContinuity && directActiveRecoordinateRequestContinuity);
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
    function isClassicalNahuatlVncApplicationIssuedFrame(frame = null) {
      return Boolean(
        classicalNahuatlVncApplicationBuiltFrames.has(frame)
        && isClassicalNahuatlVncApplicationFrame(frame)
      );
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
      const baseNonactive = baseApplicationFrame.resultFrame
        ?.selectedMachineryFrame?.nonactiveStemRecord;
      const firstOperationContinuesBase = operations[0] === baseVoiceOperation
        || (baseVoiceOperation === "passive"
          && operations[0] === `passive-${baseNonactive?.suffixFamily}`
          && runtimeTarget.isClassicalNahuatlNonactiveStemRecord?.(baseNonactive, sourceStem) === true);
      if (
        baseVoiceOperation !== "active"
        && !firstOperationContinuesBase
      ) {
        return buildBlockedClassicalNahuatlOrderedVoiceVncApplicationFrame({
          blockReason: "classical-ordered-voice-base-operation-continuity-required",
          operations,
        });
      }
      let voiceLayerChainFrame =
        runtimeTarget.deriveClassicalNahuatlOrderedVoiceLayerChain(
          sourceStem,
          { operations },
        );
      // Productive continuation consumes the already-issued passive and its
      // exact nonactive record; it does not infer a route from the spelling.
      if (voiceLayerChainFrame.authorizationStatus !== "authorized"
        && baseVoiceOperation === "passive" && firstOperationContinuesBase) {
        voiceLayerChainFrame = runtimeTarget.deriveClassicalNahuatlOrderedVoiceLayerChain(
          sourceStem, { operations, canonicalPassiveApplicationFrame: baseApplicationFrame },
        );
      }
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
      if (!isClassicalNahuatlVncApplicationActiveFrameAuthorized(targetMachineryFrame)
        || typeof runtimeTarget.isClassicalNahuatlVncDerivationBaseSourceMachineryFrame !== "function"
        || !runtimeTarget.isClassicalNahuatlVncDerivationBaseSourceMachineryFrame(targetMachineryFrame)) {
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
      // The ordered owner qualifies the target before freezing and issuing its
      // wrapper. Formula agreement or a caller-supplied kind is not provenance.
      classicalNahuatlOrderedVoiceVncMachineryFrames.add(selectedMachineryFrame);
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
    function isClassicalNahuatlOrderedVoiceVncMachineryFrame(frame = null) {
      return Boolean(frame
        && classicalNahuatlOrderedVoiceVncMachineryFrames.has(frame)
        && Object.isFrozen(frame)
        && frame.kind === "classical-nahuatl-ordered-voice-layer-vnc-machinery-frame"
        && frame.authorizationStatus === "authorized"
        && frame.typedFrameAuthority === true);
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
        "cuēl-yeh": "cuēl yeh",
        "ye-cuēl-yeh": "ye cuēl yeh",
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
    function getClassicalNahuatlVncSentenceAdverbialProjection(particleResultFrame = null, ancestors = new Set()) {
      if (!particleResultFrame) return null;
      const runtimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget();
      if (runtimeTarget?.isClassicalNahuatlParticleResultFrame?.(particleResultFrame) === true
        && (runtimeTarget?.findClassicalNahuatlSentenceAdverbialEntry?.(particleResultFrame.sourceFrame?.particleId)
          || (() => {
            const entry = runtimeTarget?.findClassicalNahuatlSentenceParticleEntry?.(particleResultFrame.sourceFrame?.particleId);
            return entry?.functionScope === "collocation" && entry.formulaSegments?.length
              && entry.formulaSegments.every(segment => runtimeTarget?.findClassicalNahuatlSentenceAdverbialEntry?.(segment));
          })())) return particleResultFrame;
      if (runtimeTarget?.isClassicalNahuatlIssuedParticleSentenceLayerFrame?.(particleResultFrame) === true
        && particleResultFrame.nuclearClauseKind === "nnc") {
        const surface = particleResultFrame.sentenceSurfaceDisplay.replace(/[.?!]$/u, "");
        return { formula: particleResultFrame.sentenceFormulaDisplay.replace(/[.?!]$/u, ""), surface: surface.charAt(0).toLowerCase() + surface.slice(1) };
      }
      if (runtimeTarget?.isClassicalNahuatlRelationalResult?.(particleResultFrame) === true
        && particleResultFrame.sourceFrame?.subjectMode === "adverbialized") {
        return { formula: particleResultFrame.formula, surface: particleResultFrame.surface,
          negative: particleResultFrame.sourceFrame.negative === true };
      }
      if (runtimeTarget?.isClassicalNahuatlAdverbialNuclearResult?.(particleResultFrame) === true
        && particleResultFrame.authorizationStatus === "authorized") {
        return { formula: particleResultFrame.formulaRealization, surface: particleResultFrame.wordSurface };
      }
      if (runtimeTarget?.isAdverbialAdjunctionResult?.(particleResultFrame) === true
        && !ancestors.has(particleResultFrame)
        && particleResultFrame.ruleProfile?.order === "modifier-head"
        && particleResultFrame.ruleProfile.marking === "unmarked"
        && ["first", "second"].includes(particleResultFrame.ruleProfile.degree)
        && !particleResultFrame.ruleProfile.negative) {
        const principal = particleResultFrame.sourceContract?.principal?.issuedResult;
        const modifier = particleResultFrame.sourceContract?.adjoined?.issuedResult;
        const parents = new Set([...ancestors, particleResultFrame]);
        // Both children must themselves be genuine adverbial constituents.
        // A complete VNC-centred clause is not thereby a nuclear modifier.
        const principalProjection = getClassicalNahuatlVncSentenceAdverbialProjection(principal, parents);
        const modifierProjection = getClassicalNahuatlVncSentenceAdverbialProjection(modifier, parents);
        if (!principalProjection || !modifierProjection
          || !particleResultFrame.embeddedSurface) return null;
        // The AST owns the wording; its actual children supply the concrete
        // formulas in the same native modifier-head order, not a template ID.
        return {formula: `${modifierProjection.formula} + ${principalProjection.formula}`,
          surface: particleResultFrame.embeddedSurface,
          canonicalAdverbialResult: particleResultFrame, principalResult: principal, adjoinedResult: modifier};
      }
      return null;
    }
    function buildClassicalNahuatlVncSentenceFormulaRealization(sentenceSurfaceFrame = null, nuclearFormula = "", adverbialResultFrame = null) {
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
      const adverbial = getClassicalNahuatlVncSentenceAdverbialProjection(adverbialResultFrame);
      const negativeOnAdverbial = Boolean(adverbial && sentenceSurfaceFrame.lesson9NegativeRequested && prefixalStack.includes("ca#"));
      const adverbialNegativePrefix = negativeOnAdverbial || adverbial?.negative
        && sentenceLeftParticles.includes("mā") ? "ca#"
        : adverbial?.negative ? "ah#" : "";
      const nuclearPrefixes = negativeOnAdverbial ? prefixalStack.filter(prefix => prefix !== "ca#") : prefixalStack;
      const formulaWithPrefixalStack = nuclearPrefixes.length
        ? `${nuclearPrefixes.join("")}${baseFormula.startsWith("#") ? baseFormula.slice(1) : baseFormula}`
        : baseFormula;
      if (adverbialResultFrame && !adverbial) return "";
      const sentenceLeftSegments = sentenceLeftParticles.map(getClassicalNahuatlVncSentenceParticleDisplayText);
      if (adverbial) {
        const introductionIndex = sentenceLeftParticles.findLastIndex(particle => ["mā", "tlā"].includes(particle));
        sentenceLeftSegments.splice(introductionIndex + 1, 0, `${adverbialNegativePrefix}${adverbialNegativePrefix && adverbial.formula.startsWith("#") ? adverbial.formula.slice(1) : adverbial.formula}`);
      }
      const sentenceLeft = sentenceLeftSegments.length ? `${sentenceLeftSegments.join(" ")} ` : "";
      const punctuation = normalizeClassicalNahuatlVncApplicationToken(
        sentenceSurfaceFrame.finalPunctuation
      );
      return `${sentenceLeft}${formulaWithPrefixalStack}${punctuation}`;
    }
    function buildClassicalNahuatlVncSentenceSurfaceRealization(sentenceSurfaceFrame = null, nuclearSurface = "", adverbialResultFrame = null, {embedded = false} = {}) {
      const baseSurface = normalizeClassicalNahuatlVncApplicationToken(nuclearSurface);
      if (!baseSurface) return "";
      if (sentenceSurfaceFrame?.sentenceSurfaceApplies !== true) {
        // This is the final written sentence projection; nuclear and embedded
        // surfaces retain their original spelling and casing.
        return embedded ? baseSurface : `${baseSurface.charAt(0).toUpperCase()}${baseSurface.slice(1)}`;
      }
      // nuclearSurface is the canonical uncapitalized-by-syntax constituent.
      // Its lexical capitals remain meaningful after particles and prefixes.
      const baseSurfaceLower = baseSurface;
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
        return embedded ? `${prefixalSurface}${baseSurfaceLower}`
          : `${capitalize(`${prefixalSurface}${baseSurfaceLower}`)}${punctuation}`;
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
        } else if (particle === "quēn" || particle === "mach" || particle === "in") {
          prefixWords.push(particle);
        } else if (particle === "ihyo" || particle === "ye") {
          prefixWords.push(particle);
        } else if (["cuēl", "ye-cuēl", "cuēl-eh", "ye-cuēl-eh", "cuēl-yeh", "ye-cuēl-yeh", "tēl", "quin"].includes(particle)) {
          prefixWords.push(getClassicalNahuatlVncSentenceParticleDisplayText(particle));
        } else if (particle === "nēn" || particle === "nen") {
          prefixWords.push("nēn");
        } else if (!explicitPrefixalStack.length && ["ah#", "ay#", "ca#"].includes(particle)) {
          attachedPrefixes = particle === "ca#" ? "ca" : particle === "ay#" ? "ay" : "ah";
        }
      });
      const adverbial = getClassicalNahuatlVncSentenceAdverbialProjection(adverbialResultFrame);
      if (adverbialResultFrame && !adverbial) return "";
      if (adverbial) {
        const introductionIndex = prefixWords.findLastIndex(particle => ["mā", "tlā"].includes(particle));
        const negativeOnAdverbial = sentenceSurfaceFrame.lesson9NegativeRequested && attachedPrefixes.startsWith("ca");
        if (negativeOnAdverbial) attachedPrefixes = attachedPrefixes.slice(2);
        const adverbialNegativePrefix = negativeOnAdverbial || adverbial.negative
          && prefixWords.includes("mā") ? "ca"
          : adverbial.negative ? "ah" : "";
        prefixWords.splice(introductionIndex + 1, 0, `${adverbialNegativePrefix}${adverbial.surface}`);
      }
      const nuclearWithAttachedPrefixes = attachedPrefixes
        ? `${attachedPrefixes}${baseSurfaceLower}`
        : baseSurfaceLower;
      const sentence = prefixWords.length
        ? `${prefixWords.join(" ")} ${nuclearWithAttachedPrefixes}`
        : nuclearWithAttachedPrefixes;
      return embedded ? sentence : `${capitalize(sentence)}${punctuation}`;
    }
    function getClassicalNahuatlVncSentenceSurfaceFrameFromMachinery(
      machineryFrame = null
    ) {
      return machineryFrame?.sentenceSurfaceFrame
        || machineryFrame?.proofFrame?.conclusion?.sentenceSurfaceFrame
        || null;
    }
    function getClassicalNahuatlIssuedNonactiveSentenceApplication(sourceFrame = null) {
      const application = isClassicalNahuatlVncApplicationFrame(sourceFrame)
        ? sourceFrame : classicalNahuatlVncApplicationFrameByResultFrame.get(sourceFrame);
      if (restrictedContainingApplications.has(application) && isRestrictedContainingApplication(application)) return application;
      if (analyticalVncApplications.has(application) && isAnalyticalVncApplication(application)) return application;
      if (imperfectiveApplicativeApplications.has(application) && isImperfectiveApplicativeApplication(application)) return application;
      if (isClassicalNahuatlImperfectiveVncApplicationFrame(application)) return application;
      if (preformedVncApplications.has(application) && isPreformedVncApplication(application)) return application;
      return isClassicalNahuatlVncApplicationFrame(application)
        && application.authorizationStatus === "authorized"
        && ["passive", "impersonal", "inherent-impersonal", "tla-impersonal"].includes(
          application.resultFrame?.selectedMachineryFrame?.voiceTransformationFrame?.voice)
        ? application : null;
    }
    function getClassicalNahuatlIssuedDenominalSentenceApplication(sourceFrame = null) {
      const runtime = getClassicalNahuatlVncApplicationRuntimeTarget();
      const child = sourceFrame?.canonicalVncFrame;
      return runtime?.isClassicalNahuatlDenominalVncResultFrame?.(sourceFrame) === true
        && sourceFrame.authorizationStatus === "authorized"
        && isClassicalNahuatlVncApplicationFrame(child)
        && child.authorizationStatus === "authorized"
        ? child : null;
    }
    function getClassicalNahuatlIssuedNominalSentenceApplication(sourceFrame = null) {
      const runtime = getClassicalNahuatlVncApplicationRuntimeTarget();
      // Incorporated adverbial grammar owns its lexical Source and exact
      // nominal VNC child. Retain that whole as the sentence's parent.
      if (runtime?.isClassicalNahuatlAdverbialNuclearResult?.(sourceFrame) === true
        && sourceFrame.authorizationStatus === "authorized"
        && sourceFrame.scope === "incorporated-predicate"
        && sourceFrame.canonicalResult?.constructionKind === "nominal-embed-vnc") {
        return getClassicalNahuatlIssuedNominalSentenceApplication(sourceFrame.canonicalResult);
      }
      // The patientive owner retains its whole continuation and the actual
      // nominally composed VNC. The sentence consumes that issued child while
      // preserving the whole continuation as its parent.
      if (runtime?.isClassicalNahuatlDeverbalNncGrammarFrame?.(sourceFrame) === true
        && sourceFrame.authorizationStatus === "authorized"
        && sourceFrame.constructionKind === "patientive-embed-continuation"
        && sourceFrame.canonicalResult?.constructionKind === "nominal-embed-vnc") {
        return getClassicalNahuatlIssuedNominalSentenceApplication(sourceFrame.canonicalResult);
      }
      if (runtime?.isClassicalNahuatlNominalConstructionResult?.(sourceFrame) !== true
        || sourceFrame.authorizationStatus !== "authorized"
        || !(sourceFrame.constructionKind === "nominal-embed-vnc"
          || (sourceFrame.constructionKind === "cardinal-numeral-nnc"
            && ["cardinal-numeral-vnc-embed", "cardinal-numeral-vnc-adverb"].includes(sourceFrame.constructionFamily)))
        || sourceFrame.canonicalResult?.authorizationStatus !== "authorized") return null;
      if (isClassicalNahuatlVncApplicationFrame(sourceFrame.canonicalResult)) {
        return sourceFrame.canonicalResult;
      }
      // The nominal owner can inherit an authenticated irregular matrix's
      // finite coordinate. Its issued closure is the finite child; the whole
      // nominal Result remains the sentence parent.
      const closure = sourceFrame.canonicalResult.resultFrame;
      const coordinate = closure?.operationFrame?.operationFacts?.nominalMatrixCoordinateFrame;
      return runtime.isClassicalNahuatlClosureFrame?.(closure) === true
        && closure.authorizationStatus === "authorized"
        && runtime.isClassicalNahuatlNominalVncMatrixCoordinateFrame?.(coordinate) === true
        && coordinate.sourceAuthorizationFrame === sourceFrame.sourceAuthorizationFrame
        ? sourceFrame.canonicalResult : null;
    }
    function getClassicalNahuatlVncSentenceResultSource(sourceFrame = null) {
      const nominalApplication = getClassicalNahuatlIssuedNominalSentenceApplication(sourceFrame);
      if (nominalApplication) {
        const finite = getClassicalNahuatlVncSentenceResultSource(
          isClassicalNahuatlVncApplicationFrame(nominalApplication)
            ? nominalApplication : nominalApplication.resultFrame);
        return finite ? {...finite, sourceKind: sourceFrame.kind,
          canonicalSourceFrame: sourceFrame, canonicalResultFrame: sourceFrame,
          nuclearFormula: sourceFrame.formulaRealization,
          nuclearSurface: sourceFrame.wordSurface} : null;
      }
      const nonactiveApplication = getClassicalNahuatlIssuedNonactiveSentenceApplication(sourceFrame);
      if (nonactiveApplication && sourceFrame !== nonactiveApplication) {
        const finite = getClassicalNahuatlVncSentenceResultSource(nonactiveApplication);
        return finite ? {...finite, canonicalSourceFrame: sourceFrame,
          canonicalResultFrame: sourceFrame} : null;
      }
      const denominalOwner = getClassicalNahuatlVncApplicationRuntimeTarget();
      if (denominalOwner?.isClassicalNahuatlDenominalVncResultFrame?.(sourceFrame) === true) {
        const finiteSource = getClassicalNahuatlVncSentenceResultSource(sourceFrame.canonicalVncFrame);
        return finiteSource ? {
          ...finiteSource,
          sourceKind: sourceFrame.kind,
          canonicalSourceFrame: sourceFrame,
          canonicalResultFrame: sourceFrame,
        } : null;
      }
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
    function buildClassicalNahuatlPurposiveSentenceEnvelope(sourceFrame, selections) {
      const source = getClassicalNahuatlVncSentenceResultSource(sourceFrame);
      const operation = source?.lateOperationClosureFrame?.operationFrame;
      const runtime = getClassicalNahuatlVncApplicationRuntimeTarget();
      if (operation?.ruleFamily !== "purposive-paradigm"
        || typeof runtime?.buildClassicalNahuatlVncSentenceSurfaceFrame !== "function"
        || !selections || typeof selections !== "object"
        || Array.isArray(selections)
        || getClassicalNahuatlVncApplicationPresentFields(
          selections, CLASSICAL_NAHUATL_VNC_APPLICATION_CALLER_AUTHORITY_FIELDS,
        ).length
        || getClassicalNahuatlVncApplicationCurriculumCarrierFields(selections).length
        || getClassicalNahuatlVncApplicationPresentFields(
          selections.sentenceOptions, CLASSICAL_NAHUATL_VNC_APPLICATION_CALLER_AUTHORITY_FIELDS,
        ).length
        || getClassicalNahuatlVncApplicationCurriculumCarrierFields(selections.sentenceOptions).length) return null;
      const options = buildClassicalNahuatlVncApplicationSentenceOptions(selections);
      const antecessiveRequested = options.sentenceAntecessive
        || options.outsidePrefixes.some(prefix => ["o", "ō", "o#", "ō#"].includes(prefix));
      if (antecessiveRequested
        && operation.operationFacts.ordinaryAntecessiveAvailable !== true) return null;
      const optative = operation.operationFacts.series.endsWith("-optative");
      if (!optative && options.introductoryParticle
        && options.introductoryParticle !== "none") return null;
      const subject = getClassicalNahuatlVncContinuationSourceConstituents(sourceFrame)?.sourceSubject;
      const envelope = runtime.buildClassicalNahuatlVncSentenceSurfaceFrame({
        selectedFormula: source.nuclearFormula,
        mood: optative ? "optative" : "indicative",
        options: {...options, sentenceType: options.sentenceType || "affirmative-assertion", subject,
          tense: optative ? "nonpast" : operation.operationFacts.matrixTenseMeaning},
      });
      // Preserve the sentence owner's reason so missing obligatory choices stay
      // discoverable without granting an executable sentence.
      return envelope
        ? deepFreezeClassicalNahuatlVncApplicationValue(envelope) : null;
    }
    function getClassicalNahuatlIssuedCompoundSentenceCoordinate(sourceFrame) {
      const runtime = getClassicalNahuatlVncApplicationRuntimeTarget();
      if (runtime?.isClassicalNahuatlClosureFrame?.(sourceFrame) !== true
        || sourceFrame.authorizationStatus !== "authorized") return null;
      const operation = sourceFrame.operationFrame;
      const machinery = sourceFrame.selectedMachineryFrame;
      const facts = operation.operationFacts;
      const coordinate = operation.targetCoordinate;
      if (operation.ruleFamily === "attitude-compound"
        && ["honorific", "pejorative"].includes(operation.operation)
        && runtime.isClassicalNahuatlClosureFrame?.(facts.typedCompoundSourceFrame) === true
        && runtime.isClassicalNahuatlClosureFrame?.(facts.typedMemberTransformationFrame) === true
        && machinery.operationFrame === operation
        && runtime.isClassicalNahuatlMachineryFrame?.(machinery) === true
        && sourceFrame.finiteSurfaceFrame.machineryFrame === machinery
        && coordinate?.subject && coordinate.mood && coordinate.tense) return coordinate;
      if (operation.operation !== "compound"
        || !["compound-connective-t", "compound-shared-object"].includes(operation.ruleFamily)
        || machinery.operationFrame !== operation
        || runtime.isClassicalNahuatlMachineryFrame?.(machinery) !== true
        || sourceFrame.finiteSurfaceFrame.machineryFrame !== machinery
        || facts.matrixSuppliesFiniteMoodAndTense !== true
        || !coordinate?.subject || !coordinate.mood || !coordinate.tense
        || coordinate.subject !== facts.matrixFiniteSubject
        || coordinate.mood !== facts.matrixFiniteMood
        || coordinate.tense !== facts.matrixFiniteTense) return null;
      return coordinate;
    }
    function getClassicalNahuatlIssuedHonorificSentenceCoordinate(sourceFrame) {
      const runtime = getClassicalNahuatlVncApplicationRuntimeTarget();
      if (runtime?.isClassicalNahuatlClosureFrame?.(sourceFrame) !== true
        || sourceFrame.authorizationStatus !== "authorized") return null;
      const operation = sourceFrame.operationFrame;
      const machinery = sourceFrame.selectedMachineryFrame;
      const application = operation.targetApplicationFrame;
      const coordinate = operation.targetCoordinate;
      if (operation.operation !== "honorific"
        || !["causative", "applicative"].includes(operation.variant)
        || machinery.operationFrame !== operation
        || runtime.isClassicalNahuatlMachineryFrame?.(machinery) !== true
        || sourceFrame.finiteSurfaceFrame.machineryFrame !== machinery
        || !isClassicalNahuatlVncApplicationFrame(application)
        || application.authorizationStatus !== "authorized"
        || application.normalizedRequest.sourceStem !== operation.targetStem
        || application.normalizedRequest.verbClass !== operation.targetClass
        || !coordinate?.subject || !coordinate.mood || !coordinate.tense
        || coordinate.subject !== application.normalizedRequest.subject
        || coordinate.mood !== application.normalizedRequest.mood
        || coordinate.tense !== application.normalizedRequest.tense) return null;
      return coordinate;
    }
    function getClassicalNahuatlIssuedFrequentativeSentenceCoordinate(sourceFrame) {
      const preformed=preformedVncApplications.get(sourceFrame);
      if (preformed && isPreformedVncApplication(sourceFrame)) sourceFrame=preformed.closure;
      const runtime = getClassicalNahuatlVncApplicationRuntimeTarget();
      if (runtime?.isClassicalNahuatlClosureFrame?.(sourceFrame) !== true
        || sourceFrame.authorizationStatus !== "authorized") return null;
      const operation = sourceFrame.operationFrame;
      const machinery = sourceFrame.selectedMachineryFrame;
      const coordinate = operation.targetCoordinate;
      const request = sourceFrame.normalizedRequest;
      if (operation.operation !== "frequentative"
        || machinery.operationFrame !== operation
        || runtime.isClassicalNahuatlMachineryFrame?.(machinery) !== true
        || sourceFrame.finiteSurfaceFrame?.machineryFrame !== machinery
        || !coordinate?.subject || !coordinate.mood || !coordinate.tense
        || coordinate.subject !== request.subject
        || coordinate.mood !== request.mood
        || coordinate.tense !== request.tense) return null;
      return coordinate;
    }
    function buildClassicalNahuatlSelectedSentenceEnvelope(sourceFrame, selections) {
      const issuedSpecialApplication = getClassicalNahuatlIssuedNonactiveSentenceApplication(sourceFrame)
        || getClassicalNahuatlIssuedNominalSentenceApplication(sourceFrame)
        || getClassicalNahuatlIssuedDenominalSentenceApplication(sourceFrame);
      const ordinaryApplication = !issuedSpecialApplication
        && isClassicalNahuatlVncApplicationFrame(sourceFrame) ? sourceFrame : null;
      const application = issuedSpecialApplication || ordinaryApplication;
      const compoundCoordinate = getClassicalNahuatlIssuedCompoundSentenceCoordinate(sourceFrame);
      const honorificCoordinate = getClassicalNahuatlIssuedHonorificSentenceCoordinate(sourceFrame);
      const frequentativeCoordinate = getClassicalNahuatlIssuedFrequentativeSentenceCoordinate(sourceFrame);
      if (!application && !compoundCoordinate && !honorificCoordinate && !frequentativeCoordinate) return buildClassicalNahuatlPurposiveSentenceEnvelope(sourceFrame, selections);
      const source = getClassicalNahuatlVncSentenceResultSource(sourceFrame);
      const nominalCoordinate = application?.resultFrame?.operationFrame?.operationFacts?.nominalMatrixCoordinateFrame;
      const finite = imperfectiveApplicativeApplications.get(sourceFrame)?.coordinate || restrictedContainingApplications.get(sourceFrame)?.coordinate || analyticalVncApplications.get(sourceFrame)?.coordinate || getImperfectiveVncContext(sourceFrame)?.coordinate || compoundCoordinate || honorificCoordinate || frequentativeCoordinate
        || (getClassicalNahuatlVncApplicationRuntimeTarget()?.isClassicalNahuatlNominalVncMatrixCoordinateFrame?.(nominalCoordinate) === true ? nominalCoordinate.coordinate : null)
        || source?.selectedMachineryFrame?.predicateFormationRuleFrame;
      const runtime = getClassicalNahuatlVncApplicationRuntimeTarget();
      if (!source || !finite || !selections || typeof selections !== "object"
        || Array.isArray(selections)
        || [selections, selections.sentenceOptions || {}].some(request => (
          getClassicalNahuatlVncApplicationPresentFields(request,
            CLASSICAL_NAHUATL_VNC_APPLICATION_CALLER_AUTHORITY_FIELDS).length
          || getClassicalNahuatlVncApplicationCurriculumCarrierFields(request).length
          || ["subject", "mood", "tense", "voice", "requestedVoice", "requestedDerivation", "derivationOptionId"]
            .some(key => Object.prototype.hasOwnProperty.call(request, key))
        ))) return null;
      const inheritedEnvelope = !ordinaryApplication
        ? application?.normalizedRequest?.sentenceOptions
          || sourceFrame.normalizedRequest?.sentenceOptions
          || null : null;
      const suppliedEnvelope = buildClassicalNahuatlVncSentenceEnvelopeSelections(selections);
      const envelopeSelections = inheritedEnvelope
        ? {...inheritedEnvelope, ...suppliedEnvelope} : selections;
      // Both names denote one existing choice. An explicit false must clear
      // both inherited aliases rather than reviving the older true value.
      if (inheritedEnvelope && (Object.prototype.hasOwnProperty.call(suppliedEnvelope, "sentenceAntecessive")
        || Object.prototype.hasOwnProperty.call(suppliedEnvelope, "antecessive"))) {
        const antecessive = suppliedEnvelope.sentenceAntecessive === true
          || suppliedEnvelope.antecessive === true;
        envelopeSelections.sentenceAntecessive = antecessive;
        envelopeSelections.antecessive = antecessive;
      }
      const options = buildClassicalNahuatlVncApplicationSentenceOptions(envelopeSelections);
      if (ordinaryApplication) {
        // Reuse the existing finite owner's sentence validation, but retain
        // the accepted nucleus itself as this sentence's canonical parent.
        const record = getClassicalNahuatlVncContinuationBindingSource(sourceFrame, "vnc:application");
        const recaptured = buildClassicalNahuatlVncContinuationRecaptureRequest(record);
        // The generic machinery envelope omits this selected finite allomorph.
        // Revalidation must retain the exact issued nucleus's choice; a caller
        // changing it still has to pass the nucleus comparison below.
        const irregularStemChoice = ordinaryApplication.normalizedRequest.sentenceOptions?.irregularStemChoice;
        const inherited = recaptured && irregularStemChoice
          ? {...recaptured, sentenceOptions:{...recaptured.sentenceOptions, irregularStemChoice}}
          : recaptured;
        const retiredNegativePrefixes = {};
        if (getClassicalNahuatlVncApplicationRequestValue(selections, "sentenceType") === "affirmative-assertion"
          && getClassicalNahuatlVncApplicationRequestValue(selections, "negative") === false) {
          for (const key of ["requestedNegativePrefix", "negativePrefix"]) {
            if (getClassicalNahuatlVncApplicationRequestValue(selections, key) === undefined) retiredNegativePrefixes[key] = "";
          }
          if (getClassicalNahuatlVncApplicationRequestValue(selections, "outsidePrefixes") === undefined) {
            retiredNegativePrefixes.outsidePrefixes = (inherited?.sentenceOptions?.outsidePrefixes || [])
              .filter(prefix => !["ah", "ah#", "ay", "ay#"].includes(prefix));
          }
        }
        const preview = inherited ? getClassicalNahuatlVncApplicationSharedService().continueFromResult(
          record.continuationInputResult,
          {...inherited, ...retiredNegativePrefixes, ...selections,
            sentenceType: selections.sentenceType || "affirmative-assertion"},
        ) : null;
        if (!isClassicalNahuatlVncApplicationFrame(preview)
          || preview.authorizationStatus !== "authorized"
          || preview.resultFrame.surfaceRealization !== source.nuclearSurface
          || preview.resultFrame.formulaRealization !== source.nuclearFormula) return null;
        const envelope = getClassicalNahuatlVncSentenceSurfaceFrameFromMachinery(preview.resultFrame.selectedMachineryFrame);
        return envelope ? deepFreezeClassicalNahuatlVncApplicationValue(envelope) : null;
      }
      const envelope = runtime.buildClassicalNahuatlVncSentenceSurfaceFrame?.({
        selectedFormula: source.nuclearFormula, mood: finite.mood,
        priorVncFrame: source.selectedMachineryFrame?.priorVncFrame,
        predicateFormationRuleFrame: source.selectedMachineryFrame?.predicateFormationRuleFrame,
        options: {...options, sentenceType: options.sentenceType || "affirmative-assertion",
          subject: finite.subject, tense: finite.tense},
      });
      if (getClassicalNahuatlIssuedDenominalSentenceApplication(sourceFrame)
        && sourceFrame.operationFrame.operationId === "included-possessor-ti"
        && sourceFrame.sourceFrame.includedPossessorSourceFacts.requiredExclamatory
        && envelope?.finalPunctuation !== "!") return null;
      return envelope ? deepFreezeClassicalNahuatlVncApplicationValue(envelope) : null;
    }
    function snapshotClassicalNahuatlVncSentenceEnvelopeData(value) {
      const copies = new WeakMap(), active = new WeakSet();
      const copy = entry => {
        if (typeof entry === "function") throw new Error("sentence-envelope-callable");
        if (entry === null || typeof entry !== "object") return entry;
        if (active.has(entry)) throw new Error("sentence-envelope-cycle");
        if (copies.has(entry)) return copies.get(entry);
        const array = Array.isArray(entry), prototype = Object.getPrototypeOf(entry);
        if (array ? prototype !== Array.prototype
          : prototype !== Object.prototype && prototype !== null) throw new Error("sentence-envelope-prototype");
        const snapshot = array ? [] : Object.create(prototype);
        copies.set(entry, snapshot);
        active.add(entry);
        for (const key of Reflect.ownKeys(entry)) {
          const descriptor = Object.getOwnPropertyDescriptor(entry, key);
          if (!descriptor || !("value" in descriptor)) throw new Error("sentence-envelope-accessor");
          // Retain all own fields and enumerability, including forbidden
          // nonenumerable keys. Only private copies are frozen or normalized.
          Object.defineProperty(snapshot, key, {...descriptor, value: copy(descriptor.value)});
        }
        active.delete(entry);
        return Object.freeze(snapshot);
      };
      try {
        return value && typeof value === "object" ? {value: copy(value)} : null;
      } catch (_error) {
        return null;
      }
    }
    function buildClassicalNahuatlVncSentenceResultFrame(sourceFrame = null, envelopeSelections = null) {
      if (classicalNahuatlVncApplicationValidationTransaction) {
        return buildClassicalNahuatlVncSentenceResultFrameInternal(sourceFrame, envelopeSelections);
      }
      // Snapshot foreign choices before opening the closed owner-validation
      // transaction. Accessors and other non-data inputs retain the old path.
      const snapshot = envelopeSelections === null ? null
        : snapshotClassicalNahuatlVncSentenceEnvelopeData(envelopeSelections);
      if (envelopeSelections !== null && !snapshot) {
        return buildClassicalNahuatlVncSentenceResultFrameInternal(sourceFrame, envelopeSelections);
      }
      return runClassicalNahuatlVncApplicationValidationTransaction(() =>
        buildClassicalNahuatlVncSentenceResultFrameInternal(sourceFrame,
          snapshot ? snapshot.value : envelopeSelections));
    }
    function buildClassicalNahuatlVncSentenceResultFrameInternal(sourceFrame = null, envelopeSelections = null) {
      const canonicalSource = getClassicalNahuatlVncSentenceResultSource(
        sourceFrame
      );
      // A typed Source can retain an earlier Sentence while the issued voice
      // application selects a new envelope. Its normalized owner request,
      // rather than the retained active Source envelope, owns that Sentence.
      const issuedNonactiveApplication = envelopeSelections === null
        ? getClassicalNahuatlIssuedNonactiveSentenceApplication(sourceFrame)
        : null;
      const exactIssuedNonactiveApplication = issuedNonactiveApplication
        && classicalNahuatlVncApplicationFrameByResultFrame.get(
          issuedNonactiveApplication.resultFrame,
        ) === issuedNonactiveApplication
          ? issuedNonactiveApplication : null;
      const selectedEnvelope = envelopeSelections
        ?? exactIssuedNonactiveApplication?.normalizedRequest?.sentenceOptions
        ?? getClassicalNahuatlIssuedDenominalSentenceApplication(sourceFrame)?.normalizedRequest?.sentenceOptions
        ?? null;
      const sentenceSurfaceFrame = selectedEnvelope !== null
        ? buildClassicalNahuatlSelectedSentenceEnvelope(sourceFrame, selectedEnvelope)
        : canonicalSource
        ? getClassicalNahuatlVncSentenceSurfaceFrameFromMachinery(
          canonicalSource.selectedMachineryFrame
        )
        : null;
      const sentenceRequested = sentenceSurfaceFrame?.sentenceSurfaceApplies === true;
      const sentenceAuthorized = (selectedEnvelope === null || Boolean(sentenceSurfaceFrame)) && (!sentenceRequested
        || sentenceSurfaceFrame?.authorizationStatus === "authorized");
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
        embeddedSurface: authorizationStatus === "authorized"
          ? buildClassicalNahuatlVncSentenceSurfaceRealization(sentenceSurfaceFrame, nuclearSurface, null, {embedded: true}) : "",
        sentenceFormulaAttachment: authorizationStatus === "authorized"
          ? getClassicalNahuatlVncSentenceFormulaAttachment(
            sentenceSurfaceFrame
          )
          : "",
        // Formula tokens retain their spelling. Written sentence case belongs
        // to the final surface even when no sentence layer was selected (§8.2).
        sentenceFormulaInitialCapitalization: "preserve",
        sentenceSurfaceInitialCapitalization: authorizationStatus === "authorized"
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
        if (selectedEnvelope !== null) classicalNahuatlVncSentenceEnvelopeReceipts.set(frame,
          buildClassicalNahuatlVncSentenceEnvelopeSelections(selectedEnvelope));
      }
      return frame;
    }
    function getClassicalNahuatlVncSentenceValidationCapabilities(runtime) {
      if (!runtime || typeof runtime !== "object") return null;
      const capabilities = [], names = new Set(), owners = new Set();
      try {
        for (let owner = runtime; owner && !owners.has(owner); owner = Object.getPrototypeOf(owner)) {
          owners.add(owner);
          for (const name of Reflect.ownKeys(owner)) {
            if (typeof name !== "string" || !/^[a-z].*(?:Classical|Grammar)/u.test(name) || names.has(name)) continue;
            names.add(name);
            const descriptor = Object.getOwnPropertyDescriptor(owner, name);
            // The installed module proxy has synthetic configurable fallback
            // descriptors. Compare their exact identities and descriptors;
            // neither their flags nor callable identity prove closure purity.
            if (!descriptor || !("value" in descriptor)) return null;
            capabilities.push({name, owner, value: descriptor.value,
              writable: descriptor.writable, configurable: descriptor.configurable,
              enumerable: descriptor.enumerable});
          }
        }
      } catch { return null; }
      return capabilities.length ? capabilities : null;
    }
    function isClassicalNahuatlVncSentenceImmutableDataGraph(value) {
      const pending = [value], seen = new Set();
      try {
        while (pending.length) {
          const current = pending.pop();
          if (current === null || typeof current !== "object") {
            if (typeof current === "function") return false;
            continue;
          }
          if (seen.has(current) || classicalNahuatlVncSentenceImmutableDataGraphs.has(current)) continue;
          const prototype = Object.getPrototypeOf(current);
          if (!Object.isFrozen(current)
            || !(prototype === null || prototype === Object.prototype
              || Array.isArray(current) && prototype === Array.prototype)) return false;
          seen.add(current);
          for (const name of Reflect.ownKeys(current)) {
            const descriptor = Object.getOwnPropertyDescriptor(current, name);
            if (!descriptor || !("value" in descriptor)) return false;
            pending.push(descriptor.value);
          }
        }
      } catch { return false; }
      // Memoize only after the entire reachable data graph has passed.
      for (const current of seen) classicalNahuatlVncSentenceImmutableDataGraphs.add(current);
      return true;
    }
    function getClassicalNahuatlVncSentenceValidationContext(frame) {
      const parent = frame.canonicalSourceFrame;
      const selections = classicalNahuatlVncSentenceEnvelopeReceipts.get(frame);
      if (frame.canonicalSourceKind !== "classical-nahuatl-vnc-application-frame"
        || parent !== frame.vncApplicationFrame
        || !classicalNahuatlVncApplicationBuiltFrames.has(parent)
        || !classicalNahuatlVncApplicationPersistentCanonicalFrames.has(parent)
        || !selections
        || !isClassicalNahuatlVncSentenceImmutableDataGraph(frame)
        || !isClassicalNahuatlVncSentenceImmutableDataGraph(selections)) return null;
      const runtime = getClassicalNahuatlVncApplicationRuntimeTarget();
      const capabilities = getClassicalNahuatlVncSentenceValidationCapabilities(runtime);
      return capabilities ? {parent, selections, runtime, capabilities} : null;
    }
    function areClassicalNahuatlVncSentenceValidationContextsEqual(left, right) {
      return Boolean(left && right && left.parent === right.parent
        && left.selections === right.selections && left.runtime === right.runtime
        && left.capabilities.length === right.capabilities.length
        && left.capabilities.every((capability, index) => {
          const other = right.capabilities[index];
          return capability.name === other.name && capability.owner === other.owner
            && capability.value === other.value && capability.writable === other.writable
            && capability.configurable === other.configurable
            && capability.enumerable === other.enumerable;
        }));
    }
    function isClassicalNahuatlVncSentenceResultFrame(frame = null) {
      return runClassicalNahuatlVncApplicationValidationTransaction(() =>
        isClassicalNahuatlVncSentenceResultFrameInternal(frame));
    }
    function isClassicalNahuatlVncSentenceResultFrameInternal(frame = null) {
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
        || frame.sentenceFormulaInitialCapitalization !== "preserve"
        || frame.sentenceSurfaceInitialCapitalization !== "syntactic-sentence-initial") {
        return false;
      }
      // Only a previously fully checked, exact issued immutable Sentence
      // with its private ordinary parent and receipt can reuse that success.
      const validationContext = getClassicalNahuatlVncSentenceValidationContext(frame);
      if (areClassicalNahuatlVncSentenceValidationContextsEqual(
        classicalNahuatlVncSentenceValidationReceipts.get(frame), validationContext)) return true;
      classicalNahuatlVncSentenceValidationReceipts.delete(frame);
      const canonicalSource = frame
        ? getClassicalNahuatlVncSentenceResultSource(frame.canonicalSourceFrame)
        : null;
      const envelopeSelections = frame && classicalNahuatlVncSentenceEnvelopeReceipts.get(frame);
      const expectedEnvelope = envelopeSelections
        ? buildClassicalNahuatlSelectedSentenceEnvelope(frame.canonicalSourceFrame, envelopeSelections)
        : getClassicalNahuatlVncSentenceSurfaceFrameFromMachinery(canonicalSource?.selectedMachineryFrame);
      if (!canonicalSource
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
        || (envelopeSelections
          ? !expectedEnvelope || !areClassicalNahuatlVncApplicationCanonicalValuesEqual(frame.sentenceSurfaceFrame, expectedEnvelope)
          : frame.sentenceSurfaceFrame !== expectedEnvelope)) {
        return false;
      }
      const valid = frame.consumedNuclearFormula === canonicalSource.nuclearFormula
        && frame.consumedNuclearSurface === canonicalSource.nuclearSurface
        && frame.sentenceFormulaDisplay === buildClassicalNahuatlVncSentenceFormulaRealization(
          frame.sentenceSurfaceFrame,
          frame.consumedNuclearFormula
        )
        && frame.sentenceSurfaceDisplay === buildClassicalNahuatlVncSentenceSurfaceRealization(
          frame.sentenceSurfaceFrame,
          frame.consumedNuclearSurface
        )
        && frame.embeddedSurface === buildClassicalNahuatlVncSentenceSurfaceRealization(
          frame.sentenceSurfaceFrame, frame.consumedNuclearSurface, null, {embedded: true})
        && frame.sentenceFormulaAttachment
          === getClassicalNahuatlVncSentenceFormulaAttachment(
            frame.sentenceSurfaceFrame
          );
      if (valid && areClassicalNahuatlVncSentenceValidationContextsEqual(
        validationContext, getClassicalNahuatlVncSentenceValidationContext(frame))) {
        classicalNahuatlVncSentenceValidationReceipts.set(frame, validationContext);
      }
      return valid;
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
      const sentenceParticles = sentenceResult.sentenceSurfaceFrame?.sentenceParticles || [];
      const sentenceOptions = getClassicalNahuatlVncApplicationCanonicalSentenceOptions(
        sentenceResult.vncApplicationResultFrame?.selectedMachineryFrame,
      );
      return {
        request,
        sourceStem,
        canonicalRealization,
        prefixalStack,
        valid: sourceStem === "cihuāmiqui"
          && request.derivationType === "direct"
          && request.sourceVoice === "active"
          && request.voice === "active"
          && request.sourceValence === "intransitive"
          && request.sourceObjectRequests.length === 0
          && request.subject === "1sg"
          && request.mood === "indicative"
          && request.tense === "preterit"
          && !sentenceOptions.directionalPrefix
          && !sentenceOptions.incorporatedAdverb
          && prefixalStack.length === 1
          && prefixalStack[0] === "ō#"
          && sentenceParticles.length === 0,
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
      if (authorized) classicalNahuatlWidowhoodInterpretationResults.set(result, source);
      return result;
    }
    function isClassicalNahuatlWidowhoodCompoundInterpretationResult(result = null) {
      const source = classicalNahuatlWidowhoodInterpretationResults.get(result);
      return Boolean(
        result
        && classicalNahuatlWidowhoodInterpretationResults.has(result)
        && isClassicalNahuatlWidowhoodCompoundInterpretationSource(source)
        && result.kind === "classical-nahuatl-widowhood-compound-interpretation-result"
        && result.version === 1
        && result.authorizationStatus === "authorized"
        && result.semanticOwnerId === "classical-incorporated-adverb-supplement-subject"
        && result.operationId === "classical.vnc.compound.widowhood.interpret"
        && result.canonicalRealization === source.canonicalRealization
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
      if (selectedOption.sourceAttestationFrame) {
        procedureType = "source-attested-formally-unjustified-object";
        label = "Attested object · formally unjustified";
        explanation = selectedOption.sourceAttestationFrame.explanation;
      } else if (stemRelation === "surface-identical-morphological-replacement") {
        procedureType = stemRelation;
        label = "Morphological replacement · same spelling";
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
        "fused-destockal-hua-exact": "Fused destockal hua analysis",
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
        "fused-destockal-hua-exact": "Recovers the reconstructed root, stock formative, and hua theme of the extant fused source.",
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
      const typedYaTheme = rootPlusYa
        && analysis.themeFrame?.formative === "ya"
        ? analysis.themeFrame : null;
      const parts = typedYaTheme
        ? [{
          segment: typedYaTheme.host || analysis.root || segments.slice(0, -1).join("-"),
          role: typedYaTheme.hostRank === "verbstem"
            ? "verbstem base" : "root",
        }, {
          segment: typedYaTheme.formative,
          role: "ya stem formative",
        }]
        : segments.map((segment, index) => {
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
        label: typedYaTheme?.hostRank === "verbstem"
          ? "Verbstem + ya analysis"
          : labels[category] || "Andrews source analysis",
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
          { canonicalSelectionForConstitution: true },
        );
      const sourceSelection = sourceMachineryFrame?.sourceSelectionFrame;
      if (sourceSelection?.authorizationStatus === "authorized"
        && sourceSelection.selectedSourceKind === "embed-matrix"
        && sourceSelection.typedSourceSelectsEmbedMatrix === true
        && sourceSelection.typedPartsMatchStem === true
        && sourceSelection.selectedEmbedStem === normalizedRequest.sourceEmbedStem
        && sourceSelection.selectedMatrixStem === normalizedRequest.sourceMatrixStem) {
        return deepFreezeClassicalNahuatlVncApplicationValue({
          frameRole: "classical-nahuatl-vnc-source-constitution-projection",
          authorizationStatus: "authorized",
          sourceStem: normalizedRequest.sourceStem,
          sourceLexemeId: normalizedRequest.sourceLexemeId || "",
          sourceClass: normalizedRequest.verbClass,
          sourceValence: normalizedRequest.sourceValence,
          label: "Compound source",
          parts: [
            { segment: sourceSelection.selectedEmbedStem, role: "embed" },
            { segment: sourceSelection.selectedMatrixStem, role: "matrix" },
          ],
          process: "The typed Source retains its embed and matrix as separate constituents.",
          source: "Andrews §7.1 typed Source structure",
          grammarAuthority: false,
        });
      }
      let sourceAnalysisFrame = dependencySource.buildClassicalNahuatlVncDerivationSourceAnalysisFrame(sourceMachineryFrame);
      let sourceAnalyses = sourceAnalysisFrame?.analyses || [];
      let sharedConstitution = false;
      if (!dependencySource.isClassicalNahuatlVncDerivationSourceAnalysisFrame(sourceAnalysisFrame)) {
        // Lexical senses may license different formations while sharing a
        // constitution. Project only structure authenticated for every sense;
        // this read-only account must not choose a derivational meaning.
        const record = getClassicalNahuatlVncApplicationCanonicalSourceRecord(
          normalizedRequest.sourceStem, normalizedRequest.sourceValence,
        );
        const lexemeIds = !normalizedRequest.sourceLexemeId
          && record?.sourceLexemeSelectionRequired === true
          ? record.sourceLexemeIds || [] : [];
        const frames = lexemeIds.map(sourceLexemeId => {
          const candidate = buildClassicalNahuatlVncApplicationSourceMachinery(
            dependencySource,
            buildClassicalNahuatlVncApplicationDerivationSourceRequest({
              ...normalizedRequest, sourceLexemeId,
            }),
            { canonicalSelectionForConstitution: true },
          );
          return dependencySource.buildClassicalNahuatlVncDerivationSourceAnalysisFrame(candidate);
        });
        if (!frames.length || frames.some(frame => !dependencySource.isClassicalNahuatlVncDerivationSourceAnalysisFrame(frame))) return null;
        const structureKey = analysis => JSON.stringify([
          analysis.category, analysis.segments, analysis.root,
          analysis.stockFormative, analysis.stemFormative,
        ]);
        sourceAnalysisFrame = frames[0];
        sourceAnalyses = sourceAnalysisFrame.analyses.filter(analysis => frames.every(frame => frame.analyses.some(candidate => structureKey(candidate) === structureKey(analysis))));
        sharedConstitution = true;
      }
      const rows = sourceAnalyses.map(analysis => ({
        segments: analysis.segments || [],
        andrewsSections: analysis.andrewsSections || [],
        selectedForFormation: false,
        display: buildClassicalNahuatlVncSourceAnalysisDisplayProjection(analysis)
      }));
      const compactDisplay = buildClassicalNahuatlVncCompactSourceAnalysisDisplayProjection(
        groupClassicalNahuatlVncSourceAnalysisDisplayRows(rows)
      );
      if (!compactDisplay) return null;
      const reconstructionAnalysis = sourceAnalyses.find(analysis => (
        analysis.reconstructionNotationFrame
      ));
      const reconstructionNotationFrame = reconstructionAnalysis?.reconstructionNotationFrame;
      return deepFreezeClassicalNahuatlVncApplicationValue({
        frameRole: "classical-nahuatl-vnc-source-constitution-projection",
        authorizationStatus: "authorized",
        sourceStem: sourceAnalysisFrame.sourceStem,
        sourceLexemeId: sharedConstitution ? "" : sourceAnalysisFrame.sourceLexemeId || "",
        sourceClass: sourceAnalysisFrame.sourceClass,
        sourceValence: sourceAnalysisFrame.sourceValence,
        label: compactDisplay.label,
        parts: compactDisplay.parts,
        process: reconstructionNotationFrame
          ? `${compactDisplay.process} Here * marks the reconstructed underlying source (${reconstructionNotationFrame.underlyingStem}); the fused stem (${reconstructionNotationFrame.extantSourceStem}) is extant. It does not mark the form as ungrammatical.`
          : compactDisplay.process,
        source: compactDisplay.source,
        ...(reconstructionNotationFrame ? {
          sourceAnalysisFrame,
          sourceAnalysis: reconstructionAnalysis,
          reconstructionNotationFrame,
        } : {}),
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
      const activeAuthorized = activeMachineryFrame?.kind === "classical-nahuatl-vnc-derived-machinery-frame"
        && runtimeTarget === getClassicalNahuatlVncApplicationRuntimeTarget()
        ? isClassicalNahuatlVncApplicationCanonicalActiveMachineryFrame(activeMachineryFrame)
        : typeof runtimeTarget?.isClassicalNahuatlDerivedVncMachineryFrame === "function"
          && runtimeTarget.isClassicalNahuatlDerivedVncMachineryFrame(activeMachineryFrame);
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
          sourceRole = sourceVoice === "active" ? `${participantFrame.sourceSubject} source subject`
            : sourceVoice === "impersonal" ? "impersonal source subject"
              : "implicit agent of the passive source";
          sourceCarrier = sourceVoice !== "passive" ? sourceSubjectCarrier : "";
          sourceCarrierKind = sourceVoice !== "passive" ? "subject" : "";
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
          : sourceVoice === "impersonal"
            ? `[impersonal source subject + ${operationFrame.sourceStem} source core] → nonspecific object of CAUSE`
            : `[implicit source agent + passive ${operationFrame.sourceStem} source core] → nonspecific object of CAUSE`
        : selectedOption.sourceAttestationFrame
          ? `${operationFrame.sourceStem} ordinary intransitive core + [attested ${scopeObject}; no suffix; formally unjustified]`
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
        sourceAttestationFrame: selectedOption.sourceAttestationFrame || null,
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
      const inherentRoleContext =
        classicalNahuatlVncInherentSubjectRoleContextByApplicationFrame.get(applicationFrame);
      if (inherentRoleContext) {
        classicalNahuatlVncInherentSubjectRoleContextByApplicationFrame.set(
          projectedApplicationFrame, inherentRoleContext,
        );
      }
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
    function isClassicalNahuatlVncApplicationDirectInherentSubjectRole(
      machineryFrame = null,
      sourceStem = "",
    ) {
      const role = machineryFrame?.voiceTransformationFrame;
      const record = machineryFrame?.inherentImpersonalRecord;
      return Boolean(machineryFrame?.voice === "inherent-impersonal"
        && record?.authorizationStatus === "authorized"
        && record.sourceStem === sourceStem
        && role?.voice === "inherent-impersonal"
        && role.targetSubject === "3sg"
        && role.impersonalSubjectReferent === "none"
        && role.agentExpressible === false
        // Reuses the existing private whole-wrapper owner validator. Final
        // slot shape or caller-supplied impersonal flags cannot grant a role.
        && isClassicalNahuatlVncApplicationCanonicalSelectedMachineryFrame(
          machineryFrame,
        ));
    }
    function buildClassicalNahuatlVncApplicationParticipantProjection(
      normalizedRequest = {},
      derivationOperationFrame = null,
      selectedMachineryFrame = null,
    ) {
      const transform = derivationOperationFrame?.participantTransformFrame || {};
      const addedObjectId = String(transform.addedObjectRequest?.objectId || "");
      const targetObjectRequests = Array.isArray(transform.targetObjectRequests)
        ? transform.targetObjectRequests
        : normalizedRequest.sourceObjectRequests || [];
      const projectObject = (request = {}, index = 0) => {
        const objectKind = normalizeClassicalNahuatlVncApplicationToken(request.objectKind);
        const objectPerson = normalizeClassicalNahuatlVncApplicationToken(request.objectPerson);
        const objectId = normalizeClassicalNahuatlVncApplicationToken(request.objectId || `object-${index + 1}`);
        const causee = Boolean(
          objectId === addedObjectId
          || request.governor === "causative"
          || transform.causativeObjectKind && request === transform.addedObjectRequest
        );
        const participant = request.participantFrame;
        if (participant && participant.role === (causee ? "causee" : "object")) return participant;
        return buildClassicalNahuatlParticipantFrame({
          ...participant,
          role: causee ? "causee" : "object",
          agreement: objectPerson,
          animacy: request.animacy || participant?.animacy || (objectKind === "nonspecific-human" ? "animate" : "unspecified"),
          humanness: request.humanness || participant?.humanness
            || (objectKind === "nonspecific-human" ? "human"
              : objectKind === "nonspecific-nonhuman" ? "nonhuman"
                : "unspecified"),
          specificity: objectKind.startsWith("nonspecific-") ? "nonspecific" : "specific",
          referenceId: request.referenceId || objectId,
        });
      };
      // A genuine direct inherent classification has already fixed both roles.
      // Ordinary, transformed-impersonal and causative Source actors stay distinct.
      const directInherentSubject = normalizedRequest.derivationType === "direct"
        && normalizedRequest.sourceSubjectFrame?.impersonal === true
        && normalizedRequest.sourceSubjectFrame?.hasReferent === false;
      // An active direct application retains its referent when only its finite
      // realization changes. A causative actor or passive promotion is a new role.
      const directActiveSubject = normalizedRequest.derivationType === "direct"
        && normalizedRequest.requestedVoice === "active"
        && normalizedRequest.sourceVoice === "active"
        && (normalizedRequest.subject === normalizedRequest.sourceSubject
          || normalizedRequest.subject === normalizedRequest.sourceSubjectFrame?.category);
      // Raw direct authoring can change reference while its third-person
      // morphology stays the same. Keep the input Source role as provenance;
      // the explicitly selected current target is a separate coordinate.
      const authoredTargetSubject = normalizedRequest.derivationType === "direct"
        && normalizedRequest.requestedVoice === "active"
        && normalizedRequest.sourceVoice === "active"
        && normalizedRequest.subjectAnimacy && normalizedRequest.subjectHumanness
        ? buildClassicalNahuatlParticipantFrame({
          role: "subject", agreement: normalizedRequest.subject,
          animacy: normalizedRequest.subjectAnimacy,
          humanness: normalizedRequest.subjectHumanness,
          number: normalizedRequest.subject.endsWith("common") ? "common"
            : normalizedRequest.subject.endsWith("pl") ? "plural" : "singular",
        }) : null;
      const transformedImpersonalSubject = selectedMachineryFrame?.authorizationStatus === "authorized"
        && ["impersonal", "inherent-impersonal", "tla-impersonal"].includes(selectedMachineryFrame.voice)
        && selectedMachineryFrame.voiceTransformationFrame?.impersonalSubjectReferent === "none";
      // An active applicative retains the Source subject. Its third-singular
      // carrier does not replace a common-number or otherwise typed referent.
      const applicativePreservedSubject = normalizedRequest.derivationType === "applicative"
        && normalizedRequest.requestedVoice === "active"
        && normalizedRequest.sourceVoice === "active"
        && !transformedImpersonalSubject
        && transform.authorizationStatus === "authorized"
        && transform.sourceSubjectPreservedByApplicative === true
        && transform.sourceSubject === normalizedRequest.sourceSubjectFrame?.morphologicalAgreement
        && transform.targetSubject === transform.sourceSubject
        && [normalizedRequest.sourceSubjectFrame?.category,
          normalizedRequest.sourceSubjectFrame?.morphologicalAgreement].includes(normalizedRequest.subject);
      // The imported causer is a new grammatical role. In a genuine reflexive
      // coordinate binding it nevertheless refers to the same participant.
      const reflexiveCausativeSubject = normalizedRequest.derivationType === "causative"
        && normalizedRequest.requestedVoice === "active" && normalizedRequest.sourceVoice === "active"
        && !transformedImpersonalSubject
        && isCanonicalClassicalNahuatlVncApplicationDerivationOperation(derivationOperationFrame)
        && transform.authorizationStatus === "authorized"
        && transform.causativeObjectKind === "reflexive"
        && transform.causativeObjectPersonBinding === "target-subject-coordinate"
        && transform.sourceSubject === normalizedRequest.sourceSubjectFrame?.morphologicalAgreement
        && transform.targetSubject === transform.sourceSubject
        && normalizedRequest.subject === transform.targetSubject
        ? buildClassicalNahuatlParticipantFrame({
          ...normalizedRequest.sourceSubjectFrame,role:"subject",case:"nominative",
        }) : null;
      const passiveOwner = selectedMachineryFrame?.authorizationStatus === "authorized"
        && selectedMachineryFrame.voice === "passive"
        && selectedMachineryFrame.voiceTransformationFrame?.promotedObjectBecomesSubject === true
        && isClassicalNahuatlVncApplicationCanonicalSelectedMachineryFrame(selectedMachineryFrame);
      const promotedObjectId = passiveOwner
        ? selectedMachineryFrame.voiceObjectClusterFrame?.promotedObjectId || "" : "";
      const specificPatients = passiveOwner
        ? targetObjectRequests.filter(request => request.objectKind === "specific-projective") : [];
      const retainedPatient = passiveOwner
        ? classicalNahuatlVncPromotedObjectByVoiceMachinery.get(selectedMachineryFrame) : null;
      const retainedPromotedRequest = retainedPatient?.objectRequest;
      const promotedRequest = promotedObjectId
        ? specificPatients.find(request => request.objectId === promotedObjectId)
        : retainedPromotedRequest || (specificPatients.length === 1 ? specificPatients[0] : null);
      const promotedPatient = promotedRequest ? projectObject(promotedRequest) : null;
      const passiveTargetSubject = promotedPatient
        && isClassicalNahuatlParticipantFrame(promotedPatient)
        && [promotedPatient.category, promotedPatient.morphologicalAgreement]
          .includes(selectedMachineryFrame.voiceTransformationFrame.targetSubject)
        ? retainedPatient?.targetSubject || buildClassicalNahuatlParticipantFrame({
          ...promotedPatient, role: "subject", case: "nominative",
          agreement: promotedPatient.category,
        }) : null;
      return Object.freeze({
        kind: "classical-nahuatl-vnc-participant-projection",
        sourceSubject: normalizedRequest.sourceSubjectFrame,
        targetSubject: passiveTargetSubject || reflexiveCausativeSubject || authoredTargetSubject || (directActiveSubject || directInherentSubject || applicativePreservedSubject ? normalizedRequest.sourceSubjectFrame : buildClassicalNahuatlParticipantFrame({
          role: "subject",
          agreement: transformedImpersonalSubject ? selectedMachineryFrame.subject : normalizedRequest.subject,
          ...(transformedImpersonalSubject ? {impersonal: true, hasReferent: false, specificity: "nonspecific"} : {}),
        })),
        ...(passiveTargetSubject ? {passivePatientPromotion: Object.freeze({
          sourceObjectParticipantFrame: promotedPatient,
          targetSubjectParticipantFrame: passiveTargetSubject,
          sourceSubjectFrame: normalizedRequest.sourceSubjectFrame,
          voiceTransformationFrame: selectedMachineryFrame.voiceTransformationFrame,
        })} : {}),
        sourceObjects: Object.freeze((normalizedRequest.sourceObjectRequests || []).map(projectObject)),
        targetObjects: Object.freeze(targetObjectRequests.map(projectObject)),
      });
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
      choicePendingTypedVncSlotFrames = [],
      choicePendingApplicationFrames = [],
      continuationSource = null,
      directActiveRecoordinate = null,
      runtimeTarget = null
    } = {}) {
      const connector = normalizedRequest?.sentenceOptions?.finiteSingularConnector || "";
      const finalTyped = getClassicalNahuatlVncApplicationFinalTypedFrame(selectedMachineryFrame);
      const finalNumber = finalTyped?.slots?.number;
      if (connector && (!["silent", "qui"].includes(connector)
        || !isClassicalNahuatlOptionalFiniteConnectorFrame(finalTyped, normalizedRequest)
        || connector === "qui" && finalNumber.num1 !== "qui")) {
        forcedBlockReason = "classical-vnc-finite-singular-connector-not-licensed";
      }
      const selectedAuthorizationStatus = normalizeClassicalNahuatlVncApplicationToken(selectedMachineryFrame?.authorizationStatus || selectedMachineryFrame?.proofFrame?.authorizationStatus);
      const machineryAuthorized = !forcedBlockReason && selectedAuthorizationStatus === "authorized";
      const applicationRuntimeTarget = runtimeTarget && typeof runtimeTarget === "object"
        ? runtimeTarget
        : getClassicalNahuatlVncApplicationRuntimeTarget();
      const inherentRoleRecord = selectedMachineryFrame?.inherentImpersonalRecord;
      const directInherentRole = machineryAuthorized
        && normalizedRequest.derivationType === "direct"
        && isClassicalNahuatlVncApplicationDirectInherentSubjectRole(
          selectedMachineryFrame, normalizedRequest.sourceStem,
        );
      const retainedSourceRole = classicalNahuatlVncInherentSourceRoleByMachinery.get(sourceMachineryFrame);
      const retainedSourceApplication = retainedSourceRole?.applicationFrame;
      const retainedSourceContext = retainedSourceApplication
        && classicalNahuatlVncInherentSubjectRoleContextByApplicationFrame.get(retainedSourceApplication);
      const retainedInherentRole = machineryAuthorized
        && normalizedRequest.derivationType === "direct"
        && normalizedRequest.sourceValence === "intransitive"
        && normalizedRequest.sourceObjectRequests.length === 0
        && normalizedRequest.requestedVoice === "impersonal"
        && retainedSourceContext
        && retainedSourceContext.normalizedRequest === retainedSourceApplication.normalizedRequest
        && retainedSourceContext.sourceMachineryFrame === retainedSourceApplication.resultFrame.sourceMachineryFrame
        && retainedSourceContext.selectedMachineryFrame === retainedSourceApplication.resultFrame.selectedMachineryFrame
        && [retainedSourceContext.sourceMachineryFrame, retainedSourceContext.selectedMachineryFrame].includes(sourceMachineryFrame)
        && retainedSourceRole.subjectFrame === retainedSourceApplication.normalizedRequest.sourceSubjectFrame
        && isClassicalNahuatlVncApplicationIssuedFrame(retainedSourceApplication)
        && isClassicalNahuatlVncApplicationCanonicalSelectedMachineryFrame(sourceMachineryFrame);
      let inherentSubjectRoleProvenance = null;
      const inherentFormationRequest = directInherentRole || retainedInherentRole ? normalizedRequest : null;
      if (inherentFormationRequest) {
        // The authenticated inherent role describes no pre-existing actor.
        // Lexical machinery's initial finite/default coordinates are retained
        // only as unused provenance, never as this Source's semantic subject.
        inherentSubjectRoleProvenance = Object.freeze({
          kind: "classical-nahuatl-inherent-subject-role-provenance",
          unusedRequestedSubject: normalizedRequest.subject,
          unusedSourceSubjectFrame: normalizedRequest.sourceSubjectFrame,
          unusedCoordinatesAreParticipants: false,
          exactSelectedMachineryFrame: selectedMachineryFrame,
          exactInherentImpersonalRecord: inherentRoleRecord,
        });
        const sourceSubjectFrame = retainedInherentRole ? retainedSourceRole.subjectFrame
          : buildClassicalNahuatlParticipantFrame({
            role: "subject", agreement: "3sg", hasReferent: false, impersonal: true,
          });
        normalizedRequest = Object.freeze({
          ...normalizedRequest,
          subject: "3sg", sourceSubject: "3sg", sourceSubjectFrame,
          sourceSubjectPerson: sourceSubjectFrame.person,
          sourceSubjectAnimacy: sourceSubjectFrame.animacy,
          sourceSubjectHumanness: sourceSubjectFrame.humanness,
          sourceSubjectNumber: sourceSubjectFrame.number,
        });
      }
      const finiteSurfaceFrame = machineryAuthorized
        && typeof applicationRuntimeTarget?.buildClassicalNahuatlVncFiniteSurfaceFrame === "function"
        ? applicationRuntimeTarget.buildClassicalNahuatlVncFiniteSurfaceFrame(selectedMachineryFrame)
        : null;
      // A finite owner can reject a coordinate even when the stem machinery is
      // valid (for example a future admonitive). Its parent cannot authorize it.
      const authorizationStatus = machineryAuthorized
        && finiteSurfaceFrame?.authorizationStatus === "authorized" ? "authorized" : "blocked";
      const blockReason = authorizationStatus === "authorized" ? "" : forcedBlockReason
        || getClassicalNahuatlVncApplicationBlockReason(
          machineryAuthorized ? finiteSurfaceFrame : selectedMachineryFrame,
          "classical-vnc-application-result-not-authorized",
        );
      const finalTypedVncSlotFrame = authorizationStatus === "authorized"
        ? getClassicalNahuatlVncApplicationFinalTypedFrame(selectedMachineryFrame) : null;
      const resultControlFrame = authorizationStatus === "blocked"
        && controlFrame?.authorizationStatus === "authorized"
        ? Object.freeze({...controlFrame,authorizationStatus,blockReason}) : controlFrame;
      const surfaceRealization = finiteSurfaceFrame?.authorizationStatus === "authorized"
        ? normalizeClassicalNahuatlVncApplicationToken(finiteSurfaceFrame.wordRealization)
        : "";
      const formulaRealization = finiteSurfaceFrame?.authorizationStatus === "authorized"
        ? normalizeClassicalNahuatlVncApplicationToken(finiteSurfaceFrame.formulaRealization)
        : "";
      const participantProjection = buildClassicalNahuatlVncApplicationParticipantProjection(
        normalizedRequest,
        derivationOperationFrame,
        selectedMachineryFrame,
      );
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
        participantProjection,
        selectedMachineryFrame: authorizationStatus === "authorized" ? selectedMachineryFrame : null,
        finalTypedVncSlotFrame,
        choicePendingTypedVncSlotFrames: Object.freeze(
          authorizationStatus === "blocked"
            ? choicePendingTypedVncSlotFrames.filter(frame => (
                applicationRuntimeTarget?.isClassicalNahuatlVncSlotFrame?.(frame) === true
              ))
            : []
        ),
        choicePendingApplicationFrames: Object.freeze(
          authorizationStatus === "blocked"
            ? choicePendingApplicationFrames.filter(frame => (
                frame?.authorizationStatus === "authorized"
                && frame.resultFrame?.authorizationStatus === "authorized"
              ))
            : []
        ),
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
        ...(inherentSubjectRoleProvenance ? { inherentSubjectRoleProvenance } : {}),
        controlFrame: resultControlFrame,
        resultFrame,
        requiredCapabilities: CLASSICAL_NAHUATL_VNC_APPLICATION_REQUIRED_CAPABILITIES,
        missingCapabilities: Object.freeze([...missingCapabilities]),
        rejectedAuthorityFields: Object.freeze([...rejectedAuthorityFields]),
        unsupportedIntentFields: Object.freeze([...unsupportedIntentFields]),
        callerSuppliedAuthorityAccepted: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false
      };
      if (inherentFormationRequest) {
        classicalNahuatlVncInherentSubjectRoleContextByApplicationFrame.set(
          applicationFrame, Object.freeze({
            formationRequest: inherentFormationRequest,
            normalizedRequest,
            sourceMachineryFrame,
            selectedMachineryFrame,
          }),
        );
      }
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
      if (directActiveRecoordinate) {
        classicalNahuatlVncDirectActiveRecoordinateByResultFrame.set(
          resultFrame,
          Object.freeze({
            ...directActiveRecoordinate,
            normalizedRequest,
          }),
        );
      }
      return finalizeBuiltClassicalNahuatlVncApplicationFrame(
        applicationFrame,
      );
    }
    function hasClassicalNahuatlRetainedMiquiHonorificSource(result = null) {
      const seen = new Set();
      const owner = getClassicalNahuatlVncApplicationRuntimeTarget();
      while (result && !seen.has(result)) {
        seen.add(result);
        if (owner.isClassicalNahuatlClosureFrame?.(result) === true
          && result.authorizationStatus === "authorized"
          && result.operationFrame?.operation === "honorific"
          && result.operationFrame?.variant === "applicative"
          && result.operationFrame?.sourceStem === "miqui") return true;
        const application = classicalNahuatlVncApplicationFrameByResultFrame.get(result);
        if (!application || !isClassicalNahuatlVncApplicationFrame(application)) return false;
        result = classicalNahuatlVncContinuationSourceByApplicationFrame
          .get(application)?.sourceResultFrame || null;
      }
      return false;
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
        denominalCausativeOperationFrame = null,
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
        const resultContinuationSource = Boolean(
          continuationSource
          && continuationSource.sourceMachineryFrame
            === getClassicalNahuatlVncContinuationSelectedMachinery(continuationSource.sourceResultFrame)
        ) ? continuationSource : null;
        const buildEvaluationApplicationFrame = options =>
          buildApplicationFrame({
            ...options,
            // A committed typed Source may be the exact active machinery that
            // underlies a derived Result. Reuse that machinery below, but only
            // claim Result-continuation identity when it was the selected
            // machinery of the owner receipt.
            continuationSource: resultContinuationSource,
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
              {denominalCausativeOperationFrame},
            );
        const formationSourceAuthorized = isClassicalNahuatlVncApplicationActiveFrameAuthorized(formationSourceMachineryFrame);
        const formationClass = formationSourceMachineryFrame?.classId
          || (getClassicalNahuatlVncApplicationRuntimeTarget()?.isClassicalNahuatlMachineryFrame?.(formationSourceMachineryFrame) === true
            ? formationSourceMachineryFrame.targetClass : "");
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
        const sameImpersonalCoordinate = isClassicalNahuatlSameImpersonalCoordinateContinuation(continuationSource, normalizedBaseRequest);
        let allowedSourceVoices = sameImpersonalCoordinate ? Object.freeze(["impersonal"])
          : normalizedBaseRequest.derivationType === "causative" && formationSourceAuthorized
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
        } else if (!sameImpersonalCoordinate && normalizedBaseRequest.derivationType !== "causative" && normalizedBaseRequest.sourceVoice !== "active") {
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
        // Exact inherent-impersonal Results already contain their voice wrapper.
        // Voice application consumes the authenticated underlying active frame,
        // while the Source remains the complete retained Result.
        let activeMachineryFrame = requestedDerivation === "direct"
          && continuationSource?.sourceMachineryFrame === sourceMachineryFrame
          && (sourceMachineryFrame?.voice === "inherent-impersonal" || sameImpersonalCoordinate)
          && sourceMachineryFrame.activeMachineryFrame === formationSourceMachineryFrame
          ? formationSourceMachineryFrame
          : sourceMachineryFrame;
        if (
          requestedDerivation !== "direct"
          && sourceAnalysisAuthorized
          && normalizedBaseRequest
            .requestedCausativeSpecificShuntlineRealizationRecognized
        ) {
          derivationOptionInventory = dependencySource.getClassicalNahuatlVncDerivationOptionInventory(sourceMachineryFrame, {
            derivationType: requestedDerivation,
            applicativeObjectKind: normalizedBaseRequest.applicativeObjectKind,
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
        const directFusionRequested = Boolean(resultContinuationSource
          && requestedDerivation === "direct" && normalizedBaseRequest.tlaFusion === true);
        const directFusionTarget = directFusionRequested
          ? targetObject.buildClassicalNahuatlVncTlaFusionContinuationMachinery?.(
            sourceMachineryFrame, normalizedBaseRequest,
          ) : null;
        if (directFusionTarget) activeMachineryFrame = directFusionTarget;
        const activeAuthorized = isClassicalNahuatlVncApplicationActiveFrameAuthorized(activeMachineryFrame);
        const effectiveSourceValence = normalizedBaseRequest.tlaFusion === true ? "projective-nonhuman" : normalizedBaseRequest.sourceValence;
        const fallbackDirectTargetValence = targetObjectRequests => targetObjectRequests.length > 1 ? "multiple-object" : effectiveSourceValence;
        const targetStem = requestedDerivation === "direct"
          ? directFusionTarget?.targetStem || normalizedBaseRequest.sourceStem
          : getClassicalNahuatlVncApplicationOperationTargetStem(derivationOperationFrame);
        const targetObjectRequests = requestedDerivation === "direct"
          ? directFusionTarget ? directFusionTarget.targetObjectRequests : normalizedBaseRequest.sourceObjectRequests
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
        const nonactiveSourceStem = activeAuthorized
          ? requestedDerivation === "direct"
            ? directFusionTarget?.targetStem || sourceMachineryFrame?.sourceVerbstem
              || sourceAnalysisFrame?.sourceStem
              || canonicalActiveDescriptor.stem
            : canonicalActiveDescriptor.stem
          : targetStem;
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
        const automaticInherentImpersonalVoice = Boolean(
          inherentImpersonalSourceAnalysis.authorizationStatus === "authorized"
          && allowedVoices.length === 1
          && allowedVoices[0] === "impersonal"
        );
        let selectedVoice = allowedVoices.includes(normalizedBaseRequest.voice)
          ? normalizedBaseRequest.voice
          : automaticInherentImpersonalVoice ? "impersonal" : "active";
        let voiceNormalizationReason = "";
        if (!normalizedBaseRequest.requestedVoiceRecognized) {
          voiceNormalizationReason = "unknown-voice-normalized-to-active";
        } else if (!targetStem && normalizedBaseRequest.voice !== "active") {
          voiceNormalizationReason = "source-stem-required-before-derived-voice";
        } else if (automaticInherentImpersonalVoice) {
          voiceNormalizationReason = "inherent-impersonal-source-fixes-public-voice";
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
          lesson20OptionInventory: lesson20NonactiveOptionInventory,
          automaticOperationId: automaticInherentImpersonalVoice
            ? "inherent-impersonal"
            : ""
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
          sourceVerbstemClassSelectionRequired:
            !formationClass,
          sourceInitialIAnalysis: normalizedBaseRequest.sourceInitialIAnalysis,
          sourceInitialISelectionRequired: normalizedBaseRequest.sourceInitialIAnalysis?.selectionRequired === true
        };
        const restrictedReflexiveApplicative = normalizedBaseRequest.sourceStem
          .replace(/[-\s]/gu, "") === "miquiliā"
          && normalizedBaseRequest.sourceObjectRequests.some(object => object.objectKind === "reflexive");
        const retainedHonorificUse = restrictedReflexiveApplicative
          && hasClassicalNahuatlRetainedMiquiHonorificSource(continuationSource?.sourceResultFrame);
        if (restrictedReflexiveApplicative && !retainedHonorificUse) {
          const blockReason = "classical-vnc-miqui-reflexive-applicative-requires-honorific";
          return validateSharedApplicationFrame(buildEvaluationApplicationFrame({
            normalizedRequest,
            controlFrame: Object.freeze({...controlFrameBase, authorizationStatus: "blocked", blockReason}),
            formationSourceMachineryFrame, sourceMachineryFrame, sourceAnalysisFrame,
            activeMachineryFrame, derivationOperationFrame, missingCapabilities,
            rejectedAuthorityFields, unsupportedIntentFields, forcedBlockReason: blockReason,
          }));
        }
        // A Source witness of anomalous object presence does not license an
        // ordinary applicative paradigm or turn its intransitive parent into
        // a normal projective Source. Retain the same limit on Result reuse.
        const ordinarySourceAttestation = getClassicalNahuatlVncApplicationCanonicalSourceRecord(
          normalizedBaseRequest.sourceStem, "intransitive")?.sourceAttestedObjectFact;
        if (!continuationSource && ordinarySourceAttestation && requestedDerivation === "direct"
          && Array.isArray(requestObject.sourceObjectRequests) && requestObject.sourceObjectRequests.length > 0) {
          const blockReason = "classical-vnc-source-attested-object-requires-explicit-analysis";
          return validateSharedApplicationFrame(buildEvaluationApplicationFrame({normalizedRequest,
            controlFrame: Object.freeze({...controlFrameBase, authorizationStatus: "blocked", blockReason}),
            formationSourceMachineryFrame, sourceMachineryFrame, sourceAnalysisFrame,
            activeMachineryFrame, missingCapabilities, rejectedAuthorityFields, unsupportedIntentFields,
            forcedBlockReason: blockReason}));
        }
        const attestation = derivationOperationFrame?.selectedOption?.sourceAttestationFrame
          || continuationSource?.sourceMachineryFrame?.derivationOperationFrame?.selectedOption?.sourceAttestationFrame;
        if (attestation && (normalizedBaseRequest.subject !== attestation.targetScope.subject
          || normalizedBaseRequest.mood !== attestation.targetScope.mood
          || normalizedBaseRequest.tense !== attestation.targetScope.tense
          || normalizedBaseRequest.requestedVoice !== attestation.targetScope.voice
          || normalizedBaseRequest.sentenceOptions.directionalPrefix !== attestation.targetScope.directionalPrefix
          || (continuationSource?.sourceMachineryFrame?.derivationOperationFrame?.selectedOption?.sourceAttestationFrame
            && requestedDerivation !== "direct"))) {
          const blockReason = "classical-vnc-source-attestation-finite-scope-required";
          return validateSharedApplicationFrame(buildEvaluationApplicationFrame({normalizedRequest,
            controlFrame: Object.freeze({...controlFrameBase, authorizationStatus: "blocked", blockReason}),
            formationSourceMachineryFrame, sourceMachineryFrame, sourceAnalysisFrame,
            activeMachineryFrame, derivationOperationFrame, missingCapabilities,
            rejectedAuthorityFields, unsupportedIntentFields, forcedBlockReason: blockReason}));
        }
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
        if (directFusionRequested && !directFusionTarget) {
          return validateSharedApplicationFrame(buildEvaluationApplicationFrame({
            normalizedRequest, controlFrame: {...controlFrameBase, authorizationStatus: "blocked"},
            formationSourceMachineryFrame, sourceMachineryFrame, sourceAnalysisFrame,
            activeMachineryFrame, selectedMachineryFrame: activeMachineryFrame,
            missingCapabilities, rejectedAuthorityFields, unsupportedIntentFields,
            forcedBlockReason: "classical-vnc-continuation-eligible-external-tla-required",
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
        const sourceVerbstemClassSelectionBlockReason =
          (["A", "B"].includes(formationClass)
            && formationSourceMachineryFrame?.lesson11ParadigmPlan?.applies !== true
            && !/[aāeēiīoōuū]$/u.test(normalizedBaseRequest.sourceStem)
            ? "regular-verbstem-source-requires-imperfective-final-vowel"
            : "")
          || (!formationClass
            ? formationSourceMachineryFrame?.classRuleFrame?.blockReason
              || "classical-source-verbstem-class-selection-required"
            : "");
        if (sourceVerbstemClassSelectionBlockReason) {
          const controlFrame = Object.freeze({
            ...controlFrameBase,
            authorizationStatus: "blocked",
            blockReason: sourceVerbstemClassSelectionBlockReason
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
            forcedBlockReason: sourceVerbstemClassSelectionBlockReason
          }));
        }
        const sourceInitialISelectionBlockReason = !resultContinuationSource
          && normalizedBaseRequest.sourceInitialIAnalysis?.selectionRequired === true
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
        // Andrews 26.1.2 excludes the hypothetical itzi predicate from a
        // simple finite clause. Check the actual target: its irregular itt-a
        // derivative and the separate itz compound machinery remain usable.
        const defectiveSimplePredicateBlockReason =
          targetStem.replaceAll("-", "") === "itzi"
            ? "defective-itzi-simple-finite-predicate-not-licensed"
            : "";
        if (defectiveSimplePredicateBlockReason) {
          const controlFrame = Object.freeze({
            ...controlFrameBase,
            authorizationStatus: "blocked",
            blockReason: defectiveSimplePredicateBlockReason
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
            forcedBlockReason: defectiveSimplePredicateBlockReason
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
                && !automaticInherentImpersonalVoice
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
            : nonactiveOptionInventory.selectionRequired === true && !normalizedBaseRequest.nonactiveOptionId
              ? "classical-vnc-nonactive-formation-option-selection-required"
              : normalizedBaseRequest.nonactiveOptionId && !selectedNonactiveOption
                ? "classical-vnc-nonactive-formation-option-not-authorized"
                : ""
          : "";
        if (nonactiveFormationChoiceBlockReason) {
          const choicePendingApplicationFrames = nonactiveFormationChoiceBlockReason
            === "classical-vnc-nonactive-formation-option-selection-required"
            ? nonactiveOptionInventory.options.map(option => {
                return evaluateWithContinuationSource({
                  ...requestObject,
                  nonactiveOptionId: option.optionId
                }, continuationSource);
              }).filter(frame => frame?.authorizationStatus === "authorized")
            : [];
          const choicePendingTypedVncSlotFrames = choicePendingApplicationFrames
            .map(frame => frame.resultFrame?.finalTypedVncSlotFrame || null)
            .filter(Boolean);
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
            choicePendingTypedVncSlotFrames,
            choicePendingApplicationFrames,
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
          const requestedOptionOutsideInventory = Boolean(
            normalizedBaseRequest.derivationOptionId
            && derivationOptionInventory?.authorizationStatus === "authorized"
            && derivationOptionInventory.options?.length
            && !derivationOptionInventory.options.some(option => (
              option.optionId === normalizedBaseRequest.derivationOptionId
              || option.optionAliases?.includes(normalizedBaseRequest.derivationOptionId)
            ))
          );
          const derivationBlockReason = !sourceAuthorized
            ? getClassicalNahuatlVncApplicationBlockReason(sourceMachineryFrame, "classical-vnc-derivation-authorized-source-required")
            : !sourceAnalysisAuthorized
              ? "classical-vnc-derivation-source-analysis-not-authorized"
            : !derivationOperationAuthorized
              ? derivationOptionInventory?.selectionRequired === true
                && !normalizedBaseRequest.derivationOptionId
                ? "classical-vnc-derivation-option-selection-required"
                : requestedOptionOutsideInventory
                  ? "classical-vnc-derivation-selected-option-was-not-generated"
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
        let directActiveRecoordinate = null;
        if (
          resultContinuationSource
          && requestedDerivation === "direct"
          && selectedSourceVoice
            === resultContinuationSource.sourceDescriptor?.sourceVoice
          && selectedVoice === "active"
          && selectedVoiceOperation === "active"
        ) {
          const exactSourceDescriptor =
            resultContinuationSource.sourceDescriptor;
          const directActiveTargetRequest = normalizedRequest;
          const rebuiltDirectActiveMachineryFrame = normalizedRequest.tlaFusion === true
            ? directFusionTarget
            : buildClassicalNahuatlVncApplicationSourceMachinery(
              dependencySource,
              directActiveTargetRequest,
              {denominalCausativeOperationFrame: classicalNahuatlDenominalCausativeOperationByMachinery.get(resultContinuationSource.formationSourceMachineryFrame),
                formulaProjectionSourceFrame: resultContinuationSource.sourceMachineryFrame?.derivationOperationFrame
                  ? resultContinuationSource.sourceMachineryFrame : null},
            );
          const rebuiltDirectActiveDescriptor =
            getClassicalNahuatlVncApplicationCanonicalActivePredicateDescriptor(
              rebuiltDirectActiveMachineryFrame,
              {
                stem: normalizedRequest.sourceStem,
                verbClass: normalizedRequest.verbClass,
                sourceValence: normalizedRequest.sourceValence,
                objectRequests: normalizedRequest.sourceObjectRequests,
              },
            );
          const sourceFusionAuthorized = normalizedFusionContinuationIsCanonical(
            resultContinuationSource, normalizedRequest,
            rebuiltDirectActiveMachineryFrame, rebuiltDirectActiveDescriptor,
          );
          if (normalizedRequest.tlaFusion === true && !sourceFusionAuthorized) {
            return attachClassicalNahuatlVncDerivationExplanationProjection(buildEvaluationApplicationFrame({
              normalizedRequest, controlFrame: {...controlFrameBase, authorizationStatus: "blocked"}, formationSourceMachineryFrame,
              sourceMachineryFrame, sourceAnalysisFrame, activeMachineryFrame,
              selectedMachineryFrame: activeMachineryFrame,
              missingCapabilities, rejectedAuthorityFields, unsupportedIntentFields,
              forcedBlockReason: "classical-vnc-continuation-eligible-external-tla-required",
            }), dependencySource);
          }
          const sourceIdentityPreserved = Boolean(
            isClassicalNahuatlVncApplicationActiveFrameAuthorized(
              rebuiltDirectActiveMachineryFrame,
            )
            && normalizedRequest.sourceStem
              === exactSourceDescriptor.sourceStem
            && normalizedRequest.verbClass
              === exactSourceDescriptor.verbClass
            && normalizedRequest.sourceValence
              === exactSourceDescriptor.sourceValence
            && normalizedRequest.sourceLexemeId
              === exactSourceDescriptor.sourceLexemeId
            && rebuiltDirectActiveDescriptor.stem
              === exactSourceDescriptor.sourceStem
            && rebuiltDirectActiveDescriptor.verbClass
              === exactSourceDescriptor.verbClass
            && rebuiltDirectActiveDescriptor.sourceValence
              === exactSourceDescriptor.sourceValence
            && areClassicalNahuatlVncApplicationCanonicalValuesEqual(
              rebuiltDirectActiveDescriptor.objectRequests.map(normalizeClassicalNahuatlVncApplicationObjectRequest),
              exactSourceDescriptor.sourceObjectRequests.map(normalizeClassicalNahuatlVncApplicationObjectRequest),
            )
          );
          const exactSourceTypedFrame =
            getClassicalNahuatlVncApplicationFinalTypedFrame(
              sourceMachineryFrame,
            );
          const rebuiltDirectActiveTypedFrame =
            getClassicalNahuatlVncApplicationFinalTypedFrame(
              rebuiltDirectActiveMachineryFrame,
            );
          if (
            (sourceIdentityPreserved || sourceFusionAuthorized)
            && rebuiltDirectActiveTypedFrame
            && (!areClassicalNahuatlVncApplicationTypedFramesEqual(
              rebuiltDirectActiveTypedFrame,
              exactSourceTypedFrame,
            ) || !areClassicalNahuatlVncApplicationCanonicalValuesEqual(
              getClassicalNahuatlVncSentenceSurfaceFrameFromMachinery(rebuiltDirectActiveMachineryFrame),
              getClassicalNahuatlVncSentenceSurfaceFrameFromMachinery(sourceMachineryFrame),
            ))
          ) {
            activeMachineryFrame = rebuiltDirectActiveMachineryFrame;
            directActiveRecoordinate = Object.freeze({
              transitionKind: sourceFusionAuthorized ? "tla-fusion" : "coordinate",
              continuationSource: resultContinuationSource,
              sourceMachineryFrame,
              activeMachineryFrame,
              sourceDescriptor: exactSourceDescriptor,
              targetRequest: directActiveTargetRequest,
            });
          }
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
          // Nominal-prefix carries an issued linear cluster after possessor
          // transfer. Its specific controller can precede the older directive
          // in linear order without changing the semantic request order.
          const firstSpecificObject = getClassicalNahuatlNominalPrefixSpecificSourceObject(activeMachineryFrame, dependencySource)
            || targetObjectRequests.find(objectRequest => objectRequest?.objectKind === "specific-projective") || targetObjectRequests[0] || null;
          selectedMachineryFrame = dependencySource.buildClassicalNahuatlDerivedVncFrame(activeMachineryFrame, {
            voice: selectedVoiceOperation,
            nonactiveStemRecord,
            inherentImpersonalRecord,
            tlaImpersonalStemRecord,
            sourceObjectClusterFrame: activeMachineryFrame?.targetObjectClusterFrame || activeMachineryFrame?.multipleObjectClusterFrame || null,
            sourceValence: targetValence,
            sourceSubject:
              requestedDerivation === "direct"
              && selectedVoiceOperation === "inherent-impersonal"
              && inherentImpersonalRecord?.authorizationStatus === "authorized"
                ? "3sg"
                : sameImpersonalCoordinate
                ? sourceMachineryFrame.voiceTransformationFrame.sourceSubject
                : requestedDerivation === "direct"
              && selectedVoice !== "active"
              && normalizedRequest.sourceSubjectExplicit === true
                ? normalizedRequest.sourceSubject
                : normalizedRequest.subject,
            sourceObjectPerson: firstSpecificObject?.objectPerson || activeMachineryFrame?.priorVncFrame?.objectFrame?.objectPerson || "",
            impersonalDerivationPath:
              normalizedRequest.impersonalDerivationPath,
            mood: normalizedRequest.mood,
            tense: normalizedRequest.tense,
            verbClass: targetClass,
            sentenceOptions:
              getClassicalNahuatlVncApplicationCanonicalSentenceOptions(
                activeMachineryFrame,
            ),
          });
          if (selectedVoiceOperation === "passive"
            && selectedMachineryFrame?.authorizationStatus === "authorized"
            && firstSpecificObject?.objectKind === "specific-projective") {
            // The lower active slots carry morphology (3sg for common
            // nonanimate objects). Reconstruction must retain the exact
            // canonical object request that this voice operation consumed.
            const promotedId = selectedMachineryFrame.voiceObjectClusterFrame?.promotedObjectId;
            const promoted = promotedId
              ? targetObjectRequests.find(request => request.objectId === promotedId)
              : firstSpecificObject;
            selectedMachineryFrame = bindClassicalNahuatlVncPassivePatient(
              selectedMachineryFrame, promoted,
            );
          }
        }
        const ownerIssuedParticipantRoleTransitionFrame =
          selectedMachineryFrame?.voiceTransformationFrame
            ?.participantRoleTransitionFrame || null;
        const sourceSubjectControllerRetired =
          doesClassicalNahuatlParticipantTransitionRetireSourceRole(
            ownerIssuedParticipantRoleTransitionFrame,
            "source-subject-controller",
          );
        const specificCoreferenceBlockReason =
          sourceSubjectControllerRetired
            ? ""
            : getClassicalNahuatlVncApplicationSpecificCoreferenceBlockReason({
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
            selectedMachineryFrame,
            appliedTypedFrames: [
              sourceMachineryFrame?.nonactiveStemRecord,
              sourceMachineryFrame?.voiceTransformationFrame,
              sourceAnalysisFrame,
              derivationOperationFrame,
              derivationOperationFrame?.participantTransformFrame,
              ownerIssuedParticipantRoleTransitionFrame,
            ],
            missingCapabilities,
            rejectedAuthorityFields,
            unsupportedIntentFields,
            forcedBlockReason: specificCoreferenceBlockReason
          }));
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
          unsupportedIntentFields,
          directActiveRecoordinate,
        }));
      });
      const issueApplicationResult = applicationFrame => {
        if (
          applicationFrame?.authorizationStatus === "authorized"
          && applicationFrame.resultFrame?.authorizationStatus
            === "authorized"
          && classicalNahuatlVncApplicationBuiltFrames.has(
            applicationFrame,
          )
          && classicalNahuatlVncApplicationBuiltResultFrames.has(
            applicationFrame.resultFrame,
          )
        ) {
          issuedApplicationResultFrames.add(applicationFrame.resultFrame);
          classicalNahuatlVncApplicationFrameByResultFrame.set(
            applicationFrame.resultFrame,
            applicationFrame,
          );
          const exactSourceMachineryFrames = [...new Set([
            applicationFrame.resultFrame.sourceMachineryFrame || null,
            applicationFrame.resultFrame.selectedMachineryFrame || null,
          ].filter(Boolean))];
          const inherentSourceContext = classicalNahuatlVncInherentSubjectRoleContextByApplicationFrame.get(applicationFrame);
          const inherentSourceSubject = applicationFrame.normalizedRequest.sourceSubjectFrame;
          const inherentSourceRole = inherentSourceContext?.normalizedRequest === applicationFrame.normalizedRequest
            && inherentSourceContext.sourceMachineryFrame === applicationFrame.resultFrame.sourceMachineryFrame
            && inherentSourceContext.selectedMachineryFrame === applicationFrame.resultFrame.selectedMachineryFrame
            && isClassicalNahuatlParticipantFrame(inherentSourceSubject)
            && Object.isFrozen(inherentSourceSubject)
            && inherentSourceSubject.role === "subject" && inherentSourceSubject.person === "3"
            && inherentSourceSubject.number === "singular" && inherentSourceSubject.morphologicalAgreement === "3sg"
            && inherentSourceSubject.hasReferent === false && inherentSourceSubject.impersonal === true;
          exactSourceMachineryFrames.forEach(exactSourceMachineryFrame => {
            if (inherentSourceRole && !classicalNahuatlVncInherentSourceRoleByMachinery.has(exactSourceMachineryFrame)) {
              classicalNahuatlVncInherentSourceRoleByMachinery.set(exactSourceMachineryFrame, Object.freeze({
                applicationFrame, subjectFrame: inherentSourceSubject,
              }));
            }
            if (!classicalNahuatlVncParticipantProvenanceByMachinery.has(exactSourceMachineryFrame)) {
              const isOriginalSource = exactSourceMachineryFrame === applicationFrame.resultFrame.sourceMachineryFrame;
              const objectRequests = isOriginalSource
                ? applicationFrame.normalizedRequest.sourceObjectRequests
                : applicationFrame.derivationOperationFrame?.participantTransformFrame?.targetObjectRequests
                  || applicationFrame.normalizedRequest.sourceObjectRequests;
              const projectedObjects = isOriginalSource
                ? applicationFrame.resultFrame.participantProjection.sourceObjects
                : applicationFrame.resultFrame.participantProjection.targetObjects;
              classicalNahuatlVncParticipantProvenanceByMachinery.set(exactSourceMachineryFrame, Object.freeze({
                subjectFrame: isOriginalSource
                  ? applicationFrame.normalizedRequest.sourceVoice === "active"
                    ? applicationFrame.normalizedRequest.sourceSubjectFrame
                    : null
                  : applicationFrame.resultFrame.participantProjection.targetSubject,
                objectRequests: Object.freeze(objectRequests.map((request, index) => Object.freeze({
                  ...request, participantFrame: projectedObjects[index] || request.participantFrame,
                }))),
              }));
            }
            const sourceDescriptor =
              getClassicalNahuatlVncContinuationSourceDescriptor(
                exactSourceMachineryFrame,
                dependencySource,
              );
            if (
              sourceDescriptor?.sourceAnalysisFrame
                ?.sourceMachineryFrame !== exactSourceMachineryFrame
              || !sourceDescriptor.sourceStem
              || !sourceDescriptor.verbClass
              || !sourceDescriptor.sourceValence
              || classicalNahuatlVncTypedSourceApplicationProvenanceBySource
                .has(exactSourceMachineryFrame)
            ) return;
            // The requests are our private descriptor's clones; freeze them
            // before allowing that descriptor to be reused by exact identity.
            deepFreezeClassicalNahuatlVncApplicationValue(
              sourceDescriptor.sourceObjectRequests,
            );
            const sourceDescriptorContext = {
              parent: exactSourceMachineryFrame,
              selections: classicalNahuatlVncParticipantProvenanceByMachinery
                .get(exactSourceMachineryFrame),
              runtime: dependencySource,
              capabilities: getClassicalNahuatlVncSentenceValidationCapabilities(
                dependencySource,
              ),
            };
            classicalNahuatlVncTypedSourceApplicationProvenanceBySource.set(
              exactSourceMachineryFrame,
              Object.freeze({
                exactSourceMachineryFrame,
                sourceDescriptor,
                sourceDescriptorContext,
                // This is the original raw authoring preview, not a selected
                // transform or an exact Result continuation. Its unasserted
                // actor can be prepared through the direct owner when editing.
                rawSubjectAuthoringAllowed: exactSourceMachineryFrame
                    === applicationFrame.resultFrame.sourceMachineryFrame
                  && exactSourceMachineryFrame
                    === applicationFrame.resultFrame.selectedMachineryFrame
                  && applicationFrame.normalizedRequest.sourceSubjectExplicit === false
                  && applicationFrame.normalizedRequest.derivationType === "direct"
                  && applicationFrame.normalizedRequest.sourceVoice === "active"
                  && applicationFrame.normalizedRequest.requestedVoice === "active"
                  && !classicalNahuatlVncContinuationSourceByApplicationFrame.has(applicationFrame),
                sourceInitialISelection:
                  applicationFrame.normalizedRequest
                    ?.sourceInitialISelection || "",
                inherentImpersonalSource: inherentSourceRole ||
                  applicationFrame.resultFrame?.selectedVoiceOperation
                    === "inherent-impersonal",
                defaultSelections: Object.freeze({
                  subject:
                    applicationFrame.normalizedRequest?.subject
                    || sourceDescriptor.sourceSubject
                    || "3sg",
                  mood:
                    applicationFrame.normalizedRequest?.mood
                    || "indicative",
                  tense:
                    applicationFrame.normalizedRequest?.tense
                    || "present",
                  requestedVoice:
                    applicationFrame.resultFrame?.selectedVoice
                    || sourceDescriptor.sourceVoice
                    || applicationFrame.normalizedRequest?.requestedVoice
                    || "active",
                  nonactiveOptionId:
                    applicationFrame.resultFrame
                      ?.selectedNonactiveOptionId
                    || sourceDescriptor.sourceNonactiveOptionId
                    || "",
                }),
                ownerDependencies: dependencySource,
                ownerEvaluate: request => issueApplicationResult(
                  evaluateWithContinuationSource(
                    request,
                    Object.freeze({
                      sourceResultFrame: applicationFrame.resultFrame,
                      sourceMachineryFrame: exactSourceMachineryFrame,
                      formationSourceMachineryFrame:
                        sourceDescriptor.formationSourceMachineryFrame,
                      sourceDescriptor,
                    }),
                  ),
                ),
              }),
            );
          });
        }
        return applicationFrame;
      };
      const evaluate = (request = {}) => issueApplicationResult(
        evaluateWithContinuationSource(request),
      );
      // A pure denominal formation has morphological ancestry, but no finite
      // referent to use as a causative causee. Consume the issued operation;
      // never turn its spelling or a caller's finalMorphRole into authority.
      const evaluateDenominalFormation = (request = {}, operation = null) => {
        if (dependencySource.isClassicalNahuatlDenominalVncOperationFrame?.(operation) !== true
          || !operation.causativeFormationFrame) return null;
        const normalized = normalizeClassicalNahuatlVncApplicationRequest(request);
        const expectedObjects = normalizeClassicalNahuatlVncApplicationRequest({...request,
          sourceObjectRequests: operation.objectRequests}).sourceObjectRequests;
        if (normalized.sourceStem !== operation.targetStem
          || normalized.verbClass !== operation.targetClass
          || normalized.derivationType !== "direct" || normalized.requestedVoice !== "active"
          || normalized.sourceVoice !== "active"
          || !areClassicalNahuatlVncApplicationCanonicalValuesEqual(normalized.sourceObjectRequests, expectedObjects)) return null;
        return issueApplicationResult(evaluateWithContinuationSource(request, null, operation));
      };
      const getContinuationSourceForResult = (
        sourceResultFrame = null,
      ) => {
        const supplementedPrincipal = getClassicalNahuatlSubjectSupplementedVncPrincipal(sourceResultFrame);
        if (supplementedPrincipal) {
          const principalSource = getContinuationSourceForResult(supplementedPrincipal);
          return principalSource ? Object.freeze({...principalSource,
            sourceResultFrame,
            subjectSupplementedSourceResultFrame: sourceResultFrame,
          }) : null;
        }
        // A sentence Result retains its authenticated nuclear Result. Stem
        // operations consume that nucleus, never the sentence's printed form.
        if (isClassicalNahuatlVncSentenceResultFrame(sourceResultFrame)) {
          return getContinuationSourceForResult(
            sourceResultFrame.canonicalResultFrame,
          );
        }
        const denominalOwner = getClassicalNahuatlVncApplicationRuntimeTarget();
        if (denominalOwner?.isClassicalNahuatlDenominalVncResultFrame?.(sourceResultFrame) === true) {
          const finiteSource = getContinuationSourceForResult(sourceResultFrame.canonicalVncFrame.resultFrame);
          return finiteSource ? Object.freeze({...finiteSource, sourceResultFrame}) : null;
        }
        const registeredApplication = classicalNahuatlVncApplicationFrameByResultFrame.get(sourceResultFrame);
        const exactRegisteredPair = registeredApplication
          && registeredApplication.resultFrame === sourceResultFrame
          && isClassicalNahuatlVncApplicationIssuedFrame(registeredApplication);
        const applicationResultAuthorized = Boolean(
          (issuedApplicationResultFrames.has(sourceResultFrame) || exactRegisteredPair)
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
        const canonicalContinuationResultFrame = sourceResultFrame;
        const sourceMachineryFrame =
          canonicalContinuationResultFrame?.selectedMachineryFrame || null;
        const continuationMachineryCanonical = lateOperationResultAuthorized || (
          canonicalContinuationResultFrame?.selectedDerivation === "direct"
            ? Boolean(
              (applicationResultAuthorized || lateOperationResultAuthorized)
              && sourceMachineryFrame
                === canonicalContinuationResultFrame.selectedMachineryFrame
            )
            : isCanonicalClassicalNahuatlVncApplicationDerivationSourceMachineryFrame(
              sourceMachineryFrame,
              dependencySource,
            ));
        if (!continuationMachineryCanonical) {
          return null;
        }
        const retainedProvenance = !lateOperationResultAuthorized
          ? classicalNahuatlVncTypedSourceApplicationProvenanceBySource
            .get(sourceMachineryFrame) : null;
        const retainedDescriptor = retainedProvenance?.sourceDescriptor;
        const currentDescriptorContext = retainedDescriptor
          && isClassicalNahuatlVncSentenceImmutableDataGraph(retainedDescriptor)
          ? {
            parent: sourceMachineryFrame,
            selections: classicalNahuatlVncParticipantProvenanceByMachinery
              .get(sourceMachineryFrame),
            runtime: dependencySource,
            capabilities: getClassicalNahuatlVncSentenceValidationCapabilities(
              dependencySource,
            ),
          } : null;
        const retainedDescriptorAuthorized = Boolean(
          currentDescriptorContext?.capabilities
          && retainedProvenance.sourceDescriptorContext?.capabilities
          && areClassicalNahuatlVncSentenceValidationContextsEqual(
            retainedProvenance.sourceDescriptorContext,
            currentDescriptorContext,
          )
          && retainedDescriptor.sourceAnalysisFrame?.sourceMachineryFrame
            === sourceMachineryFrame
          && isCanonicalClassicalNahuatlVncApplicationSourceAnalysisFrame(
            retainedDescriptor.sourceAnalysisFrame, dependencySource,
          )
        );
        // A finite direct Result can have a different subject from the raw
        // Source used to form it. Its continuation must retain that Result's
        // issued target reference, not the older machinery's Source reference.
        const exactTargetSubject = applicationResultAuthorized
          && sourceResultFrame.selectedDerivation === "direct"
          && sourceResultFrame.selectedVoice === "active"
          ? sourceResultFrame.participantProjection?.targetSubject : null;
        const targetReference = isClassicalNahuatlParticipantFrame(exactTargetSubject)
          ? exactTargetSubject : null;
        const retainedTargetReferenceMatches = !targetReference
          || [
            ["sourceSubjectPerson", "person"], ["sourceSubjectAnimacy", "animacy"],
            ["sourceSubjectHumanness", "humanness"], ["sourceSubjectNumber", "number"],
          ].every(([sourceKey, participantKey]) =>
            retainedDescriptor?.[sourceKey] === targetReference[participantKey]);
        const sourceDescriptor = retainedDescriptorAuthorized && retainedTargetReferenceMatches
          ? retainedDescriptor
          : getClassicalNahuatlVncContinuationSourceDescriptor(
            sourceMachineryFrame,
            dependencySource,
            lateOperationResultAuthorized
              ? getClassicalNahuatlLateParticipantProvenance(sourceResultFrame, currentRuntimeTarget)
              : targetReference ? Object.freeze({
                ...classicalNahuatlVncParticipantProvenanceByMachinery.get(sourceMachineryFrame),
                subjectFrame: targetReference,
              }) : null,
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
            // Only privately retained, owner-issued nominal ancestry may
            // accompany a finite continuation; callers cannot supply it.
            canonicalNominalSourceResultFrame:
              classicalNahuatlVncContinuationSourceByResultFrame.get(sourceResultFrame)
                ?.canonicalNominalSourceResultFrame || null,
            canonicalNominalConstructionResultFrame:
              classicalNahuatlVncContinuationSourceByResultFrame.get(sourceResultFrame)
                ?.canonicalNominalConstructionResultFrame || null,
          })
          : null;
      };
      const getContinuationSourceConstituents = (
        sourceResultFrame = null,
      ) => runClassicalNahuatlVncApplicationValidationTransaction(() => {
        const currentRuntimeTarget =
          getClassicalNahuatlVncApplicationRuntimeTarget();
        if (currentRuntimeTarget?.isClassicalNahuatlDenominalVncResultFrame?.(sourceResultFrame) === true) {
          const projection = getContinuationSourceConstituents(sourceResultFrame.canonicalVncFrame.resultFrame);
          return projection ? Object.freeze({...projection,
            canonicalResultFrame: sourceResultFrame,
            canonicalSourceMachineryFrame: sourceResultFrame.canonicalVncFrame.resultFrame.selectedMachineryFrame,
            sourceHistoryPreservedByExactFrameIdentity: true,
          }) : null;
        }
        const lateClosureAuthorized = Boolean(
          sourceResultFrame?.authorizationStatus === "authorized"
          && typeof currentRuntimeTarget?.isClassicalNahuatlClosureFrame
            === "function"
          && currentRuntimeTarget.isClassicalNahuatlClosureFrame(
            sourceResultFrame,
          ) === true
        );
        if (lateClosureAuthorized) {
          const operationFrame = sourceResultFrame.operationFrame;
          let sourceDescriptor =
            getClassicalNahuatlVncContinuationSourceDescriptor(
              sourceResultFrame.selectedMachineryFrame,
              currentRuntimeTarget,
              // An exact late whole may lack a complete Participant receipt.
              // A sibling recapture of its machinery must not invent one later.
              getClassicalNahuatlLateParticipantProvenance(sourceResultFrame, currentRuntimeTarget)
                || Object.freeze({}),
            );
          const facts = operationFrame.operationFacts;
          if (!sourceDescriptor.sourceStem
            && operationFrame.ruleFamily === "attitude-compound"
            && currentRuntimeTarget.isClassicalNahuatlClosureFrame?.(facts.typedCompoundSourceFrame) === true
            && currentRuntimeTarget.isClassicalNahuatlClosureFrame?.(facts.typedMemberTransformationFrame) === true) {
            // A suppletive compound head is already an issued grammatical
            // constituent. Project its actual slots instead of asking a raw
            // whole-stem derivation analyzer to rediscover that construction.
            const completedObjects = facts.completedCompoundObjectFrame;
            const positions = Array.isArray(completedObjects?.positions)
              ? completedObjects.positions
              : completedObjects?.valenceArity && completedObjects.valenceArity !== "vacant"
                ? [completedObjects] : [];
            const objects = positions.map(cloneClassicalNahuatlVncApplicationCompactValue);
            sourceDescriptor = Object.freeze({
              sourceStem: operationFrame.targetStem,
              verbClass: operationFrame.targetClass,
              sourceValence: objects.length > 1 ? "multiple-object"
                : objects.length === 1 ? getClassicalNahuatlVncApplicationValenceForObject(objects[0].objectKind)
                  : "intransitive",
              sourceSubject: operationFrame.targetCoordinate.subject,
              sourceInitialISelection: sourceResultFrame.baseApplicationFrame?.normalizedRequest?.sourceInitialIAnalysis?.resolvedKind || "",
              sourceVoice: "active", sourceObjectRequests: Object.freeze(objects),
              objectPerson: objects.find(object => object.objectKind === "specific-projective")?.objectPerson || "",
            });
          }
          const targetValence = sourceDescriptor.sourceValence;
          const sourceObjectRequests = Object.freeze(
            (sourceDescriptor.sourceObjectRequests || []).map(
              cloneClassicalNahuatlVncApplicationCompactValue,
            ),
          );
          if (
            operationFrame.targetStem
            && operationFrame.targetClass
            && targetValence
          ) {
            return Object.freeze({
              kind:
                "classical-nahuatl-vnc-result-source-constituent-projection",
              version: CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,
              canonicalResultFrame: sourceResultFrame,
              canonicalOperationFrame: operationFrame,
              canonicalSourceMachineryFrame:
                sourceResultFrame.selectedMachineryFrame,
              sourceStem: operationFrame.targetStem,
              sourceLexemeId: "",
              sourceInitialISelection: sourceDescriptor.sourceInitialISelection || "",
              verbClass: operationFrame.targetClass,
              sourceValence: targetValence,
              sourceSubject:
                sourceDescriptor.sourceSubject || "3sg",
              ...Object.fromEntries(["sourceSubjectPerson", "sourceSubjectAnimacy", "sourceSubjectHumanness", "sourceSubjectNumber"].filter(field => sourceDescriptor[field]).map(field => [field, sourceDescriptor[field]])),
              sourceVoice: normalizeClassicalNahuatlVncApplicationToken(
                operationFrame.operationFacts?.sourceVoice,
              ) || sourceDescriptor.sourceVoice || "active",
              sourceNonactiveOptionId:
                sourceDescriptor.sourceNonactiveOptionId || "",
              inherentImpersonal: sourceResultFrame.selectedMachineryFrame
                ?.voice === "inherent-impersonal",
              internalTlaImpersonal: sourceResultFrame.selectedMachineryFrame
                ?.voice === "tla-impersonal"
                && sourceResultFrame.selectedMachineryFrame
                  ?.tlaImpersonalStemRecord?.authorizationStatus === "authorized",
              sourceObjectRequests,
              objectKind: sourceObjectRequests.length > 1
                ? "multiple-object"
                : sourceObjectRequests[0]?.objectKind || "none",
              objectPerson: sourceDescriptor.objectPerson || "",
              projectionRole: "read-only-source-constituents",
              sourceHistoryPreservedByExactFrameIdentity: true,
              grammarAuthority: false,
              callerSuppliedAuthorityAccepted: false,
            });
          }
        }
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
          ...Object.fromEntries(["sourceSubjectPerson", "sourceSubjectAnimacy", "sourceSubjectHumanness", "sourceSubjectNumber"].filter(field => sourceDescriptor[field]).map(field => [field, sourceDescriptor[field]])),
          sourceVoice: sourceDescriptor.sourceVoice,
          sourceNonactiveOptionId:
            sourceDescriptor.sourceNonactiveOptionId,
          inherentImpersonal: continuationSource.sourceMachineryFrame
            ?.voice === "inherent-impersonal",
          internalTlaImpersonal: continuationSource.sourceMachineryFrame
            ?.voice === "tla-impersonal"
            && continuationSource.sourceMachineryFrame
              ?.tlaImpersonalStemRecord?.authorizationStatus === "authorized",
          sourceObjectRequests: Object.freeze(
            sourceDescriptor.sourceObjectRequests.map(
              cloneClassicalNahuatlVncApplicationCompactValue,
            ),
          ),
          objectKind: sourceDescriptor.objectKind,
          objectPerson: sourceDescriptor.objectPerson,
          canonicalNominalSourceResultFrame:
            continuationSource.canonicalNominalSourceResultFrame || null,
          canonicalNominalConstructionResultFrame:
            continuationSource.canonicalNominalConstructionResultFrame || null,
          projectionRole: "read-only-source-constituents",
          grammarAuthority: false,
          callerSuppliedAuthorityAccepted: false,
        });
      });
      const continueFromResult = (
        sourceResultFrame = null,
        request = {},
      ) => {
        const continuationSource =
          getContinuationSourceForResult(sourceResultFrame);
        // Reference edits belong to an unasserted raw Source's target. An
        // exact made Result supplies its own participant reference.
        if (["subjectAnimacy", "subjectHumanness"].some(field =>
          request[field] != null && request[field] !== "")) return null;
        // Passive deletes the expressed active subject (Andrews22/52).
        // Keep the exact whole Source as history, without a passive agent.
        if (continuationSource?.subjectSupplementedSourceResultFrame
          && ((request.requestedDerivation || request.derivationType || "direct") !== "direct"
            || (request.requestedVoice || request.voice) !== "passive")) return null;
        const inheritedSentenceOptions = getClassicalNahuatlVncApplicationCanonicalSentenceOptions(
          continuationSource?.sourceMachineryFrame,
        );
        const selectedSentenceOptions = Object.fromEntries(
          Object.keys(inheritedSentenceOptions).filter(key => (
            getClassicalNahuatlVncApplicationRequestValue(request, key) !== undefined
          )).map(key => [key, getClassicalNahuatlVncApplicationRequestValue(request, key)]),
        );
        // The optional connector belongs to the target finite coordinate. An
        // omitted target selection uses its default rather than inheriting qui
        // from an accepted Source whose new tense/person may forbid it.
        if (getClassicalNahuatlVncApplicationRequestValue(request, "finiteSingularConnector") === undefined) {
          selectedSentenceOptions.finiteSingularConnector = "";
        }
        const continuationRequest =
          buildClassicalNahuatlVncContinuationRequest(
            { ...request, sentenceOptions: { ...inheritedSentenceOptions, ...selectedSentenceOptions } },
            continuationSource?.sourceDescriptor || null,
          );
        if (!continuationSource || !continuationRequest) {
          return null;
        }
        const reissuedNominal = getClassicalNahuatlVncApplicationRuntimeTarget()
          .reissueClassicalNahuatlNominalVncMatrixCoordinate?.(sourceResultFrame, request);
        if (reissuedNominal) {
          const projection = getClassicalNahuatlVncContinuationSourceConstituents(reissuedNominal);
          return projection ? continueFromResult(reissuedNominal, {...request, ...projection,
            subject: request.subject, mood: request.mood, tense: request.tense}) : null;
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
          rareThirdCausativeMeaningSupported:
            normalizedRequest.rareThirdCausativeMeaningSupported,
          exceptionalSuffixOrderAuthorized:
            normalizedRequest.exceptionalSuffixOrderAuthorized,
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
          rareThirdCausativeMeaningSupported:
            normalizedRequest.rareThirdCausativeMeaningSupported,
          exceptionalSuffixOrderAuthorized:
            normalizedRequest.exceptionalSuffixOrderAuthorized,
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
          rareThirdCausativeMeaningSupported:
            normalizedRequest.rareThirdCausativeMeaningSupported,
          exceptionalSuffixOrderAuthorized:
            normalizedRequest.exceptionalSuffixOrderAuthorized,
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
      const deriveObsoleteRootFromResult = (whole = null) => {
        // Only the nominal owner's issued whole may supply its finite child.
        // The existing root owner still derives from that child's full -ya
        // machinery, never from the completed predicate's spelling.
        const nominalApplication = whole?.constructionKind === "nominal-embed-vnc"
          ? getClassicalNahuatlIssuedNominalSentenceApplication(whole) : null;
        const source = getContinuationSourceForResult(
          nominalApplication ? nominalApplication.resultFrame : whole,
        );
        const descriptor = source?.sourceDescriptor;
        if (!source || descriptor?.sourceVoice !== "active"
          || descriptor.sourceValence !== "intransitive"
          || !/-ya$/u.test(descriptor.sourceStem)) return null;
        const machinery = dependencySource.buildClassicalNahuatlObsoleteRootVerbstemFrame?.(source.formationSourceMachineryFrame);
        if (!machinery || machinery.authorizationStatus !== "authorized") return null;
        const request = {sourceStem: machinery.stem, verbClass: "A", sourceValence: "intransitive",
          subject: descriptor.sourceSubject || "3sg", voice: "active", mood: "indicative", tense: "preterit",
          sourceInitialISelection: source.formationSourceMachineryFrame.citationRuleFrame?.initialVowelKind || ""};
        const derived = issueApplicationResult(evaluateWithContinuationSource(request, {
          formationSourceMachineryFrame: machinery, sourceMachineryFrame: machinery,
          sourceDescriptor: {...descriptor, sourceStem: machinery.stem, verbClass: "A"},
        }));
        if (nominalApplication && derived?.authorizationStatus === "authorized") {
          // This is retained nominal ancestry, not permission to treat the
          // whole as a generic finite continuation or a reloadable raw stem.
          const ancestry = Object.freeze({
            sourceResultFrame: whole,
            canonicalNominalSourceResultFrame: whole,
            canonicalNominalConstructionResultFrame: whole,
          });
          classicalNahuatlVncContinuationSourceByApplicationFrame.set(derived, ancestry);
          classicalNahuatlVncContinuationSourceByResultFrame.set(derived.resultFrame, ancestry);
        }
        return derived;
      };
      const service = Object.freeze({
        kind: "classical-nahuatl-vnc-application-service",
        version: CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,
        authorizationStatus: serviceStatus,
        blockReason: missingCapabilities.length ? "classical-vnc-application-required-capabilities-unavailable" : "",
        requiredCapabilities: CLASSICAL_NAHUATL_VNC_APPLICATION_REQUIRED_CAPABILITIES,
        missingCapabilities,
        evaluate,
        evaluateDenominalFormation,
        continueFromResult,
        deriveObsoleteRootFromResult,
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
    const imperfectiveApplicativeApplications = new WeakMap();
    function isImperfectiveApplicativeApplication(frame) {
      const c = frame && imperfectiveApplicativeApplications.get(frame), r = getClassicalNahuatlVncApplicationRuntimeTarget();
      return Boolean(c && Object.isFrozen(frame) && getImperfectiveVncContext(c.input) === c.sourceContext
        && r.isClassicalNahuatlVncDerivationOperationFrame(c.operation)
        && r.isClassicalNahuatlDerivedVncMachineryFrame(c.machinery)
        && c.operation.sourceMachineryFrame === c.input && c.operation.derivationType === "applicative"
        && c.operation.selectedOption.licensedSourceClass === "" && c.operation.targetClass === "C"
        && c.app.resultFrame === c.result && c.result.sourceMachineryFrame === c.input
        && c.result.sourceApplicationFrame === c.sourceContext.app
        && c.result.canonicalImperfectiveSourceFrame === c.sourceContext.source
        && c.result.selectedMachineryFrame === c.machinery
        && c.result.finalTypedVncSlotFrame === c.machinery.finalTypedVncSlotFrame
        && c.result.finalTypedVncSlotFrame.slots.subject.participantFrame === c.sourceContext.participant
        && c.operation.targetObjectRequests[0].objectId === c.sourceContext.objects[0].objectId
        && c.operation.targetObjectRequests[0].participantFrame === c.sourceContext.objects[0].participantFrame
        && c.operation.targetObjectRequests.every(object=>isClassicalNahuatlParticipantFrame(object.participantFrame))
        && (c.operation.targetObjectRequests[1]?.objectKind === "reflexive"
          ? c.operation.targetObjectRequests[1].participantFrame.referenceId === c.sourceContext.participant.referenceId
          : c.operation.targetObjectRequests[1]?.participantFrame.referenceId === c.operation.targetObjectRequests[1]?.objectId
            && (c.operation.targetObjectRequests[1]?.objectKind !== "specific-projective"
              || c.operation.targetObjectRequests[1].participantFrame.referenceId !== c.sourceContext.objects[0].participantFrame.referenceId))
        && c.result.participantProjection.targetObjects.length === c.operation.targetObjectRequests.length
        && c.result.participantProjection.targetObjects.every((participant,index)=>participant===c.operation.targetObjectRequests[index].participantFrame)
        && c.result.participantProjection.targetSubject === c.sourceContext.participant);
    }
    function buildImperfectiveApplicativeContinuation(request, input) {
      const c = getImperfectiveVncContext(input), r = getClassicalNahuatlVncApplicationRuntimeTarget();
      if (!c || !request || typeof request !== "object" || Array.isArray(request)
        || request.requestedDerivation !== "applicative" || request.requestedVoice !== "active"
        || request.sourceStem !== c.source.sourceStem || request.verbClass !== ""
        || request.sourceValence !== c.source.sourceValence
        || request.sourceObjectRequests !== c.objects
        || CLASSICAL_NAHUATL_VNC_CONTINUATION_SOURCE_FIELDS.some(key => Object.hasOwn(request,key)
          && request[key] !== c.projection[key])
        || ![c.projection.sourceSubject,c.participant.morphologicalAgreement].includes(request.subject)
        || getClassicalNahuatlVncApplicationPresentFields(request,CLASSICAL_NAHUATL_VNC_APPLICATION_CALLER_AUTHORITY_FIELDS).length
        || getClassicalNahuatlVncApplicationCurriculumCarrierFields(request).length) return null;
      const operation = r.deriveClassicalNahuatlVncDerivationOperationFrame(input, {
        derivationType:"applicative",optionId:request.derivationOptionId || "",
        targetSubject:c.participant.morphologicalAgreement,
        applicativeObjectKind:request.applicativeObjectKind,applicativeObjectPerson:request.applicativeObjectPerson,
      });
      if (!r.isClassicalNahuatlVncDerivationOperationFrame(operation)
        || operation.selectedOption.ruleId !== "cn-l26-2684-transitive-oya-append-lia") return null;
      const machinery = r.buildClassicalNahuatlDerivedVncMachineryFrame(input,operation,{
        targetSubject:c.participant.morphologicalAgreement,mood:request.mood,tense:request.tense,
        sentenceOptions:buildClassicalNahuatlVncApplicationSentenceOptions(request),
      });
      if (!r.isClassicalNahuatlDerivedVncMachineryFrame(machinery)) return null;
      deepFreezeClassicalNahuatlVncApplicationValue(machinery);
      const surface = r.buildClassicalNahuatlVncFiniteSurfaceFrame(machinery);
      if (!r.isClassicalNahuatlVncFiniteSurfaceFrame(surface)) return null;
      const inventory = r.getClassicalNahuatlVncDerivationOptionInventory(input,{derivationType:"applicative"});
      if (!r.isClassicalNahuatlVncDerivationOptionInventory(inventory)
        || !inventory.options.some(option=>option.optionId===operation.selectedOptionId)) return null;
      const objects=operation.targetObjectRequests,participant=c.participant;
      const normalized=Object.freeze({kind:"classical-nahuatl-vnc-application-request",sourceStem:c.source.sourceStem,
        sourceClass:"",perfectiveClassStatus:"unresolved",sourceValence:c.source.sourceValence,verbClass:operation.targetClass,
        subject:participant.morphologicalAgreement,subjectFrame:participant,sourceSubject:participant.morphologicalAgreement,
        sourceSubjectFrame:participant,sourceObjectRequests:c.objects,targetObjectRequests:objects,
        sourceSubjectPerson:participant.person,sourceSubjectNumber:participant.number,sourceSubjectAnimacy:participant.animacy,sourceSubjectHumanness:participant.humanness,
        requestedDerivation:"applicative",derivationType:"applicative",requestedVoice:"active",voice:"active",sourceVoice:"active",targetVoiceOperation:"active",
        mood:request.mood,tense:request.tense,sentenceOptions:Object.freeze(buildClassicalNahuatlVncApplicationSentenceOptions(request))});
      const result=Object.freeze({kind:"classical-nahuatl-vnc-application-result-frame",version:CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,
        authorizationStatus:"authorized",blockReason:"",canonicalImperfectiveSourceFrame:c.source,sourceApplicationFrame:c.app,
        sourceMachineryFrame:input,selectedMachineryFrame:machinery,derivationOperationFrame:operation,
        finalTypedVncSlotFrame:machinery.finalTypedVncSlotFrame,selectedSourceVoice:"active",selectedVoice:"active",selectedVoiceOperation:"active",selectedDerivation:"applicative",
        participantProjection:Object.freeze({sourceSubject:participant,targetSubject:participant,
          sourceObjects:Object.freeze(c.objects.map(object=>object.participantFrame)),targetObjects:Object.freeze(objects.map(object=>object.participantFrame))}),
        finiteSurfaceFrame:surface,formulaRealization:surface.formulaRealization,surfaceRealization:surface.wordRealization,wordSurface:surface.wordRealization,
        typedFrameAuthority:true,callerSuppliedAuthorityAccepted:false,formulaStringAuthority:false,surfaceStringAuthority:false});
      const app=finalizeBuiltClassicalNahuatlVncApplicationFrame({kind:"classical-nahuatl-vnc-application-frame",version:CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,
        authorizationStatus:"authorized",blockReason:"",normalizedRequest:normalized,resultFrame:result,
        controlFrame:Object.freeze({authorizationStatus:"authorized",selectedSourceVoice:"active",selectedVoice:"active",selectedVoiceOperation:"active",
          requestedDerivation:"applicative",derivationType:"applicative",requestedDerivationAccepted:true,
          derivedStem:operation.targetStem,derivedClass:operation.targetClass,derivedObjectRequests:objects,
          derivationOptionInventory:inventory,selectedDerivationOptionId:operation.selectedOptionId,
          derivationSelectorRequired:inventory.selectorRequired,allowedVoices:Object.freeze(["active"])}),
        formulaRealization:surface.formulaRealization,surfaceRealization:surface.wordRealization,
        typedFrameAuthority:true,callerSuppliedAuthorityAccepted:false,formulaStringAuthority:false,surfaceStringAuthority:false});
      const projection=Object.freeze({kind:"classical-nahuatl-vnc-continuation-source-constituents",authorizationStatus:"authorized",
        canonicalSourceFrame:input,canonicalResultFrame:result,canonicalApplicationFrame:app,
        sourceStem:operation.targetStem,sourceIdentityStem:operation.targetStem,verbClass:operation.targetClass,
        sourceValence:operation.targetValence,sourceVoice:"active",sourceSubject:participant.morphologicalAgreement,sourceSubjectFrame:participant,
        sourceSubjectPerson:participant.person,sourceSubjectNumber:participant.number,sourceSubjectAnimacy:participant.animacy,sourceSubjectHumanness:participant.humanness,
        sourceObjectRequests:objects,grammarAuthority:false});
      const context=Object.freeze({input,sourceContext:c,operation,machinery,app,result,projection,
        coordinate:Object.freeze({subject:participant.morphologicalAgreement,mood:request.mood,tense:request.tense})});
      imperfectiveApplicativeApplications.set(app,context);imperfectiveApplicativeApplications.set(result,context);
      classicalNahuatlVncApplicationFrameByResultFrame.set(result,app);
      return isImperfectiveApplicativeApplication(app)?app:null;
    }
    function evaluateClassicalNahuatlVncApplication(
      request = {},
      continuationSourceResultOrDependencies = null,
    ) {
      if (
        !continuationSourceResultOrDependencies
        && isClassicalNahuatlVncTypedSourceApplicationBindingFrame(request)
      ) {
        return executeClassicalNahuatlVncTypedSourceApplicationBindingFrame(
          request,
        );
      }
      if (request?.sourceStem && (getClassicalNahuatlVncApplicationRuntimeTarget()?.resolveClassicalNahuatlRestrictedContainingVncSourceFrame?.({enteredStem:request.sourceStem,valence:request.sourceValence || "intransitive",sourceLexemeId:request.sourceLexemeId || ""})
        || getClassicalNahuatlVncApplicationRuntimeTarget()?.resolveClassicalNahuatlNominalRankCorrectedSourceFrame?.({enteredStem:request.sourceStem,valence:request.sourceValence || "intransitive"})))
        return Object.freeze({kind:"classical-nahuatl-vnc-application-frame",authorizationStatus:"blocked",blockReason:"restricted-source-requires-its-containing-owner"});
      if (request?.sourceStem && getClassicalNahuatlVncApplicationRuntimeTarget()?.resolveClassicalNahuatlAnalyticalVncSourceFrame?.({enteredStem:request.sourceStem,valence:request.sourceValence || "intransitive"}))
        return Object.freeze({kind:"classical-nahuatl-vnc-application-frame",authorizationStatus:"blocked",blockReason:"analytical-vnc-requires-authenticated-operand-binding"});
      if (getImperfectiveVncContext(continuationSourceResultOrDependencies))
        return buildImperfectiveApplicativeContinuation(request,continuationSourceResultOrDependencies)
          || Object.freeze({kind:"classical-nahuatl-vnc-application-frame",authorizationStatus:"blocked",blockReason:"imperfective-vnc-continuation-has-no-perfective-class-authority"});
      if (request?.sourceStem && resolveClassicalNahuatlPreformedVncSourceFrame({enteredStem:request.sourceStem,valence:"intransitive"}))
        return Object.freeze({kind:"classical-nahuatl-vnc-application-frame",authorizationStatus:"blocked",blockReason:"preformed-vnc-requires-authenticated-source-binding"});
      if (request?.sourceStem && resolveClassicalNahuatlNonactiveCarrierSourceFrame({enteredStem:request.sourceStem,valence:"intransitive"}))
        return Object.freeze({kind:"classical-nahuatl-vnc-application-frame",authorizationStatus:"blocked",blockReason:"nonactive-carrier-requires-authenticated-source-binding"});
      const sharedService =
        getClassicalNahuatlVncApplicationSharedService();
      if (continuationSourceResultOrDependencies?.kind === "classical-nahuatl-denominal-vnc-operation-frame") {
        return sharedService.evaluateDenominalFormation(request, continuationSourceResultOrDependencies);
      }
      const nominalApplication = getClassicalNahuatlIssuedNominalSentenceApplication(
        continuationSourceResultOrDependencies,
      );
      if (nominalApplication) {
        const projection = sharedService.getContinuationSourceConstituents(
          nominalApplication.resultFrame,
        );
        // Direct coordinate edits and existing nonactive operations consume
        // the finite child while retaining the exact whole nominal parent.
        // Subject changes and new stem derivations remain separate operations.
        if (!projection
          || request.requestedDerivation !== "direct"
          || !(["passive", "impersonal"].includes(request.requestedVoice)
            || (request.requestedVoice === "active" && projection.sourceVoice === "active"))
          || (request.requestedVoice === "active"
            && request.subject !== projection.sourceSubject)) return null;
        const continued = sharedService.continueFromResult(nominalApplication.resultFrame, request);
        // Nonactive subjects belong to the issued voice transformation, not
        // to a caller-selected active subject change.
        if (continued?.authorizationStatus === "authorized"
          && ["passive", "impersonal"].includes(request.requestedVoice)
          && continued.resultFrame.selectedMachineryFrame?.subject !== request.subject) return null;
        const retained = classicalNahuatlVncContinuationSourceByApplicationFrame.get(continued);
        if (continued?.authorizationStatus === "authorized" && retained) {
          const ancestry = Object.freeze({...retained,
            canonicalNominalSourceResultFrame: continuationSourceResultOrDependencies,
            canonicalNominalConstructionResultFrame:
              continuationSourceResultOrDependencies.constructionKind === "patientive-embed-continuation"
                ? continuationSourceResultOrDependencies.canonicalResult
                : continuationSourceResultOrDependencies,
          });
          classicalNahuatlVncContinuationSourceByApplicationFrame.set(continued, ancestry);
          classicalNahuatlVncContinuationSourceByResultFrame.set(continued.resultFrame, ancestry);
        }
        return continued;
      }
      const sharedContinuationProjection =
        continuationSourceResultOrDependencies
          ? sharedService.getContinuationSourceConstituents(
            continuationSourceResultOrDependencies,
          )
          : null;
      if (
        isClassicalNahuatlVncApplicationResultFrame(
          continuationSourceResultOrDependencies,
        )
        || sharedContinuationProjection
      ) {
        return sharedService.continueFromResult(
          continuationSourceResultOrDependencies,
          request,
        );
      }
      if (!continuationSourceResultOrDependencies) {
        return sharedService.evaluate(request);
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
    // A reload recipe is input, never retained grammar authority. Replay must
    // obtain new owner-issued Results in the current runtime for every layer.
    function exportClassicalNahuatlVncApplicationRecipe(result = null) {
      const steps = [];
      const visiting = new Set();
      const owner = getClassicalNahuatlVncApplicationRuntimeTarget();
      function visit(value) {
        // This family's typed stem/patient recipe is deliberately not serialized
        // as a raw active verb request. Runtime continuation is still supported.
        if (nonactiveCarrierApplications.has(value)) return false;
        if (isClassicalNahuatlVncSentenceResultFrame(value)) {
          const source = value.vncApplicationFrame || value.lateOperationClosureFrame;
          if (visiting.has(value) || !source) return false;
          visiting.add(value);
          if (!visit(source)) return false;
          // Sentence inputs already belong to the authenticated application
          // request. Reissue the wrapper itself; never flatten its identity.
          steps.push(Object.freeze({ operationId: "vnc:sentence-result" }));
          visiting.delete(value);
          return true;
        }
        if (owner.isClassicalNahuatlClosureFrame?.(value)) {
          const operation = value.operationFrame;
          const futureObject = operation?.operation === "compound"
            && operation.variant === "future-embed";
          if (value.authorizationStatus !== "authorized" || visiting.has(value)
            || !(futureObject || operation?.operation === "frequentative"
              && ["frequentative-prefix-shape", "frequentative-tla"].includes(operation.ruleFamily))) return false;
          visiting.add(value);
          if (!visit(value.baseApplicationFrame)) return false;
          const baseRequest = steps.at(-1)?.request;
          if (!baseRequest) return false;
          if (futureObject) {
            // Store inputs, not a flattened finite compound. Replay captures the
            // freshly reissued future parent through the continuation owner.
            const matrix = value.matrixApplicationFrame;
            const sentence = buildClassicalNahuatlVncApplicationScalarCoordinateRequest(
              matrix, {}, Object.fromEntries(Object.entries(matrix.normalizedRequest.sentenceOptions || {})
                .filter(([key]) => !isForbiddenClassicalGrammarAuthorityKey(key))),
            );
            steps.push(Object.freeze({operationId: "vnc:derivational-operation",
              request: Object.freeze({subject: sentence.subject, mood: sentence.mood,
                tense: sentence.tense, sentenceOptions: sentence.sentenceOptions,
                lateOperation: "compound", lateVariant: "future-embed",
                compoundMatrixStem: operation.operationFacts.futureMatrixLexicalStem,
              })}));
          } else steps.push(Object.freeze({operationId: "vnc:derivational-operation",
            request: Object.freeze({...baseRequest,
              lateOperation: operation.operation, lateVariant: operation.variant,
              frequentativeRepetitions: operation.operationFacts.repetitions,
              frequentativeScope: operation.operationFacts.semanticScope,
              frequentativeInitialITreatment: operation.operationFacts.copiedInitialITreatment || "ordinary",
              frequentativeTarget: operation.operationFacts.reduplicationTarget,
            })}));
          visiting.delete(value);
          return true;
        }
        const frame = classicalNahuatlVncApplicationFrameByResultFrame.get(value)
          || (isClassicalNahuatlVncApplicationFrame(value) ? value : null);
        if (!frame || frame.authorizationStatus !== "authorized"
          || !isClassicalNahuatlVncApplicationIssuedResultFrame(frame.resultFrame)
          || visiting.has(frame)) return false;
        if (restrictedContainingApplications.has(frame) || analyticalVncApplications.has(frame) || imperfectiveApplications.has(frame) || preformedVncApplications.has(frame)) return false;
        // This serializer has no denominal-operation step. A raw finite stem
        // would discard the licensed causative carrier, so decline that family.
        if (classicalNahuatlDenominalCausativeOperationByMachinery.has(
          frame.resultFrame.formationSourceMachineryFrame)) return false;
        visiting.add(frame);
        const parent = classicalNahuatlVncContinuationSourceByApplicationFrame
          .get(frame)?.sourceResultFrame || null;
        if (parent && !visit(parent)) return false;
        const normalized = frame.normalizedRequest;
        const sentenceEntries = Object.entries(normalized.sentenceOptions || {});
        const canonicalAliasKeys = {
          lesson9PrefaceParticle: "prefaceParticle",
          lesson9IntroductoryModifier: "introductoryModifier",
        };
        if (sentenceEntries.some(([key, value]) =>
          isForbiddenClassicalGrammarAuthorityKey(key) && Boolean(value)
          && (!canonicalAliasKeys[key]
            || (value === "none" ? "" : value) !==
              (normalized.sentenceOptions[canonicalAliasKeys[key]] === "none"
                ? "" : normalized.sentenceOptions[canonicalAliasKeys[key]])))) return false;
        const request = {
          ...buildClassicalNahuatlVncApplicationScalarCoordinateRequest(
            frame, {}, Object.fromEntries(Object.entries(normalized.sentenceOptions || {})
              .filter(([key]) => !isForbiddenClassicalGrammarAuthorityKey(key))),
          ),
          impersonalDerivationPath: normalized.impersonalDerivationPath,
          // These authored participant axes belong to the accepted input.
          // A later continuation validates its source participant against them.
          ...(normalized.subjectAnimacy || normalized.subjectHumanness ? {
            subjectAnimacy: normalized.subjectAnimacy,
            subjectHumanness: normalized.subjectHumanness,
          } : {}),
        };
        if (!normalized.sourceSubjectExplicit) {
          delete request.sourceSubject;
        } else {
          for (const key of ["sourceSubjectPerson", "sourceSubjectAnimacy",
            "sourceSubjectHumanness", "sourceSubjectNumber"]) {
            request[key] = normalized[key];
          }
        }
        steps.push(Object.freeze({ request: Object.freeze(request) }));
        visiting.delete(frame);
        return true;
      }
      if (!visit(result)) return null;
      return Object.freeze({
        kind: "classical-nahuatl-vnc-application-reload-recipe",
        version: 1,
        steps: Object.freeze(steps),
      });
    }
    // Expose only an authenticated input edge and semantic coordinates. The
    // graph serializer must retain this parent instead of flattening its stem.
    function getClassicalNahuatlVncContinuationReloadInputs(value = null) {
      if (isClassicalNahuatlVncSentenceResultFrame(value)) return Object.freeze({
        parent: value.vncApplicationFrame || value.lateOperationClosureFrame,
        step: Object.freeze({operationId: "vnc:sentence-result"}),
      });
      const frame = classicalNahuatlVncApplicationFrameByResultFrame.get(value)
        || (isClassicalNahuatlVncApplicationFrame(value) ? value : null);
      if (!frame || frame.authorizationStatus !== "authorized") return null;
      const context = classicalNahuatlVncContinuationSourceByApplicationFrame.get(frame);
      const parent = context?.canonicalNominalSourceResultFrame || context?.sourceResultFrame;
      if (!parent) return null;
      const step = exportClassicalNahuatlVncApplicationRecipe(frame)?.steps?.at(-1);
      return step && Object.freeze({parent, step});
    }
    function getClassicalNahuatlVncRecipeStepExecutionRequest(step = null, parent = null) {
      if (!step || typeof step !== "object" || Array.isArray(step)
        || Object.keys(step).some(key => !["operationId", "request"].includes(key))) return null;
      const operationId = step.operationId || "vnc:application";
      const owner = getClassicalNahuatlVncApplicationRuntimeTarget();
      if (operationId === "vnc:sentence-result") {
        if (Object.hasOwn(step, "request") || !(isClassicalNahuatlVncApplicationFrame(parent)
          || owner.isClassicalNahuatlClosureFrame?.(parent))) return null;
        return Object.freeze({ operationId, args: Object.freeze([parent]) });
      }
      if (operationId === "vnc:derivational-operation") {
        if (!isClassicalNahuatlVncApplicationFrame(parent) || !step.request
          || typeof step.request !== "object" || Array.isArray(step.request)
          || !["frequentative", "compound"].includes(step.request.lateOperation)) return null;
        if (step.request.lateOperation === "compound") {
          if (step.request.lateVariant !== "future-embed") return null;
          const binding = issueClassicalNahuatlVncContinuationBindingFrame(
            operationId, parent, step.request,
          );
          return binding?.bindingStatus === "ready"
            ? Object.freeze({operationId, args: binding.executionArgs}) : null;
        }
        // The recipe contains the underlying Source inputs. The late owner
        // reissues its finite base and prefix operation; a direct base is not
        // a continuation-derived SourceApplicationFrame.
        return Object.freeze({operationId, args: Object.freeze([step.request])});
      }
      if (operationId !== "vnc:application" || !step.request
        || typeof step.request !== "object" || Array.isArray(step.request)) return null;
      const sourceResult = isClassicalNahuatlVncApplicationFrame(parent)
        ? parent.resultFrame : parent;
      if (sourceResult && !isClassicalNahuatlVncApplicationIssuedResultFrame(sourceResult)
        && !isClassicalNahuatlVncSentenceResultFrame(sourceResult)) return null;
      return Object.freeze({ operationId, args: Object.freeze(
        sourceResult ? [step.request, sourceResult] : [step.request]),
      });
    }
    function prepareClassicalNahuatlVncApplicationRecipeReplay(recipe = null) {
      if (recipe?.kind !== "classical-nahuatl-vnc-application-reload-recipe"
        || recipe.version !== 1 || !Array.isArray(recipe.steps)
        || !recipe.steps.length || recipe.steps.length > 512) return null;
      const owner = getClassicalNahuatlVncApplicationRuntimeTarget();
      let parent = null;
      for (const step of recipe.steps.slice(0, -1)) {
        const executionRequest = getClassicalNahuatlVncRecipeStepExecutionRequest(step, parent);
        if (!executionRequest) return null;
        let result;
        try { result = owner.executeClassicalGrammarApplicationRequest(executionRequest); }
        catch { return null; }
        if (!owner.isClassicalGrammarApplicationResult?.(result)
          || result.authorizationStatus !== "authorized") return null;
        parent = result.canonicalResult;
      }
      const executionRequest = getClassicalNahuatlVncRecipeStepExecutionRequest(recipe.steps.at(-1), parent);
      if (!executionRequest) return null;
      // Retain the legacy request/parent fields for application-only callers.
      return Object.freeze({
        executionRequest,
        request: executionRequest.args[0],
        parentResultFrame: executionRequest.operationId === "vnc:application"
          ? executionRequest.args[1] || null : parent,
      });
    }
    function getClassicalNahuatlVncApplicationSharedService() {
      if (!classicalNahuatlVncApplicationSharedService) {
        classicalNahuatlVncApplicationSharedService = createClassicalNahuatlVncApplication(getClassicalNahuatlVncApplicationRuntimeTarget() || {});
      }
      return classicalNahuatlVncApplicationSharedService;
    }
    // Editing replaces the current operation over its original typed Source.
    // Continuation is different: it applies a new operation to the made stem.
    function getClassicalNahuatlVncApplicationEditContext(exact = null) {
      const sentence = isClassicalNahuatlVncSentenceResultFrame(exact) ? exact : null;
      const application = sentence ? sentence.vncApplicationFrame
        : isClassicalNahuatlVncApplicationIssuedFrame(exact) ? exact
        : classicalNahuatlVncApplicationFrameByResultFrame.get(exact);
      if (!isClassicalNahuatlVncApplicationIssuedFrame(application)
        || classicalNahuatlVncApplicationFrameByResultFrame.get(application.resultFrame) !== application
        || (!sentence && exact !== application && exact !== application.resultFrame)) return null;
      const sourceFrame = application.resultFrame.sourceMachineryFrame;
      if (!classicalNahuatlVncTypedSourceApplicationProvenanceBySource.has(sourceFrame)) return null;
      const normalized = application.normalizedRequest;
      const selections = Object.fromEntries(CLASSICAL_NAHUATL_VNC_TYPED_SOURCE_APPLICATION_SELECTION_FIELDS
        .filter(key => Object.hasOwn(normalized, key)).map(key => [key, normalized[key]]));
      // Normalization contains defaults for inactive operations. They are not
      // choices authored for this operation and must not become new requests.
      if (normalized.requestedDerivation !== "causative") {
        delete selections.causativeObjectKind; delete selections.causativeSpecificShuntlineRealization;
      }
      if (normalized.requestedDerivation !== "applicative") {
        delete selections.applicativeObjectKind; delete selections.applicativeObjectPerson;
      }
      if (normalized.requestedDerivation === "direct") delete selections.derivationOptionId;
      if (normalized.requestedVoice !== "active") selections.subject = application.resultFrame.participantProjection.targetSubject.agreement;
      const envelope = sentence && classicalNahuatlVncSentenceEnvelopeReceipts.get(sentence);
      if (envelope) selections.sentenceOptions = {...selections.sentenceOptions, ...envelope};
      return Object.freeze({exactInput: exact, applicationFrame: application, sourceFrame,
        sourceSubject: classicalNahuatlVncTypedSourceApplicationProvenanceBySource.get(sourceFrame).sourceDescriptor.sourceSubject,
        selections: deepFreezeClassicalNahuatlVncApplicationValue(cloneClassicalNahuatlVncApplicationCompactValue(selections))});
    }
    function getClassicalNahuatlVncContinuationSourceConstituents(
      sourceResultFrame = null,
    ) {
      const nucleus = isClassicalNahuatlVncSentenceResultFrame(sourceResultFrame)
        ? sourceResultFrame.canonicalResultFrame : sourceResultFrame;
      const containing=restrictedContainingApplications.get(nucleus);
      if(containing && isRestrictedContainingApplication(nucleus))return containing.projection;
      const analytical=analyticalVncApplications.get(nucleus);
      if(analytical && isAnalyticalVncApplication(nucleus))return analytical.projection;
      const applicative=imperfectiveApplicativeApplications.get(nucleus);
      if(applicative && isImperfectiveApplicativeApplication(nucleus))return applicative.projection;
      const imperfective=getImperfectiveVncContext(nucleus);
      if(imperfective)return imperfective.projection;
      const preformed = preformedVncApplications.get(nucleus);
      if (preformed && isPreformedVncApplication(nucleus)) return preformed.projection;
      const carrier = nonactiveCarrierApplications.get(nucleus);
      if (carrier && isNonactiveCarrierApplication(nucleus)) return carrier.projection;

      const nominalApplication = getClassicalNahuatlIssuedNominalSentenceApplication(nucleus);
      const exactApplication = isClassicalNahuatlVncApplicationIssuedFrame(sourceResultFrame)
        && classicalNahuatlVncApplicationFrameByResultFrame.get(sourceResultFrame.resultFrame) === sourceResultFrame
          ? sourceResultFrame : null;
      if (sourceResultFrame?.kind === "classical-nahuatl-vnc-application-frame" && !exactApplication) return null;
      const projection = getClassicalNahuatlVncApplicationSharedService()
        .getContinuationSourceConstituents(nominalApplication?.resultFrame || exactApplication?.resultFrame || sourceResultFrame);
      const exactIssuedApplication = exactApplication
        && classicalNahuatlVncApplicationFrameByResultFrame.get(
          exactApplication.resultFrame,
        ) === exactApplication
        && isClassicalNahuatlVncApplicationIssuedResultFrame(exactApplication.resultFrame)
          ? exactApplication : null;
      // Private continuation ancestry belongs to the supplied issued object.
      // A copied application facade may share genuine inner machinery, but
      // cannot inherit the original application's privately retained parent.
      const retainedContinuation = exactIssuedApplication
        ? classicalNahuatlVncContinuationSourceByApplicationFrame.get(exactIssuedApplication)
        : !exactApplication && isCanonicalClassicalNahuatlVncContinuationResult(sourceResultFrame)
          ? classicalNahuatlVncContinuationSourceByResultFrame.get(sourceResultFrame) : null;
      const retainedParent = retainedContinuation?.sourceResultFrame || null;
      const canonicalContinuationSourceResultFrame = retainedParent
        && isCanonicalClassicalNahuatlVncContinuationResult(retainedParent)
        && retainedContinuation.sourceMachineryFrame
          === getClassicalNahuatlVncContinuationSelectedMachinery(retainedParent)
        ? retainedParent : null;
      const exactProjection = projection
        ? Object.freeze({...projection,
          ...(exactIssuedApplication ? {canonicalApplicationFrame: exactIssuedApplication} : {}),
          canonicalContinuationSourceResultFrame,
        }) : null;
      return exactProjection && nominalApplication
        ? Object.freeze({...exactProjection, canonicalResultFrame: nucleus,
          canonicalNominalSourceResultFrame: nucleus,
          canonicalNominalConstructionResultFrame: nucleus}) : exactProjection;
    }
    function getClassicalNahuatlVncTypedSourceApplicationInventory(
      provenance = null,
      derivationType = "",
      selections = {},
    ) {
      const normalizedDerivation =
        normalizeClassicalNahuatlVncApplicationDerivation(derivationType);
      if (
        !provenance
        || !["causative", "applicative"].includes(normalizedDerivation)
      ) {
        return null;
      }
      const owner = provenance.ownerDependencies;
      const inventory =
        owner.getClassicalNahuatlVncDerivationOptionInventory(
          provenance.exactSourceMachineryFrame,
          {
            derivationType: normalizedDerivation,
            applicativeObjectKind: selections.applicativeObjectKind,
            sourceValence: provenance.sourceDescriptor.sourceValence,
            verbClass: provenance.sourceDescriptor.verbClass,
          },
        );
      return Boolean(
        inventory?.authorizationStatus === "authorized"
        && inventory.sourceMachineryFrame
          === provenance.exactSourceMachineryFrame
        && owner.isClassicalNahuatlVncDerivationOptionInventory(
          inventory,
        ) === true
      ) ? inventory : null;
    }
    function projectClassicalNahuatlVncTypedSourceApplicationOption(
      choiceId = "",
      option = {},
    ) {
      return Object.freeze({
        choiceId,
        optionId: normalizeClassicalNahuatlVncApplicationToken(
          option.optionId,
        ),
        label: normalizeClassicalNahuatlVncApplicationToken(
          option.label
          || option.displayLabel
          || option.targetStem
          || option.optionId,
        ),
        derivationType: normalizeClassicalNahuatlVncApplicationToken(
          option.derivationType,
        ),
        derivationSubtype: normalizeClassicalNahuatlVncApplicationToken(
          option.derivationSubtype || option.subtype,
        ),
        targetStem: normalizeClassicalNahuatlVncApplicationStem(
          option.targetStem,
        ),
        targetClass: normalizeClassicalNahuatlVncApplicationToken(
          option.targetClass,
        ),
        availabilityStatus: option.availabilityStatus || "available",
        blockReason: option.blockReason || "",
        ownerOptionProjected: true,
        ownerOptionAuthority: false,
        grammarAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
      });
    }
    // Inspect the final canonical number cell, after lexical and object/voice overrides.
    function isClassicalNahuatlOptionalFiniteConnectorFrame(typed, request) {
      const number = typed?.slots?.number;
      const plans = [typed?.lesson11Alternative, typed?.lesson11Plan];
      return request?.mood === "indicative" && ["future", "preterit"].includes(request.tense)
        && number?.condition === "future-preterit-indicative"
        && ["⎕", "qui"].includes(number.num1) && number.num2 === "0"
        && !number.rule && !plans.some(plan => plan?.num1Override || plan?.deletePostStemK || plan?.kDeletionAfterStem);
    }
    function projectClassicalNahuatlFiniteConnectorOptions(available) {
      return available ? Object.freeze(["silent", "qui"].map(optionId =>
        projectClassicalNahuatlVncTypedSourceApplicationOption("finiteSingularConnector", {
          optionId, label: optionId === "qui" ? "qui · archaic" : "Silent · usual",
        }))) : null;
    }
    function getClassicalNahuatlVncAdmonitiveNumberChoiceFrame(request = {}) {
      if (request.mood !== "admonitive" || request.tense !== "nonpast"
        || !String(request.subject || "").endsWith("pl")) return null;
      try {
        const numberOwner = getClassicalNahuatlVncApplicationRuntimeTarget();
        const stem = request.targetStem || request.sourceStem;
        const verbClass = request.targetClass || request.verbClass;
        const candidate = numberOwner.getClassicalNahuatlFiniteSubjectNumberDyad({
          subject: request.subject, mood: request.mood, tense: request.tense,
          stem, verbClass,
        });
        // Validate this provider and this coordinate at every projection read.
        if (numberOwner.isClassicalNahuatlFiniteSubjectNumberDyad?.(candidate) === true
          && candidate.subject === request.subject
          && candidate.condition === "nonpast-admonitive"
          && candidate.conditioningStem === stem
          && candidate.verbClass === verbClass) return candidate;
      } catch { /* An unavailable number owner cannot license a choice. */ }
      return null;
    }
    function buildClassicalNahuatlVncTypedSourceApplicationChoiceProjection({
      derivationInventories = {},
      selectedDerivation = "",
      participantOperationFrame = null,
      allowedVoices = ["active"],
      nonactiveOptionInventory = null,
      admonitiveNumberFrame = null,
      finiteConnectorOptions = null,
    } = {}) {
      const requestedDerivation = Object.freeze([
        projectClassicalNahuatlVncTypedSourceApplicationOption(
          "requestedDerivation",
          {
            optionId: "direct",
            label: "No added derivation",
            derivationType: "direct",
          },
        ),
        ...["causative", "applicative"].map(derivationType => {
          const inventory = derivationInventories[derivationType] || null;
          const available = Boolean(
            inventory?.authorizationStatus === "authorized"
            && inventory.options?.length
          );
          return projectClassicalNahuatlVncTypedSourceApplicationOption(
            "requestedDerivation",
            {
              optionId: derivationType,
              label: derivationType === "causative"
                ? "Causative"
                : "Applicative",
              derivationType,
              availabilityStatus: available
                ? "available"
                : "incompatible",
              blockReason: available
                ? ""
                : inventory?.blockReason
                  || "classical-vnc-typed-source-derivation-unavailable",
            },
          );
        }),
      ]);
      const selectedInventory =
        derivationInventories[selectedDerivation] || null;
      const derivationOptionId = Object.freeze(
        (selectedInventory?.options || []).map(option => (
          projectClassicalNahuatlVncTypedSourceApplicationOption(
            "derivationOptionId",
            option,
          )
        )),
      );
      const allowedCausativeObjectKinds = Object.freeze(
        participantOperationFrame?.participantTransformFrame
          ?.allowedCausativeObjectKinds || [],
      );
      const causativeObjectKind = Object.freeze(
        allowedCausativeObjectKinds.map(optionId => (
          projectClassicalNahuatlVncTypedSourceApplicationOption(
            "causativeObjectKind",
            { optionId, label: optionId },
          )
        )),
      );
      const applicativeObjectKind = Object.freeze([
        "specific-projective",
        "reflexive",
        "nonspecific-human",
        "nonspecific-nonhuman",
      ].map(optionId => (
        projectClassicalNahuatlVncTypedSourceApplicationOption(
          "applicativeObjectKind",
          { optionId, label: optionId },
        )
      )));
      const applicativeObjectPerson = Object.freeze([
        "1sg", "2sg", "3sg", "1pl", "2pl", "3pl",
      ].map(optionId => (
        projectClassicalNahuatlVncTypedSourceApplicationOption(
          "applicativeObjectPerson",
          { optionId, label: optionId },
        )
      )));
      const requestedVoice = Object.freeze(
        allowedVoices.map(optionId => (
          projectClassicalNahuatlVncTypedSourceApplicationOption(
            "requestedVoice",
            { optionId, label: optionId },
          )
        )),
      );
      const nonactiveOptionId = Object.freeze(
        (nonactiveOptionInventory?.options || []).map(option => (
          projectClassicalNahuatlVncTypedSourceApplicationOption(
            "nonactiveOptionId",
            {
              ...option,
              targetStem: option.targetStem || option.stem || "",
            },
          )
        )),
      );
      return deepFreezeClassicalNahuatlVncApplicationValue({
        requestedDerivation,
        derivationOptionId,
        causativeObjectKind,
        applicativeObjectKind,
        applicativeObjectPerson,
        requestedVoice,
        nonactiveOptionId,
        ...(finiteConnectorOptions ? {finiteSingularConnector: finiteConnectorOptions} : {}),
        ...(admonitiveNumberFrame ? {
          admonitivePluralEnding: Object.freeze(admonitiveNumberFrame.num2Variants.map(optionId => (
            projectClassicalNahuatlVncTypedSourceApplicationOption(
              "admonitivePluralEnding", { optionId, label: optionId },
            )
          ))),
        } : {}),
        ownerOptionAuthority: false,
        grammarAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
      });
    }
    function buildClassicalNahuatlVncTypedSourceApplicationOwnerRequest(
      provenance = null,
      effectiveSelections = {},
    ) {
      const source = provenance?.sourceDescriptor || null;
      if (!source) return null;
      return deepFreezeClassicalNahuatlVncApplicationValue({
        sourceStem: source.sourceStem,
        sourceLexemeId: source.sourceLexemeId,
        sourceInitialISelection:
          source.sourceInitialISelection || "",
        verbClass: source.verbClass,
        sourceValence: source.sourceValence,
        sourceSubject: source.sourceSubject,
        ...Object.fromEntries(["sourceSubjectPerson", "sourceSubjectAnimacy", "sourceSubjectHumanness", "sourceSubjectNumber"].filter(field => source[field]).map(field => [field, source[field]])),
        sourceObjectRequests: cloneClassicalNahuatlVncApplicationCompactValue(
          source.sourceObjectRequests || [],
        ),
        sourceVoice: source.sourceVoice || "active",
        requestedSourceVoice: source.sourceVoice || "active",
        sourceNonactiveOptionId: source.sourceNonactiveOptionId || "",
        objectKind: source.objectKind,
        objectPerson: source.objectPerson,
        ...cloneClassicalNahuatlVncApplicationCompactValue(
          effectiveSelections,
        ),
        outputScope: "single",
      });
    }
    const restrictedContainingBindings=new WeakMap(),restrictedContainingApplications=new WeakMap(),restrictedContainingFiniteResults=new WeakMap();
    function isClassicalNahuatlRestrictedContainingVncFiniteResult(frame=null) {
      const c=frame&&restrictedContainingFiniteResults.get(frame),r=getClassicalNahuatlVncApplicationRuntimeTarget();
      return Boolean(c&&r.isClassicalNahuatlRestrictedContainingTargetFrame?.(c.formation)
        &&c.formation.containingFamily==="tla-impersonal"&&r.isClassicalNahuatlFiniteVncResult?.(frame)
        &&frame.source===c.source&&frame.vncSlotFrame===c.slot&&frame.source.stem===c.formation.targetStem
        &&frame.source.verbClass===""&&Object.isFrozen(frame)&&Object.isFrozen(c.slot));
    }
    function issueRestrictedContainingBinding(source,selections={}) {
      const r=getClassicalNahuatlVncApplicationRuntimeTarget(),family=source.sourceAnalysis.containingFamily;
      const allowed=["subject","subjectAnimacy","subjectHumanness","mood","tense","reading","embedStem","adverbialEntryId","requestedVoice","requestedDerivation","sentenceOptions"];
      const options=values=>Object.freeze(values.map(value=>Object.freeze({optionId:value,value,label:value,availabilityStatus:"available",grammarAuthority:false})));
      const projection={subject:options(family==="tla-impersonal"?["3sg"]:["1sg","2sg","3sg","1pl","2pl","3pl","3common"]),
        subjectAnimacy:options(family==="tla-impersonal"?["unspecified"]:["animate","nonanimate"]),
        subjectHumanness:options(family==="tla-impersonal"?["unspecified"]:["human","nonhuman"]),mood:options(["indicative"]),
        tense:options(family==="adverbial-matrix"?["imperfect"]:["present"]),
        ...(family==="tla-impersonal"?{reading:options(r.getClassicalNahuatlTlaImpersonalSourceAnalysis?.(source.sourceStem)?.availableReadings || [])}:{}),
        ...(family==="archaic-motion-matrix"?{embedStem:options(["hui"])}:{}),
        ...(family==="adverbial-matrix"?{adverbialEntryId:options([source.sourceAnalysis.requiredAdverbialEntryId])}:{})};
      const caller=deepFreezeClassicalNahuatlVncApplicationValue(cloneClassicalNahuatlVncApplicationCompactValue(selections || {}));
      const effective=Object.freeze({requestedVoice:"active",requestedDerivation:"direct",...caller});
      let reason=!selections||typeof selections!=="object"||Array.isArray(selections)||Object.keys(selections).some(k=>!allowed.includes(k))
        ?"restricted-containing-selection-not-supported":effective.requestedVoice!=="active"||effective.requestedDerivation!=="direct"?"restricted-containing-active-direct-target-required":"";
      if(!reason&&Object.entries(projection).some(([k,domain])=>selections[k]&&!domain.some(o=>o.optionId===selections[k])))reason="restricted-containing-selection-not-licensed";
      const envelope=selections.sentenceOptions;
      if(!reason&&envelope&&(typeof envelope!=="object"||Array.isArray(envelope)||envelope.negative===true||envelope.antecessive===true||envelope.sentenceAntecessive===true
        ||![undefined,"","affirmative-assertion"].includes(envelope.sentenceType)||[envelope.directionalPrefix,envelope.introductoryParticle,envelope.prefaceParticle,envelope.introductoryModifier].some(v=>v&&v!=="none")
        ||envelope.outsidePrefixes?.length||getClassicalNahuatlVncApplicationPresentFields(envelope,CLASSICAL_NAHUATL_VNC_APPLICATION_CALLER_AUTHORITY_FIELDS).length
        ||getClassicalNahuatlVncApplicationCurriculumCarrierFields(envelope).length))reason="restricted-containing-envelope-outside-context";
      const required=!reason?Object.keys(projection).filter(k=>!selections[k]):[];
      let participant=null,formation=null,finite=null,targetApplication=null,nominal=null,adverbial=null;
      if(!reason&&!required.length) {
        const agreement=/^(1|2|3)(sg|pl|common)$/u.exec(selections.subject);
        participant=buildClassicalNahuatlParticipantFrame({role:"subject",agreement:selections.subject,
          animacy:selections.subjectAnimacy,humanness:selections.subjectHumanness,
          number:agreement[2]==="common"?"common":agreement[2]==="pl"?"plural":"singular",hasReferent:family!=="tla-impersonal"});
        if(family==="tla-impersonal"||family==="archaic-motion-matrix") {
          formation=r.buildClassicalNahuatlRestrictedContainingTargetFrame(source,family==="tla-impersonal"?{reading:selections.reading}:{embedStem:selections.embedStem});
          if(!r.isClassicalNahuatlRestrictedContainingTargetFrame(formation))reason=formation?.blockReason||"restricted-containing-actual-formation-required";
        }
        if(!reason&&family==="tla-impersonal") {
          finite=r.buildClassicalNahuatlFiniteVncResult(formation.targetStem,{subject:participant.morphologicalAgreement,mood:selections.mood,tense:selections.tense});
          if(!r.isClassicalNahuatlFiniteVncResult(finite))reason="tla-impersonal-actual-finite-target-required";
          else{deepFreezeClassicalNahuatlVncApplicationValue(finite);restrictedContainingFiniteResults.set(finite,Object.freeze({formation,source:finite.source,slot:finite.vncSlotFrame}));}
        } else if(!reason&&family==="archaic-motion-matrix") {
          targetApplication=evaluateClassicalNahuatlVncApplication({sourceStem:formation.targetStem,verbClass:formation.targetClass,sourceValence:"intransitive",
            subject:participant.morphologicalAgreement,sourceSubject:selections.subject,sourceSubjectAnimacy:selections.subjectAnimacy,sourceSubjectHumanness:selections.subjectHumanness,sourceSubjectNumber:participant.number,
            objectKind:"none",requestedVoice:"active",requestedDerivation:"direct",mood:selections.mood,tense:selections.tense});
          if(!isClassicalNahuatlVncApplicationFrameInternal(targetApplication))reason=targetApplication?.blockReason||"archaic-motion-actual-target-required";
        } else if(!reason&&family==="adverbial-matrix") {
          const potential=r.buildClassicalNahuatlLexicalAdverbialPotentialFrame({stem:source.sourceAnalysis.requiredAdverbialStem});
          adverbial=r.evaluateClassicalNahuatlAdverbialNuclear({adverbialPotentialFrame:potential,degree:source.sourceAnalysis.requiredAdverbialDegree,scope:"external-clause"});
          if(r.isClassicalNahuatlAdverbialNuclearResult?.(adverbial)!==true)reason=adverbial?.blockReason||"owned-adverbial-nnc-required";
          else {
            nominal=r.evaluateClassicalNahuatlNominalConstruction({constructionKind:"nominal-embed-vnc",relation:"adverb",route:"direct-adverb",adverbRole:"manner",orientation:"not-applicable",
              source:{embedStem:adverbial.wordSurface,matrixStem:source.sourceStem,embedConstituent:{kind:"adverbial-nnc-result",resultFrame:adverbial},matrixConstituent:{kind:"restricted-vnc-source",sourceFrame:source}},
              subject:participant.morphologicalAgreement,subjectAnimacy:selections.subjectAnimacy,subjectHumanness:selections.subjectHumanness,subjectNumber:participant.number,mood:selections.mood,tense:selections.tense,voice:"active",outputKind:"single"});
            if(r.isClassicalNahuatlNominalConstructionResult?.(nominal)!==true)reason=nominal?.blockReason||"actual-nominal-matrix-target-required";
            else targetApplication=nominal.canonicalResult;
          }
        }
      }
      if(!reason && targetApplication) {
        const actual=targetApplication.resultFrame?.participantProjection?.targetSubject;
        if(!actual || actual.morphologicalAgreement!==participant.morphologicalAgreement || actual.number!==participant.number
          || actual.animacy!==participant.animacy || actual.humanness!==participant.humanness || actual.hasReferent!==participant.hasReferent)
          reason="containing-target-semantic-context-not-retained";
        else participant=actual;
      }
      const status=reason?"rejected":required.length?"choices-required":"ready";
      const binding=Object.freeze({kind:CLASSICAL_NAHUATL_VNC_TYPED_SOURCE_APPLICATION_BINDING_FRAME_KIND,version:1,operationId:"vnc:application",bindingStatus:status,
        authorizationStatus:reason?"blocked":"authorized",blockReason:reason,exactSourceMachineryFrame:source,inputSourceMachineryFrame:source,callerSelections:caller,effectiveSelections:effective,
        requiredChoiceIds:Object.freeze(required),choiceOptionProjection:Object.freeze(projection),executionArgs:Object.freeze(status==="ready"?[source,effective]:[]),
        ownerInputAcceptanceProven:true,exactSourceIdentityPreserved:true,ownerExecutionStillRequired:status==="ready",grammarAuthority:false,sourceFiniteEventAsserted:false});
      restrictedContainingBindings.set(binding,Object.freeze({source,effective,participant,formation,finite,targetApplication,nominal,adverbial}));return binding;
    }
    function isRestrictedContainingBinding(frame=null) {
      const c=frame&&restrictedContainingBindings.get(frame),r=getClassicalNahuatlVncApplicationRuntimeTarget();
      return Boolean(c&&Object.isFrozen(frame)&&r.isClassicalNahuatlRestrictedContainingVncSourceFrame(c.source)
        &&frame.exactSourceMachineryFrame===c.source&&frame.effectiveSelections===c.effective
        &&(frame.bindingStatus!=="ready"||c.finite&&isClassicalNahuatlRestrictedContainingVncFiniteResult(c.finite)
          ||c.targetApplication&&isClassicalNahuatlVncApplicationFrameInternal(c.targetApplication)));
    }
    function buildRestrictedContainingApplication(binding) {
      const c=restrictedContainingBindings.get(binding),r=getClassicalNahuatlVncApplicationRuntimeTarget();
      const inner=c.targetApplication,resultInner=inner?.resultFrame,machinery=c.finite||resultInner.selectedMachineryFrame,
        typed=c.finite?.vncSlotFrame||resultInner.finalTypedVncSlotFrame,
        surface=c.finite?r.buildClassicalNahuatlVncFiniteSurfaceFrame(c.finite):resultInner.finiteSurfaceFrame;
      if(!r.isClassicalNahuatlVncFiniteSurfaceFrame(surface))return null;
      const participant=c.participant,objects=Object.freeze([]),targetStem=c.formation?.targetStem||c.nominal?.operationFrame?.compoundStem;
      deepFreezeClassicalNahuatlVncApplicationValue(machinery);
      const normalized=Object.freeze({kind:"classical-nahuatl-vnc-application-request",sourceStem:c.source.sourceStem,sourceRank:c.source.sourceRank,sourceValence:"intransitive",verbClass:c.source.sourceClass,
        sourceSubject:"",sourceSubjectFrame:null,sourceObjectRequests:objects,sourceFiniteEventAsserted:false,subject:c.effective.subject,subjectFrame:participant,targetSubjectFrame:participant,
        voice:"active",sourceVoice:"active",targetVoiceOperation:"active",derivationType:"direct",requestedDerivation:"direct",mood:c.effective.mood,tense:c.effective.tense,
        sentenceOptions:buildClassicalNahuatlVncApplicationSentenceOptions(c.effective)});
      const custody={canonicalRestrictedContainingSourceFrame:c.source,containingFormationFrame:c.formation,
        containingNominalConstructionFrame:c.nominal,adverbialEmbedResult:c.adverbial,targetVncApplicationFrame:inner,canonicalFiniteVncResult:c.finite};
      const result=Object.freeze({kind:"classical-nahuatl-vnc-application-result-frame",version:CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,authorizationStatus:"authorized",blockReason:"",...custody,
        sourceMachineryFrame:c.source,selectedMachineryFrame:machinery,finalTypedVncSlotFrame:typed,selectedSourceVoice:"active",selectedVoice:"active",selectedVoiceOperation:"active",selectedDerivation:"direct",
        subjectParticipantFrame:participant,participantProjection:Object.freeze({sourceSubject:null,targetSubject:participant,sourceObjects:objects,targetObjects:objects}),finiteSurfaceFrame:surface,
        formulaRealization:surface.formulaRealization,surfaceRealization:surface.wordRealization,wordSurface:surface.wordRealization,typedFrameAuthority:true,callerSuppliedAuthorityAccepted:false,formulaStringAuthority:false,surfaceStringAuthority:false});
      const app=finalizeBuiltClassicalNahuatlVncApplicationFrame({kind:"classical-nahuatl-vnc-application-frame",version:CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,authorizationStatus:"authorized",blockReason:"",...custody,normalizedRequest:normalized,resultFrame:result,
        controlFrame:Object.freeze({authorizationStatus:"authorized",selectedSourceVoice:"active",selectedVoice:"active",selectedVoiceOperation:"active",derivationType:"direct"}),
        formulaRealization:surface.formulaRealization,surfaceRealization:surface.wordRealization,typedFrameAuthority:true,callerSuppliedAuthorityAccepted:false,formulaStringAuthority:false,surfaceStringAuthority:false});
      const projection=Object.freeze({kind:"classical-nahuatl-vnc-continuation-source-constituents",authorizationStatus:"authorized",...custody,canonicalSourceFrame:c.source,canonicalApplicationFrame:app,canonicalResultFrame:result,
        sourceStem:targetStem,sourceIdentityStem:c.source.sourceStem,verbClass:c.source.sourceClass,sourceValence:"intransitive",sourceVoice:"active",sourceSubject:c.effective.subject,sourceSubjectFrame:participant,sourceObjectRequests:objects,grammarAuthority:false});
      const context=Object.freeze({...c,app,result,typed,machinery,surface,projection,coordinate:Object.freeze({subject:participant.morphologicalAgreement,mood:c.effective.mood,tense:c.effective.tense})});
      restrictedContainingApplications.set(app,context);restrictedContainingApplications.set(result,context);classicalNahuatlVncApplicationFrameByResultFrame.set(result,app);return app;
    }
    function isRestrictedContainingApplication(frame=null) {
      const c=frame&&restrictedContainingApplications.get(frame),r=getClassicalNahuatlVncApplicationRuntimeTarget();
      return Boolean(c&&Object.isFrozen(frame)&&r.isClassicalNahuatlRestrictedContainingVncSourceFrame(c.source)
        &&c.app.resultFrame===c.result&&c.result.sourceMachineryFrame===c.source&&c.result.selectedMachineryFrame===c.machinery
        &&c.result.finalTypedVncSlotFrame===c.typed&&c.result.subjectParticipantFrame===c.participant
        &&(c.finite?isClassicalNahuatlRestrictedContainingVncFiniteResult(c.finite):isClassicalNahuatlVncApplicationFrameInternal(c.targetApplication))
        &&(c.formation?r.isClassicalNahuatlRestrictedContainingTargetFrame(c.formation):r.isClassicalNahuatlNominalConstructionResult(c.nominal)
          &&c.nominal.sourceAuthorizationFrame?.lexicalFacts?.canonicalRestrictedMatrixSourceFrame===c.source));
    }
    function isAnalyticalVncOperand(source) {
      const r=getClassicalNahuatlVncApplicationRuntimeTarget();
      return r.isClassicalNahuatlAnalyticalVncSourceFrame(source) || isClassicalNahuatlImperfectiveVncSourceFrame(source)
        && source.sourceAnalysis.formation==="root-plus-ya" && source.sourceAnalysis.licensedOperationRuleIds?.length>0;
    }
    const analyticalVncBindings = new WeakMap();
    const analyticalVncApplications = new WeakMap();
    function issueAnalyticalVncBinding(source,selections={}) {
      const r=getClassicalNahuatlVncApplicationRuntimeTarget();
      const allowed=["subject","subjectAnimacy","subjectHumanness","mood","tense","objectSelection","requestedVoice","requestedDerivation","sentenceOptions"];
      const caller=deepFreezeClassicalNahuatlVncApplicationValue(cloneClassicalNahuatlVncApplicationCompactValue(selections||{}));
      const effective=Object.freeze({requestedVoice:"active",requestedDerivation:"causative",...caller});
      const fullOperand=isClassicalNahuatlImperfectiveVncSourceFrame(source);
      const projection={};
      for(const [id,values]of Object.entries({subject:["1sg","2sg","3sg","1pl","2pl","3pl","3common"],subjectAnimacy:["animate","nonanimate"],subjectHumanness:["human","nonhuman","unspecified"],mood:["indicative"],tense:["present"]}))
        projection[id]=Object.freeze(values.map(optionId=>Object.freeze({choiceId:id,optionId,label:optionId,availabilityStatus:"available",ownerOptionProjected:true,grammarAuthority:false})));
      projection.objectSelection=Object.freeze([
        ...(fullOperand?[{optionId:"reflexive:",label:"reflexive"}]:[]),
        ...r.getClassicalNahuatlObjectOptions({stem:source.sourceStem}).filter(option=>option.objectKind==="specific-projective").map(option=>({optionId:`specific-projective:${option.objectPerson}`,label:option.label})),
        {optionId:"specific-projective:3common",label:"specific nonanimate (one or more)"}
      ].map(option=>Object.freeze({...option,choiceId:"objectSelection",inventoryFieldRef:"id:classical-rule-logic-object",availabilityStatus:"available",ownerOptionProjected:true,grammarAuthority:false})));
      const required=Object.keys(projection).filter(key=>typeof selections?.[key]!=="string"||!selections[key]);
      let reason=!selections||typeof selections!=="object"||Array.isArray(selections)||Object.keys(selections).some(key=>!allowed.includes(key))
        ||Object.entries(projection).some(([key,options])=>Object.hasOwn(selections,key)&&selections[key]&&!options.some(option=>option.optionId===selections[key]))
        ?"analytical-vnc-selection-not-supported":effective.requestedVoice!=="active"||effective.requestedDerivation!=="causative"?"analytical-vnc-attested-causative-use-required":"";
      const envelope=selections?.sentenceOptions;
      if(!reason&&envelope&&(typeof envelope!=="object"||Array.isArray(envelope)||!["",undefined,"affirmative-assertion"].includes(envelope.sentenceType)||envelope.negative===true||envelope.antecessive===true||envelope.sentenceAntecessive===true
        ||[envelope.directionalPrefix,envelope.introductoryParticle,envelope.introductoryModifier,envelope.prefaceParticle].some(value=>value&&value!=="none")||envelope.outsidePrefixes?.length
        ||getClassicalNahuatlVncApplicationPresentFields(envelope,CLASSICAL_NAHUATL_VNC_APPLICATION_CALLER_AUTHORITY_FIELDS).length
        ||getClassicalNahuatlVncApplicationCurriculumCarrierFields(envelope).length))reason="analytical-vnc-envelope-outside-admitted-context";
      let participant=null,causee=null,context=null,operation=null,machinery=null;
      if(!reason&&!required.length){
        const match=/^(1|2|3)(sg|pl|common)$/u.exec(selections.subject);
        participant=buildClassicalNahuatlParticipantFrame({role:"subject",agreement:selections.subject,animacy:selections.subjectAnimacy,humanness:selections.subjectHumanness,
          number:match[2]==="common"?"common":match[2]==="pl"?"plural":"singular",hasReferent:true,
          ...(selections.objectSelection==="reflexive:"?{referenceId:"causative-reflexive-subject"}:{})});
        const [objectKind,selectedObjectPerson]=selections.objectSelection.split(":");
        const objectPerson=objectKind==="reflexive"?participant.morphologicalAgreement:selectedObjectPerson;
        const object=normalizeClassicalNahuatlVncApplicationObjectRequest({objectKind,objectPerson,governor:"causative",derivationalLevel:1,
          ...(objectKind==="reflexive"?{participantFrame:participant,referenceId:participant.referenceId}:{}),
          ...(objectPerson==="3common"?{person:"3",animacy:"nonanimate",humanness:"nonhuman",number:"common"}:{})});
        causee=object.participantFrame;
        context=r.buildClassicalNahuatlAnalyticalVncDerivationContextFrame(source,{innerSubjectParticipantFrame:causee,targetSubjectParticipantFrame:participant});
        const inventory=r.getClassicalNahuatlVncDerivationOptionInventory(context,{derivationType:"causative"});
        // The authenticated operand's licensed-use facts may leave exactly one
        // generated option even when a generic morphology analysis is selective.
        const ownedOption=inventory.authorizationStatus==="authorized" && inventory.options.length===1 ? inventory.options[0] : null;
        operation=r.deriveClassicalNahuatlVncDerivationOperationFrame(context,{derivationType:"causative",optionId:ownedOption?.optionId || "",targetSubject:participant.morphologicalAgreement,causativeObjectKind:objectKind});
        if(!r.isClassicalNahuatlVncDerivationOperationFrame(operation))reason=operation?.blockReason||"analytical-vnc-owned-operation-required";
        if(!reason){machinery=r.buildClassicalNahuatlDerivedVncMachineryFrame(context,operation,{targetSubject:participant.morphologicalAgreement,mood:selections.mood,tense:selections.tense});
          if(!r.isClassicalNahuatlDerivedVncMachineryFrame(machinery))reason=machinery?.blockReason||"analytical-vnc-derived-target-required";}
      }
      const status=reason?"rejected":required.length?"choices-required":"ready";
      const frame=Object.freeze({kind:CLASSICAL_NAHUATL_VNC_TYPED_SOURCE_APPLICATION_BINDING_FRAME_KIND,version:1,operationId:"vnc:application",bindingStatus:status,authorizationStatus:reason?"blocked":"authorized",
        blockReason:reason||(required.length?"analytical-vnc-explicit-target-context-required":""),exactSourceMachineryFrame:source,inputSourceMachineryFrame:source,callerSelections:caller,effectiveSelections:effective,
        requiredChoiceIds:Object.freeze(reason?[]:required),choiceOptionProjection:Object.freeze(projection),executionArgs:Object.freeze(status==="ready"?[source,effective]:[]),
        ownerChoicesRequired:status==="choices-required",ownerInputAcceptanceProven:true,exactSourceIdentityPreserved:true,ownerExecutionStillRequired:status==="ready",grammarAuthority:false,
        finiteCoordinateCapabilityScope:"positive-indicative-present",sourceFiniteEventAsserted:false});
      analyticalVncBindings.set(frame,Object.freeze({source,effective,participant,causee,context,operation,machinery}));return frame;
    }
    function isAnalyticalVncBinding(frame) {
      const c=frame&&analyticalVncBindings.get(frame),r=getClassicalNahuatlVncApplicationRuntimeTarget();
      return Boolean(c&&Object.isFrozen(frame)&&isAnalyticalVncOperand(c.source)
        &&frame.exactSourceMachineryFrame===c.source&&frame.effectiveSelections===c.effective
        &&(frame.bindingStatus!=="ready"||r.isClassicalNahuatlDerivedVncMachineryFrame(c.machinery)
          &&r.isClassicalNahuatlAnalyticalVncDerivationContextFrame(c.context)));
    }
    function buildAnalyticalVncApplication(binding) {
      const c=analyticalVncBindings.get(binding),r=getClassicalNahuatlVncApplicationRuntimeTarget();
      const machinery=c.machinery,typed=machinery.finalTypedVncSlotFrame;
      deepFreezeClassicalNahuatlVncApplicationValue(machinery);
      const surface=r.buildClassicalNahuatlVncFiniteSurfaceFrame(machinery);if(!r.isClassicalNahuatlVncFiniteSurfaceFrame(surface))return null;
      const objects=c.operation.targetObjectRequests;
      const normalized=Object.freeze({kind:"classical-nahuatl-vnc-application-request",sourceStem:c.source.sourceStem,sourceRank:c.source.sourceRank,
        sourceValence:c.source.sourceValence,sourceClass:c.source.sourceClass || "",verbClass:c.operation.targetClass,predicateStem:c.operation.targetStem,targetClass:c.operation.targetClass,
        sourceSubject:"",sourceSubjectFrame:null,sourceObjectRequests:Object.freeze([]),sourceFiniteEventAsserted:false,
        subject:c.effective.subject,subjectFrame:c.participant,targetSubjectFrame:c.participant,targetObjectRequests:objects,
        requestedVoice:"active",voice:"active",sourceVoice:"active",targetVoiceOperation:"active",requestedDerivation:"causative",derivationType:"causative",
        mood:c.effective.mood,tense:c.effective.tense,sentenceOptions:buildClassicalNahuatlVncApplicationSentenceOptions(c.effective)});
      const result=Object.freeze({kind:"classical-nahuatl-vnc-application-result-frame",version:CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,authorizationStatus:"authorized",blockReason:"",
        canonicalAnalyticalSourceFrame:c.source,analyticalDerivationContextFrame:c.context,derivationOperationFrame:c.operation,
        sourceMachineryFrame:c.source,selectedMachineryFrame:machinery,finalTypedVncSlotFrame:typed,selectedSourceVoice:"active",selectedVoice:"active",selectedVoiceOperation:"active",selectedDerivation:"causative",
        subjectParticipantFrame:c.participant,participantProjection:Object.freeze({sourceSubject:c.causee,targetSubject:c.participant,sourceObjects:Object.freeze([]),targetObjects:Object.freeze([c.causee]),sourceSubjectIsAbstractArgument:true}),
        finiteSurfaceFrame:surface,formulaRealization:surface.formulaRealization,surfaceRealization:surface.wordRealization,wordSurface:surface.wordRealization,
        typedFrameAuthority:true,callerSuppliedAuthorityAccepted:false,formulaStringAuthority:false,surfaceStringAuthority:false});
      const app=finalizeBuiltClassicalNahuatlVncApplicationFrame({kind:"classical-nahuatl-vnc-application-frame",version:CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,authorizationStatus:"authorized",blockReason:"",normalizedRequest:normalized,resultFrame:result,
        canonicalAnalyticalSourceFrame:c.source,controlFrame:Object.freeze({authorizationStatus:"authorized",selectedSourceVoice:"active",selectedVoice:"active",selectedVoiceOperation:"active",derivationType:"causative"}),
        formulaRealization:surface.formulaRealization,surfaceRealization:surface.wordRealization,typedFrameAuthority:true,callerSuppliedAuthorityAccepted:false,formulaStringAuthority:false,surfaceStringAuthority:false});
      const projection=Object.freeze({kind:"classical-nahuatl-vnc-continuation-source-constituents",authorizationStatus:"authorized",canonicalSourceFrame:c.source,canonicalAnalyticalSourceFrame:c.source,
        canonicalApplicationFrame:app,canonicalResultFrame:result,analyticalDerivationContextFrame:c.context,derivationOperationFrame:c.operation,
        sourceStem:c.operation.targetStem,sourceIdentityStem:c.source.sourceStem,verbClass:c.operation.targetClass,sourceValence:c.operation.targetValence,sourceVoice:"active",
        sourceSubject:c.effective.subject,sourceSubjectFrame:c.participant,sourceObjectRequests:objects,grammarAuthority:false});
      const context=Object.freeze({...c,app,result,typed,surface,projection,coordinate:Object.freeze({subject:c.participant.morphologicalAgreement,mood:c.effective.mood,tense:c.effective.tense})});
      analyticalVncApplications.set(app,context);analyticalVncApplications.set(result,context);classicalNahuatlVncApplicationFrameByResultFrame.set(result,app);return app;
    }
    function isAnalyticalVncApplication(frame) {
      const c=frame&&analyticalVncApplications.get(frame),r=getClassicalNahuatlVncApplicationRuntimeTarget();
      return Boolean(c&&Object.isFrozen(frame)&&isAnalyticalVncOperand(c.source)
        &&r.isClassicalNahuatlAnalyticalVncDerivationContextFrame(c.context)&&r.isClassicalNahuatlDerivedVncMachineryFrame(c.machinery)
        &&c.context.canonicalAnalyticalSourceFrame===c.source&&c.operation.sourceMachineryFrame===c.context
        &&c.app.resultFrame===c.result&&c.result.sourceMachineryFrame===c.source&&c.result.selectedMachineryFrame===c.machinery
        &&c.result.finalTypedVncSlotFrame===c.machinery.finalTypedVncSlotFrame&&c.result.subjectParticipantFrame===c.participant
        &&c.context.targetSubjectParticipantFrame===c.participant
        &&c.result.finalTypedVncSlotFrame.slots.subject.participantFrame===c.participant
        &&c.operation.targetObjectRequests[0].participantFrame===c.causee
        &&c.result.finalTypedVncSlotFrame.slots.prePredicate.some(slot=>slot.objectRequestFrame===c.operation.targetObjectRequests[0]
          &&slot.participantFrame===c.causee)
        &&c.result.participantProjection.targetObjects[0]===c.context.abstractInnerSubjectParticipantFrame);
    }
    const imperfectiveSources=new WeakMap(),imperfectiveSourceContexts=new WeakMap();
    const imperfectiveBindings=new WeakMap(),imperfectiveFiniteResults=new WeakMap(),imperfectiveApplications=new WeakMap();
    const imperfectiveTransitiveMachinery=new WeakMap();
    function resolveClassicalNahuatlImperfectiveVncSourceFrame(request={}) {
      if (!request || typeof request!=="object" || Object.keys(request).some(k=>!["enteredStem","valence"].includes(k))) return null;
      const r=getClassicalNahuatlVncApplicationRuntimeTarget();
      const valence=["specific-projective","projective-human","projective-nonhuman","mainline-reflexive"].includes(request.valence)?"transitive":request.valence;
      const record=r.resolveClassicalNahuatlCanonicalSourceStemRecord?.({enteredStem:request.enteredStem,basalUnit:"vnc",valence});
      const analysis=record?.canonicalImperfectiveAnalysis;
      if (r.isClassicalNahuatlCanonicalSourceStemRecord?.(record)!==true || !analysis || analysis.perfectiveClassStatus!=="unresolved" || !["intransitive","specific-projective"].includes(record.defaultSourceValence)) return null;
      if(imperfectiveSources.has(record))return imperfectiveSources.get(record);
      const frame=Object.freeze({kind:"classical-nahuatl-imperfective-vnc-source-frame",sourceStem:record.stem,sourceValence:analysis.sourceValence || record.defaultSourceValence,sourceRank:analysis.sourceRank || "full-imperfective-verbstem",
        perfectiveClassStatus:analysis.perfectiveClassStatus,canonicalSourceStemRecord:record,sourceAnalysis:analysis,grammarAuthority:false});
      imperfectiveSources.set(record,frame);imperfectiveSourceContexts.set(frame,Object.freeze({record,analysis}));return frame;
    }
    function isClassicalNahuatlImperfectiveVncSourceFrame(frame=null) {
      const c=frame&&imperfectiveSourceContexts.get(frame),r=getClassicalNahuatlVncApplicationRuntimeTarget();
      return Boolean(c&&Object.isFrozen(frame)&&r.isClassicalNahuatlCanonicalSourceStemRecord(c.record)
        &&frame.canonicalSourceStemRecord===c.record&&frame.sourceAnalysis===c.analysis&&frame.sourceStem===c.record.stem&&frame.sourceValence===(c.analysis.sourceValence || c.record.defaultSourceValence));
    }
    function getImperfectiveAttestedFiniteCell(source,selections={}) {
      const context=source&&imperfectiveSourceContexts.get(source);
      if(!context)return null;
      return context.analysis.attestedFiniteCells?.find(cell=>Object.entries(cell.selections).every(([key,value])=>selections[key]===value))||null;
    }
    function isClassicalNahuatlImperfectiveVncFiniteResult(frame=null) {
      const c=frame&&imperfectiveFiniteResults.get(frame),r=getClassicalNahuatlVncApplicationRuntimeTarget();
      return Boolean(c&&isClassicalNahuatlImperfectiveVncSourceFrame(c.source)&&c.source.sourceValence==="intransitive"&&r.isClassicalNahuatlFiniteVncResult(frame)
        &&frame.source===c.finiteSource&&frame.vncSlotFrame===c.slot&&r.getClassicalNahuatlFiniteVncSlotSource(c.slot)===c.finiteSource
        &&c.finiteSource.verbClass===""&&c.finiteSource.stem===c.source.sourceStem&&Object.isFrozen(c.slot.slots.predicate));
    }
    function isClassicalNahuatlImperfectiveTransitiveVncMachineryFrame(frame=null) {
      const c=frame&&imperfectiveTransitiveMachinery.get(frame),r=getClassicalNahuatlVncApplicationRuntimeTarget();
      return Boolean(c&&Object.isFrozen(frame)&&isClassicalNahuatlImperfectiveVncSourceFrame(c.source)&&["specific-projective","projective-nonhuman","mainline-reflexive"].includes(c.source.sourceValence)
        &&r.isClassicalNahuatlTransitiveVncObjectFrame(c.lower)&&c.lower.proofFrame.conclusion.authorized===true
        &&c.attestedFiniteCell===getImperfectiveAttestedFiniteCell(c.source,c.selections)
        &&(frame.attestedFiniteCell||null)===c.attestedFiniteCell
        &&c.lower.stem===(c.attestedFiniteCell?.underlyingStem || c.attestedFiniteCell?.stem || c.source.sourceAnalysis.lexicalVerbstem || c.source.sourceStem)&&c.lower.tenseFrame.verbClass==="not-specified"
        &&frame.canonicalTransitiveVncObjectFrame===c.lower&&frame.originalTypedVncSlotFrame===c.lower.vncSlotFrame
        &&frame.finalBoundaryRealizationFrame===c.boundary&&frame.finalTypedVncSlotFrame===c.boundary.typedSlotFrame
        &&c.boundary.authorizationStatus==="authorized"&&c.boundary.sourceSemanticIdentity===c.lower.vncSlotFrame.semanticIdentity
        &&c.lower.subject===c.participant.morphologicalAgreement
        &&(c.object.objectKind==="reflexive" ? c.lower.objectFrame.objectKind==="mainline-reflexive" && c.lower.objectFrame.objectReflectsSubject===true
          : c.lower.objectFrame.objectKind===c.object.objectKind)
        &&(c.object.objectKind!=="specific-projective" || c.lower.objectFrame.objectPerson===c.object.participantFrame.morphologicalAgreement)
        &&Object.isFrozen(c.lower.vncSlotFrame.slots.predicate)&&Object.isFrozen(c.boundary.typedSlotFrame.slots.predicate));
    }
    function buildImperfectiveTransitiveMachinery(source,participant,object,selections) {
      const r=getClassicalNahuatlVncApplicationRuntimeTarget();
      const attestedFiniteCell=getImperfectiveAttestedFiniteCell(source,selections);
      const lower=r.buildClassicalNahuatlTransitiveVncObjectFrame(attestedFiniteCell?.underlyingStem || attestedFiniteCell?.stem || source.sourceAnalysis.lexicalVerbstem || source.sourceStem,{subject:participant.morphologicalAgreement,mood:selections.mood,tense:selections.tense,
        objectKind:object.objectKind,objectPerson:object.participantFrame.morphologicalAgreement,
        initialVowelKind:source.canonicalSourceStemRecord.initialIAnalysis?.kind || ""});
      if(!r.isClassicalNahuatlTransitiveVncObjectFrame(lower)||lower.proofFrame.conclusion.authorized!==true)return null;
      const boundary=r.realizeClassicalNahuatlVncSlotFrameAtFinalBoundary({vncSlotFrame:lower.vncSlotFrame,
        ...(source.sourceAnalysis.finalImperfectiveVowelRealization?{imperfectiveSourceFrame:source}:{})});
      if(boundary.authorizationStatus!=="authorized")return null;
      deepFreezeClassicalNahuatlVncApplicationValue(lower);deepFreezeClassicalNahuatlVncApplicationValue(boundary);
      const frame=Object.freeze({kind:"classical-nahuatl-imperfective-transitive-vnc-machinery-frame",authorizationStatus:"authorized",canonicalImperfectiveSourceFrame:source,
        ...(attestedFiniteCell?{attestedFiniteCell}:{}),
        canonicalTransitiveVncObjectFrame:lower,priorVncFrame:lower,originalTypedVncSlotFrame:lower.vncSlotFrame,finalBoundaryRealizationFrame:boundary,finalTypedVncSlotFrame:boundary.typedSlotFrame});
      imperfectiveTransitiveMachinery.set(frame,Object.freeze({source,lower,boundary,participant,object,selections,attestedFiniteCell}));
      return isClassicalNahuatlImperfectiveTransitiveVncMachineryFrame(frame)?frame:null;
    }
    function issueImperfectiveVncBinding(source,selections={}) {
      const r=getClassicalNahuatlVncApplicationRuntimeTarget(),transitive=["specific-projective","projective-nonhuman","mainline-reflexive"].includes(source.sourceValence);
      const inherent=source.sourceAnalysis.sourceVoice==="inherent-impersonal"
        && r.getClassicalNahuatlInherentImpersonalSourceAnalysis(source.sourceStem).inherentImpersonalFixedByKnownLexicon===true;
      const fixedContext=inherent?{subject:"3sg",subjectAnimacy:"unspecified",subjectHumanness:"unspecified",requestedVoice:"impersonal"}:{};
      const allowed=["subject","subjectAnimacy","subjectHumanness","mood","tense","requestedVoice","requestedDerivation","sentenceOptions",...(transitive?["objectSelection"]:[])];
      const caller=deepFreezeClassicalNahuatlVncApplicationValue(cloneClassicalNahuatlVncApplicationCompactValue(selections||{}));
      const fixedObjectSelection=source.sourceAnalysis.containedObjectKind ? source.sourceAnalysis.containedObjectKind+":" : "";
      const effective=Object.freeze({requestedVoice:"active",requestedDerivation:"direct",...caller,...fixedContext,...(fixedObjectSelection?{objectSelection:fixedObjectSelection}:{})});
      const classIndependentTenses=source.sourceAnalysis.classIndependentTenses||["present","future"];
      const attestedFiniteCells=source.sourceAnalysis.attestedFiniteCells||[];
      const projectedTenses=[...new Set([...classIndependentTenses,...attestedFiniteCells.map(cell=>cell.selections.tense)])];
      const projection={};
      for(const [id,values]of Object.entries({...(inherent?{}:{subject:source.sourceAnalysis.allowedSubjects || ["1sg","2sg","3sg","1pl","2pl","3pl","3common"],subjectAnimacy:["animate","nonanimate"],subjectHumanness:["human","nonhuman","unspecified"]}),mood:["indicative"],tense:projectedTenses}))
        projection[id]=Object.freeze(values.map(optionId=>Object.freeze({choiceId:id,optionId,label:optionId,availabilityStatus:"available",ownerOptionProjected:true,grammarAuthority:false})));
      if(source.sourceAnalysis.licensedOperationRuleIds?.length)projection.requestedDerivation=Object.freeze(["direct","causative"].map(optionId=>Object.freeze({
        choiceId:"requestedDerivation",optionId,label:optionId,availabilityStatus:"available",ownerOptionProjected:true,grammarAuthority:false})));
      if(transitive && !fixedObjectSelection)projection.objectSelection=Object.freeze([
        ...r.getClassicalNahuatlObjectOptions({stem:source.sourceStem}).filter(option=>option.objectKind==="specific-projective")
          .map(option=>({optionId:`specific-projective:${option.objectPerson}`,label:option.label})),
        {optionId:"specific-projective:3common",label:"specific nonanimate (one or more)"},
        ...[...new Set([...attestedFiniteCells.map(cell=>cell.selections.objectSelection).filter(Boolean),
          ...(source.sourceAnalysis.classIndependentObjectKinds||[]).filter(kind=>kind!=="specific-projective").map(kind=>kind+":")])]
          .map(optionId=>({optionId,label:optionId.split(":")[0].replaceAll("-"," ")}))
      ].map(option=>Object.freeze({...option,choiceId:"objectSelection",inventoryFieldRef:"id:classical-rule-logic-object",availabilityStatus:"available",ownerOptionProjected:true,grammarAuthority:false})));
      const required=Object.keys(projection).filter(k=>k!=="requestedDerivation" && (typeof selections?.[k]!=="string"||!selections[k]));
      const envelope=selections?.sentenceOptions;
      let reason=!selections||typeof selections!=="object"||Array.isArray(selections)||Object.keys(selections).some(k=>!allowed.includes(k))
        ||Object.entries(projection).some(([id,options])=>Object.hasOwn(selections,id)&&selections[id]&&!options.some(x=>x.optionId===selections[id]))
        ||fixedObjectSelection && Object.hasOwn(selections,"objectSelection") && selections.objectSelection!==fixedObjectSelection
        ||inherent && Object.entries(fixedContext).some(([k,v])=>Object.hasOwn(selections,k)&&selections[k]!==v)
        ?"imperfective-vnc-selection-not-supported":effective.requestedVoice!==(inherent?"impersonal":"active")||effective.requestedDerivation!=="direct"?"imperfective-vnc-class-independent-active-direct-required":"";
      if(!reason&&envelope&&(typeof envelope!=="object"||Array.isArray(envelope)||!["",undefined,"affirmative-assertion"].includes(envelope.sentenceType)||envelope.negative===true||envelope.antecessive===true||envelope.sentenceAntecessive===true
        ||[envelope.introductoryParticle,envelope.introductoryModifier,envelope.prefaceParticle].some(v=>v&&v!=="none")||envelope.outsidePrefixes?.length
        ||getClassicalNahuatlVncApplicationPresentFields(envelope,CLASSICAL_NAHUATL_VNC_APPLICATION_CALLER_AUTHORITY_FIELDS).length
        ||getClassicalNahuatlVncApplicationCurriculumCarrierFields(envelope).length)) reason="imperfective-vnc-envelope-outside-admitted-context";
      if(!reason&&!required.length
        &&(!classIndependentTenses.includes(effective.tense)
          ||transitive&&!fixedObjectSelection&&!effective.objectSelection.startsWith("specific-projective:")
            &&!(source.sourceAnalysis.classIndependentObjectKinds||[]).includes(effective.objectSelection.split(":")[0]))
        &&!getImperfectiveAttestedFiniteCell(source,effective))reason="imperfective-vnc-attested-finite-cell-context-required";
      let finite=null,participant=null,transitiveMachinery=null,objects=Object.freeze([]);
      if(!reason&&!required.length){
        const match=/^(1|2|3)(sg|pl|common)$/u.exec(effective.subject);
        participant=buildClassicalNahuatlParticipantFrame({role:"subject",agreement:effective.subject,animacy:effective.subjectAnimacy,humanness:effective.subjectHumanness,
          number:match[2]==="common"?"common":match[2]==="pl"?"plural":"singular",hasReferent:!inherent,
          ...(source.sourceValence==="mainline-reflexive"?{referenceId:"finite-reflexive-subject"}:{})});
        if(transitive){
          const [objectKind,selectedObjectPerson]=effective.objectSelection.split(":");
          const objectPerson=objectKind==="reflexive"?participant.morphologicalAgreement:selectedObjectPerson;
          const defaultObject={objectId:"source-object-1",objectKind,objectPerson,governor:"directive",derivationalLevel:1,
            ...(objectKind==="reflexive"?{participantFrame:participant,referenceId:participant.referenceId}:{}),
            ...(objectPerson==="3common"?{person:"3",animacy:"nonanimate",humanness:"nonhuman",number:"common"}:{})};
          const object=normalizeClassicalNahuatlVncApplicationObjectRequest(defaultObject);objects=Object.freeze([object]);
          reason=getClassicalNahuatlVncApplicationSpecificCoreferenceBlockReason({subject:participant.morphologicalAgreement,derivationType:"direct",objectRequests:objects});
          if(!reason){
            transitiveMachinery=buildImperfectiveTransitiveMachinery(source,participant,object,effective);
            if(!transitiveMachinery)reason="imperfective-vnc-issued-transitive-machinery-required";
          }
        }else{
        finite=r.buildClassicalNahuatlFiniteVncResult(source.sourceStem,{subject:participant.morphologicalAgreement,mood:selections.mood,tense:selections.tense});
        if(inherent)finite.vncSlotFrame.slots.subject.participantFrame=participant;
        // Freeze the genuine issued slot in place. Its finite-source receipt
        // remains exact; semantic participant context is carried separately.
        deepFreezeClassicalNahuatlVncApplicationValue(finite.vncSlotFrame);
        imperfectiveFiniteResults.set(finite,Object.freeze({source,finiteSource:finite.source,slot:finite.vncSlotFrame,participant}));
        if(!isClassicalNahuatlImperfectiveVncFiniteResult(finite))reason="imperfective-vnc-issued-finite-required";
        }
      }
      const status=reason?"rejected":required.length?"choices-required":"ready";
      const frame=Object.freeze({kind:CLASSICAL_NAHUATL_VNC_TYPED_SOURCE_APPLICATION_BINDING_FRAME_KIND,version:1,operationId:"vnc:application",bindingStatus:status,authorizationStatus:reason?"blocked":"authorized",
        blockReason:reason||(required.length?"imperfective-vnc-explicit-finite-context-required":""),exactSourceMachineryFrame:source,inputSourceMachineryFrame:source,callerSelections:caller,effectiveSelections:effective,
        requiredChoiceIds:Object.freeze(reason?[]:required),choiceOptionProjection:Object.freeze(projection),executionArgs:Object.freeze(status==="ready"?[source,effective]:[]),
        ownerChoicesRequired:status==="choices-required",ownerInputAcceptanceProven:true,ownerRejectionProven:false,exactSourceIdentityPreserved:true,ownerExecutionStillRequired:status==="ready",grammarAuthority:false});
      imperfectiveBindings.set(frame,Object.freeze({source,effective,finite,participant,transitiveMachinery,objects,inherent}));return frame;
    }
    function isImperfectiveVncBinding(frame){const c=frame&&imperfectiveBindings.get(frame);return Boolean(c&&Object.isFrozen(frame)&&isClassicalNahuatlImperfectiveVncSourceFrame(c.source)
      &&frame.exactSourceMachineryFrame===c.source&&frame.effectiveSelections===c.effective&&(frame.bindingStatus!=="ready"||(c.source.sourceValence==="intransitive"?isClassicalNahuatlImperfectiveVncFiniteResult(c.finite):isClassicalNahuatlImperfectiveTransitiveVncMachineryFrame(c.transitiveMachinery))));}
    function buildImperfectiveVncApplication(binding){
      const c=imperfectiveBindings.get(binding),r=getClassicalNahuatlVncApplicationRuntimeTarget(),finite=c.finite,machinery=c.transitiveMachinery||finite,typed=c.transitiveMachinery?.finalTypedVncSlotFrame||finite.vncSlotFrame;
      const surface=r.buildClassicalNahuatlVncFiniteSurfaceFrame(machinery);if(!r.isClassicalNahuatlVncFiniteSurfaceFrame(surface))return null;
      const participant=c.participant,sourceParticipant=c.inherent?null:participant,sourceVoice=c.inherent?"impersonal":"active",objects=c.objects,objectParticipants=Object.freeze(objects.map(object=>object.participantFrame));
      const custody=finite?{canonicalFiniteVncResult:finite}:{canonicalTransitiveVncObjectFrame:machinery.canonicalTransitiveVncObjectFrame,transitiveMachineryFrame:machinery,originalTypedVncSlotFrame:machinery.originalTypedVncSlotFrame,finalBoundaryRealizationFrame:machinery.finalBoundaryRealizationFrame};
      const normalized=Object.freeze({kind:"classical-nahuatl-vnc-application-request",sourceStem:c.source.sourceStem,sourceValence:c.source.sourceValence,verbClass:"",perfectiveClassStatus:"unresolved",
        ...(c.source.sourceAnalysis.sourcePrefixAnalysis?{lexicalVerbstem:c.source.sourceAnalysis.lexicalVerbstem,sourcePrefixAnalysis:c.source.sourceAnalysis.sourcePrefixAnalysis}:{}),
        subject:c.effective.subject,subjectFrame:participant,sourceSubject:c.inherent?"":participant.morphologicalAgreement,sourceSubjectFrame:sourceParticipant,
        sourceSubjectPerson:participant.person,sourceSubjectAnimacy:participant.animacy,sourceSubjectHumanness:participant.humanness,sourceSubjectNumber:participant.number,sourceObjectRequests:objects,
        ...(objects.length?{objectKind:objects[0].objectKind,objectPerson:objects[0].objectPerson}:{}),
        voice:sourceVoice,sourceVoice,targetVoiceOperation:sourceVoice,derivationType:"direct",...(c.inherent?{inherentImpersonal:true}:{}),mood:c.effective.mood,tense:c.effective.tense,sentenceOptions:Object.freeze({...c.effective.sentenceOptions})});
      const result=Object.freeze({kind:"classical-nahuatl-vnc-application-result-frame",version:CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,authorizationStatus:"authorized",blockReason:"",
        canonicalImperfectiveSourceFrame:c.source,...custody,sourceMachineryFrame:c.source,selectedMachineryFrame:machinery,finalTypedVncSlotFrame:typed,
        selectedSourceVoice:sourceVoice,selectedVoice:sourceVoice,selectedVoiceOperation:sourceVoice,selectedDerivation:"direct",subjectParticipantFrame:participant,
        participantProjection:Object.freeze({sourceSubject:sourceParticipant,targetSubject:participant,sourceObjects:objectParticipants,targetObjects:objectParticipants}),finiteSurfaceFrame:surface,
        formulaRealization:surface.formulaRealization,surfaceRealization:surface.wordRealization,wordSurface:surface.wordRealization,typedFrameAuthority:true,callerSuppliedAuthorityAccepted:false,formulaStringAuthority:false,surfaceStringAuthority:false});
      const app=finalizeBuiltClassicalNahuatlVncApplicationFrame({kind:"classical-nahuatl-vnc-application-frame",version:CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,authorizationStatus:"authorized",blockReason:"",normalizedRequest:normalized,resultFrame:result,
        canonicalImperfectiveSourceFrame:c.source,controlFrame:Object.freeze({authorizationStatus:"authorized",selectedSourceVoice:sourceVoice,selectedVoice:sourceVoice,selectedVoiceOperation:sourceVoice,derivationType:"direct"}),
        formulaRealization:surface.formulaRealization,surfaceRealization:surface.wordRealization,typedFrameAuthority:true,callerSuppliedAuthorityAccepted:false,formulaStringAuthority:false,surfaceStringAuthority:false});
      const projection=Object.freeze({kind:"classical-nahuatl-vnc-continuation-source-constituents",authorizationStatus:"authorized",canonicalSourceFrame:c.source,canonicalImperfectiveSourceFrame:c.source,
        canonicalResultFrame:result,canonicalApplicationFrame:app,...custody,sourceStem:c.source.sourceStem,sourceIdentityStem:c.source.sourceStem,verbClass:"",perfectiveClassStatus:"unresolved",
        ...(c.source.sourceAnalysis.sourcePrefixAnalysis?{lexicalVerbstem:c.source.sourceAnalysis.lexicalVerbstem,sourcePrefixAnalysis:c.source.sourceAnalysis.sourcePrefixAnalysis}:{}),
        sourceValence:c.source.sourceValence,sourceVoice,sourceSubject:c.inherent?"3sg":c.effective.subject,sourceSubjectFrame:participant,
        ...(c.inherent?{inherentImpersonal:true,sourceActorAsserted:false}:{}),sourceSubjectPerson:participant.person,sourceSubjectAnimacy:participant.animacy,sourceSubjectHumanness:participant.humanness,
        sourceSubjectNumber:participant.number,sourceObjectRequests:objects,callerSuppliedAuthorityAccepted:false,grammarAuthority:false});
      const context=Object.freeze({...c,app,result,typed,surface,projection,coordinate:finite?.source||Object.freeze({subject:participant.morphologicalAgreement,mood:c.effective.mood,tense:c.effective.tense})});
      imperfectiveApplications.set(app,context);imperfectiveApplications.set(result,context);classicalNahuatlVncApplicationFrameByResultFrame.set(result,app);return app;
    }
    function isClassicalNahuatlImperfectiveVncApplicationFrame(frame=null){const c=frame&&imperfectiveApplications.get(frame);return Boolean(c&&Object.isFrozen(frame)
      &&(c.source.sourceValence==="intransitive"?isClassicalNahuatlImperfectiveVncFiniteResult(c.finite)&&c.result.canonicalFiniteVncResult===c.finite:isClassicalNahuatlImperfectiveTransitiveVncMachineryFrame(c.transitiveMachinery)&&c.result.transitiveMachineryFrame===c.transitiveMachinery)
      &&c.app.resultFrame===c.result&&c.result.sourceMachineryFrame===c.source&&c.result.finalTypedVncSlotFrame===c.typed&&c.result.subjectParticipantFrame===c.participant);}
    function getImperfectiveVncContext(frame){const nucleus=isClassicalNahuatlVncSentenceResultFrame(frame)?frame.canonicalResultFrame:frame;return isClassicalNahuatlImperfectiveVncApplicationFrame(nucleus)?imperfectiveApplications.get(nucleus):null;}
    function getClassicalNahuatlImperfectiveVncReloadInputs(frame) {
      const c=getImperfectiveVncContext(frame);
      return c && (frame===c.app || frame===c.result) ? Object.freeze({source:c.source,selections:c.effective,projection:frame===c.result?'nucleus':'application'}) : null;
    }
    const preformedVncSources = new WeakMap();
    const preformedVncSourceContexts = new WeakMap();
    const preformedVncBindings = new WeakMap();
    const preformedVncApplications = new WeakMap();
    function resolveClassicalNahuatlPreformedVncSourceFrame(request = {}) {
      if (!request || typeof request !== "object" || Object.keys(request).some(k=>!["enteredStem","valence"].includes(k))) return null;
      const r=getClassicalNahuatlVncApplicationRuntimeTarget();
      const record=r.resolveClassicalNahuatlCanonicalSourceStemRecord?.({enteredStem:request.enteredStem,basalUnit:"vnc",valence:request.valence});
      const analysis=record?.canonicalPreformedDerivation;
      if (r.isClassicalNahuatlCanonicalSourceStemRecord?.(record)!==true || !analysis) return null;
      if (preformedVncSources.has(record)) return preformedVncSources.get(record);
      const source=Object.freeze({kind:"classical-nahuatl-preformed-vnc-source-frame",sourceStem:record.stem,
        sourceValence:record.defaultSourceValence,canonicalSourceStemRecord:record,formationAnalysis:analysis,
        sourceRank:"preformed-verbstem",grammarAuthority:false,formulaStringAuthority:false,surfaceStringAuthority:false});
      preformedVncSources.set(record,source);preformedVncSourceContexts.set(source,Object.freeze({record,analysis}));return source;
    }
    function isClassicalNahuatlPreformedVncSourceFrame(source = null) {
      const c=source && preformedVncSourceContexts.get(source),r=getClassicalNahuatlVncApplicationRuntimeTarget();
      return Boolean(c && Object.isFrozen(source) && r.isClassicalNahuatlCanonicalSourceStemRecord(c.record)
        && c.record.canonicalPreformedDerivation===c.analysis && source.canonicalSourceStemRecord===c.record
        && source.formationAnalysis===c.analysis && source.sourceStem===c.record.stem);
    }
    function buildPreformedVncClosure(source,selections) {
      if (!isClassicalNahuatlPreformedVncSourceFrame(source)) return null;
      const r=getClassicalNahuatlVncApplicationRuntimeTarget(),a=source.formationAnalysis;
      const agreement=/^(1|2|3)(sg|pl|common)$/u.exec(selections.subject || "");
      const subject=buildClassicalNahuatlParticipantFrame({role:"subject",agreement:selections.subject,
        animacy:selections.subjectAnimacy,humanness:selections.subjectHumanness,
        number:agreement?.[2]==="common"?"common":agreement?.[2]==="pl"?"plural":"singular",hasReferent:true});
      const plan=r.buildClassicalNahuatlIrregularVncParadigmPlan(a.baseStem,{subject:subject.morphologicalAgreement,
        mood:selections.mood,tense:selections.tense,requestedSemanticTense:selections.tense});
      if (plan?.authorizationStatus!=="authorized" || !plan.applies || !plan.selectedClassOverride) return null;
      const closure=r.evaluateClassicalNahuatlLateVncDerivation({ ...selections.sentenceOptions,
        sourceStem:a.baseStem,verbClass:plan.selectedClassOverride,sourceValence:source.sourceValence,
        subject:subject.morphologicalAgreement,sourceSubject:selections.subject,sourceSubjectNumber:subject.number,
        sourceSubjectAnimacy:selections.subjectAnimacy,sourceSubjectHumanness:selections.subjectHumanness,
        subjectAnimacy:selections.subjectAnimacy,subjectHumanness:selections.subjectHumanness,
        objectKind:"none",requestedVoice:"active",requestedDerivation:"direct",mood:selections.mood,tense:selections.tense,
        lateOperation:a.operation,lateVariant:a.variant,frequentativeTarget:a.target,frequentativeRepetitions:a.repetitions});
      return r.isClassicalNahuatlClosureFrame?.(closure)===true && closure.authorizationStatus==="authorized"
        && closure.operationFrame?.targetStem===source.sourceStem
        && closure.operationFrame?.operationFacts?.irregularCoordinateInherited===true ? closure : null;
    }
    function issuePreformedVncBinding(source,selections = {}) {
      const allowed=["subject","subjectAnimacy","subjectHumanness","mood","tense","requestedVoice","requestedDerivation","sentenceOptions"];
      const caller=deepFreezeClassicalNahuatlVncApplicationValue(cloneClassicalNahuatlVncApplicationCompactValue(selections || {}));
      const required=["subject","subjectAnimacy","subjectHumanness","mood","tense"].filter(k=>typeof selections?.[k]!=="string" || !selections[k]);
      const effective=Object.freeze({requestedVoice:"active",requestedDerivation:"direct",...selections,
        ...(selections.sentenceOptions?{sentenceOptions:deepFreezeClassicalNahuatlVncApplicationValue(cloneClassicalNahuatlVncApplicationCompactValue(selections.sentenceOptions))}:{})});
      let reason=!selections || typeof selections!=="object" || Array.isArray(selections) || Object.keys(selections).some(k=>!allowed.includes(k))
        || (Object.hasOwn(selections,"sentenceOptions") && (!selections.sentenceOptions || typeof selections.sentenceOptions!=="object" || Array.isArray(selections.sentenceOptions)))
        || getClassicalNahuatlVncApplicationPresentFields(selections.sentenceOptions,CLASSICAL_NAHUATL_VNC_APPLICATION_CALLER_AUTHORITY_FIELDS).length
        || getClassicalNahuatlVncApplicationCurriculumCarrierFields(selections.sentenceOptions).length
        ? "preformed-vnc-selection-not-supported"
        : effective.requestedVoice!=="active" || effective.requestedDerivation!=="direct" ? "preformed-vnc-personal-active-source-required" : "";
      const closure=!reason && !required.length ? buildPreformedVncClosure(source,effective) : null;
      if (!reason && !required.length && !closure) reason="preformed-vnc-exact-inherited-coordinate-required";
      let status=reason?"rejected":required.length?"choices-required":"ready";
      const projection={},r=getClassicalNahuatlVncApplicationRuntimeTarget();
      const base=source.formationAnalysis.baseStem;
      const keepsMember=(subject,mood,tense)=>{
        const plan=r.buildClassicalNahuatlIrregularVncParadigmPlan(base,{subject,mood,tense});
        return plan.authorizationStatus==="authorized" && plan.applies && plan.selectedStemOverride===base;
      };
      const subjects=["1sg","2sg","3sg","1pl","2pl","3pl","3common"].filter(subject=>keepsMember(subject==="3common"?"3sg":subject,"indicative","present"));
      const moods=["indicative","optative","admonitive"].filter(mood=>keepsMember("3sg",mood,"present"));
      const sourcePlan=r.buildClassicalNahuatlIrregularVncParadigmPlan(base,{subject:"3sg",mood:"indicative",tense:"present"});
      const tenses=(sourcePlan.allowedSemanticTenses || []).filter(tense=>keepsMember("3sg","indicative",tense));
      for(const [id,values] of Object.entries({subject:subjects,subjectAnimacy:["animate","nonanimate"],subjectHumanness:["human","nonhuman","unspecified"],mood:moods,tense:tenses}))
        projection[id]=Object.freeze(values.map(optionId=>Object.freeze({choiceId:id,optionId,label:optionId,availabilityStatus:"available",ownerOptionProjected:true,grammarAuthority:false})));
      if (!reason && Object.entries(projection).some(([id,options])=>Object.hasOwn(selections,id) && !options.some(option=>option.optionId===selections[id]))) {
        reason="preformed-vnc-selection-not-supported";status="rejected";
      }
      const frame=Object.freeze({kind:CLASSICAL_NAHUATL_VNC_TYPED_SOURCE_APPLICATION_BINDING_FRAME_KIND,version:1,operationId:"vnc:application",
        authorizationStatus:reason?"blocked":"authorized",bindingStatus:status,blockReason:reason || (required.length?"preformed-vnc-finite-context-required":""),
        exactSourceMachineryFrame:source,inputSourceMachineryFrame:source,callerSelections:caller,effectiveSelections:effective,
        requiredChoiceIds:Object.freeze(reason?[]:required),choiceOptionProjection:Object.freeze(projection),executionArgs:Object.freeze(status==="ready"?[source,effective]:[]),
        ownerChoicesRequired:status==="choices-required",ownerInputAcceptanceProven:true,ownerRejectionProven:false,exactSourceIdentityPreserved:true,
        ownerExecutionStillRequired:status==="ready",grammarAuthority:false,sourceStringAuthority:false,formulaStringAuthority:false,surfaceStringAuthority:false});
      preformedVncBindings.set(frame,Object.freeze({source,effective,closure}));return frame;
    }
    function isPreformedVncBinding(frame) {
      const c=frame && preformedVncBindings.get(frame),r=getClassicalNahuatlVncApplicationRuntimeTarget();
      return Boolean(c && Object.isFrozen(frame) && isClassicalNahuatlPreformedVncSourceFrame(c.source)
        && frame.exactSourceMachineryFrame===c.source && frame.effectiveSelections===c.effective
        && (frame.bindingStatus!=="ready" || r.isClassicalNahuatlClosureFrame(c.closure)));
    }
    function buildPreformedVncApplication(binding) {
      const c=preformedVncBindings.get(binding),r=getClassicalNahuatlVncApplicationRuntimeTarget(),closure=c.closure;
      const machinery=closure.selectedMachineryFrame,surface=closure.finiteSurfaceFrame;
      const participant=closure.baseApplicationFrame.normalizedRequest.sourceSubjectFrame;
      // Finite morphology owns the formal agreement; the admitted personal
      // context owns its semantic axes. Preserve both without recasting common
      // reference as a different singular actor.
      const typedValue=cloneClassicalNahuatlVncApplicationCompactValue(closure.finalTypedVncSlotFrame);
      typedValue.slots.subject.participantFrame=participant;
      typedValue.slots.subject.subjectCategory=participant.category;
      const typed=deepFreezeClassicalNahuatlVncApplicationValue(typedValue);
      const normalized=Object.freeze({...closure.baseApplicationFrame.normalizedRequest,sourceStem:c.source.sourceStem,
        sourceValence:c.source.sourceValence,subject:c.effective.subject,subjectFrame:participant,
        sentenceOptions:Object.freeze({...c.effective.sentenceOptions})});
      const result=Object.freeze({kind:"classical-nahuatl-vnc-application-result-frame",version:CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,
        authorizationStatus:"authorized",blockReason:"",canonicalPreformedSourceFrame:c.source,preformedClosureFrame:closure,
        sourceMachineryFrame:c.source,selectedMachineryFrame:machinery,selectedSourceVoice:"active",selectedVoice:"active",selectedVoiceOperation:"active",selectedDerivation:"direct",
        finalTypedVncSlotFrame:typed,finiteSurfaceFrame:surface,formulaRealization:surface.formulaRealization,surfaceRealization:surface.wordRealization,
        wordSurface:surface.wordRealization,participantProjection:Object.freeze({sourceSubject:participant,targetSubject:participant,sourceObjects:Object.freeze([]),targetObjects:Object.freeze([])}),
        typedFrameAuthority:true,callerSuppliedAuthorityAccepted:false,formulaStringAuthority:false,surfaceStringAuthority:false});
      const app=finalizeBuiltClassicalNahuatlVncApplicationFrame({kind:"classical-nahuatl-vnc-application-frame",version:CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,
        authorizationStatus:"authorized",blockReason:"",normalizedRequest:normalized,resultFrame:result,canonicalPreformedSourceFrame:c.source,
        controlFrame:Object.freeze({authorizationStatus:"authorized",selectedSourceVoice:"active",selectedVoice:"active",selectedVoiceOperation:"active",derivationType:"direct"}),
        formulaRealization:surface.formulaRealization,surfaceRealization:surface.wordRealization,typedFrameAuthority:true,callerSuppliedAuthorityAccepted:false,formulaStringAuthority:false,surfaceStringAuthority:false});
      const projection=Object.freeze({kind:"classical-nahuatl-vnc-continuation-source-constituents",authorizationStatus:"authorized",canonicalSourceFrame:c.source,
        canonicalPreformedSourceFrame:c.source,canonicalResultFrame:result,canonicalApplicationFrame:app,sourceStem:c.source.sourceStem,sourceIdentityStem:c.source.sourceStem,
        sourceConstituents:Object.freeze([closure.operationFrame.operationFacts.copiedPrefix,c.source.formationAnalysis.baseStem]),sourceVoice:"active",verbClass:closure.operationFrame.targetClass,
        sourceValence:c.source.sourceValence,sourceSubject:c.effective.subject,sourceSubjectFrame:participant,
        sourceSubjectPerson:participant.person,sourceSubjectAnimacy:participant.animacy,sourceSubjectHumanness:participant.humanness,sourceSubjectNumber:participant.number,
        sourceObjectRequests:Object.freeze([]),grammarAuthority:false,formulaStringAuthority:false,surfaceStringAuthority:false});
      const context=Object.freeze({source:c.source,closure,machinery,typed,participant,result,app,projection});
      preformedVncApplications.set(app,context);preformedVncApplications.set(result,context);
      classicalNahuatlVncApplicationFrameByResultFrame.set(result,app);return app;
    }
    function isPreformedVncApplication(frame) {
      const c=frame && preformedVncApplications.get(frame),r=getClassicalNahuatlVncApplicationRuntimeTarget();
      return Boolean(c && Object.isFrozen(frame) && isClassicalNahuatlPreformedVncSourceFrame(c.source)
        && r.isClassicalNahuatlClosureFrame(c.closure) && c.result.preformedClosureFrame===c.closure
        && c.app.resultFrame===c.result && c.result.sourceMachineryFrame===c.source && c.result.selectedMachineryFrame===c.machinery
        && c.result.finalTypedVncSlotFrame===c.typed && c.typed.slots.subject.participantFrame===c.participant);
    }
    const nonactiveCarrierBindings = new WeakMap();
    const nonactiveCarrierApplications = new WeakMap();
    const nonactiveCarrierSources = new WeakMap();
    function resolveClassicalNahuatlNonactiveCarrierSourceFrame(request = {}) {
      if (!request || typeof request !== "object" || Object.keys(request).some(key=>!["enteredStem","valence"].includes(key))) return null;
      const r = getClassicalNahuatlVncApplicationRuntimeTarget();
      const lexical = r.resolveClassicalNahuatlCanonicalSourceStemRecord?.({enteredStem:request.enteredStem,basalUnit:"vnc",valence:request.valence});
      const analysis = lexical?.canonicalNonactiveDerivation;
      if (!analysis || r.isClassicalNahuatlCanonicalSourceStemRecord?.(lexical) !== true) return null;
      const prior = nonactiveCarrierSources.get(lexical);
      if (r.isClassicalNahuatlNonactiveCarrierSourceFrame?.(prior) === true) return prior;
      const record = r.deriveClassicalNahuatlNonactiveStemRecord(analysis.sourceStem,{sourceValence:analysis.sourceValence,optionId:analysis.optionId});
      if (r.isClassicalNahuatlNonactiveCarrierSourceFrame?.(record) !== true || record.nonactiveStem !== lexical.stem) return null;
      nonactiveCarrierSources.set(lexical,record);return record;
    }
    function issueNonactiveCarrierBinding(source, selections = {}) {
      const r = getClassicalNahuatlVncApplicationRuntimeTarget();
      const allowed = new Set(["subject","subjectAnimacy","subjectHumanness","patientReferenceId","mood","tense","requestedVoice","requestedDerivation","sentenceOptions"]);
      const unsupported = Object.keys(selections).filter(key=>!allowed.has(key));
      const projection = {};
      const moods = ["indicative","optative","admonitive"];
      const tenses = (selections.mood
        ? r.getClassicalNahuatlVncParadigmTensesForMood(selections.mood)
        : [...new Set(moods.flatMap(mood=>r.getClassicalNahuatlVncParadigmTensesForMood(mood)))])
        .filter(tense=>!["preterit-as-present","distant-past-as-past"].includes(tense));
      for (const [id,values] of Object.entries({subject:["1sg","2sg","3sg","1pl","2pl","3pl","3common"],subjectAnimacy:["animate","nonanimate"],subjectHumanness:["human","nonhuman"],mood:moods,tense:tenses}))
        projection[id]=Object.freeze(values.map(optionId=>Object.freeze({choiceId:id,optionId,label:optionId,availabilityStatus:"available",ownerOptionProjected:true,ownerOptionAuthority:false,grammarAuthority:false})));
      projection.patientReferenceId=Object.freeze([Object.freeze({choiceId:"patientReferenceId",optionId:"text",label:"Patient",inputKind:"text",availabilityStatus:"available",ownerOptionProjected:true,ownerOptionAuthority:false,grammarAuthority:false})]);
      const required = ["subject","subjectAnimacy","subjectHumanness","patientReferenceId","mood","tense"].filter(key=>typeof selections[key] !== "string" || !selections[key].trim());
      const effective = Object.freeze({requestedDerivation:"direct",requestedVoice:"passive",...selections});
      let reason = unsupported.length ? "nonactive-carrier-finite-selection-not-recognized"
        : effective.requestedVoice !== "passive" || effective.requestedDerivation !== "direct" ? "nonactive-carrier-personal-passive-required" : "";
      if (!reason && selections.mood && selections.tense
        && (r.validateClassicalNahuatlVncSemanticSelection({mood:selections.mood,tense:selections.tense}).authorizationStatus !== "authorized"
          || !tenses.includes(selections.tense)))
        reason = "nonactive-carrier-mood-tense-not-authorized";
      const finite = !reason && !required.length ? r.buildClassicalNahuatlNonactiveCarrierFiniteFrame(source,effective) : null;
      if (finite && r.isClassicalNahuatlNonactiveCarrierFiniteFrame(finite) !== true) reason=finite.blockReason;
      const status=reason?"rejected":required.length?"choices-required":"ready";
      const frame=Object.freeze({kind:CLASSICAL_NAHUATL_VNC_TYPED_SOURCE_APPLICATION_BINDING_FRAME_KIND,version:1,
        operationId:"vnc:application",authorizationStatus:status==="rejected"?"blocked":"authorized",bindingStatus:status,
        blockReason:reason || (required.length?"explicit-specific-passive-patient-and-finite-context-required":""),
        exactSourceMachineryFrame:source,inputSourceMachineryFrame:source,callerSelections:Object.freeze({...selections}),effectiveSelections:effective,
        requiredChoiceIds:Object.freeze(reason?[]:required),choiceOptionProjection:Object.freeze(projection),executionArgs:Object.freeze(status==="ready"?[source,effective]:[]),
        ownerChoicesRequired:status==="choices-required",ownerInputAcceptanceProven:true,ownerRejectionProven:false,exactSourceIdentityPreserved:true,
        ownerExecutionStillRequired:status==="ready",sourceStringAuthority:false,formulaStringAuthority:false,surfaceStringAuthority:false,lessonMetadataAuthority:false,storedStateAuthority:false,grammarAuthority:false});
      nonactiveCarrierBindings.set(frame,Object.freeze({source,effective,finite}));return frame;
    }
    function isNonactiveCarrierBinding(frame) {
      const c=frame && nonactiveCarrierBindings.get(frame),r=getClassicalNahuatlVncApplicationRuntimeTarget();
      return Boolean(c && r.isClassicalNahuatlNonactiveCarrierSourceFrame(c.source) && frame.exactSourceMachineryFrame===c.source
        && frame.effectiveSelections===c.effective && Object.isFrozen(frame)
        && (frame.bindingStatus!=="ready" || r.isClassicalNahuatlNonactiveCarrierFiniteFrame(c.finite)));
    }
    function buildNonactiveCarrierApplication(binding) {
      const c=nonactiveCarrierBindings.get(binding),r=getClassicalNahuatlVncApplicationRuntimeTarget();
      const machinery=c.finite,typed=getClassicalNahuatlVncApplicationFinalTypedFrame(machinery);
      const surface=r.buildClassicalNahuatlVncFiniteSurfaceFrame(machinery);
      if (r.isClassicalNahuatlVncFiniteSurfaceFrame(surface)!==true) return null;
      const patient=machinery.subjectParticipantFrame;
      const normalized=Object.freeze({kind:"classical-nahuatl-vnc-application-request",sourceStem:c.source.nonactiveStem,verbClass:"A",targetClass:c.source.targetClass,
        sourceValence:"intransitive",sourceVoice:"passive",sourceSubject:"",sourceObjectRequests:Object.freeze([]),
        subject:patient.morphologicalAgreement,subjectFrame:patient,subjectPerson:patient.person,subjectAnimacy:patient.animacy,subjectHumanness:patient.humanness,subjectNumber:patient.number,
        voice:"passive",targetVoiceOperation:"passive",derivationType:"direct",mood:c.effective.mood,tense:c.effective.tense,
        sentenceOptions:Object.freeze({...c.effective.sentenceOptions})});
      const result=Object.freeze({kind:"classical-nahuatl-vnc-application-result-frame",version:CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,
        authorizationStatus:"authorized",blockReason:"",canonicalNonactiveStemRecord:c.source,sourceMachineryFrame:c.source,
        selectedMachineryFrame:machinery,selectedSourceVoice:"passive",selectedVoice:"passive",selectedVoiceOperation:"passive",selectedDerivation:"direct",
        finalTypedVncSlotFrame:typed,finiteSurfaceFrame:surface,formulaRealization:surface.formulaRealization,surfaceRealization:surface.wordRealization,
        wordSurface:surface.wordRealization,subjectParticipantFrame:patient,participantProjection:Object.freeze({targetSubject:patient}),
        typedFrameAuthority:true,callerSuppliedAuthorityAccepted:false,formulaStringAuthority:false,surfaceStringAuthority:false});
      const app=finalizeBuiltClassicalNahuatlVncApplicationFrame({kind:"classical-nahuatl-vnc-application-frame",version:CLASSICAL_NAHUATL_VNC_APPLICATION_VERSION,
        authorizationStatus:"authorized",blockReason:"",normalizedRequest:normalized,resultFrame:result,canonicalNonactiveStemRecord:c.source,
        controlFrame:Object.freeze({authorizationStatus:"authorized",selectedSourceVoice:"passive",selectedVoice:"passive",selectedVoiceOperation:"passive",derivationType:"direct"}),
        formulaRealization:surface.formulaRealization,surfaceRealization:surface.wordRealization,typedFrameAuthority:true,callerSuppliedAuthorityAccepted:false,formulaStringAuthority:false,surfaceStringAuthority:false});
      const projection=Object.freeze({kind:"classical-nahuatl-vnc-continuation-source-constituents",authorizationStatus:"authorized",
        canonicalSourceFrame:c.source,canonicalNonactiveStemRecord:c.source,canonicalResultFrame:result,
        sourceStem:c.source.nonactiveStem,sourceIdentityStem:c.source.nonactiveStem,activeSourceStem:c.source.sourceStem,
        sourceConstituents:Object.freeze([c.source.sourceStem,c.source.suffixFamily]),sourceVoice:"passive",verbClass:"A",targetClass:c.source.targetClass,
        sourceValence:"intransitive",sourceSubject:patient.morphologicalAgreement,sourceSubjectFrame:patient,
        sourceSubjectPerson:patient.person,sourceSubjectAnimacy:patient.animacy,sourceSubjectHumanness:patient.humanness,sourceSubjectNumber:patient.number,
        sourceObjectRequests:Object.freeze([]),patientReferenceId:patient.referenceId,sourceSubjectDeleted:true,
        grammarAuthority:false,formulaStringAuthority:false,surfaceStringAuthority:false});
      const context=Object.freeze({source:c.source,machinery,typed,patient,result,app,surface,projection});
      nonactiveCarrierApplications.set(app,context);nonactiveCarrierApplications.set(result,context);
      classicalNahuatlVncApplicationFrameByResultFrame.set(result,app);return app;
    }
    function isNonactiveCarrierApplication(frame) {
      const c=frame && nonactiveCarrierApplications.get(frame),r=getClassicalNahuatlVncApplicationRuntimeTarget();
      return Boolean(c && r.isClassicalNahuatlNonactiveCarrierSourceFrame(c.source) && r.isClassicalNahuatlNonactiveCarrierFiniteFrame(c.machinery)
        && c.app.resultFrame===c.result && c.result.sourceMachineryFrame===c.source && c.result.selectedMachineryFrame===c.machinery
        && c.result.finalTypedVncSlotFrame===c.typed && c.typed.slots.subject.participantFrame===c.patient && Object.isFrozen(frame));
    }
    function issueClassicalNahuatlVncTypedSourceApplicationBindingFrame(
      exactSourceMachineryFrame = null,
      callerSelections = {},
    ) {
      if (getClassicalNahuatlVncApplicationRuntimeTarget()?.isClassicalNahuatlRestrictedContainingVncSourceFrame?.(exactSourceMachineryFrame)===true) return issueRestrictedContainingBinding(exactSourceMachineryFrame,callerSelections);
      if (getClassicalNahuatlVncApplicationRuntimeTarget()?.isClassicalNahuatlAnalyticalVncSourceFrame?.(exactSourceMachineryFrame)===true) return issueAnalyticalVncBinding(exactSourceMachineryFrame,callerSelections);
      if (isClassicalNahuatlImperfectiveVncSourceFrame(exactSourceMachineryFrame)) return callerSelections?.requestedDerivation==="causative" && isAnalyticalVncOperand(exactSourceMachineryFrame)
        ? issueAnalyticalVncBinding(exactSourceMachineryFrame,callerSelections) : issueImperfectiveVncBinding(exactSourceMachineryFrame,callerSelections);
      if (isClassicalNahuatlPreformedVncSourceFrame(exactSourceMachineryFrame)) return issuePreformedVncBinding(exactSourceMachineryFrame,callerSelections);
      if (getClassicalNahuatlVncApplicationRuntimeTarget()?.isClassicalNahuatlNonactiveCarrierSourceFrame?.(exactSourceMachineryFrame) === true)
        return issueNonactiveCarrierBinding(exactSourceMachineryFrame,callerSelections);
      const provenance = exactSourceMachineryFrame
        && typeof exactSourceMachineryFrame === "object"
        ? classicalNahuatlVncTypedSourceApplicationProvenanceBySource.get(
          exactSourceMachineryFrame,
        ) || null
        : null;
      const selections = callerSelections
        && typeof callerSelections === "object"
        && !Array.isArray(callerSelections)
        ? callerSelections
        : null;
      const rejectedAuthorityFields = selections
        ? Object.freeze(Array.from(new Set([
          ...getClassicalNahuatlVncApplicationPresentFields(
            selections,
            CLASSICAL_NAHUATL_VNC_APPLICATION_CALLER_AUTHORITY_FIELDS,
          ),
          ...getClassicalNahuatlVncApplicationCurriculumCarrierFields(
            selections,
          ),
          ...getClassicalNahuatlVncApplicationPresentFields(
            selections.sentenceOptions,
            CLASSICAL_NAHUATL_VNC_APPLICATION_CALLER_AUTHORITY_FIELDS,
          ).map(field => `sentenceOptions.${field}`),
          ...getClassicalNahuatlVncApplicationCurriculumCarrierFields(
            selections.sentenceOptions,
          ).map(field => `sentenceOptions.${field}`),
        ])))
        : Object.freeze([]);
      const sourceFieldOverride = selections
        ? CLASSICAL_NAHUATL_VNC_CONTINUATION_SOURCE_FIELDS.find(field => (
          Object.prototype.hasOwnProperty.call(selections, field)
        )) || ""
        : "";
      const unsupportedSelectionFields = selections
        ? Object.freeze(Reflect.ownKeys(selections).filter(key => (
          typeof key !== "string"
          || !CLASSICAL_NAHUATL_VNC_TYPED_SOURCE_APPLICATION_SELECTION_FIELDS
            .includes(key)
        )).map(String))
        : Object.freeze([]);
      const initialBlockReason = !provenance
        ? "classical-vnc-typed-source-application-exact-issued-source-required"
        : !selections
          ? "classical-vnc-typed-source-application-selections-must-be-an-object"
          : Object.hasOwn(selections, "sentenceOptions")
            && (!selections.sentenceOptions || typeof selections.sentenceOptions !== "object" || Array.isArray(selections.sentenceOptions))
            ? "classical-vnc-typed-source-application-sentence-options-must-be-an-object"
          : rejectedAuthorityFields.length
            ? "classical-vnc-typed-source-application-caller-authority-rejected"
            : sourceFieldOverride
              ? "classical-vnc-typed-source-application-source-provenance-is-owner-issued"
              : unsupportedSelectionFields.length
                ? "classical-vnc-typed-source-application-selection-not-supported"
                : "";
      const frozenCallerSelections = selections
        ? deepFreezeClassicalNahuatlVncApplicationValue(
          cloneClassicalNahuatlVncApplicationCompactValue(selections),
        )
        : Object.freeze({});
      // A raw preview may already issue the fused intransitive Source. Its
      // checked fusion control describes that Source; it cannot consume an
      // external tla again. Retain the authenticated fusion, while a Source
      // that still has an external object keeps its requested operation.
      const sourceFusionRule = provenance?.sourceDescriptor
        ?.formationSourceMachineryFrame?.tlaFusionRuleFrame
        || provenance?.sourceDescriptor?.formationSourceMachineryFrame
          ?.operationFrame?.operationFacts?.tlaFusionRuleFrame;
      const sourceAlreadyFused = Boolean(
        sourceFusionRule?.authorizationStatus === "authorized"
        && sourceFusionRule.fused === true
        && sourceFusionRule.derivedStem
          === provenance?.sourceDescriptor?.sourceStem
        && provenance?.sourceDescriptor?.sourceValence === "intransitive"
        && provenance?.sourceDescriptor?.sourceObjectRequests?.length === 0
      );
      let effectiveSelections = provenance && selections
        ? deepFreezeClassicalNahuatlVncApplicationValue({
          ...provenance.defaultSelections,
          ...cloneClassicalNahuatlVncApplicationCompactValue(selections),
          ...(sourceAlreadyFused && selections.tlaFusion === true
            ? { tlaFusion: false }
            : {}),
          ...(provenance.inherentImpersonalSource === true
            ? {
              requestedVoice: "impersonal",
              // Keep-stem is the default; an explicit licensed formation is
              // still a genuine choice over this exact lexical Source.
              ...(Object.hasOwn(selections, "nonactiveOptionId")
                ? {}
                : { nonactiveOptionId: "inherent-impersonal" }),
            }
            : {}),
        })
        : Object.freeze({});
      const subjectReferenceAuthoringAllowed = provenance?.rawSubjectAuthoringAllowed === true;
      const hasSubjectReferenceSelection = ["subjectAnimacy", "subjectHumanness"]
        .some(field => Object.hasOwn(selections || {}, field));
      const selectedSubjectReference = hasSubjectReferenceSelection
        ? buildClassicalNahuatlParticipantFrame({
          role: "subject", agreement: effectiveSelections.subject,
          animacy: effectiveSelections.subjectAnimacy,
          humanness: effectiveSelections.subjectHumanness,
          number: String(effectiveSelections.subject).endsWith("common") ? "common"
            : String(effectiveSelections.subject).endsWith("pl") ? "plural" : "singular",
        }) : null;
      const subjectReferenceBlockReason = hasSubjectReferenceSelection
        && (!subjectReferenceAuthoringAllowed
          || effectiveSelections.requestedDerivation !== "direct"
          || (effectiveSelections.requestedVoice || "active") !== "active"
          || !["animate", "nonanimate"].includes(effectiveSelections.subjectAnimacy)
          || !["human", "nonhuman", "unspecified"].includes(effectiveSelections.subjectHumanness)
          || !isClassicalNahuatlParticipantFrame(selectedSubjectReference)
          || ![selectedSubjectReference.category, selectedSubjectReference.morphologicalAgreement]
            .includes(effectiveSelections.subject)
          || selectedSubjectReference.animacy !== effectiveSelections.subjectAnimacy
          || selectedSubjectReference.humanness !== effectiveSelections.subjectHumanness)
        ? "classical-vnc-typed-source-authored-subject-reference-not-licensed" : "";
      let evaluationProvenance = provenance;
      let evaluationSourceMachineryFrame = exactSourceMachineryFrame;
      let preparedSourceApplicationFrame = null;
      let subjectPreparationBlockReason = subjectReferenceBlockReason;
      if (!initialBlockReason && provenance?.rawSubjectAuthoringAllowed === true
        && effectiveSelections.requestedDerivation === "applicative"
        && (effectiveSelections.requestedVoice || "active") === "active"
        && effectiveSelections.subject !== provenance.sourceDescriptor.sourceSubject) {
        // Author the current input actor first. The applicative owner still
        // preserves that real input actor; no completed Result is reinterpreted.
        const directRequest = buildClassicalNahuatlVncTypedSourceApplicationOwnerRequest(
          provenance, {
            subject: effectiveSelections.subject,
            mood: effectiveSelections.mood, tense: effectiveSelections.tense,
            requestedDerivation: "direct", requestedVoice: "active",
            sentenceOptions: effectiveSelections.sentenceOptions || {},
          },
        );
        const prepared = provenance.ownerEvaluate(directRequest);
        const preparedSource = prepared?.resultFrame?.selectedMachineryFrame;
        const preparedProvenance = preparedSource
          ? classicalNahuatlVncTypedSourceApplicationProvenanceBySource.get(preparedSource) : null;
        if (isClassicalNahuatlVncApplicationFrame(prepared)
          && prepared.authorizationStatus === "authorized"
          && prepared.resultFrame.sourceMachineryFrame === exactSourceMachineryFrame
          && prepared.normalizedRequest.subject === effectiveSelections.subject
          && prepared.normalizedRequest.derivationType === "direct"
          && getClassicalNahuatlVncApplicationRuntimeTarget()
            ?.isClassicalNahuatlVncDerivationSourceMachineryFrame?.(preparedSource) === true
          && preparedProvenance?.sourceDescriptor.sourceSubject === effectiveSelections.subject) {
          preparedSourceApplicationFrame = prepared;
          evaluationSourceMachineryFrame = preparedSource;
          evaluationProvenance = preparedProvenance;
        } else {
          subjectPreparationBlockReason = prepared?.blockReason
            || "classical-vnc-typed-source-current-subject-preparation-rejected";
        }
      }
      const derivationInventories = evaluationProvenance
        ? Object.freeze({
          causative:
            getClassicalNahuatlVncTypedSourceApplicationInventory(
              evaluationProvenance,
              "causative",
            ),
          applicative:
            getClassicalNahuatlVncTypedSourceApplicationInventory(
              evaluationProvenance,
              "applicative",
              effectiveSelections,
            ),
        })
        : Object.freeze({ causative: null, applicative: null });
      const selectedDerivation = normalizeClassicalNahuatlVncApplicationToken(
        effectiveSelections.requestedDerivation,
      ).toLowerCase();
      const inapplicableDerivationSelectionField = (() => {
        const present = (field) => (
          Object.prototype.hasOwnProperty.call(selections || {}, field)
          && selections[field] != null
          && String(selections[field]).trim() !== ""
        );
        if (selectedDerivation === "direct") {
          return [
            "derivationOptionId",
            "causativeObjectKind",
            "causativeSpecificShuntlineRealization",
            "applicativeObjectKind",
            "applicativeObjectPerson",
          ].find(present) || "";
        }
        if (selectedDerivation === "causative") {
          return [
            "applicativeObjectKind",
            "applicativeObjectPerson",
          ].find(present) || "";
        }
        if (selectedDerivation === "applicative") {
          return [
            "causativeObjectKind",
            "causativeSpecificShuntlineRealization",
          ].find(present) || "";
        }
        return "";
      })();
      let selectedInventory = derivationInventories[selectedDerivation] || null;
      let participantOperationFrame = null;
      let nonactiveOptionInventory = null;
      let allowedVoices = Object.freeze(["active"]);
      let requiredChoiceIds = [];
      let bindingStatus = initialBlockReason
        || subjectPreparationBlockReason
        || inapplicableDerivationSelectionField
        ? "rejected"
        : "choices-required";
      let blockReason = initialBlockReason
        || subjectPreparationBlockReason
        || (inapplicableDerivationSelectionField
          ? `classical-vnc-typed-source-application-inapplicable-selection:${
            inapplicableDerivationSelectionField
          }`
          : "");
      if (!initialBlockReason && !subjectPreparationBlockReason && !inapplicableDerivationSelectionField) {
        if (!selectedDerivation) {
          requiredChoiceIds.push("requestedDerivation");
          blockReason =
            "classical-vnc-typed-source-application-owner-choices-required";
        } else {
          const derivationSelection =
            validateClassicalNahuatlVncDerivationTypeSelection(
              selectedDerivation,
            );
          if (derivationSelection.authorizationStatus !== "authorized") {
            bindingStatus = "rejected";
            blockReason = derivationSelection.blockReason
              || "classical-vnc-typed-source-application-derivation-not-recognized";
          } else if (
            selectedDerivation !== "direct"
            && !selectedInventory
          ) {
            bindingStatus = "rejected";
            blockReason =
              "classical-vnc-typed-source-application-derivation-unavailable";
          } else if (
            selectedInventory?.selectionRequired === true
            && !hasClassicalNahuatlVncContinuationBindingSelection(
              effectiveSelections,
              "derivationOptionId",
            )
          ) {
            requiredChoiceIds.push("derivationOptionId");
            blockReason =
              "classical-vnc-derivation-option-selection-required";
          } else if (selectedInventory) {
            const requestedOptionId =
              normalizeClassicalNahuatlVncApplicationToken(
                effectiveSelections.derivationOptionId,
              );
            const selectedOptionId = requestedOptionId
              || selectedInventory.automaticOptionId
              || "";
            const selectedOption = selectedInventory.options.find(option => (
              option.optionId === selectedOptionId
              || option.optionAliases?.includes(selectedOptionId)
            )) || null;
            if (!selectedOption) {
              bindingStatus = "rejected";
              blockReason =
                "classical-vnc-typed-source-application-derivation-option-not-authorized";
            } else {
              const normalizedRequest =
                normalizeClassicalNahuatlVncApplicationRequest(
                  buildClassicalNahuatlVncTypedSourceApplicationOwnerRequest(
                    evaluationProvenance,
                    effectiveSelections,
                  ),
                );
              participantOperationFrame =
                deriveClassicalNahuatlVncApplicationOperationFromCanonicalInventory(
                  evaluationProvenance.ownerDependencies,
                  evaluationSourceMachineryFrame,
                  selectedInventory,
                  buildClassicalNahuatlVncApplicationDerivationOperationRequest(
                    normalizedRequest,
                  ),
                );
              const participantBlockReason =
                participantOperationFrame?.blockReason || "";
              if (
                participantBlockReason
                  === "classical-vnc-causative-causee-valence-selection-required"
              ) {
                requiredChoiceIds.push("causativeObjectKind");
                blockReason = participantBlockReason;
              } else if (
                participantBlockReason
                  === "classical-vnc-applicative-specific-object-person-required"
              ) {
                requiredChoiceIds.push("applicativeObjectPerson");
                blockReason = participantBlockReason;
              } else if (
                participantOperationFrame?.authorizationStatus !== "authorized"
              ) {
                bindingStatus = "rejected";
                blockReason = participantBlockReason
                  || "classical-vnc-typed-source-application-participant-transform-not-authorized";
              }
            }
          }
        }
      }
      const requestedVoice = normalizeClassicalNahuatlVncApplicationToken(
        effectiveSelections.requestedVoice || "active",
      ).toLowerCase();
      if (
        !initialBlockReason
        && bindingStatus !== "rejected"
        && !requiredChoiceIds.length
      ) {
        const voiceSelection = validateClassicalNahuatlVncVoiceSelection(
          requestedVoice,
          "target",
        );
        if (voiceSelection.authorizationStatus !== "authorized") {
          bindingStatus = "rejected";
          blockReason = voiceSelection.blockReason
            || "classical-vnc-typed-source-application-target-voice-not-recognized";
        } else {
          const source = provenance.sourceDescriptor;
          const targetStem = selectedDerivation === "direct"
            ? source.sourceStem
            : getClassicalNahuatlVncApplicationOperationTargetStem(
              participantOperationFrame,
            );
          const targetClass = selectedDerivation === "direct"
            ? source.verbClass
            : getClassicalNahuatlVncApplicationOperationTargetClass(
              participantOperationFrame,
              source.verbClass,
            );
          const targetObjects = selectedDerivation === "direct"
            ? source.sourceObjectRequests || []
            : getClassicalNahuatlVncApplicationOperationObjectRequests(
              participantOperationFrame,
            );
          const targetValence = selectedDerivation === "direct"
            ? source.sourceValence
            : getClassicalNahuatlVncApplicationTargetValence(
              participantOperationFrame,
              source.sourceValence,
            );
          const lesson20Inventory =
            provenance.ownerDependencies
              .getClassicalNahuatlNonactiveStemOptions(targetStem, {
                verbClass: targetClass,
                sourceValence: targetValence,
              });
          const allowedVoiceOperations =
            getClassicalNahuatlVncApplicationAllowedVoices({
              sourceStem: targetStem,
              sourceValence: targetValence,
              outputScope: "single",
              nonactiveOptionInventory: lesson20Inventory,
              objectRequests: targetObjects,
            });
          allowedVoices =
            getClassicalNahuatlVncApplicationPublicAllowedVoices(
              allowedVoiceOperations,
            );
          nonactiveOptionInventory =
            buildClassicalNahuatlVncApplicationNonactiveFormationInventory({
              publicVoice: requestedVoice,
              allowedVoiceOperations,
              lesson20OptionInventory: lesson20Inventory,
              automaticOperationId: "",
            });
          if (!allowedVoices.includes(requestedVoice)) {
            bindingStatus = "rejected";
            blockReason =
              "classical-vnc-typed-source-application-target-voice-not-authorized";
          } else if (
            requestedVoice !== "active"
            && nonactiveOptionInventory.selectionRequired === true
            && !hasClassicalNahuatlVncContinuationBindingSelection(
              effectiveSelections,
              "nonactiveOptionId",
            )
          ) {
            requiredChoiceIds.push("nonactiveOptionId");
            blockReason =
              "classical-vnc-nonactive-formation-option-selection-required";
          } else if (
            requestedVoice !== "active"
            && effectiveSelections.nonactiveOptionId
            && !nonactiveOptionInventory.options.some(option => (
              option.optionId === effectiveSelections.nonactiveOptionId
            ))
          ) {
            bindingStatus = "rejected";
            blockReason =
              "classical-vnc-typed-source-application-nonactive-option-not-authorized";
          }
        }
      }
      if (!initialBlockReason && bindingStatus !== "rejected"
        && requiredChoiceIds.length === 0
        && selectedDerivation === "direct"
        && requestedVoice === "impersonal"
        && provenance.sourceDescriptor.sourceValence === "intransitive"
        && provenance.sourceDescriptor.sourceObjectRequests?.length === 0
        && nonactiveOptionInventory?.options.some(option => (
          option.optionId === effectiveSelections.nonactiveOptionId
          && option.voiceOperation === "inherent-impersonal"
        ))) {
        const owner = provenance.ownerDependencies;
        const record = owner.buildClassicalNahuatlInherentImpersonalRecord(
          provenance.sourceDescriptor.sourceStem,
          { selectionAuthority: "andrews-lesson22-voice-selection" },
        );
        // The existing voice constructor authenticates its private record and
        // exact Source. This is preflight only: it publishes no application.
        const inherentMachinery = exactSourceMachineryFrame.voice
            === "inherent-impersonal"
          ? exactSourceMachineryFrame
          : owner.buildClassicalNahuatlDerivedVncFrame(
            exactSourceMachineryFrame, {
              voice: "inherent-impersonal",
              inherentImpersonalRecord: record,
              sourceValence: provenance.sourceDescriptor.sourceValence,
              sourceSubject: "3sg",
              mood: effectiveSelections.mood,
              tense: effectiveSelections.tense,
              verbClass: provenance.sourceDescriptor.verbClass,
              sentenceOptions: effectiveSelections.sentenceOptions || {},
            },
          );
        if (isClassicalNahuatlVncApplicationDirectInherentSubjectRole(
          inherentMachinery, provenance.sourceDescriptor.sourceStem,
        )) {
          effectiveSelections = deepFreezeClassicalNahuatlVncApplicationValue({
            ...effectiveSelections, subject: "3sg",
          });
        }
      }
      if (!initialBlockReason && bindingStatus !== "rejected"
        && selectedDerivation === "direct"
        && effectiveSelections.tlaFusion === true) {
        // Stage through the same native owner used at Make. A carrier in the
        // prior finite surface is insufficient without its exact semantic
        // external object, and an incompatible Source must refuse preflight.
        const fusionTarget = targetObject
          .buildClassicalNahuatlVncTlaFusionContinuationMachinery?.(
            exactSourceMachineryFrame, effectiveSelections,
          );
        const descriptor = getClassicalNahuatlVncApplicationCanonicalActivePredicateDescriptor(
          fusionTarget, {
            stem: provenance.sourceDescriptor.sourceStem,
            verbClass: provenance.sourceDescriptor.verbClass,
            sourceValence: provenance.sourceDescriptor.sourceValence,
            objectRequests: provenance.sourceDescriptor.sourceObjectRequests,
          },
        );
        if (!isClassicalNahuatlVncApplicationActiveFrameAuthorized(fusionTarget)
          || !normalizedFusionContinuationIsCanonical({
            sourceMachineryFrame: exactSourceMachineryFrame,
            sourceDescriptor: provenance.sourceDescriptor,
          }, effectiveSelections, fusionTarget, descriptor)) {
          bindingStatus = "rejected";
          blockReason = "classical-vnc-continuation-eligible-external-tla-required";
        }
      }
      if (!initialBlockReason && bindingStatus !== "rejected" && provenance) {
        const source = provenance.sourceDescriptor;
        const lexicalPlan = source.formationSourceMachineryFrame
          ?.lesson11ParadigmPlan;
        const fixedCell = lexicalPlan?.authorizationStatus === "authorized"
          && source.formationSourceMachineryFrame?.sourceSelectionFrame
            ?.typedSourceSelectsWholeStem === true
          ? lexicalPlan.fixedSourceCell
          : null;
        if (fixedCell) {
          // The exact Source still belongs to its lexical owner. Generic
          // recoordination cannot turn its single licensed cell productive.
          const targetPlan = targetObject.buildClassicalNahuatlIrregularVncParadigmPlan?.(
            source.sourceStem, {
              ...fixedCell,
              subject: effectiveSelections.subject,
              mood: effectiveSelections.mood,
              tense: effectiveSelections.tense,
              objectKind: source.objectKind,
              objectPerson: source.objectPerson,
              voice: requestedVoice,
            },
          );
          if ((selectedDerivation && selectedDerivation !== "direct")
            || targetPlan?.authorizationStatus !== "authorized") {
            bindingStatus = "rejected";
            requiredChoiceIds = [];
            blockReason = targetPlan?.blockReason
              || "classical-vnc-typed-source-fixed-source-cell-conflict";
          }
        }
      }
      let finiteConnectorOptions = null;
      if (provenance && !initialBlockReason && bindingStatus !== "rejected" && !requiredChoiceIds.length
        && (buildClassicalNahuatlVncApplicationSentenceOptions(effectiveSelections).finiteSingularConnector
          || effectiveSelections.mood === "indicative" && ["future", "preterit"].includes(effectiveSelections.tense)
            && !String(effectiveSelections.subject).endsWith("pl"))) {
        // A preview calls the same finite owner as Make; it never accepts a Result.
        const request = buildClassicalNahuatlVncTypedSourceApplicationOwnerRequest(evaluationProvenance, effectiveSelections);
        const preview = evaluateClassicalNahuatlVncApplication(request);
        if (preview?.authorizationStatus === "authorized") {
          finiteConnectorOptions = projectClassicalNahuatlFiniteConnectorOptions(
            isClassicalNahuatlOptionalFiniteConnectorFrame(preview.resultFrame?.finalTypedVncSlotFrame, preview.normalizedRequest));
          if (finiteConnectorOptions) effectiveSelections = deepFreezeClassicalNahuatlVncApplicationValue({
            ...effectiveSelections, finiteSingularConnector: request.finiteSingularConnector || request.sentenceOptions?.finiteSingularConnector || "silent",
          });
        } else if (buildClassicalNahuatlVncApplicationSentenceOptions(effectiveSelections).finiteSingularConnector) {
          bindingStatus = "rejected";
          blockReason = preview?.blockReason || "classical-vnc-finite-singular-connector-not-licensed";
        }
      }
      let admonitiveNumberFrame = null;
      const pluralAdmonitive = effectiveSelections.mood === "admonitive"
        && effectiveSelections.tense === "nonpast"
        && String(effectiveSelections.subject || "").endsWith("pl");
      if (provenance && pluralAdmonitive) {
        admonitiveNumberFrame = getClassicalNahuatlVncAdmonitiveNumberChoiceFrame({
          ...effectiveSelections,
          sourceStem: provenance.sourceDescriptor.sourceStem,
          verbClass: provenance.sourceDescriptor.verbClass,
        });
      }
      if (!initialBlockReason && bindingStatus !== "rejected") {
        const selectedEnding = buildClassicalNahuatlVncApplicationSentenceOptions(
          effectiveSelections,
        ).admonitivePluralEnding;
        if (pluralAdmonitive && !admonitiveNumberFrame
          || selectedEnding && !admonitiveNumberFrame?.num2Variants.includes(selectedEnding)) {
          bindingStatus = "rejected";
          blockReason = "classical-vnc-typed-source-admonitive-plural-ending-not-licensed";
        } else if (admonitiveNumberFrame) {
          effectiveSelections = deepFreezeClassicalNahuatlVncApplicationValue({
            ...effectiveSelections,
            admonitivePluralEnding: selectedEnding || admonitiveNumberFrame.num2,
          });
        }
      }
      if (!initialBlockReason && bindingStatus !== "rejected") {
        // A retained typed Source may already contain a valid reflexive
        // machinery frame from an earlier subject. Re-evaluate meaning for
        // the current direct-active cell before issuing its execution lease.
        const source = provenance?.sourceDescriptor;
        if (source?.sourceValence === "mainline-reflexive"
          && selectedDerivation === "direct" && requestedVoice === "active") {
          const interpretation = resolveReflexiveInterpretationChoice(
            getClassicalNahuatlVncApplicationRuntimeTarget(), {
              valence: source.sourceValence, subject: effectiveSelections.subject,
              stem: source.sourceStem,
              requestedValue: effectiveSelections.objectInterpretation,
            },
          );
          if (interpretation.state !== "licensed") {
            bindingStatus = "rejected";
            blockReason = interpretation.state === "unresolved"
              ? "classical-vnc-typed-source-object-interpretation-owner-unavailable"
              : "classical-vnc-typed-source-object-interpretation-not-licensed";
          }
        }
      }
      if (!initialBlockReason && bindingStatus !== "rejected") {
        if (requiredChoiceIds.length) {
          bindingStatus = "choices-required";
        } else {
          bindingStatus = "ready";
          blockReason = "";
        }
      }
      requiredChoiceIds = Object.freeze([...new Set(requiredChoiceIds)]);
      const choiceOptionProjection =
        buildClassicalNahuatlVncTypedSourceApplicationChoiceProjection({
          derivationInventories,
          selectedDerivation,
          participantOperationFrame,
          allowedVoices,
          nonactiveOptionInventory,
          admonitiveNumberFrame,
          finiteConnectorOptions,
        });
      const sourceAccepted = Boolean(provenance);
      const authorizationStatus = bindingStatus === "rejected"
        ? "blocked"
        : "authorized";
      const executionArgs = Object.freeze(bindingStatus === "ready"
        ? [exactSourceMachineryFrame, frozenCallerSelections]
        : []);
      const frame = Object.freeze({
        kind:
          CLASSICAL_NAHUATL_VNC_TYPED_SOURCE_APPLICATION_BINDING_FRAME_KIND,
        version: 1,
        authorizationStatus,
        bindingStatus,
        blockReason,
        operationId: "vnc:application",
        inputSourceMachineryFrame: exactSourceMachineryFrame,
        exactSourceMachineryFrame: sourceAccepted
          ? exactSourceMachineryFrame
          : null,
        callerSelections: frozenCallerSelections,
        effectiveSelections,
        requiredChoiceIds,
        choiceOptionProjection,
        ownerDerivationOptionInventory: selectedInventory,
        preparedSourceApplicationFrame,
        subjectReferenceAuthoringAllowed,
        ownerInventoryValidated: selectedDerivation === "direct"
          ? true
          : Boolean(selectedInventory),
        executionArgs,
        rejectedAuthorityFields,
        unsupportedSelectionFields,
        ownerChoicesRequired: requiredChoiceIds.length > 0,
        ownerInputAcceptanceProven: sourceAccepted,
        ownerRejectionProven: !sourceAccepted,
        exactSourceIdentityPreserved: sourceAccepted,
        ownerExecutionStillRequired: bindingStatus === "ready",
        sourceStringAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        lessonMetadataAuthority: false,
        storedStateAuthority: false,
        grammarAuthority: false,
      });
      const ownerRequest = bindingStatus === "ready"
        ? buildClassicalNahuatlVncTypedSourceApplicationOwnerRequest(
          evaluationProvenance,
          effectiveSelections,
        )
        : null;
      classicalNahuatlVncTypedSourceApplicationBindingFrames.add(frame);
      classicalNahuatlVncTypedSourceApplicationBindingContexts.set(
        frame,
        Object.freeze({
          provenance,
          evaluationProvenance,
          evaluationSourceMachineryFrame,
          preparedSourceApplicationFrame,
          ownerRequest,
          participantOperationFrame,
          selectedInventory,
        }),
      );
      return frame;
    }
    function isClassicalNahuatlVncTypedSourceApplicationBindingFrame(
      frame = null,
    ) {
      if (restrictedContainingBindings.has(frame)) return isRestrictedContainingBinding(frame);
      if (analyticalVncBindings.has(frame)) return isAnalyticalVncBinding(frame);
      if (imperfectiveBindings.has(frame)) return isImperfectiveVncBinding(frame);
      if (preformedVncBindings.has(frame)) return isPreformedVncBinding(frame);
      if (nonactiveCarrierBindings.has(frame)) return isNonactiveCarrierBinding(frame);
      const context =
        classicalNahuatlVncTypedSourceApplicationBindingContexts.get(frame)
        || null;
      if (
        !frame
        || !context
        || !classicalNahuatlVncTypedSourceApplicationBindingFrames.has(frame)
        || frame.kind
          !== CLASSICAL_NAHUATL_VNC_TYPED_SOURCE_APPLICATION_BINDING_FRAME_KIND
        || frame.version !== 1
        || !CLASSICAL_NAHUATL_VNC_TYPED_SOURCE_APPLICATION_BINDING_STATUSES
          .includes(frame.bindingStatus)
        || frame.operationId !== "vnc:application"
        || !["authorized", "blocked"].includes(frame.authorizationStatus)
        || frame.authorizationStatus !== (frame.bindingStatus === "rejected"
          ? "blocked"
          : "authorized")
        || !Array.isArray(frame.requiredChoiceIds)
        || !Array.isArray(frame.executionArgs)
        || !Array.isArray(frame.rejectedAuthorityFields)
        || !Array.isArray(frame.unsupportedSelectionFields)
        || !Object.isFrozen(frame)
        || !Object.isFrozen(frame.callerSelections)
        || !Object.isFrozen(frame.effectiveSelections)
        || !Object.isFrozen(frame.requiredChoiceIds)
        || !Object.isFrozen(frame.choiceOptionProjection)
        || !Object.isFrozen(frame.executionArgs)
        || frame.ownerChoicesRequired !== Boolean(
          frame.requiredChoiceIds.length,
        )
        || frame.sourceStringAuthority !== false
        || frame.formulaStringAuthority !== false
        || frame.surfaceStringAuthority !== false
        || frame.lessonMetadataAuthority !== false
        || frame.storedStateAuthority !== false
        || frame.grammarAuthority !== false
      ) {
        return false;
      }
      if (!frame.ownerInputAcceptanceProven) {
        return Boolean(
          frame.bindingStatus === "rejected"
          && frame.ownerRejectionProven === true
          && frame.exactSourceMachineryFrame === null
          && frame.executionArgs.length === 0
          && frame.blockReason
        );
      }
      const provenance =
        classicalNahuatlVncTypedSourceApplicationProvenanceBySource.get(
          frame.exactSourceMachineryFrame,
        ) || null;
      if (
        !provenance
        || provenance !== context.provenance
        || frame.inputSourceMachineryFrame
          !== frame.exactSourceMachineryFrame
        || frame.exactSourceMachineryFrame
          !== provenance.exactSourceMachineryFrame
        || frame.ownerRejectionProven !== false
        || frame.exactSourceIdentityPreserved !== true
      ) {
        return false;
      }
      if (frame.subjectReferenceAuthoringAllowed !== (provenance.rawSubjectAuthoringAllowed === true)) return false;
      if (frame.preparedSourceApplicationFrame !== context.preparedSourceApplicationFrame) return false;
      if (context.preparedSourceApplicationFrame) {
        const prepared = context.preparedSourceApplicationFrame;
        if (provenance.rawSubjectAuthoringAllowed !== true
          || frame.effectiveSelections.requestedDerivation !== "applicative"
          || !isClassicalNahuatlVncApplicationFrame(prepared)
          || prepared.authorizationStatus !== "authorized"
          || prepared.resultFrame.sourceMachineryFrame !== frame.exactSourceMachineryFrame
          || prepared.resultFrame.selectedMachineryFrame !== context.evaluationSourceMachineryFrame
          || getClassicalNahuatlVncApplicationRuntimeTarget()
            ?.isClassicalNahuatlVncDerivationSourceMachineryFrame?.(context.evaluationSourceMachineryFrame) !== true
          || prepared.normalizedRequest.derivationType !== "direct"
          || prepared.normalizedRequest.subject !== frame.effectiveSelections.subject
          || context.evaluationProvenance !== classicalNahuatlVncTypedSourceApplicationProvenanceBySource
            .get(context.evaluationSourceMachineryFrame)
          || context.evaluationProvenance.sourceDescriptor.sourceSubject !== frame.effectiveSelections.subject) return false;
      } else if (context.evaluationProvenance !== provenance
        || context.evaluationSourceMachineryFrame !== frame.exactSourceMachineryFrame) return false;
      if (frame.ownerDerivationOptionInventory) {
        if (
          frame.ownerDerivationOptionInventory !== context.selectedInventory
          || frame.ownerDerivationOptionInventory.sourceMachineryFrame
            !== context.evaluationSourceMachineryFrame
          || provenance.ownerDependencies
            .isClassicalNahuatlVncDerivationOptionInventory(
              frame.ownerDerivationOptionInventory,
            ) !== true
        ) {
          return false;
        }
      } else if (
        frame.effectiveSelections.requestedDerivation
        && frame.effectiveSelections.requestedDerivation !== "direct"
        && frame.bindingStatus !== "rejected"
      ) {
        return false;
      }
      if (frame.bindingStatus === "choices-required") {
        const projectedChoicesAreUsable = frame.requiredChoiceIds.every(
          choiceId => {
            const options = frame.choiceOptionProjection?.[choiceId];
            if (!Array.isArray(options) || options.length === 0) return false;
            const optionIds = options.map(option => String(
              option?.optionId || ""
            ));
            return Object.isFrozen(options)
              && optionIds.every(Boolean)
              && new Set(optionIds).size === optionIds.length
              && options.every(option => (
                Object.isFrozen(option)
                && option.choiceId === choiceId
                && option.ownerOptionProjected === true
                && option.ownerOptionAuthority === false
                && option.grammarAuthority === false
              ))
              && options.some(option => (
                option.availabilityStatus === "available"
              ));
          },
        );
        return Boolean(
          frame.blockReason
          && frame.requiredChoiceIds.length
          && projectedChoicesAreUsable
          && frame.executionArgs.length === 0
          && context.ownerRequest === null
          && frame.ownerExecutionStillRequired === false
        );
      }
      if (frame.bindingStatus === "rejected") {
        return Boolean(
          frame.blockReason
          && frame.executionArgs.length === 0
          && context.ownerRequest === null
          && frame.ownerExecutionStillRequired === false
        );
      }
      return Boolean(
        frame.bindingStatus === "ready"
        && frame.authorizationStatus === "authorized"
        && frame.blockReason === ""
        && frame.requiredChoiceIds.length === 0
        && frame.executionArgs.length === 2
        && frame.executionArgs[0] === frame.exactSourceMachineryFrame
        && frame.executionArgs[1] === frame.callerSelections
        && context.ownerRequest
        && frame.ownerExecutionStillRequired === true
      );
    }
    function executeClassicalNahuatlVncTypedSourceApplicationBindingFrame(
      bindingFrame = null,
    ) {
      if (
        !isClassicalNahuatlVncTypedSourceApplicationBindingFrame(bindingFrame)
        || bindingFrame.bindingStatus !== "ready"
        || classicalNahuatlVncTypedSourceApplicationExecutedBindings.has(
          bindingFrame,
        )
      ) {
        return null;
      }
      if (restrictedContainingBindings.has(bindingFrame)) {classicalNahuatlVncTypedSourceApplicationExecutedBindings.add(bindingFrame);return buildRestrictedContainingApplication(bindingFrame);}
      if (analyticalVncBindings.has(bindingFrame)) {classicalNahuatlVncTypedSourceApplicationExecutedBindings.add(bindingFrame);return buildAnalyticalVncApplication(bindingFrame);}
      if (imperfectiveBindings.has(bindingFrame)) {classicalNahuatlVncTypedSourceApplicationExecutedBindings.add(bindingFrame);return buildImperfectiveVncApplication(bindingFrame);}
      if (preformedVncBindings.has(bindingFrame)) {
        classicalNahuatlVncTypedSourceApplicationExecutedBindings.add(bindingFrame);return buildPreformedVncApplication(bindingFrame);
      }
      if (nonactiveCarrierBindings.has(bindingFrame)) {
        classicalNahuatlVncTypedSourceApplicationExecutedBindings.add(bindingFrame);
        return buildNonactiveCarrierApplication(bindingFrame);
      }
      const context =
        classicalNahuatlVncTypedSourceApplicationBindingContexts.get(
          bindingFrame,
        );
      classicalNahuatlVncTypedSourceApplicationExecutedBindings.add(
        bindingFrame,
      );
      const result = context.evaluationProvenance.ownerEvaluate(
        context.ownerRequest,
      );
      if (
        !isClassicalNahuatlVncApplicationFrame(result)
        || result.authorizationStatus !== "authorized"
        || result.resultFrame?.authorizationStatus !== "authorized"
        || result.normalizedRequest?.sourceStem
          !== context.ownerRequest.sourceStem
        || result.normalizedRequest?.sourceValence
          !== context.ownerRequest.sourceValence
        || result.normalizedRequest?.derivationType
          !== context.ownerRequest.requestedDerivation
      ) {
        return null;
      }
      return result;
    }
    const CLASSICAL_NAHUATL_VNC_CONTINUATION_SOURCE_FIELDS = Object.freeze([
      "sourceStem",
      "sourceLexemeId",
      "sourceInitialISelection",
      "verbClass",
      "sourceValence",
      "sourceSubject",
      "sourceSubjectPerson",
      "sourceSubjectAnimacy",
      "sourceSubjectHumanness",
      "sourceSubjectNumber",
      "sourceObjectRequests",
      "sourceVoice",
      "sourceNonactiveOptionId",
      "objectKind",
      "objectPerson",
    ]);
    const CLASSICAL_NAHUATL_VNC_CONTINUATION_ADDITIONAL_RESULT_FIELDS =
      Object.freeze({
        "recursive-embed-closure": "recursiveEmbedClosureFrame",
        "compound-embed-closure": "compoundEmbedClosureFrame",
        "recursive-matrix-closure": "compoundMatrixClosureFrame",
        "compound-matrix-closure": "compoundMatrixClosureFrame",
        "compound-matrix-vnc-result": "compoundMatrixVncResultFrame",
        "attitude-source-closure": "attitudeSourceClosureFrame",
        "attitude-compound-closure": "attitudeCompoundClosureFrame",
        "attitude-member-transformation":
          "attitudeMemberTransformationFrame",
      });
    function hasClassicalNahuatlVncContinuationBindingSelection(
      selections = {},
      selectionId = "",
    ) {
      if (!Object.prototype.hasOwnProperty.call(selections, selectionId)) {
        return false;
      }
      const value = selections[selectionId];
      return Array.isArray(value)
        ? value.length > 0
        : typeof value === "string"
          ? Boolean(value.trim())
          : value !== undefined && value !== null;
    }
    function getClassicalNahuatlVncContinuationBindingSource(
      exactInputResult = null,
      operationId = "",
    ) {
      const service = getClassicalNahuatlVncApplicationSharedService();
      if (getImperfectiveVncContext(exactInputResult) && ["vnc:derivational-operation","vnc:ordered-voice-application"].includes(operationId)) return null;
      const exactApplicationFrame = isClassicalNahuatlVncApplicationIssuedFrame(
        exactInputResult,
      ) ? exactInputResult : null;
      // A matching application wrapper must own its identity before its
      // inner Result can be consumed. The genuine inner Result is a separate port.
      if (exactInputResult?.kind === "classical-nahuatl-vnc-application-frame"
        && !exactApplicationFrame) return null;
      if (operationId === "vnc:derivational-operation") {
        const target = getClassicalNahuatlVncApplicationRuntimeTarget();
        const compoundSource = target.buildClassicalNahuatlCompoundPredicateSourceFrame?.({canonicalNncResult: exactInputResult});
        if (target.isClassicalNahuatlCompoundPredicateSourceFrame?.(compoundSource) === true) return Object.freeze({
          exactInputResult, continuationInputResult: exactInputResult,
          continuationSourceProjection: null, outerVncApplicationFrame: null,
          compoundPredicateSourceFrame: compoundSource,
          inputResultKind: "ownerhood-fixed-preterit-result",
        });
      }
      // The issued sentence retains its canonical nucleus and coordinate.
      // Classify that nucleus before choosing a continuation recapture path.
      const exactSentenceResult = isClassicalNahuatlVncSentenceResultFrame(
        exactInputResult,
      ) ? exactInputResult : null;
      const continuationInputResult = exactApplicationFrame
        ? operationId === "vnc:sentence-result"
          ? exactApplicationFrame : exactApplicationFrame.resultFrame
        : exactSentenceResult
          ? operationId === "vnc:sentence-result"
            && isClassicalNahuatlVncApplicationFrame(exactSentenceResult.canonicalSourceFrame)
            ? exactSentenceResult.canonicalSourceFrame : exactSentenceResult.canonicalResultFrame
          : exactInputResult;
      // A nominal compound can receive a sentence envelope over its exact
      // issued nucleus. This does not admit its spelling as a new stem Source.
      const nominalSentenceApplication = ["vnc:sentence-result", "vnc:application", "vnc:derivational-operation", "vnc:ordered-voice-application"].includes(operationId)
        ? getClassicalNahuatlIssuedNominalSentenceApplication(continuationInputResult)
          || (operationId === "vnc:sentence-result"
            ? getClassicalNahuatlIssuedDenominalSentenceApplication(continuationInputResult) : null)
        : null;
      const continuationSourceProjection = getImperfectiveVncContext(continuationInputResult)?.projection
        || (isImperfectiveApplicativeApplication(continuationInputResult)
          ? imperfectiveApplicativeApplications.get(continuationInputResult).projection : null)
        || service.getContinuationSourceConstituents(nominalSentenceApplication?.resultFrame
          || (isClassicalNahuatlVncApplicationFrame(continuationInputResult)
            ? continuationInputResult.resultFrame : continuationInputResult));
      // Sentence composition consumes the authenticated finite nominal whole.
      // Its existing Sentence source owner need not license stem recapture.
      const nominalSentenceSource = operationId === "vnc:sentence-result"
        && nominalSentenceApplication
        ? getClassicalNahuatlVncSentenceResultSource(continuationInputResult)
        : null;
      // An issued impersonal clause already owns its finite coordinate.
      // Sentence composition must not require re-admitting a referential
      // active Source that the impersonal owner deliberately did not retain.
      const nonactiveSentenceSource = operationId === "vnc:sentence-result"
        && getClassicalNahuatlIssuedNonactiveSentenceApplication(continuationInputResult)
        ? getClassicalNahuatlVncSentenceResultSource(continuationInputResult)
        : null;
      const runtimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget();
      const lateClosure = Boolean(
        continuationInputResult?.authorizationStatus === "authorized"
        && typeof runtimeTarget?.isClassicalNahuatlClosureFrame === "function"
        && runtimeTarget.isClassicalNahuatlClosureFrame(
          continuationInputResult,
        ) === true
      );
      const orderedVoice = isClassicalNahuatlOrderedVoiceVncApplicationFrame(
        continuationInputResult,
      );
      const mappedApplicationFrame =
        classicalNahuatlVncApplicationFrameByResultFrame.get(
          continuationInputResult,
        ) || null;
      const lateTargetApplicationFrame = lateClosure
        ? continuationInputResult.operationFrame?.targetApplicationFrame
          || null
        : null;
      const outerVncApplicationFrame = [
        exactApplicationFrame,
        mappedApplicationFrame,
        lateTargetApplicationFrame,
      ].find(frame => (
        isClassicalNahuatlVncApplicationFrame(frame)
      )) || null;
      const orderedOwnerAcceptsExactOuterApplication = Boolean(
        operationId === "vnc:ordered-voice-application"
        && outerVncApplicationFrame
        && classicalNahuatlVncApplicationFrameByResultFrame.get(
          outerVncApplicationFrame.resultFrame,
        ) === outerVncApplicationFrame
        && (
          exactInputResult === outerVncApplicationFrame
          || exactInputResult === outerVncApplicationFrame.resultFrame
        )
      );
      if (
        !continuationSourceProjection
        && !orderedOwnerAcceptsExactOuterApplication
        && !nominalSentenceSource
        && !nonactiveSentenceSource
      ) {
        return null;
      }
      return Object.freeze({
        exactInputResult,
        continuationInputResult,
        nominalApplicationFrame: nominalSentenceApplication,
        // Sentence consumes the authenticated nominal finite whole. A stem
        // recapture projection is not a prerequisite of that separate port.
        continuationSourceProjection: nominalSentenceSource ? null : continuationSourceProjection,
        outerVncApplicationFrame,
        inputResultKind: exactApplicationFrame
          ? "vnc-application"
          : lateClosure
            ? "late-vnc-closure"
            : orderedVoice
              ? "ordered-voice-vnc-application"
              : "vnc-application-result",
      });
    }
    function buildClassicalNahuatlVncContinuationBindingSourceRequest(
      sourceRecord = null,
      selections = {},
    ) {
      const projection = sourceRecord?.continuationSourceProjection;
      if (!projection) return null;
      const request = {};
      CLASSICAL_NAHUATL_VNC_CONTINUATION_SOURCE_FIELDS.forEach(field => {
        if (projection[field] !== undefined) request[field] = projection[field];
      });
      Object.entries(selections).forEach(([field, value]) => {
        request[field] = cloneClassicalNahuatlVncApplicationCompactValue(
          value,
        );
      });
      return deepFreezeClassicalNahuatlVncApplicationValue(request);
    }
    function buildClassicalNahuatlVncContinuationRecaptureRequest(
      sourceRecord = null,
    ) {
      const projection = sourceRecord?.continuationSourceProjection;
      if (!projection) return null;
      const sourceCoordinate =
        sourceRecord.outerVncApplicationFrame?.normalizedRequest
        || sourceRecord.nominalApplicationFrame?.normalizedRequest
        || sourceRecord.continuationInputResult?.normalizedRequest
        || sourceRecord.continuationInputResult?.baseApplicationFrame
          ?.normalizedRequest
        || {};
      return buildClassicalNahuatlVncContinuationBindingSourceRequest(
        sourceRecord,
        {
          subject: projection.sourceSubject
            || sourceCoordinate.subject
            || "3sg",
          mood: sourceCoordinate.mood || "indicative",
          tense: sourceCoordinate.tense || "present",
          sentenceOptions: getClassicalNahuatlVncApplicationCanonicalSentenceOptions(
            sourceRecord.continuationInputResult?.selectedMachineryFrame
              || sourceRecord.outerVncApplicationFrame?.resultFrame?.selectedMachineryFrame,
          ),
          requestedDerivation: "direct",
          requestedVoice: "active",
          voice: "active",
          outputScope: "single",
        },
      );
    }
    function getClassicalNahuatlVncContinuationOuterApplicationFrame(
      sourceRecord = null,
      operationId = "",
    ) {
      const retainedClosure = sourceRecord?.continuationInputResult;
      const retainedTarget = retainedClosure?.operationFrame?.targetApplicationFrame;
      const targetTyped = retainedTarget?.resultFrame?.finalTypedVncSlotFrame;
      // Internal impersonal tla is already part of this authenticated target
      // predicate. Recapturing its old nonactive option would add another layer.
      if (operationId === "vnc:derivational-operation"
        && sourceRecord?.inputResultKind === "late-vnc-closure"
        && retainedClosure.operationFrame.operationFacts?.nonactiveFormation === "tla-impersonal"
        && getClassicalNahuatlVncApplicationRuntimeTarget()?.isClassicalNahuatlClosureFrame?.(retainedClosure) === true
        && isClassicalNahuatlVncApplicationFrame(retainedTarget)
        && retainedTarget.authorizationStatus === "authorized"
        && retainedTarget.normalizedRequest.sourceStem === retainedClosure.operationFrame.targetStem
        && retainedTarget.normalizedRequest.verbClass === retainedClosure.operationFrame.targetClass
        && targetTyped?.semanticIdentity === retainedClosure.finalTypedVncSlotFrame?.semanticIdentity) {
        return retainedTarget;
      }
      const recaptureDerivedResult = Boolean(
        [
          "vnc:ordered-voice-application",
          "vnc:derivational-operation",
        ].includes(operationId)
        && sourceRecord?.continuationSourceProjection
        && (sourceRecord.inputResultKind === "late-vnc-closure"
          || (sourceRecord.continuationInputResult?.kind === "classical-nahuatl-vnc-application-result-frame"
            && sourceRecord.continuationInputResult.selectedDerivation !== "direct"))
      );
      if (
        !recaptureDerivedResult
        && sourceRecord?.outerVncApplicationFrame
        && isClassicalNahuatlVncApplicationFrame(
          sourceRecord.outerVncApplicationFrame,
        )
      ) {
        return sourceRecord.outerVncApplicationFrame;
      }
      const recaptureRequest =
        buildClassicalNahuatlVncContinuationRecaptureRequest(sourceRecord);
      const recaptured = recaptureRequest
        ? sourceRecord.nominalApplicationFrame
          ? evaluateClassicalNahuatlVncApplication(recaptureRequest, sourceRecord.continuationInputResult)
          : getClassicalNahuatlVncApplicationSharedService()
          .continueFromResult(
            sourceRecord.continuationInputResult,
            recaptureRequest,
          )
        : null;
      return isClassicalNahuatlVncApplicationFrame(recaptured)
        ? recaptured
        : null;
    }
    function getClassicalNahuatlVncContinuationOrderedVoiceChoiceInventory(
      sourceRecord = null,
    ) {
      const closure = sourceRecord?.continuationInputResult;
      const projection = sourceRecord?.continuationSourceProjection;
      const operation = closure?.operationFrame;
      const runtime = getClassicalNahuatlVncApplicationRuntimeTarget();
      // A negative active inventory depends only on the exact derived predicate
      // and the empty voice prefix. It does not need a newly finite application.
      // Positive routes and every nonactive context retain the full path below.
      const exactLateActive = sourceRecord?.inputResultKind === "late-vnc-closure"
        && closure?.authorizationStatus === "authorized"
        && runtime?.isClassicalNahuatlClosureFrame?.(closure) === true
        && projection?.canonicalResultFrame === closure
        && projection.canonicalOperationFrame === operation
        && projection.canonicalSourceMachineryFrame === closure.selectedMachineryFrame
        && projection.sourceStem === operation.targetStem
        && projection.verbClass === operation.targetClass
        && projection.sourceValence === operation.targetValence
        && projection.sourceVoice === "active"
        && projection.sourceNonactiveOptionId === ""
        && projection.inherentImpersonal === false
        && projection.internalTlaImpersonal === false
        && closure.normalizedRequest?.requestedVoice === "active"
        && [undefined, "", "active"].includes(operation.operationFacts?.nonactiveFormation);

      // Derived finite Results can also appear as additional exact navigator
      // candidates. Re-read their private service projection rather than
      // manufacturing a finite continuation merely to reject the voice prefix.
      const issuedDerived = closure?.authorizationStatus === "authorized"
        && closure?.kind === "classical-nahuatl-vnc-application-result-frame"
        && closure.selectedDerivation !== "direct"
        && isClassicalNahuatlVncApplicationIssuedResultFrame(closure);
      const issuedProjection = issuedDerived
        ? getClassicalNahuatlVncApplicationSharedService()
          .getContinuationSourceConstituents(closure) : null;
      const exactDerivedActive = issuedProjection
        && ["sourceStem", "verbClass", "sourceValence", "sourceVoice",
          "sourceNonactiveOptionId", "inherentImpersonal", "internalTlaImpersonal"]
          .every(field => issuedProjection[field] === projection?.[field])
        && issuedProjection.sourceVoice === "active"
        && issuedProjection.sourceNonactiveOptionId === ""
        && issuedProjection.inherentImpersonal === false
        && issuedProjection.internalTlaImpersonal === false;
      if ((exactLateActive || exactDerivedActive)
        && typeof runtime?.getClassicalNahuatlOrderedVoiceLayerCascadeOptions === "function") {
        const sourceStem = normalizeClassicalNahuatlVncApplicationStem(projection.sourceStem);
        const baseOperations = Object.freeze([]);
        const ownerInventory = sourceStem
          ? runtime.getClassicalNahuatlOrderedVoiceLayerCascadeOptions(sourceStem, baseOperations)
          : null;
        if (ownerInventory?.kind === "classical-nahuatl-ordered-voice-layer-cascade-inventory"
          && ownerInventory.sourceStem === sourceStem
          && ownerInventory.authorizationStatus === "blocked"
          && typeof ownerInventory.blockReason === "string"
          && ownerInventory.blockReason
          && Array.isArray(ownerInventory.appliedOperations)
          && ownerInventory.appliedOperations.length === 0
          && Array.isArray(ownerInventory.options)
          && ownerInventory.options.length === 0
          && Object.isFrozen(ownerInventory)
          && Object.isFrozen(ownerInventory.appliedOperations)
          && Object.isFrozen(ownerInventory.options)) {
          return Object.freeze({
            outerVncApplicationFrame: null,
            sourceStem,
            baseOperation: "active",
            baseOperations,
            ownerInventory,
            ownerInventoryInvoked: true,
            ownerInventoryValidated: true,
            ownerRouteAvailable: false,
            ownerRejectionProven: true,
            blockReason: ownerInventory.blockReason,
          });
        }
      }
      const outerVncApplicationFrame =
        getClassicalNahuatlVncContinuationOuterApplicationFrame(
          sourceRecord,
          "vnc:ordered-voice-application",
        );
      const sourceStem = normalizeClassicalNahuatlVncApplicationStem(
        outerVncApplicationFrame?.normalizedRequest?.sourceStem,
      );
      const baseOperation = normalizeClassicalNahuatlVncApplicationToken(
        outerVncApplicationFrame?.resultFrame?.selectedVoiceOperation
          || "active",
      );
      const passiveRecord = outerVncApplicationFrame?.resultFrame?.selectedMachineryFrame?.nonactiveStemRecord;
      const baseOperations = Object.freeze(
        baseOperation && baseOperation !== "active"
          ? [baseOperation === "passive" && passiveRecord?.suffixFamily
            ? `passive-${passiveRecord.suffixFamily}` : baseOperation]
          : [],
      );
      const runtimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget();
      const ownerInventoryInvoked = Boolean(
        outerVncApplicationFrame
        && sourceStem
        && typeof runtimeTarget
          ?.getClassicalNahuatlOrderedVoiceLayerCascadeOptions === "function"
      );
      const ownerInventory = ownerInventoryInvoked
        ? runtimeTarget.getClassicalNahuatlOrderedVoiceLayerCascadeOptions(
          sourceStem,
          baseOperations,
          baseOperation === "passive" ? outerVncApplicationFrame : undefined,
        )
        : null;
      const ownerInventoryValidated = Boolean(
        ownerInventory
        && ownerInventory.kind
          === "classical-nahuatl-ordered-voice-layer-cascade-inventory"
        && ownerInventory.sourceStem === sourceStem
        && Array.isArray(ownerInventory.appliedOperations)
        && ownerInventory.appliedOperations.length === baseOperations.length
        && ownerInventory.appliedOperations.every(
          (operation, index) => operation === baseOperations[index],
        )
        && Array.isArray(ownerInventory.options)
        && Object.isFrozen(ownerInventory)
        && Object.isFrozen(ownerInventory.appliedOperations)
        && Object.isFrozen(ownerInventory.options)
      );
      const ownerRouteAvailable = Boolean(
        ownerInventoryValidated
        && ownerInventory.authorizationStatus === "authorized"
        && ownerInventory.options.length > 0
      );
      const ownerRejectionProven = Boolean(
        ownerInventoryInvoked
        && ownerInventoryValidated
        && !ownerRouteAvailable
      );
      return Object.freeze({
        outerVncApplicationFrame,
        sourceStem,
        baseOperation,
        baseOperations,
        ownerInventory: ownerInventoryValidated ? ownerInventory : null,
        ownerInventoryInvoked,
        ownerInventoryValidated,
        ownerRouteAvailable,
        ownerRejectionProven,
        blockReason: ownerRejectionProven
          ? String(
            ownerInventory?.blockReason
            || "ordered-voice-layer-route-not-attested",
          )
          : "",
      });
    }
    function getClassicalNahuatlVncContinuationAdditionalResults(
      additionalResults = {},
    ) {
      const supplied = additionalResults
        && typeof additionalResults === "object"
        && !Array.isArray(additionalResults)
        ? additionalResults
        : null;
      if (!supplied) {
        return Object.freeze({
          valid: false,
          blockReason:
            "classical-vnc-continuation-additional-results-must-be-an-object",
          ownerFields: Object.freeze({}),
          suppliedRoles: Object.freeze([]),
        });
      }
      const knownKeys = new Set([
        ...Object.keys(
          CLASSICAL_NAHUATL_VNC_CONTINUATION_ADDITIONAL_RESULT_FIELDS,
        ),
        ...Object.values(
          CLASSICAL_NAHUATL_VNC_CONTINUATION_ADDITIONAL_RESULT_FIELDS,
        ),
      ]);
      const unknownKey = Reflect.ownKeys(supplied).find(key => (
        typeof key !== "string" || !knownKeys.has(key)
      ));
      if (unknownKey !== undefined) {
        return Object.freeze({
          valid: false,
          blockReason:
            "classical-vnc-continuation-additional-result-role-not-recognized",
          ownerFields: Object.freeze({}),
          suppliedRoles: Object.freeze([]),
        });
      }
      const runtimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget();
      const ownerFields = {};
      const suppliedRoles = [];
      for (const [role, field] of Object.entries(
        CLASSICAL_NAHUATL_VNC_CONTINUATION_ADDITIONAL_RESULT_FIELDS,
      )) {
        const exactResult = supplied[role] || supplied[field] || null;
        if (!exactResult) continue;
        if (
          exactResult.authorizationStatus !== "authorized"
          || (role === "compound-matrix-vnc-result"
            ? runtimeTarget?.isClassicalNahuatlNominalConstructionResult?.(exactResult) !== true
              || exactResult.constructionKind !== "nominal-embed-vnc"
              || !runtimeTarget?.getClassicalNahuatlVncContinuationSourceConstituents?.(
                exactResult.canonicalResult?.resultFrame)
            : runtimeTarget?.isClassicalNahuatlClosureFrame?.(exactResult) !== true)
        ) {
          return Object.freeze({
            valid: false,
            blockReason:
              "classical-vnc-continuation-exact-additional-result-required",
            ownerFields: Object.freeze({}),
            suppliedRoles: Object.freeze([]),
          });
        }
        if (ownerFields[field] && ownerFields[field] !== exactResult) {
          return Object.freeze({
            valid: false,
            blockReason:
              "classical-vnc-continuation-conflicting-additional-results",
            ownerFields: Object.freeze({}),
            suppliedRoles: Object.freeze([]),
          });
        }
        ownerFields[field] = exactResult;
        suppliedRoles.push(role);
      }
      return Object.freeze({
        valid: true,
        blockReason: "",
        ownerFields: Object.freeze(ownerFields),
        suppliedRoles: Object.freeze([...new Set(suppliedRoles)]),
      });
    }
    function getClassicalNahuatlVncContinuationPreflightRequirements(
      operationId = "",
      blockReason = "",
    ) {
      const reason = String(blockReason || "");
      const choiceIds = [];
      const resultRoles = [];
      const addChoice = (pattern, choiceId) => {
        if (pattern.test(reason)) choiceIds.push(choiceId);
      };
      const addResult = (pattern, role) => {
        if (pattern.test(reason)) resultRoles.push(role);
      };
      addChoice(/lesson-9-wish-command-requires-ma-or-tla/u, "introductoryParticle");
      addChoice(/derivation-option-selection-required/u, "derivationOptionId");
      addChoice(/causative-causee-valence-selection-required/u, "causativeObjectKind");
      addChoice(/applicative-specific-object-person-required/u, "applicativeObjectPerson");
      addChoice(/source-nonactive.*selection-required/u,
        "sourceNonactiveOptionId");
      addChoice(/(?<!compound-matrix-)nonactive-formation-option-selection-required/u,
        "nonactiveOptionId");
      addChoice(/compound-matrix-nonactive-formation-option-selection-required/u,
        "compoundMatrixNonactiveOptionId");
      addChoice(/variant-required|licensed-attitude-formation-required/u,
        "lateVariant");
      addChoice(/positive-bounded-reduplication-count-required/u,
        "frequentativeRepetitions");
      addChoice(/typed-compound-matrix-required/u, "compoundMatrixStem");
      addChoice(/licensed-compound-event-order-required/u,
        "compoundEventOrder");
      addChoice(/licensed-frequentative-scope-required/u,
        "frequentativeScope");
      addChoice(/frequentative-initial-i-treatment-required/u, "frequentativeInitialITreatment");
      addChoice(/licensed-frequentative-target-required/u,
        "frequentativeTarget");
      addChoice(/licensed-external-directional-required/u,
        "purposiveExternalDirectional");
      addChoice(/licensed-honorific-stem-alternative-required/u,
        "honorificStemAlternative");
      addResult(/recursive-embed-closure-required/u,
        "recursive-embed-closure");
      addResult(/recursive-matrix-closure-required/u,
        "recursive-matrix-closure");
      addResult(/typed-compound-matrix-required/u,
        "compound-matrix-vnc-result");
      addResult(/reverential-requires-engine-issued-honorific-source/u,
        "attitude-source-closure");
      addResult(/engine-issued-typed-compound-source-required/u,
        "attitude-compound-closure");
      addResult(/engine-issued-attitude-member-transformation-required/u,
        "attitude-member-transformation");
      return Object.freeze({
        operationId,
        choiceIds: Object.freeze([...new Set(choiceIds)]),
        resultRoles: Object.freeze([...new Set(resultRoles)]),
      });
    }
    function issueClassicalNahuatlVncContinuationBindingFrame(
      operationId = "", exactInputResult = null,
      callerSelections = {}, additionalResults = {},
    ) {
      return runClassicalNahuatlVncApplicationValidationTransaction(() =>
        issueClassicalNahuatlVncContinuationBindingFrameInternal(
          operationId, exactInputResult, callerSelections, additionalResults,
        ));
    }
    function issueClassicalNahuatlVncContinuationBindingFrameInternal(
      operationId = "",
      exactInputResult = null,
      callerSelections = {},
      additionalResults = {},
    ) {
      const normalizedOperationId = String(operationId || "").trim();
      const operationRecognized =
        CLASSICAL_NAHUATL_VNC_CONTINUATION_BINDING_OPERATION_IDS.includes(
          normalizedOperationId,
        );
      let selections = callerSelections
        && typeof callerSelections === "object"
        && !Array.isArray(callerSelections)
        ? callerSelections
        : null;
      const sourceRecord = operationRecognized
        ? getClassicalNahuatlVncContinuationBindingSource(
          exactInputResult,
          normalizedOperationId,
        )
        : null;
      if (sourceRecord?.compoundPredicateSourceFrame && selections) selections = {
        ...selections,
        lateOperation: selections.lateOperation || "compound",
        lateVariant: selections.lateVariant || "connective-t",
        subject: selections.subject || exactInputResult.normalizedRequest?.subject || "3sg",
        mood: selections.mood || "indicative", tense: selections.tense || "present",
      };
      // Only an authenticated Source supplies the mainline reflexive topology.
      // Its honorific route is grammatical, not a user choice among three routes.
      const sourceTyped = sourceRecord?.continuationInputResult?.finalTypedVncSlotFrame
        || sourceRecord?.outerVncApplicationFrame?.resultFrame?.finalTypedVncSlotFrame;
      const mainlineReflexive = (sourceTyped?.slots?.prePredicate || []).some(slot => (
        slot.kind === "dyadic-valence"
        && ["reflexive", "mainline-reflexive"].includes(
          slot.objectPositionFrame?.objectKind || sourceTyped.objectProfile?.objectKind,
        )
      ));
      if (normalizedOperationId === "vnc:derivational-operation"
        && selections?.lateOperation === "honorific"
        && !hasClassicalNahuatlVncContinuationBindingSelection(selections, "lateVariant")
        && mainlineReflexive) {
        selections = { ...selections, lateVariant: "preterit-embed" };
      }
      if (normalizedOperationId === "vnc:derivational-operation"
        && sourceRecord
        && selections?.lateOperation === "pejorative"
        && !hasClassicalNahuatlVncContinuationBindingSelection(selections, "lateVariant")) {
        selections = { ...selections, lateVariant: "preterit-embed" };
      }
      const rejectedAuthorityFields = selections
        ? Object.freeze(Array.from(new Set([
          ...getClassicalNahuatlVncApplicationPresentFields(
            selections,
            CLASSICAL_NAHUATL_VNC_APPLICATION_CALLER_AUTHORITY_FIELDS,
          ),
          ...getClassicalNahuatlVncApplicationCurriculumCarrierFields(
            selections,
          ),
        ])))
        : Object.freeze([]);
      const sourceFieldOverride = selections
        ? CLASSICAL_NAHUATL_VNC_CONTINUATION_SOURCE_FIELDS.find(field => (
          Object.prototype.hasOwnProperty.call(selections, field)
        )) || ""
        : "";
      let additional = getClassicalNahuatlVncContinuationAdditionalResults(
        additionalResults,
      );
      const retainedHonorific = sourceRecord?.continuationInputResult;
      if (normalizedOperationId === "vnc:derivational-operation"
        && selections?.lateOperation === "reverential"
        && retainedHonorific?.operationFrame?.operation === "honorific"
        && getClassicalNahuatlVncApplicationRuntimeTarget()
          ?.isClassicalNahuatlClosureFrame?.(retainedHonorific) === true) {
        // The current exact honorific is already the required inner layer.
        // Requiring users to attach it again adds no grammatical decision.
        if (additional.valid && !additional.ownerFields.attitudeSourceClosureFrame) {
          additional = getClassicalNahuatlVncContinuationAdditionalResults({
            ...additionalResults, attitudeSourceClosureFrame: retainedHonorific,
          });
        }
        selections = {
          ...selections,
          ...(!hasClassicalNahuatlVncContinuationBindingSelection(selections, "lateVariant")
            ? { lateVariant: "preterit-embed" } : {}),
          ...(!hasClassicalNahuatlVncContinuationBindingSelection(selections, "honoredParticipant")
            ? { honoredParticipant: retainedHonorific.operationFrame.operationFacts.honoredParticipant }
            : {}),
        };
      }
      const orderedVoiceChoiceInventory = operationRecognized
        && sourceRecord
        && normalizedOperationId === "vnc:ordered-voice-application"
        ? getClassicalNahuatlVncContinuationOrderedVoiceChoiceInventory(
          sourceRecord,
        )
        : null;
      const reflexiveSource = sourceRecord?.continuationSourceProjection;
      const reflexiveMeaning = normalizedOperationId === "vnc:application"
        && reflexiveSource?.sourceValence === "mainline-reflexive"
        && (selections?.requestedDerivation || "direct") === "direct"
        && (selections?.requestedVoice || "active") === "active"
        ? resolveReflexiveInterpretationChoice(
          getClassicalNahuatlVncApplicationRuntimeTarget(), {
            valence: reflexiveSource.sourceValence,
            subject: selections?.subject || reflexiveSource.sourceSubject,
            stem: reflexiveSource.sourceStem,
            requestedValue: selections?.objectInterpretation,
          },
        ) : null;
      const initialBlockReason = !operationRecognized
        ? "classical-vnc-continuation-binding-operation-not-recognized"
        : !sourceRecord
          ? "classical-vnc-continuation-exact-issued-result-required"
          : !selections
            ? "classical-vnc-continuation-selections-must-be-an-object"
            : rejectedAuthorityFields.length
              ? "classical-vnc-continuation-caller-authority-rejected"
              : sourceFieldOverride
                ? "classical-vnc-continuation-source-provenance-is-owner-issued"
                : normalizedOperationId === "vnc:application"
                  && ["subjectAnimacy", "subjectHumanness"].some(field => Object.hasOwn(selections, field))
                  ? "classical-vnc-continuation-subject-reference-is-owner-issued"
                : !additional.valid
                  ? additional.blockReason
                  : normalizedOperationId === "vnc:derivational-operation"
                    && ["honorific", "pejorative"].includes(selections.lateOperation)
                    && sourceRecord.continuationInputResult?.operationFrame?.operation === "compound"
                    && additional.ownerFields.attitudeCompoundClosureFrame
                    && additional.ownerFields.attitudeCompoundClosureFrame !== sourceRecord.continuationInputResult
                    ? "compound-attitude-exact-parent-required"
                  : orderedVoiceChoiceInventory?.ownerRejectionProven
                    ? orderedVoiceChoiceInventory.blockReason
                  : reflexiveMeaning && reflexiveMeaning.state !== "licensed"
                    ? reflexiveMeaning.state === "unresolved"
                      ? "classical-vnc-continuation-object-interpretation-owner-unavailable"
                      : "classical-vnc-continuation-object-interpretation-not-licensed"
                  : "";
      let bindingStatus = initialBlockReason ? "rejected" : "choices-required";
      let blockReason = initialBlockReason;
      let requiredChoiceIds = [];
      let requiredResultRoles = [];
      let ownerPreflightInvoked = false;
      let ownerPreflightResult = null;
      let ownerPreflightValidated = false;
      let ownerPreflightAuthorized = false;
      let ownerRequest = null;
      let outerVncApplicationFrame =
        orderedVoiceChoiceInventory?.outerVncApplicationFrame
        || sourceRecord?.outerVncApplicationFrame
        || null;
      let executionArgs = [];
      if (!initialBlockReason) {
        if (normalizedOperationId === "vnc:sentence-result") {
          requiredChoiceIds = [];
        } else if (normalizedOperationId === "vnc:application") {
          requiredChoiceIds = [
            "subject",
            "mood",
            "tense",
            "requestedDerivation",
            "requestedVoice",
          ].filter(selectionId => (
            !hasClassicalNahuatlVncContinuationBindingSelection(
              selections,
              selectionId,
            )
          ));
        } else if (
          normalizedOperationId === "vnc:ordered-voice-application"
        ) {
          requiredChoiceIds = hasClassicalNahuatlVncContinuationBindingSelection(
            selections,
            "operations",
          ) ? [] : ["operations"];
        } else {
          requiredChoiceIds = hasClassicalNahuatlVncContinuationBindingSelection(
            selections,
            "lateOperation",
          ) ? [] : ["lateOperation"];
          if (
            !requiredChoiceIds.length
            && !hasClassicalNahuatlVncContinuationBindingSelection(
              selections,
              "lateVariant",
            )
          ) {
            requiredChoiceIds.push("lateVariant");
          }
          if (
            selections.lateOperation === "reverential"
            && !additional.ownerFields.attitudeSourceClosureFrame
          ) {
            requiredResultRoles.push("attitude-source-closure");
          }
        }
        if (requiredResultRoles.length) {
          bindingStatus = "additional-result-required";
          blockReason = "classical-vnc-continuation-additional-result-required";
        } else if (requiredChoiceIds.length) {
          bindingStatus = "choices-required";
          blockReason = "classical-vnc-continuation-owner-choices-required";
        } else {
          if (normalizedOperationId === "vnc:sentence-result") {
            if (isClassicalNahuatlVncApplicationFrame(sourceRecord.continuationInputResult)
              || sourceRecord.continuationInputResult?.operationFrame?.ruleFamily === "purposive-paradigm"
              || getClassicalNahuatlIssuedCompoundSentenceCoordinate(sourceRecord.continuationInputResult)
              || getClassicalNahuatlIssuedHonorificSentenceCoordinate(sourceRecord.continuationInputResult)
              || getClassicalNahuatlIssuedFrequentativeSentenceCoordinate(sourceRecord.continuationInputResult)
              || getClassicalNahuatlIssuedNonactiveSentenceApplication(sourceRecord.continuationInputResult)
              || getClassicalNahuatlIssuedNominalSentenceApplication(sourceRecord.continuationInputResult)
              || getClassicalNahuatlIssuedDenominalSentenceApplication(sourceRecord.continuationInputResult)) {
              ownerRequest = deepFreezeClassicalNahuatlVncApplicationValue(
                buildClassicalNahuatlVncSentenceEnvelopeSelections(selections),
              );
              ownerPreflightInvoked = true;
              ownerPreflightResult = buildClassicalNahuatlVncSentenceResultFrame(
                sourceRecord.continuationInputResult, selections,
              );
              ownerPreflightValidated = isClassicalNahuatlVncSentenceResultFrame(ownerPreflightResult);
              ownerPreflightAuthorized = ownerPreflightValidated;
              if (ownerPreflightAuthorized) executionArgs = [sourceRecord.continuationInputResult, ownerRequest];
            } else {
            const inherited = buildClassicalNahuatlVncContinuationRecaptureRequest(sourceRecord);
            // Retire stale inherited prefix metadata only at the boundary
            // where actual selections remain distinct from the exact Source.
            // Explicit conflicting top-level or nested prefixes remain intact
            // for the canonical sentence owner to reject.
            const retiredNegativePrefixes = {};
            if (getClassicalNahuatlVncApplicationRequestValue(selections, "sentenceType") === "affirmative-assertion"
              && getClassicalNahuatlVncApplicationRequestValue(selections, "negative") === false) {
              for (const key of ["requestedNegativePrefix", "negativePrefix"]) {
                if (getClassicalNahuatlVncApplicationRequestValue(selections, key) === undefined) {
                  retiredNegativePrefixes[key] = "";
                }
              }
            }
            ownerRequest = inherited
              ? deepFreezeClassicalNahuatlVncApplicationValue({
                ...inherited,
                ...retiredNegativePrefixes,
                ...selections,
                sentenceType: selections.sentenceType || "affirmative-assertion",
              })
              : null;
            ownerPreflightInvoked = Boolean(ownerRequest);
            ownerPreflightResult = ownerRequest
              ? getClassicalNahuatlVncApplicationSharedService().continueFromResult(
                sourceRecord.continuationInputResult, ownerRequest,
              )
              : null;
            ownerPreflightValidated = isClassicalNahuatlVncApplicationFrame(ownerPreflightResult);
            ownerPreflightAuthorized = ownerPreflightValidated
              && ownerPreflightResult.authorizationStatus === "authorized"
              && buildClassicalNahuatlVncSentenceResultFrame(ownerPreflightResult)
                .authorizationStatus === "authorized";
            if (ownerPreflightAuthorized) executionArgs = [ownerPreflightResult];
            }
          } else if (normalizedOperationId === "vnc:application") {
            ownerRequest =
              buildClassicalNahuatlVncContinuationBindingSourceRequest(
                sourceRecord,
                selections,
              );
            ownerPreflightInvoked = true;
            ownerPreflightResult = evaluateClassicalNahuatlVncApplication(
              ownerRequest,
              sourceRecord.continuationInputResult,
            );
            ownerPreflightValidated = isClassicalNahuatlVncApplicationFrame(
              ownerPreflightResult,
            );
            ownerPreflightAuthorized = ownerPreflightValidated
              && ownerPreflightResult.authorizationStatus === "authorized";
            if (ownerPreflightAuthorized) {
              executionArgs = [
                ownerRequest,
                sourceRecord.continuationInputResult,
              ];
            }
          } else if (
            normalizedOperationId === "vnc:ordered-voice-application"
          ) {
            outerVncApplicationFrame =
              getClassicalNahuatlVncContinuationOuterApplicationFrame(
                sourceRecord,
                normalizedOperationId,
              );
            ownerRequest = deepFreezeClassicalNahuatlVncApplicationValue({
              operations: cloneClassicalNahuatlVncApplicationCompactValue(
                selections.operations,
              ),
            });
            ownerPreflightInvoked = Boolean(outerVncApplicationFrame);
            ownerPreflightResult = outerVncApplicationFrame
              ? buildClassicalNahuatlOrderedVoiceVncApplicationFrame(
                outerVncApplicationFrame,
                ownerRequest,
              )
              : null;
            ownerPreflightValidated =
              isClassicalNahuatlOrderedVoiceVncApplicationFrame(
                ownerPreflightResult,
              );
            ownerPreflightAuthorized = ownerPreflightValidated;
            if (ownerPreflightAuthorized) {
              executionArgs = [outerVncApplicationFrame, ownerRequest];
            }
          } else if (sourceRecord.compoundPredicateSourceFrame) {
            const runtimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget();
            const predicateBinding = runtimeTarget.issueClassicalNahuatlCompoundPredicateBindingFrame(sourceRecord.compoundPredicateSourceFrame, selections);
            ownerRequest = predicateBinding.ownerRequest;
            ownerPreflightInvoked = true;
            ownerPreflightResult = predicateBinding.ownerPreflightResult;
            ownerPreflightValidated = runtimeTarget.isClassicalNahuatlClosureFrame?.(ownerPreflightResult) === true;
            ownerPreflightAuthorized = ownerPreflightValidated && ownerPreflightResult.authorizationStatus === "authorized";
            if (ownerPreflightAuthorized) executionArgs = [...predicateBinding.executionArgs];
          } else if (normalizedOperationId === "vnc:derivational-operation"
            && ["honorific", "pejorative"].includes(selections.lateOperation)
            && sourceRecord.continuationInputResult?.operationFrame?.operation === "compound"
            && ["connective-t", "shared-object"].includes(sourceRecord.continuationInputResult.operationFrame.variant)
            && getClassicalNahuatlVncApplicationRuntimeTarget().isClassicalNahuatlClosureFrame?.(
              sourceRecord.continuationInputResult,
            ) === true) {
            const compound = sourceRecord.continuationInputResult;
            // The authenticated compound already supplies both members. Its
            // surface cannot be recaptured as an independently derived stem.
            outerVncApplicationFrame = compound.baseApplicationFrame;
            ownerRequest = deepFreezeClassicalNahuatlVncApplicationValue({
              ...buildClassicalNahuatlVncContinuationBindingSourceRequest(sourceRecord, selections),
              subject: compound.normalizedRequest.subject,
              mood: selections.mood || compound.normalizedRequest.mood,
              tense: selections.tense || compound.normalizedRequest.tense,
              ...additional.ownerFields,
              attitudeCompoundClosureFrame: additional.ownerFields.attitudeCompoundClosureFrame || compound,
              sourceApplicationFrame: outerVncApplicationFrame,
            });
            const runtimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget();
            ownerPreflightInvoked = true;
            ownerPreflightResult = runtimeTarget.evaluateClassicalNahuatlLateVncDerivation(ownerRequest);
            ownerPreflightValidated = runtimeTarget.isClassicalNahuatlClosureFrame?.(ownerPreflightResult) === true;
            ownerPreflightAuthorized = ownerPreflightValidated && ownerPreflightResult.authorizationStatus === "authorized";
            if (ownerPreflightAuthorized) executionArgs = [ownerRequest];
          } else if (normalizedOperationId === "vnc:derivational-operation"
            && selections.lateOperation === "frequentative"
            && sourceRecord.inputResultKind === "late-vnc-closure"
            && sourceRecord.continuationInputResult.operationFrame?.operation === "compound"
            && sourceRecord.continuationInputResult.operationFrame?.variant === "connective-t") {
            const runtimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget();
            const compound = runtimeTarget.reissueClassicalNahuatlCompoundCoordinate?.(
              sourceRecord.continuationInputResult, selections,
            );
            if (runtimeTarget.isClassicalNahuatlClosureFrame?.(compound)
              && compound.authorizationStatus === "authorized") {
              ownerRequest = deepFreezeClassicalNahuatlVncApplicationValue({
                ...selections,
                sourceStem: compound.operationFrame.targetStem,
                verbClass: compound.operationFrame.targetClass,
                sourceValence: compound.operationFrame.targetValence,
                subject: compound.normalizedRequest.subject,
                mood: compound.normalizedRequest.mood,
                tense: compound.normalizedRequest.tense,
                requestedVoice: compound.normalizedRequest.requestedVoice,
                recursiveEmbedClosureFrame: compound,
              });
              ownerPreflightInvoked = true;
              ownerPreflightResult = runtimeTarget.evaluateClassicalNahuatlLateVncDerivation(ownerRequest);
              ownerPreflightValidated = runtimeTarget.isClassicalNahuatlClosureFrame?.(ownerPreflightResult) === true;
              ownerPreflightAuthorized = ownerPreflightValidated && ownerPreflightResult.authorizationStatus === "authorized";
              if (ownerPreflightAuthorized) executionArgs = [ownerRequest];
            } else {
              ownerPreflightResult = compound;
            }
          } else {
            const currentOuterApplication = sourceRecord?.outerVncApplicationFrame;
            let retainedDerivedHonorSource = null;
            if (selections.lateOperation === "honorific"
              && selections.lateVariant === "applicative") {
              let recapture = currentOuterApplication;
              const seen = new Set();
              // Follow only privately issued direct recaptures of the exact
              // parent's machinery. Envelopes keep formation ancestry intact.
              while (isClassicalNahuatlVncApplicationFrame(recapture)
                && recapture.resultFrame.selectedDerivation === "direct"
                && !seen.has(recapture)) {
                seen.add(recapture);
                const parentResult = classicalNahuatlVncContinuationSourceByApplicationFrame
                  .get(recapture)?.sourceResultFrame;
                const parent = classicalNahuatlVncApplicationFrameByResultFrame.get(parentResult);
                if (!isClassicalNahuatlVncApplicationFrame(parent)
                  || recapture.resultFrame.sourceMachineryFrame
                    !== parent.resultFrame.selectedMachineryFrame) break;
                if (["causative", "applicative"].includes(parent.resultFrame.selectedDerivation)) {
                  retainedDerivedHonorSource = parent;
                  break;
                }
                recapture = parent;
              }
            }
            const honorGrammarSource = retainedDerivedHonorSource || currentOuterApplication;
            const derivedHonorificSource =
              normalizedOperationId === "vnc:derivational-operation"
              && selections.lateOperation === "honorific"
              && selections.lateVariant === "applicative"
              && ["causative", "applicative"].includes(
                honorGrammarSource?.resultFrame?.selectedDerivation,
              );
            // The honorific consumes the derived target while retaining the
            // application that issued its causee or beneficiary positions.
            outerVncApplicationFrame = derivedHonorificSource
              ? honorGrammarSource
              :
              getClassicalNahuatlVncContinuationOuterApplicationFrame(
                sourceRecord,
                normalizedOperationId,
              );
            const outerCoordinate = (retainedDerivedHonorSource
              ? currentOuterApplication : outerVncApplicationFrame)?.normalizedRequest || {};
            // Canonical normalized options include legacy curriculum aliases;
            // public execution accepts their semantic fields, not those aliases.
            const {lesson9PrefaceParticle, lesson9IntroductoryModifier,
              ...normalizedSentenceOptions} = outerCoordinate.sentenceOptions || {};
            const continuationSentenceOptions = Object.fromEntries(
              Object.entries(normalizedSentenceOptions).filter(([, value]) => (
                value === true || typeof value === "string" && Boolean(value)
                || Array.isArray(value) && value.length > 0
              )),
            );
            const baseRequest =
              buildClassicalNahuatlVncContinuationBindingSourceRequest(
                sourceRecord,
                {
                  subject: outerCoordinate.subject || "3sg",
                  mood: outerCoordinate.mood || "indicative",
                  tense: outerCoordinate.tense || "present",
                  sentenceOptions: continuationSentenceOptions,
                  ...selections,
                },
              );
            ownerRequest = baseRequest && outerVncApplicationFrame
              ? deepFreezeClassicalNahuatlVncApplicationValue({
                ...baseRequest,
                ...(normalizedOperationId === "vnc:derivational-operation"
                  && selections.lateOperation === "compound"
                  && selections.lateVariant === "connective-t"
                  && getClassicalNahuatlVncApplicationRuntimeTarget().isClassicalNahuatlClosureFrame?.(
                    sourceRecord.continuationInputResult,
                  ) === true
                  && sourceRecord.continuationInputResult.operationFrame
                    ?.operationFacts?.honorificFormationAnalysisFrame?.selectedOption?.compoundPerfectiveAllomorph
                  ? {compoundEmbedAllomorphSourceClosureFrame: sourceRecord.continuationInputResult}
                  : {}),
                ...(normalizedOperationId === "vnc:derivational-operation"
                  && selections.lateOperation === "compound"
                  && selections.compoundRecursiveRole !== "matrix"
                  && !additional.ownerFields.compoundMatrixClosureFrame
                  && !additional.ownerFields.recursiveEmbedClosureFrame
                  && getClassicalNahuatlVncApplicationRuntimeTarget()
                    .isClassicalNahuatlClosureFrame?.(
                      sourceRecord.continuationInputResult,
                    ) === true
                  && sourceRecord.continuationInputResult.operationFrame
                    ?.operation === "compound"
                  ? {
                    // Recapture supplies the finite application; the exact
                    // retained compound supplies the recursive constituent.
                    compoundEmbedClosureFrame:
                      sourceRecord.continuationInputResult,
                  }
                  : {}),
                ...(normalizedOperationId === "vnc:derivational-operation"
                  && selections.lateOperation === "purposive"
                  && !additional.ownerFields.recursiveEmbedClosureFrame
                  && !additional.ownerFields.compoundEmbedClosureFrame
                  && getClassicalNahuatlVncApplicationRuntimeTarget()
                    .isClassicalNahuatlClosureFrame?.(
                      sourceRecord.continuationInputResult,
                    ) === true
                  && sourceRecord.continuationInputResult.operationFrame
                    ?.operation === "compound"
                  ? {
                    // The exact completed compound is the purposive embed;
                    // finite recapture alone loses its recursive constituents.
                    recursiveEmbedClosureFrame:
                      sourceRecord.continuationInputResult,
                  }
                  : {}),
                ...additional.ownerFields,
                sourceApplicationFrame: outerVncApplicationFrame,
              })
              : null;
            const runtimeTarget =
              getClassicalNahuatlVncApplicationRuntimeTarget();
            const evaluator = runtimeTarget
              ?.evaluateClassicalNahuatlLateVncDerivation
              || runtimeTarget?.requestClassicalLateVncOperation;
            ownerPreflightInvoked = Boolean(
              ownerRequest && typeof evaluator === "function",
            );
            ownerPreflightResult = ownerPreflightInvoked
              ? evaluator.call(runtimeTarget, ownerRequest)
              : null;
            ownerPreflightValidated = Boolean(
              typeof runtimeTarget?.isClassicalNahuatlClosureFrame
                === "function"
              && runtimeTarget.isClassicalNahuatlClosureFrame(
                ownerPreflightResult,
              ) === true
            );
            ownerPreflightAuthorized = Boolean(
              ownerPreflightValidated
              && ownerPreflightResult.authorizationStatus === "authorized"
            );
            if (ownerPreflightAuthorized) executionArgs = [ownerRequest];
          }
          if (ownerPreflightAuthorized) {
            bindingStatus = "ready";
            blockReason = "";
          } else {
            const ownerBlockReason = String(
              ownerPreflightResult?.blockReason
              || (!outerVncApplicationFrame
                && normalizedOperationId !== "vnc:application"
                ? "classical-vnc-continuation-outer-application-recapture-required"
                : "classical-vnc-continuation-owner-preflight-rejected"),
            );
            const requirements =
              getClassicalNahuatlVncContinuationPreflightRequirements(
                normalizedOperationId,
                ownerBlockReason,
              );
            requiredChoiceIds = sourceRecord.compoundPredicateSourceFrame && ownerBlockReason === "typed-compound-matrix-required"
              ? ["compoundMatrixStem"] : [...requirements.choiceIds];
            requiredResultRoles = sourceRecord.compoundPredicateSourceFrame && ownerBlockReason === "typed-compound-matrix-required"
              ? [] : [...requirements.resultRoles];
            if (requiredResultRoles.length) {
              bindingStatus = "additional-result-required";
            } else if (requiredChoiceIds.length) {
              bindingStatus = "choices-required";
            } else {
              bindingStatus = "rejected";
            }
            blockReason = ownerBlockReason;
            executionArgs = [];
          }
        }
      }
      // A retained Result has its own authenticated preflight and number
      // coordinate; it does not borrow a typed Source binding's authority.
      const numberRequest = normalizedOperationId === "vnc:application"
        && ownerPreflightValidated && ownerPreflightAuthorized
        ? ownerPreflightResult.normalizedRequest : null;
      const finiteConnectorOptions = projectClassicalNahuatlFiniteConnectorOptions(numberRequest
        && isClassicalNahuatlOptionalFiniteConnectorFrame(ownerPreflightResult.resultFrame?.finalTypedVncSlotFrame, numberRequest));
      const admonitiveNumberFrame = numberRequest
        ? getClassicalNahuatlVncAdmonitiveNumberChoiceFrame(numberRequest) : null;
      const pluralAdmonitive = numberRequest?.mood === "admonitive"
        && numberRequest.tense === "nonpast"
        && String(numberRequest.subject || "").endsWith("pl");
      const selectedEnding = normalizedOperationId === "vnc:application" && selections
        ? buildClassicalNahuatlVncApplicationSentenceOptions(selections).admonitivePluralEnding : "";
      if (bindingStatus === "ready"
        && (pluralAdmonitive && !admonitiveNumberFrame
          || selectedEnding && !admonitiveNumberFrame?.num2Variants.includes(selectedEnding))) {
        bindingStatus = "rejected";
        blockReason = "classical-vnc-continuation-admonitive-plural-ending-not-licensed";
        executionArgs = [];
      }
      requiredChoiceIds = Object.freeze([...new Set(requiredChoiceIds)]);
      requiredResultRoles = Object.freeze([
        ...new Set(requiredResultRoles),
      ]);
      executionArgs = Object.freeze(executionArgs);
      const ownerOperationRejectionProven = Boolean(
        orderedVoiceChoiceInventory?.ownerRejectionProven,
      );
      const sourceAccepted = Boolean(
        sourceRecord && !ownerOperationRejectionProven,
      );
      const authorizationStatus = bindingStatus === "rejected"
        ? "blocked"
        : "authorized";
      const bindingIds = Object.freeze(sourceAccepted
        ? [`${normalizedOperationId}:source-result`]
        : []);
      const ownerChoiceOptionProjection = deepFreezeClassicalNahuatlVncApplicationValue({
        ...(finiteConnectorOptions ? {finiteSingularConnector: finiteConnectorOptions} : {}),
        ...(admonitiveNumberFrame ? {
          admonitivePluralEnding: admonitiveNumberFrame.num2Variants.map(optionId => (
            projectClassicalNahuatlVncTypedSourceApplicationOption(
              "admonitivePluralEnding", { optionId, label: optionId },
            )
          )),
        } : {}),
      });
      const selectedOwnerChoices = Object.freeze({
        ...(finiteConnectorOptions ? {finiteSingularConnector: numberRequest.sentenceOptions.finiteSingularConnector || "silent"} : {}),
        ...(admonitiveNumberFrame ? {
        admonitivePluralEnding: numberRequest.sentenceOptions.admonitivePluralEnding
          || admonitiveNumberFrame.num2,
      } : {}),
      });
      const frame = Object.freeze({
        kind: CLASSICAL_NAHUATL_VNC_CONTINUATION_BINDING_FRAME_KIND,
        version: 1,
        ownerChoiceOptionProjection,
        selectedOwnerChoices,
        authorizationStatus,
        bindingStatus,
        blockReason,
        operationId: normalizedOperationId,
        inputResult: sourceAccepted ? exactInputResult : null,
        exactInputResult: sourceAccepted ? exactInputResult : null,
        inputResultKind: sourceRecord?.inputResultKind || "",
        continuationInputResult:
          sourceRecord?.continuationInputResult || null,
        continuationSourceProjection:
          sourceRecord?.continuationSourceProjection || null,
        outerVncApplicationFrame,
        orderedVoiceBaseOperations:
          orderedVoiceChoiceInventory?.baseOperations
          || Object.freeze([]),
        orderedVoiceLayerChoiceInventory:
          orderedVoiceChoiceInventory?.ownerInventory || null,
        callerSelections: selections
          ? deepFreezeClassicalNahuatlVncApplicationValue(
            cloneClassicalNahuatlVncApplicationCompactValue(selections),
          )
          : Object.freeze({}),
        additionalResultFrames: additional.valid
          ? additional.ownerFields
          : Object.freeze({}),
        suppliedResultRoles: additional.valid
          ? additional.suppliedRoles
          : Object.freeze([]),
        bindingIds,
        requiredChoiceIds,
        requiredResultRoles,
        ownerRequest,
        ownerPreflightInvoked,
        ownerPreflightResult,
        ownerPreflightValidated,
        ownerPreflightAuthorized,
        executionArgs,
        rejectedAuthorityFields,
        ownerChoicesRequired: Boolean(
          requiredChoiceIds.length || requiredResultRoles.length
        ),
        ownerInputAcceptanceProven: sourceAccepted,
        ownerRejectionProven: !sourceRecord
          || ownerOperationRejectionProven,
        exactInputIdentityPreserved: sourceAccepted,
        sourceHistoryPreservedByExactFrameIdentity: sourceAccepted,
        ownerAuthorizationStillRequired: bindingStatus !== "ready",
        sourceStringAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        lessonMetadataAuthority: false,
        storedStateAuthority: false,
        grammarAuthority: false,
      });
      classicalNahuatlVncContinuationBindingFrames.add(frame);
      return frame;
    }
    function isClassicalNahuatlVncContinuationBindingFrame(frame = null) {
      if (
        !frame
        || !classicalNahuatlVncContinuationBindingFrames.has(frame)
        || frame.kind
          !== CLASSICAL_NAHUATL_VNC_CONTINUATION_BINDING_FRAME_KIND
        || frame.version !== 1
        || !CLASSICAL_NAHUATL_VNC_CONTINUATION_BINDING_STATUSES.includes(
          frame.bindingStatus,
        )
        || !["authorized", "blocked"].includes(frame.authorizationStatus)
        || frame.authorizationStatus
          !== (frame.bindingStatus === "rejected"
            ? "blocked"
            : "authorized")
        || !Array.isArray(frame.bindingIds)
        || !Array.isArray(frame.requiredChoiceIds)
        || !Array.isArray(frame.requiredResultRoles)
        || !Array.isArray(frame.suppliedResultRoles)
        || !Array.isArray(frame.executionArgs)
        || !Array.isArray(frame.rejectedAuthorityFields)
        || !Object.isFrozen(frame)
        || !Object.isFrozen(frame.bindingIds)
        || !Object.isFrozen(frame.requiredChoiceIds)
        || !Object.isFrozen(frame.requiredResultRoles)
        || !Object.isFrozen(frame.suppliedResultRoles)
        || !Object.isFrozen(frame.executionArgs)
        || frame.ownerChoicesRequired !== Boolean(
          frame.requiredChoiceIds.length || frame.requiredResultRoles.length
        )
        || frame.ownerAuthorizationStillRequired
          !== (frame.bindingStatus !== "ready")
        || frame.sourceStringAuthority !== false
        || frame.formulaStringAuthority !== false
        || frame.surfaceStringAuthority !== false
        || frame.lessonMetadataAuthority !== false
        || frame.storedStateAuthority !== false
        || frame.grammarAuthority !== false
      ) {
        return false;
      }
      if (!frame.ownerInputAcceptanceProven) {
        return Boolean(
          frame.bindingStatus === "rejected"
          && frame.ownerRejectionProven === true
          && frame.exactInputResult === null
          && frame.inputResult === null
          && frame.bindingIds.length === 0
          && frame.executionArgs.length === 0
          && frame.blockReason
        );
      }
      const sourceRecord = getClassicalNahuatlVncContinuationBindingSource(
        frame.exactInputResult,
        frame.operationId,
      );
      if (
        !sourceRecord
        || frame.ownerRejectionProven !== false
        || frame.inputResult !== frame.exactInputResult
        || frame.continuationInputResult
          !== sourceRecord.continuationInputResult
        || Boolean(
          frame.continuationSourceProjection
          || sourceRecord.continuationSourceProjection
        ) && !areClassicalNahuatlVncApplicationCanonicalValuesEqual(
            frame.continuationSourceProjection,
            sourceRecord.continuationSourceProjection,
          )
        || frame.exactInputIdentityPreserved !== true
        || frame.sourceHistoryPreservedByExactFrameIdentity !== true
        || frame.bindingIds.length !== 1
        || frame.bindingIds[0] !== `${frame.operationId}:source-result`
      ) {
        return false;
      }
      if (frame.bindingStatus !== "ready") {
        return frame.executionArgs.length === 0
          && Boolean(frame.blockReason);
      }
      if (
        frame.authorizationStatus !== "authorized"
        || frame.blockReason !== ""
        || frame.ownerPreflightInvoked !== true
        || frame.ownerPreflightValidated !== true
        || frame.ownerPreflightAuthorized !== true
        || frame.executionArgs.length === 0
      ) {
        return false;
      }
      if (frame.operationId === "vnc:sentence-result") {
        if (isClassicalNahuatlVncApplicationFrame(frame.continuationInputResult)
          || frame.continuationInputResult?.operationFrame?.ruleFamily === "purposive-paradigm"
          || getClassicalNahuatlIssuedCompoundSentenceCoordinate(frame.continuationInputResult)
          || getClassicalNahuatlIssuedHonorificSentenceCoordinate(frame.continuationInputResult)
          || getClassicalNahuatlIssuedFrequentativeSentenceCoordinate(frame.continuationInputResult)
          || getClassicalNahuatlIssuedNonactiveSentenceApplication(frame.continuationInputResult)
          || getClassicalNahuatlIssuedNominalSentenceApplication(frame.continuationInputResult)
          || getClassicalNahuatlIssuedDenominalSentenceApplication(frame.continuationInputResult)) {
          const sentence = frame.ownerPreflightResult;
          const envelope = buildClassicalNahuatlSelectedSentenceEnvelope(
            frame.continuationInputResult, frame.ownerRequest,
          );
          return isClassicalNahuatlVncSentenceResultFrame(sentence)
            && sentence.canonicalSourceFrame === frame.continuationInputResult
            && frame.executionArgs.length === 2
            && frame.executionArgs[0] === frame.continuationInputResult
            && frame.executionArgs[1] === frame.ownerRequest
            && Boolean(envelope)
            && areClassicalNahuatlVncApplicationCanonicalValuesEqual(
              envelope, sentence.sentenceSurfaceFrame,
            );
        }
        const sentence = buildClassicalNahuatlVncSentenceResultFrame(frame.ownerPreflightResult);
        return isClassicalNahuatlVncApplicationFrame(frame.ownerPreflightResult)
          && frame.executionArgs.length === 1
          && frame.executionArgs[0] === frame.ownerPreflightResult
          && sentence.authorizationStatus === "authorized"
          && sentence.sentenceSurfaceFrame?.sentenceSurfaceApplies === true;
      }
      if (frame.operationId === "vnc:application") {
        return isClassicalNahuatlVncApplicationFrame(
          frame.ownerPreflightResult,
        )
          && frame.executionArgs[0] === frame.ownerRequest
          && frame.executionArgs[1] === frame.continuationInputResult;
      }
      if (frame.operationId === "vnc:ordered-voice-application") {
        return isClassicalNahuatlOrderedVoiceVncApplicationFrame(
          frame.ownerPreflightResult,
        )
          && frame.executionArgs[0] === frame.outerVncApplicationFrame
          && frame.executionArgs[1] === frame.ownerRequest;
      }
      const runtimeTarget = getClassicalNahuatlVncApplicationRuntimeTarget();
      return frame.operationId === "vnc:derivational-operation"
        && typeof runtimeTarget?.isClassicalNahuatlClosureFrame === "function"
        && runtimeTarget.isClassicalNahuatlClosureFrame(
          frame.ownerPreflightResult,
        ) === true
        && frame.ownerPreflightResult.authorizationStatus === "authorized"
        && frame.executionArgs[0] === frame.ownerRequest;
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
        CLASSICAL_NAHUATL_VNC_TYPED_SOURCE_APPLICATION_BINDING_FRAME_KIND,
        CLASSICAL_NAHUATL_VNC_TYPED_SOURCE_APPLICATION_BINDING_STATUSES,
        CLASSICAL_NAHUATL_VNC_CONTINUATION_BINDING_FRAME_KIND,
        CLASSICAL_NAHUATL_VNC_CONTINUATION_BINDING_OPERATION_IDS,
        CLASSICAL_NAHUATL_VNC_CONTINUATION_BINDING_STATUSES,
        createClassicalNahuatlVncApplication,
        evaluateClassicalNahuatlVncApplication: service.evaluate,
        getClassicalNahuatlVncContinuationSourceConstituents,
        issueClassicalNahuatlVncTypedSourceApplicationBindingFrame,
        resolveClassicalNahuatlImperfectiveVncSourceFrame,
        isClassicalNahuatlImperfectiveVncSourceFrame,
        isClassicalNahuatlRestrictedContainingVncFiniteResult,
        getClassicalNahuatlImperfectiveVncReloadInputs,
        isClassicalNahuatlImperfectiveVncFiniteResult,
        isClassicalNahuatlImperfectiveTransitiveVncMachineryFrame,
        isClassicalNahuatlImperfectiveVncApplicationFrame,
        resolveClassicalNahuatlPreformedVncSourceFrame,
        isClassicalNahuatlPreformedVncSourceFrame,
        resolveClassicalNahuatlNonactiveCarrierSourceFrame,
        isClassicalNahuatlVncTypedSourceApplicationBindingFrame,
        executeClassicalNahuatlVncTypedSourceApplicationBindingFrame,
        issueClassicalNahuatlVncContinuationBindingFrame,
        isClassicalNahuatlVncContinuationBindingFrame,
        prepareClassicalNahuatlVncParadigmPlan,
        projectClassicalNahuatlVncParadigmCoordinates,
        inflectClassicalNahuatlVncPredicateCoordinate,
        isClassicalNahuatlVncApplicationResultFrame,
        isClassicalNahuatlVncApplicationIssuedResultFrame,
        isClassicalNahuatlVncApplicationIssuedFrame,
        isClassicalNahuatlVncApplicationFrame,
        interpretClassicalNahuatlVncContextualTime,
        isClassicalNahuatlVncContextualTimeFrame,
        interpretClassicalNahuatlVncContextualTimeBatch,
        isClassicalNahuatlVncContextualTimeBatch,
        interpretClassicalNahuatlActiveReflexiveContextualPassiveReading,
        isClassicalNahuatlActiveReflexiveContextualPassiveReadingFrame,
        interpretClassicalNahuatlImpersonalResultReading,
        isClassicalNahuatlImpersonalResultReadingFrame,
        buildClassicalNahuatlExtantDestockalMeaningFrame,
        isClassicalNahuatlExtantDestockalMeaningFrame,
        buildClassicalNahuatlExtantDestockalNounRelationFrame,
        isClassicalNahuatlExtantDestockalNounRelationFrame,
        interpretClassicalNahuatlExtantDestockalReading,
        isClassicalNahuatlExtantDestockalReadingFrame,
        buildClassicalNahuatlVncMeaningPresentationFrame,
        isClassicalNahuatlVncMeaningPresentationFrame,
        buildClassicalNahuatlOrderedVoiceVncApplicationFrame,
        isClassicalNahuatlOrderedVoiceVncApplicationFrame,
        isClassicalNahuatlOrderedVoiceVncMachineryFrame,
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
        CLASSICAL_NAHUATL_VNC_TYPED_SOURCE_APPLICATION_BINDING_FRAME_KIND,
        CLASSICAL_NAHUATL_VNC_TYPED_SOURCE_APPLICATION_BINDING_STATUSES,
        CLASSICAL_NAHUATL_VNC_CONTINUATION_BINDING_FRAME_KIND,
        CLASSICAL_NAHUATL_VNC_CONTINUATION_BINDING_OPERATION_IDS,
        CLASSICAL_NAHUATL_VNC_CONTINUATION_BINDING_STATUSES,
        normalizeClassicalNahuatlVncApplicationRequest,
        getClassicalNahuatlVncApplicationAllowedVoices,
        getClassicalNahuatlVncApplicationPublicAllowedVoices,
        buildClassicalNahuatlVncApplicationNonactiveFormationInventory,
        buildClassicalNahuatlVncApplicationSourceVoiceMachinery,
        getClassicalNahuatlVncApplicationMissingCapabilities,
        createClassicalNahuatlVncApplication,
        evaluateClassicalNahuatlVncApplication,
        getClassicalNahuatlVncContinuationSourceConstituents,
        issueClassicalNahuatlVncTypedSourceApplicationBindingFrame,
        resolveClassicalNahuatlImperfectiveVncSourceFrame,
        isClassicalNahuatlImperfectiveVncSourceFrame,
        isClassicalNahuatlRestrictedContainingVncFiniteResult,
        getClassicalNahuatlImperfectiveVncReloadInputs,
        isClassicalNahuatlImperfectiveVncFiniteResult,
        isClassicalNahuatlImperfectiveTransitiveVncMachineryFrame,
        isClassicalNahuatlImperfectiveVncApplicationFrame,
        resolveClassicalNahuatlPreformedVncSourceFrame,
        isClassicalNahuatlPreformedVncSourceFrame,
        resolveClassicalNahuatlNonactiveCarrierSourceFrame,
        isClassicalNahuatlVncTypedSourceApplicationBindingFrame,
        executeClassicalNahuatlVncTypedSourceApplicationBindingFrame,
        issueClassicalNahuatlVncContinuationBindingFrame,
        isClassicalNahuatlVncContinuationBindingFrame,
        prepareClassicalNahuatlVncParadigmPlan,
        projectClassicalNahuatlVncParadigmCoordinates,
        isClassicalNahuatlVncParadigmPlan,
        isClassicalNahuatlVncParadigmCoordinateFrame,
        isClassicalNahuatlVncApplicationResultFrame,
        isClassicalNahuatlVncApplicationIssuedResultFrame,
        isClassicalNahuatlVncApplicationIssuedFrame,
        isClassicalNahuatlVncApplicationFrame,
        interpretClassicalNahuatlVncContextualTime,
        isClassicalNahuatlVncContextualTimeFrame,
        interpretClassicalNahuatlVncContextualTimeBatch,
        isClassicalNahuatlVncContextualTimeBatch,
        interpretClassicalNahuatlActiveReflexiveContextualPassiveReading,
        isClassicalNahuatlActiveReflexiveContextualPassiveReadingFrame,
        interpretClassicalNahuatlImpersonalResultReading,
        isClassicalNahuatlImpersonalResultReadingFrame,
        buildClassicalNahuatlExtantDestockalMeaningFrame,
        isClassicalNahuatlExtantDestockalMeaningFrame,
        buildClassicalNahuatlExtantDestockalNounRelationFrame,
        isClassicalNahuatlExtantDestockalNounRelationFrame,
        interpretClassicalNahuatlExtantDestockalReading,
        isClassicalNahuatlExtantDestockalReadingFrame,
        buildClassicalNahuatlVncMeaningPresentationFrame,
        isClassicalNahuatlVncMeaningPresentationFrame,
        buildClassicalNahuatlOrderedVoiceVncApplicationFrame,
        isClassicalNahuatlOrderedVoiceVncApplicationFrame,
        isClassicalNahuatlOrderedVoiceVncMachineryFrame,
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
    Object.defineProperty(api,
      "CLASSICAL_NAHUATL_VNC_TYPED_SOURCE_APPLICATION_BINDING_FRAME_KIND", {
        configurable: true,
        enumerable: true,
        get() {
          return CLASSICAL_NAHUATL_VNC_TYPED_SOURCE_APPLICATION_BINDING_FRAME_KIND;
        },
      });
    Object.defineProperty(api,
      "CLASSICAL_NAHUATL_VNC_TYPED_SOURCE_APPLICATION_BINDING_STATUSES", {
        configurable: true,
        enumerable: true,
        get() {
          return CLASSICAL_NAHUATL_VNC_TYPED_SOURCE_APPLICATION_BINDING_STATUSES;
        },
      });
    Object.defineProperty(api,
      "CLASSICAL_NAHUATL_VNC_CONTINUATION_BINDING_FRAME_KIND", {
        configurable: true,
        enumerable: true,
        get() {
          return CLASSICAL_NAHUATL_VNC_CONTINUATION_BINDING_FRAME_KIND;
        },
      });
    Object.defineProperty(api,
      "CLASSICAL_NAHUATL_VNC_CONTINUATION_BINDING_OPERATION_IDS", {
        configurable: true,
        enumerable: true,
        get() {
          return CLASSICAL_NAHUATL_VNC_CONTINUATION_BINDING_OPERATION_IDS;
        },
      });
    Object.defineProperty(api,
      "CLASSICAL_NAHUATL_VNC_CONTINUATION_BINDING_STATUSES", {
        configurable: true,
        enumerable: true,
        get() {
          return CLASSICAL_NAHUATL_VNC_CONTINUATION_BINDING_STATUSES;
        },
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
    api.getClassicalNahuatlVncApplicationSourceInitialIAnalysis = getClassicalNahuatlVncApplicationSourceInitialIAnalysis;
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
    api.isClassicalNahuatlVncApplicationIssuedResultFrame =
      isClassicalNahuatlVncApplicationIssuedResultFrame;
    api.isClassicalNahuatlVncApplicationIssuedFrame =
      isClassicalNahuatlVncApplicationIssuedFrame;
    api.isClassicalNahuatlVncApplicationFrame = isClassicalNahuatlVncApplicationFrame;
    api.interpretClassicalNahuatlVncContextualTime =
      interpretClassicalNahuatlVncContextualTime;
    api.isClassicalNahuatlVncContextualTimeFrame =
      isClassicalNahuatlVncContextualTimeFrame;
    api.interpretClassicalNahuatlVncContextualTimeBatch =
      interpretClassicalNahuatlVncContextualTimeBatch;
    api.isClassicalNahuatlVncContextualTimeBatch =
      isClassicalNahuatlVncContextualTimeBatch;
    api.interpretClassicalNahuatlActiveReflexiveContextualPassiveReading =
      interpretClassicalNahuatlActiveReflexiveContextualPassiveReading;
    api.isClassicalNahuatlActiveReflexiveContextualPassiveReadingFrame =
      isClassicalNahuatlActiveReflexiveContextualPassiveReadingFrame;
    api.interpretClassicalNahuatlImpersonalResultReading =
      interpretClassicalNahuatlImpersonalResultReading;
    api.isClassicalNahuatlImpersonalResultReadingFrame =
      isClassicalNahuatlImpersonalResultReadingFrame;
    api.buildClassicalNahuatlExtantDestockalMeaningFrame =
      buildClassicalNahuatlExtantDestockalMeaningFrame;
    api.isClassicalNahuatlExtantDestockalMeaningFrame =
      isClassicalNahuatlExtantDestockalMeaningFrame;
    api.buildClassicalNahuatlExtantDestockalNounRelationFrame =
      buildClassicalNahuatlExtantDestockalNounRelationFrame;
    api.isClassicalNahuatlExtantDestockalNounRelationFrame =
      isClassicalNahuatlExtantDestockalNounRelationFrame;
    api.interpretClassicalNahuatlExtantDestockalReading =
      interpretClassicalNahuatlExtantDestockalReading;
    api.isClassicalNahuatlExtantDestockalReadingFrame =
      isClassicalNahuatlExtantDestockalReadingFrame;
    api.buildClassicalNahuatlVncMeaningPresentationFrame =
      buildClassicalNahuatlVncMeaningPresentationFrame;
    api.isClassicalNahuatlVncMeaningPresentationFrame =
      isClassicalNahuatlVncMeaningPresentationFrame;
    api.buildClassicalNahuatlOrderedVoiceVncApplicationFrame =
      buildClassicalNahuatlOrderedVoiceVncApplicationFrame;
    api.isClassicalNahuatlOrderedVoiceVncApplicationFrame =
      isClassicalNahuatlOrderedVoiceVncApplicationFrame;
    api.isClassicalNahuatlOrderedVoiceVncMachineryFrame =
      isClassicalNahuatlOrderedVoiceVncMachineryFrame;
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
    api.deriveClassicalNahuatlObsoleteRootVncApplication = whole =>
      getClassicalNahuatlVncApplicationSharedService().deriveObsoleteRootFromResult(whole);
    api.exportClassicalNahuatlVncApplicationRecipe =
      exportClassicalNahuatlVncApplicationRecipe;
    api.getClassicalNahuatlVncApplicationReloadParent = result => {
      const parent = classicalNahuatlVncApplicationFrameByResultFrame.get(result);
      return isClassicalNahuatlVncApplicationIssuedResultFrame(result)
        && isClassicalNahuatlVncApplicationIssuedFrame(parent)
        && parent.resultFrame === result ? parent : null;
    };
    api.prepareClassicalNahuatlVncApplicationRecipeReplay =
      prepareClassicalNahuatlVncApplicationRecipeReplay;
    api.getClassicalNahuatlVncContinuationReloadInputs = getClassicalNahuatlVncContinuationReloadInputs;
    api.getClassicalNahuatlVncRecipeStepExecutionRequest =
      getClassicalNahuatlVncRecipeStepExecutionRequest;
    api.getClassicalNahuatlVncApplicationEditContext = getClassicalNahuatlVncApplicationEditContext;
    api.getClassicalNahuatlVncContinuationSourceConstituents =
      getClassicalNahuatlVncContinuationSourceConstituents;
    api.resolveClassicalNahuatlImperfectiveVncSourceFrame = resolveClassicalNahuatlImperfectiveVncSourceFrame;
    api.isClassicalNahuatlImperfectiveVncSourceFrame = isClassicalNahuatlImperfectiveVncSourceFrame;
    api.isClassicalNahuatlRestrictedContainingVncFiniteResult = isClassicalNahuatlRestrictedContainingVncFiniteResult;
    api.getClassicalNahuatlImperfectiveVncReloadInputs = getClassicalNahuatlImperfectiveVncReloadInputs;
    api.isClassicalNahuatlImperfectiveVncFiniteResult = isClassicalNahuatlImperfectiveVncFiniteResult;
    api.isClassicalNahuatlImperfectiveTransitiveVncMachineryFrame = isClassicalNahuatlImperfectiveTransitiveVncMachineryFrame;
    api.isClassicalNahuatlImperfectiveVncApplicationFrame = isClassicalNahuatlImperfectiveVncApplicationFrame;
    api.resolveClassicalNahuatlPreformedVncSourceFrame = resolveClassicalNahuatlPreformedVncSourceFrame;
    api.isClassicalNahuatlPreformedVncSourceFrame = isClassicalNahuatlPreformedVncSourceFrame;
    api.resolveClassicalNahuatlNonactiveCarrierSourceFrame = resolveClassicalNahuatlNonactiveCarrierSourceFrame;
    api.getClassicalNahuatlVncPassivePatientMachineryProjection = getClassicalNahuatlVncPassivePatientMachineryProjection;
    api.getClassicalNahuatlVncMachineryParticipantProvenance = getClassicalNahuatlVncMachineryParticipantProvenance;
    api.issueClassicalNahuatlVncTypedSourceApplicationBindingFrame =
      issueClassicalNahuatlVncTypedSourceApplicationBindingFrame;
    api.isClassicalNahuatlVncTypedSourceApplicationBindingFrame =
      isClassicalNahuatlVncTypedSourceApplicationBindingFrame;
    api.executeClassicalNahuatlVncTypedSourceApplicationBindingFrame =
      executeClassicalNahuatlVncTypedSourceApplicationBindingFrame;
    api.issueClassicalNahuatlVncContinuationBindingFrame =
      issueClassicalNahuatlVncContinuationBindingFrame;
    api.isClassicalNahuatlVncContinuationBindingFrame =
      isClassicalNahuatlVncContinuationBindingFrame;
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
