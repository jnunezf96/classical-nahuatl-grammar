const spec = {
  "ownerId": "classical-relational-ic-adjectival-measurement",
  "prefix": "ClassicalRelationalIcAdjectivalMeasurement",
  "operationId": "classical.relational.ic.adjectival.measurement.execute",
  "inputContract": "complete-typed-classical-relational-ic-adjectival-measurement-source",
  "domain": "classical-relational-ic-adjectival-measurement",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-relational-nnc-runtime",
  "selections": [
    "claim-p4313",
    "claim-p4314"
  ],
  "coordinates": {
    "claim-p4313::p4313-when-preceding-an-adjectival-nnc-of-size": {
      "assertionId": "classical-relational-ic-adjectival-measurement:p4313-when-preceding-an-adjectival-nnc-of-size",
      "canonicalPath": "cases.icMeasurement.canonicalResult"
    },
    "claim-p4314::p4314-iv-when-preceding-an-adjectival-nnc-of-size-length": {
      "assertionId": "classical-relational-ic-adjectival-measurement:p4314-iv-when-preceding-an-adjectival-nnc-of-size-length",
      "canonicalPath": "cases.icMeasurement.stemId"
    }
  },
  "executionFunctionName": "buildClassicalRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4313": [],
    "claim-p4314": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4313": "authorized",
    "claim-p4314": "authorized"
  }
};
export default Object.freeze(spec);
