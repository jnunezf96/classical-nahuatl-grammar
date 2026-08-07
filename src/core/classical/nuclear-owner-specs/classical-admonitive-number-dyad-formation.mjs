const spec = {
  "ownerId": "classical-admonitive-number-dyad-formation",
  "prefix": "ClassicalAdmonitiveNumberDyadFormation",
  "operationId": "classical.admonitive.number.dyad.formation.execute",
  "inputContract": "complete-typed-classical-admonitive-number-dyad-formation-source",
  "domain": "classical-admonitive-number-dyad-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-admonitive-number-dyad-formation",
  "selections": [
    "claim-p1101",
    "claim-p1102",
    "claim-p1103",
    "claim-p1104",
    "claim-p1105"
  ],
  "coordinates": {
    "claim-p1101::p1101-as-shown-in-5-3-3-and-5-4": {
      "assertionId": "classical-admonitive-number-dyad-formation:p1101-as-shown-in-5-3-3-and-5-4",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1102::p1102-when-cooperating-with-a-singular-morph-in-num2": {
      "assertionId": "classical-admonitive-number-dyad-formation:p1102-when-cooperating-with-a-singular-morph-in-num2",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1103::p1103-the-morpheme-s-regular-morph-occurs-only-in-cooperation": {
      "assertionId": "classical-admonitive-number-dyad-formation:p1103-the-morpheme-s-regular-morph-occurs-only-in-cooperation",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1104::p1104-the-morphs-in-num2-are-for-singular-and-either": {
      "assertionId": "classical-admonitive-number-dyad-formation:p1104-the-morphs-in-num2-are-for-singular-and-either",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1105::p1105-sg-pl-t-in-t-ih": {
      "assertionId": "classical-admonitive-number-dyad-formation:p1105-sg-pl-t-in-t-ih",
      "canonicalPath": "authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdmonitiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdmonitiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p1101": [
      "class-a-singular"
    ],
    "claim-p1102": [
      "class-b-plural"
    ],
    "claim-p1103": [
      "class-a-singular"
    ],
    "claim-p1104": [
      "class-b-plural"
    ],
    "claim-p1105": [
      "class-a-singular"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1101": "authorized",
    "claim-p1102": "authorized",
    "claim-p1103": "authorized",
    "claim-p1104": "authorized",
    "claim-p1105": "authorized"
  }
};
export default Object.freeze(spec);
