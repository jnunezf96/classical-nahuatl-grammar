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

const REQUIRED_CAPABILITY_DIAGNOSTIC = "classical-grammar-application-required-capability-missing";
const APPLICATION_REQUEST_DIAGNOSTIC = "classical-grammar-application-request-invalid";
const APPLICATION_RESULT_DIAGNOSTIC = "classical-grammar-application-result-invalid";
const APPLICATION_RESULT_KIND = "classical-grammar-application-result";
const APPLICATION_RESULT_CAPTURE_KIND = "classical-grammar-application-result-capture";
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
  candidateResult = null,
  lesson2WrittenResult = null,
) {
  const writtenResultLocations = getClassicalVisibleSurfacePaths(candidateResult);
  const required = writtenResultLocations.length > 0;
  const owned = Boolean(
    lesson2WrittenResult?.kind === "classical-nahuatl-lesson2-written-result"
    && lesson2WrittenResult?.authorizationStatus === "authorized"
    && lesson2WrittenResult?.writtenByLesson2 === true
  );
  const familyPasses = Object.freeze(
    CLASSICAL_LESSON2_WRITING_FAMILY_IDS.map(familyId => {
      const ownerCheck = lesson2WrittenResult?.familyChecks?.find(
        check => check.familyId === familyId,
      );
      return Object.freeze({
        familyId,
        entered: required && (owned ? ownerCheck?.checked === true : true),
        status: required
          ? owned
            ? ownerCheck?.status || "not-yet-centralized"
            : "entered-rule-may-still-be-unfinished"
          : "not-required",
      });
    }),
  );
  return Object.freeze({
    kind: "classical-nahuatl-lesson2-writing-pass",
    version: 1,
    required,
    entered: required,
    writtenResultCount: writtenResultLocations.length,
    familyRoutingIds: CLASSICAL_LESSON2_WRITING_FAMILY_IDS,
    familyPasses,
    allTwelveFamiliesRouted: required && familyPasses.every(pass => pass.entered),
    completionStatus: required
      ? owned
        ? `lesson2-owned-${lesson2WrittenResult.source?.boundaryKind || "word"}-writing`
        : "required-route-active-rules-still-incomplete"
      : "not-a-writing-result",
    writingOwnerInstalled: owned,
    changesGrammarAuthority: false,
    lessonMetadataAuthority: false,
    storedWritingAuthority: false,
  });
}

function buildClassicalLesson2OwnedWriting(
  candidateResult = null,
  targetObject = globalThis,
) {
  const sourceConstituents = candidateResult?.sourceAuthorizationFrame
    ?.sourceConstituents;
  const isNominalCompound = Boolean(
    candidateResult?.kind
      === "classical-nahuatl-nominal-construction-result-frame"
    && candidateResult?.constructionKind === "compound-nnc"
    && candidateResult?.sourceAuthorizationFrame?.authorizationStatus
      === "authorized"
    && sourceConstituents?.embedStem
    && sourceConstituents?.matrixStem
  );
  const nonzeroPart = (role, value, extra = {}) => {
    const normalized = String(value == null ? "" : value).trim();
    return !normalized || normalized === "0"
      ? null
      : { role, value: normalized, ...extra };
  };
  let parts = [];
  let boundaryKind = "morph";
  if (isNominalCompound) {
    parts = [
      { role: "embed", value: sourceConstituents.embedStem },
      { role: "matrix", value: sourceConstituents.matrixStem },
    ];
    boundaryKind = "compound";
  } else if (isBasicClassicalFiniteVncWritingCandidate(candidateResult)) {
    const person = candidateResult.personDyad || {};
    const tense = candidateResult.tenseFrame || {};
    const number = candidateResult.numberDyad || {};
    parts = [
      nonzeroPart("subject-person-1", person.pers1BaseMorph || person.pers1, {
        supportiveI: person.pers1SupportiveISurfaceAction === "insert"
          ? "insert-before-consonant"
          : "",
      }),
      nonzeroPart("subject-person-2", person.pers2),
      nonzeroPart("verbstem", candidateResult.stem),
      nonzeroPart("tense", tense.tns),
      nonzeroPart("subject-number-1", number.num1),
      nonzeroPart("subject-number-2", number.num2),
    ].filter(Boolean);
    boundaryKind = "finite-vnc-slots";
  } else if (
    candidateResult?.kind === "classical-nahuatl-ordinary-nnc-result-frame"
    && candidateResult?.authorizationStatus === "authorized"
  ) {
    const slots = candidateResult.typedSlotFrame?.slots || {};
    const participantParts = Array.isArray(slots.participant?.slots)
      ? slots.participant.slots.map((slot, index) => nonzeroPart(
        slot?.role || `participant-${index + 1}`,
        slot?.carrier,
      )).filter(Boolean)
      : [];
    const stateParts = Array.isArray(slots.state?.slots)
      ? slots.state.slots.map((slot, index) => nonzeroPart(
        slot?.role || `state-${index + 1}`,
        slot?.carrier,
      )).filter(Boolean)
      : [];
    parts = [
      nonzeroPart("subject-person-1", slots.subject?.pers1),
      nonzeroPart("subject-person-2", slots.subject?.pers2),
      ...participantParts,
      ...stateParts,
      nonzeroPart("nounstem", slots.predicate?.stem),
      nonzeroPart("subject-number-1", slots.number?.num1),
      nonzeroPart("subject-number-2", slots.number?.num2),
    ].filter(Boolean);
    boundaryKind = "ordinary-nnc-slots";
  } else {
    return null;
  }
  const source = targetObject.issueClassicalNahuatlLesson2WritingSource({
    parts,
    boundaryKind,
  });
  const result = targetObject.writeClassicalNahuatlLesson2Result(source);
  return targetObject.isClassicalNahuatlLesson2WrittenResult(result)
    ? result
    : null;
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
    "getClassicalNahuatlDenominalVncOperationPathInventory",
    "isClassicalNahuatlDenominalVncOperationPathInventory",
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
  const issuedApplicationResults = new WeakSet();
  const issuedCanonicalResults = new WeakSet();
  const issuedApplicationResultByCanonicalResult = new WeakMap();

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
    return Object.freeze({
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
      curriculumOrderAuthority: false,
      lessonMetadataAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      displayTextAuthority: false,
    });
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
    const lesson2WrittenResult = buildClassicalLesson2OwnedWriting(
      canonicalResult,
      targetObject,
    );
    const requiresLesson2OwnedWriting = Boolean(
      (
        canonicalResult?.kind
          === "classical-nahuatl-nominal-construction-result-frame"
        && canonicalResult?.constructionKind === "compound-nnc"
      )
      || isBasicClassicalFiniteVncWritingCandidate(canonicalResult)
      || canonicalResult?.kind === "classical-nahuatl-ordinary-nnc-result-frame"
    );
    const canonicalWrittenSurface = canonicalResult?.kind
      === "classical-nahuatl-finite-vnc-slot-result"
      ? canonicalResult?.written
      : canonicalResult?.wordSurface;
    const lesson2OwnedWritingSatisfied = requiresLesson2OwnedWriting
      ? Boolean(
        lesson2WrittenResult
        && targetObject.isClassicalNahuatlLesson2WrittenResult(
          lesson2WrittenResult,
        )
        && lesson2WrittenResult.surface === canonicalWrittenSurface
        && (
          canonicalResult?.kind
            !== "classical-nahuatl-nominal-construction-result-frame"
          || lesson2WrittenResult.surface
            === canonicalResult?.canonicalResult?.wordSurface
        )
      )
      : true;
    const lesson2WritingPass = buildClassicalLesson2WritingPass(
      canonicalResult,
      lesson2WrittenResult,
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
        ? requiresLesson2OwnedWriting
          ? lesson2OwnedWritingSatisfied
          : lesson2WritingPass.entered
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
            : "canonical-engine-result-blocked"
        ),
      operationId,
      outputKind,
      capabilityName,
      canonicalResult,
      lesson2WrittenResult,
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
    }
    return result;
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
    const expectedLesson2WritingPass = buildClassicalLesson2WritingPass(
      result?.canonicalResult || null,
      result?.lesson2WrittenResult || null,
    );
    const resultRequiresLesson2OwnedWriting = Boolean(
      (
        result?.canonicalResult?.kind
          === "classical-nahuatl-nominal-construction-result-frame"
        && result?.canonicalResult?.constructionKind === "compound-nnc"
      )
      || isBasicClassicalFiniteVncWritingCandidate(result?.canonicalResult)
      || result?.canonicalResult?.kind
        === "classical-nahuatl-ordinary-nnc-result-frame"
    );
    const resultCanonicalWrittenSurface = result?.canonicalResult?.kind
      === "classical-nahuatl-finite-vnc-slot-result"
      ? result?.canonicalResult?.written
      : result?.canonicalResult?.wordSurface;
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
      && (
        resultRequiresLesson2OwnedWriting
          ? targetObject.isClassicalNahuatlLesson2WrittenResult(
            result.lesson2WrittenResult,
          )
            && result.lesson2WrittenResult.surface
              === resultCanonicalWrittenSurface
          : result.lesson2WrittenResult === null
      )
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
                  && getCanonicalResultAuthorizationStatus(
                    result.canonicalResult
                  ) === "blocked"
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
    const applicationResult = isClassicalGrammarApplicationResult(currentResult)
      ? currentResult
      : currentResult && typeof currentResult === "object"
        ? issuedApplicationResultByCanonicalResult.get(currentResult) || null
        : null;
    if (
      !normalizedSlotId
      || !isClassicalGrammarApplicationResult(applicationResult)
      || applicationResult.authorizationStatus !== "authorized"
      || !applicationResult.canonicalResult
      || typeof applicationResult.canonicalResult !== "object"
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
        applicationResult: null,
        canonicalResult: null,
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
      applicationResult,
      canonicalResult: applicationResult.canonicalResult,
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
      && capture.canonicalResult === capture.applicationResult.canonicalResult
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
    CLASSICAL_VISIBLE_SURFACE_DIAGNOSTIC,
    CLASSICAL_GRAMMAR_APPLICATION_OUTPUT_KINDS,
    CLASSICAL_GRAMMAR_APPLICATION_GCD_INVARIANT_IDS: GCD_INVARIANT_IDS,
    CLASSICAL_GRAMMAR_APPLICATION_LCM_AXIS_IDS: LCM_AXIS_IDS,
    getClassicalVisibleSurfaceViolation,
    assertClassicalVisibleSurfaceResult,
    createClassicalGrammarApplicationApi,
    getClassicalGrammarApplicationInventory,
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
