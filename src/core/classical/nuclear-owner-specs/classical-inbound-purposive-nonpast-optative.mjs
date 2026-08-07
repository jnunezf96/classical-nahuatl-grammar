const spec = {
  "ownerId": "classical-inbound-purposive-nonpast-optative",
  "prefix": "ClassicalInboundPurposiveNonpastOptative",
  "operationId": "classical.inbound.purposive.nonpast.optative.execute",
  "inputContract": "complete-typed-classical-inbound-purposive-nonpast-optative-source",
  "domain": "classical-inbound-purposive-nonpast-optative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-purposive-runtime",
  "selections": [
    "claim-p2950",
    "claim-p2951"
  ],
  "coordinates": {
    "claim-p2950::p2950-the-tense-morph-0-has-a-nonpast-optative-meaning": {
      "assertionId": "classical-inbound-purposive-nonpast-optative:p2950-the-tense-morph-0-has-a-nonpast-optative-meaning",
      "canonicalPath": "cases.singularSeries.inbound-nonpast-optative.targetStem"
    },
    "claim-p2951::p2951-if-only-they-would-come-in-order-to-write": {
      "assertionId": "classical-inbound-purposive-nonpast-optative:p2951-if-only-they-would-come-in-order-to-write",
      "canonicalPath": "cases.singularSeries.inbound-nonpast-optative.facts.matrixTenseMeaning"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlPurposiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlPurposiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p2950": [],
    "claim-p2951": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2950": "authorized",
    "claim-p2951": "authorized"
  }
};
export default Object.freeze(spec);
