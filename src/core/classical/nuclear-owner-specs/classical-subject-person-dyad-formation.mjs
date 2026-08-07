const spec = {
  "ownerId": "classical-subject-person-dyad-formation",
  "prefix": "ClassicalSubjectPersonDyadFormation",
  "operationId": "classical.subject.person.dyad.form",
  "inputContract": "complete-typed-classical-subject-person-dyad-formation-source",
  "domain": "classical-subject-person-dyad-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-finite-vnc-slots",
  "selections": [
    "claim-p693",
    "claim-p694",
    "claim-p695",
    "claim-p696",
    "claim-p697",
    "claim-p698"
  ],
  "coordinates": {
    "claim-p693::p693-the-possible-type-level-carrier-plus-content-fillers-are": {
      "assertionId": "classical-subject-person-dyad-formation:p693-the-possible-type-level-carrier-plus-content-fillers-are",
      "canonicalPath": "fillers"
    },
    "claim-p694::p694-the-pers1-subposition-is-primarily-the-locus-for-information": {
      "assertionId": "classical-subject-person-dyad-formation:p694-the-pers1-subposition-is-primarily-the-locus-for-information",
      "canonicalPath": "locus"
    },
    "claim-p695::p695-except-for-the-third-person-morph-and-the-second": {
      "assertionId": "classical-subject-person-dyad-formation:p695-except-for-the-third-person-morph-and-the-second",
      "canonicalPath": "fillers.firstPlural"
    },
    "claim-p696::p696-when-there-is-a-following-consonant-sound": {
      "assertionId": "classical-subject-person-dyad-formation:p696-when-there-is-a-following-consonant-sound",
      "canonicalPath": "supportiveBeforeConsonant"
    },
    "claim-p697::p697-the-i-in-ti-xi-and-ni-is-a": {
      "assertionId": "classical-subject-person-dyad-formation:p697-the-i-in-ti-xi-and-ni-is-a",
      "canonicalPath": "supportiveVowel"
    },
    "claim-p698::p698-the-m-of-the-second-person-plural-morph-am": {
      "assertionId": "classical-subject-person-dyad-formation:p698-the-m-of-the-second-person-plural-morph-am",
      "canonicalPath": "fillers.secondPluralVariants"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlSubjectPersonDyadSystemFrame",
  "executionValidatorName": "isClassicalNahuatlSubjectPersonDyadSystemFrame",
  "executionArgsBySelection": {
    "claim-p693": [],
    "claim-p694": [],
    "claim-p695": [],
    "claim-p696": [],
    "claim-p697": [],
    "claim-p698": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p693": "authorized",
    "claim-p694": "authorized",
    "claim-p695": "authorized",
    "claim-p696": "authorized",
    "claim-p697": "authorized",
    "claim-p698": "authorized"
  }
};
export default Object.freeze(spec);
