const spec = {
  "ownerId": "classical-inbound-purposive-nonfuture-indicative",
  "prefix": "ClassicalInboundPurposiveNonfutureIndicative",
  "operationId": "classical.inbound.purposive.nonfuture.indicative.execute",
  "inputContract": "complete-typed-classical-inbound-purposive-nonfuture-indicative-source",
  "domain": "classical-inbound-purposive-nonfuture-indicative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-purposive-runtime",
  "selections": [
    "claim-p2943",
    "claim-p2944",
    "claim-p2945",
    "claim-p2946",
    "claim-p2947",
    "claim-p2948"
  ],
  "coordinates": {
    "claim-p2943::p2943-the-matrix-of-a-compound-stemmed-vnc-signifying-inbound": {
      "assertionId": "classical-inbound-purposive-nonfuture-indicative:p2943-the-matrix-of-a-compound-stemmed-vnc-signifying-inbound",
      "canonicalPath": "cases.singularSeries.inbound-nonfuture-indicative.facts.matrixDirectionalMorph"
    },
    "claim-p2944::p2944-the-vncs-have-only-nonfuture-and-future-tense-distinctions": {
      "assertionId": "classical-inbound-purposive-nonfuture-indicative:p2944-the-vncs-have-only-nonfuture-and-future-tense-distinctions",
      "canonicalPath": "cases.singularSeries.inbound-nonfuture-indicative.facts.matrixTenseMeaning"
    },
    "claim-p2945::p2945-the-tense-morph-0-has-a-nonfuture-indicative-meaning": {
      "assertionId": "classical-inbound-purposive-nonfuture-indicative:p2945-the-tense-morph-0-has-a-nonfuture-indicative-meaning",
      "canonicalPath": "cases.singularSeries.inbound-nonfuture-indicative.targetStem"
    },
    "claim-p2946::p2946-the-tense-meaning-covers-the-area-of-the-present": {
      "assertionId": "classical-inbound-purposive-nonfuture-indicative:p2946-the-tense-meaning-covers-the-area-of-the-present",
      "canonicalPath": "cases.singularSeries.inbound-nonfuture-indicative.facts.licensedReadingRange"
    },
    "claim-p2947::p2947-the-antecessive-order-particle-o-optionally-accompanies-the-vnc": {
      "assertionId": "classical-inbound-purposive-nonfuture-indicative:p2947-the-antecessive-order-particle-o-optionally-accompanies-the-vnc",
      "canonicalPath": "cases.ordinaryAntecessiveInboundNonfuture.facts.ordinaryAntecessiveSelected"
    },
    "claim-p2948::p2948-pl-came-in-order-to-call-s-o-etc": {
      "assertionId": "classical-inbound-purposive-nonfuture-indicative:p2948-pl-came-in-order-to-call-s-o-etc",
      "canonicalPath": "cases.singularSeries.inbound-nonfuture-indicative.facts.inboundNonfutureAntecessiveScope"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlPurposiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlPurposiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p2943": [],
    "claim-p2944": [],
    "claim-p2945": [],
    "claim-p2946": [],
    "claim-p2947": [],
    "claim-p2948": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2943": "authorized",
    "claim-p2944": "authorized",
    "claim-p2945": "authorized",
    "claim-p2946": "authorized",
    "claim-p2947": "authorized",
    "claim-p2948": "authorized"
  }
};
export default Object.freeze(spec);
