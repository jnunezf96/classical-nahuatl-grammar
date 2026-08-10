const spec = {
  "ownerId": "classical-directional-prefix-formation",
  "prefix": "ClassicalDirectionalPrefixFormation",
  "operationId": "classical.directional.prefix.form",
  "inputContract": "complete-typed-classical-directional-prefix-formation-source",
  "domain": "classical-directional-prefix-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-directional-prefix-formation",
  "selections": [
    "claim-p963",
    "claim-p964",
    "claim-p965",
    "claim-p966",
    "claim-p967",
    "claim-p968",
    "claim-p969",
    "claim-p970"
  ],
  "coordinates": {
    "claim-p963::p963-when-a-verbstem-reports-movement-a-prefix-can-be": {
      "assertionId": "classical-directional-prefix-formation:p963-when-a-verbstem-reports-movement-a-prefix-can-be",
      "canonicalPath": "insideVncCore"
    },
    "claim-p964::p964-result-a-prefix-can-be-added-inside-the-vnc": {
      "assertionId": "classical-directional-prefix-formation:p964-result-a-prefix-can-be-added-inside-the-vnc",
      "canonicalPath": "formulaSlotAuthorized"
    },
    "claim-p965::p965-there-are-two-possible-morphic-fillers-one-representing-the": {
      "assertionId": "classical-directional-prefix-formation:p965-there-are-two-possible-morphic-fillers-one-representing-the",
      "canonicalPath": "prefixes"
    },
    "claim-p966::p966-at-times-english-does-not-translate-these-prefixes-literally": {
      "assertionId": "classical-directional-prefix-formation:p966-at-times-english-does-not-translate-these-prefixes-literally",
      "canonicalPath": "meanings"
    },
    "claim-p967::p967-the-prefix-functions-as-an-adverbial-modifier-of-the": {
      "assertionId": "classical-directional-prefix-formation:p967-the-prefix-functions-as-an-adverbial-modifier-of-the",
      "canonicalPath": "insideVncCore"
    },
    "claim-p968::p968-in-an-intransitive-vnc-the-prefix-is-placed-in": {
      "assertionId": "classical-directional-prefix-formation:p968-in-an-intransitive-vnc-the-prefix-is-placed-in",
      "canonicalPath": "intransitivePlacement"
    },
    "claim-p969::p969-is-d-stem-a-morphic-boundary-indicating-that-the": {
      "assertionId": "classical-directional-prefix-formation:p969-is-d-stem-a-morphic-boundary-indicating-that-the",
      "canonicalPath": "internalPrefixSlots"
    },
    "claim-p970::p970-is-optionally-present-d-directional-locative-prefix": {
      "assertionId": "classical-directional-prefix-formation:p970-is-optionally-present-d-directional-locative-prefix",
      "canonicalPath": "formulaSlotAuthorized"
    }
  },
  "exactAtomCoordinates": {
    "ACI-P087-L018-073DCB9B6E-02": {
      "assertionId": "classical-directional-prefix-formation:atom-aci-p087-l018-073dcb9b6e-02-translation-value-change",
      "canonicalPath": "translationValueChangesWithDirectionalPrefix",
      "observationKind": "owner-issued-canonical-result",
      "expected": true
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDirectionalPrefixSystemFrame",
  "executionValidatorName": "isClassicalNahuatlDirectionalPrefixSystemFrame",
  "executionArgsBySelection": {
    "claim-p963": [],
    "claim-p964": [],
    "claim-p965": [],
    "claim-p966": [],
    "claim-p967": [],
    "claim-p968": [],
    "claim-p969": [],
    "claim-p970": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p963": "authorized",
    "claim-p964": "authorized",
    "claim-p965": "authorized",
    "claim-p966": "authorized",
    "claim-p967": "authorized",
    "claim-p968": "authorized",
    "claim-p969": "authorized",
    "claim-p970": "authorized"
  }
};
export default Object.freeze(spec);
