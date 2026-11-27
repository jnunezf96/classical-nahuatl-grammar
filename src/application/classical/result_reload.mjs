import {MAX_RESULT_LINK_NODES} from "./compact_result_link.mjs";
import {exportImperfectiveReloadNode,replayImperfectiveReloadNode} from "./reload_imperfective.mjs";
import {exportFormedReloadNode,replayFormedReloadNode} from "./reload_formed.mjs?placeReload=20261027-2";
import {exportNameReloadNode,replayNameReloadNode} from "./reload_names.mjs?ownerDecision=20261031-2";
import {exportConstructedReloadNode,replayConstructedReloadNode} from "./reload_constructed.mjs";
import {exportComparisonReloadNode,replayComparisonReloadNode} from "./reload_comparison.mjs";
import {exportNominalCompoundReloadNode, replayNominalCompoundReloadNode, supportsNominalCompoundResultReload} from "./reload_nominal_compound.mjs?nominalReload=20261024-4";
export {supportsNominalCompoundResultReload};
import {exportNncContextReloadNode, replayNncContextReloadNode, isNncReloadEvidence, NNC_RELOAD_SOURCE_KEYS, reissueNncReloadSource} from "./reload_nnc_context.mjs";
import {exportClauseContextReloadNode, replayClauseContextReloadNode, isClauseReloadEvidence} from "./reload_clause_context.mjs?innerParticle=20261024-1";
import {exportDeverbalReloadNode, replayDeverbalReloadNode, isDeverbalReloadEvidence, exportDeverbalRequestInputs} from "./reload_deverbal.mjs?deverbalReload=20261024-8";
// Reload inputs are recipes, never persisted grammar frames or written answers.
// Each node is reissued by its existing owner in the new runtime.
const KIND = "classical-grammar-result-reload-recipe";
const CARRIER_CHOICES = ["subject","subjectAnimacy","subjectHumanness","patientReferenceId",
  "mood","tense","requestedVoice","requestedDerivation","sentenceOptions"];
const CARRIER_SENTENCE_CHOICES = ["sentenceType","negative","exclamatory","punctuation","punctuationMode",
  "introductoryParticle","introductoryModifier","prefaceParticle","directionalPrefix","antecessive","sentenceAntecessive"];
const SPECIALIZED_FINITE_RESOLVERS = new Map([
  ["restricted-containing","resolveClassicalNahuatlRestrictedContainingVncSourceFrame"],
  ["analytical","resolveClassicalNahuatlAnalyticalVncSourceFrame"],
  ["analytical-imperfective","resolveClassicalNahuatlImperfectiveVncSourceFrame"],
  ["preformed","resolveClassicalNahuatlPreformedVncSourceFrame"],
]);
const NNC_KEYS = ["state", "subject", "metaphoricalUse", "possessor", "includedPossessor", "stemFormation",
  "predicateFormation", "animacy", "singularConnector", "nonspecificHumanForm", "pluralConnector",
  "possessorReduplication", "sentenceType", "polarity"];
const COMPOUND_SOURCE_KEYS = ["embedStem", "embedClass", "embedSourceClass", "matrixStem", "matrixClass", "matrixSourceClass"];
const COMPOUND_CHOICE_KEYS = ["structure", "state", "subject", "possessor", "animacy", "embedRole", "possessorOrientation", "bracketing", "reduplication", "reduplicationTarget"];
const UNIQUE_KEYS = ["lexicalStatus", "position", "sourceStem", "meaningCertainty", "historicalSource", "sourceBoundaries", "relatedFormations"];
const uniqueAnalysis = value => exact(value, UNIQUE_KEYS)
  && UNIQUE_KEYS.filter(key => !["sourceBoundaries", "relatedFormations"].includes(key)).every(key => value[key] === undefined || typeof value[key] === "string")
  && ["sourceBoundaries", "relatedFormations"].every(key => Array.isArray(value[key]) && value[key].length <= 32 && value[key].every(item => typeof item === "string"));
const PRIMITIVE_ADVERBIAL_KEYS = ["predicateKind", "sourceStem", "verbClass", "sourceValence",
  "tense", "sourceInitialISelection", "possessor"];
const CONTEXT_KEYS = ["precedingParticle", "negativeParticle", "stressPartner",
  "requestedVariant", "sentencePosition", "clauseType", "negationScope"];
const ADJECTIVAL_KEYS = ["topology", "order", "adjunctor", "linkRole", "compoundHeadTarget"];
const ADJUNCTION_KEYS = ["semanticRelation", "adverbializationDegree", "structureKind",
  "adjoinedUnitType", "order", "recursion", "marking", "contrast", "timeProfile",
  "conditionType", "purposeType", "concessionType", "explicitAdverbialIndicator",
  "principalCorroboratingAdverbial", "conditionalCuePresent"];
const CONJUNCTION_FACT_KEYS = ["semanticGroup", "shortPronominal", "collectiveReference", "namedPartnerEligible",
  "maleBondingStem", "demonstrativeKind", "interrogativeKind", "antecessiveOrder", "mood", "tense", "sentenceKind"];
const CONJUNCTION_OPTION_KEYS = ["contextualSilentFirstPerson", "relation", "coordinationType", "level", "polarity", "rightwardModifier",
  "modifierAdjunctor", "sharedModifierScope", "sharedModifier", "leftContextAbsent", "markedAdjoinedException",
  "adjoinedFunction", "identicalAdjoinedClauseEllipsis", "boundaryPunctuation", "correlationType", "pattern",
  "lexicalType", "adjunctorDistribution", "stateRealization", "parallelType", "rephraseAxis", "appositiveType"];
const NNC_SENTENCE_KEYS = ["sentenceType", "polarity", "negativePrefix", "predicateKind"];
const pick = (value, keys) => Object.fromEntries(keys.filter(key =>
  ["string", "boolean", "number"].includes(typeof value?.[key])).map(key => [key, value[key]]));
const plain = (value, keys) => value && typeof value === "object" && !Array.isArray(value)
  && Object.keys(value).every(key => keys.includes(key)
    && ["string", "boolean", "number"].includes(typeof value[key]));
const exact = (value, keys) => value && typeof value === "object" && !Array.isArray(value)
  && Object.keys(value).every(key => keys.includes(key));
const DIRECT_LATE_OPERANDS = new Map([
  ["compound", ["recursiveEmbedClosureFrame", "compoundEmbedClosureFrame", "compoundMatrixClosureFrame", "compoundMatrixVncResultFrame",
    "compoundEmbedAllomorphSourceClosureFrame"]],
  ["reverential", ["attitudeSourceClosureFrame"]],
  ["honorific", ["attitudeCompoundClosureFrame", "attitudeMemberTransformationFrame"]],
  ["pejorative", ["attitudeCompoundClosureFrame", "attitudeMemberTransformationFrame"]],
]);
const LATE_OPERANDS = ["recursiveEmbedClosureFrame","compoundEmbedClosureFrame","compoundMatrixClosureFrame",
  "compoundMatrixVncResultFrame","attitudeSourceClosureFrame","attitudeCompoundClosureFrame","attitudeMemberTransformationFrame"];
function lateContinuationChoices(value) {
  if (!value || typeof value !== "object" || Array.isArray(value) || Object.keys(value).length > 64) return false;
  const scalar = field => typeof field === "string" && field.length <= 4096
    || typeof field === "boolean" || Number.isFinite(field);
  const safeKey = key => !["__proto__","prototype","constructor","kind","version"].includes(key);
  return Object.entries(value).every(([key,field]) => safeKey(key) && (scalar(field)
    || key === "sentenceOptions" && field && typeof field === "object" && !Array.isArray(field)
      && Object.keys(field).length <= 48 && Object.entries(field).every(([option,choice]) =>
        safeKey(option) && (scalar(choice) || option === "outsidePrefixes"
          && Array.isArray(choice) && choice.length <= 12 && choice.every(scalar)))));
}
const finiteSelections = (value, extras = []) => exact(value,[...CARRIER_CHOICES,...extras]) && Object.entries(value).every(([key,choice]) =>
  key === "sentenceOptions" ? plain(choice,CARRIER_SENTENCE_CHOICES)
    : typeof choice === "string" && choice.length <= 4096);
const DIRECT_SOURCE_OBJECT_KEYS = ["objectId","objectKind","objectPerson","objectNumber","object","governor","derivationalLevel",
  "silentSpecificObject","shuntlineReflexivePosition","shuntlineReflexiveBoundaryVariant","mainlineLinearPriority",
  "person","animacy","humanness","number","referenceId"];
const COMPOUND_LEXICALIZATION_KEYS = ["lexicalStatus","sourceEmbedStem","sourceMatrixStem",
  "selectedStructure","availableStructures","lexicalMeaningId"];
function directLateInputs(input, connective) {
  if (!input || !(connective ? input.lateOperation === "compound" && input.lateVariant === "connective-t"
    : ["purposive","honorific","pejorative","reverential"].includes(input.lateOperation)
      || input.lateOperation === "compound" && ["shared-object","reflexive-matrix","huītz-carry","accompanying-possession"].includes(input.lateVariant))
    || Array.isArray(input) || Object.keys(input).length > 128) return null;
  const scalar = value => typeof value === "string" && value.length <= 4096
    || typeof value === "boolean" || Number.isFinite(value);
  const entries = Object.entries(input).filter(([,value]) => value !== undefined);
  const safeKey = key => !["__proto__", "prototype", "constructor"].includes(key);
  const plainOptions = value => value && Object.getPrototypeOf(value) === Object.prototype
    && Object.keys(value).length <= 64 && Object.entries(value).every(([key, field]) =>
      safeKey(key) && (scalar(field) || key === "outsidePrefixes" && Array.isArray(field) && field.length <= 12 && field.every(scalar)));
  return entries.every(([key,value]) => safeKey(key) && (scalar(value)
    || key === "sentenceOptions" && plainOptions(value)
    || key === "outsidePrefixes" && Array.isArray(value) && value.length <= 12 && value.every(scalar)
    || key === "sourceObjectRequests" && Array.isArray(value) && value.length <= 12
      && value.every(object => exact(object,DIRECT_SOURCE_OBJECT_KEYS) && Object.values(object).every(scalar))
    || key === "compoundLexicalizationAnalysis" && exact(value,COMPOUND_LEXICALIZATION_KEYS)
      && Object.entries(value).every(([field,choice]) => field === "availableStructures"
        ? Array.isArray(choice) && choice.length <= 2 && choice.every(item => typeof item === "string" && scalar(item))
        : typeof choice === "string" && scalar(choice))))
    ? Object.fromEntries(entries) : null;
}
const ATTESTED_RELOAD = new Map([
  ["nnc:attested-cell", ["attested-cell", "NncCell", ["possessor"]]],
  ["nnc:attested-place", ["attested-place", "Place", []]],
  ["clause:attested-collocation", ["attested-collocation", "PrincipalCollocation", []]],
]);
const issued = (r, value) => {
  const capture = r.captureClassicalGrammarApplicationResult?.(value, "reload-inputs");
  return r.isClassicalGrammarApplicationResultCapture?.(capture, "reload-inputs")
    && capture.applicationResult.authorizationStatus === "authorized" ? capture : null;
};

// This supported late family retains a real input edge rather than embedding
// another independent copy of its entire parent's recipe.
function futureObjectReloadStep(r, result) {
  if (r.isClassicalNahuatlClosureFrame?.(result) !== true
    || result.authorizationStatus !== "authorized"
    || result.operationFrame?.operation !== "compound"
    || result.operationFrame.variant !== "future-embed") return null;
  const step = r.exportClassicalNahuatlVncApplicationRecipe?.(result)?.steps?.at(-1);
  return step?.operationId === "vnc:derivational-operation"
    && step.request?.lateOperation === "compound"
    && step.request.lateVariant === "future-embed" ? step : null;
}
export const supportsFutureObjectResultReload = (r, result) => Boolean(
  issued(r, result) && futureObjectReloadStep(r, result));
const sameInputs = (a,b) => a === b || Boolean(a && b && typeof a === "object" && typeof b === "object"
  && Array.isArray(a) === Array.isArray(b) && Object.keys(a).length === Object.keys(b).length
  && Object.keys(a).every(key => Object.hasOwn(b,key) && sameInputs(a[key],b[key])));

// A restoration acknowledgement is presentation only. Authenticate the made
// Result, exact parent and current owner packet before comparing input choices.
// No surface string, persisted receipt or equal-looking Source proves identity.
export function matchesAcceptedVncContinuationBuild(r, result, binding, position) {
  const nominal = supportsNominalCompoundResultReload(r,result);
  const retainedWhole = nominal && r.getClassicalNahuatlVncContinuationSourceConstituents?.(result.baseApplicationFrame)?.canonicalNominalSourceResultFrame;
  if (!issued(r,result) || !(futureObjectReloadStep(r,result) || nominal)
    || r.isClassicalNahuatlVncContinuationBindingFrame?.(binding) !== true
    || binding.bindingStatus !== "ready" || binding.operationId !== "vnc:derivational-operation"
    || (nominal ? retainedWhole !== binding.exactInputResult
      || r.getClassicalNahuatlVncContinuationSourceConstituents?.(binding.outerVncApplicationFrame)?.canonicalNominalSourceResultFrame !== retainedWhole
      : binding.outerVncApplicationFrame !== result.baseApplicationFrame
        || binding.ownerRequest?.sourceApplicationFrame !== result.baseApplicationFrame)
    || position?.construction?.sourcePending
    || position?.construction?.source !== binding.exactInputResult
    || position.construction.route?.operation !== binding.operationId) return false;
  const packet = position.execution, pending = binding.ownerPreflightResult;
  if (packet?.kind !== "request" || packet.source !== binding.exactInputResult
    || packet.operation !== binding.operationId || packet.layers?.length || packet.sentenceOptions
    || packet.request?.operationId !== binding.operationId
    || packet.request.args?.length !== binding.executionArgs.length
    || !packet.request.args.every((arg,i) => arg === binding.executionArgs[i])
    || r.isClassicalNahuatlClosureFrame?.(pending) !== true
    || (nominal
      ? r.getClassicalNahuatlVncContinuationSourceConstituents?.(pending.baseApplicationFrame)?.canonicalNominalSourceResultFrame !== retainedWhole
      : pending.baseApplicationFrame !== result.baseApplicationFrame)) return false;
  return sameInputs(result.normalizedRequest,pending.normalizedRequest)
    && sameInputs(result.finalTypedVncSlotFrame,pending.finalTypedVncSlotFrame)
    && sameInputs(r.exportClassicalNahuatlVncApplicationRecipe(result),
      r.exportClassicalNahuatlVncApplicationRecipe(pending));
}

export function matchesAcceptedNominalCompoundBuild(r, result, position) {
  if (!issued(r,result) || position?.construction?.sourcePending) return false;
  const original = r.getClassicalNahuatlNominalCompoundReloadInputs?.(result);
  const packet = position.execution;
  if (!original || packet?.kind !== "request" || packet.operation !== "grammar:nominal-construction"
    || packet.source !== position.construction.source || packet.request?.operationId !== packet.operation
    || packet.request.args?.length !== 1 || packet.layers?.length || packet.sentenceOptions) return false;
  function same(a,b,depth=0) {
    if (a===b) return true;
    if (depth>24 || !a || !b || typeof a!=="object" || typeof b!=="object") return false;
    if (issued(r,a) || issued(r,b)) return false;
    const keys=Object.keys(a).filter(key=>a[key]!==undefined), other=Object.keys(b).filter(key=>b[key]!==undefined);
    return keys.length===other.length && keys.every(key=>other.includes(key) && same(a[key],b[key],depth+1));
  }
  return same(original,packet.request.args[0]);
}

export function exportClassicalResultReloadRecipe(r, roots = {}, normalizePrimitiveNnc = false) {
  const nodes = [], indices = new Map(), visiting = new Set();
  function visit(value, depth = 0) {
    if (indices.has(value)) return indices.get(value);
    if (!value || depth + nodes.length >= MAX_RESULT_LINK_NODES || visiting.has(value)) throw new Error("unsupported reload graph");
    const capture = issued(r, value);
    const selectedSentence = r.getClassicalNahuatlVncSelectedSentenceReloadInputs?.(value);
    const allomorphBinding = r.getClassicalNahuatlCompoundAllomorphBindingForSource?.(value);
    if (!capture && !allomorphBinding && !selectedSentence && !isNncReloadEvidence(r,value) && !isClauseReloadEvidence(r,value)
      && !isDeverbalReloadEvidence(r,value)) throw new Error("issued reload Result required");
    visiting.add(value);
    // An ordinary nucleus can be issued directly by Source analysis or have
    // its own application receipt after replay. For primitive-input receipt
    // comparison, use the same owner inputs for these two genuine origins.
    const primitiveNnc = normalizePrimitiveNnc
      && r.isClassicalNahuatlOrdinaryNncResult?.(value) === true
      && r.isClassicalNahuatlOrdinaryNncSourceFrame?.(value.sourceFrame) === true
      && !r.getClassicalNahuatlLexicalizedPresentNncSourceParent?.(value.sourceFrame)
      && !value.sourceFrame.compoundSource && !value.sourceFrame.sourceConstituents?.length;
    let node = primitiveNnc ? {type:"nnc:ordinary",source:pick(value.sourceFrame,NNC_RELOAD_SOURCE_KEYS),
      choices:{...pick(value.operationFrame,NNC_KEYS),animacy:value.operationFrame.referentialAnimacy,
        humanness:value.operationFrame.referentialHumanness}}
      : exportFormedReloadNode(r,value,child=>visit(child,depth+1))
      ?? exportImperfectiveReloadNode(r,value)
      ?? exportNameReloadNode(r,value,child=>visit(child,depth+1))
      ?? exportComparisonReloadNode(r,value,child=>visit(child,depth+1))
      ?? exportDeverbalReloadNode(r,value,child=>visit(child,depth+1))
      ?? exportNominalCompoundReloadNode(r,value,child=>visit(child,depth+1))
      ?? exportNncContextReloadNode(r,value,child=>visit(child,depth+1))
      ?? exportClauseContextReloadNode(r,value,child=>visit(child,depth+1))
      ?? exportConstructedReloadNode(r,value,child=>visit(child,depth+1));
    const vnc = r.exportClassicalNahuatlVncApplicationRecipe?.(value);
    const carrier = r.getClassicalNahuatlNonactiveCarrierReloadInputs?.(value);
    const specialized = r.getClassicalNahuatlSpecializedFiniteReloadInputs?.(value);
    const carrierParent = r.isClassicalNahuatlVncSentenceResultFrame?.(value)
      && r.getClassicalNahuatlNonactiveCarrierReloadInputs?.(value.vncApplicationFrame)
      ? value.vncApplicationFrame : null;
    const specializedParent = r.isClassicalNahuatlVncSentenceResultFrame?.(value)
      && r.getClassicalNahuatlSpecializedFiniteReloadInputs?.(value.vncApplicationFrame)
      ? value.vncApplicationFrame : null;
    const late = r.getClassicalNahuatlDirectLateReloadInputs?.(value);
    const continuedLate = r.getClassicalNahuatlLateContinuationReloadInputs?.(value);
    const predicate = late?.compoundPredicateSourceFrame;
    const connective = late?.inputs?.lateOperation === "compound" && late.inputs.lateVariant === "connective-t";
    const lateRequest = directLateInputs(late?.inputs,connective);
    const lateSentenceParent = r.isClassicalNahuatlVncSentenceResultFrame?.(value)
      && (r.getClassicalNahuatlDirectLateReloadInputs?.(value.lateOperationClosureFrame)
        || r.getClassicalNahuatlLateContinuationReloadInputs?.(value.lateOperationClosureFrame)) ? value.lateOperationClosureFrame : null;
    const lexicalParent = capture?.operationId === "nnc:ordinary"
      ? r.getClassicalNahuatlLexicalizedPresentNncSourceParent?.(value.sourceFrame) : null;
    if (selectedSentence && lateContinuationChoices({sentenceOptions:selectedSentence.selections})) {
      node = {type:"vnc:selected-sentence",source:visit(selectedSentence.source,depth+1),
        selections:selectedSentence.selections};
    } else if (node) {}
    else if (allomorphBinding && lateContinuationChoices(allomorphBinding.callerSelections)
      && exact(allomorphBinding.additionalResultFrames,LATE_OPERANDS)) {
      node = {type:"vnc:compound-allomorph-source",source:visit(allomorphBinding.exactInputResult,depth+1),
        selections:allomorphBinding.callerSelections,
        operands:Object.fromEntries(Object.entries(allomorphBinding.additionalResultFrames)
          .map(([role,operand])=>[role,visit(operand,depth+1)]))};
    }
    else if (r.isClassicalNahuatlOrderedVoiceVncApplicationFrame?.(value)) {
      node = {type:"vnc:ordered-voice", source:visit(value.baseApplicationFrame,depth+1),
        operations:value.operations};
    }
    else if (r.isClassicalNahuatlVncSentenceResultFrame?.(value)
      && r.isClassicalNahuatlOrderedVoiceVncApplicationFrame?.(value.orderedVoiceApplicationFrame)) {
      node = {type:"vnc:ordered-voice-sentence",source:visit(value.orderedVoiceApplicationFrame,depth+1)};
    }
    else if (carrier && finiteSelections(carrier.selections)) node = {type:"vnc:nonactive-carrier",...carrier};
    else if (carrierParent) node = {type:"vnc:nonactive-carrier-sentence",source:visit(carrierParent,depth+1)};
    else if (specialized && finiteSelections(specialized.selections,["reading","embedStem","adverbialEntryId","objectSelection"]))
      node = {type:"vnc:specialized-finite",...specialized};
    else if (specializedParent) node = {type:"vnc:specialized-finite-sentence",source:visit(specializedParent,depth+1)};
    else if (continuedLate && lateContinuationChoices(continuedLate.selections) && exact(continuedLate.operands,LATE_OPERANDS)) {
      node = {type:"vnc:late-continuation",source:visit(continuedLate.parent,depth+1),
        selections:continuedLate.selections,
        operands:Object.fromEntries(Object.entries(continuedLate.operands).map(([role,operand])=>[role,visit(operand,depth+1)]))};
    }
    else if (lateRequest) node = {type:connective ? "vnc:direct-connective" : "vnc:direct-late", request:lateRequest,
      ...(late.sourceApplicationFrame ? {source:visit(late.sourceApplicationFrame,depth+1)} : {}),
      ...(predicate ? {predicate:{sourceStem:predicate.sourceStem,
        ...(predicate.canonicalNncResult ? {parent:visit(predicate.canonicalNncResult,depth+1)} : {})}} : {}),
      ...(Object.keys(late.operands).length ? {
        operands:Object.fromEntries(Object.entries(late.operands).map(([role,operand])=>[role,visit(operand,depth+1)]))
      } : {})};
    else if (lateSentenceParent) node = {type:"vnc:direct-late-sentence",source:visit(lateSentenceParent,depth+1)};
    else if (lexicalParent && r.isClassicalNahuatlOrdinaryNncResult?.(value))
      node = {type:"nnc:lexicalized-present", parent:visit(lexicalParent.canonicalResult,depth+1),
        choices:{...pick(value.operationFrame,NNC_KEYS),animacy:value.operationFrame.referentialAnimacy,
          humanness:value.operationFrame.referentialHumanness}};
    else if (futureObjectReloadStep(r,value)) node = {type: "vnc:future-object",
      source: visit(value.baseApplicationFrame,depth+1), step: futureObjectReloadStep(r,value)};
    else if (vnc) node = { type: "vnc", recipe: vnc };
    else if (r.isClassicalNahuatlClauseConjunctionResultFrame?.(value) === true) {
      const first = value.conjuncts?.[0];
      const originalChild = r.isClassicalNahuatlClauseCompositionSourceFrame?.(first) === true
        ? r.getClassicalNahuatlSupplementationClauseSourceFrame(first.envelope) : first;
      const request = r.buildClassicalNahuatlConjunctReplacementRequest(value, 0, originalChild);
      if (!request || !plain(request.options, CONJUNCTION_OPTION_KEYS)) throw new Error("unsupported conjunction reload context");
      node = {type: "clause:conjunction", operationKind: request.operationKind,
        conjuncts: request.conjuncts.map(child => ({result: visit(child,depth+1)})),
        options: {...request.options},
        ...(request.sharedSupplement ? {sharedSupplement: visit(request.sharedSupplement,depth+1)} : {}),
        ...(request.conjunctorResult ? {conjunctorResult: visit(request.conjunctorResult,depth+1)} : {})};
    } else if (r.isClassicalNahuatlIssuedNncSentenceSurfaceFrame?.(value) === true) {
      const context = r.getClassicalNahuatlOrdinaryNncReinflectionContext?.(value);
      if (!context || value.discourseFrame || value.canonicalNuclearWrittenResult
        || value.contextualFlawedSubjectSourceFrame) throw new Error("unsupported NNC sentence context");
      node = {type: "nnc:sentence", source: visit(context.ordinaryResult, depth + 1),
        choices: pick({...value, sentenceType: value.requestedSentenceType}, NNC_SENTENCE_KEYS)};
    } else if (capture.operationId === "nnc:ordinary"
      && r.isClassicalNahuatlOrdinaryNncResult?.(value)
      && !r.getClassicalNahuatlLexicalizedPresentNncSourceParent?.(value.sourceFrame)
      && !value.sourceFrame.compoundSource && !value.sourceFrame.sourceConstituents?.length) {
      node = { type: "nnc:ordinary", source: pick(value.sourceFrame, NNC_RELOAD_SOURCE_KEYS),
        choices: { ...pick(value.operationFrame, NNC_KEYS),
          animacy: value.operationFrame.referentialAnimacy,
          humanness: value.operationFrame.referentialHumanness } };
    } else if (ATTESTED_RELOAD.has(capture.operationId)) {
      const [, family, fields] = ATTESTED_RELOAD.get(capture.operationId);
      if (!r[`isClassicalNahuatlAttested${family}Result`]?.(value)) throw new Error("Attested Result required");
      node = {type:"attested", operation:capture.operationId, stem:value.sourceFrame.stem,
        choices:pick(value.operationFrame?.effectiveSelections, fields)};
    } else if (capture.operationId === "nnc:quantitative-predicate"
      && r.isClassicalNahuatlQuantitativePredicateResult?.(value)) {
      node = {type:"nnc:quantitative", citation:value.sourceFrame.citation};
    } else if (capture.operationId === "nnc:adverbial"
      && r.isClassicalNahuatlAdverbialNuclearResult?.(value)
      && ["owner-issued-lexical-adverbial-vnc-source", "owner-issued-lexical-adverbial-nnc-source"].includes(value.sourceInputMode)
      && !value.canonicalSourceResult) {
      node = {type:"nnc:lexical-adverb", stem:value.adverbialPotentialFrame.sourceConstituents.stem,
        entry:value.lexicalEntryId, degree:value.operationFrame.degree, scope:value.scope,
        context:pick(value.operationFrame.contextFrame, CONTEXT_KEYS),
        ...(value.canonicalMatrixResult ? {matrix:visit(value.canonicalMatrixResult, depth + 1)} : {}) };
    } else if (capture.operationId === "nnc:adverbial"
      && r.isClassicalNahuatlAdverbialNuclearResult?.(value)
      && r.isClassicalNahuatlPrimitiveAdverbialPotentialFrame?.(value.adverbialPotentialFrame)) {
      const source = r.getClassicalNahuatlPrimitiveAdverbialReloadInputs(value.adverbialPotentialFrame);
      node = { type: "nnc:primitive-adverb", source: pick(source, PRIMITIVE_ADVERBIAL_KEYS),
        degree: value.operationFrame.degree, scope: value.scope,
        context: pick(value.operationFrame.contextFrame, CONTEXT_KEYS),
        ...(value.canonicalMatrixResult ? {matrix:visit(value.canonicalMatrixResult, depth + 1)} : {}) };
    } else if (capture.operationId === "nnc:adverbial"
      && r.isClassicalNahuatlAdverbialNuclearResult?.(value)
      && value.canonicalSourceResult) {
      node = { type: "nnc:adverbial", source: visit(value.canonicalSourceResult, depth + 1),
        degree: value.operationFrame.degree, scope: value.scope, context: pick(value.operationFrame.contextFrame, CONTEXT_KEYS),
        ...(value.canonicalMatrixResult ? {matrix:visit(value.canonicalMatrixResult, depth + 1)} : {}) };
    } else if (capture.operationId === "grammar:nominal-construction"
      && r.isClassicalNahuatlNominalConstructionResult?.(value)
      && value.constructionKind === "compound-nnc") {
      const source = value.sourceFrame, op = value.operationFrame;
      // Replay the supported input analyses; never flatten an unrepresented operation.
      if (!["integrated", "conjunctive"].includes(source.structure)
        || [source.compoundEmbedAnalysisFrame, source.yoEmbedHistoryFrame,
          source.sexDistinctionFrame, source.affinityScopeFrame,
          source.distributiveVarietalFrame, source.adjectivalModificationIncorporationFrame].some(Boolean)
        || value.typedSlotFrame?.subjectNumber === "plural") throw new Error("unsupported compound reload analysis");
      node = { type: "nnc:compound", source: {
        embedStem: source.embedStem, embedClass: source.embedNounClass,
        embedSourceClass: source.embedSourceClass, matrixStem: source.matrixStem,
        matrixClass: source.matrixClass, matrixSourceClass: source.matrixSourceClass,
      }, choices: { ...pick(op, COMPOUND_CHOICE_KEYS), structure: source.structure,
        animacy: value.typedSlotFrame?.subjectAnimacy || "nonanimate" } };
      const unique = source.uniqueCompoundNounstemAnalysisFrames || [];
      if (unique.length) node.unique = unique.map(frame => Object.fromEntries(UNIQUE_KEYS
        .filter(key => frame[key] !== undefined).map(key => [key, frame[key]])));
      for (const [position, result] of [["embed", value.sourceAuthorizationFrame.lexicalFacts.capturedEmbedResult],
        ["matrix", value.sourceAuthorizationFrame.lexicalFacts.capturedMatrixNncResult]]) {
        if (result) {
          if (!r.isClassicalNahuatlOrdinaryNncResult?.(result)
            && !(r.isClassicalNahuatlNominalConstructionResult?.(result) && result.constructionKind === "compound-nnc")) throw new Error("unsupported compound constituent");
          node[position] = visit(result, depth + 1);
        }
      }
    } else if (capture.operationId === "nnc:adjectival-modification"
      && r.isClassicalNahuatlResultFrame?.(value) && !value.discourseSourceContextFrame) {
      const clauses = value.selectedClauses;
      const ref = clause => visit(clause?.sourceResult, depth + 1);
      node = { type: "nnc:adjectival-modification",
        head: ref(clauses.find(clause => clause.role === "head")),
        modifier: ref(clauses.find(clause => clause.role === "modifier")),
        additional: clauses.filter(clause => clause.role.startsWith("modifier-")).map(ref),
        intervening: clauses.filter(clause => clause.role.startsWith("intervening-")).map(ref),
        choices: pick(value.selection, ADJECTIVAL_KEYS),
        additionalLinks: value.selection.modifierLinkRoles.slice(1) };
    } else if (capture.operationId === "clause:adverbial-adjunction"
      && value.supported === true && value.sourceContract) {
      const p = value.ruleProfile;
      node = { type: "clause:adverbial-adjunction",
        principal: visit(value.sourceContract.principal.issuedResult, depth + 1),
        adjoined: visit(value.sourceContract.adjoined.issuedResult, depth + 1),
        choices: pick({ ...p, semanticRelation: p.relation, adverbializationDegree: p.degree,
          structureKind: p.structure, adjoinedUnitType: p.unitType }, ADJUNCTION_KEYS) };
      if (value.sourceContract.marker?.issuedResult) {
        node.marker = visit(value.sourceContract.marker.issuedResult, depth + 1);
      }
    } else throw new Error("unsupported reload operation");
    const index = nodes.length;
    nodes.push(node); indices.set(value, index); visiting.delete(value);
    return index;
  }
  try {
    const rootIds = Object.fromEntries(Object.entries(roots).filter(([, v]) => v)
      .map(([key, value]) => [key, visit(value)]));
    return nodes.length ? { kind: KIND, version: 1, nodes, roots: rootIds } : null;
  } catch { return null; }
}

export function replayClassicalResultReloadRecipe(r, recipe) {
  if (!exact(recipe, ["kind", "version", "nodes", "roots"]) || recipe.kind !== KIND
    || recipe.version !== 1 || !Array.isArray(recipe.nodes) || !recipe.nodes.length
    || recipe.nodes.length > MAX_RESULT_LINK_NODES || !recipe.roots || Array.isArray(recipe.roots)
    || typeof recipe.roots !== "object") return null;
  const results = [];
  const prior = id => Number.isInteger(id) && id >= 0 && id < results.length ? results[id] : null;
  try {
    for (const node of recipe.nodes) {
      let result = replayImperfectiveReloadNode(r,node) ?? replayFormedReloadNode(r,node,prior);
      if (result === undefined) result = replayNameReloadNode(r,node,prior);
      if (result === undefined) result = replayComparisonReloadNode(r,node,prior);
      if (result === undefined) result = replayDeverbalReloadNode(r,node,prior);
      if (result === undefined) result = replayNominalCompoundReloadNode(r,node,prior);
      if (result === undefined) result = replayNncContextReloadNode(r,node,prior);
      if (result === undefined) result = replayClauseContextReloadNode(r,node,prior);
      if (result === undefined) result = replayConstructedReloadNode(r,node,prior);
      if (result !== undefined) { if (!result) return null; }
      else if (node?.type === "vnc:future-object" && exact(node,["type","source","step"])
        && prior(node.source) && node.step?.operationId === "vnc:derivational-operation"
        && node.step.request?.lateOperation === "compound" && node.step.request.lateVariant === "future-embed") {
        const request = r.getClassicalNahuatlVncRecipeStepExecutionRequest(node.step,prior(node.source));
        if (!request) return null;
        const application = r.executeClassicalGrammarApplicationRequest(request);
        if (!r.isClassicalGrammarApplicationResult?.(application)
          || application.authorizationStatus !== "authorized"
          || !futureObjectReloadStep(r,application.canonicalResult)) return null;
        result = application.canonicalResult;
      } else if (node?.type === "vnc" && exact(node, ["type", "recipe"])) {
        const v = node.recipe;
        if (v?.kind !== "classical-nahuatl-vnc-application-reload-recipe" || v.version !== 1
          || !Array.isArray(v.steps) || !v.steps.length || v.steps.length > 512) return null;
        for (const step of v.steps) {
          const request = r.getClassicalNahuatlVncRecipeStepExecutionRequest(step, result);
          if (!request) return null;
          const application = r.executeClassicalGrammarApplicationRequest(request);
          if (!r.isClassicalGrammarApplicationResult(application) || application.authorizationStatus !== "authorized") return null;
          result = application.canonicalResult;
        }
      } else if (node?.type === "clause:conjunction"
        && exact(node, ["type", "operationKind", "conjuncts", "options", "sharedSupplement", "conjunctorResult"])
        && typeof node.operationKind === "string" && plain(node.options, CONJUNCTION_OPTION_KEYS)
        && Array.isArray(node.conjuncts) && node.conjuncts.length > 0 && node.conjuncts.length <= MAX_RESULT_LINK_NODES) {
        if (["sharedSupplement", "conjunctorResult"].some(key => node[key] !== undefined && !prior(node[key]))) return null;
        const conjuncts = node.conjuncts.map(child => {
          if (exact(child, ["result"]) && prior(child.result)) return prior(child.result);
          if (!exact(child, ["source", "facts", "referenceId", "subjectReferenceId", "objectReferenceIds", "possessorReferenceId"])
            || !prior(child.source) || !plain(child.facts, CONJUNCTION_FACT_KEYS)
            || !["referenceId", "subjectReferenceId", "possessorReferenceId"].every(key => typeof child[key] === "string")
            || !child.objectReferenceIds || typeof child.objectReferenceIds !== "object" || Array.isArray(child.objectReferenceIds)
            || !Object.values(child.objectReferenceIds).every(value => typeof value === "string")) throw new Error("invalid conjunct inputs");
          const source = r.buildClassicalNahuatlClauseCompositionSourceFrame(prior(child.source), {
            ...child.facts, referenceId: child.referenceId, subjectReferenceId: child.subjectReferenceId,
            objectReferenceIds: child.objectReferenceIds, possessorReferenceId: child.possessorReferenceId});
          if (r.isClassicalNahuatlClauseCompositionSourceFrame?.(source) !== true) throw new Error("conjunct source rejected");
          return source;
        });
        const application = r.executeClassicalGrammarApplicationRequest({operationId: "clause:composition",
          args: [{operationKind: node.operationKind, conjuncts, options: node.options,
            ...(node.sharedSupplement === undefined ? {} : {sharedSupplement: prior(node.sharedSupplement)}),
            ...(node.conjunctorResult === undefined ? {} : {conjunctorResult: prior(node.conjunctorResult)})}]});
        result = application?.canonicalResult;
      } else if (node?.type === "nnc:sentence"
        && exact(node, ["type", "source", "choices"]) && prior(node.source)
        && r.isClassicalNahuatlOrdinaryNncResult?.(prior(node.source)) === true
        && plain(node.choices, NNC_SENTENCE_KEYS)) {
        const application = r.executeClassicalGrammarApplicationRequest({operationId: "nnc:sentence-surface",
          args: [prior(node.source).typedSlotFrame, node.choices]});
        result = application?.canonicalResult;
      } else if (node?.type === "vnc:nonactive-carrier" && exact(node, ["type","source","selections","projection"])
        && exact(node.source,["enteredStem","valence"]) && node.source.valence === "intransitive"
        && typeof node.source.enteredStem === "string" && node.source.enteredStem.length <= 256
        && finiteSelections(node.selections) && ["application","nucleus"].includes(node.projection)) {
        const source = r.resolveClassicalNahuatlNonactiveCarrierSourceFrame(node.source);
        if (r.isClassicalNahuatlNonactiveCarrierSourceFrame?.(source) !== true) return null;
        const navigator = r.getClassicalGrammarApplicationCapabilityNavigator(source);
        const binding = r.issueClassicalGrammarTypedSourceOperationBindingFrame(navigator,"vnc:application",node.selections);
        const application = r.executeClassicalGrammarTypedSourceOperationBindingFrame(binding)?.canonicalResult;
        if (r.getClassicalNahuatlNonactiveCarrierReloadInputs?.(application)?.projection !== "application") return null;
        result = node.projection === "nucleus" ? application.resultFrame : application;
      } else if (node?.type === "vnc:ordered-voice" && exact(node, ["type","source","operations"])
        && r.isClassicalNahuatlVncApplicationFrame?.(prior(node.source))
        && Array.isArray(node.operations) && node.operations.length > 0 && node.operations.length <= 32
        && node.operations.every(operation => typeof operation === "string" && operation.length <= 128)) {
        result = r.executeClassicalGrammarApplicationRequest({operationId:"vnc:ordered-voice-application",
          args:[prior(node.source), {operations:node.operations}]})?.canonicalResult;
      } else if (node?.type === "vnc:ordered-voice-sentence" && exact(node, ["type","source"])
        && r.isClassicalNahuatlOrderedVoiceVncApplicationFrame?.(prior(node.source))) {
        result = r.executeClassicalGrammarApplicationRequest({
          operationId:"vnc:sentence-result",args:[prior(node.source)],
        })?.canonicalResult;
      } else if (node?.type === "vnc:nonactive-carrier-sentence" && exact(node, ["type","source"])
        && r.getClassicalNahuatlNonactiveCarrierReloadInputs?.(prior(node.source))?.projection === "application") {
        result = r.requestClassicalVncSentenceResultFrame(prior(node.source));
      } else if (node?.type === "vnc:specialized-finite" && exact(node, ["type","family","source","selections","projection"])
        && SPECIALIZED_FINITE_RESOLVERS.has(node.family) && plain(node.source,["enteredStem","valence","sourceLexemeId"])
        && Object.values(node.source).every(field => typeof field === "string" && field.length <= 256)
        && finiteSelections(node.selections,["reading","embedStem","adverbialEntryId","objectSelection"])
        && ["application","nucleus"].includes(node.projection)) {
        const source = r[SPECIALIZED_FINITE_RESOLVERS.get(node.family)]?.(node.source);
        if (!source) return null;
        const navigator = r.getClassicalGrammarApplicationCapabilityNavigator(source);
        const binding = r.issueClassicalGrammarTypedSourceOperationBindingFrame(navigator,"vnc:application",node.selections);
        const application = r.executeClassicalGrammarTypedSourceOperationBindingFrame(binding)?.canonicalResult;
        const inputs = r.getClassicalNahuatlSpecializedFiniteReloadInputs?.(application);
        if (inputs?.projection !== "application" || inputs.family !== node.family) return null;
        result = node.projection === "nucleus" ? application.resultFrame : application;
      } else if (node?.type === "vnc:specialized-finite-sentence" && exact(node, ["type","source"])
        && r.getClassicalNahuatlSpecializedFiniteReloadInputs?.(prior(node.source))?.projection === "application") {
        result = r.requestClassicalVncSentenceResultFrame(prior(node.source));
      } else if (["vnc:late-continuation","vnc:compound-allomorph-source"].includes(node?.type)
        && exact(node,["type","source","selections","operands"])
        && prior(node.source) && lateContinuationChoices(node.selections) && exact(node.operands,LATE_OPERANDS)
        && Object.values(node.operands).every(ref=>prior(ref))) {
        const parent = prior(node.source);
        const operands = Object.fromEntries(Object.entries(node.operands).map(([role,ref])=>[role,prior(ref)]));
        const binding = r.issueClassicalNahuatlVncContinuationBindingFrame("vnc:derivational-operation",parent,node.selections,operands);
        if (binding?.bindingStatus !== "ready" || binding.exactInputResult !== parent) return null;
        if (node.type === "vnc:compound-allomorph-source") {
          const {compoundEmbedAllomorphSourceClosureFrame,sourceApplicationFrame} = binding.ownerRequest;
          if (compoundEmbedAllomorphSourceClosureFrame !== parent
            || r.getClassicalNahuatlCompoundAllomorphBindingForSource?.(sourceApplicationFrame) !== binding) return null;
          result = sourceApplicationFrame;
        } else {
          const application = r.executeClassicalGrammarApplicationRequest({operationId:binding.operationId,args:binding.executionArgs});
          if (application?.authorizationStatus !== "authorized"
            || r.getClassicalNahuatlLateContinuationReloadInputs?.(application.canonicalResult)?.parent !== parent) return null;
          result = application.canonicalResult;
        }
      } else if (node?.type === "vnc:selected-sentence" && exact(node,["type","source","selections"])
        && prior(node.source) && node.selections
        && lateContinuationChoices({sentenceOptions:node.selections})) {
        const source = prior(node.source);
        const application = r.executeClassicalGrammarApplicationRequest({
          operationId:"vnc:sentence-result",args:[source,node.selections],
        });
        result = application?.canonicalResult;
        if (application?.authorizationStatus !== "authorized"
          || r.getClassicalNahuatlVncSelectedSentenceReloadInputs?.(result)?.source !== source) return null;
      } else if (node?.type === "vnc:direct-late-sentence" && exact(node, ["type","source"])
        && (r.getClassicalNahuatlDirectLateReloadInputs?.(prior(node.source))
          || r.getClassicalNahuatlLateContinuationReloadInputs?.(prior(node.source)))) {
        result = r.requestClassicalVncSentenceResultFrame(prior(node.source));
      } else if (["vnc:direct-connective","vnc:direct-late"].includes(node?.type) && exact(node, ["type", "request", "source", "operands", "predicate"])) {
        const request = directLateInputs(node.request,node.type === "vnc:direct-connective");
        if (!request) return null;
        if (node.source !== undefined) {
          const source = prior(node.source);
          if (r.isClassicalNahuatlVncApplicationFrame?.(source) !== true) return null;
          request.sourceApplicationFrame = source;
        }
        let predicate;
        if (node.predicate !== undefined) {
          if (node.type !== "vnc:direct-connective" || node.source !== undefined
            || !exact(node.predicate,["sourceStem","parent"])
            || typeof node.predicate.sourceStem !== "string"
            || node.predicate.sourceStem.length > 4096
            || Object.hasOwn(request,"compoundPredicateSourceFrame")) return null;
          const parent = node.predicate.parent === undefined ? null : prior(node.predicate.parent);
          if (node.predicate.parent !== undefined && !parent) return null;
          predicate = r.buildClassicalNahuatlCompoundPredicateSourceFrame({
            sourceStem:node.predicate.sourceStem,...(parent ? {canonicalNncResult:parent} : {})
          });
          if (!r.isClassicalNahuatlCompoundPredicateSourceFrame(predicate)
            || predicate.canonicalNncResult !== parent) return null;
          request.compoundPredicateSourceFrame = predicate;
        }
        const operands = {};
        if (node.operands !== undefined) {
          if (!exact(node.operands,DIRECT_LATE_OPERANDS.get(request.lateOperation) ?? [])) return null;
          for (const [role,index] of Object.entries(node.operands)) {
            const operand = prior(index);
            if (!operand || Object.hasOwn(request,role)) return null;
            operands[role] = operand;
          }
        }
        const application = r.executeClassicalGrammarApplicationRequest({
          operationId:"vnc:derivational-operation",args:[{...request,...operands}]
        });
        const restored = r.getClassicalNahuatlDirectLateReloadInputs?.(application?.canonicalResult);
        if (application?.authorizationStatus !== "authorized" || !restored
          || restored.compoundPredicateSourceFrame !== predicate
          || Object.entries(operands).some(([role,operand])=>restored.operands[role] !== operand)) return null;
        result = application.canonicalResult;
      } else if (node?.type === "nnc:lexicalized-present" && exact(node, ["type", "parent", "choices"])
        && prior(node.parent) && plain(node.choices, [...NNC_KEYS, "humanness"])) {
        const source = r.buildClassicalNahuatlLexicalizedPresentNncSourceFrame(prior(node.parent));
        if (r.getClassicalNahuatlLexicalizedPresentNncSourceParent?.(source)?.canonicalResult !== prior(node.parent)) return null;
        const navigator = r.getClassicalGrammarApplicationCapabilityNavigator(source);
        const binding = r.issueClassicalGrammarTypedSourceOperationBindingFrame(navigator,"nnc:ordinary",node.choices);
        result = r.executeClassicalGrammarTypedSourceOperationBindingFrame(binding)?.canonicalResult;
      } else if (node?.type === "nnc:ordinary" && exact(node, ["type", "source", "choices"])
        && plain(node.source, NNC_RELOAD_SOURCE_KEYS) && plain(node.choices, [...NNC_KEYS, "humanness"])) {
        const source = reissueNncReloadSource(r,node.source);
        if (Object.hasOwn(node.choices, "animacy")) {
          const navigator = r.getClassicalGrammarApplicationCapabilityNavigator(source);
          const binding = r.issueClassicalGrammarTypedSourceOperationBindingFrame(navigator, "nnc:ordinary", node.choices);
          result = r.executeClassicalGrammarTypedSourceOperationBindingFrame(binding)?.canonicalResult;
        } else {
          const operation = r.issueCanonicalNncOperationFrame(source, node.choices);
          result = r.requestClassicalOrdinaryNncResult(source, operation);
        }
      } else if (node?.type === "nnc:compound"
        && exact(node, ["type", "source", "choices", "unique", "embed", "matrix"])
        && plain(node.source, COMPOUND_SOURCE_KEYS) && plain(node.choices, COMPOUND_CHOICE_KEYS)
        && (node.unique === undefined || Array.isArray(node.unique) && node.unique.length > 0 && node.unique.length <= 2 && node.unique.every(uniqueAnalysis))
        && ["embed", "matrix"].every(position => node[position] === undefined || prior(node[position]))) {
        const source = { ...node.source,
          ...(node.unique === undefined ? {} : { uniqueCompoundNounstemAnalyses: node.unique }) };
        for (const position of ["embed", "matrix"]) {
          if (node[position] === undefined) continue;
          const parent = prior(node[position]);
          const kind = r.isClassicalNahuatlOrdinaryNncResult?.(parent) ? "ordinary-nnc"
            : r.isClassicalNahuatlNominalConstructionResult?.(parent) && parent.constructionKind === "compound-nnc" ? "compound-nnc" : "";
          if (!kind) return null;
          source[`${position}Constituent`] = { kind, stem: source[`${position}Stem`], resultFrame: parent };
        }
        result = r.requestClassicalNominalConstructionResult({ constructionKind: "compound-nnc", ...node.choices, source });
      } else if (node?.type === "attested" && exact(node, ["type", "operation", "stem", "choices"])
        && ATTESTED_RELOAD.has(node.operation) && typeof node.stem === "string" && node.stem.length <= 256) {
        const [sourceUse, family, fields] = ATTESTED_RELOAD.get(node.operation);
        if (!plain(node.choices, fields)) return null;
        const source = r[`resolveClassicalNahuatlAttested${family}SourceFrame`]({enteredStem:node.stem, sourceUse});
        if (!source) return null;
        const binding = r[`issueClassicalNahuatlAttested${family}BindingFrame`](source,node.choices);
        if (binding?.bindingStatus !== "ready") return null;
        result = r.executeClassicalGrammarApplicationRequest({
          operationId:node.operation, args:binding.executionArgs,
        })?.canonicalResult;
      } else if (node?.type === "nnc:quantitative" && exact(node, ["type", "citation"])
        && typeof node.citation === "string" && node.citation.length <= 4096) {
        const source = r.buildClassicalNahuatlQuantitativePredicateSourceFrame({
          citation:node.citation, sourceUse:"quantitative-predicate", reference:"nonanimate-common",
        });
        const binding = r.issueClassicalNahuatlQuantitativePredicateBindingFrame(source);
        if (binding?.bindingStatus !== "ready") return null;
        result = r.executeClassicalGrammarApplicationRequest({
          operationId:"nnc:quantitative-predicate", args:binding.executionArgs,
        })?.canonicalResult;
      } else if (node?.type === "nnc:lexical-adverb" && exact(node, ["type", "stem", "entry", "degree", "scope", "context", "matrix"])
        && ["stem", "entry", "degree", "scope"].every(key => typeof node[key] === "string")
        && node.stem.length <= 4096 && plain(node.context, CONTEXT_KEYS)
        && (node.matrix === undefined || prior(node.matrix))) {
        const adverbialPotentialFrame = r.buildClassicalNahuatlLexicalAdverbialPotentialFrame({stem:node.stem});
        if (adverbialPotentialFrame?.lexicalEntryId !== node.entry) return null;
        result = r.requestClassicalAdverbialNncResult({adverbialPotentialFrame,
          degree:node.degree, scope:node.scope, context:node.context,
          ...(node.matrix === undefined ? {} : {canonicalMatrixResult:prior(node.matrix)})});
      } else if (node?.type === "nnc:primitive-adverb"
        && exact(node, ["type", "source", "degree", "scope", "context", "matrix"])
        && plain(node.source, PRIMITIVE_ADVERBIAL_KEYS)
        && typeof node.degree === "string" && typeof node.scope === "string"
        && plain(node.context, CONTEXT_KEYS)
        && (node.matrix === undefined || prior(node.matrix))) {
        const adverbialPotentialFrame = r.buildClassicalNahuatlPrimitiveAdverbialPotentialFrame(node.source);
        if (!r.isClassicalNahuatlPrimitiveAdverbialPotentialFrame(adverbialPotentialFrame)) return null;
        result = r.requestClassicalAdverbialNncResult({adverbialPotentialFrame,
          degree: node.degree, scope: node.scope, context: node.context,
          ...(node.matrix === undefined ? {} : {canonicalMatrixResult:prior(node.matrix)})});
      } else if (node?.type === "nnc:adverbial" && exact(node, ["type", "source", "scope", "context", "degree", "matrix"])
        && (node.degree === undefined || typeof node.degree === "string")
        && typeof node.scope === "string" && plain(node.context, CONTEXT_KEYS)
        && (node.matrix === undefined || prior(node.matrix)) && prior(node.source)) {
        result = r.requestClassicalAdverbialNncResult({ canonicalSourceResult: prior(node.source),
          scope: node.scope, context: node.context,
          ...(node.degree === undefined ? {} : {degree:node.degree}),
          ...(node.matrix === undefined ? {} : {canonicalMatrixResult:prior(node.matrix)}) });
      } else if (node?.type === "nnc:adjectival-modification"
        && exact(node, ["type", "head", "modifier", "additional", "intervening", "choices", "additionalLinks"])
        && plain(node.choices, ADJECTIVAL_KEYS) && prior(node.head) && prior(node.modifier)
        && [node.additional, node.intervening].every(refs => Array.isArray(refs) && refs.every(prior))
        && Array.isArray(node.additionalLinks) && node.additionalLinks.length === node.additional.length
        && node.additionalLinks.every(role => typeof role === "string")) {
        result = r.executeClassicalGrammarApplicationRequest({
          operationId: node.type,
          args: [{ operationKind: "adjectival-modification", ...node.choices,
            head: prior(node.head), modifier: prior(node.modifier),
            ...(node.additional.length ? { additionalModifiers: node.additional.map(prior),
              additionalLinkRoles: node.additionalLinks } : {}),
            ...(node.intervening.length ? { interveningClauses: node.intervening.map(prior) } : {}) }],
        })?.canonicalResult;
      } else if (node?.type === "clause:adverbial-adjunction"
        && exact(node, ["type", "principal", "adjoined", "marker", "choices"])
        && plain(node.choices, ADJUNCTION_KEYS) && prior(node.principal) && prior(node.adjoined)
        && (node.marker === undefined || prior(node.marker))) {
        result = r.requestClassicalAdverbialAdjunctionResult({ ...node.choices,
          principalClause: prior(node.principal), adjoinedUnit: prior(node.adjoined),
          ...(node.marker === undefined ? {} : { markerUnit: prior(node.marker) }) });
      } else return null;
      if (!issued(r, result) && !r.getClassicalNahuatlCompoundAllomorphBindingForSource?.(result) && !isNncReloadEvidence(r,result) && !isClauseReloadEvidence(r,result) && !isDeverbalReloadEvidence(r,result)) return null;
      results.push(result);
    }
    const roots = Object.fromEntries(Object.entries(recipe.roots).map(([key, id]) => [key, prior(id)]));
    return Object.values(roots).every(Boolean) ? roots : null;
  } catch { return null; }
}

// A raw editor may reissue an equivalent primitive witness on repaint. Compare
// its owner inputs, never its answer. Retained exact operand edits must instead
// use the strict identity path (allowPrimitiveReissue=false).
export function matchesAcceptedDeverbalBuild(r, result, position, allowPrimitiveReissue=false) {
  const original=r.getClassicalNahuatlDeverbalNncReloadInputs?.(result),packet=position?.execution;
  if(!original||position.construction?.sourcePending||position.construction?.route?.operation!=="nnc:deverbal-construction"
    ||packet?.kind!=="request"||packet.operation!=="nnc:deverbal-construction"||packet.source!==position.construction.source
    ||packet.layers?.length||packet.sentenceOptions||packet.request?.operationId!==packet.operation||packet.request.args?.length!==1)return false;
  const request=packet.request.args[0];
  if(request===original)return true;
  if(!allowPrimitiveReissue){
    const ids=new WeakMap();let next=0;
    const encode=value=>JSON.stringify(exportDeverbalRequestInputs(value,operand=>{
      if(!operand||typeof operand!=="object")throw Error("invalid exact operand");
      if(!ids.has(operand))ids.set(operand,++next);return ids.get(operand);
    }));
    try{return encode(original)===encode(request);}catch{return false;}
  }
  try{
    if(r.evaluateClassicalNahuatlDeverbalNnc(request)?.authorizationStatus!=="authorized")return false;
    const stable=value=>Array.isArray(value)?value.map(stable):value&&typeof value==="object"
      ?Object.fromEntries(Object.keys(value).sort().map(key=>[key,stable(value[key])])):value;
    const signature=value=>JSON.stringify(stable(exportDeverbalRequestInputs(value,operand=>{
      const recipe=exportClassicalResultReloadRecipe(r,{source:operand},true);
      if(!recipe)throw Error("unreplayable operand");return recipe;
    })));
    return signature(original)===signature(request);
  }catch{return false;}
}

// Reconstruct an editor over the accepted input, never over its written output.
// Call only after owner replay. Issuing this binding stages choices; it neither
// executes Make nor records a new accepted Result/History step.
export function reissueClassicalAcceptedBuildBinding(r, result, expectedSource = null) {
  if (!issued(r, result)) return null;
  let source, operationId, choices;
  if (r.isClassicalNahuatlOrdinaryNncResult?.(result) === true) {
    source = result.sourceFrame;
    operationId = "nnc:ordinary";
    choices = {...pick(result.operationFrame, NNC_KEYS),
      animacy: result.operationFrame.referentialAnimacy,
      humanness: result.operationFrame.referentialHumanness};
  } else {
    const application = r.isClassicalNahuatlVncSentenceResultFrame?.(result) === true
      ? result.vncApplicationFrame : result;
    if (r.isClassicalNahuatlVncApplicationFrame?.(application) !== true) return null;
    const recipe = r.exportClassicalNahuatlVncApplicationRecipe?.(application);
    // A typed derivation may retain its direct input application as a recipe
    // prefix. Keep that exact machinery, never the completed written stem.
    if (!recipe?.steps?.length || recipe.steps.some(step => step.operationId)) return null;
    const request = recipe.steps.at(-1).request;
    source = application.resultFrame.sourceMachineryFrame;
    operationId = "vnc:application";
    choices = pick(request, ["subject", "mood", "tense", "requestedDerivation",
      "requestedVoice", "derivationOptionId", "nonactiveOptionId", "silentSpecificObject",
      "tlaFusion", "rareThirdCausativeMeaningSupported", "exceptionalSuffixOrderAuthorized"]);
    if (request.requestedDerivation === "causative") Object.assign(choices,
      pick(request, ["causativeObjectKind", "causativeSpecificShuntlineRealization"]));
    if (request.requestedDerivation === "applicative") Object.assign(choices,
      pick(request, ["applicativeObjectKind", "applicativeObjectPerson"]));
    choices.sentenceOptions = request.sentenceOptions;
  }
  if (!source || expectedSource && source !== expectedSource) return null;
  const navigator = r.getClassicalGrammarApplicationCapabilityNavigator?.(source);
  if (r.isClassicalGrammarApplicationCapabilityNavigator?.(navigator) !== true
    || navigator.inputRole !== "exact-owner-issued-source" || navigator.exactSource !== source) return null;
  const binding = r.issueClassicalGrammarTypedSourceOperationBindingFrame?.(navigator, operationId, choices);
  return r.isClassicalGrammarTypedSourceOperationBindingFrame?.(binding) === true
    && binding.bindingStatus === "ready" && binding.exactSource === source
    && binding.navigator === navigator ? binding : null;
}

// Inspect any accepted Result through the same recipe path used by sharing.
// A caller can supply a fresh runtime to check that no session state is needed.
export function inspectClassicalResultLink(r, result, project, replayRuntime = r) {
  const recipe = exportClassicalResultReloadRecipe(r, { result });
  if (!recipe) return { status: "missing-recipe" };
  const reopened = replayClassicalResultReloadRecipe(replayRuntime, JSON.parse(JSON.stringify(recipe)))?.result;
  if (!reopened) return { status: "replay-failed", recipe };

  const original = project(r, result);
  const restored = project(replayRuntime, reopened);
  if (!original || !restored) return { status: "missing-analysis", recipe };
  if (!sameInputs(original, restored)) return { status: "changed-analysis", recipe };
  return { status: "verified", recipe };
}
