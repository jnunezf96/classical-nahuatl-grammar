const spec = {
  "ownerId": "classical-sentence-action-nnc-supplement",
  "prefix": "ClassicalSentenceActionNncSupplement",
  "operationId": "classical.sentence.action.nnc.supplement.execute",
  "inputContract": "complete-typed-classical-sentence-action-nnc-supplement-source",
  "domain": "classical-sentence-action-nnc-supplement",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-patientive-runtime",
  "selections": [
    "claim-p3673",
    "claim-p3674",
    "claim-p3675"
  ],
  "coordinates": {
    "claim-p3673::p3673-the-role-of-supplement-may-be-performed-either-by": {
      "assertionId": "classical-sentence-action-nnc-supplement:p3673-the-role-of-supplement-may-be-performed-either-by",
      "canonicalPath": "cases.actionNncSupplement.authorizationStatus"
    },
    "claim-p3674::p3674-the-following-sentences-exemplify-this-in-a-supplementary-object": {
      "assertionId": "classical-sentence-action-nnc-supplement:p3674-the-following-sentences-exemplify-this-in-a-supplementary-object",
      "canonicalPath": "cases.actionNncSupplement.canonicalResult"
    },
    "claim-p3675::p3675-both-sentences-are-translated-as-i-know-how-to": {
      "assertionId": "classical-sentence-action-nnc-supplement:p3675-both-sentences-are-translated-as-i-know-how-to",
      "canonicalPath": "cases.actionNncSupplement.supplementSurface"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p3673": [],
    "claim-p3674": [],
    "claim-p3675": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3673": "authorized",
    "claim-p3674": "authorized",
    "claim-p3675": "authorized"
  }
};
export default Object.freeze(spec);
