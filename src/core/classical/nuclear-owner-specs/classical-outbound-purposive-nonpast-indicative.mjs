const spec = {
  "ownerId": "classical-outbound-purposive-nonpast-indicative",
  "prefix": "ClassicalOutboundPurposiveNonpastIndicative",
  "operationId": "classical.outbound.purposive.nonpast.indicative.execute",
  "inputContract": "complete-typed-classical-outbound-purposive-nonpast-indicative-source",
  "domain": "classical-outbound-purposive-nonpast-indicative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-purposive-runtime",
  "selections": [
    "claim-p2914",
    "claim-p2915",
    "claim-p2916",
    "claim-p2917"
  ],
  "coordinates": {
    "claim-p2914::p2914-the-matrix-of-a-compound-stemmed-vnc-signifying-outbound": {
      "assertionId": "classical-outbound-purposive-nonpast-indicative:p2914-the-matrix-of-a-compound-stemmed-vnc-signifying-outbound",
      "canonicalPath": "cases.singularSeries.outbound-nonpast-indicative.facts.matrixDirectionalMorph"
    },
    "claim-p2915::p2915-the-vncs-have-only-nonpast-and-past-tense-distinctions": {
      "assertionId": "classical-outbound-purposive-nonpast-indicative:p2915-the-vncs-have-only-nonpast-and-past-tense-distinctions",
      "canonicalPath": "cases.singularSeries.outbound-nonpast-indicative.facts.matrixTenseMeaning"
    },
    "claim-p2916::p2916-the-tense-morph-0-has-a-nonpast-indicative-meaning": {
      "assertionId": "classical-outbound-purposive-nonpast-indicative:p2916-the-tense-morph-0-has-a-nonpast-indicative-meaning",
      "canonicalPath": "cases.singularSeries.outbound-nonpast-indicative.targetStem"
    },
    "claim-p2917::p2917-nonpast-covers-the-meaning-areas-of-the-present-and": {
      "assertionId": "classical-outbound-purposive-nonpast-indicative:p2917-nonpast-covers-the-meaning-areas-of-the-present-and",
      "canonicalPath": "cases.singularSeries.outbound-nonpast-indicative.facts.matrixDirectionalMorph"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlPurposiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlPurposiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p2914": [],
    "claim-p2915": [],
    "claim-p2916": [],
    "claim-p2917": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2914": "authorized",
    "claim-p2915": "authorized",
    "claim-p2916": "authorized",
    "claim-p2917": "authorized"
  }
};
export default Object.freeze(spec);
