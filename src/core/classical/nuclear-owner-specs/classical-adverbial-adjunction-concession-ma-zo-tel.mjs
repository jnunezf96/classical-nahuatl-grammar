const spec = {
  "ownerId": "classical-adverbial-adjunction-concession-ma-zo-tel",
  "prefix": "ClassicalAdverbialAdjunctionConcessionMaZoTel",
  "operationId": "classical.adverbial.adjunction.concession.ma.zo.tel.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-concession-ma-zo-tel-source",
  "domain": "classical-adverbial-adjunction-concession-ma-zo-tel",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4779"
  ],
  "coordinates": {
    "claim-p4779::p4779-the-particle-te-l-nevertheless-nonetheless-can-be-added": {
      "assertionId": "classical-adverbial-adjunction-concession-ma-zo-tel:p4779-the-particle-te-l-nevertheless-nonetheless-can-be-added",
      "canonicalPath": "analysis.maZoTelConcessionLicensed"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4779": [
      "concession-ma-zo-tel"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4779": "authorized"
  }
};
export default Object.freeze(spec);
