import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClassicalNahuatlSourceStemInventoryApi } from "../core/classical/source_stem_inventory.mjs";

const testDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(testDirectory, "..", "..");
const read = relativePath => fs.readFileSync(path.join(projectRoot, relativePath), "utf8");

const shell = read("src/ui/shell/classical_shell.mjs");
const rendering = read("src/ui/rendering/rendering.mjs");
const composer = read("src/ui/composer/composer.mjs");
const application = read("src/application/classical/vnc_application.mjs");
const css = read("style.css");

const authorityStart = shell.indexOf("function ClassicalAuthorityPanel");
const resultStart = shell.indexOf("function ClassicalResultPanel");
const footerStart = shell.indexOf("function ClassicalFooter", resultStart);
assert.ok(authorityStart >= 0 && resultStart > authorityStart && footerStart > resultStart);
const authorityPanel = shell.slice(authorityStart, resultStart);
const resultPanel = shell.slice(resultStart, footerStart);
const sourcePanel = shell.slice(shell.indexOf("function ClassicalSourcePanel"), authorityStart);

assert.equal(sourcePanel.includes('data-classical-basal-unit="particle"'), false, "Particle must not be a basal Source unit");
assert.equal(authorityPanel.includes('id="classical-lesson3-particles-output"'), false, "Particle must not own a standalone Authority/Result route");
assert.equal(authorityPanel.includes('id="classical-rule-logic-sentence-particle"'), true, "Sentence must own the particle choice");
assert.equal(authorityPanel.includes('id="classical-rule-logic-sentence-particle-honorific"'), true, "Sentence must express honorificization as an operation on a compatible particle");
assert.equal(authorityPanel.includes('id="classical-rule-logic-sentence-adverbial"'), true, "Sentence must own the typed adverbial choice");
assert.equal(authorityPanel.includes('id="classical-rule-logic-sentence-adverbial-position"'), false, "Canvas collocation order must not be exposed as an arbitrary placement decision");
assert.equal(rendering.includes('createDisclosure("sentence", "Sentence", "")'), false, "Sentence documentary readout must not become a parallel Result disclosure");
assert.equal(rendering.includes("classicalSentenceSettingsGroup"), false, "Sentence must not recreate nested instructional groups");
assert.equal(authorityPanel.includes('data-classical-vnc-authority-order="sentence-particle"'), true, "VNC sentences must expose the shared particle choice");
assert.equal(authorityPanel.includes('data-classical-nnc-authority-order="sentence-particle"'), true, "NNC sentences must expose the shared particle choice");
assert.equal(composer.includes("CLASSICAL_BASAL_UNIT.particle"), false, "Runtime basal state must contain only VNC and NNC");
assert.equal(rendering.includes("buildClassicalFinalSentenceDisplayProjection"), true, "Result composition must use the shared typed sentence projection");
assert.equal(rendering.includes("buildClassicalNahuatlLesson3SentenceParticleLayerFrame"), false, "Renderer must not dispatch sentence composition by lesson");
assert.equal(composer.includes('["clause-introducer", "Clause introducers"]'), true, "Particle function choices must be grouped by their typed Canvas class");
assert.equal(composer.includes('group.label = "Adverbial modifiers"'), true, "Adverbial modifiers must identify their Canvas particle class");
assert.equal(composer.includes("Array.from(control.children || []).forEach(child => child.remove())"), true, "Repopulating grouped particle choices must not leave obsolete empty groups");
assert.equal(composer.includes('if (normalized.input && typeof targetObject.renderClassicalRuleLogicSurfaceBlock === "function")'), true, "restored VNC and NNC URLs must both finalize #3 Result");
assert.equal(composer.includes('if (normalized.ordinaryNnc.enabled === true && typeof targetObject.renderClassicalRuleLogicSurfaceBlock === "function")'), false, "Result restoration must not be restricted to NNC");

for (const controlId of [
  "classical-rule-logic-valence",
  "classical-rule-logic-class"
]) {
  assert.equal(sourcePanel.includes(controlId), true, `${controlId} must remain in Source`);
  assert.equal(authorityPanel.includes(controlId), false, `${controlId} must not return to Authority`);
}

for (const controlId of [
  "classical-rule-logic-nnc-output-scope",
  "classical-rule-logic-vnc-output-scope"
]) {
  assert.equal(authorityPanel.includes(controlId), false, `${controlId} must not return to Authority`);
  assert.equal(resultPanel.includes(controlId), true, `${controlId} must remain in Result`);
}
assert.match(resultPanel, /data-classical-result-scope-controls="true"/);

assert.equal(rendering.includes("classical-authority-receipt--result"), false, "Documentary Authority receipt must not be rendered inside canonical Result");
assert.equal(rendering.includes("authorityReceiptCount"), false, "Result must not count documentary Authority rows");

assert.ok(rendering.includes('classicalVncDerivationDefaultState = "collapsed"'));
assert.equal(rendering.includes("classicalVncDerivationEvidence"), false, "Documentary evidence must not surface as a Result field");
assert.ok(css.includes(".classical-vnc-derivation-explainer:not([open]) > :not(.classical-vnc-derivation-explainer__header)"));
assert.ok(application.includes("participantFormulaSegments"));
assert.ok(rendering.includes("appendParticipantLinkedFormula"));
assert.ok(rendering.includes("dataset.classicalVncParticipant"));

const inventoryAudit = createClassicalNahuatlSourceStemInventoryApi().auditClassicalNahuatlCanonicalSourceStemInventory();
assert.deepEqual(
  {
    duplicateCount: inventoryAudit.duplicateCount,
    invalidRecordCount: inventoryAudit.invalidRecordCount,
    ok: inventoryAudit.ok
  },
  { duplicateCount: 0, invalidRecordCount: 0, ok: true }
);
assert.ok(shell.includes('id="classical-vnc-source-stem"'));
assert.ok(composer.includes("applyClassicalVncSourceStemSelection"));
assert.equal(composer.includes("getClassicalVncSourceStemStarterPreset"), false);
assert.equal(composer.includes("setClassicalAuthorityControlFromSourceSelection"), false);
assert.ok(sourcePanel.includes('data-classical-source-parts-mode="whole-stem"'));
assert.ok(sourcePanel.includes('data-classical-source-parts-kind="whole-stem"'));
assert.ok(sourcePanel.includes('data-classical-source-parts-kind="embed-matrix"'));
assert.equal(sourcePanel.includes('data-classical-source-parts-kind="internal-morphemes"'), false);
assert.ok(sourcePanel.includes('data-classical-source-internal-morphs="typed-andrews-analysis"'));
assert.equal(composer.includes("classicalSourcePartsUserMode"), false);
assert.equal(composer.includes("CLASSICAL_SOURCE_PARTS_MODE.internalMorphemes"), false);
assert.equal(composer.includes("modeButtons?.find"), false);
assert.equal(rendering.includes('querySelector("[data-classical-source-parts-mode]")'), false);
assert.equal(rendering.includes("activeModeButton"), false);
assert.ok(rendering.includes('getElementById("classical-source-parts")'));
assert.equal(css.includes(':has([data-classical-source-parts-mode='), false);
assert.equal(css.includes('#classical-source-parts[data-classical-source-parts-mode="internal-morphemes"]'), false);

assert.ok(shell.includes('data-derivation-type="causative"'));
assert.ok(shell.includes('data-derivation-type="applicative"'));
assert.equal(shell.includes("rule-generated"), false);

assert.match(composer, /key: "panel",[\s\S]{0,100}segment: "screen"/);
assert.match(composer, /key: "derivationType",[\s\S]{0,100}segment: "derivation"/);
assert.ok(composer.includes("targetObject.setLeftPanelStackMode(normalized.panel)"));
assert.ok(composer.includes("targetObject.setActiveDerivationType(normalized.derivationType)"));

console.log("Public UI decision contract tests passed.");
