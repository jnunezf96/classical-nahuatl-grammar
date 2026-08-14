// Canonical modern ESM module.

import {
  createGrammarOperationContractOwner,
} from "../grammar/operation_owner.mjs?v=20260728-runtime-reachability-111";
export function createClassicalNahuatlNncLayerEvaluatorApi(targetObject = globalThis) {
    const CLASSICAL_NAHUATL_NNC_LAYER_VERSION = 1;
    const issuedNncSentenceSurfaceFrames = new WeakMap();
    const issuedExotlInterpretationSources = new WeakSet();
    const issuedExotlInterpretationResults = new WeakSet();
    const issuedTlehAdmonitoryPairSources = new WeakSet();
    const issuedTlehAdmonitoryPairResults = new WeakSet();
    const issuedTlehClosingVocativeSources = new WeakSet();
    const issuedTlehClosingVocativeResults = new WeakSet();
    const issuedKingPraiseRoleContrastSources = new WeakSet();
    const issuedKingPraiseRoleContrastResults = new WeakSet();
    const issuedCooperationFrames = new WeakMap();
    const issuedNncDiagrammaticFrames = new WeakSet();
    const CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT = "ANDREWS_TRANSCRIPTION_CANVAS.md";
    const CLASSICAL_NAHUATL_NNC_ZERO = "0";
    const CLASSICAL_NAHUATL_LESSON12_NNC_DISTINCTION_AXES = Object.freeze([
      "subject-person",
      "subject-number",
      "subject-person-morphs",
      "absolutive-number-dyad",
      "noun-class-conditioned-connector",
      "animacy-reference",
      "lexical-state-availability",
      "predicate-function",
      "discourse-time-reference"
    ]);
    const CLASSICAL_NAHUATL_LESSON13_NNC_DISTINCTION_AXES = Object.freeze([
      "formula-state-arity",
      "subject-person",
      "subject-number",
      "subject-person-morphs",
      "subject-person-boundary-conditioning",
      "possessive-number-dyad",
      "subject-connector-conditioning",
      "possessor-reference-type",
      "possessor-person",
      "possessor-number",
      "possessive-case-location",
      "possessor-state-morphs",
      "possessor-boundary-conditioning",
      "nounstem-possessor-compatibility"
    ]);
    const CLASSICAL_NAHUATL_LESSON14_NNC_DISTINCTION_AXES = Object.freeze([
      "use-stem-kind",
      "use-stem-shape",
      "nounstem-class",
      "class-subclass",
      "stem-relation",
      "state",
      "subject-number",
      "subject-reference-animacy",
      "class-conditioned-number-dyad",
      "lexical-alternative",
      "constituent-analysis",
      "orthographic-boundary-realization"
    ]);
    const CLASSICAL_NAHUATL_LESSON15_NNC_DISTINCTION_AXES = Object.freeze([
      "stem-operation",
      "possessive-plural-boundary",
      "yo-matrix-allomorph",
      "derived-nonanimate-relation",
      "possessor-reduplication",
      "secondary-possessor-carrier",
      "analogical-source-predicate",
      "analogical-rank-transition",
      "analogical-use-stem-lifecycle",
      "analogical-state-reentry",
      "analogical-source-disposition",
      "reclassification-source-analysis",
      "reclassification-ephemeral-i-loss",
      "reclassification-target-class",
      "reclassification-semantic-outcome",
      "reclassification-construction-environment",
      "reclassification-state-reentry",
      "possessor-role",
      "natural-possession-policy",
      "natural-possession-semantics",
      "state-availability-and-metaphorical-override",
      "sentence-composition-scope",
      "sentence-predicate-kind",
      "sentence-force",
      "sentence-polarity",
      "sentence-modifier",
      "contextual-interpretation"
    ]);
    const CLASSICAL_NAHUATL_LESSON12_RULES = Object.freeze([Object.freeze({
      id: "cn-l12-121-state-not-valence",
      section: "12.1",
      transcriptionLineStart: 4379,
      transcriptionLineEnd: 4386,
      exactWitness: "The NNC Formula Contrasted with the VNC Formula.",
      action: "replace-vnc-valence-and-tense-with-nnc-state"
    }), Object.freeze({
      id: "cn-l12-122-absolutive-formula",
      section: "12.2",
      transcriptionLineStart: 4387,
      transcriptionLineEnd: 4393,
      exactWitness: "The Absolutive-State NNC.",
      action: "build-vacant-state-nnc"
    }), Object.freeze({
      id: "cn-l12-123-subject-connectors",
      section: "12.3",
      transcriptionLineStart: 4394,
      transcriptionLineEnd: 4437,
      exactWitness: "The Subject Positions in the Absolutive-State NNC.",
      action: "select-subject-number-connector-by-state-class-and-number"
    }), Object.freeze({
      id: "cn-l12-124-subject-paradigm",
      section: "12.4",
      transcriptionLineStart: 4438,
      transcriptionLineEnd: 4483,
      exactWitness: "Summary of Subject Personal Pronouns in the Absolutive-State NNC",
      action: "build-complete-absolutive-subject-paradigm"
    }), Object.freeze({
      id: "cn-l12-125-nounstem-predicate",
      section: "12.5",
      transcriptionLineStart: 4484,
      transcriptionLineEnd: 4504,
      exactWitness: "The Predicate Position in Absolutive-State NNCs.",
      action: "keep-nounstem-predicate-tenseless-and-indefiniteness-neutral"
    }), Object.freeze({
      id: "cn-l12-126-animacy-number",
      section: "12.6",
      transcriptionLineStart: 4505,
      transcriptionLineEnd: 4560,
      exactWitness: "Animacy in Nounstems.",
      action: "keep-number-in-subject-and-gate-plural-reference-by-animacy"
    }), Object.freeze({
      id: "cn-l12-127-state-restrictions",
      section: "12.7",
      transcriptionLineStart: 4561,
      transcriptionLineEnd: 4571,
      exactWitness: "State and the Nounstem.",
      action: "allow-state-choice-subject-to-lexical-semantic-restrictions"
    })]);
    const CLASSICAL_NAHUATL_LESSON13_RULES = Object.freeze([Object.freeze({
      id: "cn-l13-131-possessive-formulas",
      section: "13.1",
      transcriptionLineStart: 4576,
      transcriptionLineEnd: 4589,
      exactWitness: "The Possessive-State NNC.",
      action: "build-monadic-or-dyadic-possessive-state"
    }), Object.freeze({
      id: "cn-l13-132-possessive-subject-number",
      section: "13.2",
      transcriptionLineStart: 4590,
      transcriptionLineEnd: 4608,
      exactWitness: "The Subject Positions in the Possessive-State Formulas.",
      action: "select-possessive-subject-number-dyad"
    }), Object.freeze({
      id: "cn-l13-133-possessive-subject-paradigm",
      section: "13.3",
      transcriptionLineStart: 4609,
      transcriptionLineEnd: 4626,
      exactWitness: "Summary of Subject Personal Pronouns in the Possessive-State NNC",
      action: "build-complete-possessive-subject-paradigm"
    }), Object.freeze({
      id: "cn-l13-134-monadic-possessor",
      section: "13.4",
      transcriptionLineStart: 4627,
      transcriptionLineEnd: 4647,
      exactWitness: "The Predicate in the Monadic Possessive-State NNC Formula.",
      action: "select-reciprocal-or-nonspecific-possessor"
    }), Object.freeze({
      id: "cn-l13-135-dyadic-possessor",
      section: "13.5",
      transcriptionLineStart: 4648,
      transcriptionLineEnd: 4671,
      exactWitness: "The Predicate in the Dyadic Possessive-State NNC Formula.",
      action: "distribute-specific-possessor-categories-across-st1-st2"
    }), Object.freeze({
      id: "cn-l13-136-specific-possessor-inventory",
      section: "13.6",
      transcriptionLineStart: 4672,
      transcriptionLineEnd: 4696,
      exactWitness: "Summary of the Specific Possessor Personal Pronouns in the Possessive-State NNC",
      action: "realize-specific-possessor-inventory"
    })]);
    const CLASSICAL_NAHUATL_LESSON14_RULES = Object.freeze([Object.freeze({
      id: "cn-l14-141-use-stem-kinds",
      section: "14.1",
      transcriptionLineStart: 4699,
      transcriptionLineEnd: 4705,
      exactWitness: "The restricted-use stem regularly is the citation form",
      action: "select-restricted-or-general-use-stem-by-state"
    }), Object.freeze({
      id: "cn-l14-142-nounstem-classes",
      section: "14.2",
      transcriptionLineStart: 4706,
      transcriptionLineEnd: 4751,
      exactWitness: "Membership in a class is not predictable and must be learned for each stem.",
      action: "keep-lexical-class-authority-distinct-from-form-guidance"
    }), Object.freeze({
      id: "cn-l14-143-affinity-distributive",
      section: "14.3",
      transcriptionLineStart: 4752,
      transcriptionLineEnd: 4824,
      exactWitness: "The Category of Number and Nounstems.",
      action: "derive-affinity-or-distributive-stem-internally-not-as-number"
    }), Object.freeze({
      id: "cn-l14-144-absolutive-common",
      section: "14.4",
      transcriptionLineStart: 4825,
      transcriptionLineEnd: 4838,
      exactWitness: "The Nounstem in Absolutive-State NNCs with a Singular/Common Subject.",
      action: "use-restricted-base-stem-with-absolutive-common-subject"
    }), Object.freeze({
      id: "cn-l14-145-absolutive-plural",
      section: "14.5",
      transcriptionLineStart: 4839,
      transcriptionLineEnd: 4931,
      exactWitness: "The Nounstem in Absolutive-State NNCs with a Plural-Number Subject.",
      action: "select-lexical-plural-stem-formation-and-number-dyad"
    }), Object.freeze({
      id: "cn-l14-146-possessive-plural",
      section: "14.6",
      transcriptionLineStart: 4932,
      transcriptionLineEnd: 4959,
      exactWitness: "Normally, however, the plain stem is used",
      action: "prefer-plain-general-use-stem-with-possessive-plural-subject"
    }), Object.freeze({
      id: "cn-l14-147-possessive-common",
      section: "14.7",
      transcriptionLineStart: 4960,
      transcriptionLineEnd: 5108,
      exactWitness: "The Nounstem in Possessive-State NNCs with a Singular/Common-Number Subject.",
      action: "select-class-subclass-general-use-shape-and-subject-connector"
    }), Object.freeze({
      id: "cn-l14-148-constituent-ambiguity",
      section: "14.8",
      transcriptionLineStart: 5109,
      transcriptionLineEnd: 5153,
      exactWitness: "one must keep one's mind open to alternative solutions",
      action: "preserve-typed-constituent-analyses-without-spelling-collapse"
    })]);
    const CLASSICAL_NAHUATL_LESSON15_RULES = Object.freeze([Object.freeze({
      id: "cn-l15-151a-huan-boundary-assimilation",
      section: "15.1.1",
      transcriptionLineStart: 5158,
      transcriptionLineEnd: 5170,
      exactWitness: "Because of the /w/ in the number dyad hu-ān",
      action: "assimilate-final-voiceless-w-or-n-before-possessive-plural-number-dyad"
    }), Object.freeze({
      id: "cn-l15-151b-possessive-suppletion",
      section: "15.1.2",
      transcriptionLineStart: 5171,
      transcriptionLineEnd: 5211,
      exactWitness: "Certain nouns use a suppletive stem to form a possessive-state NNC",
      action: "substitute-lexically-authorized-possessive-stem"
    }), Object.freeze({
      id: "cn-l15-151c-nonanimate-derived-common",
      section: "15.1.3",
      transcriptionLineStart: 5212,
      transcriptionLineEnd: 5218,
      exactWitness: "a distributive/varietal or an affinity nonanimate stem",
      action: "retain-common-subject-number-with-derived-nonanimate-stem"
    }), Object.freeze({
      id: "cn-l15-151d-possessor-reduplication",
      section: "15.1.4",
      transcriptionLineStart: 5219,
      transcriptionLineEnd: 5221,
      exactWitness: "plurality in a possessive-state NNC is indicated (at times redundantly) by a reduplication of the possessor pronoun",
      action: "reduplicate-typed-possessor-dyad"
    }), Object.freeze({
      id: "cn-l15-151e-secondary-general-use",
      section: "15.1.5",
      transcriptionLineStart: 5222,
      transcriptionLineEnd: 5254,
      exactWitness: "the possessor pronoun tē fuses with a general-use stem",
      action: "downgrade-te-possessive-predicate-to-secondary-general-use-stem"
    }), Object.freeze({
      id: "cn-l15-151f-analogical-restricted-use",
      section: "15.1.6",
      transcriptionLineStart: 5255,
      transcriptionLineEnd: 5274,
      exactWitness: "The possessive-state predicate is downgraded to the rank of a restricted-use stem",
      action: "derive-analogical-tla-restricted-use-stem"
    }), Object.freeze({
      id: "cn-l15-151g-reclassification",
      section: "15.1.7",
      transcriptionLineStart: 5275,
      transcriptionLineEnd: 5285,
      exactWitness: "A Subclass 2-A stem of the tl class may be reclassified as a Subclass 1-A stem",
      action: "reclassify-tl-2a-as-tl-1a-after-ephemeral-i-loss"
    }), Object.freeze({
      id: "cn-l15-151h-basic-possessor",
      section: "15.1.8",
      transcriptionLineStart: 5286,
      transcriptionLineEnd: 5288,
      exactWitness: "the pronominal possessor in the NNC as the nuclear or basic possessor",
      action: "identify-pronominal-possessor-as-nuclear-basic"
    }), Object.freeze({
      id: "cn-l15-152-natural-possession",
      section: "15.2",
      transcriptionLineStart: 5289,
      transcriptionLineEnd: 5335,
      exactWitness: "Naturally Possessed Nounstems.",
      action: "apply-lexical-state-availability-with-metaphorical-override"
    }), Object.freeze({
      id: "cn-l15-153-sentence-structure",
      section: "15.3",
      transcriptionLineStart: 5336,
      transcriptionLineEnd: 5371,
      exactWitness: "NNCs and Sentence Structure.",
      action: "handoff-typed-nnc-to-equative-attributive-or-adverbial-sentence-layer"
    })]);
    const CLASSICAL_NAHUATL_LESSON16_RULES = Object.freeze([Object.freeze({
      id: "cn-l16-161-pronominal-family",
      section: "16.1",
      transcriptionLineStart: 5374,
      transcriptionLineEnd: 5382,
      exactWitness: "Pronominal NNCs.",
      action: "separate-entitive-quantitive-family-and-internal-plural-n-from-subject-number"
    }), Object.freeze({
      id: "cn-l16-162-entitive-subtypes",
      section: "16.2",
      transcriptionLineStart: 5383,
      transcriptionLineEnd: 5384,
      exactWitness: "There are four subtypes of entitive pronominal NNCs",
      action: "select-personal-interrogative-indefinite-or-demonstrative-subtype"
    }), Object.freeze({
      id: "cn-l16-163-personal-pronominal",
      section: "16.3",
      transcriptionLineStart: 5385,
      transcriptionLineEnd: 5492,
      exactWitness: "Personal-pronominal NNCs.",
      action: "build-simple-or-compound-personal-pronominal-nnc"
    }), Object.freeze({
      id: "cn-l16-164-identificational-interrogative",
      section: "16.4",
      transcriptionLineStart: 5493,
      transcriptionLineEnd: 5563,
      exactWitness: "Interrogative Pronominal NNCs.",
      action: "build-identificational-interrogative-and-contextual-noninterrogative-readings"
    }), Object.freeze({
      id: "cn-l16-1643-ca-tlein-plural",
      section: "16.4.3",
      transcriptionLineStart: 5525,
      transcriptionLineEnd: 5535,
      exactWitness: "cātleimeh? = which ones are they?",
      action: "realize-final-in-as-i-before-fixed-m-eh-plural-dyad"
    }), Object.freeze({
      id: "cn-l16-165-demonstrative",
      section: "16.5",
      transcriptionLineStart: 5564,
      transcriptionLineEnd: 5584,
      exactWitness: "There are two demonstrative pronominal NNCs.",
      action: "build-invariant-third-person-demonstrative-nnc"
    }), Object.freeze({
      id: "cn-l16-166-indefinite",
      section: "16.6",
      transcriptionLineStart: 5585,
      transcriptionLineEnd: 5607,
      exactWitness: "There are two indefinite pronominal nounstems",
      action: "build-ah-matrix-indefinite-pronominal-nnc"
    }), Object.freeze({
      id: "cn-l16-167-quantitive-matrices",
      section: "16.7",
      transcriptionLineStart: 5608,
      transcriptionLineEnd: 5633,
      exactWitness: "Quantitive Pronominal NNCs.",
      action: "select-typed-quantitive-embed-matrix-and-allomorph"
    }), Object.freeze({
      id: "cn-l16-168-quich-family",
      section: "16.8",
      transcriptionLineStart: 5634,
      transcriptionLineEnd: 5673,
      exactWitness: "Quantitive Pronominal NNCs Formed on Compound Stems Ending in (-qui-ch)-Ø-.",
      action: "build-plain-plural-quich-quantitive-family"
    }), Object.freeze({
      id: "cn-l16-169-qui-chi-family",
      section: "16.9",
      transcriptionLineStart: 5674,
      transcriptionLineEnd: 5761,
      exactWitness: "Quantitive Pronominal NNCs Formed on Compound Stems Ending in (-qui)-⎕- or",
      action: "build-internal-n-qui-or-chi-quantitive-family-with-number-variants"
    })]);
    const CLASSICAL_NAHUATL_NNC_OPERATION_CONTRACT_OWNER = createGrammarOperationContractOwner({
      ownerId: "classical-nnc",
      domain: "classical-nnc",
    });
    const CLASSICAL_NAHUATL_NNC_OPERATION_CONTRACTS = Object.freeze([
      CLASSICAL_NAHUATL_NNC_OPERATION_CONTRACT_OWNER.buildContract({
        operationId: "nnc-clause-shell",
        domain: "classical-nnc",
        operationType: "establish",
        consumesFrameKinds: ["classical-nahuatl-nuclear-clause-structure-result"],
        producesFrameKind: "classical-nahuatl-nnc-slot-frame",
        effectScopes: ["nuclear-clause", "subject", "predicate", "number"],
        authorityRefs: ["cn-l12-121-state-not-valence", "cn-l12-122-absolutive-formula", "cn-l13-131-possessive-formulas"],
        description: "Establish the shared NNC shell with State in the predicate and no tense slot."
      }),
      CLASSICAL_NAHUATL_NNC_OPERATION_CONTRACT_OWNER.buildContract({
        operationId: "nnc-absolutive-state",
        domain: "classical-nnc",
        operationType: "select",
        consumesFrameKinds: ["classical-nahuatl-nnc-slot-frame"],
        producesFrameKind: "classical-nahuatl-nnc-slot-frame",
        prerequisites: ["nnc-clause-shell"],
        effectScopes: ["predicate.state", "subject.number"],
        outputKinds: ["selected-absolutive-nnc-formula"],
        authorityRefs: ["cn-l12-122-absolutive-formula", "cn-l12-123-subject-connectors"],
        description: "Select vacant absolutive State and its subject-number behavior."
      }),
      CLASSICAL_NAHUATL_NNC_OPERATION_CONTRACT_OWNER.buildContract({
        operationId: "nnc-possessive-state",
        domain: "classical-nnc",
        operationType: "select",
        consumesFrameKinds: ["classical-nahuatl-nnc-slot-frame"],
        producesFrameKind: "classical-nahuatl-nnc-slot-frame",
        prerequisites: ["nnc-clause-shell"],
        effectScopes: ["predicate.state", "predicate.possessor", "subject.number"],
        outputKinds: ["selected-possessive-nnc-formula"],
        authorityRefs: ["cn-l13-131-possessive-formulas"],
        description: "Select monadic or dyadic possessive State independently of curriculum order."
      }),
      CLASSICAL_NAHUATL_NNC_OPERATION_CONTRACT_OWNER.buildContract({
        operationId: "nnc-nounstem-selection",
        domain: "classical-nnc",
        operationType: "select",
        consumesFrameKinds: ["classical-nahuatl-nnc-slot-frame"],
        producesFrameKind: "classical-nahuatl-nnc-slot-frame",
        prerequisites: ["nnc-clause-shell"],
        effectScopes: ["predicate.stem", "subject.number"],
        outputKinds: ["selected-class-governed-nnc-formula"],
        authorityRefs: ["cn-l14-141-use-stem-kinds", "cn-l14-142-nounstem-classes"],
        description: "Select nounstem class, use-stem shape, and class-governed connectors."
      }),
      CLASSICAL_NAHUATL_NNC_OPERATION_CONTRACT_OWNER.buildContract({
        operationId: "nnc-derived-stem-relation",
        domain: "classical-nnc",
        operationType: "transform",
        consumesFrameKinds: ["classical-nahuatl-nnc-slot-frame"],
        producesFrameKind: "classical-nahuatl-nnc-slot-frame",
        prerequisites: ["nnc-nounstem-selection"],
        effectScopes: ["predicate.stem"],
        outputKinds: ["selected-class-governed-nnc-formula"],
        authorityRefs: ["cn-l14-143-affinity-distributive"],
        description: "Apply an authorized affinity or distributive nounstem relation."
      }),
      CLASSICAL_NAHUATL_NNC_OPERATION_CONTRACT_OWNER.buildContract({
        operationId: "nnc-constituent-analysis",
        domain: "classical-nnc",
        operationType: "select",
        consumesFrameKinds: ["classical-nahuatl-nnc-slot-frame"],
        producesFrameKind: "classical-nahuatl-nnc-slot-frame",
        prerequisites: ["nnc-nounstem-selection"],
        effectScopes: ["predicate.stem", "predicate.state", "subject.number"],
        outputKinds: ["selected-class-governed-nnc-formula"],
        authorityRefs: ["cn-l14-148-constituent-ambiguity"],
        description: "Select an explicit typed constituent analysis when the source is ambiguous."
      }),
      CLASSICAL_NAHUATL_NNC_OPERATION_CONTRACT_OWNER.buildContract({
        operationId: "nnc-ordinary-conditions",
        domain: "classical-nnc",
        operationType: "transform",
        consumesFrameKinds: ["classical-nahuatl-nnc-slot-frame"],
        producesFrameKind: "classical-nahuatl-nnc-slot-frame",
        prerequisites: ["nnc-nounstem-selection"],
        effectScopes: ["predicate.stem", "predicate.state", "subject.number"],
        outputKinds: ["selected-ordinary-nnc-formula"],
        authorityRefs: ["cn-l15-151a-huan-boundary-assimilation", "cn-l15-152-natural-possession"],
        description: "Apply ordinary-NNC possession, assimilation, and conditioned stem behavior."
      }),
      CLASSICAL_NAHUATL_NNC_OPERATION_CONTRACT_OWNER.buildContract({
        operationId: "nnc-pronominal-family",
        domain: "classical-nnc",
        operationType: "select",
        consumesFrameKinds: ["classical-nahuatl-nnc-slot-frame"],
        producesFrameKind: "classical-nahuatl-nnc-slot-frame",
        prerequisites: ["nnc-clause-shell"],
        effectScopes: ["predicate.stem", "subject", "subject.number"],
        outputKinds: ["selected-pronominal-nnc-formula"],
        authorityRefs: ["cn-l16-161-pronominal-family"],
        description: "Select a pronominal NNC family and its internal number behavior."
      }),
      CLASSICAL_NAHUATL_NNC_OPERATION_CONTRACT_OWNER.buildContract({
        operationId: "nnc-sentence-composition",
        domain: "classical-nnc",
        operationType: "compose",
        consumesFrameKinds: ["classical-nahuatl-nnc-slot-frame"],
        producesFrameKind: "classical-nahuatl-nnc-sentence-surface-frame",
        prerequisites: ["nnc-clause-shell"],
        effectScopes: ["sentence.force", "sentence.polarity", "sentence.boundary"],
        outputKinds: ["selected-nnc-sentence-surface"],
        authorityRefs: ["cn-l15-153-sentence-structure", "cn-l16-164-identificational-interrogative"],
        description: "Compose a complete typed NNC into a sentence without making the NNC itself provisional."
      })
    ]);
    function getClassicalNahuatlNncRuntimeTarget() {
      return typeof targetObject !== "undefined" && targetObject || (typeof globalThis !== "undefined" ? globalThis : null);
    }
    function buildClassicalNahuatlNncNuclearClauseResult(
      stem = "",
      stateArity = "",
    ) {
      const runtimeTarget = getClassicalNahuatlNncRuntimeTarget();
      if (
        typeof runtimeTarget?.buildClassicalNahuatlNuclearClauseResult
          !== "function"
        || typeof runtimeTarget?.isClassicalNahuatlNuclearClauseResult
          !== "function"
      ) {
        return null;
      }
      let result = null;
      try {
        result = runtimeTarget.buildClassicalNahuatlNuclearClauseResult(stem, {
          clauseKind: "nominal-nuclear-clause",
          stateArity,
        });
      } catch {
        return null;
      }
      return (
        runtimeTarget.isClassicalNahuatlNuclearClauseResult(result)
        && result.clauseKind === "nominal-nuclear-clause"
        && result.slotArity === stateArity
      )
        ? result
        : null;
    }
    function cloneClassicalNahuatlNncValue(value) {
      if (Array.isArray(value)) {
        return value.map(cloneClassicalNahuatlNncValue);
      }
      if (!value || typeof value !== "object") {
        return value;
      }
      return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, cloneClassicalNahuatlNncValue(entry)]));
    }
    function normalizeClassicalNahuatlNncToken(value = "") {
      return String(value == null ? "" : value).trim();
    }
    function normalizeClassicalNahuatlNncStem(value = "") {
      return normalizeClassicalNahuatlNncToken(value).replace(/^\((.*)\)$/u, "$1").trim();
    }
    function normalizeClassicalNahuatlNncSubject(value = "3sg") {
      const key = normalizeClassicalNahuatlNncToken(value || "3sg").toLowerCase().replace(/[\s_-]/gu, "");
      const aliases = {
        "1": "1sg",
        "1s": "1sg",
        "1sg": "1sg",
        firstsingular: "1sg",
        "2": "2sg",
        "2s": "2sg",
        "2sg": "2sg",
        secondsingular: "2sg",
        "3": "3sg",
        "3s": "3sg",
        "3sg": "3sg",
        thirdsingular: "3sg",
        common: "3common",
        "3common": "3common",
        thirdcommon: "3common",
        "1p": "1pl",
        "1pl": "1pl",
        firstplural: "1pl",
        "2p": "2pl",
        "2pl": "2pl",
        secondplural: "2pl",
        "3p": "3pl",
        "3pl": "3pl",
        thirdplural: "3pl"
      };
      return aliases[key] || "";
    }
    function normalizeClassicalNahuatlNounClass(value = "") {
      return typeof targetObject.normalizeOrdinaryNncNounClass === "function"
        ? targetObject.normalizeOrdinaryNncNounClass(value)
        : "";
    }
    function getClassicalNahuatlNncFirstSound(value = "") {
      const normalized = normalizeClassicalNahuatlNncToken(value).normalize("NFD").replace(/[\u0300-\u036f]/gu, "").toLowerCase();
      const match = normalized.match(/[a-z]/u);
      return match ? match[0] : "";
    }
    function getClassicalNahuatlNncLastSound(value = "") {
      const normalized = normalizeClassicalNahuatlNncToken(value).normalize("NFD").replace(/[\u0300-\u036f]/gu, "").toLowerCase();
      const matches = normalized.match(/[a-z]/gu);
      return matches?.length ? matches[matches.length - 1] : "";
    }
    function isClassicalNahuatlNncVowelSound(value = "") {
      return /^[aeio]$/u.test(normalizeClassicalNahuatlNncToken(value).toLowerCase());
    }
    function resolveClassicalNahuatlThirdPluralPossessorSt2(stem = "") {
      const normalizedStem = normalizeClassicalNahuatlNncStem(stem);
      const followingSound = getClassicalNahuatlNncFirstSound(normalizedStem);
      const mEnvironment = isClassicalNahuatlNncVowelSound(followingSound) || ["m", "p"].includes(followingSound);
      const authorized = Boolean(followingSound);
      return {
        kind: "classical-nahuatl-third-plural-possessor-st2-canvas-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized ? "" : "third-plural-possessor-st2-following-sound-required",
        stem: normalizedStem,
        followingSound,
        st2: authorized ? mEnvironment ? "m" : "n" : "",
        selectionRule: authorized ? mEnvironment ? "lesson13-st2-m-before-vowel-m-or-p" : "lesson13-st2-n-outside-m-environment" : "",
        userSelectionAuthority: false,
        sourceSubsetAuthority: false,
        formulaStringAuthority: false,
        legalWitnessTagIds: ["cn-l13-135-dyadic-possessor", "cn-l13-136-specific-possessor-inventory", "cn-l2-211-regressive-m-partial"]
      };
    }
    function getClassicalNahuatlAbsolutiveNncRules() {
      return CLASSICAL_NAHUATL_LESSON12_RULES.map(cloneClassicalNahuatlNncValue);
    }
    function getClassicalNahuatlPossessiveNncRules() {
      return CLASSICAL_NAHUATL_LESSON13_RULES.map(cloneClassicalNahuatlNncValue);
    }
    function getClassicalNahuatlNounstemRules() {
      return CLASSICAL_NAHUATL_LESSON14_RULES.map(cloneClassicalNahuatlNncValue);
    }
    function getClassicalNahuatlOrdinaryNncRules() {
      return CLASSICAL_NAHUATL_LESSON15_RULES.map(cloneClassicalNahuatlNncValue);
    }
    function getClassicalNahuatlPronominalNncRules() {
      return CLASSICAL_NAHUATL_LESSON16_RULES.map(cloneClassicalNahuatlNncValue);
    }
    function getClassicalNahuatlNncOperationContracts() {
      return CLASSICAL_NAHUATL_NNC_OPERATION_CONTRACTS.map(cloneClassicalNahuatlNncValue);
    }
    function normalizeClassicalNahuatlUseShape(value = "base") {
      const key = normalizeClassicalNahuatlNncToken(value || "base").toLowerCase().replace(/[\s_-]/gu, "");
      return {
        base: "base",
        truncated: "truncated",
        glottalized: "glottalized"
      }[key] || "";
    }
    function normalizeClassicalNahuatlStemFormation(value = "plain") {
      const key = normalizeClassicalNahuatlNncToken(value || "plain").toLowerCase().replace(/[\s_/]/gu, "-");
      const aliases = {
        plain: "plain",
        affinity: "affinity",
        distributive: "distributive-varietal",
        varietal: "distributive-varietal",
        "distributive-varietal": "distributive-varietal"
      };
      return aliases[key] || "";
    }
    function getClassicalNahuatlInitialVowelFrame(sourceStem = "") {
      const stem = normalizeClassicalNahuatlNncStem(sourceStem);
      const match = stem.match(/[aeioāēīō]/iu);
      if (!match || typeof match.index !== "number") {
        return {
          kind: "classical-nahuatl-nounstem-initial-vowel-frame",
          authorizationStatus: "blocked",
          blockReason: "lesson14-derived-stem-source-initial-vowel-required",
          sourceStem: stem,
          onset: "",
          vowel: ""
        };
      }
      const vowel = match[0].toLowerCase();
      return {
        kind: "classical-nahuatl-nounstem-initial-vowel-frame",
        authorizationStatus: "authorized",
        blockReason: "",
        sourceStem: stem,
        onset: stem.slice(0, match.index),
        vowel,
        vowelIsLong: /[āēīō]/u.test(vowel),
        initialISurface: vowel === "i" || vowel === "ī",
        supportiveInitialITreatedAsRealVowel: vowel === "i" || vowel === "ī"
      };
    }
    function getClassicalNahuatlLongVowel(vowel = "") {
      return {
        a: "ā",
        ā: "ā",
        e: "ē",
        ē: "ē",
        i: "ī",
        ī: "ī",
        o: "ō",
        ō: "ō"
      }[normalizeClassicalNahuatlNncToken(vowel).toLowerCase()] || "";
    }
    function getClassicalNahuatlShortVowel(vowel = "") {
      return {
        a: "a",
        ā: "a",
        e: "e",
        ē: "e",
        i: "i",
        ī: "i",
        o: "o",
        ō: "o"
      }[normalizeClassicalNahuatlNncToken(vowel).toLowerCase()] || "";
    }
    function deriveClassicalNahuatlStem(sourceStem = "", formation = "plain") {
      const stem = normalizeClassicalNahuatlNncStem(sourceStem);
      const normalizedFormation = normalizeClassicalNahuatlStemFormation(formation);
      const initialVowelFrame = getClassicalNahuatlInitialVowelFrame(stem);
      if (!stem || !normalizedFormation) {
        return {
          kind: "classical-nahuatl-nounstem-stem-derivation-operation",
          authorizationStatus: "blocked",
          blockReason: !stem ? "lesson14-derived-stem-source-required" : "unknown-nounstem-formation",
          sourceStem: stem,
          stemFormation: normalizedFormation,
          derivedStem: "",
          initialVowelFrame
        };
      }
      if (normalizedFormation === "plain") {
        return {
          kind: "classical-nahuatl-nounstem-stem-derivation-operation",
          authorizationStatus: "authorized",
          blockReason: "",
          operationId: "nnc-nounstem-relation-plain-identity",
          sourceStem: stem,
          stemFormation: normalizedFormation,
          reduplicativePrefix: "",
          derivedStem: stem,
          initialVowelFrame,
          sourceStemPreserved: true
        };
      }
      if (initialVowelFrame.authorizationStatus !== "authorized") {
        return {
          kind: "classical-nahuatl-nounstem-stem-derivation-operation",
          authorizationStatus: "blocked",
          blockReason: initialVowelFrame.blockReason,
          sourceStem: stem,
          stemFormation: normalizedFormation,
          derivedStem: "",
          initialVowelFrame
        };
      }
      const reduplicativeVowel = normalizedFormation === "affinity" ? getClassicalNahuatlLongVowel(initialVowelFrame.vowel) : getClassicalNahuatlShortVowel(initialVowelFrame.vowel);
      const reduplicativePrefix = `${initialVowelFrame.onset}${reduplicativeVowel}${normalizedFormation === "distributive-varietal" ? "h" : ""}`;
      return {
        kind: "classical-nahuatl-nounstem-stem-derivation-operation",
        authorizationStatus: reduplicativePrefix ? "authorized" : "blocked",
        blockReason: reduplicativePrefix ? "" : "lesson14-reduplicative-prefix-could-not-be-derived",
        operationId: normalizedFormation === "affinity" ? "nnc-add-long-vowel-affinity-reduplicative-prefix" : "nnc-add-glottal-stop-distributive-varietal-reduplicative-prefix",
        sourceStem: stem,
        stemFormation: normalizedFormation,
        reduplicativePrefix,
        derivedStem: reduplicativePrefix ? `${reduplicativePrefix}-${stem}` : "",
        initialVowelFrame,
        sourceStemPreserved: true,
        supportiveInitialIKeptInSource: initialVowelFrame.initialISurface === true,
        supportiveInitialIReduplicatedAsSupportive: initialVowelFrame.initialISurface === true,
        derivationPosition: "inside-predicate-stem",
        formulaSlotDelta: 0,
        subjectNumberChanged: false,
        grammaticalNumberValue: "none",
        animateNonanimateDistinctionPreserved: true,
        legalWitnessTagIds: ["cn-l14-143-affinity-distributive"]
      };
    }
    function getClassicalNahuatlClassFormGuidance(stem = "") {
      const normalizedStem = normalizeClassicalNahuatlNncStem(stem);
      const finalSound = getClassicalNahuatlNncLastSound(normalizedStem);
      const endsInVowel = isClassicalNahuatlNncVowelSound(finalSound);
      return {
        kind: "classical-nahuatl-nounstem-class-form-guidance-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        stem: normalizedStem,
        finalSound,
        endsInVowel,
        candidateClasses: endsInVowel ? ["tl", "zero"] : ["tli", "in", "zero"],
        classAuthorized: false,
        candidateStatus: "guidance-only",
        lexicalSelectionRequired: true,
        rule: "form-constrains-candidates-but-does-not-predict-class-membership",
        legalWitnessTagIds: ["cn-l14-142-nounstem-classes"]
      };
    }
    function buildClassicalNahuatlSupportiveIRepairFrame(deletedStem = "") {
      const sourceStem = normalizeClassicalNahuatlNncStem(deletedStem);
      const finalSound = getClassicalNahuatlNncLastSound(sourceStem);
      const finalPhoneme = finalSound === "c" ? "/k/" : "";
      const runtimeTarget = getClassicalNahuatlNncRuntimeTarget();
      const openTransitionBuilder =
        runtimeTarget?.buildClassicalNahuatlOpenTransitionFrame;
      const openTransitionValidator =
        runtimeTarget?.isClassicalNahuatlTranscriptionAnalysisFrame;
      const supportiveIFrame = typeof openTransitionBuilder === "function" ? openTransitionBuilder({
        boundaryType: "internal-open-transition",
        stemFinalPhoneme: finalPhoneme,
        stemInitialSupportiveI: true
      }) : null;
      const kBeforeIFrame = finalPhoneme === "/k/" && typeof openTransitionBuilder === "function" ? openTransitionBuilder({
        boundaryType: "internal-open-transition",
        stemFinalPhoneme: "/k/",
        followingVowel: "i"
      }) : null;
      const supportiveIAuthorized = typeof openTransitionValidator === "function"
        && openTransitionValidator(supportiveIFrame)
        && supportiveIFrame.authorizationStatus === "authorized"
        && supportiveIFrame.outputSpelling === "i";
      const kBeforeIAuthorized = finalPhoneme !== "/k/" || typeof openTransitionValidator === "function"
        && openTransitionValidator(kBeforeIFrame)
        && kBeforeIFrame.authorizationStatus === "authorized"
        && kBeforeIFrame.outputSpelling === "qu";
      const authorized = Boolean(sourceStem && supportiveIAuthorized && kBeforeIAuthorized);
      const realizedStem = authorized ? finalPhoneme === "/k/" ? `${sourceStem.slice(0, -1)}${kBeforeIFrame.outputSpelling}${supportiveIFrame.outputSpelling}` : `${sourceStem}${supportiveIFrame.outputSpelling}` : "";
      return {
        kind: "classical-nahuatl-nounstem-supportive-i-repair-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized ? "" : !sourceStem ? "deleted-ephemeral-vowel-stem-required" : !supportiveIAuthorized ? "lesson2-supportive-i-authorization-required" : "lesson2-k-before-i-spelling-authorization-required",
        sourceStem,
        finalSound,
        finalPhoneme,
        supportiveVowel: "i",
        supportiveIFrame,
        kBeforeIFrame,
        orderedRuleIds: [supportiveIFrame?.selectedRuleId, ...(finalPhoneme === "/k/" ? [kBeforeIFrame?.selectedRuleId] : [])].filter(Boolean),
        realizedStem,
        stringConcatenationAuthority: false,
        legalWitnessTagIds: finalPhoneme === "/k/" ? ["cn-l2-25-supportive-i-kept", "cn-l2-25-stem-final-k-before-e-i-qu"] : ["cn-l2-25-supportive-i-kept"]
      };
    }
    function buildClassicalNahuatlGlottalizedGeneralUseFrame(restrictedUseStem = "", options = {}) {
      const restrictedStem = normalizeClassicalNahuatlNncStem(restrictedUseStem);
      const finalVowel = restrictedStem.slice(-1).toLowerCase();
      const shortVowel = getClassicalNahuatlShortVowel(finalVowel);
      const longFinalVowel = /[āēīō]/u.test(finalVowel);
      const matrixMorpheme = normalizeClassicalNahuatlNncStem(options.matrixMorpheme || "");
      const transcriptionBuilder = getClassicalNahuatlNncRuntimeTarget()
        ?.buildClassicalNahuatlLongVowelGlottalFrame;
      const transcriptionFrame = typeof transcriptionBuilder === "function"
        ? transcriptionBuilder({
          morpheme: restrictedStem,
          compoundSubposition: "embed",
          matrixMorpheme
        })
        : null;
      const suppliedStem = normalizeClassicalNahuatlNncStem(options.glottalizedStem || "");
      const derivedStem = transcriptionFrame?.outputForm || "";
      const authorized = Boolean(
        restrictedStem
        && matrixMorpheme
        && options.lexicallyGlottalizable === true
        && transcriptionFrame?.authorizationStatus === "authorized"
        && derivedStem
        && (!suppliedStem || suppliedStem === derivedStem)
      );
      return {
        kind: "classical-nahuatl-nounstem-glottalized-general-use-frame",
        version: 1,
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized
          ? ""
          : !restrictedStem
            ? "restricted-use-stem-required"
            : !options.lexicallyGlottalizable
              ? "typed-lexical-glottalized-shape-authorization-required"
              : !matrixMorpheme
                ? "compound-matrix-morpheme-required"
                : !longFinalVowel
                  ? "glottalized-shape-requires-restricted-stem-final-long-vowel"
                  : suppliedStem && suppliedStem !== derivedStem
                    ? "supplied-glottalized-stem-contradicts-canvas-rule-derivation"
                  : transcriptionFrame?.blockReason || "transcription-glottalized-embed-operation-required",
        operationId: "nnc-select-glottalized-general-use-compound-embed",
        restrictedUseStem: restrictedStem,
        generalUseStem: authorized ? derivedStem : "",
        finalLongVowel: longFinalVowel ? finalVowel : "",
        replacement: authorized ? `${shortVowel}h` : "",
        usageEnvironment: "compound-embed",
        matrixMorpheme,
        matrixDeterminesChoice: Boolean(matrixMorpheme),
        transcriptionLongVowelGlottalFrame: transcriptionFrame,
        suppliedStemIsAuthority: false,
        formulaSlotDelta: 0,
        legalWitnessTagIds: ["cn-l14-142-nounstem-classes", "cn-l2-215-irregular-short-vowel-glottal-morph"]
      };
    }
    function tokenizeClassicalNahuatlLesson14StemSegments(stem = "") {
      const solidStem = normalizeClassicalNahuatlNncStem(stem)
        .toLowerCase()
        .replace(/-/gu, "");
      return solidStem.match(/(?:ch|cu|hu|qu|tl|tz|[āēīōaeiou]|[bcdfghjklmnpqrstvwxyz])/gu) || [];
    }
    function validateClassicalNahuatlSubclassSourceShape(
      restrictedUseStem = "",
      options = {}
    ) {
      const restrictedStem = normalizeClassicalNahuatlNncStem(restrictedUseStem);
      const nounClass = normalizeClassicalNahuatlNounClass(
        options.nounClass || options.class || ""
      );
      const tlSubclass = normalizeClassicalNahuatlSubclass(
        options.tlSubclass || options.subclass || ""
      );
      const generalUseShape = normalizeClassicalNahuatlUseShape(
        options.generalUseShape || options.useShape || "base"
      );
      const segments = tokenizeClassicalNahuatlLesson14StemSegments(restrictedStem);
      const finalVowel = segments.at(-1) || "";
      const precedingSegment = segments.at(-2) || "";
      const precedingPrecedingSegment = segments.at(-3) || "";
      const consonant = value => Boolean(value && !/^[āēīōaeiou]$/u.test(value));
      const compoundSource = options.compoundStem === true
        || options.sourceStructure === "compound"
        || restrictedStem.includes("-");
      let conditionId = "not-applicable";
      let authorized = true;
      let blockReason = "";
      if (generalUseShape === "truncated") {
        if (nounClass !== "tl") {
          authorized = false;
          blockReason = "truncated-general-use-shape-requires-tl-class";
        } else if (!["2A", "2B", "2C"].includes(tlSubclass)) {
          authorized = false;
          blockReason = "truncated-general-use-shape-requires-tl-subclass2-analysis";
        } else if (tlSubclass === "2A") {
          conditionId = "tl-2a-final-i-after-long-a-or-e";
          authorized = finalVowel === "i" && ["ā", "ē"].includes(precedingSegment);
          blockReason = authorized ? "" : "tl-subclass2a-requires-final-i-after-long-a-or-e";
        } else if (tlSubclass === "2B") {
          conditionId = "tl-2b-final-a-or-i-after-one-consonant";
          authorized = ["a", "i"].includes(finalVowel)
            && consonant(precedingSegment)
            && !consonant(precedingPrecedingSegment);
          blockReason = authorized ? "" : "tl-subclass2b-requires-final-a-or-i-after-one-consonant";
        } else {
          conditionId = "tl-2c-final-a-after-cluster-plus-supportive-i";
          authorized = finalVowel === "a"
            && ["c", "qu", "tl"].includes(precedingSegment)
            && consonant(precedingPrecedingSegment)
            && compoundSource
            && normalizeClassicalNahuatlNncToken(options.truncationRepair)
              .toLowerCase() === "supportive-i";
          blockReason = authorized
            ? ""
            : !compoundSource
              ? "tl-subclass2c-requires-typed-compound-source-analysis"
              : "tl-subclass2c-requires-final-a-after-consonant-cluster-ending-in-k-or-tl-and-supportive-i";
        }
      }
      return {
        kind: "classical-nahuatl-nounstem-subclass-source-shape-frame",
        version: 1,
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason,
        restrictedUseStem: restrictedStem,
        nounClass,
        tlSubclass,
        generalUseShape,
        conditionId,
        segments,
        finalVowel,
        precedingSegment,
        precedingPrecedingSegment,
        compoundSource,
        formulaStringAuthority: false,
        displayTextAuthority: false,
        legalWitnessTagIds: ["cn-l14-147-possessive-common"]
      };
    }
    function buildClassicalNahuatlLexicalSelectionRecord(restrictedUseStem = "", options = {}) {
      const restrictedStem = normalizeClassicalNahuatlNncStem(restrictedUseStem);
      const selectionAuthority = normalizeClassicalNahuatlNncToken(
        options.selectionAuthority || options.classSelectionAuthority || ""
      ).toLowerCase();
      const nounClass = normalizeClassicalNahuatlNounClass(
        options.nounClass || options.class || ""
      );
      const classMembershipOptions = Array.from(new Set(
        (Array.isArray(options.classMembershipOptions)
          ? options.classMembershipOptions
          : [nounClass])
          .map(normalizeClassicalNahuatlNounClass)
          .filter(Boolean)
      ));
      const stemFormation = normalizeClassicalNahuatlStemFormation(
        options.stemFormation || "plain"
      );
      const pluralStemFormationOptions = Array.from(new Set(
        (Array.isArray(options.pluralStemFormationOptions)
          ? options.pluralStemFormationOptions
          : [stemFormation])
          .map(normalizeClassicalNahuatlStemFormation)
          .filter(Boolean)
      ));
      const selectedPluralConnector = normalizeClassicalNahuatlNncToken(
        options.pluralConnector || ""
      ).toLowerCase().replace(/ø/gu, "0");
      const pluralConnectorOptions = Array.from(new Set(
        (Array.isArray(options.pluralConnectorOptions)
          ? options.pluralConnectorOptions
          : selectedPluralConnector ? [selectedPluralConnector] : [])
          .map(value => normalizeClassicalNahuatlNncToken(value).toLowerCase().replace(/ø/gu, "0"))
          .filter(value => ["t-in", "m-eh", "0-h"].includes(value))
      ));
      const sourcePlainPluralConnector = normalizeClassicalNahuatlNncToken(
        options.sourcePlainPluralConnector || ""
      ).toLowerCase().replace(/ø/gu, "0");
      const supportiveInitialI = options.supportiveInitialI === true;
      const selectedInitialVariant = normalizeClassicalNahuatlNncToken(
        options.selectedInitialVariant || "retained"
      ).toLowerCase();
      const initialIEligible = /^[iī]/u.test(restrictedStem);
      const supportiveInitialVariant = supportiveInitialI && initialIEligible
        ? restrictedStem.slice(1)
        : "";
      const classGuidance = getClassicalNahuatlClassFormGuidance(restrictedStem);
      const classAlternativesCompatible = classMembershipOptions.every(value => (
        classGuidance.candidateClasses.includes(value)
      ));
      const pluralStemFormationRequirement = normalizeClassicalNahuatlNncToken(
        options.pluralStemFormationRequirement || "allowed"
      ).toLowerCase();
      const requestedPreferredPluralStemFormation = normalizeClassicalNahuatlNncToken(
        options.preferredPluralStemFormation || ""
      );
      const preferredPluralStemFormation = requestedPreferredPluralStemFormation
        ? normalizeClassicalNahuatlStemFormation(
          requestedPreferredPluralStemFormation
        )
        : "";
      const preferredPluralConnector = normalizeClassicalNahuatlNncToken(
        options.preferredPluralConnector || ""
      ).toLowerCase().replace(/ø/gu, "0");
      const preferencesLicensed = (
        !preferredPluralStemFormation
        || pluralStemFormationOptions.includes(preferredPluralStemFormation)
      ) && (
        !preferredPluralConnector
        || pluralConnectorOptions.includes(preferredPluralConnector)
      );
      const silentAlternativeCompatible = options.tliSubclass2SilentNum1Authorized !== true
        || nounClass === "tli";
      const authorized = Boolean(
        restrictedStem
        && [
          "canonical-lexical-inventory",
          "user-selection",
          "external-lexical-record",
          "user-supplied-lexical-analysis",
        ].includes(selectionAuthority)
        && nounClass
        && classMembershipOptions.includes(nounClass)
        && classAlternativesCompatible
        && stemFormation
        && pluralStemFormationOptions.includes(stemFormation)
        && ["allowed", "required"].includes(pluralStemFormationRequirement)
        && pluralStemFormationOptions.length <= 3
        && pluralConnectorOptions.length <= 3
        && preferencesLicensed
        && silentAlternativeCompatible
        && ["retained", "omitted"].includes(selectedInitialVariant)
        && (selectedInitialVariant !== "omitted" || supportiveInitialVariant)
      );
      return {
        kind: "classical-nahuatl-nounstem-lexical-selection-record",
        version: 1,
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized
          ? ""
          : !restrictedStem
            ? "restricted-use-stem-required"
            : !selectionAuthority
              ? "lesson14-lexical-selection-authority-required"
              : !nounClass
                ? "lexical-noun-class-selection-required"
                : !classMembershipOptions.includes(nounClass)
                  ? "selected-class-not-in-typed-lexical-alternatives"
                  : !classAlternativesCompatible
                    ? "typed-class-alternative-contradicts-canvas-form-constraint"
                    : !pluralStemFormationOptions.includes(stemFormation)
                      ? "selected-stem-formation-not-in-typed-lexical-alternatives"
                      : !["allowed", "required"].includes(pluralStemFormationRequirement)
                        ? "unknown-plural-stem-formation-requirement"
                        : !preferencesLicensed
                          ? "preferred-lesson14-alternative-must-be-licensed"
                          : !silentAlternativeCompatible
                            ? "silent-num1-alternative-requires-tli-class"
                            : "supportive-initial-i-variant-not-lexically-authorized",
        restrictedUseStem: restrictedStem,
        nounClass,
        classMembershipOptions,
        alternativeClassMembership: classMembershipOptions.length > 1,
        stemFormation,
        pluralStemFormationOptions,
        pluralStemFormationRequirement,
        preferredPluralStemFormation,
        pluralConnectorOptions,
        preferredPluralConnector,
        sourcePlainPluralConnector,
        affinityConnectorExceptionAuthorized: options.affinityConnectorExceptionAuthorized === true,
        possessivePluralDerivedSemanticNeed: options.possessivePluralDerivedSemanticNeed === true,
        tliSubclass2SilentNum1Authorized: options.tliSubclass2SilentNum1Authorized === true,
        supportiveInitialI,
        supportiveInitialVariant,
        selectedInitialVariant,
        selectedRestrictedUseStem: selectedInitialVariant === "omitted"
          ? supportiveInitialVariant
          : restrictedStem,
        glottalizedGeneralUseEligible: options.glottalizedGeneralUseEligible === true,
        selectionAuthority,
        formulaStringAuthority: false,
        displayTextAuthority: false,
        legalWitnessTagIds: [
          "cn-l14-141-use-stem-kinds",
          "cn-l14-142-nounstem-classes",
          "cn-l14-145-absolutive-plural",
          "cn-l14-146-possessive-plural",
          "cn-l14-147-possessive-common"
        ]
      };
    }
    function isClassicalNahuatlLexicalSelectionRecord(record = null) {
      return Boolean(
        record
        && record.kind === "classical-nahuatl-nounstem-lexical-selection-record"
        && record.version === 1
        && record.authorizationStatus === "authorized"
        && record.sourceDocument === CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT
        && record.restrictedUseStem
        && record.nounClass
        && Array.isArray(record.classMembershipOptions)
        && record.classMembershipOptions.includes(record.nounClass)
        && record.classMembershipOptions.every(value => (
          getClassicalNahuatlClassFormGuidance(record.restrictedUseStem)
            .candidateClasses.includes(value)
        ))
        && Array.isArray(record.pluralStemFormationOptions)
        && record.pluralStemFormationOptions.includes(record.stemFormation)
        && record.pluralStemFormationOptions.length <= 3
        && ["allowed", "required"].includes(record.pluralStemFormationRequirement)
        && (
          !record.preferredPluralStemFormation
          || record.pluralStemFormationOptions.includes(record.preferredPluralStemFormation)
        )
        && Array.isArray(record.pluralConnectorOptions)
        && record.pluralConnectorOptions.length <= 3
        && (
          !record.preferredPluralConnector
          || record.pluralConnectorOptions.includes(record.preferredPluralConnector)
        )
        && (
          record.tliSubclass2SilentNum1Authorized !== true
          || record.nounClass === "tli"
        )
        && ["retained", "omitted"].includes(record.selectedInitialVariant)
        && (
          record.selectedInitialVariant === "retained"
            ? record.selectedRestrictedUseStem === record.restrictedUseStem
            : record.supportiveInitialI === true
              && record.supportiveInitialVariant
              && record.selectedRestrictedUseStem === record.supportiveInitialVariant
        )
        && record.selectedRestrictedUseStem
        && record.formulaStringAuthority === false
        && record.displayTextAuthority === false
      );
    }
    function buildClassicalNahuatlNounstemSourceFrame(restrictedUseStem = "", options = {}) {
      const restrictedStem = normalizeClassicalNahuatlNncStem(restrictedUseStem);
      const state = normalizeClassicalNahuatlNncToken(options.state || "absolutive").toLowerCase();
      const nounClass = normalizeClassicalNahuatlNounClass(options.nounClass || options.class || "");
      const suppliedLexicalRecord = options.lesson14LexicalSelectionRecord || null;
      const lexicalSelectionRecord = suppliedLexicalRecord
        ? cloneClassicalNahuatlNncValue(suppliedLexicalRecord)
        : buildClassicalNahuatlLexicalSelectionRecord(restrictedStem, {
          ...options,
          selectionAuthority: options.classSelectionAuthority || ""
        });
      const lexicalRecordMatches = isClassicalNahuatlLexicalSelectionRecord(
        lexicalSelectionRecord
      )
        && lexicalSelectionRecord.restrictedUseStem === restrictedStem
        && lexicalSelectionRecord.nounClass === nounClass;
      const classSelectionAuthority = lexicalSelectionRecord?.selectionAuthority || "";
      const classAuthorityAllowed = lexicalRecordMatches;
      const selectedRestrictedStem = lexicalRecordMatches
        ? lexicalSelectionRecord.selectedRestrictedUseStem
        : restrictedStem;
      const useShape = normalizeClassicalNahuatlUseShape(options.generalUseShape || options.useShape || "base");
      const subclassSourceShapeFrame =
        validateClassicalNahuatlSubclassSourceShape(
          selectedRestrictedStem,
          {
            ...options,
            nounClass,
            generalUseShape: useShape
          }
        );
      const classGuidanceFrame = getClassicalNahuatlClassFormGuidance(selectedRestrictedStem);
      const selectedClassCompatible = Boolean(nounClass && classGuidanceFrame.candidateClasses.includes(nounClass));
      const ephemeralFinalVowel = normalizeClassicalNahuatlNncToken(options.ephemeralFinalVowel).toLowerCase();
      const repairAction = normalizeClassicalNahuatlNncToken(options.truncationRepair).toLowerCase();
      const suppliedGeneralStem = normalizeClassicalNahuatlNncStem(options.generalUseStem || "");
      let derivedGeneralStem = "";
      let useShapeAction = "";
      let useShapeAuthorized = false;
      let truncationRepairFrame = null;
      if (useShape === "base") {
        derivedGeneralStem = suppliedGeneralStem || selectedRestrictedStem;
        useShapeAction = "identity-base-shape";
        useShapeAuthorized = Boolean(derivedGeneralStem === selectedRestrictedStem);
      } else if (useShape === "truncated") {
        const ephemeralAllowed = ["a", "i"].includes(ephemeralFinalVowel) && selectedRestrictedStem.toLowerCase().endsWith(ephemeralFinalVowel);
        const deleted = ephemeralAllowed ? selectedRestrictedStem.slice(0, -ephemeralFinalVowel.length) : "";
        truncationRepairFrame = repairAction === "supportive-i" && deleted ? buildClassicalNahuatlSupportiveIRepairFrame(deleted) : null;
        derivedGeneralStem = repairAction === "supportive-i" ? truncationRepairFrame?.realizedStem || "" : deleted;
        useShapeAction = repairAction === "supportive-i" ? "delete-tagged-ephemeral-vowel-then-apply-supportive-i-and-orthographic-boundary-rules" : "delete-tagged-ephemeral-vowel";
        useShapeAuthorized = Boolean(
          subclassSourceShapeFrame.authorizationStatus === "authorized"
          && ephemeralAllowed
          && derivedGeneralStem
          && (
            repairAction !== "supportive-i"
            || truncationRepairFrame?.authorizationStatus === "authorized"
          )
          && (!suppliedGeneralStem || suppliedGeneralStem === derivedGeneralStem)
        );
      } else if (useShape === "glottalized") {
        const glottalizedFrame = buildClassicalNahuatlGlottalizedGeneralUseFrame(
          selectedRestrictedStem,
          {
            matrixMorpheme: options.matrixMorpheme,
            lexicallyGlottalizable: lexicalSelectionRecord?.glottalizedGeneralUseEligible,
            glottalizedStem: suppliedGeneralStem
          }
        );
        derivedGeneralStem = glottalizedFrame.generalUseStem;
        useShapeAction = glottalizedFrame.operationId;
        useShapeAuthorized = glottalizedFrame.authorizationStatus === "authorized";
      }
      const useStem = state === "absolutive" ? selectedRestrictedStem : derivedGeneralStem;
      const stateKnown = ["absolutive", "possessive"].includes(state);
      const authorized = Boolean(restrictedStem && stateKnown && nounClass && classAuthorityAllowed && selectedClassCompatible && useShapeAuthorized && useStem && !(state === "possessive" && useShape === "glottalized"));
      let blockReason = "";
      if (!restrictedStem) blockReason = "restricted-use-stem-required";else if (!stateKnown) blockReason = "unknown-nnc-state";else if (!nounClass) blockReason = "lexical-noun-class-selection-required";else if (!selectedClassCompatible) blockReason = "selected-class-contradicts-canvas-form-constraint";else if (!classAuthorityAllowed) blockReason = "class-must-be-user-selected-or-supplied-by-external-lexical-record";else if (!useShape) blockReason = "unknown-general-use-shape";else if (state === "possessive" && useShape === "glottalized") blockReason = "glottalized-general-use-shape-is-not-an-nnc-shape";else if (subclassSourceShapeFrame.authorizationStatus !== "authorized") blockReason = subclassSourceShapeFrame.blockReason;else if (!useShapeAuthorized) blockReason = useShape === "truncated" ? "truncation-requires-matching-tagged-ephemeral-a-or-i" : "general-use-shape-not-authorized";
      return {
        kind: "classical-nahuatl-nounstem-nounstem-source-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason,
        state,
        restrictedUseStem: restrictedStem,
        selectedRestrictedUseStem: selectedRestrictedStem,
        generalUseStem: derivedGeneralStem,
        selectedUseStem: authorized ? useStem : "",
        selectedUseKind: state === "absolutive" ? "restricted-use" : "general-use",
        selectedUseShape: state === "absolutive" ? "base" : useShape,
        generalUseShape: useShape,
        useShapeAction,
        ephemeralFinalVowel,
        truncationRepair: repairAction || "none",
        truncationRepairFrame,
        subclassSourceShapeFrame,
        nounClass,
        classSelectionAuthority,
        lexicalSelectionRecord,
        callerSuppliedLexicalRecordAccepted: Boolean(suppliedLexicalRecord && lexicalRecordMatches),
        classGuidanceFrame,
        formGuidanceIsClassAuthority: false,
        supportiveInitialAlternatives: lexicalSelectionRecord?.supportiveInitialVariant
          ? [restrictedStem, lexicalSelectionRecord.supportiveInitialVariant]
          : [restrictedStem],
        generalUseStemWasBlindlyInvented: false,
        legalWitnessTagIds: ["cn-l14-141-use-stem-kinds", "cn-l14-142-nounstem-classes", "cn-l14-147-possessive-common"]
      };
    }
    function buildClassicalNahuatlDerivedStemFrame(sourceStem = "", options = {}) {
      const normalizedSourceStem = normalizeClassicalNahuatlNncStem(sourceStem);
      const formation = normalizeClassicalNahuatlStemFormation(options.stemFormation || "plain");
      const suppliedDerivedStem = normalizeClassicalNahuatlNncStem(options.derivedStem || "");
      const derivationOperationFrame = deriveClassicalNahuatlStem(normalizedSourceStem, formation);
      const derivedStem = derivationOperationFrame.derivedStem || "";
      const suppliedDerivedStemMatches = !suppliedDerivedStem || suppliedDerivedStem === derivedStem;
      const selectedSubject = normalizeClassicalNahuatlNncSubject(options.subject || "");
      const selectedAnimacy = normalizeClassicalNahuatlNncToken(options.animacy || "").toLowerCase();
      const relationEnvironmentAuthorized = formation === "plain" || !selectedSubject || !selectedAnimacy || selectedSubject.endsWith("pl") || selectedSubject === "3common" && selectedAnimacy === "nonanimate";
      const formationAuthorized = derivationOperationFrame.authorizationStatus === "authorized" && suppliedDerivedStemMatches && relationEnvironmentAuthorized;
      return {
        kind: "classical-nahuatl-nounstem-derived-stem-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: formationAuthorized ? "authorized" : "blocked",
        blockReason: formationAuthorized ? "" : !suppliedDerivedStemMatches ? "supplied-derived-stem-contradicts-canvas-rule-derivation" : !relationEnvironmentAuthorized ? "derived-nounstem-relation-requires-plural-or-nonanimate-common-reference" : derivationOperationFrame.blockReason,
        sourceStem: normalizedSourceStem,
        stemFormation: formation,
        derivedStem: formationAuthorized ? derivedStem : "",
        derivationOperationFrame,
        suppliedDerivedStem,
        suppliedDerivedStemMatches,
        suppliedDerivedStemIsAuthority: false,
        derivedByRule: formationAuthorized,
        derivationPosition: formation === "plain" ? "none" : "inside-predicate-stem",
        reduplicativePrefixKind: formation === "affinity" ? "long-vowel-affinity" : formation === "distributive-varietal" ? "glottal-stop-distributive-varietal" : "none",
        relationMeaning: formation === "affinity" ? "cohesiveness-or-affinity" : formation === "distributive-varietal" ? "distribution-or-variety" : "plain",
        grammaticalNumberValue: "none",
        subjectNumberChanged: false,
        mayHaveCommonNumberSubject: true,
        relationEnvironmentAuthorized,
        relationEnvironmentRule: "derived relation stem requires plural personal reference or nonanimate common reference",
        morphBoundaryPolicy: "keep-entire-derived-form-inside-one-stem-slot",
        legalWitnessTagIds: ["cn-l14-143-affinity-distributive"]
      };
    }
    function buildClassicalNahuatlConstituentAnalysisFrame(analyses = [], options = {}) {
      const typedAnalyses = Array.isArray(analyses) ? analyses.filter(entry => entry && typeof entry === "object" && entry.kind && entry.id && entry.slots && typeof entry.slots === "object" && normalizeClassicalNahuatlNncStem(entry.slots.stem || "") && entry.vowelLengthAuthority === "explicit-typed-source-spelling").map(entry => ({
        ...cloneClassicalNahuatlNncValue(entry),
        id: normalizeClassicalNahuatlNncToken(entry.id).toLowerCase().replace(/[\s_]/gu, "-"),
        slots: {
          ...cloneClassicalNahuatlNncValue(entry.slots),
          stem: normalizeClassicalNahuatlNncStem(entry.slots.stem)
        }
      })) : [];
      const analysisIds = typedAnalyses.map(entry => entry.id);
      const duplicateAnalysisIds = analysisIds.filter((id, index, all) => all.indexOf(id) !== index);
      const selectedAnalysisId = normalizeClassicalNahuatlNncToken(options.selectedAnalysisId || "").toLowerCase().replace(/[\s_]/gu, "-");
      const selectionRequired = typedAnalyses.length > 1;
      const selectedAnalysis = typedAnalyses.length === 1 ? typedAnalyses[0] : typedAnalyses.find(entry => entry.id === selectedAnalysisId) || null;
      const selectedAnalysisAuthority = normalizeClassicalNahuatlNncToken(options.selectionAuthority || (selectedAnalysisId ? "user-selection" : "")).toLowerCase().replace(/[\s_]/gu, "-");
      const selectionAuthorityKnown = !selectedAnalysis || ["user-selection", "external-lexical-record", "single-typed-analysis"].includes(typedAnalyses.length === 1 ? "single-typed-analysis" : selectedAnalysisAuthority);
      let blockReason = "";
      if (Array.isArray(analyses) && analyses.length && !typedAnalyses.length) {
        blockReason = "typed-constituent-analysis-required";
      } else if (options.requireMultipleAnalyses === true && typedAnalyses.length < 2) {
        blockReason = "constituent-alternative-stem-required";
      } else if (duplicateAnalysisIds.length) blockReason = "duplicate-constituent-analysis-id";else if (selectionRequired && !selectedAnalysisId) blockReason = "constituent-analysis-selection-required";else if (selectionRequired && !selectedAnalysis) blockReason = "selected-constituent-analysis-not-authorized";else if (!selectionAuthorityKnown) blockReason = "unknown-constituent-analysis-selection-authority";
      const authorizationStatus = !typedAnalyses.length && !blockReason ? "not-required" : blockReason ? "blocked" : "authorized";
      return {
        kind: "classical-nahuatl-nounstem-constituent-analysis-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus,
        blockReason,
        analyses: typedAnalyses,
        alternativeCount: typedAnalyses.length,
        ambiguityPreserved: typedAnalyses.length > 1,
        ambiguityRemains: typedAnalyses.length > 1,
        selectionRequired,
        selectedAnalysisId: selectedAnalysis?.id || "",
        selectedAnalysis: selectedAnalysis ? cloneClassicalNahuatlNncValue(selectedAnalysis) : null,
        selectionAuthority: selectedAnalysis ? typedAnalyses.length === 1 ? "single-typed-analysis" : selectedAnalysisAuthority : "none",
        selectedAnalysisFeedsTypedSlots: Boolean(selectedAnalysis),
        spellingAloneSelectsAnalysis: false,
        rejectedUntypedAnalysisCount: Array.isArray(analyses) ? analyses.length - typedAnalyses.length : 0,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        legalWitnessTagIds: ["cn-l14-148-constituent-ambiguity"]
      };
    }
    function buildClassicalNahuatlSurfaceConstituentAnalyses(lowerNncFrame = null, options = {}) {
      const typedSlotFrame = lowerNncFrame?.nncSlotFrame;
      const sourceSlots = typedSlotFrame?.slots || {};
      const predicateStem = normalizeClassicalNahuatlNncStem(sourceSlots.predicate?.stem || "");
      if (!isClassicalNahuatlNncSlotFrame(typedSlotFrame) || !predicateStem) {
        return [];
      }
      const ambiguityKind = normalizeClassicalNahuatlNncToken(options.constituentAmbiguityKind || "none").toLowerCase().replace(/[\s_]/gu, "-");
      const allowedAmbiguityKinds = ["none", "front-o", "front-m", "back-uh", "back-tl", "back-tli"];
      if (!allowedAmbiguityKinds.includes(ambiguityKind)) {
        return [];
      }
      const stateCarriers = Object.fromEntries((sourceSlots.state?.slots || []).map(slot => [slot.role, slot.carrier]));
      const canonicalSlots = {
        stem: predicateStem,
        st: stateCarriers.st || "",
        st1: stateCarriers.st1 || "",
        st2: stateCarriers.st2 || "",
        num1: sourceSlots.number?.num1 || "",
        num2: sourceSlots.number?.num2 || ""
      };
      const canonical = {
        kind: "classical-nahuatl-nounstem-typed-constituent-analysis",
        id: "current-typed-slots",
        label: "Current typed slots",
        slots: canonicalSlots,
        vowelLengthAuthority: "explicit-typed-source-spelling",
        boundarySelectionAuthority: "typed-lower-nnc-frame",
        formulaStringAuthority: false,
        surfaceStringAuthority: false
      };
      if (ambiguityKind === "none") {
        return [canonical];
      }
      const alternativeStem = normalizeClassicalNahuatlNncStem(options.constituentAlternativeStem || "");
      if (!alternativeStem) {
        return [canonical, {
          kind: "classical-nahuatl-nounstem-typed-constituent-analysis",
          id: "alternative-typed-slots",
          label: "Alternative typed slots",
          slots: {
            ...canonicalSlots,
            stem: ""
          },
          vowelLengthAuthority: "missing-explicit-typed-source-spelling",
          boundarySelectionAuthority: "user-supplied-lexical-analysis",
          formulaStringAuthority: false,
          surfaceStringAuthority: false
        }];
      }
      const alternativeSlots = {
        ...canonicalSlots,
        stem: alternativeStem
      };
      if (ambiguityKind === "front-o") alternativeSlots.st2 = "o";
      if (ambiguityKind === "front-m") {
        alternativeSlots.st1 = "i";
        alternativeSlots.st2 = "m";
      }
      if (ambiguityKind.startsWith("back-")) {
        alternativeSlots.num1 = ambiguityKind.slice(5);
      }
      return [canonical, {
        kind: "classical-nahuatl-nounstem-typed-constituent-analysis",
        id: "alternative-typed-slots",
        label: "Alternative typed slots",
        ambiguityKind,
        slots: alternativeSlots,
        vowelLengthAuthority: "explicit-typed-source-spelling",
        boundarySelectionAuthority: "user-supplied-lexical-analysis",
        formulaStringAuthority: false,
        surfaceStringAuthority: false
      }];
    }
    function applyClassicalNahuatlLesson14SelectedConstituentAnalysis(nncSlotFrame = null, ambiguityFrame = null) {
      if (!isClassicalNahuatlNncSlotFrame(nncSlotFrame)) {
        return null;
      }
      if (!ambiguityFrame || ambiguityFrame.authorizationStatus === "not-required") {
        return cloneClassicalNahuatlNncValue(nncSlotFrame);
      }
      const selected = ambiguityFrame.authorizationStatus === "authorized" ? ambiguityFrame.selectedAnalysis : null;
      if (!selected?.slots?.stem) {
        return null;
      }
      const next = cloneClassicalNahuatlNncValue(nncSlotFrame);
      next.slots.predicate.stem = selected.slots.stem;
      if (selected.slots.num1) next.slots.number.num1 = selected.slots.num1;
      if (selected.slots.num2) next.slots.number.num2 = selected.slots.num2;
      if (Array.isArray(next.slots.state?.slots)) {
        next.slots.state.slots = next.slots.state.slots.map(slot => ({
          ...slot,
          carrier: selected.slots[slot.role] || slot.carrier
        }));
      }
      next.lesson14ConstituentAnalysisId = selected.id;
      next.lesson14ConstituentAnalysisAuthority = ambiguityFrame.selectionAuthority;
      next.semanticIdentity = `${next.semanticIdentity || ""}|constituent-analysis:${selected.id}`;
      next.formulaArtifactAuthority = "display-only-not-authority";
      return next;
    }
    function buildClassicalNahuatlNncSubjectPersonFrame({
      subject = "3sg",
      followingMaterial = ""
    } = {}) {
      const normalizedSubject = normalizeClassicalNahuatlNncSubject(subject);
      const firstSound = getClassicalNahuatlNncFirstSound(followingMaterial);
      const runtimeTarget = getClassicalNahuatlNncRuntimeTarget();
      const finitePersonBuilder =
        runtimeTarget?.getClassicalNahuatlFiniteSubjectPersonDyad;
      const finitePersonValidator =
        runtimeTarget?.isClassicalNahuatlFiniteSubjectPersonDyad;
      let finitePersonFrame = null;
      if (
        typeof finitePersonBuilder === "function"
        && typeof finitePersonValidator === "function"
        && normalizedSubject !== "3common"
      ) {
        try {
          finitePersonFrame = finitePersonBuilder(
            normalizedSubject,
            "indicative",
            { followingMaterial },
          );
        } catch {
          finitePersonFrame = null;
        }
      }
      const canonicalFinitePersonFrame =
        typeof finitePersonValidator === "function"
        && finitePersonValidator(finitePersonFrame)
          ? finitePersonFrame
          : null;
      let pers1 = canonicalFinitePersonFrame?.pers1 || "";
      if (normalizedSubject === "3common") {
        pers1 = CLASSICAL_NAHUATL_NNC_ZERO;
      }
      const pers2 = normalizedSubject ? CLASSICAL_NAHUATL_NNC_ZERO : "";
      const xCarrierRejected = /^xi?$/u.test(pers1);
      const authorized = Boolean(normalizedSubject && pers1 && pers2 && !xCarrierRejected);
      return {
        kind: "classical-nahuatl-nnc-subject-person-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized ? "" : xCarrierRejected ? "x-xi-not-authorized-in-nnc-subject" : "unknown-nnc-subject",
        subject: normalizedSubject,
        pers1: authorized ? pers1 : "",
        pers2: authorized ? pers2 : "",
        followingMaterial: normalizeClassicalNahuatlNncToken(followingMaterial),
        followingSound: firstSound,
        personSourceFrameKind: canonicalFinitePersonFrame?.kind || "classical-nahuatl-nnc-third-common-person-frame",
        pers1BaseMorph: canonicalFinitePersonFrame?.pers1BaseMorph || pers1,
        supportiveVowelPresent: canonicalFinitePersonFrame?.pers1SupportiveVowelPresent === true,
        supportiveISurfacePolicy: canonicalFinitePersonFrame?.pers1SupportiveISurfacePolicy || "conditional-support-vowel-boundary-action",
        supportiveISurfaceAction: canonicalFinitePersonFrame?.pers1SupportiveISurfaceAction || "not-needed",
        supportiveISurfaceReason: canonicalFinitePersonFrame?.pers1SupportiveISurfaceReason || "not-needed",
        xXiAllowed: false,
        case: "nominative",
        formulaRegion: "subject",
        legalWitnessTagIds: ["cn-l12-123-subject-connectors", "cn-l12-124-subject-paradigm"]
      };
    }
    function resolveClassicalNahuatlLesson12AbsolutiveNumberDyad({
      subject = "3sg",
      nounClass = "",
      stem = "",
      pluralConnector = "",
      animacy = "",
      metaphoricalOverride = false
    } = {}) {
      const normalizedSubject = normalizeClassicalNahuatlNncSubject(subject);
      const normalizedClass = normalizeClassicalNahuatlNounClass(nounClass);
      const normalizedStem = normalizeClassicalNahuatlNncStem(stem);
      const plural = normalizedSubject.endsWith("pl");
      const common = normalizedSubject === "3common";
      const normalizedAnimacy = normalizeClassicalNahuatlNncToken(animacy).toLowerCase();
      const pluralAnimacyAllowed = !plural || normalizedAnimacy === "animate" || metaphoricalOverride === true;
      let num1 = "";
      let num2 = "";
      let connectorRule = "";
      let alternatives = [];
      if (!plural && normalizedClass === "tl") {
        num1 = "tl";
        num2 = CLASSICAL_NAHUATL_NNC_ZERO;
        connectorRule = "lesson-12.3.2a-tl-class-after-vowel";
      } else if (!plural && normalizedClass === "tli") {
        const stemFinal = getClassicalNahuatlNncLastSound(normalizedStem);
        num1 = stemFinal === "l" ? "li" : "tli";
        num2 = CLASSICAL_NAHUATL_NNC_ZERO;
        connectorRule = stemFinal === "l" ? "lesson-12.3.2a-l-plus-tl-assimilates-to-li" : "lesson-12.3.2a-tli-after-consonant";
        alternatives = stemFinal === "l" ? [] : ["tli-0"];
      } else if (!plural && normalizedClass === "in") {
        num1 = "in";
        num2 = CLASSICAL_NAHUATL_NNC_ZERO;
        connectorRule = "lesson-12.3.2a-in-class-suppletive-connector";
      } else if (!plural && normalizedClass === "zero") {
        num1 = CLASSICAL_NAHUATL_NNC_ZERO;
        num2 = CLASSICAL_NAHUATL_NNC_ZERO;
        connectorRule = "lesson-12.3.2a-zero-class-suppletive-connector";
      } else if (plural) {
        const connector = normalizeClassicalNahuatlNncToken(pluralConnector).toLowerCase().replace(/ø/gu, "0");
        const dyads = {
          "t-in": ["t", "in"],
          "m-eh": ["m", "eh"],
          "0-h": ["0", "h"]
        };
        [num1, num2] = dyads[connector] || ["", ""];
        connectorRule = num1 ? "lesson-12.3.2b-lexically-selected-plural-number-dyad" : "";
      }
      const classKnown = Boolean(normalizedClass);
      const connectorKnown = Boolean(num1 && num2);
      const authorized = Boolean(normalizedSubject && classKnown && connectorKnown && pluralAnimacyAllowed);
      return {
        kind: "classical-nahuatl-absolutive-nnc-absolutive-number-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized ? "" : !normalizedSubject ? "unknown-nnc-subject" : !classKnown ? "noun-class-required-for-absolutive-connector" : !pluralAnimacyAllowed ? "nonanimate-plural-requires-metaphorical-override" : "plural-number-dyad-must-be-selected-lexically",
        subject: normalizedSubject,
        subjectNumber: plural ? "plural" : common ? "common" : "singular",
        nounClass: normalizedClass,
        stem: normalizedStem,
        num1: authorized ? num1 : "",
        num2: authorized ? num2 : "",
        connectorRule,
        alternatives,
        animacy: normalizedAnimacy || "not-specified",
        metaphoricalOverride: metaphoricalOverride === true,
        numberBelongsTo: "subject-personal-pronoun",
        numberIsNounInflection: false,
        supportiveVowelRoles: ["tli-i", "li-i", "in-i"],
        legalWitnessTagIds: ["cn-l12-123-subject-connectors", "cn-l12-126-animacy-number"]
      };
    }
    function buildClassicalNahuatlAbsolutiveParadigmContractFrame(lesson12Frame = null) {
      const nncSlotFrame = lesson12Frame?.nncSlotFrame || null;
      const personFrame = lesson12Frame?.personFrame || null;
      const numberFrame = lesson12Frame?.numberFrame || null;
      const stateFrame = lesson12Frame?.stateFrame || null;
      const predicateSemanticsFrame = lesson12Frame?.predicateSemanticsFrame || null;
      if (
        lesson12Frame?.authorizationStatus !== "authorized"
        || lesson12Frame?.kind !== "classical-nahuatl-absolutive-nnc-absolutive-nnc-frame"
        || !isClassicalNahuatlNncSlotFrame(nncSlotFrame)
        || personFrame?.authorizationStatus !== "authorized"
        || numberFrame?.authorizationStatus !== "authorized"
        || stateFrame?.authorizationStatus !== "authorized"
        || stateFrame.arity !== "vacant"
        || !lesson12Frame.formulaRealization
      ) {
        return null;
      }
      const subjectPersonInventory = [{
        identity: "first-singular",
        subject: "1sg",
        person: "first",
        number: "singular"
      }, {
        identity: "second-singular",
        subject: "2sg",
        person: "second",
        number: "singular"
      }, {
        identity: "third-singular-or-common",
        subject: "3sg-or-common",
        person: "third",
        number: "singular-or-common"
      }, {
        identity: "first-plural",
        subject: "1pl",
        person: "first",
        number: "plural"
      }, {
        identity: "second-plural",
        subject: "2pl",
        person: "second",
        number: "plural"
      }, {
        identity: "third-plural",
        subject: "3pl",
        person: "third",
        number: "plural"
      }];
      const numberDyadInventory = [{
        identity: "absolutive-singular-common-tl",
        subjectNumber: "singular-or-common",
        num1: "tl",
        num2: CLASSICAL_NAHUATL_NNC_ZERO,
        conditioning: "tl-class"
      }, {
        identity: "absolutive-singular-common-tli-li",
        subjectNumber: "singular-or-common",
        num1: "tli",
        num1SurfaceVariants: ["tli", "li"],
        num2: CLASSICAL_NAHUATL_NNC_ZERO,
        conditioning: "tli-class-and-l-boundary"
      }, {
        identity: "absolutive-singular-common-in",
        subjectNumber: "singular-or-common",
        num1: "in",
        num2: CLASSICAL_NAHUATL_NNC_ZERO,
        conditioning: "in-class"
      }, {
        identity: "absolutive-singular-common-zero",
        subjectNumber: "singular-or-common",
        num1: CLASSICAL_NAHUATL_NNC_ZERO,
        num2: CLASSICAL_NAHUATL_NNC_ZERO,
        conditioning: "zero-class"
      }, {
        identity: "absolutive-plural-t-in",
        subjectNumber: "plural",
        num1: "t",
        num2: "in",
        conditioning: "lexically-selected-plural-dyad"
      }, {
        identity: "absolutive-plural-m-eh",
        subjectNumber: "plural",
        num1: "m",
        num2: "eh",
        conditioning: "lexically-selected-plural-dyad"
      }, {
        identity: "absolutive-plural-zero-h",
        subjectNumber: "plural",
        num1: CLASSICAL_NAHUATL_NNC_ZERO,
        num2: "h",
        conditioning: "lexically-selected-plural-dyad"
      }];
      const subjectPronounShapeInventory = subjectPersonInventory.flatMap(subjectIdentity => {
        const subjectNumber = subjectIdentity.number === "plural" ? "plural" : "singular-or-common";
        return numberDyadInventory
          .filter(numberDyad => numberDyad.subjectNumber === subjectNumber)
          .map(numberDyad => ({
            identity: `${subjectIdentity.identity}:${numberDyad.identity}`,
            subjectIdentity: subjectIdentity.identity,
            subject: subjectIdentity.subject,
            person: subjectIdentity.person,
            number: subjectIdentity.number,
            numberDyadIdentity: numberDyad.identity,
            num1: numberDyad.num1,
            num2: numberDyad.num2
          }));
      });
      const selectedSubjectIdentity = subjectPersonInventory.find(subjectIdentity => (
        subjectIdentity.subject === personFrame.subject
        || subjectIdentity.subject === "3sg-or-common" && ["3sg", "3common"].includes(personFrame.subject)
      ))?.identity || "";
      const selectedNumberDyadIdentity = numberDyadInventory.find(numberDyad => (
        numberDyad.subjectNumber === (numberFrame.subjectNumber === "plural" ? "plural" : "singular-or-common")
        && numberDyad.num2 === numberFrame.num2
        && (
          numberDyad.num1 === numberFrame.num1
          || numberDyad.num1SurfaceVariants?.includes(numberFrame.num1)
        )
      ))?.identity || "";
      const selectedCoordinate = {
        coordinateId: [
          personFrame.subject,
          numberFrame.subjectNumber,
          numberFrame.nounClass,
          `${numberFrame.num1}-${numberFrame.num2}`,
          numberFrame.animacy,
          numberFrame.metaphoricalOverride === true ? "metaphorical" : "literal"
        ].join(":"),
        subject: personFrame.subject,
        subjectIdentity: selectedSubjectIdentity,
        subjectNumber: numberFrame.subjectNumber,
        pers1: personFrame.pers1,
        pers2: personFrame.pers2,
        nounClass: numberFrame.nounClass,
        numberDyad: {
          num1: numberFrame.num1,
          num2: numberFrame.num2
        },
        numberDyadIdentity: selectedNumberDyadIdentity,
        subjectPronounShapeIdentity: `${selectedSubjectIdentity}:${selectedNumberDyadIdentity}`,
        animacy: numberFrame.animacy,
        metaphoricalUse: numberFrame.metaphoricalOverride === true,
        lexicalStateAvailability: stateFrame.lexicalStateAvailability,
        predicateStem: lesson12Frame.stem,
        predicateFunctions: [...(predicateSemanticsFrame?.predicateRoleOptions || [])],
        timeReferenceSource: predicateSemanticsFrame?.timeReferenceSource || "",
        typedSlotFrame: cloneClassicalNahuatlNncValue(nncSlotFrame),
        formulaRealization: lesson12Frame.formulaRealization,
        formulaStringAuthority: false,
        displayTextAuthority: false
      };
      return {
        kind: "classical-nahuatl-absolutive-nnc-absolutive-paradigm-contract-frame",
        version: 1,
        authorizationStatus: "authorized",
        realizationPhase: "structural-formula",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        sourceSection: "12.1-12.7",
        greatestCommonDivisor: {
          identityId: "lesson12:absolutive-state-nnc",
          clauseKind: "nominal-nuclear-clause",
          state: "absolutive",
          stateArity: "vacant",
          predicateKind: "nounstem",
          formulaTemplate: "#pers1-pers2(STEM)num1-num2#",
          valencePosition: "replaced-by-state",
          tensePosition: "absent",
          numberBelongsTo: "subject-personal-pronoun"
        },
        leastCommonMultiple: {
          distinctionAxes: [...CLASSICAL_NAHUATL_LESSON12_NNC_DISTINCTION_AXES],
          subjectPersonInventory,
          numberDyadInventory,
          subjectPronounShapeInventory,
          predicateFunctionInventory: ["identify", "describe", "locate"],
          animacyReferenceInventory: [
            "animate-singular",
            "animate-plural",
            "nonanimate-common",
            "metaphorical-animate"
          ],
          selectedCoordinate,
          selectedRealizations: [selectedCoordinate]
        },
        ruleRefs: getClassicalNahuatlAbsolutiveNncRules(),
        callerSuppliedAuthorityAccepted: false,
        formulaStringAuthority: false,
        displayTextAuthority: false
      };
    }
    function buildClassicalNahuatlPossessiveParadigmContractFrame(lesson13Frame = null) {
      const nncSlotFrame = lesson13Frame?.nncSlotFrame || null;
      const personFrame = lesson13Frame?.personFrame || null;
      const numberFrame = lesson13Frame?.numberFrame || null;
      const stateFrame = lesson13Frame?.stateFrame || null;
      if (
        lesson13Frame?.authorizationStatus !== "authorized"
        || lesson13Frame?.kind !== "classical-nahuatl-possessive-nnc-possessive-nnc-frame"
        || !isClassicalNahuatlNncSlotFrame(nncSlotFrame)
        || personFrame?.authorizationStatus !== "authorized"
        || numberFrame?.authorizationStatus !== "authorized"
        || stateFrame?.authorizationStatus !== "authorized"
        || !["monadic", "dyadic"].includes(stateFrame.arity)
        || !lesson13Frame.formulaRealization
      ) {
        return null;
      }
      const formulaTemplateInventory = [{
        identity: "possessive-monadic-state",
        stateArity: "monadic",
        formulaTemplate: "#pers1-pers2+st(STEM)num1-num2#"
      }, {
        identity: "possessive-dyadic-state",
        stateArity: "dyadic",
        formulaTemplate: "#pers1-pers2+st1-st2(STEM)num1-num2#"
      }];
      const subjectPersonInventory = [{
        identity: "first-singular",
        subject: "1sg",
        person: "first",
        number: "singular",
        pers1: "n",
        pers1SurfaceVariants: ["n", "ni"],
        pers2: CLASSICAL_NAHUATL_NNC_ZERO
      }, {
        identity: "second-singular",
        subject: "2sg",
        person: "second",
        number: "singular",
        pers1: "t",
        pers1SurfaceVariants: ["t", "ti"],
        pers2: CLASSICAL_NAHUATL_NNC_ZERO
      }, {
        identity: "third-singular-or-common",
        subject: "3sg-or-common",
        person: "third",
        number: "singular-or-common",
        pers1: CLASSICAL_NAHUATL_NNC_ZERO,
        pers1SurfaceVariants: [CLASSICAL_NAHUATL_NNC_ZERO],
        pers2: CLASSICAL_NAHUATL_NNC_ZERO
      }, {
        identity: "first-plural",
        subject: "1pl",
        person: "first",
        number: "plural",
        pers1: "t",
        pers1SurfaceVariants: ["t", "ti"],
        pers2: CLASSICAL_NAHUATL_NNC_ZERO
      }, {
        identity: "second-plural",
        subject: "2pl",
        person: "second",
        number: "plural",
        pers1: "am",
        pers1SurfaceVariants: ["am", "an"],
        pers2: CLASSICAL_NAHUATL_NNC_ZERO
      }, {
        identity: "third-plural",
        subject: "3pl",
        person: "third",
        number: "plural",
        pers1: CLASSICAL_NAHUATL_NNC_ZERO,
        pers1SurfaceVariants: [CLASSICAL_NAHUATL_NNC_ZERO],
        pers2: CLASSICAL_NAHUATL_NNC_ZERO
      }];
      const numberDyadInventory = [{
        identity: "possessive-singular-common-uh",
        subjectNumber: "singular-or-common",
        num1: "uh",
        num2: CLASSICAL_NAHUATL_NNC_ZERO,
        conditioning: "after-vowel-before-silent-num2-and-morphologically-selected"
      }, {
        identity: "possessive-singular-common-hui",
        subjectNumber: "singular-or-common",
        num1: "hui",
        num2: CLASSICAL_NAHUATL_NNC_ZERO,
        conditioning: "after-consonant-and-rare-morphological-selection"
      }, {
        identity: "possessive-singular-common-zero",
        subjectNumber: "singular-or-common",
        num1: CLASSICAL_NAHUATL_NNC_ZERO,
        num2: CLASSICAL_NAHUATL_NNC_ZERO,
        conditioning: "morphologically-selected"
      }, {
        identity: "possessive-plural-hu-an",
        subjectNumber: "plural",
        num1: "hu",
        num2: "ān",
        conditioning: "plural-subject"
      }];
      const subjectPronounShapeInventory = subjectPersonInventory.flatMap(subjectIdentity => {
        const subjectNumber = subjectIdentity.number === "plural" ? "plural" : "singular-or-common";
        return numberDyadInventory
          .filter(numberDyad => numberDyad.subjectNumber === subjectNumber)
          .map(numberDyad => ({
            identity: `${subjectIdentity.identity}:${numberDyad.identity}`,
            subjectIdentity: subjectIdentity.identity,
            subject: subjectIdentity.subject,
            person: subjectIdentity.person,
            number: subjectIdentity.number,
            pers1: subjectIdentity.pers1,
            pers1SurfaceVariants: [...subjectIdentity.pers1SurfaceVariants],
            pers2: subjectIdentity.pers2,
            numberDyadIdentity: numberDyad.identity,
            num1: numberDyad.num1,
            num2: numberDyad.num2
          }));
      });
      const possessorStateShapeInventory = [{
        identity: "monadic-reciprocal-ne",
        stateArity: "monadic",
        possessor: "reciprocal",
        referenceType: "reciprocal",
        possessorPerson: "third",
        possessorNumber: "reciprocal",
        st: "ne",
        st1: "",
        st2: "",
        possessiveCaseLocation: "state",
        conditioning: "third-person-subject-only"
      }, {
        identity: "monadic-nonspecific-human-te",
        stateArity: "monadic",
        possessor: "nonspecific-human",
        referenceType: "nonspecific-human",
        possessorPerson: "nonspecific",
        possessorNumber: "nonspecific",
        st: "tē",
        st1: "",
        st2: "",
        possessiveCaseLocation: "state",
        conditioning: "unrestricted-human-reference"
      }, {
        identity: "monadic-nonspecific-nonhuman-tla",
        stateArity: "monadic",
        possessor: "nonspecific-nonhuman",
        referenceType: "nonspecific-nonhuman",
        possessorPerson: "nonspecific",
        possessorNumber: "nonspecific",
        st: "tla",
        st1: "",
        st2: "",
        possessiveCaseLocation: "state",
        conditioning: "relational-or-authorized-analogical-derived-nounstem"
      }, {
        identity: "dyadic-first-singular-o",
        stateArity: "dyadic",
        possessor: "1sg",
        referenceType: "specific",
        possessorPerson: "first",
        possessorNumber: "singular",
        st: "",
        st1: "n",
        st2: "o",
        possessiveCaseLocation: "st2",
        conditioning: "consonant-initial-stem"
      }, {
        identity: "dyadic-first-singular-silent",
        stateArity: "dyadic",
        possessor: "1sg",
        referenceType: "specific",
        possessorPerson: "first",
        possessorNumber: "singular",
        st: "",
        st1: "n",
        st2: "⎕",
        possessiveCaseLocation: "st2",
        conditioning: "vowel-initial-stem"
      }, {
        identity: "dyadic-first-plural-o",
        stateArity: "dyadic",
        possessor: "1pl",
        referenceType: "specific",
        possessorPerson: "first",
        possessorNumber: "plural",
        st: "",
        st1: "t",
        st2: "o",
        possessiveCaseLocation: "st2",
        conditioning: "consonant-initial-stem"
      }, {
        identity: "dyadic-first-plural-silent",
        stateArity: "dyadic",
        possessor: "1pl",
        referenceType: "specific",
        possessorPerson: "first",
        possessorNumber: "plural",
        st: "",
        st1: "t",
        st2: "⎕",
        possessiveCaseLocation: "st2",
        conditioning: "vowel-initial-stem"
      }, {
        identity: "dyadic-second-singular-o",
        stateArity: "dyadic",
        possessor: "2sg",
        referenceType: "specific",
        possessorPerson: "second",
        possessorNumber: "singular",
        st: "",
        st1: "m",
        st2: "o",
        possessiveCaseLocation: "st2",
        conditioning: "consonant-initial-stem"
      }, {
        identity: "dyadic-second-singular-silent",
        stateArity: "dyadic",
        possessor: "2sg",
        referenceType: "specific",
        possessorPerson: "second",
        possessorNumber: "singular",
        st: "",
        st1: "m",
        st2: "⎕",
        possessiveCaseLocation: "st2",
        conditioning: "vowel-initial-stem"
      }, {
        identity: "dyadic-second-plural-o",
        stateArity: "dyadic",
        possessor: "2pl",
        referenceType: "specific",
        possessorPerson: "second",
        possessorNumber: "plural",
        st: "",
        st1: "am",
        st2: "o",
        possessiveCaseLocation: "st2",
        conditioning: "consonant-initial-stem"
      }, {
        identity: "dyadic-second-plural-silent",
        stateArity: "dyadic",
        possessor: "2pl",
        referenceType: "specific",
        possessorPerson: "second",
        possessorNumber: "plural",
        st: "",
        st1: "am",
        st2: "⎕",
        possessiveCaseLocation: "st2",
        conditioning: "vowel-initial-stem"
      }, {
        identity: "dyadic-third-singular-zero",
        stateArity: "dyadic",
        possessor: "3sg",
        referenceType: "specific",
        possessorPerson: "third",
        possessorNumber: "singular-or-common",
        st: "",
        st1: "ī",
        st1SurfaceVariants: ["ī", "i"],
        st2: CLASSICAL_NAHUATL_NNC_ZERO,
        possessiveCaseLocation: "st1",
        conditioning: "third-singular-or-common-possessor"
      }, {
        identity: "dyadic-third-plural-m",
        stateArity: "dyadic",
        possessor: "3pl",
        referenceType: "specific",
        possessorPerson: "third",
        possessorNumber: "plural",
        st: "",
        st1: "ī",
        st2: "m",
        possessiveCaseLocation: "st1",
        conditioning: "before-vowel-m-or-p"
      }, {
        identity: "dyadic-third-plural-n",
        stateArity: "dyadic",
        possessor: "3pl",
        referenceType: "specific",
        possessorPerson: "third",
        possessorNumber: "plural",
        st: "",
        st1: "ī",
        st2: "n",
        possessiveCaseLocation: "st1",
        conditioning: "outside-m-environment"
      }];
      const selectedSubjectIdentity = subjectPersonInventory.find(subjectIdentity => (
        subjectIdentity.subject === personFrame.subject
        || subjectIdentity.subject === "3sg-or-common" && ["3sg", "3common"].includes(personFrame.subject)
      ))?.identity || "";
      const selectedNumberDyadIdentity = numberDyadInventory.find(numberDyad => (
        numberDyad.subjectNumber === (numberFrame.subjectNumber === "plural" ? "plural" : "singular-or-common")
        && numberDyad.num1 === numberFrame.num1
        && numberDyad.num2 === numberFrame.num2
      ))?.identity || "";
      const stateSlotsByRole = Object.fromEntries(
        stateFrame.slots.map(slot => [slot.role, slot.carrier])
      );
      const selectedStateShapeIdentity = possessorStateShapeInventory.find(shape => (
        shape.stateArity === stateFrame.arity
        && shape.possessor === stateFrame.possessor
        && shape.st === (stateSlotsByRole.st || "")
        && (
          shape.st1 === (stateSlotsByRole.st1 || "")
          || shape.st1SurfaceVariants?.includes(stateSlotsByRole.st1 || "")
        )
        && shape.st2 === (stateSlotsByRole.st2 || "")
      ))?.identity || "";
      const selectedFormulaTemplateIdentity = formulaTemplateInventory.find(template => (
        template.stateArity === stateFrame.arity
      ))?.identity || "";
      if (
        !selectedSubjectIdentity
        || !selectedNumberDyadIdentity
        || !selectedStateShapeIdentity
        || !selectedFormulaTemplateIdentity
      ) {
        return null;
      }
      const subjectPronounShapeIdentity =
        `${selectedSubjectIdentity}:${selectedNumberDyadIdentity}`;
      const selectedCoordinate = {
        coordinateId: [
          subjectPronounShapeIdentity,
          selectedStateShapeIdentity,
          lesson13Frame.stem
        ].join(":"),
        subject: personFrame.subject,
        subjectIdentity: selectedSubjectIdentity,
        subjectNumber: numberFrame.subjectNumber,
        pers1: personFrame.pers1,
        pers2: personFrame.pers2,
        numberDyad: {
          num1: numberFrame.num1,
          num2: numberFrame.num2
        },
        numberDyadIdentity: selectedNumberDyadIdentity,
        subjectPronounShapeIdentity,
        stateArity: stateFrame.arity,
        formulaTemplateIdentity: selectedFormulaTemplateIdentity,
        possessor: stateFrame.possessor,
        possessorStateShapeIdentity: selectedStateShapeIdentity,
        typedStateSlots: cloneClassicalNahuatlNncValue(stateFrame.slots),
        lexicalStateAvailability: stateFrame.lexicalStateAvailability,
        nounstemPossessorCompatibility: stateFrame.sourcePossessorCompatibility,
        predicateStem: lesson13Frame.stem,
        typedSlotFrame: cloneClassicalNahuatlNncValue(nncSlotFrame),
        formulaRealization: lesson13Frame.formulaRealization,
        formulaStringAuthority: false,
        displayTextAuthority: false
      };
      return {
        kind: "classical-nahuatl-possessive-nnc-possessive-paradigm-contract-frame",
        version: 1,
        authorizationStatus: "authorized",
        realizationPhase: "structural-formula",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        sourceSection: "13.1-13.6",
        greatestCommonDivisor: {
          identityId: "lesson13:possessive-state-nnc",
          clauseKind: "nominal-nuclear-clause",
          state: "possessive",
          statePosition: "nonvacant-prefixal-pronoun",
          stateArity: "monadic-or-dyadic",
          stateCategories: ["person", "number", "possessive-case"],
          predicateKind: "nounstem",
          formulaSchema: "#pers1-pers2+STATE(STEM)num1-num2#",
          subjectPersonSystem: "same-as-absolutive-nnc",
          valencePosition: "replaced-by-state",
          tensePosition: "absent",
          numberBelongsTo: "subject-personal-pronoun"
        },
        leastCommonMultiple: {
          distinctionAxes: [...CLASSICAL_NAHUATL_LESSON13_NNC_DISTINCTION_AXES],
          formulaTemplateInventory,
          subjectPersonInventory,
          numberDyadInventory,
          subjectPronounShapeInventory,
          possessorStateShapeInventory,
          selectedCoordinate,
          selectedRealizations: [selectedCoordinate]
        },
        ruleRefs: getClassicalNahuatlPossessiveNncRules(),
        callerSuppliedAuthorityAccepted: false,
        formulaStringAuthority: false,
        displayTextAuthority: false
      };
    }
    function buildClassicalNahuatlPossessiveParadigmPlan(
      contractFrame = null,
      { referent = "animate" } = {}
    ) {
      const runtimeTarget = getClassicalNahuatlNncRuntimeTarget();
      const registry = typeof runtimeTarget?.getDefaultGrammarContractRegistry === "function"
        ? runtimeTarget.getDefaultGrammarContractRegistry()
        : null;
      const inspection = typeof runtimeTarget?.inspectRegisteredGrammarContract === "function"
        ? runtimeTarget.inspectRegisteredGrammarContract(registry, contractFrame)
        : null;
      const normalizedReferent = normalizeClassicalNahuatlNncToken(referent).toLowerCase();
      const referentAuthorized = ["animate", "nonanimate", "metaphorical"].includes(normalizedReferent);
      const contractAuthorized = Boolean(
        inspection?.status === "valid"
        && contractFrame?.kind
          === "classical-nahuatl-possessive-nnc-possessive-paradigm-contract-frame"
        && contractFrame?.greatestCommonDivisor?.identityId
          === "lesson13:possessive-state-nnc"
      );
      const blockedPlan = blockReason => ({
        kind: "classical-nahuatl-possessive-nnc-possessive-paradigm-plan",
        version: 1,
        authorizationStatus: "blocked",
        blockReason,
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        sourceSection: "13.1-13.6",
        sourceContractKind: contractFrame?.kind || "",
        sourceContractValidationStatus: inspection?.status || "unavailable",
        greatestCommonDivisorIdentity: "",
        fixedReferent: referentAuthorized ? normalizedReferent : "",
        predicateStem: "",
        applicablePossessorStateShapeCount: 0,
        coordinateCount: 0,
        coordinates: [],
        callerSuppliedCoordinateAuthorityAccepted: false,
        formulaStringAuthority: false,
        displayTextAuthority: false
      });
      if (!contractAuthorized) {
        return blockedPlan("valid-lesson13-possessive-paradigm-contract-required");
      }
      if (!referentAuthorized) {
        return blockedPlan("lesson13-paradigm-referent-not-recognized");
      }
      const lcm = contractFrame.leastCommonMultiple;
      const predicateStem = contractFrame.leastCommonMultiple.selectedCoordinate?.predicateStem || "";
      const firstSound = getClassicalNahuatlNncFirstSound(predicateStem);
      const vowelInitial = isClassicalNahuatlNncVowelSound(firstSound);
      const mEnvironment = vowelInitial || ["m", "p"].includes(firstSound);
      const applicablePossessorStateShapes = lcm.possessorStateShapeInventory.filter(shape => {
        if (shape.stateArity === "monadic" || shape.possessor === "3sg") return true;
        if (["1sg", "2sg", "1pl", "2pl"].includes(shape.possessor)) {
          return vowelInitial ? shape.st2 === "⎕" : shape.st2 === "o";
        }
        if (shape.possessor === "3pl") {
          return shape.st2 === (mEnvironment ? "m" : "n");
        }
        return false;
      });
      const subjectIdentities = lcm.subjectPersonInventory
        .filter(subjectIdentity => (
          normalizedReferent === "nonanimate"
            ? subjectIdentity.identity === "third-singular-or-common"
            : true
        ))
        .map(subjectIdentity => ({
          ...subjectIdentity,
          subject: subjectIdentity.identity === "third-singular-or-common"
            ? normalizedReferent === "nonanimate" ? "3common" : "3sg"
            : subjectIdentity.subject
        }));
      const requestedPossessorByIdentity = {
        reciprocal: "reciprocal",
        "nonspecific-human": "te",
        "nonspecific-nonhuman": "tla"
      };
      const coordinates = subjectIdentities.flatMap(subjectIdentity => (
        applicablePossessorStateShapes
          .filter(stateShape => (
            stateShape.possessor !== "reciprocal"
            || subjectIdentity.person === "third"
          ))
          .map(stateShape => ({
            kind: "classical-nahuatl-possessive-nnc-possessive-paradigm-coordinate-spec",
            version: 1,
            coordinateId: `${subjectIdentity.identity}:${stateShape.identity}`,
            greatestCommonDivisorIdentity: "lesson13:possessive-state-nnc",
            subjectIdentity: subjectIdentity.identity,
            subject: subjectIdentity.subject,
            subjectPerson: subjectIdentity.person,
            subjectNumber: subjectIdentity.number,
            possessorStateShapeIdentity: stateShape.identity,
            possessorIdentity: stateShape.possessor,
            requestedPossessor:
              requestedPossessorByIdentity[stateShape.possessor] || stateShape.possessor,
            stateArity: stateShape.stateArity,
            formulaTemplateIdentity: stateShape.stateArity === "monadic"
              ? "possessive-monadic-state"
              : "possessive-dyadic-state",
            expectedStateSlots: stateShape.stateArity === "monadic"
                ? [{ role: "st", carrier: stateShape.st }]
                : [{
                  role: "st1",
                  carrier: stateShape.possessor === "3sg" && /^ih/u.test(predicateStem)
                    ? "i"
                    : stateShape.st1
                }, {
                  role: "st2",
                  carrier: stateShape.st2
                }],
            formulaStringAuthority: false,
            displayTextAuthority: false
          }))
      ));
      return {
        kind: "classical-nahuatl-possessive-nnc-possessive-paradigm-plan",
        version: 1,
        authorizationStatus: "authorized",
        blockReason: "",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        sourceSection: "13.1-13.6",
        sourceContractKind: contractFrame.kind,
        sourceContractValidationStatus: inspection.status,
        greatestCommonDivisorIdentity: "lesson13:possessive-state-nnc",
        fixedReferent: normalizedReferent,
        predicateStem,
        lcmInventory: {
          formulaTemplateCount: lcm.formulaTemplateInventory.length,
          subjectPronounShapeCount: lcm.subjectPronounShapeInventory.length,
          possessorStateShapeCount: lcm.possessorStateShapeInventory.length
        },
        applicablePossessorStateShapeCount: applicablePossessorStateShapes.length,
        coordinateCount: coordinates.length,
        coordinates,
        callerSuppliedCoordinateAuthorityAccepted: false,
        formulaStringAuthority: false,
        displayTextAuthority: false
      };
    }
    function normalizeClassicalNahuatlNncPossessor(value = "") {
      const key = normalizeClassicalNahuatlNncToken(value).toLowerCase().replace(/[\s_-]/gu, "");
      const aliases = {
        ne: "reciprocal",
        reciprocal: "reciprocal",
        te: "nonspecific-human",
        "tē": "nonspecific-human",
        nonspecifichuman: "nonspecific-human",
        tla: "nonspecific-nonhuman",
        nonspecificnonhuman: "nonspecific-nonhuman",
        "1sg": "1sg",
        "2sg": "2sg",
        "3sg": "3sg",
        "1pl": "1pl",
        "2pl": "2pl",
        "3pl": "3pl"
      };
      return aliases[key] || "";
    }
    function buildClassicalNahuatlPossessiveStateFrame({
      possessor = "",
      subject = "3sg",
      stem = "",
      nounstemRelationKind = "",
      analogicalTlaDerivedStem = false,
      thirdPluralPossessorNumberMorph = "",
      nncSourceAuthorityFrame = null
    } = {}) {
      const normalizedPossessor = normalizeClassicalNahuatlNncPossessor(possessor);
      const normalizedSubject = normalizeClassicalNahuatlNncSubject(subject);
      const normalizedStem = normalizeClassicalNahuatlNncStem(stem);
      const stemFirstSound = getClassicalNahuatlNncFirstSound(normalizedStem);
      const vowelInitialStem = isClassicalNahuatlNncVowelSound(stemFirstSound);
      const typedSourceAuthority = isClassicalNahuatlNncSourceAuthorityFrame(nncSourceAuthorityFrame) ? nncSourceAuthorityFrame : null;
      const sourcePossessorCompatibility = typedSourceAuthority?.possessorCompatibility || "";
      const relationKind = typedSourceAuthority ? sourcePossessorCompatibility === "relational-tla" ? "relational" : "nonrelational" : normalizeClassicalNahuatlNncToken(nounstemRelationKind).toLowerCase();
      const analogicalTlaAuthorized = typedSourceAuthority ? sourcePossessorCompatibility === "analogical-tla-derived" : analogicalTlaDerivedStem === true;
      const authorizedThirdPluralSt2Options = typedSourceAuthority?.thirdPluralPossessorSt2Options?.length ? typedSourceAuthority.thirdPluralPossessorSt2Options : ["m", "n"];
      const thirdPluralSt2CanvasFrame = normalizedPossessor === "3pl" ? resolveClassicalNahuatlThirdPluralPossessorSt2(normalizedStem) : null;
      let arity = "";
      let slots = [];
      let possessorRole = "";
      let blockReason = "";
      if (["reciprocal", "nonspecific-human", "nonspecific-nonhuman"].includes(normalizedPossessor)) {
        arity = "monadic";
        const carriers = {
          reciprocal: "ne",
          "nonspecific-human": "tē",
          "nonspecific-nonhuman": "tla"
        };
        possessorRole = normalizedPossessor;
        slots = [{
          id: "state",
          role: "st",
          carrier: carriers[normalizedPossessor],
          possessorRole
        }];
        if (
          normalizedPossessor === "reciprocal"
          && !["3sg", "3common", "3pl"].includes(normalizedSubject)
        ) {
          blockReason = "reciprocal-possessor-requires-third-person-subject";
        } else if (normalizedPossessor === "nonspecific-nonhuman" && relationKind !== "relational" && !analogicalTlaAuthorized) {
          blockReason = "tla-possessor-requires-relational-or-analogical-derived-nounstem";
        }
      } else if (["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"].includes(normalizedPossessor)) {
        arity = "dyadic";
        possessorRole = "specific";
        const st1ByPossessor = {
          "1sg": "n",
          "2sg": "m",
          "3sg": "ī",
          "1pl": "t",
          "2pl": "am",
          "3pl": "ī"
        };
        const possessorSt1 = normalizedPossessor === "3sg" && /^ih/u.test(normalizedStem)
          ? "i"
          : st1ByPossessor[normalizedPossessor];
        let st2 = "";
        if (["1sg", "2sg", "1pl", "2pl"].includes(normalizedPossessor)) {
          st2 = vowelInitialStem ? "⎕" : "o";
        } else if (normalizedPossessor === "3sg") {
          st2 = "0";
        } else {
          st2 = thirdPluralSt2CanvasFrame?.st2 || "";
          blockReason = thirdPluralSt2CanvasFrame?.authorizationStatus === "authorized" ? "" : thirdPluralSt2CanvasFrame?.blockReason || "third-plural-possessor-st2-following-sound-required";
        }
        slots = [{
          id: "state-person",
          role: "st1",
          carrier: possessorSt1,
          possessorPerson: normalizedPossessor
        }, {
          id: "state-number-case",
          role: "st2",
          carrier: st2,
          possessorPerson: normalizedPossessor
        }];
      } else {
        blockReason = "unknown-possessor-selection";
      }
      const complete = Boolean(arity && slots.length && slots.every(slot => slot.carrier) && !blockReason);
      return {
        kind: "classical-nahuatl-possessive-nnc-possessive-state-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: complete ? "authorized" : "blocked",
        blockReason,
        state: "possessive",
        arity,
        slots: complete ? slots : [],
        possessor: normalizedPossessor,
        subject: normalizedSubject,
        possessorRole,
        stem: normalizedStem,
        stemFirstSound,
        vowelInitialStem,
        nounstemRelationKind: relationKind || "not-specified",
        analogicalTlaDerivedStem: analogicalTlaDerivedStem === true,
        sourcePossessorCompatibility: sourcePossessorCompatibility || "legacy-call-options",
        authorizedThirdPluralPossessorSt2Options: authorizedThirdPluralSt2Options,
        selectedThirdPluralPossessorSt2: normalizedPossessor === "3pl" ? thirdPluralSt2CanvasFrame?.st2 || "" : "not-applicable",
        thirdPluralPossessorSt2CanvasFrame: thirdPluralSt2CanvasFrame,
        suppliedThirdPluralPossessorSt2: normalizedPossessor === "3pl" ? normalizeClassicalNahuatlNncToken(thirdPluralPossessorNumberMorph).toLowerCase() : "not-applicable",
        suppliedThirdPluralPossessorSt2Authority: false,
        st2SupportiveOrSilentBoundaryAction: ["1sg", "2sg", "1pl", "2pl"].includes(normalizedPossessor) ? vowelInitialStem ? "suppress-o-use-silent-repertory-mate" : "retain-short-o" : "not-applicable",
        legalWitnessTagIds: arity === "monadic" ? ["cn-l13-131-possessive-formulas", "cn-l13-134-monadic-possessor"] : ["cn-l13-131-possessive-formulas", "cn-l13-135-dyadic-possessor", "cn-l13-136-specific-possessor-inventory"]
      };
    }
    function resolveClassicalNahuatlLesson13PossessiveNumberDyad({
      subject = "3sg",
      stem = "",
      singularConnector = "",
      silentConnectorAuthorized = false,
      animacy = "",
      metaphoricalOverride = false
    } = {}) {
      const normalizedSubject = normalizeClassicalNahuatlNncSubject(subject);
      const normalizedStem = normalizeClassicalNahuatlNncStem(stem);
      const plural = normalizedSubject.endsWith("pl");
      const common = normalizedSubject === "3common";
      const stemFinalSound = getClassicalNahuatlNncLastSound(normalizedStem);
      const stemEndsVowel = isClassicalNahuatlNncVowelSound(stemFinalSound);
      const normalizedAnimacy = normalizeClassicalNahuatlNncToken(animacy).toLowerCase();
      let num1 = "";
      let num2 = "";
      let connectorRule = "";
      if (plural) {
        num1 = "hu";
        num2 = "ān";
        connectorRule = "lesson-13.2-possessive-plural-number-dyad";
      } else {
        const connector = normalizeClassicalNahuatlNncToken(singularConnector).toLowerCase().replace(/ø/gu, "0");
        if (connector === "uh" && stemEndsVowel) {
          num1 = "uh";
          num2 = "0";
          connectorRule = "lesson-13.2-uh-after-vowel-before-silent-num2";
        } else if (connector === "hui" && !stemEndsVowel) {
          num1 = "hui";
          num2 = "0";
          connectorRule = "lesson-13.2-hui-after-consonant";
        } else if (connector === "0" || connector === "zero") {
          num1 = "0";
          num2 = "0";
          connectorRule = "lesson-13.2-zero-morphologically-selected";
        } else if ((connector === "⎕" || connector === "silent") && silentConnectorAuthorized === true) {
          num1 = "⎕";
          num2 = "0";
          connectorRule = "lesson-14.7-tli-subclass2-lexically-authorized-silent-alternative";
        }
      }
      const authorized = Boolean(normalizedSubject && num1 && num2);
      return {
        kind: "classical-nahuatl-possessive-nnc-possessive-number-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized ? "" : plural ? "unknown-nnc-subject" : "possessive-singular-connector-must-match-stem-boundary-and-lexical-selection",
        subject: normalizedSubject,
        subjectNumber: plural ? "plural" : common ? "common" : "singular",
        stem: normalizedStem,
        stemFinalSound,
        num1: authorized ? num1 : "",
        num2: authorized ? num2 : "",
        connectorRule,
        silentConnectorAuthorized: silentConnectorAuthorized === true,
        animacy: normalizedAnimacy || "not-specified",
        metaphoricalOverride: metaphoricalOverride === true,
        numberBelongsTo: "subject-personal-pronoun",
        uhHuIsPossessiveSuffix: false,
        legalWitnessTagIds: ["cn-l13-132-possessive-subject-number", "cn-l13-133-possessive-subject-paradigm"]
      };
    }
    function buildClassicalNahuatlNncSlotFrame({
      sourceFrameKind = "",
      sourceAuthorizationStatus = "",
      stem = "",
      stateFrame = null,
      personFrame = null,
      participantFrame = null,
      numberFrame = null,
      formulaArtifact = "",
      appliedOperationIds = [],
      resultOperationId = "",
      requestedOutputKind = "",
      nncFamily = "ordinary"
    } = {}) {
      const predicateStem = normalizeClassicalNahuatlNncStem(stem);
      const stateArity = stateFrame?.arity || "vacant";
      const stateSlots = Array.isArray(stateFrame?.slots) ? stateFrame.slots.map(cloneClassicalNahuatlNncValue) : [];
      const stateAuthorized = stateFrame?.authorizationStatus === "authorized" && (stateArity !== "vacant" || stateSlots.length === 0);
      const participantArity = participantFrame?.arity || "vacant";
      const participantSlots = Array.isArray(participantFrame?.slots)
        ? participantFrame.slots.map(cloneClassicalNahuatlNncValue)
        : [];
      const participantAuthorized = !participantFrame
        || (
          participantFrame.authorizationStatus === "authorized"
          && participantArity === "dyadic"
          && participantSlots.length === 2
          && participantSlots[0]?.role === "va1"
          && participantSlots[1]?.role === "va2"
          && participantSlots.every(slot => Boolean(slot?.carrier))
        );
      const complete = Boolean(sourceAuthorizationStatus === "authorized" && predicateStem && stateAuthorized && participantAuthorized && personFrame?.authorizationStatus === "authorized" && personFrame?.pers1 && personFrame?.pers2 && numberFrame?.authorizationStatus === "authorized" && numberFrame?.num1 && numberFrame?.num2);
      const slotFrame = {
        kind: "classical-nahuatl-nnc-slot-frame",
        version: CLASSICAL_NAHUATL_NNC_LAYER_VERSION,
        frameRole: "typed-nnc-authority",
        nncFamily: normalizeClassicalNahuatlNncToken(nncFamily || "ordinary"),
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        sourceFrameKind: normalizeClassicalNahuatlNncToken(sourceFrameKind),
        sourceAuthorizationStatus,
        authorizationStatus: complete ? "authorized" : "blocked",
        blockReason: complete ? "" : "incomplete-or-unauthorized-typed-nnc-slots",
        appliedOperationIds: Array.from(new Set(Array.isArray(appliedOperationIds) ? appliedOperationIds.map(normalizeClassicalNahuatlNncToken).filter(Boolean) : [])),
        resultOperationId: normalizeClassicalNahuatlNncToken(resultOperationId),
        requestedOutputKind: normalizeClassicalNahuatlNncToken(requestedOutputKind),
        slotOrder: ["pers1", "pers2", "participant", "state", "stem", "num1", "num2"],
        slots: {
          subject: {
            pers1: complete ? personFrame.pers1 : "",
            pers2: complete ? personFrame.pers2 : "",
            subject: personFrame?.subject || "",
            pers1BaseMorph: complete ? personFrame.pers1BaseMorph : "",
            supportiveISurfacePolicy: complete ? personFrame.supportiveISurfacePolicy : "",
            supportiveISurfaceAction: complete ? personFrame.supportiveISurfaceAction : "",
            supportiveISurfaceReason: complete ? personFrame.supportiveISurfaceReason : ""
          },
          participant: {
            arity: participantArity,
            role: participantFrame?.role || "",
            slots: complete ? participantSlots : []
          },
          state: {
            arity: stateArity,
            slots: complete ? stateSlots : []
          },
          predicate: {
            stem: complete ? predicateStem : "",
            tenseSlot: "none"
          },
          number: {
            num1: complete ? numberFrame.num1 : "",
            num2: complete ? numberFrame.num2 : "",
            belongsTo: "subject-personal-pronoun"
          }
        },
        nounClass: numberFrame?.nounClass || "",
        nounClassAuthority: numberFrame?.nounClassAuthority || (numberFrame?.nounClass ? "typed-number-frame" : ""),
        referentCategory: numberFrame?.referentCategory || "",
        referentCategoryAuthority: numberFrame?.referentCategoryAuthority || "",
        subjectNumber: numberFrame?.subjectNumber || "",
        subjectAnimacy: numberFrame?.animacy || "",
        metaphoricalUse: numberFrame?.metaphoricalOverride === true,
        sourceFormulaArtifact: normalizeClassicalNahuatlNncToken(formulaArtifact),
        formulaArtifactAuthority: "display-only-not-authority",
        formulaStringAuthority: false,
        tenseSlot: "none",
        valenceSlot: "not-applicable",
      };
      slotFrame.semanticIdentity = complete ? [personFrame.pers1, personFrame.pers2, participantArity, ...participantSlots.map(slot => slot.carrier), stateArity, ...stateSlots.map(slot => slot.carrier), predicateStem, numberFrame.num1, numberFrame.num2].join("|") : "";
      return slotFrame;
    }
    function isClassicalNahuatlNncSlotFrame(frame = null) {
      if (!frame || frame.kind !== "classical-nahuatl-nnc-slot-frame" || frame.authorizationStatus !== "authorized") {
        return false;
      }
      const subject = frame.slots?.subject || {};
      const participant = frame.slots?.participant || { arity: "vacant", slots: [] };
      const state = frame.slots?.state || {};
      const predicate = frame.slots?.predicate || {};
      const number = frame.slots?.number || {};
      if (!subject.pers1 || !subject.pers2 || !predicate.stem || !number.num1 || !number.num2 || predicate.tenseSlot !== "none") {
        return false;
      }
      if (!["vacant", "monadic", "dyadic", "reduplicated-dyadic"].includes(state.arity) || !Array.isArray(state.slots)) {
        return false;
      }
      if (
        !["vacant", "dyadic"].includes(participant.arity)
        || !Array.isArray(participant.slots)
        || (participant.arity === "vacant" && participant.slots.length !== 0)
        || (
          participant.arity === "dyadic"
          && (
            participant.slots.length !== 2
            || participant.slots[0]?.role !== "va1"
            || participant.slots[1]?.role !== "va2"
            || participant.slots.some(slot => !slot?.carrier)
          )
        )
      ) {
        return false;
      }
      if (state.arity === "vacant" && state.slots.length !== 0) {
        return false;
      }
      if (state.arity === "monadic" && (state.slots.length !== 1 || state.slots[0]?.role !== "st" || !state.slots[0]?.carrier)) {
        return false;
      }
      if (state.arity === "dyadic" && (state.slots.length !== 2 || state.slots[0]?.role !== "st1" || state.slots[1]?.role !== "st2")) {
        return false;
      }
      if (state.arity === "reduplicated-dyadic" && (state.slots.length !== 4 || state.slots.some(slot => !slot?.carrier) || state.slots.map(slot => slot.role).join("|") !== "st1|st2|st1|st2")) {
        return false;
      }
      return frame.formulaStringAuthority === false && frame.formulaArtifactAuthority === "display-only-not-authority";
    }
    function renderClassicalNahuatlNncSlotFrameFormula(frame = null) {
      if (!isClassicalNahuatlNncSlotFrame(frame)) {
        return "";
      }
      const subject = frame.slots.subject;
      const participant = frame.slots.participant || { arity: "vacant", slots: [] };
      const state = frame.slots.state;
      const predicate = frame.slots.predicate;
      const number = frame.slots.number;
      let stateDisplay = "";
      const participantDisplay = participant.arity === "dyadic"
        ? `+${participant.slots[0].carrier}-${participant.slots[1].carrier}`
        : "";
      if (state.arity === "monadic") {
        stateDisplay = `+${state.slots[0].carrier}`;
      } else if (state.arity === "dyadic") {
        stateDisplay = `+${state.slots[0].carrier}-${state.slots[1].carrier}`;
      } else if (state.arity === "reduplicated-dyadic") {
        stateDisplay = `+${state.slots[0].carrier}-${state.slots[1].carrier}-${state.slots[2].carrier}-${state.slots[3].carrier}`;
      }
      return `#${subject.pers1}-${subject.pers2}${participantDisplay}${stateDisplay}(${predicate.stem})${number.num1}-${number.num2}#`;
    }
    function realizeClassicalNahuatlNncSurfaceCarrier(value = "") {
      return normalizeClassicalNahuatlNncToken(value).split("-").map(part => part.trim()).filter(part => part && !["0", "Ø", "⎕"].includes(part)).join("");
    }
    function realizeClassicalNahuatlNncContextualBoundarySurface(
      nncSlotFrame = null,
      rawSurface = ""
    ) {
      const surface = normalizeClassicalNahuatlNncToken(rawSurface);
      const predicateStem = normalizeClassicalNahuatlNncStem(
        nncSlotFrame?.slots?.predicate?.stem
      );
      const number = nncSlotFrame?.slots?.number || {};
      const state = nncSlotFrame?.slots?.state || {};
      if (
        predicateStem === "ātōl"
        && nncSlotFrame?.nounClass === "tli"
        && number.num1 === "li"
        && number.num2 === "0"
        && surface.endsWith("ātōlli")
      ) {
        return `${surface.slice(0, -"ātōlli".length)}ātollī`;
      }
      if (
        predicateStem === "cn-īuh"
        && state.arity === "dyadic"
        && surface.includes("cnīuh")
      ) {
        return surface.replace("cnīuh", "cnūh");
      }
      return surface;
    }
    function capitalizeClassicalNahuatlNncSentenceInitial(value = "") {
      const text = String(value || "");
      return text ? text.charAt(0).toUpperCase() + text.slice(1) : "";
    }
    function buildClassicalNahuatlNncSentenceSurfaceFrame(nncSlotFrame = null, options = {}) {
      const sentenceTypeKey = normalizeClassicalNahuatlNncToken(options.sentenceType || "assertion").toLowerCase().replace(/[\s_]/gu, "-");
      const sentenceTypeAliases = {
        assertion: "assertion",
        statement: "assertion",
        question: "yes-no-intonation",
        "question-intonation": "yes-no-intonation",
        "yes-no-intonation": "yes-no-intonation",
        cuix: "yes-no-cuix",
        "question-cuix": "yes-no-cuix",
        "yes-no-cuix": "yes-no-cuix",
        "information-question": "information-question",
        emphatic: "emphatic",
        wish: "wish"
      };
      const requestedSentenceType = sentenceTypeAliases[sentenceTypeKey] || "";
      const polarity = normalizeClassicalNahuatlNncToken(options.polarity || "positive").toLowerCase();
      const discourseFrame = options.discourseFrame?.kind === "classical-nahuatl-pronominal-nnc-pronominal-discourse-frame" ? options.discourseFrame : null;
      const lesson16InformationQuestion = Boolean(discourseFrame?.inherentInterrogative && discourseFrame?.interrogativeReadingActive && polarity === "positive");
      const dependentClauseIntroducedByIn = discourseFrame?.dependentClauseIntroducedByIn === true;
      const fusedAdjunctorInSurface =
        discourseFrame?.adjunctorInFrame?.ellipsisSelected === true
          ? discourseFrame.adjunctorInFrame.fusedSurface
          : "";
      const sentenceType = lesson16InformationQuestion ? "information-question" : requestedSentenceType === "information-question" ? "assertion" : requestedSentenceType;
      const typedNnc = isClassicalNahuatlNncSlotFrame(nncSlotFrame);
      const sentenceTypeKnown = Boolean(sentenceType);
      const polarityKnown = ["positive", "negative"].includes(polarity);
      const compositionOperationIds = typedNnc
        ? [...nncSlotFrame.appliedOperationIds, "nnc-sentence-composition"]
        : ["nnc-sentence-composition"];
      const grammarOperationEvaluationFrame = buildClassicalNahuatlNncOperationEvaluationFrame({
        nncSlotFrame,
        appliedOperationIds: compositionOperationIds,
        requiredOperationIds: compositionOperationIds,
        resultOperationId: "nnc-sentence-composition",
        requestedOutputKind: "selected-nnc-sentence-surface"
      });
      const authorized = typedNnc && sentenceTypeKnown && polarityKnown && grammarOperationEvaluationFrame.authorizationStatus === "authorized";
      const blockReason = authorized ? "" : !typedNnc ? "authorized-typed-nnc-slot-frame-required" : !sentenceTypeKnown ? "unknown-nnc-sentence-type" : !polarityKnown ? "unknown-nnc-sentence-polarity" : grammarOperationEvaluationFrame.blockReason;
      const baseNncFormula = authorized ? renderClassicalNahuatlNncSlotFrameFormula(nncSlotFrame) : "";
      const slots = nncSlotFrame?.slots || {};
      const participantCarriers = Array.isArray(slots.participant?.slots) ? slots.participant.slots.map(slot => slot?.carrier || "") : [];
      const stateCarriers = Array.isArray(slots.state?.slots) ? slots.state.slots.map(slot => slot?.carrier || "") : [];
      const canonicalNuclearSurfaceBeforeBoundary = authorized ? [slots.subject?.pers1, slots.subject?.pers2, ...participantCarriers, ...stateCarriers, slots.predicate?.stem, slots.number?.num1, slots.number?.num2].map(realizeClassicalNahuatlNncSurfaceCarrier).join("") : "";
      const canonicalNuclearSurface = authorized
        ? realizeClassicalNahuatlNncContextualBoundarySurface(
            nncSlotFrame,
            canonicalNuclearSurfaceBeforeBoundary
          )
        : "";
      const nuclearSurface = fusedAdjunctorInSurface || canonicalNuclearSurface;
      const lesson16WhatPersonNegative =
        polarity === "negative"
        && nncSlotFrame?.pronominalSubtypeDetail === "what-person";
      const negativePrefix = polarity === "negative"
        ? sentenceType === "wish"
          ? "ca"
          : lesson16WhatPersonNegative
            ? "ay"
            : "ah"
        : "";
      const sentenceParticles = sentenceType === "emphatic" ? ["ca"] : sentenceType === "yes-no-cuix" ? ["cuix"] : sentenceType === "wish" ? ["mā"] : [];
      const finalPunctuation = ["information-question", "yes-no-intonation", "yes-no-cuix"].includes(sentenceType) ? "?" : ".";
      const sentenceWords = authorized ? [...sentenceParticles, `${negativePrefix}${nuclearSurface}`, ...(dependentClauseIntroducedByIn ? ["in", "…"] : [])].filter(Boolean) : [];
      const sentenceSurface = authorized ? `${capitalizeClassicalNahuatlNncSentenceInitial(sentenceWords.join(" "))}${finalPunctuation}` : "";
      const adjunctorFormula = fusedAdjunctorInSurface ? `${baseNncFormula} +in` : baseNncFormula;
      const prefixalFormula = negativePrefix && adjunctorFormula.startsWith("#") ? `${negativePrefix}#${adjunctorFormula.slice(1)}` : adjunctorFormula;
      const sentenceFormulaWords = [...sentenceParticles.map(capitalizeClassicalNahuatlNncSentenceInitial), prefixalFormula, ...(dependentClauseIntroducedByIn ? ["in", "…"] : [])].filter(Boolean);
      const sentenceFormulaDisplay = authorized ? `${sentenceFormulaWords.join(" ")}${finalPunctuation}` : "";
      const frame = Object.freeze({
        kind: "classical-nahuatl-nnc-sentence-surface-frame",
        lesson: lesson16InformationQuestion ? "Andrews Lesson 16.4" : "Andrews Lesson 15.3",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason,
        sentenceSurfaceApplies: authorized,
        requestedSentenceType,
        sentenceType,
        polarity,
        discourseFrame,
        dependentClauseIntroducedByIn,
        fusedAdjunctorInSurface,
        dependentClausePlaceholder: dependentClauseIntroducedByIn ? "…" : "",
        adjunctWritingPolicy: discourseFrame?.adjunctorInFrame?.writingPolicy || (dependentClauseIntroducedByIn ? "write-pronominal-nnc-and-in-separately" : "no-dependent-clause-writing-decision"),
        adjunctorInFrame: discourseFrame?.adjunctorInFrame || null,
        inherentInterrogative: discourseFrame?.inherentInterrogative === true,
        interrogativeReadingActive: discourseFrame?.interrogativeReadingActive === true,
        predicateKind: normalizeClassicalNahuatlNncToken(options.predicateKind || "equative").toLowerCase(),
        sourceNncSlotFrame: authorized ? nncSlotFrame : null,
        baseNncFormula,
        sentenceFormulaDisplay,
        sentenceSurface,
        nuclearSurface,
        canonicalNuclearSurfaceBeforeBoundary,
        canonicalNuclearSurface,
        sentenceParticles,
        sentencePrefixalStack: negativePrefix ? [`${negativePrefix}#`] : [],
        sentencePrefixalStackAttachment: negativePrefix ? "prefixal-polarity-attached-at-left-edge" : "none",
        lesson16WhatPersonNegativeAllomorph: lesson16WhatPersonNegative ? "ay-" : "not-applicable",
        finalPunctuation,
        consumedNuclearClauseStatus: authorized ? "complete" : "unavailable",
        consumedNuclearClauseRole: "complete-typed-nnc-input-to-sentence-composition",
        sentenceCompositionOperationId: "nnc-sentence-composition",
        grammarOperationEvaluationFrame,
        curriculumOrderAuthority: false,
        sentenceSurfaceAuthority: "typed-nnc-plus-authorized-sentence-composition",
        sentenceSurfaceRealizedHere: authorized,
        typedSlotAuthority: true,
        formulaStringAuthority: false,
        formulaArtifactAuthority: "display-only-not-authority",
        legalWitnessTagIds: lesson16InformationQuestion ? ["cn-l15-153-sentence-structure", "cn-l16-164-identificational-interrogative"] : ["cn-l15-153-sentence-structure"]
      });
      if (authorized) {
        issuedNncSentenceSurfaceFrames.set(frame, Object.freeze({
          sourceNncSlotFrame: frame.sourceNncSlotFrame,
          baseNncFormula: frame.baseNncFormula,
          canonicalNuclearSurface: frame.canonicalNuclearSurface,
          sentenceFormulaDisplay: frame.sentenceFormulaDisplay,
          sentenceSurface: frame.sentenceSurface,
          sentenceType: frame.sentenceType,
          polarity: frame.polarity
        }));
      }
      return frame;
    }
    function isClassicalNahuatlIssuedNncSentenceSurfaceFrame(frame = null) {
      const receipt = frame && typeof frame === "object"
        ? issuedNncSentenceSurfaceFrames.get(frame)
        : null;
      return Boolean(
        receipt
        && frame.kind === "classical-nahuatl-nnc-sentence-surface-frame"
        && frame.authorizationStatus === "authorized"
        && frame.formulaStringAuthority === false
        && frame.typedSlotAuthority === true
        && frame.sourceNncSlotFrame === receipt.sourceNncSlotFrame
        && isClassicalNahuatlNncSlotFrame(frame.sourceNncSlotFrame)
        && frame.baseNncFormula === receipt.baseNncFormula
        && frame.canonicalNuclearSurface === receipt.canonicalNuclearSurface
        && frame.sentenceFormulaDisplay === receipt.sentenceFormulaDisplay
        && frame.sentenceSurface === receipt.sentenceSurface
        && frame.sentenceType === receipt.sentenceType
        && frame.polarity === receipt.polarity
      );
    }
    function buildClassicalNahuatlExotlInterpretationSource(
      sentenceSurfaceFrame = null,
    ) {
      const slot = sentenceSurfaceFrame?.sourceNncSlotFrame;
      const exact = isClassicalNahuatlIssuedNncSentenceSurfaceFrame(
        sentenceSurfaceFrame,
      )
        && slot?.slots?.subject?.subject === "3sg"
        && slot?.slots?.predicate?.stem === "exō"
        && slot?.slots?.number?.num1 === "tl"
        && slot?.slots?.number?.num2 === "0"
        && sentenceSurfaceFrame.canonicalNuclearSurface === "exōtl";
      const source = Object.freeze({
        kind: "classical-nahuatl-exotl-interpretation-source",
        version: 1,
        authorizationStatus: exact ? "authorized" : "blocked",
        blockReason: exact ? "" : "canonical-exotl-nnc-sentence-required",
        sentenceSurfaceFrame: exact ? sentenceSurfaceFrame : null,
        canonicalNuclearSurface: exact ? "exōtl" : "",
        translationAuthority: false,
        surfaceStringAuthority: false,
        callerSuppliedAuthorityAccepted: false,
      });
      issuedExotlInterpretationSources.add(source);
      return source;
    }
    function isClassicalNahuatlExotlInterpretationSource(source = null) {
      return Boolean(
        source
        && issuedExotlInterpretationSources.has(source)
        && source.kind === "classical-nahuatl-exotl-interpretation-source"
        && source.version === 1
        && source.authorizationStatus === "authorized"
        && isClassicalNahuatlIssuedNncSentenceSurfaceFrame(
          source.sentenceSurfaceFrame,
        )
        && source.canonicalNuclearSurface === "exōtl"
        && source.translationAuthority === false
        && source.surfaceStringAuthority === false
        && source.callerSuppliedAuthorityAccepted === false
        && Object.isFrozen(source)
      );
    }
    function evaluateClassicalNahuatlExotlInterpretation(source = null) {
      const authorized = isClassicalNahuatlExotlInterpretationSource(source);
      const result = Object.freeze({
        kind: "classical-nahuatl-exotl-interpretation-result",
        version: 1,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized ? "" : "owner-issued-exotl-interpretation-source-required",
        semanticOwnerId: "classical-nuclear-clause-structure",
        operationId: "classical.nnc.exotl.interpret",
        canonicalResult: authorized ? "exōtl" : "",
        canonicalFormula: authorized ? "#0-0(exō)tl-0#" : "",
        nuclearClauseKind: authorized ? "nominal-nuclear-clause" : "",
        completeClause: authorized,
        wordPhrase: false,
        subject: authorized ? Object.freeze({ person: "third", number: "singular", sounded: false }) : Object.freeze({}),
        predicate: authorized ? Object.freeze({
          nounstem: "exō",
          absolutiveNumberMorph: "tl",
          referentHumanness: "nonhuman",
        }) : Object.freeze({}),
        compositionalMeaning: authorized
          ? "it-is-a-green-thing-in-the-form-of-a-bean"
          : "",
        semanticWeighting: authorized ? Object.freeze({
          primary: "green-quality",
          secondary: "bean-form-entity",
          relation: "quality-predicated-of-a-nonhuman-entity-form",
        }) : Object.freeze({}),
        englishGreenBeanAuthority: false,
        reversedWeightingAllowed: false,
        ownerExecutionCompleted: authorized,
        grammarGenerationAllowed: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        translationAuthority: false,
        callerSuppliedAuthorityAccepted: false,
      });
      if (authorized) issuedExotlInterpretationResults.add(result);
      return result;
    }
    function isClassicalNahuatlExotlInterpretationResult(result = null) {
      return Boolean(
        result
        && issuedExotlInterpretationResults.has(result)
        && result.kind === "classical-nahuatl-exotl-interpretation-result"
        && result.version === 1
        && result.authorizationStatus === "authorized"
        && result.semanticOwnerId === "classical-nuclear-clause-structure"
        && result.operationId === "classical.nnc.exotl.interpret"
        && result.canonicalResult === "exōtl"
        && result.canonicalFormula === "#0-0(exō)tl-0#"
        && result.nuclearClauseKind === "nominal-nuclear-clause"
        && result.completeClause === true
        && result.wordPhrase === false
        && result.subject?.person === "third"
        && result.subject?.number === "singular"
        && result.subject?.sounded === false
        && result.predicate?.nounstem === "exō"
        && result.predicate?.absolutiveNumberMorph === "tl"
        && result.predicate?.referentHumanness === "nonhuman"
        && result.compositionalMeaning === "it-is-a-green-thing-in-the-form-of-a-bean"
        && result.semanticWeighting?.primary === "green-quality"
        && result.semanticWeighting?.secondary === "bean-form-entity"
        && result.semanticWeighting?.relation === "quality-predicated-of-a-nonhuman-entity-form"
        && result.englishGreenBeanAuthority === false
        && result.reversedWeightingAllowed === false
        && result.ownerExecutionCompleted === true
        && result.grammarGenerationAllowed === false
        && result.formulaStringAuthority === false
        && result.surfaceStringAuthority === false
        && result.translationAuthority === false
        && result.callerSuppliedAuthorityAccepted === false
        && Object.isFrozen(result)
      );
    }
    function buildClassicalNahuatlTlehAdmonitoryPairSource(
      tlehFrame = null,
      knowingFrame = null,
      knowerFrame = null,
    ) {
      const tlehSlot = tlehFrame?.nncSlotFrame;
      const exactTleh = isClassicalNahuatlNncSlotFrame(tlehSlot)
        && tlehSlot.slots?.subject?.subject === "3sg"
        && tlehSlot.slots?.predicate?.stem === "tl-eh"
        && tlehSlot.slots?.number?.num1 === "0"
        && tlehFrame.formulaRealization === "#0-0(tl-eh)0-0#";
      const exactKnowing = targetObject.isClassicalNahuatlVncApplicationFrame?.(knowingFrame) === true
        && knowingFrame.normalizedRequest?.sourceStem === "momachītia"
        && knowingFrame.normalizedRequest?.subject === "2sg"
        && knowingFrame.normalizedRequest?.sourceValence === "transitive"
        && knowingFrame.normalizedRequest?.mood === "indicative"
        && knowingFrame.normalizedRequest?.tense === "present"
        && knowingFrame.resultFrame?.surfaceRealization === "ticmomachītia";
      const exactKnower = targetObject.isClassicalNahuatlVncApplicationFrame?.(knowerFrame) === true
        && knowerFrame.normalizedRequest?.sourceStem === "matcātzintli"
        && knowerFrame.normalizedRequest?.subject === "2sg"
        && knowerFrame.normalizedRequest?.sourceValence === "transitive"
        && knowerFrame.normalizedRequest?.mood === "indicative"
        && knowerFrame.normalizedRequest?.tense === "present"
        && knowerFrame.resultFrame?.surfaceRealization === "ticmatcātzintli";
      const authorized = exactTleh && exactKnowing && exactKnower;
      const source = Object.freeze({
        kind: "classical-nahuatl-tleh-admonitory-pair-source",
        version: 1,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized ? "" : "canonical-tleh-and-two-vnc-results-required",
        tlehSlotFrame: authorized ? tlehSlot : null,
        knowingFrame: authorized ? knowingFrame : null,
        knowerFrame: authorized ? knowerFrame : null,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        translationAuthority: false,
        callerSuppliedAuthorityAccepted: false,
      });
      issuedTlehAdmonitoryPairSources.add(source);
      return source;
    }
    function isClassicalNahuatlTlehAdmonitoryPairSource(source = null) {
      return Boolean(
        source
        && issuedTlehAdmonitoryPairSources.has(source)
        && source.kind === "classical-nahuatl-tleh-admonitory-pair-source"
        && source.version === 1
        && source.authorizationStatus === "authorized"
        && isClassicalNahuatlNncSlotFrame(source.tlehSlotFrame)
        && source.tlehSlotFrame.slots?.subject?.subject === "3sg"
        && source.tlehSlotFrame.slots?.predicate?.stem === "tl-eh"
        && targetObject.isClassicalNahuatlVncApplicationFrame?.(source.knowingFrame) === true
        && targetObject.isClassicalNahuatlVncApplicationFrame?.(source.knowerFrame) === true
        && source.knowingFrame.resultFrame?.surfaceRealization === "ticmomachītia"
        && source.knowerFrame.resultFrame?.surfaceRealization === "ticmatcātzintli"
        && source.formulaStringAuthority === false
        && source.surfaceStringAuthority === false
        && source.translationAuthority === false
        && source.callerSuppliedAuthorityAccepted === false
        && Object.isFrozen(source)
      );
    }
    function evaluateClassicalNahuatlTlehAdmonitoryPair(source = null) {
      const authorized = isClassicalNahuatlTlehAdmonitoryPairSource(source);
      const result = Object.freeze({
        kind: "classical-nahuatl-tleh-admonitory-pair-result",
        version: 1,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized ? "" : "owner-issued-tleh-admonitory-pair-source-required",
        semanticOwnerId: "classical-nuclear-clause-structure",
        operationId: "classical.sentence.tleh-admonitory-pair.interpret",
        canonicalQuestions: authorized ? Object.freeze([
          "Tleh ticmomachītia?",
          "Tleh ticmatcātzintli?",
        ]) : Object.freeze([]),
        questionMeanings: authorized ? Object.freeze([
          "what-is-it-that-you-honored-one-know",
          "what-is-it-that-you-honored-one-are-a-knower-of",
        ]) : Object.freeze([]),
        subjects: authorized ? Object.freeze([
          Object.freeze({ person: "second", number: "singular", humanness: "human", honorific: true, role: "knower" }),
          Object.freeze({ person: "second", number: "singular", humanness: "human", honorific: true, role: "knower" }),
        ]) : Object.freeze([]),
        interrogativeObject: authorized ? Object.freeze({ form: "tleh", humanness: "nonhuman", role: "thing-known" }) : Object.freeze({}),
        pairDiscourse: authorized ? Object.freeze({
          rhetorical: true,
          pragmaticFunctions: Object.freeze(["challenge", "wake-up-call"]),
          expectedAnswer: "nothing",
          comfortingWish: false,
          goodCheerAndRestMeaning: false,
        }) : Object.freeze({}),
        ownerExecutionCompleted: authorized,
        translationAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        callerSuppliedAuthorityAccepted: false,
      });
      if (authorized) issuedTlehAdmonitoryPairResults.add(result);
      return result;
    }
    function isClassicalNahuatlTlehAdmonitoryPairResult(result = null) {
      return Boolean(
        result
        && issuedTlehAdmonitoryPairResults.has(result)
        && result.kind === "classical-nahuatl-tleh-admonitory-pair-result"
        && result.authorizationStatus === "authorized"
        && result.semanticOwnerId === "classical-nuclear-clause-structure"
        && result.operationId === "classical.sentence.tleh-admonitory-pair.interpret"
        && result.canonicalQuestions?.[0] === "Tleh ticmomachītia?"
        && result.canonicalQuestions?.[1] === "Tleh ticmatcātzintli?"
        && result.questionMeanings?.[0] === "what-is-it-that-you-honored-one-know"
        && result.questionMeanings?.[1] === "what-is-it-that-you-honored-one-are-a-knower-of"
        && result.subjects?.every(subject => subject.person === "second" && subject.number === "singular" && subject.humanness === "human" && subject.honorific === true)
        && result.interrogativeObject?.form === "tleh"
        && result.interrogativeObject?.humanness === "nonhuman"
        && result.interrogativeObject?.role === "thing-known"
        && result.pairDiscourse?.rhetorical === true
        && result.pairDiscourse?.pragmaticFunctions?.includes("challenge")
        && result.pairDiscourse?.pragmaticFunctions?.includes("wake-up-call")
        && result.pairDiscourse?.expectedAnswer === "nothing"
        && result.pairDiscourse?.comfortingWish === false
        && result.pairDiscourse?.goodCheerAndRestMeaning === false
        && result.ownerExecutionCompleted === true
        && result.translationAuthority === false
        && result.callerSuppliedAuthorityAccepted === false
        && Object.isFrozen(result)
      );
    }
    function buildClassicalNahuatlTlehClosingVocativeSource(pairResult = null) {
      const authorized = isClassicalNahuatlTlehAdmonitoryPairResult(pairResult);
      const source = Object.freeze({
        kind: "classical-nahuatl-tleh-closing-vocative-source",
        version: 1,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized ? "" : "canonical-tleh-admonitory-pair-result-required",
        pairResult: authorized ? pairResult : null,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        translationAuthority: false,
        callerSuppliedAuthorityAccepted: false,
      });
      issuedTlehClosingVocativeSources.add(source);
      return source;
    }
    function isClassicalNahuatlTlehClosingVocativeSource(source = null) {
      return Boolean(
        source
        && issuedTlehClosingVocativeSources.has(source)
        && source.kind === "classical-nahuatl-tleh-closing-vocative-source"
        && source.authorizationStatus === "authorized"
        && isClassicalNahuatlTlehAdmonitoryPairResult(source.pairResult)
        && source.formulaStringAuthority === false
        && source.surfaceStringAuthority === false
        && source.translationAuthority === false
        && source.callerSuppliedAuthorityAccepted === false
        && Object.isFrozen(source)
      );
    }
    function evaluateClassicalNahuatlTlehClosingVocative(source = null) {
      const authorized = isClassicalNahuatlTlehClosingVocativeSource(source);
      const result = Object.freeze({
        kind: "classical-nahuatl-tleh-closing-vocative-result",
        version: 1,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized ? "" : "owner-issued-tleh-closing-vocative-source-required",
        semanticOwnerId: "classical-nuclear-clause-structure",
        operationId: "classical.sentence.tleh-closing-vocative.interpret",
        returnsToEarlierRhetoricalQuestion: authorized,
        canonicalQuestion: authorized
          ? "Tleh ticmatcātzintli, tlazohtitlācatle, totēucyōe?"
          : "",
        principalClauseMeaning: authorized ? "you-are-ignorant" : "",
        principalSubject: authorized ? Object.freeze({
          person: "second",
          number: "singular",
          humanness: "human",
          honorific: true,
        }) : Object.freeze({}),
        vocatives: authorized ? Object.freeze([
          Object.freeze({ form: "tlazohtitlācatle", meaning: "O-valued-person", addressee: "same-honored-singular-human-woman" }),
          Object.freeze({ form: "totēucyōe", meaning: "O-our-lady", addressee: "same-honored-singular-human-woman" }),
        ]) : Object.freeze([]),
        rejectedRestInPeaceMeaning: authorized,
        pragmaticFunctions: authorized ? Object.freeze([
          "remind-addressee-of-her-ignorance",
          "instruct-addressee-to-think-carefully-about-preceding-advice",
        ]) : Object.freeze([]),
        sourceCitation: authorized ? "Anderson-and-Dibble-VI-page-185" : "",
        citedSpeechEvidenceSupportsReading: authorized,
        citedSpeechAuthority: false,
        takeThingsEasyMeaning: false,
        prepareForPossibleDisasterMeaning: authorized,
        culturallyFamiliarMindsetCanMaskInadequateTranslation: authorized,
        ownerExecutionCompleted: authorized,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        translationAuthority: false,
        callerSuppliedAuthorityAccepted: false,
      });
      if (authorized) issuedTlehClosingVocativeResults.add(result);
      return result;
    }
    function isClassicalNahuatlTlehClosingVocativeResult(result = null) {
      return Boolean(
        result
        && issuedTlehClosingVocativeResults.has(result)
        && result.kind === "classical-nahuatl-tleh-closing-vocative-result"
        && result.authorizationStatus === "authorized"
        && result.semanticOwnerId === "classical-nuclear-clause-structure"
        && result.operationId === "classical.sentence.tleh-closing-vocative.interpret"
        && result.returnsToEarlierRhetoricalQuestion === true
        && result.canonicalQuestion === "Tleh ticmatcātzintli, tlazohtitlācatle, totēucyōe?"
        && result.principalClauseMeaning === "you-are-ignorant"
        && result.principalSubject?.person === "second"
        && result.principalSubject?.number === "singular"
        && result.principalSubject?.honorific === true
        && result.vocatives?.[0]?.form === "tlazohtitlācatle"
        && result.vocatives?.[0]?.meaning === "O-valued-person"
        && result.vocatives?.[1]?.form === "totēucyōe"
        && result.vocatives?.[1]?.meaning === "O-our-lady"
        && result.vocatives?.every(vocative => vocative.addressee === "same-honored-singular-human-woman")
        && result.rejectedRestInPeaceMeaning === true
        && result.pragmaticFunctions?.includes("remind-addressee-of-her-ignorance")
        && result.pragmaticFunctions?.includes("instruct-addressee-to-think-carefully-about-preceding-advice")
        && result.sourceCitation === "Anderson-and-Dibble-VI-page-185"
        && result.citedSpeechEvidenceSupportsReading === true
        && result.citedSpeechAuthority === false
        && result.takeThingsEasyMeaning === false
        && result.prepareForPossibleDisasterMeaning === true
        && result.culturallyFamiliarMindsetCanMaskInadequateTranslation === true
        && result.ownerExecutionCompleted === true
        && result.translationAuthority === false
        && result.callerSuppliedAuthorityAccepted === false
        && Object.isFrozen(result)
      );
    }
    function buildClassicalNahuatlKingPraiseRoleContrastSource(
      actualMerit = null,
      actualBoon = null,
      reversedMerit = null,
      reversedBoon = null,
    ) {
      const exact = [actualMerit, actualBoon, reversedMerit, reversedBoon]
        .every(frame => isClassicalNahuatlIssuedNncSentenceSurfaceFrame(frame))
        && actualMerit.canonicalNuclearSurface === "tīmahcēhualti"
        && actualMerit.baseNncFormula === "#t-0+ī-0(mahcēhualti)0-0#"
        && actualBoon.canonicalNuclearSurface === "tīcnōpilti"
        && actualBoon.baseNncFormula === "#t-0+ī-0(cnōpilti)0-0#"
        && reversedMerit.canonicalNuclearSurface === "momahcēhualti"
        && reversedMerit.baseNncFormula === "#0-0+m-o(mahcēhualti)0-0#"
        && reversedBoon.canonicalNuclearSurface === "mocnōpilti"
        && reversedBoon.baseNncFormula === "#0-0+m-o(cnōpilti)0-0#";
      const source = Object.freeze({
        kind: "classical-nahuatl-king-praise-role-contrast-source",
        version: 1,
        authorizationStatus: exact ? "authorized" : "blocked",
        blockReason: exact ? "" : "four-canonical-king-praise-nnc-results-required",
        actualMerit: exact ? actualMerit : null,
        actualBoon: exact ? actualBoon : null,
        reversedMerit: exact ? reversedMerit : null,
        reversedBoon: exact ? reversedBoon : null,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        translationAuthority: false,
        callerSuppliedAuthorityAccepted: false,
      });
      issuedKingPraiseRoleContrastSources.add(source);
      return source;
    }
    function isClassicalNahuatlKingPraiseRoleContrastSource(source = null) {
      return Boolean(
        source
        && issuedKingPraiseRoleContrastSources.has(source)
        && source.kind === "classical-nahuatl-king-praise-role-contrast-source"
        && source.authorizationStatus === "authorized"
        && isClassicalNahuatlIssuedNncSentenceSurfaceFrame(source.actualMerit)
        && isClassicalNahuatlIssuedNncSentenceSurfaceFrame(source.actualBoon)
        && isClassicalNahuatlIssuedNncSentenceSurfaceFrame(source.reversedMerit)
        && isClassicalNahuatlIssuedNncSentenceSurfaceFrame(source.reversedBoon)
        && source.actualMerit.canonicalNuclearSurface === "tīmahcēhualti"
        && source.actualBoon.canonicalNuclearSurface === "tīcnōpilti"
        && source.reversedMerit.canonicalNuclearSurface === "momahcēhualti"
        && source.reversedBoon.canonicalNuclearSurface === "mocnōpilti"
        && source.formulaStringAuthority === false
        && source.surfaceStringAuthority === false
        && source.translationAuthority === false
        && source.callerSuppliedAuthorityAccepted === false
        && Object.isFrozen(source)
      );
    }
    function evaluateClassicalNahuatlKingPraiseRoleContrast(source = null) {
      const authorized = isClassicalNahuatlKingPraiseRoleContrastSource(source);
      const result = Object.freeze({
        kind: "classical-nahuatl-king-praise-role-contrast-result",
        version: 1,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized ? "" : "owner-issued-king-praise-role-contrast-source-required",
        semanticOwnerId: "participant-role-analysis",
        operationId: "classical.nnc.king-praise-role-contrast.interpret",
        canvasFormsPresent: authorized ? Object.freeze(["tīmahcēhualti", "tīcnōpilti"]) : Object.freeze([]),
        substitutedFormsAbsent: authorized ? Object.freeze(["momahcēhualti", "mocnōpilti"]) : Object.freeze([]),
        formMeanings: authorized ? Object.freeze({
          momahcēhualti: "it-is-your-merit",
          mocnōpilti: "it-is-your-boon",
          tīmahcēhualti: "you-are-its-merit",
          tīcnōpilti: "you-are-its-boon",
        }) : Object.freeze({}),
        actualParticipantRoles: authorized ? Object.freeze({
          honoredRuler: "second-person-singular-human-merited-object-or-boon",
          city: "nonhuman-entity-that-has-merited-and-deserved-the-ruler",
        }) : Object.freeze({}),
        substitutedAnalysisReversesSubjectIntoPossessor: authorized,
        correctedTranslations: authorized ? Object.freeze([
          "Now you are the one whom the city has merited and deserved.",
          "Now it is you who are the one whom the city has merited and deserved.",
        ]) : Object.freeze([]),
        publishedTranslationReversesWhoMeritsWhom: authorized,
        reversalMovesReaderFurtherFromNahuatlEthos: authorized,
        ownerExecutionCompleted: authorized,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        translationAuthority: false,
        callerSuppliedAuthorityAccepted: false,
      });
      if (authorized) issuedKingPraiseRoleContrastResults.add(result);
      return result;
    }
    function isClassicalNahuatlKingPraiseRoleContrastResult(result = null) {
      return Boolean(
        result
        && issuedKingPraiseRoleContrastResults.has(result)
        && result.kind === "classical-nahuatl-king-praise-role-contrast-result"
        && result.authorizationStatus === "authorized"
        && result.semanticOwnerId === "participant-role-analysis"
        && result.operationId === "classical.nnc.king-praise-role-contrast.interpret"
        && result.canvasFormsPresent?.join("|") === "tīmahcēhualti|tīcnōpilti"
        && result.substitutedFormsAbsent?.join("|") === "momahcēhualti|mocnōpilti"
        && result.formMeanings?.momahcēhualti === "it-is-your-merit"
        && result.formMeanings?.mocnōpilti === "it-is-your-boon"
        && result.formMeanings?.tīmahcēhualti === "you-are-its-merit"
        && result.formMeanings?.tīcnōpilti === "you-are-its-boon"
        && result.actualParticipantRoles?.honoredRuler === "second-person-singular-human-merited-object-or-boon"
        && result.actualParticipantRoles?.city === "nonhuman-entity-that-has-merited-and-deserved-the-ruler"
        && result.substitutedAnalysisReversesSubjectIntoPossessor === true
        && result.correctedTranslations?.length === 2
        && result.publishedTranslationReversesWhoMeritsWhom === true
        && result.reversalMovesReaderFurtherFromNahuatlEthos === true
        && result.ownerExecutionCompleted === true
        && result.translationAuthority === false
        && result.callerSuppliedAuthorityAccepted === false
        && Object.isFrozen(result)
      );
    }
    function getClassicalNahuatlNncGeneralFormulaProjection(stateArity = "vacant") {
      const possessiveArity = stateArity === "monadic" ? "monadic" : ["dyadic", "reduplicated-dyadic"].includes(stateArity) ? "dyadic" : "vacant";
      if (possessiveArity === "monadic") {
        return {
          linearFormula: "#pers¹-pers²+st(STEM)num¹-num²#",
          rows: [{
            role: "Subject",
            expression: "#pers¹-pers²+ ... )num¹-num²#",
            hierarchyLevel: 3,
            discontinuousConstituent: true
          }, {
            role: "Predicate",
            expression: "+st(STEM)",
            hierarchyLevel: 2,
            foundation: "STEM"
          }]
        };
      }
      if (possessiveArity === "dyadic") {
        return {
          linearFormula: "#pers¹-pers²+st¹-st²(STEM)num¹-num²#",
          rows: [{
            role: "Subject",
            expression: "#pers¹-pers²+ ... )num¹-num²#",
            hierarchyLevel: 3,
            discontinuousConstituent: true
          }, {
            role: "Predicate",
            expression: "+st¹-st²(STEM)",
            hierarchyLevel: 2,
            foundation: "STEM"
          }]
        };
      }
      return {
        linearFormula: "#pers¹-pers²(STEM)num¹-num²#",
        rows: [{
          role: "Subject",
          expression: "#pers¹-pers²( ... )num¹-num²#",
          hierarchyLevel: 3,
          discontinuousConstituent: true
        }, {
          role: "Predicate",
          expression: "(STEM)",
          hierarchyLevel: 2,
          foundation: "STEM"
        }]
      };
    }
    function buildClassicalNahuatlNncDiagrammaticFrame(frame = null) {
      if (!isClassicalNahuatlNncSlotFrame(frame)) {
        const blockedFrame = {
          kind: "classical-nahuatl-nnc-diagrammatic-frame",
          sourceAuthority: "Andrews transcription",
          sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
          authorizationStatus: "blocked",
          blockReason: "authorized-typed-nnc-slot-frame-required",
          projectionAuthority: "typed-nnc-slots",
          formulaStringAuthority: false,
          rows: []
        };
        issuedNncDiagrammaticFrames.add(blockedFrame);
        return blockedFrame;
      }
      const subject = frame.slots.subject;
      const state = frame.slots.state;
      const predicate = frame.slots.predicate;
      const number = frame.slots.number;
      const stateCarriers = state.slots.map(slot => slot.carrier);
      const stateDisplay = stateCarriers.length ? `+${stateCarriers.join("-")}` : "";
      const subjectGap = state.arity === "vacant" ? "( ... )" : "+ ... )";
      const subjectExpression = `#${subject.pers1}-${subject.pers2}${subjectGap}${number.num1}-${number.num2}#`;
      const predicateExpression = `${stateDisplay}(${predicate.stem})`;
      const generalProjection = getClassicalNahuatlNncGeneralFormulaProjection(state.arity);
      const diagrammaticFrame = {
        kind: "classical-nahuatl-nnc-diagrammatic-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: "authorized",
        blockReason: "",
        projectionAuthority: "typed-nnc-slots",
        formulaStringAuthority: false,
        linearFormula: renderClassicalNahuatlNncSlotFrameFormula(frame),
        generalLinearFormula: generalProjection.linearFormula,
        generalRows: generalProjection.rows,
        stateArity: state.arity,
        stateCarriers,
        predicateStem: predicate.stem,
        tenseSlot: "none",
        hierarchy: ["nounstem", "predicate", "NNC"],
        rows: [{
          role: "Subject",
          expression: subjectExpression,
          hierarchyLevel: 3,
          discontinuousConstituent: true
        }, {
          role: "Predicate",
          expression: predicateExpression,
          hierarchyLevel: 2,
          foundation: predicate.stem
        }],
        ruleRefs: [{
          section: "4.4",
          transcriptionLineStart: 2302,
          transcriptionLineEnd: 2309,
          exactWitness: "In a diagrammatic format, the NNC formula separates the discontinuous Subject from the State plus Stem Predicate."
        }, {
          section: "4.4 note",
          transcriptionLineStart: 2326,
          transcriptionLineEnd: 2334,
          exactWitness: "The diagram exposes the NNC hierarchy: nounstem, predicate, and NNC."
        }, {
          section: state.arity === "vacant" ? "12.2" : "13.1",
          transcriptionLineStart: state.arity === "vacant" ? 4387 : 4576,
          transcriptionLineEnd: state.arity === "vacant" ? 4393 : 4589,
          exactWitness: state.arity === "vacant" ? "The absolutive NNC diagram places the vacant predicate gap in the Subject row and the stem in the Predicate row." : "The possessive NNC diagram places State with the stem in the Predicate row."
        }]
      };
      issuedNncDiagrammaticFrames.add(diagrammaticFrame);
      return diagrammaticFrame;
    }
    function isClassicalNahuatlNncDiagrammaticFrame(frame = null) {
      return Boolean(
        frame
        && issuedNncDiagrammaticFrames.has(frame)
        && frame.kind === "classical-nahuatl-nnc-diagrammatic-frame"
      );
    }
    function buildClassicalNahuatlNncOperationEvaluationFrame({
      nncSlotFrame = null,
      appliedOperationIds = null,
      requiredOperationIds = null,
      resultOperationId = "",
      requestedOutputKind = ""
    } = {}) {
      const typedAuthorized = isClassicalNahuatlNncSlotFrame(nncSlotFrame);
      const selectedAppliedOperationIds = Array.isArray(appliedOperationIds)
        ? appliedOperationIds
        : Array.isArray(nncSlotFrame?.appliedOperationIds) ? nncSlotFrame.appliedOperationIds : [];
      const selectedResultOperationId = normalizeClassicalNahuatlNncToken(resultOperationId || nncSlotFrame?.resultOperationId);
      const selectedOutputKind = normalizeClassicalNahuatlNncToken(requestedOutputKind || nncSlotFrame?.requestedOutputKind);
      const selectedRequiredOperationIds = Array.isArray(requiredOperationIds)
        ? requiredOperationIds
        : selectedAppliedOperationIds;
      const plan = CLASSICAL_NAHUATL_NNC_OPERATION_CONTRACT_OWNER.evaluatePlan({
        domain: "classical-nnc",
        contracts: CLASSICAL_NAHUATL_NNC_OPERATION_CONTRACTS,
        appliedOperationIds: selectedAppliedOperationIds,
        requiredOperationIds: selectedRequiredOperationIds,
        resultOperationId: selectedResultOperationId,
        requestedOutputKind: selectedOutputKind,
        sourceAuthorized: typedAuthorized,
        sourceBlockReason: "missing-or-contradictory-typed-nnc-input"
      });
      return {
        ...plan,
        kind: "classical-nahuatl-nnc-operation-evaluation-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        nncFamily: nncSlotFrame?.nncFamily || "ordinary",
        typedSlotAuthority: true,
        formulaStringAuthority: false
      };
    }
    function resolveClassicalNahuatlLesson15YoMatrixEmbedStem(sourceStem = "", context = {}) {
      const normalizedSourceStem = normalizeClassicalNahuatlNncStem(sourceStem);
      const nounClass = normalizeClassicalNahuatlNounClass(
        context.nounClass || context.class || ""
      );
      const useShape = normalizeClassicalNahuatlNncToken(
        context.useShape || context.generalUseShape || "base"
      ).toLowerCase().replace(/[\s_]/gu, "-");
      const useShapeOptions = {
        base: {
          generalUseShape: "base"
        },
        "truncated-a": {
          generalUseShape: "truncated",
          ephemeralFinalVowel: "a"
        },
        "truncated-i": {
          generalUseShape: "truncated",
          ephemeralFinalVowel: "i"
        },
        "truncated-a-supportive-i": {
          generalUseShape: "truncated",
          ephemeralFinalVowel: "a",
          truncationRepair: "supportive-i"
        }
      };
      const sourceOptions = useShapeOptions[useShape] || null;
      if (!normalizedSourceStem || !sourceOptions) {
        return "";
      }
      let generalUseStem = normalizedSourceStem;
      if (useShape !== "base") {
        const sourceFrame = buildClassicalNahuatlNounstemSourceFrame(
          normalizedSourceStem,
          {
            ...sourceOptions,
            state: "possessive",
            nounClass,
            tlSubclass: context.subclass,
            compoundStem: context.compoundStem === true
              || normalizedSourceStem.includes("-"),
            classSelectionAuthority: "user-selection"
          }
        );
        if (sourceFrame.authorizationStatus !== "authorized") {
          return "";
        }
        generalUseStem = sourceFrame.generalUseStem;
      }
      const stemFormation = normalizeClassicalNahuatlStemFormation(
        context.stemFormation || context.stemRelation || "plain"
      );
      const derivedFrame = deriveClassicalNahuatlStem(
        generalUseStem,
        stemFormation
      );
      return derivedFrame.authorizationStatus === "authorized"
        ? derivedFrame.derivedStem
        : "";
    }
    function getClassicalNahuatlPredicateOptionContract(sourceStem = "", context = {}) {
      const normalizedSourceStem = normalizeClassicalNahuatlNncStem(sourceStem);
      const selectedState = normalizeClassicalNahuatlNncToken(context.selectedState || context.state || "absolutive").toLowerCase();
      const subject = normalizeClassicalNahuatlNncSubject(context.subject || "3sg");
      const possessor = normalizeClassicalNahuatlNncPossessor(context.possessor || "3sg");
      const nounClass = normalizeClassicalNahuatlNounClass(
        context.nounClass || context.class || ""
      );
      const useShape = normalizeClassicalNahuatlNncToken(
        context.useShape || context.generalUseShape || ""
      ).toLowerCase().replace(/[\s_]/gu, "-");
      const subclass = normalizeClassicalNahuatlNncToken(
        context.subclass || context.tlSubclass || ""
      ).toLowerCase().replace(/[\s_]/gu, "-");
      const pluralSubject = /pl$/u.test(subject);
      const yoMatrixEmbedStem = resolveClassicalNahuatlLesson15YoMatrixEmbedStem(
        normalizedSourceStem,
        context
      );
      const yoMatrixBoundary = getClassicalNahuatlNncLastSound(yoMatrixEmbedStem) === "l" ? "l" : "y";
      const yoMatrixStem = yoMatrixEmbedStem
        ? `${yoMatrixEmbedStem}-${yoMatrixBoundary}${selectedState === "absolutive" || pluralSubject ? "ō" : "o"}`
        : "";
      const option = record => Object.freeze({
        kind: "classical-nahuatl-ordinary-nnc-predicate-option",
        sourceAuthority: "Andrews transcription Canvas witness",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        sourceStem: normalizedSourceStem,
        selectionAuthority: "user-or-external-lexical-analysis-required",
        grammarAuthority: false,
        targetStemIsAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        ...record
      });
      const sourceOption = option({
        optionId: "source-stem",
        displayLabel: normalizedSourceStem || "source stem",
        operation: "regular",
        targetStem: normalizedSourceStem,
        suppletiveConnector: "class-governed",
        secondaryPossessorCarrier: "not-applicable",
        canvasSection: "15.1",
        transcriptionLineStart: 5158,
        transcriptionLineEnd: 5170,
        exactWitness: "Certain points not covered in the discussion in Lesson 14 should be noted."
      });
      const productiveOptions = [option({
        optionId: "yo-matrix",
        displayLabel: "(-yō)-tl- matrix",
        operation: "yo-matrix",
        targetStem: yoMatrixStem,
        suppletiveConnector: "0",
        secondaryPossessorCarrier: "not-applicable",
        stateValues: ["absolutive", "possessive"],
        targetNounClass: "tl",
        targetSubclass: "tl-1b",
        targetUseShape: "base",
        matrixEmbedStem: yoMatrixEmbedStem,
        matrixEmbedUseStemKind: "general-use",
        canvasSection: "15.1.2.b-c; 32.1.2.b; 39.3",
        transcriptionLineStart: 5177,
        transcriptionLineEnd: 5198,
        matrixTranscriptionLineStart: 11783,
        matrixTranscriptionLineEnd: 11788,
        exactWitness: "The absolutive-state NNC pillōtl means it is nobility; the same (-yō)-tl- nounstem forms possessive-state NNCs"
      }), option({
        optionId: "secondary-general-use",
        displayLabel: "secondary general-use stem (tē-)",
        operation: "secondary-general-use",
        targetStem: `tē-${normalizedSourceStem}`,
        suppletiveConnector: "not-applicable",
        secondaryPossessorCarrier: "tē",
        requiresPossessive: true,
        canvasSection: "15.1.5",
        transcriptionLineStart: 5222,
        transcriptionLineEnd: 5254,
        exactWitness: "the possessor pronoun tē fuses with a general-use stem"
      }), option({
        optionId: "analogical-restricted-use",
        displayLabel: "tla possessive predicate → restricted-use stem",
        operation: "analogical-restricted-use",
        targetStem: `tla-${normalizedSourceStem}`,
        suppletiveConnector: "not-applicable",
        secondaryPossessorCarrier: "not-applicable",
        canvasSection: "15.1.6",
        transcriptionLineStart: 5255,
        transcriptionLineEnd: 5274,
        exactWitness: "The possessive-state predicate is downgraded to the rank of a restricted-use stem."
      })];
      const lexicalOptions = [option({
        optionId: "tec-title",
        displayLabel: "tēc (Totēc)",
        sourceStem: "tēuc",
        operation: "suppletive",
        targetStem: "tēc",
        suppletiveConnector: "0",
        secondaryPossessorCarrier: "not-applicable",
        requiresPossessive: true,
        requiredSubject: "3sg",
        requiredPossessor: "1pl",
        canvasSection: "15.1.2.c",
        transcriptionLineStart: 5199,
        transcriptionLineEnd: 5211,
        exactWitness: "Totēc, he is our lord, formed on the general-use stem (tēc)-Ø-; used as a title and a personal name"
      })];
      const reclassificationAvailable = nounClass === "tl"
        && useShape === "truncated-i"
        && subclass === "tl-2a"
        && /[āē]i$/u.test(normalizedSourceStem);
      const reclassificationOptions = reclassificationAvailable ? [option({
        optionId: "tl-2a-to-1a",
        displayLabel: "tl 2-A → 1-A by ephemeral i loss",
        operation: "tl-2a-to-1a",
        targetStem: normalizedSourceStem.slice(0, -1),
        suppletiveConnector: "not-applicable",
        secondaryPossessorCarrier: "not-applicable",
        requiresPossessive: false,
        canvasSection: "15.1.7",
        transcriptionLineStart: 5275,
        transcriptionLineEnd: 5285,
        exactWitness: "A Subclass 2-A stem of the tl class may be reclassified as a Subclass 1-A stem"
      })] : [];
      const availableOptions = [
        sourceOption,
        ...(normalizedSourceStem ? productiveOptions : [])
          .filter(candidate => !candidate.requiresPossessive || selectedState === "possessive"),
        ...reclassificationOptions,
        ...lexicalOptions.filter(candidate => candidate.sourceStem === normalizedSourceStem
          && (!candidate.requiresPossessive || selectedState === "possessive")
          && (!candidate.requiredSubject || candidate.requiredSubject === subject)
          && (!candidate.requiredPossessor || candidate.requiredPossessor === possessor))
      ];
      return {
        kind: "classical-nahuatl-ordinary-nnc-predicate-option-contract",
        sourceAuthority: "Andrews transcription Canvas witness",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: normalizedSourceStem ? "authorized" : "blocked",
        blockReason: normalizedSourceStem ? "" : "lesson15-predicate-option-source-stem-required",
        sourceStem: normalizedSourceStem,
        selectedState,
        subject,
        possessor,
        nounClass,
        useShape,
        subclass,
        options: availableOptions,
        optionIds: availableOptions.map(candidate => candidate.optionId),
        formulaStringAuthority: false,
        surfaceStringAuthority: false
      };
    }
    function buildClassicalNahuatlStemOperationRecord(sourceStem = "", options = {}) {
      const normalizedSourceStem = normalizeClassicalNahuatlNncStem(sourceStem);
      const requestedSelectionAuthority = normalizeClassicalNahuatlNncToken(options.selectionAuthority || "").toLowerCase().replace(/[\s_]/gu, "-");
      const predicateOptionId = normalizeClassicalNahuatlNncToken(options.predicateOptionId || options.optionId || "").toLowerCase().replace(/[\s_]/gu, "-");
      const predicateOptionContract = requestedSelectionAuthority === "canvas-predicate-option" ? getClassicalNahuatlPredicateOptionContract(normalizedSourceStem, {
        selectedState: options.selectedState || options.state,
        subject: options.subject,
        possessor: options.possessor,
        nounClass: options.nounClass,
        useShape: options.useShape,
        subclass: options.subclass,
        stemFormation: options.stemFormation
      }) : null;
      const canvasPredicateOption = predicateOptionContract?.options?.find(candidate => candidate.optionId === predicateOptionId) || null;
      const operationAliases = {
        "": "regular",
        regular: "regular",
        suppletive: "suppletive",
        "suppletive-possessive-stem": "suppletive",
        "yo-matrix": "yo-matrix",
        "predicate-suffix-lo": "yo-matrix",
        "predicate-suffix-yo": "yo-matrix",
        secondary: "secondary-general-use",
        "secondary-general-use": "secondary-general-use",
        analogical: "analogical-restricted-use",
        "analogical-restricted-use": "analogical-restricted-use",
        reclassification: "tl-2a-to-1a",
        "tl-2a-to-1a": "tl-2a-to-1a"
      };
      const requestedOperation = normalizeClassicalNahuatlNncToken(canvasPredicateOption?.operation || options.operation || options.operationId || "regular").toLowerCase().replace(/[\s_]/gu, "-");
      const operation = operationAliases[requestedOperation] || "";
      const selectedState = normalizeClassicalNahuatlNncToken(
        options.selectedState || options.state || "absolutive"
      ).toLowerCase();
      const selectedSubject = normalizeClassicalNahuatlNncSubject(options.subject || "3sg");
      const sourceStemFormation = normalizeClassicalNahuatlStemFormation(
        options.stemFormation || options.stemRelation || "plain"
      );
      const yoMatrixEmbedStem = resolveClassicalNahuatlLesson15YoMatrixEmbedStem(
        normalizedSourceStem,
        {
          nounClass: options.nounClass,
          useShape: options.useShape,
          subclass: options.subclass,
          stemFormation: sourceStemFormation
        }
      );
      const yoMatrixBoundary = getClassicalNahuatlNncLastSound(yoMatrixEmbedStem) === "l"
        ? "l"
        : "y";
      const yoMatrixStem = yoMatrixEmbedStem
        ? `${yoMatrixEmbedStem}-${yoMatrixBoundary}${selectedState === "absolutive" || selectedSubject.endsWith("pl") ? "ō" : "o"}`
        : "";
      const selectionAuthority = normalizeClassicalNahuatlNncToken(requestedSelectionAuthority || (operation === "regular" ? "canvas-regular-default" : "")).toLowerCase().replace(/[\s_]/gu, "-");
      const exactCanvasLexicalOption = selectionAuthority === "canvas-predicate-option"
        && canvasPredicateOption?.optionId === "tec-title";
      const lexicalSelectionAuthority = ["user-supplied-lexical-analysis", "external-lexical-record"].includes(selectionAuthority);
      const selectionAuthorityKnown = operation === "regular"
        ? ["canvas-regular-default", "canvas-predicate-option"].includes(selectionAuthority)
        : lexicalSelectionAuthority || exactCanvasLexicalOption;
      const derivedTargetStem = operation === "yo-matrix"
        ? yoMatrixStem
        : operation === "secondary-general-use"
          ? `${normalizeClassicalNahuatlNncToken(options.secondaryPossessorCarrier || "tē").toLowerCase()}-${normalizedSourceStem}`
          : operation === "analogical-restricted-use"
            ? `tla-${normalizedSourceStem}`
            : operation === "tl-2a-to-1a" && /i$/u.test(normalizedSourceStem)
              ? normalizedSourceStem.slice(0, -1)
              : "";
      const suppliedTargetStem = normalizeClassicalNahuatlNncStem(options.targetStem || "");
      const targetStem = operation === "regular"
        ? normalizedSourceStem
        : exactCanvasLexicalOption
          ? canvasPredicateOption.targetStem
          : ["yo-matrix", "secondary-general-use", "analogical-restricted-use", "tl-2a-to-1a"].includes(operation)
            ? derivedTargetStem
            : suppliedTargetStem;
      const suppliedTargetMatches = !suppliedTargetStem || suppliedTargetStem === targetStem;
      const requestedConnector = normalizeClassicalNahuatlNncToken(canvasPredicateOption?.suppletiveConnector || options.suppletiveConnector || "class-governed").toLowerCase().replace(/ø/gu, "0");
      const suppletiveConnector = ["class-governed", "uh", "hui", "0", "⎕"].includes(requestedConnector) ? requestedConnector : "";
      const secondaryPossessorCarrier = normalizeClassicalNahuatlNncToken(canvasPredicateOption?.secondaryPossessorCarrier || options.secondaryPossessorCarrier || "tē").toLowerCase();
      const sourceNounClass = normalizeClassicalNahuatlNounClass(options.nounClass || "");
      const sourceUseShape = normalizeClassicalNahuatlNncToken(options.useShape || "").toLowerCase();
      const sourceSubclass = normalizeClassicalNahuatlNncToken(options.subclass || "").toLowerCase();
      const reclassificationSourceAuthorized = operation !== "tl-2a-to-1a" || (
        sourceNounClass === "tl"
        && sourceUseShape === "truncated-i"
        && sourceSubclass === "tl-2a"
        && /[āē]i$/u.test(normalizedSourceStem)
      );
      let blockReason = "";
      if (!normalizedSourceStem) blockReason = "lesson15-operation-source-stem-required";else if (selectionAuthority === "canvas-predicate-option" && !canvasPredicateOption) {
        blockReason = "lesson15-predicate-option-not-authorized-for-source-and-context";
      } else if (!operation) blockReason = "unknown-lesson15-stem-operation";else if (!selectionAuthorityKnown) blockReason = "lesson15-stem-operation-requires-typed-lexical-authority";else if (!suppliedTargetMatches) {
        blockReason = "supplied-lesson15-target-stem-contradicts-canvas-operation";
      } else if (operation !== "regular" && !targetStem) blockReason = "lesson15-selected-lexical-stem-required";else if (operation !== "regular" && targetStem === normalizedSourceStem) {
        blockReason = "lesson15-selected-lexical-stem-must-differ-from-source";
      } else if (operation === "suppletive" && !suppletiveConnector) {
        blockReason = "unknown-suppletive-singular-connector";
      } else if (operation === "yo-matrix" && !/-(?:l|y)[oō]$/u.test(targetStem)) {
        blockReason = "lesson15-yo-matrix-must-realize-boundary-allomorph";
      } else if (operation === "secondary-general-use" && !["tē", "ti", "t"].includes(secondaryPossessorCarrier)) {
        blockReason = "secondary-general-use-carrier-must-be-te-long-ti-or-t";
      } else if (operation === "secondary-general-use" && !targetStem.toLowerCase().startsWith(`${secondaryPossessorCarrier}-`)) {
        blockReason = "secondary-general-use-stem-must-contain-selected-inner-possessor-carrier";
      } else if (operation === "analogical-restricted-use" && !/^tla-/u.test(targetStem)) {
        blockReason = "analogical-restricted-use-stem-must-be-a-distinct-tla-derived-stem";
      } else if (!reclassificationSourceAuthorized) {
        blockReason = "tl-2a-to-1a-reclassification-requires-typed-tl-2a-source-analysis";
      }
      return {
        kind: "classical-nahuatl-ordinary-nnc-stem-operation-record",
        version: 1,
        sourceAuthority: selectionAuthority === "canvas-predicate-option"
          ? "Andrews transcription exact lexical witness"
          : operation === "regular"
            ? "Andrews transcription regular default"
            : "Andrews transcription plus typed lexical analysis",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: blockReason ? "blocked" : "authorized",
        blockReason,
        sourceStem: normalizedSourceStem,
        operation,
        targetStem,
        targetStemDerivation: operation === "regular"
          ? "identity"
          : exactCanvasLexicalOption
            ? "exact-canvas-lexical-option"
            : derivedTargetStem
              ? "canonical-semantic-operation"
              : "external-lexical-record",
        suppliedTargetStem,
        suppliedTargetStemMatches: suppliedTargetMatches,
        canvasPredicateOptionIsGrammarAuthority: false,
        selectionAuthority,
        predicateOptionId: canvasPredicateOption?.optionId || "",
        predicateOptionFrame: canvasPredicateOption,
        sourceNounClass,
        sourceUseShape,
        sourceSubclass,
        sourceStemFormation,
        selectedState,
        selectedSubject,
        matrixEmbedStem: operation === "yo-matrix" ? yoMatrixEmbedStem : "",
        matrixEmbedUseStemKind: operation === "yo-matrix" ? "general-use" : "not-applicable",
        targetNounClass: operation === "yo-matrix" ? "tl" : sourceNounClass,
        targetSubclass: operation === "yo-matrix" ? "tl-1b" : sourceSubclass,
        targetUseShape: operation === "yo-matrix" ? "base" : sourceUseShape,
        targetStateValues: operation === "yo-matrix"
          ? ["absolutive", "possessive"]
          : [],
        reclassificationSourceAuthorized,
        suppletiveConnector: operation === "suppletive" ? suppletiveConnector : "not-applicable",
        secondaryPossessorCarrier: operation === "secondary-general-use" ? secondaryPossessorCarrier : "not-applicable",
        mutuallyExclusiveStemOperation: true,
        exactSpellingAuthority: "typed-source-record-including-vowel-length",
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        legalWitnessTagIds: ["suppletive", "yo-matrix"].includes(operation) ? ["cn-l15-151b-possessive-suppletion"] : operation === "secondary-general-use" ? ["cn-l15-151e-secondary-general-use"] : operation === "analogical-restricted-use" ? ["cn-l15-151f-analogical-restricted-use"] : operation === "tl-2a-to-1a" ? ["cn-l15-151g-reclassification"] : []
      };
    }
    function isClassicalNahuatlStemOperationRecord(record = null) {
      if (
        !record
        || record.kind !== "classical-nahuatl-ordinary-nnc-stem-operation-record"
        || record.version !== 1
        || record.authorizationStatus !== "authorized"
        || !record.sourceStem
        || !record.targetStem
        || record.suppliedTargetStemMatches !== true
        || record.canvasPredicateOptionIsGrammarAuthority !== false
        || record.mutuallyExclusiveStemOperation !== true
        || record.formulaStringAuthority !== false
        || record.surfaceStringAuthority !== false
      ) {
        return false;
      }
      const productiveOperations = [
        "yo-matrix",
        "secondary-general-use",
        "analogical-restricted-use",
        "tl-2a-to-1a"
      ];
      const lexicalAuthority = [
        "user-supplied-lexical-analysis",
        "external-lexical-record"
      ].includes(record.selectionAuthority);
      if (record.operation === "regular") {
        return record.targetStem === record.sourceStem
          && record.targetStemDerivation === "identity"
          && ["canvas-regular-default", "canvas-predicate-option"].includes(
            record.selectionAuthority
          );
      }
      if (record.operation === "suppletive") {
        const exactCanvasWitness = record.selectionAuthority === "canvas-predicate-option"
          && record.predicateOptionId === "tec-title"
          && record.sourceStem === "tēuc"
          && record.targetStem === "tēc"
          && record.targetStemDerivation === "exact-canvas-lexical-option";
        return (
          exactCanvasWitness
          || (
            lexicalAuthority
            && record.targetStemDerivation === "external-lexical-record"
          )
        )
          && record.targetStem !== record.sourceStem
          && ["class-governed", "uh", "hui", "0", "⎕"].includes(
            record.suppletiveConnector
          );
      }
      if (!productiveOperations.includes(record.operation) || !lexicalAuthority) {
        return false;
      }
      if (record.targetStemDerivation !== "canonical-semantic-operation") {
        return false;
      }
      if (record.operation === "yo-matrix") {
        const matrixEmbedStem = resolveClassicalNahuatlLesson15YoMatrixEmbedStem(
          record.sourceStem,
          {
            nounClass: record.sourceNounClass,
            useShape: record.sourceUseShape,
            subclass: record.sourceSubclass,
            stemFormation: record.sourceStemFormation
          }
        );
        const boundaryAllomorph = getClassicalNahuatlNncLastSound(matrixEmbedStem) === "l"
          ? "l"
          : "y";
        const longMatrixVowel = record.selectedState === "absolutive"
          || record.selectedSubject.endsWith("pl");
        const expectedTargetStem = matrixEmbedStem
          ? `${matrixEmbedStem}-${boundaryAllomorph}${longMatrixVowel ? "ō" : "o"}`
          : "";
        return record.matrixEmbedStem === matrixEmbedStem
          && record.matrixEmbedUseStemKind === "general-use"
          && record.targetStem === expectedTargetStem
          && record.targetNounClass === "tl"
          && record.targetSubclass === "tl-1b"
          && record.targetUseShape === "base"
          && Array.isArray(record.targetStateValues)
          && record.targetStateValues.length === 2
          && record.targetStateValues.includes("absolutive")
          && record.targetStateValues.includes("possessive");
      }
      if (record.operation === "secondary-general-use") {
        return ["tē", "ti", "t"].includes(record.secondaryPossessorCarrier)
          && record.targetStem.startsWith(`${record.secondaryPossessorCarrier}-`);
      }
      if (record.operation === "analogical-restricted-use") {
        return record.targetStem === `tla-${record.sourceStem}`;
      }
      return /[āē]i$/u.test(record.sourceStem)
        && record.targetStem === record.sourceStem.slice(0, -1)
        && record.sourceNounClass === "tl"
        && record.sourceUseShape === "truncated-i"
        && record.sourceSubclass === "tl-2a"
        && record.reclassificationSourceAuthorized === true;
    }
    function buildClassicalNahuatlPossessorReduplicationSelection(sourceStem = "", options = {}) {
      const normalizedSourceStem = normalizeClassicalNahuatlNncStem(sourceStem);
      const selected = options.selected === true;
      const selectionAuthority = normalizeClassicalNahuatlNncToken(options.selectionAuthority || (selected ? "" : "not-selected")).toLowerCase().replace(/[\s_]/gu, "-");
      const selectionAuthorityKnown = !selected || ["user-supplied-lexical-analysis", "external-lexical-record"].includes(selectionAuthority);
      const blockReason = !normalizedSourceStem ? "lesson15-reduplication-source-stem-required" : !selectionAuthorityKnown ? "possessor-reduplication-requires-typed-selection-authority" : "";
      return {
        kind: "classical-nahuatl-ordinary-nnc-possessor-reduplication-selection",
        version: 1,
        sourceAuthority: "Andrews transcription plus typed lexical analysis",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: blockReason ? "blocked" : "authorized",
        blockReason,
        sourceStem: normalizedSourceStem,
        selected,
        selectionAuthority,
        separateFromStemOperation: true,
        grammaticalNumberValue: "none",
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        legalWitnessTagIds: ["cn-l15-151d-possessor-reduplication"]
      };
    }
    function isClassicalNahuatlPossessorReduplicationSelection(record = null) {
      return Boolean(
        record
        && record.kind === "classical-nahuatl-ordinary-nnc-possessor-reduplication-selection"
        && record.version === 1
        && record.authorizationStatus === "authorized"
        && record.sourceStem
        && typeof record.selected === "boolean"
        && (
          record.selected
            ? ["user-supplied-lexical-analysis", "external-lexical-record"]
              .includes(record.selectionAuthority)
            : record.selectionAuthority === "not-selected"
        )
        && record.separateFromStemOperation === true
        && record.grammaticalNumberValue === "none"
        && record.formulaStringAuthority === false
        && record.surfaceStringAuthority === false
      );
    }
    function buildClassicalNahuatlNncSourceAuthorityFrame(sourceStem = "", options = {}) {
      const normalizedStem = normalizeClassicalNahuatlNncStem(sourceStem);
      const selectedState = normalizeClassicalNahuatlNncToken(options.selectedState || options.state || "absolutive").toLowerCase().replace(/[\s_]/gu, "-");
      const requestedStateAvailability = normalizeClassicalNahuatlNncToken(options.stateAvailability || "").toLowerCase().replace(/[\s_]/gu, "-");
      const requestedNaturalPolicy = normalizeClassicalNahuatlNncToken(options.naturalPossessionPolicy || options.statePolicy || "").toLowerCase().replace(/[\s_]/gu, "-");
      const policyAliases = {
        "": requestedStateAvailability === "possessive-only" ? "naturally-possessed" : requestedStateAvailability === "absolutive-only" ? "never-possessive" : "ordinary",
        both: "ordinary",
        ordinary: "ordinary",
        "naturally-possessed": "naturally-possessed",
        "possessive-only": "naturally-possessed",
        "never-possessive": "never-possessive",
        "absolutive-only": "never-possessive"
      };
      const naturalPossessionPolicy = policyAliases[requestedNaturalPolicy];
      const requestedNaturalPossessionSemantics =
        normalizeClassicalNahuatlNncToken(
          options.naturalPossessionSemantics || ""
        ).toLowerCase().replace(/[\s_]/gu, "-");
      const naturalPossessionSemanticInventory = [
        "ordinary",
        "natural-association-unspecified",
        "property",
        "kinship-or-human-relation",
        "body-part",
        "never-possessive"
      ];
      const naturalPossessionSemantics = requestedNaturalPossessionSemantics
        || (
          naturalPossessionPolicy === "naturally-possessed"
            ? "natural-association-unspecified"
            : naturalPossessionPolicy === "never-possessive"
              ? "never-possessive"
              : "ordinary"
        );
      const naturalSemanticsKnown = naturalPossessionSemanticInventory.includes(
        naturalPossessionSemantics
      );
      const naturalSemanticsCompatible = naturalPossessionPolicy === "naturally-possessed"
        ? [
          "natural-association-unspecified",
          "property",
          "kinship-or-human-relation",
          "body-part"
        ].includes(naturalPossessionSemantics)
        : naturalPossessionPolicy === "never-possessive"
          ? naturalPossessionSemantics === "never-possessive"
          : naturalPossessionSemantics === "ordinary";
      const stateAvailabilityByPolicy = {
        ordinary: "both",
        "naturally-possessed": "possessive-only",
        "never-possessive": "absolutive-only"
      };
      const stateAvailability = stateAvailabilityByPolicy[naturalPossessionPolicy] || "";
      const suppliedStateAvailabilityKnown = !requestedStateAvailability || ["both", "absolutive-only", "possessive-only"].includes(requestedStateAvailability);
      const stateAvailabilityContradiction = Boolean(requestedStateAvailability && stateAvailability && requestedStateAvailability !== stateAvailability);
      const metaphoricalOverride = options.metaphoricalOverride === true;
      const metaphoricalOverrideAvailable = naturalPossessionPolicy === "never-possessive";
      const allowedStateValues = naturalPossessionPolicy === "naturally-possessed" ? ["possessive"] : naturalPossessionPolicy === "never-possessive" ? metaphoricalOverride ? ["absolutive", "possessive"] : ["absolutive"] : ["absolutive", "possessive"];
      const policySelectionAuthority = normalizeClassicalNahuatlNncToken(options.policySelectionAuthority || (requestedNaturalPolicy || requestedStateAvailability ? "typed-call-selection" : "default-ordinary-source-analysis")).toLowerCase().replace(/[\s_]/gu, "-");
      const policyAuthorityKnown = ["default-ordinary-source-analysis", "typed-call-selection", "user-supplied-lexical-analysis", "external-lexical-record"].includes(policySelectionAuthority);
      const possessorCompatibilityAliases = {
        "": "ordinary",
        ordinary: "ordinary",
        relational: "relational-tla",
        "relational-tla": "relational-tla",
        analogical: "analogical-tla-derived",
        "analogical-tla": "analogical-tla-derived",
        "analogical-tla-derived": "analogical-tla-derived"
      };
      const requestedPossessorCompatibility = normalizeClassicalNahuatlNncToken(options.possessorCompatibility || "").toLowerCase().replace(/[\s_]/gu, "-");
      const possessorCompatibility = possessorCompatibilityAliases[requestedPossessorCompatibility] || "";
      const suppliedThirdPluralOptions = Object.prototype.hasOwnProperty.call(options, "thirdPluralPossessorSt2Options");
      const rawThirdPluralOptions = Array.isArray(options.thirdPluralPossessorSt2Options) ? options.thirdPluralPossessorSt2Options : normalizeClassicalNahuatlNncToken(options.thirdPluralPossessorSt2Options || "").toLowerCase().split(/[^mn]+/u);
      const normalizedThirdPluralOptions = rawThirdPluralOptions.map(value => normalizeClassicalNahuatlNncToken(value).toLowerCase()).filter(Boolean);
      const thirdPluralPossessorSt2Options = Array.from(new Set((suppliedThirdPluralOptions ? normalizedThirdPluralOptions : ["m", "n"]).filter(value => ["m", "n"].includes(value))));
      const suppliedThirdPluralOptionsInvalid = suppliedThirdPluralOptions && (normalizedThirdPluralOptions.length !== thirdPluralPossessorSt2Options.length || !thirdPluralPossessorSt2Options.length);
      const suppliedLesson15OperationRecord = Object.prototype.hasOwnProperty.call(options, "lesson15StemOperationRecord");
      const lesson15StemOperationRecord = isClassicalNahuatlStemOperationRecord(options.lesson15StemOperationRecord) && options.lesson15StemOperationRecord.sourceStem === normalizedStem ? cloneClassicalNahuatlNncValue(options.lesson15StemOperationRecord) : buildClassicalNahuatlStemOperationRecord(normalizedStem, {
        operation: "regular"
      });
      const suppliedLesson15ReduplicationSelection = Object.prototype.hasOwnProperty.call(options, "lesson15PossessorReduplicationSelection");
      const lesson15PossessorReduplicationSelection = isClassicalNahuatlPossessorReduplicationSelection(options.lesson15PossessorReduplicationSelection) && options.lesson15PossessorReduplicationSelection.sourceStem === normalizedStem ? cloneClassicalNahuatlNncValue(options.lesson15PossessorReduplicationSelection) : buildClassicalNahuatlPossessorReduplicationSelection(normalizedStem);
      let blockReason = "";
      if (!normalizedStem) blockReason = "nnc-source-authority-stem-required";else if (!naturalPossessionPolicy) blockReason = "unknown-natural-possession-policy";else if (!naturalSemanticsKnown) blockReason = "unknown-natural-possession-semantics";else if (!naturalSemanticsCompatible) blockReason = "natural-possession-semantics-contradicts-policy";else if (!suppliedStateAvailabilityKnown) blockReason = "unknown-lexical-state-availability";else if (stateAvailabilityContradiction) blockReason = "natural-possession-policy-contradicts-state-availability";else if (!policyAuthorityKnown) blockReason = "unknown-state-policy-selection-authority";else if (!possessorCompatibility) blockReason = "unknown-possessor-compatibility";else if (suppliedThirdPluralOptionsInvalid) {
        blockReason = "third-plural-possessor-st2-options-must-be-nonempty-m-n-subset";
      } else if (suppliedLesson15OperationRecord && (!isClassicalNahuatlStemOperationRecord(options.lesson15StemOperationRecord) || options.lesson15StemOperationRecord.sourceStem !== normalizedStem)) {
        blockReason = options.lesson15StemOperationRecord?.blockReason || "authorized-lesson15-stem-operation-record-required";
      } else if (suppliedLesson15ReduplicationSelection && (!isClassicalNahuatlPossessorReduplicationSelection(options.lesson15PossessorReduplicationSelection) || options.lesson15PossessorReduplicationSelection.sourceStem !== normalizedStem)) {
        blockReason = options.lesson15PossessorReduplicationSelection?.blockReason || "authorized-lesson15-possessor-reduplication-selection-required";
      } else if (!["absolutive", "possessive"].includes(selectedState)) blockReason = "unknown-nnc-state";else if (!allowedStateValues.includes(selectedState)) {
        blockReason = naturalPossessionPolicy === "naturally-possessed" ? "naturally-possessed-nounstem-requires-possessive-state" : "nounstem-never-possessive-without-metaphorical-override";
      }
      const authorized = !blockReason;
      return {
        kind: "classical-nahuatl-nnc-source-authority-frame",
        sourceAuthority: "Andrews transcription plus typed lexical analysis",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason,
        sourceStem: normalizedStem,
        selectedState,
        stateAvailability,
        allowedStateValues,
        naturalPossessionPolicy,
        naturalPossessionSemantics,
        naturalPossessionSemanticInventory,
        naturalPossessionSemanticsAuthority:
          requestedNaturalPossessionSemantics
            ? "typed-source-lexical-analysis"
            : "policy-derived-unspecified-or-default",
        policySelectionAuthority,
        possessorCompatibility,
        tlaPossessorAvailable: possessorCompatibility !== "ordinary",
        tlaPossessorAvailabilityReason: possessorCompatibility === "relational-tla" ? "relational-nounstem-source-analysis" : possessorCompatibility === "analogical-tla-derived" ? "lesson15-analogical-tla-derived-source-analysis" : "not-authorized-for-ordinary-source-analysis",
        thirdPluralPossessorSt2Options,
        thirdPluralPossessorSt2OptionAuthority: suppliedThirdPluralOptions ? "user-supplied-lexical-analysis" : "canvas-m-n-repertory-inventory",
        lesson15StemOperationRecord,
        lesson15PossessorReduplicationSelection,
        metaphoricalOverride,
        metaphoricalOverrideAvailable,
        metaphoricalOverrideUsedForState: naturalPossessionPolicy === "never-possessive" && selectedState === "possessive" && metaphoricalOverride,
        statePolicyBelongsTo: "typed-source-lexical-analysis",
        selectedStateBelongsTo: "user-authority-selection",
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        legalWitnessTagIds: ["cn-l12-127-state-restrictions", "cn-l15-152-natural-possession"]
      };
    }
    function isClassicalNahuatlNncSourceAuthorityFrame(frame = null) {
      return Boolean(frame && frame.kind === "classical-nahuatl-nnc-source-authority-frame" && frame.authorizationStatus === "authorized" && frame.sourceStem && ["ordinary", "naturally-possessed", "never-possessive"].includes(frame.naturalPossessionPolicy) && ["ordinary", "natural-association-unspecified", "property", "kinship-or-human-relation", "body-part", "never-possessive"].includes(frame.naturalPossessionSemantics) && ["both", "absolutive-only", "possessive-only"].includes(frame.stateAvailability) && ["ordinary", "relational-tla", "analogical-tla-derived"].includes(frame.possessorCompatibility) && Array.isArray(frame.thirdPluralPossessorSt2Options) && frame.thirdPluralPossessorSt2Options.length > 0 && frame.thirdPluralPossessorSt2Options.every(value => ["m", "n"].includes(value)) && Array.isArray(frame.allowedStateValues) && frame.allowedStateValues.includes(frame.selectedState) && isClassicalNahuatlStemOperationRecord(frame.lesson15StemOperationRecord) && frame.lesson15StemOperationRecord.sourceStem === frame.sourceStem && isClassicalNahuatlPossessorReduplicationSelection(frame.lesson15PossessorReduplicationSelection) && frame.lesson15PossessorReduplicationSelection.sourceStem === frame.sourceStem && frame.formulaStringAuthority === false && frame.surfaceStringAuthority === false);
    }
    function buildClassicalNahuatlAbsolutiveNncFrame(stem = "", options = {}) {
      const normalizedStem = normalizeClassicalNahuatlNncStem(stem);
      const suppliedSourceAuthorityFrame = options.nncSourceAuthorityFrame;
      const nncSourceAuthorityFrame = isClassicalNahuatlNncSourceAuthorityFrame(suppliedSourceAuthorityFrame) && suppliedSourceAuthorityFrame.sourceStem === normalizedStem && suppliedSourceAuthorityFrame.selectedState === "absolutive" ? cloneClassicalNahuatlNncValue(suppliedSourceAuthorityFrame) : buildClassicalNahuatlNncSourceAuthorityFrame(normalizedStem, {
        selectedState: "absolutive",
        stateAvailability: options.stateAvailability || "",
        naturalPossessionPolicy: options.naturalPossessionPolicy || "",
        metaphoricalOverride: options.metaphoricalOverride === true,
        policySelectionAuthority: options.policySelectionAuthority || ""
      });
      const nuclearClauseResult =
        buildClassicalNahuatlNncNuclearClauseResult(
          normalizedStem,
          "vacant",
        );
      const nuclearClauseAuthorized = Boolean(nuclearClauseResult);
      const forbiddenTense = normalizeClassicalNahuatlNncToken(options.tense || options.tns);
      const forbiddenValence = normalizeClassicalNahuatlNncToken(options.valence || options.va);
      const lexicalStateAvailability = nncSourceAuthorityFrame.stateAvailability || "";
      const stateAvailabilityKnown = ["both", "absolutive-only", "possessive-only"].includes(lexicalStateAvailability);
      const absolutiveStateAllowed = nncSourceAuthorityFrame.allowedStateValues?.includes("absolutive") === true;
      const stateFrame = {
        kind: "classical-nahuatl-nnc-state-frame",
        arity: "vacant",
        state: "absolutive",
        slots: [],
        lexicalStateAvailability,
        metaphoricalOverride: options.metaphoricalOverride === true,
        authorizationStatus: !forbiddenTense && !forbiddenValence && stateAvailabilityKnown && absolutiveStateAllowed ? "authorized" : "blocked",
        blockReason: forbiddenTense ? "nnc-has-no-tense-slot" : forbiddenValence ? "nnc-state-replaces-valence" : !stateAvailabilityKnown ? "unknown-lexical-state-availability" : !absolutiveStateAllowed ? "nounstem-restricted-to-possessive-state" : "",
        legalWitnessTagIds: ["cn-l12-121-state-not-valence", "cn-l12-122-absolutive-formula"]
      };
      const personFrame = buildClassicalNahuatlNncSubjectPersonFrame({
        subject: options.subject || "3sg",
        followingMaterial: normalizedStem
      });
      const numberFrame = resolveClassicalNahuatlLesson12AbsolutiveNumberDyad({
        subject: options.subject || "3sg",
        nounClass: options.nounClass || options.class || "",
        stem: normalizedStem,
        pluralConnector: options.pluralConnector || options.numberDyad || "",
        animacy: options.animacy || "",
        metaphoricalOverride: options.metaphoricalOverride === true
      });
      const predicateSemanticsFrame = {
        kind: "classical-nahuatl-absolutive-nnc-nounstem-predicate-semantics-frame",
        lexicalMeaningLocus: "nounstem",
        predicateRoleOptions: ["identify", "describe", "locate"],
        predicateFunctionCompulsory: true,
        independentReferentialStatus: false,
        tenseCategoryEncoded: false,
        timeReferenceSource: "discourse-context",
        englishCopularTranslationRequired: true,
        englishCopularTenseSource: "translation-context",
        laterExplicitTenseAssignmentAvailable: true,
        laterExplicitTenseAssignmentSection: "§51.3",
        definitenessEncoded: false,
        indefinitenessEncoded: false,
        englishArticleSource: "translation-context",
        referentialityAccedesTo: "subject-personal-pronoun",
        legalWitnessTagIds: ["cn-l12-125-nounstem-predicate"]
      };
      const referenceSemanticsFrame = {
        kind: "classical-nahuatl-absolutive-nnc-reference-semantics-frame",
        nounstemRole: "culturally-classified-labeling-device",
        culturalAnimacyMayDifferFromEnglishExpectation: true,
        normalAnimacyCorrelation: "nounstem-classification-correlates-with-subject-reference",
        nounstemAnimacyMayRevealSubjectReference: true,
        ultimateAnimacyAuthority: "subject-reference",
        animacyImplicationMayBeContradictedBySubjectReference: true,
        contradictoryReferenceOftenProduces: "metaphorical-construction",
        nounstemIndicatesNumber: false,
        nounstemParticipatesInNumberCompatibility: true,
        animateSubjectNumbers: ["singular", "plural"],
        thirdSingularGenericReferenceAllowed: true,
        nonanimateSubjectNumbers: ["common"],
        commonNumberRealityRange: ["one", "more-than-one"],
        countMassDistinctionEncoded: false,
        englishCountMassSource: "translation-context",
        englishSingularPluralSource: "translation-context",
        commonNumberMatchesAnimateThirdSingularShape: true,
        nounstemClassSelectsNumberMorphShape: true,
        numberPositionBelongsTo: "subject-personal-pronoun",
        numberPositionIsNounstemInflection: false,
        nuclearClauseIsMorphologicalWord: false,
        singularMeaningPredicateWithPluralSubjectAllowed: true,
        subjectPredicateCompartmentalization: "airtight",
        legalWitnessTagIds: ["cn-l12-126-animacy-number"]
      };
      const sourceAuthorized = Boolean(nuclearClauseAuthorized && normalizedStem && isClassicalNahuatlNncSourceAuthorityFrame(nncSourceAuthorityFrame) && stateFrame.authorizationStatus === "authorized");
      const nncSlotFrame = buildClassicalNahuatlNncSlotFrame({
        sourceFrameKind: "classical-nahuatl-absolutive-nnc-absolutive-nnc-frame",
        sourceAuthorizationStatus: sourceAuthorized ? "authorized" : "blocked",
        stem: normalizedStem,
        stateFrame,
        personFrame,
        numberFrame,
        formulaArtifact: options.formulaArtifact || options.formula || "",
        appliedOperationIds: ["nnc-clause-shell", "nnc-absolutive-state"],
        resultOperationId: "nnc-absolutive-state",
        requestedOutputKind: "selected-absolutive-nnc-formula"
      });
      const operationEvaluationFrame = buildClassicalNahuatlNncOperationEvaluationFrame({ nncSlotFrame });
      const authorized = operationEvaluationFrame.authorizationStatus === "authorized";
      const formulaRealization = authorized ? renderClassicalNahuatlNncSlotFrameFormula(nncSlotFrame) : "";
      const proofFrame = {
        kind: "classical-nahuatl-absolutive-nnc-logic-proof-frame",
        lesson: "Andrews Lesson 12",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        proofStatus: authorized ? "proven" : "blocked",
        authorizationStatus: authorized ? "authorized" : "blocked",
        premises: [{
          layer: "canonical-nuclear-clause-structure",
          passed: nuclearClauseAuthorized,
          consumedFrameKind: nuclearClauseResult?.kind || ""
        }, {
          layer: "state-not-valence-or-tense",
          passed: stateFrame.authorizationStatus === "authorized",
          stateFrame
        }, {
          layer: "nnc-nominative-subject",
          passed: personFrame.authorizationStatus === "authorized",
          personFrame
        }, {
          layer: "absolutive-subject-number",
          passed: numberFrame.authorizationStatus === "authorized",
          numberFrame
        }, {
          layer: "shared-nnc-operation-plan",
          passed: authorized,
          operationEvaluationFrame
        }],
        conclusion: {
          authorized,
          authorizationStatus: authorized ? "authorized" : "blocked",
          blockReason: authorized ? "" : !nuclearClauseAuthorized ? "canonical-vacant-state-nnc-structure-not-authorized" : stateFrame.authorizationStatus !== "authorized" ? stateFrame.blockReason : personFrame.authorizationStatus !== "authorized" ? personFrame.blockReason : numberFrame.authorizationStatus !== "authorized" ? numberFrame.blockReason : operationEvaluationFrame.blockReason,
          formulaRealization,
          resultOperationId: operationEvaluationFrame.resultOperationId,
          typedSlotAuthority: true,
          formulaStringAuthority: false
        },
        legalWitnessTagIds: ["cn-l12-absolutive-nnc", ...CLASSICAL_NAHUATL_LESSON12_RULES.map(rule => rule.id)]
      };
      const lesson12Frame = {
        kind: "classical-nahuatl-absolutive-nnc-absolutive-nnc-frame",
        lesson: "Andrews Lesson 12",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: proofFrame.conclusion.blockReason,
        stem: normalizedStem,
        state: "absolutive",
        nounClass: numberFrame.nounClass,
        subject: personFrame.subject,
        nncSourceAuthorityFrame,
        nuclearClauseResult,
        stateFrame,
        predicateSemanticsFrame,
        referenceSemanticsFrame,
        personFrame,
        numberFrame,
        nncSlotFrame,
        operationEvaluationFrame,
        proofFrame,
        selectedOutputLogicFrame: {
          kind: "classical-nahuatl-nnc-selected-output-logic-frame",
          authorizationStatus: authorized ? "authorized" : "blocked",
          selectedFormula: formulaRealization,
          selectedNncSlotFrame: authorized ? nncSlotFrame : null,
          selectedOutputAuthority: "typed-nnc-slots",
          formulaStringAuthority: false,
          displayReceiptAuthority: "not-authority"
        },
        formulaRealization,
        formulaTemplate: "#pers1-pers2(STEM)num1-num2#",
        ruleRefs: getClassicalNahuatlAbsolutiveNncRules(),
        grammarGenerationAllowed: authorized,
        formulaOutputAllowed: authorized,
        surfaceGenerationAllowed: false,
      };
      lesson12Frame.absolutiveParadigmContractFrame = buildClassicalNahuatlAbsolutiveParadigmContractFrame(lesson12Frame);
      lesson12Frame.proofFrame.conclusion.absolutiveParadigmContractFrame = lesson12Frame.absolutiveParadigmContractFrame;
      lesson12Frame.selectedOutputLogicFrame.absolutiveParadigmContractFrame = lesson12Frame.absolutiveParadigmContractFrame;
      return lesson12Frame;
    }
    function buildClassicalNahuatlPossessiveNncFrame(stem = "", options = {}) {
      const normalizedStem = normalizeClassicalNahuatlNncStem(stem);
      const suppliedSourceAuthorityFrame = options.nncSourceAuthorityFrame;
      const nncSourceAuthorityFrame = isClassicalNahuatlNncSourceAuthorityFrame(suppliedSourceAuthorityFrame) && suppliedSourceAuthorityFrame.sourceStem === normalizedStem && suppliedSourceAuthorityFrame.selectedState === "possessive" ? cloneClassicalNahuatlNncValue(suppliedSourceAuthorityFrame) : buildClassicalNahuatlNncSourceAuthorityFrame(normalizedStem, {
        selectedState: "possessive",
        stateAvailability: options.stateAvailability || "",
        naturalPossessionPolicy: options.naturalPossessionPolicy || "",
        naturalPossessionSemantics:
          options.naturalPossessionSemantics || "",
        possessorCompatibility: options.possessorCompatibility || "",
        ...(Object.prototype.hasOwnProperty.call(options, "thirdPluralPossessorSt2Options") ? {
          thirdPluralPossessorSt2Options: options.thirdPluralPossessorSt2Options
        } : {}),
        metaphoricalOverride: options.metaphoricalOverride === true,
        policySelectionAuthority: options.policySelectionAuthority || ""
      });
      const stateFrame = buildClassicalNahuatlPossessiveStateFrame({
        possessor: options.possessor || "",
        subject: options.subject || "3sg",
        stem: normalizedStem,
        nounstemRelationKind: options.nounstemRelationKind || "",
        analogicalTlaDerivedStem: options.analogicalTlaDerivedStem === true,
        thirdPluralPossessorNumberMorph: options.thirdPluralPossessorNumberMorph || "",
        nncSourceAuthorityFrame
      });
      const nuclearClauseResult =
        buildClassicalNahuatlNncNuclearClauseResult(
          normalizedStem,
          stateFrame.arity,
        );
      const nuclearClauseAuthorized = Boolean(nuclearClauseResult);
      const forbiddenTense = normalizeClassicalNahuatlNncToken(options.tense || options.tns);
      const forbiddenValence = normalizeClassicalNahuatlNncToken(options.valence || options.va);
      const lexicalStateAvailability = nncSourceAuthorityFrame.stateAvailability || "";
      const possessiveStateAllowed = nncSourceAuthorityFrame.allowedStateValues?.includes("possessive") === true;
      if (stateFrame.authorizationStatus === "authorized" && (forbiddenTense || forbiddenValence || !possessiveStateAllowed)) {
        stateFrame.authorizationStatus = "blocked";
        stateFrame.blockReason = forbiddenTense ? "nnc-has-no-tense-slot" : forbiddenValence ? "nnc-state-replaces-valence" : "nounstem-restricted-to-absolutive-state";
        stateFrame.slots = [];
      }
      stateFrame.lexicalStateAvailability = lexicalStateAvailability;
      stateFrame.metaphoricalOverride = options.metaphoricalOverride === true;
      const followingStateMaterial = stateFrame.slots.map(slot => slot.carrier).join("");
      const personFrame = buildClassicalNahuatlNncSubjectPersonFrame({
        subject: options.subject || "3sg",
        followingMaterial: followingStateMaterial
      });
      const numberFrame = resolveClassicalNahuatlLesson13PossessiveNumberDyad({
        subject: options.subject || "3sg",
        stem: normalizedStem,
        singularConnector: options.singularConnector || options.numberDyad || "",
        silentConnectorAuthorized: options.silentConnectorAuthorized === true,
        animacy: options.animacy || "",
        metaphoricalOverride: options.metaphoricalOverride === true
      });
      const sourceAuthorized = Boolean(nuclearClauseAuthorized && normalizedStem && isClassicalNahuatlNncSourceAuthorityFrame(nncSourceAuthorityFrame) && stateFrame.authorizationStatus === "authorized" && !forbiddenTense && !forbiddenValence);
      const nncSlotFrame = buildClassicalNahuatlNncSlotFrame({
        sourceFrameKind: "classical-nahuatl-possessive-nnc-possessive-nnc-frame",
        sourceAuthorizationStatus: sourceAuthorized ? "authorized" : "blocked",
        stem: normalizedStem,
        stateFrame,
        personFrame,
        numberFrame,
        formulaArtifact: options.formulaArtifact || options.formula || "",
        appliedOperationIds: ["nnc-clause-shell", "nnc-possessive-state"],
        resultOperationId: "nnc-possessive-state",
        requestedOutputKind: "selected-possessive-nnc-formula"
      });
      const operationEvaluationFrame = buildClassicalNahuatlNncOperationEvaluationFrame({ nncSlotFrame });
      const authorized = operationEvaluationFrame.authorizationStatus === "authorized";
      const formulaRealization = authorized ? renderClassicalNahuatlNncSlotFrameFormula(nncSlotFrame) : "";
      const blockReason = authorized ? "" : !nuclearClauseAuthorized ? "canonical-possessive-state-nnc-structure-not-authorized" : stateFrame.authorizationStatus !== "authorized" ? stateFrame.blockReason : personFrame.authorizationStatus !== "authorized" ? personFrame.blockReason : numberFrame.authorizationStatus !== "authorized" ? numberFrame.blockReason : operationEvaluationFrame.blockReason;
      const proofFrame = {
        kind: "classical-nahuatl-possessive-nnc-logic-proof-frame",
        lesson: "Andrews Lesson 13",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        proofStatus: authorized ? "proven" : "blocked",
        authorizationStatus: authorized ? "authorized" : "blocked",
        premises: [{
          layer: "canonical-possessive-nuclear-clause-structure",
          passed: nuclearClauseAuthorized,
          consumedFrameKind: nuclearClauseResult?.kind || ""
        }, {
          layer: "lesson12-subject-category-system",
          passed: personFrame.authorizationStatus === "authorized",
          personFrame
        }, {
          layer: "lesson13-possessive-state",
          passed: stateFrame.authorizationStatus === "authorized",
          stateFrame
        }, {
          layer: "lesson13-possessive-subject-number",
          passed: numberFrame.authorizationStatus === "authorized",
          numberFrame
        }, {
          layer: "shared-nnc-operation-plan",
          passed: authorized,
          operationEvaluationFrame
        }],
        conclusion: {
          authorized,
          authorizationStatus: authorized ? "authorized" : "blocked",
          blockReason,
          formulaRealization,
          resultOperationId: operationEvaluationFrame.resultOperationId,
          typedSlotAuthority: true,
          formulaStringAuthority: false
        },
        legalWitnessTagIds: ["cn-l13-possessive-nnc", ...CLASSICAL_NAHUATL_LESSON13_RULES.map(rule => rule.id)]
      };
      const lesson13Frame = {
        kind: "classical-nahuatl-possessive-nnc-possessive-nnc-frame",
        lesson: "Andrews Lesson 13",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason,
        stem: normalizedStem,
        state: "possessive",
        subject: personFrame.subject,
        nncSourceAuthorityFrame,
        possessor: stateFrame.possessor,
        nuclearClauseResult,
        stateFrame,
        personFrame,
        numberFrame,
        nncSlotFrame,
        operationEvaluationFrame,
        proofFrame,
        selectedOutputLogicFrame: {
          kind: "classical-nahuatl-nnc-selected-output-logic-frame",
          authorizationStatus: authorized ? "authorized" : "blocked",
          selectedFormula: formulaRealization,
          selectedNncSlotFrame: authorized ? nncSlotFrame : null,
          selectedOutputAuthority: "typed-nnc-slots",
          formulaStringAuthority: false,
          displayReceiptAuthority: "not-authority"
        },
        formulaRealization,
        formulaTemplate: stateFrame.arity === "monadic" ? "#pers1-pers2+st(STEM)num1-num2#" : "#pers1-pers2+st1-st2(STEM)num1-num2#",
        ruleRefs: getClassicalNahuatlPossessiveNncRules(),
        grammarGenerationAllowed: authorized,
        formulaOutputAllowed: authorized,
        surfaceGenerationAllowed: false,
      };
      lesson13Frame.possessiveParadigmContractFrame =
        buildClassicalNahuatlPossessiveParadigmContractFrame(lesson13Frame);
      lesson13Frame.proofFrame.conclusion.possessiveParadigmContractFrame =
        lesson13Frame.possessiveParadigmContractFrame;
      lesson13Frame.selectedOutputLogicFrame.possessiveParadigmContractFrame =
        lesson13Frame.possessiveParadigmContractFrame;
      return lesson13Frame;
    }
    function normalizeClassicalNahuatlSubclass(value = "") {
      const key = normalizeClassicalNahuatlNncToken(value).toLowerCase().replace(/[\s_-]/gu, "");
      const aliases = {
        "1": "1",
        "2": "2",
        "1a": "1A",
        "1b": "1B",
        "2a": "2A",
        "2b": "2B",
        "2c": "2C",
        tl1a: "1A",
        tl1b: "1B",
        tl2a: "2A",
        tl2b: "2B",
        tl2c: "2C",
        tli1: "1",
        tli2: "2"
      };
      return aliases[key] || "";
    }
    function resolveClassicalNahuatlLesson14ConnectorSelection(sourceFrame = null, derivedStemFrame = null, options = {}) {
      const state = sourceFrame?.state || "";
      const nounClass = sourceFrame?.nounClass || "";
      const lexicalSelectionRecord = sourceFrame?.lexicalSelectionRecord || null;
      const lexicalRecordAuthorized = isClassicalNahuatlLexicalSelectionRecord(
        lexicalSelectionRecord
      );
      const subject = normalizeClassicalNahuatlNncSubject(options.subject || "3sg");
      const plural = subject.endsWith("pl");
      const formation = derivedStemFrame?.stemFormation || "";
      const tlSubclass = nounClass === "tl"
        ? normalizeClassicalNahuatlSubclass(options.tlSubclass || "")
        : "";
      const tliSubclass = nounClass === "tli"
        ? normalizeClassicalNahuatlSubclass(options.tliSubclass || "")
        : "";
      const selectedPluralConnector = normalizeClassicalNahuatlNncToken(options.pluralConnector || "").toLowerCase().replace(/ø/gu, "0");
      const pluralSelectionAuthority = normalizeClassicalNahuatlNncToken(options.pluralSelectionAuthority || (selectedPluralConnector ? "user-selection" : "")).toLowerCase();
      const pluralAuthorityAllowed = ["user-selection", "external-lexical-record"].includes(pluralSelectionAuthority);
      let singularConnector = "";
      let pluralConnector = "";
      let silentConnectorAuthorized = false;
      let selectionRule = "";
      let blockReason = "";
      if (!sourceFrame || sourceFrame.authorizationStatus !== "authorized") {
        blockReason = sourceFrame?.blockReason || "authorized-lesson14-source-frame-required";
      } else if (!subject) {
        blockReason = "unknown-nnc-subject";
      } else if (state === "absolutive" && !plural) {
        selectionRule = "class-names-absolutive-singular-common-num1-selection";
      } else if (state === "absolutive" && plural) {
        const knownConnector = ["t-in", "m-eh", "0-h"].includes(selectedPluralConnector);
        const connectorInLexicalRecord = lexicalRecordAuthorized
          && lexicalSelectionRecord.pluralConnectorOptions.includes(selectedPluralConnector);
        const formationInLexicalRecord = lexicalRecordAuthorized
          && lexicalSelectionRecord.pluralStemFormationOptions.includes(formation);
        const affinityAllowed = formation !== "affinity"
          || nounClass === "tl" && ["0-h", "m-eh"].includes(selectedPluralConnector)
          || ["tli", "in"].includes(nounClass) && selectedPluralConnector === "t-in"
          || lexicalSelectionRecord?.affinityConnectorExceptionAuthorized === true;
        const distributiveSourceConnector = lexicalSelectionRecord?.sourcePlainPluralConnector || "";
        const distributiveAllowed = formation !== "distributive-varietal" || distributiveSourceConnector && distributiveSourceConnector === selectedPluralConnector;
        if (!knownConnector) blockReason = "lexical-plural-number-dyad-selection-required";else if (!pluralAuthorityAllowed) blockReason = "plural-connector-must-be-user-selected-or-supplied-by-external-lexical-record";else if (!affinityAllowed) blockReason = "affinity-plural-connector-contradicts-class-guideline-without-lexical-exception";else if (!distributiveAllowed) blockReason = "distributive-plural-must-follow-source-stem-connector";else {
          if (!connectorInLexicalRecord) {
            blockReason = "selected-plural-connector-not-in-typed-lexical-record";
          } else if (!formationInLexicalRecord) {
            blockReason = "selected-plural-stem-formation-not-in-typed-lexical-record";
          }
        }
        if (!blockReason) {
          pluralConnector = selectedPluralConnector;
          selectionRule = formation === "affinity" ? "lexical-affinity-plural-selection-with-class-guideline" : formation === "distributive-varietal" ? "distributive-plural-copies-source-stem-connector" : "lexical-plain-plural-selection-with-class-guideline";
        }
      } else if (state === "possessive" && plural) {
        if (
          formation !== "plain"
          && lexicalSelectionRecord?.possessivePluralDerivedSemanticNeed !== true
        ) {
          blockReason = "possessive-plural-derived-stem-requires-typed-semantic-need";
        } else {
          selectionRule = formation === "plain" ? "possessive-plural-normally-plain-general-use-plus-number-dyad" : "possessive-plural-semantic-need-authorizes-derived-general-use-plus-number-dyad";
        }
      } else if (state === "possessive") {
        if (["in", "zero"].includes(nounClass)) {
          if (sourceFrame.generalUseShape !== "base") blockReason = "in-and-zero-possessive-common-require-base-general-use-shape";else {
            singularConnector = "0";
            selectionRule = "in-or-zero-class-base-plus-zero-num1";
          }
        } else if (nounClass === "tli") {
          if (sourceFrame.generalUseShape !== "base") blockReason = "tli-possessive-common-requires-base-general-use-shape";else if (tliSubclass === "1") {
            singularConnector = "0";
            selectionRule = "tli-subclass1-zero-num1";
          } else if (tliSubclass === "2") {
            const selected = normalizeClassicalNahuatlNncToken(options.singularConnector || "hui").toLowerCase();
            if (
              (selected === "⎕" || selected === "silent")
              && lexicalSelectionRecord?.tliSubclass2SilentNum1Authorized === true
            ) {
              singularConnector = "⎕";
              silentConnectorAuthorized = true;
              selectionRule = "tli-subclass2-lexically-authorized-silent-alternative";
            } else if (selected === "hui") {
              singularConnector = "hui";
              selectionRule = "tli-subclass2-hui-num1";
            } else {
              blockReason = "tli-subclass2-requires-hui-or-lexically-authorized-silent-alternative";
            }
          } else {
            blockReason = "tli-possessive-common-subclass-selection-required";
          }
        } else if (nounClass === "tl") {
          const baseSubclass = ["1A", "1B"].includes(tlSubclass);
          const truncatedSubclass = ["2A", "2B", "2C"].includes(tlSubclass);
          if (!tlSubclass) blockReason = "tl-possessive-common-subclass-selection-required";else if (baseSubclass && sourceFrame.generalUseShape !== "base") blockReason = "tl-subclass1-requires-base-general-use-shape";else if (truncatedSubclass && sourceFrame.generalUseShape !== "truncated") blockReason = "tl-subclass2-requires-truncated-general-use-shape";else if (tlSubclass === "2C" && sourceFrame.truncationRepair !== "supportive-i") blockReason = "tl-subclass2c-requires-supportive-i-repair-after-truncation";else if (["2A", "2B"].includes(tlSubclass) && sourceFrame.truncationRepair === "supportive-i") blockReason = "supportive-i-repair-is-specific-to-tl-subclass2c";else {
            singularConnector = tlSubclass === "1A" ? "uh" : "0";
            selectionRule = `tl-subclass-${tlSubclass.toLowerCase()}-${singularConnector}-num1`;
          }
        }
      }
      const authorized = Boolean(!blockReason && selectionRule);
      return {
        kind: "classical-nahuatl-nounstem-connector-selection-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason,
        state,
        subject,
        subjectNumber: plural ? "plural" : subject === "3common" ? "common" : "singular",
        nounClass,
        stemFormation: formation,
        tlSubclass,
        tliSubclass,
        singularConnector,
        pluralConnector,
        silentConnectorAuthorized,
        pluralSelectionAuthority,
        lexicalSelectionRecordKind: lexicalSelectionRecord?.kind || "",
        lexicalSelectionRecordAuthorized: lexicalRecordAuthorized,
        selectionRule,
        connectorBelongsTo: "subject-personal-pronoun",
        connectorIsNounSuffix: false,
        classGuidelineIsLexicalSelection: false,
        legalWitnessTagIds: state === "absolutive" ? ["cn-l14-144-absolutive-common", "cn-l14-145-absolutive-plural"] : ["cn-l14-146-possessive-plural", "cn-l14-147-possessive-common"]
      };
    }
    function buildClassicalNahuatlOrthographicBoundaryFrame(
      sourceFrame = null,
      nncSlotFrame = null
    ) {
      const typedSlots = isClassicalNahuatlNncSlotFrame(nncSlotFrame)
        ? nncSlotFrame.slots
        : null;
      const predicateStem = normalizeClassicalNahuatlNncStem(
        typedSlots?.predicate?.stem || ""
      );
      const stateCarriers = Array.isArray(typedSlots?.state?.slots)
        ? typedSlots.state.slots.map(slot => slot?.carrier || "")
        : [];
      const possessorSt1 = stateCarriers[0] || "";
      const possessorSt2 = stateCarriers[1] || "";
      const num1 = typedSlots?.number?.num1 || "";
      const lexicalRecord = sourceFrame?.lexicalSelectionRecord || null;
      const sourceRestrictedStem = sourceFrame?.restrictedUseStem || "";
      const actions = [{
        identity: "long-o-before-uh-preserved",
        applies: /ō$/u.test(predicateStem) && num1 === "uh",
        sourceSequence: /ō$/u.test(predicateStem) && num1 === "uh" ? "ō+uh" : "",
        outputPolicy: "preserve-long-o-and-stress-bearing-stem-dimensions"
      }, {
        identity: "third-possessor-i-plus-long-initial-i-preserved",
        applies: possessorSt1 === "ī" && /^[ī]/u.test(predicateStem),
        sourceSequence: possessorSt1 === "ī" && /^[ī]/u.test(predicateStem) ? "ī+ī" : "",
        outputPolicy: "preserve-both-long-vowels"
      }, {
        identity: "third-possessor-i-shortened-before-i-glottal",
        applies: possessorSt1 === "i" && /^ih/u.test(predicateStem),
        sourceSequence: possessorSt1 === "i" && /^ih/u.test(predicateStem) ? "i+ih" : "",
        outputPolicy: "retain-short-possessor-i-before-stem-i-glottal"
      }, {
        identity: "supportive-initial-i-deleted-after-third-possessor-i",
        applies: lexicalRecord?.supportiveInitialI === true
          && lexicalRecord.selectedInitialVariant === "omitted"
          && ["i", "ī"].includes(possessorSt1),
        sourceSequence: lexicalRecord?.supportiveInitialI === true
          ? `${possessorSt1}+${sourceRestrictedStem}`
          : "",
        outputPolicy: "use-typed-supportive-i-less-stem-variant"
      }];
      const authorized = Boolean(
        sourceFrame?.authorizationStatus === "authorized"
        && typedSlots
        && predicateStem
      );
      return {
        kind: "classical-nahuatl-nounstem-orthographic-boundary-frame",
        version: 1,
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized ? "" : "authorized-lesson14-source-and-typed-nnc-slots-required",
        predicateStem,
        possessorSt1,
        possessorSt2,
        num1,
        actions,
        appliedActionIds: actions.filter(action => action.applies).map(action => action.identity),
        vowelLengthAuthority: "explicit-typed-source-spelling",
        traditionalUnderwritingIsAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        legalWitnessTagIds: ["cn-l14-148-constituent-ambiguity"]
      };
    }
    function buildClassicalNahuatlNounstemParadigmContractFrame(lesson14Frame = null) {
      const sourceFrame = lesson14Frame?.sourceFrame || null;
      const derivedStemFrame = lesson14Frame?.derivedStemFrame || null;
      const connectorFrame = lesson14Frame?.connectorSelectionFrame || null;
      const ambiguityFrame = lesson14Frame?.ambiguityFrame || null;
      const orthographicBoundaryFrame = lesson14Frame?.orthographicBoundaryFrame || null;
      const nncSlotFrame = lesson14Frame?.nncSlotFrame || null;
      if (
        lesson14Frame?.kind !== "classical-nahuatl-nounstem-class-governed-nnc-frame"
        || lesson14Frame?.authorizationStatus !== "authorized"
        || sourceFrame?.authorizationStatus !== "authorized"
        || derivedStemFrame?.authorizationStatus !== "authorized"
        || connectorFrame?.authorizationStatus !== "authorized"
        || !["authorized", "not-required"].includes(ambiguityFrame?.authorizationStatus)
        || orthographicBoundaryFrame?.authorizationStatus !== "authorized"
        || !isClassicalNahuatlNncSlotFrame(nncSlotFrame)
        || !lesson14Frame.formulaRealization
      ) {
        return null;
      }
      const useStemKindInventory = [{
        identity: "restricted-use",
        selectedByState: "absolutive",
        allowedShapeIdentities: ["base"],
        environment: "absolutive-state-nnc"
      }, {
        identity: "general-use",
        selectedByState: "possessive",
        allowedShapeIdentities: ["base", "truncated"],
        environment: "possessive-state-nnc-or-compound-embed"
      }];
      const useStemShapeInventory = [{
        identity: "base",
        action: "identity",
        environments: ["restricted-use", "general-use"]
      }, {
        identity: "truncated",
        action: "delete-tagged-final-ephemeral-a-or-i",
        environments: ["general-use"]
      }, {
        identity: "glottalized",
        action: "replace-final-long-vowel-with-short-vowel-plus-glottal-stop",
        environments: ["general-use-compound-embed-only"]
      }];
      const nounClassInventory = [{
        identity: "tl",
        stemFinalConstraint: "vowel",
        absolutiveSingularCommonNum1: "tl"
      }, {
        identity: "tli",
        stemFinalConstraint: "consonant",
        absolutiveSingularCommonNum1: "tli",
        num1SurfaceVariants: ["tli", "li"]
      }, {
        identity: "in",
        stemFinalConstraint: "consonant",
        absolutiveSingularCommonNum1: "in"
      }, {
        identity: "zero",
        stemFinalConstraint: "vowel-or-consonant",
        absolutiveSingularCommonNum1: CLASSICAL_NAHUATL_NNC_ZERO
      }].map(entry => ({
        ...entry,
        classMembershipSource: "lexical"
      }));
      const classSubclassInventory = [
        ["tl-1a", "tl", "base", "uh", "none"],
        ["tl-1b", "tl", "base", CLASSICAL_NAHUATL_NNC_ZERO, "none"],
        ["tl-2a", "tl", "truncated", CLASSICAL_NAHUATL_NNC_ZERO, "delete-ephemeral-i-after-long-a-or-e"],
        ["tl-2b", "tl", "truncated", CLASSICAL_NAHUATL_NNC_ZERO, "delete-ephemeral-a-or-i-after-single-consonant"],
        ["tl-2c", "tl", "truncated", CLASSICAL_NAHUATL_NNC_ZERO, "delete-ephemeral-a-then-add-supportive-i"],
        ["tli-1", "tli", "base", CLASSICAL_NAHUATL_NNC_ZERO, "none"],
        ["tli-2", "tli", "base", "hui", "none"]
      ].map(([identity, nounClass, generalUseShape, possessiveSingularCommonNum1, truncationAction]) => ({
        identity,
        nounClass,
        generalUseShape,
        possessiveSingularCommonNum1,
        ...(identity === "tli-2" ? { num1LexicalAlternatives: ["⎕"] } : {}),
        truncationAction
      }));
      const stemRelationInventory = [
        ["plain", "identity"],
        ["affinity", "long-vowel-reduplicative-prefix"],
        ["distributive-varietal", "glottal-stop-reduplicative-prefix"]
      ].map(([identity, derivation]) => ({
        identity,
        derivation,
        grammaticalNumberValue: "none"
      }));
      const stateSubjectEnvironmentInventory = [
        ["absolutive-singular-or-common", "absolutive", "singular-or-common", "restricted-use"],
        ["absolutive-plural", "absolutive", "plural", "restricted-use"],
        ["possessive-singular-or-common", "possessive", "singular-or-common", "general-use"],
        ["possessive-plural", "possessive", "plural", "general-use"]
      ].map(([identity, state, subjectNumber, useStemKind]) => ({
        identity,
        state,
        subjectNumber,
        useStemKind
      }));
      const numberDyadInventory = [
        ["absolutive-singular-common-tl", "absolutive", "singular-or-common", "tl", CLASSICAL_NAHUATL_NNC_ZERO, []],
        ["absolutive-singular-common-tli-li", "absolutive", "singular-or-common", "tli", CLASSICAL_NAHUATL_NNC_ZERO, ["tli", "li"]],
        ["absolutive-singular-common-in", "absolutive", "singular-or-common", "in", CLASSICAL_NAHUATL_NNC_ZERO, []],
        ["absolutive-singular-common-zero", "absolutive", "singular-or-common", CLASSICAL_NAHUATL_NNC_ZERO, CLASSICAL_NAHUATL_NNC_ZERO, []],
        ["absolutive-plural-t-in", "absolutive", "plural", "t", "in", []],
        ["absolutive-plural-m-eh", "absolutive", "plural", "m", "eh", []],
        ["absolutive-plural-zero-h", "absolutive", "plural", CLASSICAL_NAHUATL_NNC_ZERO, "h", []],
        ["possessive-singular-common-uh", "possessive", "singular-or-common", "uh", CLASSICAL_NAHUATL_NNC_ZERO, []],
        ["possessive-singular-common-hui", "possessive", "singular-or-common", "hui", CLASSICAL_NAHUATL_NNC_ZERO, []],
        ["possessive-singular-common-zero", "possessive", "singular-or-common", CLASSICAL_NAHUATL_NNC_ZERO, CLASSICAL_NAHUATL_NNC_ZERO, []],
        ["possessive-singular-common-silent", "possessive", "singular-or-common", "⎕", CLASSICAL_NAHUATL_NNC_ZERO, []],
        ["possessive-plural-hu-an", "possessive", "plural", "hu", "ān", []]
      ].map(([identity, state, subjectNumber, num1, num2, num1SurfaceVariants]) => ({
        identity,
        state,
        subjectNumber,
        num1,
        num2,
        ...(num1SurfaceVariants.length ? { num1SurfaceVariants } : {})
      }));
      const constituentAmbiguityInventory = [
        ["front-o", "st2-o-or-stem-initial-o"],
        ["front-m", "st2-m-or-stem-initial-m"],
        ["back-uh", "stem-final-uh-or-num1-uh"],
        ["back-tl", "stem-final-tl-or-num1-tl"],
        ["back-tli", "stem-final-tli-or-num1-tli"]
      ].map(([identity, competingBoundary]) => ({ identity, competingBoundary }));
      const subjectReferenceAnimacyInventory = [{
        identity: "animate-singular-or-plural",
        subjectNumbers: ["singular", "plural"],
        derivedCommonRelationAvailable: false
      }, {
        identity: "nonanimate-common",
        subjectNumbers: ["common"],
        derivedCommonRelationAvailable: true
      }, {
        identity: "metaphorical-animate",
        subjectNumbers: ["singular", "plural"],
        derivedCommonRelationAvailable: false
      }];
      const lexicalAlternativeInventory = [{
        identity: "alternative-class-membership",
        selectionSource: "typed-lexical-record",
        cardinality: "one-or-more"
      }, {
        identity: "supportive-initial-i-variant",
        selectionSource: "typed-lexical-record",
        cardinality: "retained-or-omitted"
      }, {
        identity: "plural-stem-formation",
        selectionSource: "typed-lexical-record",
        cardinality: "one-two-or-three-with-optional-preference"
      }, {
        identity: "plural-number-dyad",
        selectionSource: "typed-lexical-record",
        cardinality: "one-two-or-three-with-optional-preference"
      }, {
        identity: "tli-subclass2-silent-num1",
        selectionSource: "typed-lexical-record",
        cardinality: "hui-only-or-hui-and-silent"
      }];
      const orthographicBoundaryInventory = [{
        identity: "long-o-before-uh-preserved",
        condition: "stem-final-long-o-plus-num1-uh",
        action: "preserve-long-o-and-stress"
      }, {
        identity: "third-possessor-i-plus-long-initial-i-preserved",
        condition: "third-singular-possessor-plus-stem-initial-long-i",
        action: "preserve-two-long-i-vowels"
      }, {
        identity: "third-possessor-i-shortened-before-i-glottal",
        condition: "third-singular-possessor-plus-stem-initial-i-glottal",
        action: "shorten-possessor-i"
      }, {
        identity: "supportive-initial-i-deleted-after-third-possessor-i",
        condition: "third-singular-possessor-plus-typed-supportive-initial-i",
        action: "select-supportive-i-less-stem-variant"
      }];
      const selectedSubjectNumber = connectorFrame.subjectNumber === "plural"
        ? "plural"
        : "singular-or-common";
      const selectedNumber = nncSlotFrame.slots.number || {};
      const selectedNumberDyadIdentity = numberDyadInventory.find(entry => (
        entry.state === sourceFrame.state
        && entry.subjectNumber === selectedSubjectNumber
        && entry.num2 === selectedNumber.num2
        && (
          entry.num1 === selectedNumber.num1
          || entry.num1SurfaceVariants?.includes(selectedNumber.num1)
        )
      ))?.identity || "";
      const subclassApplies = sourceFrame.state === "possessive"
        && selectedSubjectNumber === "singular-or-common";
      const selectedSubclassIdentity = !subclassApplies
        ? "not-applicable"
        : sourceFrame.nounClass === "tl" && connectorFrame.tlSubclass
          ? `tl-${connectorFrame.tlSubclass.toLowerCase()}`
          : sourceFrame.nounClass === "tli" && connectorFrame.tliSubclass
            ? `tli-${connectorFrame.tliSubclass.toLowerCase()}`
            : "not-applicable";
      const selectedCoordinate = {
        coordinateId: [
          sourceFrame.state,
          connectorFrame.subject,
          sourceFrame.nounClass,
          selectedSubclassIdentity,
          sourceFrame.selectedUseKind,
          sourceFrame.generalUseShape,
          derivedStemFrame.stemFormation,
          selectedNumberDyadIdentity,
          ambiguityFrame.selectedAnalysisId || "unambiguous"
        ].join(":"),
        state: sourceFrame.state,
        subject: connectorFrame.subject,
        subjectNumber: connectorFrame.subjectNumber,
        stateSubjectEnvironmentIdentity:
          `${sourceFrame.state}-${selectedSubjectNumber}`,
        restrictedUseStem: sourceFrame.restrictedUseStem,
        selectedUseStem: sourceFrame.selectedUseStem,
        selectedUseStemKind: sourceFrame.selectedUseKind,
        selectedUseStemShape: sourceFrame.selectedUseShape,
        generalUseStemShape: sourceFrame.generalUseShape,
        nounClass: sourceFrame.nounClass,
        classSubclassIdentity: selectedSubclassIdentity,
        stemRelation: derivedStemFrame.stemFormation,
        selectedPredicateStem: nncSlotFrame.slots.predicate.stem,
        numberDyadIdentity: selectedNumberDyadIdentity,
        num1: selectedNumber.num1,
        num2: selectedNumber.num2,
        connectorBelongsTo: "subject-personal-pronoun",
        grammaticalNumberInPredicateStem: false,
        constituentAnalysisId: ambiguityFrame.selectedAnalysisId || "unambiguous",
        lexicalSelectionRecord: cloneClassicalNahuatlNncValue(
          sourceFrame.lexicalSelectionRecord
        ),
        orthographicBoundaryFrame: cloneClassicalNahuatlNncValue(
          orthographicBoundaryFrame
        ),
        typedSlotFrame: cloneClassicalNahuatlNncValue(nncSlotFrame),
        formulaRealization: lesson14Frame.formulaRealization,
        formulaStringAuthority: false,
        displayTextAuthority: false
      };
      return {
        kind: "classical-nahuatl-nounstem-nounstem-paradigm-contract-frame",
        version: 1,
        authorizationStatus: "authorized",
        realizationPhase: "structural-formula",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        sourceSection: "14.1-14.8",
        greatestCommonDivisor: {
          identityId: "lesson14:class-governed-nounstem-selection",
          operationKind: "nounstem-selection-inside-nnc-predicate",
          inputKind: "lexically-classified-restricted-use-nounstem",
          outputKind: "one-selected-nounstem-in-predicate-slot",
          predicateSlot: "STEM",
          formulaSlotDelta: 0,
          connectorBelongsTo: "subject-personal-pronoun",
          nounstemRelationIsGrammaticalNumber: false,
          classMembershipSource: "lexical-not-form-prediction",
          prerequisiteOperations: [
            "nnc-clause-shell",
            "nnc-absolutive-state-or-possessive-state"
          ]
        },
        leastCommonMultiple: {
          distinctionAxes: [...CLASSICAL_NAHUATL_LESSON14_NNC_DISTINCTION_AXES],
          useStemKindInventory,
          useStemShapeInventory,
          nounClassInventory,
          classSubclassInventory,
          stemRelationInventory,
          stateSubjectEnvironmentInventory,
          subjectReferenceAnimacyInventory,
          numberDyadInventory,
          lexicalAlternativeInventory,
          constituentAmbiguityInventory,
          orthographicBoundaryInventory,
          selectedCoordinate,
          selectedRealizations: [selectedCoordinate]
        },
        ruleRefs: getClassicalNahuatlNounstemRules(),
        callerSuppliedAuthorityAccepted: false,
        formulaStringAuthority: false,
        displayTextAuthority: false
      };
    }
    function buildClassicalNahuatlClassGovernedNncFrame(restrictedUseStem = "", options = {}) {
      const state = normalizeClassicalNahuatlNncToken(options.state || "absolutive").toLowerCase();
      const subject = normalizeClassicalNahuatlNncSubject(options.subject || "3sg");
      const normalizedRestrictedUseStem = normalizeClassicalNahuatlNncStem(restrictedUseStem);
      const suppliedSourceAuthorityFrame = options.nncSourceAuthorityFrame;
      const suppliedSourceAuthorityFrameMatches = isClassicalNahuatlNncSourceAuthorityFrame(suppliedSourceAuthorityFrame) && suppliedSourceAuthorityFrame.sourceStem === normalizedRestrictedUseStem && suppliedSourceAuthorityFrame.selectedState === state;
      const nncSourceAuthorityFrame = suppliedSourceAuthorityFrame ? cloneClassicalNahuatlNncValue(suppliedSourceAuthorityFrame) : buildClassicalNahuatlNncSourceAuthorityFrame(normalizedRestrictedUseStem, {
        selectedState: state,
        stateAvailability: options.stateAvailability || "",
        naturalPossessionPolicy: options.naturalPossessionPolicy || "",
        possessorCompatibility: options.possessorCompatibility || "",
        ...(Object.prototype.hasOwnProperty.call(options, "thirdPluralPossessorSt2Options") ? {
          thirdPluralPossessorSt2Options: options.thirdPluralPossessorSt2Options
        } : {}),
        metaphoricalOverride: options.metaphoricalOverride === true,
        policySelectionAuthority: options.policySelectionAuthority || ""
      });
      const sourceFrame = buildClassicalNahuatlNounstemSourceFrame(restrictedUseStem, {
        ...options,
        state
      });
      const derivedStemFrame = buildClassicalNahuatlDerivedStemFrame(sourceFrame.selectedUseStem, options);
      const connectorSelectionFrame = resolveClassicalNahuatlLesson14ConnectorSelection(sourceFrame, derivedStemFrame, {
        ...options,
        subject
      });
      const selectedStem = derivedStemFrame.derivedStem;
      let lowerNncFrame = null;
      if ((!suppliedSourceAuthorityFrame || suppliedSourceAuthorityFrameMatches) && sourceFrame.authorizationStatus === "authorized" && derivedStemFrame.authorizationStatus === "authorized" && connectorSelectionFrame.authorizationStatus === "authorized") {
        if (state === "absolutive") {
          lowerNncFrame = buildClassicalNahuatlAbsolutiveNncFrame(selectedStem, {
            subject,
            nounClass: sourceFrame.nounClass,
            pluralConnector: connectorSelectionFrame.pluralConnector,
            animacy: options.animacy || "",
            metaphoricalOverride: options.metaphoricalOverride === true,
            stateAvailability: nncSourceAuthorityFrame.stateAvailability || "",
            naturalPossessionPolicy: nncSourceAuthorityFrame.naturalPossessionPolicy || "",
            policySelectionAuthority: nncSourceAuthorityFrame.policySelectionAuthority || "",
            nncSourceAuthorityFrame,
            formulaArtifact: options.formulaArtifact || options.formula || ""
          });
        } else if (state === "possessive") {
          lowerNncFrame = buildClassicalNahuatlPossessiveNncFrame(selectedStem, {
            subject,
            possessor: options.possessor || "",
            nounstemRelationKind: options.nounstemRelationKind || "",
            analogicalTlaDerivedStem: options.analogicalTlaDerivedStem === true,
            thirdPluralPossessorNumberMorph: options.thirdPluralPossessorNumberMorph || "",
            singularConnector: connectorSelectionFrame.singularConnector,
            silentConnectorAuthorized: connectorSelectionFrame.silentConnectorAuthorized,
            stateAvailability: nncSourceAuthorityFrame.stateAvailability || "",
            naturalPossessionPolicy: nncSourceAuthorityFrame.naturalPossessionPolicy || "",
            policySelectionAuthority: nncSourceAuthorityFrame.policySelectionAuthority || "",
            nncSourceAuthorityFrame,
            metaphoricalOverride: options.metaphoricalOverride === true,
            formulaArtifact: options.formulaArtifact || options.formula || ""
          });
        }
      }
      const lowerTypedFrame = lowerNncFrame?.nncSlotFrame;
      const ambiguityKind = normalizeClassicalNahuatlNncToken(options.constituentAmbiguityKind || "none").toLowerCase().replace(/[\s_]/gu, "-");
      const constituentAnalyses = Array.isArray(options.constituentAnalyses) && options.constituentAnalyses.length ? options.constituentAnalyses : buildClassicalNahuatlSurfaceConstituentAnalyses(lowerNncFrame, options);
      const ambiguityFrame = buildClassicalNahuatlConstituentAnalysisFrame(constituentAnalyses, {
        selectedAnalysisId: options.selectedConstituentAnalysisId || "",
        selectionAuthority: options.constituentAnalysisSelectionAuthority || "",
        requireMultipleAnalyses: ambiguityKind !== "none"
      });
      const lowerSlotFrame = lowerNncFrame?.authorizationStatus === "authorized" && isClassicalNahuatlNncSlotFrame(lowerTypedFrame) ? cloneClassicalNahuatlNncValue(lowerTypedFrame) : null;
      let nncSlotFrame = applyClassicalNahuatlLesson14SelectedConstituentAnalysis(lowerSlotFrame, ambiguityFrame);
      if (nncSlotFrame) {
        nncSlotFrame.sourceFrameKind = "classical-nahuatl-nounstem-class-governed-nnc-frame";
        nncSlotFrame.nounClass = sourceFrame.nounClass;
        nncSlotFrame.lesson14SourceFrameKind = sourceFrame.kind;
        nncSlotFrame.lesson14DerivedStemFrameKind = derivedStemFrame.kind;
        nncSlotFrame.lesson14ConnectorSelectionFrameKind = connectorSelectionFrame.kind;
        nncSlotFrame.appliedOperationIds = Array.from(new Set([
          ...(nncSlotFrame.appliedOperationIds || []),
          "nnc-nounstem-selection",
          ...(derivedStemFrame.stemFormation === "plain" ? [] : ["nnc-derived-stem-relation"]),
          ...(ambiguityFrame.selectionRequired && nncSlotFrame.lesson14ConstituentAnalysisId ? ["nnc-constituent-analysis"] : [])
        ]));
        nncSlotFrame.resultOperationId = ambiguityFrame.selectionRequired && nncSlotFrame.lesson14ConstituentAnalysisId
          ? "nnc-constituent-analysis"
          : derivedStemFrame.stemFormation === "plain" ? "nnc-nounstem-selection" : "nnc-derived-stem-relation";
        nncSlotFrame.requestedOutputKind = "selected-class-governed-nnc-formula";
        nncSlotFrame.semanticIdentity = [nncSlotFrame.semanticIdentity, sourceFrame.nounClass, sourceFrame.selectedUseKind, sourceFrame.generalUseShape, derivedStemFrame.stemFormation, connectorSelectionFrame.selectionRule].join("|");
      }
      const operationEvaluationFrame = buildClassicalNahuatlNncOperationEvaluationFrame({ nncSlotFrame });
      const ambiguityAuthorized = ["authorized", "not-required"].includes(ambiguityFrame.authorizationStatus);
      const orthographicBoundaryFrame =
        buildClassicalNahuatlOrthographicBoundaryFrame(sourceFrame, nncSlotFrame);
      const authorized = operationEvaluationFrame.authorizationStatus === "authorized"
        && ambiguityAuthorized
        && orthographicBoundaryFrame.authorizationStatus === "authorized";
      const formulaRealization = authorized ? renderClassicalNahuatlNncSlotFrameFormula(nncSlotFrame) : "";
      const blockReason = authorized ? "" : suppliedSourceAuthorityFrame && !suppliedSourceAuthorityFrameMatches ? nncSourceAuthorityFrame.blockReason || "authorized-matching-nnc-source-authority-frame-required" : sourceFrame.authorizationStatus !== "authorized" ? sourceFrame.blockReason : derivedStemFrame.authorizationStatus !== "authorized" ? derivedStemFrame.blockReason : connectorSelectionFrame.authorizationStatus !== "authorized" ? connectorSelectionFrame.blockReason : !ambiguityAuthorized ? ambiguityFrame.blockReason : lowerNncFrame?.blockReason || operationEvaluationFrame.blockReason;
      const proofFrame = {
        kind: "classical-nahuatl-nounstem-logic-proof-frame",
        lesson: "Andrews Lesson 14",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        proofStatus: authorized ? "proven" : "blocked",
        authorizationStatus: authorized ? "authorized" : "blocked",
        premises: [{
          layer: "lesson14-lexical-class-and-use-stem",
          passed: sourceFrame.authorizationStatus === "authorized",
          sourceFrame
        }, {
          layer: "lesson14-internal-derived-stem",
          passed: derivedStemFrame.authorizationStatus === "authorized",
          derivedStemFrame
        }, {
          layer: "lesson14-state-number-connector",
          passed: connectorSelectionFrame.authorizationStatus === "authorized",
          connectorSelectionFrame
        }, {
          layer: state === "absolutive" ? "lesson12-consumed-output" : "lesson13-consumed-output",
          passed: lowerNncFrame?.authorizationStatus === "authorized",
          consumedFrameKind: lowerNncFrame?.kind || ""
        }, {
          layer: "lesson14-constituent-analysis",
          passed: ambiguityAuthorized,
          ambiguityFrame
        }, {
          layer: "shared-nnc-operation-plan",
          passed: authorized,
          operationEvaluationFrame
        }],
        conclusion: {
          authorized,
          authorizationStatus: authorized ? "authorized" : "blocked",
          blockReason,
          formulaRealization,
          resultOperationId: operationEvaluationFrame.resultOperationId,
          typedSlotAuthority: true,
          formulaStringAuthority: false
        },
        legalWitnessTagIds: ["cn-l14-nounstem-classes", ...CLASSICAL_NAHUATL_LESSON14_RULES.map(rule => rule.id)]
      };
      const lesson14Frame = {
        kind: "classical-nahuatl-nounstem-class-governed-nnc-frame",
        lesson: "Andrews Lesson 14",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason,
        state,
        subject,
        nncSourceAuthorityFrame,
        sourceFrame,
        derivedStemFrame,
        connectorSelectionFrame,
        ambiguityFrame,
        orthographicBoundaryFrame,
        lowerNncFrame,
        nncSlotFrame,
        operationEvaluationFrame,
        proofFrame,
        selectedOutputLogicFrame: {
          kind: "classical-nahuatl-nnc-selected-output-logic-frame",
          authorizationStatus: authorized ? "authorized" : "blocked",
          selectedFormula: formulaRealization,
          selectedNncSlotFrame: authorized ? nncSlotFrame : null,
          selectedOutputAuthority: "typed-nnc-slots-after-nounstem-selection-operation",
          formulaStringAuthority: false,
          displayReceiptAuthority: "not-authority"
        },
        formulaRealization,
        ruleRefs: getClassicalNahuatlNounstemRules(),
        grammarGenerationAllowed: authorized,
        formulaOutputAllowed: authorized,
        surfaceGenerationAllowed: false,
      };
      lesson14Frame.nounstemParadigmContractFrame =
        buildClassicalNahuatlNounstemParadigmContractFrame(lesson14Frame);
      lesson14Frame.proofFrame.conclusion.nounstemParadigmContractFrame =
        lesson14Frame.nounstemParadigmContractFrame;
      lesson14Frame.selectedOutputLogicFrame.nounstemParadigmContractFrame =
        lesson14Frame.nounstemParadigmContractFrame;
      return lesson14Frame;
    }
    function buildClassicalNahuatlSentenceHandoffFrame(nncSlotFrame = null, options = {}) {
      const sentenceTypeKey = normalizeClassicalNahuatlNncToken(options.sentenceType || "none").toLowerCase().replace(/[\s_]/gu, "-");
      const sentenceTypeAliases = {
        none: "none",
        assertion: "assertion",
        statement: "assertion",
        question: "yes-no-intonation",
        "yes-no-intonation": "yes-no-intonation",
        cuix: "yes-no-cuix",
        "yes-no-cuix": "yes-no-cuix",
        emphatic: "emphatic",
        wish: "wish"
      };
      const sentenceType = sentenceTypeAliases[sentenceTypeKey] || "";
      const predicateKind = normalizeClassicalNahuatlNncToken(options.predicateKind || "equative").toLowerCase().replace(/[\s_]/gu, "-");
      const polarity = normalizeClassicalNahuatlNncToken(options.polarity || "positive").toLowerCase();
      const modifierAliases = {
        "": "none",
        none: "none",
        zan: "zan",
        oc: "oc",
        ahzo: "ahzo",
        aya: "aya"
      };
      const modifier = modifierAliases[
        normalizeClassicalNahuatlNncToken(options.sentenceModifier || "")
          .toLowerCase()
      ] || "";
      const requested = sentenceType && sentenceType !== "none";
      const typedNnc = isClassicalNahuatlNncSlotFrame(nncSlotFrame);
      const sentenceTypeKnown = Boolean(sentenceType);
      const predicateKindKnown = ["equative", "attributive", "adverbial"].includes(predicateKind);
      const polarityKnown = ["positive", "negative"].includes(polarity);
      const modifierKnown = Boolean(modifier);
      const authorized = sentenceTypeKnown
        && predicateKindKnown
        && polarityKnown
        && modifierKnown
        && (!requested || typedNnc);
      return {
        kind: "classical-nahuatl-ordinary-nnc-sentence-handoff-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? requested ? "authorized" : "not-requested" : "blocked",
        blockReason: authorized ? "" : !typedNnc ? "typed-nnc-required-for-sentence-handoff" : !sentenceTypeKnown ? "unknown-nnc-sentence-type" : !predicateKindKnown ? "unknown-nnc-predicate-kind" : !polarityKnown ? "unknown-sentence-polarity" : "unknown-lesson15-sentence-modifier",
        sentenceCompositionRequested: requested,
        sentenceType,
        predicateKind,
        polarity,
        modifier,
        allowedSentenceTypes: ["assertion", "yes-no-intonation", "yes-no-cuix", "emphatic", "wish"],
        allowedSentenceModifiers: ["none", "zan", "oc", "ahzo", "aya"],
        consumedNncStatus: typedNnc ? "complete" : "unavailable",
        consumedNncRole: "complete-typed-nnc-input-to-sentence-composition",
        sentenceCompositionOperationId: requested ? "nnc-sentence-composition" : "none",
        curriculumOrderAuthority: false,
        nncFormulaIsSentenceAuthority: false,
        sentenceSurfaceRealizedHere: false,
        possessiveHavingTranslationIsContextual: nncSlotFrame?.slots?.state?.arity !== "vacant",
        definitenessEncoded: false,
        indefinitenessEncoded: false,
        definitenessRemainsAmbiguous: true,
        legalWitnessTagIds: ["cn-l15-153-sentence-structure"]
      };
    }
    function getClassicalNahuatlAnalogicalLcmInventory() {
      return {
        distinctionAxes: [
          "source-possessive-predicate",
          "rank-transition",
          "derived-use-stem-lifecycle",
          "target-state-reentry",
          "source-stem-disposition"
        ],
        sourcePredicateInventory: [{
          identity: "tla-possessive-predicate",
          state: "possessive",
          possessorPronoun: "tla",
          predicateStemKind: "source-general-use-stem"
        }],
        rankTransitionInventory: [{
          identity: "possessive-predicate-to-restricted-use-stem",
          inputRank: "possessive-state-predicate",
          outputRank: "restricted-use-stem",
          surfaceIdentityDoesNotCollapseRank: true
        }],
        derivedUseStemInventory: [{
          identity: "derived-restricted-use",
          stemKind: "restricted-use",
          formation: "tla-plus-source-restricted-use-stem"
        }, {
          identity: "derived-general-use",
          stemKind: "general-use",
          formation: "tla-plus-source-general-use-stem"
        }],
        targetStateInventory: [{
          identity: "absolutive-target",
          state: "absolutive",
          selectedUseStemKind: "restricted-use"
        }, {
          identity: "possessive-target",
          state: "possessive",
          selectedUseStemKind: "general-use"
        }],
        sourceDispositionInventory: [{
          identity: "coexisting-analogical-derivative",
          sourceAbsolutiveRemainsAvailable: true
        }, {
          identity: "derived-stem-replaces-source-in-absolutive",
          sourceAbsolutiveRemainsAvailable: false
        }]
      };
    }
    function buildClassicalNahuatlAnalogicalRestrictedUseContractFrame(lesson15Frame = null) {
      const operationFrame = lesson15Frame?.operationFrame || null;
      const operationRecord = operationFrame?.lesson15StemOperationRecord || null;
      const sourceFrame = lesson15Frame?.inputClassGovernedFrame?.sourceFrame || null;
      const nncSlotFrame = lesson15Frame?.nncSlotFrame || null;
      const selectedAction = operationFrame?.appliedActions?.find(action => (
        action.action === "downgrade-tla-possessive-predicate-to-restricted-use-stem"
      )) || null;
      if (
        lesson15Frame?.kind !== "classical-nahuatl-ordinary-nnc-higher-nnc-frame"
        || lesson15Frame.authorizationStatus !== "authorized"
        || operationRecord?.operation !== "analogical-restricted-use"
        || !sourceFrame
        || !isClassicalNahuatlNncSlotFrame(nncSlotFrame)
      ) {
        return null;
      }
      const sourceRestrictedUseStem = sourceFrame.restrictedUseStem || "";
      const sourceGeneralUseStem = sourceFrame.generalUseStem || "";
      const sourcePossessivePredicateStem = sourceGeneralUseStem
        ? `tla-${sourceGeneralUseStem}`
        : "";
      const derivedRestrictedUseStem = sourceRestrictedUseStem
        ? `tla-${sourceRestrictedUseStem}`
        : "";
      const derivedGeneralUseStem = sourcePossessivePredicateStem;
      const selectedState = nncSlotFrame.slots.state.arity === "vacant"
        ? "absolutive"
        : "possessive";
      const selectedUseStemKind = selectedState === "absolutive"
        ? "restricted-use"
        : "general-use";
      const selectedUseStemBeforeOuterBoundary = selectedState === "absolutive"
        ? derivedRestrictedUseStem
        : derivedGeneralUseStem;
      const selectedPredicateStemAfterOuterBoundary =
        nncSlotFrame.slots.predicate.stem || "";
      const inventory = getClassicalNahuatlAnalogicalLcmInventory();
      const authorized = Boolean(
        sourceRestrictedUseStem
        && sourceGeneralUseStem
        && operationRecord.sourceStem === sourceRestrictedUseStem
        && operationRecord.targetStem === derivedRestrictedUseStem
        && selectedAction?.selectedStem === selectedUseStemBeforeOuterBoundary
        && selectedPredicateStemAfterOuterBoundary
      );
      const selectedCoordinate = {
        coordinateId: [
          sourceRestrictedUseStem,
          sourceGeneralUseStem,
          derivedRestrictedUseStem,
          derivedGeneralUseStem,
          selectedState
        ].join(":"),
        sourceRestrictedUseStem,
        sourceGeneralUseStem,
        sourcePossessivePredicateStem,
        sourcePossessorPronoun: "tla",
        derivedRestrictedUseStem,
        derivedGeneralUseStem,
        selectedState,
        selectedUseStemKind,
        selectedUseStemBeforeOuterBoundary,
        selectedPredicateStemAfterOuterBoundary,
        sourceStemDisposition: "lexically-undetermined",
        sourceStemDispositionAuthority: "lexical-not-generated",
        formulaRealization: lesson15Frame.formulaRealization,
        formulaStringAuthority: false,
        displayTextAuthority: false
      };
      return {
        kind: "classical-nahuatl-ordinary-nnc-1516-analogical-restricted-use-contract-frame",
        version: 1,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized
          ? ""
          : "lesson15-1516-complete-typed-rank-lifecycle-required",
        realizationPhase: "lexical-rank-transition-before-state-specific-nnc-realization",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        sourceSection: "15.1.6",
        greatestCommonDivisor: {
          identityId: "lesson15.1.6:tla-possessive-predicate-to-restricted-use-stem",
          operationKind: "rerank-complete-tla-possessive-predicate-as-restricted-use-nounstem",
          inputKind: "lexically-authorized-possessive-state-predicate",
          sourceState: "possessive",
          sourcePossessorPronoun: "tla",
          sourcePredicateStemKind: "source-general-use-stem",
          outputKind: "derived-restricted-use-nounstem-with-general-use-stem",
          innerTlaBecomesLexicalStemMaterial: true,
          surfaceIdentityDoesNotCollapseRank: true,
          lexicalParticipationRequired: true,
          prerequisiteOperations: [
            "nnc-nounstem-selection",
            "nnc-general-use-stem-realization",
            "nnc-possessive-state-predicate"
          ]
        },
        leastCommonMultiple: {
          ...inventory,
          selectedCoordinate,
          selectedRealizations: [selectedCoordinate]
        },
        lexicalExamplesAreRuleWhitelist: false,
        sourceDispositionIsGenerated: false,
        callerSuppliedAuthorityAccepted: false,
        formulaStringAuthority: false,
        displayTextAuthority: false
      };
    }
    function getClassicalNahuatlReclassificationLcmInventory() {
      return {
        distinctionAxes: [
          "source-analysis",
          "ephemeral-i-loss",
          "target-class",
          "semantic-outcome",
          "construction-environment",
          "target-state-reentry"
        ],
        sourceAnalysisInventory: [{
          identity: "tl-2a-truncated-i-source",
          nounClass: "tl",
          subclass: "tl-2a",
          generalUseShape: "truncated-i",
          finalSegment: "i",
          finalSegmentStatus: "lexically-ephemeral",
          precedingVowel: "long-a-or-e"
        }],
        ephemeralILossInventory: [{
          identity: "delete-final-ephemeral-i",
          inputEnding: "i",
          operation: "delete-final-segment",
          outputEnding: "vowel-before-ephemeral-i"
        }],
        targetClassInventory: [{
          identity: "tl-1a-target",
          nounClass: "tl",
          subclass: "tl-1a",
          connectorSelection: "recompute-from-target-class-and-state"
        }],
        semanticOutcomeInventory: [{
          identity: "meaning-shift",
          meaningRelation: "new-lexical-meaning"
        }, {
          identity: "stylistic-no-meaning-shift",
          meaningRelation: "same-lexical-meaning"
        }],
        constructionEnvironmentInventory: [{
          identity: "standalone-nounstem",
          position: "predicate-nounstem"
        }, {
          identity: "compound-constituent",
          position: "inside-compound-nounstem"
        }],
        targetStateInventory: [{
          identity: "absolutive-target",
          state: "absolutive",
          connectorRule: "tl-1a-absolutive"
        }, {
          identity: "possessive-target",
          state: "possessive",
          connectorRule: "tl-1a-possessive"
        }]
      };
    }
    function buildClassicalNahuatlReclassificationContractFrame(lesson15Frame = null) {
      const operationFrame = lesson15Frame?.operationFrame || null;
      const operationRecord = operationFrame?.lesson15StemOperationRecord || null;
      const sourceFrame = lesson15Frame?.inputClassGovernedFrame?.sourceFrame || null;
      const nncSlotFrame = lesson15Frame?.nncSlotFrame || null;
      const selectedAction = operationFrame?.appliedActions?.find(action => (
        action.action === "reclassify-tl-2a-as-tl-1a"
      )) || null;
      if (
        lesson15Frame?.kind !== "classical-nahuatl-ordinary-nnc-higher-nnc-frame"
        || lesson15Frame.authorizationStatus !== "authorized"
        || operationRecord?.operation !== "tl-2a-to-1a"
        || !sourceFrame
        || !isClassicalNahuatlNncSlotFrame(nncSlotFrame)
      ) {
        return null;
      }
      const sourceStem = sourceFrame.restrictedUseStem || "";
      const targetStem = /[āē]i$/u.test(sourceStem)
        ? sourceStem.slice(0, -1)
        : "";
      const selectedState = nncSlotFrame.slots.state.arity === "vacant"
        ? "absolutive"
        : "possessive";
      const selectedNumberDyad = {
        num1: nncSlotFrame.slots.number.num1,
        num2: nncSlotFrame.slots.number.num2
      };
      const inventory = getClassicalNahuatlReclassificationLcmInventory();
      const authorized = Boolean(
        sourceStem
        && targetStem
        && sourceFrame.nounClass === "tl"
        && sourceFrame.generalUseShape === "truncated"
        && sourceFrame.ephemeralFinalVowel === "i"
        && operationRecord.sourceSubclass === "tl-2a"
        && operationRecord.targetStem === targetStem
        && selectedAction?.selectedStem === targetStem
        && nncSlotFrame.slots.predicate.stem === targetStem
      );
      const selectedCoordinate = {
        coordinateId: [
          sourceStem,
          targetStem,
          selectedState,
          selectedNumberDyad.num1,
          selectedNumberDyad.num2
        ].join(":"),
        sourceStem,
        sourceNounClass: "tl",
        sourceSubclass: "tl-2a",
        sourceGeneralUseShape: "truncated-i",
        deletedSegment: "i",
        deletedSegmentStatus: "lexically-ephemeral",
        targetStem,
        targetNounClass: "tl",
        targetSubclass: "tl-1a",
        semanticOutcome: "lexically-undetermined",
        semanticOutcomeAuthority: "lexical-not-generated",
        constructionEnvironment: "not-selected-by-reclassification",
        constructionEnvironmentAuthority: "downstream-structure-not-generated",
        selectedState,
        selectedNumberDyad,
        formulaRealization: lesson15Frame.formulaRealization,
        formulaStringAuthority: false,
        displayTextAuthority: false
      };
      return {
        kind: "classical-nahuatl-ordinary-nnc-1517-reclassification-contract-frame",
        version: 1,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized
          ? ""
          : "lesson15-1517-complete-typed-reclassification-required",
        realizationPhase: "lexical-subclass-reclassification-before-state-specific-connector-realization",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        sourceSection: "15.1.7",
        greatestCommonDivisor: {
          identityId: "lesson15.1.7:tl-2a-to-tl-1a-reclassification",
          operationKind: "delete-lexically-ephemeral-final-i-and-reclassify-subclass",
          inputKind: "typed-tl-2a-nounstem-with-truncated-i-general-use-shape",
          outputKind: "typed-tl-1a-nounstem",
          nounClassPreserved: "tl",
          sourceSubclass: "tl-2a",
          targetSubclass: "tl-1a",
          deletedSegment: "i",
          lexicalParticipationRequired: true,
          connectorRecomputationRequired: true,
          prerequisiteOperations: [
            "nnc-nounstem-selection",
            "nnc-tl-2a-classification",
            "nnc-ephemeral-i-analysis"
          ]
        },
        leastCommonMultiple: {
          ...inventory,
          selectedCoordinate,
          selectedRealizations: [selectedCoordinate]
        },
        lexicalExamplesAreRuleWhitelist: false,
        semanticOutcomeIsGenerated: false,
        constructionEnvironmentIsGenerated: false,
        callerSuppliedAuthorityAccepted: false,
        formulaStringAuthority: false,
        displayTextAuthority: false
      };
    }
    function buildClassicalNahuatlOrdinaryNncContractFrame(lesson15Frame = null) {
      const operationFrame = lesson15Frame?.operationFrame || null;
      const sourceAuthorityFrame = lesson15Frame?.nncSourceAuthorityFrame || null;
      const sentenceFrame = lesson15Frame?.sentenceHandoffFrame || null;
      const nncSlotFrame = lesson15Frame?.nncSlotFrame || null;
      if (
        lesson15Frame?.kind !== "classical-nahuatl-ordinary-nnc-higher-nnc-frame"
        || lesson15Frame?.authorizationStatus !== "authorized"
        || operationFrame?.authorizationStatus !== "authorized"
        || !isClassicalNahuatlNncSourceAuthorityFrame(sourceAuthorityFrame)
        || !isClassicalNahuatlNncSlotFrame(nncSlotFrame)
        || !["authorized", "not-requested"].includes(sentenceFrame?.authorizationStatus)
      ) {
        return null;
      }
      const stemOperationInventory = [{
        identity: "regular",
        operation: "identity",
        lexicalSelectionRequired: false
      }, {
        identity: "suppletive",
        operation: "replace-with-lexically-selected-possessive-stem",
        lexicalSelectionRequired: true
      }, {
        identity: "yo-matrix",
        operation: "embed-in-l-or-y-plus-o-or-long-o-matrix",
        lexicalSelectionRequired: true
      }, {
        identity: "secondary-general-use",
        operation: "downgrade-inner-possessive-predicate-to-general-use-stem",
        lexicalSelectionRequired: true
      }, {
        identity: "analogical-restricted-use",
        operation: "downgrade-tla-possessive-predicate-to-restricted-use-stem",
        lexicalSelectionRequired: true
      }, {
        identity: "tl-2a-to-1a",
        operation: "delete-ephemeral-i-and-reclassify-tl-subclass",
        lexicalSelectionRequired: true
      }];
      const possessivePluralBoundaryInventory = [{
        identity: "no-special-boundary-action",
        sourceEnding: "other",
        action: "identity"
      }, {
        identity: "final-voiceless-w-before-hu-an",
        sourceEnding: "uh",
        action: "total-assimilation-and-delete-final-voiceless-w"
      }, {
        identity: "final-n-before-hu-an",
        sourceEnding: "n",
        action: "nasalize-preceding-vowel-and-delete-final-n",
        spellingAlternatives: ["assimilated-without-n", "retained-n"]
      }];
      const yoMatrixAllomorphInventory = [
        ["l-ō", "stem-final-l", "absolutive", "all"],
        ["l-o", "stem-final-l", "possessive", "singular-or-common"],
        ["l-ō", "stem-final-l", "possessive", "plural"],
        ["y-ō", "other-stem-final", "absolutive", "all"],
        ["y-o", "other-stem-final", "possessive", "singular-or-common"],
        ["y-ō", "other-stem-final", "possessive", "plural"]
      ].map(([identity, boundary, state, subjectNumber]) => ({
        identity,
        boundary,
        state,
        subjectNumber
      }));
      const derivedNonanimateInventory = [
        ["plain", "common-or-plural", "ordinary-reference"],
        ["affinity", "common", "English-plural-translation-with-common-grammar-number"],
        ["distributive-varietal", "common", "English-plural-translation-with-common-grammar-number"]
      ].map(([identity, subjectNumber, interpretation]) => ({
        identity,
        subjectNumber,
        interpretation
      }));
      const possessorReduplicationInventory = [{
        identity: "single-dyadic",
        stateArity: "dyadic",
        grammaticalNumberValue: "none"
      }, {
        identity: "reduplicated-dyadic",
        stateArity: "reduplicated-dyadic",
        grammaticalNumberValue: "none",
        environment: "possessive-plural-subject"
      }];
      const secondaryPossessorCarrierInventory = [
        ["tē", "unblurred"],
        ["ti", "partially-blurred"],
        ["t", "maximally-blurred"]
      ].map(([identity, realization]) => ({ identity, realization }));
      const analogicalLcmInventory =
        getClassicalNahuatlAnalogicalLcmInventory();
      const analogicalRestrictedUseContractFrame =
        lesson15Frame.analogicalRestrictedUseContractFrame || null;
      const reclassificationLcmInventory =
        getClassicalNahuatlReclassificationLcmInventory();
      const reclassificationContractFrame =
        lesson15Frame.reclassificationContractFrame || null;
      const possessorRoleInventory = [{
        identity: "nuclear-basic-possessor",
        location: "inside-nnc-state"
      }, {
        identity: "supplementary-possessor",
        location: "outside-nnc-nucleus"
      }];
      const naturalPossessionPolicyInventory = [{
        identity: "ordinary",
        stateAvailability: "both",
        metaphoricalOverrideAvailable: false
      }, {
        identity: "naturally-possessed",
        stateAvailability: "possessive-only",
        metaphoricalOverrideAvailable: false
      }, {
        identity: "never-possessive",
        stateAvailability: "absolutive-only",
        metaphoricalOverrideAvailable: true
      }];
      const naturalPossessionSemanticInventory = [
        "property",
        "kinship-or-human-relation",
        "body-part",
        "never-possessive",
        "ordinary"
      ];
      const sentenceCompositionScopeInventory = [
        "nuclear-clause-only",
        "sentence-composition-requested"
      ];
      const predicateKindInventory = ["equative", "attributive", "adverbial"];
      const sentenceForceInventory = [
        "assertion",
        "yes-no-intonation",
        "yes-no-cuix",
        "emphatic",
        "wish"
      ];
      const polarityInventory = ["positive", "negative"];
      const sentenceModifierInventory = ["none", "zan", "oc", "ahzo", "aya"];
      const interpretationInventory = [{
        identity: "identify-or-classify",
        predicateKind: "equative"
      }, {
        identity: "characterize",
        predicateKind: "attributive"
      }, {
        identity: "locate-time-duration-place-or-manner",
        predicateKind: "adverbial"
      }, {
        identity: "possessive-state-contextual-having",
        predicateKind: "equative",
        grammaticalHavingConstruction: false
      }, {
        identity: "definiteness-indefiniteness-ambiguous",
        predicateKind: "all",
        definitenessEncoded: false
      }];
      const boundaryAction = operationFrame.appliedActions.find(action => (
        [
          "delete-final-voiceless-w-before-possessive-plural-number-dyad",
          "assimilate-final-n-before-possessive-plural-number-dyad"
        ].includes(action.action)
      ));
      const boundaryIdentity = boundaryAction?.action
        === "delete-final-voiceless-w-before-possessive-plural-number-dyad"
        ? "final-voiceless-w-before-hu-an"
        : boundaryAction?.action
          === "assimilate-final-n-before-possessive-plural-number-dyad"
          ? "final-n-before-hu-an"
          : "no-special-boundary-action";
      const stemOperationRecord = operationFrame.lesson15StemOperationRecord;
      const selectedSentenceScope = sentenceFrame.sentenceCompositionRequested
        ? "sentence-composition-requested"
        : "nuclear-clause-only";
      const selectedCoordinate = {
        coordinateId: [
          stemOperationRecord.operation,
          boundaryIdentity,
          operationFrame.lesson15PossessorReduplicationSelection.selected
            ? "reduplicated-dyadic"
            : "single-dyadic",
          sourceAuthorityFrame.naturalPossessionPolicy,
          selectedSentenceScope,
          sentenceFrame.sentenceType || "none",
          sentenceFrame.predicateKind,
          sentenceFrame.polarity,
          sentenceFrame.modifier
        ].join(":"),
        sourceLesson14CoordinateId:
          lesson15Frame.inputClassGovernedFrame?.nounstemParadigmContractFrame
            ?.leastCommonMultiple?.selectedCoordinate?.coordinateId || "",
        state: nncSlotFrame.slots.state.arity === "vacant" ? "absolutive" : "possessive",
        subjectNumber: nncSlotFrame.subjectNumber,
        sourceStem: stemOperationRecord.sourceStem,
        selectedPredicateStem: nncSlotFrame.slots.predicate.stem,
        stemOperation: stemOperationRecord.operation,
        stemOperationRecord: cloneClassicalNahuatlNncValue(stemOperationRecord),
        targetNounClass: stemOperationRecord.targetNounClass,
        targetSubclass: stemOperationRecord.targetSubclass,
        targetUseShape: stemOperationRecord.targetUseShape,
        analogicalRestrictedUseCoordinateId:
          analogicalRestrictedUseContractFrame?.leastCommonMultiple
            ?.selectedCoordinate?.coordinateId || "",
        analogicalRestrictedUseGcdIdentity:
          analogicalRestrictedUseContractFrame?.greatestCommonDivisor
            ?.identityId || "",
        reclassificationCoordinateId:
          reclassificationContractFrame?.leastCommonMultiple
            ?.selectedCoordinate?.coordinateId || "",
        reclassificationGcdIdentity:
          reclassificationContractFrame?.greatestCommonDivisor?.identityId || "",
        possessivePluralBoundaryIdentity: boundaryIdentity,
        possessorReduplicationIdentity:
          operationFrame.lesson15PossessorReduplicationSelection.selected
            ? "reduplicated-dyadic"
            : "single-dyadic",
        nounstemRelation:
          lesson15Frame.inputClassGovernedFrame?.derivedStemFrame?.stemFormation || "plain",
        derivedNonanimateCommonActive:
          nncSlotFrame.lesson15DerivedNonanimateReading?.active === true,
        possessorRole: operationFrame.possessorRole,
        naturalPossessionPolicy: sourceAuthorityFrame.naturalPossessionPolicy,
        naturalPossessionSemantics:
          sourceAuthorityFrame.naturalPossessionSemantics,
        stateAvailability: sourceAuthorityFrame.stateAvailability,
        metaphoricalOverride: operationFrame.metaphoricalOverride === true,
        sentenceCompositionScope: selectedSentenceScope,
        predicateKind: sentenceFrame.predicateKind,
        sentenceForce: sentenceFrame.sentenceType || "none",
        polarity: sentenceFrame.polarity,
        sentenceModifier: sentenceFrame.modifier,
        typedSlotFrame: cloneClassicalNahuatlNncValue(nncSlotFrame),
        formulaRealization: lesson15Frame.formulaRealization,
        formulaStringAuthority: false,
        displayTextAuthority: false
      };
      return {
        kind: "classical-nahuatl-ordinary-nnc-ordinary-nnc-contract-frame",
        version: 1,
        authorizationStatus: "authorized",
        realizationPhase: "structural-formula-and-sentence-handoff",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        sourceSection: "15.1-15.3",
        greatestCommonDivisor: {
          identityId: "lesson15:ordinary-nnc-conditions",
          operationKind: "apply-ordinary-nnc-conditions-to-complete-class-governed-nnc",
          inputKind: "complete-lesson14-class-governed-nnc",
          outputKind: "one-conditioned-ordinary-nnc-with-optional-sentence-handoff",
          formulaSchemaChanged: false,
          predicateStemRemainsSingleSlot: true,
          numberBelongsTo: "subject-personal-pronoun",
          possessorBelongsTo: "state",
          basicPossessorLocation: "inside-nnc-nucleus",
          supplementaryPossessorLocation: "outside-nnc-nucleus",
          tensePosition: "absent",
          prerequisiteOperations: [
            "nnc-clause-shell",
            "nnc-absolutive-state-or-possessive-state",
            "nnc-nounstem-selection"
          ]
        },
        leastCommonMultiple: {
          distinctionAxes: [...CLASSICAL_NAHUATL_LESSON15_NNC_DISTINCTION_AXES],
          stemOperationInventory,
          possessivePluralBoundaryInventory,
          yoMatrixAllomorphInventory,
          derivedNonanimateInventory,
          possessorReduplicationInventory,
        secondaryPossessorCarrierInventory,
          analogicalSourcePredicateInventory:
            analogicalLcmInventory.sourcePredicateInventory,
          analogicalRankTransitionInventory:
            analogicalLcmInventory.rankTransitionInventory,
          analogicalDerivedUseStemInventory:
            analogicalLcmInventory.derivedUseStemInventory,
          analogicalTargetStateInventory:
            analogicalLcmInventory.targetStateInventory,
          analogicalSourceDispositionInventory:
            analogicalLcmInventory.sourceDispositionInventory,
          analogicalRestrictedUseContractFrame:
            cloneClassicalNahuatlNncValue(analogicalRestrictedUseContractFrame),
          reclassificationSourceAnalysisInventory:
            reclassificationLcmInventory.sourceAnalysisInventory,
          reclassificationEphemeralILossInventory:
            reclassificationLcmInventory.ephemeralILossInventory,
          reclassificationTargetClassInventory:
            reclassificationLcmInventory.targetClassInventory,
          reclassificationSemanticOutcomeInventory:
            reclassificationLcmInventory.semanticOutcomeInventory,
          reclassificationConstructionEnvironmentInventory:
            reclassificationLcmInventory.constructionEnvironmentInventory,
          reclassificationTargetStateInventory:
            reclassificationLcmInventory.targetStateInventory,
          reclassificationContractFrame:
            cloneClassicalNahuatlNncValue(reclassificationContractFrame),
          possessorRoleInventory,
          naturalPossessionPolicyInventory,
          naturalPossessionSemanticInventory,
          sentenceCompositionScopeInventory,
          predicateKindInventory,
          sentenceForceInventory,
          polarityInventory,
          sentenceModifierInventory,
          interpretationInventory,
          selectedCoordinate,
          selectedRealizations: [selectedCoordinate]
        },
        ruleRefs: getClassicalNahuatlOrdinaryNncRules(),
        callerSuppliedAuthorityAccepted: false,
        formulaStringAuthority: false,
        displayTextAuthority: false
      };
    }
    function getClassicalNahuatlGrammarAxisGroup(lesson = "", axis = "") {
      const qualifiedAxis = `${lesson}:${axis}`;
      const subjectAxes = new Set([
        "12:subject-person",
        "12:subject-number",
        "12:subject-person-morphs",
        "12:absolutive-number-dyad",
        "12:noun-class-conditioned-connector",
        "12:animacy-reference",
        "13:subject-person",
        "13:subject-number",
        "13:subject-person-morphs",
        "13:subject-person-boundary-conditioning",
        "13:possessive-number-dyad",
        "13:subject-connector-conditioning",
        "14:subject-number",
        "14:subject-reference-animacy",
        "14:class-conditioned-number-dyad"
      ]);
      const sentenceAxes = new Set([
        "12:discourse-time-reference",
        "15:sentence-composition-scope",
        "15:sentence-predicate-kind",
        "15:sentence-force",
        "15:sentence-polarity",
        "15:sentence-modifier",
        "15:contextual-interpretation"
      ]);
      const stateAxes = new Set([
        "12:lexical-state-availability",
        "13:formula-state-arity",
        "13:possessor-reference-type",
        "13:possessor-person",
        "13:possessor-number",
        "13:possessive-case-location",
        "13:possessor-state-morphs",
        "13:possessor-boundary-conditioning",
        "13:nounstem-possessor-compatibility",
        "14:state",
        "15:possessor-reduplication",
        "15:secondary-possessor-carrier",
        "15:possessor-role",
        "15:natural-possession-policy",
        "15:natural-possession-semantics",
        "15:state-availability-and-metaphorical-override"
      ]);
      const nounstemAxes = new Set([
        "12:predicate-function",
        "14:use-stem-kind",
        "14:use-stem-shape",
        "14:nounstem-class",
        "14:class-subclass",
        "14:stem-relation",
        "14:lexical-alternative",
        "14:constituent-analysis",
        "14:orthographic-boundary-realization",
        "15:stem-operation",
        "15:possessive-plural-boundary",
        "15:yo-matrix-allomorph",
        "15:derived-nonanimate-relation",
        "15:analogical-source-predicate",
        "15:analogical-rank-transition",
        "15:analogical-use-stem-lifecycle",
        "15:analogical-state-reentry",
        "15:analogical-source-disposition",
        "15:reclassification-source-analysis",
        "15:reclassification-ephemeral-i-loss",
        "15:reclassification-target-class",
        "15:reclassification-semantic-outcome",
        "15:reclassification-construction-environment",
        "15:reclassification-state-reentry"
      ]);
      if (subjectAxes.has(qualifiedAxis)) return "subject";
      if (sentenceAxes.has(qualifiedAxis)) return "sentence";
      if (stateAxes.has(qualifiedAxis)) return "state";
      if (nounstemAxes.has(qualifiedAxis)) return "nounstem";
      return "";
    }
    function buildClassicalNahuatlGrammarSurfaceContractFrame(lesson15Frame = null) {
      const lesson14Frame = lesson15Frame?.inputClassGovernedFrame || null;
      const lesson14Contract = lesson14Frame?.nounstemParadigmContractFrame || null;
      const lowerNncFrame = lesson14Frame?.lowerNncFrame || null;
      const lesson12Contract = lowerNncFrame?.kind
        === "classical-nahuatl-absolutive-nnc-absolutive-nnc-frame"
        ? lowerNncFrame.absolutiveParadigmContractFrame || null
        : null;
      const lesson13Contract = lowerNncFrame?.kind
        === "classical-nahuatl-possessive-nnc-possessive-nnc-frame"
        ? lowerNncFrame.possessiveParadigmContractFrame || null
        : null;
      const lesson15Contract = lesson15Frame?.ordinaryNncContractFrame || null;
      const activeStateContract = lesson12Contract || lesson13Contract;
      const activeStateBranch = lesson12Contract ? "absolutive" : lesson13Contract ? "possessive" : "";
      if (
        lesson15Frame?.kind !== "classical-nahuatl-ordinary-nnc-higher-nnc-frame"
        || lesson15Frame.authorizationStatus !== "authorized"
        || lesson14Contract?.kind !== "classical-nahuatl-nounstem-nounstem-paradigm-contract-frame"
        || lesson15Contract?.kind !== "classical-nahuatl-ordinary-nnc-ordinary-nnc-contract-frame"
        || !activeStateContract
      ) {
        return null;
      }
      const lessonAxisInventory = [{
        lesson: "12",
        sourceSection: "12.1-12.7",
        contractKind: "classical-nahuatl-absolutive-nnc-absolutive-paradigm-contract-frame",
        greatestCommonDivisorIdentity: "lesson12:absolutive-state-nnc",
        distinctionAxes: [...CLASSICAL_NAHUATL_LESSON12_NNC_DISTINCTION_AXES]
      }, {
        lesson: "13",
        sourceSection: "13.1-13.6",
        contractKind: "classical-nahuatl-possessive-nnc-possessive-paradigm-contract-frame",
        greatestCommonDivisorIdentity: "lesson13:possessive-state-nnc",
        distinctionAxes: [...CLASSICAL_NAHUATL_LESSON13_NNC_DISTINCTION_AXES]
      }, {
        lesson: "14",
        sourceSection: "14.1-14.8",
        contractKind: "classical-nahuatl-nounstem-nounstem-paradigm-contract-frame",
        greatestCommonDivisorIdentity: "lesson14:class-governed-nounstem-selection",
        distinctionAxes: [...CLASSICAL_NAHUATL_LESSON14_NNC_DISTINCTION_AXES]
      }, {
        lesson: "15",
        sourceSection: "15.1-15.3",
        contractKind: "classical-nahuatl-ordinary-nnc-ordinary-nnc-contract-frame",
        greatestCommonDivisorIdentity: "lesson15:ordinary-nnc-conditions",
        distinctionAxes: [...CLASSICAL_NAHUATL_LESSON15_NNC_DISTINCTION_AXES]
      }];
      const qualifiedAxisInventory = lessonAxisInventory.flatMap(lessonInventory => (
        lessonInventory.distinctionAxes.map(distinction => ({
          axisId: `lesson${lessonInventory.lesson}:${distinction}`,
          lesson: lessonInventory.lesson,
          sourceSection: lessonInventory.sourceSection,
          distinction,
          semanticGroup: getClassicalNahuatlGrammarAxisGroup(
            lessonInventory.lesson,
            distinction
          )
        }))
      ));
      if (qualifiedAxisInventory.some(axis => !axis.semanticGroup)) {
        return null;
      }
      const semanticGroupOrder = ["subject", "state", "nounstem", "sentence"];
      const semanticGroupInventory = semanticGroupOrder.map(groupId => ({
        groupId,
        axisIds: qualifiedAxisInventory
          .filter(axis => axis.semanticGroup === groupId)
          .map(axis => axis.axisId)
      }));
      const activeContractRefs = [activeStateContract, lesson14Contract, lesson15Contract]
        .map(contract => ({
          contractKind: contract.kind,
          greatestCommonDivisorIdentity: contract.greatestCommonDivisor.identityId,
          selectedCoordinateId:
            contract.leastCommonMultiple.selectedCoordinate.coordinateId
        }));
      const selectedCoordinate = {
        coordinateId: activeContractRefs
          .map(contract => contract.selectedCoordinateId)
          .join("::"),
        activeStateBranch,
        activeStateContractKind: activeStateContract.kind,
        activeStateCoordinateId:
          activeStateContract.leastCommonMultiple.selectedCoordinate.coordinateId,
        lesson14CoordinateId:
          lesson14Contract.leastCommonMultiple.selectedCoordinate.coordinateId,
        lesson15CoordinateId:
          lesson15Contract.leastCommonMultiple.selectedCoordinate.coordinateId,
        lesson15StemOperation:
          lesson15Contract.leastCommonMultiple.selectedCoordinate.stemOperation,
        lesson1516AnalogicalCoordinateId:
          lesson15Contract.leastCommonMultiple.selectedCoordinate
            .analogicalRestrictedUseCoordinateId || "",
        lesson1516AnalogicalGcdIdentity:
          lesson15Contract.leastCommonMultiple.selectedCoordinate
            .analogicalRestrictedUseGcdIdentity || "",
        lesson1517ReclassificationCoordinateId:
          lesson15Contract.leastCommonMultiple.selectedCoordinate
            .reclassificationCoordinateId || "",
        lesson1517ReclassificationGcdIdentity:
          lesson15Contract.leastCommonMultiple.selectedCoordinate
            .reclassificationGcdIdentity || "",
        selectedPredicateStem:
          lesson15Contract.leastCommonMultiple.selectedCoordinate.selectedPredicateStem,
        formulaRealization: lesson15Frame.formulaRealization,
        formulaStringAuthority: false,
        displayTextAuthority: false
      };
      return {
        kind: "classical-nahuatl-nominal-nuclear-clause-grammar-surface-contract-frame",
        version: 1,
        authorizationStatus: "authorized",
        realizationPhase: "grammar-choice-projection",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        sourceSections: ["12.1-12.7", "13.1-13.6", "14.1-14.8", "15.1-15.3"],
        greatestCommonDivisor: {
          identityId: "lessons12-15:ordinary-nnc-grammar-architecture",
          clauseKind: "nominal-nuclear-clause",
          formulaTemplate: "#pers1-pers2(+STATE)(STEM)num1-num2#",
          subjectPredicateArchitecture: true,
          statePosition: "before-predicate-nounstem",
          predicateStemCardinality: "exactly-one",
          numberBelongsTo: "subject-personal-pronoun",
          possessorBelongsTo: "state",
          tensePosition: "absent",
          semanticGroupOrder,
          sourceToResultPath: [
            "typed-nounstem-source",
            "typed-grammar-selections",
            "canonical-nnc-engine",
            "authorized-result"
          ],
          sourceClosureRequired: false
        },
        leastCommonMultiple: {
          lessonAxisInventory,
          qualifiedAxisInventory,
          semanticGroupInventory,
          distinctionAxisCount: qualifiedAxisInventory.length,
          activeContractRefs,
          selectedCoordinate,
          selectedRealizations: [selectedCoordinate]
        },
        sourceEvidenceBoundary: "test-only-not-imported-by-production-grammar",
        curriculumOrderAuthority: false,
        lessonMetadataAuthority: false,
        callerSuppliedAuthorityAccepted: false,
        formulaStringAuthority: false,
        displayTextAuthority: false
      };
    }
    function buildClassicalNahuatlHigherNncFrame(classGovernedFrame = null, options = {}) {
      const inputIsLesson14Frame = classGovernedFrame?.kind === "classical-nahuatl-nounstem-class-governed-nnc-frame" && classGovernedFrame.authorizationStatus === "authorized";
      const inputSlot = inputIsLesson14Frame ? classGovernedFrame.nncSlotFrame : null;
      const typedInput = isClassicalNahuatlNncSlotFrame(inputSlot) && inputSlot.appliedOperationIds?.includes("nnc-nounstem-selection");
      const nncSlotFrame = typedInput ? cloneClassicalNahuatlNncValue(inputSlot) : null;
      const state = nncSlotFrame?.slots?.state?.arity === "vacant" ? "absolutive" : "possessive";
      const subjectNumber = nncSlotFrame?.subjectNumber || "";
      const metaphoricalOverride = options.metaphoricalOverride === true;
      const suppliedSourceAuthorityFrame = options.nncSourceAuthorityFrame;
      const inheritedSourceAuthorityFrame = classGovernedFrame?.nncSourceAuthorityFrame;
      const explicitSourcePolicyOptions = Object.prototype.hasOwnProperty.call(options, "naturalPossessionPolicy") || Object.prototype.hasOwnProperty.call(options, "stateAvailability") || Object.prototype.hasOwnProperty.call(options, "metaphoricalOverride") || Object.prototype.hasOwnProperty.call(options, "policySelectionAuthority");
      const nncSourceAuthorityFrame = isClassicalNahuatlNncSourceAuthorityFrame(suppliedSourceAuthorityFrame) ? cloneClassicalNahuatlNncValue(suppliedSourceAuthorityFrame) : !explicitSourcePolicyOptions && isClassicalNahuatlNncSourceAuthorityFrame(inheritedSourceAuthorityFrame) ? cloneClassicalNahuatlNncValue(inheritedSourceAuthorityFrame) : buildClassicalNahuatlNncSourceAuthorityFrame(classGovernedFrame?.sourceFrame?.restrictedUseStem || nncSlotFrame?.slots?.predicate?.stem || "", {
        selectedState: state,
        stateAvailability: options.stateAvailability || "",
        naturalPossessionPolicy: options.naturalPossessionPolicy || "",
        metaphoricalOverride,
        policySelectionAuthority: options.policySelectionAuthority || ""
      });
      const naturalPossessionPolicy = nncSourceAuthorityFrame.naturalPossessionPolicy || "";
      const naturalPolicyKnown = isClassicalNahuatlNncSourceAuthorityFrame(nncSourceAuthorityFrame);
      let blockReason = "";
      if (!inputIsLesson14Frame || !typedInput) {
        blockReason = classGovernedFrame?.blockReason || "authorized-lesson14-typed-frame-required";
      } else if (!naturalPolicyKnown) blockReason = nncSourceAuthorityFrame.blockReason || "unknown-natural-possession-policy";else if (naturalPossessionPolicy === "naturally-possessed" && state !== "possessive") {
        blockReason = "naturally-possessed-nounstem-requires-possessive-state";
      } else if (naturalPossessionPolicy === "never-possessive" && state === "possessive" && !metaphoricalOverride) {
        blockReason = "nounstem-never-possessive-without-metaphorical-override";
      }
      const lesson15StemOperationRecord = nncSourceAuthorityFrame.lesson15StemOperationRecord;
      const lesson15PossessorReduplicationSelection = nncSourceAuthorityFrame.lesson15PossessorReduplicationSelection;
      const looseStemOperationRequested = Boolean(options.suppletivePossessiveStem || options.secondaryGeneralUseStem || options.analogicalRestrictedUseStem || options.reclassifyTl2ATo1A === true);
      const looseReduplicationRequested = options.reduplicatePossessor === true;
      if (!blockReason && looseStemOperationRequested) {
        blockReason = "lesson15-stem-operation-requires-typed-source-record";
      } else if (!blockReason && looseReduplicationRequested) {
        blockReason = "possessor-reduplication-requires-typed-source-selection";
      } else if (!blockReason && !isClassicalNahuatlStemOperationRecord(lesson15StemOperationRecord)) {
        blockReason = "authorized-lesson15-stem-operation-record-required";
      } else if (!blockReason && !isClassicalNahuatlPossessorReduplicationSelection(lesson15PossessorReduplicationSelection)) {
        blockReason = "authorized-lesson15-possessor-reduplication-selection-required";
      }
      const requestedStemOperations = lesson15StemOperationRecord?.operation === "regular" ? [] : [lesson15StemOperationRecord?.operation || ""];
      const appliedActions = [];
      const rejectedActions = [];
      let selectedStem = nncSlotFrame?.slots?.predicate?.stem || "";
      if (!blockReason && requestedStemOperations[0] === "yo-matrix") {
        const matrixEmbedStem = resolveClassicalNahuatlLesson15YoMatrixEmbedStem(
          classGovernedFrame.sourceFrame?.restrictedUseStem || "",
          {
            nounClass: classGovernedFrame.sourceFrame?.nounClass,
            useShape: classGovernedFrame.sourceFrame?.generalUseShape === "truncated"
              ? classGovernedFrame.sourceFrame?.truncationRepair === "supportive-i"
                ? "truncated-a-supportive-i"
                : `truncated-${classGovernedFrame.sourceFrame?.ephemeralFinalVowel || ""}`
              : classGovernedFrame.sourceFrame?.generalUseShape,
            subclass: lesson15StemOperationRecord.sourceSubclass,
            stemFormation: classGovernedFrame.derivedStemFrame?.stemFormation
          }
        );
        const boundaryAllomorph = getClassicalNahuatlNncLastSound(matrixEmbedStem) === "l" ? "l" : "y";
        const longMatrixVowel = state === "absolutive" || subjectNumber === "plural";
        const suffix = `${boundaryAllomorph}${longMatrixVowel ? "ō" : "o"}`;
        const matrixStem = matrixEmbedStem ? `${matrixEmbedStem}-${suffix}` : "";
        if (
          !matrixEmbedStem
          || lesson15StemOperationRecord.matrixEmbedStem !== matrixEmbedStem
          || lesson15StemOperationRecord.targetStem !== matrixStem
        ) {
          blockReason = "lesson15-yo-matrix-must-use-source-general-use-embed";
        } else {
          selectedStem = matrixStem;
        }
        if (!blockReason && state === "absolutive" && subjectNumber !== "plural") {
          nncSlotFrame.slots.number.num1 = "tl";
          nncSlotFrame.slots.number.num2 = "0";
        } else if (!blockReason && state === "possessive" && subjectNumber !== "plural") {
          nncSlotFrame.slots.number.num1 = "0";
          nncSlotFrame.slots.number.num2 = "0";
        }
        if (!blockReason) {
          nncSlotFrame.nounClass = "tl";
          nncSlotFrame.lesson15MatrixNounClass = {
            nounClass: "tl",
            subclass: "1B",
            useShape: "base",
            stateValues: ["absolutive", "possessive"]
          };
          appliedActions.push({
            action: "realize-lesson15-yo-matrix-at-stem-boundary",
            matrix: "(-yō)-tl-",
            sourceRestrictedUseStem: classGovernedFrame.sourceFrame?.restrictedUseStem || "",
            sourceGeneralUseStem: classGovernedFrame.sourceFrame?.generalUseStem || "",
            matrixEmbedStem,
            matrixEmbedUseStemKind: "general-use",
            boundaryAllomorph,
            suffix,
            selectedStem,
            targetNounClass: "tl",
            targetSubclass: "1B",
            state,
            authority: lesson15StemOperationRecord.selectionAuthority
          });
        }
      } else if (!blockReason && requestedStemOperations[0] === "suppletive") {
        const authority = lesson15StemOperationRecord.selectionAuthority;
        const suppletiveStem = lesson15StemOperationRecord.targetStem;
        if (state !== "possessive") blockReason = "possessive-suppletive-stem-requires-possessive-state";else if (!["user-supplied-lexical-analysis", "external-lexical-record", "canvas-predicate-option"].includes(authority)) {
          blockReason = "suppletive-stem-requires-lexical-selection-authority";
        } else if (!suppletiveStem || suppletiveStem === selectedStem) blockReason = "distinct-suppletive-stem-required";else {
          selectedStem = suppletiveStem;
          const suppletiveConnector = lesson15StemOperationRecord.suppletiveConnector === "class-governed" ? "" : lesson15StemOperationRecord.suppletiveConnector;
          if (subjectNumber !== "plural" && suppletiveConnector) {
            const connectorDyads = {
              uh: ["uh", "0"],
              hui: ["hui", "0"],
              "0": ["0", "0"],
              "⎕": ["⎕", "0"]
            };
            const selectedDyad = connectorDyads[suppletiveConnector];
            if (!selectedDyad) {
              blockReason = "unknown-suppletive-singular-connector";
            } else {
              [nncSlotFrame.slots.number.num1, nncSlotFrame.slots.number.num2] = selectedDyad;
            }
          }
          if (!blockReason) appliedActions.push({
            action: "substitute-lexically-authorized-possessive-stem",
            authority,
            selectedStem,
            selectedNumberDyad: [nncSlotFrame.slots.number.num1, nncSlotFrame.slots.number.num2]
          });
        }
      } else if (!blockReason && requestedStemOperations[0] === "secondary-general-use") {
        const innerCarrier = lesson15StemOperationRecord.secondaryPossessorCarrier;
        const secondaryStem = lesson15StemOperationRecord.selectionAuthority === "canvas-predicate-option" ? `${innerCarrier}-${selectedStem}` : lesson15StemOperationRecord.targetStem;
        const carrierAllowed = ["tē", "ti", "t"].includes(innerCarrier);
        if (state !== "possessive") blockReason = "secondary-general-use-stem-requires-possessive-state";else if (!carrierAllowed || !secondaryStem || !secondaryStem.toLowerCase().startsWith(`${innerCarrier}-`)) {
          blockReason = "secondary-general-use-stem-must-contain-selected-inner-possessor-carrier";
        } else {
          selectedStem = secondaryStem;
          appliedActions.push({
            action: "downgrade-inner-possessive-predicate-to-general-use-stem",
            innerCarrier,
            selectedStem
          });
        }
      } else if (!blockReason && requestedStemOperations[0] === "analogical-restricted-use") {
        const sourceRestrictedUseStem =
          classGovernedFrame.sourceFrame?.restrictedUseStem || "";
        const sourceGeneralUseStem =
          classGovernedFrame.sourceFrame?.generalUseStem || "";
        const derivedRestrictedUseStem = sourceRestrictedUseStem
          ? `tla-${sourceRestrictedUseStem}`
          : "";
        const derivedGeneralUseStem = sourceGeneralUseStem
          ? `tla-${sourceGeneralUseStem}`
          : "";
        const analogicalStem = state === "absolutive"
          ? derivedRestrictedUseStem
          : derivedGeneralUseStem;
        if (
          !analogicalStem
          || lesson15StemOperationRecord.targetStem !== derivedRestrictedUseStem
          || !/^tla-/u.test(analogicalStem)
          || analogicalStem === selectedStem
        ) {
          blockReason = "analogical-restricted-use-stem-must-be-a-distinct-tla-derived-stem";
        } else {
          selectedStem = analogicalStem;
          appliedActions.push({
            action: "downgrade-tla-possessive-predicate-to-restricted-use-stem",
            sourcePossessivePredicateStem: derivedGeneralUseStem,
            derivedRestrictedUseStem,
            derivedGeneralUseStem,
            selectedState: state,
            selectedUseStemKind: state === "absolutive"
              ? "restricted-use"
              : "general-use",
            selectedStem
          });
        }
      } else if (!blockReason && requestedStemOperations[0] === "tl-2a-to-1a") {
        const reclassifiedStem = lesson15StemOperationRecord.targetStem;
        const sourceIsTl2A = lesson15StemOperationRecord.reclassificationSourceAuthorized === true
          && lesson15StemOperationRecord.sourceStem === classGovernedFrame.sourceFrame?.restrictedUseStem
          && classGovernedFrame.sourceFrame?.nounClass === "tl";
        if (!sourceIsTl2A) blockReason = "tl-2a-source-frame-required-for-1a-reclassification";else if (!reclassifiedStem || !isClassicalNahuatlNncVowelSound(getClassicalNahuatlNncLastSound(reclassifiedStem))) {
          blockReason = "reclassified-tl-1a-stem-must-end-in-vowel";
        } else {
          selectedStem = reclassifiedStem;
          if (state === "possessive" && subjectNumber !== "plural") {
            nncSlotFrame.slots.number.num1 = "uh";
            nncSlotFrame.slots.number.num2 = "0";
          }
          nncSlotFrame.lesson15ReclassifiedNounClass = {
            nounClass: "tl",
            fromSubclass: "2A",
            toSubclass: "1A"
          };
          appliedActions.push({
            action: "reclassify-tl-2a-as-tl-1a",
            selectedStem
          });
        }
      }
      if (nncSlotFrame && !blockReason) {
        nncSlotFrame.slots.predicate.stem = selectedStem;
        const possessivePluralBoundary = state === "possessive" && nncSlotFrame.slots.number.num1 === "hu" && nncSlotFrame.slots.number.num2 === "ān";
        if (possessivePluralBoundary && /uh$/u.test(selectedStem)) {
          const assimilatedStem = selectedStem.slice(0, -2);
          appliedActions.push({
            action: "delete-final-voiceless-w-before-possessive-plural-number-dyad",
            inputStem: selectedStem,
            outputStem: assimilatedStem
          });
          selectedStem = assimilatedStem;
          nncSlotFrame.slots.predicate.stem = selectedStem;
        } else if (possessivePluralBoundary && /n$/u.test(selectedStem)) {
          const assimilatedStem = selectedStem.slice(0, -1);
          appliedActions.push({
            action: "assimilate-final-n-before-possessive-plural-number-dyad",
            inputStem: selectedStem,
            outputStem: assimilatedStem,
            spellingAlternative: `${selectedStem}hu-ān`
          });
          selectedStem = assimilatedStem;
          nncSlotFrame.slots.predicate.stem = selectedStem;
        }
        if (lesson15PossessorReduplicationSelection.selected === true) {
          const stateSlots = nncSlotFrame.slots.state.slots || [];
          if (state !== "possessive" || nncSlotFrame.slots.state.arity !== "dyadic" || subjectNumber !== "plural") {
            blockReason = "possessor-reduplication-requires-dyadic-possessive-plural-subject";
            rejectedActions.push("reduplicate-possessor-dyad");
          } else {
            nncSlotFrame.slots.state.arity = "reduplicated-dyadic";
            nncSlotFrame.slots.state.slots = [cloneClassicalNahuatlNncValue(stateSlots[0]), cloneClassicalNahuatlNncValue(stateSlots[1]), cloneClassicalNahuatlNncValue(stateSlots[0]), cloneClassicalNahuatlNncValue(stateSlots[1])];
            appliedActions.push({
              action: "reduplicate-typed-possessor-dyad",
              grammaticalNumberValue: "none"
            });
          }
        }
        if (state === "possessive") {
          nncSlotFrame.slots.state.nuclearPossessorRole = "nuclear-basic-possessor";
          nncSlotFrame.slots.state.supplementaryPossessorRole = "outside-nnc-nucleus";
        }
        const sourceFormation = classGovernedFrame.derivedStemFrame?.stemFormation || "plain";
        const sourceAnimacy = normalizeClassicalNahuatlNncToken(options.animacy || classGovernedFrame.lowerNncFrame?.numberFrame?.animacy || "").toLowerCase();
        nncSlotFrame.lesson15DerivedNonanimateReading = {
          active: state === "possessive" && sourceFormation !== "plain" && sourceAnimacy === "nonanimate",
          subjectNumber,
          EnglishPluralTranslationDoesNotChangeGrammarNumber: true
        };
        nncSlotFrame.appliedOperationIds = Array.from(new Set([...(nncSlotFrame.appliedOperationIds || []), "nnc-ordinary-conditions"]));
        nncSlotFrame.resultOperationId = "nnc-ordinary-conditions";
        nncSlotFrame.requestedOutputKind = "selected-ordinary-nnc-formula";
        nncSlotFrame.semanticIdentity = [nncSlotFrame.semanticIdentity, selectedStem, naturalPossessionPolicy, ...appliedActions.map(action => action.action)].join("|");
      }
      const typedTransformed = !blockReason && isClassicalNahuatlNncSlotFrame(nncSlotFrame);
      const operationEvaluationFrame = buildClassicalNahuatlNncOperationEvaluationFrame({
        nncSlotFrame: typedTransformed ? nncSlotFrame : null
      });
      const sentenceHandoffFrame = buildClassicalNahuatlSentenceHandoffFrame(typedTransformed ? nncSlotFrame : null, options);
      const authorized = !blockReason && operationEvaluationFrame.authorizationStatus === "authorized" && sentenceHandoffFrame.authorizationStatus !== "blocked";
      const formulaRealization = authorized ? renderClassicalNahuatlNncSlotFrameFormula(nncSlotFrame) : "";
      const finalBlockReason = authorized ? "" : blockReason || sentenceHandoffFrame.blockReason || operationEvaluationFrame.blockReason;
      const operationFrame = {
        kind: "classical-nahuatl-ordinary-nnc-operation-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: finalBlockReason,
        naturalPossessionPolicy,
        metaphoricalOverride,
        lesson15StemOperationRecord,
        lesson15PossessorReduplicationSelection,
        requestedStemOperations,
        appliedActions,
        rejectedActions,
        possessorRole: state === "possessive" ? "nuclear-basic-possessor" : "not-applicable",
        lexicalExamplesAreRuleWhitelist: false,
        prohibitedDerivationRecords: [{
          sourceStem: "*(tēcu-i)-tl",
          rejectedOutput: "totēcuiyo",
          reason: "Canvas rejects a source stem tecu-i and treats the priestly form as spurious",
          transcriptionLineStart: 5199,
          transcriptionLineEnd: 5211
        }],
        legalWitnessTagIds: CLASSICAL_NAHUATL_LESSON15_RULES.map(rule => rule.id)
      };
      const proofFrame = {
        kind: "classical-nahuatl-ordinary-nnc-logic-proof-frame",
        lesson: "Andrews Lesson 15",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        proofStatus: authorized ? "proven" : "blocked",
        authorizationStatus: authorized ? "authorized" : "blocked",
        premises: [{
          layer: "lesson14-class-governed-input",
          passed: inputIsLesson14Frame && typedInput,
          consumedFrameKind: classGovernedFrame?.kind || ""
        }, {
          layer: "lesson15-typed-operations",
          passed: !blockReason,
          operationFrame
        }, {
          layer: "lesson15-sentence-handoff",
          passed: sentenceHandoffFrame.authorizationStatus !== "blocked",
          sentenceHandoffFrame
        }, {
          layer: "shared-nnc-operation-plan",
          passed: authorized,
          operationEvaluationFrame
        }],
        conclusion: {
          authorized,
          authorizationStatus: authorized ? "authorized" : "blocked",
          blockReason: finalBlockReason,
          formulaRealization,
          resultOperationId: operationEvaluationFrame.resultOperationId,
          typedSlotAuthority: true,
          formulaStringAuthority: false
        },
        legalWitnessTagIds: ["cn-l15-further-nnc-conditions", ...CLASSICAL_NAHUATL_LESSON15_RULES.map(rule => rule.id)]
      };
      const lesson15Frame = {
        kind: "classical-nahuatl-ordinary-nnc-higher-nnc-frame",
        lesson: "Andrews Lesson 15",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: finalBlockReason,
        inputClassGovernedFrame: classGovernedFrame,
        nncSourceAuthorityFrame,
        operationFrame,
        sentenceHandoffFrame,
        nncSlotFrame,
        operationEvaluationFrame,
        proofFrame,
        selectedOutputLogicFrame: {
          kind: "classical-nahuatl-nnc-selected-output-logic-frame",
          authorizationStatus: authorized ? "authorized" : "blocked",
          selectedFormula: formulaRealization,
          selectedNncSlotFrame: authorized ? nncSlotFrame : null,
          selectedOutputAuthority: "typed-nnc-slots-after-ordinary-conditions-operation",
          formulaStringAuthority: false,
          displayReceiptAuthority: "not-authority"
        },
        formulaRealization,
        ruleRefs: getClassicalNahuatlOrdinaryNncRules(),
        grammarGenerationAllowed: authorized,
        formulaOutputAllowed: authorized,
        sentenceSurfaceGenerationAllowed: false,
      };
      lesson15Frame.analogicalRestrictedUseContractFrame =
        buildClassicalNahuatlAnalogicalRestrictedUseContractFrame(
          lesson15Frame
        );
      lesson15Frame.operationFrame.analogicalRestrictedUseContractFrame =
        lesson15Frame.analogicalRestrictedUseContractFrame;
      lesson15Frame.reclassificationContractFrame =
        buildClassicalNahuatlReclassificationContractFrame(
          lesson15Frame
        );
      lesson15Frame.operationFrame.reclassificationContractFrame =
        lesson15Frame.reclassificationContractFrame;
      lesson15Frame.ordinaryNncContractFrame =
        buildClassicalNahuatlOrdinaryNncContractFrame(lesson15Frame);
      lesson15Frame.lessons12To15GrammarSurfaceContractFrame =
        buildClassicalNahuatlGrammarSurfaceContractFrame(lesson15Frame);
      lesson15Frame.proofFrame.conclusion.ordinaryNncContractFrame =
        lesson15Frame.ordinaryNncContractFrame;
      lesson15Frame.proofFrame.conclusion.lessons12To15GrammarSurfaceContractFrame =
        lesson15Frame.lessons12To15GrammarSurfaceContractFrame;
      lesson15Frame.selectedOutputLogicFrame.ordinaryNncContractFrame =
        lesson15Frame.ordinaryNncContractFrame;
      lesson15Frame.selectedOutputLogicFrame.lessons12To15GrammarSurfaceContractFrame =
        lesson15Frame.lessons12To15GrammarSurfaceContractFrame;
      return lesson15Frame;
    }
    function normalizeClassicalNahuatlSubtype(value = "") {
      const key = normalizeClassicalNahuatlNncToken(value).toLowerCase().replace(/[\s_]/gu, "-");
      const aliases = {
        "personal-simple": "personal-simple",
        "personal-compound": "personal-compound",
        "personal-compound-derived": "personal-compound-derived",
        personal: "personal-simple",
        interrogative: "interrogative",
        "quantitive-personal-compound": "quantitive-personal-compound",
        demonstrative: "demonstrative",
        indefinite: "indefinite",
        quantitive: "quantitive",
        quantitative: "quantitive",
        relative: "relative"
      };
      return aliases[key] || "";
    }
    function normalizeClassicalNahuatlQuantitiveMatrixFamily(value = "") {
      const key = normalizeClassicalNahuatlNncToken(value).toLowerCase().replace(/[\s_]/gu, "-");
      return {
        quich: "qui-ch",
        "qui-ch": "qui-ch",
        qui: "quī",
        "quī": "quī",
        chi: "chī",
        "chī": "chī"
      }[key] || "";
    }
    const CLASSICAL_NAHUATL_LESSON16_QUANTITIVE_SOURCE_LICENSES = Object.freeze({
      "ix-qui-ch": Object.freeze({ forms: Object.freeze({ "qui-ch": ["plain-qui-ch"] }), interrogative: false }),
      "cem-ix-qui-ch": Object.freeze({ forms: Object.freeze({ "qui-ch": ["plain-qui-ch"] }), interrogative: false }),
      "quē-x-qui-ch": Object.freeze({ forms: Object.freeze({ "qui-ch": ["plain-qui-ch"] }), interrogative: true }),
      "quē-x-ix-qui-ch": Object.freeze({ forms: Object.freeze({ "qui-ch": ["plain-qui-ch"] }), interrogative: true }),
      "miya-qui": Object.freeze({ forms: Object.freeze({ qui: ["internal-n"], quī: ["internal-n"], c: ["plain-variant"] }), interrogative: false }),
      "miya-quī": Object.freeze({ aliasOf: "miya-qui" }),
      "miya-c": Object.freeze({ aliasOf: "miya-qui" }),
      "miye-qui": Object.freeze({ forms: Object.freeze({ qui: ["internal-n"], quī: ["internal-n"], c: ["plain-variant"] }), interrogative: false }),
      "miye-quī": Object.freeze({ aliasOf: "miye-qui" }),
      "miye-c": Object.freeze({ aliasOf: "miye-qui" }),
      "ce-qui": Object.freeze({ forms: Object.freeze({ qui: ["internal-n"], quī: ["internal-n"] }), interrogative: false }),
      "ce-quī": Object.freeze({ aliasOf: "ce-qui" }),
      "iz-qui": Object.freeze({ forms: Object.freeze({ qui: ["internal-n"], quī: ["internal-n", "plain-variant"] }), interrogative: false }),
      "iz-quī": Object.freeze({ aliasOf: "iz-qui" }),
      "quē-z-qui": Object.freeze({ forms: Object.freeze({ qui: ["internal-n"], quī: ["internal-n", "plain-variant"] }), interrogative: true }),
      "quē-z-quī": Object.freeze({ aliasOf: "quē-z-qui" }),
      "quē-c-iz-qui": Object.freeze({ forms: Object.freeze({ qui: ["internal-n"], quī: ["internal-n"] }), interrogative: true }),
      "quē-c-iz-quī": Object.freeze({ aliasOf: "quē-c-iz-qui" }),
      "a-qui": Object.freeze({ forms: Object.freeze({ qui: ["internal-n"], quī: ["internal-n"] }), interrogative: false }),
      "a-quī": Object.freeze({ aliasOf: "a-qui" }),
      "a-chi": Object.freeze({ forms: Object.freeze({ chi: ["internal-n"], chī: ["internal-n"] }), interrogative: false }),
      "a-chī": Object.freeze({ aliasOf: "a-chi" }),
      "mo-chi": Object.freeze({ forms: Object.freeze({ chi: ["internal-n"], chī: ["internal-n"], ch: ["plain-variant"] }), interrogative: false }),
      "mo-chī": Object.freeze({ aliasOf: "mo-chi" }),
      "mo-ch": Object.freeze({ aliasOf: "mo-chi" }),
      "ix-a-chi": Object.freeze({ forms: Object.freeze({ chi: ["internal-n"], chī: ["internal-n"] }), interrogative: false }),
      "ix-a-chī": Object.freeze({ aliasOf: "ix-a-chi" })
    });
    const CLASSICAL_NAHUATL_LESSON16_DERIVED_PERSONAL_SOURCES = Object.freeze({
      "yeh-yeh-huā": Object.freeze({
        baseStem: "yeh-huā",
        reduplicant: "yeh",
        derivationalRelation: "distributive-varietal"
      }),
      "eh-eh-huā": Object.freeze({
        baseStem: "eh-huā",
        reduplicant: "eh",
        derivationalRelation: "distributive-varietal"
      })
    });
    const CLASSICAL_NAHUATL_LESSON16_CA_COMPOUND_SOURCES = Object.freeze({
      "cā-tl-eh": Object.freeze({
        embed: "cā",
        matrix: "tl-eh",
        matrixNumberClass: "zero"
      }),
      "cā-tl-e-in": Object.freeze({
        embed: "cā",
        matrix: "tl-e-in",
        matrixNumberClass: "zero"
      }),
      "cā-tl-eh-huā": Object.freeze({
        embed: "cā",
        matrix: "tl-eh-huā",
        matrixNumberClass: "tl"
      })
    });
    const CLASSICAL_NAHUATL_LESSON16_PARADIGM_SOURCE_PROJECTION_TOKEN =
      Object.freeze({ kind: "lesson16-paradigm-source-projection-token" });
    function buildClassicalNahuatlQuantitiveSourceAnalysis(options = {}) {
      const sourceStem = normalizeClassicalNahuatlNncStem(options.sourceStem || "");
      const rawSourceLicense =
        CLASSICAL_NAHUATL_LESSON16_QUANTITIVE_SOURCE_LICENSES[sourceStem] || null;
      const canonicalSourceStem = rawSourceLicense?.aliasOf || sourceStem;
      const sourceLicense = rawSourceLicense?.aliasOf
        ? CLASSICAL_NAHUATL_LESSON16_QUANTITIVE_SOURCE_LICENSES[
            rawSourceLicense.aliasOf
          ] || null
        : rawSourceLicense;
      const sourceMatrixForm = sourceLicense
        ? Object.keys(sourceLicense.forms)
          .sort((left, right) => right.length - left.length)
          .find(candidate =>
            canonicalSourceStem.endsWith(`-${candidate}`)
          ) || ""
        : "";
      const inferredEmbedStem = sourceMatrixForm
        ? canonicalSourceStem.slice(0, -(sourceMatrixForm.length + 1))
        : "";
      const embedStem = normalizeClassicalNahuatlNncStem(
        options.embedStem || options.quantitiveEmbed || inferredEmbedStem
      );
      const matrixForm = normalizeClassicalNahuatlNncStem(options.matrixForm || options.matrixAllomorph || "");
      const selectedStem = embedStem && matrixForm ? `${embedStem}-${matrixForm}` : "";
      const sourceIdentityStem = sourceStem || selectedStem;
      const selectedRawSourceLicense =
        rawSourceLicense
        || CLASSICAL_NAHUATL_LESSON16_QUANTITIVE_SOURCE_LICENSES[
          sourceIdentityStem
        ]
        || null;
      const selectedSourceLicense = selectedRawSourceLicense?.aliasOf
        ? CLASSICAL_NAHUATL_LESSON16_QUANTITIVE_SOURCE_LICENSES[
            selectedRawSourceLicense.aliasOf
          ] || null
        : selectedRawSourceLicense;
      const resolvedCanonicalSourceStem =
        selectedRawSourceLicense?.aliasOf
        || canonicalSourceStem
        || sourceIdentityStem;
      const selectedMatrixFormPluralizations =
        selectedSourceLicense?.forms?.[matrixForm] || [];
      const allowedPluralizations = selectedSourceLicense
        ? Array.from(new Set(Object.values(selectedSourceLicense.forms).flat()))
        : [];
      let blockReason = "";
      if (!selectedStem || !sourceIdentityStem) {
        blockReason = "quantitive-source-analysis-requires-embed-and-matrix";
      } else if (inferredEmbedStem && embedStem !== inferredEmbedStem) {
        blockReason = "quantitive-embed-does-not-match-canonical-source-identity";
      } else if (sourceIdentityStem === "ce-c") {
        blockReason = "ce-c-is-embed-only-not-a-complete-pronominal-nnc-source";
      } else if (!selectedSourceLicense) {
        blockReason = "quantitive-source-not-licensed-by-lesson16-inventory";
      } else if (!selectedMatrixFormPluralizations.length) {
        blockReason = "quantitive-matrix-form-not-licensed-for-source";
      }
      return {
        kind: "classical-nahuatl-pronominal-nnc-quantitive-source-analysis",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: blockReason ? "blocked" : "authorized",
        blockReason,
        sourceStem: sourceIdentityStem,
        canonicalSourceStem: resolvedCanonicalSourceStem,
        selectedStem,
        embedStem,
        matrixForm,
        allowedMatrixForms: selectedSourceLicense
          ? Object.keys(selectedSourceLicense.forms)
          : [],
        selectedMatrixFormPluralizations: [...selectedMatrixFormPluralizations],
        allowedPluralizations: [...allowedPluralizations],
        inherentInterrogative: selectedSourceLicense?.interrogative === true,
        inventorySelectionAuthority: "typed-engine-source-analysis",
        sourceExamplesAreRuntimeAuthority: false,
        callerBooleanAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false
      };
    }
    function buildClassicalNahuatlQuantitiveAuthorityRecord(options = {}) {
      const matrixFamily = normalizeClassicalNahuatlQuantitiveMatrixFamily(options.matrixFamily || options.quantitiveMatrix || "");
      const matrixForm = normalizeClassicalNahuatlNncStem(options.matrixForm || options.matrixAllomorph || "");
      const sourceAnalysis = buildClassicalNahuatlQuantitiveSourceAnalysis({
        embedStem: options.embedStem || options.quantitiveEmbed || "",
        matrixForm,
        sourceStem: options.sourceStem
      });
      const embedStem = sourceAnalysis.embedStem;
      const subject = normalizeClassicalNahuatlNncSubject(options.subject || "3common");
      const pluralSubject = subject.endsWith("pl");
      const allowedMatrixForms = {
        "qui-ch": ["qui-ch"],
        "quī": ["quī", "qui", "c"],
        "chī": ["chī", "chi", "ch"]
      }[matrixFamily] || [];
      const requestedPluralization = normalizeClassicalNahuatlNncToken(options.predicatePluralization || "").toLowerCase().replace(/[\s_]/gu, "-");
      const predicatePluralization = pluralSubject
        ? requestedPluralization || sourceAnalysis.allowedPluralizations[0] || ""
        : "not-applicable";
      const plainVariantForms = ["quī", "qui", "c", "chī", "chi", "ch"];
      const plainVariantLexicallyAuthorized =
        sourceAnalysis.selectedMatrixFormPluralizations.includes("plain-variant");
      const selectedPluralizationAuthorized =
        predicatePluralization === "internal-n"
          ? sourceAnalysis.allowedPluralizations.includes("internal-n")
          : sourceAnalysis.selectedMatrixFormPluralizations.includes(predicatePluralization);
      const longPluralMatrixForm = matrixFamily === "quī" ? "quī" : matrixFamily === "chī" ? "chī" : "";
      const selectedStem = embedStem && matrixForm ? `${embedStem}-${matrixForm}` : "";
      const pluralizedStem = predicatePluralization === "internal-n" && embedStem && longPluralMatrixForm ? `${embedStem}-${longPluralMatrixForm}-n` : "";
      let allowedSubjectNumberDyads = [];
      if (pluralSubject && predicatePluralization === "plain-qui-ch") {
        allowedSubjectNumberDyads = ["t-in"];
      } else if (pluralSubject && predicatePluralization === "internal-n") {
        allowedSubjectNumberDyads = ["t-in", "silent-silent"];
      } else if (pluralSubject && predicatePluralization === "plain-variant" && ["c", "ch"].includes(matrixForm)) {
        allowedSubjectNumberDyads = ["t-in"];
      } else if (pluralSubject && predicatePluralization === "plain-variant" && ["quī", "qui", "chī", "chi"].includes(matrixForm)) {
        allowedSubjectNumberDyads = ["m-eh"];
      }
      let blockReason = "";
      if (!embedStem) {
        blockReason = "quantitive-embed-stem-required";
      } else if (!matrixFamily) {
        blockReason = "typed-quantitive-matrix-family-required";
      } else if (!allowedMatrixForms.includes(matrixForm)) {
        blockReason = "selected-quantitive-matrix-form-not-authorized-for-family";
      } else if (sourceAnalysis.authorizationStatus !== "authorized") {
        blockReason = sourceAnalysis.blockReason;
      } else if (pluralSubject && !["plain-qui-ch", "internal-n", "plain-variant"].includes(predicatePluralization)) {
        blockReason = "typed-quantitive-predicate-pluralization-required";
      } else if (matrixFamily === "qui-ch" && predicatePluralization !== (pluralSubject ? "plain-qui-ch" : "not-applicable")) {
        blockReason = "qui-ch-matrix-cannot-acquire-internal-plural-n";
      } else if (pluralSubject && !selectedPluralizationAuthorized) {
        blockReason = "selected-quantitive-pluralization-not-authorized-for-source";
      } else if (predicatePluralization === "plain-variant" && !plainVariantForms.includes(matrixForm)) {
        blockReason = "plain-quantitive-plural-variant-requires-lexically-witnessed-qui-chi-c-or-ch-form";
      } else if (predicatePluralization === "plain-variant" && !plainVariantLexicallyAuthorized) {
        blockReason = "plain-quantitive-plural-variant-requires-explicit-lexical-authorization";
      } else if (pluralSubject && !allowedSubjectNumberDyads.length) {
        blockReason = "quantitive-predicate-pluralization-has-no-authorized-subject-number-dyad";
      }
      return {
        kind: "classical-nahuatl-pronominal-nnc-quantitive-authority-record",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: blockReason ? "blocked" : "authorized",
        blockReason,
        subject,
        sourceAnalysis,
        canonicalSourceStem: sourceAnalysis.sourceStem,
        embedStem,
        matrixFamily,
        matrixForm,
        allowedMatrixForms,
        selectedStem,
        predicatePluralization,
        pluralizedStem,
        internalPluralMorph: predicatePluralization === "internal-n" ? "n-inside-stem" : "none",
        internalPluralBelongsTo: "predicate-stem-derivation",
        allowedSubjectNumberDyads,
        plainVariantLexicallyAuthorized,
        interrogativeMeaning: sourceAnalysis.inherentInterrogative,
        matrixFormSelectionAuthority: "typed-engine-source-analysis",
        predicatePluralizationSelectionAuthority: "typed-engine-source-analysis",
        deploymentFullyPredictable: false,
        shortAndLongIShareTypedValue: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        legalWitnessTagIds: ["cn-l16-167-quantitive-matrices", matrixFamily === "qui-ch" ? "cn-l16-168-quich-family" : "cn-l16-169-qui-chi-family"]
      };
    }
    function isClassicalNahuatlQuantitiveAuthorityRecord(record = null) {
      return Boolean(record && record.kind === "classical-nahuatl-pronominal-nnc-quantitive-authority-record" && record.sourceAuthority === "Andrews transcription" && record.sourceDocument === CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT && ["authorized", "blocked"].includes(record.authorizationStatus) && typeof record.subject === "string" && typeof record.embedStem === "string" && ["qui-ch", "quī", "chī"].includes(record.matrixFamily) && typeof record.matrixForm === "string" && Array.isArray(record.allowedMatrixForms) && (record.authorizationStatus === "blocked" || record.allowedMatrixForms.includes(record.matrixForm)) && ["not-applicable", "plain-qui-ch", "internal-n", "plain-variant"].includes(record.predicatePluralization) && Array.isArray(record.allowedSubjectNumberDyads) && record.internalPluralBelongsTo === "predicate-stem-derivation" && record.formulaStringAuthority === false && record.surfaceStringAuthority === false);
    }
    function hasLooseClassicalNahuatlLesson16QuantitiveClaim(options = {}) {
      return ["quantitiveMatrix", "matrixFamily", "quantitiveEmbed", "embedStem", "matrixAllomorph", "matrixForm", "predicatePluralization", "plainPluralVariantAuthorized", "plainVariantLexicallyAuthorized"].some(key => Object.prototype.hasOwnProperty.call(options, key));
    }
    function resolveClassicalNahuatlLesson16ContextIdentity(options = {}) {
      const subtype = normalizeClassicalNahuatlSubtype(options.subtype || options.pronominalSubtype || "");
      const subject = normalizeClassicalNahuatlNncSubject(options.subject || "3sg");
      let subtypeDetail = "";
      if (subtype === "personal-simple") subtypeDetail = "personal-simple-eh";else if (subtype === "personal-compound") subtypeDetail = "personal-compound-eh-huā";else if (subtype === "personal-compound-derived") subtypeDetail = "personal-compound-derived-common-number";else if (subtype === "interrogative") {
        const kind = normalizeClassicalNahuatlNncToken(options.interrogativeKind || "tleh").toLowerCase();
        subtypeDetail = {
          tleh: "what-entity",
          "tleh-huā": "what-entity-compound",
          "tleh-hua": "what-entity-compound",
          cā: "which-entity",
          ca: "which-entity",
          āc: "what-person",
          ac: "what-person"
        }[kind] || "";
      } else if (subtype === "demonstrative") subtypeDetail = "demonstrative";else if (subtype === "indefinite") {
        subtypeDetail = normalizeClassicalNahuatlNncToken(options.indefiniteKind || "someone").toLowerCase();
      } else if (subtype === "quantitive") {
        const quantitiveAuthorityRecord = options.quantitiveAuthorityRecord;
        subtypeDetail = isClassicalNahuatlQuantitiveAuthorityRecord(quantitiveAuthorityRecord) ? quantitiveAuthorityRecord.matrixFamily : "";
      } else if (subtype === "quantitive-personal-compound") subtypeDetail = "quantitive-personal-compound";
      const referentKey = normalizeClassicalNahuatlNncToken(options.subjectReferentCategory || options.subjectReferentAnimacy || "").toLowerCase();
      const humanSubject = ["1sg", "2sg", "1pl", "2pl"].includes(subject) || referentKey === "human";
      return {
        subtype,
        subtypeDetail,
        subject,
        subjectReferentCategory: humanSubject ? "human" : referentKey === "nonhuman" ? "nonhuman" : "unspecified",
        humanSubject
      };
    }
    function buildClassicalNahuatlAdjunctorInFrame(options = {}) {
      const identity = resolveClassicalNahuatlLesson16ContextIdentity(options);
      const requestedMode = normalizeClassicalNahuatlNncToken(
        options.adjunctorInMode
        || (options.dependentClauseIntroducedByInSelected === true
          ? "dependent-clause"
          : "none")
      ).toLowerCase().replace(/[\s_]/gu, "-");
      const mode = {
        none: "none",
        absent: "none",
        "dependent-clause": "dependent-clause",
        present: "dependent-clause",
        "fused-tlein": "fused-tlein",
        tlein: "fused-tlein",
        "fused-tlei": "fused-tlei",
        tlei: "fused-tlei",
        "fused-tlen": "fused-tlen",
        tlen: "fused-tlen",
        "fused-aquin": "fused-aquin",
        aquin: "fused-aquin",
        "fused-aqui": "fused-aqui",
        aqui: "fused-aqui"
      }[requestedMode] || "";
      const available = identity.subtype === "interrogative"
        && ["what-entity", "what-person"].includes(identity.subtypeDetail);
      const allowedModes = identity.subtypeDetail === "what-entity"
        ? ["none", "dependent-clause", "fused-tlein", "fused-tlei", "fused-tlen"]
        : identity.subtypeDetail === "what-person"
          ? ["none", "dependent-clause", "fused-aquin", "fused-aqui"]
          : ["none"];
      const fusedSurface = {
        "fused-tlein": "tlein",
        "fused-tlei": "tlei",
        "fused-tlen": "tlen",
        "fused-aquin": "āquin",
        "fused-aqui": "aqui"
      }[mode] || "";
      let blockReason = "";
      if (!mode) {
        blockReason = "unknown-lesson16-adjunctor-in-mode";
      } else if (!allowedModes.includes(mode)) {
        blockReason = "selected-adjunctor-in-mode-not-authorized-for-pronominal-source";
      }
      return {
        kind: "classical-nahuatl-pronominal-nnc-adjunctor-in-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: blockReason ? "blocked" : "authorized",
        blockReason,
        subtype: identity.subtype,
        subtypeDetail: identity.subtypeDetail,
        subject: identity.subject,
        available,
        mode,
        allowedModes,
        dependentClausePresent: mode === "dependent-clause",
        ellipsisSelected: mode.startsWith("fused-"),
        fusedSurface,
        writingPolicy: mode === "dependent-clause"
          ? "write-pronominal-nnc-and-in-separately"
          : mode.startsWith("fused-")
            ? "fuse-in-after-dependent-clause-ellipsis"
            : "no-adjunctor-in-selected",
        selectionAuthority: "typed-user-context-selection",
        fusedSurfaceAuthority: "typed-conditioned-realization",
        formulaStringAuthority: false,
        surfaceStringAuthority: false
      };
    }
    function buildClassicalNahuatlContextSelectionRecord(options = {}) {
      const identity = resolveClassicalNahuatlLesson16ContextIdentity(options);
      const doubledFirstPluralSelected = options.doubledFirstPluralSelected === true;
      const adjunctorInFrame = buildClassicalNahuatlAdjunctorInFrame(options);
      const dependentClauseIntroducedByInSelected = adjunctorInFrame.dependentClausePresent;
      const specialHumanUseSelected = options.specialHumanUseSelected === true;
      const doubledFirstPluralAvailable = identity.subtype === "personal-compound" && identity.subject === "1pl";
      const dependentClauseIntroducedByInAvailable = identity.subtype === "interrogative" && ["what-entity", "what-person"].includes(identity.subtypeDetail);
      const specialHumanUseAvailable = identity.subtype === "indefinite" && identity.subtypeDetail === "something" && identity.humanSubject;
      let blockReason = "";
      if (doubledFirstPluralSelected && !doubledFirstPluralAvailable) {
        blockReason = "doubled-first-plural-person-is-limited-to-first-plural-personal-compound-nnc";
      } else if (adjunctorInFrame.authorizationStatus !== "authorized") {
        blockReason = adjunctorInFrame.blockReason;
      } else if (dependentClauseIntroducedByInSelected && !dependentClauseIntroducedByInAvailable) {
        blockReason = "dependent-in-clause-is-limited-to-tleh-or-ac-principal-clause-nncs";
      } else if (specialHumanUseSelected && !specialHumanUseAvailable) {
        blockReason = "special-human-itlah-selection-is-limited-to-itlah-with-a-human-subject";
      } else if (specialHumanUseAvailable && !specialHumanUseSelected) {
        blockReason = "itlah-with-human-subject-requires-special-situation-selection";
      }
      return {
        kind: "classical-nahuatl-pronominal-nnc-context-selection-record",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: blockReason ? "blocked" : "authorized",
        blockReason,
        subtype: identity.subtype,
        subtypeDetail: identity.subtypeDetail,
        subject: identity.subject,
        subjectReferentCategory: identity.subjectReferentCategory,
        adjunctorInFrame,
        doubledFirstPlural: {
          selectionId: "lesson16.3-doubled-first-plural",
          selected: doubledFirstPluralSelected,
          available: doubledFirstPluralAvailable,
          contextualMeaning: doubledFirstPluralSelected ? "member-or-members-of-our-people" : ""
        },
        dependentClauseIntroducedByIn: {
          selectionId: "lesson16.4-dependent-clause-introduced-by-in",
          selected: dependentClauseIntroducedByInSelected,
          available: dependentClauseIntroducedByInAvailable,
          writingPolicy: adjunctorInFrame.writingPolicy
        },
        specialHumanUse: {
          selectionId: "lesson16.6-special-human-itlah-use",
          selected: specialHumanUseSelected,
          available: specialHumanUseAvailable,
          required: specialHumanUseAvailable
        },
        selectionAuthority: "typed-user-context-selection",
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        legalWitnessTagIds: ["cn-l16-1634-doubled-first-plural", "cn-l16-164-identificational-interrogative", "cn-l16-166-indefinite"]
      };
    }
    function isClassicalNahuatlContextSelectionRecord(record = null) {
      const selections = [record?.doubledFirstPlural, record?.dependentClauseIntroducedByIn, record?.specialHumanUse];
      return Boolean(record && record.kind === "classical-nahuatl-pronominal-nnc-context-selection-record" && record.sourceAuthority === "Andrews transcription" && record.sourceDocument === CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT && ["authorized", "blocked"].includes(record.authorizationStatus) && typeof record.subtype === "string" && typeof record.subtypeDetail === "string" && typeof record.subject === "string" && record.adjunctorInFrame?.kind === "classical-nahuatl-pronominal-nnc-adjunctor-in-frame" && selections.every(selection => selection && typeof selection.selectionId === "string" && typeof selection.selected === "boolean" && typeof selection.available === "boolean") && record.formulaStringAuthority === false && record.surfaceStringAuthority === false);
    }
    function hasLooseClassicalNahuatlLesson16ContextClaim(options = {}) {
      return ["doubledFirstPluralPerson", "dependentClauseIntroducedByIn", "adjunctInPresent", "adjunctClausePresent", "specialHumanUse"].some(key => Object.prototype.hasOwnProperty.call(options, key));
    }
    function resolveClassicalNahuatlLesson16PronominalSourceCategories({
      subtype = "",
      subtypeDetail = "",
      semanticKind = "",
      composition = null
    } = {}) {
      let nounClass = "zero";
      if (["personal-compound", "personal-compound-derived", "quantitive-personal-compound"].includes(subtype) || subtypeDetail === "what-entity-compound") {
        nounClass = "tl";
      } else if (subtypeDetail === "which-entity") {
        nounClass = composition?.matrixNumberClass === "zero" ? "zero" : "tl";
      } else if (subtypeDetail === "what-person") {
        nounClass = "c";
      }
      const referentCategory = semanticKind === "quantitive" ? "quantity" : ["what-person", "someone"].includes(subtypeDetail) ? "person" : "entity";
      return {
        nounClass,
        nounClassAuthority: "typed-canvas-pronominal-source-structure",
        referentCategory,
        referentCategoryAuthority: "typed-canvas-pronominal-semantic-kind"
      };
    }
    function buildClassicalNahuatlPronominalSourceFrame(options = {}) {
      const subtype = normalizeClassicalNahuatlSubtype(options.subtype || options.pronominalSubtype || "");
      const subject = normalizeClassicalNahuatlNncSubject(options.subject || "3sg");
      const suppliedQuantitiveAuthorityRecord = options.quantitiveAuthorityRecord;
      const quantitiveAuthorityRecord = isClassicalNahuatlQuantitiveAuthorityRecord(suppliedQuantitiveAuthorityRecord) ? suppliedQuantitiveAuthorityRecord : null;
      const hasSuppliedContextSelection = Object.prototype.hasOwnProperty.call(options, "contextSelectionRecord");
      const suppliedContextSelection = options.contextSelectionRecord;
      const contextSelectionRecord = isClassicalNahuatlContextSelectionRecord(suppliedContextSelection) ? suppliedContextSelection : hasSuppliedContextSelection ? null : buildClassicalNahuatlContextSelectionRecord(options);
      const pluralSubject = subject.endsWith("pl");
      const thirdPerson = ["3sg", "3pl", "3common"].includes(subject);
      const requestedState = normalizeClassicalNahuatlNncToken(options.state || "absolutive").toLowerCase();
      let semanticKind = "";
      let sourceStem = "";
      let sourceIdentityStem = "";
      let structuralPluralType = "plain-stem";
      let inherentInterrogative = false;
      let subtypeDetail = "";
      let blockReason = "";
      let composition = null;
      let sourceIdentityAlternants = [];
      if (requestedState !== "absolutive") {
        blockReason = "pronominal-nncs-occur-only-in-absolutive-state";
      } else if (subtype === "relative") {
        blockReason = "canvas-has-no-relative-pronominal-nnc-subtype";
      } else if (subtype === "personal-simple") {
        semanticKind = "entitive";
        subtypeDetail = "personal-simple-eh";
        sourceStem = ["3sg", "3pl"].includes(subject)
          ? "yeh"
          : subject === "3common" && options.thirdCommonVariant !== "eh"
            ? "yeh"
            : "eh";
        sourceIdentityStem = "eh";
        sourceIdentityAlternants = ["eh", "yeh"];
      } else if (subtype === "personal-compound") {
        semanticKind = "entitive";
        subtypeDetail = "personal-compound-eh-huā";
        sourceStem = ["3sg", "3pl"].includes(subject)
          ? "yeh-huā"
          : subject === "3common" && options.thirdCommonVariant !== "eh"
            ? "yeh-huā"
            : "eh-huā";
        sourceIdentityStem = "eh-huā";
        sourceIdentityAlternants = ["eh-huā", "yeh-huā"];
        structuralPluralType = "internally-pluralized-stem";
      } else if (subtype === "personal-compound-derived") {
        semanticKind = "entitive";
        subtypeDetail = "personal-compound-derived-common-number";
        const requestedDerivedStem = normalizeClassicalNahuatlNncStem(
          options.derivedPersonalStem || ""
        );
        const derivedSource =
          CLASSICAL_NAHUATL_LESSON16_DERIVED_PERSONAL_SOURCES[
            requestedDerivedStem
          ] || null;
        sourceStem = derivedSource ? requestedDerivedStem : "";
        structuralPluralType = "plain-stem";
        composition = derivedSource ? {
          ...derivedSource,
          matrix: "eh-huā",
          sourceSelectionAuthority:
            "finite-lesson16-derived-personal-inventory"
        } : null;
        if (!requestedDerivedStem) {
          blockReason = "derived-personal-compound-stem-required";
        } else if (!derivedSource) {
          blockReason = "derived-personal-compound-stem-not-licensed";
        } else if (subject !== "3common") {
          blockReason =
            "derived-personal-compound-requires-third-common-subject";
        }
      } else if (subtype === "interrogative") {
        semanticKind = "entitive";
        inherentInterrogative = true;
        const kind = normalizeClassicalNahuatlNncToken(options.interrogativeKind || "tleh").toLowerCase();
        const stems = {
          tleh: "tl-eh",
          "tleh-huā": "tl-eh-huā",
          "tleh-hua": "tl-eh-huā",
          cā: "cā",
          ca: "cā",
          āc: "ā-0",
          ac: "ā-0"
        };
        const simpleInterrogativeStem = stems[kind] || "";
        const requestedCompoundStem = normalizeClassicalNahuatlNncStem(
          options.compoundInterrogativeStem || ""
        );
        const compoundSource = requestedCompoundStem
          ? CLASSICAL_NAHUATL_LESSON16_CA_COMPOUND_SOURCES[
              requestedCompoundStem
            ] || null
          : null;
        sourceStem = requestedCompoundStem
          ? compoundSource
            ? requestedCompoundStem
            : ""
          : simpleInterrogativeStem;
        subtypeDetail = {
          tleh: "what-entity",
          "tleh-huā": "what-entity-compound",
          "tleh-hua": "what-entity-compound",
          cā: "which-entity",
          ca: "which-entity",
          āc: "what-person",
          ac: "what-person"
        }[kind] || "";
        if (!simpleInterrogativeStem || !subtypeDetail) {
          blockReason = "unknown-identificational-interrogative-kind";
        } else if (requestedCompoundStem && subtypeDetail !== "which-entity") {
          blockReason = "compound-interrogative-stem-requires-ca-source";
        } else if (requestedCompoundStem && !compoundSource) {
          blockReason = "ca-compound-source-not-licensed-by-lesson16";
        } else if (subtypeDetail === "what-person" && subject !== "3sg") {
          blockReason = "ac-interrogative-requires-third-singular-subject";
        } else if (subtypeDetail === "which-entity" && !thirdPerson) {
          blockReason = "ca-interrogative-requires-third-person-subject";
        }
        if (subtypeDetail === "what-entity-compound") structuralPluralType = "internally-pluralized-stem";
        if (!blockReason && compoundSource) {
          const suppliedEmbed = normalizeClassicalNahuatlNncStem(
            options.compoundInterrogativeEmbed || ""
          );
          const suppliedMatrix = normalizeClassicalNahuatlNncStem(
            options.compoundInterrogativeMatrix || ""
          );
          composition = {
            ...compoundSource,
            sourceSelectionAuthority: "finite-lesson16-ca-compound-inventory"
          };
          if (
            (suppliedEmbed && suppliedEmbed !== compoundSource.embed)
            || (suppliedMatrix && suppliedMatrix !== compoundSource.matrix)
          ) {
            blockReason =
              "ca-compound-decomposition-does-not-match-canonical-source";
          }
          if (subtypeDetail === "which-entity" && composition.matrix === "tl-e-in") {
            structuralPluralType = "fused-in-to-i-plus-m-eh";
          } else if (subtypeDetail === "which-entity" && /huā$/u.test(composition.matrix)) {
            structuralPluralType = "internally-pluralized-stem";
          }
        }
      } else if (subtype === "demonstrative") {
        semanticKind = "entitive";
        subtypeDetail = "demonstrative";
        const demonstrative = normalizeClassicalNahuatlNncToken(options.demonstrative || "īn").toLowerCase();
        sourceStem = {
          "īn": "īn",
          in: "īn",
          "ōn": "ōn",
          on: "ōn"
        }[demonstrative] || "";
        if (!sourceStem) blockReason = "unknown-demonstrative-pronominal-stem";else if (!thirdPerson) blockReason = "demonstrative-pronominal-nnc-requires-third-person-subject";
      } else if (subtype === "indefinite") {
        semanticKind = "entitive";
        const kind = normalizeClassicalNahuatlNncToken(options.indefiniteKind || "someone").toLowerCase();
        sourceStem = {
          someone: "a-c-ah",
          something: "itl-ah"
        }[kind] || "";
        subtypeDetail = kind;
        composition = sourceStem ? {
          embed: kind === "someone" ? "a-c" : "itl",
          matrix: "ah",
          embedVowelLengthAction: "remove-length-before-ah-matrix"
        } : null;
        if (!sourceStem) blockReason = "unknown-indefinite-pronominal-stem";
      } else if (subtype === "quantitive") {
        semanticKind = "quantitive";
        if (hasLooseClassicalNahuatlLesson16QuantitiveClaim(options)) {
          blockReason = "loose-lesson16-quantitive-claims-are-not-authority";
        } else if (!quantitiveAuthorityRecord) {
          blockReason = "typed-lesson16-quantitive-authority-record-required";
        } else if (quantitiveAuthorityRecord.subject !== subject) {
          blockReason = "lesson16-quantitive-authority-record-does-not-match-subject";
        } else if (quantitiveAuthorityRecord.authorizationStatus !== "authorized") {
          blockReason = quantitiveAuthorityRecord.blockReason || "lesson16-quantitive-authority-record-not-authorized";
        } else {
          sourceStem = quantitiveAuthorityRecord.selectedStem;
          sourceIdentityStem = quantitiveAuthorityRecord.canonicalSourceStem;
          subtypeDetail = quantitiveAuthorityRecord.matrixFamily;
          structuralPluralType = quantitiveAuthorityRecord.predicatePluralization === "internal-n" ? "internally-pluralized-stem" : "plain-stem";
          composition = {
            embed: quantitiveAuthorityRecord.embedStem,
            matrixFamily: subtypeDetail,
            matrixAllomorph: quantitiveAuthorityRecord.matrixForm,
            matrixAllomorphSelectionAuthority: quantitiveAuthorityRecord.matrixFormSelectionAuthority,
            predicatePluralization: quantitiveAuthorityRecord.predicatePluralization,
            deploymentFullyPredictable: quantitiveAuthorityRecord.deploymentFullyPredictable
          };
          inherentInterrogative = quantitiveAuthorityRecord.interrogativeMeaning === true;
        }
      } else if (subtype === "quantitive-personal-compound") {
        semanticKind = "quantitive";
        subtypeDetail = "quantitive-personal-compound";
        const embed = normalizeClassicalNahuatlNncStem(options.quantitiveEmbed || options.embedStem || "");
        const matrix = normalizeClassicalNahuatlNncStem(options.quantitivePersonalMatrix || options.matrixStem || "");
        if (!embed) blockReason = "quantitive-personal-compound-embed-required";else if (embed !== "mo-ch") blockReason = "quantitive-personal-compound-requires-mo-ch-embed";else if (matrix !== "eh-huā") blockReason = "quantitive-personal-compound-requires-eh-huā-matrix";else {
          sourceStem = "mo-ch-eh-huā";
          structuralPluralType = "internally-pluralized-stem";
          composition = {
            embed,
            matrix,
            matrixFamily: "personal-compound-eh-huā",
            sourceSelectionAuthority:
              "finite-lesson16-quantitive-personal-compound-inventory"
          };
        }
      } else if (!blockReason) {
        blockReason = "unknown-pronominal-nnc-subtype";
      }
      if (!blockReason && hasLooseClassicalNahuatlLesson16ContextClaim(options)) {
        blockReason = "loose-lesson16-context-claims-are-not-authority";
      } else if (!blockReason && !contextSelectionRecord) {
        blockReason = "typed-lesson16-context-selection-record-required";
      } else if (!blockReason && (contextSelectionRecord.subtype !== subtype || contextSelectionRecord.subtypeDetail !== subtypeDetail || contextSelectionRecord.subject !== subject)) {
        blockReason = "lesson16-context-selection-does-not-match-pronominal-source";
      } else if (!blockReason && contextSelectionRecord.authorizationStatus !== "authorized") {
        blockReason = contextSelectionRecord.blockReason || "lesson16-context-selection-not-authorized";
      }
      const enteredStem = normalizeClassicalNahuatlNncStem(options.enteredStem || options.sourceStem || "");
      if (!sourceIdentityStem) sourceIdentityStem = sourceStem;
      if (!sourceIdentityAlternants.length && sourceIdentityStem) {
        sourceIdentityAlternants = [sourceIdentityStem];
      }
      const paradigmSourceProjection =
        options.lesson16ParadigmSourceProjectionToken
        === CLASSICAL_NAHUATL_LESSON16_PARADIGM_SOURCE_PROJECTION_TOKEN;
      const enteredStemMatchesAnalysis = Boolean(
        enteredStem
        && (
          paradigmSourceProjection
            ? sourceIdentityAlternants.includes(enteredStem)
            : enteredStem === sourceStem
        )
      );
      if (!blockReason && options.requireEnteredStem === true && !enteredStem) {
        blockReason = "pronominal-nnc-entered-stem-required";
      } else if (!blockReason && enteredStem && !enteredStemMatchesAnalysis) {
        blockReason = "entered-stem-does-not-match-selected-pronominal-nnc-analysis";
      }
      const sourceCategories = resolveClassicalNahuatlLesson16PronominalSourceCategories({
        subtype,
        subtypeDetail,
        semanticKind,
        composition
      });
      const authorized = Boolean(!blockReason && subtype && subject && semanticKind && sourceStem);
      return {
        kind: "classical-nahuatl-pronominal-nnc-pronominal-source-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason,
        state: "absolutive",
        semanticKind,
        subtype,
        subtypeDetail,
        subject,
        enteredStem,
        enteredStemMatchesAnalysis,
        enteredStemAuthority: options.requireEnteredStem === true ? "required-source-panel-stem" : "optional-verification-witness",
        sourceStem: authorized ? sourceStem : "",
        sourceIdentityStem: authorized ? sourceIdentityStem : "",
        sourceIdentityAlternants: authorized ? [...sourceIdentityAlternants] : [],
        nounClass: authorized ? sourceCategories.nounClass : "",
        nounClassAuthority: sourceCategories.nounClassAuthority,
        referentCategory: authorized ? sourceCategories.referentCategory : "",
        referentCategoryAuthority: sourceCategories.referentCategoryAuthority,
        structuralPluralType,
        composition,
        inherentInterrogative,
        quantitiveAuthorityRecord,
        quantitiveAuthority: subtype === "quantitive" ? "typed-lesson16-quantitive-authority-record" : "not-applicable",
        contextSelectionRecord,
        contextSelectionAuthority: "typed-user-context-selection",
        EnglishPronounTranslationIsStructuralAuthority: false,
        relativePronounInventory: "none",
        legalWitnessTagIds: ["cn-l16-161-pronominal-family", "cn-l16-162-entitive-subtypes"]
      };
    }
    const CLASSICAL_NAHUATL_LESSON16_GCD = Object.freeze({
      identityId: "lesson16:pronominal-absolutive-nnc",
      formula: "#pers1-pers2(STEM)num1-num2#",
      state: "absolutive",
      tenseSlot: "none",
      valenceSlot: "replaced-by-state",
      predicateStemContainsInternalPlural: true,
      subjectNumberRemainsOutsidePredicate: true,
      generatorAuthority: "typed-nnc-slots",
      formulaStringAuthority: false
    });
    const CLASSICAL_NAHUATL_LESSON16_LCM_AXES = Object.freeze([
      "semantic-kind",
      "entitive-subtype",
      "typed-source-analysis",
      "subject-person",
      "subject-number",
      "predicate-structural-plural-type",
      "predicate-internal-plural-n",
      "subject-number-dyad",
      "compound-number-variant",
      "quantitive-matrix-family",
      "quantitive-matrix-allomorph",
      "quantitive-plural-strategy",
      "interrogative-identity",
      "clause-position",
      "polarity",
      "interrogative-force",
      "dependent-in-writing",
      "doubled-first-plural",
      "special-human-itlah-use"
    ]);
    function buildClassicalNahuatlGrammarContractFrame(pronominalFrame = null) {
      const typedFrame = pronominalFrame?.kind === "classical-nahuatl-pronominal-nnc-pronominal-nnc-frame";
      const authorized = Boolean(
        typedFrame
        && pronominalFrame.authorizationStatus === "authorized"
      );
      const sourceFrame = pronominalFrame?.sourceFrame || null;
      const numberFrame = pronominalFrame?.numberFrame || null;
      const discourseFrame = pronominalFrame?.discourseFrame || null;
      return {
        kind: "classical-nahuatl-pronominal-nnc-pronominal-grammar-contract-frame",
        version: 1,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized
          ? ""
          : pronominalFrame?.blockReason
            || "authorized-lesson16-pronominal-frame-required",
        authority: "typed-pronominal-source-plus-canonical-nnc-slots",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        sourceEvidenceBoundary: "test-only-not-imported-by-production-grammar",
        greatestCommonDivisor: { ...CLASSICAL_NAHUATL_LESSON16_GCD },
        leastCommonMultiple: {
          axisCount: CLASSICAL_NAHUATL_LESSON16_LCM_AXES.length,
          distinctionAxes: [...CLASSICAL_NAHUATL_LESSON16_LCM_AXES],
          selectedCoordinate: authorized ? {
            coordinateId: [
              sourceFrame.subtype,
              sourceFrame.subtypeDetail,
              sourceFrame.subject,
              numberFrame.numberVariant,
              discourseFrame.clauseInitial ? "initial" : "noninitial",
              discourseFrame.polarity,
              discourseFrame.adjunctorInFrame?.mode || "none"
            ].join(":"),
            semanticKind: sourceFrame.semanticKind,
            subtype: sourceFrame.subtype,
            subtypeDetail: sourceFrame.subtypeDetail,
            sourceStem: sourceFrame.sourceStem,
            subject: sourceFrame.subject,
            predicateStem: numberFrame.predicateStem,
            internalPluralMorph: numberFrame.internalPluralMorph,
            subjectNumberDyad: `${numberFrame.num1}-${numberFrame.num2}`,
            numberVariant: numberFrame.numberVariant,
            clausePosition: discourseFrame.clauseInitial ? "initial" : "noninitial",
            polarity: discourseFrame.polarity,
            adjunctorInMode: discourseFrame.adjunctorInFrame?.mode || "none",
            adjunctorWritingPolicy: discourseFrame.adjunctorInFrame?.writingPolicy || "",
            interrogativeReadingActive: discourseFrame.interrogativeReadingActive,
            formulaRealization: pronominalFrame.formulaRealization
          } : null
        },
        sourceInventoryIsRuntimeAuthority: false,
        sourceAuditPresentation: "internal-verification-only",
        curriculumOrderAuthority: false,
        formulaStringAuthority: false,
        displayTextAuthority: false
      };
    }
    function buildClassicalNahuatlPronominalParadigmPlan(options = {}) {
      const subtype = normalizeClassicalNahuatlSubtype(options.subtype || options.pronominalSubtype || "");
      const enteredStem = normalizeClassicalNahuatlNncStem(options.enteredStem || options.sourceStem || "");
      const allSubjects = ["1sg", "2sg", "3sg", "3common", "1pl", "2pl", "3pl"];
      const quantitiveSourceAnalysis = subtype === "quantitive"
        ? buildClassicalNahuatlQuantitiveSourceAnalysis(options)
        : null;
      const clausePositions = subtype === "interrogative"
        || quantitiveSourceAnalysis?.inherentInterrogative === true
        ? ["initial", "noninitial"]
        : ["initial"];
      const coordinates = [];
      let candidateCount = 0;
      for (const subject of allSubjects) {
        const plural = subject.endsWith("pl");
        let pluralizations = [""];
        let numberForms = plural ? ["m-eh"] : ["sounded"];
        let matrixForms = [""];
        if (subtype === "personal-compound" || subtype === "quantitive-personal-compound" || options.interrogativeKind === "tleh-huā") {
          numberForms = plural ? ["t-in", "silent-silent"] : ["sounded", "silent-silent"];
        } else if (subtype === "interrogative" && options.interrogativeKind === "tleh") {
          numberForms = plural ? ["m-eh", "t-in"] : ["sounded"];
        } else if (subtype === "demonstrative") {
          numberForms = plural ? ["silent-silent"] : ["sounded"];
        } else if (subtype === "indefinite") {
          numberForms = plural ? ["m-eh", "t-in"] : ["sounded"];
        } else if (subtype === "quantitive") {
          matrixForms = quantitiveSourceAnalysis?.allowedMatrixForms || [];
        }
        const doubledSelections = subtype === "personal-compound" && subject === "1pl"
          ? [false, true]
          : [false];
        const adjunctorInModes = subtype === "interrogative" && options.interrogativeKind === "tleh"
          ? ["none", "dependent-clause", "fused-tlein", "fused-tlei", "fused-tlen"]
          : subtype === "interrogative" && ["āc", "ac"].includes(options.interrogativeKind)
            ? ["none", "dependent-clause", "fused-aquin", "fused-aqui"]
            : ["none"];
        for (const matrixForm of matrixForms) {
          let routePluralizations = pluralizations;
          let routeNumberForms = numberForms;
          if (subtype === "quantitive") {
            const routeAnalysis = buildClassicalNahuatlQuantitiveSourceAnalysis({
              ...options,
              matrixForm,
              sourceStem: enteredStem
            });
            routePluralizations = plural
              ? Array.from(new Set([
                ...routeAnalysis.selectedMatrixFormPluralizations,
                ...(routeAnalysis.allowedPluralizations.includes("internal-n")
                  ? ["internal-n"]
                  : [])
              ]))
              : ["not-applicable"];
            routeNumberForms = plural ? [] : ["sounded"];
            if (plural) {
              routePluralizations.forEach(pluralization => {
                if (pluralization === "plain-qui-ch") routeNumberForms.push("t-in");
                if (pluralization === "internal-n") routeNumberForms.push("t-in", "silent-silent");
                if (pluralization === "plain-variant") {
                  routeNumberForms.push(["c", "ch"].includes(matrixForm) ? "t-in" : "m-eh");
                }
              });
              routeNumberForms = Array.from(new Set(routeNumberForms));
            }
        }
        for (const predicatePluralization of routePluralizations) {
          const predicateNumberForms = subtype === "quantitive" && plural
            ? predicatePluralization === "plain-qui-ch"
              ? ["t-in"]
              : predicatePluralization === "internal-n"
                ? ["t-in", "silent-silent"]
                : predicatePluralization === "plain-variant"
                  ? [["c", "ch"].includes(matrixForm) ? "t-in" : "m-eh"]
                  : []
            : routeNumberForms;
          for (const numberForm of predicateNumberForms) {
            for (const clausePosition of clausePositions) {
              for (const doubledFirstPluralSelected of doubledSelections) {
                for (const adjunctorInMode of adjunctorInModes) {
                candidateCount += 1;
                let quantitiveAuthorityRecord = null;
                if (subtype === "quantitive") {
                  quantitiveAuthorityRecord = buildClassicalNahuatlQuantitiveAuthorityRecord({
                    ...options,
                    subject,
                    matrixForm,
                    sourceStem: enteredStem,
                    predicatePluralization
                  });
                }
                const sourceOptions = {
                  ...options,
                  subtype,
                  subject,
                  enteredStem,
                  requireEnteredStem: true,
                  quantitiveAuthorityRecord,
                  pluralConnector: numberForm === "silent-silent" ? "silent-silent" : numberForm,
                  numberVariant: numberForm === "silent-silent" ? "silent" : "sounded",
                  clauseInitial: clausePosition === "initial",
                  adjunctorInMode,
                  doubledFirstPluralSelected,
                  specialHumanUseSelected:
                    subtype === "indefinite"
                    && options.indefiniteKind === "something"
                    && ["1sg", "2sg", "1pl", "2pl"].includes(subject)
                };
                const typedSourceOptions = { ...sourceOptions };
                typedSourceOptions.lesson16ParadigmSourceProjectionToken =
                  CLASSICAL_NAHUATL_LESSON16_PARADIGM_SOURCE_PROJECTION_TOKEN;
                [
                  "quantitiveMatrix",
                  "matrixFamily",
                  ...(subtype === "quantitive"
                    ? ["quantitiveEmbed", "embedStem"]
                    : []),
                  "matrixAllomorph",
                  "matrixForm",
                  "predicatePluralization",
                  "plainPluralVariantAuthorized",
                  "plainVariantLexicallyAuthorized"
                ].forEach(key => {
                  delete typedSourceOptions[key];
                });
                const contextSelectionRecord = buildClassicalNahuatlContextSelectionRecord(typedSourceOptions);
                const frame = buildClassicalNahuatlPronominalNncFrame({
                  ...typedSourceOptions,
                  contextSelectionRecord
                });
                if (frame.authorizationStatus !== "authorized") continue;
                coordinates.push({
                  kind: "classical-nahuatl-pronominal-nnc-pronominal-paradigm-coordinate",
                  coordinateId: [
                    subject,
                    numberForm,
                    matrixForm || "not-applicable",
                    predicatePluralization || "not-applicable",
                    clausePosition,
                    adjunctorInMode,
                    doubledFirstPluralSelected ? "doubled" : "plain"
                  ].join(":"),
                  subject,
                  numberForm,
                  matrixForm: matrixForm || "not-applicable",
                  predicatePluralization: predicatePluralization || "not-applicable",
                  clausePosition,
                  adjunctorInMode,
                  doubledFirstPluralSelected,
                  specialHumanUseSelected: sourceOptions.specialHumanUseSelected,
                  formulaRealization: frame.formulaRealization,
                  nncFrame: frame,
                  sourceFrame: frame.sourceFrame,
                  contextSelectionRecord,
                  quantitiveAuthorityRecord,
                  formulaStringAuthority: false,
                  displayTextAuthority: false
                });
                }
              }
            }
          }
        }
        }
      }
      const authorized = Boolean(coordinates.length);
      return {
        kind: "classical-nahuatl-pronominal-nnc-pronominal-paradigm-plan",
        version: 1,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized ? "" : "no-authorized-lesson16-paradigm-coordinates",
        authority: "typed-engine-pronominal-coordinate-projection",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        sourceEvidenceBoundary: "test-only-not-imported-by-production-grammar",
        sourceStem: enteredStem,
        greatestCommonDivisor: { ...CLASSICAL_NAHUATL_LESSON16_GCD },
        leastCommonMultiple: {
          axisCount: CLASSICAL_NAHUATL_LESSON16_LCM_AXES.length,
          distinctionAxes: [...CLASSICAL_NAHUATL_LESSON16_LCM_AXES]
        },
        sourceAuditPresentation: "internal-verification-only",
        candidateCount,
        omittedCandidateCount: candidateCount - coordinates.length,
        coordinateCount: coordinates.length,
        coordinates,
        firstCoordinateAuthority: false,
        formulaStringAuthority: false,
        displayTextAuthority: false
      };
    }
    function pluralizeClassicalNahuatlLesson16InternalStem(stem = "") {
      const normalizedStem = normalizeClassicalNahuatlNncStem(stem);
      if (/huā$/u.test(normalizedStem)) return `${normalizedStem}-n`;
      if (/quī$/u.test(normalizedStem)) return `${normalizedStem}-n`;
      if (/qui$/u.test(normalizedStem)) return normalizedStem.replace(/qui$/u, "quī-n");
      if (/chī$/u.test(normalizedStem)) return `${normalizedStem}-n`;
      if (/chi$/u.test(normalizedStem)) return normalizedStem.replace(/chi$/u, "chī-n");
      return "";
    }
    function resolveClassicalNahuatlLesson16PronominalNumberFrame(sourceFrame = null, options = {}) {
      const subject = sourceFrame?.subject || "";
      const plural = subject.endsWith("pl");
      const subtype = sourceFrame?.subtype || "";
      const detail = sourceFrame?.subtypeDetail || "";
      let predicateStem = sourceFrame?.sourceStem || "";
      let num1 = "";
      let num2 = "";
      let internalPluralMorph = "none";
      let numberVariant = "";
      let predicateStemAction = "identity";
      let blockReason = "";
      if (!sourceFrame || sourceFrame.authorizationStatus !== "authorized") {
        blockReason = sourceFrame?.blockReason || "authorized-pronominal-source-frame-required";
      } else if (!plural) {
        const singularVariant = normalizeClassicalNahuatlNncToken(options.numberVariant || "sounded").toLowerCase();
        if (subtype === "personal-compound" || subtype === "personal-compound-derived" || subtype === "quantitive-personal-compound" || detail === "what-entity-compound") {
          if (singularVariant === "sounded") [num1, num2] = ["tl", "0"];else if (singularVariant === "silent") [num1, num2] = ["⎕", "0"];else blockReason = "compound-personal-singular-number-variant-must-be-sounded-or-silent";
          numberVariant = singularVariant;
        } else if (detail === "which-entity") {
          if (sourceFrame.composition?.matrixNumberClass === "zero") {
            [num1, num2] = ["0", "0"];
            numberVariant = "zero-zero";
          } else {
            [num1, num2] = ["tl", "0"];
            numberVariant = "sounded";
          }
        } else if (detail === "what-person") {
          [num1, num2] = ["c", "0"];
          numberVariant = "special-ac-c-zero";
        } else {
          [num1, num2] = ["0", "0"];
          numberVariant = "zero-zero";
        }
      } else if (subtype === "personal-simple") {
        [num1, num2] = ["m", "eh"];
        numberVariant = "m-eh";
      } else if (subtype === "demonstrative") {
        [num1, num2] = ["⎕", "⎕"];
        numberVariant = "silent-silent";
      } else if (subtype === "interrogative" && detail === "what-entity") {
        const selected = normalizeClassicalNahuatlNncToken(options.pluralConnector || "m-eh").toLowerCase();
        const dyad = {
          "m-eh": ["m", "eh"],
          "t-in": ["t", "in"]
        }[selected];
        if (dyad) [num1, num2] = dyad;else blockReason = "tleh-plural-connector-must-be-m-eh-or-t-in";
        numberVariant = selected;
      } else if (subtype === "indefinite") {
        const selected = normalizeClassicalNahuatlNncToken(options.pluralConnector || "m-eh").toLowerCase();
        const dyad = {
          "m-eh": ["m", "eh"],
          "t-in": ["t", "in"]
        }[selected];
        if (dyad) [num1, num2] = dyad;else blockReason = "indefinite-plural-connector-must-be-m-eh-or-t-in";
        numberVariant = selected;
      } else if (subtype === "interrogative" && detail === "which-entity" && sourceFrame.structuralPluralType === "fused-in-to-i-plus-m-eh") {
        const selected = normalizeClassicalNahuatlNncToken(options.pluralConnector || "m-eh").toLowerCase();
        const pluralStem = predicateStem.replace(/-in$/u, "-i");
        if (pluralStem === predicateStem) {
          blockReason = "ca-tlein-plural-requires-final-in-matrix";
        } else if (selected !== "m-eh") {
          blockReason = "ca-tlein-plural-number-dyad-must-be-m-eh";
        } else {
          predicateStem = pluralStem;
          [num1, num2] = ["m", "eh"];
          predicateStemAction = "realize-final-in-as-i-before-m-eh";
        }
        numberVariant = selected;
      } else if (subtype === "quantitive") {
        const quantitiveAuthorityRecord = sourceFrame.quantitiveAuthorityRecord;
        const selected = normalizeClassicalNahuatlNncToken(options.pluralConnector || quantitiveAuthorityRecord?.allowedSubjectNumberDyads?.[0] || "").toLowerCase();
        const dyad = {
          "t-in": ["t", "in"],
          "m-eh": ["m", "eh"],
          "silent-silent": ["⎕", "⎕"],
          "⎕-⎕": ["⎕", "⎕"]
        }[selected];
        if (!isClassicalNahuatlQuantitiveAuthorityRecord(quantitiveAuthorityRecord) || quantitiveAuthorityRecord.authorizationStatus !== "authorized") {
          blockReason = quantitiveAuthorityRecord?.blockReason || "authorized-typed-quantitive-record-required-for-plural-number";
        } else if (!quantitiveAuthorityRecord.allowedSubjectNumberDyads.includes(selected === "⎕-⎕" ? "silent-silent" : selected) || !dyad) {
          blockReason = "selected-subject-number-dyad-not-authorized-by-quantitive-record";
        } else if (quantitiveAuthorityRecord.predicatePluralization === "internal-n") {
          predicateStem = quantitiveAuthorityRecord.pluralizedStem;
          if (!predicateStem || !/-n$/u.test(predicateStem)) {
            blockReason = "typed-quantitive-internal-plural-n-stem-required";
          } else {
            predicateStemAction = "realize-long-quantitive-matrix-before-internal-plural-n";
            internalPluralMorph = "n-inside-stem";
          }
        } else if (!["plain-qui-ch", "plain-variant"].includes(quantitiveAuthorityRecord.predicatePluralization)) {
          blockReason = "typed-quantitive-predicate-pluralization-not-authorized-for-plural-subject";
        }
        if (dyad) [num1, num2] = dyad;
        numberVariant = selected === "⎕-⎕" ? "silent-silent" : selected;
      } else if (sourceFrame.structuralPluralType === "internally-pluralized-stem") {
        predicateStem =
          pluralizeClassicalNahuatlLesson16InternalStem(predicateStem);
        if (!predicateStem) {
          blockReason =
            "internal-pronominal-plural-n-requires-authorized-long-matrix-shape";
        }
        const selected = normalizeClassicalNahuatlNncToken(
          options.pluralConnector || "t-in"
        ).toLowerCase();
        const dyad = {
          "t-in": ["t", "in"],
          "silent-silent": ["⎕", "⎕"],
          "⎕-⎕": ["⎕", "⎕"]
        }[selected];
        if (!dyad && !blockReason) {
          blockReason =
            "internally-pluralized-pronominal-number-dyad-must-be-t-in-or-silent-silent";
        }
        if (dyad) [num1, num2] = dyad;
        numberVariant = selected;
        internalPluralMorph = predicateStem ? "n-inside-stem" : "none";
      } else {
        blockReason = "plural-pronominal-number-formation-not-authorized-for-subtype";
      }
      const authorized = Boolean(!blockReason && predicateStem && num1 && num2);
      return {
        kind: "classical-nahuatl-pronominal-nnc-pronominal-number-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason,
        subject,
        subjectNumber: plural ? "plural" : subject === "3common" ? "common" : "singular",
        predicateStem: authorized ? predicateStem : "",
        nounClass: authorized ? sourceFrame.nounClass : "",
        nounClassAuthority: sourceFrame.nounClassAuthority || "",
        referentCategory: authorized ? sourceFrame.referentCategory : "",
        referentCategoryAuthority: sourceFrame.referentCategoryAuthority || "",
        num1: authorized ? num1 : "",
        num2: authorized ? num2 : "",
        numberVariant,
        predicateStemAction,
        internalPluralMorph,
        internalPluralBelongsTo: "predicate-stem-derivation",
        subjectNumberBelongsTo: "subject-personal-pronoun",
        internalPluralIsSubjectNumberConnector: false,
        legalWitnessTagIds: subtype === "interrogative" ? ["cn-l16-161-pronominal-family", "cn-l16-164-identificational-interrogative", "cn-l16-1643-ca-tlein-plural"] : ["cn-l16-161-pronominal-family", "cn-l16-163-personal-pronominal", "cn-l16-169-qui-chi-family"]
      };
    }
    function buildClassicalNahuatlPronominalNncFrame(options = {}) {
      const sourceFrame = buildClassicalNahuatlPronominalSourceFrame(options);
      const contextSelectionRecord = sourceFrame.contextSelectionRecord;
      const numberFrame = resolveClassicalNahuatlLesson16PronominalNumberFrame(sourceFrame, options);
      const personFrame = buildClassicalNahuatlNncSubjectPersonFrame({
        subject: sourceFrame.subject || options.subject || "3sg",
        followingMaterial: numberFrame.predicateStem || sourceFrame.sourceStem
      });
      if (contextSelectionRecord?.doubledFirstPlural?.selected === true) {
        if (contextSelectionRecord.doubledFirstPlural.available === true && personFrame.authorizationStatus === "authorized") {
          personFrame.pers1 = "ti-t";
          personFrame.doubledFirstPluralPerson = true;
          personFrame.contextualMeaning = contextSelectionRecord.doubledFirstPlural.contextualMeaning;
        } else {
          personFrame.authorizationStatus = "blocked";
          personFrame.blockReason = "doubled-first-plural-person-is-limited-to-first-plural-personal-compound-nnc";
        }
      }
      const forbiddenTense = normalizeClassicalNahuatlNncToken(options.tense || options.tns);
      const forbiddenValence = normalizeClassicalNahuatlNncToken(options.valence || options.va);
      const stateFrame = {
        kind: "classical-nahuatl-pronominal-nnc-absolutive-state-frame",
        state: "absolutive",
        arity: "vacant",
        slots: [],
        authorizationStatus: !forbiddenTense && !forbiddenValence ? "authorized" : "blocked",
        blockReason: forbiddenTense ? "nnc-has-no-tense-slot" : forbiddenValence ? "nnc-state-replaces-valence" : ""
      };
      const nuclearClauseSourceStem =
        sourceFrame.subtypeDetail === "what-person"
          ? "ā"
          : numberFrame.predicateStem || sourceFrame.sourceStem;
      const nuclearClauseResult =
        sourceFrame.authorizationStatus === "authorized"
          ? buildClassicalNahuatlNncNuclearClauseResult(
            nuclearClauseSourceStem,
            "vacant",
          )
          : null;
      const nuclearClauseAuthorized = Boolean(nuclearClauseResult);
      const sourceAuthorized = Boolean(sourceFrame.authorizationStatus === "authorized" && numberFrame.authorizationStatus === "authorized" && personFrame.authorizationStatus === "authorized" && stateFrame.authorizationStatus === "authorized" && nuclearClauseAuthorized);
      const nncSlotFrame = buildClassicalNahuatlNncSlotFrame({
        sourceFrameKind: "classical-nahuatl-pronominal-nnc-pronominal-nnc-frame",
        sourceAuthorizationStatus: sourceAuthorized ? "authorized" : "blocked",
        stem: numberFrame.predicateStem,
        stateFrame,
        personFrame,
        numberFrame,
        formulaArtifact: options.formulaArtifact || options.formula || "",
        appliedOperationIds: ["nnc-clause-shell", "nnc-pronominal-family"],
        resultOperationId: "nnc-pronominal-family",
        requestedOutputKind: "selected-pronominal-nnc-formula",
        nncFamily: "pronominal"
      });
      nncSlotFrame.pronominalSemanticKind = sourceFrame.semanticKind;
      nncSlotFrame.pronominalSubtype = sourceFrame.subtype;
      nncSlotFrame.pronominalSubtypeDetail = sourceFrame.subtypeDetail;
      nncSlotFrame.internalPluralMorph = numberFrame.internalPluralMorph;
      const clauseInitial = options.clauseInitial !== false;
      const polarity = normalizeClassicalNahuatlNncToken(options.polarity || "positive").toLowerCase();
      const interrogativeReadingActive = sourceFrame.inherentInterrogative && clauseInitial && polarity === "positive";
      const discourseFrame = {
        kind: "classical-nahuatl-pronominal-nnc-pronominal-discourse-frame",
        clauseInitial,
        polarity,
        inherentInterrogative: sourceFrame.inherentInterrogative,
        interrogativeReadingActive,
        noninterrogativeReason: sourceFrame.inherentInterrogative && !interrogativeReadingActive ? polarity === "negative" ? "negative-pronominal-nnc-loses-interrogative-quality" : "noninitial-pronominal-nnc-loses-interrogative-quality" : "",
        adjunctorInFrame: contextSelectionRecord?.adjunctorInFrame || null,
        dependentClauseIntroducedByIn: contextSelectionRecord?.dependentClauseIntroducedByIn?.selected === true,
        adjunctInPresent: contextSelectionRecord?.dependentClauseIntroducedByIn?.selected === true,
        adjunctWritingPolicy: contextSelectionRecord?.dependentClauseIntroducedByIn?.writingPolicy || "no-dependent-clause-writing-decision",
        EnglishPronounTranslationIsAuthority: false
      };
      const operationEvaluationFrame = buildClassicalNahuatlNncOperationEvaluationFrame({ nncSlotFrame });
      const authorized = operationEvaluationFrame.authorizationStatus === "authorized";
      const formulaRealization = authorized ? renderClassicalNahuatlNncSlotFrameFormula(nncSlotFrame) : "";
      const blockReason = authorized ? "" : sourceFrame.authorizationStatus !== "authorized" ? sourceFrame.blockReason : numberFrame.authorizationStatus !== "authorized" ? numberFrame.blockReason : personFrame.authorizationStatus !== "authorized" ? personFrame.blockReason : stateFrame.authorizationStatus !== "authorized" ? stateFrame.blockReason : !nuclearClauseAuthorized ? "canonical-vacant-state-nnc-structure-not-authorized" : operationEvaluationFrame.blockReason;
      const lesson11CooperationFrame = Object.freeze({
        kind: "classical-nahuatl-pronominal-nnc-irregular-vnc-cooperation-frame",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: authorized && ["personal-simple", "personal-compound"].includes(sourceFrame.subtype) ? "authorized" : "not-authorized",
        cooperatingNncFrameKind: "classical-nahuatl-pronominal-nnc-pronominal-nnc-frame",
        cooperatingSubject: sourceFrame.subject,
        requiredLesson11Identity: "defective-nnc-cooperation",
        booleanClaimAuthority: false,
        selectedTypedNncRequired: true,
        legalWitnessTagIds: Object.freeze(["cn-l11-1147-zero-ia-defective", "cn-l16-163-personal-pronominal"])
      });
      if (lesson11CooperationFrame.authorizationStatus === "authorized") {
        issuedCooperationFrames.set(
          lesson11CooperationFrame,
          Object.freeze({
            cooperatingNncFrameKind: lesson11CooperationFrame.cooperatingNncFrameKind,
            cooperatingSubject: lesson11CooperationFrame.cooperatingSubject,
            requiredLesson11Identity: lesson11CooperationFrame.requiredLesson11Identity,
            selectedTypedNncRequired: lesson11CooperationFrame.selectedTypedNncRequired,
            booleanClaimAuthority: lesson11CooperationFrame.booleanClaimAuthority
          })
        );
      }
      const proofFrame = {
        kind: "classical-nahuatl-pronominal-nnc-logic-proof-frame",
        lesson: "Andrews Lesson 16",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        proofStatus: authorized ? "proven" : "blocked",
        authorizationStatus: authorized ? "authorized" : "blocked",
        premises: [{
          layer: "lesson16-pronominal-source",
          passed: sourceFrame.authorizationStatus === "authorized",
          sourceFrame
        }, {
          layer: "lesson16-context-selection",
          passed: contextSelectionRecord?.authorizationStatus === "authorized",
          contextSelectionRecord
        }, {
          layer: "lesson16-internal-stem-and-subject-number",
          passed: numberFrame.authorizationStatus === "authorized",
          numberFrame
        }, {
          layer: "shared-nnc-subject-and-state",
          passed: sourceAuthorized,
          personFrame,
          stateFrame
        }, {
          layer: "shared-nnc-operation-plan",
          passed: authorized,
          operationEvaluationFrame
        }],
        conclusion: {
          authorized,
          authorizationStatus: authorized ? "authorized" : "blocked",
          blockReason,
          formulaRealization,
          resultOperationId: operationEvaluationFrame.resultOperationId,
          typedSlotAuthority: true,
          formulaStringAuthority: false
        },
        legalWitnessTagIds: ["cn-l16-pronominal-nncs", ...CLASSICAL_NAHUATL_LESSON16_RULES.map(rule => rule.id)]
      };
      const lesson16Frame = {
        kind: "classical-nahuatl-pronominal-nnc-pronominal-nnc-frame",
        lesson: "Andrews Lesson 16",
        sourceAuthority: "Andrews transcription",
        sourceDocument: CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason,
        sourceFrame,
        contextSelectionRecord,
        numberFrame,
        personFrame,
        stateFrame,
        discourseFrame,
        nuclearClauseResult,
        nncSlotFrame,
        operationEvaluationFrame,
        lesson11CooperationFrame,
        proofFrame,
        selectedOutputLogicFrame: {
          kind: "classical-nahuatl-nnc-selected-output-logic-frame",
          authorizationStatus: authorized ? "authorized" : "blocked",
          selectedFormula: formulaRealization,
          selectedNncSlotFrame: authorized ? nncSlotFrame : null,
          selectedOutputAuthority: "typed-pronominal-nnc-slots-after-pronominal-family-operation",
          formulaStringAuthority: false,
          EnglishTranslationAuthority: false
        },
        formulaRealization,
        ruleRefs: getClassicalNahuatlPronominalNncRules(),
        grammarGenerationAllowed: authorized,
        formulaOutputAllowed: authorized,
        sentenceSurfaceGenerationAllowed: false,
      };
      lesson16Frame.lesson16GrammarContractFrame =
        buildClassicalNahuatlGrammarContractFrame(lesson16Frame);
      lesson16Frame.proofFrame.conclusion.lesson16GrammarContractFrame =
        lesson16Frame.lesson16GrammarContractFrame;
      lesson16Frame.selectedOutputLogicFrame.lesson16GrammarContractFrame =
        lesson16Frame.lesson16GrammarContractFrame;
      return lesson16Frame;
    }
    function isClassicalNahuatlCooperationFrame(
      frame = null,
      { subject = "" } = {}
    ) {
      const receipt = frame && typeof frame === "object"
        ? issuedCooperationFrames.get(frame)
        : null;
      const expectedSubject = subject
        ? normalizeClassicalNahuatlNncSubject(subject)
        : "";
      return Boolean(
        receipt
        && frame.kind === "classical-nahuatl-pronominal-nnc-irregular-vnc-cooperation-frame"
        && frame.sourceAuthority === "Andrews transcription"
        && frame.sourceDocument === CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT
        && frame.authorizationStatus === "authorized"
        && frame.cooperatingNncFrameKind === receipt.cooperatingNncFrameKind
        && frame.cooperatingSubject === receipt.cooperatingSubject
        && frame.requiredLesson11Identity === receipt.requiredLesson11Identity
        && frame.selectedTypedNncRequired === receipt.selectedTypedNncRequired
        && frame.booleanClaimAuthority === receipt.booleanClaimAuthority
        && receipt.cooperatingNncFrameKind
          === "classical-nahuatl-pronominal-nnc-pronominal-nnc-frame"
        && receipt.requiredLesson11Identity === "defective-nnc-cooperation"
        && receipt.selectedTypedNncRequired === true
        && receipt.booleanClaimAuthority === false
        && (!expectedSubject || receipt.cooperatingSubject === expectedSubject)
      );
    }
    function installClassicalNahuatlNncLayerEvaluatorClassicGlobals() {
      const globalTarget = typeof targetObject !== "undefined" && targetObject || (typeof globalThis !== "undefined" ? globalThis : null);
      if (!globalTarget || typeof globalTarget !== "object") {
        return null;
      }
      Object.assign(globalTarget, {
        getClassicalNahuatlAbsolutiveNncRules,
        getClassicalNahuatlPossessiveNncRules,
        getClassicalNahuatlNounstemRules,
        getClassicalNahuatlOrdinaryNncRules,
        getClassicalNahuatlPronominalNncRules,
        getClassicalNahuatlNncOperationContracts,
        getClassicalNahuatlClassFormGuidance,
        deriveClassicalNahuatlStem,
        buildClassicalNahuatlSupportiveIRepairFrame,
        validateClassicalNahuatlSubclassSourceShape,
        buildClassicalNahuatlNounstemSourceFrame,
        buildClassicalNahuatlDerivedStemFrame,
        buildClassicalNahuatlConstituentAnalysisFrame,
        resolveClassicalNahuatlLesson14ConnectorSelection,
        normalizeClassicalNahuatlNncSubject,
        normalizeClassicalNahuatlNounClass,
        buildClassicalNahuatlNncSubjectPersonFrame,
        resolveClassicalNahuatlLesson12AbsolutiveNumberDyad,
        buildClassicalNahuatlAbsolutiveParadigmContractFrame,
        buildClassicalNahuatlPossessiveParadigmContractFrame,
        buildClassicalNahuatlPossessiveParadigmPlan,
        buildClassicalNahuatlNounstemParadigmContractFrame,
        normalizeClassicalNahuatlNncPossessor,
        resolveClassicalNahuatlThirdPluralPossessorSt2,
        buildClassicalNahuatlPossessiveStateFrame,
        resolveClassicalNahuatlLesson13PossessiveNumberDyad,
        buildClassicalNahuatlNncSlotFrame,
        isClassicalNahuatlNncSlotFrame,
        renderClassicalNahuatlNncSlotFrameFormula,
        buildClassicalNahuatlNncSentenceSurfaceFrame,
        isClassicalNahuatlIssuedNncSentenceSurfaceFrame,
        buildClassicalNahuatlNncDiagrammaticFrame,
        isClassicalNahuatlNncDiagrammaticFrame,
        buildClassicalNahuatlNncOperationEvaluationFrame,
        getClassicalNahuatlPredicateOptionContract,
        buildClassicalNahuatlStemOperationRecord,
        isClassicalNahuatlStemOperationRecord,
        buildClassicalNahuatlPossessorReduplicationSelection,
        isClassicalNahuatlPossessorReduplicationSelection,
        buildClassicalNahuatlNncSourceAuthorityFrame,
        isClassicalNahuatlNncSourceAuthorityFrame,
        buildClassicalNahuatlAbsolutiveNncFrame,
        buildClassicalNahuatlPossessiveNncFrame,
        buildClassicalNahuatlClassGovernedNncFrame,
        buildClassicalNahuatlSentenceHandoffFrame,
        buildClassicalNahuatlAnalogicalRestrictedUseContractFrame,
        buildClassicalNahuatlReclassificationContractFrame,
        buildClassicalNahuatlOrdinaryNncContractFrame,
        buildClassicalNahuatlGrammarSurfaceContractFrame,
        buildClassicalNahuatlHigherNncFrame,
        buildClassicalNahuatlQuantitiveSourceAnalysis,
        buildClassicalNahuatlQuantitiveAuthorityRecord,
        isClassicalNahuatlQuantitiveAuthorityRecord,
        buildClassicalNahuatlAdjunctorInFrame,
        buildClassicalNahuatlContextSelectionRecord,
        isClassicalNahuatlContextSelectionRecord,
        buildClassicalNahuatlPronominalSourceFrame,
        buildClassicalNahuatlGrammarContractFrame,
        buildClassicalNahuatlPronominalParadigmPlan,
        resolveClassicalNahuatlLesson16PronominalNumberFrame,
        buildClassicalNahuatlPronominalNncFrame,
        isClassicalNahuatlCooperationFrame
      });
      return globalTarget;
    }
    if (typeof targetObject.module !== "undefined" && targetObject.module.exports) {
      targetObject.module.exports = {
        getClassicalNahuatlAbsolutiveNncRules,
        getClassicalNahuatlPossessiveNncRules,
        getClassicalNahuatlNounstemRules,
        getClassicalNahuatlOrdinaryNncRules,
        getClassicalNahuatlPronominalNncRules,
        getClassicalNahuatlNncOperationContracts,
        getClassicalNahuatlClassFormGuidance,
        deriveClassicalNahuatlStem,
        buildClassicalNahuatlSupportiveIRepairFrame,
        validateClassicalNahuatlSubclassSourceShape,
        buildClassicalNahuatlNounstemSourceFrame,
        buildClassicalNahuatlDerivedStemFrame,
        buildClassicalNahuatlConstituentAnalysisFrame,
        resolveClassicalNahuatlLesson14ConnectorSelection,
        normalizeClassicalNahuatlNncSubject,
        normalizeClassicalNahuatlNounClass,
        buildClassicalNahuatlNncSubjectPersonFrame,
        resolveClassicalNahuatlLesson12AbsolutiveNumberDyad,
        buildClassicalNahuatlAbsolutiveParadigmContractFrame,
        buildClassicalNahuatlPossessiveParadigmContractFrame,
        buildClassicalNahuatlPossessiveParadigmPlan,
        normalizeClassicalNahuatlNncPossessor,
        resolveClassicalNahuatlThirdPluralPossessorSt2,
        buildClassicalNahuatlPossessiveStateFrame,
        resolveClassicalNahuatlLesson13PossessiveNumberDyad,
        buildClassicalNahuatlNncSlotFrame,
        isClassicalNahuatlNncSlotFrame,
        renderClassicalNahuatlNncSlotFrameFormula,
        buildClassicalNahuatlNncSentenceSurfaceFrame,
        isClassicalNahuatlIssuedNncSentenceSurfaceFrame,
        buildClassicalNahuatlNncDiagrammaticFrame,
        isClassicalNahuatlNncDiagrammaticFrame,
        buildClassicalNahuatlNncOperationEvaluationFrame,
        getClassicalNahuatlPredicateOptionContract,
        buildClassicalNahuatlStemOperationRecord,
        isClassicalNahuatlStemOperationRecord,
        buildClassicalNahuatlPossessorReduplicationSelection,
        isClassicalNahuatlPossessorReduplicationSelection,
        buildClassicalNahuatlNncSourceAuthorityFrame,
        isClassicalNahuatlNncSourceAuthorityFrame,
        buildClassicalNahuatlAbsolutiveNncFrame,
        buildClassicalNahuatlPossessiveNncFrame,
        buildClassicalNahuatlClassGovernedNncFrame,
        buildClassicalNahuatlSentenceHandoffFrame,
        buildClassicalNahuatlAnalogicalRestrictedUseContractFrame,
        buildClassicalNahuatlReclassificationContractFrame,
        buildClassicalNahuatlOrdinaryNncContractFrame,
        buildClassicalNahuatlGrammarSurfaceContractFrame,
        buildClassicalNahuatlHigherNncFrame,
        buildClassicalNahuatlQuantitiveSourceAnalysis,
        buildClassicalNahuatlQuantitiveAuthorityRecord,
        isClassicalNahuatlQuantitiveAuthorityRecord,
        buildClassicalNahuatlAdjunctorInFrame,
        buildClassicalNahuatlContextSelectionRecord,
        isClassicalNahuatlContextSelectionRecord,
        buildClassicalNahuatlPronominalSourceFrame,
        buildClassicalNahuatlGrammarContractFrame,
        buildClassicalNahuatlPronominalParadigmPlan,
        resolveClassicalNahuatlLesson16PronominalNumberFrame,
        buildClassicalNahuatlPronominalNncFrame,
        isClassicalNahuatlCooperationFrame,
        installClassicalNahuatlNncLayerEvaluatorClassicGlobals
      };
    }
    const api = {};
    Object.defineProperty(api, "CLASSICAL_NAHUATL_NNC_LAYER_VERSION", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_NNC_LAYER_VERSION; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_NNC_SOURCE_DOCUMENT; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_NNC_ZERO", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_NNC_ZERO; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON12_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON12_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON13_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON13_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON14_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON14_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON15_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON15_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_LESSON16_RULES", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_LESSON16_RULES; },
    });
    Object.defineProperty(api, "CLASSICAL_NAHUATL_NNC_OPERATION_CONTRACTS", {
        configurable: true,
        enumerable: true,
        get() { return CLASSICAL_NAHUATL_NNC_OPERATION_CONTRACTS; },
    });
    api.getClassicalNahuatlNncRuntimeTarget = getClassicalNahuatlNncRuntimeTarget;
    api.cloneClassicalNahuatlNncValue = cloneClassicalNahuatlNncValue;
    api.normalizeClassicalNahuatlNncToken = normalizeClassicalNahuatlNncToken;
    api.normalizeClassicalNahuatlNncStem = normalizeClassicalNahuatlNncStem;
    api.normalizeClassicalNahuatlNncSubject = normalizeClassicalNahuatlNncSubject;
    api.normalizeClassicalNahuatlNounClass = normalizeClassicalNahuatlNounClass;
    api.getClassicalNahuatlNncFirstSound = getClassicalNahuatlNncFirstSound;
    api.getClassicalNahuatlNncLastSound = getClassicalNahuatlNncLastSound;
    api.isClassicalNahuatlNncVowelSound = isClassicalNahuatlNncVowelSound;
    api.resolveClassicalNahuatlThirdPluralPossessorSt2 = resolveClassicalNahuatlThirdPluralPossessorSt2;
    api.getClassicalNahuatlAbsolutiveNncRules = getClassicalNahuatlAbsolutiveNncRules;
    api.getClassicalNahuatlPossessiveNncRules = getClassicalNahuatlPossessiveNncRules;
    api.getClassicalNahuatlNounstemRules = getClassicalNahuatlNounstemRules;
    api.getClassicalNahuatlOrdinaryNncRules = getClassicalNahuatlOrdinaryNncRules;
    api.getClassicalNahuatlPronominalNncRules = getClassicalNahuatlPronominalNncRules;
    api.getClassicalNahuatlNncOperationContracts = getClassicalNahuatlNncOperationContracts;
    api.normalizeClassicalNahuatlUseShape = normalizeClassicalNahuatlUseShape;
    api.normalizeClassicalNahuatlStemFormation = normalizeClassicalNahuatlStemFormation;
    api.getClassicalNahuatlInitialVowelFrame = getClassicalNahuatlInitialVowelFrame;
    api.getClassicalNahuatlLongVowel = getClassicalNahuatlLongVowel;
    api.getClassicalNahuatlShortVowel = getClassicalNahuatlShortVowel;
    api.deriveClassicalNahuatlStem = deriveClassicalNahuatlStem;
    api.getClassicalNahuatlClassFormGuidance = getClassicalNahuatlClassFormGuidance;
    api.buildClassicalNahuatlSupportiveIRepairFrame = buildClassicalNahuatlSupportiveIRepairFrame;
    api.validateClassicalNahuatlSubclassSourceShape = validateClassicalNahuatlSubclassSourceShape;
    api.buildClassicalNahuatlGlottalizedGeneralUseFrame = buildClassicalNahuatlGlottalizedGeneralUseFrame;
    api.buildClassicalNahuatlLexicalSelectionRecord = buildClassicalNahuatlLexicalSelectionRecord;
    api.isClassicalNahuatlLexicalSelectionRecord = isClassicalNahuatlLexicalSelectionRecord;
    api.buildClassicalNahuatlNounstemSourceFrame = buildClassicalNahuatlNounstemSourceFrame;
    api.buildClassicalNahuatlDerivedStemFrame = buildClassicalNahuatlDerivedStemFrame;
    api.buildClassicalNahuatlConstituentAnalysisFrame = buildClassicalNahuatlConstituentAnalysisFrame;
    api.buildClassicalNahuatlSurfaceConstituentAnalyses = buildClassicalNahuatlSurfaceConstituentAnalyses;
    api.applyClassicalNahuatlLesson14SelectedConstituentAnalysis = applyClassicalNahuatlLesson14SelectedConstituentAnalysis;
    api.buildClassicalNahuatlNncSubjectPersonFrame = buildClassicalNahuatlNncSubjectPersonFrame;
    api.resolveClassicalNahuatlLesson12AbsolutiveNumberDyad = resolveClassicalNahuatlLesson12AbsolutiveNumberDyad;
    api.buildClassicalNahuatlAbsolutiveParadigmContractFrame = buildClassicalNahuatlAbsolutiveParadigmContractFrame;
    api.buildClassicalNahuatlPossessiveParadigmContractFrame = buildClassicalNahuatlPossessiveParadigmContractFrame;
    api.buildClassicalNahuatlPossessiveParadigmPlan = buildClassicalNahuatlPossessiveParadigmPlan;
    api.buildClassicalNahuatlNounstemParadigmContractFrame = buildClassicalNahuatlNounstemParadigmContractFrame;
    api.normalizeClassicalNahuatlNncPossessor = normalizeClassicalNahuatlNncPossessor;
    api.buildClassicalNahuatlPossessiveStateFrame = buildClassicalNahuatlPossessiveStateFrame;
    api.resolveClassicalNahuatlLesson13PossessiveNumberDyad = resolveClassicalNahuatlLesson13PossessiveNumberDyad;
    api.buildClassicalNahuatlNncSlotFrame = buildClassicalNahuatlNncSlotFrame;
    api.isClassicalNahuatlNncSlotFrame = isClassicalNahuatlNncSlotFrame;
    api.renderClassicalNahuatlNncSlotFrameFormula = renderClassicalNahuatlNncSlotFrameFormula;
    api.realizeClassicalNahuatlNncSurfaceCarrier = realizeClassicalNahuatlNncSurfaceCarrier;
    api.capitalizeClassicalNahuatlNncSentenceInitial = capitalizeClassicalNahuatlNncSentenceInitial;
    api.buildClassicalNahuatlNncSentenceSurfaceFrame = buildClassicalNahuatlNncSentenceSurfaceFrame;
    api.isClassicalNahuatlIssuedNncSentenceSurfaceFrame = isClassicalNahuatlIssuedNncSentenceSurfaceFrame;
    api.buildClassicalNahuatlExotlInterpretationSource = buildClassicalNahuatlExotlInterpretationSource;
    api.isClassicalNahuatlExotlInterpretationSource = isClassicalNahuatlExotlInterpretationSource;
    api.evaluateClassicalNahuatlExotlInterpretation = evaluateClassicalNahuatlExotlInterpretation;
    api.isClassicalNahuatlExotlInterpretationResult = isClassicalNahuatlExotlInterpretationResult;
    api.buildClassicalNahuatlTlehAdmonitoryPairSource = buildClassicalNahuatlTlehAdmonitoryPairSource;
    api.isClassicalNahuatlTlehAdmonitoryPairSource = isClassicalNahuatlTlehAdmonitoryPairSource;
    api.evaluateClassicalNahuatlTlehAdmonitoryPair = evaluateClassicalNahuatlTlehAdmonitoryPair;
    api.isClassicalNahuatlTlehAdmonitoryPairResult = isClassicalNahuatlTlehAdmonitoryPairResult;
    api.buildClassicalNahuatlTlehClosingVocativeSource = buildClassicalNahuatlTlehClosingVocativeSource;
    api.isClassicalNahuatlTlehClosingVocativeSource = isClassicalNahuatlTlehClosingVocativeSource;
    api.evaluateClassicalNahuatlTlehClosingVocative = evaluateClassicalNahuatlTlehClosingVocative;
    api.isClassicalNahuatlTlehClosingVocativeResult = isClassicalNahuatlTlehClosingVocativeResult;
    api.buildClassicalNahuatlKingPraiseRoleContrastSource = buildClassicalNahuatlKingPraiseRoleContrastSource;
    api.isClassicalNahuatlKingPraiseRoleContrastSource = isClassicalNahuatlKingPraiseRoleContrastSource;
    api.evaluateClassicalNahuatlKingPraiseRoleContrast = evaluateClassicalNahuatlKingPraiseRoleContrast;
    api.isClassicalNahuatlKingPraiseRoleContrastResult = isClassicalNahuatlKingPraiseRoleContrastResult;
    api.getClassicalNahuatlNncGeneralFormulaProjection = getClassicalNahuatlNncGeneralFormulaProjection;
    api.buildClassicalNahuatlNncDiagrammaticFrame = buildClassicalNahuatlNncDiagrammaticFrame;
    api.isClassicalNahuatlNncDiagrammaticFrame = isClassicalNahuatlNncDiagrammaticFrame;
    api.buildClassicalNahuatlNncOperationEvaluationFrame = buildClassicalNahuatlNncOperationEvaluationFrame;
    api.getClassicalNahuatlPredicateOptionContract = getClassicalNahuatlPredicateOptionContract;
    api.buildClassicalNahuatlStemOperationRecord = buildClassicalNahuatlStemOperationRecord;
    api.isClassicalNahuatlStemOperationRecord = isClassicalNahuatlStemOperationRecord;
    api.buildClassicalNahuatlPossessorReduplicationSelection = buildClassicalNahuatlPossessorReduplicationSelection;
    api.isClassicalNahuatlPossessorReduplicationSelection = isClassicalNahuatlPossessorReduplicationSelection;
    api.buildClassicalNahuatlNncSourceAuthorityFrame = buildClassicalNahuatlNncSourceAuthorityFrame;
    api.isClassicalNahuatlNncSourceAuthorityFrame = isClassicalNahuatlNncSourceAuthorityFrame;
    api.buildClassicalNahuatlAbsolutiveNncFrame = buildClassicalNahuatlAbsolutiveNncFrame;
    api.buildClassicalNahuatlPossessiveNncFrame = buildClassicalNahuatlPossessiveNncFrame;
    api.normalizeClassicalNahuatlSubclass = normalizeClassicalNahuatlSubclass;
    api.resolveClassicalNahuatlLesson14ConnectorSelection = resolveClassicalNahuatlLesson14ConnectorSelection;
    api.buildClassicalNahuatlOrthographicBoundaryFrame = buildClassicalNahuatlOrthographicBoundaryFrame;
    api.buildClassicalNahuatlClassGovernedNncFrame = buildClassicalNahuatlClassGovernedNncFrame;
    api.buildClassicalNahuatlSentenceHandoffFrame = buildClassicalNahuatlSentenceHandoffFrame;
    api.buildClassicalNahuatlAnalogicalRestrictedUseContractFrame = buildClassicalNahuatlAnalogicalRestrictedUseContractFrame;
    api.buildClassicalNahuatlReclassificationContractFrame = buildClassicalNahuatlReclassificationContractFrame;
    api.buildClassicalNahuatlOrdinaryNncContractFrame = buildClassicalNahuatlOrdinaryNncContractFrame;
    api.buildClassicalNahuatlGrammarSurfaceContractFrame = buildClassicalNahuatlGrammarSurfaceContractFrame;
    api.buildClassicalNahuatlHigherNncFrame = buildClassicalNahuatlHigherNncFrame;
    api.normalizeClassicalNahuatlSubtype = normalizeClassicalNahuatlSubtype;
    api.normalizeClassicalNahuatlQuantitiveMatrixFamily = normalizeClassicalNahuatlQuantitiveMatrixFamily;
    api.buildClassicalNahuatlQuantitiveSourceAnalysis = buildClassicalNahuatlQuantitiveSourceAnalysis;
    api.buildClassicalNahuatlQuantitiveAuthorityRecord = buildClassicalNahuatlQuantitiveAuthorityRecord;
    api.isClassicalNahuatlQuantitiveAuthorityRecord = isClassicalNahuatlQuantitiveAuthorityRecord;
    api.hasLooseClassicalNahuatlLesson16QuantitiveClaim = hasLooseClassicalNahuatlLesson16QuantitiveClaim;
    api.resolveClassicalNahuatlLesson16ContextIdentity = resolveClassicalNahuatlLesson16ContextIdentity;
    api.buildClassicalNahuatlAdjunctorInFrame = buildClassicalNahuatlAdjunctorInFrame;
    api.buildClassicalNahuatlContextSelectionRecord = buildClassicalNahuatlContextSelectionRecord;
    api.isClassicalNahuatlContextSelectionRecord = isClassicalNahuatlContextSelectionRecord;
    api.hasLooseClassicalNahuatlLesson16ContextClaim = hasLooseClassicalNahuatlLesson16ContextClaim;
    api.resolveClassicalNahuatlLesson16PronominalSourceCategories = resolveClassicalNahuatlLesson16PronominalSourceCategories;
    api.buildClassicalNahuatlPronominalSourceFrame = buildClassicalNahuatlPronominalSourceFrame;
    api.buildClassicalNahuatlGrammarContractFrame = buildClassicalNahuatlGrammarContractFrame;
    api.buildClassicalNahuatlPronominalParadigmPlan = buildClassicalNahuatlPronominalParadigmPlan;
    api.pluralizeClassicalNahuatlLesson16InternalStem = pluralizeClassicalNahuatlLesson16InternalStem;
    api.resolveClassicalNahuatlLesson16PronominalNumberFrame = resolveClassicalNahuatlLesson16PronominalNumberFrame;
    api.buildClassicalNahuatlPronominalNncFrame = buildClassicalNahuatlPronominalNncFrame;
    api.isClassicalNahuatlCooperationFrame = isClassicalNahuatlCooperationFrame;
    api.installClassicalNahuatlNncLayerEvaluatorClassicGlobals = installClassicalNahuatlNncLayerEvaluatorClassicGlobals;
    return api;
}

export function installClassicalNahuatlNncLayerEvaluatorGlobals(targetObject = globalThis) {
    const api = createClassicalNahuatlNncLayerEvaluatorApi(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
