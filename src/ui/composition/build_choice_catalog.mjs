// Language addresses of declared choices. These are presentation roles, never
// prerequisites or licences. An exact owner still supplies every visible option.
const groups={
 material:['adjectival-source-spelling','adjectival-source-use','compoundLexicalizationAnalysis','compoundMatrixClass','compoundMatrixInitialISelection','compoundMatrixStem','continuation-matrix-noun-class','continuation-matrix-stem','embedSourceClass','embedUse','fixed-sequence-analysis','honorificFormationAnalysis','relational-matrix','root-stock-source-analysis','source-family'],
 subject:['subject','subjectAnimacy','subjectHumanness','numberForm','pluralConnector','singularConnector','doubledFirstPlural','metaphoricalUse','admonitivePluralEnding','purposiveIrregularPluralN'],
 'result-subject':['causativeResultSubject'],
 state:['state','possessor','includedPossessor','possessorReduplication'],
 valence:['applicativeObjectKind','applicativeObjectPerson','causativeObjectKind','causativeSpecificShuntlineRealization','objectSelection'],
 reference:['animacy','humanness','action-reference','honoredParticipant','speaker-gender','specialHumanUse'],
 tense:['mood','tense'],
 direction:['directionalPrefix','purposiveExternalDirectional'],
 sentence:['adjunctorInMode','clause-type','clausePosition','degree','introductoryModifier','introductoryParticle','negative','negative-particle','negation-scope','particleCombination','particleId','preceding-particle','prefaceParticle','questionMode','scope','sentence-adverbial-id','sentence-kind','sentence-position','sentenceAntecessive','sentenceParticle','sentenceParticleHonorific','sentenceType','stress-partner','surface-variant'],
 reduplication:['frequentativeTarget'],
 construction:['tlaFusion','calendar-boundary','compoundPossessiveStem','compoundPossessor','compoundSubjectAnimacy','continuation-relation','incorporatedObjectId','lateOperation','lateVariant','nominal-embed-relation','nominal-embed-route','operations','outer-subject','relational-formation','similarityReduplicationShape','honorificStemAlternative','irregularStemChoice'],
};
export const BUILD_CHOICE_ADDRESSES=Object.freeze(Object.fromEntries(Object.entries(groups).flatMap(([slot,ids])=>ids.map(id=>[id,slot]))));
export const BUILD_SLOT_LABELS=Object.freeze({
 material:'Inputs and readings',construction:'Construction choices',subject:'Subject choices','result-subject':'Result subject',reference:'Participant reference',
 state:'State and possession',valence:'Valence and objects',stem:'Stem',nounstem:'Nounstem',predicate:'Predicate choices',tense:'Mood and tense',direction:'Direction',
 reduplication:'Reduplication and reference',sentence:'Sentence choices',additional:'Other construction choices',
});
export const BUILD_SLOT_ORDER=['material','construction','subject','result-subject','reference','state','valence','stem','nounstem','predicate','tense','direction','reduplication','sentence','additional'];
export function declaredChoiceAddress(id,operation=''){
  if(operation==='grammar:nominal-construction'){
    if(['ordinaryNumberVariant','grossPossessiveNumberVariant'].includes(id))return 'subject';
    if(id==='grossPossessorKind')return 'state';
    if(id==='modifier')return 'sentence';
  }
  return BUILD_CHOICE_ADDRESSES[id]||null;
}
// Override only cross-position members of joint native collectors. Other
// native fields keep their canonical collector, including its context/handlers.
export const NATIVE_ROLE_OVERRIDES=Object.freeze({
 'classical-deverbal-nnc-patientive-embed-matrix-noun-class':'material','classical-deverbal-nnc-patientive-embed-matrix-object-governor':'material','classical-deverbal-nnc-patientive-embed-matrix-stem':'material','classical-deverbal-nnc-patientive-embed-matrix-valence':'material','classical-deverbal-nnc-patientive-embed-matrix-verb-class':'material','classical-deverbal-nnc-patientive-matrix-embed-class':'material','classical-deverbal-nnc-patientive-matrix-embed-stem':'material',
 'classical-deverbal-nnc-number-connector':'subject',
 'classical-personal-name-source-family':'material','classical-deverbal-nnc-preterit-source-analysis':'material',
 'classical-rule-logic-tla-fusion':'construction','classical-calendar-boundary':'construction',
 'classical-rule-logic-nnc-metaphorical-use':'subject',
 'classical-rule-logic-nnc-doubled-first-plural':'subject',
 'classical-rule-logic-nnc-special-human-use':'reference',
 'classical-rule-logic-nnc-possessor-reduplication':'state',
 'classical-rule-logic-nnc-nonspecific-human-form':'state',
 'classical-rule-logic-nnc-singular-connector':'subject',
 'classical-rule-logic-nnc-plural-connector':'subject',
 'classical-rule-logic-admonitive-plural-ending':'subject',
 'classical-rule-logic-directional':'direction','classical-rule-logic-directional-contraction':'direction','classical-rule-logic-purposive-external':'direction',
 'classical-rule-logic-purposive-irregular-n':'subject',
 'classical-rule-logic-frequentative-target':'reduplication',
 'classical-rule-logic-prefix-stack':'sentence','classical-rule-logic-polarity':'sentence','classical-rule-logic-sentence-surface':'sentence','classical-rule-logic-question-mode':'sentence',
 'classical-rule-logic-defective-a-negative':'sentence','classical-rule-logic-optative-use':'sentence',
 'classical-rule-logic-causative-result-subject':'result-subject',
 'classical-rule-logic-honored-participant':'reference','classical-rule-logic-predicate-referent':'reference',
 'classical-rule-logic-compound-possessor':'construction','classical-rule-logic-compound-subject-animacy':'construction','classical-rule-logic-compound-possessive-stem':'construction',
 'classical-cardinal-ordinary-number-variant':'subject','classical-cardinal-gross-number-variant':'subject','classical-cardinal-gross-possessor-kind':'state','classical-cardinal-modifier':'sentence',
 'classical-deverbal-nnc-action-reference':'reference','classical-deverbal-nnc-affinity':'nounstem','classical-deverbal-nnc-patientive-embed-orientation':'construction','classical-nominal-incorporated-object':'construction',
});
export function nativeChoiceAddress(id,group,collector='',family=''){
  if(group==='material')return 'material';
  if(NATIVE_ROLE_OVERRIDES[id])return NATIVE_ROLE_OVERRIDES[id];
  if(collector==='verbstem'||collector==='derivation')return 'stem';
  if(collector==='nounstem')return 'nounstem';
  if(collector==='subject'||collector==='state'||collector==='sentence')return collector;
  if(collector==='valence')return 'valence';
  if(collector==='predicate')return 'predicate';
  if(collector==='tense')return 'tense';
  return ({'sentence-relationships':'sentence','clause-settings':family==='vnc'?'tense':'sentence',formation:'construction',participants:'reference',material:'material'})[group]||'additional';
}

// Conditional controls omitted by the original 159-field organization snapshot.
// Their existing route-specific collectors and visibility owners remain authoritative.
export const CONDITIONAL_NATIVE_FIELDS=Object.freeze({
 "classical-affective-address-form": "participants",
 "classical-affective-embed-affinity-selected": "formation",
 "classical-affective-matrix": "formation",
 "classical-affective-nonanimate-reduplication-reading": "formation",
 "classical-affective-nonanimate-reduplication-shape": "formation",
 "classical-affective-pil-child-route": "formation",
 "classical-affective-pil-gender": "formation",
 "classical-affective-pil-possessor-distribution": "participants",
 "classical-affective-possessive-affinity-plural": "participants",
 "classical-affective-route": "formation",
 "classical-affective-semantic-reading": "formation",
 "classical-attitude-derivation-option": "formation",
 "classical-attitude-formation": "formation",
 "classical-attitude-operation": "formation",
 "classical-attitude-participant": "participants",
 "classical-attitude-stem-alternative": "formation",
 "classical-calendar-boundary": "formation",
 "classical-cardinal-measure-composition": "sentence-relationships",
 "classical-cardinal-measure-meaning": "formation",
 "classical-cardinal-target-kind": "formation",
 "classical-cardinal-value": "formation",
 "classical-compound-nnc-bracketing": "formation",
 "classical-compound-nnc-distributive-reading": "formation",
 "classical-compound-nnc-embed-role": "formation",
 "classical-compound-nnc-matrix-initial-i-variant": "formation",
 "classical-compound-nnc-plural-connector": "participants",
 "classical-compound-nnc-possessor-orientation": "participants",
 "classical-compound-nnc-reduplication-target": "formation",
 "classical-compound-nnc-structure": "formation",
 "classical-construction-reduplication": "formation",
 "classical-denominal-vnc-exclamatory": "sentence-relationships",
 "classical-denominal-vnc-operation": "formation",
 "classical-denominal-vnc-result-object-1": "participants",
 "classical-denominal-vnc-result-object-2": "participants",
 "classical-denominal-vnc-stem-shape": "formation",
 "classical-deverbal-nnc-action-kind": "formation",
 "classical-deverbal-nnc-action-suffix": "formation",
 "classical-deverbal-nnc-activated-object-person": "participants",
 "classical-deverbal-nnc-boundary-spelling": "formation",
 "classical-deverbal-nnc-characteristic-embed-realization": "formation",
 "classical-deverbal-nnc-characteristic-reading": "formation",
 "classical-deverbal-nnc-continuation-relation": "participants",
 "classical-deverbal-nnc-family": "formation",
 "classical-deverbal-nnc-final-i-boundary": "formation",
 "classical-deverbal-nnc-nominal-spelling": "formation",
 "classical-deverbal-nnc-nominalization-kind": "formation",
 "classical-deverbal-nnc-number-connector": "formation",
 "classical-deverbal-nnc-ownerhood-boundary": "formation",
 "classical-deverbal-nnc-ownerhood-matrix": "formation",
 "classical-deverbal-nnc-ownerhood-patientive-reading": "formation",
 "classical-deverbal-nnc-passive-human-realization": "participants",
 "classical-deverbal-nnc-patientive-analogy": "formation",
 "classical-deverbal-nnc-patientive-compound-relation": "formation",
 "classical-deverbal-nnc-patientive-contrast": "participants",
 "classical-deverbal-nnc-patientive-embed-complement-kind": "formation",
 "classical-deverbal-nnc-patientive-embed-matrix-noun-class": "formation",
 "classical-deverbal-nnc-patientive-embed-matrix-object-governor": "formation",
 "classical-deverbal-nnc-patientive-embed-matrix-stem": "formation",
 "classical-deverbal-nnc-patientive-embed-matrix-valence": "formation",
 "classical-deverbal-nnc-patientive-embed-matrix-verb-class": "formation",
 "classical-deverbal-nnc-patientive-embed-relation": "formation",
 "classical-deverbal-nnc-patientive-embed-target": "formation",
 "classical-deverbal-nnc-patientive-family": "formation",
 "classical-deverbal-nnc-patientive-matrix-embed-class": "formation",
 "classical-deverbal-nnc-patientive-matrix-embed-stem": "formation",
 "classical-deverbal-nnc-patientive-matrix-relation": "formation",
 "classical-deverbal-nnc-patientive-noun-class": "formation",
 "classical-deverbal-nnc-patientive-stem-relation": "formation",
 "classical-deverbal-nnc-preterit-source-analysis": "formation",
 "classical-nominal-complement-object": "participants",
 "classical-nominal-embed-adverbial-role": "participants",
 "classical-nominal-embed-adverbial-route": "participants",
 "classical-nominal-embed-boundary-spelling": "participants",
 "classical-nominal-embed-complement-relation": "participants",
 "classical-nominal-embed-possession-kind": "participants",
 "classical-nominal-embed-possessor-reference": "participants",
 "classical-nominal-embed-reduplication": "formation",
 "classical-nominal-embed-reference-orientation": "participants",
 "classical-nominal-embed-role": "participants",
 "classical-nominal-embed-similarity-shape": "formation",
 "classical-nominal-embed-supplement-object": "participants",
 "classical-nominal-embed-use-shape": "participants",
 "classical-nominal-matrix-reduplication": "formation",
 "classical-nominal-matrix-stock-formation": "formation",
 "classical-personal-name-affective-matrix": "formation",
 "classical-personal-name-affective-scope": "formation",
 "classical-personal-name-reranking": "sentence-relationships",
 "classical-personal-name-sentence-operation": "sentence-relationships",
 "classical-personal-name-source-family": "formation",
 "classical-place-affective-matrix": "formation",
 "classical-place-gentilic-formation": "formation",
 "classical-place-gentilic-result-kind": "formation",
 "classical-deverbal-nnc-action-reference": "participants",
 "classical-deverbal-nnc-affinity": "formation",
 "classical-deverbal-nnc-patientive-embed-orientation": "participants",
 "classical-nominal-incorporated-object": "participants",
 "classical-rule-logic-optative-use": "sentence-relationships"
});
