const spec = {
  "ownerId": "classical-mani-irregular-paradigm",
  "prefix": "ClassicalManiIrregularParadigm",
  "operationId": "classical.mani.irregular.paradigm.execute",
  "inputContract": "complete-typed-classical-mani-irregular-paradigm-source",
  "domain": "classical-mani-irregular-paradigm",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-mani-irregular-paradigm",
  "selections": [
    "claim-p1213",
    "claim-p1214",
    "claim-p1215"
  ],
  "coordinates": {
    "claim-p1213::p1213-mani-man-to-extend-to-be-vncs-built-on": {
      "assertionId": "classical-mani-irregular-paradigm:p1213-mani-man-to-extend-to-be-vncs-built-on",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1214::p1214-it-is-not-ordinarily-used-for-individual-animate-beings": {
      "assertionId": "classical-mani-irregular-paradigm:p1214-it-is-not-ordinarily-used-for-individual-animate-beings",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1215::p1215-is-also-used-for-masses-or-crowds-of-men": {
      "assertionId": "classical-mani-irregular-paradigm:p1215-is-also-used-for-masses-or-crowds-of-men",
      "canonicalPath": "authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlIrregularValidationFrame",
  "executionValidatorName": "isClassicalNahuatlIrregularValidationFrame",
  "executionArgsBySelection": {
    "claim-p1213": [
      "mani-present"
    ],
    "claim-p1214": [
      "mani-preterit"
    ],
    "claim-p1215": [
      "mani-past"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1213": "authorized",
    "claim-p1214": "authorized",
    "claim-p1215": "authorized"
  }
};
export default Object.freeze(spec);
