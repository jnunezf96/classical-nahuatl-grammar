import { createRuntimeInstance } from "../src/runtime/create_runtime.mjs";
import { inspectClassicalResultLink } from "../src/application/classical/result_reload.mjs";
import { encodeCompactResultAddress, decodeCompactResultAddress } from "../src/application/classical/compact_result_link.mjs";
import capabilities from "../src/tests/classical_all_25_capability_play_contract.test.js";
import { isDeepStrictEqual } from "node:util";
import { getClassicalSharedContactLabel } from "../src/ui/composition/structure_design.mjs";

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
console.log(`Generated continuations across ${generatedEdges.size} operation pairs from ready bindings`);
console.log(`${pendingBindings} bindings across ${pendingEdges.size} operation pairs require choices or operands; ${blockedBindings} ready executions were blocked`);

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
console.log(`Owners accepted ${acceptedSubstitutions} of ${substitutions} operand substitutions; ${retainedSubstitutions} retain the exact replacement`);

// The adverbial owner publishes its valid degrees and scopes. Incorporated
// forms also need a matrix; try each issued VNC seed and let the owner decide.
let adverbialAttempts = 0;
let adverbialAccepted = 0;
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
console.log(`Owners accepted ${adverbialAccepted} of ${adverbialAttempts} adverbial choices`);

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
for (const [result, operation] of witnesses) {
  const check = inspectClassicalResultLink(runtime, result, project, fresh);
  let { status } = check;
  if (status === "verified") {
    try {
      const address = await encodeCompactResultAddress(check.recipe);
      const decoded = address && await decodeCompactResultAddress(address);
      status = isDeepStrictEqual(decoded, JSON.parse(JSON.stringify(check.recipe)))
        ? status : "compact-address-failed";
    } catch {
      status = "compact-address-failed";
    }
  }
  if (status !== "verified") {
    const { surface, analysis } = project(runtime, result) || {};
    console.error(JSON.stringify({
      operation, status, surface, analysis,
      recipeNodes: check.recipe?.nodes.map(node => node.type),
    }));
  }
  const key = `${operation}: ${status}`;
  counts.set(key, (counts.get(key) || 0) + 1);
}
console.log(`Checked ${witnesses.size} accepted Result witnesses`);
for (const [key, count] of [...counts].sort(([left], [right]) => left.localeCompare(right))) {
  console.log(`${count}\t${key}`);
}
if (fixtureResults.failed || !generatedEdges.size || !retainedSubstitutions || !adverbialAccepted
  || !readingCoverage.get("nnc:adjectival-modification")?.accepted
  || !readingCoverage.get("sentence:supplementation")?.accepted || [...counts.keys()].some(key => !key.endsWith(": verified"))) process.exitCode = 1;
