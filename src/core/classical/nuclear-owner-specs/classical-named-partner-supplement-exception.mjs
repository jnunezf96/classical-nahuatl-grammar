const spec = {
  "ownerId": "classical-named-partner-supplement-exception",
  "prefix": "ClassicalNamedPartnerSupplementException",
  "operationId": "classical.named.partner.supplement.exception.execute",
  "inputContract": "complete-typed-classical-named-partner-supplement-exception-source",
  "domain": "classical-named-partner-supplement-exception",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-supplementation-runtime",
  "selections": [
    "claim-p1849",
    "claim-p1850"
  ],
  "coordinates": {
    "claim-p1849::p1849-when-a-supplement-refers-to-a-plural-number-that": {
      "assertionId": "classical-named-partner-supplement-exception:p1849-when-a-supplement-refers-to-a-plural-number-that",
      "canonicalPath": "namedPartner.referenceFrame.agreementException.kind"
    },
    "claim-p1850::p1850-when-a-supplement-refers-to-a-plural-number-that": {
      "assertionId": "classical-named-partner-supplement-exception:p1850-when-a-supplement-refers-to-a-plural-number-that",
      "canonicalPath": "namedPartner.referenceFrame.referenceRelationship"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlSupplementationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlSupplementationValidationFrame",
  "executionArgsBySelection": {
    "claim-p1849": [],
    "claim-p1850": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1849": "authorized",
    "claim-p1850": "authorized"
  }
};
export default Object.freeze(spec);
