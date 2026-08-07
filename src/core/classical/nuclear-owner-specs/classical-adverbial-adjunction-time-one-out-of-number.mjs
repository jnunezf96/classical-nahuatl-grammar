const spec = {
  "ownerId": "classical-adverbial-adjunction-time-one-out-of-number",
  "prefix": "ClassicalAdverbialAdjunctionTimeOneOutOfNumber",
  "operationId": "classical.adverbial.adjunction.time.one.out.of.number.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-time-one-out-of-number-source",
  "domain": "classical-adverbial-adjunction-time-one-out-of-number",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4706"
  ],
  "coordinates": {
    "claim-p4706::p4706-nahuatl-also-extends-the-use-of-this-temporal-construction": {
      "assertionId": "classical-adverbial-adjunction-time-one-out-of-number:p4706-nahuatl-also-extends-the-use-of-this-temporal-construction",
      "canonicalPath": "analysis.oneOutOfNumberTemporalExtensionLicensed"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4706": [
      "time-one-out-of-number"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4706": "authorized"
  }
};
export default Object.freeze(spec);
