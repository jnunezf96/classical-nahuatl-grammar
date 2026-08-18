const spec = {
  "ownerId": "classical-purposive-paradigm-axis-system",
  "prefix": "ClassicalPurposiveParadigmAxisSystem",
  "operationId": "classical.purposive.paradigm.axis.system.execute",
  "inputContract": "complete-typed-classical-purposive-paradigm-axis-system-source",
  "domain": "classical-purposive-paradigm-axis-system",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-purposive-runtime",
  "selections": [
    "claim-p2908",
    "claim-p2909",
    "claim-p2910",
    "claim-p2911",
    "claim-p2912",
    "claim-p2913"
  ],
  "coordinates": {
    "claim-p2908::p2908-because-of-the-presence-of-the-directional-prefix-inside": {
      "assertionId": "classical-purposive-paradigm-axis-system:p2908-because-of-the-presence-of-the-directional-prefix-inside",
      "canonicalPath": "contract.licensedSeries.0"
    },
    "claim-p2909::p2909-the-indicative-mood-has-only-two-tenses-the-outbound": {
      "assertionId": "classical-purposive-paradigm-axis-system:p2909-the-indicative-mood-has-only-two-tenses-the-outbound",
      "canonicalPath": "contract.licensedSeries.3"
    },
    "claim-p2910::p2910-both-sets-occur-in-vncs-in-the-indicative-and": {
      "assertionId": "classical-purposive-paradigm-axis-system:p2910-both-sets-occur-in-vncs-in-the-indicative-and",
      "canonicalPath": "contract.moods.0"
    },
    "claim-p2911::p2911-the-optative-mood-has-only-one-tense-the-nonpast": {
      "assertionId": "classical-purposive-paradigm-axis-system:p2911-the-optative-mood-has-only-one-tense-the-nonpast",
      "canonicalPath": "contract.moods.1"
    },
    "claim-p2912::p2912-the-tense-morph-for-all-tenses-is-0": {
      "assertionId": "classical-purposive-paradigm-axis-system:p2912-the-tense-morph-for-all-tenses-is-0",
      "canonicalPath": "contract.finiteTenseMorph"
    },
    "claim-p2913::p2913-the-number-dyad-for-the-singular-common-is-and": {
      "assertionId": "classical-purposive-paradigm-axis-system:p2913-the-number-dyad-for-the-singular-common-is-and",
      "canonicalPath": "contract.numberDyads.plural"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlPurposiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlPurposiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p2908": [],
    "claim-p2909": [],
    "claim-p2910": [],
    "claim-p2911": [],
    "claim-p2912": [],
    "claim-p2913": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2908": "authorized",
    "claim-p2909": "authorized",
    "claim-p2910": "authorized",
    "claim-p2911": "authorized",
    "claim-p2912": "authorized",
    "claim-p2913": "authorized"
  }
};
export default Object.freeze(spec);
