const spec = {
  "ownerId": "classical-adverbial-adjunction-purpose-other-tense",
  "prefix": "ClassicalAdverbialAdjunctionPurposeOtherTense",
  "operationId": "classical.adverbial.adjunction.purpose.other.tense.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-purpose-other-tense-source",
  "domain": "classical-adverbial-adjunction-purpose-other-tense",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4729"
  ],
  "coordinates": {
    "claim-p4729::p4729-the-tense-of-the-vnc-in-the-adjoined-clause": {
      "assertionId": "classical-adverbial-adjunction-purpose-other-tense:p4729-the-tense-of-the-vnc-in-the-adjoined-clause",
      "canonicalPath": "analysis.nonfuturePurposeIsLicensed"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4729": [
      "purpose-other-tense"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4729": "authorized"
  }
};
export default Object.freeze(spec);
