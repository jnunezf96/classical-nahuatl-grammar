const spec = {
  "ownerId": "classical-single-object-applicative-transform",
  "prefix": "ClassicalSingleObjectApplicativeTransform",
  "operationId": "classical.single.object.applicative.transform.execute",
  "inputContract": "complete-typed-classical-single-object-applicative-transform-source",
  "domain": "classical-single-object-applicative-transform",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-applicative-runtime",
  "selections": [
    "claim-p2609",
    "claim-p2610",
    "claim-p2611"
  ],
  "coordinates": {
    "claim-p2609::p2609-when-the-source-is-an-intransitive-vnc-the-applicative": {
      "assertionId": "classical-single-object-applicative-transform:p2609-when-the-source-is-an-intransitive-vnc-the-applicative",
      "canonicalPath": "participants.singleSpecific.sourceObjectCount"
    },
    "claim-p2610::p2610-the-applicative-transform-as-above-is-a-single-object": {
      "assertionId": "classical-single-object-applicative-transform:p2610-the-applicative-transform-as-above-is-a-single-object",
      "canonicalPath": "participants.singleSpecific.targetObjectCount"
    },
    "claim-p2611::p2611-if-the-stem-resulting-from-tla-fusion-has-an": {
      "assertionId": "classical-single-object-applicative-transform:p2611-if-the-stem-resulting-from-tla-fusion-has-an",
      "canonicalPath": "participants.singleSpecific.addedObjectRequest.objectKind"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlApplicativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlApplicativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2609": [],
    "claim-p2610": [],
    "claim-p2611": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2609": "authorized",
    "claim-p2610": "authorized",
    "claim-p2611": "authorized"
  }
};
export default Object.freeze(spec);
