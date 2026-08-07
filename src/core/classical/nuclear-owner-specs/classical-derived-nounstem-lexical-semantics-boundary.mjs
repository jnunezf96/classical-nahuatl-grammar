const spec = {
  "ownerId": "classical-derived-nounstem-lexical-semantics-boundary",
  "prefix": "ClassicalDerivedNounstemLexicalSemanticsBoundary",
  "operationId": "classical.derived.nounstem.lexical.semantics.boundary.execute",
  "inputContract": "complete-typed-classical-derived-nounstem-lexical-semantics-boundary-source",
  "domain": "classical-derived-nounstem-lexical-semantics-boundary",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nounstem-selection-runtime",
  "selections": [
    "claim-p1479",
    "claim-p1480",
    "claim-p1481",
    "claim-p1482",
    "claim-p1483"
  ],
  "coordinates": {
    "claim-p1479::p1479-at-times-the-derived-nounstem-can-have-a-translation": {
      "assertionId": "classical-derived-nounstem-lexical-semantics-boundary:p1479-at-times-the-derived-nounstem-can-have-a-translation",
      "canonicalPath": "stemDerivationFrame.sourceStemPreserved"
    },
    "claim-p1480::p1480-cal-li-house-cah-cal-li-settlement-village": {
      "assertionId": "classical-derived-nounstem-lexical-semantics-boundary:p1480-cal-li-house-cah-cal-li-settlement-village",
      "canonicalPath": "stemDerivationFrame.derivedStem"
    },
    "claim-p1481::p1481-occasionally-the-derived-stem-names-an-entity-that-is": {
      "assertionId": "classical-derived-nounstem-lexical-semantics-boundary:p1481-occasionally-the-derived-stem-names-an-entity-that-is",
      "canonicalPath": "storedExampleAuthority"
    },
    "claim-p1482::p1482-eh-ca-tl-breeze-eh-eh-ca-tl-wind": {
      "assertionId": "classical-derived-nounstem-lexical-semantics-boundary:p1482-eh-ca-tl-breeze-eh-eh-ca-tl-wind",
      "canonicalPath": "stemDerivationFrame.derivedStem"
    },
    "claim-p1483::p1483-note-certain-pronominal-nncs-are-the-exception-to-the": {
      "assertionId": "classical-derived-nounstem-lexical-semantics-boundary:p1483-note-certain-pronominal-nncs-are-the-exception-to-the",
      "canonicalPath": "stemDerivationFrame.subjectNumberChanged"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNounstemValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNounstemValidationFrame",
  "executionArgsBySelection": {
    "claim-p1479": [
      "derive-distributive-cal"
    ],
    "claim-p1480": [
      "derive-distributive-cal"
    ],
    "claim-p1481": [
      "derive-distributive-ehca"
    ],
    "claim-p1482": [
      "derive-distributive-ehca"
    ],
    "claim-p1483": [
      "derive-distributive-cal"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1479": "authorized",
    "claim-p1480": "authorized",
    "claim-p1481": "authorized",
    "claim-p1482": "authorized",
    "claim-p1483": "authorized"
  }
};
export default Object.freeze(spec);
