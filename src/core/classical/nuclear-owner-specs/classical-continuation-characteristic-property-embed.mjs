const spec = {
  "ownerId": "classical-continuation-characteristic-property-embed",
  "prefix": "ClassicalContinuationCharacteristicPropertyEmbed",
  "operationId": "classical.continuation.characteristic.property.embed.execute",
  "inputContract": "complete-typed-classical-continuation-characteristic-property-embed-source",
  "domain": "classical-continuation-characteristic-property-embed",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-patientive-runtime",
  "selections": [
    "claim-p3858",
    "claim-p3859",
    "claim-p3860"
  ],
  "coordinates": {
    "claim-p3858::p3858-like-the-other-patientive-nounstems-the-imperfective-patientive-nounstem": {
      "assertionId": "classical-continuation-characteristic-property-embed:p3858-like-the-other-patientive-nounstems-the-imperfective-patientive-nounstem",
      "canonicalPath": "cases.characteristicPropertyEmbed.authorizationStatus"
    },
    "claim-p3859::p3859-more-often-however-only-the-embed-of-the-derived": {
      "assertionId": "classical-continuation-characteristic-property-embed:p3859-more-often-however-only-the-embed-of-the-derived",
      "canonicalPath": "cases.characteristicPropertyEmbed.first.canonicalResult"
    },
    "claim-p3860::p3860-m-o-yol-chic-a-hu-a-to-strengthen": {
      "assertionId": "classical-continuation-characteristic-property-embed:p3860-m-o-yol-chic-a-hu-a-to-strengthen",
      "canonicalPath": "cases.characteristicPropertyEmbed.second.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p3858": [],
    "claim-p3859": [],
    "claim-p3860": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3858": "authorized",
    "claim-p3859": "authorized",
    "claim-p3860": "authorized"
  }
};
export default Object.freeze(spec);
