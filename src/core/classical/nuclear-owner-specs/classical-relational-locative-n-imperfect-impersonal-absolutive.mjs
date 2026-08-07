const spec = {
  "ownerId": "classical-relational-locative-n-imperfect-impersonal-absolutive",
  "prefix": "ClassicalRelationalLocativeNImperfectImpersonalAbsolutive",
  "operationId": "classical.relational.locative.n.imperfect.impersonal.absolutive.execute",
  "inputContract": "complete-typed-classical-relational-locative-n-imperfect-impersonal-absolutive-source",
  "domain": "classical-relational-locative-n-imperfect-impersonal-absolutive",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-locative-relational-nnc-runtime",
  "selections": [
    "claim-p4382",
    "claim-p4383",
    "claim-p4384",
    "claim-p4385",
    "claim-p4386"
  ],
  "coordinates": {
    "claim-p4382::p4382-when-the-source-is-an-impersonal-voice-vnc-the": {
      "assertionId": "classical-relational-locative-n-imperfect-impersonal-absolutive:p4382-when-the-source-is-an-impersonal-voice-vnc-the",
      "canonicalPath": "cases.imperfectImpersonal.canonicalResult"
    },
    "claim-p4383::p4383-when-the-source-is-an-impersonal-voice-vnc": {
      "assertionId": "classical-relational-locative-n-imperfect-impersonal-absolutive:p4383-when-the-source-is-an-impersonal-voice-vnc",
      "canonicalPath": "cases.imperfectImpersonal.sourceFormation"
    },
    "claim-p4384::p4384-when-a-source-vnc-is-built-on-a-tla": {
      "assertionId": "classical-relational-locative-n-imperfect-impersonal-absolutive:p4384-when-a-source-vnc-is-built-on-a-tla",
      "canonicalPath": "cases.imperfectImpersonal.sourceState"
    },
    "claim-p4385::p4385-when-a-source-vnc-is-built-on-a-tla": {
      "assertionId": "classical-relational-locative-n-imperfect-impersonal-absolutive:p4385-when-a-source-vnc-is-built-on-a-tla",
      "canonicalPath": "cases.imperfectImpersonal.canonicalResult"
    },
    "claim-p4386::p4386-a-vnc-built-on-an-inherently-impersonal-verbstem-simply": {
      "assertionId": "classical-relational-locative-n-imperfect-impersonal-absolutive:p4386-a-vnc-built-on-an-inherently-impersonal-verbstem-simply",
      "canonicalPath": "cases.imperfectImpersonal.sourceFormation"
    }
  },
  "executionFunctionName": "buildClassicalLocativeRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalLocativeRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4382": [],
    "claim-p4383": [],
    "claim-p4384": [],
    "claim-p4385": [],
    "claim-p4386": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4382": "authorized",
    "claim-p4383": "authorized",
    "claim-p4384": "authorized",
    "claim-p4385": "authorized",
    "claim-p4386": "authorized"
  }
};
export default Object.freeze(spec);
