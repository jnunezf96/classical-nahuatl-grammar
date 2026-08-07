const spec = {
  "ownerId": "classical-place-gentilic-gentilic-ca-co-c-silent",
  "prefix": "ClassicalPlaceGentilicGentilicCaCoCSilent",
  "operationId": "classical.place.gentilic.gentilic.ca.co.c.silent.execute",
  "inputContract": "complete-typed-classical-place-gentilic-gentilic-ca-co-c-silent-source",
  "domain": "classical-place-gentilic-gentilic-ca-co-c-silent",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-place-gentilic-runtime",
  "selections": [
    "claim-p4627",
    "claim-p4628"
  ],
  "coordinates": {
    "claim-p4627::p4627-in-all-of-them-the-relational-nounstem-that-serves": {
      "assertionId": "classical-place-gentilic-gentilic-ca-co-c-silent:p4627-in-all-of-them-the-relational-nounstem-that-serves",
      "canonicalPath": "cases.coSilentGentilic.canonicalFrame"
    },
    "claim-p4628::p4628-the-silent-variant-replaces-both-co-and-c-tli": {
      "assertionId": "classical-place-gentilic-gentilic-ca-co-c-silent:p4628-the-silent-variant-replaces-both-co-and-c-tli",
      "canonicalPath": "cases.coSilentGentilic.lcmAxisId"
    }
  },
  "executionFunctionName": "buildClassicalPlaceGentilicValidationFrame",
  "executionValidatorName": "isClassicalPlaceGentilicValidationFrame",
  "executionArgsBySelection": {
    "claim-p4627": [],
    "claim-p4628": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4627": "authorized",
    "claim-p4628": "authorized"
  }
};
export default Object.freeze(spec);
