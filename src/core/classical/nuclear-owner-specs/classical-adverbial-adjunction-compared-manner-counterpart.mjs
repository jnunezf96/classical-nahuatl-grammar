const spec = {
  "ownerId": "classical-adverbial-adjunction-compared-manner-counterpart",
  "prefix": "ClassicalAdverbialAdjunctionComparedMannerCounterpart",
  "operationId": "classical.adverbial.adjunction.compared.manner.counterpart.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-compared-manner-counterpart-source",
  "domain": "classical-adverbial-adjunction-compared-manner-counterpart",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4660"
  ],
  "coordinates": {
    "claim-p4660::p4660-the-single-nucleus-counterpart-is-not-ambiguous-being-only": {
      "assertionId": "classical-adverbial-adjunction-compared-manner-counterpart:p4660-the-single-nucleus-counterpart-is-not-ambiguous-being-only",
      "canonicalPath": "analysis.comparedMannerCompoundIsSingleNucleus"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4660": [
      "compared-manner-counterpart"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4660": "authorized"
  }
};
export default Object.freeze(spec);
