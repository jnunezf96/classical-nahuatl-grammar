const spec = {
  "ownerId": "classical-relational-continuation-tzalan-core",
  "prefix": "ClassicalRelationalContinuationTzalanCore",
  "operationId": "classical.relational.continuation.tzalan.core.execute",
  "inputContract": "complete-typed-classical-relational-continuation-tzalan-core-source",
  "domain": "classical-relational-continuation-tzalan-core",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-relational-continuation-runtime",
  "selections": [
    "claim-p4485",
    "claim-p4486",
    "claim-p4487"
  ],
  "coordinates": {
    "claim-p4485::p4485-the-nounstem-tza-lan-tli-and-compound-stems-built": {
      "assertionId": "classical-relational-continuation-tzalan-core:p4485-the-nounstem-tza-lan-tli-and-compound-stems-built",
      "canonicalPath": "cases.tzalanPossessive.canonicalResult"
    },
    "claim-p4486::p4486-another-possibility-is-to-take-it-as-the-supplementary": {
      "assertionId": "classical-relational-continuation-tzalan-core:p4486-another-possibility-is-to-take-it-as-the-supplementary",
      "canonicalPath": "cases.tzalanIntegrated.canonicalResult"
    },
    "claim-p4487::p4487-context-must-decide-which-translation-should-be-used": {
      "assertionId": "classical-relational-continuation-tzalan-core:p4487-context-must-decide-which-translation-should-be-used",
      "canonicalPath": "cases.tzalanNormal.subjectMode"
    }
  },
  "executionFunctionName": "buildClassicalRelationalContinuationValidationFrame",
  "executionValidatorName": "isClassicalRelationalContinuationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4485": [],
    "claim-p4486": [],
    "claim-p4487": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4485": "authorized",
    "claim-p4486": "authorized",
    "claim-p4487": "authorized"
  }
};
export default Object.freeze(spec);
