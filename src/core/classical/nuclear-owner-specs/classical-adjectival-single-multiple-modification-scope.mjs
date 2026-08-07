const spec = {
  "ownerId": "classical-adjectival-single-multiple-modification-scope",
  "prefix": "ClassicalAdjectivalSingleMultipleModificationScope",
  "operationId": "classical.adjectival.single.multiple.modification.scope.execute",
  "inputContract": "complete-typed-classical-adjectival-single-multiple-modification-scope-source",
  "domain": "classical-adjectival-single-multiple-modification-scope",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4012",
    "claim-p4013"
  ],
  "coordinates": {
    "claim-p4012::p4012-in-nahuatl-modification-can-occur-in-a-single-nucleus": {
      "assertionId": "classical-adjectival-single-multiple-modification-scope:p4012-in-nahuatl-modification-can-occur-in-a-single-nucleus",
      "canonicalPath": "cases.ordinary.canonicalResult"
    },
    "claim-p4013::p4013-in-the-latter-as-in-the-former-the-modification": {
      "assertionId": "classical-adjectival-single-multiple-modification-scope:p4013-in-the-latter-as-in-the-former-the-modification",
      "canonicalPath": "cases.ordinary.operationKind"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4012": [],
    "claim-p4013": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4012": "authorized",
    "claim-p4013": "authorized"
  }
};
export default Object.freeze(spec);
