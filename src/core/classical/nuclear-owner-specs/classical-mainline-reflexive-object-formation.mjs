const spec = {
  "ownerId": "classical-mainline-reflexive-object-formation",
  "prefix": "ClassicalMainlineReflexiveObjectFormation",
  "operationId": "classical.mainline.reflexive.object.form",
  "inputContract": "complete-typed-classical-mainline-reflexive-object-formation-source",
  "domain": "classical-mainline-reflexive-object-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-transitive-vnc-object",
  "selections": [
    "claim-p820",
    "claim-p821",
    "claim-p822",
    "claim-p823",
    "claim-p824",
    "claim-p825",
    "claim-p826",
    "claim-p827",
    "claim-p828"
  ],
  "coordinates": {
    "claim-p820::p820-result-the-valence-position-has-the-following-subposition-and": {
      "assertionId": "classical-mainline-reflexive-object-formation:p820-result-the-valence-position-has-the-following-subposition-and",
      "canonicalPath": "alignment"
    },
    "claim-p821::p821-the-valence-position-has-the-following-subposition-and-categorial": {
      "assertionId": "classical-mainline-reflexive-object-formation:p821-the-valence-position-has-the-following-subposition-and-categorial",
      "canonicalPath": "condition"
    },
    "claim-p822::p822-when-plural-the-reflexive-object-may-have-a-reciprocative": {
      "assertionId": "classical-mainline-reflexive-object-formation:p822-when-plural-the-reflexive-object-may-have-a-reciprocative",
      "canonicalPath": "pluralMayBeReciprocal"
    },
    "claim-p823::p823-a-mainline-reflexive-reciprocative-verb-object-reflects-the-person": {
      "assertionId": "classical-mainline-reflexive-object-formation:p823-a-mainline-reflexive-reciprocative-verb-object-reflects-the-person",
      "canonicalPath": "reflectsSubject"
    },
    "claim-p824::p824-there-is-then-no-need-for-the-object-to": {
      "assertionId": "classical-mainline-reflexive-object-formation:p824-there-is-then-no-need-for-the-object-to",
      "canonicalPath": "noRepeatedSubjectInformation"
    },
    "claim-p825::p825-m-nonfirst-common": {
      "assertionId": "classical-mainline-reflexive-object-formation:p825-m-nonfirst-common",
      "canonicalPath": "nonfirstVa1"
    },
    "claim-p826::p826-subposition-va2-is-the-locus-of-the-objective-case": {
      "assertionId": "classical-mainline-reflexive-object-formation:p826-subposition-va2-is-the-locus-of-the-objective-case",
      "canonicalPath": "consonantInitialVa2"
    },
    "claim-p827::p827-when-the-verbstem-begins-with-a-vowel-however-the": {
      "assertionId": "classical-mainline-reflexive-object-formation:p827-when-the-verbstem-begins-with-a-vowel-however-the",
      "canonicalPath": "vowelInitialCondition"
    },
    "claim-p828::p828-result-however-the-o-morph-is-replaced-by-the": {
      "assertionId": "classical-mainline-reflexive-object-formation:p828-result-however-the-o-morph-is-replaced-by-the",
      "canonicalPath": "replacementRule"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlMainlineReflexiveObjectSystemFrame",
  "executionValidatorName": "isClassicalNahuatlMainlineReflexiveObjectSystemFrame",
  "executionArgsBySelection": {
    "claim-p820": [],
    "claim-p821": [],
    "claim-p822": [],
    "claim-p823": [],
    "claim-p824": [],
    "claim-p825": [],
    "claim-p826": [],
    "claim-p827": [],
    "claim-p828": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p820": "authorized",
    "claim-p821": "authorized",
    "claim-p822": "authorized",
    "claim-p823": "authorized",
    "claim-p824": "authorized",
    "claim-p825": "authorized",
    "claim-p826": "authorized",
    "claim-p827": "authorized",
    "claim-p828": "authorized"
  }
};
export default Object.freeze(spec);
