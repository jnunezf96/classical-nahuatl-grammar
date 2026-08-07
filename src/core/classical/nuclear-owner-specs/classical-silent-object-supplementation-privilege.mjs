const spec = {
  "ownerId": "classical-silent-object-supplementation-privilege",
  "prefix": "ClassicalSilentObjectSupplementationPrivilege",
  "operationId": "classical.silent.object.supplementation.privilege.execute",
  "inputContract": "complete-typed-classical-silent-object-supplementation-privilege-source",
  "domain": "classical-silent-object-supplementation-privilege",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2523",
    "claim-p2524",
    "claim-p2525"
  ],
  "coordinates": {
    "claim-p2523::p2523-it-has-the-same-privileges": {
      "assertionId": "classical-silent-object-supplementation-privilege:p2523-it-has-the-same-privileges",
      "canonicalPath": "interactions.silentObjectSupplement.authorizationStatus"
    },
    "claim-p2524::p2524-the-silently-present-verb-object-pronoun-is-as-fully": {
      "assertionId": "classical-silent-object-supplementation-privilege:p2524-the-silently-present-verb-object-pronoun-is-as-fully",
      "canonicalPath": "interactions.silentObjectSupplement.silentlyPresentCarrier"
    },
    "claim-p2525::p2525-it-can-therefore-take-a-supplementary-object": {
      "assertionId": "classical-silent-object-supplementation-privilege:p2525-it-can-therefore-take-a-supplementary-object",
      "canonicalPath": "interactions.silentObjectSupplement.headRole"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2523": [],
    "claim-p2524": [],
    "claim-p2525": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2523": "authorized",
    "claim-p2524": "authorized",
    "claim-p2525": "authorized"
  }
};
export default Object.freeze(spec);
