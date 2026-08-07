const spec = {
  "ownerId": "classical-adjectival-measure-nnc-head",
  "prefix": "ClassicalAdjectivalMeasureNncHead",
  "operationId": "classical.adjectival.measure.nnc.head.execute",
  "inputContract": "complete-typed-classical-adjectival-measure-nnc-head-source",
  "domain": "classical-adjectival-measure-nnc-head",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4080"
  ],
  "coordinates": {
    "claim-p4080::p4080-as-explained-in-34-16-a-measure-nnc-serves": {
      "assertionId": "classical-adjectival-measure-nnc-head:p4080-as-explained-in-34-16-a-measure-nnc-serves",
      "canonicalPath": "sources.cardinal.cases.adjectivalModification.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4080": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4080": "authorized"
  }
};
export default Object.freeze(spec);
