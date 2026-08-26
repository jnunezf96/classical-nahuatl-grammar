// Local, non-authorizing observation of the visible play loop.

export const CLASSICAL_PLAY_WITNESS_KIND =
  "classical-grammar-toy-play-witness";

const FEELINGS_BY_AUDIENCE = Object.freeze({
  baby: Object.freeze(new Set(["joy", "boredom"])),
  parent: Object.freeze(new Set(["joy", "concern"])),
});

function freezeRecord(record = {}) {
  return Object.freeze({ ...record });
}

function getElementText(element) {
  return String(
    element?.getAttribute?.("aria-label")
      || element?.labels?.[0]?.textContent
      || element?.textContent
      || element?.id
      || element?.tagName
      || "control"
  ).trim().replace(/\s+/gu, " ").slice(0, 160);
}

function getControlValue(element) {
  if (!element) return "";
  if (element.type === "checkbox" || element.type === "radio") {
    return element.checked ? "checked" : "unchecked";
  }
  return String(element.value || "").slice(0, 160);
}

function getPlayPhase(element) {
  const stage = element?.closest?.("[data-classical-workbench-stage]");
  if (stage?.dataset?.classicalWorkbenchStage) {
    return stage.dataset.classicalWorkbenchStage;
  }
  if (element?.closest?.("#classical-grammar-workspace-history")) {
    return "history";
  }
  return "workspace";
}

function readPlayState(documentObject) {
  const sourceDraft = String(
    documentObject.getElementById?.("classical-source-whole")?.value || ""
  ).trim();
  const committedSource = String(
    documentObject.getElementById?.("verb")?.value || ""
  ).trim().replace(/^_$/u, "");
  const navigator = documentObject.getElementById?.(
    "classical-capability-navigator"
  );
  const navigatorSelect = documentObject.getElementById?.(
    "classical-capability-navigator-operation"
  );
  const plan = documentObject.getElementById?.(
    "classical-capability-operation-plan"
  );
  const result = documentObject.getElementById?.(
    "classical-rule-logic-surface"
  );
  const continuation = documentObject.querySelector?.(
    "[data-classical-result-continuation-status]"
  );
  const history = documentObject.getElementById?.(
    "classical-grammar-workspace-history"
  );
  const keyboard = documentObject.getElementById?.(
    "classical-transcription-keyboard"
  );
  return freezeRecord({
    sourceDraft,
    committedSource,
    navigatorStatus:
      navigator?.dataset?.classicalCapabilityNavigatorStatus || "waiting",
    selectedOperation: String(navigatorSelect?.value || ""),
    interfacePromise: String(
      documentObject.getElementById?.(
        "classical-capability-operation-plan-status"
      )?.textContent || documentObject.getElementById?.(
        "classical-capability-navigator-status"
      )?.textContent || ""
    ).trim().replace(/\s+/gu, " ").slice(0, 240),
    ownerAnswer:
      plan?.dataset?.classicalCapabilityOperationPlanStatus
      || result?.dataset?.classicalResultStatus
      || "waiting",
    blockReason: result?.dataset?.classicalBlockReason || "",
    resultStatus: result?.dataset?.classicalResultStatus || "waiting",
    resultText: String(
      result?.querySelector?.(
        ".classical-rule-surface__single-vnc-answer, "
          + ".classical-rule-surface__single-nnc-answer, "
          + ".classical-rule-surface__answer"
      )?.textContent || ""
    ).trim().replace(/\s+/gu, " ").slice(0, 240),
    continuationStatus:
      continuation?.dataset?.classicalResultContinuationStatus || "waiting",
    historyOpen: history?.open === true,
    keyboardOpen: keyboard?.open === true,
  });
}

function playStateKey(state) {
  return JSON.stringify([
    state.sourceDraft,
    state.committedSource,
    state.navigatorStatus,
    state.selectedOperation,
    state.interfacePromise,
    state.ownerAnswer,
    state.blockReason,
    state.resultStatus,
    state.resultText,
    state.continuationStatus,
    state.historyOpen,
    state.keyboardOpen,
  ]);
}

export function createClassicalPlayWitness({
  documentObject = globalThis.document,
  windowObject = globalThis.window,
  now = () => Date.now(),
  schedule = callback => windowObject?.setTimeout?.(callback, 0),
} = {}) {
  let enabled = false;
  try {
    enabled = new URLSearchParams(windowObject?.location?.search || "")
      .get("manufacturer") === "1";
  } catch {
    enabled = false;
  }
  const actions = [];
  const feelings = [];
  let installedRoot = null;
  let lastActionAt = 0;
  const projection = documentObject.getElementById?.(
    "classical-play-witness-projection"
  ) || null;

  const snapshot = () => {
    const unchangedActionCount = actions.filter(
      record => record.observableOutcome === "unchanged"
    ).length;
    const blockedActionCount = actions.filter(
      record => Boolean(record.after.committedSource) && (
        record.after.blockReason
          || record.after.ownerAnswer === "blocked"
      )
    ).length;
    const waitingActionCount = actions.filter(
      record => !record.after.committedSource || (
        record.after.ownerAnswer === "waiting"
          && record.after.resultStatus !== "authorized"
      )
    ).length;
    const deadActionCount = actions.filter(
      record => !record.disabled
        && record.eventType === "click"
        && record.observableOutcome === "unchanged"
    ).length;
    const repeatedActionCount = actions.filter(
      record => record.repeatedControl
    ).length;
    return Object.freeze({
      kind: CLASSICAL_PLAY_WITNESS_KIND,
      version: 1,
      enabled,
      grammarAuthority: false,
      sourceAuthority: false,
      resultAuthority: false,
      networkTransmission: false,
      actionCount: actions.length,
      feelingCount: feelings.length,
      summary: freezeRecord({
        unchangedActionCount,
        blockedActionCount,
        waitingActionCount,
        deadActionCount,
        repeatedActionCount,
        babyJoyCount: feelings.filter(
          record => record.audience === "baby" && record.feeling === "joy"
        ).length,
        babyBoredomCount: feelings.filter(
          record => record.audience === "baby" && record.feeling === "boredom"
        ).length,
        parentJoyCount: feelings.filter(
          record => record.audience === "parent" && record.feeling === "joy"
        ).length,
        parentConcernCount: feelings.filter(
          record => record.audience === "parent" && record.feeling === "concern"
        ).length,
      }),
      actions: Object.freeze(actions.slice()),
      feelings: Object.freeze(feelings.slice()),
    });
  };

  const publishProjection = () => {
    if (!projection) return false;
    projection.dataset.classicalPlayWitnessProjection = enabled
      ? "observing"
      : "off";
    projection.textContent = JSON.stringify(snapshot());
    return true;
  };

  const markFeeling = ({ audience = "", feeling = "", note = "" } = {}) => {
    const normalizedAudience = String(audience || "").trim();
    const normalizedFeeling = String(feeling || "").trim();
    if (!enabled || !FEELINGS_BY_AUDIENCE[normalizedAudience]?.has(
      normalizedFeeling
    )) {
      return false;
    }
    feelings.push(freezeRecord({
      sequence: feelings.length + 1,
      at: now(),
      audience: normalizedAudience,
      feeling: normalizedFeeling,
      note: String(note || "").trim().slice(0, 500),
      playState: readPlayState(documentObject),
      authority: "observation-only",
    }));
    publishProjection();
    return true;
  };

  const observeAction = event => {
    const target = event?.target?.closest?.(
      "button, select, input, summary, [role='button']"
    );
    if (!target || !installedRoot?.contains?.(target)) return;
    const before = readPlayState(documentObject);
    const startedAt = now();
    const previous = actions[actions.length - 1] || null;
    const targetId = String(
      target.id
        || target.dataset?.classicalCapabilityChoiceId
        || target.name
        || target.tagName
        || ""
    );
    const targetLabel = getElementText(target);
    const targetValue = getControlValue(target);
    const targetDisabled = target.disabled === true;
    const phase = getPlayPhase(target);
    schedule?.(() => {
      const after = readPlayState(documentObject);
      actions.push(freezeRecord({
        sequence: actions.length + 1,
        at: startedAt,
        eventType: String(event.type || "action"),
        phase,
        targetId,
        targetLabel,
        targetValue,
        disabled: targetDisabled,
        elapsedSincePreviousMs: lastActionAt ? startedAt - lastActionAt : 0,
        repeatedControl: previous?.targetId === targetId,
        before,
        after,
        observableOutcome:
          playStateKey(before) === playStateKey(after)
            ? "unchanged"
            : "changed",
        authority: "observation-only",
      }));
      lastActionAt = startedAt;
      publishProjection();
    });
  };

  const observeFeeling = event => {
    markFeeling(event?.detail || {});
  };

  const observeClick = event => {
    const feelingControl = event?.target?.closest?.(
      "[data-classical-play-audience][data-classical-play-feeling]"
    );
    if (feelingControl && installedRoot?.contains?.(feelingControl)) {
      markFeeling({
        audience: feelingControl.dataset?.classicalPlayAudience,
        feeling: feelingControl.dataset?.classicalPlayFeeling,
      });
      return;
    }
    observeAction(event);
  };

  const install = root => {
    if (!root?.addEventListener) return false;
    root.dataset.classicalPlayWitness = enabled ? "observing" : "off";
    root.dataset.classicalPlayWitnessAuthority = "false";
    publishProjection();
    if (!enabled) return false;
    if (installedRoot === root) return true;
    installedRoot = root;
    root.addEventListener("click", observeClick, true);
    root.addEventListener("change", observeAction, true);
    root.addEventListener("classical:play-feeling", observeFeeling, true);
    return true;
  };

  return Object.freeze({
    kind: CLASSICAL_PLAY_WITNESS_KIND,
    enabled,
    grammarAuthority: false,
    install,
    markFeeling,
    snapshot,
  });
}

function exposeClassicalPlayWitness(targetObject, witness) {
  [
    globalThis,
    targetObject.document?.defaultView,
    targetObject.window,
    targetObject,
  ]
    .filter(Boolean)
    .filter((candidate, index, candidates) => (
      candidates.indexOf(candidate) === index
    ))
    .forEach(candidate => {
      try {
        Object.defineProperty(candidate, "__CLASSICAL_PLAY_WITNESS__", {
          configurable: true,
          enumerable: false,
          value: witness,
          writable: false,
        });
      } catch {
        // A sealed runtime projection must not prevent browser observation.
      }
    });
}

export function installClassicalPlayWitness(
  targetObject = globalThis,
  root = targetObject.document?.getElementById?.("classical-app-root")
) {
  const existing = targetObject.__CLASSICAL_PLAY_WITNESS__;
  if (existing?.kind === CLASSICAL_PLAY_WITNESS_KIND) {
    existing.install(root);
    if (existing.enabled) exposeClassicalPlayWitness(targetObject, existing);
    return existing;
  }
  const witness = createClassicalPlayWitness({
    documentObject: targetObject.document,
    windowObject:
      targetObject.window
      || targetObject.document?.defaultView
      || targetObject,
    now: () => targetObject.Date?.now?.() || Date.now(),
    schedule: callback => targetObject.setTimeout?.(callback, 0),
  });
  witness.install(root);
  if (witness.enabled) {
    try {
      Object.defineProperty(root, "__classicalPlayWitness", {
        configurable: true,
        enumerable: false,
        value: witness,
        writable: false,
      });
    } catch {
      // The dataset still reports observation if a host seals DOM nodes.
    }
    exposeClassicalPlayWitness(targetObject, witness);
  }
  return witness;
}
