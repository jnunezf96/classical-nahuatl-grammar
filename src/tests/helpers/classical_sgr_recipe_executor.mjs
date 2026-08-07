import {
  getClassicalSourceGrammarResultSurfaceInventory,
} from "../../ui/state.mjs";
import {
  createClassicalSgrMaterialBrowserAudit,
} from "./classical_sgr_material_browser_audit.mjs";

const EXECUTOR_KIND = "classical-sgr-proof-route-recipe-executor";
const EXECUTOR_VERSION = 1;
const SWEEP_ARTIFACT_KIND = "classical-sgr-browser-sweep-artifact";
const SWEEP_ARTIFACT_VERSION = 1;
const DEFAULT_SETTLE_TIMEOUT_MS = 1800;
const POLL_INTERVAL_MS = 20;
const SUCCESSFUL_SCENARIO_OUTCOME_CODES = new Set([
  "action-applied",
  "already-materialized",
  "control-applied",
  "ready-for-observation",
  "source-mode-applied",
]);
const ROUTE_MISSING_REASON_CODES = new Set([
  "browser-observation-not-run",
  "exact-owner-issued-operation-output-result-not-observed",
  "exact-owner-issued-operation-result-not-observed",
  "interactive-control-operation-is-not-active",
]);

const SOURCE_FIELD_SELECTORS = Object.freeze({
  whole: "#classical-source-whole",
  stem: "#classical-source-whole",
  embed: "#classical-source-embed",
  matrix: "#classical-source-matrix",
  transcription: "#classical-transcription-source-input",
});

const ACTION_SELECTORS = Object.freeze({
  "apply-source": "#verb-entry-apply",
  "apply-current-source": "#verb-entry-apply",
  apply: "#verb-entry-apply",
  "apply-transcription-source": "#classical-transcription-source-apply",
  compose: "[data-classical-user-action='compose-captured-clause-results']",
  "capture-marker":
    "[data-classical-user-action='capture-clause-relation-particle-as-marker']",
});

const SPECIAL_CONTROL_SELECTORS = Object.freeze({
  "basal-unit": "[data-classical-basal-unit]",
  "derivation-type": "[data-derivation-type]",
  "classical-rule-logic-derivation-option": "[data-derivation-type]",
  polarity: "[data-classical-segment-control='classical-rule-logic-polarity']",
  relation: "[data-classical-clause-relation-decision='relation']",
});

function deepFreeze(value) {
  if (Array.isArray(value)) {
    value.forEach(deepFreeze);
    return Object.freeze(value);
  }
  if (!value || typeof value !== "object") return value;
  Object.values(value).forEach(deepFreeze);
  return Object.freeze(value);
}

function sortedUnique(values) {
  return [...new Set(values)].sort((left, right) => left.localeCompare(right));
}

function normalizeArray(value) {
  return Array.isArray(value) ? value : [];
}

function canonicalizeJsonValue(value) {
  if (Array.isArray(value)) {
    return value.map(entry => (
      entry === undefined ? null : canonicalizeJsonValue(entry)
    ));
  }
  if (!value || typeof value !== "object") {
    if (typeof value === "number" && !Number.isFinite(value)) return null;
    return value;
  }
  return Object.fromEntries(
    Object.keys(value)
      .filter(key => value[key] !== undefined)
      .sort((left, right) => left.localeCompare(right))
      .map(key => [key, canonicalizeJsonValue(value[key])]),
  );
}

export function serializeClassicalSgrBrowserSweepArtifact(artifact) {
  return `${JSON.stringify(canonicalizeJsonValue(artifact), null, 2)}\n`;
}

export function createClassicalSgrUnobservedSweepReport() {
  return createClassicalSgrMaterialBrowserAudit({
    document: {
      querySelectorAll() {
        return [];
      },
    },
  }).finalize();
}

export function createClassicalSgrBrowserSweepArtifact({
  report,
  diagnostic = {},
  recipeValidation = { valid: true, problems: [] },
  inventoryDigest,
  recipeDigest,
  executionFailureCode = "",
}) {
  const atomOutcomes = [...normalizeArray(report?.atomOutcomes)]
    .sort((left, right) => left.atomId.localeCompare(right.atomId));
  const publicOutcomes = atomOutcomes.filter(
    entry => entry.expectation === "materialized",
  );
  const privateOutcomes = atomOutcomes.filter(
    entry => entry.expectation === "private-inert",
  );
  const unmaterialized = publicOutcomes.filter(
    entry => entry.outcome === "unmaterialized",
  );
  const privateExposed = privateOutcomes.filter(
    entry => entry.outcome === "private-exposed",
  );
  const scenarioOutcomes = normalizeArray(diagnostic?.scenarioSnapshots)
    .map(snapshot => ({
      familyId: String(snapshot.familyId || ""),
      caseId: String(snapshot.caseId || ""),
      activatesOperationIds: sortedUnique(normalizeArray(
        snapshot.activatesOperationIds,
      ).map(String)),
      activeOperationIds: sortedUnique(normalizeArray(
        snapshot.activeOperationIds,
      ).map(String)),
      outcomeCodes: sortedUnique(normalizeArray(
        snapshot.outcomeCodes,
      ).map(String)),
      resultStatus: String(
        snapshot.domState?.resultStatus || snapshot.resultStatus || "",
      ),
      blockReason: String(snapshot.domState?.blockReason || ""),
      domActiveOperationIds: sortedUnique(normalizeArray(
        snapshot.domState?.domActiveOperationIds,
      ).map(String)),
      source: snapshot.domState?.source || null,
      controls: snapshot.domState?.controls || null,
      materialObservationDiagnostics:
        snapshot.materialObservationDiagnostics || [],
    }))
    .sort((left, right) => (
      left.familyId.localeCompare(right.familyId)
      || left.caseId.localeCompare(right.caseId)
    ));
  const recipeProblems = sortedUnique([
    ...normalizeArray(recipeValidation?.problems).map(String),
    ...(recipeValidation?.valid === false ? ["registry-validation-failed"] : []),
    ...(executionFailureCode === "recipe-invalid"
      ? ["executor-registry-invalid"]
      : []),
  ]);
  const recipeInvalid = recipeProblems.length > 0;
  const classifiedGaps = unmaterialized.map(entry => {
    const relevantScenarios = scenarioOutcomes.filter(snapshot => (
      snapshot.activatesOperationIds.includes(entry.operationId)
    ));
    const hasActivatedRoute = relevantScenarios.some(snapshot => (
      snapshot.activeOperationIds.includes(entry.operationId)
    ));
    const everyScenarioBlocked = relevantScenarios.length > 0
      && relevantScenarios.every(snapshot => snapshot.outcomeCodes.some(
        code => !SUCCESSFUL_SCENARIO_OUTCOME_CODES.has(code),
      ));
    const partition = recipeInvalid
      ? "recipe-invalid"
      : executionFailureCode
        || ROUTE_MISSING_REASON_CODES.has(entry.primaryReason)
        || relevantScenarios.length === 0
        || (!hasActivatedRoute && everyScenarioBlocked)
        ? "route-missing"
        : "projection-missing";
    return {
      atomId: entry.atomId,
      atomKind: entry.atomKind,
      operationId: entry.operationId,
      disposition: entry.disposition,
      primaryReason: entry.primaryReason || null,
      reasons: sortedUnique(normalizeArray(entry.reasons).map(String)),
      partition,
    };
  }).sort((left, right) => left.atomId.localeCompare(right.atomId));
  const partitionEntries = partition => classifiedGaps
    .filter(entry => entry.partition === partition);
  const gapGroups = Object.values(classifiedGaps.reduce((groups, entry) => {
    groups[entry.operationId] ||= {
      operationId: entry.operationId,
      atoms: [],
    };
    groups[entry.operationId].atoms.push(entry);
    return groups;
  }, {})).map(group => ({
    operationId: group.operationId,
    atoms: group.atoms.sort((left, right) => (
      left.atomId.localeCompare(right.atomId)
    )),
    scenarioOutcomes: scenarioOutcomes.filter(snapshot => (
      snapshot.activatesOperationIds.includes(group.operationId)
    )),
  })).sort((left, right) => left.operationId.localeCompare(right.operationId));
  const privateExposureEntries = privateExposed.map(entry => ({
    atomId: entry.atomId,
    atomKind: entry.atomKind,
    operationId: entry.operationId,
    disposition: entry.disposition,
    primaryReason: entry.primaryReason || null,
    reasons: sortedUnique(normalizeArray(entry.reasons).map(String)),
  })).sort((left, right) => left.atomId.localeCompare(right.atomId));
  const recipeInvalidEntries = partitionEntries("recipe-invalid");
  const routeMissingEntries = partitionEntries("route-missing");
  const projectionMissingEntries = partitionEntries("projection-missing");
  const unexpectedDomIds = sortedUnique(normalizeArray(
    report?.unexpectedDomIds,
  ).map(String));
  const atomOutcomeIds = atomOutcomes.map(entry => entry.atomId);
  const uniqueAtomOutcomeCount = new Set(atomOutcomeIds).size;
  const counts = {
    atomOutcomeCount: atomOutcomes.length,
    uniqueAtomOutcomeCount,
    public: {
      expected: Number(report?.inventory?.publicAtomCount || 98),
      materialized: publicOutcomes.filter(
        entry => entry.outcome === "materialized",
      ).length,
      unmaterialized: unmaterialized.length,
    },
    private: {
      expected: Number(report?.inventory?.privateAtomCount || 141),
      inert: privateOutcomes.filter(
        entry => entry.outcome === "private-inert",
      ).length,
      exposed: privateExposed.length,
    },
    unexpectedDomIds: unexpectedDomIds.length,
  };
  const partitionedFailureAtomIds = [
    ...recipeInvalidEntries,
    ...routeMissingEntries,
    ...projectionMissingEntries,
    ...privateExposureEntries,
  ].map(entry => entry.atomId);
  const expectedFailureAtomIds = [
    ...unmaterialized,
    ...privateExposed,
  ].map(entry => entry.atomId).sort((left, right) => left.localeCompare(right));
  const failurePartitionIsExact = (
    new Set(partitionedFailureAtomIds).size === partitionedFailureAtomIds.length
    && JSON.stringify([...partitionedFailureAtomIds].sort())
      === JSON.stringify(expectedFailureAtomIds)
  );
  const complete = Boolean(
    report?.complete === true
    && !recipeInvalid
    && !executionFailureCode
    && counts.atomOutcomeCount === 239
    && counts.uniqueAtomOutcomeCount === 239
    && counts.public.expected === 98
    && counts.public.materialized === 98
    && counts.public.unmaterialized === 0
    && counts.private.expected === 141
    && counts.private.inert === 141
    && counts.private.exposed === 0
    && counts.unexpectedDomIds === 0
    && failurePartitionIsExact
  );
  return deepFreeze({
    kind: SWEEP_ARTIFACT_KIND,
    version: SWEEP_ARTIFACT_VERSION,
    digests: {
      inventorySha256: String(inventoryDigest || ""),
      recipeSha256: String(recipeDigest || ""),
    },
    complete,
    executionFailureCode: String(executionFailureCode || ""),
    inventory: {
      atomCount: Number(report?.inventory?.atomCount || atomOutcomes.length),
      publicAtomCount: counts.public.expected,
      privateAtomCount: counts.private.expected,
    },
    counts,
    integrity: {
      atomOutcomePartitionIsExact:
        report?.atomOutcomePartitionIsExact === true,
      failurePartitionIsExact,
    },
    atomOutcomes,
    perOperationGaps: gapGroups,
    scenarioOutcomes,
    failurePartitions: {
      "recipe-invalid": {
        problemCount: recipeProblems.length,
        problems: recipeProblems,
        atomCount: recipeInvalidEntries.length,
        atoms: recipeInvalidEntries,
      },
      "route-missing": {
        atomCount: routeMissingEntries.length,
        atoms: routeMissingEntries,
      },
      "projection-missing": {
        atomCount: projectionMissingEntries.length,
        atoms: projectionMissingEntries,
      },
      "private-exposure": {
        atomCount: privateExposureEntries.length,
        atoms: privateExposureEntries,
      },
    },
    unexpectedDomIds,
  });
}

function normalizePresets(presets) {
  if (Array.isArray(presets)) {
    return new Map(presets.map(preset => [preset.presetId, preset]));
  }
  if (presets && typeof presets === "object") {
    return new Map(Object.entries(presets).map(([presetId, preset]) => [
      presetId,
      { presetId, ...(preset || {}) },
    ]));
  }
  return new Map();
}

function normalizeSelections(selections) {
  if (Array.isArray(selections)) return selections;
  if (selections && typeof selections === "object") {
    return Object.entries(selections).map(([controlKey, value]) => ({
      controlKey,
      value,
    }));
  }
  return [];
}

function getCaseDriver(family, caseRecord) {
  return String(caseRecord?.driver || family?.routeDriver || "").trim();
}

function buildDependencyPlan(families) {
  const byId = new Map(families.map(family => [family.familyId, family]));
  const visiting = new Set();
  const visited = new Set();
  const ordered = [];
  function visit(family) {
    if (visited.has(family.familyId)) return;
    if (visiting.has(family.familyId)) {
      throw new Error(
        `classical-sgr-recipe-family-cycle:${family.familyId}`,
      );
    }
    visiting.add(family.familyId);
    normalizeArray(family.dependsOnFamilyIds).forEach(dependencyId => {
      const dependency = byId.get(dependencyId);
      if (!dependency) {
        throw new Error(
          `classical-sgr-recipe-family-dependency-missing:${dependencyId}`,
        );
      }
      visit(dependency);
    });
    visiting.delete(family.familyId);
    visited.add(family.familyId);
    ordered.push(family);
  }
  [...families]
    .sort((left, right) => (
      Number(left.order || 0) - Number(right.order || 0)
      || left.familyId.localeCompare(right.familyId)
    ))
    .forEach(visit);
  return ordered;
}

function validateExecutorRegistry(registry, inventory) {
  const atoms = [...inventory.axes, ...inventory.outputs];
  const publicAtoms = atoms.filter(atom => atom.binding?.public === true);
  const privateAtoms = atoms.filter(atom => atom.binding?.public === false);
  const routeOperationIds = sortedUnique(
    atoms.map(atom => atom.operationId),
  );
  const publicOperationIds = sortedUnique(
    publicAtoms.map(atom => atom.operationId),
  );
  const families = normalizeArray(registry?.families);
  const familyIds = families.map(family => family.familyId);
  const caseIds = families.flatMap(family => (
    normalizeArray(family.cases).map(caseRecord => caseRecord.caseId)
  ));
  const providerCounts = Object.fromEntries(
    routeOperationIds.map(operationId => [operationId, 0]),
  );
  families.forEach(family => {
    normalizeArray(family.providesOperationIds).forEach(operationId => {
      if (Object.hasOwn(providerCounts, operationId)) {
        providerCounts[operationId] += 1;
      }
    });
  });
  const invalidProviderIds = Object.entries(providerCounts)
    .filter(([, count]) => count !== 1)
    .map(([operationId, count]) => `${operationId}:${count}`);
  const activatedOperationIds = sortedUnique(families.flatMap(family => (
    normalizeArray(family.cases).flatMap(caseRecord => (
      normalizeArray(caseRecord.activatesOperationIds)
    ))
  )));
  const unactivatedOperationIds = routeOperationIds.filter(
    operationId => !activatedOperationIds.includes(operationId),
  );
  const unknownActivatedOperationIds = activatedOperationIds.filter(
    operationId => !routeOperationIds.includes(operationId),
  );
  const problems = [
    registry?.kind === "classical-sgr-proof-route-recipe-registry"
      ? ""
      : "registry-kind",
    registry?.version === 1 ? "" : "registry-version",
    registry?.authority?.proofOnly === true ? "" : "proof-only-authority",
    registry?.authority?.uiAuthority === "none" ? "" : "ui-authority",
    registry?.authority?.grammarAuthority === false
      ? ""
      : "grammar-authority",
    registry?.authority?.semanticOwnerAuthority === false
      ? ""
      : "semantic-owner-authority",
    registry?.authority?.canonicalGenerationAuthority === false
      ? ""
      : "canonical-generation-authority",
    registry?.authority?.runtimeInstallable === false
      ? ""
      : "runtime-installable",
    atoms.length === 239 ? "" : `atom-count:${atoms.length}`,
    publicAtoms.length === 98
      ? ""
      : `public-atom-count:${publicAtoms.length}`,
    privateAtoms.length === 141
      ? ""
      : `private-atom-count:${privateAtoms.length}`,
    routeOperationIds.length === 33
      ? ""
      : `route-operation-count:${routeOperationIds.length}`,
    new Set(familyIds).size === familyIds.length
      ? ""
      : "duplicate-family-id",
    new Set(caseIds).size === caseIds.length ? "" : "duplicate-case-id",
    invalidProviderIds.length
      ? `primary-provider-count:${invalidProviderIds.join(",")}`
      : "",
    unactivatedOperationIds.length
      ? `unactivated-operations:${unactivatedOperationIds.join(",")}`
      : "",
    unknownActivatedOperationIds.length
      ? `unknown-activated-operations:${unknownActivatedOperationIds.join(",")}`
      : "",
  ].filter(Boolean);
  if (problems.length) {
    throw new Error(
      `classical-sgr-recipe-executor-registry-invalid;${problems.join(";")}`,
    );
  }
  return deepFreeze({
    atoms,
    publicAtoms,
    privateAtoms,
    routeOperationIds,
    publicOperationIds,
    families,
    dependencyPlan: buildDependencyPlan(families),
    presetsById: normalizePresets(registry.presets),
  });
}

function getActiveSurfaceFrame(targetWindow) {
  return targetWindow.getActiveClassicalRuleLogicSurfaceFrame?.()
    || targetWindow.__CLASSICAL_NOMINAL_CONSTRUCTION_FRAME__
    || targetWindow.__CLASSICAL_RELATIONAL_NNC_RESULT__
    || targetWindow.__CLASSICAL_ADVERBIAL_NUCLEAR_RESULT__
    || null;
}

function getElementState(element) {
  let hiddenAncestor = null;
  for (
    let ancestor = element?.parentElement;
    ancestor;
    ancestor = ancestor.parentElement
  ) {
    if (
      ancestor.hidden === true
      || ancestor.getAttribute?.("aria-hidden") === "true"
    ) {
      hiddenAncestor = ancestor;
      break;
    }
  }
  const style = element?.ownerDocument?.defaultView?.getComputedStyle?.(
    element,
  ) || null;
  return deepFreeze({
    id: element?.id || "",
    tagName: element?.tagName || "",
    decisionId: element?.getAttribute?.(
      "data-classical-clause-relation-decision",
    ) || "",
    hidden: element?.hidden === true,
    disabled: element?.disabled === true,
    ariaHidden: element?.getAttribute?.("aria-hidden") || "",
    bindingStage: element?.getAttribute?.(
      "data-classical-sgr-binding-stage",
    ) || "",
    display: style?.display || "",
    visibility: style?.visibility || "",
    hiddenAncestor: hiddenAncestor ? {
      id: hiddenAncestor.id || "",
      tagName: hiddenAncestor.tagName || "",
      hidden: hiddenAncestor.hidden === true,
      ariaHidden: hiddenAncestor.getAttribute?.("aria-hidden") || "",
    } : null,
    inGrammar: Boolean(element?.closest?.("#classical-authority-panel")),
    value: String(element?.value || ""),
  });
}

function resolveControlSelector(controlKey) {
  const normalized = String(controlKey || "").trim();
  if (!normalized) return "";
  if (/^[#.[>:]/u.test(normalized)) return normalized;
  if (SPECIAL_CONTROL_SELECTORS[normalized]) {
    return SPECIAL_CONTROL_SELECTORS[normalized];
  }
  if (normalized.startsWith("classical-")) return `#${normalized}`;
  return `[data-classical-clause-relation-decision="${normalized}"]`;
}

function resolveSelectionValue(control, valueDescriptor) {
  if (
    valueDescriptor
    && typeof valueDescriptor === "object"
    && valueDescriptor.selectionKind === "owner-option-match"
  ) {
    const tokens = normalizeArray(valueDescriptor.allTokens).map(String);
    const option = Array.from(control?.options || []).find(candidate => (
      tokens.every(token => String(candidate.value || "").includes(token))
    ));
    return option?.value ?? null;
  }
  return String(valueDescriptor ?? "");
}

export function createClassicalSgrRecipeExecutor(
  targetWindow = globalThis.window,
) {
  const document = targetWindow?.document;
  if (!document?.querySelectorAll) {
    throw new Error("classical-sgr-recipe-executor-document-required");
  }
  const wait = milliseconds => new Promise(resolve => {
    targetWindow.setTimeout(resolve, milliseconds);
  });

  async function waitForStableDom({
    timeoutMs = DEFAULT_SETTLE_TIMEOUT_MS,
    requireResultSettled = false,
  } = {}) {
    const start = Date.now();
    let priorSignature = "";
    let stablePolls = 0;
    while (Date.now() - start <= timeoutMs) {
      const result = document.getElementById("classical-rule-logic-surface");
      const signature = [
        result?.dataset?.classicalNahuatlSurfaceStatus || "",
        result?.dataset?.classicalNahuatlSurfaceFormula || "",
        result?.childElementCount || 0,
        document.querySelectorAll(
          "[data-classical-clause-relation-decision]",
        ).length,
        document.querySelectorAll(
          "[data-classical-surface-atom-id]",
        ).length,
      ].join("|");
      const preparing = result?.dataset?.classicalNahuatlSurfaceStatus
        === "preparing";
      stablePolls = signature === priorSignature ? stablePolls + 1 : 0;
      priorSignature = signature;
      if (stablePolls >= 2 && (!requireResultSettled || !preparing)) {
        return { settled: true, elapsedMs: Date.now() - start, signature };
      }
      await wait(POLL_INTERVAL_MS);
    }
    return {
      settled: false,
      elapsedMs: Date.now() - start,
      signature: priorSignature,
    };
  }

  async function execute({ registry, caseIds = [] }) {
    const inventory = getClassicalSourceGrammarResultSurfaceInventory();
    const validated = validateExecutorRegistry(registry, inventory);
    const requestedCaseIds = new Set(normalizeArray(caseIds).map(String));
    const audit = createClassicalSgrMaterialBrowserAudit(targetWindow);
    const trace = [];
    const scenarioSnapshots = [];
    const caseById = new Map(validated.families.flatMap(family => (
      normalizeArray(family.cases).map(caseRecord => [
        caseRecord.caseId,
        { family, caseRecord },
      ])
    )));
    const interactiveAtoms = inventory.axes.filter(atom => (
      atom.binding?.public === true
      && atom.disposition === "interactive-choice"
    ));
    const interactiveObservations = new Map();
    const publicAtomIdsByOperation = new Map(
      validated.routeOperationIds.map(operationId => [
        operationId,
        validated.publicAtoms
          .filter(atom => atom.operationId === operationId)
          .map(atom => atom.atomId),
      ]),
    );
    let latestAuditSnapshot = audit.snapshot();

    const getScenarioDomState = () => {
      const sourceRoot = document.getElementById("classical-source-parts");
      const resultRoot = document.getElementById(
        "classical-rule-logic-surface",
      );
      const activeFrame = getActiveSurfaceFrame(targetWindow);
      const inspectControl = id => {
        const control = document.getElementById(id);
        const matchingControls = Array.from(document.querySelectorAll(
          `[id="${id}"]`,
        ));
        const hiddenAncestor = control?.closest?.(
          '[hidden], [aria-hidden="true"]',
        ) || null;
        const style = control
          ? targetWindow.getComputedStyle?.(control)
          : null;
        return control ? {
          value: String(control.value ?? ""),
          isConnected: control.isConnected === true,
          disabled: control.disabled === true,
          hidden: control.hidden === true,
          ariaHidden: control.getAttribute?.("aria-hidden") || "",
          hiddenAncestor: Boolean(hiddenAncestor),
          hiddenAncestorId: hiddenAncestor?.id || "",
          hiddenAncestorAriaHidden:
            hiddenAncestor?.getAttribute?.("aria-hidden") || "",
          display: style?.display || "",
          visibility: style?.visibility || "",
          duplicateCount: matchingControls.length,
          sgrBoundCount: matchingControls.filter(candidate => (
            String(candidate.dataset?.classicalSurfaceAtomIds || "").trim()
          )).length,
          sgrAtomIds: String(
            control.dataset?.classicalSurfaceAtomIds || "",
          ).split(/\s+/u).filter(Boolean).sort(),
          sgrBindingStage:
            control.dataset?.classicalSgrBindingStage || "",
          grammarAuthority:
            control.dataset?.classicalGrammarAuthority || "",
        } : null;
      };
      return deepFreeze({
        resultStatus:
          resultRoot?.dataset?.classicalNahuatlSurfaceStatus || "",
        blockReason: String(
          activeFrame?.blockReason
          || document.querySelector("[data-classical-block-reason]")
            ?.dataset?.classicalBlockReason
          || "",
        ),
        domActiveOperationIds: sortedUnique(
          String(
            resultRoot?.dataset?.classicalSgrActiveOperationIds || "",
          ).split(/\s+/u).filter(Boolean),
        ),
        source: {
          mode: sourceRoot?.dataset?.classicalSourcePartsMode || "",
          commitState: sourceRoot?.dataset?.classicalSourceCommitState || "",
          whole: String(document.getElementById("classical-source-whole")?.value || ""),
          embed: String(document.getElementById("classical-source-embed")?.value || ""),
          matrix: String(document.getElementById("classical-source-matrix")?.value || ""),
        },
        controls: {
          nncState: inspectControl("classical-rule-logic-nnc-state"),
          possessor: inspectControl("classical-rule-logic-nnc-possessor"),
          rootAllomorph: inspectControl(
            "classical-deverbal-nnc-root-stock-allomorph",
          ),
          measure: inspectControl("classical-cardinal-measure-composition"),
        },
      });
    };

    const outcome = ({
      familyId,
      caseId,
      phase,
      code,
      detail = {},
    }) => {
      const entry = deepFreeze({
        familyId,
        caseId,
        phase,
        code,
        ...detail,
      });
      trace.push(entry);
      return entry;
    };

    const dispatchValue = async ({
      familyId,
      caseId,
      phase,
      controlKey,
      value,
    }) => {
      const selector = resolveControlSelector(controlKey);
      const candidates = selector
        ? Array.from(document.querySelectorAll(selector))
        : [];
      let control = candidates[0] || null;
      if (controlKey === "basal-unit") {
        control = candidates.find(candidate => (
          candidate.dataset?.classicalBasalUnit === String(value)
        )) || null;
      } else if ([
        "derivation-type",
        "classical-rule-logic-derivation-option",
      ].includes(controlKey)) {
        control = candidates.find(candidate => (
          candidate.dataset?.derivationType === String(value)
        )) || null;
      } else if (controlKey === "polarity") {
        control = candidates.find(candidate => (
          candidate.dataset?.classicalSegmentValue === String(value)
        )) || null;
      }
      if (!control) {
        return outcome({
          familyId,
          caseId,
          phase,
          code: "control-not-found",
          detail: { controlKey, selector },
        });
      }
      const resolvedValue = resolveSelectionValue(control, value);
      if (resolvedValue === null) {
        return outcome({
          familyId,
          caseId,
          phase,
          code: "owner-option-not-found",
          detail: {
            controlKey,
            selector,
            allTokens: normalizeArray(value?.allTokens),
            optionValues: Array.from(control.options || []).map(
              option => option.value,
            ),
          },
        });
      }
      let accepted = true;
      let actualValue = "";
      if (control.tagName === "BUTTON") {
        control.click();
        actualValue = control.getAttribute("aria-pressed") || "clicked";
      } else if (control.type === "checkbox") {
        const requestedChecked = resolvedValue === "true"
          || resolvedValue === true;
        control.checked = requestedChecked;
        control.dispatchEvent(new Event("input", { bubbles: true }));
        control.dispatchEvent(new Event("change", { bubbles: true }));
        actualValue = String(control.checked);
        accepted = control.checked === requestedChecked;
      } else {
        control.value = resolvedValue;
        control.dispatchEvent(new Event("input", { bubbles: true }));
        control.dispatchEvent(new Event("change", { bubbles: true }));
        actualValue = String(control.value ?? "");
        accepted = actualValue === resolvedValue;
      }
      const settled = await waitForStableDom();
      return outcome({
        familyId,
        caseId,
        phase,
        code: !accepted
          ? "control-value-rejected"
          : settled.settled ? "control-applied" : "dom-settle-timeout",
        detail: {
          controlKey,
          selector,
          requestedValue: resolvedValue,
          actualValue,
        },
      });
    };

    const runAction = async ({ familyId, caseId, action }) => {
      if (action === "show-nnc-paradigm") {
        return dispatchValue({
          familyId,
          caseId,
          phase: "action",
          controlKey: "classical-rule-logic-nnc-output-scope",
          value: "paradigm",
        });
      }
      if (action === "open-transcription-source") {
        const disclosure = document.querySelector(
          "#classical-transcription-source",
        );
        if (!disclosure) {
          return outcome({
            familyId,
            caseId,
            phase: "action",
            code: "action-target-not-found",
            detail: { action },
          });
        }
        if ("open" in disclosure) disclosure.open = true;
        else disclosure.click();
        const settled = await waitForStableDom();
        return outcome({
          familyId,
          caseId,
          phase: "action",
          code: settled.settled ? "action-applied" : "dom-settle-timeout",
          detail: { action },
        });
      }
      if (action === "render") {
        targetWindow.renderClassicalRuleLogicSurfaceBlock?.();
        const settled = await waitForStableDom();
        return outcome({
          familyId,
          caseId,
          phase: "action",
          code: settled.settled ? "action-applied" : "dom-settle-timeout",
          detail: { action },
        });
      }
      if (action === "clear-captures") {
        for (const role of [
          "principal",
          "adjoined",
          "dependent",
          "supplement",
          "marker",
        ]) {
          const button = document.querySelector(
            `[data-classical-user-action="clear-clause-relation-${role}"]`,
          );
          if (button && !button.disabled) {
            button.click();
            await waitForStableDom();
          }
        }
        return outcome({
          familyId,
          caseId,
          phase: "action",
          code: "action-applied",
          detail: { action },
        });
      }
      if (action === "select-first-marker") {
        const control = document.querySelector(
          "[data-classical-clause-relation-marker-result='particle']",
        );
        const option = Array.from(control?.options || []).find(
          candidate => candidate.value,
        );
        if (!control || !option) {
          return outcome({
            familyId,
            caseId,
            phase: "action",
            code: "owner-option-not-found",
            detail: { action },
          });
        }
        control.value = option.value;
        control.dispatchEvent(new Event("input", { bubbles: true }));
        control.dispatchEvent(new Event("change", { bubbles: true }));
        await waitForStableDom();
        return outcome({
          familyId,
          caseId,
          phase: "action",
          code: "action-applied",
          detail: { action, optionValue: option.value },
        });
      }
      const selector = ACTION_SELECTORS[action] || (
        action.startsWith("capture-current-as-")
          ? `[data-classical-user-action="capture-current-clause-relation-${
              action.slice("capture-current-as-".length)
            }"]`
          : ""
      );
      const control = selector ? document.querySelector(selector) : null;
      if (!control) {
        return outcome({
          familyId,
          caseId,
          phase: "action",
          code: "action-target-not-found",
          detail: { action, selector },
        });
      }
      if (control.disabled) {
        return outcome({
          familyId,
          caseId,
          phase: "action",
          code: "action-target-disabled",
          detail: { action, selector },
        });
      }
      control.click();
      const settled = await waitForStableDom({
        requireResultSettled: [
          "apply",
          "apply-source",
          "apply-current-source",
          "apply-transcription-source",
        ].includes(action),
      });
      return outcome({
        familyId,
        caseId,
        phase: "action",
        code: settled.settled ? "action-applied" : "dom-settle-timeout",
        detail: { action, selector },
      });
    };

    const applySourceMode = async ({
      familyId,
      caseId,
      phase,
      sourceMode,
    }) => {
      const control = document.querySelector(
        `button[data-classical-source-parts-kind="${sourceMode}"]`,
      );
      if (!control) {
        return outcome({
          familyId,
          caseId,
          phase,
          code: "source-mode-control-not-found",
          detail: { sourceMode },
        });
      }
      control.click();
      const settled = await waitForStableDom();
      const actualMode = String(
        document.getElementById("classical-source-parts")?.dataset
          ?.classicalSourcePartsMode || "",
      );
      const active = actualMode === sourceMode
        && control.getAttribute("aria-pressed") === "true";
      return outcome({
        familyId,
        caseId,
        phase,
        code: !active
          ? "source-mode-rejected"
          : settled.settled ? "source-mode-applied" : "dom-settle-timeout",
        detail: { sourceMode, actualMode },
      });
    };

    const runCase = async (
      family,
      caseRecord,
      { fixtureReplay = false, replayStack = [] } = {},
    ) => {
      const familyId = family.familyId;
      const caseId = caseRecord.caseId;
      if (replayStack.includes(caseId)) {
        outcome({
          familyId,
          caseId,
          phase: "fixture",
          code: "fixture-cycle",
          detail: { replayStack },
        });
        return;
      }
      const preset = caseRecord.presetId
        ? validated.presetsById.get(caseRecord.presetId)
        : null;
      if (caseRecord.presetId && !preset) {
        outcome({
          familyId,
          caseId,
          phase: "preset",
          code: "preset-not-found",
          detail: { presetId: caseRecord.presetId },
        });
      }
      if (preset?.basalUnit) {
        await dispatchValue({
          familyId,
          caseId,
          phase: "preset",
          controlKey: "basal-unit",
          value: preset.basalUnit,
        });
      }
      const presetSourceMode = preset?.sourceMode || preset?.source?.mode;
      if (presetSourceMode) {
        await applySourceMode({
          familyId,
          caseId,
          phase: "preset",
          sourceMode: presetSourceMode,
        });
      }
      if (preset?.derivationType) {
        await dispatchValue({
          familyId,
          caseId,
          phase: "preset",
          controlKey: "derivation-type",
          value: preset.derivationType,
        });
      }
      for (const selection of normalizeSelections(preset?.selections)) {
        await dispatchValue({
          familyId,
          caseId,
          phase: "preset",
          controlKey: selection.controlKey,
          value: selection.value,
        });
      }
      for (const action of normalizeArray(preset?.actions)) {
        await runAction({ familyId, caseId, action });
      }

      if (caseRecord.source?.mode === "phonological-segments") {
        // This source mode belongs to the dedicated transcription disclosure,
        // not the stem composer. Its fields are still applied generically.
        outcome({
          familyId,
          caseId,
          phase: "source",
          code: "source-mode-applied",
          detail: { sourceMode: caseRecord.source.mode },
        });
      } else if (caseRecord.source?.mode) {
        await applySourceMode({
          familyId,
          caseId,
          phase: "source",
          sourceMode: caseRecord.source.mode,
        });
      }
      for (const [fieldId, value] of Object.entries(
        caseRecord.source?.fields || {},
      )) {
        const selector = SOURCE_FIELD_SELECTORS[fieldId]
          || (fieldId.startsWith("#") ? fieldId : `#${fieldId}`);
        await dispatchValue({
          familyId,
          caseId,
          phase: "source",
          controlKey: selector,
          value,
        });
      }

      // Some Grammar choices are only meaningful after the typed Source has
      // been committed. Keep that ordering declarative so reusable recipes can
      // observe the choice immediately after it is made, without a final
      // commit rebuilding the surface first.
      for (const action of normalizeArray(caseRecord.preSelectionActions)) {
        await runAction({ familyId, caseId, action });
      }

      if (normalizeArray(caseRecord.participants).length) {
        await runAction({ familyId, caseId, action: "clear-captures" });
        for (const participant of caseRecord.participants) {
          const fixture = caseById.get(participant.fixtureCaseId);
          if (!fixture) {
            outcome({
              familyId,
              caseId,
              phase: "fixture",
              code: "fixture-not-found",
              detail: {
                role: participant.role,
                fixtureCaseId: participant.fixtureCaseId,
              },
            });
            continue;
          }
          await runCase(fixture.family, fixture.caseRecord, {
            fixtureReplay: true,
            replayStack: [...replayStack, caseId],
          });
          await runAction({
            familyId,
            caseId,
            action: `capture-current-as-${participant.role}`,
          });
        }
      }

      for (const selection of normalizeSelections(caseRecord.selections)) {
        await dispatchValue({
          familyId,
          caseId,
          phase: "selection",
          controlKey: selection.controlKey,
          value: selection.value,
        });
      }
      for (const action of normalizeArray(caseRecord.actions)) {
        await runAction({ familyId, caseId, action });
      }
      if (!fixtureReplay) {
        outcome({
          familyId,
          caseId,
          phase: "observation",
          code: "ready-for-observation",
          detail: { driver: getCaseDriver(family, caseRecord) },
        });
      }
    };

    const observeInteractive = (caseId, activeFrame) => {
      const renderedActiveOperationIds = String(
        document.getElementById("classical-rule-logic-surface")?.dataset
          ?.classicalSgrActiveOperationIds || "",
      ).split(/\s+/u).filter(Boolean);
      const activeOperationIds = sortedUnique([
        ...Array.from(
          targetWindow.getClassicalSgrActiveOperationIds?.(activeFrame) || [],
        ),
        ...renderedActiveOperationIds,
      ]);
      const activeSet = new Set(activeOperationIds);
      interactiveAtoms.forEach(atom => {
        const elements = Array.from(new Set([
          ...document.querySelectorAll(
            `[data-classical-surface-atom-id="${atom.atomId}"]`,
          ),
          ...document.querySelectorAll(
            `[data-classical-surface-atom-ids~="${atom.atomId}"]`,
          ),
        ]));
        const states = elements.map(getElementState);
        const available = states.some(state => (
          !state.hidden
          && !state.disabled
          && !state.hiddenAncestor
          && state.display !== "none"
          && state.visibility !== "hidden"
        ));
        const operationActive = activeSet.has(atom.operationId);
        const score = (operationActive ? 2 : 0) + (available ? 1 : 0);
        const prior = interactiveObservations.get(atom.atomId);
        if (!prior || score > prior.score) {
          interactiveObservations.set(atom.atomId, deepFreeze({
            atomId: atom.atomId,
            operationId: atom.operationId,
            scenario: caseId,
            score,
            operationActive,
            activeOperationIds,
            elementCount: states.length,
            elements: states,
          }));
        }
      });
      return sortedUnique(activeOperationIds);
    };

    for (const family of validated.dependencyPlan) {
      const cases = [...normalizeArray(family.cases)].sort((left, right) => (
        Number(left.order || 0) - Number(right.order || 0)
        || left.caseId.localeCompare(right.caseId)
      ));
      for (const caseRecord of cases) {
        if (
          requestedCaseIds.size
          && !requestedCaseIds.has(caseRecord.caseId)
        ) {
          continue;
        }
        const traceStart = trace.length;
        const activatedOperationIds = normalizeArray(
          caseRecord.activatesOperationIds,
        );
        const activatedAtomIds = activatedOperationIds.flatMap(
          operationId => publicAtomIdsByOperation.get(operationId) || [],
        );
        const materialAtomIds = new Set(
          latestAuditSnapshot.materialAtomIds || [],
        );
        if (
          caseRecord.alwaysObserve !== true
          &&
          activatedAtomIds.length > 0
          && activatedAtomIds.every(atomId => materialAtomIds.has(atomId))
        ) {
          outcome({
            familyId: family.familyId,
            caseId: caseRecord.caseId,
            phase: "execution",
            code: "already-materialized",
            detail: { activatedOperationIds },
          });
          scenarioSnapshots.push(deepFreeze({
            familyId: family.familyId,
            caseId: caseRecord.caseId,
            driver: getCaseDriver(family, caseRecord),
            activatesOperationIds: activatedOperationIds,
            activeOperationIds: [],
            materialAtomCount: latestAuditSnapshot.materialAtomCount,
            traceStart,
            traceEnd: trace.length,
            outcomeCodes: trace.slice(traceStart).map(entry => entry.code),
            resultStatus: document.getElementById(
              "classical-rule-logic-surface",
            )?.dataset?.classicalNahuatlSurfaceStatus || "",
            continuationResultPresent: Boolean(document.querySelector(
              "[data-classical-clause-relation-canonical-result]",
            )),
            domState: getScenarioDomState(),
          }));
          continue;
        }
        await runCase(family, caseRecord);
        // A route may finish on a control event whose rendering work was
        // queued by an earlier source commit.  Material proof must observe
        // the final live control state, not the transient pre-render shell.
        await waitForStableDom({ requireResultSettled: true });
        const activeFrame = getActiveSurfaceFrame(targetWindow);
        const activeOperationIds = observeInteractive(
          caseRecord.caseId,
          activeFrame,
        );
        const snapshot = audit.observe(caseRecord.caseId, {
          activeOperationIds,
          diagnosticAtomIds: activatedAtomIds,
        });
        latestAuditSnapshot = snapshot;
        scenarioSnapshots.push(deepFreeze({
          familyId: family.familyId,
          caseId: caseRecord.caseId,
          driver: getCaseDriver(family, caseRecord),
          activatesOperationIds: activatedOperationIds,
          activeOperationIds,
          materialObservationDiagnostics:
            snapshot.observationDiagnostics || [],
          materialAtomCount: snapshot.materialAtomCount,
          traceStart,
          traceEnd: trace.length,
          outcomeCodes: trace.slice(traceStart).map(entry => entry.code),
          resultStatus: document.getElementById(
            "classical-rule-logic-surface",
          )?.dataset?.classicalNahuatlSurfaceStatus || "",
          continuationResultPresent: Boolean(document.querySelector(
            "[data-classical-clause-relation-canonical-result]",
          )),
          domState: getScenarioDomState(),
        }));
      }
    }

    const report = audit.finalize();
    const unmaterializedById = new Map(
      report.unmaterialized.map(entry => [entry.atomId, entry]),
    );
    const receiptById = new Map(
      report.materialReceipts.map(entry => [entry.atomId, entry]),
    );
    const casesByOperation = Object.fromEntries(
      validated.routeOperationIds.map(operationId => [
        operationId,
        validated.families.flatMap(family => (
          normalizeArray(family.cases)
            .filter(caseRecord => normalizeArray(
              caseRecord.activatesOperationIds,
            ).includes(operationId))
            .map(caseRecord => caseRecord.caseId)
        )),
      ]),
    );
    const perAtom = validated.publicAtoms
      .map(atom => {
        const receipt = receiptById.get(atom.atomId) || null;
        const unmaterialized = unmaterializedById.get(atom.atomId) || null;
        return deepFreeze({
          atomId: atom.atomId,
          atomKind: atom.atomKind,
          operationId: atom.operationId,
          status: receipt ? "material" : "unmaterialized",
          caseIds: casesByOperation[atom.operationId] || [],
          observationLabel: receipt?.observationLabel || "",
          primaryReason: unmaterialized?.primaryReason || null,
          reasons: unmaterialized?.reasons || [],
        });
      })
      .sort((left, right) => left.atomId.localeCompare(right.atomId));
    const unmaterializedByOperationReason = Object.values(
      report.unmaterialized.reduce((groups, entry) => {
        const operationId = entry.operationId || "unknown";
        groups[operationId] ||= {
          operationId,
          atomIds: [],
          atomOutcomes: [],
          reasons: [],
        };
        groups[operationId].atomIds.push(entry.atomId);
        groups[operationId].atomOutcomes.push({
          atomId: entry.atomId,
          primaryReason: entry.primaryReason || entry.reasons?.[0] || null,
          reasons: entry.reasons || [],
        });
        groups[operationId].reasons.push(...(entry.reasons || []));
        return groups;
      }, {}),
    ).map(group => deepFreeze({
      operationId: group.operationId,
      atomIds: sortedUnique(group.atomIds),
      atomOutcomes: group.atomOutcomes.sort((left, right) => (
        left.atomId.localeCompare(right.atomId)
      )),
      reasons: sortedUnique(group.reasons),
      scenarioTraceOutcomes: scenarioSnapshots
        .filter(snapshot => snapshot.activatesOperationIds.includes(
          group.operationId,
        ))
        .map(snapshot => ({
          familyId: snapshot.familyId,
          caseId: snapshot.caseId,
          outcomeCodes: sortedUnique(snapshot.outcomeCodes),
        }))
        .sort((left, right) => (
          left.familyId.localeCompare(right.familyId)
          || left.caseId.localeCompare(right.caseId)
        )),
    })).sort((left, right) => (
      left.operationId.localeCompare(right.operationId)
    ));

    return deepFreeze({
      kind: EXECUTOR_KIND,
      version: EXECUTOR_VERSION,
      authority: {
        proofOnly: true,
        uiAuthority: "none",
        grammarAuthority: false,
        semanticOwnerAuthority: false,
        canonicalGenerationAuthority: false,
        runtimeInstallable: false,
      },
      inventory: {
        atomCount: validated.atoms.length,
        publicAtomCount: validated.publicAtoms.length,
        privateAtomCount: validated.privateAtoms.length,
        routeOperationCount: validated.routeOperationIds.length,
        publicOperationCount: validated.publicOperationIds.length,
        publicAtomIds: validated.publicAtoms.map(atom => atom.atomId).sort(),
        privateAtomIds: validated.privateAtoms.map(atom => atom.atomId).sort(),
      },
      report,
      diagnostic: {
        familyCount: validated.families.length,
        caseCount: caseById.size,
        dependencyPlan: validated.dependencyPlan.map(
          family => family.familyId,
        ),
        primaryProviders: Object.fromEntries(
          validated.families.flatMap(family => (
            normalizeArray(family.providesOperationIds).map(
              operationId => [operationId, family.familyId],
            )
          )),
        ),
        casesByOperation,
        scenarioSnapshots,
        trace,
        interactiveControlObservations: [
          ...interactiveObservations.values(),
        ].sort((left, right) => left.atomId.localeCompare(right.atomId)),
        perAtom,
        unmaterializedByOperationReason,
        unmaterializedAtomReasons: report.unmaterialized.map(entry => ({
          atomId: entry.atomId,
          operationId: entry.operationId,
          primaryReason: entry.primaryReason || entry.reasons?.[0] || null,
          reasons: entry.reasons,
        })),
      },
    });
  }

  return Object.freeze({
    kind: EXECUTOR_KIND,
    version: EXECUTOR_VERSION,
    execute,
    waitForStableDom,
  });
}

export async function executeClassicalSgrRouteRecipeRegistry(
  registry,
  targetWindow = globalThis.window,
  { caseIds = [] } = {},
) {
  return createClassicalSgrRecipeExecutor(targetWindow).execute({
    registry,
    caseIds,
  });
}
