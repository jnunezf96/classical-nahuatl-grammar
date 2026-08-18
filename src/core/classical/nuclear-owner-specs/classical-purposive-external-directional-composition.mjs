const spec = {
  "ownerId": "classical-purposive-external-directional-composition",
  "prefix": "ClassicalPurposiveExternalDirectionalComposition",
  "operationId": "classical.purposive.external.directional.composition.execute",
  "inputContract": "complete-typed-classical-purposive-external-directional-composition-source",
  "domain": "classical-purposive-external-directional-composition",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-purposive-runtime",
  "selections": [
    "claim-p2955",
    "claim-p2956",
    "claim-p2957"
  ],
  "coordinates": {
    "claim-p2955::p2955-vncs-containing-the-stem-external-directional-morphs-hua-l": {
      "assertionId": "classical-purposive-external-directional-composition:p2955-vncs-containing-the-stem-external-directional-morphs-hua-l",
      "canonicalPath": "cases.externalHual.facts.externalDirectional"
    },
    "claim-p2956::p2956-a-stem-external-directional-morph-can-also-occur-on": {
      "assertionId": "classical-purposive-external-directional-composition:p2956-a-stem-external-directional-morph-can-also-occur-on",
      "canonicalPath": "cases.externalOn.facts.externalDirectional"
    },
    "claim-p2957::p2957-since-the-action-of-the-embed-and-that-of": {
      "assertionId": "classical-purposive-external-directional-composition:p2957-since-the-action-of-the-embed-and-that-of",
      "canonicalPath": "cases.externalOn.facts.externalDirectionalMayContinueOrIntensifyMovement"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlPurposiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlPurposiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p2955": [],
    "claim-p2956": [],
    "claim-p2957": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2955": "authorized",
    "claim-p2956": "authorized",
    "claim-p2957": "authorized"
  }
};
export default Object.freeze(spec);
