const spec = {
  "ownerId": "classical-absolutive-plural-connector-formation",
  "prefix": "ClassicalAbsolutivePluralConnectorFormation",
  "operationId": "classical.absolutive.plural.connector.formation.execute",
  "inputContract": "complete-typed-classical-absolutive-plural-connector-formation-source",
  "domain": "classical-absolutive-plural-connector-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nnc-layer-evaluator",
  "selections": [
    "claim-p1285",
    "claim-p1286",
    "claim-p1287",
    "claim-p1288",
    "claim-p1289"
  ],
  "coordinates": {
    "claim-p1285::p1285-if-the-nnc-s-predicate-is-in-the-absolutive": {
      "assertionId": "classical-absolutive-plural-connector-formation:p1285-if-the-nnc-s-predicate-is-in-the-absolutive",
      "canonicalPath": "numberFrame.subjectNumber"
    },
    "claim-p1286::p1286-if-the-nnc-s-predicate-is-in-the-absolutive": {
      "assertionId": "classical-absolutive-plural-connector-formation:p1286-if-the-nnc-s-predicate-is-in-the-absolutive",
      "canonicalPath": "numberFrame.num1"
    },
    "claim-p1287::p1287-both-m-and-0-are-suppletive-morphs": {
      "assertionId": "classical-absolutive-plural-connector-formation:p1287-both-m-and-0-are-suppletive-morphs",
      "canonicalPath": "numberFrame.num1"
    },
    "claim-p1288::p1288-occurring-in-singular-number-subjects-t-ti-tii-or": {
      "assertionId": "classical-absolutive-plural-connector-formation:p1288-occurring-in-singular-number-subjects-t-ti-tii-or",
      "canonicalPath": "numberFrame.num1"
    },
    "claim-p1289::p1289-when-one-of-the-above-morphs-occupies-the-num1": {
      "assertionId": "classical-absolutive-plural-connector-formation:p1289-when-one-of-the-above-morphs-occupies-the-num1",
      "canonicalPath": "numberFrame.num2"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAbsolutiveNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAbsolutiveNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1285": [
      "plural-t-in"
    ],
    "claim-p1286": [
      "plural-t-in"
    ],
    "claim-p1287": [
      "plural-m-eh"
    ],
    "claim-p1288": [
      "plural-zero-h"
    ],
    "claim-p1289": [
      "plural-m-eh"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1285": "authorized",
    "claim-p1286": "authorized",
    "claim-p1287": "authorized",
    "claim-p1288": "authorized",
    "claim-p1289": "authorized"
  }
};
export default Object.freeze(spec);
