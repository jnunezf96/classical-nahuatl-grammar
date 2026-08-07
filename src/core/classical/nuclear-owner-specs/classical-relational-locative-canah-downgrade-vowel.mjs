const spec = {
  "ownerId": "classical-relational-locative-canah-downgrade-vowel",
  "prefix": "ClassicalRelationalLocativeCanahDowngradeVowel",
  "operationId": "classical.relational.locative.canah.downgrade.vowel.execute",
  "inputContract": "complete-typed-classical-relational-locative-canah-downgrade-vowel-source",
  "domain": "classical-relational-locative-canah-downgrade-vowel",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-locative-relational-nnc-runtime",
  "selections": [
    "claim-p4357",
    "claim-p4358"
  ],
  "coordinates": {
    "claim-p4357::p4357-the-nnc-ca-n-can-be-downgraded-to-the": {
      "assertionId": "classical-relational-locative-canah-downgrade-vowel:p4357-the-nnc-ca-n-can-be-downgraded-to-the",
      "canonicalPath": "cases.canModified.canonicalResult"
    },
    "claim-p4358::p4358-the-vowel-length-on-the-embed-is-lost-as": {
      "assertionId": "classical-relational-locative-canah-downgrade-vowel:p4358-the-vowel-length-on-the-embed-is-lost-as",
      "canonicalPath": "cases.canModified.predicateStem"
    }
  },
  "executionFunctionName": "buildClassicalLocativeRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalLocativeRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4357": [],
    "claim-p4358": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4357": "authorized",
    "claim-p4358": "authorized"
  }
};
export default Object.freeze(spec);
