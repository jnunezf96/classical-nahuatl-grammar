import { isDeepStrictEqual } from "node:util";
import { createRuntimeInstance } from "../src/runtime/create_runtime.mjs";
import { inspectClassicalResultLink, encodeVerifiedClassicalResultLink, exportClassicalResultReloadRecipe, replayClassicalResultReloadRecipe } from "../src/application/classical/result_reload.mjs";
import capabilities from "../src/tests/classical_all_25_capability_play_contract.test.js";
import { getClassicalSharedContactLabel } from "../src/ui/composition/structure_design.mjs";

const groups = ["nested", "relations", "finite", "nominal", "public"];
const selectedGroups = process.argv.slice(2);
if (selectedGroups.some(group => !groups.includes(group))) {
  console.error(`Usage: node scripts/audit_result_links.mjs [${groups.join("|")}]...`);
  process.exit(2);
}
const includes = group => !selectedGroups.length || selectedGroups.includes(group);

const instantiate = async () => (await createRuntimeInstance({
  documentObject: { getElementById: () => null, addEventListener() {} },
})).runtimeObject;
const runtime = await instantiate();
const fresh = await instantiate();
const witnesses = new Map();
const requests = new Map();
const instrumented = Object.create(runtime);
Object.defineProperty(instrumented, "captureClassicalGrammarApplicationResult", { value(value, slot) {
  const capture = runtime.captureClassicalGrammarApplicationResult(value, slot);
  if (capture?.authorizationStatus === "authorized" && capture.canonicalResult) {
    witnesses.set(capture.canonicalResult, capture.operationId);
  }
  return capture;
} });
Object.defineProperty(instrumented, "executeClassicalGrammarApplicationRequest", { value(request) {
  const receipt = runtime.executeClassicalGrammarApplicationRequest(request);
  if (receipt?.authorizationStatus === "authorized" && receipt.canonicalResult
    && !["nnc:diagram", "vnc:diagram"].includes(receipt.operationId)) {
    witnesses.set(receipt.canonicalResult, receipt.operationId);
    requests.set(receipt.canonicalResult, request);
  }
  return receipt;
} });
const fixtureResults = capabilities.run(instrumented).summarize();

// Reuse issued parents to exercise recursion without inventing grammar inputs.
for (const [whole, operation] of [...witnesses]) {
  if (operation === "vnc:ordered-voice-application") {
    instrumented.executeClassicalGrammarApplicationRequest({ operationId: "vnc:sentence-result", args: [whole] });
  }
  if (operation !== "nnc:adjectival-modification") continue;
  const modifier = whole.selectedClauses.find(clause => clause.role === "modifier")?.sourceResult;
  instrumented.executeClassicalGrammarApplicationRequest({
    operationId: operation,
    args: [{ operationKind: "adjectival-modification", topology: "ordinary", head: whole, modifier }],
  });
}

// Explore only ready owner bindings. The owner supplies the exact operands
// and still decides whether each proposed continuation can be built.
const seedRequests = [...requests.values()];
const generatedEdges = new Set();
const pendingEdges = new Set();
let pendingBindings = 0;
let blockedBindings = 0;
if (includes("nested")) {
  let frontier = [...witnesses];
  for (let depth = 0; depth < 2; depth++) {
    const existing = new Set(witnesses.keys());
    for (const [parent, parentOperation] of frontier) {
      const navigator = runtime.getClassicalGrammarApplicationCapabilityNavigator(parent);
      for (const operation of navigator?.operations || []) {
        const edge = `${parentOperation} → ${operation.operationId}`;
        const binding = operation.ownerBindingFrame;
        if (!operation.ownerBindingFrameValidated || binding?.bindingStatus !== "ready"
          || !binding.executionArgs?.length) {
          if (operation.ownerChoicesRequired) {
            pendingEdges.add(edge);
            pendingBindings++;
          }
          continue;
        }
        const receipt = instrumented.executeClassicalGrammarApplicationRequest({
          operationId: operation.operationId,
          args: binding.executionArgs,
        });
        if (receipt.authorizationStatus === "authorized") generatedEdges.add(edge);
        else blockedBindings++;
      }
    }
    frontier = [...witnesses].filter(([value]) => !existing.has(value));
  }
}
if (includes("nested")) console.log(`Generated continuations across ${generatedEdges.size} operation pairs from ready bindings`);
if (includes("nested")) console.log(`${pendingBindings} bindings across ${pendingEdges.size} operation pairs require choices or operands; ${blockedBindings} ready executions were blocked`);

// Vary one parent at a time using successful requests as templates. An
// owner-issued frame is opaque, even if it contains further Result objects.
function* operandPaths(value, path = []) {
  if (witnesses.has(value)) {
    yield { path, parent: value };
    return;
  }
  if (!value || typeof value !== "object" || path.length >= 8
    || Object.hasOwn(value, "authorizationStatus")) return;
  for (const [key, child] of Object.entries(value)) {
    yield* operandPaths(child, [...path, key]);
  }
}

function replaceOperand(value, [key, ...rest], replacement) {
  if (key === undefined) return replacement;
  const copy = Array.isArray(value) ? [...value] : { ...value };
  copy[key] = replaceOperand(value[key], rest, replacement);
  return copy;
}

function retainsOperand(value, operand, seen = new Set()) {
  if (value === operand) return true;
  if (!value || typeof value !== "object" || seen.has(value)) return false;
  seen.add(value);
  return Object.values(value).some(child => retainsOperand(child, operand, seen));
}

// Seed a documented incorporable adverbial and an independently issued matrix.
const achi = runtime.issueCanonicalNncSourceFrame({ stem: "achi", sourceClass: "zero" });
const achiNavigator = runtime.getClassicalGrammarApplicationCapabilityNavigator(achi);
const achiBinding = runtime.issueClassicalGrammarTypedSourceOperationBindingFrame(achiNavigator, "nnc:ordinary", {});
const achiReceipt = runtime.executeClassicalGrammarTypedSourceOperationBindingFrame(achiBinding);
instrumented.captureClassicalGrammarApplicationResult(achiReceipt, "audit-incorporable-adverbial");
instrumented.executeClassicalGrammarApplicationRequest({
  operationId: "vnc:application",
  args: [{ sourceStem: "chōca", verbClass: "A", sourceValence: "intransitive",
    subject: "3sg", mood: "indicative", tense: "present", requestedVoice: "active" }],
});

const candidates = [...witnesses];
const templates = seedRequests;
let substitutions = 0;
let acceptedSubstitutions = 0;
let retainedSubstitutions = 0;
if (includes("nested")) {
  for (const request of templates) {
    const paths = [...operandPaths(request.args)];
    for (const { path, parent } of paths) {
      for (const [replacement, operation] of candidates) {
        if (replacement === parent || replacement.kind !== parent.kind
          || operation !== witnesses.get(parent)) continue;
        substitutions++;
        const receipt = instrumented.executeClassicalGrammarApplicationRequest({
          ...request, args: replaceOperand(request.args, path, replacement),
        });
        if (receipt.authorizationStatus === "authorized") {
          acceptedSubstitutions++;
          if (retainsOperand(receipt.canonicalResult, replacement)) retainedSubstitutions++;
        }
      }
    }
  }
}
if (includes("nested")) console.log(`Owners accepted ${acceptedSubstitutions} of ${substitutions} operand substitutions; ${retainedSubstitutions} retain the exact replacement`);

// The adverbial owner publishes its valid degrees and scopes. Incorporated
// forms also need a matrix; try each issued VNC seed and let the owner decide.
let adverbialAttempts = 0;
let adverbialAccepted = 0;
if (includes("relations")) {
  const matrices = candidates.filter(([, operation]) => operation === "vnc:application");
  for (const [source, operation] of candidates) {
    if (!["nnc:ordinary", "vnc:application"].includes(operation)) continue;
    const binding = runtime.issueClassicalGrammarFormationResultBindingFrame("nnc:adverbial", source);
    if (!runtime.isClassicalGrammarFormationResultBindingFrame(binding)
      || binding.authorizationStatus !== "authorized") continue;
    const choices = binding.ownerChoiceOptionProjection;
    for (const degree of choices.degree || []) {
      for (const scope of choices.scope || []) {
        const matrixChoices = scope === "incorporated-predicate" ? matrices : [[null]];
        for (const [matrix] of matrixChoices) {
          adverbialAttempts++;
          const receipt = instrumented.executeClassicalGrammarApplicationRequest({
            operationId: "nnc:adverbial",
            args: [{ canonicalSourceResult: source, degree, scope,
              ...(matrix ? { canonicalMatrixResult: matrix } : {}) }],
          });
          if (receipt.authorizationStatus === "authorized") adverbialAccepted++;
        }
      }
    }
  }
}
if (includes("relations")) console.log(`Owners accepted ${adverbialAccepted} of ${adverbialAttempts} adverbial choices`);

function* adjectivalReadings(base, dependent) {
  const domains = runtime.getClassicalNahuatlAdjectivalModificationChoiceDomains;
  for (const topology of domains(base)?.topologies || []) {
    const chosen = { ...base, topology, dependent };
    const shape = domains(chosen);
    if (!shape) continue;
    for (const order of shape.orders) {
      const ordered = domains({ ...chosen, order });
      for (const adjunctor of ordered.adjunctors) {
        for (const linkRole of ordered.linkRoles) {
          for (const compoundHeadTarget of ordered.compoundHeadTargets) {
            const request = { ...base, topology, order, adjunctor, linkRole, compoundHeadTarget };
            if (topology === "discontinuous") request.interveningClauses = [dependent];
            const links = topology === "cooperating-preposed-nonpreposed" ? ordered.dependentLinkRoles : [null];
            for (const additionalLink of links) {
              yield additionalLink ? { ...request, additionalModifiers: [dependent],
                additionalLinkRoles: [additionalLink] } : request;
            }
          }
        }
      }
    }
  }
}

function* supplementaryReadings(base) {
  const domains = runtime.getClassicalNahuatlSupplementationChoiceDomains;
  for (const referenceMode of domains(base)?.referenceModes || []) {
    const contact = domains({ ...base, referenceMode });
    for (const headRole of contact.headRoles) {
      for (const supplementContactRole of contact.contactRoles) {
        for (const order of contact.orders) {
          yield { ...base, options: { ...base.options, referenceMode, headRole, supplementContactRole, order } };
        }
      }
    }
  }
}

const readingCoverage = new Map();
if (includes("relations")) {
  for (const { operationId, args: [base] } of seedRequests) {
    let readings;
    if (operationId === "nnc:adjectival-modification") {
      const dependent = candidates.find(([value, operation]) => operation === "nnc:sentence-surface"
        && value !== base.head && value !== base.modifier)?.[0];
      if (dependent) readings = adjectivalReadings(base, dependent);
    } else if (operationId === "sentence:supplementation") {
      readings = supplementaryReadings(base);
    }
    if (!readings) continue;
    const coverage = { attempted: 0, accepted: 0 };
    for (const reading of readings) {
      coverage.attempted++;
      const receipt = instrumented.executeClassicalGrammarApplicationRequest({ operationId, args: [reading] });
      if (receipt.authorizationStatus === "authorized") coverage.accepted++;
    }
    const prior = readingCoverage.get(operationId) || { attempted: 0, accepted: 0 };
    readingCoverage.set(operationId, {
      attempted: prior.attempted + coverage.attempted,
      accepted: prior.accepted + coverage.accepted,
    });
  }
  for (const [operationId, coverage] of readingCoverage) {
    console.log(`${operationId}: owners accepted ${coverage.accepted} of ${coverage.attempted} generated readings`);
  }
}
// Follow the same typed Source choice frames as Build. A new selection may
// reveal another required choice, so ask the owner again at each step.
function availableValues(projection) {
  const options = Array.isArray(projection) ? projection : projection?.options || [];
  return options.filter(option => option.availabilityStatus === "available")
    .map(option => option.optionId);
}

let typedVncAccepted = 0;
let typedVncProbes = 0;
const typedVncErrors = new Map();
if (includes("finite")) {
  const finiteSeeds = candidates.filter(([value, operation]) => operation === "vnc:application"
    && value.resultFrame?.sourceMachineryFrame);
  const seenFiniteSources = new Set();
  for (const [parent] of finiteSeeds) {
    const { sourceStem, verbClass, sourceValence, sourceInitialISelection } = parent.normalizedRequest;
    const sourceKey = JSON.stringify([sourceStem, verbClass, sourceValence, sourceInitialISelection]);
    if (seenFiniteSources.has(sourceKey)) continue;
    seenFiniteSources.add(sourceKey);
    const variedDerivations = new Set();
    const source = parent.resultFrame.sourceMachineryFrame;
    const queue = [{ choices: {}, varyFinite: true }];
    const visited = new Set();
    while (queue.length) {
      const { choices, varyFinite } = queue.shift();
      const key = JSON.stringify(choices);
      if (visited.has(key)) continue;
      visited.add(key);
      typedVncProbes++;
      let binding;
      try {
        binding = runtime.issueClassicalNahuatlVncTypedSourceApplicationBindingFrame(source, choices);
      } catch (error) {
        const message = String(error.message || error);
        if (!typedVncErrors.has(message)) {
          console.error(JSON.stringify({ source: parent.normalizedRequest.sourceStem, choices, error: message }));
        }
        typedVncErrors.set(message, (typedVncErrors.get(message) || 0) + 1);
        continue;
      }
      if (!runtime.isClassicalNahuatlVncTypedSourceApplicationBindingFrame(binding)) continue;
      if (binding.bindingStatus === "choices-required") {
        const field = binding.requiredChoiceIds.find(id => !Object.hasOwn(choices, id));
        for (const value of availableValues(binding.choiceOptionProjection[field])) {
          queue.push({ choices: { ...choices, [field]: value }, varyFinite });
        }
        continue;
      }
      if (binding.bindingStatus !== "ready") continue;
      const receipt = instrumented.executeClassicalGrammarApplicationRequest({
        operationId: "vnc:application", args: [binding],
      });
      if (receipt.authorizationStatus === "authorized") typedVncAccepted++;
      const derivation = binding.effectiveSelections.requestedDerivation;
      if (!varyFinite || variedDerivations.has(derivation)) continue;
      variedDerivations.add(derivation);
      for (const field of ["subject", "tense", "requestedVoice"]) {
        for (const value of availableValues(binding.choiceOptionProjection[field])) {
          if (value === binding.effectiveSelections[field]) continue;
          queue.push({ choices: { ...choices, [field]: value }, varyFinite: false });
        }
      }
    }
  }
}
if (includes("finite")) console.log(`Owners accepted ${typedVncAccepted} finite Results from ${typedVncProbes} typed choice probes; ${[...typedVncErrors.values()].reduce((a, b) => a + b, 0)} threw errors`);

// Follow noun choices through the same private binding used by Make.
let nominalAttempts = 0;
let nominalAccepted = 0;
if (includes("nominal")) {
  const nominalSources = new Set(candidates.filter(([, operation]) => operation === "nnc:ordinary")
    .map(([noun]) => noun.sourceFrame).filter(Boolean));
  for (const source of nominalSources) {
    const navigator = runtime.getClassicalGrammarApplicationCapabilityNavigator(source);
    const issue = choices => runtime.issueClassicalGrammarTypedSourceOperationBindingFrame(navigator, "nnc:ordinary", choices);
    const baseline = issue({});
    const queue = [{ choices: {}, vary: true }];
    for (const state of availableValues(baseline?.choiceOptionProjection?.state)) {
      queue.push({ choices: { state }, vary: true });
    }
    const seen = new Set();
    for (let index = 0; index < queue.length; index++) {
      const { choices, vary } = queue[index];
      const key = JSON.stringify(choices);
      if (seen.has(key)) continue;
      seen.add(key);
      nominalAttempts++;
      const binding = issue(choices);
      if (binding?.bindingStatus === "choices-required") {
        const field = binding.requiredChoiceIds.find(id => !Object.hasOwn(choices, id));
        for (const value of availableValues(binding.choiceOptionProjection[field])) queue.push({ choices: { ...choices, [field]: value }, vary });
      } else if (binding?.bindingStatus === "ready") {
        const receipt = runtime.executeClassicalGrammarTypedSourceOperationBindingFrame(binding);
        if (receipt?.authorizationStatus === "authorized") {
          nominalAccepted++;
          instrumented.captureClassicalGrammarApplicationResult(receipt, "audit-nominal-choice");
        }
        if (vary) {
          for (const field of ["subject", "possessor", "predicateFormation", "stemFormation", "pluralConnector"]) {
            for (const value of availableValues(binding.choiceOptionProjection[field])) {
              if (value !== binding.effectiveSelections[field]) {
                queue.push({ choices: { ...choices, [field]: value }, vary: false });
              }
            }
          }
        }
      }
    }
  }
}
if (includes("nominal")) console.log(`Owners accepted ${nominalAccepted} noun Results from ${nominalAttempts} typed choice probes`);

// These public Source uses were added after the original capability fixture.
const publicSources = [
  ["nnc:attested-cell", "NncCell", "attested-cell", "icn-īuh", { possessor: "1sg" }],
  ["nnc:attested-cell", "NncCell", "attested-cell", "icn-īuh", { possessor: "2pl" }],
  ["nnc:attested-place", "Place", "attested-place", "Teticpac", {}],
  ["clause:attested-collocation", "PrincipalCollocation", "attested-collocation", "achi īc", {}],
];
let publicSourcesAccepted = 0;
if (includes("public")) {
  for (const [operationId, family, sourceUse, enteredStem, choices] of publicSources) {
    const source = runtime[`resolveClassicalNahuatlAttested${family}SourceFrame`]({ enteredStem, sourceUse });
    const binding = runtime[`issueClassicalNahuatlAttested${family}BindingFrame`](source, choices);
    if (binding.bindingStatus !== "ready") continue;
    const receipt = instrumented.executeClassicalGrammarApplicationRequest({ operationId, args: binding.executionArgs });
    if (receipt.authorizationStatus === "authorized") publicSourcesAccepted++;
  }
  const quantity = runtime.buildClassicalNahuatlQuantitativePredicateSourceFrame({
    citation: "miyec", sourceUse: "quantitative-predicate", reference: "nonanimate-common",
  });
  const quantityBinding = runtime.issueClassicalNahuatlQuantitativePredicateBindingFrame(quantity);
  if (quantityBinding.bindingStatus === "ready") {
    const receipt = instrumented.executeClassicalGrammarApplicationRequest({
      operationId: "nnc:quantitative-predicate", args: quantityBinding.executionArgs,
    });
    if (receipt.authorizationStatus === "authorized") publicSourcesAccepted++;
  }
}
if (includes("public")) console.log(`Owners accepted ${publicSourcesAccepted} of ${publicSources.length + 1} attested and quantitative Source choices`);

function project(runtime, value) {
  const capture = runtime.captureClassicalGrammarApplicationResult(value, "result-link-audit");
  if (!capture || !runtime.isClassicalGrammarApplicationResultCapture(capture, "result-link-audit")) return null;
  const inner = value.resultFrame;
  return {
    operation: capture.operationId,
    kind: capture.outputKind,
    contact: getClassicalSharedContactLabel(runtime, value),
    orderedVoice: (value.orderedVoiceApplicationFrame || value).operations,
    adjectival: value.selection?.modifierLinkRoles && {
      topology: value.selection.topology,
      order: value.selection.order,
      adjunctor: value.selection.adjunctor,
      links: value.selection.modifierLinkRoles,
      headTarget: value.selection.compoundHeadTarget,
      roles: value.selectedClauses.map(clause => clause.role),
    },
    surface: value.sentenceSurfaceDisplay || value.sentenceSurface || value.surface || value.surfaceRealization
      || value.wordSurface || inner?.surface || inner?.surfaceRealization,
    analysis: value.sentenceFormulaDisplay || value.sentenceFormula || value.formula
      || value.formulaRealization || value.formulaRecord?.formula || inner?.formulaRealization,
  };
}

const counts = new Map();
const changedRecipes = new Map();
const distinctLinks = new Set();
let checkedOperandGraphs = 0;
let changedOperandGraphs = 0;
const jsonPayload = value => value && JSON.parse(JSON.stringify(value));
for (const [result, operation] of witnesses) {
  const check = inspectClassicalResultLink(runtime, result, project, fresh);
  let { status } = check;
  if (status === "verified") {
    const second = exportClassicalResultReloadRecipe(fresh, { result: check.reopened });
    if (!isDeepStrictEqual(jsonPayload(check.recipe), jsonPayload(second))) {
      changedRecipes.set(operation, (changedRecipes.get(operation) || 0) + 1);
      if (changedRecipes.get(operation) === 1) {
        const before = jsonPayload(check.recipe).nodes;
        const after = jsonPayload(second)?.nodes;
        const changed = before.findIndex((node, index) => !isDeepStrictEqual(node, after?.[index]));
        console.error(JSON.stringify({
          operation, status: "recipe-changed-after-reopen",
          initial: before.map(node => node.type), reopened: after?.map(node => node.type),
          firstChangedNode: changed,
          changedFields: Object.keys(before[changed] || {}).filter(key =>
            !isDeepStrictEqual(before[changed][key], after?.[changed]?.[key])),
        }));
      }
    }
    try {
      const address = await encodeVerifiedClassicalResultLink(check.recipe);
      if (!address) status = "compact-address-failed";
      else distinctLinks.add(address);
    } catch {
      status = "compact-address-failed";
    }
  }
  if (status === "verified" && requests.has(result)) {
    const operands = [...new Set([...operandPaths(requests.get(result).args)].map(entry => entry.parent))]
      .filter(parent => parent !== result && retainsOperand(result, parent));
    if (operands.length) {
      checkedOperandGraphs++;
      const names = operands.map((_, index) => `operand${index}`);
      const roots = { result, ...Object.fromEntries(names.map((name, index) => [name, operands[index]])) };
      const graph = exportClassicalResultReloadRecipe(runtime, roots);
      const reopened = graph && replayClassicalResultReloadRecipe(fresh, jsonPayload(graph));
      if (!reopened || names.some(name => !retainsOperand(reopened.result, reopened[name]))) {
        changedOperandGraphs++;
        console.error(JSON.stringify({ operation, status: "nested-operand-identity-changed",
          operands: operands.map(operand => witnesses.get(operand)) }));
      }
    }
  }
  if (status !== "verified") {
    const { surface, analysis } = project(runtime, result) || {};
    console.error(JSON.stringify({
      operation, status, surface, analysis,
      recipeNodes: check.recipe?.nodes.map(node => node.type),
      ...(operation === "vnc:application" ? {
        source: result.normalizedRequest?.sourceStem,
        choices: requests.get(result)?.args[0]?.callerSelections,
      } : {}),
    }));
  }
  const key = `${operation}: ${status}`;
  counts.set(key, (counts.get(key) || 0) + 1);
}
console.log(`Checked ${witnesses.size} accepted Result witnesses using ${distinctLinks.size} distinct short links`);
console.log(`${checkedOperandGraphs - changedOperandGraphs} of ${checkedOperandGraphs} nested Results retained exact reopened operands`);
for (const [operation, count] of changedRecipes) {
  console.log(`${count}\t${operation}: recipe changed after reopen`);
}
for (const [key, count] of [...counts].sort(([left], [right]) => left.localeCompare(right))) {
  console.log(`${count}\t${key}`);
}
const missingCoverage = [
  includes("nested") && (!generatedEdges.size || !retainedSubstitutions),
  includes("relations") && (!adverbialAccepted || !readingCoverage.get("nnc:adjectival-modification")?.accepted
    || !readingCoverage.get("sentence:supplementation")?.accepted),
  includes("finite") && (!typedVncAccepted || typedVncErrors.size),
  includes("nominal") && !nominalAccepted,
  includes("public") && publicSourcesAccepted !== publicSources.length + 1,
].some(Boolean);
if (!checkedOperandGraphs || changedOperandGraphs || changedRecipes.size || fixtureResults.failed || missingCoverage
  || [...counts.keys()].some(key => !key.endsWith(": verified"))) process.exitCode = 1;
