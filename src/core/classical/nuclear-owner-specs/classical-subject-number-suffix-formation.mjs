const spec = {
  "ownerId": "classical-subject-number-suffix-formation",
  "prefix": "ClassicalSubjectNumberSuffixFormation",
  "operationId": "classical.subject.number.suffix.form",
  "inputContract": "complete-typed-classical-subject-number-suffix-formation-source",
  "domain": "classical-subject-number-suffix-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-finite-vnc-slots",
  "selections": [
    "claim-p720",
    "claim-p721",
    "claim-p722",
    "claim-p723",
    "claim-p724",
    "claim-p725",
    "claim-p726"
  ],
  "coordinates": {
    "claim-p720::p720-singular-common-number-is-always-represented-by-0": {
      "assertionId": "classical-subject-number-suffix-formation:p720-singular-common-number-is-always-represented-by-0",
      "canonicalPath": "singular"
    },
    "claim-p721::p721-plural-number-is-represented-by-one-of-four-variant": {
      "assertionId": "classical-subject-number-suffix-formation:p721-plural-number-is-represented-by-one-of-four-variant",
      "canonicalPath": "pluralVariants"
    },
    "claim-p722::p722-the-plural-number-carrier-h-occurs-with-present-customary": {
      "assertionId": "classical-subject-number-suffix-formation:p722-the-plural-number-carrier-h-occurs-with-present-customary",
      "canonicalPath": "presentPlural"
    },
    "claim-p723::p723-the-plural-number-carrier-eh-occurs-with-future-or": {
      "assertionId": "classical-subject-number-suffix-formation:p723-the-plural-number-carrier-eh-occurs-with-future-or",
      "canonicalPath": "futurePlural"
    },
    "claim-p724::p724-the-plural-number-carrier-a-n-occurs-with-nonpast": {
      "assertionId": "classical-subject-number-suffix-formation:p724-the-plural-number-carrier-a-n-occurs-with-nonpast",
      "canonicalPath": "optativeNonpastPlural"
    },
    "claim-p725::p725-the-plural-number-carrier-in-occurs-with-nonpast-admonitive": {
      "assertionId": "classical-subject-number-suffix-formation:p725-the-plural-number-carrier-in-occurs-with-nonpast-admonitive",
      "canonicalPath": "admonitiveNonpastPlural"
    },
    "claim-p726::p726-this-variant-has-ih-as-a-subvariant": {
      "assertionId": "classical-subject-number-suffix-formation:p726-this-variant-has-ih-as-a-subvariant",
      "canonicalPath": "admonitiveVariants"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlSubjectNumberSuffixSystemFrame",
  "executionValidatorName": "isClassicalNahuatlSubjectNumberSuffixSystemFrame",
  "executionArgsBySelection": {
    "claim-p720": [],
    "claim-p721": [],
    "claim-p722": [],
    "claim-p723": [],
    "claim-p724": [],
    "claim-p725": [],
    "claim-p726": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p720": "authorized",
    "claim-p721": "authorized",
    "claim-p722": "authorized",
    "claim-p723": "authorized",
    "claim-p724": "authorized",
    "claim-p725": "authorized",
    "claim-p726": "authorized"
  }
};
export default Object.freeze(spec);
