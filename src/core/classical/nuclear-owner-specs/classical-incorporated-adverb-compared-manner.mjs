const spec = {
  "ownerId": "classical-incorporated-adverb-compared-manner",
  "prefix": "ClassicalIncorporatedAdverbComparedManner",
  "operationId": "classical.incorporated.adverb.compared.manner.execute",
  "inputContract": "complete-typed-classical-incorporated-adverb-compared-manner-source",
  "domain": "classical-incorporated-adverb-compared-manner",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nominal-embed-runtime",
  "selections": [
    "claim-p2996",
    "claim-p2997",
    "claim-p2998",
    "claim-p2999",
    "claim-p3000",
    "claim-p3001"
  ],
  "coordinates": {
    "claim-p2996::p2996-the-incorporated-nnc-may-represent-a-compared-manner-of": {
      "assertionId": "classical-incorporated-adverb-compared-manner:p2996-the-incorporated-nnc-may-represent-a-compared-manner-of",
      "canonicalPath": "cases.comparedManner.rules.incorporated-adverb/compared-manner"
    },
    "claim-p2997::p2997-the-formation-establishes-a-comparison-between-some-pronoun-in": {
      "assertionId": "classical-incorporated-adverb-compared-manner:p2997-the-formation-establishes-a-comparison-between-some-pronoun-in",
      "canonicalPath": "cases.comparedManner.authorizationStatus"
    },
    "claim-p2998::p2998-if-the-matrix-verbstem-is-intransitive-the-incorporated-nnc": {
      "assertionId": "classical-incorporated-adverb-compared-manner:p2998-if-the-matrix-verbstem-is-intransitive-the-incorporated-nnc",
      "canonicalPath": "cases.comparedManner.gcdSatisfied"
    },
    "claim-p2999::p2999-if-the-matrix-stem-is-transitive-there-are-two": {
      "assertionId": "classical-incorporated-adverb-compared-manner:p2999-if-the-matrix-stem-is-transitive-there-are-two",
      "canonicalPath": "cases.comparedManner.lcmComplete"
    },
    "claim-p3000::p3000-the-comparison-may-be-established-with-the-subject-pronoun": {
      "assertionId": "classical-incorporated-adverb-compared-manner:p3000-the-comparison-may-be-established-with-the-subject-pronoun",
      "canonicalPath": "cases.comparedManner.rules.incorporated-adverb/compared-manner"
    },
    "claim-p3001::p3001-the-comparison-may-be-established-with-the-object-pronoun": {
      "assertionId": "classical-incorporated-adverb-compared-manner:p3001-the-comparison-may-be-established-with-the-object-pronoun",
      "canonicalPath": "cases.comparedManner.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNominalEmbedValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNominalEmbedValidationFrame",
  "executionArgsBySelection": {
    "claim-p2996": [],
    "claim-p2997": [],
    "claim-p2998": [],
    "claim-p2999": [],
    "claim-p3000": [],
    "claim-p3001": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2996": "authorized",
    "claim-p2997": "authorized",
    "claim-p2998": "authorized",
    "claim-p2999": "authorized",
    "claim-p3000": "authorized",
    "claim-p3001": "authorized"
  }
};
export default Object.freeze(spec);
