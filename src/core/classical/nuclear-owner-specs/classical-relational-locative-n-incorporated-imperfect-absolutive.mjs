const spec = {
  "ownerId": "classical-relational-locative-n-incorporated-imperfect-absolutive",
  "prefix": "ClassicalRelationalLocativeNIncorporatedImperfectAbsolutive",
  "operationId": "classical.relational.locative.n.incorporated.imperfect.absolutive.execute",
  "inputContract": "complete-typed-classical-relational-locative-n-incorporated-imperfect-absolutive-source",
  "domain": "classical-relational-locative-n-incorporated-imperfect-absolutive",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-locative-relational-nnc-runtime",
  "selections": [
    "claim-p4378",
    "claim-p4379"
  ],
  "coordinates": {
    "claim-p4378::p4378-at-times-an-active-voice-imperfect-tense-predicate-embedded": {
      "assertionId": "classical-relational-locative-n-incorporated-imperfect-absolutive:p4378-at-times-an-active-voice-imperfect-tense-predicate-embedded",
      "canonicalPath": "cases.imperfectActiveIncorporated.canonicalResult"
    },
    "claim-p4379::p4379-the-nnc-built-on-this-kind-of-stem-is": {
      "assertionId": "classical-relational-locative-n-incorporated-imperfect-absolutive:p4379-the-nnc-built-on-this-kind-of-stem-is",
      "canonicalPath": "cases.imperfectActiveIncorporated.sourceKind"
    }
  },
  "executionFunctionName": "buildClassicalLocativeRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalLocativeRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4378": [],
    "claim-p4379": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4378": "authorized",
    "claim-p4379": "authorized"
  }
};
export default Object.freeze(spec);
