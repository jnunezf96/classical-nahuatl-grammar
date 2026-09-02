import test from "node:test";
import assert from "node:assert/strict";

import { createNncApi } from "../core/nnc/nnc.mjs";
import {
  createClassicalNahuatlNncLayerEvaluatorApi,
} from "../core/classical/nnc_layer_evaluator.mjs";
import {
  createClassicalRelationalNncValidationSemanticOperationsApi,
} from "../core/classical/relational_nnc_validation_semantic_operations.mjs";

function install(target, api) {
  Object.defineProperties(target, Object.getOwnPropertyDescriptors(api));
}

function buildRuntime() {
  const target = {};
  install(target, createNncApi(target));
  install(target, createClassicalNahuatlNncLayerEvaluatorApi(target));
  const validation =
    createClassicalRelationalNncValidationSemanticOperationsApi(target);
  return { target, validation };
}

test("huān+yōlqui lexicalization issues exact singular and plural Results", () => {
  const { validation } = buildRuntime();
  const frame = validation.buildClassicalRelationalNncValidationFrame();
  const receipt = frame.constraints.huanYolquiAbsolutiveLexicalization;

  assert.equal(frame.authorizationStatus, "authorized");
  assert.equal(validation.isClassicalRelationalNncValidationFrame(frame), true);
  assert.equal(receipt.authorizationStatus, "authorized");
  assert.deepEqual(receipt.requiredBranchIds, ["singular", "plural"]);
  assert.deepEqual({
    singular: {
      operationId: receipt.branches.singular.operationId,
      source: receipt.branches.singular.canonicalResult.sourceFrame.sourceKind,
      state: receipt.branches.singular.canonicalResult.sourceState,
      possessor: receipt.branches.singular.innerPossessorId,
      number: receipt.branches.singular.numberDyad,
      surface: receipt.branches.singular.surface,
      formula: receipt.branches.singular.formula,
    },
    plural: {
      operationId: receipt.branches.plural.operationId,
      source: receipt.branches.plural.canonicalResult.sourceFrame.sourceKind,
      state: receipt.branches.plural.canonicalResult.sourceState,
      possessor: receipt.branches.plural.innerPossessorId,
      number: receipt.branches.plural.numberDyad,
      surface: receipt.branches.plural.surface,
      formula: receipt.branches.plural.formula,
    },
  }, {
    singular: {
      operationId: "relational-huan-yolqui-absolutive-lexicalization",
      source: "typed-relational-plus-nounstem-compound-source",
      state: "absolutive",
      possessor: "1sg",
      number: ["li", "0"],
      surface: "nohuānyōlli",
      formula: "#Ø-Ø(no-huān-yōl)li-Ø#",
    },
    plural: {
      operationId: "relational-huan-yolqui-absolutive-lexicalization",
      source: "typed-relational-plus-nounstem-compound-source",
      state: "absolutive",
      possessor: "1sg",
      number: ["t", "in"],
      surface: "annohuānyōltin",
      formula: "#an-Ø(no-huān-yōl)t-in#",
    },
  });
});

test("Lesson-12 owns both huān+yōl number branches", () => {
  const { validation } = buildRuntime();
  const receipt = validation.buildClassicalRelationalNncValidationFrame()
    .constraints.huanYolquiAbsolutiveLexicalization;
  const singular = receipt.branches.singular.canonicalResult.sourceFrame
    .lesson12NumberFrame;
  const plural = receipt.branches.plural.canonicalResult.sourceFrame
    .lesson12NumberFrame;

  assert.deepEqual({
    singular: [
      singular.authorizationStatus,
      singular.connectorRule,
      singular.numberBelongsTo,
      singular.numberIsNounInflection,
    ],
    plural: [
      plural.authorizationStatus,
      plural.connectorRule,
      plural.numberBelongsTo,
      plural.numberIsNounInflection,
    ],
  }, {
    singular: [
      "authorized",
      "lesson-12.3.2a-l-plus-tl-assimilates-to-li",
      "subject-personal-pronoun",
      false,
    ],
    plural: [
      "authorized",
      "lesson-12.3.2b-lexically-selected-plural-number-dyad",
      "subject-personal-pronoun",
      false,
    ],
  });
});

test("huān+yōl lexicalization fails closed at every typed prerequisite", () => {
  const { validation } = buildRuntime();
  const blocked = validation.buildClassicalRelationalNncValidationFrame()
    .blockedCases;

  assert.deepEqual({
    wrongTarget: blocked.huanYolquiWrongTarget,
    wrongEmbed: blocked.huanYolquiWrongEmbed,
    wrongSourceKind: blocked.huanYolquiWrongSourceKind,
    missingState: blocked.huanYolquiMissingState,
    missingPossessor: blocked.huanYolquiMissingPossessor,
    possessiveState: blocked.huanYolquiPossessiveState,
    adverbializedSubject: blocked.huanYolquiAdverbializedSubject,
    callerConnector: blocked.huanYolquiCallerConnector,
    relabeledSimple: blocked.relabeledSimpleHuan,
  }, {
    wrongTarget: {
      authorizationStatus: "blocked",
      diagnostic: "huan-yolqui-typed-source-shape-mismatch",
    },
    wrongEmbed: {
      authorizationStatus: "blocked",
      diagnostic: "huan-yolqui-typed-source-shape-mismatch",
    },
    wrongSourceKind: {
      authorizationStatus: "blocked",
      diagnostic: "huan-yolqui-typed-source-kind-required",
    },
    missingState: {
      authorizationStatus: "blocked",
      diagnostic: "huan-yolqui-lexicalization-requires-absolutive-state",
    },
    missingPossessor: {
      authorizationStatus: "blocked",
      diagnostic: "huan-yolqui-inner-possessor-required",
    },
    possessiveState: {
      authorizationStatus: "blocked",
      diagnostic: "huan-yolqui-lexicalization-requires-absolutive-state",
    },
    adverbializedSubject: {
      authorizationStatus: "blocked",
      diagnostic: "huan-yolqui-person-number-subject-required",
    },
    callerConnector: {
      authorizationStatus: "blocked",
      diagnostic: "huan-yolqui-caller-number-connector-rejected",
    },
    relabeledSimple: {
      authorizationStatus: "blocked",
      diagnostic: "huan-yolqui-singular-plural-branch-pair-not-proven",
    },
  });
});

test("copied Results and ordinary huān compounds cannot impersonate the owner", () => {
  const { validation } = buildRuntime();
  const frame = validation.buildClassicalRelationalNncValidationFrame();
  const singular = frame.cases.huanYolquiAbsolutiveSingular;
  const plural = frame.cases.huanYolquiAbsolutivePlural;
  const copied = validation
    .buildClassicalHuanYolquiAbsolutiveLexicalizationConstraint({
      singular: {
        ...singular,
        liveResult: { ...singular.liveResult },
      },
      plural,
    });

  assert.equal(copied.authorizationStatus, "blocked");
  assert.equal(
    copied.branches.singular.blockReason,
    "huan-yolqui-singular-branch-not-proven",
  );
  assert.deepEqual({
    simple: [frame.cases.huan.operationId, frame.cases.huan.surface],
    ordinaryCompound: [
      frame.cases.optionFour.operationId,
      frame.cases.optionFour.surface,
    ],
  }, {
    simple: ["relational-option-one-simple-possessive", "nohuān"],
    ordinaryCompound: [
      "relational-option-four-compound-embed",
      "huāmpoh",
    ],
  });
});
