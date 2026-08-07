const spec = {
  "ownerId": "classical-compound-nnc-order-ambiguity",
  "prefix": "ClassicalCompoundNncOrderAmbiguity",
  "operationId": "classical.compound.nnc.order.ambiguity.execute",
  "inputContract": "complete-typed-classical-compound-nnc-order-ambiguity-source",
  "domain": "classical-compound-nnc-order-ambiguity",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-nnc-runtime",
  "selections": [
    "claim-p3095",
    "claim-p3096"
  ],
  "coordinates": {
    "claim-p3095::p3095-the-second-problem-to-be-faced-in-dealing-with": {
      "assertionId": "classical-compound-nnc-order-ambiguity:p3095-the-second-problem-to-be-faced-in-dealing-with",
      "canonicalPath": "cases.orderAmbiguity.rules.compound-nnc/order-ambiguity"
    },
    "claim-p3096::p3096-although-the-english-translation-is-unable-to-capture-the": {
      "assertionId": "classical-compound-nnc-order-ambiguity:p3096-although-the-english-translation-is-unable-to-capture-the",
      "canonicalPath": "cases.orderAmbiguity.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3095": [],
    "claim-p3096": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3095": "authorized",
    "claim-p3096": "authorized"
  }
};
export default Object.freeze(spec);
