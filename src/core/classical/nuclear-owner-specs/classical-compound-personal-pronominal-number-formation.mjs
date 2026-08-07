const spec = {
  "ownerId": "classical-compound-personal-pronominal-number-formation",
  "prefix": "ClassicalCompoundPersonalPronominalNumberFormation",
  "operationId": "classical.compound.personal.pronominal.number.formation.execute",
  "inputContract": "complete-typed-classical-compound-personal-pronominal-number-formation-source",
  "domain": "classical-compound-personal-pronominal-number-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-higher-pronominal-nnc-runtime",
  "selections": [
    "claim-p1663",
    "claim-p1664",
    "claim-p1665",
    "claim-p1666",
    "claim-p1667",
    "claim-p1668",
    "claim-p1669",
    "claim-p1670"
  ],
  "coordinates": {
    "claim-p1663::p1663-the-compound-stem-also-has-two-shapes-eh-hua": {
      "assertionId": "classical-compound-personal-pronominal-number-formation:p1663-the-compound-stem-also-has-two-shapes-eh-hua",
      "canonicalPath": "pronominalFrame.sourceFrame.sourceIdentityAlternants"
    },
    "claim-p1664::p1664-nncs-formed-on-these-stems-are-peculiar-in-that": {
      "assertionId": "classical-compound-personal-pronominal-number-formation:p1664-nncs-formed-on-these-stems-are-peculiar-in-that",
      "canonicalPath": "pronominalFrame.sourceFrame.structuralPluralType"
    },
    "claim-p1665::p1665-result-nncs-formed-on-these-stems-are-peculiar-in": {
      "assertionId": "classical-compound-personal-pronominal-number-formation:p1665-result-nncs-formed-on-these-stems-are-peculiar-in",
      "canonicalPath": "numberFrame.predicateStem"
    },
    "claim-p1666::p1666-also-peculiar-is-the-fact-that-there-are-two": {
      "assertionId": "classical-compound-personal-pronominal-number-formation:p1666-also-peculiar-is-the-fact-that-there-are-two",
      "canonicalPath": "numberFrame.internalPluralMorph"
    },
    "claim-p1667::p1667-there-is-also-an-nnc-built-on-the-stem": {
      "assertionId": "classical-compound-personal-pronominal-number-formation:p1667-there-is-also-an-nnc-built-on-the-stem",
      "canonicalPath": "numberFrame.num1"
    },
    "claim-p1668::p1668-an-nnc-with-a-common-number-subject-can-be": {
      "assertionId": "classical-compound-personal-pronominal-number-formation:p1668-an-nnc-with-a-common-number-subject-can-be",
      "canonicalPath": "numberFrame.num2"
    },
    "claim-p1669::p1669-when-is-the-morphic-filler-in-subposition-num1-an": {
      "assertionId": "classical-compound-personal-pronominal-number-formation:p1669-when-is-the-morphic-filler-in-subposition-num1-an",
      "canonicalPath": "numberFrame.internalPluralIsSubjectNumberConnector"
    },
    "claim-p1670::p1670-result-an-nnc-with-a-plural-subject-pronoun-has": {
      "assertionId": "classical-compound-personal-pronominal-number-formation:p1670-result-an-nnc-with-a-plural-subject-pronoun-has",
      "canonicalPath": "contextSelectionRecord.doubledFirstPlural.available"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1663": [
      "l16-personal-compound"
    ],
    "claim-p1664": [
      "l16-personal-compound-plural"
    ],
    "claim-p1665": [
      "l16-personal-compound-plural"
    ],
    "claim-p1666": [
      "l16-personal-compound-plural"
    ],
    "claim-p1667": [
      "l16-personal-compound-plural"
    ],
    "claim-p1668": [
      "l16-personal-compound-plural"
    ],
    "claim-p1669": [
      "l16-personal-compound-plural"
    ],
    "claim-p1670": [
      "l16-personal-compound-plural"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1663": "authorized",
    "claim-p1664": "authorized",
    "claim-p1665": "authorized",
    "claim-p1666": "authorized",
    "claim-p1667": "authorized",
    "claim-p1668": "authorized",
    "claim-p1669": "authorized",
    "claim-p1670": "authorized"
  }
};
export default Object.freeze(spec);
