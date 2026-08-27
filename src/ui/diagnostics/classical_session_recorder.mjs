// Consent-only, non-authorizing observation for manufacturer-mode play.

export const CLASSICAL_SESSION_RECORDER_KIND =
  "classical-grammar-private-play-recording";

export const CLASSICAL_SESSION_RECORDER_PRIVACY_CONTRACT = Object.freeze({
  explicitConsentRequired: true,
  recordingDefault: "off",
  recorderLoad: "after-explicit-start",
  grammarAuthority: false,
  sourceAuthority: false,
  resultAuthority: false,
  networkTransmission: false,
  persistentStorage: false,
  localDownloadOnly: true,
  audioCapture: false,
  videoCapture: false,
  maskAllInputs: true,
  maskAllWorkbenchText: true,
  blockRawPlayWitness: true,
});

const RRWEB_RECORDER_MODULE_URL = new URL(
  "../vendor/rrweb/record-2.1.1.mjs",
  import.meta.url,
).href;

const CONTROL_IDS = Object.freeze({
  section: "classical-session-recorder",
  consent: "classical-session-recorder-consent",
  start: "classical-session-recorder-start",
  stop: "classical-session-recorder-stop",
  download: "classical-session-recorder-download",
  discard: "classical-session-recorder-discard",
  status: "classical-session-recorder-status",
});

const TEXT_INPUT_SELECTOR = [
  "input:not([type])",
  "input[type='text']",
  "input[type='search']",
  "input[type='email']",
  "input[type='tel']",
  "input[type='url']",
  "textarea",
  "[contenteditable='true']",
].join(", ");

const PRIVATE_BLOCK_SELECTOR = [
  "#classical-play-witness-projection",
  ".classical-composition-path-summary",
  "#classical-source-panel",
  "#classical-authority-panel",
  "#classical-result-panel",
  "#classical-grammar-workspace-history",
].join(", ");

function isManufacturerMode(windowObject) {
  try {
    return new URLSearchParams(windowObject?.location?.search || "")
      .get("manufacturer") === "1";
  } catch {
    return false;
  }
}

function freezeRecord(record = {}) {
  return Object.freeze({ ...record });
}

function stripSameOriginNavigation(value, windowObject) {
  if (typeof value !== "string" || !value) return value;
  try {
    const base = new URL(windowObject?.location?.href || "http://localhost/");
    const candidate = new URL(value, base);
    if (candidate.origin !== base.origin) return value;
    return `${candidate.origin}${candidate.pathname}`;
  } catch {
    return value;
  }
}

function sanitizeRecordedValue(value, windowObject, key = "") {
  if (Array.isArray(value)) {
    return value.map(item => sanitizeRecordedValue(item, windowObject));
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([entryKey, entryValue]) => [
      entryKey,
      sanitizeRecordedValue(entryValue, windowObject, entryKey),
    ]));
  }
  if (key === "href" || key === "url" || key === "location") {
    return stripSameOriginNavigation(value, windowObject);
  }
  return value;
}

function safeControlIdentity(element) {
  if (!element) return "control";
  return String(
    element.id
      || element.dataset?.classicalCapabilityChoiceId
      || element.dataset?.classicalSessionRecorderAction
      || element.name
      || element.tagName
      || "control"
  ).trim().slice(0, 160);
}

function playPhase(element) {
  const stage = element?.closest?.("[data-classical-workbench-stage]");
  if (stage?.dataset?.classicalWorkbenchStage) {
    return String(stage.dataset.classicalWorkbenchStage);
  }
  if (element?.closest?.("#classical-grammar-workspace-history")) {
    return "history";
  }
  if (element?.closest?.("#classical-grammar-advanced")) {
    return "advanced";
  }
  return "workspace";
}

function createLocalDownload({ documentObject, windowObject }) {
  return ({ filename, text, type }) => {
    const BlobConstructor = windowObject?.Blob || globalThis.Blob;
    const urlApi = windowObject?.URL || globalThis.URL;
    if (!BlobConstructor || !urlApi?.createObjectURL || !documentObject?.createElement) {
      throw new Error("local-download-unavailable");
    }
    const objectUrl = urlApi.createObjectURL(new BlobConstructor([text], { type }));
    const anchor = documentObject.createElement("a");
    anchor.href = objectUrl;
    anchor.download = filename;
    anchor.rel = "noopener";
    documentObject.body?.append?.(anchor);
    anchor.click?.();
    anchor.remove?.();
    windowObject?.setTimeout?.(() => urlApi.revokeObjectURL(objectUrl), 0);
  };
}

async function loadPinnedRecorder() {
  const recorderModule = await import(RRWEB_RECORDER_MODULE_URL);
  if (typeof recorderModule?.record !== "function") {
    throw new Error("rrweb-record-export-missing");
  }
  return recorderModule.record;
}

export function createClassicalSessionRecorder({
  documentObject = globalThis.document,
  windowObject = globalThis.window,
  now = () => Date.now(),
  loadRecorder = loadPinnedRecorder,
  downloadText = createLocalDownload({ documentObject, windowObject }),
} = {}) {
  const available = isManufacturerMode(windowObject);
  const events = [];
  const actions = [];
  const sensitiveValues = new Set();
  let installedRoot = null;
  let recorderStop = null;
  let recorderStatus = available ? "off" : "unavailable";
  let startedAt = 0;
  let stoppedAt = 0;
  let startGeneration = 0;
  let controlsInstalled = false;

  const controls = () => Object.fromEntries(Object.entries(CONTROL_IDS).map(
    ([key, id]) => [key, documentObject?.getElementById?.(id) || null],
  ));

  const rememberSensitiveValue = value => {
    const text = String(value || "");
    if (text.length < 2) return;
    sensitiveValues.add(text);
    try {
      sensitiveValues.add(encodeURIComponent(text));
    } catch {
      // The literal value still receives the privacy guard.
    }
  };

  const rememberExistingInputs = () => {
    documentObject?.querySelectorAll?.(TEXT_INPUT_SELECTOR)?.forEach?.(element => {
      rememberSensitiveValue(element?.value || element?.textContent || "");
    });
  };

  const snapshot = () => freezeRecord({
    kind: CLASSICAL_SESSION_RECORDER_KIND,
    version: 1,
    available,
    status: recorderStatus,
    grammarAuthority: false,
    networkTransmission: false,
    persistentStorage: false,
    eventCount: events.length,
    actionCount: actions.length,
    startedAt,
    stoppedAt,
  });

  const updateControls = () => {
    if (!installedRoot) return;
    const current = controls();
    installedRoot.dataset.classicalSessionRecorder = recorderStatus;
    installedRoot.dataset.classicalSessionRecorderAvailable = available
      ? "true"
      : "false";
    installedRoot.dataset.classicalSessionRecorderAuthority = "false";
    if (current.section) current.section.hidden = !available;
    if (!available) return;
    const consentGranted = current.consent?.checked === true;
    if (current.consent) {
      current.consent.disabled = recorderStatus === "loading"
        || recorderStatus === "recording";
    }
    if (current.start) {
      current.start.disabled = !consentGranted
        || !["off", "error"].includes(recorderStatus);
    }
    if (current.stop) current.stop.disabled = recorderStatus !== "recording";
    if (current.download) {
      current.download.disabled = recorderStatus !== "stopped"
        || events.length === 0;
    }
    if (current.discard) {
      current.discard.disabled = !["loading", "recording", "stopped", "error"]
        .includes(recorderStatus);
    }
    if (current.status) {
      current.status.dataset.classicalSessionRecorderStatus = recorderStatus;
      current.status.textContent = ({
        off: "Off. Nothing is recorded or sent.",
        loading: "Preparing the private recorder…",
        recording: "Recording masked play in this tab only.",
        stopped: `Stopped. ${events.length} masked events are ready locally.`,
        error: "The recorder could not start. Nothing was saved.",
      })[recorderStatus] || "Recorder unavailable.";
    }
  };

  const observeSensitiveInput = event => {
    rememberSensitiveValue(event?.target?.value || event?.target?.textContent || "");
  };

  const observeSafeAction = event => {
    const target = event?.target?.closest?.(
      "button, select, input, summary, a, [role='button']"
    );
    if (!target || !installedRoot?.contains?.(target)) return;
    if (target.closest?.(`#${CONTROL_IDS.section}`)) return;
    actions.push(freezeRecord({
      sequence: actions.length + 1,
      at: now(),
      eventType: String(event.type || "action"),
      controlId: safeControlIdentity(target),
      phase: playPhase(target),
      disabled: target.disabled === true,
      authority: "observation-only",
    }));
  };

  const installCaptureListeners = () => {
    installedRoot?.addEventListener?.("input", observeSensitiveInput, true);
    installedRoot?.addEventListener?.("change", observeSensitiveInput, true);
    installedRoot?.addEventListener?.("click", observeSafeAction, true);
    installedRoot?.addEventListener?.("change", observeSafeAction, true);
  };

  const removeCaptureListeners = () => {
    installedRoot?.removeEventListener?.("input", observeSensitiveInput, true);
    installedRoot?.removeEventListener?.("change", observeSensitiveInput, true);
    installedRoot?.removeEventListener?.("click", observeSafeAction, true);
    installedRoot?.removeEventListener?.("change", observeSafeAction, true);
  };

  const stop = () => {
    if (recorderStatus !== "recording") return false;
    try {
      recorderStop?.();
    } finally {
      recorderStop = null;
      removeCaptureListeners();
      stoppedAt = now();
      recorderStatus = "stopped";
      updateControls();
    }
    return true;
  };

  const discard = () => {
    startGeneration += 1;
    if (recorderStatus === "recording") stop();
    recorderStop = null;
    removeCaptureListeners();
    events.length = 0;
    actions.length = 0;
    sensitiveValues.clear();
    startedAt = 0;
    stoppedAt = 0;
    recorderStatus = available ? "off" : "unavailable";
    const current = controls();
    if (current.consent) current.consent.checked = false;
    updateControls();
    return true;
  };

  const start = async () => {
    const current = controls();
    if (!available || current.consent?.checked !== true) return false;
    if (!["off", "error"].includes(recorderStatus)) return false;
    const generation = ++startGeneration;
    events.length = 0;
    actions.length = 0;
    sensitiveValues.clear();
    startedAt = now();
    stoppedAt = 0;
    rememberExistingInputs();
    recorderStatus = "loading";
    updateControls();
    try {
      const record = await loadRecorder();
      if (generation !== startGeneration || recorderStatus !== "loading") {
        return false;
      }
      recorderStop = record({
        emit: event => {
          events.push(sanitizeRecordedValue(event, windowObject));
        },
        maskAllInputs: true,
        maskTextSelector: "#classical-workbench",
        blockSelector: PRIVATE_BLOCK_SELECTOR,
        inlineStylesheet: false,
        recordCanvas: false,
        collectFonts: false,
        inlineImages: false,
        sampling: {
          input: "last",
          mousemove: 100,
          scroll: 150,
        },
      });
      if (typeof recorderStop !== "function") {
        throw new Error("rrweb-stop-export-missing");
      }
      installCaptureListeners();
      recorderStatus = "recording";
      updateControls();
      return true;
    } catch {
      recorderStop = null;
      removeCaptureListeners();
      events.length = 0;
      actions.length = 0;
      sensitiveValues.clear();
      recorderStatus = "error";
      updateControls();
      return false;
    }
  };

  const redactSensitiveText = text => Array.from(sensitiveValues)
    .sort((left, right) => right.length - left.length)
    .reduce((result, value) => result.split(value).join("[masked]"), text);

  const download = async () => {
    if (recorderStatus !== "stopped" || events.length === 0) return false;
    const payload = {
      kind: CLASSICAL_SESSION_RECORDER_KIND,
      version: 1,
      privacy: CLASSICAL_SESSION_RECORDER_PRIVACY_CONTRACT,
      grammarAuthority: false,
      sourceAuthority: false,
      resultAuthority: false,
      networkTransmission: false,
      persistentStorage: false,
      startedAt,
      stoppedAt,
      eventCount: events.length,
      actionCount: actions.length,
      actions: actions.slice(),
      events: events.slice(),
    };
    const text = redactSensitiveText(`${JSON.stringify(payload, null, 2)}\n`);
    const safeTimestamp = new Date(startedAt || now())
      .toISOString()
      .replace(/[:.]/gu, "-");
    await downloadText({
      filename: `grammar-os-private-play-${safeTimestamp}.json`,
      text,
      type: "application/json",
    });
    return true;
  };

  const install = root => {
    if (!root?.dataset) return false;
    installedRoot = root;
    updateControls();
    if (!available || controlsInstalled) return available;
    const current = controls();
    current.consent?.addEventListener?.("change", updateControls);
    current.start?.addEventListener?.("click", () => { void start(); });
    current.stop?.addEventListener?.("click", stop);
    current.download?.addEventListener?.("click", () => { void download(); });
    current.discard?.addEventListener?.("click", discard);
    controlsInstalled = true;
    updateControls();
    return true;
  };

  return Object.freeze({
    kind: CLASSICAL_SESSION_RECORDER_KIND,
    available,
    grammarAuthority: false,
    networkTransmission: false,
    persistentStorage: false,
    install,
    start,
    stop,
    discard,
    download,
    snapshot,
  });
}

function exposeClassicalSessionRecorder(targetObject, recorder) {
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
        Object.defineProperty(candidate, "__CLASSICAL_SESSION_RECORDER__", {
          configurable: true,
          enumerable: false,
          value: recorder,
          writable: false,
        });
      } catch {
        // A sealed diagnostic host must not affect the grammar application.
      }
    });
}

export function installClassicalSessionRecorder(
  targetObject = globalThis,
  root = targetObject.document?.getElementById?.("classical-app-root")
) {
  const existing = targetObject.__CLASSICAL_SESSION_RECORDER__;
  if (existing?.kind === CLASSICAL_SESSION_RECORDER_KIND) {
    existing.install(root);
    return existing;
  }
  const recorder = createClassicalSessionRecorder({
    documentObject: targetObject.document,
    windowObject:
      targetObject.window
      || targetObject.document?.defaultView
      || targetObject,
    now: () => targetObject.Date?.now?.() || Date.now(),
  });
  recorder.install(root);
  if (recorder.available) exposeClassicalSessionRecorder(targetObject, recorder);
  return recorder;
}
