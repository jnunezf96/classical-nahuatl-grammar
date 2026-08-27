import assert from "node:assert/strict";

import {
  installClassicalNahuatlFormationResultBindingGlobals,
} from "../application/classical/formation_result_binding.mjs";
import {
  installClassicalNahuatlDeverbalNncGlobals,
} from "../core/classical/nnc_lessons35_39_closure.mjs";
import { createRuntimeInstance } from "../runtime/create_runtime.mjs";

function makeDocumentStub() {
  return new Proxy({ readyState: "loading" }, {
    get(target, property) {
      if (property in target) return target[property];
      if (property === "querySelectorAll") return () => [];
      return () => null;
    },
  });
}

const documentObject = makeDocumentStub();
const globalObject = {
  console,
  document: documentObject,
  setTimeout,
  clearTimeout,
  setInterval,
  clearInterval,
  URL,
  URLSearchParams,
  Blob,
  fetch,
  performance,
};
globalObject.window = globalObject;

const { runtimeObject } = await createRuntimeInstance({
  globalObject,
  windowObject: globalObject,
  documentObject,
});
const deverbalDependencyTarget = Object.create(runtimeObject);
const deverbalDependencies = installClassicalNahuatlDeverbalNncGlobals(
  deverbalDependencyTarget,
);
const bindingTarget = Object.create(runtimeObject);
const bindingApi = installClassicalNahuatlFormationResultBindingGlobals(
  bindingTarget,
  { moduleDependencyCapabilities: deverbalDependencies },
);

const ordinarySource = runtimeObject.buildClassicalNahuatlOrdinaryNncSourceFrame({
  stem: "mich",
});
const ordinaryOperation =
  runtimeObject.buildClassicalNahuatlOrdinaryNncOperationFrame(
    ordinarySource,
    {
      state: "absolutive",
      subject: "3sg",
      sentenceType: "statement",
      polarity: "positive",
    },
  );
const ordinaryResult = runtimeObject.requestClassicalOrdinaryNncResult(
  ordinarySource,
  ordinaryOperation,
);
const secondOrdinarySource =
  runtimeObject.buildClassicalNahuatlOrdinaryNncSourceFrame({
    stem: "mich",
  });
const secondOrdinaryOperation =
  runtimeObject.buildClassicalNahuatlOrdinaryNncOperationFrame(
    secondOrdinarySource,
    {
      state: "absolutive",
      subject: "1sg",
      sentenceType: "statement",
      polarity: "positive",
    },
  );
const secondOrdinaryResult =
  runtimeObject.requestClassicalOrdinaryNncResult(
    secondOrdinarySource,
    secondOrdinaryOperation,
  );
const subclassOrdinarySource =
  runtimeObject.buildClassicalNahuatlOrdinaryNncSourceFrame({
    stem: "pah",
  });
const subclassOrdinaryOperation =
  runtimeObject.buildClassicalNahuatlOrdinaryNncOperationFrame(
    subclassOrdinarySource,
    {
      state: "absolutive",
      subject: "3sg",
      sentenceType: "statement",
      polarity: "positive",
    },
  );
const subclassOrdinaryResult =
  runtimeObject.requestClassicalOrdinaryNncResult(
    subclassOrdinarySource,
    subclassOrdinaryOperation,
  );
assert.equal(subclassOrdinaryResult.authorizationStatus, "authorized");
assert.equal(subclassOrdinaryResult.sourceFrame.sourceClass, "tli-1");
const preteritAgentive = runtimeObject.evaluateClassicalNahuatlDeverbalNnc({
  constructionKind: "predicate-nominalization",
  nominalizationKind: "preterit-agentive",
  source: {
    sourceStage: "preterit-predicate",
    sourceStem: "pix",
    verbClass: "A",
    sourceVoice: "active",
    sourceValence: "intransitive",
    sourceObjectPattern: "none",
    sourceSubject: "3sg",
  },
  subject: "3sg",
  state: "absolutive",
  animacy: "animate",
});
const preteritVnc = runtimeObject.evaluateClassicalNahuatlVncApplication({
  sourceStem: "nemi",
  verbClass: "B",
  sourceValence: "intransitive",
  subject: "3sg",
  mood: "indicative",
  tense: "preterit",
  requestedDerivation: "direct",
  requestedVoice: "active",
});
const customaryVnc = runtimeObject.evaluateClassicalNahuatlVncApplication({
  sourceStem: "nemi",
  verbClass: "B",
  sourceValence: "intransitive",
  subject: "3sg",
  mood: "indicative",
  tense: "customary-present",
  requestedDerivation: "direct",
  requestedVoice: "active",
});
const customaryImpersonalVnc =
  runtimeObject.evaluateClassicalNahuatlVncApplication({
    sourceStem: "nemi",
    verbClass: "B",
    sourceValence: "intransitive",
    subject: "3sg",
    mood: "indicative",
    tense: "customary-present",
    requestedDerivation: "direct",
    requestedVoice: "impersonal",
  });
const imperfectActiveVnc =
  runtimeObject.evaluateClassicalNahuatlVncApplication({
    sourceStem: "nemi",
    verbClass: "B",
    sourceValence: "intransitive",
    subject: "3sg",
    mood: "indicative",
    tense: "imperfect",
    requestedDerivation: "direct",
    requestedVoice: "active",
  });
const imperfectPassiveVnc =
  runtimeObject.evaluateClassicalNahuatlVncApplication({
    sourceStem: "pōhua",
    verbClass: "A",
    sourceValence: "specific-projective",
    objectPerson: "3sg",
    subject: "3sg",
    mood: "indicative",
    tense: "imperfect",
    requestedDerivation: "direct",
    requestedVoice: "passive",
  });
const imperfectImpersonalVnc =
  runtimeObject.evaluateClassicalNahuatlVncApplication({
    sourceStem: "cochi",
    verbClass: "B",
    sourceValence: "intransitive",
    subject: "3sg",
    mood: "indicative",
    tense: "imperfect",
    requestedDerivation: "direct",
    requestedVoice: "impersonal",
    nonactiveOptionId: "inherent-impersonal",
  });
assert.equal(imperfectPassiveVnc.authorizationStatus, "authorized");
assert.equal(imperfectImpersonalVnc.authorizationStatus, "authorized");

const cases = [
  [
    "grammar:nominal-construction",
    ordinaryResult,
    ["compound-nnc:embed-result", "compound-nnc:matrix-result"],
  ],
  [
    "nnc:deverbal-construction",
    ordinaryResult,
    ["patientive:characteristic-property"],
  ],
  [
    "nnc:relational",
    preteritAgentive,
    ["relational-source:preterit-agentive:n-locative"],
  ],
  [
    "grammar:nominal-construction",
    preteritVnc.resultFrame,
    ["nominal-embed:matrix-vnc-result"],
  ],
  [
    "nnc:deverbal-construction",
    preteritVnc.resultFrame,
    [
      "predicate-nominalization:preterit-source",
      "patientive:perfective-source",
    ],
  ],
  [
    "nnc:relational",
    preteritVnc,
    ["relational-source:perfective-active:yan-locative"],
  ],
  [
    "nnc:relational",
    imperfectPassiveVnc,
    ["relational-source:imperfect-passive:n-locative"],
  ],
  [
    "nnc:relational",
    imperfectImpersonalVnc,
    ["relational-source:imperfect-impersonal:n-locative"],
  ],
];

for (const [operationId, exactResult, expectedBindingIds] of cases) {
  const frame =
    bindingApi.issueClassicalNahuatlFormationResultBindingFrame(
      operationId,
      exactResult,
    );
  assert.equal(frame.authorizationStatus, "authorized");
  assert.equal(frame.exactResult, exactResult);
  assert.equal(frame.exactResultIdentityPreserved, true);
  assert.equal(frame.grammarAuthority, false);
  assert.equal(frame.ownerAuthorizationStillRequired, true);
  assert.deepEqual(frame.bindingIds, expectedBindingIds);
  assert.equal(
    bindingApi.isClassicalNahuatlFormationResultBindingFrame(frame),
    true,
  );
  assert.equal(
    bindingApi.isClassicalNahuatlFormationResultBindingFrame({ ...frame }),
    false,
  );
}

const resolvedNominalEmbedBinding =
  bindingApi.issueClassicalNahuatlFormationResultBindingFrame(
    "grammar:nominal-construction",
    preteritVnc.resultFrame,
    {
      nominalEmbedRelation: "object",
      nominalEmbedRoute: "object",
      subject: "3sg",
      mood: "indicative",
      tense: "preterit",
      voice: "active",
    },
  );
assert.deepEqual(
  resolvedNominalEmbedBinding.bindingChoices[0].requiredChoiceIds,
  [],
);
assert.equal(
  bindingApi.isClassicalNahuatlFormationResultBindingFrame(
    resolvedNominalEmbedBinding,
  ),
  true,
);

const resolvedCompoundBinding =
  bindingApi.issueClassicalNahuatlFormationResultBindingFrame(
    "grammar:nominal-construction",
    ordinaryResult,
    {
      compoundStructure: "integrated",
      compoundBracketing: "unambiguous",
      state: "absolutive",
      subject: "3sg",
    },
  );
assert.equal(
  resolvedCompoundBinding.bindingChoices.every(
    choice => choice.requiredChoiceIds.length === 0,
  ),
  true,
);
assert.equal(
  bindingApi.isClassicalNahuatlFormationResultBindingFrame(
    resolvedCompoundBinding,
  ),
  true,
);

const unresolvedCustomaryBinding =
  bindingApi.issueClassicalNahuatlFormationResultBindingFrame(
    "nnc:deverbal-construction",
    customaryVnc.resultFrame,
  );
const unresolvedCustomaryChoice =
  unresolvedCustomaryBinding.bindingChoices.find(
    choice => choice.id
      === "predicate-nominalization:customary-agentive-full",
  );
assert.deepEqual(unresolvedCustomaryChoice.requiredChoiceIds, [
  "state",
  "subject",
]);
assert.deepEqual(unresolvedCustomaryChoice.requiredResultRoles, []);

const absolutiveCustomaryBinding =
  bindingApi.issueClassicalNahuatlFormationResultBindingFrame(
    "nnc:deverbal-construction",
    customaryVnc.resultFrame,
    { state: "absolutive" },
  );
const absolutiveCustomaryChoice =
  absolutiveCustomaryBinding.bindingChoices.find(
    choice => choice.id
      === "predicate-nominalization:customary-agentive-full",
  );
assert.deepEqual(absolutiveCustomaryChoice.requiredChoiceIds, ["subject"]);
assert.deepEqual(absolutiveCustomaryChoice.requiredResultRoles, []);
assert.equal(
  bindingApi.isClassicalNahuatlFormationResultBindingFrame(
    absolutiveCustomaryBinding,
  ),
  true,
);

const possessiveCustomaryBinding =
  bindingApi.issueClassicalNahuatlFormationResultBindingFrame(
    "nnc:deverbal-construction",
    customaryVnc.resultFrame,
    { state: "possessive" },
  );
const possessiveCustomaryChoice =
  possessiveCustomaryBinding.bindingChoices.find(
    choice => choice.id
      === "predicate-nominalization:customary-agentive-full",
  );
assert.deepEqual(possessiveCustomaryChoice.requiredChoiceIds, ["subject"]);
assert.deepEqual(possessiveCustomaryChoice.requiredResultRoles, [
  "customary-agentive-preterit-supplement-vnc",
]);
assert.equal(possessiveCustomaryBinding.exactResult, customaryVnc.resultFrame);
assert.equal(
  bindingApi.isClassicalNahuatlFormationResultBindingFrame(
    possessiveCustomaryBinding,
  ),
  true,
);

const customaryCompletion = bindingApi
  .issueClassicalNahuatlFormationResultBindingCompletionFrame(
    possessiveCustomaryBinding,
    "predicate-nominalization:customary-agentive-full",
    "customary-agentive-preterit-supplement-vnc",
    preteritVnc.resultFrame,
  );
assert.equal(customaryCompletion.authorizationStatus, "authorized");
assert.equal(
  customaryCompletion.primaryExactResult,
  customaryVnc.resultFrame,
);
assert.equal(
  customaryCompletion.additionalExactResult,
  preteritVnc.resultFrame,
);
assert.equal(
  customaryCompletion.ownerRequestPatch.canonicalPreteritVncResult,
  preteritVnc.resultFrame,
);
assert.equal(customaryCompletion.bothExactResultIdentitiesPreserved, true);
assert.equal(
  bindingApi.isClassicalNahuatlFormationResultBindingCompletionFrame(
    customaryCompletion,
  ),
  true,
);

const instrumentiveBinding =
  bindingApi.issueClassicalNahuatlFormationResultBindingFrame(
    "nnc:deverbal-construction",
    customaryImpersonalVnc.resultFrame,
    { state: "absolutive" },
  );
const instrumentiveCompletion = bindingApi
  .issueClassicalNahuatlFormationResultBindingCompletionFrame(
    instrumentiveBinding,
    "predicate-nominalization:instrumentive",
    "instrumentive-companion-vnc",
    imperfectActiveVnc.resultFrame,
  );
assert.equal(instrumentiveCompletion.authorizationStatus, "authorized");
assert.equal(
  instrumentiveCompletion.ownerRequestPatch
    .canonicalInstrumentiveAbsolutiveVncResult,
  customaryImpersonalVnc.resultFrame,
);
assert.equal(
  instrumentiveCompletion.ownerRequestPatch
    .canonicalInstrumentivePossessiveVncResult,
  imperfectActiveVnc.resultFrame,
);
assert.equal(
  bindingApi.isClassicalNahuatlFormationResultBindingCompletionFrame(
    instrumentiveCompletion,
  ),
  true,
);

const compoundBinding =
  bindingApi.issueClassicalNahuatlFormationResultBindingFrame(
    "grammar:nominal-construction",
    ordinaryResult,
  );
const compoundCompletion = bindingApi
  .issueClassicalNahuatlFormationResultBindingCompletionFrame(
    compoundBinding,
    "compound-nnc:embed-result",
    "compound-matrix-constituent",
    secondOrdinaryResult,
  );
assert.equal(compoundCompletion.authorizationStatus, "authorized");
assert.equal(
  compoundCompletion.exactResultsByRole["compound-embed-result"],
  ordinaryResult,
);
assert.equal(
  compoundCompletion.exactResultsByRole["compound-matrix-constituent"],
  secondOrdinaryResult,
);
assert.equal(
  bindingApi.isClassicalNahuatlFormationResultBindingCompletionFrame(
    compoundCompletion,
  ),
  true,
);
const reverseCompoundCompletion = bindingApi
  .issueClassicalNahuatlFormationResultBindingCompletionFrame(
    compoundBinding,
    "compound-nnc:matrix-result",
    "compound-embed-constituent",
    secondOrdinaryResult,
  );
assert.equal(reverseCompoundCompletion.authorizationStatus, "authorized");
assert.equal(
  reverseCompoundCompletion.exactResultsByRole["compound-matrix-result"],
  ordinaryResult,
);
assert.equal(
  reverseCompoundCompletion.exactResultsByRole[
    "compound-embed-constituent"
  ],
  secondOrdinaryResult,
);

const subclassCompoundBinding =
  bindingApi.issueClassicalNahuatlFormationResultBindingFrame(
    "grammar:nominal-construction",
    subclassOrdinaryResult,
  );
assert.equal(subclassCompoundBinding.authorizationStatus, "authorized");
assert.deepEqual(subclassCompoundBinding.bindingIds, [
  "compound-nnc:embed-result",
  "compound-nnc:matrix-result",
]);
for (const {
  selectedBindingId,
  requiredResultRole,
  primaryRole,
} of [
  {
    selectedBindingId: "compound-nnc:embed-result",
    requiredResultRole: "compound-matrix-constituent",
    primaryRole: "compound-embed-result",
  },
  {
    selectedBindingId: "compound-nnc:matrix-result",
    requiredResultRole: "compound-embed-constituent",
    primaryRole: "compound-matrix-result",
  },
]) {
  const completion = bindingApi
    .issueClassicalNahuatlFormationResultBindingCompletionFrame(
      subclassCompoundBinding,
      selectedBindingId,
      requiredResultRole,
      secondOrdinaryResult,
    );
  assert.equal(completion.authorizationStatus, "authorized");
  assert.equal(
    completion.exactResultsByRole[primaryRole],
    subclassOrdinaryResult,
  );
  assert.equal(
    completion.exactResultsByRole[requiredResultRole],
    secondOrdinaryResult,
  );
  assert.equal(
    bindingApi.isClassicalNahuatlFormationResultBindingCompletionFrame(
      completion,
    ),
    true,
  );
}

const copiedSubclassBinding =
  bindingApi.issueClassicalNahuatlFormationResultBindingFrame(
    "grammar:nominal-construction",
    { ...subclassOrdinaryResult },
  );
assert.equal(copiedSubclassBinding.authorizationStatus, "blocked");
assert.equal(copiedSubclassBinding.ownerInputAcceptanceProven, false);
const copiedSubclassAdditionalCompletion = bindingApi
  .issueClassicalNahuatlFormationResultBindingCompletionFrame(
    compoundBinding,
    "compound-nnc:embed-result",
    "compound-matrix-constituent",
    { ...subclassOrdinaryResult },
  );
assert.equal(
  copiedSubclassAdditionalCompletion.authorizationStatus,
  "blocked",
);
assert.equal(
  copiedSubclassAdditionalCompletion.blockReason,
  "classical-formation-binding-completion-owner-rejected-result",
);

const nominalEmbedBinding =
  bindingApi.issueClassicalNahuatlFormationResultBindingFrame(
    "grammar:nominal-construction",
    preteritVnc.resultFrame,
  );
const nominalEmbedCompletion = bindingApi
  .issueClassicalNahuatlFormationResultBindingCompletionFrame(
    nominalEmbedBinding,
    "nominal-embed:matrix-vnc-result",
    "nominal-embed-constituent",
    ordinaryResult,
  );
assert.equal(nominalEmbedCompletion.authorizationStatus, "authorized");
assert.equal(
  bindingApi.isClassicalNahuatlFormationResultBindingCompletionFrame(
    nominalEmbedCompletion,
  ),
  true,
);

const wrongRoleCompletion = bindingApi
  .issueClassicalNahuatlFormationResultBindingCompletionFrame(
    compoundBinding,
    "compound-nnc:embed-result",
    "compound-embed-constituent",
    secondOrdinaryResult,
  );
assert.equal(wrongRoleCompletion.authorizationStatus, "blocked");
assert.equal(
  wrongRoleCompletion.blockReason,
  "classical-formation-binding-completion-result-role-mismatch",
);
assert.equal(
  bindingApi.isClassicalNahuatlFormationResultBindingCompletionFrame(
    wrongRoleCompletion,
  ),
  true,
);

const copiedAdditionalCompletion = bindingApi
  .issueClassicalNahuatlFormationResultBindingCompletionFrame(
    compoundBinding,
    "compound-nnc:embed-result",
    "compound-matrix-constituent",
    { ...secondOrdinaryResult },
  );
assert.equal(copiedAdditionalCompletion.authorizationStatus, "blocked");
assert.equal(
  copiedAdditionalCompletion.blockReason,
  "classical-formation-binding-completion-owner-rejected-result",
);
assert.equal(
  bindingApi.isClassicalNahuatlFormationResultBindingCompletionFrame(
    copiedAdditionalCompletion,
  ),
  true,
);
assert.equal(
  bindingApi.isClassicalNahuatlFormationResultBindingCompletionFrame({
    ...compoundCompletion,
  }),
  false,
);
const copiedBindingCompletion = bindingApi
  .issueClassicalNahuatlFormationResultBindingCompletionFrame(
    { ...compoundBinding },
    "compound-nnc:embed-result",
    "compound-matrix-constituent",
    secondOrdinaryResult,
  );
assert.equal(copiedBindingCompletion.authorizationStatus, "blocked");
assert.equal(
  copiedBindingCompletion.blockReason,
  "classical-formation-binding-completion-frame-required",
);
assert.equal(
  bindingApi.isClassicalNahuatlFormationResultBindingCompletionFrame(
    copiedBindingCompletion,
  ),
  true,
);

for (const operationId of [
  "grammar:nominal-construction",
  "nnc:deverbal-construction",
  "nnc:relational",
]) {
  const copiedInput = { ...ordinaryResult };
  const rejected =
    bindingApi.issueClassicalNahuatlFormationResultBindingFrame(
      operationId,
      copiedInput,
    );
  assert.equal(rejected.authorizationStatus, "blocked");
  assert.equal(rejected.ownerInputAcceptanceProven, false);
  assert.equal(rejected.ownerRejectionProven, true);
  assert.equal(rejected.exactResult, null);
  assert.equal(
    bindingApi.isClassicalNahuatlFormationResultBindingFrame(rejected),
    true,
  );
}

process.stdout.write(
  "[PASS] classical_formation_result_binding: exact routes, state-specific supplements, owner-completed pairs, and copy/wrong-role rejections\n",
);
