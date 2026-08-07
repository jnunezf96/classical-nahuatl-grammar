const spec = {
  "ownerId": "classical-place-gentilic-extension-profession",
  "prefix": "ClassicalPlaceGentilicExtensionProfession",
  "operationId": "classical.place.gentilic.extension.profession.execute",
  "inputContract": "complete-typed-classical-place-gentilic-extension-profession-source",
  "domain": "classical-place-gentilic-extension-profession",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-place-gentilic-runtime",
  "selections": [
    "claim-p4650",
    "claim-p4651"
  ],
  "coordinates": {
    "claim-p4650::p4650-as-a-consequence-their-gentilic-nounstems-took-on-an": {
      "assertionId": "classical-place-gentilic-extension-profession:p4650-as-a-consequence-their-gentilic-nounstems-took-on-an",
      "canonicalPath": "cases.profession.canonicalFrame"
    },
    "claim-p4651::p4651-these-nounstems-can-occur-in-absolutive-state-or-possessive": {
      "assertionId": "classical-place-gentilic-extension-profession:p4651-these-nounstems-can-occur-in-absolutive-state-or-possessive",
      "canonicalPath": "cases.professionPossessive.state"
    }
  },
  "executionFunctionName": "buildClassicalPlaceGentilicValidationFrame",
  "executionValidatorName": "isClassicalPlaceGentilicValidationFrame",
  "executionArgsBySelection": {
    "claim-p4650": [],
    "claim-p4651": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4650": "authorized",
    "claim-p4651": "authorized"
  }
};
export default Object.freeze(spec);
