const spec = {
  "ownerId": "classical-singular-number-dyad-alternation",
  "prefix": "ClassicalSingularNumberDyadAlternation",
  "operationId": "classical.singular.number.dyad.alternate",
  "inputContract": "complete-typed-classical-singular-number-dyad-alternation-source",
  "domain": "classical-singular-number-dyad-alternation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-finite-vnc-slots",
  "selections": [
    "claim-p759"
  ],
  "coordinates": {
    "claim-p759::p759-it-can-occur-in-a-preterit-or-future-tense": {
      "assertionId": "classical-singular-number-dyad-alternation:p759-it-can-occur-in-a-preterit-or-future-tense",
      "canonicalPath": "variants"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlSingularNumberDyadAlternationFrame",
  "executionValidatorName": "isClassicalNahuatlSingularNumberDyadAlternationFrame",
  "executionArgsBySelection": {
    "claim-p759": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p759": "authorized"
  }
};
export default Object.freeze(spec);
