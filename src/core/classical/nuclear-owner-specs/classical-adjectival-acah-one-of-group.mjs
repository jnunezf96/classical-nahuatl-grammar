const spec = {
  "ownerId": "classical-adjectival-acah-one-of-group",
  "prefix": "ClassicalAdjectivalAcahOneOfGroup",
  "operationId": "classical.adjectival.acah.one.of.group.execute",
  "inputContract": "complete-typed-classical-adjectival-acah-one-of-group-source",
  "domain": "classical-adjectival-acah-one-of-group",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4126",
    "claim-p4127",
    "claim-p4128"
  ],
  "coordinates": {
    "claim-p4126::p4126-further-ways-of-expressing-one-of-or-none-of": {
      "assertionId": "classical-adjectival-acah-one-of-group:p4126-further-ways-of-expressing-one-of-or-none-of",
      "canonicalPath": "cases.oneOf.canonicalResult"
    },
    "claim-p4127::p4127-an-nnc-built-on-the-pronominal-stem-a-c": {
      "assertionId": "classical-adjectival-acah-one-of-group:p4127-an-nnc-built-on-the-pronominal-stem-a-c",
      "canonicalPath": "cases.oneOf.exceptionProfile"
    },
    "claim-p4128::p4128-only-the-subject-pronouns-of-ce-meh-and-quittazqueh": {
      "assertionId": "classical-adjectival-acah-one-of-group:p4128-only-the-subject-pronouns-of-ce-meh-and-quittazqueh",
      "canonicalPath": "cases.oneOf.operationKind"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4126": [],
    "claim-p4127": [],
    "claim-p4128": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4126": "authorized",
    "claim-p4127": "authorized",
    "claim-p4128": "authorized"
  }
};
export default Object.freeze(spec);
