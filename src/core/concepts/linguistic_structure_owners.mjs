// Independent read-only owners for comparative word rank and general structure.
// This catalog shares mechanics only: each definition creates a distinct Source,
// Result, operation contract, identity store, route, and evidence boundary.

import { createGrammarOperationContractOwner } from "../grammar/operation_owner.mjs";
import { registerCanonicalOwnerSpecIdentity } from "../grammar/canonical_identity_registry.mjs";

const VERSION = 1;
const freeze = Object.freeze;
const NON_AUTHORITY = freeze({
  lessonMetadataAuthority: false,
  storedExampleAuthority: false,
  storedAnswerAuthority: false,
  labelAuthority: false,
  formulaStringAuthority: false,
  surfaceStringAuthority: false,
  alternateLanguageRuntimeInstalled: false,
  generationAllowed: false,
});

function definition(classification, facts, relation, checkpoint) {
  return freeze({
    classification,
    facts: freeze(facts),
    relation,
    checkpoint,
  });
}

const OWNER_SPECS = freeze({
  translationAuthorityBoundary: freeze({
    ownerId: "translation-authority-boundary",
    operationId: "classical.authority.source-language.firewall.enforce",
    prefix: "TranslationAuthorityBoundary",
    sourceKind: "translation-authority-boundary-source",
    resultKind: "translation-authority-boundary-result",
    inputContract: "complete-typed-translation-authority-boundary-source",
    analysisDomain: "translation-authority-boundary",
    successStepId: "translation-authority-boundary-enforced",
    rejectionStepId: "translation-authority-boundary-rejected",
    restrictions: freeze([
      "translation-gloss-and-reader-interpretation-cannot-authorize-nahuatl-grammar",
      "translation-cannot-prove-source-analysis-or-canonical-result",
      "published-status-and-reader-confidence-do-not-transfer-grammar-authority",
      "the-source-language-owner-remains-required-for-every-grammar-decision",
      "boundary-analysis-does-not-generate-a-formula-translation-or-surface",
    ]),
    analyses: freeze({
      "translation-mirage-boundary": definition(
        "translation-is-non-authorizing-interpretive-provenance",
        [
          "reading-a-translation-can-create-an-illusion-of-direct-contact-with-the-source",
          "translation-mirage-can-be-more-misleading-than-an-optical-mirage",
          "a-reader-without-the-source-language-cannot-independently-detect-a-gross-mistranslation",
          "a-reader-without-nahuatl-cannot-independently-detect-the-criticized-cantares-errors",
          "bierhorst-repeated-swans-and-red-swans-are-checked-as-forced-unjustified-renderings",
          "forced-source-misreadings-can-produce-unjustified-translations",
          "translator-tact-does-not-remove-the-translation-authority-boundary",
          "translation-presents-interpretive-choices-at-every-step",
          "a-translation-reader-cannot-independently-verify-every-interpretive-choice",
          "a-translator-translates-an-interpretation-not-the-source-text-directly",
          "interpretation-is-conditioned-by-the-interpreters-historical-time",
          "interpretation-is-conditioned-by-the-interpreters-society-and-culture",
          "interpretation-is-conditioned-by-the-interpreters-personality",
          "interpretation-is-conditioned-by-the-structure-of-the-interpreters-language",
          "interpretation-is-conditioned-by-the-interpreters-mastery-of-that-language",
          "interpretation-is-conditioned-by-the-interpreters-source-language-knowledge",
          "translation-converts-alien-structure-into-familiar-structure",
          "translation-reinterprets-foreign-phonology-grammar-and-semantics-through-familiar-systems",
          "languages-are-mutually-translatable-only-at-some-level",
          "an-utterance-can-have-an-analogue-without-having-identical-language-specific-structure",
          "target-language-perspective-biases-the-selected-analogue",
          "translation-necessarily-loses-some-native-source-meaning-quality",
        ],
        "translation-may-carry-interpretive-provenance-but-cannot-select-or-prove-nahuatl-grammar",
        "translation-mirage-authority-boundary-checkpoint",
      ),
      "source-meaning-loss-boundary": definition(
        "source-language-meaning-exceeds-target-language-analogue",
        [
          "english-widower-can-be-paraphrased-as-entering-a-male-counterpart-condition",
          "english-widower-carries-a-cultural-expectation-that-husbands-usually-die-first",
          "english-widower-and-onicihuamic-share-only-the-lowest-common-event-denominator",
          "translation-discards-language-specific-culturally-controlled-experience",
          "translation-replaces-source-nuances-with-target-language-nuances",
          "translation-replaces-source-connotations-with-target-language-connotations",
          "translation-replaces-source-implications-with-target-language-implications",
          "translation-replaces-source-suppositions-with-target-language-suppositions",
          "native-speakers-understand-unsaid-meaning-dimensions-without-conscious-analysis",
          "native-speakers-use-unsaid-meaning-while-producing-and-interpreting-explicit-speech",
          "translation-mirage-conceals-replaced-meaning-dimensions",
          "translation-mirage-conceals-source-language-cultural-and-semantic-differences",
        ],
        "target-language-analogue-cannot-replace-source-language-semantic-structure",
        "source-meaning-loss-authority-boundary-checkpoint",
      ),
      "target-language-dominance-boundary": definition(
        "target-language-conventions-cannot-dominate-source-language-grammar",
        [
          "most-language-specific-ways-of-thinking-are-lost-in-translation",
          "translation-usually-converts-foreignness-into-the-target-audience-rather-than-carrying-the-audience-into-foreignness",
          "target-language-conventions-can-dominate-a-translation",
          "translation-textbooks-advise-target-language-originality-of-style",
          "translation-textbooks-advise-considering-the-target-readers-nature-and-interests",
          "translation-textbooks-advise-tailoring-the-translation-to-the-target-readers",
          "translation-textbooks-also-seek-the-meaning-understood-by-source-language-speakers",
          "source-language-and-translation-audiences-are-distinct",
          "audience-conflation-rests-on-naive-universal-equivalence",
          "universality-reaches-only-highly-general-common-denominator-abstractions",
          "linguistic-universals-omit-detailed-lived-experience-meanings",
          "translation-removes-the-differentia-dimension-of-meaning",
          "translation-readers-may-not-know-what-meaning-was-lost",
          "some-source-meaning-dislocation-is-unavoidable-in-translation",
          "mistranslation-adds-avoidable-source-meaning-dislocation",
          "translation-mirage-can-conceal-both-unavoidable-loss-and-mistranslation",
        ],
        "target-audience-style-and-expectations-cannot-select-source-language-structure-or-result",
        "target-language-dominance-authority-boundary-checkpoint",
      ),
      "misleading-translation-context-boundary": definition(
        "published-translation-and-reader-expectation-are-nonauthorizing-evidence",
        [
          "anderson-and-dibble-render-the-first-cited-sentence-as-be-of-good-cheer",
          "anderson-and-dibble-render-the-second-cited-sentence-as-rest-in-peace",
          "florentine-codex-six-page-184-is-the-cited-location",
          "rest-in-peace-is-the-diplomatic-continuation-of-the-cited-english-rendering",
          "the-speech-context-is-an-elderly-human-man-addressing-a-young-human-woman-recently-delivered-of-a-human-baby",
          "an-english-reader-without-nahuatl-may-not-question-the-apparent-exactness",
          "the-english-rendering-can-sound-contextually-appropriate",
          "the-english-rendering-matches-an-english-readers-cultural-expectation-for-the-scene",
          "the-speaker-is-a-nahuatl-speaker-not-an-english-speaker",
          "the-following-speech-functions-as-a-solemn-admonition",
          "the-following-speech-is-not-merely-congratulatory-rhetoric",
        ],
        "translation-witnesses-and-reader-expectations-can-check-an-analysis-but-cannot-create-block-or-replace-nahuatl-grammar",
        "misleading-translation-context-authority-boundary-checkpoint",
      ),
      "admonitory-context-paraphrase-boundary": definition(
        "english-paraphrase-and-birth-context-cannot-replace-the-nahuatl-admonitory-analysis",
        [
          "young-woman-you-know-nothing-is-only-a-rough-english-equivalent",
          "you-are-ignorant-is-only-an-approximate-paraphrase",
          "the-contextual-implication-is-therefore-pay-attention-to-what-i-say",
          "the-addressee-survived-the-danger-of-death-in-childbirth",
          "surviving-childbirth-does-not-place-the-addressee-out-of-danger",
          "the-woman-and-her-child-face-an-uncertain-future",
          "the-elderly-speaker-addresses-the-woman-respectfully",
          "english-H-notation-marks-an-honored-addressee",
          "childbirth-survival-context-motivates-respectful-address",
          "the-passage-characterizes-childbirth-survival-as-victory-over-death",
          "the-speaker-is-neither-pampering-nor-indulging-the-addressee",
        ],
        "context-and-english-paraphrase-can-support-but-cannot-create-or-reverse-the-honorific-admonitory-grammar",
        "admonitory-context-paraphrase-authority-boundary-checkpoint",
      ),
      "king-praise-general-affect-boundary": definition(
        "translation-can-preserve-general-purpose-while-losing-language-specific-affect",
        [
          "the-king-example-preserves-general-thrust-but-not-particular-affect",
          "the-canvas-cites-the-king-sentence-from-florentine-codex-six-page-57",
          "anderson-and-dibble-render-it-as-now-thou-hast-merited-thou-hast-deserved-the-city",
          "the-speaker-intends-to-congratulate-the-addressee",
          "the-speaker-intends-to-flatter-the-addressee",
          "the-addressee-is-a-newly-chosen-human-king",
          "the-english-rendering-preserves-the-general-congratulatory-and-flattering-purpose",
        ],
        "general-pragmatic-purpose-and-citation-evidence-cannot-decide-the-internal-participant-relations",
        "king-praise-general-affect-authority-boundary-checkpoint",
      ),
      "language-acquisition-reorientation-boundary": definition(
        "language-learning-moves-beyond-translation-toward-the-source-language-framework",
        [
          "translation-and-foreign-language-acquisition-move-in-opposite-directions",
          "translation-accommodates-foreign-material-to-the-readers-framework",
          "language-acquisition-reorients-the-learner-toward-the-foreign-language-framework",
          "language-learning-is-not-only-a-search-for-how-to-say-translation-equivalents",
          "language-learning-pursues-anthropological-understanding-within-language-and-culture",
          "foreign-language-study-pursues-meaning-rather-than-translation",
          "translation-equivalence-is-an-initial-access-instrument",
          "translation-equivalence-is-superficial",
          "translation-equivalence-can-be-treacherous-or-misleading",
          "the-learner-must-move-toward-fuller-foreign-meaning",
          "moving-into-fuller-foreign-meaning-is-difficult",
          "learners-often-overestimate-their-success-in-reaching-foreign-meaning",
          "translation-mirage-contributes-to-that-overestimation",
        ],
        "translation-equivalence-can-aid-entry-but-cannot-become-source-language-grammar-or-meaning-authority",
        "language-acquisition-reorientation-authority-boundary-checkpoint",
      ),
      "dictionary-equivalence-limit-boundary": definition(
        "dictionary-equivalents-are-access-evidence-not-source-language-definitions",
        [
          "a-wintu-speakers-english-equivalent-rarely-revealed-the-exact-wintu-meaning",
          "the-wintu-observation-is-cited-to-dorothy-lee-freedom-and-culture-page-126",
          "classical-nahuatl-translation-equivalence-is-difficult-to-reach",
          "classical-nahuatl-meaning-beyond-equivalence-is-still-more-difficult",
          "no-living-native-speakers-of-classical-nahuatl-are-available",
          "no-living-native-informants-can-supply-direct-classical-nahuatl-judgments",
          "interpretation-therefore-resorts-to-foreign-language-dictionaries",
          "dictionary-reliance-is-inherently-unsatisfactory-because-translation-is-deficient",
          "a-dictionary-supplies-equivalents-not-direct-lexical-meaning",
          "dictionary-equivalents-reflect-the-compilers-interests",
          "dictionary-equivalents-reflect-the-compilers-cultural-worldview",
          "translated-renderings-are-not-source-lexical-definitions",
        ],
        "absence-of-native-informants-and-use-of-dictionaries-neither-create-nor-block-a-grammar-result",
        "dictionary-equivalence-limit-authority-boundary-checkpoint",
      ),
      "dictionary-source-colonial-filter-boundary": definition(
        "dictionary-history-and-purpose-are-provenance-not-nahuatl-grammar-authority",
        [
          "classical-nahuatl-dictionaries-are-particularly-disappointing",
          "molinas-vocabulario-is-treated-as-the-premier-classical-nahuatl-dictionary",
          "alonso-de-molina-authored-the-vocabulario",
          "the-vocabulario-was-published-in-mexico-from-1555-through-1571",
          "one-vocabulario-section-runs-from-spanish-to-nahuatl",
          "the-other-vocabulario-section-runs-from-nahuatl-to-spanish",
          "the-vocabulario-was-partly-intended-to-subdue-the-nahuatl-speaking-population",
          "its-colonial-method-substituted-sermonizing-for-armed-battle",
          "that-purpose-especially-prejudices-the-vocabulario",
          "the-vocabulario-frequently-filters-nahuatl-categories-through-spanish-categories",
        ],
        "dictionary-direction-history-prestige-and-colonial-purpose-cannot-authorize-spanish-categories-as-nahuatl-grammar",
        "dictionary-source-colonial-filter-authority-boundary-checkpoint",
      ),
      "imported-object-descriptive-naming-boundary": definition(
        "descriptive-nahuatl-formations-retain-compositional-meaning-beyond-dictionary-attestation",
        [
          "molina-often-represents-imported-spanish-objects-and-ideas-with-descriptive-nahuatl-formations",
          "petlacalmecahuehueh-is-used-for-the-imported-object-clavichord",
          "petlacalmecahuehueh-compositionally-describes-an-upright-stringed-drum-shaped-like-a-wickerwork-coffer",
          "acalcuachpamitl-is-used-for-the-imported-object-sail",
          "acalcuachpamitl-compositionally-describes-a-large-cotton-blanket-shaped-banner-for-a-boat",
          "the-clavichord-and-sail-entries-witness-descriptive-naming-without-limiting-meaning-to-dictionary-attestation",
          "the-descriptive-imported-item-entries-were-probably-coined-by-native-nahuatl-speakers",
          "those-probable-coinages-named-newly-encountered-european-objects-and-concepts",
          "molina-prefers-some-imported-item-formations-over-strictly-native-cultural-vocabulary",
          "the-disfavored-native-items-especially-concern-colonially-targeted-cultural-lifeways",
          "molina-includes-mahomacalli-with-the-translation-moorish-mosque",
          "molina-includes-mahomatlatlatlauhtilizcalli-with-the-translation-moorish-mosque",
        ],
        "dictionary-witnesses-and-imported-object-glosses-cannot-replace-compositional-nahuatl-analysis-or-whitelist-lexical-meaning",
        "imported-object-descriptive-naming-authority-boundary-checkpoint",
      ),
      "dictionary-sound-notation-incompleteness-boundary": definition(
        "missing-dictionary-sound-marks-are-unknown-data-not-negative-grammar-results",
        [
          "molinas-communicative-purpose-required-consistent-vowel-length-and-glottal-stop-marking",
          "molinas-dictionary-never-marks-vowel-length",
          "molinas-dictionary-marks-a-glottal-stop-only-rarely",
          "when-molina-marks-a-glottal-stop-he-uses-h",
          "andrews-lessons-use-h-to-write-the-glottal-stop",
          "sections-2-2-and-2-3-3-own-the-importance-of-vowel-length-and-glottal-stops",
        ],
        "unmarked-vowel-length-or-glottal-stop-in-dictionary-evidence-cannot-be-read-as-phonological-absence-or-block-a-canonical-result",
        "dictionary-sound-notation-incompleteness-authority-boundary-checkpoint",
      ),
      "multilanguage-dictionary-projection-chain-boundary": definition(
        "each-dictionary-translation-layer-adds-semantic-distance-from-nahuatl",
        [
          "a-spanish-speaking-molina-user-meets-a-spanish-semantic-system-superimposed-on-nahuatl",
          "an-english-speaking-molina-user-has-a-greater-semantic-disadvantage-than-a-spanish-speaking-user",
          "an-english-user-of-a-spanish-nahuatl-dictionary-meets-an-additional-interpretive-layer",
          "the-english-user-maps-english-meaning-onto-spanish-meaning-already-mapped-onto-nahuatl",
          "remi-simeons-dictionnaire-was-published-in-paris-in-1885",
          "simeons-dictionary-translated-molinas-work-into-nahuatl-french-format",
          "simeon-added-entries-from-other-texts",
          "an-english-user-of-simeon-maps-english-onto-french-onto-spanish-onto-nahuatl",
          "simeons-dictionary-was-translated-into-spanish-in-mexico-city-in-1977",
          "the-1977-spanish-translation-of-simeon-is-documented",
          "an-english-reader-of-the-spanish-simeon-translation-adds-an-english-semantic-projection",
          "every-added-cross-language-semantic-layer-creates-a-possibility-of-misreading",
        ],
        "no-dictionary-projection-chain-can-replace-direct-nahuatl-structure-or-meaning-authority",
        "multilanguage-dictionary-projection-chain-authority-boundary-checkpoint",
      ),
      "imaxtli-semantic-drift-boundary": definition(
        "imaxtli-readings-remain-tied-to-nahuatl-number-and-lexical-structure-not-later-gloss-drift",
        [
          "molina-attests-imaxtli-with-pendejo-or-barba-inferior",
          "pendejo-gives-imaxtli-the-singular-reading-one-pubic-hair",
          "barba-inferior-literally-gives-imaxtli-the-reading-nether-beard",
          "the-nether-beard-reading-corresponds-to-pubes-or-a-pubic-hair-patch",
          "the-paired-gloss-witnesses-singular-hair-and-collective-pubes-without-owning-the-grammar",
          "simeon-renders-imaxtli-as-french-barbe-poil-follet",
          "french-barbe-poil-follet-means-beard-or-down",
          "the-french-reading-refers-to-first-human-beard-growth-not-molinas-pubic-hair-meaning",
          "the-spanish-translation-renders-french-barbe-as-beard",
          "the-spanish-translation-renders-french-poil-follet-as-upper-lip-fuzz",
        ],
        "later-french-and-spanish-gloss-drift-cannot-erase-the-nahuatl-singular-or-collective-imaxtli-readings",
        "imaxtli-semantic-drift-authority-boundary-checkpoint",
      ),
      "common-number-lexical-contrast-boundary": definition(
        "nahuatl-common-number-and-compound-meaning-preserve-contrasts-hidden-by-generic-translation",
        [
          "one-nahuatl-compound-verbstem-means-to-pluck-out-individual-pubic-hairs",
          "a-distinct-nahuatl-compound-verbstem-means-to-shave-off-the-pubic-hair-patch",
          "simeon-reduces-the-pubic-hair-plucking-compound-to-to-shave",
          "simeon-reduces-the-pubic-patch-shaving-compound-to-to-shave",
          "simeons-spanish-translators-also-reduce-the-plucking-compound-to-to-shave",
          "simeons-spanish-translators-also-reduce-the-patch-shaving-compound-to-to-shave",
          "nahuatl-common-number-one-or-more-resolves-molinas-paired-imaxtli-reading",
        ],
        "a-shared-translation-cannot-merge-distinct-nahuatl-verbstems-and-common-number-selects-one-or-more-without-changing-the-nahuatl-form",
        "common-number-lexical-contrast-authority-boundary-checkpoint",
      ),
      "historical-spanish-semantic-change-boundary": definition(
        "historical-spanish-usage-must-be-interpreted-in-its-own-time-before-it-can-support-nahuatl-analysis",
        [
          "molinas-vocabulario-was-published-in-complete-form-in-1571",
          "molinas-vocabulario-uses-sixteenth-century-spanish",
          "a-modern-user-must-account-for-unfamiliar-sixteenth-century-spanish-usage",
          "barba-inferior-witnesses-unfamiliar-historical-spanish-usage",
          "a-modern-user-must-account-for-spanish-semantic-change-since-the-sixteenth-century",
        ],
        "modern-spanish-meaning-cannot-be-projected-backward-to-authorize-a-nahuatl-analysis",
        "historical-spanish-semantic-change-authority-boundary-checkpoint",
      ),
      "caltechtli-historical-gloss-reanalysis-boundary": definition(
        "caltechtli-must-be-interpreted-from-nahuatl-composition-and-historical-spanish-not-modern-lookalikes",
        [
          "molinas-dictionary-lists-the-nahuatl-headword-caltechtli",
          "molina-glosses-caltechtli-as-pared-la-hazera-della",
          "karttunen-gives-caltechtli-the-reading-wall-of-a-house",
          "karttunen-also-gives-caltechtli-the-reading-walkway-along-the-side-of-a-house",
          "caltechtli-is-correctly-read-as-house-wall-facing-from-house-side-surface-composition",
          "historical-hazera-is-not-modern-acera-sidewalk",
          "historical-hazera-is-derived-from-haz",
          "historical-haz-can-mean-face",
          "historical-haz-can-mean-surface",
          "hazera-as-a-derivative-of-haz-was-normal-in-molinas-time",
        ],
        "the-caltechtli-result-must-follow-house-side-surface-composition-and-reject-the-modern-sidewalk-lookalike",
        "caltechtli-historical-gloss-reanalysis-authority-boundary-checkpoint",
      ),
      "cuauhtlah-forest-place-reanalysis-boundary": definition(
        "cuauhtlah-is-a-canonical-place-of-abundant-trees-not-a-spanish-mountain-category",
        [
          "traditional-quauhtla-corresponds-to-normalized-cuauhtlah",
          "molina-glosses-quauhtla-with-spanish-montana-mountain",
          "molina-glosses-quauhtla-with-spanish-arboleda-grove",
          "molina-glosses-quauhtla-with-spanish-bosque-forest",
          "molinas-entry-imposes-spanish-semantic-values-on-the-nahuatl-item",
          "literal-mountain-is-rejected-because-the-spanish-usage-conflates-mountain-and-forest",
          "iberian-deforestation-explains-the-historical-spanish-mountain-forest-conflation",
          "molina-imposed-that-spanish-mountain-forest-conflation-on-cuauhtlah",
          "cuauhtlah-means-it-is-a-place-of-abundant-trees-a-forest-or-grove",
          "with-plural-reference-cuauhtlah-means-they-are-forests-or-groves",
        ],
        "canonical-cuauh-plus-tlah-formation-authorizes-cuauhtlah-and-context-selects-one-or-more-forest-places-without-changing-the-form",
        "cuauhtlah-forest-place-reanalysis-authority-boundary-checkpoint",
      ),
      "dictionary-translation-error-boundary": definition(
        "dictionary-translation-is-provenance-that-must-yield-to-canonical-nahuatl-structure",
        [
          "dictionary-untrustworthiness-extends-beyond-the-earlier-problem-types",
          "a-dictionary-translation-can-be-wrong",
          "simeon-glosses-chimalpopoca-as-smoking-shield",
          "smoking-shield-is-rejected-as-the-meaning-of-chimalpopoca",
          "section-56-2-1-b-is-the-required-canonical-chimalpopoca-analysis",
        ],
        "the-smoking-shield-gloss-cannot-authorize-a-result-and-the-canonical-personal-name-owner-remains-required",
        "dictionary-translation-error-authority-boundary-checkpoint",
      ),
      "dictionary-equivalent-semantic-limit-boundary": definition(
        "dictionary-equivalents-are-partial-access-points-not-complete-nahuatl-meanings",
        [
          "foreign-dictionaries-can-create-an-illusion-of-clear-cut-equivalence",
          "most-source-and-target-language-correspondences-are-ill-fitting",
          "most-source-and-target-language-correspondences-overlap-only-partly",
          "calli-is-ordinarily-rendered-as-house",
          "house-is-only-a-sometimes-equivalent-rendering-of-calli",
          "calpolli-can-be-rendered-as-big-house-or-town-quarter",
          "acalli-can-be-rendered-as-dugout-canoe-or-boat",
          "chinan-calli-can-be-rendered-as-a-hedge-enclosure",
          "tzoncalli-can-be-rendered-as-scalp-hair-or-wig",
          "dictionary-limits-make-morphology-morphosyntax-and-syntax-essential",
          "grammar-does-not-remove-the-limits-of-dictionaries",
          "grammar-enables-the-fullest-use-of-available-source-material",
        ],
        "the-canonical-nahuatl-structure-and-context-select-meaning-while-no-single-dictionary-equivalent-defines-the-source-item",
        "dictionary-equivalent-semantic-limit-checkpoint",
      ),
      "classical-text-interpretation-discipline-boundary": definition(
        "cultural-interpretation-must-follow-competent-nahuatl-reading-without-becoming-grammar-authority",
        [
          "classical-nahuatl-is-the-language-of-a-disappeared-civilization",
          "studying-classical-nahuatl-serves-understanding-that-civilization",
          "a-cultural-account-based-on-faulty-readings-is-unreliable-or-fictional",
          "pedagogical-motivation-does-not-authorize-or-block-a-grammar-result",
          "interpretation-based-on-faulty-textual-readings-is-not-grounded-in-the-texts",
          "understanding-the-culture-requires-time-and-energy-to-master-classical-nahuatl",
          "some-past-interpreters-did-not-master-the-language-before-interpreting-the-culture",
          "classical-nahuatl-interpretation-must-resist-aversion-to-grammar",
          "classical-nahuatl-interpretation-must-resist-linguicentrism",
          "classical-nahuatl-interpretation-must-resist-translation-mirage",
          "classical-nahuatl-interpretation-must-resist-ethnocentrism",
          "a-personal-interpretation-cannot-be-forced-onto-a-text-to-support-an-invention",
        ],
        "only-source-grounded-nahuatl-analysis-may-support-interpretation-and-the-pedagogical-purpose-itself-never-selects-grammar",
        "classical-text-interpretation-discipline-checkpoint",
      ),
    }),
  }),
  wordFragment: freeze({
    ownerId: "word-sentence-fragment-analysis",
    operationId: "concept.word.sentence-fragment.analyze",
    prefix: "ComparativeWordSentenceFragmentAnalysis",
    sourceKind: "comparative-word-sentence-fragment-analysis-source",
    resultKind: "comparative-word-sentence-fragment-analysis-result",
    inputContract: "complete-typed-word-rank-analysis-source",
    analysisDomain: "english-spanish-word-rank-comparison",
    successStepId: "word-sentence-fragment-analysis-executed",
    rejectionStepId: "word-sentence-fragment-analysis-rejected",
    restrictions: freeze([
      "the-comparative-word-rank-domain-and-analysis-question-are-typed-coordinates",
      "one-word-utterances-and-reconstructed-unspoken-words-are-evidence-only",
      "the-simple-word-sentence-case-is-an-exception-not-a-general-sentence-generator",
      "Nahuatl-particle-nuclear-clause-syntax-and-group-owners-remain-separate",
      "analysis-installs-no-English-or-Spanish-lexicon-spelling-profile-or-runtime",
    ]),
    analyses: freeze({
      "general-sentence-fragment": definition(
        "word-rank-sentence-fragment",
        ["words-are-sentence-fragments"],
        "word-rank-remains-below-complete-sentence-rank",
        "general-word-sentence-fragment-checkpoint",
      ),
      "simple-word-sentence-exception": definition(
        "delimited-simple-word-sentence-exception",
        [
          "a-simple-word-can-occasionally-occur-as-a-sentence",
          "simple-word-sentence-occurrence-is-an-exception-not-the-general-rule",
        ],
        "exception-adds-to-without-replacing-general-sentence-fragment-constraint",
        "simple-word-sentence-exception-checkpoint",
      ),
    }),
  }),
  structurePrinciples: freeze({
    ownerId: "linguistic-structure-principles-analysis",
    operationId: "concept.structure.principles.analyze",
    prefix: "LinguisticStructurePrinciplesAnalysis",
    sourceKind: "linguistic-structure-principles-analysis-source",
    resultKind: "linguistic-structure-principles-analysis-result",
    inputContract: "complete-typed-linguistic-structure-principles-source",
    analysisDomain: "linguistic-structure-principles",
    successStepId: "linguistic-structure-principles-analysis-executed",
    rejectionStepId: "linguistic-structure-principles-analysis-rejected",
    restrictions: freeze([
      "the-analysis-question-selects-one-structural-principle-not-a-stored-answer",
      "static-dynamic-concatenation-and-interaction-checkpoints-remain-distinct",
      "English-combinations-are-evidence-only-and-cannot-supply-constituents",
      "analysis-does-not-compose-a-unit-or-authorize-language-specific-grammar",
      "governance-adjunction-conjunction-and-participant-role-owners-remain-separate",
    ]),
    analyses: freeze({
      "static-dynamic-facets": definition(
        "static-and-dynamic-structure-facets",
        [
          "morphological-morphosyntactical-and-syntactical-structures-share-static-and-dynamic-facets",
          "static-structure-is-a-complex-unit-composed-from-less-complex-or-lower-ranked-units",
          "dynamic-structure-is-a-complex-unit-resulting-from-interaction-and-interrelation-of-parts",
        ],
        "static-and-dynamic-facets-describe-one-structure-without-merging",
        "static-dynamic-structure-facets-checkpoint",
      ),
      "cooperative-principles": definition(
        "concatenation-and-interaction-cooperation",
        ["linguistic-structure-requires-cooperation-of-concatenation-and-interaction"],
        "concatenation-and-interaction-remain-distinct-cooperating-principles",
        "cooperative-structuring-principles-checkpoint",
      ),
      "concatenation-additive": definition(
        "additive-concatenation-principle",
        ["concatenation-meaningfully-combines-two-or-more-constituents-additively"],
        "concatenation-precedes-governance-analysis-of-the-resulting-unity",
        "additive-concatenation-principle-checkpoint",
      ),
      "concatenation-unit-closure": definition(
        "one-plus-one-yields-one-structural-unity",
        ["concatenation-retains-the-one-plus-one-equals-one-structural-principle"],
        "multiple-constituents-form-one-structured-unit",
        "concatenation-unit-closure-checkpoint",
      ),
      "interaction-justification": definition(
        "interaction-justifies-concatenated-unity",
        ["interaction-and-interassociation-justify-mere-linear-succession"],
        "interaction-evaluation-follows-recognition-of-concatenated-unity",
        "interaction-justification-checkpoint",
      ),
    }),
  }),
  governanceTaxonomy: freeze({
    ownerId: "governance-type-taxonomy",
    operationId: "concept.structure.governance-taxonomy.analyze",
    prefix: "GovernanceTypeTaxonomy",
    sourceKind: "governance-type-taxonomy-source",
    resultKind: "governance-type-taxonomy-result",
    inputContract: "complete-typed-governance-type-taxonomy-source",
    analysisDomain: "linguistic-governance-taxonomy",
    successStepId: "governance-type-taxonomy-analysis-executed",
    rejectionStepId: "governance-type-taxonomy-analysis-rejected",
    restrictions: freeze([
      "the-governance-analysis-question-is-typed-and-cannot-supply-its-classification",
      "adjunctive-and-conjunctive-types-remain-distinct",
      "function-unit-coupling-individuates-subtypes-without-selecting-a-language-form",
      "adjunctive-and-conjunctive-execution-remain-separate-owners",
      "taxonomy-does-not-compose-order-or-realize-a-structure",
    ]),
    analyses: freeze({
      "general-governance-types": definition(
        "adjunctive-and-conjunctive-governance-types",
        ["governance-establishes-exactly-adjunctive-and-conjunctive-general-types"],
        "general-governance-types-remain-disjoint",
        "general-governance-types-checkpoint",
      ),
      "function-unit-subtypes": definition(
        "function-unit-coupled-governance-subtypes",
        ["specific-governance-subtypes-are-determined-by-coupling-distinctive-function-units"],
        "function-unit-coupling-individuates-general-governance-types",
        "function-unit-governance-subtypes-checkpoint",
      ),
    }),
  }),
  adjunctiveGovernance: freeze({
    ownerId: "adjunctive-governance-analysis",
    operationId: "concept.structure.adjunctive-governance.analyze",
    prefix: "AdjunctiveGovernanceAnalysis",
    sourceKind: "adjunctive-governance-analysis-source",
    resultKind: "adjunctive-governance-analysis-result",
    inputContract: "complete-typed-adjunctive-governance-analysis-source",
    analysisDomain: "adjunctive-governance",
    successStepId: "adjunctive-governance-analysis-executed",
    rejectionStepId: "adjunctive-governance-analysis-rejected",
    restrictions: freeze([
      "the-adjunctive-analysis-question-is-typed-and-answer-free",
      "governor-and-subordinate-function-units-remain-asymmetric",
      "form-class-fillers-and-structural-fillers-do-not-become-function-units",
      "English-examples-and-later-section-references-are-evidence-only",
      "analysis-does-not-compose-an-adjunct-or-install-language-specific-order",
    ]),
    analyses: freeze({
      "asymmetric-governance": definition(
        "asymmetric-governor-and-adjunct-relation",
        ["one-function-unit-governs-the-subordinate-adjunctive-function-unit"],
        "governor-and-adjunct-roles-are-not-interchangeable",
        "adjunctive-asymmetric-governance-checkpoint",
      ),
      "predicate-subject-governance": definition(
        "predicate-governs-subject",
        ["in-sentence-formation-the-predicate-governs-the-subject"],
        "predicate-and-subject-remain-distinct-function-unit-roles",
        "predicate-subject-governance-checkpoint",
      ),
      "predicate-formation-varieties": definition(
        "copulative-intransitive-and-transitive-predicate-structures",
        [
          "predicate-formation-has-copulative-intransitive-and-transitive-varieties",
          "a-copulative-predicate-consists-of-a-copular-plus-a-subject-complement-adjunct",
          "an-intransitive-predicate-consists-of-a-predicator-with-no-adjunct",
          "a-transitive-predicate-consists-of-a-predicator-plus-a-direct-object-adjunct",
        ],
        "each-predicate-variety-retains-its-own-adjunctive-structure",
        "predicate-formation-varieties-checkpoint",
      ),
      "relation-relator-terminus": definition(
        "relator-governs-terminus",
        [
          "a-structure-of-relation-contains-a-relator-and-a-terminus",
          "within-a-structure-of-relation-the-relator-governs-the-terminus",
        ],
        "relator-and-terminus-remain-distinct-function-unit-roles",
        "relation-relator-terminus-checkpoint",
      ),
      "modification-head-modifier": definition(
        "head-governs-modifier",
        ["in-modification-structure-the-head-governs-the-modifier"],
        "head-and-modifier-are-distinct-function-unit-roles",
        "modification-head-modifier-checkpoint",
      ),
      "function-unit-fillers": definition(
        "function-unit-position-filler-admissibility",
        ["function-unit-positions-can-be-filled-by-form-class-items-or-other-structures"],
        "function-unit-role-remains-distinct-from-its-filler",
        "function-unit-filler-admissibility-checkpoint",
      ),
      "language-specific-function-units": definition(
        "language-specific-function-unit-selection-order-and-fillers",
        [
          "languages-can-differ-in-which-function-units-they-select",
          "languages-can-differ-in-how-function-units-are-ordered",
          "languages-can-differ-in-which-fillers-occupy-function-units",
        ],
        "one-language-function-unit-pattern-cannot-authorize-another-language",
        "language-specific-function-unit-checkpoint",
      ),
      "optional-adjunctor": definition(
        "adjunct-may-be-introduced-by-adjunctor",
        ["a-subordinate-adjunctive-function-unit-can-be-introduced-by-an-adjunctor"],
        "adjunctor-introduction-does-not-create-the-adjunctive-governance-relation",
        "optional-adjunctor-checkpoint",
      ),
      "adjunctive-grammatical-devices": definition(
        "agreement-and-case-as-adjunctive-devices",
        [
          "several-grammatical-devices-are-associated-with-adjunctive-governance",
          "agreement-is-a-general-grammatical-device-associated-with-adjunctive-governance",
          "case-is-a-general-grammatical-device-associated-with-adjunctive-governance",
        ],
        "agreement-and-case-remain-distinct-language-specific-implementations",
        "adjunctive-grammatical-devices-checkpoint",
      ),
    }),
  }),
  conjunctiveGovernance: freeze({
    ownerId: "conjunctive-governance-analysis",
    operationId: "concept.structure.conjunctive-governance.analyze",
    prefix: "ConjunctiveGovernanceAnalysis",
    sourceKind: "conjunctive-governance-analysis-source",
    resultKind: "conjunctive-governance-analysis-result",
    inputContract: "complete-typed-conjunctive-governance-analysis-source",
    analysisDomain: "conjunctive-governance",
    successStepId: "conjunctive-governance-analysis-executed",
    rejectionStepId: "conjunctive-governance-analysis-rejected",
    restrictions: freeze([
      "the-conjunctive-analysis-question-is-typed-and-answer-free",
      "conjuncts-interact-as-equals-without-governor-subordinate-transfer",
      "form-class-membership-does-not-authorize-a-conjunction-instance",
      "English-and-Spanish-tendencies-are-comparative-evidence-only",
      "analysis-does-not-compose-conjuncts-or-generate-a-conjunctor-or-surface",
    ]),
    analyses: freeze({
      "equal-governance": definition(
        "equal-conjunct-function-unit-relation",
        ["two-or-more-conjunct-function-units-interact-as-equals-with-none-governing-another"],
        "conjunctive-equality-excludes-adjunctive-subordination",
        "equal-conjunct-governance-checkpoint",
      ),
      "conjunct-form-class": definition(
        "conjunct-form-class-alignment",
        ["conjunct-function-units-can-be-filled-by-items-of-the-same-form-class"],
        "function-unit-equality-remains-distinct-from-form-class-sameness",
        "conjunct-form-class-alignment-checkpoint",
      ),
    }),
  }),
});

function deepFreeze(value, seen = new WeakSet()) {
  if (!value || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor && Object.prototype.hasOwnProperty.call(descriptor, "value")) {
      deepFreeze(descriptor.value, seen);
    }
  }
  return freeze(value);
}

function requestFailure(request, spec) {
  if (!request || typeof request !== "object" || Array.isArray(request)) {
    return `${spec.ownerId}-source-object-required`;
  }
  const prototype = Object.getPrototypeOf(request);
  if (prototype !== Object.prototype && prototype !== null) {
    return `${spec.ownerId}-source-plain-object-required`;
  }
  for (const key of Reflect.ownKeys(request)) {
    if (!["analysisDomain", "requestedAnalysisKind"].includes(key)) {
      return `${spec.ownerId}-source-unrecognized-constituent:${String(key)}`;
    }
    const descriptor = Object.getOwnPropertyDescriptor(request, key);
    if (!descriptor || !Object.prototype.hasOwnProperty.call(descriptor, "value")) {
      return `${spec.ownerId}-source-data-constituent-required:${String(key)}`;
    }
  }
  return "";
}

function analyzeRequest(request, spec) {
  const malformed = requestFailure(request, spec);
  const analysisDomain = malformed ? "" : String(request.analysisDomain || "");
  const analysisKind = malformed ? "" : String(request.requestedAnalysisKind || "");
  const domainValid = analysisDomain === spec.analysisDomain;
  const selected = spec.analyses[analysisKind] || null;
  const reason = malformed
    || (!domainValid ? `${spec.ownerId}-analysis-domain-required` : "")
    || (!selected ? `${spec.ownerId}-analysis-kind-required` : "");
  return deepFreeze({
    reason,
    analysisDomain,
    analysisKind,
    selected,
    requestDigestInput: `${analysisDomain}:${analysisKind}`,
  });
}

function createMechanism(spec) {
  registerCanonicalOwnerSpecIdentity(spec);
  const issuedSources = new WeakSet();
  const sourceContexts = new WeakMap();
  const issuedResults = new WeakSet();
  const resultEvidence = new WeakMap();
  const operationOwner = createGrammarOperationContractOwner({
    ownerId: spec.ownerId,
    domain: spec.ownerId,
  });
  const operationContract = operationOwner.buildContract({
    operationId: spec.operationId,
    operationType: "establish",
    consumesFrameKinds: [spec.sourceKind],
    producesFrameKind: spec.resultKind,
    effectScopes: ["read-only-classification", "typed-source-validation"],
    outputKinds: ["read-only-result"],
    authorityRefs: ["andrews-linguistic-structure-analysis"],
    description: `Execute ${spec.ownerId} without generating a formula or surface.`,
  });

  function buildSource(request = {}) {
    const context = analyzeRequest(request, spec);
    const source = deepFreeze({
      kind: spec.sourceKind,
      version: VERSION,
      analysisDomain: context.analysisDomain,
      requestedAnalysisKind: context.analysisKind,
      authorizationStatus: context.reason ? "blocked" : "authorized",
      blockReason: context.reason,
      requestDigestInput: context.requestDigestInput,
      ...NON_AUTHORITY,
    });
    issuedSources.add(source);
    sourceContexts.set(source, context);
    return source;
  }

  function isSource(source = null) {
    const context = sourceContexts.get(source) || null;
    return Boolean(
      source
      && issuedSources.has(source)
      && context
      && source.kind === spec.sourceKind
      && source.version === VERSION
      && source.authorizationStatus === "authorized"
      && source.blockReason === ""
      && context.reason === ""
      && Object.entries(NON_AUTHORITY).every(([key, value]) => source[key] === value)
      && freeze(source) === source
    );
  }

  function issueResult(source = null) {
    const sourceIssued = issuedSources.has(source);
    const context = sourceContexts.get(source) || null;
    const reason = !sourceIssued
      ? `owner-issued-${spec.ownerId}-source-required`
      : source?.blockReason || context?.reason || "";
    const authorized = sourceIssued && context && !reason && isSource(source);
    const selected = authorized ? context.selected : null;
    const providedInput = deepFreeze({
      analysisDomain: source?.analysisDomain || "",
      requestedAnalysisKind: source?.requestedAnalysisKind || "",
    });
    const routeSteps = [
      deepFreeze({
        stepId: `${spec.ownerId}-source-admitted`,
        kind: "source",
        actorId: spec.ownerId,
        status: sourceIssued ? "accepted" : "rejected",
        reason: sourceIssued ? `owner-issued-${spec.ownerId}-source` : reason,
        branchId: `${spec.ownerId}-source-authority`,
        decision: sourceIssued ? "admit" : "reject",
        evaluatedRuleIds: [],
        executedRuleIds: [],
        inputState: providedInput,
        outputState: deepFreeze({ sourceIssued }),
      }),
      deepFreeze({
        stepId: `${spec.ownerId}-semantic-owner-selected`,
        kind: "semantic-owner",
        actorId: spec.ownerId,
        status: sourceIssued ? "selected" : "rejected",
        reason: sourceIssued ? `${spec.ownerId}-jurisdiction-selected` : reason,
        branchId: `${spec.ownerId}-owner-jurisdiction`,
        decision: sourceIssued ? spec.ownerId : "no-owner",
        evaluatedRuleIds: [],
        executedRuleIds: [],
        inputState: deepFreeze({ sourceKind: source?.kind || "" }),
        outputState: deepFreeze({ ownerId: sourceIssued ? spec.ownerId : "" }),
      }),
      deepFreeze({
        stepId: `${spec.ownerId}-analysis-coordinates-validated`,
        kind: "guard",
        actorId: spec.ownerId,
        status: authorized ? "accepted" : sourceIssued ? "rejected" : "skipped",
        reason: authorized ? "typed-analysis-domain-and-question-recognized" : reason,
        branchId: `${spec.ownerId}-analysis-coordinates`,
        decision: authorized ? "accept" : sourceIssued ? "reject" : "skip",
        evaluatedRuleIds: sourceIssued ? [spec.operationId] : [],
        executedRuleIds: [],
        inputState: providedInput,
        outputState: deepFreeze({ analysisCoordinatesValid: authorized }),
      }),
    ];
    for (const [analysisKind, candidate] of Object.entries(spec.analyses)) {
      const applicable = authorized && context.analysisKind === analysisKind;
      routeSteps.push(deepFreeze({
        stepId: candidate.checkpoint,
        kind: "branch",
        actorId: spec.ownerId,
        status: applicable ? "evaluated" : "not-applicable",
        reason: applicable ? `${analysisKind}-claim-retained` : `${analysisKind}-not-requested`,
        branchId: `${spec.ownerId}-${analysisKind}`,
        decision: applicable ? "retain" : "not-applicable",
        evaluatedRuleIds: authorized ? [spec.operationId] : [],
        executedRuleIds: [],
        inputState: providedInput,
        outputState: deepFreeze({ checkpointSatisfied: applicable }),
      }));
    }
    routeSteps.push(deepFreeze({
      stepId: authorized ? spec.successStepId : spec.rejectionStepId,
      kind: authorized ? "operation" : "guard",
      actorId: spec.ownerId,
      status: authorized ? "executed" : "rejected",
      reason: authorized ? `${spec.ownerId}-executed` : reason,
      branchId: `${spec.ownerId}-outcome`,
      decision: authorized ? "analyze" : "reject",
      evaluatedRuleIds: sourceIssued ? [spec.operationId] : [],
      executedRuleIds: authorized ? [spec.operationId] : [],
      inputState: providedInput,
      outputState: deepFreeze({
        classificationStatus: authorized
          ? `analyzed-${spec.ownerId}`
          : `${spec.ownerId}-rejected`,
      }),
    }));
    const frozenSteps = deepFreeze(routeSteps);
    const execution = deepFreeze({
      status: authorized ? "authorized" : "rejected",
      reason: reason || null,
      semanticOwnerId: spec.ownerId,
      operationId: spec.operationId,
      selectedRuleId: authorized ? spec.operationId : null,
      stages: frozenSteps.map((step) => step.stepId),
      routeSteps: frozenSteps,
    });
    const evidence = deepFreeze({
      ownerId: spec.ownerId,
      evaluatedOperationId: spec.operationId,
      inputContract: spec.inputContract,
      functionIds: deepFreeze([`build${spec.prefix}Source`, `evaluate${spec.prefix}`]),
      providedInput,
      execution,
      routeSteps: frozenSteps,
      outcome: deepFreeze({ status: execution.status, reason: execution.reason }),
    });
    const result = deepFreeze({
      kind: spec.resultKind,
      version: VERSION,
      authorizationStatus: authorized ? "authorized" : "blocked",
      blockReason: reason,
      semanticOwnerId: spec.ownerId,
      operationId: spec.operationId,
      operationContract,
      classificationStatus: authorized ? `analyzed-${spec.ownerId}` : `${spec.ownerId}-rejected`,
      analysisKind: authorized ? context.analysisKind : "",
      classification: selected?.classification || "",
      facts: deepFreeze([...(selected?.facts || [])]),
      relations: deepFreeze(selected ? [selected.relation] : []),
      restrictions: spec.restrictions,
      coordinates: deepFreeze(authorized ? {
        analysisDomain: context.analysisDomain,
        requestedAnalysisKind: context.analysisKind,
      } : {}),
      prerequisiteOwnerIds: deepFreeze([]),
      ownerExecutionCompleted: Boolean(authorized),
      ...NON_AUTHORITY,
      unitConstructed: false,
      boundaryRewritten: false,
      soundedSurfaceGenerated: false,
      writtenSurfaceGenerated: false,
      formulaGenerated: false,
    });
    issuedResults.add(result);
    resultEvidence.set(result, evidence);
    return result;
  }

  function isResult(result = null) {
    return Boolean(
      result
      && issuedResults.has(result)
      && result.kind === spec.resultKind
      && result.version === VERSION
      && result.semanticOwnerId === spec.ownerId
      && result.operationId === spec.operationId
      && operationOwner.isContractIssued(result.operationContract)
      && result.generationAllowed === false
      && result.unitConstructed === false
      && result.writtenSurfaceGenerated === false
      && result.formulaGenerated === false
      && freeze(result) === result
    );
  }

  function getEvidence(result = null) {
    return resultEvidence.get(result) || null;
  }

  function isEvidence(evidence = null, result = null) {
    const currentSteps = evidence?.routeSteps?.filter((step) =>
      step.executedRuleIds?.includes(spec.operationId)) || [];
    return Boolean(
      evidence
      && result
      && issuedResults.has(result)
      && resultEvidence.get(result) === evidence
      && evidence.ownerId === spec.ownerId
      && evidence.evaluatedOperationId === spec.operationId
      && evidence.execution?.routeSteps === evidence.routeSteps
      && evidence.outcome?.status === evidence.execution?.status
      && evidence.outcome?.reason === evidence.execution?.reason
      && (result.authorizationStatus === "authorized"
        ? currentSteps.length === 1 && currentSteps[0].stepId === spec.successStepId
        : currentSteps.length === 0)
      && freeze(evidence) === evidence
    );
  }

  return deepFreeze({
    buildSource,
    isSource,
    evaluate: issueResult,
    isResult,
    isOperationContract: (contract = null) => operationOwner.isContractIssued(contract),
    getEvidence,
    isEvidence,
  });
}

function publicNames(prefix) {
  return freeze({
    build: `build${prefix}Source`,
    isSource: `is${prefix}Source`,
    evaluate: `evaluate${prefix}`,
    isResult: `is${prefix}Result`,
    isContract: `is${prefix}OperationContract`,
    getEvidence: `get${prefix}ExecutionEvidence`,
    isEvidence: `is${prefix}ExecutionEvidence`,
  });
}

export function createLinguisticStructureOwnersApi() {
  const api = Object.create(null);
  for (const spec of Object.values(OWNER_SPECS)) {
    const names = publicNames(spec.prefix);
    const mechanism = createMechanism(spec);
    api[names.build] = mechanism.buildSource;
    api[names.isSource] = mechanism.isSource;
    api[names.evaluate] = mechanism.evaluate;
    api[names.isResult] = mechanism.isResult;
    api[names.isContract] = mechanism.isOperationContract;
    api[names.getEvidence] = mechanism.getEvidence;
    api[names.isEvidence] = mechanism.isEvidence;
  }
  return freeze(api);
}

export function installLinguisticStructureOwnersGlobals(targetObject = globalThis) {
  const api = createLinguisticStructureOwnersApi(targetObject);
  Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
  return api;
}
