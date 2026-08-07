const spec = {
  "ownerId": "classical-admonitive-nonpast-perfective-formation",
  "prefix": "ClassicalAdmonitiveNonpastPerfectiveFormation",
  "operationId": "classical.admonitive.nonpast.perfective.formation.execute",
  "inputContract": "complete-typed-classical-admonitive-nonpast-perfective-formation-source",
  "domain": "classical-admonitive-nonpast-perfective-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-admonitive-nonpast-perfective-formation",
  "selections": [
    "claim-p1099",
    "claim-p1100"
  ],
  "coordinates": {
    "claim-p1099::p1099-while-logic-dictates-that-there-can-only-be-a": {
      "assertionId": "classical-admonitive-nonpast-perfective-formation:p1099-while-logic-dictates-that-there-can-only-be-a",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1100::p1100-7-the-nonpast-admonitive-predicate-is-distinguished-from-the": {
      "assertionId": "classical-admonitive-nonpast-perfective-formation:p1100-7-the-nonpast-admonitive-predicate-is-distinguished-from-the",
      "canonicalPath": "authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdmonitiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdmonitiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p1099": [
      "class-a-singular"
    ],
    "claim-p1100": [
      "class-b-singular"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1099": "authorized",
    "claim-p1100": "authorized"
  }
};
export default Object.freeze(spec);
