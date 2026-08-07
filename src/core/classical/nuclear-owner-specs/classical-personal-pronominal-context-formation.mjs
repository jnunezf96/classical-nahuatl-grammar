const spec = {
  "ownerId": "classical-personal-pronominal-context-formation",
  "prefix": "ClassicalPersonalPronominalContextFormation",
  "operationId": "classical.personal.pronominal.context.formation.execute",
  "inputContract": "complete-typed-classical-personal-pronominal-context-formation-source",
  "domain": "classical-personal-pronominal-context-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-higher-pronominal-nnc-runtime",
  "selections": [
    "claim-p1671",
    "claim-p1672",
    "claim-p1673",
    "claim-p1674",
    "claim-p1675",
    "claim-p1676"
  ],
  "coordinates": {
    "claim-p1671::p1671-these-personal-pronominal-nncs-occur-in-an-idiomatic-construction": {
      "assertionId": "classical-personal-pronominal-context-formation:p1671-these-personal-pronominal-nncs-occur-in-an-idiomatic-construction",
      "canonicalPath": "contextSelectionRecord.selectionAuthority"
    },
    "claim-p1672::p1672-a-personal-pronominal-nnc-with-a-first-person-plural": {
      "assertionId": "classical-personal-pronominal-context-formation:p1672-a-personal-pronominal-nnc-with-a-first-person-plural",
      "canonicalPath": "contextSelectionRecord.doubledFirstPlural.selected"
    },
    "claim-p1673::p1673-the-meaning-of-these-nncs-is-totally-unexpected-as": {
      "assertionId": "classical-personal-pronominal-context-formation:p1673-the-meaning-of-these-nncs-is-totally-unexpected-as",
      "canonicalPath": "contextSelectionRecord.doubledFirstPlural.contextualMeaning"
    },
    "claim-p1674::p1674-zan-no-titehhua-ntin-titehhua-n": {
      "assertionId": "classical-personal-pronominal-context-formation:p1674-zan-no-titehhua-ntin-titehhua-n",
      "canonicalPath": "formulaRealization"
    },
    "claim-p1675::p1675-to-say-something-such-as-they-are-of-your": {
      "assertionId": "classical-personal-pronominal-context-formation:p1675-to-say-something-such-as-they-are-of-your",
      "canonicalPath": "pronominalFrame.sourceFrame.sourceStem"
    },
    "claim-p1676::p1676-note-the-personal-pronominal-nncs-neh-nehhua-tl-etc": {
      "assertionId": "classical-personal-pronominal-context-formation:p1676-note-the-personal-pronominal-nncs-neh-nehhua-tl-etc",
      "canonicalPath": "paradigmPlan.firstCoordinateAuthority"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1671": [
      "l16-personal-compound"
    ],
    "claim-p1672": [
      "l16-personal-doubled"
    ],
    "claim-p1673": [
      "l16-personal-doubled"
    ],
    "claim-p1674": [
      "l16-personal-doubled"
    ],
    "claim-p1675": [
      "l16-personal-derived"
    ],
    "claim-p1676": [
      "l16-personal-paradigm"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1671": "authorized",
    "claim-p1672": "authorized",
    "claim-p1673": "authorized",
    "claim-p1674": "authorized",
    "claim-p1675": "authorized",
    "claim-p1676": "authorized"
  }
};
export default Object.freeze(spec);
