const spec = {
  "ownerId": "classical-adjectival-oc-ce-modified-head",
  "prefix": "ClassicalAdjectivalOcCeModifiedHead",
  "operationId": "classical.adjectival.oc.ce.modified.head.execute",
  "inputContract": "complete-typed-classical-adjectival-oc-ce-modified-head-source",
  "domain": "classical-adjectival-oc-ce-modified-head",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4119"
  ],
  "coordinates": {
    "claim-p4119::p4119-the-oc-ce-collocation-mentioned-in-34-15-as": {
      "assertionId": "classical-adjectival-oc-ce-modified-head:p4119-the-oc-ce-collocation-mentioned-in-34-15-as",
      "canonicalPath": "cases.pronominalHead.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4119": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4119": "authorized"
  }
};
export default Object.freeze(spec);
