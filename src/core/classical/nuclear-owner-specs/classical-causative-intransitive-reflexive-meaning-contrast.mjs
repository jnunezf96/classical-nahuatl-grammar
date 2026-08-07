const spec = {
  "ownerId": "classical-causative-intransitive-reflexive-meaning-contrast",
  "prefix": "ClassicalCausativeIntransitiveReflexiveMeaningContrast",
  "operationId": "classical.causative.intransitive.reflexive.meaning.contrast.execute",
  "inputContract": "complete-typed-classical-causative-intransitive-reflexive-meaning-contrast-source",
  "domain": "classical-causative-intransitive-reflexive-meaning-contrast",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2406",
    "claim-p2407",
    "claim-p2408",
    "claim-p2409"
  ],
  "coordinates": {
    "claim-p2406::p2406-a-vnc-formed-from-an-intransitive-stem-and-one": {
      "assertionId": "classical-causative-intransitive-reflexive-meaning-contrast:p2406-a-vnc-formed-from-an-intransitive-stem-and-one",
      "canonicalPath": "participants.typeOneSpecific.wordRealization"
    },
    "claim-p2407::p2407-it-is-therefore-best-to-try-to-let-the": {
      "assertionId": "classical-causative-intransitive-reflexive-meaning-contrast:p2407-it-is-therefore-best-to-try-to-let-the",
      "canonicalPath": "participants.typeOneReflexive.wordRealization"
    },
    "claim-p2408::p2408-as-in-this-example-translation-does-not-always-capture": {
      "assertionId": "classical-causative-intransitive-reflexive-meaning-contrast:p2408-as-in-this-example-translation-does-not-always-capture",
      "canonicalPath": "participants.typeOneSpecific.sourceStem"
    },
    "claim-p2409::p2409-the-causative-stemmed-vnc-implies-that-the-subject-is": {
      "assertionId": "classical-causative-intransitive-reflexive-meaning-contrast:p2409-the-causative-stemmed-vnc-implies-that-the-subject-is",
      "canonicalPath": "participants.typeOneSpecific.wordRealization"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2406": [],
    "claim-p2407": [],
    "claim-p2408": [],
    "claim-p2409": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2406": "authorized",
    "claim-p2407": "authorized",
    "claim-p2408": "authorized",
    "claim-p2409": "authorized"
  }
};
export default Object.freeze(spec);
