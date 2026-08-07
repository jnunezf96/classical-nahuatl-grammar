const spec = {
  "ownerId": "classical-admonitive-silent-t-variant-formation",
  "prefix": "ClassicalAdmonitiveSilentTVariantFormation",
  "operationId": "classical.admonitive.silent.t.variant.formation.execute",
  "inputContract": "complete-typed-classical-admonitive-silent-t-variant-formation-source",
  "domain": "classical-admonitive-silent-t-variant-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-admonitive-silent-t-variant-formation",
  "selections": [
    "claim-p1116",
    "claim-p1117",
    "claim-p1118"
  ],
  "coordinates": {
    "claim-p1116::p1116-here-the-is-a-morphic-variant-of-t": {
      "assertionId": "classical-admonitive-silent-t-variant-formation:p1116-here-the-is-a-morphic-variant-of-t",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1117::p1117-here-is-a-morphic-variant-of-t": {
      "assertionId": "classical-admonitive-silent-t-variant-formation:p1117-here-is-a-morphic-variant-of-t",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1118::p1118-here-is-a-morphic-variant-of-t": {
      "assertionId": "classical-admonitive-silent-t-variant-formation:p1118-here-is-a-morphic-variant-of-t",
      "canonicalPath": "authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdmonitiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdmonitiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p1116": [
      "class-a-singular"
    ],
    "claim-p1117": [
      "class-b-singular"
    ],
    "claim-p1118": [
      "class-a-singular"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1116": "authorized",
    "claim-p1117": "authorized",
    "claim-p1118": "authorized"
  }
};
export default Object.freeze(spec);
