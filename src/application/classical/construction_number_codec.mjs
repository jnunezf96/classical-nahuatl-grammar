import {canonicalizeClassicalConstructionBlueprint} from './construction_blueprint.mjs';

// Address v2 snapshot of the first acceptance adapters. Order is part of the
// wire format. Coverage of the full public Owner inventory is still incomplete.
const sources = [
  ['vnc:whole-stem', ['source-stem', 'verb-class', 'source-valence']],
  ['vnc:embed-matrix', ['embed-analysis', 'matrix-analysis', 'relation']],
  ['nnc:whole-stem', ['stem', 'source-class']],
  ['nnc:embed-matrix', ['embed-analysis', 'matrix-analysis', 'structure']],
];
const operations = [
  ['vnc:application', ['typed-source'], [],
    ['source-stem', 'verb-class', 'source-valence', 'object-kind', 'subject', 'mood', 'tense', 'introductory-particle']],
  ['vnc:sentence-result', ['vnc-application'], [], []],
  ['nnc:ordinary', ['typed-source'], [], ['stem', 'source-class', 'subject', 'state']],
  ['grammar:nominal-construction', ['typed-source'], ['embed', 'matrix'],
    ['construction-kind', 'structure', 'embed-role', 'relation', 'route', 'subject',
      'state', 'animacy', 'mood', 'tense', 'voice', 'matrix-verb-class']],
  ['nnc:deverbal-construction', ['predicate'], [],
    ['nominalization-kind', 'number-connector', 'subject', 'state', 'animacy', 'humanness', 'matrix-verb-class']],
  ['sentence:supplementation', [], ['principal', 'adjoined'], ['relation', 'written-order']],
];

// These dictionaries rank known Owner options. The final ordinal escapes to
// the portable scalar grammar when an adapter does not declare a closed set.
const verbClasses = ['A', 'B', 'C', 'D'];
const options = {
  'verb-class': verbClasses,
  'matrix-verb-class': verbClasses,
  'source-valence': ['intransitive', 'projective-human', 'projective-nonhuman'],
  'construction-kind': ['compound-nnc', 'nominal-embed-vnc'],
  structure: ['integrated'],
  animacy: ['nonanimate', 'animate'],
  humanness: ['nonhuman', 'human'],
  'written-order': ['principal-adjoined'],
  relation: ['direct-address', 'object'],
  'introductory-particle': ['', 'tlā'],
};

const extendedChoiceFields = {
  'vnc:application': ['object-person'],
  'vnc:sentence-result': ['antecessive', 'punctuation-mode'],
  'sentence:supplementation': ['principal-contact', 'adjunct-contact'],
};
const extendedOperations = [
  ...operations.map(([id, inputs, slots, fields]) =>
    [id, inputs, slots, [...fields, ...(extendedChoiceFields[id] || [])]]),
  ['particle:result', [], [], ['particle-id']],
  ['nnc:adjectival-modification', [], ['head', 'modifier', 'intervening', 'marker'],
    ['topology', 'written-order', 'adjunctor', 'link-role', 'discourse-context']],
];
const extendedSources = [...sources, ['nnc:cardinal-value', ['value']]];
const directionalOperations = extendedOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'vnc:application' ? [...fields, 'directional-prefix'] : fields]);
const sentencePolarityOperations = directionalOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'vnc:sentence-result' ? [...fields, 'negative'] : fields]);
const pluralConnectorOperations = sentencePolarityOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'nnc:ordinary' ? [...fields, 'plural-connector'] : fields]);
const relationalLocativeOperations = [
  ...pluralConnectorOperations,
  ['nnc:relational', [], [], ['stem-id', 'possessor', 'subject', 'sentence-position']],
];
const typedRelationalOperations = relationalLocativeOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'nnc:relational' ? [...fields, 'source-profile'] : fields]);
const lexicalConjunctionOperations = [
  ...typedRelationalOperations,
  ['clause:composition', [], ['left', 'right'], ['lexical-type', 'adjunctor-distribution', 'state-realization']],
];
const markedPlaceOperations = [
  ...lexicalConjunctionOperations,
  ['clause:adverbial-adjunction', [], ['principal', 'adjoined', 'marker'],
    ['relation', 'degree', 'structure', 'order', 'unit-type', 'marking']],
];
const imperfectiveAgreementOperations = markedPlaceOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'vnc:application' ? [...fields, 'subject-animacy', 'subject-humanness'] : fields]);
const markedPurposeOperations = imperfectiveAgreementOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'clause:adverbial-adjunction' ? [...fields, 'purpose-type'] : fields]);
const markedSupplementOperations = markedPurposeOperations.map(([id, inputs, slots, fields]) => [
  id, inputs, id === 'sentence:supplementation' ? [...slots, 'marker'] : slots,
  id === 'nnc:ordinary' ? [...fields, 'possessor']
    : id === 'clause:composition' ? [...fields, 'parallel-type', 'rephrase-axis', 'appositive-type', 'boundary-punctuation'] : fields,
]);
const admonitiveEndingOperations = markedSupplementOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'vnc:application' ? [...fields, 'admonitive-plural-ending'] : fields]);
const initialIOperations = admonitiveEndingOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'vnc:application' ? [...fields, 'source-initial-i'] : fields]);
const frequentativeOperations = [...initialIOperations,
  ['vnc:derivational-operation', ['parent'], [], ['variant', 'target', 'repetitions', 'scope', 'initial-i-treatment']],
];
const nonactivePatientOperations = frequentativeOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'vnc:application' ? [...fields, 'nonactive-patient'] : fields]);
const causativeOperations = nonactivePatientOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'vnc:application' ? [...fields, 'causative'] : fields]);
const applicativeOperations = causativeOperations.map(([id, inputs, slots, fields]) =>
  id === 'vnc:application' ? [id, inputs, [...slots, 'parent'], [...fields, 'applicative']] : [id, inputs, slots, fields]);
const passiveCausativeOperations = applicativeOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'vnc:application' ? [...fields, 'passive-causative'] : fields]);
const passiveParentOperations = passiveCausativeOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'vnc:application' ? [...fields, 'finite-passive', 'retained-passive-parent'] : fields]);
const cardinalClassifierOperations = passiveParentOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'grammar:nominal-construction' ? [...fields, 'classifier'] : fields]);
const preparedDenominalOperations = [...cardinalClassifierOperations,
  ['vnc:denominal', ['typed-source'], [], ['formation', 'stem-shape', 'subject', 'tense']],
];
const finiteDenominalParentOperations = preparedDenominalOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, id === 'vnc:denominal' ? [...slots, 'parent'] : slots, fields]);
const cardinalCountOperations = finiteDenominalParentOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'grammar:nominal-construction' ? [...fields, 'count-kind'] : fields]);
const characteristicOperations = cardinalCountOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'nnc:deverbal-construction' ? [...fields, 'characteristic-reading'] : fields]);
const customarySourceOperations = characteristicOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'nnc:deverbal-construction' ? [...fields, 'customary-source'] : fields]);
const impersonalPatientiveOperations = customarySourceOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'nnc:deverbal-construction' ? [...fields, 'impersonal-source'] : fields]);
const orderedVoiceOperations = [...impersonalPatientiveOperations,
  ['vnc:ordered-voice-application', ['parent'], [], ['voice-operations']],
];
const orderedPatientiveOperations = orderedVoiceOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'nnc:deverbal-construction' ? [...fields, 'ordered-impersonal'] : fields]);
const sentenceLayerOperations = [
  ...orderedPatientiveOperations,
  ['sentence:adverbial-adjunction', [], ['host', 'particle'], []],
  ['sentence:particle-adjunction', [], ['host', 'particle'], []],
];
const namedPartnerOperations = sentenceLayerOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'sentence:supplementation' ? [...fields, 'named-partner-context'] : fields]);
const collectiveOperations = [
  ...namedPartnerOperations.map(([id, inputs, slots, fields]) =>
    [id, inputs, slots, id === 'sentence:supplementation' ? [...fields, 'agreement-exception'] : fields]),
  ['nnc:pronominal', [], [], ['subject', 'referential-humanness']],
];
const pronominalMatrixOperations = collectiveOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'nnc:pronominal' ? [...fields, 'matrix-form'] : fields]);
const demonstrativeTopicOperations = pronominalMatrixOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'nnc:pronominal' ? [...fields, 'demonstrative-stem'] : fields]);
const personalPronounOperations = demonstrativeTopicOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'nnc:pronominal' ? [...fields, 'personal-stem'] : fields]);
const antecessivePlacementOperations = personalPronounOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'sentence:supplementation' ? [...fields, 'antecessive-placement'] : fields]);
const compoundOrdinarySources = [...extendedSources,
  ['nnc:ordinary-embed-matrix', ['stem', 'source-class', 'embed-stem', 'matrix-stem']],
];
const discontinuousSupplementOperations = antecessivePlacementOperations.map(([id, inputs, slots, fields]) =>
  id === 'sentence:supplementation'
    ? [id, inputs, [...slots, 'intervener'], [...fields, 'discontinuous-head-position']]
    : [id, inputs, slots, fields]);
const reusedIntervenerOperations = discontinuousSupplementOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'sentence:supplementation' ? [...fields, 'principal-occurrence'] : fields]);
const affectiveNominalOperations = reusedIntervenerOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'grammar:nominal-construction' ? [...fields, 'affective-profile']
    : id === 'vnc:application' ? [...fields, 'source-lexeme'] : fields]);
const affectiveSources = [...compoundOrdinarySources, ['nnc:affective-embed', ['embed-stem', 'embed-class']]];
const honorificOperations = affectiveNominalOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'vnc:derivational-operation'
    ? [...fields, 'honorific-participant', 'honorific-formation'] : fields]);
const honorificTenseOperations = honorificOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'vnc:derivational-operation' ? [...fields, 'honorific-tense'] : fields]);
const disparagementOperations = honorificTenseOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'vnc:derivational-operation' ? [...fields, 'disparaged-participant'] : fields]);
const obsoleteRootOperations = disparagementOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'nnc:deverbal-construction' ? [...fields, 'obsolete-root-spelling']
    : id === 'grammar:nominal-construction' ? [...fields, 'fixed-compound-possessor'] : fields]);
const internalObsoleteRootOperations = obsoleteRootOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'nnc:deverbal-construction' ? [...fields, 'internal-obsolete-root'] : fields]);
const internalOrdinaryPreteritOperations = internalObsoleteRootOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'nnc:deverbal-construction' ? [...fields, 'internal-ordinary-preterit'] : fields]);
const relationalPredicateOperations = internalOrdinaryPreteritOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, id === 'nnc:ordinary' ? [...slots, 'relational-parent'] : slots, fields]);
const relationalAffectiveOperations = relationalPredicateOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'nnc:relational' ? [...fields, 'relational-affective'] : fields]);
const ordinaryAffectiveOperations = relationalAffectiveOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'grammar:nominal-construction' ? [...fields, 'affective-matrix'] : fields]);
const placeGentilicOperations = [...ordinaryAffectiveOperations,
  ['nnc:place-gentilic', [], ['place-parent'], ['place-stem', 'place-formation', 'place-matrix', 'subject']],
];
const lexicalizedOwnerhoodOperations = placeGentilicOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'sentence:supplementation' ? [...fields, 'lexicalized-nnc']
    : id === 'nnc:deverbal-construction' ? [...fields, 'lexicalized-ownerhood-matrix'] : fields]);
const includedPossessorOperations = lexicalizedOwnerhoodOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'nnc:ordinary' ? [...fields, 'included-possessor']
    : id === 'clause:composition' ? [...fields, 'embedded-contact', 'complement-order'] : fields]);
const passivePatientiveOperations = includedPossessorOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'nnc:deverbal-construction' ? [...fields, 'passive-patientive-possessor'] : fields]);
const typeThreeCausativeOperations = passivePatientiveOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'nnc:deverbal-construction' ? [...fields, 'type-three-causative'] : fields]);
const incorporatedPatientiveOperations = typeThreeCausativeOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'nnc:deverbal-construction' ? [...fields, 'subjectless-passive-core', 'incorporated-patientive'] : fields]);
const activeCorePatientiveOperations = incorporatedPatientiveOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'nnc:deverbal-construction' ? [...fields, 'active-core-patientive'] : fields]);
const passiveCoreSources = [...affectiveSources,
  ['vnc:subjectless-passive-core', ['source-stem', 'verb-class', 'nonactive-option']],
];
const activeCoreSources = [...passiveCoreSources,
  ['vnc:subjectless-active-core', ['source-stem', 'verb-class', 'core-stage', 'source-valence', 'object-pattern']],
];
const actionCoreOperations = activeCorePatientiveOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'nnc:deverbal-construction' ? [...fields, 'future-core-action', 'action-object-matrix'] : fields]);
const actionCoreSources = [...activeCoreSources, ['vnc:action-future-core', ['source-stem', 'verb-class']]];
const directionalLocationOperations = actionCoreOperations.map(([id, inputs, slots, fields]) =>
  id === 'nnc:relational' ? [id, inputs, [...slots, 'location-parent'], [...fields, 'location-stems']] : [id, inputs, slots, fields]);
const finiteSimilarityOperations = [...directionalLocationOperations,
  ['clause:comparison', ['measure'], [], ['adjunctor-in']],
];
const pronominalPluralOperations = finiteSimilarityOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'nnc:pronominal' ? [...fields, 'predicate-pluralization', 'number-form'] : fields]);
const causativePassiveOperations = pronominalPluralOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'vnc:application' ? [...fields, 'causative-passive'] : fields]);
const genericHumanSubjectOperations = causativePassiveOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'nnc:ordinary' ? [...fields, 'generic-human-subject'] : fields]);
const genericFiniteSubjectOperations = genericHumanSubjectOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'vnc:application' ? [...fields, 'generic-human-subject'] : fields]);
const genericPronominalOperations = genericFiniteSubjectOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'nnc:pronominal' ? [...fields, 'generic-ixquich'] : fields]);
const deverbalCompoundOperations = genericPronominalOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'grammar:nominal-construction' ? [...fields, 'deverbal-compound'] : fields]);
const temporalDenominalOperations = deverbalCompoundOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'vnc:denominal' ? [...fields, 'temporal-reading'] : fields]);
const lexicalAdverbialOperations = [
  ...temporalDenominalOperations.map(([id, inputs, slots, fields]) =>
    [id, inputs, slots, id === 'vnc:sentence-result' ? [...fields, 'explicit-command'] : fields]),
  ['nnc:adverbial', [], [], ['lexical-entry']],
];
const ordinaryOwnerhoodOperations = lexicalAdverbialOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'nnc:deverbal-construction' ? [...fields, 'ordinary-ownerhood'] : fields]);
const nominalComparisonOperations = ordinaryOwnerhoodOperations.map(([id, inputs, slots, fields]) =>
  id === 'clause:comparison' ? [id, inputs, ['head'], [...fields, 'comparison-position']] : [id, inputs, slots, fields]);
const temporalBoundaryOperations = nominalComparisonOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'clause:adverbial-adjunction' ? [...fields, 'boundary-punctuation'] : fields]);
const finiteImpersonalOperations = temporalBoundaryOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'vnc:application' ? [...fields, 'finite-impersonal'] : fields]);
const meansEmbeddingOperations = finiteImpersonalOperations.map(([id, inputs, slots, fields]) =>
  [id, inputs, slots, id === 'grammar:nominal-construction' ? [...fields, 'adverb-role'] : fields]);
const vocativeOperations = [
  ...meansEmbeddingOperations.map(([id, inputs, slots, fields]) => [id, inputs, slots,
    id === 'sentence:supplementation'
      ? [...fields, 'speaker-gender', 'vocative-glottal', 'vocative-final-i', 'vocative-silent-plural-in']
      : id === 'vnc:sentence-result' ? [...fields, 'introductory-particle'] : fields]),
  ['nnc:personal-name', ['agentive'], [], ['source-family', 'affective-scope', 'affective-matrix', 'outer-subject']],
];
const rootStockOperations = vocativeOperations.map(([id, inputs, slots, fields]) => [id, inputs, slots,
  id === 'nnc:deverbal-construction' ? [...fields, 'root-stock-patientive'] : fields]);
const operationTables = new Map([
  ['2', operations], ['3', extendedOperations], ['4', directionalOperations], ['5', sentencePolarityOperations],
  ['6', pluralConnectorOperations], ['7', relationalLocativeOperations], ['8', typedRelationalOperations], ['9', lexicalConjunctionOperations], ['10', markedPlaceOperations], ['11', imperfectiveAgreementOperations], ['12', markedPurposeOperations], ['13', markedSupplementOperations], ['14', admonitiveEndingOperations], ['15', initialIOperations], ['16', frequentativeOperations], ['17', nonactivePatientOperations], ['18', causativeOperations], ['19', applicativeOperations], ['20', passiveCausativeOperations], ['21', passiveParentOperations], ['22', cardinalClassifierOperations],
  ['23', preparedDenominalOperations],
  ['24', finiteDenominalParentOperations],
  ['25', cardinalCountOperations],
  ['26', characteristicOperations],
  ['27', customarySourceOperations],
  ['28', impersonalPatientiveOperations],
  ['29', orderedVoiceOperations],
  ['30', orderedPatientiveOperations],
  ['31', sentenceLayerOperations],
  ['32', namedPartnerOperations],
  ['33', collectiveOperations],
  ['34', pronominalMatrixOperations],
  ['35', demonstrativeTopicOperations],
  ['36', personalPronounOperations],
  ['37', antecessivePlacementOperations],
  ['38', discontinuousSupplementOperations],
  ['39', reusedIntervenerOperations],
  ['40', affectiveNominalOperations],
  ['41', honorificOperations],
  ['42', honorificTenseOperations],
  ['43', disparagementOperations],
  ['44', obsoleteRootOperations],
  ['45', internalObsoleteRootOperations],
  ['46', internalOrdinaryPreteritOperations],
  ['47', relationalPredicateOperations],
  ['48', relationalAffectiveOperations],
  ['49', ordinaryAffectiveOperations],
  ['50', placeGentilicOperations],
  ['51', lexicalizedOwnerhoodOperations],
  ['52', includedPossessorOperations],
  ['53', passivePatientiveOperations],
  ['54', typeThreeCausativeOperations],
  ['55', incorporatedPatientiveOperations],
  ['56', activeCorePatientiveOperations],
  ['57', actionCoreOperations],
  ['58', directionalLocationOperations],
  ['59', finiteSimilarityOperations],
  ['60', pronominalPluralOperations],
  ['61', causativePassiveOperations],
  ['62', genericHumanSubjectOperations],
  ['63', genericFiniteSubjectOperations],
  ['64', genericPronominalOperations],
  ['65', deverbalCompoundOperations],
  ['66', temporalDenominalOperations],
  ['67', lexicalAdverbialOperations],
  ['68', ordinaryOwnerhoodOperations],
  ['69', nominalComparisonOperations],
  ['70', temporalBoundaryOperations],
  ['71', finiteImpersonalOperations],
  ['72', meansEmbeddingOperations],
  ['73', [...meansEmbeddingOperations,
    ['nnc:personal-name', ['agentive'], [], ['source-family', 'affective-scope', 'affective-matrix', 'outer-subject']]]],
  ['74', vocativeOperations],
  ['75', rootStockOperations],
  ['76', rootStockOperations.map(([id, inputs, slots, fields]) => [id, inputs, slots,
    id === 'vnc:application' ? [...fields, 'object-interpretation'] : fields])],
  ['77', [
    ...rootStockOperations.map(([id, inputs, slots, fields]) => [id, inputs, slots,
      id === 'vnc:application' ? [...fields, 'object-interpretation'] : fields]),
    ['phonology:open-transition', [], [], ['stem-final-phoneme', 'following-vowel', 'supportive-i', 'requested-spelling']],
  ]],
  ['78', [
    ...rootStockOperations.map(([id, inputs, slots, fields]) => [id, inputs, slots,
      id === 'vnc:application' ? [...fields, 'object-interpretation', 'ordered-source-objects'] : fields]),
    ['phonology:open-transition', [], [], ['stem-final-phoneme', 'following-vowel', 'supportive-i', 'requested-spelling']],
  ]],
]);
const MAX_PAYLOAD = 131_072;
const MAX_NODES = 128;
const MAX_DEPTH = 32;
const MAX_TEXT = 4_096;
const MAX_TOTAL_TEXT = 65_536;
const encoder = new TextEncoder();
const decoder = new TextDecoder('utf-8', {fatal: true, ignoreBOM: true});
const MAX_BITS = MAX_PAYLOAD * 5;
const width = (radix) => radix === 1 ? 0 : (radix - 1).toString(2).length;

// The fingerprint includes ordinal order and the scalar wire conventions.
const wireFormats = new Map(Array.from(operationTables, ([version, operationTable]) => {
  const sourceTable = Number(version) >= 75
    ? [...actionCoreSources, ['vnc:patientive-root-stock', ['source-stem', 'verb-class']]]
    : Number(version) >= 57 ? actionCoreSources : version === '56' ? activeCoreSources : version === '55' ? passiveCoreSources
    : version === '2' ? sources : Number(version) >= 40 ? affectiveSources
    : Number(version) >= 37 ? compoundOrdinarySources : extendedSources;
  const schema = JSON.stringify([version, 'sentinel-base32/gamma-v1/tuple-v1',
    sourceTable, operationTable, options, ['null', 'false', 'true', 'natural', 'text', 'sequence']]);
  const fingerprint = encoder.encode(schema).reduce(
    (hash, byte) => BigInt.asUintN(64, (hash ^ BigInt(byte)) * 0x100000001b3n),
    0xcbf29ce484222325n,
  ).toString(2).padStart(64, '0');
  return [version, { coordinates: [...sourceTable, ...operationTable], sourceTable, operationTable, fingerprint }];
}));

function requireValid(condition) {
  if (!condition) throw new TypeError('Invalid construction number');
}

function createWriter() {
  const chunks = ['1']; // Preserve initial zero bits when rendered as a natural.
  let size = 1;
  function bits(value) {
    size += value.length;
    requireValid(size <= MAX_BITS);
    if (value.length) chunks.push(value);
  }
  return {
    bits,
    tuple(digits, radices) {
      let rank = 0;
      let range = 1;
      for (const [index, radix] of radices.entries()) {
        requireValid(Number.isInteger(digits[index]) && digits[index] >= 0 && digits[index] < radix);
        rank = rank * radix + digits[index];
        range *= radix;
      }
      const count = width(range);
      if (count) bits(rank.toString(2).padStart(count, '0'));
    },
    natural(value) {
      // Elias gamma of n+1 pairs the binary length with its low bits.
      const binary = (BigInt(value) + 1n).toString(2);
      bits('0'.repeat(binary.length - 1) + binary);
    },
    payload() {
      const stream = chunks.join('');
      const first = (stream.length - 1) % 5 + 1;
      const digits = [parseInt(stream.slice(0, first), 2).toString(32)];
      for (let index = first; index < stream.length; index += 5) {
        digits.push(parseInt(stream.slice(index, index + 5), 2).toString(32));
      }
      return digits.join('');
    },
  };
}

function createReader(payload) {
  const digits = Array.from(payload, (digit, index) =>
    parseInt(digit, 32).toString(2).padStart(index === 0 ? 0 : 5, '0'));
  const stream = digits.join('');
  let cursor = 1;
  function bits(count) {
    requireValid(count <= stream.length - cursor);
    const value = stream.slice(cursor, cursor + count);
    cursor += count;
    return value;
  }
  return {
    bits,
    get remaining() { return stream.length - cursor; },
    tuple(radices) {
      const range = radices.reduce((product, radix) => product * radix, 1);
      let rank = parseInt(bits(width(range)) || '0', 2);
      requireValid(rank < range);
      const digits = [];
      for (const radix of [...radices].reverse()) {
        digits.push(rank % radix);
        rank = Math.floor(rank / radix);
      }
      return digits.reverse();
    },
    natural(max) {
      let zeros = 0;
      while (bits(1) === '0') requireValid(++zeros <= width(max + 1));
      const value = BigInt('0b1' + bits(zeros)) - 1n;
      requireValid(value <= BigInt(max));
      return Number(value);
    },
  };
}

function textBudget() {
  let remaining = MAX_TOTAL_TEXT;
  return (bytes) => {
    requireValid(bytes <= MAX_TEXT && bytes <= remaining);
    remaining -= bytes;
  };
}

function writeValue(writer, value, charge, field) {
  const dictionary = Object.hasOwn(options, field) ? options[field] : null;
  if (dictionary) {
    const index = dictionary.indexOf(value);
    writer.tuple([index < 0 ? dictionary.length : index], [dictionary.length + 1]);
    if (index >= 0) {
      charge(encoder.encode(value).length);
      return;
    }
  }
  const tag = value === null ? 0 : value === false ? 1 : value === true ? 2
    : typeof value === 'number' ? 3 : typeof value === 'string' ? 4 : 5;
  writer.tuple([tag], [6]);
  if (tag === 3) writer.natural(value);
  if (tag === 4) {
    const bytes = encoder.encode(value);
    charge(bytes.length);
    writer.natural(bytes.length);
    for (const byte of bytes) writer.bits(byte.toString(2).padStart(8, '0'));
  }
  if (tag === 5) {
    writer.natural(value.length);
    for (const child of value) writeValue(writer, child, charge);
  }
}

function readValue(reader, charge, field, depth = 0) {
  const dictionary = Object.hasOwn(options, field) ? options[field] : null;
  if (dictionary) {
    const [index] = reader.tuple([dictionary.length + 1]);
    if (index < dictionary.length) {
      const value = dictionary[index];
      charge(encoder.encode(value).length);
      return value;
    }
  }
  const [tag] = reader.tuple([6]);
  let value;
  switch (tag) {
    case 0: value = null; break;
    case 1: value = false; break;
    case 2: value = true; break;
    case 3: value = reader.natural(Number.MAX_SAFE_INTEGER); break;
    case 4: {
      const length = reader.natural(MAX_TEXT);
      charge(length);
      requireValid(length * 8 <= reader.remaining);
      const bytes = Uint8Array.from({length}, () => parseInt(reader.bits(8), 2));
      value = decoder.decode(bytes);
      requireValid(value.normalize('NFC') === value);
      break;
    }
    case 5: {
      requireValid(depth < MAX_DEPTH);
      const length = reader.natural(Math.floor(reader.remaining / 3));
      requireValid(length * 3 <= reader.remaining);
      value = Array.from({length}, () => readValue(reader, charge, undefined, depth + 1));
      break;
    }
  }
  requireValid(!dictionary?.includes(value));
  return value;
}

function writeNode(writer, node, index, charge, { coordinates, sourceTable, operationTable }) {
  const isSource = node.nodeKind === 'source';
  const ordinal = isSource
    ? sourceTable.findIndex(([id]) => id === node.constructorId)
    : operationTable.findIndex(([id]) => id === node.operationId);
  requireValid(ordinal >= 0);
  writer.tuple([ordinal + (isSource ? 0 : sourceTable.length)], [coordinates.length]);
  if (isSource) {
    const [, fields] = sourceTable[ordinal];
    requireValid(node.arguments.length === fields.length);
    fields.forEach((field, position) => writeValue(writer, node.arguments[position], charge, field));
    return;
  }
  const [, inputs, roles, fields] = operationTable[ordinal];
  requireValid(node.inputRefs.length === inputs.length && node.slots.length <= roles.length);
  let previous = -1;
  let mask = 0;
  for (const choice of node.choices) {
    const position = fields.indexOf(choice.choiceId);
    requireValid(position > previous);
    mask |= 1 << position;
    previous = position;
  }
  writer.tuple([node.slots.length, mask], [roles.length + 1, 2 ** fields.length]);
  for (const ref of node.inputRefs) writer.tuple([index - ref - 1], [index]);
  const usedRoles = new Set();
  for (const slot of node.slots) {
    requireValid(!usedRoles.has(slot.roleId));
    usedRoles.add(slot.roleId);
    writer.tuple([roles.indexOf(slot.roleId), index - slot.nodeRef - 1], [roles.length, index]);
  }
  for (const {choiceId, value} of node.choices) writeValue(writer, value, charge, choiceId);
}

function readNode(reader, index, charge, { coordinates, sourceTable }) {
  const [ordinal] = reader.tuple([coordinates.length]);
  if (ordinal < sourceTable.length) {
    const [constructorId, fields] = sourceTable[ordinal];
    return {nodeKind: 'source', constructorId,
      arguments: fields.map(field => readValue(reader, charge, field))};
  }
  const [operationId, inputs, roles, fields] = coordinates[ordinal];
  const [slotCount, mask] = reader.tuple([roles.length + 1, 2 ** fields.length]);
  requireValid(index > 0 || inputs.length + slotCount === 0);
  const inputRefs = inputs.map(() => index - reader.tuple([index])[0] - 1);
  const usedRoles = new Set();
  const slots = Array.from({length: slotCount}, () => {
    const [role, distance] = reader.tuple([roles.length, index]);
    requireValid(!usedRoles.has(role));
    usedRoles.add(role);
    return {roleId: roles[role], nodeRef: index - distance - 1};
  });
  const choices = fields.flatMap((choiceId, position) => mask & (1 << position)
    ? [{choiceId, value: readValue(reader, charge, choiceId)}] : []);
  return {nodeKind: 'application', operationId, inputRefs, slots, choices};
}

export function encodeClassicalConstructionNumber(blueprint) {
  const canonical = canonicalizeClassicalConstructionBlueprint(blueprint);
  if (!canonical) return null;
  for (const [version, format] of wireFormats) {
    try {
      const writer = createWriter();
      const charge = textBudget();
      writer.bits(format.fingerprint);
      writer.tuple([canonical.nodes.length - 1], [MAX_NODES]);
      canonical.nodes.forEach((node, index) => writeNode(writer, node, index, charge, format));
      return version + '/' + writer.payload();
    } catch {
      // A coordinate may only be available in a newer format.
    }
  }
  return null;
}

export function decodeClassicalConstructionNumber(address) {
  try {
    requireValid(typeof address === 'string' && address.length <= MAX_PAYLOAD + 16);
    const separator = address.indexOf('/');
    requireValid(separator > 0 && separator <= 15);
    const version = address.slice(0, separator);
    requireValid(/^[1-9][0-9]*$/.test(version) && !/\s/.test(version));
    const format = wireFormats.get(version);
    if (!format) return {status: 'unsupported'};
    const payload = address.slice(separator + 1);
    requireValid(payload.length > 0 && payload.length <= MAX_PAYLOAD
      && payload[0] !== '0' && !/[^0-9a-v]/.test(payload));
    const reader = createReader(payload);
    if (reader.bits(64) !== format.fingerprint) return {status: 'unsupported'};
    const [last] = reader.tuple([MAX_NODES]);
    const charge = textBudget();
    const depths = [];
    const nodes = Array.from({length: last + 1}, (_, index) => {
      const node = readNode(reader, index, charge, format);
      const depth = node.nodeKind === 'source' ? 1 : 1 + Math.max(0,
        ...node.inputRefs.map(ref => depths[ref]),
        ...node.slots.map(({nodeRef}) => depths[nodeRef]));
      requireValid(depth <= MAX_DEPTH);
      depths.push(depth);
      return node;
    });
    requireValid(reader.remaining === 0);
    const blueprint = canonicalizeClassicalConstructionBlueprint({
      kind: 'classical-construction-blueprint', version: 1, root: last, nodes,
    });
    requireValid(blueprint && encodeClassicalConstructionNumber(blueprint) === address);
    return {status: 'decoded', blueprint};
  } catch {
    return {status: 'invalid'};
  }
}
