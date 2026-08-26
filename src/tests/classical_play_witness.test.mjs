import assert from "node:assert/strict";

import {
  CLASSICAL_PLAY_WITNESS_KIND,
  createClassicalPlayWitness,
} from "../ui/diagnostics/classical_play_witness.mjs";

function makeElement({ id = "", value = "", text = "" } = {}) {
  return {
    id,
    value,
    textContent: text,
    dataset: {},
    disabled: false,
    getAttribute: name => name === "aria-label" ? text : "",
    closest(selector) {
      if (selector.includes("data-classical-workbench-stage")) {
        return { dataset: { classicalWorkbenchStage: "source" } };
      }
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

const sourceDraft = makeElement({ id: "classical-source-whole" });
const committed = makeElement({ id: "verb" });
const navigator = makeElement({ id: "classical-capability-navigator" });
navigator.dataset.classicalCapabilityNavigatorStatus = "waiting";
const navigatorSelect = makeElement({
  id: "classical-capability-navigator-operation",
});
const plan = makeElement({ id: "classical-capability-operation-plan" });
plan.dataset.classicalCapabilityOperationPlanStatus = "waiting";
const planStatus = makeElement({
  id: "classical-capability-operation-plan-status",
  text: "Choose a pathway.",
});
const result = makeElement({ id: "classical-rule-logic-surface" });
result.dataset.classicalResultStatus = "blocked";
result.dataset.classicalBlockReason = "source-required";
const projection = makeElement({ id: "classical-play-witness-projection" });
const controls = new Map([
  [sourceDraft.id, sourceDraft],
  [committed.id, committed],
  [navigator.id, navigator],
  [navigatorSelect.id, navigatorSelect],
  [plan.id, plan],
  [planStatus.id, planStatus],
  [result.id, result],
  [projection.id, projection],
]);
const documentObject = {
  getElementById: id => controls.get(id) || null,
  querySelector: () => null,
};
const listeners = new Map();
const root = {
  dataset: {},
  addEventListener: (type, listener) => listeners.set(type, listener),
  contains: () => true,
};

const off = createClassicalPlayWitness({
  documentObject,
  windowObject: { location: { search: "" } },
});
assert.equal(off.enabled, false);
assert.equal(off.install(root), false);
assert.equal(root.dataset.classicalPlayWitness, "off");

let clock = 100;
const witness = createClassicalPlayWitness({
  documentObject,
  windowObject: { location: { search: "?manufacturer=1" } },
  now: () => clock,
  schedule: callback => callback(),
});
assert.equal(witness.kind, CLASSICAL_PLAY_WITNESS_KIND);
assert.equal(witness.install(root), true);
assert.equal(root.dataset.classicalPlayWitness, "observing");
assert.equal(projection.dataset.classicalPlayWitnessProjection, "observing");

sourceDraft.value = "ahci";
const button = makeElement({ id: "verb-entry-apply", text: "Use this Source" });
listeners.get("click")({ type: "click", target: button });
clock += 100;
navigator.dataset.classicalCapabilityNavigatorStatus = "owner-checked";
listeners.get("change")({ type: "change", target: navigatorSelect });
assert.equal(witness.markFeeling({ audience: "baby", feeling: "joy" }), true);
assert.equal(witness.markFeeling({ audience: "parent", feeling: "concern" }), true);
assert.equal(witness.markFeeling({ audience: "manufacturer", feeling: "joy" }), false);
listeners.get("classical:play-feeling")({
  detail: { audience: "baby", feeling: "boredom" },
});

const snapshot = witness.snapshot();
assert.equal(snapshot.grammarAuthority, false);
assert.equal(snapshot.networkTransmission, false);
assert.equal(snapshot.actionCount, 2);
assert.equal(snapshot.feelingCount, 3);
assert.equal(snapshot.actions[0].phase, "source");
assert.equal(snapshot.actions[0].before.sourceDraft, "ahci");
assert.equal(snapshot.actions[1].after.navigatorStatus, "owner-checked");
assert.equal(snapshot.summary.babyJoyCount, 1);
assert.equal(snapshot.summary.parentConcernCount, 1);
assert.equal(snapshot.summary.babyBoredomCount, 1);
assert.equal(snapshot.summary.blockedActionCount, 0);
assert.equal(snapshot.summary.waitingActionCount, 2);
assert.equal(snapshot.summary.deadActionCount, 1);
assert.equal(JSON.parse(projection.textContent).actionCount, 2);

process.stdout.write(
  "[PASS] classical_play_witness: local actions, observable outcomes, and explicit joy/concern marks\n",
);
