const spec = {
  "ownerId": "classical-natural-body-part-possession-semantics",
  "prefix": "ClassicalNaturalBodyPartPossessionSemantics",
  "operationId": "classical.natural.body.part.possession.semantics.execute",
  "inputContract": "complete-typed-classical-natural-body-part-possession-semantics-source",
  "domain": "classical-natural-body-part-possession-semantics",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-higher-pronominal-nnc-runtime",
  "selections": [
    "claim-p1635",
    "claim-p1636",
    "claim-p1637"
  ],
  "coordinates": {
    "claim-p1635::p1635-3-stems-denoting-parts-of-the-body": {
      "assertionId": "classical-natural-body-part-possession-semantics:p1635-3-stems-denoting-parts-of-the-body",
      "canonicalPath": "sourceAuthorityFrame.naturalPossessionSemantics"
    },
    "claim-p1636::p1636-yaca-tl-yac-nose": {
      "assertionId": "classical-natural-body-part-possession-semantics:p1636-yaca-tl-yac-nose",
      "canonicalPath": "sourceAuthorityFrame.sourceStem"
    },
    "claim-p1637::p1637-mai-tl-ma-hand": {
      "assertionId": "classical-natural-body-part-possession-semantics:p1637-mai-tl-ma-hand",
      "canonicalPath": "sourceAuthorityFrame.stateAvailability"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1635": [
      "l15-natural-body-part"
    ],
    "claim-p1636": [
      "l15-natural-body-part"
    ],
    "claim-p1637": [
      "l15-natural-body-part"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1635": "authorized",
    "claim-p1636": "authorized",
    "claim-p1637": "authorized"
  }
};
export default Object.freeze(spec);
