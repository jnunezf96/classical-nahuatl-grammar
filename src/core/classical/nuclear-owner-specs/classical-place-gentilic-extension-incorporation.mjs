const spec = {
  "ownerId": "classical-place-gentilic-extension-incorporation",
  "prefix": "ClassicalPlaceGentilicExtensionIncorporation",
  "operationId": "classical.place.gentilic.extension.incorporation.execute",
  "inputContract": "complete-typed-classical-place-gentilic-extension-incorporation-source",
  "domain": "classical-place-gentilic-extension-incorporation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-place-gentilic-runtime",
  "selections": [
    "claim-p4639",
    "claim-p4640",
    "claim-p4641",
    "claim-p4642",
    "claim-p4643"
  ],
  "coordinates": {
    "claim-p4639::p4639-like-any-other-nounstem-a-gentilic-nounstem-may-be": {
      "assertionId": "classical-place-gentilic-extension-incorporation:p4639-like-any-other-nounstem-a-gentilic-nounstem-may-be",
      "canonicalPath": "cases.gentilicIncorporatedPlace.canonicalFrame"
    },
    "claim-p4640::p4640-occasionally-a-gentilic-nounstem-can-serve-as-the-embed": {
      "assertionId": "classical-place-gentilic-extension-incorporation:p4640-occasionally-a-gentilic-nounstem-can-serve-as-the-embed",
      "canonicalPath": "cases.gentilicAffectivePlace.lcmAxisId"
    },
    "claim-p4641::p4641-the-gentilic-nounstem-can-also-be-more-deeply-embedded": {
      "assertionId": "classical-place-gentilic-extension-incorporation:p4641-the-gentilic-nounstem-can-also-be-more-deeply-embedded",
      "canonicalPath": "cases.gentilicIncorporatedPlace.canonicalFrame"
    },
    "claim-p4642::p4642-care-must-be-taken-however-in-analyzing-compound-nounstems": {
      "assertionId": "classical-place-gentilic-extension-incorporation:p4642-care-must-be-taken-however-in-analyzing-compound-nounstems",
      "canonicalPath": "cases.gentilicAffectivePlace.lcmAxisId"
    },
    "claim-p4643::p4643-for-example-in-the-place-name-nnc-a-tlancatepe": {
      "assertionId": "classical-place-gentilic-extension-incorporation:p4643-for-example-in-the-place-name-nnc-a-tlancatepe",
      "canonicalPath": "cases.gentilicIncorporatedPlace.canonicalFrame"
    }
  },
  "executionFunctionName": "buildClassicalPlaceGentilicValidationFrame",
  "executionValidatorName": "isClassicalPlaceGentilicValidationFrame",
  "executionArgsBySelection": {
    "claim-p4639": [],
    "claim-p4640": [],
    "claim-p4641": [],
    "claim-p4642": [],
    "claim-p4643": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4639": "authorized",
    "claim-p4640": "authorized",
    "claim-p4641": "authorized",
    "claim-p4642": "authorized",
    "claim-p4643": "authorized"
  }
};
export default Object.freeze(spec);
