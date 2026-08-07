const spec = {
  "ownerId": "classical-natural-property-possession-semantics",
  "prefix": "ClassicalNaturalPropertyPossessionSemantics",
  "operationId": "classical.natural.property.possession.semantics.execute",
  "inputContract": "complete-typed-classical-natural-property-possession-semantics-source",
  "domain": "classical-natural-property-possession-semantics",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-higher-pronominal-nnc-runtime",
  "selections": [
    "claim-p1626",
    "claim-p1627",
    "claim-p1628",
    "claim-p1629"
  ],
  "coordinates": {
    "claim-p1626::p1626-1-nounstems-denoting-certain-types-of-property": {
      "assertionId": "classical-natural-property-possession-semantics:p1626-1-nounstems-denoting-certain-types-of-property",
      "canonicalPath": "sourceAuthorityFrame.naturalPossessionSemantics"
    },
    "claim-p1627::p1627-cha-n-tli-cha-n-home-homeland": {
      "assertionId": "classical-natural-property-possession-semantics:p1627-cha-n-tli-cha-n-home-homeland",
      "canonicalPath": "sourceAuthorityFrame.naturalPossessionSemanticsAuthority"
    },
    "claim-p1628::p1628-a-xcai-tl-a-xca-property-possession": {
      "assertionId": "classical-natural-property-possession-semantics:p1628-a-xcai-tl-a-xca-property-possession",
      "canonicalPath": "sourceAuthorityFrame.stateAvailability"
    },
    "claim-p1629::p1629-since-nahuatl-does-not-have-possessor-personal-or-indefinite": {
      "assertionId": "classical-natural-property-possession-semantics:p1629-since-nahuatl-does-not-have-possessor-personal-or-indefinite",
      "canonicalPath": "sourceAuthorityFrame.formulaStringAuthority"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1626": [
      "l15-natural-property"
    ],
    "claim-p1627": [
      "l15-natural-property"
    ],
    "claim-p1628": [
      "l15-natural-property"
    ],
    "claim-p1629": [
      "l15-natural-property"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1626": "authorized",
    "claim-p1627": "authorized",
    "claim-p1628": "authorized",
    "claim-p1629": "authorized"
  }
};
export default Object.freeze(spec);
