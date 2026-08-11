// Canonical modern ESM module.

const CLASSICAL_SOURCE_GRAMMAR_RESULT_AUTHORITY = Object.freeze({
  uiAuthority: "none",
  grammarAuthority: false
});

const CLASSICAL_SOURCE_GRAMMAR_RESULT_AXIS_ROWS = Object.freeze(`
classical.authority.source-language.firewall.enforce|grammar-firewall|intentionally-unsurfaced
classical.authority.source-language.firewall.enforce|interpretive-bias|intentionally-unsurfaced
classical.authority.source-language.firewall.enforce|interpretive-provenance|intentionally-unsurfaced
classical.authority.source-language.firewall.enforce|source-language-authority|intentionally-unsurfaced
classical.carrier.meaningless-unit.classify|analysis-level|intentionally-unsurfaced
classical.carrier.meaningless-unit.classify|candidate-kind|intentionally-unsurfaced
classical.carrier.meaningless-unit.classify|carrier-subsystem|intentionally-unsurfaced
classical.carrier.meaningless-unit.classify|meaning-exclusion|intentionally-unsurfaced
classical.carrier.phonotactic.constraints.validate|carrier-structure|intentionally-unsurfaced
classical.carrier.phonotactic.constraints.validate|language-specific-phonotactics|intentionally-unsurfaced
classical.carrier.phonotactic.constraints.validate|meaningful-surface-conformance|intentionally-unsurfaced
classical.carrier.phonotactic.constraints.validate|possible-sequence|intentionally-unsurfaced
classical.carrier.rank.form|formation-kind|intentionally-unsurfaced
classical.carrier.rank.form|rank-upgrade|intentionally-unsurfaced
classical.carrier.rank.form|source-unit-rank|intentionally-unsurfaced
classical.carrier.rank.form|target-unit-rank|intentionally-unsurfaced
classical.carrier.rank.taxonomy.classify|carrier-subsystem|intentionally-unsurfaced
classical.carrier.rank.taxonomy.classify|rank-identity|intentionally-unsurfaced
classical.carrier.rank.taxonomy.classify|rank-order|intentionally-unsurfaced
classical.carrier.rank.taxonomy.classify|rank-tier|intentionally-unsurfaced
classical.carrier.syllable.compose|consonant-margins|intentionally-unsurfaced
classical.carrier.syllable.compose|language-specific-structure|intentionally-unsurfaced
classical.carrier.syllable.compose|meaningless-unit|intentionally-unsurfaced
classical.carrier.syllable.compose|vowel-center|intentionally-unsurfaced
classical.carrier.vocable.compose|monosyllabic-upgrade|intentionally-unsurfaced
classical.carrier.vocable.compose|syllable-constituents|intentionally-unsurfaced
classical.carrier.vocable.compose|vocable-rank|intentionally-unsurfaced
classical.carrier.vocable.compose|word-syllable-perspective|intentionally-unsurfaced
classical.carrier.vocable.prosody.validate|polysyllabic-vocable|intentionally-unsurfaced
classical.carrier.vocable.prosody.validate|stress-applicability|intentionally-unsurfaced
classical.carrier.vocable.prosody.validate|stressed-syllable|intentionally-unsurfaced
classical.linguistic.structure.recurse|next-constituent-unit|intentionally-unsurfaced
classical.linguistic.structure.recurse|prior-structured-unit|intentionally-unsurfaced
classical.linguistic.structure.recurse|recursive-unity|intentionally-unsurfaced
classical.linguistic.structure.recurse|retained-operation-lineage|intentionally-unsurfaced
classical.linguistic.unit.compose|constituent-units|intentionally-unsurfaced
classical.linguistic.unit.compose|medium|intentionally-unsurfaced
classical.linguistic.unit.compose|resulting-unity|intentionally-unsurfaced
classical.linguistic.unit.compose|sequence-order|intentionally-unsurfaced
classical.linguistic.unit.compose|structure-pattern|intentionally-unsurfaced
classical.linguistic.unit.discontinuity.validate|constituent-roles|intentionally-unsurfaced
classical.linguistic.unit.discontinuity.validate|functional-cohesion|intentionally-unsurfaced
classical.linguistic.unit.discontinuity.validate|nonjuxtaposed-topology|intentionally-unsurfaced
classical.linguistic.unit.discontinuity.validate|restricted-applicability|intentionally-unsurfaced
classical.linguistic.unit.discontinuity.validate|typed-unit-kind|intentionally-unsurfaced
classical.morpheme.affix.function.classify|affix-position|intentionally-unsurfaced
classical.morpheme.affix.function.classify|functional-type|intentionally-unsurfaced
classical.morpheme.affix.function.classify|information-role|intentionally-unsurfaced
classical.morpheme.affix.function.classify|stem-boundary|intentionally-unsurfaced
classical.morpheme.affix.position.classify|affix-position-class|intentionally-unsurfaced
classical.morpheme.affix.position.classify|minor-morpheme|intentionally-unsurfaced
classical.morpheme.affix.position.classify|sequence-position|intentionally-unsurfaced
classical.morpheme.combinatorial-type.classify|affixal-status|intentionally-unsurfaced
classical.morpheme.combinatorial-type.classify|major-minor-type|intentionally-unsurfaced
classical.morpheme.combinatorial-type.classify|meaningful-unit|intentionally-unsurfaced
classical.morpheme.combinatorial-type.classify|representational-center|intentionally-unsurfaced
classical.morpheme.inflectional-affix.demote|inflectional-affix|intentionally-unsurfaced
classical.morpheme.inflectional-affix.demote|process-kind|interactive-choice
classical.morpheme.inflectional-affix.demote|source-boundary|intentionally-unsurfaced
classical.morpheme.inflectional-affix.demote|target-boundary|intentionally-unsurfaced
classical.morpheme.inflectional-dyad.analyze|dyad-structure|intentionally-unsurfaced
classical.morpheme.inflectional-dyad.analyze|first-affix|intentionally-unsurfaced
classical.morpheme.inflectional-dyad.analyze|inseparable-sequence|intentionally-unsurfaced
classical.morpheme.inflectional-dyad.analyze|second-affix|intentionally-unsurfaced
classical.morpheme.inflectional-paradigm.classify|common-stem|intentionally-unsurfaced
classical.morpheme.inflectional-paradigm.classify|inflectional-affix|intentionally-unsurfaced
classical.morpheme.inflectional-paradigm.classify|stem-class|intentionally-unsurfaced
classical.morpheme.inflectional-paradigm.classify|variant-set|intentionally-unsurfaced
classical.morpheme.meaningful-rank.hierarchy.validate|lower-stage-dependency|intentionally-unsurfaced
classical.morpheme.meaningful-rank.hierarchy.validate|major-type|intentionally-unsurfaced
classical.morpheme.meaningful-rank.hierarchy.validate|minor-type|intentionally-unsurfaced
classical.morpheme.meaningful-rank.hierarchy.validate|rank-stages|intentionally-unsurfaced
classical.morpheme.meaningful-unit.classify|candidate-kind|intentionally-unsurfaced
classical.morpheme.meaningful-unit.classify|meaningful-family|intentionally-unsurfaced
classical.morpheme.silent.contrast.validate|corresponding-position|intentionally-unsurfaced
classical.morpheme.silent.contrast.validate|related-category|intentionally-unsurfaced
classical.morpheme.silent.contrast.validate|silent-candidate-kind|intentionally-unsurfaced
classical.morpheme.silent.contrast.validate|similar-structure|intentionally-unsurfaced
classical.morpheme.silent.contrast.validate|sounded-counterpart|intentionally-unsurfaced
classical.morpheme.syllable.separate|coterminality|intentionally-unsurfaced
classical.morpheme.syllable.separate|meaningful-unit|intentionally-unsurfaced
classical.morpheme.syllable.separate|rank-contrast|intentionally-unsurfaced
classical.morpheme.syllable.separate|syllable-rank|intentionally-unsurfaced
classical.nnc.exotl.interpret|compositional-meaning|intentionally-unsurfaced
classical.nnc.exotl.interpret|nominal-clause|intentionally-unsurfaced
classical.nnc.exotl.interpret|semantic-weighting|intentionally-unsurfaced
classical.nnc.exotl.interpret|silent-subject|intentionally-unsurfaced
classical.nnc.king-praise-role-contrast.interpret|actual-forms|intentionally-unsurfaced
classical.nnc.king-praise-role-contrast.interpret|corrected-meaning|intentionally-unsurfaced
classical.nnc.king-praise-role-contrast.interpret|participant-roles|intentionally-unsurfaced
classical.nnc.king-praise-role-contrast.interpret|subject-possessor-relation|intentionally-unsurfaced
classical.nnc.king-praise-role-contrast.interpret|substituted-forms|intentionally-unsurfaced
classical.nuclear-clause.morphosyntax.validate|morphosyntax-domain|intentionally-unsurfaced
classical.nuclear-clause.morphosyntax.validate|nuclear-clause|intentionally-unsurfaced
classical.nuclear-clause.morphosyntax.validate|predicate|intentionally-unsurfaced
classical.nuclear-clause.morphosyntax.validate|subject|intentionally-unsurfaced
classical.particle.lexical-distinction.authorize|dictionary-head|intentionally-unsurfaced
classical.particle.lexical-distinction.authorize|liaison|intentionally-unsurfaced
classical.particle.lexical-distinction.authorize|particle-identity|intentionally-unsurfaced
classical.particle.lexical-distinction.authorize|particle-sequence|intentionally-unsurfaced
classical.sentence.tleh-admonitory-pair.interpret|expected-answer|intentionally-unsurfaced
classical.sentence.tleh-admonitory-pair.interpret|honored-subject|intentionally-unsurfaced
classical.sentence.tleh-admonitory-pair.interpret|nonhuman-object|intentionally-unsurfaced
classical.sentence.tleh-admonitory-pair.interpret|question-forms|intentionally-unsurfaced
classical.sentence.tleh-admonitory-pair.interpret|rhetorical-force|intentionally-unsurfaced
classical.sentence.tleh-closing-vocative.interpret|closing-question|intentionally-unsurfaced
classical.sentence.tleh-closing-vocative.interpret|honored-subject|intentionally-unsurfaced
classical.sentence.tleh-closing-vocative.interpret|pragmatic-force|intentionally-unsurfaced
classical.sentence.tleh-closing-vocative.interpret|translation-boundary|intentionally-unsurfaced
classical.sentence.tleh-closing-vocative.interpret|vocatives|intentionally-unsurfaced
classical.source.phonological-identity.validate|dictionary-collapse|intentionally-unsurfaced
classical.source.phonological-identity.validate|glottal-stop|intentionally-unsurfaced
classical.source.phonological-identity.validate|lexical-identity|intentionally-unsurfaced
classical.source.phonological-identity.validate|vowel-length|intentionally-unsurfaced
classical.structure.conceptual-plane.separate|form-class-plane|intentionally-unsurfaced
classical.structure.conceptual-plane.separate|function-unit-plane|intentionally-unsurfaced
classical.structure.conceptual-plane.separate|lexical-item-plane|intentionally-unsurfaced
classical.structure.conceptual-plane.separate|nonintermingling|intentionally-unsurfaced
classical.structure.conceptual-plane.separate|participant-role-plane|intentionally-unsurfaced
classical.structure.group.compose|group-result|intentionally-unsurfaced
classical.structure.group.compose|group-shape|interactive-choice
classical.structure.group.compose|nuclear-clauses|intentionally-unsurfaced
classical.structure.group.compose|particles|intentionally-unsurfaced
classical.structure.level-distribution.validate|cross-level-distribution|intentionally-unsurfaced
classical.structure.level-distribution.validate|morphological-level|intentionally-unsurfaced
classical.structure.level-distribution.validate|morphosyntactical-level|intentionally-unsurfaced
classical.structure.level-distribution.validate|syntactical-level|intentionally-unsurfaced
classical.structure.meaning-bearing-unit.classify|meaning-component|intentionally-unsurfaced
classical.structure.meaning-bearing-unit.classify|unit|intentionally-unsurfaced
classical.structure.meaning-bearing-unit.classify|unit-rank|intentionally-unsurfaced
classical.structure.meaningful-rank.downgrade|downgrade-mode|interactive-choice
classical.structure.meaningful-rank.downgrade|hierarchy|intentionally-unsurfaced
classical.structure.meaningful-rank.downgrade|higher-rank|intentionally-unsurfaced
classical.structure.meaningful-rank.downgrade|lower-rank|intentionally-unsurfaced
classical.structure.meaningful-rank.source-or-upgrade.validate|hierarchy|intentionally-unsurfaced
classical.structure.meaningful-rank.source-or-upgrade.validate|source-rank|intentionally-unsurfaced
classical.structure.meaningful-rank.source-or-upgrade.validate|target-rank|intentionally-unsurfaced
classical.structure.meaningful-rank.source-or-upgrade.validate|transition-mode|interactive-choice
classical.structure.participant-role.analyze|entitive-function-unit|intentionally-unsurfaced
classical.structure.participant-role.analyze|event-relation|intentionally-unsurfaced
classical.structure.participant-role.analyze|participant|intentionally-unsurfaced
classical.structure.participant-role.analyze|participant-role|intentionally-unsurfaced
classical.structure.post-stem-unit.classify|nuclear-clause-rank|intentionally-unsurfaced
classical.structure.post-stem-unit.classify|rank-result|intentionally-unsurfaced
classical.structure.post-stem-unit.classify|unit-disposition|intentionally-unsurfaced
classical.structure.root.major-morpheme.validate|major-type|intentionally-unsurfaced
classical.structure.root.major-morpheme.validate|major-unit-count|intentionally-unsurfaced
classical.structure.root.major-morpheme.validate|root-structure|intentionally-unsurfaced
classical.structure.root.meaning-rank.upgrade|rank-upgrade|intentionally-unsurfaced
classical.structure.root.meaning-rank.upgrade|root|intentionally-unsurfaced
classical.structure.root.meaning-rank.upgrade|source-meaning|intentionally-unsurfaced
classical.structure.root.meaning-rank.upgrade|target-meaning|intentionally-unsurfaced
classical.structure.stem-transition-zone.validate|derivation-boundary|intentionally-unsurfaced
classical.structure.stem-transition-zone.validate|inflection-onset|intentionally-unsurfaced
classical.structure.stem-transition-zone.validate|post-stem-unit|intentionally-unsurfaced
classical.structure.stem-transition-zone.validate|stem|intentionally-unsurfaced
classical.structure.stem.compound|compound-relation|interactive-choice
classical.structure.stem.compound|first-stem|intentionally-unsurfaced
classical.structure.stem.compound|second-stem|intentionally-unsurfaced
classical.structure.stem.compound|stem-result|intentionally-unsurfaced
classical.structure.stem.form-directly|base-unit|intentionally-unsurfaced
classical.structure.stem.form-directly|derivational-affix|intentionally-unsurfaced
classical.structure.stem.form-directly|formation-kind|interactive-choice
classical.structure.stem.form-directly|stem-result|intentionally-unsurfaced
classical.structure.stem.form-via-stock|derivational-suffix|intentionally-unsurfaced
classical.structure.stem.form-via-stock|root|intentionally-unsurfaced
classical.structure.stem.form-via-stock|stem-result|intentionally-unsurfaced
classical.structure.stem.form-via-stock|stock-stage|intentionally-unsurfaced
classical.structure.stem.lexical-status.classify|lexical-status|intentionally-unsurfaced
classical.structure.stem.lexical-status.classify|lexicon-membership|intentionally-unsurfaced
classical.structure.stem.lexical-status.classify|stem|intentionally-unsurfaced
classical.structure.syntax-domain-onset.validate|group-rank|intentionally-unsurfaced
classical.structure.syntax-domain-onset.validate|group-result|intentionally-unsurfaced
classical.structure.syntax-domain-onset.validate|syntax-domain|intentionally-unsurfaced
classical.verbstem.lexicon.authorize|canonical-meaning|intentionally-unsurfaced
classical.verbstem.lexicon.authorize|dictionary-head|intentionally-unsurfaced
classical.verbstem.lexicon.authorize|valence|intentionally-unsurfaced
classical.verbstem.lexicon.authorize|verbstem-identity|intentionally-unsurfaced
classical.verbstem.object-embed.validate|embedded-nounstem|intentionally-unsurfaced
classical.verbstem.object-embed.validate|object-prefix|intentionally-unsurfaced
classical.verbstem.object-embed.validate|stem-boundary|intentionally-unsurfaced
classical.verbstem.object-embed.validate|valence|intentionally-unsurfaced
classical.vnc.compound.widowhood.interpret|compound-verbstem|intentionally-unsurfaced
classical.vnc.compound.widowhood.interpret|participant-sex|intentionally-unsurfaced
classical.vnc.compound.widowhood.interpret|subject-person-number|intentionally-unsurfaced
classical.vnc.compound.widowhood.interpret|widowhood-meaning|intentionally-unsurfaced
clause:adverbial-adjunction|adjoined-clause|intentionally-unsurfaced
clause:adverbial-adjunction|adjunctor|intentionally-unsurfaced
clause:adverbial-adjunction|adverbial-principal|intentionally-unsurfaced
clause:adverbial-adjunction|clause-position|interactive-choice
clause:adverbial-adjunction|relation-scope|interactive-choice
clause:comparison|comparand|intentionally-unsurfaced
clause:comparison|comparison-relation|intentionally-unsurfaced
clause:comparison|degree-strategy|interactive-choice
clause:comparison|dimension|intentionally-unsurfaced
clause:comparison|standard|intentionally-unsurfaced
clause:comparison|superlative-strategy|interactive-choice
clause:composition|clause-rank|interactive-choice
clause:composition|complement-relation|interactive-choice
clause:composition|conjunction-relation|interactive-choice
clause:composition|parallel-structure|interactive-choice
clause:composition|reference-graph|intentionally-unsurfaced
clause:composition|relation-marker|interactive-choice
concept:classification|concept-authority-rejection|intentionally-unsurfaced
concept:classification|concept-rank-validation|intentionally-unsurfaced
concept:classification|non-generative-projection|intentionally-unsurfaced
concept:classification|read-only-classification|intentionally-unsurfaced
concept:classification|typed-concept-source|intentionally-unsurfaced
concept.structure.adjunctive-governance.analyze|adjunct|intentionally-unsurfaced
concept.structure.adjunctive-governance.analyze|adjunctor|intentionally-unsurfaced
concept.structure.adjunctive-governance.analyze|agreement-case|intentionally-unsurfaced
concept.structure.adjunctive-governance.analyze|function-unit-filler|intentionally-unsurfaced
concept.structure.adjunctive-governance.analyze|governor|intentionally-unsurfaced
concept.structure.adjunctive-governance.analyze|modification|intentionally-unsurfaced
concept.structure.adjunctive-governance.analyze|predicate-structure|intentionally-unsurfaced
concept.structure.adjunctive-governance.analyze|relation-structure|intentionally-unsurfaced
concept.structure.conjunctive-governance.analyze|conjunct-filler-class|intentionally-unsurfaced
concept.structure.conjunctive-governance.analyze|conjuncts|intentionally-unsurfaced
concept.structure.conjunctive-governance.analyze|equal-governance|intentionally-unsurfaced
concept.structure.governance-taxonomy.analyze|function-unit-coupling|intentionally-unsurfaced
concept.structure.governance-taxonomy.analyze|general-type|intentionally-unsurfaced
concept.structure.governance-taxonomy.analyze|governance|intentionally-unsurfaced
concept.structure.governance-taxonomy.analyze|governance-subtype|intentionally-unsurfaced
concept.structure.principles.analyze|concatenation|intentionally-unsurfaced
concept.structure.principles.analyze|structure-facet|intentionally-unsurfaced
concept.structure.principles.analyze|structuring-principles|intentionally-unsurfaced
concept.structure.principles.analyze|unit-closure|intentionally-unsurfaced
concept.word.sentence-fragment.analyze|sentence-fragment|intentionally-unsurfaced
concept.word.sentence-fragment.analyze|simple-word-exception|intentionally-unsurfaced
concept.word.sentence-fragment.analyze|word-rank|intentionally-unsurfaced
grammar:nominal-construction|affective-nnc|interactive-choice
grammar:nominal-construction|cardinal-number|interactive-choice
grammar:nominal-construction|compound-nnc|interactive-choice
grammar:nominal-construction|measure-modification|interactive-choice
grammar:nominal-construction|nominal-embed|interactive-choice
grammar:nominal-construction|vacant-state|intentionally-unsurfaced
nnc:adjectival-modification|adjunctor|interactive-choice
nnc:adjectival-modification|compound-head-target|interactive-choice
nnc:adjectival-modification|modification-topology|interactive-choice
nnc:adjectival-modification|modifier-head-order|interactive-choice
nnc:adjectival-modification|transitive-reference-contact|interactive-choice
nnc:adverbial|adverbial-context|interactive-choice
nnc:adverbial|adverbial-source|intentionally-unsurfaced
nnc:adverbial|adverbialized-subject|intentionally-unsurfaced
nnc:adverbial|clause-rank|interactive-choice
nnc:deverbal-construction|double-nucleus-ownerhood|interactive-choice
nnc:deverbal-construction|external-object|interactive-choice
nnc:deverbal-construction|nominalization-family|interactive-choice
nnc:deverbal-construction|patientive-family|interactive-choice
nnc:deverbal-construction|source-stage|intentionally-unsurfaced
nnc:deverbal-construction|source-voice|intentionally-unsurfaced
nnc:diagram|nnc-slot-projection|intentionally-unsurfaced
nnc:diagram|predicate-constituent|intentionally-unsurfaced
nnc:diagram|subject-constituent|intentionally-unsurfaced
nnc:ordinary|formula-projection|intentionally-unsurfaced
nnc:ordinary|lexical-alternative|intentionally-unsurfaced
nnc:ordinary|lexical-license|intentionally-unsurfaced
nnc:ordinary|nnc-state|interactive-choice
nnc:ordinary|nounstem-class|interactive-choice
nnc:ordinary|nounstem-source|intentionally-unsurfaced
nnc:ordinary|number-dyad|intentionally-unsurfaced
nnc:ordinary|ordinary-nnc-condition|intentionally-unsurfaced
nnc:ordinary|polarity|interactive-choice
nnc:ordinary|possessive-formation|intentionally-unsurfaced
nnc:ordinary|possessor-person-number|interactive-choice
nnc:ordinary|possessor-reduplication|interactive-choice
nnc:ordinary|possessor-st2-allomorph|intentionally-unsurfaced
nnc:ordinary|possessor-st2-boundary-context|intentionally-unsurfaced
nnc:ordinary|predicate-formation|interactive-choice
nnc:ordinary|referential-animacy|intentionally-unsurfaced
nnc:ordinary|sentence-composition|intentionally-unsurfaced
nnc:ordinary|sentence-force|interactive-choice
nnc:ordinary|source-stem|intentionally-unsurfaced
nnc:ordinary|state-availability|intentionally-unsurfaced
nnc:ordinary|state-reentry|intentionally-unsurfaced
nnc:ordinary|stem-relation|interactive-choice
nnc:ordinary|subject-person-number|interactive-choice
nnc:ordinary|target-stem|intentionally-unsurfaced
nnc:ordinary|use-stem-shape|intentionally-unsurfaced
nnc:ordinary|written-boundary-realization|intentionally-unsurfaced
nnc:personal-name|inner-clause|intentionally-unsurfaced
nnc:personal-name|name-source-family|interactive-choice
nnc:personal-name|outer-number|intentionally-unsurfaced
nnc:personal-name|outer-subject|interactive-choice
nnc:personal-name|reranking|interactive-choice
nnc:personal-name|sentence-operation|interactive-choice
nnc:place-gentilic|closed-title|intentionally-unsurfaced
nnc:place-gentilic|collectivity|interactive-choice
nnc:place-gentilic|gentilic-formation|interactive-choice
nnc:place-gentilic|place-formation|interactive-choice
nnc:place-gentilic|place-source|intentionally-unsurfaced
nnc:place-gentilic|profession|intentionally-unsurfaced
nnc:pronominal|clause-position|intentionally-unsurfaced
nnc:pronominal|discourse-role|intentionally-unsurfaced
nnc:pronominal|formula-projection|intentionally-unsurfaced
nnc:pronominal|lexical-restriction|intentionally-unsurfaced
nnc:pronominal|matrix-family|intentionally-unsurfaced
nnc:pronominal|matrix-form|intentionally-unsurfaced
nnc:pronominal|number-realization|intentionally-unsurfaced
nnc:pronominal|polarity|interactive-choice
nnc:pronominal|predicate-pluralization|intentionally-unsurfaced
nnc:pronominal|pronominal-context|intentionally-unsurfaced
nnc:pronominal|pronominal-family|intentionally-unsurfaced
nnc:pronominal|pronominal-source|intentionally-unsurfaced
nnc:pronominal|quantitive-embed|intentionally-unsurfaced
nnc:pronominal|quantitive-matrix|intentionally-unsurfaced
nnc:pronominal|sentence-force|interactive-choice
nnc:pronominal|subject-person-number|intentionally-unsurfaced
nnc:pronominal|written-boundary-realization|intentionally-unsurfaced
nnc:relational|possessor-structure|interactive-choice
nnc:relational|relation-family|interactive-choice
nnc:relational|relational-result|intentionally-unsurfaced
nnc:relational|relational-source|intentionally-unsurfaced
nnc:relational|voice-source|intentionally-unsurfaced
nnc:sentence-surface|contextual-interpretation|intentionally-unsurfaced
nnc:sentence-surface|nnc-state|intentionally-unsurfaced
nnc:sentence-surface|polarity|interactive-choice
nnc:sentence-surface|sentence-force|interactive-choice
orthography:transcription|orthographic-realization|intentionally-unsurfaced
orthography:transcription|phonological-boundary|intentionally-unsurfaced
orthography:transcription|transcription-source|intentionally-unsurfaced
particle:result|particle-function|intentionally-unsurfaced
particle:result|particle-identity|intentionally-unsurfaced
particle:result|particle-placement|intentionally-unsurfaced
particle:result|particle-semantic-marker|intentionally-unsurfaced
sentence:adverbial-adjunction|clause-scope|intentionally-unsurfaced
sentence:adverbial-adjunction|sentence-adverbial|intentionally-unsurfaced
sentence:adverbial-adjunction|sentence-position|intentionally-unsurfaced
sentence:particle-adjunction|honorificization|interactive-choice
sentence:particle-adjunction|sentence-particle|intentionally-unsurfaced
sentence:particle-adjunction|sentence-position|intentionally-unsurfaced
sentence:supplementation|clause-order|interactive-choice
sentence:supplementation|principal-clause|intentionally-unsurfaced
sentence:supplementation|reported-speech|intentionally-unsurfaced
sentence:supplementation|shared-referent|intentionally-unsurfaced
sentence:supplementation|supplement-clause|intentionally-unsurfaced
sentence:supplementation|supplement-relation|interactive-choice
sentence:supplementation|vocative|intentionally-unsurfaced
vnc:application|coordinate-projection|internal-support
vnc:application|operation-plan|internal-support
vnc:application|selected-result|intentionally-unsurfaced
vnc:application|source-analysis|intentionally-unsurfaced
vnc:denominal|denominal-operation|interactive-choice
vnc:denominal|denominal-source-family|intentionally-unsurfaced
vnc:denominal|finite-participants|interactive-choice
vnc:denominal|source-rank|intentionally-unsurfaced
vnc:denominal|target-valence|intentionally-unsurfaced
vnc:denominal|target-verbstem-class|interactive-choice
vnc:derivational-operation|derivation-family|interactive-choice
vnc:derivational-operation|operation-order|intentionally-unsurfaced
vnc:derivational-operation|source-participants|intentionally-unsurfaced
vnc:derivational-operation|target-participants|intentionally-unsurfaced
vnc:diagram|object-prefix|intentionally-unsurfaced
vnc:diagram|predicate-constituent|intentionally-unsurfaced
vnc:diagram|subject-circumfix|intentionally-unsurfaced
vnc:diagram|vnc-slot-projection|intentionally-unsurfaced
vnc:finite-slot|finite-slot-order|intentionally-unsurfaced
vnc:finite-slot|mood|interactive-choice
vnc:finite-slot|subject-person-number|intentionally-unsurfaced
vnc:finite-slot|tense|interactive-choice
vnc:finite-surface|finite-boundary-realization|intentionally-unsurfaced
vnc:finite-surface|selected-formula|intentionally-unsurfaced
vnc:finite-surface|word-surface|intentionally-unsurfaced
vnc:nuclear-clause|basal-unit|intentionally-unsurfaced
vnc:nuclear-clause|participant-structure|intentionally-unsurfaced
vnc:nuclear-clause|predicate-stem|intentionally-unsurfaced
vnc:nuclear-clause|source-transitivity|intentionally-unsurfaced
vnc:ordered-voice-application|finite-boundary-realization|intentionally-unsurfaced
vnc:ordered-voice-application|participant-transformation|intentionally-unsurfaced
vnc:ordered-voice-application|selected-formula|intentionally-unsurfaced
vnc:ordered-voice-application|source-voice|intentionally-unsurfaced
vnc:ordered-voice-application|target-voice|intentionally-unsurfaced
vnc:ordered-voice-application|voice-operation-order|interactive-choice
vnc:ordered-voice-application|word-surface|intentionally-unsurfaced
vnc:ordered-voice-chain|participant-transformation|intentionally-unsurfaced
vnc:ordered-voice-chain|source-voice|intentionally-unsurfaced
vnc:ordered-voice-chain|target-voice|intentionally-unsurfaced
vnc:ordered-voice-chain|voice-operation-order|interactive-choice
vnc:sentence-result|authorized-vnc-result|intentionally-unsurfaced
vnc:sentence-result|sentence-composition|intentionally-unsurfaced
vnc:sentence-result|sentence-realization|intentionally-unsurfaced
vnc:source-selection|embed-matrix-structure|intentionally-unsurfaced
vnc:source-selection|source-selection|intentionally-unsurfaced
vnc:source-selection|source-stem|intentionally-unsurfaced
vnc:transitive-object|object-kind|intentionally-unsurfaced
vnc:transitive-object|object-person-number|intentionally-unsurfaced
vnc:transitive-object|object-prefix|intentionally-unsurfaced
vnc:transitive-object|valence|intentionally-unsurfaced
vnc:verbstem-class|finite-realization|intentionally-unsurfaced
vnc:verbstem-class|mood-tense-allomorphy|intentionally-unsurfaced
vnc:verbstem-class|stem-alternation|intentionally-unsurfaced
vnc:verbstem-class|verbstem-class|intentionally-unsurfaced
`.trim().split("\n").map(row => Object.freeze(row.split("|"))));

const CLASSICAL_SOURCE_GRAMMAR_RESULT_OUTPUT_ROWS = Object.freeze(`
concept:classification|scalar|analysis-readout
orthography:transcription|scalar|analysis-readout
vnc:nuclear-clause|scalar|analysis-readout
vnc:finite-slot|scalar|internal-support
vnc:finite-surface|scalar|public-result
vnc:sentence-result|scalar|public-result
nnc:ordinary|scalar|public-result
nnc:ordinary|prepared-plan|internal-support
nnc:ordinary|coordinate-projection|public-result
nnc:sentence-surface|scalar|public-result
nnc:diagram|scalar|analysis-readout
vnc:diagram|scalar|analysis-readout
sentence:adverbial-adjunction|scalar|composed-projection
sentence:particle-adjunction|scalar|composed-projection
particle:result|scalar|composed-projection
vnc:source-selection|scalar|internal-support
vnc:ordered-voice-chain|scalar|analysis-readout
vnc:ordered-voice-application|scalar|public-result
nnc:pronominal|scalar|public-result
nnc:pronominal|prepared-plan|internal-support
nnc:pronominal|coordinate-projection|public-result
vnc:derivational-operation|scalar|composed-projection
vnc:application|scalar|public-result
vnc:application|prepared-plan|internal-support
vnc:application|coordinate-projection|public-result
vnc:transitive-object|scalar|internal-support
vnc:verbstem-class|scalar|internal-support
sentence:supplementation|scalar|public-result
grammar:nominal-construction|scalar|public-result
grammar:nominal-construction|prepared-plan|internal-support
grammar:nominal-construction|coordinate-projection|public-result
nnc:deverbal-construction|scalar|public-result
nnc:deverbal-construction|prepared-plan|internal-support
nnc:deverbal-construction|coordinate-projection|public-result
nnc:adjectival-modification|scalar|public-result
nnc:adverbial|scalar|public-result
nnc:adverbial|source-preparation|internal-support
nnc:adverbial|prepared-plan|internal-support
nnc:adverbial|coordinate-projection|public-result
nnc:relational|scalar|public-result
nnc:relational|prepared-plan|internal-support
nnc:relational|coordinate-projection|public-result
nnc:place-gentilic|scalar|public-result
nnc:place-gentilic|prepared-plan|internal-support
nnc:place-gentilic|coordinate-projection|public-result
clause:adverbial-adjunction|scalar|public-result
clause:composition|scalar|public-result
clause:comparison|scalar|public-result
vnc:denominal|scalar|public-result
vnc:denominal|prepared-plan|internal-support
vnc:denominal|coordinate-projection|public-result
nnc:personal-name|scalar|public-result
nnc:personal-name|prepared-plan|internal-support
nnc:personal-name|coordinate-projection|public-result
nnc:personal-name|sentence-operation|composed-projection
`.trim().split("\n").map(row => Object.freeze(row.split("|"))));

const CLASSICAL_SOURCE_GRAMMAR_RESULT_AXIS_STAGES = Object.freeze({
  "interactive-choice": "grammar",
  "intentionally-unsurfaced": "grammar",
  "internal-support": "internal"
});

const CLASSICAL_SOURCE_GRAMMAR_RESULT_OUTPUT_STAGES = Object.freeze({
  "public-result": "result",
  "analysis-readout": "result-analysis",
  "composed-projection": "result-continuation",
  "internal-support": "internal"
});

function buildClassicalSourceGrammarResultSurfaceAtom({
  atomPrefix = "",
  atomKind = "",
  operationId = "",
  itemId = "",
  disposition = "",
  stage = ""
} = {}) {
  const atomId = `${atomPrefix}-${operationId.replace(/:/gu, "-")}--${itemId}`;
  const isPublic = [
    "interactive-choice",
    "public-result",
    "analysis-readout",
    "composed-projection"
  ].includes(disposition);
  return Object.freeze({
    atomId,
    atomKind,
    operationId,
    ...(atomKind === "axis" ? { axisId: itemId } : { outputKind: itemId }),
    disposition,
    status: "bound",
    authority: CLASSICAL_SOURCE_GRAMMAR_RESULT_AUTHORITY,
    binding: Object.freeze({
      atomId,
      operationId,
      stage,
      public: isPublic
    }),
    proof: Object.freeze(isPublic
      ? {
          boundary: "public",
          focusedReceiptId: `focused:${atomId}`,
          liveReceiptId: `live:${atomId}`
        }
      : {
          boundary: "private",
          executionReceiptId: `execution:${atomId}`,
          inertnessReceiptId: `inertness:${atomId}`
        })
  });
}

const CLASSICAL_SOURCE_GRAMMAR_RESULT_SURFACE_INVENTORY = Object.freeze({
  kind: "classical-source-grammar-result-surface-inventory",
  version: 2,
  authority: CLASSICAL_SOURCE_GRAMMAR_RESULT_AUTHORITY,
  axes: Object.freeze(CLASSICAL_SOURCE_GRAMMAR_RESULT_AXIS_ROWS.map(
    ([operationId, axisId, disposition]) =>
      buildClassicalSourceGrammarResultSurfaceAtom({
        atomPrefix: "CAA",
        atomKind: "axis",
        operationId,
        itemId: axisId,
        disposition,
        stage: CLASSICAL_SOURCE_GRAMMAR_RESULT_AXIS_STAGES[disposition] || ""
      })
  )),
  outputs: Object.freeze(CLASSICAL_SOURCE_GRAMMAR_RESULT_OUTPUT_ROWS.map(
    ([operationId, outputKind, disposition]) =>
      buildClassicalSourceGrammarResultSurfaceAtom({
        atomPrefix: "CAO",
        atomKind: "output",
        operationId,
        itemId: outputKind,
        disposition,
        stage: CLASSICAL_SOURCE_GRAMMAR_RESULT_OUTPUT_STAGES[disposition] || ""
      })
  ))
});

export function getClassicalSourceGrammarResultSurfaceInventory() {
  return CLASSICAL_SOURCE_GRAMMAR_RESULT_SURFACE_INVENTORY;
}

export function createUiStateModule(targetObject = globalThis) {
    function getSubjectPersonSelections() {
      const selections = [];
      targetObject.SUBJECT_PERSON_NUMBER_ORDER.forEach(number => {
        targetObject.SUBJECT_PERSON_GROUPS.forEach(group => {
          const selection = group[number];
          if (selection) {
            selections.push({
              group,
              selection,
              number
            });
          }
        });
      });
      return selections;
    }
    function getSubjectCombinationId(subjectPrefix = "", subjectSuffix = "") {
      const match = targetObject.SUBJECT_COMBINATIONS.find(entry => (entry?.subjectPrefix || "") === String(subjectPrefix || "") && (entry?.subjectSuffix || "") === String(subjectSuffix || ""));
      return match?.id || "";
    }
    function getStateResultFrame(result = null) {
      const candidate = result?.grammarFrame && typeof result.grammarFrame === "object"
        ? result.grammarFrame
        : result?.frames && typeof result.frames === "object"
          ? result.frames
          : null;
      return candidate
        && typeof targetObject.isIssuedGrammarFrame === "function"
        && targetObject.isIssuedGrammarFrame(candidate)
        ? candidate
        : null;
    }
    function getStateFrameResultSurfaceForms(result = null) {
      const grammarFrame = getStateResultFrame(result);
      return grammarFrame
        && typeof targetObject.getIssuedGrammarFrameCanonicalSurfaceForms
          === "function"
        ? targetObject.getIssuedGrammarFrameCanonicalSurfaceForms(grammarFrame)
        : [];
    }
    function getStateResultSurfaceForms(result = null) {
      return getStateFrameResultSurfaceForms(result);
    }
    function getStateResultDisplaySurface(result = null) {
      return getStateResultSurfaceForms(result).join(" / ");
    }
    function getNominalSubjectSelectionEntries({
      mode = getActiveTenseMode(),
      tenseValue = ""
    } = {}) {
      const baseSelections = getSubjectPersonSelections().map(({
        group,
        selection,
        number
      }) => ({
        group,
        selection,
        displaySelection: selection,
        number,
        toggleId: getSubjectCombinationId(selection?.subjectPrefix || "", selection?.subjectSuffix || ""),
        displayPersonSubLabel: "",
        useReduplicatedSingularSurface: false
      }));
      if (mode !== targetObject.TENSE_MODE.adjetivo) {
        return baseSelections;
      }
      const adjectiveSelections = [];
      baseSelections.forEach(entry => {
        const singularGroupSelection = entry.group?.singular || entry.selection;
        const pushDistributiveEntry = (selectionOverride, displayPersonSubLabel) => {
          adjectiveSelections.push({
            ...entry,
            selection: selectionOverride,
            displayPersonSubLabel,
            useReduplicatedSingularSurface: true
          });
        };
        const isFirstPlural = entry.selection?.subjectPrefix === "ti" && entry.selection?.subjectSuffix === "t";
        const isSecondPlural = entry.selection?.subjectPrefix === "an" && entry.selection?.subjectSuffix === "t";
        const isThirdPlural = entry.selection?.subjectPrefix === "" && entry.selection?.subjectSuffix === "t";
        if (isFirstPlural) {
          adjectiveSelections.push(entry);
          pushDistributiveEntry({
            subjectPrefix: "ti",
            subjectSuffix: ""
          }, targetObject.ADJECTIVE_DISTRIBUTIVE_PLURAL_SUB_LABELS.first);
          return;
        }
        if (isSecondPlural) {
          adjectiveSelections.push(entry);
          pushDistributiveEntry({
            subjectPrefix: "an",
            subjectSuffix: ""
          }, targetObject.ADJECTIVE_DISTRIBUTIVE_PLURAL_SUB_LABELS.second);
          return;
        }
        if (!isThirdPlural) {
          adjectiveSelections.push(entry);
          return;
        }
        adjectiveSelections.push(entry);
        pushDistributiveEntry(singularGroupSelection, targetObject.ADJECTIVE_DISTRIBUTIVE_PLURAL_SUB_LABELS.thirdHuman);
      });
      return adjectiveSelections;
    }
    function getPersonGroupLabel(group, classicalLocaleContext) {
      if (!group) {
        return "";
      }
      const labelKey = group.labelKey || group.id || "";
      const labelEntry = labelKey ? targetObject.PERSON_GROUP_LABELS[labelKey] : null;
      const fallback = getLocalizedLabel(group, classicalLocaleContext, "");
      return getLocalizedLabel(labelEntry, classicalLocaleContext, fallback);
    }
    function getPersonSubLabel(selection, classicalLocaleContext) {
      if (!selection) {
        return "";
      }
      const labelKey = selection.personSubKey || selection.labelKey || selection.id || "";
      const labelEntry = labelKey ? targetObject.PERSON_SUB_LABELS[labelKey] : null;
      const fallback = getLocalizedLabel(selection, classicalLocaleContext, "");
      return getLocalizedLabel(labelEntry, classicalLocaleContext, fallback);
    }
    function getSubjectPersonLabel(group, selection, classicalLocaleContext) {
      const baseLabel = getPersonGroupLabel(group, classicalLocaleContext);
      if (!selection) {
        return baseLabel;
      }
      const numberKey = ["h", "eh", "ān", "in"].includes(selection.subjectSuffix) ? "plural" : "singular";
      const numberLabels = targetObject.NUMBER_LABELS[numberKey] || {};
      const numberLabel = numberLabels.es || numberKey;
      return `${baseLabel} ${numberLabel}`;
    }
    function getLocalizedLabel(entry, classicalLocaleContext, fallback = "") {
      if (!entry) {
        return fallback;
      }
      if (typeof entry === "string") {
        return entry || fallback;
      }
      if (typeof entry === "object") {
        const value = entry.labelEs;
        return value || fallback;
      }
      return fallback;
    }
    function getToggleLabel(key, classicalLocaleContext, fallback = "") {
      return getLocalizedLabel(targetObject.TOGGLE_LABELS[key], classicalLocaleContext, fallback);
    }
    function getPlaceholderLabel(key, classicalLocaleContext, fallback = "") {
      return getLocalizedLabel(targetObject.PLACEHOLDER_LABELS[key], classicalLocaleContext, fallback);
    }
    function getVerbBlockLabel(key, classicalLocaleContext, fallback = "") {
      return getLocalizedLabel(targetObject.VERB_BLOCK_LABELS[key], classicalLocaleContext, fallback);
    }
    function getClassicalLocaleContext() {
      return false;
    }
    function getLocalizedDescription(entry, classicalLocaleContext) {
      if (!entry) {
        return "";
      }
      if (typeof entry === "string") {
        return entry;
      }
      if (typeof entry === "object") {
        return entry.labelEs || "";
      }
      return "";
    }
    function getPretUniversalClassDetail(tenseValue) {
      const classKey = targetObject.PRET_UNIVERSAL_CLASS_BY_TENSE[tenseValue];
      if (!classKey) {
        return null;
      }
      return targetObject.PRETERITO_CLASS_DETAIL_BY_KEY[classKey] || null;
    }
    function getObjectStateKey({
      groupKey,
      tenseValue = "",
      mode = "standard",
      isNonactive = false
    }) {
      const modeKey = mode ? `${mode}|` : "";
      const nonactiveKey = isNonactive ? "nonactive|" : "";
      const tenseKey = tenseValue ? `${tenseValue}|` : "";
      return `${modeKey}${nonactiveKey}${tenseKey}${groupKey}`;
    }
    function getPatientivoOwnershipKey(groupKey) {
      return `noun|patientivo|${groupKey}|ownership`;
    }
    function getPatientivoNominalSuffixKey(groupKey) {
      return `noun|patientivo|${groupKey}|nominal-suffix`;
    }
    function clearToggleStateByPrefix(map, prefix) {
      if (!prefix) {
        return;
      }
      for (const key of map.keys()) {
        if (key.startsWith(prefix)) {
          map.delete(key);
        }
      }
    }
    function resetToggleStateForTense(tenseValue) {
      if (!tenseValue) {
        return;
      }
      if (isToggleLockEnabled()) {
        return;
      }
      clearToggleStateByPrefix(targetObject.SubjectToggleState, `standard|${tenseValue}|`);
      clearToggleStateByPrefix(targetObject.SubjectToggleState, `universal|${tenseValue}|`);
      clearToggleStateByPrefix(targetObject.SubjectToggleState, `noun|${tenseValue}|`);
      clearToggleStateByPrefix(targetObject.ObjectToggleState, `standard|${tenseValue}|`);
      clearToggleStateByPrefix(targetObject.ObjectToggleState, `standard|nonactive|${tenseValue}|`);
      clearToggleStateByPrefix(targetObject.ObjectToggleState, `universal|${tenseValue}|`);
      clearToggleStateByPrefix(targetObject.ObjectToggleState, `universal|nonactive|${tenseValue}|`);
      clearToggleStateByPrefix(targetObject.ObjectToggleState, `noun|${tenseValue}|`);
      clearToggleStateByPrefix(targetObject.PossessorToggleState, `noun|${tenseValue}|`);
      clearToggleStateByPrefix(targetObject.PatientivoOwnershipState, `noun|${tenseValue}|`);
      clearToggleStateByPrefix(targetObject.PatientivoNominalSuffixState, `noun|${tenseValue}|`);
      const appliedFragments = [`|standard|${tenseValue}|`, `|standard|nonactive|${tenseValue}|`, `|universal|${tenseValue}|`, `|universal|nonactive|${tenseValue}|`, `|noun|${tenseValue}|`];
      for (const appliedKey of Array.from(targetObject.DefaultToggleApplied)) {
        if (appliedFragments.some(fragment => appliedKey.includes(fragment))) {
          targetObject.DefaultToggleApplied.delete(appliedKey);
        }
      }
    }
    function getSubjectToggleOptions() {
      const classicalLocaleContext = getClassicalLocaleContext();
      const options = [{
        id: targetObject.SUBJECT_TOGGLE_ALL,
        label: getToggleLabel("all", classicalLocaleContext, "todos"),
        subjectPrefix: null,
        subjectSuffix: null
      }];
      targetObject.SUBJECT_COMBINATIONS.forEach(combo => {
        const label = combo.subjectPrefix ? combo.subjectPrefix : "Ø";
        options.push({
          id: combo.id,
          label,
          subjectPrefix: combo.subjectPrefix,
          subjectSuffix: combo.subjectSuffix
        });
      });
      return options;
    }
    function getPotencialHabitualNonactiveSubjectToggleOptions() {
      const classicalLocaleContext = getClassicalLocaleContext();
      const options = [{
        id: targetObject.SUBJECT_TOGGLE_ALL,
        label: getToggleLabel("all", classicalLocaleContext, "todos"),
        subjectPrefix: null,
        subjectSuffix: null
      }];
      const entries = Object.entries(targetObject.PASSIVE_IMPERSONAL_SUBJECT_MAP || {});
      const comboOrder = new Map(targetObject.SUBJECT_COMBINATIONS.map((combo, index) => [`${combo.subjectPrefix || ""}|${combo.subjectSuffix || ""}`, index]));
      entries.sort((a, b) => {
        const aMeta = a[1] || {};
        const bMeta = b[1] || {};
        const aKey = `${aMeta.pers1 || ""}|${aMeta.pers2 || ""}`;
        const bKey = `${bMeta.pers1 || ""}|${bMeta.pers2 || ""}`;
        const aRank = comboOrder.has(aKey) ? comboOrder.get(aKey) : Number.MAX_SAFE_INTEGER;
        const bRank = comboOrder.has(bKey) ? comboOrder.get(bKey) : Number.MAX_SAFE_INTEGER;
        return aRank - bRank;
      }).forEach(([prefix, mapped]) => {
        const subjectPrefix = mapped?.pers1 || "";
        const subjectSuffix = mapped?.pers2 || "";
        const subjectId = getSubjectCombinationId(subjectPrefix, subjectSuffix);
        if (!subjectId) {
          return;
        }
        options.push({
          id: subjectId,
          label: getPassiveToggleLabel(prefix, classicalLocaleContext),
          subjectPrefix,
          subjectSuffix,
          title: targetObject.getNonactivePersonSub(prefix, classicalLocaleContext)
        });
      });
      return options;
    }
    function getDefaultNounSubjectId(subjectOptions) {
      return targetObject.getDefaultOutputToggleSelection({
        context: "noun-subject",
        values: Array.isArray(subjectOptions) ? subjectOptions.map(entry => entry.id) : [],
        subjectOptions
      });
    }
    function getObjectToggleOptions(prefixes, options = {}) {
      const classicalLocaleContext = options.classicalLocaleContext ?? getClassicalLocaleContext();
      const includeAll = options.includeAll !== false;
      const labelForPrefix = options.labelForPrefix;
      const list = [];
      if (includeAll) {
        list.push({
          id: targetObject.OBJECT_TOGGLE_ALL,
          label: getToggleLabel("all", classicalLocaleContext, "todos"),
          prefix: null
        });
      }
      prefixes.forEach(prefix => {
        const label = labelForPrefix ? labelForPrefix(prefix, classicalLocaleContext) : prefix || getToggleLabel("intransitive", classicalLocaleContext, "intrans");
        list.push({
          id: prefix,
          label,
          prefix
        });
      });
      return list;
    }
    var VERB_OBJECT_SLOT_SCHEMA = Object.freeze([Object.freeze({
      id: "object",
      stateSuffix: "",
      datasetKey: "objectPrefix",
      exportKey: "objectToggle",
      exportHeader: "objeto",
      alwaysExport: true
    }), Object.freeze({
      id: "object2",
      stateSuffix: "indirect",
      datasetKey: "indirectObjectMarker",
      exportKey: "objectToggle2",
      exportHeader: "objeto 2",
      alwaysExport: true
    }), Object.freeze({
      id: "object3",
      stateSuffix: "object3",
      datasetKey: "thirdObjectMarker",
      exportKey: "objectToggle3",
      exportHeader: "objeto 3",
      alwaysExport: false
    })]);
    var DERIVATION_CONTROLLER_SLOT_PRIORITY = Object.freeze({
      // Literal keys/values replace DERIVATION_TYPE.* and getCanonicalSlotIdForRole()
      // to avoid cross-file initialization order dependencies.
      // DERIVATION_TYPE: direct="direct", causative="causative", applicative="applicative"
      // getCanonicalSlotIdForRole: shuntline1="object2", mainline="object"
      direct: Object.freeze(["object2", "object"]),
      causative: Object.freeze(["object2", "object"]),
      applicative: Object.freeze(["object", "object2"])
    });
    function getDerivationControllerSlotPriority(derivationType = "") {
      return DERIVATION_CONTROLLER_SLOT_PRIORITY[derivationType] || DERIVATION_CONTROLLER_SLOT_PRIORITY[targetObject.DERIVATION_TYPE.direct];
    }
    function getVerbObjectSlotSchema({
      classicalLocaleContext = false,
      derivationType = "",
      isNonactiveMode = false,
      activeValency = 0,
      modeObjectSlots = 0,
      allowIndirectObjectToggle = false,
      primaryTogglePrefixes = [],
      indirectTogglePrefixes = [],
      visibleSlotIds = null
    }) {
      const parsedModeSlots = Number.isFinite(modeObjectSlots) ? Math.max(0, Math.min(targetObject.MAX_OBJECT_SLOTS, Number(modeObjectSlots))) : 0;
      const hasExplicitVisibleSlots = Array.isArray(visibleSlotIds) && visibleSlotIds.length > 0;
      const visibleSlotSet = hasExplicitVisibleSlots ? new Set(visibleSlotIds) : null;
      const slotCapacity = hasExplicitVisibleSlots ? Math.max(1, Math.min(targetObject.MAX_OBJECT_SLOTS, visibleSlotIds.length)) : Math.max(1, parsedModeSlots);
      const allowIndirectBySlots = slotCapacity >= 2;
      const allowThirdObjectToggle = hasExplicitVisibleSlots ? visibleSlotSet.has("object3") : slotCapacity >= 3;
      const useValence3PlusRoleLabels = Number(activeValency) >= 3;
      const baseObjectLabel = getToggleLabel("object", classicalLocaleContext, "Objeto");
      const primaryRoleLabel = derivationType === targetObject.DERIVATION_TYPE.applicative ? targetObject.getObjectRoleLabel("benefactive", classicalLocaleContext) : targetObject.getObjectRoleLabel("direct", classicalLocaleContext);
      return VERB_OBJECT_SLOT_SCHEMA.filter(slot => hasExplicitVisibleSlots ? visibleSlotSet.has(slot.id) : slot.id === "object" || slot.id === "object2" && allowIndirectObjectToggle || slot.id === "object3" && allowThirdObjectToggle).map(slot => {
        const isPrimary = slot.id === "object";
        const roleLabel = useValence3PlusRoleLabels ? targetObject.getValence3PlusSlotRoleLabel(slot.id, classicalLocaleContext) : slot.id === "object2" ? targetObject.getObjectRoleLabel("indirect", classicalLocaleContext) : slot.id === "object3" ? `${baseObjectLabel} 3` : primaryRoleLabel;
        const toggleValues = isPrimary ? Array.from(new Set(primaryTogglePrefixes)) : Array.from(new Set(indirectTogglePrefixes));
        const labelForPrefix = isPrimary ? !isNonactiveMode && allowIndirectBySlots && Number(activeValency) >= 4 ? getNonspecificToggleLabel : undefined : getNonspecificToggleLabel;
        const toggleAriaLabel = useValence3PlusRoleLabels ? targetObject.getValence3PlusSlotRoleLabel(slot.id, classicalLocaleContext) : slot.id === "object" ? baseObjectLabel : `${baseObjectLabel} ${slot.id === "object2" ? "2" : "3"}`;
        return {
          ...slot,
          isPrimary,
          roleLabel,
          toggleValues,
          labelForPrefix,
          toggleAriaLabel
        };
      });
    }
    function getPassiveToggleLabel(prefix, classicalLocaleContext = false) {
      const subject = targetObject.PASSIVE_IMPERSONAL_SUBJECT_MAP[prefix];
      if (!subject) {
        return prefix || getToggleLabel("intransitive", classicalLocaleContext, "intrans");
      }
      return subject.pers1 || "Ø";
    }
    function getNonspecificToggleLabel(prefix) {
      return prefix || "Ø";
    }
    function getZeroObjectDisplayValue(value) {
      return value ? value : "Ø";
    }
    function isPotencialProfileTense(tenseValue = "") {
      return tenseValue === "potencial" || tenseValue === "potencial-habitual" || targetObject.ACTIVE_ADJECTIVE_TENSE_SET.has(tenseValue) || tenseValue === "pasado-remoto-adverbio-activo";
    }
    function isPotencialHabitualTense(tenseValue = "") {
      return tenseValue === "potencial-habitual";
    }
    function allowsCollapsedDerivedNounSlot({
      tenseValue = "",
      combinedMode = "",
      slotPlanBundle = null,
      derivationType = ""
    }) {
      if (!isPotencialHabitualTense(tenseValue) || combinedMode !== targetObject.COMBINED_MODE.nonactive) {
        return false;
      }
      if (getDerivationValencyDelta(derivationType) <= 0) {
        return false;
      }
      const availableSlots = Number.isFinite(slotPlanBundle?.availableObjectSlots) ? Number(slotPlanBundle.availableObjectSlots) : Array.isArray(slotPlanBundle?.slotPlans) ? slotPlanBundle.slotPlans.length : 0;
      return availableSlots <= 0;
    }
    function isPotencialActiveTense(tenseValue = "") {
      return targetObject.ACTIVE_ADJECTIVE_TENSE_SET.has(tenseValue) || tenseValue === "pasado-remoto-adverbio-activo";
    }
    function isFormalCnvFunctionTense(tenseValue = "") {
      return targetObject.ACTIVE_ADJECTIVE_TENSE_SET.has(tenseValue) || tenseValue === "pasado-remoto-adverbio-activo";
    }
    function isFormalCnnFunctionTense(tenseValue = "") {
      return tenseValue === "potencial" || tenseValue === "potencial-habitual" || targetObject.PATIENTIVO_ADJECTIVE_TENSE_SET.has(tenseValue);
    }
    function getFormalTenseModeForFunctionTense(tenseValue = "") {
      if (isFormalCnvFunctionTense(tenseValue)) {
        return targetObject.TENSE_MODE.verbo || targetObject.TENSE_MODE.verbo;
      }
      if (isFormalCnnFunctionTense(tenseValue)) {
        return targetObject.TENSE_MODE.sustantivo || targetObject.TENSE_MODE.sustantivo;
      }
      return "";
    }
    function isPatientivoAdjectiveTense(tenseValue = "") {
      return targetObject.PATIENTIVO_ADJECTIVE_TENSE_SET.has(tenseValue);
    }
    function getPatientivoAdjectiveSourceForTense(tenseValue = "") {
      return targetObject.PATIENTIVO_ADJECTIVE_SOURCE_BY_TENSE[tenseValue] || "";
    }
    function isIntransitiveOnlyActiveAdjectiveTense(tenseValue = "") {
      return targetObject.INTRANSITIVE_ONLY_ACTIVE_ADJECTIVE_TENSE_SET.has(tenseValue);
    }
    function isActiveAdjectiveTabTense(tenseValue = "") {
      return targetObject.ACTIVE_ADJECTIVE_TAB_TENSE_SET.has(tenseValue);
    }
    function isNonactiveAdjectiveTabTense(tenseValue = "") {
      return targetObject.NONACTIVE_ADJECTIVE_TAB_TENSE_SET.has(tenseValue);
    }
    function normalizeVerbDerivedPatientiveSourceFamily(patientivoSource = "") {
      const normalized = typeof targetObject.normalizeVerbDerivedPatientiveFamily === "function" ? targetObject.normalizeVerbDerivedPatientiveFamily(patientivoSource) : String(patientivoSource || "").trim();
      if (normalized === "pasivo") {
        return "passive";
      }
      return normalized;
    }
    function isVerbDerivedPatientiveNonactiveSource(patientivoSource = "") {
      const source = normalizeVerbDerivedPatientiveSourceFamily(patientivoSource);
      return source === "nonactive" || source === "passive" || source === "impersonal";
    }
    function getNominalSourceModeForTense(tenseValue = "", {
      patientivoSource = "",
      blockMode = null
    } = {}) {
      if (tenseValue === "patientivo") {
        return isVerbDerivedPatientiveNonactiveSource(patientivoSource) ? targetObject.COMBINED_MODE.nonactive : targetObject.COMBINED_MODE.active;
      }
      if (isPatientivoAdjectiveTense(tenseValue)) {
        return getPatientivoAdjectiveSourceForTense(tenseValue) === "nonactive" ? targetObject.COMBINED_MODE.nonactive : targetObject.COMBINED_MODE.active;
      }
      if (tenseValue === "locativo-temporal") {
        return blockMode === targetObject.COMBINED_MODE.nonactive ? targetObject.COMBINED_MODE.nonactive : targetObject.COMBINED_MODE.active;
      }
      if (tenseValue === "instrumentivo") {
        return targetObject.COMBINED_MODE.nonactive;
      }
      if (tenseValue === "sustantivo-verbal" || tenseValue === "potencial") {
        return targetObject.COMBINED_MODE.active;
      }
      if (isPotencialHabitualTense(tenseValue)) {
        return targetObject.COMBINED_MODE.nonactive;
      }
      return targetObject.COMBINED_MODE.active;
    }
    function getResolvedNominalCombinedModeForTense(tenseValue = "", fallbackCombinedMode = getCombinedMode()) {
      if (isActiveAdjectiveTabTense(tenseValue)) {
        return targetObject.COMBINED_MODE.active;
      }
      if (isNonactiveAdjectiveTabTense(tenseValue)) {
        return targetObject.COMBINED_MODE.nonactive;
      }
      if (isPatientivoAdjectiveTense(tenseValue) || isPotencialProfileTense(tenseValue)) {
        return getNominalSourceModeForTense(tenseValue);
      }
      return fallbackCombinedMode === targetObject.COMBINED_MODE.nonactive ? targetObject.COMBINED_MODE.nonactive : targetObject.COMBINED_MODE.active;
    }
    function getPatientivoSourceTenseLabel(patientivoSource = "", classicalLocaleContext = false) {
      const sourceKey = patientivoSource === "perfectivo" ? "patientivo-perfectivo" : patientivoSource === "imperfectivo" ? "patientivo-imperfectivo" : patientivoSource === "tronco-verbal" ? "patientivo-tronco" : patientivoSource === "impersonal" ? "patientivo-impersonal" : "patientivo-pasivo";
      const sourceLabelFull = getVerbBlockLabel(sourceKey, classicalLocaleContext, "");
      if (!sourceLabelFull) {
        return "";
      }
      const separatorIndex = sourceLabelFull.indexOf("·");
      if (separatorIndex === -1) {
        return sourceLabelFull.trim();
      }
      return sourceLabelFull.slice(separatorIndex + 1).trim();
    }
    function getNominalSourceTenseLabel(tenseValue = "", {
      patientivoSource = "",
      classicalLocaleContext = false
    } = {}) {
      if (tenseValue === "patientivo") {
        return getPatientivoSourceTenseLabel(patientivoSource, classicalLocaleContext);
      }
      if (isPatientivoAdjectiveTense(tenseValue)) {
        return getPatientivoSourceTenseLabel(getPatientivoAdjectiveSourceForTense(tenseValue), classicalLocaleContext);
      }
      if (isPotencialTroncoNajActiveTense(tenseValue)) {
        const sourceLabelFull = getVerbBlockLabel("patientivo-tronco-noun", classicalLocaleContext, "patientivo · sustantivo de tronco verbal");
        const separatorIndex = sourceLabelFull.indexOf("·");
        return separatorIndex === -1 ? sourceLabelFull.trim() : sourceLabelFull.slice(separatorIndex + 1).trim();
      }
      if (isPotencialTroncoActiveTense(tenseValue)) {
        return getPatientivoSourceTenseLabel("tronco-verbal", classicalLocaleContext);
      }
      let sourceTense = "";
      if (tenseValue === "agentivo" || tenseValue === "potencial-habitual") {
        sourceTense = "presente-habitual";
      } else if (tenseValue === "instrumentivo") {
        sourceTense = "presente-habitual";
      } else if (targetObject.isPredicateNominalTense(tenseValue)) {
        sourceTense = targetObject.getPredicateNominalSourceTenseForTarget(tenseValue);
      } else if (tenseValue === "locativo-temporal") {
        sourceTense = "imperfecto";
      } else if (tenseValue === "sustantivo-verbal" || tenseValue === "potencial") {
        sourceTense = "futuro";
      } else if (isPotencialActiveTense(tenseValue)) {
        sourceTense = getPotencialActiveSourceTense(tenseValue);
      } else {
        sourceTense = tenseValue;
      }
      return getLocalizedLabel(targetObject.TENSE_LABELS[sourceTense], classicalLocaleContext, sourceTense);
    }
    function getNominalDerivationModeForTense(tenseValue = "") {
      return isPotencialHabitualTense(tenseValue) ? targetObject.DERIVATION_MODE.nonactive : targetObject.DERIVATION_MODE.active;
    }
    function normalizeHeaderLabelText(value = "") {
      return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    }
    function shouldAppendNominalSourceTense(baseLabel = "", sourceTenseLabel = "") {
      const normalizedSource = normalizeHeaderLabelText(sourceTenseLabel);
      if (!normalizedSource) {
        return false;
      }
      const normalizedBase = normalizeHeaderLabelText(baseLabel);
      if (!normalizedBase) {
        return true;
      }
      return !(normalizedBase === normalizedSource || normalizedBase.includes(normalizedSource));
    }
    function buildNominalSourceTaggedLabel(baseLabel = "", sourceMode = "", classicalLocaleContext = false, {
      sourceTenseLabel = "",
      labelValency = null
    } = {}) {
      const normalizedSourceMode = String(sourceMode || "").trim();
      const sourceLabel = (() => {
        if (normalizedSourceMode === targetObject.COMBINED_MODE.nonactive) {
          return getLocalizedLabel(targetObject.UI_LABELS["tense-tabs-mode-nonactive"], classicalLocaleContext, "no activo");
        }
        if (!normalizedSourceMode || normalizedSourceMode === targetObject.COMBINED_MODE.active) {
          return getLocalizedLabel(targetObject.UI_LABELS["tense-tabs-mode-active"], classicalLocaleContext, "activo");
        }
        return normalizedSourceMode;
      })();
      const sourcePrefix = "origen";
      const stemLabel = baseLabel || "";
      const sourcePart = `${sourcePrefix}: ${sourceLabel}`;
      const shouldShowSourceTense = shouldAppendNominalSourceTense(stemLabel, sourceTenseLabel);
      const sourceTensePart = shouldShowSourceTense && sourceTenseLabel ? `, ${sourceTenseLabel}` : "";
      const valencyPart = Number.isFinite(labelValency) ? ` · valencia total: ${labelValency}` : "";
      return stemLabel ? `${stemLabel} · ${sourcePart}${sourceTensePart}${valencyPart}` : `${sourcePart}${sourceTensePart}${valencyPart}`;
    }
    function isPotencialTroncoActiveTense(tenseValue = "") {
      return targetObject.TRONCO_ACTIVE_ADJECTIVE_TENSE_SET.has(tenseValue);
    }
    function isPotencialTroncoNajActiveTense(tenseValue = "") {
      return targetObject.TRONCO_NAJ_ACTIVE_ADJECTIVE_TENSE_SET.has(tenseValue);
    }
    function isSubjectlessNominalTense(tenseValue = "") {
      return tenseValue === "pasado-remoto-adverbio-activo";
    }
    function getPotencialActiveSourceTense(tenseValue = "") {
      if (targetObject.PERFECT_ACTIVE_ADJECTIVE_TENSE_SET.has(tenseValue)) {
        return "perfecto";
      }
      if (tenseValue === "pasado-remoto-adverbio-activo") {
        return "pasado-remoto";
      }
      return "preterito";
    }
    function getActiveAdjectiveProfileType(tenseValue = "") {
      switch (tenseValue) {
        case targetObject.ADJECTIVE_ACTIVE_TENSE_IDS.preterito:
          return "adjetivo-activo-preterito-simple";
        case targetObject.ADJECTIVE_ACTIVE_TENSE_IDS.perfecto:
          return "adjetivo-activo-preterito-compuesto";
        case targetObject.ADJECTIVE_ACTIVE_TENSE_IDS.preteritoTik:
          return "adjetivo-tronco-preterito-simple";
        case targetObject.ADJECTIVE_ACTIVE_TENSE_IDS.perfectoTik:
          return "adjetivo-tronco-preterito-compuesto";
        case targetObject.ADJECTIVE_ACTIVE_TENSE_IDS.preteritoNaj:
          return "adjetivo-tronco-naj-preterito-simple";
        case targetObject.ADJECTIVE_ACTIVE_TENSE_IDS.perfectoNaj:
          return "adjetivo-tronco-naj-preterito-compuesto";
        default:
          return "";
      }
    }
    function getActiveUnitTenseModeForCurrentSelection() {
      const selectedTense = getCurrentResolvedConjugationSelectionState().tenseValue || "";
      const formalByTense = getFormalTenseModeForFunctionTense(selectedTense);
      if (formalByTense) {
        return formalByTense;
      }
      const activeMode = getActiveTenseMode();
      if (activeMode === targetObject.TENSE_MODE.adjetivo || activeMode === targetObject.TENSE_MODE.adverbio || activeMode === targetObject.TENSE_MODE.particula) {
        return getFormalTenseModeForCurrentSelection(activeMode);
      }
      return getActiveUnitTenseMode();
    }
    function resolveActiveAdjectiveClassPolicy({
      tenseValue = "",
      sourceTense = "",
      isAdjectiveMode = false,
      hasSlashMarker = false,
      hasBoundMarker = false,
      inputMatrix = "",
      candidateMatrix = ""
    } = {}) {
      const defaultPolicy = {
        classFilter: null,
        forceClassBSelection: false,
        preferredFinalYaSurfaceMode: ""
      };
      if (!isAdjectiveMode) {
        return defaultPolicy;
      }
      const profileType = getActiveAdjectiveProfileType(tenseValue);
      if (!profileType) {
        return defaultPolicy;
      }
      const isTroncoNajProfile = profileType === "adjetivo-tronco-naj-preterito-simple" || profileType === "adjetivo-tronco-naj-preterito-compuesto";
      if (isTroncoNajProfile) {
        // -naj adjectives use a dedicated precomputed wrapper path and must not
        // inherit matrix-/ya adjective forcing from direct active adjectives.
        return defaultPolicy;
      }
      const normalizedInputMatrix = targetObject.normalizeRuleBase(inputMatrix);
      const normalizedCandidateMatrix = targetObject.normalizeRuleBase(candidateMatrix);
      const isSlashYaInput = hasSlashMarker && hasBoundMarker && normalizedInputMatrix === "ya";
      if (isSlashYaInput) {
        const preferredFinalYaSurfaceMode = sourceTense === "preterito" ? "deleted-pret" : "";
        return {
          classFilter: sourceTense === "perfecto" ? "A" : "B",
          forceClassBSelection: sourceTense === "perfecto" ? false : true,
          preferredFinalYaSurfaceMode
        };
      }
      if (normalizedCandidateMatrix.endsWith("tiya")) {
        const preferredFinalYaSurfaceMode = sourceTense === "perfecto" ? "deleted-perfect" : "deleted-pret";
        return {
          classFilter: "B",
          forceClassBSelection: true,
          preferredFinalYaSurfaceMode
        };
      }
      if (normalizedCandidateMatrix.endsWith("ya")) {
        const preferredFinalYaSurfaceMode = sourceTense === "preterito" ? "deleted-pret" : "";
        return {
          classFilter: sourceTense === "perfecto" ? "A" : "B",
          forceClassBSelection: sourceTense === "perfecto" ? false : true,
          preferredFinalYaSurfaceMode
        };
      }
      return defaultPolicy;
    }
    function selectPreferredActiveAdjectiveForms(forms = [], {
      sourceVerb = "",
      sourceTense = "",
      selectionMode = ""
    } = {}) {
      const list = Array.isArray(forms) ? forms.map(entry => String(entry || "").trim()).filter(Boolean) : [];
      if (!selectionMode || !list.length) {
        return list;
      }
      const normalizedSource = targetObject.normalizeRuleBase(sourceVerb);
      const deletedFinalYaBase = normalizedSource.endsWith("ya") ? targetObject.resolveFinalYaImmediateHostBase(normalizedSource, {
        isTransitive: false,
        requirePronounceable: false
      }) || normalizedSource.slice(0, -2) : "";
      let preferredTargets = [];
      if (selectionMode === "deleted-pret" && deletedFinalYaBase) {
        preferredTargets = [`${deletedFinalYaBase}k`];
      } else if (selectionMode === "deleted-perfect" && deletedFinalYaBase) {
        preferredTargets = [deletedFinalYaBase];
      }
      let filtered = preferredTargets.length ? list.filter(formValue => preferredTargets.includes(targetObject.normalizeRuleBase(formValue))) : [];
      if (!filtered.length && selectionMode === "deleted-pret") {
        filtered = list.filter(formValue => {
          const normalized = targetObject.normalizeRuleBase(formValue);
          return normalized.endsWith("k") && !normalized.endsWith("yak");
        });
      }
      if (!filtered.length && selectionMode === "deleted-perfect" && deletedFinalYaBase) {
        filtered = list.filter(formValue => {
          const normalized = targetObject.normalizeRuleBase(formValue);
          return normalized.startsWith(deletedFinalYaBase) && !normalized.startsWith(normalizedSource);
        });
      }
      if (!filtered.length) {
        return list;
      }
      return filtered;
    }

    // === Mode State Accessors ===
    function getActiveConjugationGroup() {
      return targetObject.ConjugationGroupState.activeGroup;
    }
    function setActiveConjugationGroup(group) {
      if (group !== targetObject.CONJUGATION_GROUPS.tense && group !== targetObject.CONJUGATION_GROUPS.universal) {
        return;
      }
      if (targetObject.ConjugationGroupState.activeGroup !== group) {
        const tenseValue = group === targetObject.CONJUGATION_GROUPS.universal ? getSelectedPretUniversalTab() : getSelectedTenseTab();
        resetToggleStateForTense(tenseValue);
      }
      targetObject.ConjugationGroupState.activeGroup = group;
    }
    function getActiveTenseMode() {
      return targetObject.TenseModeState.mode;
    }
    function getModeSystemValue(system = "") {
      const normalized = String(system || "").trim();
      if (!normalized) {
        return "";
      }
      return targetObject.TENSE_MODE_SYSTEM[normalized] || normalized;
    }
    function isUnitModeSystem(system = "") {
      const normalized = getModeSystemValue(system);
      return normalized === (targetObject.TENSE_MODE_SYSTEM.unit || "unit") || normalized === "unit";
    }
    function isFunctionModeSystem(system = "") {
      const normalized = getModeSystemValue(system);
      return normalized === (targetObject.TENSE_MODE_SYSTEM.function || "function") || normalized === "function" || normalized === (targetObject.TENSE_MODE_SYSTEM.european || "european") || normalized === "european";
    }
    function getFunctionRoleForTenseMode(mode = "") {
      const normalized = String(mode || "").trim();
      if (normalized === targetObject.TENSE_MODE.verbo || normalized === "verbo") {
        return "verbal";
      }
      if (normalized === targetObject.TENSE_MODE.sustantivo || normalized === "sustantivo") {
        return "nominal";
      }
      if (normalized === targetObject.TENSE_MODE.adjetivo || normalized === "adjetivo") {
        return "adjectival";
      }
      if (normalized === targetObject.TENSE_MODE.adverbio || normalized === "adverbio") {
        return "adverbial";
      }
      return "";
    }
    function getTenseModeForFunctionRole(role = "") {
      const normalized = String(role || "").trim();
      if (normalized === "verbal" || normalized === "verb" || normalized === "verbo") {
        return targetObject.TENSE_MODE.verbo;
      }
      if (normalized === "nominal" || normalized === "noun" || normalized === "sustantivo") {
        return targetObject.TENSE_MODE.sustantivo;
      }
      if (normalized === "adjectival" || normalized === "adjective" || normalized === "adjetivo") {
        return targetObject.TENSE_MODE.adjetivo;
      }
      if (normalized === "adverbial" || normalized === "adverb" || normalized === "adverbio") {
        return targetObject.TENSE_MODE.adverbio;
      }
      return "";
    }
    function getUnitKindForTenseMode(mode = "") {
      const normalized = String(mode || "").trim();
      if (normalized === targetObject.TENSE_MODE.verbo || normalized === "verbo") {
        return "cnv";
      }
      if (normalized === targetObject.TENSE_MODE.sustantivo || normalized === "sustantivo") {
        return "cnn";
      }
      if (normalized === targetObject.TENSE_MODE.particula || normalized === "particula") {
        return "particula";
      }
      return "";
    }
    function getTenseModeForUnitKind(kind = "") {
      const normalized = String(kind || "").trim();
      if (normalized === "cnv" || normalized === "vnc" || normalized === "verbo") {
        return targetObject.TENSE_MODE.verbo;
      }
      if (normalized === "cnn" || normalized === "nnc" || normalized === "sustantivo") {
        return targetObject.TENSE_MODE.sustantivo;
      }
      if (normalized === "particula" || normalized === "particle") {
        return targetObject.TENSE_MODE.particula || "particula";
      }
      return "";
    }
    function normalizeUnitTenseModeValue(mode = "") {
      const normalized = String(mode || "").trim();
      if (!normalized) {
        return "";
      }
      if (Object.values(targetObject.TENSE_MODE || {}).includes(normalized)) {
        return normalized;
      }
      if (normalized === targetObject.TENSE_MODE.verbo || normalized === "verbo") {
        return targetObject.TENSE_MODE.verbo || targetObject.TENSE_MODE.verbo;
      }
      if (normalized === targetObject.TENSE_MODE.sustantivo || normalized === "sustantivo") {
        return targetObject.TENSE_MODE.sustantivo || targetObject.TENSE_MODE.sustantivo;
      }
      if (normalized === "particula") {
        return targetObject.TENSE_MODE.particula || "particula";
      }
      return "";
    }
    function getOutputTenseModeForUnit(mode = "") {
      const unitMode = normalizeUnitTenseModeValue(mode);
      if (unitMode === (targetObject.TENSE_MODE.sustantivo || targetObject.TENSE_MODE.sustantivo)) {
        return targetObject.TENSE_MODE.sustantivo;
      }
      if (unitMode === (targetObject.TENSE_MODE.verbo || targetObject.TENSE_MODE.verbo)) {
        return targetObject.TENSE_MODE.verbo;
      }
      if (unitMode === (targetObject.TENSE_MODE.particula || targetObject.TENSE_MODE.particula || "particula")) {
        return targetObject.TENSE_MODE.particula || "particula";
      }
      return "";
    }
    function resolveFormalTenseModeForFunctionMode(mode = "", tenseValue = "") {
      const normalized = String(mode || "").trim();
      if (normalized === targetObject.TENSE_MODE.verbo || normalized === targetObject.TENSE_MODE.sustantivo || normalized === targetObject.TENSE_MODE.particula) {
        return normalizeUnitTenseModeValue(normalized) || normalized;
      }
      if (normalized === targetObject.TENSE_MODE.adverbio || normalized === "adverbio") {
        return targetObject.TENSE_MODE.verbo || targetObject.TENSE_MODE.verbo;
      }
      if (normalized === targetObject.TENSE_MODE.adjetivo || normalized === "adjetivo") {
        const formalByTense = getFormalTenseModeForFunctionTense(tenseValue);
        if (formalByTense) {
          return formalByTense;
        }
        return targetObject.TENSE_MODE.sustantivo;
      }
      return normalizeUnitTenseModeValue(normalized) || "";
    }
    function getFormalTenseModeForCurrentSelection(mode = getActiveTenseMode()) {
      const selectionState = getCurrentResolvedConjugationSelectionState({
        tenseMode: mode
      });
      const tenseValue = selectionState.group === targetObject.CONJUGATION_GROUPS.universal ? selectionState.universalTenseValue : selectionState.tenseValue;
      return resolveFormalTenseModeForFunctionMode(mode, tenseValue);
    }
    function setStoredEuropeanTenseMode(mode = "") {
      if (!Object.values(targetObject.TENSE_MODE).includes(mode)) {
        return "";
      }
      if (typeof targetObject.EuropeanTenseModeState !== "undefined" && targetObject.EuropeanTenseModeState) {
        targetObject.EuropeanTenseModeState.mode = mode;
      }
      return mode;
    }
    function setStoredUnitTenseMode(mode = "") {
      const unitMode = normalizeUnitTenseModeValue(mode);
      if (!unitMode) {
        return "";
      }
      if (typeof targetObject.UnitTenseModeState !== "undefined" && targetObject.UnitTenseModeState) {
        targetObject.UnitTenseModeState.mode = unitMode;
      }
      return unitMode;
    }
    function getActiveEuropeanTenseMode() {
      return getActiveFunctionMode();
    }
    function getActiveFunctionMode() {
      return typeof targetObject.EuropeanTenseModeState !== "undefined" && targetObject.EuropeanTenseModeState?.mode ? targetObject.EuropeanTenseModeState.mode : getActiveTenseMode();
    }
    function getActiveUnitTenseMode() {
      return typeof targetObject.UnitTenseModeState !== "undefined" && targetObject.UnitTenseModeState?.mode ? targetObject.UnitTenseModeState.mode : targetObject.TENSE_MODE.verbo || "";
    }
    function getActiveFunctionRole() {
      return getFunctionRoleForTenseMode(getActiveFunctionMode());
    }
    function getActiveUnitKind() {
      return getUnitKindForTenseMode(getActiveUnitTenseModeForCurrentSelection());
    }
    function normalizeAndrewsUnitFormulaType(value = "") {
      return String(value || "").trim().toUpperCase();
    }
    function getAndrewsUnitSourceTargetRouteTransition(sourceFormulaType = "", targetFormulaType = "") {
      const source = normalizeAndrewsUnitFormulaType(sourceFormulaType);
      const target = normalizeAndrewsUnitFormulaType(targetFormulaType);
      return source && target ? `${source}->${target}` : "";
    }
    function getAndrewsUnitRouteOptionRegistryKeyForMode(mode = "") {
      const normalizedMode = normalizeUnitTenseModeValue(mode) || String(mode || "").trim();
      const verbMode = typeof targetObject.TENSE_MODE === "object" && targetObject.TENSE_MODE?.verbo ? targetObject.TENSE_MODE.verbo : "verbo";
      const nounMode = typeof targetObject.TENSE_MODE === "object" && targetObject.TENSE_MODE?.sustantivo ? targetObject.TENSE_MODE.sustantivo : "sustantivo";
      if (normalizedMode === verbMode || normalizedMode === "verbo" || normalizedMode === "cnv") {
        return "unit-target-cnv";
      }
      if (normalizedMode === nounMode || normalizedMode === "sustantivo" || normalizedMode === "cnn") {
        return "unit-target-cnn";
      }
      return "";
    }
    function cloneAndrewsUnitFormulaFrame(frame = null) {
      return frame && typeof frame === "object" ? {
        kind: frame.kind || "andrews-unit-formula-type-frame",
        version: Number(frame.version || 1),
        role: frame.role || "",
        formulaType: normalizeAndrewsUnitFormulaType(frame.formulaType)
      } : null;
    }
    function buildAndrewsUnitFormulaFrame(formulaType = "", role = "") {
      const normalized = normalizeAndrewsUnitFormulaType(formulaType);
      return {
        kind: "andrews-unit-formula-type-frame",
        version: 1,
        role: String(role || ""),
        formulaType: normalized
      };
    }
    function buildAndrewsUnitRouteOptionFrame(option = null, index = 0) {
      const sourceFormulaFrame = buildAndrewsUnitFormulaFrame(option?.sourceFormulaType || "", "source");
      const targetFormulaFrame = buildAndrewsUnitFormulaFrame(option?.targetFormulaType || "", "target");
      const formulaTransition = getAndrewsUnitSourceTargetRouteTransition(sourceFormulaFrame.formulaType, targetFormulaFrame.formulaType);
      return {
        kind: "andrews-unit-source-target-route-option-frame",
        version: 1,
        index: Number(index || 0),
        sourceFormulaFrame,
        targetFormulaFrame,
        formulaTransition
      };
    }
    function cloneAndrewsUnitRouteOptionFrame(frame = null) {
      if (!frame || typeof frame !== "object") {
        return null;
      }
      return {
        kind: frame.kind || "andrews-unit-source-target-route-option-frame",
        version: Number(frame.version || 1),
        index: Number(frame.index || 0),
        sourceFormulaFrame: cloneAndrewsUnitFormulaFrame(frame.sourceFormulaFrame),
        targetFormulaFrame: cloneAndrewsUnitFormulaFrame(frame.targetFormulaFrame),
        formulaTransition: String(frame.formulaTransition || "")
      };
    }
    function blockAndrewsUnitSourceTargetRouteOptions(diagnosticId = "", details = {}) {
      return {
        ok: false,
        status: "blocked",
        diagnosticId: diagnosticId || "andrews-unit-source-target-route-options-blocked",
        targetFormulaType: "",
        sourceTargetOptions: "",
        sourceTargetOptionList: [],
        diagnostics: [{
          id: diagnosticId || "andrews-unit-source-target-route-options-blocked",
          severity: "blocked",
          ...details
        }]
      };
    }
    function buildAndrewsUnitSourceTargetRouteOptionsSourceFrame(mode = "") {
      const registryKey = getAndrewsUnitRouteOptionRegistryKeyForMode(mode);
      const issueSourceFrame = targetObject.issueAndrewsUnitSourceTargetRouteOptionsSourceFrame;
      const isIssuedSourceFrame = targetObject.isIssuedAndrewsUnitSourceTargetRouteOptionsSourceFrame;
      const sourceFrame = typeof issueSourceFrame === "function" ? issueSourceFrame(mode) : null;
      if (!sourceFrame || typeof isIssuedSourceFrame !== "function" || !isIssuedSourceFrame(sourceFrame)) {
        return {
          kind: "andrews-unit-source-target-route-options-source-frame",
          version: 1,
          status: "blocked",
          diagnosticId: "andrews-unit-source-target-route-options-missing-grammar-owner",
          mode: String(mode || ""),
          registryKey,
          routeOptionFrames: []
        };
      }
      return sourceFrame;
    }
    function getAndrewsUnitSourceFrameMismatch(sourceFrame = null) {
      if (!sourceFrame || typeof sourceFrame !== "object") {
        return "missing-source-frame";
      }
      if (sourceFrame.kind !== "andrews-unit-source-target-route-options-source-frame") {
        return "wrong-source-frame-kind";
      }
      if (sourceFrame.status !== "authorized") {
        return sourceFrame.diagnosticId || "unauthorized-source-frame";
      }
      if (typeof targetObject.isIssuedAndrewsUnitSourceTargetRouteOptionsSourceFrame !== "function" || !targetObject.isIssuedAndrewsUnitSourceTargetRouteOptionsSourceFrame(sourceFrame)) {
        return "unissued-source-frame";
      }
      if (!sourceFrame.boundaries || sourceFrame.boundaries.noDomDatasetOptionAuthority !== true || sourceFrame.boundaries.noPipeDelimitedOptionAuthority !== true) {
        return "missing-source-frame-authority-boundaries";
      }
      const registryKey = String(sourceFrame.registryKey || "");
      const expectedSourceFrame = buildAndrewsUnitSourceTargetRouteOptionsSourceFrame(sourceFrame.mode);
      if (expectedSourceFrame.status !== "authorized" || expectedSourceFrame.registryKey !== registryKey) return "missing-grammar-owner-route";
      if (sourceFrame.targetFormulaFrame?.formulaType !== expectedSourceFrame.targetFormulaFrame.formulaType) {
        return "contradictory-target-formula-frame";
      }
      const routeOptionFrames = Array.isArray(sourceFrame.routeOptionFrames) ? sourceFrame.routeOptionFrames : [];
      if (routeOptionFrames.length !== expectedSourceFrame.routeOptionFrames.length) {
        return "contradictory-route-option-count";
      }
      for (let index = 0; index < expectedSourceFrame.routeOptionFrames.length; index += 1) {
        const actual = routeOptionFrames[index] || {};
        const expected = expectedSourceFrame.routeOptionFrames[index];
        if (actual.kind !== "andrews-unit-source-target-route-option-frame" || actual.sourceFormulaFrame?.formulaType !== expected.sourceFormulaFrame.formulaType || actual.targetFormulaFrame?.formulaType !== expected.targetFormulaFrame.formulaType || actual.formulaTransition !== expected.formulaTransition) {
          return "contradictory-route-option-frame";
        }
      }
      return "";
    }
    function buildAndrewsUnitSourceTargetRouteOptionsOperationFrame(sourceFrame = null) {
      const mismatch = getAndrewsUnitSourceFrameMismatch(sourceFrame);
      if (mismatch) {
        return {
          kind: "andrews-unit-source-target-route-options-operation-frame",
          version: 1,
          status: "blocked",
          diagnosticId: `andrews-unit-source-target-route-options-${mismatch}`,
          sourceFrame: sourceFrame && typeof sourceFrame === "object" ? {
            ...sourceFrame
          } : null,
          routeOptionFrames: []
        };
      }
      const routeOptionFrames = sourceFrame.routeOptionFrames.map(cloneAndrewsUnitRouteOptionFrame).filter(Boolean);
      return {
        kind: "andrews-unit-source-target-route-options-operation-frame",
        version: 1,
        status: "authorized",
        operation: "resolve-unit-target-route-options-from-andrews-source-frame",
        sourceFrame,
        targetFormulaFrame: cloneAndrewsUnitFormulaFrame(sourceFrame.targetFormulaFrame),
        routeOptionFrames,
        targetFrame: {
          kind: "andrews-unit-source-target-route-options-target-frame",
          version: 1,
          targetFormulaFrame: cloneAndrewsUnitFormulaFrame(sourceFrame.targetFormulaFrame),
          sourceTargetOptionFrames: routeOptionFrames.map(cloneAndrewsUnitRouteOptionFrame).filter(Boolean)
        }
      };
    }
    function getAndrewsUnitOperationFrameMismatch(operationFrame = null) {
      if (!operationFrame || typeof operationFrame !== "object") {
        return "missing-operation-frame";
      }
      if (operationFrame.kind !== "andrews-unit-source-target-route-options-operation-frame") {
        return "wrong-operation-frame-kind";
      }
      if (operationFrame.status !== "authorized") {
        return operationFrame.diagnosticId || "unauthorized-operation-frame";
      }
      if (operationFrame.operation !== "resolve-unit-target-route-options-from-andrews-source-frame") {
        return "wrong-operation";
      }
      const sourceMismatch = getAndrewsUnitSourceFrameMismatch(operationFrame.sourceFrame);
      if (sourceMismatch) {
        return sourceMismatch;
      }
      const sourceFrame = operationFrame.sourceFrame;
      const targetFormulaType = sourceFrame.targetFormulaFrame?.formulaType || "";
      if (operationFrame.targetFormulaFrame?.formulaType !== targetFormulaType || operationFrame.targetFrame?.targetFormulaFrame?.formulaType !== targetFormulaType) {
        return "contradictory-target-frame";
      }
      const expectedTransitions = sourceFrame.routeOptionFrames.map(frame => frame.formulaTransition);
      const operationTransitions = Array.isArray(operationFrame.routeOptionFrames) ? operationFrame.routeOptionFrames.map(frame => frame?.formulaTransition || "") : [];
      const targetTransitions = Array.isArray(operationFrame.targetFrame?.sourceTargetOptionFrames) ? operationFrame.targetFrame.sourceTargetOptionFrames.map(frame => frame?.formulaTransition || "") : [];
      if (JSON.stringify(operationTransitions) !== JSON.stringify(expectedTransitions) || JSON.stringify(targetTransitions) !== JSON.stringify(expectedTransitions)) {
        return "contradictory-route-options";
      }
      return "";
    }
    function getAndrewsUnitSourceTargetRouteOptionsFromOperationFrame(operationFrame = null) {
      const mismatch = getAndrewsUnitOperationFrameMismatch(operationFrame);
      if (mismatch) {
        const diagnosticId = String(mismatch).startsWith("andrews-unit-source-target-route-options-")
          ? String(mismatch)
          : `andrews-unit-source-target-route-options-${mismatch}`;
        return blockAndrewsUnitSourceTargetRouteOptions(diagnosticId);
      }
      const routeOptionFrames = operationFrame.targetFrame.sourceTargetOptionFrames.map(cloneAndrewsUnitRouteOptionFrame).filter(Boolean);
      const sourceTargetOptionList = routeOptionFrames.map(frame => frame.formulaTransition);
      return {
        ok: true,
        status: "authorized",
        targetFormulaType: operationFrame.targetFrame.targetFormulaFrame.formulaType,
        sourceTargetOptions: sourceTargetOptionList.join("|"),
        sourceTargetOptionList,
        routeOptionFrames,
        operationFrame,
        diagnostics: []
      };
    }
    function applyAndrewsUnitSourceTargetRouteOptionsDataset(target = null, operationFrame = null) {
      const result = getAndrewsUnitSourceTargetRouteOptionsFromOperationFrame(operationFrame);
      if (!target || typeof target !== "object" || !target.dataset) {
        return result;
      }
      delete target.dataset.sourceTargetOptions;
      delete target.dataset.targetFormulaType;
      target.dataset.sourceTargetOptionsStatus = result.ok ? "andrews-structured-authorized" : "blocked";
      target.dataset.sourceTargetOptionsAuthority = result.ok ? "andrews-unit-source-target-route-options-operation-frame" : "";
      target.dataset.sourceTargetRouteCount = result.ok ? String(result.sourceTargetOptionList.length) : "0";
      if (!result.ok) {
        return result;
      }
      target.dataset.sourceTargetOptions = result.sourceTargetOptions;
      target.dataset.targetFormulaType = result.targetFormulaType;
      return result;
    }
    function setActiveTenseMode(mode, {
      modeSystem = targetObject.TENSE_MODE_SYSTEM.european || "european",
      syncConventionState = true
    } = {}) {
      if (!Object.values(targetObject.TENSE_MODE).includes(mode)) {
        return;
      }
      if (targetObject.TenseModeState.mode !== mode) {
        if (!isToggleLockEnabled()) {
          clearAllToggleStateMaps({
            resetNonactiveSuffix: false
          });
        }
      }
      targetObject.TenseModeState.mode = mode;
      if (syncConventionState) {
        const system = getModeSystemValue(modeSystem);
        if (isUnitModeSystem(system)) {
          setStoredUnitTenseMode(mode);
        } else {
          setStoredEuropeanTenseMode(mode);
        }
      }
      if (targetObject.isNominalTenseMode(mode)) {
        applyResolvedConjugationSelectionState(resolveConjugationSelectionState({
          tenseMode: mode,
          group: targetObject.CONJUGATION_GROUPS.tense,
          classFilter: null
        }, {
          tenseMode: mode,
          availabilityEntries: []
        }));
      }
    }
    function setActiveFunctionMode(mode, {
      syncOutput = true
    } = {}) {
      const storedMode = setStoredEuropeanTenseMode(mode);
      if (!storedMode) {
        return;
      }
      if (syncOutput) {
        const functionSelection = resolveConjugationSelectionState(null, {
          tenseMode: storedMode
        });
        applyResolvedConjugationSelectionState(functionSelection);
        const formalMode = getFormalTenseModeForCurrentSelection(storedMode);
        setStoredUnitTenseMode(formalMode);
        const outputMode = getOutputTenseModeForUnit(formalMode) || formalMode || storedMode;
        setActiveTenseMode(outputMode, {
          modeSystem: targetObject.TENSE_MODE_SYSTEM.unit || "unit",
          syncConventionState: false
        });
      }
    }
    function setActiveEuropeanTenseMode(mode, options = {}) {
      return setActiveFunctionMode(mode, options);
    }
    function setActiveFunctionRole(role, options = {}) {
      const mode = getTenseModeForFunctionRole(role);
      if (!mode) {
        return "";
      }
      setActiveFunctionMode(mode, options);
      return mode;
    }
    function setActiveUnitMode(mode, {
      syncOutput = true
    } = {}) {
      const storedMode = setStoredUnitTenseMode(mode);
      if (!storedMode) {
        return;
      }
      const outputMode = getOutputTenseModeForUnit(storedMode);
      if (syncOutput && outputMode) {
        setActiveTenseMode(outputMode, {
          modeSystem: targetObject.TENSE_MODE_SYSTEM.unit || "unit"
        });
      }
    }
    function setActiveUnitKind(kind, options = {}) {
      const mode = getTenseModeForUnitKind(kind);
      if (!mode) {
        return "";
      }
      setActiveUnitMode(mode, options);
      return mode;
    }
    function getActiveVoiceMode() {
      return targetObject.VoiceModeState.mode;
    }
    function setActiveVoiceMode(mode) {
      if (!Object.values(targetObject.VOICE_MODE).includes(mode)) {
        return;
      }
      targetObject.VoiceModeState.mode = mode;
    }
    function getActiveDerivationMode() {
      return targetObject.DerivationModeState.mode;
    }
    function setActiveDerivationMode(mode) {
      if (!Object.values(targetObject.DERIVATION_MODE).includes(mode)) {
        return;
      }
      targetObject.DerivationModeState.mode = mode;
    }
    function getActiveDerivationType() {
      return targetObject.DerivationTypeState.type;
    }
    function setActiveDerivationType(type) {
      if (!Object.values(targetObject.DERIVATION_TYPE).includes(type)) {
        return;
      }
      targetObject.DerivationTypeState.type = type;
    }
    function getActiveCausativeSubtype() {
      return targetObject.CausativeSubtypeState.subtype || targetObject.CAUSATIVE_SUBTYPE.all;
    }
    function setActiveCausativeSubtype(subtype) {
      targetObject.CausativeSubtypeState.subtype = Object.values(targetObject.CAUSATIVE_SUBTYPE).includes(subtype) ? subtype : targetObject.CAUSATIVE_SUBTYPE.all;
    }
    function getDerivationValencyDelta(type) {
      if (type === targetObject.DERIVATION_TYPE.causative || type === targetObject.DERIVATION_TYPE.applicative) {
        return 1;
      }
      return 0;
    }
    function getEffectiveDerivationValencyDelta(verbMeta) {
      if (!verbMeta) {
        return 0;
      }
      if (Number.isFinite(verbMeta.derivationValencyDelta)) {
        return verbMeta.derivationValencyDelta;
      }
      const type = verbMeta.derivationType || "";
      return getDerivationValencyDelta(type);
    }
    function getSelectedNonactiveSuffix() {
      return targetObject.NonactiveSuffixState.selected;
    }
    function setSelectedNonactiveSuffix(value) {
      if (value === null) {
        targetObject.NonactiveSuffixState.selected = null;
        return;
      }
      if (!targetObject.NONACTIVE_SUFFIX_ORDER.includes(value)) {
        return;
      }
      targetObject.NonactiveSuffixState.selected = value;
    }
    function normalizeVerbSourceScope(scope) {
      if (scope === targetObject.VERB_SOURCE_SCOPE.active) {
        return targetObject.VERB_SOURCE_SCOPE.active;
      }
      if (scope === targetObject.VERB_SOURCE_SCOPE.nonactive) {
        return targetObject.VERB_SOURCE_SCOPE.nonactive;
      }
      if (scope === targetObject.VERB_SOURCE_SCOPE.both) {
        return targetObject.VERB_SOURCE_SCOPE.both;
      }
      return "";
    }
    function getToggleLockSourceScopeValue() {
      return normalizeVerbSourceScope(targetObject.ToggleLockValueState?.sourceScope || "");
    }
    function setToggleLockSourceScopeValue(scope) {
      const resolved = normalizeVerbSourceScope(scope) || targetObject.VERB_SOURCE_SCOPE.both;
      targetObject.ToggleLockValueState.sourceScope = resolved;
      return resolved;
    }
    function getVerbSourceScope() {
      const lockedScope = isToggleLockEnabled() ? getToggleLockSourceScopeValue() : "";
      if (lockedScope) {
        return lockedScope;
      }
      return normalizeVerbSourceScope(targetObject.VerbSourceScopeState.scope) || targetObject.VERB_SOURCE_SCOPE.both;
    }
    function setVerbSourceScope(scope, {
      syncCombinedMode = true,
      syncLock = syncCombinedMode,
      respectLock = !syncCombinedMode
    } = {}) {
      const resolved = normalizeVerbSourceScope(scope) || targetObject.VERB_SOURCE_SCOPE.both;
      const lockedScope = isToggleLockEnabled() ? getToggleLockSourceScopeValue() : "";
      const nextScope = lockedScope && respectLock ? lockedScope : resolved;
      targetObject.VerbSourceScopeState.scope = nextScope;
      if (isToggleLockEnabled() && syncLock) {
        setToggleLockSourceScopeValue(nextScope);
      }
      if (!syncCombinedMode) {
        return;
      }
      if (nextScope === targetObject.VERB_SOURCE_SCOPE.active) {
        setCombinedMode(targetObject.COMBINED_MODE.active);
      } else if (nextScope === targetObject.VERB_SOURCE_SCOPE.nonactive) {
        setCombinedMode(targetObject.COMBINED_MODE.nonactive);
      }
    }
    function getCombinedMode() {
      if (getActiveDerivationMode() === targetObject.DERIVATION_MODE.nonactive || getActiveVoiceMode() === targetObject.VOICE_MODE.passive) {
        return targetObject.COMBINED_MODE.nonactive;
      }
      return targetObject.COMBINED_MODE.active;
    }
    function setCombinedMode(mode) {
      if (!Object.values(targetObject.COMBINED_MODE).includes(mode)) {
        return;
      }
      if (getCombinedMode() !== mode) {
        const selectionState = getCurrentResolvedConjugationSelectionState();
        const tenseValue = selectionState.group === targetObject.CONJUGATION_GROUPS.universal ? selectionState.universalTenseValue : selectionState.tenseValue;
        resetToggleStateForTense(tenseValue);
      }
      if (mode === targetObject.COMBINED_MODE.nonactive) {
        setActiveDerivationMode(targetObject.DERIVATION_MODE.nonactive);
        setActiveVoiceMode(targetObject.VOICE_MODE.passive);
        const lockedScope = isToggleLockEnabled() ? getToggleLockSourceScopeValue() : "";
        if (lockedScope) {
          targetObject.VerbSourceScopeState.scope = lockedScope;
        } else if (getVerbSourceScope() !== targetObject.VERB_SOURCE_SCOPE.both) {
          targetObject.VerbSourceScopeState.scope = targetObject.VERB_SOURCE_SCOPE.nonactive;
        }
      } else {
        setActiveDerivationMode(targetObject.DERIVATION_MODE.active);
        setActiveVoiceMode(targetObject.VOICE_MODE.active);
        const lockedScope = isToggleLockEnabled() ? getToggleLockSourceScopeValue() : "";
        if (lockedScope) {
          targetObject.VerbSourceScopeState.scope = lockedScope;
        } else if (getVerbSourceScope() !== targetObject.VERB_SOURCE_SCOPE.both) {
          targetObject.VerbSourceScopeState.scope = targetObject.VERB_SOURCE_SCOPE.active;
        }
      }
    }
    const FORMULA_CNV_LEGACY_TAB_TENSES = new Set(["presente-desiderativo", "adjetivo-preterito", "adjetivo-perfecto", "adjetivo-preterito-tik", "adjetivo-perfecto-tik", "adjetivo-preterito-naj", "adjetivo-perfecto-naj", "pasado-remoto-adverbio-activo", "perfecto", "pluscuamperfecto", "condicional-perfecto", "condicional"]);
    function getTenseOrderForMode(mode) {
      if (mode === targetObject.TENSE_MODE.particula) {
        return [];
      }
      if (mode === targetObject.TENSE_MODE.sustantivo) {
        return [];
      }
      if (mode === targetObject.TENSE_MODE.adjetivo) {
        return targetObject.ADJECTIVE_TAB_TENSE_ORDER;
      }
      if (mode === targetObject.TENSE_MODE.adverbio) {
        return ["pasado-remoto-adverbio-activo"];
      }
      return targetObject.TENSE_ORDER.filter(tense => tense !== "sustantivo-verbal" && tense !== "potencial" && tense !== "potencial-habitual" && !targetObject.PATIENTIVO_ADJECTIVE_TENSE_SET.has(tense) && tense !== "agentivo" && tense !== "agentivo-presente" && tense !== "agentivo-preterito" && tense !== "agentivo-futuro" && tense !== "patientivo" && tense !== "instrumentivo" && !targetObject.isPredicateNominalTense(tense) && tense !== "calificativo-instrumentivo" && tense !== "locativo-temporal" && !FORMULA_CNV_LEGACY_TAB_TENSES.has(tense));
    }
    function isNounPossessionSplitTense(tenseValue) {
      return tenseValue === "instrumentivo";
    }
    function isNounTenseVisibleForCombinedMode(tenseValue, combinedMode = getCombinedMode()) {
      if (!tenseValue) {
        return false;
      }
      if (isPatientivoAdjectiveTense(tenseValue) || isPotencialProfileTense(tenseValue)) {
        return combinedMode === getResolvedNominalCombinedModeForTense(tenseValue, combinedMode);
      }
      if (isNounPossessionSplitTense(tenseValue)) {
        return true;
      }
      if (combinedMode !== targetObject.COMBINED_MODE.nonactive) {
        return true;
      }
      return tenseValue === "patientivo" || targetObject.isPredicateNominalTense(tenseValue) || tenseValue === "locativo-temporal";
    }
    function getNounTenseOrderForCombinedMode(combinedMode = getCombinedMode(), mode = getActiveTenseMode()) {
      const resolvedMode = targetObject.isNominalTenseMode(mode) ? mode : targetObject.TENSE_MODE.sustantivo;
      return getTenseOrderForMode(resolvedMode).filter(tenseValue => isNounTenseVisibleForCombinedMode(tenseValue, combinedMode));
    }
    function isThreeColumnPanelLayout() {
      return typeof targetObject.window !== "undefined" && typeof targetObject.window.matchMedia === "function" && targetObject.window.matchMedia("(min-width: 1025px)").matches;
    }
    function captureViewportAnchor(element) {
      if (!element || typeof element.getBoundingClientRect !== "function") {
        return null;
      }
      const rect = element.getBoundingClientRect();
      const anchor = {
        top: rect.top,
        left: rect.left,
        node: element,
        selector: ""
      };
      if (element.matches?.("[data-tense-value]")) {
        const selectorParts = [`[data-tense-value="${targetObject.escapeAttributeSelectorValue(element.getAttribute("data-tense-value") || "")}"]`];
        const tenseGroup = element.getAttribute("data-tense-group") || "";
        const tenseColumn = element.getAttribute("data-tense-column") || "";
        if (tenseGroup) {
          selectorParts.push(`[data-tense-group="${targetObject.escapeAttributeSelectorValue(tenseGroup)}"]`);
        }
        if (tenseColumn) {
          selectorParts.push(`[data-tense-column="${targetObject.escapeAttributeSelectorValue(tenseColumn)}"]`);
        }
        anchor.selector = selectorParts.join("");
        return anchor;
      }
      if (element.matches?.("[data-nonactive-suffix]")) {
        anchor.selector = `[data-nonactive-suffix="${targetObject.escapeAttributeSelectorValue(element.getAttribute("data-nonactive-suffix") || "")}"]`;
        return anchor;
      }
      if (element.matches?.("[data-tense-mode]")) {
        anchor.selector = `[data-tense-mode="${targetObject.escapeAttributeSelectorValue(element.getAttribute("data-tense-mode") || "")}"]`;
        return anchor;
      }
      if (element.matches?.("[data-combined-mode]")) {
        anchor.selector = `[data-combined-mode="${targetObject.escapeAttributeSelectorValue(element.getAttribute("data-combined-mode") || "")}"]`;
        return anchor;
      }
      if (element.matches?.("[data-derivation-type]")) {
        anchor.selector = `[data-derivation-type="${targetObject.escapeAttributeSelectorValue(element.getAttribute("data-derivation-type") || "")}"]`;
        return anchor;
      }
      if (element.id) {
        anchor.selector = `#${targetObject.escapeAttributeSelectorValue(element.id)}`;
        return anchor;
      }
      return anchor;
    }
    function resolveViewportAnchor(anchor) {
      if (!anchor) {
        return null;
      }
      if (anchor.node?.isConnected) {
        return anchor.node;
      }
      if (anchor.selector) {
        return targetObject.document.querySelector(anchor.selector);
      }
      return null;
    }
    var VIEWPORT_ANCHOR_RESERVATION_SEQUENCE = 0;
    function captureStickyDesktopPaneAnchor(anchorSource) {
      if (!isThreeColumnPanelLayout()) {
        return null;
      }
      if (!anchorSource || typeof anchorSource.closest !== "function" || !anchorSource.closest("#panel-stack-pane-tense")) {
        return null;
      }
      const pane = targetObject.document.getElementById("panel-stack-pane-tense");
      return captureViewportAnchor(pane);
    }
    function captureViewportAnchorDelta(anchor) {
      const target = resolveViewportAnchor(anchor);
      if (!target || typeof target.getBoundingClientRect !== "function") {
        return null;
      }
      const afterRect = target.getBoundingClientRect();
      return {
        target,
        deltaX: afterRect.left - anchor.left,
        deltaY: afterRect.top - anchor.top
      };
    }
    function captureOutputHeightReservation(anchorSource) {
      if (!isThreeColumnPanelLayout() || !anchorSource || typeof anchorSource.closest !== "function" || !anchorSource.closest("#panel-stack-pane-tense")) {
        return null;
      }
      const output = targetObject.document.getElementById("all-tense-conjugations");
      if (!output) {
        return null;
      }
      const rect = output.getBoundingClientRect();
      const reservedHeight = Math.ceil(Math.max(rect.height || 0, output.offsetHeight || 0, output.scrollHeight || 0));
      if (!(reservedHeight > 0)) {
        return null;
      }
      return {
        element: output,
        previousMinHeight: output.style.minHeight || "",
        token: `anchor-${++VIEWPORT_ANCHOR_RESERVATION_SEQUENCE}`,
        reservedHeight
      };
    }
    function applyOutputHeightReservation(reservation) {
      if (!reservation?.element) {
        return;
      }
      const element = reservation.element;
      element.dataset.viewportAnchorReservation = reservation.token;
      const currentInlineMinHeight = parseFloat(element.style.minHeight || "") || 0;
      const nextMinHeight = Math.max(currentInlineMinHeight, reservation.reservedHeight);
      element.style.minHeight = `${Math.ceil(nextMinHeight)}px`;
    }
    function releaseOutputHeightReservation(reservation, {
      delayMs = 320
    } = {}) {
      if (!reservation?.element) {
        return;
      }
      const element = reservation.element;
      const restore = () => {
        if (element.dataset.viewportAnchorReservation !== reservation.token) {
          return;
        }
        delete element.dataset.viewportAnchorReservation;
        element.style.minHeight = reservation.previousMinHeight;
      };
      if (typeof targetObject.window !== "undefined" && typeof targetObject.window.setTimeout === "function") {
        targetObject.window.setTimeout(restore, Math.max(0, delayMs));
        return;
      }
      restore();
    }
    function preserveViewportAnchorPosition(anchorSource, callback) {
      if (typeof callback !== "function") {
        return;
      }
      if (typeof targetObject.window === "undefined" || typeof targetObject.window.scrollBy !== "function") {
        callback();
        return;
      }
      const isTensePaneAction = isThreeColumnPanelLayout() && anchorSource && typeof anchorSource.closest === "function" && anchorSource.closest("#panel-stack-pane-tense");
      if (isTensePaneAction) {
        callback();
        return;
      }
      const primaryAnchor = captureViewportAnchor(anchorSource);
      if (!primaryAnchor) {
        callback();
        return;
      }
      const paneAnchor = null; // sticky pane position is unreliable as a scrollBy anchor (getBoundingClientRect mixes natural-flow and sticky-clamped positions)
      const outputReservation = captureOutputHeightReservation(anchorSource);
      applyOutputHeightReservation(outputReservation);
      try {
        callback();
      } catch (error) {
        releaseOutputHeightReservation(outputReservation, {
          delayMs: 0
        });
        throw error;
      }
      const scheduleFrame = typeof targetObject.window.requestAnimationFrame === "function" ? targetObject.window.requestAnimationFrame.bind(targetObject.window) : fn => targetObject.window.setTimeout(fn, 16);
      let frameCount = 0;
      let stableFrames = 0;
      const maxFrames = paneAnchor ? 8 : 6;
      const settle = () => {
        frameCount += 1;
        const primaryDelta = captureViewportAnchorDelta(primaryAnchor);
        const paneDelta = captureViewportAnchorDelta(paneAnchor);
        const resolvedDelta = primaryDelta || paneDelta;
        let deltaX = Number(resolvedDelta?.deltaX) || 0;
        let deltaY = Number(resolvedDelta?.deltaY) || 0;
        if ((!primaryDelta || Math.abs(deltaX) <= 0.5 && Math.abs(deltaY) <= 0.5) && paneDelta && (Math.abs(Number(paneDelta.deltaX) || 0) > 0.5 || Math.abs(Number(paneDelta.deltaY) || 0) > 0.5)) {
          deltaX = Number(paneDelta.deltaX) || 0;
          deltaY = Number(paneDelta.deltaY) || 0;
        }
        const needsAdjust = Math.abs(deltaX) > 0.5 || Math.abs(deltaY) > 0.5;
        if (needsAdjust) {
          targetObject.window.scrollBy(deltaX, deltaY);
          stableFrames = 0;
        } else {
          stableFrames += 1;
        }
        if (frameCount < maxFrames && stableFrames < 2) {
          scheduleFrame(settle);
          return;
        }
        releaseOutputHeightReservation(outputReservation);
      };
      scheduleFrame(settle);
    }
    var PANEL_STACK_ORDER = ["inputs", "formula", "output"];
    var PANEL_STACK_REVEAL_CLASS = "is-pane-entering";
    var PANEL_STACK_REVEAL_DURATION_MS = 180;
    var PANEL_STACK_SWIPE_MIN_DISTANCE_PX = 56;
    var PANEL_STACK_SWIPE_MIN_AXIS_RATIO = 1.25;
    var PANEL_STACK_SWIPE_MAX_DURATION_MS = 700;
    var PANEL_STACK_SWIPE_VIEWPORT_EDGE_PX = 24;
    var PANEL_STACK_SWIPE_VISUAL_LIMIT_PX = 144;
    var PANEL_STACK_SWIPE_VISUAL_LIMIT_RATIO = 0.32;
    var PANEL_STACK_SWIPE_EDGE_RESISTANCE = 0.22;
    var PANEL_STACK_SWIPE_SNAP_DURATION_MS = 180;
    function normalizePanelStackMode(mode) {
      if (mode === "formula" || mode === "tense") {
        return "formula";
      }
      if (mode === "output") {
        return "output";
      }
      return "inputs";
    }
    function getAdjacentPanelStackMode(mode, direction = 1) {
      const normalizedMode = normalizePanelStackMode(mode);
      const currentIndex = PANEL_STACK_ORDER.indexOf(normalizedMode);
      if (currentIndex === -1) {
        return PANEL_STACK_ORDER[0];
      }
      const delta = direction < 0 ? -1 : 1;
      const nextIndex = (currentIndex + delta + PANEL_STACK_ORDER.length) % PANEL_STACK_ORDER.length;
      return PANEL_STACK_ORDER[nextIndex];
    }
    function getPanelStackSwipeTargetMode(mode, direction = 1) {
      const normalizedMode = normalizePanelStackMode(mode);
      const currentIndex = PANEL_STACK_ORDER.indexOf(normalizedMode);
      if (currentIndex === -1) {
        return "";
      }
      const nextIndex = currentIndex + (direction < 0 ? -1 : 1);
      if (nextIndex < 0 || nextIndex >= PANEL_STACK_ORDER.length) {
        return "";
      }
      return PANEL_STACK_ORDER[nextIndex];
    }
    function resolvePanelStackSwipeDirection({
      startX = 0,
      startY = 0,
      endX = 0,
      endY = 0,
      durationMs = 0
    } = {}) {
      const deltaX = Number(endX) - Number(startX);
      const deltaY = Number(endY) - Number(startY);
      const elapsed = Number(durationMs) || 0;
      if (elapsed < 0 || elapsed > PANEL_STACK_SWIPE_MAX_DURATION_MS) {
        return 0;
      }
      if (Math.abs(deltaX) < PANEL_STACK_SWIPE_MIN_DISTANCE_PX) {
        return 0;
      }
      if (Math.abs(deltaX) < Math.abs(deltaY) * PANEL_STACK_SWIPE_MIN_AXIS_RATIO) {
        return 0;
      }
      return deltaX < 0 ? 1 : -1;
    }
    function getPanelStackSwipeVisualOffset({
      deltaX = 0,
      viewportWidth = 0,
      canNavigate = true
    } = {}) {
      const width = Math.max(1, Number(viewportWidth) || 1);
      const visualLimit = Math.min(
        PANEL_STACK_SWIPE_VISUAL_LIMIT_PX,
        Math.max(72, width * PANEL_STACK_SWIPE_VISUAL_LIMIT_RATIO)
      );
      const resistance = canNavigate ? 1 : PANEL_STACK_SWIPE_EDGE_RESISTANCE;
      const resistedDelta = (Number(deltaX) || 0) * resistance;
      return Math.round(Math.max(-visualLimit, Math.min(visualLimit, resistedDelta)));
    }
    function isPanelStackSwipeExcludedTarget(target, root = null) {
      if (!target || typeof target.closest !== "function") {
        return true;
      }
      if (target.closest(["input", "textarea", "select", "option", "button", "a", "summary", "[contenteditable='true']", "[data-panel-stack-swipe-ignore]"].join(", "))) {
        return true;
      }
      let current = target;
      while (current && current !== root) {
        if (Number(current.scrollWidth) > Number(current.clientWidth) + 2 && typeof targetObject.window !== "undefined" && typeof targetObject.window.getComputedStyle === "function") {
          const overflowX = String(targetObject.window.getComputedStyle(current).overflowX || "");
          if (overflowX === "auto" || overflowX === "scroll") {
            return true;
          }
        }
        current = current.parentElement;
      }
      return false;
    }
    function initPanelStackSwipeNavigation() {
      const root = targetObject.document.querySelector('.panel-grid[data-andrews-layout="source-authority-authorized-result"]');
      if (!root || root.dataset.panelStackSwipeBound === "true") {
        return false;
      }
      root.dataset.panelStackSwipeBound = "true";
      root.dataset.panelStackSwipe = "enabled";
      let activeGesture = null;
      let snapTimer = null;
      const resetDragPresentation = ({ animate = false } = {}) => {
        root.style.setProperty("--panel-stack-drag-x", "0px");
        root.style.setProperty("--panel-stack-drag-scale", "1");
        root.classList.remove("is-panel-stack-swiping");
        delete root.dataset.panelStackSwipeIntent;
        if (snapTimer) {
          targetObject.clearTimeout(snapTimer);
          snapTimer = null;
        }
        root.classList.toggle("is-panel-stack-snapping-back", animate);
        if (animate) {
          snapTimer = targetObject.setTimeout(() => {
            root.classList.remove("is-panel-stack-snapping-back");
            root.style.removeProperty("--panel-stack-drag-x");
            root.style.removeProperty("--panel-stack-drag-scale");
            snapTimer = null;
          }, PANEL_STACK_SWIPE_SNAP_DURATION_MS);
          return;
        }
        root.style.removeProperty("--panel-stack-drag-x");
        root.style.removeProperty("--panel-stack-drag-scale");
      };
      const clearGesture = ({ animate = false } = {}) => {
        activeGesture = null;
        resetDragPresentation({ animate });
      };
      root.addEventListener("pointerdown", event => {
        if (event.pointerType !== "touch" || event.isPrimary === false || isThreeColumnPanelLayout() || isPanelStackSwipeExcludedTarget(event.target, root)) {
          return;
        }
        const viewportWidth = Number(targetObject.window.innerWidth) || 0;
        if (Number(event.clientX) <= PANEL_STACK_SWIPE_VIEWPORT_EDGE_PX || viewportWidth > 0 && Number(event.clientX) >= viewportWidth - PANEL_STACK_SWIPE_VIEWPORT_EDGE_PX) {
          return;
        }
        resetDragPresentation();
        activeGesture = {
          pointerId: event.pointerId,
          startX: event.clientX,
          startY: event.clientY,
          endX: event.clientX,
          endY: event.clientY,
          startedAt: Date.now()
        };
        if (typeof root.setPointerCapture === "function") {
          root.setPointerCapture(event.pointerId);
        }
      }, {
        passive: true
      });
      root.addEventListener("pointermove", event => {
        if (!activeGesture || activeGesture.pointerId !== event.pointerId) {
          return;
        }
        activeGesture.endX = event.clientX;
        activeGesture.endY = event.clientY;
        const deltaX = activeGesture.endX - activeGesture.startX;
        const deltaY = activeGesture.endY - activeGesture.startY;
        if (Math.abs(deltaX) > 12 && Math.abs(deltaX) > Math.abs(deltaY) * PANEL_STACK_SWIPE_MIN_AXIS_RATIO) {
          const stackRoot = targetObject.document.querySelector(".panel-stack");
          const activeMode = stackRoot?.getAttribute("data-active-pane") || "inputs";
          const direction = deltaX < 0 ? 1 : -1;
          const canNavigate = Boolean(getPanelStackSwipeTargetMode(activeMode, direction));
          const visualOffset = getPanelStackSwipeVisualOffset({
            deltaX,
            viewportWidth: targetObject.window.innerWidth,
            canNavigate
          });
          const progress = Math.min(1, Math.abs(deltaX) / PANEL_STACK_SWIPE_MIN_DISTANCE_PX);
          root.style.setProperty("--panel-stack-drag-x", `${visualOffset}px`);
          root.style.setProperty("--panel-stack-drag-scale", String(1 - progress * 0.012));
          root.dataset.panelStackSwipeIntent = canNavigate
            ? direction > 0 ? "next" : "previous"
            : "blocked";
          root.classList.add("is-panel-stack-swiping");
          event.preventDefault();
        }
      }, {
        passive: false
      });
      root.addEventListener("pointerup", event => {
        if (!activeGesture || activeGesture.pointerId !== event.pointerId) {
          return;
        }
        activeGesture.endX = event.clientX;
        activeGesture.endY = event.clientY;
        const gesture = activeGesture;
        if (typeof root.releasePointerCapture === "function" && root.hasPointerCapture?.(event.pointerId)) {
          root.releasePointerCapture(event.pointerId);
        }
        const direction = resolvePanelStackSwipeDirection({
          ...gesture,
          durationMs: Date.now() - gesture.startedAt
        });
        if (!direction) {
          clearGesture({ animate: true });
          return;
        }
        const stackRoot = targetObject.document.querySelector(".panel-stack");
        const activeMode = stackRoot?.getAttribute("data-active-pane") || "inputs";
        const targetMode = getPanelStackSwipeTargetMode(activeMode, direction);
        if (!targetMode) {
          clearGesture({ animate: true });
          return;
        }
        root.dataset.panelStackLastNavigation = "swipe";
        root.dataset.panelStackSwipeDirection = direction > 0 ? "next" : "previous";
        clearGesture();
        setLeftPanelStackMode(targetMode);
        if (typeof targetObject.syncEntradaUrlSegmentsFromCurrentState === "function") {
          targetObject.syncEntradaUrlSegmentsFromCurrentState({
            replace: true
          });
        }
      });
      root.addEventListener("pointercancel", () => clearGesture({ animate: true }), {
        passive: true
      });
      return true;
    }
    function setLeftPanelStackMode(mode) {
      const normalizedMode = normalizePanelStackMode(mode);
      const buttons = Array.from(targetObject.document.querySelectorAll("[data-panel-stack-tab]"));
      const panes = Array.from(targetObject.document.querySelectorAll("[data-panel-stack-pane]"));
      const stackRoot = targetObject.document.querySelector(".panel-stack");
      const previousMode = stackRoot?.getAttribute("data-active-pane") || "";
      const showAllPanes = isThreeColumnPanelLayout();
      const shouldAnimateReveal = !showAllPanes && previousMode !== normalizedMode;
      const triggerPaneReveal = pane => {
        if (!pane || !shouldAnimateReveal) {
          return;
        }
        if (pane.__panelStackRevealTimer) {
          targetObject.clearTimeout(pane.__panelStackRevealTimer);
        }
        pane.classList.remove(PANEL_STACK_REVEAL_CLASS);
        targetObject.requestAnimationFrame(() => {
          pane.classList.add(PANEL_STACK_REVEAL_CLASS);
          pane.__panelStackRevealTimer = targetObject.setTimeout(() => {
            pane.classList.remove(PANEL_STACK_REVEAL_CLASS);
            pane.__panelStackRevealTimer = null;
          }, PANEL_STACK_REVEAL_DURATION_MS);
        });
      };
      if (stackRoot) {
        stackRoot.setAttribute("data-active-pane", normalizedMode);
      }
      buttons.forEach(button => {
        const isActive = button.getAttribute("data-panel-stack-tab") === normalizedMode;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-selected", String(isActive));
        button.tabIndex = showAllPanes ? -1 : isActive ? 0 : -1;
      });
      panes.forEach(pane => {
        const isActive = showAllPanes ? true : pane.getAttribute("data-panel-stack-pane") === normalizedMode;
        if (!isActive && pane.__panelStackRevealTimer) {
          targetObject.clearTimeout(pane.__panelStackRevealTimer);
          pane.__panelStackRevealTimer = null;
        }
        if (!isActive) {
          pane.classList.remove(PANEL_STACK_REVEAL_CLASS);
        }
        pane.hidden = !isActive;
        pane.classList.toggle("is-active", isActive);
        pane.setAttribute("aria-hidden", String(!isActive));
        if (isActive) {
          triggerPaneReveal(pane);
        }
      });
      targetObject.dispatchAppEvent("app:panel-stack-changed", {
        mode: normalizedMode,
        showAllPanes
      });
    }
    function initPanelEdgeNavigation() {
      const buttons = Array.from(targetObject.document.querySelectorAll("[data-pane-nav-direction][data-pane-nav-from]"));
      if (!buttons.length) {
        return;
      }
      buttons.forEach(button => {
        button.addEventListener("click", () => {
          const directionAttr = button.getAttribute("data-pane-nav-direction");
          const direction = directionAttr === "prev" ? -1 : 1;
          const stackRoot = targetObject.document.querySelector(".panel-stack");
          const activeMode = stackRoot?.getAttribute("data-active-pane");
          const fallbackMode = button.getAttribute("data-pane-nav-from");
          const originMode = activeMode || fallbackMode || "inputs";
          const targetMode = getAdjacentPanelStackMode(originMode, direction);
          setLeftPanelStackMode(targetMode);
          const targetTab = targetObject.document.querySelector(`[data-panel-stack-tab="${targetMode}"]`);
          if (targetTab && typeof targetTab.focus === "function") {
            targetTab.focus({
              preventScroll: true
            });
          }
        });
      });
    }
    function initLeftPanelStackTabs() {
      const buttons = Array.from(targetObject.document.querySelectorAll("[data-panel-stack-tab]"));
      if (!buttons.length) {
        return;
      }
      const focusButtonAt = index => {
        if (index < 0 || index >= buttons.length) {
          return;
        }
        const target = buttons[index];
        if (target && typeof target.focus === "function") {
          target.focus();
        }
      };
      buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
          const mode = button.getAttribute("data-panel-stack-tab") || "inputs";
          setLeftPanelStackMode(mode);
        });
        button.addEventListener("keydown", event => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            const nextIndex = (index + 1) % buttons.length;
            focusButtonAt(nextIndex);
            const mode = buttons[nextIndex].getAttribute("data-panel-stack-tab") || "inputs";
            setLeftPanelStackMode(mode);
          } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            const previousIndex = (index - 1 + buttons.length) % buttons.length;
            focusButtonAt(previousIndex);
            const mode = buttons[previousIndex].getAttribute("data-panel-stack-tab") || "inputs";
            setLeftPanelStackMode(mode);
          } else if (event.key === "Home") {
            event.preventDefault();
            focusButtonAt(0);
            const mode = buttons[0].getAttribute("data-panel-stack-tab") || "inputs";
            setLeftPanelStackMode(mode);
          } else if (event.key === "End") {
            event.preventDefault();
            const lastIndex = buttons.length - 1;
            focusButtonAt(lastIndex);
            const mode = buttons[lastIndex].getAttribute("data-panel-stack-tab") || "inputs";
            setLeftPanelStackMode(mode);
          }
        });
      });
      const initialActive = buttons.find(button => button.classList.contains("is-active"));
      const initialMode = initialActive?.getAttribute("data-panel-stack-tab") || "inputs";
      setLeftPanelStackMode(initialMode);
      let previousShowAllPanes = isThreeColumnPanelLayout();
      const syncOnResize = () => {
        const stackRoot = targetObject.document.querySelector(".panel-stack");
        const showAllPanes = isThreeColumnPanelLayout();
        const focusedElement = targetObject.document.activeElement;
        const focusedPane = focusedElement?.closest?.("[data-panel-stack-pane]") || null;
        const focusedTab = focusedElement?.closest?.("[data-panel-stack-tab]") || null;
        const focusedPaneMode = focusedPane?.getAttribute("data-panel-stack-pane") || "";
        const focusedTabMode = focusedTab?.getAttribute("data-panel-stack-tab") || "";
        let activeMode = stackRoot?.getAttribute("data-active-pane") || initialMode;
        if (!showAllPanes && previousShowAllPanes && focusedPaneMode) {
          activeMode = focusedPaneMode;
        } else if (showAllPanes && !previousShowAllPanes && focusedTabMode) {
          activeMode = focusedTabMode;
        }
        setLeftPanelStackMode(activeMode);
        if (showAllPanes && !previousShowAllPanes && focusedTabMode) {
          const expandedPane = targetObject.document.querySelector(
            `[data-panel-stack-pane="${targetObject.escapeAttributeSelectorValue(focusedTabMode)}"]`
          );
          const focusExpandedPane = () => {
            if (!expandedPane || expandedPane.hidden) {
              return;
            }
            expandedPane.tabIndex = -1;
            expandedPane.focus?.({
              preventScroll: true
            });
          };
          if (typeof targetObject.window?.requestAnimationFrame === "function") {
            targetObject.window.requestAnimationFrame(focusExpandedPane);
          } else {
            focusExpandedPane();
          }
        }
        previousShowAllPanes = showAllPanes;
      };
      targetObject.window.addEventListener("resize", syncOnResize, {
        passive: true
      });
      initPanelStackSwipeNavigation();
    }
    function updateTenseModeTabs() {
      const buttons = targetObject.document.querySelectorAll(
        "button[data-tense-mode][data-classical-authority-mirror]"
      );
      if (!buttons.length) {
        return;
      }
      const mode = getActiveTenseMode();
      const isVerbMode = mode === targetObject.TENSE_MODE.verbo;
      const isNominalMode = targetObject.isNominalTenseMode(mode);
      targetObject.document.body.classList.toggle("is-sustantivo-mode", isNominalMode);
      targetObject.document.body.classList.toggle("is-verb-mode", isVerbMode);
      targetObject.document.body.classList.toggle("is-nonverb-mode", !isVerbMode);
      targetObject.document.body.classList.toggle("is-adjectival-function", getActiveFunctionRole() === "adjectival");
      targetObject.document.body.classList.toggle("is-cnv-unit", getActiveUnitKind() === "cnv");
      targetObject.document.body.classList.toggle("is-cnn-unit", getActiveUnitKind() === "cnn");
      const operators = targetObject.document.querySelector(".calc-operators");
      if (operators) {
        operators.dataset.tenseMode = mode || "";
        operators.removeAttribute("role");
        operators.removeAttribute("aria-selected");
        operators.removeAttribute("aria-pressed");
        delete operators.dataset.functionRole;
        delete operators.dataset.functionMode;
        operators.dataset.routeFunctionRole = getActiveFunctionRole();
        operators.dataset.routeFunctionMode = getActiveFunctionMode();
        operators.dataset.unitKind = getActiveUnitKind();
        operators.dataset.unitMode = getActiveUnitTenseModeForCurrentSelection();
        delete operators.dataset.sourceTargetOptions;
        delete operators.dataset.targetFormulaType;
      }
      const activeFunctionMode = getActiveFunctionMode();
      const activeUnitMode = getActiveUnitTenseModeForCurrentSelection();
      buttons.forEach(button => {
        const buttonMode = button.getAttribute("data-tense-mode");
        const buttonSystem = button.getAttribute("data-mode-system") || targetObject.TENSE_MODE_SYSTEM.function || targetObject.TENSE_MODE_SYSTEM.european || "function";
        const isUnitButton = isUnitModeSystem(buttonSystem);
        const isActive = isUnitButton ? buttonMode === activeUnitMode : buttonMode === activeFunctionMode;
        button.dataset.sourceTargetPerception = isUnitButton ? "unit-target-route-options" : "function-mode";
        if (isUnitButton) {
          const buttonSourceFrame = buildAndrewsUnitSourceTargetRouteOptionsSourceFrame(buttonMode);
          const buttonOperationFrame = buildAndrewsUnitSourceTargetRouteOptionsOperationFrame(buttonSourceFrame);
          applyAndrewsUnitSourceTargetRouteOptionsDataset(button, buttonOperationFrame);
        }
        if (operators && isUnitButton && isActive) {
          const activeSourceFrame = buildAndrewsUnitSourceTargetRouteOptionsSourceFrame(activeUnitMode);
          const activeOperationFrame = buildAndrewsUnitSourceTargetRouteOptionsOperationFrame(activeSourceFrame);
          applyAndrewsUnitSourceTargetRouteOptionsDataset(operators, activeOperationFrame);
        }
        button.classList.toggle("is-active", isActive);
        button.setAttribute("role", "tab");
        button.setAttribute("aria-selected", String(isActive));
        button.setAttribute("aria-pressed", String(isActive));
      });
      updateVoiceOperatorVisibility();
      updateDerivationTypeControl();
      updateCombinedModeTabs();
    }
    function initTenseModeTabs() {
      const buttons = targetObject.document.querySelectorAll(
        "button[data-tense-mode][data-classical-authority-mirror]"
      );
      buttons.forEach(button => {
        button.addEventListener("click", () => {
          const mode = button.getAttribute("data-tense-mode");
          if (!mode) {
            return;
          }
          const buttonSystem = button.getAttribute("data-mode-system") || targetObject.TENSE_MODE_SYSTEM.function || targetObject.TENSE_MODE_SYSTEM.european || "function";
          if (isUnitModeSystem(buttonSystem)) {
            setActiveUnitMode(mode);
            setStoredEuropeanTenseMode(getOutputTenseModeForUnit(normalizeUnitTenseModeValue(mode)) || mode);
          } else {
            setActiveFunctionMode(mode);
          }
          preserveViewportAnchorPosition(button, () => {
            targetObject.renderTenseTabs();
            const verbMeta = targetObject.getVerbInputMeta();
            targetObject.renderActiveConjugations({
              verb: verbMeta.displayVerb,
              objectPrefix: targetObject.getCurrentObjectPrefix()
            });
          });
        });
      });
      updateTenseModeTabs();
    }
    function updateVoiceOperatorVisibility() {
      const voiceOperator = targetObject.document.getElementById("calc-voice-operator");
      if (!voiceOperator) {
        return;
      }
      const isVerbMode = getActiveTenseMode() === targetObject.TENSE_MODE.verbo;
      voiceOperator.hidden = false;
      voiceOperator.classList.remove("is-hidden");
      voiceOperator.setAttribute("aria-hidden", "false");
      voiceOperator.classList.toggle("is-disabled", !isVerbMode);
      voiceOperator.setAttribute("aria-disabled", String(!isVerbMode));
    }
    function updateCombinedModeTabs() {
      const isVerbMode = getActiveTenseMode() === targetObject.TENSE_MODE.verbo;
      const selectedTense = getCurrentResolvedConjugationSelectionState().tenseValue || "";
      const isAdverbioMode = getActiveTenseMode() === targetObject.TENSE_MODE.adverbio || selectedTense === "pasado-remoto-adverbio-activo";
      const buttons = targetObject.document.querySelectorAll("[data-combined-mode]");
      if (!buttons.length) {
        return;
      }
      const mode = getCombinedMode();
      const container = targetObject.document.querySelector(".calc-operator-grid--voice");
      if (container) {
        const classicalLocaleContext = getClassicalLocaleContext();
        container.setAttribute("role", "group");
        container.setAttribute("aria-label", getLocalizedLabel({
          labelEs: "Voice"
        }, classicalLocaleContext, "Voice"));
        container.classList.toggle("is-disabled", !isVerbMode);
        container.setAttribute("aria-disabled", String(!isVerbMode));
      }
      buttons.forEach(button => {
        const combinedMode = button.getAttribute("data-combined-mode") || "";
        const isDisabled = !isVerbMode || isAdverbioMode && combinedMode === targetObject.COMBINED_MODE.nonactive;
        const isActive = button.getAttribute("data-combined-mode") === mode;
        button.classList.toggle("is-active", isActive);
        button.removeAttribute("role");
        button.removeAttribute("aria-selected");
        button.setAttribute("aria-pressed", String(isActive));
        button.disabled = isDisabled;
        button.setAttribute("aria-disabled", String(isDisabled));
      });
    }
    function initCombinedModeTabs() {
      const buttons = targetObject.document.querySelectorAll("[data-combined-mode]");
      buttons.forEach(button => {
        button.addEventListener("click", () => {
          if (getActiveTenseMode() !== targetObject.TENSE_MODE.verbo) {
            return;
          }
          const mode = button.getAttribute("data-combined-mode");
          if (!mode) {
            return;
          }
          setCombinedMode(mode);
          preserveViewportAnchorPosition(button, () => {
            updateCombinedModeTabs();
            targetObject.renderTenseTabs();
            const verbMeta = targetObject.getVerbInputMeta();
            targetObject.renderActiveConjugations({
              verb: verbMeta.displayVerb,
              objectPrefix: targetObject.getCurrentObjectPrefix()
            });
          });
        });
      });
      updateCombinedModeTabs();
    }
    function getDerivationTypeDisplayLabel(type, classicalLocaleContext = false) {
      const normalizedType = String(type || "");
      if (!normalizedType) {
        return "";
      }
      if (normalizedType === targetObject.DERIVATION_TYPE.direct) {
        return classicalLocaleContext ? "Tayilis" : "Directo";
      }
      if (normalizedType === targetObject.DERIVATION_TYPE.causative) {
        return classicalLocaleContext ? "Tetayiltilis" : "Causativo";
      }
      if (normalizedType === targetObject.DERIVATION_TYPE.applicative) {
        return classicalLocaleContext ? "Tetayililis" : "Aplicativo";
      }
      return normalizedType;
    }
    function getBlockedNounDerivationTypes(tenseValue = "") {
      const blocked = new Set();
      const verbInput = targetObject.document.getElementById("verb");
      const rawInput = targetObject.getSearchInputBase(verbInput?.value || "");
      const baseInput = String(rawInput || "").trim();
      if (!baseInput) {
        return blocked;
      }
      const resolvedTenseValue = tenseValue || getCurrentResolvedConjugationSelectionState({
        tenseMode: getActiveTenseMode()
      }).tenseValue || "sustantivo-verbal";
      const combinedMode = getCombinedMode();
      const derivedTypes = [targetObject.DERIVATION_TYPE.causative, targetObject.DERIVATION_TYPE.applicative];
      derivedTypes.forEach(derivationType => {
        const parsedVerb = targetObject.getParsedVerbForTab("noun-derivation-switch", baseInput, {
          derivationType,
          includeNonactiveStemMetadata: false,
          useSearchBase: false
        });
        const availability = targetObject.buildDerivationAvailabilityTargets({
          derivationType,
          verb: parsedVerb.verb || "",
          analysisVerb: parsedVerb.analysisVerb || parsedVerb.verb || "",
          objectPrefix: "",
          verbMeta: parsedVerb
        });
        const hasDerivedStem = Array.isArray(availability?.availabilityTargets) && availability.availabilityTargets.length > 0;
        const slotPlanBundle = targetObject.getNounObjectSlotPlansFromMeta(parsedVerb, resolvedTenseValue, {
          combinedMode
        });
        const derivedSlots = slotPlanBundle.slotPlans.filter(slot => slot.isAddedSlot);
        const hasNonspecificFiller = derivedSlots.length > 0 && derivedSlots.every(slot => slot.toggleValues.some(prefix => targetObject.SUSTANTIVO_VERBAL_TRANSITIVE_PREFIXES.has(prefix)));
        const allowCollapsedDerivedSlot = allowsCollapsedDerivedNounSlot({
          tenseValue: resolvedTenseValue,
          combinedMode,
          slotPlanBundle,
          derivationType
        });
        if (!hasDerivedStem || !hasNonspecificFiller && !allowCollapsedDerivedSlot) {
          blocked.add(derivationType);
        }
      });
      return blocked;
    }
    var DERIVATION_ANTIDERIVATIVE_COMPUTED_KEY = "";
    var DERIVATION_ANTIDERIVATIVE_PENDING_KEY = "";
    var DERIVATION_ANTIDERIVATIVE_STAGE = "off";
    var ShowDerivationAntiderivative = false;
    function getNextAntiderivativeStage(stage = "off") {
      if (stage === "off") {
        return "on";
      }
      if (stage === "on") {
        return "lock";
      }
      return "off";
    }
    function requestDerivationAntiderivativeLookup(renderKey, normalizedInput, lookupOptions) {
      if (!renderKey || !normalizedInput) {
        return;
      }
      if (DERIVATION_ANTIDERIVATIVE_PENDING_KEY === renderKey || DERIVATION_ANTIDERIVATIVE_COMPUTED_KEY === renderKey) {
        return;
      }
      DERIVATION_ANTIDERIVATIVE_PENDING_KEY = renderKey;
      renderDerivationAntiderivativePanel();
      targetObject.setTimeout(() => {
        targetObject.findDerivationalAntiderivatives(normalizedInput, lookupOptions);
        DERIVATION_ANTIDERIVATIVE_COMPUTED_KEY = renderKey;
        DERIVATION_ANTIDERIVATIVE_PENDING_KEY = "";
        renderDerivationAntiderivativePanel();
      }, 0);
    }
    function getUniqueAntiderivativeDirectStems(result) {
      const rows = Array.isArray(result?.candidates) ? result.candidates : [];
      return Array.from(new Set(rows.map(entry => String(entry?.directStem || "").trim()).filter(Boolean)));
    }
    function renderDerivationAntiderivativePanel(verbMeta = null) {
      const panel = targetObject.document.getElementById("derivation-antiderivative");
      if (!panel) {
        return;
      }
      if (!ShowDerivationAntiderivative) {
        panel.classList.add("is-hidden");
        panel.innerHTML = "";
        DERIVATION_ANTIDERIVATIVE_COMPUTED_KEY = "";
        DERIVATION_ANTIDERIVATIVE_PENDING_KEY = "";
        DERIVATION_ANTIDERIVATIVE_STAGE = "off";
        return;
      }
      const isVerbMode = getActiveTenseMode() === targetObject.TENSE_MODE.verbo;
      panel.classList.toggle("is-hidden", !isVerbMode);
      panel.innerHTML = "";
      if (!isVerbMode) {
        DERIVATION_ANTIDERIVATIVE_COMPUTED_KEY = "";
        DERIVATION_ANTIDERIVATIVE_PENDING_KEY = "";
        DERIVATION_ANTIDERIVATIVE_STAGE = "off";
        return;
      }
      const row = targetObject.document.createElement("div");
      row.className = "derivation-antiderivative__row";
      panel.appendChild(row);
      const derivationType = getActiveDerivationType();
      const resolvedVerbMeta = verbMeta || targetObject.getVerbInputMeta();
      const expectedValence = targetObject.getActiveVerbValency(resolvedVerbMeta);
      const verbInput = targetObject.document.getElementById("verb");
      const inputValue = targetObject.getSearchInputBase(verbInput?.value || "");
      const normalizedInput = String(inputValue || "").trim();
      const result = targetObject.document.createElement("div");
      result.className = "derivation-antiderivative__result";
      result.textContent = "Sin antiderivada calculada.";
      const fullReverseButton = targetObject.document.createElement("button");
      fullReverseButton.type = "button";
      fullReverseButton.className = "derivation-antiderivative__action";
      fullReverseButton.textContent = "antiderivada";
      row.appendChild(fullReverseButton);
      row.appendChild(result);
      if (!normalizedInput) {
        DERIVATION_ANTIDERIVATIVE_COMPUTED_KEY = "";
        DERIVATION_ANTIDERIVATIVE_PENDING_KEY = "";
        fullReverseButton.disabled = true;
        return;
      }
      const requestedType = targetObject.normalizeAntiderivativeRequestedType(derivationType);
      const targetStem = targetObject.normalizeDerivationStemValue(targetObject.getSearchInputBase(normalizedInput));
      const normalizedExpectedValence = targetObject.normalizeAntiderivativeExpectedValence(expectedValence) || "any";
      const renderKey = `${targetStem}|${requestedType || "both"}|${normalizedExpectedValence}`;
      const isPending = DERIVATION_ANTIDERIVATIVE_PENDING_KEY === renderKey;
      const hasResult = DERIVATION_ANTIDERIVATIVE_COMPUTED_KEY === renderKey;
      const stage = DERIVATION_ANTIDERIVATIVE_STAGE;
      fullReverseButton.classList.toggle("is-on", stage === "on");
      fullReverseButton.classList.toggle("is-lock", stage === "lock");
      fullReverseButton.setAttribute("aria-pressed", String(stage !== "off"));
      fullReverseButton.disabled = isPending;
      if (isPending) {
        fullReverseButton.textContent = "...";
      }
      const lookupOptions = requestedType ? {
        derivationType: requestedType,
        expectedValence,
        fullReverseSeeds: true
      } : {
        expectedValence,
        fullReverseSeeds: true
      };
      fullReverseButton.addEventListener("click", () => {
        const nextStage = getNextAntiderivativeStage(DERIVATION_ANTIDERIVATIVE_STAGE);
        DERIVATION_ANTIDERIVATIVE_STAGE = nextStage;
        if (nextStage === "off") {
          DERIVATION_ANTIDERIVATIVE_PENDING_KEY = "";
          DERIVATION_ANTIDERIVATIVE_COMPUTED_KEY = "";
          renderDerivationAntiderivativePanel();
          return;
        }
        requestDerivationAntiderivativeLookup(renderKey, normalizedInput, lookupOptions);
        renderDerivationAntiderivativePanel();
      });
      if (isPending) {
        result.textContent = "...";
        return;
      }
      if (stage === "off") {
        result.textContent = "Sin antiderivada calculada.";
        return;
      }
      if (stage === "lock" && !hasResult) {
        requestDerivationAntiderivativeLookup(renderKey, normalizedInput, lookupOptions);
        result.textContent = "...";
        return;
      }
      if (!hasResult) {
        result.textContent = "Sin antiderivada calculada.";
        return;
      }
      const cachedResult = targetObject.getCachedDerivationalAntiderivativeResult(targetStem, requestedType, lookupOptions);
      if (!cachedResult) {
        result.textContent = "Sin antiderivada calculada.";
        return;
      }
      const uniqueDirectStems = getUniqueAntiderivativeDirectStems(cachedResult);
      if (!uniqueDirectStems.length) {
        result.textContent = "Sin antiderivada disponible.";
        return;
      }
      result.textContent = uniqueDirectStems.join(" / ");
    }
    function updateDerivationTypeControl() {
      const select = targetObject.document.getElementById("derivation-type");
      const buttons = Array.from(targetObject.document.querySelectorAll("[data-derivation-type]"));
      if (!select && !buttons.length) {
        return;
      }
      const isVerbMode = getActiveTenseMode() === targetObject.TENSE_MODE.verbo;
      const isNounMode = targetObject.isNominalTenseMode(getActiveTenseMode());
      const canUseControl = isVerbMode || isNounMode;
      const nounTenseValue = isNounMode ? getCurrentResolvedConjugationSelectionState({
        tenseMode: getActiveTenseMode()
      }).tenseValue || getNounTenseOrderForCombinedMode(getCombinedMode(), getActiveTenseMode())[0] || "sustantivo-verbal" : "";
      const blockedNounTypes = isNounMode ? getBlockedNounDerivationTypes(nounTenseValue) : new Set();
      let activeType = getActiveDerivationType();
      const container = targetObject.document.querySelector(".derivation-type-row") || targetObject.document.querySelector(".calc-operator--derivation");
      if (container) {
        container.classList.toggle("is-disabled", !canUseControl);
        container.setAttribute("aria-disabled", String(!canUseControl));
      }
      if (select) {
        const options = Array.from(select.options || []);
        options.forEach(option => {
          const isBlocked = isNounMode && blockedNounTypes.has(option.value);
          // Keep the currently active derivation selectable to avoid silent fallback to direct.
          option.disabled = isBlocked && option.value !== activeType;
        });
        select.disabled = !canUseControl;
        if (!options.some(option => option.value === activeType)) {
          activeType = targetObject.DERIVATION_TYPE.direct;
          setActiveDerivationType(activeType);
        }
        select.value = activeType;
      }
      if (buttons.length) {
        const buttonGrid = buttons[0]?.closest(".calc-operator-grid");
        if (buttonGrid) {
          buttonGrid.setAttribute("role", "group");
          const classicalLocaleContext = getClassicalLocaleContext();
          buttonGrid.setAttribute("aria-label", getLocalizedLabel({
            labelEs: "Derivation"
          }, classicalLocaleContext, "Derivation"));
        }
        buttons.forEach(button => {
          const type = button.getAttribute("data-derivation-type") || "";
          const isBlocked = isNounMode && blockedNounTypes.has(type);
          const isActive = type === activeType;
          const isDisabled = !canUseControl || isBlocked && !isActive;
          button.classList.toggle("is-active", isActive);
          button.removeAttribute("role");
          button.removeAttribute("aria-selected");
          button.setAttribute("aria-pressed", String(isActive));
          button.disabled = isDisabled;
          button.setAttribute("aria-disabled", String(isDisabled));
        });
      }
      renderDerivationAntiderivativePanel();
      const subtypeRow = targetObject.document.getElementById("causative-subtype-row");
      if (subtypeRow) {
        const isCausative = activeType === targetObject.DERIVATION_TYPE.causative;
        subtypeRow.hidden = !isCausative;
        if (!isCausative) {
          setActiveCausativeSubtype(targetObject.CAUSATIVE_SUBTYPE.all);
          return;
        }
        // Probe which causative subtypes are available for the current verb.
        const typeAvailable = {
          one: true,
          two: true
        };
        if (typeof targetObject.getCausativeDerivationOptions === "function") {
          const verbMeta = targetObject.getVerbInputMeta();
          const probeVerb = verbMeta.analysisVerb || verbMeta.displayVerb || "";
          if (probeVerb) {
            const ruleBase = verbMeta.canonicalRuleBase || probeVerb;
            try {
              const probeAllowTypeTwo = typeof targetObject.computeAllowTypeTwoCausativeForParsedVerb === "function" ? targetObject.computeAllowTypeTwoCausativeForParsedVerb(verbMeta).allowTypeTwo : verbMeta.isMarkedTransitive === true;
              const probeOpts = targetObject.getCausativeDerivationOptions(ruleBase, ruleBase, {
                isTransitive: verbMeta.isMarkedTransitive === true,
                allowTypeTwo: probeAllowTypeTwo,
                ruleBase,
                fullRuleBase: ruleBase,
                canonicalRuleBase: ruleBase,
                canonicalFullRuleBase: ruleBase,
                rootPlusYaBase: verbMeta.rootPlusYaBase || "",
                hasLeadingDash: verbMeta.hasLeadingDash === true,
                parsedVerb: verbMeta
              });
              typeAvailable.one = probeOpts.some(o => o.type !== "type-two");
              typeAvailable.two = probeOpts.some(o => o.type === "type-two");
            } catch (_e) {
              // leave both enabled if probe fails
            }
          }
        }
        // If the active subtype has no available options, reset to "all".
        let activeSubtype = getActiveCausativeSubtype();
        if (activeSubtype === targetObject.CAUSATIVE_SUBTYPE.one && !typeAvailable.one || activeSubtype === targetObject.CAUSATIVE_SUBTYPE.two && !typeAvailable.two) {
          setActiveCausativeSubtype(targetObject.CAUSATIVE_SUBTYPE.all);
          activeSubtype = targetObject.CAUSATIVE_SUBTYPE.all;
        }
        Array.from(subtypeRow.querySelectorAll("[data-causative-subtype]")).forEach(btn => {
          const sub = btn.getAttribute("data-causative-subtype");
          const isActive = sub === activeSubtype;
          const isAvailable = sub === targetObject.CAUSATIVE_SUBTYPE.all || typeAvailable[sub] === true;
          btn.classList.toggle("is-active", isActive);
          btn.setAttribute("aria-pressed", String(isActive));
          btn.disabled = !isAvailable;
          btn.setAttribute("aria-disabled", String(!isAvailable));
        });
      }
    }
    function initDerivationTypeControl() {
      const select = targetObject.document.getElementById("derivation-type");
      const buttons = Array.from(targetObject.document.querySelectorAll("[data-derivation-type]"));
      if (!select && !buttons.length) {
        return;
      }
      if (select) {
        select.addEventListener("change", () => {
          setActiveDerivationType(select.value);
          preserveViewportAnchorPosition(select, () => {
            updateDerivationTypeControl();
            targetObject.renderTenseTabs();
            const verbMeta = targetObject.getVerbInputMeta();
            targetObject.renderActiveConjugations({
              verb: verbMeta.displayVerb,
              objectPrefix: targetObject.getCurrentObjectPrefix()
            });
          });
        });
      }
      if (buttons.length) {
        buttons.forEach(button => {
          button.addEventListener("click", () => {
            const type = button.getAttribute("data-derivation-type");
            if (!type) {
              return;
            }
            setActiveDerivationType(type);
            if (select) {
              select.value = type;
            }
            preserveViewportAnchorPosition(button, () => {
              updateDerivationTypeControl();
              targetObject.renderTenseTabs();
              const verbMeta = targetObject.getVerbInputMeta();
              targetObject.renderActiveConjugations({
                verb: verbMeta.displayVerb,
                objectPrefix: targetObject.getCurrentObjectPrefix()
              });
            });
          });
        });
      }
      const subtypeButtons = Array.from(targetObject.document.querySelectorAll("[data-causative-subtype]"));
      subtypeButtons.forEach(button => {
        button.addEventListener("click", () => {
          const subtype = button.getAttribute("data-causative-subtype");
          if (!subtype) {
            return;
          }
          setActiveCausativeSubtype(subtype);
          preserveViewportAnchorPosition(button, () => {
            updateDerivationTypeControl();
            const verbMeta = targetObject.getVerbInputMeta();
            targetObject.renderActiveConjugations({
              verb: verbMeta.displayVerb,
              objectPrefix: targetObject.getCurrentObjectPrefix()
            });
          });
        });
      });
      updateDerivationTypeControl();
    }
    function getCalcTransitivityLabel() {
      const activeButton = targetObject.document.querySelector(".verb-composer__slot-tab.is-active");
      if (activeButton?.textContent) {
        return activeButton.textContent.trim();
      }
      const select = targetObject.document.getElementById("composer-transitivity");
      const option = select?.selectedOptions?.[0];
      return option?.textContent?.trim() || "";
    }
    function getCalcDerivationLabel() {
      const activeButton = targetObject.document.querySelector("[data-derivation-type].is-active");
      if (activeButton?.textContent) {
        return activeButton.textContent.trim();
      }
      const select = targetObject.document.getElementById("derivation-type");
      const option = select?.selectedOptions?.[0];
      return option?.textContent?.trim() || "";
    }
    function getCalcTenseLabel() {
      if (getActiveTenseMode() === targetObject.TENSE_MODE.particula) {
        return "Partículas";
      }
      const classicalLocaleContext = getClassicalLocaleContext();
      const selectionState = getCurrentResolvedConjugationSelectionState();
      if (selectionState.group === targetObject.CONJUGATION_GROUPS.universal) {
        const tenseValue = selectionState.universalTenseValue;
        const classDetail = getPretUniversalClassDetail(tenseValue);
        const resolved = classDetail?.label ? getLocalizedLabel(classDetail.label, classicalLocaleContext, classDetail.label || tenseValue) : tenseValue || "";
        return resolved ? `Pretérito universal ${resolved}` : "Pretérito universal";
      }
      const tenseValue = selectionState.tenseValue || targetObject.TENSE_ORDER[0] || "";
      return getLocalizedLabel(targetObject.TENSE_LABELS[tenseValue], classicalLocaleContext, tenseValue);
    }
    function getCalcSourceScopeLabel() {
      const scope = getVerbSourceScope();
      if (scope === targetObject.VERB_SOURCE_SCOPE.active) {
        return "activo";
      }
      if (scope === targetObject.VERB_SOURCE_SCOPE.nonactive) {
        return "no activo";
      }
      return "activo + no activo";
    }
    function getCurrentNuclearClauseShell(options = {}) {
      if (typeof targetObject.buildNuclearClauseShellMetadata !== "function") {
        return null;
      }
      const mode = options.mode || getActiveTenseMode();
      const selectionState = getCurrentResolvedConjugationSelectionState({
        tenseMode: mode
      });
      const tenseValue = options.tenseValue || String(selectionState.group === targetObject.CONJUGATION_GROUPS.universal ? selectionState.universalTenseValue : selectionState.tenseValue);
      const verbMeta = typeof targetObject.getVerbInputMeta === "function" ? targetObject.getVerbInputMeta() : {};
      if (mode === targetObject.TENSE_MODE.particula) {
        return null;
      }
      const formalMode = getFormalTenseModeForCurrentSelection(mode);
      if (formalMode === (targetObject.TENSE_MODE.sustantivo || targetObject.TENSE_MODE.sustantivo)) {
        return targetObject.buildNuclearClauseShellMetadata({
          clauseKind: "nominal-nuclear-clause",
          subject: {
            prefix: targetObject.document.getElementById("subject-prefix")?.value || "",
            suffix: targetObject.document.getElementById("subject-suffix")?.value || ""
          },
          predicate: {
            stem: verbMeta?.displayVerb || verbMeta?.parseInputVerb || "",
            state: mode
          },
          predicateState: mode
        });
      }
      return targetObject.buildNuclearClauseShellMetadata({
        clauseKind: "verbal-nuclear-clause",
        subject: {
          prefix: targetObject.document.getElementById("subject-prefix")?.value || "",
          suffix: targetObject.document.getElementById("subject-suffix")?.value || ""
        },
        object: {
          prefix: targetObject.getCurrentObjectPrefix()
        },
        predicate: {
          stem: verbMeta?.displayVerb || verbMeta?.parseInputVerb || "",
          valency: getCalcTransitivityLabel()
        },
        tenseValue,
        tenseLabel: getCalcTenseLabel()
      });
    }
    function updateCalcSummary() {
      const summaryEl = targetObject.document.getElementById("calc-summary");
      if (!summaryEl) {
        return;
      }
      const isSimpleView = targetObject.getActiveUiDensityMode() === targetObject.UI_DENSITY_MODE.simple;
      const mode = getActiveTenseMode();
      const modeButton = targetObject.document.querySelector(`[data-tense-mode="${mode}"]`);
      const modeLabel = modeButton?.textContent?.trim() || (mode === targetObject.TENSE_MODE.sustantivo ? "CNN" : mode === targetObject.TENSE_MODE.adjetivo ? "Uso adjetival" : mode === targetObject.TENSE_MODE.adverbio ? "Uso adverbial" : mode === targetObject.TENSE_MODE.particula ? "Partícula" : "CNV");
      const voice = getCombinedMode();
      const voiceButton = targetObject.document.querySelector(`[data-combined-mode="${voice}"]`);
      const voiceLabel = voiceButton?.textContent?.trim() || (voice === targetObject.COMBINED_MODE.nonactive ? "No activo" : "Activo");
      const includeVoiceInSummary = mode === targetObject.TENSE_MODE.verbo && voice === targetObject.COMBINED_MODE.nonactive;
      const derivationLabel = mode === targetObject.TENSE_MODE.verbo ? getCalcDerivationLabel().toLowerCase() : "";
      const transitivityLabel = getCalcTransitivityLabel();
      const tenseLabel = getCalcTenseLabel();
      const sourceScopeLabel = !isSimpleView ? getCalcSourceScopeLabel() : "";
      const clauseShell = getCurrentNuclearClauseShell({
        mode
      });
      const clauseLabel = clauseShell?.displayLabel || "";
      const parts = (() => {
        if (mode === targetObject.TENSE_MODE.particula) {
          return ["Partículas", "inventario diagnóstico", "sin generación"];
        }
        if (mode !== targetObject.TENSE_MODE.verbo) {
          return [clauseLabel, tenseLabel, sourceScopeLabel].filter(Boolean);
        }
        if (isSimpleView) {
          return [clauseLabel, tenseLabel, transitivityLabel].filter(Boolean);
        }
        return [clauseLabel, tenseLabel, derivationLabel, transitivityLabel, sourceScopeLabel || (includeVoiceInSummary ? voiceLabel : "")].filter(Boolean);
      })();
      const fallback = mode === targetObject.TENSE_MODE.verbo ? isSimpleView ? "Selecciona tiempo" : "Selecciona tiempo y derivación" : mode === targetObject.TENSE_MODE.particula ? "Ingresa una partícula" : "Selecciona tiempo";
      if (mode === targetObject.TENSE_MODE.particula) {
        summaryEl.title = "Andrews Lección 3";
      } else {
        summaryEl.removeAttribute("title");
      }
      summaryEl.textContent = parts.length ? parts.join(" · ") : fallback;
    }
    function updateCalcStatus() {
      const statusEl = targetObject.document.getElementById("calc-status");
      if (!statusEl) {
        return;
      }
      const verbMeta = targetObject.getVerbInputMeta();
      const verbInput = targetObject.document.getElementById("verb");
      const isTemplateOnlyVerb = targetObject.isComposerTemplateOnlyBaseValue(targetObject.getSearchInputBase(verbInput?.value || ""));
      const hasVerb = Boolean(verbMeta?.displayVerb) && !isTemplateOnlyVerb;
      const isParticleMode = getActiveTenseMode() === targetObject.TENSE_MODE.particula;
      const hasError = Boolean(targetObject.document.querySelector("#all-tense-conjugations .conjugation-error")) || Boolean(targetObject.document.getElementById("verb")?.classList.contains("error"));
      const hasRows = Boolean(targetObject.document.querySelector("#all-tense-conjugations .conjugation-row"));
      statusEl.classList.toggle("is-error", hasError);
      if (!hasVerb) {
        statusEl.textContent = getPlaceholderLabel("conjugations", getClassicalLocaleContext(), isParticleMode ? "Ingresa una partícula o colocación para ver su marco Andrews." : "Ingresa un verbo para ver las conjugaciones.");
        statusEl.classList.remove("is-error");
        return;
      }
      if (isParticleMode) {
        statusEl.textContent = hasRows ? "Partícula · diagnóstico Andrews; no genera cláusulas verbales o nominales." : "Partícula · sin inventario confirmado.";
        statusEl.classList.toggle("is-error", !hasRows);
        return;
      }
      if (!hasRows) {
        statusEl.textContent = targetObject.getUiCopyLabel("calc-status-no-results", "Sin resultados para esta combinación.");
        statusEl.classList.add("is-error");
        return;
      }
      if (hasError) {
        statusEl.textContent = targetObject.getUiCopyLabel("calc-status-incompatible", "Revisa la combinación: hay formas incompatibles.");
        return;
      }
      const modeLabel = targetObject.getUiCopyLabel("calc-status-mode-prefix", "Entrada estructural");
      const outputUpdated = targetObject.getUiCopyLabel("calc-status-output-updated", "salida actualizada.");
      statusEl.textContent = `${modeLabel} · ${outputUpdated}`;
    }
    function updateCalcSummaryAndStatus() {
      if (typeof targetObject.syncAndrewsTenseAuthorityDomAudit === "function") {
        const mode = typeof getActiveTenseMode === "function" ? getActiveTenseMode() : "";
        targetObject.syncAndrewsTenseAuthorityDomAudit(targetObject.document.getElementById("tense-tabs"), {
          mode
        });
        targetObject.syncAndrewsTenseAuthorityDomAudit(targetObject.document.getElementById("output-universal-tabs"), {
          mode
        });
        targetObject.syncAndrewsTenseAuthorityDomAudit(targetObject.document.getElementById("all-tense-conjugations"), {
          mode
        });
      }
      updateCalcSummary();
      updateCalcStatus();
    }

    // === Preterito Universal ===
    var PRET_UNIVERSAL_VERB_OVERRIDES = [];
    function getPretUniversalVerbOverride(analysisVerb, isTransitive) {
      if (!analysisVerb) {
        return null;
      }
      if (!PRET_UNIVERSAL_VERB_OVERRIDES.length) {
        return null;
      }
      const transitivity = isTransitive ? "transitive" : "intransitive";
      for (const entry of PRET_UNIVERSAL_VERB_OVERRIDES) {
        if (!entry || !Array.isArray(entry.verbs) || !entry.verbs.includes(analysisVerb)) {
          continue;
        }
        if (entry.transitivity && entry.transitivity !== transitivity) {
          continue;
        }
        return entry;
      }
      return null;
    }

    // Preterit/perfective universal engine moved to pret_universal_context.js + pret_universal_engine.js.
    function updateVerbRuleHint({
      verb,
      analysisVerb,
      exactBaseVerb,
      objectPrefix,
      forceTransitive = false,
      hasSlashMarker = false,
      hasSuffixSeparator = false,
      hasLeadingDash = false,
      hasBoundMarker = false,
      hasCompoundMarker = false,
      hasImpersonalTlaPrefix = false,
      hasOptionalSupportiveI = false,
      hasNonspecificValence = false,
      rootPlusYaBase = "",
      rootPlusYaBasePronounceable = "",
      derivationType = ""
    }) {
      const wrapper = targetObject.document.getElementById("verb-rule");
      const textEl = targetObject.document.getElementById("verb-rule-text");
      if (!wrapper || !textEl) {
        return;
      }
      const clearHint = () => {
        textEl.textContent = "";
        wrapper.classList.add("is-empty");
      };
      if (!verb || getActiveTenseMode() !== targetObject.TENSE_MODE.verbo) {
        clearHint();
        return;
      }
      const isTransitive = forceTransitive || Boolean(objectPrefix);
      const markerOptions = targetObject.buildPretMarkerOptionsFromFlags({
        analysisVerb,
        hasSlashMarker,
        hasSuffixSeparator,
        hasLeadingDash,
        hasBoundMarker,
        hasCompoundMarker
      });
      const contextOptions = targetObject.buildPretContextOptionsFromFlags({
        hasSlashMarker,
        hasSuffixSeparator,
        hasLeadingDash,
        hasBoundMarker,
        hasCompoundMarker,
        hasImpersonalTlaPrefix,
        hasOptionalSupportiveI,
        hasNonspecificValence,
        exactBaseVerb,
        rootPlusYaBase,
        rootPlusYaBasePronounceable,
        derivationType
      });
      const resolvedBundle = targetObject.resolvePretUniversalContextBundle({
        verb,
        analysisVerb,
        isTransitive,
        markerOptions,
        contextOptions,
        includeSummary: true
      });
      const summary = resolvedBundle.summary;
      if (!summary) {
        clearHint();
        return;
      }
      const parts = [];
      if (hasImpersonalTlaPrefix) {
        parts.push("ta-impersonal");
      }
      parts.push(summary.ruleLabel);
      if (summary.shapeLabel) {
        parts.push(`descriptor ${summary.shapeLabel}`);
      }
      const classSummary = summary.resolvedClassList || summary.classList || "";
      if (classSummary) {
        parts.push(`classes ${classSummary}`);
      }
      if (summary.gates && summary.gates.length) {
        parts.push(`safegate ${summary.gates.join(", ")}`);
      }
      textEl.textContent = parts.join(" · ");
      wrapper.classList.remove("is-empty");
    }
    function getSelectedTenseTab() {
      return targetObject.TenseTabsState.selected;
    }
    function setSelectedTenseTab(value) {
      if (targetObject.TENSE_ORDER.includes(value)) {
        const previous = targetObject.TenseTabsState.selected;
        targetObject.TenseTabsState.selected = value;
        if (previous !== value) {
          resetToggleStateForTense(value);
          const formalMode = getFormalTenseModeForFunctionTense(value);
          const outputMode = getOutputTenseModeForUnit(formalMode) || formalMode || "";
          if (outputMode && targetObject.TenseModeState.mode !== outputMode) {
            setStoredUnitTenseMode(outputMode);
            setActiveTenseMode(outputMode, {
              modeSystem: targetObject.TENSE_MODE_SYSTEM.unit || "unit",
              syncConventionState: false
            });
          }
        }
      }
    }
    function getSelectedPretUniversalTab() {
      return targetObject.PreteritoUniversalTabsState.selected;
    }
    function setSelectedPretUniversalTab(value) {
      if (targetObject.PRETERITO_UNIVERSAL_ORDER.includes(value)) {
        const previous = targetObject.PreteritoUniversalTabsState.selected;
        targetObject.PreteritoUniversalTabsState.selected = value;
        if (previous !== value) {
          resetToggleStateForTense(value);
        }
      }
    }
    function buildConjugationSelectionState({
      tenseMode = getActiveTenseMode(),
      group = getActiveConjugationGroup(),
      tenseValue = getSelectedTenseTab(),
      universalTenseValue = getSelectedPretUniversalTab(),
      classFilter = targetObject.ClassFilterState.activeClass
    } = {}) {
      const resolvedTenseMode = Object.values(targetObject.TENSE_MODE).includes(tenseMode) ? tenseMode : getActiveTenseMode();
      const resolvedGroup = targetObject.isNominalTenseMode(resolvedTenseMode) ? targetObject.CONJUGATION_GROUPS.tense : group === targetObject.CONJUGATION_GROUPS.universal ? targetObject.CONJUGATION_GROUPS.universal : targetObject.CONJUGATION_GROUPS.tense;
      return {
        tenseMode: resolvedTenseMode,
        group: resolvedGroup,
        tenseValue: String(tenseValue || ""),
        universalTenseValue: String(universalTenseValue || ""),
        classFilter: classFilter || null
      };
    }
    function extractConjugationSelectionState(snapshot = null, fallback = {}) {
      if (!snapshot || typeof snapshot !== "object") {
        return buildConjugationSelectionState(fallback);
      }
      if (snapshot.selectionState && typeof snapshot.selectionState === "object") {
        const nestedSelectionState = snapshot.selectionState;
        const hasNestedClassFilter = Object.prototype.hasOwnProperty.call(nestedSelectionState, "classFilter");
        return buildConjugationSelectionState({
          ...fallback,
          ...nestedSelectionState,
          classFilter: hasNestedClassFilter ? nestedSelectionState.classFilter : fallback.classFilter
        });
      }
      const hasClassFilter = Object.prototype.hasOwnProperty.call(snapshot, "classFilter");
      return buildConjugationSelectionState({
        ...fallback,
        tenseMode: snapshot.tenseMode || snapshot.mode || fallback.tenseMode,
        group: snapshot.group || fallback.group,
        tenseValue: snapshot.tenseValue || snapshot.tense || snapshot.tenseTab || fallback.tenseValue,
        universalTenseValue: snapshot.universalTenseValue || snapshot.pret || snapshot.pretUniversalTab || fallback.universalTenseValue,
        classFilter: hasClassFilter ? snapshot.classFilter : fallback.classFilter
      });
    }
    function getPretUniversalAvailabilityEntry(tenseValue = "", availabilityEntries = targetObject.PreteritoUniversalAvailabilityCache) {
      const list = Array.isArray(availabilityEntries) ? availabilityEntries : [];
      return list.find(entry => entry?.tenseValue === String(tenseValue || "")) || null;
    }
    function isPretUniversalClassAvailable(classKey = "", availabilityEntries = targetObject.PreteritoUniversalAvailabilityCache) {
      if (!classKey) {
        return false;
      }
      return (Array.isArray(availabilityEntries) ? availabilityEntries : []).some(entry => targetObject.PRET_UNIVERSAL_CLASS_BY_TENSE[entry?.tenseValue || ""] === classKey && targetObject.resolveTenseAvailabilityIsAvailable(entry) === true);
    }
    function resolveConjugationSelectionState(selectionState = null, {
      tenseMode = getActiveTenseMode(),
      availabilityEntries = targetObject.PreteritoUniversalAvailabilityCache
    } = {}) {
      const requested = extractConjugationSelectionState(selectionState, {
        tenseMode
      });
      const resolvedTenseMode = Object.values(targetObject.TENSE_MODE).includes(tenseMode) ? tenseMode : requested.tenseMode;
      const allowedTenses = getTenseOrderForMode(resolvedTenseMode);
      const tenseValue = allowedTenses.includes(requested.tenseValue) ? requested.tenseValue : allowedTenses[0] || targetObject.TENSE_ORDER[0] || "";
      const hasAvailabilityEntries = Array.isArray(availabilityEntries) && availabilityEntries.length > 0;
      let universalTenseValue = targetObject.PRETERITO_UNIVERSAL_ORDER.includes(requested.universalTenseValue) ? requested.universalTenseValue : targetObject.PRETERITO_UNIVERSAL_ORDER[0] || "";
      let universalEntry = hasAvailabilityEntries ? getPretUniversalAvailabilityEntry(universalTenseValue, availabilityEntries) : null;
      if (hasAvailabilityEntries && targetObject.resolveTenseAvailabilityIsAvailable(universalEntry) !== true) {
        const firstAvailable = targetObject.getFirstAvailableEntry(availabilityEntries, universalTenseValue, "tenseValue");
        if (firstAvailable) {
          universalEntry = firstAvailable;
          universalTenseValue = firstAvailable.tenseValue || universalTenseValue;
        }
      }
      let group = targetObject.isNominalTenseMode(resolvedTenseMode) ? targetObject.CONJUGATION_GROUPS.tense : requested.group;
      if (group === targetObject.CONJUGATION_GROUPS.universal && hasAvailabilityEntries && targetObject.resolveTenseAvailabilityIsAvailable(universalEntry) !== true) {
        group = targetObject.CONJUGATION_GROUPS.tense;
      }
      let classFilter = requested.classFilter && targetObject.PRETERITO_CLASS_DETAIL_BY_KEY[requested.classFilter] ? requested.classFilter : null;
      if (!targetObject.PRETERITO_CLASS_TENSES.has(tenseValue)) {
        classFilter = null;
      } else if (hasAvailabilityEntries && classFilter && !isPretUniversalClassAvailable(classFilter, availabilityEntries)) {
        classFilter = null;
      }
      return buildConjugationSelectionState({
        tenseMode: resolvedTenseMode,
        group,
        tenseValue,
        universalTenseValue,
        classFilter
      });
    }
    function applyResolvedConjugationSelectionState(resolvedSelectionState = null) {
      const resolved = buildConjugationSelectionState(resolvedSelectionState || {});
      setSelectedTenseTab(resolved.tenseValue);
      setSelectedPretUniversalTab(resolved.universalTenseValue);
      setActiveConjugationGroup(resolved.group);
      targetObject.ClassFilterState.activeClass = resolved.classFilter;
      return resolved;
    }
    function applyConjugationSelectionState(selectionState = null, {
      tenseMode = getActiveTenseMode(),
      availabilityEntries = targetObject.PreteritoUniversalAvailabilityCache
    } = {}) {
      const resolved = resolveConjugationSelectionState(selectionState, {
        tenseMode,
        availabilityEntries
      });
      return applyResolvedConjugationSelectionState(resolved);
    }
    function mutateConjugationSelectionState(mutation = null, {
      tenseMode = getActiveTenseMode(),
      availabilityEntries = targetObject.PreteritoUniversalAvailabilityCache
    } = {}) {
      const current = getCurrentResolvedConjugationSelectionState({
        tenseMode,
        availabilityEntries
      });
      const nextValue = typeof mutation === "function" ? mutation(current) : {
        ...current,
        ...(mutation && typeof mutation === "object" ? mutation : {})
      };
      return applyConjugationSelectionState(nextValue, {
        tenseMode,
        availabilityEntries
      });
    }
    function buildConjugationSelectionStateCacheToken(selectionState = null) {
      const resolved = resolveConjugationSelectionState(selectionState);
      return [resolved.tenseMode, resolved.group, resolved.tenseValue, resolved.universalTenseValue, resolved.classFilter || ""].join("|");
    }
    function getCurrentResolvedConjugationSelectionState({
      tenseMode = getActiveTenseMode(),
      availabilityEntries = targetObject.PreteritoUniversalAvailabilityCache
    } = {}) {
      return resolveConjugationSelectionState(buildConjugationSelectionState({
        tenseMode
      }), {
        tenseMode,
        availabilityEntries
      });
    }

    // === Toggle Lock Functions ===

    function isToggleLockEnabled() {
      return targetObject.ToggleLockState.enabled === true;
    }
    function getToggleLockValueStoreByMap(map) {
      if (map === targetObject.ObjectToggleState) {
        return targetObject.ToggleLockValueState.object;
      }
      if (map === targetObject.SubjectToggleState) {
        return targetObject.ToggleLockValueState.subject;
      }
      if (map === targetObject.PossessorToggleState) {
        return targetObject.ToggleLockValueState.possessor;
      }
      if (map === targetObject.PatientivoOwnershipState) {
        return targetObject.ToggleLockValueState.patientivoOwnership;
      }
      if (map === targetObject.PatientivoNominalSuffixState) {
        return targetObject.ToggleLockValueState.patientivoNominalSuffix;
      }
      return null;
    }
    function getToggleLockStateKey(stateKey = "") {
      const normalizedKey = String(stateKey || "");
      if (!normalizedKey) {
        return "";
      }
      const parts = normalizedKey.split("|");
      if (parts.length < 3) {
        return normalizedKey;
      }
      let tenseIndex = 1;
      if (parts[tenseIndex] === "nonactive") {
        tenseIndex += 1;
      }
      if (tenseIndex >= parts.length) {
        return normalizedKey;
      }
      return [parts[0], ...parts.slice(tenseIndex + 1)].join("|");
    }
    function getToggleStateValue(map, stateKey, fallbackValue = undefined) {
      if (!map) {
        return fallbackValue;
      }
      const normalizedKey = String(stateKey || "");
      if (!normalizedKey) {
        return fallbackValue;
      }
      if (isToggleLockEnabled()) {
        const lockStore = getToggleLockValueStoreByMap(map);
        if (lockStore) {
          const lockKey = getToggleLockStateKey(normalizedKey);
          if (lockStore.has(lockKey)) {
            return lockStore.get(lockKey);
          }
        }
      }
      const directValue = map.get(normalizedKey);
      if (directValue !== undefined) {
        return directValue;
      }
      return fallbackValue;
    }
    function setToggleStateValue(map, stateKey, value, {
      syncLock = false
    } = {}) {
      if (!map) {
        return;
      }
      const normalizedKey = String(stateKey || "");
      if (!normalizedKey) {
        return;
      }
      map.set(normalizedKey, value);
      if (!syncLock || !isToggleLockEnabled()) {
        return;
      }
      const lockStore = getToggleLockValueStoreByMap(map);
      if (!lockStore) {
        return;
      }
      const lockKey = getToggleLockStateKey(normalizedKey);
      lockStore.set(lockKey, value);
    }
    function clearToggleLockValueState() {
      targetObject.ToggleLockValueState.object.clear();
      targetObject.ToggleLockValueState.subject.clear();
      targetObject.ToggleLockValueState.possessor.clear();
      targetObject.ToggleLockValueState.patientivoOwnership.clear();
      targetObject.ToggleLockValueState.patientivoNominalSuffix.clear();
      targetObject.ToggleLockValueState.sourceScope = "";
    }
    function seedToggleLockValueStateFromCurrentMaps() {
      clearToggleLockValueState();
      const seedMap = (stateMap, lockStore) => {
        if (!stateMap || !lockStore) {
          return;
        }
        stateMap.forEach((value, key) => {
          const lockKey = getToggleLockStateKey(key);
          if (!lockKey) {
            return;
          }
          lockStore.set(lockKey, value);
        });
      };
      seedMap(targetObject.ObjectToggleState, targetObject.ToggleLockValueState.object);
      seedMap(targetObject.SubjectToggleState, targetObject.ToggleLockValueState.subject);
      seedMap(targetObject.PossessorToggleState, targetObject.ToggleLockValueState.possessor);
      seedMap(targetObject.PatientivoOwnershipState, targetObject.ToggleLockValueState.patientivoOwnership);
      seedMap(targetObject.PatientivoNominalSuffixState, targetObject.ToggleLockValueState.patientivoNominalSuffix);
      setToggleLockSourceScopeValue(targetObject.VerbSourceScopeState.scope);
    }
    function clearAllToggleStateMaps({
      resetNonactiveSuffix = false,
      resetSourceScope = false
    } = {}) {
      targetObject.SubjectToggleState.clear();
      targetObject.ObjectToggleState.clear();
      targetObject.PossessorToggleState.clear();
      targetObject.PatientivoOwnershipState.clear();
      targetObject.PatientivoNominalSuffixState.clear();
      targetObject.DefaultToggleApplied.clear();
      if (resetNonactiveSuffix) {
        setSelectedNonactiveSuffix(null);
      }
      if (resetSourceScope) {
        setVerbSourceScope(targetObject.VERB_SOURCE_SCOPE.both, {
          syncCombinedMode: false,
          syncLock: false,
          respectLock: false
        });
      }
    }
    function applyDefaultToggleStateOnce(map, stateKey, verbKey, value) {
      if (!stateKey || !verbKey) {
        return;
      }
      const appliedKey = `${verbKey}|${stateKey}`;
      if (targetObject.DefaultToggleApplied.has(appliedKey)) {
        return;
      }
      map.set(stateKey, value);
      targetObject.DefaultToggleApplied.add(appliedKey);
    }

    function getClassicalGrammarSystemReadout() {
      const inventory = typeof targetObject.getClassicalGrammarApplicationInventory === "function"
        ? targetObject.getClassicalGrammarApplicationInventory()
        : null;
      return {
        kind: "classical-grammar-system-readout",
        version: 1,
        authorizationStatus: inventory?.allCapabilitiesInstalled === true
          ? "authorized"
          : "blocked",
        blockReason: inventory?.allCapabilitiesInstalled === true
          ? ""
          : "canonical-grammar-application-inventory-required",
        operationCount: inventory?.operationIds?.length || 0,
        greatestCommonDivisorIdentity:
          inventory?.greatestCommonDivisor?.identityId || "",
        greatestCommonDivisorInvariantIds:
          Array.from(inventory?.greatestCommonDivisor?.invariantIds || []),
        leastCommonMultipleAxisCount:
          inventory?.leastCommonMultiple?.axisCount || 0,
        leastCommonMultipleAxisIds:
          Array.from(inventory?.leastCommonMultiple?.axisIds || []),
        readOnly: true,
        curriculumOrderAuthority: false,
        lessonMetadataAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        displayTextAuthority: false,
      };
    }
    function getClassicalGrammarApplicationOperationProjection(operationId = "") {
      const normalizedOperationId = String(operationId || "").trim();
      const inventory = typeof targetObject.getClassicalGrammarApplicationInventory === "function"
        ? targetObject.getClassicalGrammarApplicationInventory()
        : null;
      const operation = normalizedOperationId && Array.isArray(inventory?.operations)
        ? inventory.operations.find(candidate => candidate?.operationId === normalizedOperationId) || null
        : null;
      return Object.freeze({
        kind: "classical-grammar-application-operation-projection",
        version: 1,
        authorizationStatus: operation?.capabilityInstalled === true ? "authorized" : "blocked",
        blockReason: operation
          ? operation.capabilityInstalled === true
            ? ""
            : "canonical-operation-capability-required"
          : "canonical-operation-not-found",
        operationId: operation?.operationId || normalizedOperationId,
        capabilityName: operation?.capabilityName || "",
        outputKinds: Object.freeze(Array.from(operation?.outputKinds || [])),
        axisIds: Object.freeze(Array.from(operation?.axisIds || [])),
        capabilityInstalled: operation?.capabilityInstalled === true,
        readOnly: true,
        routeProfileAuthority: false,
        lessonMetadataAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        displayTextAuthority: false,
      });
    }
    function getClassicalDeverbalNncOperationProjection() {
      return getClassicalGrammarApplicationOperationProjection("nnc:deverbal-construction");
    }

    const api = {};
    api.getClassicalSourceGrammarResultSurfaceInventory =
      getClassicalSourceGrammarResultSurfaceInventory;
    api.getClassicalGrammarSystemReadout = getClassicalGrammarSystemReadout;
    api.getClassicalGrammarApplicationOperationProjection = getClassicalGrammarApplicationOperationProjection;
    api.getClassicalDeverbalNncOperationProjection = getClassicalDeverbalNncOperationProjection;
    api.getSubjectPersonSelections = getSubjectPersonSelections;
    api.getSubjectCombinationId = getSubjectCombinationId;
    api.getStateFrameResultSurfaceForms = getStateFrameResultSurfaceForms;
    api.getStateResultSurfaceForms = getStateResultSurfaceForms;
    api.getStateResultDisplaySurface = getStateResultDisplaySurface;
    api.getNominalSubjectSelectionEntries = getNominalSubjectSelectionEntries;
    api.getPersonGroupLabel = getPersonGroupLabel;
    api.getPersonSubLabel = getPersonSubLabel;
    api.getSubjectPersonLabel = getSubjectPersonLabel;
    api.getLocalizedLabel = getLocalizedLabel;
    api.getToggleLabel = getToggleLabel;
    api.getPlaceholderLabel = getPlaceholderLabel;
    api.getVerbBlockLabel = getVerbBlockLabel;
    api.getClassicalLocaleContext = getClassicalLocaleContext;
    api.getLocalizedDescription = getLocalizedDescription;
    api.getPretUniversalClassDetail = getPretUniversalClassDetail;
    api.getObjectStateKey = getObjectStateKey;
    api.getPatientivoOwnershipKey = getPatientivoOwnershipKey;
    api.getPatientivoNominalSuffixKey = getPatientivoNominalSuffixKey;
    api.clearToggleStateByPrefix = clearToggleStateByPrefix;
    api.resetToggleStateForTense = resetToggleStateForTense;
    api.getSubjectToggleOptions = getSubjectToggleOptions;
    api.getPotencialHabitualNonactiveSubjectToggleOptions = getPotencialHabitualNonactiveSubjectToggleOptions;
    api.getDefaultNounSubjectId = getDefaultNounSubjectId;
    api.getObjectToggleOptions = getObjectToggleOptions;
    Object.defineProperty(api, "VERB_OBJECT_SLOT_SCHEMA", {
        configurable: true,
        enumerable: true,
        get() { return VERB_OBJECT_SLOT_SCHEMA; },
        set(value) { VERB_OBJECT_SLOT_SCHEMA = value; },
    });
    Object.defineProperty(api, "DERIVATION_CONTROLLER_SLOT_PRIORITY", {
        configurable: true,
        enumerable: true,
        get() { return DERIVATION_CONTROLLER_SLOT_PRIORITY; },
        set(value) { DERIVATION_CONTROLLER_SLOT_PRIORITY = value; },
    });
    api.getDerivationControllerSlotPriority = getDerivationControllerSlotPriority;
    api.getVerbObjectSlotSchema = getVerbObjectSlotSchema;
    api.getPassiveToggleLabel = getPassiveToggleLabel;
    api.getNonspecificToggleLabel = getNonspecificToggleLabel;
    api.getZeroObjectDisplayValue = getZeroObjectDisplayValue;
    api.isPotencialProfileTense = isPotencialProfileTense;
    api.isPotencialHabitualTense = isPotencialHabitualTense;
    api.allowsCollapsedDerivedNounSlot = allowsCollapsedDerivedNounSlot;
    api.isPotencialActiveTense = isPotencialActiveTense;
    api.isFormalCnvFunctionTense = isFormalCnvFunctionTense;
    api.isFormalCnnFunctionTense = isFormalCnnFunctionTense;
    api.getFormalTenseModeForFunctionTense = getFormalTenseModeForFunctionTense;
    api.isPatientivoAdjectiveTense = isPatientivoAdjectiveTense;
    api.getPatientivoAdjectiveSourceForTense = getPatientivoAdjectiveSourceForTense;
    api.isIntransitiveOnlyActiveAdjectiveTense = isIntransitiveOnlyActiveAdjectiveTense;
    api.isActiveAdjectiveTabTense = isActiveAdjectiveTabTense;
    api.isNonactiveAdjectiveTabTense = isNonactiveAdjectiveTabTense;
    api.normalizeVerbDerivedPatientiveSourceFamily = normalizeVerbDerivedPatientiveSourceFamily;
    api.isVerbDerivedPatientiveNonactiveSource = isVerbDerivedPatientiveNonactiveSource;
    api.getNominalSourceModeForTense = getNominalSourceModeForTense;
    api.getResolvedNominalCombinedModeForTense = getResolvedNominalCombinedModeForTense;
    api.getPatientivoSourceTenseLabel = getPatientivoSourceTenseLabel;
    api.getNominalSourceTenseLabel = getNominalSourceTenseLabel;
    api.getNominalDerivationModeForTense = getNominalDerivationModeForTense;
    api.normalizeHeaderLabelText = normalizeHeaderLabelText;
    api.shouldAppendNominalSourceTense = shouldAppendNominalSourceTense;
    api.buildNominalSourceTaggedLabel = buildNominalSourceTaggedLabel;
    api.isPotencialTroncoActiveTense = isPotencialTroncoActiveTense;
    api.isPotencialTroncoNajActiveTense = isPotencialTroncoNajActiveTense;
    api.isSubjectlessNominalTense = isSubjectlessNominalTense;
    api.getPotencialActiveSourceTense = getPotencialActiveSourceTense;
    api.getActiveAdjectiveProfileType = getActiveAdjectiveProfileType;
     api.getActiveUnitTenseModeForCurrentSelection = getActiveUnitTenseModeForCurrentSelection;
     api.resolveActiveAdjectiveClassPolicy = resolveActiveAdjectiveClassPolicy;
    api.selectPreferredActiveAdjectiveForms = selectPreferredActiveAdjectiveForms;
    api.getActiveConjugationGroup = getActiveConjugationGroup;
    api.setActiveConjugationGroup = setActiveConjugationGroup;
    api.getActiveTenseMode = getActiveTenseMode;
    api.getModeSystemValue = getModeSystemValue;
    api.isUnitModeSystem = isUnitModeSystem;
    api.isFunctionModeSystem = isFunctionModeSystem;
    api.getFunctionRoleForTenseMode = getFunctionRoleForTenseMode;
    api.getTenseModeForFunctionRole = getTenseModeForFunctionRole;
    api.getUnitKindForTenseMode = getUnitKindForTenseMode;
    api.getTenseModeForUnitKind = getTenseModeForUnitKind;
    api.normalizeUnitTenseModeValue = normalizeUnitTenseModeValue;
    api.getOutputTenseModeForUnit = getOutputTenseModeForUnit;
    api.resolveFormalTenseModeForFunctionMode = resolveFormalTenseModeForFunctionMode;
    api.getFormalTenseModeForCurrentSelection = getFormalTenseModeForCurrentSelection;
    api.setStoredEuropeanTenseMode = setStoredEuropeanTenseMode;
    api.setStoredUnitTenseMode = setStoredUnitTenseMode;
    api.getActiveEuropeanTenseMode = getActiveEuropeanTenseMode;
    api.getActiveFunctionMode = getActiveFunctionMode;
    api.getActiveUnitTenseMode = getActiveUnitTenseMode;
    api.getActiveFunctionRole = getActiveFunctionRole;
    api.getActiveUnitKind = getActiveUnitKind;
    Object.defineProperty(api, "ANDREWS_UNIT_SOURCE_TARGET_ROUTE_OPTION_REGISTRY", {
        configurable: true,
        enumerable: true,
        get() { return ANDREWS_UNIT_SOURCE_TARGET_ROUTE_OPTION_REGISTRY; },
    });
    api.normalizeAndrewsUnitFormulaType = normalizeAndrewsUnitFormulaType;
    api.getAndrewsUnitSourceTargetRouteTransition = getAndrewsUnitSourceTargetRouteTransition;
    api.getAndrewsUnitRouteOptionRegistryKeyForMode = getAndrewsUnitRouteOptionRegistryKeyForMode;
    api.cloneAndrewsUnitFormulaFrame = cloneAndrewsUnitFormulaFrame;
    api.buildAndrewsUnitFormulaFrame = buildAndrewsUnitFormulaFrame;
    api.buildAndrewsUnitRouteOptionFrame = buildAndrewsUnitRouteOptionFrame;
    api.cloneAndrewsUnitRouteOptionFrame = cloneAndrewsUnitRouteOptionFrame;
    api.blockAndrewsUnitSourceTargetRouteOptions = blockAndrewsUnitSourceTargetRouteOptions;
    api.buildAndrewsUnitSourceTargetRouteOptionsSourceFrame = buildAndrewsUnitSourceTargetRouteOptionsSourceFrame;
    api.getAndrewsUnitSourceFrameMismatch = getAndrewsUnitSourceFrameMismatch;
    api.buildAndrewsUnitSourceTargetRouteOptionsOperationFrame = buildAndrewsUnitSourceTargetRouteOptionsOperationFrame;
    api.getAndrewsUnitOperationFrameMismatch = getAndrewsUnitOperationFrameMismatch;
    api.getAndrewsUnitSourceTargetRouteOptionsFromOperationFrame = getAndrewsUnitSourceTargetRouteOptionsFromOperationFrame;
    api.applyAndrewsUnitSourceTargetRouteOptionsDataset = applyAndrewsUnitSourceTargetRouteOptionsDataset;
    api.setActiveTenseMode = setActiveTenseMode;
    api.setActiveFunctionMode = setActiveFunctionMode;
    api.setActiveEuropeanTenseMode = setActiveEuropeanTenseMode;
    api.setActiveFunctionRole = setActiveFunctionRole;
    api.setActiveUnitMode = setActiveUnitMode;
    api.setActiveUnitKind = setActiveUnitKind;
    api.getActiveVoiceMode = getActiveVoiceMode;
    api.setActiveVoiceMode = setActiveVoiceMode;
    api.getActiveDerivationMode = getActiveDerivationMode;
    api.setActiveDerivationMode = setActiveDerivationMode;
    api.getActiveDerivationType = getActiveDerivationType;
    api.setActiveDerivationType = setActiveDerivationType;
    api.getActiveCausativeSubtype = getActiveCausativeSubtype;
    api.setActiveCausativeSubtype = setActiveCausativeSubtype;
    api.getDerivationValencyDelta = getDerivationValencyDelta;
    api.getEffectiveDerivationValencyDelta = getEffectiveDerivationValencyDelta;
    api.getSelectedNonactiveSuffix = getSelectedNonactiveSuffix;
    api.setSelectedNonactiveSuffix = setSelectedNonactiveSuffix;
    api.normalizeVerbSourceScope = normalizeVerbSourceScope;
    api.getToggleLockSourceScopeValue = getToggleLockSourceScopeValue;
    api.setToggleLockSourceScopeValue = setToggleLockSourceScopeValue;
    api.getVerbSourceScope = getVerbSourceScope;
    api.setVerbSourceScope = setVerbSourceScope;
    api.getCombinedMode = getCombinedMode;
    api.setCombinedMode = setCombinedMode;
    Object.defineProperty(api, "FORMULA_CNV_LEGACY_TAB_TENSES", {
        configurable: true,
        enumerable: true,
        get() { return FORMULA_CNV_LEGACY_TAB_TENSES; },
    });
    api.getTenseOrderForMode = getTenseOrderForMode;
    api.isNounPossessionSplitTense = isNounPossessionSplitTense;
    api.isNounTenseVisibleForCombinedMode = isNounTenseVisibleForCombinedMode;
    api.getNounTenseOrderForCombinedMode = getNounTenseOrderForCombinedMode;
    api.isThreeColumnPanelLayout = isThreeColumnPanelLayout;
    api.captureViewportAnchor = captureViewportAnchor;
    api.resolveViewportAnchor = resolveViewportAnchor;
    Object.defineProperty(api, "VIEWPORT_ANCHOR_RESERVATION_SEQUENCE", {
        configurable: true,
        enumerable: true,
        get() { return VIEWPORT_ANCHOR_RESERVATION_SEQUENCE; },
        set(value) { VIEWPORT_ANCHOR_RESERVATION_SEQUENCE = value; },
    });
    api.captureStickyDesktopPaneAnchor = captureStickyDesktopPaneAnchor;
    api.captureViewportAnchorDelta = captureViewportAnchorDelta;
    api.captureOutputHeightReservation = captureOutputHeightReservation;
    api.applyOutputHeightReservation = applyOutputHeightReservation;
    api.releaseOutputHeightReservation = releaseOutputHeightReservation;
    api.preserveViewportAnchorPosition = preserveViewportAnchorPosition;
    Object.defineProperty(api, "PANEL_STACK_ORDER", {
        configurable: true,
        enumerable: true,
        get() { return PANEL_STACK_ORDER; },
        set(value) { PANEL_STACK_ORDER = value; },
    });
    Object.defineProperty(api, "PANEL_STACK_REVEAL_CLASS", {
        configurable: true,
        enumerable: true,
        get() { return PANEL_STACK_REVEAL_CLASS; },
        set(value) { PANEL_STACK_REVEAL_CLASS = value; },
    });
    Object.defineProperty(api, "PANEL_STACK_REVEAL_DURATION_MS", {
        configurable: true,
        enumerable: true,
        get() { return PANEL_STACK_REVEAL_DURATION_MS; },
        set(value) { PANEL_STACK_REVEAL_DURATION_MS = value; },
    });
    api.normalizePanelStackMode = normalizePanelStackMode;
    api.getAdjacentPanelStackMode = getAdjacentPanelStackMode;
    api.getPanelStackSwipeTargetMode = getPanelStackSwipeTargetMode;
    api.resolvePanelStackSwipeDirection = resolvePanelStackSwipeDirection;
    api.getPanelStackSwipeVisualOffset = getPanelStackSwipeVisualOffset;
    api.isPanelStackSwipeExcludedTarget = isPanelStackSwipeExcludedTarget;
    api.initPanelStackSwipeNavigation = initPanelStackSwipeNavigation;
    api.setLeftPanelStackMode = setLeftPanelStackMode;
    api.initPanelEdgeNavigation = initPanelEdgeNavigation;
    api.initLeftPanelStackTabs = initLeftPanelStackTabs;
    api.updateTenseModeTabs = updateTenseModeTabs;
    api.initTenseModeTabs = initTenseModeTabs;
    api.updateVoiceOperatorVisibility = updateVoiceOperatorVisibility;
    api.updateCombinedModeTabs = updateCombinedModeTabs;
    api.initCombinedModeTabs = initCombinedModeTabs;
    api.getDerivationTypeDisplayLabel = getDerivationTypeDisplayLabel;
    api.getBlockedNounDerivationTypes = getBlockedNounDerivationTypes;
    Object.defineProperty(api, "DERIVATION_ANTIDERIVATIVE_COMPUTED_KEY", {
        configurable: true,
        enumerable: true,
        get() { return DERIVATION_ANTIDERIVATIVE_COMPUTED_KEY; },
        set(value) { DERIVATION_ANTIDERIVATIVE_COMPUTED_KEY = value; },
    });
    Object.defineProperty(api, "DERIVATION_ANTIDERIVATIVE_PENDING_KEY", {
        configurable: true,
        enumerable: true,
        get() { return DERIVATION_ANTIDERIVATIVE_PENDING_KEY; },
        set(value) { DERIVATION_ANTIDERIVATIVE_PENDING_KEY = value; },
    });
    Object.defineProperty(api, "DERIVATION_ANTIDERIVATIVE_STAGE", {
        configurable: true,
        enumerable: true,
        get() { return DERIVATION_ANTIDERIVATIVE_STAGE; },
        set(value) { DERIVATION_ANTIDERIVATIVE_STAGE = value; },
    });
    Object.defineProperty(api, "ShowDerivationAntiderivative", {
        configurable: true,
        enumerable: true,
        get() { return ShowDerivationAntiderivative; },
        set(value) { ShowDerivationAntiderivative = value; },
    });
    api.getNextAntiderivativeStage = getNextAntiderivativeStage;
    api.requestDerivationAntiderivativeLookup = requestDerivationAntiderivativeLookup;
    api.getUniqueAntiderivativeDirectStems = getUniqueAntiderivativeDirectStems;
    api.renderDerivationAntiderivativePanel = renderDerivationAntiderivativePanel;
    api.updateDerivationTypeControl = updateDerivationTypeControl;
    api.initDerivationTypeControl = initDerivationTypeControl;
    api.getCalcTransitivityLabel = getCalcTransitivityLabel;
    api.getCalcDerivationLabel = getCalcDerivationLabel;
    api.getCalcTenseLabel = getCalcTenseLabel;
    api.getCalcSourceScopeLabel = getCalcSourceScopeLabel;
    api.getCurrentNuclearClauseShell = getCurrentNuclearClauseShell;
    api.updateCalcSummary = updateCalcSummary;
    api.updateCalcStatus = updateCalcStatus;
    api.updateCalcSummaryAndStatus = updateCalcSummaryAndStatus;
    Object.defineProperty(api, "PRET_UNIVERSAL_VERB_OVERRIDES", {
        configurable: true,
        enumerable: true,
        get() { return PRET_UNIVERSAL_VERB_OVERRIDES; },
        set(value) { PRET_UNIVERSAL_VERB_OVERRIDES = value; },
    });
    api.getPretUniversalVerbOverride = getPretUniversalVerbOverride;
    api.updateVerbRuleHint = updateVerbRuleHint;
    api.getSelectedTenseTab = getSelectedTenseTab;
    api.setSelectedTenseTab = setSelectedTenseTab;
    api.getSelectedPretUniversalTab = getSelectedPretUniversalTab;
    api.setSelectedPretUniversalTab = setSelectedPretUniversalTab;
    api.buildConjugationSelectionState = buildConjugationSelectionState;
    api.extractConjugationSelectionState = extractConjugationSelectionState;
    api.getPretUniversalAvailabilityEntry = getPretUniversalAvailabilityEntry;
    api.isPretUniversalClassAvailable = isPretUniversalClassAvailable;
    api.resolveConjugationSelectionState = resolveConjugationSelectionState;
    api.applyResolvedConjugationSelectionState = applyResolvedConjugationSelectionState;
    api.applyConjugationSelectionState = applyConjugationSelectionState;
    api.mutateConjugationSelectionState = mutateConjugationSelectionState;
    api.buildConjugationSelectionStateCacheToken = buildConjugationSelectionStateCacheToken;
    api.getCurrentResolvedConjugationSelectionState = getCurrentResolvedConjugationSelectionState;
    api.isToggleLockEnabled = isToggleLockEnabled;
    api.getToggleLockValueStoreByMap = getToggleLockValueStoreByMap;
    api.getToggleLockStateKey = getToggleLockStateKey;
    api.getToggleStateValue = getToggleStateValue;
    api.setToggleStateValue = setToggleStateValue;
    api.clearToggleLockValueState = clearToggleLockValueState;
    api.seedToggleLockValueStateFromCurrentMaps = seedToggleLockValueStateFromCurrentMaps;
    api.clearAllToggleStateMaps = clearAllToggleStateMaps;
    api.applyDefaultToggleStateOnce = applyDefaultToggleStateOnce;
    return api;
}

export function installUiStateGlobals(targetObject = globalThis) {
    const api = createUiStateModule(targetObject);
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
