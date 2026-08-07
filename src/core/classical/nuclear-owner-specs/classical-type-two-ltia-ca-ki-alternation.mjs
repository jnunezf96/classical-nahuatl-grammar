const spec = {
  "ownerId": "classical-type-two-ltia-ca-ki-alternation",
  "prefix": "ClassicalTypeTwoLtiaCaKiAlternation",
  "operationId": "classical.type.two.ltia.ca.ki.alternation.execute",
  "inputContract": "complete-typed-classical-type-two-ltia-ca-ki-alternation-source",
  "domain": "classical-type-two-ltia-ca-ki-alternation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2444",
    "claim-p2445"
  ],
  "coordinates": {
    "claim-p2444::p2444-cho-ca-to-cry": {
      "assertionId": "classical-type-two-ltia-ca-ki-alternation:p2444-cho-ca-to-cry",
      "canonicalPath": "derivations.choca.options.3.targetStem"
    },
    "claim-p2445::p2445-the-ka-may-appear-as-ka-or-change-to": {
      "assertionId": "classical-type-two-ltia-ca-ki-alternation:p2445-the-ka-may-appear-as-ka-or-change-to",
      "canonicalPath": "derivations.choca.options.4.targetStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2444": [],
    "claim-p2445": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2444": "authorized",
    "claim-p2445": "authorized"
  }
};
export default Object.freeze(spec);
