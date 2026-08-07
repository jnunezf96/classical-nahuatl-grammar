const spec = {
  "ownerId": "classical-natural-relation-possession-semantics",
  "prefix": "ClassicalNaturalRelationPossessionSemantics",
  "operationId": "classical.natural.relation.possession.semantics.execute",
  "inputContract": "complete-typed-classical-natural-relation-possession-semantics-source",
  "domain": "classical-natural-relation-possession-semantics",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-higher-pronominal-nnc-runtime",
  "selections": [
    "claim-p1630",
    "claim-p1631",
    "claim-p1632",
    "claim-p1633",
    "claim-p1634"
  ],
  "coordinates": {
    "claim-p1630::p1630-2-nounstems-denoting-kinship-and-certain-other-human-relations": {
      "assertionId": "classical-natural-relation-possession-semantics:p1630-2-nounstems-denoting-kinship-and-certain-other-human-relations",
      "canonicalPath": "sourceAuthorityFrame.naturalPossessionSemantics"
    },
    "claim-p1631::p1631-pil-li-pil-child-see-32-6": {
      "assertionId": "classical-natural-relation-possession-semantics:p1631-pil-li-pil-child-see-32-6",
      "canonicalPath": "sourceAuthorityFrame.sourceStem"
    },
    "claim-p1632::p1632-na-n-tli-nan-mother": {
      "assertionId": "classical-natural-relation-possession-semantics:p1632-na-n-tli-nan-mother",
      "canonicalPath": "sourceAuthorityFrame.selectedState"
    },
    "claim-p1633::p1633-ya-o-tl-yao-uh-enemy": {
      "assertionId": "classical-natural-relation-possession-semantics:p1633-ya-o-tl-yao-uh-enemy",
      "canonicalPath": "sourceAuthorityFrame.allowedStateValues"
    },
    "claim-p1634::p1634-poh-tli-poh-companion-match-equal-peer": {
      "assertionId": "classical-natural-relation-possession-semantics:p1634-poh-tli-poh-companion-match-equal-peer",
      "canonicalPath": "sourceAuthorityFrame.formulaStringAuthority"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1630": [
      "l15-natural-relation"
    ],
    "claim-p1631": [
      "l15-natural-relation"
    ],
    "claim-p1632": [
      "l15-natural-relation"
    ],
    "claim-p1633": [
      "l15-natural-relation"
    ],
    "claim-p1634": [
      "l15-natural-relation"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1630": "authorized",
    "claim-p1631": "authorized",
    "claim-p1632": "authorized",
    "claim-p1633": "authorized",
    "claim-p1634": "authorized"
  }
};
export default Object.freeze(spec);
