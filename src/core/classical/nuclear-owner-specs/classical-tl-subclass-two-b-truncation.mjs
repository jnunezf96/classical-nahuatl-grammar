const spec = {
  "ownerId": "classical-tl-subclass-two-b-truncation",
  "prefix": "ClassicalTlSubclassTwoBTruncation",
  "operationId": "classical.tl.subclass.two.b.truncation.execute",
  "inputContract": "complete-typed-classical-tl-subclass-two-b-truncation-source",
  "domain": "classical-tl-subclass-two-b-truncation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nounstem-selection-runtime",
  "selections": [
    "claim-p1558",
    "claim-p1559",
    "claim-p1560",
    "claim-p1561",
    "claim-p1562",
    "claim-p1563",
    "claim-p1564",
    "claim-p1565",
    "claim-p1566"
  ],
  "coordinates": {
    "claim-p1558::p1558-subclass-2-b-has-a-limited-use-stem-that": {
      "assertionId": "classical-tl-subclass-two-b-truncation:p1558-subclass-2-b-has-a-limited-use-stem-that",
      "canonicalPath": "sourceFrame.subclassSourceShapeFrame.conditionId"
    },
    "claim-p1559::p1559-the-truncated-general-use-stem-consequently-ends-in-a": {
      "assertionId": "classical-tl-subclass-two-b-truncation:p1559-the-truncated-general-use-stem-consequently-ends-in-a",
      "canonicalPath": "sourceFrame.generalUseStem"
    },
    "claim-p1560::p1560-result-the-truncated-stem-ends-in-k-s-or": {
      "assertionId": "classical-tl-subclass-two-b-truncation:p1560-result-the-truncated-stem-ends-in-k-s-or",
      "canonicalPath": "nounstemSourceFrames.0.generalUseStem"
    },
    "claim-p1561::p1561-when-the-ephemeral-vowel-is-short-a-the-truncated": {
      "assertionId": "classical-tl-subclass-two-b-truncation:p1561-when-the-ephemeral-vowel-is-short-a-the-truncated",
      "canonicalPath": "sourceFrame.useShapeAction"
    },
    "claim-p1562::p1562-an-m-has-the-phone-n-before-silent-morphs": {
      "assertionId": "classical-tl-subclass-two-b-truncation:p1562-an-m-has-the-phone-n-before-silent-morphs",
      "canonicalPath": "consonantPhoneShiftFrame.outputSound"
    },
    "claim-p1563::p1563-result-the-truncated-stem-ends-in-l-s-w": {
      "assertionId": "classical-tl-subclass-two-b-truncation:p1563-result-the-truncated-stem-ends-in-l-s-w",
      "canonicalPath": "nounstemSourceFrames.2.generalUseStem"
    },
    "claim-p1564::p1564-when-the-ephemeral-vowel-is-short-i-the-truncated": {
      "assertionId": "classical-tl-subclass-two-b-truncation:p1564-when-the-ephemeral-vowel-is-short-i-the-truncated",
      "canonicalPath": "nounstemSourceFrames.3.generalUseStem"
    },
    "claim-p1565::p1565-since-the-w-is-voiceless-see-2-3-2": {
      "assertionId": "classical-tl-subclass-two-b-truncation:p1565-since-the-w-is-voiceless-see-2-3-2",
      "canonicalPath": "spellingChangeFrame.outputSpelling"
    },
    "claim-p1566::p1566-the-n-comes-from-m-see-2-13-2": {
      "assertionId": "classical-tl-subclass-two-b-truncation:p1566-the-n-comes-from-m-see-2-13-2",
      "canonicalPath": "consonantPhoneShiftFrame.selectedRuleId"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNounstemValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNounstemValidationFrame",
  "executionArgsBySelection": {
    "claim-p1558": [
      "possessive-common-tl2b-a"
    ],
    "claim-p1559": [
      "possessive-common-tl2b-a"
    ],
    "claim-p1560": [
      "tl2b-i-output-set"
    ],
    "claim-p1561": [
      "possessive-common-tl2b-a"
    ],
    "claim-p1562": [
      "m-exposed-phone-shift"
    ],
    "claim-p1563": [
      "tl2b-i-output-set"
    ],
    "claim-p1564": [
      "tl2b-i-output-set"
    ],
    "claim-p1565": [
      "w-final-spelling"
    ],
    "claim-p1566": [
      "m-exposed-phone-shift"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1558": "authorized",
    "claim-p1559": "authorized",
    "claim-p1560": "authorized",
    "claim-p1561": "authorized",
    "claim-p1562": "authorized",
    "claim-p1563": "authorized",
    "claim-p1564": "authorized",
    "claim-p1565": "authorized",
    "claim-p1566": "authorized"
  }
};
export default Object.freeze(spec);
