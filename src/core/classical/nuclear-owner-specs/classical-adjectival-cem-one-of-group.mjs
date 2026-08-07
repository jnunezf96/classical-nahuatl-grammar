const spec = {
  "ownerId": "classical-adjectival-cem-one-of-group",
  "prefix": "ClassicalAdjectivalCemOneOfGroup",
  "operationId": "classical.adjectival.cem.one.of.group.execute",
  "inputContract": "complete-typed-classical-adjectival-cem-one-of-group-source",
  "domain": "classical-adjectival-cem-one-of-group",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4120",
    "claim-p4121",
    "claim-p4122",
    "claim-p4123",
    "claim-p4124",
    "claim-p4125"
  ],
  "coordinates": {
    "claim-p4120::p4120-there-are-several-idiomatic-structures-of-modification-that-violate": {
      "assertionId": "classical-adjectival-cem-one-of-group:p4120-there-are-several-idiomatic-structures-of-modification-that-violate",
      "canonicalPath": "cases.oneOf.canonicalResult"
    },
    "claim-p4121::p4121-when-it-is-used-to-single-an-individual-out": {
      "assertionId": "classical-adjectival-cem-one-of-group:p4121-when-it-is-used-to-single-an-individual-out",
      "canonicalPath": "cases.oneOf.exceptionProfile"
    },
    "claim-p4122::p4122-one-of-these-involves-the-nounstem-cem-one-when": {
      "assertionId": "classical-adjectival-cem-one-of-group:p4122-one-of-these-involves-the-nounstem-cem-one-when",
      "canonicalPath": "cases.oneOf.operationKind"
    },
    "claim-p4123::p4123-the-group-may-be-designated-by-a-pronominal-nnc": {
      "assertionId": "classical-adjectival-cem-one-of-group:p4123-the-group-may-be-designated-by-a-pronominal-nnc",
      "canonicalPath": "cases.oneOf.canonicalResult"
    },
    "claim-p4124::p4124-the-meaning-of-the-nnc-seems-strangely-reversed-e": {
      "assertionId": "classical-adjectival-cem-one-of-group:p4124-the-meaning-of-the-nnc-seems-strangely-reversed-e",
      "canonicalPath": "cases.oneOf.exceptionProfile"
    },
    "claim-p4125::p4125-the-group-may-be-designated-by-an-nnc": {
      "assertionId": "classical-adjectival-cem-one-of-group:p4125-the-group-may-be-designated-by-an-nnc",
      "canonicalPath": "cases.oneOf.operationKind"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4120": [],
    "claim-p4121": [],
    "claim-p4122": [],
    "claim-p4123": [],
    "claim-p4124": [],
    "claim-p4125": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4120": "authorized",
    "claim-p4121": "authorized",
    "claim-p4122": "authorized",
    "claim-p4123": "authorized",
    "claim-p4124": "authorized",
    "claim-p4125": "authorized"
  }
};
export default Object.freeze(spec);
