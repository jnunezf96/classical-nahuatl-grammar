const spec = {
  "ownerId": "classical-possessive-plural-nounstem-relation-selection",
  "prefix": "ClassicalPossessivePluralNounstemRelationSelection",
  "operationId": "classical.possessive.plural.nounstem.relation.selection.execute",
  "inputContract": "complete-typed-classical-possessive-plural-nounstem-relation-selection-source",
  "domain": "classical-possessive-plural-nounstem-relation-selection",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nounstem-selection-runtime",
  "selections": [
    "claim-p1532"
  ],
  "coordinates": {
    "claim-p1532::p1532-normally-however-the-plain-stem-is-used-to-form": {
      "assertionId": "classical-possessive-plural-nounstem-relation-selection:p1532-normally-however-the-plain-stem-is-used-to-form",
      "canonicalPath": "connectorSelectionFrame.selectionRule"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNounstemValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNounstemValidationFrame",
  "executionArgsBySelection": {
    "claim-p1532": [
      "possessive-plural-plain"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1532": "authorized"
  }
};
export default Object.freeze(spec);
