// Consent-gated, non-authorizing observation of the visible play loop.

export const CLASSICAL_PLAY_WITNESS_KIND =
  "classical-grammar-toy-play-witness";

export const CLASSICAL_PLAY_WITNESS_PRIVACY_CONTRACT = Object.freeze({
  explicitConsentRequired: true,
  recordingDefault: "off",
  sharedLifecycle: "classical-session-recorder",
  grammarAuthority: false,
  sourceAuthority: false,
  resultAuthority: false,
  networkTransmission: false,
  persistentStorage: false,
  rawSourceValues: false,
  rawResultValues: false,
  rawControlValues: false,
  semanticStateOnly: true,
  safeControlIdsOnly: true,
});

export const CLASSICAL_PLAY_HESITATION_THRESHOLD_MS = 3_000;

const FEELINGS_BY_AUDIENCE = Object.freeze({
  baby: Object.freeze(new Set(["joy", "boredom"])),
  parent: Object.freeze(new Set(["joy", "concern"])),
});

const PLAY_PHASES = Object.freeze(new Set([
  "source",
  "grammar",
  "result",
  "continue",
  "history",
  "advanced",
  "workspace",
]));

const PLAY_PHASE_ORDER = Object.freeze({
  source: 1,
  grammar: 2,
  result: 3,
  continue: 4,
  history: 5,
});

const SAFE_CONTROL_IDS = Object.freeze({
  "classical-source-whole": "source:draft",
  verb: "source:committed",
  "verb-entry-apply": "source:commit",
  "verb-entry-clear": "source:clear",
  "classical-capability-navigator-operation": "grammar:operation",
  "classical-capability-navigator-binding": "grammar:result-role",
  "classical-capability-required-result": "grammar:required-result",
  "classical-capability-required-result-use": "grammar:use-required-result",
  "classical-capability-apply-operation": "grammar:apply",
  "classical-grammar-workspace-history-node": "history:current-path",
  "classical-grammar-workspace-history-compare-node": "history:compare-path",
  "classical-grammar-workspace-history-undo": "history:undo",
  "classical-grammar-workspace-history-fork": "history:fork",
  "classical-grammar-workspace-history-continue": "history:continue",
  "classical-grammar-workspace-history-supply": "history:add-to-pathway",
  "classical-grammar-workspace-history-compare": "history:compare",
});

const SAFE_RESULT_ACTIONS = Object.freeze({
  "use-result-as-source": "result:continue",
  "copy-result": "result:copy",
});

function freezeRecord(record = {}) {
  return Object.freeze({ ...record });
}

function safePhase(value) {
  const phase = String(value || "").trim().toLowerCase();
  return PLAY_PHASES.has(phase) ? phase : "workspace";
}

function semanticStatus(value) {
  const status = String(value || "").trim().toLowerCase();
  if (!status || status === "waiting" || status.includes("waiting")) {
    return "waiting";
  }
  if (
    status.includes("blocked")
    || status.includes("missing")
    || status.includes("incompatible")
    || status.includes("unavailable")
  ) {
    return "blocked";
  }
  if (
    status.includes("authorized")
    || status.includes("ready")
    || status.includes("owner-checked")
    || status.includes("applied")
    || status.includes("available")
  ) {
    return "ready";
  }
  if (status.includes("loading") || status.includes("checking")) {
    return "working";
  }
  return "other";
}

function boundedCount(value, maximum = 10_000) {
  const count = Number(value || 0);
  if (!Number.isFinite(count) || count <= 0) return 0;
  return Math.min(Math.floor(count), maximum);
}

function safeChoiceToken(value) {
  const token = String(value || "").trim().toLowerCase();
  return /^[a-z][a-z0-9:_-]{0,79}$/u.test(token) ? token : "";
}

function getPlayPhase(element) {
  const stage = element?.closest?.("[data-classical-workbench-stage]");
  if (stage?.dataset?.classicalWorkbenchStage) {
    return safePhase(stage.dataset.classicalWorkbenchStage);
  }
  if (element?.closest?.("#classical-grammar-workspace-history")) {
    return "history";
  }
  if (element?.closest?.("#classical-grammar-advanced")) {
    return "advanced";
  }
  return "workspace";
}

export function getClassicalObservationControlId(element, phase = getPlayPhase(element)) {
  if (!element) return `${safePhase(phase)}:control`;
  const resultAction = SAFE_RESULT_ACTIONS[
    String(element.dataset?.classicalRuleSurfaceAction || "")
  ];
  if (resultAction) return resultAction;
  const exactId = SAFE_CONTROL_IDS[String(element.id || "")];
  if (exactId) return exactId;
  const choiceId = safeChoiceToken(
    element.dataset?.classicalCapabilityChoiceId
  );
  if (choiceId) return `grammar:choice:${choiceId}`;
  const tag = String(element.tagName || "control").trim().toLowerCase();
  const safeTag = ["button", "select", "input", "summary", "a"].includes(tag)
    ? tag
    : "control";
  return `${safePhase(phase)}:${safeTag}`;
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
  const continuationStatus = documentObject.querySelector?.(
    "[data-classical-result-continuation-status]"
  );
  const continuationAction = documentObject.querySelector?.(
    "[data-classical-result-continuation-kind='exact-result-to-source']"
  );
  const history = documentObject.getElementById?.(
    "classical-grammar-workspace-history"
  );
  const keyboard = documentObject.getElementById?.(
    "classical-transcription-keyboard"
  );
  const binding = documentObject.getElementById?.(
    "classical-capability-navigator-binding"
  );
  const operationChoices = documentObject.getElementById?.(
    "classical-capability-operation-choices"
  );
  const historyNode = documentObject.getElementById?.(
    "classical-grammar-workspace-history-node"
  );
  const captureReadout = documentObject.querySelector?.(
    "[data-classical-clause-relation-captures]"
  );
  const resultPrimary = result?.querySelector?.(
    "[data-classical-result-primary-answer='true'], "
      + ".classical-rule-surface__single-vnc-answer, "
      + ".classical-rule-surface__single-nnc-answer, "
      + ".classical-rule-surface__answer"
  );
  return freezeRecord({
    sourceDraftPresent: Boolean(sourceDraft),
    sourceCommitted: Boolean(committedSource),
    navigatorState: semanticStatus(
      navigator?.dataset?.classicalCapabilityNavigatorStatus
    ),
    operationSelected: Boolean(String(navigatorSelect?.value || "")),
    ownerState: semanticStatus(
      plan?.dataset?.classicalCapabilityOperationPlanStatus
        || result?.dataset?.classicalResultStatus
    ),
    blockPresent: Boolean(result?.dataset?.classicalBlockReason),
    resultState: semanticStatus(result?.dataset?.classicalResultStatus),
    resultOperationPresent: Boolean(
      result?.dataset?.classicalCapabilityAppliedOperation
    ),
    resultPresent: Boolean(String(resultPrimary?.textContent || "").trim()),
    continuationState: semanticStatus(
      continuationStatus?.dataset?.classicalResultContinuationStatus
    ),
    continuationAvailable: Boolean(continuationAction),
    historyOpen: history?.open === true,
    historySelectionPresent: Boolean(String(historyNode?.value || "")),
    historyOptionCount: boundedCount(historyNode?.options?.length),
    bindingSelected: Boolean(String(binding?.value || "")),
    requiredChoiceCount: boundedCount(
      operationChoices?.dataset?.classicalCapabilityChoiceCount,
      100,
    ),
    capturePresent: Boolean(String(captureReadout?.textContent || "").trim()),
    keyboardOpen: keyboard?.open === true,
  });
}

function playStateKey(state) {
  return JSON.stringify([
    state.sourceDraftPresent,
    state.sourceCommitted,
    state.navigatorState,
    state.operationSelected,
    state.ownerState,
    state.blockPresent,
    state.resultState,
    state.resultOperationPresent,
    state.resultPresent,
    state.continuationState,
    state.continuationAvailable,
    state.historyOpen,
    state.historySelectionPresent,
    state.historyOptionCount,
    state.bindingSelected,
    state.requiredChoiceCount,
    state.capturePresent,
    state.keyboardOpen,
  ]);
}

function isProgressAction(action) {
  return ["source", "grammar", "result"].includes(action.phase)
    && action.controlId !== "result:copy"
    && !action.disabled;
}

function buildPlayReport({
  enabled,
  status,
  actions,
  feelings,
  startedAt,
  stoppedAt,
}) {
  const completedActions = actions.filter(record => record.completedJourney);
  const lastCompletedSequence = completedActions.at(-1)?.sequence || 0;
  const pendingActions = actions.filter(record => (
    record.sequence > lastCompletedSequence && isProgressAction(record)
  ));
  const incompleteSession = status === "stopped" && pendingActions.length > 0;
  const hesitations = actions.filter(record => record.hesitated).map(record => (
    freezeRecord({
      actionSequence: record.sequence,
      gapMs: record.elapsedSincePreviousMs,
      phase: record.phase,
      controlId: record.controlId,
    })
  ));
  const repeatedClicks = actions.filter(record => record.repeatedClick).map(
    record => freezeRecord({
      actionSequence: record.sequence,
      at: record.at,
      phase: record.phase,
      controlId: record.controlId,
    })
  );
  const backtracks = actions.filter(record => record.backtracking).map(
    record => freezeRecord({
      actionSequence: record.sequence,
      at: record.at,
      fromPhase: record.previousPhase,
      toPhase: record.phase,
      controlId: record.controlId,
    })
  );
  let journeyStartAt = startedAt;
  const completedJourneys = completedActions.map((record, index) => {
    const journey = freezeRecord({
      journey: index + 1,
      actionSequence: record.sequence,
      completedAt: record.at,
      elapsedMs: Math.max(0, record.at - journeyStartAt),
      continuationControlId: record.controlId,
    });
    journeyStartAt = record.at;
    return journey;
  });
  const unchangedActionCount = actions.filter(
    record => record.observableOutcome === "unchanged"
  ).length;
  const blockedActionCount = actions.filter(
    record => record.after.sourceCommitted && (
      record.after.blockPresent || record.after.ownerState === "blocked"
    )
  ).length;
  const waitingActionCount = actions.filter(
    record => !record.after.sourceCommitted || (
      record.after.ownerState === "waiting"
        && record.after.resultState !== "ready"
    )
  ).length;
  const deadActionCount = actions.filter(
    record => !record.disabled
      && record.eventType === "click"
      && record.observableOutcome === "unchanged"
  ).length;
  const sessionOutcome = status !== "stopped"
    ? status === "observing" ? "active" : "not-observed"
    : actions.length === 0
      ? "empty"
      : incompleteSession
        ? completedJourneys.length ? "partial" : "incomplete"
        : completedJourneys.length ? "completed" : "observed-no-journey";
  return Object.freeze({
    kind: CLASSICAL_PLAY_WITNESS_KIND,
    version: 2,
    enabled,
    status,
    privacy: CLASSICAL_PLAY_WITNESS_PRIVACY_CONTRACT,
    grammarAuthority: false,
    sourceAuthority: false,
    resultAuthority: false,
    networkTransmission: false,
    persistentStorage: false,
    startedAt,
    stoppedAt,
    actionCount: actions.length,
    feelingCount: feelings.length,
    sessionOutcome,
    summary: freezeRecord({
      completedJourneyCount: completedJourneys.length,
      hesitationCount: hesitations.length,
      actionGapCount: actions.length,
      longestActionGapMs: actions.reduce(
        (maximum, record) => Math.max(maximum, record.elapsedSincePreviousMs),
        0,
      ),
      repeatedClickCount: repeatedClicks.length,
      backtrackingCount: backtracks.length,
      incompleteSessionCount: incompleteSession ? 1 : 0,
      abandonmentSignalCount: incompleteSession ? 1 : 0,
      unchangedActionCount,
      blockedActionCount,
      waitingActionCount,
      deadActionCount,
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
    completedJourneys: Object.freeze(completedJourneys),
    actionGaps: Object.freeze(actions.map(record => freezeRecord({
      actionSequence: record.sequence,
      gapMs: record.elapsedSincePreviousMs,
      phase: record.phase,
      controlId: record.controlId,
      hesitated: record.hesitated,
    }))),
    hesitations: Object.freeze(hesitations),
    repeatedClicks: Object.freeze(repeatedClicks),
    backtracks: Object.freeze(backtracks),
    incompleteSession: incompleteSession
      ? freezeRecord({
        unfinishedActionCount: pendingActions.length,
        firstUnfinishedActionSequence: pendingActions[0]?.sequence || 0,
        stoppedAt,
        classification: "recording-stopped-with-unfinished-visible-journey",
      })
      : null,
    actions: Object.freeze(actions.slice()),
    feelings: Object.freeze(feelings.slice()),
  });
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
  let status = enabled ? "off" : "unavailable";
  let startedAt = 0;
  let stoppedAt = 0;
  let lastActionAt = 0;
  let captureGeneration = 0;
  let listenersInstalled = false;

  const projection = () => documentObject.getElementById?.(
    "classical-play-witness-projection"
  ) || null;

  const snapshot = () => buildPlayReport({
    enabled,
    status,
    actions,
    feelings,
    startedAt,
    stoppedAt,
  });

  const publishProjection = () => {
    const currentProjection = projection();
    if (!currentProjection) return false;
    currentProjection.dataset.classicalPlayWitnessProjection = status;
    currentProjection.textContent = JSON.stringify(snapshot());
    return true;
  };

  const markFeeling = ({ audience = "", feeling = "", note = "" } = {}) => {
    const normalizedAudience = String(audience || "").trim();
    const normalizedFeeling = String(feeling || "").trim();
    if (status !== "observing" || !FEELINGS_BY_AUDIENCE[
      normalizedAudience
    ]?.has(normalizedFeeling)) {
      return false;
    }
    feelings.push(freezeRecord({
      sequence: feelings.length + 1,
      at: now(),
      audience: normalizedAudience,
      feeling: normalizedFeeling,
      noteProvided: Boolean(String(note || "").trim()),
      playState: readPlayState(documentObject),
      authority: "observation-only",
    }));
    publishProjection();
    return true;
  };

  const observeAction = event => {
    if (status !== "observing") return;
    const target = event?.target?.closest?.(
      "button, select, input, summary, a, [role='button']"
    );
    if (!target || !installedRoot?.contains?.(target)) return;
    if (target.closest?.("#classical-session-recorder")) return;
    const before = readPlayState(documentObject);
    const actionAt = now();
    const previous = actions[actions.length - 1] || null;
    const phase = getPlayPhase(target);
    const controlId = getClassicalObservationControlId(target, phase);
    const disabled = target.disabled === true;
    const generation = captureGeneration;
    schedule?.(() => {
      if (generation !== captureGeneration) return;
      const after = readPlayState(documentObject);
      const observableOutcome = playStateKey(before) === playStateKey(after)
        ? "unchanged"
        : "changed";
      const elapsedSincePreviousMs = Math.max(
        0,
        actionAt - (lastActionAt || startedAt || actionAt),
      );
      const previousRank = PLAY_PHASE_ORDER[previous?.phase] || 0;
      const currentRank = PLAY_PHASE_ORDER[phase] || 0;
      const backtracking = controlId === "history:undo" || (
        previousRank > 0 && currentRank > 0 && currentRank < previousRank
        && !previous?.completedJourney
      );
      actions.push(freezeRecord({
        sequence: actions.length + 1,
        at: actionAt,
        eventType: String(event.type || "action") === "change"
          ? "change"
          : "click",
        phase,
        controlId,
        disabled,
        elapsedSincePreviousMs,
        hesitated: elapsedSincePreviousMs >= CLASSICAL_PLAY_HESITATION_THRESHOLD_MS,
        repeatedClick: event.type === "click"
          && previous?.eventType === "click"
          && previous.controlId === controlId,
        previousPhase: previous?.phase || "none",
        backtracking,
        before,
        after,
        observableOutcome,
        completedJourney: controlId === "result:continue"
          && !disabled
          && before.resultState === "ready"
          && before.continuationAvailable
          && after.sourceCommitted
          && observableOutcome === "changed",
        authority: "observation-only",
      }));
      lastActionAt = actionAt;
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

  const installListeners = () => {
    if (listenersInstalled) return;
    installedRoot?.addEventListener?.("click", observeClick, true);
    installedRoot?.addEventListener?.("change", observeAction, true);
    installedRoot?.addEventListener?.("classical:play-feeling", observeFeeling, true);
    listenersInstalled = true;
  };

  const removeListeners = () => {
    if (!listenersInstalled) return;
    installedRoot?.removeEventListener?.("click", observeClick, true);
    installedRoot?.removeEventListener?.("change", observeAction, true);
    installedRoot?.removeEventListener?.(
      "classical:play-feeling",
      observeFeeling,
      true,
    );
    listenersInstalled = false;
  };

  const start = () => {
    if (!enabled || !installedRoot || status !== "off") return false;
    actions.length = 0;
    feelings.length = 0;
    startedAt = now();
    stoppedAt = 0;
    lastActionAt = 0;
    captureGeneration += 1;
    status = "observing";
    installListeners();
    installedRoot.dataset.classicalPlayWitness = "observing";
    publishProjection();
    return true;
  };

  const stop = () => {
    if (status !== "observing") return false;
    removeListeners();
    captureGeneration += 1;
    stoppedAt = now();
    status = "stopped";
    if (installedRoot?.dataset) {
      installedRoot.dataset.classicalPlayWitness = "stopped";
    }
    publishProjection();
    return true;
  };

  const discard = () => {
    removeListeners();
    captureGeneration += 1;
    actions.length = 0;
    feelings.length = 0;
    startedAt = 0;
    stoppedAt = 0;
    lastActionAt = 0;
    status = enabled ? "off" : "unavailable";
    if (installedRoot?.dataset) {
      installedRoot.dataset.classicalPlayWitness = status;
    }
    publishProjection();
    return true;
  };

  const install = root => {
    if (!root?.addEventListener) return false;
    if (installedRoot && installedRoot !== root) removeListeners();
    installedRoot = root;
    root.dataset.classicalPlayWitness = status;
    root.dataset.classicalPlayWitnessAuthority = "false";
    publishProjection();
    if (status === "observing") installListeners();
    return enabled;
  };

  return Object.freeze({
    kind: CLASSICAL_PLAY_WITNESS_KIND,
    enabled,
    grammarAuthority: false,
    install,
    start,
    stop,
    discard,
    markFeeling,
    snapshot,
  });
}

const installedPlayWitnesses = new WeakMap();

function exposeClassicalPlayWitness(targetObject, witness) {
  const publicWitness = Object.freeze({
    kind: witness.kind,
    enabled: witness.enabled,
    grammarAuthority: false,
    snapshot: witness.snapshot,
  });
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
          value: publicWitness,
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
  const existing = installedPlayWitnesses.get(targetObject);
  if (existing?.kind === CLASSICAL_PLAY_WITNESS_KIND) {
    existing.install(root);
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
  installedPlayWitnesses.set(targetObject, witness);
  if (witness.enabled) exposeClassicalPlayWitness(targetObject, witness);
  return witness;
}
