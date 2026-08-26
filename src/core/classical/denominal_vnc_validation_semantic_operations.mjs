// Non-authorizing live validation projection for canonical denominal-VNC
// semantics. Owner identity and atom proof remain in isolated owner specs;
// this module only shares typed request construction and hostile checks.

import {
  CLASSICAL_NAHUATL_DENOMINAL_VNC_LCM,
} from "./denominal_vnc_grammar.mjs?v=20260825-capability-closure-333";

const ISSUED_VALIDATION_FRAMES = new WeakSet();

function applicationRejected(value) {
  return value == null || value.authorizationStatus === "blocked";
}

function deepFreeze(value, seen = new WeakSet()) {
  if (!value || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor && Object.prototype.hasOwnProperty.call(descriptor, "value")) {
      deepFreeze(descriptor.value, seen);
    }
  }
  return Object.freeze(value);
}

function assertRuntime(target, name) {
  if (typeof target?.[name] !== "function") {
    throw new Error(`denominal-vnc-validation-capability-required:${name}`);
  }
}

function base(overrides = {}) {
  return {
    nounStem: "tlīl",
    sourceKind: "nounstem",
    sourceState: "absolutive",
    subject: "3sg",
    mood: "indicative",
    tense: "present",
    objectPeople: ["3sg", "2sg"],
    outputScope: "single",
    ...overrides,
  };
}

const ROOT_REQUESTS = deepFreeze({
  "inceptive-ti": {
    default: { nounStem: "tlīl" },
    "vowel-source": { nounStem: "ā", classChoice: "A" },
  },
  "inceptive-hui": {
    default: { nounStem: "ix", sourceInitialISelection: "real" },
    "vowel-source": { nounStem: "xo-xō" },
  },
  "inceptive-root-ya": {
    default: { nounStem: "chichi", nounRoot: "chichi", sourceKind: "nounroot-or-stem-as-root", classChoice: "B" },
    "class-a": { nounStem: "hui", nounRoot: "hui", sourceKind: "nounroot-or-stem-as-root", classChoice: "A" },
    applicative: { nounStem: "ce", nounRoot: "ce", sourceKind: "nounroot-or-stem-as-root", classChoice: "B" },
  },
  "destockal-ya": {
    default: { nounStem: "", sourceVerbStem: "yam-ā-ni", sourceKind: "destockal-ni-hui-vnc", sourceState: "derived" },
  },
  "inceptive-a": {
    default: { nounStem: "tlāhui" },
  },
  "deverbal-yo-hua": {
    default: { nounStem: "tōcā-yō", sourceKind: "deverbal-yo-nounstem" },
  },
  "included-possessor-ti": {
    default: { nounStem: "ix-xip-tla", sourceKind: "possessive-nnc-predicate", sourceState: "possessive", possessor: "3sg", includedPossessorFamily: "proxy", sourceInitialISelection: "real" },
    proxy: { nounStem: "ix-xip-tla", sourceKind: "possessive-nnc-predicate", sourceState: "possessive", possessor: "3sg", includedPossessorFamily: "proxy", sourceInitialISelection: "real" },
    recompense: { nounStem: "icn-ō-pil", sourceKind: "possessive-nnc-predicate", sourceState: "possessive", possessor: "1sg", includedPossessorFamily: "recompense", tense: "preterit", exclamatory: true },
    misfortune: { nounStem: "tlahu-ēl-i-l", sourceKind: "possessive-nnc-predicate", sourceState: "possessive", possessor: "1sg", includedPossessorFamily: "misfortune", tense: "preterit", exclamatory: true },
    temporal: { nounStem: "pan", sourceKind: "possessive-nnc-predicate", sourceState: "possessive", possessor: "3sg", includedPossessorFamily: "temporal-pan", sourceInitialISelection: "real" },
  },
  "possession-ti": {
    default: { nounStem: "pah" },
    cuica: { nounStem: "cuica", classChoice: "A" },
  },
  "destockal-a-causative": {
    default: { nounStem: "", sourceVerbStem: "yam-ā-ni", sourceKind: "destockal-ni-hui-vnc", sourceState: "derived" },
  },
  "ti-a-causative-double-inceptive": {
    default: { nounStem: "āxcā", sourceKind: "possessive-nnc-predicate", sourceState: "possessive", sourceSubject: "2sg", possessor: "1sg" },
  },
  "ti-a-causative-double-possession": {
    default: { nounStem: "cal", sourceKind: "possessive-nnc-predicate", sourceState: "possessive", sourceSubject: "2sg", possessor: "1sg" },
  },
  "patientive-chain-ti-a": {
    default: { nounStem: "", sourceVerbStem: "il-o-ā", sourceKind: "lexical-o-a-vnc", sourceState: "derived", sourceInitialISelection: "real" },
  },
  "temporal-tia": {
    default: { nounStem: "ōn-xihui", sourceKind: "temporal-compound-nounstem" },
  },
  "denominal-causative-tla": {
    default: { nounStem: "mahui-z" },
  },
  "intransitive-tla": {
    default: { nounStem: "tla" },
  },
  "intransitive-o-a-use": {
    default: { nounStem: "āyacach" },
    hypothetical: { nounStem: "tepon-āz" },
  },
  "intransitive-o-a-produce": {
    default: { nounStem: "tamal" },
  },
  "applicative-huia-use": {
    default: { nounStem: "izta", sourceInitialISelection: "real" },
    instrumental: { nounStem: "tepon-āz" },
  },
  "applicative-huia-produce": {
    default: { nounStem: "cē-hua-l" },
  },
  "applicative-huia-double-object": {
    default: { nounStem: "cuitla", sourceKind: "possessive-nnc-predicate", sourceState: "possessive", sourceSubject: "2sg", possessor: "1sg" },
  },
  "adverbial-huia": {
    default: { nounStem: "ilihuiz", sourceKind: "adverbial-nounstem", sourceInitialISelection: "real" },
  },
  "relational-o-a-transitive": {
    default: { nounStem: "quech-pan", sourceKind: "relational-compound-or-predicate" },
  },
  "relational-o-a-intransitive": {
    default: { nounStem: "tequi-pan", sourceKind: "relational-compound-or-predicate" },
  },
  "relational-huia": {
    default: { nounStem: "icxi-pan", sourceKind: "relational-compound-or-predicate", sourceInitialISelection: "real" },
  },
  "denominal-i-hui": {
    default: { nounStem: "tlīl" },
  },
  "denominal-a-hui": {
    default: { nounStem: "pil-i-ch" },
  },
  "transitive-i-a": {
    default: { nounStem: "tlāl", sourceKind: "nounstem-plus-stock-i" },
    "w-final": { nounStem: "tlahu-ēl", sourceKind: "nounstem-plus-stock-i" },
  },
});

const CONTINUATIONS = deepFreeze({
  "inceptive-ti-ya": { prior: "inceptive-ti", classChoice: "A" },
  "inceptive-hui-ya": { prior: "inceptive-hui" },
  "ti-hui-lia-causative": { prior: "inceptive-ti" },
  "ya-lia-causative": { prior: "inceptive-root-ya" },
  "ya-lia-applicative": { prior: "inceptive-root-ya", priorVariant: "applicative" },
  "ti-a-causative-single": { prior: "possession-ti" },
  "ti-ia-applicative": { prior: "possession-ti", priorVariant: "cuica" },
  "causative-tla-ti-lia-applicative": { prior: "denominal-causative-tla" },
  "intransitive-tla-ti-a-causative": { prior: "intransitive-tla" },
  "intransitive-tla-ti-lia-applicative": { prior: "intransitive-tla" },
  "o-a-to-i-l-huia": { prior: "intransitive-o-a-use", priorVariant: "hypothetical" },
  "i-hui-to-o-a": { prior: "denominal-i-hui" },
  "a-hui-to-o-a": { prior: "denominal-a-hui" },
});

export function createClassicalDenominalVncValidationSemanticOperationsApi(
  targetObject = globalThis,
) {
  const target = targetObject && typeof targetObject === "object"
    ? targetObject : globalThis;

  function requestForOperation(operationId, variant = "default") {
    if (operationId === "ti-a-causative-single" && variant === "inceptive-source") {
      return base({
        ...ROOT_REQUESTS["inceptive-ti"].default,
        operationId,
        operationPath: ["inceptive-ti", operationId],
      });
    }
    if (operationId === "ti-a-causative-single" && variant === "included-temporal") {
      return base({
        ...ROOT_REQUESTS["included-possessor-ti"].temporal,
        operationId,
        operationPath: ["included-possessor-ti", operationId],
      });
    }
    const continuation = CONTINUATIONS[operationId];
    if (continuation) {
      const priorVariant = continuation.priorVariant || variant;
      const priorSource = ROOT_REQUESTS[continuation.prior]?.[priorVariant]
        || ROOT_REQUESTS[continuation.prior]?.default;
      if (!priorSource) {
        throw new Error(`denominal-vnc-validation-prior-request-required:${operationId}:${priorVariant}`);
      }
      return base({
        ...priorSource,
        operationId,
        operationPath: [continuation.prior, operationId],
        classChoice: continuation.classChoice || priorSource.classChoice || "",
        classChoices: {
          ...(priorSource.classChoice
            ? { [continuation.prior]: priorSource.classChoice }
            : {}),
          ...(continuation.classChoice
            ? { [operationId]: continuation.classChoice }
            : {}),
        },
      });
    }
    const variants = ROOT_REQUESTS[operationId];
    const source = variants?.[variant] || variants?.default;
    if (!source) {
      throw new Error(`denominal-vnc-validation-operation-request-required:${operationId}:${variant}`);
    }
    return base({ ...source, operationId });
  }

  function buildClassicalDenominalVncValidationFrame(
    profileId = "denominal-domain",
    operationId = "inceptive-ti",
    variant = "default",
  ) {
    for (const capability of [
      "requestClassicalDenominalVncResult",
      "prepareClassicalDenominalVncParadigmPlan",
      "projectClassicalDenominalVncParadigmCoordinates",
      "executeClassicalGrammarApplicationRequest",
      "isClassicalNahuatlDenominalVncResultFrame",
    ]) assertRuntime(target, capability);
    const request = requestForOperation(operationId, variant);
    const canonical = target.requestClassicalDenominalVncResult(request);
    if (!target.isClassicalNahuatlDenominalVncResultFrame(canonical)) {
      throw new Error(`denominal-vnc-validation-canonical-result-required:${profileId}:${operationId}:${canonical?.blockReason || "unknown"}`);
    }

    const plan = target.prepareClassicalDenominalVncParadigmPlan({
      ...request,
      outputScope: "paradigm",
    });
    const [coordinate] = target.projectClassicalDenominalVncParadigmCoordinates(
      plan,
      [{ subject: request.subject, mood: request.mood, tense: request.tense }],
    );
    let rawStoredAuthorityBlocked = false;
    try {
      const rawStored = target.requestClassicalDenominalVncResult({
        ...request,
        formula: "#stored-answer-cannot-authorize#",
      });
      rawStoredAuthorityBlocked = rawStored?.authorizationStatus === "blocked";
    } catch (error) {
      rawStoredAuthorityBlocked = String(error?.message || error)
        .includes("forbidden-authority:formula");
    }
    const copiedPlan = Object.freeze({
      kind: plan?.kind,
      version: plan?.version,
      authorizationStatus: plan?.authorizationStatus,
    });
    const copiedPlanReceipt = target.executeClassicalGrammarApplicationRequest({
      operationId: "vnc:denominal",
      outputKind: "coordinate-projection",
      args: [copiedPlan, [{ subject: request.subject, mood: request.mood, tense: request.tense }]],
    });
    const unsupported = target.requestClassicalDenominalVncResult(base({
      nounStem: "arbitrary",
      operationId: "inceptive-a",
    }));
    const categoryOnly = target.requestClassicalDenominalVncResult(base({
      ...ROOT_REQUESTS["intransitive-o-a-produce"].default,
      operationId: "o-a-to-a-l-huia",
      operationPath: ["intransitive-o-a-produce", "o-a-to-a-l-huia"],
    }));
    const possessionTiYa = target.requestClassicalDenominalVncResult(base({
      ...ROOT_REQUESTS["possession-ti"].default,
      operationId: "inceptive-ti-ya",
      operationPath: ["possession-ti", "inceptive-ti-ya"],
      classChoice: "A",
    }));
    const operationInventory = CLASSICAL_NAHUATL_DENOMINAL_VNC_LCM;
    const frame = deepFreeze({
      kind: "classical-denominal-vnc-validation-frame",
      version: 1,
      authorizationStatus: "authorized",
      profileId,
      result: {
        canonicalResult: true,
        operationId: canonical.operationFrame.operationId,
        targetStem: canonical.operationFrame.targetStem,
        targetClass: canonical.operationFrame.targetClass,
        objectCount: canonical.operationFrame.objectCount,
        sourceKind: canonical.sourceFrame.sourceKind,
        sourceState: canonical.sourceFrame.sourceState,
        formulaRealization: canonical.formulaRealization,
        surfaceRealization: canonical.surfaceRealization,
      },
      analysis: {
        semanticBoundary: profileId,
        typedDenominalExecutionRequired: true,
        operationInventoryCount: operationInventory?.operations?.length || 0,
        operationAxisCount: operationInventory?.axes?.length || 0,
        attestedOperationCount: operationInventory?.attestedRouteCount || 0,
        categoryOnlyOperationCount: operationInventory?.categoryOnlyRouteCount || 0,
        rawStoredAuthorityBlocked,
        copiedPreparedPlanBlocked: copiedPlanReceipt?.authorizationStatus === "blocked",
        unsupportedProductiveGuessBlocked: applicationRejected(unsupported),
        categoryOnlyRouteBlocked: applicationRejected(categoryOnly),
        possessionTiYaBlocked: applicationRejected(possessionTiYa),
        scalarParadigmEquivalent: coordinate?.authorizationStatus === "authorized"
          && coordinate.formulaRealization === canonical.formulaRealization
          && coordinate.surfaceRealization === canonical.surfaceRealization,
        storedExampleAuthority: false,
        translationAuthority: false,
        traditionalSpellingAuthority: false,
        curriculumCoordinateAuthority: false,
        sharedProjectionOwnsGrammar: false,
        sharedProjectionOwnsAtoms: false,
        separateOwnerProofRequired: true,
      },
    });
    ISSUED_VALIDATION_FRAMES.add(frame);
    return frame;
  }

  function isClassicalDenominalVncValidationFrame(frame = null) {
    return Boolean(
      frame
      && ISSUED_VALIDATION_FRAMES.has(frame)
      && frame.kind === "classical-denominal-vnc-validation-frame"
      && frame.version === 1
      && frame.authorizationStatus === "authorized"
      && frame.result?.canonicalResult === true
      && frame.analysis?.rawStoredAuthorityBlocked === true
      && frame.analysis?.copiedPreparedPlanBlocked === true
      && frame.analysis?.scalarParadigmEquivalent === true
      && frame.analysis?.sharedProjectionOwnsGrammar === false
      && frame.analysis?.separateOwnerProofRequired === true
      && Object.isFrozen(frame)
    );
  }

  return Object.freeze({
    buildClassicalDenominalVncValidationFrame,
    isClassicalDenominalVncValidationFrame,
  });
}

export function installClassicalDenominalVncValidationSemanticOperationsGlobals(
  targetObject = globalThis,
) {
  const api = createClassicalDenominalVncValidationSemanticOperationsApi(targetObject);
  Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
  return api;
}
