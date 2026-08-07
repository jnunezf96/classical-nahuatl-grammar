const spec = {
  "ownerId": "classical-relational-locative-n-imperfect-passive-possessive",
  "prefix": "ClassicalRelationalLocativeNImperfectPassivePossessive",
  "operationId": "classical.relational.locative.n.imperfect.passive.possessive.execute",
  "inputContract": "complete-typed-classical-relational-locative-n-imperfect-passive-possessive-source",
  "domain": "classical-relational-locative-n-imperfect-passive-possessive",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-locative-relational-nnc-runtime",
  "selections": [
    "claim-p4380",
    "claim-p4381"
  ],
  "coordinates": {
    "claim-p4380::p4380-when-the-source-is-a-passive-voice-vnc-the": {
      "assertionId": "classical-relational-locative-n-imperfect-passive-possessive:p4380-when-the-source-is-a-passive-voice-vnc-the",
      "canonicalPath": "cases.imperfectPassive.canonicalResult"
    },
    "claim-p4381::p4381-when-the-source-is-a-passive-voice-vnc": {
      "assertionId": "classical-relational-locative-n-imperfect-passive-possessive:p4381-when-the-source-is-a-passive-voice-vnc",
      "canonicalPath": "cases.imperfectPassive.sourceFormation"
    }
  },
  "executionFunctionName": "buildClassicalLocativeRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalLocativeRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4380": [],
    "claim-p4381": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4380": "authorized",
    "claim-p4381": "authorized"
  }
};
export default Object.freeze(spec);
