const spec = {
  "ownerId": "classical-inbound-purposive-future-indicative",
  "prefix": "ClassicalInboundPurposiveFutureIndicative",
  "operationId": "classical.inbound.purposive.future.indicative.execute",
  "inputContract": "complete-typed-classical-inbound-purposive-future-indicative-source",
  "domain": "classical-inbound-purposive-future-indicative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-purposive-runtime",
  "selections": [
    "claim-p2949"
  ],
  "coordinates": {
    "claim-p2949::p2949-the-tense-morph-0-has-a-future-indicative-meaning": {
      "assertionId": "classical-inbound-purposive-future-indicative:p2949-the-tense-morph-0-has-a-future-indicative-meaning",
      "canonicalPath": "cases.singularSeries.inbound-future-indicative.targetStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlPurposiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlPurposiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p2949": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2949": "authorized"
  }
};
export default Object.freeze(spec);
