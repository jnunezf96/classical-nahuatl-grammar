const spec = {
  "ownerId": "classical-nounstem-lexical-variant-licensing",
  "prefix": "ClassicalNounstemLexicalVariantLicensing",
  "operationId": "classical.nounstem.lexical.variant.licensing.execute",
  "inputContract": "complete-typed-classical-nounstem-lexical-variant-licensing-source",
  "domain": "classical-nounstem-lexical-variant-licensing",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nounstem-selection-runtime",
  "selections": [
    "claim-p1444",
    "claim-p1445",
    "claim-p1446",
    "claim-p1447"
  ],
  "coordinates": {
    "claim-p1444::p1444-certain-nounstems-permit-alternative-class-membership-with-no-change": {
      "assertionId": "classical-nounstem-lexical-variant-licensing:p1444-certain-nounstems-permit-alternative-class-membership-with-no-change",
      "canonicalPath": "lexicalSelectionRecord.alternativeClassMembership"
    },
    "claim-p1445::p1445-to-ch-in-to-ch-tli-rabbit": {
      "assertionId": "classical-nounstem-lexical-variant-licensing:p1445-to-ch-in-to-ch-tli-rabbit",
      "canonicalPath": "lexicalSelectionRecord.classMembershipOptions"
    },
    "claim-p1446::p1446-temol-in-temol-li-horsefly": {
      "assertionId": "classical-nounstem-lexical-variant-licensing:p1446-temol-in-temol-li-horsefly",
      "canonicalPath": "lexicalSelectionRecord.selectionAuthority"
    },
    "claim-p1447::p1447-a-nounstem-that-in-the-citation-form-begins-with": {
      "assertionId": "classical-nounstem-lexical-variant-licensing:p1447-a-nounstem-that-in-the-citation-form-begins-with",
      "canonicalPath": "nounstemSourceFrame.supportiveInitialAlternatives"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNounstemValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNounstemValidationFrame",
  "executionArgsBySelection": {
    "claim-p1444": [
      "lexical-alternatives"
    ],
    "claim-p1445": [
      "lexical-alternatives"
    ],
    "claim-p1446": [
      "lexical-alternatives"
    ],
    "claim-p1447": [
      "supportive-initial-variant"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1444": "authorized",
    "claim-p1445": "authorized",
    "claim-p1446": "authorized",
    "claim-p1447": "authorized"
  }
};
export default Object.freeze(spec);
