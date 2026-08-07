const spec = {
  "ownerId": "classical-relational-ic-ordinal",
  "prefix": "ClassicalRelationalIcOrdinal",
  "operationId": "classical.relational.ic.ordinal.execute",
  "inputContract": "complete-typed-classical-relational-ic-ordinal-source",
  "domain": "classical-relational-ic-ordinal",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-relational-nnc-runtime",
  "selections": [
    "claim-p4308",
    "claim-p4309"
  ],
  "coordinates": {
    "claim-p4308::p4308-when-preceding-a-numeral-or-quantitive-nnc-i-c": {
      "assertionId": "classical-relational-ic-ordinal:p4308-when-preceding-a-numeral-or-quantitive-nnc-i-c",
      "canonicalPath": "cases.icOrdinal.canonicalResult"
    },
    "claim-p4309::p4309-when-preceding-a-numeral-or-quantitive-nnc": {
      "assertionId": "classical-relational-ic-ordinal:p4309-when-preceding-a-numeral-or-quantitive-nnc",
      "canonicalPath": "cases.icOrdinal.stemId"
    }
  },
  "executionFunctionName": "buildClassicalRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4308": [],
    "claim-p4309": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4308": "authorized",
    "claim-p4309": "authorized"
  }
};
export default Object.freeze(spec);
