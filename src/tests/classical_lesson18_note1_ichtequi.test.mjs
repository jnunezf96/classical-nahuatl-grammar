import assert from "node:assert/strict";

import {
  createClassicalNahuatlVerbstemClassesRuntime,
} from "../core/classical/verbstem_classes.mjs";
import {
  createUiComposerRuntime,
} from "../ui/composer/composer.mjs";

const grammar = createClassicalNahuatlVerbstemClassesRuntime({});
const relationship = valence => (
  grammar.buildClassicalNahuatlObjectRelationshipRuleFrame(
    "ich-tequi",
    { valence },
  )
);

for (const valence of ["intransitive", "specific-projective"]) {
  const frame = relationship(valence);
  assert.equal(
    frame.authorizationStatus,
    "authorized",
    `Andrews 18.8 must preserve ${valence} for (ich-tequi)`,
  );
  assert.equal(frame.blockReason, "");
  assert.equal(frame.ichtequiNonspecificObjectBlocked, false);
}

for (const valence of ["projective-human", "projective-nonhuman"]) {
  const frame = relationship(valence);
  assert.equal(
    frame.authorizationStatus,
    "blocked",
    `Andrews 18.8 must block ${valence} for (ich-tequi)`,
  );
  assert.equal(
    frame.blockReason,
    "ich-tequi-nonspecific-object-not-authorized",
  );
  assert.equal(frame.ichtequiNonspecificObjectBlocked, true);
  assert.equal(
    frame.lexicalValenceRuleId,
    "cn-l18-188-note1-ichtequi-specific-object-only",
  );
  assert.equal(frame.lexicalValenceSourceSection, "18.8 note 1; 24.2");
  assert.equal(
    frame.ruleRefs.some(rule => (
      rule.atomId === "ACI-P162-L002-9428A10C8E"
      && rule.section === "18.8 note 1"
    )),
    true,
  );
}

assert.equal(
  grammar.buildClassicalNahuatlObjectRelationshipRuleFrame(
    "cua",
    { valence: "projective-nonhuman" },
  ).authorizationStatus,
  "authorized",
  "The lexical restriction must not become a general nonspecific-object ban",
);

const typedSourceAnalysis = grammar.buildClassicalNahuatlTlaFusionRuleFrame(
  "ichtequi",
  {
    sourceSelectionKind: "embed-matrix",
    sourceEmbedStem: "ich",
    sourceMatrixStem: "tequi",
    valence: "intransitive",
  },
);
assert.equal(typedSourceAnalysis.authorizationStatus, "authorized");
assert.equal(typedSourceAnalysis.sourceStemVariant, "ich-tequi");
assert.equal(
  typedSourceAnalysis.typedSourceSelectionFrame.selectedSourceKind,
  "embed-matrix",
);
assert.equal(
  typedSourceAnalysis.typedSourceSelectionFrame.selectedEmbedStem,
  "ich",
);
assert.equal(
  typedSourceAnalysis.typedSourceSelectionFrame.selectedMatrixStem,
  "tequi",
);

const wholeStemAnalysis = grammar.buildClassicalNahuatlTlaFusionRuleFrame(
  "ichtequi",
  { valence: "intransitive" },
);
assert.equal(wholeStemAnalysis.authorizationStatus, "authorized");
assert.equal(wholeStemAnalysis.sourceStemVariant, "ichtequi");

const mismatchedTypedSource = grammar.buildClassicalNahuatlTlaFusionRuleFrame(
  "ichtequi",
  {
    sourceSelectionKind: "embed-matrix",
    sourceEmbedStem: "ix",
    sourceMatrixStem: "tequi",
    valence: "intransitive",
  },
);
assert.equal(mismatchedTypedSource.authorizationStatus, "blocked");
assert.equal(
  mismatchedTypedSource.tlaFusionContradictionReason,
  "typed-embed-matrix-constituents-mismatch-source-stem",
);

function element(value = "", dataset = {}) {
  return {
    value,
    dataset: { ...dataset },
    disabled: false,
  };
}

const elements = new Map([
  [
    "classical-source-parts",
    element("", { classicalSourcePartsMode: "embed-matrix" }),
  ],
  ["classical-source-whole", element("")],
  ["classical-source-embed", element("ich")],
  ["classical-source-matrix", element("tequi")],
  ["classical-vnc-source-initial-i-choice", element("real")],
  ["classical-vnc-source-lexeme-choice", element("")],
  ["classical-rule-logic-class", element("B")],
  ["classical-rule-logic-valence", element("intransitive")],
  [
    "classical-basal-unit-controls",
    element("", { classicalBasalUnit: "vnc" }),
  ],
]);

const documentObject = {
  getElementById(id) {
    return elements.get(id) || null;
  },
  querySelector() {
    return null;
  },
  querySelectorAll() {
    return [];
  },
};
const composer = createUiComposerRuntime({ document: documentObject });

const baseline = composer.getClassicalSourcePartsEvaluationSignature();
const baselineFrame = JSON.parse(baseline);
assert.equal(baselineFrame.sourceVerbClass, "B");
assert.equal(baselineFrame.sourceValence, "intransitive");

elements.get("classical-rule-logic-class").value = "C";
const classRevision = composer.getClassicalSourcePartsEvaluationSignature();
assert.notEqual(
  classRevision,
  baseline,
  "Changing only Class must invalidate the committed Source signature",
);
assert.equal(JSON.parse(classRevision).sourceVerbClass, "C");

elements.get("classical-rule-logic-class").value = "B";
elements.get("classical-rule-logic-valence").value = "specific-projective";
const valenceRevision = composer.getClassicalSourcePartsEvaluationSignature();
assert.notEqual(
  valenceRevision,
  baseline,
  "Changing only Valence must invalidate the committed Source signature",
);
assert.equal(JSON.parse(valenceRevision).sourceValence, "specific-projective");

console.log("Lesson 18.8 note 1 (ich-tequi) focused tests passed.");
