// Reload inputs are recipes, never persisted grammar frames or written answers.
// Each node is reissued by its existing owner in the new runtime.
const KIND = "classical-grammar-result-reload-recipe";
const SOURCE_KEYS = ["stem", "sourceClass", "embedStem", "matrixStem", "supportiveInitialI"];
const NNC_KEYS = ["state", "subject", "metaphoricalUse", "possessor", "includedPossessor", "stemFormation",
  "predicateFormation", "singularConnector", "nonspecificHumanForm", "pluralConnector",
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

export function exportClassicalResultReloadRecipe(r, roots = {}) {
  const nodes = [], indices = new Map(), visiting = new Set();
  function visit(value, depth = 0) {
    if (indices.has(value)) return indices.get(value);
    if (!value || depth > 32 || nodes.length >= 128 || visiting.has(value)) throw new Error("unsupported reload graph");
    const capture = issued(r, value);
    if (!capture) throw new Error("issued reload Result required");
    visiting.add(value);
    let node;
    const vnc = r.exportClassicalNahuatlVncApplicationRecipe?.(value);
    if (vnc) node = { type: "vnc", recipe: vnc };
    else if (capture.operationId === "nnc:ordinary"
      && r.isClassicalNahuatlOrdinaryNncResult?.(value)
      && !r.getClassicalNahuatlLexicalizedPresentNncSourceParent?.(value.sourceFrame)
      && !value.sourceFrame.compoundSource && !value.sourceFrame.sourceConstituents?.length) {
      node = { type: "nnc:ordinary", source: pick(value.sourceFrame, SOURCE_KEYS),
        choices: { ...pick(value.operationFrame, NNC_KEYS),
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
      let result;
      if (node?.type === "vnc" && exact(node, ["type", "recipe"])) {
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
      } else if (node?.type === "nnc:ordinary" && exact(node, ["type", "source", "choices"])
        && plain(node.source, SOURCE_KEYS) && plain(node.choices, [...NNC_KEYS, "humanness"])) {
        const source = r.issueCanonicalNncSourceFrame(node.source);
        const operation = r.issueCanonicalNncOperationFrame(source, node.choices);
        result = r.requestClassicalOrdinaryNncResult(source, operation);
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
      if (!issued(r, result)) return null;
      results.push(result);
    }
    const roots = Object.fromEntries(Object.entries(recipe.roots).map(([key, id]) => [key, prior(id)]));
    return Object.values(roots).every(Boolean) ? roots : null;
  } catch { return null; }
}
