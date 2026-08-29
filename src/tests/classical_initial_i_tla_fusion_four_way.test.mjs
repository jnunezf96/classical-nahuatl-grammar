import assert from "node:assert/strict";

import {
  createClassicalNahuatlVerbstemClassesRuntime,
} from "../core/classical/verbstem_classes.mjs";

const grammar = createClassicalNahuatlVerbstemClassesRuntime({});
const stem = "ihcuil-o-a";

function initialI(kind) {
  return grammar.buildClassicalNahuatlVerbstemInitialSupportiveIFrame(
    stem,
    {
      valence: "projective-nonhuman",
      initialVowelKind: kind,
    },
  );
}

function fusion(kind) {
  return grammar.buildClassicalNahuatlTlaFusionRuleFrame(stem, {
    tlaFusion: true,
    valence: "projective-nonhuman",
    requestedSourceValence: "projective-nonhuman",
    initialVowelKind: kind,
  });
}

const realInitial = initialI("real");
const supportiveInitial = initialI("supportive");
const realFusion = fusion("real");
const supportiveFusion = fusion("supportive");

assert.equal(realInitial.stemRealization, "ihcuil-o-a");
assert.equal(realInitial.initialSupportiveIDropped, false);
assert.equal(supportiveInitial.stemRealization, "hcuil-o-a");
assert.equal(supportiveInitial.initialSupportiveIDropped, true);

assert.equal(realFusion.authorizationStatus, "authorized");
assert.equal(realFusion.derivedStem, "tla-ihcuil-o-a");
assert.equal(
  realFusion.constructiveTlaFusionTargetFrame
    .matrixInitialSupportiveIDropped,
  false,
);

assert.equal(supportiveFusion.authorizationStatus, "authorized");
assert.equal(supportiveFusion.derivedStem, "tla-hcuil-o-a");
assert.equal(
  supportiveFusion.constructiveTlaFusionTargetFrame
    .matrixInitialSupportiveIDropped,
  true,
);
assert.equal(
  supportiveFusion.constructiveTlaFusionTargetFrame
    .constructedDerivedStemBeforeInitialSupportiveI,
  "tla-ihcuil-o-a",
);
assert.equal(
  supportiveFusion.sourceFormula,
  "#pers1-pers2+tla(ihcuil-o-a)tns+num1-num2#",
);
assert.equal(
  supportiveFusion.targetFormula,
  "#pers1-pers2(tla-hcuil-o-a)tns+num1-num2#",
);

assert.deepEqual(
  {
    realUnfused:
      `#0-0+tla(${realInitial.stemRealization})0+0-0#`,
    supportiveUnfused:
      `#0-0+tla(${supportiveInitial.stemRealization})0+0-0#`,
    realFused: `#0-0(${realFusion.derivedStem})0+0-0#`,
    supportiveFused:
      `#0-0(${supportiveFusion.derivedStem})0+0-0#`,
  },
  {
    realUnfused: "#0-0+tla(ihcuil-o-a)0+0-0#",
    supportiveUnfused: "#0-0+tla(hcuil-o-a)0+0-0#",
    realFused: "#0-0(tla-ihcuil-o-a)0+0-0#",
    supportiveFused: "#0-0(tla-hcuil-o-a)0+0-0#",
  },
);

assert.equal(
  `#0-0(${supportiveFusion.constructiveTlaFusionTargetFrame
    .constructedDerivedStemBeforeInitialSupportiveI})0+0-0# > `
    + `#0-0(${supportiveFusion.derivedStem})0+0-0#`,
  "#0-0(tla-ihcuil-o-a)0+0-0# > #0-0(tla-hcuil-o-a)0+0-0#",
);

console.log("Initial-i × tla-fusion four-way focused tests passed.");
