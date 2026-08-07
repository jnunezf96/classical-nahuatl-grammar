const spec = {
  "ownerId": "classical-place-gentilic-gentilic-ca-ownerhood-n-silent",
  "prefix": "ClassicalPlaceGentilicGentilicCaOwnerhoodNSilent",
  "operationId": "classical.place.gentilic.gentilic.ca.ownerhood.n.silent.execute",
  "inputContract": "complete-typed-classical-place-gentilic-gentilic-ca-ownerhood-n-silent-source",
  "domain": "classical-place-gentilic-gentilic-ca-ownerhood-n-silent",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-place-gentilic-runtime",
  "selections": [
    "claim-p4629",
    "claim-p4630",
    "claim-p4631",
    "claim-p4632",
    "claim-p4633"
  ],
  "coordinates": {
    "claim-p4629::p4629-in-addition-to-the-formation-of-its-gentilic-nounstem": {
      "assertionId": "classical-place-gentilic-gentilic-ca-ownerhood-n-silent:p4629-in-addition-to-the-formation-of-its-gentilic-nounstem",
      "canonicalPath": "cases.ownerhoodSilentGentilic.lcmAxisId"
    },
    "claim-p4630::p4630-when-n-becomes-silent-the-ca-tl-preceding-it": {
      "assertionId": "classical-place-gentilic-gentilic-ca-ownerhood-n-silent:p4630-when-n-becomes-silent-the-ca-tl-preceding-it",
      "canonicalPath": "cases.ownerhoodSilentGentilic.boundaryRule"
    },
    "claim-p4631::p4631-when-n-becomes-silent": {
      "assertionId": "classical-place-gentilic-gentilic-ca-ownerhood-n-silent:p4631-when-n-becomes-silent",
      "canonicalPath": "cases.ownerhoodSilentGentilic.boundaryRule"
    },
    "claim-p4632::p4632-the-a-of-ca-tl-is-short-so-there": {
      "assertionId": "classical-place-gentilic-gentilic-ca-ownerhood-n-silent:p4632-the-a-of-ca-tl-is-short-so-there",
      "canonicalPath": "cases.ownerhoodSilentGentilic.derivedStem"
    },
    "claim-p4633::p4633-one-should-take-care-not-to-confuse-the-two": {
      "assertionId": "classical-place-gentilic-gentilic-ca-ownerhood-n-silent:p4633-one-should-take-care-not-to-confuse-the-two",
      "canonicalPath": "cases.ownerhoodSilentGentilic.canonicalFrame"
    }
  },
  "executionFunctionName": "buildClassicalPlaceGentilicValidationFrame",
  "executionValidatorName": "isClassicalPlaceGentilicValidationFrame",
  "executionArgsBySelection": {
    "claim-p4629": [],
    "claim-p4630": [],
    "claim-p4631": [],
    "claim-p4632": [],
    "claim-p4633": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4629": "authorized",
    "claim-p4630": "authorized",
    "claim-p4631": "authorized",
    "claim-p4632": "authorized",
    "claim-p4633": "authorized"
  }
};
export default Object.freeze(spec);
