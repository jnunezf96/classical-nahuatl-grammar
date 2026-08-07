const spec = {
  "ownerId": "classical-incorporated-adverb-direct",
  "prefix": "ClassicalIncorporatedAdverbDirect",
  "operationId": "classical.incorporated.adverb.direct.execute",
  "inputContract": "complete-typed-classical-incorporated-adverb-direct-source",
  "domain": "classical-incorporated-adverb-direct",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nominal-embed-runtime",
  "selections": [
    "claim-p2980",
    "claim-p2981",
    "claim-p2982",
    "claim-p2983"
  ],
  "coordinates": {
    "claim-p2980::p2980-even-the-simpler-transformational-process-that-creates-an-incorporated": {
      "assertionId": "classical-incorporated-adverb-direct:p2980-even-the-simpler-transformational-process-that-creates-an-incorporated",
      "canonicalPath": "cases.direct.rules.incorporated-adverb/direct"
    },
    "claim-p2981::p2981-there-are-a-number-of-ways-to-form-an": {
      "assertionId": "classical-incorporated-adverb-direct:p2981-there-are-a-number-of-ways-to-form-an",
      "canonicalPath": "cases.direct.authorizationStatus"
    },
    "claim-p2982::p2982-in-the-following-presentation-of-the-varieties-of-incorporated": {
      "assertionId": "classical-incorporated-adverb-direct:p2982-in-the-following-presentation-of-the-varieties-of-incorporated",
      "canonicalPath": "cases.direct.gcdSatisfied"
    },
    "claim-p2983::p2983-instead-of-giving-the-adjunct-clause-which-may-or": {
      "assertionId": "classical-incorporated-adverb-direct:p2983-instead-of-giving-the-adjunct-clause-which-may-or",
      "canonicalPath": "cases.direct.lcmComplete"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNominalEmbedValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNominalEmbedValidationFrame",
  "executionArgsBySelection": {
    "claim-p2980": [],
    "claim-p2981": [],
    "claim-p2982": [],
    "claim-p2983": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2980": "authorized",
    "claim-p2981": "authorized",
    "claim-p2982": "authorized",
    "claim-p2983": "authorized"
  }
};
export default Object.freeze(spec);
