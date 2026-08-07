const spec = {
  "ownerId": "classical-adjectival-calti-compound-intensification",
  "prefix": "ClassicalAdjectivalCaltiCompoundIntensification",
  "operationId": "classical.adjectival.calti.compound.intensification.execute",
  "inputContract": "complete-typed-classical-adjectival-calti-compound-intensification-source",
  "domain": "classical-adjectival-calti-compound-intensification",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3972",
    "claim-p3973"
  ],
  "coordinates": {
    "claim-p3972::p3972-other-less-frequent-compound-stemmed-nncs-that-express-intensification": {
      "assertionId": "classical-adjectival-calti-compound-intensification:p3972-other-less-frequent-compound-stemmed-nncs-that-express-intensification",
      "canonicalPath": "sources.compoundNnc.authorizationStatus"
    },
    "claim-p3973::p3973-this-matrix-stem-may-be-expanded-internally-to-signify": {
      "assertionId": "classical-adjectival-calti-compound-intensification:p3973-this-matrix-stem-may-be-expanded-internally-to-signify",
      "canonicalPath": "sources.compoundNnc.cases.base.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3972": [],
    "claim-p3973": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3972": "authorized",
    "claim-p3973": "authorized"
  }
};
export default Object.freeze(spec);
