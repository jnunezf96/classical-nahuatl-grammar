import {
  getClassicalSourceGrammarResultSurfaceInventory,
} from "../../ui/state.mjs";

// Run inside the delivered page. Call observe() after each real Source →
// Grammar → Result scenario, then finalize() for the exact public-material /
// private-inert outcome ledger or assertComplete() to require every outcome in
// the delivered Source → Grammar → Result inventory.

const AUDIT_KIND = "classical-sgr-material-browser-audit";
const MATERIAL_RECEIPT_KIND = "classical-sgr-material-dom-receipt";
const CAPTURE_SLOT = "classical-sgr-material-browser-audit";
const CORRELATION_ATTRIBUTES = Object.freeze([
  "data-classical-surface-atom-ids",
  "data-classical-surface-atom-id",
  "data-classical-output-contract-ids",
  "data-classical-output-contract-id",
]);
const INTERACTIVE_TAGS = new Set(["BUTTON", "INPUT", "SELECT", "TEXTAREA"]);
const INTERACTIVE_ROLES = new Set([
  "button",
  "checkbox",
  "combobox",
  "listbox",
  "radio",
  "slider",
  "spinbutton",
  "switch",
  "textbox",
]);
const FAILURE_REASON_PRECEDENCE = Object.freeze([
  "private-atom-exposed-in-live-dom",
  "dom-correlation-does-not-deny-grammar-authority",
  "interactive-control-is-outside-grammar",
  "readout-is-outside-grammar",
  "output-is-outside-result",
  "output-is-not-inside-a-canonical-result-root",
  "determined-fact-is-rendered-as-a-control",
  "correlation-target-is-not-an-interactive-control",
  "interactive-control-lacks-live-grammar-binding",
  "readout-has-no-canonical-owner-value",
  "analysis-output-has-no-atom-specific-readout",
  "exact-owner-issued-operation-output-result-not-observed",
  "exact-owner-issued-operation-result-not-observed",
  "interactive-control-operation-is-not-active",
  "interactive-control-is-not-currently-available",
  "interactive-control-has-no-live-value-or-options",
  "output-node-does-not-project-a-canonical-result-value",
  "readout-or-result-has-no-live-content",
  "no-correlated-live-dom-node-observed",
  "browser-observation-not-run",
]);
const FAILURE_REASON_RANK = new Map(
  FAILURE_REASON_PRECEDENCE.map((reason, index) => [reason, index]),
);

function freezeRecord(value) {
  if (Array.isArray(value)) {
    return Object.freeze(value.map(freezeRecord));
  }
  if (!value || typeof value !== "object") return value;
  return Object.freeze(Object.fromEntries(
    Object.entries(value).map(([key, entry]) => [key, freezeRecord(entry)]),
  ));
}

const CURRENT_SURFACE_INVENTORY =
  getClassicalSourceGrammarResultSurfaceInventory();
const CURRENT_SURFACE_ATOMS = [
  ...CURRENT_SURFACE_INVENTORY.axes,
  ...CURRENT_SURFACE_INVENTORY.outputs,
];

export const CLASSICAL_SGR_MATERIAL_OUTCOME_SCHEMA = freezeRecord({
  kind: "classical-sgr-material-browser-atom-outcome-schema",
  version: 1,
  atomCount: CURRENT_SURFACE_ATOMS.length,
  publicAtomCount: CURRENT_SURFACE_ATOMS.filter(
    atom => atom.binding?.public === true,
  ).length,
  privateAtomCount: CURRENT_SURFACE_ATOMS.filter(
    atom => atom.binding?.public === false,
  ).length,
  publicExpectation: "materialized",
  privateExpectation: "private-inert",
  outcomes: [
    "materialized",
    "unmaterialized",
    "private-inert",
    "private-exposed",
  ],
  failureReasonPrecedence: FAILURE_REASON_PRECEDENCE,
});

function sortedUnique(values) {
  return [...new Set(values)].sort((left, right) => left.localeCompare(right));
}

function orderedFailureReasons(values) {
  return sortedUnique(values).sort((left, right) => {
    const leftRank = FAILURE_REASON_RANK.get(left);
    const rightRank = FAILURE_REASON_RANK.get(right);
    if (leftRank !== undefined || rightRank !== undefined) {
      return (leftRank ?? Number.MAX_SAFE_INTEGER)
        - (rightRank ?? Number.MAX_SAFE_INTEGER);
    }
    return left.localeCompare(right);
  });
}

function compareAtomsById(left, right) {
  return String(left?.atomId || "").localeCompare(String(right?.atomId || ""));
}

function projectAtomIdentity(atom) {
  return {
    atomId: atom.atomId,
    atomKind: atom.atomKind,
    operationId: atom.operationId,
    ...(atom.atomKind === "axis"
      ? { axisId: atom.axisId }
      : { outputKind: atom.outputKind }),
    disposition: atom.disposition,
    stage: atom.binding.stage,
  };
}

function normalizeMaterialText(value) {
  return String(value || "")
    .normalize("NFC")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

function attributeTokens(element, attributeName) {
  return String(element?.getAttribute?.(attributeName) || "")
    .split(/\s+/u)
    .map(value => value.trim())
    .filter(Boolean);
}

function isInteractiveElement(element) {
  const tagName = String(element?.tagName || "").toUpperCase();
  const role = String(element?.getAttribute?.("role") || "").toLowerCase();
  return INTERACTIVE_TAGS.has(tagName) || INTERACTIVE_ROLES.has(role);
}

function isElementAvailable(element) {
  if (!element?.isConnected || element.hidden === true) return false;
  if (element.getAttribute?.("aria-hidden") === "true") return false;
  if (element.disabled === true || element.getAttribute?.("aria-disabled") === "true") {
    return false;
  }
  for (let parent = element.parentElement; parent; parent = parent.parentElement) {
    if (parent.hidden === true || parent.getAttribute?.("aria-hidden") === "true") {
      return false;
    }
  }
  try {
    const view = element.ownerDocument?.defaultView;
    const style = view?.getComputedStyle?.(element);
    if (style?.display === "none" || style?.visibility === "hidden") return false;
  } catch {
    return false;
  }
  return true;
}

function getElementLocator(element) {
  if (element?.id) return `#${element.id}`;
  const atomId = element?.getAttribute?.("data-classical-surface-atom-id");
  if (atomId) return `[data-classical-surface-atom-id="${atomId}"]`;
  const outputId = element?.getAttribute?.("data-classical-output-contract-id");
  if (outputId) return `[data-classical-output-contract-id="${outputId}"]`;
  const action = element?.getAttribute?.("data-classical-rule-logic-control")
    || element?.getAttribute?.("data-classical-clause-relation-decision");
  if (action) return `[data-classical-control="${action}"]`;
  return String(element?.tagName || "unknown").toLowerCase();
}

function getControlMaterial(element) {
  const tagName = String(element?.tagName || "").toUpperCase();
  const type = String(element?.type || element?.getAttribute?.("role") || "");
  const options = tagName === "SELECT"
    ? Array.from(element.options || []).filter(option => !option.disabled).map(option => ({
        value: String(option.value || ""),
        label: String(option.textContent || "").trim(),
      }))
    : [];
  const value = tagName === "BUTTON"
    ? String(element.getAttribute?.("aria-pressed") || element.textContent || "").trim()
    : String(element?.value ?? element?.getAttribute?.("aria-valuenow") ?? "");
  return {
    tagName,
    type,
    value,
    options,
    disabled: element?.disabled === true,
  };
}

function isTraversableRecord(value) {
  if (!value || typeof value !== "object" || value.nodeType || value.window === value) {
    return false;
  }
  if (Array.isArray(value)) return true;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function collectIssuedApplicationResults(targetWindow) {
  const isApplicationResult = targetWindow?.isClassicalGrammarApplicationResult;
  const captureResult = targetWindow?.captureClassicalGrammarApplicationResult;
  const isCapture = targetWindow?.isClassicalGrammarApplicationResultCapture;
  if (
    typeof isApplicationResult !== "function"
    || typeof captureResult !== "function"
    || typeof isCapture !== "function"
  ) {
    return [];
  }
  const materialApplicationResults = (() => {
    try {
      return Array.from(
        targetWindow?.getClassicalSgrMaterialApplicationResults?.() || [],
      );
    } catch {
      return [];
    }
  })();
  const roots = [
    ...materialApplicationResults,
    ...Object.getOwnPropertyNames(targetWindow)
    .filter(name => /^__CLASSICAL_/u.test(name))
    .flatMap(name => {
      try {
        const value = targetWindow[name];
        return value && typeof value === "object" ? [value] : [];
      } catch {
        return [];
      }
    }),
  ];
  const queue = roots.map(value => ({ value, depth: 0 }));
  const seen = new Set();
  const results = new Set();
  while (queue.length && seen.size < 10000) {
    const { value, depth } = queue.shift();
    if (!value || typeof value !== "object" || seen.has(value)) continue;
    seen.add(value);
    try {
      if (Reflect.apply(isApplicationResult, targetWindow, [value]) === true) {
        results.add(value);
      } else {
        const capture = Reflect.apply(captureResult, targetWindow, [
          value,
          CAPTURE_SLOT,
        ]);
        if (Reflect.apply(isCapture, targetWindow, [capture, CAPTURE_SLOT]) === true) {
          results.add(capture.applicationResult);
        }
      }
    } catch {
      // A non-result object is expected to fail closed.
    }
    if (depth >= 7 || !isTraversableRecord(value)) continue;
    let children = [];
    try {
      children = Array.isArray(value) ? value : Object.values(value);
    } catch {
      children = [];
    }
    children.forEach(child => {
      if (child && typeof child === "object" && !child.nodeType) {
        queue.push({ value: child, depth: depth + 1 });
      }
    });
  }
  return [...results].filter(result => (
    result?.authorizationStatus === "authorized"
    && result?.canonicalResult
  ));
}

function buildDomCorrelationIndex(document) {
  const elementsByAtomId = new Map();
  const observedAtomIds = [];
  CORRELATION_ATTRIBUTES.forEach(attributeName => {
    document.querySelectorAll?.(`[${attributeName}]`).forEach(element => {
      const tokens = attributeTokens(element, attributeName);
      observedAtomIds.push(...tokens);
      const correlationIds = attributeName.endsWith("-ids")
        ? tokens
        : [String(element.getAttribute?.(attributeName) || "").trim()]
          .filter(Boolean);
      correlationIds.forEach(atomId => {
        if (!elementsByAtomId.has(atomId)) {
          elementsByAtomId.set(atomId, new Set());
        }
        elementsByAtomId.get(atomId).add(element);
      });
    });
  });
  return {
    elementsByAtomId,
    observedAtomIds: sortedUnique(observedAtomIds),
  };
}

function collectCorrelatedElements(correlationIndex, atom) {
  return [...(correlationIndex.elementsByAtomId.get(atom.atomId) || [])];
}

function findMatchingApplicationResult(applicationResults, atom) {
  return applicationResults.find(result => (
    result.operationId === atom.operationId
    && (
      atom.atomKind === "axis"
      || result.outputKind === atom.outputKind
    )
  )) || null;
}

function collectOwnerResultWitnesses(targetWindow) {
  let records = [];
  try {
    records = Array.from(
      targetWindow?.getClassicalSgrMaterialOwnerResults?.()
      || targetWindow?.__CLASSICAL_SGR_MATERIAL_OWNER_RESULTS__
      || [],
    );
  } catch {
    records = [];
  }
  return records.filter(record => {
    const validator = targetWindow?.[record?.validatorName];
    try {
      return Boolean(
        record?.operationId
        && record?.canonicalResult
        && typeof validator === "function"
        && Reflect.apply(validator, targetWindow, [record.canonicalResult])
          === true
      );
    } catch {
      return false;
    }
  });
}

function getCurrentSurfaceFrame(targetWindow, document) {
  const getActiveSurfaceFrame =
    targetWindow?.getActiveClassicalRuleLogicSurfaceFrame;
  if (typeof getActiveSurfaceFrame === "function") {
    try {
      const activeSurfaceFrame = Reflect.apply(
        getActiveSurfaceFrame,
        targetWindow,
        [],
      );
      if (activeSurfaceFrame) return activeSurfaceFrame;
    } catch {
      // Fall through to the construction-specific browser mirrors.
    }
  }
  const construction = String(document.getElementById?.(
    "classical-construction-operation",
  )?.value || "");
  if (construction === "relational-nnc") {
    return targetWindow.__CLASSICAL_RELATIONAL_NNC_RESULT__ || null;
  }
  if (construction === "denominal-vnc") {
    return targetWindow.__CLASSICAL_DENOMINAL_VNC_FRAME__ || null;
  }
  if (construction === "adverbial-nuclear") {
    return targetWindow.__CLASSICAL_ADVERBIAL_NUCLEAR_RESULT__ || null;
  }
  if (construction && construction !== "none") {
    return targetWindow.__CLASSICAL_NOMINAL_CONSTRUCTION_FRAME__ || null;
  }
  return targetWindow.__CLASSICAL_CLASSICAL_RULE_LOGIC_SURFACE_FRAME__ || null;
}

function getActiveOperationIds(targetWindow, document) {
  const getActive = targetWindow?.getClassicalSgrActiveOperationIds;
  const surfaceFrame = getCurrentSurfaceFrame(targetWindow, document);
  const renderedActiveOperationIds = String(
    document.getElementById?.("classical-rule-logic-surface")?.dataset
      ?.classicalSgrActiveOperationIds || "",
  ).split(/\s+/u).filter(Boolean);
  if (surfaceFrame && typeof getActive === "function") {
    try {
      const active = Reflect.apply(getActive, targetWindow, [surfaceFrame]);
      return new Set([
        ...Array.from(active || []),
        ...renderedActiveOperationIds,
      ]);
    } catch {
      // Fall through to the exact operation IDs recorded during rendering.
    }
  }
  return new Set(renderedActiveOperationIds);
}

function collectCanonicalResultWitnesses(
  canonicalResult,
  { allowOperationIdentifiers = false } = {},
) {
  const witnesses = new Set();
  const queue = [{ value: canonicalResult, depth: 0 }];
  const seen = new Set();
  while (queue.length && seen.size < 2000) {
    const { value, depth } = queue.shift();
    if (!value || typeof value !== "object" || seen.has(value)) continue;
    seen.add(value);
    let entries = [];
    try {
      entries = Array.isArray(value)
        ? value.map((entry, index) => [String(index), entry])
        : Object.entries(value);
    } catch {
      entries = [];
    }
    entries.forEach(([key, child]) => {
      const normalizedKey = String(key || "").toLowerCase();
      const isOperationIdentifier = [
        "operation",
        "operationid",
        "outputkind",
      ].includes(normalizedKey);
      if (
        typeof child === "string"
        && child.trim().length >= 2
        && (
          /(surface|formula|realization|classification|transcription|analysis|projection|voice|stem)/iu.test(key)
          || (allowOperationIdentifiers && isOperationIdentifier)
        )
        && (allowOperationIdentifiers || !isOperationIdentifier)
        && !/(authority|sourcepath|blockreason)/iu.test(key)
      ) {
        witnesses.add(child.trim());
      } else if (
        child
        && typeof child === "object"
        && !child.nodeType
        && depth < 5
      ) {
        queue.push({ value: child, depth: depth + 1 });
      }
    });
  }
  return [...witnesses];
}

function getMaterialCandidate(
  atom,
  element,
  applicationResults,
  ownerResultWitnesses,
  activeOperationIds,
) {
  const inGrammar = Boolean(element.closest?.("#classical-authority-panel"));
  const inResult = Boolean(element.closest?.("#classical-result-panel"));
  if (element.dataset?.classicalGrammarAuthority !== "false") {
    return { reason: "dom-correlation-does-not-deny-grammar-authority" };
  }
  if (atom.atomKind === "axis" && atom.disposition === "interactive-choice") {
    if (!activeOperationIds.has(atom.operationId)) {
      return { reason: "interactive-control-operation-is-not-active" };
    }
    if (!isInteractiveElement(element)) {
      return { reason: "correlation-target-is-not-an-interactive-control" };
    }
    if (!inGrammar) return { reason: "interactive-control-is-outside-grammar" };
    if (element.dataset?.classicalSgrBindingStage !== "grammar") {
      return { reason: "interactive-control-lacks-live-grammar-binding" };
    }
    if (!isElementAvailable(element)) {
      return { reason: "interactive-control-is-not-currently-available" };
    }
    const material = getControlMaterial(element);
    if (!material.value && material.options.length === 0) {
      return { reason: "interactive-control-has-no-live-value-or-options" };
    }
    return { material: { control: material } };
  }
  const applicationResult = findMatchingApplicationResult(
    applicationResults,
    atom,
  );
  const ownerResultWitness = atom.atomKind === "axis"
    ? ownerResultWitnesses.find(record => (
        record.operationId === atom.operationId
      )) || null
    : null;
  if (!applicationResult && !ownerResultWitness) {
    return { reason: atom.atomKind === "axis"
      ? "exact-owner-issued-operation-result-not-observed"
      : "exact-owner-issued-operation-output-result-not-observed" };
  }
  if (atom.atomKind === "axis") {
    if (!inGrammar) return { reason: "readout-is-outside-grammar" };
    if (isInteractiveElement(element)) {
      return { reason: "determined-fact-is-rendered-as-a-control" };
    }
    if (element.dataset?.classicalFactProjection !== "canonical-value") {
      return { reason: "readout-has-no-canonical-owner-value" };
    }
  } else {
    if (!inResult) return { reason: "output-is-outside-result" };
    if (!element.closest?.('[data-classical-sgr-result-authority="canonical-only"]')) {
      return { reason: "output-is-not-inside-a-canonical-result-root" };
    }
    if (
      atom.disposition === "analysis-readout"
      && element.getAttribute?.("data-classical-output-contract-id")
        !== atom.atomId
    ) {
      return { reason: "analysis-output-has-no-atom-specific-readout" };
    }
  }
  const text = String(element.textContent || "").trim();
  if (!text) return { reason: "readout-or-result-has-no-live-content" };
  if (atom.atomKind === "output") {
    const canonicalWitnesses = collectCanonicalResultWitnesses(
      applicationResult.canonicalResult,
      { allowOperationIdentifiers: atom.disposition === "composed-projection" },
    );
    const normalizedText = normalizeMaterialText(text);
    if (!canonicalWitnesses.some(witness => {
      const normalizedWitness = normalizeMaterialText(witness);
      return normalizedWitness && normalizedText.includes(normalizedWitness);
    })) {
      return { reason: "output-node-does-not-project-a-canonical-result-value" };
    }
  }
  return {
    material: {
      text,
      applicationResult: {
        kind: applicationResult?.kind || "canonical-owner-result",
        operationId:
          applicationResult?.operationId
          || ownerResultWitness?.operationId
          || "",
        outputKind: applicationResult?.outputKind || "owner-axis-witness",
        authorizationStatus:
          applicationResult?.authorizationStatus || "authorized",
        canonicalResultKind:
          applicationResult?.canonicalResult?.kind
          || ownerResultWitness?.canonicalResult?.kind
          || "",
      },
    },
  };
}

function createReceipt(atom, element, observationLabel, material) {
  return freezeRecord({
    kind: MATERIAL_RECEIPT_KIND,
    version: 1,
    atomId: atom.atomId,
    atomKind: atom.atomKind,
    operationId: atom.operationId,
    ...(atom.atomKind === "axis"
      ? { axisId: atom.axisId }
      : { outputKind: atom.outputKind }),
    disposition: atom.disposition,
    stage: atom.binding.stage,
    observationLabel,
    locator: getElementLocator(element),
    domSource: "live-production-document",
    material,
  });
}

export function createClassicalSgrMaterialBrowserAudit(targetWindow = globalThis.window) {
  const document = targetWindow?.document;
  if (!document?.querySelectorAll) {
    throw new Error("classical-sgr-material-browser-document-required");
  }
  const inventory = getClassicalSourceGrammarResultSurfaceInventory();
  const allAtoms = [...inventory.axes, ...inventory.outputs];
  const publicAtoms = allAtoms.filter(atom => atom.binding?.public === true);
  const privateAtoms = allAtoms.filter(atom => atom.binding?.public === false);
  if (
    inventory.kind !== "classical-source-grammar-result-surface-inventory"
    || inventory.version !== CURRENT_SURFACE_INVENTORY.version
    || inventory.authority?.uiAuthority !== "none"
    || inventory.authority?.grammarAuthority !== false
    || allAtoms.length !== CLASSICAL_SGR_MATERIAL_OUTCOME_SCHEMA.atomCount
    || publicAtoms.length
      !== CLASSICAL_SGR_MATERIAL_OUTCOME_SCHEMA.publicAtomCount
    || privateAtoms.length
      !== CLASSICAL_SGR_MATERIAL_OUTCOME_SCHEMA.privateAtomCount
    || new Set(allAtoms.map(atom => atom.atomId)).size !== allAtoms.length
  ) {
    throw new Error("classical-sgr-material-browser-inventory-drift");
  }
  const publicById = new Map(publicAtoms.map(atom => [atom.atomId, atom]));
  const privateIds = new Set(privateAtoms.map(atom => atom.atomId));
  const receiptsByAtom = new Map();
  const rejectedReasonsByAtom = new Map();
  const observationLabels = [];
  let lastObservationDiagnostics = Object.freeze([]);
  const unexpectedDomIds = new Set();
  const privateDomTargets = new Set();

  function addRejectedReason(atomId, reason) {
    if (!rejectedReasonsByAtom.has(atomId)) {
      rejectedReasonsByAtom.set(atomId, new Set());
    }
    rejectedReasonsByAtom.get(atomId).add(reason);
  }

  function observe(
    observationLabel = "observation",
    {
      activeOperationIds: observedActiveOperationIds = [],
      diagnosticAtomIds = [],
    } = {},
  ) {
    const normalizedLabel = String(observationLabel || "observation").trim();
    observationLabels.push(normalizedLabel);
    const applicationResults = collectIssuedApplicationResults(targetWindow);
    const ownerResultWitnesses = collectOwnerResultWitnesses(targetWindow);
    const activeOperationIds = new Set([
      ...getActiveOperationIds(targetWindow, document),
      ...Array.from(observedActiveOperationIds || []),
    ]);
    const correlationIndex = buildDomCorrelationIndex(document);
    const diagnosticIdSet = new Set(Array.from(diagnosticAtomIds || []));
    const diagnostics = [];
    correlationIndex.observedAtomIds.forEach(atomId => {
      if (privateIds.has(atomId)) privateDomTargets.add(atomId);
      else if (!publicById.has(atomId)) unexpectedDomIds.add(atomId);
    });
    publicAtoms.forEach(atom => {
      const elements = collectCorrelatedElements(correlationIndex, atom);
      if (!elements.length) {
        addRejectedReason(atom.atomId, "no-correlated-live-dom-node-observed");
        return;
      }
      let accepted = false;
      const diagnosticCandidates = [];
      elements.forEach(element => {
        const candidate = getMaterialCandidate(
          atom,
          element,
          applicationResults,
          ownerResultWitnesses,
          activeOperationIds,
        );
        if (diagnosticIdSet.has(atom.atomId)) {
          let hiddenAncestor = null;
          for (
            let parent = element.parentElement;
            parent;
            parent = parent.parentElement
          ) {
            if (
              parent.hidden === true
              || parent.getAttribute?.("aria-hidden") === "true"
            ) {
              hiddenAncestor = parent;
              break;
            }
          }
          const style = element.ownerDocument?.defaultView
            ?.getComputedStyle?.(element) || null;
          diagnosticCandidates.push({
            reason: candidate.reason || "material",
            operationActive: activeOperationIds.has(atom.operationId),
            available: isElementAvailable(element),
            disabled: element.disabled === true,
            hidden: element.hidden === true,
            ariaHidden: element.getAttribute?.("aria-hidden") || "",
            isConnected: element.isConnected === true,
            hiddenAncestor: hiddenAncestor ? {
              id: hiddenAncestor.id || "",
              className: String(hiddenAncestor.className || ""),
              hidden: hiddenAncestor.hidden === true,
              ariaHidden:
                hiddenAncestor.getAttribute?.("aria-hidden") || "",
            } : null,
            display: style?.display || "",
            visibility: style?.visibility || "",
          });
        }
        if (candidate.material && !receiptsByAtom.has(atom.atomId)) {
          receiptsByAtom.set(atom.atomId, createReceipt(
            atom,
            element,
            normalizedLabel,
            candidate.material,
          ));
          accepted = true;
        } else if (candidate.reason) {
          addRejectedReason(atom.atomId, candidate.reason);
        }
      });
      if (diagnosticIdSet.has(atom.atomId)) {
        diagnostics.push({
          atomId: atom.atomId,
          candidates: diagnosticCandidates,
        });
      }
      return accepted;
    });
    lastObservationDiagnostics = freezeRecord(diagnostics);
    return snapshot();
  }

  function snapshot() {
    const materialAtomIds = sortedUnique([...receiptsByAtom.keys()]);
    const materialIdSet = new Set(materialAtomIds);
    const unmaterializedAtomIds = publicAtoms
      .filter(atom => !materialIdSet.has(atom.atomId))
      .map(atom => atom.atomId)
      .sort((left, right) => left.localeCompare(right));
    return freezeRecord({
      kind: AUDIT_KIND,
      version: 1,
      observationCount: observationLabels.length,
      publicAtomCount: publicAtoms.length,
      privateAtomCount: privateAtoms.length,
      materialAtomCount: materialAtomIds.length,
      materialAtomIds,
      unmaterializedAtomCount: unmaterializedAtomIds.length,
      unmaterializedAtomIds,
      privateExposedAtomCount: privateDomTargets.size,
      privateExposedAtomIds: sortedUnique([...privateDomTargets]),
      privateDomTargets: sortedUnique([...privateDomTargets]),
      unexpectedDomIds: sortedUnique([...unexpectedDomIds]),
      observationDiagnostics: lastObservationDiagnostics,
    });
  }

  function finalize() {
    const materialAtomIds = sortedUnique([...receiptsByAtom.keys()]);
    const materialIdSet = new Set(materialAtomIds);
    const publicAtomOutcomes = [...publicAtoms]
      .sort(compareAtomsById)
      .map(atom => {
        const receipt = receiptsByAtom.get(atom.atomId) || null;
        if (receipt) {
          return freezeRecord({
            ...projectAtomIdentity(atom),
            expectation: "materialized",
            outcome: "materialized",
            passed: true,
            primaryReason: null,
            reasons: [],
            receipt,
          });
        }
        const observedReasons = [
          ...(rejectedReasonsByAtom.get(atom.atomId) || []),
        ];
        const reasons = orderedFailureReasons(observedReasons.length
          ? observedReasons
          : ["browser-observation-not-run"]);
        return freezeRecord({
          ...projectAtomIdentity(atom),
          expectation: "materialized",
          outcome: "unmaterialized",
          passed: false,
          primaryReason: reasons[0],
          reasons,
          receipt: null,
        });
      });
    const privateAtomOutcomes = [...privateAtoms]
      .sort(compareAtomsById)
      .map(atom => {
        const exposed = privateDomTargets.has(atom.atomId);
        const reasons = exposed
          ? ["private-atom-exposed-in-live-dom"]
          : [];
        return freezeRecord({
          ...projectAtomIdentity(atom),
          expectation: "private-inert",
          outcome: exposed ? "private-exposed" : "private-inert",
          passed: !exposed,
          primaryReason: reasons[0] || null,
          reasons,
          receipt: null,
        });
      });
    const atomOutcomes = [...publicAtomOutcomes, ...privateAtomOutcomes]
      .sort(compareAtomsById);
    const unmaterialized = publicAtomOutcomes
      .filter(outcome => outcome.outcome === "unmaterialized");
    const impossible = unmaterialized;
    const privateExposed = privateAtomOutcomes
      .filter(outcome => outcome.outcome === "private-exposed");
    const privateInert = privateAtomOutcomes
      .filter(outcome => outcome.outcome === "private-inert");
    const unmaterializedAtomIds = unmaterialized.map(entry => entry.atomId);
    const impossibleAtomIds = unmaterializedAtomIds;
    const privateExposedAtomIds = privateExposed.map(entry => entry.atomId);
    const privateInertAtomIds = privateInert.map(entry => entry.atomId);
    const atomOutcomeIds = atomOutcomes.map(entry => entry.atomId);
    const allAtomIds = sortedUnique(allAtoms.map(atom => atom.atomId));
    const atomOutcomeSetEquality = {
      missing: allAtomIds.filter(atomId => !atomOutcomeIds.includes(atomId)),
      unexpected: atomOutcomeIds.filter(atomId => !allAtoms.some(atom => (
        atom.atomId === atomId
      ))),
    };
    const publicOutcomeAtomIds = publicAtomOutcomes.map(entry => entry.atomId);
    const publicOutcomeSetEquality = {
      missing: sortedUnique(publicAtoms.map(atom => atom.atomId))
        .filter(atomId => !publicOutcomeAtomIds.includes(atomId)),
      unexpected: publicOutcomeAtomIds.filter(atomId => !publicById.has(atomId)),
    };
    const privateOutcomeAtomIds = privateAtomOutcomes.map(entry => entry.atomId);
    const privateOutcomeSetEquality = {
      missing: sortedUnique(privateAtoms.map(atom => atom.atomId))
        .filter(atomId => !privateOutcomeAtomIds.includes(atomId)),
      unexpected: privateOutcomeAtomIds.filter(atomId => !privateIds.has(atomId)),
    };
    const partitionIds = sortedUnique([
      ...materialAtomIds,
      ...impossibleAtomIds,
    ]);
    const publicAtomIds = sortedUnique(publicAtoms.map(atom => atom.atomId));
    const publicSetEquality = {
      missing: publicAtomIds.filter(atomId => !partitionIds.includes(atomId)),
      unexpected: partitionIds.filter(atomId => !publicById.has(atomId)),
    };
    const materialSetEquality = {
      missing: publicAtomIds.filter(atomId => !materialIdSet.has(atomId)),
      unexpected: materialAtomIds.filter(atomId => !publicById.has(atomId)),
    };
    const materialReceipts = materialAtomIds.map(atomId => receiptsByAtom.get(atomId));
    const complete = (
      materialAtomIds.length === publicAtoms.length
      && unmaterialized.length === 0
      && privateDomTargets.size === 0
      && unexpectedDomIds.size === 0
      && materialSetEquality.missing.length === 0
      && materialSetEquality.unexpected.length === 0
      && publicSetEquality.missing.length === 0
      && publicSetEquality.unexpected.length === 0
      && atomOutcomeSetEquality.missing.length === 0
      && atomOutcomeSetEquality.unexpected.length === 0
      && publicOutcomeSetEquality.missing.length === 0
      && publicOutcomeSetEquality.unexpected.length === 0
      && privateOutcomeSetEquality.missing.length === 0
      && privateOutcomeSetEquality.unexpected.length === 0
    );
    return freezeRecord({
      kind: AUDIT_KIND,
      version: 1,
      complete,
      authority: {
        uiAuthority: "none",
        grammarAuthority: false,
      },
      inventory: {
        kind: inventory.kind,
        version: inventory.version,
        atomCount: allAtoms.length,
        publicAtomCount: publicAtoms.length,
        privateAtomCount: privateAtoms.length,
      },
      outcomeSchema: CLASSICAL_SGR_MATERIAL_OUTCOME_SCHEMA,
      observationLabels: [...observationLabels],
      atomOutcomeCount: atomOutcomes.length,
      atomOutcomes,
      publicAtomOutcomes,
      privateAtomOutcomes,
      outcomeCounts: {
        materialized: materialAtomIds.length,
        unmaterialized: unmaterialized.length,
        privateInert: privateInert.length,
        privateExposed: privateExposed.length,
      },
      materialAtomCount: materialAtomIds.length,
      materialAtomIds,
      materialReceipts,
      unmaterializedAtomCount: unmaterialized.length,
      unmaterializedAtomIds,
      unmaterialized,
      privateInertAtomCount: privateInert.length,
      privateInertAtomIds,
      privateInert,
      privateExposedAtomCount: privateExposed.length,
      privateExposedAtomIds,
      privateExposed,
      // Temporary smoke compatibility. Consumers should migrate to the
      // semantically accurate unmaterialized* fields above.
      impossibleAtomCount: impossible.length,
      impossibleAtomIds,
      impossible,
      privateDomTargets: sortedUnique([...privateDomTargets]),
      unexpectedDomIds: sortedUnique([...unexpectedDomIds]),
      materialSetEquality,
      materialSetIsExact: (
        materialSetEquality.missing.length === 0
        && materialSetEquality.unexpected.length === 0
      ),
      publicSetEquality,
      classificationPartitionIsExact: (
        publicSetEquality.missing.length === 0
        && publicSetEquality.unexpected.length === 0
        && new Set(partitionIds).size === publicAtoms.length
      ),
      atomOutcomeSetEquality,
      publicOutcomeSetEquality,
      privateOutcomeSetEquality,
      atomOutcomePartitionIsExact: (
        atomOutcomeSetEquality.missing.length === 0
        && atomOutcomeSetEquality.unexpected.length === 0
        && publicOutcomeSetEquality.missing.length === 0
        && publicOutcomeSetEquality.unexpected.length === 0
        && privateOutcomeSetEquality.missing.length === 0
        && privateOutcomeSetEquality.unexpected.length === 0
        && new Set(atomOutcomeIds).size === allAtoms.length
      ),
    });
  }

  function assertComplete() {
    const report = finalize();
    if (!report.complete) {
      throw new Error([
        `classical-sgr-material-proof-incomplete:${report.materialAtomCount}/${report.inventory.publicAtomCount}`,
        `unmaterialized:${report.unmaterializedAtomCount}`,
        `private-dom-targets:${report.privateDomTargets.length}`,
        `unexpected-dom-ids:${report.unexpectedDomIds.length}`,
        `first-unmaterialized:${report.unmaterializedAtomIds.slice(0, 8).join(",")}`,
        // Temporary error-message compatibility with the legacy report alias.
        `impossible:${report.impossibleAtomCount}`,
        `first-impossible:${report.impossibleAtomIds.slice(0, 8).join(",")}`,
      ].join(";"));
    }
    return report;
  }

  return Object.freeze({ observe, snapshot, finalize, assertComplete });
}

export function auditCurrentClassicalSgrMaterialBrowserSurface(
  targetWindow = globalThis.window,
  observationLabel = "current-production-surface",
) {
  const audit = createClassicalSgrMaterialBrowserAudit(targetWindow);
  audit.observe(observationLabel);
  return audit.finalize();
}
