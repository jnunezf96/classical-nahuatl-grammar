const spec = {
  "ownerId": "classical-nounstem-relation-number-distinction",
  "prefix": "ClassicalNounstemRelationNumberDistinction",
  "operationId": "classical.nounstem.relation.number.distinction.execute",
  "inputContract": "complete-typed-classical-nounstem-relation-number-distinction-source",
  "domain": "classical-nounstem-relation-number-distinction",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nounstem-selection-runtime",
  "selections": [
    "claim-p1457",
    "claim-p1458",
    "claim-p1459",
    "claim-p1460",
    "claim-p1461",
    "claim-p1462",
    "claim-p1463"
  ],
  "coordinates": {
    "claim-p1457::p1457-as-has-been-previously-stated-especially-in-12-6": {
      "assertionId": "classical-nounstem-relation-number-distinction:p1457-as-has-been-previously-stated-especially-in-12-6",
      "canonicalPath": "contractGreatestCommonDivisor.connectorBelongsTo"
    },
    "claim-p1458::p1458-number-information-is-no-more-imparted-by-the-predicate": {
      "assertionId": "classical-nounstem-relation-number-distinction:p1458-number-information-is-no-more-imparted-by-the-predicate",
      "canonicalPath": "contractLeastCommonMultiple.selectedCoordinate.grammaticalNumberInPredicateStem"
    },
    "claim-p1459::p1459-this-having-been-firmly-established-it-must-however-be": {
      "assertionId": "classical-nounstem-relation-number-distinction:p1459-this-having-been-firmly-established-it-must-however-be",
      "canonicalPath": "stemDerivationFrame.grammaticalNumberValue"
    },
    "claim-p1460::p1460-that-these-are-not-number-notions-per-se-is": {
      "assertionId": "classical-nounstem-relation-number-distinction:p1460-that-these-are-not-number-notions-per-se-is",
      "canonicalPath": "stemDerivationFrame.subjectNumberChanged"
    },
    "claim-p1461::p1461-nahuatl-relies-on-derivational-prefixes-i-e-prefixes-inside": {
      "assertionId": "classical-nounstem-relation-number-distinction:p1461-nahuatl-relies-on-derivational-prefixes-i-e-prefixes-inside",
      "canonicalPath": "stemDerivationFrame.derivationPosition"
    },
    "claim-p1462::p1462-there-are-two-kinds-of-these-derived-nounstems-affinity": {
      "assertionId": "classical-nounstem-relation-number-distinction:p1462-there-are-two-kinds-of-these-derived-nounstems-affinity",
      "canonicalPath": "contractLeastCommonMultiple.stemRelationInventory.length"
    },
    "claim-p1463::p1463-the-animate-versus-nonanimate-distinction-is-still-maintained-in": {
      "assertionId": "classical-nounstem-relation-number-distinction:p1463-the-animate-versus-nonanimate-distinction-is-still-maintained-in",
      "canonicalPath": "contractLeastCommonMultiple.subjectReferenceAnimacyInventory.length"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNounstemValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNounstemValidationFrame",
  "executionArgsBySelection": {
    "claim-p1457": [
      "absolutive-common-tli"
    ],
    "claim-p1458": [
      "absolutive-common-tli"
    ],
    "claim-p1459": [
      "derive-affinity-cal"
    ],
    "claim-p1460": [
      "derive-distributive-cal"
    ],
    "claim-p1461": [
      "derive-affinity-cal"
    ],
    "claim-p1462": [
      "absolutive-common-tli"
    ],
    "claim-p1463": [
      "absolutive-common-tli"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1457": "authorized",
    "claim-p1458": "authorized",
    "claim-p1459": "authorized",
    "claim-p1460": "authorized",
    "claim-p1461": "authorized",
    "claim-p1462": "authorized",
    "claim-p1463": "authorized"
  }
};
export default Object.freeze(spec);
