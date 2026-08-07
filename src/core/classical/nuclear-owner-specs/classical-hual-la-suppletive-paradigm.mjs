const spec = {
  "ownerId": "classical-hual-la-suppletive-paradigm",
  "prefix": "ClassicalHualLaSuppletiveParadigm",
  "operationId": "classical.hual.la.suppletive.paradigm.execute",
  "inputContract": "complete-typed-classical-hual-la-suppletive-paradigm-source",
  "domain": "classical-hual-la-suppletive-paradigm",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-hual-la-suppletive-paradigm",
  "selections": [
    "claim-p1258",
    "claim-p1259"
  ],
  "coordinates": {
    "claim-p1258::p1258-hua-l-la-hua-l-la-uh-hua-l": {
      "assertionId": "classical-hual-la-suppletive-paradigm:p1258-hua-l-la-hua-l-la-uh-hua-l",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1259::p1259-prefix-is-fused-to-the-stem-since-l-y": {
      "assertionId": "classical-hual-la-suppletive-paradigm:p1259-prefix-is-fused-to-the-stem-since-l-y",
      "canonicalPath": "authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlIrregularValidationFrame",
  "executionValidatorName": "isClassicalNahuatlIrregularValidationFrame",
  "executionArgsBySelection": {
    "claim-p1258": [
      "hual-present"
    ],
    "claim-p1259": [
      "hual-present-plural"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1258": "authorized",
    "claim-p1259": "authorized"
  }
};
export default Object.freeze(spec);
