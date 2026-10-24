import {exportNominalCompoundReloadNode, replayNominalCompoundReloadNode, supportsNominalCompoundResultReload} from "./reload_nominal_compound.mjs?nominalReload=20261024-4";
export {supportsNominalCompoundResultReload};
import {exportNncContextReloadNode, replayNncContextReloadNode, isNncReloadEvidence} from "./reload_nnc_context.mjs";
import {exportClauseContextReloadNode, replayClauseContextReloadNode, isClauseReloadEvidence} from "./reload_clause_context.mjs?innerParticle=20261024-1";
// Reload inputs are recipes, never persisted grammar frames or written answers.
// Each node is reissued by its existing owner in the new runtime.
const KIND = "classical-grammar-result-reload-recipe";
const SOURCE_KEYS = ["stem", "sourceClass", "embedStem", "matrixStem", "supportiveInitialI"];
const NNC_KEYS = ["state", "subject", "metaphoricalUse", "possessor", "includedPossessor", "stemFormation",
  "predicateFormation", "animacy", "singularConnector", "nonspecificHumanForm", "pluralConnector",
  "possessorReduplication", "sentenceType", "polarity"];
const COMPOUND_SOURCE_KEYS = ["embedStem", "embedClass", "embedSourceClass", "matrixStem", "matrixClass", "matrixSourceClass"];
const COMPOUND_CHOICE_KEYS = ["structure", "state", "subject", "possessor", "animacy", "embedRole", "possessorOrientation", "bracketing", "reduplication", "reduplicationTarget"];
const UNIQUE_KEYS = ["lexicalStatus", "position", "sourceStem", "meaningCertainty", "historicalSource", "sourceBoundaries", "relatedFormations"];
const uniqueAnalysis = value => exact(value, UNIQUE_KEYS)
  && UNIQUE_KEYS.filter(key => !["sourceBoundaries", "relatedFormations"].includes(key)).every(key => value[key] === undefined || typeof value[key] === "string")
  && ["sourceBoundaries", "relatedFormations"].every(key => Array.isArray(value[key]) && value[key].length <= 32 && value[key].every(item => typeof item === "string"));
const CONTEXT_KEYS = ["precedingParticle", "negativeParticle", "stressPartner",
  "requestedVariant", "sentencePosition", "clauseType", "negationScope"];
const ADJUNCTION_KEYS = ["semanticRelation", "adverbializationDegree", "structureKind",
  "adjoinedUnitType", "order", "recursion", "marking", "contrast", "timeProfile",
  "conditionType", "purposeType", "concessionType", "explicitAdverbialIndicator",
  "principalCorroboratingAdverbial", "conditionalCuePresent"];
const CONJUNCTION_FACT_KEYS = ["semanticGroup", "shortPronominal", "collectiveReference", "namedPartnerEligible",
  "maleBondingStem", "demonstrativeKind", "interrogativeKind", "antecessiveOrder", "mood", "tense", "sentenceKind"];
const CONJUNCTION_OPTION_KEYS = ["relation", "coordinationType", "level", "polarity", "rightwardModifier",
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

export function exportClassicalResultReloadRecipe(r, roots = {}) {
  const nodes = [], indices = new Map(), visiting = new Set();
  function visit(value, depth = 0) {
    if (indices.has(value)) return indices.get(value);
    if (!value || depth > 32 || nodes.length >= 128 || visiting.has(value)) throw new Error("unsupported reload graph");
    const capture = issued(r, value);
    if (!capture && !isNncReloadEvidence(r,value) && !isClauseReloadEvidence(r,value)) throw new Error("issued reload Result required");
    visiting.add(value);
    let node = exportNominalCompoundReloadNode(r,value,child=>visit(child,depth+1))
      ?? exportNncContextReloadNode(r,value,child=>visit(child,depth+1))
      ?? exportClauseContextReloadNode(r,value,child=>visit(child,depth+1));
    const vnc = r.exportClassicalNahuatlVncApplicationRecipe?.(value);
    if (node) {}
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
      node = { type: "nnc:ordinary", source: pick(value.sourceFrame, SOURCE_KEYS),
        choices: { ...pick(value.operationFrame, NNC_KEYS),
          animacy: value.operationFrame.referentialAnimacy,
          humanness: value.operationFrame.referentialHumanness } };
    } else if (capture.operationId === "nnc:adverbial"
      && r.isClassicalNahuatlAdverbialNuclearResult?.(value)
      && value.canonicalSourceResult) {
      node = { type: "nnc:adverbial", source: visit(value.canonicalSourceResult, depth + 1),
        scope: value.scope, context: pick(value.operationFrame.contextFrame, CONTEXT_KEYS) };
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
    || recipe.nodes.length > 128 || !recipe.roots || Array.isArray(recipe.roots)
    || typeof recipe.roots !== "object") return null;
  const results = [];
  const prior = id => Number.isInteger(id) && id >= 0 && id < results.length ? results[id] : null;
  try {
    for (const node of recipe.nodes) {
      let result = replayNominalCompoundReloadNode(r,node,prior);
      if (result === undefined) result = replayNncContextReloadNode(r,node,prior);
      if (result === undefined) result = replayClauseContextReloadNode(r,node,prior);
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
        && Array.isArray(node.conjuncts) && node.conjuncts.length > 0 && node.conjuncts.length <= 32) {
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
      } else if (node?.type === "nnc:ordinary" && exact(node, ["type", "source", "choices"])
        && plain(node.source, SOURCE_KEYS) && plain(node.choices, [...NNC_KEYS, "humanness"])) {
        const source = r.issueCanonicalNncSourceFrame(node.source);
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
      } else if (node?.type === "nnc:adverbial" && exact(node, ["type", "source", "scope", "context"])
        && typeof node.scope === "string" && plain(node.context, CONTEXT_KEYS) && prior(node.source)) {
        result = r.requestClassicalAdverbialNncResult({ canonicalSourceResult: prior(node.source),
          scope: node.scope, context: node.context });
      } else if (node?.type === "clause:adverbial-adjunction"
        && exact(node, ["type", "principal", "adjoined", "marker", "choices"])
        && plain(node.choices, ADJUNCTION_KEYS) && prior(node.principal) && prior(node.adjoined)
        && (node.marker === undefined || prior(node.marker))) {
        result = r.requestClassicalAdverbialAdjunctionResult({ ...node.choices,
          principalClause: prior(node.principal), adjoinedUnit: prior(node.adjoined),
          ...(node.marker === undefined ? {} : { markerUnit: prior(node.marker) }) });
      } else return null;
      if (!issued(r, result) && !isNncReloadEvidence(r,result) && !isClauseReloadEvidence(r,result)) return null;
      results.push(result);
    }
    const roots = Object.fromEntries(Object.entries(recipe.roots).map(([key, id]) => [key, prior(id)]));
    return Object.values(roots).every(Boolean) ? roots : null;
  } catch { return null; }
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
