// Non-authorizing validation projection over the canonical object-relationship
// runtime. It owns no grammar and accepts no Canvas, atom, lesson, or UI value
// as an operation input.

function deepFreeze(value, seen = new WeakSet()) {
  if (!value || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const nested of Object.values(value)) deepFreeze(nested, seen);
  return Object.freeze(value);
}

function compact(frame = {}) {
  return {
    authorizationStatus: frame.authorizationStatus || "blocked",
    blockReason: frame.blockReason || "",
    stem: frame.stem || "",
    valence: frame.valence || "",
    ichtequiValenceRestrictionApplies:
      frame.ichtequiValenceRestrictionApplies === true,
    ichtequiAllowedProjectiveValences: [
      ...(frame.ichtequiAllowedProjectiveValences || []),
    ],
    ichtequiBlockedProjectiveValences: [
      ...(frame.ichtequiBlockedProjectiveValences || []),
    ],
    ichtequiNonspecificObjectBlocked:
      frame.ichtequiNonspecificObjectBlocked === true,
    lexicalValenceRuleId: frame.lexicalValenceRuleId || "",
    ruleAtomIds: (frame.ruleRefs || [])
      .map(rule => rule.atomId || "")
      .filter(Boolean),
    grammarGenerationAllowed: frame.grammarGenerationAllowed === true,
    surfaceGenerationAllowed: frame.surfaceGenerationAllowed === true,
  };
}

function buildProjection(runtime) {
  const relationships = Object.fromEntries([
    "intransitive",
    "specific-projective",
    "projective-human",
    "projective-nonhuman",
  ].map(valence => [
    valence,
    compact(runtime.buildClassicalNahuatlObjectRelationshipRuleFrame(
      "ich-tequi",
      { valence },
    )),
  ]));
  const requiredRuleId = "cn-l18-188-note1-ichtequi-specific-object-only";
  const sharedExactFacts = Object.values(relationships).every(frame => (
    frame.ichtequiValenceRestrictionApplies === true
    && frame.lexicalValenceRuleId === requiredRuleId
    && frame.grammarGenerationAllowed === false
    && frame.surfaceGenerationAllowed === false
  ));
  const exactAllowed = ["intransitive", "specific-projective"].every(
    valence => relationships[valence].authorizationStatus === "authorized"
      && relationships[valence].blockReason === ""
      && relationships[valence].ichtequiNonspecificObjectBlocked === false,
  );
  const exactBlocked = ["projective-human", "projective-nonhuman"].every(
    valence => relationships[valence].authorizationStatus === "blocked"
      && relationships[valence].blockReason
        === "ich-tequi-nonspecific-object-not-authorized"
      && relationships[valence].ichtequiNonspecificObjectBlocked === true,
  );
  const exactValenceSets = Object.values(relationships).every(frame => (
    JSON.stringify(frame.ichtequiAllowedProjectiveValences)
      === JSON.stringify(["intransitive", "specific-projective"])
    && JSON.stringify(frame.ichtequiBlockedProjectiveValences)
      === JSON.stringify(["projective-human", "projective-nonhuman"])
  ));
  const authorized = sharedExactFacts && exactAllowed && exactBlocked
    && exactValenceSets;

  return deepFreeze({
    kind: "classical-nahuatl-object-relationship-validation-frame",
    authorizationStatus: authorized ? "authorized" : "blocked",
    blockReason: authorized
      ? "" : "classical-object-relationship-validation-coordinate-blocked",
    typedFrameAuthority: true,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    storedExampleAuthority: false,
    curriculumMetadataAuthority: false,
    relationships,
    constraints: {
      ichtequiSpecificObjectOnly: {
        authorizationStatus: authorized ? "authorized" : "blocked",
        ruleId: requiredRuleId,
        allowedValences: ["intransitive", "specific-projective"],
        blockedValences: ["projective-human", "projective-nonhuman"],
        blockedReason: "ich-tequi-nonspecific-object-not-authorized",
      },
    },
  });
}

export function createClassicalObjectRelationshipValidationSemanticOperationsApi(
  targetObject = globalThis,
) {
  const issuedFrames = new WeakSet();
  let cachedProjection = null;

  function buildClassicalNahuatlObjectRelationshipValidationFrame() {
    if (!cachedProjection) {
      cachedProjection = buildProjection(targetObject);
      if (cachedProjection.authorizationStatus === "authorized") {
        issuedFrames.add(cachedProjection);
      }
    }
    return cachedProjection;
  }

  function isClassicalNahuatlObjectRelationshipValidationFrame(frame = null) {
    return Boolean(
      frame
      && issuedFrames.has(frame)
      && frame.kind
        === "classical-nahuatl-object-relationship-validation-frame"
      && frame.authorizationStatus === "authorized"
      && frame.typedFrameAuthority === true
      && frame.formulaStringAuthority === false
      && frame.surfaceStringAuthority === false
      && frame.storedExampleAuthority === false
      && frame.curriculumMetadataAuthority === false
      && Object.isFrozen(frame)
    );
  }

  return Object.freeze({
    buildClassicalNahuatlObjectRelationshipValidationFrame,
    isClassicalNahuatlObjectRelationshipValidationFrame,
  });
}
