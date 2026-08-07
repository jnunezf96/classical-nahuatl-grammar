const spec = {
  "ownerId": "classical-relational-continuation-nepan-abundance-embed",
  "prefix": "ClassicalRelationalContinuationNepanAbundanceEmbed",
  "operationId": "classical.relational.continuation.nepan.abundance.embed.execute",
  "inputContract": "complete-typed-classical-relational-continuation-nepan-abundance-embed-source",
  "domain": "classical-relational-continuation-nepan-abundance-embed",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-relational-continuation-runtime",
  "selections": [
    "claim-p4517",
    "claim-p4518"
  ],
  "coordinates": {
    "claim-p4517::p4517-when-ne-pan-tli-is-embedded-in-tlah": {
      "assertionId": "classical-relational-continuation-nepan-abundance-embed:p4517-when-ne-pan-tli-is-embedded-in-tlah",
      "canonicalPath": "cases.panIntegrated.canonicalResult"
    },
    "claim-p4518::p4518-when-ne-pan-tli-is-embedded-in-tlah-place": {
      "assertionId": "classical-relational-continuation-nepan-abundance-embed:p4518-when-ne-pan-tli-is-embedded-in-tlah-place",
      "canonicalPath": "cases.panNested.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalRelationalContinuationValidationFrame",
  "executionValidatorName": "isClassicalRelationalContinuationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4517": [],
    "claim-p4518": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4517": "authorized",
    "claim-p4518": "authorized"
  }
};
export default Object.freeze(spec);
