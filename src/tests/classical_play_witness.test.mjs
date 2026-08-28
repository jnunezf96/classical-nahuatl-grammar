import assert from "node:assert/strict";

import {
  CLASSICAL_PLAY_HESITATION_THRESHOLD_MS,
  CLASSICAL_PLAY_WITNESS_KIND,
  createClassicalPlayWitness,
  getClassicalObservationControlId,
} from "../ui/diagnostics/classical_play_witness.mjs";

function makeElement({
  id = "",
  value = "",
  text = "",
  tagName = "BUTTON",
  phase = "workspace",
} = {}) {
  return {
    id,
    value,
    textContent: text,
    tagName,
    phase,
    dataset: {},
    disabled: false,
    open: false,
    options: [],
    getAttribute: name => name === "aria-label" ? text : "",
    closest(selector) {
      if (selector.includes("data-classical-workbench-stage")) {
        return { dataset: { classicalWorkbenchStage: this.phase } };
      }
      if (selector.includes("classical-session-recorder")) return null;
      if (selector.includes("data-classical-play-audience")) {
        return this.dataset.classicalPlayAudience
          && this.dataset.classicalPlayFeeling
          ? this
          : null;
      }
      return this;
    },
    querySelector: () => null,
  };
}

function makeRoot() {
  const listeners = new Map();
  return {
    dataset: {},
    listeners,
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
    contains: () => true,
    dispatch(type, target, detail = null) {
      (listeners.get(type) || []).forEach(listener => listener({
        type,
        target,
        detail,
      }));
    },
  };
}

const sourceSentinel = "privacywitnesscaqui";
const resultSentinel = "Privacywitnesscaqui.";
const sourceDraft = makeElement({
  id: "classical-source-whole",
  value: sourceSentinel,
  tagName: "INPUT",
  phase: "source",
});
const committed = makeElement({ id: "verb", value: sourceSentinel });
const navigator = makeElement({ id: "classical-capability-navigator" });
navigator.dataset.classicalCapabilityNavigatorStatus = "waiting";
const navigatorSelect = makeElement({
  id: "classical-capability-navigator-operation",
  value: "private-operation-value",
  tagName: "SELECT",
  phase: "grammar",
});
const plan = makeElement({ id: "classical-capability-operation-plan" });
plan.dataset.classicalCapabilityOperationPlanStatus = "waiting";
const resultAnswer = makeElement({ text: resultSentinel });
const result = makeElement({ id: "classical-rule-logic-surface" });
result.dataset.classicalResultStatus = "blocked";
result.dataset.classicalBlockReason = "source-required";
result.querySelector = () => resultAnswer;
const projection = makeElement({ id: "classical-play-witness-projection" });
const history = makeElement({ id: "classical-grammar-workspace-history" });
const historyNode = makeElement({
  id: "classical-grammar-workspace-history-node",
  tagName: "SELECT",
});
historyNode.options = [{ value: "" }];
const continuationStatus = makeElement();
continuationStatus.dataset.classicalResultContinuationStatus = "waiting";
let continuationAction = null;
const controls = new Map([
  sourceDraft,
  committed,
  navigator,
  navigatorSelect,
  plan,
  result,
  projection,
  history,
  historyNode,
].map(control => [control.id, control]));
const documentObject = {
  getElementById: id => controls.get(id) || null,
  querySelector(selector) {
    if (selector.includes("continuation-status")) return continuationStatus;
    if (selector.includes("continuation-kind")) return continuationAction;
    return null;
  },
};

const offRoot = makeRoot();
const off = createClassicalPlayWitness({
  documentObject,
  windowObject: { location: { search: "" } },
});
assert.equal(off.enabled, false);
assert.equal(off.install(offRoot), false);
assert.equal(offRoot.dataset.classicalPlayWitness, "unavailable");

let clock = 100;
const scheduled = [];
const root = makeRoot();
const witness = createClassicalPlayWitness({
  documentObject,
  windowObject: { location: { search: "?manufacturer=1" } },
  now: () => clock,
  schedule: callback => scheduled.push(callback),
});
assert.equal(witness.kind, CLASSICAL_PLAY_WITNESS_KIND);
assert.equal(witness.install(root), true);
assert.equal(root.dataset.classicalPlayWitness, "off");
assert.equal(projection.dataset.classicalPlayWitnessProjection, "off");
assert.equal(root.listeners.get("click")?.length || 0, 0);
assert.equal(witness.markFeeling({ audience: "baby", feeling: "joy" }), false);

const sourceButton = makeElement({
  id: "verb-entry-apply",
  value: sourceSentinel,
  text: sourceSentinel,
  phase: "source",
});
root.dispatch("click", sourceButton);
assert.equal(witness.snapshot().actionCount, 0);

assert.equal(witness.start(), true);
assert.equal(root.dataset.classicalPlayWitness, "observing");
assert.equal(root.listeners.get("click").length, 1);

clock += CLASSICAL_PLAY_HESITATION_THRESHOLD_MS + 50;
root.dispatch("click", sourceButton);
navigator.dataset.classicalCapabilityNavigatorStatus = "owner-checked";
scheduled.shift()();

const apply = makeElement({
  id: "classical-capability-apply-operation",
  value: sourceSentinel,
  text: resultSentinel,
  phase: "grammar",
});
clock += 100;
root.dispatch("click", apply);
scheduled.shift()();
clock += 100;
root.dispatch("click", apply);
plan.dataset.classicalCapabilityOperationPlanStatus = "owner-ready";
scheduled.shift()();

const copyResult = makeElement({ phase: "result" });
copyResult.dataset.classicalRuleSurfaceAction = "copy-result";
clock += 100;
root.dispatch("click", copyResult);
scheduled.shift()();
clock += 100;
root.dispatch("change", navigatorSelect);
scheduled.shift()();

result.dataset.classicalResultStatus = "authorized";
result.dataset.classicalBlockReason = "";
result.dataset.classicalCapabilityAppliedOperation = "private-operation-value";
continuationStatus.dataset.classicalResultContinuationStatus = "available";
continuationAction = makeElement({ phase: "result" });
continuationAction.dataset.classicalRuleSurfaceAction = "use-result-as-source";
clock += 100;
root.dispatch("click", continuationAction);
historyNode.value = "private-history-node";
historyNode.options = [{ value: "private-history-node" }];
scheduled.shift()();

assert.equal(witness.markFeeling({
  audience: "baby",
  feeling: "joy",
  note: sourceSentinel,
}), true);
assert.equal(witness.markFeeling({ audience: "parent", feeling: "concern" }), true);

clock += 100;
root.dispatch("click", sourceButton);
scheduled.shift()();
clock += 100;
assert.equal(witness.stop(), true);
assert.equal(root.dataset.classicalPlayWitness, "stopped");

const snapshot = witness.snapshot();
const serialized = JSON.stringify(snapshot);
assert.equal(snapshot.grammarAuthority, false);
assert.equal(snapshot.networkTransmission, false);
assert.equal(snapshot.persistentStorage, false);
assert.equal(snapshot.privacy.rawSourceValues, false);
assert.equal(snapshot.privacy.rawResultValues, false);
assert.equal(snapshot.privacy.rawControlValues, false);
assert.equal(snapshot.summary.completedJourneyCount, 1);
assert.equal(snapshot.completedJourneys[0].continuationControlId, "result:continue");
assert.equal(snapshot.summary.hesitationCount, 1);
assert.equal(snapshot.summary.longestActionGapMs, CLASSICAL_PLAY_HESITATION_THRESHOLD_MS + 50);
assert.equal(snapshot.summary.repeatedClickCount, 1);
assert.equal(snapshot.summary.backtrackingCount, 1);
assert.equal(snapshot.summary.incompleteSessionCount, 1);
assert.equal(snapshot.summary.abandonmentSignalCount, 1);
assert.equal(snapshot.sessionOutcome, "partial");
assert.equal(snapshot.incompleteSession.classification,
  "recording-stopped-with-unfinished-visible-journey");
assert.equal(snapshot.summary.babyJoyCount, 1);
assert.equal(snapshot.summary.parentConcernCount, 1);
assert.equal(snapshot.actions[0].controlId, "source:commit");
assert.equal(snapshot.actions[2].repeatedClick, true);
assert.equal(snapshot.backtracks[0].fromPhase, "result");
assert.equal(snapshot.backtracks[0].toPhase, "grammar");
assert.equal(serialized.includes(sourceSentinel), false);
assert.equal(serialized.includes(resultSentinel), false);
assert.equal(serialized.includes("private-operation-value"), false);
assert.equal(serialized.includes("private-history-node"), false);
assert.equal(serialized.includes("targetLabel"), false);
assert.equal(serialized.includes("targetValue"), false);

const unsafeControl = makeElement({
  id: sourceSentinel,
  value: sourceSentinel,
  text: sourceSentinel,
  tagName: "BUTTON",
  phase: "grammar",
});
assert.equal(getClassicalObservationControlId(unsafeControl), "grammar:button");

assert.equal(witness.discard(), true);
assert.equal(root.dataset.classicalPlayWitness, "off");
assert.equal(witness.snapshot().actionCount, 0);
assert.equal(witness.snapshot().feelingCount, 0);

process.stdout.write(
  "[PASS] classical_play_witness: consent lifecycle, semantic-only metrics, and deterministic journey friction\n",
);
