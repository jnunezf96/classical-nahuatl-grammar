const LEDGER_KIND = "classical-sgr-nested-control-ledger";
const CONTROL_SELECTOR = [
  "button",
  "input",
  "select",
  "textarea",
  '[role="button"]',
  '[role="checkbox"]',
  '[role="combobox"]',
  '[role="listbox"]',
  '[role="radio"]',
  '[role="slider"]',
  '[role="spinbutton"]',
  '[role="switch"]',
  '[role="textbox"]',
].join(",");

const PANEL_SPECS = Object.freeze([
  Object.freeze({ id: "source", label: "#1 Source", selector: "#classical-source-panel" }),
  Object.freeze({ id: "grammar", label: "#2 Grammar", selector: "#classical-authority-panel" }),
  Object.freeze({ id: "result", label: "#3 Result", selector: "#classical-result-panel" }),
]);

const SECTION_SELECTORS = Object.freeze({
  source: Object.freeze([
    '[data-classical-source-path-lane]',
    '[data-classical-source-outline-section]',
    '.classical-source-context-controls',
  ]),
  grammar: Object.freeze([
    '[data-classical-vnc-grammar-section]',
    '[data-classical-nnc-grammar-section]',
  ]),
  result: Object.freeze([
    '[data-classical-result-outline-section]',
  ]),
});

const MEANINGFUL_CLASS_PATTERN = /(?:^|-)classical-(?:.*-)?(?:body|control|controls|group|lane|panel|section|switch|tabs)(?:__.*)?$/u;

function normalizeText(value) {
  return String(value || "").replace(/\s+/gu, " ").trim();
}

function freezeTree(value) {
  if (Array.isArray(value)) return Object.freeze(value.map(freezeTree));
  if (!value || typeof value !== "object") return value;
  return Object.freeze(Object.fromEntries(
    Object.entries(value).map(([key, entry]) => [key, freezeTree(entry)]),
  ));
}

function isVisible(element) {
  if (!element?.isConnected || element.hidden === true) return false;
  if (element.getAttribute?.("aria-hidden") === "true") return false;
  for (let node = element; node; node = node.parentElement) {
    if (node.hidden === true || node.getAttribute?.("aria-hidden") === "true") {
      return false;
    }
  }
  try {
    const style = element.ownerDocument?.defaultView?.getComputedStyle?.(element);
    return style?.display !== "none" && style?.visibility !== "hidden";
  } catch {
    return false;
  }
}

function dataBindings(element) {
  return Object.freeze(Object.fromEntries(
    Array.from(element?.attributes || [])
      .filter(attribute => attribute.name.startsWith("data-classical-"))
      .map(attribute => [attribute.name, String(attribute.value || "")])
      .sort(([left], [right]) => left.localeCompare(right)),
  ));
}

function applicationAxisEvidenceMap(surfaceInventory = null) {
  return new Map((surfaceInventory?.axes || []).map(axis => [
    String(axis.atomId || ""),
    {
      applicationAxisAtomId: String(axis.atomId || ""),
      operationId: String(axis.operationId || ""),
      axisId: String(axis.axisId || ""),
      disposition: String(axis.disposition || ""),
      canvasAtomIds: Array.from(axis.canvasAtomIds || []),
      grammarAuthority: false,
      uiAuthority: false,
    },
  ]).filter(([atomId]) => Boolean(atomId)));
}

function applicationAxisBindings(element, axisEvidence = new Map()) {
  return String(element?.dataset?.classicalSurfaceAtomIds || "")
    .split(/\s+/u)
    .map(atomId => axisEvidence.get(atomId) || null)
    .filter(Boolean);
}

function cssLocator(element) {
  if (element?.id) return `#${element.id}`;
  const name = element?.getAttribute?.("name");
  if (name) return `${element.tagName.toLowerCase()}[name="${name}"]`;
  const binding = Object.entries(dataBindings(element))[0];
  if (binding) return `[${binding[0]}="${binding[1]}"]`;
  return String(element?.tagName || "control").toLowerCase();
}

function controlLabel(element) {
  const documentObject = element?.ownerDocument;
  const explicit = normalizeText(
    element?.getAttribute?.("aria-label")
      || element?.getAttribute?.("title")
  );
  if (explicit) return explicit;
  if (element?.id) {
    const escapedId = String(element.id).replace(/["\\]/gu, "\\$&");
    const label = documentObject?.querySelector?.(`label[for="${escapedId}"]`);
    const text = normalizeText(label?.textContent);
    if (text) return text;
  }
  const enclosingLabel = element?.closest?.("label");
  if (enclosingLabel) {
    const clone = enclosingLabel.cloneNode(true);
    clone.querySelectorAll?.(CONTROL_SELECTOR).forEach(control => control.remove());
    const text = normalizeText(clone.textContent);
    if (text) return text;
  }
  const localLabel = element?.parentElement?.querySelector?.(
    ":scope > .classical-rule-control__label, :scope > .calc-label, :scope > label"
  );
  const localText = normalizeText(localLabel?.textContent);
  if (localText) return localText;
  if (String(element?.tagName || "").toUpperCase() === "BUTTON") {
    return normalizeText(element.textContent);
  }
  return normalizeText(element?.getAttribute?.("placeholder")) || cssLocator(element);
}

function controlState(element) {
  const tagName = String(element?.tagName || "").toUpperCase();
  const options = tagName === "SELECT"
    ? Array.from(element.options || []).map(option => ({
        label: normalizeText(option.textContent),
        value: String(option.value || ""),
        disabled: option.disabled === true,
      }))
    : [];
  const value = tagName === "BUTTON"
    ? String(element.getAttribute?.("aria-pressed") || "")
    : String(element?.value ?? element?.getAttribute?.("aria-valuenow") ?? "");
  return {
    visible: isVisible(element),
    disabled: element?.disabled === true
      || element?.getAttribute?.("aria-disabled") === "true",
    expanded: element?.getAttribute?.("aria-expanded") || "",
    pressed: element?.getAttribute?.("aria-pressed") || "",
    checked: typeof element?.checked === "boolean" ? element.checked : null,
    value,
    selectedLabel: tagName === "SELECT"
      ? normalizeText(element.selectedOptions?.[0]?.textContent)
      : "",
    optionCount: options.length,
    options,
  };
}

function sectionIdentity(panelId, section) {
  if (!section) {
    return {
      id: panelId === "source" ? "route" : "unsectioned",
      title: panelId === "source" ? "Clause kind" : "Unsectioned",
      nestingLevel: 1,
    };
  }
  const id = section.dataset?.classicalSourcePathLane
    || section.dataset?.classicalSourceOutlineSection
    || section.dataset?.classicalVncGrammarSection
    || section.dataset?.classicalNncGrammarSection
    || section.dataset?.classicalResultOutlineSection
    || (section.classList?.contains("classical-source-context-controls")
      ? "participant-context"
      : "section");
  const sourcePathUnit = panelId === "source"
    ? String(
        section.dataset?.classicalSourcePathUnit
          || section.closest?.("#classical-source-parts")?.dataset?.classicalSourcePathUnit
          || ""
      )
    : "";
  const sourcePathStep = panelId === "source"
    ? Number(section.dataset?.classicalSourcePathStep || 0)
    : 0;
  const unit = panelId === "source"
    ? sourcePathUnit
    : panelId === "grammar"
      ? section.dataset?.classicalVncGrammarSection
        ? "vnc"
        : section.dataset?.classicalNncGrammarSection
          ? "nnc"
          : ""
      : "";
  const title = normalizeText(section.querySelector?.(
    ":scope > h2, :scope > h3, :scope > h4, :scope > header h2, :scope > header h3, :scope > .classical-source-context-controls__heading"
  )?.textContent) || id;
  return {
    id,
    title,
    nestingLevel: Number(section.dataset?.classicalNestingLevel || 1),
    unit,
    sourcePathUnit,
    sourcePathStep,
  };
}

function closestSection(panelId, control, panelRoot) {
  const selectors = SECTION_SELECTORS[panelId] || [];
  for (let node = control?.parentElement; node && node !== panelRoot; node = node.parentElement) {
    if (selectors.some(selector => node.matches?.(selector))) return node;
  }
  return null;
}

function containerToken(element) {
  if (!element) return "";
  if (element.id) return `#${element.id}`;
  const binding = Object.entries(dataBindings(element))[0];
  if (binding) return `[${binding[0]}=${binding[1]}]`;
  const meaningfulClass = Array.from(element.classList || [])
    .find(className => MEANINGFUL_CLASS_PATTERN.test(className));
  return meaningfulClass ? `.${meaningfulClass}` : "";
}

function containerPath(control, boundary) {
  const tokens = [];
  for (let node = control?.parentElement; node && node !== boundary; node = node.parentElement) {
    const token = containerToken(node);
    if (token && tokens[tokens.length - 1] !== token) tokens.push(token);
  }
  return tokens.reverse();
}

function describeControl(
  control,
  panelId,
  section,
  ordinal,
  axisEvidence = new Map()
) {
  const sectionRecord = sectionIdentity(panelId, section);
  const locator = cssLocator(control);
  const state = controlState(control);
  return {
    id: control.id || control.getAttribute?.("name") || `${panelId}-${sectionRecord.id}-${ordinal + 1}`,
    label: controlLabel(control),
    locator,
    path: [
      panelId,
      ...(sectionRecord.sourcePathUnit
        ? [`${sectionRecord.sourcePathUnit}-source-path`]
        : []),
      ...(panelId === "grammar" && sectionRecord.unit
        ? [`${sectionRecord.unit}-grammar`]
        : []),
      sectionRecord.id,
      ...containerPath(control, section),
      locator,
    ],
    element: {
      tag: String(control.tagName || "").toLowerCase(),
      type: String(control.type || control.getAttribute?.("role") || ""),
      role: String(control.getAttribute?.("role") || ""),
    },
    bindings: dataBindings(control),
    applicationAxes: applicationAxisBindings(control, axisEvidence),
    state,
  };
}

function describePanel(documentObject, spec, axisEvidence = new Map()) {
  const root = documentObject.querySelector?.(spec.selector) || null;
  if (!root) return { id: spec.id, label: spec.label, present: false, sections: [] };
  const sectionRecords = new Map();
  Array.from(root.querySelectorAll?.(CONTROL_SELECTOR) || []).forEach((control, ordinal) => {
    const section = closestSection(spec.id, control, root);
    const identity = sectionIdentity(spec.id, section);
    const sectionKey = `${identity.unit || spec.id}:${identity.id}`;
    if (!sectionRecords.has(sectionKey)) {
      sectionRecords.set(sectionKey, {
        ...identity,
        visible: section ? isVisible(section) : isVisible(control),
        controls: [],
      });
    }
    sectionRecords.get(sectionKey).controls.push(
      describeControl(
        control,
        spec.id,
        section || root,
        ordinal,
        axisEvidence
      )
    );
  });
  return {
    id: spec.id,
    label: spec.label,
    present: true,
    visible: isVisible(root),
    sections: [...sectionRecords.values()],
  };
}

function pathwayDestination(choice, panelId, sectionId) {
  const sourceUnit = String(choice?.dataset?.classicalSourceUnit || "");
  const grammarOperation = String(
    choice?.dataset?.classicalGrammarOperation || ""
  );
  const resultUnit = String(choice?.dataset?.classicalResultUnit || "");
  return {
    panel: resultUnit ? "result" : (grammarOperation ? "grammar" : panelId),
    section: resultUnit ? "result-view" : sectionId,
    sourceUnit,
    grammarOperation,
    resultUnit,
  };
}

function constructionOperationIds(element) {
  return String(element?.getAttribute?.("data-construction-for") || "")
    .split(",")
    .map(value => value.trim())
    .filter(Boolean);
}

function routeNodeOwner(element, documentObject) {
  const panelSpec = panelSpecForElement(element);
  const panelRoot = panelSpec
    ? documentObject.querySelector?.(panelSpec.selector) || null
    : null;
  const section = panelSpec
    ? closestSection(panelSpec.id, element, panelRoot)
    : null;
  const sectionRecord = panelSpec
    ? sectionIdentity(panelSpec.id, section)
    : { id: "outside" };
  const sourceHost = element.closest?.(
    "#classical-construction-source-analysis-controls"
  ) || null;
  const grammarLane = element.closest?.(
    "[data-classical-construction-grammar-lane]"
  ) || null;
  return {
    panel: panelSpec?.id || "outside",
    section: sectionRecord.id || "outside",
    lane: sourceHost
      ? "source-analysis"
      : String(grammarLane?.dataset?.classicalConstructionGrammarLane || ""),
    placement: sourceHost
      ? "source-analysis"
      : grammarLane
        ? "grammar-formation"
        : "unplaced",
  };
}

function describeConstructionRouteControl(
  control,
  documentObject,
  routeIds = [],
  axisEvidence = new Map()
) {
  const state = controlState(control);
  return {
    kind: "interactive-control",
    id: control.id || control.getAttribute?.("name") || cssLocator(control),
    label: controlLabel(control),
    locator: cssLocator(control),
    visible: state.visible,
    disabled: state.disabled,
    state,
    routeIds,
    applicationAxes: applicationAxisBindings(control, axisEvidence),
    owner: routeNodeOwner(control, documentObject),
  };
}

function sourceOperationStages(choice, select) {
  const activeUnit = String(select?.dataset?.classicalSourceUnit || "").trim();
  const declaredSourceUnit = String(
    choice?.dataset?.classicalSourceUnit || ""
  ).trim();
  const declaredResultUnit = String(
    choice?.dataset?.classicalResultUnit || ""
  ).trim();
  const sourceUnit = !declaredSourceUnit || declaredSourceUnit === "any"
    ? activeUnit
    : declaredSourceUnit;
  const declaredResolvedResultUnit = declaredResultUnit === "same"
    ? sourceUnit
    : declaredResultUnit;
  const liveResultUnit = choice?.selected === true
    ? String(
        select?.ownerDocument
          ?.getElementById?.("classical-rule-logic-controls")
          ?.dataset?.classicalRuleLogicSurfaceUnit || ""
      ).trim()
    : "";
  const resultUnit = ["nnc", "vnc"].includes(liveResultUnit)
    ? liveResultUnit
    : declaredResolvedResultUnit;
  const grammarOperation = String(
    choice?.dataset?.classicalGrammarOperation || ""
  ).trim();
  return [
    {
      order: 1,
      panel: "source",
      section: "operation",
      role: "typed-source",
      unit: sourceUnit,
    },
    {
      order: 2,
      panel: "grammar",
      section: "formation",
      role: "productive-operation",
      operation: grammarOperation,
    },
    {
      order: 3,
      panel: "result",
      section: "result-view",
      role: "typed-result",
      unit: resultUnit,
      declaredUnit: declaredResultUnit,
      resolution: ["nnc", "vnc"].includes(liveResultUnit)
        ? "live-presentation"
        : "declared-route",
    },
  ];
}

function constructionRevealMap(documentObject, axisEvidence = new Map()) {
  const reveals = new Map();
  documentObject.querySelectorAll?.("[data-construction-for]").forEach(wrapper => {
    const operationIds = constructionOperationIds(wrapper);
    if (!operationIds.length) return;
    const controls = Array.from(wrapper.querySelectorAll?.(CONTROL_SELECTOR) || [])
      .map(control => describeConstructionRouteControl(
        control,
        documentObject,
        operationIds,
        axisEvidence
      ));
    operationIds.forEach(operationId => {
      if (!reveals.has(operationId)) reveals.set(operationId, []);
      reveals.get(operationId).push(...controls);
    });
  });
  return new Map([...reveals.entries()].map(([operationId, controls]) => [
    operationId,
    [...new Map(controls.map(control => [control.locator, control])).values()],
  ]));
}

function constructionReadOnlyFactMap(documentObject) {
  const wrappers = Array.from(
    documentObject.querySelectorAll?.("[data-construction-for]") || []
  );
  const facts = new Map();
  wrappers.filter(wrapper => (
    !wrapper.querySelector?.(CONTROL_SELECTOR)
    && wrapper.matches?.([
      '[aria-live]',
      '[role="status"]',
      '[data-classical-source-authorizes]',
      '[data-classical-result-source-fact]',
      '.classical-rule-control__hint',
    ].join(","))
  )).forEach(wrapper => {
    const operationIds = constructionOperationIds(wrapper);
    if (!operationIds.length) return;
    const nestedSameRouteFact = wrappers.some(candidate => (
      candidate !== wrapper
      && wrapper.contains?.(candidate)
      && !candidate.querySelector?.(CONTROL_SELECTOR)
      && constructionOperationIds(candidate).some(id => operationIds.includes(id))
    ));
    if (nestedSameRouteFact) return;
    const fact = {
      kind: "read-only-fact",
      id: wrapper.id || cssLocator(wrapper),
      label: normalizeText(wrapper.textContent),
      locator: cssLocator(wrapper),
      visible: isVisible(wrapper),
      disabled: false,
      routeIds: operationIds,
      owner: routeNodeOwner(wrapper, documentObject),
    };
    operationIds.forEach(operationId => {
      if (!facts.has(operationId)) facts.set(operationId, []);
      facts.get(operationId).push(fact);
    });
  });
  return new Map([...facts.entries()].map(([operationId, entries]) => [
    operationId,
    [...new Map(entries.map(entry => [entry.locator, entry])).values()],
  ]));
}

function buildSourceOperationRouteCast(
  documentObject,
  sourceOperations,
  revealMap
) {
  const factMap = constructionReadOnlyFactMap(documentObject);
  const declaredRouteIds = new Set(sourceOperations.map(choice => choice.value));
  const selectedRouteId = sourceOperations.find(choice => choice.selected)?.value
    || "";
  const sourceUnits = [...new Set(
    Array.from(
      documentObject.querySelectorAll?.("[data-classical-basal-unit]") || []
    )
      .map(element => String(element.dataset?.classicalBasalUnit || ""))
      .filter(unit => ["nnc", "vnc"].includes(unit))
  )].sort((left, right) => left.localeCompare(right));
  const referencedRouteIds = new Set(
    Array.from(documentObject.querySelectorAll?.("[data-construction-for]") || [])
      .flatMap(constructionOperationIds)
  );
  const routes = sourceOperations.map(choice => {
    const controls = revealMap.get(choice.value) || [];
    const facts = factMap.get(choice.value) || [];
    const nodes = [...controls, ...facts];
    const panels = (choice.stages || []).map(stage => stage.panel);
    const completeStages = panels.length === 3
      && panels[0] === "source"
      && panels[1] === "grammar"
      && panels[2] === "result";
    const visibleNodes = nodes.filter(node => node.visible);
    const misplacedNodes = visibleNodes.filter(node => ![
      "source-analysis",
      "grammar-formation",
    ].includes(node.owner?.placement));
    const staleVisibleNodes = choice.selected
      ? []
      : visibleNodes.filter(node => !node.routeIds?.includes(selectedRouteId));
    const structuralIssues = [
      ...(!completeStages ? ["incomplete-source-grammar-result-stages"] : []),
      ...(choice.value !== "none" && nodes.length === 0
        ? ["custom-route-has-no-nodes"]
        : []),
      ...(misplacedNodes.length ? ["route-node-outside-source-or-grammar-lane"] : []),
      ...(staleVisibleNodes.length ? ["inactive-route-node-visible"] : []),
    ];
    const visibleControls = controls.filter(node => node.visible);
    const visibleFacts = facts.filter(node => node.visible);
    const branchState = choice.selected
      ? visibleControls.length
        ? "choices-visible"
        : visibleFacts.length
          ? "readout-only"
          : choice.value === "none"
            ? "direct-generation"
            : "no-visible-route-node"
      : "not-selected";
    return {
      id: choice.value,
      label: choice.label,
      selected: choice.selected,
      available: choice.available,
      sourceUnit: choice.destination?.sourceUnit || "",
      grammarOperation: choice.destination?.grammarOperation || "",
      declaredResultUnit: choice.destination?.resultUnit || "",
      currentResultUnit: (choice.stages || []).find(
        stage => stage.panel === "result"
      )?.unit || "",
      stages: choice.stages || [],
      completeStages,
      branchState,
      counts: {
        nodes: nodes.length,
        controls: controls.length,
        facts: facts.length,
        source: nodes.filter(node => node.owner?.panel === "source").length,
        grammar: nodes.filter(node => node.owner?.panel === "grammar").length,
        result: nodes.filter(node => node.owner?.panel === "result").length,
        outside: nodes.filter(node => node.owner?.panel === "outside").length,
        visibleControls: visibleControls.length,
        visibleFacts: visibleFacts.length,
      },
      nodes,
      structuralIssues,
      deadEnd: structuralIssues.some(issue => [
        "incomplete-source-grammar-result-stages",
        "custom-route-has-no-nodes",
      ].includes(issue)),
      misplacedNodes: misplacedNodes.map(node => node.locator),
      staleVisibleNodes: staleVisibleNodes.map(node => node.locator),
    };
  });
  const nodeRelationships = routes.flatMap(route => route.nodes);
  const uniqueNodes = new Map(nodeRelationships.map(node => [
    `${node.kind}:${node.locator}`,
    node,
  ]));
  const sourceQualifiedPaths = routes.flatMap(route => {
    const units = !route.sourceUnit || route.sourceUnit === "any"
      ? sourceUnits
      : [route.sourceUnit];
    return units.map(unit => ({
      id: `${unit}:${route.id}`,
      sourceUnit: unit,
      routeId: route.id,
      grammarOperation: route.grammarOperation,
      declaredResultUnit: route.declaredResultUnit,
      selected: route.selected
        && unit === String(
          documentObject.getElementById?.("classical-basal-unit-controls")
            ?.dataset?.classicalBasalUnit || ""
        ),
    }));
  });
  return {
    kind: "classical-source-operation-route-cast",
    version: 1,
    authority: {
      grammarAuthority: false,
      uiAuthority: false,
      proofOnly: true,
    },
    activeUnit: String(
      documentObject.getElementById?.("classical-basal-unit-controls")
        ?.dataset?.classicalBasalUnit || ""
    ),
    selectedRoute: routes.find(route => route.selected)?.id || "",
    counts: {
      routes: routes.length,
      sourceQualifiedPaths: sourceQualifiedPaths.length,
      customRoutes: routes.filter(route => route.id !== "none").length,
      completeRoutes: routes.filter(route => route.completeStages).length,
      nodeRelationships: nodeRelationships.length,
      uniqueNodes: uniqueNodes.size,
      interactiveControls: [...uniqueNodes.values()].filter(
        node => node.kind === "interactive-control"
      ).length,
      readOnlyFacts: [...uniqueNodes.values()].filter(
        node => node.kind === "read-only-fact"
      ).length,
      deadEnds: routes.filter(route => route.deadEnd).length,
      misplacedNodes: routes.reduce(
        (sum, route) => sum + route.misplacedNodes.length,
        0
      ),
      staleVisibleNodes: routes.reduce(
        (sum, route) => sum + route.staleVisibleNodes.length,
        0
      ),
      orphanRouteIds: [...referencedRouteIds].filter(
        id => !declaredRouteIds.has(id)
      ).length,
    },
    deadEnds: routes.filter(route => route.deadEnd).map(route => route.id),
    misplacedRoutes: routes.filter(
      route => route.misplacedNodes.length
    ).map(route => route.id),
    staleRoutes: routes.filter(
      route => route.staleVisibleNodes.length
    ).map(route => route.id),
    orphanRouteIds: [...referencedRouteIds].filter(
      id => !declaredRouteIds.has(id)
    ).sort((left, right) => left.localeCompare(right)),
    sourceQualifiedPaths,
    routes,
  };
}

function panelSpecForElement(element) {
  return PANEL_SPECS.find(spec => element?.closest?.(spec.selector)) || null;
}

function describeSelectPathway(select, documentObject, revealMap) {
  const panelSpec = panelSpecForElement(select);
  if (!panelSpec) return null;
  const panelRoot = documentObject.querySelector(panelSpec.selector);
  const section = closestSection(panelSpec.id, select, panelRoot);
  const sectionRecord = sectionIdentity(panelSpec.id, section);
  const controlVisible = isVisible(select);
  const controlDisabled = select.disabled === true
    || select.getAttribute?.("aria-disabled") === "true";
  const sourceOperation = select.id === "classical-construction-operation";
  return {
    id: select.id || select.getAttribute?.("name") || cssLocator(select),
    kind: sourceOperation ? "source-operation" : "select-choice",
    origin: {
      panel: panelSpec.id,
      section: sectionRecord.id,
      control: cssLocator(select),
      label: controlLabel(select),
      sourcePathUnit: sectionRecord.sourcePathUnit,
      sourcePathStep: sectionRecord.sourcePathStep,
    },
    currentValue: String(select.value || ""),
    visible: controlVisible,
    disabled: controlDisabled,
    choices: Array.from(select.options || []).map(option => {
      const value = String(option.value || "");
      const hidden = option.hidden === true
        || option.closest?.("optgroup")?.hidden === true;
      const disabled = controlDisabled
        || option.disabled === true
        || option.closest?.("optgroup")?.disabled === true;
      return {
        value,
        label: normalizeText(option.textContent),
        selected: option.selected === true,
        available: controlVisible && !hidden && !disabled,
        hidden,
        disabled,
        destination: pathwayDestination(option, panelSpec.id, sectionRecord.id),
        stages: sourceOperation ? sourceOperationStages(option, select) : [],
        revealsControls: revealMap.get(value) || [],
        bindings: dataBindings(option),
      };
    }),
  };
}

function describeButtonPathways(documentObject) {
  const groups = [];
  const seenParents = new Set();
  const groupedButtons = new Set();
  PANEL_SPECS.forEach(panelSpec => {
    const panelRoot = documentObject.querySelector?.(panelSpec.selector);
    if (!panelRoot) return;
    panelRoot.querySelectorAll?.('button, [role="button"]').forEach(button => {
      const parent = button.parentElement;
      if (!parent || seenParents.has(parent)) return;
      seenParents.add(parent);
      const choices = Array.from(parent.children || []).filter(child => (
        child.matches?.('button, [role="button"]')
      ));
      if (choices.length < 2) return;
      choices.forEach(choice => groupedButtons.add(choice));
      const section = closestSection(panelSpec.id, button, panelRoot);
      const sectionRecord = sectionIdentity(panelSpec.id, section);
      const groupToken = parent.id || containerToken(parent)
        || `${panelSpec.id}-${sectionRecord.id}-button-group-${groups.length + 1}`;
      groups.push({
        id: groupToken,
        kind: "button-choice",
        origin: {
          panel: panelSpec.id,
          section: sectionRecord.id,
          control: groupToken,
          label: normalizeText(parent.getAttribute?.("aria-label"))
            || sectionRecord.title,
        },
        currentValue: choices.find(choice => (
          choice.getAttribute?.("aria-pressed") === "true"
          || choice.classList?.contains("is-active")
        ))?.textContent?.trim() || "",
        visible: choices.some(isVisible),
        disabled: choices.every(choice => choice.disabled === true),
        choices: choices.map(choice => ({
          value: String(
            choice.value
              || choice.getAttribute?.("data-value")
              || choice.textContent
              || ""
          ).trim(),
          label: controlLabel(choice),
          selected: choice.getAttribute?.("aria-pressed") === "true"
            || choice.classList?.contains("is-active"),
          available: isVisible(choice)
            && choice.disabled !== true
            && choice.getAttribute?.("aria-disabled") !== "true",
          hidden: !isVisible(choice),
          disabled: choice.disabled === true
            || choice.getAttribute?.("aria-disabled") === "true",
          destination: pathwayDestination(
            choice,
            panelSpec.id,
            sectionRecord.id
          ),
          revealsControls: [],
          bindings: dataBindings(choice),
        })),
      });
    });
  });
  PANEL_SPECS.forEach(panelSpec => {
    const panelRoot = documentObject.querySelector?.(panelSpec.selector);
    if (!panelRoot) return;
    panelRoot.querySelectorAll?.('button, [role="button"]').forEach(button => {
      if (groupedButtons.has(button)) return;
      const section = closestSection(panelSpec.id, button, panelRoot);
      const sectionRecord = sectionIdentity(panelSpec.id, section);
      const locator = cssLocator(button);
      const disabled = button.disabled === true
        || button.getAttribute?.("aria-disabled") === "true";
      groups.push({
        id: locator,
        kind: "button-action",
        origin: {
          panel: panelSpec.id,
          section: sectionRecord.id,
          control: locator,
          label: controlLabel(button),
        },
        currentValue: "",
        visible: isVisible(button),
        disabled,
        choices: [{
          value: normalizeText(button.textContent),
          label: controlLabel(button),
          selected: false,
          available: isVisible(button) && !disabled,
          hidden: !isVisible(button),
          disabled,
          destination: pathwayDestination(
            button,
            panelSpec.id,
            sectionRecord.id
          ),
          revealsControls: [],
          bindings: dataBindings(button),
        }],
      });
    });
  });
  return groups;
}

function describeInputPathways(documentObject) {
  const branches = [];
  const seenRadioGroups = new Set();
  PANEL_SPECS.forEach(panelSpec => {
    const panelRoot = documentObject.querySelector?.(panelSpec.selector);
    if (!panelRoot) return;
    panelRoot.querySelectorAll?.('input[type="checkbox"], input[type="radio"]')
      .forEach((input, ordinal) => {
        const section = closestSection(panelSpec.id, input, panelRoot);
        const sectionRecord = sectionIdentity(panelSpec.id, section);
        const type = String(input.type || "").toLowerCase();
        const name = String(input.name || input.id || "");
        const groupKey = type === "radio"
          ? `${panelSpec.id}:${sectionRecord.id}:radio:${name}`
          : `${panelSpec.id}:${sectionRecord.id}:checkbox:${name || ordinal}`;
        if (seenRadioGroups.has(groupKey)) return;
        seenRadioGroups.add(groupKey);
        const inputs = type === "radio"
          ? Array.from(panelRoot.querySelectorAll('input[type="radio"]'))
              .filter(candidate => String(candidate.name || candidate.id || "") === name)
          : [input];
        const disabled = inputs.every(candidate => (
          candidate.disabled === true
          || candidate.getAttribute?.("aria-disabled") === "true"
        ));
        const choices = type === "checkbox"
          ? [false, true].map(checked => ({
              value: String(checked),
              label: checked ? "on" : "off",
              selected: input.checked === checked,
              available: isVisible(input) && !disabled,
              hidden: !isVisible(input),
              disabled,
              destination: pathwayDestination(
                input,
                panelSpec.id,
                sectionRecord.id
              ),
              revealsControls: [],
              bindings: dataBindings(input),
            }))
          : inputs.map(candidate => {
              const candidateDisabled = candidate.disabled === true
                || candidate.getAttribute?.("aria-disabled") === "true";
              return {
                value: String(candidate.value || candidate.id || ""),
                label: controlLabel(candidate),
                selected: candidate.checked === true,
                available: isVisible(candidate) && !candidateDisabled,
                hidden: !isVisible(candidate),
                disabled: candidateDisabled,
                destination: pathwayDestination(
                  candidate,
                  panelSpec.id,
                  sectionRecord.id
                ),
                revealsControls: [],
                bindings: dataBindings(candidate),
              };
            });
        branches.push({
          id: groupKey,
          kind: type === "radio" ? "radio-choice" : "checkbox-choice",
          origin: {
            panel: panelSpec.id,
            section: sectionRecord.id,
            control: cssLocator(input),
            label: controlLabel(input),
          },
          currentValue: type === "radio"
            ? String(inputs.find(candidate => candidate.checked)?.value || "")
            : String(input.checked === true),
          visible: inputs.some(isVisible),
          disabled,
          choices,
        });
      });
  });
  return branches;
}

function describeApplicationAxisBinding(element, documentObject) {
  const panelSpec = panelSpecForElement(element);
  const panelRoot = panelSpec
    ? documentObject.querySelector?.(panelSpec.selector) || null
    : null;
  const section = panelSpec
    ? closestSection(panelSpec.id, element, panelRoot)
    : null;
  const sectionRecord = panelSpec
    ? sectionIdentity(panelSpec.id, section)
    : { id: "outside" };
  const state = controlState(element);
  const routeWrapper = element.closest?.("[data-construction-for]") || null;
  return {
    locator: cssLocator(element),
    label: controlLabel(element),
    panel: panelSpec?.id || "outside",
    section: sectionRecord.id || "outside",
    routeIds: constructionOperationIds(routeWrapper),
    visible: state.visible,
    disabled: state.disabled,
    interactive: element.matches?.(CONTROL_SELECTOR) === true,
  };
}

function buildApplicationAxisCast(
  documentObject,
  surfaceInventory = null,
  axisEvidence = applicationAxisEvidenceMap(surfaceInventory)
) {
  const interactiveAxes = (surfaceInventory?.axes || []).filter(axis => (
    axis.disposition === "interactive-choice"
  ));
  const bindings = new Map(interactiveAxes.map(axis => [
    axis.atomId,
    new Map(),
  ]));
  documentObject.querySelectorAll?.("[data-classical-surface-atom-ids]")
    .forEach(element => {
      const binding = describeApplicationAxisBinding(element, documentObject);
      applicationAxisBindings(element, axisEvidence).forEach(axis => {
        const axisBindings = bindings.get(axis.applicationAxisAtomId);
        if (!axisBindings) return;
        const existing = axisBindings.get(binding.locator);
        axisBindings.set(binding.locator, existing
          ? {
              ...existing,
              routeIds: [...new Set([
                ...existing.routeIds,
                ...binding.routeIds,
              ])],
              visible: existing.visible || binding.visible,
              disabled: existing.disabled && binding.disabled,
            }
          : binding);
      });
    });
  const axes = interactiveAxes.map(axis => {
    const deliveredBindings = [...(bindings.get(axis.atomId)?.values() || [])];
    return {
      applicationAxisAtomId: axis.atomId,
      operationId: axis.operationId,
      axisId: axis.axisId,
      canvasAtomIds: Array.from(axis.canvasAtomIds || []),
      delivered: deliveredBindings.length > 0,
      visible: deliveredBindings.some(binding => binding.visible),
      available: deliveredBindings.some(binding => (
        binding.visible && !binding.disabled
      )),
      panels: [...new Set(deliveredBindings.map(binding => binding.panel))],
      routeIds: [...new Set(deliveredBindings.flatMap(
        binding => binding.routeIds
      ))],
      bindings: deliveredBindings,
    };
  });
  return {
    kind: "classical-application-axis-anthill-cast",
    version: 1,
    authority: {
      grammarAuthority: false,
      uiAuthority: false,
      canvasProvenanceAuthority: false,
      evidenceAbsenceBlocksGeneration: false,
    },
    counts: {
      genuineChoiceAxes: axes.length,
      canvasMappedAxes: axes.filter(axis => axis.canvasAtomIds.length).length,
      canvasLinks: axes.reduce(
        (sum, axis) => sum + axis.canvasAtomIds.length,
        0
      ),
      deliveredAxes: axes.filter(axis => axis.delivered).length,
      visibleAxes: axes.filter(axis => axis.visible).length,
      availableAxes: axes.filter(axis => axis.available).length,
      routeLinkedAxes: axes.filter(axis => axis.routeIds.length).length,
    },
    missingCanvasProvenance: axes.filter(
      axis => !axis.canvasAtomIds.length
    ).map(axis => axis.applicationAxisAtomId),
    unboundAxes: axes.filter(
      axis => !axis.delivered
    ).map(axis => axis.applicationAxisAtomId),
    axes,
  };
}

function buildPathwayMap(documentObject, surfaceInventory = null) {
  const axisEvidence = applicationAxisEvidenceMap(surfaceInventory);
  const revealMap = constructionRevealMap(documentObject, axisEvidence);
  const selectBranches = PANEL_SPECS.flatMap(panelSpec => {
    const root = documentObject.querySelector?.(panelSpec.selector);
    return Array.from(root?.querySelectorAll?.("select") || [])
      .map(select => describeSelectPathway(select, documentObject, revealMap))
      .filter(Boolean);
  });
  const buttonBranches = describeButtonPathways(documentObject);
  const inputBranches = describeInputPathways(documentObject);
  const branches = [...selectBranches, ...buttonBranches, ...inputBranches];
  const choices = branches.flatMap(branch => branch.choices);
  const sourceOperations = branches.find(branch => (
    branch.kind === "source-operation"
  ))?.choices || [];
  const sourceOperationCast = buildSourceOperationRouteCast(
    documentObject,
    sourceOperations,
    revealMap
  );
  const applicationAxisCast = buildApplicationAxisCast(
    documentObject,
    surfaceInventory,
    axisEvidence
  );
  return {
    counts: {
      branches: branches.length,
      choices: choices.length,
      availableChoices: choices.filter(choice => choice.available).length,
      selectedChoices: choices.filter(choice => choice.selected).length,
      sourceOperations: sourceOperations.length,
      availableSourceOperations: sourceOperations.filter(
        choice => choice.available
      ).length,
    },
    sourceOperations,
    anthillMap: {
      kind: "classical-source-grammar-result-anthill-map",
      version: 1,
      authority: {
        grammarAuthority: false,
        uiAuthority: false,
        proofOnly: true,
      },
      sourceOperationRoutes: sourceOperationCast,
      userChoiceAxes: applicationAxisCast,
    },
    branches,
  };
}

function describeCurrentResultRoute(documentObject, grammarRoot) {
  const result = documentObject.getElementById?.(
    "classical-rule-logic-surface"
  ) || null;
  const status = String(
    result?.dataset?.classicalNahuatlSurfaceStatus || ""
  );
  const presentationUnit = String(
    grammarRoot?.dataset?.classicalRuleLogicSurfaceUnit || ""
  );
  const renderedUnit = String(result?.dataset?.classicalBasalUnit || "");
  return {
    present: Boolean(result),
    visible: isVisible(result),
    unit: presentationUnit || renderedUnit,
    presentationUnit,
    renderedUnit,
    selectedConstruction: String(
      result?.dataset?.classicalNominalConstruction || ""
    ),
    status,
    blockReason: String(result?.dataset?.classicalBlockReason || ""),
    terminal: ["authorized", "blocked"].includes(status),
    hierarchy: String(result?.dataset?.classicalResultHierarchy || ""),
    projection: String(result?.dataset?.classicalResultProjection || ""),
    presentationAuthority: String(
      result?.dataset?.classicalResultPresentationAuthority || ""
    ),
    primaryAnswerCount: result?.querySelectorAll?.(
      '[data-classical-result-primary-answer="true"]'
    ).length || 0,
  };
}

export function buildClassicalNestedControlLedger(
  documentObject = globalThis.document,
  surfaceInventory = null
) {
  if (!documentObject?.querySelector) {
    throw new Error("buildClassicalNestedControlLedger requires a document.");
  }
  const axisEvidence = applicationAxisEvidenceMap(surfaceInventory);
  const panels = PANEL_SPECS.map(spec => describePanel(
    documentObject,
    spec,
    axisEvidence
  ));
  const controls = panels.flatMap(panel => (
    panel.sections.flatMap(section => section.controls)
  ));
  const pathways = buildPathwayMap(documentObject, surfaceInventory);
  const grammarRoot = documentObject.getElementById?.("classical-rule-logic-controls");
  const sourceRoot = documentObject.getElementById?.("classical-source-parts");
  const operation = documentObject.getElementById?.(
    "classical-construction-operation"
  );
  return freezeTree({
    schemaVersion: 3,
    kind: LEDGER_KIND,
    authority: {
      grammarAuthority: false,
      uiAuthority: false,
      rule: "This ledger describes the delivered control tree; it never creates or authorizes grammar behavior.",
    },
    route: {
      clauseKind: String(grammarRoot?.dataset?.classicalRuleLogicSurfaceUnit || ""),
      sourceUnit: String(sourceRoot?.dataset?.classicalSourcePathUnit || ""),
      selectedOperation: String(operation?.value || ""),
      hash: String(documentObject.defaultView?.location?.hash || ""),
      result: describeCurrentResultRoute(documentObject, grammarRoot),
    },
    counts: {
      panels: panels.filter(panel => panel.present).length,
      sections: panels.reduce((sum, panel) => sum + panel.sections.length, 0),
      controls: controls.length,
      visibleControls: controls.filter(control => control.state.visible).length,
      hiddenControls: controls.filter(control => !control.state.visible).length,
      disabledControls: controls.filter(control => control.state.disabled).length,
    },
    pathways,
    panels,
  });
}

export function installClassicalNestedControlLedger({
  globalObject = globalThis,
  documentObject = globalObject.document,
} = {}) {
  const root = documentObject?.getElementById?.("classical-workbench") || null;
  if (!root) return null;
  root.classicalNestedControlLedgerController?.disconnect?.();

  let revision = 0;
  let latestSignature = "";
  let latestLedger = null;
  let refreshPending = false;

  const projectLedger = ledger => {
    let projection = documentObject.getElementById?.(
      "classical-nested-control-ledger"
    ) || null;
    if (!projection) {
      projection = documentObject.createElement?.("script") || null;
      if (!projection) return;
      projection.id = "classical-nested-control-ledger";
      projection.type = "application/json";
      projection.dataset.classicalNestedControlLedger = "descriptive-non-authorizing";
      (documentObject.head || documentObject.body)?.appendChild?.(projection);
    }
    projection.textContent = JSON.stringify(ledger, null, 2);
  };

  const publish = () => {
    refreshPending = false;
    const surfaceInventory = globalObject
      .getClassicalSourceGrammarResultSurfaceInventory?.() || null;
    const snapshot = buildClassicalNestedControlLedger(
      documentObject,
      surfaceInventory
    );
    const signature = JSON.stringify(snapshot);
    if (signature === latestSignature && latestLedger) return latestLedger;
    latestSignature = signature;
    revision += 1;
    latestLedger = freezeTree({
      ...snapshot,
      revision,
      updatedAt: new Date().toISOString(),
    });
    globalObject.__CLASSICAL_NESTED_CONTROL_LEDGER__ = latestLedger;
    projectLedger(latestLedger);
    try {
      globalObject.dispatchEvent?.(new globalObject.CustomEvent(
        "classical:nested-control-ledger-updated",
        { detail: latestLedger },
      ));
    } catch {
      // The ledger remains available even in a minimal DOM without CustomEvent.
    }
    return latestLedger;
  };
  const schedule = () => {
    if (refreshPending) return;
    refreshPending = true;
    const enqueue = globalObject.queueMicrotask || (callback => Promise.resolve().then(callback));
    enqueue(publish);
  };

  const MutationObserverConstructor = globalObject.MutationObserver
    || documentObject.defaultView?.MutationObserver
    || null;
  const observer = typeof MutationObserverConstructor === "function"
    ? new MutationObserverConstructor(schedule)
    : null;
  observer?.observe(root, {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true,
  });
  ["change", "click", "input"].forEach(type => (
    root.addEventListener?.(type, schedule, true)
  ));
  globalObject.addEventListener?.("hashchange", schedule);

  const controller = Object.freeze({
    refresh: publish,
    get current() { return latestLedger; },
    disconnect() {
      observer?.disconnect?.();
      ["change", "click", "input"].forEach(type => (
        root.removeEventListener?.(type, schedule, true)
      ));
      globalObject.removeEventListener?.("hashchange", schedule);
    },
  });
  root.classicalNestedControlLedgerController = controller;
  globalObject.getClassicalNestedControlLedger = () => latestLedger || publish();
  globalObject.refreshClassicalNestedControlLedger = publish;
  publish();
  return controller;
}

export const CLASSICAL_NESTED_CONTROL_LEDGER_KIND = LEDGER_KIND;
