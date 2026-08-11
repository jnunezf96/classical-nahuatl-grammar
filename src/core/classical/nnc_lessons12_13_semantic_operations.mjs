// Validation projections for independently owned Lessons 12-13 NNC semantics.
//
// This module owns no Inventory atoms and defines no grammar. It calls the
// already-installed typed NNC operations and retains only values emitted by
// those operations. Recipe identifiers select typed validation coordinates;
// they are not Canvas answers and cannot authorize a result.

const ABSOLUTIVE_RECIPES = Object.freeze({
  "common-tl": Object.freeze(["cihua", Object.freeze({ subject: "1sg", nounClass: "tl", animacy: "animate" })]),
  "common-tli": Object.freeze(["cal", Object.freeze({ subject: "3common", nounClass: "tli", animacy: "nonanimate" })]),
  "common-in": Object.freeze(["mich", Object.freeze({ subject: "3sg", nounClass: "in", animacy: "animate" })]),
  "common-zero": Object.freeze(["chichi", Object.freeze({ subject: "3sg", nounClass: "zero", animacy: "animate" })]),
  "plural-t-in": Object.freeze(["cihua", Object.freeze({ subject: "1pl", nounClass: "tl", animacy: "animate", pluralConnector: "t-in" })]),
  "plural-m-eh": Object.freeze(["cihua", Object.freeze({ subject: "2pl", nounClass: "tl", animacy: "animate", pluralConnector: "m-eh" })]),
  "plural-zero-h": Object.freeze(["cihua", Object.freeze({ subject: "3pl", nounClass: "tl", animacy: "animate", pluralConnector: "0-h" })]),
  "never-possessive": Object.freeze(["tepetl", Object.freeze({ subject: "3common", nounClass: "tl", animacy: "nonanimate", naturalPossessionPolicy: "never-possessive" })]),
});

const POSSESSIVE_RECIPES = Object.freeze({
  "monadic-te": Object.freeze(["pah", Object.freeze({ subject: "3common", possessor: "te", singularConnector: "0" })]),
  "monadic-tla": Object.freeze(["nacaz", Object.freeze({ subject: "3common", possessor: "tla", singularConnector: "0", nounstemRelationKind: "relational", possessorCompatibility: "relational-tla" })]),
  "monadic-ne": Object.freeze(["cal", Object.freeze({ subject: "3sg", possessor: "ne", singularConnector: "0" })]),
  "dyadic-1sg": Object.freeze(["cal", Object.freeze({ subject: "3common", possessor: "1sg", singularConnector: "0" })]),
  "dyadic-1pl": Object.freeze(["cal", Object.freeze({ subject: "3common", possessor: "1pl", singularConnector: "0" })]),
  "dyadic-2sg": Object.freeze(["cal", Object.freeze({ subject: "3common", possessor: "2sg", singularConnector: "0" })]),
  "dyadic-2pl": Object.freeze(["cal", Object.freeze({ subject: "3common", possessor: "2pl", singularConnector: "0" })]),
  "dyadic-3sg": Object.freeze(["cihua", Object.freeze({ subject: "1pl", possessor: "3sg" })]),
  "dyadic-3pl-n": Object.freeze(["cal", Object.freeze({ subject: "3common", possessor: "3pl", thirdPluralPossessorNumberMorph: "n", singularConnector: "0" })]),
  "dyadic-3pl-m": Object.freeze(["ā", Object.freeze({ subject: "3common", possessor: "3pl", thirdPluralPossessorNumberMorph: "m", singularConnector: "uh" })]),
  "connector-hui": Object.freeze(["cal", Object.freeze({ subject: "3common", possessor: "1sg", singularConnector: "hui" })]),
  "connector-uh": Object.freeze(["cihua", Object.freeze({ subject: "3common", possessor: "1sg", singularConnector: "uh" })]),
  "connector-zero": Object.freeze(["cal", Object.freeze({ subject: "3common", possessor: "1sg", singularConnector: "0" })]),
  "plural-hu-an": Object.freeze(["cihua", Object.freeze({ subject: "1pl", possessor: "3sg" })]),
});

function deepFreeze(value, seen = new WeakSet()) {
  if (!value || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const nested of Object.values(value)) deepFreeze(nested, seen);
  return Object.freeze(value);
}

function blocked(recipeId, reason) {
  return deepFreeze({
    kind: "classical-nahuatl-nnc-validation-operation-frame",
    authorizationStatus: "blocked",
    blockReason: reason,
    recipeId: String(recipeId || ""),
  });
}

function projectNncFrame(targetObject, frame, recipeId, expectedState) {
  if (!frame || frame.authorizationStatus !== "authorized") {
    return blocked(recipeId, frame?.blockReason || "canonical-nnc-frame-required");
  }
  const contract = expectedState === "absolutive"
    ? frame.absolutiveParadigmContractFrame
    : frame.possessiveParadigmContractFrame;
  const diagram = targetObject.buildClassicalNahuatlNncDiagrammaticFrame?.(
    frame.nncSlotFrame,
  );
  const subjectShapes = contract?.leastCommonMultiple?.subjectPronounShapeInventory || [];
  const requiredSubjectIdentities = [
    "first-singular", "first-plural", "second-singular",
    "second-plural", "third-singular-or-common", "third-plural",
  ];
  return deepFreeze({
    kind: "classical-nahuatl-nnc-validation-operation-frame",
    authorizationStatus: frame.authorizationStatus,
    blockReason: frame.blockReason || "",
    recipeId,
    state: frame.state,
    subject: frame.subject,
    nounClass: frame.nounClass || "",
    formulaRealization: frame.formulaRealization,
    formulaTemplate: frame.formulaTemplate,
    stateFrame: frame.stateFrame,
    personFrame: frame.personFrame,
    numberFrame: frame.numberFrame,
    predicateSemanticsFrame: frame.predicateSemanticsFrame || null,
    sourceAuthorityFrame: frame.nncSourceAuthorityFrame,
    slotFrame: frame.nncSlotFrame,
    operationEvaluationFrame: frame.operationEvaluationFrame,
    diagramFrame: diagram || null,
    contractGreatestCommonDivisor: contract?.greatestCommonDivisor || null,
    contractDistinctionAxes: contract?.leastCommonMultiple?.distinctionAxes || [],
    contractSubjectInventory: contract?.leastCommonMultiple?.subjectPersonInventory || [],
    contractSubjectPronounShapeInventory:
      subjectShapes,
    contractSubjectParadigmComplete: requiredSubjectIdentities.every(identity =>
      subjectShapes.some(record => record.subjectIdentity === identity)),
    contractSubjectEnglishEquivalents: {
      "first-singular": ["I"],
      "first-plural": ["we"],
      "second-singular": ["you (singular)"],
      "second-plural": ["you (plural)"],
      "third-singular-or-common": ["he", "she", "it", "they"],
      "third-plural": ["they"],
    },
    contractNumberDyadInventory: contract?.leastCommonMultiple?.numberDyadInventory || [],
    contractPossessorStateShapeInventory:
      contract?.leastCommonMultiple?.possessorStateShapeInventory || [],
    contractPossessorShapeIdentitiesByPossessor: Object.fromEntries(
      [...new Set(
        (contract?.leastCommonMultiple?.possessorStateShapeInventory || [])
          .map(record => record.possessor),
      )].map(possessor => [
        possessor,
        (contract?.leastCommonMultiple?.possessorStateShapeInventory || [])
          .filter(record => record.possessor === possessor)
          .map(record => record.identity),
      ]),
    ),
    contractMonadicPossessorShapes:
      (contract?.leastCommonMultiple?.possessorStateShapeInventory || [])
        .filter(record => record.stateArity === "monadic"),
    formulaStringAuthority: frame.nncSlotFrame?.formulaStringAuthority === true,
    typedSlotAuthority: frame.proofFrame?.conclusion?.typedSlotAuthority === true,
  });
}

export function createClassicalNncValidationSemanticOperationsApi(
  targetObject = globalThis,
) {
  const issuedAbsolutiveFrames = new WeakSet();
  const issuedPossessiveFrames = new WeakSet();
  const issuedAmOContrastFrames = new WeakSet();

  function buildClassicalNahuatlAbsolutiveNncValidationFrame(recipeId = "") {
    const recipe = ABSOLUTIVE_RECIPES[String(recipeId || "")];
    if (!recipe
      || typeof targetObject.buildClassicalNahuatlAbsolutiveNncFrame !== "function"
      || typeof targetObject.buildClassicalNahuatlNncDiagrammaticFrame !== "function") {
      return blocked(
        recipeId,
        recipe ? "canonical-absolutive-nnc-operation-required" : "absolutive-validation-recipe-not-recognized",
      );
    }
    const [stem, options] = recipe;
    const projected = projectNncFrame(
      targetObject,
      targetObject.buildClassicalNahuatlAbsolutiveNncFrame(stem, { ...options }),
      String(recipeId),
      "absolutive",
    );
    if (projected.authorizationStatus === "authorized") issuedAbsolutiveFrames.add(projected);
    return projected;
  }

  function isClassicalNahuatlAbsolutiveNncValidationFrame(frame = null) {
    return Boolean(
      frame
      && issuedAbsolutiveFrames.has(frame)
      && frame.kind === "classical-nahuatl-nnc-validation-operation-frame"
      && frame.authorizationStatus === "authorized"
      && frame.state === "absolutive"
      && frame.slotFrame?.resultOperationId === "nnc-absolutive-state"
      && frame.typedSlotAuthority === true,
    );
  }

  function buildClassicalNahuatlPossessiveNncValidationFrame(recipeId = "") {
    const recipe = POSSESSIVE_RECIPES[String(recipeId || "")];
    if (!recipe
      || typeof targetObject.buildClassicalNahuatlPossessiveNncFrame !== "function"
      || typeof targetObject.buildClassicalNahuatlNncDiagrammaticFrame !== "function") {
      return blocked(
        recipeId,
        recipe ? "canonical-possessive-nnc-operation-required" : "possessive-validation-recipe-not-recognized",
      );
    }
    const [stem, options] = recipe;
    const projected = projectNncFrame(
      targetObject,
      targetObject.buildClassicalNahuatlPossessiveNncFrame(stem, { ...options }),
      String(recipeId),
      "possessive",
    );
    if (projected.authorizationStatus === "authorized") issuedPossessiveFrames.add(projected);
    return projected;
  }

  function isClassicalNahuatlPossessiveNncValidationFrame(frame = null) {
    return Boolean(
      frame
      && issuedPossessiveFrames.has(frame)
      && frame.kind === "classical-nahuatl-nnc-validation-operation-frame"
      && frame.authorizationStatus === "authorized"
      && frame.state === "possessive"
      && frame.slotFrame?.resultOperationId === "nnc-possessive-state"
      && frame.typedSlotAuthority === true,
    );
  }

  function buildClassicalNahuatlAmOContrastValidationFrame() {
    if (typeof targetObject.buildClassicalNahuatlPossessiveNncFrame !== "function"
      || typeof targetObject.buildClassicalNahuatlTransitiveVncObjectFrame !== "function") {
      return blocked("am-o-slot-contrast", "canonical-nnc-and-vnc-operations-required");
    }
    const nnc = targetObject.buildClassicalNahuatlPossessiveNncFrame("cal", {
      subject: "3common",
      possessor: "2pl",
      singularConnector: "0",
    });
    const vnc = targetObject.buildClassicalNahuatlTransitiveVncObjectFrame(
      "(itta)",
      {
        transitivity: "transitive",
        subject: "2pl",
        mood: "indicative",
        tense: "present",
        object: "reflexive",
      },
    );
    if (nnc?.authorizationStatus !== "authorized"
      || vnc?.proofFrame?.authorizationStatus !== "authorized") {
      return blocked(
        "am-o-slot-contrast",
        nnc?.blockReason || vnc?.proofFrame?.blockReason || "canonical-am-o-contrast-blocked",
      );
    }
    const frame = deepFreeze({
      kind: "classical-nahuatl-am-o-slot-contrast-validation-frame",
      authorizationStatus: "authorized",
      blockReason: "",
      nncFormulaRealization: nnc.formulaRealization,
      nncSubject: nnc.subject,
      nncPossessor: nnc.stateFrame.possessor,
      nncPossessorSlots: nnc.stateFrame.slots,
      vncFormulaRealization: vnc.formulaRealization,
      vncSubject: vnc.objectFrame.subject,
      vncObjectKind: vnc.objectFrame.objectKind,
      vncObjectSlots: Object.freeze([
        Object.freeze({ role: "va1", carrier: vnc.objectFrame.va1 }),
        Object.freeze({ role: "va2", carrier: vnc.objectFrame.va2 }),
      ]),
      formulaStringAuthority: false,
    });
    issuedAmOContrastFrames.add(frame);
    return frame;
  }

  function isClassicalNahuatlAmOContrastValidationFrame(frame = null) {
    return Boolean(
      frame
      && issuedAmOContrastFrames.has(frame)
      && frame.kind === "classical-nahuatl-am-o-slot-contrast-validation-frame"
      && frame.authorizationStatus === "authorized"
      && frame.nncPossessor === "2pl"
      && frame.vncObjectKind === "mainline-reflexive",
    );
  }

  return Object.freeze({
    buildClassicalNahuatlAbsolutiveNncValidationFrame,
    isClassicalNahuatlAbsolutiveNncValidationFrame,
    buildClassicalNahuatlPossessiveNncValidationFrame,
    isClassicalNahuatlPossessiveNncValidationFrame,
    buildClassicalNahuatlAmOContrastValidationFrame,
    isClassicalNahuatlAmOContrastValidationFrame,
  });
}
