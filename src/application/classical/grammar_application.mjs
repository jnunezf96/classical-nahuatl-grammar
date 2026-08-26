// Canonical application boundary for Classical Nahuatl grammar projections.
//
// The renderer supplies genuine selections and already-issued grammar frames.
// This boundary resolves required engine capabilities and returns their canonical
// results. It never reconstructs a formula, surface, lesson answer, or fallback.

import {
  hasClassicalGrammarReadOnlyArtifactDeclaration,
  isClassicalGrammarReadOnlyAuthorityDeclaration,
  isForbiddenClassicalGrammarAuthorityKey,
  validateClassicalGrammarFoundationRoute,
  validateClassicalGrammarLanguageIdentity,
} from "../../core/concepts/classical_grammar_foundation.mjs?v=20260811-lesson1-multigroup-024";
import {
  buildClassicalGrammaticalRhymeCalibrationFrame,
  buildClassicalGrammaticalRhymeEvaluationOrderFrame,
  buildClassicalGrammaticalRhymeFullPinFrame,
  buildClassicalGrammaticalRhymeOwnerCalibrationFrame,
  buildClassicalGrammaticalRhymeRoutePlaneFrame,
  buildClassicalGrammaticalRhymeTopologyFrame,
} from "../../core/grammar/grammatical_rhyme_space.mjs?v=20260825-mobile-select-335";
import {
  CLASSICAL_LESSONS_1_58_RHYME_DISCOVERY,
} from "../../core/grammar/classical_lessons_1_58_rhyme_map.mjs?v=20260825-mobile-select-335";

const REQUIRED_CAPABILITY_DIAGNOSTIC = "classical-grammar-application-required-capability-missing";
const APPLICATION_REQUEST_DIAGNOSTIC = "classical-grammar-application-request-invalid";
const APPLICATION_RESULT_DIAGNOSTIC = "classical-grammar-application-result-invalid";
const APPLICATION_RESULT_KIND = "classical-grammar-application-result";
const APPLICATION_RESULT_CAPTURE_KIND = "classical-grammar-application-result-capture";
const RHYME_OWNER_PROOF_OBSERVATION_KIND =
  "classical-grammar-application-rhyme-owner-proof-observation";
const APPLICATION_LAYER_GRAPH_KIND =
  "classical-grammar-application-layer-graph";
const APPLICATION_ATLAS_OBSERVATION_KIND =
  "classical-grammar-application-atlas-observation";
const APPLICATION_CAPABILITY_NAVIGATOR_KIND =
  "classical-grammar-application-capability-navigator";
const APPLICATION_TYPED_SOURCE_CAPABILITY_NAVIGATOR_KIND =
  "classical-grammar-application-typed-source-capability-navigator";
const APPLICATION_TYPED_SOURCE_OPERATION_BINDING_KIND =
  "classical-grammar-typed-source-operation-binding-frame";
const APPLICATION_CANONICAL_NNC_TYPED_SOURCE_OWNER_BINDING_KIND =
  "classical-grammar-canonical-nnc-typed-source-owner-binding-frame";
const APPLICATION_CANONICAL_PARTICLE_ROOT_OWNER_BINDING_KIND =
  "classical-grammar-canonical-particle-root-owner-binding-frame";
const CLASSICAL_VISIBLE_SURFACE_DIAGNOSTIC = "classical-visible-surface-orthography-invalid";
const CANONICAL_RUNTIME_DIAGNOSTIC =
  "classical-grammar-application-canonical-runtime-required";
const CANONICAL_CAPABILITY_IDENTITY_DIAGNOSTIC =
  "classical-grammar-application-canonical-capability-identity-invalid";
const CANONICAL_APPLICATION_APIS = new WeakSet();
const CANONICAL_APPLICATION_STATE_BY_TARGET = new WeakMap();
const CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS = Object.freeze({
  scalar: "scalar",
  sourcePreparation: "source-preparation",
  preparedPlan: "prepared-plan",
  coordinateProjection: "coordinate-projection",
  sentenceOperation: "sentence-operation",
});
const DEFAULT_APPLICATION_OUTPUT_KIND =
  CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.scalar;
const CLASSICAL_VISIBLE_SURFACE_KEYS = Object.freeze(new Set([
  "surface",
  "surfaceForms",
  "surfaceRealization",
  "surfaceDisplay",
  "canonicalSurface",
  "displaySurface",
  "finiteSurface",
  "outputForm",
  "outputSpelling",
  "printedSurface",
  "realizedSolidStem",
  "resultSurface",
  "wordSurface",
  "wordRealization",
  "sentenceSurface",
  "sentenceRealization",
  "sentenceSurfaceDisplay",
]));
const CLASSICAL_FORBIDDEN_VISIBLE_GRAPHEME_PATTERN = /[wk]/iu;
const CLASSICAL_LESSON2_WRITING_FAMILY_IDS = Object.freeze([
  "sound-and-spelling",
  "internal-stem-boundaries",
  "syllables-and-supportive-i",
  "stress",
  "long-consonants",
  "progressive-assimilation",
  "regressive-assimilation-and-dissimilation",
  "consonant-loss",
  "other-consonant-changes",
  "vowel-elision",
  "long-vowel-to-glottal-stop",
  "sentence-prosody",
]);

const GCD_INVARIANT_IDS = Object.freeze([
  "canonical-runtime-installation",
  "typed-application-request",
  "semantic-operation-identity",
  "required-capability-resolution",
  "canonical-capability-identity",
  "canonical-engine-result",
  "no-renderer-fallback",
  "lesson-and-display-authority-forbidden",
  "classical-visible-surface-firewall",
  "lesson2-writing-pass",
]);

function getClassicalVisibleSurfaceViolation(
  value,
  path = "$",
  seen = new Set(),
  visibleSurfaceCollection = false,
) {
  if (
    visibleSurfaceCollection
    && typeof value === "string"
    && CLASSICAL_FORBIDDEN_VISIBLE_GRAPHEME_PATTERN.test(value)
  ) {
    return path;
  }
  if (!value || typeof value !== "object" || seen.has(value)) {
    return "";
  }
  seen.add(value);
  if (Array.isArray(value)) {
    for (let index = 0; index < value.length; index += 1) {
      const violation = getClassicalVisibleSurfaceViolation(
        value[index],
        `${path}[${index}]`,
        seen,
        visibleSurfaceCollection,
      );
      if (violation) return violation;
    }
    return "";
  }
  for (const [key, child] of Object.entries(value)) {
    const childPath = `${path}.${key}`;
    const childIsVisibleSurface = visibleSurfaceCollection
      || CLASSICAL_VISIBLE_SURFACE_KEYS.has(key);
    const violation = getClassicalVisibleSurfaceViolation(
      child,
      childPath,
      seen,
      childIsVisibleSurface,
    );
    if (violation) return violation;
  }
  return "";
}

function assertClassicalVisibleSurfaceResult(value) {
  const violation = getClassicalVisibleSurfaceViolation(value);
  if (violation) {
    throw new Error(`${CLASSICAL_VISIBLE_SURFACE_DIAGNOSTIC}:${violation}`);
  }
  return value;
}

function getClassicalVisibleSurfacePaths(
  value,
  path = "$",
  seen = new Set(),
  visibleSurfaceCollection = false,
  paths = [],
) {
  if (visibleSurfaceCollection && typeof value === "string") {
    paths.push(path);
    return paths;
  }
  if (!value || typeof value !== "object" || seen.has(value)) return paths;
  seen.add(value);
  if (Array.isArray(value)) {
    value.forEach((child, index) => getClassicalVisibleSurfacePaths(
      child,
      `${path}[${index}]`,
      seen,
      visibleSurfaceCollection,
      paths,
    ));
    return paths;
  }
  Object.entries(value).forEach(([key, child]) => {
    getClassicalVisibleSurfacePaths(
      child,
      `${path}.${key}`,
      seen,
      visibleSurfaceCollection || CLASSICAL_VISIBLE_SURFACE_KEYS.has(key),
      paths,
    );
  });
  return paths;
}

function buildClassicalLesson2WritingPass(
  writingOutputs = [],
) {
  const outputs = Array.isArray(writingOutputs) ? writingOutputs : [];
  const required = outputs.length > 0;
  const owned = required && outputs.every(output => (
    output?.authorizationStatus === "authorized"
    && (
      output.mode === "lesson2-direct-rule-owner"
      || output.mode === "lesson2-writer"
        && output.writtenResult?.writtenByLesson2 === true
        && output.writtenResult?.surface === output.surface
    )
  ));
  const familyPasses = Object.freeze(
    CLASSICAL_LESSON2_WRITING_FAMILY_IDS.map(familyId => Object.freeze({
      familyId,
      entered: owned,
      status: !required
        ? "not-required"
        : owned
          ? "entered-through-lesson2-writing-pipeline"
          : "lesson2-writing-owner-missing",
    })),
  );
  return Object.freeze({
    kind: "classical-nahuatl-lesson2-writing-pass",
    version: 1,
    required,
    entered: owned,
    writtenResultCount: outputs.length,
    familyRoutingIds: CLASSICAL_LESSON2_WRITING_FAMILY_IDS,
    familyPasses,
    allTwelveFamiliesRouted: required && familyPasses.every(pass => pass.entered),
    completionStatus: required
      ? owned
        ? "lesson2-application-writing-complete"
        : "lesson2-writing-owner-missing"
      : "not-a-writing-result",
    writingOwnerInstalled: owned,
    changesGrammarAuthority: false,
    lessonMetadataAuthority: false,
    storedWritingAuthority: false,
  });
}

function getClassicalLesson2PrimaryWritingOutputs(
  candidateResult = null,
  outputKind = DEFAULT_APPLICATION_OUTPUT_KIND,
) {
  if (
    candidateResult == null
    || outputKind === CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.sourcePreparation
    || outputKind === CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.preparedPlan
  ) return [];
  if (Array.isArray(candidateResult)) {
    return candidateResult.flatMap(item => (
      getClassicalLesson2PrimaryWritingOutputs(item, DEFAULT_APPLICATION_OUTPUT_KIND)
    ));
  }
  if (typeof candidateResult !== "object") return [];
  const outputs = [];
  const add = (surface, role = "word") => {
    const normalized = String(surface == null ? "" : surface).trim();
    if (
      normalized
      && !outputs.some(output => (
        output.surface === normalized && output.role === role
      ))
    ) outputs.push(Object.freeze({ surface: normalized, role }));
  };
  if (Array.isArray(candidateResult.surfaceForms)) {
    candidateResult.surfaceForms.forEach(surface => add(
      surface,
      /\s|[.!?]$/u.test(String(surface || "")) ? "sequence" : "word",
    ));
  }
  add(candidateResult.wordSurface, /\s|[.!?]$/u.test(
    String(candidateResult.wordSurface || ""),
  ) ? "sequence" : "word");
  add(candidateResult.surfaceRealization, /\s|[.!?]$/u.test(
    String(candidateResult.surfaceRealization || ""),
  ) ? "sequence" : "word");
  add(candidateResult.surface, /\s|[.!?]$/u.test(
    String(candidateResult.surface || ""),
  ) ? "sequence" : "word");
  add(candidateResult.written, "word");
  if (!outputs.length) {
    add(candidateResult.outputForm || candidateResult.outputSpelling, "word");
  }
  if (!outputs.length) {
    add(candidateResult.resultFrame?.surfaceRealization, "word");
  }
  if (!outputs.length && candidateResult.personalNameResult) {
    add(candidateResult.personalNameResult.surfaceRealization, "word");
  }
  add(candidateResult.sentenceSurface, "sentence");
  add(candidateResult.sentenceSurfaceDisplay, "sentence");
  return outputs;
}

function getClassicalLesson2NonzeroPart(role, value, extra = {}) {
  const normalized = String(value == null ? "" : value).trim();
  return !normalized || ["0", "Ø", "⎕"].includes(normalized)
    ? null
    : { role, value: normalized, ...extra };
}

function getClassicalLesson2NncParts(slots = {}) {
  const participantParts = Array.isArray(slots.participant?.slots)
    ? slots.participant.slots.map((slot, index) => (
      getClassicalLesson2NonzeroPart(
        slot?.role || `participant-${index + 1}`,
        slot?.carrier,
      )
    )).filter(Boolean)
    : [];
  const stateParts = Array.isArray(slots.state?.slots)
    ? slots.state.slots.map((slot, index) => (
      getClassicalLesson2NonzeroPart(
        slot?.role || `state-${index + 1}`,
        slot?.carrier,
      )
    )).filter(Boolean)
    : [];
  const prePredicateParts = Array.isArray(slots.prePredicate)
    ? slots.prePredicate.map((slot, index) => (
      getClassicalLesson2NonzeroPart(
        slot?.role || `pre-predicate-${index + 1}`,
        slot?.carrier,
      )
    )).filter(Boolean)
    : [];
  const predicateParts = String(slots.predicate?.stem || "")
    .split("-")
    .filter(Boolean)
    .map((value, index) => getClassicalLesson2NonzeroPart(
      index ? `nounstem-part-${index + 1}` : "nounstem",
      value,
    ))
    .filter(Boolean);
  return [
    getClassicalLesson2NonzeroPart(
      "subject-person-1",
      slots.subject?.pers1BaseMorph || slots.subject?.pers1,
      {
        supportiveI: slots.subject?.supportiveISurfaceAction === "insert"
          ? "insert-before-consonant"
          : "",
      },
    ),
    getClassicalLesson2NonzeroPart("subject-person-2", slots.subject?.pers2),
    ...participantParts,
    ...stateParts,
    ...prePredicateParts,
    ...predicateParts,
    getClassicalLesson2NonzeroPart("subject-number-1", slots.number?.num1),
    getClassicalLesson2NonzeroPart("subject-number-2", slots.number?.num2),
  ].filter(Boolean);
}

function findClassicalLesson2Frames(value, predicate, seen = new Set(), found = []) {
  if (!value || typeof value !== "object" || seen.has(value)) return found;
  seen.add(value);
  if (predicate(value)) found.push(value);
  if (Array.isArray(value)) {
    value.forEach(child => findClassicalLesson2Frames(
      child,
      predicate,
      seen,
      found,
    ));
  } else {
    Object.values(value).forEach(child => findClassicalLesson2Frames(
      child,
      predicate,
      seen,
      found,
    ));
  }
  return found;
}

function buildClassicalLesson2TokenWriting(surface = "", targetObject = globalThis) {
  const terminalMatch = String(surface).match(/([.!?])$/u);
  const terminal = terminalMatch?.[1] || "";
  const body = terminal ? String(surface).slice(0, -1) : String(surface);
  const tokens = body.match(/[^\s,;:]+|[,;:]\s*|\s+/gu) || [];
  const parts = [];
  for (const token of tokens) {
    if (/^[\s,;:]+$/u.test(token)) {
      if (!parts.length) return null;
      const separator = token.includes(",")
        ? ", "
        : token.includes(";")
          ? "; "
          : token.includes(":")
            ? ": "
            : " ";
      parts[parts.length - 1].joinAfter = separator;
    } else {
      parts.push({ role: "written-vocable", value: token, joinAfter: "" });
    }
  }
  if (!parts.length) return null;
  const source = targetObject.issueClassicalNahuatlLesson2WritingSource({
    parts,
    boundaryKind: "sentence-and-vocable-sequence",
    terminal,
  });
  const result = targetObject.writeClassicalNahuatlLesson2Result(source);
  return targetObject.isClassicalNahuatlLesson2WrittenResult(result)
    && result.surface === surface
    ? result
    : null;
}

function buildClassicalLesson2WritingFromParts(
  parts,
  boundaryKind,
  expectedSurface,
  targetObject,
) {
  if (!Array.isArray(parts) || !parts.length) return null;
  const source = targetObject.issueClassicalNahuatlLesson2WritingSource({
    parts,
    boundaryKind,
  });
  const result = targetObject.writeClassicalNahuatlLesson2Result(source);
  return targetObject.isClassicalNahuatlLesson2WrittenResult(result)
    && result.surface === expectedSurface
    ? result
    : null;
}

function buildClassicalLesson2OwnedWriting(
  candidateResult = null,
  expectedOutput = null,
  targetObject = globalThis,
) {
  const expectedSurface = String(expectedOutput?.surface || "");
  if (!expectedSurface) return null;
  if (["sentence", "sequence"].includes(expectedOutput?.role)) {
    return buildClassicalLesson2TokenWriting(expectedSurface, targetObject);
  }
  const writingCandidate = candidateResult?.personalNameResult
    || candidateResult?.scalarFrame
    || (
      candidateResult?.kind
        === "classical-nahuatl-negative-particle-selection-frame"
      && candidateResult?.authorizationStatus === "authorized"
        ? candidateResult.particleResultFrame
        : null
    )
    || candidateResult;
  const sourceConstituents = writingCandidate?.sourceAuthorizationFrame
    ?.sourceConstituents;
  const isNominalCompound = Boolean(
    writingCandidate?.kind
      === "classical-nahuatl-nominal-construction-result-frame"
    && writingCandidate?.constructionKind === "compound-nnc"
    && writingCandidate?.sourceAuthorizationFrame?.authorizationStatus
      === "authorized"
    && sourceConstituents?.embedStem
    && sourceConstituents?.matrixStem
  );
  let parts = [];
  let boundaryKind = "morph";
  if (isNominalCompound) {
    const typedCompoundSlots = writingCandidate?.canonicalResult
      ?.nncSlotFrame?.slots;
    parts = typedCompoundSlots
      ? getClassicalLesson2NncParts(typedCompoundSlots)
      : [
        {
          role: "embed",
          value: writingCandidate?.operationFrame?.embedShape?.realizedStem
            || sourceConstituents.embedStem,
        },
        { role: "matrix", value: sourceConstituents.matrixStem },
      ];
    boundaryKind = typedCompoundSlots ? "typed-nnc-slots" : "compound";
  } else if (isBasicClassicalFiniteVncWritingCandidate(writingCandidate)) {
    const person = writingCandidate.personDyad || {};
    const tense = writingCandidate.tenseFrame || {};
    const number = writingCandidate.numberDyad || {};
    parts = [
      getClassicalLesson2NonzeroPart("subject-person-1", person.pers1BaseMorph || person.pers1, {
        supportiveI: person.pers1SupportiveISurfaceAction === "insert"
          ? "insert-before-consonant"
          : "",
      }),
      getClassicalLesson2NonzeroPart("subject-person-2", person.pers2),
      getClassicalLesson2NonzeroPart("verbstem", writingCandidate.stem),
      getClassicalLesson2NonzeroPart("tense", tense.tns),
      getClassicalLesson2NonzeroPart("subject-number-1", number.num1),
      getClassicalLesson2NonzeroPart("subject-number-2", number.num2),
    ].filter(Boolean);
    boundaryKind = "finite-vnc-slots";
  } else if (
    writingCandidate?.kind === "classical-nahuatl-ordinary-nnc-result-frame"
    && writingCandidate?.authorizationStatus === "authorized"
  ) {
    parts = getClassicalLesson2NncParts(
      writingCandidate.typedSlotFrame?.slots || {},
    );
    boundaryKind = "ordinary-nnc-slots";
  } else if (
    writingCandidate?.kind
      === "classical-nahuatl-relational-nnc-relational-result"
    && writingCandidate?.authorizationStatus === "authorized"
    && writingCandidate?.formulaSlots?.predicate
  ) {
    parts = String(writingCandidate.formulaSlots.predicate)
      .split("-")
      .map((value, index) => getClassicalLesson2NonzeroPart(
        index ? `relational-part-${index + 1}` : "relational-embed",
        value,
      ))
      .filter(Boolean);
    boundaryKind = "typed-relational-nnc";
  } else {
    const orderedFrames = findClassicalLesson2Frames(
      writingCandidate,
      frame => (
        Array.isArray(frame?.orderedMorphemes)
        && frame.orderedMorphemes.length > 0
      ),
    );
    for (const frame of orderedFrames) {
      const orderedParts = frame.orderedMorphemes.map((morpheme, index) => (
        getClassicalLesson2NonzeroPart(
          morpheme?.slotRole || `morpheme-${index + 1}`,
          morpheme?.surface,
        )
      )).filter(Boolean);
      const written = buildClassicalLesson2WritingFromParts(
        orderedParts,
        "typed-ordered-morphemes",
        expectedSurface,
        targetObject,
      );
      if (written) return written;
    }
    const slotFrames = findClassicalLesson2Frames(
      writingCandidate,
      frame => frame?.slots?.predicate && frame?.slots?.subject,
    );
    for (const frame of slotFrames) {
      const written = buildClassicalLesson2WritingFromParts(
        getClassicalLesson2NncParts(frame.slots),
        "typed-nnc-slots",
        expectedSurface,
        targetObject,
      );
      if (written) return written;
    }
    const realizationRecords = findClassicalLesson2Frames(
      writingCandidate,
      frame => (
        frame?.surface === expectedSurface
        && Array.isArray(frame?.formulaSlots)
        && frame.formulaSlots.length > 0
      ),
    );
    for (const frame of realizationRecords) {
      const formulaParts = frame.formulaSlots.map((value, index) => (
        getClassicalLesson2NonzeroPart(
          `comparison-part-${index + 1}`,
          value,
        )
      )).filter(Boolean);
      const written = buildClassicalLesson2WritingFromParts(
        formulaParts,
        "typed-comparison-word-formation",
        expectedSurface,
        targetObject,
      );
      if (written) return written;
    }
    const formationFrame = writingCandidate?.formationFrame;
    if (formationFrame?.sourceStem && formationFrame?.derivedStem) {
      const derivedParts = String(formationFrame.derivedStem)
        .split("-")
        .filter(Boolean)
        .map((value, index) => ({
          role: index ? `formation-part-${index + 1}` : "source-stem",
          value,
        }));
      const written = buildClassicalLesson2WritingFromParts(
        derivedParts,
        "typed-nominal-formation",
        expectedSurface,
        targetObject,
      );
      if (written) return written;
    }
    const deverbal = writingCandidate?.operationFrame;
    if (deverbal?.targetStems && deverbal?.vocativeParticle) {
      const targetStem = deverbal.targetStems.generalUse
        || deverbal.targetStems.restrictedUse;
      const written = buildClassicalLesson2WritingFromParts(
        [
          { role: "deverbal-target-stem", value: targetStem },
          { role: "vocative-particle", value: deverbal.vocativeParticle },
        ],
        "typed-deverbal-vocative",
        expectedSurface,
        targetObject,
      );
      if (written) return written;
    }
    const coordinateParts = Array.isArray(writingCandidate?.coordinateParts)
      ? writingCandidate.coordinateParts.map((part, index) => (
        getClassicalLesson2NonzeroPart(
          part?.role || `personal-name-part-${index + 1}`,
          part?.surface,
        )
      )).filter(Boolean)
      : [];
    if (coordinateParts.length) {
      const written = buildClassicalLesson2WritingFromParts(
        coordinateParts,
        "typed-personal-name-coordinate",
        expectedSurface,
        targetObject,
      );
      if (written) return written;
    }
    if (
      writingCandidate?.kind === "classical-nahuatl-particle-result-frame"
    ) {
      const written = buildClassicalLesson2WritingFromParts(
        [{ role: "particle", value: expectedSurface }],
        "typed-particle-vocable",
        expectedSurface,
        targetObject,
      );
      if (written) return written;
    }
    const typedSourceStem = String(
      writingCandidate?.sourceFrame?.stem
      || writingCandidate?.source?.stem
      || "",
    ).trim();
    const typedContextFrame = writingCandidate?.operationFrame?.contextFrame;
    const requestedVariant = String(
      typedContextFrame?.requestedVariant || "",
    ).trim();
    if (requestedVariant && requestedVariant === expectedSurface) {
      const written = buildClassicalLesson2WritingFromParts(
        [{ role: "typed-contextual-variant", value: requestedVariant }],
        "typed-adverbial-context-variant",
        expectedSurface,
        targetObject,
      );
      if (written) return written;
    }
    const negativeParticle = String(
      typedContextFrame?.negativeParticle || "",
    ).trim();
    if (
      negativeParticle
      && typedSourceStem
      && `${negativeParticle}${typedSourceStem}` === expectedSurface
    ) {
      const written = buildClassicalLesson2WritingFromParts(
        [
          { role: "negative-particle", value: negativeParticle },
          { role: "typed-source-stem", value: typedSourceStem },
        ],
        "typed-adverbial-negative-context",
        expectedSurface,
        targetObject,
      );
      if (written) return written;
    }
    if (typedSourceStem && typedSourceStem === expectedSurface) {
      const written = buildClassicalLesson2WritingFromParts(
        [{ role: "typed-source-stem", value: typedSourceStem }],
        "typed-source-stem",
        expectedSurface,
        targetObject,
      );
      if (written) return written;
    }
    return null;
  }
  return buildClassicalLesson2WritingFromParts(
    parts,
    boundaryKind,
    expectedSurface,
    targetObject,
  );
}

function buildClassicalLesson2WritingOutputs(
  candidateResult,
  operationId,
  outputKind,
  targetObject,
) {
  if (Array.isArray(candidateResult)) {
    return Object.freeze(candidateResult.flatMap(item => (
      buildClassicalLesson2WritingOutputs(
        item,
        operationId,
        DEFAULT_APPLICATION_OUTPUT_KIND,
        targetObject,
      )
    )));
  }
  const primaryOutputs = getClassicalLesson2PrimaryWritingOutputs(
    candidateResult,
    outputKind,
  );
  const directLesson2Owner = operationId === "orthography:transcription"
    || operationId.startsWith("phonology:");
  return Object.freeze(primaryOutputs.map(output => {
    if (directLesson2Owner) {
      return Object.freeze({
        ...output,
        authorizationStatus: "authorized",
        mode: "lesson2-direct-rule-owner",
        writtenResult: null,
      });
    }
    const writtenResult = buildClassicalLesson2OwnedWriting(
      candidateResult,
      output,
      targetObject,
    );
    return Object.freeze({
      ...output,
      authorizationStatus: writtenResult ? "authorized" : "blocked",
      mode: writtenResult ? "lesson2-writer" : "lesson2-owner-missing",
      writtenResult,
    });
  }));
}

function isBasicClassicalFiniteVncWritingCandidate(candidateResult = null) {
  return Boolean(
    candidateResult?.kind === "classical-nahuatl-finite-vnc-slot-result"
    && candidateResult?.authorizationStatus === "authorized"
    && candidateResult?.source?.transitivity === "intransitive"
    && candidateResult?.mood === "indicative"
    && candidateResult?.tense === "present"
    && /^[a-zāēīō]+$/iu.test(String(candidateResult?.stem || ""))
  );
}

const ROUTE_DEFINITIONS = Object.freeze({
  "concept:classification": Object.freeze({
    capabilityName: "evaluateClassicalGrammarConcept",
    axisIds: Object.freeze([
      "typed-concept-source",
      "read-only-classification",
      "concept-rank-validation",
      "concept-authority-rejection",
      "non-generative-projection",
    ]),
  }),
  "classical.morpheme.silent.contrast.validate": Object.freeze({
    capabilityName: "evaluateClassicalSilentMorphContrast",
    axisIds: Object.freeze([
      "silent-candidate-kind",
      "corresponding-position",
      "similar-structure",
      "related-category",
      "sounded-counterpart",
    ]),
  }),
  "classical.linguistic.unit.compose": Object.freeze({
    capabilityName: "evaluateClassicalLinguisticUnitComposition",
    axisIds: Object.freeze([
      "medium",
      "sequence-order",
      "structure-pattern",
      "constituent-units",
      "resulting-unity",
    ]),
  }),
  "classical.linguistic.structure.recurse": Object.freeze({
    capabilityName: "evaluateClassicalLinguisticStructureRecursion",
    axisIds: Object.freeze([
      "prior-structured-unit",
      "next-constituent-unit",
      "retained-operation-lineage",
      "recursive-unity",
    ]),
  }),
  "classical.linguistic.unit.discontinuity.validate": Object.freeze({
    capabilityName: "evaluateClassicalDiscontinuousUnitAdmissibility",
    axisIds: Object.freeze([
      "typed-unit-kind",
      "constituent-roles",
      "nonjuxtaposed-topology",
      "functional-cohesion",
      "restricted-applicability",
    ]),
  }),
  "classical.carrier.meaningless-unit.classify": Object.freeze({
    capabilityName: "evaluateClassicalMeaninglessCarrierUnitClassification",
    axisIds: Object.freeze([
      "candidate-kind",
      "carrier-subsystem",
      "analysis-level",
      "meaning-exclusion",
    ]),
  }),
  "classical.carrier.rank.taxonomy.classify": Object.freeze({
    capabilityName: "evaluateClassicalCarrierRankTaxonomy",
    axisIds: Object.freeze([
      "carrier-subsystem",
      "rank-tier",
      "rank-identity",
      "rank-order",
    ]),
  }),
  "classical.carrier.rank.form": Object.freeze({
    capabilityName: "evaluateClassicalCarrierRankFormation",
    axisIds: Object.freeze([
      "source-unit-rank",
      "target-unit-rank",
      "formation-kind",
      "rank-upgrade",
    ]),
  }),
  "classical.carrier.syllable.compose": Object.freeze({
    capabilityName: "evaluateClassicalSyllableStructure",
    axisIds: Object.freeze([
      "vowel-center",
      "consonant-margins",
      "language-specific-structure",
      "meaningless-unit",
    ]),
  }),
  "classical.carrier.vocable.compose": Object.freeze({
    capabilityName: "evaluateClassicalCarrierVocableStructure",
    axisIds: Object.freeze([
      "syllable-constituents",
      "vocable-rank",
      "word-syllable-perspective",
      "monosyllabic-upgrade",
    ]),
  }),
  "classical.carrier.vocable.prosody.validate": Object.freeze({
    capabilityName: "evaluateClassicalCarrierVocableProsody",
    axisIds: Object.freeze([
      "polysyllabic-vocable",
      "stressed-syllable",
      "stress-applicability",
    ]),
  }),
  "classical.carrier.phonotactic.constraints.validate": Object.freeze({
    capabilityName: "evaluateClassicalCarrierPhonotacticSurfaceConstraints",
    axisIds: Object.freeze([
      "carrier-structure",
      "language-specific-phonotactics",
      "possible-sequence",
      "meaningful-surface-conformance",
    ]),
  }),
  "classical.morpheme.meaningful-unit.classify": Object.freeze({ capabilityName: "evaluateClassicalMeaningfulMorphemeUnitClassification", axisIds: Object.freeze(["candidate-kind", "meaningful-family"]) }),
  "classical.morpheme.syllable.separate": Object.freeze({ capabilityName: "evaluateClassicalMorphemeSyllableSeparation", axisIds: Object.freeze(["meaningful-unit", "syllable-rank", "rank-contrast", "coterminality"]) }),
  "classical.morpheme.combinatorial-type.classify": Object.freeze({ capabilityName: "evaluateClassicalMorphemeCombinatorialTypeClassification", axisIds: Object.freeze(["meaningful-unit", "major-minor-type", "representational-center", "affixal-status"]) }),
  "classical.morpheme.affix.position.classify": Object.freeze({ capabilityName: "evaluateClassicalAffixLinearPositionClassification", axisIds: Object.freeze(["minor-morpheme", "sequence-position", "affix-position-class"]) }),
  "classical.morpheme.affix.function.classify": Object.freeze({ capabilityName: "evaluateClassicalAffixFunctionalTypeClassification", axisIds: Object.freeze(["affix-position", "information-role", "stem-boundary", "functional-type"]) }),
  "classical.morpheme.inflectional-paradigm.classify": Object.freeze({ capabilityName: "evaluateClassicalInflectionalParadigmDefinition", axisIds: Object.freeze(["inflectional-affix", "common-stem", "stem-class", "variant-set"]) }),
  "classical.structure.post-stem-unit.classify": Object.freeze({ capabilityName: "evaluateClassicalNahuatlPostStemUnitClassification", axisIds: Object.freeze(["rank-result", "unit-disposition", "nuclear-clause-rank"]) }),
  "classical.morpheme.inflectional-dyad.analyze": Object.freeze({ capabilityName: "evaluateClassicalInflectionalAffixDyadAnalysis", axisIds: Object.freeze(["first-affix", "second-affix", "inseparable-sequence", "dyad-structure"]) }),
  "classical.morpheme.inflectional-affix.demote": Object.freeze({ capabilityName: "evaluateClassicalInflectionalAffixStemInternalDemotion", axisIds: Object.freeze(["inflectional-affix", "process-kind", "source-boundary", "target-boundary"]) }),
  "classical.morpheme.meaningful-rank.hierarchy.validate": Object.freeze({ capabilityName: "evaluateClassicalMeaningfulStructuralRankHierarchy", axisIds: Object.freeze(["major-type", "minor-type", "rank-stages", "lower-stage-dependency"]) }),
  "classical.structure.meaningful-rank.source-or-upgrade.validate": Object.freeze({ capabilityName: "evaluateClassicalMeaningfulRankSourceUpgradeAdmissibility", axisIds: Object.freeze(["hierarchy", "source-rank", "target-rank", "transition-mode"]) }),
  "classical.structure.meaningful-rank.downgrade": Object.freeze({ capabilityName: "evaluateClassicalMeaningfulRankDowngrade", axisIds: Object.freeze(["hierarchy", "higher-rank", "lower-rank", "downgrade-mode"]) }),
  "classical.structure.root.major-morpheme.validate": Object.freeze({ capabilityName: "evaluateClassicalRootMajorMorphemeDefinition", axisIds: Object.freeze(["major-type", "major-unit-count", "root-structure"]) }),
  "classical.structure.stem.form-directly": Object.freeze({ capabilityName: "evaluateClassicalDirectStemFormation", axisIds: Object.freeze(["base-unit", "derivational-affix", "formation-kind", "stem-result"]) }),
  "classical.structure.stem.form-via-stock": Object.freeze({ capabilityName: "evaluateClassicalStockMediatedStemFormation", axisIds: Object.freeze(["root", "derivational-suffix", "stock-stage", "stem-result"]) }),
  "classical.structure.stem.compound": Object.freeze({ capabilityName: "evaluateClassicalCompoundStemFormation", axisIds: Object.freeze(["first-stem", "second-stem", "compound-relation", "stem-result"]) }),
  "classical.structure.meaning-bearing-unit.classify": Object.freeze({ capabilityName: "evaluateClassicalLexemeBearingUnitClassification", axisIds: Object.freeze(["unit", "unit-rank", "meaning-component"]) }),
  "classical.structure.stem.lexical-status.classify": Object.freeze({ capabilityName: "evaluateClassicalStemLexicalItemClassification", axisIds: Object.freeze(["stem", "lexical-status", "lexicon-membership"]) }),
  "classical.structure.root.meaning-rank.upgrade": Object.freeze({ capabilityName: "evaluateClassicalRootMeaningRankUpgrade", axisIds: Object.freeze(["root", "rank-upgrade", "source-meaning", "target-meaning"]) }),
  "concept.word.sentence-fragment.analyze": Object.freeze({ capabilityName: "evaluateComparativeWordSentenceFragmentAnalysis", axisIds: Object.freeze(["word-rank", "sentence-fragment", "simple-word-exception"]) }),
  "classical.structure.stem-transition-zone.validate": Object.freeze({ capabilityName: "evaluateClassicalStemInflectionTransitionZone", axisIds: Object.freeze(["stem", "post-stem-unit", "derivation-boundary", "inflection-onset"]) }),
  "classical.nuclear-clause.morphosyntax.validate": Object.freeze({ capabilityName: "evaluateClassicalNuclearClauseMorphosyntaxDomain", axisIds: Object.freeze(["nuclear-clause", "subject", "predicate", "morphosyntax-domain"]) }),
  "classical.structure.group.compose": Object.freeze({ capabilityName: "evaluateClassicalNahuatlGroupComposition", axisIds: Object.freeze(["particles", "nuclear-clauses", "group-shape", "group-result"]) }),
  "classical.structure.syntax-domain-onset.validate": Object.freeze({ capabilityName: "evaluateClassicalNahuatlSyntaxDomainOnset", axisIds: Object.freeze(["group-result", "group-rank", "syntax-domain"]) }),
  "concept.structure.principles.analyze": Object.freeze({ capabilityName: "evaluateLinguisticStructurePrinciplesAnalysis", axisIds: Object.freeze(["structure-facet", "structuring-principles", "concatenation", "unit-closure"]) }),
  "concept.structure.governance-taxonomy.analyze": Object.freeze({ capabilityName: "evaluateGovernanceTypeTaxonomy", axisIds: Object.freeze(["governance", "general-type", "function-unit-coupling", "governance-subtype"]) }),
  "concept.structure.adjunctive-governance.analyze": Object.freeze({ capabilityName: "evaluateAdjunctiveGovernanceAnalysis", axisIds: Object.freeze(["governor", "adjunct", "predicate-structure", "relation-structure", "modification", "function-unit-filler", "adjunctor", "agreement-case"]) }),
  "concept.structure.conjunctive-governance.analyze": Object.freeze({ capabilityName: "evaluateConjunctiveGovernanceAnalysis", axisIds: Object.freeze(["conjuncts", "equal-governance", "conjunct-filler-class"]) }),
  "classical.structure.level-distribution.validate": Object.freeze({ capabilityName: "evaluateClassicalNahuatlStructureLevelDistribution", axisIds: Object.freeze(["morphological-level", "morphosyntactical-level", "syntactical-level", "cross-level-distribution"]) }),
  "classical.structure.participant-role.analyze": Object.freeze({ capabilityName: "evaluateClassicalParticipantRoleAnalysis", axisIds: Object.freeze(["participant", "event-relation", "participant-role", "entitive-function-unit"]) }),
  "classical.structure.conceptual-plane.separate": Object.freeze({ capabilityName: "evaluateClassicalConceptualPlaneSeparation", axisIds: Object.freeze(["function-unit-plane", "form-class-plane", "lexical-item-plane", "participant-role-plane", "nonintermingling"]) }),
  "classical.authority.source-language.firewall.enforce": Object.freeze({ capabilityName: "evaluateTranslationAuthorityBoundary", axisIds: Object.freeze(["interpretive-provenance", "source-language-authority", "interpretive-bias", "grammar-firewall"]) }),
  "classical.source.phonological-identity.validate": Object.freeze({ capabilityName: "evaluateClassicalPhonologicalDistinction", axisIds: Object.freeze(["vowel-length", "glottal-stop", "lexical-identity", "dictionary-collapse"]) }),
  "classical.verbstem.object-embed.validate": Object.freeze({ capabilityName: "evaluateClassicalObjectEmbedDistinction", axisIds: Object.freeze(["object-prefix", "embedded-nounstem", "valence", "stem-boundary"]) }),
  "classical.particle.lexical-distinction.authorize": Object.freeze({ capabilityName: "evaluateClassicalParticleLexicalDistinction", axisIds: Object.freeze(["particle-identity", "particle-sequence", "liaison", "dictionary-head"]) }),
  "classical.verbstem.lexicon.authorize": Object.freeze({ capabilityName: "evaluateClassicalVerbstemLexicon", axisIds: Object.freeze(["verbstem-identity", "valence", "canonical-meaning", "dictionary-head"]) }),
  "classical.vnc.compound.widowhood.interpret": Object.freeze({ capabilityName: "evaluateClassicalNahuatlWidowhoodCompoundInterpretation", axisIds: Object.freeze(["compound-verbstem", "subject-person-number", "participant-sex", "widowhood-meaning"]) }),
  "classical.nnc.exotl.interpret": Object.freeze({ capabilityName: "evaluateClassicalNahuatlExotlInterpretation", axisIds: Object.freeze(["nominal-clause", "silent-subject", "compositional-meaning", "semantic-weighting"]) }),
  "classical.sentence.tleh-admonitory-pair.interpret": Object.freeze({ capabilityName: "evaluateClassicalNahuatlTlehAdmonitoryPair", axisIds: Object.freeze(["question-forms", "honored-subject", "nonhuman-object", "rhetorical-force", "expected-answer"]) }),
  "classical.sentence.tleh-closing-vocative.interpret": Object.freeze({ capabilityName: "evaluateClassicalNahuatlTlehClosingVocative", axisIds: Object.freeze(["closing-question", "honored-subject", "vocatives", "pragmatic-force", "translation-boundary"]) }),
  "classical.nnc.king-praise-role-contrast.interpret": Object.freeze({ capabilityName: "evaluateClassicalNahuatlKingPraiseRoleContrast", axisIds: Object.freeze(["actual-forms", "substituted-forms", "subject-possessor-relation", "participant-roles", "corrected-meaning"]) }),
  "orthography:transcription": Object.freeze({
    capabilityName: "buildClassicalNahuatlTranscriptionFrame",
    axisIds: Object.freeze(["transcription-source", "phonological-boundary", "orthographic-realization"]),
  }),
  "phonology:syllabify": Object.freeze({
    capabilityName: "buildClassicalNahuatlSyllableStructureFrame",
    axisIds: Object.freeze(["written-vocable", "vowel-centers", "syllable-boundaries"]),
  }),
  "phonology:stress": Object.freeze({
    capabilityName: "buildClassicalNahuatlStressFrame",
    axisIds: Object.freeze(["written-vocable", "stress-group", "stressed-syllable"]),
  }),
  "phonology:spelling-change": Object.freeze({
    capabilityName: "buildClassicalNahuatlSpellingChangeFrame",
    axisIds: Object.freeze(["source-segment", "phonological-environment", "written-result"]),
  }),
  "phonology:lateral-reading": Object.freeze({
    capabilityName: "buildClassicalNahuatlLateralReadingFrame",
    axisIds: Object.freeze(["written-vocable", "intended-meaning", "phonological-length", "written-result"]),
  }),
  "phonology:supportive-vowel": Object.freeze({
    capabilityName: "buildClassicalNahuatlSupportiveVowelFrame",
    axisIds: Object.freeze(["source-segments", "pronounceability", "supportive-i-realization"]),
  }),
  "phonology:open-transition": Object.freeze({
    capabilityName: "buildClassicalNahuatlOpenTransitionFrame",
    axisIds: Object.freeze(["first-stem-edge", "second-stem-edge", "open-transition-realization"]),
  }),
  "phonology:consonant-length": Object.freeze({
    capabilityName: "buildClassicalNahuatlConsonantalLengthFrame",
    axisIds: Object.freeze(["first-consonant", "second-consonant", "long-consonant-realization"]),
  }),
  "phonology:progressive-assimilation": Object.freeze({
    capabilityName: "buildClassicalNahuatlProgressiveAssimilationFrame",
    axisIds: Object.freeze(["left-morph", "right-morph", "progressive-boundary-realization"]),
  }),
  "phonology:assimilation": Object.freeze({
    capabilityName: "buildClassicalNahuatlAssimilationFrame",
    axisIds: Object.freeze(["first-consonant", "second-consonant", "regressive-boundary-realization"]),
  }),
  "phonology:consonant-loss": Object.freeze({
    capabilityName: "buildClassicalNahuatlConsonantLossFrame",
    axisIds: Object.freeze(["first-consonant", "second-consonant", "loss-result"]),
  }),
  "phonology:consonant-shift": Object.freeze({
    capabilityName: "buildClassicalNahuatlConsonantPhoneShiftFrame",
    axisIds: Object.freeze(["source-consonant", "phonological-environment", "shift-result"]),
  }),
  "phonology:phone-source-assignment": Object.freeze({
    capabilityName: "buildClassicalNahuatlPhoneSourceAssignmentFrame",
    axisIds: Object.freeze(["morphemic-source", "underlying-phoneme", "realized-phone", "written-result"]),
  }),
  "phonology:segment-realization": Object.freeze({
    capabilityName: "buildClassicalNahuatlSegmentRealizationFrame",
    axisIds: Object.freeze(["source-segment", "phonic-repertory", "phonological-environment", "written-result"]),
  }),
  "phonology:vowel-elision": Object.freeze({
    capabilityName: "buildClassicalNahuatlVowelElisionFrame",
    axisIds: Object.freeze(["source-morpheme", "stress-group-environment", "elided-result"]),
  }),
  "vnc:nuclear-clause": Object.freeze({
    capabilityName: "buildClassicalNahuatlNuclearClauseResult",
    axisIds: Object.freeze(["basal-unit", "source-transitivity", "participant-structure", "predicate-stem"]),
  }),
  "vnc:finite-slot": Object.freeze({
    capabilityName: "buildClassicalNahuatlFiniteVncResult",
    axisIds: Object.freeze(["subject-person-number", "mood", "tense", "finite-slot-order"]),
  }),
  "vnc:finite-surface": Object.freeze({
    capabilityName: "buildClassicalNahuatlVncFiniteSurfaceFrame",
    axisIds: Object.freeze(["selected-formula", "finite-boundary-realization", "word-surface"]),
  }),
  "vnc:sentence-result": Object.freeze({
    capabilityName: "buildClassicalNahuatlVncSentenceResultFrame",
    axisIds: Object.freeze(["authorized-vnc-result", "sentence-composition", "sentence-realization"]),
  }),
  "nnc:ordinary": Object.freeze({
    capabilityName: "evaluateClassicalNahuatlOrdinaryNnc",
    axisIds: Object.freeze([
      "nounstem-source",
      "nounstem-class",
      "nnc-state",
      "subject-person-number",
      "possessor-person-number",
      "stem-relation",
      "predicate-formation",
      "possessor-reduplication",
      "sentence-force",
      "polarity",
      "state-availability",
      "referential-animacy",
      "use-stem-shape",
      "lexical-alternative",
      "number-dyad",
      "source-stem",
      "target-stem",
      "state-reentry",
      "ordinary-nnc-condition",
      "possessive-formation",
      "possessor-st2-allomorph",
      "possessor-st2-boundary-context",
      "sentence-composition",
      "lexical-license",
      "formula-projection",
      "written-boundary-realization",
    ]),
  }),
  "nnc:sentence-surface": Object.freeze({
    capabilityName: "buildClassicalNahuatlNncSentenceSurfaceFrame",
    axisIds: Object.freeze(["nnc-state", "sentence-force", "polarity", "contextual-interpretation"]),
  }),
  "nnc:diagram": Object.freeze({
    capabilityName: "buildClassicalNahuatlNncDiagrammaticFrame",
    axisIds: Object.freeze(["subject-constituent", "predicate-constituent", "nnc-slot-projection"]),
  }),
  "vnc:diagram": Object.freeze({
    capabilityName: "buildClassicalNahuatlVncDiagrammaticFrame",
    axisIds: Object.freeze(["subject-circumfix", "object-prefix", "predicate-constituent", "vnc-slot-projection"]),
  }),
  "sentence:adverbial-adjunction": Object.freeze({
    capabilityName: "buildClassicalNahuatlSentenceAdverbialLayerFrame",
    axisIds: Object.freeze(["sentence-adverbial", "clause-scope", "sentence-position"]),
  }),
  "sentence:particle-adjunction": Object.freeze({
    capabilityName: "buildClassicalNahuatlSentenceParticleLayerFrame",
    axisIds: Object.freeze(["sentence-particle", "honorificization", "sentence-position"]),
  }),
  "particle:result": Object.freeze({
    capabilityName: "buildClassicalNahuatlParticleResultFrame",
    axisIds: Object.freeze([
      "particle-identity",
      "particle-function",
      "particle-placement",
      "particle-semantic-marker",
    ]),
  }),
  "particle:negative-selection": Object.freeze({
    capabilityName: "selectClassicalNahuatlNegativeParticleFrame",
    axisIds: Object.freeze([
      "polarity",
      "preceding-particle",
      "sentence-kind",
      "negative-particle-selection",
    ]),
  }),
  "vnc:source-selection": Object.freeze({
    capabilityName: "buildClassicalNahuatlFuenteSourceSelectionFrame",
    axisIds: Object.freeze(["source-stem", "embed-matrix-structure", "source-selection"]),
  }),
  "vnc:ordered-voice-chain": Object.freeze({
    capabilityName: "deriveClassicalNahuatlOrderedVoiceLayerChain",
    axisIds: Object.freeze(["source-voice", "target-voice", "voice-operation-order", "participant-transformation"]),
  }),
  "vnc:ordered-voice-application": Object.freeze({
    capabilityName: "buildClassicalNahuatlOrderedVoiceVncApplicationFrame",
    axisIds: Object.freeze([
      "source-voice",
      "target-voice",
      "voice-operation-order",
      "participant-transformation",
      "selected-formula",
      "finite-boundary-realization",
      "word-surface",
    ]),
  }),
  "nnc:pronominal": Object.freeze({
    capabilityName: "evaluateClassicalNahuatlPronominalNnc",
    axisIds: Object.freeze([
      "pronominal-source",
      "pronominal-family",
      "subject-person-number",
      "number-realization",
      "pronominal-context",
      "quantitive-embed",
      "quantitive-matrix",
      "matrix-family",
      "matrix-form",
      "predicate-pluralization",
      "lexical-restriction",
      "clause-position",
      "discourse-role",
      "sentence-force",
      "polarity",
      "formula-projection",
      "written-boundary-realization",
    ]),
  }),
  "vnc:derivational-operation": Object.freeze({
    capabilityName: "evaluateClassicalNahuatlLateVncDerivation",
    axisIds: Object.freeze(["derivation-family", "operation-order", "source-participants", "target-participants"]),
  }),
  "vnc:application": Object.freeze({
    capabilityName: "evaluateClassicalNahuatlVncApplication",
    axisIds: Object.freeze(["source-analysis", "operation-plan", "coordinate-projection", "selected-result"]),
  }),
  "vnc:transitive-object": Object.freeze({
    capabilityName: "buildClassicalNahuatlTransitiveVncObjectFrame",
    axisIds: Object.freeze(["object-kind", "object-person-number", "valence", "object-prefix"]),
  }),
  "vnc:verbstem-class": Object.freeze({
    capabilityName: "buildClassicalNahuatlVerbstemClassFrame",
    axisIds: Object.freeze(["verbstem-class", "stem-alternation", "mood-tense-allomorphy", "finite-realization"]),
  }),
  "sentence:supplementation": Object.freeze({
    capabilityName: "evaluateClassicalNahuatlSupplementationOperation",
    axisIds: Object.freeze(["principal-clause", "supplement-clause", "shared-referent", "supplement-relation", "clause-order", "vocative", "reported-speech"]),
  }),
  "grammar:nominal-construction": Object.freeze({
    capabilityName: "evaluateClassicalNahuatlNominalConstruction",
    axisIds: Object.freeze(["nominal-embed", "compound-nnc", "affective-nnc", "cardinal-number", "measure-modification", "vacant-state"]),
  }),
  "nnc:deverbal-construction": Object.freeze({
    capabilityName: "evaluateClassicalNahuatlDeverbalNnc",
    axisIds: Object.freeze(["source-stage", "source-voice", "nominalization-family", "patientive-family", "external-object", "double-nucleus-ownerhood"]),
  }),
  "nnc:adjectival-modification": Object.freeze({
    capabilityName: "evaluateClassicalNahuatlAdjectivalModification",
    axisIds: Object.freeze([
      "modification-topology",
      "modifier-head-order",
      "adjunctor",
      "transitive-reference-contact",
      "compound-head-target",
    ]),
  }),
  "nnc:adverbial": Object.freeze({
    capabilityName: "evaluateClassicalNahuatlAdverbialNuclear",
    axisIds: Object.freeze(["adverbial-source", "adverbial-context", "adverbialized-subject", "clause-rank"]),
  }),
  "nnc:relational": Object.freeze({
    capabilityName: "evaluateClassicalNahuatlRelationalNnc",
    axisIds: Object.freeze(["relational-source", "relation-family", "possessor-structure", "voice-source", "relational-result"]),
  }),
  "nnc:place-gentilic": Object.freeze({
    capabilityName: "evaluatePlaceGentilicNnc",
    axisIds: Object.freeze(["place-source", "place-formation", "gentilic-formation", "collectivity", "profession", "closed-title"]),
  }),
  "clause:adverbial-adjunction": Object.freeze({
    capabilityName: "evaluateAdverbialAdjunction",
    axisIds: Object.freeze(["adverbial-principal", "adjoined-clause", "adjunctor", "relation-scope", "clause-position"]),
  }),
  "clause:composition": Object.freeze({
    capabilityName: "evaluateClassicalNahuatlClauseComposition",
    axisIds: Object.freeze(["complement-relation", "conjunction-relation", "clause-rank", "reference-graph", "relation-marker", "parallel-structure"]),
  }),
  "clause:comparison": Object.freeze({
    capabilityName: "evaluateClassicalNahuatlComparison",
    axisIds: Object.freeze(["comparison-relation", "comparand", "standard", "dimension", "degree-strategy", "superlative-strategy"]),
  }),
  "vnc:denominal": Object.freeze({
    capabilityName: "evaluateClassicalNahuatlDenominalVnc",
    axisIds: Object.freeze(["denominal-source-family", "denominal-operation", "source-rank", "target-verbstem-class", "target-valence", "finite-participants"]),
  }),
  "nnc:personal-name": Object.freeze({
    capabilityName: "evaluatePersonalNameNnc",
    axisIds: Object.freeze(["name-source-family", "inner-clause", "outer-subject", "outer-number", "sentence-operation", "reranking"]),
  }),
});

// These are typed continuation interfaces, not route or lexeme admission
// lists. A route omitted here may still execute normally; it simply does not
// claim that its whole Result is a Source accepted by another owner. This
// keeps Source-analysis and intermediate slot frames from masquerading as
// complete VNC/NNC/clause Results in the rhyme proof topology.
const CLASSICAL_GRAMMAR_APPLICATION_CONTINUATION_TYPE_CONTRACTS =
  Object.freeze({
    "vnc:sentence-result": Object.freeze({
      inputUnitKinds: Object.freeze(["vnc-result"]),
      outputUnitKinds: Object.freeze(["clause-result"]),
    }),
    "nnc:ordinary": Object.freeze({
      inputUnitKinds: Object.freeze([]),
      outputUnitKinds: Object.freeze([
        "nnc-result",
        "nnc-diagram-slot-frame",
        "nnc-sentence-slot-frame",
        "nnc-embeddable-result",
      ]),
    }),
    "nnc:sentence-surface": Object.freeze({
      inputUnitKinds: Object.freeze(["nnc-sentence-slot-frame"]),
      outputUnitKinds: Object.freeze(["clause-result"]),
    }),
    "nnc:diagram": Object.freeze({
      inputUnitKinds: Object.freeze(["nnc-diagram-slot-frame"]),
      outputUnitKinds: Object.freeze([]),
    }),
    "vnc:diagram": Object.freeze({
      inputUnitKinds: Object.freeze(["vnc-diagram-slot-frame"]),
      outputUnitKinds: Object.freeze([]),
    }),
    "sentence:adverbial-adjunction": Object.freeze({
      inputUnitKinds: Object.freeze([
        "vnc-result",
        "nnc-result",
        "clause-result",
        "particle-result",
      ]),
      outputUnitKinds: Object.freeze(["clause-result"]),
    }),
    "sentence:particle-adjunction": Object.freeze({
      inputUnitKinds: Object.freeze([
        "particle-result",
        "clause-result",
      ]),
      outputUnitKinds: Object.freeze(["clause-result"]),
    }),
    "particle:result": Object.freeze({
      inputUnitKinds: Object.freeze([]),
      outputUnitKinds: Object.freeze(["particle-result"]),
    }),
    "particle:negative-selection": Object.freeze({
      inputUnitKinds: Object.freeze(["particle-result"]),
      outputUnitKinds: Object.freeze(["particle-result"]),
    }),
    "vnc:ordered-voice-application": Object.freeze({
      inputUnitKinds: Object.freeze(["vnc-result"]),
      outputUnitKinds: Object.freeze(["vnc-result"]),
    }),
    "nnc:pronominal": Object.freeze({
      inputUnitKinds: Object.freeze([]),
      outputUnitKinds: Object.freeze([
        "nnc-result",
        "nnc-diagram-slot-frame",
        "nnc-sentence-slot-frame",
      ]),
    }),
    "vnc:derivational-operation": Object.freeze({
      inputUnitKinds: Object.freeze(["vnc-result"]),
      outputUnitKinds: Object.freeze(["vnc-result"]),
    }),
    "vnc:application": Object.freeze({
      inputUnitKinds: Object.freeze(["vnc-result"]),
      outputUnitKinds: Object.freeze(["vnc-result"]),
    }),
    "sentence:supplementation": Object.freeze({
      inputUnitKinds: Object.freeze([
        "vnc-result",
        "nnc-result",
        "clause-result",
        "particle-result",
      ]),
      outputUnitKinds: Object.freeze(["clause-result"]),
    }),
    "grammar:nominal-construction": Object.freeze({
      inputUnitKinds: Object.freeze([
        "vnc-result",
        "nnc-embeddable-result",
      ]),
      outputUnitKinds: Object.freeze([
        "vnc-result",
        "nnc-result",
        "nnc-diagram-slot-frame",
        "nnc-embeddable-result",
      ]),
    }),
    "nnc:deverbal-construction": Object.freeze({
      inputUnitKinds: Object.freeze(["vnc-result", "nnc-result"]),
      outputUnitKinds: Object.freeze([
        "nnc-result",
        "nnc-diagram-slot-frame",
        "nnc-embeddable-result",
      ]),
    }),
    "nnc:adjectival-modification": Object.freeze({
      inputUnitKinds: Object.freeze([
        "vnc-result",
        "nnc-result",
        "clause-result",
      ]),
      outputUnitKinds: Object.freeze(["nnc-result"]),
    }),
    "nnc:adverbial": Object.freeze({
      inputUnitKinds: Object.freeze([
        "vnc-result",
        "nnc-result",
        "clause-result",
      ]),
      outputUnitKinds: Object.freeze([
        "vnc-result",
        "nnc-result",
        "clause-result",
      ]),
    }),
    "nnc:relational": Object.freeze({
      inputUnitKinds: Object.freeze(["vnc-result", "nnc-result"]),
      outputUnitKinds: Object.freeze(["nnc-result"]),
    }),
    "nnc:place-gentilic": Object.freeze({
      inputUnitKinds: Object.freeze(["nnc-result"]),
      outputUnitKinds: Object.freeze(["nnc-result"]),
    }),
    "clause:adverbial-adjunction": Object.freeze({
      inputUnitKinds: Object.freeze([
        "vnc-result",
        "nnc-result",
        "clause-result",
        "particle-result",
      ]),
      outputUnitKinds: Object.freeze(["clause-result"]),
    }),
    "clause:composition": Object.freeze({
      inputUnitKinds: Object.freeze([
        "vnc-result",
        "nnc-result",
        "clause-result",
      ]),
      outputUnitKinds: Object.freeze(["clause-result"]),
    }),
    "clause:comparison": Object.freeze({
      inputUnitKinds: Object.freeze([
        "vnc-result",
        "nnc-result",
        "clause-result",
      ]),
      outputUnitKinds: Object.freeze(["clause-result"]),
    }),
    "vnc:denominal": Object.freeze({
      inputUnitKinds: Object.freeze(["nnc-result"]),
      outputUnitKinds: Object.freeze(["vnc-result"]),
    }),
    "nnc:personal-name": Object.freeze({
      inputUnitKinds: Object.freeze([
        "vnc-result",
        "nnc-result",
        "clause-result",
      ]),
      outputUnitKinds: Object.freeze(["nnc-result"]),
    }),
  });

// Exact Source compatibility is declared separately from Result continuation.
// The aggregate may call only these owner validators and preflights; it never
// infers Source acceptance from a kind string, lesson, surface, or formula.
const CLASSICAL_GRAMMAR_APPLICATION_TYPED_SOURCE_CONTRACTS = Object.freeze({
  "nnc:ordinary": Object.freeze({
    sourceUnitKind: "ordinary-nnc-source",
    sourceValidatorNames: Object.freeze([
      "isClassicalNahuatlOrdinaryNncSourceFrame",
    ]),
    preflightCapabilityName:
      "buildClassicalNahuatlNncOperationSelectionFrame",
    preflightValidatorNames: Object.freeze([]),
    preflightRequests: Object.freeze([Object.freeze({})]),
    preflightKind: "classical-nahuatl-nnc-operation-selection-frame",
    preflightSourceProperty: "sourceFrame",
  }),
  "nnc:pronominal": Object.freeze({
    sourceUnitKind: "pronominal-nnc-source",
    sourceValidatorNames: Object.freeze([
      "isClassicalNahuatlPronominalNncSourceFrame",
    ]),
    preflightCapabilityName:
      "buildClassicalNahuatlNncOperationSelectionFrame",
    preflightValidatorNames: Object.freeze([]),
    preflightRequests: Object.freeze([Object.freeze({})]),
    preflightKind: "classical-nahuatl-nnc-operation-selection-frame",
    preflightSourceProperty: "sourceFrame",
  }),
  "vnc:application": Object.freeze({
    sourceUnitKind: "vnc-derivational-machinery-source",
    sourceValidatorNames: Object.freeze([
      "isClassicalNahuatlVncDerivationSourceMachineryFrame",
    ]),
    preflightCapabilityName:
      "getClassicalNahuatlVncDerivationOptionInventory",
    preflightValidatorNames: Object.freeze([
      "isClassicalNahuatlVncDerivationOptionInventory",
    ]),
    preflightRequests: Object.freeze([
      Object.freeze({ derivationType: "causative" }),
      Object.freeze({ derivationType: "applicative" }),
    ]),
    preflightKind: "classical-nahuatl-vnc-derivation-option-inventory",
    preflightSourceProperty: "sourceMachineryFrame",
  }),
});

// A typed-Source navigator record is descriptive until its canonical owner
// issues one of these exact execution bindings. The UI may stage choices from
// the binding, but only this application boundary may consume it.
const CLASSICAL_GRAMMAR_TYPED_SOURCE_OPERATION_BINDING_CONTRACTS =
  Object.freeze({
    "nnc:ordinary": Object.freeze({
      family: "ordinary-nnc",
      bindingMode: "canonical-nnc-operation",
      sourceValidatorCapabilityName:
        "isClassicalNahuatlOrdinaryNncSourceFrame",
      operationValidatorCapabilityName:
        "isClassicalNahuatlOrdinaryNncOperationFrame",
      exactSourceProperty: "exactSourceFrame",
      executionOperationId: "nnc:ordinary",
    }),
    "nnc:pronominal": Object.freeze({
      family: "pronominal-nnc",
      bindingMode: "canonical-nnc-operation",
      sourceValidatorCapabilityName:
        "isClassicalNahuatlPronominalNncSourceFrame",
      operationValidatorCapabilityName:
        "isClassicalNahuatlPronominalNncOperationFrame",
      exactSourceProperty: "exactSourceFrame",
      executionOperationId: "nnc:pronominal",
    }),
    "vnc:application": Object.freeze({
      family: "vnc-application",
      bindingMode: "canonical-owner-binding",
      issuerCapabilityName:
        "issueClassicalNahuatlVncTypedSourceApplicationBindingFrame",
      validatorCapabilityName:
        "isClassicalNahuatlVncTypedSourceApplicationBindingFrame",
      exactSourceProperty: "exactSourceMachineryFrame",
      executionOperationId: "vnc:application",
    }),
    "particle:result": Object.freeze({
      family: "source-independent-root-constructor",
      bindingMode: "canonical-particle-root",
      inventoryCapabilityName: "getClassicalNahuatlParticleSourceEntries",
      sourceBuilderCapabilityName:
        "buildClassicalNahuatlParticleSourceFrame",
      sourceValidatorCapabilityName:
        "isClassicalNahuatlParticleSourceFrame",
      resultBuilderCapabilityName:
        "buildClassicalNahuatlParticleResultFrame",
      resultValidatorCapabilityName:
        "isClassicalNahuatlParticleResultFrame",
      executionOperationId: "particle:result",
    }),
  });

// These four owners accept one exact typed Result as their complete direct
// argument. Other type-compatible routes remain pending until their owner has
// an equally exact preflight adapter; the aggregate application never guesses
// or supplies selections on an owner's behalf.
const CLASSICAL_GRAMMAR_APPLICATION_DIRECT_RESULT_PROBE_OPERATION_IDS =
  Object.freeze([
    "vnc:sentence-result",
    "vnc:diagram",
    "nnc:sentence-surface",
    "nnc:diagram",
  ]);

// These owners issue exact, read-only binding frames. A binding proves that a
// particular owner can accept the exact Result into at least one of its input
// roles; it does not authorize execution. Missing choices and additional
// Results remain with that owner until its normal application is executed.
const CLASSICAL_GRAMMAR_APPLICATION_RESULT_BINDING_CONTRACTS = Object.freeze({
  "grammar:nominal-construction": Object.freeze({
    family: "formation-result",
    issuerCapabilityName:
      "issueClassicalNahuatlFormationResultBindingFrame",
    validatorCapabilityName:
      "isClassicalNahuatlFormationResultBindingFrame",
  }),
  "nnc:deverbal-construction": Object.freeze({
    family: "formation-result",
    issuerCapabilityName:
      "issueClassicalNahuatlFormationResultBindingFrame",
    validatorCapabilityName:
      "isClassicalNahuatlFormationResultBindingFrame",
  }),
  "nnc:relational": Object.freeze({
    family: "formation-result",
    issuerCapabilityName:
      "issueClassicalNahuatlFormationResultBindingFrame",
    validatorCapabilityName:
      "isClassicalNahuatlFormationResultBindingFrame",
  }),
  "sentence:adverbial-adjunction": Object.freeze({
    family: "particle-sentence",
    issuerCapabilityName:
      "issueClassicalNahuatlParticleSentenceBindingFrame",
    validatorCapabilityName:
      "isClassicalNahuatlParticleSentenceBindingFrame",
  }),
  "sentence:particle-adjunction": Object.freeze({
    family: "particle-sentence",
    issuerCapabilityName:
      "issueClassicalNahuatlParticleSentenceBindingFrame",
    validatorCapabilityName:
      "isClassicalNahuatlParticleSentenceBindingFrame",
  }),
  "particle:negative-selection": Object.freeze({
    family: "particle-sentence",
    issuerCapabilityName:
      "issueClassicalNahuatlParticleSentenceBindingFrame",
    validatorCapabilityName:
      "isClassicalNahuatlParticleSentenceBindingFrame",
  }),
  "vnc:application": Object.freeze({
    family: "vnc-continuation",
    issuerCapabilityName:
      "issueClassicalNahuatlVncContinuationBindingFrame",
    validatorCapabilityName:
      "isClassicalNahuatlVncContinuationBindingFrame",
  }),
  "vnc:ordered-voice-application": Object.freeze({
    family: "vnc-continuation",
    issuerCapabilityName:
      "issueClassicalNahuatlVncContinuationBindingFrame",
    validatorCapabilityName:
      "isClassicalNahuatlVncContinuationBindingFrame",
  }),
  "vnc:derivational-operation": Object.freeze({
    family: "vnc-continuation",
    issuerCapabilityName:
      "issueClassicalNahuatlVncContinuationBindingFrame",
    validatorCapabilityName:
      "isClassicalNahuatlVncContinuationBindingFrame",
  }),
  "sentence:supplementation": Object.freeze({
    family: "clause-relation",
    issuerCapabilityName: "issueClassicalClauseRelationBindingFrame",
    validatorCapabilityName: "isClassicalClauseRelationBindingFrame",
  }),
  "nnc:adjectival-modification": Object.freeze({
    family: "clause-relation",
    issuerCapabilityName: "issueClassicalClauseRelationBindingFrame",
    validatorCapabilityName: "isClassicalClauseRelationBindingFrame",
  }),
  "clause:adverbial-adjunction": Object.freeze({
    family: "clause-relation",
    issuerCapabilityName: "issueClassicalClauseRelationBindingFrame",
    validatorCapabilityName: "isClassicalClauseRelationBindingFrame",
  }),
  "clause:composition": Object.freeze({
    family: "clause-relation",
    issuerCapabilityName: "issueClassicalClauseRelationBindingFrame",
    validatorCapabilityName: "isClassicalClauseRelationBindingFrame",
  }),
  "clause:comparison": Object.freeze({
    family: "clause-relation",
    issuerCapabilityName: "issueClassicalClauseRelationBindingFrame",
    validatorCapabilityName: "isClassicalClauseRelationBindingFrame",
  }),
  "nnc:place-gentilic": Object.freeze({
    family: "formation",
    issuerCapabilityName:
      "issueClassicalGrammarFormationResultBindingFrame",
    validatorCapabilityName:
      "isClassicalGrammarFormationResultBindingFrame",
  }),
  "nnc:adverbial": Object.freeze({
    family: "formation",
    issuerCapabilityName:
      "issueClassicalGrammarFormationResultBindingFrame",
    validatorCapabilityName:
      "isClassicalGrammarFormationResultBindingFrame",
  }),
  "vnc:denominal": Object.freeze({
    family: "formation",
    issuerCapabilityName:
      "issueClassicalGrammarFormationResultBindingFrame",
    validatorCapabilityName:
      "isClassicalGrammarFormationResultBindingFrame",
  }),
  "nnc:personal-name": Object.freeze({
    family: "formation",
    issuerCapabilityName:
      "issueClassicalGrammarFormationResultBindingFrame",
    validatorCapabilityName:
      "isClassicalGrammarFormationResultBindingFrame",
  }),
});

// These slots observe an exact Result that an owner actually consumed during
// one execution. They record local Result history only; unlike the continuation
// type contracts above, they neither advertise nor authorize another route.
const CLASSICAL_GRAMMAR_APPLICATION_INSTANCE_CONTINUATION_SLOTS =
  Object.freeze({
    "vnc:application": Object.freeze({
      outputKind: DEFAULT_APPLICATION_OUTPUT_KIND,
      argumentIndex: 1,
      projectionCapabilityName:
        "getClassicalNahuatlVncContinuationSourceConstituents",
      unitKind: "vnc-result",
    }),
  });

function defineAxisSemanticFactRoles(roles = {}) {
  return Object.freeze({ ...roles });
}

// Owner-declared semantic taxonomy for the Lesson 2-19 application routes.
// These declarations describe what each existing axis is; they do not create
// another source model or allow the aggregate inventory to infer authority.
const FOUNDATION_AXIS_SEMANTIC_FACT_ROLES = Object.freeze({
  "concept:classification": defineAxisSemanticFactRoles({
    "typed-concept-source": "lexical-fact",
    "read-only-classification": "derived-fact",
    "concept-rank-validation": "derived-fact",
    "concept-authority-rejection": "derived-fact",
    "non-generative-projection": "derived-fact",
  }),
  "classical.morpheme.silent.contrast.validate": defineAxisSemanticFactRoles({
    "silent-candidate-kind": "lexical-fact",
    "corresponding-position": "boundary-conditioned-fact",
    "similar-structure": "boundary-conditioned-fact",
    "related-category": "contextual-fact",
    "sounded-counterpart": "boundary-conditioned-fact",
  }),
  "classical.linguistic.unit.compose": defineAxisSemanticFactRoles({
    medium: "contextual-fact",
    "sequence-order": "boundary-conditioned-fact",
    "structure-pattern": "boundary-conditioned-fact",
    "constituent-units": "contextual-fact",
    "resulting-unity": "derived-fact",
  }),
  "classical.linguistic.structure.recurse": defineAxisSemanticFactRoles({
    "prior-structured-unit": "contextual-fact",
    "next-constituent-unit": "contextual-fact",
    "retained-operation-lineage": "derived-fact",
    "recursive-unity": "derived-fact",
  }),
  "classical.linguistic.unit.discontinuity.validate": defineAxisSemanticFactRoles({
    "typed-unit-kind": "contextual-fact",
    "constituent-roles": "contextual-fact",
    "nonjuxtaposed-topology": "boundary-conditioned-fact",
    "functional-cohesion": "derived-fact",
    "restricted-applicability": "boundary-conditioned-fact",
  }),
  "classical.carrier.meaningless-unit.classify": defineAxisSemanticFactRoles({
    "candidate-kind": "lexical-fact",
    "carrier-subsystem": "derived-fact",
    "analysis-level": "derived-fact",
    "meaning-exclusion": "boundary-conditioned-fact",
  }),
  "classical.carrier.rank.taxonomy.classify": defineAxisSemanticFactRoles({
    "carrier-subsystem": "contextual-fact",
    "rank-tier": "contextual-fact",
    "rank-identity": "derived-fact",
    "rank-order": "derived-fact",
  }),
  "classical.carrier.rank.form": defineAxisSemanticFactRoles({
    "source-unit-rank": "contextual-fact",
    "target-unit-rank": "contextual-fact",
    "formation-kind": "derived-fact",
    "rank-upgrade": "boundary-conditioned-fact",
  }),
  "classical.carrier.syllable.compose": defineAxisSemanticFactRoles({
    "vowel-center": "boundary-conditioned-fact",
    "consonant-margins": "boundary-conditioned-fact",
    "language-specific-structure": "architecture-invariant",
    "meaningless-unit": "derived-fact",
  }),
  "classical.carrier.vocable.compose": defineAxisSemanticFactRoles({
    "syllable-constituents": "contextual-fact",
    "vocable-rank": "contextual-fact",
    "word-syllable-perspective": "derived-fact",
    "monosyllabic-upgrade": "boundary-conditioned-fact",
  }),
  "classical.carrier.vocable.prosody.validate": defineAxisSemanticFactRoles({
    "polysyllabic-vocable": "contextual-fact",
    "stressed-syllable": "contextual-fact",
    "stress-applicability": "boundary-conditioned-fact",
  }),
  "classical.carrier.phonotactic.constraints.validate": defineAxisSemanticFactRoles({
    "carrier-structure": "contextual-fact",
    "language-specific-phonotactics": "architecture-invariant",
    "possible-sequence": "boundary-conditioned-fact",
    "meaningful-surface-conformance": "boundary-conditioned-fact",
  }),
  "classical.morpheme.meaningful-unit.classify": defineAxisSemanticFactRoles({ "candidate-kind": "lexical-fact", "meaningful-family": "derived-fact" }),
  "classical.morpheme.syllable.separate": defineAxisSemanticFactRoles({ "meaningful-unit": "contextual-fact", "syllable-rank": "contextual-fact", "rank-contrast": "derived-fact", coterminality: "boundary-conditioned-fact" }),
  "classical.morpheme.combinatorial-type.classify": defineAxisSemanticFactRoles({ "meaningful-unit": "contextual-fact", "major-minor-type": "derived-fact", "representational-center": "derived-fact", "affixal-status": "derived-fact" }),
  "classical.morpheme.affix.position.classify": defineAxisSemanticFactRoles({ "minor-morpheme": "contextual-fact", "sequence-position": "boundary-conditioned-fact", "affix-position-class": "derived-fact" }),
  "classical.morpheme.affix.function.classify": defineAxisSemanticFactRoles({ "affix-position": "contextual-fact", "information-role": "contextual-fact", "stem-boundary": "boundary-conditioned-fact", "functional-type": "derived-fact" }),
  "classical.morpheme.inflectional-paradigm.classify": defineAxisSemanticFactRoles({ "inflectional-affix": "contextual-fact", "common-stem": "architecture-invariant", "stem-class": "contextual-fact", "variant-set": "derived-fact" }),
  "classical.structure.post-stem-unit.classify": defineAxisSemanticFactRoles({ "rank-result": "contextual-fact", "unit-disposition": "boundary-conditioned-fact", "nuclear-clause-rank": "derived-fact" }),
  "classical.morpheme.inflectional-dyad.analyze": defineAxisSemanticFactRoles({ "first-affix": "contextual-fact", "second-affix": "contextual-fact", "inseparable-sequence": "boundary-conditioned-fact", "dyad-structure": "derived-fact" }),
  "classical.morpheme.inflectional-affix.demote": defineAxisSemanticFactRoles({ "inflectional-affix": "contextual-fact", "process-kind": "genuine-user-choice", "source-boundary": "contextual-fact", "target-boundary": "boundary-conditioned-fact" }),
  "classical.morpheme.meaningful-rank.hierarchy.validate": defineAxisSemanticFactRoles({ "major-type": "contextual-fact", "minor-type": "contextual-fact", "rank-stages": "architecture-invariant", "lower-stage-dependency": "architecture-invariant" }),
  "classical.structure.meaningful-rank.source-or-upgrade.validate": defineAxisSemanticFactRoles({ hierarchy: "contextual-fact", "source-rank": "contextual-fact", "target-rank": "contextual-fact", "transition-mode": "genuine-user-choice" }),
  "classical.structure.meaningful-rank.downgrade": defineAxisSemanticFactRoles({ hierarchy: "contextual-fact", "higher-rank": "contextual-fact", "lower-rank": "contextual-fact", "downgrade-mode": "genuine-user-choice" }),
  "classical.structure.root.major-morpheme.validate": defineAxisSemanticFactRoles({ "major-type": "contextual-fact", "major-unit-count": "boundary-conditioned-fact", "root-structure": "derived-fact" }),
  "classical.structure.stem.form-directly": defineAxisSemanticFactRoles({ "base-unit": "contextual-fact", "derivational-affix": "contextual-fact", "formation-kind": "genuine-user-choice", "stem-result": "derived-fact" }),
  "classical.structure.stem.form-via-stock": defineAxisSemanticFactRoles({ root: "contextual-fact", "derivational-suffix": "contextual-fact", "stock-stage": "derived-fact", "stem-result": "derived-fact" }),
  "classical.structure.stem.compound": defineAxisSemanticFactRoles({ "first-stem": "contextual-fact", "second-stem": "contextual-fact", "compound-relation": "genuine-user-choice", "stem-result": "derived-fact" }),
  "classical.structure.meaning-bearing-unit.classify": defineAxisSemanticFactRoles({ unit: "contextual-fact", "unit-rank": "contextual-fact", "meaning-component": "derived-fact" }),
  "classical.structure.stem.lexical-status.classify": defineAxisSemanticFactRoles({ stem: "contextual-fact", "lexical-status": "derived-fact", "lexicon-membership": "derived-fact" }),
  "classical.structure.root.meaning-rank.upgrade": defineAxisSemanticFactRoles({ root: "contextual-fact", "rank-upgrade": "contextual-fact", "source-meaning": "contextual-fact", "target-meaning": "derived-fact" }),
  "concept.word.sentence-fragment.analyze": defineAxisSemanticFactRoles({ "word-rank": "contextual-fact", "sentence-fragment": "architecture-invariant", "simple-word-exception": "boundary-conditioned-fact" }),
  "classical.structure.stem-transition-zone.validate": defineAxisSemanticFactRoles({ stem: "contextual-fact", "post-stem-unit": "contextual-fact", "derivation-boundary": "architecture-invariant", "inflection-onset": "architecture-invariant" }),
  "classical.nuclear-clause.morphosyntax.validate": defineAxisSemanticFactRoles({ "nuclear-clause": "contextual-fact", subject: "derived-fact", predicate: "derived-fact", "morphosyntax-domain": "architecture-invariant" }),
  "classical.structure.group.compose": defineAxisSemanticFactRoles({ particles: "contextual-fact", "nuclear-clauses": "contextual-fact", "group-shape": "genuine-user-choice", "group-result": "derived-fact" }),
  "classical.structure.syntax-domain-onset.validate": defineAxisSemanticFactRoles({ "group-result": "contextual-fact", "group-rank": "derived-fact", "syntax-domain": "architecture-invariant" }),
  "concept.structure.principles.analyze": defineAxisSemanticFactRoles({ "structure-facet": "contextual-fact", "structuring-principles": "architecture-invariant", concatenation: "architecture-invariant", "unit-closure": "derived-fact" }),
  "concept.structure.governance-taxonomy.analyze": defineAxisSemanticFactRoles({ governance: "architecture-invariant", "general-type": "derived-fact", "function-unit-coupling": "boundary-conditioned-fact", "governance-subtype": "derived-fact" }),
  "concept.structure.adjunctive-governance.analyze": defineAxisSemanticFactRoles({ governor: "derived-fact", adjunct: "derived-fact", "predicate-structure": "boundary-conditioned-fact", "relation-structure": "boundary-conditioned-fact", modification: "boundary-conditioned-fact", "function-unit-filler": "contextual-fact", adjunctor: "boundary-conditioned-fact", "agreement-case": "contextual-fact" }),
  "concept.structure.conjunctive-governance.analyze": defineAxisSemanticFactRoles({ conjuncts: "contextual-fact", "equal-governance": "architecture-invariant", "conjunct-filler-class": "contextual-fact" }),
  "classical.structure.level-distribution.validate": defineAxisSemanticFactRoles({ "morphological-level": "contextual-fact", "morphosyntactical-level": "contextual-fact", "syntactical-level": "contextual-fact", "cross-level-distribution": "architecture-invariant" }),
  "classical.structure.participant-role.analyze": defineAxisSemanticFactRoles({ participant: "contextual-fact", "event-relation": "contextual-fact", "participant-role": "derived-fact", "entitive-function-unit": "contextual-fact" }),
  "classical.structure.conceptual-plane.separate": defineAxisSemanticFactRoles({ "function-unit-plane": "architecture-invariant", "form-class-plane": "architecture-invariant", "lexical-item-plane": "architecture-invariant", "participant-role-plane": "architecture-invariant", nonintermingling: "boundary-conditioned-fact" }),
  "classical.authority.source-language.firewall.enforce": defineAxisSemanticFactRoles({ "interpretive-provenance": "contextual-fact", "source-language-authority": "architecture-invariant", "interpretive-bias": "contextual-fact", "grammar-firewall": "architecture-invariant" }),
  "classical.source.phonological-identity.validate": defineAxisSemanticFactRoles({ "vowel-length": "contextual-fact", "glottal-stop": "contextual-fact", "lexical-identity": "derived-fact", "dictionary-collapse": "boundary-conditioned-fact" }),
  "classical.verbstem.object-embed.validate": defineAxisSemanticFactRoles({ "object-prefix": "contextual-fact", "embedded-nounstem": "contextual-fact", valence: "derived-fact", "stem-boundary": "derived-fact" }),
  "classical.particle.lexical-distinction.authorize": defineAxisSemanticFactRoles({ "particle-identity": "derived-fact", "particle-sequence": "derived-fact", liaison: "boundary-conditioned-fact", "dictionary-head": "contextual-fact" }),
  "classical.verbstem.lexicon.authorize": defineAxisSemanticFactRoles({ "verbstem-identity": "derived-fact", valence: "derived-fact", "canonical-meaning": "derived-fact", "dictionary-head": "contextual-fact" }),
  "classical.vnc.compound.widowhood.interpret": defineAxisSemanticFactRoles({ "compound-verbstem": "contextual-fact", "subject-person-number": "contextual-fact", "participant-sex": "derived-fact", "widowhood-meaning": "derived-fact" }),
  "classical.nnc.exotl.interpret": defineAxisSemanticFactRoles({ "nominal-clause": "derived-fact", "silent-subject": "derived-fact", "compositional-meaning": "derived-fact", "semantic-weighting": "derived-fact" }),
  "classical.sentence.tleh-admonitory-pair.interpret": defineAxisSemanticFactRoles({ "question-forms": "derived-fact", "honored-subject": "derived-fact", "nonhuman-object": "derived-fact", "rhetorical-force": "contextual-fact", "expected-answer": "contextual-fact" }),
  "classical.sentence.tleh-closing-vocative.interpret": defineAxisSemanticFactRoles({ "closing-question": "derived-fact", "honored-subject": "derived-fact", vocatives: "derived-fact", "pragmatic-force": "contextual-fact", "translation-boundary": "architecture-invariant" }),
  "classical.nnc.king-praise-role-contrast.interpret": defineAxisSemanticFactRoles({ "actual-forms": "derived-fact", "substituted-forms": "contextual-fact", "subject-possessor-relation": "derived-fact", "participant-roles": "derived-fact", "corrected-meaning": "derived-fact" }),
  "orthography:transcription": defineAxisSemanticFactRoles({
    "transcription-source": "lexical-fact",
    "phonological-boundary": "boundary-conditioned-fact",
    "orthographic-realization": "boundary-conditioned-fact",
  }),
  "phonology:phone-source-assignment": defineAxisSemanticFactRoles({
    "morphemic-source": "lexical-fact",
    "underlying-phoneme": "lexical-fact",
    "realized-phone": "boundary-conditioned-fact",
    "written-result": "derived-fact",
  }),
  "phonology:segment-realization": defineAxisSemanticFactRoles({
    "source-segment": "lexical-fact",
    "phonic-repertory": "lexical-fact",
    "phonological-environment": "boundary-conditioned-fact",
    "written-result": "derived-fact",
  }),
  "phonology:stress": defineAxisSemanticFactRoles({
    "written-vocable": "lexical-fact",
    "stress-group": "boundary-conditioned-fact",
    "stressed-syllable": "derived-fact",
  }),
  "phonology:spelling-change": defineAxisSemanticFactRoles({
    "source-segment": "lexical-fact",
    "phonological-environment": "boundary-conditioned-fact",
    "written-result": "derived-fact",
  }),
  "phonology:lateral-reading": defineAxisSemanticFactRoles({
    "written-vocable": "lexical-fact",
    "intended-meaning": "contextual-fact",
    "phonological-length": "derived-fact",
    "written-result": "derived-fact",
  }),
  "phonology:syllabify": defineAxisSemanticFactRoles({
    "written-vocable": "lexical-fact",
    "vowel-centers": "derived-fact",
    "syllable-boundaries": "derived-fact",
  }),
  "phonology:supportive-vowel": defineAxisSemanticFactRoles({
    "source-segments": "lexical-fact",
    pronounceability: "boundary-conditioned-fact",
    "supportive-i-realization": "derived-fact",
  }),
  "phonology:open-transition": defineAxisSemanticFactRoles({
    "first-stem-edge": "lexical-fact",
    "second-stem-edge": "lexical-fact",
    "open-transition-realization": "derived-fact",
  }),
  "phonology:consonant-length": defineAxisSemanticFactRoles({
    "first-consonant": "lexical-fact",
    "second-consonant": "lexical-fact",
    "long-consonant-realization": "derived-fact",
  }),
  "phonology:progressive-assimilation": defineAxisSemanticFactRoles({
    "left-morph": "lexical-fact",
    "right-morph": "lexical-fact",
    "progressive-boundary-realization": "derived-fact",
  }),
  "phonology:assimilation": defineAxisSemanticFactRoles({
    "first-consonant": "lexical-fact",
    "second-consonant": "lexical-fact",
    "regressive-boundary-realization": "derived-fact",
  }),
  "phonology:consonant-loss": defineAxisSemanticFactRoles({
    "first-consonant": "lexical-fact",
    "second-consonant": "lexical-fact",
    "loss-result": "derived-fact",
  }),
  "phonology:consonant-shift": defineAxisSemanticFactRoles({
    "source-consonant": "lexical-fact",
    "phonological-environment": "boundary-conditioned-fact",
    "shift-result": "derived-fact",
  }),
  "phonology:vowel-elision": defineAxisSemanticFactRoles({
    "source-morpheme": "lexical-fact",
    "stress-group-environment": "boundary-conditioned-fact",
    "elided-result": "derived-fact",
  }),
  "sentence:adverbial-adjunction": defineAxisSemanticFactRoles({
    "sentence-adverbial": "lexical-fact",
    "clause-scope": "contextual-fact",
    "sentence-position": "derived-fact",
  }),
  "sentence:particle-adjunction": defineAxisSemanticFactRoles({
    "sentence-particle": "lexical-fact",
    honorificization: "genuine-user-choice",
    "sentence-position": "derived-fact",
  }),
  "particle:result": defineAxisSemanticFactRoles({
    "particle-identity": "lexical-fact",
    "particle-function": "lexical-fact",
    "particle-placement": "lexical-fact",
    "particle-semantic-marker": "lexical-fact",
  }),
  "particle:negative-selection": defineAxisSemanticFactRoles({
    polarity: "genuine-user-choice",
    "preceding-particle": "contextual-fact",
    "sentence-kind": "genuine-user-choice",
    "negative-particle-selection": "derived-fact",
  }),
  "vnc:nuclear-clause": defineAxisSemanticFactRoles({
    "basal-unit": "derived-fact",
    "source-transitivity": "lexical-fact",
    "participant-structure": "contextual-fact",
    "predicate-stem": "lexical-fact",
  }),
  "vnc:finite-slot": defineAxisSemanticFactRoles({
    "subject-person-number": "contextual-fact",
    mood: "genuine-user-choice",
    tense: "genuine-user-choice",
    "finite-slot-order": "derived-fact",
  }),
  "vnc:transitive-object": defineAxisSemanticFactRoles({
    "object-kind": "contextual-fact",
    "object-person-number": "contextual-fact",
    valence: "lexical-fact",
    "object-prefix": "derived-fact",
  }),
  "vnc:source-selection": defineAxisSemanticFactRoles({
    "source-stem": "lexical-fact",
    "embed-matrix-structure": "contextual-fact",
    "source-selection": "lexical-fact",
  }),
  "vnc:verbstem-class": defineAxisSemanticFactRoles({
    "verbstem-class": "lexical-fact",
    "stem-alternation": "lexical-fact",
    "mood-tense-allomorphy": "contextual-fact",
    "finite-realization": "boundary-conditioned-fact",
  }),
  "nnc:diagram": defineAxisSemanticFactRoles({
    "subject-constituent": "derived-fact",
    "predicate-constituent": "derived-fact",
    "nnc-slot-projection": "derived-fact",
  }),
  "vnc:diagram": defineAxisSemanticFactRoles({
    "subject-circumfix": "derived-fact",
    "object-prefix": "derived-fact",
    "predicate-constituent": "derived-fact",
    "vnc-slot-projection": "derived-fact",
  }),
  "vnc:finite-surface": defineAxisSemanticFactRoles({
    "selected-formula": "derived-fact",
    "finite-boundary-realization": "boundary-conditioned-fact",
    "word-surface": "boundary-conditioned-fact",
  }),
  "vnc:sentence-result": defineAxisSemanticFactRoles({
    "authorized-vnc-result": "derived-fact",
    "sentence-composition": "derived-fact",
    "sentence-realization": "boundary-conditioned-fact",
  }),
  "nnc:sentence-surface": defineAxisSemanticFactRoles({
    "nnc-state": "derived-fact",
    "sentence-force": "genuine-user-choice",
    polarity: "genuine-user-choice",
    "contextual-interpretation": "contextual-fact",
  }),
  "nnc:ordinary": defineAxisSemanticFactRoles({
    "nounstem-source": "lexical-fact",
    "nounstem-class": "genuine-user-choice",
    "nnc-state": "genuine-user-choice",
    "subject-person-number": "genuine-user-choice",
    "possessor-person-number": "genuine-user-choice",
    "stem-relation": "genuine-user-choice",
    "predicate-formation": "genuine-user-choice",
    "possessor-reduplication": "genuine-user-choice",
    "sentence-force": "genuine-user-choice",
    polarity: "genuine-user-choice",
    "state-availability": "lexical-fact",
    "referential-animacy": "contextual-fact",
    "use-stem-shape": "lexical-fact",
    "lexical-alternative": "lexical-fact",
    "number-dyad": "derived-fact",
    "source-stem": "lexical-fact",
    "target-stem": "derived-fact",
    "state-reentry": "derived-fact",
    "ordinary-nnc-condition": "derived-fact",
    "possessive-formation": "derived-fact",
    "possessor-st2-allomorph": "boundary-conditioned-fact",
    "possessor-st2-boundary-context": "boundary-conditioned-fact",
    "sentence-composition": "derived-fact",
    "lexical-license": "lexical-fact",
    "formula-projection": "derived-fact",
    "written-boundary-realization": "boundary-conditioned-fact",
  }),
  "nnc:pronominal": defineAxisSemanticFactRoles({
    "pronominal-source": "lexical-fact",
    "pronominal-family": "lexical-fact",
    "subject-person-number": "contextual-fact",
    "number-realization": "boundary-conditioned-fact",
    "pronominal-context": "contextual-fact",
    "quantitive-embed": "lexical-fact",
    "quantitive-matrix": "lexical-fact",
    "matrix-family": "lexical-fact",
    "matrix-form": "lexical-fact",
    "predicate-pluralization": "derived-fact",
    "lexical-restriction": "lexical-fact",
    "clause-position": "contextual-fact",
    "discourse-role": "contextual-fact",
    "sentence-force": "genuine-user-choice",
    polarity: "genuine-user-choice",
    "formula-projection": "derived-fact",
    "written-boundary-realization": "boundary-conditioned-fact",
  }),
  "sentence:supplementation": defineAxisSemanticFactRoles({
    "principal-clause": "contextual-fact",
    "supplement-clause": "contextual-fact",
    "shared-referent": "contextual-fact",
    "supplement-relation": "genuine-user-choice",
    "clause-order": "genuine-user-choice",
    vocative: "derived-fact",
    "reported-speech": "derived-fact",
  }),
});

function defineAxisConstraint({
  constraintId,
  licensedProbeCoordinate,
  ownerCoordinatePath,
  ownerCoordinateProjectionKind = "direct",
} = {}) {
  const predicateValueKind = Array.isArray(licensedProbeCoordinate)
    ? "array"
    : licensedProbeCoordinate && typeof licensedProbeCoordinate === "object"
      ? "object"
      : typeof licensedProbeCoordinate;
  return Object.freeze({
    axisConstraintId: constraintId,
    licensedProbeCoordinate,
    unlicensedProbeCoordinate: predicateValueKind === "boolean"
      ? "__classical-owner-axis-coordinate-unlicensed__"
      : Object.freeze({
        kind: "classical-owner-axis-coordinate-unlicensed",
      }),
    predicateValueKinds: Object.freeze([predicateValueKind]),
    ownerCoordinatePath: Object.freeze([...ownerCoordinatePath]),
    ownerCoordinateProjectionKind,
  });
}

// Each proof coordinate is read from the issued canonical result of its owning
// operation. The negative coordinate is deliberately outside that projection;
// a merely nonempty caller value therefore cannot satisfy the owner predicate.
const FOUNDATION_AXIS_CONSTRAINT_DECLARATIONS = Object.freeze({
  "sentence:particle-adjunction": Object.freeze({
    honorificization: defineAxisConstraint({
      constraintId: "lesson3-particle-honorificization-selected",
      licensedProbeCoordinate: false,
      ownerCoordinatePath: ["honorificizedRequested"],
    }),
  }),
  "vnc:finite-slot": Object.freeze({
    mood: defineAxisConstraint({
      constraintId: "finite-vnc-mood-selected",
      licensedProbeCoordinate: "indicative",
      ownerCoordinatePath: ["mood"],
    }),
    tense: defineAxisConstraint({
      constraintId: "finite-vnc-tense-selected",
      licensedProbeCoordinate: "present",
      ownerCoordinatePath: ["tense"],
    }),
  }),
  "nnc:sentence-surface": Object.freeze({
    "sentence-force": defineAxisConstraint({
      constraintId: "lessons12-16-nnc-sentence-force-selected",
      licensedProbeCoordinate: "assertion",
      ownerCoordinatePath: ["sentenceType"],
    }),
    polarity: defineAxisConstraint({
      constraintId: "lessons12-16-nnc-polarity-selected",
      licensedProbeCoordinate: "positive",
      ownerCoordinatePath: ["polarity"],
    }),
  }),
  "nnc:ordinary": Object.freeze({
    "nnc-state": defineAxisConstraint({
      constraintId: "ordinary-nnc-state-selected",
      licensedProbeCoordinate: "possessive",
      ownerCoordinatePath: ["operationFrame", "state"],
    }),
    "subject-person-number": defineAxisConstraint({
      constraintId: "ordinary-nnc-subject-selected",
      licensedProbeCoordinate: "1sg",
      ownerCoordinatePath: ["operationFrame", "subject"],
    }),
    "possessor-person-number": defineAxisConstraint({
      constraintId: "ordinary-nnc-possessor-selected",
      licensedProbeCoordinate: "3sg",
      ownerCoordinatePath: ["operationFrame", "possessor"],
    }),
    "stem-relation": defineAxisConstraint({
      constraintId: "ordinary-nnc-stem-relation-selected",
      licensedProbeCoordinate: "plain",
      ownerCoordinatePath: ["operationFrame", "stemFormation"],
    }),
    "predicate-formation": defineAxisConstraint({
      constraintId: "ordinary-nnc-predicate-formation-selected",
      licensedProbeCoordinate: "source-stem",
      ownerCoordinatePath: ["operationFrame", "predicateFormation"],
    }),
    "possessor-reduplication": defineAxisConstraint({
      constraintId: "ordinary-nnc-possessor-reduplication-selected",
      licensedProbeCoordinate: false,
      ownerCoordinatePath: ["operationFrame", "possessorReduplication"],
    }),
    "sentence-force": defineAxisConstraint({
      constraintId: "ordinary-nnc-sentence-force-selected",
      licensedProbeCoordinate: "statement",
      ownerCoordinatePath: ["operationFrame", "sentenceType"],
    }),
    polarity: defineAxisConstraint({
      constraintId: "ordinary-nnc-polarity-selected",
      licensedProbeCoordinate: "positive",
      ownerCoordinatePath: ["operationFrame", "polarity"],
    }),
  }),
  "nnc:pronominal": Object.freeze({
    "sentence-force": defineAxisConstraint({
      constraintId: "pronominal-nnc-sentence-force-selected",
      licensedProbeCoordinate: "statement",
      ownerCoordinatePath: ["operationFrame", "sentenceType"],
    }),
    polarity: defineAxisConstraint({
      constraintId: "pronominal-nnc-polarity-selected",
      licensedProbeCoordinate: "positive",
      ownerCoordinatePath: ["operationFrame", "polarity"],
    }),
  }),
  "sentence:supplementation": Object.freeze({
    "supplement-relation": defineAxisConstraint({
      constraintId: "lessons17-19-supplement-relation-selected",
      licensedProbeCoordinate: "identical",
      ownerCoordinatePath: ["referenceFrame", "referenceRelationship"],
    }),
    "clause-order": defineAxisConstraint({
      constraintId: "lessons17-19-clause-order-selected",
      licensedProbeCoordinate: "principal-first",
      ownerCoordinatePath: ["linearizationFrame", "order"],
    }),
  }),
});

function defineCanonicalResultContract(...resultKinds) {
  return Object.freeze({
    resultKinds: Object.freeze(resultKinds),
  });
}

// Result identity is route-specific. A capability call does not become
// canonical merely because it returned a non-null object.
const CANONICAL_RESULT_CONTRACTS = Object.freeze({
  "concept:classification": defineCanonicalResultContract(
    "classical-grammar-concept-result",
  ),
  "classical.morpheme.silent.contrast.validate": defineCanonicalResultContract(
    "classical-silent-morph-contrast-result",
  ),
  "classical.linguistic.unit.compose": defineCanonicalResultContract(
    "classical-linguistic-unit-composition-result",
  ),
  "classical.linguistic.structure.recurse": defineCanonicalResultContract(
    "classical-linguistic-structure-recursion-result",
  ),
  "classical.linguistic.unit.discontinuity.validate": defineCanonicalResultContract(
    "classical-discontinuous-unit-admissibility-result",
  ),
  "classical.carrier.meaningless-unit.classify": defineCanonicalResultContract(
    "classical-meaningless-carrier-unit-classification-result",
  ),
  "classical.carrier.rank.taxonomy.classify": defineCanonicalResultContract(
    "classical-carrier-rank-taxonomy-result",
  ),
  "classical.carrier.rank.form": defineCanonicalResultContract(
    "carrier-rank-formation-result",
  ),
  "classical.carrier.syllable.compose": defineCanonicalResultContract(
    "classical-syllable-structure-result",
  ),
  "classical.carrier.vocable.compose": defineCanonicalResultContract(
    "carrier-vocable-structure-result",
  ),
  "classical.carrier.vocable.prosody.validate": defineCanonicalResultContract(
    "carrier-vocable-prosody-result",
  ),
  "classical.carrier.phonotactic.constraints.validate": defineCanonicalResultContract(
    "carrier-phonotactic-surface-constraints-result",
  ),
  "classical.morpheme.meaningful-unit.classify": defineCanonicalResultContract("classical-meaningful-morpheme-unit-classification-result"),
  "classical.morpheme.syllable.separate": defineCanonicalResultContract("classical-morpheme-syllable-separation-result"),
  "classical.morpheme.combinatorial-type.classify": defineCanonicalResultContract("classical-morpheme-combinatorial-type-classification-result"),
  "classical.morpheme.affix.position.classify": defineCanonicalResultContract("classical-affix-linear-position-classification-result"),
  "classical.morpheme.affix.function.classify": defineCanonicalResultContract("classical-affix-functional-type-classification-result"),
  "classical.morpheme.inflectional-paradigm.classify": defineCanonicalResultContract("classical-inflectional-paradigm-definition-result"),
  "classical.structure.post-stem-unit.classify": defineCanonicalResultContract("classical-nahuatl-post-stem-unit-classification-result"),
  "classical.morpheme.inflectional-dyad.analyze": defineCanonicalResultContract("classical-inflectional-affix-dyad-analysis-result"),
  "classical.morpheme.inflectional-affix.demote": defineCanonicalResultContract("classical-inflectional-affix-stem-internal-demotion-result"),
  "classical.morpheme.meaningful-rank.hierarchy.validate": defineCanonicalResultContract("classical-meaningful-structural-rank-hierarchy-result"),
  "classical.structure.meaningful-rank.source-or-upgrade.validate": defineCanonicalResultContract("classical-meaningful-rank-source-and-upgrade-result"),
  "classical.structure.meaningful-rank.downgrade": defineCanonicalResultContract("classical-meaningful-rank-downgrade-result"),
  "classical.structure.root.major-morpheme.validate": defineCanonicalResultContract("classical-root-major-morpheme-definition-result"),
  "classical.structure.stem.form-directly": defineCanonicalResultContract("classical-direct-stem-formation-result"),
  "classical.structure.stem.form-via-stock": defineCanonicalResultContract("classical-stock-mediated-stem-formation-result"),
  "classical.structure.stem.compound": defineCanonicalResultContract("classical-compound-stem-formation-result"),
  "classical.structure.meaning-bearing-unit.classify": defineCanonicalResultContract("classical-lexeme-bearing-unit-classification-result"),
  "classical.structure.stem.lexical-status.classify": defineCanonicalResultContract("classical-stem-lexical-item-classification-result"),
  "classical.structure.root.meaning-rank.upgrade": defineCanonicalResultContract("classical-root-meaning-rank-upgrade-result"),
  "concept.word.sentence-fragment.analyze": defineCanonicalResultContract("comparative-word-sentence-fragment-analysis-result"),
  "classical.structure.stem-transition-zone.validate": defineCanonicalResultContract("classical-stem-inflection-transition-zone-result"),
  "classical.nuclear-clause.morphosyntax.validate": defineCanonicalResultContract("nuclear-clause-morphosyntax-domain-result"),
  "classical.structure.group.compose": defineCanonicalResultContract("nahuatl-group-composition-result"),
  "classical.structure.syntax-domain-onset.validate": defineCanonicalResultContract("nahuatl-syntax-domain-onset-result"),
  "concept.structure.principles.analyze": defineCanonicalResultContract("linguistic-structure-principles-analysis-result"),
  "concept.structure.governance-taxonomy.analyze": defineCanonicalResultContract("governance-type-taxonomy-result"),
  "concept.structure.adjunctive-governance.analyze": defineCanonicalResultContract("adjunctive-governance-analysis-result"),
  "concept.structure.conjunctive-governance.analyze": defineCanonicalResultContract("conjunctive-governance-analysis-result"),
  "classical.structure.level-distribution.validate": defineCanonicalResultContract("nahuatl-structure-level-distribution-result"),
  "classical.structure.participant-role.analyze": defineCanonicalResultContract("participant-role-analysis-result"),
  "classical.structure.conceptual-plane.separate": defineCanonicalResultContract("conceptual-plane-separation-result"),
  "classical.authority.source-language.firewall.enforce": defineCanonicalResultContract("translation-authority-boundary-result"),
  "classical.source.phonological-identity.validate": defineCanonicalResultContract("classical-phonological-distinction-result"),
  "classical.verbstem.object-embed.validate": defineCanonicalResultContract("classical-object-embed-distinction-result"),
  "classical.particle.lexical-distinction.authorize": defineCanonicalResultContract("classical-particle-lexical-distinction-result"),
  "classical.verbstem.lexicon.authorize": defineCanonicalResultContract("classical-verbstem-lexicon-result"),
  "classical.vnc.compound.widowhood.interpret": defineCanonicalResultContract("classical-nahuatl-widowhood-compound-interpretation-result"),
  "classical.nnc.exotl.interpret": defineCanonicalResultContract("classical-nahuatl-exotl-interpretation-result"),
  "classical.sentence.tleh-admonitory-pair.interpret": defineCanonicalResultContract("classical-nahuatl-tleh-admonitory-pair-result"),
  "classical.sentence.tleh-closing-vocative.interpret": defineCanonicalResultContract("classical-nahuatl-tleh-closing-vocative-result"),
  "classical.nnc.king-praise-role-contrast.interpret": defineCanonicalResultContract("classical-nahuatl-king-praise-role-contrast-result"),
  "orthography:transcription": defineCanonicalResultContract(
    "classical-nahuatl-transcription-frame",
  ),
  "phonology:syllabify": defineCanonicalResultContract(
    "classical-nahuatl-transcription-analysis-frame",
  ),
  "phonology:supportive-vowel": defineCanonicalResultContract(
    "classical-nahuatl-transcription-analysis-frame",
  ),
  "phonology:open-transition": defineCanonicalResultContract(
    "classical-nahuatl-transcription-analysis-frame",
  ),
  "phonology:consonant-length": defineCanonicalResultContract(
    "classical-nahuatl-transcription-analysis-frame",
  ),
  "phonology:progressive-assimilation": defineCanonicalResultContract(
    "classical-nahuatl-transcription-analysis-frame",
  ),
  "phonology:assimilation": defineCanonicalResultContract(
    "classical-nahuatl-transcription-analysis-frame",
  ),
  "phonology:consonant-loss": defineCanonicalResultContract(
    "classical-nahuatl-transcription-analysis-frame",
  ),
  "phonology:consonant-shift": defineCanonicalResultContract(
    "classical-nahuatl-transcription-analysis-frame",
  ),
  "phonology:phone-source-assignment": defineCanonicalResultContract(
    "classical-nahuatl-transcription-analysis-frame",
  ),
  "phonology:segment-realization": defineCanonicalResultContract(
    "classical-nahuatl-transcription-analysis-frame",
  ),
  "phonology:stress": defineCanonicalResultContract(
    "classical-nahuatl-transcription-analysis-frame",
  ),
  "phonology:spelling-change": defineCanonicalResultContract(
    "classical-nahuatl-transcription-analysis-frame",
  ),
  "phonology:lateral-reading": defineCanonicalResultContract(
    "classical-nahuatl-transcription-analysis-frame",
  ),
  "phonology:vowel-elision": defineCanonicalResultContract(
    "classical-nahuatl-transcription-analysis-frame",
  ),
  "vnc:nuclear-clause": defineCanonicalResultContract(
    "classical-nahuatl-nuclear-clause-structure-result",
  ),
  "vnc:finite-slot": defineCanonicalResultContract(
    "classical-nahuatl-finite-vnc-slot-result",
  ),
  "vnc:finite-surface": defineCanonicalResultContract(
    "classical-nahuatl-vnc-finite-surface-frame",
  ),
  "vnc:sentence-result": defineCanonicalResultContract(
    "classical-nahuatl-vnc-sentence-result-frame",
  ),
  "nnc:ordinary": defineCanonicalResultContract(
    "classical-nahuatl-ordinary-nnc-result-frame",
  ),
  "nnc:sentence-surface": defineCanonicalResultContract(
    "classical-nahuatl-nnc-sentence-surface-frame",
  ),
  "nnc:diagram": defineCanonicalResultContract(
    "classical-nahuatl-nnc-diagrammatic-frame",
  ),
  "vnc:diagram": defineCanonicalResultContract(
    "classical-nahuatl-vnc-diagrammatic-frame",
  ),
  "sentence:adverbial-adjunction": defineCanonicalResultContract(
    "classical-nahuatl-sentence-adverbial-layer-frame",
  ),
  "sentence:particle-adjunction": defineCanonicalResultContract(
    "classical-nahuatl-sentence-particle-layer-frame",
  ),
  "particle:result": defineCanonicalResultContract(
    "classical-nahuatl-particle-result-frame",
  ),
  "particle:negative-selection": defineCanonicalResultContract(
    "classical-nahuatl-negative-particle-selection-frame",
  ),
  "vnc:source-selection": defineCanonicalResultContract(
    "classical-nahuatl-verbstem-fuente-source-selection-frame",
  ),
  "vnc:ordered-voice-chain": defineCanonicalResultContract(
    "classical-nahuatl-ordered-voice-layer-chain-frame",
  ),
  "vnc:ordered-voice-application": defineCanonicalResultContract(
    "classical-nahuatl-ordered-voice-vnc-application-frame",
  ),
  "nnc:pronominal": defineCanonicalResultContract(
    "classical-nahuatl-pronominal-nnc-result-frame",
  ),
  "vnc:derivational-operation": defineCanonicalResultContract(
    "classical-nahuatl-late-vnc-derivation-closure-frame",
  ),
  "vnc:application": defineCanonicalResultContract(
    "classical-nahuatl-vnc-application-frame",
  ),
  "vnc:transitive-object": defineCanonicalResultContract(
    "classical-nahuatl-transitive-vnc-transitive-vnc-object-machinery-frame",
  ),
  "vnc:verbstem-class": defineCanonicalResultContract(
    "classical-nahuatl-verbstem-verbstem-class-machinery-frame",
  ),
  "sentence:supplementation": defineCanonicalResultContract(
    "classical-nahuatl-supplementation-frame",
    "classical-nahuatl-vocative-frame",
    "classical-nahuatl-rumored-report-frame",
    "classical-nahuatl-deleted-principal-frame",
    "classical-nahuatl-negative-ac-plural-frame",
  ),
  "grammar:nominal-construction": defineCanonicalResultContract(
    "classical-nahuatl-nominal-construction-result-frame",
  ),
  "nnc:deverbal-construction": defineCanonicalResultContract(
    "classical-nahuatl-deverbal-nnc-grammar-frame",
  ),
  "nnc:adjectival-modification": defineCanonicalResultContract(
    "classical-nahuatl-adjectival-modification-result-frame",
  ),
  "nnc:adverbial": defineCanonicalResultContract(
    "classical-nahuatl-adverbial-nuclear-result",
  ),
  "nnc:relational": defineCanonicalResultContract(
    "classical-nahuatl-relational-nnc-relational-result",
  ),
  "nnc:place-gentilic": defineCanonicalResultContract(
    "classical-nahuatl-place-gentilic-nnc-frame",
  ),
  "clause:adverbial-adjunction": defineCanonicalResultContract(
    "adverbial-adjunction-ast",
  ),
  "clause:composition": defineCanonicalResultContract(
    "classical-nahuatl-clause-complementation-result-frame",
    "classical-nahuatl-clause-conjunction-result-frame",
  ),
  "clause:comparison": defineCanonicalResultContract(
    "classical-nahuatl-comparison-result-frame",
  ),
  "vnc:denominal": defineCanonicalResultContract(
    "classical-nahuatl-denominal-vnc-result-frame",
  ),
  "nnc:personal-name": defineCanonicalResultContract(
    "classical-nahuatl-personal-name-result",
  ),
});

function defineAdditionalOutputContract(
  capabilityName,
  resultKinds,
  {
    resultCollection = false,
    validatorNames = [],
  } = {},
) {
  return Object.freeze({
    capabilityName,
    resultKinds: Object.freeze(resultKinds),
    resultCollection: resultCollection === true,
    validatorNames: Object.freeze(validatorNames),
  });
}

// Scalar, prepared-plan, and coordinate-projection are output kinds of one
// semantic operation. They do not create lesson-local operation IDs or lanes.
const ADDITIONAL_OUTPUT_CONTRACTS = Object.freeze({
  "nnc:ordinary": Object.freeze({
    [CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.preparedPlan]:
      defineAdditionalOutputContract(
        "prepareClassicalNahuatlOrdinaryNncParadigmPlan",
        ["classical-nahuatl-ordinary-nnc-paradigm-plan"],
        {
          validatorNames: [
            "isClassicalNahuatlOrdinaryNncParadigmPlan",
          ],
        },
      ),
    [CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.coordinateProjection]:
      defineAdditionalOutputContract(
        "projectClassicalNahuatlOrdinaryNncParadigmCoordinates",
        ["classical-nahuatl-ordinary-nnc-paradigm-coordinate-frame"],
        {
          resultCollection: true,
          validatorNames: [
            "isClassicalNahuatlOrdinaryNncParadigmCoordinate",
          ],
        },
      ),
  }),
  "nnc:relational": Object.freeze({
    [CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.preparedPlan]:
      defineAdditionalOutputContract(
        "buildClassicalNahuatlPreparedPlan",
        ["classical-nahuatl-relational-nnc-prepared-plan"],
        {
          validatorNames: [
            "isClassicalNahuatlPreparedPlan",
          ],
        },
      ),
    [CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.coordinateProjection]:
      defineAdditionalOutputContract(
        "projectClassicalNahuatlPreparedCoordinates",
        ["classical-nahuatl-relational-nnc-relational-result"],
        {
          resultCollection: true,
          validatorNames: [
            "isClassicalNahuatlRelationalResult",
          ],
        },
      ),
  }),
  "nnc:pronominal": Object.freeze({
    [CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.preparedPlan]:
      defineAdditionalOutputContract(
        "prepareClassicalNahuatlPronominalNncParadigmPlan",
        ["classical-nahuatl-pronominal-nnc-paradigm-plan"],
        {
          validatorNames: [
            "isClassicalNahuatlPronominalNncParadigmPlan",
          ],
        },
      ),
    [CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.coordinateProjection]:
      defineAdditionalOutputContract(
        "projectClassicalNahuatlPronominalNncParadigmCoordinates",
        ["classical-nahuatl-pronominal-nnc-paradigm-coordinate-frame"],
        {
          resultCollection: true,
          validatorNames: [
            "isClassicalNahuatlPronominalNncParadigmCoordinate",
          ],
        },
      ),
  }),
  "vnc:application": Object.freeze({
    [CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.preparedPlan]:
      defineAdditionalOutputContract(
        "prepareClassicalNahuatlVncParadigmPlan",
        ["classical-nahuatl-vnc-paradigm-generation-plan"],
        {
          validatorNames: [
            "isClassicalNahuatlVncParadigmPlan",
          ],
        },
      ),
    [CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.coordinateProjection]:
      defineAdditionalOutputContract(
        "projectClassicalNahuatlVncParadigmCoordinates",
        ["classical-nahuatl-vnc-paradigm-coordinate-frame"],
        {
          resultCollection: true,
          validatorNames: [
            "isClassicalNahuatlVncParadigmCoordinateFrame",
          ],
        },
      ),
  }),
  "grammar:nominal-construction": Object.freeze({
    [CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.preparedPlan]:
      defineAdditionalOutputContract(
        "buildClassicalNahuatlNominalConstructionParadigmPlan",
        ["classical-nahuatl-nominal-construction-paradigm-plan"],
        {
          validatorNames: [
            "isClassicalNahuatlNominalConstructionParadigmPlan",
          ],
        },
      ),
    [CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.coordinateProjection]:
      defineAdditionalOutputContract(
        "projectClassicalNahuatlNominalConstructionParadigmCoordinates",
        ["classical-nahuatl-nominal-construction-paradigm-coordinate-frame"],
        {
          resultCollection: true,
          validatorNames: [
            "isClassicalNahuatlNominalConstructionParadigmCoordinate",
          ],
        },
      ),
  }),
  "nnc:deverbal-construction": Object.freeze({
    [CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.preparedPlan]:
      defineAdditionalOutputContract(
        "buildClassicalNahuatlDeverbalNncParadigmPlan",
        ["classical-nahuatl-deverbal-nnc-paradigm-plan"],
        {
          validatorNames: [
            "isClassicalNahuatlParadigmPlan",
          ],
        },
      ),
    [CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.coordinateProjection]:
      defineAdditionalOutputContract(
        "projectClassicalNahuatlParadigmCoordinates",
        ["classical-nahuatl-deverbal-nnc-paradigm-coordinate-frame"],
        {
          resultCollection: true,
          validatorNames: [
            "isClassicalNahuatlParadigmCoordinate",
          ],
        },
      ),
  }),
  "nnc:adverbial": Object.freeze({
    [CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.sourcePreparation]:
      defineAdditionalOutputContract(
        "resolveClassicalNahuatlAdverbialPotential",
        ["classical-nahuatl-adverbial-potential-frame"],
        {
          validatorNames: [
            "isClassicalNahuatlAdverbialPotentialFrame",
          ],
        },
      ),
    [CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.preparedPlan]:
      defineAdditionalOutputContract(
        "buildClassicalNahuatlAdverbialNuclearBatchPlan",
        ["classical-nahuatl-adverbial-nuclear-batch-plan"],
        {
          validatorNames: [
            "isClassicalNahuatlAdverbialNuclearBatchPlan",
          ],
        },
      ),
    [CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.coordinateProjection]:
      defineAdditionalOutputContract(
        "projectClassicalNahuatlAdverbialNuclearBatchCoordinates",
        ["classical-nahuatl-adverbial-nuclear-batch-coordinate"],
        {
          resultCollection: true,
          validatorNames: [
            "isClassicalNahuatlAdverbialNuclearBatchCoordinate",
          ],
        },
      ),
  }),
  "nnc:place-gentilic": Object.freeze({
    [CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.preparedPlan]:
      defineAdditionalOutputContract(
        "buildPlaceGentilicNncParadigmPlan",
        ["classical-nahuatl-place-gentilic-paradigm-plan"],
        {
          validatorNames: [
            "isPlaceGentilicNncParadigmPlan",
          ],
        },
      ),
    [CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.coordinateProjection]:
      defineAdditionalOutputContract(
        "projectPlaceGentilicNncParadigmCoordinates",
        ["classical-nahuatl-place-gentilic-paradigm-coordinate-frame"],
        {
          resultCollection: true,
          validatorNames: [
            "isPlaceGentilicNncParadigmCoordinate",
          ],
        },
      ),
  }),
  "vnc:denominal": Object.freeze({
    [CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.preparedPlan]:
      defineAdditionalOutputContract(
        "prepareClassicalNahuatlDenominalVncParadigmPlan",
        ["classical-nahuatl-denominal-vnc-paradigm-plan"],
        {
          validatorNames: [
            "isClassicalNahuatlDenominalVncParadigmPlan",
          ],
        },
      ),
    [CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.coordinateProjection]:
      defineAdditionalOutputContract(
        "projectClassicalNahuatlDenominalVncParadigmCoordinates",
        ["classical-nahuatl-denominal-vnc-coordinate-frame"],
        {
          resultCollection: true,
          validatorNames: [
            "isClassicalNahuatlDenominalVncCoordinateFrame",
          ],
        },
      ),
  }),
  "nnc:personal-name": Object.freeze({
    [CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.preparedPlan]:
      defineAdditionalOutputContract(
        "preparePersonalNameNncParadigmPlan",
        ["classical-nahuatl-personal-name-paradigm-plan"],
        {
          validatorNames: [
            "isPersonalNameNncParadigmPlan",
          ],
        },
      ),
    [CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.coordinateProjection]:
      defineAdditionalOutputContract(
        "projectPersonalNameNncParadigmCoordinates",
        ["classical-nahuatl-personal-name-result"],
        {
          resultCollection: true,
          validatorNames: [
            "isPersonalNameNncResult",
          ],
        },
      ),
    [CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.sentenceOperation]:
      defineAdditionalOutputContract(
        "evaluatePersonalNameSentenceOperation",
        ["classical-nahuatl-personal-name-sentence-operation"],
        {
          validatorNames: [
            "isPersonalNameSentenceOperation",
          ],
        },
      ),
  }),
});

function getApplicationOutputKinds(
  operationId = "",
) {
  return Object.freeze([
    DEFAULT_APPLICATION_OUTPUT_KIND,
    ...Object.keys(ADDITIONAL_OUTPUT_CONTRACTS[operationId] || {}),
  ]);
}

function getApplicationOutputContract(
  operationId = "",
  outputKind = DEFAULT_APPLICATION_OUTPUT_KIND,
  targetObject = globalThis,
) {
  if (outputKind === DEFAULT_APPLICATION_OUTPUT_KIND) {
    const route = ROUTE_DEFINITIONS[operationId];
    const resultContract = CANONICAL_RESULT_CONTRACTS[operationId];
    if (!route || !resultContract) return null;
    return Object.freeze({
      capabilityName: route.capabilityName,
      resultKinds: resultContract.resultKinds,
      resultCollection: false,
      validatorNames: AUTHORIZED_RESULT_VALIDATOR_NAMES?.[operationId]
        || Object.freeze([]),
    });
  }
  return ADDITIONAL_OUTPUT_CONTRACTS[operationId]?.[outputKind] || null;
}

const LCM_AXIS_IDS = Object.freeze(Array.from(new Set(
  Object.values(ROUTE_DEFINITIONS).flatMap((definition) => definition.axisIds),
)).sort());

const LCM_AXIS_OWNERS = Object.freeze(LCM_AXIS_IDS.map((axisId) => Object.freeze({
  axisId,
  ownerOperationIds: Object.freeze(Object.entries(ROUTE_DEFINITIONS)
    .filter(([, definition]) => definition.axisIds.includes(axisId))
    .map(([operationId]) => operationId)
    .sort()),
  prerequisiteInvariantIds: Object.freeze([
    "typed-application-request",
    "semantic-operation-identity",
    "required-capability-resolution",
    "canonical-engine-result",
  ]),
  licensedValueAuthority: "semantic-owner-canonical-result",
  callerSuppliedValueAuthority: false,
})));

const LCM_AXIS_OWNER_COUNTS = Object.freeze(Object.fromEntries(
  LCM_AXIS_OWNERS.map(axis => [
    axis.axisId,
    axis.ownerOperationIds.length,
  ]),
));

const CANONICAL_APPLICATION_SOURCE_BUILDER_NAMES = Object.freeze([
  "buildClassicalNahuatlTranscriptionSourceFrame",
  "buildClassicalNahuatlParticleSourceFrame",
  "buildClassicalMeaningfulMorphemeUnitClassificationSource",
  "buildClassicalMorphemeSyllableSeparationSource",
  "buildClassicalMorphemeCombinatorialTypeClassificationSource",
  "buildClassicalAffixLinearPositionClassificationSource",
  "buildClassicalAffixFunctionalTypeClassificationSource",
  "buildClassicalInflectionalParadigmDefinitionSource",
  "buildClassicalNahuatlPostStemUnitClassificationSource",
  "buildClassicalInflectionalAffixDyadAnalysisSource",
  "buildClassicalInflectionalAffixStemInternalDemotionSource",
  "buildClassicalMeaningfulStructuralRankHierarchySource",
  "buildClassicalMeaningfulRankSourceUpgradeAdmissibilitySource",
  "buildClassicalMeaningfulRankDowngradeSource",
  "buildClassicalRootMajorMorphemeDefinitionSource",
  "buildClassicalDirectStemFormationSource",
  "buildClassicalStockMediatedStemFormationSource",
  "buildClassicalCompoundStemFormationSource",
  "buildClassicalLexemeBearingUnitClassificationSource",
  "buildClassicalStemLexicalItemClassificationSource",
  "buildClassicalRootMeaningRankUpgradeSource",
  "buildComparativeWordSentenceFragmentAnalysisSource",
  "buildClassicalStemInflectionTransitionZoneSource",
  "buildClassicalNuclearClauseMorphosyntaxDomainSource",
  "buildClassicalParticleLexicalDistinctionSource",
  "buildClassicalVerbstemLexiconSource",
]);

const CANONICAL_ARGUMENT_VALIDATOR_NAMES = Object.freeze([
  "isIssuedGrammarFrame",
  "isClassicalGrammarConceptSource",
  "isClassicalSilentMorphContrastSource",
  "isClassicalMeaninglessCarrierUnitClassificationSource",
  "isClassicalCarrierRankTaxonomySource",
  "isClassicalCarrierRankFormationSource",
  "isClassicalSyllableStructureSource",
  "isClassicalCarrierVocableStructureSource",
  "isClassicalCarrierVocableProsodySource",
  "isClassicalCarrierPhonotacticSurfaceConstraintsSource",
  "isClassicalMeaningfulMorphemeUnitClassificationSource",
  "isClassicalMorphemeSyllableSeparationSource",
  "isClassicalMorphemeCombinatorialTypeClassificationSource",
  "isClassicalAffixLinearPositionClassificationSource",
  "isClassicalAffixFunctionalTypeClassificationSource",
  "isClassicalInflectionalParadigmDefinitionSource",
  "isClassicalNahuatlPostStemUnitClassificationSource",
  "isClassicalInflectionalAffixDyadAnalysisSource",
  "isClassicalInflectionalAffixStemInternalDemotionSource",
  "isClassicalMeaningfulStructuralRankHierarchySource",
  "isClassicalMeaningfulRankSourceUpgradeAdmissibilitySource",
  "isClassicalMeaningfulRankDowngradeSource",
  "isClassicalRootMajorMorphemeDefinitionSource",
  "isClassicalDirectStemFormationSource",
  "isClassicalStockMediatedStemFormationSource",
  "isClassicalCompoundStemFormationSource",
  "isClassicalLexemeBearingUnitClassificationSource",
  "isClassicalStemLexicalItemClassificationSource",
  "isClassicalRootMeaningRankUpgradeSource",
  "isComparativeWordSentenceFragmentAnalysisSource",
  "isClassicalStemInflectionTransitionZoneSource",
  "isClassicalNuclearClauseMorphosyntaxDomainSource",
  "isClassicalParticleLexicalDistinctionSource",
  "isClassicalVerbstemLexiconSource",
  "isClassicalNahuatlIdiomFrame",
  "isClassicalNahuatlTranscriptionFrame",
  "isClassicalNahuatlParticleSourceFrame",
  "isClassicalNahuatlNuclearClauseSource",
  "isClassicalNahuatlNuclearClauseResult",
  "isClassicalNahuatlFiniteVncSource",
  "isClassicalNahuatlFiniteVncResult",
  "isClassicalNahuatlVncApplicationFrame",
  "isClassicalNahuatlVncApplicationResultFrame",
  "isClassicalNahuatlVncTypedSourceApplicationBindingFrame",
  "isClassicalNahuatlVncParadigmPlan",
  "isClassicalNahuatlVncParadigmCoordinateFrame",
  "isClassicalNahuatlVncFiniteSurfaceFrame",
  "isClassicalNahuatlVncSentenceResultFrame",
  "isClassicalNahuatlOrdinaryNncSourceFrame",
  "isClassicalNahuatlOrdinaryNncOperationFrame",
  "isClassicalNahuatlOrdinaryNncResult",
  "isClassicalNahuatlOrdinaryNncParadigmPlan",
  "isClassicalNahuatlOrdinaryNncParadigmCoordinate",
  "isClassicalNahuatlPronominalNncSourceFrame",
  "isClassicalNahuatlPronominalNncOperationFrame",
  "isClassicalNahuatlPronominalNncResult",
  "isClassicalNahuatlPronominalNncParadigmPlan",
  "isClassicalNahuatlPronominalNncParadigmCoordinate",
  "isClassicalNahuatlIssuedNncSentenceSurfaceFrame",
  "isClassicalNahuatlNncSlotFrame",
  "isClassicalNahuatlVncSlotFrame",
  "isClassicalNahuatlDerivedVncMachineryFrame",
  "isClassicalNahuatlVncDerivationSourceMachineryFrame",
  "isClassicalNahuatlMachineryFrame",
  "isClassicalNahuatlClosureFrame",
  "isClassicalNahuatlOrderedVoiceLayerChain",
  "isClassicalNahuatlOrderedVoiceVncApplicationFrame",
  "isClassicalNahuatlIssuedParticleSentenceLayerFrame",
  "isClassicalNahuatlParticleResultFrame",
  "isClassicalNahuatlNegativeParticleSelectionFrame",
  "isClassicalNahuatlLexicalSelectionRecord",
  "isClassicalNahuatlStemOperationRecord",
  "isClassicalNahuatlPossessorReduplicationSelection",
  "isClassicalNahuatlNncSourceAuthorityFrame",
  "isClassicalNahuatlQuantitiveAuthorityRecord",
  "isClassicalNahuatlContextSelectionRecord",
  "isClassicalNahuatlSupplementationClauseEnvelope",
  "isClassicalNahuatlSupplementationAdverbialModifierFrame",
  "isClassicalNahuatlDiscourseSourceContextFrame",
  "isClassicalNahuatlSupplementationOperationRequest",
  "isClassicalNahuatlSupplementationFrame",
  "isClassicalNahuatlNominalConstructionSourceAuthorization",
  "isClassicalNahuatlNominalConstructionResult",
  "isClassicalNahuatlNominalConstructionParadigmPlan",
  "isClassicalNahuatlNominalConstructionParadigmCoordinate",
  "isClassicalNahuatlLexicalAuthorizationFrame",
  "isClassicalNahuatlDeverbalNncGrammarFrame",
  "isClassicalNahuatlParadigmPlan",
  "isClassicalNahuatlParadigmCoordinate",
  "isClassicalNahuatlResultFrame",
  "isClassicalNahuatlAdverbialPotentialFrame",
  "isClassicalNahuatlAdverbialNuclearResult",
  "isClassicalNahuatlAdverbialNuclearBatchPlan",
  "isClassicalNahuatlAdverbialNuclearBatchCoordinate",
  "isClassicalNahuatlRelationalNncGrammarFrame",
  "isClassicalNahuatlRelationalResult",
  "isPlaceGentilicNncFrame",
  "isAdverbialAdjunctionResult",
  "isClassicalNahuatlClauseCompositionSourceFrame",
  "isClassicalComparisonSourceUnit",
  "isClassicalNahuatlClauseComplementationResultFrame",
  "isClassicalNahuatlClauseConjunctionResultFrame",
  "isClassicalComparisonResultFrame",
  "isClassicalNahuatlDenominalVncResultFrame",
  "isPersonalNameInnerClauseFrame",
  "isPersonalNameNncSourceFrame",
  "isPersonalNameNncResult",
  "isPersonalNameSentenceOperation",
]);

const AUTHORIZED_RESULT_VALIDATOR_NAMES = Object.freeze({
  "concept:classification": Object.freeze([
    "isClassicalGrammarConceptResult",
  ]),
  "classical.morpheme.silent.contrast.validate": Object.freeze([
    "isClassicalSilentMorphContrastResult",
  ]),
  "classical.linguistic.unit.compose": Object.freeze([
    "isClassicalLinguisticUnitCompositionResult",
  ]),
  "classical.linguistic.structure.recurse": Object.freeze([
    "isClassicalLinguisticStructureRecursionResult",
  ]),
  "classical.linguistic.unit.discontinuity.validate": Object.freeze([
    "isClassicalDiscontinuousUnitAdmissibilityResult",
  ]),
  "classical.carrier.meaningless-unit.classify": Object.freeze([
    "isClassicalMeaninglessCarrierUnitClassificationResult",
  ]),
  "classical.carrier.rank.taxonomy.classify": Object.freeze([
    "isClassicalCarrierRankTaxonomyResult",
  ]),
  "classical.carrier.rank.form": Object.freeze([
    "isClassicalCarrierRankFormationResult",
  ]),
  "classical.carrier.syllable.compose": Object.freeze([
    "isClassicalSyllableStructureResult",
  ]),
  "classical.carrier.vocable.compose": Object.freeze([
    "isClassicalCarrierVocableStructureResult",
  ]),
  "classical.carrier.vocable.prosody.validate": Object.freeze([
    "isClassicalCarrierVocableProsodyResult",
  ]),
  "classical.carrier.phonotactic.constraints.validate": Object.freeze([
    "isClassicalCarrierPhonotacticSurfaceConstraintsResult",
  ]),
  "classical.morpheme.meaningful-unit.classify": Object.freeze(["isClassicalMeaningfulMorphemeUnitClassificationResult"]),
  "classical.morpheme.syllable.separate": Object.freeze(["isClassicalMorphemeSyllableSeparationResult"]),
  "classical.morpheme.combinatorial-type.classify": Object.freeze(["isClassicalMorphemeCombinatorialTypeClassificationResult"]),
  "classical.morpheme.affix.position.classify": Object.freeze(["isClassicalAffixLinearPositionClassificationResult"]),
  "classical.morpheme.affix.function.classify": Object.freeze(["isClassicalAffixFunctionalTypeClassificationResult"]),
  "classical.morpheme.inflectional-paradigm.classify": Object.freeze(["isClassicalInflectionalParadigmDefinitionResult"]),
  "classical.structure.post-stem-unit.classify": Object.freeze(["isClassicalNahuatlPostStemUnitClassificationResult"]),
  "classical.morpheme.inflectional-dyad.analyze": Object.freeze(["isClassicalInflectionalAffixDyadAnalysisResult"]),
  "classical.morpheme.inflectional-affix.demote": Object.freeze(["isClassicalInflectionalAffixStemInternalDemotionResult"]),
  "classical.morpheme.meaningful-rank.hierarchy.validate": Object.freeze(["isClassicalMeaningfulStructuralRankHierarchyResult"]),
  "classical.structure.meaningful-rank.source-or-upgrade.validate": Object.freeze(["isClassicalMeaningfulRankSourceUpgradeAdmissibilityResult"]),
  "classical.structure.meaningful-rank.downgrade": Object.freeze(["isClassicalMeaningfulRankDowngradeResult"]),
  "classical.structure.root.major-morpheme.validate": Object.freeze(["isClassicalRootMajorMorphemeDefinitionResult"]),
  "classical.structure.stem.form-directly": Object.freeze(["isClassicalDirectStemFormationResult"]),
  "classical.structure.stem.form-via-stock": Object.freeze(["isClassicalStockMediatedStemFormationResult"]),
  "classical.structure.stem.compound": Object.freeze(["isClassicalCompoundStemFormationResult"]),
  "classical.structure.meaning-bearing-unit.classify": Object.freeze(["isClassicalLexemeBearingUnitClassificationResult"]),
  "classical.structure.stem.lexical-status.classify": Object.freeze(["isClassicalStemLexicalItemClassificationResult"]),
  "classical.structure.root.meaning-rank.upgrade": Object.freeze(["isClassicalRootMeaningRankUpgradeResult"]),
  "concept.word.sentence-fragment.analyze": Object.freeze(["isComparativeWordSentenceFragmentAnalysisResult"]),
  "classical.structure.stem-transition-zone.validate": Object.freeze(["isClassicalStemInflectionTransitionZoneResult"]),
  "classical.nuclear-clause.morphosyntax.validate": Object.freeze(["isClassicalNuclearClauseMorphosyntaxDomainResult"]),
  "classical.structure.group.compose": Object.freeze(["isClassicalNahuatlGroupCompositionResult"]),
  "classical.structure.syntax-domain-onset.validate": Object.freeze(["isClassicalNahuatlSyntaxDomainOnsetResult"]),
  "concept.structure.principles.analyze": Object.freeze(["isLinguisticStructurePrinciplesAnalysisResult"]),
  "concept.structure.governance-taxonomy.analyze": Object.freeze(["isGovernanceTypeTaxonomyResult"]),
  "concept.structure.adjunctive-governance.analyze": Object.freeze(["isAdjunctiveGovernanceAnalysisResult"]),
  "concept.structure.conjunctive-governance.analyze": Object.freeze(["isConjunctiveGovernanceAnalysisResult"]),
  "classical.structure.level-distribution.validate": Object.freeze(["isClassicalNahuatlStructureLevelDistributionResult"]),
  "classical.structure.participant-role.analyze": Object.freeze(["isClassicalParticipantRoleAnalysisResult"]),
  "classical.structure.conceptual-plane.separate": Object.freeze(["isClassicalConceptualPlaneSeparationResult"]),
  "classical.authority.source-language.firewall.enforce": Object.freeze(["isTranslationAuthorityBoundaryResult"]),
  "classical.source.phonological-identity.validate": Object.freeze(["isClassicalPhonologicalDistinctionResult"]),
  "classical.verbstem.object-embed.validate": Object.freeze(["isClassicalObjectEmbedDistinctionResult"]),
  "classical.particle.lexical-distinction.authorize": Object.freeze(["isClassicalParticleLexicalDistinctionResult"]),
  "classical.verbstem.lexicon.authorize": Object.freeze(["isClassicalVerbstemLexiconResult"]),
  "classical.vnc.compound.widowhood.interpret": Object.freeze(["isClassicalNahuatlWidowhoodCompoundInterpretationResult"]),
  "classical.nnc.exotl.interpret": Object.freeze(["isClassicalNahuatlExotlInterpretationResult"]),
  "classical.sentence.tleh-admonitory-pair.interpret": Object.freeze(["isClassicalNahuatlTlehAdmonitoryPairResult"]),
  "classical.sentence.tleh-closing-vocative.interpret": Object.freeze(["isClassicalNahuatlTlehClosingVocativeResult"]),
  "classical.nnc.king-praise-role-contrast.interpret": Object.freeze(["isClassicalNahuatlKingPraiseRoleContrastResult"]),
  "orthography:transcription": Object.freeze([
    "isClassicalNahuatlTranscriptionFrame",
  ]),
  "phonology:syllabify": Object.freeze([
    "isClassicalNahuatlTranscriptionAnalysisFrame",
  ]),
  "phonology:supportive-vowel": Object.freeze([
    "isClassicalNahuatlTranscriptionAnalysisFrame",
  ]),
  "phonology:open-transition": Object.freeze([
    "isClassicalNahuatlTranscriptionAnalysisFrame",
  ]),
  "phonology:consonant-length": Object.freeze([
    "isClassicalNahuatlTranscriptionAnalysisFrame",
  ]),
  "phonology:progressive-assimilation": Object.freeze([
    "isClassicalNahuatlTranscriptionAnalysisFrame",
  ]),
  "phonology:assimilation": Object.freeze([
    "isClassicalNahuatlTranscriptionAnalysisFrame",
  ]),
  "phonology:consonant-loss": Object.freeze([
    "isClassicalNahuatlTranscriptionAnalysisFrame",
  ]),
  "phonology:consonant-shift": Object.freeze([
    "isClassicalNahuatlTranscriptionAnalysisFrame",
  ]),
  "phonology:phone-source-assignment": Object.freeze([
    "isClassicalNahuatlTranscriptionAnalysisFrame",
  ]),
  "phonology:segment-realization": Object.freeze([
    "isClassicalNahuatlTranscriptionAnalysisFrame",
  ]),
  "phonology:stress": Object.freeze([
    "isClassicalNahuatlTranscriptionAnalysisFrame",
  ]),
  "phonology:spelling-change": Object.freeze([
    "isClassicalNahuatlTranscriptionAnalysisFrame",
  ]),
  "phonology:lateral-reading": Object.freeze([
    "isClassicalNahuatlTranscriptionAnalysisFrame",
  ]),
  "phonology:vowel-elision": Object.freeze([
    "isClassicalNahuatlTranscriptionAnalysisFrame",
  ]),
  "vnc:nuclear-clause": Object.freeze([
    "isClassicalNahuatlNuclearClauseResult",
  ]),
  "vnc:finite-slot": Object.freeze([
    "isClassicalNahuatlFiniteVncResult",
  ]),
  "vnc:finite-surface": Object.freeze([
    "isClassicalNahuatlVncFiniteSurfaceFrame",
  ]),
  "vnc:sentence-result": Object.freeze([
    "isClassicalNahuatlVncSentenceResultFrame",
  ]),
  "nnc:ordinary": Object.freeze([
    "isClassicalNahuatlOrdinaryNncResult",
  ]),
  "nnc:pronominal": Object.freeze([
    "isClassicalNahuatlPronominalNncResult",
  ]),
  "nnc:sentence-surface": Object.freeze([
    "isClassicalNahuatlIssuedNncSentenceSurfaceFrame",
  ]),
  "nnc:diagram": Object.freeze([
    "isClassicalNahuatlNncDiagrammaticFrame",
  ]),
  "vnc:diagram": Object.freeze([
    "isClassicalNahuatlVncDiagrammaticFrame",
  ]),
  "sentence:adverbial-adjunction": Object.freeze([
    "isClassicalNahuatlIssuedParticleSentenceLayerFrame",
  ]),
  "sentence:particle-adjunction": Object.freeze([
    "isClassicalNahuatlIssuedParticleSentenceLayerFrame",
  ]),
  "particle:result": Object.freeze([
    "isClassicalNahuatlParticleResultFrame",
  ]),
  "particle:negative-selection": Object.freeze([
    "isClassicalNahuatlNegativeParticleSelectionFrame",
  ]),
  "vnc:source-selection": Object.freeze([
    "isClassicalNahuatlFuenteSourceSelectionFrame",
  ]),
  "vnc:ordered-voice-chain": Object.freeze([
    "isClassicalNahuatlOrderedVoiceLayerChain",
  ]),
  "vnc:ordered-voice-application": Object.freeze([
    "isClassicalNahuatlOrderedVoiceVncApplicationFrame",
  ]),
  "vnc:derivational-operation": Object.freeze([
    "isClassicalNahuatlClosureFrame",
  ]),
  "vnc:application": Object.freeze([
    "isClassicalNahuatlVncApplicationFrame",
  ]),
  "vnc:transitive-object": Object.freeze([
    "isClassicalNahuatlTransitiveVncObjectFrame",
  ]),
  "vnc:verbstem-class": Object.freeze([
    "isClassicalNahuatlVerbstemClassFrame",
  ]),
  "sentence:supplementation": Object.freeze([
    "isClassicalNahuatlSupplementationFrame",
    "isClassicalNahuatlVocativeFrame",
    "isClassicalNahuatlRumoredReportFrame",
    "isClassicalNahuatlDeletedPrincipalFrame",
    "isClassicalNahuatlNegativeAcPluralFrame",
  ]),
  "grammar:nominal-construction": Object.freeze([
    "isClassicalNahuatlNominalConstructionResult",
  ]),
  "nnc:deverbal-construction": Object.freeze([
    "isClassicalNahuatlDeverbalNncGrammarFrame",
  ]),
  "nnc:adjectival-modification": Object.freeze([
    "isClassicalNahuatlResultFrame",
  ]),
  "nnc:adverbial": Object.freeze([
    "isClassicalNahuatlAdverbialNuclearResult",
  ]),
  "nnc:relational": Object.freeze([
    "isClassicalNahuatlRelationalResult",
  ]),
  "nnc:place-gentilic": Object.freeze([
    "isPlaceGentilicNncFrame",
  ]),
  "clause:adverbial-adjunction": Object.freeze([
    "isAdverbialAdjunctionResult",
  ]),
  "clause:composition": Object.freeze([
    "isClassicalNahuatlClauseComplementationResultFrame",
    "isClassicalNahuatlClauseConjunctionResultFrame",
  ]),
  "clause:comparison": Object.freeze([
    "isClassicalComparisonResultFrame",
  ]),
  "vnc:denominal": Object.freeze([
    "isClassicalNahuatlDenominalVncResultFrame",
  ]),
  "nnc:personal-name": Object.freeze([
    "isPersonalNameNncResult",
  ]),
});

function resolveCallableCapability(targetObject, capabilityName) {
  const visited = new Set();
  let owner = targetObject;
  while (owner && !visited.has(owner)) {
    visited.add(owner);
    let descriptor = null;
    try {
      descriptor = Object.getOwnPropertyDescriptor(owner, capabilityName);
    } catch {
      return null;
    }
    if (descriptor) {
      return Object.prototype.hasOwnProperty.call(descriptor, "value")
        && typeof descriptor.value === "function"
        ? Object.freeze({
          capability: descriptor.value,
          owner,
          dataProperty: true,
        })
        : null;
    }
    try {
      owner = Object.getPrototypeOf(owner);
    } catch {
      return null;
    }
  }
  return null;
}

function hasCallableCapability(targetObject, capabilityName) {
  return Boolean(resolveCallableCapability(targetObject, capabilityName));
}

function canonicalCapabilityNames() {
  return [...new Set([
    ...Object.values(ROUTE_DEFINITIONS).map((route) => route.capabilityName),
    ...Object.values(ADDITIONAL_OUTPUT_CONTRACTS).flatMap(
      (contracts) => Object.values(contracts).flatMap((contract) => [
        contract.capabilityName,
        ...(contract.validatorNames || []),
      ]),
    ),
    ...Object.values(AUTHORIZED_RESULT_VALIDATOR_NAMES).flat(),
    ...CANONICAL_APPLICATION_SOURCE_BUILDER_NAMES,
    ...CANONICAL_ARGUMENT_VALIDATOR_NAMES,
    ...Object.values(
      CLASSICAL_GRAMMAR_APPLICATION_TYPED_SOURCE_CONTRACTS,
    ).flatMap((contract) => [
      contract.preflightCapabilityName,
      ...contract.preflightValidatorNames,
    ]),
    ...Object.values(
      CLASSICAL_GRAMMAR_TYPED_SOURCE_OPERATION_BINDING_CONTRACTS,
    ).flatMap((contract) => [
      contract.issuerCapabilityName,
      contract.validatorCapabilityName,
    ]),
    ...Object.values(
      CLASSICAL_GRAMMAR_APPLICATION_RESULT_BINDING_CONTRACTS,
    ).flatMap((contract) => [
      contract.issuerCapabilityName,
      contract.validatorCapabilityName,
    ]),
    "getClassicalNahuatlDenominalVncOperationPathInventory",
    "isClassicalNahuatlDenominalVncOperationPathInventory",
    "resolvePlaceGentilicNncExactSource",
    "resolveClassicalNahuatlAdverbialExactSource",
    "isClassicalNahuatlAdverbialExactSourceResolution",
    "resolvePersonalNameNncExactSource",
    "isPersonalNameNncExactSourceResolution",
    "getClassicalNahuatlVncContinuationSourceConstituents",
    "getClassicalNahuatlNncContinuationSourceConstituents",
    "getClassicalNahuatlParticleSourceEntries",
    "buildClassicalNahuatlParticleSourceFrame",
    "isClassicalNahuatlParticleSourceFrame",
    "buildClassicalNahuatlParticleResultFrame",
    "isClassicalNahuatlParticleResultFrame",
  ].filter(Boolean))];
}

function captureCanonicalApplicationState(targetObject, api) {
  const capabilityIdentities = new Map();
  canonicalCapabilityNames().forEach((capabilityName) => {
    const resolved = resolveCallableCapability(targetObject, capabilityName);
    if (resolved) {
      capabilityIdentities.set(capabilityName, resolved.capability);
    }
  });
  const state = Object.freeze({
    api,
    capabilityIdentities,
  });
  CANONICAL_APPLICATION_APIS.add(api);
  CANONICAL_APPLICATION_STATE_BY_TARGET.set(targetObject, state);
  return state;
}

function getCanonicalApplicationState(targetObject, api = null) {
  const state = CANONICAL_APPLICATION_STATE_BY_TARGET.get(targetObject) || null;
  if (
    !state
    || !CANONICAL_APPLICATION_APIS.has(state.api)
    || (api && state.api !== api)
  ) {
    return null;
  }
  return state;
}

function resolveCanonicalCallableCapability(
  targetObject,
  capabilityName,
  api = null,
) {
  const state = getCanonicalApplicationState(targetObject, api);
  const expectedCapability = state?.capabilityIdentities.get(capabilityName);
  const resolved = resolveCallableCapability(targetObject, capabilityName);
  return expectedCapability
    && resolved
    && resolved.capability === expectedCapability
    ? resolved
    : null;
}

export function createClassicalGrammarApplicationApi(targetObject = globalThis) {
  let api = null;
  const continuationProjectionCapabilities = new Map([
    "getClassicalNahuatlVncContinuationSourceConstituents",
    "getClassicalNahuatlNncContinuationSourceConstituents",
  ].map(capabilityName => [
    capabilityName,
    resolveCallableCapability(targetObject, capabilityName)?.capability
      || null,
  ]));
  const issuedApplicationResults = new WeakSet();
  const issuedCanonicalResults = new WeakSet();
  const issuedApplicationResultByCanonicalResult = new WeakMap();
  const issuedContinuationResults = new WeakSet();
  const issuedApplicationResultByContinuationResult = new WeakMap();
  const continuationUnitKindsByResult = new WeakMap();
  const continuationResultsByApplicationResult = new WeakMap();
  const rhymeFullPinByApplicationResult = new WeakMap();
  const rhymeFullPinByCanonicalResult = new WeakMap();
  const rhymeCalibrationByApplicationResult = new WeakMap();
  const rhymeCalibrationByCanonicalResult = new WeakMap();
  const rhymeEvaluationOrderByApplicationResult = new WeakMap();
  const rhymeEvaluationOrderByCanonicalResult = new WeakMap();
  const rhymeOwnerProofObservationsByApplicationResult = new WeakMap();
  const rhymeOwnerProofObservationsByCanonicalResult = new WeakMap();
  const issuedRhymeOwnerProofObservations = new WeakSet();
  const layerGraphByApplicationResult = new WeakMap();
  const layerGraphByCanonicalResult = new WeakMap();
  const issuedLayerGraphs = new WeakSet();
  const issuedCapabilityNavigators = new WeakSet();
  const capabilityNavigatorByExactInput = new WeakMap();
  const issuedTypedSourceCapabilityNavigators = new WeakSet();
  const typedSourceCapabilityNavigatorByExactSource = new WeakMap();
  const typedSourceProvenanceByExactSource = new WeakMap();
  const issuedTypedSourceOperationBindingFrames = new WeakSet();
  const typedSourceOperationBindingContextByFrame = new WeakMap();
  const executedTypedSourceOperationBindingFrames = new WeakSet();
  const issuedCanonicalNncTypedSourceOwnerBindingFrames = new WeakSet();
  const canonicalNncTypedSourceOwnerBindingContextByFrame = new WeakMap();
  const issuedCanonicalParticleRootOwnerBindingFrames = new WeakSet();
  const canonicalParticleRootOwnerBindingContextByFrame = new WeakMap();
  const issuedFormationResultBindingFrames = new WeakSet();
  const applicationAtlasObservers = new Set();
  const issuedApplicationAtlasObservations = new WeakSet();
  const atlasObservationByApplicationResult = new WeakMap();
  const atlasObservationByCanonicalResult = new WeakMap();
  let latestApplicationAtlasObservation = null;
  let cachedGrammarApplicationInventory = null;

  function isRecognizedCanonicalArgumentCarrier(value = null) {
    if (!value || typeof value !== "object") {
      return false;
    }
    if (
      issuedCanonicalResults.has(value)
      || issuedApplicationResults.has(value)
      || issuedApplicationResultByCanonicalResult.has(value)
    ) {
      return true;
    }
    const recognizedByCanonicalValidator =
      CANONICAL_ARGUMENT_VALIDATOR_NAMES.some((validatorName) => {
        const resolved = resolveCanonicalCallableCapability(
          targetObject,
          validatorName,
          api,
        );
        if (!resolved) return false;
        try {
          return Reflect.apply(resolved.capability, targetObject, [value]) === true;
        } catch {
          return false;
        }
      });
    if (recognizedByCanonicalValidator) {
      return true;
    }
    return false;
  }

  function getForbiddenApplicationAuthorityCarrier(
    value,
    path = "$",
    seen = new Set(),
  ) {
    if (
      !value
      || typeof value !== "object"
      || seen.has(value)
      || isRecognizedCanonicalArgumentCarrier(value)
    ) {
      return null;
    }
    seen.add(value);
    const owners = [];
    const ownersSeen = new Set();
    let owner = value;
    while (
      owner
      && owner !== Object.prototype
      && owner !== Array.prototype
      && !ownersSeen.has(owner)
    ) {
      owners.push(owner);
      ownersSeen.add(owner);
      try {
        owner = Object.getPrototypeOf(owner);
      } catch {
        owner = null;
      }
    }
    for (let ownerIndex = 0; ownerIndex < owners.length; ownerIndex += 1) {
      const inspectedOwner = owners[ownerIndex];
      let propertyKeys = [];
      try {
        propertyKeys = Reflect.ownKeys(inspectedOwner);
      } catch {
        continue;
      }
      for (const propertyKey of propertyKeys) {
        const propertyName = typeof propertyKey === "string"
          ? propertyKey
          : String(propertyKey);
        const normalizedPropertyName = propertyName
          .toLowerCase()
          .replace(/[^a-z0-9]/gu, "");
        if (Array.isArray(inspectedOwner) && propertyName === "length") {
          continue;
        }
        const childPath = ownerIndex === 0
          ? Array.isArray(inspectedOwner) && /^\d+$/u.test(propertyName)
            ? `${path}[${propertyName}]`
            : `${path}.${propertyName}`
          : `${path}[[Prototype]].${propertyName}`;
        let descriptor = null;
        try {
          descriptor = Object.getOwnPropertyDescriptor(
            inspectedOwner,
            propertyKey,
          );
        } catch {
          descriptor = null;
        }
        if (!descriptor) continue;
        if (!Object.prototype.hasOwnProperty.call(descriptor, "value")) {
          return Object.freeze({
            key: "accessor",
            path: childPath,
          });
        }
        if (
          isForbiddenClassicalGrammarAuthorityKey(normalizedPropertyName)
          && !isClassicalGrammarReadOnlyAuthorityDeclaration(
            normalizedPropertyName,
            descriptor.value,
          )
          && !hasClassicalGrammarReadOnlyArtifactDeclaration(
            inspectedOwner,
            normalizedPropertyName,
          )
        ) {
          return Object.freeze({ key: propertyName, path: childPath });
        }
        const violation = getForbiddenApplicationAuthorityCarrier(
          descriptor.value,
          childPath,
          seen,
        );
        if (violation) return violation;
      }
    }
    return null;
  }

  function validateClassicalGrammarApplicationRequest(request = {}) {
    if (!request || typeof request !== "object" || Array.isArray(request)) {
      throw new TypeError(`${APPLICATION_REQUEST_DIAGNOSTIC}:object-required`);
    }
    const operationId = String(request.operationId || "").trim();
    const route = ROUTE_DEFINITIONS[operationId];
    if (!route || !CANONICAL_RESULT_CONTRACTS[operationId]) {
      throw new Error(`${APPLICATION_REQUEST_DIAGNOSTIC}:semantic-operation-required`);
    }
    const outputKind = String(
      request.outputKind || DEFAULT_APPLICATION_OUTPUT_KIND,
    ).trim();
    const outputContract = getApplicationOutputContract(
      operationId,
      outputKind,
      targetObject,
    );
    if (!outputContract) {
      throw new Error(
        `${APPLICATION_REQUEST_DIAGNOSTIC}:output-kind-not-supported:${outputKind}`,
      );
    }
    const foundationRoute = validateClassicalGrammarFoundationRoute({
      operationId,
      capabilityName: outputContract.capabilityName,
      axisIds: route.axisIds,
    });
    if (!foundationRoute.valid) {
      throw new Error(
        `${APPLICATION_REQUEST_DIAGNOSTIC}:foundation-route-invalid:${foundationRoute.errors[0]}`,
      );
    }
    if (!Array.isArray(request.args)) {
      throw new TypeError(`${APPLICATION_REQUEST_DIAGNOSTIC}:args-array-required`);
    }
    const languageIdentity = validateClassicalGrammarLanguageIdentity(
      request.languageId,
    );
    if (!languageIdentity.valid) {
      throw new Error(
        `${APPLICATION_REQUEST_DIAGNOSTIC}:${languageIdentity.error}`,
      );
    }
    const forbiddenCarrier = getForbiddenApplicationAuthorityCarrier(request);
    if (forbiddenCarrier) {
      throw new Error(
        `${APPLICATION_REQUEST_DIAGNOSTIC}:forbidden-authority:${forbiddenCarrier.key}`,
      );
    }
    return Object.freeze({
      operationId,
      route,
      outputKind,
      outputContract,
      args: request.args,
      typedApplicationRequest: (
        request != null
        && typeof request === "object"
        && !Array.isArray(request)
        && Array.isArray(request.args)
      ),
      semanticOperationIdentity: (
        ROUTE_DEFINITIONS[operationId] === route
        && CANONICAL_RESULT_CONTRACTS[operationId] != null
        && foundationRoute.valid === true
        && languageIdentity.valid === true
        && getApplicationOutputContract(
          operationId,
          outputKind,
          targetObject,
        ) != null
      ),
      authorityCarrierClear: forbiddenCarrier == null,
    });
  }

  function isResultValidatedByTarget(
    operationId = "",
    outputContract = null,
    result = null,
  ) {
    const validatorNames = outputContract?.validatorNames?.length
      ? outputContract.validatorNames
      : AUTHORIZED_RESULT_VALIDATOR_NAMES[operationId] || [];
    if (!validatorNames.length) return false;
    const candidates = outputContract?.resultCollection === true
      ? Array.isArray(result) ? result : []
      : [result];
    return candidates.length > 0 && candidates.every((candidate) => validatorNames.some((validatorName) => {
      const resolved = resolveCanonicalCallableCapability(
        targetObject,
        validatorName,
        api,
      );
      if (!resolved) return false;
      try {
        return Reflect.apply(resolved.capability, targetObject, [candidate]) === true;
      } catch {
        return false;
      }
    }));
  }

  function isRecognizedCanonicalResult(
    operationId = "",
    outputKind = DEFAULT_APPLICATION_OUTPUT_KIND,
    outputContract = null,
    result = null,
    authorizationStatus = "blocked",
  ) {
    const contract = outputContract
      || getApplicationOutputContract(
        operationId,
        outputKind,
        targetObject,
      );
    const routeKindRecognized = Boolean(
      contract
      && result
      && typeof result === "object"
      && (
        contract.resultCollection === true
          ? Array.isArray(result)
            && result.length > 0
            && result.every((entry) => (
              entry
              && typeof entry === "object"
              && !Array.isArray(entry)
              && contract.resultKinds.includes(String(entry.kind || ""))
            ))
          : !Array.isArray(result)
            && contract.resultKinds.includes(String(result.kind || ""))
      )
    );
    if (!routeKindRecognized) return false;
    return isResultValidatedByTarget(
      operationId,
      contract,
      result,
    );
  }

  function getCanonicalResultAuthorizationStatus(result = null) {
    if (!result || typeof result !== "object") {
      return "blocked";
    }
    if (Array.isArray(result)) {
      return result.length > 0 && result.every(
        (entry) => getCanonicalResultAuthorizationStatus(entry) === "authorized",
      )
        ? "authorized"
        : "blocked";
    }
    if (Object.prototype.hasOwnProperty.call(result, "authorizationStatus")) {
      return String(result.authorizationStatus || "") === "authorized"
        ? "authorized"
        : "blocked";
    }
    if (
      result.supported === true
      && result.ok !== false
      && result.grammarFrame?.resultFrame?.ok !== false
    ) {
      return "authorized";
    }
    if (result.ok === true && result.supported !== false) {
      return "authorized";
    }
    if (
      result.proofFrame?.authorizationStatus === "authorized"
      || result.proofFrame?.conclusion?.authorizationStatus === "authorized"
    ) {
      return "authorized";
    }
    return "blocked";
  }

  function buildGcdInvariantProofs(facts = {}) {
    return Object.freeze(Object.fromEntries(GCD_INVARIANT_IDS.map(
      (invariantId) => [invariantId, facts[invariantId] === true],
    )));
  }

  function getClassicalGrammarApplicationInventory() {
    if (cachedGrammarApplicationInventory) {
      return cachedGrammarApplicationInventory;
    }
    const operations = Object.freeze(Object.entries(ROUTE_DEFINITIONS).map(
      ([operationId, definition]) => {
        const outputKinds = getApplicationOutputKinds(
          operationId,
          targetObject,
        );
        const outputCapabilities = Object.freeze(outputKinds.map((outputKind) => {
          const contract = getApplicationOutputContract(
            operationId,
            outputKind,
            targetObject,
          );
          const installedCapabilityName = contract.capabilityName;
          const capabilityInstalled = Boolean(
            resolveCanonicalCallableCapability(
              targetObject,
              installedCapabilityName,
              api,
            ),
          );
          const validatorNames = contract.validatorNames
            || Object.freeze([]);
          const validatorsInstalled = (
            validatorNames.length > 0
            && validatorNames.every((validatorName) => Boolean(
              resolveCanonicalCallableCapability(
                targetObject,
                validatorName,
                api,
              ),
            ))
          );
          return Object.freeze({
            outputKind,
            capabilityName: contract.capabilityName,
            installedCapabilityName,
            resultKinds: contract.resultKinds,
            resultCollection: contract.resultCollection === true,
            validatorNames,
            capabilityInstalled,
            validatorsInstalled,
          });
        }));
        const rhymeRoutePlaneFrame =
          buildClassicalGrammaticalRhymeRoutePlaneFrame({
            operationId,
            outputKinds,
            resultKinds: [...new Set(outputCapabilities.flatMap(
              output => output.resultKinds,
            ))],
            axisIds: definition.axisIds,
            axisRoles:
              FOUNDATION_AXIS_SEMANTIC_FACT_ROLES[operationId] || {},
            axisOwnerCounts: LCM_AXIS_OWNER_COUNTS,
            axisConstraintDeclarations:
              FOUNDATION_AXIS_CONSTRAINT_DECLARATIONS[operationId] || {},
            continuationInputUnitKinds:
              CLASSICAL_GRAMMAR_APPLICATION_CONTINUATION_TYPE_CONTRACTS[
                operationId
              ]?.inputUnitKinds || [],
            continuationOutputUnitKinds:
              CLASSICAL_GRAMMAR_APPLICATION_CONTINUATION_TYPE_CONTRACTS[
                operationId
              ]?.outputUnitKinds || [],
          });
        return Object.freeze({
          operationId,
          capabilityName: definition.capabilityName,
          outputKinds,
          outputCapabilities,
          axisIds: definition.axisIds,
          axisSemanticFactRoles:
            FOUNDATION_AXIS_SEMANTIC_FACT_ROLES[operationId]
              || Object.freeze({}),
          axisConstraintDeclarations:
            FOUNDATION_AXIS_CONSTRAINT_DECLARATIONS[operationId]
              || Object.freeze({}),
          rhymeRoutePlaneFrame,
          capabilityInstalled: outputCapabilities.every(
            (output) => output.capabilityInstalled,
          ),
          allOutputsHaveOwnerValidators: outputCapabilities.every(
            (output) => output.validatorNames.length > 0,
          ),
          allOwnerValidatorsInstalled: outputCapabilities.every(
            (output) => output.validatorsInstalled,
          ),
        });
      },
    ));
    const missingOwnerValidatorOutputs = Object.freeze(
      operations.flatMap((operation) => operation.outputCapabilities
        .filter((output) => output.validatorNames.length === 0)
        .map((output) => Object.freeze({
          operationId: operation.operationId,
          outputKind: output.outputKind,
          resultKinds: output.resultKinds,
        }))),
    );
    const grammaticalRhymeTopology =
      buildClassicalGrammaticalRhymeTopologyFrame({
        routePlaneFrames: operations.map(
          operation => operation.rhymeRoutePlaneFrame,
        ),
      });
    cachedGrammarApplicationInventory = Object.freeze({
      kind: "classical-grammar-application-inventory",
      version: 1,
      outputKinds: CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS,
      operationIds: Object.freeze(operations.map((operation) => operation.operationId)),
      operations,
      allCapabilitiesInstalled: operations.every((operation) => operation.capabilityInstalled),
      allOutputsHaveOwnerValidators: missingOwnerValidatorOutputs.length === 0,
      allOwnerValidatorsInstalled: operations.every(
        (operation) => operation.allOwnerValidatorsInstalled,
      ),
      missingOwnerValidatorOutputs,
      greatestCommonDivisor: Object.freeze({
        identityId: "typed-semantic-application-to-canonical-result",
        invariantIds: GCD_INVARIANT_IDS,
      }),
      leastCommonMultiple: Object.freeze({
        axisIds: LCM_AXIS_IDS,
        axisCount: LCM_AXIS_IDS.length,
        axisOwners: LCM_AXIS_OWNERS,
        allAxesOwned: LCM_AXIS_OWNERS.every((axis) => axis.ownerOperationIds.length > 0),
      }),
      grammaticalRhymeCalibration: Object.freeze({
        routePlaneCount: operations.length,
        declaredRoutePlaneCount: operations.filter(operation => (
          operation.rhymeRoutePlaneFrame?.planeStatus === "declared"
        )).length,
        sharedRoutePlaneCount: operations.filter(operation => (
          operation.rhymeRoutePlaneFrame?.rotation?.sharedAxisIds?.length
        )).length,
        dimensionallyDistinctRoutePlaneCount: operations.filter(operation => (
          !operation.rhymeRoutePlaneFrame?.rotation?.sharedAxisIds?.length
        )).length,
        everyRouteHasSixFieldSignature:
          grammaticalRhymeTopology.everyRouteHasSixFieldSignature,
        everyAxisAccountedFor:
          grammaticalRhymeTopology.everyAxisAccountedFor,
        collapsedBoundarySeamCount:
          grammaticalRhymeTopology.collapsedBoundarySeamCount,
        insideOutEdgeCount:
          grammaticalRhymeTopology.insideOutEdgeCount,
        superimposedClassCount:
          grammaticalRhymeTopology.superimposedClassCount,
        topology: grammaticalRhymeTopology,
        lessonDiscovery: CLASSICAL_LESSONS_1_58_RHYME_DISCOVERY,
        evaluationOrderCast: Object.freeze({
          kind: "classical-grammatical-rhyme-evaluation-order-cast",
          version: 1,
          entrance: "executeClassicalGrammarApplicationRequest",
          scope: "every-authorized-owner-issued-application-result",
          stageOrder: Object.freeze([
            "exact-owner-source",
            "inner-formation",
            "participants-and-state-finalized",
            "boundary-realization",
            "surface-projection",
          ]),
          earlyEvaluationCondition:
            "consumer-runs-before-final-inner-carrier-order",
          lateEvaluationCondition:
            "consumer-runs-after-required-owner-identity-is-lost",
          discoveredFromTypedStructureNotExampleIdentity: true,
          ownerResultValidationRequired: true,
          grammarAuthority: false,
        }),
        grammaticalAtlas: Object.freeze({
          kind: "classical-grammatical-atlas-contract",
          version: 1,
          coordinateSystem: "classical-grammatical-atlas",
          localCoordinateSource:
            "generated-current-lesson-atom-population",
          globalGroupingFields: Object.freeze([
            "requiresPresent",
            "requiresAbsent",
            "adds",
            "removes",
            "preserves",
            "emits",
          ]),
          applicationObservationKind:
            APPLICATION_ATLAS_OBSERVATION_KIND,
          applicationObservationEntrance:
            "executeClassicalGrammarApplicationRequest",
          automaticOwnerCalibrationPopulation:
            "normal-owner-issued-application-observations",
          continuationEdgesRequireExactOwnerIdentity: true,
          resultViewCoordinatesAreLocalPresentationCoordinates: true,
          atlasMayAuthorizeGrammar: false,
          lessonNumberAuthority: false,
          grammarAuthority: false,
          formulaStringAuthority: false,
          surfaceStringAuthority: false,
        }),
        lessonNumberAuthority: false,
        grammarAuthority: false,
      }),
      curriculumOrderAuthority: false,
      lessonMetadataAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      displayTextAuthority: false,
    });
    return cachedGrammarApplicationInventory;
  }

  function getClassicalGrammarApplicationRhymeOwnerProofObservations(
    currentResult = null,
  ) {
    if (isClassicalGrammarApplicationResult(currentResult)) {
      return rhymeOwnerProofObservationsByApplicationResult.get(
        currentResult,
      ) || Object.freeze([]);
    }
    return currentResult && typeof currentResult === "object"
      ? rhymeOwnerProofObservationsByCanonicalResult.get(currentResult)
        || Object.freeze([])
      : Object.freeze([]);
  }

  function getCanonicalContinuationUnitKinds(value = null) {
    if (!value || typeof value !== "object") return Object.freeze([]);
    const unitKinds = [];
    [
      ["isClassicalNahuatlVncApplicationResultFrame", "vnc-result"],
      ["isClassicalNahuatlClosureFrame", "vnc-result"],
      [
        "isClassicalNahuatlVncSlotFrame",
        "vnc-diagram-slot-frame",
      ],
      ["isClassicalNahuatlOrdinaryNncResult", "nnc-result"],
      ["isClassicalNahuatlPronominalNncResult", "nnc-result"],
      [
        "isClassicalNahuatlNncSlotFrame",
        "nnc-diagram-slot-frame",
      ],
    ].forEach(([validatorName, unitKind]) => {
      const resolved = resolveCanonicalCallableCapability(
        targetObject,
        validatorName,
        api,
      );
      if (!resolved) return;
      let accepted = false;
      try {
        accepted = Reflect.apply(
          resolved.capability,
          targetObject,
          [value],
        ) === true;
      } catch {
        accepted = false;
      }
      if (accepted) unitKinds.push(unitKind);
    });
    [
      [
        "getClassicalNahuatlVncContinuationSourceConstituents",
        "vnc-result",
      ],
      [
        "getClassicalNahuatlNncContinuationSourceConstituents",
        "nnc-result",
      ],
    ].forEach(([capabilityName, unitKind]) => {
      const capability = continuationProjectionCapabilities.get(
        capabilityName,
      );
      if (typeof capability !== "function") return;
      let projection = null;
      try {
        projection = Reflect.apply(
          capability,
          targetObject,
          [value],
        );
      } catch {
        projection = null;
      }
      if (projection && typeof projection === "object") {
        unitKinds.push(unitKind);
      }
    });
    return Object.freeze([...new Set(unitKinds)]);
  }

  function getRouteResultContinuationUnitKinds(
    operationId = "",
    canonicalResult = null,
  ) {
    const declared = Array.from(
      CLASSICAL_GRAMMAR_APPLICATION_CONTINUATION_TYPE_CONTRACTS[
        operationId
      ]?.outputUnitKinds || [],
    );
    if (operationId === "nnc:ordinary") {
      return Object.freeze([
        "nnc-result",
        "nnc-embeddable-result",
      ]);
    }
    if (operationId === "nnc:pronominal") {
      return Object.freeze(["nnc-result"]);
    }
    if (operationId === "grammar:nominal-construction") {
      if (canonicalResult?.constructionKind === "nominal-embed-vnc") {
        return Object.freeze(["vnc-result"]);
      }
      if (["compound-nnc", "affective-nnc"].includes(
        canonicalResult?.constructionKind,
      )) {
        return Object.freeze([
          "nnc-result",
          "nnc-embeddable-result",
        ]);
      }
      return Object.freeze(
        canonicalResult?.constructionKind === "cardinal-numeral-nnc"
          ? ["nnc-result"]
          : [],
      );
    }
    if (operationId === "nnc:deverbal-construction") {
      return Object.freeze([
        "nnc-result",
        ...(
        canonicalResult?.operationFrame?.nominalizationKind
          === "preterit-agentive"
          ? ["nnc-embeddable-result"]
          : []
        ),
      ]);
    }
    if (operationId === "nnc:adverbial") {
      if (canonicalResult?.scope === "incorporated-predicate") {
        return Object.freeze(["vnc-result"]);
      }
      const clauseKind = String(
        canonicalResult?.sourceFrame?.clauseKind || "",
      ).trim();
      return Object.freeze(
        /^nnc-/u.test(clauseKind)
          ? ["nnc-result"]
          : clauseKind === "vnc"
            ? ["vnc-result"]
            : canonicalResult?.scope === "external-clause"
              ? ["clause-result"]
              : [],
      );
    }
    return Object.freeze(declared);
  }

  function collectOwnerIssuedContinuationResults(
    value,
    found = new Map(),
    seen = new Set(),
  ) {
    if (!value || typeof value !== "object" || seen.has(value)) {
      return found;
    }
    seen.add(value);
    const unitKinds = getCanonicalContinuationUnitKinds(value);
    if (unitKinds.length) found.set(value, unitKinds);
    Reflect.ownKeys(value).forEach(propertyKey => {
      let descriptor = null;
      try {
        descriptor = Object.getOwnPropertyDescriptor(value, propertyKey);
      } catch {
        descriptor = null;
      }
      if (
        descriptor
        && Object.prototype.hasOwnProperty.call(descriptor, "value")
      ) {
        collectOwnerIssuedContinuationResults(
          descriptor.value,
          found,
          seen,
        );
      }
    });
    return found;
  }

  function getIssuedResultProvenance(value = null) {
    if (!value || typeof value !== "object") return null;
    const canonicalApplicationResult =
      issuedApplicationResultByCanonicalResult.get(value) || null;
    if (canonicalApplicationResult) {
      return Object.freeze({
        applicationResult: canonicalApplicationResult,
        exactResult: value,
        resultRole: "canonical-result",
        continuationUnitKinds:
          continuationUnitKindsByResult.get(value) || Object.freeze([]),
      });
    }
    const continuationApplicationResult =
      issuedApplicationResultByContinuationResult.get(value) || null;
    return continuationApplicationResult
      ? Object.freeze({
        applicationResult: continuationApplicationResult,
        exactResult: value,
        resultRole: "continuation-result",
        continuationUnitKinds:
          continuationUnitKindsByResult.get(value) || Object.freeze([]),
      })
      : null;
  }

  function getExactOwnerProbeCandidates(provenance = null) {
    if (
      !provenance
      || !provenance.applicationResult
      || !provenance.exactResult
      || typeof provenance.exactResult !== "object"
    ) {
      return Object.freeze([]);
    }
    const candidates = [];
    const seen = new Set();
    const addCandidate = (exactResult, fallbackRole = "") => {
      if (!exactResult || typeof exactResult !== "object" || seen.has(exactResult)) {
        return;
      }
      const exactProvenance = getIssuedResultProvenance(exactResult);
      if (
        !exactProvenance
        || exactProvenance.applicationResult !== provenance.applicationResult
      ) {
        return;
      }
      const continuationUnitKinds = Object.freeze([
        ...new Set(exactProvenance.continuationUnitKinds || []),
      ]);
      seen.add(exactResult);
      candidates.push(Object.freeze({
        exactResult,
        resultRole: exactProvenance.resultRole || fallbackRole,
        continuationUnitKinds,
      }));
    };
    addCandidate(
      provenance.exactResult,
      provenance.resultRole === "application-result"
        ? "canonical-result"
        : provenance.resultRole,
    );
    (
      continuationResultsByApplicationResult.get(
        provenance.applicationResult,
      ) || Object.freeze([])
    ).forEach(record => addCandidate(
      record.exactResult,
      record.resultRole,
    ));
    return Object.freeze(candidates);
  }

  function buildExactApplicationInstanceContinuationFacts({
    operationId = "",
    outputKind = DEFAULT_APPLICATION_OUTPUT_KIND,
    args = [],
    outerApplicationResult = null,
  } = {}) {
    const slot =
      CLASSICAL_GRAMMAR_APPLICATION_INSTANCE_CONTINUATION_SLOTS[
        operationId
      ] || null;
    if (
      !slot
      || slot.outputKind !== outputKind
      || !Array.isArray(args)
      || !isClassicalGrammarApplicationResult(outerApplicationResult)
      || outerApplicationResult.authorizationStatus !== "authorized"
    ) {
      return Object.freeze([]);
    }
    const exactInnerResult = args[slot.argumentIndex] || null;
    const innerProvenance = getIssuedResultProvenance(exactInnerResult);
    const innerApplicationResult =
      innerProvenance?.applicationResult || null;
    if (
      !innerApplicationResult
      || innerApplicationResult === outerApplicationResult
      || innerApplicationResult.authorizationStatus !== "authorized"
      || !["canonical-result", "continuation-result"].includes(
        innerProvenance.resultRole,
      )
    ) {
      return Object.freeze([]);
    }
    const resolvedProjection = resolveCanonicalCallableCapability(
      targetObject,
      slot.projectionCapabilityName,
      api,
    );
    if (!resolvedProjection) return Object.freeze([]);
    let projection = null;
    try {
      projection = Reflect.apply(
        resolvedProjection.capability,
        targetObject,
        [exactInnerResult],
      );
    } catch {
      projection = null;
    }
    if (!projection || typeof projection !== "object") {
      return Object.freeze([]);
    }
    return Object.freeze([Object.freeze({
      innerApplicationResult,
      outerApplicationResult,
      innerCanonicalResult: exactInnerResult,
      innerProducerCanonicalResult:
        innerApplicationResult.canonicalResult,
      innerResultRole: innerProvenance.resultRole,
      sharedUnitKinds: Object.freeze([slot.unitKind]),
      exactInnerResultIdentityObservedInOuterArguments: true,
      exactContinuationSlotValidated: true,
      ownerContinuationProjectionValidated: true,
      topologyCompatibilityObserved: false,
      compatibilityAuthority: false,
      grammarAuthority: false,
    })]);
  }

  function getClassicalGrammarApplicationRhymeContinuationProvenance(
    currentResult = null,
  ) {
    const provenance = getIssuedResultProvenance(currentResult);
    return provenance
      ? Object.freeze({
        kind:
          "classical-grammar-application-rhyme-continuation-provenance",
        version: 1,
        applicationResult: provenance.applicationResult,
        exactResult: provenance.exactResult,
        resultRole: provenance.resultRole,
        continuationUnitKinds: provenance.continuationUnitKinds,
        grammarAuthority: false,
      })
      : null;
  }

  function getClassicalGrammarApplicationNextOperationInventory(
    currentResult = null,
  ) {
    const provenance = isClassicalGrammarApplicationResult(currentResult)
      ? Object.freeze({
        applicationResult: currentResult,
        exactResult: currentResult.canonicalResult,
        continuationUnitKinds:
          continuationUnitKindsByResult.get(currentResult.canonicalResult)
            || Object.freeze([]),
      })
      : getIssuedResultProvenance(currentResult);
    if (
      !provenance
      || provenance.applicationResult.authorizationStatus !== "authorized"
    ) {
      return null;
    }
    const emittedUnitKinds = Object.freeze([
      ...new Set(provenance.continuationUnitKinds || []),
    ]);
    const candidates = Object.freeze(getClassicalGrammarApplicationInventory()
      .operations.flatMap(operation => {
        const inputUnitKinds = Object.freeze([
          ...(CLASSICAL_GRAMMAR_APPLICATION_CONTINUATION_TYPE_CONTRACTS[
            operation.operationId
          ]?.inputUnitKinds || []),
        ]);
        const sharedUnitKinds = Object.freeze(inputUnitKinds.filter(
          unitKind => emittedUnitKinds.includes(unitKind),
        ));
        return sharedUnitKinds.length
          ? [Object.freeze({
            operationId: operation.operationId,
            capabilityName: operation.capabilityName,
            inputUnitKinds,
            sharedUnitKinds,
            outputUnitKinds: Object.freeze([
              ...(CLASSICAL_GRAMMAR_APPLICATION_CONTINUATION_TYPE_CONTRACTS[
                operation.operationId
              ]?.outputUnitKinds || []),
            ]),
            compatibilityStatus: "type-compatible-owner-check-required",
            grammarAuthority: false,
          })]
          : [];
      }));
    return Object.freeze({
      kind: "classical-grammar-application-next-operation-inventory",
      version: 1,
      applicationResult: provenance.applicationResult,
      exactResult: provenance.exactResult,
      emittedUnitKinds,
      operationIds: Object.freeze(candidates.map(
        candidate => candidate.operationId,
      )),
      candidates,
      candidateCount: candidates.length,
      typeCompatibilityOnly: true,
      ownerAuthorizationStillRequired: true,
      grammarAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
  }

  function evaluateClassicalGrammarDirectCapabilityAvailability({
    operation = null,
    exactOwnerProbeCandidates = [],
    inputUnitKinds = [],
    sharedUnitKinds = [],
  } = {}) {
    const typeCompatibilityStatus = inputUnitKinds.length === 0
      ? "separate-input-required"
      : sharedUnitKinds.length > 0
        ? "type-compatible"
        : "type-incompatible";
    const directOwnerProbeInstalled =
      CLASSICAL_GRAMMAR_APPLICATION_DIRECT_RESULT_PROBE_OPERATION_IDS
        .includes(operation?.operationId);
    const outputContract = getApplicationOutputContract(
      operation?.operationId,
      DEFAULT_APPLICATION_OUTPUT_KIND,
      targetObject,
    );
    const validatorNames = Object.freeze([
      ...(outputContract?.validatorNames || []),
    ]);
    const resolvedCapability = directOwnerProbeInstalled
      && typeCompatibilityStatus === "type-compatible"
      ? resolveCanonicalCallableCapability(
        targetObject,
        operation.capabilityName,
        api,
      )
      : null;
    const resolvedValidators = directOwnerProbeInstalled
      && typeCompatibilityStatus === "type-compatible"
      ? validatorNames.map(validatorName => (
        resolveCanonicalCallableCapability(
          targetObject,
          validatorName,
          api,
        )
      ))
      : [];
    const ownerProbeCapabilityInstalled = Boolean(resolvedCapability);
    const ownerProbeValidatorsInstalled = Boolean(
      validatorNames.length > 0
      && resolvedValidators.length === validatorNames.length
      && resolvedValidators.every(Boolean),
    );
    const compatibleOwnerProbeCandidates = exactOwnerProbeCandidates.filter(
      candidate => candidate.continuationUnitKinds.some(
        unitKind => inputUnitKinds.includes(unitKind),
      ),
    );
    let ownerProbeResult = null;
    let ownerProbeInput = null;
    let ownerProbeThrew = false;
    const ownerProbeInvoked = Boolean(
      typeCompatibilityStatus === "type-compatible"
      && directOwnerProbeInstalled
      && ownerProbeCapabilityInstalled
      && ownerProbeValidatorsInstalled,
    );
    if (ownerProbeInvoked) {
      for (const candidate of compatibleOwnerProbeCandidates) {
        let candidateResult = null;
        let candidateThrew = false;
        try {
          candidateResult = Reflect.apply(
            resolvedCapability.capability,
            targetObject,
            [candidate.exactResult],
          );
        } catch {
          candidateThrew = true;
        }
        const candidateValidated = Boolean(
          candidateResult
          && !candidateThrew
          && resolvedValidators.every(resolved => {
            try {
              return Reflect.apply(
                resolved.capability,
                targetObject,
                [candidateResult],
              ) === true;
            } catch {
              return false;
            }
          })
          && getCanonicalResultAuthorizationStatus(candidateResult)
            === "authorized"
        );
        if (candidateValidated) {
          ownerProbeInput = candidate;
          ownerProbeResult = candidateResult;
          ownerProbeThrew = false;
          break;
        }
        ownerProbeThrew = ownerProbeThrew || candidateThrew;
      }
    }
    const ownerProbeResultValidated = Boolean(
      ownerProbeResult
      && !ownerProbeThrew
      && ownerProbeInput,
    );
    // A type mismatch is evidence that the aggregate lacks a declared handoff;
    // it is not an owner's grammatical rejection. Until an owner issues a
    // separately validated rejection contract, the safe state is pending.
    const ownerRejectionProven = false;
    const availabilityStatus = ownerProbeResultValidated
      ? "available"
      : ownerRejectionProven
        ? "incompatible"
        : "missing-prerequisite";
    const availabilityReason = availabilityStatus === "available"
        ? "canonical-owner-direct-result-validated"
        : typeCompatibilityStatus === "type-incompatible"
          ? "continuation-unit-mismatch-owner-rejection-not-proven"
        : typeCompatibilityStatus === "separate-input-required"
          ? "separate-typed-input-required"
          : !directOwnerProbeInstalled
            ? "direct-owner-probe-not-installed"
            : !ownerProbeCapabilityInstalled
              ? "direct-owner-capability-unavailable"
              : !ownerProbeValidatorsInstalled
                ? "direct-owner-result-validator-unavailable"
                : "direct-owner-requires-more-input";
    return Object.freeze({
      availabilityStatus,
      availabilityReason,
      typeCompatibilityStatus,
      directOwnerProbeInstalled,
      ownerProbeCapabilityName: directOwnerProbeInstalled
        ? operation.capabilityName
        : "",
      ownerProbeValidatorNames: validatorNames,
      ownerProbeCapabilityInstalled,
      ownerProbeValidatorsInstalled,
      ownerProbeInvoked,
      ownerProbeThrew,
      ownerProbeInputResult: ownerProbeResultValidated
        ? ownerProbeInput.exactResult
        : null,
      ownerProbeInputResultRole: ownerProbeResultValidated
        ? ownerProbeInput.resultRole
        : "",
      ownerProbeInputUnitKinds: ownerProbeResultValidated
        ? ownerProbeInput.continuationUnitKinds
        : Object.freeze([]),
      ownerProbeInputExactIdentityMatched: ownerProbeResultValidated,
      ownerProbeInputExactCanonicalResultIdentity: Boolean(
        ownerProbeResultValidated
        && ownerProbeInput.resultRole === "canonical-result"
      ),
      ownerProbeInputExactContinuationResultIdentity: Boolean(
        ownerProbeResultValidated
        && ownerProbeInput.resultRole === "continuation-result"
      ),
      ownerProbeResultKind: ownerProbeResultValidated
        ? String(ownerProbeResult.kind || "")
        : "",
      ownerProbeResultValidated,
      ownerInputAcceptanceProven: ownerProbeResultValidated,
      ownerRejectionProven,
      ownerEvaluationStatus: ownerProbeResultValidated
        ? "accepted"
        : ownerProbeInvoked
          ? "requires-more-input"
          : "not-evaluated",
      availabilityAuthority: ownerProbeResultValidated
        ? "canonical-owner-direct-probe"
        : ownerRejectionProven
          ? "canonical-owner-direct-rejection"
          : "none",
    });
  }

  function issueClassicalGrammarFormationResultBindingFrame(
    operationId = "",
    currentResult = null,
    selections = {},
  ) {
    const normalizedOperationId = String(operationId || "").trim();
    const provenance = getIssuedResultProvenance(currentResult);
    const recognized = [
      "nnc:place-gentilic",
      "vnc:denominal",
      "nnc:adverbial",
      "nnc:personal-name",
    ].includes(normalizedOperationId);
    let preflightFrame = null;
    let accepted = false;
    let ownerPreflightCapabilityName = "";
    let ownerPreflightValidatorName = "";
    let ownerChoiceFrame = null;
    let ownerChoiceFrameValidated = false;
    let ownerChoiceOptionProjection = Object.freeze({});
    let selectedOwnerChoices = Object.freeze({});
    let adverbialRequiredChoiceIds = null;
    let denominalRequiredChoiceIds = null;
    let placeGentilicRequiredChoiceIds = null;
    let preflightThrew = false;
    if (recognized && provenance) {
      if (normalizedOperationId === "vnc:denominal") {
        ownerPreflightCapabilityName =
          "getClassicalNahuatlDenominalVncOperationPathInventory";
        ownerPreflightValidatorName =
          "isClassicalNahuatlDenominalVncOperationPathInventory";
        const resolvedPreflight = resolveCanonicalCallableCapability(
          targetObject,
          ownerPreflightCapabilityName,
          api,
        );
        const resolvedValidator = resolveCanonicalCallableCapability(
          targetObject,
          ownerPreflightValidatorName,
          api,
        );
        try {
          preflightFrame = resolvedPreflight
            ? Reflect.apply(
              resolvedPreflight.capability,
              targetObject,
              [{ canonicalNncResult: currentResult }],
            )
            : null;
          accepted = Boolean(
            preflightFrame
            && resolvedValidator
            && Reflect.apply(
              resolvedValidator.capability,
              targetObject,
              [preflightFrame],
            ) === true
            && preflightFrame.authorizationStatus === "authorized"
            && preflightFrame.canonicalNncResult === currentResult
          );
          if (accepted) {
            const operationOptions = Array.isArray(
              preflightFrame.operationOptions
            ) ? preflightFrame.operationOptions : [];
            const pathChoices = Array.isArray(preflightFrame.pathChoices)
              ? preflightFrame.pathChoices
              : [];
            const selectedOperation = String(
              selections?.denominalOperation || ""
            ).trim();
            const selectedPath = String(
              selections?.denominalOperationPath || ""
            ).trim();
            const operationValid = operationOptions.some(option => (
              option.operationId === selectedOperation
            ));
            const compatiblePaths = operationValid
              ? pathChoices.filter(choice => (
                choice.operationId === selectedOperation
              ))
              : [];
            const pathValid = compatiblePaths.some(choice => (
              choice.pathChoiceId === selectedPath
            ));
            ownerChoiceFrame = preflightFrame;
            ownerChoiceFrameValidated = true;
            ownerChoiceOptionProjection = Object.freeze({
              "classical-denominal-vnc-operation": Object.freeze(
                operationOptions.map(option => option.operationId)
              ),
              "classical-denominal-vnc-operation-path": Object.freeze(
                compatiblePaths.map(choice => choice.pathChoiceId)
              ),
            });
            selectedOwnerChoices = Object.freeze({
              "classical-denominal-vnc-operation": selectedOperation,
              "classical-denominal-vnc-operation-path": selectedPath,
            });
            denominalRequiredChoiceIds = Object.freeze([
              ...(!operationValid
                ? ["classical-denominal-vnc-operation"]
                : []),
              ...(operationValid && !pathValid
                ? ["classical-denominal-vnc-operation-path"]
                : []),
            ]);
          }
        } catch {
          preflightThrew = true;
          accepted = false;
        }
      } else if (normalizedOperationId === "nnc:place-gentilic") {
        ownerPreflightCapabilityName =
          "resolvePlaceGentilicNncExactSource";
        const resolvedPreflight = resolveCanonicalCallableCapability(
          targetObject,
          ownerPreflightCapabilityName,
          api,
        );
        try {
          preflightFrame = resolvedPreflight
            ? Reflect.apply(
              resolvedPreflight.capability,
              targetObject,
              [{ canonicalNncResult: currentResult }],
            )
            : null;
          accepted = Boolean(
            preflightFrame?.authorizationStatus === "authorized"
            && preflightFrame.canonicalNncResult === currentResult
            && preflightFrame.exactNncResultIdentityPreserved === true
          );
          const selectedConstructionKind = String(
            selections?.constructionKind || ""
          ).trim();
          const selectedFormation = String(
            selections?.formation || ""
          ).trim();
          let selectedChoiceAccepted = false;
          if (accepted && selectedConstructionKind && selectedFormation) {
            const selectedChoiceFrame = Reflect.apply(
              resolvedPreflight.capability,
              targetObject,
              [{
                canonicalNncResult: currentResult,
                constructionKind: selectedConstructionKind,
                formation: selectedFormation,
              }],
            );
            selectedChoiceAccepted = Boolean(
              selectedChoiceFrame?.authorizationStatus === "authorized"
              && selectedChoiceFrame.canonicalNncResult === currentResult
              && selectedChoiceFrame.exactNncResultIdentityPreserved === true
            );
            if (selectedChoiceAccepted) {
              ownerChoiceFrame = selectedChoiceFrame;
              ownerChoiceFrameValidated = true;
            }
          }
          selectedOwnerChoices = Object.freeze({
            "classical-place-gentilic-result-kind":
              selectedConstructionKind,
            "classical-place-gentilic-formation": selectedFormation,
          });
          placeGentilicRequiredChoiceIds = Object.freeze([
            ...(!selectedConstructionKind
              ? ["classical-place-gentilic-result-kind"]
              : []),
            ...(!selectedFormation || !selectedChoiceAccepted
              ? ["classical-place-gentilic-formation"]
              : []),
          ]);
        } catch {
          preflightThrew = true;
          accepted = false;
        }
      } else if (normalizedOperationId === "nnc:adverbial") {
        ownerPreflightCapabilityName =
          "resolveClassicalNahuatlAdverbialExactSource";
        ownerPreflightValidatorName =
          "isClassicalNahuatlAdverbialExactSourceResolution";
        const resolvedPreflight = resolveCanonicalCallableCapability(
          targetObject,
          ownerPreflightCapabilityName,
          api,
        );
        const resolvedValidator = resolveCanonicalCallableCapability(
          targetObject,
          ownerPreflightValidatorName,
          api,
        );
        try {
          preflightFrame = resolvedPreflight
            ? Reflect.apply(
              resolvedPreflight.capability,
              targetObject,
              [{ canonicalSourceResult: currentResult }],
            )
            : null;
          accepted = Boolean(
            preflightFrame
            && resolvedValidator
            && Reflect.apply(
              resolvedValidator.capability,
              targetObject,
              [preflightFrame],
            ) === true
            && preflightFrame.authorizationStatus === "authorized"
            && preflightFrame.canonicalSourceResult === currentResult
            && preflightFrame.exactSourceResultIdentityPreserved === true
          );
          if (accepted) {
            const resolvedChoiceFrame = resolveCanonicalCallableCapability(
              targetObject,
              "resolveClassicalNahuatlAdverbialPotential",
              api,
            );
            const resolvedChoiceValidator =
              resolveCanonicalCallableCapability(
                targetObject,
                "isClassicalNahuatlAdverbialPotentialFrame",
                api,
              );
            ownerChoiceFrame = resolvedChoiceFrame
              ? Reflect.apply(
                resolvedChoiceFrame.capability,
                targetObject,
                [{ canonicalSourceResult: currentResult }],
              )
              : null;
            ownerChoiceFrameValidated = Boolean(
              ownerChoiceFrame
              && resolvedChoiceValidator
              && Reflect.apply(
                resolvedChoiceValidator.capability,
                targetObject,
                [ownerChoiceFrame],
              ) === true
              && ownerChoiceFrame.authorizationStatus === "authorized"
              && ownerChoiceFrame.canonicalSourceResult === currentResult
              && ownerChoiceFrame.exactSourceResultIdentityPreserved === true
            );
            accepted = ownerChoiceFrameValidated;
            if (ownerChoiceFrameValidated) {
              const choices = ownerChoiceFrame.contextChoices || {};
              ownerChoiceOptionProjection = Object.freeze({
                degree: Object.freeze([
                  ...(ownerChoiceFrame.allowedDegrees || []),
                ]),
                scope: Object.freeze([
                  ...(ownerChoiceFrame.allowedScopes || []),
                ]),
                "preceding-particle": Object.freeze([
                  ...(choices.precedingParticles || []),
                ]),
                "negative-particle": Object.freeze([
                  ...(choices.negativeParticles || []),
                ]),
                "negation-scope": Object.freeze([
                  ...(choices.negationScopes || []),
                ]),
                "stress-partner": Object.freeze([
                  ...(choices.stressPartners || []),
                ]),
                "surface-variant": Object.freeze([
                  ...(choices.variants || []),
                ]),
                "sentence-position": Object.freeze([
                  ...(choices.sentencePositions || []),
                ]),
                "clause-type": Object.freeze([
                  ...(choices.clauseTypes || []),
                ]),
              });
              selectedOwnerChoices = Object.freeze({
                degree: String(selections?.degree || "").trim(),
                scope: String(selections?.scope || "").trim(),
                "preceding-particle": String(
                  selections?.precedingParticle || ""
                ).trim(),
                "negative-particle": String(
                  selections?.negativeParticle || ""
                ).trim(),
                "negation-scope": String(
                  selections?.negationScope || ""
                ).trim(),
                "stress-partner": String(
                  selections?.stressPartner || ""
                ).trim(),
                "surface-variant": String(
                  selections?.surfaceVariant || ""
                ).trim(),
                "sentence-position": String(
                  selections?.sentencePosition || ""
                ).trim(),
                "clause-type": String(
                  selections?.clauseType || ""
                ).trim(),
              });
              adverbialRequiredChoiceIds = Object.freeze(
                (preflightFrame.requiredChoiceIds || []).filter(choiceId => (
                  !ownerChoiceOptionProjection[choiceId]?.includes(
                    selectedOwnerChoices[choiceId]
                  )
                ))
              );
            }
          }
        } catch {
          preflightThrew = true;
          accepted = false;
        }
      } else if (normalizedOperationId === "nnc:personal-name") {
        ownerPreflightCapabilityName = "resolvePersonalNameNncExactSource";
        ownerPreflightValidatorName =
          "isPersonalNameNncExactSourceResolution";
        const resolvedPreflight = resolveCanonicalCallableCapability(
          targetObject,
          ownerPreflightCapabilityName,
          api,
        );
        const resolvedValidator = resolveCanonicalCallableCapability(
          targetObject,
          ownerPreflightValidatorName,
          api,
        );
        try {
          preflightFrame = resolvedPreflight
            ? Reflect.apply(
              resolvedPreflight.capability,
              targetObject,
              [{
                canonicalSourceResult: currentResult,
                ...(String(selections?.sourceFamily || "").trim()
                  ? {
                    sourceFamily: String(
                      selections.sourceFamily,
                    ).trim(),
                  }
                  : {}),
                ...(String(selections?.outerSubject || "").trim()
                  ? {
                    outerSubject: String(
                      selections.outerSubject,
                    ).trim(),
                  }
                  : {}),
              }],
            )
            : null;
          accepted = Boolean(
            preflightFrame
            && resolvedValidator
            && Reflect.apply(
              resolvedValidator.capability,
              targetObject,
              [preflightFrame],
            ) === true
            && preflightFrame.authorizationStatus === "authorized"
            && preflightFrame.canonicalSourceResult === currentResult
            && preflightFrame.exactSourceResultIdentityPreserved === true
          );
        } catch {
          preflightThrew = true;
          accepted = false;
        }
      }
    }
    const requiredChoiceIdsByOperation = {
      "vnc:denominal": [
        ...(denominalRequiredChoiceIds || [
          "classical-denominal-vnc-operation",
          "classical-denominal-vnc-operation-path",
        ]),
      ],
      "nnc:place-gentilic": [
        ...(placeGentilicRequiredChoiceIds || [
          "classical-place-gentilic-result-kind",
          "classical-place-gentilic-formation",
        ]),
      ],
      "nnc:adverbial": [
        ...(adverbialRequiredChoiceIds
          || preflightFrame?.requiredChoiceIds || []),
      ],
      "nnc:personal-name": [
        ...(preflightFrame?.requiredChoiceIds || []),
      ],
    };
    const inputRoleByOperation = {
      "vnc:denominal": "denominal-nnc-source",
      "nnc:place-gentilic": "place-gentilic-nnc-source",
      "nnc:adverbial": "adverbial-vnc-nnc-or-clause-source",
      "nnc:personal-name": "personal-name-vnc-nnc-or-clause-source",
    };
    const requiredChoiceIds = Object.freeze(accepted
      ? requiredChoiceIdsByOperation[normalizedOperationId] || []
      : []);
    const inputRole = accepted
      ? inputRoleByOperation[normalizedOperationId] || ""
      : "";
    const frame = Object.freeze({
      kind: "classical-grammar-formation-result-binding-frame",
      version: 1,
      authorizationStatus: accepted ? "authorized" : "blocked",
      blockReason: accepted
        ? ""
        : !recognized
          ? "classical-formation-binding-operation-not-recognized"
          : !provenance
            ? "classical-formation-binding-exact-issued-result-required"
            : preflightThrew
              ? "classical-formation-binding-owner-preflight-threw"
              : String(
                preflightFrame?.blockReason
                || "classical-formation-binding-owner-preflight-blocked",
              ),
      operationId: recognized ? normalizedOperationId : "",
      exactResult: accepted ? currentResult : null,
      applicationResult: accepted ? provenance.applicationResult : null,
      capturedResultRole: accepted ? provenance.resultRole : "",
      inputRole,
      bindingIds: Object.freeze(accepted ? [inputRole] : []),
      requiredChoiceIds,
      requiredResultRoles: Object.freeze([]),
      ownerChoicesRequired: requiredChoiceIds.length > 0,
      ownerPreflightCapabilityName,
      ownerPreflightValidatorName,
      ownerPreflightFrame: accepted ? preflightFrame : null,
      ownerPreflightValidated: accepted,
      ownerChoiceFrame: accepted ? ownerChoiceFrame : null,
      ownerChoiceFrameValidated: accepted
        ? ownerChoiceFrameValidated
        : false,
      ownerChoiceOptionProjection: accepted
        ? ownerChoiceOptionProjection
        : Object.freeze({}),
      selectedOwnerChoices: accepted
        ? selectedOwnerChoices
        : Object.freeze({}),
      ownerInputAcceptanceProven: accepted,
      ownerRejectionProven: false,
      exactResultIdentityPreserved: accepted,
      ownerAuthorizationStillRequired: true,
      grammarAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
    issuedFormationResultBindingFrames.add(frame);
    return frame;
  }

  function isClassicalGrammarFormationResultBindingFrame(frame = null) {
    if (
      !frame
      || !issuedFormationResultBindingFrames.has(frame)
      || frame.kind
        !== "classical-grammar-formation-result-binding-frame"
      || frame.version !== 1
      || !["authorized", "blocked"].includes(frame.authorizationStatus)
      || !Array.isArray(frame.bindingIds)
      || !Array.isArray(frame.requiredChoiceIds)
      || !Array.isArray(frame.requiredResultRoles)
      || frame.ownerAuthorizationStillRequired !== true
      || frame.grammarAuthority !== false
      || !Object.isFrozen(frame)
      || !Object.isFrozen(frame.bindingIds)
      || !Object.isFrozen(frame.requiredChoiceIds)
      || !Object.isFrozen(frame.requiredResultRoles)
    ) return false;
    if (frame.authorizationStatus === "blocked") {
      return Boolean(
        frame.blockReason
        && frame.exactResult === null
        && frame.ownerInputAcceptanceProven === false
        && frame.bindingIds.length === 0
      );
    }
    const provenance = getIssuedResultProvenance(frame.exactResult);
    if (
      !provenance
      || provenance.applicationResult !== frame.applicationResult
      || provenance.resultRole !== frame.capturedResultRole
      || frame.ownerPreflightValidated !== true
      || frame.ownerInputAcceptanceProven !== true
      || frame.ownerRejectionProven !== false
      || frame.exactResultIdentityPreserved !== true
      || frame.bindingIds.length !== 1
      || frame.bindingIds[0] !== frame.inputRole
      || !frame.ownerPreflightFrame
    ) return false;
    if (frame.operationId === "vnc:denominal") {
      const resolvedValidator = resolveCanonicalCallableCapability(
        targetObject,
        "isClassicalNahuatlDenominalVncOperationPathInventory",
        api,
      );
      try {
        return Boolean(
          resolvedValidator
          && Reflect.apply(
            resolvedValidator.capability,
            targetObject,
            [frame.ownerPreflightFrame],
          ) === true
          && frame.ownerPreflightFrame.canonicalNncResult
            === frame.exactResult
        );
      } catch {
        return false;
      }
    }
    if (frame.operationId === "nnc:place-gentilic") {
      return Boolean(
        frame.ownerPreflightFrame.authorizationStatus === "authorized"
        && frame.ownerPreflightFrame.canonicalNncResult
          === frame.exactResult
        && frame.ownerPreflightFrame.exactNncResultIdentityPreserved === true
      );
    }
    if (frame.operationId === "nnc:adverbial") {
      const resolvedValidator = resolveCanonicalCallableCapability(
        targetObject,
        "isClassicalNahuatlAdverbialExactSourceResolution",
        api,
      );
      const resolvedChoiceValidator = resolveCanonicalCallableCapability(
        targetObject,
        "isClassicalNahuatlAdverbialPotentialFrame",
        api,
      );
      try {
        return Boolean(
          resolvedValidator
          && Reflect.apply(
            resolvedValidator.capability,
            targetObject,
            [frame.ownerPreflightFrame],
          ) === true
          && frame.ownerPreflightFrame.canonicalSourceResult
            === frame.exactResult
          && frame.ownerPreflightFrame.exactSourceResultIdentityPreserved
            === true
          && frame.ownerChoiceFrameValidated === true
          && resolvedChoiceValidator
          && Reflect.apply(
            resolvedChoiceValidator.capability,
            targetObject,
            [frame.ownerChoiceFrame],
          ) === true
          && frame.ownerChoiceFrame.authorizationStatus === "authorized"
          && frame.ownerChoiceFrame.canonicalSourceResult
            === frame.exactResult
          && frame.ownerChoiceFrame.exactSourceResultIdentityPreserved
            === true
          && Object.isFrozen(frame.ownerChoiceOptionProjection)
          && Object.isFrozen(frame.selectedOwnerChoices)
        );
      } catch {
        return false;
      }
    }
    if (frame.operationId === "nnc:personal-name") {
      const resolvedValidator = resolveCanonicalCallableCapability(
        targetObject,
        "isPersonalNameNncExactSourceResolution",
        api,
      );
      try {
        return Boolean(
          resolvedValidator
          && Reflect.apply(
            resolvedValidator.capability,
            targetObject,
            [frame.ownerPreflightFrame],
          ) === true
          && frame.ownerPreflightFrame.canonicalSourceResult
            === frame.exactResult
          && frame.ownerPreflightFrame.exactSourceResultIdentityPreserved
            === true
        );
      } catch {
        return false;
      }
    }
    return false;
  }

  function evaluateClassicalGrammarResultBindingAvailability({
    operation = null,
    exactOwnerProbeCandidates = [],
    directAvailability = null,
  } = {}) {
    if (directAvailability?.availabilityStatus === "available") {
      return Object.freeze({
        ...directAvailability,
        ownerBindingContractDeclared: false,
        ownerBindingFamily: "",
        ownerBindingIssuerCapabilityName: "",
        ownerBindingValidatorCapabilityName: "",
        ownerBindingCapabilitiesInstalled: false,
        ownerBindingInvoked: false,
        ownerBindingThrew: false,
        ownerBindingFrame: null,
        ownerBindingFrameValidated: false,
        ownerBindingInputResult: null,
        ownerBindingInputResultRole: "",
        ownerBindingIds: Object.freeze([]),
        requiredChoiceIds: Object.freeze([]),
        requiredResultRoles: Object.freeze([]),
        ownerChoicesRequired: false,
      });
    }
    const contract =
      CLASSICAL_GRAMMAR_APPLICATION_RESULT_BINDING_CONTRACTS[
        operation?.operationId
      ] || null;
    const resolvedIssuer = contract
      ? resolveCanonicalCallableCapability(
        targetObject,
        contract.issuerCapabilityName,
        api,
      )
      : null;
    const resolvedValidator = contract
      ? resolveCanonicalCallableCapability(
        targetObject,
        contract.validatorCapabilityName,
        api,
      )
      : null;
    const capabilitiesInstalled = Boolean(
      resolvedIssuer && resolvedValidator,
    );
    let acceptedFrame = null;
    let acceptedCandidate = null;
    let rejectedFrame = null;
    let invoked = false;
    let threw = false;
    if (contract && capabilitiesInstalled) {
      for (const candidate of exactOwnerProbeCandidates) {
        let frame = null;
        invoked = true;
        try {
          frame = Reflect.apply(
            resolvedIssuer.capability,
            targetObject,
            [operation.operationId, candidate.exactResult],
          );
        } catch {
          threw = true;
          continue;
        }
        let validated = false;
        try {
          validated = Reflect.apply(
            resolvedValidator.capability,
            targetObject,
            [frame],
          ) === true;
        } catch {
          validated = false;
        }
        if (!validated) continue;
        if (
          frame.authorizationStatus === "authorized"
          && frame.ownerInputAcceptanceProven === true
        ) {
          acceptedFrame = frame;
          acceptedCandidate = candidate;
          break;
        }
        if (frame.ownerRejectionProven === true) rejectedFrame = frame;
      }
    }
    const bindingAccepted = Boolean(acceptedFrame && acceptedCandidate);
    const rejectionProven = Boolean(!bindingAccepted && rejectedFrame);
    const requiredChoiceIds = Object.freeze([
      ...(acceptedFrame?.requiredChoiceIds || []),
    ]);
    const requiredResultRoles = Object.freeze([
      ...(acceptedFrame?.requiredResultRoles || []),
    ]);
    const ownerBindingIds = Object.freeze([
      ...(acceptedFrame?.bindingIds || []),
    ]);
    if (!bindingAccepted && !rejectionProven) {
      return Object.freeze({
        ...directAvailability,
        ownerBindingContractDeclared: Boolean(contract),
        ownerBindingFamily: contract?.family || "",
        ownerBindingIssuerCapabilityName:
          contract?.issuerCapabilityName || "",
        ownerBindingValidatorCapabilityName:
          contract?.validatorCapabilityName || "",
        ownerBindingCapabilitiesInstalled: capabilitiesInstalled,
        ownerBindingInvoked: invoked,
        ownerBindingThrew: threw,
        ownerBindingFrame: null,
        ownerBindingFrameValidated: false,
        ownerBindingInputResult: null,
        ownerBindingInputResultRole: "",
        ownerBindingIds,
        requiredChoiceIds,
        requiredResultRoles,
        ownerChoicesRequired: false,
      });
    }
    return Object.freeze({
      ...directAvailability,
      availabilityStatus: bindingAccepted
        ? "available"
        : "incompatible",
      availabilityReason: bindingAccepted
        ? "canonical-owner-result-binding-accepted"
        : String(
          rejectedFrame?.blockReason
          || "canonical-owner-result-binding-rejected",
        ),
      ownerProbeInputResult: bindingAccepted
        ? acceptedCandidate.exactResult
        : null,
      ownerProbeInputResultRole: bindingAccepted
        ? acceptedCandidate.resultRole
        : "",
      ownerProbeInputUnitKinds: bindingAccepted
        ? acceptedCandidate.continuationUnitKinds
        : Object.freeze([]),
      ownerProbeInputExactIdentityMatched: bindingAccepted,
      ownerProbeInputExactCanonicalResultIdentity: Boolean(
        bindingAccepted
        && acceptedCandidate.resultRole === "canonical-result"
      ),
      ownerProbeInputExactContinuationResultIdentity: Boolean(
        bindingAccepted
        && acceptedCandidate.resultRole === "continuation-result"
      ),
      ownerInputAcceptanceProven: bindingAccepted,
      ownerRejectionProven: rejectionProven,
      ownerEvaluationStatus: bindingAccepted ? "accepted" : "rejected",
      availabilityAuthority: bindingAccepted
        ? "canonical-owner-result-binding"
        : "canonical-owner-result-binding-rejection",
      ownerBindingContractDeclared: true,
      ownerBindingFamily: contract.family,
      ownerBindingIssuerCapabilityName: contract.issuerCapabilityName,
      ownerBindingValidatorCapabilityName: contract.validatorCapabilityName,
      ownerBindingCapabilitiesInstalled: capabilitiesInstalled,
      ownerBindingInvoked: invoked,
      ownerBindingThrew: threw,
      ownerBindingFrame: bindingAccepted ? acceptedFrame : rejectedFrame,
      ownerBindingFrameValidated: true,
      ownerBindingInputResult: bindingAccepted
        ? acceptedCandidate.exactResult
        : null,
      ownerBindingInputResultRole: bindingAccepted
        ? acceptedCandidate.resultRole
        : "",
      ownerBindingIds,
      requiredChoiceIds,
      requiredResultRoles,
      ownerChoicesRequired: Boolean(
        acceptedFrame?.ownerChoicesRequired === true
        || ownerBindingIds.length > 1
        || requiredChoiceIds.length > 0
        || requiredResultRoles.length > 0
      ),
    });
  }

  function getIssuedTypedSourceProvenance(exactSource = null) {
    if (!exactSource || typeof exactSource !== "object") return null;
    const cached = typedSourceProvenanceByExactSource.get(exactSource);
    if (cached) return cached;
    const matches = Object.freeze(Object.entries(
      CLASSICAL_GRAMMAR_APPLICATION_TYPED_SOURCE_CONTRACTS,
    ).flatMap(([operationId, contract]) => {
      for (const validatorName of contract.sourceValidatorNames) {
        const resolved = resolveCanonicalCallableCapability(
          targetObject,
          validatorName,
          api,
        );
        if (!resolved) continue;
        let accepted = false;
        try {
          accepted = Reflect.apply(
            resolved.capability,
            targetObject,
            [exactSource],
          ) === true;
        } catch {
          accepted = false;
        }
        if (accepted) {
          return [Object.freeze({
            operationId,
            sourceUnitKind: contract.sourceUnitKind,
            sourceValidatorName: validatorName,
          })];
        }
      }
      return [];
    }));
    if (!matches.length) return null;
    const provenance = Object.freeze({
      exactSource,
      sourceUnitKinds: Object.freeze([...new Set(matches.map(
        match => match.sourceUnitKind,
      ))]),
      operationIds: Object.freeze(matches.map(match => match.operationId)),
      matches,
    });
    typedSourceProvenanceByExactSource.set(exactSource, provenance);
    return provenance;
  }

  function typedSourcePreflightRequiresChoices(preflightFrame = null) {
    if (!preflightFrame || typeof preflightFrame !== "object") return false;
    if ([
      "selectionRequired",
      "selectorRequired",
      "analysisSelectionRequired",
      "operationSelectionRequired",
      "pathSelectionRequired",
    ].some(key => preflightFrame[key] === true)) {
      return true;
    }
    if ([
      "metaphoricalUseAvailable",
      "possessorReduplicationAvailable",
      "doubledFirstPluralAvailable",
      "dependentClauseIntroducedByInAvailable",
      "specialHumanUseAvailable",
    ].some(key => preflightFrame[key] === true)) {
      return true;
    }
    return [
      "stateValues",
      "subjectValues",
      "humannessValues",
      "animacyValues",
      "stemRelationValues",
      "predicateOptionValues",
      "possessorValues",
      "pluralConnectorValues",
      "adjunctorInValues",
      "clausePositionValues",
      "numberFormValues",
      "predicatePluralizationValues",
    ].some(key => Array.isArray(preflightFrame[key])
      && preflightFrame[key].length > 1);
  }

  function evaluateClassicalGrammarTypedSourceAvailability({
    operation = null,
    provenance = null,
  } = {}) {
    const operationId = operation?.operationId || "";
    const sourceContract =
      CLASSICAL_GRAMMAR_APPLICATION_TYPED_SOURCE_CONTRACTS[
        operationId
      ] || null;
    const sourceMatch = provenance?.matches?.find(
      match => match.operationId === operationId,
    ) || null;
    const continuationContract =
      CLASSICAL_GRAMMAR_APPLICATION_CONTINUATION_TYPE_CONTRACTS[
        operationId
      ] || null;
    const sourceValidatorNames = Object.freeze([
      ...(sourceContract?.sourceValidatorNames || []),
    ]);
    const resolvedSourceValidators = sourceValidatorNames.map(
      validatorName => resolveCanonicalCallableCapability(
        targetObject,
        validatorName,
        api,
      ),
    );
    const sourceValidatorsInstalled = Boolean(
      sourceValidatorNames.length
      && resolvedSourceValidators.every(Boolean),
    );
    if (!sourceMatch || !sourceContract) {
      const availabilityReason = sourceContract
        ? "different-owner-issued-source-required"
        : continuationContract?.inputUnitKinds?.length
          ? "canonical-result-required"
          : "owner-source-preflight-not-declared";
      return Object.freeze({
        availabilityStatus: "missing-prerequisite",
        availabilityReason,
        sourceContractDeclared: Boolean(sourceContract),
        sourceUnitKinds: Object.freeze(sourceContract
          ? [sourceContract.sourceUnitKind]
          : []),
        matchedSourceUnitKinds: Object.freeze([]),
        sourceValidatorNames,
        sourceValidatorsInstalled,
        sourceValidatorName: "",
        sourceIdentityMatched: false,
        ownerPreflightCapabilityName:
          sourceContract?.preflightCapabilityName || "",
        ownerPreflightValidatorNames: Object.freeze([
          ...(sourceContract?.preflightValidatorNames || []),
        ]),
        ownerPreflightCapabilityInstalled: false,
        ownerPreflightValidatorsInstalled: false,
        ownerPreflightInvoked: false,
        ownerPreflightThrew: false,
        ownerPreflightFrame: null,
        ownerPreflightFrames: Object.freeze([]),
        ownerPreflightResultKind: "",
        ownerPreflightFrameValidated: false,
        ownerChoicesRequired: false,
        ownerInputAcceptanceProven: false,
        ownerRejectionProven: false,
        ownerEvaluationStatus: "not-evaluated",
        availabilityAuthority: "none",
      });
    }
    const resolvedPreflight = resolveCanonicalCallableCapability(
      targetObject,
      sourceContract.preflightCapabilityName,
      api,
    );
    const resolvedPreflightValidators =
      sourceContract.preflightValidatorNames.map(
        validatorName => resolveCanonicalCallableCapability(
          targetObject,
          validatorName,
          api,
        ),
      );
    const ownerPreflightCapabilityInstalled = Boolean(resolvedPreflight);
    const ownerPreflightValidatorsInstalled = Boolean(
      resolvedPreflightValidators.every(Boolean),
    );
    const ownerPreflightInvoked = Boolean(
      sourceValidatorsInstalled
      && ownerPreflightCapabilityInstalled
      && ownerPreflightValidatorsInstalled,
    );
    let ownerPreflightThrew = false;
    const preflightFrames = ownerPreflightInvoked
      ? sourceContract.preflightRequests.map(preflightRequest => {
        try {
          return Reflect.apply(
            resolvedPreflight.capability,
            targetObject,
            [provenance.exactSource, preflightRequest],
          );
        } catch {
          ownerPreflightThrew = true;
          return null;
        }
      })
      : [];
    const validatedPreflightFrames = Object.freeze(
      preflightFrames.filter(preflightFrame => {
        const structureValidated = Boolean(
          preflightFrame
          && typeof preflightFrame === "object"
          && preflightFrame.kind === sourceContract.preflightKind
          && preflightFrame.authorizationStatus === "authorized"
          && preflightFrame[sourceContract.preflightSourceProperty]
            === provenance.exactSource
          && Object.isFrozen(preflightFrame),
        );
        if (!structureValidated) return false;
        return resolvedPreflightValidators.every(resolved => {
          try {
            return Reflect.apply(
              resolved.capability,
              targetObject,
              [preflightFrame],
            ) === true;
          } catch {
            return false;
          }
        });
      }),
    );
    const ownerPreflightFrameValidated = Boolean(
      ownerPreflightInvoked
      && validatedPreflightFrames.length,
    );
    const ownerChoicesRequired = ownerPreflightFrameValidated
      && (
        validatedPreflightFrames.length > 1
        || validatedPreflightFrames.some(
          typedSourcePreflightRequiresChoices,
        )
      );
    const availabilityStatus = ownerPreflightFrameValidated
      ? "available"
      : "missing-prerequisite";
    const availabilityReason = ownerPreflightFrameValidated
      ? ownerChoicesRequired
        ? "canonical-owner-choices-required"
        : "canonical-owner-source-preflight-accepted"
      : !sourceValidatorsInstalled
        ? "canonical-source-validator-unavailable"
        : !ownerPreflightCapabilityInstalled
          ? "canonical-owner-source-preflight-unavailable"
          : !ownerPreflightValidatorsInstalled
            ? "canonical-owner-source-preflight-validator-unavailable"
            : ownerPreflightThrew
              ? "canonical-owner-source-preflight-threw"
              : "canonical-owner-source-preflight-requires-more-input";
    return Object.freeze({
      availabilityStatus,
      availabilityReason,
      sourceContractDeclared: true,
      sourceUnitKinds: Object.freeze([sourceContract.sourceUnitKind]),
      matchedSourceUnitKinds: Object.freeze([sourceMatch.sourceUnitKind]),
      sourceValidatorNames,
      sourceValidatorsInstalled,
      sourceValidatorName: sourceMatch.sourceValidatorName,
      sourceIdentityMatched: true,
      ownerPreflightCapabilityName:
        sourceContract.preflightCapabilityName,
      ownerPreflightValidatorNames: Object.freeze([
        ...sourceContract.preflightValidatorNames,
      ]),
      ownerPreflightCapabilityInstalled,
      ownerPreflightValidatorsInstalled,
      ownerPreflightInvoked,
      ownerPreflightThrew,
      ownerPreflightFrame: ownerPreflightFrameValidated
        ? validatedPreflightFrames[0]
        : null,
      ownerPreflightFrames: validatedPreflightFrames,
      ownerPreflightResultKind: ownerPreflightFrameValidated
        ? String(validatedPreflightFrames[0].kind || "")
        : "",
      ownerPreflightFrameValidated,
      ownerChoicesRequired,
      ownerInputAcceptanceProven: ownerPreflightFrameValidated,
      ownerRejectionProven: false,
      ownerEvaluationStatus: ownerPreflightFrameValidated
        ? "accepted"
        : ownerPreflightInvoked
          ? "requires-more-input"
          : "not-evaluated",
      availabilityAuthority: ownerPreflightFrameValidated
        ? "canonical-owner-source-preflight"
        : "none",
    });
  }

  function getClassicalGrammarApplicationTypedSourceCapabilityNavigator(
    exactSource = null,
  ) {
    const provenance = getIssuedTypedSourceProvenance(exactSource);
    if (!provenance) return null;
    const cached = typedSourceCapabilityNavigatorByExactSource.get(
      exactSource,
    );
    if (cached) return cached;
    const inventory = getClassicalGrammarApplicationInventory();
    const operations = Object.freeze(inventory.operations.flatMap(
      operation => {
        const continuationContract =
          CLASSICAL_GRAMMAR_APPLICATION_CONTINUATION_TYPE_CONTRACTS[
            operation.operationId
          ];
        if (!continuationContract) return [];
        const ownerAvailability =
          evaluateClassicalGrammarTypedSourceAvailability({
            operation,
            provenance,
          });
        const signature =
          operation.rhymeRoutePlaneFrame.compatibilitySignature;
        return [Object.freeze({
          operationId: operation.operationId,
          capabilityName: operation.capabilityName,
          inputUnitKinds: Object.freeze([
            ...continuationContract.inputUnitKinds,
          ]),
          outputUnitKinds: Object.freeze([
            ...continuationContract.outputUnitKinds,
          ]),
          sourceUnitKinds: ownerAvailability.sourceUnitKinds,
          matchedSourceUnitKinds:
            ownerAvailability.matchedSourceUnitKinds,
          availabilityStatus: ownerAvailability.availabilityStatus,
          compatibilityStatus: ownerAvailability.availabilityStatus,
          availabilityReason: ownerAvailability.availabilityReason,
          capabilityInstalled: operation.capabilityInstalled,
          installedCapabilityState: operation.capabilityInstalled
            ? "installed"
            : "missing",
          allOutputsHaveOwnerValidators:
            operation.allOutputsHaveOwnerValidators,
          allOwnerValidatorsInstalled:
            operation.allOwnerValidatorsInstalled,
          installedOwnerValidatorState:
            !operation.allOutputsHaveOwnerValidators
            ? "missing-validator"
            : operation.allOwnerValidatorsInstalled
              ? "installed"
              : "missing",
          sourceContractDeclared:
            ownerAvailability.sourceContractDeclared,
          sourceValidatorNames: ownerAvailability.sourceValidatorNames,
          sourceValidatorsInstalled:
            ownerAvailability.sourceValidatorsInstalled,
          sourceValidatorName: ownerAvailability.sourceValidatorName,
          exactSource,
          exactSourceIdentityRequired: true,
          exactSourceIdentityMatched: true,
          sourceIdentityMatched: ownerAvailability.sourceIdentityMatched,
          ownerPreflightCapabilityName:
            ownerAvailability.ownerPreflightCapabilityName,
          ownerPreflightValidatorNames:
            ownerAvailability.ownerPreflightValidatorNames,
          ownerPreflightCapabilityInstalled:
            ownerAvailability.ownerPreflightCapabilityInstalled,
          ownerPreflightValidatorsInstalled:
            ownerAvailability.ownerPreflightValidatorsInstalled,
          ownerPreflightInvoked:
            ownerAvailability.ownerPreflightInvoked,
          ownerPreflightThrew:
            ownerAvailability.ownerPreflightThrew,
          ownerPreflightFrame:
            ownerAvailability.ownerPreflightFrame,
          ownerPreflightFrames:
            ownerAvailability.ownerPreflightFrames,
          ownerPreflightResultKind:
            ownerAvailability.ownerPreflightResultKind,
          ownerPreflightFrameValidated:
            ownerAvailability.ownerPreflightFrameValidated,
          ownerChoicesRequired:
            ownerAvailability.ownerChoicesRequired,
          ownerInputAcceptanceProven:
            ownerAvailability.ownerInputAcceptanceProven,
          ownerRejectionProven:
            ownerAvailability.ownerRejectionProven,
          ownerEvaluationStatus:
            ownerAvailability.ownerEvaluationStatus,
          availabilityAuthority:
            ownerAvailability.availabilityAuthority,
          sixFieldSignature: signature,
          changes: Object.freeze({
            adds: signature.adds,
            removes: signature.removes,
          }),
          preserves: signature.preserves,
          emits: signature.emits,
          typeCompatibilityOnly:
            ownerAvailability.ownerPreflightFrameValidated !== true,
          ownerAuthorizationStillRequired: true,
          lessonMetadataAuthority: false,
          grammarAuthority: false,
          formulaStringAuthority: false,
          surfaceStringAuthority: false,
        })];
      },
    ));
    const navigator = Object.freeze({
      kind: APPLICATION_TYPED_SOURCE_CAPABILITY_NAVIGATOR_KIND,
      version: 1,
      scope: "canonical-typed-source-contracts-over-continuation-routes",
      inputRole: "exact-owner-issued-source",
      exactSource: provenance.exactSource,
      exactSourceIdentityMatched: true,
      sourceUnitKinds: provenance.sourceUnitKinds,
      sourceContractOperationIds: provenance.operationIds,
      operationIds: Object.freeze(operations.map(
        operation => operation.operationId,
      )),
      operations,
      operationCount: operations.length,
      availableCount: operations.filter(
        operation => operation.availabilityStatus === "available",
      ).length,
      missingPrerequisiteCount: operations.filter(
        operation => operation.availabilityStatus === "missing-prerequisite",
      ).length,
      incompatibleCount: operations.filter(
        operation => operation.availabilityStatus === "incompatible",
      ).length,
      unclassifiedOperationCount:
        inventory.operations.length - operations.length,
      typedSourceProjectionIncluded: true,
      directOwnerEvaluationIncluded: true,
      ownerAuthorizationStatus: "navigator-does-not-authorize-execution",
      typeCompatibilityOnly: operations.every(
        operation => operation.ownerPreflightFrameValidated !== true,
      ),
      ownerAuthorizationStillRequired: true,
      lessonMetadataAuthority: false,
      grammarAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
    issuedTypedSourceCapabilityNavigators.add(navigator);
    typedSourceCapabilityNavigatorByExactSource.set(exactSource, navigator);
    return navigator;
  }

  function isClassicalGrammarApplicationTypedSourceCapabilityNavigator(
    navigator = null,
  ) {
    if (
      !navigator
      || !issuedTypedSourceCapabilityNavigators.has(navigator)
      || navigator.kind
        !== APPLICATION_TYPED_SOURCE_CAPABILITY_NAVIGATOR_KIND
      || navigator.version !== 1
      || navigator.inputRole !== "exact-owner-issued-source"
      || navigator.exactSourceIdentityMatched !== true
      || navigator.ownerAuthorizationStatus
        !== "navigator-does-not-authorize-execution"
      || navigator.ownerAuthorizationStillRequired !== true
      || navigator.grammarAuthority !== false
      || !Object.isFrozen(navigator)
      || !Object.isFrozen(navigator.operations)
      || !Object.isFrozen(navigator.operationIds)
      || navigator.operationCount !== navigator.operations.length
      || navigator.availableCount
        + navigator.missingPrerequisiteCount
        + navigator.incompatibleCount !== navigator.operationCount
    ) {
      return false;
    }
    const provenance = getIssuedTypedSourceProvenance(
      navigator.exactSource,
    );
    return Boolean(
      provenance
      && provenance.exactSource === navigator.exactSource
      && navigator.sourceUnitKinds === provenance.sourceUnitKinds
      && navigator.sourceContractOperationIds === provenance.operationIds
      && navigator.operations.every(operation => {
        const available = operation.availabilityStatus === "available";
        return Object.isFrozen(operation)
        && Object.isFrozen(operation.inputUnitKinds)
        && Object.isFrozen(operation.outputUnitKinds)
        && Object.isFrozen(operation.sourceUnitKinds)
        && Object.isFrozen(operation.matchedSourceUnitKinds)
        && Object.isFrozen(operation.sourceValidatorNames)
        && Object.isFrozen(operation.ownerPreflightValidatorNames)
        && Object.isFrozen(operation.ownerPreflightFrames)
        && Object.isFrozen(operation.changes)
        && [
          "available",
          "missing-prerequisite",
          "incompatible",
        ].includes(operation.availabilityStatus)
        && operation.compatibilityStatus === operation.availabilityStatus
        && operation.exactSource === navigator.exactSource
        && operation.exactSourceIdentityRequired === true
        && operation.exactSourceIdentityMatched === true
        && operation.ownerPreflightFrameValidated === available
        && operation.ownerInputAcceptanceProven === available
        && operation.ownerRejectionProven
          === (operation.availabilityStatus === "incompatible")
        && operation.typeCompatibilityOnly === !available
        && (
          !available
          || (
            operation.sourceIdentityMatched === true
            && operation.ownerPreflightInvoked === true
            && operation.ownerEvaluationStatus === "accepted"
            && operation.availabilityAuthority
              === "canonical-owner-source-preflight"
            && operation.ownerPreflightFrame
            && typeof operation.ownerPreflightFrame === "object"
            && operation.ownerPreflightFrames.length > 0
            && operation.ownerPreflightFrames[0]
              === operation.ownerPreflightFrame
          )
        )
        && operation.ownerAuthorizationStillRequired === true
        && operation.grammarAuthority === false;
      })
    );
  }

  function freezeClassicalGrammarNncBindingSelections(selections = {}) {
    if (
      !selections
      || typeof selections !== "object"
      || Array.isArray(selections)
    ) return null;
    const entries = [];
    for (const key of Reflect.ownKeys(selections)) {
      if (typeof key !== "string") return null;
      let descriptor = null;
      try {
        descriptor = Object.getOwnPropertyDescriptor(selections, key);
      } catch {
        return null;
      }
      if (
        !descriptor
        || !Object.prototype.hasOwnProperty.call(descriptor, "value")
        || !["string", "boolean"].includes(typeof descriptor.value)
      ) return null;
      entries.push([key, descriptor.value]);
    }
    return Object.freeze(Object.fromEntries(entries));
  }

  function isCanonicalNncOperationSelectionFrameForExactSource(
    selectionFrame = null,
    exactSource = null,
  ) {
    return Boolean(
      selectionFrame
      && typeof selectionFrame === "object"
      && selectionFrame.kind
        === "classical-nahuatl-nnc-operation-selection-frame"
      && selectionFrame.version === 1
      && selectionFrame.authorizationStatus === "authorized"
      && selectionFrame.blockReason === ""
      && selectionFrame.sourceFrame === exactSource
      && ["ordinary", "pronominal"].includes(
        selectionFrame.sourceKind,
      )
      && selectionFrame.typedSourceAuthority === true
      && selectionFrame.selectionFrameAuthorizesGeneration === false
      && selectionFrame.lessonMetadataAuthority === false
      && selectionFrame.formulaStringAuthority === false
      && selectionFrame.surfaceStringAuthority === false
      && Object.isFrozen(selectionFrame)
    );
  }

  function buildCanonicalNncEffectiveOperationSelections(
    selectionFrame = null,
  ) {
    if (selectionFrame?.sourceKind === "ordinary") {
      return Object.freeze({
        state: selectionFrame.nncState,
        subject: selectionFrame.selectedSubject,
        humanness: selectionFrame.selectedHumanness,
        metaphoricalUse:
          selectionFrame.selectedMetaphoricalUse === true,
        possessor: selectionFrame.selectedPossessor,
        stemFormation: selectionFrame.selectedStemRelation,
        predicateFormation:
          selectionFrame.selectedPredicateOptionId || "source-stem",
        possessorReduplication:
          selectionFrame.selectedPossessorReduplication === true,
        pluralConnector: selectionFrame.selectedPluralConnector,
      });
    }
    if (selectionFrame?.sourceKind === "pronominal") {
      return Object.freeze({
        subject: selectionFrame.selectedSubject,
        humanness: selectionFrame.selectedHumanness,
        clausePosition: selectionFrame.selectedClausePosition,
        adjunctorInMode: selectionFrame.selectedAdjunctorInMode,
        numberForm: selectionFrame.selectedNumberForm,
        predicatePluralization:
          selectionFrame.selectedPredicatePluralization,
        doubledFirstPlural:
          selectionFrame.selectedDoubledFirstPlural === true,
        specialHumanUse:
          selectionFrame.selectedSpecialHumanUse === true,
      });
    }
    return Object.freeze({});
  }

  function overlayCanonicalNncCallerOperationSelections(
    effectiveSelections = {},
    callerSelections = {},
  ) {
    const operationSelections = { ...effectiveSelections };
    Object.entries(callerSelections).forEach(([choiceId, value]) => {
      // Animacy selects the owner's subject inventory. It is not itself an
      // ordinary/pronominal operation argument; every other accepted
      // preflight field must survive to the operation owner so stale fields
      // cannot silently disappear behind a default.
      if (choiceId !== "animacy") {
        operationSelections[choiceId] = value;
      }
    });
    return Object.freeze(operationSelections);
  }

  function getCanonicalNncBindingChoiceDescriptors(
    selectionFrame = null,
  ) {
    if (!selectionFrame) return Object.freeze([]);
    const descriptor = (
      choiceId,
      values,
      selectedValue,
      valueKind = "string",
    ) => Object.freeze({
      choiceId,
      values: Object.freeze([...(values || [])]),
      selectedValue,
      valueKind,
    });
    const shared = [
      descriptor(
        "animacy",
        selectionFrame.animacyValues,
        selectionFrame.selectedAnimacy,
      ),
      descriptor(
        "subject",
        selectionFrame.subjectValues,
        selectionFrame.selectedSubject,
      ),
      descriptor(
        "humanness",
        selectionFrame.humannessValues,
        selectionFrame.selectedHumanness,
      ),
    ];
    const familyDescriptors = selectionFrame.sourceKind === "ordinary"
      ? [
        descriptor(
          "state",
          selectionFrame.stateValues,
          selectionFrame.nncState,
        ),
        descriptor(
          "metaphoricalUse",
          selectionFrame.metaphoricalUseAvailable
            ? [false, true]
            : [],
          selectionFrame.selectedMetaphoricalUse === true,
          "boolean",
        ),
        descriptor(
          "stemFormation",
          selectionFrame.stemRelationValues,
          selectionFrame.selectedStemRelation,
        ),
        descriptor(
          "predicateFormation",
          selectionFrame.predicateOptionValues,
          selectionFrame.selectedPredicateOptionId,
        ),
        descriptor(
          "possessor",
          selectionFrame.possessorValues,
          selectionFrame.selectedPossessor,
        ),
        descriptor(
          "possessorReduplication",
          selectionFrame.possessorReduplicationAvailable
            ? [false, true]
            : [],
          selectionFrame.selectedPossessorReduplication === true,
          "boolean",
        ),
        descriptor(
          "pluralConnector",
          selectionFrame.pluralConnectorValues,
          selectionFrame.selectedPluralConnector,
        ),
      ]
      : [
        descriptor(
          "clausePosition",
          selectionFrame.clausePositionValues,
          selectionFrame.selectedClausePosition,
        ),
        descriptor(
          "adjunctorInMode",
          selectionFrame.adjunctorInValues,
          selectionFrame.selectedAdjunctorInMode,
        ),
        descriptor(
          "predicatePluralization",
          selectionFrame.predicatePluralizationValues,
          selectionFrame.selectedPredicatePluralization,
        ),
        descriptor(
          "numberForm",
          selectionFrame.numberFormValues,
          selectionFrame.selectedNumberForm,
        ),
        descriptor(
          "doubledFirstPlural",
          selectionFrame.doubledFirstPluralAvailable
            ? [false, true]
            : [],
          selectionFrame.selectedDoubledFirstPlural === true,
          "boolean",
        ),
        descriptor(
          "specialHumanUse",
          selectionFrame.specialHumanUseAvailable
            ? [false, true]
            : [],
          selectionFrame.selectedSpecialHumanUse === true,
          "boolean",
        ),
      ];
    return Object.freeze([...shared, ...familyDescriptors].filter(
      candidate => candidate.values.length > 1,
    ));
  }

  function getCanonicalNncChoiceValue(
    descriptor = null,
    optionId = "",
  ) {
    if (descriptor?.valueKind === "boolean") {
      return optionId === "true";
    }
    return optionId;
  }

  function probeCanonicalNncBindingChoiceOption({
    exactSource = null,
    callerSelections = {},
    descriptor = null,
    optionId = "",
    operationValidator = null,
  } = {}) {
    const candidateCallerSelections = Object.freeze({
      ...callerSelections,
      [descriptor.choiceId]: getCanonicalNncChoiceValue(
        descriptor,
        optionId,
      ),
    });
    let candidateSelectionFrame = null;
    try {
      candidateSelectionFrame = getCanonicalNncOperationSelectionFrame(
        exactSource,
        candidateCallerSelections,
      );
    } catch {
      candidateSelectionFrame = null;
    }
    if (!isCanonicalNncOperationSelectionFrameForExactSource(
      candidateSelectionFrame,
      exactSource,
    )) {
      return Object.freeze({
        available: false,
        blockReason: String(
          candidateSelectionFrame?.blockReason
          || "canonical-nnc-choice-owner-preflight-blocked",
        ),
      });
    }
    const effectiveSelections =
      buildCanonicalNncEffectiveOperationSelections(
        candidateSelectionFrame,
      );
    const operationSelections =
      overlayCanonicalNncCallerOperationSelections(
        effectiveSelections,
        candidateCallerSelections,
      );
    let operationFrame = null;
    try {
      operationFrame = issueCanonicalNncOperationFrame(
        exactSource,
        operationSelections,
      );
    } catch {
      operationFrame = null;
    }
    let available = false;
    try {
      available = Boolean(
        operationValidator
        && Reflect.apply(
          operationValidator,
          targetObject,
          [operationFrame],
        ) === true
        && operationFrame.sourceFrame === exactSource
      );
    } catch {
      available = false;
    }
    return Object.freeze({
      available,
      blockReason: available
        ? ""
        : String(
          operationFrame?.blockReason
          || "canonical-nnc-choice-operation-blocked",
        ),
    });
  }

  function buildCanonicalNncBindingChoiceProjection({
    exactSource = null,
    callerSelections = {},
    selectionFrame = null,
    operationValidator = null,
  } = {}) {
    const descriptors = getCanonicalNncBindingChoiceDescriptors(
      selectionFrame,
    );
    const entries = descriptors.map((choiceDescriptor) => {
      const options = Object.freeze(choiceDescriptor.values.map((value) => {
        const optionId = String(value);
        const probe = probeCanonicalNncBindingChoiceOption({
          exactSource,
          callerSelections,
          descriptor: choiceDescriptor,
          optionId,
          operationValidator,
        });
        return Object.freeze({
          choiceId: choiceDescriptor.choiceId,
          optionId,
          label: optionId,
          availabilityStatus: probe.available
            ? "available"
            : "incompatible",
          blockReason: probe.blockReason,
          ownerOptionProjected: true,
          ownerOptionAuthority: false,
          grammarAuthority: false,
          formulaStringAuthority: false,
          surfaceStringAuthority: false,
        });
      }));
      return [choiceDescriptor.choiceId, options];
    });
    return Object.freeze({
      ...Object.fromEntries(entries),
      grammarAuthority: false,
    });
  }

  function getCanonicalNncRequiredChoiceId(
    operationFrame = null,
  ) {
    return {
      "ordinary-nnc-possessor-required": "possessor",
      "ordinary-nnc-animacy-mismatch-requires-metaphorical-use":
        "metaphoricalUse",
      "ordinary-nnc-plural-connector-not-lexically-authorized":
        "pluralConnector",
      "ordinary-nnc-predicate-formation-not-licensed-for-source-and-context":
        "predicateFormation",
      "pronominal-nnc-subject-not-licensed-for-source": "subject",
      "selected-predicate-pluralization-not-licensed-for-pronominal-nnc-context":
        "predicatePluralization",
      "selected-number-form-not-licensed-for-pronominal-nnc-context":
        "numberForm",
      "itlah-with-human-subject-requires-special-situation-selection":
        "specialHumanUse",
    }[String(operationFrame?.blockReason || "")] || "";
  }

  function issueCanonicalNncTypedSourceOwnerBindingFrame(
    exactSource = null,
    selections = {},
    contract = null,
  ) {
    const callerSelections = freezeClassicalGrammarNncBindingSelections(
      selections,
    );
    if (!callerSelections || !contract) return null;
    const resolvedSourceValidator = resolveCanonicalCallableCapability(
      targetObject,
      contract.sourceValidatorCapabilityName,
      api,
    );
    const resolvedOperationValidator = resolveCanonicalCallableCapability(
      targetObject,
      contract.operationValidatorCapabilityName,
      api,
    );
    if (!resolvedSourceValidator || !resolvedOperationValidator) return null;
    let sourceAccepted = false;
    try {
      sourceAccepted = Reflect.apply(
        resolvedSourceValidator.capability,
        targetObject,
        [exactSource],
      ) === true;
    } catch {
      sourceAccepted = false;
    }
    if (!sourceAccepted) return null;
    let selectionFrame = null;
    try {
      selectionFrame = getCanonicalNncOperationSelectionFrame(
        exactSource,
        callerSelections,
      );
    } catch {
      selectionFrame = null;
    }
    const preflightAccepted =
      isCanonicalNncOperationSelectionFrameForExactSource(
        selectionFrame,
        exactSource,
      );
    const effectiveSelections = preflightAccepted
      ? buildCanonicalNncEffectiveOperationSelections(selectionFrame)
      : Object.freeze({});
    const operationSelections = preflightAccepted
      ? overlayCanonicalNncCallerOperationSelections(
        effectiveSelections,
        callerSelections,
      )
      : Object.freeze({});
    let operationFrame = null;
    if (preflightAccepted) {
      try {
        operationFrame = issueCanonicalNncOperationFrame(
          exactSource,
          operationSelections,
        );
      } catch {
        operationFrame = null;
      }
    }
    let operationAccepted = false;
    try {
      operationAccepted = Boolean(
        operationFrame
        && Reflect.apply(
          resolvedOperationValidator.capability,
          targetObject,
          [operationFrame],
        ) === true
        && operationFrame.sourceFrame === exactSource
      );
    } catch {
      operationAccepted = false;
    }
    const choiceOptionProjection = preflightAccepted
      ? buildCanonicalNncBindingChoiceProjection({
        exactSource,
        callerSelections,
        selectionFrame,
        operationValidator: resolvedOperationValidator.capability,
      })
      : Object.freeze({ grammarAuthority: false });
    const requiredChoiceId = operationAccepted
      ? ""
      : getCanonicalNncRequiredChoiceId(operationFrame);
    const requiredOptions = requiredChoiceId
      ? choiceOptionProjection[requiredChoiceId] || []
      : [];
    const choiceCanCompleteOperation = Boolean(
      requiredChoiceId
      && !Object.prototype.hasOwnProperty.call(
        callerSelections,
        requiredChoiceId,
      )
      && requiredOptions.some(option => (
        option.availabilityStatus === "available"
      )),
    );
    const bindingStatus = operationAccepted
      ? "ready"
      : choiceCanCompleteOperation
        ? "choices-required"
        : "rejected";
    const blockReason = operationAccepted
      ? ""
      : String(
        selectionFrame?.blockReason
        || operationFrame?.blockReason
        || "canonical-nnc-typed-source-operation-not-authorized",
      );
    const requiredChoiceIds = Object.freeze(
      choiceCanCompleteOperation ? [requiredChoiceId] : [],
    );
    // The exact operation is deliberately retained only in the private
    // context. A visible binding may describe readiness, but cannot be used
    // as a substitute operation or reconstruct the Source/operation pair.
    const frame = Object.freeze({
      kind: APPLICATION_CANONICAL_NNC_TYPED_SOURCE_OWNER_BINDING_KIND,
      version: 1,
      authorizationStatus: bindingStatus === "rejected"
        ? "blocked"
        : "authorized",
      bindingStatus,
      blockReason,
      operationId: contract.executionOperationId,
      exactSourceFrame: exactSource,
      callerSelections,
      effectiveSelections,
      requiredChoiceIds,
      choiceOptionProjection,
      ownerSelectionFrame: selectionFrame,
      executionArgs: Object.freeze([]),
      ownerChoicesRequired: requiredChoiceIds.length > 0,
      ownerInputAcceptanceProven: true,
      ownerRejectionProven: false,
      exactSourceIdentityPreserved: true,
      ownerExecutionStillRequired: bindingStatus === "ready",
      privateExecutionArguments: true,
      sourceStringAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      lessonMetadataAuthority: false,
      storedStateAuthority: false,
      grammarAuthority: false,
    });
    issuedCanonicalNncTypedSourceOwnerBindingFrames.add(frame);
    canonicalNncTypedSourceOwnerBindingContextByFrame.set(
      frame,
      Object.freeze({
        contract,
        sourceValidator: resolvedSourceValidator.capability,
        operationValidator: resolvedOperationValidator.capability,
        selectionFrame,
        exactOperationFrame: operationAccepted ? operationFrame : null,
      }),
    );
    return frame;
  }

  function isCanonicalNncTypedSourceOwnerBindingFrame(frame = null) {
    const context = frame
      ? canonicalNncTypedSourceOwnerBindingContextByFrame.get(frame) || null
      : null;
    if (
      !frame
      || !context
      || !issuedCanonicalNncTypedSourceOwnerBindingFrames.has(frame)
      || frame.kind
        !== APPLICATION_CANONICAL_NNC_TYPED_SOURCE_OWNER_BINDING_KIND
      || frame.version !== 1
      || !["choices-required", "ready", "rejected"].includes(
        frame.bindingStatus,
      )
      || frame.operationId !== context.contract.executionOperationId
      || frame.authorizationStatus !== (frame.bindingStatus === "rejected"
        ? "blocked"
        : "authorized")
      || !Array.isArray(frame.requiredChoiceIds)
      || !Array.isArray(frame.executionArgs)
      || frame.executionArgs.length !== 0
      || frame.privateExecutionArguments !== true
      || frame.ownerChoicesRequired !== Boolean(
        frame.requiredChoiceIds.length,
      )
      || frame.ownerInputAcceptanceProven !== true
      || frame.ownerRejectionProven !== false
      || frame.exactSourceIdentityPreserved !== true
      || frame.sourceStringAuthority !== false
      || frame.formulaStringAuthority !== false
      || frame.surfaceStringAuthority !== false
      || frame.lessonMetadataAuthority !== false
      || frame.storedStateAuthority !== false
      || frame.grammarAuthority !== false
      || !Object.isFrozen(frame)
      || !Object.isFrozen(frame.callerSelections)
      || !Object.isFrozen(frame.effectiveSelections)
      || !Object.isFrozen(frame.requiredChoiceIds)
      || !Object.isFrozen(frame.choiceOptionProjection)
      || !Object.isFrozen(frame.executionArgs)
    ) return false;
    const currentSourceValidator = resolveCanonicalCallableCapability(
      targetObject,
      context.contract.sourceValidatorCapabilityName,
      api,
    );
    const currentOperationValidator = resolveCanonicalCallableCapability(
      targetObject,
      context.contract.operationValidatorCapabilityName,
      api,
    );
    if (
      !currentSourceValidator
      || !currentOperationValidator
      || currentSourceValidator.capability !== context.sourceValidator
      || currentOperationValidator.capability !== context.operationValidator
    ) return false;
    try {
      if (
        Reflect.apply(
          currentSourceValidator.capability,
          targetObject,
          [frame.exactSourceFrame],
        ) !== true
      ) return false;
    } catch {
      return false;
    }
    if (frame.ownerSelectionFrame !== context.selectionFrame) return false;
    if (frame.bindingStatus !== "rejected") {
      if (!isCanonicalNncOperationSelectionFrameForExactSource(
        frame.ownerSelectionFrame,
        frame.exactSourceFrame,
      )) return false;
    }
    const projectedChoiceEntries = Object.entries(
      frame.choiceOptionProjection,
    ).filter(([, options]) => Array.isArray(options));
    if (!projectedChoiceEntries.every(([choiceId, options]) => (
      Object.isFrozen(options)
      && options.length > 1
      && new Set(options.map(option => option.optionId)).size
        === options.length
      && options.every(option => (
        option
        && Object.isFrozen(option)
        && option.choiceId === choiceId
        && option.optionId
        && ["available", "incompatible"].includes(
          option.availabilityStatus,
        )
        && option.ownerOptionProjected === true
        && option.ownerOptionAuthority === false
        && option.grammarAuthority === false
      ))
    ))) return false;
    if (frame.bindingStatus === "ready") {
      let operationValid = false;
      try {
        operationValid = Boolean(
          context.exactOperationFrame
          && Reflect.apply(
            currentOperationValidator.capability,
            targetObject,
            [context.exactOperationFrame],
          ) === true
          && context.exactOperationFrame.sourceFrame
            === frame.exactSourceFrame
        );
      } catch {
        operationValid = false;
      }
      return Boolean(
        operationValid
        && frame.blockReason === ""
        && frame.requiredChoiceIds.length === 0
        && frame.ownerExecutionStillRequired === true
      );
    }
    if (frame.bindingStatus === "choices-required") {
      return Boolean(
        context.exactOperationFrame === null
        && frame.blockReason
        && frame.requiredChoiceIds.length === 1
        && frame.requiredChoiceIds.every(choiceId => {
          const options = frame.choiceOptionProjection[choiceId];
          return Array.isArray(options)
            && options.some(option => (
              option.availabilityStatus === "available"
            ));
        })
        && frame.ownerExecutionStillRequired === false
      );
    }
    return Boolean(
      context.exactOperationFrame === null
      && frame.blockReason
      && frame.requiredChoiceIds.length === 0
      && frame.ownerExecutionStillRequired === false
    );
  }

  function freezeClassicalGrammarParticleRootSelections(selections = {}) {
    if (
      !selections
      || typeof selections !== "object"
      || Array.isArray(selections)
    ) return null;
    const entries = [];
    for (const key of Reflect.ownKeys(selections)) {
      if (typeof key !== "string") return null;
      let descriptor = null;
      try {
        descriptor = Object.getOwnPropertyDescriptor(selections, key);
      } catch {
        return null;
      }
      if (
        !descriptor
        || !Object.prototype.hasOwnProperty.call(descriptor, "value")
        || typeof descriptor.value !== "string"
      ) return null;
      entries.push([key, String(descriptor.value).trim()]);
    }
    return Object.freeze(Object.fromEntries(entries));
  }

  function getClassicalGrammarCapabilityNavigatorExactInput(
    navigator = null,
  ) {
    if (isClassicalGrammarApplicationTypedSourceCapabilityNavigator(
      navigator,
    )) return navigator.exactSource;
    if (isClassicalGrammarApplicationCapabilityNavigator(navigator)) {
      return navigator.exactResult;
    }
    return null;
  }

  function issueCanonicalParticleRootOwnerBindingFrame(
    navigator = null,
    selections = {},
    contract = null,
  ) {
    const callerSelections =
      freezeClassicalGrammarParticleRootSelections(selections);
    const exactNavigatorInput =
      getClassicalGrammarCapabilityNavigatorExactInput(navigator);
    if (!callerSelections || !exactNavigatorInput || !contract) return null;
    const capabilityNames = [
      contract.inventoryCapabilityName,
      contract.sourceBuilderCapabilityName,
      contract.sourceValidatorCapabilityName,
      contract.resultBuilderCapabilityName,
      contract.resultValidatorCapabilityName,
    ];
    const resolvedCapabilities = Object.fromEntries(capabilityNames.map(
      capabilityName => [
        capabilityName,
        resolveCanonicalCallableCapability(
          targetObject,
          capabilityName,
          api,
        ),
      ],
    ));
    if (capabilityNames.some(capabilityName => (
      !resolvedCapabilities[capabilityName]
    ))) return null;
    const inventoryCapability =
      resolvedCapabilities[contract.inventoryCapabilityName].capability;
    const sourceBuilder =
      resolvedCapabilities[contract.sourceBuilderCapabilityName].capability;
    const sourceValidator =
      resolvedCapabilities[contract.sourceValidatorCapabilityName].capability;
    const resultBuilder =
      resolvedCapabilities[contract.resultBuilderCapabilityName].capability;
    const resultValidator =
      resolvedCapabilities[contract.resultValidatorCapabilityName].capability;
    let entries = [];
    try {
      const issuedEntries = Reflect.apply(
        inventoryCapability,
        targetObject,
        [],
      );
      entries = Array.isArray(issuedEntries) ? issuedEntries : [];
    } catch {
      entries = [];
    }
    const probedOptions = entries.flatMap(entry => {
      const optionId = String(entry?.id || "").trim();
      if (!optionId) return [];
      let exactParticleSourceFrame = null;
      let exactParticleResultFrame = null;
      let sourceAccepted = false;
      let resultAccepted = false;
      try {
        exactParticleSourceFrame = Reflect.apply(
          sourceBuilder,
          targetObject,
          [optionId],
        );
        sourceAccepted = Reflect.apply(
          sourceValidator,
          targetObject,
          [exactParticleSourceFrame],
        ) === true;
        if (sourceAccepted) {
          exactParticleResultFrame = Reflect.apply(
            resultBuilder,
            targetObject,
            [exactParticleSourceFrame],
          );
          resultAccepted = Boolean(
            Reflect.apply(
              resultValidator,
              targetObject,
              [exactParticleResultFrame],
            ) === true
            && exactParticleResultFrame.authorizationStatus === "authorized"
            && exactParticleResultFrame.sourceFrame
              === exactParticleSourceFrame
          );
        }
      } catch {
        sourceAccepted = false;
        resultAccepted = false;
      }
      const available = sourceAccepted && resultAccepted;
      return [Object.freeze({
        option: Object.freeze({
          choiceId: "particleId",
          optionId,
          label: String(
            entry.displayForm || entry.sourceForm || optionId,
          ),
          description: String(entry.gloss || ""),
          presentationGroupId: String(entry.functionScope || ""),
          availabilityStatus: available
            ? "available"
            : "incompatible",
          blockReason: available
            ? ""
            : String(
              exactParticleResultFrame?.blockReason
              || exactParticleSourceFrame?.blockReason
              || "canonical-particle-root-owner-preflight-blocked",
            ),
          ownerOptionProjected: true,
          ownerOptionAuthority: false,
          grammarAuthority: false,
          formulaStringAuthority: false,
          surfaceStringAuthority: false,
        }),
        exactParticleSourceFrame: available
          ? exactParticleSourceFrame
          : null,
        exactParticleResultFrame: available
          ? exactParticleResultFrame
          : null,
      })];
    });
    const particleOptions = Object.freeze(probedOptions.map(
      probe => probe.option,
    ));
    const choiceOptionProjection = Object.freeze({
      particleId: particleOptions,
      grammarAuthority: false,
    });
    const unexpectedSelectionKey = Object.keys(callerSelections).find(
      key => key !== "particleId",
    ) || "";
    const selectedParticleId = String(
      callerSelections.particleId || "",
    ).trim();
    const selectedProbe = selectedParticleId
      ? probedOptions.find(probe => (
        probe.option.optionId === selectedParticleId
      )) || null
      : null;
    const selectedAvailable = Boolean(
      selectedProbe?.option?.availabilityStatus === "available"
      && selectedProbe.exactParticleSourceFrame
      && selectedProbe.exactParticleResultFrame
    );
    const bindingStatus = unexpectedSelectionKey
      ? "rejected"
      : !selectedParticleId
        ? "choices-required"
        : selectedAvailable
          ? "ready"
          : "rejected";
    const blockReason = bindingStatus === "ready"
      ? ""
      : unexpectedSelectionKey
        ? "canonical-particle-root-selections-invalid"
        : !selectedParticleId
          ? "canonical-particle-root-particle-selection-required"
          : String(
            selectedProbe?.option?.blockReason
            || "canonical-particle-root-particle-not-authorized",
          );
    const requiredChoiceIds = Object.freeze(
      bindingStatus === "choices-required" ? ["particleId"] : [],
    );
    const effectiveSelections = Object.freeze(
      selectedParticleId ? { particleId: selectedParticleId } : {},
    );
    const frame = Object.freeze({
      kind: APPLICATION_CANONICAL_PARTICLE_ROOT_OWNER_BINDING_KIND,
      version: 1,
      authorizationStatus: bindingStatus === "rejected"
        ? "blocked"
        : "authorized",
      bindingStatus,
      blockReason,
      operationId: contract.executionOperationId,
      navigatorExactInputFrame: exactNavigatorInput,
      navigatorInputConsumed: false,
      exactParticleSourceFrame: bindingStatus === "ready"
        ? selectedProbe.exactParticleSourceFrame
        : null,
      callerSelections,
      effectiveSelections,
      requiredChoiceIds,
      choiceOptionProjection,
      executionArgs: Object.freeze([]),
      ownerChoicesRequired: requiredChoiceIds.length > 0,
      ownerRootConstructionPreflightValidated: true,
      ownerInputAcceptanceProven: false,
      ownerRejectionProven: false,
      exactNavigatorInputIdentityPreserved: true,
      exactParticleSourceIdentityPreserved: bindingStatus === "ready",
      ownerExecutionStillRequired: bindingStatus === "ready",
      privateExecutionArguments: true,
      sourceStringAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      lessonMetadataAuthority: false,
      storedStateAuthority: false,
      grammarAuthority: false,
    });
    issuedCanonicalParticleRootOwnerBindingFrames.add(frame);
    canonicalParticleRootOwnerBindingContextByFrame.set(
      frame,
      Object.freeze({
        contract,
        navigator,
        exactNavigatorInput,
        inventoryCapability,
        sourceBuilder,
        sourceValidator,
        resultBuilder,
        resultValidator,
        exactParticleSourceFrame: bindingStatus === "ready"
          ? selectedProbe.exactParticleSourceFrame
          : null,
        exactParticleResultFrame: bindingStatus === "ready"
          ? selectedProbe.exactParticleResultFrame
          : null,
      }),
    );
    return frame;
  }

  function isCanonicalParticleRootOwnerBindingFrame(frame = null) {
    const context = frame
      ? canonicalParticleRootOwnerBindingContextByFrame.get(frame) || null
      : null;
    if (
      !frame
      || !context
      || !issuedCanonicalParticleRootOwnerBindingFrames.has(frame)
      || frame.kind
        !== APPLICATION_CANONICAL_PARTICLE_ROOT_OWNER_BINDING_KIND
      || frame.version !== 1
      || !["choices-required", "ready", "rejected"].includes(
        frame.bindingStatus,
      )
      || frame.authorizationStatus !== (frame.bindingStatus === "rejected"
        ? "blocked"
        : "authorized")
      || frame.operationId !== context.contract.executionOperationId
      || frame.navigatorExactInputFrame !== context.exactNavigatorInput
      || frame.navigatorInputConsumed !== false
      || frame.ownerRootConstructionPreflightValidated !== true
      || frame.ownerInputAcceptanceProven !== false
      || frame.ownerRejectionProven !== false
      || frame.exactNavigatorInputIdentityPreserved !== true
      || frame.ownerExecutionStillRequired
        !== (frame.bindingStatus === "ready")
      || frame.privateExecutionArguments !== true
      || frame.sourceStringAuthority !== false
      || frame.formulaStringAuthority !== false
      || frame.surfaceStringAuthority !== false
      || frame.lessonMetadataAuthority !== false
      || frame.storedStateAuthority !== false
      || frame.grammarAuthority !== false
      || !Array.isArray(frame.requiredChoiceIds)
      || !Array.isArray(frame.executionArgs)
      || frame.executionArgs.length !== 0
      || !Object.isFrozen(frame)
      || !Object.isFrozen(frame.callerSelections)
      || !Object.isFrozen(frame.effectiveSelections)
      || !Object.isFrozen(frame.requiredChoiceIds)
      || !Object.isFrozen(frame.choiceOptionProjection)
      || !Object.isFrozen(frame.choiceOptionProjection.particleId)
      || !Object.isFrozen(frame.executionArgs)
      || !isClassicalGrammarApplicationCapabilityNavigator(
        context.navigator,
      )
      || getClassicalGrammarCapabilityNavigatorExactInput(context.navigator)
        !== context.exactNavigatorInput
    ) return false;
    const currentCapabilityNames = [
      context.contract.inventoryCapabilityName,
      context.contract.sourceBuilderCapabilityName,
      context.contract.sourceValidatorCapabilityName,
      context.contract.resultBuilderCapabilityName,
      context.contract.resultValidatorCapabilityName,
    ];
    const expectedCapabilities = [
      context.inventoryCapability,
      context.sourceBuilder,
      context.sourceValidator,
      context.resultBuilder,
      context.resultValidator,
    ];
    if (!currentCapabilityNames.every((capabilityName, index) => (
      resolveCanonicalCallableCapability(
        targetObject,
        capabilityName,
        api,
      )?.capability === expectedCapabilities[index]
    ))) return false;
    if (
      frame.choiceOptionProjection.grammarAuthority !== false
      || frame.choiceOptionProjection.particleId.length === 0
      || new Set(frame.choiceOptionProjection.particleId.map(
        option => option.optionId,
      )).size !== frame.choiceOptionProjection.particleId.length
      || !frame.choiceOptionProjection.particleId.every(option => (
        option
        && Object.isFrozen(option)
        && option.choiceId === "particleId"
        && option.optionId
        && ["available", "incompatible"].includes(
          option.availabilityStatus,
        )
        && option.ownerOptionProjected === true
        && option.ownerOptionAuthority === false
        && option.grammarAuthority === false
      ))
    ) return false;
    if (frame.bindingStatus === "ready") {
      let sourceValid = false;
      let resultValid = false;
      try {
        sourceValid = Reflect.apply(
          context.sourceValidator,
          targetObject,
          [context.exactParticleSourceFrame],
        ) === true;
        resultValid = Reflect.apply(
          context.resultValidator,
          targetObject,
          [context.exactParticleResultFrame],
        ) === true;
      } catch {
        sourceValid = false;
        resultValid = false;
      }
      return Boolean(
        sourceValid
        && resultValid
        && context.exactParticleResultFrame.authorizationStatus
          === "authorized"
        && context.exactParticleResultFrame.sourceFrame
          === context.exactParticleSourceFrame
        && frame.exactParticleSourceFrame
          === context.exactParticleSourceFrame
        && frame.exactParticleSourceIdentityPreserved === true
        && frame.blockReason === ""
        && frame.requiredChoiceIds.length === 0
      );
    }
    return Boolean(
      context.exactParticleSourceFrame === null
      && context.exactParticleResultFrame === null
      && frame.exactParticleSourceFrame === null
      && frame.exactParticleSourceIdentityPreserved === false
      && frame.blockReason
      && (
        frame.bindingStatus === "rejected"
          ? frame.requiredChoiceIds.length === 0
          : frame.requiredChoiceIds.length === 1
            && frame.requiredChoiceIds[0] === "particleId"
            && frame.choiceOptionProjection.particleId.some(option => (
              option.availabilityStatus === "available"
            ))
      )
    );
  }

  function issueClassicalGrammarTypedSourceOperationBindingFrame(
    navigator = null,
    operationId = "",
    selections = {},
  ) {
    const normalizedOperationId = String(operationId || "").trim();
    const contract =
      CLASSICAL_GRAMMAR_TYPED_SOURCE_OPERATION_BINDING_CONTRACTS[
        normalizedOperationId
      ] || null;
    const canonicalParticleRootBinding = contract?.bindingMode
      === "canonical-particle-root";
    if (
      !(canonicalParticleRootBinding
        ? isClassicalGrammarApplicationCapabilityNavigator(navigator)
        : isClassicalGrammarApplicationTypedSourceCapabilityNavigator(
          navigator,
        ))
      || !normalizedOperationId
    ) {
      return null;
    }
    const operation = navigator.operations.find(candidate => (
      candidate.operationId === normalizedOperationId
    )) || null;
    if (
      !operation
      || !contract
      || (!canonicalParticleRootBinding && (
        operation.availabilityStatus !== "available"
        || operation.ownerPreflightFrameValidated !== true
        || operation.exactSource !== navigator.exactSource
      ))
    ) {
      return null;
    }
    const canonicalNncBinding =
      contract.bindingMode === "canonical-nnc-operation";
    const resolvedIssuer = canonicalNncBinding || canonicalParticleRootBinding
      ? null
      : resolveCanonicalCallableCapability(
        targetObject,
        contract.issuerCapabilityName,
        api,
      );
    const resolvedValidator = canonicalNncBinding
      || canonicalParticleRootBinding
      ? null
      : resolveCanonicalCallableCapability(
        targetObject,
        contract.validatorCapabilityName,
        api,
      );
    if (
      !canonicalNncBinding
      && !canonicalParticleRootBinding
      && (!resolvedIssuer || !resolvedValidator)
    ) {
      return null;
    }
    let ownerBindingFrame = null;
    try {
      ownerBindingFrame = canonicalParticleRootBinding
        ? issueCanonicalParticleRootOwnerBindingFrame(
          navigator,
          selections,
          contract,
        )
        : canonicalNncBinding
          ? issueCanonicalNncTypedSourceOwnerBindingFrame(
            navigator.exactSource,
            selections,
            contract,
          )
          : Reflect.apply(
            resolvedIssuer.capability,
            targetObject,
            [navigator.exactSource, selections],
          );
    } catch {
      return null;
    }
    let ownerBindingFrameValidated = false;
    try {
      ownerBindingFrameValidated = canonicalParticleRootBinding
        ? isCanonicalParticleRootOwnerBindingFrame(ownerBindingFrame)
        : canonicalNncBinding
          ? isCanonicalNncTypedSourceOwnerBindingFrame(ownerBindingFrame)
          : Reflect.apply(
            resolvedValidator.capability,
            targetObject,
            [ownerBindingFrame],
          ) === true;
    } catch {
      ownerBindingFrameValidated = false;
    }
    if (
      !ownerBindingFrameValidated
      || (!canonicalParticleRootBinding
        && ownerBindingFrame?.[contract.exactSourceProperty]
          !== navigator.exactSource)
      || (canonicalParticleRootBinding
        && ownerBindingFrame.navigatorExactInputFrame
          !== getClassicalGrammarCapabilityNavigatorExactInput(navigator))
    ) {
      return null;
    }
    const requiredChoiceIds = Object.freeze([
      ...(ownerBindingFrame.requiredChoiceIds || []),
    ]);
    const frame = Object.freeze({
      kind: APPLICATION_TYPED_SOURCE_OPERATION_BINDING_KIND,
      version: 1,
      authorizationStatus: ownerBindingFrame.authorizationStatus,
      bindingStatus: ownerBindingFrame.bindingStatus,
      blockReason: String(ownerBindingFrame.blockReason || ""),
      family: contract.family,
      operationId: normalizedOperationId,
      executionOperationId: contract.executionOperationId,
      navigator,
      operation,
      exactSource: canonicalParticleRootBinding
        ? null
        : navigator.exactSource,
      exactNavigatorInput:
        getClassicalGrammarCapabilityNavigatorExactInput(navigator),
      navigatorInputConsumed: !canonicalParticleRootBinding,
      rootSourceConstructor: canonicalParticleRootBinding,
      ownerBindingFrame,
      ownerBindingFrameValidated: true,
      callerSelections: ownerBindingFrame.callerSelections,
      effectiveSelections: ownerBindingFrame.effectiveSelections,
      requiredChoiceIds,
      choiceOptionProjection: ownerBindingFrame.choiceOptionProjection,
      exactNavigatorIdentityPreserved: true,
      exactOperationIdentityPreserved: true,
      exactSourceIdentityPreserved: !canonicalParticleRootBinding,
      exactNavigatorInputIdentityPreserved: true,
      ownerExecutionStillRequired:
        ownerBindingFrame.bindingStatus === "ready",
      ownerAuthorizationStillRequired: true,
      lessonMetadataAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      grammarAuthority: false,
    });
    issuedTypedSourceOperationBindingFrames.add(frame);
    typedSourceOperationBindingContextByFrame.set(frame, Object.freeze({
      contract,
      operation,
      ownerBindingFrame,
      ownerBindingValidator: resolvedValidator?.capability || null,
    }));
    return frame;
  }

  function isClassicalGrammarTypedSourceOperationBindingFrame(
    frame = null,
  ) {
    const context = frame
      ? typedSourceOperationBindingContextByFrame.get(frame) || null
      : null;
    const canonicalParticleRootBinding = context?.contract?.bindingMode
      === "canonical-particle-root";
    if (
      !frame
      || !context
      || !issuedTypedSourceOperationBindingFrames.has(frame)
      || frame.kind !== APPLICATION_TYPED_SOURCE_OPERATION_BINDING_KIND
      || frame.version !== 1
      || !(canonicalParticleRootBinding
        ? isClassicalGrammarApplicationCapabilityNavigator(frame.navigator)
        : isClassicalGrammarApplicationTypedSourceCapabilityNavigator(
          frame.navigator,
        ))
      || frame.operation !== context.operation
      || !frame.navigator.operations.includes(frame.operation)
      || frame.operationId !== frame.operation.operationId
      || frame.executionOperationId
        !== context.contract.executionOperationId
      || frame.exactNavigatorInput
        !== getClassicalGrammarCapabilityNavigatorExactInput(frame.navigator)
      || frame.navigatorInputConsumed !== !canonicalParticleRootBinding
      || frame.rootSourceConstructor !== canonicalParticleRootBinding
      || frame.exactSource !== (canonicalParticleRootBinding
        ? null
        : frame.navigator.exactSource)
      || frame.ownerBindingFrame !== context.ownerBindingFrame
      || (!canonicalParticleRootBinding
        && frame.ownerBindingFrame?.[
          context.contract.exactSourceProperty
        ] !== frame.exactSource)
      || (canonicalParticleRootBinding
        && frame.ownerBindingFrame?.navigatorExactInputFrame
          !== frame.exactNavigatorInput)
      || frame.ownerBindingFrameValidated !== true
      || frame.bindingStatus !== frame.ownerBindingFrame.bindingStatus
      || frame.authorizationStatus
        !== frame.ownerBindingFrame.authorizationStatus
      || frame.blockReason
        !== String(frame.ownerBindingFrame.blockReason || "")
      || frame.callerSelections
        !== frame.ownerBindingFrame.callerSelections
      || frame.effectiveSelections
        !== frame.ownerBindingFrame.effectiveSelections
      || frame.choiceOptionProjection
        !== frame.ownerBindingFrame.choiceOptionProjection
      || !Array.isArray(frame.requiredChoiceIds)
      || frame.requiredChoiceIds.length
        !== frame.ownerBindingFrame.requiredChoiceIds.length
      || !frame.requiredChoiceIds.every((choiceId, index) => (
        choiceId === frame.ownerBindingFrame.requiredChoiceIds[index]
      ))
      || !Object.isFrozen(frame)
      || !Object.isFrozen(frame.requiredChoiceIds)
      || frame.exactNavigatorIdentityPreserved !== true
      || frame.exactOperationIdentityPreserved !== true
      || frame.exactSourceIdentityPreserved
        !== !canonicalParticleRootBinding
      || frame.exactNavigatorInputIdentityPreserved !== true
      || frame.ownerAuthorizationStillRequired !== true
      || frame.lessonMetadataAuthority !== false
      || frame.formulaStringAuthority !== false
      || frame.surfaceStringAuthority !== false
      || frame.grammarAuthority !== false
    ) {
      return false;
    }
    const canonicalNncBinding = context.contract.bindingMode
      === "canonical-nnc-operation";
    const currentValidator = canonicalNncBinding
      || canonicalParticleRootBinding
      ? null
      : resolveCanonicalCallableCapability(
        targetObject,
        context.contract.validatorCapabilityName,
        api,
      );
    if (!canonicalNncBinding && !canonicalParticleRootBinding && (
      !currentValidator
      || currentValidator.capability !== context.ownerBindingValidator
    )) return false;
    let ownerValid = false;
    try {
      ownerValid = canonicalParticleRootBinding
        ? isCanonicalParticleRootOwnerBindingFrame(
          frame.ownerBindingFrame,
        )
        : canonicalNncBinding
          ? isCanonicalNncTypedSourceOwnerBindingFrame(
            frame.ownerBindingFrame,
          )
          : Reflect.apply(
            currentValidator.capability,
            targetObject,
            [frame.ownerBindingFrame],
          ) === true;
    } catch {
      ownerValid = false;
    }
    if (!ownerValid) return false;
    if (frame.bindingStatus === "ready") {
      return frame.authorizationStatus === "authorized"
        && frame.blockReason === ""
        && frame.requiredChoiceIds.length === 0
        && frame.ownerExecutionStillRequired === true
        && (
          canonicalNncBinding || canonicalParticleRootBinding
            ? frame.ownerBindingFrame.privateExecutionArguments === true
              && frame.ownerBindingFrame.executionArgs.length === 0
            : frame.ownerBindingFrame.executionArgs.length > 0
        );
    }
    return ["choices-required", "rejected"].includes(
      frame.bindingStatus,
    )
      && frame.ownerExecutionStillRequired === false
      && frame.ownerBindingFrame.executionArgs.length === 0;
  }

  function executeClassicalGrammarTypedSourceOperationBindingFrame(
    frame = null,
  ) {
    if (
      !isClassicalGrammarTypedSourceOperationBindingFrame(frame)
      || frame.bindingStatus !== "ready"
      || executedTypedSourceOperationBindingFrames.has(frame)
    ) {
      return null;
    }
    executedTypedSourceOperationBindingFrames.add(frame);
    const bindingContext = typedSourceOperationBindingContextByFrame.get(
      frame,
    );
    const canonicalNncBinding = bindingContext?.contract?.bindingMode
      === "canonical-nnc-operation";
    const canonicalParticleRootBinding = bindingContext?.contract?.bindingMode
      === "canonical-particle-root";
    const canonicalNncContext = canonicalNncBinding
      ? canonicalNncTypedSourceOwnerBindingContextByFrame.get(
        frame.ownerBindingFrame,
      ) || null
      : null;
    const canonicalParticleContext = canonicalParticleRootBinding
      ? canonicalParticleRootOwnerBindingContextByFrame.get(
        frame.ownerBindingFrame,
      ) || null
      : null;
    let applicationResult = null;
    try {
      applicationResult = executeClassicalGrammarApplicationRequest({
        operationId: frame.executionOperationId,
        args: canonicalParticleRootBinding
          ? [canonicalParticleContext?.exactParticleSourceFrame]
          : canonicalNncBinding
            ? [frame.exactSource, canonicalNncContext?.exactOperationFrame]
            : [frame.ownerBindingFrame],
      });
    } catch {
      return null;
    }
    const exactOwnerResultMatched = canonicalParticleRootBinding
      ? Boolean(
        canonicalParticleContext?.exactParticleSourceFrame
        && applicationResult?.canonicalResult?.sourceFrame
          === canonicalParticleContext.exactParticleSourceFrame
        && applicationResult?.canonicalResult?.authorizationStatus
          === "authorized"
      )
      : canonicalNncBinding
        ? Boolean(
          canonicalNncContext?.exactOperationFrame
          && applicationResult?.canonicalResult?.sourceFrame
            === frame.exactSource
          && applicationResult?.canonicalResult?.operationFrame
            === canonicalNncContext.exactOperationFrame
        )
        : applicationResult?.canonicalResult?.resultFrame
          ?.sourceMachineryFrame === frame.exactSource;
    if (
      !isClassicalGrammarApplicationResult(applicationResult)
      || applicationResult.authorizationStatus !== "authorized"
      || applicationResult.operationId !== frame.executionOperationId
      || !exactOwnerResultMatched
    ) {
      return null;
    }
    return applicationResult;
  }

  function getClassicalGrammarApplicationCapabilityNavigator(
    currentResult = null,
  ) {
    const typedSourceNavigator =
      getClassicalGrammarApplicationTypedSourceCapabilityNavigator(
        currentResult,
      );
    if (typedSourceNavigator) return typedSourceNavigator;
    const applicationResultInput = isClassicalGrammarApplicationResult(
      currentResult,
    );
    const issuedResultProvenance = applicationResultInput
      ? null
      : getIssuedResultProvenance(currentResult);
    const provenance = applicationResultInput
      ? Object.freeze({
        applicationResult: currentResult,
        exactResult: currentResult.canonicalResult,
        resultRole: "application-result",
        continuationUnitKinds:
          continuationUnitKindsByResult.get(currentResult.canonicalResult)
            || Object.freeze([]),
      })
      : issuedResultProvenance;
    if (
      !provenance
      || provenance.applicationResult.authorizationStatus !== "authorized"
      || !provenance.exactResult
      || typeof provenance.exactResult !== "object"
    ) {
      return null;
    }
    const cachedNavigator = capabilityNavigatorByExactInput.get(
      currentResult,
    );
    if (cachedNavigator) return cachedNavigator;
    const emittedUnitKinds = Object.freeze([
      ...new Set(provenance.continuationUnitKinds || []),
    ]);
    const exactOwnerProbeCandidates = getExactOwnerProbeCandidates(
      provenance,
    );
    const inventory = getClassicalGrammarApplicationInventory();
    const operations = Object.freeze(inventory.operations.flatMap(
      (operation) => {
        const continuationContract =
          CLASSICAL_GRAMMAR_APPLICATION_CONTINUATION_TYPE_CONTRACTS[
            operation.operationId
          ];
        if (!continuationContract) return [];
        const inputUnitKinds = Object.freeze([
          ...continuationContract.inputUnitKinds,
        ]);
        const outputUnitKinds = Object.freeze([
          ...continuationContract.outputUnitKinds,
        ]);
        const sharedUnitKinds = Object.freeze(inputUnitKinds.filter(
          unitKind => exactOwnerProbeCandidates.some(
            candidate => candidate.continuationUnitKinds.includes(unitKind),
          ),
        ));
        const directAvailability =
          evaluateClassicalGrammarDirectCapabilityAvailability({
            operation,
            exactOwnerProbeCandidates,
            inputUnitKinds,
            sharedUnitKinds,
          });
        const ownerAvailability =
          evaluateClassicalGrammarResultBindingAvailability({
            operation,
            exactOwnerProbeCandidates,
            directAvailability,
          });
        const signature =
          operation.rhymeRoutePlaneFrame.compatibilitySignature;
        return [Object.freeze({
          operationId: operation.operationId,
          capabilityName: operation.capabilityName,
          inputUnitKinds,
          sharedUnitKinds,
          outputUnitKinds,
          availabilityStatus: ownerAvailability.availabilityStatus,
          compatibilityStatus: ownerAvailability.availabilityStatus,
          availabilityReason: ownerAvailability.availabilityReason,
          typeCompatibilityStatus:
            ownerAvailability.typeCompatibilityStatus,
          compatibilityBasis:
            ownerAvailability.typeCompatibilityStatus,
          capabilityInstalled: operation.capabilityInstalled,
          installedCapabilityState: operation.capabilityInstalled
            ? "installed"
            : "missing",
          allOutputsHaveOwnerValidators:
            operation.allOutputsHaveOwnerValidators,
          allOwnerValidatorsInstalled:
            operation.allOwnerValidatorsInstalled,
          installedOwnerValidatorState:
            !operation.allOutputsHaveOwnerValidators
            ? "missing-validator"
            : operation.allOwnerValidatorsInstalled
              ? "installed"
              : "missing",
          directOwnerProbeInstalled:
            ownerAvailability.directOwnerProbeInstalled,
          ownerProbeCapabilityName:
            ownerAvailability.ownerProbeCapabilityName,
          ownerProbeValidatorNames:
            ownerAvailability.ownerProbeValidatorNames,
          ownerProbeCapabilityInstalled:
            ownerAvailability.ownerProbeCapabilityInstalled,
          ownerProbeValidatorsInstalled:
            ownerAvailability.ownerProbeValidatorsInstalled,
          ownerProbeInvoked: ownerAvailability.ownerProbeInvoked,
          ownerProbeThrew: ownerAvailability.ownerProbeThrew,
          ownerProbeInputResult:
            ownerAvailability.ownerProbeInputResult,
          ownerProbeInputResultRole:
            ownerAvailability.ownerProbeInputResultRole,
          ownerProbeInputUnitKinds:
            ownerAvailability.ownerProbeInputUnitKinds,
          ownerProbeInputExactIdentityMatched:
            ownerAvailability.ownerProbeInputExactIdentityMatched,
          ownerProbeInputExactCanonicalResultIdentity:
            ownerAvailability
              .ownerProbeInputExactCanonicalResultIdentity,
          ownerProbeInputExactContinuationResultIdentity:
            ownerAvailability
              .ownerProbeInputExactContinuationResultIdentity,
          ownerProbeResultKind: ownerAvailability.ownerProbeResultKind,
          ownerProbeResultValidated:
            ownerAvailability.ownerProbeResultValidated,
          ownerBindingContractDeclared:
            ownerAvailability.ownerBindingContractDeclared,
          ownerBindingFamily:
            ownerAvailability.ownerBindingFamily,
          ownerBindingIssuerCapabilityName:
            ownerAvailability.ownerBindingIssuerCapabilityName,
          ownerBindingValidatorCapabilityName:
            ownerAvailability.ownerBindingValidatorCapabilityName,
          ownerBindingCapabilitiesInstalled:
            ownerAvailability.ownerBindingCapabilitiesInstalled,
          ownerBindingInvoked:
            ownerAvailability.ownerBindingInvoked,
          ownerBindingThrew:
            ownerAvailability.ownerBindingThrew,
          ownerBindingFrame:
            ownerAvailability.ownerBindingFrame,
          ownerBindingFrameValidated:
            ownerAvailability.ownerBindingFrameValidated,
          ownerBindingInputResult:
            ownerAvailability.ownerBindingInputResult,
          ownerBindingInputResultRole:
            ownerAvailability.ownerBindingInputResultRole,
          ownerBindingIds:
            ownerAvailability.ownerBindingIds,
          requiredChoiceIds:
            ownerAvailability.requiredChoiceIds,
          requiredResultRoles:
            ownerAvailability.requiredResultRoles,
          ownerChoicesRequired:
            ownerAvailability.ownerChoicesRequired,
          ownerInputAcceptanceProven:
            ownerAvailability.ownerInputAcceptanceProven,
          ownerRejectionProven:
            ownerAvailability.ownerRejectionProven,
          ownerEvaluationStatus:
            ownerAvailability.ownerEvaluationStatus,
          availabilityAuthority:
            ownerAvailability.availabilityAuthority,
          sixFieldSignature: signature,
          changes: Object.freeze({
            adds: signature.adds,
            removes: signature.removes,
          }),
          preserves: signature.preserves,
          emits: signature.emits,
          exactResultIdentityRequired: true,
          exactResultIdentityMatched: true,
          typeCompatibilityOnly:
            ownerAvailability.ownerProbeResultValidated !== true
            && ownerAvailability.ownerBindingFrameValidated !== true,
          ownerAuthorizationStillRequired: true,
          lessonMetadataAuthority: false,
          grammarAuthority: false,
          formulaStringAuthority: false,
          surfaceStringAuthority: false,
        })];
      },
    ));
    const navigator = Object.freeze({
      kind: APPLICATION_CAPABILITY_NAVIGATOR_KIND,
      version: 1,
      scope: "canonical-continuation-contracts-only",
      inputRole: "exact-owner-issued-result",
      resultRole: provenance.resultRole,
      applicationResult: provenance.applicationResult,
      exactResult: provenance.exactResult,
      exactApplicationResultIdentity:
        provenance.resultRole === "application-result",
      exactCanonicalResultIdentity:
        provenance.resultRole === "canonical-result",
      exactContinuationResultIdentity:
        provenance.resultRole === "continuation-result",
      exactResultIdentityMatched: true,
      emittedUnitKinds,
      operationIds: Object.freeze(operations.map(
        operation => operation.operationId,
      )),
      operations,
      operationCount: operations.length,
      availableCount: operations.filter(
        operation => operation.availabilityStatus === "available",
      ).length,
      missingPrerequisiteCount: operations.filter(
        operation => (
          operation.availabilityStatus === "missing-prerequisite"
        ),
      ).length,
      incompatibleCount: operations.filter(
        operation => operation.availabilityStatus === "incompatible",
      ).length,
      unclassifiedOperationCount:
        inventory.operations.length - operations.length,
      typedSourceProjectionIncluded: false,
      directOwnerEvaluationIncluded: true,
      ownerAuthorizationStatus: "navigator-does-not-authorize-execution",
      typeCompatibilityOnly: operations.every(
        operation => operation.ownerProbeResultValidated !== true
          && operation.ownerBindingFrameValidated !== true,
      ),
      ownerAuthorizationStillRequired: true,
      lessonMetadataAuthority: false,
      grammarAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
    issuedCapabilityNavigators.add(navigator);
    capabilityNavigatorByExactInput.set(currentResult, navigator);
    return navigator;
  }

  function isClassicalGrammarApplicationCapabilityNavigator(
    navigator = null,
  ) {
    if (
      navigator?.kind
        === APPLICATION_TYPED_SOURCE_CAPABILITY_NAVIGATOR_KIND
    ) {
      return isClassicalGrammarApplicationTypedSourceCapabilityNavigator(
        navigator,
      );
    }
    if (
      !navigator
      || !issuedCapabilityNavigators.has(navigator)
      || navigator.kind !== APPLICATION_CAPABILITY_NAVIGATOR_KIND
      || navigator.version !== 1
      || navigator.inputRole !== "exact-owner-issued-result"
      || navigator.exactResultIdentityMatched !== true
      || navigator.ownerAuthorizationStatus
        !== "navigator-does-not-authorize-execution"
      || navigator.ownerAuthorizationStillRequired !== true
      || navigator.grammarAuthority !== false
      || !isClassicalGrammarApplicationResult(navigator.applicationResult)
      || navigator.applicationResult.authorizationStatus !== "authorized"
      || !Object.isFrozen(navigator)
      || !Object.isFrozen(navigator.operations)
      || !Object.isFrozen(navigator.operationIds)
      || navigator.operationCount !== navigator.operations.length
    ) {
      return false;
    }
    const exactProvenance = getIssuedResultProvenance(
      navigator.exactResult,
    );
    const exactIdentityValid = navigator.resultRole === "application-result"
      ? navigator.exactResult === navigator.applicationResult.canonicalResult
        && navigator.exactApplicationResultIdentity === true
        && navigator.exactCanonicalResultIdentity === false
        && navigator.exactContinuationResultIdentity === false
      : exactProvenance?.applicationResult === navigator.applicationResult
        && exactProvenance?.resultRole === navigator.resultRole
        && navigator.exactApplicationResultIdentity === false
        && navigator.exactCanonicalResultIdentity
          === (navigator.resultRole === "canonical-result")
        && navigator.exactContinuationResultIdentity
          === (navigator.resultRole === "continuation-result");
    return Boolean(
      exactIdentityValid
      && navigator.operations.every((operation) => {
        const available = operation.availabilityStatus === "available";
        const availableThroughDirectProbe = Boolean(
          available && operation.ownerProbeResultValidated === true,
        );
        const availableThroughBinding = Boolean(
          available && operation.ownerBindingFrameValidated === true,
        );
        const bindingContract =
          CLASSICAL_GRAMMAR_APPLICATION_RESULT_BINDING_CONTRACTS[
            operation.operationId
          ] || null;
        const resolvedBindingValidator = bindingContract
          ? resolveCanonicalCallableCapability(
            targetObject,
            bindingContract.validatorCapabilityName,
            api,
          )
          : null;
        let bindingFrameIdentityValid = false;
        if (operation.ownerBindingFrameValidated === true) {
          try {
            bindingFrameIdentityValid = Boolean(
              resolvedBindingValidator
              && Reflect.apply(
                resolvedBindingValidator.capability,
                targetObject,
                [operation.ownerBindingFrame],
              ) === true,
            );
          } catch {
            bindingFrameIdentityValid = false;
          }
        } else {
          bindingFrameIdentityValid = operation.ownerBindingFrame === null;
        }
        const ownerProbeInputProvenance = available
          ? getIssuedResultProvenance(operation.ownerProbeInputResult)
          : null;
        const registeredOwnerProbeInputUnitKinds = available
          ? ownerProbeInputProvenance?.continuationUnitKinds
            || Object.freeze([])
          : Object.freeze([]);
        const ownerProbeInputIdentityValid = available
          ? ownerProbeInputProvenance?.applicationResult
              === navigator.applicationResult
            && ownerProbeInputProvenance?.resultRole
              === operation.ownerProbeInputResultRole
            && operation.ownerProbeInputExactIdentityMatched === true
            && operation.ownerProbeInputExactCanonicalResultIdentity
              === (
                operation.ownerProbeInputResultRole === "canonical-result"
              )
            && operation.ownerProbeInputExactContinuationResultIdentity
              === (
                operation.ownerProbeInputResultRole
                  === "continuation-result"
              )
            && operation.ownerProbeInputUnitKinds.length
              === registeredOwnerProbeInputUnitKinds.length
            && operation.ownerProbeInputUnitKinds.every(
              (unitKind, index) => (
                unitKind === registeredOwnerProbeInputUnitKinds[index]
              ),
            )
            && operation.ownerProbeInputUnitKinds.some(
              unitKind => operation.inputUnitKinds.includes(unitKind),
            )
          : operation.ownerProbeInputResult === null
            && operation.ownerProbeInputResultRole === ""
            && operation.ownerProbeInputUnitKinds.length === 0
            && operation.ownerProbeInputExactIdentityMatched === false
            && operation.ownerProbeInputExactCanonicalResultIdentity
              === false
            && operation.ownerProbeInputExactContinuationResultIdentity
              === false;
        return Object.isFrozen(operation)
        && Object.isFrozen(operation.changes)
        && Object.isFrozen(operation.inputUnitKinds)
        && Object.isFrozen(operation.sharedUnitKinds)
        && Object.isFrozen(operation.outputUnitKinds)
        && Object.isFrozen(operation.ownerProbeInputUnitKinds)
        && Object.isFrozen(operation.ownerBindingIds)
        && Object.isFrozen(operation.requiredChoiceIds)
        && Object.isFrozen(operation.requiredResultRoles)
        && bindingFrameIdentityValid
        && ownerProbeInputIdentityValid
        && [
          "available",
          "missing-prerequisite",
          "incompatible",
        ].includes(operation.availabilityStatus)
        && operation.compatibilityStatus === operation.availabilityStatus
        && [
          "type-compatible",
          "type-incompatible",
          "separate-input-required",
        ].includes(
          operation.typeCompatibilityStatus,
        )
        && operation.exactResultIdentityRequired === true
        && operation.exactResultIdentityMatched === true
        && (availableThroughDirectProbe || availableThroughBinding)
          === available
        && operation.ownerInputAcceptanceProven
          === (operation.availabilityStatus === "available")
        && operation.ownerRejectionProven
          === (operation.availabilityStatus === "incompatible")
        && operation.typeCompatibilityOnly
          === (operation.availabilityStatus === "missing-prerequisite")
        && (
          operation.availabilityStatus !== "available"
          || (
            operation.availabilityAuthority
              === "canonical-owner-direct-probe"
            && availableThroughDirectProbe
            && operation.ownerProbeInvoked === true
            && operation.ownerEvaluationStatus === "accepted"
          ) || (
            operation.availabilityAuthority
              === "canonical-owner-result-binding"
            && availableThroughBinding
            && operation.ownerBindingInvoked === true
            && operation.ownerBindingInputResult
              === operation.ownerProbeInputResult
            && operation.ownerEvaluationStatus === "accepted"
          )
        )
        && (
          operation.availabilityStatus !== "incompatible"
          || (
            operation.availabilityAuthority
              === "canonical-owner-direct-rejection"
            && operation.ownerRejectionProven === true
          ) || (
            operation.availabilityAuthority
              === "canonical-owner-result-binding-rejection"
            && operation.ownerBindingFrameValidated === true
            && operation.ownerRejectionProven === true
          )
        )
        && operation.ownerAuthorizationStillRequired === true
        && operation.grammarAuthority === false;
      })
    );
  }

  function buildClassicalGrammarApplicationLayerGraph(
    applicationResult,
    observations = [],
    instanceContinuationFacts = [],
  ) {
    const continuationFacts = [
      ...(Array.isArray(observations) ? observations : []),
      ...(Array.isArray(instanceContinuationFacts)
        ? instanceContinuationFacts
        : []),
    ];
    const parentApplicationResults = [...new Set(continuationFacts.map(
      fact => fact.innerApplicationResult,
    ).filter(parent => (
      isClassicalGrammarApplicationResult(parent)
      && parent.authorizationStatus === "authorized"
      && parent !== applicationResult
    )))];
    const applicationResults = [];
    const edgeFacts = [];
    const addApplicationResult = candidate => {
      if (!applicationResults.includes(candidate)) {
        applicationResults.push(candidate);
      }
    };
    parentApplicationResults.forEach(parent => {
      const inheritedGraph = layerGraphByApplicationResult.get(parent);
      if (inheritedGraph && issuedLayerGraphs.has(inheritedGraph)) {
        inheritedGraph.nodes.forEach(node => addApplicationResult(
          node.applicationResult,
        ));
        inheritedGraph.edges.forEach(edge => edgeFacts.push({
          innerApplicationResult: edge.innerApplicationResult,
          outerApplicationResult: edge.outerApplicationResult,
          sharedUnitKinds: edge.sharedUnitKinds,
          exactInnerResultIdentityObservedInOuterArguments:
            edge.exactInnerResultIdentityObservedInOuterArguments,
          continuationEvidenceKind: edge.continuationEvidenceKind,
          exactContinuationSlotValidated:
            edge.exactContinuationSlotValidated,
          ownerContinuationProjectionValidated:
            edge.ownerContinuationProjectionValidated,
          topologyCompatibilityObserved:
            edge.topologyCompatibilityObserved,
          compatibilityAuthority: false,
        }));
      } else {
        addApplicationResult(parent);
      }
    });
    addApplicationResult(applicationResult);
    continuationFacts.forEach(fact => edgeFacts.push({
      innerApplicationResult: fact.innerApplicationResult,
      outerApplicationResult: applicationResult,
      sharedUnitKinds: fact.sharedUnitKinds,
      exactInnerResultIdentityObservedInOuterArguments:
        fact.exactInnerResultIdentityObservedInOuterArguments,
      continuationEvidenceKind:
        fact.exactContinuationSlotValidated === true
        && fact.ownerContinuationProjectionValidated === true
        && fact.topologyCompatibilityObserved !== true
          ? "exact-instance-continuation"
          : "topology-owner-proof",
      exactContinuationSlotValidated:
        fact.exactContinuationSlotValidated === true,
      ownerContinuationProjectionValidated:
        fact.ownerContinuationProjectionValidated === true,
      topologyCompatibilityObserved:
        fact.topologyCompatibilityObserved === true,
      compatibilityAuthority: false,
    }));
    const indexByApplicationResult = new Map(applicationResults.map(
      (candidate, index) => [candidate, index],
    ));
    const uniqueEdgeFacts = [];
    edgeFacts.forEach(edge => {
      if (
        !indexByApplicationResult.has(edge.innerApplicationResult)
        || !indexByApplicationResult.has(edge.outerApplicationResult)
        || edge.innerApplicationResult === edge.outerApplicationResult
        || uniqueEdgeFacts.some(existing => (
          existing.innerApplicationResult === edge.innerApplicationResult
          && existing.outerApplicationResult === edge.outerApplicationResult
        ))
      ) return;
      uniqueEdgeFacts.push(edge);
    });
    const incomingCounts = new Map(applicationResults.map(result => [result, 0]));
    const outgoingCounts = new Map(applicationResults.map(result => [result, 0]));
    uniqueEdgeFacts.forEach(edge => {
      incomingCounts.set(
        edge.outerApplicationResult,
        incomingCounts.get(edge.outerApplicationResult) + 1,
      );
      outgoingCounts.set(
        edge.innerApplicationResult,
        outgoingCounts.get(edge.innerApplicationResult) + 1,
      );
    });
    const queue = applicationResults.filter(result => (
      incomingCounts.get(result) === 0
    ));
    const topologicalResults = [];
    const mutableIncomingCounts = new Map(incomingCounts);
    while (queue.length) {
      const current = queue.shift();
      topologicalResults.push(current);
      uniqueEdgeFacts.filter(edge => (
        edge.innerApplicationResult === current
      )).forEach(edge => {
        const nextCount = mutableIncomingCounts.get(
          edge.outerApplicationResult,
        ) - 1;
        mutableIncomingCounts.set(edge.outerApplicationResult, nextCount);
        if (nextCount === 0) queue.push(edge.outerApplicationResult);
      });
    }
    const acyclic = topologicalResults.length === applicationResults.length;
    const orderedResults = acyclic ? topologicalResults : applicationResults;
    const nodeIdByApplicationResult = new Map(orderedResults.map(
      (candidate, index) => [candidate, `layer-${index + 1}`],
    ));
    const depthByApplicationResult = new Map();
    orderedResults.forEach(candidate => {
      const parentDepths = uniqueEdgeFacts.filter(edge => (
        edge.outerApplicationResult === candidate
      )).map(edge => depthByApplicationResult.get(
        edge.innerApplicationResult,
      ) || 1);
      depthByApplicationResult.set(
        candidate,
        parentDepths.length ? Math.max(...parentDepths) + 1 : 1,
      );
    });
    const nodes = Object.freeze(orderedResults.map((candidate, index) =>
      Object.freeze({
        nodeId: nodeIdByApplicationResult.get(candidate),
        layerOrder: index + 1,
        depth: depthByApplicationResult.get(candidate),
        operationId: candidate.operationId,
        outputKind: candidate.outputKind,
        applicationResult: candidate,
        canonicalResult: candidate.canonicalResult,
        continuationUnitKinds: continuationUnitKindsByResult.get(
          candidate.canonicalResult,
        ) || Object.freeze([]),
        exactApplicationResultIdentityValidated: true,
        exactCanonicalResultIdentityValidated: true,
      })
    ));
    const edges = Object.freeze(uniqueEdgeFacts.map((edge, index) =>
      Object.freeze({
        edgeId: `continuation-${index + 1}`,
        fromNodeId: nodeIdByApplicationResult.get(
          edge.innerApplicationResult,
        ),
        toNodeId: nodeIdByApplicationResult.get(
          edge.outerApplicationResult,
        ),
        innerApplicationResult: edge.innerApplicationResult,
        outerApplicationResult: edge.outerApplicationResult,
        sharedUnitKinds: Object.freeze([...new Set(
          edge.sharedUnitKinds || [],
        )]),
        exactInnerResultIdentityObservedInOuterArguments:
          edge.exactInnerResultIdentityObservedInOuterArguments === true,
        continuationEvidenceKind: edge.continuationEvidenceKind,
        exactContinuationSlotValidated:
          edge.exactContinuationSlotValidated === true,
        ownerContinuationProjectionValidated:
          edge.ownerContinuationProjectionValidated === true,
        topologyCompatibilityObserved:
          edge.topologyCompatibilityObserved === true,
        compatibilityAuthority: false,
      })
    ));
    const nextOperationInventory =
      getClassicalGrammarApplicationNextOperationInventory(applicationResult);
    const graph = Object.freeze({
      kind: APPLICATION_LAYER_GRAPH_KIND,
      version: 1,
      authorizationStatus: acyclic ? "observed" : "blocked",
      blockReason: acyclic ? "" : "circular-compositional-layer-path",
      terminalApplicationResult: applicationResult,
      terminalCanonicalResult: applicationResult.canonicalResult,
      nodes,
      edges,
      nodeCount: nodes.length,
      edgeCount: edges.length,
      rootNodeIds: Object.freeze(nodes.filter(node => (
        incomingCounts.get(node.applicationResult) === 0
      )).map(node => node.nodeId)),
      terminalNodeIds: Object.freeze(nodes.filter(node => (
        outgoingCounts.get(node.applicationResult) === 0
      )).map(node => node.nodeId)),
      maximumDepth: Math.max(0, ...nodes.map(node => node.depth)),
      branchNodeCount: nodes.filter(node => (
        outgoingCounts.get(node.applicationResult) > 1
      )).length,
      joinNodeCount: nodes.filter(node => (
        incomingCounts.get(node.applicationResult) > 1
      )).length,
      isLinear: acyclic && (
        nodes.length === 1
        || (
          edges.length === nodes.length - 1
          && nodes.every(node => (
            incomingCounts.get(node.applicationResult) <= 1
            && outgoingCounts.get(node.applicationResult) <= 1
          ))
        )
      ),
      operationIds: Object.freeze(nodes.map(node => node.operationId)),
      nextOperationInventory,
      exactOwnerIssuedResultsOnly: true,
      typeCompatibilityDoesNotAuthorizeGrammar: true,
      lessonNumberAuthority: false,
      grammarAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
    issuedLayerGraphs.add(graph);
    return graph;
  }

  function getClassicalGrammarApplicationLayerGraph(currentResult = null) {
    const applicationResult = isClassicalGrammarApplicationResult(currentResult)
      ? currentResult
      : getIssuedResultProvenance(currentResult)?.applicationResult || null;
    return applicationResult
      ? layerGraphByApplicationResult.get(applicationResult) || null
      : null;
  }

  function isClassicalGrammarApplicationLayerGraph(graph = null) {
    return Boolean(
      graph
      && issuedLayerGraphs.has(graph)
      && graph.kind === APPLICATION_LAYER_GRAPH_KIND
      && graph.version === 1
      && graph.authorizationStatus === "observed"
      && graph.blockReason === ""
      && graph.terminalApplicationResult
      && isClassicalGrammarApplicationResult(
        graph.terminalApplicationResult,
      )
      && graph.terminalApplicationResult.authorizationStatus === "authorized"
      && graph.terminalCanonicalResult
        === graph.terminalApplicationResult.canonicalResult
      && graph.nodes.length === graph.nodeCount
      && graph.edges.length === graph.edgeCount
      && graph.nodes.every(node => (
        isClassicalGrammarApplicationResult(node.applicationResult)
        && node.applicationResult.authorizationStatus === "authorized"
        && node.canonicalResult === node.applicationResult.canonicalResult
        && node.exactApplicationResultIdentityValidated === true
        && node.exactCanonicalResultIdentityValidated === true
      ))
      && graph.edges.every(edge => (
        graph.nodes.some(node => node.nodeId === edge.fromNodeId)
        && graph.nodes.some(node => node.nodeId === edge.toNodeId)
        && edge.innerApplicationResult !== edge.outerApplicationResult
        && edge.exactInnerResultIdentityObservedInOuterArguments === true
        && edge.compatibilityAuthority === false
        && (
          edge.continuationEvidenceKind === "topology-owner-proof"
            ? edge.topologyCompatibilityObserved === true
            : edge.continuationEvidenceKind
                === "exact-instance-continuation"
              && edge.exactContinuationSlotValidated === true
              && edge.ownerContinuationProjectionValidated === true
              && edge.topologyCompatibilityObserved === false
        )
      ))
      && graph.exactOwnerIssuedResultsOnly === true
      && graph.grammarAuthority === false
      && Object.isFrozen(graph)
    );
  }

  function isClassicalGrammarApplicationAtlasObservation(
    observation = null,
  ) {
    return Boolean(
      observation
      && issuedApplicationAtlasObservations.has(observation)
      && observation.kind === APPLICATION_ATLAS_OBSERVATION_KIND
      && observation.version === 1
      && observation.authorizationStatus === "observed"
      && isClassicalGrammarApplicationResult(
        observation.applicationResult,
      )
      && observation.applicationResult.authorizationStatus === "authorized"
      && observation.canonicalResult
        === observation.applicationResult.canonicalResult
      && observation.rhymeFullPinFrame
        === getClassicalGrammarApplicationRhymeFullPin(
          observation.applicationResult,
        )
      && observation.rhymeCalibrationFrame
        === getClassicalGrammarApplicationRhymeCalibration(
          observation.applicationResult,
        )
      && observation.layerGraph
        === getClassicalGrammarApplicationLayerGraph(
          observation.applicationResult,
        )
      && observation.evaluationOrderFrame
        === getClassicalGrammarApplicationEvaluationOrder(
          observation.applicationResult,
        )
      && observation.exactOwnerIssuedResultObserved === true
      && observation.grammarAuthority === false
      && observation.formulaStringAuthority === false
      && observation.surfaceStringAuthority === false
      && Object.isFrozen(observation)
    );
  }

  function getClassicalGrammarApplicationAtlasObservation(
    currentResult = null,
  ) {
    if (currentResult == null) return latestApplicationAtlasObservation;
    if (isClassicalGrammarApplicationResult(currentResult)) {
      return atlasObservationByApplicationResult.get(currentResult) || null;
    }
    return currentResult && typeof currentResult === "object"
      ? atlasObservationByCanonicalResult.get(currentResult) || null
      : null;
  }

  function subscribeClassicalGrammarApplicationAtlasObservations(
    observer = null,
  ) {
    if (typeof observer !== "function") return () => false;
    applicationAtlasObservers.add(observer);
    if (latestApplicationAtlasObservation) {
      try {
        observer(latestApplicationAtlasObservation);
      } catch {
        // A read-only observer cannot interrupt canonical grammar.
      }
    }
    let active = true;
    return () => {
      if (!active) return false;
      active = false;
      return applicationAtlasObservers.delete(observer);
    };
  }

  function issueClassicalGrammarApplicationAtlasObservation(
    applicationResult = null,
  ) {
    if (
      !isClassicalGrammarApplicationResult(applicationResult)
      || applicationResult.authorizationStatus !== "authorized"
      || !applicationResult.canonicalResult
    ) return null;
    const existing = atlasObservationByApplicationResult.get(
      applicationResult,
    );
    if (existing) return existing;
    const observation = Object.freeze({
      kind: APPLICATION_ATLAS_OBSERVATION_KIND,
      version: 1,
      authorizationStatus: "observed",
      blockReason: "",
      operationId: applicationResult.operationId,
      outputKind: applicationResult.outputKind,
      applicationResult,
      canonicalResult: applicationResult.canonicalResult,
      rhymeFullPinFrame:
        getClassicalGrammarApplicationRhymeFullPin(applicationResult),
      rhymeCalibrationFrame:
        getClassicalGrammarApplicationRhymeCalibration(applicationResult),
      layerGraph:
        getClassicalGrammarApplicationLayerGraph(applicationResult),
      evaluationOrderFrame:
        getClassicalGrammarApplicationEvaluationOrder(applicationResult),
      exactOwnerIssuedResultObserved: true,
      observerMayAuthorizeGrammar: false,
      lessonNumberAuthority: false,
      grammarAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
    issuedApplicationAtlasObservations.add(observation);
    atlasObservationByApplicationResult.set(applicationResult, observation);
    atlasObservationByCanonicalResult.set(
      applicationResult.canonicalResult,
      observation,
    );
    latestApplicationAtlasObservation = observation;
    applicationAtlasObservers.forEach(observer => {
      try {
        observer(observation);
      } catch {
        // A read-only observer cannot interrupt canonical grammar.
      }
    });
    return observation;
  }

  function isClassicalGrammarApplicationRhymeOwnerProofObservation(
    observation = null,
  ) {
    return Boolean(
      observation
      && issuedRhymeOwnerProofObservations.has(observation)
      && observation.kind === RHYME_OWNER_PROOF_OBSERVATION_KIND
      && observation.version === 1
      && observation.authorizationStatus === "observed"
      && observation.innerApplicationResult
      && observation.outerApplicationResult
      && isClassicalGrammarApplicationResult(
        observation.innerApplicationResult,
      )
      && isClassicalGrammarApplicationResult(
        observation.outerApplicationResult,
      )
      && observation.innerApplicationResult.authorizationStatus
        === "authorized"
      && observation.outerApplicationResult.authorizationStatus
        === "authorized"
      && getIssuedResultProvenance(observation.innerCanonicalResult)
        ?.applicationResult === observation.innerApplicationResult
      && observation.innerProducerCanonicalResult
        === observation.innerApplicationResult.canonicalResult
      && observation.outerCanonicalResult
        === observation.outerApplicationResult.canonicalResult
      && observation.innerOperationId
        === observation.innerApplicationResult.operationId
      && observation.outerOperationId
        === observation.outerApplicationResult.operationId
      && observation.exactInnerResultIdentityObservedInOuterArguments
        === true
      && ["canonical-result", "continuation-result"].includes(
        observation.innerResultRole,
      )
      && observation.grammarAuthority === false
      && Object.isFrozen(observation)
    );
  }

  function buildClassicalGrammarApplicationRhymeOwnerCalibration({
    lessonOwnerEvidenceFrames = [],
    exactOwnerProofResults = [],
  } = {}) {
    const inventory = getClassicalGrammarApplicationInventory();
    const exactOwnerProofObservationFrames = Object.freeze(
      [...new Set((Array.isArray(exactOwnerProofResults)
        ? exactOwnerProofResults
        : []).flatMap(result => (
        getClassicalGrammarApplicationRhymeOwnerProofObservations(result)
      )))].filter(observation => (
        isClassicalGrammarApplicationRhymeOwnerProofObservation(observation)
      )),
    );
    return buildClassicalGrammaticalRhymeOwnerCalibrationFrame({
      lessonDiscoveryFrame:
        inventory.grammaticalRhymeCalibration.lessonDiscovery,
      routeTopologyFrame:
        inventory.grammaticalRhymeCalibration.topology,
      lessonOwnerEvidenceFrames,
      exactOwnerProofObservationFrames,
    });
  }

  function collectIssuedCanonicalResultArguments(
    value,
    found = new Set(),
    seen = new Set(),
  ) {
    if (!value || typeof value !== "object" || seen.has(value)) {
      return found;
    }
    if (
      issuedCanonicalResults.has(value)
      || issuedContinuationResults.has(value)
    ) {
      const receipt = getIssuedResultProvenance(value)
        ?.applicationResult || null;
      if (
        receipt
        && isClassicalGrammarApplicationResult(receipt)
        && receipt.authorizationStatus === "authorized"
      ) {
        found.add(value);
      }
      return found;
    }
    seen.add(value);
    Reflect.ownKeys(value).forEach(propertyKey => {
      let descriptor = null;
      try {
        descriptor = Object.getOwnPropertyDescriptor(value, propertyKey);
      } catch {
        descriptor = null;
      }
      if (
        descriptor
        && Object.prototype.hasOwnProperty.call(descriptor, "value")
      ) {
        collectIssuedCanonicalResultArguments(
          descriptor.value,
          found,
          seen,
        );
      }
    });
    return found;
  }

  function getApplicationOutputPrerequisiteBlockReason(
    operationId = "",
    outputKind = "",
    args = [],
  ) {
    if (
      outputKind
      !== CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.coordinateProjection
    ) {
      return "";
    }
    const plan = args[0];
    const planReceipt = plan && typeof plan === "object"
      ? issuedApplicationResultByCanonicalResult.get(plan) || null
      : null;
    return (
      planReceipt
      && planReceipt.operationId === operationId
      && planReceipt.outputKind
        === CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.preparedPlan
      && planReceipt.authorizationStatus === "authorized"
      && issuedCanonicalResults.has(plan)
    )
      ? ""
      : `${APPLICATION_REQUEST_DIAGNOSTIC}:issued-authorized-prepared-plan-required`;
  }

  function executeClassicalGrammarApplicationRequest(request = {}) {
    const {
      operationId,
      route,
      outputKind,
      outputContract,
      args,
      typedApplicationRequest,
      semanticOperationIdentity,
      authorityCarrierClear,
    } = validateClassicalGrammarApplicationRequest(request);
    const exactInnerCanonicalResults = Object.freeze([
      ...collectIssuedCanonicalResultArguments(args),
    ]);
    const canonicalApplicationState = getCanonicalApplicationState(
      targetObject,
      api,
    );
    const canonicalRuntimeInstallation = Boolean(canonicalApplicationState);
    const capabilityName = outputContract.capabilityName;
    const currentlyResolvedCapability = resolveCallableCapability(
      targetObject,
      capabilityName,
    );
    const resolvedCapability = resolveCanonicalCallableCapability(
      targetObject,
      capabilityName,
      api,
    );
    if (!currentlyResolvedCapability && !canonicalRuntimeInstallation) {
      throw new Error(`${REQUIRED_CAPABILITY_DIAGNOSTIC}:${capabilityName}`);
    }
    const canonicalCapabilityIdentity = Boolean(resolvedCapability);
    const requiredCapabilityResolution = (
      canonicalRuntimeInstallation
      && canonicalCapabilityIdentity
      && typeof resolvedCapability.capability === "function"
      && capabilityName === outputContract.capabilityName
    );
    const noRendererFallback = (
      requiredCapabilityResolution
      && canonicalCapabilityIdentity
      && resolvedCapability.dataProperty === true
    );
    const outputPrerequisiteBlockReason =
      getApplicationOutputPrerequisiteBlockReason(
        operationId,
        outputKind,
        args,
      );
    const candidateResult = (
      !canonicalRuntimeInstallation
      || !canonicalCapabilityIdentity
      || outputPrerequisiteBlockReason
    )
      ? null
      : Reflect.apply(
        resolvedCapability.capability,
        targetObject,
        args,
      );
    const visibleSurfaceViolation = getClassicalVisibleSurfaceViolation(candidateResult);
    if (visibleSurfaceViolation) {
      throw new Error(
        `${CLASSICAL_VISIBLE_SURFACE_DIAGNOSTIC}:${visibleSurfaceViolation}`,
      );
    }
    const candidateAuthorizationStatus = getCanonicalResultAuthorizationStatus(
      candidateResult,
    );
    const canonicalResultRecognized = isRecognizedCanonicalResult(
      operationId,
      outputKind,
      outputContract,
      candidateResult,
      candidateAuthorizationStatus,
    );
    const canonicalResult = canonicalResultRecognized ? candidateResult : null;
    const lesson2WritingOutputs = buildClassicalLesson2WritingOutputs(
      canonicalResult,
      operationId,
      outputKind,
      targetObject,
    );
    const lesson2WrittenResult = lesson2WritingOutputs.find(
      output => output.writtenResult,
    )?.writtenResult || null;
    const lesson2WritingPass = buildClassicalLesson2WritingPass(
      lesson2WritingOutputs,
    );
    if (canonicalResultRecognized) {
      issuedCanonicalResults.add(canonicalResult);
    }
    const canonicalAuthorizationStatus = canonicalResultRecognized
      ? candidateAuthorizationStatus
      : "blocked";
    const invariantProofs = buildGcdInvariantProofs({
      "canonical-runtime-installation": canonicalRuntimeInstallation,
      "typed-application-request": typedApplicationRequest,
      "semantic-operation-identity": semanticOperationIdentity,
      "required-capability-resolution": requiredCapabilityResolution,
      "canonical-capability-identity": canonicalCapabilityIdentity,
      "canonical-engine-result": canonicalResultRecognized
        && canonicalAuthorizationStatus === "authorized",
      "no-renderer-fallback": noRendererFallback,
      "lesson-and-display-authority-forbidden": authorityCarrierClear,
      "classical-visible-surface-firewall": visibleSurfaceViolation === "",
      "lesson2-writing-pass": lesson2WritingPass.required
        ? lesson2WritingPass.entered
          && lesson2WritingPass.allTwelveFamiliesRouted
          && lesson2WritingPass.familyPasses.length === 12
          && lesson2WritingPass.familyPasses.every(family => family.entered)
        : lesson2WritingPass.entered === false,
    });
    const gcdSatisfied = GCD_INVARIANT_IDS.every(
      (invariantId) => invariantProofs[invariantId] === true,
    );
    const authorizationStatus = gcdSatisfied ? "authorized" : "blocked";
    const candidateBlockReason = (
      candidateResult
      && typeof candidateResult === "object"
      && !Array.isArray(candidateResult)
      && typeof candidateResult.blockReason === "string"
    )
      ? candidateResult.blockReason
      : "";
    const result = Object.freeze({
      kind: APPLICATION_RESULT_KIND,
      version: 1,
      authorizationStatus,
      blockReason: authorizationStatus === "authorized"
        ? ""
        : !canonicalRuntimeInstallation
          ? CANONICAL_RUNTIME_DIAGNOSTIC
          : !canonicalCapabilityIdentity
            ? `${CANONICAL_CAPABILITY_IDENTITY_DIAGNOSTIC}:${capabilityName}`
            : outputPrerequisiteBlockReason || candidateBlockReason || (
          !canonicalResultRecognized
            ? candidateResult == null
              ? "canonical-engine-result-required"
              : `${APPLICATION_RESULT_DIAGNOSTIC}:unrecognized-route-result`
            : lesson2WritingPass.required && !lesson2WritingPass.entered
              ? "lesson2-writing-owner-required"
              : "canonical-engine-result-blocked"
        ),
      operationId,
      outputKind,
      capabilityName,
      canonicalResult,
      lesson2WrittenResult,
      lesson2WritingOutputs,
      lesson2WritingPass,
      greatestCommonDivisor: Object.freeze({
        identityId: "typed-semantic-application-to-canonical-result",
        invariantIds: GCD_INVARIANT_IDS,
        invariantProofs,
        satisfied: gcdSatisfied,
      }),
      leastCommonMultiple: Object.freeze({
        axisIds: LCM_AXIS_IDS,
        selectedAxisIds: route.axisIds,
        selectedAxisCount: route.axisIds.length,
        selectedAxisOwners: Object.freeze(LCM_AXIS_OWNERS.filter(
          (axis) => route.axisIds.includes(axis.axisId),
        )),
      }),
      curriculumOrderAuthority: false,
      lessonMetadataAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      displayTextAuthority: false,
    });
    issuedApplicationResults.add(result);
    if (canonicalResult && typeof canonicalResult === "object") {
      issuedApplicationResultByCanonicalResult.set(canonicalResult, result);
      continuationUnitKindsByResult.set(
        canonicalResult,
        getRouteResultContinuationUnitKinds(operationId, canonicalResult),
      );
      const registeredContinuationResults = [];
      collectOwnerIssuedContinuationResults(canonicalResult)
        .forEach((unitKinds, continuationResult) => {
          const existingProducer =
            issuedApplicationResultByCanonicalResult.get(
              continuationResult,
            )
            || issuedApplicationResultByContinuationResult.get(
              continuationResult,
            )
            || null;
          const routeSpecificUnitKinds = Object.freeze([
            ...new Set([
              ...unitKinds,
              ...(
                ["nnc:ordinary", "nnc:pronominal"].includes(
                  operationId,
                )
                && unitKinds.includes("nnc-diagram-slot-frame")
                  ? ["nnc-sentence-slot-frame"]
                  : []
              ),
            ]),
          ]);
          issuedContinuationResults.add(continuationResult);
          if (!existingProducer) {
            issuedApplicationResultByContinuationResult.set(
              continuationResult,
              result,
            );
            continuationUnitKindsByResult.set(
              continuationResult,
              routeSpecificUnitKinds,
            );
          }
          const registeredProducer = existingProducer || result;
          const registeredUnitKinds =
            continuationUnitKindsByResult.get(continuationResult)
            || routeSpecificUnitKinds;
          if (
            continuationResult !== canonicalResult
            && registeredProducer === result
          ) {
            registeredContinuationResults.push(Object.freeze({
              exactResult: continuationResult,
              resultRole: "continuation-result",
              continuationUnitKinds: registeredUnitKinds,
            }));
          }
        });
      continuationResultsByApplicationResult.set(
        result,
        Object.freeze(registeredContinuationResults),
      );
    }
    const exactInstanceContinuationFacts =
      authorizationStatus === "authorized" && canonicalResult
        ? buildExactApplicationInstanceContinuationFacts({
          operationId,
          outputKind,
          args,
          outerApplicationResult: result,
        })
        : Object.freeze([]);
    if (
      authorizationStatus === "authorized"
      && canonicalResult
      && exactInnerCanonicalResults.length
    ) {
      const insideOutEdges = getClassicalGrammarApplicationInventory()
        .grammaticalRhymeCalibration.topology.exactContinuationEdges;
      const observations = Object.freeze(
        exactInnerCanonicalResults.flatMap(innerCanonicalResult => {
          const innerProvenance = getIssuedResultProvenance(
            innerCanonicalResult,
          );
          const innerApplicationResult =
            innerProvenance?.applicationResult || null;
          if (
            !innerApplicationResult
            || innerApplicationResult === result
            || innerApplicationResult.authorizationStatus !== "authorized"
          ) {
            return [];
          }
          const topologyEdge = insideOutEdges.find(edge => (
            edge.innerOperationId === innerApplicationResult.operationId
            && edge.outerOperationId === operationId
            && (
              !innerProvenance.continuationUnitKinds.length
              || edge.sharedUnitKinds.some(unitKind => (
                innerProvenance.continuationUnitKinds.includes(unitKind)
              ))
            )
          ));
          if (!topologyEdge) return [];
          const observation = Object.freeze({
            kind: RHYME_OWNER_PROOF_OBSERVATION_KIND,
            version: 1,
            authorizationStatus: "observed",
            blockReason: "",
            innerOperationId: innerApplicationResult.operationId,
            outerOperationId: operationId,
            innerOutputKind: innerApplicationResult.outputKind,
            outerOutputKind: outputKind,
            sharedUnitKinds: topologyEdge.sharedUnitKinds,
            innerApplicationResult,
            outerApplicationResult: result,
            innerCanonicalResult,
            innerProducerCanonicalResult:
              innerApplicationResult.canonicalResult,
            innerResultRole: innerProvenance.resultRole,
            outerCanonicalResult: canonicalResult,
            exactInnerResultIdentityObservedInOuterArguments: true,
            bothResultsOwnerValidated: true,
            topologyCompatibilityObserved: true,
            topologyCompatibilityStatus:
              topologyEdge.compatibilityStatus,
            lessonNumberAuthority: false,
            grammarAuthority: false,
            formulaStringAuthority: false,
            surfaceStringAuthority: false,
          });
          issuedRhymeOwnerProofObservations.add(observation);
          return [observation];
        }),
      );
      if (observations.length) {
        rhymeOwnerProofObservationsByApplicationResult.set(
          result,
          observations,
        );
        rhymeOwnerProofObservationsByCanonicalResult.set(
          canonicalResult,
          observations,
        );
      }
    }
    if (authorizationStatus === "authorized" && canonicalResult) {
      const rhymeFullPinFrame = buildClassicalGrammaticalRhymeFullPinFrame({
        operationId,
        outputKind,
        axisIds: route.axisIds,
        canonicalResult,
        exactResultIdentityValidated: true,
      });
      rhymeFullPinByApplicationResult.set(result, rhymeFullPinFrame);
      rhymeFullPinByCanonicalResult.set(canonicalResult, rhymeFullPinFrame);
      const rhymeCalibrationFrame =
        buildClassicalGrammaticalRhymeCalibrationFrame({
          operationId,
          outputKind,
          axisIds: route.axisIds,
          sharedAxisIds: LCM_AXIS_OWNERS.filter(axis => (
            route.axisIds.includes(axis.axisId)
            && axis.ownerOperationIds.length > 1
          )).map(axis => axis.axisId),
          typedArguments: args,
          applicationResult: result,
          canonicalResult,
          rhymeFullPinFrame,
          requestValidationPassed: Boolean(
            typedApplicationRequest
            && semanticOperationIdentity
            && authorityCarrierClear
          ),
          ownerResultValidationPassed: Boolean(
            canonicalResultRecognized
            && canonicalAuthorizationStatus === "authorized"
          ),
          exactApplicationResultIdentityValidated:
            issuedApplicationResults.has(result),
          exactCanonicalResultIdentityValidated:
            issuedCanonicalResults.has(canonicalResult),
        });
      rhymeCalibrationByApplicationResult.set(
        result,
        rhymeCalibrationFrame,
      );
      rhymeCalibrationByCanonicalResult.set(
        canonicalResult,
        rhymeCalibrationFrame,
      );
      const layerGraph = buildClassicalGrammarApplicationLayerGraph(
        result,
        getClassicalGrammarApplicationRhymeOwnerProofObservations(result),
        exactInstanceContinuationFacts,
      );
      if (layerGraph.authorizationStatus === "observed") {
        layerGraphByApplicationResult.set(result, layerGraph);
        layerGraphByCanonicalResult.set(canonicalResult, layerGraph);
      }
      const evaluationOrderFrame =
        buildClassicalGrammaticalRhymeEvaluationOrderFrame({
          canonicalResult,
          layerGraph,
          ownerResultValidated: canonicalResultRecognized
            && canonicalAuthorizationStatus === "authorized",
        });
      rhymeEvaluationOrderByApplicationResult.set(
        result,
        evaluationOrderFrame,
      );
      rhymeEvaluationOrderByCanonicalResult.set(
        canonicalResult,
        evaluationOrderFrame,
      );
      issueClassicalGrammarApplicationAtlasObservation(result);
    }
    return result;
  }

  function getClassicalGrammarApplicationRhymeFullPin(
    currentResult = null,
  ) {
    if (isClassicalGrammarApplicationResult(currentResult)) {
      return rhymeFullPinByApplicationResult.get(currentResult) || null;
    }
    return currentResult && typeof currentResult === "object"
      ? rhymeFullPinByCanonicalResult.get(currentResult) || null
      : null;
  }

  function getClassicalGrammarApplicationRhymeCalibration(
    currentResult = null,
  ) {
    if (isClassicalGrammarApplicationResult(currentResult)) {
      return rhymeCalibrationByApplicationResult.get(currentResult) || null;
    }
    return currentResult && typeof currentResult === "object"
      ? rhymeCalibrationByCanonicalResult.get(currentResult) || null
      : null;
  }

  function getClassicalGrammarApplicationEvaluationOrder(
    currentResult = null,
  ) {
    if (isClassicalGrammarApplicationResult(currentResult)) {
      return rhymeEvaluationOrderByApplicationResult.get(currentResult)
        || null;
    }
    return currentResult && typeof currentResult === "object"
      ? rhymeEvaluationOrderByCanonicalResult.get(currentResult) || null
      : null;
  }

  function inspectClassicalGrammarEvaluationOrderCandidate(
    canonicalResult = null,
  ) {
    return buildClassicalGrammaticalRhymeEvaluationOrderFrame({
      canonicalResult,
      layerGraph: null,
      ownerResultValidated: false,
    });
  }

  function isClassicalGrammarApplicationResult(result = null) {
    const invariantProofs = result?.greatestCommonDivisor?.invariantProofs;
    const outputContract = getApplicationOutputContract(
      result?.operationId,
      result?.outputKind,
      targetObject,
    );
    const gcdProofComplete = GCD_INVARIANT_IDS.every(
      (invariantId) => invariantProofs?.[invariantId] === true,
    );
    const writingOutputs = Array.isArray(result?.lesson2WritingOutputs)
      ? result.lesson2WritingOutputs
      : [];
    const expectedPrimaryOutputs = getClassicalLesson2PrimaryWritingOutputs(
      result?.canonicalResult || null,
      result?.outputKind,
    );
    const expectedLesson2WritingPass = buildClassicalLesson2WritingPass(
      writingOutputs,
    );
    const lesson2OutputsExact = writingOutputs.length
      === expectedPrimaryOutputs.length
      && writingOutputs.every((output, index) => {
        const expected = expectedPrimaryOutputs[index];
        return Boolean(
          output?.surface === expected?.surface
          && output?.role === expected?.role
          && Object.isFrozen(output)
          && (
            output?.authorizationStatus === "blocked"
              ? output.mode === "lesson2-owner-missing"
                && output.writtenResult === null
              : output?.authorizationStatus === "authorized"
                && (output.mode === "lesson2-direct-rule-owner"
              ? output.writtenResult === null
                && (
                  result.operationId === "orthography:transcription"
                  || result.operationId.startsWith("phonology:")
                )
              : output.mode === "lesson2-writer"
                && targetObject.isClassicalNahuatlLesson2WrittenResult(
                  output.writtenResult,
                )
                && output.writtenResult.surface === output.surface
                )
          )
        );
      });
    const expectedFirstWrittenResult = writingOutputs.find(
      output => output.writtenResult,
    )?.writtenResult || null;
    return Boolean(
      result
      && issuedApplicationResults.has(result)
      && result.kind === APPLICATION_RESULT_KIND
      && result.version === 1
      && ROUTE_DEFINITIONS[result.operationId]
      && outputContract
      && result.lesson2WritingPass?.kind
        === "classical-nahuatl-lesson2-writing-pass"
      && result.lesson2WritingPass?.version === 1
      && result.lesson2WritingPass?.familyRoutingIds
        === CLASSICAL_LESSON2_WRITING_FAMILY_IDS
      && result.lesson2WritingPass?.changesGrammarAuthority === false
      && result.lesson2WritingPass?.lessonMetadataAuthority === false
      && result.lesson2WritingPass?.storedWritingAuthority === false
      && result.lesson2WritingPass?.writingOwnerInstalled
        === expectedLesson2WritingPass.writingOwnerInstalled
      && Object.isFrozen(result.lesson2WritingOutputs)
      && lesson2OutputsExact
      && result.lesson2WrittenResult === expectedFirstWrittenResult
      && result.lesson2WritingPass?.required
        === expectedLesson2WritingPass.required
      && result.lesson2WritingPass?.entered
        === expectedLesson2WritingPass.entered
      && result.lesson2WritingPass?.allTwelveFamiliesRouted
        === expectedLesson2WritingPass.allTwelveFamiliesRouted
      && result.lesson2WritingPass?.familyPasses?.length === 12
      && result.lesson2WritingPass.familyPasses.every((familyPass, index) => (
        familyPass?.familyId === CLASSICAL_LESSON2_WRITING_FAMILY_IDS[index]
        && familyPass?.entered
          === expectedLesson2WritingPass.familyPasses[index]?.entered
        && familyPass?.status
          === expectedLesson2WritingPass.familyPasses[index]?.status
        && Object.isFrozen(familyPass)
      ))
      && result.lesson2WritingPass?.writtenResultCount
        === expectedLesson2WritingPass.writtenResultCount
      && Object.isFrozen(result.lesson2WritingPass)
      && result.capabilityName === outputContract.capabilityName
      && (
        result.authorizationStatus === "authorized"
          ? result.greatestCommonDivisor?.satisfied === true
            && gcdProofComplete
            && issuedCanonicalResults.has(result.canonicalResult)
          : result.authorizationStatus === "blocked"
            ? result.greatestCommonDivisor?.satisfied === false
              && (
                result.canonicalResult === null
                || (
                  issuedCanonicalResults.has(result.canonicalResult)
                  && (
                    getCanonicalResultAuthorizationStatus(
                      result.canonicalResult
                    ) === "blocked"
                    || invariantProofs?.["lesson2-writing-pass"] === false
                  )
                )
              )
            : false
      )
    );
  }

  function captureClassicalGrammarApplicationResult(
    currentResult = null,
    slotId = "",
  ) {
    const normalizedSlotId = String(slotId || "").trim();
    const exactResultProvenance = getIssuedResultProvenance(currentResult);
    const applicationResult = isClassicalGrammarApplicationResult(currentResult)
      ? currentResult
      : exactResultProvenance?.applicationResult || null;
    const capturedCanonicalResult =
      isClassicalGrammarApplicationResult(currentResult)
        ? currentResult.canonicalResult
        : exactResultProvenance?.exactResult || null;
    const capturedResultRole =
      isClassicalGrammarApplicationResult(currentResult)
        ? "canonical-result"
        : exactResultProvenance?.resultRole || "";
    if (
      !normalizedSlotId
      || !isClassicalGrammarApplicationResult(applicationResult)
      || applicationResult.authorizationStatus !== "authorized"
      || !capturedCanonicalResult
      || typeof capturedCanonicalResult !== "object"
    ) {
      return Object.freeze({
        kind: APPLICATION_RESULT_CAPTURE_KIND,
        version: 1,
        authorizationStatus: "blocked",
        blockReason: !normalizedSlotId
          ? "classical-grammar-application-result-capture-slot-required"
          : "classical-grammar-application-issued-authorized-result-required",
        slotId: normalizedSlotId,
        outputKind: "",
        capturedResultRole: "",
        applicationResult: null,
        canonicalResult: null,
        rhymeFullPinFrame: null,
        rhymeCalibrationFrame: null,
        evaluationOrderFrame: null,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        storedAnswerAuthority: false,
      });
    }
    return Object.freeze({
      kind: APPLICATION_RESULT_CAPTURE_KIND,
      version: 1,
      authorizationStatus: "authorized",
      blockReason: "",
      slotId: normalizedSlotId,
      operationId: applicationResult.operationId,
      outputKind: applicationResult.outputKind,
      capturedResultRole,
      applicationResult,
      canonicalResult: capturedCanonicalResult,
      rhymeFullPinFrame:
        getClassicalGrammarApplicationRhymeFullPin(applicationResult),
      rhymeCalibrationFrame:
        getClassicalGrammarApplicationRhymeCalibration(applicationResult),
      layerGraph:
        getClassicalGrammarApplicationLayerGraph(applicationResult),
      evaluationOrderFrame:
        getClassicalGrammarApplicationEvaluationOrder(applicationResult),
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      storedAnswerAuthority: false,
    });
  }

  function isClassicalGrammarApplicationResultCapture(
    capture = null,
    expectedSlotId = "",
  ) {
    const normalizedExpectedSlotId = String(expectedSlotId || "").trim();
    return Boolean(
      capture
      && capture.kind === APPLICATION_RESULT_CAPTURE_KIND
      && capture.version === 1
      && capture.authorizationStatus === "authorized"
      && capture.blockReason === ""
      && (!normalizedExpectedSlotId || capture.slotId === normalizedExpectedSlotId)
      && isClassicalGrammarApplicationResult(capture.applicationResult)
      && capture.applicationResult.authorizationStatus === "authorized"
      && capture.operationId === capture.applicationResult.operationId
      && capture.outputKind === capture.applicationResult.outputKind
      && getIssuedResultProvenance(capture.canonicalResult)
        ?.applicationResult === capture.applicationResult
      && ["canonical-result", "continuation-result"].includes(
        capture.capturedResultRole,
      )
      && capture.rhymeFullPinFrame
        === getClassicalGrammarApplicationRhymeFullPin(
          capture.applicationResult,
        )
      && capture.rhymeCalibrationFrame
        === getClassicalGrammarApplicationRhymeCalibration(
          capture.applicationResult,
        )
      && capture.evaluationOrderFrame
        === getClassicalGrammarApplicationEvaluationOrder(
          capture.applicationResult,
        )
      && capture.formulaStringAuthority === false
      && capture.surfaceStringAuthority === false
      && capture.storedAnswerAuthority === false
      && Object.isFrozen(capture)
    );
  }

  function requestCanonicalResult(
    operationId,
    args = [],
    outputKind = DEFAULT_APPLICATION_OUTPUT_KIND,
  ) {
    return executeClassicalGrammarApplicationRequest({
      operationId,
      outputKind,
      args,
    }).canonicalResult;
  }

  function requestClassicalVncSentenceResultFrame(applicationFrame = null) {
    return requestCanonicalResult("vnc:sentence-result", [applicationFrame]);
  }

  function issueClassicalTranscriptionSourceFrame(constituents = []) {
    const resolvedBuilder = resolveCanonicalCallableCapability(
      targetObject,
      "buildClassicalNahuatlTranscriptionSourceFrame",
      api,
    );
    if (!resolvedBuilder) {
      throw new Error(
        `${REQUIRED_CAPABILITY_DIAGNOSTIC}:buildClassicalNahuatlTranscriptionSourceFrame`,
      );
    }
    return Reflect.apply(
      resolvedBuilder.capability,
      targetObject,
      [{ constituents }],
    );
  }

  function requestClassicalOrdinaryNncResult(
    sourceFrame = null,
    operationFrame = null,
  ) {
    return requestCanonicalResult(
      "nnc:ordinary",
      [sourceFrame, operationFrame],
    );
  }

  function prepareClassicalOrdinaryNncParadigmPlan(
    sourceFrame = null,
    selections = {},
  ) {
    return requestCanonicalResult(
      "nnc:ordinary",
      [sourceFrame, selections],
      CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.preparedPlan,
    );
  }

  function projectClassicalOrdinaryNncParadigmCoordinates(plan = null) {
    return requestCanonicalResult(
      "nnc:ordinary",
      [plan],
      CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.coordinateProjection,
    );
  }

  function requestClassicalNncDiagrammaticFrame(slotFrame = null) {
    return requestCanonicalResult("nnc:diagram", [slotFrame]);
  }

  function requestClassicalVncDiagrammaticFrame(slotFrame = null) {
    return requestCanonicalResult("vnc:diagram", [slotFrame]);
  }

  function requestClassicalSentenceAdverbialFrame(selections = {}) {
    const hasAdverbialIdentity = Boolean(
      selections
      && typeof selections === "object"
      && Object.prototype.hasOwnProperty.call(selections, "adverbialId"),
    );
    if (!hasAdverbialIdentity) {
      return requestCanonicalResult(
        "sentence:adverbial-adjunction",
        [selections],
      );
    }
    if (Object.prototype.hasOwnProperty.call(selections, "particleSourceFrame")) {
      throw new Error(
        `${APPLICATION_REQUEST_DIAGNOSTIC}:adverbial-id-and-source-frame-are-mutually-exclusive`,
      );
    }
    const { adverbialId, ...sentenceSelections } = selections;
    return requestCanonicalResult("sentence:adverbial-adjunction", [{
      ...sentenceSelections,
      particleSourceFrame: issueClassicalParticleSourceFrame(adverbialId),
    }]);
  }

  function issueClassicalParticleSourceFrame(candidate = "") {
    if (candidate && typeof candidate === "object") {
      return candidate;
    }
    const normalizedCandidate = String(candidate || "").trim();
    if (!normalizedCandidate || normalizedCandidate.toLowerCase() === "none") {
      return null;
    }
    const resolvedBuilder = resolveCanonicalCallableCapability(
      targetObject,
      "buildClassicalNahuatlParticleSourceFrame",
      api,
    );
    if (!resolvedBuilder) {
      throw new Error(
        `${REQUIRED_CAPABILITY_DIAGNOSTIC}:buildClassicalNahuatlParticleSourceFrame`,
      );
    }
    return Reflect.apply(
      resolvedBuilder.capability,
      targetObject,
      [normalizedCandidate],
    );
  }

  function requestClassicalSentenceParticleFrame(selections = {}) {
    const hasParticleIdentity = Boolean(
      selections
      && typeof selections === "object"
      && Object.prototype.hasOwnProperty.call(selections, "particleId"),
    );
    if (!hasParticleIdentity) {
      return requestCanonicalResult(
        "sentence:particle-adjunction",
        [selections],
      );
    }
    if (Object.prototype.hasOwnProperty.call(selections, "particleSourceFrame")) {
      throw new Error(
        `${APPLICATION_REQUEST_DIAGNOSTIC}:particle-id-and-source-frame-are-mutually-exclusive`,
      );
    }
    const { particleId, ...sentenceSelections } = selections;
    return requestCanonicalResult("sentence:particle-adjunction", [{
      ...sentenceSelections,
      particleSourceFrame: issueClassicalParticleSourceFrame(particleId),
    }]);
  }

  function requestClassicalParticleResult(candidate = "", options = {}) {
    return requestCanonicalResult(
      "particle:result",
      [issueClassicalParticleSourceFrame(candidate), options],
    );
  }

  function requestClassicalNegativeParticleSelection(selections = {}) {
    return requestCanonicalResult(
      "particle:negative-selection",
      [selections],
    );
  }

  function issueClassicalLinguisticUnitCompositionSource(request = {}) {
    const resolvedBuilder = resolveCanonicalCallableCapability(
      targetObject,
      "buildClassicalLinguisticUnitCompositionSource",
      api,
    );
    if (!resolvedBuilder) {
      throw new Error(
        `${REQUIRED_CAPABILITY_DIAGNOSTIC}:buildClassicalLinguisticUnitCompositionSource`,
      );
    }
    return Reflect.apply(resolvedBuilder.capability, targetObject, [request]);
  }

  function issueClassicalLinguisticStructureRecursionSource(request = {}) {
    const resolvedBuilder = resolveCanonicalCallableCapability(
      targetObject,
      "buildClassicalLinguisticStructureRecursionSource",
      api,
    );
    if (!resolvedBuilder) {
      throw new Error(
        `${REQUIRED_CAPABILITY_DIAGNOSTIC}:buildClassicalLinguisticStructureRecursionSource`,
      );
    }
    return Reflect.apply(resolvedBuilder.capability, targetObject, [request]);
  }

  function issueClassicalDiscontinuousUnitAdmissibilitySource(request = {}) {
    const resolvedBuilder = resolveCanonicalCallableCapability(
      targetObject,
      "buildClassicalDiscontinuousUnitAdmissibilitySource",
      api,
    );
    if (!resolvedBuilder) {
      throw new Error(
        `${REQUIRED_CAPABILITY_DIAGNOSTIC}:buildClassicalDiscontinuousUnitAdmissibilitySource`,
      );
    }
    return Reflect.apply(resolvedBuilder.capability, targetObject, [request]);
  }

  function issueClassicalCarrierRankTaxonomySource(request = {}) {
    const resolvedBuilder = resolveCanonicalCallableCapability(
      targetObject,
      "buildClassicalCarrierRankTaxonomySource",
      api,
    );
    if (!resolvedBuilder) {
      throw new Error(
        `${REQUIRED_CAPABILITY_DIAGNOSTIC}:buildClassicalCarrierRankTaxonomySource`,
      );
    }
    return Reflect.apply(resolvedBuilder.capability, targetObject, [request]);
  }

  function issueClassicalMeaninglessCarrierUnitClassificationSource(
    request = {},
  ) {
    const resolvedBuilder = resolveCanonicalCallableCapability(
      targetObject,
      "buildClassicalMeaninglessCarrierUnitClassificationSource",
      api,
    );
    if (!resolvedBuilder) {
      throw new Error(
        `${REQUIRED_CAPABILITY_DIAGNOSTIC}:buildClassicalMeaninglessCarrierUnitClassificationSource`,
      );
    }
    return Reflect.apply(resolvedBuilder.capability, targetObject, [request]);
  }

  function requestClassicalVncSourceSelectionFrame(...args) {
    return requestCanonicalResult("vnc:source-selection", args);
  }

  function requestClassicalOrderedVoiceVncApplicationFrame(...args) {
    return requestCanonicalResult("vnc:ordered-voice-application", args);
  }

  function requestClassicalPronominalNncResult(
    sourceFrame = null,
    operationFrame = null,
  ) {
    return requestCanonicalResult(
      "nnc:pronominal",
      [sourceFrame, operationFrame],
    );
  }

  function prepareClassicalPronominalNncParadigmPlan(
    sourceFrame = null,
    selections = {},
  ) {
    return requestCanonicalResult(
      "nnc:pronominal",
      [sourceFrame, selections],
      CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.preparedPlan,
    );
  }

  function projectClassicalPronominalNncParadigmCoordinates(
    plan = null,
  ) {
    return requestCanonicalResult(
      "nnc:pronominal",
      [plan],
      CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.coordinateProjection,
    );
  }

  function requestClassicalLateVncOperation(...args) {
    return requestCanonicalResult("vnc:derivational-operation", args);
  }

  function requestClassicalVncApplicationResult(...args) {
    return requestCanonicalResult("vnc:application", args);
  }

  function prepareClassicalVncApplicationParadigmPlan(...args) {
    return requestCanonicalResult(
      "vnc:application",
      args,
      CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.preparedPlan,
    );
  }

  function projectClassicalVncApplicationParadigmCoordinates(...args) {
    return requestCanonicalResult(
      "vnc:application",
      args,
      CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.coordinateProjection,
    );
  }

  function requestClassicalNominalConstructionResult(...args) {
    return requestCanonicalResult("grammar:nominal-construction", args);
  }

  function prepareClassicalNominalConstructionParadigmPlan(...args) {
    return requestCanonicalResult(
      "grammar:nominal-construction",
      args,
      CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.preparedPlan,
    );
  }

  function projectClassicalNominalConstructionParadigmCoordinates(...args) {
    return requestCanonicalResult(
      "grammar:nominal-construction",
      args,
      CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.coordinateProjection,
    );
  }

  function requestClassicalDeverbalNncResult(...args) {
    return requestCanonicalResult("nnc:deverbal-construction", args);
  }

  function prepareClassicalDeverbalNncParadigmPlan(...args) {
    return requestCanonicalResult(
      "nnc:deverbal-construction",
      args,
      CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.preparedPlan,
    );
  }

  function projectClassicalDeverbalNncParadigmCoordinates(...args) {
    return requestCanonicalResult(
      "nnc:deverbal-construction",
      args,
      CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.coordinateProjection,
    );
  }

  function requestClassicalAdjectivalModificationResult(...args) {
    return requestCanonicalResult("nnc:adjectival-modification", args);
  }

  function requestClassicalAdverbialNncResult(...args) {
    return requestCanonicalResult("nnc:adverbial", args);
  }

  function prepareClassicalAdverbialNncSource(...args) {
    return requestCanonicalResult(
      "nnc:adverbial",
      args,
      CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.sourcePreparation,
    );
  }

  function prepareClassicalAdverbialNncParadigmPlan(...args) {
    return requestCanonicalResult(
      "nnc:adverbial",
      args,
      CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.preparedPlan,
    );
  }

  function projectClassicalAdverbialNncParadigmCoordinates(...args) {
    return requestCanonicalResult(
      "nnc:adverbial",
      args,
      CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.coordinateProjection,
    );
  }

  function requestClassicalRelationalNncResult(...args) {
    return requestCanonicalResult("nnc:relational", args);
  }

  function prepareClassicalRelationalNncParadigmPlan(...args) {
    return requestCanonicalResult(
      "nnc:relational",
      args,
      CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.preparedPlan,
    );
  }

  function projectClassicalRelationalNncParadigmCoordinates(...args) {
    return requestCanonicalResult(
      "nnc:relational",
      args,
      CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.coordinateProjection,
    );
  }

  function requestClassicalPlaceGentilicResult(...args) {
    return requestCanonicalResult("nnc:place-gentilic", args);
  }

  function prepareClassicalPlaceGentilicParadigmPlan(...args) {
    return requestCanonicalResult(
      "nnc:place-gentilic",
      args,
      CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.preparedPlan,
    );
  }

  function projectClassicalPlaceGentilicParadigmCoordinates(...args) {
    return requestCanonicalResult(
      "nnc:place-gentilic",
      args,
      CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.coordinateProjection,
    );
  }

  function requestClassicalAdverbialAdjunctionResult(...args) {
    return requestCanonicalResult("clause:adverbial-adjunction", args);
  }

  function requestClassicalClauseCompositionResult(...args) {
    return requestCanonicalResult("clause:composition", args);
  }

  function requestClassicalComparisonResult(...args) {
    return requestCanonicalResult("clause:comparison", args);
  }

  function requestClassicalDenominalVncResult(...args) {
    return requestCanonicalResult("vnc:denominal", args);
  }

  function prepareClassicalDenominalVncOperationPathInventory(
    request = {},
  ) {
    const inventoryCapability = resolveCanonicalCallableCapability(
      targetObject,
      "getClassicalNahuatlDenominalVncOperationPathInventory",
      api,
    );
    const validatorCapability = resolveCanonicalCallableCapability(
      targetObject,
      "isClassicalNahuatlDenominalVncOperationPathInventory",
      api,
    );
    if (!inventoryCapability || !validatorCapability) {
      return buildBlockedCanonicalNncApplicationFrame(
        "classical-nahuatl-denominal-vnc-operation-path-inventory",
        "canonical-denominal-operation-path-inventory-capability-missing",
      );
    }
    const inventory = Reflect.apply(
      inventoryCapability.capability,
      targetObject,
      [request],
    );
    let ownerIssued = false;
    try {
      ownerIssued = Reflect.apply(
        validatorCapability.capability,
        targetObject,
        [inventory],
      ) === true;
    } catch {
      ownerIssued = false;
    }
    return ownerIssued
      ? inventory
      : buildBlockedCanonicalNncApplicationFrame(
        "classical-nahuatl-denominal-vnc-operation-path-inventory",
        inventory?.blockReason
          || "canonical-denominal-operation-path-inventory-not-issued",
      );
  }

  function prepareClassicalDenominalVncParadigmPlan(...args) {
    return requestCanonicalResult(
      "vnc:denominal",
      args,
      CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.preparedPlan,
    );
  }

  function projectClassicalDenominalVncParadigmCoordinates(...args) {
    return requestCanonicalResult(
      "vnc:denominal",
      args,
      CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.coordinateProjection,
    );
  }

  function requestClassicalPersonalNameNncResult(...args) {
    return requestCanonicalResult("nnc:personal-name", args);
  }

  function prepareClassicalPersonalNameNncParadigmPlan(...args) {
    return requestCanonicalResult(
      "nnc:personal-name",
      args,
      CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.preparedPlan,
    );
  }

  function projectClassicalPersonalNameNncParadigmCoordinates(...args) {
    return requestCanonicalResult(
      "nnc:personal-name",
      args,
      CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS.coordinateProjection,
    );
  }

  function buildBlockedCanonicalNncApplicationFrame(
    kind,
    blockReason,
    extras = {},
  ) {
    return Object.freeze({
      kind,
      version: 1,
      authorizationStatus: "blocked",
      blockReason,
      ...extras,
      typedSourceAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      lessonMetadataAuthority: false,
    });
  }

  function issueCanonicalNncSourceFrame(source = {}) {
    if (
      typeof targetObject.buildClassicalNahuatlOrdinaryNncSourceFrame
        !== "function"
      || typeof targetObject.buildClassicalNahuatlPronominalNncSourceFrame
        !== "function"
    ) {
      return buildBlockedCanonicalNncApplicationFrame(
        "classical-nahuatl-nnc-source-frame",
        "canonical-nnc-source-capability-missing",
      );
    }
    const ordinary =
      targetObject.buildClassicalNahuatlOrdinaryNncSourceFrame(source);
    if (
      typeof targetObject.isClassicalNahuatlOrdinaryNncSourceFrame
        === "function"
      && targetObject.isClassicalNahuatlOrdinaryNncSourceFrame(ordinary)
    ) {
      return ordinary;
    }
    const pronominal =
      targetObject.buildClassicalNahuatlPronominalNncSourceFrame(source);
    if (
      typeof targetObject.isClassicalNahuatlPronominalNncSourceFrame
        === "function"
      && targetObject.isClassicalNahuatlPronominalNncSourceFrame(pronominal)
    ) {
      return pronominal;
    }
    return pronominal?.lexicalEntryId
      ? pronominal
      : ordinary?.lexicalEntryId
        ? ordinary
        : ordinary;
  }

  function isIssuedCanonicalNncSourceFrame(sourceFrame = null) {
    return Boolean(
      typeof targetObject.isClassicalNahuatlOrdinaryNncSourceFrame
        === "function"
      && targetObject.isClassicalNahuatlOrdinaryNncSourceFrame(sourceFrame)
      || typeof targetObject.isClassicalNahuatlPronominalNncSourceFrame
        === "function"
      && targetObject.isClassicalNahuatlPronominalNncSourceFrame(sourceFrame),
    );
  }

  function getCanonicalNncOperationSelectionFrame(
    sourceFrame = null,
    selections = {},
  ) {
    if (
      typeof targetObject.buildClassicalNahuatlNncOperationSelectionFrame
        !== "function"
    ) {
      return buildBlockedCanonicalNncApplicationFrame(
        "classical-nahuatl-nnc-operation-selection-frame",
        "canonical-nnc-operation-selection-capability-missing",
        { sourceFrame },
      );
    }
    return targetObject.buildClassicalNahuatlNncOperationSelectionFrame(
      sourceFrame,
      selections,
    );
  }

  function issueCanonicalNncOperationFrame(
    sourceFrame = null,
    selections = {},
  ) {
    if (
      typeof targetObject.isClassicalNahuatlOrdinaryNncSourceFrame
        === "function"
      && targetObject.isClassicalNahuatlOrdinaryNncSourceFrame(sourceFrame)
    ) {
      return typeof targetObject
        .buildClassicalNahuatlOrdinaryNncOperationFrame === "function"
        ? targetObject.buildClassicalNahuatlOrdinaryNncOperationFrame(
          sourceFrame,
          selections,
        )
        : buildBlockedCanonicalNncApplicationFrame(
          "classical-nahuatl-ordinary-nnc-operation-frame",
          "canonical-ordinary-nnc-operation-capability-missing",
          { sourceFrame },
        );
    }
    if (
      typeof targetObject.isClassicalNahuatlPronominalNncSourceFrame
        === "function"
      && targetObject.isClassicalNahuatlPronominalNncSourceFrame(sourceFrame)
    ) {
      return typeof targetObject
        .buildClassicalNahuatlPronominalNncOperationFrame === "function"
        ? targetObject.buildClassicalNahuatlPronominalNncOperationFrame(
          sourceFrame,
          selections,
        )
        : buildBlockedCanonicalNncApplicationFrame(
          "classical-nahuatl-pronominal-nnc-operation-frame",
          "canonical-pronominal-nnc-operation-capability-missing",
          { sourceFrame },
        );
    }
    return buildBlockedCanonicalNncApplicationFrame(
      "classical-nahuatl-nnc-operation-frame",
      "issued-authorized-nnc-source-required",
      { sourceFrame: null },
    );
  }

  api = Object.freeze({
    REQUIRED_CAPABILITY_DIAGNOSTIC,
    APPLICATION_REQUEST_DIAGNOSTIC,
    APPLICATION_RESULT_DIAGNOSTIC,
    APPLICATION_RESULT_KIND,
    APPLICATION_RESULT_CAPTURE_KIND,
    RHYME_OWNER_PROOF_OBSERVATION_KIND,
    APPLICATION_LAYER_GRAPH_KIND,
    APPLICATION_ATLAS_OBSERVATION_KIND,
    APPLICATION_CAPABILITY_NAVIGATOR_KIND,
    APPLICATION_TYPED_SOURCE_CAPABILITY_NAVIGATOR_KIND,
    APPLICATION_TYPED_SOURCE_OPERATION_BINDING_KIND,
    CLASSICAL_VISIBLE_SURFACE_DIAGNOSTIC,
    CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS,
    CLASSICAL_GRAMMAR_APPLICATION_GCD_INVARIANT_IDS: GCD_INVARIANT_IDS,
    CLASSICAL_GRAMMAR_APPLICATION_LCM_AXIS_IDS: LCM_AXIS_IDS,
    getClassicalVisibleSurfaceViolation,
    assertClassicalVisibleSurfaceResult,
    createClassicalGrammarApplicationApi,
    getClassicalGrammarApplicationInventory,
    buildClassicalGrammarApplicationRhymeOwnerCalibration,
    getClassicalGrammarApplicationRhymeFullPin,
    getClassicalGrammarApplicationRhymeCalibration,
    getClassicalGrammarApplicationEvaluationOrder,
    inspectClassicalGrammarEvaluationOrderCandidate,
    getClassicalGrammarApplicationRhymeOwnerProofObservations,
    isClassicalGrammarApplicationRhymeOwnerProofObservation,
    getClassicalGrammarApplicationRhymeContinuationProvenance,
    getClassicalGrammarApplicationNextOperationInventory,
    getClassicalGrammarApplicationCapabilityNavigator,
    isClassicalGrammarApplicationCapabilityNavigator,
    issueClassicalGrammarFormationResultBindingFrame,
    isClassicalGrammarFormationResultBindingFrame,
    getClassicalGrammarApplicationTypedSourceCapabilityNavigator,
    isClassicalGrammarApplicationTypedSourceCapabilityNavigator,
    issueClassicalGrammarTypedSourceOperationBindingFrame,
    isClassicalGrammarTypedSourceOperationBindingFrame,
    executeClassicalGrammarTypedSourceOperationBindingFrame,
    getClassicalGrammarApplicationLayerGraph,
    isClassicalGrammarApplicationLayerGraph,
    getClassicalGrammarApplicationAtlasObservation,
    isClassicalGrammarApplicationAtlasObservation,
    subscribeClassicalGrammarApplicationAtlasObservations,
    executeClassicalGrammarApplicationRequest,
    isClassicalGrammarApplicationResult,
    captureClassicalGrammarApplicationResult,
    isClassicalGrammarApplicationResultCapture,
    issueClassicalTranscriptionSourceFrame,
    requestClassicalVncSentenceResultFrame,
    requestClassicalOrdinaryNncResult,
    prepareClassicalOrdinaryNncParadigmPlan,
    projectClassicalOrdinaryNncParadigmCoordinates,
    requestClassicalNncDiagrammaticFrame,
    requestClassicalVncDiagrammaticFrame,
    requestClassicalSentenceAdverbialFrame,
    requestClassicalSentenceParticleFrame,
    requestClassicalParticleResult,
    requestClassicalNegativeParticleSelection,
    issueClassicalLinguisticUnitCompositionSource,
    issueClassicalLinguisticStructureRecursionSource,
    issueClassicalDiscontinuousUnitAdmissibilitySource,
    issueClassicalCarrierRankTaxonomySource,
    issueClassicalMeaninglessCarrierUnitClassificationSource,
    requestClassicalVncSourceSelectionFrame,
    requestClassicalOrderedVoiceVncApplicationFrame,
    requestClassicalPronominalNncResult,
    prepareClassicalPronominalNncParadigmPlan,
    projectClassicalPronominalNncParadigmCoordinates,
    requestClassicalLateVncOperation,
    requestClassicalVncApplicationResult,
    prepareClassicalVncApplicationParadigmPlan,
    projectClassicalVncApplicationParadigmCoordinates,
    requestClassicalNominalConstructionResult,
    prepareClassicalNominalConstructionParadigmPlan,
    projectClassicalNominalConstructionParadigmCoordinates,
    requestClassicalDeverbalNncResult,
    prepareClassicalDeverbalNncParadigmPlan,
    projectClassicalDeverbalNncParadigmCoordinates,
    requestClassicalAdjectivalModificationResult,
    requestClassicalAdverbialNncResult,
    prepareClassicalAdverbialNncSource,
    prepareClassicalAdverbialNncParadigmPlan,
    projectClassicalAdverbialNncParadigmCoordinates,
    requestClassicalRelationalNncResult,
    prepareClassicalRelationalNncParadigmPlan,
    projectClassicalRelationalNncParadigmCoordinates,
    requestClassicalPlaceGentilicResult,
    prepareClassicalPlaceGentilicParadigmPlan,
    projectClassicalPlaceGentilicParadigmCoordinates,
    requestClassicalAdverbialAdjunctionResult,
    requestClassicalClauseCompositionResult,
    requestClassicalComparisonResult,
    requestClassicalDenominalVncResult,
    prepareClassicalDenominalVncOperationPathInventory,
    prepareClassicalDenominalVncParadigmPlan,
    projectClassicalDenominalVncParadigmCoordinates,
    requestClassicalPersonalNameNncResult,
    prepareClassicalPersonalNameNncParadigmPlan,
    projectClassicalPersonalNameNncParadigmCoordinates,
    issueCanonicalNncSourceFrame,
    isIssuedCanonicalNncSourceFrame,
    getCanonicalNncOperationSelectionFrame,
    issueCanonicalNncOperationFrame,
  });
  return api;
}

export function installClassicalGrammarApplicationGlobals(
  targetObject = globalThis,
  installationContext = {},
) {
  const applicationTarget = Object.create(targetObject);
  Object.defineProperties(
    applicationTarget,
    Object.getOwnPropertyDescriptors(
      installationContext?.moduleDependencyCapabilities || {},
    ),
  );
  const api = createClassicalGrammarApplicationApi(applicationTarget);
  Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
  captureCanonicalApplicationState(applicationTarget, api);
  return api;
}
