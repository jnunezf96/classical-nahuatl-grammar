const spec = {
  "ownerId": "classical-adjectival-pol-augmentative-intensification",
  "prefix": "ClassicalAdjectivalPolAugmentativeIntensification",
  "operationId": "classical.adjectival.pol.augmentative.intensification.execute",
  "inputContract": "complete-typed-classical-adjectival-pol-augmentative-intensification-source",
  "domain": "classical-adjectival-pol-augmentative-intensification",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3977",
    "claim-p3978"
  ],
  "coordinates": {
    "claim-p3977::p3977-the-matrix-stem-po-l-implies-an-increase-in": {
      "assertionId": "classical-adjectival-pol-augmentative-intensification:p3977-the-matrix-stem-po-l-implies-an-increase-in",
      "canonicalPath": "sources.affectiveNnc.authorizationStatus"
    },
    "claim-p3978::p3978-stems-with-po-l-as-matrix-may-have-the": {
      "assertionId": "classical-adjectival-pol-augmentative-intensification:p3978-stems-with-po-l-as-matrix-may-have-the",
      "canonicalPath": "sources.affectiveNnc.typedFrameAuthority"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3977": [],
    "claim-p3978": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3977": "authorized",
    "claim-p3978": "authorized"
  }
};
export default Object.freeze(spec);
