import assert from "node:assert/strict";

import {
  CLASSICAL_SESSION_RECORDER_KIND,
  createClassicalSessionRecorder,
} from "../ui/diagnostics/classical_session_recorder.mjs";

function makeControl({ id, checked = false, value = "" } = {}) {
  const listeners = new Map();
  return {
    id,
    checked,
    value,
    hidden: false,
    disabled: false,
    dataset: {},
    textContent: "",
    addEventListener(type, listener) {
      const group = listeners.get(type) || [];
      group.push(listener);
      listeners.set(type, group);
    },
    dispatch(type) {
      (listeners.get(type) || []).forEach(listener => listener({
        type,
        target: this,
      }));
    },
    closest() {
      return null;
    },
  };
}

function makeRoot() {
  const listeners = new Map();
  return {
    dataset: {},
    contains: () => true,
    addEventListener(type, listener) {
      const group = listeners.get(type) || [];
      group.push(listener);
      listeners.set(type, group);
    },
    removeEventListener(type, listener) {
      listeners.set(
        type,
        (listeners.get(type) || []).filter(candidate => candidate !== listener),
      );
    },
    dispatch(type, target) {
      (listeners.get(type) || []).forEach(listener => listener({ type, target }));
    },
  };
}

const sentinel = "privacywitnesscaqui";
const studyEntry = makeControl({ id: "classical-session-recorder-entry" });
studyEntry.hidden = true;
const setup = makeControl({ id: "classical-session-recorder-setup" });
const section = makeControl({ id: "classical-session-recorder" });
section.hidden = true;
const consent = makeControl({ id: "classical-session-recorder-consent" });
const start = makeControl({ id: "classical-session-recorder-start" });
const stop = makeControl({ id: "classical-session-recorder-stop" });
const download = makeControl({ id: "classical-session-recorder-download" });
const discard = makeControl({ id: "classical-session-recorder-discard" });
const status = makeControl({ id: "classical-session-recorder-status" });
const advanced = makeControl({ id: "classical-grammar-advanced" });
advanced.open = false;
let sectionScrollCalls = 0;
let consentFocusCalls = 0;
section.scrollIntoView = () => { sectionScrollCalls += 1; };
consent.focus = () => { consentFocusCalls += 1; };
const sourceInput = makeControl({
  id: "classical-source-whole",
  value: sentinel,
});
const controls = new Map([
  studyEntry,
  setup,
  section,
  consent,
  start,
  stop,
  download,
  discard,
  status,
  advanced,
].map(control => [control.id, control]));
const documentObject = {
  getElementById: id => controls.get(id) || null,
  querySelectorAll: () => [sourceInput],
};
const windowObject = {
  location: {
    search: "?manufacturer=1",
    href: `http://127.0.0.1/index.html?manufacturer=1#classical/v1/vnc/(${sentinel})`,
  },
};

let loaderCalls = 0;
let recordOptions = null;
let stopCalls = 0;
let localDownload = null;
let playStartCalls = 0;
let playStopCalls = 0;
let playDiscardCalls = 0;
const playReport = Object.freeze({
  kind: "classical-grammar-toy-play-witness",
  version: 2,
  status: "stopped",
  sessionOutcome: "incomplete",
  summary: Object.freeze({
    completedJourneyCount: 0,
    hesitationCount: 1,
    repeatedClickCount: 1,
    backtrackingCount: 1,
    incompleteSessionCount: 1,
    abandonmentSignalCount: 1,
  }),
});
const playWitness = {
  start() {
    playStartCalls += 1;
    return true;
  },
  stop() {
    playStopCalls += 1;
    return true;
  },
  discard() {
    playDiscardCalls += 1;
    return true;
  },
  snapshot: () => playReport,
};
const loadRecorder = async () => {
  loaderCalls += 1;
  return options => {
    recordOptions = options;
    options.emit({
      type: 4,
      data: { href: windowObject.location.href },
    });
    options.emit({
      type: 3,
      data: { accidentalSensitiveEcho: sentinel },
    });
    return () => { stopCalls += 1; };
  };
};

const offRoot = makeRoot();
const offRecorder = createClassicalSessionRecorder({
  documentObject,
  windowObject: {
    location: { search: "", href: "http://127.0.0.1/index.html" },
  },
  loadRecorder,
  playWitness,
});
assert.equal(offRecorder.install(offRoot), false);
assert.equal(offRoot.dataset.classicalSessionRecorder, "unavailable");
assert.equal(loaderCalls, 0);

let clock = 1_000;
const root = makeRoot();
const recorder = createClassicalSessionRecorder({
  documentObject,
  windowObject,
  now: () => clock,
  loadRecorder,
  downloadText: value => { localDownload = value; },
  playWitness,
});
assert.equal(recorder.kind, CLASSICAL_SESSION_RECORDER_KIND);
assert.equal(recorder.install(root), true);
assert.equal(root.dataset.classicalSessionRecorder, "off");
assert.equal(root.dataset.classicalSessionRecorderAuthority, "false");
assert.equal(studyEntry.hidden, false);
assert.equal(section.hidden, false);
setup.dispatch("click");
assert.equal(advanced.open, true);
assert.equal(sectionScrollCalls, 1);
assert.equal(consentFocusCalls, 1);
assert.equal(start.disabled, true);
assert.equal(loaderCalls, 0);
assert.equal(playStartCalls, 0);
assert.equal(await recorder.start(), false);
assert.equal(playStartCalls, 0);

consent.checked = true;
consent.dispatch("change");
assert.equal(start.disabled, false);
assert.equal(await recorder.start(), true);
assert.equal(loaderCalls, 1);
assert.equal(playStartCalls, 1);
assert.equal(root.dataset.classicalSessionRecorder, "recording");
assert.equal(recordOptions.maskAllInputs, true);
assert.equal(recordOptions.maskTextSelector, "#classical-workbench");
assert.ok(recordOptions.blockSelector.includes("#classical-play-witness-projection"));
assert.ok(recordOptions.blockSelector.includes("#classical-source-panel"));
assert.ok(recordOptions.blockSelector.includes("#classical-authority-panel"));
assert.ok(recordOptions.blockSelector.includes("#classical-result-panel"));
assert.equal(recordOptions.inlineStylesheet, false);
assert.equal(recordOptions.recordCanvas, false);
assert.equal(recordOptions.collectFonts, false);
assert.equal(recordOptions.inlineImages, false);

const sourceButton = makeControl({ id: "verb-entry-apply" });
sourceButton.closest = selector => selector.includes("button")
  ? sourceButton
  : null;
root.dispatch("input", sourceInput);
root.dispatch("click", sourceButton);
clock += 250;
assert.equal(recorder.stop(), true);
assert.equal(stopCalls, 1);
assert.equal(playStopCalls, 1);
assert.equal(root.dataset.classicalSessionRecorder, "stopped");
assert.match(status.textContent, /give it to the person who invited you/u);
assert.equal(download.disabled, false);
assert.equal(await recorder.download(), true);
assert.ok(localDownload.filename.startsWith("grammar-os-private-play-"));
assert.equal(localDownload.type, "application/json");
assert.equal(localDownload.text.includes(sentinel), false);
assert.equal(localDownload.text.includes("#classical/v1"), false);

const payload = JSON.parse(localDownload.text);
assert.equal(payload.grammarAuthority, false);
assert.equal(payload.networkTransmission, false);
assert.equal(payload.persistentStorage, false);
assert.equal(payload.privacy.explicitConsentRequired, true);
assert.equal(payload.privacy.maskAllInputs, true);
assert.equal(payload.privacy.maskAllWorkbenchText, true);
assert.equal(payload.privacy.blockRawPlayWitness, true);
assert.equal(payload.privacy.capturesClicks, true);
assert.equal(payload.privacy.capturesScrollPosition, true);
assert.equal(payload.privacy.capturesActionTiming, true);
assert.equal(payload.privacy.capturesViewportState, true);
assert.equal(payload.privacy.rawSourceValues, false);
assert.equal(payload.privacy.rawResultValues, false);
assert.equal(payload.privacy.rawControlValues, false);
assert.equal(payload.eventCount, 2);
assert.equal(payload.actionCount, 1);
assert.equal(payload.actions[0].controlId, "source:commit");
assert.deepEqual(payload.play, playReport);
assert.equal(payload.play.summary.hesitationCount, 1);
assert.equal(payload.play.summary.repeatedClickCount, 1);
assert.equal(payload.play.summary.backtrackingCount, 1);
assert.equal(payload.play.summary.abandonmentSignalCount, 1);

assert.equal(recorder.discard(), true);
assert.equal(playDiscardCalls, 1);
assert.equal(root.dataset.classicalSessionRecorder, "off");
assert.equal(consent.checked, false);
assert.equal(recorder.snapshot().eventCount, 0);
assert.equal(recorder.snapshot().actionCount, 0);

process.stdout.write(
  "[PASS] classical_session_recorder: one consent lifecycle, masked rrweb, and deterministic local play report\n",
);
