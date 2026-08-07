const spec = {
  "ownerId": "classical-wish-intensification-formation",
  "prefix": "ClassicalWishIntensificationFormation",
  "operationId": "classical.wish.intensification.formation.execute",
  "inputContract": "complete-typed-classical-wish-intensification-formation-source",
  "domain": "classical-wish-intensification-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-wish-intensification-formation",
  "selections": [
    "claim-p1070",
    "claim-p1071",
    "claim-p1072",
    "claim-p1073"
  ],
  "coordinates": {
    "claim-p1070::p1070-a-wish-sentence-can-be-made-more-urgent-by": {
      "assertionId": "classical-wish-intensification-formation:p1070-a-wish-sentence-can-be-made-more-urgent-by",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1071::p1071-traditionally-written-solid-as-noce": {
      "assertionId": "classical-wish-intensification-formation:p1071-traditionally-written-solid-as-noce",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1072::p1072-a-fervent-wish-can-be-expressed-by-placing-the": {
      "assertionId": "classical-wish-intensification-formation:p1072-a-fervent-wish-can-be-expressed-by-placing-the",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1073::p1073-the-particle-ye-already-also-serves-to-intensify-tla": {
      "assertionId": "classical-wish-intensification-formation:p1073-the-particle-ye-already-also-serves-to-intensify-tla",
      "canonicalPath": "authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlOptativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlOptativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p1070": [
      "wish-urgent"
    ],
    "claim-p1071": [
      "wish-urgent"
    ],
    "claim-p1072": [
      "wish-urgent"
    ],
    "claim-p1073": [
      "wish-urgent"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1070": "authorized",
    "claim-p1071": "authorized",
    "claim-p1072": "authorized",
    "claim-p1073": "authorized"
  }
};
export default Object.freeze(spec);
