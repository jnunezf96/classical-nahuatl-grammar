const spec = {
  "ownerId": "classical-relational-locative-n-imperfect-active-state",
  "prefix": "ClassicalRelationalLocativeNImperfectActiveState",
  "operationId": "classical.relational.locative.n.imperfect.active.state.execute",
  "inputContract": "complete-typed-classical-relational-locative-n-imperfect-active-state-source",
  "domain": "classical-relational-locative-n-imperfect-active-state",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-locative-relational-nnc-runtime",
  "selections": [
    "claim-p4370",
    "claim-p4371",
    "claim-p4372"
  ],
  "coordinates": {
    "claim-p4370::p4370-when-the-source-is-an-active-voice-vnc": {
      "assertionId": "classical-relational-locative-n-imperfect-active-state:p4370-when-the-source-is-an-active-voice-vnc",
      "canonicalPath": "cases.imperfectActive.canonicalResult"
    },
    "claim-p4371::p4371-when-the-source-is-an-active-voice-vnc-the": {
      "assertionId": "classical-relational-locative-n-imperfect-active-state:p4371-when-the-source-is-an-active-voice-vnc-the",
      "canonicalPath": "cases.imperfectActive.sourceFormation"
    },
    "claim-p4372::p4372-remember-that-with-class-c-and-d-verbs-the": {
      "assertionId": "classical-relational-locative-n-imperfect-active-state:p4372-remember-that-with-class-c-and-d-verbs-the",
      "canonicalPath": "cases.imperfectActive.sourceState"
    }
  },
  "executionFunctionName": "buildClassicalLocativeRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalLocativeRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4370": [],
    "claim-p4371": [],
    "claim-p4372": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4370": "authorized",
    "claim-p4371": "authorized",
    "claim-p4372": "authorized"
  }
};
export default Object.freeze(spec);
